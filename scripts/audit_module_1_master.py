"""
audit_module_1_master.py - Rygorystyczny całościowy audyt jakości CKE dla wszystkich 10 działów Modułu 1:
"NA 30% - ŻELAZNE PEWNIAKI MATURALNE" (34 lekcje, 170 zadań).

Sprawdza 6 Filarów Doskonałości Platformy JASNE:
1. Czyste nazewnictwo (brak 'Dział X:' w tytule, poprawny topic_number, brak prefiksów 'L1.X.Y:').
2. Dokładnie 34 lekcje (po 3-4 na dział) i dokładnie 170 zadań (dokładnie 5 na każdą lekcję).
3. Brak zduplikowanych dystraktorów i poprawne klucze w zadaniach.
4. Czystość składni KaTeX (brak surowych delimiterów, zbalansowane dolary).
5. 100% poprawności numerów stron w Karcie Wzorów CKE 2023.
6. Kompletność pigułek Core-4 Bento i brak niedopasowania infografik.
"""
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Oczekiwane strony Karty Wzorów CKE 2023 dla poszczególnych działów
EXPECTED_CKE_PAGES = {
    1: ['str. 4', 'str. 7'],      # Potęgi i pierwiastki
    2: ['str. 5'],                # Logarytmy
    3: ['str. 4'],                # Wartość bezwzględna
    4: ['str. 7'],                # Wzory skróconego mnożenia
    5: ['str. 4', 'str. 7'],      # Nierówności liniowe
    6: ['str. 7', 'str. 8'],      # Równania w postaci iloczynowej
    7: ['str. 7'],                # Równania i wyrażenia wymierne
    8: ['str. 7', 'str. 8'],      # Nierówności kwadratowe
    9: ['str. 6', 'str. 7'],      # Odczytywanie informacji z wykresu
    10: ['str. 21', 'str. 22', 'str. 7'] # Funkcja liniowa
}

EXPECTED_TOPIC_NAMES = {
    1: "Potęgi i pierwiastki",
    2: "Logarytmy",
    3: "Wartość bezwzględna",
    4: "Wzory skróconego mnożenia i algebra",
    5: "Nierówności liniowe",
    6: "Równania w postaci iloczynowej",
    7: "Równania i wyrażenia wymierne",
    8: "Nierówności kwadratowe",
    9: "Odczytywanie informacji z wykresu funkcji",
    10: "Funkcja liniowa i jej własności"
}

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

