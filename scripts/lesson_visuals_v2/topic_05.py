"""
topic_05.py - Dział 1.5: Nierówności liniowe (3 lekcje | Tier S+)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_step_flow_diagram, make_comparison_card_diagram
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
                    'formula': r'3x - 5x \le 4 + 6 \longrightarrow -2x \le 10',
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
        tab2 = make_step_flow_diagram(
            title="Rozwiązywanie nierówności krok po kroku",
            badge=r"3x - 5(x + 2) \ge 4 \longrightarrow -2x \ge 14 \xrightarrow{:(-2)} x \le -7",
            caption="Dzielisz obie strony przez liczbę ujemną (-2), więc natychmiast odwracasz zwrot z ≥ na ≤!",
            steps=[
                {'num': 1, 'title': 'Wymnóż nawias', 'desc': '$3x - 5x - 10 \\ge 4 \\implies -2x - 10 \\ge 4$.', 'color': C_SKY},
                {'num': 2, 'title': 'Przenieś stałą na prawo', 'desc': '$-2x \\ge 4 + 10 \\implies -2x \\ge 14$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Podziel przez (-2) i obróć zwrot', 'desc': '$x \\le -7 \\implies x \\in (-\\infty, -7]$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Redukcja', 'value': '$-2x \\ge 14$', 'color': C_SKY},
                {'label': 'Dzielnik ujemny', 'value': 'Dzielenie przez $-2$', 'color': C_DANGER},
                {'label': 'Zwrot po obrocie', 'value': '$x \\le -7$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Brak odwrócenia zwrotu przy dzieleniu przez minus",
            badge=r"-2x \le 6 \quad \xrightarrow{:\; (-2)} \quad x \ge -3 \quad \neq x \le -3",
            caption="Mnożenie lub dzielenie przez liczbę ujemną ZAWSZE odwraca dzióbek nierówności! Sprawdź: 0 spełnia x ≥ -3 i daje -2(0) ≤ 6 (prawda).",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': 'Zostawienie starego znaku $\\le$ (0 pkt)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': 'Zwrot obraca się: $\\le \\longrightarrow \\ge$', 'color': C_SUCCESS},
                {'label': 'Dzielenie przez plus', 'value': 'Zwrot pozostaje bez zmian', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L1.5.2: Zaznaczanie rozwiązań na osi liczbowej i zapis przedziałowy
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Ilustracja na osi liczbowej: Kółka, zwroty i nawiasy',
            'formulaBadge': r'x \in (-\infty,\; a) \quad \text{vs} \quad x \in [a,\; +\infty)',
            'caption': 'Kreska pod znakiem ($\\le, \\ge$) oznacza kółko zamalowane i nawias domknięty. Znak ostry ($<, >$) oznacza kółko otwarte i nawias okrągły.',
            'cards': [
                {
                    'badge': 'Ostre: < oraz >',
                    'title': 'Kółko otwarte ○, nawias okrągły ( )',
                    'formula': r'x > 3 \longrightarrow x \in (3,\; +\infty)',
                    'desc': 'Liczba $3$ NIE należy do zbioru rozwiązań. Na osi rysujemy niezamalowane kółko w punkcie $3$.',
                    'color': C_SKY
                },
                {
                    'badge': 'Słabe: ≤ oraz ≥',
                    'title': 'Kółko zamalowane ●, nawias domknięty [ ]',
                    'formula': r'x \le -2 \longrightarrow x \in (-\infty,\; -2]',
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
        tab2 = make_step_flow_diagram(
            title="Matryca CKE: Zapis przedziałów i kółka na osi",
            badge=r"x \le -2: (-\infty,\; -2], \quad x > 3: (3,\; +\infty)",
            caption="Kreska pod znakiem nierówności (≤, ≥) to kółko zamalowane i nawias ostry [. Znak ostry (<, >) to kółko otwarte i nawias okrągły (.",
            steps=[
                {'num': 1, 'title': 'Zamalowane kółko (≤, ≥)', 'desc': 'Nawias domknięty: $\\langle$ lub $\\rangle$ (lub $[ ]$). Liczba brzegowa NALEŻY do rozwiązań.', 'color': C_SUCCESS},
                {'num': 2, 'title': 'Otwarte kółko (<, >)', 'desc': 'Nawias okrągły: $($ lub $)$. Liczba brzegowa NIE NALEŻY do rozwiązań.', 'color': C_SKY},
                {'num': 3, 'title': 'Nieskończoność (±∞)', 'desc': 'Zawsze nawias otwarty okrągły: $(-\\infty$ lub $+\\infty)$.', 'color': C_PRIMARY}
            ],
            metrics=[
                {'label': 'Znak z kreską', 'value': 'Kółko ●, nawias $[ ]$', 'color': C_SUCCESS},
                {'label': 'Znak ostry', 'value': 'Kółko ○, nawias $( )$', 'color': C_SKY},
                {'label': 'Nieskończoność', 'value': 'Zawsze $( )$', 'color': C_PRIMARY}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Domknięcie przy nieskończoności",
            badge=r"x \in [a,\; +\infty) \quad \neq [a,\; +\infty]",
            caption="Nieskończoność nie jest liczbą rzeczywistą, lecz symbolem dążenia. Zawsze zamykaj ją nawiasem okrągłym!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': 'Domykanie nawiasu kwadratowego przy $\\pm\\infty$', 'color': C_DANGER},
                {'label': 'POPRAWNY ZAPIS CKE', 'value': '$(-\\infty, a]$ oraz $[a, +\\infty)$', 'color': C_SUCCESS},
                {'label': 'Kółko otwarte', 'value': 'Dla $x > a$ nawias to $(a, +\\infty)$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L1.5.3: Układy nierówności liniowych i wyznaczanie liczb całkowitych
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Układ nierówności liniowych: Część wspólna i liczby całkowite',
            'formulaBadge': r'\begin{cases} x \ge -1 \\ x < 4 \end{cases} \longrightarrow x \in [-1,\; 4)',
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
                    'formula': r'x \in \{-1,\; 0,\; 1,\; 2,\; 3\} \longrightarrow 5 \text{ liczb}',
                    'desc': 'Punkt $-1$ należy (zamknięty), a punkt $4$ NIE należy (otwarty). Łącznie jest dokładnie $5$ liczb całkowitych.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'PUŁAPKA CKE: Układ sprzeczny',
                    'title': 'Brak części wspólnej',
                    'formula': r'x < -2 \quad \text{i} \quad x > 3 \longrightarrow \emptyset',
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
        tab2 = make_step_flow_diagram(
            title="Układ nierówności: Część wspólna i zliczanie liczb całkowitych",
            badge=r"\begin{cases} x > -2 \\ x \le 3 \end{cases} \longrightarrow x \in (-2,\; 3] \longrightarrow \{-1, 0, 1, 2, 3\} \text{ (5 liczb całkowitych)}",
            caption="Część wspólna daszków daje przedział (-2, 3]. Liczba -2 nie należy (otwarte), ale 3 należy (zamknięte). Zliczasz dokładnie 5 liczb całkowitych.",
            steps=[
                {'num': 1, 'title': 'Wyznacz przedział wspólny', 'desc': '$x > -2$ oraz $x \\le 3 \\implies x \\in (-2, 3]$.', 'color': C_SKY},
                {'num': 2, 'title': 'Zweryfikuj brzegi przedziału', 'desc': 'Liczba $-2 \\notin (-2, 3]$, ale liczba $3 \\in (-2, 3]$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wypisz liczby całkowite', 'desc': 'Zbiór: $\\{-1, 0, 1, 2, 3\\}$ $\\implies$ dokładnie 5 liczb całkowitych.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Przedział wspólny', 'value': '$(-2, 3]$', 'color': C_SKY},
                {'label': 'Liczby całkowite', 'value': '$\\{-1, 0, 1, 2, 3\\}$', 'color': C_PRIMARY},
                {'label': 'Liczba rozwiązań', 'value': 'Dokładnie 5', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zaliczenie kółka otwartego do liczb całkowitych",
            badge=r"-2 \notin (-2,\; 3] \quad \text{oraz} \quad 3 \in (-2,\; 3]",
            caption="Nie wliczaj brzegu z kółkiem otwartym! W przedziale (-2, 3] najmniejszą liczbą całkowitą jest -1, a nie -2.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': 'Wliczenie $-2$ (podanie 6 liczb całkowitych)', 'color': C_DANGER},
                {'label': 'POPRAWNY WYNIK CKE', 'value': 'Dokładnie 5 liczb całkowitych', 'color': C_SUCCESS},
                {'label': 'Najmniejsza całkowita', 'value': 'Liczba $-1$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
