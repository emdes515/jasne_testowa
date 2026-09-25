"""
topic_11_builder.py - Dział 11: Ciągi liczbowe (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Mafs / SVG
"""
import sys
import os
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_11 import get_topic_11_visuals
try:
    from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_open_proof, make_lesson
except ImportError:
    from helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_open_proof, make_lesson


def build_topic_11():
    topic_id = 'dzial-11'
    topic_title = 'Ciągi liczbowe'
    topic_number = 11
    lessons = []

    # ----------------------------------------------------
    # Lekcja 11.1: Własności i wzór ogólny ciągu (L11.1)
    # ----------------------------------------------------
    v1 = get_topic_11_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-11-1-1',
            source='Rozgrzewka • Wartość wyrazu ze wzoru ogólnego',
            question='Ciąg $(a_n)$ jest określony wzorem $a_n = \\frac{3n - 1}{n + 2}$ dla każdej liczby naturalnej $n \\ge 1$.\nCzwarty wyraz tego ciągu, czyli $a_4$, jest równy',
            options_data=[
                ('A', '$\\frac{11}{6}$'),
                ('B', '$\\frac{11}{4}$'),
                ('C', '$\\frac{5}{3}$'),
                ('D', '$\\frac{7}{6}$')
            ],
            correct_id='A',
            explanation='Podstawiamy $n = 4$ bezpośrednio do wzoru ogólnego:\n$$a_4 = \\frac{3 \\cdot 4 - 1}{4 + 2} = \\frac{12 - 1}{6} = \\frac{11}{6}.$$',
            cke_trap='Pamiętaj, że numer wyrazu $n$ to liczba naturalna dodatnia. Podstawiamy $n = 4$, a nie szukamy, kiedy $a_n = 4$.',
            plot=None
        ),
        make_sc_task(
            task_id='task-11-1-2',
            source='Matura maj 2024 • Wzorzec CKE',
            question='Ciąg $(a_n)$ jest określony wzorem $a_n = n^2 - 10n + 9$ dla każdej liczby naturalnej $n \\ge 1$.\nLiczba ujemnych wyrazów tego ciągu jest równa',
            options_data=[
                ('A', '$7$'),
                ('B', '$8$'),
                ('C', '$9$'),
                ('D', '$10$')
            ],
            correct_id='A',
            explanation='Szukamy wyrazów ujemnych, czyli rozwiązujemy nierówność $a_n < 0$ w dziedzinie $n \\in \\mathbb{N}^+$:\n$$n^2 - 10n + 9 < 0$$\nObliczamy deltę i pierwiastki trójmianu:\n$$\\Delta = (-10)^2 - 4 \\cdot 1 \\cdot 9 = 100 - 36 = 64, \\quad \\sqrt{\\Delta} = 8$$\n$$n_1 = \\frac{10 - 8}{2} = 1, \\quad n_2 = \\frac{10 + 8}{2} = 9$$\nParabola ma ramiona skierowane w górę ($a = 1 > 0$), więc wartości ujemne leżą ściśle między pierwiastkami: $n \\in (1, 9)$.\nWybieramy numery naturalne ze zbioru $\\{2, 3, 4, 5, 6, 7, 8\\}$. Jest ich dokładnie $7$.',
            cke_trap='Krańce $n=1$ oraz $n=9$ dają $a_1 = 0$ oraz $a_9 = 0$. Liczba zero NIE jest ujemna, dlatego przedział jest otwarty $(1, 9)$ i nie wliczamy 1 ani 9!',
            plot=None
        ),
        make_sc_task(
            task_id='task-11-1-3',
            source='Matura maj 2023 • Zad. 15',
            question='Ciąg $(a_n)$ jest określony wzorem $a_n = 2^n \\cdot (n + 1)$ dla każdej liczby naturalnej $n \\ge 1$.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nWyraz $a_4$ jest równy',
            options_data=[
                ('A', '$64$'),
                ('B', '$40$'),
                ('C', '$48$'),
                ('D', '$80$')
            ],
            correct_id='D',
            explanation='Podstawiamy $n = 4$ do wzoru ogólnego ciągu:\n$$a_4 = 2^4 \\cdot (4 + 1) = 16 \\cdot 5 = 80.$$\nPoprawna odpowiedź to D.',
            cke_trap='Pamiętaj o kolejności działań: najpierw potęgowanie $2^4 = 16$, potem dodawanie w nawiasie $4 + 1 = 5$, a na końcu mnożenie $16 \\cdot 5 = 80$. Nie mnóż podstawy potęgi przez nawias przed spotęgowaniem!',
            plot=None
        ),
        make_numeric_task(
            task_id='task-11-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Ciąg $(a_n)$ określony jest wzorem $a_n = n^2 - 6n + 14$ dla każdej liczby naturalnej $n \\ge 1$.\nOblicz najmniejszą wartość wyrazu tego ciągu ($a_{\\min}$). Wpisz samą liczbę będącą wartością tego wyrazu.',
            correct_val='5',
            explanation='Traktujemy wzór jako trójmian kwadratowy zmiennej $n$: $f(n) = n^2 - 6n + 14$.\nWspółczynnik przy $n^2$ wynosi $a = 1 > 0$, więc parabola osiąga minimum w wierzchołku:\n$$n_w = -\\frac{b}{2a} = -\\frac{-6}{2 \\cdot 1} = 3$$\nPonieważ $n_w = 3 \\in \\mathbb{N}^+$, najmniejszy wyraz ciągu to dokładnie $a_3$:\n$$a_3 = 3^2 - 6 \\cdot 3 + 14 = 9 - 18 + 14 = 5.$$',
            cke_trap='Wartość wierzchołka $n=3$ to numer wyrazu, a pytanie dotyczy wartości wyrazu ($a_3 = 5$).',
            plot=None
        ),
        make_open_task(
            task_id='task-11-1-5',
            source='Trening JASNE • Wzorzec CKE',
            question='Ciąg $(a_n)$ jest określony wzorem $a_n = \\frac{2n - 15}{3}$ dla każdej liczby naturalnej $n \\ge 1$.\nOblicz, ile wyrazów tego ciągu jest mniejszych od $0$, oraz podaj najmniejszy dodatni wyraz tego ciągu. Zapisz obliczenia.',
            points=2,
            scoring_key='1 pkt – rozwiązanie nierówności $a_n < 0 \\longrightarrow 2n - 15 < 0 \\longrightarrow n < 7{,}5$ i wyznaczenie liczby wyrazów ujemnych: 7 wyrazów ($n \\in \\{1, 2, 3, 4, 5, 6, 7\\}$).\\n2 pkt – wyznaczenie najmniejszego dodatniego wyrazu: jest to ósmy wyraz ($n = 8$), $a_8 = \\frac{2 \\cdot 8 - 15}{3} = \\frac{1}{3}$.',
            explanation='Krok 1: Rozwiązujemy nierówność $a_n < 0$ w dziedzinie $n \\in \\mathbb{N}^+$:\n$$\\frac{2n - 15}{3} < 0 \\longrightarrow 2n - 15 < 0 \\longrightarrow 2n < 15 \\longrightarrow n < 7{,}5$$\nZatem wyrazami ujemnymi są $a_1, a_2, a_3, a_4, a_5, a_6, a_7$. Jest ich dokładnie 7.\nKrok 2: Pierwszym wyrazem dodatnim jest wyraz dla $n = 8$:\n$$a_8 = \\frac{2 \\cdot 8 - 15}{3} = \\frac{16 - 15}{3} = \\frac{1}{3} > 0$$\nJest to najmniejszy dodatni wyraz tego ciągu.',
            cke_trap='Pamiętaj, że $n$ to numer wyrazu ($n \\in \\mathbb{N}^+$). Wartości wyrazów to $a_n$, a numery to $n$.'
        )
    ]

    l1 = make_lesson(
        lesson_id='lesson-11-1',
        topic_id=topic_id,
        title='Własności i wzór ogólny ciągu',
        concept_essence={
            'lead': 'Ciąg to funkcja określona wyłącznie na liczbach naturalnych dodatnich: n ∈ {1, 2, 3, ...}.',
            'pillars': [
                {'title': 'Dyskretna dziedzina', 'description': 'Zmienna n oznacza wyłącznie numer wyrazu: pierwszy (n=1), drugi (n=2), setny (n=100). Nigdy n=0 ani n ujemne!'},
                {'title': 'Wyrazy dodatnie/ujemne', 'description': 'Aby sprawdzić znak wyrazów, rozwiązujemy nierówność an > 0 lub an < 0 i wybieramy rozwiązania w N+.'},
                {'title': 'Badanie monotoniczności', 'description': 'Obliczamy różnicę sąsiednich wyrazów an+1 - an. Dodatnia oznacza ciąg rosnący, ujemna – malejący.'}
            ]
        },
        matura_context='Na każdej maturze CKE występuje zadanie na obliczenie wyrazu ze wzoru ogólnego lub zliczenie wyrazów ujemnych/dodatnich trójmianu kwadratowego.',
        core_formulas=[
            {
                'title': 'Definicja ciągu liczbowego',
                'latex': 'a_n = f(n), \\quad n \\in \\mathbb{N}^+ = \\{1, 2, 3, \\dots\\}',
                'description': 'Numer wyrazu n jest zawsze dodatnią liczbą całkowitą.',
                'in_cke_sheet': True,
                'cke_page': 'str. 9'
            },
            {
                'title': 'Badanie monotoniczności ciągu',
                'latex': 'a_{n+1} - a_n > 0 \\longrightarrow \\text{rosnący}, \\quad a_{n+1} - a_n < 0 \\longrightarrow \\text{malejący}',
                'description': 'Znak różnicy kolejnego i poprzedniego wyrazu decyduje o kierunku zmian.',
                'in_cke_sheet': True,
                'cke_page': 'str. 9'
            }
        ],
        worked_example={
            'problem': 'Dany jest ciąg o wyrazie ogólnym $a_n = \\frac{2n - 15}{3}$. Ile wyrazów tego ciągu jest mniejszych od 0?',
            'steps': [
                {'num': 1, 'label': 'Zapisanie nierówności', 'text': 'Szukamy wyrazów mniejszych od 0, czyli rozwiązujemy nierówność: $\\frac{2n - 15}{3} < 0$.'},
                {'num': 2, 'label': 'Rozwiązanie algebraiczne', 'text': 'Mnożymy obustronnie przez 3: $2n - 15 < 0 \\longrightarrow 2n < 15 \\longrightarrow n < 7,5$.'},
                {'num': 3, 'label': 'Uwzględnienie dziedziny N+', 'text': 'Liczby naturalne spełniające $1 \\le n < 7,5$ to: $n \\in \\{1, 2, 3, 4, 5, 6, 7\\}$. Jest ich dokładnie 7.'}
            ],
            'result': '7 \\text{ wyrazów}'
        },
        exam_trap='Typowy błąd: Zapominanie, że $n$ musi być liczbą naturalną dodatnią. Wynik $n < 7,5$ oznacza dokładnie 7 wyrazów ($n=1,2,3,4,5,6,7$), a nie nieskończenie wiele!',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 11.2: Ciąg arytmetyczny (L11.2)
    # ----------------------------------------------------
    v2 = get_topic_11_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-11-2-1',
            source='Matura czerwiec 2024 • Wzorzec CKE',
            question='Ciąg arytmetyczny $(a_n)$ jest określony dla każdej liczby naturalnej $n \\ge 1$. Trzeci wyraz tego ciągu jest równy $a_3 = 11$, a siódmy wyraz $a_7 = 27$.\nRóżnica $r$ tego ciągu jest równa',
            options_data=[
                ('A', '$4$'),
                ('B', '$3$'),
                ('C', '$5$'),
                ('D', '$-4$')
            ],
            correct_id='A',
            explanation='Korzystamy z zależności między wyrazami ciągu arytmetycznego: odległość indeksów to liczba kroków $r$:\n$$a_7 = a_3 + (7 - 3)r = a_3 + 4r$$\nPodstawiamy wartości:\n$$27 = 11 + 4r$$\n$$16 = 4r \\longrightarrow r = 4.$$',
            cke_trap='Różnica wyrazów $a_7 - a_3 = 4r$, ponieważ między 3. a 7. wyrazem wykonujemy 4 kroki różnicy $r$.',
            plot=None
        ),
        make_sc_task(
            task_id='task-11-2-2',
            source='Matura maj 2023 • Zad. 14',
            question='Liczby $2x - 1,\\ 2x + 3,\\ 4x + 1$ w podanej kolejności tworzą ciąg arytmetyczny dla pewnej liczby rzeczywistej $x$.\nLiczba $x$ jest równa',
            options_data=[
                ('A', '$3$'),
                ('B', '$2$'),
                ('C', '$1$'),
                ('D', '$4$')
            ],
            correct_id='A',
            explanation='W ciągu arytmetycznym wyraz środkowy jest średnią arytmetyczną wyrazów skrajnych:\n$$2x + 3 = \\frac{(2x - 1) + (4x + 1)}{2}$$\n$$2(2x + 3) = 6x$$\n$$4x + 6 = 6x$$\n$$2x = 6 \\longrightarrow x = 3.$$',
            cke_trap='Złota reguła 3 kolejnych wyrazów: $2b = a + c$. Podwójny wyraz środkowy równa się sumie skrajnych!',
            plot=None
        ),
        make_sc_task(
            task_id='task-11-2-3',
            source='Matura czerwiec 2023 • Zad. 17',
            question='Trzywyrazowy ciąg $(1, 4, a + 5)$ jest arytmetyczny.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba $a$ jest równa',
            options_data=[
                ('A', '$0$'),
                ('B', '$7$'),
                ('C', '$2$'),
                ('D', '$11$')
            ],
            correct_id='C',
            explanation='Dla trzech kolejnych wyrazów ciągu arytmetycznego wyraz środkowy jest średnią arytmetyczną skrajnych:\n$$4 = \\frac{1 + (a + 5)}{2}$$\n$$8 = a + 6 \\longrightarrow a = 2.$$',
            cke_trap='W ciągu arytmetycznym $2b = a + c$. Nie myl z ciągiem geometrycznym ($b^2 = ac$).',
            plot=None
        ),
        make_numeric_task(
            task_id='task-11-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Dany jest ciąg arytmetyczny $(a_n)$ o pierwszym wyrazie $a_1 = 5$ i różnicy $r = 3$.\nOblicz sumę pierwszych dwudziestu wyrazów tego ciągu ($S_{20}$). Wpisz sam wynik liczbowy.',
            correct_val='670',
            explanation='Obliczamy dwudziesty wyraz $a_{20}$:\n$$a_{20} = a_1 + (20 - 1)r = 5 + 19 \\cdot 3 = 5 + 57 = 62.$$\nStosujemy wzór na sumę $S_n = \\frac{a_1 + a_n}{2} \\cdot n$ dla $n = 20$:\n$$S_{20} = \\frac{5 + 62}{2} \\cdot 20 = 67 \\cdot 10 = 670.$$',
            cke_trap='We wzorze na $a_n$ występuje $(n-1)r$, czyli dla $a_{20}$ mnożymy różnicę przez 19, a nie przez 20!'
        ),
        make_open_task(
            task_id='task-11-2-5',
            source='Matura maj 2024 • Zad. 17',
            question='Ciąg arytmetyczny $(a_n)$ jest określony dla każdej liczby naturalnej $n \\ge 1$. Trzeci wyraz tego ciągu jest równy $(-1)$, a suma piętnastu początkowych kolejnych wyrazów tego ciągu jest równa $(-165)$.\nOblicz różnicę tego ciągu. Zapisz obliczenia.',
            points=2,
            scoring_key='1 pkt – zapisanie układu równań z niewiadomymi $a_1$ oraz $r$, np. $a_1 + 2r = -1$ oraz $\\frac{2a_1 + 14r}{2} \\cdot 15 = -165$, lub równania z jedną niewiadomą $r$.\\n2 pkt – poprawne obliczenie różnicy ciągu: $r = -2$.',
            explanation='Krok 1: Wykorzystujemy wzór na wyraz ogólny oraz sumę ciągu arytmetycznego:\n$$a_3 = a_1 + 2r = -1$$\n$$S_{15} = \\frac{2a_1 + 14r}{2} \\cdot 15 = (a_1 + 7r) \\cdot 15 = -165$$\nKrok 2: Dzielimy drugie równanie obustronnie przez 15:\n$$a_1 + 7r = -11$$\nKrok 3: Z pierwszego równania wyznaczamy $a_1 = -1 - 2r$ i podstawiamy:\n$$(-1 - 2r) + 7r = -11$$\n$$5r = -10$$\n$$r = -2$$\nOdpowiedź: Różnica ciągu arytmetycznego wynosi $r = -2$.',
            cke_trap='Pamiętaj o nawiasach przy wyznaczaniu sumy: we wzorze na $S_{15}$ mamy $\\frac{2a_1 + (15-1)r}{2} \\cdot 15$.'
        )
    ]

    l2 = make_lesson(
        lesson_id='lesson-11-2',
        topic_id=topic_id,
        title='Ciąg arytmetyczny',
        concept_essence={
            'lead': 'Ciąg arytmetyczny to ciąg o stałym kroku przyrostu: każdy kolejny wyraz powstaje przez dodanie różnicy r.',
            'pillars': [
                {'title': 'Różnica ciągu r', 'description': 'r = an+1 - an = const. Jeśli r > 0, ciąg rośnie; jeśli r < 0, ciąg maleje; dla r = 0 jest stały.'},
                {'title': 'Wzór ogólny an', 'description': 'an = a1 + (n-1)r. Skok z wyrazu ak do am wynosi dokładnie (m-k)r.'},
                {'title': 'Trzy kolejne wyrazy', 'description': 'Środkowy wyraz jest średnią arytmetyczną skrajnych: 2b = a + c dla trójki (a, b, c).'}
            ]
        },
        matura_context='Pewniak CKE: W każdym arkuszu maturalnym występuje zadanie z ciągiem arytmetycznym (zależność 3 wyrazów, wzór ogólny lub suma Sn).',
        core_formulas=[
            {
                'title': 'Wzór na n-ty wyraz ciągu arytmetycznego',
                'latex': 'a_n = a_1 + (n - 1)r',
                'description': 'Wzór pozwala obliczyć dowolny wyraz znając a1 oraz różnicę r.',
                'in_cke_sheet': True,
                'cke_page': 'str. 9'
            },
            {
                'title': 'Suma n początkowych wyrazów ciągu arytmetycznego',
                'latex': 'S_n = \\frac{a_1 + a_n}{2} \\cdot n = \\frac{2a_1 + (n - 1)r}{2} \\cdot n',
                'description': 'Suma średniej z pierwszego i ostatniego wyrazu pomnożona przez liczbę wyrazów.',
                'in_cke_sheet': True,
                'cke_page': 'str. 9'
            },
            {
                'title': 'Zależność trzech kolejnych wyrazów',
                'latex': 'b = \\frac{a + c}{2} \\quad (2b = a + c)',
                'description': 'Liczby (a, b, c) tworzą ciąg arytmetyczny.',
                'in_cke_sheet': True,
                'cke_page': 'str. 9'
            }
        ],
        worked_example={
            'problem': 'W ciągu arytmetycznym $a_2 = 7$ oraz $a_5 = 19$. Wyznacz pierwszy wyraz $a_1$ oraz sumę dziesięciu pierwszych wyrazów $S_{10}$.',
            'steps': [
                {'num': 1, 'label': 'Wyznaczenie różnicy r', 'text': 'Różnica indeksów: $a_5 - a_2 = 3r \\longrightarrow 19 - 7 = 3r \\longrightarrow 12 = 3r \\longrightarrow r = 4$.'},
                {'num': 2, 'label': 'Obliczenie pierwszego wyrazu a1', 'text': 'Cofamy się o jeden krok: $a_1 = a_2 - r = 7 - 4 = 3$.'},
                {'num': 3, 'label': 'Obliczenie sumy S10', 'text': 'Wyraz $a_{10} = a_1 + 9r = 3 + 9 \\cdot 4 = 39$. Wtedy $S_{10} = \\frac{3 + 39}{2} \\cdot 10 = 21 \\cdot 10 = 210$.'}
            ],
            'result': 'a_1 = 3, \\quad S_{10} = 210'
        },
        exam_trap='Typowy błąd: Mnożenie $r$ przez $n$ zamiast przez $(n-1)$. Dziesiąty wyraz to $a_1 + 9r$, a NIE $a_1 + 10r$!',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 11.3: Ciąg geometryczny (L11.3)
    # ----------------------------------------------------
    v3 = get_topic_11_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-11-3-1',
            source='Matura maj 2024 • Wzorzec CKE',
            question='Wszystkie wyrazy ciągu geometrycznego $(a_n)$ określonego dla $n \\ge 1$ są dodatnie. Drugi wyraz tego ciągu jest równy $a_2 = 6$, a piąty wyraz $a_5 = 48$.\nIloraz $q$ tego ciągu jest równy',
            options_data=[
                ('A', '$2$'),
                ('B', '$\\sqrt{2}$'),
                ('C', '$3$'),
                ('D', '$4$')
            ],
            correct_id='A',
            explanation='W ciągu geometrycznym iloraz wyrazów odpowiada potędze ilorazu $q$ równej różnicy indeksów:\n$$\\frac{a_5}{a_2} = q^{5 - 2} = q^3$$\nPodstawiamy dane liczbowe:\n$$\\frac{48}{6} = q^3 \\longrightarrow 8 = q^3 \\longrightarrow q = 2.$$',
            cke_trap='W ciągu geometrycznym indeksy odejmujemy w potędze: $a_5 = a_2 \\cdot q^3$, a nie dodajemy jak w ciągu arytmetycznym!',
            plot=None
        ),
        make_sc_task(
            task_id='task-11-3-2',
            source='Matura czerwiec 2023 • Zad. 16',
            question='Liczby $4,\\ x,\\ 36$ w podanej kolejności tworzą ciąg geometryczny o wyrazach dodatnich.\nLiczba $x$ jest równa',
            options_data=[
                ('A', '$12$'),
                ('B', '$20$'),
                ('C', '$16$'),
                ('D', '$18$')
            ],
            correct_id='A',
            explanation='Dla trzech kolejnych wyrazów ciągu geometrycznego zachodzi równość kwadratu wyrazu środkowego:\n$$x^2 = 4 \\cdot 36 = 144$$\nPonieważ wyrazy są dodatnie, wybieramy pierwiastek dodatni: $x = \\sqrt{144} = 12$.',
            cke_trap='Liczba 20 to średnia arytmetyczna $(4+36)/2$. W ciągu geometrycznym bierzemy średnią GEOMETRYCZNĄ: $\\sqrt{4 \\cdot 36} = 12$!',
            plot=None
        ),
        make_sc_task(
            task_id='task-11-3-3',
            source='Matura maj 2023 • Zad. 16',
            question='Trzywyrazowy ciąg $(27, 9, a - 1)$ jest geometryczny.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba $a$ jest równa',
            options_data=[
                ('A', '$3$'),
                ('B', '$0$'),
                ('C', '$4$'),
                ('D', '$2$')
            ],
            correct_id='C',
            explanation='Iloraz ciągu geometrycznego wynosi $q = \\frac{9}{27} = \\frac{1}{3}$.\nTrzeci wyraz to $a - 1 = 9 \\cdot \\frac{1}{3} = 3$.\nStąd $a - 1 = 3 \\longrightarrow a = 4$.',
            cke_trap='Trzeci wyraz wynosi 3, ale trzecim wyrazem jest $a - 1$, więc $a = 3 + 1 = 4$.',
            plot=None
        ),
        make_numeric_task(
            task_id='task-11-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Klient wpłacił do banku $10\\ 000$ zł na lokatę 2-letnią z roczną kapitalizacją odsetek i oprocentowaniem $10\\%$ w skali roku.\nOblicz kwotę kapitału zgromadzoną na lokacie po 2 latach (bez uwzględniania podatków). Wpisz samą liczbę w złotych.',
            correct_val='12100',
            explanation='Wzór na procent składany: $K_2 = K_0 \\cdot (1 + \\frac{p}{100})^2 = 10\\ 000 \\cdot (1{,}1)^2 = 10\\ 000 \\cdot 1{,}21 = 12\\ 100\\ \\text{zł}$.',
            cke_trap='W drugim roku odsetki naliczają się także od odsetek z pierwszego roku (12 100 zł zamiast 12 000 zł).'
        ),
        make_open_proof(
            task_id='task-11-3-5',
            source='Informator CKE • Zad. 28',
            question='Trzy liczby dodatnie tworzą ciąg geometryczny. Wykaż, że jeśli suma tych liczb jest równa $26$, a środkowa z nich jest równa $6$, to pierwsza z tych liczb jest równa $2$ lub $18$.',
            points=2,
            scoring_key='1 pkt – zastosowanie własności ciągu geometrycznego ($b^2 = ac$) i zapisanie równania kwadratowego z jedną niewiadomą, np. $a^2 - 20a + 36 = 0$.\\n2 pkt – poprawne rozwiązanie równania kwadratowego ($a = 2$ lub $a = 18$) i sformułowanie wniosku końcowego.',
            explanation='Niech $(a, b, c)$ tworzą ciąg geometryczny o wyrazach dodatnich. Wiemy, że $b = 6$ oraz $a + b + c = 26$.\nStąd $a + 6 + c = 26 \\longrightarrow a + c = 20 \\longrightarrow c = 20 - a$.\nZ własności ciągu geometrycznego: $b^2 = a \\cdot c$:\n$$6^2 = a(20 - a)$$\n$$36 = 20a - a^2$$\n$$a^2 - 20a + 36 = 0$$\n$$\\Delta = (-20)^2 - 4 \\cdot 1 \\cdot 36 = 400 - 144 = 256, \\quad \\sqrt{\\Delta} = 16$$\n$$a_1 = \\frac{20 - 16}{2} = 2, \\quad a_2 = \\frac{20 + 16}{2} = 18$$\nObie liczby prowadzą do ciągów o wyrazach dodatnich: $(2, 6, 18)$ lub $(18, 6, 2)$, co kończy dowód.',
            cke_trap='Nieuwzględnienie faktu, że obydwa rozwiązania są prawidłowe, gdyż ciąg może być rosnący lub malejący.'
        )
    ]

    l3 = make_lesson(
        lesson_id='lesson-11-3',
        topic_id=topic_id,
        title='Ciąg geometryczny',
        concept_essence={
            'lead': 'Ciąg geometryczny to ciąg o stałym ilorazie: każdy kolejny wyraz powstaje przez pomnożenie poprzedniego przez q.',
            'pillars': [
                {'title': 'Iloraz ciągu q', 'description': 'q = an+1 / an = const. Dla q > 1 ciąg rośnie (przy a1 > 0); dla 0 < q < 1 maleje; dla q < 0 jest naprzemienny.'},
                {'title': 'Wzór ogólny an', 'description': 'an = a1 · q^(n-1). Odstęp k kroków to mnożenie przez q^k: an+k = an · q^k.'},
                {'title': 'Trzy kolejne wyrazy', 'description': 'Kwadrat środkowego wyrazu jest iloczynem skrajnych: b^2 = a · c dla wyrazów (a, b, c).'}
            ]
        },
        matura_context='Pewniak CKE: Występuje na każdej maturze (wyznaczenie wyrazu z q, równanie b^2 = ac na 3 kolejne wyrazy lub procent składany).',
        core_formulas=[
            {
                'title': 'Wzór na n-ty wyraz ciągu geometrycznego',
                'latex': 'a_n = a_1 \\cdot q^{n - 1}',
                'description': 'Kolejne wyrazy powstają przez potęgowanie ilorazu q.',
                'in_cke_sheet': True,
                'cke_page': 'str. 10'
            },
            {
                'title': 'Suma n początkowych wyrazów ciągu geometrycznego',
                'latex': 'S_n = a_1 \\cdot \\frac{1 - q^n}{1 - q} \\quad (\\text{dla } q \\neq 1)',
                'description': 'Wzór na sumę skończoną ciągu geometrycznego.',
                'in_cke_sheet': True,
                'cke_page': 'str. 10'
            },
            {
                'title': 'Zależność trzech kolejnych wyrazów',
                'latex': 'b^2 = a \\cdot c \\quad (\\text{dla dodatnich: } b = \\sqrt{ac})',
                'description': 'Kwadrat wyrazu środkowego równa się iloczynowi wyrazów skrajnych.',
                'in_cke_sheet': True,
                'cke_page': 'str. 10'
            }
        ],
        worked_example={
            'problem': 'Liczby $x - 3,\\ 6,\\ 2x + 6$ tworzą w podanej kolejności ciąg geometryczny o wyrazach dodatnich. Oblicz $x$.',
            'steps': [
                {'num': 1, 'label': 'Zastosowanie zależności b^2 = a · c', 'text': 'Wyraz środkowy do kwadratu równa się iloczynowi skrajnych: $6^2 = (x - 3)(2x + 6)$.'},
                {'num': 2, 'label': 'Wymnożenie i uporządkowanie równania', 'text': '$36 = 2x^2 + 6x - 6x - 18 \\longrightarrow 36 = 2x^2 - 18 \\longrightarrow 2x^2 = 54 \\longrightarrow x^2 = 27$.'},
                {'num': 3, 'label': 'Wyznaczenie x i sprawdzenie założeń', 'text': '$x = \\sqrt{27} = 3\\sqrt{3}$ (odrzucamy ujemny pierwiastek, bo wyrazy mają być dodatnie: $x - 3 = 3\\sqrt{3} - 3 > 0$).'}
            ],
            'result': 'x = 3\\sqrt{3}'
        },
        exam_trap='Typowy błąd: Mylenie wzoru na ciąg geometryczny ($b^2 = ac$) z arytmetycznym ($2b = a + c$). Zawsze upewnij się, czy w treści zadania mowa o ciągu arytmetycznym, czy geometrycznym!',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'short_title': topic_title,
        'description': 'Kompletny dział ciągów liczbowych: własności, ciąg arytmetyczny, geometryczny i procent składany.',
        'icon': 'Binary',
        'color': '#38BDF8',
        'matura_points_range': '4–7 pkt',
        'importance': 'Pewniak CKE (Tier S)',
        'lessons': lessons
    }

if __name__ == '__main__':
    import json
    t = build_topic_11()
    print(f"Pomyślnie zbudowano {t['title']} ({len(t['lessons'])} lekcje, {sum(len(l['tasks']) for l in t['lessons'])} zadań).")
