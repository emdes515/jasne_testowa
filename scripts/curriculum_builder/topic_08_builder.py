"""
topic_08_builder.py - Dział 1.8: Nierówności kwadratowe (4 lekcje | Tier S+)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_08 import get_topic_08_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_08():
    topic_id = 'dzial-8'
    topic_title = 'Nierówności kwadratowe'
    topic_number = 8
    lessons = []

    # ----------------------------------------------------
    # Lekcja 8.1: Wyróżnik Delta i miejsca zerowe (L1.8.1)
    # ----------------------------------------------------
    v1 = get_topic_08_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-8-1-1',
            source='Rozgrzewka • Obliczanie Delty',
            question='Wyróżnik $\\Delta$ trójmianu kwadratowego $y = 2x^2 - 5x + 2$ jest równy',
            options_data=[
                ('A', '$9$'),
                ('B', '$-9$'),
                ('C', '$41$'),
                ('D', '$1$')
            ],
            correct_id='A',
            explanation='$\\Delta = b^2 - 4ac = (-5)^2 - 4 \\cdot 2 \\cdot 2 = 25 - 16 = 9$. Ponieważ $\\Delta > 0$, funkcja ma dwa miejsca zerowe.',
            cke_trap='Pamiętaj: $(-5)^2 = +25$, a nie $-25$. Kwadrat liczby rzeczywistej jest zawsze dodatni.'
        ),
        make_sc_task(
            task_id='task-8-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Miejscami zerowymi funkcji kwadratowej $f(x) = x^2 - 2x - 8$ są liczby',
            options_data=[
                ('A', '$x_1 = -2$ oraz $x_2 = 4$'),
                ('B', '$x_1 = 2$ oraz $x_2 = -4$'),
                ('C', '$x_1 = -2$ oraz $x_2 = -4$'),
                ('D', '$x_1 = 1$ oraz $x_2 = 8$')
            ],
            correct_id='A',
            explanation='$\\Delta = (-2)^2 - 4 \\cdot 1 \\cdot (-8) = 4 + 32 = 36$, $\\sqrt{\\Delta} = 6$. Wtedy $x_1 = \\frac{2 - 6}{2} = -2$, $x_2 = \\frac{2 + 6}{2} = 4$.',
            cke_trap='We wzorze na pierwiastki jest $-b$: dla $b = -2$ mamy $-(-2) = +2$.'
        ),
        make_sc_task(
            task_id='task-8-1-3',
            source='Pułapka CKE • Trzy minusy w iloczynie -4ac',
            question='Dla trójmianu kwadratowego $f(x) = -x^2 - 6x - 9$ wartość $\\Delta$ wynosi',
            options_data=[
                ('A', '$0$'),
                ('B', '$72$'),
                ('C', '$-72$'),
                ('D', '$36$')
            ],
            correct_id='A',
            explanation='$\\Delta = (-6)^2 - 4 \\cdot (-1) \\cdot (-9) = 36 - 36 = 0$. Trzy minusy dają łączny minus! Funkcja ma jedno miejsce zerowe $x_0 = -3$.',
            cke_trap='Iloczyn $-4 \\cdot (-1) \\cdot (-9)$ zawiera trzy minusy, więc daje $-36$, a nie $+36$.'
        ),
        make_tf_task(
            task_id='task-8-1-4',
            source='Trening CKE • Znak Delty a liczba pierwiastków',
            question='Oceń prawdziwość zdania: Jeśli $\\Delta < 0$, to funkcja kwadratowa nie posiada żadnych rzeczywistych miejsc zerowych.',
            correct_tf='PRAWDA',
            explanation='Ujemny wyróżnik oznacza brak pierwiastka rzeczywistego z $\\Delta$, a geometrycznie oznacza, że parabola nie przecina osi $OX$.',
            cke_trap='$\\Delta < 0$ oznacza brak miejsc zerowych, ale nierówność kwadratowa MOŻE mieć rozwiązania (np. cały zbiór $\\mathbb{R}$).'
        ),
        make_numeric_task(
            task_id='task-8-1-5',
            source='Utrwalenie • Odległość między pierwiastkami',
            question='Oblicz odległość między miejscami zerowymi funkcji $f(x) = x^2 - 10x + 9$.',
            correct_val=8,
            explanation='$\\Delta = 100 - 36 = 64$, $\\sqrt{\\Delta} = 8$. Pierwiastki to $x_1 = 1$, $x_2 = 9$. Odległość między nimi to $9 - 1 = 8$.',
            cke_trap='Odległość to różnica większego pierwiastka i mniejszego: $x_2 - x_1 = 8$.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-8-1',
        topic_id=topic_id,
        title='Wyróżnik Delta i miejsca zerowe trójmianu kwadratowego',
        concept_essence='Wyróżnik $\\Delta = b^2 - 4ac$ to radar funkcji kwadratowej. Informuje, ile razy parabola dotyka osi poziomej $OX$: 1) $\\Delta > 0$ — dwa miejsca zerowe: $x_1, x_2$. 2) $\\Delta = 0$ — dokładnie jedno miejsce zerowe: $x_0 = \\frac{-b}{2a}$ (parabola jest styczna do osi w wierzchołku). 3) $\\Delta < 0$ — zero miejsc zerowych (parabola unosi się w całości nad osią lub wisi pod nią).',
        matura_context='Podstawa do każdego zadania z funkcji i nierówności kwadratowej za 1–2 punkty.',
        core_formulas=[
            {
                'title': 'Wyróżnik trójmianu kwadratowego (Delta)',
                'latex': '\\Delta = b^2 - 4ac',
                'description': 'Wartość określająca liczbę pierwiastków trójmianu.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': 'x^2 - 4x + 3 \\longrightarrow \\Delta = 16 - 12 = 4',
                'mnemonic': 'b kwadrat minus 4ac.',
                'matura_tip': '$b^2$ jest ZAWSZE dodatnie lub zerem (nawet dla ujemnego $b$).'
            },
            {
                'title': 'Wzory na pierwiastki trójmianu',
                'latex': 'x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}',
                'description': 'Miejsca zerowe dla delty dodatniej.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': 'x_1 = \\frac{4 - 2}{2} = 1, \\quad x_2 = \\frac{4 + 2}{2} = 3',
                'mnemonic': 'Minus b plus/minus pierwiastek z delty przez 2a.',
                'matura_tip': 'Pamiętaj o podwojonym a w mianowniku (2a).'
            }
        ],
        worked_example={
            'problem': 'Wyznacz miejsca zerowe funkcji $f(x) = 2x^2 - 4x - 6$.',
            'steps': [
                {'num': 1, 'label': 'Wypisanie współczynników', 'text': '$a = 2, b = -4, c = -6$.'},
                {'num': 2, 'label': 'Obliczenie delty', 'text': '$\\Delta = (-4)^2 - 4 \\cdot 2 \\cdot (-6) = 16 + 48 = 64$, $\\sqrt{\\Delta} = 8$.'},
                {'num': 3, 'label': 'Obliczenie pierwiastków i wynik CKE', 'text': '$x_1 = \\frac{4 - 8}{4} = -1$, $x_2 = \\frac{4 + 8}{4} = 3$. Miejsca zerowe to $-1$ oraz $3$.'}
            ],
            'result': 'x_1 = -1, \\quad x_2 = 3'
        },
        exam_trap='Typowy błąd: Błędny znak przy potęgowaniu liczby ujemnej: pisanie $-4^2 = -16$ w delcie.\n\nPoprawnie: Zawsze pisz nawias: $(-4)^2 = +16$. Kwadrat dowolnej liczby rzeczywistej nigdy nie jest ujemny.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 8.2: Szkicowanie paraboli i odczyt przedziałów (L1.8.2)
    # ----------------------------------------------------
    v2 = get_topic_08_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-8-1-2-1',
            source='Rozgrzewka • Kierunek ramion paraboli',
            question='Dla nierówności $-2x^2 + 5x - 3 > 0$ ramiona paraboli są skierowane',
            options_data=[
                ('A', 'W dół, ponieważ współczynnik $a = -2$ jest ujemny'),
                ('B', 'W górę, ponieważ znak nierówności to $>$'),
                ('C', 'W górę, ponieważ wyraz $5x$ jest dodatni'),
                ('D', 'W prawo')
            ],
            correct_id='A',
            explanation='O kierunku ramion decyduje WYŁĄCZNIE znak współczynnika $a$ przy $x^2$. Skoro $a = -2 < 0$, ramiona idą w dół.',
            cke_trap='Znak nierówności ($>$) NIE decyduje o ramionach paraboli!'
        ),
        make_sc_task(
            task_id='task-8-1-2-2',
            source='Matura Maj 2024 • Zad. zbliżone',
            question='Zbiorem wszystkich rozwiązań nierówności $x^2 - 5x + 6 \\le 0$ jest przedział',
            options_data=[
                ('A', '$[2, 3]$'),
                ('B', '$(-\\infty, 2] \\cup [3, +\\infty)$'),
                ('C', '$(-3, -2)$'),
                ('D', '$[-3, -2]$')
            ],
            correct_id='A',
            explanation='Miejsca zerowe to $2$ i $3$. Współczynnik $a = 1 > 0$ (ramiona w górę). Parabola schodzi pod oś między pierwiastkami. Znak $\\le$ oznacza przedział domknięty: $[2, 3]$.',
            cke_trap='Znak $\\le$ daje nawiasy domknięte $[2, 3]$, a nie otwarte $(2, 3)$.'
        ),
        make_sc_task(
            task_id='task-8-1-2-3',
            source='Pułapka CKE • Ramiona w dół i wartości dodatnie',
            question='Zbiorem rozwiązań nierówności $-x^2 + 4x - 3 > 0$ jest',
            options_data=[
                ('A', '$(1, 3)$'),
                ('B', '$(-\\infty, 1) \\cup (3, +\\infty)$'),
                ('C', '$[1, 3]$'),
                ('D', 'Zbiór pusty')
            ],
            correct_id='A',
            explanation='Miejsca zerowe to $1$ i $3$. Ramiona w dół ($a = -1$). Wykres znajduje się NAD osią $OX$ ($>0$) na brzuszku między 1 a 3: $(1, 3)$.',
            cke_trap='Dla ramion w dół obszar NAD osią to wnętrze między pierwiastkami.'
        ),
        make_tf_task(
            task_id='task-8-1-2-4',
            source='Trening CKE • Ostre nierówności',
            question='Oceń prawdziwość zdania: W nierówności kwadratowej z ostrym znakiem ($>$ lub $<$) zbiór rozwiązań nigdy nie zawiera miejsc zerowych.',
            correct_tf='PRAWDA',
            explanation='W miejscach zerowych wartość wynosi dokładnie 0. Ponieważ znak jest ostry ($>0$ lub $<0$), punkty te są wykluczone (nawiasy otwarte).',
            cke_trap='Nawiasy domknięte stosujemy wyłącznie, gdy jest kreska równości ($\\le$ lub $\\ge$).'
        ),
        make_open_task(
            task_id='task-8-1-2-5',
            source='Matura czerwiec 2023 • Zad. 8',
            question='Rozwiąż nierówność\n$$x(2x - 1) < 2x$$\nZapisz obliczenia.',
            points=2,
            scoring_key=[
                '1 pkt: Zapisanie nierówności w postaci uporządkowanej 2x^2 - 3x < 0 i wyznaczenie miejsc zerowych trójmianu: x1 = 0, x2 = 3/2.',
                '2 pkt: Poprawny szkic paraboli z ramionami skierowanymi w górę i podanie zbioru rozwiązań w postaci przedziału otwartego: (0, 3/2).'
            ],
            explanation='Krok 1: Przekształcamy nierówność do postaci uporządkowanej:\n$$x(2x - 1) < 2x \\implies 2x^2 - x < 2x \\implies 2x^2 - 3x < 0.$$\nKrok 2: Wyznaczamy miejsca zerowe, wyłączając $x$ przed nawias:\n$$x(2x - 3) = 0 \\implies x_1 = 0 \\quad \\text{lub} \\quad x_2 = \\frac{3}{2}.$$\nKrok 3: Szkicujemy parabolę o ramionach skierowanych w górę ($a = 2 > 0$). Szukamy wartości mniejszych od zera ($<0$), czyli leżących pod osią $OX$.\nZbiorem rozwiązań jest przedział otwarty: $x \\in (0, \\frac{3}{2})$.',
            cke_trap='Nigdy nie dziel nierówności przez $x$! Dzielenie przez niewiadomą bez znajomości jej znaku zmienia lub gubi rozwiązania. Zawsze przenoś wszystko na jedną stronę.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-8-2',
        topic_id=topic_id,
        title='Szkicowanie paraboli i odczytywanie przedziałów rozwiązań',
        concept_essence='Rozwiązanie nierówności kwadratowej wymaga dyscypliny w 3 krokach: 1) Wyznaczasz miejsca zerowe ($x_1, x_2$). 2) Rysujesz szkic paraboli: jeśli $a > 0$, ramiona idą w górę (uśmiech); jeśli $a < 0$, ramiona idą w dół (smutek). 3) Odczytujesz przedział: gdy pytają o $> 0$, patrzysz na łuki nad osią; gdy pytają o $< 0$, patrzysz pod oś. Nigdy nie zgaduj przedziału bez 2-sekundowego szkicu na osi!',
        matura_context='Żelazny pewniak matury podstawowej — zadanie otwarte za 2 punkty lub zadanie testowe za 1 punkt.',
        core_formulas=[
            {
                'title': 'Nierówność z ramionami w górę (a > 0)',
                'latex': 'a > 0 \\longrightarrow \\begin{cases} f(x) < 0 \\longrightarrow x \\in (x_1, x_2) \\\\ f(x) > 0 \\longrightarrow x \\in (-\\infty, x_1) \\cup (x_2, +\\infty) \\end{cases}',
                'description': 'Wartości ujemne są wewnątrz, dodatnie na zewnątrz.',
                'in_cke_sheet': True,
                'cke_page': 'str. 8',
                'example': 'x^2 - 4 \\le 0 \\longrightarrow x \\in [-2, 2]',
                'mnemonic': 'Uśmiechnięta parabola nurkuje pod oś w środku.',
                'matura_tip': 'Zawsze zaznacz kropki na osi przed podaniem przedziału.'
            },
            {
                'title': 'Nierówność z ramionami w dół (a < 0)',
                'latex': 'a < 0 \\longrightarrow \\begin{cases} f(x) > 0 \\longrightarrow x \\in (x_1, x_2) \\\\ f(x) < 0 \\longrightarrow x \\in (-\\infty, x_1) \\cup (x_2, +\\infty) \\end{cases}',
                'description': 'Wartości dodatnie są wewnątrz, ujemne na zewnątrz.',
                'in_cke_sheet': True,
                'cke_page': 'str. 8',
                'example': '-x^2 + 4 > 0 \\longrightarrow x \\in (-2, 2)',
                'mnemonic': 'Smutna parabola unosi się nad oś tylko na czubku.',
                'matura_tip': 'Możesz też pomnożyć przez -1 i zmienić znak nierówności.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż nierówność $2x^2 - 8x \\le 0$.',
            'steps': [
                {'num': 1, 'label': 'Miejsca zerowe przez wyłączenie 2x', 'text': '$2x(x - 4) = 0 \\implies x_1 = 0, x_2 = 4$.'},
                {'num': 2, 'label': 'Kierunek ramion paraboli', 'text': 'Współczynnik $a = 2 > 0$, więc ramiona idą w górę.'},
                {'num': 3, 'label': 'Odczyt przedziału i wynik CKE', 'text': 'Szukamy wartości $\\le 0$ (pod osią wraz z punktami zerowymi): $x \\in [0, 4]$.'}
            ],
            'result': 'x \\in [0, 4]'
        },
        exam_trap='Typowy błąd: Zgadywanie przedziału bez szkicu i pomylenie wnętrza ze skrzydłami zewnętrznymi.\n\nPoprawnie: Zawsze narysuj poziomą kreskę osi $OX$ i łuk paraboli — to zajmuje 2 sekundy i eliminuje 100% pomyłek.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 8.3: Nierówności niepełne (bez delty) (L1.8.3)
    # ----------------------------------------------------
    v3 = get_topic_08_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-8-1-3-1',
            source='Rozgrzewka • Brak wyrazu wolnego',
            question='Zbiorem rozwiązań nierówności $x^2 - 4x > 0$ jest',
            options_data=[
                ('A', '$(-\\infty, 0) \\cup (4, +\\infty)$'),
                ('B', '$(0, 4)$'),
                ('C', '$(-4, 0)$'),
                ('D', '$[0, 4]$')
            ],
            correct_id='A',
            explanation='Wyłączamy $x$ przed nawias: $x(x - 4) > 0$. Miejsca zerowe to $0$ i $4$. Ramiona w górę. Znak $>$ daje skrzydła zewnętrzne: $(-\\infty, 0) \\cup (4, +\\infty)$.',
            cke_trap='Nigdy nie dziel nierówności przez $x$! Zawsze wyłączaj $x$ przed nawias.'
        ),
        make_sc_task(
            task_id='task-8-1-3-2',
            source='Matura Maj 2023 • Zad. zbliżone',
            question='Zbiorem wszystkich rozwiązań nierówności $x^2 - 16 \\le 0$ jest przedział',
            options_data=[
                ('A', '$[-4, 4]$'),
                ('B', '$(-\\infty, -4] \\cup [4, +\\infty)$'),
                ('C', '$[0, 4]$'),
                ('D', '$[-16, 16]$')
            ],
            correct_id='A',
            explanation='$(x - 4)(x + 4) \\le 0$. Miejsca zerowe to $-4$ i $4$. Ramiona w górę, obszar pod osią to przedział domknięty $[-4, 4]$.',
            cke_trap='Równość $x^2 \\le 16$ oznacza odległość od zera co najwyżej 4, czyli $|x| \\le 4$, a więc $[-4, 4]$.'
        ),
        make_sc_task(
            task_id='task-8-1-3-3',
            source='Pułapka CKE • Dzielenie przez x w nierówności',
            question='Uczeń rozwiązuje nierówność $x^2 < 9$ i zapisuje $x < 3$. Jaki jest poprawny zbiór rozwiązań?',
            options_data=[
                ('A', '$(-3, 3)$'),
                ('B', '$(-\\infty, 3)$'),
                ('C', '$(-\\infty, -3) \\cup (3, +\\infty)$'),
                ('D', '$[0, 3)$')
            ],
            correct_id='A',
            explanation='Nierówności kwadratowej nie wolno jednostronnie pierwiastkować. $x^2 - 9 < 0 \\implies (x - 3)(x + 3) < 0$. Parabola z ramionami w górę daje przedział $(-3, 3)$.',
            cke_trap='Liczba $-10$ spełniałaby $x < 3$, ale $(-10)^2 = 100$, co nie jest mniejsze od 9!'
        ),
        make_tf_task(
            task_id='task-8-1-3-4',
            source='Trening CKE • Brak wyrazu wolnego c=0',
            question='Oceń prawdziwość zdania: Gdy w trójmianie kwadratowym $c = 0$, jednym z miejsc zerowych jest zawsze liczba 0.',
            correct_tf='PRAWDA',
            explanation='$ax^2 + bx = x(ax + b) = 0$. Przyrównanie $x = 0$ natychmiast daje pierwiastek równy 0.',
            cke_trap='Wyłączając $x$ przed nawias otrzymujesz $x_1 = 0$ w 100% takich przypadków.'
        ),
        make_numeric_task(
            task_id='task-8-1-3-5',
            source='Utrwalenie • Liczby całkowite',
            question='Ile liczb całkowitych spełnia nierówność $x^2 - 5x \\le 0$?',
            correct_val=6,
            explanation='Miejsca zerowe to 0 i 5. Przedział to $[0, 5]$. Liczby całkowite: $0, 1, 2, 3, 4, 5$ — jest ich dokładnie 6.',
            cke_trap='Pamiętaj o wliczeniu zera do liczb całkowitych!'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-8-3',
        topic_id=topic_id,
        title='Nierówności kwadratowe niepełne – bez liczenia delty',
        concept_essence='Gdy w trójmianie brakuje wyrazu wolnego ($c = 0$) lub wyrazu liniowego ($b = 0$), liczenie delty to strata cennego czasu: 1) Brak $c$ ($ax^2 + bx$): wyłączasz $x$ przed nawias: $x(ax + b)$. Miejsca zerowe to od razu $0$ oraz $-\\frac{b}{a}$. 2) Brak $b$ ($ax^2 - c$): rozkładasz na różnicę kwadratów $(x - \\sqrt{c})(x + \\sqrt{c})$. Miejsca zerowe to liczby przeciwne $\\pm \\sqrt{c}$. Następnie rysujesz parabolę i odczytujesz przedział.',
        matura_context='Bardzo częste zadania testowe sprawdzające sprawność algebraiczną maturzysty.',
        core_formulas=[
            {
                'title': 'Rozkład dla c = 0',
                'latex': 'ax^2 + bx = x(ax + b)',
                'description': 'Miejsca zerowe: x = 0 lub x = -b/a.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '2x^2 - 6x = 2x(x - 3) \\longrightarrow x_1 = 0, x_2 = 3',
                'mnemonic': 'Iks przed nawias załatwia sprawę.',
                'matura_tip': 'Nie licz delty, gdy c = 0.'
            },
            {
                'title': 'Rozkład dla b = 0',
                'latex': 'x^2 - c = (x - \\sqrt{c})(x + \\sqrt{c}) \\quad (c > 0)',
                'description': 'Miejsca zerowe: x = sqrt(c) lub x = -sqrt(c).',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': 'x^2 - 25 = (x - 5)(x + 5) \\longrightarrow x_1 = -5, x_2 = 5',
                'mnemonic': 'Różnica kwadratów daje dwa przeciwne pierwiastki.',
                'matura_tip': 'Nierówność $x^2 + 25 \\le 0$ jest sprzeczna (brak rozwiązań).'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż nierówność $3x - x^2 \\ge 0$.',
            'steps': [
                {'num': 1, 'label': 'Wyłączenie x przed nawias', 'text': '$x(3 - x) \\ge 0$. Miejsca zerowe: $x_1 = 0, x_2 = 3$.'},
                {'num': 2, 'label': 'Kierunek ramion paraboli', 'text': 'Współczynnik przy $x^2$ wynosi $-1 < 0$, więc ramiona idą w dół.'},
                {'num': 3, 'label': 'Odczyt przedziału i wynik CKE', 'text': 'Wartości $\\ge 0$ (nad osią) leżą między pierwiastkami: $x \\in [0, 3]$.'}
            ],
            'result': 'x \\in [0, 3]'
        },
        exam_trap='Typowy błąd: Dzielenie nierówności przez $x$ i utrata rozwiązania $x = 0$.\n\nPoprawnie: Nigdy nie dziel nierówności przez niewiadomą $x$, bo nie znasz jej znaku! Zawsze wyłączaj przed nawias.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    # ----------------------------------------------------
    # Lekcja 8.4: Nierówności z Delta <= 0 (L1.8.4)
    # ----------------------------------------------------
    v4 = get_topic_08_visuals(3)
    l4_tasks = [
        make_sc_task(
            task_id='task-8-4-1',
            source='Matura Maj 2021 • Zad. 7',
            question='Zbiorem rozwiązań nierówności $x^2 + 4 > 0$ jest',
            options_data=[
                ('A', '$\\mathbb{R}$ (zbiór liczb rzeczywistych)'),
                ('B', '$\\emptyset$ (zbiór pusty)'),
                ('C', '$(-2, 2)$'),
                ('D', '$(-\\infty, -2) \\cup (2, +\\infty)$')
            ],
            correct_id='A',
            explanation='Dla każdego $x \\in \\mathbb{R}$ mamy $x^2 \\ge 0$, więc $x^2 + 4 \\ge 4 > 0$. Nierówność jest spełniona przez każdą liczbę.',
            cke_trap='Brak miejsc zerowych ($\\Delta < 0$) nie oznacza braku rozwiązań nierówności!'
        ),
        make_sc_task(
            task_id='task-8-4-2',
            source='Pułapka CKE • Kwadrat mniejszy bądź równy zero',
            question='Zbiorem rozwiązań nierówności $(x - 3)^2 \\le 0$ jest',
            options_data=[
                ('A', '$\\{3\\}$ (tylko liczba 3)'),
                ('B', '$\\emptyset$'),
                ('C', '$\\mathbb{R}$'),
                ('D', '$(-\\infty, 3]$')
            ],
            correct_id='A',
            explanation='Kwadrat liczby rzeczywistej nigdy nie jest ujemny ($(x-3)^2 \\ge 0$). Nierówność $(x-3)^2 \\le 0$ może być spełniona tylko wtedy, gdy $(x-3)^2 = 0$, czyli $x = 3$.',
            cke_trap='Znak $\\le$ to "mniejsze LUB równe". Równość zachodzi dla $x = 3$.'
        ),
        make_sc_task(
            task_id='task-8-4-3',
            source='Trening CKE • Delta ujemna i ramiona w dół',
            question='Zbiorem rozwiązań nierówności $-2x^2 + 3x - 5 > 0$ jest',
            options_data=[
                ('A', '$\\emptyset$'),
                ('B', '$\\mathbb{R}$'),
                ('C', '$(-\\infty, 0)$'),
                ('D', '$(0, +\\infty)$')
            ],
            correct_id='A',
            explanation='$\\Delta = 9 - 40 = -31 < 0$. Ponieważ $a = -2 < 0$, cała parabola leży pod osią $OX$. Wartości nigdy nie są dodatnie ($> 0$), więc brak rozwiązań.',
            cke_trap='Gdy $a < 0$ i $\\Delta < 0$, funkcja przyjmuje wyłącznie wartości ujemne.'
        ),
        make_tf_task(
            task_id='task-8-4-4',
            source='Koncepcja CKE • Kwadrat ostro ujemny',
            question='Oceń prawdziwość zdania: Nierówność $(x + 5)^2 < 0$ nie posiada rozwiązań w zbiorze liczb rzeczywistych.',
            correct_tf='PRAWDA',
            explanation='Kwadrat dowolnej liczby jest nieujemny ($(x+5)^2 \\ge 0$), więc nie może być ostro mniejszy od zera.',
            cke_trap='Dla $x = -5$ mamy $0 < 0$, co jest fałszem. Nierówność ostra wyklucza zero.'
        ),
        make_numeric_task(
            task_id='task-8-4-5',
            source='Utrwalenie • Jedyny punkt rozwiązania',
            question='Podaj jedyną liczbę spełniającą nierówność $-(x - 7)^2 \\ge 0$.',
            correct_val=7,
            explanation='Mnożymy przez $-1$: $(x - 7)^2 \\le 0$. Ponieważ kwadrat jest $\\ge 0$, jedyną możliwością jest $(x - 7)^2 = 0 \\implies x = 7$.',
            cke_trap='Minus przed nawiasem odwraca znak nierówności przy mnożeniu przez $-1$.'
        )
    ]
    l4 = make_lesson(
        lesson_id='lesson-8-4',
        topic_id=topic_id,
        title='Nierówności kwadratowe z ujemną deltą – zbiór pusty vs cały zbiór liczb rzeczywistych',
        concept_essence='Ujemna delta nie oznacza braku rozwiązań nierówności — oznacza jedynie brak miejsc zerowych! Gdy $\\Delta < 0$, parabola nigdy nie dotyka osi $OX$: 1) Jeśli $a > 0$, cały wykres unosi się nad osią $OX$ — wtedy nierówność $f(x) > 0$ spełniają WSZYSTKIE liczby ($x \\in \\mathbb{R}$), a nierówność $f(x) \\le 0$ nie ma rozwiązań ($\\emptyset$). 2) Jeśli $a < 0$, cały wykres wisi pod osią $OX$ — wtedy $f(x) < 0$ spełnia całe $\\mathbb{R}$, a $f(x) \\ge 0$ to zbiór pusty.',
        matura_context='Podchwytliwe zadanie testowe CKE za 1 punkt, w którym ponad 40% maturzystów błędnie zaznacza brak rozwiązań.',
        core_formulas=[
            {
                'title': 'Delta ujemna i ramiona w górę',
                'latex': '\\Delta < 0, a > 0 \\longrightarrow \\begin{cases} ax^2 + bx + c > 0 \\longrightarrow x \\in \\mathbb{R} \\\\ ax^2 + bx + c \\le 0 \\longrightarrow x \\in \\emptyset \\end{cases}',
                'description': 'Parabola w całości nad osią pozioma.',
                'in_cke_sheet': True,
                'cke_page': 'str. 8',
                'example': 'x^2 + 1 > 0 \\longrightarrow x \\in \\mathbb{R}',
                'mnemonic': 'Wisi w powietrzu nad osią — zawsze dodatnia.',
                'matura_tip': 'Nie pisz brak rozwiązań, gdy delta jest ujemna!'
            },
            {
                'title': 'Delta równa zero (punkt styczności)',
                'latex': '(x - x_0)^2 \\le 0 \\longrightarrow x = x_0',
                'description': 'Rozwiązanie jednopunktowe w wierzchołku paraboli.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '(x - 2)^2 \\le 0 \\longrightarrow x = 2',
                'mnemonic': 'Wierzchołek całuje oś w jednym punkcie.',
                'matura_tip': 'Dla ostrego znaku < zbiór jest pusty.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż nierówność $-x^2 + 2x - 3 \\ge 0$.',
            'steps': [
                {'num': 1, 'label': 'Obliczenie delty', 'text': '$\\Delta = 2^2 - 4 \\cdot (-1) \\cdot (-3) = 4 - 12 = -8 < 0$. Brak miejsc zerowych.'},
                {'num': 2, 'label': 'Kierunek ramion i położenie paraboli', 'text': 'Współczynnik $a = -1 < 0$ (ramiona w dół). Parabola wisi w całości pod osią $OX$.'},
                {'num': 3, 'label': 'Odczyt i wynik CKE', 'text': 'Szukamy wartości $\\ge 0$ (nad osią). Wykres nigdy tam nie sięga: $x \\in \\emptyset$ (brak rozwiązań).'}
            ],
            'result': 'x \\in \\emptyset'
        },
        exam_trap='Typowy błąd: Pisanie $x \\in \\emptyset$ przy nierówności $x^2 + 5 > 0$ tylko dlatego, że $\\Delta < 0$.\n\nPoprawnie: Wykres leży w całości NAD osią, więc nierówność jest spełniona dla KAŻDEJ liczby rzeczywistej: $x \\in \\mathbb{R}$.',
        visuals=v4,
        tasks=l4_tasks
    )
    lessons.append(l4)



    # --- Wstrzyknięte z arkuszy CKE ---
    # CKE Maj 2023 - Zadanie 15. (2 pkt)
    lessons[2]["tasks"].append(
        make_open_task(
            task_id="t08_l03_cke_01",
            source="CKE Maj 2023 • Zad. 15 (2 pkt)",
            question="Rozwiąż nierówność: $$x^2 - 2x - 8 \\ge 0$$ Zapisz obliczenia.",
            points=2,
            scoring_key=[
                "1 pkt – poprawne wyznaczenie pierwiastków trójmianu kwadratowego",
                "2 pkt – podanie poprawnego zbioru rozwiązań nierówności (x \\in (-\\infty, -2\\rangle \\cup \\langle 4, +\\infty))"
            ],
            explanation="1. Miejsca zerowe: $\\Delta = (-2)^2 - 4 \\cdot 1 \\cdot (-8) = 4 + 32 = 36$.<br/>$\\sqrt{\\Delta} = 6$.<br/>$x_1 = \\frac{2 - 6}{2} = -2$<br/>$x_2 = \\frac{2 + 6}{2} = 4$<br/>2. Parabola skierowana ramionami w górę ($a = 1 > 0$).<br/>3. Wartości $\\ge 0$ (nieujemne) parabola przyjmuje na zewnątrz pierwiastków.<br/>Odp: $x \\in (-\\infty, -2\\rangle \\cup \\langle 4, +\\infty)$.",
            cke_trap="Zły kierunek ramion paraboli, albo brak przedziałów domkniętych (nierówność $\\ge$, więc zbiór domknięty)."
        )
    )

    # CKE Informator 2025 - Przykład nierówności z ujemnym a
    lessons[2]["tasks"].append(
        make_open_task(
            task_id="t08_l03_cke_02",
            source="CKE Informator 2025 • Przykład",
            question="Rozwiąż nierówność: $$-2x^2 + 5x - 3 \\le 0$$ Zapisz obliczenia.",
            points=2,
            scoring_key=[
                "1 pkt – wyznaczenie miejsc zerowych funkcji",
                "2 pkt – sformułowanie ostatecznej odpowiedzi w postaci sumy przedziałów domkniętych"
            ],
            explanation="1. Miejsca zerowe: $\\Delta = 5^2 - 4 \\cdot (-2) \\cdot (-3) = 25 - 24 = 1$.<br/>$\\sqrt{\\Delta} = 1$.<br/>$x_1 = \\frac{-5 - 1}{2 \\cdot (-2)} = \\frac{-6}{-4} = 1.5$<br/>$x_2 = \\frac{-5 + 1}{-4} = 1$<br/>2. Parabola ramionami w dół ($a = -2 < 0$).<br/>3. Wartości $\\le 0$ są pod osią OX (na zewnątrz).<br/>Odp: $x \\in (-\\infty, 1\\rangle \\cup \\langle \\frac{3}{2}, +\\infty)$.",
            cke_trap="Minus przy $x^2$ sprawia, że parabola jest skierowana w dół. Odpowiedzią są przedziały zewnętrzne, a nie wewnętrzne!"
        )
    )

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'order': topic_number,
        'tier': 'Tier S+',
        'badge': 'NA 30% • PEWNIAK MATURALNY',
        'estimated_time_formatted': '4 lekcje (~20 min)',
        'description': 'Wyróżnik Delta, szkicowanie paraboli, odczytywanie przedziałów, nierówności niepełne oraz przypadki z Deltą niedodatnią.',
        'lessons': lessons
    }
