"""
topic_12_builder.py - Dział 12: Funkcja kwadratowa (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Mafs Parabolas
"""
import sys
import os
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_12 import get_topic_12_visuals
try:
    from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson
except ImportError:
    from helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_12():
    topic_id = 'dzial-12'
    topic_title = 'Funkcja kwadratowa'
    topic_number = 12
    lessons = []

    # ----------------------------------------------------
    # Lekcja 12.1: Postacie funkcji kwadratowej i wierzchołek paraboli (L12.1)
    # ----------------------------------------------------
    v1 = get_topic_12_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-12-1-1',
            source='Rozgrzewka • Wierzchołek z postaci kanonicznej',
            question='Wierzchołkiem paraboli będącej wykresem funkcji kwadratowej $f(x) = -2(x - 3)^2 + 5$ jest punkt $W$ o współrzędnych',
            options_data=[
                ('A', '$(3, 5)$'),
                ('B', '$(-3, 5)$'),
                ('C', '$(3, -5)$'),
                ('D', '$(-3, -5)$')
            ],
            correct_id='A',
            explanation='Postać kanoniczna to $f(x) = a(x - p)^2 + q$, gdzie współrzędne wierzchołka to $W(p, q)$.\nPorównując ze wzorem $f(x) = -2(x - 3)^2 + 5$, odczytujemy:\n$$p = 3, \\quad q = 5 \\implies W = (3, 5).$$',
            cke_trap='Pułapka znaku: We wzorze jest $(x - p)$, więc w nawiasie $(x - 3)$ liczba $p$ wynosi $+3$, a NIE $-3$!',
            plot={
                'type': 'PARABOLA',
                'xRange': [-1, 7],
                'yRange': [-5, 8],
                'gridStep': 1,
                'a': -2,
                'b': 12,
                'c': -13,
                'points': [
                    {'x': 3, 'y': 5, 'label': 'W(3, 5)', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'}
                ],
                'lines': [
                    {'x': 3, 'color': '#38BDF8', 'label': 'oś symetrii x = 3', 'dashed': True}
                ]
            }
        ),
        make_sc_task(
            task_id='task-12-1-2',
            source='Matura maj 2024 • Wzorzec CKE',
            question='Osią symetrii wykresu funkcji kwadratowej $f(x) = x^2 - 6x + 8$ jest prosta o równaniu',
            options_data=[
                ('A', '$x = 3$'),
                ('B', '$x = -3$'),
                ('C', '$y = 3$'),
                ('D', '$x = 6$')
            ],
            correct_id='A',
            explanation='Osią symetrii paraboli jest pionowa prosta przechodząca przez wierzchołek: $x = p$.\nWspółczynniki: $a = 1, b = -6$. Obliczamy odciętą wierzchołka:\n$$p = -\\frac{b}{2a} = -\\frac{-6}{2 \\cdot 1} = \\frac{6}{2} = 3.$$\nZatem osią symetrii jest prosta $x = 3$.',
            cke_trap='Oś symetrii paraboli to prosta pionowa o równaniu $x = p$, a NIE pozioma $y = q$!',
            plot={
                'type': 'PARABOLA',
                'xRange': [0, 6],
                'yRange': [-3, 5],
                'gridStep': 1,
                'a': 1,
                'b': -6,
                'c': 8,
                'points': [
                    {'x': 3, 'y': -1, 'label': 'W(3, -1)', 'dot': 'filled', 'color': '#10B981', 'attach': 's'},
                    {'x': 2, 'y': 0, 'label': 'x₁=2', 'dot': 'filled', 'color': '#FFB800', 'attach': 'nw'},
                    {'x': 4, 'y': 0, 'label': 'x₂=4', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'}
                ],
                'lines': [
                    {'x': 3, 'color': '#38BDF8', 'label': 'x = 3', 'dashed': True}
                ]
            }
        ),
        make_sc_task(
            task_id='task-12-1-3',
            source='Matura czerwiec 2023 • Zad. 11',
            question='Funkcja kwadratowa $f$ ma dwa miejsca zerowe: $x_1 = -2$ oraz $x_2 = 4$. Wykres funkcji $f$ przechodzi przez punkt $P(0, -8)$.\nWzór funkcji $f$ w postaci iloczynowej to',
            options_data=[
                ('A', '$f(x) = (x + 2)(x - 4)$'),
                ('B', '$f(x) = -(x + 2)(x - 4)$'),
                ('C', '$f(x) = 2(x - 2)(x + 4)$'),
                ('D', '$f(x) = (x - 2)(x + 4)$')
            ],
            correct_id='A',
            explanation='Postać iloczynowa: $f(x) = a(x - x_1)(x - x_2) = a(x + 2)(x - 4)$.\nPodstawiamy współrzędne punktu $P(0, -8)$:\n$$-8 = a(0 + 2)(0 - 4) \\implies -8 = a(2)(-4) \\implies -8 = -8a \\implies a = 1.$$\nZatem $f(x) = 1 \\cdot (x + 2)(x - 4) = (x + 2)(x - 4)$.',
            cke_trap='Pamiętaj o współczynniku $a$ przed nawiasami! Postać iloczynowa to $a(x-x_1)(x-x_2)$, nie wolno automatycznie zakładać, że $a=1$ bez sprawdzenia punktu.',
            plot={
                'type': 'PARABOLA',
                'xRange': [-4, 6],
                'yRange': [-10, 5],
                'gridStep': 2,
                'a': 1,
                'b': -2,
                'c': -8,
                'points': [
                    {'x': -2, 'y': 0, 'label': 'x₁ = -2', 'dot': 'filled', 'color': '#FFB800', 'attach': 'nw'},
                    {'x': 4, 'y': 0, 'label': 'x₂ = 4', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'},
                    {'x': 0, 'y': -8, 'label': 'P(0, -8)', 'dot': 'filled', 'color': '#10B981', 'attach': 'e'}
                ]
            }
        ),
        make_tf_task(
            task_id='task-12-1-4',
            source='Ocena CKE • Własności współczynnika a paraboli',
            question='Oceń prawdziwość zdania: Jeśli współczynnik $a$ we wzorze funkcji kwadratowej $f(x) = ax^2 + bx + c$ jest ujemny ($a < 0$), to funkcja ta osiąga wartość największą równą $q$ w wierzchołku paraboli.',
            correct_tf='PRAWDA',
            explanation='Dla $a < 0$ ramiona paraboli skierowane są w dół. Oznacza to, że wierzchołek $W(p, q)$ leży w najwyższym punkcie wykresu, więc funkcja osiąga wartość największą (maksimum globalne) równą $q$. Zdanie jest prawdziwe.',
            cke_trap='Dla $a > 0$ ramiona idą w górę $\\implies$ wartość najmniejsza w wierzchołku. Dla $a < 0$ ramiona idą w dół $\\implies$ wartość największa w wierzchołku.'
        ),
        make_numeric_task(
            task_id='task-12-1-5',
            source='Własność CKE • Środek symetrii pierwiastków',
            question='Miejscami zerowymi funkcji kwadratowej są liczby $x_1 = -5$ oraz $x_2 = 11$.\nOblicz pierwszą współrzędną wierzchołka paraboli ($p$). Wpisz samą liczbę.',
            correct_val=3,
            explanation='Wierzchołek paraboli leży dokładnie na osi symetrii pośrodku między miejscami zerowymi:\n$$p = \\frac{x_1 + x_2}{2} = \\frac{-5 + 11}{2} = \\frac{6}{2} = 3.$$',
            cke_trap='Odcięta wierzchołka $p$ jest zawsze średnią arytmetyczną miejsc zerowych, bez konieczności znajomości współczynników $a$ i $b$!'
        )
    ]

    l1 = make_lesson(
        lesson_id='lesson-12-1',
        topic_id=topic_id,
        title='Postacie funkcji kwadratowej i wierzchołek paraboli',
        concept_essence={
            'lead': 'Funkcja kwadratowa posiada 3 równoważne postacie: ogólną, kanoniczną i iloczynową.',
            'pillars': [
                {'title': 'Postać ogólna', 'description': 'y = ax^2 + bx + c. Wyraz c to punkt przecięcia z osią OY: (0, c). Delta decyduje o liczbie miejsc zerowych.'},
                {'title': 'Postać kanoniczna', 'description': 'y = a(x - p)^2 + q. Bezpośrednio podaje współrzędne wierzchołka W(p, q) oraz oś symetrii x = p.'},
                {'title': 'Postać iloczynowa', 'description': 'y = a(x - x1)(x - x2). Istnieje tylko dla Delty >= 0 i bezpośrednio zdradza miejsca zerowe.'}
            ]
        },
        matura_context='Fundament matury: Każdy arkusz CKE sprawdza odczytywanie wierzchołka z postaci kanonicznej lub przejście między postaciami.',
        core_formulas=[
            {
                'title': 'Współrzędne wierzchołka paraboli',
                'latex': 'W = (p, q), \\quad p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a}',
                'description': 'Punkt wierzchołka paraboli i pionowa oś symetrii x = p.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            },
            {
                'title': 'Postać kanoniczna funkcji kwadratowej',
                'latex': 'f(x) = a(x - p)^2 + q',
                'description': 'Pozwala na natychmiastowe odczytanie wierzchołka W(p, q).',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            },
            {
                'title': 'Postać iloczynowa funkcji kwadratowej',
                'latex': 'f(x) = a(x - x_1)(x - x_2) \\quad (\\text{dla } \\Delta > 0)',
                'description': 'Postać z uwzględnionymi pierwiastkami x1 oraz x2.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            }
        ],
        worked_example={
            'problem': 'Przekształć funkcję $f(x) = 2x^2 - 8x + 6$ do postaci kanonicznej oraz iloczynowej.',
            'steps': [
                {'num': 1, 'label': 'Obliczenie delty i wierzchołka', 'text': '$\\Delta = (-8)^2 - 4 \\cdot 2 \\cdot 6 = 64 - 48 = 16$. Odcięta: $p = -\\frac{-8}{2 \\cdot 2} = 2$. Rzędna: $q = -\\frac{16}{4 \\cdot 2} = -2$.'},
                {'num': 2, 'label': 'Zapis postaci kanonicznej', 'text': 'Wstawiamy $a=2, p=2, q=-2$: $f(x) = 2(x - 2)^2 - 2$.'},
                {'num': 3, 'label': 'Obliczenie pierwiastków i postać iloczynowa', 'text': '$\\sqrt{\\Delta} = 4$. $x_1 = \\frac{8 - 4}{4} = 1, x_2 = \\frac{8 + 4}{4} = 3$. Zatem postać iloczynowa: $f(x) = 2(x - 1)(x - 3)$.'}
            ],
            'result': 'f(x) = 2(x - 2)^2 - 2 \\quad | \\quad f(x) = 2(x - 1)(x - 3)'
        },
        exam_trap='Typowy błąd: Zgubienie współczynnika $a$ przy zapisie postaci iloczynowej: pisanie $(x - 1)(x - 3)$ zamiast $2(x - 1)(x - 3)$!',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 12.2: Własności i wyznaczanie wzoru funkcji kwadratowej (L12.2)
    # ----------------------------------------------------
    v2 = get_topic_12_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-12-2-1',
            source='Rozgrzewka • Zbiór wartości funkcji kwadratowej',
            question='Zbiorem wartości funkcji kwadratowej $f(x) = 3(x + 2)^2 - 7$ jest przedział',
            options_data=[
                ('A', '$\\langle -7, +\\infty)$'),
                ('B', '$(-\\infty, -7\\rangle$'),
                ('C', '$\\langle -2, +\\infty)$'),
                ('D', '$\\langle 7, +\\infty)$')
            ],
            correct_id='A',
            explanation='Współczynnik $a = 3 > 0$, więc ramiona paraboli skierowane są w górę. Rzędna wierzchołka wynosi $q = -7$.\nNajmniejsza wartość funkcji to $y = -7$, zatem zbiór wartości wynosi $ZW = \\langle q, +\\infty) = \\langle -7, +\\infty)$.',
            cke_trap='Zbiór wartości ZW wyznacza rzędna $q$ (na osi OY), a NIE odcięta $p$ (na osi OX)!',
            plot={
                'type': 'PARABOLA',
                'xRange': [-5, 1],
                'yRange': [-9, 5],
                'gridStep': 2,
                'a': 3,
                'b': 12,
                'c': 5,
                'points': [
                    {'x': -2, 'y': -7, 'label': 'W(-2, -7)', 'dot': 'filled', 'color': '#10B981', 'attach': 's'}
                ],
                'lines': [
                    {'slope': 0, 'intercept': -7, 'color': '#FFB800', 'label': 'y = -7 (min)', 'dashed': True}
                ]
            }
        ),
        make_sc_task(
            task_id='task-12-2-2',
            source='Matura maj 2023 • Zad. 10',
            question='Funkcja kwadratowa $f$ jest określona wzorem $f(x) = -(x - 1)^2 + 4$.\nFunkcja $f$ jest rosnąca w przedziale',
            options_data=[
                ('A', '$(-\\infty, 1\\rangle$'),
                ('B', '$\\langle 1, +\\infty)$'),
                ('C', '$(-\\infty, 4\\rangle$'),
                ('D', '$\\langle 4, +\\infty)$')
            ],
            correct_id='A',
            explanation='Współczynnik $a = -1 < 0$ (ramiona w dół), a wierzchołek ma odciętą $p = 1$.\nParabola rośnie od $-\\infty$ aż do wierzchołka $x = 1$, a następnie maleje.\nZatem przedziałem, w którym funkcja jest rosnąca, jest $(-\\infty, 1\\rangle$.',
            cke_trap='Przedziały monotoniczności zawsze odczytujemy na osi $OX$ (według liczby $p=1$), a NIE na osi $OY$ (według $q=4$)!',
            plot={
                'type': 'PARABOLA',
                'xRange': [-2, 4],
                'yRange': [-5, 6],
                'gridStep': 1,
                'a': -1,
                'b': 2,
                'c': 3,
                'points': [
                    {'x': 1, 'y': 4, 'label': 'W(1, 4)', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'}
                ],
                'lines': [
                    {'x': 1, 'color': '#38BDF8', 'label': 'x = 1', 'dashed': True}
                ]
            }
        ),
        make_sc_task(
            task_id='task-12-2-3',
            source='Matura sierpień 2024 • Wzorzec CKE',
            question='Wykres funkcji kwadratowej $f(x) = ax^2 + bx + c$ ma wierzchołek w punkcie $W(2, -3)$ i przecina oś $OY$ w punkcie $(0, 5)$.\nWspółczynnik $c$ oraz współczynnik $a$ są równe',
            options_data=[
                ('A', '$c = 5, \\quad a = 2$'),
                ('B', '$c = -3, \\quad a = 2$'),
                ('C', '$c = 5, \\quad a = 1$'),
                ('D', '$c = 5, \\quad a = -2$')
            ],
            correct_id='A',
            explanation='1. Punkt przecięcia z osią $OY$ to $(0, f(0)) = (0, c)$, zatem natychmiast $c = 5$.\n2. Z postaci kanonicznej $f(x) = a(x - 2)^2 - 3$. Podstawiamy punkt $(0, 5)$:\n$$5 = a(0 - 2)^2 - 3 \\implies 5 = 4a - 3 \\implies 8 = 4a \\implies a = 2.$$',
            cke_trap='Wyraz wolny $c$ to zawsze wartość funkcji w zerze: $c = f(0)$!',
            plot={
                'type': 'PARABOLA',
                'xRange': [-1, 5],
                'yRange': [-4, 7],
                'gridStep': 1,
                'a': 2,
                'b': -8,
                'c': 5,
                'points': [
                    {'x': 2, 'y': -3, 'label': 'W(2, -3)', 'dot': 'filled', 'color': '#10B981', 'attach': 's'},
                    {'x': 0, 'y': 5, 'label': '(0, 5) ⟹ c=5', 'dot': 'filled', 'color': '#FFB800', 'attach': 'e'}
                ]
            }
        ),
        make_tf_task(
            task_id='task-12-2-4',
            source='Ocena CKE • Własności monotoniczności',
            question='Oceń prawdziwość zdania: Funkcja kwadratowa $f(x) = 2(x - 4)^2 + 1$ jest malejąca w przedziale $(-\\infty, 4\\rangle$ i rosnąca w przedziale $\\langle 4, +\\infty)$.',
            correct_tf='PRAWDA',
            explanation='Współczynnik $a = 2 > 0$ (ramiona w górę), odcięta wierzchołka $p = 4$. Wykres opada od lewej strony aż do $x = 4$, a od $x = 4$ w prawo stale rośnie. Zdanie jest prawdziwe.',
            cke_trap='Dla $a > 0$ kolejność przedziałów to: najpierw maleje do $p$, potem rośnie od $p$.'
        ),
        make_numeric_task(
            task_id='task-12-2-5',
            source='Trening JASNE • Odczytywanie wartości z wierzchołka',
            question='Funkcja kwadratowa $f$ osiąga najmniejszą wartość równą $-9$ dla argumentu $x = 2$, a jej wykres przechodzi przez punkt $P(0, -1)$.\nOblicz wartość współczynnika $a$ tej funkcji. Wpisz samą liczbę.',
            correct_val=2,
            explanation='Z treści zadania wierzchołkiem jest $W(2, -9)$, więc postać kanoniczna to $f(x) = a(x - 2)^2 - 9$.\nPodstawiamy współrzędne punktu $P(0, -1)$:\n$$-1 = a(0 - 2)^2 - 9 \\implies -1 = 4a - 9 \\implies 4a = 8 \\implies a = 2.$$',
            cke_trap='Sformułowanie „osiąga wartość najmniejszą równą $q$ dla argumentu $x = p$” to definicja wierzchołka $W(p, q) = (2, -9)$!'
        )
    ]

    l2 = make_lesson(
        lesson_id='lesson-12-2',
        topic_id=topic_id,
        title='Własności i wyznaczanie wzoru funkcji kwadratowej',
        concept_essence={
            'lead': 'Własności funkcji kwadratowej wynikają bezpośrednio z położenia wierzchołka W(p, q) oraz znaku a.',
            'pillars': [
                {'title': 'Zbiór wartości ZW', 'description': 'Dla a > 0: ZW = ⟨q, +∞). Dla a < 0: ZW = (-∞, q⟩. Liczba q jest zawsze kresem zbioru wartości.'},
                {'title': 'Monotoniczność', 'description': 'Zmienia się w punkcie x = p. Dla a > 0 maleje w (-∞, p⟩ i rośnie w ⟨p, +∞). Dla a < 0 odwrotnie.'},
                {'title': 'Punkt przecięcia z OY', 'description': 'Wykres zawsze przecina oś OY w punkcie (0, c), co pozwala błyskawicznie wyznaczyć wyraz wolny c.'}
            ]
        },
        matura_context='Pewniak CKE: Pytania o zbiór wartości ZW lub przedziały monotoniczności pojawiają się w każdym arkuszu maturalnym.',
        core_formulas=[
            {
                'title': 'Zbiór wartości funkcji kwadratowej',
                'latex': 'a > 0 \\implies ZW = \\langle q, +\\infty), \\quad a < 0 \\implies ZW = (-\\infty, q\\rangle',
                'description': 'Zbiór wartości określony przez rzędną wierzchołka q.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            },
            {
                'title': 'Monotoniczność w przedziałach',
                'latex': 'x \\in (-\\infty, p\\rangle \\quad \\text{oraz} \\quad x \\in \\langle p, +\\infty)',
                'description': 'Granicą przedziałów monotoniczności jest odcięta wierzchołka p.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            }
        ],
        worked_example={
            'problem': 'Wyznacz zbiór wartości oraz przedziały monotoniczności funkcji $f(x) = -x^2 + 4x + 5$.',
            'steps': [
                {'num': 1, 'label': 'Obliczenie współrzędnych wierzchołka', 'text': '$p = -\\frac{4}{2(-1)} = 2$. Rzędna: $q = f(2) = -(2)^2 + 4(2) + 5 = -4 + 8 + 5 = 9$.'},
                {'num': 2, 'label': 'Wyznaczenie zbioru wartości', 'text': 'Ponieważ $a = -1 < 0$ (ramiona w dół), zbiór wartości to $ZW = (-\\infty, 9\\rangle$.'},
                {'num': 3, 'label': 'Określenie monotoniczności', 'text': 'Funkcja rośnie w przedziale $(-\\infty, 2\\rangle$ i maleje w przedziale $\\langle 2, +\\infty)$.'}
            ],
            'result': 'ZW = (-\\infty, 9\\rangle, \\quad \\nearrow \\text{w } (-\\infty, 2\\rangle, \\quad \\searrow \\text{w } \\langle 2, +\\infty)'
        },
        exam_trap='Typowy błąd: Wpisywanie $q$ zamiast $p$ do przedziałów monotoniczności, np. pisanie $(-\\infty, 9\\rangle$ zamiast $(-\\infty, 2\\rangle$. Pamiętaj: monotoniczność określamy dla ARGUMENTÓW $x$ (czyli $p$)!',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 12.3: Wartość najmniejsza i największa w przedziale domkniętym (L12.3)
    # ----------------------------------------------------
    v3 = get_topic_12_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-12-3-1',
            source='Matura maj 2024 • Zad. 9',
            question='Wartość najmniejsza funkcji kwadratowej $f(x) = x^2 - 4x + 1$ w przedziale domkniętym $\\langle 0, 5 \\rangle$ jest równa',
            options_data=[
                ('A', '$-3$'),
                ('B', '$1$'),
                ('C', '$6$'),
                ('D', '$-4$')
            ],
            correct_id='A',
            explanation='Algorytm 3 kroków:\n1. Obliczamy odciętą wierzchołka: $p = -\\frac{-4}{2 \\cdot 1} = 2$.\n2. Sprawdzamy, czy $p \\in \\langle 0, 5 \\rangle$: Tak, $2 \\in \\langle 0, 5 \\rangle$.\n3. Ponieważ $a = 1 > 0$, funkcja osiąga minimum w wierzchołku:\n$$f(2) = 2^2 - 4(2) + 1 = 4 - 8 + 1 = -3.$$\nWartości na krańcach: $f(0) = 1, f(5) = 25 - 20 + 1 = 6$.\nNajmniejsza wartość w przedziale to $-3$.',
            cke_trap='Zawsze sprawdź, czy $p$ wpada do przedziału. Jeśli wpada i $a > 0$, to wartość najmniejsza ZAWSZE wynosi $q = f(p)$!',
            plot={
                'type': 'PARABOLA',
                'xRange': [-1, 6],
                'yRange': [-5, 8],
                'gridStep': 1,
                'a': 1,
                'b': -4,
                'c': 1,
                'points': [
                    {'x': 2, 'y': -3, 'label': 'W(2, -3) (min)', 'dot': 'filled', 'color': '#10B981', 'attach': 's'},
                    {'x': 0, 'y': 1, 'label': 'f(0) = 1', 'dot': 'filled', 'color': '#FFB800', 'attach': 'w'},
                    {'x': 5, 'y': 6, 'label': 'f(5) = 6 (max)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'}
                ],
                'lines': [
                    {'x': 0, 'color': '#A855F7', 'dashed': True},
                    {'x': 5, 'color': '#A855F7', 'dashed': True}
                ]
            }
        ),
        make_sc_task(
            task_id='task-12-3-2',
            source='Matura czerwiec 2024 • Wzorzec CKE',
            question='Funkcja kwadratowa $f(x) = (x - 1)^2 + 3$ jest rozpatrywana w przedziale $\\langle 3, 6 \\rangle$.\nWskaż wartość najmniejszą tej funkcji w tym przedziale.',
            options_data=[
                ('A', '$7$'),
                ('B', '$3$'),
                ('C', '$28$'),
                ('D', '$4$')
            ],
            correct_id='A',
            explanation='1. Wierzchołek paraboli ma współrzędne $W(1, 3)$, czyli $p = 1$.\n2. Sprawdzamy: $p = 1 \\notin \\langle 3, 6 \\rangle$. Wierzchołek leży POZA przedziałem!\n3. Ponieważ $a = 1 > 0$ i cały przedział $\\langle 3, 6 \\rangle$ leży na prawo od wierzchołka ($x \\ge 1$), funkcja w tym przedziale stale rośnie.\nZatem wartość najmniejsza wypada na lewym krańcu $x = 3$:\n$$f(3) = (3 - 1)^2 + 3 = 2^2 + 3 = 4 + 3 = 7.$$',
            cke_trap='Krytyczna pułapka CKE: Wartość $q = 3$ wierzchołka NIE jest wartością w przedziale, bo $x = 1$ nie należy do $\\langle 3, 6 \\rangle$!',
            plot={
                'type': 'PARABOLA',
                'xRange': [0, 7],
                'yRange': [0, 30],
                'gridStep': 5,
                'a': 1,
                'b': -2,
                'c': 4,
                'points': [
                    {'x': 1, 'y': 3, 'label': 'W(1, 3) (poza przedziałem)', 'dot': 'hollow', 'color': '#94A3B8', 'attach': 's'},
                    {'x': 3, 'y': 7, 'label': 'f(3) = 7 (min)', 'dot': 'filled', 'color': '#10B981', 'attach': 'nw'},
                    {'x': 6, 'y': 28, 'label': 'f(6) = 28 (max)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'ne'}
                ],
                'lines': [
                    {'x': 3, 'color': '#A855F7', 'dashed': True},
                    {'x': 6, 'color': '#A855F7', 'dashed': True}
                ]
            }
        ),
        make_numeric_task(
            task_id='task-12-3-3',
            source='Trening CKE • Suma wartości skrajnych',
            question='Funkcja kwadratowa $f(x) = -x^2 + 6x - 5$ osiąga w przedziale $\\langle 1, 4 \\rangle$ wartość najmniejszą $m$ oraz największą $M$.\nOblicz sumę $m + M$. Wpisz samą liczbę.',
            correct_val=4,
            explanation='1. $p = -\\frac{6}{2(-1)} = 3$. Ponieważ $3 \\in \\langle 1, 4 \\rangle$, wierzchołek wpada do przedziału.\n2. $a = -1 < 0 \\implies$ w wierzchołku jest maksimum:\n$$M = f(3) = -9 + 18 - 5 = 4.$$\n3. Krańce przedziału:\n$$f(1) = -1 + 6 - 5 = 0$$\n$$f(4) = -16 + 24 - 5 = 3$$\nZatem minimum to $m = 0$.\nSuma: $m + M = 0 + 4 = 4$.',
            cke_trap='Wartość najmniejsza $m$ na krańcach to $f(1) = 0$, a największa to wierzchołek $M = 4$. Suma wynosi 4.'
        ),
        make_tf_task(
            task_id='task-12-3-4',
            source='Ocena CKE • Wierzchołek a przedział domknięty',
            question='Oceń prawdziwość zdania: Jeśli pierwsza współrzędna wierzchołka paraboli $p$ nie należy do zadanego przedziału domkniętego $\\langle a, b \\rangle$, to wartości najmniejsza i największa funkcji kwadratowej w tym przedziale są osiągane na jego krańcach.',
            correct_tf='PRAWDA',
            explanation='Jeśli $p \\notin \\langle a, b \\rangle$, to parabola w całym przedziale $\\langle a, b \\rangle$ jest ściśle monotoniczna (albo rośnie, albo maleje). Funkcja monotoniczna zawsze osiąga swoje ekstrema na krańcach przedziału: w punkcie $a$ oraz w punkcie $b$. Zdanie jest w 100% prawdziwe.',
            cke_trap='Brak wierzchołka w przedziale upraszcza zadanie: wystarczy policzyć $f(a)$ i $f(b)$!'
        ),
        make_open_task(
            task_id='task-12-3-5',
            source='CKE Maj 2023 • Zadanie otwarte (2 pkt)',
            question='Wyznacz wartość najmniejszą i wartość największą funkcji kwadratowej $f(x) = 2x^2 - 8x + 3$ w przedziale domkniętym $\\langle -1, 3 \\rangle$. Zapisz pełne obliczenia.',
            points=2,
            scoring_key=[
                ('1 pkt', 'Obliczenie $p = 2$, sprawdzenie warunku $2 \\in \\langle -1, 3 \\rangle$ i obliczenie wartości w wierzchołku $f(2) = -5$.'),
                ('2 pkt', 'Obliczenie wartości na krańcach $f(-1) = 13, f(3) = -3$ i sformułowanie poprawnej odpowiedzi: $y_{\\min} = -5, y_{\\max} = 13$.')
            ],
            explanation='Krok 1: Wyznaczamy odciętą wierzchołka paraboli:\n$$p = -\\frac{b}{2a} = -\\frac{-8}{2 \\cdot 2} = \\frac{8}{4} = 2.$$\nSprawdzamy obecność w przedziale: $2 \\in \\langle -1, 3 \\rangle$.\nKrok 2: Ponieważ $a = 2 > 0$, w wierzchołku funkcja osiąga wartość najmniejszą:\n$$f(2) = 2(2)^2 - 8(2) + 3 = 8 - 16 + 3 = -5.$$\nKrok 3: Obliczamy wartości na krańcach przedziału:\n$$f(-1) = 2(-1)^2 - 8(-1) + 3 = 2(1) + 8 + 3 = 13$$\n$$f(3) = 2(3)^2 - 8(3) + 3 = 18 - 24 + 3 = -3.$$\nKrok 4: Zestawienie wyników:\nWartość najmniejsza: $y_{\\min} = -5$ (dla $x = 2$).\nWartość największa: $y_{\\max} = 13$ (dla $x = -1$).',
            cke_trap='Częsty błąd: Porównanie tylko krańców $f(-1)$ i $f(3)$ z pominięciem wierzchołka $f(2)$. Bez sprawdzenia wierzchołka traci się 1 z 2 punktów!'
        )
    ]

    l3 = make_lesson(
        lesson_id='lesson-12-3',
        topic_id=topic_id,
        title='Wartość najmniejsza i największa w przedziale domkniętym',
        concept_essence={
            'lead': 'Ekstrema w przedziale ⟨a, b⟩ znajdują się wyłącznie w wierzchołku (o ile p wpada do przedziału) lub na krańcach.',
            'pillars': [
                {'title': 'Krok 1: Odcięta wierzchołka', 'description': 'Oblicz p = -b / (2a). To jedyny punkt wewnątrz przedziału, w którym może pojawić się ekstremum lokalne.'},
                {'title': 'Krok 2: Test obecności', 'description': 'Sprawdź, czy p ∈ ⟨a, b⟩. Jeśli tak, oblicz f(p) = q. Jeśli nie – wierzchołek całkowicie ignorujesz!'},
                {'title': 'Krok 3: Wartości na krańcach', 'description': 'Oblicz f(a) i f(b). Spośród wyznaczonych liczb wybierz najmniejszą i największą.'}
            ]
        },
        matura_context='Żelazny pewniak za 2 pkt: Klasyczne zadanie otwarte CKE sprawdzające precyzyjną procedurę 3 kroków.',
        core_formulas=[
            {
                'title': 'Odcięta wierzchołka jako punkt krytyczny',
                'latex': 'p = -\\frac{b}{2a}, \\quad p \\in \\langle \\alpha, \\beta \\rangle',
                'description': 'Wierzchołek bierzemy pod uwagę tylko gdy leży wewnątrz badanego przedziału.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            }
        ],
        worked_example={
            'problem': 'Znajdź wartość najmniejszą i największą funkcji $f(x) = x^2 - 2x + 5$ w przedziale $\\langle 0, 4 \\rangle$.',
            'steps': [
                {'num': 1, 'label': 'Wierzchołek', 'text': '$p = -\\frac{-2}{2 \\cdot 1} = 1$. Mamy $1 \\in \\langle 0, 4 \\rangle$, więc liczymy: $f(1) = 1 - 2 + 5 = 4$.'},
                {'num': 2, 'label': 'Wartości na krańcach', 'text': '$f(0) = 5$, $f(4) = 4^2 - 2(4) + 5 = 16 - 8 + 5 = 13$.'},
                {'num': 3, 'label': 'Wybór wartości skrajnych', 'text': 'Porównujemy liczby $\\{4, 5, 13\\}$. Najmniejsza to $4$, a największa to $13$.'}
            ],
            'result': 'y_{\\min} = 4, \\quad y_{\\max} = 13'
        },
        exam_trap='Typowy błąd: Zapominanie o sprawdzeniu, czy $p$ wpada do przedziału. Przyjęcie wierzchołka, który leży poza przedziałem, prowadzi do błędnego wyniku.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    # ----------------------------------------------------
    # Lekcja 12.4: Proste zadania optymalizacyjne (L12.4)
    # ----------------------------------------------------
    v4 = get_topic_12_visuals(3)
    l4_tasks = [
        make_sc_task(
            task_id='task-12-4-1',
            source='Matura maj 2023 • Wzorzec CKE (Zadanie optymalizacyjne)',
            question='Rolnik chce ogrodzić prostokątny wybieg siatką o łącznej długości $40$ metrów. Jednym z boków prostokąta jest odcinek o długości $x$.\nWzór funkcji $P(x)$ opisującej pole tego wybiegu w zależności od długości boku $x$ ma postać',
            options_data=[
                ('A', '$P(x) = -x^2 + 20x$ dla $x \\in (0, 20)$'),
                ('B', '$P(x) = -x^2 + 40x$ dla $x \\in (0, 40)$'),
                ('C', '$P(x) = 2x^2 - 40x$ dla $x \\in (0, 20)$'),
                ('D', '$P(x) = -2x^2 + 20x$ dla $x \\in (0, 10)$')
            ],
            correct_id='A',
            explanation='Obwód prostokąta o bokach $x$ oraz $y$ wynosi $2x + 2y = 40 \\implies x + y = 20 \\implies y = 20 - x$.\nPole prostokąta:\n$$P(x) = x \\cdot y = x(20 - x) = -x^2 + 20x.$$\nDziedzina geometryczna: długości boków muszą być dodatnie, czyli $x > 0$ oraz $20 - x > 0 \\implies x \\in (0, 20)$.',
            cke_trap='Obwód prostokąta to $2x+2y$, więc połowa obwodu to $x+y=20$, a nie 40!',
            plot={
                'type': 'PARABOLA',
                'xRange': [0, 22],
                'yRange': [0, 110],
                'gridStep': 20,
                'a': -1,
                'b': 20,
                'c': 0,
                'points': [
                    {'x': 10, 'y': 100, 'label': 'W(10, 100) (max pole)', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'},
                    {'x': 0, 'y': 0, 'label': '0', 'dot': 'hollow', 'color': '#94A3B8', 'attach': 'sw'},
                    {'x': 20, 'y': 0, 'label': '20', 'dot': 'hollow', 'color': '#94A3B8', 'attach': 'se'}
                ]
            }
        ),
        make_sc_task(
            task_id='task-12-4-2',
            source='Matura czerwiec 2023 • Wzorzec CKE',
            question='Funkcja przychodu ze sprzedaży biletów do teatru jest określona wzorem $R(x) = -5x^2 + 200x$, gdzie $x$ oznacza cenę jednego biletu w złotych.\nCena biletu, przy której przychód teatru jest największy, wynosi',
            options_data=[
                ('A', '$20$ zł'),
                ('B', '$40$ zł'),
                ('C', '$200$ zł'),
                ('D', '$2000$ zł')
            ],
            correct_id='A',
            explanation='Funkcja $R(x) = -5x^2 + 200x$ jest parabolą z ramionami skierowanymi w dół ($a = -5 < 0$).\nOsiąga ona maksimum w wierzchołku:\n$$x_{\\max} = p = -\\frac{b}{2a} = -\\frac{200}{2(-5)} = \\frac{200}{10} = 20\\ \\text{zł}.$$',
            cke_trap='Pytanie dotyczy CENY BILETU ($x = 20$), a nie kwoty przychodu ($R(20) = 2000$ zł)!',
            plot={
                'type': 'PARABOLA',
                'xRange': [0, 45],
                'yRange': [0, 2200],
                'gridStep': 500,
                'a': -5,
                'b': 200,
                'c': 0,
                'points': [
                    {'x': 20, 'y': 2000, 'label': 'W(20, 2000 zł) [max przychód]', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'},
                    {'x': 0, 'y': 0, 'label': '0', 'dot': 'hollow', 'color': '#94A3B8', 'attach': 'sw'},
                    {'x': 40, 'y': 0, 'label': '40 zł', 'dot': 'hollow', 'color': '#94A3B8', 'attach': 'se'}
                ],
                'lines': [
                    {'x': 20, 'color': '#38BDF8', 'label': 'optymalna cena x = 20 zł', 'dashed': True}
                ]
            }
        ),
        make_numeric_task(
            task_id='task-12-4-3',
            source='Trening CKE • Maksymalne pole wybiegu',
            question='Dany jest wybieg w kształcie prostokąta o polu $P(x) = -x^2 + 24x$, gdzie $x$ to długość boku w metrach.\nOblicz największe możliwe pole tego wybiegu w $m^2$. Wpisz samą liczbę.',
            correct_val=144,
            explanation='Współczynniki: $a = -1, b = 24$. Wierzchołek:\n$$p = -\\frac{24}{2(-1)} = 12\\ \\text{m}.$$\nMaksymalne pole to wartość w wierzchołku:\n$$P_{\\max} = P(12) = -(12)^2 + 24(12) = -144 + 288 = 144\\ \\text{m}^2.$$',
            cke_trap='Wymiar optymalny to $x=12$, a MAKSYMALNE POLE to $P(12) = 144$. Pytanie dotyczy pola!',
            plot={
                'type': 'PARABOLA',
                'xRange': [0, 26],
                'yRange': [0, 160],
                'gridStep': 40,
                'a': -1,
                'b': 24,
                'c': 0,
                'points': [
                    {'x': 12, 'y': 144, 'label': 'W(12, 144 m²)', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'}
                ],
                'lines': [
                    {'x': 12, 'color': '#38BDF8', 'label': 'x = 12 m', 'dashed': True}
                ]
            }
        ),
        make_tf_task(
            task_id='task-12-4-4',
            source='Ocena CKE • Warunek maksimum w optymalizacji',
            question='Oceń prawdziwość zdania: Funkcja kwadratowa $f(x) = ax^2 + bx + c$ może posłużyć do wyznaczenia wartości największej pewnej wielkości tylko wtedy, gdy współczynnik $a$ jest ujemny ($a < 0$).',
            correct_tf='PRAWDA',
            explanation='Dla $a > 0$ ramiona paraboli idą w górę ku nieskończoności, więc funkcja nie posiada wartości największej w całej dziedzinie. Wartość największą w wierzchołku funkcja kwadratowa osiąga wyłącznie wtedy, gdy ramiona skierowane są w dół, czyli gdy $a < 0$. Zdanie jest prawdziwe.',
            cke_trap='Maksimum lokalne/globalne funkcji kwadratowej istnieje tylko przy ramionach skierowanych w dół ($a < 0$).',
            plot={
                'type': 'PARABOLA',
                'xRange': [-2, 4],
                'yRange': [-2, 5],
                'gridStep': 1,
                'a': -1,
                'b': 2,
                'c': 3,
                'points': [
                    {'x': 1, 'y': 4, 'label': 'W(1, 4): Maksimum dla a < 0', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'}
                ]
            }
        ),
        make_open_task(
            task_id='task-12-4-5',
            source='CKE Formuła 2023 • Zadanie otwarte (3 pkt)',
            question='Ogrodnik dysponuje siatką o długości $60$ metrów i chce ogrodzić prostokątną działkę przylegającą jednym bokiem do ściany murowanego magazynu (ściana magazynu nie wymaga siatki).\nWyznacz wymiary działki, dla których jej pole powierzchni będzie największe, oraz oblicz to największe pole.',
            points=3,
            scoring_key=[
                ('1 pkt', 'Zapisanie zależności między bokami z uwzględnieniem ściany: $2x + y = 60$ oraz wyznaczenie wzoru pola $P(x) = x(60 - 2x) = -2x^2 + 60x$ wraz z dziedziną $x \\in (0, 30)$.'),
                ('2 pkt', 'Obliczenie wymiaru $x = p = -\\frac{60}{2(-2)} = 15$ m, w którym funkcja osiąga maksimum.'),
                ('3 pkt', 'Obliczenie drugiego wymiaru $y = 60 - 2(15) = 30$ m oraz maksymalnego pola $P_{\\max} = 15 \\cdot 30 = 450\\ \\text{m}^2$.')
            ],
            explanation='Krok 1: Oznaczmy przez $x$ długość dwóch boków prostopadłych do ściany, a przez $y$ długość boku równoległego do ściany.\nSiatka ma długość 60 m, zatem: $2x + y = 60 \\implies y = 60 - 2x$.\nDziedzina: $x > 0$ oraz $60 - 2x > 0 \\implies x \\in (0, 30)$.\nKrok 2: Zapisujemy pole powierzchni jako funkcję zmiennej $x$:\n$$P(x) = x \\cdot y = x(60 - 2x) = -2x^2 + 60x.$$\nKrok 3: Ponieważ $a = -2 < 0$, funkcja osiąga maksimum w wierzchołku:\n$$x_{\\max} = p = -\\frac{b}{2a} = -\\frac{60}{2(-2)} = \\frac{60}{4} = 15\\ \\text{m}.$$\nLiczba $15 \\in (0, 30)$, więc spełnia warunki zadania.\nKrok 4: Wyznaczamy drugi wymiar i maksymalne pole:\n$$y = 60 - 2(15) = 60 - 30 = 30\\ \\text{m}.$$\n$$P_{\\max} = 15 \\cdot 30 = 450\\ \\text{m}^2.$$\nOdpowiedź: Wymiary działki to $15$ m na $30$ m, a maksymalne pole wynosi $450\\ \\text{m}^2$.',
            cke_trap='Uwaga na ścianę budynku: ogrodzenie składa się z trzech boków ($2x + y = 60$), a nie czterech!'
        )
    ]

    l4 = make_lesson(
        lesson_id='lesson-12-4',
        topic_id=topic_id,
        title='Proste zadania optymalizacyjne',
        concept_essence={
            'lead': 'Optymalizacja kwadratowa polega na znalezieniu wierzchołka paraboli p = -b / (2a) dla a < 0.',
            'pillars': [
                {'title': 'Równanie pomocnicze', 'description': 'Wyraź jedną zmienną za pomocą drugiej (np. z obwodu wyznacz y = L - 2x).'},
                {'title': 'Funkcja celu z dziedziną', 'description': 'Zbuduj funkcję P(x) = x · y = ax^2 + bx i wyznacz dziedzinę geometryczną (boki > 0).'},
                {'title': 'Wierzchołek paraboli', 'description': 'Ponieważ a < 0, maksimum występuje w punkcie x = p = -b / (2a).'}
            ]
        },
        matura_context='Hit nowej matury CKE: Zadania na optymalizację prostokąta z ogrodzeniem lub przychodu występują w niemal każdym arkuszu za 2–4 pkt.',
        core_formulas=[
            {
                'title': 'Maksimum funkcji kwadratowej w optymalizacji',
                'latex': 'P(x) = ax^2 + bx + c \\quad (a < 0) \\implies x_{\\max} = -\\frac{b}{2a}',
                'description': 'Punkt wierzchołka p wyznacza optymalny wymiar dający największą wartość.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            }
        ],
        worked_example={
            'problem': 'Suma dwóch liczb wynosi 20. Jakie to muszą być liczby, aby ich iloczyn był największy?',
            'steps': [
                {'num': 1, 'label': 'Zapisanie relacji', 'text': 'Niech liczby to $x$ oraz $y$. Wtedy $x + y = 20 \\implies y = 20 - x$.'},
                {'num': 2, 'label': 'Funkcja iloczynu', 'text': '$I(x) = x \\cdot y = x(20 - x) = -x^2 + 20x$. Mamy $a = -1 < 0$.'},
                {'num': 3, 'label': 'Wyznaczenie maksimum w wierzchołku', 'text': '$x = -\\frac{20}{2(-1)} = 10$. Wtedy $y = 20 - 10 = 10$. Maksymalny iloczyn to $10 \\cdot 10 = 100$.'}
            ],
            'result': 'x = 10, \\quad y = 10, \\quad I_{\\max} = 100'
        },
        exam_trap='Typowy błąd: Zapominanie o wyznaczeniu drugiego wymiaru $y$ lub mylenie optymalnego argumentu $x$ z maksymalną wartością funkcji $P(x)$!',
        visuals=v4,
        tasks=l4_tasks
    )
    lessons.append(l4)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'short_title': topic_title,
        'description': 'Kompletny dział funkcji kwadratowej: postacie, własności, wierzchołek, wartość w przedziale oraz zadania optymalizacyjne.',
        'icon': 'Activity',
        'color': '#10B981',
        'matura_points_range': '5–10 pkt',
        'importance': 'Pewniak CKE (Tier S+)',
        'lessons': lessons
    }

if __name__ == '__main__':
    t = build_topic_12()
    print(f"Pomyślnie zbudowano {t['title']} ({len(t['lessons'])} lekcje, {sum(len(l['tasks']) for l in t['lessons'])} zadań).")
