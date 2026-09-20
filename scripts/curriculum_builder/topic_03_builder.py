"""
topic_03_builder.py - Dział 1.3: Wartość bezwzględna (3 lekcje | Tier S)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_03 import get_topic_03_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_03():
    topic_id = 'dzial-3'
    topic_title = 'Dział 1.3: Wartość bezwzględna'
    lessons = []

    # ----------------------------------------------------
    # Lekcja 3.1: Definicja geometryczna wartości bezwzględnej (L1.3.1)
    # ----------------------------------------------------
    v1 = get_topic_03_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-3-1-1',
            source='Rozgrzewka • Odległość na osi',
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
        make_sc_task(
            task_id='task-3-1-2',
            source='Matura Maj 2023 • Formuła 2023',
            question='Równanie $|x - 3| = 5$ opisuje punkty na osi liczbowej, których odległość od liczby $3$ wynosi $5$. Rozwiązaniami tego równania są liczby',
            options_data=[
                ('A', '$x = -2$ oraz $x = 8$'),
                ('B', '$x = 2$ oraz $x = 8$'),
                ('C', '$x = -8$ oraz $x = 2$'),
                ('D', '$x = -5$ oraz $x = 5$')
            ],
            correct_id='A',
            explanation='Geometrycznie: szukamy liczb w odległości $5$ od $3$. W prawo: $3 + 5 = 8$. W lewo: $3 - 5 = -2$. Sprawdzenie: $|8 - 3| = 5$ oraz $|-2 - 3| = |-5| = 5$.',
            cke_trap='Nie zapominaj o skoku w lewo: równanie z wartością bezwzględną ma ZAWSZE dwa rozwiązania po obu stronach środka.'
        ),
        make_sc_task(
            task_id='task-3-1-3',
            source='Pułapka CKE • Znak wewnątrz wartości bezwzględnej',
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
        make_tf_task(
            task_id='task-3-1-4',
            source='Trening CKE • Własności odległości',
            question='Oceń prawdziwość zdania: Równanie $|x - 2| = -3$ nie posiada żadnych rozwiązań w zbiorze liczb rzeczywistych.',
            correct_tf='PRAWDA',
            explanation='Wartość bezwzględna to odległość, a odległość z definicji nigdy nie może być ujemna. Wynik równy -3 oznacza sprzeczność.',
            cke_trap='Nie próbuj rozwiązywać $x - 2 = -3$ ani $x - 2 = 3$ — najpierw sprawdź prawą stronę! Ujemna prawa strona to natychmiastowy brak rozwiązań.'
        ),
        make_numeric_task(
            task_id='task-3-1-5',
            source='Utrwalenie • Suma rozwiązań',
            question='Oblicz sumę wszystkich rozwiązań równania $|x - 7| = 4$.',
            correct_val=14,
            explanation='Rozwiązaniami są $x_1 = 7 - 4 = 3$ oraz $x_2 = 7 + 4 = 11$. Ich suma to $3 + 11 = 14$. Zauważ regułę: suma rozwiązań to zawsze podwojony środek: $2 \\cdot 7 = 14$.',
            cke_trap='Upewnij się, że dodajesz oba rozwiązania, a nie odejmujesz promień od środka.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-3-1',
        topic_id=topic_id,
        title='L1.3.1: Definicja geometryczna wartości bezwzględnej (|x - a| = r)',
        concept_essence='Wartość bezwzględna to po prostu odległość na osi liczbowej. Gdy widzisz $|x|$, pytasz: jak daleko od zera leży $x$? Ponieważ odległość nie może być ujemna, $|-5| = 5$ oraz $|5| = 5$. Zapis $|x - a| = r$ oznacza: punkty na osi oddalone od liczby $a$ o dokładnie $r$ jednostek. Stawiasz cyrkiel w punkcie $a$ i robisz $r$ kroków w prawo ($a + r$) oraz $r$ kroków w lewo ($a - r$).',
        matura_context='Zadanie sprawdzające interpretację geometryczną wartości bezwzględnej pojawia się co roku na maturze podstawowej CKE za 1 punkt (często jako zadanie 1 na arkuszu).',
        core_formulas=[
            {
                'title': 'Definicja algebraiczna wartości bezwzględnej',
                'latex': '|x| = \\begin{cases} x & \\text{dla } x \\ge 0 \\\\ -x & \\text{dla } x < 0 \\end{cases}',
                'description': 'Z liczby nieujemnej zostawiamy samą liczbę, z ujemnej bierzemy liczbę przeciwną.',
                'in_cke_sheet': True,
                'cke_page': 'str. 2',
                'example': '|-7| = -(-7) = 7, \\quad |5| = 5',
                'mnemonic': 'Wartość bezwzględna zjada minus.',
                'matura_tip': 'Wynik z kresek wartości bezwzględnej nigdy nie może być liczbą ujemną.'
            },
            {
                'title': 'Odległość na osi liczbowej',
                'latex': '|x - a| = r \\implies x = a - r \\quad \\text{lub} \\quad x = a + r',
                'description': 'Dwa rozwiązania symetryczne względem środka a w odległości r.',
                'in_cke_sheet': True,
                'cke_page': 'str. 2',
                'example': '|x - 3| = 5 \\implies x = 3 - 5 = -2 \\quad \\text{lub} \\quad x = 3 + 5 = 8',
                'mnemonic': 'Środek to a, odległość to r: krok w lewo i krok w prawo.',
                'matura_tip': 'Wzór ma w środku minus. Zapis |x + 2| oznacza |x - (-2)|, czyli środek w -2.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż równanie $|x - 2| = 5$ korzystając z interpretacji geometrycznej.',
            'steps': [
                {'num': 1, 'label': 'Odczytanie środka i promienia', 'text': 'W równaniu $|x - a| = r$ odczytujemy środek $a = 2$ oraz promień $r = 5$.'},
                {'num': 2, 'label': 'Krok w prawo od środka', 'text': 'Od liczby 2 idziemy o 5 jednostek w prawo: $x_1 = 2 + 5 = 7$.'},
                {'num': 3, 'label': 'Krok w lewo od środka i wynik CKE', 'text': 'Od liczby 2 idziemy o 5 jednostek w lewo: $x_2 = 2 - 5 = -3$. Rozwiązaniami są liczby $x = -3$ oraz $x = 7$.'}
            ],
            'result': 'x \\in \\{-3, 7\\}'
        },
        exam_trap='Typowy błąd: Przyjmowanie środka o przeciwnym znaku, np. w równaniu $|x + 4| = 3$ uznanie, że środek to $4$.\n\nPoprawnie: $|x + 4| = |x - (-4)|$, więc środkiem jest $-4$. Rozwiązania to $-4 - 3 = -7$ oraz $-4 + 3 = -1$.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 3.2: Nierówności z wartością bezwzględną (L1.3.2)
    # ----------------------------------------------------
    v2 = get_topic_03_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-3-2-1',
            source='Rozgrzewka • Znak mniejszości',
            question='Zbiorem wszystkich rozwiązań nierówności $|x| < 4$ jest przedział',
            options_data=[
                ('A', '$(-4, 4)$'),
                ('B', '$(-\\infty, -4) \\cup (4, +\\infty)$'),
                ('C', '$[0, 4)$'),
                ('D', '$(-4, +\\infty)$')
            ],
            correct_id='A',
            explanation='Odległość od zera mniejsza niż 4 oznacza uwięzienie wewnątrz przedziału między -4 a 4: $x \\in (-4, 4)$.',
            cke_trap='Znak $<$ zamyka zbiór rozwiązań w jednym spójnym przedziale (nie rozbija na dwa skrzydła).'
        ),
        make_sc_task(
            task_id='task-3-2-2',
            source='Matura Maj 2024 • Zad. 1',
            question='Zbiorem wszystkich rozwiązań nierówności $|x - 1| \\ge 3$ jest',
            options_data=[
                ('A', '$[-2, 4]$'),
                ('B', '$(-\\infty, -2] \\cup [4, +\\infty)$'),
                ('C', '$(-\\infty, -4] \\cup [2, +\\infty)$'),
                ('D', '$(-2, 4)$')
            ],
            correct_id='B',
            explanation='Środek to 1, dopuszczalna odległość to co najmniej 3. Punkty brzegowe: $1 - 3 = -2$ oraz $1 + 3 = 4$. Znak $\\ge$ oznacza odległość większą lub równą, czyli ucieczkę na zewnątrz: $(-\\infty, -2] \\cup [4, +\\infty)$.',
            cke_trap='Znak $\\ge$ ZAWSZE daje sumę dwóch rozłącznych przedziałów skierowanych ku nieskończonościom.'
        ),
        make_sc_task(
            task_id='task-3-2-3',
            source='Pułapka CKE • Odczyt nierówności z osi',
            question='Przedział $(-5, 1)$ jest zbiorem rozwiązań pewnej nierówności. Wyznacz jej środek $a$ i promień $r$',
            options_data=[
                ('A', 'Środek $a = -2$, promień $r = 3$ (nierówność $|x + 2| < 3$)'),
                ('B', 'Środek $a = 2$, promień $r = 3$ (nierówność $|x - 2| < 3$)'),
                ('C', 'Środek $a = -3$, promień $r = 2$ (nierówność $|x + 3| < 2$)'),
                ('D', 'Środek $a = -2$, promień $r = 6$ (nierówność $|x + 2| < 6$)')
            ],
            correct_id='A',
            explanation='Środek przedziału to średnia arytmetyczna końców: $a = \\frac{-5 + 1}{2} = -2$. Promień to połowa długości przedziału: $r = \\frac{1 - (-5)}{2} = 3$. Zatem nierówność to $|x - (-2)| < 3 \\iff |x + 2| < 3$.',
            cke_trap='Długość przedziału to $1 - (-5) = 6$, więc promień to połowa, czyli 3 (nie 6!).'
        ),
        make_tf_task(
            task_id='task-3-2-4',
            source='Trening CKE • Nietypowe nierówności',
            question='Oceń prawdziwość zdania: Nierówność $|x - 5| < 0$ nie posiada żadnych rozwiązań w zbiorze liczb rzeczywistych.',
            correct_tf='PRAWDA',
            explanation='Wartość bezwzględna jest zawsze większa lub równa zero. Nie istnieje żadna liczba, której wartość bezwzględna byłaby mniejsza od zera.',
            cke_trap='Nierówność $|x - 5| \\le 0$ miałaby jedno rozwiązanie ($x = 5$), ale ostra nierówność $< 0$ nie ma żadnych rozwiązań.'
        ),
        make_numeric_task(
            task_id='task-3-2-5',
            source='Utrwalenie • Liczby całkowite w przedziale',
            question='Ile liczb całkowitych spełnia nierówność $|x - 2| \\le 3$?',
            correct_val=7,
            explanation='Końce przedziału to $2 - 3 = -1$ oraz $2 + 3 = 5$. Zbiorem rozwiązań jest przedział domknięty $[-1, 5]$. Liczby całkowite to: $-1, 0, 1, 2, 3, 4, 5$ — jest ich dokładnie 7.',
            cke_trap='Pamiętaj o uwzględnieniu zera oraz obu końców przedziału (nawias domknięty).'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-3-2',
        topic_id=topic_id,
        title='L1.3.2: Nierówności z wartością bezwzględną (|x - a| < r oraz |x - a| >= r)',
        concept_essence='Nierówność z wartością bezwzględną to pytanie o to, czy punkty leżą BLISKO, czy DALEKO od środka $a$. Znak mniejszości ($|x - a| < r$) oznacza, że odległość jest mała — jesteś uwięziony wewnątrz jednego przedziału wokół środka: $(a - r, a + r)$. Znak większości ($|x - a| > r$) oznacza, że odległość jest duża — uciekasz na zewnątrz w dwa skrzydła ku nieskończonościom: $(-\\infty, a - r) \\cup (a + r, +\\infty)$.',
        matura_context='Jedno z najpewniejszych zadań w arkuszu maturalnym CKE (Maj 2024 zad. 1, Czerwiec 2023 zad. 1).',
        core_formulas=[
            {
                'title': 'Nierówność ze znakiem mniejszości (wnętrze)',
                'latex': '|x - a| < r \\iff a - r < x < a + r',
                'description': 'Zbiór rozwiązań to jeden przedział ograniczony skrajnymi wartościami.',
                'in_cke_sheet': True,
                'cke_page': 'str. 2',
                'example': '|x - 2| < 3 \\implies -1 < x < 5 \\implies x \\in (-1, 5)',
                'mnemonic': 'Dzióbek w stronę wartości bezwzględnej zamyka cię w klatce.',
                'matura_tip': 'Dla znaku <= nawiasy są domknięte: [a - r, a + r].'
            },
            {
                'title': 'Nierówność ze znakiem większości (skrzydła zewnętrzne)',
                'latex': '|x - a| \\ge r \\iff x \\le a - r \\quad \\text{lub} \\quad x \\ge a + r',
                'description': 'Zbiór rozwiązań to suma dwóch przedziałów nieskończonych.',
                'in_cke_sheet': True,
                'cke_page': 'str. 2',
                'example': '|x - 1| \\ge 4 \\implies x \\in (-\\infty, -3] \\cup [5, +\\infty)',
                'mnemonic': 'Dzióbek w stronę liczby wyrzuca cię na zewnątrz.',
                'matura_tip': 'Pomiędzy przedziałami zawsze stoi znak sumy zbiorów (U), nigdy część wspólna.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż nierówność $|x + 1| \\le 4$ i podaj zbiór rozwiązań w postaci przedziału.',
            'steps': [
                {'num': 1, 'label': 'Wyznaczenie środka i promienia', 'text': 'Zapisujemy $|x - (-1)| \\le 4$. Środek to $a = -1$, a dopuszczalna odległość to $r = 4$.'},
                {'num': 2, 'label': 'Wyznaczenie punktów brzegowych', 'text': 'Lewy brzeg: $-1 - 4 = -5$. Prawy brzeg: $-1 + 4 = 3$.'},
                {'num': 3, 'label': 'Zapisanie przedziału i wynik CKE', 'text': 'Znak $\\le$ oznacza obszar wewnętrzny wraz z brzegami: $x \\in [-5, 3]$.'}
            ],
            'result': 'x \\in [-5, 3]'
        },
        exam_trap='Typowy błąd: Zapisywanie skrzydeł nierówności $|x - a| > r$ jako jednego bezsensownego ciągu, np. $5 < x < -2$.\n\nPoprawnie: Skrzydła zewnętrzne to dwa OSOBNE warunki połączone słowem LUB: $x < -2$ LUB $x > 5$.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 3.3: Wartość bezwzględna z wyrażeń i tożsamość sqrt(x^2) = |x| (L1.3.3)
    # ----------------------------------------------------
    v3 = get_topic_03_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-3-3-1',
            source='Rozgrzewka • Opuszczanie kresek wartości bezwzględnej',
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
        make_sc_task(
            task_id='task-3-3-2',
            source='Matura Czerwiec 2023 • Zad. 2',
            question='Dla dowolnej liczby rzeczywistej $a < 0$ wyrażenie $\\sqrt{a^2} + a$ jest równe',
            options_data=[
                ('A', '$2a$'),
                ('B', '$0$'),
                ('C', '$-2a$'),
                ('D', '$a^2$')
            ],
            correct_id='B',
            explanation='Żelazna tożsamość maturalna: $\\sqrt{a^2} = |a|$. Ponieważ z założenia $a < 0$, to $|a| = -a$. Zatem $\\sqrt{a^2} + a = -a + a = 0$.',
            cke_trap='Odruchowe pisanie $\\sqrt{a^2} = a$ prowadzi do błędnej odpowiedzi $2a$. Pierwiastek arytmetyczny NIGDY nie daje ujemnego wyniku!'
        ),
        make_sc_task(
            task_id='task-3-3-3',
            source='Pułapka CKE • Kwadrat pod pierwiastkiem',
            question='Dla liczby $x < 3$ wyrażenie $\\sqrt{x^2 - 6x + 9}$ jest równe',
            options_data=[
                ('A', '$x - 3$'),
                ('B', '$3 - x$'),
                ('C', '$x + 3$'),
                ('D', '$-x - 3$')
            ],
            correct_id='B',
            explanation='Zwijamy pod pierwiastkiem wzór skróconego mnożenia: $\\sqrt{x^2 - 6x + 9} = \\sqrt{(x - 3)^2} = |x - 3|$. Ponieważ $x < 3$, to $x - 3 < 0$, a więc $|x - 3| = -(x - 3) = 3 - x$.',
            cke_trap='Pamiętaj o dwóch krokach: najpierw zwiń do $|x - 3|$, a potem sprawdź znak na podstawie założenia $x < 3$.'
        ),
        make_tf_task(
            task_id='task-3-3-4',
            source='Trening CKE • Pierwiastek arytmetyczny',
            question='Oceń prawdziwość zdania: Dla liczby $x = -4$ wartość wyrażenia $\\sqrt{x^2}$ wynosi $4$.',
            correct_tf='PRAWDA',
            explanation='$\\sqrt{(-4)^2} = \\sqrt{16} = 4$. Wynik pierwiastka arytmetycznego jest zawsze nieujemny.',
            cke_trap='Nie myl $\\sqrt{(-4)^2} = 4$ z $(\\sqrt{-4})^2$, które nie istnieje w liczbach rzeczywistych.'
        ),
        make_numeric_task(
            task_id='task-3-3-5',
            source='Utrwalenie • Wartość wyrażenia z pi',
            question='Oblicz wartość wyrażenia $|3 - \\pi| + |4 - \\pi|$. Wynik podaj jako liczbę całkowitą.',
            correct_val=1,
            explanation='Przyjmujemy $\\pi \\approx 3{,}14$. Zatem $3 - \\pi < 0$, co daje $|3 - \\pi| = \\pi - 3$. Z kolei $4 - \\pi > 0$, co daje $|4 - \\pi| = 4 - \\pi$. Suma: $(\\pi - 3) + (4 - \\pi) = 4 - 3 = 1$. Wyrazy z pi zredukowały się do zera.',
            cke_trap='Pamiętaj, że $\\pi$ leży między 3 a 4, więc jeden nawias ma znak ujemny, a drugi dodatni.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-3-3',
        topic_id=topic_id,
        title='L1.3.3: Wartość bezwzględna z wyrażeń i tożsamość sqrt(x^2) = |x|',
        concept_essence='Pierwiastek kwadratowy z definicji NIGDY nie daje wyniku ujemnego. Dlatego najważniejsza tożsamość algebry maturalnej brzmi: $\\sqrt{x^2} = |x|$. Nigdy nie pisz odruchowo $\\sqrt{x^2} = x$ bez wartości bezwzględnej! Gdy opuszczasz kreski z wyrażenia niewymiernego (np. $|1 - \\sqrt{3}|$): najpierw oszacuj wartość wewnątrz. Jeśli wnętrze jest dodatnie — zdejmujesz kreski bez zmian. Jeśli wnętrze jest ujemne — zdejmujesz kreski i zmieniasz wszystkie znaki na przeciwne.',
        matura_context='Tożsamość $\\sqrt{a^2} = |a|$ oraz opuszczanie kresek z liczb niewymiernych to stały element zadań za 1 pkt na każdej maturze majowej i czerwcowej.',
        core_formulas=[
            {
                'title': 'Żelazna tożsamość pierwiastka kwadratowego',
                'latex': '\\sqrt{a^2} = |a|',
                'description': 'Pierwiastek z kwadratu daje wartość bezwzględną z podstawy.',
                'in_cke_sheet': True,
                'cke_page': 'str. 2',
                'example': '\\sqrt{(-5)^2} = |-5| = 5, \\quad \\sqrt{x^2} = -x \\text{ dla } x < 0',
                'mnemonic': 'Kwadrat z pierwiastkiem kasuje się w wartość bezwzględną.',
                'matura_tip': 'Gdy w zadaniu jest założenie x < 0, to sqrt(x^2) = -x.'
            },
            {
                'title': 'Opuszczanie wartości bezwzględnej z różnicy liczb',
                'latex': '|a - b| = \\begin{cases} a - b & \\text{gdy } a \\ge b \\\\ b - a & \\text{gdy } a < b \\end{cases}',
                'description': 'Gdy odejmujesz większą od mniejszej, odwracasz kolejność odejmowania.',
                'in_cke_sheet': True,
                'cke_page': 'str. 2',
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
        'tier': 'Tier S',
        'badge': 'NA 30% • PEWNIAK MATURALNY',
        'estimated_time_formatted': '3 lekcje (~15 min)',
        'description': 'Interpretacja geometryczna wartości bezwzględnej jako odległości na osi liczbowej, rozwiązywanie nierówności oraz żelazna tożsamość pierwiastka kwadratowego.',
        'lessons': lessons
    }
