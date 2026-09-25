# -*- coding: utf-8 -*-
"""
Generator rozszerzonej bazy wzorów CKE (src/data/ckeFormulasData.ts)
Wzbogaca wszystkie wzory o diagramy wektorowe SVG zgodne z Nocturne Luminary:
- zachowuje 100% kompatybilności z istniejącymi testami CkeFormulaSheetPages.test.ts (wszystkie 21 ID, strony cke_page i numery stron)
- dodaje nowe, ultra-czytelne diagramy dla logarytmów, wartości bezwzględnej, ciągów, trygonometrii, Talesa, kątów w okręgu, stereometrii 2.5D, stochastyki i statystyki
- bez symboli logiki formalnej (\iff), czysty KaTeX, zero emoji, ochronne pastylki tła pod etykietami
"""

import json
import re

OUTPUT_FILE = 'src/data/ckeFormulasData.ts'

# Definicje diagramów
DIAGRAM_SKROCONE = {
    'type': 'GEOMETRY_2D',
    'title': 'Geometryczny dowód kwadratu sumy: (a + b)² = a² + 2ab + b²',
    'formulaBadge': '$(a + b)^2 = a^2 + 2ab + b^2$',
    'width': 460,
    'height': 225,
    'polygons': [
        {
            'points': '130,25 240,25 240,135 130,135',
            'fill': 'rgba(255, 184, 0, 0.16)',
            'stroke': '#FFB800',
            'strokeWidth': 2
        },
        {
            'points': '240,25 295,25 295,135 240,135',
            'fill': 'rgba(56, 189, 248, 0.14)',
            'stroke': '#38BDF8',
            'strokeWidth': 1.5
        },
        {
            'points': '130,135 240,135 240,190 130,190',
            'fill': 'rgba(56, 189, 248, 0.14)',
            'stroke': '#38BDF8',
            'strokeWidth': 1.5
        },
        {
            'points': '240,135 295,135 295,190 240,190',
            'fill': 'rgba(16, 185, 129, 0.18)',
            'stroke': '#10B981',
            'strokeWidth': 2
        }
    ],
    'labels': [
        {'x': 185, 'y': 80, 'text': 'a²', 'color': '#FFDCA1', 'fontSize': 18, 'fontWeight': '700'},
        {'x': 267, 'y': 80, 'text': 'ab', 'color': '#38BDF8', 'fontSize': 15, 'fontWeight': '700'},
        {'x': 185, 'y': 162, 'text': 'ab', 'color': '#38BDF8', 'fontSize': 15, 'fontWeight': '700'},
        {'x': 267, 'y': 162, 'text': 'b²', 'color': '#10B981', 'fontSize': 16, 'fontWeight': '700'},
        {'x': 185, 'y': 14, 'text': 'a', 'color': '#FFDCA1', 'fontSize': 13, 'fontWeight': '600'},
        {'x': 267, 'y': 14, 'text': 'b', 'color': '#38BDF8', 'fontSize': 13, 'fontWeight': '600'},
        {'x': 112, 'y': 80, 'text': 'a', 'color': '#FFDCA1', 'fontSize': 13, 'fontWeight': '600'},
        {'x': 112, 'y': 162, 'text': 'b', 'color': '#38BDF8', 'fontSize': 13, 'fontWeight': '600'},
        {'x': 212, 'y': 212, 'text': 'Pole całkowite = a² + 2ab + b²', 'color': '#FFDCA1', 'fontSize': 13, 'fontWeight': '700', 'badge': True}
    ],
    'caption': 'Pole kwadratu o boku (a + b) składa się z 4 części: a², dwóch prostokątów ab i b². Zauważ: wyraz 2ab bierze się z dwóch jednakowych prostokątów ab!'
}

DIAGRAM_LOG = {
    'type': 'INFOGRAPHIC',
    'title': 'Pętla Logarytmiczna: Z polskiego na nasze',
    'formulaBadge': '$\\log_a(b) = c \\longrightarrow a^c = b$',
    'width': 480,
    'height': 210,
    'polygons': [
        {
            'points': '30,35 240,35 240,175 30,175',
            'fill': 'rgba(14, 21, 34, 0.7)',
            'stroke': '#334155',
            'strokeWidth': 1.5
        },
        {
            'points': '260,35 450,35 450,175 260,175',
            'fill': 'rgba(14, 21, 34, 0.7)',
            'stroke': '#334155',
            'strokeWidth': 1.5
        }
    ],
    'segments': [
        {'from': [100, 130], 'to': [160, 65], 'color': '#FFB800', 'strokeWidth': 2, 'dashed': True},
        {'from': [160, 65], 'to': [210, 105], 'color': '#38BDF8', 'strokeWidth': 2, 'dashed': True}
    ],
    'labels': [
        {'x': 135, 'y': 55, 'text': 'Pętla wykładnicza', 'color': '#FFDCA1', 'fontSize': 13, 'fontWeight': '700'},
        {'x': 70, 'y': 105, 'text': 'log', 'color': '#94A3B8', 'fontSize': 20, 'fontWeight': '700'},
        {'x': 98, 'y': 128, 'text': 'a', 'color': '#FFB800', 'fontSize': 18, 'fontWeight': '800'},
        {'x': 135, 'y': 105, 'text': '( b )', 'color': '#10B981', 'fontSize': 20, 'fontWeight': '800'},
        {'x': 180, 'y': 105, 'text': '=', 'color': '#94A3B8', 'fontSize': 20},
        {'x': 210, 'y': 105, 'text': 'c', 'color': '#38BDF8', 'fontSize': 20, 'fontWeight': '800'},
        {'x': 135, 'y': 158, 'text': 'a podniesione do potęgi c daje b', 'color': '#FFDCA1', 'fontSize': 11, 'badge': True},
        {'x': 355, 'y': 55, 'text': 'Przykłady z arkuszy CKE', 'color': '#38BDF8', 'fontSize': 13, 'fontWeight': '700'},
        {'x': 355, 'y': 95, 'text': 'log₂ 8 = 3, bo 2³ = 8', 'color': '#F8FAFC', 'fontSize': 14, 'fontWeight': '700', 'badge': True},
        {'x': 355, 'y': 130, 'text': 'log₃ 81 = 4, bo 3⁴ = 81', 'color': '#FFDCA1', 'fontSize': 12, 'fontWeight': '600'},
        {'x': 355, 'y': 158, 'text': 'log₅ √5 = 0,5, bo 5⁰·⁵ = √5', 'color': '#10B981', 'fontSize': 12, 'fontWeight': '600'}
    ],
    'caption': 'Logarytm to pytanie o wykładnik potęgi: „Do jakiej potęgi podnieść podstawę a, aby otrzymać b?”. Podstawa a podniesiona do wyniku c ZAWSZE daje liczbę logarytmowaną b.'
}

