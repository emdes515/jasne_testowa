"""
topic_10_builder.py - Dział 1.10: Funkcja liniowa i jej własności (4 lekcje | Tier S+)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_10 import get_topic_10_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_10():
    topic_id = 'dzial-10'
    topic_title = 'Dział 1.10: Funkcja liniowa i jej własności'
    lessons = []

    # ----------------------------------------------------
    # Lekcja 10.1: Wzór kierunkowy y = ax + b, rola a i b (L1.10.1)
    # ----------------------------------------------------
    v1 = get_topic_10_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-10-1-1',
            source='Rozgrzewka • Wyraz wolny b na osi OY',
            question='Wykres funkcji liniowej $f(x) = -3x + 7$ przecina oś pionową $OY$ w punkcie',
            options_data=[
                ('A', '$(0, 7)$'),
                ('B', '$(7, 0)$'),
                ('C', '$(0, -3)$'),
                ('D', '$(-3, 7)$')
            ],
            correct_id='A',
            explanation='Wyraz wolny $b = 7$ to dokładnie rzędna punktu przecięcia wykresu z osią $OY$: $P = (0, b) = (0, 7)$.',
            cke_trap='Punkt na osi OY ma pierwszą współrzędną równą 0: $(0, 7)$, a nie $(7, 0)$!'
        ),
        make_sc_task(
            task_id='task-10-1-2',
            source='Matura Maj 2024 • Zad. 11',
            question='Funkcja liniowa $f(x) = (2m - 4)x + 3$ jest malejąca dla każdej liczby $m$ spełniającej warunek',
            options_data=[
                ('A', '$m < 2$'),
                ('B', '$m > 2$'),
                ('C', '$m < -2$'),
                ('D', '$m > -2$')
            ],
            correct_id='A',
            explanation='Funkcja liniowa $y = ax + b$ jest malejąca wtedy i tylko wtedy, gdy współczynnik kierunkowy jest ujemny: $a < 0$. Mamy $2m - 4 < 0 \\implies 2m < 4 \\implies m < 2$.',
            cke_trap='O monotoniczności decyduje wyłącznie współczynnik $a$ stojący przy $x$ (wyraz wolny $+3$ nie ma żadnego wpływu).'
        ),
        make_sc_task(
            task_id='task-10-1-3',
            source='Pułapka CKE • Odczyt znaków a i b z wykresu',
            question='Prosta przecina dodatnią część osi $OY$ i opada w dół od lewej do prawej. Wynika z tego, że współczynniki $a$ i $b$ spełniają warunki:',
            options_data=[
                ('A', '$a < 0$ oraz $b > 0$'),
                ('B', '$a > 0$ oraz $b > 0$'),
                ('C', '$a < 0$ oraz $b < 0$'),
                ('D', '$a > 0$ oraz $b < 0$')
            ],
            correct_id='A',
            explanation='Prosta opada w dół $\\implies a < 0$ (funkcja malejąca). Prosta przecina oś $OY$ powyżej zera $\\implies b > 0$.',
            cke_trap='Wykres opadający to $a < 0$, a punkt przecięcia nad osią to $b > 0$.'
        ),
        make_tf_task(
            task_id='task-10-1-4',
            source='Trening CKE • Funkcja liniowa stała',
            question='Oceń prawdziwość zdania: Jeśli współczynnik kierunkowy $a = 0$, to wykresem funkcji jest prosta równoległa do osi $OX$.',
            correct_tf='PRAWDA',
            explanation='Dla $a = 0$ funkcja przyjmuje postać $y = b$, czyli jest funkcją stałą, której wykresem jest pozioma linia równoległa do osi $OX$.',
            cke_trap='Dla a = 0 funkcja nie rośnie ani nie maleje — jest stała.'
        ),
        make_numeric_task(
            task_id='task-10-1-5',
            source='Utrwalenie • Wartość współczynnika b',
            question='Prosta $y = ax + b$ przechodzi przez punkt $P(0, -9)$. Podaj wartość wyrazu wolnego $b$.',
            correct_val=-9,
            explanation='Dla punktu $(0, -9)$ mamy $x = 0$, więc $y = a \\cdot 0 + b = b \\implies b = -9$.',
            cke_trap='Punkt o pierwszej współrzędnej równej 0 bezpośrednio zdradza wartość $b$.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-10-1',
        topic_id=topic_id,
        title='L1.10.1: Wzór kierunkowy y = ax + b, rola współczynnika a i wyrazu wolnego b',
        concept_essence='Wzór kierunkowy prostej $y = ax + b$ to jedno z najważniejszych narzędzi na maturze: 1) Współczynnik kierunkowy $a$ to bieg prostej (prędkościomierz): jeśli $a > 0$, prosta idzie w górę (rośnie); jeśli $a < 0$, prosta opada w dół (maleje); jeśli $a = 0$, leży poziomo (stała). Ponadto $a = \\operatorname{tg} \\alpha$, gdzie $\\alpha$ to kąt z dodatnią osią $OX$. 2) Wyraz wolny $b$ to kotwica na osi pionowej: prosta ZAWSZE przecina oś $OY$ dokładnie w punkcie $(0, b)$.',
        matura_context='Zadanie z interpretacji znaków $a$ i $b$ lub parametru $m$ występuje w 100% arkuszy CKE (zad. 11 za 1 pkt).',
        core_formulas=[
            {
                'title': 'Rola współczynnika kierunkowego a',
                'latex': 'a > 0 \\implies \\text{rosnąca}, \\quad a < 0 \\implies \\text{malejąca}, \\quad a = 0 \\implies \\text{stała}',
                'description': 'Znak liczby stojącej przy x określa monotoniczność.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': 'y = -2x + 5 \\implies a = -2 < 0 \\implies \\text{funkcja maleje}',
                'mnemonic': 'Dodatni iks idzie w górę, ujemny iks leci w dół.',
                'matura_tip': 'Gdy a ma parametr, np. (2m - 4), rozwiązujesz nierówność 2m - 4 < 0.'
            },
            {
                'title': 'Wyraz wolny b na osi OY',
                'latex': 'P = (0, b) = \\text{punkt przecięcia z osią } OY',
                'description': 'Wartość b to wysokość przecięcia prostej z osią pionową.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': 'y = 4x - 3 \\implies \\text{przecięcie w punkcie } (0, -3)',
                'mnemonic': 'b to baza na osi OY.',
                'matura_tip': 'W punkcie na osi OY pierwsza współrzędna x to zawsze 0.'
            }
        ],
        worked_example={
            'problem': 'Dla jakich wartości parametru $k$ funkcja $f(x) = (3 - k)x + 2k - 1$ jest rosnąca i przecina oś $OY$ powyżej punktu $(0, 5)$?',
            'steps': [
                {'num': 1, 'label': 'Warunek funkcji rosnącej', 'text': 'Współczynnik przy $x$ musi być dodatni: $a > 0 \\implies 3 - k > 0 \\implies k < 3$.'},
                {'num': 2, 'label': 'Warunek przecięcia osi OY powyżej 5', 'text': 'Wyraz wolny musi być większy od 5: $b > 5 \\implies 2k - 1 > 5 \\implies 2k > 6 \\implies k > 3$.'},
                {'num': 3, 'label': 'Część wspólna warunków i wniosek CKE', 'text': 'Mamy $k < 3$ oraz $k > 3$. Warunki te są sprzeczne, nie istnieje takie $k$ (zbiór pusty).'}
            ],
            'result': 'k \\in \\emptyset'
        },
        exam_trap='Typowy błąd: Uwzględnianie wyrazu wolnego $b$ przy określaniu monotoniczności.\n\nPoprawnie: O monotoniczności decyduje TYLKO współczynnik $a$. Wyraz $b$ przesuwa wykres w górę lub w dół, nie zmieniając jego nachylenia!',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 10.2: Wzór prostej przez 2 punkty i miejsce zerowe (L1.10.2)
    # ----------------------------------------------------
    v2 = get_topic_10_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-10-2-1',
            source='Rozgrzewka • Miejsce zerowe prostej',
            question='Miejscem zerowym funkcji liniowej $f(x) = 2x - 6$ jest liczba',
            options_data=[
                ('A', '$3$'),
                ('B', '$-3$'),
                ('C', '$-6$'),
                ('D', '$6$')
            ],
            correct_id='A',
            explanation='Przyrównujemy funkcję do zera: $2x - 6 = 0 \\implies 2x = 6 \\implies x = 3$.',
            cke_trap='Miejsce zerowe to $x = 3$, a punkt przecięcia z osią $OY$ to $(0, -6)$.'
        ),
        make_sc_task(
            task_id='task-10-2-2',
            source='Matura Maj 2024 • Zad. 12',
            question='Współczynnik kierunkowy $a$ prostej przechodzącej przez punkty $A(1, 3)$ oraz $B(4, 9)$ jest równy',
            options_data=[
                ('A', '$2$'),
                ('B', '$\\frac{1}{2}$'),
                ('C', '$3$'),
                ('D', '$-2$')
            ],
            correct_id='A',
            explanation='Wzór na współczynnik kierunkowy: $a = \\frac{y_B - y_A}{x_B - x_A} = \\frac{9 - 3}{4 - 1} = \\frac{6}{3} = 2$.',
            cke_trap='Różnicę igreków stawiamy W LICZNIKU, a różnicę iksów w mianowniku: $\\frac{\\Delta y}{\\Delta x}$.'
        ),
        make_sc_task(
            task_id='task-10-2-3',
            source='Pułapka CKE • Odwrócenie kolejności we wzorze na a',
            question='Prosta przechodzi przez punkty $K(-2, 5)$ oraz $L(2, -3)$. Jej współczynnik kierunkowy wynosi',
            options_data=[
                ('A', '$-2$'),
                ('B', '$2$'),
                ('C', '$-\\frac{1}{2}$'),
                ('D', '$\\frac{1}{2}$')
            ],
            correct_id='A',
            explanation='$a = \\frac{-3 - 5}{2 - (-2)} = \\frac{-8}{2 + 2} = \\frac{-8}{4} = -2$.',
            cke_trap='Uważaj na podwójny minus w mianowniku: $2 - (-2) = 4$, a nie 0.'
        ),
        make_tf_task(
            task_id='task-10-2-4',
            source='Trening CKE • Wzór miejsca zerowego',
            question='Oceń prawdziwość zdania: Miejsce zerowe funkcji $y = ax + b$ dla $a \\ne 0$ wyraża się wzorem $x_0 = -\\frac{b}{a}$.',
            correct_tf='PRAWDA',
            explanation='$ax + b = 0 \\implies ax = -b \\implies x = -\\frac{b}{a}$. To oficjalny wzór z tablic CKE.',
            cke_trap='Pamiętaj o minusie przed ułamkiem: $x_0 = -b/a$.'
        ),
        make_numeric_task(
            task_id='task-10-2-5',
            source='Utrwalenie • Wyraz wolny b po wyznaczeniu a',
            question='Prosta o współczynniku kierunkowym $a = 3$ przechodzi przez punkt $P(2, 11)$. Oblicz wartość wyrazu wolnego $b$.',
            correct_val=5,
            explanation='Wstawiamy współrzędne do wzoru $y = ax + b$: $11 = 3 \\cdot 2 + b \\implies 11 = 6 + b \\implies b = 5$.',
            cke_trap='Podstawiasz $x = 2$ oraz $y = 11$, a nie odwrotnie!'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-10-2',
        topic_id=topic_id,
        title='L1.10.2: Wyznaczanie wzoru prostej przez dwa punkty i miejsce zerowe',
        concept_essence='Mając dwa punkty $A(x_A, y_A)$ oraz $B(x_B, y_B)$, wyznaczasz wzór prostej $y = ax + b$ w dwóch prostych krokach: 1) KROK 1: Obliczasz współczynnik kierunkowy jako iloraz przyrostów: $a = \\frac{y_B - y_A}{x_B - x_A}$ (pamiętaj: igreki na górze, iksy na dole!). 2) KROK 2: Wstawiasz obliczone $a$ oraz współrzędne jednego z punktów do wzoru $y = ax + b$ i wyliczasz $b$. 3) Miejsce zerowe to $x_0 = -\\frac{b}{a}$ (punkt, gdzie linia przecina oś poziomą).',
        matura_context='Podstawowa umiejętność w zadaniach za 1 i 2 punkty z geometrii analitycznej i algebry.',
        core_formulas=[
            {
                'title': 'Współczynnik kierunkowy prostej przez dwa punkty',
                'latex': 'a = \\frac{y_B - y_A}{x_B - x_A} \\quad (x_A \\neq x_B)',
                'description': 'Iloraz różnicy współrzędnych y do różnicy współrzędnych x.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': 'A(1, 2), B(3, 8) \\implies a = \\frac{8 - 2}{3 - 1} = \\frac{6}{2} = 3',
                'mnemonic': 'Igreki na dachu, iksy w piwnicy.',
                'matura_tip': 'Zachowaj tę samą kolejność odejmowania w liczniku i mianowniku.'
            },
            {
                'title': 'Miejsce zerowe funkcji liniowej',
                'latex': 'x_0 = -\\frac{b}{a} \\quad (a \\neq 0)',
                'description': 'Punkt na osi OX, gdzie prosta przecina oś.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': 'y = 3x - 12 \\implies x_0 = -\\frac{-12}{3} = 4',
                'mnemonic': 'Przyrównaj igrek do zera i wyznacz iksa.',
                'matura_tip': 'Dwa minusy dają plus.'
            }
        ],
        worked_example={
            'problem': 'Napisz równanie prostej przechodzącej przez punkty $A(2, -1)$ oraz $B(5, 8)$ i wyznacz jej miejsce zerowe.',
            'steps': [
                {'num': 1, 'label': 'Obliczenie współczynnika a', 'text': '$a = \\frac{8 - (-1)}{5 - 2} = \\frac{8 + 1}{3} = \\frac{9}{3} = 3$.'},
                {'num': 2, 'label': 'Obliczenie wyrazu wolnego b', 'text': 'Wstawiamy punkt $B(5, 8)$: $8 = 3 \\cdot 5 + b \\implies 8 = 15 + b \\implies b = -7$. Równanie to $y = 3x - 7$.'},
                {'num': 3, 'label': 'Wyznaczenie miejsca zerowego i wynik CKE', 'text': '$3x - 7 = 0 \\implies 3x = 7 \\implies x_0 = \\frac{7}{3} = 2\\frac{1}{3}$.'}
            ],
            'result': 'y = 3x - 7, \\quad x_0 = \\frac{7}{3}'
        },
        exam_trap='Typowy błąd: Zamiana licznika z mianownikiem we wzorze na $a$: pisanie $\\frac{x_B - x_A}{y_B - y_A}$.\n\nPoprawnie: Zawsze powtarzaj sobie: IGREKI NA GÓRZE, IKSY NA DOLE ($a = \\frac{\\Delta y}{\\Delta x}$).',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 10.3: Warunek równoległości i prostopadłości (L1.10.3)
    # ----------------------------------------------------
    v3 = get_topic_10_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-10-3-1',
            source='Rozgrzewka • Proste równoległe',
            question='Proste o równaniach $y = 3x - 4$ oraz $y = (2m + 1)x + 5$ są równoległe, gdy liczba $m$ jest równa',
            options_data=[
                ('A', '$1$'),
                ('B', '$2$'),
                ('C', '$-1$'),
                ('D', '$3$')
            ],
            correct_id='A',
            explanation='Warunek równoległości prostych: współczynniki kierunkowe muszą być równe ($a_1 = a_2$). Zatem $2m + 1 = 3 \\implies 2m = 2 \\implies m = 1$.',
            cke_trap='Proste równoległe mają IDENTYCZNY współczynnik kierunkowy $a$.'
        ),
        make_sc_task(
            task_id='task-10-3-2',
            source='Matura Maj 2023 • Zad. 11',
            question='Prosta $k$ ma równanie $y = -\\frac{2}{3}x + 4$. Prosta $l$ prostopadła do prostej $k$ ma współczynnik kierunkowy równy',
            options_data=[
                ('A', '$\\frac{3}{2}$'),
                ('B', '$-\\frac{3}{2}$'),
                ('C', '$\\frac{2}{3}$'),
                ('D', '$-\\frac{2}{3}$')
            ],
            correct_id='A',
            explanation='Warunek prostopadłości prostych: $a_1 \\cdot a_2 = -1$. Współczynnik musi być odwrotny i przeciwny: dla $-\\frac{2}{3}$ liczbą odwrotną i przeciwną jest $+\\frac{3}{2}$.',
            cke_trap='Pamiętaj o OBU zmianach: odwracasz ułamek do góry nogami i zmieniasz znak na przeciwny!'
        ),
        make_sc_task(
            task_id='task-10-3-3',
            source='Pułapka CKE • Prosta prostopadła przechodząca przez punkt',
            question='Równanie prostej prostopadłej do prostej $y = 2x - 5$ i przechodzącej przez punkt $P(4, 1)$ to',
            options_data=[
                ('A', '$y = -\\frac{1}{2}x + 3$'),
                ('B', '$y = -\\frac{1}{2}x + 1$'),
                ('C', '$y = 2x - 7$'),
                ('D', '$y = -2x + 9$')
            ],
            correct_id='A',
            explanation='1) $a_2 = -\\frac{1}{2}$.\n2) Wstawiamy punkt $P(4, 1)$: $1 = -\\frac{1}{2} \\cdot 4 + b \\implies 1 = -2 + b \\implies b = 3$.\nProsta ma równanie $y = -\\frac{1}{2}x + 3$.',
            cke_trap='Nie zapomnij wyliczyć nowego wyrazu wolnego $b$ dla zadanego punktu!'
        ),
        make_tf_task(
            task_id='task-10-3-4',
            source='Trening CKE • Iloczyn współczynników',
            question='Oceń prawdziwość zdania: Proste $y = 4x + 1$ oraz $y = -0{,}25x - 7$ są wzajemnie prostopadłe.',
            correct_tf='PRAWDA',
            explanation='Iloczyn współczynników kierunkowych: $4 \\cdot (-0{,}25) = 4 \\cdot (-\\frac{1}{4}) = -1$. Warunek prostopadłości jest spełniony.',
            cke_trap='Liczba $-0{,}25$ to w ułamku zwykłym $-\\frac{1}{4}$.'
        ),
        make_numeric_task(
            task_id='task-10-3-5',
            source='Utrwalenie • Parametr w prostopadłości',
            question='Dla jakiej wartości $a$ proste $y = ax + 2$ oraz $y = 5x - 3$ są prostopadłe? Wpisz wartość w postaci dziesiętnej (np. -0.2).',
            correct_val=-0.2,
            explanation='$a \\cdot 5 = -1 \\implies a = -\\frac{1}{5} = -0{,}2$.',
            cke_trap='Liczba odwrotna i przeciwna do 5 to $-\\frac{1}{5} = -0{,}2$.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-10-3',
        topic_id=topic_id,
        title='L1.10.3: Warunek równoległości i prostopadłości prostych',
        concept_essence='Wzajemne położenie dwóch prostych na płaszczyźnie zależy wyłącznie od ich współczynników kierunkowych $a_1$ oraz $a_2$: 1) Proste równoległe — mają ten sam kąt nachylenia, więc ich współczynniki są IDENTYCZNE: $a_1 = a_2$. 2) Proste prostopadłe — przecinają się pod kątem $90^\\circ$, a ich iloczyn wynosi minus jeden: $a_1 \\cdot a_2 = -1$. Mnemotechnika: współczynnik prostej prostopadłej to ułamek ODWROTNY I PRZECIWNY (odwracasz do góry nogami i zmieniasz znak).',
        matura_context='Jeden z najczęściej badanych pewniaków maturalnych — zadanie za 1 pkt lub element zadania z geometrii analitycznej za 2–3 pkt.',
        core_formulas=[
            {
                'title': 'Warunek równoległości prostych',
                'latex': 'k \\parallel l \\iff a_1 = a_2',
                'description': 'Współczynniki kierunkowe są identyczne.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': 'y = 4x + 1 \\parallel y = 4x - 9',
                'mnemonic': 'Równoległe to równe.',
                'matura_tip': 'Wyrazy wolne b mogą być dowolne (b₁ != b₂ dla prostych różnych).'
            },
            {
                'title': 'Warunek prostopadłości prostych',
                'latex': 'k \\perp l \\iff a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}',
                'description': 'Współczynnik jest odwrotny i o przeciwnym znaku.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': 'a_1 = \\frac{2}{5} \\implies a_2 = -\\frac{5}{2} = -2{,}5',
                'mnemonic': 'Do góry nogami i zmień znak.',
                'matura_tip': 'Dla liczby ujemnej przeciwna jest dodatnia: -3 -> +1/3.'
            }
        ],
        worked_example={
            'problem': 'Wyznacz równanie prostej prostopadłej do prostej $k: y = -2x + 7$ i przechodzącej przez punkt $A(6, 1)$.',
            'steps': [
                {'num': 1, 'label': 'Współczynnik prostej prostopadłej', 'text': 'Współczynnik prostej $k$ to $a_1 = -2$. Odwrotny i przeciwny: $a_2 = -\\frac{1}{-2} = \\frac{1}{2}$.'},
                {'num': 2, 'label': 'Wyznaczenie wyrazu wolnego b', 'text': 'Wstawiamy punkt $A(6, 1)$ do równania $y = \\frac{1}{2}x + b$: $1 = \\frac{1}{2} \\cdot 6 + b \\implies 1 = 3 + b \\implies b = -2$.'},
                {'num': 3, 'label': 'Zapisanie równania prostej CKE', 'text': 'Szukana prosta ma równanie $y = \\frac{1}{2}x - 2$.'}
            ],
            'result': 'y = \\frac{1}{2}x - 2'
        },
        exam_trap='Typowy błąd: Zmiana tylko znaku lub tylko odwrócenie ułamka, np. dla $a = 3$ przyjęcie $a_2 = -3$ lub $a_2 = \\frac{1}{3}$.\n\nPoprawnie: Musisz wykonać OBIE operacje naraz: dla $3$ poprawny współczynnik to $-\\frac{1}{3}$.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    # ----------------------------------------------------
    # Lekcja 10.4: Zastosowania praktyczne i zadania tekstowe (L1.10.4)
    # ----------------------------------------------------
    v4 = get_topic_10_visuals(3)
    l4_tasks = [
        make_sc_task(
            task_id='task-10-4-1',
            source='Rozgrzewka • Model kosztu liniowego',
            question='Opłata za przejazd taksówką wynosi 8 zł opłaty początkowej oraz 3 zł za każdy przejechany kilometr. Wzór opisujący całkowity koszt $K(x)$ przejazdu $x$ kilometrów to',
            options_data=[
                ('A', '$K(x) = 3x + 8$'),
                ('B', '$K(x) = 8x + 3$'),
                ('C', '$K(x) = 11x$'),
                ('D', '$K(x) = \\frac{x}{3} + 8$')
            ],
            correct_id='A',
            explanation='Koszt stały to wyraz wolny $b = 8$. Stawka jednostkowa (za 1 km) to współczynnik kierunkowy $a = 3$. Zatem $K(x) = 3x + 8$.',
            cke_trap='Liczba stojąca przy $x$ to stawka zmienna za jednostkę (kilometr, godzinę), a wyraz wolny to opłata stała.'
        ),
        make_sc_task(
            task_id='task-10-4-2',
            source='Matura CKE • Zadanie z kontekstem realistycznym',
            question='Woda wypływa ze zbiornika w stałym tempie 5 litrów na minutę. Na początku w zbiorniku było 120 litrów wody. Ilość wody $V(t)$ w litrach po upływie $t$ minut opisuje funkcja',
            options_data=[
                ('A', '$V(t) = -5t + 120$'),
                ('B', '$V(t) = 5t + 120$'),
                ('C', '$V(t) = 120t - 5$'),
                ('D', '$V(t) = -120t + 5$')
            ],
            correct_id='A',
            explanation='Woda ubywa, więc współczynnik jest ujemny: $a = -5$. Stan początkowy to $b = 120$. Zatem $V(t) = -5t + 120$.',
            cke_trap='Ubytek (opróżnianie) zawsze oznacza współczynnik kierunkowy ze znakiem MINUS.'
        ),
        make_sc_task(
            task_id='task-10-4-3',
            source='Pułapka CKE • Czas do opróżnienia zbiornika',
            question='Zbiornik z wodą o równaniu $V(t) = -5t + 120$ zostanie całkowicie opróżniony po upływie',
            options_data=[
                ('A', '$24$ minut'),
                ('B', '$20$ minut'),
                ('C', '$120$ minut'),
                ('D', '$600$ minut')
            ],
            correct_id='A',
            explanation='Całkowite opróżnienie oznacza, że objętość wynosi $0$: $-5t + 120 = 0 \\implies 5t = 120 \\implies t = 24$ minuty (to po prostu miejsce zerowe funkcji!).',
            cke_trap='Pytanie o opróżnienie to pytanie o miejsce zerowe funkcji.'
        ),
        make_tf_task(
            task_id='task-10-4-4',
            source='Trening CKE • Dziedzina w zadaniu praktycznym',
            question='Oceń prawdziwość zdania: W zadaniach tekstowych z funkcją liniową dziedziną są zazwyczaj tylko liczby nieujemne ($t \\ge 0$ lub $x \\ge 0$).',
            correct_tf='PRAWDA',
            explanation='Wielkości fizyczne takie jak czas, droga, masa czy liczba sztuk nie mogą być ujemne w realnym świecie, co ogranicza dziedzinę do liczb nieujemnych.',
            cke_trap='Zawsze uwzględniaj sens fizyczny zadania (np. czas t nie może biec wstecz).'
        ),
        make_numeric_task(
            task_id='task-10-4-5',
            source='Utrwalenie • Obliczenie wartości modelu',
            question='Abonament telefoniczny kosztuje 25 zł miesięcznie, a każdy dodatkowy gigabajt internetu kosztuje 4 zł. Ile zapłaci klient za miesiąc, w którym zużył 10 dodatkowych gigabajtów?',
            correct_val=65,
            explanation='Wzór: $K(x) = 4x + 25$. Dla $x = 10$: $K(10) = 4 \\cdot 10 + 25 = 40 + 25 = 65$ zł.',
            cke_trap='Koszt to $4 \\cdot 10 + 25 = 65$ zł.'
        )
    ]
    l4 = make_lesson(
        lesson_id='lesson-10-4',
        topic_id=topic_id,
        title='L1.10.4: Zastosowania praktyczne i zadania tekstowe z funkcją liniową',
        concept_essence='Funkcja liniowa $y = ax + b$ to podstawowy model ekonomii i fizyki: 1) Wyraz wolny $b$ to WARTOŚĆ STARTOWA (stan początkowy w chwili $t = 0$, opłata stała, abonament, koszt wstępny). 2) Współczynnik kierunkowy $a$ to TEMPO ZMIANY (stawka za kilometr, prędkość, ubytek wody na minutę). Jeśli coś przyrasta — $a > 0$; jeśli ubywa — $a < 0$. 3) Pytanie o wyczerpanie zapasów lub zatrzymanie to po prostu obliczenie MIEJSCA ZEROWEGO ($y = 0$).',
        matura_context='Zadania tekstowe i modelowanie matematyczne za 1–2 punkty w nowej formule matury 2023–2026.',
        core_formulas=[
            {
                'title': 'Liniowy model kosztu / wielkości',
                'latex': 'y = ax + b \\iff \\text{Wartość} = (\\text{tempo}) \\cdot x + (\\text{wartość startowa})',
                'description': 'Podstawowy model opisujący procesy o stałej dynamice zmian.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'K(x) = 3x + 10 \\implies \\text{opłata startowa 10 zł, 3 zł za sztukę}',
                'mnemonic': 'b to start, a to tempo.',
                'matura_tip': 'Gdy wielkość maleje, postaw minus przed współczynnikiem a.'
            },
            {
                'title': 'Czas do wyczerpania (miejsce zerowe)',
                'latex': 'y = 0 \\implies t = -\\frac{b}{a}',
                'description': 'Moment, w którym stan zasobu spada do zera.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'V(t) = -4t + 100 = 0 \\implies t = 25',
                'mnemonic': 'Koniec zapasów to zrównanie funkcji z zerem.',
                'matura_tip': 'Wynik czasu musi być dodatni.'
            }
        ],
        worked_example={
            'problem': 'Firma wynajmuje sprzęt budowlany. Kaucja zwrotna wynosi 200 zł, a koszt wynajmu to 45 zł za każdą rozpoczętą dobę. Zapisz wzór na całkowity koszt $K(d)$ po $d$ dobach i oblicz koszt wynajmu na 6 dób.',
            'steps': [
                {'num': 1, 'label': 'Zbudowanie modelu liniowego', 'text': 'Stawka dobowa to $a = 45$, opłata stała to $b = 200$. Wzór: $K(d) = 45d + 200$.'},
                {'num': 2, 'label': 'Obliczenie wartości dla d = 6', 'text': '$K(6) = 45 \\cdot 6 + 200 = 270 + 200 = 470$ zł.'},
                {'num': 3, 'label': 'Zapisanie odpowiedzi CKE', 'text': 'Wzór funkcji to $K(d) = 45d + 200$, a koszt na 6 dób wynosi 470 zł.'}
            ],
            'result': 'K(d) = 45d + 200, \\quad K(6) = 470 \\text{ zł}'
        },
        exam_trap='Typowy błąd: Zamiana stawek — przypisanie niewiadomej do opłaty stałej (np. $K(d) = 200d + 45$).\n\nPoprawnie: Niewiadoma $d$ stoi ZAWSZE przy stawce mnożonej przez liczbę jednostek (czyli przy 45 zł za dobę).',
        visuals=v4,
        tasks=l4_tasks
    )
    lessons.append(l4)

    return {
        'id': topic_id,
        'title': topic_title,
        'tier': 'Tier S+',
        'badge': 'NA 30% • PEWNIAK MATURALNY',
        'estimated_time_formatted': '4 lekcje (~20 min)',
        'description': 'Wzór kierunkowy y = ax + b, wyznaczanie prostej przez dwa punkty, warunek równoległości i prostopadłości oraz zastosowania praktyczne funkcji liniowej.',
        'lessons': lessons
    }
