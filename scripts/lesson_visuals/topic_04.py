"""
topic_04.py - Dział 4: Własności Funkcji i Odczytywanie Wykresów (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_number_line, make_geometry_diagram, make_plot_diagram
)

def get_topic_04_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Pojęcie funkcji: Każdemu x przyporządkowany dokładnie jeden y
        tab0 = make_geometry_diagram(
            'Definicja funkcji: Przyporządkowanie jednoznaczne',
            '$f: X \\to Y,\\quad x \\mapsto y = f(x)$',
            'Każdy argument ze zbioru $X$ ma dokładnie jeden przypisany element w $Y$. Jednemu $x$ nie mogą odpowiadać dwa $y$!',
            polygons=[
                {'points': [[80, 60], [180, 60], [180, 220], [80, 220]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[320, 60], [420, 60], [420, 220], [320, 220]], 'fill': 'rgba(16, 185, 129, 0.1)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            segments=[
                {'from': [150, 90], 'to': [350, 110], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [150, 140], 'to': [350, 170], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [150, 190], 'to': [350, 110], 'color': C_PRIMARY, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 130, 'y': 45, 'text': 'Dziedzina X', 'color': C_SKY, 'fontSize': 15, 'anchor': 'middle'},
                {'x': 370, 'y': 45, 'text': 'Przeciwdziedzina Y', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Test pionowej prostej', 'value': 'Pionowa prosta może przeciąć wykres max w 1 punkcie', 'color': C_PRIMARY},
                {'label': 'Wartość funkcji', 'value': '$y = f(x)$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Graf', 'X ⟹ Y', 'Jednoznaczność.', labels=[{'x': 260, 'y': 130, 'text': 'Każdy x ma dokładnie 1 wartość y', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'f(2) = 3(2) - 1 = 5', 'Obliczanie wartości dla x=2.', labels=[{'x': 260, 'y': 130, 'text': 'Dla x=2 wartość y wynosi 5', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Okrąg to NIE funkcja!', 'Okrąg przecina pionowa prosta w 2 punktach', 'Okrąg nie jest wykresem funkcji jednej zmiennej y=f(x)!', labels=[{'x': 260, 'y': 130, 'text': 'Pionowa linia przecina okrąg dwa razy ⟹ to nie funkcja!', 'color': C_DANGER, 'fontSize': 14, 'anchor': 'middle'}])

    elif l_num in (2, 3):
        # Dziedzina ze wzoru: mianownik ≠ 0 oraz pierwiastek ≥ 0
        tab0 = make_number_line(-4, 6, [0, 3], [{'from': 3, 'to': None, 'fromIncluded': True, 'toIncluded': False}])
        tab1 = [
            make_number_line(-4, 4, [2], [{'from': None, 'to': 2, 'fromIncluded': False, 'toIncluded': False}, {'from': 2, 'to': None, 'fromIncluded': False, 'toIncluded': False}]),
            make_number_line(-2, 6, [1], [{'from': 1, 'to': None, 'fromIncluded': True, 'toIncluded': False}])
        ]
        tab2 = make_number_line(-5, 5, [-2], [{'from': -2, 'to': None, 'fromIncluded': True, 'toIncluded': False}])
        tab3 = make_number_line(-4, 4, [0], [{'from': 0, 'to': None, 'fromIncluded': False, 'toIncluded': False}])

    elif l_num == 4:
        # Odczytywanie dziedziny Df i zbioru wartości ZWf z wykresu
        tab0 = make_plot_diagram(
            'Odczytywanie dziedziny $D_f$ i zbioru wartości $ZW_f$',
            '$D_f = \\langle -4, 5 \\rangle,\\quad ZW_f = \\langle -2, 3 \\rangle$',
            'Rzut wykresu na oś $OX$ (poziomo) wyznacza dziedzinę $D_f$, a rzut na oś $OY$ (pionowo) wyznacza zbiór wartości $ZW_f$.',
            segments=[
                {'from': [40, 155], 'to': [480, 155], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [250, 250], 'to': [250, 30], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Podświetlenie Df na OX
                {'from': [110, 155], 'to': [430, 155], 'color': C_SKY, 'strokeWidth': 4.5},
                # Podświetlenie ZWf na OY
                {'from': [250, 220], 'to': [250, 60], 'color': C_SUCCESS, 'strokeWidth': 4.5}
            ],
            curves=[{'path': 'M 110 220 C 140 100, 170 60, 200 60 C 240 60, 280 220, 310 220 C 350 220, 390 60, 430 60', 'color': C_PRIMARY, 'strokeWidth': 3.5, 'glow': True}],
            points=[
                {'x': 110, 'y': 220, 'dot': 'filled', 'color': C_PRIMARY, 'label': '(-4, -2)', 'labelPosition': 'bottom-left'},
                {'x': 430, 'y': 60, 'dot': 'filled', 'color': C_PRIMARY, 'label': '(5, 3)', 'labelPosition': 'top-right'}
            ],
            metrics=[
                {'label': 'Dziedzina (OX)', 'value': '$D_f = \\langle -4, 5 \\rangle$', 'color': C_SKY},
                {'label': 'Zbiór wartości (OY)', 'value': '$ZW_f = \\langle -2, 3 \\rangle$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_number_line(-5, 6, [-4, 5], [{'from': -4, 'to': 5, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(-4, 4, [-2, 3], [{'from': -2, 'to': 3, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(-3, 7, [-1, 6], [{'from': -1, 'to': 6, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(-4, 5, [-3, 4], [{'from': -3, 'to': 4, 'fromIncluded': False, 'toIncluded': True}])

    elif l_num in (5, 6):
        # Miejsca zerowe i rozwiązywanie f(x) = c
        tab0 = make_plot_diagram(
            'Miejsca zerowe oraz równanie $f(x) = c$',
            '$f(x) = 0 \\implies (x_0, 0),\\quad f(x) = c \\implies \\text{przecięcie z poziomą } y=c$',
            'Miejsca zerowe to punkty na osi $OX$. Rozwiązanie $f(x)=c$ to współrzędne $x$ przecięć wykresu z poziomą prostą $y=c$.',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Prosta pozioma y = c
                {'from': [40, 90], 'to': [480, 90], 'color': C_PURPLE, 'strokeWidth': 2, 'dashed': True, 'label': 'y = c'}
            ],
            curves=[{'path': 'M 80 230 Q 220 -20 360 230', 'color': C_PRIMARY, 'strokeWidth': 3}],
            points=[
                {'x': 130, 'y': 160, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x₁ (m. zerowe)', 'labelPosition': 'bottom-left'},
                {'x': 310, 'y': 160, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x₂ (m. zerowe)', 'labelPosition': 'bottom-right'},
                {'x': 170, 'y': 90, 'dot': 'filled', 'color': C_PURPLE, 'label': 'f(x)=c', 'labelPosition': 'top-left'},
                {'x': 270, 'y': 90, 'dot': 'filled', 'color': C_PURPLE, 'label': 'f(x)=c', 'labelPosition': 'top-right'}
            ],
            metrics=[
                {'label': 'Miejsca zerowe', 'value': '$x_1, x_2$', 'color': C_SUCCESS},
                {'label': 'Liczba rozwiązań f(x)=c', 'value': 'Liczba punktów przecięcia z prostą $y=c$', 'color': C_PURPLE}
            ]
        )
        tab1 = [
            make_number_line(-4, 5, [-1, 3], [{'from': -1, 'to': 3, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'f(x) = 2x - 6 = 0', 'x = 3', labels=[{'x': 260, 'y': 130, 'text': '2x = 6 ⟹ x = 3 (miejsce zerowe)', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka: Miejsce zerowe to LICZBA', 'x = 3, a NIE punkt (3, 0)', 'W pytaniu o miejsce zerowe podajemy wyłącznie liczbę x!', labels=[{'x': 260, 'y': 130, 'text': 'Odp: x = 3 (punkt (3, 0) to punkt przecięcia z OX)', 'color': C_PRIMARY, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (7, 8, 9):
        # Monotoniczność, wartości dodatnie/ujemne, ekstrema
        tab0 = make_plot_diagram(
            'Przedziały monotoniczności i znaki funkcji',
            '\\text{rosnąca } \\nearrow,\\; \\text{malejąca } \\searrow,\\; f(x) > 0 \\text{ nad osią}',
            'Przedziały monotoniczności zawsze podajemy jako przedziały argumentów $x$ (z osi $OX$).',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Strzałki monotoniczności
                {'from': [120, 200], 'to': [230, 90], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'rosnąca ↗'},
                {'from': [250, 90], 'to': [380, 220], 'color': C_DANGER, 'strokeWidth': 3, 'label': 'malejąca ↘'}
            ],
            curves=[{'path': 'M 90 220 Q 240 40 390 230', 'color': C_PRIMARY, 'strokeWidth': 3}],
            points=[
                {'x': 240, 'y': 80, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'Maksimum y_max = 3 dla x = 2', 'labelPosition': 'top'}
            ],
            metrics=[
                {'label': 'Rosnąca w', 'value': '$\\langle -3, 2 \\rangle$', 'color': C_SUCCESS},
                {'label': 'Malejąca w', 'value': '$\\langle 2, 5 \\rangle$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_number_line(-4, 6, [-3, 2], [{'from': -3, 'to': 2, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(-4, 6, [2, 5], [{'from': 2, 'to': 5, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_geometry_diagram('Pułapka CKE: Łączenie przedziałów sumą ∪', 'Przedziały monotoniczności rozdzielaj przecinkiem!', 'Nie łącz przedziałów monotoniczności symbolem sumy ∪!', labels=[{'x': 260, 'y': 130, 'text': 'Pisz: rosnąca w <-3, 1> oraz w <3, 5>, a NIE <-3,1> ∪ <3,5>!', 'color': C_DANGER, 'fontSize': 14, 'anchor': 'middle'}])

    elif l_num in (10, 11, 12):
        # Przekształcenia wykresów: przesunięcie o wektor [p, q]
        tab0 = make_plot_diagram(
            'Przesunięcie wykresu o wektor $\\vec{v} = [p, q]$',
            '$y = f(x - p) + q$',
            'Minus pod funkcją $x - p$ przesuwa w PRAWO, plus w LEWO. Liczba $q$ za funkcją przesuwa w PIONIE (+ w górę, - w dół).',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [200, 240], 'to': [200, 40], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Wektor przesunięcia
                {'from': [200, 160], 'to': [300, 100], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'v = [p, q]'}
            ],
            curves=[
                {'path': 'M 140 220 Q 200 100 260 220', 'color': C_SLATE, 'strokeWidth': 2, 'dashed': True},
                {'path': 'M 240 160 Q 300 40 360 160', 'color': C_PRIMARY, 'strokeWidth': 3.5}
            ],
            points=[
                {'x': 200, 'y': 100, 'dot': 'filled', 'color': C_SLATE, 'label': 'W_0(0,0)'},
                {'x': 300, 'y': 40, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'W_1(p, q)'}
            ],
            metrics=[
                {'label': 'x - p', 'value': 'Przesunięcie o p w prawo', 'color': C_SUCCESS},
                {'label': 'x + p', 'value': 'Przesunięcie o p w lewo', 'color': C_SKY},
                {'label': '+ q', 'value': 'Przesunięcie o q w górę', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wektor', 'y = f(x - p) + q', 'Kierunki.', labels=[{'x': 260, 'y': 130, 'text': 'f(x-3) + 2 ⟹ 3 w prawo, 2 w górę', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'f(x) = (x + 4)² - 1', 'Wektor [-4, -1]', labels=[{'x': 260, 'y': 130, 'text': 'Wierzchołek przesunięty do punktu (-4, -1)', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Znak pod funkcją', 'f(x + 2) to w LEWO!', 'Dodawanie pod nawiasem przesuwa w lewo (w stronę ujemną)!', labels=[{'x': 260, 'y': 130, 'text': 'BŁĄD: f(x+2) ⟹ 2 w prawo (BŁĄD!)', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 13:
        # Symetria względem OX (-f(x)) i OY (f(-x))
        tab0 = make_plot_diagram(
            'Symetria wykresu: Oś OX vs Oś OY',
            '$y = -f(x) \\text{ (odbicie w OX)},\\quad y = f(-x) \\text{ (odbicie w OY)}$',
            'Minus przed całą funkcją wywraca wykres do góry nogami (OX). Minus przy samym $x$ odbija lewo-prawo (OY).',
            segments=[
                {'from': [40, 140], 'to': [480, 140], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [250, 240], 'to': [250, 30], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            curves=[
                {'path': 'M 100 80 Q 250 140 400 40', 'color': C_SKY, 'strokeWidth': 2.5, 'label': 'y = f(x)'},
                {'path': 'M 100 200 Q 250 140 400 240', 'color': C_DANGER, 'strokeWidth': 2.5, 'dashed': True, 'label': 'y = -f(x)'}
            ],
            metrics=[
                {'label': 'Odbicie w OX', 'value': '$y = -f(x)$ (pionowe)', 'color': C_DANGER},
                {'label': 'Odbicie w OY', 'value': '$y = f(-x)$ (poziome)', 'color': C_SKY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzory odbić', 'y = -f(x)', 'Odbicie w OX.', labels=[{'x': 260, 'y': 130, 'text': 'Wartości y zmieniają znak na przeciwny', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'A(2, 5) po odbiciu w OX', 'A\'(2, -5)', labels=[{'x': 260, 'y': 130, 'text': 'Punkt (2, 5) przechodzi w (2, -5)', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Odbicie w OY', 'f(-x) zmienia znak x!', 'Przy odbiciu w OY y pozostaje bez zmian, a x zmienia znak.', labels=[{'x': 260, 'y': 130, 'text': '(2, 5) po odbiciu w OY to (-2, 5)', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 14:
        # Funkcja wykładnicza y = a^x
        tab0 = make_plot_diagram(
            'Funkcja wykładnicza: $y = a^x$',
            '$f(x) = a^x,\\quad a > 0,\\; a \\neq 1$',
            'Dla $a > 1$ funkcja jest rosnąca. Zawsze przecina oś $OY$ w punkcie $(0, 1)$ i ma poziomą asymptotę $y = 0$.',
            segments=[
                {'from': [40, 200], 'to': [480, 200], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [180, 250], 'to': [180, 30], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Asymptota pozioma y = 0
                {'from': [40, 200], 'to': [480, 200], 'color': C_DANGER, 'strokeWidth': 2, 'dashed': True}
            ],
            curves=[{'path': 'M 60 198 Q 180 190 280 40', 'color': C_PRIMARY, 'strokeWidth': 3.5, 'glow': True}],
            points=[
                {'x': 180, 'y': 160, 'dot': 'filled', 'color': C_SUCCESS, 'label': '(0, 1)', 'labelPosition': 'top-left'}
            ],
            metrics=[
                {'label': 'Punkt stały', 'value': '$(0, 1)$ bo $a^0 = 1$', 'color': C_SUCCESS},
                {'label': 'Zbiór wartości', 'value': '$ZW_f = (0, \\infty)$', 'color': C_PRIMARY},
                {'label': 'Asymptota', 'value': 'Pozioma $y = 0$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_number_line(0, 8, [0.5, 1, 2, 4], [{'from': 0, 'to': 8, 'fromIncluded': False, 'toIncluded': False}])
        ]
        tab2 = make_geometry_diagram('Przykład: 2^x = 16', 'x = 4', 'Równanie wykładnicze.', labels=[{'x': 260, 'y': 130, 'text': '2^x = 2⁴ ⟹ x = 4', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Wartości ujemne', 'a^x > 0 ZAWSZE!', 'Potęga liczby dodatniej nigdy nie da liczby ujemnej ani zera!', labels=[{'x': 260, 'y': 130, 'text': '2^x = -4 NIE MA ROZWIĄZAŃ!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    else:
        # l_num == 15: Proporcjonalność odwrotna y = a/x
        tab0 = make_plot_diagram(
            'Proporcjonalność odwrotna: Hiperbola $y = \\frac{a}{x}$',
            '$f(x) = \\frac{a}{x},\\quad D_f = \\mathbb{R} \\setminus \\{0\\}$',
            'Wykres składa się z dwóch symetrycznych gałęzi hiperboli w I i III ćwiartce (dla $a > 0$). Posiada asymptotę pionową $x=0$ i poziomą $y=0$.',
            segments=[
                {'from': [40, 140], 'to': [480, 140], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [250, 240], 'to': [250, 30], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            curves=[
                {'path': 'M 260 40 Q 270 120 440 130', 'color': C_PRIMARY, 'strokeWidth': 3},
                {'path': 'M 60 150 Q 230 160 240 240', 'color': C_PRIMARY, 'strokeWidth': 3}
            ],
            points=[
                {'x': 320, 'y': 70, 'dot': 'filled', 'color': C_SUCCESS, 'label': '(1, a)'}
            ],
            metrics=[
                {'label': 'Iloczyn stały', 'value': '$x \\cdot y = a$', 'color': C_PRIMARY},
                {'label': 'Dziedzina', 'value': '$\\mathbb{R} \\setminus \\{0\\}$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_number_line(-4, 4, [0], [{'from': None, 'to': 0, 'fromIncluded': False, 'toIncluded': False}, {'from': 0, 'to': None, 'fromIncluded': False, 'toIncluded': False}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'y = 6/x, x = 2 ⟹ y = 3', 'Krok po kroku.', labels=[{'x': 260, 'y': 130, 'text': '2 · 3 = 6 (stały iloczyn a = 6)', 'color': C_SUCCESS, 'fontSize': 17, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: x = 0', 'Dzielenie przez 0!', 'Hiperbola nigdy nie przecina osi OY ani OX!', labels=[{'x': 260, 'y': 130, 'text': 'f(0) nie istnieje!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
