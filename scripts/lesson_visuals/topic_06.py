"""
topic_06.py - Dział 6: Funkcja Kwadratowa (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_number_line, make_geometry_diagram, make_plot_diagram
)

def get_topic_06_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Postać ogólna y = ax^2 + bx + c i kierunek ramion (a>0 vs a<0)
        tab0 = make_plot_diagram(
            'Postać ogólna paraboli: Znak współczynnika $a$',
            '$f(x) = ax^2 + bx + c,\\quad a > 0 \\text{ (ramiona w górę)},\\; a < 0 \\text{ (w dół)}$',
            'Gdy $a > 0$, parabola ma uśmiechnięte ramiona w górę i minimum. Gdy $a < 0$, ramiona idą w dół (smutna) i mamy maksimum.',
            segments=[{'from': [40, 140], 'to': [480, 140], 'color': C_SLATE, 'strokeWidth': 1.5}],
            curves=[
                {'path': 'M 80 60 Q 180 220 280 60', 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'a > 0 (uśmiech)'},
                {'path': 'M 260 220 Q 360 60 460 220', 'color': C_DANGER, 'strokeWidth': 3, 'label': 'a < 0 (smutna)'}
            ],
            points=[
                {'x': 180, 'y': 220, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'Minimum', 'labelPosition': 'bottom'},
                {'x': 360, 'y': 60, 'dot': 'filled', 'color': C_DANGER, 'label': 'Maksimum', 'labelPosition': 'top'}
            ],
            metrics=[
                {'label': 'a > 0', 'value': 'Ramiona w górę, wierzchołek to minimum', 'color': C_SUCCESS},
                {'label': 'a < 0', 'value': 'Ramiona w dół, wierzchołek to maksimum', 'color': C_DANGER},
                {'label': 'Wyraz wolny c', 'value': 'Punkt przecięcia z OY to $(0, c)$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'f(x) = ax² + bx + c', 'Trójmian.', labels=[{'x': 260, 'y': 130, 'text': 'a ≠ 0 (warunek kwadratowości)', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'f(x) = -2x² + 4x + 1', 'a = -2 < 0, ramiona w dół', labels=[{'x': 260, 'y': 130, 'text': 'Maksimum w wierzchołku, przecięcie OY w (0, 1)', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: a = 0', 'Dla a = 0 to funkcja liniowa!', 'Funkcja kwadratowa wymaga a ≠ 0.', labels=[{'x': 260, 'y': 130, 'text': 'Gdy parametr zeruje a, stopień spada do 1!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 2:
        # Wyróżnik Delta i 3 przypadki liczby miejsc zerowych
        tab0 = make_plot_diagram(
            'Trzy przypadki wyróżnika $\\Delta = b^2 - 4ac$',
            '\\Delta > 0 \\implies 2\\text{ m. zerowe},\\quad \\Delta = 0 \\implies 1,\\quad \\Delta < 0 \\implies 0',
            'Geometryczna interpretacja delty: przecięcie w 2 punktach, styczność w 1 punkcie lub brak kontaktu z osią $OX$.',
            segments=[{'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5}],
            curves=[
                {'path': 'M 60 80 Q 140 240 220 80', 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': 'Δ > 0 (2 punkty)'},
                {'path': 'M 200 80 Q 280 160 360 80', 'color': C_PRIMARY, 'strokeWidth': 2.5, 'label': 'Δ = 0 (styczna)'},
                {'path': 'M 340 60 Q 420 110 500 60', 'color': C_SKY, 'strokeWidth': 2.5, 'label': 'Δ < 0 (wisi nad osią)'}
            ],
            points=[
                {'x': 95, 'y': 160, 'dot': 'filled', 'color': C_SUCCESS},
                {'x': 185, 'y': 160, 'dot': 'filled', 'color': C_SUCCESS},
                {'x': 280, 'y': 160, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'x₀', 'labelPosition': 'bottom'}
            ],
            metrics=[
                {'label': 'Δ > 0', 'value': '2 miejsca zerowe', 'color': C_SUCCESS},
                {'label': 'Δ = 0', 'value': '1 miejsce zerowe (styczność)', 'color': C_PRIMARY},
                {'label': 'Δ < 0', 'value': 'Brak miejsc zerowych', 'color': C_SKY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór na Deltę', '$\\Delta = b^2 - 4ac$', 'Klucz kwadratówki.', labels=[{'x': 260, 'y': 130, 'text': 'Δ = b² - 4ac', 'color': C_PRIMARY, 'fontSize': 22, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'x² - 6x + 9 = 0', 'Δ = 36 - 36 = 0', labels=[{'x': 260, 'y': 130, 'text': 'Δ = 0 ⟹ 1 rozwiązanie: x₀ = 3', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: (-b)² zawsze dodatnie', '(-3)² = +9, a NIE -9!', 'Kwadrat współczynnika b pod pierwiastkiem delty ZAWSZE jest dodatni!', labels=[{'x': 260, 'y': 130, 'text': 'BŁĄD: b = -4 ⟹ b² = -16 (BŁĄD!)', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (3, 4):
        # Miejsca zerowe i wierzchołek p = -b/2a, q = -Delta/4a
        tab0 = make_plot_diagram(
            'Współrzędne wierzchołka paraboli $W(p, q)$ i oś symetrii',
            '$p = -\\frac{b}{2a} = \\frac{x_1 + x_2}{2},\\quad q = -\\frac{\\Delta}{4a} = f(p)$',
            'Wierzchołek leży dokładnie w połowie drogi między miejscami zerowymi na osi symetrii $x = p$.',
            segments=[
                {'from': [40, 180], 'to': [480, 180], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [200, 240], 'to': [200, 30], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Oś symetrii
                {'from': [280, 240], 'to': [280, 30], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True, 'label': 'oś x = p'},
                {'from': [280, 80], 'to': [200, 80], 'color': C_SLATE, 'strokeWidth': 1, 'dashed': True}
            ],
            curves=[{'path': 'M 140 240 Q 280 -40 420 240', 'color': C_PRIMARY, 'strokeWidth': 3.5, 'glow': True}],
            points=[
                {'x': 280, 'y': 80, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'W(p, q)', 'labelPosition': 'top'},
                {'x': 180, 'y': 180, 'dot': 'filled', 'color': C_SKY, 'label': 'x₁'},
                {'x': 380, 'y': 180, 'dot': 'filled', 'color': C_SKY, 'label': 'x₂'}
            ],
            metrics=[
                {'label': 'Współrzędna p', 'value': '$p = -\\frac{b}{2a}$', 'color': C_SKY},
                {'label': 'Współrzędna q', 'value': '$q = f(p)$ (szybciej niż z delty!)', 'color': C_SUCCESS},
                {'label': 'Środek symetrii', 'value': '$p = \\frac{x_1 + x_2}{2}$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzory', 'p = -b/2a, q = -Δ/4a', 'Współrzędne.', labels=[{'x': 260, 'y': 130, 'text': 'W = (p, q)', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'f(x) = x² - 4x + 1', 'p = 4/2 = 2, q = f(2) = -3', labels=[{'x': 260, 'y': 130, 'text': 'W = (2, -3)', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Znak we wzorze na p', 'p = -b / (2a) z minusem!', 'Dla f(x) = x² + 6x + 2: b = +6, więc p = -6/2 = -3!', labels=[{'x': 260, 'y': 130, 'text': 'Pamiętaj o minusie przed ułamkiem!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (5, 6):
        # Postać kanoniczna y = a(x - p)^2 + q i oś symetrii x = p
        tab0 = make_plot_diagram(
            'Postać kanoniczna funkcji kwadratowej: $y = a(x - p)^2 + q$',
            '$f(x) = a(x - p)^2 + q,\\quad W = (p, q)$',
            'Postać kanoniczna pozwala od razu odczytać współrzędne wierzchołka $W(p, q)$ bez liczenia delty!',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [300, 240], 'to': [300, 40], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True, 'label': 'oś symetrii x = p'}
            ],
            curves=[{'path': 'M 160 240 Q 300 40 440 240', 'color': C_PRIMARY, 'strokeWidth': 3}],
            points=[
                {'x': 300, 'y': 90, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'W(p, q)', 'labelPosition': 'top'}
            ],
            metrics=[
                {'label': 'Wierzchołek', 'value': '$W = (p, q)$', 'color': C_SUCCESS},
                {'label': 'Oś symetrii', 'value': 'Prosta $x = p$', 'color': C_SKY},
                {'label': 'Przesunięcie', 'value': 'Wektor $[p, q]$ względem $y = ax^2$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór kanoniczny', '$y = a(x - p)^2 + q$', 'Bezpośredni wierzchołek.', labels=[{'x': 260, 'y': 130, 'text': 'y = a(x - p)² + q', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'f(x) = 2(x - 3)² + 5', 'p = 3, q = 5 ⟹ W(3, 5)', labels=[{'x': 260, 'y': 130, 'text': 'Wierzchołek to W(3, 5)', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Znak w nawiasie (x + 4)²', 'f(x) = (x + 4)² - 3 ⟹ p = -4!', 'Liczba w nawiasie ma przeciwny znak niż współrzędna p!', labels=[{'x': 260, 'y': 130, 'text': '(x + 4)² = (x - (-4))² ⟹ p = -4, q = -3', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (7, 8):
        # Postać iloczynowa y = a(x - x_1)(x - x_2)
        tab0 = make_plot_diagram(
            'Postać iloczynowa funkcji kwadratowej: $y = a(x - x_1)(x - x_2)$',
            '$f(x) = a(x - x_1)(x - x_2),\\quad \\Delta > 0$',
            'Postać iloczynowa istnieje tylko dla $\\Delta \\ge 0$. Od razu wskazuje miejsca zerowe $x_1$ i $x_2$.',
            segments=[{'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5}],
            curves=[{'path': 'M 100 60 Q 260 260 420 60', 'color': C_PRIMARY, 'strokeWidth': 3}],
            points=[
                {'x': 170, 'y': 160, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x₁', 'labelPosition': 'top-left'},
                {'x': 350, 'y': 160, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'x₂', 'labelPosition': 'top-right'}
            ],
            metrics=[
                {'label': 'Miejsca zerowe', 'value': '$x_1, x_2$', 'color': C_SUCCESS},
                {'label': 'Środek p', 'value': '$p = \\frac{x_1 + x_2}{2}$', 'color': C_SKY},
                {'label': 'Gdy Δ < 0', 'value': 'Postać iloczynowa NIE ISTNIEJE w $\\mathbb{R}$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'f(x) = a(x - x₁)(x - x₂)', 'Postać iloczynowa.', labels=[{'x': 260, 'y': 130, 'text': 'y = a(x - x₁)(x - x₂)', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'f(x) = -(x - 1)(x + 5)', 'x₁ = 1, x₂ = -5', labels=[{'x': 260, 'y': 130, 'text': 'Miejsca zerowe to 1 oraz -5, ramiona w dół', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Delta < 0', 'Brak miejsc zerowych ⟹ brak iloczynowej!', 'Gdy Δ < 0, trójmian nie ma postaci iloczynowej!', labels=[{'x': 260, 'y': 130, 'text': 'x² + 4 NIE MA postaci iloczynowej!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (9, 10, 11):
        # Zbiór wartości i optymalizacja w przedziale domkniętym
        tab0 = make_plot_diagram(
            'Wartość najmniejsza i największa w przedziale $\\langle a, b \\rangle$',
            '\\text{Sprawdź: } f(a),\\; f(b) \\text{ oraz } f(p) \\text{ jeśli } p \\in \\langle a, b \\rangle',
            'Wierzchołek paraboli jest kandydatem na ekstremum TYLKO wtedy, gdy jego współrzędna $p$ leży wewnątrz przedziału!',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Granice przedziału
                {'from': [140, 240], 'to': [140, 40], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True, 'label': 'x = a'},
                {'from': [380, 240], 'to': [380, 40], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True, 'label': 'x = b'}
            ],
            curves=[{'path': 'M 100 60 Q 260 260 420 60', 'color': C_PRIMARY, 'strokeWidth': 3}],
            points=[
                {'x': 260, 'y': 210, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'W(p, q) - MINIMUM', 'labelPosition': 'bottom'},
                {'x': 140, 'y': 110, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'f(a)'},
                {'x': 380, 'y': 110, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'f(b)'}
            ],
            metrics=[
                {'label': 'Krok 1', 'value': 'Oblicz $p = -\\frac{b}{2a}$', 'color': C_SKY},
                {'label': 'Krok 2', 'value': 'Sprawdź czy $p \\in \\langle a, b \\rangle$', 'color': C_SUCCESS},
                {'label': 'Krok 3', 'value': 'Porównaj $f(p), f(a), f(b)$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(-2, 6, [1, 2, 4], [{'from': 1, 'to': 4, 'fromIncluded': True, 'toIncluded': True}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'f(x) = x² - 2x w <0, 3>', 'p = 1 ∈ <0, 3>', labels=[{'x': 260, 'y': 130, 'text': 'f(1) = -1 (min), f(0) = 0, f(3) = 3 (max)', 'color': C_SUCCESS, 'fontSize': 17, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: p poza przedziałem!', 'Gdy p leży poza <a, b>, NIE bierzesz q!', 'Wtedy liczysz wyłącznie wartości na krańcach: f(a) i f(b)!', labels=[{'x': 260, 'y': 130, 'text': 'Dla p ∉ <a, b> wierzchołek nie bierze udziału!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    else:
        # l_num in (12, 13, 14, 15): Nierówności i odczytywanie znaków współczynników
        tab0 = make_plot_diagram(
            'Odczytywanie znaków współczynników $a, b, c, \\Delta$ z paraboli',
            'a \\text{ (ramiona)},\\; c \\text{ (przecięcie OY)},\\; p = -\\frac{b}{2a} \\text{ (położenie W)},\\; \\Delta \\text{ (liczba m.z.)}',
            'Współczynnik $c$ to punkt przecięcia z $OY$. Znak $b$ wyznaczamy ze znaku $p$ i znaku $a$.',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [200, 240], 'to': [200, 30], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            curves=[{'path': 'M 100 240 Q 280 -40 460 240', 'color': C_PRIMARY, 'strokeWidth': 3.5}],
            points=[
                {'x': 200, 'y': 110, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'c > 0 (przecięcie OY)', 'labelPosition': 'left'},
                {'x': 280, 'y': 70, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'W: p > 0, q > 0', 'labelPosition': 'top-right'}
            ],
            metrics=[
                {'label': 'Ramiona w dół', 'value': '$a < 0$', 'color': C_DANGER},
                {'label': 'Przecięcie OY nad osią', 'value': '$c > 0$', 'color': C_SUCCESS},
                {'label': 'Wierzchołek po prawej', 'value': '$p > 0 \\implies b > 0$ (bo $a < 0$)', 'color': C_PRIMARY},
                {'label': '2 miejsca zerowe', 'value': '$\\Delta > 0$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Reguły znaków', 'a, b, c, Δ', 'Pewniak maturalny.', labels=[{'x': 260, 'y': 130, 'text': 'a z ramion, c z OY, b z p = -b/2a', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład maturalny', 'a < 0, b > 0, c > 0', 'Krok po kroku.', labels=[{'x': 260, 'y': 130, 'text': 'Ramiona w dół ⟹ a<0; W po prawej ⟹ -b/2a > 0 ⟹ b > 0', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Wyznaczanie b', 'Nie zgaduj b na oko!', 'Zawsze wyznaczaj b ze wzoru: b = -2ap!', labels=[{'x': 260, 'y': 130, 'text': 'Jeśli p > 0 i a > 0, to b < 0!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
