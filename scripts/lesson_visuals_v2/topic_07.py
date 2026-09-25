"""
topic_07.py - Dział 1.7: Równania i wyrażenia wymierne (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_07_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.7.1: Dziedzina wyrażenia wymiernego – BEZWZGLĘDNY warunek mianownik ≠ 0
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Dziedzina wyrażenia wymiernego: Ważna reguła',
            'formulaBadge': r'\frac{P(x)}{Q(x)} \longrightarrow D: Q(x) \neq 0',
            'caption': 'Pamiętaj: NIE WOLNO DZIELIĆ PRZEZ ZERO! W każdym ułamku algebraicznym mianownik musi być różny od zera.',
            'cards': [
                {
                    'badge': 'Krok 0: Warunek mianownika',
                    'title': 'Wykluczanie punktów zerowych',
                    'formula': r'x^2 - 16 \neq 0 \longrightarrow (x - 4)(x + 4) \neq 0',
                    'desc': 'Mianownik zeruje się dla $x = 4$ oraz $x = -4$. Te liczby są bezwzględnie zakazane.',
                    'color': C_DANGER
                },
                {
                    'badge': 'Zapis dziedziny CKE',
                    'title': 'Zbiór liczb dopuszczalnych',
                    'formula': r'D = \mathbb{R} \setminus \{-4,\; 4\}',
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
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie dziedziny ułamka krok po kroku",
            badge=r"\frac{2x + 1}{x^2 - 16} \implies x^2 - 16 \neq 0 \implies D = \mathbb{R} \setminus \{-4, 4\}",
            caption="Wypisujesz warunek różności mianownika od zera, rozkładasz różnicę kwadratów i wykluczasz punkty osobliwe.",
            steps=[
                {'num': 1, 'title': 'Zapisz warunek mianownika', 'desc': r'Mianownik nie może być zerem: $x^2 - 16 \neq 0$. Licznik ignorujesz.', 'color': C_SKY},
                {'num': 2, 'title': 'Rozłóż na czynniki', 'desc': r'$(x - 4)(x + 4) \neq 0 \longrightarrow x - 4 \neq 0 \text{ oraz } x + 4 \neq 0 \longrightarrow x \neq 4 \text{ oraz } x \neq -4$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zapisz dziedzinę formalnie', 'desc': r'$D = \mathbb{R} \setminus \{-4, 4\}$ — zbiór liczb rzeczywistych bez dwóch zakazanych punktów.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Warunek bazowy', 'value': r'$Q(x) \neq 0$', 'color': C_SKY},
                {'label': 'Zakazane punkty', 'value': r'$x = \pm 4$', 'color': C_DANGER},
                {'label': 'Ostateczna dziedzina', 'value': r'$D = \mathbb{R} \setminus \{-4, 4\}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Wykluczanie zer licznika zamiast mianownika",
            badge=r"\frac{x - 3}{x + 5} \implies D = \mathbb{R} \setminus \{-5\} \neq \mathbb{R} \setminus \{3\}",
            caption="Dziedzinę wyznacza WYŁĄCZNIE mianownik! Licznik ułamka może przyjmować wartość 0 (wtedy cały ułamek jest równy 0).",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Wykluczanie licznika: $x - 3 \neq 0 \implies D = \mathbb{R} \setminus \{3\}$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Badaj tylko mianownik: $x + 5 \neq 0 \implies D = \mathbb{R} \setminus \{-5\}$', 'color': C_SUCCESS},
                {'label': 'Rola licznika', 'value': '$x = 3$ to miejsce zerowe wyrażenia', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L1.7.2: Rozwiązywanie równań wymiernych i eliminacja pierwiastków obcych
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Sitko dziedziny: Odrzucanie pozornych pierwiastków',
            'formulaBadge': r'\frac{x^2 - 4}{x - 2} = 0 \longrightarrow x = -2 \quad (x = 2 \notin D)',
            'caption': 'Ułamek jest równy zero tylko wtedy, gdy licznik jest zerem ORAZ mianownik jest różny od zera!',
            'cards': [
                {
                    'badge': 'Kandydaci z licznika',
                    'title': 'Zerowanie góry ułamka',
                    'formula': r'x^2 - 4 = 0 \longrightarrow x = 2 \quad \text{lub} \quad x = -2',
                    'desc': 'Licznik wskazuje dwóch potencjalnych kandydatów na rozwiązanie.',
                    'color': C_SKY
                },
                {
                    'badge': 'Sitko dziedziny (ALARM CKE)',
                    'title': 'Odrzucenie pozornego pierwiastka',
                    'formula': r'x - 2 \neq 0 \longrightarrow D = \mathbb{R} \setminus \{2\} \longrightarrow x = -2',
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
        tab2 = make_step_flow_diagram(
            title="Sitko dziedziny w akcji: Rozwiązanie krok po kroku",
            badge=r"\frac{x^2 - 9}{x - 3} = 0 \longrightarrow x = -3 \quad (x = 3 \notin D)",
            caption="Ułamek jest równy 0, gdy licznik jest równy 0 i mianownik ma sens liczbowy (D).",
            steps=[
                {'num': 1, 'title': 'Wyznacz dziedzinę D', 'desc': r'Mianownik: $x - 3 \neq 0 \implies x \neq 3$, stąd $D = \mathbb{R} \setminus \{3\}$.', 'color': C_DANGER},
                {'num': 2, 'title': 'Przyrównaj licznik do 0', 'desc': r'$x^2 - 9 = 0 \longrightarrow (x - 3)(x + 3) = 0 \longrightarrow x = 3 \text{ lub } x = -3$.', 'color': C_SKY},
                {'num': 3, 'title': 'Przebadaj przez sitko dziedziny', 'desc': r'$x = 3 \notin D$ (odrzucamy!), $x = -3 \in D$ (akceptujemy). Rozwiązanie: $x = -3$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Kandydaci z licznika', 'value': r'$x = 3 \text{ lub } x = -3$', 'color': C_SKY},
                {'label': 'Pierwiastek obcy', 'value': r'$x = 3 \notin D$', 'color': C_DANGER},
                {'label': 'Rzeczywiste rozwiązanie', 'value': r'Tylko $x = -3$ (1 rozwiązanie)', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Liczenie pierwiastków obcych w pytaniach o liczbę rozwiązań",
            badge=r"\frac{x^2 - 4}{x - 2} = 0 \implies 1 \text{ rozwiązanie } (x = -2) \neq 2 \text{ rozwiązania}",
            caption="CKE uwielbia pytać: 'Ile rozwiązań ma równanie?'. Jeśli nie sprawdzisz dziedziny, zaznaczysz 2 zamiast 1 i stracisz pewny punkt.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': 'Podanie 2 rozwiązań: $x = 2$ oraz $x = -2$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': '$x = 2$ zeruje mianownik, więc równanie ma 1 rozwiązanie', 'color': C_SUCCESS},
                {'label': 'Reguła złota', 'value': 'Liczba poza dziedziną NIE ISTNIEJE jako rozwiązanie', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L1.7.3: Równania wymierne z proporcji i mnożenie na krzyż
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Mnożenie "na krzyż": Rozwiązywanie proporcji',
            'formulaBadge': r'\frac{A}{B} = \frac{C}{D} \longrightarrow A \cdot D = B \cdot C \quad (B, D \neq 0)',
            'caption': 'Mnożymy wyrażenia po przekątnych. Pamiętaj o BEZWZGLĘDNYM stawianiw nawiasów przy wielomianach!',
            'cards': [
                {
                    'badge': 'Metoda proporcji',
                    'title': 'Wymnożenie po przekątnych',
                    'formula': r'\frac{x + 1}{x - 2} = \frac{3}{1} \longrightarrow 1 \cdot (x + 1) = 3 \cdot (x - 2)',
                    'desc': 'Liczbę $3$ zapisujesz jako $\\frac{3}{1}$ i mnożysz po przekątnej.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'Równanie liniowe',
                    'title': 'Rozwiązanie i sprawdzenie dziedziny',
                    'formula': r'x + 1 = 3x - 6 \longrightarrow -2x = -7 \longrightarrow x = 3{,}5',
                    'desc': 'Sprawdzasz dziedzinę: $x - 2 \\neq 0 \\longrightarrow x \\neq 2$. Ponieważ $3{,}5 \\in D$, jest to poprawne rozwiązanie.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Nawiasy', 'value': 'Zawsze zapisuj $3 \\cdot (x - 2) = 3x - 6$', 'color': C_PRIMARY},
                {'label': 'Dziedzina', 'value': 'Sprawdź czy wynik nie zeruje mianownika', 'color': C_DANGER},
                {'label': 'Typowe zadanie', 'value': 'Równanie z ułamkiem po obu stronach', 'color': C_SKY}
            ]
        }
        tab2 = make_step_flow_diagram(
            title="Mnożenie proporcji na krzyż krok po kroku",
            badge=r"\frac{2x - 1}{x + 3} = \frac{3}{2} \longrightarrow 2(2x - 1) = 3(x + 3) \longrightarrow x = 11",
            caption="Wypisz dziedzinę, pomnóż po przekątnych z nawiasami, zredukuj do równania liniowego i sprawdź wynik z dziedziną.",
            steps=[
                {'num': 1, 'title': 'Wyznacz dziedzinę mianownika', 'desc': r'$x + 3 \neq 0 \implies D = \mathbb{R} \setminus \{-3\}$.', 'color': C_DANGER},
                {'num': 2, 'title': 'Pomnóż na krzyż w nawiasach', 'desc': r'$2 \cdot (2x - 1) = 3 \cdot (x + 3) \implies 4x - 2 = 3x + 9$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Rozwiąż równanie i zweryfikuj', 'desc': r'$4x - 3x = 9 + 2 \implies x = 11$. Ponieważ $11 \neq -3$, rozwiązaniem jest $x = 11$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Mnożenie na krzyż', 'value': r'$2(2x - 1) = 3(x + 3)$', 'color': C_SKY},
                {'label': 'Redukcja liniowa', 'value': r'$x = 11$', 'color': C_PRIMARY},
                {'label': 'Weryfikacja z D', 'value': r'$11 \in D$ (poprawne)', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Brak nawiasów przy mnożeniu wielomianu przez liczbę",
            badge=r"3 \cdot (x + 3) = 3x + 9 \neq 3x + 3",
            caption="Gdy mnożysz na krzyż, całe wyrażenie w liczniku lub mianowniku musi znaleźć się w nawiasie! Uczniowie mnożą tylko pierwszy wyraz.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zapis $3 \cdot x + 3 = 3x + 3$ (brak dystrybucji na $+3$)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Wymnożenie całego nawiasu: $3(x + 3) = 3x + 9$', 'color': C_SUCCESS},
                {'label': 'Sprawdzenie dziedziny', 'value': 'Zawsze upewnij się, że mianownik nie jest zerem', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
