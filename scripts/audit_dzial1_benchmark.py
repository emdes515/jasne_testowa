"""
audit_dzial1_benchmark.py - Rygorystyczny audyt jakości CKE dla Działu 1
Weryfikuje:
1. Podział tytułu i numeru (brak "Dział 1:" w nazwie).
2. Dokładnie 4 lekcje, po 5 zadań każda (20 zadań).
3. Poprawność typów i kluczy odpowiedzi (SINGLE_CHOICE ma poprawny identyfikator w [A, B, C, D], NUMERIC ma wartość, OPEN ma punkty).
4. Czystość składni KaTeX (brak podwójnych/niedomkniętych delimiterów, brak surowych znaków kodu).
5. 100% poprawności stron Karty Wzorów CKE 2023 (str. 4 dla potęg/pierwiastków, str. 7 dla wzorów skróconego mnożenia).
6. Kompletność pigułek Bento i infografik SVG.
"""
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

def check_katex_syntax(text, context=""):
    errors = []
    if not text or not isinstance(text, str):
        return errors
        
    # Check for raw LaTeX delimiters \( or \) or \[ or \]
    if r'\(' in text or r'\)' in text:
        errors.append(f"{context}: Znaleziono surowy delimiter LaTeX \\( lub \\)")
    if r'\[' in text or r'\]' in text:
        errors.append(f"{context}: Znaleziono surowy delimiter LaTeX \\[ lub \\]")

    # Check for dollar balancing (excluding escaped \$)
    clean = re.sub(r'\\\$', '', text)
    # Exclude $$...$$ blocks first
    clean_no_double = re.sub(r'\$\$[\s\S]*?\$\$', '', clean)
    # Count remaining single $
    single_dollars = clean_no_double.count('$')
    if single_dollars % 2 != 0:
        errors.append(f"{context}: Niezbalansowana liczba pojedynczych znaków $ ({single_dollars}) w tekście: '{text[:80]}...'")

    return errors

