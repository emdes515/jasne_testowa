"""
topic_03.py - Dział 3: Równania i Nierówności (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_number_line, make_geometry_diagram, make_plot_diagram
)

def get_topic_03_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num in (1, 2):
        # Równania liniowe: waga szalkowa, redukcja, mnożenie przez mianownik
        tab0 = make_geometry_diagram(
            'Równanie liniowe jako waga szalkowa w równowadze',
            '$ax + b = c \\iff ax = c - b$',
            'To co robisz z lewą stroną równania, musisz dokładnie tak samo zrobić z prawą (obustronne odejmowanie/dzielenie).',
            polygons=[
                {'points': [[240, 60], [260, 60], [250, 200]], 'fill': C_SLATE, 'stroke': C_SLATE},
                {'points': [[100, 110], [400, 110]], 'stroke': C_PRIMARY, 'strokeWidth': 4},
                {'points': [[100, 110], [140, 170], [60, 170]], 'fill': 'rgba(56, 189, 248, 0.2)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[400, 110], [440, 170], [360, 170]], 'fill': 'rgba(16, 185, 129, 0.2)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 100, 'y': 155, 'text': 'ax + b', 'color': C_SKY, 'fontSize': 16, 'anchor': 'middle'},
                {'x': 400, 'y': 155, 'text': 'c', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'},
                {'x': 250, 'y': 230, 'text': 'Równowaga stron', 'color': C_PRIMARY, 'fontSize': 14, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'I krok', 'value': 'Niewiadome na lewo, liczby na prawo', 'color': C_SKY},
                {'label': 'II krok', 'value': 'Dzielenie przez współczynnik przy x', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_number_line(-2, 6, [3], [{'from': 3, 'to': 3, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_geometry_diagram('Przykład', '3x - 5 = 10', '3x = 15 ⟹ x = 5', labels=[{'x': 260, 'y': 130, 'text': '3x = 15 ⟹ x = 5', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Zmiana znaku', 'Przenosisz? Zmień znak!', 'Gdy przenosisz liczbę przez znak równości, ZAWSZE zmieniasz jej znak!', labels=[{'x': 260, 'y': 130, 'text': '2x + 7 = 3 ⟹ 2x = 3 - 7 = -4', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (3, 4):
        # Nierówności liniowe: zmiana zwrotu przy dzieleniu przez ujemną
        tab0 = make_number_line(-5, 5, [2], [{'from': 2, 'to': None, 'fromIncluded': False, 'toIncluded': False}])
        tab1 = [
            make_number_line(-4, 4, [-1], [{'from': None, 'to': -1, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(-3, 7, [1, 5], [{'from': 1, 'to': 5, 'fromIncluded': True, 'toIncluded': False}])
        ]
        tab2 = make_number_line(-6, 4, [-2], [{'from': -2, 'to': None, 'fromIncluded': True, 'toIncluded': False}])
        tab3 = make_number_line(-5, 5, [-3], [{'from': None, 'to': -3, 'fromIncluded': False, 'toIncluded': False}])

    elif l_num in (5, 6, 7):
        # Układy równań: interpretacja geometryczna (przecięcie prostych)
        tab0 = make_plot_diagram(
            'Układ równań liniowych: Punkt przecięcia prostych',
            '$\\begin{cases} y = a_1 x + b_1 \\\\ y = a_2 x + b_2 \\end{cases} \\implies P(x_0, y_0)$',
            'Rozwiązaniem układu jest para liczb $(x_0, y_0)$ odpowiadająca współrzędnym punktu przecięcia dwóch prostych.',
            segments=[
                {'from': [40, 150], 'to': [480, 150], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [200, 240], 'to': [200, 30], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Prosta 1 (rosnąca)
                {'from': [80, 230], 'to': [440, 50], 'color': C_SKY, 'strokeWidth': 2.5, 'label': 'k: y = 0.5x + 1'},
                # Prosta 2 (malejąca)
                {'from': [100, 40], 'to': [420, 220], 'color': C_PRIMARY, 'strokeWidth': 2.5, 'label': 'l: y = -x + 4'}
            ],
            points=[
                {'x': 280, 'y': 130, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'P(2, 2) - rozwiązanie', 'labelPosition': 'top-right'}
            ],
            metrics=[
                {'label': '1 rozwiązanie', 'value': 'Proste przecinają się ($a_1 \\neq a_2$)', 'color': C_SUCCESS},
                {'label': 'Brak rozwiązań', 'value': 'Równoległe rozłączne ($a_1 = a_2, b_1 \\neq b_2$)', 'color': C_DANGER},
                {'label': 'Nieskończenie wiele', 'value': 'Proste pokrywają się', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Metody', 'Podstawianie vs Przeciwne współczynniki', 'Wybierz szybszą metodę.', labels=[{'x': 260, 'y': 130, 'text': 'Wyznacz x lub pomnóż przez liczbę przeciwną', 'color': C_PRIMARY, 'fontSize': 15, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'x + y = 6, x - y = 2', 'x = 4, y = 2', labels=[{'x': 260, 'y': 130, 'text': 'Dodaj stronami: 2x = 8 ⟹ x = 4, y = 2', 'color': C_SUCCESS, 'fontSize': 17, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Zapis wyniku', 'Rozwiązanie to para liczb!', 'Wynik zapisuj w klamrze {x=..., y=...} lub jako punkt (x, y).', labels=[{'x': 260, 'y': 130, 'text': 'Nie zapomnij obliczyć drugiej niewiadomej!', 'color': C_PRIMARY, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (8, 9, 10):
        # Równania kwadratowe: postać iloczynowa, niepełne i wyróżnik Delta
        tab0 = make_plot_diagram(
            'Równanie kwadratowe: Pierwiastki jako przecięcia z osią OX',
            '$ax^2 + bx + c = 0,\\quad \\Delta = b^2 - 4ac$',
            'Wyróżnik $\\Delta$ decyduje o liczbie pierwiastków: $\\Delta > 0$ (dwa), $\\Delta = 0$ (jeden), $\\Delta < 0$ (brak).',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            curves=[{'path': 'M 100 60 Q 260 260 420 60', 'color': C_PRIMARY, 'strokeWidth': 3.5, 'glow': True}],
            points=[
                {'x': 160, 'y': 160, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x₁', 'labelPosition': 'top-left'},
                {'x': 360, 'y': 160, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x₂', 'labelPosition': 'top-right'},
                {'x': 260, 'y': 210, 'dot': 'filled', 'color': C_SKY, 'label': 'W(p, q)', 'labelPosition': 'bottom'}
            ],
            metrics=[
                {'label': 'Delta > 0', 'value': 'Dwa pierwiastki: $x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$', 'color': C_SUCCESS},
                {'label': 'Delta = 0', 'value': 'Jeden pierwiastek podwójny: $x_0 = -\\frac{b}{2a}$', 'color': C_PRIMARY},
                {'label': 'Delta < 0', 'value': 'Brak rozwiązań w $\\mathbb{R}$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór na Deltę', '$\\Delta = b^2 - 4ac$', 'Kluczowy wyróżnik.', labels=[{'x': 260, 'y': 130, 'text': 'Δ = b² - 4ac', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'x² - 5x + 6 = 0', 'x₁ = 2, x₂ = 3', labels=[{'x': 260, 'y': 130, 'text': 'Δ = 25 - 24 = 1, x₁ = 2, x₂ = 3', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Mianownik 2a', 'W mianowniku jest 2a, a NIE samo a!', 'Częsty błąd pod presją czasu na maturze.', labels=[{'x': 260, 'y': 130, 'text': 'Pamiętaj: dzielisz przez 2a!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (11, 12):
        # Nierówności kwadratowe: szkic paraboli i odczyt znaków
        tab0 = make_plot_diagram(
            'Nierówność kwadratowa: Szkic paraboli i odczyt przedziału',
            '$ax^2 + bx + c > 0 \\iff x \\in (-\\infty, x_1) \\cup (x_2, \\infty)$',
            'Dla $a > 0$ ramiona idą w górę. Wartości $> 0$ leżą NAD osią $OX$, a wartości $< 0$ POD osią $OX$.',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Podświetlenie przedziału na osi
                {'from': [40, 160], 'to': [160, 160], 'color': C_SUCCESS, 'strokeWidth': 4},
                {'from': [360, 160], 'to': [480, 160], 'color': C_SUCCESS, 'strokeWidth': 4}
            ],
            curves=[{'path': 'M 100 60 Q 260 260 420 60', 'color': C_PRIMARY, 'strokeWidth': 3}],
            points=[
                {'x': 160, 'y': 160, 'dot': 'hollow', 'color': C_SUCCESS, 'label': 'x₁', 'labelPosition': 'bottom-left'},
                {'x': 360, 'y': 160, 'dot': 'hollow', 'color': C_SUCCESS, 'label': 'x₂', 'labelPosition': 'bottom-right'}
            ],
            labels=[
                {'x': 100, 'y': 110, 'text': 'f(x) > 0', 'color': C_SUCCESS, 'fontSize': 14},
                {'x': 400, 'y': 110, 'text': 'f(x) > 0', 'color': C_SUCCESS, 'fontSize': 14},
                {'x': 260, 'y': 220, 'text': 'f(x) < 0', 'color': C_DANGER, 'fontSize': 14, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'a > 0 (uśmiech)', 'value': 'Ramiona w górę', 'color': C_PRIMARY},
                {'label': 'Nierówność > 0', 'value': 'Przedziały zewnętrzne', 'color': C_SUCCESS},
                {'label': 'Nierówność < 0', 'value': 'Przedział wewnętrzny $(x_1, x_2)$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_number_line(-5, 5, [-2, 3], [
                {'from': None, 'to': -2, 'fromIncluded': False, 'toIncluded': False},
                {'from': 3, 'to': None, 'fromIncluded': False, 'toIncluded': False}
            ])
        ]
        tab2 = make_number_line(-4, 6, [1, 4], [{'from': 1, 'to': 4, 'fromIncluded': True, 'toIncluded': True}])
        tab3 = make_plot_diagram(
            'Pułapka: Delta < 0', 'Brak miejsc zerowych ≠ brak rozwiązań!', 'Parabola wisi nad osią. Dla >0 rozwiązaniem jest całe R, a dla <0 zbiór pusty!',
            segments=[{'from': [40, 180], 'to': [480, 180], 'color': C_SLATE, 'strokeWidth': 1.5}],
            curves=[{'path': 'M 120 70 Q 260 140 400 70', 'color': C_PRIMARY, 'strokeWidth': 3}],
            labels=[{'x': 260, 'y': 110, 'text': 'Cały wykres nad osią OX (f(x) > 0 dla każdego x)', 'color': C_SUCCESS, 'fontSize': 14, 'anchor': 'middle'}]
        )

    elif l_num == 13:
        # Równania wyższych stopni: rozkład na czynniki
        tab0 = make_plot_diagram(
            'Równanie wielomianowe: Rozkład na czynniki stopnia 1 i 2',
            '$x(x - 2)(x^2 + 4) = 0 \\iff x = 0 \\lor x = 2$',
            'Iloczyn jest równy zero, gdy co najmniej jeden z czynników jest zerem. Czynniki nierozkładalne ($x^2 + 4 > 0$) odrzucamy.',
            segments=[{'from': [40, 140], 'to': [480, 140], 'color': C_SLATE, 'strokeWidth': 1.5}],
            curves=[{'path': 'M 100 230 C 160 50, 240 50, 300 140 C 340 210, 400 210, 440 60', 'color': C_PRIMARY, 'strokeWidth': 3}],
            points=[
                {'x': 180, 'y': 140, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x = 0', 'labelPosition': 'bottom-left'},
                {'x': 300, 'y': 140, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x = 2', 'labelPosition': 'bottom-right'}
            ],
            metrics=[
                {'label': 'Zasada iloczynu', 'value': '$A \\cdot B = 0 \\iff A=0 \\lor B=0$', 'color': C_PRIMARY},
                {'label': 'Czynnik x² + a > 0', 'value': 'Nigdy nie jest zerem dla $a > 0$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_number_line(-3, 5, [0, 2], [{'from': 0, 'to': 2, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'x³ - 9x = 0', 'x(x-3)(x+3) = 0', labels=[{'x': 260, 'y': 130, 'text': 'x = 0  lub  x = 3  lub  x = -3', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Dzielenie przez x', 'NIGDY nie dziel przez x!', 'Dzieląc obie strony przez x, bezpowrotnie gubisz rozwiązanie x = 0!', labels=[{'x': 260, 'y': 130, 'text': 'BŁĄD: x³ = 4x ⟹ x² = 4 (zgubione x=0!)', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 14:
        # Równania wymierne: dziedzina i mnożenie na krzyż
        tab0 = make_geometry_diagram(
            'Równanie wymierne: Mnożenie na krzyż i warunek dziedziny',
            '$\\frac{A}{B} = \\frac{C}{D} \\iff A \\cdot D = B \\cdot C,\\quad B \\neq 0,\\; D \\neq 0$',
            'Przed jakimikolwiek przekształceniami musisz wyznaczyć dziedzinę ($mianownik \\neq 0$) i sprawdzić czy wynik nie jest pierwiastkiem obcym!',
            polygons=[{'points': [[120, 70], [400, 70], [400, 190], [120, 190]], 'fill': 'rgba(56, 189, 248, 0.08)', 'stroke': C_SKY, 'strokeWidth': 2}],
            segments=[
                {'from': [160, 100], 'to': [360, 160], 'color': C_PRIMARY, 'strokeWidth': 2.5, 'label': 'A · D'},
                {'from': [160, 160], 'to': [360, 100], 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': 'B · C'}
            ],
            labels=[
                {'x': 160, 'y': 90, 'text': 'A', 'color': C_PRIMARY, 'fontSize': 18, 'fontWeight': 'bold'},
                {'x': 160, 'y': 170, 'text': 'B ≠ 0', 'color': C_DANGER, 'fontSize': 14, 'fontWeight': 'bold'},
                {'x': 360, 'y': 90, 'text': 'C', 'color': C_SUCCESS, 'fontSize': 18, 'fontWeight': 'bold'},
                {'x': 360, 'y': 170, 'text': 'D ≠ 0', 'color': C_DANGER, 'fontSize': 14, 'fontWeight': 'bold'}
            ],
            metrics=[
                {'label': 'Warunek I', 'value': 'Dziedzina $D = \\mathbb{R} \\setminus \\{miejsca\\;zerowe\\;mianownika\\}$', 'color': C_DANGER},
                {'label': 'Warunek II', 'value': 'Mnożenie na krzyż', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(-4, 4, [1], [{'from': None, 'to': 1, 'fromIncluded': False, 'toIncluded': False}, {'from': 1, 'to': None, 'fromIncluded': False, 'toIncluded': False}])
        ]
        tab2 = make_geometry_diagram('Przykład', '(2x+1)/(x-3) = 5', '2x+1 = 5x - 15 ⟹ x = 16/3 ∈ D', labels=[{'x': 260, 'y': 130, 'text': 'x = 16/3 należy do D, więc to poprawne rozwiązanie', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Pierwiastek obcy', 'Rozwiązanie wypada z dziedziny!', 'Gdy otrzymany x zeruje mianownik, równanie NIE MA rozwiązań!', labels=[{'x': 260, 'y': 130, 'text': 'x = 3 zeruje mianownik ⟹ odrzucasz ten wynik!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    else:
        # l_num == 15: Równania i nierówności z wartością bezwzględną
        tab0 = make_number_line(-6, 8, [1], [
            {'from': -3, 'to': 5, 'fromIncluded': True, 'toIncluded': True}
        ])
        tab1 = [
            make_number_line(-5, 5, [-4, 4], [{'from': -4, 'to': 4, 'fromIncluded': True, 'toIncluded': True}]),
            make_number_line(-6, 6, [-2, 2], [
                {'from': None, 'to': -2, 'fromIncluded': False, 'toIncluded': False},
                {'from': 2, 'to': None, 'fromIncluded': False, 'toIncluded': False}
            ])
        ]
        tab2 = make_number_line(-4, 8, [2], [{'from': -1, 'to': 5, 'fromIncluded': False, 'toIncluded': False}])
        tab3 = make_number_line(-5, 5, [0], [{'from': 0, 'to': 0, 'fromIncluded': True, 'toIncluded': True}])

    return tab0, tab1, tab2, tab3
