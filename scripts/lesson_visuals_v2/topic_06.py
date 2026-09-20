"""
topic_06.py - Dział 1.6: Równania w postaci iloczynowej (3 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT
)

def get_topic_06_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.6.1: Zasada zerowania iloczynu A · B = 0
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Zasada zerowania iloczynu: "Z polskiego na nasze"',
            'formulaBadge': 'A \\cdot B = 0 \\iff A = 0 \\quad \\lor \\quad B = 0',
            'caption': 'Kiedy iloczyn liczb daje zero? Tylko wtedy, gdy CO NAJMNIEJ JEDNA z mnożonych liczb jest równa zero! Nie wymnażaj nawiasów.',
            'cards': [
                {
                    'badge': 'Nawias 1 = 0',
                    'title': 'Pierwszy pierwiastek',
                    'formula': 'x - 3 = 0 \\implies x = 3',
                    'desc': 'Przyrównujesz pierwszy czynnik do zera i wyznaczasz $x$.',
                    'color': C_SKY
                },
                {
                    'badge': 'Nawias 2 = 0',
                    'title': 'Drugi pierwiastek',
                    'formula': '2x + 1 = 0 \\implies x = -\\frac{1}{2}',
                    'desc': 'Przyrównujesz drugi czynnik do zera. Rozwiązania to $x \\in \\left\\{-\\frac{1}{2}, 3\\right\\}$.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Prawa strona', 'value': 'Musi być równa $0$!', 'color': C_PRIMARY},
                {'label': 'Złota reguła CKE', 'value': 'Nie wymnażaj nawiasów ani nie licz delty', 'color': C_SUCCESS},
                {'label': 'Czas rozwiązania', 'value': 'Poniżej 30 sekund za 1 punkt', 'color': C_SKY}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.6.2: Równania iloczynowe wielomianowe
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Równania wielomianowe: Rozbijanie na nawiasy liniowe',
            'formulaBadge': '(x - 3)(2x + 1)(x^2 - 9) = 0',
            'caption': 'Rozkładamy nawiasy wyższego stopnia za pomocą różnicy kwadratów $x^2 - 9 = (x - 3)(x + 3)$ i zliczamy unikalne pierwiastki.',
            'cards': [
                {
                    'badge': 'Różnica kwadratów',
                    'title': 'Rozbicie nawiasu kwadratowego',
                    'formula': 'x^2 - 9 = 0 \\implies x = 3 \\quad \\lor \\quad x = -3',
                    'desc': 'Pamiętaj o dwóch znakach: $x = \\pm 3$.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'Zliczanie rozwiązań CKE',
                    'title': 'Uwaga na pierwiastki wielokrotne!',
                    'formula': 'x \\in \\left\\{-3, -\\frac{1}{2}, 3\\right\\}',
                    'desc': 'Liczba $3$ pojawia się dwukrotnie, ale w pytaniu o liczbę różnych rozwiązań liczymy ją tylko raz (3 różne pierwiastki).',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Unikalne pierwiastki', 'value': 'Trzy liczby: $-3, -\\frac{1}{2}, 3$', 'color': C_PRIMARY},
                {'label': 'Typowe pytanie CKE', 'value': '"Ile różnych rozwiązań ma równanie?"', 'color': C_SKY},
                {'label': 'Częsty błąd', 'value': 'Zgubienie ujemnego pierwiastka z $x^2 = a$', 'color': C_DANGER}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.6.3: Wyłączanie wspólnego czynnika przed nawias
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Wyłączanie wspólnego czynnika: Odzyskiwanie postaci iloczynowej',
            'formulaBadge': 'ax^2 + bx = x(ax + b) = 0',
            'caption': 'Gdy równanie wielomianowe nie ma wyrazu wolnego, natychmiast wyciągamy $x$ (lub $ax$) przed nawias! NIGDY nie dziel przez $x$.',
            'cards': [
                {
                    'badge': 'Wyciągnięcie przed nawias',
                    'title': 'Rozbicie na iloczyn',
                    'formula': '3x^3 - 12x = 3x(x^2 - 4) = 0',
                    'desc': 'Wyciągasz wspólny czynnik $3x$. W nawiasie powstaje różnica kwadratów.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'Kardynalny zakaz',
                    'title': 'Nigdy nie dziel przez x!',
                    'formula': 'x^2 = 5x \\implies x(x - 5) = 0 \\implies x = 0 \\;\\lor\\; x = 5',
                    'desc': 'Dzieląc obie strony przez $x$, bezpowrotnie tracisz kluczowe rozwiązanie $x = 0$!',
                    'color': C_DANGER
                }
            ],
            'metrics': [
                {'label': 'Wspólny czynnik', 'value': 'Wyciągaj NWD i najniższą potęgę $x$', 'color': C_SKY},
                {'label': 'Rozwiązanie $x=0$', 'value': 'Gdy wyciągasz $x$, $x=0$ jest zawsze pierwiastkiem', 'color': C_SUCCESS},
                {'label': 'Waga w CKE', 'value': 'Zadanie otwarte za 2 pkt', 'color': C_PRIMARY}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
