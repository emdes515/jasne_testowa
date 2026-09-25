"""
topic_21.py - Dział 21: Zadania Optymalizacyjne z Funkcją Kwadratową (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram, make_geometry_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_21_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L21.1: Wyznaczanie funkcji jednej zmiennej
        tab0 = make_geometry_diagram(
            title="Działka prostokątna ogrodzona z 3 stron – wyznaczanie funkcji celu",
            badge=r"2x + y = 120 \longrightarrow y = 120 - 2x \longrightarrow P(x) = x(120 - 2x) = -2x^2 + 120x",
            caption="Wyprowadzamy funkcję jednej zmiennej podstawiając wyznaczoną drugą niewiadomą (y) do wzoru na optymalizowaną wielkość (pole P).",
            polygons=[
                {
                    'points': [[120, 90], [380, 90], [380, 200], [120, 200]],
                    'fill': 'rgba(16, 185, 129, 0.08)',
                    'stroke': C_SUCCESS,
                    'strokeWidth': 2.5
                }
            ],
            segments=[
                # Ściana budynku u góry (szary gruby mur)
                {'from': [100, 90], 'to': [400, 90], 'color': C_SLATE, 'strokeWidth': 5}
            ],
            labels=[
                {'x': 250, 'y': 75, 'text': 'ściana budynku (brak ogrodzenia)', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 105, 'y': 145, 'text': 'bok x', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'end'},
                {'x': 395, 'y': 145, 'text': 'bok x', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 250, 'y': 220, 'text': 'bok y = 120 - 2x', 'color': C_SUCCESS, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 250, 'y': 145, 'text': 'Pole P(x) = x · (120 - 2x)', 'color': C_TEXT, 'fontSize': 13, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Łączna długość płotu', 'value': '$2x + y = 120$', 'color': C_SKY},
                {'label': 'Wyznaczona zmienna y', 'value': '$y = 120 - 2x$', 'color': C_PRIMARY},
                {'label': 'Funkcja pola P(x)', 'value': r'$-2x^2 + 120x$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyprowadzanie wzoru funkcji optymalizacyjnej krok po kroku",
            badge=r"2x + y = 120 \longrightarrow y = 120 - 2x \longrightarrow P(x) = x \cdot y = -2x^2 + 120x",
            caption="Wypisujesz zależność liniową między zmiennymi, wyznaczasz jedną z nich i wstawiasz do iloczynu.",
            steps=[
                {'num': 1, 'title': 'Zapisz warunek na długość płotu', 'desc': r'Dwa boki $x$ oraz jeden bok $y$: $2x + y = 120$.', 'color': C_SKY},
                {'num': 2, 'title': 'Wyznacz zmienną y', 'desc': r'$y = 120 - 2x$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zapisz wzór na pole prostokąta', 'desc': r'$P(x) = x \cdot (120 - 2x) = -2x^2 + 120x$. Jest to funkcja kwadratowa o $a = -2 < 0$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Warunek obwodu', 'value': '$2x + y = 120$', 'color': C_SKY},
                {'label': 'Zmienna zależna', 'value': '$y = 120 - 2x$', 'color': C_PRIMARY},
                {'label': 'Wzór funkcji', 'value': r'$P(x) = -2x^2 + 120x$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie liczby boków płotu lub błędy w nawiasach",
            badge=r"2x + y = 120 \quad (\text{3 boki ogrodzone}) \neq 2x + 2y = 120 \quad (\text{4 boki})",
            caption="Uważnie czytaj, które boki są grodzone! Jeśli działka przylega do rzeki lub muru, płot stawiamy tylko z 3 stron, a nie z 4.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Zapisanie $2x + 2y = 120$ mimo, że jedna ściana nie wymaga płotu', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Opuszczenie nawiasu przy mnożeniu: $x \cdot 120 - 2x$ zamiast $x(120 - 2x)$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Zawsze wykonaj staranny rysunek pomocniczy z oznaczeniem ścian', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L21.2: Dziedzina zadania optymalizacyjnego
        tab0 = make_plot_diagram(
            title="Wyznaczanie dziedziny zadania optymalizacyjnego",
            badge=r"x > 0 \quad \text{oraz} \quad y > 0 \longrightarrow 120 - 2x > 0 \longrightarrow x < 60 \longrightarrow D = (0, 60)",
            caption="W geometrii każdy wymiar musi być ściśle dodatni! Dziedzina to część wspólna warunków na wszystkie boki figury.",
            segments=[
                {'from': [40, 200], 'to': [460, 200], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [80, 200], 'to': [360, 200], 'color': C_PRIMARY, 'strokeWidth': 4}
            ],
            points=[
                {'x': 80, 'y': 200, 'color': C_DANGER, 'dot': 'hollow', 'label': '0', 'attach': 's'},
                {'x': 360, 'y': 200, 'color': C_DANGER, 'dot': 'hollow', 'label': '60', 'attach': 's'}
            ],
            labels=[
                {'x': 220, 'y': 175, 'text': 'D = (0, 60) – dopuszczalne wartości x', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Warunek boku x', 'value': '$x > 0$', 'color': C_SKY},
                {'label': 'Warunek boku y', 'value': r'$120 - 2x > 0 \longrightarrow x < 60$', 'color': C_PRIMARY},
                {'label': 'Dziedzina ostateczna', 'value': r'$D = (0, 60)$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie dziedziny krok po kroku",
            badge=r"\begin{cases} x > 0 \\ 120 - 2x > 0 \end{cases} \longrightarrow \begin{cases} x > 0 \\ x < 60 \end{cases} \longrightarrow x \in (0, 60)",
            caption="Na maturze CKE brak wyznaczenia dziedziny kosztuje utratę 1 punktu za całe zadanie optymalizacyjne.",
            steps=[
                {'num': 1, 'title': 'Zapisz warunek dodatniości boku x', 'desc': r'Długość boku musi być liczbą dodatnią: $x > 0$.', 'color': C_SKY},
                {'num': 2, 'title': 'Zapisz warunek dodatniości boku y', 'desc': r'$y > 0 \longrightarrow 120 - 2x > 0 \longrightarrow -2x > -120 \longrightarrow x < 60$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wyznacz część wspólną przedziałów', 'desc': r'$x > 0$ oraz $x < 60 \longrightarrow D = (0, 60)$. Przedział jest otwarty.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Ograniczenie dolne', 'value': '$x > 0$', 'color': C_SKY},
                {'label': 'Ograniczenie górne', 'value': '$x < 60$', 'color': C_PRIMARY},
                {'label': 'Dziedzina D', 'value': r'$(0, 60)$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Brak zapisu dziedziny lub przedział domknięty z zerem",
            badge=r"D = (0, 60) \neq \langle 0, 60 \rangle \quad (x = 0 \text{ nie tworzy figury!})",
            caption="Dla x = 0 lub x = 60 pole wynosi zero (brak prostokąta, figura zdegenerowana do odcinka). Dziedzina ZAWSZE musi być przedziałem otwartym!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Całkowity brak zapisu dziedziny (strata 1 pkt w kluczu CKE)', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Domknięcie przedziału $\langle 0, 60 \rangle$ (długość boku nie może wynosić 0)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Wypisz nierówności dla WSZYSTKICH boków i wyznacz przedział otwarty', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L21.3: Wyznaczanie wierzchołka paraboli i wartości optymalnej
        tab0 = make_plot_diagram(
            title="Wierzchołek paraboli jako wartość maksymalna funkcji celu",
            badge=r"P(x) = -2x^2 + 120x \longrightarrow x_w = -\frac{b}{2a} = -\frac{120}{2 \cdot (-2)} = 30 \in D \longrightarrow P_{\max} = P(30) = 1800",
            caption="Współczynnik a = -2 < 0, ramiona paraboli skierowane są w dół, więc funkcja osiąga wartość największą dokładnie w wierzchołku.",
            curves=[
                {
                    'fn': '-0.004*(x-250)**2 + 220',
                    'domain': [100, 400],
                    'color': C_PRIMARY,
                    'strokeWidth': 3,
                    'label': 'P(x) = -2x² + 120x'
                }
            ],
            segments=[
                {'from': [40, 240], 'to': [460, 240], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [250, 40], 'to': [250, 240], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True}
            ],
            points=[
                {'x': 250, 'y': 60, 'color': C_SUCCESS, 'label': 'W(30, 1800)', 'attach': 'n'}
            ],
            labels=[
                {'x': 250, 'y': 255, 'text': 'x_w = 30 m', 'color': C_SKY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 265, 'y': 75, 'text': 'Maksymalne pole: 1800 m²', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'}
            ],
            metrics=[
                {'label': 'Odcięta wierzchołka', 'value': r'$x_w = -\frac{b}{2a} = 30$', 'color': C_SKY},
                {'label': 'Drugi wymiar', 'value': r'$y = 120 - 2(30) = 60$', 'color': C_PRIMARY},
                {'label': 'Maksymalne pole', 'value': r'$P_{\max} = 30 \cdot 60 = 1800\text{ m}^2$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Pełne 4-punktowe rozwiązanie zadania optymalizacyjnego CKE",
            badge=r"P(x) = -2x^2 + 120x, \quad D = (0, 60) \longrightarrow x = 30\text{ m}, \quad y = 60\text{ m}, \quad P = 1800\text{ m}^2",
            caption="Kompletny 4-etapowy schemat odpowiedzi zapewniający 100% punktów w kluczu CKE.",
            steps=[
                {'num': 1, 'title': 'Krok 1: Wzór funkcji celu i dziedzina (1 pkt)', 'desc': r'$P(x) = -2x^2 + 120x$ dla $x \in (0, 60)$.', 'color': C_SKY},
                {'num': 2, 'title': 'Krok 2: Uzasadnienie istnienia maksimum (1 pkt)', 'desc': r'Współczynnik $a = -2 < 0$, więc ramiona paraboli skierowane są w dół. Funkcja osiąga maksimum w wierzchołku.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Krok 3: Obliczenie wierzchołka i sprawdzenie dziedziny (1 pkt)', 'desc': r'$x_w = -\frac{120}{2 \cdot (-2)} = 30$. Ponieważ $30 \in (0, 60)$, punkt należy do dziedziny.', 'color': C_SUCCESS},
                {'num': 4, 'title': 'Krok 4: Wymiary i wartość optymalna (1 pkt)', 'desc': r'$y = 120 - 2 \cdot 30 = 60\text{ m}$. Maksymalne pole to $P(30) = 30 \cdot 60 = 1800\text{ m}^2$.', 'color': C_PURPLE}
            ],
            metrics=[
                {'label': 'Szerokość x', 'value': '$30\\text{ m}$', 'color': C_SKY},
                {'label': 'Długość y', 'value': '$60\\text{ m}$', 'color': C_PRIMARY},
                {'label': 'Pole maksymalne', 'value': '$1800\\text{ m}^2$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Brak sprawdzenia czy xw należy do dziedziny lub brak odpowiedzi na pytanie końcowe",
            badge=r"x_w \in D \quad | \quad \text{Czy zadanie pyta o wymiary x, y czy o samo pole?}",
            caption="CKE często pyta o 'wymiary działki' ALBO o 'największe pole'. Udzielenie odpowiedzi na inne pytanie niż zadano kosztuje 1 punkt na maturze.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Brak formalnego sprawdzenia: $x_w \in D$ (wymagane w kryteriach CKE)', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Podanie tylko $x = 30$, gdy zadanie pytało o "wymiary działki" ($x$ i $y$) lub samo pole', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Zawsze podawaj komplet: oba wymiary ($x, y$) oraz wartość maksymalną ($P_{\max}$)', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
