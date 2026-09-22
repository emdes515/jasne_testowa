"""
topic_04.py - Dział 1.4: Wzory skróconego mnożenia i algebra (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT
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
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

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
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

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
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
