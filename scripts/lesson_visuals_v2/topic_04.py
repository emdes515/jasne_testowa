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
            'formulaBadge': '(a \\pm b)^2 = a^2 \\pm 2ab + b^2',
            'caption': 'Kwadrat dwumianu ZAWSZE daje trójmian z trzema wyrazami. Wyraz środkowy to podwojony iloczyn 2ab, a ostatni wyraz +b^2 jest zawsze dodatni!',
            'cards': [
                {
                    'badge': 'Formuła 1: Kwadrat sumy',
                    'title': 'Dwa plusy w trójmianie',
                    'formula': '(a + b)^2 = a^2 + 2ab + b^2',
                    'desc': 'Przykład CKE: $(2x + 3)^2 = (2x)^2 + 2 \\cdot 2x \\cdot 3 + 3^2 = 4x^2 + 12x + 9$.',
                    'color': C_SKY
                },
                {
                    'badge': 'Formuła 2: Kwadrat różnicy',
                    'title': 'Minus tylko przy 2ab, koniec zawsze dodatni',
                    'formula': '(a - b)^2 = a^2 - 2ab + b^2',
                    'desc': 'Przykład CKE: $(3x - 1)^2 = (3x)^2 - 2 \\cdot 3x \\cdot 1 + 1^2 = 9x^2 - 6x + 1$.',
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
            'title': 'Różnica kwadratów: Błyskawiczny rozkład na nawiasy',
            'formulaBadge': 'a^2 - b^2 = (a - b)(a + b)',
            'caption': 'Gdy widzisz odejmowanie dwóch kwadratów, natychmiast zamieniaj je na iloczyn różnicy i sumy tych liczb.',
            'cards': [
                {
                    'badge': 'Zwijanie w liczbę',
                    'title': 'Likwidacja pierwiastków',
                    'formula': '(\\sqrt{7} - 2)(\\sqrt{7} + 2) = (\\sqrt{7})^2 - 2^2 = 7 - 4 = 3',
                    'desc': 'Mnożenie sprzężeń daje liczbę całkowitą bez żadnych pierwiastków.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'Rozkładanie wielomianu',
                    'title': 'Szukanie pierwiastków równania',
                    'formula': '4x^2 - 25 = (2x - 5)(2x + 5)',
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
        # L1.4.3: Redukcja wyrazów podobnych i pułapka ze znakiem minus przed nawiasem
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Minus przed nawiasem: Strażnik znaków',
            'formulaBadge': '-(a - b) = -a + b, \\quad -(2x^2 - 3x + 1) = -2x^2 + 3x - 1',
            'caption': 'Znak minus stojący bezpośrednio przed nawiasem ZMIENIA ZNAK KAŻDEGO SKŁADNIKA wewnątrz nawiasu na przeciwny!',
            'cards': [
                {
                    'badge': 'Złota reguła CKE',
                    'title': 'Nawias pomocniczy po minusie',
                    'formula': 'A - B = A - [\\text{obliczona zawartość } B]',
                    'desc': 'Najpierw podnieś do kwadratu w bezpiecznym nawiasie kwadratowym, a w osobnym kroku zmień znaki.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'Przykład z arkusza',
                    'title': 'Redukcja krok po kroku',
                    'formula': '(x + 2)^2 - (x - 3)^2 = (x^2 + 4x + 4) - [x^2 - 6x + 9] = 10x - 5',
                    'desc': 'Minus przed drugim nawiasem zmienił $-6x$ na $+6x$ oraz $+9$ na $-9$.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Reguła znaków', 'value': '$-(-b) = +b$', 'color': C_PRIMARY},
                {'label': 'Częsty błąd', 'value': 'Zmiana znaku tylko pierwszego składnika', 'color': C_DANGER},
                {'label': 'Waga na maturze', 'value': 'Zadanie otwarte za 2 pkt lub zamknięte za 1 pkt', 'color': C_SUCCESS}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
