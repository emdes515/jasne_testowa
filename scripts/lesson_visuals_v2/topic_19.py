"""
topic_19.py - Dział 19: Kombinatoryka i Rachunek Prawdopodobieństwa (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_19_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L19.1: Reguła mnożenia i reguła dodawania
        tab0 = make_step_flow_diagram(
            title="Reguła mnożenia – zliczanie wyborów wieloetapowych",
            badge=r"N = n_1 \cdot n_2 \cdot \dots \cdot n_k \quad | \quad \text{Cyfry o różnych wartościach / z powtórzeniami}",
            caption="Gdy dokonujemy wyboru k-elementowego i każdy etap ma określoną liczbę możliwości niezależnych od poprzednich wyborów, mnożymy liczby możliwości.",
            steps=[
                {'num': 1, 'title': 'Pierwsza pozycja', 'desc': r'Wybór 1. cyfry/elementu: $n_1$ możliwości (dla liczb pamiętaj: pierwsza cyfra $\neq 0$).', 'color': C_SKY},
                {'num': 2, 'title': 'Kolejne pozycje', 'desc': r'Dla cyfr bez powtórzeń liczba możliwości maleje o 1 na każdym kroku: $n_1 \cdot (n_1 - 1) \cdot \dots$', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Iloczyn możliwości', 'desc': r'Mnożymy wyniki cząstkowe uzyskując całkowitą liczbę zdarzeń elementarnych.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Z powtórzeniami', 'value': r'$n^k$ możliwości', 'color': C_SKY},
                {'label': 'Bez powtórzeń', 'value': r'$n(n-1)\dots(n-k+1)$', 'color': C_PRIMARY},
                {'label': 'Zero na początku', 'value': r'Liczba wielocyfrowa nie zaczyna się od 0', 'color': C_DANGER}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Tworzenie kodów czterocyfrowych ze zbioru 4 cyfr krok po kroku",
            badge=r"\{1, 3, 6, 8\} \implies \text{z powtórzeniami: } 4 \cdot 4 \cdot 4 \cdot 4 = 4^4 = 256, \quad \text{bez powtórzeń: } 4 \cdot 3 \cdot 2 \cdot 1 = 24",
            caption="Zadanie maturalne CKE maj 2024: rozważamy czterocyfrowe kody utworzone wyłącznie z cyfr ze zbioru czteroelementowego.",
            steps=[
                {'num': 1, 'title': 'Określ liczbę dostępnych cyfr', 'desc': r'Zbiór $\{1, 3, 6, 8\}$ zawiera dokładnie 4 cyfry (brak zera).', 'color': C_SKY},
                {'num': 2, 'title': 'Zidentyfikuj warunek zadania', 'desc': r'Jeśli cyfry MOGĄ się powtarzać: na każdej z 4 pozycji mamy 4 opcje.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz całkowitą liczbę kodów', 'desc': r'$N = 4 \cdot 4 \cdot 4 \cdot 4 = 256$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Liczba cyfr w zbiorze', 'value': '$4$', 'color': C_SKY},
                {'label': 'Liczba pozycji', 'value': '$4$', 'color': C_PRIMARY},
                {'label': 'Wynik N', 'value': '$256$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Cyfra zero na pierwszym miejscu lub mylenie permutacji z wariacjami",
            badge=r"\text{Pierwsza cyfra liczby naturalnej } \neq 0 \quad | \quad \text{z powtórzeniami vs bez powtórzeń}",
            caption="W tworzeniu LICZB (np. trzycyfrowych) pierwsza cyfra NIE MOŻE być zerem! W tworzeniu KODÓW PIN zero na początku jest dozwolone.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Wstawienie zera na pierwszej pozycji liczby naturalnej (np. $035$ nie jest 3-cyfrowa)', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Mylenie warunku "cyfry mogą się powtarzać" z "cyfry są różne"', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Uważnie czytaj treść: "różne cyfry" $\longrightarrow$ zmniejszaj liczbę opcji o 1', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L19.2: Klasyczna definicja prawdopodobieństwa P(A) = |A| / |Omega|
        tab0 = make_geometry_diagram(
            title="Klasyczna definicja prawdopodobieństwa i tabela 6x6 rzutu dwiema kostkami",
            badge=r"P(A) = \frac{|A|}{|\Omega|}, \quad 0 \le P(A) \le 1, \quad |\Omega| = 6 \cdot 6 = 36",
            caption="W dwukrotnym rzucie kostką przestrzeń zdarzeń elementarnych Omega liczy 36 par. Najbezpieczniej narysować tabelę 6 na 6 i zaznaczyć sprzyjające zdarzenia.",
            polygons=[
                {
                    'points': [[160, 60], [360, 60], [360, 220], [160, 220]],
                    'fill': 'rgba(14, 21, 34, 0.8)',
                    'stroke': C_PRIMARY,
                    'strokeWidth': 2
                }
            ],
            segments=[
                # Linie siatki tabeli
                {'from': [160, 87], 'to': [360, 87], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [160, 114], 'to': [360, 114], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [160, 140], 'to': [360, 140], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [160, 167], 'to': [360, 167], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [160, 194], 'to': [360, 194], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [193, 60], 'to': [193, 220], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [226, 60], 'to': [226, 220], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [260, 60], 'to': [260, 220], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [293, 60], 'to': [293, 220], 'color': C_SLATE, 'strokeWidth': 1},
                {'from': [326, 60], 'to': [326, 220], 'color': C_SLATE, 'strokeWidth': 1}
            ],
            labels=[
                {'x': 260, 'y': 45, 'text': 'I rzut (1, 2, 3, 4, 5, 6)', 'color': C_SKY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 140, 'y': 140, 'text': 'II rzut', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'end'}
            ],
            metrics=[
                {'label': 'Moc Omega', 'value': r'$|\Omega| = 6^2 = 36$', 'color': C_PRIMARY},
                {'label': 'Prawdopodobieństwo', 'value': r'$P(A) = \frac{|A|}{|\Omega|}$', 'color': C_SUCCESS},
                {'label': 'Przedział wartości', 'value': r'$P(A) \in \langle 0, 1 \rangle$', 'color': C_SKY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Prawdopodobieństwo wyrzucenia sumy równej 7 krok po kroku",
            badge=r"A = \{(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)\} \implies |A| = 6 \implies P(A) = \frac{6}{36} = \frac{1}{6}",
            caption="Wypisujemy wszystkie pary dające daną sumę oczek i dzielimy przez 36.",
            steps=[
                {'num': 1, 'title': 'Wyznacz moc przestrzeni zdarzeń', 'desc': r'$|\Omega| = 6 \cdot 6 = 36$ par wyników.', 'color': C_SKY},
                {'num': 2, 'title': 'Wypisz zdarzenia sprzyjające A', 'desc': r'Pary dające sumę 7: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$. Jest ich $|A| = 6$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz prawdopodobieństwo i uprość', 'desc': r'$P(A) = \frac{|A|}{|\Omega|} = \frac{6}{36} = \frac{1}{6}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Moc zbioru A', 'value': '$|A| = 6$', 'color': C_SKY},
                {'label': 'Moc zbioru Omega', 'value': '$|\\Omega| = 36$', 'color': C_PRIMARY},
                {'label': 'Prawdopodobieństwo', 'value': r'$P(A) = \frac{1}{6}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Utożsamianie par (a, b) i (b, a) lub wynik P(A) > 1",
            badge=r"(1, 6) \neq (6, 1) \quad | \quad 0 \le P(A) \le 1",
            caption="Pary (1, 6) i (6, 1) to DWA RÓŻNE zdarzenia elementarne (inna kolejność na kostkach!). Prawdopodobieństwo NIGDY nie może przekraczać 1 ani być ujemne.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Uznanie, że para $(2, 5)$ i $(5, 2)$ to to samo zdarzenie', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Wynik $P(A) > 1$ (np. odwrócenie ułamka $\frac{|\Omega|}{|A|}$)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Zawsze rysuj tabelę $6 \times 6$, aby nie zgubić symetrycznych par', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L19.3: Drzewo stochastyczne i losowanie bez zwracania
        tab0 = make_geometry_diagram(
            title="Drzewo stochastyczne w losowaniu wieloetapowym bez zwracania",
            badge=r"P(A) = \sum \text{iloczyn prawdopodobieństw wzdłuż gałęzi} \quad | \quad \text{Bez zwracania: } N \longrightarrow N - 1",
            caption="Wzdłuż gałęzi drzewa prawdopodobieństwa MNOŻYMY, a wyniki różnych gałęzi sprzyjających DODAJEMY. Przy losowaniu bez zwracania mianownik maleje o 1.",
            segments=[
                # Korzeń (100, 140) -> I etap: B(220, 80), C(220, 200)
                {'from': [100, 140], 'to': [220, 80], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [100, 140], 'to': [220, 200], 'color': C_SKY, 'strokeWidth': 2},
                # II etap z B(220, 80) -> BB(360, 50), BC(360, 110)
                {'from': [220, 80], 'to': [360, 50], 'color': C_PRIMARY, 'strokeWidth': 1.8},
                {'from': [220, 80], 'to': [360, 110], 'color': C_SKY, 'strokeWidth': 1.8},
                # II etap z C(220, 200) -> CB(360, 170), CC(360, 230)
                {'from': [220, 200], 'to': [360, 170], 'color': C_PRIMARY, 'strokeWidth': 1.8},
                {'from': [220, 200], 'to': [360, 230], 'color': C_SKY, 'strokeWidth': 1.8}
            ],
            points=[
                {'x': 100, 'y': 140, 'color': C_SLATE, 'label': 'Start', 'attach': 'w'},
                {'x': 220, 'y': 80, 'color': C_PRIMARY, 'label': 'Biała', 'attach': 'n'},
                {'x': 220, 'y': 200, 'color': C_SKY, 'label': 'Czarna', 'attach': 's'},
                {'x': 360, 'y': 50, 'color': C_SUCCESS, 'label': '(B, B)', 'attach': 'e'},
                {'x': 360, 'y': 110, 'color': C_MUTED, 'label': '(B, C)', 'attach': 'e'},
                {'x': 360, 'y': 170, 'color': C_MUTED, 'label': '(C, B)', 'attach': 'e'},
                {'x': 360, 'y': 230, 'color': C_SUCCESS, 'label': '(C, C)', 'attach': 'e'}
            ],
            labels=[
                {'x': 150, 'y': 100, 'text': 'p₁', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 150, 'y': 180, 'text': 'p₂', 'color': C_SKY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Wzdłuż gałęzi', 'value': 'Mnożymy prawdopodobieństwa', 'color': C_PRIMARY},
                {'label': 'Pomiędzy gałęziami', 'value': 'Dodajemy prawdopodobieństwa', 'color': C_SUCCESS},
                {'label': 'Bez zwracania', 'value': r'Mianownik w II etapie to $N - 1$', 'color': C_DANGER}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Losowanie dwóch kul z urny bez zwracania krok po kroku",
            badge=r"4 \text{ białe}, \; 6 \text{ czarnych} \implies P(B_1, B_2) = \frac{4}{10} \cdot \frac{3}{9} = \frac{12}{90} = \frac{2}{15}",
            caption="W urnie jest 10 kul. Po wylosowaniu pierwszej białej w urnie zostają 3 białe i łącznie 9 kul.",
            steps=[
                {'num': 1, 'title': 'Prawdopodobieństwo pierwszej białej', 'desc': r'$P(B_1) = \frac{4}{10}$.', 'color': C_SKY},
                {'num': 2, 'title': 'Zmniejsz liczby kul w drugim losowaniu', 'desc': r'Zostało $4 - 1 = 3$ kule białe oraz $10 - 1 = 9$ kul łącznie: $P(B_2 | B_1) = \frac{3}{9}$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Pomnóż prawdopodobieństwa', 'desc': r'$P(B_1 \cap B_2) = \frac{4}{10} \cdot \frac{3}{9} = \frac{12}{90} = \frac{2}{15}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'I losowanie', 'value': r'$\frac{4}{10}$', 'color': C_SKY},
                {'label': 'II losowanie', 'value': r'$\frac{3}{9}$', 'color': C_PRIMARY},
                {'label': 'Wynik łączny', 'value': r'$\frac{2}{15}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Niezmniejszenie mianownika w losowaniu bez zwracania",
            badge=r"\frac{4}{10} \cdot \frac{3}{9} \quad (\text{BEZ ZWRACANIA}) \neq \frac{4}{10} \cdot \frac{4}{10} \quad (\text{ze zwracaniem})",
            caption="W losowaniu 'bez zwracania' po każdym etapie w puli jest o JEDNĄ kulę mniej. Pozostawienie mianownika 10 to automatyczna utrata punktu.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zapisanie $\frac{4}{10} \cdot \frac{4}{10}$ dla losowania bez zwracania', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Zawsze zmniejszaj mianownik o 1: $\frac{k}{n} \cdot \frac{k-1}{n-1}$', 'color': C_SUCCESS},
                {'label': 'Zdarzenie przeciwne', 'value': r'$P(A) = 1 - P(A\')$ gdy w pytaniu jest "co najmniej jeden"', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
