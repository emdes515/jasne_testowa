"""
topic_10.py - Dział 1.10: Funkcja liniowa i jej własności (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals with Interactive Mafs Engine
100% Real KaTeX, 0% Emojis, Analytically Verified Coordinates.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram
)

def get_topic_10_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.10.1: Wzór ogólny y = ax + b i znaczenie współczynnika a
        plot_data = {
            'xRange': [-4, 4],
            'yRange': [-4, 4],
            'gridStep': 1,
            'lines': [
                {'slope': 1.0, 'intercept': 0.0, 'color': C_SUCCESS},  # a > 0
                {'slope': -1.0, 'intercept': 0.0, 'color': C_DANGER}, # a < 0
                {'slope': 0.0, 'intercept': 2.0, 'color': C_SKY, 'dashed': True} # a = 0
            ],
            'labels': [
                {'x': 2.2, 'y': 2.6, 'text': 'a > 0 (rosnąca)', 'color': C_SUCCESS, 'attach': 'se'},
                {'x': 2.2, 'y': -2.6, 'text': 'a < 0 (malejąca)', 'color': C_DANGER, 'attach': 'ne'},
                {'x': 2.2, 'y': 1.6, 'text': 'a = 0 (stała: y = 2)', 'color': C_SKY, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Współczynnik kierunkowy a: Kąt nachylenia i monotoniczność prostej',
            badge=r'\begin{cases} a > 0 \implies \text{funkcja rosnąca } (\nearrow) \\ a = 0 \implies \text{funkcja stała } (\rightarrow) \\ a < 0 \implies \text{funkcja malejąca } (\searrow) \end{cases}',
            caption='Znak współczynnika kierunkowego a decyduje o tym, czy prosta rośnie, maleje, czy jest pozioma (stała). Zawsze odczytujemy wykres od lewej do prawej!',
            plotData=plot_data,
            metrics=[
                {'label': '$a > 0$', 'value': 'Kąt ostry z osią OX: funkcja rosnąca', 'color': C_SUCCESS},
                {'label': '$a < 0$', 'value': 'Kąt rozwarty z osią OX: funkcja malejąca', 'color': C_DANGER},
                {'label': '$a = 0$', 'value': 'Prosta pozioma: funkcja stała', 'color': C_SKY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.10.2: Znaczenie wyrazu wolnego b (przecięcie z osią OY w punkcie (0, b))
        plot_data = {
            'xRange': [-4, 4],
            'yRange': [-3, 5],
            'gridStep': 1,
            'lines': [
                {'slope': 1.5, 'intercept': 2.0, 'color': C_PRIMARY}
            ],
            'points': [
                {'x': 0, 'y': 2, 'color': C_PRIMARY, 'label': 'P(0, 2) = (0, b)', 'attach': 'w'}
            ],
            'labels': [
                {'x': 1.2, 'y': 4.2, 'text': 'y = 1.5x + 2', 'color': C_PRIMARY, 'attach': 'se'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Wyraz wolny b: Przecięcie wykresu z pionową osią OY',
            badge=r'P = (0,\; b) = (0,\; f(0))',
            caption='Podstawiając x = 0 do wzoru y = ax + b, otrzymujemy y = b. Wykres KAŻDEJ funkcji liniowej przecina pionową oś OY dokładnie na wysokości b!',
            plotData=plot_data,
            metrics=[
                {'label': '$b > 0$', 'value': 'Przecięcie NAD osią OX: (0, b)', 'color': C_SUCCESS},
                {'label': '$b = 0$', 'value': 'Przejście przez początek układu (0, 0)', 'color': C_SKY},
                {'label': '$b < 0$', 'value': 'Przecięcie POD osią OX: (0, b)', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.10.3: Wyznaczanie miejsca zerowego x₀ = -b/a algebraicznie i z rysunku
        plot_data = {
            'xRange': [-3, 5],
            'yRange': [-5, 4],
            'gridStep': 1,
            'lines': [
                {'slope': 1.5, 'intercept': -3.0, 'color': C_PRIMARY}
            ],
            'points': [
                {'x': 2, 'y': 0, 'color': C_SUCCESS, 'label': 'x_0 = 2 (miejsce zerowe)', 'attach': 'n'},
                {'x': 0, 'y': -3, 'color': C_SKY, 'label': '(0, -3) = (0, b)', 'attach': 'e'}
            ],
            'labels': [
                {'x': 2.5, 'y': 1.5, 'text': 'f(x) = 1.5x - 3', 'color': C_PRIMARY, 'attach': 'nw'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Miejsce zerowe funkcji liniowej: x_0 = -b / a',
            badge=r'ax + b = 0 \implies x_0 = -\frac{b}{a}',
            caption='Miejsce zerowe funkcji to punkt przecięcia prostej z osią poziomą OX (wartość y = 0). Oś pionową OY prosta przecina w punkcie (0, b).',
            plotData=plot_data,
            metrics=[
                {'label': 'Wzór z tablic', 'value': '$x_0 = -\\frac{b}{a}$ (Karta wzorów str. 21)', 'color': C_SUCCESS},
                {'label': 'Znak minus', 'value': 'Pamiętaj o minusie przed ułamkiem!', 'color': C_DANGER},
                {'label': 'Sprawdzenie', 'value': 'Podstaw $x_0$ do wzoru: $a x_0 + b = 0$', 'color': C_SKY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 4:
        # L1.10.4: Warunek równoległości prostych (a₁ = a₂) w zadaniach CKE
        plot_data = {
            'xRange': [-4, 4],
            'yRange': [-5, 5],
            'gridStep': 1,
            'lines': [
                {'slope': 2.0, 'intercept': 1.0, 'color': C_PRIMARY},
                {'slope': 2.0, 'intercept': -3.0, 'color': C_SUCCESS}
            ],
            'labels': [
                {'x': -1.2, 'y': 1.8, 'text': 'k: y = 2x + 1 (a₁ = 2)', 'color': C_PRIMARY, 'attach': 'nw'},
                {'x': 1.2, 'y': -3.2, 'text': 'l: y = 2x - 3 (a₂ = 2)', 'color': C_SUCCESS, 'attach': 'se'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Warunek równoległości prostych: Identyczny współczynnik kierunkowy',
            badge=r'k \parallel l \implies a_1 = a_2',
            caption='Dwie proste są do siebie równoległe wtedy i tylko wtedy, gdy ich współczynniki kierunkowe a są DOKŁADNIE TAKIE SAME (a_1 = a_2)! Wyrazy wolne b mogą być dowolne.',
            plotData=plot_data,
            metrics=[
                {'label': 'Proste równoległe', 'value': '$a_1 = a_2$ (ten sam kąt nachylenia)', 'color': C_SUCCESS},
                {'label': 'Proste prostopadłe', 'value': '$a_1 \\cdot a_2 = -1$ (przeciwny i odwrotny)', 'color': C_SKY},
                {'label': 'Wyraz wolny $b$', 'value': 'Dowolny, nie wpływa na równoległość', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
