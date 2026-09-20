"""
topic_15.py - Dział 15: Zadania Optymalizacyjne i Modelowanie Matematyczne (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram, make_plot_diagram, make_number_line
)

def get_topic_15_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Schemat 5 kroków w optymalizacji
        tab0 = make_plot_diagram(
            'Algorytm 5 Kroków w Zadaniu Optymalizacyjnym (Pewniak za 4 pkt CKE)',
            'f(x) = ax^2 + bx + c \\implies W = (p, q),\\quad p = -\\frac{b}{2a}',
            '1. Wybierz zmienną $x$. 2. Zapisz funkcję celu $P(x)$. 3. Wyznacz dziedzinę $D$. 4. Oblicz współrzędną wierzchołka $p = -\\frac{b}{2a}$. 5. Sprawdź czy $p \\in D$ i podaj odpowiedź.',
            segments=[
                {'from': [40, 180], 'to': [480, 180], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [250, 240], 'to': [250, 40], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True, 'label': 'optimum x = p'}
            ],
            curves=[{'path': 'M 100 240 Q 250 20 400 240', 'color': C_PRIMARY, 'strokeWidth': 3.5, 'glow': True}],
            points=[
                {'x': 250, 'y': 75, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'W(p, q) - MAKSIMUM', 'labelPosition': 'top'}
            ],
            metrics=[
                {'label': 'Krok 1-2', 'value': 'Funkcja jednej zmiennej $P(x)$', 'color': C_SKY},
                {'label': 'Krok 3', 'value': 'Dziedzina geometryczna $D$', 'color': C_DANGER},
                {'label': 'Krok 4-5', 'value': 'Wierzchołek $p = -b/(2a) \\in D$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('5 Kroków', 'Algorytm CKE', 'Schemat postępowania.', labels=[{'x': 260, 'y': 130, 'text': '1. Zmienna x  2. Funkcja celu  3. Dziedzina  4. Wierzchołek p  5. Odpowiedź', 'color': C_PRIMARY, 'fontSize': 14, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: P(x) = -2x² + 40x', 'p = -40 / (2·(-2)) = 10', 'Maksymalne pole dla x = 10.', labels=[{'x': 260, 'y': 130, 'text': 'p = 10 ⟹ P_max = P(10) = 200', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Brak dziedziny to strata 1 pkt!', 'Zawsze wyznaczaj dziedzinę geometryczną!', 'Nawet idealne policzenie wierzchołka bez podania dziedziny obcina punkt za zadanie!', labels=[{'x': 260, 'y': 130, 'text': 'ZAWSZE zapisz: D = (0, ...) i sprawdź czy p ∈ D!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (2, 3, 4, 5, 6):
        # Optymalizacja ogrodzenia: działka przy murze, podziały
        tab0 = make_geometry_diagram(
            'Optymalizacja działki przylegającej do muru (ogrodzenie z 3 stron)',
            '2x + y = L \\implies y = L - 2x,\\quad P(x) = x(L - 2x) = -2x^2 + Lx',
            'Siatkę zużywamy tylko na 3 boki ($2x + y = L$). Pole osiąga maksimum w wierzchołku paraboli $p = \\frac{L}{4}$.',
            polygons=[
                {'points': [[100, 70], [420, 70], [420, 190], [100, 190]], 'fill': 'rgba(16, 185, 129, 0.1)', 'stroke': C_SUCCESS, 'strokeWidth': 2.5}
            ],
            segments=[
                # Mur z tyłu
                {'from': [100, 70], 'to': [420, 70], 'color': C_SLATE, 'strokeWidth': 6, 'label': 'MUR (bez siatki)'},
                # 3 boki z siatki
                {'from': [100, 70], 'to': [100, 190], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'x'},
                {'from': [420, 70], 'to': [420, 190], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'x'},
                {'from': [100, 190], 'to': [420, 190], 'color': C_SKY, 'strokeWidth': 3, 'label': 'y = L - 2x'}
            ],
            metrics=[
                {'label': 'Obwód siatki', 'value': '$2x + y = L$', 'color': C_PRIMARY},
                {'label': 'Funkcja pola', 'value': '$P(x) = -2x^2 + Lx$', 'color': C_SUCCESS},
                {'label': 'Optymalny bok x', 'value': '$x = \\frac{L}{4},\\quad y = \\frac{L}{2}$', 'color': C_SKY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Równanie boków', '2x + y = L', 'Zależność.', labels=[{'x': 260, 'y': 130, 'text': 'y = L - 2x ⟹ P(x) = x(L - 2x)', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: L = 100 m', 'P(x) = -2x² + 100x ⟹ p = 25 m', 'Wymiary działki.', labels=[{'x': 260, 'y': 130, 'text': 'x = 25 m, y = 50 m ⟹ P_max = 1250 m²', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: 2x + 2y zamiast 2x + y', 'Mur nie ma siatki!', 'Nie dodawaj czwartego boku, jeśli w treści zadania działka przylega do ściany lub rzeki!', labels=[{'x': 260, 'y': 130, 'text': 'Ogrodzenie z 3 stron ⟹ 2x + y = L!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (7, 8, 9):
        # Optymalizacja ekonomiczna: Przychód i zysk
        tab0 = make_plot_diagram(
            'Optymalizacja ekonomiczna: Przychód $R(x) = (c_0 + x \\Delta c)(l_0 - x \\Delta l)$',
            'R(x) = \\text{Cena}(x) \\cdot \\text{Liczba klientów}(x)',
            'Podnosząc cenę o $x$ kroków zyskujemy na sztuce, ale tracimy klientów. Iloczyn tworzy parabolę z maksimum w wierzchołku.',
            segments=[
                {'from': [40, 180], 'to': [480, 180], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [240, 240], 'to': [240, 40], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True, 'label': 'optymalna liczba podwyżek'}
            ],
            curves=[{'path': 'M 80 230 Q 240 30 400 230', 'color': C_PRIMARY, 'strokeWidth': 3.5, 'glow': True}],
            points=[
                {'x': 240, 'y': 80, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'MAKSYMALNY PRZYCHÓD', 'labelPosition': 'top'}
            ],
            metrics=[
                {'label': 'Cena biletu', 'value': '$c(x) = c_0 + 5x$', 'color': C_SKY},
                {'label': 'Liczba widzów', 'value': '$l(x) = l_0 - 20x$', 'color': C_DANGER},
                {'label': 'Przychód R(x)', 'value': '$R(x) = c(x) \\cdot l(x)$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Model przychodu', 'Przychód = Cena · Ilość', 'Ekonomia.', labels=[{'x': 260, 'y': 130, 'text': 'R(x) = (Cena początkowa ± Δc)(Ilość ± Δl)', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Cena 40+2x, Widzów 200-5x', 'Maksimum dla p = 10', labels=[{'x': 260, 'y': 130, 'text': 'Optymalna cena biletu: 40 + 2(10) = 60 zł', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Pytanie o CENĘ a nie o x!', 'Odpowiedz na właściwe pytanie!', 'Jeśli wyznaczysz x = 10, a pytanie brzmi „Jaka powinna być cena?”, musisz obliczyć cenę: c(10) = 60 zł!', labels=[{'x': 260, 'y': 130, 'text': 'Czytaj uważnie treść pytania końcowego!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    else:
        # l_num in (10..15): Pudełko z siatki, tor lotu, modelowanie za 4 punkty
        tab0 = make_geometry_diagram(
            'Optymalizacja pudełka z arkusza tektury: Wycinanie narożników $x$',
            'V(x) = x(a - 2x)(b - 2x),\\quad D = \\left(0, \\frac{\\min(a, b)}{2}\\right)',
            'Z każdego z 4 rogów arkusza $a \\times b$ wycinamy kwadracik o boku $x$ i zaginamy boki, tworząc otwarte pudełko.',
            polygons=[
                # Główny arkusz
                {'points': [[100, 60], [420, 60], [420, 220], [100, 220]], 'fill': 'rgba(255, 184, 0, 0.1)', 'stroke': C_PRIMARY, 'strokeWidth': 2},
                # 4 narożniki wycięte
                {'points': [[100, 60], [150, 60], [150, 100], [100, 100]], 'fill': 'rgba(244, 63, 94, 0.2)', 'stroke': C_DANGER, 'strokeWidth': 1.5, 'dashed': True},
                {'points': [[370, 60], [420, 60], [420, 100], [370, 100]], 'fill': 'rgba(244, 63, 94, 0.2)', 'stroke': C_DANGER, 'strokeWidth': 1.5, 'dashed': True},
                {'points': [[100, 180], [150, 180], [150, 220], [100, 220]], 'fill': 'rgba(244, 63, 94, 0.2)', 'stroke': C_DANGER, 'strokeWidth': 1.5, 'dashed': True},
                {'points': [[370, 180], [420, 180], [420, 220], [370, 220]], 'fill': 'rgba(244, 63, 94, 0.2)', 'stroke': C_DANGER, 'strokeWidth': 1.5, 'dashed': True}
            ],
            labels=[
                {'x': 125, 'y': 80, 'text': 'x', 'color': C_DANGER, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 260, 'y': 140, 'text': 'Dno pudełka: (a - 2x) · (b - 2x)', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Wysokość pudełka', 'value': '$H = x$', 'color': C_DANGER},
                {'label': 'Boki dna', 'value': '$a - 2x,\\; b - 2x$', 'color': C_SUCCESS},
                {'label': 'Dziedzina', 'value': '$x > 0 \\land 2x < \\min(a, b)$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Model pudełka', 'V = x(a - 2x)(b - 2x)', 'Siatka.', labels=[{'x': 260, 'y': 130, 'text': 'Objętość to iloczyn: wysokość · boki dna', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Arkusz 20 x 20, kwadrat o boku x', 'D = (0, 10)', labels=[{'x': 260, 'y': 130, 'text': 'V(x) = x(20 - 2x)²', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: 2x a nie x!', 'Odejmujesz DWA narożniki z każdego boku!', 'Z każdej strony wycinasz narożnik, więc bok zmniejsza się o 2x, a NIE o samo x!', labels=[{'x': 260, 'y': 130, 'text': 'Długość boku dna to a - 2x!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