DIAGRAM_CIAG_ARYTM = {
    'type': 'INFOGRAPHIC',
    'title': 'Ciąg arytmetyczny: Stały krok r i własność sąsiadów',
    'formulaBadge': '$a_n = a_1 + (n - 1)r, \\quad a_n = \\frac{a_{n-1} + a_{n+1}}{2}$',
    'width': 480,
    'height': 220,
    'segments': [
        {'from': [40, 180], 'to': [440, 180], 'color': '#475569', 'strokeWidth': 1.5},
        {'from': [80, 150], 'to': [400, 30], 'color': '#38BDF8', 'strokeWidth': 2, 'dashed': True},
        {'from': [80, 150], 'to': [80, 180], 'color': '#334155', 'dashed': True, 'strokeWidth': 1},
        {'from': [160, 120], 'to': [160, 180], 'color': '#334155', 'dashed': True, 'strokeWidth': 1},
        {'from': [240, 90], 'to': [240, 180], 'color': '#334155', 'dashed': True, 'strokeWidth': 1},
        {'from': [320, 60], 'to': [320, 180], 'color': '#334155', 'dashed': True, 'strokeWidth': 1},
        {'from': [400, 30], 'to': [400, 180], 'color': '#334155', 'dashed': True, 'strokeWidth': 1}
    ],
    'points': [
        {'x': 80, 'y': 150, 'label': 'a₁', 'color': '#FFB800', 'dot': 'filled', 'attach': 'w'},
        {'x': 160, 'y': 120, 'label': 'a₂', 'color': '#FFB800', 'dot': 'filled', 'attach': 'w'},
        {'x': 240, 'y': 90, 'label': 'a₃', 'color': '#10B981', 'dot': 'filled', 'attach': 'nw'},
        {'x': 320, 'y': 60, 'label': 'a₄', 'color': '#FFB800', 'dot': 'filled', 'attach': 'w'},
        {'x': 400, 'y': 30, 'label': 'a₅', 'color': '#FFB800', 'dot': 'filled', 'attach': 'ne'}
    ],
    'labels': [
        {'x': 120, 'y': 130, 'text': '+r', 'color': '#FFDCA1', 'fontSize': 13, 'fontWeight': '700'},
        {'x': 200, 'y': 100, 'text': '+r', 'color': '#FFDCA1', 'fontSize': 13, 'fontWeight': '700'},
        {'x': 280, 'y': 70, 'text': '+r', 'color': '#FFDCA1', 'fontSize': 13, 'fontWeight': '700'},
        {'x': 360, 'y': 40, 'text': '+r', 'color': '#FFDCA1', 'fontSize': 13, 'fontWeight': '700'},
        {'x': 80, 'y': 195, 'text': 'n=1', 'color': '#94A3B8', 'fontSize': 11},
        {'x': 160, 'y': 195, 'text': 'n=2', 'color': '#94A3B8', 'fontSize': 11},
        {'x': 240, 'y': 195, 'text': 'n=3', 'color': '#10B981', 'fontSize': 11, 'fontWeight': '700'},
        {'x': 320, 'y': 195, 'text': 'n=4', 'color': '#94A3B8', 'fontSize': 11},
        {'x': 400, 'y': 195, 'text': 'n=5', 'color': '#94A3B8', 'fontSize': 11},
        {'x': 240, 'y': 20, 'text': 'Środek symetrii: a₃ = (a₂ + a₄) / 2', 'color': '#10B981', 'fontSize': 12, 'fontWeight': '700', 'badge': True}
    ],
    'caption': 'Ciąg arytmetyczny to dyskretna funkcja liniowa o stałym skoku r. Każdy wyraz (od drugiego) jest średnią arytmetyczną swoich sąsiadów: aₙ = (aₙ₋₁ + aₙ₊₁)/2.'
}

