"""
topic_03.py - Dział 1.3: Wartość bezwzględna (3 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT
)

def get_topic_03_visuals(l_idx):
    # l_idx: 0..2 (Lekcje 1..3)
    l_num = l_idx + 1

    if l_num == 1:
        # L1.3.1: Definicja geometryczna na osi liczbowej (odległość |x - a| = r)
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Definicja geometryczna wartości bezwzględnej: Odległość na osi',
            'formulaBadge': r'|x - a| = r \implies x = a - r \quad \text{lub} \quad x = a + r \quad (r \ge 0)',
            'caption': 'Wartość bezwzględna |x - a| to odległość liczby x od punktu środkowego a. Rozwiązania leżą symetrycznie po obu stronach środka.',
            'cards': [
                {
                    'badge': 'Krok w prawo (+r)',
                    'title': 'Rozwiązanie po prawej stronie',
                    'formula': r'x_1 = a + r',
                    'desc': 'Przesuwamy się od środka $a$ o $r$ jednostek w prawo na osi liczbowej.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'Krok w lewo (-r)',
                    'title': 'Rozwiązanie po lewej stronie',
                    'formula': r'x_2 = a - r',
                    'desc': 'Przesuwamy się od środka $a$ o $r$ jednostek w lewo na osi liczbowej.',
                    'color': C_SKY
                },
                {
                    'badge': 'PUŁAPKA CKE: Znak plus',
                    'title': 'Środek leży po stronie ujemnej',
                    'formula': r'|x + 3| = |x - (-3)| \implies a = -3',
                    'desc': 'Gdy wewnątrz modułu widzisz dodawanie, środek przedziału ma znak ujemny!',
                    'color': C_DANGER
                }
            ],
            'metrics': [
                {'label': 'Środek $a$', 'value': 'Punkt odniesienia ze zmienionym znakiem ($|x - 2| \\implies a = 2$)', 'color': C_SUCCESS},
                {'label': 'Promień $r$', 'value': 'Dopuszczalna odległość od środka ($r \\ge 0$)', 'color': C_SKY},
                {'label': 'Prawa strona ujemna', 'value': '$|x - a| = -3 \\implies$ sprzeczność (brak rozwiązań)', 'color': C_DANGER}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.3.2: Nierówności z wartością bezwzględną i przedziały rozwiązań
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Nierówności z wartością bezwzględną: Klatka vs Skrzydła',
            'formulaBadge': r'\begin{aligned} |x - a| < r &\implies x \in (a - r,\; a + r) \\ |x - a| \ge r &\implies x \in (-\infty, a - r] \cup [a + r, +\infty) \end{aligned}',
            'caption': 'Znak mniejszości uwięzi cię wewnątrz jednego przedziału wokół środka. Znak większości wyrzuca cię na zewnątrz w dwa skrzydła ku nieskończonościom.',
            'cards': [
                {
                    'badge': 'Znak mniejszości (< lub ≤)',
                    'title': 'Wnętrze przedziału („Klatka”)''',
                    'formula': r'|x - 2| < 3 \implies x \in (-1,\; 5)',
                    'desc': 'Punkty leżą blisko środka $a = 2$. Zbiorem rozwiązań jest jeden spójny przedział ograniczony wartościami $2 - 3 = -1$ oraz $2 + 3 = 5$.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'Znak większości (> lub ≥)',
                    'title': 'Dwa skrzydła ku nieskończoności',
                    'formula': r'|x - 1| \ge 4 \implies x \in (-\infty, -3] \cup [5, +\infty)',
                    'desc': 'Punkty uciekają daleko od środka $a = 1$. Zbiorem rozwiązań jest suma dwóch przedziałów nieskończonych połączonych znakiem $\\cup$.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'PUŁAPKA CKE: Zero i liczby ujemne',
                    'title': 'Zawsze sprawdzaj sens geometryczny',
                    'formula': r'|x - 5| < 0 \implies \emptyset, \quad |x - 5| \ge 0 \implies \mathbb{R}',
                    'desc': 'Wartość bezwzględna nigdy nie jest ujemna. Ostra nierówność $< 0$ nie ma rozwiązań, a nierówność $\\ge 0$ spełnia każda liczba.',
                    'color': C_DANGER
                }
            ],
            'metrics': [
                {'label': 'Ostre: $<$ oraz $>$', 'value': 'Kółka otwarte ○, nawiasy okrągłe $( )$', 'color': C_SKY},
                {'label': 'Słabe: $\\le$ oraz $\\ge$', 'value': 'Kółka zamalowane ●, nawiasy domknięte $[ ]$', 'color': C_SUCCESS},
                {'label': 'Suma przedziałów $\\cup$', 'value': 'Zawsze łączy skrzydła przy znaku większości', 'color': C_PRIMARY}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.3.3: Wartość bezwzględna z wyrażeń i tożsamość pierwiastkowa
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Tożsamość pierwiastkowa i opuszczanie wartości bezwzględnej',
            'formulaBadge': r'\sqrt{a^2} = |a| \quad \text{oraz} \quad |A| = \begin{cases} A & \text{dla } A \ge 0 \\ -A & \text{dla } A < 0 \end{cases}',
            'caption': 'Pierwiastek parzystego stopnia z definicji NIGDY nie daje wyniku ujemnego. Zdejmując kreski z liczby ujemnej, zmieniasz wszystkie znaki!',
            'cards': [
                {
                    'badge': 'Żelazna tożsamość CKE',
                    'title': 'Pierwiastek z kwadratu to moduł',
                    'formula': r'\sqrt{a^2} = |a| \implies \sqrt{(-4)^2} = |-4| = 4',
                    'desc': 'Dla $a < 0$ zachodzi $\\sqrt{a^2} = -a$. Odruchowe pisanie $\\sqrt{a^2} = a$ to najczęstszy błąd na maturze!',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'Opuszczanie modułu z pierwiastkiem',
                    'title': 'Zawsze oszacuj znak wnętrza',
                    'formula': r'|2 - \sqrt{5}| = \sqrt{5} - 2',
                    'desc': 'Szacujemy $\\sqrt{5} \\approx 2{,}24 > 2$. Ponieważ wnętrze jest ujemne ($2 - 2{,}24 < 0$), odwracamy kolejność odejmowania.',
                    'color': C_DANGER
                },
                {
                    'badge': 'Wzór skróconego mnożenia',
                    'title': 'Zwijanie kwadratu pod pierwiastkiem',
                    'formula': r'\sqrt{x^2 - 6x + 9} = \sqrt{(x - 3)^2} = |x - 3|',
                    'desc': 'Zwijasz trójmian do kwadratu różnicy, zamieniasz na wartość bezwzględną i dopiero sprawdzasz założenie (np. $x < 3 \\implies 3 - x$).',
                    'color': C_PRIMARY
                }
            ],
            'metrics': [
                {'label': 'Szacowanie $\\sqrt{2}$', 'value': '$\\approx 1{,}41$', 'color': C_SKY},
                {'label': 'Szacowanie $\\sqrt{3}$', 'value': '$\\approx 1{,}73$', 'color': C_PRIMARY},
                {'label': 'Szacowanie $\\sqrt{5}$', 'value': '$\\approx 2{,}24$', 'color': C_SUCCESS},
                {'label': 'Liczba $\\pi$', 'value': '$\\approx 3{,}14$', 'color': C_PURPLE}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
