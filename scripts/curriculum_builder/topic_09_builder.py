"""
topic_09_builder.py - Dział 1.9: Odczytywanie informacji z wykresu funkcji (4 lekcje | Tier S+)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_09 import get_topic_09_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_09():
    topic_id = 'dzial-9'
    topic_title = 'Odczytywanie informacji z wykresu funkcji'
    topic_number = 9
    lessons = []

    # ----------------------------------------------------
    # Lekcja 9.1: Dziedzina i zbiór wartości z wykresu (L1.9.1)
    # ----------------------------------------------------
    v1 = get_topic_09_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-9-1-1',
            source='Rozgrzewka • Osie OX i OY',
            question='Wskaż poprawne przyporządkowanie pojęć do osi układu współrzędnych:',
            options_data=[
                ('A', 'Dziedzina to oś pozioma $OX$, a zbiór wartości to oś pionowa $OY$'),
                ('B', 'Dziedzina to oś pionowa $OY$, a zbiór wartości to oś pozioma $OX$'),
                ('C', 'Zarówno dziedzinę jak i zbiór wartości odczytujemy z osi $OX$'),
                ('D', 'Dziedzina to punkty przecięcia z osią $OY$')
            ],
            correct_id='A',
            explanation='Dziedzina to zbiór wszystkich argumentów $x$ (oś pozioma $OX$, rzut lewo-prawo). Zbiór wartości to zbiór wartości $y$ (oś pionowa $OY$, rzut dół-góra).',
            cke_trap='Nigdy nie myl osi: $D_f \\subset OX$ (poziom), a $ZW_f \\subset OY$ (pion).'
        ),
        make_sc_task(
            task_id='task-9-1-2',
            source='Matura Maj 2024 • Zad. 9',
            question='Na rysunku przedstawiono wykres funkcji $f$ określonej w przedziale $[-4, 5]$. Lewy koniec wykresu to punkt $(-4, -1)$ zamalowany, a prawy to punkt $(5, 3)$ zamalowany. Najniższy punkt wykresu to $(-1, -2)$, a najwyższy to $(3, 4)$. Zbiorem wartości funkcji $f$ jest przedział',
            options_data=[
                ('A', '$[-2, 4]$'),
                ('B', '$[-4, 5]$'),
                ('C', '$[-1, 3]$'),
                ('D', '$(-2, 4)$')
            ],
            correct_id='A',
            explanation='Zbiór wartości to rzut wykresu na oś pionową $OY$: od najniższego punktu ($y = -2$) do najwyższego punktu ($y = 4$). Oba punkty są osiągane, więc $ZW = [-2, 4]$.',
            cke_trap='Przedział $[-4, 5]$ to dziedzina (oś OX)! Zbiór wartości odczytujemy z osi pionowej OY: $[-2, 4]$.',
            diagram=v1.get('tab0')
        ),
        make_sc_task(
            task_id='task-9-1-3',
            source='Pułapka CKE • Kółko otwarte na krańcu wykresu',
            question='Wykres funkcji $g$ zaczyna się w punkcie $(-3, 1)$ kółkiem zamalowanym, a kończy w punkcie $(4, 5)$ kółkiem otwartym (niezamalowanym). Dziedziną funkcji $g$ jest',
            options_data=[
                ('A', '$[-3, 4)$'),
                ('B', '$[-3, 4]$'),
                ('C', '$(-3, 4)$'),
                ('D', '$[1, 5)$')
            ],
            correct_id='A',
            explanation='Rzutujemy na oś poziomą $OX$: punkt $-3$ ma kółko zamalowane (nawias domknięty $[$), a punkt $4$ ma kółko otwarte (nawias okrągły $)$). Zatem $D = [-3, 4)$.',
            cke_trap='Kółko otwarte ZAWSZE wymusza nawias okrągły przy danym krańcu.'
        ),
        make_tf_task(
            task_id='task-9-1-4',
            source='Trening CKE • Osiąganie wartości skrajnych',
            question='Oceń prawdziwość zdania: Jeśli najwyższy punkt wykresu funkcji to $(2, 7)$, to największą wartością tej funkcji jest liczba 7.',
            correct_tf='PRAWDA',
            explanation='Wartość funkcji to współrzędna $y$. Najwyższy punkt ma współrzędną $y = 7$, więc maksymalna wartość to 7 (dla argumentu $x = 2$).',
            cke_trap='Wartość to zawsze $y$ (liczba 7), argument to $x$ (liczba 2).'
        ),
        make_numeric_task(
            task_id='task-9-1-5',
            source='Utrwalenie • Szerokość dziedziny',
            question='Wykres funkcji jest określony w przedziale $x \\in [-5, 6]$. Oblicz długość tego przedziału.',
            correct_val=11,
            explanation='Długość przedziału $[-5, 6]$ to różnica prawego i lewego końca: $6 - (-5) = 6 + 5 = 11$.',
            cke_trap='Pamiętaj: odejmowanie liczby ujemnej to dodawanie ($6 - (-5) = 11$, nie 1).'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-9-1',
        topic_id=topic_id,
        title='Dziedzina i zbiór wartości z wykresu funkcji (oś OX vs OY)',
        concept_essence='Odczytywanie dziedziny i zbioru wartości z wykresu to rzutowanie cienia na osie: 1) Dziedzina ($D_f$) — patrzysz na wykres OD LEWEJ DO PRAWEJ i rzutujesz go na oś poziomą $OX$. Pytasz: od jakiego do jakiego iksa istnieje funkcja? 2) Zbiór wartości ($ZW_f$) — patrzysz na wykres OD DOŁU DO GÓRY i rzutujesz go na oś pionową $OY$. Pytasz: od najniższego do najwyższego punktu! 3) Kółka: kółko zamalowane daje nawias ostry $\\langle \\dots \\rangle$ lub $[ \\dots ]$, kółko puste daje nawias okrągły $( \\dots )$.',
        matura_context='Zadanie 9 lub 10 na każdej maturze podstawowej CKE za 1 punkt (100% powtarzalności).',
        core_formulas=[
            {
                'title': 'Dziedzina z wykresu (oś pozioma)',
                'latex': 'D_f = [x_{\\min}, x_{\\max}] \\subset OX',
                'description': 'Rzut poziomy wykresu od skrajnego lewego do skrajnego prawego punktu.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'Wykres od x = -3 do x = 5 \\implies D = [-3, 5]',
                'mnemonic': 'Iksy to lewo-prawo (szerokość).',
                'matura_tip': 'Sprawdź, czy na końcach nie ma pustych kółek.'
            },
            {
                'title': 'Zbiór wartości z wykresu (oś pionowa)',
                'latex': 'ZW_f = [y_{\\min}, y_{\\max}] \\subset OY',
                'description': 'Rzut pionowy wykresu od najniższego do najwyższego punktu.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'Najniżej y = -2, najwyżej y = 4 \\implies ZW = [-2, 4]',
                'mnemonic': 'Igreki to dół-góra (wysokość).',
                'matura_tip': 'Nie sugeruj się końcami wykresu, patrz na garby i dołki!'
            }
        ],
        worked_example={
            'problem': 'Z wykresu funkcji odczytaj dziedzinę $D$ oraz zbiór wartości $ZW$. Lewy koniec wykresu to $(-3, 1)$ zamalowany, prawy to $(6, 2)$ pusty, najniższy punkt to $(1, -2)$, najwyższy to $(4, 4)$.',
            'steps': [
                {'num': 1, 'label': 'Rzut na oś poziomą OX (Dziedzina)', 'text': 'Skrajny lewy $x = -3$ (zamalowany), skrajny prawy $x = 6$ (pusty). Dziedzina: $D = [-3, 6)$.'},
                {'num': 2, 'label': 'Rzut na oś pionową OY (Zbiór wartości)', 'text': 'Najniższy punkt ma $y = -2$ (osiągany), najwyższy ma $y = 4$ (osiągany). Zbiór wartości: $ZW = [-2, 4]$.'},
                {'num': 3, 'label': 'Zapisanie odpowiedzi CKE', 'text': '$D = [-3, 6)$ oraz $ZW = [-2, 4]$.'}
            ],
            'result': 'D = [-3, 6), \\quad ZW = [-2, 4]'
        },
        exam_trap='Typowy błąd: Zamiana osi — podanie przedziału z osi $OX$ jako zbioru wartości.\n\nPoprawnie: Dziedzina to ZAWSZE iksy (poziom), a wartości to ZAWSZE igreki (pion). Zapisz sobie na marginesie: D = OX, ZW = OY.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 9.2: Miejsca zerowe i odczyt wartości (L1.9.2)
    # ----------------------------------------------------
    v2 = get_topic_09_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-9-2-1',
            source='Rozgrzewka • Czym jest miejsce zerowe?',
            question='Miejscem zerowym funkcji $f$ nazywamy',
            options_data=[
                ('A', 'Taki argument $x$, dla którego wartość funkcji wynosi $0$ ($f(x) = 0$)'),
                ('B', 'Punkt przecięcia wykresu z osią pionową $OY$'),
                ('C', 'Wartość funkcji dla argumentu $x = 0$ ($f(0)$)'),
                ('D', 'Najmniejszą wartość funkcji')
            ],
            correct_id='A',
            explanation='Miejsce zerowe to ZAWSZE argument $x$, w którym wykres przecina lub dotyka osi poziomej $OX$ (gdzie $y = 0$).',
            cke_trap='Nie myl miejsca zerowego (przecięcie z osią OX) z punktem przecięcia z osią pionową OY (gdzie $x = 0$).'
        ),
        make_sc_task(
            task_id='task-9-2-2',
            source='Matura Maj 2024 • Zad. 10',
            question='Wykres funkcji $f$ przecina oś $OX$ w punktach $(-2, 0)$ oraz $(3, 0)$, a oś $OY$ w punkcie $(0, -6)$. Zbiorem wszystkich miejsc zerowych funkcji $f$ jest',
            options_data=[
                ('A', '$\\{-2, 3\\}$'),
                ('B', '$\\{-6\\}$'),
                ('C', '$\\{-2, 0, 3\\}$'),
                ('D', '$(-2, 3)$')
            ],
            correct_id='A',
            explanation='Miejsca zerowe to współrzędne $x$ punktów leżących na osi $OX$: $x = -2$ oraz $x = 3$. Punkt $(0, -6)$ to punkt przecięcia z osią $OY$, a liczba $-6$ to wartość $f(0)$.',
            cke_trap='Liczba $-6$ to $f(0)$, nie jest miejscem zerowym!'
        ),
        make_sc_task(
            task_id='task-9-2-3',
            source='Pułapka CKE • Wartość f(a) vs rozwiązanie f(x) = a',
            question='Z wykresu funkcji odczytano punkt $P(2, -3)$. Wynika z tego, że',
            options_data=[
                ('A', '$f(2) = -3$'),
                ('B', '$f(-3) = 2$'),
                ('C', 'Miejscem zerowym jest $2$'),
                ('D', 'Miejscem zerowym jest $-3$')
            ],
            correct_id='A',
            explanation='Punkt $P(x, y)$ oznacza, że dla argumentu $x = 2$ wartość wynosi $y = -3$, czyli $f(2) = -3$.',
            cke_trap='Kolejność w punkcie to ZAWSZE $(x, y)$, a więc $f(\\text{pierwsza}) = \\text{druga}$.'
        ),
        make_tf_task(
            task_id='task-9-2-4',
            source='Trening CKE • Liczba miejsc zerowych',
            question='Oceń prawdziwość zdania: Funkcja może posiadać więcej niż jedno miejsce zerowe, ale co najwyżej jeden punkt przecięcia z osią $OY$.',
            correct_tf='PRAWDA',
            explanation='Z definicji funkcji każdemu argumentowi odpowiada dokładnie jedna wartość, więc dla $x = 0$ może istnieć co najwyżej jeden punkt na osi $OY$. Na osi $OX$ wykres może przecinać oś dowolną liczbę razy.',
            cke_trap='Wykres przecinający oś OY w dwóch miejscach w ogóle nie jest funkcją!'
        ),
        make_numeric_task(
            task_id='task-9-2-5',
            source='Utrwalenie • Suma miejsc zerowych',
            question='Wykres funkcji przecina oś $OX$ w punktach o współrzędnych $x_1 = -4$, $x_2 = 1$, $x_3 = 5$. Oblicz sumę wszystkich miejsc zerowych tej funkcji.',
            correct_val=2,
            explanation='Suma miejsc zerowych wynosi: $(-4) + 1 + 5 = 2$.',
            cke_trap='Dodawaj same iksy: $(-4) + 1 + 5 = 2$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-9-2',
        topic_id=topic_id,
        title='Miejsca zerowe oraz odczyt wartości funkcji f(x0) = y0',
        concept_essence='Wykres funkcji to mapa relacji między argumentem $x$ a wartością $y$: 1) Miejsce zerowe — to argument $x$ na osi poziomej $OX$, dla którego wartość funkcji wynosi zero ($f(x) = 0$). Miejscem zerowym jest zawsze sama liczba (argument $x$, np. $x = 3$), a nie para współrzędnych. 2) Wartość funkcji dla danego argumentu $f(x_0)$ — znajdujesz $x_0$ na osi poziomej, przemieszczasz się pionowo do wykresu i odczytujesz wartość $y$ na osi pionowej. 3) Przecięcie z osią $OY$ — to wartość funkcji dla zera, czyli punkt $(0, f(0))$.',
        matura_context='Podstawowe pytanie sprawdzające umiejętność czytania wykresów za 1 pkt.',
        core_formulas=[
            {
                'title': 'Definicja miejsca zerowego',
                'latex': 'f(x_0) = 0 \\implies (x_0, 0) \\in \\text{wykres } f',
                'description': 'Punkt leżący dokładnie na osi poziomej OX.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'Punkt (4, 0) na wykresie \\implies x = 4 \\text{ jest miejscem zerowym}',
                'mnemonic': 'Miejsce zerowe leży na osi OX.',
                'matura_tip': 'Miejsce zerowe to zawsze iks (liczba), nie punkt (x, 0).'
            },
            {
                'title': 'Odczyt wartości dla zera (oś OY)',
                'latex': 'P = (0, f(0)) \\in OY',
                'description': 'Punkt przecięcia wykresu z osią pionową.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'Wykres przecina OY w punkcie (0, -3) \\implies f(0) = -3',
                'mnemonic': 'Igrek dla iksa równego 0.',
                'matura_tip': 'Funkcja ma co najwyżej jedno przecięcie z OY.'
            }
        ],
        worked_example={
            'problem': 'Dla funkcji $f$ przedstawionej na wykresie wyznacz: a) miejsca zerowe, b) wartość $f(-2)$, c) punkt przecięcia z osią $OY$. Wiadomo, że wykres przechodzi przez punkty $(-4, 0)$, $(-2, 3)$, $(0, 2)$, $(3, 0)$.',
            'steps': [
                {'num': 1, 'label': 'Odczyt miejsc zerowych', 'text': 'Wykres przecina oś $OX$ w punktach $(-4, 0)$ oraz $(3, 0)$. Miejsca zerowe to $x_1 = -4$ oraz $x_2 = 3$.'},
                {'num': 2, 'label': 'Odczyt wartości f(-2)', 'text': 'Dla argumentu $x = -2$ punkt na wykresie to $(-2, 3)$, więc $f(-2) = 3$.'},
                {'num': 3, 'label': 'Przecięcie z osią OY i wynik CKE', 'text': 'Wykres przecina oś pionową w punkcie $(0, 2)$, co oznacza, że $f(0) = 2$.'}
            ],
            'result': 'x \\in \\{-4, 3\\}, \\quad f(-2) = 3, \\quad (0, 2)'
        },
        exam_trap='Typowy błąd CKE: Podawanie miejsca zerowego jako współrzędnych punktu $(3, 0)$ zamiast samej liczby $x = 3$.\n\nZasada Core-4: Miejsce zerowe to zawsze pojedyncza liczba (argument $x = 3$). Punkt $(3, 0)$ to punkt geometryczny przecięcia wykresu z osią na płaszczyźnie, a nie miejsce zerowe.',
        visuals=v2,
        tasks=l2_tasks
    )
    # Popraw błąd składni w latex słownika core_formulas (był przecinek zamiast dwukropka)
    l2['formulaSheet']['formulas'][1] = {
        'title': 'Odczyt wartości dla zera (oś OY)',
        'latex': 'P = (0, f(0)) \\in OY',
        'description': 'Punkt przecięcia wykresu z osią pionową.',
        'in_cke_sheet': False,
        'cke_page': '-'
    }
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 9.3: Monotoniczność i przedziały (L1.9.3)
    # ----------------------------------------------------
    v3 = get_topic_09_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-9-3-1',
            source='Rozgrzewka • Z której osi podajemy przedziały monotoniczności?',
            question='Przedziały, w których funkcja rośnie, maleje lub jest stała, podajemy ZAWSZE jako przedziały',
            options_data=[
                ('A', 'Argumentów $x$ (odczytywane z osi poziomej $OX$)'),
                ('B', 'Wartości $y$ (odczytywane z osi pionowej $OY$)'),
                ('C', 'Par uporządkowanych $(x, y)$'),
                ('D', 'Długości wykresu')
            ],
            correct_id='A',
            explanation='Monotoniczność odpowiada na pytanie: DLA JAKICH IKSÓW funkcja idzie w górę lub w dół? Przedziały monotoniczności ZAWSZE odczytujemy z osi poziomej $OX$.',
            cke_trap='Podanie przedziału z osi OY to kardynalny błąd skutkujący 0 punktów na maturze.'
        ),
        make_sc_task(
            task_id='task-9-3-2',
            source='Matura Czerwiec 2023 • Zad. 9',
            question='Wykres funkcji idzie w górę od punktu $(-3, -2)$ do punktu $(1, 4)$, a następnie opada od punktu $(1, 4)$ do punktu $(5, 0)$. Funkcja jest rosnąca w przedziale',
            options_data=[
                ('A', '$[-3, 1]$'),
                ('B', '$[-2, 4]$'),
                ('C', '$[1, 5]$'),
                ('D', '$[-3, 4]$')
            ],
            correct_id='A',
            explanation='Wykres unosi się od $x = -3$ do $x = 1$. Zatem funkcja jest rosnąca w przedziale argumentów $[-3, 1]$.',
            cke_trap='Przedział $[-2, 4]$ to wartości igreka — nigdy nie podawaj igreka w przedziale monotoniczności!'
        ),
        make_sc_task(
            task_id='task-9-3-3',
            source='Pułapka CKE • Znak sumy zbiorów w monotoniczności',
            question='Funkcja rośnie w przedziale $[-4, -1]$ oraz w przedziale $[2, 5]$. Prawidłowy zapis odpowiedzi na maturze to:',
            options_data=[
                ('A', 'Funkcja rośnie w przedziale $[-4, -1]$ oraz w przedziale $[2, 5]$ (zapisujemy ze słowem „oraz” lub przecinkiem)'),
                ('B', 'Funkcja rośnie w przedziale $[-4, -1] \\cup [2, 5]$ (ze znakiem sumy)'),
                ('C', 'Funkcja rośnie w przedziale $[-4, 5]$'),
                ('D', 'Funkcja nie jest nigdzie rosnąca')
            ],
            correct_id='A',
            explanation='Zgodnie ze ścisłymi kryteriami CKE przedziały monotoniczności podaje się OSOBNO, rozdzielone przecinkiem lub słowem „oraz”. Znak sumy zbiorów $(\\cup)$ jest błędem merytorycznym, ponieważ funkcja jako całość nie musi być rosnąca na sumie przedziałów.',
            cke_trap='Nigdy nie łącz przedziałów monotoniczności symbolem sumy $\\cup$!'
        ),
        make_tf_task(
            task_id='task-9-3-4',
            source='Trening CKE • Funkcja stała',
            question='Oceń prawdziwość zdania: Fragment wykresu będący poziomym odcinkiem oznacza, że funkcja w tym przedziale jest stała.',
            correct_tf='PRAWDA',
            explanation='Gdy wykres jest poziomy, dla różnych argumentów $x$ wartość funkcji $y$ nie zmienia się (jest stała).',
            cke_trap='Funkcja stała ma wykres równoległy do osi OX.'
        ),
        make_numeric_task(
            task_id='task-9-3-5',
            source='Utrwalenie • Maksymalny przedział malejący',
            question='Wykres funkcji opada w dół na przedziale $x \\in [2, 8]$. Oblicz długość przedziału, w którym ta funkcja maleje.',
            correct_val=6,
            explanation='Długość przedziału $[2, 8]$ wynosi $8 - 2 = 6$.',
            cke_trap='Długość to różnica iksów: $8 - 2 = 6$.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-9-3',
        topic_id=topic_id,
        title='Monotoniczność i przedziały (rośnie, maleje, stała – oś OX)',
        concept_essence='Badanie monotoniczności z wykresu to śledzenie marszu po linii od lewej do prawej: 1) Jeśli idziesz POD GÓRĘ — funkcja rośnie. 2) Jeśli schodzisz W DÓŁ — funkcja maleje. 3) Jeśli idziesz PO PŁASKIM — funkcja jest stała. ŻELAZNA ZASADA MATURALNA: Przedziały monotoniczności odczytujesz WYŁĄCZNIE z osi poziomej $OX$! Pytasz: w jakich iksach funkcja się wznosi? Iksy podajesz w nawiasach domkniętych, rozdzielone przecinkiem (NIGDY symbolem sumy $\\cup$).',
        matura_context='Regularne zadanie testowe za 1 pkt sprawdzające odporność na pułapkę podawania igreka zamiast iksa.',
        core_formulas=[
            {
                'title': 'Funkcja rosnąca w przedziale',
                'latex': 'x_1 < x_2 \\implies f(x_1) < f(x_2)',
                'description': 'Większy argument daje większą wartość (wykres idzie w górę).',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'Wykres wznosi się od x = 1 do x = 4 \\implies \\text{rośnie w } [1, 4]',
                'mnemonic': 'Idziesz od lewej do prawej pod górę.',
                'matura_tip': 'Przedział odczytujesz z osi OX.'
            },
            {
                'title': 'Zasada zapisu przedziałów CKE',
                'latex': 'x \\in [a, b] \\quad \\text{oraz} \\quad x \\in [c, d]',
                'description': 'Przedziały monotoniczności wymieniamy osobno, bez znaku sumy.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\text{rośnie w } [-3, -1] \\text{ oraz w } [2, 5]',
                'mnemonic': 'Przecinek zamiast sumy zbiorów.',
                'matura_tip': 'Znak U przy monotoniczności to utrata punktu.'
            }
        ],
        worked_example={
            'problem': 'Na podstawie wykresu podaj maksymalne przedziały, w których funkcja maleje. Wykres rośnie od $(-4, -3)$ do $(-1, 2)$, następnie opada do $(3, -1)$, a potem znów rośnie do $(6, 4)$.',
            'steps': [
                {'num': 1, 'label': 'Lokalizacja fragmentu opadającego', 'text': 'Wykres schodzi w dół od szczytu w punkcie $(-1, 2)$ do dołka w punkcie $(3, -1)$.'},
                {'num': 2, 'label': 'Odczyt współrzędnych x', 'text': 'Szczyt ma współrzędną $x = -1$, a dołek $x = 3$.'},
                {'num': 3, 'label': 'Zapis przedziału i wynik CKE', 'text': 'Funkcja maleje w przedziale $x \\in [-1, 3]$.'}
            ],
            'result': '[-1, 3]'
        },
        exam_trap='Typowy błąd: Podanie przedziału wartości z osi $OY$ (np. $[ -1, 2]$) zamiast przedziału argumentów z osi $OX$ (czyli $[-1, 3]$).\n\nPoprawnie: Przedziały monotoniczności ZAWSZE odczytujesz z osi poziomej $OX$.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    # ----------------------------------------------------
    # Lekcja 9.4: Równania f(x) = m oraz nierówności f(x) > 0 (L1.9.4)
    # ----------------------------------------------------
    v4 = get_topic_09_visuals(3)
    l4_tasks = [
        make_sc_task(
            task_id='task-9-1-4-1',
            source='Matura CKE • Odczyt liczby rozwiązań f(x) = m',
            question='Równanie $f(x) = 2$ ma dokładnie tyle rozwiązań, w ilu punktach wykres funkcji $f$ przecina się z prostą',
            options_data=[
                ('A', 'Poziomą o równaniu $y = 2$'),
                ('B', 'Pionową o równaniu $x = 2$'),
                ('C', 'Ukośną o równaniu $y = 2x$'),
                ('D', 'Punktem $(2, 0)$')
            ],
            correct_id='A',
            explanation='Wartość funkcji to współrzędna $y$. Warunek $f(x) = 2$ oznacza szukanie punktów na wykresie o wysokości $y = 2$, czyli przecięcia z poziomą prostą $y = 2$.',
            cke_trap='Pozioma prosta to $y = \\text{stała}$. Prosta $x = 2$ jest pionowa!'
        ),
        make_sc_task(
            task_id='task-9-1-4-2',
            source='Matura Maj 2022 • Zad. 8',
            question='Na rysunku przedstawiono wykres funkcji $f$. Równanie $f(x) = -1$ ma w przedziale $[-4, 5]$ dokładnie',
            options_data=[
                ('A', '3 rozwiązania'),
                ('B', '2 rozwiązania'),
                ('C', '1 rozwiązanie'),
                ('D', '0 rozwiązań')
            ],
            correct_id='A',
            explanation='Prowadzimy poziomą linię na wysokości $y = -1$. Linia ta przecina wykres funkcji dokładnie w 3 punktach, zatem równanie ma 3 rozwiązania.',
            cke_trap='Zawsze policz wszystkie przecięcia, uważając na puste kółka na końcach wykresu.'
        ),
        make_sc_task(
            task_id='task-9-1-4-3',
            source='Pułapka CKE • Nierówność f(x) <= 0 a kropki',
            question='Zbiorem rozwiązań nierówności $f(x) > 0$ jest suma przedziałów $(-4, -1) \\cup (2, 5)$. Wtedy zbiorem rozwiązań nierówności $f(x) \\ge 0$ dla tej samej funkcji o dziedzinie $[-4, 5]$ jest',
            options_data=[
                ('A', '$[-4, -1] \\cup [2, 5]$'),
                ('B', '$(-4, -1) \\cup (2, 5)$'),
                ('C', '$[-4, 5]$'),
                ('D', '$\\emptyset$')
            ],
            correct_id='A',
            explanation='Nierówność nieostra $\\ge 0$ dołącza miejsca zerowe (punkty, w których $f(x) = 0$). Zatem przedziały otwarte domykamy w punktach przecięcia z osią: $[-4, -1] \\cup [2, 5]$.',
            cke_trap='Znak $\\ge$ włącza miejsca zerowe (nawiasy domknięte).'
        ),
        make_tf_task(
            task_id='task-9-1-4-4',
            source='Trening CKE • Brak przecięcia z prostą poziomą',
            question='Oceń prawdziwość zdania: Jeśli zbiór wartości funkcji $f$ to $ZW = [-2, 3]$, to równanie $f(x) = 4$ nie ma żadnych rozwiązań.',
            correct_tf='PRAWDA',
            explanation='Liczba $4$ nie należy do zbioru wartości funkcji (najwyższa wartość to $3$). Pozioma prosta $y = 4$ przebiega nad całym wykresem i go nie przecina.',
            cke_trap='Wartości spoza zbioru wartości nigdy nie są osiągane przez funkcję.'
        ),
        make_numeric_task(
            task_id='task-9-1-4-5',
            source='Utrwalenie • Liczba rozwiązań z wykresu',
            question='Wykres funkcji $f$ przecina poziomą prostą $y = 0$ w punktach o odciętych $-3$, $1$ oraz $4$. Ile rozwiązań ma równanie $f(x) = 0$?',
            correct_val=3,
            explanation='Równanie $f(x) = 0$ to pytanie o miejsca zerowe. Skoro wykres przecina oś $OX$ w 3 punktach, równanie ma dokładnie 3 rozwiązania.',
            cke_trap='Odcięta to współrzędna $x$. Wykres ma 3 miejsca zerowe.'
        )
    ]
    l4 = make_lesson(
        lesson_id='lesson-9-4',
        topic_id=topic_id,
        title='Odczytywanie liczby rozwiązań równań i nierówności z wykresu funkcji',
        concept_essence='Analiza równań i nierówności na wykresie: 1) Równanie $f(x) = m$ — kładziesz poziomą linijkę na wysokości $y = m$. Liczba punktów przecięcia linijki z wykresem to LICZBA ROZWIĄZAŃ równania. Jeśli prosta mija wykres — równanie nie ma rozwiązań. 2) Nierówność $f(x) > 0$ — szukasz części wykresu leżących ŚCIŚLE NAD osią $OX$. Rozwiązaniem są przedziały iksów z osi poziomej. 3) Nierówność $f(x) \\le 0$ — szukasz części POD osią $OX$ wraz z miejscami zerowymi.',
        matura_context='Jeden z ulubionych typów zadań CKE w arkuszach majowych i czerwcowych za 1 punkt.',
        core_formulas=[
            {
                'title': 'Graficzne rozwiązywanie równania f(x) = m',
                'latex': 'f(x) = m \\implies \\text{punkty przecięcia z poziomą prostą } y = m',
                'description': 'Liczba przecięć równa się liczbie rozwiązań równania.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'Prosta y = 2 przecina wykres w 3 punktach \\implies 3 \\text{ rozwiązania}',
                'mnemonic': 'Pozioma linijka na wysokości m.',
                'matura_tip': 'Nie rysuj prostej pionowej!'
            },
            {
                'title': 'Graficzne rozwiązywanie nierówności f(x) > 0',
                'latex': 'f(x) > 0 \\implies \\text{część wykresu leżąca nad osią } OX',
                'description': 'Odpowiedź to przedziały z osi poziomej OX.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'Wykres nad osią od x = 1 do x = 4 \\implies x \\in (1, 4)',
                'mnemonic': 'Wartości dodatnie to punkty powyżej osi.',
                'matura_tip': 'Dla znaku >= domykasz nawiasy w miejscach zerowych.'
            }
        ],
        worked_example={
            'problem': 'Z wykresu funkcji $f$ odczytaj: a) liczbę rozwiązań równania $f(x) = 1$, b) zbiór rozwiązań nierówności $f(x) \\ge 0$. Wiadomo, że prosta $y = 1$ przecina wykres w 2 punktach, a wykres leży nad osią $OX$ dla $x \\in [-3, 5]$ włącznie z miejscami zerowymi.',
            'steps': [
                {'num': 1, 'label': 'Liczba rozwiązań równania f(x) = 1', 'text': 'Rysujemy poziomą prostą na wysokości $y = 1$. Przecina ona wykres w 2 punktach, więc równanie ma dokładnie 2 rozwiązania.'},
                {'num': 2, 'label': 'Rozwiązanie nierówności f(x) >= 0', 'text': 'Wykres znajduje się nad osią lub na osi dla iksów od $-3$ do $5$.'},
                {'num': 3, 'label': 'Zapis odpowiedzi CKE', 'text': 'Równanie ma 2 rozwiązania, a zbiór rozwiązań nierówności to $x \\in [-3, 5]$.'}
            ],
            'result': '2 \\text{ rozwiązania}, \\quad x \\in [-3, 5]'
        },
        exam_trap='Typowy błąd: Rysowanie prostej pionowej $x = m$ zamiast poziomej $y = m$ przy równaniu $f(x) = m$.\n\nPoprawnie: $f(x) = m$ pyta o wartość $y = m$, a wartości leżą na osi pionowej, więc linia cięcia jest POZIOMA.',
        visuals=v4,
        tasks=l4_tasks
    )
    lessons.append(l4)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'order': topic_number,
        'tier': 'Tier S+',
        'badge': 'NA 30% • PEWNIAK MATURALNY',
        'estimated_time_formatted': '4 lekcje (~20 min)',
        'description': 'Odczytywanie dziedziny i zbioru wartości, miejsc zerowych, monotoniczności oraz graficzne rozwiązywanie równań i nierówności.',
        'lessons': lessons
    }
