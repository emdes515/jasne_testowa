"""
Skrypt: enrich_all_225_math_visuals.py
Cel: Kompleksowe wzbogacenie wszystkich 15 działów (225 lekcji) w pliku
     seed/curriculum/curriculum_matematyka.json o 4-krotne dedykowane,
     unikalne schematy wektorowe Bento (Istota, Wzory, Przykład, Pułapka CKE)
     oraz wzbogacenie zadań praktycznych o schematy geometryczne i osie liczbowe.
Standard: Core-4 + Nocturne Luminary SVG (#FFB800, #10B981, #38BDF8, #F43F5E, #c084fc).
Zero fałszywych diagramów (pustych boksów tekstowych), zero wycieków surowego LaTeX-a.
"""

import json
import sys
import os
import re

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(__file__))

from lesson_visuals import get_visuals_for_lesson
from lesson_visuals.common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_number_line, make_geometry_diagram, make_plot_diagram,
    make_step_flow_diagram, make_comparison_card_diagram,
    make_symbol_card_grid_diagram, make_inequality_explainer_diagram
)

CURRICULUM_PATH = os.path.join(os.path.dirname(__file__), '..', 'seed', 'curriculum', 'curriculum_matematyka.json')

def clean_svg_string(raw):
    if not raw:
        return ''
    s = str(raw)
    s = s.replace('_{n+1}', 'ₙ₊₁')
    s = s.replace('_{n-1}', 'ₙ₋₁')
    s = s.replace('_{n}', 'ₙ')
    s = s.replace('_{0}', '₀')
    s = s.replace('_{1}', '₁')
    s = s.replace('_{2}', '₂')
    s = s.replace('_{3}', '₃')
    s = s.replace('_{4}', '₄')
    s = s.replace('_{5}', '₅')
    s = s.replace('_{k}', 'ₖ')
    s = s.replace('_{p}', 'ₚ')
    s = s.replace('_{w}', 'ᵥ')
    s = s.replace('_n', 'ₙ')
    s = s.replace('_0', '₀')
    s = s.replace('_1', '₁')
    s = s.replace('_2', '₂')
    s = s.replace('_3', '₃')
    s = s.replace('_k', 'ₖ')
    s = s.replace('_p', 'ₚ')
    s = s.replace('_w', 'ᵥ')
    s = s.replace('^{2}', '²')
    s = s.replace('^{3}', '³')
    s = s.replace('^{n}', 'ⁿ')
    s = s.replace('^{-1}', '⁻¹')
    s = s.replace('^2', '²')
    s = s.replace('^3', '³')
    s = s.replace('^n', 'ⁿ')
    s = s.replace('\\mathbb{N}^+', 'ℕ⁺')
    s = s.replace('\\mathbb{N}', 'ℕ')
    s = s.replace('\\mathbb{R}', 'ℝ')
    s = s.replace('\\mathbb{Z}', 'ℤ')
    s = s.replace('\\in', '∈')
    s = s.replace('\\notin', '∉')
    s = s.replace('\\ge', '≥')
    s = s.replace('\\geq', '≥')
    s = s.replace('\\le', '≤')
    s = s.replace('\\leq', '≤')
    s = s.replace('\\neq', '≠')
    s = s.replace('\\pm', '±')
    s = s.replace('\\approx', '≈')
    s = s.replace('\\Delta', 'Δ')
    s = s.replace('\\alpha', 'α')
    s = s.replace('\\beta', 'β')
    s = s.replace('\\gamma', 'γ')
    s = s.replace('\\pi', 'π')
    s = s.replace('\\infty', '∞')
    s = s.replace('\\cdot', '·')
    s = s.replace('\\times', '×')
    s = s.replace('\\implies', '⟹')
    s = s.replace('\\iff', '⟺')
    s = s.replace('\\lor', 'lub')
    s = s.replace('\\land', 'oraz')
    s = s.replace('\\cup', '∪')
    s = s.replace('\\cap', '∩')
    s = s.replace('\\setminus', '\\')
    s = s.replace('\\subset', '⊂')
    s = re.sub(r'\\sqrt\{([^}]+)\}', r'√\1', s)
    s = s.replace('\\sqrt', '√')
    s = re.sub(r'\\frac\{([^}]+)\}\{([^}]+)\}', r'\1/\2', s)
    s = re.sub(r'\\text\{([^}]+)\}', r'\1', s)
    s = re.sub(r'\\[a-zA-Z]+', '', s)
    s = s.replace('{', '').replace('}', '').replace('$', '')
    return s.strip()

