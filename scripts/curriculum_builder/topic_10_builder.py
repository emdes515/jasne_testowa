"""
topic_10_builder.py - Dział 1.10: Funkcja liniowa i jej własności (4 lekcje | Tier S+)
Żelazna matryca 5-Task: T1 Baza, T2 Pułapka CKE, T3 CKE 1:1, T4 Numeryczne, T5 Otwarte/Dowód z kryteriami.
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
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-10-1-1',
            source='Trening JASNE • Wzorzec CKE',
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
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-10-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Prosta przecina dodatnią część osi $OY$ i opada w dół od lewej do prawej. Wynika z tego, że współczynniki $a$ i $b$ spełniają warunki:',
            options_data=[
                ('A', '$a < 0$ oraz $b > 0$'),
                ('B', '$a > 0$ oraz $b > 0$'),
                ('C', '$a < 0$ oraz $b < 0$'),
                ('D', '$a > 0$ oraz $b < 0$')
            ],
            correct_id='A',
            explanation='Prosta opada w dół $\\longrightarrow a < 0$ (funkcja malejąca). Prosta przecina oś $OY$ powyżej zera $\\longrightarrow b > 0$.',
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
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-10-1-3',
            source='Matura maj 2024 • Zad. 12',
            question='Funkcja liniowa $f$ jest określona wzorem $f(x) = (-2k + 3)x + k - 1$, gdzie $k \\in \\mathbb{R}$.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFunkcja $f$ jest malejąca dla każdej liczby $k$ należącej do przedziału',
            options_data=[
                ('A', '$(-\\infty, 1)$'),
                ('B', '$(-\\infty, -\\frac{3}{2})$'),
                ('C', '$(1, +\\infty)$'),
                ('D', '$(\\frac{3}{2}, +\\infty)$')
            ],
            correct_id='D',
            explanation='Funkcja liniowa $f(x) = ax + b$ jest malejąca wtedy i tylko wtedy, gdy współczynnik kierunkowy $a$ jest ujemny ($a < 0$).\nWspółczynnik kierunkowy to $a = -2k + 3$. Układamy nierówność:\n$$-2k + 3 < 0$$\n$$-2k < -3$$\nDzielimy obie strony przez $-2$, pamiętając o bezwzględnej zmianie zwrotu nierówności:\n$$k > \\frac{-3}{-2} \\longrightarrow k > \\frac{3}{2}$$\nZatem funkcja $f$ jest malejąca dla każdej liczby $k \\in \\left(\\frac{3}{2}, +\\infty\\right)$.',
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
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-10-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Funkcja liniowa określona jest wzorem $f(x) = -\\frac{2}{3}x + 6$. Oblicz miejsce zerowe tej funkcji. Wpisz wynik w pole poniżej.',
            correct_val='9',
            explanation='Przyrównujemy wzór funkcji do zera:\n$$-\\frac{2}{3}x + 6 = 0$$\n$$-\\frac{2}{3}x = -6$$\nMnożymy obie strony przez $-\\frac{3}{2}$:\n$$x = -6 \\cdot \\left(-\\frac{3}{2}\\right) = \\frac{18}{2} = 9$$',
            cke_trap='Dwa minusy dają plus: miejsce zerowe to $9$, a nie $-9$.'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-10-1-5',
            source='Informator CKE • Zad. 35',
            question='Dla funkcji liniowej $f(x) = (2m - 4)x + m + 3$ wyznacz:\na) zbiór wszystkich wartości parametru $m$, dla których funkcja $f$ jest rosnąca,\nb) wartość parametru $m$, dla której wykres funkcji przecina oś $OY$ w punkcie $(0, 5)$.',
            points=2,
            scoring_key='1 pkt – wyznaczenie warunku rosnącości: $a > 0 \\implies 2m - 4 > 0 \\implies m > 2$, czyli $m \\in (2, +\\infty)$.\\n2 pkt – wyznaczenie parametru $m$ z punktu przecięcia z osią OY: $b = 5 \\implies m + 3 = 5 \\implies m = 2$.',
            explanation='a) Funkcja liniowa jest rosnąca, gdy jej współczynnik kierunkowy $a$ jest dodatni:\n$$a > 0 \\longrightarrow 2m - 4 > 0 \\longrightarrow 2m > 4 \\longrightarrow m > 2$$\nZatem dla $m \\in (2, +\\infty)$ funkcja jest rosnąca.\n\nb) Wykres przecina oś $OY$ w punkcie $(0, b)$. W naszym wzorze wyraz wolny to $b = m + 3$:\n$$m + 3 = 5 \\longrightarrow m = 2$$\nOdpowiedź: a) $m \\in (2, +\\infty)$, b) $m = 2$.',
            cke_trap='Rozróżniaj rolę współczynnika $a$ (decyduje o monotoniczności) od wyrazu wolnego $b$ (decyduje o punkcie przecięcia z osią pionową).'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-10-1',
        topic_id=topic_id,
        title='Wzór kierunkowy prostej, rola współczynnika kierunkowego a i wyrazu wolnego b',
        concept_essence='Wzór $y = ax + b$ to kod DNA prostej: 1) Współczynnik $a$ (kierunkowy) decyduje o kącie nachylenia i monotoniczności: $a > 0$ funkcja rośnie, $a < 0$ funkcja maleje, $a = 0$ funkcja jest stała (linia pozioma). 2) Wyraz wolny $b$ to punkt startowy na osi pionowej: prosta ZAWSZE przecina oś $OY$ w punkcie $(0, b)$. 3) Im większe $|a|$, tym bardziej stroma jest prosta.',
        matura_context='Jedno z najczęstszych pytań maturalnych za 1 punkt (odczytywanie znaków a i b z rysunku lub badanie monotoniczności z parametrem m).',
        core_formulas=[
            {
                'title': 'Równanie kierunkowe prostej',
                'latex': 'y = ax + b',
                'description': 'a to współczynnik kierunkowy, b to wyraz wolny.',
                'in_cke_sheet': True,
                'cke_page': 'str. 21',
                'example': 'y = -2x + 5 \\longrightarrow a = -2, b = 5',
                'mnemonic': 'a steruje kątem, b punktem na osi OY.',
                'matura_tip': 'Punkt na osi OY to zawsze (0, b).'
            },
            {
                'title': 'Monotoniczność funkcji liniowej',
                'latex': 'a > 0 \\longrightarrow \\text{rosnąca}, \\quad a < 0 \\longrightarrow \\text{malejąca}, \\quad a = 0 \\longrightarrow \\text{stała}',
                'description': 'Znak współczynnika a jednoznacznie determinuje przebieg prostej.',
                'in_cke_sheet': True,
                'cke_page': 'str. 9',
                'example': 'y = (m - 3)x + 1 \\text{ maleje gdy } m - 3 < 0 \\implies m < 3',
                'mnemonic': 'Plus to wspinaczka, minus to zjazd na nartach.',
                'matura_tip': 'O monotoniczności decyduje tylko współczynnik przy x.'
            }
        ],
        worked_example={
            'problem': 'Dla jakich wartości parametru $m$ funkcja liniowa $f(x) = (3 - 2m)x + 4$ jest rosnąca?',
            'steps': [
                {'num': 1, 'label': 'Warunek rosnącości', 'text': 'Współczynnik przy $x$ musi być ściśle dodatni: $a > 0$.'},
                {'num': 2, 'label': 'Rozwiązanie nierówności', 'text': '$3 - 2m > 0 \\implies -2m > -3 \\implies m < \\frac{3}{2}$.'},
                {'num': 3, 'label': 'Zapis wyniku CKE', 'text': 'Funkcja jest rosnąca dla $m \\in (-\\infty, \\frac{3}{2})$.'}
            ],
            'result': 'm \\in (-\\infty, \\frac{3}{2})'
        },
        exam_trap='Typowy błąd: Zapomnienie o zmianie zwrotu nierówności przy dzieleniu przez $-2$: zapis $m > \\frac{3}{2}$ zamiast $m < \\frac{3}{2}$.\n\nPoprawnie: Dzielenie przez liczbę ujemną ODWRACA znak nierówności!',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 10.2: Wyznaczanie wzoru prostej przez dwa punkty (L1.10.2)
    # ----------------------------------------------------
    v2 = get_topic_10_visuals(1)
    l2_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-10-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Miejscem zerowym funkcji liniowej $f(x) = 2x - 6$ jest liczba',
            options_data=[
                ('A', '$x = 3$'),
                ('B', '$x = -3$'),
                ('C', '$x = -6$'),
                ('D', '$x = 6$')
            ],
            correct_id='A',
            explanation='Przyrównujemy funkcję do zera:\n$$2x - 6 = 0 \\longrightarrow 2x = 6 \\longrightarrow x = 3$$',
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
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-10-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Prosta przechodzi przez punkty $K(-2, 5)$ oraz $L(2, -3)$. Jej współczynnik kierunkowy wynosi',
            options_data=[
                ('A', '$-2$'),
                ('B', '$2$'),
                ('C', '$-\\frac{1}{2}$'),
                ('D', '$\\frac{1}{2}$')
            ],
            correct_id='A',
            explanation='Stosujemy wzór na współczynnik kierunkowy:\n$$a = \\frac{y_L - y_K}{x_L - x_K} = \\frac{-3 - 5}{2 - (-2)} = \\frac{-8}{2 + 2} = \\frac{-8}{4} = -2$$',
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
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-10-2-3',
            source='Informator CKE • Zad. 36',
            question='Współczynnik kierunkowy $a$ prostej przechodzącej przez punkty $A(1, 3)$ oraz $B(4, 9)$ jest równy',
            options_data=[
                ('A', '$2$'),
                ('B', '$\\frac{1}{2}$'),
                ('C', '$3$'),
                ('D', '$-2$')
            ],
            correct_id='A',
            explanation='Wzór na współczynnik kierunkowy:\n$$a = \\frac{y_B - y_A}{x_B - x_A} = \\frac{9 - 3}{4 - 1} = \\frac{6}{3} = 2$$',
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
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-10-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Prosta o współczynniku kierunkowym $a = 3$ przechodzi przez punkt $P(2, 11)$. Oblicz wartość wyrazu wolnego $b$. Wpisz liczbę w pole poniżej.',
            correct_val='5',
            explanation='Wstawiamy współrzędne punktu do postaci kierunkowej $y = ax + b$:\n$$11 = 3 \\cdot 2 + b$$\n$$11 = 6 + b \\longrightarrow b = 5$$',
            cke_trap='Podstawiasz $x = 2$ oraz $y = 11$, a nie odwrotnie!'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-10-2-5',
            source='Informator CKE • Zad. 37',
            question='Napisz równanie prostej przechodzącej przez punkty $A(2, -1)$ oraz $B(5, 8)$ w postaci kierunkowej $y = ax + b$ i wyznacz jej miejsce zerowe. Zapisz pełne obliczenia.',
            points=2,
            scoring_key='1 pkt – poprawne obliczenie współczynnika kierunkowego $a = 3$ oraz wyrazu wolnego $b = -7$ ($y = 3x - 7$).\\n2 pkt – poprawne wyznaczenie miejsca zerowego: $3x - 7 = 0 \\implies x_0 = \\frac{7}{3}$.',
            explanation='1) Obliczamy współczynnik kierunkowy prostej:\n$$a = \\frac{y_B - y_A}{x_B - x_A} = \\frac{8 - (-1)}{5 - 2} = \\frac{8 + 1}{3} = \\frac{9}{3} = 3$$\n2) Wstawiamy współrzędne punktu $B(5, 8)$ do wzoru $y = 3x + b$:\n$$8 = 3 \\cdot 5 + b \\longrightarrow 8 = 15 + b \\longrightarrow b = -7$$\nRównanie prostej to $y = 3x - 7$.\n3) Obliczamy miejsce zerowe:\n$$3x - 7 = 0 \\longrightarrow 3x = 7 \\longrightarrow x_0 = \\frac{7}{3} = 2\\frac{1}{3}$$',
            cke_trap='Nie myl kolejności we wzorze na $a$: odejmuj współrzędne w tej samej kolejności w liczniku i mianowniku.'
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
                'example': 'A(1, 2), B(3, 8) \\longrightarrow a = \\frac{8 - 2}{3 - 1} = \\frac{6}{2} = 3',
                'mnemonic': 'Igreki na dachu, iksy w piwnicy.',
                'matura_tip': 'Zachowaj tę samą kolejność odejmowania w liczniku i mianowniku.'
            },
            {
                'title': 'Miejsce zerowe funkcji liniowej',
                'latex': 'x_0 = -\\frac{b}{a} \\quad (a \\neq 0)',
                'description': 'Punkt na osi OX, gdzie prosta przecina oś.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'y = 3x - 12 \\longrightarrow x_0 = -\\frac{-12}{3} = 4',
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
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-10-3-1',
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
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-10-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Prosta prostopadła do prostej o równaniu $y = -4$ to prosta o równaniu',
            options_data=[
                ('A', '$x = 2$ (prosta pionowa)'),
                ('B', '$y = 4$'),
                ('C', '$y = \\frac{1}{4}x$'),
                ('D', '$y = 0$')
            ],
            correct_id='A',
            explanation='Prosta $y = -4$ jest pozioma (równoległa do osi $OX$). Prosta do niej prostopadła musi być pionowa, czyli mieć równanie postaci $x = c$.',
            cke_trap='Dla prostej poziomej $a = 0$, więc wzór $a_1 \\cdot a_2 = -1$ nie ma zastosowania (dzielenie przez 0). Prostopadła to prosta pionowa $x = c$.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-10-3-3',
            source='Matura sierpień 2024 • Zad. 22',
            question='W kartezjańskim układzie współrzędnych $(x, y)$ proste $k$ oraz $l$ są określone równaniami:\n$$k: y = (3m - 2)x - 2$$\n$$l: y = (2m + 4)x + 2$$\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nProste $k$ oraz $l$ są równoległe, gdy liczba $m$ jest równa',
            options_data=[
                ('A', '$-6$'),
                ('B', '$-2$'),
                ('C', '$2$'),
                ('D', '$6$')
            ],
            correct_id='D',
            explanation='Warunek równoległości dwóch prostych to równość ich współczynników kierunkowych ($a_k = a_l$):\n$$3m - 2 = 2m + 4$$\n$$3m - 2m = 4 + 2 \\longrightarrow m = 6$$\nPoprawna odpowiedź to D.',
            cke_trap='Przyrównujemy wyłącznie współczynniki kierunkowe stojące przy $x$. Wyrazy wolne ($-2$ oraz $+2$) decydują o przesunięciu i punktach przecięcia z osią $OY$, ale nie wpływają na równoległość.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-10-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Proste o równaniach $y = (3m - 2)x + 1$ oraz $y = 10x - 5$ są równoległe. Oblicz wartość liczbową $m$. Wpisz wynik w pole poniżej.',
            correct_val='4',
            explanation='Warunek równoległości: $a_1 = a_2$:\n$$3m - 2 = 10$$\n$$3m = 12 \\longrightarrow m = 4$$',
            cke_trap='Przyrównujesz współczynniki stojące przy $x$, a nie wyrazy wolne.'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-10-3-5',
            source='Informator CKE • Zad. 38',
            question='Dana jest prosta $k$ o równaniu $y = -\\frac{1}{2}x + 4$. Wyznacz równanie prostej $l$ prostopadłej do prostej $k$ i przechodzącej przez punkt $P(3, -1)$. Zapisz pełne obliczenia.',
            points=2,
            scoring_key='1 pkt – wyznaczenie współczynnika kierunkowego prostej prostopadłej: $a_l = -\\frac{1}{-\\frac{1}{2}} = 2$.\\n2 pkt – wyznaczenie wyrazu wolnego z punktu $P(3, -1)$: $-1 = 2 \\cdot 3 + b \\implies b = -7$ i podanie równania: $y = 2x - 7$.',
            explanation='1) Warunek prostopadłości prostych $a_k \\cdot a_l = -1$:\n$$-\\frac{1}{2} \\cdot a_l = -1 \\longrightarrow a_l = 2$$\n2) Równanie prostej $l$ ma postać $y = 2x + b$. Wstawiamy współrzędne punktu $P(3, -1)$:\n$$-1 = 2 \\cdot 3 + b$$\n$$-1 = 6 + b \\longrightarrow b = -7$$\nOdpowiedź: Równanie prostej $l$ to $y = 2x - 7$.',
            cke_trap='Pamiętaj o dwóch krokach: odwróceniu ułamka ORAZ zmianie znaku na przeciwny.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-10-3',
        topic_id=topic_id,
        title='Warunek równoległości i prostopadłości prostych w układzie współrzędnych',
        concept_essence='Wzajemne położenie dwóch prostych zależy wyłącznie od ich współczynników kierunkowych $a_1$ i $a_2$: 1) Proste równoległe ($k \\parallel l$): mają ten sam kąt nachylenia, więc $a_1 = a_2$. 2) Proste prostopadłe ($k \\perp l$): przecinają się pod kątem prostym, więc $a_1 \\cdot a_2 = -1$ (współczynnik jest liczbą przeciwną i odwrotną: $a_2 = -\\frac{1}{a_1}$). Zapamiętaj: zmień znak na przeciwny i odwróć ułamek do góry nogami!',
        matura_context='Żelazny pewniak na maturze: zadanie za 1 pkt (z parametrem m) oraz element zadania za 2–4 pkt z geometrii analitycznej.',
        core_formulas=[
            {
                'title': 'Warunek równoległości prostych',
                'latex': 'k \\parallel l \\longrightarrow a_1 = a_2',
                'description': 'Współczynniki kierunkowe są identyczne.',
                'in_cke_sheet': True,
                'cke_page': 'str. 21',
                'example': 'y = 4x + 1 \\parallel y = 4x - 9',
                'mnemonic': 'Równoległe to równe.',
                'matura_tip': 'Wyrazy wolne b mogą być dowolne (b₁ != b₂ dla prostych różnych).'
            },
            {
                'title': 'Warunek prostopadłości prostych',
                'latex': 'k \\perp l \\longrightarrow a_1 \\cdot a_2 = -1',
                'description': 'Współczynnik jest odwrotny i o przeciwnym znaku.',
                'in_cke_sheet': True,
                'cke_page': 'str. 22',
                'example': 'a_1 = \\frac{2}{5} \\longrightarrow a_2 = -\\frac{5}{2} = -2{,}5',
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
        # Zadanie 1: Rozgrzewka / Baza
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
            cke_trap='Stawka zmienna (za km) stoi przy iksie, a opłata stała jest wyrazem wolnym.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
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
            explanation='Ilość wody w zbiorniku opisuje funkcja $V(t) = -5t + 120$. Pusty zbiornik oznacza $V(t) = 0 \\longrightarrow -5t + 120 = 0 \\longrightarrow 5t = 120 \\longrightarrow t = 24$.',
            cke_trap='Gdy ilość maleje, współczynnik kierunkowy jest ujemny ($-5$).'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-10-4-3',
            source='Informator CKE • Zad. 39',
            question='Wartość maszyny spada liniowo wg wzoru $W(t) = -2500t + 30000$, gdzie $t$ to wiek w latach. Wartość maszyny po 4 latach wynosi',
            options_data=[
                ('A', '$20\\,000$ zł'),
                ('B', '$10\\,000$ zł'),
                ('C', '$22\\,500$ zł'),
                ('D', '$15\\,000$ zł')
            ],
            correct_id='A',
            explanation='$W(4) = -2500 \\cdot 4 + 30000 = -10000 + 30000 = 20000$ zł.',
            cke_trap='Pamiętaj o odjęciu spadku wartości od kwoty początkowej 30 000 zł.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-10-4-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Firma produkcyjna ma koszty stałe 1500 zł miesięcznie oraz koszt 25 zł za każdą wyprodukowaną sztukę. Oblicz łączny koszt wyprodukowania 100 sztuk towaru. Wpisz liczbę w pole poniżej.',
            correct_val='4000',
            explanation='Funkcja kosztu to $K(x) = 25x + 1500$.\nDla $x = 100$ mamy:\n$$K(100) = 25 \\cdot 100 + 1500 = 2500 + 1500 = 4000$$ zł.',
            cke_trap='Pamiętaj o dodaniu kosztów stałych do kosztów zmiennych.'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-10-4-5',
            source='Informator CKE • Zad. 40',
            question='Firma kurierska oferuje dwa plany cenowe:\nPlan A: opłata stała $30$ zł oraz $2$ zł za każdy kilogram przesyłki.\nPlan B: brak opłaty stałej, ale $5$ zł za każdy kilogram przesyłki.\na) Zapisz wzory funkcji kosztu $K_A(x)$ oraz $K_B(x)$ w zależności od wagi przesyłki $x$ (w kg).\nb) Oblicz, dla jakiej wagi przesyłki koszt w obu planach jest identyczny.',
            points=2,
            scoring_key='1 pkt – poprawne zapisanie wzorów obu funkcji kosztu: $K_A(x) = 2x + 30$ oraz $K_B(x) = 5x$.\\n2 pkt – ułożenie i rozwiązanie równania $2x + 30 = 5x \\implies 3x = 30 \\implies x = 10$ kg.',
            explanation='a) Funkcje kosztu:\n$$K_A(x) = 2x + 30$$\n$$K_B(x) = 5x$$\n\nb) Porównujemy koszty obu planów:\n$$2x + 30 = 5x$$\n$$30 = 5x - 2x$$\n$$30 = 3x \\longrightarrow x = 10$$\nOdpowiedź: Koszt przesyłki w obu planach jest identyczny dla paczki o wadze $10$ kg.',
            cke_trap='Upewnij się, że poprawnie przypisałeś współczynniki: Plan B nie ma opłaty stałej ($b = 0$).'
        )
    ]
    l4 = make_lesson(
        lesson_id='lesson-10-4',
        topic_id=topic_id,
        title='Zastosowania praktyczne funkcji liniowej i modelowanie zjawisk',
        concept_essence='W zadaniach z życia codziennego funkcja liniowa $y = ax + b$ modeluje stały przyrost lub spadek: 1) Wyraz wolny $b$ to WARTOŚĆ POCZĄTKOWA (np. opłata startowa, stan początkowy konta, zawartość zbiornika w chwili $t = 0$). 2) Współczynnik $a$ to PRĘDKOŚĆ ZMIANY (stawka za kilometr, zużycie paliwa na 100 km, tempo napełniania). Jeśli ilość rośnie, $a > 0$; jeśli ubywa, $a < 0$.',
        matura_context='Zadania tekstowe i praktyczne za 1 lub 2 punkty na maturze CKE sprawdzające umiejętność budowy prostego modelu matematycznego.',
        core_formulas=[
            {
                'title': 'Model liniowy zjawiska',
                'latex': 'y(t) = a \\cdot t + y_0',
                'description': 'y₀ to stan początkowy, a to tempo zmiany w jednostce czasu.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'Koszt = 50 + 20t (50 zł abonament + 20 zł za każdą godzinę)',
                'mnemonic': 'Stan początkowy plus tempo razy czas.',
                'matura_tip': 'Zwracaj uwagę na jednostki (minuty vs godziny, litry vs hektolitry).'
            }
        ],
        worked_example={
            'problem': 'Wypożyczenie kajaka kosztuje 30 zł opłaty stałej plus 15 zł za każdą rozpoczętą godzinę. Zapisz wzór funkcji kosztu $K(t)$ i oblicz koszt wypożyczenia na 4 godziny.',
            'steps': [
                {'num': 1, 'label': 'Identyfikacja parametrów', 'text': 'Opłata stała to $b = 30$, stawka godzinowa to $a = 15$.'},
                {'num': 2, 'label': 'Ułożenie wzoru', 'text': '$K(t) = 15t + 30$.'},
                {'num': 3, 'label': 'Obliczenie wartości i wynik CKE', 'text': '$K(4) = 15 \\cdot 4 + 30 = 60 + 30 = 90$ zł.'}
            ],
            'result': 'K(t) = 15t + 30, \\quad K(4) = 90 \\text{ zł}'
        },
        exam_trap='Typowy błąd: Zamiana opłaty stałej ze stawką godzinową: napisanie $K(t) = 30t + 15$.\n\nPoprawnie: Przy zmiennej $t$ (czasie) stoi stawka, która rośnie z każdą godziną!',
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
        'description': 'Wzór kierunkowy prostej, rola współczynnika a i b, wyznaczanie prostej przez dwa punkty, warunek równoległości i prostopadłości oraz zastosowania praktyczne.',
        'lessons': lessons
    }

if __name__ == '__main__':
    t = build_topic_10()
    print(f"Pomyślnie zbudowano {t['title']} ({len(t['lessons'])} lekcje, {sum(len(l['tasks']) for l in t['lessons'])} zadań).")
