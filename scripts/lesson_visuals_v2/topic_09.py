"""
topic_09.py - Dział 1.9: Odczytywanie informacji z wykresu funkcji (4 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals with Interactive Mafs Engine
100% Real KaTeX, 0% Emojis, Analytically Verified Coordinates.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_09_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.9.1: Odczyt dziedziny D (oś OX) i zbioru wartości ZW (oś OY)
        plot_data = {
            'xRange': [-6, 7],
            'yRange': [-3, 5],
            'gridStep': 1,
            'segments': [
                {'from': [-4.0, -1.0], 'to': [-1.0, 3.0], 'color': C_PRIMARY, 'startDot': 'solid', 'endDot': 'none', 'weight': 3},
                {'from': [-1.0, 3.0], 'to': [2.0, 0.0], 'color': C_PRIMARY, 'weight': 3},
                {'from': [2.0, 0.0], 'to': [5.0, 2.0], 'color': C_PRIMARY, 'startDot': 'none', 'endDot': 'solid', 'weight': 3}
            ],
            'points': [
                {'x': -4.0, 'y': -1.0, 'color': C_PRIMARY, 'label': 'A(-4, -1)', 'attach': 'sw'},
                {'x': 5.0, 'y': 2.0, 'color': C_PRIMARY, 'label': 'B(5, 2)', 'attach': 'ne'},
                {'x': -1.0, 'y': 3.0, 'color': C_SUCCESS, 'label': 'max: y = 3', 'attach': 'n'}
            ],
            'labels': []
        }
        tab0 = make_plot_diagram(
            title='Odczyt dziedziny D (oś pozioma OX) i zbioru wartości ZW (oś pionowa OY)',
            badge=r'D_f \subset OX,\quad ZW_f \subset OY',
            caption='Dziedzinę odczytujemy "od lewej do prawej" na osi OX (rzut poziomy). Zbiór wartości odczytujemy "od dołu do góry" na osi OY (rzut pionowy). Kółko zamalowane = nawias domknięty [ ], otwarte = okrągły ( ).',
            plotData=plot_data,
            metrics=[
                {'label': 'Dziedzina $D$', 'value': 'Oś pozioma $OX$ (od lewej do prawej)', 'color': C_SKY},
                {'label': 'Zbiór wartości $ZW$', 'value': 'Oś pionowa $OY$ (od dołu do góry)', 'color': C_SUCCESS},
                {'label': 'Punkty brzegowe', 'value': 'Zamalowane = domknięte, puste = otwarte', 'color': C_PRIMARY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Odczyt dziedziny i zbioru wartości krok po kroku",
            badge=r"D_f = [-4, 5] \subset OX \quad \text{oraz} \quad ZW_f = [-1, 3] \subset OY",
            caption="Rzutujesz wykres na poziomą oś OX, aby wyznaczyć dziedzinę D, a następnie na pionową oś OY, aby wyznaczyć zbiór wartości ZW.",
            steps=[
                {'num': 1, 'title': 'Rzut poziomy na OX (Dziedzina D)', 'desc': r'Szukasz najdalej wysuniętego punktu w lewo ($x = -4$) i w prawo ($x = 5$). Kropki pełne dają $D = [-4, 5]$.', 'color': C_SKY},
                {'num': 2, 'title': 'Rzut pionowy na OY (Zbiór wartości ZW)', 'desc': r'Szukasz punktu najniższego ($y_{\min} = -1$) i najwyższego szczytu ($y_{\max} = 3$). Otrzymujesz $ZW = [-1, 3]$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Weryfikacja nawiasów', 'desc': 'Kółko zamalowane oznacza przynależność do przedziału $[$ lub $]$, kółko puste oznacza nawias okrągły $($ lub $)$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Dziedzina $D$', 'value': r'$[-4, 5]$ (z osi $OX$)', 'color': C_SKY},
                {'label': 'Zbiór wartości $ZW$', 'value': r'$[-1, 3]$ (z osi $OY$)', 'color': C_SUCCESS},
                {'label': 'Reguła rzutów', 'value': '$D$ = lewo-prawo, $ZW$ = dół-góra', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Pomylenie osi OX z OY przy odczycie dziedziny i ZW",
            badge=r"D_f \subset OX \neq OY \quad \text{oraz} \quad ZW_f \subset OY \neq OX",
            caption="Najczęstszy błąd na maturze to odczytanie dziedziny z pionowej osi OY! Pamiętaj: dziedzina to argumenty x (oś pozioma), a zbiór wartości to wartości y (oś pionowa).",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Podanie $D = [-1, 3]$ (zamiana osi miejscami)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'$D$ tylko z $OX$ (pozioma), $ZW$ tylko z $OY$ (pionowa)', 'color': C_SUCCESS},
                {'label': 'Puste kółko', 'value': 'Wymusza nawias otwarty okrągły $($ lub $)$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L1.9.2: Odczyt miejsc zerowych f(x) = 0 oraz punktu przecięcia z osią OY
        plot_data = {
            'xRange': [-4, 6],
            'yRange': [-5, 4],
            'gridStep': 1,
            'parabola': {
                'a': 0.375,
                'p': 1.0,
                'q': -3.375,
                'color': C_PRIMARY
            },
            'points': [
                {'x': -2.0, 'y': 0.0, 'color': C_SUCCESS, 'label': 'x₁ = -2', 'attach': 'nw'},
                {'x': 4.0, 'y': 0.0, 'color': C_SUCCESS, 'label': 'x₂ = 4', 'attach': 'ne'},
                {'x': 0.0, 'y': -3.0, 'color': C_SKY, 'label': '(0, -3)', 'attach': 'e'}
            ],
            'labels': [
                {'x': 1.0, 'y': -4.2, 'text': 'Wierzchołek i oś symetrii', 'color': C_MUTED, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Miejsca zerowe i punkt przecięcia z osią OY',
            badge=r'f(x) = 0 \longrightarrow x \in OX;\quad P = (0, f(0)) \in OY',
            caption='Miejsce zerowe to punkt na poziomej osi OX, gdzie wykres ją przecina. Punkt (0, f(0)) to punkt na pionowej osi OY.',
            plotData=plot_data,
            metrics=[
                {'label': 'Miejsca zerowe', 'value': 'Podajesz wyłącznie argumenty $x$: $x = -2, x = 4$', 'color': C_SUCCESS},
                {'label': 'Przecięcie z $OY$', 'value': 'Zawsze dla $x = 0$: punkt $(0, f(0))$', 'color': C_SKY},
                {'label': 'Puste kółko na $OX$', 'value': 'NIE jest miejscem zerowym!', 'color': C_DANGER}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Odczytywanie miejsc zerowych i przecięcia z OY krok po kroku",
            badge=r"f(x) = 0 \longrightarrow x \in \{-2, 4\} \quad \text{oraz} \quad P_{OY} = (0, -3)",
            caption="Lokalizujesz punkty wspólne z osią OX i odczytujesz argumenty x, a dla osi OY odczytujesz wartość f(0).",
            steps=[
                {'num': 1, 'title': 'Zlokalizuj oś poziomą OX', 'desc': r'Szukaj przecięć z linią $y = 0$. Punkty przecięcia to $(-2, 0)$ oraz $(4, 0)$.', 'color': C_SKY},
                {'num': 2, 'title': 'Zapisz miejsca zerowe', 'desc': r'Miejsce zerowe to sama liczba $x$, a nie para współrzędnych: $x_1 = -2$ oraz $x_2 = 4$.', 'color': C_SUCCESS},
                {'num': 3, 'title': 'Odczytaj punkt przecięcia z osią OY', 'desc': r'Szukaj punktu wykresu leżącego na pionowej osi $x = 0$. Tutaj: punkt $(0, -3)$, czyli $f(0) = -3$.', 'color': C_PRIMARY}
            ],
            metrics=[
                {'label': 'Miejsca zerowe', 'value': r'$x_1 = -2,\; x_2 = 4$', 'color': C_SUCCESS},
                {'label': 'Punkt na $OY$', 'value': r'$(0, -3) \implies f(0) = -3$', 'color': C_SKY},
                {'label': 'Typ odpowiedzi', 'value': 'Miejsce zerowe to liczba $x$', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zapis punktu zamiast liczby lub zaliczanie pustego kółka",
            badge=r"\text{Miejsce zerowe: } x = -2 \neq (-2, 0) \quad \text{oraz} \quad \circ \notin \text{miejsca zerowe}",
            caption="Miejsce zerowe to wartość argumentu x! Zapis w postaci punktu (x, y) w pytaniu o liczbę może być uznany za błąd. Ponadto puste kółko na osi OX NIE JEST miejscem zerowym.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': 'Puste kółko $\\circ$ na osi $OX$ wpisane jako rozwiązanie', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': 'Podanie współrzędnych punktu zamiast samej liczby $x$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': 'Miejscem zerowym jest wyłącznie pełna kropka $\\bullet$: $x = x_0$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L1.9.3: Odczytywanie przedziałów monotoniczności (gdzie rośnie, gdzie maleje)
        plot_data = {
            'xRange': [-5, 7],
            'yRange': [-4, 4],
            'gridStep': 1,
            'segments': [
                {'from': [-4.0, -2.0], 'to': [-1.0, 3.0], 'color': C_SUCCESS, 'weight': 3, 'startDot': 'solid'},
                {'from': [-1.0, 3.0], 'to': [3.0, -2.0], 'color': C_DANGER, 'weight': 3},
                {'from': [3.0, -2.0], 'to': [6.0, -2.0], 'color': C_SKY, 'weight': 3, 'endDot': 'solid'}
            ],
            'labels': [
                {'x': -2.5, 'y': 1.2, 'text': 'ROŚNIE: [-4, -1]', 'color': C_SUCCESS, 'attach': 'nw'},
                {'x': 1.0, 'y': 1.2, 'text': 'MALEJE: [-1, 3]', 'color': C_DANGER, 'attach': 'ne'},
                {'x': 4.5, 'y': -1.4, 'text': 'STAŁA: [3, 6]', 'color': C_SKY, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Monotoniczność funkcji: Idziemy "pod górkę" i "z górki"',
            badge=r'f \nearrow \longleftrightarrow x_1 < x_2 \longrightarrow f(x_1) < f(x_2)',
            caption='Monotoniczność śledzimy ZAWSZE od lewej do prawej! "Pod górkę" oznacza rosnącą, "z górki" malejącą. Przedziały monotoniczności podajemy DLA ARGUMENTÓW X na osi OX!',
            plotData=plot_data,
            metrics=[
                {'label': 'Przedziały', 'value': 'Podajemy ZAWSZE dla osi poziomej $OX$!', 'color': C_PRIMARY},
                {'label': 'Kierunek analizy', 'value': 'Od lewej do prawej strony wykresu', 'color': C_SUCCESS},
                {'label': 'Częsty błąd', 'value': 'Podanie wartości $y$ zamiast argumentów $x$', 'color': C_DANGER}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie przedziałów monotoniczności krok po kroku",
            badge=r"f \nearrow \text{ w } [-4, -1], \quad f \searrow \text{ w } [-1, 3], \quad f = \text{const w } [3, 6]",
            caption="Wędrujesz wzdłuż wykresu od lewej do prawej. Odczytujesz przedziały z osi poziomej OX.",
            steps=[
                {'num': 1, 'title': 'Zawsze od lewej do prawej', 'desc': r'Wyobraź sobie ruch punktu po wykresie wraz ze wzrostem $x$.', 'color': C_SKY},
                {'num': 2, 'title': 'Zidentyfikuj zachowanie wykresu', 'desc': r'Od $x = -4$ do $x = -1$ idziemy w górę ($\nearrow$), od $x = -1$ do $x = 3$ w dół ($\searrow$), a od $x = 3$ do $x = 6$ poziomo.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Odczytaj przedziały z osi OX', 'desc': r'Przedziały monotoniczności to przedziały argumentów $x$: rośnie w $[-4, -1]$, maleje w $[-1, 3]$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Funkcja rosnąca', 'value': r'$x \in [-4, -1]$', 'color': C_SUCCESS},
                {'label': 'Funkcja malejąca', 'value': r'$x \in [-1, 3]$', 'color': C_DANGER},
                {'label': 'Funkcja stała', 'value': r'$x \in [3, 6]$', 'color': C_SKY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Łączenie przedziałów monotoniczności symbolem sumy (∪)",
            badge=r"f \nearrow \text{ w } \langle-4, -1\rangle \text{ oraz w } \langle 2, 5\rangle \neq \langle-4, -1\rangle \cup \langle 2, 5\rangle",
            caption="Zgodnie ze standardem CKE przedziałów monotoniczności KATEGORYCZNIE NIE WOLNO łączyć symbolem sumy zbiorów ∪! Pomiędzy przedziałami funkcja może mieć niższe wartości.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zapis $A \cup B$ przy podawaniu przedziałów monotoniczności', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': 'Wymienianie przedziałów słownie: "w $A$ oraz w $B$" lub po przecinku', 'color': C_SUCCESS},
                {'label': 'Oś odczytu', 'value': 'Zawsze oś pozioma $OX$, nigdy wartości $y$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 4:
        # L1.9.4: Liczba rozwiązań równania f(x) = m (przecinanie poziomą prostą y = m)
        plot_data = {
            'xRange': [-5, 5],
            'yRange': [-3, 4],
            'gridStep': 1,
            'segments': [
                {'from': [-4.0, -2.0], 'to': [-2.0, 3.0], 'color': C_PRIMARY, 'weight': 3, 'startDot': 'solid'},
                {'from': [-2.0, 3.0], 'to': [0.0, -1.0], 'color': C_PRIMARY, 'weight': 3},
                {'from': [0.0, -1.0], 'to': [2.0, 3.0], 'color': C_PRIMARY, 'weight': 3},
                {'from': [2.0, 3.0], 'to': [4.0, -2.0], 'color': C_PRIMARY, 'weight': 3, 'endDot': 'solid'}
            ],
            'horizontalLines': [
                {'y': 1.0, 'color': C_SUCCESS, 'dashed': True}
            ],
            'points': [
                {'x': -2.8, 'y': 1.0, 'color': C_SUCCESS, 'label': 'x₁', 'attach': 'nw'},
                {'x': -1.0, 'y': 1.0, 'color': C_SUCCESS, 'label': 'x₂', 'attach': 'ne'},
                {'x': 1.0, 'y': 1.0, 'color': C_SUCCESS, 'label': 'x₃', 'attach': 'nw'},
                {'x': 2.8, 'y': 1.0, 'color': C_SUCCESS, 'label': 'x₄', 'attach': 'ne'}
            ],
            'labels': [
                {'x': 0.0, 'y': 1.4, 'text': 'y = 1 (dokładnie 4 rozwiązania: x₁, x₂, x₃, x₄)', 'color': C_SUCCESS, 'attach': 's'}
            ]
        }
        tab0 = make_plot_diagram(
            title='Liczba rozwiązań równania f(x) = m: Pozioma prosta',
            badge=r'f(x) = m \longrightarrow \text{Punkty wspólne wykresu } f \text{ i prostej } y = m',
            caption='Aby ustalić ile rozwiązań ma równanie f(x) = m, kładziemy linijkę POZIOMO na wysokości y = m i liczymy ile razy linijka przetnie wykres.',
            plotData=plot_data,
            metrics=[
                {'label': 'Prosta $y = m$', 'value': 'Zawsze POZIOMA (stała wysokość)', 'color': C_SUCCESS},
                {'label': 'Liczba rozwiązań', 'value': 'Liczba punktów przecięcia wykresu z tą prostą', 'color': C_PRIMARY},
                {'label': 'Puste kółko', 'value': 'NIE tworzy rozwiązania!', 'color': C_DANGER}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Zliczanie rozwiązań równania f(x) = m krok po kroku",
            badge=r"f(x) = 1: 4 \text{ punkty przecięcia z prostą } y = 1 \longrightarrow 4 \text{ rozwiązania}",
            caption="Kładziesz poziomą prostą y = m na żądanej wysokości i zliczasz punkty wspólne z wykresem funkcji.",
            steps=[
                {'num': 1, 'title': 'Zidentyfikuj wysokość m', 'desc': r'Równanie $f(x) = 1$ oznacza poszukiwanie argumentów, dla których funkcja osiąga wysokość $y = 1$.', 'color': C_SKY},
                {'num': 2, 'title': 'Narysuj poziomą prostą', 'desc': r'Prowadzisz poziomą linię $y = 1$ przez całą szerokość układu współrzędnych.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zlicz punkty przecięcia', 'desc': r'Prosta przecina wykres w 4 różnych punktach: $x_1, x_2, x_3, x_4$. Równanie ma dokładnie 4 rozwiązania.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wysokość prostej', 'value': '$y = 1$', 'color': C_SKY},
                {'label': 'Punkty przecięcia', 'value': '4 punkty wspólne', 'color': C_SUCCESS},
                {'label': 'Liczba rozwiązań', 'value': 'Dokładnie 4 rozwiązania', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Kładzenie linijki pionowo zamiast poziomo",
            badge=r"f(x) = m \longrightarrow y = m \text{ (pozioma prosta)} \neq x = m \text{ (pionowa prosta)}",
            caption="Równanie f(x) = m to przecięcie z POZIOMĄ prostą y = m. Pionowa prosta x = m służy do odczytania wartości funkcji f(m), a nie rozwiązywania równania!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Rysowanie pionowej linii na $x = m$ i szukanie przecięć', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Prosta $y = m$ jest zawsze pozioma (wysokość)', 'color': C_SUCCESS},
                {'label': 'Puste kółko na linii', 'value': 'Gdy prosta trafia w puste kółko, ten punkt nie jest rozwiązaniem', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