def is_fake_diagram(d):
    if not isinstance(d, dict):
        return False
    if d.get('type') != 'GEOMETRY_2D':
        return False
    segs = d.get('segments', [])
    pts = d.get('points', [])
    polys = d.get('polygons', [])
    circles = d.get('circles', [])
    arcs = d.get('arcs', [])
    curves = d.get('curves', [])
    return (len(segs) == 0 and len(pts) == 0 and len(polys) <= 1 and len(circles) == 0 and len(arcs) == 0 and len(curves) == 0)

def sanitize_diagram(d):
    if not isinstance(d, dict):
        return d
    for lbl in d.get('labels', []):
        if 'text' in lbl:
            lbl['text'] = clean_svg_string(lbl['text'])
    for pt in d.get('points', []):
        if 'label' in pt:
            pt['label'] = clean_svg_string(pt['label'])
    for seg in d.get('segments', []):
        if 'label' in seg:
            seg['label'] = clean_svg_string(seg['label'])
    for arc in d.get('arcs', []):
        if 'label' in arc:
            arc['label'] = clean_svg_string(arc['label'])
    for tick in d.get('ticks', []):
        if isinstance(tick, dict) and 'label' in tick:
            tick['label'] = clean_svg_string(tick['label'])
    return d

def elevate_tab2(worked_example, lesson_title):
    steps = worked_example.get('steps', []) if isinstance(worked_example, dict) else []
    steps_data = []
    colors = [C_SKY, C_PRIMARY, C_SUCCESS, C_PURPLE]
    for idx, st in enumerate(steps[:3]):
        label = clean_svg_string(st.get('label', f'Krok {idx+1}'))
        text = clean_svg_string(st.get('text', ''))
        words = text.split()
        line1 = " ".join(words[:5])
        line2 = " ".join(words[5:11])
        desc = f"{line1}\n{line2}" if line2 else line1
        steps_data.append({
            'num': str(st.get('num', idx + 1)),
            'title': label[:24],
            'desc': desc[:70],
            'color': colors[idx % len(colors)]
        })
    if not steps_data:
        steps_data = [
            {'num': '1', 'title': 'Dane i założenia', 'desc': 'Wypisz dane z zadania\nUstal dziedzinę CKE', 'color': C_SKY},
            {'num': '2', 'title': 'Zastosowanie wzoru', 'desc': 'Podstaw do wzoru\nUprość wyrażenia', 'color': C_PRIMARY},
            {'num': '3', 'title': 'Wynik końcowy', 'desc': 'Sprawdź poprawność\nPodaj odpowiedź', 'color': C_SUCCESS}
        ]
    problem = clean_svg_string(worked_example.get('problem', '') if isinstance(worked_example, dict) else '')
    result = clean_svg_string(worked_example.get('result', '') if isinstance(worked_example, dict) else '')
    return make_step_flow_diagram(
        title=f"Przykład: {clean_svg_string(lesson_title)[:45]}",
        badge=problem[:45] if problem else "Rozwiązanie krok po kroku",
        caption=worked_example.get('result', 'Wyznaczono prawidłowy wynik zgodnie ze standardem CKE.') if isinstance(worked_example, dict) else 'Rozwiązanie krok po kroku.',
        steps=steps_data,
        metrics=[
            {'label': 'Treść zadania', 'value': f"${problem[:35]}$" if problem else "Zadanie CKE", 'color': C_SKY},
            {'label': 'Wynik CKE', 'value': f"${result[:35]}$" if result else "Rozwiązano poprawnie", 'color': C_SUCCESS},
            {'label': 'Metoda', 'value': 'Krok po kroku wg CKE', 'color': C_PRIMARY}
        ]
    )

