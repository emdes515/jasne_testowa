"""
topic_12.py - Dział 12: Kombinatoryka (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram
)

def get_topic_12_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Reguła mnożenia: etapy wyboru n_1 * n_2 * ...
        tab0 = make_geometry_diagram(
            'Reguła mnożenia: Liczba możliwości w doświadczeniu wieloetapowym',
            'N = n_1 \\cdot n_2 \\cdot n_3 \\cdots n_k',
            'Gdy wykonujemy wybór etap po etapie, łączną liczbę możliwości obliczamy mnożąc liczbę opcji dostępnych na każdym etapie.',
            polygons=[
                {'points': [[80, 80], [170, 80], [170, 160], [80, 160]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[215, 80], [305, 80], [305, 160], [215, 160]], 'fill': 'rgba(255, 184, 0, 0.1)', 'stroke': C_PRIMARY, 'strokeWidth': 2},
                {'points': [[350, 80], [440, 80], [440, 160], [350, 160]], 'fill': 'rgba(16, 185, 129, 0.1)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 125, 'y': 125, 'text': 'Etap 1: n₁', 'color': C_SKY, 'fontSize': 15, 'anchor': 'middle'},
                {'x': 192, 'y': 125, 'text': '·', 'color': C_PRIMARY, 'fontSize': 24, 'anchor': 'middle'},
                {'x': 260, 'y': 125, 'text': 'Etap 2: n₂', 'color': C_PRIMARY, 'fontSize': 15, 'anchor': 'middle'},
                {'x': 327, 'y': 125, 'text': '·', 'color': C_PRIMARY, 'fontSize': 24, 'anchor': 'middle'},
                {'x': 395, 'y': 125, 'text': 'Etap 3: n₃', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Łączna liczba', 'value': '$N = n_1 \\cdot n_2 \\cdot n_3$', 'color': C_PRIMARY},
                {'label': 'Słowo klucz', 'value': 'Spójnik „I” ⟹ Mnożenie', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Reguła mnożenia', 'N = n₁ · n₂ · ... · n_k', 'Etapy.', labels=[{'x': 260, 'y': 130, 'text': 'Mnożymy liczbę wyborów na każdym etapie', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', '3 koszulki i 4 pary spodni', '3 · 4 = 12 zestawów', labels=[{'x': 260, 'y': 130, 'text': '3 · 4 = 12 różnych strojów', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Dodawanie zamiast mnożenia', 'Nie dodawaj opcji między etapami!', 'Spójnik „I” oznacza mnożenie, spójnik „LUB” oznacza dodawanie!', labels=[{'x': 260, 'y': 130, 'text': 'Wybierasz to I to ⟹ MNOŻENIE!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 2:
        # Reguła dodawania: rozłączne przypadki
        tab0 = make_geometry_diagram(
            'Reguła dodawania: Sumowanie rozłącznych przypadków',
            'N = N_1 + N_2 + N_3,\\quad A \\cap B = \\emptyset',
            'Gdy zadanie można podzielić na kilka OSOBNYCH, rozłącznych scenariuszy, obliczamy możliwości w każdym przypadku i dodajemy wyniki.',
            polygons=[
                {'points': [[100, 80], [240, 80], [240, 180], [100, 180]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[280, 80], [420, 80], [420, 180], [280, 180]], 'fill': 'rgba(16, 185, 129, 0.1)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 170, 'y': 130, 'text': 'Przypadek 1 (N₁)', 'color': C_SKY, 'fontSize': 15, 'anchor': 'middle'},
                {'x': 260, 'y': 130, 'text': '+', 'color': C_PRIMARY, 'fontSize': 24, 'anchor': 'middle'},
                {'x': 350, 'y': 130, 'text': 'Przypadek 2 (N₂)', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Słowo klucz', 'value': 'Spójnik „LUB” ⟹ Dodawanie', 'color': C_PRIMARY},
                {'label': 'Warunek', 'value': 'Przypadki muszą być rozłączne (brak podwójnego zliczania)', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Reguła dodawania', 'N = N₁ + N₂', 'Rozłączne przypadki.', labels=[{'x': 260, 'y': 130, 'text': 'Gdy wybierasz opcję A LUB opcję B: N₁ + N₂', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Liczba kończy się na 0 LUB na 5', '100 + 100 = 200 liczb', labels=[{'x': 260, 'y': 130, 'text': 'Suma rozłącznych przypadków: N₁ + N₂ = 200', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Zdarzenia nierozłączne', 'Uważaj na dublowanie!', 'Jeśli przypadki mogą zajść jednocześnie, musisz odjąć część wspólną!', labels=[{'x': 260, 'y': 130, 'text': 'Nie zliczaj tego samego elementu dwa razy!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (3, 4, 5):
        # Tworzenie liczb: powtórzenia, różne cyfry i zero na 1. pozycji
        tab0 = make_geometry_diagram(
            'Tworzenie liczb: Cyfra zero na pierwszej pozycji jest ZABRONIONA',
            '\\text{Liczba 3-cyfrowa: } \\underbrace{9}_{\\text{bez } 0} \\cdot 10 \\cdot 10 = 900\\quad (\\text{lub } 9 \\cdot 9 \\cdot 8 = 648 \\text{ bez powtórzeń})',
            'Pierwszą cyfrą liczby wielocyfrowej NIE MOŻE być zero! Na pozycji setek mamy tylko 9 opcji (cyfry 1-9).',
            polygons=[
                {'points': [[100, 80], [180, 80], [180, 160], [100, 160]], 'fill': 'rgba(244, 63, 94, 0.1)', 'stroke': C_DANGER, 'strokeWidth': 2},
                {'points': [[220, 80], [300, 80], [300, 160], [220, 160]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[340, 80], [420, 80], [420, 160], [340, 160]], 'fill': 'rgba(16, 185, 129, 0.1)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 140, 'y': 125, 'text': '9 (bez 0!)', 'color': C_DANGER, 'fontSize': 15, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 260, 'y': 125, 'text': '10 (lub 9)', 'color': C_SKY, 'fontSize': 15, 'anchor': 'middle'},
                {'x': 380, 'y': 125, 'text': '10 (lub 8)', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'},
                {'x': 200, 'y': 125, 'text': '·', 'color': C_PRIMARY, 'fontSize': 24, 'anchor': 'middle'},
                {'x': 320, 'y': 125, 'text': '·', 'color': C_PRIMARY, 'fontSize': 24, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Z powtórzeniami', 'value': '$9 \\cdot 10 \\cdot 10 = 900$', 'color': C_SKY},
                {'label': 'Bez powtórzeń', 'value': '$9 \\cdot 9 \\cdot 8 = 648$', 'color': C_SUCCESS},
                {'label': 'Klucz', 'value': 'Pierwsza pozycja: cyfry $\\{1, 2, \\dots, 9\\}$', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_geometry_diagram('Okienka cyfr', '[ _ ][ _ ][ _ ]', 'Model okienkowy.', labels=[{'x': 260, 'y': 130, 'text': 'Okienko 1: 9 opcji | Okienko 2: 9 opcji | Okienko 3: 8 opcji', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: 4-cyfrowe o różnych cyfrach', '9 · 9 · 8 · 7 = 4536', 'Rozpisanie.', labels=[{'x': 260, 'y': 130, 'text': '9 · 9 · 8 · 7 = 4536 liczb', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: 10 na pierwszej pozycji', 'Liczba 035 to NIE jest liczba 3-cyfrowa!', 'Pamiętaj: na pierwszej pozycji jest 9 opcji, a nie 10!', labels=[{'x': 260, 'y': 130, 'text': 'Pierwsza cyfra ZAWSZE bez zera: 9 opcji!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (6, 7):
        # Liczby parzyste i podzielność
        tab0 = make_geometry_diagram(
            'Liczby parzyste i podzielne: Zaczynaj zliczanie od OSTATNIEJ cyfry!',
            '\\text{Parzysta: końcówka } \\in \\{0, 2, 4, 6, 8\\},\\quad \\text{Podzielna przez 5: końcówka } \\in \\{0, 5\\}',
            'Jeśli warunek dotyczy ostatniej cyfry, ZACZNIJ od wypełnienia ostatniego okienka, a dopiero potem wracaj do początku.',
            polygons=[
                {'points': [[100, 80], [180, 80], [180, 160], [100, 160]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[220, 80], [300, 80], [300, 160], [220, 160]], 'fill': 'rgba(255, 184, 0, 0.1)', 'stroke': C_PRIMARY, 'strokeWidth': 2},
                {'points': [[340, 80], [420, 80], [420, 160], [340, 160]], 'fill': 'rgba(16, 185, 129, 0.2)', 'stroke': C_SUCCESS, 'strokeWidth': 2.5}
            ],
            labels=[
                {'x': 140, 'y': 125, 'text': 'Krok 2', 'color': C_SKY, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 260, 'y': 125, 'text': 'Krok 3', 'color': C_PRIMARY, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 380, 'y': 125, 'text': 'KROK 1 (koniec)', 'color': C_SUCCESS, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Parzysta z powtórzeniami', 'value': '$9 \\cdot 10 \\cdot 5 = 450$', 'color': C_SUCCESS},
                {'label': 'Podzielna przez 5', 'value': '$9 \\cdot 10 \\cdot 2 = 180$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Końcówki', '{0, 2, 4, 6, 8}', 'Parzystość.', labels=[{'x': 260, 'y': 130, 'text': 'Ostatnia cyfra determinuje parzystość (5 możliwości)', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: 3-cyfrowe parzyste', '9 · 10 · 5 = 450', 'Obliczenie.', labels=[{'x': 260, 'y': 130, 'text': '9 (setki) · 10 (dziesiątki) · 5 (jedności) = 450', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Cyfra 0 na końcu bez powtórzeń', 'Rozbij na 2 przypadki!', 'Gdy cyfry się nie powtarzają, rozbij: I (zero na końcu) oraz II (inna parzysta na końcu)!', labels=[{'x': 260, 'y': 130, 'text': 'Zero na końcu: rozbij na dwa przypadki!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (8, 9, 10):
        # Silnia n!, permutacje i elementy obok siebie (metoda paczki/bloku)
        tab0 = make_geometry_diagram(
            'Permutacje $P_n = n!$ oraz metoda paczki (elementy obok siebie)',
            'P_n = n! = 1 \\cdot 2 \\cdot 3 \\cdots n,\\quad \\text{Paczka z 2 osób: } (n-1)! \\cdot 2!',
            'Gdy dwie osoby MUSZĄ siedzieć obok siebie, związujemy je w jedną „paczkę”. Pamiętaj o pomnożeniu przez kolejność wewnątrz paczki ($2!$).',
            polygons=[
                # Paczka (związani)
                {'points': [[100, 80], [220, 80], [220, 160], [100, 160]], 'fill': 'rgba(255, 184, 0, 0.15)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5},
                # Pozostałe osoby
                {'points': [[250, 80], [310, 80], [310, 160], [250, 160]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[340, 80], [400, 80], [400, 160], [340, 160]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 160, 'y': 120, 'text': '[ A, B ] (paczka)', 'color': C_PRIMARY, 'fontSize': 14, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 280, 'y': 120, 'text': 'C', 'color': C_SKY, 'fontSize': 16, 'anchor': 'middle'},
                {'x': 370, 'y': 120, 'text': 'D', 'color': C_SKY, 'fontSize': 16, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Silnia 4!', 'value': '$4! = 24$', 'color': C_SKY},
                {'label': 'Paczka [A,B] + C + D', 'value': '$3! \\cdot 2! = 6 \\cdot 2 = 12$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Silnia', 'n! = 1 · 2 · ... · n', 'Definicja.', labels=[{'x': 260, 'y': 130, 'text': '0! = 1, 1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: Ustawienie 5 osób w kolejce', '5! = 120', 'Wszystkie permutacje.', labels=[{'x': 260, 'y': 130, 'text': '5! = 5 · 4 · 3 · 2 · 1 = 120', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Kolejność w paczce 2!', 'Osoby w paczce mogą zamieniać się miejscami!', 'Zawsze mnóż przez k! permutacji elementów wewnątrz paczki!', labels=[{'x': 260, 'y': 130, 'text': 'Pamiętaj o pomnożeniu przez 2! (kolejność AB lub BA)!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    else:
        # l_num in (11, 12, 13, 14, 15): Kombinacje i wybór podzbioru (Newton)
        tab0 = make_geometry_diagram(
            'Kombinacje bez powtórzeń: Symbol Newtona $\\binom{n}{k}$ (kolejność BEZ znaczenia)',
            'C_n^k = \\binom{n}{k} = \\frac{n!}{k!(n - k)!}',
            'Stosujemy, gdy wybieramy podzbiór $k$ elementów z $n$ i KOLEJNOŚĆ nie ma żadnego znaczenia (np. skład delegacji, losowanie liczb w Lotto, wybór 2 wierzchołków do odcinka).',
            polygons=[{'points': [[100, 70], [420, 70], [420, 190], [100, 190]], 'fill': 'rgba(16, 185, 129, 0.08)', 'stroke': C_SUCCESS, 'strokeWidth': 2}],
            labels=[
                {'x': 260, 'y': 115, 'text': 'n po k = n! / (k! · (n-k)!)', 'color': C_PRIMARY, 'fontSize': 20, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 260, 'y': 155, 'text': 'Wybór k osób z grupy n (kolejność nie gra roli)', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Przekątne n-kąta', 'value': '$\\binom{n}{2} - n = \\frac{n(n-3)}{2}$', 'color': C_PRIMARY},
                {'label': 'Wybór 2 z n', 'value': '$\\binom{n}{2} = \\frac{n(n-1)}{2}$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór Newtona', 'n! / (k!(n-k)!)', 'Kombinacje.', labels=[{'x': 260, 'y': 130, 'text': 'Kombinacja: kolejność NIE ma znaczenia', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: Wybór 2 osób z 10', '10 po 2 = (10·9)/2 = 45', 'Szybki wzór.', labels=[{'x': 260, 'y': 130, 'text': 'C₁₀² = (10 · 9) / 2 = 45 par', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Permutacja vs Kombinacja', 'Czy kolejność ma znaczenie?', 'Jeśli wybierasz przewodniczącego i zastępcę ⟹ KOLEJNOŚĆ MA ZNACZENIE (wariacja)! Jeśli po prostu delegację ⟹ KOMBINACJA!', labels=[{'x': 260, 'y': 130, 'text': 'Brak ról ⟹ dzielisz przez k! (kombinacja)!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
