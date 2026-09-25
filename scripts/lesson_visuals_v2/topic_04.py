"""
topic_04.py - Dział 1.4: Wzory skróconego mnożenia i algebra (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_04_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.4.1: Kwadrat sumy i kwadrat różnicy (mechanika z 2ab)
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Wzory skróconego mnożenia: Kwadrat sumy i różnicy',
            'formulaBadge': r'(a \pm b)^2 = a^2 \pm 2ab + b^2',
            'caption': 'Kwadrat dwumianu ZAWSZE daje trójmian z trzema składnikami. Wyraz środkowy to podwojony iloczyn 2ab, a ostatni wyraz +b^2 jest zawsze dodatni!',
            'cards': [
                {
                    'badge': 'Formuła 1: Kwadrat sumy',
                    'title': 'Dwa plusy w trójmianie',
                    'formula': r'(a + b)^2 = a^2 + 2ab + b^2',
                    'desc': 'Przykład CKE: $(2x + 3)^2 = 4x^2 + 12x + 9$. Wyraz środkowy to $2 \\cdot 2x \\cdot 3 = 12x$.',
                    'color': C_SKY
                },
                {
                    'badge': 'Formuła 2: Kwadrat różnicy',
                    'title': 'Minus tylko przy 2ab, koniec zawsze dodatni',
                    'formula': r'(a - b)^2 = a^2 - 2ab + b^2',
                    'desc': 'Przykład CKE: $(3x - 1)^2 = 9x^2 - 6x + 1$. Ostatni składnik to $(-1)^2 = +1$.',
                    'color': C_PRIMARY
                }
            ],
            'metrics': [
                {'label': 'Środkowy wyraz', 'value': 'Podwojony iloczyn $\\pm 2ab$', 'color': C_PRIMARY},
                {'label': 'Ostatni wyraz', 'value': 'Zawsze $+b^2$ (kwadrat jest $\\ge 0$)', 'color': C_SUCCESS},
                {'label': 'Najczęstszy błąd', 'value': '$(a+b)^2 \\neq a^2 + b^2$', 'color': C_DANGER}
            ]
        }
        # Geometryczny dowód kwadratu sumy
        tab2 = make_geometry_diagram(
            title="Geometryczny dowód kwadratu sumy: (a + b)²",
            badge=r"(a + b)^2 = a^2 + 2ab + b^2",
            caption="Kwadrat o boku a+b dzieli się na 4 pola: żółte a², dwa błękitne prostokąty ab (+2ab!) oraz mały zielony kwadrat b².",
            width=500,
            height=260,
            polygons=[
                {'points': [[35, 35], [175, 35], [175, 175], [35, 175]], 'fill': 'rgba(255, 184, 0, 0.22)', 'stroke': C_PRIMARY, 'strokeWidth': 2},
                {'points': [[175, 35], [245, 35], [245, 175], [175, 175]], 'fill': 'rgba(56, 189, 248, 0.20)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[35, 175], [175, 175], [175, 245], [35, 245]], 'fill': 'rgba(56, 189, 248, 0.20)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[175, 175], [245, 175], [245, 245], [175, 245]], 'fill': 'rgba(16, 185, 129, 0.25)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 105, 'y': 105, 'text': 'a²', 'color': C_PRIMARY, 'fontSize': 24, 'fontWeight': 'bold'},
                {'x': 210, 'y': 105, 'text': 'ab', 'color': C_SKY, 'fontSize': 18, 'fontWeight': 'bold'},
                {'x': 105, 'y': 210, 'text': 'ab', 'color': C_SKY, 'fontSize': 18, 'fontWeight': 'bold'},
                {'x': 210, 'y': 210, 'text': 'b²', 'color': C_SUCCESS, 'fontSize': 18, 'fontWeight': 'bold'},
                {'x': 105, 'y': 20, 'text': 'a', 'color': C_TEXT, 'fontSize': 14, 'fontWeight': 'bold'},
                {'x': 210, 'y': 20, 'text': 'b', 'color': C_TEXT, 'fontSize': 14, 'fontWeight': 'bold'},
                {'x': 20, 'y': 105, 'text': 'a', 'color': C_TEXT, 'fontSize': 14, 'fontWeight': 'bold'},
                {'x': 20, 'y': 210, 'text': 'b', 'color': C_TEXT, 'fontSize': 14, 'fontWeight': 'bold'},
                {'x': 375, 'y': 70, 'text': 'Pole całego kwadratu:', 'color': C_MUTED, 'fontSize': 12},
                {'x': 375, 'y': 105, 'text': '(a + b)²', 'color': C_PRIMARY, 'fontSize': 26, 'fontWeight': 'bold'},
                {'x': 375, 'y': 145, 'text': '= a² + 2ab + b²', 'color': C_SUCCESS, 'fontSize': 20, 'fontWeight': 'bold'},
                {'x': 375, 'y': 185, 'text': 'Widzisz dwa pola ab?', 'color': C_SKY, 'fontSize': 12, 'fontWeight': 'bold'},
                {'x': 375, 'y': 205, 'text': 'Dlatego nigdy nie gub 2ab!', 'color': C_DANGER, 'fontSize': 11}
            ],
            metrics=[
                {'label': 'Kwadrat $a^2$', 'value': 'Żółte pole', 'color': C_PRIMARY},
                {'label': 'Dwa prostokąty $2ab$', 'value': 'Dwa błękitne pola', 'color': C_SKY},
                {'label': 'Kwadrat $b^2$', 'value': 'Zielone pole', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zgubiony podwójny iloczyn (2ab)",
            badge=r"(a + b)^2 \neq a^2 + b^2 \quad \text{oraz} \quad (a - b)^2 \neq a^2 - b^2",
            caption="Kwadrat sumy to NIE jest suma kwadratów! Zawsze powstają 3 składniki trójmianu z podwójnym iloczynem 2ab.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': '$(x + 3)^2 \\neq x^2 + 9$ (brak $6x$ to 0 pkt!)', 'color': C_DANGER},
                {'label': 'POPRAWNY TRÓJMIAN', 'value': '$(x + 3)^2 = x^2 + 6x + 9$', 'color': C_SUCCESS},
                {'label': 'Kwadrat różnicy', 'value': '$(x - 4)^2 = x^2 - 8x + 16$ (ostatni to $+16$!)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L1.4.2: Różnica kwadratów a^2 - b^2 = (a - b)(a + b)
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Różnica kwadratów: Błyskawiczny rozkład i sprzężenie',
            'formulaBadge': r'a^2 - b^2 = (a - b)(a + b)',
            'caption': 'Odejmowanie kwadratów zamieniaj na iloczyn różnicy i sumy. Likwiduje pierwiastki w mianowniku i błyskawicznie faktoryzuje wielomiany.',
            'cards': [
                {
                    'badge': 'Sprzężenie mianownika',
                    'title': 'Likwidacja pierwiastków',
                    'formula': r'(\sqrt{7} - 2)(\sqrt{7} + 2) = 7 - 4 = 3',
                    'desc': 'Ze wzoru $(a-b)(a+b) = a^2 - b^2$: $(\\sqrt{7})^2 - 2^2 = 7 - 4 = 3$. Mianownik staje się liczbą całkowitą.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'Rozkład wielomianu',
                    'title': 'Szukanie pierwiastków równania',
                    'formula': r'4x^2 - 25 = (2x - 5)(2x + 5)',
                    'desc': 'Zauważ, że $4x^2 = (2x)^2$ oraz $25 = 5^2$. Pierwiastki to $x = \\frac{5}{2}$ oraz $x = -\\frac{5}{2}$.',
                    'color': C_PRIMARY
                }
            ],
            'metrics': [
                {'label': 'Szybkie kwadraty', 'value': '$9 = 3^2, \\; 16 = 4^2, \\; 25 = 5^2$', 'color': C_SKY},
                {'label': 'Uwaga na sumę', 'value': '$a^2 + b^2$ NIE rozkłada się w $\\mathbb{R}$!', 'color': C_DANGER},
                {'label': 'Pewniak CKE', 'value': 'Występuje w zadaniu 1, 2 lub 3 arkusza', 'color': C_SUCCESS}
            ]
        }
        tab2 = make_geometry_diagram(
            title="Geometryczny dowód różnicy kwadratów: a² - b²",
            badge=r"a^2 - b^2 = (a - b)(a + b)",
            caption="Z kwadratu a² wycinamy mały kwadrat b². Pozostały obszar w kształcie litery L tniemy i rozprostowujemy w jeden prostokąt o bokach (a - b) oraz (a + b).",
            width=500,
            height=260,
            polygons=[
                {'points': [[35, 35], [175, 35], [175, 175], [35, 175]], 'fill': 'rgba(255, 184, 0, 0.22)', 'stroke': C_PRIMARY, 'strokeWidth': 2},
                {'points': [[175, 105], [245, 105], [245, 175], [175, 175]], 'fill': 'rgba(56, 189, 248, 0.20)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[175, 35], [245, 35], [245, 105], [175, 105]], 'fill': 'rgba(244, 63, 94, 0.12)', 'stroke': C_DANGER, 'strokeWidth': 1.5, 'dashed': True}
            ],
            labels=[
                {'x': 105, 'y': 105, 'text': '(a - b) · a', 'color': C_PRIMARY, 'fontSize': 16, 'fontWeight': 'bold'},
                {'x': 210, 'y': 140, 'text': '(a - b) · b', 'color': C_SKY, 'fontSize': 14, 'fontWeight': 'bold'},
                {'x': 210, 'y': 70, 'text': 'wycięte b²', 'color': C_DANGER, 'fontSize': 12, 'fontWeight': 'bold'},
                {'x': 105, 'y': 20, 'text': 'a', 'color': C_TEXT, 'fontSize': 14, 'fontWeight': 'bold'},
                {'x': 20, 'y': 105, 'text': 'a', 'color': C_TEXT, 'fontSize': 14, 'fontWeight': 'bold'},
                {'x': 375, 'y': 70, 'text': 'Rozcięcie i złączenie w prostokąt:', 'color': C_MUTED, 'fontSize': 12},
                {'x': 375, 'y': 105, 'text': 'Pole = a² - b²', 'color': C_PRIMARY, 'fontSize': 24, 'fontWeight': 'bold'},
                {'x': 375, 'y': 145, 'text': '= (a - b)(a + b)', 'color': C_SUCCESS, 'fontSize': 20, 'fontWeight': 'bold'},
                {'x': 375, 'y': 185, 'text': 'Długość: a + b', 'color': C_SKY, 'fontSize': 13, 'fontWeight': 'bold'},
                {'x': 375, 'y': 205, 'text': 'Szerokość: a - b', 'color': C_SUCCESS, 'fontSize': 13, 'fontWeight': 'bold'}
            ],
            metrics=[
                {'label': 'Wyjściowe pole', 'value': 'Kwadrat $a^2$ minus róg $b^2$', 'color': C_PRIMARY},
                {'label': 'Złożony prostokąt', 'value': 'Wymiary $(a+b) \\times (a-b)$', 'color': C_SUCCESS},
                {'label': 'Praktyka CKE', 'value': 'Błyskawiczne usuwanie pierwiastków', 'color': C_SKY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Kwadrat współczynnika przy x",
            badge=r"(2x)^2 = 4x^2 \quad \neq 2x^2",
            caption="Podnosząc do kwadratu jednomian (2x), podnosisz ZARÓWNO liczbę 2, jak i zmienną x! Brak kwadratu liczby to częsty błąd.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': '$(3x - 1)(3x + 1) \\neq 3x^2 - 1$ (0 pkt)', 'color': C_DANGER},
                {'label': 'POPRAWNY WYNIK CKE', 'value': '$(3x)^2 - 1^2 = 9x^2 - 1$', 'color': C_SUCCESS},
                {'label': 'Suma kwadratów', 'value': '$x^2 + 16$ NIE rozkłada się w $\\mathbb{R}$!', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L1.4.3: Wyłączanie wspólnego czynnika przed nawias i grupowanie wyrazów
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Rozkład wielomianów: Wyłączanie czynnika i grupowanie w pary',
            'formulaBadge': r'\begin{aligned} ax + ay &= a(x + y) \\ x^2(x - a) - b(x - a) &= (x - a)(x^2 - b) \end{aligned}',
            'caption': 'Grupowanie wyrazów polega na podziale na dwie drużyny, wyciągnięciu wspólnego czynnika i wyciągnięciu identycznego nawiasu przed całość.',
            'cards': [
                {
                    'badge': 'Krok 1: Wyłączanie czynnika',
                    'title': 'Wspólny jednomian przed nawias',
                    'formula': r'6x^3 - 9x^2 = 3x^2(2x - 3)',
                    'desc': 'Dla liczb 6 i 9 NWD to 3, a dla $x^3$ i $x^2$ wyłączamy najwyższą możliwą potęgę $x^2$.',
                    'color': C_SKY
                },
                {
                    'badge': 'Krok 2: Grupowanie w pary',
                    'title': 'Wspólny nawias w obu parach',
                    'formula': r'x^3 - 2x^2 - 9x + 18 = (x - 2)(x^2 - 9)',
                    'desc': 'Grupujesz: $x^2(x - 2) - 9(x - 2)$. Wyciągasz wspólny nawias $(x - 2)$ przed nawias z resztą $(x^2 - 9)$.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'Krok 3: Różnica kwadratów',
                    'title': 'Pełny rozkład na czynniki liniowe',
                    'formula': r'(x - 2)(x^2 - 9) = (x - 2)(x - 3)(x + 3)',
                    'desc': 'Nawias kwadratowy $(x^2 - 9)$ rozbijasz ze wzoru $a^2 - b^2$ na dwa nawiasy. Pierwiastki to $x \\in \\{-3, 2, 3\\}$.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Podział na drużyny', 'value': 'Dwie pary po dwa wyrazy', 'color': C_SKY},
                {'label': 'PUŁAPKA CKE', 'value': 'Minus z drugiej pary: $-9(x - 2)$!', 'color': C_DANGER},
                {'label': 'Zadanie za 2 pkt', 'value': 'Żelazny pewniak w części otwartej', 'color': C_SUCCESS}
            ]
        }
        tab2 = make_step_flow_diagram(
            title="Grupowanie wyrazów w pary: Schemat 3 kroków CKE",
            badge=r"x^3 - 2x^2 - 9x + 18 = x^2(x - 2) - 9(x - 2) = (x - 2)(x^2 - 9) = (x - 2)(x - 3)(x + 3)",
            caption="Wyprowadzasz wspólny czynnik z pierwszej pary i z drugiej (zwróć uwagę na znak minus!), a potem wyjmujesz nawias (x-2) przed całość.",
            steps=[
                {'num': 1, 'title': 'Pierwsza para (x³ - 2x²)', 'desc': 'Wyciągasz $x^2$: $x^2(x - 2)$.', 'color': C_SKY},
                {'num': 2, 'title': 'Druga para (-9x + 18)', 'desc': 'Wyciągasz $-9$: $-9(x - 2)$. Nawiasy są identyczne!', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wspólny nawias i rozkład', 'desc': '$(x - 2)(x^2 - 9) = (x - 2)(x - 3)(x + 3)$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wspólny nawias', 'value': '$(x - 2)$', 'color': C_SKY},
                {'label': 'Nawias z resztą', 'value': '$(x^2 - 9)$', 'color': C_PRIMARY},
                {'label': 'Pierwiastki wielomianu', 'value': '$x \\in \\{-3, 2, 3\\}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zmiana znaku przy wyłączaniu minusa",
            badge=r"-9x + 18 = -9(x - 2) \quad \neq -9(x + 2)",
            caption="Wyciągając liczbę ujemną przed nawias, musisz zmienić znaki OBU wyrazów! Bez tego nawiasy nie będą identyczne.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': '$-9x + 18 \\neq -9(x + 2)$ (brak wspólnego nawiasu)', 'color': C_DANGER},
                {'label': 'POPRAWNA REDUKCJA', 'value': '$-9x + 18 = -9(x - 2)$', 'color': C_SUCCESS},
                {'label': 'Dokończenie rozkładu', 'value': 'Zawsze rozłóż $x^2 - 9$ na $(x-3)(x+3)$!', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
