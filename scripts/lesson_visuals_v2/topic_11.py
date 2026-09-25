"""
topic_11.py - Dział 11: Ciągi liczbowe (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals with Interactive Mafs Engine
100% Real KaTeX, 0% Emojis, Pure Isolated Sequence Points (Discrete Domain n in N+).
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_11_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L11.1: Wzór ogólny ciągu, dyskretna dziedzina n w N+ i badanie wyrazów dodatnich
        plot_data = {
            'xRange': [0, 6],
            'yRange': [0, 11],
            'gridStep': 1,
            'points': [
                {'x': 1, 'y': 1, 'color': C_PRIMARY, 'label': 'a₁ = 1', 'attach': 'n'},
                {'x': 2, 'y': 3, 'color': C_PRIMARY, 'label': 'a₂ = 3', 'attach': 'n'},
                {'x': 3, 'y': 5, 'color': C_SUCCESS, 'label': 'a₃ = 5', 'attach': 'n'},
                {'x': 4, 'y': 7, 'color': C_SUCCESS, 'label': 'a₄ = 7', 'attach': 'n'},
                {'x': 5, 'y': 9, 'color': C_SUCCESS, 'label': 'a₅ = 9', 'attach': 'n'}
            ],
            'labels': [
                {'x': 3.0, 'y': 10.2, 'text': 'Dyskretne punkty: n ∈ {1, 2, 3, 4, 5}', 'color': C_SKY, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Dyskretna dziedzina ciągu: Punkty izolowane dla n ∈ {1, 2, 3, ...}',
            badge=r'n \in \{1, 2, 3, \dots\} \quad (\text{nigdy } n \le 0 \text{ ani } n \notin \mathbb{C})',
            caption='Wykres ciągu to NIE jest linia ciągła! To pojedyncze, odizolowane punkty o odciętych n = 1, 2, 3, ... na osi poziomej.',
            plotData=plot_data,
            metrics=[
                {'label': 'Dziedzina', 'value': r'$n \in \{1, 2, 3, \dots\}$ (liczby naturalne dodatnie)', 'color': C_SKY},
                {'label': 'Wyrazy dodatnie', 'value': r'$a_n > 0 \text{ dla każdego } n \ge 1$', 'color': C_SUCCESS},
                {'label': 'Monotoniczność', 'value': r'$a_{n+1} > a_n \longrightarrow \text{ciąg rosnący}$', 'color': C_PRIMARY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Badanie wyrazów ujemnych ciągu krok po kroku",
            badge=r"a_n = 2n - 15 < 0 \longrightarrow 2n < 15 \longrightarrow n < 7{,}5 \longrightarrow n \in \{1, 2, \dots, 7\}",
            caption="Układasz nierówność an < 0, rozwiązujesz ją i wybierasz liczby naturalne dodatnie n.",
            steps=[
                {'num': 1, 'title': 'Ułóż nierówność', 'desc': r'Szukamy wyrazów ujemnych: $a_n < 0 \implies 2n - 15 < 0$.', 'color': C_SKY},
                {'num': 2, 'title': 'Wyznacz ograniczenie na n', 'desc': r'$2n < 15 \implies n < \frac{15}{2} = 7{,}5$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zlicz liczby naturalne dodatnie', 'desc': r'Warunek $n \in \mathbb{N}^+$ spełniają: $n \in \{1, 2, 3, 4, 5, 6, 7\}$. Ciąg ma dokładnie 7 wyrazów ujemnych.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Warunek ujemności', 'value': '$a_n < 0$', 'color': C_DANGER},
                {'label': 'Ograniczenie', 'value': '$n < 7{,}5$', 'color': C_PRIMARY},
                {'label': 'Liczba wyrazów', 'value': '7 wyrazów ujemnych', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zapominanie o dziedzinie n ∈ N+ w ciągach",
            badge=r"n < 7{,}5 \implies 7 \text{ wyrazów} \neq 8 \text{ wyrazów (zakaz wliczania } n = 0!)",
            caption="Wskaźnik n w ciągach to ZAWSZE liczba naturalna DODATNIA (1, 2, 3, ...)! Nigdy nie istnieje wyraz a₀ ani ujemne indeksy.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': 'Wliczenie $n = 0$ i podanie 8 wyrazów (0 pkt)', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': 'Błędne zaokrąglenie w górę do 8 zamiast w dół do 7', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Dziedzina to zawsze $n \in \{1, 2, 3, \dots\}$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L11.2: Ciąg arytmetyczny - stała różnica r oraz suma Sn
        plot_data = {
            'xRange': [0, 6],
            'yRange': [0, 11],
            'gridStep': 1,
            'points': [
                {'x': 1, 'y': 3, 'color': C_SKY, 'label': 'a₁ = 3', 'attach': 'n'},
                {'x': 2, 'y': 5, 'color': C_SKY, 'label': 'a₂ = 5 (+r)', 'attach': 'n'},
                {'x': 3, 'y': 7, 'color': C_PRIMARY, 'label': 'a₃ = 7 (+r)', 'attach': 'n'},
                {'x': 4, 'y': 9, 'color': C_SUCCESS, 'label': 'a₄ = 9 (+r)', 'attach': 'n'}
            ],
            'labels': [
                {'x': 2.5, 'y': 10.2, 'text': 'Stała różnica r = 2: a_n = 3 + (n-1)·2', 'color': C_PRIMARY, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Ciąg arytmetyczny: Stały krok r pomiędzy kolejnymi wyrazami',
            badge=r'a_n = a_1 + (n-1)r \quad | \quad S_n = \frac{a_1 + a_n}{2} \cdot n',
            caption='Każdy kolejny wyraz powstaje przez dodanie tej samej stałej różnicy r: a_2 = a_1 + r, a_3 = a_1 + 2r.',
            plotData=plot_data,
            metrics=[
                {'label': 'Różnica ciągu', 'value': r'$r = a_{n+1} - a_n = \text{const}$', 'color': C_PRIMARY},
                {'label': 'Wzór ogólny', 'value': r'$a_n = a_1 + (n-1)r$', 'color': C_SKY},
                {'label': 'Suma n wyrazów', 'value': r'$S_n = \frac{a_1 + a_n}{2} \cdot n$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Trik różnicy indeksów w ciągu arytmetycznym krok po kroku",
            badge=r"a_3 = 7, \; a_8 = 22 \implies a_8 - a_3 = 5r \implies 15 = 5r \implies r = 3",
            caption="Odejmując wyrazy od siebie, różnica indeksów daje liczbę kroków r bez układania układu równań.",
            steps=[
                {'num': 1, 'title': 'Zastosuj różnicę indeksów', 'desc': r'$a_8 - a_3 = (8 - 3) \cdot r = 5r$.', 'color': C_SKY},
                {'num': 2, 'title': 'Podstaw wartości i oblicz r', 'desc': r'$22 - 7 = 5r \implies 15 = 5r \implies r = 3$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Cofnij się do wyrazu a₁', 'desc': r'$a_1 = a_3 - 2r = 7 - 2 \cdot 3 = 1$. Gotowy wzór: $a_n = 1 + (n-1) \cdot 3$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Liczba kroków r', 'value': r'$8 - 3 = 5$ kroków', 'color': C_SKY},
                {'label': 'Różnica ciągu', 'value': '$r = 3$', 'color': C_SUCCESS},
                {'label': 'Pierwszy wyraz', 'value': '$a_1 = 1$', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie liczby różnic r i gubienie mnożenia przez n w sumie",
            badge=r"a_8 = a_3 + 5r \neq a_3 + 8r \quad \text{oraz} \quad S_n = \frac{a_1 + a_n}{2} \cdot n",
            caption="Pomiędzy wyrazem 3 a 8 jest dokładnie 5 skoków r (8 - 3 = 5)! We wzorze na sumę Sn pamiętaj o pomnożeniu przez liczbę wyrazów n.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Zapis $a_8 = a_3 + 8r$ (błędna liczba kroków)', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Zapomnienie o $\cdot n$ we wzorze na sumę $S_n$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'$a_k - a_m = (k - m)r$ oraz $S_n = \frac{a_1 + a_n}{2} \cdot n$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L11.3: Ciąg geometryczny - stały iloraz q oraz suma Sn
        plot_data = {
            'xRange': [0, 5],
            'yRange': [0, 10],
            'gridStep': 1,
            'points': [
                {'x': 1, 'y': 1, 'color': C_SKY, 'label': 'a₁ = 1', 'attach': 'n'},
                {'x': 2, 'y': 2, 'color': C_SKY, 'label': 'a₂ = 2 (·q)', 'attach': 'n'},
                {'x': 3, 'y': 4, 'color': C_PRIMARY, 'label': 'a₃ = 4 (·q)', 'attach': 'n'},
                {'x': 4, 'y': 8, 'color': C_SUCCESS, 'label': 'a₄ = 8 (·q)', 'attach': 'n'}
            ],
            'labels': [
                {'x': 2.5, 'y': 9.2, 'text': 'Stały iloraz q = 2: a_n = 1 · 2^(n-1)', 'color': C_PURPLE, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Ciąg geometryczny: Mnożenie przez stały iloraz q',
            badge=r'a_n = a_1 \cdot q^{n-1} \quad | \quad S_n = a_1 \cdot \frac{1 - q^n}{1 - q}',
            caption='Każdy kolejny wyraz powstaje przez pomnożenie poprzedniego przez stałą liczbę q: a_2 = a_1 · q, a_3 = a_1 · q².',
            plotData=plot_data,
            metrics=[
                {'label': 'Iloraz ciągu', 'value': r'$q = \frac{a_{n+1}}{a_n} = \text{const}$', 'color': C_PURPLE},
                {'label': 'Wzór ogólny', 'value': r'$a_n = a_1 \cdot q^{n-1}$', 'color': C_PRIMARY},
                {'label': 'Suma n wyrazów', 'value': r'$S_n = a_1 \cdot \frac{1 - q^n}{1 - q}$ (dla $q \neq 1$)', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Trik ilorazu indeksów w ciągu geometrycznym krok po kroku",
            badge=r"a_2 = 6, \; a_5 = 48 \implies \frac{a_5}{a_2} = q^3 \implies 8 = q^3 \implies q = 2",
            caption="Dzieląc wyrazy ciągu geometrycznego, różnica indeksów daje wykładnik potęgi ilorazu q.",
            steps=[
                {'num': 1, 'title': 'Zastosuj iloraz wyrazów', 'desc': r'$\frac{a_5}{a_2} = \frac{a_1 q^4}{a_1 q} = q^{5 - 2} = q^3$.', 'color': C_SKY},
                {'num': 2, 'title': 'Podstaw liczby i spierwiastkuj', 'desc': r'$\frac{48}{6} = 8 \implies q^3 = 8 \implies q = 2$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wyznacz a₁ i sumę S₄', 'desc': r'$a_1 = \frac{a_2}{q} = \frac{6}{2} = 3$. Suma: $S_4 = 3 \cdot \frac{1 - 2^4}{1 - 2} = 3 \cdot 15 = 45$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Potęga ilorazu', 'value': r'$q^{5-2} = q^3 = 8$', 'color': C_SKY},
                {'label': 'Iloraz q', 'value': '$q = 2$', 'color': C_PURPLE},
                {'label': 'Suma S₄', 'value': '$S_4 = 45$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Dwa rozwiązania przy parzystej potędze ilorazu (q² = 9)",
            badge=r"q^2 = 9 \implies q = 3 \quad \text{lub} \quad q = -3 \quad (\text{dwa różne ciągi!})",
            caption="Gdy różnica indeksów jest parzysta (np. a₃ / a₁ = q²), równanie ma DWA rozwiązania: q > 0 i q < 0 (ciąg ze zmiennym znakiem), o ile treść zadania nie precyzuje wyrazów dodatnich!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zgubienie $q = -3$ gdy w treści brak słów "o wyrazach dodatnich"', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'$q^2 = a \implies q = \pm \sqrt{a}$ (sprawdź założenia zadania)', 'color': C_SUCCESS},
                {'label': 'Ciąg naprzemienny', 'value': 'Dla $q < 0$ wyrazy mają na przemian znaki $+$ i $-$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 4:
        # L11.4: Zależność trzech sąsiednich wyrazów (arytmetyczny vs geometryczny)
        plot_data = {
            'xRange': [0, 5],
            'yRange': [0, 12],
            'gridStep': 1,
            'points': [
                {'x': 1, 'y': 2, 'color': C_PRIMARY, 'label': 'x = a₁ = 2', 'attach': 'n'},
                {'x': 2, 'y': 6, 'color': C_SUCCESS, 'label': 'y = a₂ = 6 (środek)', 'attach': 'n'},
                {'x': 3, 'y': 10, 'color': C_PRIMARY, 'label': 'z = a₃ = 10', 'attach': 'n'}
            ],
            'labels': [
                {'x': 2.5, 'y': 11.2, 'text': 'y = (x + z)/2  ->  6 = (2 + 10)/2', 'color': C_SUCCESS, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Trzy kolejne wyrazy (x, y, z): Średnia arytmetyczna vs geometryczna',
            badge=r'\text{Arytmetyczny: } y = \frac{x + z}{2} \quad | \quad \text{Geometryczny: } y^2 = x \cdot z',
            caption='Wyraz środkowy jest średnią arytmetyczną skrajnych w ciągu arytmetycznym, a w geometrycznym jego kwadrat równa się iloczynowi skrajnych.',
            plotData=plot_data,
            metrics=[
                {'label': 'Arytmetyczny', 'value': '$2y = x + z$', 'color': C_PRIMARY},
                {'label': 'Geometryczny', 'value': r'$y^2 = x \cdot z$', 'color': C_PURPLE},
                {'label': 'Złota zasada CKE', 'value': 'Zawsze zapisz równanie na wyraz środkowy', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Równanie trzech kolejnych wyrazów krok po kroku",
            badge=r"(2, \; x, \; 18) \text{ geometryczny} \implies x^2 = 2 \cdot 18 \implies x^2 = 36 \implies x = 6 \quad (x > 0)",
            caption="Wypisujesz zależność wyrazu środkowego, rozwiązujesz równanie i weryfikujesz znaki wyrazów.",
            steps=[
                {'num': 1, 'title': 'Zastosuj wzór na wyraz środkowy', 'desc': r'Ciąg geometryczny: $a_2^2 = a_1 \cdot a_3 \implies x^2 = 2 \cdot 18$.', 'color': C_SKY},
                {'num': 2, 'title': 'Rozwiąż równanie kwadratowe', 'desc': r'$x^2 = 36 \longrightarrow x = 6 \text{ lub } x = -6$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zweryfikuj warunki zadania', 'desc': r'Jeśli w treści jest "ciąg o wyrazach dodatnich", to $x = 6$. Jeśli nie ma, obie odpowiedzi są poprawne!', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Warunek środka', 'value': r'$y^2 = x \cdot z$', 'color': C_PURPLE},
                {'label': 'Kandydaci', 'value': r'$x = \pm 6$', 'color': C_PRIMARY},
                {'label': 'Dla wyrazów dodatnich', 'value': '$x = 6$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Pomylenie wzoru ciągu arytmetycznego z geometrycznym",
            badge=r"\text{Arytmetyczny: } 2y = x + z \neq y^2 = x \cdot z \text{ (Geometryczny)}",
            caption="W ciągu arytmetycznym dodajemy (2y = x + z), w geometrycznym mnożymy (y² = x · z)! Pomylenie tych wzorów to automatyczne 0 pkt w zadaniu otwartym.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Użycie $2y = x + z$ w zadaniu o ciągu geometrycznym', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Arytmetyczny $\implies y = \frac{x+z}{2}$, Geometryczny $\implies y^2 = xz$', 'color': C_SUCCESS},
                {'label': 'Złota zasada CKE', 'value': 'Zawsze sprawdź dwa razy słowo klucz: "arytmetyczny" czy "geometryczny"', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
