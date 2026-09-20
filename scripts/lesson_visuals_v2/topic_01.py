"""
topic_01.py - Dział 1.1: Potęgi i pierwiastki (4 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_power_anatomy_diagram, make_root_anatomy_diagram
)

def get_topic_01_visuals(l_idx):
    # l_idx: 0..3 (Lekcje 1..4)
    l_num = l_idx + 1

    if l_num == 1:
        # L1.1.1: Działania na potęgach (mnożenie, dzielenie, potęgowanie potęgi)
        tab0 = make_power_anatomy_diagram()
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.1.2: Działania na pierwiastkach i wyłączanie czynnika
        tab0 = make_root_anatomy_diagram()
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.1.3: Usuwanie niewymierności z mianownika
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Usuwanie niewymierności z mianownika: Dwa schematy CKE',
            'formulaBadge': '\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}, \\quad \\frac{c}{\\sqrt{a} - b} = \\frac{c(\\sqrt{a} + b)}{a - b^2}',
            'caption': 'Mnożymy licznik i mianownik przez tę samą wartość, aby w mianowniku powstała liczba całkowita (różnica kwadratów).',
            'cards': [
                {
                    'badge': 'Typ 1: Prosty',
                    'title': 'Pojedynczy pierwiastek w mianowniku',
                    'formula': '\\frac{3}{\\sqrt{3}} = \\frac{3\\sqrt{3}}{\\sqrt{3} \\cdot \\sqrt{3}} = \\frac{3\\sqrt{3}}{3} = \\sqrt{3}',
                    'desc': 'Mnożysz licznik i mianownik przez ten sam pierwiastek.',
                    'color': C_SKY
                },
                {
                    'badge': 'Typ 2: Sprzężenie',
                    'title': 'Suma lub różnica z pierwiastkiem',
                    'formula': '\\frac{4}{\\sqrt{5} - 1} = \\frac{4(\\sqrt{5} + 1)}{(\\sqrt{5})^2 - 1^2} = \\frac{4(\\sqrt{5}+1)}{4} = \\sqrt{5} + 1',
                    'desc': 'Mnożysz przez wyrażenie z przeciwnym znakiem, uruchamiając wzór na różnicę kwadratów.',
                    'color': C_PRIMARY
                }
            ],
            'metrics': [
                {'label': 'Pojedynczy pierwiastek', 'value': 'Mnożysz przez $\\frac{\\sqrt{b}}{\\sqrt{b}}$', 'color': C_SKY},
                {'label': 'Sprzężenie CKE', 'value': 'Wzór: $(x-y)(x+y) = x^2 - y^2$', 'color': C_PRIMARY},
                {'label': 'Złota zasada', 'value': 'Zawsze bierz cały licznik w nawias!', 'color': C_SUCCESS}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 4:
        # L1.1.4: Potęgi o wykładniku ujemnym i ułamkowym
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Wykładnik ujemny i ułamkowy: "Z polskiego na nasze"',
            'formulaBadge': 'a^{-n} = \\frac{1}{a^n}, \\quad a^{\\frac{m}{n}} = \\sqrt[n]{a^m}',
            'caption': 'Minus w wykładniku ODWRACA liczbę do góry nogami. Mianownik w wykładniku ułamkowym zamienia się w STOPIEŃ PIERWIASTKA.',
            'cards': [
                {
                    'badge': 'Zasada 1: Minus w potędze',
                    'title': 'Minus w wykładniku to odwrotność',
                    'formula': '\\left(\\frac{2}{3}\\right)^{-2} = \\left(\\frac{3}{2}\\right)^2 = \\frac{9}{4}',
                    'desc': 'Minus na górze obraca ułamek do góry dnem. Nie daje liczby ujemnej!',
                    'color': C_DANGER
                },
                {
                    'badge': 'Zasada 2: Ułamek w potędze',
                    'title': 'Ułamek w wykładniku to pierwiastek',
                    'formula': '8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4',
                    'desc': 'Mianownik ułamka staje się stopniem pierwiastka, a licznik zwykłą potęgą.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Minus w potędze', 'value': '$a^{-n} = \\frac{1}{a^n}$ (dla $a > 0$ wynik jest dodatni)', 'color': C_DANGER},
                {'label': 'Mianownik $n$', 'value': 'Stopień pierwiastka $\\sqrt[n]{\\dots}$', 'color': C_SUCCESS},
                {'label': 'Licznik $m$', 'value': 'Zwykła potęga $(\\dots)^m$', 'color': C_PRIMARY}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
