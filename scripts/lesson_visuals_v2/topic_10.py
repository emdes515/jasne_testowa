"""
topic_10.py - Dział 1.10: Funkcja liniowa i jej własności (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals with Interactive Mafs Engine
100% Real KaTeX, 0% Emojis, Analytically Verified Coordinates.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_10_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.10.1: Wzór ogólny y = ax + b i znaczenie współczynnika a
        plot_data = {
            'xRange': [-4, 4],
            'yRange': [-4, 4],
            'gridStep': 1,
            'lines': [
                {'slope': 1.0, 'intercept': 0.0, 'color': C_SUCCESS},  # a > 0
                {'slope': -1.0, 'intercept': 0.0, 'color': C_DANGER}, # a < 0
                {'slope': 0.0, 'intercept': 2.0, 'color': C_SKY, 'dashed': True} # a = 0
            ],
            'labels': [
                {'x': 2.2, 'y': 2.6, 'text': 'a > 0 (rosnąca)', 'color': C_SUCCESS, 'attach': 'se'},
                {'x': 2.2, 'y': -2.6, 'text': 'a < 0 (malejąca)', 'color': C_DANGER, 'attach': 'ne'},
                {'x': 2.2, 'y': 1.6, 'text': 'a = 0 (stała: y = 2)', 'color': C_SKY, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Współczynnik kierunkowy a: Kąt nachylenia i monotoniczność prostej',
            badge=r'\begin{cases} a > 0 \longrightarrow \text{funkcja rosnąca } (\nearrow) \\ a = 0 \longrightarrow \text{funkcja stała } (\rightarrow) \\ a < 0 \longrightarrow \text{funkcja malejąca } (\searrow) \end{cases}',
            caption='Znak współczynnika kierunkowego a decyduje o tym, czy prosta rośnie, maleje, czy jest pozioma (stała). Zawsze odczytujemy wykres od lewej do prawej!',
            plotData=plot_data,
            metrics=[
                {'label': '$a > 0$', 'value': 'Kąt ostry z osią OX: funkcja rosnąca', 'color': C_SUCCESS},
                {'label': '$a < 0$', 'value': 'Kąt rozwarty z osią OX: funkcja malejąca', 'color': C_DANGER},
                {'label': '$a = 0$', 'value': 'Prosta pozioma: funkcja stała', 'color': C_SKY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie współczynnika kierunkowego krok po kroku",
            badge=r"A(1, 2),\; B(3, 8) \implies a = \frac{y_B - y_A}{x_B - x_A} = \frac{8 - 2}{3 - 1} = 3 > 0 \implies \text{rosnąca}",
            caption="Wyznaczasz iloraz przyrostu pionowego do poziomego. Dodatnie a oznacza funkcję rosnącą.",
            steps=[
                {'num': 1, 'title': 'Zastosuj wzór ilorazu przyrostów', 'desc': r'Współczynnik kierunkowy to $a = \frac{\Delta y}{\Delta x} = \frac{y_2 - y_1}{x_2 - x_1}$.', 'color': C_SKY},
                {'num': 2, 'title': 'Podstaw współrzędne punktów', 'desc': r'$a = \frac{8 - 2}{3 - 1} = \frac{6}{2} = 3$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Określ monotoniczność', 'desc': r'Ponieważ $a = 3 > 0$, funkcja jest rosnąca na całym zbiorze liczb rzeczywistych.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Przyrost pionowy', 'value': r'$\Delta y = 6$', 'color': C_SKY},
                {'label': 'Przyrost poziomy', 'value': r'$\Delta x = 2$', 'color': C_PRIMARY},
                {'label': 'Współczynnik a', 'value': '$a = 3$ (rosnąca)', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Odwrócenie wzoru na współczynnik kierunkowy (Δx / Δy)",
            badge=r"a = \frac{y_2 - y_1}{x_2 - x_1} \neq \frac{x_2 - x_1}{y_2 - y_1}",
            caption="Pamiętaj zasadę CKE: 'y idzie do nieba (w liczniku), x po ziemi (w mianowniku)'! Odwrócenie ułamka daje błędny współczynnik.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Iloraz $\frac{\Delta x}{\Delta y} = \frac{3 - 1}{8 - 2} = \frac{1}{3}$ zamiast $3$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'$y$ w liczniku, $x$ w mianowniku: $a = \frac{y_2 - y_1}{x_2 - x_1}$', 'color': C_SUCCESS},
                {'label': 'Kolejność punktów', 'value': 'W liczniku i mianowniku odejmuj punkty w tej samej kolejności', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L1.10.2: Znaczenie wyrazu wolnego b (przecięcie z osią OY w punkcie (0, b))
        plot_data = {
            'xRange': [-4, 4],
            'yRange': [-3, 5],
            'gridStep': 1,
            'lines': [
                {'slope': 1.5, 'intercept': 2.0, 'color': C_PRIMARY}
            ],
            'points': [
                {'x': 0, 'y': 2, 'color': C_PRIMARY, 'label': 'P(0, 2) = (0, b)', 'attach': 'w'}
            ],
            'labels': [
                {'x': 1.2, 'y': 4.2, 'text': 'y = 1.5x + 2', 'color': C_PRIMARY, 'attach': 'se'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Wyraz wolny b: Przecięcie wykresu z pionową osią OY',
            badge=r'P = (0,\; b) = (0,\; f(0))',
            caption='Podstawiając x = 0 do wzoru y = ax + b, otrzymujemy y = b. Wykres KAŻDEJ funkcji liniowej przecina pionową oś OY dokładnie na wysokości b!',
            plotData=plot_data,
            metrics=[
                {'label': '$b > 0$', 'value': 'Przecięcie NAD osią OX: (0, b)', 'color': C_SUCCESS},
                {'label': '$b = 0$', 'value': 'Przejście przez początek układu (0, 0)', 'color': C_SKY},
                {'label': '$b < 0$', 'value': 'Przecięcie POD osią OX: (0, b)', 'color': C_DANGER}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie wzoru prostej z wykresu krok po kroku",
            badge=r"P_{OY} = (0, 2) \implies b = 2, \quad A(2, 5) \implies a = 1{,}5 \implies y = 1{,}5x + 2",
            caption="Odczytujesz wyraz wolny b z przecięcia z osią OY, a następnie współczynnik a za pomocą drugiego punktu kratowego.",
            steps=[
                {'num': 1, 'title': 'Odczytaj przecięcie z OY', 'desc': r'Punkt na pionowej osi $OY$ to $(0, 2)$, więc natychmiast $b = 2$.', 'color': C_SKY},
                {'num': 2, 'title': 'Wybierz drugi punkt kratowy', 'desc': r'Punkt $A(2, 5)$ leży na prostej: $5 = a \cdot 2 + 2 \implies 2a = 3 \implies a = 1{,}5$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zapisz pełne równanie', 'desc': r'Otrzymujesz gotowy wzór funkcji liniowej: $y = 1{,}5x + 2$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wyraz wolny', 'value': '$b = 2$', 'color': C_SKY},
                {'label': 'Nachylenie prostej', 'value': '$a = 1{,}5$', 'color': C_PRIMARY},
                {'label': 'Równanie prostej', 'value': '$y = 1{,}5x + 2$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie wyrazu wolnego b z miejscem zerowym prostej",
            badge=r"P_{OY} = (0, b) \neq P_{OX} = \left(-\frac{b}{a}, 0\right)",
            caption="Wyraz wolny b leży ZAWSZE na pionowej osi OY w punkcie (0, b)! Miejsce zerowe leży na osi OX i wynosi x = -b/a.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Uznanie punktu $(2, 0)$ na osi $OX$ za wyraz wolny $b$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Wyraz $b$ odczytujesz WYŁĄCZNIE z osi pionowej $OY$: $(0, b)$', 'color': C_SUCCESS},
                {'label': 'Miejsce zerowe', 'value': r'Dla $y = 1{,}5x + 2$ wynosi $x_0 = -\frac{2}{1{,}5} = -\frac{4}{3}$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L1.10.3: Warunek równoległości i prostopadłości (Mafs PLOT - 2 Panele)
        plot_data = {
            'panels': [
                {
                    'title': 'Proste równoległe: k ∥ l (a₁ = a₂)',
                    'badge': 'a₁ = a₂ = 2',
                    'badgeColor': 'bg-sky-500/20 text-sky-300 border border-sky-400/40',
                    'subtitle': 'Identyczny kąt nachylenia do osi OX',
                    'plot': {
                        'xRange': [-4, 4],
                        'yRange': [-5, 5],
                        'gridStep': 1,
                        'lines': [
                            {'slope': 2.0, 'intercept': 1.0, 'color': C_PRIMARY, 'label': 'k: y = 2x + 1'},
                            {'slope': 2.0, 'intercept': -3.0, 'color': C_SUCCESS, 'label': 'l: y = 2x - 3'}
                        ],
                        'points': [
                            {'x': 0, 'y': 1, 'dot': 'filled', 'color': C_PRIMARY, 'label': '(0, 1)', 'attach': 'nw'},
                            {'x': 0, 'y': -3, 'dot': 'filled', 'color': C_SUCCESS, 'label': '(0, -3)', 'attach': 'se'}
                        ],
                        'labels': [
                            {'x': -1.2, 'y': 2.0, 'text': 'k ∥ l (a₁ = a₂ = 2)', 'color': C_PRIMARY, 'attach': 'nw'}
                        ]
                    }
                },
                {
                    'title': 'Proste prostopadłe: k ⊥ m (a₁ · a₂ = -1)',
                    'badge': 'a₁ · a₂ = 2 · (-0.5) = -1',
                    'badgeColor': 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40',
                    'subtitle': 'Kąt prosty (90°) w punkcie przecięcia',
                    'plot': {
                        'xRange': [-4, 4],
                        'yRange': [-4, 5],
                        'gridStep': 1,
                        'lines': [
                            {'slope': 2.0, 'intercept': 0.0, 'color': C_PRIMARY, 'label': 'k: y = 2x'},
                            {'slope': -0.5, 'intercept': 2.0, 'color': C_SUCCESS, 'label': 'm: y = -0.5x + 2'}
                        ],
                        'points': [
                            {'x': 0.8, 'y': 1.6, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'P(0.8; 1.6) [90°]', 'attach': 'ne'}
                        ],
                        'labels': [
                            {'x': -1.5, 'y': -1.5, 'text': 'k ⊥ m (2 · (-0.5) = -1)', 'color': C_SUCCESS, 'attach': 'sw'}
                        ]
                    }
                }
            ]
        }
        tab0 = make_plot_diagram(
            title='Warunek równoległości i prostopadłości prostych',
            badge=r'k \parallel l: a_1 = a_2, \quad k \perp m: a_1 \cdot a_2 = -1',
            caption='Proste równoległe mają identyczny współczynnik kierunkowy (a₁ = a₂). Proste prostopadłe mają współczynniki przeciwne i odwrotne (a₁ · a₂ = -1).',
            plotData=plot_data,
            metrics=[
                {'label': 'Warunek równoległości', 'value': '$a_1 = a_2$ (identyczne nachylenie)', 'color': C_SKY},
                {'label': 'Warunek prostopadłości', 'value': r'$a_1 \cdot a_2 = -1 \longrightarrow a_2 = -\frac{1}{a_1}$', 'color': C_SUCCESS},
                {'label': 'Przykład liczb', 'value': r'$a_1 = 2 \implies a_2 = -\frac{1}{2}$', 'color': C_PRIMARY},
                {'label': 'Rola wyrazu b', 'value': 'Wyraz wolny $b$ może być dowolny!', 'color': C_MUTED}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie prostej prostopadłej krok po kroku",
            badge=r"k: y = 2x + 5,\; P(2, -1) \implies a_{\perp} = -\frac{1}{2} \implies y = -\frac{1}{2}x",
            caption="Współczynnik prostej prostopadłej jest przeciwny i odwrotny. Wyraz b wyznaczasz podstawiając punkt P.",
            steps=[
                {'num': 1, 'title': 'Wyznacz a prostopadłe', 'desc': r'Dla $a_1 = 2$ warunek prostopadłości to $a_2 = -\frac{1}{a_1} = -\frac{1}{2}$.', 'color': C_SKY},
                {'num': 2, 'title': 'Podstaw współrzędne punktu P', 'desc': r'Podstawiasz $x = 2$ i $y = -1$ do wzoru $y = -\frac{1}{2}x + b$: $-1 = -\frac{1}{2} \cdot 2 + b$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz wyraz b i zapisz wzór', 'desc': r'$-1 = -1 + b \implies b = 0$. Równanie prostej to $y = -\frac{1}{2}x$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Współczynnik k', 'value': '$a_1 = 2$', 'color': C_SKY},
                {'label': 'Współczynnik prostopadły', 'value': r'$a_2 = -\frac{1}{2}$', 'color': C_SUCCESS},
                {'label': 'Równanie prostopadłej', 'value': r'$y = -\frac{1}{2}x$', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Wyznaczenie liczby tylko przeciwnej lub tylko odwrotnej",
            badge=r"a_2 = -\frac{1}{a_1} \neq -a_1 \neq \frac{1}{a_1}",
            caption="Warunek prostopadłości wymaga JEDNOCZEŚNIE dwóch zmian: odwrócenia ułamka (odwrotność) ORAZ zmiany znaku na przeciwny!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Tylko przeciwny: $a_2 = -2$ (proste nie są prostopadłe)', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Tylko odwrotny: $a_2 = \frac{1}{2}$ (brak zmiany znaku)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Obie zmiany na raz: $a_1 = \frac{3}{4} \implies a_2 = -\frac{4}{3}$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 4:
        # L1.10.4: Warunek równoległości prostych (a₁ = a₂) i 3 stany układu równań
        plot_data = {
            'panels': [
                {
                    'title': '1. Układ oznaczony (1 punkt)',
                    'badge': 'a₁ ≠ a₂',
                    'badgeColor': 'bg-sky-500/20 text-sky-300 border border-sky-400/40',
                    'subtitle': 'Jeden punkt przecięcia P(1, 1)',
                    'plot': {
                        'xRange': [-3, 3],
                        'yRange': [-3, 3],
                        'gridStep': 1,
                        'lines': [
                            {'slope': 2.0, 'intercept': -1.0, 'color': C_PRIMARY, 'label': 'k: y = 2x - 1'},
                            {'slope': -1.0, 'intercept': 2.0, 'color': C_SKY, 'label': 'l: y = -x + 2'}
                        ],
                        'points': [
                            {'x': 1, 'y': 1, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'P(1, 1)', 'attach': 'ne'}
                        ]
                    }
                },
                {
                    'title': '2. Układ sprzeczny (0 punktów)',
                    'badge': 'a₁ = a₂, b₁ ≠ b₂',
                    'badgeColor': 'bg-rose-500/20 text-rose-300 border border-rose-400/40',
                    'subtitle': 'Proste równoległe rozłączne k ∥ l',
                    'plot': {
                        'xRange': [-3, 3],
                        'yRange': [-3, 3],
                        'gridStep': 1,
                        'lines': [
                            {'slope': 1.0, 'intercept': 1.0, 'color': C_PRIMARY, 'label': 'k: y = x + 1'},
                            {'slope': 1.0, 'intercept': -1.5, 'color': C_DANGER, 'label': 'l: y = x - 1.5'}
                        ],
                        'labels': [
                            {'x': 0, 'y': 2.3, 'text': 'brak punktów wspólnych', 'color': C_DANGER, 'attach': 'n'}
                        ]
                    }
                },
                {
                    'title': '3. Układ nieoznaczony (∞ punktów)',
                    'badge': 'a₁ = a₂, b₁ = b₂',
                    'badgeColor': 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40',
                    'subtitle': 'Proste pokrywające się k ≡ l',
                    'plot': {
                        'xRange': [-3, 3],
                        'yRange': [-3, 3],
                        'gridStep': 1,
                        'lines': [
                            {'slope': 1.0, 'intercept': 0.0, 'color': C_SUCCESS, 'label': 'k ≡ l: y = x'},
                            {'slope': 1.0, 'intercept': 0.0, 'color': C_PRIMARY, 'dashed': True}
                        ],
                        'points': [
                            {'x': -1, 'y': -1, 'dot': 'filled', 'color': C_SUCCESS},
                            {'x': 0, 'y': 0, 'dot': 'filled', 'color': C_SUCCESS},
                            {'x': 1, 'y': 1, 'dot': 'filled', 'color': C_SUCCESS}
                        ],
                        'labels': [
                            {'x': 0.5, 'y': -1.2, 'text': 'nieskończenie wiele punktów', 'color': C_SUCCESS, 'attach': 's'}
                        ]
                    }
                }
            ]
        }
        tab0 = make_plot_diagram(
            title='Interpretacja geometryczna układu równań liniowych: 3 stany',
            badge=r'\begin{cases} a_1 \neq a_2 \longrightarrow \text{1 rozwiązanie (przecięcie)} \\ a_1 = a_2, \; b_1 \neq b_2 \longrightarrow 0 \text{ rozwiązań (sprzeczny)} \\ a_1 = a_2, \; b_1 = b_2 \longrightarrow \infty \text{ rozwiązań (pokrywają się)} \end{cases}',
            caption='Układ dwóch równań liniowych to wzajemne położenie dwóch prostych na płaszczyźnie. Liczba rozwiązań odpowiada dokładnie liczbie punktów przecięcia prostych.',
            plotData=plot_data,
            metrics=[
                {'label': 'Układ oznaczony', 'value': '$a_1 \\neq a_2$ (dokładnie 1 rozwiązanie)', 'color': C_SKY},
                {'label': 'Układ sprzeczny', 'value': '$a_1 = a_2, \\; b_1 \\neq b_2$ (brak rozwiązań)', 'color': C_DANGER},
                {'label': 'Układ nieoznaczony', 'value': '$a_1 = a_2, \\; b_1 = b_2$ (nieskończenie wiele)', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Równoległość prostych z parametrem m krok po kroku",
            badge=r"k: y = (2m - 4)x + 3, \quad l: y = 6x - 1 \implies 2m - 4 = 6 \implies m = 5",
            caption="Przyrównujesz współczynniki kierunkowe stojące przy zmiennej x w obu prostych.",
            steps=[
                {'num': 1, 'title': 'Zastosuj warunek k ∥ l', 'desc': r'Proste są równoległe, gdy $a_1 = a_2$. Wyrazy wolne $+3$ i $-1$ ignorujesz.', 'color': C_SKY},
                {'num': 2, 'title': 'Ułóż równanie liniowe', 'desc': r'Przyrównujesz to, co stoi przy $x$: $2m - 4 = 6$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wyznacz parametr m', 'desc': r'$2m = 6 + 4 = 10 \implies m = 5$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Współczynnik prostej k', 'value': r'$a_1 = 2m - 4$', 'color': C_SKY},
                {'label': 'Współczynnik prostej l', 'value': '$a_2 = 6$', 'color': C_PRIMARY},
                {'label': 'Rozwiązanie CKE', 'value': '$m = 5$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Przyrównywanie wyrazów wolnych zamiast współczynników a",
            badge=r"k \parallel l \longrightarrow a_1 = a_2 \quad (\text{wyraz wolny } b \text{ nie decyduje o równoległości!})",
            caption="O równoległości decyduje WYŁĄCZNIE kąt nachylenia (współczynnik przy x). Przyrównywanie wyrazów wolnych 3 = -1 to częsty błąd pod presją czasu.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Przyrównywanie $b_1 = b_2$ lub włączanie zmiennej $x$ do równania', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Przyrównaj wyłącznie współczynniki przy $x$: $a_1 = a_2$', 'color': C_SUCCESS},
                {'label': 'Proste pokrywające się', 'value': r'Tylko gdy $a_1 = a_2$ ORAZ $b_1 = b_2$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
