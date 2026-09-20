import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    curr = json.load(f)

print("Enriching curriculum_matematyka.json with authentic vector diagrams...")

# -------------------------------------------------------------------------------------------------
# 1. DZIAŁ 1: LICZBY RZECZYWISTE - KARTY WZORÓW I ZADANIA
# -------------------------------------------------------------------------------------------------
dzial1 = next((t for t in curr.get('topics', []) if t.get('id') == 'dzial-1'), None)
if dzial1:
    # Lekcja 1.1: Przedziały liczbowe
    l1_1 = next((l for l in dzial1.get('lessons', []) if l.get('id') in ['lesson-1-1', 'dzial-1-lekcja-1']), None)
    if l1_1 and 'theory_pill' in l1_1:
        formulas = l1_1['theory_pill'].get('core_formulas', [])
        for f_item in formulas:
            title = f_item.get('title', '').lower()
            latex = f_item.get('latex', '').lower()
            if 'domknięt' in title or '\\le' in latex or '\\langle' in latex:
                f_item['numberLine'] = {
                    "min": -2, "max": 6,
                    "ticks": [1, 4],
                    "intervals": [{"from": 1, "to": 4, "fromIncluded": True, "toIncluded": True}]
                }
            elif 'otwart' in title or '<' in latex or '(' in latex:
                f_item['numberLine'] = {
                    "min": -2, "max": 6,
                    "ticks": [1, 4],
                    "intervals": [{"from": 1, "to": 4, "fromIncluded": False, "toIncluded": False}]
                }
            elif 'nieskończon' in title or 'promień' in title or '\\infty' in latex:
                f_item['numberLine'] = {
                    "min": -2, "max": 6,
                    "ticks": [2],
                    "intervals": [{"from": 2, "to": None, "fromIncluded": True}]
                }
        print("  [OK] Dział 1 Lekcja 1.1: Wzbogacono karty wzorów o osie liczbowe.")

# -------------------------------------------------------------------------------------------------
# 2. DZIAŁ 8: TRYGONOMETRIA - WZORY I ZADANIA
# -------------------------------------------------------------------------------------------------
dzial8 = next((t for t in curr.get('topics', []) if t.get('id') == 'dzial-8'), None)
if dzial8:
    # Trójkąt prostokątny do definicji funkcji trygonometrycznych
    trig_triangle_diagram = {
        "type": "GEOMETRY_2D",
        "title": "Trójkąt prostokątny o bokach $a, b, c$ i kącie ostrym $\\alpha$",
        "width": 380,
        "height": 220,
        "polygons": [
            {"points": [[60, 180], [320, 180], [60, 50]], "fill": "rgba(255, 184, 0, 0.08)", "stroke": "#FFB800", "strokeWidth": 2}
        ],
        "arcs": [
            {"cx": 60, "cy": 180, "r": 16, "startAngleDeg": 270, "endAngleDeg": 360, "color": "#FFB800", "showRightAngleDot": True},
            {"cx": 320, "cy": 180, "r": 36, "startAngleDeg": 205, "endAngleDeg": 270, "color": "#10B981", "label": "α"}
        ],
        "points": [
            {"x": 60, "y": 180, "label": "C (90°)", "labelPosition": "bottom-left", "dot": "filled"},
            {"x": 320, "y": 180, "label": "A", "labelPosition": "bottom-right", "dot": "filled"},
            {"x": 60, "y": 50, "label": "B", "labelPosition": "top-left", "dot": "filled"}
        ],
        "labels": [
            {"x": 35, "y": 115, "text": "a", "color": "#FFB800", "fontSize": 14},
            {"x": 190, "y": 202, "text": "b", "color": "#FFB800", "fontSize": 14},
            {"x": 200, "y": 100, "text": "c", "color": "#10B981", "fontSize": 14}
        ]
    }
    
    # Lekcja 8.1: Definicje w trójkącie prostokątnym
    l8_1 = next((l for l in dzial8.get('lessons', []) if l.get('id') in ['lesson-8-1', 'dzial-8-lekcja-1']), None)
    if l8_1 and 'theory_pill' in l8_1:
        for f_item in l8_1['theory_pill'].get('core_formulas', []):
            if 'definicje' in f_item.get('title', '').lower() or 'funkcj' in f_item.get('title', '').lower():
                f_item['diagram'] = trig_triangle_diagram
        print("  [OK] Dział 8 Lekcja 8.1: Dodano diagram trójkąta prostokątnego do wzorów.")

    # Wzbogacenie zadań w dziale 8
    for lesson in dzial8.get('lessons', []):
        for task in lesson.get('tasks', []):
            q = (task.get('question') or '').lower()
            if ('trójkącie prostokątnym' in q or 'przyprostokątne' in q or 'przeciwprostokątna' in q) and not task.get('diagram'):
                task['diagram'] = trig_triangle_diagram