DIAGRAM_CIAG_GEOM = {
    'type': 'INFOGRAPHIC',
    'title': 'Ciąg geometryczny: Iloraz q i zależność kwadratowa',
    'formulaBadge': '$a_n = a_1 \\cdot q^{n - 1}, \\quad a_n^2 = a_{n-1} \\cdot a_{n+1}$',
    'width': 480,
    'height': 220,
    'segments': [
        {'from': [40, 180], 'to': [440, 180], 'color': '#475569', 'strokeWidth': 1.5},
        {'from': [80, 160], 'to': [80, 180], 'color': '#334155', 'dashed': True, 'strokeWidth': 1},
        {'from': [160, 140], 'to': [160, 180], 'color': '#334155', 'dashed': True, 'strokeWidth': 1},
        {'from': [240, 100], 'to': [240, 180], 'color': '#334155', 'dashed': True, 'strokeWidth': 1},
        {'from': [320, 45], 'to': [320, 180], 'color': '#334155', 'dashed': True, 'strokeWidth': 1}
    ],
    'curves': [
        {
            'path': 'M 80 160 Q 200 135 320 45',
            'color': '#F43F5E',
            'strokeWidth': 2,
            'dashed': True
        }
    ],
    'points': [
        {'x': 80, 'y': 160, 'label': 'a₁ = 2', 'color': '#FFB800', 'dot': 'filled', 'attach': 'w'},
        {'x': 160, 'y': 140, 'label': 'a₂ = 6', 'color': '#FFB800', 'dot': 'filled', 'attach': 'w'},
        {'x': 240, 'y': 100, 'label': 'a₃ = 18', 'color': '#10B981', 'dot': 'filled', 'attach': 'nw'},
        {'x': 320, 'y': 45, 'label': 'a₄ = 54', 'color': '#38BDF8', 'dot': 'filled', 'attach': 'w'}
    ],
    'labels': [
        {'x': 120, 'y': 145, 'text': '· q', 'color': '#FFDCA1', 'fontSize': 12, 'fontWeight': '700'},
        {'x': 200, 'y': 115, 'text': '· q', 'color': '#FFDCA1', 'fontSize': 12, 'fontWeight': '700'},
        {'x': 280, 'y': 65, 'text': '· q', 'color': '#FFDCA1', 'fontSize': 12, 'fontWeight': '700'},
        {'x': 80, 'y': 195, 'text': 'n=1', 'color': '#94A3B8', 'fontSize': 11},
        {'x': 160, 'y': 195, 'text': 'n=2', 'color': '#94A3B8', 'fontSize': 11},
        {'x': 240, 'y': 195, 'text': 'n=3', 'color': '#10B981', 'fontSize': 11, 'fontWeight': '700'},
        {'x': 320, 'y': 195, 'text': 'n=4', 'color': '#94A3B8', 'fontSize': 11},
        {'x': 240, 'y': 20, 'text': 'Własność: a₃² = a₂ · a₄  (18² = 6 · 54 = 324)', 'color': '#FFDCA1', 'fontSize': 12, 'fontWeight': '700', 'badge': True}
    ],
    'caption': 'Ciąg geometryczny rośnie lub maleje wykładniczo przez stałe mnożenie przez iloraz q. Każdy wyraz podniesiony do kwadratu jest iloczynem sąsiadów: aₙ² = aₙ₋₁ · aₙ₊₁. Pamiętaj: wykładnik to (n - 1)!'
}

DIAGRAM_TRYGO_REDUKCYJNE = {
    'type': 'TRIGONOMETRY',
    'title': 'Wzory redukcyjne dla kątów rozwartych (II ćwiartka)',
    'formulaBadge': '$\\sin(180^\\circ - \\alpha) = \\sin\\alpha, \\quad \\cos(180^\\circ - \\alpha) = -\\cos\\alpha$',
    'width': 480,
    'height': 230,
    'circles': [
        {
            'cx': 240,
            'cy': 120,
            'r': 80,
            'stroke': '#475569',
            'strokeWidth': 1.5,
            'fill': 'rgba(56, 189, 248, 0.05)'
        }
    ],
    'segments': [
        {'from': [80, 120], 'to': [400, 120], 'color': '#475569', 'strokeWidth': 1.5},
        {'from': [240, 20], 'to': [240, 210], 'color': '#475569', 'strokeWidth': 1.5},
        {'from': [240, 120], 'to': [309, 80], 'color': '#FFB800', 'strokeWidth': 2.5},
        {'from': [240, 120], 'to': [171, 80], 'color': '#38BDF8', 'strokeWidth': 2.5},
        {'from': [171, 80], 'to': [309, 80], 'color': '#10B981', 'strokeWidth': 2, 'dashed': True},
        {'from': [309, 80], 'to': [309, 120], 'color': '#FFB800', 'dashed': True, 'strokeWidth': 1.5},
        {'from': [171, 80], 'to': [171, 120], 'color': '#F43F5E', 'dashed': True, 'strokeWidth': 1.5}
    ],
    'arcs': [
        {'cx': 240, 'cy': 120, 'r': 35, 'startAngleDeg': 0, 'endAngleDeg': 30, 'color': '#FFB800', 'label': 'α'},
        {'cx': 240, 'cy': 120, 'r': 48, 'startAngleDeg': 0, 'endAngleDeg': 150, 'color': '#38BDF8', 'label': '180° - α'}
    ],
    'points': [
        {'x': 309, 'y': 80, 'label': 'P₁(cos α, sin α)', 'color': '#FFB800', 'dot': 'filled', 'attach': 'ne'},
        {'x': 171, 'y': 80, 'label': 'P₂(-cos α, sin α)', 'color': '#38BDF8', 'dot': 'filled', 'attach': 'nw'},
        {'x': 240, 'y': 80, 'label': 'y = sin α > 0', 'color': '#10B981', 'dot': 'hollow', 'attach': 'n'},
        {'x': 309, 'y': 120, 'label': '+cos α', 'color': '#FFB800', 'dot': 'hollow', 'attach': 's'},
        {'x': 171, 'y': 120, 'label': '-cos α', 'color': '#F43F5E', 'dot': 'hollow', 'attach': 's'}
    ],
    'labels': [
        {'x': 240, 'y': 20, 'text': 'W II ćwiartce: sin(180° - α) = sin α  |  cos(180° - α) = -cos α', 'color': '#FFDCA1', 'fontSize': 12, 'fontWeight': '700', 'badge': True}
    ],
    'caption': 'W II ćwiartce współrzędna y punktu na okręgu jednostkowym jest dodatnia i równa sin α. Współrzędna x jest ujemna i równa -cos α. Dlatego sinus kąta rozwartego jest dodatni, a cosinus ujemny!'
}

