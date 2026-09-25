"""
topic_09_builder.py - Dział 1.9: Odczytywanie informacji z wykresu funkcji (4 lekcje | Tier S+)
Żelazna matryca 5-Task: T1 Baza, T2 Pułapka CKE, T3 CKE 1:1, T4 Numeryczne, T5 Otwarte/Dowód z kryteriami.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_09 import get_topic_09_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_09():
    topic_id = 'dzial-9'
    topic_title = 'Odczytywanie informacji z wykresu funkcji'
    topic_number = 9
    lessons = []

    # ----------------------------------------------------
    # Lekcja 9.1: Dziedzina i zbiór wartości z wykresu (L1.9.1)
    # ----------------------------------------------------
    v1 = get_topic_09_visuals(0)
    l1_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-9-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Wskaż poprawne przyporządkowanie pojęć do osi układu współrzędnych:',
            options_data=[
                ('A', 'Dziedzina to oś pozioma $OX$, a zbiór wartości to oś pionowa $OY$'),
                ('B', 'Dziedzina to oś pionowa $OY$, a zbiór wartości to oś pozioma $OX$'),
                ('C', 'Zarówno dziedzinę jak i zbiór wartości odczytujemy z osi $OX$'),
                ('D', 'Dziedzina to punkty przecięcia z osią $OY$')
            ],
            correct_id='A',
            explanation='Dziedzina to zbiór wszystkich argumentów $x$ (oś pozioma $OX$, rzut lewo-prawo). Zbiór wartości to zbiór wartości $y$ (oś pionowa $OY$, rzut dół-góra).',
            cke_trap='Nigdy nie myl osi: $D_f \\subset OX$ (poziom), a $ZW_f \\subset OY$ (pion).'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-9-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Wykres funkcji $g$ zaczyna się w punkcie $(-3, 1)$ kółkiem zamalowanym, a kończy w punkcie $(4, 5)$ kółkiem otwartym (niezamalowanym). Dziedziną funkcji $g$ jest',
            options_data=[
                ('A', '$[-3, 4)$'),
                ('B', '$[-3, 4]$'),
                ('C', '$(-3, 4)$'),
                ('D', '$[1, 5)$')
            ],
            correct_id='A',
            explanation='Rzutujemy na oś poziomą $OX$: punkt $-3$ ma kółko zamalowane (nawias domknięty $[$), a punkt $4$ ma kółko otwarte (nawias okrągły $)$). Zatem $D = [-3, 4)$.',
            cke_trap='Kółko otwarte ZAWSZE wymusza nawias okrągły przy danym krańcu.',
            plot={
                'type': 'PIECEWISE_LINEAR',
                'xRange': [-4, 5],
                'yRange': [0, 6],
                'gridStep': 1,
                'segments': [
                    {'from': [-3, 1], 'to': [0, 2], 'startDot': 'filled', 'endDot': 'none', 'color': '#38BDF8'},
                    {'from': [0, 2], 'to': [4, 5], 'startDot': 'none', 'endDot': 'hollow', 'color': '#38BDF8'}
                ],
                'points': [
                    {'x': -3, 'y': 1, 'label': '(-3, 1)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'sw'},
                    {'x': 4, 'y': 5, 'label': '(4, 5)', 'dot': 'hollow', 'color': '#F43F5E', 'attach': 'ne'}
                ]
            }
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-9-1-3',
            source='Informator CKE • Zad. 27',
            question='Na rysunku przedstawiono wykres funkcji $f$ określonej w przedziale $[-4, 5]$. Lewy koniec wykresu to punkt $(-4, -1)$ zamalowany, a prawy to punkt $(5, 3)$ zamalowany. Najniższy punkt wykresu to $(-1, -2)$, a najwyższy to $(3, 4)$. Zbiorem wartości funkcji $f$ jest przedział',
            options_data=[
                ('A', '$[-2, 4]$'),
                ('B', '$[-4, 5]$'),
                ('C', '$[-1, 3]$'),
                ('D', '$(-2, 4)$')
            ],
            correct_id='A',
            explanation='Zbiór wartości to rzut wykresu na oś pionową $OY$: od najniższego punktu ($y = -2$) do najwyższego punktu ($y = 4$). Oba punkty są osiągane, więc $ZW = [-2, 4]$.',
            cke_trap='Przedział $[-4, 5]$ to dziedzina (oś OX)! Zbiór wartości odczytujemy z osi pionowej OY: $[-2, 4]$.',
            plot={
                'type': 'PIECEWISE_LINEAR',
                'xRange': [-5, 6],
                'yRange': [-3, 5],
                'gridStep': 1,
                'segments': [
                    {'from': [-4, -1], 'to': [-1, -2], 'startDot': 'filled', 'endDot': 'filled', 'color': '#38BDF8'},
                    {'from': [-1, -2], 'to': [3, 4], 'startDot': 'none', 'endDot': 'filled', 'color': '#38BDF8'},
                    {'from': [3, 4], 'to': [5, 3], 'startDot': 'none', 'endDot': 'filled', 'color': '#38BDF8'}
                ],
                'points': [
                    {'x': -4, 'y': -1, 'label': '(-4, -1)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'sw'},
                    {'x': -1, 'y': -2, 'label': '(-1, -2)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 's'},
                    {'x': 3, 'y': 4, 'label': '(3, 4)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'n'},
                    {'x': 5, 'y': 3, 'label': '(5, 3)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'ne'}
                ]
            }
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-9-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Na rysunku przedstawiono wykres funkcji $f$ określonej w przedziale $[-5, 6]$.\n\nNajwiększa wartość funkcji $f$ w tym przedziale jest równa',
            correct_val='4',
            explanation='Z wykresu odczytujemy współrzędną $y$ najwyżej położonego punktu: jest to punkt $(0, 4)$, więc największa wartość funkcji wynosi $4$.',
            cke_trap='Wartość funkcji to współrzędna $y$ najwyższego punktu ($4$), a nie argument $x$ ($0$).',
            plot={
                'type': 'PIECEWISE_LINEAR',
                'xRange': [-6, 7],
                'yRange': [-2, 5],
                'gridStep': 1,
                'segments': [
                    {'from': [-5, 1], 'to': [0, 4], 'startDot': 'filled', 'endDot': 'none', 'color': '#38BDF8'},
                    {'from': [0, 4], 'to': [6, 2], 'startDot': 'none', 'endDot': 'filled', 'color': '#38BDF8'}
                ],
                'points': [
                    {'x': -5, 'y': 1, 'label': '(-5, 1)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'nw'},
                    {'x': 0, 'y': 4, 'label': '(0, 4)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'n'},
                    {'x': 6, 'y': 2, 'label': '(6, 2)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'ne'}
                ]
            }
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-9-1-5',
            source='Informator CKE • Zad. 28',
            question='Na rysunku przedstawiono wykres funkcji $f$. Odczytaj z wykresu dziedzinę $D$ oraz zbiór wartości $ZW$ funkcji $f$. Zapisz oba zbiory w postaci przedziałów.',
            points=2,
            scoring_key='1 pkt – poprawne odczytanie dziedziny z osi poziomej OX: $D = [-4, 5]$.\\n2 pkt – poprawne odczytanie zbioru wartości z osi pionowej OY: $ZW = [-2, 4]$.',
            explanation='1) Dziedzina (rzutowanie na oś $OX$ od lewej do prawej):\nWykres rozciąga się od $x = -4$ (punkt zamalowany) do $x = 5$ (punkt zamalowany).\nZatem dziedzina to $D = [-4, 5]$.\n\n2) Zbiór wartości (rzutowanie na oś $OY$ od dołu do góry):\nNajniżej położony punkt wykresu ma rzędną $y = -2$, a najwyżej położony punkt ma rzędną $y = 4$.\nZatem zbiór wartości to $ZW = [-2, 4]$.',
            cke_trap='Uważaj, aby nie zamienić osi: dziedzinę odczytujemy wyłącznie z osi poziomej OX, a zbiór wartości z pionowej OY.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-9-1',
        topic_id=topic_id,
        title='Dziedzina i zbiór wartości z wykresu funkcji (oś OX vs OY)',
        concept_essence='Odczytywanie dziedziny i zbioru wartości z wykresu to rzutowanie cienia na osie: 1) Dziedzina ($D_f$) — patrzysz na wykres OD LEWEJ DO PRAWEJ i rzutujesz go na oś poziomą $OX$. Pytasz: od jakiego do jakiego iksa istnieje funkcja? 2) Zbiór wartości ($ZW_f$) — patrzysz na wykres OD DOŁU DO GÓRY i rzutujesz go na oś pionową $OY$. Pytasz: od najniższego do najwyższego punktu! 3) Kółka: kółko zamalowane daje nawias ostry $\\langle \\dots \\rangle$ lub $[ \\dots ]$, kółko puste daje nawias okrągły $( \\dots )$.',
        matura_context='Zadanie 9 lub 10 na każdej maturze podstawowej CKE za 1 punkt (100% powtarzalności).',
        core_formulas=[],
        worked_example={
            'problem': 'Z wykresu funkcji odczytaj dziedzinę $D$ oraz zbiór wartości $ZW$. Lewy koniec wykresu to $(-3, 1)$ zamalowany, prawy to $(6, 2)$ pusty, najniższy punkt to $(1, -2)$, najwyższy to $(4, 4)$.',
            'steps': [
                {'num': 1, 'label': 'Rzut na oś poziomą OX (Dziedzina)', 'text': 'Skrajny lewy $x = -3$ (zamalowany), skrajny prawy $x = 6$ (pusty). Dziedzina: $D = [-3, 6)$.'},
                {'num': 2, 'label': 'Rzut na oś pionową OY (Zbiór wartości)', 'text': 'Najniższy punkt ma $y = -2$ (osiągany), najwyższy ma $y = 4$ (osiągany). Zbiór wartości: $ZW = [-2, 4]$.'},
                {'num': 3, 'label': 'Zapisanie odpowiedzi CKE', 'text': '$D = [-3, 6)$ oraz $ZW = [-2, 4]$.'}
            ],
            'result': 'D = [-3, 6), \\quad ZW = [-2, 4]'
        },
        exam_trap='Typowy błąd: Zamiana osi — podanie przedziału z osi $OX$ jako zbioru wartości.\n\nPoprawnie: Dziedzina to ZAWSZE iksy (poziom), a wartości to ZAWSZE igreki (pion). Zapisz sobie na marginesie: D = OX, ZW = OY.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 9.2: Miejsca zerowe i odczyt wartości (L1.9.2)
    # ----------------------------------------------------
    v2 = get_topic_09_visuals(1)
    l2_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-9-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Miejscem zerowym funkcji $f$ nazywamy',
            options_data=[
                ('A', 'Taki argument $x$, dla którego wartość funkcji wynosi $0$ ($f(x) = 0$)'),
                ('B', 'Punkt przecięcia wykresu z osią pionową $OY$'),
                ('C', 'Wartość funkcji dla argumentu $x = 0$ ($f(0)$)'),
                ('D', 'Najmniejszą wartość funkcji')
            ],
            correct_id='A',
            explanation='Miejsce zerowe to ZAWSZE argument $x$, w którym wykres przecina lub dotyka osi poziomej $OX$ (gdzie $y = 0$).',
            cke_trap='Nie myl miejsca zerowego (przecięcie z osią OX) z punktem przecięcia z osią pionową OY (gdzie $x = 0$).'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-9-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Z wykresu funkcji odczytano punkt $P(2, -3)$. Wynika z tego, że',
            options_data=[
                ('A', '$f(2) = -3$'),
                ('B', '$f(-3) = 2$'),
                ('C', 'Miejscem zerowym jest $2$'),
                ('D', 'Miejscem zerowym jest $-3$')
            ],
            correct_id='A',
            explanation='Punkt $P(x, y)$ oznacza, że dla argumentu $x = 2$ wartość wynosi $y = -3$, czyli $f(2) = -3$.',
            cke_trap='Kolejność w punkcie to ZAWSZE $(x, y)$, a więc $f(\\text{pierwsza}) = \\text{druga}$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-2, 5],
                'yRange': [-5, 2],
                'gridStep': 1,
                'segments': [
                    {'from': [2, 0], 'to': [2, -3], 'color': 'rgba(148, 163, 184, 0.4)', 'strokeWidth': 1.5, 'dashed': True},
                    {'from': [0, -3], 'to': [2, -3], 'color': 'rgba(148, 163, 184, 0.4)', 'strokeWidth': 1.5, 'dashed': True}
                ],
                'points': [
                    {'x': 2, 'y': -3, 'label': 'P(2, -3)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'se'}
                ]
            }
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-9-2-3',
            source='Informator CKE • Zad. 29',
            question='Wykres funkcji $f$ przecina oś $OX$ w punktach $(-2, 0)$ oraz $(3, 0)$, a oś $OY$ w punkcie $(0, -6)$. Zbiorem wszystkich miejsc zerowych funkcji $f$ jest',
            options_data=[
                ('A', '$\\{-2, 3\\}$'),
                ('B', '$\\{-6\\}$'),
                ('C', '$\\{-2, 0, 3\\}$'),
                ('D', '$(-2, 3)$')
            ],
            correct_id='A',
            explanation='Miejsca zerowe to współrzędne $x$ punktów leżących na osi $OX$: $x = -2$ oraz $x = 3$. Punkt $(0, -6)$ to punkt przecięcia z osią $OY$, a liczba $-6$ to wartość $f(0)$.',
            cke_trap='Liczba $-6$ to $f(0)$, nie jest miejscem zerowym!',
            plot={
                'type': 'PARABOLA',
                'xRange': [-4, 5],
                'yRange': [-8, 3],
                'gridStep': 1,
                'parabola': {
                    'a': 1,
                    'p': 0.5,
                    'q': -6.25,
                    'color': '#38BDF8'
                },
                'points': [
                    {'x': -2, 'y': 0, 'label': '(-2, 0)', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'},
                    {'x': 3, 'y': 0, 'label': '(3, 0)', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'},
                    {'x': 0, 'y': -6, 'label': '(0, -6)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'}
                ]
            }
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-9-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Wykres funkcji przecina oś $OX$ w punktach o współrzędnych $x_1 = -4$, $x_2 = 1$, $x_3 = 5$. Oblicz sumę wszystkich miejsc zerowych tej funkcji. Wpisz wynik w pole poniżej.',
            correct_val='2',
            explanation='Suma miejsc zerowych wynosi: $(-4) + 1 + 5 = 2$.',
            cke_trap='Dodawaj same iksy: $(-4) + 1 + 5 = 2$.',
            plot={
                'type': 'PIECEWISE_LINEAR',
                'xRange': [-6, 7],
                'yRange': [-4, 4],
                'gridStep': 1,
                'segments': [
                    {'from': [-5, -3], 'to': [-4, 0], 'startDot': 'filled', 'endDot': 'none', 'color': '#38BDF8'},
                    {'from': [-4, 0], 'to': [-1.5, 3], 'startDot': 'none', 'endDot': 'none', 'color': '#38BDF8'},
                    {'from': [-1.5, 3], 'to': [1, 0], 'startDot': 'none', 'endDot': 'none', 'color': '#38BDF8'},
                    {'from': [1, 0], 'to': [3, -2.5], 'startDot': 'none', 'endDot': 'none', 'color': '#38BDF8'},
                    {'from': [3, -2.5], 'to': [5, 0], 'startDot': 'none', 'endDot': 'none', 'color': '#38BDF8'},
                    {'from': [5, 0], 'to': [6, 2], 'startDot': 'none', 'endDot': 'filled', 'color': '#38BDF8'}
                ],
                'points': [
                    {'x': -4, 'y': 0, 'label': 'x₁ = -4', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'},
                    {'x': 1, 'y': 0, 'label': 'x₂ = 1', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'},
                    {'x': 5, 'y': 0, 'label': 'x₃ = 5', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'}
                ]
            }
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-9-2-5',
            source='Informator CKE • Zad. 30',
            question='Dla funkcji $f$ przedstawionej na wykresie: a) wyznacz wszystkie miejsca zerowe, b) odczytaj wartość $f(0)$ (punkt przecięcia z osią $OY$). Zapisz odpowiedzi.',
            points=2,
            scoring_key='1 pkt – podanie wszystkich miejsc zerowych odczytanych z osi OX: $x_1 = -2, x_2 = 3$.\\n2 pkt – podanie wartości dla argumentu zero: $f(0) = -6$ (punkt $(0, -6)$).',
            explanation='1) Miejsca zerowe funkcji to punkty, w których wykres przecina oś $OX$:\nSą to $x_1 = -2$ oraz $x_2 = 3$.\n2) Punkt przecięcia z osią $OY$ ma współrzędne $(0, -6)$, co oznacza, że wartość funkcji dla argumentu $x = 0$ wynosi $f(0) = -6$.',
            cke_trap='Miejsce zerowe to liczba $x = -2$ oraz $x = 3$. Punkt $(0, -6)$ leży na osi OY i określa wyraz wolny $f(0)$, nie jest miejscem zerowym.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-9-2',
        topic_id=topic_id,
        title='Miejsca zerowe oraz odczyt wartości funkcji f(x0) = y0',
        concept_essence='Wykres funkcji to mapa relacji między argumentem $x$ a wartością $y$: 1) Miejsce zerowe — to argument $x$ na osi poziomej $OX$, dla którego wartość funkcji wynosi zero ($f(x) = 0$). Miejscem zerowym jest zawsze sama liczba (argument $x$, np. $x = 3$), a nie para współrzędnych. 2) Wartość funkcji dla danego argumentu $f(x_0)$ — znajdujesz $x_0$ na osi poziomej, przemieszczasz się pionowo do wykresu i odczytujesz wartość $y$ na osi pionowej. 3) Przecięcie z osią $OY$ — to wartość funkcji dla zera, czyli punkt $(0, f(0))$.',
        matura_context='Podstawowe pytanie sprawdzające umiejętność czytania wykresów za 1 pkt.',
        core_formulas=[],
        worked_example={
            'problem': 'Dla funkcji $f$ przedstawionej na wykresie wyznacz: a) miejsca zerowe, b) wartość $f(-2)$, c) punkt przecięcia z osią $OY$. Wiadomo, że wykres przechodzi przez punkty $(-4, 0)$, $(-2, 3)$, $(0, 2)$, $(3, 0)$.',
            'steps': [
                {'num': 1, 'label': 'Odczyt miejsc zerowych', 'text': 'Wykres przecina oś $OX$ w punktach $(-4, 0)$ oraz $(3, 0)$. Miejsca zerowe to $x_1 = -4$ oraz $x_2 = 3$.'},
                {'num': 2, 'label': 'Odczyt wartości f(-2)', 'text': 'Dla argumentu $x = -2$ punkt na wykresie to $(-2, 3)$, więc $f(-2) = 3$.'},
                {'num': 3, 'label': 'Przecięcie z osią OY i wynik CKE', 'text': 'Wykres przecina oś pionową w punkcie $(0, 2)$, co oznacza, że $f(0) = 2$.'}
            ],
            'result': 'x \\in \\{-4, 3\\}, \\quad f(-2) = 3, \\quad (0, 2)'
        },
        exam_trap='Typowy błąd CKE: Podawanie miejsca zerowego jako współrzędnych punktu $(3, 0)$ zamiast samej liczby $x = 3$.\n\nZasada Core-4: Miejsce zerowe to zawsze pojedyncza liczba (argument $x = 3$). Punkt $(3, 0)$ to punkt geometryczny przecięcia wykresu z osią na płaszczyźnie, a nie miejsce zerowe.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 9.3: Monotoniczność i przedziały (L1.9.3)
    # ----------------------------------------------------
    v3 = get_topic_09_visuals(2)
    l3_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-9-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Przedziały, w których funkcja rośnie, maleje lub jest stała, podajemy ZAWSZE jako przedziały',
            options_data=[
                ('A', 'Argumentów $x$ (odczytywane z osi poziomej $OX$)'),
                ('B', 'Wartości $y$ (odczytywane z osi pionowej $OY$)'),
                ('C', 'Par uporządkowanych $(x, y)$'),
                ('D', 'Długości wykresu')
            ],
            correct_id='A',
            explanation='Monotoniczność odpowiada na pytanie: DLA JAKICH IKSÓW funkcja idzie w górę lub w dół? Przedziały monotoniczności ZAWSZE odczytujemy z osi poziomej $OX$.',
            cke_trap='Podanie przedziału z osi OY to kardynalny błąd skutkujący 0 punktów na maturze.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-9-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Funkcja rośnie w przedziale $[-4, -1]$ oraz w przedziale $[2, 5]$. Prawidłowy zapis odpowiedzi na maturze to:',
            options_data=[
                ('A', 'Funkcja rośnie w przedziale $[-4, -1]$ oraz w przedziale $[2, 5]$ (zapisujemy ze słowem „oraz” lub przecinkiem)'),
                ('B', 'Funkcja rośnie w przedziale $[-4, -1] \\cup [2, 5]$ (ze znakiem sumy)'),
                ('C', 'Funkcja rośnie w przedziale $[-4, 5]$'),
                ('D', 'Funkcja nie jest nigdzie rosnąca')
            ],
            correct_id='A',
            explanation='Zgodnie ze ścisłymi kryteriami CKE przedziały monotoniczności podaje się OSOBNO, rozdzielone przecinkiem lub słowem „oraz”. Znak sumy zbiorów $(\\cup)$ jest błędem merytorycznym, ponieważ funkcja jako całość nie musi być rosnąca na sumie przedziałów.',
            cke_trap='Nigdy nie łącz przedziałów monotoniczności symbolem sumy $\\cup$!'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-9-3-3',
            source='Informator CKE • Zad. 31',
            question='Wykres funkcji idzie w górę od punktu $(-3, -2)$ do punktu $(1, 4)$, a następnie opada od punktu $(1, 4)$ do punktu $(5, 0)$. Funkcja jest rosnąca w przedziale',
            options_data=[
                ('A', '$[-3, 1]$'),
                ('B', '$[-2, 4]$'),
                ('C', '$[1, 5]$'),
                ('D', '$[-3, 4]$')
            ],
            correct_id='A',
            explanation='Wykres unosi się od $x = -3$ do $x = 1$. Zatem funkcja jest rosnąca w przedziale argumentów $[-3, 1]$.',
            cke_trap='Przedział $[-2, 4]$ to wartości igreka — nigdy nie podawaj igreka w przedziale monotoniczności!',
            plot={
                'type': 'PIECEWISE_LINEAR',
                'xRange': [-4, 6],
                'yRange': [-3, 5],
                'gridStep': 1,
                'segments': [
                    {'from': [-3, -2], 'to': [1, 4], 'startDot': 'filled', 'endDot': 'filled', 'color': '#38BDF8'},
                    {'from': [1, 4], 'to': [5, 0], 'startDot': 'none', 'endDot': 'filled', 'color': '#38BDF8'}
                ],
                'points': [
                    {'x': -3, 'y': -2, 'label': '(-3, -2)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'n'},
                    {'x': 1, 'y': 4, 'label': '(1, 4)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'n'},
                    {'x': 5, 'y': 0, 'label': '(5, 0)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'ne'}
                ]
            }
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-9-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Na rysunku przedstawiono wykres funkcji $f$ określonej w przedziale $[1, 9]$.\n\nNajmniejsza wartość funkcji $f$ w przedziale $[1, 9]$ jest równa',
            correct_val='-2',
            explanation='Z wykresu odczytujemy najniżej położony punkt funkcji: $(8, -2)$. Najmniejsza wartość funkcji $f$ w przedziale $[1, 9]$ wynosi $y = -2$ (dla argumentu $x = 8$).',
            cke_trap='Wartość funkcji to współrzędna $y$ najniższego punktu ($-2$), a nie argument $x$ ($8$).',
            plot={
                'type': 'PIECEWISE_LINEAR',
                'xRange': [0, 10],
                'yRange': [-3, 6],
                'gridStep': 1,
                'segments': [
                    {'from': [1, 2], 'to': [2, 4], 'startDot': 'filled', 'endDot': 'filled', 'color': '#38BDF8'},
                    {'from': [2, 4], 'to': [8, -2], 'startDot': 'filled', 'endDot': 'filled', 'color': '#38BDF8'},
                    {'from': [8, -2], 'to': [9, 1], 'startDot': 'filled', 'endDot': 'filled', 'color': '#38BDF8'}
                ],
                'points': [
                    {'x': 1, 'y': 2, 'label': '(1, 2)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'nw'},
                    {'x': 2, 'y': 4, 'label': '(2, 4)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'n'},
                    {'x': 8, 'y': -2, 'label': '(8, -2)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 's'},
                    {'x': 9, 'y': 1, 'label': '(9, 1)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'ne'}
                ]
            }
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-9-3-5',
            source='Informator CKE • Zad. 32',
            question='Na rysunku przedstawiono wykres funkcji $f$ w przedziale $[-3, 5]$. Wyznacz maksymalne przedziały monotoniczności tej funkcji (w których funkcja rośnie oraz w których funkcja maleje). Zapisz przedziały zgodnie ze standardem maturalnym CKE.',
            points=2,
            scoring_key='1 pkt – poprawne wyznaczenie przedziału, w którym funkcja rośnie: $[-3, 1]$.\\n2 pkt – poprawne wyznaczenie przedziału, w którym funkcja maleje: $[1, 5]$ (zapisane oddzielnie, bez symbolu sumy).',
            explanation='1) Funkcja rośnie w przedziale, w którym wraz ze wzrostem argumentów wartości rosną (wykres idzie pod górę):\nOd punktu $(-3, -2)$ do $(1, 4)$, czyli dla $x \\in [-3, 1]$.\n2) Funkcja maleje w przedziale, w którym wykres opada w dół:\nOd punktu $(1, 4)$ do $(5, 0)$, czyli dla $x \\in [1, 5]$.\nOdpowiedź: Funkcja $f$ rośnie w przedziale $[-3, 1]$ oraz maleje w przedziale $[1, 5]$.',
            cke_trap='Nigdy nie podawaj wartości $y$ (np. $[-2, 4]$) jako przedziału monotoniczności — przedziały monotoniczności zawsze odczytujemy z osi OX!'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-9-3',
        topic_id=topic_id,
        title='Monotoniczność i przedziały (rośnie, maleje, stała – oś OX)',
        concept_essence='Badanie monotoniczności z wykresu to śledzenie marszu po linii od lewej do prawej: 1) Jeśli idziesz POD GÓRĘ — funkcja rośnie. 2) Jeśli schodzisz W DÓŁ — funkcja maleje. 3) Jeśli idziesz PO PŁASKIM — funkcja jest stała. Ważna reguła: Przedziały monotoniczności odczytujesz WYŁĄCZNIE z osi poziomej $OX$! Pytasz: w jakich iksach funkcja się wznosi? Iksy podajesz w nawiasach domkniętych, rozdzielone przecinkiem (NIGDY symbolem sumy $\\cup$).',
        matura_context='Regularne zadanie testowe za 1 pkt sprawdzające odporność na pułapkę podawania igreka zamiast iksa.',
        core_formulas=[],
        worked_example={
            'problem': 'Na podstawie wykresu podaj maksymalne przedziały, w których funkcja maleje. Wykres rośnie od $(-4, -3)$ do $(-1, 2)$, następnie opada do $(3, -1)$, a potem znów rośnie do $(6, 4)$.',
            'steps': [
                {'num': 1, 'label': 'Lokalizacja fragmentu opadającego', 'text': 'Wykres schodzi w dół od szczytu w punkcie $(-1, 2)$ do dołka w punkcie $(3, -1)$.'},
                {'num': 2, 'label': 'Odczyt współrzędnych x', 'text': 'Szczyt ma współrzędną $x = -1$, a dołek $x = 3$.'},
                {'num': 3, 'label': 'Zapis przedziału i wynik CKE', 'text': 'Funkcja maleje w przedziale $x \\in [-1, 3]$.'}
            ],
            'result': '[-1, 3]'
        },
        exam_trap='Typowy błąd: Podanie przedziału wartości z osi $OY$ (np. $[ -1, 2]$) zamiast przedziału argumentów z osi $OX$ (czyli $[-1, 3]$).\n\nPoprawnie: Przedziały monotoniczności ZAWSZE odczytujesz z osi poziomej $OX$.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    # ----------------------------------------------------
    # Lekcja 9.4: Równania f(x) = m oraz nierówności f(x) > 0 (L1.9.4)
    # ----------------------------------------------------
    v4 = get_topic_09_visuals(3)
    l4_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-9-4-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Równanie $f(x) = 2$ ma dokładnie tyle rozwiązań, w ilu punktach wykres funkcji $f$ przecina się z prostą',
            options_data=[
                ('A', 'Poziomą o równaniu $y = 2$'),
                ('B', 'Pionową o równaniu $x = 2$'),
                ('C', 'Ukośną o równaniu $y = 2x$'),
                ('D', 'Punktem $(2, 0)$')
            ],
            correct_id='A',
            explanation='Wartość funkcji to współrzędna $y$. Warunek $f(x) = 2$ oznacza szukanie punktów na wykresie o wysokości $y = 2$, czyli przecięcia z poziomą prostą $y = 2$.',
            cke_trap='Pozioma prosta to $y = \\text{stała}$. Prosta $x = 2$ jest pionowa!',
            plot={
                'type': 'PIECEWISE_LINEAR',
                'xRange': [-5, 6],
                'yRange': [-3, 4],
                'gridStep': 1,
                'segments': [
                    {'from': [-4, 0], 'to': [-2, 3], 'startDot': 'filled', 'endDot': 'none', 'color': '#38BDF8'},
                    {'from': [-2, 3], 'to': [1, -1], 'startDot': 'none', 'endDot': 'none', 'color': '#38BDF8'},
                    {'from': [1, -1], 'to': [3, 3], 'startDot': 'none', 'endDot': 'none', 'color': '#38BDF8'},
                    {'from': [3, 3], 'to': [5, 1], 'startDot': 'none', 'endDot': 'filled', 'color': '#38BDF8'}
                ],
                'horizontalLines': [
                    {'y': 2, 'dashed': True, 'color': '#FFB800', 'label': 'prosta y = 2'}
                ],
                'points': [
                    {'x': -2.67, 'y': 2, 'label': 'P₁', 'dot': 'filled', 'color': '#FFB800', 'attach': 'nw'},
                    {'x': -0.5, 'y': 2, 'label': 'P₂', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'},
                    {'x': 2.5, 'y': 2, 'label': 'P₃', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'}
                ]
            }
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-9-4-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Zbiorem rozwiązań nierówności $f(x) > 0$ jest suma przedziałów $(-4, -1) \\cup (2, 5)$. Wtedy zbiorem rozwiązań nierówności $f(x) \\ge 0$ dla tej samej funkcji o dziedzinie $[-4, 5]$ jest',
            options_data=[
                ('A', '$[-4, -1] \\cup [2, 5]$'),
                ('B', '$(-4, -1) \\cup (2, 5)$'),
                ('C', '$[-4, 5]$'),
                ('D', '$\\emptyset$')
            ],
            correct_id='A',
            explanation='Nierówność nieostra $\\ge 0$ dołącza miejsca zerowe (punkty, w których $f(x) = 0$). Zatem przedziały otwarte domykamy w punktach przecięcia z osią: $[-4, -1] \\cup [2, 5]$.',
            cke_trap='Znak $\\ge$ włącza miejsca zerowe (nawiasy domknięte).',
            plot={
                'type': 'PIECEWISE_LINEAR',
                'xRange': [-5, 6],
                'yRange': [-3, 4],
                'gridStep': 1,
                'segments': [
                    {'from': [-4, 0], 'to': [-2.5, 3], 'startDot': 'filled', 'endDot': 'none', 'color': '#10B981', 'strokeWidth': 3},
                    {'from': [-2.5, 3], 'to': [-1, 0], 'startDot': 'none', 'endDot': 'filled', 'color': '#10B981', 'strokeWidth': 3},
                    {'from': [-1, 0], 'to': [0.5, -2], 'startDot': 'none', 'endDot': 'none', 'color': '#F43F5E'},
                    {'from': [0.5, -2], 'to': [2, 0], 'startDot': 'none', 'endDot': 'filled', 'color': '#F43F5E'},
                    {'from': [2, 0], 'to': [3.5, 3], 'startDot': 'none', 'endDot': 'none', 'color': '#10B981', 'strokeWidth': 3},
                    {'from': [3.5, 3], 'to': [5, 0], 'startDot': 'none', 'endDot': 'filled', 'color': '#10B981', 'strokeWidth': 3}
                ],
                'points': [
                    {'x': -4, 'y': 0, 'label': '(-4, 0)', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'},
                    {'x': -1, 'y': 0, 'label': '(-1, 0)', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'},
                    {'x': 2, 'y': 0, 'label': '(2, 0)', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'},
                    {'x': 5, 'y': 0, 'label': '(5, 0)', 'dot': 'filled', 'color': '#10B981', 'attach': 'ne'}
                ]
            }
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-9-4-3',
            source='Informator CKE • Zad. 33',
            question='Na rysunku przedstawiono wykres funkcji $f$. Równanie $f(x) = -1$ ma w przedziale $[-4, 5]$ dokładnie',
            options_data=[
                ('A', '3 rozwiązania'),
                ('B', '2 rozwiązania'),
                ('C', '1 rozwiązanie'),
                ('D', '0 rozwiązań')
            ],
            correct_id='A',
            explanation='Prowadzimy poziomą linię na wysokości $y = -1$. Linia ta przecina wykres funkcji dokładnie w 3 punktach, zatem równanie ma 3 rozwiązania.',
            cke_trap='Zawsze policz wszystkie przecięcia, uważając na puste kółka na końcach wykresu.',
            plot={
                'type': 'PIECEWISE_LINEAR',
                'xRange': [-5, 6],
                'yRange': [-3, 3],
                'gridStep': 1,
                'segments': [
                    {'from': [-4, 1], 'to': [-2, -2], 'startDot': 'filled', 'endDot': 'filled', 'color': '#38BDF8'},
                    {'from': [-2, -2], 'to': [1, 2], 'startDot': 'none', 'endDot': 'filled', 'color': '#38BDF8'},
                    {'from': [1, 2], 'to': [4, -2], 'startDot': 'none', 'endDot': 'filled', 'color': '#38BDF8'},
                    {'from': [4, -2], 'to': [5, -2], 'startDot': 'none', 'endDot': 'filled', 'color': '#38BDF8'}
                ],
                'horizontalLines': [
                    {'y': -1, 'dashed': True, 'color': '#F43F5E', 'label': 'y = -1'}
                ],
                'points': [
                    {'x': -4, 'y': 1, 'label': '(-4, 1)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'nw'},
                    {'x': -3, 'y': -1, 'label': 'x₁', 'dot': 'filled', 'color': '#F43F5E', 'attach': 'sw'},
                    {'x': -1, 'y': -1, 'label': 'x₂', 'dot': 'filled', 'color': '#F43F5E', 'attach': 'se'},
                    {'x': 3, 'y': -1, 'label': 'x₃', 'dot': 'filled', 'color': '#F43F5E', 'attach': 'se'},
                    {'x': 5, 'y': -2, 'label': '(5, -2)', 'dot': 'filled', 'color': '#38BDF8', 'attach': 'se'}
                ]
            }
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-9-4-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Wykres funkcji $f$ przecina poziomą prostą $y = 0$ w punktach o odciętych $-3$, $1$ oraz $4$. Ile rozwiązań ma równanie $f(x) = 0$? Wpisz liczbę w pole poniżej.',
            correct_val='3',
            explanation='Równanie $f(x) = 0$ to pytanie o miejsca zerowe. Skoro wykres przecina oś $OX$ w 3 punktach, równanie ma dokładnie 3 rozwiązania.',
            cke_trap='Liczba rozwiązań to liczba punktów przecięcia wykresu z osią OX.'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-9-4-5',
            source='Informator CKE • Zad. 34',
            question='Na rysunku przedstawiono wykres funkcji $f$ w przedziale $[-4, 5]$. Na podstawie wykresu wyznacz: a) zbiór rozwiązań nierówności $f(x) > 0$, b) liczbę rozwiązań równania $f(x) = 2$. Zapisz pełne uzasadnienie.',
            points=2,
            scoring_key='1 pkt – poprawne odczytanie zbioru rozwiązań nierówności $f(x) > 0$: $(-4, -1) \\cup (2, 5)$.\\n2 pkt – narysowanie prostej poziomej $y = 2$ i podanie poprawnej liczby rozwiązań równania $f(x) = 2$: dokładnie 3 rozwiązania.',
            explanation='1) Nierówność $f(x) > 0$ oznacza fragmenty wykresu położone ściśle nad osią $OX$:\nWykres leży nad osią dla $x \\in (-4, -1) \\cup (2, 5)$.\n2) Równanie $f(x) = 2$ oznacza punkty wspólne wykresu z prostą poziomą $y = 2$:\nProsta $y = 2$ przecina wykres w 3 punktach (w gałęzi rosnącej, malejącej i ponownie rosnącej).\nZatem równanie ma dokładnie 3 rozwiązania.',
            cke_trap='Pamiętaj: dla ostrej nierówności $f(x) > 0$ miejsca zerowe $-4, -1, 2, 5$ są wykluczone (nawiasy okrągłe).'
        )
    ]
    l4 = make_lesson(
        lesson_id='lesson-9-4',
        topic_id=topic_id,
        title='Odczytywanie liczby rozwiązań równania f(x) = m oraz nierówności f(x) > 0',
        concept_essence='Wykres pozwala natychmiast rozwiązywać równania i nierówności bez liczenia wzorów: 1) Równanie $f(x) = m$ — kładziesz na wykresie poziomą linijkę na wysokości $y = m$ i liczysz punkty przecięcia. Liczba przecięć = liczba rozwiązań równania. 2) Nierówność $f(x) > 0$ — szukasz części wykresu leżącej NAD osią $OX$ i odczytujesz przedział iksów (nawiasy okrągłe). 3) Nierówność $f(x) \\le 0$ — szukasz części wykresu leżącej POD osią $OX$ lub na osi (nawiasy domknięte w miejscach zerowych).',
        matura_context='Standardowe zadanie testowe za 1 punkt występujące w każdym arkuszu maturalnym CKE.',
        core_formulas=[],
        worked_example={
            'problem': 'Dla jakich wartości parametru $m$ równanie $f(x) = m$ ma dokładnie 2 rozwiązania, jeśli wierzchołek paraboli to $W(2, 4)$, a ramiona idą w dół?',
            'steps': [
                {'num': 1, 'label': 'Analiza wysokości wierzchołka', 'text': 'Wierzchołek ma $y = 4$ — to najwyższy punkt paraboli. Dla $m = 4$ prosta styka się w 1 punkcie.'},
                {'num': 2, 'label': 'Analiza poniżej wierzchołka', 'text': 'Dla każdego $m < 4$ prosta pozioma przecina oba ramiona paraboli, dając dokładnie 2 punkty.'},
                {'num': 3, 'label': 'Zapisanie wyniku CKE', 'text': 'Równanie ma 2 rozwiązania dla $m \\in (-\\infty, 4)$.'}
            ],
            'result': 'm \\in (-\\infty, 4)'
        },
        exam_trap='Typowy błąd: Podawanie przedziału iksów zamiast wartości parametru $m$ (który jest rzędną igrek prostej poziomej).\n\nPoprawnie: Parametr $m$ to ZAWSZE wysokość na osi pionowej $OY$!',
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
        'description': 'Odczytywanie dziedziny, zbioru wartości, miejsc zerowych, monotoniczności oraz liczby rozwiązań równań z wykresu funkcji.',
        'lessons': lessons
    }

if __name__ == '__main__':
    t = build_topic_09()
    print(f"Pomyślnie zbudowano {t['title']} ({len(t['lessons'])} lekcje, {sum(len(l['tasks']) for l in t['lessons'])} zadań).")