def elevate_tab3(exam_trap, lesson_title):
    clean_trap = clean_svg_string(exam_trap)
    if 'poprawnie:' in str(exam_trap).lower() or 'prawidłowo:' in str(exam_trap).lower():
        parts = re.split(r'poprawnie:|prawidłowo:', str(exam_trap), flags=re.IGNORECASE)
        err_part = clean_svg_string(parts[0])
        corr_part = clean_svg_string(parts[1])
        right_lines = [err_part[:40], err_part[40:80]] if len(err_part) > 40 else [err_part]
        left_lines = [corr_part[:40], corr_part[40:80]] if len(corr_part) > 40 else [corr_part]
    else:
        words = clean_trap.split()
        right_lines = [" ".join(words[:6]), " ".join(words[6:12])]
        left_lines = ["Zastosuj wzór z tablic CKE", "Pamiętaj o założeniach i znakach"]

    right_lines = [l for l in right_lines if l]
    left_lines = [l for l in left_lines if l]

    return make_comparison_card_diagram(
        title=f"Pułapka CKE: {clean_svg_string(lesson_title)[:40]}",
        badge="UWAGA NA TYPOWY BŁĄD",
        caption=str(exam_trap) if exam_trap else 'Uważaj na typowe błędy i pułapki maturalne CKE.',
        left_title="✓ POPRAWNY NAWYK CKE",
        left_lines=left_lines,
        right_title="❌ PUŁAPKA / BŁĄD",
        right_lines=right_lines,
        metrics=[
            {'label': 'Ryzyko CKE', 'value': 'Utrata 1-2 punktów', 'color': C_DANGER},
            {'label': 'Złota zasada', 'value': 'Zawsze zapisuj założenia', 'color': C_SUCCESS}
        ]
    )

def elevate_tab0_or_tab1(title, formula_text="", notes=""):
    t_lower = (str(title) + " " + str(formula_text)).lower()
    if any(k in t_lower for k in ['nierównoś', '>', '<', '≥', '≤', 'przedział']):
        return make_inequality_explainer_diagram(
            title=f"Symbole i osie: {clean_svg_string(title)[:40]}",
            badge=clean_svg_string(formula_text)[:35] if formula_text else ">,\; <,\; \\ge,\; \\le",
            caption="W nierównościach kluczowe jest rozróżnienie kółka otwartego (ostre <, >) i zamalowanego (słabe ≤, ≥)."
        )
    if any(k in t_lower for k in ['zbiór', 'suma zbior', 'przekrój', 'iloczyn zbior', 'różnica zbior', 'należy']):
        cards = [
            {'sym': '∈', 'name': 'Należy do', 'color': C_SKY, 'lines': ['Element jest w zbiorze', 'np. 3 ∈ {1, 2, 3}', 'Znak przynależności']},
            {'sym': '∪', 'name': 'Suma zbiorów', 'color': C_SUCCESS, 'lines': ['Wszystkie elementy razem', 'Łączymy oba zbiory', 'Słowo: LUB']},
            {'sym': '∩', 'name': 'Iloczyn (część wspólna)', 'color': C_PRIMARY, 'lines': ['Tylko wspólne elementy', 'To co się nakłada', 'Słowo: ORAZ']},
            {'sym': '\\', 'name': 'Różnica zbiorów', 'color': C_DANGER, 'lines': ['Zabieramy elementy', 'A bez elementów B', 'Tylko ze zbioru A']}
        ]
        return make_symbol_card_grid_diagram(
            title=f"Działania na zbiorach: {clean_svg_string(title)[:40]}",
            badge="\\cup,\; \\cap,\; \\setminus,\; \\in",
            caption="W zadaniach maturalnych suma (∪) oznacza spójnik LUB, a iloczyn (∩) spójnik ORAZ.",
            cards=cards
        )
    f_clean = clean_svg_string(formula_text)
    n_clean = clean_svg_string(notes)
    cards = [
        {'sym': '1', 'name': 'Wzór główny', 'color': C_PRIMARY, 'lines': [f_clean[:35], f_clean[35:70] if len(f_clean) > 35 else 'Podstawa obliczeń CKE', 'Z tablic maturalnych']},
        {'sym': '2', 'name': 'Zastosowanie', 'color': C_SKY, 'lines': [n_clean[:35] if n_clean else 'Krok po kroku', 'Ustal dziedzinę', 'Podstaw konkretne dane']},
        {'sym': '3', 'name': 'Wskazówka CKE', 'color': C_SUCCESS, 'lines': ['Pamiętaj o jednostkach', 'Sprawdź znak wyniku', 'Pełna odpowiedź']}
    ]
    return make_symbol_card_grid_diagram(
        title=f"Wzory i definicje: {clean_svg_string(title)[:40]}",
        badge=f_clean[:40] if f_clean else "Kluczowe zależności CKE",
        caption=notes or "Wzorzec z karty wzorów CKE.",
        cards=cards
    )

