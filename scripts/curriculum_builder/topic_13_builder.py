"""
topic_13_builder.py - Dział 13: Przekształcenia wykresów funkcji (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Mafs + Autentyczne CKE
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_13 import get_topic_13_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_13():
    topic_id = 'dzial-13'
    topic_title = 'Przekształcenia wykresów funkcji'
    topic_number = 13
    lessons = []

    # =========================================================================
    # Lekcja 13.1: Przesunięcie wykresu o wektor v = [p, q]
    # =========================================================================
    v1 = get_topic_13_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-13-1-1',
            source='Matura czerwiec 2024 • Zad. 11.2',
            question=r'W kartezjańskim układzie współrzędnych $(x, y)$ wykres funkcji $g$ powstał w wyniku przesunięcia równoległego wykresu funkcji $f$ wzdłuż osi $Ox$ o $4$ jednostki w lewo.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Funkcje $f$ i $g$ są powiązane zależnością oraz mają takie same zbiory wartości:',
            options_data=[
                ('A', '$g(x) = f(x + 4)$ oraz mają takie same zbiory wartości'),
                ('B', '$g(x) = f(x - 4)$ oraz mają takie same zbiory wartości'),
                ('C', '$g(x) = f(x) - 4$ oraz mają takie same dziedziny'),
                ('D', '$g(x) = f(x) + 4$ oraz mają takie same dziedziny')
            ],
            correct_id='A',
            explanation=r'Przesunięcie wykresu wzdłuż osi $OX$ o $4$ jednostki w lewo odpowiada wektorowi $\vec{v} = [-4, 0]$.' + '\n' +
                        r'Wzór nowej funkcji przyjmuje postać $g(x) = f(x - (-4)) = f(x + 4)$.' + '\n' +
                        r'Ponieważ przesunięcie odbywa się wyłącznie w poziomie, rzędne punktów ($y$) nie ulegają zmianie, więc zbiór wartości pozostaje bez zmian.' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Przesunięcie w lewo (w stronę liczb ujemnych) daje we wzorze znak PLUS w nawiasie: $f(x + 4)$. Przesunięcie w prawo dałoby $f(x - 4)$.',
            plot={
                'type': 'LINEAR',
                'xRange': [-7, 5],
                'yRange': [-3, 5],
                'gridStep': 1,
                'lines': [
                    {'slope': 1, 'intercept': 0, 'domain': [-2, 3], 'color': '#64748B', 'dashed': True, 'label': 'f(x)'},
                    {'slope': 1, 'intercept': 4, 'domain': [-6, -1], 'color': '#FFB800', 'label': 'g(x) = f(x + 4)'}
                ],
                'points': [
                    {'x': 0, 'y': 0, 'label': '(0, 0)', 'dot': 'filled', 'color': '#64748B', 'attach': 'se'},
                    {'x': -4, 'y': 0, 'label': '(-4, 0)', 'dot': 'filled', 'color': '#10B981', 'attach': 'sw'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-13-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wykres funkcji $g$ otrzymano przez przesunięcie wykresu funkcji $f(x) = x^2$ o wektor $\vec{v} = [3, -5]$.' + '\n' +
                     r'Wzór funkcji $g$ ma postać',
            options_data=[
                ('A', '$g(x) = (x - 3)^2 - 5$'),
                ('B', '$g(x) = (x + 3)^2 - 5$'),
                ('C', '$g(x) = (x - 3)^2 + 5$'),
                ('D', '$g(x) = (x + 3)^2 + 5$')
            ],
            correct_id='A',
            explanation=r'Przesunięcie o wektor $\vec{v} = [p, q]$ przekształca funkcję $f(x)$ we wzór $g(x) = f(x - p) + q$.' + '\n' +
                        r'Dla $\vec{v} = [3, -5]$ mamy $p = 3$ oraz $q = -5$:' + '\n' +
                        r'$$g(x) = (x - 3)^2 - 5$$',
            cke_trap=r'Pamiętaj: pierwsza współrzędna wektora zmienia znak w nawiasie ($x - 3$), a druga współrzędna wektora zachowuje swój znak poza nawiasem ($-5$).',
            plot={
                'type': 'PARABOLA',
                'xRange': [-3, 7],
                'yRange': [-7, 7],
                'gridStep': 1,
                'parabolas': [
                    {'a': 1, 'p': 0, 'q': 0, 'color': '#64748B', 'label': 'f(x) = x²'},
                    {'a': 1, 'p': 3, 'q': -5, 'color': '#FFB800', 'label': 'g(x) = (x - 3)² - 5'}
                ],
                'points': [
                    {'x': 0, 'y': 0, 'label': '(0, 0)', 'dot': 'filled', 'color': '#64748B', 'attach': 'nw'},
                    {'x': 3, 'y': -5, 'label': 'W(3, -5)', 'dot': 'filled', 'color': '#10B981', 'attach': 's'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-13-1-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wykres funkcji $g(x) = f(x + 2) - 6$ powstał z przesunięcia wykresu funkcji $f$ o wektor $\vec{v}$. Wektor $\vec{v}$ ma współrzędne',
            options_data=[
                ('A', r'$\vec{v} = [2, -6]$'),
                ('B', r'$\vec{v} = [-2, -6]$'),
                ('C', r'$\vec{v} = [-2, 6]$'),
                ('D', r'$\vec{v} = [2, 6]$')
            ],
            correct_id='B',
            explanation=r'Ogólny wzór na przesunięcie to $g(x) = f(x - p) + q$.' + '\n' +
                        r'Przyrównujemy: $x - p = x + 2 \longrightarrow -p = 2 \longrightarrow p = -2$.' + '\n' +
                        r'Druga współrzędna to bezpośrednio liczba za nawiasem: $q = -6$.' + '\n' +
                        r'Zatem wektor przesunięcia to $\vec{v} = [-2, -6]$.',
            cke_trap=r'W nawiasie stoi $+2$, co oznacza przesunięcie o $2$ w LEWO ($p = -2$). Za nawiasem stoi $-6$, co oznacza przesunięcie o $6$ w DÓŁ ($q = -6$).'
        ),
        make_numeric_task(
            task_id='task-13-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Punkt $P = (2, -3)$ należy do wykresu funkcji $f$. Wykres funkcji $g$ powstał przez przesunięcie wykresu $f$ o wektor $\vec{v} = [4, 5]$.' + '\n' +
                     r'Punkt $P\'$ leżący na wykresie funkcji $g$ i odpowiadający punktowi $P$ ma współrzędne $(x\', y\')$. Oblicz sumę współrzędnych $x\' + y\'$. Wpisz liczbę całkowitą.',
            correct_val=8,
            explanation=r'Przesunięcie punktu $(x, y)$ o wektor $[p, q]$ daje nowy punkt:' + '\n' +
                        r'$$P\' = (x + p, y + q) = (2 + 4, -3 + 5) = (6, 2)$$' + '\n' +
                        r'Suma współrzędnych wynosi $x\' + y\' = 6 + 2 = 8$.',
            cke_trap=r'Dla współrzędnych samego punktu dodajemy wektor bezpośrednio: $x\' = x + p$, $y\' = y + q$ (to we wzorze funkcji występuje minus: $x - p$).'
        ),
        make_open_task(
            task_id='task-13-1-5',
            source='Informator CKE • Zad. 38',
            question=r'Wykres funkcji $f$ o dziedzinie $D_f = \langle -3, 5 \rangle$ i zbiorze wartości $ZW_f = \langle -2, 7 \rangle$ przesunięto o wektor $\vec{v} = [4, -3]$, otrzymując wykres funkcji $g$.' + '\n' +
                     r'Wyznacz dziedzinę oraz zbiór wartości funkcji $g$. Zapisz uzasadnienie.',
            points=2,
            scoring_key=r'1 pkt – poprawne wyznaczenie dziedziny funkcji $g$: $D_g = \langle -3 + 4, 5 + 4 \rangle = \langle 1, 9 \rangle$.' + '\n' +
                        r'2 pkt – poprawne wyznaczenie zbioru wartości funkcji $g$: $ZW_g = \langle -2 - 3, 7 - 3 \rangle = \langle -5, 4 \rangle$.',
            explanation=r'Krok 1: Przesunięcie wykresu o wektor $\vec{v} = [p, q] = [4, -3]$ przesuwa wszystkie punkty $(x, y)$ w punkty $(x + 4, y - 3)$.' + '\n' +
                        r'Krok 2: Dziedzina (oś $OX$) przesuwa się w prawo o 4 jednostki:' + '\n' +
                        r'$$D_g = \langle -3 + 4, 5 + 4 \rangle = \langle 1, 9 \rangle$$' + '\n' +
                        r'Krok 3: Zbiór wartości (oś $OY$) przesuwa się w dół o 3 jednostki:' + '\n' +
                        r'$$ZW_g = \langle -2 - 3, 7 - 3 \rangle = \langle -5, 4 \rangle.$$',
            cke_trap=r'Wzór funkcji ma postać $g(x) = f(x - 4) - 3$, co oznacza przesunięcie w PRAWO o 4 (dodajemy 4 do dziedziny) i w DÓŁ o 3 (odejmujemy 3 od zbioru wartości).'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-13-1',
        topic_id=topic_id,
        title='Przesunięcie o wektor v = [p, q]',
        concept_essence=(
            "Przesunięcie wykresu funkcji $f$ o wektor $\\vec{v} = [p, q]$ prowadzi do nowego wzoru $g(x) = f(x - p) + q$.\n\n"
            "Przesunięcie poziome (oś OX): zmiana argumentu wewnątrz nawiasu $f(x - p)$. Pamiętaj o odwrotnym znaku: dla $p > 0$ przesuwasz w prawo o $p$, a dla $p < 0$ w lewo o $|p|$.\n\n"
            "Przesunięcie pionowe (oś OY): zmiana wartości za nawiasem $+q$. Znak jest bezpośredni: $+q$ w górę, $-q$ w dół.\n\n"
            "Wpływ na dziedzinę i zbiór wartości: każdy punkt wykresu $(x, y)$ przechodzi w $(x + p, y + q)$. Dziedzina przesuwa się o $+p$, a zbiór wartości o $+q$."
        ),
        matura_context='Pewniak na maturze: zadania zamknięte ze wskazaniem wzoru po przesunięciu wykresu oraz zadania z odczytywaniem nowej dziedziny lub zbioru wartości. Karta wzorów CKE str. 7.',
        core_formulas=[
            {
                'title': 'Przesunięcie wykresu o wektor (Karta Wzorów CKE)',
                'latex': r'g(x) = f(x - p) + q \quad \text{dla wektora } \vec{v} = [p, q]',
                'description': 'Karta wzorów CKE str. 7.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            }
        ],
        worked_example={
            'problem': r'Dany jest wykres funkcji $f(x) = \frac{1}{x}$. Zapisz wzór funkcji $g$, której wykres powstał przez przesunięcie wykresu $f$ o wektor $\vec{v} = [-3, 2]$.',
            'steps': [
                r'Krok 1: Wypisujemy współrzędne wektora: $p = -3, q = 2$.',
                r'Krok 2: Zastępujemy argument $x$ wyrażeniem $x - p = x - (-3) = x + 3$.',
                r'Krok 3: Dodajemy $q = 2$ na końcu wzoru: $g(x) = \frac{1}{x + 3} + 2$.'
            ],
            'result': r'g(x) = \frac{1}{x + 3} + 2'
        },
        exam_trap=r'Najczęstszy błąd maturzysty: mylenie zwrotu przesunięcia poziomego. Pamiętaj: $f(x + 2)$ to przesunięcie w LEWO o 2, a $f(x - 2)$ to przesunięcie w PRAWO o 2.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # =========================================================================
    # Lekcja 13.2: Symetria osiowa względem osi OX i OY
    # =========================================================================
    v2 = get_topic_13_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-13-2-1',
            source='Matura maj 2024 • Zad. 14.4',
            question=r'Funkcje $g$ oraz $h$ są określone za pomocą funkcji $f$ następująco: $g(x) = f(x + 3)$ oraz $h(x) = f(-x)$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Wykres funkcji $h$ jest obrazem wykresu funkcji $f$ w symetrii osiowej względem',
            options_data=[
                ('A', 'osi $OY$'),
                ('B', 'osi $OX$'),
                ('C', 'prostej $y = x$'),
                ('D', 'początku układu współrzędnych')
            ],
            correct_id='A',
            explanation=r'Zgodnie z regułami przekształceń wykresów funkcji:' + '\n' +
                        r'1) $y = -f(x)$ to odbicie lustrzane względem osi $OX$ (zmiana znaku wartości $y$).' + '\n' +
                        r'2) $y = f(-x)$ to odbicie lustrzane względem osi $OY$ (zmiana znaku argumentu $x$).' + '\n' +
                        r'Wzór $h(x) = f(-x)$ oznacza symetrię względem pionowej osi $OY$ (odpowiedź A).',
            cke_trap=r'Gdy minus jest WEWNĄTRZ nawiasu przy $x$ ($f(-x)$), symetria jest względem osi $OY$. Gdy minus jest PRZED całą funkcją ($-f(x)$), symetria jest względem osi $OX$.'
        ),
        make_sc_task(
            task_id='task-13-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wykres funkcji $g(x) = -(x - 1)^2 + 4$ powstał w wyniku symetrii osiowej względem osi $OX$ wykresu funkcji $f$.' + '\n' +
                     r'Wzór funkcji $f$ to',
            options_data=[
                ('A', '$f(x) = (x - 1)^2 - 4$'),
                ('B', '$f(x) = (x + 1)^2 - 4$'),
                ('C', '$f(x) = (x - 1)^2 + 4$'),
                ('D', '$f(x) = -(x + 1)^2 - 4$')
            ],
            correct_id='A',
            explanation=r'Symetria względem osi $OX$ zmienia znak całego wyrażenia: $g(x) = -f(x) \longrightarrow f(x) = -g(x)$.' + '\n' +
                        r'Mnożymy cały wzór funkcji $g$ przez $-1$:' + '\n' +
                        r'$$f(x) = -[-(x - 1)^2 + 4] = (x - 1)^2 - 4$$',
            cke_trap=r'Pamiętaj, że minus przed nawiasem zmienia się w plus, ale wyraz wolny $+4$ również zmienia znak na $-4$!'
        ),
        make_sc_task(
            task_id='task-13-2-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Punkt $A = (-3, 8)$ leży na wykresie funkcji $y = f(x)$. W symetrii osiowej względem osi $OY$ obrazem punktu $A$ jest punkt $A\'$ o współrzędnych',
            options_data=[
                ('A', '$A\' = (3, 8)$'),
                ('B', '$A\' = (-3, -8)$'),
                ('C', '$A\' = (3, -8)$'),
                ('D', '$A\' = (8, -3)$')
            ],
            correct_id='A',
            explanation=r'W symetrii osiowej względem osi $OY$ odbijamy punkt prawo-lewo:' + '\n' +
                        r'Druga współrzędna $y$ pozostaje bez zmian, a pierwsza $x$ zmienia znak na przeciwny:' + '\n' +
                        r'$$A\' = (-x, y) = (-(-3), 8) = (3, 8)$$',
            cke_trap=r'Oś OY jest pionowa, więc punkty przeskakują z lewej na prawą stronę (zmienia się znak $x$).'
        ),
        make_numeric_task(
            task_id='task-13-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Punkt $P = (5, -7)$ przekształcono przez symetrię osiową względem osi $OX$, otrzymując punkt $P\' = (x\', y\')$.' + '\n' +
                     r'Oblicz rzędną $y\'$ punktu $P\'$. Wpisz liczbę całkowitą.',
            correct_val='7',
            explanation=r'W symetrii osiowej względem osi $OX$ pierwsza współrzędna $x$ nie zmienia się, a druga współrzędna $y$ zmienia znak na przeciwny:' + '\n' +
                        r'$$P\' = (x, -y) = (5, -(-7)) = (5, 7)$$' + '\n' +
                        r'Zatem rzędna wynosi $y\' = 7$.',
            cke_trap=r'W symetrii względem osi OX odbijamy punkt góra-dół, więc zmienia się wyłącznie współrzędna pionowa $y$.'
        ),
        make_open_task(
            task_id='task-13-2-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wykres funkcji kwadratowej $f(x) = (x - 2)^2 - 5$ przekształcono przez symetrię osiową względem osi $OX$, otrzymując wykres funkcji $g$.' + '\n' +
                     r'Wyznacz współrzędne wierzchołka paraboli będącej wykresem funkcji $g$ oraz zapisz wzór funkcji $g$ w postaci ogólnej. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – wyznaczenie współrzędnych wierzchołka wykresu funkcji $g$: $W_g = (2, 5)$.' + '\n' +
                        r'2 pkt – poprawne zapisanie wzoru funkcji $g$ w postaci ogólnej: $g(x) = -x^2 + 4x + 1$.',
            explanation=r'Krok 1: Wierzchołek paraboli $f$ to $W_f = (2, -5)$. W symetrii osiowej względem osi $OX$ współrzędna $x$ nie ulega zmianie, a współrzędna $y$ zmienia znak na przeciwny: $W_g = (2, 5)$.' + '\n' +
                        r'Krok 2: Wzór funkcji $g$ to $g(x) = -f(x)$:' + '\n' +
                        r'$$g(x) = -[(x - 2)^2 - 5] = -(x^2 - 4x + 4 - 5) = -(x^2 - 4x - 1) = -x^2 + 4x + 1.$$',
            cke_trap=r'Symetria względem osi OX zmienia znak całego wyrażenia: $g(x) = -f(x)$. Pamiętaj o zmianie znaku również wyrazu wolnego!'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-13-2',
        topic_id=topic_id,
        title='Symetria osiowa względem osi OX i OY',
        concept_essence=(
            "Symetrie osiowe zmieniają znak odpowiedniej współrzędnej punktów wykresu.\n\n"
            "Symetria względem osi OX ($y = -f(x)$): odbicie góra-dół. Znak minus stoi przed całym wzorem funkcji — każdy punkt $(x, y)$ przechodzi w $(x, -y)$. Miejsca zerowe pozostają bez zmian, a zbiór wartości ulega odbiciu i odwróceniu.\n\n"
            "Symetria względem osi OY ($y = f(-x)$): odbicie lewo-prawo. Znak minus stoi przy argumencie $x$ wewnątrz nawiasu — każdy punkt $(x, y)$ przechodzi w $(-x, y)$. Miejsca zerowe zmieniają znak na przeciwny.\n\n"
            "Symetria względem początku układu współrzędnych $(0, 0)$: złożenie obu operacji $y = -f(-x)$ — każdy punkt $(x, y)$ przechodzi w $(-x, -y)$."
        ),
        matura_context='Bardzo częste zadania testowe CKE: rozpoznanie wzoru funkcji po odbiciu w osi OX lub OY oraz transformacja punktów i zbioru wartości.',
        core_formulas=[
            {
                'title': 'Symetrie wykresów funkcji (Karta Wzorów CKE)',
                'latex': r'\text{Oś } OX: \quad y = -f(x), \qquad \text{Oś } OY: \quad y = f(-x)',
                'description': 'Karta wzorów CKE str. 7.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            }
        ],
        worked_example={
            'problem': r'Dany jest wzór funkcji $f(x) = 2x - 3$. Wyznacz wzór funkcji $g(x) = -f(x)$ oraz $h(x) = f(-x)$.',
            'steps': [
                r'Krok 1: Dla symetrii względem osi $OX$ mnożymy cały wzór przez $-1$: $g(x) = -(2x - 3) = -2x + 3$.',
                r'Krok 2: Dla symetrii względem osi $OY$ wstawiamy $-x$ w miejsce $x$: $h(x) = 2(-x) - 3 = -2x - 3$.'
            ],
            'result': r'g(x) = -2x + 3, \quad h(x) = -2x - 3'
        },
        exam_trap=r'Pamiętaj o nawiasie przy wyliczaniu $-f(x)$: minus dotyczy CAŁEGO wyrażenia, a nie tylko pierwszego wyrazu! $-(x^2 - 4) = -x^2 + 4$.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # =========================================================================
    # Lekcja 13.3: Odczytywanie i interpretacja wykresów po przekształceniach
    # =========================================================================
    v3 = get_topic_13_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-13-3-1',
            source='Matura sierpień 2024 • Zad. 12.2',
            question=r'Wykres funkcji $f$ ma wierzchołek w punkcie $W = (1, -2)$ i jest symetryczny względem pewnej prostej pionowej.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Osią symetrii wykresu funkcji $f$ jest prosta o równaniu',
            options_data=[
                ('A', '$x = 1$'),
                ('B', '$y = 1$'),
                ('C', '$x = -2$'),
                ('D', '$y = -2$')
            ],
            correct_id='A',
            explanation=r'Pionowa oś symetrii przechodzi przez wierzchołek paraboli lub symetryczny punkt wykresu.' + '\n' +
                        r'Równanie każdej prostej pionowej ma postać $x = \text{const}$.' + '\n' +
                        r'Skoro pierwsza współrzędna wierzchołka to $x_w = 1$, to osią symetrii jest prosta $x = 1$.',
            cke_trap=r'Prosta pionowa ma równanie $x = \dots$, a nie $y = \dots$. Nie pomyl pierwszej współrzędnej $x = 1$ z rzędną $y = -2$.'
        ),
        make_sc_task(
            task_id='task-13-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Miejscami zerowymi funkcji $f$ są liczby $-3$ oraz $5$. Wykres funkcji $g$ określono wzorem $g(x) = f(x - 2)$.' + '\n' +
                     r'Miejscami zerowymi funkcji $g$ są liczby',
            options_data=[
                ('A', '$-1$ oraz $7$'),
                ('B', '$-5$ oraz $3$'),
                ('C', '$-3$ oraz $5$'),
                ('D', '$-6$ oraz $10$')
            ],
            correct_id='A',
            explanation=r'Wzór $g(x) = f(x - 2)$ oznacza przesunięcie wykresu funkcji $f$ o $2$ jednostki w prawo.' + '\n' +
                        r'Zatem wszystkie miejsca zerowe przesuwają się o $+2$ w prawo:' + '\n' +
                        r'$$x_1\' = -3 + 2 = -1$$' + '\n' +
                        r'$$x_2\' = 5 + 2 = 7$$' + '\n' +
                        r'Miejscami zerowymi funkcji $g$ są liczby $-1$ oraz $7$.',
            cke_trap=r'Wykres przesuwa się w prawo, więc do miejsc zerowych DODAJEMY $2$, a nie odejmujemy!'
        ),
        make_sc_task(
            task_id='task-13-3-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wykres funkcji $f$ przesunięto najpierw o wektor $\vec{u} = [2, -1]$, a następnie otrzymany wykres odbito symetrycznie względem osi $OX$.' + '\n' +
                     r'Wzór otrzymanej funkcji $h$ to',
            options_data=[
                ('A', '$h(x) = -f(x - 2) + 1$'),
                ('B', '$h(x) = -f(x - 2) - 1$'),
                ('C', '$h(x) = -f(x + 2) + 1$'),
                ('D', '$h(x) = f(x - 2) - 1$')
            ],
            correct_id='A',
            explanation=r'Krok 1: Po przesunięciu o wektor $[2, -1]$ otrzymujemy funkcję $g(x) = f(x - 2) - 1$.' + '\n' +
                        r'Krok 2: Symetria względem osi $OX$ nakłada minus na całą funkcję $g$:' + '\n' +
                        r'$$h(x) = -g(x) = -[f(x - 2) - 1] = -f(x - 2) + 1$$',
            cke_trap=r'Minus z odbicia osi OX zmienia znak KAŻDEGO składnika: $-(-1) = +1$.'
        ),
        make_numeric_task(
            task_id='task-13-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Funkcja $f$ ma miejsce zerowe $x_0 = -6$. Wykres funkcji $g$ określono wzorem $g(x) = f(x - 5)$.' + '\n' +
                     r'Oblicz miejsce zerowe funkcji $g$. Wpisz liczbę całkowitą.',
            correct_val='-1',
            explanation=r'Wzór $g(x) = f(x - 5)$ oznacza przesunięcie wykresu funkcji $f$ o 5 jednostek w prawo.' + '\n' +
                        r'Zatem miejsce zerowe przesuwa się w prawo o 5 jednostek:' + '\n' +
                        r'$$x_0\' = -6 + 5 = -1.$$',
            cke_trap=r'Przesunięcie w prawo (minus w nawiasie) oznacza DODAWANIE 5 do argumentu: $-6 + 5 = -1$, a nie $-6 - 5 = -11$!'
        ),
        make_open_task(
            task_id='task-13-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wykres funkcji liniowej $f(x) = 2x - 4$ przesunięto o wektor $\vec{v} = [-1, 3]$, otrzymując wykres funkcji $g$. Wyznacz miejsce zerowe funkcji $g$. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt - poprawne wyznaczenie wzoru funkcji g(x) = 2(x + 1) - 4 + 3 = 2x + 1.' + '\n' +
                        r'2 pkt - rozwiązanie równania 2x + 1 = 0 i podanie miejsca zerowego x = -1/2.',
            explanation=r'Krok 1: Wyznaczamy wzór funkcji $g(x)$ po przesunięciu o wektor $[-1, 3]$:' + '\n' +
                        r'$$g(x) = f(x - (-1)) + 3 = f(x + 1) + 3$$' + '\n' +
                        r'Podstawiamy do wzoru funkcji $f$:' + '\n' +
                        r'$$g(x) = 2(x + 1) - 4 + 3 = 2x + 2 - 1 = 2x + 1$$' + '\n' +
                        r'Krok 2: Obliczamy miejsce zerowe funkcji $g$:' + '\n' +
                        r'$$2x + 1 = 0 \longrightarrow 2x = -1 \longrightarrow x = -\\frac{1}{2}$$' + '\n' +
                        r'Miejscem zerowym funkcji $g$ jest $x = -\\frac{1}{2}$.',
            cke_trap=r'Pamiętaj o nawiasie przy podstawianiu: $2(x + 1)$ to $2x + 2$, a nie $2x + 1$. Błąd w wymnożeniu zniekształca cały wynik końcowy.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-13-3',
        topic_id=topic_id,
        title='Interpretacja wykresów złożonych',
        concept_essence=(
            "Złożenie przekształceń wykresu funkcji wykonujemy krok po kroku, ściśle rozróżniając operacje wewnątrz funkcji od operacji zewnętrznych.\n\n"
            "Kolejność operacji: najpierw wykonujemy przekształcenia argumentu (wewnątrz nawiasu: translacja pozioma lub symetria $OY$), a następnie operacje na wartości (na zewnątrz: minus przed funkcją, translacja pionowa).\n\n"
            "Śledzenie punktów charakterystycznych: aby przekształcić wykres, wystarczy przetransformować kilka kluczowych punktów (np. wierzchołek paraboli, miejsca zerowe, punkty załamania).\n\n"
            "Monotoniczność i liczba rozwiązań: odbicie $y = -f(x)$ odwraca monotoniczność (rosnąca staje się malejąca), a translacje nie zmieniają liczby rozwiązań równania $f(x) = m$, jedynie przesuwają poziom prostych testowych."
        ),
        matura_context='Zadania łączone na maturze: badanie monotoniczności, liczby rozwiązań równania f(x) = m po przekształceniu oraz miejsc zerowych.',
        core_formulas=[
            {
                'title': 'Złożenie przekształceń',
                'latex': r'g(x) = -f(x - p) + q',
                'description': 'Karta wzorów CKE str. 7.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            }
        ],
        worked_example={
            'problem': r'Funkcja $f$ ma miejsce zerowe $x_0 = 4$. Jakie miejsce zerowe ma funkcja $g(x) = f(x + 3)$?',
            'steps': [
                r'Krok 1: Wzór $g(x) = f(x + 3)$ oznacza przesunięcie wykresu o $3$ jednostki w lewo (wektor $\vec{v} = [-3, 0]$).',
                r'Krok 2: Miejsce zerowe przesuwa się w lewo o $3$: $x_0\' = 4 - 3 = 1$.'
            ],
            'result': r'x_0\' = 1'
        },
        exam_trap=r'Nie zapominaj: jeśli w nawiasie jest $+3$, to wykres i miejsca zerowe przesuwają się w LEWO (odejmujemy 3 od współrzędnej x).',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'description': 'Przesunięcie równoległe o wektor [p, q], symetrie osiowe OX i OY oraz analiza własności funkcji po przekształceniach geometrycznych.',
        'lessons': lessons
    }
