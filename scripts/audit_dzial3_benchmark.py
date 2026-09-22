"""
audit_dzial3_benchmark.py - Rygorystyczny audyt jakości CKE dla Działu 3 (Wartość bezwzględna)
Weryfikuje:
1. Podział tytułu i numeru (brak "Dział 3:" w nazwie, 'topic_number' == 3, 'title' == 'Wartość bezwzględna').
2. Dokładnie 3 lekcje, po 5 autentycznych zadań każda (łącznie 15 zadań).
3. Brak zduplikowanych dystraktorów (tekstów lub identyfikatorów) w opcjach zadań.
4. Poprawność typów i kluczy odpowiedzi (SINGLE_CHOICE ma poprawny identyfikator w [A, B, C, D], NUMERIC ma wartość, TRUE_FALSE ma PRAWDA/FAŁSZ).
5. Czystość składni KaTeX (brak surowych delimiterów, zbalansowane dolary).
6. 100% poprawności stron Karty Wzorów CKE 2023 (str. 4 dla wartości bezwzględnej).
7. Kompletność pigułek Bento (5 sekcji Core-4) i infografik SVG (viewBox / karty, brak niedopasowania).
8. Test integracyjny z Jev AI (/api/jev/diagnose).
"""
import json
import re
import sys
import urllib.request
import urllib.error

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

def check_katex_syntax(text, context=""):
    errors = []
    if not text or not isinstance(text, str):
        return errors
        
    if r'\(' in text or r'\)' in text:
        errors.append(f"{context}: Znaleziono surowy delimiter LaTeX \\( lub \\)")
    if r'\[' in text or r'\]' in text:
        errors.append(f"{context}: Znaleziono surowy delimiter LaTeX \\[ lub \\]")

    clean = re.sub(r'\\\$', '', text)
    clean_no_double = re.sub(r'\$\$[\s\S]*?\$\$', '', clean)
    single_dollars = clean_no_double.count('$')
    if single_dollars % 2 != 0:
        errors.append(f"{context}: Niezbalansowana liczba pojedynczych znaków $ ({single_dollars}) w tekście: '{text[:80]}...'")

    return errors