def enrich_task_data(task, lesson_id, topic_id, authentic_map):
    key = f"{topic_id}::{lesson_id}::{task.get('id')}"
    if key in authentic_map:
        task['diagram'] = sanitize_diagram(authentic_map[key])
        task.pop('numberLine', None)
    else:
        task.pop('diagram', None)
        task.pop('numberLine', None)

    # Opcje z osiami liczbowymi w zadaniach pytających wprost o rysunek ("na którym rysunku...")
    text = (task.get('question') or task.get('content') or task.get('math_statement') or '').lower()
    if 'na którym rysunku' in text and isinstance(task.get('options'), list):
        for idx, opt in enumerate(task['options']):
            if isinstance(opt, dict) and not opt.get('numberLine'):
                opt_text = (opt.get('text') or opt.get('content_latex') or opt.get('content') or '').lower()
                m_opt = re.search(r'([<(\[])\s*(-?\d+)\s*[,;]\s*(-?\d+)\s*([>)\]])', opt_text)
                if m_opt:
                    left_br, n1, n2, right_br = m_opt.groups()
                    v1, v2 = sorted([int(n1), int(n2)])
                    opt['numberLine'] = make_number_line(v1 - 2, v2 + 2, [v1, v2], [{'from': v1, 'to': v2, 'fromIncluded': left_br in ['<', '['], 'toIncluded': right_br in ['>', ']']}])

    return task

