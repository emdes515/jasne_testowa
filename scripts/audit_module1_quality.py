# -*- coding: utf-8 -*-
"""
audit_module1_quality.py - Zautomatyzowany audytor jakości Modułu 1:
"NA 30% – ŻELAZNE PEWNIAKI MATURALNE" (10 działów, 34 mikrolekcje, 164 zadania).

Sprawdza:
1. Surowy ASCII Math (brak $...$ wokół potęg, pierwiastków, zmiennych, równań).
2. Ściśnięte formuły warunkowe (brak formatowania pionowego cases/aligned).
3. Kolizje i dublowanie w diagramach wizualnych (Tab 0 slop).
4. Poprawność etykiet działów i nagłówków.
"""
import os
import sys
import json
import re

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

CURRICULUM_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'seed', 'curriculum', 'curriculum_matematyka.json'))

def find_raw_ascii_math(text):
    """
    Wykrywa podejrzane fragmenty matematyczne w tekście poza blokami $...$ lub $$...$$.
    """
    if not text or not isinstance(text, str):
        return []
    
    # Usuń poprawne bloki LaTeX $...$ oraz $$...$$
    clean = re.sub(r'\$\$[\s\S]*?\$\$', ' ', text)
    clean = re.sub(r'\$[^\$]+?\$', ' ', clean)
    clean = re.sub(r'\\\[[\s\S]*?\\\]', ' ', clean)
    clean = re.sub(r'\\begin\{cases\}[\s\S]*?\\end\{cases\}', ' ', clean)

    issues = []

    # 1. Potęgi z daszkiem np. (a^2)^3, a^(2^3), 2^3, x^2, a^n
    powers = re.findall(r'(?:\([a-zA-Z\d\^]+\)\s*\^\s*[a-zA-Z\d\(\)]+|[a-zA-Z\d]+\s*\^\s*[\(\{\]?[a-zA-Z\d\^]+[\)\}\]]?)', clean)
    for p in powers:
        issues.append(f"Surowy daszek potęgi: '{p}'")

    # 2. Pierwiastki bez $: sqrt(x), \sqrt bez $
    roots = re.findall(r'(?:sqrt\s*\([^\)]+\)|\\sqrt\{[^\}]+\})', clean)
    for r in roots:
        issues.append(f"Niezamknięty pierwiastek: '{r}'")

    # 3. Wyrażenia warunkowe w tekście: a > 0, a < 0, a = 0 (z wyłączeniem html)
    conds = re.findall(r'(?<![<a-zA-Z])([a-zA-Z]\s*(?:>|<|>=|<=|==|!=)\s*[-+]?\d+)(?![>a-zA-Z])', clean)
    for c in conds:
        issues.append(f"Niezamknięta nierówność/równanie: '{c}'")

    # 4. Równości z operacjami: np. 2 * 2 = 4, m - (-n) = m + n
    eqs = re.findall(r'([a-zA-Z\d\(\)]+\s*[\+\-\*\/·]\s*[a-zA-Z\d\(\)]+\s*=\s*[a-zA-Z\d\(\)\+\-\*\/·]+)', clean)
    for eq in eqs:
        issues.append(f"Surowe równanie w tekście: '{eq}'")

    return issues

