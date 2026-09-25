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
            title="Modelowa redukcja potęg do wspólnej bazy 2",
            badge="\\frac{2^7 \\cdot 4^3}{8^4} = \\frac{2^7 \\cdot (2^2)^3}{(2^3)^4} = \\frac{2^7 \\cdot 2^6}{2^{12}} = \\frac{2^{13}}{2^{12}} = 2^1 = 2",
            caption="Klucz CKE: Zawsze zamieniaj wszystkie liczby (4, 8) na potęgi najmniejszej wspólnej bazy (2). Następnie zastosuj prawa działań na wykładnikach.",
            steps=[
                {'num': 1, 'title': 'Wspólna baza 2', 'desc': 'Zamieniasz $4 = 2^2$ oraz $8 = 2^3$.', 'color': C_SKY},
                {'num': 2, 'title': 'Potęgowanie potęgi', 'desc': 'Mnożysz wykładniki: $(2^2)^3 = 2^6$ oraz $(2^3)^4 = 2^{12}$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Iloczyn i iloraz', 'desc': 'Licznik: $2^{7+6} = 2^{13}$. Całość: $2^{13-12} = 2^1 = 2$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wspólna baza', 'value': '$4 = 2^2, \\; 8 = 2^3$', 'color': C_SKY},
                {'label': 'Licznik', 'value': '$2^7 \\cdot 2^6 = 2^{13}$', 'color': C_PRIMARY},
                {'label': 'Wynik końcowy', 'value': '$2^{13 - 12} = 2^1 = 2$', 'color': C_SUCCESS}
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
        tab2 = make_step_flow_diagram(
            title="Wyłączanie czynnika przed pierwiastek i redukcja",
            badge=r"\sqrt{75} = \sqrt{25 \cdot 3} = \sqrt{25} \cdot \sqrt{3} = 5\sqrt{3}",
            caption="Rozbijasz liczbę pod pierwiastkiem na iloczyn, w którym jeden składnik to kwadrat liczby całkowitej (4, 9, 16, 25, 36, 49...).",
            steps=[
                {'num': 1, 'title': 'Szukasz kwadratu', 'desc': 'Liczba $75$ dzieli się przez $25$ ($25 \\cdot 3$).', 'color': C_SKY},
                {'num': 2, 'title': 'Pierwiastkujesz kwadrat', 'desc': 'Pierwiastek z $\\sqrt{25}$ daje czyste $5$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zapis końcowy', 'desc': 'Wyciągasz $5$ przed pierwiastek: $5\\sqrt{3}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Czynnik kwadratowy', 'value': '$75 = 25 \\cdot 3$', 'color': C_SKY},
                {'label': 'Wyłączenie', 'value': '$\\sqrt{25} = 5$', 'color': C_PRIMARY},
                {'label': 'Postać kanoniczna', 'value': '$5\\sqrt{3}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Rozbijanie sumy pod pierwiastkiem",
            badge=r"\sqrt{a^2 + b^2} \neq a + b \quad \text{oraz} \quad \sqrt{a - b} \neq \sqrt{a} - \sqrt{b}",
            caption="Pierwiastkować wolno WYŁĄCZNIE mnożenie i dzielenie! Nigdy nie rozbijaj sumy ani różnicy pod pierwiastkiem.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': '$\\sqrt{9 + 16} \\neq 3 + 4 = 7$', 'color': C_DANGER},
                {'label': 'POPRAWNA KOLEJNOŚĆ', 'value': '$\\sqrt{9 + 16} = \\sqrt{25} = 5$', 'color': C_SUCCESS},
                {'label': 'Dozwolone działanie', 'value': '$\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}$ (tylko mnożenie!)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L1.1.3: Usuwanie niewymierności z mianownika
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Usuwanie niewymierności z mianownika: Dwa schematy CKE',
            'formulaBadge': r'\frac{a}{\sqrt{b}} = \frac{a\sqrt{b}}{b}, \quad \frac{c}{\sqrt{a} - b} = \frac{c(\sqrt{a} + b)}{a - b^2}',
            'caption': 'Mnożymy licznik i mianownik przez tę samą wartość, aby w mianowniku powstała liczba całkowita (różnica kwadratów).',
            'cards': [
                {
                    'badge': 'Typ 1: Prosty',
                    'title': 'Pojedynczy pierwiastek w mianowniku',
                    'formula': r'\frac{3}{\sqrt{3}} = \frac{3\sqrt{3}}{\sqrt{3} \cdot \sqrt{3}} = \frac{3\sqrt{3}}{3} = \sqrt{3}',
                    'desc': 'Mnożysz licznik i mianownik przez ten sam pierwiastek.',
                    'color': C_SKY
                },
                {
                    'badge': 'Typ 2: Sprzężenie',
                    'title': 'Suma lub różnica z pierwiastkiem',
                    'formula': r'\frac{4}{\sqrt{5} - 1} = \frac{4(\sqrt{5} + 1)}{(\sqrt{5})^2 - 1^2} = \frac{4(\sqrt{5}+1)}{4} = \sqrt{5} + 1',
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
        tab2 = make_step_flow_diagram(
            title="Winda sprzężenia: Likwidacja pierwiastka z mianownika",
            badge=r"\frac{3}{\sqrt{5} - 1} = \frac{3(\sqrt{5} + 1)}{(\sqrt{5}-1)(\sqrt{5}+1)} = \frac{3(\sqrt{5}+1)}{5 - 1} = \frac{3\sqrt{5} + 3}{4}",
            caption="W mianowniku uruchamiasz wzór skróconego mnożenia (a-b)(a+b) = a^2 - b^2, który bez śladu likwiduje pierwiastki kwadratowe.",
            steps=[
                {'num': 1, 'title': 'Zmień znak na przeciwny', 'desc': 'Dla $\\sqrt{5}-1$ wyrażeniem sprzężonym jest $\\sqrt{5}+1$.', 'color': C_SKY},
                {'num': 2, 'title': 'Różnica kwadratów w mianowniku', 'desc': 'W mianowniku: $(\\sqrt{5})^2 - 1^2 = 5 - 1 = 4$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wymnożenie licznika', 'desc': 'Licznik: $3(\\sqrt{5}+1) = 3\\sqrt{5} + 3$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wyrażenie sprzężone', 'value': '$\\sqrt{5} + 1$', 'color': C_SKY},
                {'label': 'Mianownik po redukcji', 'value': '$5 - 1 = 4$', 'color': C_SUCCESS},
                {'label': 'Postać ostateczna', 'value': '$\\frac{3\\sqrt{5} + 3}{4}$', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zgubiony nawias w liczniku przy sprzężeniu",
            badge=r"\frac{2}{\sqrt{3} + 1} \neq \frac{2\sqrt{3} - 1}{3 - 1}",
            caption="Mnożąc ułamek przez sprzężenie, musisz wymnożyć CAŁY licznik przez całe wyrażenie! Stawiaj bezwzględnie nawias.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': '$2 \\cdot \\sqrt{3} - 1 = 2\\sqrt{3} - 1$ (brak nawiasu)', 'color': C_DANGER},
                {'label': 'POPRAWNY ZAPIS CKE', 'value': '$2(\\sqrt{3} - 1) = 2\\sqrt{3} - 2$', 'color': C_SUCCESS},
                {'label': 'Odruch maturalny', 'value': 'Otocz licznik nawiasem przed mnożeniem!', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 4:
        # L1.1.4: Potęgi o wykładniku ujemnym i ułamkowym
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Wykładnik ujemny i ułamkowy: "Z polskiego na nasze"',
            'formulaBadge': r'a^{-n} = \frac{1}{a^n}, \quad a^{\frac{m}{n}} = \sqrt[n]{a^m}',
            'caption': 'Minus w wykładniku ODWRACA liczbę do góry nogami. Mianownik w wykładniku ułamkowym zamienia się w STOPIEŃ PIERWIASTKA.',
            'cards': [
                {
                    'badge': 'Zasada 1: Minus w potędze',
                    'title': 'Minus w wykładniku to odwrotność',
                    'formula': r'\left(\frac{2}{3}\right)^{-2} = \left(\frac{3}{2}\right)^2 = \frac{9}{4}',
                    'desc': 'Minus na górze obraca ułamek do góry dnem. Nie daje liczby ujemnej!',
                    'color': C_DANGER
                },
                {
                    'badge': 'Zasada 2: Ułamek w potędze',
                    'title': 'Ułamek w wykładniku to pierwiastek',
                    'formula': r'8^{\frac{2}{3}} = (\sqrt[3]{8})^2 = 2^2 = 4',
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
        tab2 = make_step_flow_diagram(
            title="Drzewo potęg ułamkowych: Schemat dwuetapowy CKE",
            badge=r"8^{\frac{2}{3}} = (\sqrt[3]{8})^2 = 2^2 = 4 \quad \text{oraz} \quad 27^{-\frac{2}{3}} = \frac{1}{(\sqrt[3]{27})^2} = \frac{1}{3^2} = \frac{1}{9}",
            caption="Najpierw wykonaj pierwiastkowanie stopnia z mianownika (zmniejsz liczbę), a dopiero potem podnieś do potęgi z licznika!",
            steps=[
                {'num': 1, 'title': 'Zejdź do korzenia (Mianownik)', 'desc': 'Stopień pierwiastka $\\sqrt[3]{8} = 2$ oraz $\\sqrt[3]{27} = 3$.', 'color': C_SKY},
                {'num': 2, 'title': 'Podnieś do potęgi (Licznik)', 'desc': 'Kwadrat wyniku: $2^2 = 4$ oraz $3^2 = 9$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Obsłuż minus (Winda)', 'desc': 'Minus obraca ułamek: $27^{-\\frac{2}{3}} = \\frac{1}{9}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Krok 1 (Korzeń)', 'value': '$\\sqrt[3]{8} = 2$', 'color': C_SKY},
                {'label': 'Krok 2 (Gałąź)', 'value': '$2^2 = 4$', 'color': C_PRIMARY},
                {'label': 'Krok 3 (Winda)', 'value': '$\\frac{1}{9} > 0$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Ujemny wykładnik to NIE liczba ujemna",
            badge=r"2^{-3} = \frac{1}{2^3} = \frac{1}{8} \quad \neq -8 \quad \text{ani} \quad -6",
            caption="Minus w wykładniku potęgi spycha liczbę na parter (odwrotność), ale NIGDY nie tworzy liczby ujemnej!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': '$2^{-3} \\neq -8$ (minus to nie znak liczby!)', 'color': C_DANGER},
                {'label': 'BŁĄD MNOŻENIA', 'value': '$2^{-3} \\neq 2 \\cdot (-3) = -6$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODDRUCH CKE', 'value': '$2^{-3} = \\frac{1}{2^3} = \\frac{1}{8} > 0$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
