"""
topic_14.py - Dział 14: Statystyka (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram, make_statistics_diagram, make_number_line
)

def get_topic_14_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num in (1, 2):
        # Średnia arytmetyczna i średnia z niewiadomą
        tab0 = make_statistics_diagram(
            'Średnia arytmetyczna jako środek ciężkości danych',
            '\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n},\\quad \\sum (x_i - \\bar{x}) = 0',
            'Średnia arytmetyczna to punkt równowagi zestawu liczb. Suma odchyleń wszystkich liczb od średniej wynosi DOKŁADNIE zero.',
            bars=[
                {'x': 100, 'y': 140, 'width': 40, 'height': 80, 'fill': 'rgba(56, 189, 248, 0.4)', 'stroke': C_SKY, 'label': '2', 'category': 'x₁'},
                {'x': 160, 'y': 100, 'width': 40, 'height': 120, 'fill': 'rgba(56, 189, 248, 0.4)', 'stroke': C_SKY, 'label': '3', 'category': 'x₂'},
                {'x': 220, 'y': 60, 'width': 40, 'height': 160, 'fill': 'rgba(56, 189, 248, 0.4)', 'stroke': C_SKY, 'label': '4', 'category': 'x₃'},
                {'x': 280, 'y': 20, 'width': 40, 'height': 200, 'fill': 'rgba(56, 189, 248, 0.4)', 'stroke': C_SKY, 'label': '5', 'category': 'x₄'}
            ],
            segments=[
                # Linia średniej = 3.5
                {'from': [60, 80], 'to': [440, 80], 'color': C_PRIMARY, 'strokeWidth': 2.5, 'dashed': True, 'label': 'średnia x̄ = 3.5'}
            ],
            metrics=[
                {'label': 'Wzór', 'value': '$\\bar{x} = \\frac{\\sum x_i}{n}$', 'color': C_PRIMARY},
                {'label': 'Równanie z niewiadomą x', 'value': '$n \\cdot \\bar{x} = \\sum x_i + x$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'x̄ = (x₁ + ... + x_n) / n', 'Średnia.', labels=[{'x': 260, 'y': 130, 'text': 'Suma wszystkich liczb podzielona przez ich ilość n', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: Średnia z niewiadomą', 'Liczby 2, 4, 6, x mają średnią 5', '2+4+6+x = 4 · 5 = 20 ⟹ x = 8', labels=[{'x': 260, 'y': 130, 'text': '12 + x = 20 ⟹ x = 8', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Mnożenie średniej przez n', 'Suma to n · x̄!', 'Najszybsza metoda na brakującą liczbę: pomnóż średnią przez liczbę elementów i odejmij znane liczby!', labels=[{'x': 260, 'y': 130, 'text': 'Suma = n · x̄ (błyskawiczny rachunek)', 'color': C_SUCCESS, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 3:
        # Średnia ważona
        tab0 = make_statistics_diagram(
            'Średnia ważona: Waga determinuje wpływ oceny',
            '\\bar{x}_w = \\frac{w_1 x_1 + w_2 x_2 + \\dots + w_k x_k}{w_1 + w_2 + \\dots + w_k}',
            'Mnożymy każdą wartość przez jej wagę, a wynik dzielimy przez SUMĘ WAG (a nie przez liczbę ocen!).',
            bars=[
                {'x': 120, 'y': 100, 'width': 60, 'height': 120, 'fill': 'rgba(255, 184, 0, 0.4)', 'stroke': C_PRIMARY, 'label': 'Sprawdzian (waga 5)', 'category': 'Ocena 5'},
                {'x': 280, 'y': 160, 'width': 60, 'height': 60, 'fill': 'rgba(56, 189, 248, 0.4)', 'stroke': C_SKY, 'label': 'Kartkówka (waga 1)', 'category': 'Ocena 2'}
            ],
            metrics=[
                {'label': 'Mianownik', 'value': 'Zawsze SUMA WAG: $\\sum w_i$', 'color': C_DANGER},
                {'label': 'Licznik', 'value': 'Suma iloczynów: $\\sum w_i x_i$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'x̄_w = Σ(w_i · x_i) / Σw_i', 'Średnia ważona.', labels=[{'x': 260, 'y': 130, 'text': 'W mianowniku ZAWSZE suma wag!', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Ocena 5 (waga 3) i Ocena 2 (waga 1)', 'x̄_w = (5·3 + 2·1)/(3+1) = 17/4 = 4.25', labels=[{'x': 260, 'y': 130, 'text': 'x̄_w = 17 / 4 = 4.25', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Dzielenie przez liczbę ocen', 'Dzielisz przez SUMĘ WAG!', 'Częsty błąd: dzielenie przez 2 (bo były dwie oceny) zamiast przez sumę wag 3+1=4!', labels=[{'x': 260, 'y': 130, 'text': 'Dzielisz przez 4 (suma wag), a NIE przez 2!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (4, 5):
        # Mediana: zestaw nieparzysty vs parzysty (KROK 0: SORTOWANIE!)
        tab0 = make_geometry_diagram(
            'Mediana: KROK 0 to ZAWSZE uporządkowanie liczb niemalejąco!',
            '\\text{Nieparzysta liczba n: środkowy wyraz},\\quad \\text{Parzysta: średnia 2 środkowych}',
            'NIGDY nie wyznaczaj mediany z nieposortowanego zestawu! Po posortowaniu mediana dzieli dane dokładnie na pół (50% poniżej, 50% powyżej).',
            polygons=[
                {'points': [[100, 80], [420, 80], [420, 180], [100, 180]], 'fill': 'rgba(192, 132, 252, 0.08)', 'stroke': C_PURPLE, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 140, 'y': 130, 'text': '1, 2', 'color': C_SKY, 'fontSize': 18},
                {'x': 260, 'y': 130, 'text': '[ 4 ] (MEDIANA)', 'color': C_PRIMARY, 'fontSize': 18, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 370, 'y': 130, 'text': '7, 9', 'color': C_SUCCESS, 'fontSize': 18}
            ],
            metrics=[
                {'label': 'n nieparzyste (np. 5)', 'value': 'Środkowy wyraz: $Me = x_3$', 'color': C_PRIMARY},
                {'label': 'n parzyste (np. 6)', 'value': 'Średnia środkowych: $Me = \\frac{x_3 + x_4}{2}$', 'color': C_SUCCESS},
                {'label': 'Złota zasada', 'value': '1. Posortuj! 2. Policz n! 3. Wybierz środek!', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_geometry_diagram('Algorytm mediany', '1. Sortowanie 2. Środek', 'Zasada.', labels=[{'x': 260, 'y': 130, 'text': 'KROK 1: Uporządkuj liczby od najmniejszej do największej!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład parzysty: 2, 3, 5, 7, 8, 11', 'Me = (5 + 7) / 2 = 6', 'Średnia dwóch środkowych.', labels=[{'x': 260, 'y': 130, 'text': 'Me = (5 + 7) / 2 = 6', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Brak posortowania liczb!', 'Wyznaczenie środka z nieuporządkowanych liczb to 0 pkt!', 'Zestaw: 7, 1, 9, 2, 4 ⟹ NAJPIERW: 1, 2, 4, 7, 9 ⟹ Mediana to 4 (a nie 9)!', labels=[{'x': 260, 'y': 130, 'text': 'ZAWSZE najpierw posortuj dane!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 6:
        # Dominanta (moda)
        tab0 = make_statistics_diagram(
            'Dominanta (moda): Wartość występująca NAJCZĘŚCIEJ',
            'D = x_i \\iff n_i = \\max',
            'Dominanta to po prostu najwyższy słupek na wykresie częstości lub liczba pojawiająca się najwięcej razy w zestawie danych.',
            bars=[
                {'x': 100, 'y': 160, 'width': 50, 'height': 60, 'fill': 'rgba(100, 116, 139, 0.2)', 'stroke': C_SLATE, 'label': '1 raz', 'category': 'ocena 3'},
                {'x': 190, 'y': 60, 'width': 50, 'height': 160, 'fill': 'rgba(255, 184, 0, 0.5)', 'stroke': C_PRIMARY, 'label': '5 razy', 'category': 'ocena 4 (DOMINANTA)'},
                {'x': 280, 'y': 120, 'width': 50, 'height': 100, 'fill': 'rgba(100, 116, 139, 0.2)', 'stroke': C_SLATE, 'label': '2 razy', 'category': 'ocena 5'}
            ],
            metrics=[
                {'label': 'Dominanta', 'value': '$D = 4$ (ocena 4)', 'color': C_PRIMARY},
                {'label': 'Liczebność', 'value': 'Wystąpiła 5 razy (najwięcej)', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Definicja', 'Wartość najczęstsza', 'Moda.', labels=[{'x': 260, 'y': 130, 'text': 'Dominanta to wartość o największej liczebności', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Zestaw: 2, 3, 3, 3, 5, 8', 'Dominanta D = 3 (występuje 3 razy)', labels=[{'x': 260, 'y': 130, 'text': 'D = 3', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Dominanta to WARTOŚĆ, a nie jej liczebność!', 'D = 4, a NIE 5!', 'Częsty błąd: podanie liczby wystąpień (5) zamiast samej oceny/wartości (4)!', labels=[{'x': 260, 'y': 130, 'text': 'Dominanta to cecha (ocena 4), a nie ilość (5 razy)!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (7, 8, 9):
        # Wariancja, odchylenie standardowe sigma i przekształcenia liniowe
        tab0 = make_geometry_diagram(
            'Odchylenie standardowe $\\sigma = \\sqrt{\\sigma^2}$ i przekształcenia danych',
            '\\sigma^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n},\\quad \\sigma = \\sqrt{\\sigma^2}',
            'Odchylenie standardowe mierzy stopień rozproszenia danych wokół średniej. Dodanie stałej $c$ do wszystkich danych przesuwa średnią o $c$, ale $\\sigma$ POZOSTAJE BEZ ZMIAN!',
            polygons=[{'points': [[100, 70], [420, 70], [420, 190], [100, 190]], 'fill': 'rgba(56, 189, 248, 0.08)', 'stroke': C_SKY, 'strokeWidth': 2}],
            labels=[
                {'x': 260, 'y': 110, 'text': 'Dodanie +c do każdej liczby:', 'color': C_TEXT, 'fontSize': 16, 'anchor': 'middle'},
                {'x': 260, 'y': 145, 'text': 'x̄_nowa = x̄ + c   |   σ_nowa = σ (BEZ ZMIAN!)', 'color': C_SUCCESS, 'fontSize': 16, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Wariancja', 'value': 'Średnia kwadratów odchyleń $\\sigma^2$', 'color': C_PRIMARY},
                {'label': 'Odchylenie', 'value': '$\\sigma = \\sqrt{\\sigma^2}$', 'color': C_SKY},
                {'label': 'Pewniak CKE', 'value': 'Dodanie stałej NIE zmienia rozrzutu danych!', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'σ = √wariancji', 'Rozproszenie.', labels=[{'x': 260, 'y': 130, 'text': 'σ² = ((x₁-x̄)² + ... + (x_n-x̄)²) / n', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Wariancja σ² = 9 ⟹ σ = 3', 'Odchylenie to pierwiastek.', labels=[{'x': 260, 'y': 130, 'text': 'σ = √9 = 3', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Zmiana odchylenia przy dodawaniu', 'Dodanie liczby nie zmienia σ!', 'Jeśli każdy zarobił o 500 zł więcej, średnia rośnie o 500 zł, ale odchylenie standardowe się NIE ZMIENIA!', labels=[{'x': 260, 'y': 130, 'text': 'σ nie reaguje na dodanie stałej!', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}])

    else:
        # l_num in (10..15): Tabela częstości, wykresy słupkowe, zadania złożone
        tab0 = make_statistics_diagram(
            'Analiza tabeli częstości: Odczytywanie mediany i średniej',
            'n = \\sum n_i,\\quad Me = \\text{wartość na pozycji } \\frac{n+1}{2}',
            'Aby wyznaczyć medianę z tabeli, zsumuj wszystkie liczebności $n$, znajdź numery wyrazów środkowych i odczytaj odpowiadające im oceny.',
            bars=[
                {'x': 80, 'y': 180, 'width': 45, 'height': 40, 'fill': 'rgba(56, 189, 248, 0.4)', 'stroke': C_SKY, 'label': '2 os.', 'category': 'ocena 1'},
                {'x': 150, 'y': 140, 'width': 45, 'height': 80, 'fill': 'rgba(56, 189, 248, 0.4)', 'stroke': C_SKY, 'label': '4 os.', 'category': 'ocena 2'},
                {'x': 220, 'y': 60, 'width': 45, 'height': 160, 'fill': 'rgba(255, 184, 0, 0.5)', 'stroke': C_PRIMARY, 'label': '8 os.', 'category': 'ocena 3'},
                {'x': 290, 'y': 120, 'width': 45, 'height': 100, 'fill': 'rgba(56, 189, 248, 0.4)', 'stroke': C_SKY, 'label': '5 os.', 'category': 'ocena 4'},
                {'x': 360, 'y': 190, 'width': 45, 'height': 30, 'fill': 'rgba(16, 185, 129, 0.4)', 'stroke': C_SUCCESS, 'label': '1 os.', 'category': 'ocena 5'}
            ],
            metrics=[
                {'label': 'Łącznie uczniów n', 'value': '$2 + 4 + 8 + 5 + 1 = 20$', 'color': C_PRIMARY},
                {'label': 'Środek (mediana)', 'value': 'Pozycje 10 i 11 to ocena 3 ⟹ $Me = 3$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Tabela częstości', 'Wartość x_i · Liczebność n_i', 'Odczyt.', labels=[{'x': 260, 'y': 130, 'text': 'Średnia = Σ(x_i · n_i) / Σn_i', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład z wykresu słupkowego', 'Odczyt mediany dla 25 osób', 'Środkowa pozycja to 13. uczeń', labels=[{'x': 260, 'y': 130, 'text': '13. uczeń leży w słupku oceny 3 ⟹ Me = 3', 'color': C_SUCCESS, 'fontSize': 17, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Mediana słupków zamiast cechy', 'Mediana ocen, a NIE liczebności!', 'Szukamy mediany ocen uczniów, a nie mediany wysokości słupków!', labels=[{'x': 260, 'y': 130, 'text': 'Mediana dotyczy badanej cechy (np. oceny)!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
