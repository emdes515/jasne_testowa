"""
topic_09.py - Dział 1.9: Odczytywanie informacji z wykresu funkcji (4 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals with Interactive Mafs Engine
100% Real KaTeX, 0% Emojis, Analytically Verified Coordinates.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram
)

def get_topic_09_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.9.1: Odczyt dziedziny D (oś OX) i zbioru wartości ZW (oś OY)
        plot_data = {
            'xRange': [-6, 7],
            'yRange': [-3, 5],
            'gridStep': 1,
            'segments': [
                {'from': [-4.0, -1.0], 'to': [-1.0, 3.0], 'color': C_PRIMARY, 'startDot': 'solid', 'endDot': 'none', 'weight': 3},
                {'from': [-1.0, 3.0], 'to': [2.0, 0.0], 'color': C_PRIMARY, 'weight': 3},
                {'from': [2.0, 0.0], 'to': [5.0, 2.0], 'color': C_PRIMARY, 'startDot': 'none', 'endDot': 'solid', 'weight': 3}
            ],
            'points': [
                {'x': -4.0, 'y': -1.0, 'color': C_PRIMARY, 'label': 'A(-4, -1)', 'attach': 'sw'},
                {'x': 5.0, 'y': 2.0, 'color': C_PRIMARY, 'label': 'B(5, 2)', 'attach': 'ne'},
                {'x': -1.0, 'y': 3.0, 'color': C_SUCCESS, 'label': 'max: y = 3', 'attach': 'n'}
            ],
            'labels': []
        }
        tab0 = make_plot_diagram(
            title='Odczyt dziedziny D (oś pozioma OX) i zbioru wartości ZW (oś pionowa OY)',
            badge=r'D_f \subset OX,\quad ZW_f \subset OY',
            caption='Dziedzinę odczytujemy "od lewej do prawej" na osi OX (rzut poziomy). Zbiór wartości odczytujemy "od dołu do góry" na osi OY (rzut pionowy). Kółko zamalowane = nawias domknięty [ ], otwarte = okrągły ( ).',
            plotData=plot_data,
            metrics=[
                {'label': 'Dziedzina $D$', 'value': 'Oś pozioma $OX$ (od lewej do prawej)', 'color': C_SKY},
                {'label': 'Zbiór wartości $ZW$', 'value': 'Oś pionowa $OY$ (od dołu do góry)', 'color': C_SUCCESS},
                {'label': 'Punkty brzegowe', 'value': 'Zamalowane = domknięte, puste = otwarte', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.9.2: Odczyt miejsc zerowych f(x) = 0 oraz punktu przecięcia z osią OY
        plot_data = {
            'xRange': [-4, 6],
            'yRange': [-5, 4],
            'gridStep': 1,
            'parabola': {
                'a': 0.375,
                'p': 1.0,
                'q': -3.375,
                'color': C_PRIMARY
            },
            'points': [
                {'x': -2.0, 'y': 0.0, 'color': C_SUCCESS, 'label': 'x₁ = -2', 'attach': 'nw'},
                {'x': 4.0, 'y': 0.0, 'color': C_SUCCESS, 'label': 'x₂ = 4', 'attach': 'ne'},
                {'x': 0.0, 'y': -3.0, 'color': C_SKY, 'label': '(0, -3)', 'attach': 'e'}
            ],
            'labels': [
                {'x': 1.0, 'y': -4.2, 'text': 'Wierzchołek i oś symetrii', 'color': C_MUTED, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Miejsca zerowe i punkt przecięcia z osią OY',
            badge=r'f(x) = 0 \implies x \in OX;\quad P = (0, f(0)) \in OY',
            caption='Miejsce zerowe to punkt na poziomej osi OX, gdzie wykres ją przecina. Punkt (0, f(0)) to punkt na pionowej osi OY.',
            plotData=plot_data,
            metrics=[
                {'label': 'Miejsca zerowe', 'value': 'Podajesz wyłącznie argumenty $x$: $x = -2, x = 4$', 'color': C_SUCCESS},
                {'label': 'Przecięcie z $OY$', 'value': 'Zawsze dla $x = 0$: punkt $(0, f(0))$', 'color': C_SKY},
                {'label': 'Puste kółko na $OX$', 'value': 'NIE jest miejscem zerowym!', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.9.3: Odczytywanie przedziałów monotoniczności (gdzie rośnie, gdzie maleje)
        plot_data = {
            'xRange': [-5, 7],
            'yRange': [-4, 4],
            'gridStep': 1,
            'segments': [
                {'from': [-4.0, -2.0], 'to': [-1.0, 3.0], 'color': C_SUCCESS, 'weight': 3, 'startDot': 'solid'},
                {'from': [-1.0, 3.0], 'to': [3.0, -2.0], 'color': C_DANGER, 'weight': 3},
                {'from': [3.0, -2.0], 'to': [6.0, -2.0], 'color': C_SKY, 'weight': 3, 'endDot': 'solid'}
            ],
            'labels': [
                {'x': -2.5, 'y': 1.2, 'text': 'ROŚNIE: [-4, -1]', 'color': C_SUCCESS, 'attach': 'nw'},
                {'x': 1.0, 'y': 1.2, 'text': 'MALEJE: [-1, 3]', 'color': C_DANGER, 'attach': 'ne'},
                {'x': 4.5, 'y': -1.4, 'text': 'STAŁA: [3, 6]', 'color': C_SKY, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Monotoniczność funkcji: Idziemy "pod górkę" i "z górki"',
            badge=r'f \nearrow \iff x_1 < x_2 \implies f(x_1) < f(x_2)',
            caption='Monotoniczność śledzimy ZAWSZE od lewej do prawej! "Pod górkę" oznacza rosnącą, "z górki" malejącą. Przedziały monotoniczności podajemy DLA ARGUMENTÓW X na osi OX!',
            plotData=plot_data,
            metrics=[
                {'label': 'Przedziały', 'value': 'Podajemy ZAWSZE dla osi poziomej $OX$!', 'color': C_PRIMARY},
                {'label': 'Kierunek analizy', 'value': 'Od lewej do prawej strony wykresu', 'color': C_SUCCESS},
                {'label': 'Częsty błąd', 'value': 'Podanie wartości $y$ zamiast argumentów $x$', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 4:
        # L1.9.4: Liczba rozwiązań równania f(x) = m (przecinanie poziomą prostą y = m)
        plot_data = {
            'xRange': [-5, 5],
            'yRange': [-3, 4],
            'gridStep': 1,
            'segments': [
                {'from': [-4.0, -2.0], 'to': [-2.0, 3.0], 'color': C_PRIMARY, 'weight': 3, 'startDot': 'solid'},
                {'from': [-2.0, 3.0], 'to': [0.0, -1.0], 'color': C_PRIMARY, 'weight': 3},
                {'from': [0.0, -1.0], 'to': [2.0, 3.0], 'color': C_PRIMARY, 'weight': 3},
                {'from': [2.0, 3.0], 'to': [4.0, -2.0], 'color': C_PRIMARY, 'weight': 3, 'endDot': 'solid'}
            ],
            'horizontalLines': [
                {'y': 1.0, 'color': C_SUCCESS, 'dashed': True}
            ],
            'points': [
                {'x': -2.8, 'y': 1.0, 'color': C_SUCCESS, 'label': 'x₁', 'attach': 'nw'},
                {'x': -1.0, 'y': 1.0, 'color': C_SUCCESS, 'label': 'x₂', 'attach': 'ne'},
                {'x': 1.0, 'y': 1.0, 'color': C_SUCCESS, 'label': 'x₃', 'attach': 'nw'},
                {'x': 2.8, 'y': 1.0, 'color': C_SUCCESS, 'label': 'x₄', 'attach': 'ne'}
            ],
            'labels': [
                {'x': 0.0, 'y': 1.4, 'text': 'y = 1 (dokładnie 4 rozwiązania: x₁, x₂, x₃, x₄)', 'color': C_SUCCESS, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Liczba rozwiązań równania f(x) = m: Pozioma prosta',
            badge=r'f(x) = m \implies \text{Punkty wspólne wykresu } f \text{ i prostej } y = m',
            caption='Aby ustalić ile rozwiązań ma równanie f(x) = m, kładziemy linijkę POZIOMO na wysokości y = m i liczymy ile razy linijka przetnie wykres.',
            plotData=plot_data,
            metrics=[
                {'label': 'Prosta $y = m$', 'value': 'Zawsze POZIOMA (stała wysokość)', 'color': C_SUCCESS},
                {'label': 'Liczba rozwiązań', 'value': 'Liczba punktów przecięcia wykresu z tą prostą', 'color': C_PRIMARY},
                {'label': 'Puste kółko', 'value': 'NIE tworzy rozwiązania!', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
