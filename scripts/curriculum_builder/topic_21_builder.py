"""
topic_21_builder.py - Dział 21: Zadania Optymalizacyjne z Funkcją Kwadratową (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Autentyczne CKE
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_21 import get_topic_21_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_21():
    topic_id = 'dzial-21'
    topic_title = 'Zadania Optymalizacyjne z Funkcją Kwadratową'
    topic_number = 21
    lessons = []

    # =========================================================================
    # Lekcja 21.1: Wyznaczanie funkcji jednej zmiennej
    # =========================================================================
    v1 = get_topic_21_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-21-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Działkę w kształcie prostokąta należy ogrodzić z trzech stron płotem o łącznej długości $120\text{ m}$ (czwarta strona przylega do ściany budynku).' + '\n' +
                     r'Niech $x$ oznacza długość każdego z dwóch boków prostopadłych do ściany budynku.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Pole tej działki $P$ jako funkcja zmiennej $x$ wyraża się wzorem',
            options_data=[
                ('A', r'$P(x) = -2x^2 + 120x$'),
                ('B', r'$P(x) = -x^2 + 120x$'),
                ('C', r'$P(x) = -2x^2 + 60x$'),
                ('D', r'$P(x) = 2x^2 - 120x$')
            ],
            correct_id='A',
            explanation=r'Płot tworzą dwa boki o długości $x$ oraz jeden bok o długości $y$.' + '\n' +
                        r'Równanie długości płotu: $2x + y = 120 \longrightarrow y = 120 - 2x$.' + '\n' +
                        r'Wzór na pole prostokąta to $P = x \cdot y$.' + '\n' +
                        r'Podstawiamy wyznaczone $y$:' + '\n' +
                        r'$$P(x) = x(120 - 2x) = -2x^2 + 120x$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Płot jest z 3 stron, więc $2x + y = 120$, a nie $2x + 2y = 120$. Pamiętaj o wymnożeniu nawiasu: $x(120 - 2x) = 120x - 2x^2$.'
        ),
        make_sc_task(
            task_id='task-21-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Suma dwóch liczb rzeczywistych $x$ i $y$ wynosi $20$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Iloczyn tych liczb $I(x) = x \cdot y$ zapisany jako funkcja jednej zmiennej $x$ ma postać',
            options_data=[
                ('A', r'$I(x) = -x^2 + 20x$'),
                ('B', r'$I(x) = x^2 - 20x$'),
                ('C', r'$I(x) = -2x^2 + 20x$'),
                ('D', r'$I(x) = -x^2 + 10x$'),
            ],
            correct_id='A',
            explanation=r'Mamy $x + y = 20 \longrightarrow y = 20 - x$.' + '\n' +
                        r'Iloczyn liczb to $I(x) = x \cdot y = x(20 - x) = -x^2 + 20x$.',
            cke_trap=r'Współczynnik przy $x^2$ wynosi $-1$, ponieważ $x \cdot (-x) = -x^2$.'
        ),
        make_sc_task(
            task_id='task-21-1-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Prostokątny plac zabaw o obwodzie $80\text{ m}$ ma boki długości $a$ i $b$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Pole placu zabaw jako funkcja boku $a$ wyraża się wzorem',
            options_data=[
                ('A', r'$P(a) = -a^2 + 40a$'),
                ('B', r'$P(a) = -a^2 + 80a$'),
                ('C', r'$P(a) = -2a^2 + 40a$'),
                ('D', r'$P(a) = a^2 - 40a$'),
            ],
            correct_id='A',
            explanation=r'Obwód prostokąta: $2a + 2b = 80 \longrightarrow a + b = 40 \longrightarrow b = 40 - a$.' + '\n' +
                        r'Wzór na pole: $P(a) = a \cdot b = a(40 - a) = -a^2 + 40a$.',
            cke_trap=r'Obwód to $2a + 2b = 80$, więc suma dwóch boków to połowa obwodu: $a + b = 40$, a nie $80$.'
        ),
        make_numeric_task(
            task_id='task-21-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Funkcja zysku ze sprzedaży dana jest wzorem $Z(x) = -x^2 + 60x - 100$. Oblicz wartość współczynnika $b$ tej funkcji kwadratowej. Wpisz wynik w pole poniżej.',
            correct_val=60,
            explanation=r'W postaci ogólnej $f(x) = ax^2 + bx + c$ mamy $a = -1$, $b = 60$ oraz $c = -100$. Współczynnik $b = 60$.',
            cke_trap=r'Współczynnik $b$ to liczba stojąca przy zmiennej $x$ w pierwszej potędze.'
        ),
        make_open_task(
            task_id='task-21-1-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Suma długości dwóch boków prostokąta wynosi $30\text{ cm}$. Wyznacz pole tego prostokąta jako funkcję długości jednego z jego boków $x$.' + '\n' +
                     r'Zapisz tę funkcję w postaci ogólnej $P(x) = ax^2 + bx$. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – wyznaczenie długości drugiego boku prostokąta w zależności od x: y = 30 - x.' + '\n' +
                        r'2 pkt – zapisanie wzoru funkcji pola w postaci ogólnej: P(x) = -x^2 + 30x.',
            explanation=r'Krok 1: Oznaczmy boki prostokąta jako $x$ oraz $y$. Suma ich długości to $x + y = 30$, stąd:' + '\n' +
                        r'$$y = 30 - x$$' + '\n' +
                        r'Krok 2: Pole prostokąta to iloczyn długości jego boków:' + '\n' +
                        r'$$P(x) = x \cdot y = x(30 - x) = -x^2 + 30x$$',
            cke_trap=r'Pamiętaj o wymnożeniu nawiasu do postaci ogólnej: $x(30 - x) = -x^2 + 30x$.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-21-1',
        topic_id=topic_id,
        title='Wyznaczanie funkcji jednej zmiennej w optymalizacji',
        concept_essence=(
            "Zadanie optymalizacyjne polega na znalezieniu największej lub najmniejszej wartości pewnej wielkości (pola, zysku, kosztu).\n\n"
            "Krok 1: Zapisujemy zależność między dwiema niewiadomymi (np. z obwodu: $2x + y = 120$).\n\n"
            "Krok 2: Wyznaczamy jedną zmienną ($y = 120 - 2x$) i wstawiamy do wzoru na optymalizowaną wielkość ($P = x \\cdot y$).\n\n"
            "Otrzymujemy funkcję kwadratową jednej zmiennej $P(x) = -2x^2 + 120x$."
        ),
        matura_context='Pierwszy krok zadania za 4 pkt na maturze (wart 1 pkt w kluczu oceniania CKE). Warunkiem koniecznym jest poprawne podstawienie.',
        core_formulas=[
            {
                'title': 'Funkcja celu w optymalizacji',
                'latex': r'P(x) = x \cdot (L - kx) = -kx^2 + Lx',
                'description': 'Zależność kwadratowa otrzymana z redukcji do jednej zmiennej.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7–8'
            }
        ],
        worked_example={
            'problem': r'Obwód prostokąta wynosi $40$. Zapisz wzór na pole prostokąta w zależności od boku $x$.',
            'steps': [
                r'Krok 1: $2x + 2y = 40 \longrightarrow x + y = 20 \longrightarrow y = 20 - x$.',
                r'Krok 2: Pole: $P(x) = x \cdot y = x(20 - x) = -x^2 + 20x$.'
            ],
            'result': r'P(x) = -x^2 + 20x'
        },
        exam_trap=r'Błędne policzenie obwodu: przyjęcie $2x + 2y$ zamiast $2x + y$, gdy jedna ściana nie jest ogrodzona.',
        visuals=v1,
        tasks=l1_tasks,
        key_takeaway=r'W optymalizacji wyznacz jedną zmienną z warunku obwodu lub długości i podstaw do wzoru na pole, uzyskując funkcję $P(x) = ax^2 + bx$.'
    )
    lessons.append(l1)

    # =========================================================================
    # Lekcja 21.2: Dziedzina zadania optymalizacyjnego
    # =========================================================================
    v2 = get_topic_21_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-21-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Pole działki prostokątnej opisuje wzór $P(x) = x(120 - 2x)$, gdzie $x$ oraz $y = 120 - 2x$ to długości boków działki.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Dziedziną geometryczną tej funkcji jest przedział',
            options_data=[
                ('A', r'$(0, 60)$'),
                ('B', r'$\langle 0, 60 \rangle$'),
                ('C', r'$(0, 120)$'),
                ('D', r'$(0, +\infty)$')
            ],
            correct_id='A',
            explanation=r'Wymiary geometryczne muszą być liczbami ściśle dodatnimi:' + '\n' +
                        r'1) $x > 0$' + '\n' +
                        r'2) $y > 0 \longrightarrow 120 - 2x > 0 \longrightarrow 2x < 120 \longrightarrow x < 60$' + '\n' +
                        r'Część wspólna obu warunków daje przedział obustronnie otwarty:' + '\n' +
                        r'$$D = (0, 60)$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Brak wyznaczenia dziedziny kosztuje 1 punkt na maturze! Ponadto przedział musi być OTWARTY ($x > 0$ i $x < 60$), bo dla $x = 0$ lub $x = 60$ figura nie istnieje (pole = 0).'
        ),
        make_sc_task(
            task_id='task-21-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Boki prostokąta mają długości $x$ oraz $40 - x$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Dziedzina funkcji pola tego prostokąta to zbiór',
            options_data=[
                ('A', r'$x \in (0, 40)$'),
                ('B', r'$x \in \langle 0, 40 \rangle$'),
                ('C', r'$x \in (0, 20)$'),
                ('D', r'$x \in (0, +\infty)$'),
            ],
            correct_id='A',
            explanation=r'Warunki geometryczne na długości boków:' + '\n' +
                        r'$$x > 0 \quad \text{oraz} \quad 40 - x > 0 \longrightarrow x < 40$$' + '\n' +
                        r'Stąd $x \in (0, 40)$.',
            cke_trap=r'Przedział otwarty: dla $x = 0$ oraz $x = 40$ prostokąt degeneruje się do odcinka, więc nie ma powierzchni.'
        ),
        make_sc_task(
            task_id='task-21-2-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wybieg dla psów składa się z trzech jednakowych kwater, a łączna długość siatki wynosi $36\text{ m}$. Boki wybiegu to $x$ oraz $y = \frac{36 - 4x}{2} = 18 - 2x$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Dziedziną zmiennej $x$ jest przedział',
            options_data=[
                ('A', r'$(0, 9)$'),
                ('B', r'$(0, 18)$'),
                ('C', r'$(0, 36)$'),
                ('D', r'$\langle 0, 9 \rangle$'),
            ],
            correct_id='A',
            explanation=r'Warunek $x > 0$ oraz $y > 0 \longrightarrow 18 - 2x > 0 \longrightarrow 2x < 18 \longrightarrow x < 9$.' + '\n' +
                        r'Dziedzina to przedział otwarty $x \in (0, 9)$.',
            cke_trap=r'Podstaw dokładnie warunek $18 - 2x > 0 \longrightarrow x < 9$. Dzielenie przez 2 daje 9, a nie 18.'
        ),
        make_numeric_task(
            task_id='task-21-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Dla boków prostokąta $x$ oraz $y = 50 - 5x$ wyznacz górną granicę dziedziny zmiennej $x$ (wartość, do której dąży otwarty przedział z prawej strony). Wpisz wynik w pole poniżej.',
            correct_val=10,
            explanation=r'Warunek $y > 0 \longrightarrow 50 - 5x > 0 \longrightarrow 5x < 50 \longrightarrow x < 10$.' + '\n' +
                        r'Górna granica dziedziny to 10.',
            cke_trap=r'Rozwiązujemy prostą nierówność liniową: $50 - 5x > 0 \longrightarrow x < 10$.'
        ),
        make_open_task(
            task_id='task-21-2-5',
            source='Matura maj 2024 • Zad. 31',
            question=r'Ogrodnik dysponuje siatką o długości $60\text{ m}$ i chce ogrodzić prostokątny wybieg podzielony na dwie jednakowe części siatką równoległą do jednego z boków.' + '\n' +
                     r'Niech $x$ oznacza długość każdego z trzech równoległych odcinków siatki.' + '\n' +
                     r'Zapisz pole tego wybiegu jako funkcję zmiennej $x$ oraz wyznacz dziedzinę geometryczną tej funkcji. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – wyznaczenie wzoru funkcji pola: P(x) = x(30 - 1{,}5x) = -1{,}5x^2 + 30x.' + '\n' +
                        r'2 pkt – poprawne wyznaczenie dziedziny geometrycznej jako przedziału otwartego: D = (0, 20).',
            explanation=r'Krok 1: Ogrodzenie składa się z trzech odcinków o długości $x$ oraz dwóch odcinków o długości $y$:' + '\n' +
                        r'$$3x + 2y = 60 \longrightarrow 2y = 60 - 3x \longrightarrow y = 30 - 1{,}5x$$' + '\n' +
                        r'Krok 2: Pole powierzchni całego wybiegu:' + '\n' +
                        r'$$P(x) = x \cdot y = x(30 - 1{,}5x) = -1{,}5x^2 + 30x$$' + '\n' +
                        r'Krok 3: Wymiary geometryczne muszą być dodatnie:' + '\n' +
                        r'$$x > 0 \quad \text{oraz} \quad 30 - 1{,}5x > 0 \longrightarrow 1{,}5x < 30 \longrightarrow x < 20$$' + '\n' +
                        r'Dziedzina funkcji pola to przedział otwarty $D = (0, 20)$.',
            cke_trap=r'Pamiętaj, że dziedzina w zadaniach geometrycznych musi być przedziałem OTWARTYM: $D = (0, 20)$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-21-2',
        topic_id=topic_id,
        title='Dziedzina zadania optymalizacyjnego',
        concept_essence=(
            "W każdym zadaniu optymalizacyjnym o podłożu geometrycznym wymiary muszą być liczbami ściśle dodatnimi.\n\n"
            "Układamy układ nierówności: $x > 0$ oraz $y(x) > 0$.\n\n"
            "Część wspólna rozwiązań to zawsze przedział OTWARTY $(0, x_{\\max})$.\n\n"
            "Na maturze CKE za poprawne wyznaczenie dziedziny przyznawany jest osobny 1 punkt!"
        ),
        matura_context='Kluczowy element punktacji CKE (1 pkt). Brak dziedziny to natychmiastowa utrata punktu, nawet jeśli wynik końcowy jest poprawny.',
        core_formulas=[
            {
                'title': 'Warunki brzegowe dziedziny',
                'latex': r'\begin{cases} x > 0 \\ y(x) > 0 \end{cases}',
                'description': 'Wymiary geometryczne muszą być ściśle dodatnie.',
                'in_cke_sheet': False,
                'cke_page': '-'
            }
        ],
        worked_example={
            'problem': r'Wyznacz dziedzinę funkcji $P(x) = x(80 - 4x)$.',
            'steps': [
                r'Krok 1: Warunek 1: $x > 0$.',
                r'Krok 2: Warunek 2: $80 - 4x > 0 \longrightarrow 4x < 80 \longrightarrow x < 20$.',
                r'Krok 3: Część wspólna: $D = (0, 20)$.'
            ],
            'result': r'D = (0, 20)'
        },
        exam_trap=r'Domknięcie przedziału dziedziny $\langle 0, 20 \rangle$ zamiast $(0, 20)$. Dla $x = 0$ prostokąt nie istnieje!',
        visuals=v2,
        tasks=l2_tasks,
        key_takeaway=r'Każdy wymiar geometryczny musi być ściśle dodatni ($x > 0$ oraz $y > 0$). Dziedzina w zadaniach optymalizacyjnych to zawsze przedział otwarty $(0, x_{\max})$. Za dziedzinę CKE przyznaje 1 pełny punkt!'
    )
    lessons.append(l2)

    # =========================================================================
    # Lekcja 21.3: Wyznaczanie wierzchołka i wartości optymalnej
    # =========================================================================
    v3 = get_topic_21_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-21-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Funkcja pola działki ma postać $P(x) = -2x^2 + 120x$ dla $x \in (0, 60)$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Pole tej działki jest największe, gdy bok $x$ ma długość',
            options_data=[
                ('A', '$30\text{ m}$'),
                ('B', '$60\text{ m}$'),
                ('C', '$15\text{ m}$'),
                ('D', '$40\text{ m}$')
            ],
            correct_id='A',
            explanation=r'Funkcja $P(x)$ jest funkcją kwadratową o współczynnikach $a = -2$ oraz $b = 120$.' + '\n' +
                        r'Ponieważ $a = -2 < 0$, ramiona paraboli są skierowane w dół, więc funkcja osiąga maksimum w wierzchołku:' + '\n' +
                        r'$$x_w = -\frac{b}{2a} = -\frac{120}{2 \cdot (-2)} = -\frac{120}{-4} = 30$$' + '\n' +
                        r'Wartość $x = 30$ należy do dziedziny $(0, 60)$.' + '\n' +
                        r'Największe pole osiągane jest dla $x = 30\text{ m}$. Poprawna odpowiedź to A.',
            cke_trap=r'Pamiętaj o minusie w mianowniku: $2a = 2 \cdot (-2) = -4$. Dzielenie $-120$ przez $-4$ daje wynik $+30$.'
        ),
        make_sc_task(
            task_id='task-21-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Dla funkcji pola $P(x) = -2x^2 + 120x$ i optymalnego boku $x = 30\text{ m}$ drugi bok ma długość $y = 120 - 2x = 60\text{ m}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Maksymalne pole tej działki jest równe',
            options_data=[
                ('A', '$1800\text{ m}^2$'),
                ('B', '$3600\text{ m}^2$'),
                ('C', '$900\text{ m}^2$'),
                ('D', '$1200\text{ m}^2$'),
            ],
            correct_id='A',
            explanation=r'Obliczamy pole podstawiając $x = 30$:' + '\n' +
                        r'$$P(30) = 30 \cdot (120 - 2 \cdot 30) = 30 \cdot 60 = 1800\text{ m}^2$$' + '\n' +
                        r'Można też ze wzoru na rzędną wierzchołka: $q = -\frac{\Delta}{4a}$.',
            cke_trap=r'Nie pomnóż 60 przez 60! Boki to $x = 30$ oraz $y = 60$, stąd pole to $30 \cdot 60 = 1800\text{ m}^2$.'
        ),
        make_sc_task(
            task_id='task-21-3-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Funkcja kosztu wytworzenia $x$ elementów dana jest wzorem $K(x) = 2x^2 - 80x + 1000$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Koszt produkcji jest najmniejszy, gdy liczba wyprodukowanych elementów $x$ wynosi',
            options_data=[
                ('A', '$20$'),
                ('B', '$40$'),
                ('C', '$10$'),
                ('D', '$25$'),
            ],
            correct_id='A',
            explanation=r'Współczynniki to $a = 2 > 0$ oraz $b = -80$.' + '\n' +
                        r'Ramiona paraboli w górę $\longrightarrow$ minimum w wierzchołku:' + '\n' +
                        r'$$x_w = -\frac{b}{2a} = -\frac{-80}{2 \cdot 2} = \frac{80}{4} = 20$$',
            cke_trap=r'Dwa minusy dają plus: $-(-80) = +80$, więc $x_w = 20$.'
        ),
        make_numeric_task(
            task_id='task-21-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Funkcja pola prostokąta dana jest wzorem $P(x) = -x^2 + 40x$ dla $x \in (0, 40)$.' + '\n' +
                     r'Oblicz wartość argumentu $x$, dla którego pole to jest największe. Wpisz wynik w pole poniżej.',
            correct_val=20,
            explanation=r'Funkcja $P(x) = -x^2 + 40x$ osiąga maksimum w wierzchołku paraboli:' + '\n' +
                        r'$$x_w = -\frac{b}{2a} = -\frac{40}{2 \cdot (-1)} = \frac{40}{2} = 20$$' + '\n' +
                        r'Wartość $20$ należy do dziedziny $(0, 40)$.',
            cke_trap=r'Pamiętaj, że $a = -1$, więc w mianowniku mamy $2 \cdot (-1) = -2$. Minusy się upraszczają: $\frac{-40}{-2} = 20$.'
        ),
        make_open_task(
            task_id='task-21-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Drut o długości $40\text{ cm}$ zgięto tak, że utworzył ramkę prostokątną. Wyznacz wymiary tego prostokąta, dla których jego pole jest największe, oraz oblicz to największe pole. Zapisz obliczenia.',
            points=4,
            scoring_key=r'1 pkt – zapisanie funkcji pola P(x) = x(20 - x) = -x^2 + 20x oraz dziedziny D = (0, 20).' + '\n' +
                        r'2 pkt – uzasadnienie, że funkcja osiąga maksimum w wierzchołku (a = -1 < 0).' + '\n' +
                        r'3 pkt – obliczenie x_w = 10 oraz sprawdzenie, że 10 należy do dziedziny D.' + '\n' +
                        r'4 pkt – podanie drugiego wymiaru y = 10 cm (kwadrat) oraz obliczenie maksymalnego pola P = 100 cm^2.',
            explanation=r'Krok 1: Obwód prostokąta wynosi $2x + 2y = 40 \longrightarrow x + y = 20 \longrightarrow y = 20 - x$.' + '\n' +
                        r'Wzór funkcji pola: $P(x) = x(20 - x) = -x^2 + 20x$.' + '\n' +
                        r'Dziedzina: $x > 0$ oraz $20 - x > 0 \longrightarrow x \in (0, 20)$.' + '\n' +
                        r'Krok 2: Wykres funkcji $P(x)$ jest parabolą z ramionami skierowanymi w dół ($a = -1 < 0$), stąd funkcja osiąga wartość największą w wierzchołku.' + '\n' +
                        r'Krok 3: Obliczamy odciętą wierzchołka:' + '\n' +
                        r'$$x_w = -\frac{b}{2a} = -\frac{20}{2 \cdot (-1)} = 10$$' + '\n' +
                        r'Ponieważ $10 \in (0, 20)$, wartość ta należy do dziedziny.' + '\n' +
                        r'Krok 4: Drugi wymiar: $y = 20 - 10 = 10\text{ cm}$.' + '\n' +
                        r'Maksymalne pole wynosi $P_{\max} = 10 \cdot 10 = 100\text{ cm}^2$.',
            cke_trap=r'Spośród wszystkich prostokątów o danym obwodzie największe pole ma zawsze KWADRAT ($x = y$). W rozwiązaniu musisz jednak jawnie przeprowadzić dowód z funkcji kwadratowej i dziedziny!'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-21-3',
        topic_id=topic_id,
        title='Wyznaczanie wierzchołka paraboli i wartości optymalnej',
        concept_essence=(
            "Wierzchołek paraboli $W(p, q)$ wyznacza ekstremum funkcji kwadratowej.\n\n"
            "Odcięta wierzchołka $x_w = p = -\\frac{b}{2a}$ to punkt optymalny (wymiar, przy którym pole jest największe).\n\n"
            "Rzędna wierzchołka $q = P(x_w)$ to sama poszukiwana wartość optymalna (maksymalne pole, minimalny koszt).\n\n"
            "Kompletna odpowiedź na maturze wymaga: wzoru, dziedziny, wierzchołka, sprawdzenia $x_w \\in D$ oraz odpowiedzi na pytanie zadania."
        ),
        matura_context='Królowa zadań otwartych na maturze podstawowej – pewniak za 4 punkty! Wymaga pełnego, metodycznego zapisu.',
        core_formulas=[
            {
                'title': 'Odcięta wierzchołka paraboli',
                'latex': r'x_w = -\frac{b}{2a}',
                'description': 'Karta wzorów CKE str. 7–8 (postać ogólna i wierzchołek paraboli).',
                'in_cke_sheet': True,
                'cke_page': 'str. 7–8'
            },
            {
                'title': 'Wartość optymalna',
                'latex': r'P_{\max} = P(x_w)',
                'description': 'Wartość funkcji dla argumentu wierzchołkowego.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7–8'
            }
        ],
        worked_example={
            'problem': r'Funkcja pola to $P(x) = -x^2 + 16x$ dla $x \in (0, 16)$. Oblicz optymalne $x$ oraz pole maksymalne.',
            'steps': [
                r'Krok 1: $x_w = -\frac{16}{2 \cdot (-1)} = 8$.',
                r'Krok 2: Sprawdzenie dziedziny: $8 \in (0, 16)$ (OK).',
                r'Krok 3: Pole maksymalne: $P(8) = -8^2 + 16 \cdot 8 = -64 + 128 = 64$.'
            ],
            'result': r'x = 8, \quad P_{\max} = 64'
        },
        exam_trap=r'Brak sprawdzenia dziedziny ($x_w \in D$) lub podanie tylko x bez obliczenia pytanej wielkości końcowej.',
        visuals=v3,
        tasks=l3_tasks,
        key_takeaway=r'Dla paraboli z ramionami w dół ($a < 0$) maksimum występuje w wierzchołku $x_w = -\frac{b}{2a}$. Pamiętaj: zawsze sprawdź $x_w \in D$ i wylicz optymalną wartość $P_{\max}$.'
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'description': 'Zadania optymalizacyjne z funkcją kwadratową: wyznaczanie wzoru, dziedzina geometryczna oraz wierzchołek paraboli.',
        'lessons': lessons
    }
