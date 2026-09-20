"""
topic_05.py - Dział 5: Funkcja Liniowa i Układy Równań (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_number_line, make_geometry_diagram, make_plot_diagram
)

def get_topic_05_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Wzór kierunkowy y = ax + b: rola a i b
        tab0 = make_plot_diagram(
            'Wzór kierunkowy prostej: $y = ax + b$',
            '$y = ax + b,\\quad a = \\text{współczynnik kierunkowy},\\; b = \\text{wyraz wolny}$',
            'Współczynnik $a$ decyduje o kącie nachylenia prostej, a wyraz wolny $b$ to punkt przecięcia z osią $OY$: $(0, b)$.',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [180, 240], 'to': [180, 40], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Prosta y = 0.8x + 2
                {'from': [80, 220], 'to': [420, 60], 'color': C_PRIMARY, 'strokeWidth': 3.5, 'glow': True}
            ],
            points=[
                {'x': 180, 'y': 110, 'dot': 'filled', 'color': C_SUCCESS, 'label': '(0, b) - przecięcie z OY', 'labelPosition': 'top-left'}
            ],
            metrics=[
                {'label': 'Nachylenie a', 'value': 'Stosunek przyrostu pionowego do poziomego', 'color': C_PRIMARY},
                {'label': 'Przecięcie OY', 'value': '$P = (0, b)$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'y = ax + b', 'Składniki.', labels=[{'x': 260, 'y': 130, 'text': 'a = kierunkowy, b = wyraz wolny', 'color': C_PRIMARY, 'fontSize': 17, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'y = 2x - 3', 'a = 2, b = -3', labels=[{'x': 260, 'y': 130, 'text': 'Prosta przecina OY w punkcie (0, -3)', 'color': C_SUCCESS, 'fontSize': 17, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Kolejność wyrazów', 'y = 5 - 2x ⟹ a = -2!', 'Współczynnik a stoi zawsze PRZY x, a nie na początku!', labels=[{'x': 260, 'y': 130, 'text': 'Dla y = 7 - 3x: a = -3, a NIE +7!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 2:
        # Kąt nachylenia do OX: a = tg alfa
        tab0 = make_plot_diagram(
            'Kąt nachylenia prostej do osi OX: $a = \\operatorname{tg} \\alpha$',
            '$a = \\operatorname{tg} \\alpha = \\frac{\\Delta y}{\\Delta x}$',
            'Współczynnik kierunkowy to tangens kąta, jaki prosta tworzy z dodatnią półosią $OX$.',
            segments=[
                {'from': [40, 180], 'to': [480, 180], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Prosta nachylona pod kątem 30 stopni
                {'from': [100, 220], 'to': [440, 80], 'color': C_PRIMARY, 'strokeWidth': 3},
                # Trójkąt przyrostu (Delta x, Delta y)
                {'from': [250, 180], 'to': [370, 180], 'color': C_SKY, 'strokeWidth': 2, 'label': 'Δx'},
                {'from': [370, 180], 'to': [370, 110], 'color': C_SUCCESS, 'strokeWidth': 2, 'label': 'Δy'}
            ],
            arcs=[{'cx': 195, 'cy': 180, 'r': 40, 'startAngleDeg': 0, 'endAngleDeg': 25, 'color': C_PRIMARY, 'label': 'α'}],
            metrics=[
                {'label': 'Kąt ostry', 'value': '$\\alpha < 90^\\circ \\implies a > 0$', 'color': C_SUCCESS},
                {'label': 'Kąt rozwarty', 'value': '$\\alpha > 90^\\circ \\implies a < 0$', 'color': C_DANGER},
                {'label': 'Pewniak CKE', 'value': '$\\alpha = 45^\\circ \\implies a = 1$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Tabela kątów', 'a = tg α', '30°, 45°, 60°', labels=[{'x': 260, 'y': 130, 'text': 'tg 30° = √3/3, tg 45° = 1, tg 60° = √3', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'α = 60° ⟹ a = √3', 'y = √3x + b', labels=[{'x': 260, 'y': 130, 'text': 'Współczynnik a wynosi dokładnie √3', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Kąt rozwarty', 'tg(120°) = -tg(60°) = -√3', 'Dla kątów rozwartych tangens jest UJEMNY!', labels=[{'x': 260, 'y': 130, 'text': 'Dla kąta 135° współczynnik a = -1!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 3:
        # Monotoniczność: a > 0, a < 0, a = 0
        tab0 = make_plot_diagram(
            'Monotoniczność funkcji liniowej w zależności od znaku $a$',
            '$a > 0 \\nearrow \\text{rosnąca},\\quad a < 0 \\searrow \\text{malejąca},\\quad a = 0 \\to \\text{stała}$',
            'Znak współczynnika $a$ jednoznacznie determinuje przebieg funkcji liniowej.',
            segments=[
                {'from': [40, 140], 'to': [480, 140], 'color': C_SLATE, 'strokeWidth': 1.5},
                # a > 0 (zielona)
                {'from': [60, 220], 'to': [200, 60], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'a > 0 (rosnąca)'},
                # a = 0 (złota)
                {'from': [180, 100], 'to': [340, 100], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'a = 0 (stała)'},
                # a < 0 (karmazynowa)
                {'from': [320, 60], 'to': [460, 220], 'color': C_DANGER, 'strokeWidth': 3, 'label': 'a < 0 (malejąca)'}
            ],
            metrics=[
                {'label': 'a > 0', 'value': 'Wraz ze wzrostem x rośnie y', 'color': C_SUCCESS},
                {'label': 'a < 0', 'value': 'Wraz ze wzrostem x maleje y', 'color': C_DANGER},
                {'label': 'a = 0', 'value': 'Funkcja stała $y = b$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(-4, 4, [0], [{'from': 0, 'to': None, 'fromIncluded': False, 'toIncluded': False}])
        ]
        tab2 = make_geometry_diagram('Przykład z parametrem', 'f(x) = (2m - 4)x + 1', 'Rosnąca dla 2m - 4 > 0', labels=[{'x': 260, 'y': 130, 'text': '2m > 4 ⟹ m > 2', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Nierówność ostra', 'Funkcja rosnąca to a > 0 (ostro!)', 'Nie pisz a ≥ 0, bo dla a=0 funkcja staje się stała!', labels=[{'x': 260, 'y': 130, 'text': 'Rosnąca: a > 0, Malejąca: a < 0', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (4, 5):
        # Wyraz wolny b i miejsce zerowe x_0 = -b/a
        tab0 = make_plot_diagram(
            'Kluczowe punkty prostej: Przecięcie z OY i miejsce zerowe',
            '\\text{Przecięcie z OY: } (0, b),\\quad \\text{Miejsce zerowe: } x_0 = -\\frac{b}{a}',
            'Wystarczą te dwa punkty, aby błyskawicznie i bezbłędnie narysować wykres dowolnej funkcji liniowej.',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [200, 240], 'to': [200, 40], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [80, 220], 'to': [400, 60], 'color': C_PRIMARY, 'strokeWidth': 3}
            ],
            points=[
                {'x': 200, 'y': 120, 'dot': 'filled', 'color': C_SUCCESS, 'label': '(0, b) - OY', 'labelPosition': 'top-left'},
                {'x': 300, 'y': 160, 'dot': 'filled', 'color': C_SKY, 'label': '(-b/a, 0) - OX', 'labelPosition': 'bottom'}
            ],
            metrics=[
                {'label': 'Punkt (0, b)', 'value': 'Wstawiasz $x = 0$', 'color': C_SUCCESS},
                {'label': 'Miejsce zerowe', 'value': '$ax + b = 0 \\implies x_0 = -\\frac{b}{a}$', 'color': C_SKY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'x_0 = -b/a', 'Punkt na OX.', labels=[{'x': 260, 'y': 130, 'text': 'x₀ = -b / a', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'y = 3x - 12', 'x₀ = -(-12)/3 = 4', labels=[{'x': 260, 'y': 130, 'text': 'x₀ = 4, punkt przecięcia (4, 0)', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Znak minus we wzorze', 'x₀ = -b/a (pamiętaj o minusie!)', 'Dla y = 2x + 6 miejsce zerowe to -6/2 = -3, a nie +3!', labels=[{'x': 260, 'y': 130, 'text': 'Pamiętaj o zmianie znaku: x₀ = -3', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 6:
        # Prosta przez 2 punkty A(x_A, y_A) i B(x_B, y_B)
        tab0 = make_plot_diagram(
            'Równanie prostej przechodzącej przez dwa punkty $A$ i $B$',
            '$a = \\frac{y_B - y_A}{x_B - x_A},\\quad y - y_A = a(x - x_A)$',
            'Współczynnik kierunkowy to iloraz różnicy współrzędnych $y$ do różnicy współrzędnych $x$.',
            segments=[
                {'from': [40, 180], 'to': [480, 180], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [100, 220], 'to': [420, 60], 'color': C_PRIMARY, 'strokeWidth': 3},
                # Trójkąt
                {'from': [160, 170], 'to': [340, 170], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True, 'label': 'x_B - x_A'},
                {'from': [340, 170], 'to': [340, 100], 'color': C_SUCCESS, 'strokeWidth': 1.5, 'dashed': True, 'label': 'y_B - y_A'}
            ],
            points=[
                {'x': 160, 'y': 170, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'A(x_A, y_A)', 'labelPosition': 'top-left'},
                {'x': 340, 'y': 100, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'B(x_B, y_B)', 'labelPosition': 'top-right'}
            ],
            metrics=[
                {'label': 'Wzór na a', 'value': '$a = \\frac{y_B - y_A}{x_B - x_A}$', 'color': C_PRIMARY},
                {'label': 'Wyraz b', 'value': 'Podstawiasz jeden z punktów do $y = ax+b$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'a = (y₂ - y₁) / (x₂ - x₁)', 'Klucz do 2 punktów.', labels=[{'x': 260, 'y': 130, 'text': 'a = (y_B - y_A) / (x_B - x_A)', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'A(1, 2), B(3, 8)', 'a = (8-2)/(3-1) = 3', labels=[{'x': 260, 'y': 130, 'text': 'a = 3, y = 3x - 1', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Odwrotna kolejność', 'y w liczniku, x w mianowniku!', 'Nie pomyl licznika z mianownikiem (y jest na górze)!', labels=[{'x': 260, 'y': 130, 'text': 'Zawsze: Δy / Δx (igreki na górze!)', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 7:
        # Proste równoległe: a_1 = a_2
        tab0 = make_plot_diagram(
            'Warunek równoległości prostych: $a_1 = a_2$',
            '$k \\parallel l \\iff a_1 = a_2$',
            'Dwie proste są równoległe wtedy i tylko wtedy, gdy mają IDENTYCZNY współczynnik kierunkowy $a$.',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Prosta 1
                {'from': [60, 170], 'to': [380, 50], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'k: y = 0.5x + 3'},
                # Prosta 2
                {'from': [120, 230], 'to': [440, 110], 'color': C_SKY, 'strokeWidth': 3, 'label': 'l: y = 0.5x - 1'}
            ],
            metrics=[
                {'label': 'Warunek równoległości', 'value': '$a_1 = a_2$', 'color': C_SUCCESS},
                {'label': 'Brak punktów wspólnych', 'value': 'Gdy $b_1 \\neq b_2$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Warunek', 'a₁ = a₂', 'Równy kąt nachylenia.', labels=[{'x': 260, 'y': 130, 'text': 'k ∥ l ⟺ a₁ = a₂', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'y = 4x - 5 i P(2, 3)', 'a = 4, y = 4x - 5', labels=[{'x': 260, 'y': 130, 'text': 'y = 4x + b ⟹ 3 = 4(2) + b ⟹ b = -5', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Pokrywanie się', 'Gdy b₁ = b₂ proste się pokrywają!', 'Wtedy mają nieskończenie wiele punktów wspólnych.', labels=[{'x': 260, 'y': 130, 'text': 'Równoległe rozłączne wymagają b₁ ≠ b₂!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 8:
        # Proste prostopadłe: a_1 * a_2 = -1 (odwrotny i przeciwny!)
        tab0 = make_plot_diagram(
            'Warunek prostopadłości prostych: $a_1 \\cdot a_2 = -1$',
            '$k \\perp l \\iff a_2 = -\\frac{1}{a_1}$',
            'Współczynnik prostej prostopadłej jest ODWROTNY i ze ZMIENIONYM ZNAKIEM (np. dla $a_1 = \\frac{2}{3} \\implies a_2 = -\\frac{3}{2}$).',
            segments=[
                {'from': [40, 150], 'to': [480, 150], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Prosta 1 (rosnąca)
                {'from': [100, 230], 'to': [380, 70], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'k: y = 2x + 1'},
                # Prosta 2 (prostopadła, malejąca)
                {'from': [120, 50], 'to': [360, 250], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'l: y = -0.5x + 3'}
            ],
            points=[{'x': 240, 'y': 150, 'dot': 'filled', 'color': C_PRIMARY}],
            arcs=[{'cx': 240, 'cy': 150, 'r': 24, 'startAngleDeg': 40, 'endAngleDeg': 130, 'color': C_PRIMARY, 'showRightAngleDot': True}],
            metrics=[
                {'label': 'Iloczyn współczynników', 'value': '$a_1 \\cdot a_2 = -1$', 'color': C_SUCCESS},
                {'label': 'Zasada mnemonika', 'value': 'Odwróć do góry nogami i zmień znak!', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'a₂ = -1 / a₁', 'Prostopadłość.', labels=[{'x': 260, 'y': 130, 'text': 'a₁ · a₂ = -1', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: a₁ = 3/4', 'a₂ = -4/3', 'Odwrócenie i minus.', labels=[{'x': 260, 'y': 130, 'text': 'a₂ = -4/3, prosta y = -4/3 x + b', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Brak zmiany znaku', 'Nie samo odwrócenie!', 'Częsty błąd: zamiana 2 na 1/2 zamiast -1/2!', labels=[{'x': 260, 'y': 130, 'text': 'BŁĄD: a₂ = 1/2. POPRAWNIE: a₂ = -1/2!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (9, 10, 11):
        # Przynależność punktu, parametr m, nierówności
        tab0 = make_plot_diagram(
            'Przynależność punktu do prostej: $P(x_0, y_0) \\in k$',
            '$y_0 = a \\cdot x_0 + b$',
            'Punkt leży na prostej wtedy i tylko wtedy, gdy jego współrzędne spełniają jej równanie (wstaw $x_0$ za $x$ oraz $y_0$ za $y$).',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [80, 220], 'to': [420, 60], 'color': C_PRIMARY, 'strokeWidth': 3}
            ],
            points=[
                {'x': 250, 'y': 140, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'P(x₀, y₀) leży na prostej', 'labelPosition': 'top-left'}
            ],
            metrics=[
                {'label': 'L = P', 'value': 'Punkt należy do wykresu', 'color': C_SUCCESS},
                {'label': 'L ≠ P', 'value': 'Punkt leży poza prostą', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wstawienie', 'y_P = a·x_P + b', 'Sprawdzanie.', labels=[{'x': 260, 'y': 130, 'text': 'Podstaw x i y z punktu do wzoru', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: P(2, 7), y = 3x + m', '7 = 3(2) + m ⟹ m = 1', 'Wyznaczanie m.', labels=[{'x': 260, 'y': 130, 'text': '7 = 6 + m ⟹ m = 1', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Odwrotne wstawienie', 'x to pierwsza współrzędna, y to druga!', 'Nie wstawiaj y w miejsce x!', labels=[{'x': 260, 'y': 130, 'text': 'Dla P(3, 5): x = 3, y = 5!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    else:
        # l_num in (12, 13, 14, 15): Układy równań i zadania tekstowe
        tab0 = make_plot_diagram(
            'Trzy przypadki układu równań liniowych',
            '\\text{1 rozwiązanie (oznaczony)},\\; 0 \\text{ (sprzeczny)},\\; \\infty \\text{ (nieoznaczony)}',
            'Geometrycznie: proste przecinające się (1 punkt), proste równoległe (brak punktów), proste pokrywające się (nieskończenie wiele).',
            segments=[
                {'from': [40, 140], 'to': [480, 140], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Przecinające się
                {'from': [60, 220], 'to': [180, 60], 'color': C_SUCCESS, 'strokeWidth': 2.5},
                {'from': [60, 60], 'to': [180, 220], 'color': C_SUCCESS, 'strokeWidth': 2.5},
                # Równoległe
                {'from': [230, 200], 'to': [330, 80], 'color': C_DANGER, 'strokeWidth': 2.5},
                {'from': [250, 220], 'to': [350, 100], 'color': C_DANGER, 'strokeWidth': 2.5}
            ],
            points=[{'x': 120, 'y': 140, 'dot': 'filled', 'color': C_SUCCESS, 'label': '1 punkt'}],
            labels=[
                {'x': 120, 'y': 40, 'text': 'Oznaczony', 'color': C_SUCCESS, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 290, 'y': 40, 'text': 'Sprzeczny (0)', 'color': C_DANGER, 'fontSize': 14, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Oznaczony', 'value': '$a_1 \\neq a_2$', 'color': C_SUCCESS},
                {'label': 'Sprzeczny', 'value': '$a_1 = a_2, b_1 \\neq b_2$', 'color': C_DANGER},
                {'label': 'Nieoznaczony', 'value': '$a_1 = a_2, b_1 = b_2$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Układ', 'ax + by = c', 'Metody algebraiczne.', labels=[{'x': 260, 'y': 130, 'text': 'Podstawianie lub przeciwne współczynniki', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', '2x + y = 7, x - y = 2', 'x = 3, y = 1', labels=[{'x': 260, 'y': 130, 'text': 'Dodaj stronami: 3x = 9 ⟹ x = 3, y = 1', 'color': C_SUCCESS, 'fontSize': 17, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: 0 = 5', 'Równanie sprzeczne!', 'Gdy niewiadome się redukują i dostajesz fałsz (np. 0 = 5), układ NIE MA rozwiązań.', labels=[{'x': 260, 'y': 130, 'text': '0 = 5 ⟹ układ sprzeczny, brak rozwiązań', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
