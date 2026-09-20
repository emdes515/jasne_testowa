"""
topic_02.py - Dział 2: Wyrażenia Algebraiczne i Wielomiany (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_number_line, make_geometry_diagram, make_plot_diagram
)

def get_topic_02_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Kwadrat sumy: (a+b)^2 = a^2 + 2ab + b^2 (Geometryczny podział kwadratu)
        tab0 = make_geometry_diagram(
            'Geometryczny sens kwadratu sumy: $(a+b)^2 = a^2 + 2ab + b^2$',
            '$(a+b)^2 = a^2 + 2ab + b^2$',
            'Kwadrat o boku $(a+b)$ składa się z dwóch kwadratów ($a^2, b^2$) oraz dwóch prostokątów ($ab$).',
            polygons=[
                {'points': [[120, 60], [280, 60], [280, 220], [120, 220]], 'fill': 'rgba(255, 184, 0, 0.15)', 'stroke': C_PRIMARY, 'strokeWidth': 2},
                {'points': [[280, 60], [360, 60], [360, 220], [280, 220]], 'fill': 'rgba(56, 189, 248, 0.12)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[120, 220], [280, 220], [280, 260], [120, 260]], 'fill': 'rgba(56, 189, 248, 0.12)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[280, 220], [360, 220], [360, 260], [280, 260]], 'fill': 'rgba(16, 185, 129, 0.18)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 200, 'y': 140, 'text': 'a²', 'color': C_PRIMARY, 'fontSize': 18, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 320, 'y': 140, 'text': 'a·b', 'color': C_SKY, 'fontSize': 15, 'anchor': 'middle'},
                {'x': 200, 'y': 240, 'text': 'a·b', 'color': C_SKY, 'fontSize': 15, 'anchor': 'middle'},
                {'x': 320, 'y': 240, 'text': 'b²', 'color': C_SUCCESS, 'fontSize': 16, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Pole I', 'value': '$a^2$', 'color': C_PRIMARY},
                {'label': 'Dwa prostokąty', 'value': '$2ab$', 'color': C_SKY},
                {'label': 'Pole II', 'value': '$b^2$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Kwadrat sumy', '$(a+b)^2$', 'Rozwinięcie kwadratu sumy.', polygons=[{'points': [[150, 70], [310, 70], [310, 210], [150, 210]], 'fill': 'rgba(255,184,0,0.1)', 'stroke': C_PRIMARY}]),
            make_geometry_diagram('Podwojony iloczyn', '$2ab$', 'Pamiętaj o podwojonym iloczynie!', labels=[{'x': 260, 'y': 130, 'text': '2 · a · b', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: (2x + 3)²', '4x² + 12x + 9', 'Krok po kroku.', labels=[{'x': 260, 'y': 130, 'text': '(2x)² + 2(2x)(3) + 3² = 4x² + 12x + 9', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE', '(a+b)² ≠ a² + b²', 'Brak środkowego wyrazu 2ab to najczęstszy błąd!', labels=[{'x': 260, 'y': 100, 'text': 'BŁĄD: (x+3)² = x² + 9', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}, {'x': 260, 'y': 150, 'text': 'POPRAWNIE: x² + 6x + 9', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 2:
        # Kwadrat różnicy: (a-b)^2 = a^2 - 2ab + b^2
        tab0 = make_geometry_diagram(
            'Kwadrat różnicy: $(a-b)^2 = a^2 - 2ab + b^2$',
            '$(a-b)^2 = a^2 - 2ab + b^2$',
            'Od kwadratu $a^2$ odejmujemy dwa prostokąty $ab$, ale dwukrotnie odjęty narożnik $b^2$ musimy dodać!',
            polygons=[
                {'points': [[120, 60], [280, 60], [280, 220], [120, 220]], 'fill': 'rgba(244, 63, 94, 0.12)', 'stroke': C_DANGER, 'strokeWidth': 2},
                {'points': [[280, 60], [360, 60], [360, 220], [280, 220]], 'fill': 'rgba(100, 116, 139, 0.1)', 'stroke': C_SLATE, 'strokeWidth': 1, 'dashed': True},
                {'points': [[120, 220], [280, 220], [280, 260], [120, 260]], 'fill': 'rgba(100, 116, 139, 0.1)', 'stroke': C_SLATE, 'strokeWidth': 1, 'dashed': True}
            ],
            labels=[{'x': 200, 'y': 140, 'text': '(a - b)²', 'color': C_DANGER, 'fontSize': 18, 'fontWeight': 'bold', 'anchor': 'middle'}],
            metrics=[
                {'label': 'Odejmujemy', 'value': '$-2ab$', 'color': C_DANGER},
                {'label': 'Dodajemy narożnik', 'value': '$+b^2$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', '$(a-b)^2$', 'Rozpisanie różnicy.', labels=[{'x': 260, 'y': 130, 'text': 'a² - 2ab + b²', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: (3x - 5)²', '9x² - 30x + 25', 'Krok po kroku.', labels=[{'x': 260, 'y': 130, 'text': '9x² - 30x + 25', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Znak przed b²', '(-b)² = +b²', 'Ostatni wyraz ZAWSZE ma znak plus (+b²)!', labels=[{'x': 260, 'y': 130, 'text': 'BŁĄD: (x - 4)² = x² - 8x - 16', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 3:
        # Różnica kwadratów: a^2 - b^2 = (a-b)(a+b)
        tab0 = make_geometry_diagram(
            'Różnica kwadratów: $a^2 - b^2 = (a-b)(a+b)$',
            '$a^2 - b^2 = (a-b)(a+b)$',
            'Z kwadratu $a^2$ wycinamy mniejszy narożnik $b^2$. Pozostałą figurę w kształcie litery L rozcinamy i składamy w prostokąt o bokach $(a-b)$ i $(a+b)$.',
            polygons=[
                {'points': [[120, 60], [320, 60], [320, 220], [200, 220], [200, 140], [120, 140]], 'fill': 'rgba(56, 189, 248, 0.15)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[120, 140], [200, 140], [200, 220], [120, 220]], 'fill': 'rgba(244, 63, 94, 0.1)', 'stroke': C_DANGER, 'strokeWidth': 1.5, 'dashed': True}
            ],
            labels=[
                {'x': 240, 'y': 130, 'text': 'a² - b²', 'color': C_SKY, 'fontSize': 18, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 160, 'y': 180, 'text': 'wycięte b²', 'color': C_DANGER, 'fontSize': 13, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Iloczyn czynników', 'value': '$(a-b)(a+b)$', 'color': C_PRIMARY},
                {'label': 'Szybkie liczenie', 'value': '$101^2 - 99^2 = (101-99)(101+99) = 400$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', '$a^2 - b^2$', 'Iloczyn sumy i różnicy.', labels=[{'x': 260, 'y': 130, 'text': '(a - b)(a + b)', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: 16x² - 49', '(4x - 7)(4x + 7)', 'Rozkład.', labels=[{'x': 260, 'y': 130, 'text': '(4x)² - 7² = (4x - 7)(4x + 7)', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: a² + b²', 'a² + b² ≠ (a+b)²', 'Suma kwadratów w liczbach rzeczywistych NIE rozkłada się!', labels=[{'x': 260, 'y': 130, 'text': 'x² + 9 NIE rozkłada się na (x+3)(x-3)!', 'color': C_DANGER, 'fontSize': 14, 'anchor': 'middle'}])

    elif l_num in (4, 5):
        # Sześcian sumy / różnicy i suma/różnica sześcianów
        tab0 = make_geometry_diagram(
            'Sześciany wyrażeń: Trzeci wymiar algebry',
            '$(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$',
            'Sześcian sumy to objętość sześcianu o boku $(a+b)$ podzielonego na 8 mniejszych brył.',
            polygons=[
                {'points': [[160, 100], [280, 100], [280, 220], [160, 220]], 'fill': 'rgba(255, 184, 0, 0.15)', 'stroke': C_PRIMARY, 'strokeWidth': 2},
                {'points': [[280, 100], [340, 60], [340, 180], [280, 220]], 'fill': 'rgba(56, 189, 248, 0.15)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[160, 100], [220, 60], [340, 60], [280, 100]], 'fill': 'rgba(16, 185, 129, 0.15)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[{'x': 220, 'y': 160, 'text': 'a³ + 3a²b + 3ab² + b³', 'color': C_PRIMARY, 'fontSize': 15, 'fontWeight': 'bold', 'anchor': 'middle'}],
            metrics=[
                {'label': 'Sześcian sumy', 'value': '$(a+b)^3$', 'color': C_PRIMARY},
                {'label': 'Różnica sześcianów', 'value': '$a^3 - b^3 = (a-b)(a^2+ab+b^2)$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', '$(a \\pm b)^3$', 'Wzory sześcienne.', labels=[{'x': 260, 'y': 130, 'text': 'a³ ± 3a²b + 3ab² ± b³', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: (x + 2)³', 'x³ + 6x² + 12x + 8', 'Krok po kroku.', labels=[{'x': 260, 'y': 130, 'text': 'x³ + 3(x²)(2) + 3(x)(4) + 8 = x³ + 6x² + 12x + 8', 'color': C_SUCCESS, 'fontSize': 14, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Współczynniki 3', 'Nie zapomnij o trójkach!', 'W sześcianie współczynniki to 1, 3, 3, 1.', labels=[{'x': 260, 'y': 130, 'text': 'BŁĄD: (x+2)³ = x³ + 8', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (6, 7):
        # Wyłączanie wspólnego czynnika przed nawias
        tab0 = make_geometry_diagram(
            'Wyłączanie wspólnego czynnika: Odwrócenie rozdzielności',
            '$ab + ac = a(b + c)$',
            'Szukamy największego wspólnego dzielnika liczb oraz najniższej potęgi występującej zmiennej.',
            polygons=[
                {'points': [[100, 80], [240, 80], [240, 200], [100, 200]], 'fill': 'rgba(56, 189, 248, 0.12)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[240, 80], [420, 80], [420, 200], [240, 200]], 'fill': 'rgba(16, 185, 129, 0.12)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 170, 'y': 140, 'text': 'a · b', 'color': C_SKY, 'fontSize': 16, 'anchor': 'middle'},
                {'x': 330, 'y': 140, 'text': 'a · c', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'},
                {'x': 260, 'y': 230, 'text': 'Wspólny bok a ⟹ a(b + c)', 'color': C_PRIMARY, 'fontSize': 15, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Wspólny czynnik', 'value': '$a$', 'color': C_PRIMARY},
                {'label': 'W nawiasie', 'value': '$b + c$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Jednomiany', '6x³ - 9x²', '3x²(2x - 3)', labels=[{'x': 260, 'y': 130, 'text': '3x²(2x - 3)', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład nawiasowy', '(x-1) przed nawias', 'Grupowanie.', labels=[{'x': 260, 'y': 130, 'text': 'x²(x-1) - 4(x-1) = (x-1)(x²-4)', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka: Zostaje 1!', 'a - ab = a(1 - b)', 'Gdy wyłączasz cały wyraz, w nawiasie zostaje 1, a NIE 0!', labels=[{'x': 260, 'y': 130, 'text': 'BŁĄD: 5x - 10x² = 5x(-2x)', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (8, 9, 10, 11, 12):
        # Wielomiany: grupowanie, stopień, pierwiastki, równość wielomianów
        tab0 = make_plot_diagram(
            'Wielomiany: Postać iloczynowa i pierwiastki',
            '$W(x) = a(x - x_1)(x - x_2)(x - x_3)$',
            'Każdy nawias $(x - x_0)$ wyznacza miejsce zerowe wielomianu na osi $OX$.',
            segments=[
                {'from': [40, 140], 'to': [480, 140], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [250, 240], 'to': [250, 30], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            curves=[{'path': 'M 60 220 C 120 40, 180 40, 220 140 C 260 240, 320 240, 380 140 C 420 60, 450 40, 480 30', 'color': C_PRIMARY, 'strokeWidth': 3, 'glow': True}],
            points=[
                {'x': 150, 'y': 140, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x₁', 'labelPosition': 'bottom'},
                {'x': 280, 'y': 140, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x₂', 'labelPosition': 'bottom'},
                {'x': 390, 'y': 140, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x₃', 'labelPosition': 'bottom'}
            ],
            metrics=[
                {'label': 'Stopień wielomianu', 'value': 'Najwyższa potęga x', 'color': C_PRIMARY},
                {'label': 'Wyraz wolny', 'value': '$W(0) = c$', 'color': C_SKY},
                {'label': 'Równość wielomianów', 'value': 'Współczynniki muszą być równe', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_number_line(-4, 6, [-2, 1, 4], [{'from': -2, 'to': 4, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_geometry_diagram('Przykład: Grupowanie', 'x³ - 3x² - 4x + 12', 'Rozkład na 3 czynniki.', labels=[{'x': 260, 'y': 130, 'text': '(x - 3)(x - 2)(x + 2)', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Zmiana znaku', 'x - 3 = 0 ⟹ x = +3', 'Pierwiastek ma znak przeciwny do liczby w nawiasie!', labels=[{'x': 260, 'y': 130, 'text': 'Dla (x + 5) pierwiastek to x = -5!', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 13:
        # Schemat Hornera / dzielenie wielomianu
        tab0 = make_geometry_diagram(
            'Schemat Hornera: Dzielenie przez $(x - c)$',
            '$W(x) = Q(x)(x - c) + R$',
            'Błyskawiczny algorytm obliczania ilorazu wielomianu i reszty z dzielenia.',
            polygons=[{'points': [[100, 70], [420, 70], [420, 190], [100, 190]], 'fill': 'rgba(192, 132, 252, 0.08)', 'stroke': C_PURPLE, 'strokeWidth': 2}],
            labels=[
                {'x': 140, 'y': 110, 'text': 'c', 'color': C_PRIMARY, 'fontSize': 16, 'fontWeight': 'bold'},
                {'x': 220, 'y': 110, 'text': 'aₙ', 'color': C_TEXT, 'fontSize': 14},
                {'x': 290, 'y': 110, 'text': 'aₙ₋₁', 'color': C_TEXT, 'fontSize': 14},
                {'x': 360, 'y': 110, 'text': 'a₀', 'color': C_TEXT, 'fontSize': 14},
                {'x': 260, 'y': 160, 'text': 'Iloczyn z c + dodanie kolejnego współczynnika', 'color': C_SUCCESS, 'fontSize': 13, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Pierwiastek', 'value': '$W(c) = 0$', 'color': C_SUCCESS},
                {'label': 'Reszta', 'value': '$R = W(c)$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(-3, 5, [2], [{'from': 2, 'to': 2, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_geometry_diagram('Przykład Hornera', 'Dzielenie przez (x-2)', 'Wynik bez reszty.', labels=[{'x': 260, 'y': 130, 'text': 'x² + 3x - 4, R = 0', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Brakujący stopień!', 'Uzupełnij zerem!', 'Jeśli w wielomianie brakuje np. x², w tabeli Hornera wpisujesz 0!', labels=[{'x': 260, 'y': 130, 'text': 'Dla x³ - 5 wpisz współczynniki: 1, 0, 0, -5!', 'color': C_DANGER, 'fontSize': 14, 'anchor': 'middle'}])

    elif l_num == 14:
        # Wyrażenia wymierne: dziedzina i ułamki
        tab0 = make_number_line(-6, 6, [-3, 2], [
            {'from': None, 'to': -3, 'fromIncluded': False, 'toIncluded': False},
            {'from': -3, 'to': 2, 'fromIncluded': False, 'toIncluded': False},
            {'from': 2, 'to': None, 'fromIncluded': False, 'toIncluded': False}
        ])
        tab1 = [
            make_number_line(-4, 4, [0], [{'from': None, 'to': 0, 'fromIncluded': False, 'toIncluded': False}, {'from': 0, 'to': None, 'fromIncluded': False, 'toIncluded': False}]),
            make_number_line(-5, 5, [-2, 2], [{'from': None, 'to': -2, 'fromIncluded': False, 'toIncluded': False}, {'from': 2, 'to': None, 'fromIncluded': False, 'toIncluded': False}])
        ]
        tab2 = make_number_line(-5, 7, [-1, 4], [{'from': None, 'to': -1, 'fromIncluded': False, 'toIncluded': False}, {'from': -1, 'to': 4, 'fromIncluded': False, 'toIncluded': False}, {'from': 4, 'to': None, 'fromIncluded': False, 'toIncluded': False}])
        tab3 = make_number_line(-3, 3, [1], [{'from': 1, 'to': 1, 'fromIncluded': False, 'toIncluded': False}])

    else:
        # l_num == 15: Dowodzenie algebraiczne: zwijanie do kwadratu (x-y)^2 >= 0
        tab0 = make_geometry_diagram(
            'Dowodzenie algebraiczne: Zwijanie do kwadratu',
            '$(x - y)^2 \\ge 0 \\iff x^2 + y^2 \\ge 2xy$',
            'Kwadrat dowolnej liczby rzeczywistej jest zawsze nieujemny. Zwijając wyrażenie do $(...)^2$ dowodzimy nierówności.',
            polygons=[{'points': [[120, 80], [400, 80], [400, 190], [120, 190]], 'fill': 'rgba(16, 185, 129, 0.08)', 'stroke': C_SUCCESS, 'strokeWidth': 2}],
            labels=[
                {'x': 260, 'y': 120, 'text': '(a - b)² ≥ 0 dla każdego a, b ∈ ℝ', 'color': C_SUCCESS, 'fontSize': 16, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 260, 'y': 160, 'text': 'Wniosek: a² + b² ≥ 2ab (nierówność średnich)', 'color': C_PRIMARY, 'fontSize': 15, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Pewnik', 'value': '$(wyrażenie)^2 \\ge 0$', 'color': C_SUCCESS},
                {'label': 'Koniec dowodu', 'value': 'co kończy dowód (c.k.d.)', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Zwijanie', 'x² - 4x + 4 ≥ 0', '(x - 2)² ≥ 0', labels=[{'x': 260, 'y': 130, 'text': '(x - 2)² ≥ 0', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład dowodu', 'Pokaż, że a² + 1 ≥ 2a', 'Odejmij 2a od obu stron.', labels=[{'x': 260, 'y': 130, 'text': 'a² - 2a + 1 = (a - 1)² ≥ 0, c.k.d.', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Dowód w tył', 'Zacznij od tezy z zastrzeżeniem równoważności!', 'Najbezpieczniej przekształcać tezę równoważnie do oczywistej prawdy.', labels=[{'x': 260, 'y': 130, 'text': 'Pamiętaj o komentarzu: kwadrat jest zawsze ≥ 0!', 'color': C_PRIMARY, 'fontSize': 14, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
