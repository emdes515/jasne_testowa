"""
topic_05_builder.py - Dział 1.5: Nierówności liniowe (3 lekcje | Tier S)
Żelazna matryca 5-Task: T1 Baza, T2 Pułapka CKE, T3 CKE 1:1, T4 Numeryczne, T5 Otwarte/Dowód z kryteriami.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_05 import get_topic_05_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_05():
    topic_id = 'dzial-5'
    topic_title = 'Nierówności liniowe'
    topic_number = 5
    lessons = []

    # ----------------------------------------------------
    # Lekcja 5.1: Rozwiązywanie nierówności i zmiana zwrotu (L1.5.1)
    # ----------------------------------------------------
    v1 = get_topic_05_visuals(0)
    l1_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-5-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Rozwiązaniem nierówności $-3x < 12$ jest zbiór',
            options_data=[
                ('A', '$x < -4$'),
                ('B', '$x > -4$'),
                ('C', '$x > 4$'),
                ('D', '$x < 4$')
            ],
            correct_id='B',
            explanation='Dzielimy obie strony przez $-3$. Pamiętamy o żelaznej regule: dzielenie przez liczbę ujemną ODWRACA zwrot nierówności: $x > \\frac{12}{-3} \\longrightarrow x > -4$.',
            cke_trap='Zapomnienie o zmianie znaku nierówności to najczęstszy błąd maturzystów.',
            explanation_number_line={'min': -6, 'max': 2, 'ticks': [-4], 'labels': [-4], 'intervals': [{'from': -4, 'to': None, 'fromIncluded': False}]}
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-5-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Rozwiązaniem nierówności $2(x - 1) - 3(x + 2) > 0$ jest zbiór',
            options_data=[
                ('A', '$(-\\infty, -8)$'),
                ('B', '$(-8, +\\infty)$'),
                ('C', '$(-\\infty, 8)$'),
                ('D', '$(8, +\\infty)$')
            ],
            correct_id='A',
            explanation='Wymnażamy nawiasy: $2x - 2 - 3x - 6 > 0 \\longrightarrow -x - 8 > 0 \\longrightarrow -x > 8 \\longrightarrow x < -8$. Zbiorem rozwiązań jest $(-\\infty, -8)$.',
            cke_trap='Wyraz $-3(x + 2)$ daje $-3x - 6$ (nie $+6$!). Po przeniesieniu na prawo i podzieleniu przez $-1$ znak obraca się na $<$.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-5-1-3',
            source='Matura maj 2024 • Zad. 6',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nZbiorem wszystkich rozwiązań nierówności $1 - \\frac{3}{2}x < \\frac{2}{3} - x$ jest przedział',
            options_data=[
                ('A', '$(-\\infty, -\\frac{2}{3})$'),
                ('B', '$(-\\infty, \\frac{2}{3})$'),
                ('C', '$(-\\frac{2}{3}, +\\infty)$'),
                ('D', '$(\\frac{2}{3}, +\\infty)$')
            ],
            correct_id='D',
            explanation='Mnożymy obie strony nierówności przez wspólny mianownik $6$:\n$$6 \\cdot \\left(1 - \\frac{3}{2}x\\right) < 6 \\cdot \\left(\\frac{2}{3} - x\\right)$$\n$$6 - 9x < 4 - 6x$$\nPrzenosimy wyrażenia z $x$ na lewą stronę, a liczby na prawą:\n$$-9x + 6x < 4 - 6$$\n$$-3x < -2$$\nDzielimy obie strony przez $-3$, pamiętając o bezwzględnej zmianie zwrotu nierówności:\n$$x > \\frac{-2}{-3} \\longrightarrow x > \\frac{2}{3}$$\nZbiorem rozwiązań jest przedział $\\left(\\frac{2}{3}, +\\infty\\right)$.',
            cke_trap='Dzieląc obie strony nierówności przez liczbę ujemną $-3$, musisz zmienić zwrot nierówności z $<$ na $>$. Brak zmiany zwrotu prowadzi do błędnego przedziału w opcji B.',
            explanation_number_line={'min': -2, 'max': 4, 'ticks': [0.667], 'labelMap': {0.667: '\\frac{2}{3}'}, 'intervals': [{'from': 0.667, 'to': None, 'fromIncluded': False}]}
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-5-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Wyznacz najmniejszą liczbę całkowitą spełniającą nierówność $5 - 2x \\le 1$. Wpisz wynik w pole poniżej.',
            correct_val='2',
            explanation='$-2x \\le 1 - 5 \\longrightarrow -2x \\le -4 \\longrightarrow x \\ge 2$. Zbiorem rozwiązań jest $[2, +\\infty)$. Najmniejszą liczbą całkowitą w tym przedziale jest 2.',
            cke_trap='Nierówność jest słaba ($\\le$), więc liczba 2 należy do rozwiązań i jest szukanym minimum.',
            explanation_number_line={'min': -1, 'max': 6, 'ticks': [2], 'labels': [2], 'intervals': [{'from': 2, 'to': None, 'fromIncluded': True}]}
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-5-1-5',
            source='Informator CKE • Zad. 7',
            question='Rozwiąż nierówność $\\frac{2x - 3}{4} - \\frac{x + 1}{2} < \\frac{3 - x}{3}$. Zapisz zbiór rozwiązań w postaci przedziału.',
            points=2,
            scoring_key='1 pkt – poprawne pomnożenie obu stron przez wspólny mianownik 12 i redukcja wyrazów podobnych: $-15 < 12 - 4x$.\\n2 pkt – rozwiązanie nierówności i zapisanie zbioru rozwiązań: $x < \\frac{27}{4}$, czyli $x \\in (-\\infty, \\frac{27}{4})$.',
            explanation='Mnożymy obie strony nierówności przez wspólny mianownik $12$:\n$$12 \\cdot \\frac{2x - 3}{4} - 12 \\cdot \\frac{x + 1}{2} < 12 \\cdot \\frac{3 - x}{3}$$\n$$3(2x - 3) - 6(x + 1) < 4(3 - x)$$\n$$6x - 9 - 6x - 6 < 12 - 4x$$\n$$-15 < 12 - 4x$$\nPrzenosimy $4x$ na lewą stronę, a liczby na prawą:\n$$4x < 12 + 15$$\n$$4x < 27 \\longrightarrow x < \\frac{27}{4} = 6{,}75$$\nOdpowiedź: $x \\in \\left(-\\infty, \\frac{27}{4}\\right)$.',
            cke_trap='Uwaga na minus przed ułamkiem: $-6(x + 1) = -6x - 6$, a nie $-6x + 6$.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-5-1',
        topic_id=topic_id,
        title='Rozwiązywanie nierówności liniowych i reguła zmiany zwrotu',
        concept_essence='Rozwiązywanie nierówności liniowej różni się od zwykłego równania tylko JEDNĄ żelazną zasadą: gdy mnożysz lub dzielisz obie strony przez liczbę ujemną, natychmiast odwracasz zwrot nierówności na przeciwny ($<$ staje się $>$, a $\\le$ staje się $\\ge$). Wynika to z faktu, że na osi liczbowej liczby ujemne leżą w odwrotnej kolejności (np. $2 < 5$, ale $-2 > -5$).',
        matura_context='Podstawowe zadanie za 1 punkt występujące na każdej maturze (zadania 3–5 arkusza).',
        core_formulas=[
            {
                'title': 'Reguła zmiany zwrotu (dzielenie przez minus)',
                'latex': '-2x < 6 \\quad \\xrightarrow{:\\; (-2)} \\quad x > -3',
                'description': 'Gdy dzielisz lub mnożysz obie strony przez liczbę ujemną, ZAWSZE odwracasz zwrot nierówności.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '-2x \\le 6 \\quad \\xrightarrow{:\\; (-2)} \\quad x \\ge -3',
                'mnemonic': 'Minus przy iksie odwraca dzióbek.',
                'matura_tip': 'Gdy na koniec masz -x, pomnóż przez -1 i natychmiast zmień znak.'
            },
            {
                'title': 'Przenoszenie wyrazów stronami',
                'latex': '3x - 5 \\le 10 \\quad \\longrightarrow \\quad 3x \\le 10 + 5',
                'description': 'Przenoszenie wyrazów nie wpływa na zwrot nierówności.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x - 4 > 10 \\quad \\longrightarrow \\quad x > 14',
                'mnemonic': 'Przenosisz ze zmianą znaku, ale zwrot zostaje ten sam.',
                'matura_tip': 'Tylko mnożenie i dzielenie przez minus obraca dzióbek.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż nierówność $4 - 3x \\ge 13$.',
            'steps': [
                {'num': 1, 'label': 'Przeniesienie wyrazu wolnego', 'text': 'Przenosimy 4 na prawą stronę: $-3x \\ge 13 - 4 \\longrightarrow -3x \\ge 9$.'},
                {'num': 2, 'label': 'Dzielenie przez liczbę ujemną', 'text': 'Dzielimy obie strony przez $-3$ i odwracamy znak nierówności: $x \\le \\frac{9}{-3}$.'},
                {'num': 3, 'label': 'Zapisanie wyniku CKE', 'text': '$x \\le -3$, czyli w postaci przedziału: $x \\in (-\\infty, -3]$.'}
            ],
            'result': 'x \\in (-\\infty, -3]'
        },
        exam_trap='Typowy błąd: Pozostawienie znaku $\\ge$ po podzieleniu przez $-3$ (zapis $x \\ge -3$).\n\nPoprawnie: Dzielenie przez liczbę ujemną MUSI odwrócić dzióbek na $x \\le -3$.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 5.2: Zaznaczanie rozwiązań na osi i zapis przedziałowy (L1.5.2)
    # ----------------------------------------------------
    v2 = get_topic_05_visuals(1)
    l2_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-5-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Warunek $x > 4$ zaznaczamy na osi liczbowej jako',
            options_data=[
                ('A', 'Półprostą w prawo od punktu 4 z kółkiem otwartym'),
                ('B', 'Półprostą w prawo od punktu 4 z kółkiem zamalowanym'),
                ('C', 'Półprostą w lewo od punktu 4 z kółkiem otwartym'),
                ('D', 'Półprostą w lewo od punktu 4 z kółkiem zamalowanym')
            ],
            correct_id='A',
            explanation='Znak ostrej nierówności ($>$) oznacza kółko otwarte (punkt 4 nie należy do rozwiązań). Liczby większe leżą na prawo ku $+\\infty$.',
            cke_trap='Kółko zamalowane stosujemy TYLKO dla znaków $\\le$ lub $\\ge$.',
            explanation_number_line={'min': 1, 'max': 8, 'ticks': [4], 'labels': [4], 'intervals': [{'from': 4, 'to': None, 'fromIncluded': False}]}
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-5-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Zbiorem rozwiązań nierówności $x \\le 7$ jest przedział',
            options_data=[
                ('A', '$(-\\infty, 7]$'),
                ('B', '$[-\\infty, 7]$'),
                ('C', '$(-\\infty, 7)$'),
                ('D', '$[7, +\\infty)$')
            ],
            correct_id='A',
            explanation='Przy nieskończonościach ($-\\infty, +\\infty$) nawias jest ZAWSZE okrągły. Przy liczbie 7 jest nawias ostry, bo nierówność jest słaba ($\\le$).',
            cke_trap='Nigdy nie stawiaj nawiasu domkniętego $[$ ani $]$ przy nieskończoności!',
            explanation_number_line={'min': 2, 'max': 9, 'ticks': [7], 'labels': [7], 'intervals': [{'from': None, 'to': 7, 'toIncluded': True}]}
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-5-2-3',
            source='Informator CKE • Zad. 6',
            question='Na osi liczbowej zaznaczono przedział $[-3, +\\infty)$ z kółkiem zamalowanym w punkcie $-3$. Przedział ten jest zbiorem rozwiązań nierówności',
            options_data=[
                ('A', '$2x + 6 \\ge 0$'),
                ('B', '$2x + 6 > 0$'),
                ('C', '$-2x + 6 \\le 0$'),
                ('D', '$2x - 6 \\ge 0$')
            ],
            correct_id='A',
            explanation='$2x + 6 \\ge 0 \\longrightarrow 2x \\ge -6 \\longrightarrow x \\ge -3$. Kółko zamalowane odpowiada słabej nierówności ($\\ge$).',
            cke_trap='Nierówność ostra $2x + 6 > 0$ dałaby kółko otwarte i przedział $(-3, +\\infty)$.',
            explanation_number_line={'min': -5, 'max': 3, 'ticks': [-3], 'labels': [-3], 'intervals': [{'from': -3, 'to': None, 'fromIncluded': True}]}
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-5-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz długość przedziału będącego zbiorem liczb spełniających jednocześnie warunki $x \\ge -2$ oraz $x \\le 5$. Wpisz wynik w pole poniżej.',
            correct_val='7',
            explanation='Przedział to $[-2, 5]$. Długość przedziału to różnica końców: $5 - (-2) = 5 + 2 = 7$.',
            cke_trap='Pamiętaj: od prawego końca odejmujesz lewy: $5 - (-2) = 7$.'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-5-2-5',
            source='Informator CKE • Zad. 9',
            question='Dany jest przedział $A = [-4, 6)$ oraz przedział $B = (1, 8]$. Wyznacz przedział będący częścią wspólną $A \\cap B$ oraz podaj ile liczb całkowitych należy do tego zbioru.',
            points=2,
            scoring_key='1 pkt – wyznaczenie części wspólnej obu przedziałów: $A \\cap B = (1, 6)$.\\n2 pkt – wypisanie liczb całkowitych należących do przedziału $(1, 6)$: $2, 3, 4, 5$ i podanie ich liczby: 4.',
            explanation='1) Część wspólna: $x \\ge -4$ oraz $x < 6$ oraz $x > 1$ oraz $x \\le 8$.\nCzęść wspólna to przedział $(1, 6)$ (obustronnie otwarty).\n2) Liczby całkowite należące do $(1, 6)$:\nSą to liczby: $2, 3, 4, 5$.\nŁączna liczba liczb całkowitych wynosi $4$.',
            cke_trap='Krańce $1$ i $6$ nie należą do przedziału otwartego $(1, 6)$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-5-2',
        topic_id=topic_id,
        title='Zaznaczanie rozwiązań na osi liczbowej i zapis przedziałowy',
        concept_essence='Wizualizacja rozwiązań na osi liczbowej i zapis przedziałowy to podstawa komunikacji na maturze: 1) Kółko zamalowane i nawias ostry $\\langle \\dots \\rangle$ lub $[ \\dots ]$ stosujesz przy nierównościach słabych ($\\le$ lub $\\ge$) — brzeg należy do rozwiązań. 2) Kółko puste i nawias okrągły $( \\dots )$ stosujesz przy nierównościach ostrych ($<$ lub $>$) — brzeg jest wykluczony. 3) Przy nieskończoności ($-\\infty, +\\infty$) nawias jest ZAWSZE okrągły.',
        matura_context='Zadania z dopasowaniem rysunku na osi do nierówności lub zapisu przedziałowego to stały punkt matury za 1 pkt.',
        core_formulas=[
            {
                'title': 'Nierówność słaba (kółko zamalowane)',
                'latex': 'x \\ge a \\longrightarrow x \\in [a, +\\infty)',
                'description': 'Kółko zamalowane, nawias domknięty przy liczbie a.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x \\ge -3 \\longrightarrow x \\in [-3, +\\infty)',
                'mnemonic': 'Zamalowane kółko to ostry nawias.',
                'matura_tip': 'Przy nieskończoności zawsze nawias okrągły.'
            },
            {
                'title': 'Nierówność ostra (kółko puste)',
                'latex': 'x < 5 \\quad \\longrightarrow \\quad x \\in (-\\infty, 5)',
                'description': 'Kółko otwarte, nawias okrągły przy liczbie b.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x < 5 \\longrightarrow x \\in (-\\infty, 5)',
                'mnemonic': 'Kółko otwarte to okrągły nawias.',
                'matura_tip': 'Brak kreski pod znakiem oznacza kółko otwarte.'
            }
        ],
        worked_example={
            'problem': 'Zapisz w postaci przedziału zbiór rozwiązań nierówności $-2x + 1 < 7$.',
            'steps': [
                {'num': 1, 'label': 'Przekształcenie nierówności', 'text': '$-2x < 6$.'},
                {'num': 2, 'label': 'Dzielenie przez -2 ze zmianą zwrotu', 'text': '$x > -3$.'},
                {'num': 3, 'label': 'Interpretacja na osi i wynik CKE', 'text': 'Znak $>$ oznacza kółko otwarte w punkcie $-3$ i strzałkę w prawo: $x \\in (-3, +\\infty)$.'}
            ],
            'result': 'x \\in (-3, +\\infty)'
        },
        exam_trap='Typowy błąd: Użycie nawiasu kwadratowego przy symbolu nieskończoności: $(-\\infty, 5]$.\n\nPoprawnie: Nieskończoność nigdy nie jest liczbą, więc nie można jej domknąć — ZAWSZE pisz $(-\\infty$ lub $+\\infty)$.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 5.3: Układy nierówności liniowych i liczby całkowite (L1.5.3)
    # ----------------------------------------------------
    v3 = get_topic_05_visuals(2)
    l3_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-5-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Częścią wspólną przedziałów $(-\\infty, 4)$ oraz $[1, +\\infty)$ jest przedział',
            options_data=[
                ('A', '$[1, 4)$'),
                ('B', '$(1, 4]$'),
                ('C', '$(-\\infty, +\\infty)$'),
                ('D', '$[1, 4]$')
            ],
            correct_id='A',
            explanation='Szukamy liczb, które spełniają jednocześnie $x \\ge 1$ oraz $x < 4$. Jest to przedział $[1, 4)$ (lewostronnie domknięty, prawostronnie otwarty).',
            cke_trap='Zwróć uwagę na nawiasy: przy 1 jest domknięty $[$, a przy 4 otwarty $)$.',
            explanation_number_line={'min': -1, 'max': 6, 'ticks': [1, 4], 'labels': [1, 4], 'intervals': [{'from': 1, 'to': 4, 'fromIncluded': True, 'toIncluded': False}]}
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-5-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Zbiorem rozwiązań układu nierówności $\\begin{cases} x > 5 \\\\ x < 2 \\end{cases}$ jest',
            options_data=[
                ('A', 'Zbiór pusty $\\emptyset$'),
                ('B', '$(2, 5)$'),
                ('C', '$(-\\infty, 2) \\cup (5, +\\infty)$'),
                ('D', 'Zbiór wszystkich liczb rzeczywistych')
            ],
            correct_id='A',
            explanation='Klamra oznacza, że oba warunki muszą być spełnione jednocześnie. Nie istnieje żadna liczba, która jest jednocześnie większa od 5 i mniejsza od 2. Układ jest sprzeczny.',
            cke_trap='Nie myl klamry (część wspólna) ze spójnikiem LUB (suma przedziałów).',
            explanation_number_line={'min': 0, 'max': 7, 'ticks': [2, 5], 'labels': [2, 5], 'intervals': [{'from': None, 'to': 2, 'toIncluded': False}, {'from': 5, 'to': None, 'fromIncluded': False}]}
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-5-3-3',
            source='Matura czerwiec 2024 • Zad. 6',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba wszystkich całkowitych dodatnich rozwiązań nierówności $\\frac{3x - 5}{12} < \\frac{1}{3}$ jest równa',
            options_data=[
                ('A', '$2$'),
                ('B', '$3$'),
                ('C', '$5$'),
                ('D', '$6$')
            ],
            correct_id='A',
            explanation='Mnożymy obustronnie przez 12:\n$$3x - 5 < 4$$\n$$3x < 9 \\longrightarrow x < 3$$\nRozwiązaniami całkowitymi dodatnimi ($x \\in \\mathbb{N}^+$) są liczby 1 oraz 2. Jest ich dokładnie 2.\nPoprawna odpowiedź to A.',
            cke_trap='Pytanie dotyczy rozwiązań DODATNICH ($x > 0$), więc liczby 0, -1, -2... nie są wliczane! Liczba 3 również odpada, bo nierówność jest ostra ($x < 3$).',
            explanation_number_line={'min': 0, 'max': 5, 'ticks': [1, 2, 3], 'labels': [1, 2, 3], 'intervals': [{'from': None, 'to': 3, 'toIncluded': False}]}
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-5-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Ile liczb całkowitych należy do zbioru rozwiązań układu warunków: $x > -4$ oraz $x \\le 3$? Wpisz wynik w pole poniżej.',
            correct_val='7',
            explanation='Zbiorem rozwiązań jest przedział $(-4, 3]$. Liczby całkowite to: $-3, -2, -1, 0, 1, 2, 3$. Jest ich dokładnie 7.',
            cke_trap='Liczba -4 nie wchodzi (nawias okrągły), liczba 3 wchodzi (nawias ostry).',
            explanation_number_line={'min': -5, 'max': 5, 'ticks': [-4, 3], 'labels': [-4, 3], 'intervals': [{'from': -4, 'to': 3, 'fromIncluded': False, 'toIncluded': True}]}
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-5-3-5',
            source='Informator CKE • Zad. 10',
            question='Rozwiąż układ nierówności $\\begin{cases} 3(x - 2) \\le 2x + 1 \\\\ 4 - x < 8 \\end{cases}$ i podaj wszystkie liczby całkowite ujemne spełniające ten układ.',
            points=2,
            scoring_key='1 pkt – rozwiązanie obu nierówności składowych: $x \\le 7$ oraz $x > -4$, skąd część wspólna to $x \\in (-4, 7]$.\\n2 pkt – wyznaczenie i podanie wszystkich liczb całkowitych ujemnych ze zbioru rozwiązań: $-3, -2, -1$.',
            explanation='Rozwiązujemy pierwszą nierówność:\n$$3x - 6 \\le 2x + 1 \\longrightarrow 3x - 2x \\le 1 + 6 \\longrightarrow x \\le 7$$\nRozwiązujemy drugą nierówność:\n$$-x < 8 - 4 \\longrightarrow -x < 4 \\longrightarrow x > -4$$\nCzęść wspólna obu warunków:\n$$x \\in (-4, 7]$$\nLiczby całkowite ujemne należące do tego przedziału to:\n$$-3, -2, -1$$\n(Liczba $0$ nie jest ani dodatnia, ani ujemna, a $-4$ nie należy do przedziału).',
            cke_trap='Pamiętaj, że $0$ nie jest liczbą ujemną, a $-4$ odpada ze względu na nawias okrągły.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-5-3',
        topic_id=topic_id,
        title='Układy nierówności liniowych i wyznaczanie liczb całkowitych',
        concept_essence='Układ nierówności spięty klamrą oznacza poszukiwanie części wspólnej (obszaru, w którym oba warunki zachodzą jednocześnie). Rysujesz oba przedziały na jednej osi i wybierasz fragment, gdzie linie się nakładają. Częstym pytaniem CKE jest: podaj największą lub najmniejszą liczbę całkowitą. Pamiętaj: gdy nierówność jest ostra ($x < 4$), liczba 4 odpada — poprawną odpowiedzią jest 3!',
        matura_context='Klasyczne pytanie testowe sprawdzające uważność maturzysty w zadaniu za 1 punkt.',
        core_formulas=[
            {
                'title': 'Przecięcie przedziałów',
                'latex': 'x \\in A \\cap B \\longrightarrow (x \\in A \\text{ oraz } x \\in B)',
                'description': 'Klamra oznacza przecięcie przedziałów.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x > 1 \\text{ i } x \\le 5 \\longrightarrow x \\in (1, 5]',
                'mnemonic': 'Klamra to wspólny dach nad dwoma przedziałami.',
                'matura_tip': 'Zaznacz oba przedziały różnymi kolorami lub kreskowaniem.'
            },
            {
                'title': 'Liczby całkowite z przedziału',
                'latex': 'x < 7 \\quad \\longrightarrow \\quad \\text{największa całkowita to } 6',
                'description': 'Dla nierówności ostrej cofamy się o 1 do wnętrza przedziału.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x < 7 \\longrightarrow \\text{największa całkowita to } 6',
                'mnemonic': 'Ostra nierówność wyrzuca brzeg za burtę.',
                'matura_tip': 'Uważaj przy liczbach ujemnych: dla x > -5 najmniejsza całkowita to -4.'
            }
        ],
        worked_example={
            'problem': 'Wyznacz najmniejszą liczbę całkowitą spełniającą układ nierówności $\\begin{cases} 2x - 1 \\ge 5 \\\\ 3 - x > -5 \\end{cases}$.',
            'steps': [
                {'num': 1, 'label': 'Rozwiązanie pierwszej nierówności', 'text': '$2x \\ge 6 \\longrightarrow x \\ge 3$.'},
                {'num': 2, 'label': 'Rozwiązanie drugiej nierówności', 'text': '$-x > -8 \\longrightarrow x < 8$.'},
                {'num': 3, 'label': 'Część wspólna i wskazanie liczby całkowitej', 'text': 'Część wspólna to $x \\in [3, 8)$. Ponieważ przy 3 przedział jest domknięty, najmniejszą liczbą całkowitą jest 3.'}
            ],
            'result': '3'
        },
        exam_trap='Typowy błąd: Wskazanie liczby brzegowej przy nierówności ostrej, np. dla $x < 4$ podanie odpowiedzi 4.\n\nPoprawnie: Dla $x < 4$ liczba 4 NIE spełnia nierówności ($4 < 4$ to fałsz). Największą całkowitą jest 3.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'order': topic_number,
        'tier': 'Tier S',
        'badge': 'NA 30% • PEWNIAK MATURALNY',
        'estimated_time_formatted': '3 lekcje (~15 min)',
        'description': 'Rozwiązywanie nierówności liniowych, reguła zmiany zwrotu przy dzieleniu przez ujemną, zapis przedziałowy i wyznaczanie liczb całkowitych w przedziale.',
        'lessons': lessons
    }

if __name__ == '__main__':
    t = build_topic_05()
    print(f"Pomyślnie zbudowano {t['title']} ({len(t['lessons'])} lekcje, {sum(len(l['tasks']) for l in t['lessons'])} zadań).")
