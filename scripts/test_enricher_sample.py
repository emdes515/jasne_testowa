import os, sys, json, re
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(__file__))

from lesson_visuals.common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_step_flow_diagram, make_comparison_card_diagram, make_symbol_card_grid_diagram, make_inequality_explainer_diagram
)

def clean_svg_string(s):
    if not s: return ''
    return (
        s.replace('_{n+1}', 'ₙ₊₁')
         .replace('_{n-1}', 'ₙ₋₁')
         .replace('_{n}', 'ₙ')
         .replace('_{0}', '₀')
         .replace('_{1}', '₁')
         .replace('_{2}', '₂')
         .replace('_{k}', 'ₖ')
         .replace('_n', 'ₙ')
         .replace('_0', '₀')
         .replace('_1', '₁')
         .replace('_2', '₂')
         .replace('^2', '²')
         .replace('^3', '³')
         .replace('^n', 'ⁿ')
         .replace('\\mathbb{N}^+', 'ℕ⁺')
         .replace('\\mathbb{N}', 'ℕ')
         .replace('\\mathbb{R}', 'ℝ')
         .replace('\\mathbb{Z}', 'ℤ')
         .replace('\\in', '∈')
         .replace('\\ge', '≥')
         .replace('\\geq', '≥')
         .replace('\\le', '≤')
         .replace('\\leq', '≤')
         .replace('\\neq', '≠')
         .replace('\\Delta', 'Δ')
         .replace('\\cdot', '·')
         .replace('\\times', '×')
         .replace('\\pm', '±')
         .replace('\\sqrt', '√')
         .replace('\\implies', '⟹')
         .replace('\\alpha', 'α')
         .replace('\\beta', 'β')
         .replace('$', '')
    )

def test_sample():
    curriculum_path = os.path.join(os.path.dirname(__file__), '..', 'seed', 'curriculum', 'curriculum_matematyka.json')
    with open(curriculum_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Lesson 2-1
    t2 = next(t for t in data['topics'] if t['id'] == 'dzial-2')
    l1 = t2['lessons'][0]
    pill = l1.get('theory_pill', {})
    we = pill.get('worked_example', {})
    et = pill.get('exam_trap', '')

    print("Title:", l1.get('title'))
    print("WE Problem:", we.get('problem'))
    print("WE Steps count:", len(we.get('steps', [])))
    print("Exam trap:", et)

    # Build step flow for WE
    steps_data = []
    colors = [C_SKY, C_PRIMARY, C_SUCCESS, C_PURPLE]
    for idx, st in enumerate(we.get('steps', [])[:3]):
        steps_data.append({
            'num': str(st.get('num', idx + 1)),
            'title': clean_svg_string(st.get('label', f'Krok {idx+1}')),
            'desc': clean_svg_string(st.get('text', ''))[:80],
            'color': colors[idx % len(colors)]
        })

    diag_we = make_step_flow_diagram(
        title=f"Przykład: {clean_svg_string(l1.get('title'))}",
        badge=clean_svg_string(we.get('problem', ''))[:60],
        caption=we.get('result', ''),
        steps=steps_data,
        metrics=[
            {'label': 'Zadanie', 'value': clean_svg_string(we.get('problem', ''))[:40], 'color': C_SKY},
            {'label': 'Wynik', 'value': clean_svg_string(we.get('result', '')), 'color': C_SUCCESS}
        ]
    )

    print("\nGenerated Step Flow Diagram:")
    print("  Title:", diag_we['title'])
    print("  Polygons:", len(diag_we['polygons']))
    print("  Segments:", len(diag_we['segments']))
    print("  Labels:", len(diag_we['labels']))

    # Build comparison card for Exam Trap
    # Parse exam trap into Error vs Correct
    diag_trap = make_comparison_card_diagram(
        title="Pułapka CKE i jak jej uniknąć",
        badge="UWAGA NA BŁĄD",
        caption=et,
        left_title="✓ POPRAWNY NAWYK",
        left_lines=["Stosuj regułę krok po kroku", "Sprawdzaj znaki i redukcję", "Zgodnie ze standardem CKE"],
        right_title="❌ PUŁAPKA / BŁĄD CKE",
        right_lines=[clean_svg_string(et)[:80]],
        metrics=[
            {'label': 'Ryzyko CKE', 'value': 'Utrata 1-2 punktów', 'color': C_DANGER},
            {'label': 'Rada', 'value': 'Zapisuj każdy krok rozbicia nawiasów', 'color': C_SUCCESS}
        ]
    )

    print("\nGenerated Trap Diagram:")
    print("  Title:", diag_trap['title'])
    print("  Polygons:", len(diag_trap['polygons']))
    print("  Labels:", len(diag_trap['labels']))

if __name__ == '__main__':
    test_sample()
