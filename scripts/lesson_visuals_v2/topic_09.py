"""
topic_09.py - Dział 1.9: Odczytywanie informacji z wykresu funkcji (4 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram
)

def get_topic_09_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.9.1: Odczyt dziedziny D (oś OX) i zbioru wartości ZW (oś OY)
        tab0 = make_plot_diagram(
            title='Odczyt dziedziny D (oś pozioma OX) i zbioru wartości ZW (oś pionowa OY)',
            badge='D_f \\subset OX,\\quad ZW_f \\subset OY',
            caption='Dziedzinę odczytujemy "od lewej do prawej" na osi OX (rzut poziomy). Zbiór wartości odczytujemy "od dołu do góry" na osi OY (rzut pionowy). Kółko zamalowane = nawias domknięty \\langle \\rangle, otwarte = okrągły ( ).',
            curves=[
                {'path': 'M 100 180 Q 180 80 260 140 T 400 60', 'color': C_PRIMARY, 'strokeWidth': 3}
            ],
            segments=[
                {'from': [50, 150], 'to': [450, 150], 'color': C_SLATE, 'strokeWidth': 2}, # Oś OX
                {'from': [180, 20], 'to': [180, 240], 'color': C_SLATE, 'strokeWidth': 2}, # Oś OY
                {'from': [100, 180], 'to': [100, 150], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [400, 60], 'to': [400, 150], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [100, 180], 'to': [180, 180], 'color': C_SUCCESS, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [400, 60], 'to': [180, 60], 'color': C_SUCCESS, 'strokeWidth': 1.5, 'dashed': True}
            ],
            points=[
                {'x': 100, 'y': 180, 'color': C_PRIMARY, 'label': 'A(-4, -1)'},
                {'x': 400, 'y': 60, 'color': C_PRIMARY, 'label': 'B(5, 3)'}
            ],
            labels=[
                {'x': 250, 'y': 175, 'text': 'DZIEDZINA D (rzut na OX): ⟨-4, 5⟩', 'color': C_SKY, 'fontSize': 13, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 260, 'y': 35, 'text': 'ZBIÓR WARTOŚCI ZW (rzut na OY): ⟨-1, 3⟩', 'color': C_SUCCESS, 'fontSize': 13, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Dziedzina $D$', 'value': 'Oś pozioma $OX$ (od lewej do prawej)', 'color': C_SKY},
                {'label': 'Zbiór wartości $ZW$', 'value': 'Oś pionowa $OY$ (od dołu do góry)', 'color': C_SUCCESS},
                {'label': 'Punkty brzegowe', 'value': 'Zamalowane = domknięte, puste = otwarte', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.9.2: Odczyt miejsc zerowych f(x) = 0 oraz punktu przecięcia z osią OY
        tab0 = make_plot_diagram(
            title='Miejsca zerowe i punkt przecięcia z osią OY',
            badge='f(x) = 0 \\iff (x, 0) \\in OX,\\quad (0, b) = (0, f(0)) \\in OY',
            caption='Miejsce zerowe to punkt na poziomej osi OX, gdzie wykres ją przecina. Punkt (0, f(0)) to punkt na pionowej osi OY.',
            curves=[
                {'path': 'M 80 60 Q 200 240 320 60', 'color': C_PRIMARY, 'strokeWidth': 2.5}
            ],
            segments=[
                {'from': [50, 150], 'to': [450, 150], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [200, 30], 'to': [200, 240], 'color': C_SLATE, 'strokeWidth': 2}
            ],
            points=[
                {'x': 130, 'y': 150, 'color': C_SUCCESS, 'label': 'x₁ = -2'},
                {'x': 270, 'y': 150, 'color': C_SUCCESS, 'label': 'x₂ = 4'},
                {'x': 200, 'y': 200, 'color': C_SKY, 'label': '(0, -3)'}
            ],
            labels=[
                {'x': 130, 'y': 130, 'text': 'Miejsce zerowe: -2', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 270, 'y': 130, 'text': 'Miejsce zerowe: 4', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 260, 'y': 225, 'text': 'Przecięcie z OY: f(0) = -3', 'color': C_SKY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Miejsca zerowe', 'value': 'Wypisujesz same $x$: $x = -2, x = 4$', 'color': C_SUCCESS},
                {'label': 'Przecięcie z $OY$', 'value': 'Zawsze dla $x = 0$: punkt $(0, f(0))$', 'color': C_SKY},
                {'label': 'Puste kółko na $OX$', 'value': 'NIE jest miejscem zerowym!', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.9.3: Odczytywanie przedziałów monotoniczności (gdzie rośnie, gdzie maleje)
        tab0 = make_plot_diagram(
            title='Monotoniczność funkcji: Idziemy "pod górkę" i "z górki"',
            badge='f \\nearrow \\iff x_1 < x_2 \\implies f(x_1) < f(x_2)',
            caption='Monotoniczność śledzimy ZAWSZE od lewej do prawej! "Pod górkę" oznacza rosnącą, "z górki" malejącą. Przedziały monotoniczności podajemy DLA ARGUMENTÓW X na osi OX!',
            curves=[
                {'path': 'M 80 180 L 180 80 L 320 220 L 420 220', 'color': C_PRIMARY, 'strokeWidth': 3}
            ],
            segments=[
                {'from': [40, 150], 'to': [460, 150], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [80, 180], 'to': [80, 150], 'color': C_MUTED, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [180, 80], 'to': [180, 150], 'color': C_MUTED, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [320, 220], 'to': [320, 150], 'color': C_MUTED, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [420, 220], 'to': [420, 150], 'color': C_MUTED, 'strokeWidth': 1.5, 'dashed': True}
            ],
            labels=[
                {'x': 130, 'y': 110, 'text': 'ROŚNIE (⟨-4, -1⟩)', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 250, 'y': 135, 'text': 'MALEJE (⟨-1, 3⟩)', 'color': C_DANGER, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 370, 'y': 200, 'text': 'STAŁA (⟨3, 6⟩)', 'color': C_SKY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Przedziały', 'value': 'Podajemy ZAWSZE dla osi poziomej $OX$!', 'color': C_PRIMARY},
                {'label': 'Kierunek analizy', 'value': 'Od lewej do prawej strony wykresu', 'color': C_SUCCESS},
                {'label': 'Częsty błąd', 'value': 'Podanie wartości $y$ zamiast argumentów $x$', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 4:
        # L1.9.4: Liczba rozwiązań równania f(x) = m (przecinanie poziomą prostą y = m)
        tab0 = make_plot_diagram(
            title='Liczba rozwiązań równania f(x) = m: Pozioma prosta',
            badge='f(x) = m \\iff \\text{Punkty wspólne wykresu } f \\text{ i prostej } y = m',
            caption='Aby ustalić ile rozwiązań ma równanie f(x) = m, kładziemy linijkę POZIOMO na wysokości y = m i liczymy ile razy linijka przetnie wykres.',
            curves=[
                {'path': 'M 80 80 Q 180 240 280 80 T 420 220', 'color': C_PRIMARY, 'strokeWidth': 2.5}
            ],
            segments=[
                {'from': [40, 150], 'to': [460, 150], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [40, 110], 'to': [460, 110], 'color': C_SUCCESS, 'strokeWidth': 2, 'label': 'y = 2 (3 punkty)'}
            ],
            points=[
                {'x': 105, 'y': 110, 'color': C_SUCCESS},
                {'x': 255, 'y': 110, 'color': C_SUCCESS},
                {'x': 350, 'y': 110, 'color': C_SUCCESS}
            ],
            labels=[
                {'x': 250, 'y': 85, 'text': 'Prosta pozioma y = 2 przecina wykres w 3 punktach', 'color': C_SUCCESS, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 250, 'y': 180, 'text': 'Równanie f(x) = 2 ma DOKŁADNIE 3 ROZWIĄZANIA', 'color': C_TEXT, 'fontSize': 13, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Prosta $y = m$', 'value': 'Zawsze POZIOMA (stała wysokość)', 'color': C_SUCCESS},
                {'label': 'Liczba rozwiązań', 'value': 'Liczba punktów przecięcia wykresu z tą prostą', 'color': C_PRIMARY},
                {'label': 'Puste kółko', 'value': 'NIE tworzy rozwiązania!', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
