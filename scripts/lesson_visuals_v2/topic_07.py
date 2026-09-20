"""
topic_07.py - Dział 1.7: Równania i wyrażenia wymierne (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT
)

def get_topic_07_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.7.1: Dziedzina wyrażenia wymiernego – BEZWZGLĘDNY warunek mianownik ≠ 0
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Dziedzina wyrażenia wymiernego: Żelazna zasada CKE',
            'formulaBadge': '\\frac{P(x)}{Q(x)} \\implies D: Q(x) \\neq 0',
            'caption': 'Pamiętaj: NIE WOLNO DZIELIĆ PRZEZ ZERO! W każdym ułamku algebraicznym mianownik musi być różny od zera.',
            'cards': [
                {
                    'badge': 'Krok 0: Warunek mianownika',
                    'title': 'Wykluczanie punktów zerowych',
                    'formula': 'x^2 - 16 \\neq 0 \\implies (x - 4)(x + 4) \\neq 0',
                    'desc': 'Mianownik zeruje się dla $x = 4$ oraz $x = -4$. Te liczby są bezwzględnie zakazane.',
                    'color': C_DANGER
                },
                {
                    'badge': 'Zapis dziedziny CKE',
                    'title': 'Zbiór liczb dopuszczalnych',
                    'formula': 'D = \\mathbb{R} \\setminus \\{-4, 4\\}',
                    'desc': 'Dziedziną są wszystkie liczby rzeczywiste z wyjątkiem miejsc zerowych mianownika.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Krok zerowy', 'value': 'Zawsze zaczynaj od wypisania dziedziny $D$!', 'color': C_PRIMARY},
                {'label': 'Licznik', 'value': 'Licznik MOŻE być zerem, mianownik NIGDY', 'color': C_SKY},
                {'label': 'Pewniak CKE', 'value': 'Zadanie za 1 pkt w każdym arkuszu', 'color': C_SUCCESS}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.7.2: Równania wymierne rozwiązywane metodą mnożenia "na krzyż"
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Mnożenie "na krzyż": Rozwiązywanie proporcji',
            'formulaBadge': '\\frac{A}{B} = \\frac{C}{D} \\iff A \\cdot D = B \\cdot C \\quad (B, D \\neq 0)',
            'caption': 'Mnożymy wyrażenia po przekątnych. Pamiętaj o BEZWZGLĘDNYM stawianiu nawiasów przy wielomianach!',
            'cards': [
                {
                    'badge': 'Metoda proporcji',
                    'title': 'Wymnożenie po przekątnych',
                    'formula': '\\frac{x + 1}{x - 2} = \\frac{3}{1} \\implies 1 \\cdot (x + 1) = 3 \\cdot (x - 2)',
                    'desc': 'Liczbę $3$ zapisujesz jako $\\frac{3}{1}$ i mnożysz po przekątnej.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'Równanie liniowe',
                    'title': 'Rozwiązanie i sprawdzenie dziedziny',
                    'formula': 'x + 1 = 3x - 6 \\implies -2x = -7 \\implies x = 3{,}5',
                    'desc': 'Sprawdzasz dziedzinę: $x - 2 \\neq 0 \\implies x \\neq 2$. Ponieważ $3{,}5 \\in D$, jest to poprawne rozwiązanie.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Nawiasy', 'value': 'Zawsze zapisuj $3 \\cdot (x - 2) = 3x - 6$', 'color': C_PRIMARY},
                {'label': 'Dziedzina', 'value': 'Sprawdź czy wynik nie zeruje mianownika', 'color': C_DANGER},
                {'label': 'Czas rozwiązania', 'value': 'Ok. 1 minuty za 1 punkt', 'color': C_SUCCESS}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.7.3: Pułapka CKE: Odrzucanie pozornych rozwiązań nienależących do dziedziny
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Sitko dziedziny: Odrzucanie pozornych pierwiastków',
            'formulaBadge': '\\frac{x^2 - 4}{x - 2} = 0 \\implies x = -2 \\quad (x = 2 \\notin D)',
            'caption': 'Równanie wymierne ma postać ułamka = 0. Licznik musi być zerem, ale rozwiązanie NIE MOŻE zerować mianownika!',
            'cards': [
                {
                    'badge': 'Kandydaci z licznika',
                    'title': 'Zerowanie góry ułamka',
                    'formula': 'x^2 - 4 = 0 \\implies x = 2 \\quad \\lor \\quad x = -2',
                    'desc': 'Licznik wskazuje dwóch potencjalnych kandydatów na rozwiązanie.',
                    'color': C_SKY
                },
                {
                    'badge': 'Sitko dziedziny (ALARM CKE)',
                    'title': 'Odrzucenie pozornego pierwiastka',
                    'formula': 'x - 2 \\neq 0 \\implies D = \\mathbb{R} \\setminus \\{2\\} \\implies x = -2',
                    'desc': 'Liczba $x = 2$ zeruje mianownik, więc natychmiast ją ODRZUCASZ! Jedyne rozwiązanie to $x = -2$.',
                    'color': C_DANGER
                }
            ],
            'metrics': [
                {'label': 'Pytanie CKE', 'value': '"Ile rozwiązań ma równanie?" Odpowiedź: 1', 'color': C_PRIMARY},
                {'label': 'Najczęstsza pomyłka', 'value': 'Zaznaczenie 2 rozwiązań (strata punktu)', 'color': C_DANGER},
                {'label': 'Złota zasada', 'value': 'Liczba poza dziedziną NIGDY nie jest rozwiązaniem', 'color': C_SUCCESS}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