DIAGRAM_TRYGO_POLA = {
    'type': 'TRIGONOMETRY',
    'title': 'Pole trójkąta z sinusem kąta zawartego między bokami',
    'formulaBadge': '$P = \\frac{1}{2} \\cdot a \\cdot b \\cdot \\sin\\gamma$',
    'width': 460,
    'height': 210,
    'segments': [
        {'from': [60, 160], 'to': [360, 160], 'color': '#38BDF8', 'strokeWidth': 3, 'label': 'b'},
        {'from': [60, 160], 'to': [200, 50], 'color': '#FFB800', 'strokeWidth': 3, 'label': 'a'},
        {'from': [200, 50], 'to': [360, 160], 'color': '#475569', 'strokeWidth': 1.5, 'label': 'c'},
        {'from': [200, 50], 'to': [200, 160], 'color': '#F43F5E', 'dashed': True, 'strokeWidth': 2, 'label': 'h = a · sin γ'}
    ],
    'arcs': [
        {'cx': 60, 'cy': 160, 'r': 40, 'startAngleDeg': 38, 'endAngleDeg': 90, 'color': '#10B981', 'label': 'γ'}
    ],
    'points': [
        {'x': 60, 'y': 160, 'label': 'C (kąt γ)', 'color': '#10B981', 'dot': 'filled', 'attach': 'sw'},
        {'x': 200, 'y': 50, 'label': 'B', 'color': '#FFB800', 'dot': 'filled', 'attach': 'n'},
        {'x': 360, 'y': 160, 'label': 'A', 'color': '#38BDF8', 'dot': 'filled', 'attach': 'se'},
        {'x': 200, 'y': 160, 'label': 'D', 'color': '#F43F5E', 'dot': 'hollow', 'attach': 's'}
    ],
    'labels': [
        {'x': 260, 'y': 25, 'text': 'Wysokość: h = a · sin γ  ⟹  P = 0,5 · b · (a · sin γ)', 'color': '#FFDCA1', 'fontSize': 12, 'fontWeight': '700', 'badge': True},
        {'x': 210, 'y': 195, 'text': 'Kąt γ MUSI leżeć bezpośrednio między bokami a i b!', 'color': '#F43F5E', 'fontSize': 11, 'fontWeight': '700'}
    ],
    'caption': 'Wysokość trójkąta to h = a · sin γ. Podstawiając do klasycznego wzoru P = (b · h)/2 otrzymujemy P = 0,5 · a · b · sin γ. Używaj tego wzoru ZAWSZE, gdy znasz dwa boki i kąt między nimi.'
}

DIAGRAM_TALES = {
    'type': 'GEOMETRY_2D',
    'title': 'Twierdzenie Talesa i proporcja pól figur podobnych (k²)',
    'formulaBadge': '$\\frac{|AD|}{|AB|} = \\frac{|DE|}{|BC|} = k, \\quad \\frac{P_{ABC}}{P_{ADE}} = k^2$',
    'width': 480,
    'height': 220,
    'segments': [
        {'from': [40, 180], 'to': [220, 180], 'color': '#38BDF8', 'strokeWidth': 2.5},
        {'from': [40, 180], 'to': [200, 40], 'color': '#FFB800', 'strokeWidth': 2.5},
        {'from': [120, 110], 'to': [130, 180], 'color': '#10B981', 'strokeWidth': 2, 'label': 'DE'},
        {'from': [200, 40], 'to': [220, 180], 'color': '#F43F5E', 'strokeWidth': 2.5, 'label': 'BC (DE || BC)'}
    ],
    'polygons': [
        {
            'points': '270,120 320,120 320,170 270,170',
            'fill': 'rgba(16, 185, 129, 0.2)',
            'stroke': '#10B981',
            'strokeWidth': 2
        },
        {
            'points': '340,70 440,70 440,170 340,170',
            'fill': 'rgba(255, 184, 0, 0.16)',
            'stroke': '#FFB800',
            'strokeWidth': 2
        }
    ],
    'points': [
        {'x': 40, 'y': 180, 'label': 'A', 'color': '#FFDCA1', 'dot': 'filled', 'attach': 'sw'},
        {'x': 120, 'y': 110, 'label': 'D', 'color': '#FFB800', 'dot': 'filled', 'attach': 'nw'},
        {'x': 200, 'y': 40, 'label': 'B', 'color': '#FFB800', 'dot': 'filled', 'attach': 'ne'},
        {'x': 130, 'y': 180, 'label': 'E', 'color': '#38BDF8', 'dot': 'filled', 'attach': 's'},
        {'x': 220, 'y': 180, 'label': 'C', 'color': '#38BDF8', 'dot': 'filled', 'attach': 'se'}
    ],
    'labels': [
        {'x': 130, 'y': 25, 'text': 'Tales: DE || BC', 'color': '#FFDCA1', 'fontSize': 12, 'fontWeight': '700', 'badge': True},
        {'x': 295, 'y': 145, 'text': 'P₁ = 1', 'color': '#10B981', 'fontSize': 13, 'fontWeight': '700'},
        {'x': 390, 'y': 120, 'text': 'P₂ = 4 = 2²', 'color': '#FFDCA1', 'fontSize': 14, 'fontWeight': '700'},
        {'x': 355, 'y': 195, 'text': 'Skala k = 2  ⟹  Stosunek pól k² = 4', 'color': '#FFB800', 'fontSize': 11, 'fontWeight': '700', 'badge': True}
    ],
    'caption': 'Gdy proste są równoległe (DE || BC), odpowiednie odcinki na ramionach są proporcjonalne. Jeśli skala podobieństwa figur wynosi k, to ich pola rosną aż k²-krotnie (dla k=2 pole rośnie 4-krotnie)!'
}

