"""
topic_17_builder.py - Dział 17: Geometria Analityczna na Płaszczyźnie Kartezjańskiej (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Autentyczne CKE
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_17 import get_topic_17_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_17():
    topic_id = 'dzial-17'
    topic_title = 'Geometria Analityczna na Płaszczyźnie Kartezjańskiej'
    topic_number = 17
    lessons = []

    # =========================================================================
    # Lekcja 17.1: Długość odcinka i współrzędne środka odcinka
    # =========================================================================
    v1 = get_topic_17_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-17-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W kartezjańskim układzie współrzędnych $(x, y)$ dane są punkty $A = (-3, 5)$ oraz $B = (5, -1)$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Długość odcinka $AB$ jest równa',
            options_data=[
                ('A', '$10$'),
                ('B', r'$\sqrt{20}$'),
                ('C', '$14$'),
                ('D', r'$2\sqrt{5}$')
            ],
            correct_id='A',
            explanation=r'Wzór na długość odcinka w układzie współrzędnych:' + '\n' +
                        r'$$|AB| = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$$' + '\n' +
                        r'Obliczamy różnice współrzędnych:' + '\n' +
                        r'$$x_B - x_A = 5 - (-3) = 8, \quad y_B - y_A = -1 - 5 = -6$$' + '\n' +
                        r'Podstawiamy do pierwiastka:' + '\n' +
                        r'$$|AB| = \sqrt{8^2 + (-6)^2} = \sqrt{64 + 36} = \sqrt{100} = 10$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Pamiętaj: odejmowanie liczby ujemnej to dodawanie ($5 - (-3) = 8$), a kwadrat liczby ujemnej jest ZAWSZE dodatni ($(-6)^2 = +36$).'
        ),
        make_sc_task(
            task_id='task-17-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Punkt $S = (2, -3)$ jest środkiem odcinka $AB$, gdzie $A = (-4, 1)$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Współrzędne punktu $B$ są równe',
            options_data=[
                ('A', '$(8, -7)$'),
                ('B', '$(-1, -1)$'),
                ('C', '$(0, -2)$'),
                ('D', '$(8, -5)$'),
            ],
            correct_id='A',
            explanation=r'Wzór na środek odcinka: $x_S = \frac{x_A + x_B}{2}$ oraz $y_S = \frac{y_A + y_B}{2}$.' + '\n' +
                        r'Wyznaczamy $x_B$:' + '\n' +
                        r'$$\frac{-4 + x_B}{2} = 2 \implies -4 + x_B = 4 \implies x_B = 8$$' + '\n' +
                        r'Wyznaczamy $y_B$:' + '\n' +
                        r'$$\frac{1 + y_B}{2} = -3 \implies 1 + y_B = -6 \implies y_B = -7$$' + '\n' +
                        r'Współrzędne punktu $B$ to $(8, -7)$.',
            cke_trap=r'Punkt S jest ŚRODKIEM, a nie końcem! Obliczenie średniej ze współrzędnych A i S dałoby błędny wynik $(-1, -1)$.'
        ),
        make_sc_task(
            task_id='task-17-1-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Dane są punkty $K = (-2, 4)$ oraz $L = (6, 8)$. Środkiem odcinka $KL$ jest punkt $M$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Współrzędne punktu $M$ są równe',
            options_data=[
                ('A', '$(2, 6)$'),
                ('B', '$(4, 6)$'),
                ('C', '$(2, 2)$'),
                ('D', '$(-4, -2)$'),
            ],
            correct_id='A',
            explanation=r'Środek odcinka to średnia arytmetyczna współrzędnych końców:' + '\n' +
                        r'$$x_M = \frac{-2 + 6}{2} = \frac{4}{2} = 2$$' + '\n' +
                        r'$$y_M = \frac{4 + 8}{2} = \frac{12}{2} = 6$$' + '\n' +
                        r'Zatem $M = (2, 6)$.',
            cke_trap=r'W formule na środek odcinka jest PLUS w liczniku: $\frac{x_A + x_B}{2}$. Nie myl z różnicą przy liczeniu wektora.'
        ),
        make_tf_task(
            task_id='task-17-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Oceń prawdziwość poniższego zdania:' + '\n' +
                     r'Odległość punktu $P = (-3, 4)$ od początku układu współrzędnych $(0, 0)$ jest równa $5$.',
            correct_tf='P',
            explanation=r'Odległość punktu $(x, y)$ od początku układu to $\sqrt{x^2 + y^2}$.' + '\n' +
                        r'$$\sqrt{(-3)^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$' + '\n' +
                        r'Zdanie jest prawdziwe.',
            cke_trap=r'Kwadrat liczby ujemnej to liczba dodatnia: $(-3)^2 = 9$. Wynik pod pierwiastkiem to zawsze suma liczb dodatnich.'
        ),
        make_numeric_task(
            task_id='task-17-1-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Oblicz długość odcinka o końcach $A = (1, 2)$ oraz $B = (4, 6)$. Wpisz wynik w pole poniżej.',
            correct_val=5,
            explanation=r'Różnice współrzędnych: $x_B - x_A = 4 - 1 = 3$, $y_B - y_A = 6 - 2 = 4$.' + '\n' +
                        r'$$|AB| = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$$',
            cke_trap=r'Klasyczny trójkąt pitagorejski o przyprostokątnych 3 i 4 daje przeciwprostokątną 5.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-17-1',
        topic_id=topic_id,
        title='Długość odcinka i współrzędne środka odcinka',
        concept_essence=(
            "Długość odcinka to odległość między dwoma punktami w układzie współrzędnych, wynikająca wprost z twierdzenia Pitagorasa: $|AB| = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2}$.\n\n"
            "Współrzędne środka odcinka to średnie arytmetyczne współrzędnych jego końców: $S = \\left(\\frac{x_A+x_B}{2}, \\frac{y_A+y_B}{2}\\right)$.\n\n"
            "Pamiętaj, że kwadraty różnic współrzędnych są zawsze nieujemne."
        ),
        matura_context='Pewniak za 1 pkt na każdym egzaminie maturalnym. Zadania testują sprawność rachunkową na liczbach ujemnych i wyznaczanie brakującego końca odcinka.',
        core_formulas=[
            {
                'title': 'Długość odcinka',
                'latex': r'|AB| = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}',
                'description': 'Karta wzorów CKE str. 19.',
                'in_cke_sheet': True,
                'cke_page': 'str. 19'
            },
            {
                'title': 'Współrzędne środka odcinka',
                'latex': r'S = \left(\frac{x_A + x_B}{2}, \; \frac{y_A + y_B}{2}\right)',
                'description': 'Karta wzorów CKE str. 19.',
                'in_cke_sheet': True,
                'cke_page': 'str. 19'
            }
        ],
        worked_example={
            'problem': r'Oblicz odległość punktów $A(-1, 3)$ i $B(2, 7)$ oraz współrzędne środka odcinka $AB$.',
            'steps': [
                r'Krok 1: Długość: $|AB| = \sqrt{(2 - (-1))^2 + (7 - 3)^2} = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$.',
                r'Krok 2: Środek: $S = \left(\frac{-1 + 2}{2}, \frac{3 + 7}{2}\right) = (0{,}5, 5)$.'
            ],
            'result': r'|AB| = 5, \quad S = (0{,}5, 5)'
        },
        exam_trap=r'Gubienie minusa: $2 - (-1) = 3$, a nie $1$. Kwadrat $(-4)^2 = +16$, a nie $-16$.',
        visuals=v1,
        tasks=l1_tasks,
        key_takeaway=r'Środek odcinka to średnia arytmetyczna współrzędnych końców. Długość odcinka to pierwiastek z sumy kwadratów różnic współrzędnych (twierdzenie Pitagorasa na płaszczyźnie).'
    )
    lessons.append(l1)

    # =========================================================================
    # Lekcja 17.2: Proste równoległe i prostopadłe
    # =========================================================================
    v2 = get_topic_17_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-17-2-1',
            source='Matura maj 2023 • Zad. 24',
            question=r'W kartezjańskim układzie współrzędnych $(x, y)$ dana jest prosta $k$ o równaniu $y = -\frac{1}{3}x + 2$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Prosta o równaniu $y = ax + b$ jest równoległa do prostej $k$ i przechodzi przez punkt $P = (3, 5)$, gdy',
            options_data=[
                ('A', '$a = 3$ oraz $b = 4$'),
                ('B', r'$a = -\frac{1}{3}$ oraz $b = 4$'),
                ('C', '$a = 3$ oraz $b = -4$'),
                ('D', r'$a = -\frac{1}{3}$ oraz $b = 6$')
            ],
            correct_id='D',
            explanation=r'Dwie proste są równoległe wtedy i tylko wtedy, gdy mają równe współczynniki kierunkowe:' + '\n' +
                        r'$$a = a_k = -\frac{1}{3}$$' + '\n' +
                        r'Równanie nowej prostej przyjmuje postać $y = -\frac{1}{3}x + b$.' + '\n' +
                        r'Podstawiamy współrzędne punktu $P = (3, 5)$:' + '\n' +
                        r'$$5 = -\frac{1}{3} \cdot 3 + b \implies 5 = -1 + b \implies b = 6$$' + '\n' +
                        r'Zatem $a = -\frac{1}{3}$ oraz $b = 6$. Poprawna odpowiedź to D.',
            cke_trap=r'Proste równoległe mają DOKŁADNIE TEN SAM współczynnik kierunkowy: $a = -\frac{1}{3}$. Współczynnik $b$ obliczamy podstawiając punkt.'
        ),
        make_sc_task(
            task_id='task-17-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Prosta $l$ jest prostopadła do prostej o równaniu $y = \frac{2}{5}x - 3$ i przechodzi przez punkt $P = (4, 1)$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Współczynnik kierunkowy prostej $l$ wynosi',
            options_data=[
                ('A', r'$-\frac{5}{2}$'),
                ('B', r'$\frac{5}{2}$'),
                ('C', r'$-\frac{2}{5}$'),
                ('D', r'$\frac{2}{5}$'),
            ],
            correct_id='A',
            explanation=r'Warunek prostopadłości dwóch prostych to $a_1 \cdot a_2 = -1$, czyli:' + '\n' +
                        r'$$a_2 = -\frac{1}{a_1} = -\frac{1}{\frac{2}{5}} = -\frac{5}{2}$$',
            cke_trap=r'Współczynnik prostej prostopadłej musi być ZARÓWNO odwrotny, JAK I przeciwny (zmiana znaku na minus): odwracamy $\frac{2}{5}$ na $-\frac{5}{2}$.'
        ),
        make_sc_task(
            task_id='task-17-2-3',
            source='Matura sierpień 2023 • Zad. 25',
            question=r'W kartezjańskim układzie współrzędnych $(x, y)$ dane są prosta $k$ o równaniu $y = \frac{3}{4}x - \frac{7}{4}$ oraz punkt $P = (12, -1)$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Prosta przechodząca przez punkt $P$ i równoległa do prostej $k$ ma równanie',
            options_data=[
                ('A', r'$y = -\frac{3}{4}x + 8$'),
                ('B', r'$y = \frac{3}{4}x - 10$'),
                ('C', r'$y = \frac{4}{3}x - 17$'),
                ('D', r'$y = -\frac{4}{3}x + 15$')
            ],
            correct_id='B',
            explanation=r'Prosta równoległa do $k$ ma ten sam współczynnik $a = \frac{3}{4}$.' + '\n' +
                        r'Podstawiamy współrzędne punktu $P(12, -1)$ do równania $y = \frac{3}{4}x + b$:' + '\n' +
                        r'$$-1 = \frac{3}{4} \cdot 12 + b \implies -1 = 9 + b \implies b = -10$$' + '\n' +
                        r'Równanie prostej to $y = \frac{3}{4}x - 10$. Poprawna odpowiedź to B.',
            cke_trap=r'Pamiętaj, aby nie zmieniać współczynnika kierunkowego przy prostej równoległej: $a = \frac{3}{4}$. Zmienia się tylko wyraz wolny $b$.'
        ),
        make_tf_task(
            task_id='task-17-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Oceń prawdziwość poniższego zdania:' + '\n' +
                     r'Proste o równaniach $y = 3x - 1$ oraz $y = -\frac{1}{3}x + 7$ przecinają się pod kątem prostym.',
            correct_tf='P',
            explanation=r'Współczynniki kierunkowe to $a_1 = 3$ oraz $a_2 = -\frac{1}{3}$.' + '\n' +
                        r'Iloczyn współczynników wynosi: $3 \cdot \left(-\frac{1}{3}\right) = -1$.' + '\n' +
                        r'Ponieważ $a_1 \cdot a_2 = -1$, proste są prostopadłe, czyli przecinają się pod kątem $90^\circ$. Zdanie jest prawdziwe.',
            cke_trap=r'Iloczyn współczynników równy -1 to konieczny i wystarczający warunek prostopadłości prostych.'
        ),
        make_open_task(
            task_id='task-17-2-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wyznacz równanie prostej $k$ prostopadłej do prostej $l: y = 2x - 3$ i przechodzącej przez punkt $A = (-2, 5)$. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt - wyznaczenie współczynnika kierunkowego a = -1/2.' + '\n' +
                        r'2 pkt - podstawienie punktu A i zapisanie ostatecznego równania y = -1/2 x + 4.',
            explanation=r'Krok 1: Wyznaczamy współczynnik prostej prostopadłej:' + '\n' +
                        r'$$a_k = -\frac{1}{a_l} = -\frac{1}{2}$$' + '\n' +
                        r'Krok 2: Podstawiamy współrzędne punktu $A(-2, 5)$ do równania $y = -\frac{1}{2}x + b$:' + '\n' +
                        r'$$5 = -\frac{1}{2} \cdot (-2) + b \implies 5 = 1 + b \implies b = 4$$' + '\n' +
                        r'Równanie prostej $k$ to $y = -\frac{1}{2}x + 4$.',
            cke_trap=r'Mnożenie ujemnego współczynnika przez ujemną współrzędną: $-\frac{1}{2} \cdot (-2) = +1$. Błąd znaku na tym etapie daje $b = 6$ zamiast $4$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-17-2',
        topic_id=topic_id,
        title='Proste równoległe i prostopadłe w układzie współrzędnych',
        concept_essence=(
            "Współczynnik kierunkowy $a$ decyduje o kącie nachylenia prostej do osi $OX$.\n\n"
            "Dwie proste są równoległe, gdy mają identyczne współczynniki kierunkowe: $a_1 = a_2$.\n\n"
            "Dwie proste są prostopadłe, gdy ich współczynniki są przeciwne i odwrotne: $a_1 \\cdot a_2 = -1 \\longrightarrow a_2 = -\\frac{1}{a_1}$."
        ),
        matura_context='Żelazny pewniak maturalny CKE (1–2 pkt). Zadanie pojawia się co roku: wyznaczenie współczynnika lub pełnego wzoru prostej przez punkt.',
        core_formulas=[
            {
                'title': 'Warunek równoległości prostych',
                'latex': r'a_1 = a_2',
                'description': 'Karta wzorów CKE str. 19.',
                'in_cke_sheet': True,
                'cke_page': 'str. 19'
            },
            {
                'title': 'Warunek prostopadłości prostych',
                'latex': r'a_1 \cdot a_2 = -1',
                'description': 'Karta wzorów CKE str. 19.',
                'in_cke_sheet': True,
                'cke_page': 'str. 19'
            }
        ],
        worked_example={
            'problem': r'Wyznacz prostą równoległą do $y = 3x - 1$ przechodzącą przez punkt $P(2, 4)$.',
            'steps': [
                r'Krok 1: Prosta równoległa ma współczynnik $a = 3$, stąd $y = 3x + b$.',
                r'Krok 2: Podstawiamy punkt $P(2, 4)$: $4 = 3 \cdot 2 + b \implies 4 = 6 + b \implies b = -2$.',
                r'Krok 3: Równanie prostej: $y = 3x - 2$.'
            ],
            'result': r'y = 3x - 2'
        },
        exam_trap=r'Odwrócenie ułamka bez zmiany znaku lub zmiana znaku bez odwrócenia. Prostopadłość wymaga OBU zmian naraz: $a_{\perp} = -\frac{1}{a}$.',
        visuals=v2,
        tasks=l2_tasks,
        key_takeaway=r'Proste równoległe mają identyczny współczynnik kierunkowy ($a_1 = a_2$). Proste prostopadłe wymagają dwóch zmian naraz: przeciwnego znaku i odwrotności ($a_2 = -\frac{1}{a_1}$).'
    )
    lessons.append(l2)

    # =========================================================================
    # Lekcja 17.3: Równanie okręgu w postaci kanonicznej
    # =========================================================================
    v3 = get_topic_17_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-17-3-1',
            source='Matura sierpień 2023 • Zad. 26',
            question=r'W kartezjańskim układzie współrzędnych $(x, y)$ dany jest okrąg $\mathcal{O}$ o środku $S = (-1, 2)$ i promieniu $3$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Okrąg $\mathcal{O}$ jest określony równaniem',
            options_data=[
                ('A', r'$(x - 1)^2 + (y + 2)^2 = 9$'),
                ('B', r'$(x - 1)^2 + (y + 2)^2 = 3$'),
                ('C', r'$(x + 1)^2 + (y - 2)^2 = 9$'),
                ('D', r'$(x + 1)^2 + (y - 2)^2 = 3$')
            ],
            correct_id='C',
            explanation=r'Równanie okręgu o środku $S(a, b)$ i promieniu $r$ ma postać:' + '\n' +
                        r'$$(x - a)^2 + (y - b)^2 = r^2$$' + '\n' +
                        r'Dla $a = -1, b = 2$ oraz $r = 3$:' + '\n' +
                        r'$$(x - (-1))^2 + (y - 2)^2 = 3^2 \implies (x + 1)^2 + (y - 2)^2 = 9$$' + '\n' +
                        r'Poprawna odpowiedź to C.',
            cke_trap=r'Dwie pułapki naraz: współrzędne środka wchodzą do nawiasów ze zmienionym znakiem ($(x + 1)$ dla $a = -1$), a po prawej stronie podnosimy promień do kwadratu ($3^2 = 9$, a nie $3$).'
        ),
        make_sc_task(
            task_id='task-17-3-2',
            source='Matura sierpień 2024 • Zad. 23',
            question=r'W kartezjańskim układzie współrzędnych $(x, y)$ odcinek o końcach $A = (-4, 7)$ oraz $B = (6, -1)$ jest średnicą okręgu $\mathcal{O}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Okrąg $\mathcal{O}$ jest określony równaniem',
            options_data=[
                ('A', r'$(x - 1)^2 + (y - 3)^2 = 41$'),
                ('B', r'$(x - 5)^2 + (y + 4)^2 = 41$'),
                ('C', r'$(x - 1)^2 + (y + 3)^2 = 41$'),
                ('D', r'$(x - 5)^2 + (y - 4)^2 = 41$')
            ],
            correct_id='A',
            explanation=r'Środek okręgu $S(a, b)$ to środek średnicy $AB$:' + '\n' +
                        r'$$a = \frac{-4 + 6}{2} = \frac{2}{2} = 1, \quad b = \frac{7 + (-1)}{2} = \frac{6}{2} = 3 \implies S = (1, 3)$$' + '\n' +
                        r'Kwadrat promienia to kwadrat odległości $|SA|^2$:' + '\n' +
                        r'$$r^2 = (1 - (-4))^2 + (3 - 7)^2 = 5^2 + (-4)^2 = 25 + 16 = 41$$' + '\n' +
                        r'Równanie okręgu to $(x - 1)^2 + (y - 3)^2 = 41$. Poprawna odpowiedź to A.',
            cke_trap=r'Środek średnicy ma współrzędne $(1, 3)$, więc w równaniu okręgu znaki to $(x - 1)^2 + (y - 3)^2$. Nie pomyl środka z wektorem.'
        ),
        make_sc_task(
            task_id='task-17-3-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Okrąg określony jest równaniem $(x - 4)^2 + (y + 6)^2 = 49$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Środek $S$ i promień $r$ tego okręgu to',
            options_data=[
                ('A', '$S = (4, -6)$ oraz $r = 7$'),
                ('B', '$S = (-4, 6)$ oraz $r = 7$'),
                ('C', '$S = (4, -6)$ oraz $r = 49$'),
                ('D', '$S = (-4, 6)$ oraz $r = 49$'),
            ],
            correct_id='A',
            explanation=r'Porównujemy z postacią kanoniczną $(x - a)^2 + (y - b)^2 = r^2$:' + '\n' +
                        r'$$x - a = x - 4 \implies a = 4$$' + '\n' +
                        r'$$y - b = y + 6 \implies b = -6$$' + '\n' +
                        r'Promień to $r = \sqrt{49} = 7$. Zatem $S = (4, -6)$ oraz $r = 7$.',
            cke_trap=r'Prawa strona to $r^2 = 49$, więc promień to $r = 7$. W nawiasach odwracamy znaki: $-4 \longrightarrow +4$, $+6 \longrightarrow -6$.'
        ),
        make_tf_task(
            task_id='task-17-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Oceń prawdziwość poniższego zdania:' + '\n' +
                     r'Punkt $P = (3, 4)$ leży na okręgu o równaniu $x^2 + y^2 = 25$.',
            correct_tf='P',
            explanation=r'Podstawiamy współrzędne punktu $x = 3$ oraz $y = 4$ do lewej strony równania:' + '\n' +
                        r'$$3^2 + 4^2 = 9 + 16 = 25$$' + '\n' +
                        r'Lewa strona jest równa prawej ($25 = 25$), więc punkt $P$ leży na okręgu. Zdanie jest prawdziwe.',
            cke_trap=r'Aby sprawdzić, czy punkt leży na okręgu, po prostu podstaw jego współrzędne pod x i y.'
        ),
        make_numeric_task(
            task_id='task-17-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Okrąg o równaniu $(x + 5)^2 + (y - 12)^2 = 100$ ma promień $r$. Oblicz promień $r$. Wpisz wynik w pole poniżej.',
            correct_val=10,
            explanation=r'Prawa strona równania okręgu to $r^2 = 100$.' + '\n' +
                        r'Promień jest liczbą dodatnią: $r = \sqrt{100} = 10$.',
            cke_trap=r'Nie podawaj 100 jako promienia! Prawa strona to kwadrat promienia $r^2$.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-17-3',
        topic_id=topic_id,
        title='Równanie okręgu w postaci kanonicznej',
        concept_essence=(
            "Postać kanoniczna równania okręgu to: $(x - a)^2 + (y - b)^2 = r^2$.\n\n"
            "Środek okręgu to punkt $S(a, b)$, którego współrzędne odczytujemy ze ZMIENIONYMI ZNAKAMI z nawiasów.\n\n"
            "Prawa strona to kwadrat promienia $r^2$, więc aby wyznaczyć promień, wyciągamy pierwiastek kwadratowy: $r = \\sqrt{r^2}$."
        ),
        matura_context='Pewniak CKE za 1 pkt. Zadanie polega na odczytaniu środka i promienia ze wzoru lub na zapisaniu równania okręgu o podanym środku.',
        core_formulas=[
            {
                'title': 'Równanie okręgu w postaci kanonicznej',
                'latex': r'(x - a)^2 + (y - b)^2 = r^2',
                'description': 'Karta wzorów CKE str. 19. S(a, b) - środek okręgu, r - promień.',
                'in_cke_sheet': True,
                'cke_page': 'str. 19'
            }
        ],
        worked_example={
            'problem': r'Wyznacz środek i promień okręgu o równaniu $(x + 2)^2 + (y - 7)^2 = 36$.',
            'steps': [
                r'Krok 1: Odwracamy znaki w nawiasach: $a = -2$, $b = +7 \implies S(-2, 7)$.',
                r'Krok 2: Pierwiastkujemy prawą stronę: $r = \sqrt{36} = 6$.'
            ],
            'result': r'S = (-2, 7), \quad r = 6'
        },
        exam_trap=r'Błędne odczytanie znaków środka ($S(2, -7)$ zamiast $S(-2, 7)$) oraz podanie $r = 36$ zamiast $r = 6$.',
        visuals=v3,
        tasks=l3_tasks,
        key_takeaway=r'W równaniu okręgu $(x - a)^2 + (y - b)^2 = r^2$ zawsze odwracaj znaki przy odczytywaniu środka $S(a, b)$ i ZAWSZE spierwiastkuj prawą stronę, by otrzymać promień $r = \sqrt{r^2}$.'
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'description': 'Długość i środek odcinka, warunki równoległości i prostopadłości prostych oraz postać kanoniczna równania okręgu.',
        'lessons': lessons
    }
