"""
topic_03.py - Dział 1.3: Wartość bezwzględna (3 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_03_visuals(l_idx):
    # l_idx: 0..2 (Lekcje 1..3)
    l_num = l_idx + 1

    if l_num == 1:
        # L1.3.1: Definicja geometryczna na osi liczbowej (odległość |x - a| = r)
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Definicja geometryczna wartości bezwzględnej: Odległość na osi',
            'formulaBadge': r'|x - a| = r \longrightarrow x = a - r \quad \text{lub} \quad x = a + r \quad (r \ge 0)',
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
                    'formula': r'|x + 3| = |x - (-3)| \longrightarrow a = -3',
                    'desc': 'Gdy wewnątrz modułu widzisz dodawanie, środek przedziału ma znak ujemny!',
                    'color': C_DANGER
                }
            ],
            'metrics': [
                {'label': 'Środek $a$', 'value': 'Punkt odniesienia ze zmienionym znakiem ($|x - 2| \\longrightarrow a = 2$)', 'color': C_SUCCESS},
                {'label': 'Promień $r$', 'value': 'Dopuszczalna odległość od środka ($r \\ge 0$)', 'color': C_SKY},
                {'label': 'Prawa strona ujemna', 'value': '$|x - a| = -3 \\longrightarrow$ sprzeczność (brak rozwiązań)', 'color': C_DANGER}
            ]
        }
        tab2 = make_step_flow_diagram(
            title="Odległość na osi: Równanie z wartością bezwzględną",
            badge=r"|x - 3| = 2 \longrightarrow x - 3 = 2 \quad \text{lub} \quad x - 3 = -2 \longrightarrow x = 5 \quad \text{lub} \quad x = 1",
            caption="Środek to a = 3. Promień to r = 2. Na osi liczbowej robisz krok o 2 w prawo (5) oraz krok o 2 w lewo (1).",
            steps=[
                {'num': 1, 'title': 'Wyznacz środek i promień', 'desc': 'Ze wzoru $|x - a| = r$: środek $a = 3$, promień $r = 2$.', 'color': C_SKY},
                {'num': 2, 'title': 'Krok w prawo (+2)', 'desc': 'Rozwiązanie po prawej: $x = 3 + 2 = 5$.', 'color': C_SUCCESS},
                {'num': 3, 'title': 'Krok w lewo (-2)', 'desc': 'Rozwiązanie po lewej: $x = 3 - 2 = 1$.', 'color': C_PRIMARY}
            ],
            metrics=[
                {'label': 'Środek symetrii', 'value': '$a = 3$', 'color': C_SKY},
                {'label': 'Odległość (promień)', 'value': '$r = 2$', 'color': C_PRIMARY},
                {'label': 'Zbiór rozwiązań', 'value': '$x \\in \\{1, 5\\}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Znak środka w wartości bezwzględnej",
            badge=r"|x + 4| = 3 \longrightarrow |x - (-4)| = 3 \longrightarrow a = -4 \quad (\neq +4)",
            caption="Gdy wewnątrz modułu jest dodawanie |x + 4|, środek przedziału leży w punkcie -4, a NIE w +4!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': 'Przyjęcie środka $a = +4$ (odwrócenie osi)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': '$|x + 4| = |x - (-4)| \\implies a = -4$', 'color': C_SUCCESS},
                {'label': 'Prawa strona ujemna', 'value': '$|x - 2| = -5 \\implies \\emptyset$ (moduł $\\ge 0$!)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L1.3.2: Nierówności z wartością bezwzględną i przedziały rozwiązań
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Nierówności z wartością bezwzględną: Klatka vs Skrzydła',
            'formulaBadge': r'\begin{aligned} |x - a| < r &\longrightarrow x \in (a - r,\; a + r) \\ |x - a| \ge r &\longrightarrow x \in (-\infty, a - r] \cup [a + r, +\infty) \end{aligned}',
            'caption': 'Znak mniejszości uwięzi cię wewnątrz jednego przedziału wokół środka. Znak większości wyrzuca cię na zewnątrz w dwa skrzydła ku nieskończonościom.',
            'cards': [
                {
                    'badge': 'Znak mniejszości (< lub ≤)',
                    'title': 'Wnętrze przedziału („Klatka”)''',
                    'formula': r'|x - 2| < 3 \longrightarrow x \in (-1,\; 5)',
                    'desc': 'Punkty leżą blisko środka $a = 2$. Zbiorem rozwiązań jest jeden spójny przedział ograniczony wartościami $2 - 3 = -1$ oraz $2 + 3 = 5$.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'Znak większości (> lub ≥)',
                    'title': 'Dwa skrzydła ku nieskończoności',
                    'formula': r'|x - 1| \ge 4 \longrightarrow x \in (-\infty, -3] \cup [5, +\infty)',
                    'desc': 'Punkty uciekają daleko od środka $a = 1$. Zbiorem rozwiązań jest suma dwóch przedziałów nieskończonych połączonych znakiem $\\cup$.',
                    'color': C_PRIMARY
                },
                {
                    'badge': 'PUŁAPKA CKE: Zero i liczby ujemne',
                    'title': 'Zawsze sprawdzaj sens geometryczny',
                    'formula': r'|x - 5| < 0 \longrightarrow \emptyset, \quad |x - 5| \ge 0 \longrightarrow \mathbb{R}',
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
        tab2 = make_step_flow_diagram(
            title="Nierówność z modułem: Klatka spójnego przedziału",
            badge=r"|x - 2| < 3 \longrightarrow -3 < x - 2 < 3 \longrightarrow -1 < x < 5 \longrightarrow x \in (-1,\; 5)",
            caption="Znak mniejszości oznacza, że punkty leżą w odległości mniejszej niż 3 od środka 2. Otrzymujesz spójny przedział wokół środka.",
            steps=[
                {'num': 1, 'title': 'Zapisz podwójną nierówność', 'desc': 'Rozpisujesz klamrę: $-3 < x - 2 < 3$.', 'color': C_SKY},
                {'num': 2, 'title': 'Dodaj 2 do wszystkich stron', 'desc': '$-3 + 2 < x < 3 + 2 \\implies -1 < x < 5$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zapisz przedział', 'desc': 'Przedział otwarty: $x \\in (-1, 5)$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Lewy brzeg', 'value': '$2 - 3 = -1$', 'color': C_SKY},
                {'label': 'Prawy brzeg', 'value': '$2 + 3 = 5$', 'color': C_PRIMARY},
                {'label': 'Przedział CKE', 'value': '$(-1, 5)$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mniejszość (Klatka) vs Większość (Dwa Skrzydła)",
            badge=r"|x - a| < r: (a-r,\; a+r), \quad |x - a| \ge r: (-\infty, a-r] \cup [a+r, +\infty)",
            caption="Nigdy nie łącz skrzydeł spójnym przedziałem! Znak większości zawsze wyrzuca na zewnątrz ku nieskończonościom z symbolem sumy.",
            metrics=[
                {'label': 'Znak $<$ (Mniejszość)', 'value': 'Jeden przedział wokół środka: $(a-r, a+r)$', 'color': C_SUCCESS},
                {'label': 'Znak $\\ge$ (Większość)', 'value': 'Dwa rozłączne skrzydła z symbolem $\\cup$', 'color': C_PRIMARY},
                {'label': 'Sprzeczność modułu', 'value': '$|x - 1| < -2 \\implies \\emptyset$ (moduł $\\ge 0$!)', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

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
                    'formula': r'\sqrt{a^2} = |a| \longrightarrow \sqrt{(-4)^2} = |-4| = 4',
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
                    'desc': 'Zwijasz trójmian do kwadratu różnicy, zamieniasz na wartość bezwzględną i dopiero sprawdzasz założenie (np. $x < 3 \\longrightarrow 3 - x$).',
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
        tab2 = make_step_flow_diagram(
            title="Opuszczanie modułu z pierwiastkiem: Szacowanie wnętrza",
            badge=r"|\sqrt{3} - 2| = -(\sqrt{3} - 2) = 2 - \sqrt{3} \approx 2 - 1{,}73 = 0{,}27 > 0",
            caption="KROK 1: Oszacuj wartość pod modułem. Ponieważ 1,73 - 2 < 0, wnętrze jest ujemne. KROK 2: Zdejmij kreski ze zmianą znaku!",
            steps=[
                {'num': 1, 'title': 'Szacujesz wartość pierwiastka', 'desc': '$\\sqrt{3} \\approx 1{,}73 < 2$.', 'color': C_SKY},
                {'num': 2, 'title': 'Określasz znak wnętrza', 'desc': '$\\sqrt{3} - 2 < 0$ (liczba ujemna).', 'color': C_DANGER},
                {'num': 3, 'title': 'Odwracasz kolejność odejmowania', 'desc': '$|\\sqrt{3} - 2| = 2 - \\sqrt{3} > 0$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Szacowanie', 'value': '$\\sqrt{3} \\approx 1{,}73$', 'color': C_SKY},
                {'label': 'Znak wnętrza', 'value': 'Ujemny ($< 0$)', 'color': C_DANGER},
                {'label': 'Wynik dodatni', 'value': '$2 - \\sqrt{3} > 0$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zdjęcie modułu bez zmiany znaków",
            badge=r"\sqrt{(1 - \sqrt{2})^2} = |1 - \sqrt{2}| = \sqrt{2} - 1 \quad \neq 1 - \sqrt{2}",
            caption="Pierwiastek parzystego stopnia NIGDY nie daje liczby ujemnej! Odruchowe skreślenie pierwiastka z potęgą to gwarantowane 0 pkt.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': '$\\sqrt{(1-\\sqrt{2})^2} = 1 - \\sqrt{2} < 0$ (0 pkt!)', 'color': C_DANGER},
                {'label': 'POPRAWNY WYNIK CKE', 'value': '$|1 - \\sqrt{2}| = \\sqrt{2} - 1 > 0$', 'color': C_SUCCESS},
                {'label': 'Żelazna tożsamość', 'value': '$\\sqrt{a^2} = |a|$ (zawsze z modułem!)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