DIAGRAM_KATY_OKRAG = {
    'type': 'GEOMETRY_2D',
    'title': 'Kąty w okręgu: Środkowy 2α i wpisany α na tym samym łuku',
    'formulaBadge': '$\\beta = 2\\alpha, \\quad \\text{Kąt wpisany oparty na średnicy} = 90^\\circ$',
    'width': 480,
    'height': 225,
    'circles': [
        {
            'cx': 240,
            'cy': 115,
            'r': 85,
            'fill': 'rgba(56, 189, 248, 0.06)',
            'stroke': '#38BDF8',
            'strokeWidth': 2
        }
    ],
    'segments': [
        {'from': [175, 175], 'to': [240, 115], 'color': '#FFB800', 'strokeWidth': 2.5},
        {'from': [305, 175], 'to': [240, 115], 'color': '#FFB800', 'strokeWidth': 2.5},
        {'from': [175, 175], 'to': [210, 32], 'color': '#10B981', 'strokeWidth': 2},
        {'from': [305, 175], 'to': [210, 32], 'color': '#10B981', 'strokeWidth': 2},
        {'from': [155, 115], 'to': [325, 115], 'color': '#475569', 'strokeWidth': 1.5, 'dashed': True}
    ],
    'arcs': [
        {'cx': 240, 'cy': 115, 'r': 28, 'startAngleDeg': 45, 'endAngleDeg': 135, 'color': '#FFB800', 'label': '2α'},
        {'cx': 210, 'cy': 32, 'r': 26, 'startAngleDeg': 60, 'endAngleDeg': 110, 'color': '#10B981', 'label': 'α'}
    ],
    'points': [
        {'x': 240, 'y': 115, 'label': 'O (środek)', 'color': '#FFB800', 'dot': 'filled', 'attach': 'n'},
        {'x': 175, 'y': 175, 'label': 'A', 'color': '#38BDF8', 'dot': 'filled', 'attach': 'sw'},
        {'x': 305, 'y': 175, 'label': 'B', 'color': '#38BDF8', 'dot': 'filled', 'attach': 'se'},
        {'x': 210, 'y': 32, 'label': 'C (wpisany)', 'color': '#10B981', 'dot': 'filled', 'attach': 'nw'}
    ],
    'labels': [
        {'x': 240, 'y': 200, 'text': 'Wspólny łuk AB', 'color': '#38BDF8', 'fontSize': 11, 'fontWeight': '700'},
        {'x': 390, 'y': 80, 'text': 'Kąt środkowy = 2α', 'color': '#FFB800', 'fontSize': 12, 'fontWeight': '700', 'badge': True},
        {'x': 390, 'y': 120, 'text': 'Kąt wpisany = α', 'color': '#10B981', 'fontSize': 12, 'fontWeight': '700', 'badge': True},
        {'x': 390, 'y': 160, 'text': 'Na średnicy = 90°', 'color': '#FFDCA1', 'fontSize': 12, 'fontWeight': '700', 'badge': True}
    ],
    'caption': 'Kąt środkowy oparty na tym samym łuku jest dokładnie dwa razy większy od kąta wpisanego (β = 2α). Kąt wpisany oparty na średnicy okręgu ma zawsze 90°.'
}

DIAGRAM_OSTROSLUP = {
    'type': 'STEREOMETRY_3D',
    'title': 'Ostrosłup prawidłowy 2.5D: Kąt krawędzi (α) vs kąt ściany bocznej (β)',
    'formulaBadge': '$\\operatorname{tg}\\alpha = \\frac{H}{\\frac{1}{2}d}, \\quad \\operatorname{tg}\\beta = \\frac{H}{\\frac{1}{2}a}, \\quad V = \\frac{1}{3}P_p \\cdot H$',
    'width': 480,
    'height': 235,
    'polygons': [
        {
            'points': '80,180 240,210 380,170 240,30',
            'fill': 'rgba(255, 184, 0, 0.05)',
            'stroke': '#FFB800',
            'strokeWidth': 2
        }
    ],
    'segments': [
        {'from': [80, 180], 'to': [240, 210], 'color': '#FFB800', 'strokeWidth': 2},
        {'from': [240, 210], 'to': [380, 170], 'color': '#FFB800', 'strokeWidth': 2},
        {'from': [380, 170], 'to': [220, 140], 'color': '#FFB800', 'strokeWidth': 1.5, 'dashed': True},
        {'from': [80, 180], 'to': [220, 140], 'color': '#FFB800', 'strokeWidth': 1.5, 'dashed': True},
        {'from': [240, 30], 'to': [80, 180], 'color': '#FFB800', 'strokeWidth': 2, 'label': 'b'},
        {'from': [240, 30], 'to': [240, 210], 'color': '#FFB800', 'strokeWidth': 2},
        {'from': [240, 30], 'to': [380, 170], 'color': '#FFB800', 'strokeWidth': 2},
        {'from': [240, 30], 'to': [220, 140], 'color': '#FFB800', 'strokeWidth': 1.5, 'dashed': True},
        {'from': [240, 30], 'to': [230, 175], 'color': '#38BDF8', 'strokeWidth': 2.5, 'label': 'H'},
        {'from': [80, 180], 'to': [380, 170], 'color': '#64748B', 'strokeWidth': 1.2, 'dashed': True},
        {'from': [240, 30], 'to': [310, 190], 'color': '#F43F5E', 'strokeWidth': 2, 'label': 'h_b'},
        {'from': [230, 175], 'to': [310, 190], 'color': '#10B981', 'strokeWidth': 2, 'dashed': True, 'label': 'a/2'}
    ],
    'points': [
        {'x': 240, 'y': 30, 'label': 'S (wierzchołek)', 'color': '#FFB800', 'dot': 'filled', 'attach': 'n'},
        {'x': 230, 'y': 175, 'label': 'O (spodek H)', 'color': '#38BDF8', 'dot': 'filled', 'attach': 'w'},
        {'x': 310, 'y': 190, 'label': 'M (środek boku)', 'color': '#10B981', 'dot': 'filled', 'attach': 'se'},
        {'x': 80, 'y': 180, 'label': 'A', 'color': '#FFDCA1', 'dot': 'filled', 'attach': 'sw'}
    ],
    'labels': [
        {'x': 140, 'y': 165, 'text': 'kąt α (krawędź)', 'color': '#38BDF8', 'fontSize': 11, 'fontWeight': '700', 'badge': True},
        {'x': 285, 'y': 140, 'text': 'kąt β (ściana)', 'color': '#F43F5E', 'fontSize': 11, 'fontWeight': '700', 'badge': True},
        {'x': 370, 'y': 60, 'text': 'H ⊥ podstawa', 'color': '#38BDF8', 'fontSize': 12, 'fontWeight': '700', 'badge': True}
    ],
    'caption': 'Nie myl kątów! Kąt nachylenia krawędzi bocznej (α) leży w trójkącie z połową przekątnej podstawy (d/2). Kąt nachylenia ściany bocznej (β) leży w trójkącie z wysokością ściany bocznej (hb) i połową boku podstawy (a/2).'
}