def test_jev_ai(task):
    """Testuje endpoint /api/jev/diagnose z przykładowym błędnym rozwiązaniem ucznia."""
    url = "http://localhost:3001/api/jev/diagnose"
    payload = {
        "taskId": task.get("id"),
        "question": task.get("question"),
        "studentAnswer": "B",
        "options": [f"{o.get('id')}: {o.get('text')}" for o in task.get("options", [])],
        "correctAnswer": task.get("correct_answer"),
        "explanation": task.get("explanation"),
        "ckeTrap": task.get("cke_trap")
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return True, data.get("feedback") or data.get("category") or str(data)
    except Exception as ex:
        return False, str(ex)

def audit_dzial3():
    print("=" * 65)
    print("  AUDYT BENCHMARKU JAKOŚCI CKE: DZIAŁ 3 (Wartość bezwzględna)")
    print("=" * 65)

    with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    topics = data.get('topics', []) if isinstance(data, dict) else data
    d3 = None
    for t in topics:
        if t.get('id') in ['dzial-3', 'topic-3', 'wartosc-bezwzgledna'] or 'wartość bezwzględna' in t.get('title', '').lower():
            d3 = t
            break

    if not d3:
        print("[BLAD KRYTYCZNY] Nie znaleziono Działu 3 w curriculum_matematyka.json!")
        sys.exit(1)

    errors = []
    warnings = []

    # 1. Separacja numeru od nazwy
    title = d3.get('title', '')
    print(f"-> Tytuł działu: '{title}'")
    if re.search(r'^Dział\s*[\d.]+\s*[:\-–]?', title, re.IGNORECASE):
        errors.append(f"Tytuł działu zawiera przedrostek numeru: '{title}'!")
    elif title != 'Wartość bezwzględna':
        errors.append(f"Oczekiwano tytułu 'Wartość bezwzględna', otrzymano '{title}'!")
    else:
        print("   ✓ Tytuł merytoryczny czysty: 'Wartość bezwzględna'.")

    if d3.get('topic_number') == 3:
        print(f"   ✓ Metadane topic_number = {d3['topic_number']} poprawnie wyodrębnione.")
    else:
        errors.append(f"Brak lub niepoprawny topic_number: {d3.get('topic_number')}")

    # 2. Liczba lekcji
    lessons = d3.get('lessons', [])
    print(f"-> Liczba lekcji: {len(lessons)}")
    if len(lessons) != 3:
        errors.append(f"Oczekiwano 3 lekcji w Dziale 3, znaleziono {len(lessons)}!")
    else:
        print("   ✓ Dokładnie 3 lekcje (3.1, 3.2, 3.3).")

    total_tasks = 0

    # 3. Audyt każdej lekcji
    for l_idx, lesson in enumerate(lessons, 1):
        lid = lesson.get('id')
        ltitle = lesson.get('title')
        print(f"\n--- [Lekcja 3.{l_idx}] {lid}: '{ltitle}' ---")

        if re.search(r'^L\d+(?:\.\d+)+\s*[:\-–]?', ltitle, re.IGNORECASE):
            errors.append(f"Lekcja {lid} zawiera prefiks w tytule: '{ltitle}'")

        # Bento Pill Audit
        tp = lesson.get('theory_pill') or {}
        tabs = ['concept_essence', 'matura_context', 'worked_example', 'exam_trap']
        for tab in tabs:
            if not tp.get(tab):
                errors.append(f"Lekcja {lid}: brak wymaganej zakładki Bento '{tab}'")

        # Core formulas & CKE page check (strona 4 dla wartości bezwzględnej!)
        formulas = tp.get('core_formulas', [])
        if not formulas:
            errors.append(f"Lekcja {lid}: brak core_formulas w Bento!")
        for f_idx, form in enumerate(formulas):
            in_sheet = form.get('in_cke_sheet', False)
            cke_page = form.get('cke_page', '')
            f_title = form.get('title', '')
            if in_sheet:
                if not cke_page:
                    errors.append(f"Lekcja {lid}, formuła '{f_title}': oznaczona jako in_cke_sheet, ale brak cke_page!")
                elif 'str. 4' not in cke_page:
                    errors.append(f"Lekcja {lid} (wartość bezwzględna), formuła '{f_title}': powinna odsyłać do 'str. 4', a ma '{cke_page}'!")
                else:
                    print(f"   ✓ Karta wzorów CKE: '{f_title}' -> {cke_page}")

        # KaTeX checks in bento
        for k in ['concept_essence', 'matura_context', 'exam_trap']:
            txt = tp.get(k, '')
            errors.extend(check_katex_syntax(txt, f"Lekcja {lid} bento {k}"))

        we = tp.get('worked_example', {})
        for st in we.get('steps', []):
            errors.extend(check_katex_syntax(st.get('text', ''), f"Lekcja {lid} step text"))

        # Infographic visual verification (Brak niedopasowania dydaktycznego!)
        vis = lesson.get('visuals') or tp.get('diagram') or {}
        tab0 = vis.get('tab0') if isinstance(vis, dict) else vis
        if tab0:
            v_title = tab0.get('title', '')
            v_badge = tab0.get('formulaBadge', '')
            print(f"   ✓ Infografika Tab 0: '{v_title}' [Badge: {v_badge[:40]}...]")
            
            # Weryfikacja zgodności tematycznej
            if l_idx == 1:
                if 'nierówności' in v_title.lower() or r'\le' in v_badge or r'<' in v_badge:
                    errors.append(f"Lekcja 3.1 (definicja geometryczna) zawiera grafikę nierówności: '{v_title}'!")
            elif l_idx == 2:
                if 'nierówności' not in v_title.lower() and r'<' not in v_badge:
                    errors.append(f"Lekcja 3.2 (nierówności) nie zawiera infografiki nierówności: '{v_title}'!")
            elif l_idx == 3:
                if 'tożsamość' not in v_title.lower() and r'\sqrt' not in v_badge:
                    errors.append(f"Lekcja 3.3 (tożsamość pierwiastkowa) nie zawiera infografiki pierwiastków: '{v_title}'!")

        # 4. Audyt zadań lekcji
        tasks = lesson.get('tasks', [])
        print(f"   -> Liczba zadań w lekcji: {len(tasks)}")
        if len(tasks) != 5:
            errors.append(f"Lekcja {lid}: oczekiwano dokładnie 5 zadań, znaleziono {len(tasks)}!")
        total_tasks += len(tasks)

        for t_idx, task in enumerate(tasks, 1):
            tid = task.get('id')
            ttype = task.get('type')
            tq = task.get('question', '')
            correct_ans = task.get('correct_answer') or task.get('correct_val')
            expl = task.get('explanation', '')
            trap = task.get('cke_trap', '')

            # KaTeX in questions & explanations
            errors.extend(check_katex_syntax(tq, f"Zadanie {tid} pytanie"))
            errors.extend(check_katex_syntax(expl, f"Zadanie {tid} wyjaśnienie"))
            errors.extend(check_katex_syntax(trap, f"Zadanie {tid} pułapka"))

            # Options & distractors check
            if ttype == 'SINGLE_CHOICE':
                options = task.get('options', [])
                if len(options) != 4:
                    errors.append(f"Zadanie {tid} (SINGLE_CHOICE) ma {len(options)} opcji zamiast 4!")
                
                opt_texts = set()
                opt_ids = set()
                has_correct = False
                for opt in options:
                    oid = opt.get('id')
                    otxt = opt.get('text', '').strip()
                    if oid in opt_ids:
                        errors.append(f"Zadanie {tid}: zduplikowany identyfikator opcji '{oid}'!")
                    opt_ids.add(oid)

                    if otxt in opt_texts:
                        errors.append(f"Zadanie {tid}: ZDUPLIKOWANY DYSTRAKTOR! Treść: '{otxt}'")
                    opt_texts.add(otxt)

                    if opt.get('is_correct') or oid == correct_ans:
                        has_correct = True

                if not has_correct:
                    errors.append(f"Zadanie {tid}: brak oznaczonej poprawnej odpowiedzi!")

            elif ttype == 'TRUE_FALSE':
                if str(correct_ans).upper() not in ['P', 'F', 'PRAWDA', 'FAŁSZ', 'TRUE', 'FALSE']:
                    errors.append(f"Zadanie {tid} (TRUE_FALSE) ma niepoprawny klucz: '{correct_ans}'")

            elif ttype == 'NUMERIC_INPUT':
                if correct_ans is None:
                    errors.append(f"Zadanie {tid} (NUMERIC_INPUT) brak wartości numerycznej!")

    print("\n" + "=" * 65)
    print(f"  PODSUMOWANIE DZIAŁU 3: Łącznie zadań: {total_tasks} / 15")
    print("=" * 65)

    if total_tasks != 15:
        errors.append(f"Łączna liczba zadań w Dziale 3 to {total_tasks}, a powinno być dokładnie 15!")

    # 5. Test diagnostyki Jev AI na reprezentatywnym zadaniu
    sample_task = lessons[1].get('tasks', [])[1] if len(lessons) > 1 and len(lessons[1].get('tasks', [])) > 1 else None
    if sample_task:
        print(f"\n[AI AUDIT] Testowanie mikroserwisu Jev AI (/api/jev/diagnose) na zadaniu {sample_task.get('id')}...")
        ok, res = test_jev_ai(sample_task)
        if ok:
            print(f"   ✓ Jev AI pomyślnie zdiagnozował błąd ucznia:")
            print(f"     Feedback: {res[:120]}...")
        else:
            warnings.append(f"Jev AI endpoint ostrzeżenie (może wymagać uruchomionego serwera dev): {res}")

    # Wynik końcowy
    print("\n" + "-" * 65)
    if errors:
        print(f"❌ AUDYT ZAKOŃCZONY BŁĘDEM ({len(errors)} problemów do naprawy):")
        for err in errors:
            print(f"  - {err}")
        return False
    else:
        print(f"✅ AUDYT PRZESZEDŁ W 100% SUKCESEM! Dział 3 to Złoty Wzorzec Jakości CKE.")
        if warnings:
            print(f"Ostrzeżenia ({len(warnings)}):")
            for w in warnings:
                print(f"  * {w}")
        return True

if __name__ == '__main__':
    success = audit_dzial3()
    sys.exit(0 if success else 1)
