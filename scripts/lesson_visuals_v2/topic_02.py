"""
topic_02.py - Dział 1.2: Logarytmy (3 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_logarithm_loop_diagram
)

def get_topic_02_visuals(l_idx):
    # l_idx: 0..2 (Lekcje 1..3)
    l_num = l_idx + 1

    if l_num == 1:
        # L1.2.1: Definicja logarytmu i warunki istnienia
        tab0 = make_logarithm_loop_diagram()
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.2.2: Wzory na sumę i różnicę logarytmów o tej samej podstawie
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Suma i różnica logarytmów: Fuzja w jeden logarytm',
            'formulaBadge': r'\begin{aligned}\log_a x + \log_a y &= \log_a(x \cdot y) \\ \log_a x - \log_a y &= \log_a\left(\frac{x}{y}\right)\end{aligned}',
            'caption': 'Gdy podstawy są identyczne, dodawanie logarytmów zamienia się w logarytm iloczynu, a odejmowanie w logarytm ilorazu.',
            'cards': [
                {
                    'badge': 'Zasada 1: Suma',
                    'title': 'Dodawanie zamienia się w iloczyn',
                    'formula': r'\log_6 4 + \log_6 9 = \log_6 36 = 2',
                    'desc': r'Łączysz w iloczyn: $4 \cdot 9 = 36$, skąd $\log_6 36 = 2$.',
                    'color': C_SKY
                },
                {
                    'badge': 'Zasada 2: Różnica',
                    'title': 'Odejmowanie zamienia się w iloraz',
                    'formula': r'\log_2 40 - \log_2 5 = \log_2 8 = 3',
                    'desc': r'Łączysz w iloraz: $40 : 5 = 8$, skąd $\log_2 8 = 3$.',
                    'color': C_PURPLE
                }
            ],
            'metrics': [
                {'label': 'Suma logarytmów', 'value': r'$\log_a(x \cdot y)$', 'color': C_SKY},
                {'label': 'Różnica logarytmów', 'value': r'$\log_a\left(\frac{x}{y}\right)$', 'color': C_PURPLE},
                {'label': 'Warunek bezwzględny', 'value': r'Identyczna podstawa $a > 0, a \neq 1$', 'color': C_PRIMARY}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.2.3: Mnożenie logarytmu przez liczbę i zmiana podstawy
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Wciąganie liczby do wykładnika i zmiana podstawy',
            'formulaBadge': r'\begin{aligned}k \cdot \log_a x &= \log_a\left(x^k\right) \\ \log_a b &= \frac{\log_c b}{\log_c a}\end{aligned}',
            'caption': 'Liczba stojąca PRZED logarytmem wędruje na piętro jako WYKŁADNIK potęgi liczby logarytmowanej.',
            'cards': [
                {
                    'badge': 'Najważniejszy manewr CKE',
                    'title': 'Wciągnięcie współczynnika',
                    'formula': r'2\log_5 10 - \log_5 4 = \log_5 25 = 2',
                    'desc': r'Wciągasz 2 ($10^2 = 100$), a potem dzielisz: $100 : 4 = 25$, więc $\log_5 25 = 2$.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'Wzór ratunkowy',
                    'title': 'Zamiana podstawy logarytmu',
                    'formula': r'\log_4 8 = \frac{\log_2 8}{\log_2 4} = \frac{3}{2} = 1{,}5',
                    'desc': 'Gdy podstawy są różne, sprowadzasz oba wyrazy do wspólnej bazy (np. 2).',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Zasada pierwszeństwa', 'value': r'Najpierw wciągnij $k$ do potęgi $x^k$', 'color': C_PRIMARY},
                {'label': 'Częsty współczynnik', 'value': r'$\frac{1}{2}\log_a x = \log_a \sqrt{x}$', 'color': C_SKY},
                {'label': 'Pewniak CKE', 'value': 'Zadanie 2 lub 3 w arkuszu (1 pkt)', 'color': C_SUCCESS}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
