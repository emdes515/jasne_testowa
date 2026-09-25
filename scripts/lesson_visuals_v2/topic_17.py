"""
topic_17.py - Dział 17: Geometria Analityczna na Płaszczyźnie Kartezjańskiej (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_17_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L17.1: Długość odcinka i środek odcinka
        tab0 = make_plot_diagram(
            title="Długość odcinka i współrzędne środka odcinka",
            badge=r"|AB| = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}, \quad S = \left(\frac{x_A + x_B}{2}, \; \frac{y_A + y_B}{2}\right)",
            caption="Długość odcinka wynika bezpośrednio z twierdzenia Pitagorasa w układzie współrzędnych, a środek to średnia arytmetyczna współrzędnych końców.",
            segments=[
                {'from': [40, 200], 'to': [460, 200], 'color': C_SLATE, 'strokeWidth': 2}, # OX
                {'from': [200, 30], 'to': [200, 240], 'color': C_SLATE, 'strokeWidth': 2}, # OY
                {'from': [120, 160], 'to': [360, 80], 'color': C_PRIMARY, 'strokeWidth': 3}, # AB
                {'from': [120, 160], 'to': [360, 160], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [360, 160], 'to': [360, 80], 'color': C_SUCCESS, 'strokeWidth': 1.5, 'dashed': True}
            ],
            points=[
                {'x': 120, 'y': 160, 'color': C_PRIMARY, 'label': 'A(x_A, y_A)', 'attach': 'sw'},
                {'x': 360, 'y': 80, 'color': C_PRIMARY, 'label': 'B(x_B, y_B)', 'attach': 'ne'},
                {'x': 240, 'y': 120, 'color': C_SUCCESS, 'label': 'S(x_S, y_S)', 'attach': 'n'}
            ],
            labels=[
                {'x': 240, 'y': 175, 'text': r'\Delta x = x_B - x_A', 'color': C_SKY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 375, 'y': 120, 'text': r'\Delta y = y_B - y_A', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'}
            ],
            metrics=[
                {'label': 'Długość odcinka', 'value': r'$|AB| = \sqrt{\Delta x^2 + \Delta y^2}$', 'color': C_PRIMARY},
                {'label': 'Współrzędna x środka', 'value': r'$x_S = \frac{x_A + x_B}{2}$', 'color': C_SKY},
                {'label': 'Współrzędna y środka', 'value': r'$y_S = \frac{y_A + y_B}{2}$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Obliczanie długości i środka odcinka krok po kroku",
            badge=r"A(-4, 7), \; B(2, -1) \implies S = \left(\frac{-4 + 2}{2}, \frac{7 + (-1)}{2}\right) = (-1, 3), \quad |AB| = \sqrt{6^2 + (-8)^2} = 10",
            caption="Zadanie maturalne CKE: podstawiasz współrzędne końców odcinka do wzorów z Karty Wzorów CKE.",
            steps=[
                {'num': 1, 'title': 'Oblicz współrzędne środka S', 'desc': r'$x_S = \frac{-4 + 2}{2} = -1, \quad y_S = \frac{7 - 1}{2} = 3 \implies S(-1, 3)$.', 'color': C_SKY},
                {'num': 2, 'title': 'Oblicz różnice współrzędnych', 'desc': r'$x_B - x_A = 2 - (-4) = 6, \quad y_B - y_A = -1 - 7 = -8$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz długość |AB|', 'desc': r'$|AB| = \sqrt{6^2 + (-8)^2} = \sqrt{36 + 64} = \sqrt{100} = 10$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Środek S', 'value': '$S(-1, 3)$', 'color': C_SKY},
                {'label': 'Różnice współrzędnych', 'value': '$\\Delta x = 6, \\; \\Delta y = -8$', 'color': C_PRIMARY},
                {'label': 'Długość odcinka |AB|', 'value': '$10$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Błędy ze znakami minus przy odejmowaniu liczb ujemnych",
            badge=r"x_B - x_A = 2 - (-4) = 2 + 4 = 6 \neq 2 - 4 = -2",
            caption="Odejmowanie liczby ujemnej to dodawanie! Podnoszenie do kwadratu w formule na długość zawsze daje liczbę nieujemną: (-8)² = +64, a nie -64.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zapisanie $2 - 4 = -2$ lub $(-8)^2 = -64$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Zawsze stosuj nawias: $(x_B - (x_A))^2$. Kwadrat usuwa każdy minus!', 'color': C_SUCCESS},
                {'label': 'Środek odcinka', 'value': r'W środku jest PLUS: $\frac{x_A + x_B}{2}$ (średnia arytmetyczna)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L17.2: Proste równoległe i prostopadłe
        tab0 = make_plot_diagram(
            title="Warunki równoległości i prostopadłości prostych",
            badge=r"k \parallel l \longrightarrow a_1 = a_2 \quad | \quad k \perp l \longrightarrow a_1 \cdot a_2 = -1 \longrightarrow a_2 = -\frac{1}{a_1}",
            caption="Proste równoległe mają identyczny współczynnik kierunkowy. Proste prostopadłe mają współczynniki przeciwne i odwrotne.",
            curves=[
                {'fn': '0.75*x - 1', 'domain': [-3, 5], 'color': C_PRIMARY, 'strokeWidth': 2.5, 'label': 'k: y = 0.75x - 1'},
                {'fn': '0.75*x + 2', 'domain': [-4, 4], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True, 'label': 'l || k: a = 0.75'},
                {'fn': '-1.333*x + 1', 'domain': [-2, 4], 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': 'm ⊥ k: a = -4/3'}
            ],
            segments=[
                {'from': [40, 160], 'to': [460, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [200, 30], 'to': [200, 240], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            metrics=[
                {'label': 'Równoległość (||)', 'value': r'$a_1 = a_2$ (ten sam kąt nachylenia)', 'color': C_SKY},
                {'label': 'Prostopadłość (⊥)', 'value': r'$a_1 \cdot a_2 = -1 \implies a_2 = -\frac{1}{a_1}$', 'color': C_SUCCESS},
                {'label': 'Wyraz wolny b', 'value': r'Wyznaczamy podstawiając punkt $(x_0, y_0)$', 'color': C_PRIMARY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie prostej prostopadłej przechodzącej przez punkt krok po kroku",
            badge=r"k: y = 2x - 5, \quad P(3, 4) \implies a_{\perp} = -\frac{1}{2} \implies 4 = -\frac{1}{2} \cdot 3 + b \implies b = 5{,}5",
            caption="Odwracasz współczynnik kierunkowy ze zmianą znaku, a następnie obliczasz wyraz wolny b podstawiając współrzędne punktu P.",
            steps=[
                {'num': 1, 'title': 'Wyznacz współczynnik prostopadłej', 'desc': r'$a_1 = 2 \implies a_{\perp} = -\frac{1}{a_1} = -\frac{1}{2}$.', 'color': C_SKY},
                {'num': 2, 'title': 'Podstaw współrzędne punktu P(3, 4)', 'desc': r'$y = ax + b \implies 4 = -\frac{1}{2} \cdot 3 + b \implies 4 = -1{,}5 + b$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zapisz ostateczne równanie', 'desc': r'$b = 4 + 1{,}5 = 5{,}5 = \frac{11}{2} \implies y = -\frac{1}{2}x + \frac{11}{2}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Oryginalne a', 'value': '$a_1 = 2$', 'color': C_SKY},
                {'label': 'Nowe a prostopadłe', 'value': r'$a_{\perp} = -\frac{1}{2}$', 'color': C_PRIMARY},
                {'label': 'Równanie prostej', 'value': r'$y = -\frac{1}{2}x + \frac{11}{2}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zmiana znaku bez odwrócenia lub brak zmiany znaku",
            badge=r"a_{\perp} = -\frac{1}{a_1} \quad (\text{PRZECIWNY I ODWROTNY}) \neq -a_1 \neq \frac{1}{a_1}",
            caption="Współczynnik prostopadłej musi być ZARÓWNO przeciwny (inny znak), JAK I odwrotny (odwrócony ułamek). Jeśli a = 3, to a_perp = -1/3.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Przyjęcie $a_{\perp} = -2$ (tylko przeciwny) lub $a_{\perp} = \frac{1}{2}$ (tylko odwrotny)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Odwróć ułamek i zmień znak: $\frac{2}{3} \longrightarrow -\frac{3}{2}$', 'color': C_SUCCESS},
                {'label': 'Równoległe', 'value': r'Dla prostych równoległych współczynnik jest identyczny: $a_1 = a_2$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L17.3: Równanie okręgu w postaci kanonicznej
        tab0 = make_plot_diagram(
            title="Równanie okręgu w postaci kanonicznej",
            badge=r"(x - a)^2 + (y - b)^2 = r^2 \quad | \quad S(a, b), \quad r > 0",
            caption="Środek okręgu to punkt S(a, b). Po prawej stronie równania stoi kwadrat promienia r²!",
            circles=[
                {'cx': 280, 'cy': 120, 'r': 60, 'stroke': C_PRIMARY, 'fill': 'rgba(255, 184, 0, 0.08)', 'strokeWidth': 2.5}
            ],
            segments=[
                {'from': [40, 200], 'to': [460, 200], 'color': C_SLATE, 'strokeWidth': 2}, # OX
                {'from': [160, 30], 'to': [160, 240], 'color': C_SLATE, 'strokeWidth': 2}, # OY
                {'from': [280, 120], 'to': [340, 120], 'color': C_SUCCESS, 'strokeWidth': 2}  # promień
            ],
            points=[
                {'x': 280, 'y': 120, 'color': C_PRIMARY, 'label': 'S(a, b)', 'attach': 's'},
                {'x': 340, 'y': 120, 'color': C_SUCCESS, 'label': 'P(x, y)', 'attach': 'e'}
            ],
            labels=[
                {'x': 310, 'y': 110, 'text': 'promień r', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Środek okręgu', 'value': r'$S(a, b)$ (z przeciwnymi znakami)', 'color': C_PRIMARY},
                {'label': 'Kwadrat promienia', 'value': r'$r^2$ (prawa strona równania)', 'color': C_SKY},
                {'label': 'Promień r', 'value': r'$r = \sqrt{r^2}$ (zawsze $r > 0$)', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Odczytywanie środka i promienia okręgu krok po kroku",
            badge=r"(x + 3)^2 + (y - 5)^2 = 16 \implies a = -3, \quad b = 5 \implies S(-3, 5), \quad r = \sqrt{16} = 4",
            caption="Wypisujesz środek S odwracając znaki z nawiasów, a promień r wyznaczasz pierwiastkując liczbę po prawej stronie.",
            steps=[
                {'num': 1, 'title': 'Zidentyfikuj a ze zmiany znaku', 'desc': r'W pierwszym nawiasie jest $(x + 3) = (x - (-3))$, stąd $a = -3$.', 'color': C_SKY},
                {'num': 2, 'title': 'Zidentyfikuj b ze zmiany znaku', 'desc': r'W drugim nawiasie jest $(y - 5)$, stąd $b = +5$. Środek to $S(-3, 5)$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz promień r', 'desc': r'Po prawej stronie stoi $r^2 = 16 \implies r = \sqrt{16} = 4$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Współrzędna a', 'value': '$a = -3$', 'color': C_SKY},
                {'label': 'Współrzędna b', 'value': '$b = 5$', 'color': C_PRIMARY},
                {'label': 'Promień r', 'value': '$r = 4$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie r² z r oraz odwracanie znaków współrzędnych środka",
            badge=r"(x + 2)^2 + (y - 7)^2 = 25 \implies S(-2, 7), \quad r = 5 \neq 25",
            caption="Najczęstsze błędy maturalne: podanie r = 25 zamiast r = 5 oraz przepisanie znaków z nawiasów (2, -7) zamiast ich odwrócenia (-2, 7).",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Przyjęcie $r = 25$ zamiast wyciągnięcia pierwiastka $\sqrt{25} = 5$', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Środek $S(2, -7)$ z błędnymi znakami', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Odwróć znaki z nawiasów dla S i spierwiastkuj prawą stronę dla r', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