# -------------------------------------------------------------------------------------------------
# 3. DZIAŁ 9: PLANIMETRIA - WZORY I ZADANIA
# -------------------------------------------------------------------------------------------------
dzial9 = next((t for t in curr.get('topics', []) if t.get('id') == 'dzial-9'), None)
if dzial9:
    # Twierdzenie Pitagorasa
    pitagoras_diagram = {
        "type": "GEOMETRY_2D",
        "title": "Twierdzenie Pitagorasa: $a^2 + b^2 = c^2$",
        "width": 380,
        "height": 220,
        "polygons": [
            {"points": [[60, 180], [320, 180], [60, 50]], "fill": "rgba(56, 189, 248, 0.08)", "stroke": "#38BDF8", "strokeWidth": 2}
        ],
        "arcs": [
            {"cx": 60, "cy": 180, "r": 16, "startAngleDeg": 270, "endAngleDeg": 360, "color": "#38BDF8", "showRightAngleDot": True}
        ],
        "labels": [
            {"x": 35, "y": 115, "text": "a", "color": "#38BDF8", "fontSize": 14},
            {"x": 190, "y": 202, "text": "b", "color": "#38BDF8", "fontSize": 14},
            {"x": 200, "y": 100, "text": "c", "color": "#FFB800", "fontSize": 14}
        ]
    }

    # Kąty w okręgu
    circle_angles_diagram = {
        "type": "GEOMETRY_2D",
        "title": "Kąt środkowy ($2\\alpha$) i kąt wpisany ($\\alpha$) oparte na tym samym łuku $AB$",
        "width": 420,
        "height": 250,
        "circles": [
            {"cx": 210, "cy": 125, "r": 90, "stroke": "#38BDF8", "strokeWidth": 2, "fill": "rgba(56, 189, 248, 0.04)"}
        ],
        "segments": [
            {"from": [210, 125], "to": [135, 175], "color": "#10B981", "strokeWidth": 1.75},
            {"from": [210, 125], "to": [285, 175], "color": "#10B981", "strokeWidth": 1.75},
            {"from": [135, 175], "to": [200, 38], "color": "#FFB800", "strokeWidth": 1.75},
            {"from": [285, 175], "to": [200, 38], "color": "#FFB800", "strokeWidth": 1.75}
        ],
        "arcs": [
            {"cx": 210, "cy": 125, "r": 25, "startAngleDeg": 125, "endAngleDeg": 235, "color": "#10B981", "label": "2α"},
            {"cx": 200, "cy": 38, "r": 24, "startAngleDeg": 125, "endAngleDeg": 185, "color": "#FFB800", "label": "α"}
        ],
        "points": [
            {"x": 135, "y": 175, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
            {"x": 285, "y": 175, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
            {"x": 200, "y": 38, "label": "C", "labelPosition": "top", "dot": "filled"},
            {"x": 210, "y": 125, "label": "S", "labelPosition": "bottom", "dot": "filled", "color": "#10B981"}
        ]
    }

    # Trapez
    trapezoid_diagram = {
        "type": "GEOMETRY_2D",
        "title": "Pole trapezu: $P = \\frac{a+b}{2} \\cdot h$",
        "width": 420,
        "height": 230,
        "polygons": [
            {"points": [[50, 180], [370, 180], [270, 60], [120, 60]], "fill": "rgba(255, 184, 0, 0.08)", "stroke": "#FFB800", "strokeWidth": 2}
        ],
        "segments": [
            {"from": [120, 60], "to": [120, 180], "color": "#38BDF8", "strokeWidth": 1.5, "dashed": True, "label": "h"}
        ],
        "points": [
            {"x": 50, "y": 180, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
            {"x": 370, "y": 180, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
            {"x": 270, "y": 60, "label": "C", "labelPosition": "top-right", "dot": "filled"},
            {"x": 120, "y": 60, "label": "D", "labelPosition": "top-left", "dot": "filled"}
        ],
        "labels": [
            {"x": 210, "y": 202, "text": "a (podstawa)", "color": "#FFB800", "fontSize": 12},
            {"x": 195, "y": 46, "text": "b (podstawa)", "color": "#FFB800", "fontSize": 12}
        ]
    }

    # Lekcja 9.1: Pitagoras
    l9_1 = next((l for l in dzial9.get('lessons', []) if l.get('id') in ['lesson-9-1', 'dzial-9-lekcja-1']), None)
    if l9_1 and 'theory_pill' in l9_1:
        for f_item in l9_1['theory_pill'].get('core_formulas', []):
            if 'pitagoras' in f_item.get('title', '').lower():
                f_item['diagram'] = pitagoras_diagram
        print("  [OK] Dział 9 Lekcja 9.1: Dodano diagram Pitagorasa do wzorów.")

    # Lekcja 9.5 lub powiązana: Kąty w okręgu
    for l in dzial9.get('lessons', []):
        t_pill = l.get('theory_pill', {})
        for f_item in t_pill.get('core_formulas', []):
            if 'okręg' in f_item.get('title', '').lower() and 'kąt' in f_item.get('title', '').lower():
                f_item['diagram'] = circle_angles_diagram
            elif 'trapez' in f_item.get('title', '').lower():
                f_item['diagram'] = trapezoid_diagram

    # Wzbogacenie zadań w dziale 9
    for lesson in dzial9.get('lessons', []):
        for task in lesson.get('tasks', []):
            q = (task.get('question') or '').lower()
            if ('kąt wpisany' in q or 'kąt środkowy' in q or 'łuku' in q) and not task.get('diagram'):
                task['diagram'] = circle_angles_diagram
            elif ('trapez' in q) and not task.get('diagram'):
                task['diagram'] = trapezoid_diagram
            elif ('prostokątny' in q and 'przeciwprostokątna' in q) and not task.get('diagram'):
                task['diagram'] = pitagoras_diagram

# -------------------------------------------------------------------------------------------------
# 4. DZIAŁ 11: STEREOMETRIA - WZORY I ZADANIA
# -------------------------------------------------------------------------------------------------
dzial11 = next((t for t in curr.get('topics', []) if t.get('id') == 'dzial-11'), None)
if dzial11:
    prism_diagram = {
        "type": "STEREOMETRY_3D",
        "title": "Graniastosłup prawidłowy czworokątny: $V = a^2 \\cdot H$",
        "width": 380,
        "height": 250,
        "polygons": [
            {"points": [[140, 50], [240, 50], [280, 80], [180, 80]], "stroke": "#38BDF8", "strokeWidth": 2, "fill": "rgba(56, 189, 248, 0.1)"}
        ],
        "segments": [
            {"from": [140, 50], "to": [140, 170], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
            {"from": [240, 50], "to": [240, 170], "color": "#38BDF8", "strokeWidth": 2},
            {"from": [280, 80], "to": [280, 200], "color": "#38BDF8", "strokeWidth": 2},
            {"from": [180, 80], "to": [180, 200], "color": "#38BDF8", "strokeWidth": 2},
            {"from": [180, 200], "to": [280, 200], "color": "#38BDF8", "strokeWidth": 2},
            {"from": [280, 200], "to": [240, 170], "color": "#38BDF8", "strokeWidth": 2},
            {"from": [240, 170], "to": [140, 170], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
            {"from": [140, 170], "to": [180, 200], "color": "#64748B", "strokeWidth": 1.25, "dashed": True}
        ],
        "labels": [
            {"x": 230, "y": 218, "text": "a", "color": "#FFB800", "fontSize": 13},
            {"x": 295, "y": 140, "text": "H", "color": "#38BDF8", "fontSize": 13}
        ]
    }

    pyramid_diagram = {
        "type": "STEREOMETRY_3D",
        "title": "Ostrosłup prawidłowy czworokątny: $V = \\frac{1}{3} a^2 \\cdot H$",
        "width": 380,
        "height": 250,
        "segments": [
            {"from": [100, 190], "to": [230, 210], "color": "#38BDF8", "strokeWidth": 1.75},
            {"from": [230, 210], "to": [310, 160], "color": "#38BDF8", "strokeWidth": 1.75},
            {"from": [310, 160], "to": [180, 140], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
            {"from": [180, 140], "to": [100, 190], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
            {"from": [100, 190], "to": [205, 45], "color": "#38BDF8", "strokeWidth": 1.75},
            {"from": [230, 210], "to": [205, 45], "color": "#38BDF8", "strokeWidth": 1.75},
            {"from": [310, 160], "to": [205, 45], "color": "#38BDF8", "strokeWidth": 1.75},
            {"from": [180, 140], "to": [205, 45], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
            # Wysokość H
            {"from": [205, 45], "to": [205, 175], "color": "#10B981", "strokeWidth": 1.5, "dashed": True, "label": "H"}
        ],
        "labels": [
            {"x": 165, "y": 215, "text": "a", "color": "#FFB800", "fontSize": 13}
        ]
    }

    # Lekcje stereometrii
    for l in dzial11.get('lessons', []):
        t_pill = l.get('theory_pill', {})
        for f_item in t_pill.get('core_formulas', []):
            tit = f_item.get('title', '').lower()
            if 'graniastosłup' in tit:
                f_item['diagram'] = prism_diagram
            elif 'ostrosłup' in tit:
                f_item['diagram'] = pyramid_diagram

    for lesson in dzial11.get('lessons', []):
        for task in lesson.get('tasks', []):
            q = (task.get('question') or '').lower()
            if 'graniastosłup' in q and not task.get('diagram'):
                task['diagram'] = prism_diagram
            elif 'ostrosłup' in q and not task.get('diagram'):
                task['diagram'] = pyramid_diagram

# Zapisanie zaktualizowanego curriculum_matematyka.json
with open('seed/curriculum/curriculum_matematyka.json', 'w', encoding='utf-8') as f:
    json.dump(curr, f, indent=2, ensure_ascii=False)

print("[SUCCESS] Zaktualizowano curriculum_matematyka.json o diagramy wzorów i zadań!")
