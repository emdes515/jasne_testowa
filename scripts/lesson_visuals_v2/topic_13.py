"""
topic_13.py - Dział 13: Przekształcenia wykresów funkcji (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram
)

def get_topic_13_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L13.1: Przesunięcie o wektor v = [p, q] (y = f(x - p) + q)
        tab0 = make_plot_diagram(
            title='Przesunięcie o wektor v = [p, q]: y = f(x - p) + q',
            badge=r'g(x) = f(x - p) + q \quad | \quad \vec{v} = [p, q]',
            caption='Liczba p w nawiasie przesuwa wykres w poziomie z PRZECIWNYM znakiem (x - 2 to 2 w prawo!), a q za nawiasem w pionie.',
            curves=[
                {
                    'fn': '0.3*x**2',
                    'domain': [-3, 3],
                    'color': C_SLATE,
                    'strokeWidth': 2,
                    'dashed': True,
                    'label': 'f(x)'
                },
                {
                    'fn': '0.3*(x-3)**2 + 1',
                    'domain': [0, 6],
                    'color': C_PRIMARY,
                    'strokeWidth': 3,
                    'label': 'g(x) = f(x - 3) + 1'
                }
            ],
            segments=[
                {'from': [40, 200], 'to': [460, 200], 'color': C_SLATE, 'strokeWidth': 2}, # OX
                {'from': [100, 30], 'to': [100, 240], 'color': C_SLATE, 'strokeWidth': 2}, # OY
                # Wektor przesunięcia [p, q]
                {'from': [100, 200], 'to': [280, 200], 'color': C_SKY, 'strokeWidth': 2},
                {'from': [280, 200], 'to': [280, 140], 'color': C_SUCCESS, 'strokeWidth': 2},
                {'from': [100, 200], 'to': [280, 140], 'color': C_PRIMARY, 'strokeWidth': 2.5}
            ],
            points=[
                {'x': 100, 'y': 200, 'color': C_SLATE, 'label': '(0, 0)'},
                {'x': 280, 'y': 140, 'color': C_PRIMARY, 'label': 'W(p, q)'}
            ],
            labels=[
                {'x': 190, 'y': 215, 'text': 'p jednostek w prawo (+p)', 'color': C_SKY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 295, 'y': 170, 'text': 'q w górę (+q)', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 180, 'y': 160, 'text': 'wektor v = [p, q]', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'end'}
            ],
            metrics=[
                {'label': 'Poziomo (oś OX)', 'value': '$f(x - p)$: w prawo dla $p > 0$, w lewo dla $p < 0$', 'color': C_SKY},
                {'label': 'Pionowo (oś OY)', 'value': '$f(x) + q$: w górę dla $q > 0$, w dół dla $q < 0$', 'color': C_SUCCESS},
                {'label': 'Pułapka CKE', 'value': '$f(x + 3)$ przesuwa o 3 jednostki w LEWO!', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L13.2: Symetrie osiowe względem osi OX (y = -f(x)) oraz osi OY (y = f(-x))
        tab0 = make_plot_diagram(
            title='Symetria względem osi OX: y = -f(x) oraz osi OY: y = f(-x)',
            badge=r'\text{Oś } OX: \quad y = -f(x) \quad | \quad \text{Oś } OY: \quad y = f(-x)',
            caption='Minus przed całym wzorem (-f(x)) odbija wykres góra-dół (względem OX). Minus przy samym argumencie (f(-x)) odbija prawo-lewo (względem OY).',
            curves=[
                {
                    'fn': '0.5*(x-1)**2 - 1.5',
                    'domain': [-1, 3],
                    'color': C_SKY,
                    'strokeWidth': 2,
                    'label': 'f(x)'
                },
                {
                    'fn': '-(0.5*(x-1)**2 - 1.5)',
                    'domain': [-1, 3],
                    'color': C_DANGER,
                    'strokeWidth': 2.5,
                    'label': '-f(x) (odbicie OX)'
                }
            ],
            segments=[
                {'from': [40, 135], 'to': [460, 135], 'color': C_PRIMARY, 'strokeWidth': 2.5}, # Oś OX lustro
                {'from': [250, 20], 'to': [250, 250], 'color': C_SLATE, 'strokeWidth': 1.5}    # OY
            ],
            points=[
                {'x': 310, 'y': 190, 'color': C_SKY, 'label': 'A(x, y)'},
                {'x': 310, 'y': 80, 'color': C_DANGER, 'label': 'A\'(x, -y)'}
            ],
            labels=[
                {'x': 450, 'y': 125, 'text': 'Oś OX (lustro)', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'end'},
                {'x': 310, 'y': 210, 'text': 'Wykres f(x)', 'color': C_SKY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 310, 'y': 65, 'text': 'Wykres -f(x)', 'color': C_DANGER, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Symetria OX', 'value': '$y = -f(x)$: zmiana znaku rzędnych $(x, y) \\to (x, -y)$', 'color': C_DANGER},
                {'label': 'Symetria OY', 'value': '$y = f(-x)$: zmiana znaku odciętych $(x, y) \\to (-x, y)$', 'color': C_PURPLE},
                {'label': 'Symetria (0,0)', 'value': '$y = -f(-x)$: symetria środkowa względem początku', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    else:
        # L13.3: Odczytywanie i interpretacja wykresów po przekształceniach
        tab0 = make_plot_diagram(
            title='Przekształcenia wykresów: Odczytywanie własności nowej funkcji',
            badge=r'g(x) = f(x - 1) + 2 \implies D_g = \langle a + 1, b + 1 \rangle, \quad ZW_g = \langle c + 2, d + 2 \rangle',
            caption='Przesunięcie wykresu przesuwa również dziedzinę D (w poziomie) oraz zbiór wartości ZW (w pionie).',
            segments=[
                {'from': [40, 160], 'to': [460, 160], 'color': C_SLATE, 'strokeWidth': 2}, # OX
                {'from': [120, 30], 'to': [120, 240], 'color': C_SLATE, 'strokeWidth': 2}, # OY
                # Odcinki funkcji f(x)
                {'from': [160, 200], 'to': [240, 100], 'color': C_SLATE, 'strokeWidth': 2, 'dashed': True},
                {'from': [240, 100], 'to': [320, 160], 'color': C_SLATE, 'strokeWidth': 2, 'dashed': True},
                # Odcinki funkcji g(x) = f(x - 2) + 1
                {'from': [220, 170], 'to': [300, 70], 'color': C_PRIMARY, 'strokeWidth': 3},
                {'from': [300, 70], 'to': [380, 130], 'color': C_PRIMARY, 'strokeWidth': 3}
            ],
            points=[
                {'x': 160, 'y': 200, 'color': C_SLATE, 'label': 'P₀'},
                {'x': 220, 'y': 170, 'color': C_PRIMARY, 'label': 'P₁'}
            ],
            labels=[
                {'x': 220, 'y': 220, 'text': 'f(x) [pierwotna]', 'color': C_MUTED, 'fontSize': 11, 'anchor': 'middle'},
                {'x': 350, 'y': 60, 'text': 'g(x) = f(x - 2) + 1', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'start'}
            ],
            metrics=[
                {'label': 'Przesunięcie dziedziny', 'value': '$D_g = \\langle x_{\\min} + p, x_{\\max} + p \\rangle$', 'color': C_SKY},
                {'label': 'Przesunięcie ZW', 'value': '$ZW_g = \\langle y_{\\min} + q, y_{\\max} + q \\rangle$', 'color': C_SUCCESS},
                {'label': 'Miejsca zerowe', 'value': 'Przesuwają się o $p$ w poziomie (jeśli $q = 0$)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}
