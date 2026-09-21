"""
topic_05.py - Dział 1.5: Nierówności liniowe (3 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_inequality_explainer_diagram
)

def get_topic_05_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.5.1: Rozwiązywanie nierówności liniowych z jedną niewiadomą
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Rozwiązywanie nierówności liniowych: Podział ról',
            'formulaBadge': 'ax + b < c \\implies ax < c - b',
            'caption': 'Zasada jak w równaniach: wyrażenia z x przenosimy na lewą stronę, liczby na prawą stronę, ZMIENIAJĄC ZNAK przy przenoszeniu.',
            'cards': [
                {
                    'badge': 'Krok 1: Lewa strona',
                    'title': 'Niewiadome z x',
                    'formula': '3x - 5x \\le 4 + 6',
                    'desc': 'Wyrażenia z $x$ wędrują na lewo. Przeniesione $5x$ zmienia znak na $-5x$.',
                    'color': C_SKY
                },
                {
                    'badge': 'Krok 2: Prawa strona',
                    'title': 'Wyrazy wolne (same liczby)',
                    'formula': '-2x \\le 10',
                    'desc': 'Liczba $-6$ po przejściu na prawą stronę staje się $+6$, dając sumę $10$.',
                    'color': C_PRIMARY
                }
            ],
            'metrics': [
                {'label': 'Przenoszenie', 'value': 'Zmienia znak wyrazu na przeciwny', 'color': C_PRIMARY},
                {'label': 'Redukcja wyrazów', 'value': 'Sumujesz $x$-y i liczby oddzielnie', 'color': C_SUCCESS},
                {'label': 'Złota zasada', 'value': 'Przechodzisz przez znak = zmieniasz znak', 'color': C_SKY}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.5.2: Zmiana zwrotu nierówności przy dzieleniu/mnożeniu przez liczbę ujemną
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Złota reguła nierówności CKE: Odwracanie zwrotu znaku',
            'formulaBadge': '-2x < 6 \\quad \\xrightarrow{:\\; (-2)} \\quad x > -3',
            'caption': 'Dzielenie lub mnożenie nierówności przez liczbę ujemną ZAWSZE ODWRACA ZWROT ZNAKU NIERÓWNOŚCI NA PRZECIWNY (< na >, \\le na \\ge)!',
            'cards': [
                {
                    'badge': 'Przed dzieleniem',
                    'title': 'Współczynnik przy x jest ujemny',
                    'formula': '-3x \\le 12',
                    'desc': 'Przeszkadza nam liczba $-3$ stojąca przy $x$. Dzielimy obie strony przez $-3$.',
                    'color': C_DANGER
                },
                {
                    'badge': 'Po dzieleniu (ALARM CKE)',
                    'title': 'Znak natychmiast obraca zwrot!',
                    'formula': 'x \\ge -4',
                    'desc': 'Znak $\\le$ zmienił się na $\\ge$, a $12 : (-3) = -4$. Zbiór rozwiązań to $\\langle -4, +\\infty)$.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Dzielenie przez minus', 'value': 'Znak $<$ staje się $>$, znak $\\le$ staje się $\\ge$', 'color': C_PRIMARY},
                {'label': 'Dzielenie przez plus', 'value': 'Zwrot znaku BEZ ZMIAN', 'color': C_SKY},
                {'label': 'Haczyk CKE', 'value': 'Pojawia się w 100% arkuszy maturalnych', 'color': C_DANGER}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.5.3: Ilustracja zbioru rozwiązań na osi liczbowej i zapis w postaci przedziału
        tab0 = make_inequality_explainer_diagram(
            title='Symbole nierówności, kółka i nawiasy: "Z polskiego na nasze"',
            badge='>,\\; <,\\; \\ge,\\; \\le',
            caption='Kreska pod znakiem nierówności (\\ge, \\le) oznacza, że punkt brzegowy NALEŻY do zbioru (kółko zamalowane, nawias ostry \\langle \\rangle).'
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
