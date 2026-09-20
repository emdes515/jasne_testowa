"""
topic_01.py - Dział 1: Liczby Rzeczywiste (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_number_line, make_geometry_diagram, make_plot_diagram, make_statistics_diagram
)

def get_topic_01_visuals(l_idx, lesson_id, title):
    # l_num 1..15
    l_num = l_idx + 1

    if l_num == 1:
        # Przedziały liczbowe: domknięte vs otwarte
        tab0 = make_number_line(-3, 8, [-1, 2, 6], [{'from': 2, 'to': 6, 'fromIncluded': True, 'toIncluded': False}])
        tab1 = [
            make_number_line(-2, 7, [1, 5], [{'from': 1, 'to': 5, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(-2, 7, [0, 4], [{'from': 0, 'to': 4, 'fromIncluded': False, 'toIncluded': False}])
        ]
        tab2 = make_number_line(-4, 5, [-2, 3], [{'from': -2, 'to': 3, 'fromIncluded': True, 'toIncluded': False}])
        tab3 = make_number_line(-3, 7, [1, 5], [{'from': 1, 'to': 5, 'fromIncluded': False, 'toIncluded': True}])

    elif l_num == 2:
        # Działania na przedziałach: suma, iloczyn, różnica
        tab0 = make_number_line(-4, 8, [-2, 1, 3, 6], [
            {'from': -2, 'to': 3, 'fromIncluded': True, 'toIncluded': False, 'color': C_SKY},
            {'from': 1, 'to': 6, 'fromIncluded': True, 'toIncluded': True, 'color': C_PRIMARY}
        ])
        tab1 = [
            make_number_line(-4, 8, [-2, 6], [{'from': -2, 'to': 6, 'fromIncluded': True, 'toIncluded': True}]), # Suma
            make_number_line(-4, 8, [1, 3], [{'from': 1, 'to': 3, 'fromIncluded': True, 'toIncluded': False}])   # Iloczyn
        ]
        tab2 = make_number_line(-5, 6, [-3, 0, 2, 4], [
            {'from': -3, 'to': 2, 'fromIncluded': True, 'toIncluded': True},
            {'from': 0, 'to': 4, 'fromIncluded': False, 'toIncluded': True}
        ])
        tab3 = make_number_line(-4, 7, [-1, 2], [{'from': -1, 'to': 2, 'fromIncluded': True, 'toIncluded': False}]) # Różnica A \ B

    elif l_num == 3:
        # Potęgi o wykładniku całkowitym i ujemnym
        tab0 = make_plot_diagram(
            'Potęga o wykładniku ujemnym: Odwracanie podstawy',
            '$a^{-n} = \\left(\\frac{1}{a}\\right)^n = \\frac{1}{a^n}$',
            'Minus w wykładniku nie zmienia znaku liczby na ujemny, lecz odwraca podstawę ułamka!',
            curves=[{'path': 'M 100 240 Q 180 180 260 130 T 440 40', 'color': C_PRIMARY, 'strokeWidth': 3}],
            labels=[
                {'x': 150, 'y': 90, 'text': '2⁻¹ = 1/2', 'color': C_SKY, 'fontSize': 16, 'badge': True},
                {'x': 270, 'y': 90, 'text': '2⁻² = 1/4', 'color': C_SUCCESS, 'fontSize': 16, 'badge': True},
                {'x': 390, 'y': 90, 'text': '2⁻³ = 1/8', 'color': C_PRIMARY, 'fontSize': 16, 'badge': True}
            ],
            metrics=[
                {'label': 'Wzór odwrócenia', 'value': '$a^{-1} = \\frac{1}{a}$', 'color': C_PRIMARY},
                {'label': 'Ułamek do potęgi -n', 'value': '$\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_number_line(0, 8, [0.125, 0.25, 0.5, 1, 2, 4], [{'from': 0.125, 'to': 4, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(0, 10, [1, 3, 9], [{'from': 1, 'to': 9, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(0, 5, [0.25, 1, 4], [{'from': 0.25, 'to': 4, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(-4, 4, [-2, 0, 0.5], [{'from': 0, 'to': 0.5, 'fromIncluded': False, 'toIncluded': True}])

    elif l_num == 4:
        # Pierwiastki i potęgi o wykładniku wymiernym a^(m/n)
        tab0 = make_geometry_diagram(
            'Potęga o wykładniku ułamkowym: $a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$',
            '$a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$',
            'Mianownik $n$ staje się stopniem pierwiastka, a licznik $m$ zostaje potęgą liczby podpierwiastkowej.',
            polygons=[{'points': [[140, 70], [380, 70], [380, 200], [140, 200]], 'fill': 'rgba(255, 184, 0, 0.08)', 'stroke': C_PRIMARY, 'strokeWidth': 2}],
            labels=[
                {'x': 260, 'y': 115, 'text': 'licznik m ⟹ potęga pod pierwiastkiem', 'color': C_PRIMARY, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 260, 'y': 155, 'text': 'mianownik n ⟹ stopień pierwiastka √', 'color': C_SKY, 'fontSize': 14, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Pierwiastek kwadratowy', 'value': '$a^{\\frac{1}{2}} = \\sqrt{a}$', 'color': C_SKY},
                {'label': 'Pierwiastek sześcienny', 'value': '$a^{\\frac{1}{3}} = \\sqrt[3]{a}$', 'color': C_SUCCESS},
                {'label': 'Ułamek ujemny', 'value': '$a^{-\\frac{1}{2}} = \\frac{1}{\\sqrt{a}}$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_number_line(0, 16, [1, 4, 8, 16], [{'from': 4, 'to': 8, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(0, 27, [1, 3, 9, 27], [{'from': 3, 'to': 9, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(0, 32, [2, 4, 8, 16, 32], [{'from': 4, 'to': 16, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(0, 10, [2, 4], [{'from': 2, 'to': 4, 'fromIncluded': True, 'toIncluded': True}])

    elif l_num == 5:
        # Prawa działań na potęgach: a^m * a^n = a^(m+n), a^m / a^n = a^(m-n)
        tab0 = make_plot_diagram(
            'Mnożenie i dzielenie potęg o tej samej podstawie',
            '$a^m \\cdot a^n = a^{m+n},\\quad \\frac{a^m}{a^n} = a^{m-n}$',
            'Gdy podstawy są równe, wykładniki dodajemy przy mnożeniu i odejmujemy przy dzieleniu.',
            segments=[
                {'from': [80, 200], 'to': [440, 200], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [120, 200], 'to': [240, 100], 'color': C_SKY, 'strokeWidth': 3, 'label': '+m'},
                {'from': [240, 100], 'to': [400, 50], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': '+n'}
            ],
            labels=[{'x': 260, 'y': 160, 'text': 'Suma wykładników: m + n', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}],
            metrics=[
                {'label': 'Iloczyn potęg', 'value': '$a^m \\cdot a^n = a^{m+n}$', 'color': C_SKY},
                {'label': 'Iloraz potęg', 'value': '$a^m : a^n = a^{m-n}$', 'color': C_SUCCESS},
                {'label': 'Potęga potęgi', 'value': '$(a^m)^n = a^{m \\cdot n}$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(0, 20, [2, 4, 8, 16], [{'from': 2, 'to': 16, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(0, 20, [3, 9], [{'from': 3, 'to': 9, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(0, 32, [4, 8, 32], [{'from': 4, 'to': 32, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(0, 25, [5, 10, 25], [{'from': 5, 'to': 25, 'fromIncluded': True, 'toIncluded': True}])

    elif l_num == 6:
        # Wartość bezwzględna: interpretacja geometryczna |x - a| <= r
        tab0 = make_number_line(-4, 10, [1, 4, 7], [{'from': 1, 'to': 7, 'fromIncluded': True, 'toIncluded': True}])
        tab1 = [
            make_number_line(-5, 5, [-3, 0, 3], [{'from': -3, 'to': 3, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(-2, 10, [2, 5, 8], [{'from': 2, 'to': 8, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(-6, 8, [-2, 1, 4], [{'from': -2, 'to': 4, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(-5, 5, [-3, 3], [{'from': -3, 'to': 3, 'fromIncluded': False, 'toIncluded': False}])

    elif l_num == 7:
        # Wartość bezwzględna: nierówności z dopełnieniem |x - a| > r
        tab0 = make_number_line(-6, 10, [-2, 3, 8], [
            {'from': None, 'to': -2, 'fromIncluded': False, 'toIncluded': False},
            {'from': 8, 'to': None, 'fromIncluded': False, 'toIncluded': False}
        ])
        tab1 = [
            make_number_line(-5, 5, [-3, 3], [
                {'from': None, 'to': -3, 'fromIncluded': True, 'toIncluded': True},
                {'from': 3, 'to': None, 'fromIncluded': True, 'toIncluded': True}
            ]),
            make_number_line(-4, 8, [0, 4], [
                {'from': None, 'to': 0, 'fromIncluded': False, 'toIncluded': False},
                {'from': 4, 'to': None, 'fromIncluded': False, 'toIncluded': False}
            ])
        ]
        tab2 = make_number_line(-5, 9, [-1, 7], [
            {'from': None, 'to': -1, 'fromIncluded': True, 'toIncluded': True},
            {'from': 7, 'to': None, 'fromIncluded': True, 'toIncluded': True}
        ])
        tab3 = make_number_line(-4, 8, [1, 5], [{'from': 1, 'to': 5, 'fromIncluded': True, 'toIncluded': True}])

    elif l_num == 8:
        # Definicja logarytmu log_a b = c
        tab0 = make_geometry_diagram(
            'Definicja logarytmu: $\\log_a b = c \\iff a^c = b$',
            '$\\log_a b = c$',
            'Podstawa $a$ podniesiona do potęgi $c$ daje liczbę logarytmowaną $b$.',
            polygons=[{'points': [[120, 200], [400, 200], [260, 70]], 'fill': 'rgba(255, 184, 0, 0.08)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5}],
            segments=[
                {'from': [120, 200], 'to': [400, 200], 'color': C_SKY, 'strokeWidth': 3, 'label': 'podstawa a > 0, a ≠ 1'},
                {'from': [120, 200], 'to': [260, 70], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'wykładnik c'},
                {'from': [260, 70], 'to': [400, 200], 'color': C_DANGER, 'strokeWidth': 3, 'label': 'wynik b > 0'}
            ],
            points=[
                {'x': 120, 'y': 200, 'dot': 'filled', 'color': C_SKY, 'label': 'a (podstawa)', 'labelPosition': 'bottom-left'},
                {'x': 400, 'y': 200, 'dot': 'filled', 'color': C_DANGER, 'label': 'b (liczba > 0)', 'labelPosition': 'bottom-right'},
                {'x': 260, 'y': 70, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'c (wynik)', 'labelPosition': 'top'}
            ],
            metrics=[
                {'label': 'Warunki bazy', 'value': '$a > 0,\\; a \\neq 1$', 'color': C_SKY},
                {'label': 'Liczba logarytmowana', 'value': '$b > 0$', 'color': C_DANGER},
                {'label': 'Przykład kluczowy', 'value': '$\\log_2 8 = 3$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(0, 10, [1, 2, 4, 8], [{'from': 1, 'to': 8, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(0, 10, [1, 3, 9], [{'from': 1, 'to': 9, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(0, 16, [1, 2, 4, 8, 16], [{'from': 2, 'to': 8, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(-4, 4, [-2, 0, 2], [{'from': 0, 'to': 2, 'fromIncluded': False, 'toIncluded': True}])

    elif l_num == 9:
        # Własności logarytmów: suma i różnica logarytmów
        tab0 = make_plot_diagram(
            'Suma i różnica logarytmów: $\\log x + \\log y = \\log(x \\cdot y)$',
            '$\\log_a(x \\cdot y) = \\log_a x + \\log_a y$',
            'Logarytm zamienia trudne mnożenie liczb na proste dodawanie wykładników.',
            segments=[
                {'from': [80, 180], 'to': [220, 180], 'color': C_SKY, 'strokeWidth': 4, 'label': 'log x'},
                {'from': [220, 180], 'to': [440, 180], 'color': C_SUCCESS, 'strokeWidth': 4, 'label': 'log y'},
                {'from': [80, 220], 'to': [440, 220], 'color': C_PRIMARY, 'strokeWidth': 4, 'label': 'log(x · y)'}
            ],
            metrics=[
                {'label': 'Suma logarytmów', 'value': '$\\log_a x + \\log_a y = \\log_a(xy)$', 'color': C_PRIMARY},
                {'label': 'Różnica logarytmów', 'value': '$\\log_a x - \\log_a y = \\log_a(\\frac{x}{y})$', 'color': C_SKY},
                {'label': 'Ściąganie potęgi', 'value': '$\\log_a(x^k) = k \\cdot \\log_a x$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_number_line(0, 20, [2, 6, 12], [{'from': 2, 'to': 12, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(0, 20, [3, 9, 27], [{'from': 3, 'to': 9, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(0, 30, [4, 20, 5], [{'from': 4, 'to': 20, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(0, 10, [1, 3], [{'from': 1, 'to': 3, 'fromIncluded': True, 'toIncluded': True}])

    elif l_num == 10:
        # Procenty i punkty procentowe
        tab0 = make_statistics_diagram(
            'Procent a punkt procentowy (p.p.)',
            '$\\text{Zmiana p.p.} = p_2 - p_1$',
            'Wzrost z 20% do 25% to wzrost o 5 punktów procentowych, ale o 25% ceny!',
            bars=[
                {'x': 120, 'y': 120, 'width': 80, 'height': 110, 'fill': 'rgba(56, 189, 248, 0.4)', 'stroke': C_SKY, 'label': '20%', 'category': 'Przed'},
                {'x': 280, 'y': 80, 'width': 80, 'height': 150, 'fill': 'rgba(255, 184, 0, 0.5)', 'stroke': C_PRIMARY, 'label': '25%', 'category': 'Po'}
            ],
            segments=[{'from': [200, 120], 'to': [280, 80], 'color': C_SUCCESS, 'strokeWidth': 2, 'label': '+5 p.p.'}],
            metrics=[
                {'label': 'Różnica bezwzględna', 'value': '$25\\% - 20\\% = 5\\text{ p.p.}$', 'color': C_SUCCESS},
                {'label': 'Względna zmiana', 'value': '$\\frac{5}{20} = 25\\%$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(0, 100, [20, 25], [{'from': 20, 'to': 25, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(0, 100, [10, 15], [{'from': 10, 'to': 15, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(0, 100, [12, 18], [{'from': 12, 'to': 18, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(0, 50, [10, 20], [{'from': 10, 'to': 20, 'fromIncluded': True, 'toIncluded': True}])

    elif l_num == 11:
        # Podwyżki i obniżki wielokrotne
        tab0 = make_statistics_diagram(
            'Kolejne zmiany procentowe ceny: Mnożenie mnożników',
            '$C_{\\text{końcowa}} = C_0 \\cdot (1 - p_1) \\cdot (1 + p_2)$',
            'Obniżka o 20% a potem podwyżka o 20% NIE daje ceny początkowej! Kończysz na 96% ceny.',
            bars=[
                {'x': 80, 'y': 70, 'width': 70, 'height': 160, 'fill': 'rgba(56, 189, 248, 0.4)', 'stroke': C_SKY, 'label': '100 zł (100%)', 'category': 'Start'},
                {'x': 200, 'y': 110, 'width': 70, 'height': 120, 'fill': 'rgba(244, 63, 94, 0.4)', 'stroke': C_DANGER, 'label': '80 zł (-20%)', 'category': 'Po obniżce'},
                {'x': 320, 'y': 90, 'width': 70, 'height': 140, 'fill': 'rgba(255, 184, 0, 0.5)', 'stroke': C_PRIMARY, 'label': '96 zł (+20%)', 'category': 'Po podwyżce'}
            ],
            segments=[{'from': [40, 230], 'to': [440, 230], 'color': C_SLATE, 'strokeWidth': 1.5}],
            metrics=[
                {'label': 'Mnożnik I', 'value': '$0.80$', 'color': C_DANGER},
                {'label': 'Mnożnik II', 'value': '$1.20$', 'color': C_SUCCESS},
                {'label': 'Wynik łączny', 'value': '$0.80 \\cdot 1.20 = 0.96$ (-4%)', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(0, 120, [80, 96, 100], [{'from': 80, 'to': 100, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(0, 150, [100, 110, 121], [{'from': 100, 'to': 121, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(0, 200, [100, 80, 96], [{'from': 80, 'to': 100, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(0, 120, [96, 100], [{'from': 96, 'to': 100, 'fromIncluded': True, 'toIncluded': True}])

    elif l_num == 12:
        # Błąd bezwzględny i względny pomiaru
        tab0 = make_number_line(0, 10, [4.8, 5.0, 5.2], [{'from': 4.8, 'to': 5.2, 'fromIncluded': True, 'toIncluded': True}])
        tab1 = [
            make_number_line(0, 10, [3.9, 4.0], [{'from': 3.9, 'to': 4.0, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(0, 100, [95, 100], [{'from': 95, 'to': 100, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(0, 20, [14.7, 15.0], [{'from': 14.7, 'to': 15.0, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(0, 10, [4.8, 5.0], [{'from': 4.8, 'to': 5.0, 'fromIncluded': True, 'toIncluded': True}])

    elif l_num == 13:
        # Notacja wykładnicza: a * 10^k
        tab0 = make_geometry_diagram(
            'Notacja wykładnicza: $a \\cdot 10^k$',
            '$1 \\le a < 10,\\quad k \\in \\mathbb{C}$',
            'Zapis naukowy wymaga, aby mantysa $a$ była liczbą od 1 (włącznie) do 10 (wyłącznie).',
            polygons=[{'points': [[120, 80], [400, 80], [400, 190], [120, 190]], 'fill': 'rgba(56, 189, 248, 0.08)', 'stroke': C_SKY, 'strokeWidth': 2}],
            labels=[
                {'x': 260, 'y': 120, 'text': '350 000 = 3.5 · 10⁵', 'color': C_PRIMARY, 'fontSize': 18, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 260, 'y': 160, 'text': '0.00042 = 4.2 · 10⁻⁴', 'color': C_SUCCESS, 'fontSize': 18, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Przedział mantysy', 'value': '$a \\in \\langle 1, 10)$', 'color': C_SKY},
                {'label': 'Rząd wielkości', 'value': '$k \\in \\mathbb{Z}$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(1, 10, [1, 3.5, 9.9], [{'from': 1, 'to': 10, 'fromIncluded': True, 'toIncluded': False}]),
            make_number_line(-6, 6, [-4, 0, 5], [{'from': -4, 'to': 5, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(1, 10, [1, 4.2], [{'from': 1, 'to': 4.2, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(0, 15, [0.35, 1, 3.5, 35], [{'from': 1, 'to': 10, 'fromIncluded': True, 'toIncluded': False}])

    elif l_num == 14:
        # Cechy podzielności i liczby pierwsze
        tab0 = make_geometry_diagram(
            'Cechy podzielności liczb całkowitych',
            '$n = 3k,\\quad n = 3k + 1,\\quad n = 3k + 2$',
            'Każdą liczbę całkowitą można zapisać w postaci reszty z dzielenia przez daną liczbę.',
            polygons=[
                {'points': [[80, 70], [190, 70], [190, 180], [80, 180]], 'fill': 'rgba(16, 185, 129, 0.1)', 'stroke': C_SUCCESS},
                {'points': [[210, 70], [320, 70], [320, 180], [210, 180]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY},
                {'points': [[340, 70], [450, 70], [450, 180], [340, 180]], 'fill': 'rgba(255, 184, 0, 0.1)', 'stroke': C_PRIMARY}
            ],
            labels=[
                {'x': 135, 'y': 125, 'text': 'r = 0 (3k)', 'color': C_SUCCESS, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 265, 'y': 125, 'text': 'r = 1 (3k+1)', 'color': C_SKY, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 395, 'y': 125, 'text': 'r = 2 (3k+2)', 'color': C_PRIMARY, 'fontSize': 14, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Podzielność przez 3', 'value': 'Suma cyfr podzielna przez 3', 'color': C_SUCCESS},
                {'label': 'Podzielność przez 4', 'value': '2 ostatnie cyfry podzielne przez 4', 'color': C_SKY},
                {'label': 'Podzielność przez 9', 'value': 'Suma cyfr podzielna przez 9', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(0, 15, [0, 3, 6, 9, 12], [{'from': 0, 'to': 12, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(0, 15, [0, 5, 10, 15], [{'from': 0, 'to': 15, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(0, 20, [3, 6, 9, 12, 15, 18], [{'from': 3, 'to': 18, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(0, 10, [1, 2, 3, 5, 7], [{'from': 2, 'to': 7, 'fromIncluded': True, 'toIncluded': True}])

    else:
        # l_num == 15: Dowodzenie podzielności i parzystości
        tab0 = make_geometry_diagram(
            'Dowodzenie algebraiczne podzielności: Zapis $k \\cdot M$',
            '$n^3 - n = (n-1)n(n+1) = 6k$',
            'Iloczyn trzech kolejnych liczb całkowitych jest zawsze podzielny przez 6 (przez 2 i przez 3).',
            polygons=[{'points': [[100, 80], [420, 80], [420, 180], [100, 180]], 'fill': 'rgba(192, 132, 252, 0.08)', 'stroke': C_PURPLE, 'strokeWidth': 2}],
            labels=[
                {'x': 260, 'y': 115, 'text': '(n - 1) · n · (n + 1)', 'color': C_PRIMARY, 'fontSize': 18, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 260, 'y': 155, 'text': 'co najmniej jedna parzysta i jedna podzielna przez 3 ⟹ podzielna przez 6', 'color': C_SUCCESS, 'fontSize': 12, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Liczba parzysta', 'value': '$2k$', 'color': C_SKY},
                {'label': 'Liczba nieparzysta', 'value': '$2k + 1$', 'color': C_PRIMARY},
                {'label': 'Wniosek dowodu', 'value': 'Wspólny czynnik przed nawias', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_number_line(0, 12, [0, 6, 12], [{'from': 0, 'to': 12, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(0, 12, [1, 3, 5, 7, 9, 11], [{'from': 1, 'to': 11, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_number_line(0, 15, [0, 5, 10, 15], [{'from': 0, 'to': 15, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_number_line(0, 10, [2, 4, 6, 8], [{'from': 2, 'to': 8, 'fromIncluded': True, 'toIncluded': True}])

    return tab0, tab1, tab2, tab3
