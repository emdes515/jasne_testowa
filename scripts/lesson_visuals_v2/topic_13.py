"""
topic_13.py - Dział 13: Przekształcenia wykresów funkcji (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram, make_step_flow_diagram, make_comparison_card_diagram
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
        tab2 = make_step_flow_diagram(
            title="Przesunięcie punktu i wzoru funkcji o wektor krok po kroku",
            badge=r"A(2, -3), \; \vec{v} = [-4, 5] \implies g(x) = f(x + 4) + 5, \quad A'(-2, 2)",
            caption="Wektor [p, q] przesuwa każdy punkt wykresu: x' = x + p, y' = y + q. We wzorze w nawiasie wpisujesz (x - p).",
            steps=[
                {'num': 1, 'title': 'Zidentyfikuj współrzędne wektora', 'desc': r'$\vec{v} = [p, q] = [-4, 5]$. Przesunięcie o 4 w lewo oraz 5 w górę.', 'color': C_SKY},
                {'num': 2, 'title': 'Utwórz wzór nowej funkcji', 'desc': r'$g(x) = f(x - (-4)) + 5 = f(x + 4) + 5$. Pamiętaj o zmianie znaku w nawiasie!', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Przesuń punkt A', 'desc': r'$A\' = (2 + (-4), -3 + 5) = (-2, 2)$. Nowy punkt leży na wykresie funkcji $g$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wektor', 'value': r'$\vec{v} = [-4, 5]$', 'color': C_SKY},
                {'label': 'Wzór funkcji', 'value': r'$g(x) = f(x + 4) + 5$', 'color': C_PRIMARY},
                {'label': 'Przesunięty punkt', 'value': r'$A\'(-2, 2)$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zły kierunek przesunięcia poziomego we wzorze f(x + a)",
            badge=r"g(x) = f(x + 3) \implies \vec{v} = [-3, 0] \text{ (w LEWO)} \neq [+3, 0]",
            caption="W argumencie funkcji poziome przesunięcie działa Z PRZECIWNYM ZNAKIEM! Wyrażenie f(x + 3) oznacza przesunięcie w lewo, a f(x - 3) w prawo. Za nawiasem znak działa wprost.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Przesunięcie w prawo dla $f(x + 3)$ (błędna interpretacja)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'$f(x + 3) = f(x - (-3)) \implies p = -3$ (przesunięcie w lewo)', 'color': C_SUCCESS},
                {'label': 'Pionowo (za nawiasem)', 'value': '$+q$ w górę, $-q$ w dół (zgodnie ze znakiem)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

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
                {'label': 'Symetria OX', 'value': r'$y = -f(x)$: zmiana znaku rzędnych $(x, y) \to (x, -y)$', 'color': C_DANGER},
                {'label': 'Symetria OY', 'value': r'$y = f(-x)$: zmiana znaku odciętych $(x, y) \to (-x, y)$', 'color': C_PURPLE},
                {'label': 'Symetria (0,0)', 'value': r'$y = -f(-x)$: symetria środkowa względem początku', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Przekształcenia symetryczne punktów i wzorów krok po kroku",
            badge=r"P(3, -5) \xrightarrow{S_{OX}} P_1(3, 5), \quad P(3, -5) \xrightarrow{S_{OY}} P_2(-3, -5), \quad P(3, -5) \xrightarrow{S_{(0,0)}} P_3(-3, 5)",
            caption="W symetrii względem OX zmieniasz znak współrzędnej y, a w symetrii względem OY zmieniasz znak współrzędnej x.",
            steps=[
                {'num': 1, 'title': 'Symetria względem osi OX', 'desc': r'Odbicie lustrzane góra-dół: $y = -f(x)$. Punkt $(x, y) \to (x, -y)$, czyli $P(3, -5) \to (3, 5)$.', 'color': C_DANGER},
                {'num': 2, 'title': 'Symetria względem osi OY', 'desc': r'Odbicie lustrzane prawo-lewo: $y = f(-x)$. Punkt $(x, y) \to (-x, y)$, czyli $P(3, -5) \to (-3, -5)$.', 'color': C_PURPLE},
                {'num': 3, 'title': 'Symetria środkowa względem (0, 0)', 'desc': r'Złożenie obu symetrii: $y = -f(-x)$. Zmiana obu znaków: $(x, y) \to (-x, -y)$, czyli $(-3, 5)$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Odbicie OX', 'value': r'$-f(x) \implies (x, -y)$', 'color': C_DANGER},
                {'label': 'Odbicie OY', 'value': r'$f(-x) \implies (-x, y)$', 'color': C_PURPLE},
                {'label': 'Środek (0, 0)', 'value': r'$-f(-x) \implies (-x, -y)$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie symetrii względem osi OX z symetrią względem OY",
            badge=r"y = -f(x) \text{ (odbicie góra-dół)} \neq y = f(-x) \text{ (odbicie lewo-prawo)}",
            caption="Minus stojący PRZED całą funkcją (-f(x)) odbija wykres góra-dół (względem osi poziomej OX). Minus PRZY SAMYM X (f(-x)) odbija wykres prawo-lewo (względem osi pionowej OY).",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Uznanie $-f(x)$ za odbicie względem osi pionowej $OY$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Minus z przodu $\implies OX$, minus w argumencie $\implies OY$', 'color': C_SUCCESS},
                {'label': 'Wpływ na ZW', 'value': r'Symetria $OX$ odwraca zbiór wartości: $\langle a, b \rangle \to \langle -b, -a \rangle$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L13.3: Odczytywanie i interpretacja wykresów po przekształceniach
        tab0 = make_plot_diagram(
            title='Przekształcenia wykresów: Odczytywanie własności nowej funkcji',
            badge=r'g(x) = f(x - 1) + 2 \longrightarrow D_g = \langle a + 1, b + 1 \rangle, \quad ZW_g = \langle c + 2, d + 2 \rangle',
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
                {'label': 'Przesunięcie dziedziny', 'value': r'$D_g = \langle x_{\min} + p, x_{\max} + p \rangle$', 'color': C_SKY},
                {'label': 'Przesunięcie ZW', 'value': r'$ZW_g = \langle y_{\min} + q, y_{\max} + q \rangle$', 'color': C_SUCCESS},
                {'label': 'Miejsca zerowe', 'value': 'Przesuwają się o $p$ w poziomie (jeśli $q = 0$)', 'color': C_PRIMARY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie nowej dziedziny i ZW po przekształceniu krok po kroku",
            badge=r"D_f = [-3, 4], \; ZW_f = [-1, 5], \; g(x) = f(x - 2) + 3 \implies D_g = [-1, 6], \; ZW_g = [2, 8]",
            caption="Wektor przesunięcia [p, q] dodaje p do krańców dziedziny na osi OX oraz q do krańców zbioru wartości na osi OY.",
            steps=[
                {'num': 1, 'title': 'Odczytaj wektor przesunięcia', 'desc': r'Ze wzoru $g(x) = f(x - 2) + 3$ odczytujesz: $p = 2$ oraz $q = 3$, czyli $\vec{v} = [2, 3]$.', 'color': C_SKY},
                {'num': 2, 'title': 'Przesuń dziedzinę o p = +2', 'desc': r'$D_g = [-3 + 2, 4 + 2] = [-1, 6]$. Wykres przesunął się w prawo o 2 jednostki.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Przesuń zbiór wartości o q = +3', 'desc': r'$ZW_g = [-1 + 3, 5 + 3] = [2, 8]$. Wykres powędrował w górę o 3 jednostki.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wektor', 'value': r'$\vec{v} = [2, 3]$', 'color': C_SKY},
                {'label': 'Nowa dziedzina', 'value': r'$D_g = [-1, 6]$', 'color': C_SUCCESS},
                {'label': 'Nowy ZW', 'value': r'$ZW_g = [2, 8]$', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Obejmowanie przekształceniem niewłaściwej osi w dziedzinie",
            badge=r"g(x) = f(x - 2) + 3 \implies D_g = [a + 2, b + 2] \neq [a - 2, b - 2]",
            caption="Gdy wykres przesuwa się w prawo (x - 2), każdy punkt x przesuwa się o +2! Częstym błędem jest mechaniczne odejmowanie 2 od przedziału dziedziny.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Odjęcie 2 od krańców dziedziny: $[-3 - 2, 4 - 2] = [-5, 2]$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Przesunięcie w prawo zwiększa argumenty: $x_{\text{nowe}} = x + 2$', 'color': C_SUCCESS},
                {'label': 'Zbiór wartości', 'value': 'Wartości y zmieniają się wyłącznie pod wpływem wyrazu za nawiasem (+3)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
