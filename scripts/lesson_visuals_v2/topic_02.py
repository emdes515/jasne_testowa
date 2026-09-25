"""
topic_02.py - Dział 1.2: Logarytmy (3 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_logarithm_loop_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_02_visuals(l_idx):
    # l_idx: 0..2 (Lekcje 1..3)
    l_num = l_idx + 1

    if l_num == 1:
        # L1.2.1: Definicja logarytmu i warunki istnienia
        tab0 = make_logarithm_loop_diagram()
        tab2 = make_step_flow_diagram(
            title="Złoty Ślimak CKE: Obliczanie wartości logarytmu",
            badge=r"\log_2 8 = c \longrightarrow 2^c = 8 \longrightarrow 2^c = 2^3 \longrightarrow c = 3",
            caption="Ruch po okręgu: bierzesz podstawę 2, przeskakujesz przez znak równości do wykładnika c i lądujesz na liczbie logarytmowanej 8.",
            steps=[
                {'num': 1, 'title': 'Zadaj pytanie potęgowe', 'desc': 'Do jakiej potęgi podnieść $2$, aby otrzymać $8$?', 'color': C_SKY},
                {'num': 2, 'title': 'Sprowadź do wspólnej bazy', 'desc': 'Zapisujesz $8 = 2^3$, skąd równanie $2^c = 2^3$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Odczytaj wykładnik', 'desc': 'Wykładniki są równe: $c = 3$, więc $\\log_2 8 = 3$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Pytanie bazowe', 'value': '$2^c = 8$', 'color': C_SKY},
                {'label': 'Wspólna baza', 'value': '$8 = 2^3$', 'color': C_PRIMARY},
                {'label': 'Wartość logarytmu', 'value': '$\\log_2 8 = 3$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Warunki istnienia logarytmu (Dziedzina)",
            badge=r"\log_a b \quad \longrightarrow \quad a > 0, \quad a \neq 1, \quad b > 0",
            caption="Podstawa a i liczba logarytmowana b muszą być ściśle dodatnie! Podstawa nigdy nie może być równa 1.",
            metrics=[
                {'label': 'BŁĄD: Ujemny argument', 'value': '$\\log_2(-4)$ NIE ISTNIEJE w $\\mathbb{R}$', 'color': C_DANGER},
                {'label': 'BŁĄD: Baza równa 1', 'value': '$\\log_1 5$ NIE ISTNIEJE ($a \\neq 1$)', 'color': C_DANGER},
                {'label': 'POPRAWNY WYNIK', 'value': '$\\log_2\\left(\\frac{1}{4}\\right) = -2$ (wynik może być ujemny!)', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

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
        tab2 = make_step_flow_diagram(
            title="Lejek Fuzji: Łączenie logarytmów o tej samej podstawie",
            badge=r"\log_6 4 + \log_6 9 = \log_6(4 \cdot 9) = \log_6 36 = 2",
            caption="Dodawanie dwóch logarytmów o wspólnej bazie 6 pozwala scalić liczby w jeden iloczyn pod logarytmem.",
            steps=[
                {'num': 1, 'title': 'Identyczna podstawa', 'desc': 'Oba logarytmy mają podstawę $6$.', 'color': C_SKY},
                {'num': 2, 'title': 'Fuzja w iloczyn', 'desc': 'Mnożysz liczby: $4 \\cdot 9 = 36$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Obliczenie wartości', 'desc': '$\\log_6 36 = 2$, bo $6^2 = 36$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wspólna baza', 'value': '$a = 6$', 'color': C_SKY},
                {'label': 'Iloczyn argumentów', 'value': '$4 \\cdot 9 = 36$', 'color': C_PRIMARY},
                {'label': 'Wartość ostateczna', 'value': '$\\log_6 36 = 2$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Rozbijanie sumy wewnątrz logarytmu",
            badge=r"\log_a(x + y) \neq \log_a x + \log_a y",
            caption="Suma W ŚRODKU nawiasu logarytmu NIE rozbija się na sumę logarytmów! Wzory CKE działają wyłącznie na iloczyn i iloraz.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': '$\\log_2(4 + 4) \\neq \\log_2 4 + \\log_2 4 = 2+2 = 4$', 'color': C_DANGER},
                {'label': 'POPRAWNA KOLEJNOŚĆ', 'value': '$\\log_2(4 + 4) = \\log_2 8 = 3$', 'color': C_SUCCESS},
                {'label': 'Legalny wzór CKE', 'value': '$\\log_a(x \\cdot y) = \\log_a x + \\log_a y$ (tylko mnożenie!)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

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
        tab2 = make_step_flow_diagram(
            title="Winda współczynnika: Najczęstsze zadanie maturalne",
            badge=r"2\log_5 10 - \log_5 4 = \log_5(10^2) - \log_5 4 = \log_5\left(\frac{100}{4}\right) = \log_5 25 = 2",
            caption="KROK 1: Najpierw wciągnij współczynnik 2 jako potęgę $10^2 = 100$. KROK 2: Dopiero teraz połącz ułamkiem $100 : 4$.",
            steps=[
                {'num': 1, 'title': 'Wciągnij 2 na piętro', 'desc': '$2\\log_5 10 = \\log_5(10^2) = \\log_5 100$.', 'color': C_SKY},
                {'num': 2, 'title': 'Zastosuj wzór na iloraz', 'desc': '$\\log_5 100 - \\log_5 4 = \\log_5\\left(\\frac{100}{4}\\right) = \\log_5 25$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz wynik', 'desc': '$\\log_5 25 = 2$, bo $5^2 = 25$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Krok 1 (Potęga)', 'value': '$10^2 = 100$', 'color': C_SKY},
                {'label': 'Krok 2 (Iloraz)', 'value': '$100 : 4 = 25$', 'color': C_PRIMARY},
                {'label': 'Wynik z arkusza', 'value': '$\\log_5 25 = 2$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Błędna kolejność z liczbą przed logarytmem",
            badge=r"2\log_5 10 - \log_5 4 \neq \log_5\left(\frac{2 \cdot 10}{4}\right)",
            caption="Nigdy nie łącz logarytmów w iloraz, dopóki przed którymś z nich stoi współczynnik! Najpierw wciągnij go do wykładnika.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': 'Dzielenie z dwójką na zewnątrz (0 pkt)', 'color': C_DANGER},
                {'label': 'ŻELAZNA KOLEJNOŚĆ', 'value': 'Najpierw $10^2 = 100$, potem $100 : 4 = 25$', 'color': C_SUCCESS},
                {'label': 'Poprawny wynik CKE', 'value': 'Dokładnie 2 (a nie $\\log_5 5 = 1$)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
