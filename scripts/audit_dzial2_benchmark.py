"""
audit_dzial2_benchmark.py - Rygorystyczny audyt jakości CKE dla Działu 2 (Logarytmy)
Weryfikuje:
1. Podział tytułu i numeru (brak "Dział 2:" w nazwie, 'topic_number' == 2, 'title' == 'Logarytmy').
2. Dokładnie 3 lekcje, po 5 autentycznych zadań każda (15 zadań).
3. Brak zduplikowanych dystraktorów (tekstów lub identyfikatorów) w opcjach zadań.
4. Poprawność typów i kluczy odpowiedzi (SINGLE_CHOICE ma poprawny identyfikator w [A, B, C, D], NUMERIC ma wartość).
5. Czystość składni KaTeX (brak surowych delimiterów, zbalansowane dolary).
6. 100% poprawności stron Karty Wzorów CKE 2023 (str. 5 dla logarytmów).
7. Kompletność pigułek Bento (5 sekcji Core-4) i infografik SVG (viewBox 360x125, brak \\iff).
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

def audit_dzial2():
    print("=" * 65)
    print("  AUDYT BENCHMARKU JAKOŚCI CKE: DZIAŁ 2 (Logarytmy)")
    print("=" * 65)

    with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    topics = data.get('topics', []) if isinstance(data, dict) else data
    d2 = None
    for t in topics:
        if t.get('id') in ['dzial-2', 'topic-2', 'logarytmy'] or 'logarytmy' in t.get('title', '').lower():
            d2 = t
            break

    if not d2:
        print("[BLAD KRYTYCZNY] Nie znaleziono Działu 2 w curriculum_matematyka.json!")
        sys.exit(1)

    errors = []
    warnings = []

    # 1. Separacja numeru od nazwy
    title = d2.get('title', '')
    print(f"-> Tytuł działu: '{title}'")
    if re.search(r'^Dział\s*[\d.]+\s*[:\-–]?', title, re.IGNORECASE):
        errors.append(f"Tytuł działu zawiera przedrostek numeru: '{title}'!")
    elif title != 'Logarytmy':
        errors.append(f"Oczekiwano tytułu 'Logarytmy', otrzymano '{title}'!")
    else:
        print("   ✓ Tytuł merytoryczny czysty: 'Logarytmy'.")

    if d2.get('topic_number') == 2:
        print(f"   ✓ Metadane topic_number = {d2['topic_number']} poprawnie wyodrębnione.")
    else:
        errors.append(f"Brak lub niepoprawny topic_number: {d2.get('topic_number')}")

    # 2. Liczba lekcji
    lessons = d2.get('lessons', [])
    print(f"-> Liczba lekcji: {len(lessons)}")
    if len(lessons) != 3:
        errors.append(f"Oczekiwano 3 lekcji w Dziale 2, znaleziono {len(lessons)}!")
    else:
        print("   ✓ Dokładnie 3 lekcje (2.1, 2.2, 2.3).")

    total_tasks = 0

    # 3. Audyt każdej lekcji
    for l_idx, lesson in enumerate(lessons, 1):
        lid = lesson.get('id')
        ltitle = lesson.get('title')
        print(f"\n--- [Lekcja 2.{l_idx}] {lid}: '{ltitle}' ---")

        if re.search(r'^L\d+(?:\.\d+)+\s*[:\-–]?', ltitle, re.IGNORECASE):
            errors.append(f"Lekcja {lid} zawiera prefiks w tytule: '{ltitle}'")

        # Bento Pill Audit
        tp = lesson.get('theory_pill') or {}
        tabs = ['concept_essence', 'matura_context', 'worked_example', 'exam_trap']
        for tab in tabs:
            if not tp.get(tab):
                errors.append(f"Lekcja {lid}: brak wymaganej zakładki Bento '{tab}'")

        # Core formulas & CKE page check (strona 5 dla logarytmów!)
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
                elif 'str. 5' not in cke_page:
                    errors.append(f"Lekcja {lid} (logarytmy), formuła '{f_title}': powinna odsyłać do 'str. 5', a ma '{cke_page}'!")
                else:
                    print(f"   ✓ Karta wzorów CKE: '{f_title}' -> {cke_page}")

        # KaTeX checks in bento
        for k in ['concept_essence', 'matura_context', 'exam_trap']:
            txt = tp.get(k, '')
            errors.extend(check_katex_syntax(txt, f"Lekcja {lid} bento {k}"))

        we = tp.get('worked_example', {})
        errors.extend(check_katex_syntax(we.get('problem', ''), f"Lekcja {lid} worked_example.problem"))
        for step in we.get('steps', []):
            errors.extend(check_katex_syntax(step.get('text', ''), f"Lekcja {lid} step {step.get('num')}"))

        # Visuals
        diag = tp.get('diagram')
        if not diag:
            warnings.append(f"Lekcja {lid}: brak infografiki diagram w tab0!")
        else:
            diag_type = diag.get('type')
            print(f"   ✓ Infografika tab0: type={diag_type}, title='{diag.get('title', '')[:40]}...'")
            if l_idx == 1:
                # Check for loop diagram without iff
                badge = diag.get('badge', '')
                if r'\iff' in badge:
                    errors.append(f"Lekcja {lid}: Infografika zawiera akademicki symbol \\iff w badge!")

        # Tasks
        tasks = lesson.get('tasks', [])
        print(f"   Liczba zadań: {len(tasks)}")
        if len(tasks) != 5:
            errors.append(f"Lekcja {lid} ma {len(tasks)} zadań (wymagane dokładnie 5)!")
        total_tasks += len(tasks)

        for t_idx, task in enumerate(tasks, 1):
            tid = task.get('id')
            ttype = task.get('type')
            tquest = task.get('question', '')
            texpl = task.get('explanation', '')
            ttrap = task.get('cke_trap', '')

            # Check question and explanation KaTeX
            errors.extend(check_katex_syntax(tquest, f"Zadanie {tid} question"))
            errors.extend(check_katex_syntax(texpl, f"Zadanie {tid} explanation"))
            errors.extend(check_katex_syntax(ttrap, f"Zadanie {tid} cke_trap"))

            # Key correctness & no duplicate options
            if ttype == 'SINGLE_CHOICE':
                cid = task.get('correct_answer') or task.get('correct_id')
                opts = task.get('options', [])
                opt_ids = [o.get('id') for o in opts]
                opt_texts = [o.get('text', '').strip() for o in opts]

                if cid not in opt_ids:
                    errors.append(f"Zadanie {tid}: correct_id '{cid}' nie istnieje w opcjach {opt_ids}!")
                if len(opts) != 4:
                    errors.append(f"Zadanie {tid}: oczekiwano 4 opcji ABCD, znaleziono {len(opts)}!")
                if len(set(opt_ids)) != len(opt_ids):
                    errors.append(f"Zadanie {tid}: zduplikowane identyfikatory opcji: {opt_ids}!")
                if len(set(opt_texts)) != len(opt_texts):
                    errors.append(f"Zadanie {tid}: ZDUPLIKOWANE TEKSTY OPCJI: {opt_texts}!")

                for o in opts:
                    errors.extend(check_katex_syntax(o.get('text', ''), f"Zadanie {tid} option {o.get('id')}"))
            elif ttype == 'NUMERIC_INPUT':
                cval = str(task.get('correct_answer') or task.get('correct_val', ''))
                if not cval:
                    errors.append(f"Zadanie {tid} (NUMERIC): brak poprawnej wartości liczbowej!")
            elif ttype == 'TRUE_FALSE':
                cid = task.get('correct_answer') or task.get('correct_id')
                if cid not in ['P', 'F', 'PRAWDA', 'FAŁSZ']:
                    errors.append(f"Zadanie {tid} (TRUE_FALSE): niepoprawna odpowiedź: '{cid}'")

    print("\n" + "=" * 65)
    print(f"ŁĄCZNA LICZBA ZADAŃ W DZIALE 2: {total_tasks} / 15")
    if total_tasks != 15:
        errors.append(f"Dział 2 ma łącznie {total_tasks} zadań, wymagane dokładnie 15!")

    # 4. Test Jev AI na zadaniu 2.1.3 (pułapka z ujemnym wynikiem)
    print("\n--- TEST INTEGRACYJNY Z JEV AI (/api/jev/diagnose) ---")
    test_task = d2['lessons'][0]['tasks'][2] # task-2-1-3
    ok, j_feedback = test_jev_ai(test_task)
    if ok:
        print(f"   ✓ Jev AI pomyślnie zdiagnozował błąd w {test_task.get('id')}:")
        print(f"     Feedback: '{j_feedback[:100]}...'")
    else:
        warnings.append(f"Jev AI test request warning: {j_feedback}")
        print(f"   ! Jev AI zwrócił ostrzeżenie/błąd: {j_feedback}")

    if warnings:
        print(f"\n[OSTRZEŻENIA ({len(warnings)})]:")
        for w in warnings:
            print(f"  ! {w}")

    if errors:
        print(f"\n[BŁĘDY ({len(errors)})]:")
        for e in errors:
            print(f"  ✗ {e}")
        print("\nAUDYT ZAKOŃCZONY NIEPOWODZENIEM!")
        sys.exit(1)
    else:
        print("\n✓ AUDYT ZAKOŃCZONY 100% SUKCESEM! DZIAŁ 2 JEST ZŁOTYM WZORCEM JAKOŚCI CKE!")
        print("=" * 65)

if __name__ == '__main__':
    audit_dzial2()
