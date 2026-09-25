"""
topic_08.py - Dział 1.8: Nierówności kwadratowe (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals with Interactive Mafs Engine
100% Real KaTeX, 0% Emojis, Analytically Verified Coordinates.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_08_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.8.1: Wyróżnik Delta i miejsca zerowe trójmianu kwadratowego
        plot_data = {
            'xRange': [-3.5, 3.5],
            'yRange': [-4, 5],
            'gridStep': 1,
            'parabola': {
                'a': 1.0,
                'p': 0.0,
                'q': -3.0,
                'color': C_SUCCESS
            },
            'points': [
                {'x': -1.732, 'y': 0, 'color': C_SUCCESS, 'label': 'x₁ = -√3', 'attach': 'nw'},
                {'x': 1.732, 'y': 0, 'color': C_SUCCESS, 'label': 'x₂ = √3', 'attach': 'ne'},
                {'x': 0, 'y': -3, 'color': C_PRIMARY, 'label': 'W(0, -3)', 'attach': 's'}
            ],
            'labels': [
                {'x': 2.2, 'y': 2.0, 'text': 'Δ > 0 (2 miejsca zerowe)', 'color': C_SUCCESS, 'attach': 'nw'}
            ]
        }
        tab0 = make_plot_diagram(
            title=r'Delta ($\Delta$) i liczba miejsc zerowych funkcji kwadratowej',
            badge=r'\Delta = b^2 - 4ac,\quad x_{1,2} = \frac{-b \pm \sqrt{\Delta}}{2a}',
            caption=r'Znak wyróżnika delty decyduje o liczbie przecięć paraboli z osią OX: $\Delta > 0$ (dwa miejsca zerowe), $\Delta = 0$ (jedno), $\Delta < 0$ (brak).',
            plotData=plot_data,
            metrics=[
                {'label': r'$\Delta > 0$', 'value': r'Dwa pierwiastki $x_1$ i $x_2$', 'color': C_SUCCESS},
                {'label': r'$\Delta = 0$', 'value': r'Jeden pierwiastek podwójny $x_0 = \frac{-b}{2a}$', 'color': C_PRIMARY},
                {'label': r'$\Delta < 0$', 'value': 'Brak pierwiastków rzeczywistych', 'color': C_DANGER}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Obliczanie delty i pierwiastków trójmianu krok po kroku",
            badge=r"x^2 - 5x + 6 = 0 \longrightarrow \Delta = (-5)^2 - 4(1)(6) = 1 \longrightarrow x_1 = 2,\; x_2 = 3",
            caption="Wypisujesz współczynniki a, b, c, obliczasz deltę i stosujesz wzory na pierwiastki.",
            steps=[
                {'num': 1, 'title': 'Wypisz współczynniki', 'desc': r'$a = 1$, $b = -5$, $c = 6$. Pamiętaj o znakach stojących przed liczbami!', 'color': C_SKY},
                {'num': 2, 'title': 'Oblicz wyróżnik Delta', 'desc': r'$\Delta = b^2 - 4ac = (-5)^2 - 4 \cdot 1 \cdot 6 = 25 - 24 = 1 > 0 \implies \sqrt{\Delta} = 1$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wyznacz pierwiastki x₁ i x₂', 'desc': r'$x_1 = \frac{-(-5) - 1}{2 \cdot 1} = \frac{4}{2} = 2$, $x_2 = \frac{-(-5) + 1}{2 \cdot 1} = \frac{6}{2} = 3$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wyróżnik', 'value': r'$\Delta = 1 > 0$', 'color': C_SUCCESS},
                {'label': 'Pierwiastek 1', 'value': '$x_1 = 2$', 'color': C_SKY},
                {'label': 'Pierwiastek 2', 'value': '$x_2 = 3$', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Błąd znaku we wzorze na -b oraz w iloczynie -4ac",
            badge=r"b = -5 \implies -b = -(-5) = +5 \neq -5 \quad \text{oraz} \quad c = -6 \implies -4ac > 0",
            caption="Gdy b jest ujemne, to -b staje się liczbą dodatnią! Gdy c jest ujemne, to -4ac zmienia się na +4a|c|.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zapis $-b = -5$ dla $b = -5$ lub $(-5)^2 = -25$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Nawiasy: $(-5)^2 = 25$ oraz $-(-5) = +5$', 'color': C_SUCCESS},
                {'label': 'Gdy c < 0', 'value': r'$-4 \cdot 1 \cdot (-6) = +24$ (podnosi deltę)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L1.8.2: Szkicowanie paraboli i odczytywanie przedziałów rozwiązań
        plot_data = {
            'xRange': [-4, 4],
            'yRange': [-5, 6],
            'gridStep': 1,
            'parabola': {
                'a': 1.0,
                'p': 0.0,
                'q': -4.0,
                'color': C_PRIMARY
            },
            'inequalityRegions': [
                {'fromX': -4.0, 'toX': -2.0, 'condition': 'above', 'color': C_SUCCESS},
                {'fromX': 2.0, 'toX': 4.0, 'condition': 'above', 'color': C_SUCCESS},
                {'fromX': -2.0, 'toX': 2.0, 'condition': 'below', 'color': C_DANGER}
            ],
            'points': [
                {'x': -2, 'y': 0, 'color': C_SUCCESS, 'label': 'x₁ = -2', 'attach': 'nw'},
                {'x': 2, 'y': 0, 'color': C_SUCCESS, 'label': 'x₂ = 2', 'attach': 'ne'}
            ],
            'labels': [
                {'x': -2.8, 'y': 2.5, 'text': '+ (nad osią)', 'color': C_SUCCESS, 'attach': 'n'},
                {'x': 2.8, 'y': 2.5, 'text': '+ (nad osią)', 'color': C_SUCCESS, 'attach': 'n'},
                {'x': 0, 'y': -2.0, 'text': '- (pod osią)', 'color': C_DANGER, 'attach': 'n'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Szkic paraboli i odczyt stref nierówności (+ oraz -)',
            badge=r'\begin{cases} a > 0 \longrightarrow \text{ramiona w górę } (\cup) \\ a < 0 \longrightarrow \text{ramiona w dół } (\cap) \end{cases}',
            caption='Kierunek ramion zależy od współczynnika a. Wartości dodatnie (+) leżą NAD osią OX, ujemne (-) POD osią OX.',
            plotData=plot_data,
            metrics=[
                {'label': 'Nierówność $> 0$', 'value': r'Suma przedziałów: $(-\infty, x_1) \cup (x_2, +\infty)$', 'color': C_SUCCESS},
                {'label': 'Nierówność $< 0$', 'value': 'Przedział wewnętrzny: $(x_1, x_2)$', 'color': C_DANGER},
                {'label': 'Znak $\\ge$ lub $\\le$', 'value': 'Nawiasy domknięte $[ ]$ przy liczbach!', 'color': C_PRIMARY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Rozwiązywanie nierówności kwadratowej krok po kroku",
            badge=r"x^2 - x - 6 \ge 0 \longrightarrow (x - 3)(x + 2) \ge 0 \longrightarrow x \in (-\infty, -2] \cup [3, +\infty)",
            caption="Wyznaczasz pierwiastki, szkicujesz parabolę zgodnie ze znakiem a i odczytujesz strefy spełniające znak nierówności.",
            steps=[
                {'num': 1, 'title': 'Wyznacz miejsca zerowe', 'desc': r'$\Delta = 1 - 4(1)(-6) = 25 \implies x_1 = -2,\; x_2 = 3$.', 'color': C_SKY},
                {'num': 2, 'title': 'Szkicuj parabolę', 'desc': r'Współczynnik $a = 1 > 0 \implies$ ramiona skierowane w górę ($\cup$). Zaznacz $-2$ i $3$ na osi.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Odczytaj przedziały dla ≥ 0', 'desc': r'Pytanie o $\ge 0$ oznacza wykres NAD osią oraz punkty na osi: $x \in (-\infty, -2] \cup [3, +\infty)$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Miejsca zerowe', 'value': r'$x \in \{-2, 3\}$', 'color': C_SKY},
                {'label': 'Kierunek ramion', 'value': r'$a > 0 \implies$ w górę', 'color': C_PRIMARY},
                {'label': 'Zbiór rozwiązań', 'value': r'$(-\infty, -2] \cup [3, +\infty)$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Smutna parabola (a < 0) i odwrócone strefy nierówności",
            badge=r"-x^2 + 4 > 0 \longrightarrow x \in (-2, 2) \neq (-\infty, -2) \cup (2, +\infty)",
            caption="Gdy a < 0, ramiona paraboli są skierowane W DÓŁ (parabola smutna)! Wtedy wartości dodatnie (> 0) znajdują się MIĘDZY pierwiastkami.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': 'Automatyczne pisanie sumy przedziałów dla $> 0$ przy $a < 0$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'$a = -1 < 0 \implies$ wartości $>0$ leżą wewnątrz: $(-2, 2)$', 'color': C_SUCCESS},
                {'label': 'Bezpieczna alternatywa', 'value': r'Pomnóż przez $-1$ i zmień zwrot: $x^2 - 4 < 0$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L1.8.3: Nierówności kwadratowe niepełne – bez liczenia delty
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Nierówności kwadratowe niepełne: Błyskawiczna metoda bez delty',
            'formulaBadge': r'x(ax + b) \ge 0 \quad \text{oraz} \quad x^2 - c \ge 0 \longrightarrow (x - \sqrt{c})(x + \sqrt{c}) \ge 0',
            'caption': 'Nie trać czasu na deltę, gdy brakuje wyrazu wolnego c lub środkowego b! Zastosuj wyciąganie x lub różnicę kwadratów.',
            'cards': [
                {
                    'badge': 'Przypadek 1: Brak c (c = 0)',
                    'title': 'Wyciągnij x przed nawias',
                    'formula': r'x^2 - 6x \ge 0 \longrightarrow x(x - 6) \ge 0',
                    'desc': 'Miejsca zerowe to natychmiast $x_1 = 0$ oraz $x_2 = 6$. Czas rozwiązania: 10 sekund.',
                    'color': C_SKY
                },
                {
                    'badge': 'Przypadek 2: Brak b (b = 0)',
                    'title': 'Różnica kwadratów',
                    'formula': r'x^2 - 9 < 0 \longrightarrow (x - 3)(x + 3) < 0',
                    'desc': 'Miejsca zerowe to $x_1 = -3$ oraz $x_2 = 3$. Ramiona w górę, więc rozwiązaniem jest przedział $(-3, 3)$.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Oszczędność czasu', 'value': r'Zrobione w 20 sekund bez liczenia $\Delta$', 'color': C_PRIMARY},
                {'label': 'Kardynalna pułapka', 'value': 'Dla $x^2 - 9 < 0$ rozwiązaniem NIE jest $x < 3$!', 'color': C_DANGER},
                {'label': 'Waga w CKE', 'value': 'Zadanie za 2 pkt w każdym arkuszu', 'color': C_SUCCESS}
            ]
        }
        tab2 = make_step_flow_diagram(
            title="Rozwiązywanie nierówności niepełnych krok po kroku",
            badge=r"x^2 - 4x \le 0 \longrightarrow x(x - 4) \le 0 \longrightarrow x \in [0, 4]",
            caption="Wyciągasz x przed nawias, odczytujesz miejsca zerowe x=0 i x=4, szkicujesz parabolę ramionami w górę.",
            steps=[
                {'num': 1, 'title': 'Wyciągnij x przed nawias', 'desc': r'$x^2 - 4x \le 0 \implies x(x - 4) \le 0$.', 'color': C_SKY},
                {'num': 2, 'title': 'Odczytaj pierwiastki', 'desc': r'Pierwiastkami są $x = 0$ oraz $x = 4$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Szkicuj i odczytaj strefę ≤ 0', 'desc': r'Ramiona w górę ($a=1>0$). Wartości $\le 0$ leżą pod osią i na osi: $x \in [0, 4]$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Pierwiastek 1', 'value': '$x = 0$', 'color': C_SKY},
                {'label': 'Pierwiastek 2', 'value': '$x = 4$', 'color': C_PRIMARY},
                {'label': 'Rozwiązanie', 'value': r'$x \in [0, 4]$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Pierwiastkowanie nierówności x² < 9 stronami",
            badge=r"x^2 < 9 \longrightarrow x \in (-3, 3) \neq x < 3",
            caption="Nierówności kwadratowych NIGDY nie wolno pierwiastkować stronami! Liczba x = -5 daje (-5)² = 25, co nie jest mniejsze od 9.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zapis $x^2 < 9 \implies x < 3$ (0 pkt)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Różnica kwadratów: $(x - 3)(x + 3) < 0 \implies x \in (-3, 3)$', 'color': C_SUCCESS},
                {'label': 'Moduł z x', 'value': r'Formalnie: $\sqrt{x^2} = |x| < 3 \longrightarrow -3 < x < 3$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 4:
        # L1.8.4: Nierówności kwadratowe z ujemną deltą (Δ < 0)
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Ujemna delta (Δ < 0): Zbiór pusty vs cały zbiór liczb rzeczywistych',
            'formulaBadge': r'\Delta < 0 \longrightarrow \begin{cases} ax^2 + bx + c > 0 \longrightarrow x \in \mathbb{R} & (a > 0) \\ ax^2 + bx + c < 0 \longrightarrow x \in \emptyset & (a > 0) \end{cases}',
            'caption': 'Gdy delta jest ujemna, parabola NIGDY nie dotyka osi OX! Wisi w całości nad osią (dla a > 0) lub leży w całości pod osią (dla a < 0).',
            'cards': [
                {
                    'badge': 'a > 0 oraz Δ < 0: Cała nad osią',
                    'title': 'Wykres wisi w całości w strefie dodatniej',
                    'formula': r'x^2 + 2x + 5 > 0 \longrightarrow x \in \mathbb{R}',
                    'desc': r'Parabola wisi nad osią $OX$. Każdy punkt ma $y > 0$, więc nierówność jest spełniona dla KAŻDEJ liczby rzeczywistej.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'a > 0 oraz Δ < 0: Sprzeczność',
                    'title': 'Brak punktów pod osią',
                    'formula': r'x^2 + 2x + 5 \le 0 \longrightarrow x \in \emptyset',
                    'desc': r'Żaden punkt paraboli nie leży na osi ani pod osią. Nierówność nie ma ani jednego rozwiązania (zbiór pusty $\emptyset$).',
                    'color': C_DANGER
                }
            ],
            'metrics': [
                {'label': 'Brak miejsc zerowych', 'value': 'Wykres nie przecina osi $OX$', 'color': C_SKY},
                {'label': 'Wynik CKE', 'value': r'ZAWSZE $\mathbb{R}$ albo zbiór pusty $\emptyset$', 'color': C_PRIMARY},
                {'label': 'Pułapka maturzysty', 'value': r'Pomyłka: $\Delta < 0$ to nie zawsze brak rozwiązań!', 'color': C_DANGER}
            ]
        }
        tab2 = make_step_flow_diagram(
            title="Analiza nierówności z ujemną deltą krok po kroku",
            badge=r"x^2 - 2x + 5 > 0 \longrightarrow \Delta = 4 - 20 = -16 < 0 \longrightarrow x \in \mathbb{R}",
            caption="Ujemna delta oznacza brak miejsc zerowych. O rozwiązaniu decyduje znak współczynnika a oraz zwrot nierówności.",
            steps=[
                {'num': 1, 'title': 'Oblicz deltę', 'desc': r'$\Delta = (-2)^2 - 4(1)(5) = 4 - 20 = -16 < 0$. Brak miejsc zerowych.', 'color': C_SKY},
                {'num': 2, 'title': 'Zbadaj położenie paraboli', 'desc': r'$a = 1 > 0 \implies$ ramiona w górę. Ponieważ brak przecięć z OX, cała parabola wisi NAD osią ($y > 0$).', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Sformułuj odpowiedź', 'desc': r'Nierówność pyta o wartości $> 0$. Cały wykres spełnia ten warunek, stąd $x \in \mathbb{R}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wyróżnik', 'value': r'$\Delta = -16 < 0$', 'color': C_DANGER},
                {'label': 'Wykres', 'value': r'Wisi nad osią ($y > 0$)', 'color': C_SKY},
                {'label': 'Rozwiązanie', 'value': r'$x \in \mathbb{R}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Utożsamianie ujemnej delty z brakiem rozwiązań nierówności",
            badge=r"\Delta < 0 \text{ oraz } a > 0 \longrightarrow x \in \mathbb{R} \neq \emptyset",
            caption="Ujemna delta oznacza BRAK MIEJSC ZEROWYCH (równanie nie ma rozwiązań), ale nierówność może być spełniona przez WSZYSTKIE liczby rzeczywiste!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Pisanie $x \in \emptyset$ zawsze, gdy $\Delta < 0$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Dla $a > 0$ i pytania $> 0$ rozwiązaniem jest $x \in \mathbb{R}$', 'color': C_SUCCESS},
                {'label': 'Kiedy zbiór pusty', 'value': r'Tylko gdy pytają o $\le 0$ przy paraboli wiszącej nad osią', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