DIAGRAM_BRYLY_OBROTOWE = {
    'type': 'STEREOMETRY_3D',
    'title': 'Bryły obrotowe: Przekrój osiowy stożka i walca',
    'formulaBadge': '$V_{\\text{stożek}} = \\frac{1}{3}\\pi r^2 H, \\quad r^2 + H^2 = l^2, \\quad V_{\\text{walec}} = \\pi r^2 H$',
    'width': 480,
    'height': 230,
    'polygons': [
        {
            'points': '60,180 180,180 120,50',
            'fill': 'rgba(56, 189, 248, 0.12)',
            'stroke': '#38BDF8',
            'strokeWidth': 2
        },
        {
            'points': '290,50 410,50 410,180 290,180',
            'fill': 'rgba(255, 184, 0, 0.12)',
            'stroke': '#FFB800',
            'strokeWidth': 2
        }
    ],
    'segments': [
        {'from': [120, 50], 'to': [120, 180], 'color': '#F43F5E', 'strokeWidth': 2, 'label': 'H'},
        {'from': [120, 180], 'to': [180, 180], 'color': '#10B981', 'strokeWidth': 2.5, 'label': 'r'},
        {'from': [120, 50], 'to': [180, 180], 'color': '#38BDF8', 'strokeWidth': 2.5, 'label': 'l'},
        {'from': [350, 50], 'to': [350, 180], 'color': '#F43F5E', 'strokeWidth': 1.5, 'dashed': True, 'label': 'H'},
        {'from': [290, 180], 'to': [410, 180], 'color': '#FFB800', 'strokeWidth': 2.5, 'label': '2r'}
    ],
    'points': [
        {'x': 120, 'y': 50, 'label': 'Wierzchołek stożka', 'color': '#38BDF8', 'dot': 'filled', 'attach': 'n'},
        {'x': 120, 'y': 180, 'label': 'O (środek)', 'color': '#10B981', 'dot': 'filled', 'attach': 's'}
    ],
    'labels': [
        {'x': 120, 'y': 25, 'text': 'Stożek: r² + H² = l²', 'color': '#38BDF8', 'fontSize': 12, 'fontWeight': '700', 'badge': True},
        {'x': 350, 'y': 25, 'text': 'Walec: Przekrój 2r · H', 'color': '#FFB800', 'fontSize': 12, 'fontWeight': '700', 'badge': True},
        {'x': 120, 'y': 205, 'text': 'Przekrój: trójkąt 2r × l × l', 'color': '#94A3B8', 'fontSize': 11},
        {'x': 350, 'y': 205, 'text': 'Przekrój: prostokąt 2r × H', 'color': '#94A3B8', 'fontSize': 11}
    ],
    'caption': 'Przekrój osiowy stożka to trójkąt równoramienny o podstawie 2r i ramionach l. Trójkąt prostokątny (r, H, l) daje zależność r² + H² = l² (Pitagoras!). Przekrój osiowy walca to prostokąt o wymiarach 2r na H.'
}

DIAGRAM_KOMBINATORYKA = {
    'type': 'STATISTICS',
    'title': 'Drzewo stochastyczne i siatka przestrzeni zdarzeń (2 kostki: |Ω| = 36)',
    'formulaBadge': '$P(A) = \\frac{|A|}{|\\Omega|}, \\quad P(A \\cap B) = P(A) \\cdot P(B|A)$',
    'width': 480,
    'height': 230,
    'segments': [
        {'from': [40, 110], 'to': [120, 60], 'color': '#38BDF8', 'strokeWidth': 2, 'label': 'p₁'},
        {'from': [40, 110], 'to': [120, 160], 'color': '#FFB800', 'strokeWidth': 2, 'label': 'p₂'},
        {'from': [120, 60], 'to': [200, 35], 'color': '#10B981', 'strokeWidth': 2, 'label': 'p₁₁'},
        {'from': [120, 60], 'to': [200, 85], 'color': '#64748B', 'strokeWidth': 1.5},
        {'from': [120, 160], 'to': [200, 135], 'color': '#64748B', 'strokeWidth': 1.5},
        {'from': [120, 160], 'to': [200, 185], 'color': '#10B981', 'strokeWidth': 2, 'label': 'p₂₂'},
        {'from': [280, 45], 'to': [440, 45], 'color': '#475569', 'strokeWidth': 1.5},
        {'from': [280, 185], 'to': [440, 185], 'color': '#475569', 'strokeWidth': 1.5},
        {'from': [280, 45], 'to': [280, 185], 'color': '#475569', 'strokeWidth': 1.5},
        {'from': [440, 45], 'to': [440, 185], 'color': '#475569', 'strokeWidth': 1.5}
    ],
    'points': [
        {'x': 40, 'y': 110, 'label': 'Start', 'color': '#FFDCA1', 'dot': 'filled', 'attach': 'w'},
        {'x': 120, 'y': 60, 'label': 'Etap 1', 'color': '#38BDF8', 'dot': 'filled', 'attach': 'nw'},
        {'x': 120, 'y': 160, 'label': 'Etap 1', 'color': '#FFB800', 'dot': 'filled', 'attach': 'sw'},
        {'x': 200, 'y': 35, 'label': 'Sukces: p₁ · p₁₁', 'color': '#10B981', 'dot': 'filled', 'attach': 'ne'}
    ],
    'labels': [
        {'x': 110, 'y': 20, 'text': 'Drzewo: Mnożenie wzdłuż gałęzi', 'color': '#38BDF8', 'fontSize': 11, 'fontWeight': '700', 'badge': True},
        {'x': 360, 'y': 20, 'text': '2 kostki: |Ω| = 6 · 6 = 36', 'color': '#FFDCA1', 'fontSize': 11, 'fontWeight': '700', 'badge': True},
        {'x': 360, 'y': 80, 'text': 'Tabela 6 × 6 wyników', 'color': '#94A3B8', 'fontSize': 13, 'fontWeight': '600'},
        {'x': 360, 'y': 115, 'text': 'Suma = 7: 6 par sprzyjających', 'color': '#10B981', 'fontSize': 12, 'fontWeight': '700', 'badge': True},
        {'x': 360, 'y': 150, 'text': 'P(suma=7) = 6/36 = 1/6', 'color': '#FFB800', 'fontSize': 13, 'fontWeight': '800'},
        {'x': 240, 'y': 215, 'text': 'Wzdłuż gałęzi MNOŻYSZ, różne gałęzie DODAJESZ!', 'color': '#FFDCA1', 'fontSize': 11, 'fontWeight': '700'}
    ],
    'caption': 'W drzewie stochastycznym prawdopodobieństwa kolejnych etapów wzdłuż jednej ścieżki MNOŻYMY. Wyniki ze sprzyjających ścieżek DODAJEMY. Dla dwóch kostek tabela 6 × 6 daje zawsze |Ω| = 36.'
}

