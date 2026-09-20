"""
topic_13.py - Dział 13: Rachunek Prawdopodobieństwa (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram
)

def get_topic_13_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Prawdopodobieństwo klasyczne P(A) = |A| / |Omega|
        tab0 = make_geometry_diagram(
            'Prawdopodobieństwo klasyczne Laplace’a',
            'P(A) = \\frac{|A|}{|\\Omega|},\\quad 0 \\le P(A) \\le 1',
            'Iloraz liczby zdarzeń sprzyjających $|A|$ do liczby WSZYSTKICH możliwych jednakowo prawdopodobnych zdarzeń elementarnych $|\\Omega|$.',
            polygons=[
                # Cała Omega
                {'points': [[80, 60], [440, 60], [440, 220], [80, 220]], 'fill': 'rgba(100, 116, 139, 0.08)', 'stroke': C_SLATE, 'strokeWidth': 2},
                # Podzbiór A sprzyjający
                {'points': [[160, 100], [320, 100], [320, 190], [160, 190]], 'fill': 'rgba(16, 185, 129, 0.18)', 'stroke': C_SUCCESS, 'strokeWidth': 2.5}
            ],
            labels=[
                {'x': 420, 'y': 85, 'text': 'Ω (wszystkie zdarzenia)', 'color': C_MUTED, 'fontSize': 13, 'anchor': 'end'},
                {'x': 240, 'y': 145, 'text': 'A (sprzyjające)', 'color': C_SUCCESS, 'fontSize': 16, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'P(A)', 'value': '$\\frac{|A|}{|\\Omega|}$', 'color': C_SUCCESS},
                {'label': 'Pewne', 'value': '$P(\\Omega) = 1$', 'color': C_PRIMARY},
                {'label': 'Niemożliwe', 'value': '$P(\\emptyset) = 0$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_geometry_diagram('Definicja', 'P(A) = |A| / |Ω|', 'Wzór klasyczny.', labels=[{'x': 260, 'y': 130, 'text': 'P(A) = |A| / |Ω|', 'color': C_PRIMARY, 'fontSize': 22, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: Rzut kostką', 'Zdarzenie: liczba parzysta', '|A| = 3, |Ω| = 6 ⟹ P(A) = 3/6 = 1/2', labels=[{'x': 260, 'y': 130, 'text': 'P(A) = 3/6 = 0.5', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Wynik > 1 to błąd!', '0 ≤ P(A) ≤ 1!', 'Prawdopodobieństwo NIGDY nie może być większe niż 1 ani mniejsze niż 0!', labels=[{'x': 260, 'y': 130, 'text': 'Gdy wyjdzie P(A) > 1, natychmiast sprawdź rachunki!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 2:
        # Dwukrotny rzut kostką: Tabela 6x6 (|Omega| = 36)
        tab0 = make_geometry_diagram(
            'Dwukrotny rzut kostką: Tabela $6 \\times 6$ ($|\\Omega| = 36$)',
            '|\\Omega| = 6 \\cdot 6 = 36,\\quad P(A) = \\frac{|A|}{36}',
            'Niezawodna metoda CKE: narysuj siatkę $6 \\times 6$ i zaznaczaj krzyżykami pola spełniające warunek (np. suma oczek = 7).',
            polygons=[
                {'points': [[160, 60], [360, 60], [360, 220], [160, 220]], 'fill': 'rgba(255, 184, 0, 0.08)', 'stroke': C_PRIMARY, 'strokeWidth': 2}
            ],
            segments=[
                # Linie siatki
                {'from': [193, 60], 'to': [193, 220], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [226, 60], 'to': [226, 220], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [260, 60], 'to': [260, 220], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [293, 60], 'to': [293, 220], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [326, 60], 'to': [326, 220], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [160, 86], 'to': [360, 86], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [160, 113], 'to': [360, 113], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [160, 140], 'to': [360, 140], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [160, 166], 'to': [360, 166], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [160, 193], 'to': [360, 193], 'color': C_SLATE, 'strokeWidth': 1}
            ],
            labels=[
                {'x': 260, 'y': 45, 'text': 'Kostka II (1-6)', 'color': C_SKY, 'fontSize': 13, 'anchor': 'middle'},
                {'x': 135, 'y': 140, 'text': 'Kostka I', 'color': C_SKY, 'fontSize': 13, 'anchor': 'middle'},
                {'x': 260, 'y': 245, 'text': 'Dokładnie 36 zdarzeń elementarnych', 'color': C_PRIMARY, 'fontSize': 13, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': '|Ω|', 'value': '$6 \\cdot 6 = 36$', 'color': C_PRIMARY},
                {'label': 'Suma = 7', 'value': '6 pól ⟹ $P = 6/36 = 1/6$', 'color': C_SUCCESS},
                {'label': 'Iloczyn parzysty', 'value': '27 pól ⟹ $P = 27/36 = 3/4$', 'color': C_SKY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Tabela 6x6', '|Ω| = 36', 'Niezawodna metoda.', labels=[{'x': 260, 'y': 130, 'text': 'Wypisz siatkę 6x6 i zakreślaj sprzyjające pary (k₁, k₂)', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Suma oczek równa 8', 'Pary: (2,6), (3,5), (4,4), (5,3), (6,2)', labels=[{'x': 260, 'y': 130, 'text': '|A| = 5 ⟹ P(A) = 5/36', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Para (2, 6) ≠ (6, 2)', 'Kostki są rozróżnialne!', 'Rzut dwiema kostkami to doświadczenie uporządkowane: (2, 6) to co innego niż (6, 2)!', labels=[{'x': 260, 'y': 130, 'text': 'Para (2, 6) i (6, 2) to DWA różne zdarzenia!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (3, 4, 5):
        # Kule w urnie, zdarzenie przeciwne P(A') = 1 - P(A) i suma zdarzeń
        tab0 = make_geometry_diagram(
            'Zdarzenie przeciwne: $P(A) = 1 - P(A\')$ (słowo-klucz: „co najmniej jeden”)',
            'P(A) = 1 - P(A\'),\\quad P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
            'Gdy w treści zadania pojawia się „co najmniej raz” lub „co najmniej jeden”, ZAWSZE licz zdarzenie przeciwne („ani razu” / „żaden”)!',
            polygons=[
                {'points': [[100, 70], [420, 70], [420, 200], [100, 200]], 'fill': 'rgba(100, 116, 139, 0.08)', 'stroke': C_SLATE, 'strokeWidth': 2},
                {'points': [[160, 100], [280, 100], [280, 170], [160, 170]], 'fill': 'rgba(244, 63, 94, 0.15)', 'stroke': C_DANGER, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 220, 'y': 135, 'text': 'A\' (ani razu)', 'color': C_DANGER, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 350, 'y': 135, 'text': 'A (co najmniej raz)', 'color': C_SUCCESS, 'fontSize': 15, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'P(A) + P(A\')', 'value': '$1$', 'color': C_PRIMARY},
                {'label': 'Klucz do matury', 'value': '„Co najmniej 1 sukces” = $1 - P(\\text{0 sukcesów})$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Zdarzenie przeciwne', 'P(A) = 1 - P(A\')', 'Dopełnienie.', labels=[{'x': 260, 'y': 130, 'text': 'P(A) = 1 - P(A\')', 'color': C_PRIMARY, 'fontSize': 22, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: Rzut 3 razy monetą', 'Co najmniej jeden orzeł', 'A\': same reszki (1/8) ⟹ P(A) = 1 - 1/8 = 7/8', labels=[{'x': 260, 'y': 130, 'text': 'P(A) = 1 - (1/2)³ = 1 - 1/8 = 7/8', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Rozpisywanie 7 przypadków', 'Nie licz na piechotę!', 'Liczenie „co najmniej raz” wprost zajmuje 5 minut i grozi pomyłką. Przeciwne zajmuje 15 sekund!', labels=[{'x': 260, 'y': 130, 'text': 'Zawsze: 1 MINUS zdarzenie przeciwne!', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (6, 7):
        # Doświadczenia wieloetapowe: Drzewo stochastyczne i losowanie bez zwracania
        tab0 = make_geometry_diagram(
            'Drzewo stochastyczne: Mnożenie wzdłuż gałęzi, dodawanie wyników',
            'P(\\text{ścieżka}) = p_1 \\cdot p_2,\\quad P(A) = \\sum P(\\text{ścieżki sprzyjające})',
            'Prawdopodobieństwo gałęzi mnożymy w dół. Przy losowaniu BEZ ZWRACANIA mianownik ułamka w drugim etapie ZAWSZE zmniejsza się o 1!',
            segments=[
                # Etap 1
                {'from': [120, 140], 'to': [240, 80], 'color': C_SKY, 'strokeWidth': 2.5, 'label': 'Biała (3/5)'},
                {'from': [120, 140], 'to': [240, 200], 'color': C_DANGER, 'strokeWidth': 2.5, 'label': 'Czarna (2/5)'},
                # Etap 2
                {'from': [240, 80], 'to': [360, 50], 'color': C_SKY, 'strokeWidth': 2, 'label': 'B (2/4)'},
                {'from': [240, 80], 'to': [360, 110], 'color': C_DANGER, 'strokeWidth': 2, 'label': 'C (2/4)'},
                {'from': [240, 200], 'to': [360, 170], 'color': C_SKY, 'strokeWidth': 2, 'label': 'B (3/4)'},
                {'from': [240, 200], 'to': [360, 230], 'color': C_DANGER, 'strokeWidth': 2, 'label': 'C (1/4)'}
            ],
            points=[
                {'x': 120, 'y': 140, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'Start'},
                {'x': 240, 'y': 80, 'dot': 'filled', 'color': C_SKY},
                {'x': 240, 'y': 200, 'dot': 'filled', 'color': C_DANGER}
            ],
            metrics=[
                {'label': 'Wzdłuż gałęzi', 'value': 'Mnożenie ułamków', 'color': C_PRIMARY},
                {'label': 'Pomiędzy gałęziami', 'value': 'Dodawanie prawdopodobieństw', 'color': C_SUCCESS},
                {'label': 'Bez zwracania', 'value': 'Mianownik: $n \\to n-1$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_geometry_diagram('Zasada drzewka', 'Mnożysz gałęzie, dodajesz ścieżki', 'Stochastyka.', labels=[{'x': 260, 'y': 130, 'text': 'Wzdłuż ścieżki: mnożenie | Różne ścieżki: dodawanie', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: Urna (3B, 2C), 2 kule bez zwracania', 'P(obie białe) = 3/5 · 2/4 = 6/20 = 3/10', 'Obliczenie.', labels=[{'x': 260, 'y': 130, 'text': 'P(B, B) = 3/5 · 2/4 = 0.3', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Stały mianownik', 'Bez zwracania oznacza o 1 mniej w urnie!', 'Częsty błąd: mnożenie 3/5 · 2/5 (zamiast 2/4)!', labels=[{'x': 260, 'y': 130, 'text': 'W drugim losowaniu w urnie są już tylko 4 kule!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    else:
        # l_num in (8..15): Doświadczenia z monetami, kartami, złożone zadania CKE
        tab0 = make_geometry_diagram(
            'Złożone zadania z prawdopodobieństwa: Drzewo vs Przestrzeń par',
            'P(A) = \\frac{|A|}{|\\Omega|}\\quad \\text{lub}\\quad P(A) = \\sum P(\\text{gałęzi})',
            'Zawsze wybierz prostszą metodę: dla monet i kostek tabela par; dla kul i losowań zależnych drzewo stochastyczne.',
            polygons=[{'points': [[100, 70], [420, 70], [420, 190], [100, 190]], 'fill': 'rgba(255, 184, 0, 0.08)', 'stroke': C_PRIMARY, 'strokeWidth': 2}],
            labels=[
                {'x': 260, 'y': 110, 'text': 'Urny i kule ⟹ DRZEWKO STOCHASTYCZNE', 'color': C_SUCCESS, 'fontSize': 15, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 260, 'y': 150, 'text': 'Kostki i monety ⟹ TABELA / MODEL KLASYCZNY', 'color': C_SKY, 'fontSize': 15, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Talia kart (52)', 'value': '13 w każdym kolorze, 4 asy, 16 figur', 'color': C_PRIMARY},
                {'label': 'Suma gałęzi', 'value': 'Suma wszystkich gałęzi z węzła $= 1$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Strategia CKE', 'Dobór metody', 'Schemat.', labels=[{'x': 260, 'y': 130, 'text': 'Drzewo dla ułamków | Tabela dla jednakowych wag', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: Losowanie karty', 'P(as) = 4/52 = 1/13', 'Talia 52 kart.', labels=[{'x': 260, 'y': 130, 'text': 'P(as) = 4/52 = 1/13', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Suma prawdopodobieństw gałęzi', 'Gałęzie z jednego węzła muszą sumować się do 1!', 'Zawsze sprawdzaj, czy np. 3/5 + 2/5 = 1!', labels=[{'x': 260, 'y': 130, 'text': 'Suma gałęzi z każdego węzła ZAWSZE = 1!', 'color': C_PRIMARY, 'fontSize': 15, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
