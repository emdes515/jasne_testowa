"""
topic_10.py - Dział 1.10: Funkcja liniowa i jej własności (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram
)

def get_topic_10_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.10.1: Wzór ogólny y = ax + b i znaczenie współczynnika a
        tab0 = make_plot_diagram(
            title='Współczynnik kierunkowy a: Kąt nachylenia i monotoniczność prostej',
            badge='\\begin{cases} a > 0 \\implies \\text{funkcja rosnąca } (\\nearrow) \\\\[3pt] a = 0 \\implies \\text{funkcja stała } (\\rightarrow) \\\\[3pt] a < 0 \\implies \\text{funkcja malejąca } (\\searrow) \\end{cases}',
            caption='Znak współczynnika kierunkowego a decyduje o tym, czy prosta rośnie, maleje, czy jest pozioma (stała).',
            segments=[
                {'from': [40, 150], 'to': [460, 150], 'color': C_SLATE, 'strokeWidth': 2}, # OX
                {'from': [250, 30], 'to': [250, 240], 'color': C_SLATE, 'strokeWidth': 2}, # OY
                {'from': [80, 230], 'to': [400, 70], 'color': C_SUCCESS, 'strokeWidth': 3}, # Rosnąca
                {'from': [80, 70], 'to': [400, 230], 'color': C_DANGER, 'strokeWidth': 2.5}, # Malejąca
                {'from': [60, 110], 'to': [440, 110], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True} # Stała
            ],
            labels=[
                {'x': 390, 'y': 55, 'text': 'a > 0 (Rosnąca)', 'color': C_SUCCESS, 'fontSize': 13, 'fontWeight': 'bold', 'anchor': 'end'},
                {'x': 440, 'y': 96, 'text': 'a = 0 (Stała)', 'color': C_SKY, 'fontSize': 13, 'fontWeight': 'bold', 'anchor': 'end'},
                {'x': 390, 'y': 245, 'text': 'a < 0 (Malejąca)', 'color': C_DANGER, 'fontSize': 13, 'fontWeight': 'bold', 'anchor': 'end'},
                {'x': 468, 'y': 150, 'text': 'X', 'color': C_TEXT, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 250, 'y': 18, 'text': 'Y', 'color': C_TEXT, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': '$a > 0$', 'value': 'Kąt ostry z osią OX: funkcja rosnąca', 'color': C_SUCCESS},
                {'label': '$a < 0$', 'value': 'Kąt rozwarty z osią OX: funkcja malejąca', 'color': C_DANGER},
                {'label': '$a = 0$', 'value': 'Prosta pozioma: funkcja stała', 'color': C_SKY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.10.2: Znaczenie wyrazu wolnego b (przecięcie z osią OY w punkcie (0, b))
        tab0 = make_plot_diagram(
            title='Wyraz wolny b: Przecięcie wykresu z pionową osią OY',
            badge='P = (0, b) = (0, f(0))',
            caption='Podstawiając x = 0 do wzoru y = ax + b, otrzymujemy y = b. Wykres KAŻDEJ funkcji liniowej przecina pionową oś OY dokładnie na wysokości b!',
            segments=[
                {'from': [40, 150], 'to': [460, 150], 'color': C_SLATE, 'strokeWidth': 2}, # OX
                {'from': [250, 30], 'to': [250, 240], 'color': C_SLATE, 'strokeWidth': 2}, # OY
                {'from': [100, 220], 'to': [400, 80], 'color': C_PRIMARY, 'strokeWidth': 3}
            ],
            points=[
                {'x': 250, 'y': 110, 'color': C_PRIMARY, 'label': '(0, b)'}
            ],
            labels=[
                {'x': 280, 'y': 105, 'text': 'Punkt (0, b) na osi OY', 'color': C_PRIMARY, 'fontSize': 13, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 250, 'y': 190, 'text': 'y = ax + b: b to wysokość przecięcia z OY', 'color': C_TEXT, 'fontSize': 13, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': '$b > 0$', 'value': 'Przecięcie NAD osią OX', 'color': C_SUCCESS},
                {'label': '$b = 0$', 'value': 'Przejście przez początek układu $(0, 0)$', 'color': C_SKY},
                {'label': '$b < 0$', 'value': 'Przecięcie POD osią OX', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.10.3: Wyznaczanie miejsca zerowego x₀ = -b/a algebraicznie i z rysunku
        tab0 = make_plot_diagram(
            title='Miejsce zerowe funkcji liniowej: x_0 = -b / a',
            badge='ax + b = 0 \\implies x_0 = -\\frac{b}{a}',
            caption='Miejsce zerowe funkcji to punkt przecięcia prostej z osią poziomą OX (wartość y = 0).',
            segments=[
                {'from': [40, 150], 'to': [460, 150], 'color': C_SLATE, 'strokeWidth': 2}, # OX
                {'from': [250, 30], 'to': [250, 240], 'color': C_SLATE, 'strokeWidth': 2}, # OY
                {'from': [100, 230], 'to': [380, 70], 'color': C_PRIMARY, 'strokeWidth': 3}
            ],
            points=[
                {'x': 170, 'y': 150, 'color': C_SUCCESS, 'label': '(-b/a, 0)'},
                {'x': 250, 'y': 105, 'color': C_SKY, 'label': '(0, b)'}
            ],
            labels=[
                {'x': 170, 'y': 180, 'text': 'Miejsce zerowe x₀', 'color': C_SUCCESS, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Wzór z tablic', 'value': '$x_0 = -\\frac{b}{a}$ (Karta wzorów str. 4)', 'color': C_SUCCESS},
                {'label': 'Znak minus', 'value': 'Pamiętaj o minusie przed ułamkiem!', 'color': C_DANGER},
                {'label': 'Sprawdzenie', 'value': 'Podstaw $x_0$ do wzoru: $a x_0 + b = 0$', 'color': C_SKY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 4:
        # L1.10.4: Warunek równoległości prostych (a₁ = a₂) w zadaniach CKE
        tab0 = make_plot_diagram(
            title='Warunek równoległości prostych: Identyczny współczynnik kierunkowy',
            badge='k \\parallel l \\implies a_1 = a_2',
            caption='Dwie proste są do siebie równoległe wtedy i tylko wtedy, gdy ich współczynniki kierunkowe a są DOKŁADNIE TAKIE SAME (a_1 = a_2)! Wyrazy wolne b mogą być dowolne.',
            segments=[
                {'from': [40, 150], 'to': [460, 150], 'color': C_SLATE, 'strokeWidth': 2}, # OX
                {'from': [250, 30], 'to': [250, 240], 'color': C_SLATE, 'strokeWidth': 2}, # OY
                {'from': [80, 220], 'to': [360, 80], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'k: y = 2x + 3'},
                {'from': [120, 240], 'to': [400, 100], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'l: y = 2x - 2'}
            ],
            labels=[
                {'x': 200, 'y': 100, 'text': 'Prosta k: a₁ = 2', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 340, 'y': 190, 'text': 'Prosta l: a₂ = 2', 'color': C_SUCCESS, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 250, 'y': 255, 'text': 'a₁ = a₂ = 2: proste są RÓWNOLEGŁE', 'color': C_TEXT, 'fontSize': 13, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Proste równoległe', 'value': '$a_1 = a_2$ (ten sam kąt nachylenia)', 'color': C_SUCCESS},
                {'label': 'Proste prostopadłe', 'value': '$a_1 \\cdot a_2 = -1$ (przeciwny i odwrotny)', 'color': C_SKY},
                {'label': 'Wyraz wolny $b$', 'value': 'Dowolny, nie wpływa na równoległość', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
