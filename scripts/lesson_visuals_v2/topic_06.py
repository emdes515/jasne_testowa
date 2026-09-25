"""
topic_06.py - Dział 1.6: Równania w postaci iloczynowej (3 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_06_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.6.1: Zasada zerowania iloczynu A · B = 0
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Zasada zerowania iloczynu: "Z polskiego na nasze"',
            'formulaBadge': r'A \cdot B = 0 \longrightarrow A = 0 \quad \text{lub} \quad B = 0',
            'caption': 'Kiedy iloczyn liczb daje zero? Tylko wtedy, gdy CO NAJMNIEJ JEDNA z mnożonych liczb jest równa zero! Nie wymnażaj nawiasów.',
            'cards': [
                {
                    'badge': 'Nawias 1 = 0',
                    'title': 'Pierwszy pierwiastek',
                    'formula': r'x - 3 = 0 \longrightarrow x = 3',
                    'desc': 'Przyrównujesz pierwszy czynnik do zera i wyznaczasz $x$.',
                    'color': C_SKY
                },
                {
                    'badge': 'Nawias 2 = 0',
                    'title': 'Drugi pierwiastek',
                    'formula': r'2x + 1 = 0 \longrightarrow x = -\frac{1}{2}',
                    'desc': r'Przyrównujesz drugi czynnik do zera. Rozwiązania to $x \in \left\{-\frac{1}{2}, 3\right\}$.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Prawa strona', 'value': 'Musi być równa $0$!', 'color': C_PRIMARY},
                {'label': 'Złota reguła CKE', 'value': 'Nie wymnażaj nawiasów ani nie licz delty', 'color': C_SUCCESS},
                {'label': 'Czas rozwiązania', 'value': 'Poniżej 30 sekund za 1 punkt', 'color': C_SKY}
            ]
        }
        tab2 = make_step_flow_diagram(
            title="Rozwiązanie równania iloczynowego krok po kroku",
            badge=r"(2x - 6)(3x + 1) = 0 \longrightarrow 2x - 6 = 0 \quad \text{lub} \quad 3x + 1 = 0",
            caption="Iloczyn jest równy 0, gdy co najmniej jeden z nawiasów jest równy 0. Rozbijasz na dwa proste równania liniowe.",
            steps=[
                {'num': 1, 'title': 'Zidentyfikuj czynniki', 'desc': r'Równanie ma postać $A \cdot B = 0$. Nie wymnażaj nawiasów!', 'color': C_SKY},
                {'num': 2, 'title': 'Przyrównaj każdy nawias do zera', 'desc': r'$2x - 6 = 0 \implies 2x = 6 \implies x = 3$ lub $3x + 1 = 0 \implies 3x = -1 \implies x = -\frac{1}{3}$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zapisz zbiór rozwiązań', 'desc': r'Rozwiązaniami są obie liczby: $x \in \left\{-\frac{1}{3}, 3\right\}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Czynnik A', 'value': '$x = 3$', 'color': C_SKY},
                {'label': 'Czynnik B', 'value': r'$x = -\frac{1}{3}$', 'color': C_SUCCESS},
                {'label': 'Liczba rozwiązań', 'value': 'Dokładnie dwa rozwiązania', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Prawa strona różna od zera lub niepotrzebne wymnażanie",
            badge=r"(x - 2)(x - 3) = 6 \neq x - 2 = 6 \quad \text{lub} \quad x - 3 = 6",
            caption="Reguła zerowania iloczynu działa WYŁĄCZNIE gdy po prawej stronie stoi ZERO! Jeśli stoi inna liczba, musisz wymnożyć i przenieść na lewo.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Przyrównywanie nawiasów do liczby $\neq 0$ (np. $x-2=6$)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Wymnóż: $x^2 - 5x + 6 = 6 \implies x^2 - 5x = 0$', 'color': C_SUCCESS},
                {'label': 'Gdy po prawej jest 0', 'value': 'Zakaz wymnażania i liczenia delty!', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L1.6.2: Równania iloczynowe wielomianowe
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Równania wielomianowe: Rozbijanie na nawiasy liniowe',
            'formulaBadge': r'(x - 3)(2x + 1)(x^2 - 9) = 0',
            'caption': 'Rozkładamy nawiasy wyższego stopnia za pomocą różnicy kwadratów x^2 - 9 = (x - 3)(x + 3) i zliczamy unikalne pierwiastki.',
            'cards': [
                {
                    'badge': 'Różnica kwadratów',
                    'title': 'Rozbicie nawiasu kwadratowego',
                    'formula': r'x^2 - 9 = 0 \longrightarrow x = 3 \quad \text{lub} \quad x = -3',
                    'desc': r'Pamiętaj o dwóch znakach: $x = \pm 3$.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'Zliczanie rozwiązań CKE',
                    'title': 'Uwaga na pierwiastki wielokrotne!',
                    'formula': r'x \in \left\{-3,\; -\frac{1}{2},\; 3\right\}',
                    'desc': 'Liczba $3$ pojawia się dwukrotnie, ale w pytaniu o liczbę różnych rozwiązań liczymy ją tylko raz (3 różne pierwiastki).',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Unikalne pierwiastki', 'value': r'Trzy liczby: $-3, -\frac{1}{2}, 3$', 'color': C_PRIMARY},
                {'label': 'Typowe pytanie CKE', 'value': '"Ile różnych rozwiązań ma równanie?"', 'color': C_SKY},
                {'label': 'Częsty błąd', 'value': r'Zgubienie ujemnego pierwiastka z $x^2 = a$', 'color': C_DANGER}
            ]
        }
        tab2 = make_step_flow_diagram(
            title="Rozbicie równania wielomianowego na czynniki liniowe",
            badge=r"(x^2 - 4)(2x - 5)(x + 3) = 0 \longrightarrow (x - 2)(x + 2)(2x - 5)(x + 3) = 0",
            caption="Rozłóż każdy nawias stopnia drugiego za pomocą wzoru skróconego mnożenia a^2 - b^2 = (a - b)(a + b).",
            steps=[
                {'num': 1, 'title': 'Rozłóż różnicę kwadratów', 'desc': r'$x^2 - 4 = (x - 2)(x + 2)$. Przepisz pozostałe czynniki bez zmian.', 'color': C_SKY},
                {'num': 2, 'title': 'Wyznacz pierwiastki każdego czynnika', 'desc': r'$x - 2 = 0 \implies x = 2$; $x + 2 = 0 \implies x = -2$; $2x - 5 = 0 \implies x = 2{,}5$; $x + 3 = 0 \implies x = -3$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zlicz unikalne rozwiązania', 'desc': r'Zbiór rozwiązań: $x \in \{-3, -2, 2, 2{,}5\}$ — cztery różne rozwiązania rzeczywiste.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Czynnik kwadratowy', 'value': r'$x = \pm 2$', 'color': C_PRIMARY},
                {'label': 'Czynnik liniowy', 'value': r'$x = 2{,}5$ oraz $x = -3$', 'color': C_SKY},
                {'label': 'Liczba rozwiązań', 'value': '4 różne pierwiastki rzeczywiste', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zgubienie ujemnego pierwiastka z x² = a lub dublowanie pierwiastków",
            badge=r"x^2 = 9 \implies x \in \{-3, 3\} \quad \text{oraz} \quad (x - 1)^2(x + 2) = 0 \implies 2 \text{ różne pierwiastki}",
            caption="Równanie x^2 = a (dla a > 0) ma ZAWSZE dwa rozwiązania: dodatnie i ujemne! Pytanie CKE o liczbę rozwiązań dotyczy rozwiązań RÓŻNYCH.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Zapisanie $x^2 = 9 \implies x = 3$ (utrata $-3$)', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Liczenie pierwiastka podwójnego $(x-1)^2$ jako 2 rozwiązania', 'color': C_DANGER},
                {'label': 'POPRAWNA ODPOWIEDŹ CKE', 'value': r'$x = 1$ oraz $x = -2$ to DWA różne rozwiązania', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L1.6.3: Wyłączanie wspólnego czynnika przed nawias
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Wyłączanie wspólnego czynnika: Odzyskiwanie postaci iloczynowej',
            'formulaBadge': r'ax^2 + bx = x(ax + b) = 0',
            'caption': 'Gdy równanie wielomianowe nie ma wyrazu wolnego, natychmiast wyciągamy x przed nawias! NIGDY nie dziel przez x.',
            'cards': [
                {
                    'badge': 'Wyciągnięcie przed nawias',
                    'title': 'Rozbicie na iloczyn',
                    'formula': r'3x^3 - 12x = 3x(x^2 - 4) = 0',
                    'desc': r'Wyciągasz wspólny czynnik $3x$. W nawiasie powstaje różnica kwadratów: $3x(x - 2)(x + 2) = 0$.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'Kardynalny zakaz',
                    'title': 'Nigdy nie dziel przez x!',
                    'formula': r'x^2 = 5x \longrightarrow x(x - 5) = 0 \longrightarrow x = 0 \quad \text{lub} \quad x = 5',
                    'desc': r'Dzieląc obie strony przez $x$, bezpowrotnie tracisz kluczowe rozwiązanie $x = 0$!',
                    'color': C_DANGER
                }
            ],
            'metrics': [
                {'label': 'Wspólny czynnik', 'value': r'Wyciągaj NWD i najniższą potęgę $x$', 'color': C_SKY},
                {'label': 'Rozwiązanie $x=0$', 'value': r'Gdy wyciągasz $x$, $x=0$ jest zawsze pierwiastkiem', 'color': C_SUCCESS},
                {'label': 'Waga w CKE', 'value': 'Zadanie otwarte za 2 pkt', 'color': C_PRIMARY}
            ]
        }
        tab2 = make_step_flow_diagram(
            title="Wyłączanie wspólnego czynnika krok po kroku",
            badge=r"3x^3 - 12x = 0 \longrightarrow 3x(x^2 - 4) = 0 \longrightarrow 3x(x - 2)(x + 2) = 0",
            caption="Gdy brak wyrazu wolnego, wyciągnij NWD współczynników oraz najniższą potęgę x przed nawias.",
            steps=[
                {'num': 1, 'title': 'Wyciągnij 3x przed nawias', 'desc': r'Oba składniki dzielą się przez $3x$: $3x^3 : 3x = x^2$ oraz $12x : 3x = 4$.', 'color': C_SKY},
                {'num': 2, 'title': 'Rozłóż nawias różnicą kwadratów', 'desc': r'$x^2 - 4 = (x - 2)(x + 2)$, stąd postać iloczynowa: $3x(x - 2)(x + 2) = 0$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wyznacz wszystkie pierwiastki', 'desc': r'$3x = 0 \implies x = 0$; $x - 2 = 0 \implies x = 2$; $x + 2 = 0 \implies x = -2$. Zbiór: $\{-2, 0, 2\}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Wspólny czynnik', 'value': '$3x$', 'color': C_SKY},
                {'label': 'Pierwiastek zerowy', 'value': '$x = 0$', 'color': C_SUCCESS},
                {'label': 'Komplet pierwiastków', 'value': r'$x \in \{-2, 0, 2\}$', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zakaz dzielenia obu stron równania przez x",
            badge=r"x^2 = 5x \quad \xrightarrow{:\; x} \quad x = 5 \quad (\text{BŁĄD: zgubiono } x = 0!)",
            caption="Dzielenie przez zmienną x to najczęstsza przyczyna utraty punktów na maturze! Ponieważ x może być zerem, dzielenie przez x jest niedozwolone.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Dzielenie przez $x$ i utrata pierwiastka $x = 0$ (0 pkt)', 'color': C_DANGER},
                {'label': 'POPRAWNA METODA', 'value': r'Przenieś: $x^2 - 5x = 0 \implies x(x - 5) = 0$', 'color': C_SUCCESS},
                {'label': 'PEŁNY ZBIÓR', 'value': r'$x = 0$ lub $x = 5$ (dwa rozwiązania)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