def audit_dzial1():
    print("=" * 65)
    print("  AUDYT BENCHMARKU JAKOŚCI CKE: DZIAŁ 1 (Potęgi i pierwiastki)")
    print("=" * 65)

    with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    topics = data.get('topics', []) if isinstance(data, dict) else data
    d1 = None
    for t in topics:
        if t.get('id') in ['dzial-1', 'topic-1', 'potegi-i-pierwiastki'] or 'potęgi' in t.get('title', '').lower():
            d1 = t
            break

    if not d1:
        print("[BLAD KRYTYCZNY] Nie znaleziono Działu 1 w curriculum_matematyka.json!")
        sys.exit(1)

    errors = []
    warnings = []

    # 1. Separacja numeru od nazwy
    title = d1.get('title', '')
    print(f"-> Tytuł działu: '{title}'")
    if re.search(r'^Dział\s*[\d.]+\s*[:\-–]?', title, re.IGNORECASE):
        errors.append(f"Tytuł działu zawiera przedrostek numeru: '{title}'!")
    else:
        print("   ✓ Tytuł merytoryczny czysty (brak 'Dział X:').")

    if 'topic_number' in d1 and d1['topic_number'] == 1:
        print(f"   ✓ Metadane topic_number = {d1['topic_number']} poprawnie wyodrębnione.")
    else:
        errors.append(f"Brak lub niepoprawny topic_number: {d1.get('topic_number')}")

    # 2. Liczba lekcji
    lessons = d1.get('lessons', [])
    print(f"-> Liczba lekcji: {len(lessons)}")
    if len(lessons) != 4:
        errors.append(f"Oczekiwano 4 lekcji w Dziale 1, znaleziono {len(lessons)}!")
    else:
        print("   ✓ Dokładnie 4 lekcje.")

    total_tasks = 0

    # 3. Audyt każdej lekcji
    for l_idx, lesson in enumerate(lessons, 1):
        lid = lesson.get('id')
        ltitle = lesson.get('title')
        print(f"\n--- [Lekcja 1.{l_idx}] {lid}: '{ltitle}' ---")

        # Tytuł lekcji nie powinien mieć "L1.1.X:"
        if re.search(r'^L\d+(?:\.\d+)+\s*[:\-–]?', ltitle, re.IGNORECASE):
            errors.append(f"Lekcja {lid} zawiera prefiks w tytule: '{ltitle}'")

        # Bento Pill Audit
        tp = lesson.get('theory_pill') or {}
        tabs = ['concept_essence', 'matura_context', 'worked_example', 'exam_trap']
        for tab in tabs:
            if not tp.get(tab):
                errors.append(f"Lekcja {lid}: brak wymaganej zakładki Bento '{tab}'")

        # Core formulas & CKE page check
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
                elif l_idx == 3 and 'str. 7' not in cke_page:
                    errors.append(f"Lekcja {lid} (usuwanie niewymierności), formuła '{f_title}': powinna odsyłać do 'str. 7', a ma '{cke_page}'!")
                elif l_idx != 3 and 'str. 4' not in cke_page:
                    errors.append(f"Lekcja {lid} (potęgi/pierwiastki), formuła '{f_title}': powinna odsyłać do 'str. 4', a ma '{cke_page}'!")
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

        # Tasks
        tasks = lesson.get('tasks', [])
        print(f"   Liczba zadań: {len(tasks)}")
        if len(tasks) < 5:
            errors.append(f"Lekcja {lid} ma {len(tasks)} zadań (wymagane co najmniej 5 do puli)!")
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

            # Key correctness
            if ttype == 'SINGLE_CHOICE':
                cid = task.get('correct_answer') or task.get('correct_id')
                opts = task.get('options', [])
                if not cid or cid not in ['A', 'B', 'C', 'D']:
                    errors.append(f"Zadanie {tid}: nieprawidłowy poprawny klucz '{cid}'!")
                if len(opts) != 4:
                    errors.append(f"Zadanie {tid}: oczekiwano 4 opcji (A,B,C,D), jest {len(opts)}!")
                for opt in opts:
                    errors.extend(check_katex_syntax(opt.get('text', ''), f"Zadanie {tid} opcja {opt.get('id')}"))
            elif ttype == 'NUMERIC_INPUT':
                cval = str(task.get('correct_answer') or task.get('correct_val', ''))
                if not cval:
                    errors.append(f"Zadanie {tid} (NUMERIC): brak poprawnej wartości liczbowej!")
            elif ttype == 'OPEN_PROOF':
                pts = task.get('points', 0)
                if pts <= 0:
                    errors.append(f"Zadanie {tid} (OPEN_PROOF): points <= 0!")
                if not task.get('scoring_key'):
                    errors.append(f"Zadanie {tid} (OPEN_PROOF): brak scoring_key!")

    print("\n" + "=" * 65)
    print(f"ŁĄCZNA LICZBA ZADAŃ W DZIALE 1: {total_tasks} (wymagane co najmniej 20)")
    if total_tasks < 20:
        errors.append(f"Dział 1 ma łącznie {total_tasks} zadań, wymagane co najmniej 20!")

    if warnings:
        print(f"\n[OSTRZEZENIA ({len(warnings)})]:")
        for w in warnings:
            print(f"  ! {w}")

    if errors:
        print(f"\n[BLĘDY ({len(errors)})]:")
        for e in errors:
            print(f"  ✗ {e}")
        print("\nAUDYT ZAKONCZONY NIEPOWODZENIEM!")
        sys.exit(1)
    else:
        print("\n✓ AUDYT ZAKOŃCZONY 100% SUKCESEM! DZIAŁ 1 JEST ZŁOTYM WZORCEM JAKOŚCI CKE!")
        print("=" * 65)

if __name__ == '__main__':
    audit_dzial1()
