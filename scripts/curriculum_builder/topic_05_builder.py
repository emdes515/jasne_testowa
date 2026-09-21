"""
topic_05_builder.py - Dział 1.5: Nierówności liniowe (3 lekcje | Tier S)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_05 import get_topic_05_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_05():
    topic_id = 'dzial-5'
    topic_title = 'Dział 1.5: Nierówności liniowe'
    lessons = []

    # ----------------------------------------------------
    # Lekcja 5.1: Rozwiązywanie nierówności i zmiana zwrotu (L1.5.1)
    # ----------------------------------------------------
    v1 = get_topic_05_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-5-1-1',
            source='Rozgrzewka • Dzielenie przez liczbę ujemną',
            question='Rozwiązaniem nierówności $-3x < 12$ jest zbiór',
            options_data=[
                ('A', '$x < -4$'),
                ('B', '$x > -4$'),
                ('C', '$x > 4$'),
                ('D', '$x < 4$')
            ],
            correct_id='B',
            explanation='Dzielimy obie strony przez $-3$. Pamiętamy o żelaznej regule: dzielenie przez liczbę ujemną ODWRACA zwrot nierówności: $x > \\frac{12}{-3} \\implies x > -4$.',
            cke_trap='Zapomnienie o zmianie znaku nierówności to najczęstszy błąd maturzystów.'
        ),
        make_sc_task(
            task_id='task-5-1-2',
            source='Matura Maj 2023 • Zad. 4',
            question='Zbiorem wszystkich rozwiązań nierówności $\\frac{2 - x}{3} \\le 1$ jest przedział',
            options_data=[
                ('A', '$(-\\infty, -1]$'),
                ('B', '$[-1, +\\infty)$'),
                ('C', '$[1, +\\infty)$'),
                ('D', '$(-\\infty, 1]$')
            ],
            correct_id='B',
            explanation='1) Mnożymy przez $3$: $2 - x \\le 3$.\n2) Odejmujemy $2$: $-x \\le 1$.\n3) Dzielimy przez $-1$ ze zmianą zwrotu: $x \\ge -1$, co daje $[-1, +\\infty)$.',
            cke_trap='Uważaj przy dzieleniu $-x \\le 1$ przez $-1$: znak $\\le$ musi odwrócić się na $\\ge$.'
        ),
        make_sc_task(
            task_id='task-5-1-3',
            source='Pułapka CKE • Nawiasy z minusem',
            question='Rozwiązaniem nierówności $2(x - 1) - 3(x + 2) > 0$ jest zbiór',
            options_data=[
                ('A', '$(-\\infty, -8)$'),
                ('B', '$(-8, +\\infty)$'),
                ('C', '$(-\\infty, 8)$'),
                ('D', '$(8, +\\infty)$')
            ],
            correct_id='A',
            explanation='Wymnażamy nawiasy: $2x - 2 - 3x - 6 > 0 \\implies -x - 8 > 0 \\implies -x > 8 \\implies x < -8$. Zbiorem rozwiązań jest $(-\\infty, -8)$.',
            cke_trap='Wyraz $-3(x + 2)$ daje $-3x - 6$ (nie $+6$!). Po przeniesieniu na prawo i podzieleniu przez $-1$ znak obraca się na $<$.'
        ),
        make_tf_task(
            task_id='task-5-1-4',
            source='Trening CKE • Reguły przekształceń',
            question='Oceń prawdziwość zdania: Pomnożenie obu stron nierówności przez dowolną liczbę rzeczywistą $c$ nie zmienia jej zwrotu.',
            correct_tf='FAŁSZ',
            explanation='Mnożenie przez liczbę ujemną ($c < 0$) odwraca zwrot nierówności na przeciwny, a mnożenie przez $0$ niszczy nierówność.',
            cke_trap='Zawsze sprawdzaj znak liczby, przez którą mnożysz lub dzielisz nierówność.'
        ),
        make_numeric_task(
            task_id='task-5-1-5',
            source='Utrwalenie • Minimalna liczba całkowita',
            question='Wyznacz najmniejszą liczbę całkowitą spełniającą nierówność $5 - 2x \\le 1$.',
            correct_val=2,
            explanation='$-2x \\le 1 - 5 \\implies -2x \\le -4 \\implies x \\ge 2$. Zbiorem rozwiązań jest $[2, +\\infty)$. Najmniejszą liczbą całkowitą w tym zbiorze jest 2.',
            cke_trap='Nierówność jest słaba ($\\le$), więc liczba 2 należy do rozwiązań i jest szukanym minimum.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-5-1',
        topic_id=topic_id,
        title='L1.5.1: Rozwiązywanie nierówności liniowych i reguła zmiany zwrotu',
        concept_essence='Rozwiązywanie nierówności liniowej różni się od zwykłego równania tylko JEDNĄ żelazną zasadą: gdy mnożysz lub dzielisz obie strony przez liczbę ujemną, natychmiast odwracasz zwrot nierówności na przeciwny ($<$ staje się $>$, a $\\le$ staje się $\\ge$). Wynika to z faktu, że na osi liczbowej liczby ujemne leżą w odwrotnej kolejności (np. $2 < 5$, ale $-2 > -5$).',
        matura_context='Podstawowe zadanie za 1 punkt występujące na każdej maturze (zadania 3–5 arkusza).',
        core_formulas=[
            {
                'title': 'Dzielenie przez liczbę ujemną',
                'latex': 'ax < b \\implies x > \\frac{b}{a} \\quad \\text{dla } a < 0',
                'description': 'Zwrot nierówności zmienia się na przeciwny.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '-2x \\le 6 \\implies x \\ge -3',
                'mnemonic': 'Minus przy iksie odwraca dzióbek.',
                'matura_tip': 'Gdy na koniec masz -x, pomnóż przez -1 i natychmiast zmień znak.'
            },
            {
                'title': 'Dodawanie i odejmowanie stronami',
                'latex': 'x + c < d \\implies x < d - c',
                'description': 'Przenoszenie wyrazów nie wpływa na zwrot nierówności.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x - 4 > 10 \\implies x > 14',
                'mnemonic': 'Przenosisz ze zmianą znaku, ale zwrot zostaje ten sam.',
                'matura_tip': 'Tylko mnożenie i dzielenie przez minus obraca dzióbek.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż nierówność $4 - 3x \\ge 13$.',
            'steps': [
                {'num': 1, 'label': 'Przeniesienie wyrazu wolnego', 'text': 'Przenosimy 4 na prawą stronę: $-3x \\ge 13 - 4 \\implies -3x \\ge 9$.'},
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
        make_sc_task(
            task_id='task-5-2-1',
            source='Rozgrzewka • Kółka na osi',
            question='Warunek $x > 4$ zaznaczamy na osi liczbowej jako',
            options_data=[
                ('A', 'Półprostą w prawo od punktu 4 z kółkiem otwartym'),
                ('B', 'Półprostą w prawo od punktu 4 z kółkiem zamalowanym'),
                ('C', 'Półprostą w lewo od punktu 4 z kółkiem otwartym'),
                ('D', 'Półprostą w lewo od punktu 4 z kółkiem zamalowanym')
            ],
            correct_id='A',
            explanation='Znak ostrej nierówności ($>$) oznacza kółko otwarte (punkt 4 nie należy do rozwiązań). Liczby większe leżą na prawo ku $+\\infty$.',
            cke_trap='Kółko zamalowane stosujemy TYLKO dla znaków $\\le$ lub $\\ge$.'
        ),
        make_sc_task(
            task_id='task-5-2-2',
            source='Matura Maj 2024 • Zad. zbliżone',
            question='Na osi liczbowej zaznaczono przedział $[-3, +\\infty)$ z kółkiem zamalowanym w punkcie $-3$. Przedział ten jest zbiorem rozwiązań nierówności',
            options_data=[
                ('A', '$2x + 6 \\ge 0$'),
                ('B', '$2x + 6 > 0$'),
                ('C', '$-2x + 6 \\le 0$'),
                ('D', '$2x - 6 \\ge 0$')
            ],
            correct_id='A',
            explanation='$2x + 6 \\ge 0 \\implies 2x \\ge -6 \\implies x \\ge -3$. Kółko zamalowane odpowiada słabej nierówności ($\\ge$).',
            cke_trap='Nierówność ostra $2x + 6 > 0$ dałaby kółko otwarte i przedział $(-3, +\\infty)$.'
        ),
        make_sc_task(
            task_id='task-5-2-3',
            source='Pułapka CKE • Nawiasy przy nieskończoności',
            question='Zbiorem rozwiązań nierówności $x \\le 7$ jest przedział',
            options_data=[
                ('A', '$(-\\infty, 7]$'),
                ('B', '$[-\\infty, 7]$'),
                ('C', '$(-\\infty, 7)$'),
                ('D', '$[7, +\\infty)$')
            ],
            correct_id='A',
            explanation='Przy nieskończonościach ($-\\infty, +\\infty$) nawias jest ZAWSZE okrągły. Przy liczbie 7 jest nawias ostry, bo nierówność jest słaba ($\\le$).',
            cke_trap='Nigdy nie stawiaj nawiasu domkniętego $[$ ani $]$ przy nieskończoności!'
        ),
        make_tf_task(
            task_id='task-5-2-4',
            source='Trening CKE • Nawiasy przedziałów',
            question='Oceń prawdziwość zdania: Liczba $3$ należy do przedziału $(3, 8]$.',
            correct_tf='FAŁSZ',
            explanation='Nawias okrągły $($ przy liczbie 3 oznacza, że liczba 3 NIE należy do przedziału. Należą do niego liczby większe od 3.',
            cke_trap='Okrągły nawias to odpowiednik kółka otwartego — wyklucza punkt brzegowy.'
        ),
        make_numeric_task(
            task_id='task-5-2-5',
            source='Utrwalenie • Długość przedziału',
            question='Oblicz długość przedziału będącego zbiorem liczb spełniających jednocześnie warunki $x \\ge -2$ oraz $x \\le 5$.',
            correct_val=7,
            explanation='Przedział to $[-2, 5]$. Długość przedziału to różnica końców: $5 - (-2) = 5 + 2 = 7$.',
            cke_trap='Pamiętaj: od prawego końca odejmujesz lewy: $5 - (-2) = 7$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-5-2',
        topic_id=topic_id,
        title='L1.5.2: Zaznaczanie rozwiązań na osi liczbowej i zapis przedziałowy',
        concept_essence='Wizualizacja rozwiązań na osi liczbowej i zapis przedziałowy to podstawa komunikacji na maturze: 1) Kółko zamalowane i nawias ostry $\\langle \\dots \\rangle$ lub $[ \\dots ]$ stosujesz przy nierównościach słabych ($\\le$ lub $\\ge$) — brzeg należy do rozwiązań. 2) Kółko puste i nawias okrągły $( \\dots )$ stosujesz przy nierównościach ostrych ($<$ lub $>$) — brzeg jest wykluczony. 3) Przy nieskończoności ($-\\infty, +\\infty$) nawias jest ZAWSZE okrągły.',
        matura_context='Zadania z dopasowaniem rysunku na osi do nierówności lub zapisu przedziałowego to stały punkt matury za 1 pkt.',
        core_formulas=[
            {
                'title': 'Zapis przedziałowy nierówności słabej',
                'latex': 'x \\ge a \\implies x \\in [a, +\\infty)',
                'description': 'Kółko zamalowane, nawias domknięty przy liczbie a.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x \\ge -3 \\implies x \\in [-3, +\\infty)',
                'mnemonic': 'Zamalowane kółko to ostry nawias.',
                'matura_tip': 'Przy nieskończoności zawsze nawias okrągły.'
            },
            {
                'title': 'Zapis przedziałowy nierówności ostrej',
                'latex': 'x < b \\implies x \\in (-\\infty, b)',
                'description': 'Kółko otwarte, nawias okrągły przy liczbie b.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x < 5 \\implies x \\in (-\\infty, 5)',
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
        make_sc_task(
            task_id='task-5-3-1',
            source='Rozgrzewka • Część wspólna przedziałów',
            question='Częścią wspólną przedziałów $(-\\infty, 4)$ oraz $[1, +\\infty)$ jest przedział',
            options_data=[
                ('A', '$[1, 4)$'),
                ('B', '$(1, 4]$'),
                ('C', '$(-\\infty, +\\infty)$'),
                ('D', '$[1, 4]$')
            ],
            correct_id='A',
            explanation='Szukamy liczb, które spełniają jednocześnie $x \\ge 1$ oraz $x < 4$. Jest to przedział $[1, 4)$ (lewostronnie domknięty, prawostronnie otwarty).',
            cke_trap='Zwróć uwagę na nawiasy: przy 1 jest domknięty $[$, a przy 4 otwarty $)$.'
        ),
        make_sc_task(
            task_id='task-5-3-2',
            source='Matura Sierpień 2023 • Zad. 3',
            question='Największą liczbą całkowitą spełniającą nierówność $\\frac{x}{3} + 2 > x$ jest',
            options_data=[
                ('A', '$2$'),
                ('B', '$3$'),
                ('C', '$1$'),
                ('D', '$0$')
            ],
            correct_id='A',
            explanation='Mnożymy przez 3: $x + 6 > 3x \\implies -2x > -6 \\implies x < 3$. Nierówność jest ostra ($x < 3$), więc liczba 3 nie spełnia nierówności. Największą liczbą całkowitą mniejszą od 3 jest 2.',
            cke_trap='Dla nierówności ostrej $x < 3$ odpowiedź to 2 (nigdy 3!).'
        ),
        make_sc_task(
            task_id='task-5-3-3',
            source='Pułapka CKE • Układ sprzeczny',
            question='Zbiorem rozwiązań układu nierówności $\\begin{cases} x > 5 \\\\ x < 2 \\end{cases}$ jest',
            options_data=[
                ('A', 'Zbiór pusty $\\emptyset$'),
                ('B', '$(2, 5)$'),
                ('C', '$(-\\infty, 2) \\cup (5, +\\infty)$'),
                ('D', 'Zbiór wszystkich liczb rzeczywistych')
            ],
            correct_id='A',
            explanation='Klamra oznacza, że oba warunki muszą być spełnione jednocześnie. Nie istnieje żadna liczba, która jest jednocześnie większa od 5 i mniejsza od 2. Układ jest sprzeczny.',
            cke_trap='Nie myl klamry (część wspólna) ze spójnikiem LUB (suma przedziałów).'
        ),
        make_tf_task(
            task_id='task-5-3-4',
            source='Trening CKE • Liczby całkowite w przedziałach',
            question='Oceń prawdziwość zdania: W przedziale otwartym $(0, 1)$ nie ma żadnej liczby całkowitej.',
            correct_tf='PRAWDA',
            explanation='Liczby całkowite to $\\dots, -1, 0, 1, 2, \\dots$. Pomiędzy 0 a 1 nie ma żadnej liczby całkowitej (końce 0 i 1 nie należą do przedziału otwartego).',
            cke_trap='Przedział $(0, 1)$ zawiera nieskończenie wiele liczb rzeczywistych, ale ZERO liczb całkowitych.'
        ),
        make_numeric_task(
            task_id='task-5-3-5',
            source='Utrwalenie • Liczba rozwiązań całkowitych',
            question='Ile liczb całkowitych należy do zbioru rozwiązań układu warunków: $x > -4$ oraz $x \\le 3$?',
            correct_val=7,
            explanation='Zbiorem rozwiązań jest przedział $(-4, 3]$. Liczby całkowite to: $-3, -2, -1, 0, 1, 2, 3$. Jest ich dokładnie 7.',
            cke_trap='Liczba -4 nie wchodzi (nawias okrągły), liczba 3 wchodzi (nawias ostry).'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-5-1',
        topic_id=topic_id,
        title='L1.5.3: Układy nierówności liniowych i wyznaczanie liczb całkowitych',
        concept_essence='Układ nierówności spięty klamrą oznacza poszukiwanie części wspólnej (obszaru, w którym oba warunki zachodzą jednocześnie). Rysujesz oba przedziały na jednej osi i wybierasz fragment, gdzie linie się nakładają. Częstym pytaniem CKE jest: podaj największą lub najmniejszą liczbę całkowitą. Pamiętaj: gdy nierówność jest ostra ($x < 4$), liczba 4 odpada — poprawną odpowiedzią jest 3!',
        matura_context='Klasyczne pytanie testowe sprawdzające uważność maturzysty w zadaniu za 1 punkt.',
        core_formulas=[
            {
                'title': 'Część wspólna (koniunkcja warunków)',
                'latex': 'x \\in A \\cap B \\implies (x \\in A \\text{ oraz } x \\in B)',
                'description': 'Klamra oznacza przecięcie przedziałów.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x > 1 \\text{ i } x \\le 5 \\implies x \\in (1, 5]',
                'mnemonic': 'Klamra to wspólny dach nad dwoma przedziałami.',
                'matura_tip': 'Zaznacz oba przedziały różnymi kolorami lub kreskowaniem.'
            },
            {
                'title': 'Wyznaczanie liczb całkowitych',
                'latex': 'x < k \\implies \\max \\{x \\in \\mathbb{C}\\} = k - 1 \\quad (k \\in \\mathbb{C})',
                'description': 'Dla nierówności ostrej cofamy się o 1 do wnętrza przedziału.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x < 7 \\implies \\text{największa całkowita to } 6',
                'mnemonic': 'Ostra nierówność wyrzuca brzeg za burtę.',
                'matura_tip': 'Uważaj przy liczbach ujemnych: dla x > -5 najmniejsza całkowita to -4.'
            }
        ],
        worked_example={
            'problem': 'Wyznacz najmniejszą liczbę całkowitą spełniającą układ nierówności $\\begin{cases} 2x - 1 \\ge 5 \\\\ 3 - x > -5 \\end{cases}$.',
            'steps': [
                {'num': 1, 'label': 'Rozwiązanie pierwszej nierówności', 'text': '$2x \\ge 6 \\implies x \\ge 3$.'},
                {'num': 2, 'label': 'Rozwiązanie drugiej nierówności', 'text': '$-x > -8 \\implies x < 8$.'},
                {'num': 3, 'label': 'Część wspólna i wskazanie liczby całkowitej', 'text': 'Część wspólna to $x \\in [3, 8)$. Ponieważ przy 3 przedział jest domknięty, najmniejszą liczbą całkowitą jest 3.'}
            ],
            'result': '3'
        },
        exam_trap='Typowy błąd: Wskazanie liczby brzegowej przy nierówności ostrej, np. dla $x < 4$ podanie odpowiedzi 4.\n\nPoprawnie: Dla $x < 4$ liczba 4 NIE spełnia nierówności ($4 < 4$ to fałsz). Największą całkowitą jest 3.',
        visuals=v3,
        tasks=l3_tasks
    )
    # Popraw lesson_id na lesson-5-3
    l3['id'] = 'lesson-5-3'
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'tier': 'Tier S',
        'badge': 'NA 30% • PEWNIAK MATURALNY',
        'estimated_time_formatted': '3 lekcje (~15 min)',
        'description': 'Rozwiązywanie nierówności liniowych, reguła zmiany zwrotu przy dzieleniu przez ujemną, zapis przedziałowy i wyznaczanie liczb całkowitych w przedziale.',
        'lessons': lessons
    }
