"""
topic_05.py - Dział 1.5: Nierówności liniowe (3 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT
)

def get_topic_05_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.5.1: Rozwiązywanie nierówności liniowych i reguła zmiany zwrotu
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Rozwiązywanie nierówności liniowych i złota reguła zwrotu',
            'formulaBadge': r'-2x < 6 \quad \xrightarrow{:\; (-2)} \quad x > -3',
            'caption': 'Gdy dzielisz lub mnożysz obie strony nierówności przez liczbę ujemną, ZAWSZE natychmiast odwracasz zwrot nierówności na przeciwny!',
            'cards': [
                {
                    'badge': 'Krok 1: Przenoszenie wyrazów',
                    'title': 'Niewiadome na lewo, liczby na prawo',
                    'formula': r'3x - 5x \le 4 + 6 \implies -2x \le 10',
                    'desc': 'Przechodząc przez znak nierówności, zmieniasz znak wyrazu na przeciwny. Zwrot nierówności pozostaje bez zmian.',
                    'color': C_SKY
                },
                {
                    'badge': 'Krok 2: ALARM CKE (Dzielenie przez minus)',
                    'title': 'Zwrot znaku natychmiast się obraca',
                    'formula': r'-2x \le 10 \quad \xrightarrow{:\; (-2)} \quad x \ge -5',
                    'desc': 'Dzielenie przez liczbę ujemną $-2$ odwróciło znak $\\le$ na $\\ge$. Wynikiem jest przedział $[-5, +\\infty)$.',
                    'color': C_DANGER
                },
                {
                    'badge': 'Dzielenie przez plus',
                    'title': 'Brak zmiany zwrotu',
                    'formula': r'4x < 12 \quad \xrightarrow{:\; 4} \quad x < 3',
                    'desc': 'Dzielenie przez liczbę dodatnią $+4$ NIE zmienia zwrotu znaku. Znak $<$ pozostaje znakiem $<$.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Dzielenie przez minus', 'value': 'Znak $<$ staje się $>$, a $\\le$ staje się $\\ge$', 'color': C_DANGER},
                {'label': 'Dzielenie przez plus', 'value': 'Zwrot znaku BEZ ZMIAN', 'color': C_SUCCESS},
                {'label': 'Waga na maturze', 'value': 'Zadanie 3 lub 4 arkusza za 1 pkt', 'color': C_PRIMARY}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.5.2: Zaznaczanie rozwiązań na osi liczbowej i zapis przedziałowy
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Ilustracja na osi liczbowej: Kółka, zwroty i nawiasy',
            'formulaBadge': r'x \in (-\infty,\; a) \quad \text{vs} \quad x \in [a,\; +\infty)',
            'caption': 'Kreska pod znakiem (\\le, \\ge) oznacza kółko zamalowane i nawias domknięty. Znak ostry (<, >) oznacza kółko otwarte i nawias okrągły.',
            'cards': [
                {
                    'badge': 'Ostre: < oraz >',
                    'title': 'Kółko otwarte ○, nawias okrągły ( )',
                    'formula': r'x > 3 \implies x \in (3,\; +\infty)',
                    'desc': 'Liczba $3$ NIE należy do zbioru rozwiązań. Na osi rysujemy niezamalowane kółko w punkcie $3$.',
                    'color': C_SKY
                },
                {
                    'badge': 'Słabe: ≤ oraz ≥',
                    'title': 'Kółko zamalowane ●, nawias domknięty [ ]',
                    'formula': r'x \le -2 \implies x \in (-\infty,\; -2]',
                    'desc': 'Liczba $-2$ NALEŻY do zbioru rozwiązań. Na osi stawiamy zamalowane kółko i domykamy nawias kwadratowy.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'Nieskończoność',
                    'title': 'Nawias przy ±∞ ZAWSZE okrągły',
                    'formula': r'(-\infty,\; b] \quad \text{oraz} \quad [a,\; +\infty)',
                    'desc': 'Nieskończoność nie jest liczbą, więc nigdy nie domykamy przy niej nawiasu kwadratowego!',
                    'color': C_PRIMARY
                }
            ],
            'metrics': [
                {'label': 'Kółko otwarte ○', 'value': 'Znak $<$ lub $>$, nawias $( )$', 'color': C_SKY},
                {'label': 'Kółko zamalowane ●', 'value': 'Znak $\\le$ lub $\\ge$, nawias $[ ]$', 'color': C_SUCCESS},
                {'label': 'Zwrot w prawo', 'value': 'Liczby większe: ku $+\\infty$', 'color': C_PRIMARY}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.5.3: Układy nierówności liniowych i wyznaczanie liczb całkowitych
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Układ nierówności liniowych: Część wspólna i liczby całkowite',
            'formulaBadge': r'\begin{cases} x \ge -1 \\ x < 4 \end{cases} \implies x \in [-1,\; 4)',
            'caption': 'Klamra układu oznacza część wspólną (przecięcie zbiorów). Szukamy liczb, które spełniają OBA warunki jednocześnie.',
            'cards': [
                {
                    'badge': 'Krok 1: Część wspólna',
                    'title': 'Obszar podwójnego kreskowania',
                    'formula': r'[-1, +\infty) \cap (-\infty, 4) = [-1,\; 4)',
                    'desc': 'Nakładasz oba przedziały na jedną oś liczbową. Zbiorem rozwiązań jest pasmo, na którym leżą oba kolory.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'Krok 2: Liczby całkowite',
                    'title': 'Wypisywanie liczb ze zbioru',
                    'formula': r'x \in \{-1,\; 0,\; 1,\; 2,\; 3\} \implies 5 \text{ liczb}',
                    'desc': 'Punkt $-1$ należy (zamknięty), a punkt $4$ NIE należy (otwarty). Łącznie jest dokładnie $5$ liczb całkowitych.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'PUŁAPKA CKE: Układ sprzeczny',
                    'title': 'Brak części wspólnej',
                    'formula': r'x < -2 \quad \text{i} \quad x > 3 \implies \emptyset',
                    'desc': 'Gdy przedziały biegną w przeciwne strony i nie mają wspólnych punktów, układ nie ma rozwiązań.',
                    'color': C_DANGER
                }
            ],
            'metrics': [
                {'label': 'Część wspólna $\\cap$', 'value': 'Warunki połączone spójnikiem ORAZ', 'color': C_PRIMARY},
                {'label': 'Liczba zero', 'value': '0 jest liczbą całkowitą!', 'color': C_SKY},
                {'label': 'Pewniak CKE', 'value': 'Zadanie o liczbę rozwiązań całkowitych', 'color': C_SUCCESS}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
