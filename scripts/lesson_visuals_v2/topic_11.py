"""
topic_11.py - Dział 11: Ciągi liczbowe (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals with Interactive Mafs Engine
100% Real KaTeX, 0% Emojis, Pure Isolated Sequence Points (Discrete Domain n in N+).
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram
)

def get_topic_11_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L11.1: Wzór ogólny ciągu, dyskretna dziedzina n w N+ i badanie wyrazów dodatnich
        plot_data = {
            'xRange': [0, 6],
            'yRange': [0, 11],
            'gridStep': 1,
            'points': [
                {'x': 1, 'y': 1, 'color': C_PRIMARY, 'label': 'a₁ = 1', 'attach': 'n'},
                {'x': 2, 'y': 3, 'color': C_PRIMARY, 'label': 'a₂ = 3', 'attach': 'n'},
                {'x': 3, 'y': 5, 'color': C_SUCCESS, 'label': 'a₃ = 5', 'attach': 'n'},
                {'x': 4, 'y': 7, 'color': C_SUCCESS, 'label': 'a₄ = 7', 'attach': 'n'},
                {'x': 5, 'y': 9, 'color': C_SUCCESS, 'label': 'a₅ = 9', 'attach': 'n'}
            ],
            'labels': [
                {'x': 3.0, 'y': 10.2, 'text': 'Dyskretne punkty: n ∈ {1, 2, 3, 4, 5}', 'color': C_SKY, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Dyskretna dziedzina ciągu: Punkty izolowane dla n ∈ {1, 2, 3, ...}',
            badge=r'n \in \{1, 2, 3, \dots\} \quad (\text{nigdy } n \le 0 \text{ ani } n \notin \mathbb{C})',
            caption='Wykres ciągu to NIE jest linia ciągła! To pojedyncze, odizolowane punkty o odciętych n = 1, 2, 3, ... na osi poziomej.',
            plotData=plot_data,
            metrics=[
                {'label': 'Dziedzina', 'value': '$n \\in \\{1, 2, 3, \\dots\\}$ (liczby naturalne dodatnie)', 'color': C_SKY},
                {'label': 'Wyrazy dodatnie', 'value': '$a_n > 0 \\text{ dla każdego } n \\ge 1$', 'color': C_SUCCESS},
                {'label': 'Monotoniczność', 'value': '$a_{n+1} > a_n \\implies \\text{ciąg rosnący}$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L11.2: Ciąg arytmetyczny - stała różnica r oraz suma Sn
        plot_data = {
            'xRange': [0, 6],
            'yRange': [0, 11],
            'gridStep': 1,
            'points': [
                {'x': 1, 'y': 3, 'color': C_SKY, 'label': 'a₁ = 3', 'attach': 'n'},
                {'x': 2, 'y': 5, 'color': C_SKY, 'label': 'a₂ = 5 (+r)', 'attach': 'n'},
                {'x': 3, 'y': 7, 'color': C_PRIMARY, 'label': 'a₃ = 7 (+r)', 'attach': 'n'},
                {'x': 4, 'y': 9, 'color': C_SUCCESS, 'label': 'a₄ = 9 (+r)', 'attach': 'n'}
            ],
            'labels': [
                {'x': 2.5, 'y': 10.2, 'text': 'Stała różnica r = 2: a_n = 3 + (n-1)·2', 'color': C_PRIMARY, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Ciąg arytmetyczny: Stały krok r pomiędzy kolejnymi wyrazami',
            badge=r'a_n = a_1 + (n-1)r \quad | \quad S_n = \frac{a_1 + a_n}{2} \cdot n',
            caption='Każdy kolejny wyraz powstaje przez dodanie tej samej stałej różnicy r: a_2 = a_1 + r, a_3 = a_1 + 2r.',
            plotData=plot_data,
            metrics=[
                {'label': 'Różnica ciągu', 'value': '$r = a_{n+1} - a_n = \\text{const}$', 'color': C_PRIMARY},
                {'label': 'Wzór ogólny', 'value': '$a_n = a_1 + (n-1)r$', 'color': C_SKY},
                {'label': 'Suma n wyrazów', 'value': '$S_n = \\frac{a_1 + a_n}{2} \\cdot n$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L11.3: Ciąg geometryczny - stały iloraz q oraz suma Sn
        plot_data = {
            'xRange': [0, 5],
            'yRange': [0, 10],
            'gridStep': 1,
            'points': [
                {'x': 1, 'y': 1, 'color': C_SKY, 'label': 'a₁ = 1', 'attach': 'n'},
                {'x': 2, 'y': 2, 'color': C_SKY, 'label': 'a₂ = 2 (·q)', 'attach': 'n'},
                {'x': 3, 'y': 4, 'color': C_PRIMARY, 'label': 'a₃ = 4 (·q)', 'attach': 'n'},
                {'x': 4, 'y': 8, 'color': C_SUCCESS, 'label': 'a₄ = 8 (·q)', 'attach': 'n'}
            ],
            'labels': [
                {'x': 2.5, 'y': 9.2, 'text': 'Stały iloraz q = 2: a_n = 1 · 2^(n-1)', 'color': C_PURPLE, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Ciąg geometryczny: Mnożenie przez stały iloraz q',
            badge=r'a_n = a_1 \cdot q^{n-1} \quad | \quad S_n = a_1 \cdot \frac{1 - q^n}{1 - q}',
            caption='Każdy kolejny wyraz powstaje przez pomnożenie poprzedniego przez stałą liczbę q: a_2 = a_1 · q, a_3 = a_1 · q².',
            plotData=plot_data,
            metrics=[
                {'label': 'Iloraz ciągu', 'value': '$q = \\frac{a_{n+1}}{a_n} = \\text{const}$', 'color': C_PURPLE},
                {'label': 'Wzór ogólny', 'value': '$a_n = a_1 \\cdot q^{n-1}$', 'color': C_PRIMARY},
                {'label': 'Suma n wyrazów', 'value': '$S_n = a_1 \\cdot \\frac{1 - q^n}{1 - q}$ (dla $q \\neq 1$)', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    else:
        # L11.4: Zależność trzech sąsiednich wyrazów (arytmetyczny vs geometryczny)
        plot_data = {
            'xRange': [0, 5],
            'yRange': [0, 12],
            'gridStep': 1,
            'points': [
                {'x': 1, 'y': 2, 'color': C_PRIMARY, 'label': 'x = a₁ = 2', 'attach': 'n'},
                {'x': 2, 'y': 6, 'color': C_SUCCESS, 'label': 'y = a₂ = 6 (środek)', 'attach': 'n'},
                {'x': 3, 'y': 10, 'color': C_PRIMARY, 'label': 'z = a₃ = 10', 'attach': 'n'}
            ],
            'labels': [
                {'x': 2.5, 'y': 11.2, 'text': 'y = (x + z)/2  ⟹  6 = (2 + 10)/2', 'color': C_SUCCESS, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Trzy kolejne wyrazy (x, y, z): Średnia arytmetyczna vs geometryczna',
            badge=r'\text{Arytmetyczny: } y = \frac{x + z}{2} \quad | \quad \text{Geometryczny: } y^2 = x \cdot z',
            caption='Wyraz środkowy jest średnią arytmetyczną skrajnych w ciągu arytmetycznym, a w geometrycznym jego kwadrat równa się iloczynowi skrajnych.',
            plotData=plot_data,
            metrics=[
                {'label': 'Arytmetyczny', 'value': '$2y = x + z$', 'color': C_PRIMARY},
                {'label': 'Geometryczny', 'value': '$y^2 = x \\cdot z$', 'color': C_PURPLE},
                {'label': 'Złota zasada CKE', 'value': 'Zawsze zapisz równanie na wyraz środkowy', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}
