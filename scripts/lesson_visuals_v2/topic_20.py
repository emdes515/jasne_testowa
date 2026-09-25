"""
topic_20.py - Dział 20: Statystyka Opisowa (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_statistics_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_20_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L20.1: Średnia arytmetyczna i średnia ważona
        tab0 = make_statistics_diagram(
            title="Średnia arytmetyczna i suma łączna danych",
            badge=r"\bar{x} = \frac{x_1 + \dots + x_n}{n} \longrightarrow \text{Suma} = n \cdot \bar{x} \quad | \quad \bar{s} = \frac{w_1 a_1 + \dots + w_n a_n}{w_1 + \dots + w_n}",
            caption="Kluczowa sztuczka CKE: znajomość średniej pozwala natychmiast wyznaczyć sumę wszystkich liczb: $\\text{suma} = n \\cdot \\bar{x}$.",
            bars=[
                {'x': 100, 'y': 150, 'width': 50, 'height': 60, 'color': C_SKY, 'label': 'x₁=6'},
                {'x': 170, 'y': 120, 'width': 50, 'height': 90, 'color': C_SKY, 'label': 'x₂=9'},
                {'x': 240, 'y': 90, 'width': 50, 'height': 120, 'color': C_SKY, 'label': 'x₃=12'},
                {'x': 330, 'y': 120, 'width': 60, 'height': 90, 'color': C_PRIMARY, 'label': 'śr = 9'}
            ],
            segments=[
                {'from': [80, 210], 'to': [440, 210], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [80, 120], 'to': [440, 120], 'color': C_PRIMARY, 'strokeWidth': 1.8, 'dashed': True}
            ],
            labels=[
                {'x': 440, 'y': 35, 'text': 'średnia arytmetyczna = 9', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'end', 'badge': True}
            ],
            metrics=[
                {'label': 'Średnia arytmetyczna', 'value': r'$\bar{x} = \frac{x_1 + \dots + x_n}{n}$', 'color': C_SKY},
                {'label': 'Suma łączna', 'value': r'$\text{Suma} = n \cdot \bar{x}$', 'color': C_PRIMARY},
                {'label': 'Średnia ważona', 'value': r'$\bar{s} = \frac{w_1 a_1 + \dots + w_n a_n}{w_1 + \dots + w_n}$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Dodanie nowej liczby do zestawu o znanej średniej krok po kroku",
            badge=r"n = 3, \; \bar{x} = 9 \longrightarrow \text{suma} = 3 \cdot 9 = 27 \longrightarrow \text{nowa suma} = 27 + 13 = 40 \longrightarrow \bar{x}_{\text{nowa}} = \frac{40}{4} = 10",
            caption="Zadanie maturalne CKE maj 2024: średnia liczb a, b, c wynosi 9. Oblicz średnią liczb a, b, c, 13.",
            steps=[
                {'num': 1, 'title': 'Wyznacz sumę pierwszych trzech liczb', 'desc': r'$\frac{a + b + c}{3} = 9 \longrightarrow a + b + c = 3 \cdot 9 = 27$.', 'color': C_SKY},
                {'num': 2, 'title': 'Dodaj czwartą liczbę do sumy', 'desc': r'Nowa suma wynosi $27 + 13 = 40$. Liczba elementów wzrosła do $n = 4$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz nową średnią arytmetyczną', 'desc': r'$\bar{x}_{\text{nowa}} = \frac{40}{4} = 10$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Suma początkowa', 'value': '$27$', 'color': C_SKY},
                {'label': 'Nowa suma', 'value': '$40$', 'color': C_PRIMARY},
                {'label': 'Nowa średnia', 'value': '$10$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Dzielenie nowej sumy przez starą liczbę danych lub mylenie średniej ze średnią średnich",
            badge=r"\bar{x}_{\text{nowa}} = \frac{\text{suma} + x_{n+1}}{n + 1} \neq \frac{\text{suma} + x_{n+1}}{n}",
            caption="Gdy do zestawu danych dodajesz nową liczbę, mianownik ZWIĘKSZA SIĘ o 1! Jeśli było 3 liczby i dodajesz czwartą, dzielisz przez 4, a nie przez 3.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Pozostawienie starego mianownika $n$ po dodaniu nowych elementów', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Liczenie średniej ze średnich bez uwzględnienia wag liczności grup', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Zawsze przeliczaj na sumę bezwzględną: $\text{Suma} = n \cdot \bar{x}$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L20.2: Mediana, dominanta i rozstęp
        tab0 = make_statistics_diagram(
            title="Mediana, dominanta i rozstęp zestawu danych",
            badge=r"\text{Uporządkuj niemalejąco!} \quad | \quad M_e = x_{\frac{n+1}{2}} \text{ lub } \frac{x_{\frac{n}{2}} + x_{\frac{n}{2}+1}}{2}",
            caption="Mediana to wartość środkowa w uporządkowanym ciągu. Jeśli liczba danych jest parzysta, bierzemy średnią arytmetyczną dwóch środkowych liczb.",
            bars=[
                {'x': 100, 'y': 150, 'width': 35, 'height': 60, 'color': C_SLATE, 'label': '2'},
                {'x': 150, 'y': 130, 'width': 35, 'height': 80, 'color': C_SLATE, 'label': '3'},
                {'x': 200, 'y': 90, 'width': 35, 'height': 120, 'color': C_PRIMARY, 'label': '5 (środek)'},
                {'x': 250, 'y': 90, 'width': 35, 'height': 120, 'color': C_PRIMARY, 'label': '7 (środek)'},
                {'x': 300, 'y': 60, 'width': 35, 'height': 150, 'color': C_SLATE, 'label': '8'},
                {'x': 350, 'y': 40, 'width': 35, 'height': 170, 'color': C_SLATE, 'label': '10'}
            ],
            segments=[
                {'from': [80, 210], 'to': [440, 210], 'color': C_SLATE, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 242, 'y': 30, 'text': r'Mediana: (5 + 7) / 2 = 6', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Nieparzyste n', 'value': 'Dokładnie element środkowy', 'color': C_SKY},
                {'label': 'Parzyste n', 'value': r'Średnia 2 środkowych: $\frac{a+b}{2}$', 'color': C_PRIMARY},
                {'label': 'Rozstęp', 'value': r'$R = x_{\max} - x_{\min}$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie mediany liczb krok po kroku",
            badge=r"(7, 2, 9, 3, 5, 8) \longrightarrow (2, 3, 5, 7, 8, 9) \longrightarrow M_e = \frac{5 + 7}{2} = 6",
            caption="Krok bezwzględny: zanim wskażesz środkowe liczby, MUSISZ ustawić zestaw liczb w kolejności rosnącej!",
            steps=[
                {'num': 1, 'title': 'Uporządkuj liczby niemalejąco', 'desc': r'Zestaw $(7, 2, 9, 3, 5, 8)$ po uporządkowaniu: $2, 3, 5, 7, 8, 9$.', 'color': C_SKY},
                {'num': 2, 'title': 'Określ liczbę danych i wskaż środek', 'desc': r'Jest $n = 6$ liczb (liczba parzysta). Dwa środkowe elementy to 3. i 4. liczba: $5$ oraz $7$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz średnią dwóch liczb środkowych', 'desc': r'$M_e = \frac{5 + 7}{2} = \frac{12}{2} = 6$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Liczba danych', 'value': '$n = 6$', 'color': C_SKY},
                {'label': 'Elementy środkowe', 'value': '$5$ oraz $7$', 'color': C_PRIMARY},
                {'label': 'Mediana Me', 'value': '$6$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Wyznaczanie mediany z nieuporządkowanego zestawu liczb",
            badge=r"\text{Brak uporządkowania danych} \longrightarrow \text{Gwarantowane 0 punktów na maturze}",
            caption="Uczniowie często biorą liczby ze środka listy dokładnie w takiej kolejności, jak podano w treści zadania. To kardynalny błąd!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Wskazanie środka w nieuporządkowanym ciągu (np. dla $7, 2, 9, 3$ wzięcie $\frac{2+9}{2}=5{,}5$ zamiast $2, 3, 7, 9 \longrightarrow 5$)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'ZAWSZE przepisz liczby od najmniejszej do największej', 'color': C_SUCCESS},
                {'label': 'Dominanta', 'value': r'Wartość występująca najczęściej w zestawie', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L20.3: Odchylenie standardowe i wariancja
        tab0 = make_statistics_diagram(
            title="Wariancja i odchylenie standardowe – miary rozrzutu",
            badge=r"\sigma^2 = \frac{(a_1 - \bar{a})^2 + \dots + (a_n - \bar{a})^2}{n}, \quad \sigma = \sqrt{\sigma^2}",
            caption="Wariancja to średnia arytmetyczna kwadratów odchyleń od średniej. Odchylenie standardowe ma to samo miano co badana cecha.",
            bars=[
                {'x': 120, 'y': 195, 'width': 45, 'height': 30, 'color': C_SKY, 'label': 'x₁=2'},
                {'x': 180, 'y': 165, 'width': 45, 'height': 60, 'color': C_SKY, 'label': 'x₂=4'},
                {'x': 240, 'y': 105, 'width': 45, 'height': 120, 'color': C_SKY, 'label': 'x₃=6'},
                {'x': 300, 'y': 75, 'width': 45, 'height': 150, 'color': C_SKY, 'label': 'x₄=8'}
            ],
            segments=[
                {'from': [80, 225], 'to': [440, 225], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [80, 135], 'to': [440, 135], 'color': C_PRIMARY, 'strokeWidth': 1.8, 'dashed': True}
            ],
            labels=[
                {'x': 440, 'y': 35, 'text': 'średnia arytmetyczna = 5', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'end', 'badge': True}
            ],
            metrics=[
                {'label': 'Wariancja (CKE)', 'value': r'$\sigma^2 = \frac{(a_1 - \bar{a})^2 + \dots + (a_n - \bar{a})^2}{n}$', 'color': C_SKY},
                {'label': 'Odchylenie standardowe', 'value': r'$\sigma = \sqrt{\sigma^2}$', 'color': C_PRIMARY},
                {'label': 'Interpretacja', 'value': r'Mniejsza $\sigma \longrightarrow$ wyniki bardziej skupione wokół średniej', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Obliczanie odchylenia standardowego krok po kroku",
            badge=r"(2, 4, 6, 8) \longrightarrow \bar{x} = 5 \longrightarrow \sigma^2 = \frac{(-3)^2 + (-1)^2 + 1^2 + 3^2}{4} = \frac{20}{4} = 5 \longrightarrow \sigma = \sqrt{5}",
            caption="Wyznaczamy średnią, różnice od średniej, podnosimy je do kwadratu i uśredniamy.",
            steps=[
                {'num': 1, 'title': 'Oblicz średnią arytmetyczną', 'desc': r'$\bar{x} = \frac{2 + 4 + 6 + 8}{4} = \frac{20}{4} = 5$.', 'color': C_SKY},
                {'num': 2, 'title': 'Oblicz wariancję (kwadraty odchyleń)', 'desc': r'$\sigma^2 = \frac{(2-5)^2 + (4-5)^2 + (6-5)^2 + (8-5)^2}{4} = \frac{9 + 1 + 1 + 9}{4} = \frac{20}{4} = 5$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wyciągnij pierwiastek kwadratowy', 'desc': r'$\sigma = \sqrt{\sigma^2} = \sqrt{5} \approx 2{,}24$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Średnia', 'value': '$5$', 'color': C_SKY},
                {'label': 'Wariancja', 'value': '$5$', 'color': C_PRIMARY},
                {'label': 'Odchylenie standardowe', 'value': r'$\sqrt{5}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie wariancji z odchyleniem standardowym",
            badge=r"\sigma = \sqrt{\sigma^2} \neq \sigma^2 \quad (\sigma^2 \text{ to wariancja, } \sigma \text{ to odchylenie})",
            caption="Wariancja to wartość w kwadratach jednostek (np. cm²). Odchylenie standardowe to pierwiastek z wariancji (np. cm). CKE często pyta o odchylenie, a uczniowie zatrzymują się na wariancji.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Podanie wariancji $\sigma^2$ jako odpowiedzi na pytanie o odchylenie standardowe', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Jeśli obliczyłeś $\sigma^2 = 5$, to odchylenie wynosi $\sigma = \sqrt{5}$', 'color': C_SUCCESS},
                {'label': 'Interpretacja', 'value': r'Odchylenie standardowe $\ge 0$ (zawsze nieujemne)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
