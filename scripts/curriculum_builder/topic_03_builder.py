"""
topic_03_builder.py - Dział 1.3: Wartość bezwzględna (3 lekcje | Tier S)
Matryca 5-Task: Baza (SC/TF) -> Pułapka CKE (SC) -> Autentyk CKE (SC) -> Numeryczne (NUMERIC_INPUT) -> Otwarte CKE (OPEN_TASK/OPEN_PROOF)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_03 import get_topic_03_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_open_proof, make_lesson

def build_topic_03():
    topic_id = 'dzial-3'
    topic_title = 'Wartość bezwzględna'
    topic_number = 3
    lessons = []

    # ----------------------------------------------------
    # Lekcja 3.1: Definicja geometryczna i odległość na osi (L1.3.1)
    # ----------------------------------------------------
    v1 = get_topic_03_visuals(0)
    l1_tasks = [
        # Zadanie 1: Rozgrzewka / Baza pojęciowa
        make_sc_task(
            task_id='task-3-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Odległość na osi liczbowej między liczbami $x = -3$ oraz $y = 5$ jest równa',
            options_data=[
                ('A', '$2$'),
                ('B', '$8$'),
                ('C', '$-8$'),
                ('D', '$15$')
            ],
            correct_id='B',
            explanation='Odległość na osi liczymy ze wzoru $|x - y| = |5 - (-3)| = |5 + 3| = |8| = 8$. Odległość jest zawsze nieujemna.',
            cke_trap='Uważaj na podwójny minus: odejmowanie liczby ujemnej daje dodawanie ($5 - (-3) = 8$, nie $2$).'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka egzaminacyjna
        make_sc_task(
            task_id='task-3-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Równanie $|x + 4| = 7$ zapisane w postaci odległości na osi to $|x - (-4)| = 7$. Oznacza to odległość od liczby',
            options_data=[
                ('A', '$4$ wynoszącą $7$'),
                ('B', '$-4$ wynoszącą $7$'),
                ('C', '$-7$ wynoszącą $4$'),
                ('D', '$7$ wynoszącą $-4$')
            ],
            correct_id='B',
            explanation='Wzór na odległość to $|x - a|$. Znak plus oznacza minus przed liczbą ujemną: $|x + 4| = |x - (-4)|$. Środkiem jest liczba $-4$.',
            cke_trap='Gdy widzisz plus wewnątrz wartości bezwzględnej, środek leży po stronie ujemnej osi (w punkcie -4, a nie 4).'
        ),
        # Zadanie 3: Autentyk CKE Zamknięty 1:1
        make_sc_task(
            task_id='task-3-1-3',
            source='Matura czerwiec 2023 • Zad. 1',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWszystkich liczb całkowitych dodatnich spełniających nierówność $|x + 5| < 15$ jest',
            options_data=[
                ('A', '$9$'),
                ('B', '$10$'),
                ('C', '$20$'),
                ('D', '$21$')
            ],
            correct_id='A',
            explanation='Rozwiązujemy nierówność: $-15 < x + 5 < 15 \\longrightarrow -20 < x < 10$. Szukamy liczb całkowitych dodatnich ($x \\ge 1$). Są to liczby: $1, 2, 3, 4, 5, 6, 7, 8, 9$. Jest ich dokładnie 9.',
            cke_trap='Zwróć uwagę na słowo DODATNICH: liczba 0 ani liczby ujemne nie należą do liczb dodatnich.'
        ),
        # Zadanie 4: Autentyk CKE Krótka Odpowiedź
        make_numeric_task(
            task_id='task-3-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz sumę wszystkich rozwiązań równania $|x - 7| = 4$. Wpisz wynik jako liczbę całkowitą.',
            correct_val='14',
            explanation='Rozwiązaniami są $x_1 = 7 - 4 = 3$ oraz $x_2 = 7 + 4 = 11$. Ich suma to $3 + 11 = 14$. Zauważ regułę: suma rozwiązań to zawsze podwojony środek: $2 \\cdot 7 = 14$.',
            cke_trap='Upewnij się, że dodajesz oba rozwiązania, a nie odejmujesz promień od środka.'
        ),
        # Zadanie 5: Zadanie Otwarte z Brudnopisem & Krokami
        make_open_task(
            task_id='task-3-1-5',
            source='Trening JASNE • Wzorzec CKE',
            question='Rozwiąż równanie z wartością bezwzględną $|2x - 6| = 8$. Zapisz pełne obliczenia i podaj wszystkie rozwiązania.',
            points=2,
            scoring_key='1 pkt – rozbicie równania na dwa przypadki: $2x - 6 = 8$ lub $2x - 6 = -8$.\\n2 pkt – poprawne rozwiązanie obu równań liniowych: $x = 7$ oraz $x = -1$.',
            explanation='Z definicji wartości bezwzględnej równanie rozbija się na dwa przypadki:\n$$2x - 6 = 8 \\quad \\text{lub} \\quad 2x - 6 = -8$$\nRozwiązujemy pierwsze równanie:\n$$2x = 14 \\longrightarrow x = 7$$\nRozwiązujemy drugie równanie:\n$$2x = -2 \\longrightarrow x = -1$$\nOdpowiedź: $x \\in \\{-1, 7\\}$.',
            cke_trap='Nie zapomnij o minusie po prawej stronie przy drugim przypadku.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-3-1',
        topic_id=topic_id,
        title='Definicja geometryczna i odległość na osi',
        concept_essence='Wartość bezwzględna to odległość na osi liczbowej. Zapis $|x|$ pyta: jak daleko od zera leży liczba $x$? Ponieważ odległość nie może być ujemna, $|-5| = 5$ oraz $|5| = 5$. Równanie $|x - a| = r$ oznacza: znajdź punkty na osi oddalone od środka $a$ o promień $r$. Wyznaczasz je dwoma krokami: w prawo ($a + r$) oraz w lewo ($a - r$).',
        matura_context='Zadanie sprawdzające interpretację geometryczną wartości bezwzględnej pojawia się co roku na maturze podstawowej CKE za 1 punkt (często jako zadanie 1 na arkuszu).',
        core_formulas=[
            {
                'title': 'Definicja algebraiczna wartości bezwzględnej',
                'latex': '|x| = \\begin{cases} x & \\text{dla } x \\ge 0 \\\\ -x & \\text{dla } x < 0 \\end{cases}',
                'description': 'Z liczby nieujemnej zostawiamy samą liczbę, z ujemnej bierzemy liczbę przeciwną.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '|-7| = -(-7) = 7, \\quad |5| = 5',
                'mnemonic': 'Wartość bezwzględna zjada minus.',
                'matura_tip': 'Wynik z kresek wartości bezwzględnej nigdy nie może być liczbą ujemną.'
            },
            {
                'title': 'Odległość na osi liczbowej',
                'latex': '|x - a| = r \\longrightarrow x = a - r \\quad \\text{lub} \\quad x = a + r',
                'description': 'Dwa rozwiązania symetryczne względem środka a w odległości r.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '|x - 3| = 5 \\longrightarrow x = 3 - 5 = -2 \\quad \\text{lub} \\quad x = 3 + 5 = 8',
                'mnemonic': 'Środek to a, odległość to r: krok w lewo i krok w prawo.',
                'matura_tip': 'Wzór ma w środku minus. Zapis $|x + 2|$ oznacza $|x - (-2)|$, czyli środek w $-2$.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż równanie $|x - 2| = 5$ korzystając z interpretacji geometrycznej.',
            'steps': [
                {'num': 1, 'label': 'Odczytanie środka i promienia', 'text': 'W równaniu $|x - a| = r$ odczytujemy środek $a = 2$ oraz promień $r = 5$.'},
                {'num': 2, 'label': 'Krok w prawo od środka', 'text': 'Od liczby $2$ idziemy o $5$ jednostek w prawo: $x_1 = 2 + 5 = 7$.'},
                {'num': 3, 'label': 'Krok w lewo od środka i wynik CKE', 'text': 'Od liczby $2$ idziemy o $5$ jednostek w lewo: $x_2 = 2 - 5 = -3$. Rozwiązaniami są liczby $x = -3$ oraz $x = 7$.'}
            ],
            'result': 'x \\in \\{-3, 7\\}'
        },
        exam_trap='Typowy błąd: Przyjmowanie środka o przeciwnym znaku, np. w równaniu $|x + 4| = 3$ uznanie, że środek to $4$.\n\nPoprawnie: $|x + 4| = |x - (-4)|$, więc środkiem jest $-4$. Rozwiązania to $-4 - 3 = -7$ oraz $-4 + 3 = -1$.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 3.2: Nierówności z wartością bezwzględną i przedziały (L1.3.2)
    # ----------------------------------------------------
    v2 = get_topic_03_visuals(1)
    l2_tasks = [
        # Zadanie 1: Rozgrzewka / Baza pojęciowa
        make_sc_task(
            task_id='task-3-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Zbiorem wszystkich rozwiązań nierówności $|x| < 4$ jest przedział',
            options_data=[
                ('A', '$(-4, 4)$'),
                ('B', '$(-\\infty, -4) \\cup (4, +\\infty)$'),
                ('C', '$[0, 4)$'),
                ('D', '$(-4, +\\infty)$')
            ],
            correct_id='A',
            explanation='Nierówność $|x| < 4$ oznacza odległość od $0$ mniejszą niż $4$, czyli przedział obustronnie otwarty $(-4, 4)$.',
            cke_trap='Znak mniejszości oznacza jeden spójny przedział wokół zera, a nie sumę skrzydeł zewnętrznych.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka egzaminacyjna
        make_sc_task(
            task_id='task-3-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Zbiorem wszystkich rozwiązań nierówności $|x - 2| \\le 3$ jest przedział',
            options_data=[
                ('A', '$(-1, 5)$'),
                ('B', '$\\langle -1, 5 \\rangle$'),
                ('C', '$(-\\infty, -1\\rangle \\cup \\langle 5, +\\infty)$'),
                ('D', '$\\langle 1, 5 \\rangle$')
            ],
            correct_id='B',
            explanation='Środek przedziału to $2$, a promień to $3$. Wyznaczamy końce: $2 - 3 = -1$ oraz $2 + 3 = 5$. Znak $\\le$ oznacza przedział domknięty: $\\langle -1, 5 \\rangle$.',
            cke_trap='Nierówność nieostra $\\le$ ZAWSZE oznacza nawiasy domknięte $\\langle -1, 5 \\rangle$. Dystraktor A ma błędne nawiasy okrągłe.'
        ),
        # Zadanie 3: Autentyk CKE Zamknięty 1:1
        make_sc_task(
            task_id='task-3-2-3',
            source='Matura maj 2024 • Zad. 1',
            question='Dana jest nierówność\n$$|x - 1| \\ge 3$$\nNa którym rysunku poprawnie zaznaczono na osi liczbowej zbiór wszystkich rozwiązań tej nierówności?',
            options_data=[
                {
                    'id': 'A',
                    'text': 'Przedział domknięty $\\langle -2, 4 \\rangle$',
                    'content_latex': '\\langle -2, 4 \\rangle',
                    'is_correct': False,
                    'numberLine': {
                        'min': -4,
                        'max': 6,
                        'ticks': [-2, 4],
                        'intervals': [{'from': -2, 'to': 4, 'fromIncluded': True, 'toIncluded': True}]
                    }
                },
                {
                    'id': 'B',
                    'text': 'Suma przedziałów $(-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)$',
                    'content_latex': '(-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)',
                    'is_correct': True,
                    'numberLine': {
                        'min': -4,
                        'max': 6,
                        'ticks': [-2, 4],
                        'intervals': [
                            {'from': None, 'to': -2, 'toIncluded': True},
                            {'from': 4, 'to': None, 'fromIncluded': True}
                        ]
                    }
                },
                {
                    'id': 'C',
                    'text': 'Suma przedziałów $(-\\infty, -4\\rangle \\cup \\langle 2, +\\infty)$',
                    'content_latex': '(-\\infty, -4\\rangle \\cup \\langle 2, +\\infty)',
                    'is_correct': False,
                    'numberLine': {
                        'min': -6,
                        'max': 4,
                        'ticks': [-4, 2],
                        'intervals': [
                            {'from': None, 'to': -4, 'toIncluded': True},
                            {'from': 2, 'to': None, 'fromIncluded': True}
                        ]
                    }
                },
                {
                    'id': 'D',
                    'text': 'Suma przedziałów $(-\\infty, -2) \\cup (4, +\\infty)$ z otwartymi kropkami',
                    'content_latex': '(-\\infty, -2) \\cup (4, +\\infty)',
                    'is_correct': False,
                    'numberLine': {
                        'min': -4,
                        'max': 6,
                        'ticks': [-2, 4],
                        'intervals': [
                            {'from': None, 'to': -2, 'toIncluded': False},
                            {'from': 4, 'to': None, 'fromIncluded': False}
                        ]
                    }
                }
            ],
            correct_id='B',
            explanation='Rozwiązujemy nierówność: $|x - 1| \\ge 3$, co oznacza $x - 1 \\le -3$ lub $x - 1 \\ge 3$. Otrzymujemy $x \\le -2$ lub $x \\ge 4$. Zbiorem rozwiązań jest suma przedziałów $(-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)$ z kółkami zamalowanymi (Rysunek B).',
            cke_trap='Znak nierówności $\\ge$ oznacza przedziały zewnętrzne z kółkami zamalowanymi.'
        ),
        # Zadanie 4: Autentyk CKE Krótka Odpowiedź
        make_numeric_task(
            task_id='task-3-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Ile liczb całkowitych spełnia nierówność $|x - 2| \\le 3$? Wpisz liczbę.',
            correct_val='7',
            explanation='Końce przedziału to $2 - 3 = -1$ oraz $2 + 3 = 5$. Zbiorem rozwiązań jest przedział domknięty $\\langle -1, 5 \\rangle$. Liczby całkowite to: $-1, 0, 1, 2, 3, 4, 5$ — jest ich dokładnie 7.',
            cke_trap='Pamiętaj o uwzględnieniu zera oraz obu końców przedziału (nawias domknięty).'
        ),
        # Zadanie 5: Zadanie Otwarte z Brudnopisem & Krokami
        make_open_task(
            task_id='task-3-2-5',
            source='Trening JASNE • Wzorzec CKE',
            question='Rozwiąż nierówność z wartością bezwzględną $|3x - 6| < 9$. Zapisz zbiór rozwiązań w postaci przedziału.',
            points=2,
            scoring_key='1 pkt – zapisanie koniunkcji warunków podwójnej nierówności: $-9 < 3x - 6 < 9$.\\n2 pkt – rozwiązanie nierówności: $-3 < 3x < 15 \\longrightarrow -1 < x < 5$, czyli $x \\in (-1, 5)$.',
            explanation='Rozpisujemy nierówność ze znakiem mniejszości jako nierówność podwójną:\n$$-9 < 3x - 6 < 9$$\nDodajemy 6 do wszystkich stron:\n$$-3 < 3x < 15$$\nDzielimy przez 3:\n$$-1 < x < 5$$\nZbiorem rozwiązań jest przedział otwarty $x \\in (-1, 5)$.',
            cke_trap='Znak $<$ oznacza przedział otwarty, kropki na osi są puste, nawiasy okrągłe.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-3-2',
        topic_id=topic_id,
        title='Nierówności z wartością bezwzględną i przedziały',
        concept_essence='Nierówność z wartością bezwzględną sprawdza, czy punkty leżą BLISKO, czy DALEKO od środka $a$. Znak mniejszości ($|x - a| < r$) oznacza, że odległość jest mała — uczeń jest uwięziony wewnątrz jednego przedziału wokół środka: $(a - r, a + r)$. Znak większości ($|x - a| > r$) oznacza, że odległość jest duża — punkty uciekają na zewnątrz w dwa skrzydła ku nieskończonościom: $(-\\infty, a - r) \\cup (a + r, +\\infty)$.',
        matura_context='Jedno z najpewniejszych zadań w arkuszu maturalnym CKE (Maj 2024 zad. 1, Czerwiec 2023 zad. 1).',
        core_formulas=[
            {
                'title': 'Nierówność ze znakiem mniejszości (wnętrze)',
                'latex': '|x - a| < r \\longrightarrow a - r < x < a + r',
                'description': 'Zbiór rozwiązań to jeden przedział ograniczony skrajnymi wartościami.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '|x - 2| < 3 \\longrightarrow -1 < x < 5 \\longrightarrow x \\in (-1, 5)',
                'mnemonic': 'Dzióbek w stronę wartości bezwzględnej zamyka cię w klatce.',
                'matura_tip': 'Dla znaku $\\le$ nawiasy są domknięte: $\\langle a - r, a + r \\rangle$.'
            },
            {
                'title': 'Nierówność ze znakiem większości (skrzydła zewnętrzne)',
                'latex': '|x - a| \\ge r \\longrightarrow x \\le a - r \\quad \\text{lub} \\quad x \\ge a + r',
                'description': 'Zbiór rozwiązań to suma dwóch przedziałów nieskończonych.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '|x - 1| \\ge 4 \\longrightarrow x \\in (-\\infty, -3\\rangle \\cup \\langle 5, +\\infty)',
                'mnemonic': 'Dzióbek w stronę liczby wyrzuca cię na zewnątrz.',
                'matura_tip': 'Pomiędzy przedziałami zawsze stoi znak sumy zbiorów ($\\cup$), nigdy część wspólna.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż nierówność $|x + 1| \\le 4$ i podaj zbiór rozwiązań w postaci przedziału.',
            'steps': [
                {'num': 1, 'label': 'Wyznaczenie środka i promienia', 'text': 'Zapisujemy $|x - (-1)| \\le 4$. Środek to $a = -1$, a dopuszczalna odległość to $r = 4$.'},
                {'num': 2, 'label': 'Wyznaczenie punktów brzegowych', 'text': 'Lewy brzeg: $-1 - 4 = -5$. Prawy brzeg: $-1 + 4 = 3$.'},
                {'num': 3, 'label': 'Zapisanie przedziału i wynik CKE', 'text': 'Znak $\\le$ oznacza obszar wewnętrzny wraz z brzegami: $x \\in \\langle -5, 3 \\rangle$.'}
            ],
            'result': 'x \\in \\langle -5, 3 \\rangle'
        },
        exam_trap='Typowy błąd: Zapisywanie skrzydeł nierówności $|x - a| > r$ jako jednego ciągu, np. $5 < x < -2$.\n\nPoprawnie: Skrzydła zewnętrzne to dwa osobne warunki połączone słowem LUB: $x < -2$ LUB $x > 5$.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 3.3: Wartość bezwzględna z wyrażeń i tożsamość pierwiastkowa (L1.3.3)
    # ----------------------------------------------------
    v3 = get_topic_03_visuals(2)
    l3_tasks = [
        # Zadanie 1: Rozgrzewka / Baza pojęciowa
        make_sc_task(
            task_id='task-3-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Liczba $|2 - \\sqrt{5}|$ jest równa',
            options_data=[
                ('A', '$2 - \\sqrt{5}$'),
                ('B', '$\\sqrt{5} - 2$'),
                ('C', '$-2 - \\sqrt{5}$'),
                ('D', '$2 + \\sqrt{5}$')
            ],
            correct_id='B',
            explanation='Szacujemy $\\sqrt{5} \\approx 2{,}24$. Wyrażenie pod kreskami jest ujemne: $2 - \\sqrt{5} < 0$. Przy opuszczaniu wartości bezwzględnej zmieniamy znaki: $|2 - \\sqrt{5}| = -(2 - \\sqrt{5}) = \\sqrt{5} - 2$.',
            cke_trap='Nigdy nie zdejmuj kresek wartości bezwzględnej bez wcześniejszego oszacowania znaku liczby wewnątrz!'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka egzaminacyjna
        make_sc_task(
            task_id='task-3-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Dla dowolnej liczby rzeczywistej $a < 0$ wyrażenie $\\sqrt{a^2} + a$ jest równe',
            options_data=[
                ('A', '$2a$'),
                ('B', '$0$'),
                ('C', '$-2a$'),
                ('D', '$a^2$')
            ],
            correct_id='B',
            explanation='Żelazna tożsamość maturalna: $\\sqrt{a^2} = |a|$. Ponieważ z założenia $a < 0$, to $|a| = -a$. Zatem $\\sqrt{a^2} + a = -a + a = 0$.',
            cke_trap='Błędne mechaniczne pisanie $\\sqrt{a^2} = a$ prowadzi do błędnej odpowiedzi $2a$. Pierwiastek arytmetyczny nigdy nie daje ujemnego wyniku.'
        ),
        # Zadanie 3: Autentyk CKE Zamknięty 1:1
        make_sc_task(
            task_id='task-3-3-3',
            source='Matura maj 2023 • Zad. 1',
            question='Na osi liczbowej zaznaczono sumę przedziałów.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nZbiór zaznaczony na osi jest zbiorem wszystkich rozwiązań nierówności',
            options_data=[
                ('A', '$|x - 3{,}5| \\ge 1{,}5$'),
                ('B', '$|x - 1{,}5| \\ge 3{,}5$'),
                ('C', '$|x - 3{,}5| \\le 1{,}5$'),
                ('D', '$|x - 1{,}5| \\le 3{,}5$')
            ],
            correct_id='B',
            explanation='Zaznaczony na osi zbiór to $(-\\infty, -2\\rangle \\cup \\langle 5, +\\infty)$. Środek tego zbioru to średnia arytmetyczna punktów brzegowych: $a = \\frac{-2 + 5}{2} = 1{,}5$. Promień to $r = 5 - 1{,}5 = 3{,}5$. Przedziały są skierowane na zewnątrz z kropkami domkniętymi, co odpowiada nierówności $|x - a| \\ge r$, czyli $|x - 1{,}5| \\ge 3{,}5$.',
            cke_trap='Nie myl środka z promieniem. Środek to średnia arytmetyczna $1{,}5$, a promień to odległość $3{,}5$.',
            number_line={
                'min': -5,
                'max': 7,
                'ticks': [-2, 5],
                'intervals': [
                    {'from': None, 'to': -2, 'toIncluded': True},
                    {'from': 5, 'to': None, 'fromIncluded': True}
                ]
            }
        ),
        # Zadanie 4: Autentyk CKE Krótka Odpowiedź
        make_numeric_task(
            task_id='task-3-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz wartość wyrażenia $|3 - \\pi| + |4 - \\pi|$. Wynik podaj jako liczbę całkowitą.',
            correct_val='1',
            explanation='Przyjmujemy $\\pi \\approx 3{,}14$. Zatem $3 - \\pi < 0$, co daje $|3 - \\pi| = \\pi - 3$. Z kolei $4 - \\pi > 0$, co daje $|4 - \\pi| = 4 - \\pi$. Suma: $(\\pi - 3) + (4 - \\pi) = 4 - 3 = 1$. Wyrazy z pi zredukowały się do zera.',
            cke_trap='Pamiętaj, że $\\pi$ leży między 3 a 4, więc jeden nawias ma znak ujemny, a drugi dodatni.'
        ),
        # Zadanie 5: Zadanie Otwarte z Brudnopisem & Krokami
        make_open_proof(
            task_id='task-3-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question='Wykaż, że dla każdej liczby rzeczywistej $x \\in (2, 5)$ wartość wyrażenia $|x - 2| - |x - 5|$ jest równa $2x - 7$. Zapisz pełne uzasadnienie.',
            points=2,
            scoring_key='1 pkt – poprawne określenie znaków obu wyrażeń pod wartością bezwzględną w przedziale $(2, 5)$: $x - 2 > 0$ oraz $x - 5 < 0$.\\n2 pkt – poprawne opuszczenie modułów: $(x - 2) - [-(x - 5)] = x - 2 + x - 5 = 2x - 7$ i sformułowanie wniosku.',
            explanation='Dla dowolnego $x \\in (2, 5)$ ustalamy znaki wnętrz modułów:\n1) $x > 2 \\longrightarrow x - 2 > 0$, zatem $|x - 2| = x - 2$.\n2) $x < 5 \\longrightarrow x - 5 < 0$, zatem $|x - 5| = -(x - 5) = 5 - x$.\nPodstawiamy do wyrażenia:\n$$|x - 2| - |x - 5| = (x - 2) - [-(x - 5)] = (x - 2) + (x - 5) = 2x - 7$$\nCo kończy dowód.',
            cke_trap='Pamiętaj o nawiasie przy opuszczaniu drugiego modułu: minus przed wyrażeniem zmienia znak.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-3-3',
        topic_id=topic_id,
        title='Wartość bezwzględna z wyrażeń i tożsamość pierwiastkowa',
        concept_essence='Pierwiastek kwadratowy z definicji NIGDY nie daje wyniku ujemnego. Dlatego najważniejsza tożsamość algebry maturalnej brzmi: $\\sqrt{x^2} = |x|$. Nigdy nie pisz $\\sqrt{x^2} = x$ bez wartości bezwzględnej! Gdy opuszczasz kreski z wyrażenia niewymiernego (np. $|1 - \\sqrt{3}|$): najpierw oszacuj wartość wewnątrz. Jeśli wnętrze jest dodatnie — zdejmujesz kreski bez zmian. Jeśli wnętrze jest ujemne — zdejmujesz kreski i zmieniasz wszystkie znaki na przeciwne.',
        matura_context='Tożsamość $\\sqrt{a^2} = |a|$ oraz opuszczanie kresek z liczb niewymiernych to stały element zadań za 1 pkt na każdej maturze majowej i czerwcowej.',
        core_formulas=[
            {
                'title': 'Żelazna tożsamość pierwiastka kwadratowego',
                'latex': '\\sqrt{a^2} = |a|',
                'description': 'Pierwiastek z kwadratu daje wartość bezwzględną z podstawy.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '\\sqrt{(-5)^2} = |-5| = 5, \\quad \\sqrt{x^2} = -x \\text{ dla } x < 0',
                'mnemonic': 'Kwadrat z pierwiastkiem kasuje się w wartość bezwzględną.',
                'matura_tip': 'Gdy w zadaniu jest założenie $x < 0$, to $\\sqrt{x^2} = -x$.'
            },
            {
                'title': 'Opuszczanie wartości bezwzględnej z różnicy liczb',
                'latex': '|a - b| = \\begin{cases} a - b & \\text{gdy } a \\ge b \\\\ b - a & \\text{gdy } a < b \\end{cases}',
                'description': 'Gdy odejmujesz większą od mniejszej, odwracasz kolejność odejmowania.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '|2 - \\sqrt{5}| = \\sqrt{5} - 2 \\quad (\\text{bo } \\sqrt{5} \\approx 2{,}24 > 2)',
                'mnemonic': 'Większa liczba minus mniejsza liczba daje wynik dodatni.',
                'matura_tip': 'Zawsze podstaw przybliżenie dziesiętne pierwiastka na brudnopisie.'
            }
        ],
        worked_example={
            'problem': 'Uprość wyrażenie $W = \\sqrt{(2 - \\sqrt{7})^2} + \\sqrt{7}$.',
            'steps': [
                {'num': 1, 'label': 'Zastosowanie tożsamości z wartością bezwzględną', 'text': 'Z tożsamości $\\sqrt{a^2} = |a|$ otrzymujemy $W = |2 - \\sqrt{7}| + \\sqrt{7}$.'},
                {'num': 2, 'label': 'Oszacowanie znaku wnętrza', 'text': 'Ponieważ $\\sqrt{7} \\approx 2{,}65$, mamy $2 - \\sqrt{7} < 0$. Wnętrze jest ujemne.'},
                {'num': 3, 'label': 'Zdjęcie kresek ze zmianą znaków i wynik CKE', 'text': '$|2 - \\sqrt{7}| = -(2 - \\sqrt{7}) = \\sqrt{7} - 2$. Zatem $W = \\sqrt{7} - 2 + \\sqrt{7} = 2\\sqrt{7} - 2$.'}
            ],
            'result': '2\\sqrt{7} - 2'
        },
        exam_trap='Typowy błąd: Pisanie $\\sqrt{(2 - \\sqrt{7})^2} = 2 - \\sqrt{7}$, co daje wynik ujemny z pierwiastka arytmetycznego.\n\nPoprawnie: Zawsze wstaw kreski wartości bezwzględnej $|2 - \\sqrt{7}|$, odwróć kolejność na $\\sqrt{7} - 2$ i dopiero redukuj.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'order': topic_number,
        'short_title': 'Wartość bezwzględna',
        'importance': 'Pewniak CKE (Tier S)',
        'matura_points_range': '1–2 pkt',
        'lessons': lessons
    }