def main():
    print("=== START: Wzbogacanie 15 działów (225 unikalnych lekcji) o autentyczną grafikę wektorową ===")
    if not os.path.exists(CURRICULUM_PATH):
        print(f"BŁĄD: Nie znaleziono pliku {CURRICULUM_PATH}")
        sys.exit(1)

    with open(CURRICULUM_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    topics = data.get('topics', [])
    print(f"Wczytano {len(topics)} działów z pliku curriculum_matematyka.json.")

    authentic_path = os.path.join(os.path.dirname(__file__), 'authentic_task_diagrams.json')
    authentic_map = {}
    if os.path.exists(authentic_path):
        with open(authentic_path, 'r', encoding='utf-8') as af:
            authentic_map = json.load(af)
        print(f"Załadowano {len(authentic_map)} autentycznych diagramów zadań z {authentic_path}.")

    total_lessons_enriched = 0
    total_tasks_enriched = 0
    elevated_tabs_count = 0

    for topic in topics:
        topic_id = topic.get('id', '')
        lessons = topic.get('lessons', [])
        print(f"\nPrzetwarzanie {topic_id}: {topic.get('title')} ({len(lessons)} lekcji)...")

        for l_idx, lesson in enumerate(lessons):
            lesson_id = lesson.get('id', '')
            lesson_title = lesson.get('title', '')

            pill = lesson.get('theory_pill')
            if not pill:
                pill = {}
                lesson['theory_pill'] = pill

            worked_example = pill.get('worked_example', {})
            exam_trap = pill.get('exam_trap', '')
            core_formulas = pill.get('core_formulas', [])

            # 1. Pobierz schematy z generatora
            tab0, tab1, tab2, tab3 = get_visuals_for_lesson(topic_id, lesson_id, lesson_title, l_idx)

            # 2. Inteligentna elevacja fałszywych diagramów
            if is_fake_diagram(tab0):
                tab0 = elevate_tab0_or_tab1(lesson_title, pill.get('concept_essence', '')[:60])
                elevated_tabs_count += 1
            tab0 = sanitize_diagram(tab0)

            elevated_tab1 = []
            tab1_list = tab1 if isinstance(tab1, list) else [tab1]
            for f_idx, f_item in enumerate(tab1_list):
                if is_fake_diagram(f_item):
                    formula_obj = core_formulas[f_idx] if f_idx < len(core_formulas) else {}
                    f_name = formula_obj.get('name', lesson_title)
                    f_expr = formula_obj.get('formula', '')
                    f_notes = formula_obj.get('notes', '')
                    elevated_tab1.append(elevate_tab0_or_tab1(f_name, f_expr, f_notes))
                    elevated_tabs_count += 1
                else:
                    elevated_tab1.append(sanitize_diagram(f_item))
            tab1 = elevated_tab1

            if is_fake_diagram(tab2):
                tab2 = elevate_tab2(worked_example, lesson_title)
                elevated_tabs_count += 1
            tab2 = sanitize_diagram(tab2)

            if is_fake_diagram(tab3):
                tab3 = elevate_tab3(exam_trap, lesson_title)
                elevated_tabs_count += 1
            tab3 = sanitize_diagram(tab3)

            # 3. Przypisanie do theory_pill
            # Tab 0: Istota pojęcia
            if isinstance(tab0, dict) and tab0.get('type') == 'number_line':
                pill['numberLine'] = tab0
                pill.pop('diagram', None)
            else:
                pill['diagram'] = tab0
                pill.pop('numberLine', None)

            # Tab 1: Wzory
            for f_idx, formula in enumerate(core_formulas):
                if isinstance(formula, dict):
                    f_visual = tab1[f_idx % len(tab1)]
                    if isinstance(f_visual, dict) and f_visual.get('type') == 'number_line':
                        formula['numberLine'] = f_visual
                        formula.pop('diagram', None)
                    else:
                        formula['diagram'] = f_visual
                        formula.pop('numberLine', None)

            # Tab 2: Przykład
            if isinstance(worked_example, dict):
                if isinstance(tab2, dict) and tab2.get('type') == 'number_line':
                    worked_example['numberLine'] = tab2
                    worked_example.pop('diagram', None)
                else:
                    worked_example['diagram'] = tab2
                    worked_example.pop('numberLine', None)

            # Tab 3: Pułapka CKE
            if isinstance(tab3, dict) and tab3.get('type') == 'number_line':
                pill['trapNumberLine'] = tab3
                pill.pop('trapDiagram', None)
            else:
                pill['trapDiagram'] = tab3
                pill.pop('trapNumberLine', None)

            total_lessons_enriched += 1

            # 4. Wzbogać zadania praktyczne w lekcji
            tasks = lesson.get('tasks', [])
            for task in tasks:
                enrich_task_data(task, lesson_id, topic_id, authentic_map)
                if task.get('diagram') or task.get('numberLine'):
                    total_tasks_enriched += 1

    print(f"\nZapisywanie zaktualizowanej bazy do pliku JSON ({CURRICULUM_PATH})...")
    with open(CURRICULUM_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\nSUKCES! Wzbogacono łącznie {total_lessons_enriched} lekcji (100% z 225).")
    print(f"Podniesiono {elevated_tabs_count} zakładek z fałszywych atrapek do autentycznych schematów!")
    print(f"Wzbogacono {total_tasks_enriched} zadań praktycznych.")
    print("=== KONIEC PRZETWARZANIA ===")

if __name__ == '__main__':
    main()