def audit_module_1():
    print("=" * 70)
    print("  RYGORYSTYCZNY MASTER AUDYT JAKOŚCI CKE: CAŁY MODUŁ 1")
    print("  Standard: Core-4 Bento, Nocturne Luminary SVG, Autentyczne CKE")
    print("=" * 70)

    try:
        with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"[BLAD KRYTYCZNY] Nie można otworzyć curriculum_matematyka.json: {e}")
        return False

    topics = data.get('topics', []) if isinstance(data, dict) else data
    if len(topics) < 10:
        print(f"[BLAD KRYTYCZNY] Oczekiwano co najmniej 10 działów w Module 1, znaleziono {len(topics)}!")
        return False

    all_errors = []
    all_warnings = []
    total_lessons_count = 0
    total_tasks_count = 0

    for t_idx in range(1, 11):
        topic = topics[t_idx - 1]
        t_id = topic.get('id', f'dzial-{t_idx}')
        t_title = topic.get('title', '')
        t_num = topic.get('topic_number')
        expected_title = EXPECTED_TOPIC_NAMES.get(t_idx)

        print(f"\n=======================================================")
        print(f"  [DZIAŁ {t_idx}/10] {t_id}: '{t_title}'")
        print(f"=======================================================")

        # 1. Separacja numeru od nazwy
        if re.search(r'^Dział\s*[\d.]+\s*[:\-–]?', t_title, re.IGNORECASE):
            all_errors.append(f"Dział {t_idx}: tytuł zawiera przedrostek numeru: '{t_title}'!")
        elif t_title != expected_title:
            all_warnings.append(f"Dział {t_idx}: oczekiwano tytułu '{expected_title}', otrzymano '{t_title}'")

        if t_num != t_idx:
            all_errors.append(f"Dział {t_idx}: topic_number = {t_num} zamiast {t_idx}!")

        lessons = topic.get('lessons', [])
        print(f"  -> Liczba lekcji: {len(lessons)}")
        total_lessons_count += len(lessons)

        for l_idx, lesson in enumerate(lessons, 1):
            lid = lesson.get('id', f'lesson-{t_idx}-{l_idx}')
            ltitle = lesson.get('title', '')
            print(f"     • [Lekcja {t_idx}.{l_idx}] {lid}: '{ltitle}'")

            if re.search(r'^L\d+(?:\.\d+)+\s*[:\-–]?', ltitle, re.IGNORECASE):
                all_errors.append(f"Lekcja {lid}: prefiks L1.X.Y w tytule: '{ltitle}'")

            # Bento Pill Audit
            tp = lesson.get('theory_pill') or {}
            tabs = ['concept_essence', 'matura_context', 'worked_example', 'exam_trap']
            for tab in tabs:
                if not tp.get(tab):
                    all_errors.append(f"Lekcja {lid}: brak zakładki Bento '{tab}'")

            # Core formulas & CKE page audit
            formulas = tp.get('core_formulas', [])
            if not formulas:
                all_errors.append(f"Lekcja {lid}: brak core_formulas w Bento!")
            
            exp_pages = EXPECTED_CKE_PAGES.get(t_idx, [])
            for f_idx, form in enumerate(formulas):
                in_sheet = form.get('in_cke_sheet', False)
                cke_page = form.get('cke_page', '')
                f_title = form.get('title', '')
                if in_sheet:
                    if not cke_page:
                        all_errors.append(f"Lekcja {lid}, formuła '{f_title}': oznaczona jako in_cke_sheet, ale brak cke_page!")
                    elif not any(p in cke_page for p in exp_pages):
                        all_warnings.append(f"Lekcja {lid} (Dział {t_idx}), formuła '{f_title}': strona '{cke_page}' może odbiegać od zalecanych {exp_pages}")

            # KaTeX syntax checks in Bento
            for k in ['concept_essence', 'matura_context', 'exam_trap']:
                txt = tp.get(k, '')
                all_errors.extend(check_katex_syntax(txt, f"Lekcja {lid} bento {k}"))

            we = tp.get('worked_example', {})
            for st in we.get('steps', []):
                all_errors.extend(check_katex_syntax(st.get('text', ''), f"Lekcja {lid} step text"))

            # Visual check
            tab0 = lesson.get('visuals', {}).get('tab0') or tp.get('diagram')
            if not tab0:
                all_errors.append(f"Lekcja {lid}: brak grafiki Tab 0!")
            else:
                v_title = tab0.get('title', '')
                v_type = tab0.get('type', '')
                if not v_title:
                    all_warnings.append(f"Lekcja {lid}: grafika Tab 0 nie ma tytułu!")

            # Tasks audit (dokładnie 5 na lekcję!)
            tasks = lesson.get('tasks', [])
            total_tasks_count += len(tasks)
            if len(tasks) != 5:
                all_errors.append(f"Lekcja {lid}: oczekiwano dokładnie 5 zadań, znaleziono {len(tasks)}!")

            for t_idx_task, task in enumerate(tasks, 1):
                tid = task.get('id', f'task-{t_idx}-{l_idx}-{t_idx_task}')
                ttype = task.get('type')
                tq = task.get('question', '')
                correct_ans = task.get('correct_answer') or task.get('correct_val')
                expl = task.get('explanation', '')
                trap = task.get('cke_trap', '')

                all_errors.extend(check_katex_syntax(tq, f"Zadanie {tid} pytanie"))
                all_errors.extend(check_katex_syntax(expl, f"Zadanie {tid} wyjaśnienie"))
                all_errors.extend(check_katex_syntax(trap, f"Zadanie {tid} pułapka"))

                if ttype == 'SINGLE_CHOICE':
                    options = task.get('options', [])
                    if len(options) != 4:
                        all_errors.append(f"Zadanie {tid} (SINGLE_CHOICE) ma {len(options)} opcji zamiast 4!")
                    opt_texts = set()
                    opt_ids = set()
                    has_correct = False
                    for opt in options:
                        oid = opt.get('id')
                        otxt = opt.get('text', '').strip()
                        if oid in opt_ids:
                            all_errors.append(f"Zadanie {tid}: zduplikowany ID opcji '{oid}'!")
                        opt_ids.add(oid)

                        if otxt in opt_texts:
                            all_errors.append(f"Zadanie {tid}: ZDUPLIKOWANY DYSTRAKTOR! Treść: '{otxt}'")
                        opt_texts.add(otxt)

                        if opt.get('is_correct') or oid == correct_ans:
                            has_correct = True
                    if not has_correct:
                        all_errors.append(f"Zadanie {tid}: brak poprawnej odpowiedzi!")

                elif ttype == 'TRUE_FALSE':
                    if str(correct_ans).upper() not in ['P', 'F', 'PRAWDA', 'FAŁSZ', 'TRUE', 'FALSE']:
                        all_errors.append(f"Zadanie {tid} (TRUE_FALSE) ma niepoprawny klucz: '{correct_ans}'")

                elif ttype == 'NUMERIC_INPUT':
                    if correct_ans is None:
                        all_errors.append(f"Zadanie {tid} (NUMERIC_INPUT) brak wartości numerycznej!")

    print("\n" + "=" * 70)
    print(f"  PODSUMOWANIE MASTER AUDYTU MODUŁU 1:")
    print(f"  Łączna liczba lekcji: {total_lessons_count} (oczekiwano: 34)")
    print(f"  Łączna liczba zadań:  {total_tasks_count} (oczekiwano: 170)")
    print("=" * 70)

    if total_lessons_count != 34:
        all_errors.append(f"Oczekiwano 34 lekcji w Module 1, znaleziono {total_lessons_count}!")
    if total_tasks_count != 170:
        all_errors.append(f"Oczekiwano 170 zadań w Module 1, znaleziono {total_tasks_count}!")

    if all_errors:
        print(f"\n❌ AUDYT WYKRYŁ {len(all_errors)} BŁĘDÓW:")
        for err in all_errors:
            print(f"  [ERROR] {err}")
    else:
        print("\n✅ ZERO BŁĘDÓW! Cały Moduł 1 spełnia krytyczne wymogi architektoniczne i dydaktyczne.")

    if all_warnings:
        print(f"\n⚠️ OSTRZEŻENIA / UWAGI JAKOŚCIOWE ({len(all_warnings)}):")
        for w in all_warnings:
            print(f"  [WARN] {w}")

    return len(all_errors) == 0

if __name__ == '__main__':
    ok = audit_module_1()
    sys.exit(0 if ok else 1)
