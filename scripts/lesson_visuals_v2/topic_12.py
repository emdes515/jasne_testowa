"""
topic_12.py - Dział 12: Funkcja kwadratowa (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals with Interactive Mafs Engine
100% Real KaTeX, 0% Emojis, Analytically Verified Coordinates.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_12_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L12.1: Postać kanoniczna y = a(x - p)² + q i wierzchołek W(p, q)
        plot_data = {
            'xRange': [-2, 6],
            'yRange': [-2, 5],
            'gridStep': 1,
            'parabola': {
                'a': 1.0,
                'p': 2.0,
                'q': -1.0,
                'color': C_PRIMARY
            },
            'axisOfSymmetry': 2.0,
            'points': [
                {'x': 2.0, 'y': -1.0, 'color': C_SUCCESS, 'label': 'W(2, -1) = (p, q)', 'attach': 's'}
            ],
            'labels': [
                {'x': 2.0, 'y': 3.5, 'text': 'oś symetrii x = p = 2', 'color': C_SKY, 'attach': 'e'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Wierzchołek paraboli W(p, q) i pionowa oś symetrii x = p',
            badge=r'y = a(x - p)^2 + q \quad | \quad p = -\frac{b}{2a}, \quad q = -\frac{\Delta}{4a}',
            caption='Liczba p przesuwa parabolę w poziomie (oś symetrii x = p), a q wyznacza jej ekstremum na osi pionowej OY.',
            plotData=plot_data,
            metrics=[
                {'label': 'Odcięta wierzchołka', 'value': r'$p = -\frac{b}{2a}$ (oś symetrii)', 'color': C_SKY},
                {'label': 'Rzędna wierzchołka', 'value': r'$q = f(p) = -\frac{\Delta}{4a}$', 'color': C_SUCCESS},
                {'label': 'Pułapka znaku', 'value': r'$y = a(x - 3)^2 + 4 \longrightarrow p = +3$', 'color': C_DANGER}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Odczytywanie wierzchołka i osi symetrii krok po kroku",
            badge=r"f(x) = 2(x - 3)^2 - 5 \longrightarrow p = 3, \quad q = -5 \longrightarrow W(3, -5), \quad \text{oś: } x = 3",
            caption="Wypisujesz współrzędne wierzchołka pamiętając o odwróceniu znaku przy p i zachowaniu znaku przy q.",
            steps=[
                {'num': 1, 'title': 'Zastosuj postać kanoniczną', 'desc': r'Wzór to $y = a(x - p)^2 + q$. Współczynnik $a = 2 > 0$ (ramiona w górę).', 'color': C_SKY},
                {'num': 2, 'title': 'Odczytaj p i q', 'desc': r'W nawiasie stoi $(x - 3)$, stąd $p = +3$. Wyraz wolny to $q = -5$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zapisz wierzchołek i oś symetrii', 'desc': r'Wierzchołek: $W(3, -5)$. Pionowa oś symetrii paraboli to prosta $x = 3$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Odcięta p', 'value': '$p = 3$', 'color': C_SKY},
                {'label': 'Rzędna q', 'value': '$q = -5$', 'color': C_PRIMARY},
                {'label': 'Wierzchołek W', 'value': '$W(3, -5)$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zły znak współrzędnej p we wzorze kanonicznym",
            badge=r"f(x) = a(x - 3)^2 + 4 \longrightarrow p = +3 \neq -3 \quad \text{oraz} \quad (x + 4)^2 \longrightarrow p = -4",
            caption="We wzorze kanonicznym występuje minus: a(x - p)²! Dlatego znak przy p w nawiasie ZAWSZE zmieniamy na przeciwny. Rzędna q zachowuje znak bez zmian.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Odczytanie $p = -3$ z nawiasu $(x - 3)^2$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'$(x - 3)^2 \longrightarrow p = +3$; $(x + 5)^2 \longrightarrow p = -5$', 'color': C_SUCCESS},
                {'label': 'Rzędna q', 'value': 'Znak przed wyrazem wolnym pozostaje bez zmian', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L12.2: Postać iloczynowa y = a(x - x₁)(x - x₂) i symetria pierwiastków
        plot_data = {
            'xRange': [-1, 7],
            'yRange': [-5, 4],
            'gridStep': 1,
            'parabola': {
                'a': 1.0,
                'p': 3.0,
                'q': -4.0,
                'color': C_PRIMARY
            },
            'axisOfSymmetry': 3.0,
            'points': [
                {'x': 1.0, 'y': 0.0, 'color': C_PRIMARY, 'label': 'x₁ = 1', 'attach': 'nw'},
                {'x': 5.0, 'y': 0.0, 'color': C_PRIMARY, 'label': 'x₂ = 5', 'attach': 'ne'},
                {'x': 3.0, 'y': -4.0, 'color': C_SUCCESS, 'label': 'W(3, -4)', 'attach': 's'}
            ],
            'labels': [
                {'x': 3.0, 'y': -2.0, 'text': 'p = (x₁ + x₂)/2 = 3', 'color': C_SKY, 'attach': 'e'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Postać iloczynowa: Miejsca zerowe x₁, x₂ i środek symetrii p',
            badge=r'y = a(x - x_1)(x - x_2) \quad (\Delta > 0) \quad | \quad p = \frac{x_1 + x_2}{2}',
            caption='Odcięta wierzchołka p leży DOKŁADNIE w połowie odległości między miejscami zerowymi x₁ i x₂.',
            plotData=plot_data,
            metrics=[
                {'label': 'Warunek istnienia', 'value': r'$\Delta \ge 0$ (dla $\Delta < 0$ brak postaci iloczynowej)', 'color': C_DANGER},
                {'label': 'Środek pierwiastków', 'value': r'$p = \frac{x_1 + x_2}{2}$', 'color': C_SKY},
                {'label': 'Oś symetrii', 'value': '$x = p$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie wierzchołka z miejsc zerowych krok po kroku",
            badge=r"f(x) = -(x - 1)(x - 5) \longrightarrow p = \frac{1 + 5}{2} = 3 \longrightarrow q = f(3) = 4 \longrightarrow W(3, 4)",
            caption="Wierzchołek leży dokładnie pośrodku miejsc zerowych. Rzędną q obliczasz podstawiając p do wzoru.",
            steps=[
                {'num': 1, 'title': 'Odczytaj pierwiastki x₁ i x₂', 'desc': r'Z postaci iloczynowej: $x_1 = 1$ oraz $x_2 = 5$.', 'color': C_SKY},
                {'num': 2, 'title': 'Oblicz środek symetrii p', 'desc': r'$p = \frac{x_1 + x_2}{2} = \frac{1 + 5}{2} = 3$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz rzędną q', 'desc': r'$q = f(p) = -(3 - 1)(3 - 5) = -(2)(-2) = 4$. Wierzchołek to $W(3, 4)$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Miejsca zerowe', 'value': r'$x_1 = 1,\; x_2 = 5$', 'color': C_SKY},
                {'label': 'Środek symetrii', 'value': '$p = 3$', 'color': C_PRIMARY},
                {'label': 'Wierzchołek', 'value': '$W(3, 4)$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Szukanie postaci iloczynowej gdy Δ < 0 lub zgubienie a",
            badge=r"\Delta < 0 \longrightarrow \text{brak postaci iloczynowej w } \mathbb{R} \quad \text{oraz} \quad y = a(x - x_1)(x - x_2)",
            caption="Gdy delta jest ujemna, trójmian kwadratowy NIE POSIADA postaci iloczynowej w liczbach rzeczywistych! Nie wymyślaj pierwiastków. Pamiętaj też o współczynniku a przed nawiasami.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Zapisywanie postaci iloczynowej przy $\Delta < 0$', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Zgubienie współczynnika $a$ (np. $a = -1$ z postaci ogólnej)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Zawsze sprawdź czy $\Delta \ge 0$, zanim szukasz postaci iloczynowej', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L12.3: Zbiór wartości i wartość min/max w przedziale domkniętym ⟨a, b⟩
        plot_data = {
            'xRange': [-2, 7],
            'yRange': [-3, 5],
            'gridStep': 1,
            'parabola': {
                'a': 0.5,
                'p': 2.0,
                'q': -2.0,
                'color': C_PRIMARY
            },
            'segments': [
                {'from': [0.0, -3.0], 'to': [0.0, 4.5], 'color': C_PURPLE, 'dashed': True, 'weight': 1.5},
                {'from': [5.0, -3.0], 'to': [5.0, 4.5], 'color': C_PURPLE, 'dashed': True, 'weight': 1.5}
            ],
            'points': [
                {'x': 0.0, 'y': 0.0, 'color': C_PURPLE, 'label': 'f(0) = 0', 'attach': 'nw'},
                {'x': 2.0, 'y': -2.0, 'color': C_SUCCESS, 'label': 'W(2, -2): min w przedziale', 'attach': 's'},
                {'x': 5.0, 'y': 2.5, 'color': C_PURPLE, 'label': 'f(5) = 2.5: max w przedziale', 'attach': 'ne'}
            ],
            'labels': [
                {'x': 0.0, 'y': 4.0, 'text': 'x = 0', 'color': C_PURPLE, 'attach': 'e'},
                {'x': 5.0, 'y': 4.0, 'text': 'x = 5', 'color': C_PURPLE, 'attach': 'w'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Wartość najmniejsza i największa w przedziale ⟨a, b⟩',
            badge=r'1^\circ \text{ Sprawdź, czy } p \in \langle a, b \rangle \quad | \quad 2^\circ \text{ Oblicz } f(a), f(b) \text{ oraz } f(p)',
            caption='Wierzchołek W(p, q) bierzemy pod uwagę TYLKO wtedy, gdy jego odcięta p wpada do przedziału ⟨a, b⟩!',
            plotData=plot_data,
            metrics=[
                {'label': 'Krok 1: Wierzchołek', 'value': r'Czy $p \in \langle a, b \rangle$?', 'color': C_SKY},
                {'label': 'Krok 2: Wartości', 'value': r'Porównaj $f(a), f(b)$ oraz $f(p)$', 'color': C_PRIMARY},
                {'label': 'Zbiór wartości ZW', 'value': r'Dla $a > 0$: $\langle q, +\infty)$, dla $a < 0$: $(-\infty, q\rangle$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie wartości min/max w przedziale krok po kroku",
            badge=r"f(x) = x^2 - 4x + 3 \text{ w } [0, 5] \longrightarrow p = 2 \in [0, 5] \longrightarrow y_{\min} = f(2) = -1, \; y_{\max} = f(5) = 8",
            caption="Sprawdzasz czy p leży w przedziale, a następnie porównujesz wartości w wierzchołku i na obu krańcach.",
            steps=[
                {'num': 1, 'title': 'Wyznacz p', 'desc': r'$p = -\frac{b}{2a} = -\frac{-4}{2 \cdot 1} = 2$.', 'color': C_SKY},
                {'num': 2, 'title': 'Weryfikacja przynależności p', 'desc': r'Liczba $p = 2 \in [0, 5]$, więc wierzchołek bierzemy pod uwagę (osiąga tu minimum dla $a > 0$).', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz wartości i porównaj', 'desc': r'$f(2) = 4 - 8 + 3 = -1$; $f(0) = 3$; $f(5) = 25 - 20 + 3 = 8$. Zatem $y_{\min} = -1$, $y_{\max} = 8$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wierzchołek w przedziale', 'value': r'$p = 2 \in [0, 5]$', 'color': C_SKY},
                {'label': 'Wartość minimalna', 'value': r'$y_{\min} = -1$', 'color': C_SUCCESS},
                {'label': 'Wartość maksymalna', 'value': r'$y_{\max} = 8$', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Uwzględnianie wierzchołka leżącego poza przedziałem",
            badge=r"p \notin \langle a, b \rangle \longrightarrow \text{ekstrema leżą WYŁĄCZNIE na krańcach } f(a) \text{ i } f(b)",
            caption="Gdy p leży poza badanym przedziałem, wierzchołek W(p, q) NIE BIERZE UDZIAŁU w wyścigu o min/max! Ekstrema przyjmują wtedy wyłącznie wartości na krańcach przedziału.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Podanie $q$ jako wartości ekstremalnej gdy $p \notin \langle a, b \rangle$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Zawsze sprawdź: czy $p \in \langle a, b \rangle$?', 'color': C_SUCCESS},
                {'label': 'Gdy p poza przedziałem', 'value': 'Obliczasz tylko f(a) oraz f(b) i wybierasz mniejszą/większą', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 4:
        # L12.4: Zadania optymalizacyjne (Maksimum w wierzchołku paraboli dla a < 0)
        plot_data = {
            'xRange': [-1, 7],
            'yRange': [-1, 6],
            'gridStep': 1,
            'parabola': {
                'a': -0.5,
                'p': 3.0,
                'q': 4.5,
                'color': C_PRIMARY
            },
            'axisOfSymmetry': 3.0,
            'points': [
                {'x': 3.0, 'y': 4.5, 'color': C_SUCCESS, 'label': 'W(3; 4.5)', 'attach': 'n'}
            ],
            'labels': [
                {'x': 3.0, 'y': 5.2, 'text': 'Maksimum: P_max = q = 4.5', 'color': C_SUCCESS, 'attach': 'n'},
                {'x': 3.2, 'y': 1.5, 'text': 'x_opt = p = -b/(2a) = 3', 'color': C_SKY, 'attach': 'e'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Model optymalizacyjny: Maksymalna wielkość w wierzchołku paraboli (a < 0)',
            badge=r'P(x) = ax^2 + bx + c \quad (a < 0) \quad | \quad x_{\max} = p = -\frac{b}{2a}',
            caption='Gdy ramiona paraboli są skierowane w dół (a < 0), funkcja osiąga wartość największą dokładnie w wierzchołku W(p, q).',
            plotData=plot_data,
            metrics=[
                {'label': 'Warunek maksimum', 'value': 'Współczynnik $a < 0$ (ramiona w dół)', 'color': C_DANGER},
                {'label': 'Optymalny wymiar', 'value': r'$x = p = -\frac{b}{2a}$ (zawsze w dziedzinie)', 'color': C_SKY},
                {'label': 'Wartość maksymalna', 'value': r'$P_{\max} = q = P(p)$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Rozwiązanie zadania optymalizacyjnego krok po kroku",
            badge=r"P(x) = -x^2 + 10x \longrightarrow p = -\frac{10}{2(-1)} = 5 \longrightarrow P_{\max} = P(5) = 25",
            caption="Układasz funkcję jednej zmiennej, wyznaczasz dziedzinę geometryczną i znajdujesz maksimum w wierzchołku p.",
            steps=[
                {'num': 1, 'title': 'Zapisz funkcję celu i dziedzinę', 'desc': r'Obwód $2x + 2y = 20 \longrightarrow y = 10 - x$. Pole: $P(x) = x(10 - x) = -x^2 + 10x$, gdzie $x \in (0, 10)$.', 'color': C_SKY},
                {'num': 2, 'title': 'Wyznacz optymalny wymiar p', 'desc': r'Funkcja kwadratowa o $a = -1 < 0$ ma maksimum w wierzchołku: $x = p = -\frac{10}{2(-1)} = 5 \in (0, 10)$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz pole maksymalne', 'desc': r'$y = 10 - 5 = 5$. Maksymalne pole: $P_{\max} = P(5) = -25 + 50 = 25$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Funkcja pola', 'value': r'$P(x) = -x^2 + 10x$', 'color': C_SKY},
                {'label': 'Optymalny bok', 'value': '$x = 5$', 'color': C_PRIMARY},
                {'label': 'Maksymalne pole', 'value': r'$P_{\max} = 25$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie optymalnego boku x z wartością maksymalną P",
            badge=r"x_{\text{opt}} = p = -\frac{b}{2a} \neq P_{\max} = q = P(p)",
            caption="W zadaniach optymalizacyjnych CKE uważnie czytaj pytanie: czy pytają o WYMIAR (np. długość boku x), czy o WARTOŚĆ MAKSYMALNĄ (np. największe pole P)?",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Podanie $x = 5$ gdy pytanie brzmiało "oblicz największe pole"', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': 'Pominięcie dziedziny geometrycznej $x > 0$ i $y > 0$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Wymiar to $x = p$, a pole maksymalne to $P_{\max} = q$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
