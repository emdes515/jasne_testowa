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
            explanation='Postać kanoniczna to $f(x) = a(x - p)^2 + q$, gdzie współrzędne wierzchołka to $W(p, q)$.\nPorównując ze wzorem $f(x) = -2(x - 3)^2 + 5$, odczytujemy:\n$$p = 3, \\quad q = 5 \\longrightarrow W = (3, 5).$$',
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
            source='Trening JASNE • Wzorzec CKE',
            question='Osią symetrii wykresu funkcji kwadratowej $f(x) = x^2 - 6x + 8$ jest prosta o równaniu',
            options_data=[
                ('A', '$x = -3$'),
                ('B', '$y = 3$'),
                ('C', '$x = 3$'),
                ('D', '$x = 6$')
            ],
            correct_id='C',
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
            source='Matura maj 2024 • Zad. 14.2',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFunkcja kwadratowa $f$ jest określona wzorem',
            options_data=[
                ('A', '$f(x) = -(x + 1)^2 - 9$'),
                ('B', '$f(x) = -(x - 1)^2 + 9$'),
                ('C', '$f(x) = -(x - 1)^2 - 9$'),
                ('D', '$f(x) = -(x + 1)^2 + 9$')
            ],
            correct_id='B',
            explanation='Postać kanoniczna funkcji kwadratowej ma wzór $f(x) = a(x - p)^2 + q$.\nZ wykresu odczytujemy współrzędne wierzchołka paraboli: $W = (1, 9)$, a ramiona są skierowane w dół, czyli $a = -1$.\nPodstawiając do wzoru, otrzymujemy:\n$$f(x) = -(x - 1)^2 + 9.$$',
            cke_trap='Uważaj na znaki w postaci kanonicznej: $f(x) = a(x - p)^2 + q$, dla $p = 1$ w nawiasie jest $(x - 1)$, a nie $(x + 1)$!',
            plot={
                'type': 'PARABOLA',
                'xRange': [-3, 5],
                'yRange': [-5, 12],
                'gridStep': 2,
                'a': -1,
                'b': 2,
                'c': 8,
                'points': [
                    {'x': 1, 'y': 9, 'label': 'W(1, 9)', 'dot': 'filled', 'color': '#10B981', 'attach': 'n'},
                    {'x': 0, 'y': 8, 'label': '(0, 8)', 'dot': 'filled', 'color': '#FFB800', 'attach': 'w'}
                ]
            }
        ),
        make_numeric_task(
            task_id='task-12-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Miejscami zerowymi funkcji kwadratowej są liczby $x_1 = -5$ oraz $x_2 = 11$.\nOblicz pierwszą współrzędną wierzchołka paraboli ($p$). Wpisz samą liczbę.',
            correct_val='3',
            explanation='Wierzchołek paraboli leży dokładnie na osi symetrii pośrodku między miejscami zerowymi:\n$$p = \\frac{x_1 + x_2}{2} = \\frac{-5 + 11}{2} = \\frac{6}{2} = 3.$$',
            cke_trap='Odcięta wierzchołka $p$ jest zawsze średnią arytmetyczną miejsc zerowych, bez konieczności znajomości współczynników $a$ i $b$!'
        ),
        make_open_task(
            task_id='task-12-1-5',
            source='Informator CKE • Zad. 21',
            question='Wyznacz wzór funkcji kwadratowej $f$ w postaci kanonicznej oraz ogólnej, wiedząc, że wierzchołkiem jej wykresu jest punkt $W(3, -2)$, a do wykresu należy punkt $P(1, 6)$. Zapisz obliczenia.',
            points=2,
            scoring_key='1 pkt – zapisanie postaci kanonicznej z wierzchołkiem $f(x) = a(x - 3)^2 - 2$ i wyznaczenie współczynnika $a = 2$.\\n2 pkt – poprawne zapisanie wzoru w postaci ogólnej: $f(x) = 2x^2 - 12x + 16$.',
            explanation='Krok 1: Korzystamy z postaci kanonicznej $f(x) = a(x - p)^2 + q$. Podstawiamy współrzędne wierzchołka $W(3, -2)$:\n$$f(x) = a(x - 3)^2 - 2$$\nKrok 2: Wyznaczamy współczynnik $a$, podstawiając punkt $P(1, 6)$:\n$$6 = a(1 - 3)^2 - 2 \\longrightarrow 6 = a(-2)^2 - 2 \\longrightarrow 6 = 4a - 2 \\longrightarrow 4a = 8 \\longrightarrow a = 2$$\nPostać kanoniczna to $f(x) = 2(x - 3)^2 - 2$.\nKrok 3: Przekształcamy do postaci ogólnej:\n$$f(x) = 2(x^2 - 6x + 9) - 2 = 2x^2 - 12x + 18 - 2 = 2x^2 - 12x + 16.$$',
            cke_trap='Pamiętaj o podniesieniu nawiasu do kwadratu ze wzoru skróconego mnożenia: $(x - 3)^2 = x^2 - 6x + 9$, a nie $x^2 + 9$!'
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
            source='Trening JASNE • Wzorzec CKE',
            question='Funkcja kwadratowa $f$ jest określona wzorem $f(x) = -(x - 1)^2 + 4$.\nFunkcja $f$ jest rosnąca w przedziale',
            options_data=[
                ('A', '$\\langle 1, +\\infty)$'),
                ('B', '$(-\\infty, 1\\rangle$'),
                ('C', '$(-\\infty, 4\\rangle$'),
                ('D', '$\\langle 4, +\\infty)$')
            ],
            correct_id='B',
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
            source='Matura czerwiec 2023 • Zad. 14',
            question='Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ax^2 + bx + 1$, gdzie $a$ oraz $b$ są pewnymi liczbami rzeczywistymi, takimi, że $a < 0$ i $b > 0$. Na jednym z rysunków A–D przedstawiono fragment wykresu tej funkcji w kartezjańskim układzie współrzędnych $(x, y)$.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFragment wykresu funkcji $f$ przedstawiono na rysunku',
            options_data=[
                ('A', 'Ramiona w górę ($a > 0$), wierzchołek w II ćwiartce ($x_w < 0, y_w > 0$)'),
                ('B', 'Ramiona w dół ($a < 0$), wierzchołek w II ćwiartce ($x_w < 0, y_w > 0$)'),
                ('C', 'Ramiona w górę ($a > 0$), wierzchołek w I ćwiartce ($x_w > 0, y_w > 0$)'),
                ('D', 'Ramiona w dół ($a < 0$), wierzchołek w I ćwiartce ($x_w > 0$), przecięcie z OY w punkcie $(0, 1)$')
            ],
            correct_id='D',
            explanation='1. Współczynnik $a < 0$, więc ramiona paraboli są skierowane w dół (wykluczamy A i C).\n2. Współrzędna $x_w = -\\frac{b}{2a}$. Ponieważ $b > 0$ i $a < 0$, to $-b < 0$ i $2a < 0$, czyli $x_w = \\frac{-}{-} > 0$. Wierzchołek leży w I ćwiartce ($x_w > 0, y_w > 0$).\n3. Wyraz wolny $c = 1 > 0$, zatem parabola przecina oś $OY$ powyżej osi $OX$ w punkcie $(0, 1)$.\nWarunki te spełnia wyłącznie rysunek D.',
            cke_trap='Znak odciętej wierzchołka $p = -\\frac{b}{2a}$: gdy $a<0$ i $b>0$, to dzielimy liczbę ujemną przez ujemną, dając wynik dodatni $p > 0$!'
        ),
        make_numeric_task(
            task_id='task-12-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Funkcja kwadratowa $f$ osiąga najmniejszą wartość równą $-9$ dla argumentu $x = 2$, a jej wykres przechodzi przez punkt $P(0, -1)$.\nOblicz wartość współczynnika $a$ tej funkcji. Wpisz samą liczbę.',
            correct_val='2',
            explanation='Z treści zadania wierzchołkiem jest $W(2, -9)$, więc postać kanoniczna to $f(x) = a(x - 2)^2 - 9$.\nPodstawiamy współrzędne punktu $P(0, -1)$:\n$$-1 = a(0 - 2)^2 - 9 \\longrightarrow -1 = 4a - 9 \\longrightarrow 4a = 8 \\longrightarrow a = 2.$$',
            cke_trap='Sformułowanie „osiąga wartość najmniejszą równą $q$ dla argumentu $x = p$” to definicja wierzchołka $W(p, q) = (2, -9)$!'
        ),
        make_open_task(
            task_id='task-12-2-5',
            source='Matura maj 2024 • Zad. 18',
            question='Funkcja kwadratowa $f$ jest określona wzorem $f(x) = -(x - 1)^2 + 4$. Wyznacz zbiór wartości tej funkcji oraz przedział, w którym funkcja jest rosnąca. Zapisz uzasadnienie.',
            points=2,
            scoring_key='1 pkt – odczytanie współrzędnych wierzchołka $W(1, 4)$ i współczynnika $a = -1 < 0$ oraz wyznaczenie zbioru wartości: $ZW = (-\\infty, 4\\rangle$.\\n2 pkt – poprawne wyznaczenie przedziału, w którym funkcja jest rosnąca: $(-\\infty, 1\\rangle$.',
            explanation='Krok 1: Wzór $f(x) = -(x - 1)^2 + 4$ podany jest w postaci kanonicznej $f(x) = a(x - p)^2 + q$, skąd $p = 1, q = 4$ oraz $a = -1$.\nKrok 2: Ponieważ $a = -1 < 0$, ramiona paraboli skierowane są w dół, a wierzchołek $W(1, 4)$ jest najwyższym punktem wykresu. Zbiór wartości wynosi $ZW = (-\\infty, 4\\rangle$.\nKrok 3: Parabola rośnie od $-\\infty$ do odciętej wierzchołka $p = 1$, zatem funkcja jest rosnąca w przedziale $(-\\infty, 1\\rangle$.',
            cke_trap='Współrzędna $p = 1$, a nie $-1$. Przedział monotoniczności określamy dla argumentów $x$ (czyli według liczby $p = 1$), a nie wartości $y$!'
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
                'latex': 'a > 0 \\longrightarrow ZW = \\langle q, +\\infty), \\quad a < 0 \\longrightarrow ZW = (-\\infty, q\\rangle',
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
            source='Trening JASNE • Wzorzec CKE',
            question='Wartość najmniejsza funkcji kwadratowej $f(x) = x^2 - 4x + 1$ w przedziale domkniętym $\\langle 0, 5 \\rangle$ jest równa',
            options_data=[
                ('A', '$1$'),
                ('B', '$6$'),
                ('C', '$-3$'),
                ('D', '$-4$')
            ],
            correct_id='C',
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
            source='Trening JASNE • Wzorzec CKE',
            question='Funkcja kwadratowa $f(x) = (x - 1)^2 + 3$ jest rozpatrywana w przedziale $\\langle 3, 6 \\rangle$.\nWskaż wartość najmniejszą tej funkcji w tym przedziale.',
            options_data=[
                ('A', '$3$'),
                ('B', '$7$'),
                ('C', '$28$'),
                ('D', '$4$')
            ],
            correct_id='B',
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
        make_sc_task(
            task_id='task-12-3-3',
            source='Matura maj 2023 • Zad. 14',
            question='Jednym z miejsc zerowych funkcji kwadratowej $f$ jest liczba $(-5)$. Pierwsza współrzędna wierzchołka paraboli, będącej wykresem funkcji $f$, jest równa $3$.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDrugim miejscem zerowym funkcji $f$ jest liczba',
            options_data=[
                ('A', '$11$'),
                ('B', '$1$'),
                ('C', '$-1$'),
                ('D', '$-13$')
            ],
            correct_id='A',
            explanation='Wierzchołek paraboli leży na osi symetrii dokładnie pośrodku między miejscami zerowymi:\n$$p = \\frac{x_1 + x_2}{2}$$\nPodstawiamy dane $x_1 = -5$ oraz $p = 3$:\n$$3 = \\frac{-5 + x_2}{2} \\longrightarrow 6 = -5 + x_2 \\longrightarrow x_2 = 11.$$',
            cke_trap='Oś symetrii paraboli leży w połowie odległości między miejscami zerowymi: $x_w = \\frac{x_1+x_2}{2}$.'
        ),
        make_numeric_task(
            task_id='task-12-3-4',
            source='Trening CKE • Suma wartości skrajnych',
            question='Funkcja kwadratowa $f(x) = -x^2 + 6x - 5$ osiąga w przedziale $\\langle 1, 4 \\rangle$ wartość najmniejszą $m$ oraz największą $M$.\nOblicz sumę $m + M$. Wpisz samą liczbę.',
            correct_val='4',
            explanation='1. $p = -\\frac{6}{2(-1)} = 3$. Ponieważ $3 \\in \\langle 1, 4 \\rangle$, wierzchołek wpada do przedziału.\n2. $a = -1 < 0 \\longrightarrow M = f(3) = -9 + 18 - 5 = 4$.\n3. Krańce przedziału:\n$$f(1) = -1 + 6 - 5 = 0$$\n$$f(4) = -16 + 24 - 5 = 3$$\nZatem minimum to $m = 0$, a maksimum to $M = 4$. Suma: $m + M = 0 + 4 = 4$.',
            cke_trap='Wartość najmniejsza $m$ na krańcach to $f(1) = 0$, a największa to wierzchołek $M = 4$. Suma wynosi 4.'
        ),
        make_open_task(
            task_id='task-12-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question='Wyznacz wartość najmniejszą i wartość największą funkcji kwadratowej $f(x) = 2x^2 - 8x + 3$ w przedziale domkniętym $\\langle -1, 3 \\rangle$. Zapisz pełne obliczenia.',
            points=2,
            scoring_key='1 pkt – obliczenie $p = 2$, sprawdzenie warunku $2 \\in \\langle -1, 3 \\rangle$ i obliczenie wartości w wierzchołku $f(2) = -5$.\\n2 pkt – obliczenie wartości na krańcach $f(-1) = 13$, $f(3) = -3$ i sformułowanie poprawnej odpowiedzi: wartość najmniejsza to $-5$, a największa to $13$.',
            explanation='Krok 1: Wyznaczamy odciętą wierzchołka paraboli:\n$$p = -\\frac{b}{2a} = -\\frac{-8}{2 \\cdot 2} = \\frac{8}{4} = 2.$$\nSprawdzamy obecność w przedziale: $2 \\in \\langle -1, 3 \\rangle$.\nKrok 2: Ponieważ $a = 2 > 0$, w wierzchołku funkcja osiąga wartość najmniejszą:\n$$f(2) = 2(2)^2 - 8(2) + 3 = 8 - 16 + 3 = -5.$$\nKrok 3: Obliczamy wartości na krańcach przedziału:\n$$f(-1) = 2(-1)^2 - 8(-1) + 3 = 2(1) + 8 + 3 = 13$$\n$$f(3) = 2(3)^2 - 8(3) + 3 = 18 - 24 + 3 = -3.$$\nKrok 4: Porównujemy otrzymane wartości: $\\{-5, -3, 13\\}$.\nWartość najmniejsza to $-5$ (dla $x = 2$).\nWartość największa to $13$ (dla $x = -1$).',
            cke_trap='Porównanie tylko krańców $f(-1)$ i $f(3)$ z pominięciem wierzchołka $f(2)$ skutkuje utratą punktu. Zawsze sprawdź wierzchołek!'
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
            source='Trening JASNE • Wzorzec CKE',
            question='Rolnik chce ogrodzić prostokątny wybieg siatką o łącznej długości $40$ metrów. Jednym z boków prostokąta jest odcinek o długości $x$.\nWzór funkcji $P(x)$ opisującej pole tego wybiegu w zależności od długości boku $x$ ma postać',
            options_data=[
                ('A', '$P(x) = -x^2 + 40x$ dla $x \\in (0, 40)$'),
                ('B', '$P(x) = 2x^2 - 40x$ dla $x \\in (0, 20)$'),
                ('C', '$P(x) = -2x^2 + 20x$ dla $x \\in (0, 10)$'),
                ('D', '$P(x) = -x^2 + 20x$ dla $x \\in (0, 20)$')
            ],
            correct_id='D',
            explanation='Obwód prostokąta o bokach $x$ oraz $y$ wynosi $2x + 2y = 40 \\longrightarrow x + y = 20 \\longrightarrow y = 20 - x$.\nPole prostokąta:\n$$P(x) = x \\cdot y = x(20 - x) = -x^2 + 20x.$$\nDziedzina geometryczna: długości boków muszą być dodatnie, czyli $x > 0$ oraz $20 - x > 0 \\longrightarrow x \\in (0, 20)$.',
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
            source='Trening JASNE • Wzorzec CKE',
            question='Funkcja przychodu ze sprzedaży biletów do teatru jest określona wzorem $R(x) = -5x^2 + 200x$, gdzie $x$ oznacza cenę jednego biletu w złotych.\nCena biletu, przy której przychód teatru jest największy, wynosi',
            options_data=[
                ('A', '$40$ zł'),
                ('B', '$200$ zł'),
                ('C', '$20$ zł'),
                ('D', '$2000$ zł')
            ],
            correct_id='C',
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
        make_sc_task(
            task_id='task-12-4-3',
            source='Informator CKE • Zad. 46',
            question='Pole prostokątnej działki opisuje funkcja $P(x) = -2x^2 + 40x$, gdzie $x$ oznacza długość jednego z boków działki w metrach.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nNajwiększe pole tej działki jest równe',
            options_data=[
                ('A', '$100\\text{ m}^2$'),
                ('B', '$200\\text{ m}^2$'),
                ('C', '$400\\text{ m}^2$'),
                ('D', '$10\\text{ m}^2$')
            ],
            correct_id='B',
            explanation='Funkcja $P(x) = -2x^2 + 40x$ osiąga wartość największą w wierzchołku paraboli:\n$$x_w = -\\frac{b}{2a} = -\\frac{40}{2(-2)} = 10\\text{ m}$$\nMaksymalne pole wynosi:\n$$P(10) = -2(10)^2 + 40(10) = -200 + 400 = 200\\text{ m}^2.$$',
            cke_trap='Długość boku dająca maksimum to $x = 10$, a maksymalne pole to $P(10) = 200\\text{ m}^2$. Nie myl boku z polem!'
        ),
        make_numeric_task(
            task_id='task-12-4-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Dany jest wybieg w kształcie prostokąta o polu $P(x) = -x^2 + 24x$, gdzie $x$ to długość boku w metrach.\nOblicz największe możliwe pole tego wybiegu w metrach kwadratowych. Wpisz samą liczbę.',
            correct_val='144',
            explanation='Współczynniki: $a = -1, b = 24$. Wierzchołek:\n$$p = -\\frac{24}{2(-1)} = 12\\ \\text{m}.$$\nMaksymalne pole to wartość w wierzchołku:\n$$P_{\\max} = P(12) = -(12)^2 + 24(12) = -144 + 288 = 144\\ \\text{m}^2.$$',
            cke_trap='Wymiar optymalny to $x=12$, a maksymalne pole to $P(12) = 144$. Pytanie dotyczy pola!',
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
        make_open_task(
            task_id='task-12-4-5',
            source='Matura sierpień 2023 • Zad. 33',
            question='Zakład stolarski produkuje krzesła, które sprzedaje po 196 złotych za sztukę. Właściciel, na podstawie analizy rzeczywistych wpływów i wydatków, stwierdził, że:\n• przychód $P$ (w złotych) ze sprzedaży $x$ krzeseł można opisać funkcją $P(x) = 196x$\n• koszt $K$ (w złotych) produkcji $x$ krzeseł dziennie można opisać funkcją $K(x) = 4x^2 + 4x + 240$\nDziennie w zakładzie można wyprodukować co najwyżej 30 krzeseł.\nOblicz, ile krzeseł powinien dziennie sprzedawać zakład, aby zysk ze sprzedaży krzeseł wyprodukowanych przez ten zakład w ciągu jednego dnia był możliwie największy. Oblicz ten największy zysk. Zapisz obliczenia.\nWskazówka: przyjmij, że zysk jest różnicą przychodu i kosztów.',
            points=4,
            scoring_key='1 pkt – zapisanie wzoru funkcji zysku dziennego $Z(x) = P(x) - K(x) = -4x^2 + 192x - 240$.\\n2 pkt – zapisanie dziedziny funkcji zysku: $x \\in \\{1, 2, \\dots, 30\\}$ (lub $x \\in \\langle 0, 30 \\rangle$).\\n3 pkt – wyznaczenie liczby krzeseł, dla której zysk jest największy: obliczenie odciętej wierzchołka $p = 24$.\\n4 pkt – obliczenie największego dziennego zysku: $Z(24) = 2064$ zł.',
            explanation='Krok 1: Wyznaczamy funkcję zysku dziennego $Z(x)$ jako różnicę przychodu i kosztów:\n$$Z(x) = P(x) - K(x) = 196x - (4x^2 + 4x + 240) = -4x^2 + 192x - 240.$$\nKrok 2: Określamy dziedzinę funkcji $Z$:\nZakład może wyprodukować dziennie co najwyżej 30 krzeseł, zatem $x \\in \\{1, 2, \\dots, 30\\}$ (lub $x \\in \\langle 0, 30 \\rangle$).\nKrok 3: Wyznaczamy liczbę krzeseł dającą największy zysk.\nFunkcja $Z(x)$ jest funkcją kwadratową o współczynniku $a = -4 < 0$ (ramiona paraboli w dół), więc osiąga wartość największą w wierzchołku paraboli:\n$$x = p = -\\frac{b}{2a} = -\\frac{192}{2 \\cdot (-4)} = \\frac{192}{8} = 24.$$\nLiczba 24 należy do dziedziny ($24 \\le 30$).\nKrok 4: Obliczamy największy zysk dla $x = 24$:\n$$Z(24) = -4(24)^2 + 192(24) - 240 = -4 \\cdot 576 + 4608 - 240 = -2304 + 4608 - 240 = 2064\\ \\text{zł}.$$\nOdpowiedź: Zakład powinien sprzedawać 24 krzesła dziennie, a największy zysk wynosi 2064 zł.',
            cke_trap='Pamiętaj o nawiasie przy odejmowaniu kosztów: $Z(x) = P(x) - (4x^2 + 4x + 240)$. Opuszczenie nawiasu zmieniłoby znaki wyrazów wolnych!'
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
                'latex': 'P(x) = ax^2 + bx + c \\quad (a < 0) \\longrightarrow x_{\\max} = -\\frac{b}{2a}',
                'description': 'Punkt wierzchołka p wyznacza optymalny wymiar dający największą wartość.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7'
            }
        ],
        worked_example={
            'problem': 'Suma dwóch liczb wynosi 20. Jakie to muszą być liczby, aby ich iloczyn był największy?',
            'steps': [
                {'num': 1, 'label': 'Zapisanie relacji', 'text': 'Niech liczby to $x$ oraz $y$. Wtedy $x + y = 20 \\longrightarrow y = 20 - x$.'},
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
