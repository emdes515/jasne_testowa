"""
topic_10_builder.py - Dział 1.10: Funkcja liniowa i jej własności (4 lekcje | Tier S+)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_10 import get_topic_10_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_10():
    topic_id = 'dzial-10'
    topic_title = 'Funkcja liniowa i jej własności'
    topic_number = 10
    lessons = []

    # ----------------------------------------------------
    # Lekcja 10.1: Wzór kierunkowy y = ax + b, rola a i b (L1.10.1)
    # ----------------------------------------------------
    v1 = get_topic_10_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-10-1-1',
            source='Rozgrzewka • Wyraz wolny b na osi OY',
            question='Wykres funkcji liniowej $f(x) = -3x + 7$ przecina oś pionową $OY$ w punkcie',
            options_data=[
                ('A', '$(0, 7)$'),
                ('B', '$(7, 0)$'),
                ('C', '$(0, -3)$'),
                ('D', '$(-3, 7)$')
            ],
            correct_id='A',
            explanation='Wyraz wolny $b = 7$ to dokładnie rzędna punktu przecięcia wykresu z osią $OY$: $P = (0, b) = (0, 7)$.',
            cke_trap='Punkt na osi OY ma pierwszą współrzędną równą 0: $(0, 7)$, a nie $(7, 0)$!',
            plot={
                'type': 'LINEAR',
                'xRange': [-2, 5],
                'yRange': [-2, 9],
                'gridStep': 1,
                'lines': [
                    {'slope': -3, 'intercept': 7, 'color': '#38BDF8', 'label': 'f(x) = -3x + 7'}
                ],
                'points': [
                    {'x': 0, 'y': 7, 'label': 'P(0, 7) = (0, b)', 'dot': 'filled', 'color': '#10B981', 'attach': 'e'},
                    {'x': 2.333, 'y': 0, 'label': 'x₀ = 7/3', 'dot': 'filled', 'color': '#FFB800', 'attach': 'sw'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-10-1-2',
            source='Matura maj 2024 • Zad. 12',
            question='Funkcja liniowa $f$ jest określona wzorem $f(x) = (-2k + 3)x + k - 1$, gdzie $k \\in \\mathbb{R}$.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFunkcja $f$ jest malejąca dla każdej liczby $k$ należącej do przedziału',
            options_data=[
                ('A', '$(-\\infty, 1)$'),
                ('B', '$(-\\infty, -\\frac{3}{2})$'),
                ('C', '$(1, +\\infty)$'),
                ('D', '$(\\frac{3}{2}, +\\infty)$')
            ],
            correct_id='D',
            explanation='Funkcja liniowa $f(x) = ax + b$ jest malejąca wtedy i tylko wtedy, gdy współczynnik kierunkowy $a$ jest ujemny ($a < 0$).\nWspółczynnik kierunkowy to $a = -2k + 3$. Układamy nierówność:\n$$-2k + 3 < 0$$\n$$-2k < -3$$\nDzielimy obie strony przez $-2$, pamiętając o zmianie zwrotu nierówności:\n$$k > \\frac{-3}{-2} \\implies k > \\frac{3}{2}$$\nZatem funkcja $f$ jest malejąca dla każdej liczby $k \\in \\left(\\frac{3}{2}, +\\infty\\right)$.',
            cke_trap='O monotoniczności decyduje wyłącznie współczynnik $a = -2k + 3$ stojący przy $x$ (wyraz wolny $k - 1$ nie ma wpływu na to, czy funkcja rośnie czy maleje). Pamiętaj też o odwróceniu zwrotu nierówności przy dzieleniu przez $-2$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-3, 4],
                'yRange': [-3, 4],
                'gridStep': 1,
                'lines': [
                    {'slope': -1.2, 'intercept': 1, 'color': '#38BDF8', 'label': 'a < 0 (funkcja malejąca)'}
                ],
                'points': [
                    {'x': 0, 'y': 1, 'label': '(0, b)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-10-1-3',
            source='Pułapka CKE • Odczyt znaków a i b z wykresu',
            question='Prosta przecina dodatnią część osi $OY$ i opada w dół od lewej do prawej. Wynika z tego, że współczynniki $a$ i $b$ spełniają warunki:',
            options_data=[
                ('A', '$a < 0$ oraz $b > 0$'),
                ('B', '$a > 0$ oraz $b > 0$'),
                ('C', '$a < 0$ oraz $b < 0$'),
                ('D', '$a > 0$ oraz $b < 0$')
            ],
            correct_id='A',
            explanation='Prosta opada w dół $\\implies a < 0$ (funkcja malejąca). Prosta przecina oś $OY$ powyżej zera $\\implies b > 0$.',
            cke_trap='Wykres opadający to $a < 0$, a punkt przecięcia nad osią to $b > 0$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-3, 5],
                'yRange': [-2, 5],
                'gridStep': 1,
                'lines': [
                    {'slope': -0.75, 'intercept': 2, 'color': '#38BDF8', 'label': 'y = ax + b'}
                ],
                'points': [
                    {'x': 0, 'y': 2, 'label': '(0, b), b > 0', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'}
                ]
            }
        ),
        make_tf_task(
            task_id='task-10-1-4',
            source='Trening CKE • Funkcja liniowa stała',
            question='Oceń prawdziwość zdania: Jeśli współczynnik kierunkowy $a = 0$, to wykresem funkcji jest prosta równoległa do osi $OX$.',
            correct_tf='PRAWDA',
            explanation='Dla $a = 0$ funkcja przyjmuje postać $y = b$, czyli jest funkcją stałą, której wykresem jest pozioma linia równoległa do osi $OX$.',
            cke_trap='Dla a = 0 funkcja nie rośnie ani nie maleje — jest stała.',
            plot={
                'type': 'LINEAR',
                'xRange': [-4, 4],
                'yRange': [-1, 5],
                'gridStep': 1,
                'lines': [
                    {'slope': 0, 'intercept': 3, 'color': '#10B981', 'label': 'y = 3 (a = 0)'}
                ],
                'points': [
                    {'x': 0, 'y': 3, 'label': '(0, 3)', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'}
                ]
            }
        ),
        make_numeric_task(
            task_id='task-10-1-5',
            source='Utrwalenie • Wartość współczynnika b',
            question='Prosta $y = ax + b$ przechodzi przez punkt $P(0, -9)$. Podaj wartość wyrazu wolnego $b$.',
            correct_val=-9,
            explanation='Dla punktu $(0, -9)$ mamy $x = 0$, więc $y = a \\cdot 0 + b = b \\implies b = -9$.',
            cke_trap='Punkt o pierwszej współrzędnej równej 0 bezpośrednio zdradza wartość $b$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-3, 5],
                'yRange': [-11, 2],
                'gridStep': 2,
                'lines': [
                    {'slope': 2, 'intercept': -9, 'color': '#38BDF8', 'label': 'y = ax - 9'}
                ],
                'points': [
                    {'x': 0, 'y': -9, 'label': 'P(0, -9) ⟹ b = -9', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'}
                ]
            }
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-10-1',
        topic_id=topic_id,
        title='Wzór kierunkowy prostej, rola współczynnika kierunkowego i wyrazu wolnego',
        concept_essence='Wzór kierunkowy prostej $y = ax + b$ to jedno z najważniejszych narzędzi na maturze: 1) Współczynnik kierunkowy $a$ to bieg prostej (prędkościomierz): jeśli $a > 0$, prosta idzie w górę (rośnie); jeśli $a < 0$, prosta opada w dół (maleje); jeśli $a = 0$, leży poziomo (stała). Ponadto $a = \\operatorname{tg} \\alpha$, gdzie $\\alpha$ to kąt z dodatnią osią $OX$. 2) Wyraz wolny $b$ to kotwica na osi pionowej: prosta ZAWSZE przecina oś $OY$ dokładnie w punkcie $(0, b)$.',
        matura_context='Zadanie z interpretacji znaków $a$ i $b$ lub parametru $m$ występuje w 100% arkuszy CKE (zad. 11 za 1 pkt).',
        core_formulas=[
            {
                'title': 'Rola współczynnika kierunkowego a',
                'latex': 'a > 0 \\implies \\text{rosnąca}, \\quad a < 0 \\implies \\text{malejąca}, \\quad a = 0 \\implies \\text{stała}',
                'description': 'Znak liczby stojącej przy x określa monotoniczność.',
                'in_cke_sheet': True,
                'cke_page': 'str. 21',
                'example': 'y = -2x + 5 \\implies a = -2 < 0 \\implies \\text{funkcja maleje}',
                'mnemonic': 'Dodatni iks idzie w górę, ujemny iks leci w dół.',
                'matura_tip': 'Gdy a ma parametr, np. (2m - 4), rozwiązujesz nierówność 2m - 4 < 0.'
            },
            {
                'title': 'Wyraz wolny b na osi OY',
                'latex': 'P = (0, b) = \\text{punkt przecięcia z osią } OY',
                'description': 'Wartość b to wysokość przecięcia prostej z osią pionową.',
                'in_cke_sheet': True,
                'cke_page': 'str. 21',
                'example': 'y = 4x - 3 \\implies \\text{przecięcie w punkcie } (0, -3)',
                'mnemonic': 'b to baza na osi OY.',
                'matura_tip': 'W punkcie na osi OY pierwsza współrzędna x to zawsze 0.'
            }
        ],
        worked_example={
            'problem': 'Dla jakich wartości parametru $k$ funkcja $f(x) = (3 - k)x + 2k - 1$ jest rosnąca i przecina oś $OY$ powyżej punktu $(0, 5)$?',
            'steps': [
                {'num': 1, 'label': 'Warunek funkcji rosnącej', 'text': 'Współczynnik przy $x$ musi być dodatni: $a > 0 \\implies 3 - k > 0 \\implies k < 3$.'},
                {'num': 2, 'label': 'Warunek przecięcia osi OY powyżej 5', 'text': 'Wyraz wolny musi być większy od 5: $b > 5 \\implies 2k - 1 > 5 \\implies 2k > 6 \\implies k > 3$.'},
                {'num': 3, 'label': 'Część wspólna warunków i wniosek CKE', 'text': 'Mamy $k < 3$ oraz $k > 3$. Warunki te są sprzeczne, nie istnieje takie $k$ (zbiór pusty).'}
            ],
            'result': 'k \\in \\emptyset'
        },
        exam_trap='Typowy błąd: Uwzględnianie wyrazu wolnego $b$ przy określaniu monotoniczności.\n\nPoprawnie: O monotoniczności decyduje TYLKO współczynnik $a$. Wyraz $b$ przesuwa wykres w górę lub w dół, nie zmieniając jego nachylenia!',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 10.2: Wzór prostej przez 2 punkty i miejsce zerowe (L1.10.2)
    # ----------------------------------------------------
    v2 = get_topic_10_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-10-2-1',
            source='Rozgrzewka • Miejsce zerowe prostej',
            question='Miejscem zerowym funkcji liniowej $f(x) = 2x - 6$ jest liczba',
            options_data=[
                ('A', '$3$'),
                ('B', '$-3$'),
                ('C', '$-6$'),
                ('D', '$6$')
            ],
            correct_id='A',
            explanation='Przyrównujemy funkcję do zera: $2x - 6 = 0 \\implies 2x = 6 \\implies x = 3$.',
            cke_trap='Miejsce zerowe to $x = 3$, a punkt przecięcia z osią $OY$ to $(0, -6)$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-1, 5],
                'yRange': [-7, 3],
                'gridStep': 1,
                'lines': [
                    {'slope': 2, 'intercept': -6, 'color': '#38BDF8', 'label': 'f(x) = 2x - 6'}
                ],
                'points': [
                    {'x': 3, 'y': 0, 'label': 'x₀ = 3 (miejsce zerowe)', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'},
                    {'x': 0, 'y': -6, 'label': '(0, -6)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-10-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Współczynnik kierunkowy $a$ prostej przechodzącej przez punkty $A(1, 3)$ oraz $B(4, 9)$ jest równy',
            options_data=[
                ('A', '$2$'),
                ('B', '$\\frac{1}{2}$'),
                ('C', '$3$'),
                ('D', '$-2$')
            ],
            correct_id='A',
            explanation='Wzór na współczynnik kierunkowy: $a = \\frac{y_B - y_A}{x_B - x_A} = \\frac{9 - 3}{4 - 1} = \\frac{6}{3} = 2$.',
            cke_trap='Różnicę igreków stawiamy W LICZNIKU, a różnicę iksów w mianowniku: $\\frac{\\Delta y}{\\Delta x}$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-1, 6],
                'yRange': [-1, 11],
                'gridStep': 1,
                'lines': [
                    {'slope': 2, 'intercept': 1, 'color': '#38BDF8', 'label': 'y = 2x + 1'}
                ],
                'segments': [
                    {'from': [1, 3], 'to': [4, 3], 'color': 'rgba(255, 184, 0, 0.6)', 'strokeWidth': 1.5, 'dashed': True, 'label': 'Δx = 3'},
                    {'from': [4, 3], 'to': [4, 9], 'color': 'rgba(16, 185, 129, 0.6)', 'strokeWidth': 1.5, 'dashed': True, 'label': 'Δy = 6'}
                ],
                'points': [
                    {'x': 1, 'y': 3, 'label': 'A(1, 3)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'nw'},
                    {'x': 4, 'y': 9, 'label': 'B(4, 9)', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-10-2-3',
            source='Pułapka CKE • Odwrócenie kolejności we wzorze na a',
            question='Prosta przechodzi przez punkty $K(-2, 5)$ oraz $L(2, -3)$. Jej współczynnik kierunkowy wynosi',
            options_data=[
                ('A', '$-2$'),
                ('B', '$2$'),
                ('C', '$-\\frac{1}{2}$'),
                ('D', '$\\frac{1}{2}$')
            ],
            correct_id='A',
            explanation='$a = \\frac{-3 - 5}{2 - (-2)} = \\frac{-8}{2 + 2} = \\frac{-8}{4} = -2$.',
            cke_trap='Uważaj na podwójny minus w mianowniku: $2 - (-2) = 4$, a nie 0.',
            plot={
                'type': 'LINEAR',
                'xRange': [-4, 4],
                'yRange': [-5, 7],
                'gridStep': 1,
                'lines': [
                    {'slope': -2, 'intercept': 1, 'color': '#38BDF8', 'label': 'y = -2x + 1'}
                ],
                'points': [
                    {'x': -2, 'y': 5, 'label': 'K(-2, 5)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'},
                    {'x': 2, 'y': -3, 'label': 'L(2, -3)', 'dot': 'filled', 'color': '#10B981', 'attach': 'se'}
                ]
            }
        ),
        make_tf_task(
            task_id='task-10-2-4',
            source='Trening CKE • Wzór miejsca zerowego',
            question='Oceń prawdziwość zdania: Miejsce zerowe funkcji $y = ax + b$ dla $a \\ne 0$ wyraża się wzorem $x_0 = -\\frac{b}{a}$.',
            correct_tf='PRAWDA',
            explanation='$ax + b = 0 \\implies ax = -b \\implies x = -\\frac{b}{a}$. To oficjalny wzór z tablic CKE.',
            cke_trap='Pamiętaj o minusie przed ułamkiem: $x_0 = -b/a$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-3, 4],
                'yRange': [-3, 4],
                'gridStep': 1,
                'lines': [
                    {'slope': 1.5, 'intercept': -1.5, 'color': '#38BDF8', 'label': 'y = ax + b'}
                ],
                'points': [
                    {'x': 1, 'y': 0, 'label': 'x₀ = -b/a', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'},
                    {'x': 0, 'y': -1.5, 'label': '(0, b)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'}
                ]
            }
        ),
        make_numeric_task(
            task_id='task-10-2-5',
            source='Utrwalenie • Wyraz wolny b po wyznaczeniu a',
            question='Prosta o współczynniku kierunkowym $a = 3$ przechodzi przez punkt $P(2, 11)$. Oblicz wartość wyrazu wolnego $b$.',
            correct_val=5,
            explanation='Wstawiamy współrzędne do wzoru $y = ax + b$: $11 = 3 \\cdot 2 + b \\implies 11 = 6 + b \\implies b = 5$.',
            cke_trap='Podstawiasz $x = 2$ oraz $y = 11$, a nie odwrotnie!',
            plot={
                'type': 'LINEAR',
                'xRange': [-1, 4],
                'yRange': [2, 13],
                'gridStep': 2,
                'lines': [
                    {'slope': 3, 'intercept': 5, 'color': '#38BDF8', 'label': 'y = 3x + 5'}
                ],
                'points': [
                    {'x': 2, 'y': 11, 'label': 'P(2, 11)', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'},
                    {'x': 0, 'y': 5, 'label': '(0, 5)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'}
                ]
            }
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-10-2',
        topic_id=topic_id,
        title='Wyznaczanie wzoru prostej przez dwa punkty i miejsce zerowe',
        concept_essence='Mając dwa punkty $A(x_A, y_A)$ oraz $B(x_B, y_B)$, wyznaczasz wzór prostej $y = ax + b$ w dwóch prostych krokach: 1) KROK 1: Obliczasz współczynnik kierunkowy jako iloraz przyrostów: $a = \\frac{y_B - y_A}{x_B - x_A}$ (pamiętaj: igreki na górze, iksy na dole!). 2) KROK 2: Wstawiasz obliczone $a$ oraz współrzędne jednego z punktów do wzoru $y = ax + b$ i wyliczasz $b$. 3) Miejsce zerowe to $x_0 = -\\frac{b}{a}$ (punkt, gdzie linia przecina oś poziomą).',
        matura_context='Podstawowa umiejętność w zadaniach za 1 i 2 punkty z geometrii analitycznej i algebry.',
        core_formulas=[
            {
                'title': 'Współczynnik kierunkowy prostej przez dwa punkty',
                'latex': 'a = \\frac{y_B - y_A}{x_B - x_A} \\quad (x_A \\neq x_B)',
                'description': 'Iloraz różnicy współrzędnych y do różnicy współrzędnych x.',
                'in_cke_sheet': True,
                'cke_page': 'str. 22',
                'example': 'A(1, 2), B(3, 8) \\implies a = \\frac{8 - 2}{3 - 1} = \\frac{6}{2} = 3',
                'mnemonic': 'Igreki na dachu, iksy w piwnicy.',
                'matura_tip': 'Zachowaj tę samą kolejność odejmowania w liczniku i mianowniku.'
            },
            {
                'title': 'Miejsce zerowe funkcji liniowej',
                'latex': 'x_0 = -\\frac{b}{a} \\quad (a \\neq 0)',
                'description': 'Punkt na osi OX, gdzie prosta przecina oś.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'y = 3x - 12 \\implies x_0 = -\\frac{-12}{3} = 4',
                'mnemonic': 'Przyrównaj igrek do zera i wyznacz iksa.',
                'matura_tip': 'Dwa minusy dają plus.'
            }
        ],
        worked_example={
            'problem': 'Napisz równanie prostej przechodzącej przez punkty $A(2, -1)$ oraz $B(5, 8)$ i wyznacz jej miejsce zerowe.',
            'steps': [
                {'num': 1, 'label': 'Obliczenie współczynnika a', 'text': '$a = \\frac{8 - (-1)}{5 - 2} = \\frac{8 + 1}{3} = \\frac{9}{3} = 3$.'},
                {'num': 2, 'label': 'Obliczenie wyrazu wolnego b', 'text': 'Wstawiamy punkt $B(5, 8)$: $8 = 3 \\cdot 5 + b \\implies 8 = 15 + b \\implies b = -7$. Równanie to $y = 3x - 7$.'},
                {'num': 3, 'label': 'Wyznaczenie miejsca zerowego i wynik CKE', 'text': '$3x - 7 = 0 \\implies 3x = 7 \\implies x_0 = \\frac{7}{3} = 2\\frac{1}{3}$.'}
            ],
            'result': 'y = 3x - 7, \\quad x_0 = \\frac{7}{3}'
        },
        exam_trap='Typowy błąd CKE: Odwrócenie licznika i mianownika we wzorze na współczynnik kierunkowy ($a = \\frac{x_B - x_A}{y_B - y_A}$).\\n\\nZasada Core-4: Zapamiętaj mnemonik "Igreki na dachu, iksy w piwnicy". Współrzędne pionowe $y$ są zawsze na górze w liczniku.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 10.3: Warunek równoległości i prostopadłości (L1.10.3)
    # ----------------------------------------------------
    v3 = get_topic_10_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-10-3-1',
            source='Matura Maj 2023 • Zad. 16',
            question='Prosta $k$ o równaniu $y = (2m - 1)x + 4$ jest równoległa do prostej $l$ o równaniu $y = 5x - 2$, gdy',
            options_data=[
                ('A', '$m = 3$'),
                ('B', '$m = 2$'),
                ('C', '$m = -2$'),
                ('D', '$m = \\frac{1}{2}$')
            ],
            correct_id='A',
            explanation='Proste są równoległe, gdy ich współczynniki kierunkowe są równe: $a_1 = a_2$. Mamy $2m - 1 = 5 \\implies 2m = 6 \\implies m = 3$.',
            cke_trap='Warunek równoległości to $a_1 = a_2$. Nie przyrównuj wyrazów wolnych $b$!',
            plot={
                'type': 'LINEAR',
                'xRange': [-3, 3],
                'yRange': [-5, 8],
                'gridStep': 1,
                'lines': [
                    {'slope': 5, 'intercept': 4, 'color': '#38BDF8', 'label': 'k: y = 5x + 4'},
                    {'slope': 5, 'intercept': -2, 'color': '#FFB800', 'label': 'l: y = 5x - 2'}
                ],
                'points': [
                    {'x': 0, 'y': 4, 'label': '(0, 4)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'w'},
                    {'x': 0, 'y': -2, 'label': '(0, -2)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-10-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Prosta przechodząca przez punkt $P(0, 3)$ i prostopadła do prostej $y = -\\frac{2}{3}x + 1$ ma równanie',
            options_data=[
                ('A', '$y = \\frac{3}{2}x + 3$'),
                ('B', '$y = -\\frac{3}{2}x + 3$'),
                ('C', '$y = \\frac{2}{3}x + 3$'),
                ('D', '$y = -\\frac{2}{3}x + 3$')
            ],
            correct_id='A',
            explanation='Współczynnik prostopadłej to liczba odwrotna i przeciwna: $a_2 = -\\frac{1}{-\\frac{2}{3}} = \\frac{3}{2}$. Skoro przechodzi przez $(0, 3)$, wyraz wolny to $b = 3$. Równanie: $y = \\frac{3}{2}x + 3$.',
            cke_trap='Pamiętaj o OBU zmianach: zmień znak na plus ORAZ odwróć ułamek na $\\frac{3}{2}$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-4, 4],
                'yRange': [-2, 6],
                'gridStep': 1,
                'lines': [
                    {'slope': -0.667, 'intercept': 1, 'color': '#38BDF8', 'label': 'k: y = -2/3 x + 1'},
                    {'slope': 1.5, 'intercept': 3, 'color': '#FFB800', 'label': 'l: y = 3/2 x + 3 (k ⊥ l)'}
                ],
                'points': [
                    {'x': 0, 'y': 3, 'label': 'P(0, 3)', 'dot': 'filled', 'color': '#10B981', 'attach': 'e'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-10-3-3',
            source='Pułapka CKE • Prosta prostopadła do osi',
            question='Prosta prostopadła do prostej o równaniu $y = -4$ to prosta o równaniu',
            options_data=[
                ('A', '$x = 2$ (prosta pionowa)'),
                ('B', '$y = 4$'),
                ('C', '$y = \\frac{1}{4}x$'),
                ('D', '$y = 0$')
            ],
            correct_id='A',
            explanation='Prosta $y = -4$ jest pozioma (równoległa do osi $OX$). Prosta do niej prostopadła musi być pionowa, czyli mieć równanie postaci $x = c$.',
            cke_trap='Dla prostej poziomej $a = 0$, więc wzór $a_1 \\cdot a_2 = -1$ nie ma zastosowania (dzielenie przez 0). Prostopadła to prosta pionowa $x = c$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-2, 6],
                'yRange': [-6, 1],
                'gridStep': 1,
                'horizontalLines': [
                    {'y': -4, 'color': '#38BDF8'}
                ],
                'segments': [
                    {'from': [2, -6], 'to': [2, 1], 'color': '#FFB800', 'weight': 2.5}
                ],
                'points': [
                    {'x': 2, 'y': -4, 'label': '(2, -4) [90°]', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'}
                ]
            }
        ),
        make_tf_task(
            task_id='task-10-3-4',
            source='Trening CKE • Iloczyn współczynników',
            question='Oceń prawdziwość zdania: Jeśli dwie proste są prostopadłe i żadna z nich nie jest pionowa, to iloczyn ich współczynników kierunkowych jest równy $-1$.',
            correct_tf='PRAWDA',
            explanation='To podstawowy warunek prostopadłości z karty wzorów CKE: $a_1 \\cdot a_2 = -1$.',
            cke_trap='Wyjątkiem są proste pionowa i pozioma, dla których $a$ prostej pionowej nie istnieje.',
            plot={
                'type': 'LINEAR',
                'xRange': [-4, 4],
                'yRange': [-3, 5],
                'gridStep': 1,
                'lines': [
                    {'slope': 2, 'intercept': 1, 'color': '#38BDF8', 'label': 'k: y = 2x + 1 (a₁ = 2)'},
                    {'slope': -0.5, 'intercept': 3.5, 'color': '#FFB800', 'label': 'l: y = -0.5x + 3.5 (a₂ = -0.5)'}
                ],
                'points': [
                    {'x': 1, 'y': 3, 'label': 'P(1, 3) [90°: a₁·a₂ = -1]', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'}
                ]
            }
        ),
        make_numeric_task(
            task_id='task-10-3-5',
            source='Utrwalenie • Wyznaczanie współczynnika',
            question='Wyznacz współczynnik kierunkowy prostej prostopadłej do prostej $y = 0{,}25x - 8$.',
            correct_val=-4,
            explanation='$0{,}25 = \\frac{1}{4}$. Odwrotny i o przeciwnym znaku to $-\\frac{4}{1} = -4$.',
            cke_trap='Zamień ułamek dziesiętny na zwykły: $0{,}25 = \\frac{1}{4}$, wtedy łatwo go odwrócić.',
            plot={
                'type': 'LINEAR',
                'xRange': [-3, 3],
                'yRange': [-3, 3],
                'gridStep': 1,
                'lines': [
                    {'slope': 0.25, 'intercept': 0, 'color': '#38BDF8', 'label': 'k: a₁ = 1/4'},
                    {'slope': -4, 'intercept': 0, 'color': '#FFB800', 'label': 'l: a₂ = -4 (k ⊥ l)'}
                ],
                'points': [
                    {'x': 0, 'y': 0, 'label': '(0, 0)', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'}
                ]
            }
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-10-3',
        topic_id=topic_id,
        title='Warunek równoległości i prostopadłości prostych',
        concept_essence='Wzajemne położenie dwóch prostych na płaszczyźnie zależy wyłącznie od ich współczynników kierunkowych $a_1$ oraz $a_2$: 1) Proste równoległe — mają ten sam kąt nachylenia, więc ich współczynniki są IDENTYCZNE: $a_1 = a_2$. 2) Proste prostopadłe — przecinają się pod kątem $90^\\circ$, a ich iloczyn wynosi minus jeden: $a_1 \\cdot a_2 = -1$. Mnemotechnika: współczynnik prostej prostopadłej to ułamek ODWROTNY I PRZECIWNY (odwracasz do góry nogami i zmieniasz znak).',
        matura_context='Jeden z najczęściej badanych pewniaków maturalnych — zadanie za 1 pkt lub element zadania z geometrii analitycznej za 2–3 pkt.',
        core_formulas=[
            {
                'title': 'Warunek równoległości prostych',
                'latex': 'k \\parallel l \\implies a_1 = a_2',
                'description': 'Współczynniki kierunkowe są identyczne.',
                'in_cke_sheet': True,
                'cke_page': 'str. 21',
                'example': 'y = 4x + 1 \\parallel y = 4x - 9',
                'mnemonic': 'Równoległe to równe.',
                'matura_tip': 'Wyrazy wolne b mogą być dowolne (b₁ != b₂ dla prostych różnych).'
            },
            {
                'title': 'Warunek prostopadłości prostych',
                'latex': 'k \\perp l \\implies a_1 \\cdot a_2 = -1',
                'description': 'Współczynnik jest odwrotny i o przeciwnym znaku.',
                'in_cke_sheet': True,
                'cke_page': 'str. 22',
                'example': 'a_1 = \\frac{2}{5} \\implies a_2 = -\\frac{5}{2} = -2{,}5',
                'mnemonic': 'Do góry nogami i zmień znak.',
                'matura_tip': 'Dla liczby ujemnej przeciwna jest dodatnia: -3 -> +1/3.'
            }
        ],
        worked_example={
            'problem': 'Wyznacz równanie prostej prostopadłej do prostej $k: y = -2x + 7$ i przechodzącej przez punkt $A(6, 1)$.',
            'steps': [
                {'num': 1, 'label': 'Współczynnik prostej prostopadłej', 'text': 'Współczynnik prostej $k$ to $a_1 = -2$. Odwrotny i przeciwny: $a_2 = -\\frac{1}{-2} = \\frac{1}{2}$.'},
                {'num': 2, 'label': 'Wyznaczenie wyrazu wolnego b', 'text': 'Wstawiamy punkt $A(6, 1)$ do równania $y = \\frac{1}{2}x + b$: $1 = \\frac{1}{2} \\cdot 6 + b \\implies 1 = 3 + b \\implies b = -2$.'},
                {'num': 3, 'label': 'Zapisanie równania prostej CKE', 'text': 'Szukana prosta ma równanie $y = \\frac{1}{2}x - 2$.'}
            ],
            'result': 'y = \\frac{1}{2}x - 2'
        },
        exam_trap='Typowy błąd: Zmiana tylko znaku lub tylko odwrócenie ułamka, np. dla $a = 3$ przyjęcie $a_2 = -3$ atau $a_2 = \\frac{1}{3}$.\n\nPoprawnie: Musisz wykonać OBIE operacje naraz: dla $3$ poprawny współczynnik to $-\\frac{1}{3}$.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    # ----------------------------------------------------
    # Lekcja 10.4: Zastosowania praktyczne i zadania tekstowe (L1.10.4)
    # ----------------------------------------------------
    v4 = get_topic_10_visuals(3)
    l4_tasks = [
        make_sc_task(
            task_id='task-10-4-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Koszt przejazdu taksówką składa się z opłaty początkowej 8 zł oraz stawki 3 zł za każdy przejechany kilometr. Funkcja opisująca koszt przejazdu $K$ w zależności od liczby kilometrów $x$ ma wzór',
            options_data=[
                ('A', '$K(x) = 3x + 8$'),
                ('B', '$K(x) = 8x + 3$'),
                ('C', '$K(x) = 11x$'),
                ('D', '$K(x) = 3x - 8$')
            ],
            correct_id='A',
            explanation='Opłata początkowa to wyraz wolny $b = 8$. Koszt za kilometr to współczynnik kierunkowy $a = 3$. Zatem funkcja kosztu to $K(x) = 3x + 8$.',
            cke_trap='Stawka zmienna (za km) stoi przy iksie, a opłata stała jest wyrazem wolnym.',
            plot={
                'type': 'LINEAR',
                'xRange': [-1, 7],
                'yRange': [0, 28],
                'gridStep': 5,
                'lines': [
                    {'slope': 3, 'intercept': 8, 'color': '#38BDF8', 'label': 'K(x) = 3x + 8'}
                ],
                'points': [
                    {'x': 0, 'y': 8, 'label': 'Start (0, 8 zł)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'},
                    {'x': 4, 'y': 20, 'label': 'K(4) = 20 zł', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-10-4-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Zbiornik zawierał 120 litrów wody. Woda wypływa z niego ze stałą prędkością 5 litrów na minutę. Po ilu minutach zbiornik będzie całkowicie pusty?',
            options_data=[
                ('A', '24 minuty'),
                ('B', '20 minut'),
                ('C', '25 minut'),
                ('D', '12 minut')
            ],
            correct_id='A',
            explanation='Ilość wody w zbiorniku opisuje funkcja $V(t) = -5t + 120$. Pusty zbiornik oznacza $V(t) = 0 \\implies -5t + 120 = 0 \\implies 5t = 120 \\implies t = 24$.',
            cke_trap='Gdy ilość maleje, współczynnik kierunkowy jest ujemny ($-5$).',
            plot={
                'type': 'LINEAR',
                'xRange': [-2, 28],
                'yRange': [-10, 140],
                'gridStep': 20,
                'lines': [
                    {'slope': -5, 'intercept': 120, 'color': '#38BDF8', 'label': 'V(t) = -5t + 120'}
                ],
                'points': [
                    {'x': 0, 'y': 120, 'label': 'Start (120 l)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'},
                    {'x': 24, 'y': 0, 'label': 'Pusty: t = 24 min', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-10-4-3',
            source='Pułapka CKE • Odczyt wartości z modelu liniowego',
            question='Wartość maszyny spada liniowo wg wzoru $W(t) = -2500t + 30000$, gdzie $t$ to wiek w latach. Wartość maszyny po 4 latach wynosi',
            options_data=[
                ('A', '$20\\,000$ zł'),
                ('B', '$10\\,000$ zł'),
                ('C', '$22\\,500$ zł'),
                ('D', '$15\\,000$ zł')
            ],
            correct_id='A',
            explanation='$W(4) = -2500 \\cdot 4 + 30000 = -10000 + 30000 = 20000$ zł.',
            cke_trap='Pamiętaj o odjęciu spadku wartości od kwoty początkowej 30 000 zł.',
            plot={
                'type': 'LINEAR',
                'xRange': [-1, 10],
                'yRange': [0, 35000],
                'gridStep': 5000,
                'lines': [
                    {'slope': -2500, 'intercept': 30000, 'color': '#38BDF8', 'label': 'W(t)'}
                ],
                'points': [
                    {'x': 0, 'y': 30000, 'label': 'W(0) = 30 000 zł', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'},
                    {'x': 4, 'y': 20000, 'label': 'W(4) = 20 000 zł', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'}
                ]
            }
        ),
        make_tf_task(
            task_id='task-10-4-4',
            source='Trening CKE • Znak współczynnika kierunkowego',
            question='Oceń prawdziwość zdania: Jeśli poziom naładowania baterii telefonu w czasie intensywnego grania spada o stałą wartość co godzinę, to modelujący ten proces współczynnik kierunkowy $a$ jest ujemny.',
            correct_tf='PRAWDA',
            explanation='Spadek wielkości oznacza funkcję malejącą, dla której współczynnik kierunkowy $a$ jest ujemny ($a < 0$).',
            cke_trap='Spadek wielkości to zawsze minus przy zmiennej czasu.',
            plot={
                'type': 'LINEAR',
                'xRange': [-1, 7],
                'yRange': [-5, 110],
                'gridStep': 20,
                'lines': [
                    {'slope': -15, 'intercept': 100, 'color': '#F43F5E', 'label': 'B(t) = -15t + 100 (a < 0)'}
                ],
                'points': [
                    {'x': 0, 'y': 100, 'label': 'B(0) = 100%', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'},
                    {'x': 4, 'y': 40, 'label': 'B(4) = 40%', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'ne'}
                ]
            }
        ),
        make_numeric_task(
            task_id='task-10-4-5',
            source='Utrwalenie • Czas do zera',
            question='Świeca o początkowej długości 20 cm pali się ze stałą prędkością 2,5 cm na godzinę. Po ilu godzinach świeca spali się całkowicie?',
            correct_val=8,
            explanation='$L(t) = -2{,}5t + 20$. Świeca spala się całkowicie, gdy $L(t) = 0 \\implies 2{,}5t = 20 \\implies t = \\frac{20}{2{,}5} = 8$ godzin.',
            cke_trap='Dzielenie przez 2,5 to mnożenie przez $\\frac{4}{10}$, czyli $20 \\cdot 0{,}4 = 8$ lub $20 : \\frac{5}{2} = 20 \\cdot \\frac{2}{5} = 8$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-1, 10],
                'yRange': [-2, 24],
                'gridStep': 4,
                'lines': [
                    {'slope': -2.5, 'intercept': 20, 'color': '#38BDF8', 'label': 'L(t) = -2.5t + 20'}
                ],
                'points': [
                    {'x': 0, 'y': 20, 'label': 'L(0) = 20 cm', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'},
                    {'x': 8, 'y': 0, 'label': 'Spalona: t = 8 h', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'}
                ]
            }
        )
    ]
    l4 = make_lesson(
        lesson_id='lesson-10-4',
        topic_id=topic_id,
        title='Zastosowania praktyczne funkcji liniowej i zadania z kontekstem realistycznym',
        concept_essence='Funkcja liniowa $y = ax + b$ to podstawowy model ekonomii i fizyki: 1) Wyraz wolny $b$ to WARTOŚĆ STARTOWA (stan początkowy w chwili $t = 0$, opłata stała, abonament, koszt wstępny). 2) Współczynnik kierunkowy $a$ to TEMPO ZMIANY (stawka za kilometr, prędkość, ubytek wody na minutę). Jeśli coś przyrasta — $a > 0$; jeśli ubywa — $a < 0$. 3) Pytanie o wyczerpanie zapasów lub zatrzymanie to po prostu obliczenie MIEJSCA ZEROWEGO ($y = 0$).',
        matura_context='Zadania tekstowe i modelowanie matematyczne za 1–2 punkty w nowej formule matury 2023–2026.',
        core_formulas=[
            {
                'title': 'Liniowy model kosztu / wielkości',
                'latex': 'y = ax + b \\implies \\text{Wartość} = (\\text{tempo}) \\cdot x + (\\text{wartość startowa})',
                'description': 'Podstawowy model opisujący procesy o stałej dynamice zmian.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'K(x) = 3x + 10 \\implies \\text{opłata startowa 10 zł, 3 zł za sztukę}',
                'mnemonic': 'b to start, a to tempo.',
                'matura_tip': 'Gdy wielkość maleje, postaw minus przed współczynnikiem a.'
            },
            {
                'title': 'Czas do wyczerpania (miejsce zerowe)',
                'latex': 'y = 0 \\implies t = -\\frac{b}{a}',
                'description': 'Moment, w którym stan zasobu spada do zera.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'V(t) = -4t + 100 = 0 \\implies t = 25',
                'mnemonic': 'Koniec zapasów to zrównanie funkcji z zerem.',
                'matura_tip': 'Wynik czasu musi być dodatni.'
            }
        ],
        worked_example={
            'problem': 'Firma wynajmuje sprzęt budowlany. Kaucja zwrotna wynosi 200 zł, a koszt wynajmu to 45 zł za każdą rozpoczętą dobę. Zapisz wzór na całkowity koszt $K(d)$ po $d$ dobach i oblicz koszt wynajmu na 6 dób.',
            'steps': [
                {'num': 1, 'label': 'Zbudowanie modelu liniowego', 'text': 'Stawka dobowa to $a = 45$, opłata stała to $b = 200$. Wzór: $K(d) = 45d + 200$.'},
                {'num': 2, 'label': 'Obliczenie wartości dla d = 6', 'text': '$K(6) = 45 \\cdot 6 + 200 = 270 + 200 = 470$ zł.'},
                {'num': 3, 'label': 'Zapisanie odpowiedzi CKE', 'text': 'Wzór funkcji to $K(d) = 45d + 200$, a koszt na 6 dób wynosi 470 zł.'}
            ],
            'result': 'K(d) = 45d + 200, \\quad K(6) = 470 \\text{ zł}'
        },
        exam_trap='Typowy błąd: Zamiana stawek — przypisanie niewiadomej do opłaty stałej (np. $K(d) = 200d + 45$).\n\nPoprawnie: Niewiadoma $d$ stoi ZAWSZE przy stawce mnożonej przez liczbę jednostek (czyli przy 45 zł za dobę).',
        visuals=v4,
        tasks=l4_tasks
    )
    lessons.append(l4)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'order': topic_number,
        'tier': 'Tier S+',
        'badge': 'NA 30% • PEWNIAK MATURALNY',
        'estimated_time_formatted': '4 lekcje (~20 min)',
        'description': 'Wzór kierunkowy y = ax + b, wyznaczanie prostej przez dwa punkty, warunek równoległości i prostopadłości oraz zastosowania praktyczne funkcji liniowej.',
        'lessons': lessons
    }