DIAGRAM_STATYSTYKA = {
    'type': 'STATISTICS',
    'title': 'Statystyka opisowa: Średnia arytmetyczna vs Mediana (uporządkowanie!)',
    'formulaBadge': '$\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}, \\quad M = \\text{wartość środkowa (posortowana!)}$',
    'width': 480,
    'height': 210,
    'bars': [
        {'x': 60, 'y': 140, 'width': 35, 'height': 40, 'fill': 'rgba(100, 116, 139, 0.4)', 'stroke': '#64748B', 'label': '2'},
        {'x': 130, 'y': 120, 'width': 35, 'height': 60, 'fill': 'rgba(100, 116, 139, 0.4)', 'stroke': '#64748B', 'label': '3'},
        {'x': 200, 'y': 80, 'width': 35, 'height': 100, 'fill': 'rgba(16, 185, 129, 0.4)', 'stroke': '#10B981', 'label': '5'},
        {'x': 270, 'y': 40, 'width': 35, 'height': 140, 'fill': 'rgba(100, 116, 139, 0.4)', 'stroke': '#64748B', 'label': '8'},
        {'x': 340, 'y': 20, 'width': 35, 'height': 160, 'fill': 'rgba(100, 116, 139, 0.4)', 'stroke': '#64748B', 'label': '12'}
    ],
    'segments': [
        {'from': [40, 180], 'to': [440, 180], 'color': '#475569', 'strokeWidth': 1.5},
        {'from': [40, 95], 'to': [440, 95], 'color': '#FFB800', 'strokeWidth': 2, 'dashed': True}
    ],
    'labels': [
        {'x': 217, 'y': 60, 'text': 'MEDIANA = 5', 'color': '#10B981', 'fontSize': 11, 'fontWeight': '800', 'badge': True},
        {'x': 390, 'y': 95, 'text': 'Średnia x̄ = 6', 'color': '#FFB800', 'fontSize': 12, 'fontWeight': '700', 'badge': True},
        {'x': 240, 'y': 20, 'text': 'Złota zasada: ZANIM policzysz medianę, ZAWSZE posortuj liczby rosnąco!', 'color': '#FFDCA1', 'fontSize': 11, 'fontWeight': '700', 'badge': True},
        {'x': 240, 'y': 200, 'text': 'Zestaw: 2, 3, [5], 8, 12  (n = 5  ⟹  element środkowy)', 'color': '#F8FAFC', 'fontSize': 11}
    ],
    'caption': 'Mediana to wartość środkowa w uporządkowanym rosnąco zestawie danych. Średnia arytmetyczna to suma podzielona przez liczbę elementów. Pamiętaj: mediana z nieposortowanych liczb to 0 punktów na maturze!'
}

