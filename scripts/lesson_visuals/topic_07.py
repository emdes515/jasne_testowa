"""
topic_07.py - Dział 7: Ciągi Liczbowe (15 unikalnych, bogatych lekcji)
Każda lekcja posiada autentyczną, przestrzenną infografikę wektorową
(łańcuchy wagoników wyrazów, schematy kroków procesowych, osie ze strefami,
karty porównawcze CKE) bez surowego kodu LaTeX w węzłach SVG.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_number_line, make_geometry_diagram, make_plot_diagram,
    make_sequence_chain_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_07_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Lekcja 7.1: Pojęcie ciągu liczbowego i obliczanie wyrazów z wzoru ogólnego
        tab0 = make_plot_diagram(
            'Ciąg liczbowy jako funkcja określona na liczbach naturalnych ℕ⁺',
            '$n \mapsto a_n,\quad n \in \{1, 2, 3, 4, \dots\}$',
            'Ciąg to funkcja, której argumentami mogą być TYLKO dodatnie liczby naturalne: $n=1, 2, 3, \dots$. Na wykresie to wyłącznie izolowane punkty!',
            segments=[
                {'from': [40, 200], 'to': [480, 200], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [80, 240], 'to': [80, 30], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            points=[
                {'x': 140, 'y': 160, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₁ (n=1)', 'labelPosition': 'top'},
                {'x': 200, 'y': 130, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₂ (n=2)', 'labelPosition': 'top'},
                {'x': 260, 'y': 100, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₃ (n=3)', 'labelPosition': 'top'},
                {'x': 320, 'y': 70, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₄ (n=4)', 'labelPosition': 'top'}
            ],
            metrics=[
                {'label': 'Dziedzina ciągu', 'value': '$n \in \mathbb{N}^+ = \{1, 2, 3, \dots\}$', 'color': C_SUCCESS},
                {'label': 'Wyraz ogólny', 'value': '$a_n$ (przepis na n-ty wyraz)', 'color': C_PRIMARY},
                {'label': 'Izolowane punkty', 'value': 'NIE łącz punktów ciągłą linią!', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_sequence_chain_diagram(
                'Obliczanie kolejnych wyrazów z wzoru ogólnego',
                'a_n = 3n - 1',
                'Podstawiaj kolejne liczby naturalne $n=1, 2, 3, \dots$, aby otrzymać kolejne wyrazy ciągu.',
                terms=['a₁ = 2', 'a₂ = 5', 'a₃ = 8', 'a₄ = 11'],
                op_label='+3',
                is_geom=False,
                note='Każdy wyraz ma swój numer n ∈ {1, 2, 3, ...}',
                metrics=[
                    {'label': 'Dla n = 1', 'value': '$a_1 = 3(1) - 1 = 2$', 'color': C_PRIMARY},
                    {'label': 'Dla n = 2', 'value': '$a_2 = 3(2) - 1 = 5$', 'color': C_SUCCESS}
                ]
            )
        ]
        tab2 = make_step_flow_diagram(
            'Przykład: Wyznaczanie a₅ ze wzoru aₙ = n² - 2n',
            'a_5 = 5^2 - 2(5) = 25 - 10 = 15',
            'W miejsce każdej litery $n$ wpisujemy liczbę $5$ i wykonujemy działania wg kolejności.',
            steps=[
                {'num': '1', 'title': 'Identyfikacja n', 'desc': 'Szukamy a₅, więc\nustawiamy n = 5', 'color': C_SKY},
                {'num': '2', 'title': 'Podstawienie', 'desc': 'a₅ = 5² - 2·(5)\nPamiętaj o potęgach!', 'color': C_PRIMARY},
                {'num': '3', 'title': 'Wynik', 'desc': '25 - 10 = 15\nGotowa odpowiedź', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Numer wyrazu', 'value': '$n = 5$', 'color': C_SKY},
                {'label': 'Obliczona wartość', 'value': '$a_5 = 15$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Pierwszy wyraz to a₁, nie a₀!',
            'n \ge 1 \implies a_0 \text{ NIE ISTNIEJE}',
            'W ciągach maturalnych numeracja ZAWSZE zaczyna się od $n=1$. Nigdy nie podstawiaj $n=0$!',
            left_title='✓ POPRAWNY START CIĄGU',
            left_lines=[
                '• Pierwszy wyraz to zawsze a₁',
                '• Podstawiasz n = 1 jako najmniejsze',
                '• Dziedzina: n ∈ {1, 2, 3, ...}',
                '• Zgodność z oficjalnym kluczem CKE'
            ],
            right_title='❌ BŁĄD: PODSTAWIENIE n = 0',
            right_lines=[
                '• Próba obliczenia wyrazu a₀',
                '• Ciągi nie mają wyrazu zerowego!',
                '• Zły wynik w zadaniach z treścią',
                '• Strata cennego punktu na maturze'
            ],
            metrics=[
                {'label': 'Pierwszy wyraz', 'value': 'Zawsze $a_1$ ($n=1$)', 'color': C_SUCCESS},
                {'label': 'Wyraz $a_0$', 'value': 'NIE ISTNIEJE w CKE', 'color': C_DANGER}
            ]
        )

    elif l_num == 2:
        # Lekcja 7.2: Badanie znaków wyrazów ciągu: Wyrazy dodatnie i ujemne
        tab0 = make_plot_diagram(
            'Badanie znaków wyrazów ciągu: Wyrazy dodatnie ($a_n > 0$) i ujemne ($a_n < 0$)',
            '$a_n > 0 \land n \in \mathbb{N}^+,\quad a_n < 0 \land n \in \mathbb{N}^+$',
            'Rozwiązujemy nierówność dla wzoru ogólnego i wybieramy WYŁĄCZNIE liczby naturalne $n \ge 1$. Wyrazy nad osią $0$ są dodatnie (zielone), pod osią ujemne (czerwone).',
            segments=[
                {'from': [40, 140], 'to': [480, 140], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [80, 240], 'to': [80, 30], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [275, 230], 'to': [275, 40], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True, 'label': 'granica a_n = 0'}
            ],
            points=[
                {'x': 130, 'y': 210, 'dot': 'filled', 'color': C_DANGER, 'label': 'a₁ = -5 < 0', 'labelPosition': 'bottom'},
                {'x': 180, 'y': 180, 'dot': 'filled', 'color': C_DANGER, 'label': 'a₂ = -3 < 0', 'labelPosition': 'bottom'},
                {'x': 230, 'y': 155, 'dot': 'filled', 'color': C_DANGER, 'label': 'a₃ = -1 < 0', 'labelPosition': 'bottom'},
                {'x': 320, 'y': 115, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'a₄ = +1 > 0', 'labelPosition': 'top'},
                {'x': 370, 'y': 90, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'a₅ = +3 > 0', 'labelPosition': 'top'},
                {'x': 420, 'y': 65, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'a₆ = +5 > 0', 'labelPosition': 'top'}
            ],
            labels=[
                {'x': 180, 'y': 125, 'text': 'STREFA UJEMNA (aₙ < 0)', 'color': C_DANGER, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 370, 'y': 155, 'text': 'STREFA DODATNIA (aₙ > 0)', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 455, 'y': 130, 'text': 'n', 'color': C_MUTED, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'start'}
            ],
            metrics=[
                {'label': 'Wyrazy ujemne', 'value': '$a_n < 0 \implies n \in \{1, 2, 3\}$ (3 wyrazy)', 'color': C_DANGER},
                {'label': 'Wyrazy dodatnie', 'value': '$a_n > 0 \implies n \ge 4$ (od wyrazu $a_4$)', 'color': C_SUCCESS},
                {'label': 'Żelazny warunek', 'value': '$n \in \{1, 2, 3, \dots\}$ (tylko naturalne!)', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_number_line(
                0, 8,
                [1, 2, 3, 4, 5, 6, 7],
                [{'from': 1, 'to': 3.5, 'fromIncluded': True, 'toIncluded': False}],
                title='Warunki na znaki wyrazów ciągu',
                badge='a_n > 0 \text{ dla } n \in \{1, 2, 3, \dots\}',
                caption='Rozwiązaniem nierówności w ciągach są TYLKO liczby całkowite dodatnie leżące w przedziale.'
            )
        ]
        tab2 = make_step_flow_diagram(
            'Przykład: Ile wyrazów ujemnych ma ciąg aₙ = n² - 7n + 10?',
            'n^2 - 7n + 10 < 0 \implies n \in (2, 5) \implies n \in \{3, 4\}',
            'Rozwiązujemy nierówność kwadratową i wybieramy wyłącznie liczby naturalne ze zbioru rozwiązań.',
            steps=[
                {'num': '1', 'title': 'Nierówność an < 0', 'desc': 'n² - 7n + 10 < 0\nZałożenie: n ∈ ℕ⁺', 'color': C_SKY},
                {'num': '2', 'title': 'Miejsca zerowe', 'desc': 'Δ = 49 - 40 = 9, √Δ = 3\nn₁ = 2, n₂ = 5 ⟹ (2, 5)', 'color': C_PRIMARY},
                {'num': '3', 'title': 'Wybór n ∈ ℕ⁺', 'desc': 'W przedziale (2, 5)\nleżą n = 3 oraz n = 4', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Przedział ciągły', 'value': '$n \in (2, 5)$', 'color': C_SKY},
                {'label': 'Wyrazy ujemne', 'value': '$a_3, a_4$ (dokładnie 2 wyrazy)', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Zliczanie wyrazów (Dyskretna dziedzina n ∈ ℕ⁺)',
            'n < 4.25 \implies n \in \{1, 2, 3, 4\}',
            'Dwa najczęstsze błędy maturzystów: zaokrąglenie w dół bez wypisania liczb lub doliczenie n=0 (co dałoby 5 wyrazów).',
            left_title='✓ POPRAWNE ZLICZANIE (4 WYRAZY)',
            left_lines=[
                '• Nierówność daje np. n < 4.25',
                '• Wypisujesz liczby: n = 1, 2, 3, 4',
                '• Odpowiedź: dokładnie 4 wyrazy!',
                '• Żelazna zasada: n ∈ {1, 2, 3, 4}'
            ],
            right_title='❌ BŁĄD CKE: DOLICZENIE n = 0',
            right_lines=[
                '• Uczeń liczy: n = 0, 1, 2, 3, 4',
                '• Błędna odpowiedź: 5 wyrazów!',
                '• Wyraz a₀ NIE ISTNIEJE w ciągach',
                '• Utrata punktu za zadanie zamknięte'
            ],
            metrics=[
                {'label': 'Poprawny wynik', 'value': 'Dokładnie 4 wyrazy ($a_1, a_2, a_3, a_4$)', 'color': C_SUCCESS},
                {'label': 'Błędne zliczenie', 'value': '5 wyrazów (doliczone $n=0$)', 'color': C_DANGER}
            ]
        )

    elif l_num == 3:
        # Lekcja 7.3: Monotoniczność ciągu: Badanie różnicy a_{n+1} - a_n
        tab0 = make_plot_diagram(
            'Monotoniczność ciągu: Badanie różnicy $a_{n+1} - a_n$',
            '$a_{n+1} - a_n > 0 \implies \text{rosnący},\quad a_{n+1} - a_n < 0 \implies \text{malejący}$',
            'Jeśli każdy kolejny wyraz jest większy od poprzedniego, różnica $a_{n+1} - a_n$ jest dodatnia dla każdego $n \ge 1$.',
            segments=[
                {'from': [40, 220], 'to': [480, 220], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [120, 190], 'to': [200, 150], 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': 'krok > 0'},
                {'from': [200, 150], 'to': [280, 110], 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': 'krok > 0'},
                {'from': [280, 110], 'to': [360, 70], 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': 'krok > 0'}
            ],
            points=[
                {'x': 120, 'y': 190, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'aₙ'},
                {'x': 200, 'y': 150, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'aₙ₊₁'}
            ],
            metrics=[
                {'label': 'Ciąg rosnący', 'value': '$a_{n+1} - a_n > 0$', 'color': C_SUCCESS},
                {'label': 'Ciąg malejący', 'value': '$a_{n+1} - a_n < 0$', 'color': C_DANGER},
                {'label': 'Ciąg stały', 'value': '$a_{n+1} - a_n = 0$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_step_flow_diagram(
                'Algorytm badania monotoniczności ciągu',
                '\Delta a = a_{n+1} - a_n',
                'Zawsze wyznacz najpierw wyraz $a_{n+1}$, biorąc $(n+1)$ w nawias, a następnie zbadaj znak różnicy.',
                steps=[
                    {'num': '1', 'title': 'Wyznacz aₙ₊₁', 'desc': 'Wstaw (n+1) w nawias\nw miejsce litery n', 'color': C_SKY},
                    {'num': '2', 'title': 'Odejmij aₙ', 'desc': 'Oblicz różnicę:\naₙ₊₁ − aₙ i uprość', 'color': C_PRIMARY},
                    {'num': '3', 'title': 'Zbadaj znak', 'desc': 'Różnica > 0 ⟹ rosnący\nRóżnica < 0 ⟹ malejący', 'color': C_SUCCESS}
                ]
            )
        ]
        tab2 = make_sequence_chain_diagram(
            'Przykład: Ciąg malejący aₙ = 3 - 5n',
            'a_{n+1} - a_n = [3 - 5(n+1)] - (3 - 5n) = -5 < 0',
            'Różnica wynosi stałe $-5$. Ponieważ $-5 < 0$ dla każdego $n$, ciąg jest malejący.',
            terms=['a₁ = -2', 'a₂ = -7', 'a₃ = -12', 'a₄ = -17'],
            op_label='-5',
            is_geom=False,
            note='Różnica wynosi -5 < 0 (stała i ujemna) ⟹ ciąg jest malejący',
            metrics=[
                {'label': 'Krok różnicy', 'value': '$\Delta a = -5$', 'color': C_DANGER},
                {'label': 'Monotoniczność', 'value': 'Ściśle malejący', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Prawidłowy nawias przy (n+1)',
            '2(n+1)^2 \neq 2n^2 + 1',
            'Zawsze bierz $(n+1)$ w nawias przy potęgach i mnożeniu. Brak nawiasu to błąd kardynalny!',
            left_title='✓ POPRAWNY ZAPIS Z NAWIASEM',
            left_lines=[
                '• Dla aₙ = 2n² zapisz:',
                '• aₙ₊₁ = 2(n + 1)²',
                '• = 2(n² + 2n + 1)',
                '• = 2n² + 4n + 2'
            ],
            right_title='❌ BŁĄD MATURZYSTY (BRAK NAWIASU)',
            right_lines=[
                '• Błędny zapis: aₙ₊₁ = 2n² + 1',
                '• Dodanie jedynki na końcu!',
                '• Pominięcie potęgowania (n+1)',
                '• Fałszywy wniosek o monotoniczności'
            ],
            metrics=[
                {'label': 'Prawidłowo', 'value': '$a_{n+1} = 2(n+1)^2$', 'color': C_SUCCESS},
                {'label': 'Błędnie', 'value': '$2n^2 + 1$ (brak nawiasu!)', 'color': C_DANGER}
            ]
        )

    elif l_num in (4, 5):
        # Lekcje 7.4 i 7.5: Ciąg arytmetyczny: różnica r i wzór ogólny a_n = a_1 + (n-1)r
        tab0 = make_plot_diagram(
            'Ciąg arytmetyczny: Stały przyrost o różnicę $r$',
            '$a_n = a_1 + (n - 1)r,\quad r = a_{n+1} - a_n = \text{const}$',
            'Każdy kolejny wyraz powstaje przez dodanie tej samej liczby $r$. Punkty leżą na jednej prostej o nachyleniu $r$.',
            segments=[
                {'from': [40, 220], 'to': [480, 220], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [80, 250], 'to': [80, 30], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [120, 180], 'to': [440, 60], 'color': 'rgba(255, 184, 0, 0.3)', 'strokeWidth': 1.5, 'dashed': True},
                {'from': [120, 180], 'to': [200, 180], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [200, 180], 'to': [200, 150], 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': '+r'},
                {'from': [200, 150], 'to': [280, 150], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [280, 150], 'to': [280, 120], 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': '+r'},
                {'from': [280, 120], 'to': [360, 120], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [360, 120], 'to': [360, 90], 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': '+r'}
            ],
            points=[
                {'x': 120, 'y': 180, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₁'},
                {'x': 200, 'y': 150, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₂'},
                {'x': 280, 'y': 120, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₃'},
                {'x': 360, 'y': 90, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₄'}
            ],
            metrics=[
                {'label': 'Wzór ogólny', 'value': '$a_n = a_1 + (n-1)r$', 'color': C_PRIMARY},
                {'label': 'Różnica wyrazów', 'value': '$a_k - a_l = (k-l)r$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_sequence_chain_diagram(
                'Generowanie wyrazów ciągu arytmetycznego',
                'a_{n+1} = a_n + r',
                'Do każdego wyrazu dodajesz stałą różnicę $r$, aby otrzymać wyraz następny.',
                terms=['a₁', 'a₂ = a₁+r', 'a₃ = a₁+2r', 'a₄ = a₁+3r', 'aₙ = a₁+(n-1)r'],
                op_label='+r',
                is_geom=False,
                note='Aby dojść do n-tego wyrazu, dodajesz dokładnie (n-1) różnic r!',
                metrics=[
                    {'label': 'Wyraz $a_2$', 'value': '$a_1 + 1r$', 'color': C_PRIMARY},
                    {'label': 'Wyraz $a_n$', 'value': '$a_1 + (n-1)r$', 'color': C_SUCCESS}
                ]
            )
        ]
        tab2 = make_step_flow_diagram(
            'Przykład: a₁ = 5, r = 3. Oblicz a₁₀',
            'a_{10} = 5 + (10 - 1) \cdot 3 = 5 + 27 = 32',
            'Podstawiamy dane do wzoru ogólnego: $a_1=5$, $n=10$, $r=3$.',
            steps=[
                {'num': '1', 'title': 'Liczba różnic', 'desc': 'n - 1 = 10 - 1 = 9\nDodajemy 9 różnic', 'color': C_SKY},
                {'num': '2', 'title': 'Wymnożenie', 'desc': '9 · r = 9 · 3 = 27\nPrzyrost wartości', 'color': C_PRIMARY},
                {'num': '3', 'title': 'Suma z a₁', 'desc': '5 + 27 = 32\nWyraz a₁₀ = 32', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Dane', 'value': '$a_1 = 5,\quad r = 3$', 'color': C_SKY},
                {'label': 'Wynik $a_{10}$', 'value': '$32$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Mnożnik (n-1) różnicy r',
            'a_n = a_1 + (n-1)r \neq a_1 + nr',
            'Najczęstszy błąd maturzysty to pomnożenie $r$ przez $n$ zamiast przez $(n-1)$.',
            left_title='✓ POPRAWNY WZÓR: (n-1) RÓŻNIC',
            left_lines=[
                '• Dla a₅ dodajesz 4 różnice:',
                '• a₅ = a₁ + 4r',
                '• Od a₁ do a₅ jest 4 skoki!',
                '• Zawsze o 1 mniej niż numer n'
            ],
            right_title='❌ BŁĄD MATURZYSTY: n RÓŻNIC',
            right_lines=[
                '• Błędny zapis: a₅ = a₁ + 5r',
                '• Doliczenie o jednej różnicy za dużo!',
                '• Wynik zawyżony o wartość r',
                '• Strata punktu w zadaniu otwartym'
            ],
            metrics=[
                {'label': 'Poprawnie', 'value': '$a_5 = a_1 + 4r$', 'color': C_SUCCESS},
                {'label': 'Błędnie', 'value': '$a_1 + 5r$ (za dużo o r)', 'color': C_DANGER}
            ]
        )

    elif l_num == 6:
        # Lekcja 7.6: Własność trzech sąsiednich wyrazów ciągu arytmetycznego
        tab0 = make_geometry_diagram(
            'Trzy kolejne wyrazy ciągu arytmetycznego: Średnia arytmetyczna sąsiadów',
            '$a_n = \frac{a_{n-1} + a_{n+1}}{2} \iff 2a_n = a_{n-1} + a_{n+1}$',
            'Środkowy wyraz jest dokładnie średnią arytmetyczną wyrazu lewego i prawego (podwojony środek = suma skrajnych).',
            segments=[
                {'from': [100, 150], 'to': [420, 150], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [140, 150], 'to': [260, 150], 'color': C_SKY, 'strokeWidth': 3, 'label': '+r'},
                {'from': [260, 150], 'to': [380, 150], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': '+r'}
            ],
            points=[
                {'x': 140, 'y': 150, 'dot': 'filled', 'color': C_SKY, 'label': 'x (lewy)', 'labelPosition': 'bottom'},
                {'x': 260, 'y': 150, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'y (środkowy)', 'labelPosition': 'top'},
                {'x': 380, 'y': 150, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'z (prawy)', 'labelPosition': 'bottom'}
            ],
            metrics=[
                {'label': 'Równanie robocze', 'value': '$2y = x + z$', 'color': C_PRIMARY},
                {'label': 'Pewniak CKE', 'value': 'Zadanie z x: $(x, x+2, 2x+1)$ tworzą ciąg', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_step_flow_diagram(
                'Algorytm rozwiązywania zadań z 3 wyrazami arytmetycznymi',
                '2 \cdot (\text{środek}) = \text{lewy} + \text{prawy}',
                'Gdy zadanie mówi: liczby $x, y, z$ tworzą ciąg arytmetyczny, natychmiast ułóż równanie $2y = x + z$.',
                steps=[
                    {'num': '1', 'title': 'Wskaż środek', 'desc': 'Zidentyfikuj wyraz\nleżący w centrum (y)', 'color': C_SKY},
                    {'num': '2', 'title': 'Ułóż równanie', 'desc': 'Zapisz: 2y = x + z\nPodwój środek!', 'color': C_PRIMARY},
                    {'num': '3', 'title': 'Rozwiąż równanie', 'desc': 'Wyznacz niewiadomą\ni sprawdź różnicę r', 'color': C_SUCCESS}
                ]
            )
        ]
        tab2 = make_sequence_chain_diagram(
            'Przykład: Liczby (x, 7, 11) tworzą ciąg arytmetyczny',
            '2 \cdot 7 = x + 11 \implies 14 = x + 11 \implies x = 3',
            'Podwojony wyraz środkowy ($2 \cdot 7 = 14$) jest równy sumie wyrazów skrajnych ($x + 11$).',
            terms=['x = 3', 'y = 7', 'z = 11'],
            op_label='+4',
            is_geom=False,
            note='Sprawdzenie: 7 - 3 = 4 oraz 11 - 7 = 4 (r = 4 zgadza się!)',
            metrics=[
                {'label': 'Równanie', 'value': '$2 \cdot 7 = x + 11$', 'color': C_PRIMARY},
                {'label': 'Rozwiązanie', 'value': '$x = 3$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Kolejność wyrazów i mnożnik 2',
            '2 \cdot y = x + z \neq y = x + z',
            'Nigdy nie zapominaj o podwojeniu wyrazu środkowego! Środkowy NIE jest sumą skrajnych, lecz ich ŚREDNIĄ.',
            left_title='✓ POPRAWNY WZÓR: 2 · ŚRODEK',
            left_lines=[
                '• 2 · (środek) = lewy + prawy',
                '• Dla liczb (x, 7, 11):',
                '• 2 · 7 = x + 11 ⟹ 14 = x + 11',
                '• x = 3 (poprawny wynik CKE)'
            ],
            right_title='❌ BŁĄD: BRAK MNOŻNIKA 2',
            right_lines=[
                '• Błędny zapis: środek = lewy + prawy',
                '• 7 = x + 11 ⟹ x = -4 (BŁĄD!)',
                '• Ciąg (-4, 7, 11) NIE JEST arytmetyczny',
                '• 0 punktów za błędne równanie'
            ],
            metrics=[
                {'label': 'Prawidłowo', 'value': '$2y = x + z$', 'color': C_SUCCESS},
                {'label': 'Błędnie', 'value': '$y = x + z$ (brak dwójki)', 'color': C_DANGER}
            ]
        )

    elif l_num in (7, 8):
        # Lekcje 7.7 i 7.8: Suma wyrazów ciągu arytmetycznego S_n = (a_1 + a_n)/2 * n
        tab0 = make_geometry_diagram(
            'Suma ciągu arytmetycznego: Metoda małego Gaussa (parowanie)',
            '$S_n = \frac{a_1 + a_n}{2} \cdot n = \frac{2a_1 + (n-1)r}{2} \cdot n$',
            'Suma par skrajnych jest ZAWSZE stała: $a_1 + a_n = a_2 + a_{n-1} = a_3 + a_{n-2}$. Mnożymy średnią przez liczbę wyrazów $n$.',
            polygons=[
                {'points': [[80, 180], [440, 180], [440, 80], [80, 140]], 'fill': 'rgba(255, 184, 0, 0.12)', 'stroke': C_PRIMARY, 'strokeWidth': 2}
            ],
            segments=[
                {'from': [80, 180], 'to': [80, 140], 'color': C_SKY, 'strokeWidth': 3, 'label': 'a₁'},
                {'from': [440, 180], 'to': [440, 80], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'aₙ'},
                {'from': [80, 180], 'to': [440, 180], 'color': C_SLATE, 'strokeWidth': 2, 'label': 'n wyrazów'}
            ],
            labels=[{'x': 260, 'y': 135, 'text': 'Pole trapezu = Suma Sₙ', 'color': C_PRIMARY, 'fontSize': 16, 'fontWeight': 'bold', 'anchor': 'middle'}],
            metrics=[
                {'label': 'Wzór I (znasz aₙ)', 'value': '$S_n = \frac{a_1 + a_n}{2} \cdot n$', 'color': C_PRIMARY},
                {'label': 'Wzór II (znasz r)', 'value': '$S_n = \frac{2a_1 + (n-1)r}{2} \cdot n$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_step_flow_diagram(
                'Wybór właściwego wzoru na sumę Sₙ',
                'S_n = \frac{a_1 + a_n}{2} \cdot n',
                'Sprawdź, jakimi danymi dysponujesz: jeśli znasz ostatni wyraz $a_n$, użyj wzoru I. Jeśli znasz tylko $r$, użyj wzoru II.',
                steps=[
                    {'num': '1', 'title': 'Identyfikacja', 'desc': 'Czy znasz aₙ?\nTAK ⟹ Wzór I\nNIE ⟹ Wzór II', 'color': C_SKY},
                    {'num': '2', 'title': 'Średnia skrajnych', 'desc': '(a₁ + aₙ) / 2\nŚrednia arytmetyczna', 'color': C_PRIMARY},
                    {'num': '3', 'title': 'Mnożenie przez n', 'desc': 'Pomnóż przez n!\nWynik to pełna suma', 'color': C_SUCCESS}
                ]
            )
        ]
        tab2 = make_sequence_chain_diagram(
            'Przykład: Suma 20 wyrazów (a₁ = 3, a₂₀ = 41)',
            'S_{20} = \frac{3 + 41}{2} \cdot 20 = 22 \cdot 20 = 440',
            'Średnia wyrazu pierwszego i dwudziestego wynosi 22. Mnożymy ją przez 20 wyrazów, co daje 440.',
            terms=['a₁ = 3', 'a₂ = 5', '...', 'a₁₉ = 39', 'a₂₀ = 41'],
            op_label='+2',
            is_geom=False,
            note='Para a₁ + a₂₀ = 3 + 41 = 44. Takich par jest dokładnie 20/2 = 10 ⟹ 10 · 44 = 440',
            metrics=[
                {'label': 'Średnia pary', 'value': '$\frac{3 + 41}{2} = 22$', 'color': C_SKY},
                {'label': 'Suma $S_{20}$', 'value': '$22 \cdot 20 = 440$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Zapomniane mnożenie przez n',
            'S_n = \frac{a_1 + a_n}{2} \cdot n \neq \frac{a_1 + a_n}{2}',
            'Częsty błąd maturzysty: obliczenie samej średniej (a₁+a_n)/2 bez pomnożenia przez liczbę wyrazów n!',
            left_title='✓ PEŁNY WZÓR NA SUMĘ',
            left_lines=[
                '• S₂₀ = (3 + 41)/2 · 20',
                '• = 22 · 20 = 440',
                '• Pamiętasz o mnożeniu przez n!',
                '• Pełne punkty za zadanie'
            ],
            right_title='❌ BŁĄD: ZATRZYMANIE NA ŚREDNIEJ',
            right_lines=[
                '• Uczeń liczy: (3 + 41)/2 = 22',
                '• I podaje 22 jako sumę 20 wyrazów!',
                '• 22 to tylko średnia jednego wyrazu',
                '• 0 punktów za brak mnożenia przez n'
            ],
            metrics=[
                {'label': 'Poprawna suma', 'value': '$S_{20} = 440$', 'color': C_SUCCESS},
                {'label': 'Sama średnia', 'value': '$22$ (brak mnożenia przez 20!)', 'color': C_DANGER}
            ]
        )

    elif l_num in (9, 10):
        # Lekcje 7.9 i 7.10: Ciąg geometryczny: iloraz q i wzór ogólny a_n = a_1 * q^{n-1}
        tab0 = make_plot_diagram(
            'Ciąg geometryczny: Skoki wykładnicze o stały iloraz $q$',
            '$a_n = a_1 \cdot q^{n-1},\quad q = \frac{a_{n+1}}{a_n} = \text{const}$',
            'W ciągu geometrycznym każdy kolejny wyraz powstaje przez POMNOŻENIE przez stały iloraz $q$. Wykres tworzy krzywą wykładniczą.',
            segments=[
                {'from': [40, 220], 'to': [480, 220], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [80, 240], 'to': [80, 30], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            curves=[{'path': 'M 120 200 Q 260 190 400 50', 'color': C_PURPLE, 'strokeWidth': 2, 'dashed': True}],
            points=[
                {'x': 120, 'y': 200, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₁ = 2'},
                {'x': 200, 'y': 180, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₂ = 4'},
                {'x': 280, 'y': 140, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₃ = 8'},
                {'x': 360, 'y': 60, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a₄ = 16'}
            ],
            labels=[
                {'x': 260, 'y': 110, 'text': 'Mnożenie przez q = 2', 'color': C_PURPLE, 'fontSize': 14, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Wzór ogólny', 'value': '$a_n = a_1 \cdot q^{n-1}$', 'color': C_PRIMARY},
                {'label': 'Iloraz ciągu', 'value': '$q = \frac{a_{n+1}}{a_n}$', 'color': C_PURPLE},
                {'label': 'Dzielenie wyrazów', 'value': '$\frac{a_k}{a_l} = q^{k-l}$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_sequence_chain_diagram(
                'Generowanie wyrazów ciągu geometrycznego',
                'a_{n+1} = a_n \cdot q',
                'Każdy wyraz powstaje przez pomnożenie poprzednika przez stałą liczbę $q$.',
                terms=['a₁', 'a₂ = a₁·q', 'a₃ = a₁·q²', 'a₄ = a₁·q³', 'aₙ = a₁·qⁿ⁻¹'],
                op_label='·q',
                is_geom=True,
                note='Aby dojść do n-tego wyrazu, mnożysz a₁ przez q dokładnie (n-1) razy!',
                metrics=[
                    {'label': 'Drugi wyraz', 'value': '$a_1 \cdot q^1$', 'color': C_PRIMARY},
                    {'label': 'n-ty wyraz', 'value': '$a_1 \cdot q^{n-1}$', 'color': C_PURPLE}
                ]
            )
        ]
        tab2 = make_step_flow_diagram(
            'Przykład: a₁ = 3, q = 2. Oblicz a₅',
            'a_5 = 3 \cdot 2^{5-1} = 3 \cdot 2^4 = 3 \cdot 16 = 48',
            'Wstawiamy dane: wykładnik potęgi wynosi $n-1 = 5-1 = 4$.',
            steps=[
                {'num': '1', 'title': 'Wykładnik q', 'desc': 'n - 1 = 5 - 1 = 4\nPotęga wynosi 4', 'color': C_SKY},
                {'num': '2', 'title': 'Potęgowanie', 'desc': 'q⁴ = 2⁴ = 16\nNajpierw potęga!', 'color': C_PRIMARY},
                {'num': '3', 'title': 'Mnożenie z a₁', 'desc': '3 · 16 = 48\nWyraz a₅ = 48', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Dane', 'value': '$a_1 = 3,\quad q = 2$', 'color': C_SKY},
                {'label': 'Wynik $a_5$', 'value': '$48$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Potęga q^(n-1), a nie q^n',
            'a_n = a_1 \cdot q^{n-1} \neq a_1 \cdot q^n',
            'Dla piątego wyrazu potęga ilorazu wynosi 4, a NIE 5! Nie mnóż też a₁ przez q przed potęgowaniem!',
            left_title='✓ POPRAWNA KOLEJNOŚĆ I POTĘGA',
            left_lines=[
                '• a₅ = 3 · 2⁴',
                '• Najpierw potęga: 2⁴ = 16',
                '• Potem mnożenie: 3 · 16 = 48',
                '• Poprawny wynik w kluczu CKE'
            ],
            right_title='❌ BŁĄD MATURZYSTY',
            right_lines=[
                '• Błąd 1: a₅ = 3 · 2⁵ = 3 · 32 = 96 (potęga n!)',
                '• Błąd 2: (3 · 2)⁴ = 6⁴ = 1296 (mnożenie najpierw!)',
                '• Pamiętaj: potęgowanie ma pierwszeństwo',
                '• Wykładnik to zawsze n - 1'
            ],
            metrics=[
                {'label': 'Prawidłowo', 'value': '$a_5 = 3 \cdot 2^4 = 48$', 'color': C_SUCCESS},
                {'label': 'Błąd potęgi n', 'value': '$96$ (o 1 potęgę za dużo)', 'color': C_DANGER}
            ]
        )

    elif l_num == 11:
        # Lekcja 7.11: Własność trzech sąsiednich wyrazów ciągu geometrycznego
        tab0 = make_geometry_diagram(
            'Trzy kolejne wyrazy geometryczne: Kwadrat środka równy iloczynowi skrajnych',
            '$a_n^2 = a_{n-1} \cdot a_{n+1} \iff y^2 = x \cdot z$',
            'Kwadrat wyrazu środkowego jest iloczynem wyrazów skrajnych. Pamiętaj: równanie $y^2 = xz$ daje DWA rozwiązania: $y = \sqrt{xz}$ lub $y = -\sqrt{xz}$!',
            segments=[
                {'from': [100, 150], 'to': [420, 150], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [140, 150], 'to': [260, 150], 'color': C_PURPLE, 'strokeWidth': 3, 'label': '·q'},
                {'from': [260, 150], 'to': [380, 150], 'color': C_PURPLE, 'strokeWidth': 3, 'label': '·q'}
            ],
            points=[
                {'x': 140, 'y': 150, 'dot': 'filled', 'color': C_SKY, 'label': 'x (lewy)', 'labelPosition': 'bottom'},
                {'x': 260, 'y': 150, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'y (środkowy)', 'labelPosition': 'top'},
                {'x': 380, 'y': 150, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'z (prawy)', 'labelPosition': 'bottom'}
            ],
            metrics=[
                {'label': 'Równanie geometryczne', 'value': '$y^2 = x \cdot z$', 'color': C_PURPLE},
                {'label': 'Pamiętaj o dwóch znakach', 'value': '$y = \pm \sqrt{xz}$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_step_flow_diagram(
                'Algorytm rozwiązywania zadań z 3 wyrazami geometrycznymi',
                '(\text{środek})^2 = \text{lewy} \cdot \text{prawy}',
                'Podnieś wyraz środkowy do kwadratu i przyrównaj do iloczynu wyrazów skrajnych.',
                steps=[
                    {'num': '1', 'title': 'Identyfikacja', 'desc': 'Wskaż wyraz środkowy\noraz wyrazy skrajne', 'color': C_SKY},
                    {'num': '2', 'title': 'Równanie', 'desc': 'Zapisz: y² = x · z\nPamiętaj o kwadracie!', 'color': C_PURPLE},
                    {'num': '3', 'title': 'Dwa pierwiastki', 'desc': 'Równanie y² = c\ndaje y = √c lub y = -√c', 'color': C_SUCCESS}
                ]
            )
        ]
        tab2 = make_sequence_chain_diagram(
            'Przykład: Ciąg (2, 6, 18)',
            '6^2 = 2 \cdot 18 \implies 36 = 36',
            'Kwadrat środka ($6^2 = 36$) jest równy iloczynowi skrajnych ($2 \cdot 18 = 36$).',
            terms=['x = 2', 'y = 6', 'z = 18'],
            op_label='·3',
            is_geom=True,
            note='Iloraz q = 6/2 = 3 oraz 18/6 = 3 (stały iloraz q = 3)',
            metrics=[
                {'label': 'Kwadrat środka', 'value': '$6^2 = 36$', 'color': C_PRIMARY},
                {'label': 'Iloczyn skrajnych', 'value': '$2 \cdot 18 = 36$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Zgubione ujemne rozwiązanie ilorazu q',
            'q^2 = 4 \implies q = 2 \lor q = -2',
            'Równanie kwadratowe ma DWA rozwiązania! Ciąg geometryczny może być naprzemienny (np. 3, -6, 12, -24).',
            left_title='✓ OBYDWA ROZWIĄZANIA (DWA ZNAKI)',
            left_lines=[
                '• q² = 9 ⟹ q = 3 lub q = -3',
                '• Sprawdź warunki w treści zadania',
                '• Jeśli nie ma słowa "dodatni",',
                '• oba rozwiązania są ważne!'
            ],
            right_title='❌ BŁĄD: ZGUBIONY MINUS',
            right_lines=[
                '• Uczeń pisze tylko: q = 3',
                '• Zapomina o rozwiązaniu ujemnym',
                '• Utrata połowy punktów w zadaniu otwartym',
                '• Zawsze pisz: q = ±√c'
            ],
            metrics=[
                {'label': 'Poprawnie', 'value': '$q = 3$ lub $q = -3$', 'color': C_SUCCESS},
                {'label': 'Błędnie', 'value': 'Tylko $q = 3$ (zgubiony minus)', 'color': C_DANGER}
            ]
        )

    elif l_num == 12:
        # Lekcja 7.12: Suma n początkowych wyrazów ciągu geometrycznego
        tab0 = make_geometry_diagram(
            'Suma ciągu geometrycznego: Wzór ze współczynnikiem $q$',
            '$S_n = a_1 \cdot \frac{1 - q^n}{1 - q}\quad (q \neq 1)$',
            'Suma rośnie wykładniczo. W liczniku potęga wynosi DOKŁADNIE $n$ (a NIE $n-1$). W mianowniku odejmujemy $(1 - q)$.',
            polygons=[
                {'points': [[80, 180], [160, 180], [160, 140], [80, 140]], 'fill': 'rgba(255, 184, 0, 0.15)', 'stroke': C_PRIMARY, 'strokeWidth': 2},
                {'points': [[170, 180], [270, 180], [270, 110], [170, 110]], 'fill': 'rgba(192, 132, 252, 0.15)', 'stroke': C_PURPLE, 'strokeWidth': 2},
                {'points': [[280, 180], [440, 180], [440, 50], [280, 50]], 'fill': 'rgba(16, 185, 129, 0.18)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 120, 'y': 160, 'text': 'a₁', 'color': C_PRIMARY, 'fontSize': 14, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 220, 'y': 145, 'text': 'a₂ = a₁·q', 'color': C_PURPLE, 'fontSize': 14, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 360, 'y': 115, 'text': 'a₃ = a₁·q²', 'color': C_SUCCESS, 'fontSize': 14, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Wzór na sumę', 'value': '$S_n = a_1 \frac{1 - q^n}{1 - q}$', 'color': C_PRIMARY},
                {'label': 'Dla $q = 1$', 'value': '$S_n = n \cdot a_1$', 'color': C_SKY}
            ]
        )
        tab1 = [
            make_step_flow_diagram(
                'Algorytm obliczania sumy Sₙ ciągu geometrycznego',
                'S_n = a_1 \cdot \frac{1 - q^n}{1 - q}',
                'Oblicz najpierw potęgę $q^n$, następnie różnicę w nawiasie i podziel przez $(1-q)$.',
                steps=[
                    {'num': '1', 'title': 'Potęga qⁿ', 'desc': 'Oblicz qⁿ (potęga n!)\nnp. 2⁵ = 32', 'color': C_SKY},
                    {'num': '2', 'title': 'Licznik i mianownik', 'desc': '1 - qⁿ oraz 1 - q\nUważaj na znaki minus!', 'color': C_PRIMARY},
                    {'num': '3', 'title': 'Mnożenie z a₁', 'desc': 'Pomnóż wynik przez a₁\nOtrzymujesz sumę Sₙ', 'color': C_SUCCESS}
                ]
            )
        ]
        tab2 = make_sequence_chain_diagram(
            'Przykład: Suma 5 wyrazów (a₁ = 2, q = 3)',
            'S_5 = 2 \cdot \frac{1 - 3^5}{1 - 3} = 2 \cdot \frac{1 - 243}{-2} = 242',
            'Suma wyrazów: 2 + 6 + 18 + 54 + 162 = 242. Wzór daje natychmiastowy wynik!',
            terms=['2', '6', '18', '54', '162'],
            op_label='·3',
            is_geom=True,
            note='Suma wszystkich 5 wyrazów wynosi dokładnie 242',
            metrics=[
                {'label': 'Potęga $q^5$', 'value': '$3^5 = 243$', 'color': C_PURPLE},
                {'label': 'Suma $S_5$', 'value': '$242$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Potęga qⁿ w sumie vs qⁿ⁻¹ w wyrazie',
            'S_n \text{ ma w liczniku } q^n \text{ (a NIE } q^{n-1}\text{)}',
            'Częsty błąd: maturzysta wstawia potęgę (n-1) do wzoru na sumę geometryczną. Pamiętaj: suma ma potęgę n!',
            left_title='✓ POTĘGA n WE WZORZE NA SUMĘ',
            left_lines=[
                '• S₅ = a₁ · (1 - q⁵) / (1 - q)',
                '• W liczniku jest potęga n = 5!',
                '• Zgodność z oficjalnymi tablicami CKE',
                '• Prawidłowy wynik sumy'
            ],
            right_title='❌ BŁĄD: WSTAWIANIE (n - 1)',
            right_lines=[
                '• Pomyłka ze wzorem na wyraz aₙ',
                '• Uczeń pisze: (1 - q⁴) zamiast (1 - q⁵)',
                '• Błędna suma mniejsza o ostatni wyraz',
                '• Strata punktu za całe zadanie'
            ],
            metrics=[
                {'label': 'Potęga w sumie $S_n$', 'value': '$q^n$', 'color': C_SUCCESS},
                {'label': 'Potęga w wyrazie $a_n$', 'value': '$q^{n-1}$', 'color': C_PRIMARY}
            ]
        )

    elif l_num == 13:
        # Lekcja 7.13: Procent składany i kapitalizacja odsetek
        tab0 = make_plot_diagram(
            'Procent składany: Wzrost wykładniczy kapitału',
            '$K_n = K_0 \left(1 + \frac{p}{100 \cdot m}\right)^{n \cdot m}$',
            'W procencie składanym odsetki dopisane w danym okresie pracują na kolejny zysk (odsetki od odsetek).',
            segments=[
                {'from': [40, 220], 'to': [480, 220], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [80, 240], 'to': [80, 30], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [80, 180], 'to': [440, 120], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True, 'label': 'procent prosty'}
            ],
            curves=[{'path': 'M 80 180 Q 260 170 440 60', 'color': C_SUCCESS, 'strokeWidth': 2.5}],
            labels=[
                {'x': 340, 'y': 70, 'text': 'Procent składany (zysk rośnie szybciej!)', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            points=[
                {'x': 80, 'y': 180, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'K₀ (start)'},
                {'x': 440, 'y': 60, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'Kₙ (kapitał końcowy)'}
            ],
            metrics=[
                {'label': 'Kapitał początkowy', 'value': '$K_0$', 'color': C_PRIMARY},
                {'label': 'Kapitalizacje w roku', 'value': '$m$ (np. $m=4$ dla kwartału)', 'color': C_SKY},
                {'label': 'Łączna liczba okresów', 'value': '$n \cdot m$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_step_flow_diagram(
                'Algorytm procentu składanego dla kapitalizacji m razy w roku',
                'K_n = K_0 \left(1 + \frac{p}{100m}\right)^{n \cdot m}',
                'Dzielisz oprocentowanie roczne przez liczbę kapitalizacji m, a czas w latach mnożysz przez m!',
                steps=[
                    {'num': '1', 'title': 'Podziel procent', 'desc': 'Stopa na okres: p / m\nnp. 6% kwartalnie ⟹ 1.5%', 'color': C_SKY},
                    {'num': '2', 'title': 'Pomnóż czas', 'desc': 'Liczba okresów: n · m\nnp. 2 lata · 4 = 8 okresów', 'color': C_PRIMARY},
                    {'num': '3', 'title': 'Wzór potęgowy', 'desc': 'Kₙ = K₀ · (1 + p/100m)ⁿᵐ\nWynik końcowy', 'color': C_SUCCESS}
                ]
            )
        ]
        tab2 = make_sequence_chain_diagram(
            'Przykład: 10 000 zł na 6% rocznie (2 lata, kapitalizacja roczna)',
            'K_2 = 10\,000 \cdot (1 + 0.06)^2 = 10\,000 \cdot 1.1236 = 11\,236 \text{ zł}',
            'Po pierwszym roku kapitał wynosi 10 600 zł. W drugim roku 6% liczone jest już od 10 600 zł!',
            terms=['10 000 zł', '10 600 zł', '11 236 zł'],
            op_label='·1.06',
            is_geom=True,
            note='Czysty zysk z odsetek wynosi 1 236 zł (w tym 36 zł odsetek od odsetek)',
            metrics=[
                {'label': 'Kapitał początkowy', 'value': '$10\,000$ zł', 'color': C_PRIMARY},
                {'label': 'Kapitał po 2 latach', 'value': '$11\,236$ zł', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Kapitalizacja podokresowa (kwartalna, miesięczna)',
            '\text{Dziel stopę przez } m,\quad \text{mnoż lata przez } m',
            'Dla kapitalizacji kwartalnej (4 razy w roku) przez 3 lata: dzielisz stopę przez 4, a potęga wynosi 3·4 = 12!',
            left_title='✓ POPRAWNY WZÓR PODOKRESOWY',
            left_lines=[
                '• Kapitalizacja kwartalna (m = 4)',
                '• Czas: 3 lata ⟹ potęga 3 · 4 = 12',
                '• Stopa: 8% rocznie ⟹ 8%/4 = 2%',
                '• K₁₂ = K₀ · (1 + 0.02)¹²'
            ],
            right_title='❌ BŁĄD MATURZYSTY',
            right_lines=[
                '• Pozostawienie potęgi równej 3 lata!',
                '• Brak podzielenia stopy procentowej',
                '• Uczeń pisze: K₀ · (1 + 0.08)³ (BŁĄD!)',
                '• Całkowicie błędny wynik kwoty'
            ],
            metrics=[
                {'label': 'Prawidłowa potęga', 'value': '$n \cdot m = 3 \cdot 4 = 12$', 'color': C_SUCCESS},
                {'label': 'Błędna potęga', 'value': '$3$ (brak mnożenia przez 4)', 'color': C_DANGER}
            ]
        )

    elif l_num == 14:
        # Lekcja 7.14: Zadania mieszane: ciąg arytmetyczny i geometryczny w jednym zadaniu
        tab0 = make_geometry_diagram(
            'Zadania mieszane: Układ warunków arytmetycznych i geometrycznych',
            '2y = x + z\quad \land \quad y^2 = x \cdot z',
            'Trzy liczby tworzą jeden ciąg, a po modyfikacji inny. Układamy DWA równania i rozwiązujemy układ.',
            segments=[
                {'from': [60, 110], 'to': [460, 110], 'color': C_PRIMARY, 'strokeWidth': 2, 'label': 'Ciąg arytmetyczny: 2b = a + c'},
                {'from': [60, 170], 'to': [460, 170], 'color': C_PURPLE, 'strokeWidth': 2, 'label': 'Ciąg geometryczny: y² = x · z'}
            ],
            points=[
                {'x': 120, 'y': 110, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'a'},
                {'x': 260, 'y': 110, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'b'},
                {'x': 400, 'y': 110, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'c'},
                {'x': 120, 'y': 170, 'dot': 'filled', 'color': C_PURPLE, 'label': 'x'},
                {'x': 260, 'y': 170, 'dot': 'filled', 'color': C_PURPLE, 'label': 'y'},
                {'x': 400, 'y': 170, 'dot': 'filled', 'color': C_PURPLE, 'label': 'z'}
            ],
            metrics=[
                {'label': 'Warunek arytmetyczny', 'value': '$2b = a + c$', 'color': C_PRIMARY},
                {'label': 'Warunek geometryczny', 'value': '$y^2 = x \cdot z$', 'color': C_PURPLE},
                {'label': 'Metoda rozwiązania', 'value': 'Układ równań z podstawieniem', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_step_flow_diagram(
                'Procedura CKE dla zadań mieszanych (za 4 punkty)',
                '\begin{cases} 2b = a + c \\ y^2 = x \cdot z \end{cases}',
                'Wprowadź jedną zmienną i ułóż dwa równania, a następnie rozwiąż równanie kwadratowe.',
                steps=[
                    {'num': '1', 'title': 'Zapisz warunek 1', 'desc': '2b = a + c\n(związki arytmetyczne)', 'color': C_PRIMARY},
                    {'num': '2', 'title': 'Zapisz warunek 2', 'desc': 'y² = x · z\n(związki geometryczne)', 'color': C_PURPLE},
                    {'num': '3', 'title': 'Podstawienie', 'desc': 'Wyznacz jedną zmienną\ni oblicz deltę', 'color': C_SUCCESS}
                ]
            )
        ]
        tab2 = make_sequence_chain_diagram(
            'Przykład: Ciąg arytmetyczny (a, b, c) przekształcony w geometryczny',
            'b = a + r,\quad c = a + 2r',
            'Zapisanie wyrazów przez pierwszy wyraz $a$ oraz różnicę $r$ natychmiast upraszcza układ do jednej zmiennej.',
            terms=['a', 'b = a + r', 'c = a + 2r'],
            op_label='+r',
            is_geom=False,
            note='Zapis wyrazów jako (a, a+r, a+2r) eliminuje jedną niewiadomą od razu!',
            metrics=[
                {'label': 'Liczba niewiadomych', 'value': 'Zredukowana z 3 do 2', 'color': C_SUCCESS},
                {'label': 'Kolejny krok', 'value': 'Wstawienie do warunku geometrycznego', 'color': C_PURPLE}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Pomieszanie własności arytmetycznej i geometrycznej',
            '2b = a + c \quad \text{vs} \quad b^2 = a \cdot c',
            'Uważnie czytaj, które trzy liczby są arytmetyczne, a które geometryczne po zmianie!',
            left_title='✓ CZYTELNY PODZIAŁ ETAPÓW',
            left_lines=[
                '• Etap 1: zapisz stan początkowy',
                '• Etap 2: zmodyfikuj wyrazy wg polecenia',
                '• Etap 3: zastosuj właściwy wzór',
                '• Sprawdź oba rozwiązania delta'
            ],
            right_title='❌ BŁĄD MATURZYSTY',
            right_lines=[
                '• Zastosowanie b² = ac do ciągu arytmetycznego',
                '• Lub 2b = a+c do ciągu geometrycznego',
                '• Pomylenie wyrazów zmodyfikowanych',
                '• Błędny układ równań = 0 punktów'
            ],
            metrics=[
                {'label': 'Ciąg arytmetyczny', 'value': '$2b = a + c$', 'color': C_PRIMARY},
                {'label': 'Ciąg geometryczny', 'value': '$b^2 = a \cdot c$', 'color': C_PURPLE}
            ]
        )

    else:
        # Lekcja 7.15: Zadania dowodowe z ciągów (Uzasadnianie typu ciągu)
        tab0 = make_step_flow_diagram(
            'Dowodzenie w ciągach: Uzasadnianie, że ciąg jest arytmetyczny/geometryczny',
            '$a_{n+1} - a_n = \text{const} \implies \text{arytmetyczny},\quad \frac{a_{n+1}}{a_n} = \text{const} \implies \text{geometryczny}$',
            'Aby udowodnić typ ciągu dla WSZYSTKICH wyrazów, musisz pokazać, że różnica lub iloraz nie zależą od $n$ (zmienna $n$ całkowicie się redukuje).',
            steps=[
                {'num': '1', 'title': 'Wyznacz aₙ₊₁', 'desc': 'Wstaw (n+1) w nawiasie\nzamiast każdej litery n', 'color': C_SKY},
                {'num': '2', 'title': 'Odejmij lub podziel', 'desc': 'aₙ₊₁ − aₙ (dla arytm.)\nlub aₙ₊₁ / aₙ (dla geom.)', 'color': C_PRIMARY},
                {'num': '3', 'title': 'Redukcja n = C.K.D.', 'desc': 'Wynik jest stałą liczbą\n(brak zmiennej n!)', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Warunek arytmetyczności', 'value': '$a_{n+1} - a_n = r = \text{const}$', 'color': C_SUCCESS},
                {'label': 'Warunek geometryczności', 'value': '$\frac{a_{n+1}}{a_n} = q = \text{const}$', 'color': C_PURPLE},
                {'label': 'Cel dowodu', 'value': 'Zmienna $n$ całkowicie znika', 'color': C_PRIMARY},
                {'label': 'Pułapka CKE', 'value': 'Podstawienie 1, 2, 3 to 0 pkt!', 'color': C_DANGER}
            ]
        )
        tab1 = [
            make_step_flow_diagram(
                'Wzorcowy algorytm dowodowy CKE krok po kroku',
                '\forall n \in \mathbb{N}^+:\quad a_{n+1} - a_n = r',
                'Zawsze zapisuj założenie: $n \in \mathbb{N}^+$. Wymnóż nawiasy i zredukuj wyrazy podobne.',
                steps=[
                    {'num': 'A', 'title': 'Założenie', 'desc': 'Ustal dziedzinę:\nn ∈ {1, 2, 3, ...}', 'color': C_SKY},
                    {'num': 'B', 'title': 'Przekształcenie', 'desc': 'Wymnóż nawiasy,\nredukuj: n - n = 0', 'color': C_PRIMARY},
                    {'num': 'C', 'title': 'Wniosek CKE', 'desc': 'Różnica stała,\nzatem ciąg jest arytm.', 'color': C_SUCCESS}
                ]
            )
        ]
        tab2 = make_sequence_chain_diagram(
            'Przykład dowodu: Ciąg aₙ = 4n - 1',
            'a_{n+1} - a_n = 4(n+1)-1 - (4n-1) = 4',
            'Różnica $a_{n+1} - a_n = 4$ jest stała i niezależna od $n$, co dowodzi, że ciąg jest arytmetyczny.',
            terms=['a₁ = 3', 'a₂ = 7', 'a₃ = 11', '...', 'aₙ = 4n-1', 'aₙ₊₁ = 4n+3'],
            op_label='+4',
            is_geom=False,
            note='Dla każdego n różnica aₙ₊₁ − aₙ = 4 jest stała (nie zależy od n!)',
            metrics=[
                {'label': 'Wyraz $a_{n+1}$', 'value': '$4(n+1)-1 = 4n+3$', 'color': C_SKY},
                {'label': 'Różnica $a_{n+1} - a_n$', 'value': '$(4n+3) - (4n-1) = 4$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            'Pułapka CKE: Dowód ogólny vs Podstawienie liczb',
            '\text{Podstawienie } n=1, 2, 3 \implies 0 \text{ pkt CKE}',
            'Na maturze sprawdzenie tezy dla kilku początkowych liczb daje 0 punktów. Dowód MUSI operować na symbolu $n$.',
            left_title='✓ DOWÓD OGÓLNY NA ZMIENNEJ n',
            left_lines=[
                '• Operujesz na symbolu n ∈ ℕ⁺',
                '• Obliczasz ogólną różnicę aₙ₊₁ − aₙ',
                '• Zmienna n całkowicie się redukuje',
                '• Wynik: 100% punktów w kluczu CKE!'
            ],
            right_title='❌ BŁĄD: PODSTAWIENIE n=1, 2, 3',
            right_lines=[
                '• Obliczasz a₁ = 3, a₂ = 7, a₃ = 11',
                '• Pokazujesz, że 7-3 = 4 i 11-7 = 4',
                '• Brak uzasadnienia dla n = 100, 1000...',
                '• Skutek: 0 punktów za zadanie!'
            ],
            metrics=[
                {'label': 'Wymóg CKE', 'value': 'Dowód dla każdego $n \in \mathbb{N}^+$', 'color': C_SUCCESS},
                {'label': 'Ocena sprawdzania liczb', 'value': '0 punktów za dowód', 'color': C_DANGER}
            ]
        )

    return tab0, tab1, tab2, tab3
