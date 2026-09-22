"""
topic_01.py - Dział 1.1: Potęgi i pierwiastki (4 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_power_anatomy_diagram, make_root_anatomy_diagram,
    make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_01_visuals(l_idx):
    # l_idx: 0..3 (Lekcje 1..4)
    l_num = l_idx + 1

    if l_num == 1:
        # L1.1.1: Działania na potęgach (mnożenie, dzielenie, potęgowanie potęgi)
        tab0 = make_power_anatomy_diagram()
        tab2 = make_step_flow_diagram(
            title="Modelowa redukcja potęg do wspólnej bazy 3",
            badge="\\frac{3^{10} \\cdot 9^5}{27^6} = \\frac{3^{10} \\cdot (3^2)^5}{(3^3)^6} = \\frac{3^{10} \\cdot 3^{10}}{3^{18}} = \\frac{3^{20}}{3^{18}} = 3^2 = 9",
            caption="Klucz CKE: Zawsze zamieniaj wszystkie liczby (9, 27) na potęgi najmniejszej wspólnej bazy (3). Następnie zastosuj prawa działań na wykładnikach.",
            steps=[
                {'num': 1, 'title': 'Wspólna baza 3', 'desc': 'Zamieniasz $9 = 3^2$ oraz $27 = 3^3$.', 'color': C_SKY},
                {'num': 2, 'title': 'Potęgowanie potęgi', 'desc': 'Mnożysz wykładniki: $(3^2)^5 = 3^{10}$ oraz $(3^3)^6 = 3^{18}$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Iloczyn i iloraz', 'desc': 'Licznik: $3^{10+10} = 3^{20}$. Całość: $3^{20-18} = 3^2 = 9$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wspólna baza', 'value': '$9 = 3^2, \\; 27 = 3^3$', 'color': C_SKY},
                {'label': 'Licznik', 'value': '$3^{10} \\cdot 3^{10} = 3^{20}$', 'color': C_PRIMARY},
                {'label': 'Wynik końcowy', 'value': '$3^{20 - 18} = 3^2 = 9$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mnożenie potęg o tych samych podstawach",
            badge="2^3 \\cdot 2^4 = 2^{3+4} = 2^7 = 128 \\quad \\neq \\quad 4^7 \\; \\text{ani} \\; 4^{12}",
            caption="Przy mnożeniu potęg o tej samej podstawie bazy NIE mnożysz przez siebie! Baza 2 pozostaje nienaruszona, dodajesz tylko wykładniki.",
            metrics=[
                {'label': 'BŁĄD: Mnożenie baz', 'value': '$2^3 \\cdot 2^4 \\neq 4^7$', 'color': C_DANGER},
                {'label': 'BŁĄD: Mnożenie wykładników', 'value': '$2^3 \\cdot 2^4 \\neq 2^{12}$', 'color': C_DANGER},
                {'label': 'POPRAWNIE: Baza stała', 'value': '$2^3 \\cdot 2^4 = 2^{3+4} = 2^7$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

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