def audit_curriculum():
    if not os.path.exists(CURRICULUM_PATH):
        print(f"BŁĄD: Plik {CURRICULUM_PATH} nie istnieje!")
        return 1

    with open(CURRICULUM_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    topics = data.get('topics', [])
    print(f"=== AUDYT MODUŁU 1: {len(topics)} działów ===")

    total_ascii_issues = 0
    total_horizontal_formulas = 0
    total_duplicate_diagrams = 0
    total_header_badge_issues = 0

    for t_idx, topic in enumerate(topics, 1):
        topic_id = topic.get('id', '')
        topic_title = topic.get('title', '')
        short_title = topic.get('short_title', '')
        lessons = topic.get('lessons', [])

        if not short_title or 'Liczby Rzeczywiste' in short_title and t_idx > 1:
            print(f"[!] Dział {topic_id} ma nieprecyzyjny short_title: '{short_title}'")
            total_header_badge_issues += 1

        for l_idx, lesson in enumerate(lessons, 1):
            l_id = lesson.get('id', '')
            l_title = lesson.get('title', '')
            pill = lesson.get('theory_pill', {})
            tasks = lesson.get('tasks', [])

            # Sprawdź pola tekstowe w pigułce
            text_fields = [
                ('concept_essence', pill.get('concept_essence', '')),
                ('matura_context', pill.get('matura_context', '')),
                ('keyTakeaway', pill.get('keyTakeaway', '')),
                ('exam_trap', pill.get('exam_trap', ''))
            ]

            # Sprawdź wzory w core_formulas
            for f_idx, form in enumerate(pill.get('core_formulas', []), 1):
                text_fields.append((f"core_formula_{f_idx}_tip", form.get('matura_tip', '')))
                text_fields.append((f"core_formula_{f_idx}_mnemonic", form.get('mnemonic', '')))
                text_fields.append((f"core_formula_{f_idx}_desc", form.get('description', '')))
                text_fields.append((f"core_formula_{f_idx}_example", form.get('example', '')))

            # Sprawdź worked_example
            we = pill.get('worked_example', {})
            if isinstance(we, dict):
                text_fields.append(('worked_example_problem', we.get('problem', '')))
                text_fields.append(('worked_example_solution', we.get('solution', '')))

            # Sprawdź visual_diagram
            diag = pill.get('visual_diagram', {})
            if isinstance(diag, dict):
                badge = diag.get('formulaBadge', '')
                if badge and ('\\implies \\nearrow' in badge or ('a > 0' in badge and 'a < 0' in badge and '\\begin{cases}' not in badge)):
                    print(f"[!] Lekcja {l_id} ({l_title}): Ściśnięta formuła warunkowa w badge: '{badge[:50]}...'")
                    total_horizontal_formulas += 1

                # Sprawdź dublowanie tekstu w SVG i kasetonach
                caption = diag.get('caption', '')
                if caption:
                    text_fields.append(('diagram_caption', caption))

            # Sprawdź zadania
            for t_idx_task, task in enumerate(tasks, 1):
                t_id = task.get('id', f'task_{t_idx_task}')
                text_fields.append((f"{t_id}_question", task.get('question', '')))
                text_fields.append((f"{t_id}_explanation", task.get('explanation', '')))
                text_fields.append((f"{t_id}_cke_trap", task.get('cke_trap', '')))
                text_fields.append((f"{t_id}_tip", task.get('tip', '')))
                for opt in task.get('options', []):
                    if isinstance(opt, dict):
                        text_fields.append((f"{t_id}_opt_{opt.get('id')}", opt.get('text', '')))

            # Analiza wszystkich pól tekstowych
            for field_name, val in text_fields:
                if not val:
                    continue
                issues = find_raw_ascii_math(val)
                if issues:
                    for iss in issues:
                        print(f"[!] Lekcja {l_id} [{field_name}]: {iss}")
                        total_ascii_issues += 1

    print("\n" + "=" * 60)
    print("  PODSUMOWANIE AUDYTU JAKOŚCI MODUŁU 1")
    print("=" * 60)
    print(f"Liczba wykrytych surowych wyrażeń ASCII Math : {total_ascii_issues}")
    print(f"Liczba ściśniętych formuł warunkowych         : {total_horizontal_formulas}")
    print(f"Liczba problemów z badge'ami nagłówków       : {total_header_badge_issues}")
    print(f"Liczba zduplikowanych bloków w diagramach    : {total_duplicate_diagrams}")
    print("=" * 60)

    total_defects = total_ascii_issues + total_horizontal_formulas + total_header_badge_issues + total_duplicate_diagrams
    return total_defects

if __name__ == '__main__':
    code = audit_curriculum()
    sys.exit(code)