DIAGRAM_TROJKAT_ROWNOBOCZNY = {
    'type': 'GEOMETRY_2D',
    'title': 'Trójkąt równoboczny: Wysokość h, koło opisane R i wpisane r',
    'formulaBadge': '$h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad R = 2r = \\frac{2}{3}h$',
    'width': 460,
    'height': 225,
    'polygons': [
        {
            'points': '220,30 110,185 330,185',
            'fill': 'rgba(255, 184, 0, 0.08)',
            'stroke': '#FFB800',
            'strokeWidth': 2.5
        }
    ],
    'circles': [
        {'cx': 220, 'cy': 133, 'r': 52, 'stroke': '#10B981', 'strokeWidth': 1.5, 'fill': 'rgba(16, 185, 129, 0.08)'},
        {'cx': 220, 'cy': 133, 'r': 104, 'stroke': '#38BDF8', 'strokeWidth': 1.2, 'dashed': True, 'fill': 'none'}
    ],
    'segments': [
        {'from': [220, 30], 'to': [220, 185], 'color': '#F43F5E', 'strokeWidth': 2},
        {'from': [220, 30], 'to': [220, 133], 'color': '#38BDF8', 'strokeWidth': 3, 'label': 'R'},
        {'from': [220, 133], 'to': [220, 185], 'color': '#10B981', 'strokeWidth': 3, 'label': 'r'}
    ],
    'points': [
        {'x': 220, 'y': 30, 'label': 'C', 'color': '#FFB800', 'dot': 'filled', 'attach': 'n'},
        {'x': 110, 'y': 185, 'label': 'A', 'color': '#FFB800', 'dot': 'filled', 'attach': 'sw'},
        {'x': 330, 'y': 185, 'label': 'B', 'color': '#FFB800', 'dot': 'filled', 'attach': 'se'},
        {'x': 220, 'y': 133, 'label': 'S', 'color': '#FFDCA1', 'dot': 'filled', 'attach': 'e'}
    ],
    'labels': [
        {'x': 385, 'y': 65, 'text': 'R = a√3 / 3', 'color': '#38BDF8', 'fontSize': 13, 'fontWeight': '700', 'badge': True},
        {'x': 385, 'y': 105, 'text': 'r = a√3 / 6', 'color': '#10B981', 'fontSize': 13, 'fontWeight': '700', 'badge': True},
        {'x': 385, 'y': 145, 'text': 'R = 2r = ⅔h', 'color': '#FFDCA1', 'fontSize': 14, 'fontWeight': '800', 'badge': True},
        {'x': 220, 'y': 205, 'text': 'h = a√3 / 2', 'color': '#F43F5E', 'fontSize': 12, 'fontWeight': '700'}
    ],
    'caption': 'W trójkącie równobocznym środek koła wpisanego i opisanego to ten sam punkt. Dzieli on wysokość h w stosunku 2 : 1. Stąd promień koła opisanego R jest zawsze dwukrotnie większy od promienia wpisanego r: R = 2r.'
}

DIAGRAM_ODLEGLOSC = {
    'type': 'PLOT',
    'plotData': {
        'xRange': [0, 7],
        'yRange': [0, 6],
        'gridStep': 1,
        'segments': [
            {'from': [1, 1], 'to': [5, 4], 'color': '#FFB800', 'strokeWidth': 3},
            {'from': [1, 1], 'to': [5, 1], 'color': '#38BDF8', 'dashed': True, 'strokeWidth': 1.5, 'label': 'Δx = 4'},
            {'from': [5, 1], 'to': [5, 4], 'color': '#F43F5E', 'dashed': True, 'strokeWidth': 1.5, 'label': 'Δy = 3'}
        ],
        'points': [
            {'x': 1, 'y': 1, 'label': 'A(1; 1)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'sw'},
            {'x': 5, 'y': 4, 'label': 'B(5; 4)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'},
            {'x': 3, 'y': 2.5, 'label': 'S(3; 2.5) [środek]', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'},
            {'x': 5, 'y': 1, 'label': 'C(5; 1)', 'dot': 'hollow', 'color': '#64748B', 'attach': 'se'}
        ],
        'labels': [
            {'x': 1.8, 'y': 2.4, 'text': '|AB| = 5', 'color': '#FFB800', 'attach': 'nw'},
            {'x': 3.5, 'y': 5.4, 'text': '|AB|² = 4² + 3² = 25  (Pitagoras)', 'color': '#FFDCA1', 'attach': 'n'}
        ]
    }
}

DIAGRAM_OKRAG = {
    'type': 'GEOMETRY_2D',
    'title': 'Równanie okręgu w układzie współrzędnych: (x - a)² + (y - b)² = r²',
    'formulaBadge': '$(x - a)^2 + (y - b)^2 = r^2$',
    'width': 440,
    'height': 220,
    'circles': [
        {
            'cx': 190,
            'cy': 110,
            'r': 65,
            'fill': 'rgba(56, 189, 248, 0.08)',
            'stroke': '#38BDF8',
            'strokeWidth': 2
        }
    ],
    'segments': [
        {'from': [30, 185], 'to': [370, 185], 'color': '#475569', 'strokeWidth': 1.5},
        {'from': [55, 25], 'to': [55, 200], 'color': '#475569', 'strokeWidth': 1.5},
        {'from': [190, 110], 'to': [243, 73], 'color': '#FFB800', 'strokeWidth': 2.5, 'label': 'r'},
        {'from': [190, 110], 'to': [243, 110], 'color': '#38BDF8', 'dashed': True, 'strokeWidth': 1.5, 'label': 'x - a'},
        {'from': [243, 110], 'to': [243, 73], 'color': '#F43F5E', 'dashed': True, 'strokeWidth': 1.5, 'label': 'y - b'},
        {'from': [190, 110], 'to': [190, 185], 'color': '#334155', 'dashed': True, 'strokeWidth': 1},
        {'from': [55, 110], 'to': [190, 110], 'color': '#334155', 'dashed': True, 'strokeWidth': 1}
    ],
    'points': [
        {'x': 190, 'y': 110, 'label': 'S(a, b)', 'dot': 'filled', 'color': '#10B981', 'attach': 'sw'},
        {'x': 243, 'y': 73, 'label': 'P(x, y)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'},
        {'x': 190, 'y': 185, 'label': 'a', 'dot': 'hollow', 'color': '#94A3B8', 'attach': 's'},
        {'x': 55, 'y': 110, 'label': 'b', 'dot': 'hollow', 'color': '#94A3B8', 'attach': 'w'}
    ],
    'labels': [
        {'x': 365, 'y': 180, 'text': 'X', 'color': '#64748B', 'fontSize': 12, 'fontWeight': '700'},
        {'x': 55, 'y': 15, 'text': 'Y', 'color': '#64748B', 'fontSize': 12, 'fontWeight': '700'},
        {'x': 280, 'y': 35, 'text': '(x - a)² + (y - b)² = r²', 'color': '#FFDCA1', 'fontSize': 13, 'fontWeight': '700', 'badge': True}
    ],
    'caption': 'Równanie okręgu to bezpośrednie zastosowanie twierdzenia Pitagorasa w układzie OXY: odległość dowolnego punktu P(x, y) od środka S(a, b) wynosi r.'
}

print('Diagram dictionaries prepared successfully.')
