"""
topic_03.py - Dział 1.3: Wartość bezwzględna (3 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram
)

def get_topic_03_visuals(l_idx):
    # l_idx: 0..2 (Lekcje 1..3)
    l_num = l_idx + 1

    if l_num == 1:
        # L1.3.1: Definicja geometryczna na osi liczbowej (odległość |x - a|)
        tab0 = make_geometry_diagram(
            title='Wartość bezwzględna: Odległość na osi liczbowej',
            badge='|x - a| \\le r \\iff x \\in \\langle a - r,\\; a + r \\rangle',
            caption='Wyrażenie |x - a| oznacza odległość liczby x od punktu a na osi liczbowej. Znak minus w środku oznacza środek w punkcie a!',
            segments=[
                {'from': [40, 120], 'to': [480, 120], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [140, 120], 'to': [380, 120], 'color': C_PRIMARY, 'strokeWidth': 4},
                {'from': [140, 90], 'to': [260, 90], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [260, 90], 'to': [380, 90], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True}
            ],
            points=[
                {'x': 140, 'y': 120, 'color': C_PRIMARY, 'label': 'a - r'},
                {'x': 260, 'y': 120, 'color': C_SUCCESS, 'label': 'środek: a'},
                {'x': 380, 'y': 120, 'color': C_PRIMARY, 'label': 'a + r'}
            ],
            labels=[
                {'x': 200, 'y': 80, 'text': 'odległość r', 'color': C_SKY, 'fontSize': 12, 'anchor': 'middle'},
                {'x': 320, 'y': 80, 'text': 'odległość r', 'color': C_SKY, 'fontSize': 12, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Środek $a$', 'value': 'Liczba ze zmienionym znakiem ($|x - 2| \\implies a = 2$)', 'color': C_SUCCESS},
                {'label': 'Promień $r$', 'value': 'Połowa długości przedziału na osi', 'color': C_SKY},
                {'label': 'Znak plus: $|x + 3|$', 'value': '$|x - (-3)|$, więc środek to $-3$', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.3.2: Opuszczanie modułu dla liczb z pierwiastkami
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Opuszczanie wartości bezwzględnej: Weryfikacja znaku wnętrza',
            'formulaBadge': '|A| = \\begin{cases} A & \\text{gdy } A \\ge 0 \\\\ -A & \\text{gdy } A < 0 \\end{cases}',
            'caption': 'Wartość bezwzględna z wyrażenia ujemnego ZMIENIA WSZYSTKIE ZNAKI wewnątrz modułu na przeciwne, aby wynik był dodatni.',
            'cards': [
                {
                    'badge': 'Przypadek 1: Wnętrze dodatnie',
                    'title': 'Zostawiasz bez zmian',
                    'formula': '|\\sqrt{5} - 2| = \\sqrt{5} - 2',
                    'desc': 'Ponieważ $\\sqrt{5} \\approx 2{,}23 > 2$, wnętrze jest dodatnie ($>0$). Po prostu zdejmujesz kreski.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'Przypadek 2: Wnętrze ujemne',
                    'title': 'Zmieniasz wszystkie znaki!',
                    'formula': '|\\sqrt{3} - 2| = -(\\sqrt{3} - 2) = 2 - \\sqrt{3}',
                    'desc': 'Ponieważ $\\sqrt{3} \\approx 1{,}73 < 2$, wnętrze jest ujemne ($<0$). Musisz odwrócić kolejność składników.',
                    'color': C_DANGER
                }
            ],
            'metrics': [
                {'label': 'Szacowanie $\\sqrt{2}$', 'value': '$\\approx 1{,}41$', 'color': C_SKY},
                {'label': 'Szacowanie $\\sqrt{3}$', 'value': '$\\approx 1{,}73$', 'color': C_PRIMARY},
                {'label': 'Szacowanie $\\sqrt{5}$', 'value': '$\\approx 2{,}23$', 'color': C_SUCCESS}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.3.3: Proste równania z wartością bezwzględną
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Równania z wartością bezwzględną: Dwa przypadki',
            'formulaBadge': '|x - a| = b \\implies x - a = b \\quad \\text{lub} \\quad x - a = -b \\quad (b \\ge 0)',
            'caption': 'Równanie z wartością bezwzględną równą liczbie dodatniej ZAWSZE rozpada się na dwa proste równania.',
            'cards': [
                {
                    'badge': 'Przypadek A',
                    'title': 'Krok w prawo od środka',
                    'formula': 'x - a = b \\implies x = a + b',
                    'desc': 'Rozwiązanie leżące po prawej stronie środka $a$ w odległości $b$.',
                    'color': C_SKY
                },
                {
                    'badge': 'Przypadek B',
                    'title': 'Krok w lewo od środka',
                    'formula': 'x - a = -b \\implies x = a - b',
                    'desc': 'Rozwiązanie leżące po lewej stronie środka $a$ w odległości $b$.',
                    'color': C_PRIMARY
                }
            ],
            'metrics': [
                {'label': 'Dla $b > 0$', 'value': 'Dwa różne rozwiązania symetryczne!', 'color': C_SUCCESS},
                {'label': 'Dla $b = 0$', 'value': 'Jedno rozwiązanie: $x = a$', 'color': C_SKY},
                {'label': 'Dla $b < 0$', 'value': 'Równanie sprzeczne (brak rozwiązań)!', 'color': C_DANGER}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
