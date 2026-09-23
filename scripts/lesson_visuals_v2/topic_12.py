"""
topic_12.py - Dział 12: Funkcja kwadratowa (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals with Interactive Mafs Engine
100% Real KaTeX, 0% Emojis, Analytically Verified Coordinates.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram
)

def get_topic_12_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L12.1: Postać kanoniczna y = a(x - p)² + q i wierzchołek W(p, q)
        plot_data = {
            'xRange': [-2, 6],
            'yRange': [-2, 5],
            'gridStep': 1,
            'parabola': {
                'a': 1.0,
                'p': 2.0,
                'q': -1.0,
                'color': C_PRIMARY
            },
            'axisOfSymmetry': 2.0,
            'points': [
                {'x': 2.0, 'y': -1.0, 'color': C_SUCCESS, 'label': 'W(2, -1) = (p, q)', 'attach': 's'}
            ],
            'labels': [
                {'x': 2.0, 'y': 3.5, 'text': 'oś symetrii x = p = 2', 'color': C_SKY, 'attach': 'e'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Wierzchołek paraboli W(p, q) i pionowa oś symetrii x = p',
            badge=r'y = a(x - p)^2 + q \quad | \quad p = -\frac{b}{2a}, \quad q = -\frac{\Delta}{4a}',
            caption='Liczba p przesuwa parabolę w poziomie (oś symetrii x = p), a q wyznacza jej ekstremum na osi pionowej OY.',
            plotData=plot_data,
            metrics=[
                {'label': 'Odcięta wierzchołka', 'value': '$p = -\\frac{b}{2a}$ (oś symetrii)', 'color': C_SKY},
                {'label': 'Rzędna wierzchołka', 'value': '$q = f(p) = -\\frac{\\Delta}{4a}$', 'color': C_SUCCESS},
                {'label': 'Pułapka znaku', 'value': '$y = a(x - 3)^2 + 4 \\implies p = +3$', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L12.2: Postać iloczynowa y = a(x - x₁)(x - x₂) i symetria pierwiastków
        plot_data = {
            'xRange': [-1, 7],
            'yRange': [-5, 4],
            'gridStep': 1,
            'parabola': {
                'a': 1.0,
                'p': 3.0,
                'q': -4.0,
                'color': C_PRIMARY
            },
            'axisOfSymmetry': 3.0,
            'points': [
                {'x': 1.0, 'y': 0.0, 'color': C_PRIMARY, 'label': 'x₁ = 1', 'attach': 'nw'},
                {'x': 5.0, 'y': 0.0, 'color': C_PRIMARY, 'label': 'x₂ = 5', 'attach': 'ne'},
                {'x': 3.0, 'y': -4.0, 'color': C_SUCCESS, 'label': 'W(3, -4)', 'attach': 's'}
            ],
            'labels': [
                {'x': 3.0, 'y': -2.0, 'text': 'p = (x₁ + x₂)/2 = 3', 'color': C_SKY, 'attach': 'e'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Postać iloczynowa: Miejsca zerowe x₁, x₂ i środek symetrii p',
            badge=r'y = a(x - x_1)(x - x_2) \quad (\Delta > 0) \quad | \quad p = \frac{x_1 + x_2}{2}',
            caption='Odcięta wierzchołka p leży DOKŁADNIE w połowie odległości między miejscami zerowymi x₁ i x₂.',
            plotData=plot_data,
            metrics=[
                {'label': 'Warunek istnienia', 'value': '$\\Delta \\ge 0$ (dla $\\Delta < 0$ brak postaci iloczynowej)', 'color': C_DANGER},
                {'label': 'Środek pierwiastków', 'value': '$p = \\frac{x_1 + x_2}{2}$', 'color': C_SKY},
                {'label': 'Oś symetrii', 'value': '$x = p$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L12.3: Zbiór wartości i wartość min/max w przedziale domkniętym ⟨a, b⟩
        plot_data = {
            'xRange': [-2, 7],
            'yRange': [-3, 5],
            'gridStep': 1,
            'parabola': {
                'a': 0.5,
                'p': 2.0,
                'q': -2.0,
                'color': C_PRIMARY
            },
            'segments': [
                {'from': [0.0, -3.0], 'to': [0.0, 4.5], 'color': C_PURPLE, 'dashed': True, 'weight': 1.5},
                {'from': [5.0, -3.0], 'to': [5.0, 4.5], 'color': C_PURPLE, 'dashed': True, 'weight': 1.5}
            ],
            'points': [
                {'x': 0.0, 'y': 0.0, 'color': C_PURPLE, 'label': 'f(0) = 0', 'attach': 'nw'},
                {'x': 2.0, 'y': -2.0, 'color': C_SUCCESS, 'label': 'W(2, -2): min w przedziale', 'attach': 's'},
                {'x': 5.0, 'y': 2.5, 'color': C_PURPLE, 'label': 'f(5) = 2.5: max w przedziale', 'attach': 'ne'}
            ],
            'labels': [
                {'x': 0.0, 'y': 4.0, 'text': 'x = 0', 'color': C_PURPLE, 'attach': 'e'},
                {'x': 5.0, 'y': 4.0, 'text': 'x = 5', 'color': C_PURPLE, 'attach': 'w'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Wartość najmniejsza i największa w przedziale ⟨a, b⟩',
            badge=r'1^\circ \text{ Sprawdź, czy } p \in \langle a, b \rangle \quad | \quad 2^\circ \text{ Oblicz } f(a), f(b) \text{ oraz } f(p)',
            caption='Wierzchołek W(p, q) bierzemy pod uwagę TYLKO wtedy, gdy jego odcięta p wpada do przedziału ⟨a, b⟩!',
            plotData=plot_data,
            metrics=[
                {'label': 'Krok 1: Wierzchołek', 'value': 'Czy $p \\in \\langle a, b \\rangle$?', 'color': C_SKY},
                {'label': 'Krok 2: Wartości', 'value': 'Porównaj $f(a), f(b)$ oraz $f(p)$', 'color': C_PRIMARY},
                {'label': 'Zbiór wartości ZW', 'value': 'Dla $a > 0$: $\\langle q, +\\infty)$, dla $a < 0$: $(-\\infty, q\\rangle$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    else:
        # L12.4: Zadania optymalizacyjne (Maksimum w wierzchołku paraboli dla a < 0)
        plot_data = {
            'xRange': [-1, 7],
            'yRange': [-1, 6],
            'gridStep': 1,
            'parabola': {
                'a': -0.5,
                'p': 3.0,
                'q': 4.5,
                'color': C_PRIMARY
            },
            'axisOfSymmetry': 3.0,
            'points': [
                {'x': 3.0, 'y': 4.5, 'color': C_SUCCESS, 'label': 'W(3; 4.5)', 'attach': 'n'}
            ],
            'labels': [
                {'x': 3.0, 'y': 5.2, 'text': 'Maksimum: P_max = q = 4.5', 'color': C_SUCCESS, 'attach': 'n'},
                {'x': 3.2, 'y': 1.5, 'text': 'x_opt = p = -b/(2a) = 3', 'color': C_SKY, 'attach': 'e'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Model optymalizacyjny: Maksymalna wielkość w wierzchołku paraboli (a < 0)',
            badge=r'P(x) = ax^2 + bx + c \quad (a < 0) \quad | \quad x_{\max} = p = -\frac{b}{2a}',
            caption='Gdy ramiona paraboli są skierowane w dół (a < 0), funkcja osiąga wartość największą dokładnie w wierzchołku W(p, q).',
            plotData=plot_data,
            metrics=[
                {'label': 'Warunek maksimum', 'value': 'Współczynnik $a < 0$ (ramiona w dół)', 'color': C_DANGER},
                {'label': 'Optymalny wymiar', 'value': '$x = p = -\\frac{b}{2a}$ (zawsze w dziedzinie)', 'color': C_SKY},
                {'label': 'Wartość maksymalna', 'value': '$P_{\\max} = q = P(p)$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}
