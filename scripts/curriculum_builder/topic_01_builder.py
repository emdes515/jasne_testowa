"""
topic_01_builder.py - Dział 1.1: Potęgi i pierwiastki (4 lekcje | Tier S+)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_01 import get_topic_01_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_01():
    topic_id = 'dzial-1'
    topic_title = 'Dział 1.1: Potęgi i pierwiastki'
    lessons = []

    # ----------------------------------------------------
    # Lekcja 1.1: Działania na potęgach (L1.1.1)
    # ----------------------------------------------------
    v1 = get_topic_01_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-1-1-1',
            source='Rozgrzewka • Prawa działań na potęgach',
            question='Dokończ zdanie. Iloczyn $3^4 \\cdot 3^5$ jest równy',
            options_data=[
                ('A', '$9^9$'),
                ('B', '$3^{20}$'),
                ('C', '$3^9$'),
                ('D', '$9^{20}$')
            ],
            correct_id='C',
            explanation='Stosujemy wzór na iloczyn potęg o tej samej podstawie: $a^m \\cdot a^n = a^{m+n}$. Tutaj podstawa wynosi $3$, więc wykładniki dodajemy: $4 + 5 = 9$. Wynik to $3^9$.',
            cke_trap='Nigdy nie mnóż podstaw potęg ($3 \\cdot 3 = 9$) ani nie mnóż wykładników ($4 \\cdot 5 = 20$) przy mnożeniu potęg o tej samej podstawie!'
        ),
        make_sc_task(
            task_id='task-1-1-2',
            source='Matura Maj 2024 • Zad. 2',
            question='Dokończ zdanie. Liczba $\\left(\\frac{1}{16}\\right)^8 \\cdot 8^{16}$ jest równa',
            options_data=[
                ('A', '$2^{24}$'),
                ('B', '$2^{16}$'),
                ('C', '$2^{12}$'),
                ('D', '$2^8$')
            ],
            correct_id='B',
            explanation='Sprowadzamy obie potęgi do wspólnej podstawy $2$:\n$$\\frac{1}{16} = 2^{-4} \\implies \\left(\\frac{1}{16}\\right)^8 = (2^{-4})^8 = 2^{-32}$$\n$$8 = 2^3 \\implies 8^{16} = (2^3)^{16} = 2^{48}$$\nMnożymy potęgi: $2^{-32} \\cdot 2^{48} = 2^{-32 + 48} = 2^{16}$.',
            cke_trap='Uważaj na znak minus przy zamianie ułamka $\\frac{1}{16}$ na potęgę dwójki ($2^{-4}$, a nie $2^4$).'
        ),
        make_sc_task(
            task_id='task-1-1-3',
            source='Pułapka CKE • Potęgowanie potęgi',
            question='Wartość wyrażenia $\\frac{(2^3)^4}{2^2 \\cdot 2^5}$ jest równa',
            options_data=[
                ('A', '$2^5$'),
                ('B', '$2^7$'),
                ('C', '$2^{10}$'),
                ('D', '$1$')
            ],
            correct_id='A',
            explanation='W liczniku potęgujemy potęgę (wykładniki mnożymy): $(2^3)^4 = 2^{3 \\cdot 4} = 2^{12}$.\nW mianowniku mnożymy potęgi (wykładniki dodajemy): $2^2 \\cdot 2^5 = 2^{2+5} = 2^7$.\nDzielimy potęgi (wykładniki odejmujemy): $\\frac{2^{12}}{2^7} = 2^{12 - 7} = 2^5$.',
            cke_trap='W potęgowaniu potęgi $(a^m)^n$ wykładniki się MNOŻY ($3 \\cdot 4 = 12$), a nie dodaje ($3 + 4 = 7$).'
        ),
        make_numeric_task(
            task_id='task-1-1-4',
            source='Zadanie utrwalające • Redukcja potęg',
            question='Oblicz wartość wyrażenia $\\frac{5^9 \\cdot 25^2}{125^4}$. Wpisz wynik jako liczbę całkowitą.',
            correct_val='5',
            explanation='Sprowadzamy do podstawy 5:\nLicznik: $5^9 \\cdot (5^2)^2 = 5^9 \\cdot 5^4 = 5^{13}$.\nMianownik: $(5^3)^4 = 5^{12}$.\nDzielenie: $5^{13} : 5^{12} = 5^{13 - 12} = 5^1 = 5$.',
            cke_trap='Pamiętaj, że $25 = 5^2$ oraz $125 = 5^3$.'
        ),
        make_open_task(
            task_id='task-1-1-5',
            source='Matura CKE • Zadanie dowodowe (2 pkt)',
            question='Wykaż, że dla każdej liczby całkowitej dodatniej $n$ liczba $3^{n+2} + 3^n$ jest podzielna przez $10$.',
            points=2,
            scoring_key='1 pkt – wyłączenie wspólnego czynnika $3^n$ przed nawias: $3^n(3^2 + 1)$.\\n2 pkt – pełne uzasadnienie: $3^n \\cdot 10$, co jako iloczyn liczby całkowitej i 10 jest podzielne przez 10.',
            explanation='Rozpisujemy potęgę $3^{n+2} = 3^n \\cdot 3^2 = 9 \\cdot 3^n$.\nWyłączamy wspólny czynnik $3^n$ przed nawias:\n$$3^{n+2} + 3^n = 3^n(3^2 + 1) = 3^n(9 + 1) = 3^n \\cdot 10$$\nPonieważ liczba $10$ jest jednym z czynników, a $3^n$ dla $n \\in \\mathbb{N}^+$ jest liczbą całkowitą, całe wyrażenie jest podzielne przez $10$. Co kończy dowód.',
            cke_trap='Nigdy nie sprawdzaj tylko dla $n=1$ i $n=2$! Dowód musi obejmować dowolne $n$ poprzez wyłączenie czynnika przed nawias.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-1-1',
        topic_id=topic_id,
        title='L1.1.1: Działania na potęgach o wykładnikach całkowitych i wymiernych',
        concept_essence='Potęgowanie to skrócony zapis wielokrotnego mnożenia tej samej liczby: zapis $a^n$ oznacza, że liczbę $a$ (podstawę) mnożysz przez samą siebie $n$ razy (wykładnik). Zrozumienie tej definicji daje Ci intuicję do wszystkich praw działań na potęgach: podstawa potęgi jest jak nienaruszalna cegiełka, a operacje wykonujesz wyłącznie na licznikach powtórzeń. Gdy w zadaniu CKE widzisz różne liczby (np. $4$, $8$, $16$), Twoim pierwszym odruchem jest sprowadzenie ich do wspólnej, najprostszej bazy – najczęściej $2$, $3$ lub $5$.',
        matura_context='Zadanie z działań na potęgach pojawia się w 100% arkuszy maturalnych CKE na pozycji 1 lub 2 za 1 punkt. Dodatkowo występuje regularnie w zadaniu otwartym na podzielność za 2 punkty.',
        core_formulas=[
            {
                'title': 'Iloczyn potęg o tej samej podstawie',
                'latex': 'a^m \\cdot a^n = a^{m+n}',
                'description': 'Podstawa bez zmian, wykładniki dodajemy.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '$2^3 \\cdot 2^4 = 2^{3+4} = 2^7 = 128$',
                'mnemonic': 'Mnożenie liczb na dole to dodawanie na górze.',
                'matura_tip': 'Nie mnóż podstaw ze sobą ($2 \\cdot 2$ to nadal podstawa $2$, nie $4$!).'
            },
            {
                'title': 'Iloraz potęg o tej samej podstawie',
                'latex': '\\frac{a^m}{a^n} = a^{m-n}',
                'description': 'Podstawa bez zmian, wykładnik mianownika odejmujemy od licznika.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '$\\frac{5^8}{5^6} = 5^{8-6} = 5^2 = 25$',
                'mnemonic': 'Kreska ułamkowa działa jak minus między wykładnikami.',
                'matura_tip': 'Odejmuj od góry dół. Gdy na dole jest minus, pamiętaj: $m - (-n) = m + n$.'
            },
            {
                'title': 'Potęgowanie potęgi',
                'latex': '(a^m)^n = a^{m \\cdot n}',
                'description': 'Nawias oddzielający wykładniki oznacza ich wymnożenie.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '$(3^2)^4 = 3^{2 \\cdot 4} = 3^8 = 6561$',
                'mnemonic': 'Nawias mnoży wykładniki.',
                'matura_tip': 'Rozróżniaj $(a^2)^3 = a^6$ od $a^{(2^3)} = a^8$.'
            }
        ],
        worked_example={
            'problem': 'Oblicz wartość wyrażenia $\\frac{2^7 \\cdot 4^3}{8^4}$.',
            'steps': [
                {'num': 1, 'label': 'Sprowadzenie do wspólnej podstawy', 'text': 'Liczby 4 i 8 zapisujemy jako potęgi dwójki: $4 = 2^2$, $8 = 2^3$. Wtedy $4^3 = (2^2)^3 = 2^6$ oraz $8^4 = (2^3)^4 = 2^{12}$.'},
                {'num': 2, 'label': 'Działania na wykładnikach w liczniku', 'text': 'Licznik: $2^7 \\cdot 2^6 = 2^{7+6} = 2^{13}$. Wyrażenie przyjmuje postać $\\frac{2^{13}}{2^{12}}$.'},
                {'num': 3, 'label': 'Ostateczna redukcja i wynik CKE', 'text': 'Dzielimy potęgi: $2^{13} : 2^{12} = 2^{13-12} = 2^1 = 2$.'}
            ],
            'result': '2'
        },
        exam_trap='Typowy błąd: Mnożenie podstaw potęg (np. $2^3 \\cdot 2^4 = 4^7$).\n\nPoprawnie: Podstawa potęgi pozostaje BEZ ZMIAN: $2^3 \\cdot 2^4 = 2^{3+4} = 2^7 = 128$.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 1.2: Działania na pierwiastkach (L1.1.2)
    # ----------------------------------------------------
    v2 = get_topic_01_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-1-2-1',
            source='Rozgrzewka • Wyłączanie czynnika',
            question='Liczba $\\sqrt{72}$ jest równa',
            options_data=[
                ('A', '$3\\sqrt{8}$'),
                ('B', '$6\\sqrt{2}$'),
                ('C', '$2\\sqrt{6}$'),
                ('D', '$36\\sqrt{2}$')
            ],
            correct_id='B',
            explanation='Rozkładamy 72 na iloczyn największego kwadratu: $72 = 36 \\cdot 2$. Zatem $\\sqrt{72} = \\sqrt{36 \\cdot 2} = \\sqrt{36} \\cdot \\sqrt{2} = 6\\sqrt{2}$.',
            cke_trap='Choć $72 = 9 \\cdot 8$, to wyciągnięcie $3\\sqrt{8}$ nie jest postacią ostateczną, bo z 8 można jeszcze wyciągnąć 2!'
        ),
        make_sc_task(
            task_id='task-1-2-2',
            source='Matura Czerwiec 2023 • Zad. 1',
            question='Dokończ zdanie. Liczba $\\sqrt{75} - \\sqrt{27}$ jest równa',
            options_data=[
                ('A', '$\\sqrt{48}$'),
                ('B', '$2\\sqrt{3}$'),
                ('C', '$4\\sqrt{3}$'),
                ('D', '$\\sqrt{3}$')
            ],
            correct_id='B',
            explanation='Wyłączamy czynnik przed znak pierwiastka z obu liczb:\n$$\\sqrt{75} = \\sqrt{25 \\cdot 3} = 5\\sqrt{3}$$\n$$\\sqrt{27} = \\sqrt{9 \\cdot 3} = 3\\sqrt{3}$$\nOdejmujemy: $5\\sqrt{3} - 3\\sqrt{3} = (5 - 3)\\sqrt{3} = 2\\sqrt{3}$.',
            cke_trap='Nigdy nie odejmuj liczb pod pierwiastkami: $\\sqrt{75} - \\sqrt{27} \\neq \\sqrt{75 - 27} = \\sqrt{48}$!'
        ),
        make_tf_task(
            task_id='task-1-2-3',
            source='Pułapka CKE • Pierwiastek sumy',
            question='Wartość wyrażenia $\\sqrt{16 + 9}$ jest równa $4 + 3 = 7$.',
            correct_tf='FAŁSZ',
            explanation='Pierwiastek sumy NIE jest sumą pierwiastków! Najpierw wykonujemy dodawanie pod pierwiastkiem: $\\sqrt{16 + 9} = \\sqrt{25} = 5$. Zatem zdanie jest fałszywe ($5 \\neq 7$).',
            cke_trap='Zasada $\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}$ działa WYŁĄCZNIE dla mnożenia i dzielenia, NIGDY dla dodawania i odejmowania!'
        ),
        make_numeric_task(
            task_id='task-1-2-4',
            source='Zadanie utrwalające • Pierwiastki sześcienne',
            question='Oblicz wartość wyrażenia $\\frac{\\sqrt[3]{54}}{\\sqrt[3]{2}}$. Wpisz wynik jako liczbę całkowitą.',
            correct_val='3',
            explanation='Stosujemy regułę ilorazu pierwiastków tego samego stopnia: $\\frac{\\sqrt[3]{54}}{\\sqrt[3]{2}} = \\sqrt[3]{\\frac{54}{2}} = \\sqrt[3]{27} = 3$.',
            cke_trap='Pamiętaj: $\\sqrt[3]{27} = 3$, ponieważ $3^3 = 27$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-1-2',
        topic_id=topic_id,
        title='L1.1.2: Działania na pierwiastkach i wyłączanie czynnika przed znak pierwiastka',
        concept_essence='Pierwiastkowanie to operacja odwrotna do potęgowania: szukasz liczby, która po podniesieniu do danej potęgi daje wartość pod pierwiastkiem. Najważniejsza maturalna umiejętność to wyłączanie czynnika: rozbijasz liczbę podpierwiastkową na iloczyn dwóch liczb, z których jedna jest pełnym kwadratem ($4, 9, 16, 25, 36, 49, 64, 81, 100$). Tę liczbę pierwiastkujesz i wystawiasz przed pierwiastek, a nierozkładalna reszta zostaje w środku. Wyrażenia z tym samym pierwiastkiem (np. $5\\sqrt{3}$ i $2\\sqrt{3}$) redukujesz dokładnie tak jak wyrazy podobne w algebrze ($5x - 2x = 3x$).',
        matura_context='Wyłączanie czynnika przed pierwiastek i redukcja sumy pierwiastków to absolutny pewniak w pierwszych 3 zadaniach arkusza podstawowego za 1 punkt.',
        core_formulas=[
            {
                'title': 'Iloczyn i iloraz pierwiastków',
                'latex': '\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b},\\quad \\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}',
                'description': 'Pierwiastek z iloczynu to iloczyn pierwiastków (dla a, b >= 0).',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '\\sqrt{50} = \\sqrt{25 \\cdot 2} = \\sqrt{25} \\cdot \\sqrt{2} = 5\\sqrt{2}',
                'mnemonic': 'Szukaj w liczbie pełnych kwadratów: 4, 9, 16, 25, 36, 49...',
                'matura_tip': 'Zawsze szukaj NAJWIĘKSZEGO kwadratu dzielącego liczbę podpierwiastkową.'
            },
            {
                'title': 'KARDYNALNY ZAKAZ: Suma pod pierwiastkiem',
                'latex': '\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}',
                'description': 'NIGDY nie rozbijaj pierwiastka na sumę oddzielnych pierwiastków.',
                'in_cke_sheet': False,
                'example': '\\sqrt{9 + 16} = \\sqrt{25} = 5 \\neq 3 + 4 = 7',
                'mnemonic': 'Najpierw dodaj w środku, dopiero potem wyciągaj pierwiastek.',
                'matura_tip': 'Pułapka pojawia się w co drugim arkuszu maturalnym CKE.'
            }
        ],
        worked_example={
            'problem': 'Uprość wyrażenie $\\sqrt{108} - \\sqrt{48}$.',
            'steps': [
                {'num': 1, 'label': 'Rozkład liczby 108', 'text': 'Szukamy kwadratów dzielących 108: $108 = 36 \\cdot 3$. Zatem $\\sqrt{108} = \\sqrt{36 \\cdot 3} = 6\\sqrt{3}$.'},
                {'num': 2, 'label': 'Rozkład liczby 48', 'text': 'Szukamy kwadratów dzielących 48: $48 = 16 \\cdot 3$. Zatem $\\sqrt{48} = \\sqrt{16 \\cdot 3} = 4\\sqrt{3}$.'},
                {'num': 3, 'label': 'Redukcja wyrazów podobnych', 'text': '$6\\sqrt{3} - 4\\sqrt{3} = (6 - 4)\\sqrt{3} = 2\\sqrt{3}$.'}
            ],
            'result': '2\\sqrt{3}'
        },
        exam_trap='Typowy błąd: Odejmowanie liczb pod pierwiastkami: $\\sqrt{75} - \\sqrt{27} = \\sqrt{48}$.\n\nPoprawnie: Najpierw wyłącz czynniki przed pierwiastki: $5\\sqrt{3} - 3\\sqrt{3} = 2\\sqrt{3}$.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 1.3: Usuwanie niewymierności z mianownika (L1.1.3)
    # ----------------------------------------------------
    v3 = get_topic_01_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-1-3-1',
            source='Rozgrzewka • Usuwanie pojedynczego pierwiastka',
            question='Liczba $\\frac{6}{\\sqrt{3}}$ po usunięciu niewymierności z mianownika jest równa',
            options_data=[
                ('A', '$2$'),
                ('B', '$2\\sqrt{3}$'),
                ('C', '$3\\sqrt{3}$'),
                ('D', '$\\sqrt{3}$')
            ],
            correct_id='B',
            explanation='Mnożymy licznik i mianownik przez $\\sqrt{3}$:\n$$\\frac{6}{\\sqrt{3}} = \\frac{6 \\cdot \\sqrt{3}}{\\sqrt{3} \\cdot \\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}$$.',
            cke_trap='Pamiętaj, że $\\sqrt{3} \\cdot \\sqrt{3} = 3$, a nie 9.'
        ),
        make_sc_task(
            task_id='task-1-3-2',
            source='Matura Sierpień 2023 • Zad. 1',
            question='Dokończ zdanie. Liczba $\\frac{4}{\\sqrt{5} - 1}$ jest równa',
            options_data=[
                ('A', '$\\sqrt{5} + 1$'),
                ('B', '$\\sqrt{5} - 1$'),
                ('C', '$4\\sqrt{5} + 4$'),
                ('D', '$\\frac{\\sqrt{5} + 1}{4}$')
            ],
            correct_id='A',
            explanation='Mnożymy licznik i mianownik przez sprzężenie mianownika $(\\sqrt{5} + 1)$:\n$$\\frac{4(\\sqrt{5} + 1)}{(\\sqrt{5} - 1)(\\sqrt{5} + 1)} = \\frac{4(\\sqrt{5} + 1)}{(\\sqrt{5})^2 - 1^2} = \\frac{4(\\sqrt{5} + 1)}{5 - 1} = \\frac{4(\\sqrt{5} + 1)}{4} = \\sqrt{5} + 1$$.',
            cke_trap='W mianowniku stosujesz wzór skróconego mnożenia $(a-b)(a+b) = a^2 - b^2$, więc $(\\sqrt{5})^2 - 1^2 = 5 - 1 = 4$.'
        ),
        make_sc_task(
            task_id='task-1-3-3',
            source='Pułapka CKE • Sprzężenie sumy',
            question='Liczba $\\frac{3}{\\sqrt{7} + 2}$ jest równa',
            options_data=[
                ('A', '$\\sqrt{7} - 2$'),
                ('B', '$\\sqrt{7} + 2$'),
                ('C', '$\\frac{\\sqrt{7} - 2}{3}$'),
                ('D', '$\\frac{3\\sqrt{7} - 6}{5}$')
            ],
            correct_id='A',
            explanation='Sprzężeniem mianownika $\\sqrt{7} + 2$ jest wyrażenie ze ZMIENIONYM znakiem, czyli $\\sqrt{7} - 2$:\n$$\\frac{3(\\sqrt{7} - 2)}{(\\sqrt{7} + 2)(\\sqrt{7} - 2)} = \\frac{3(\\sqrt{7} - 2)}{7 - 4} = \\frac{3(\\sqrt{7} - 2)}{3} = \\sqrt{7} - 2$$.',
            cke_trap='Mianownik to $(\\sqrt{7})^2 - 2^2 = 7 - 4 = 3$, a nie $7 - 2 = 5$ (pamiętaj o podniesieniu 2 do kwadratu!).'
        ),
        make_numeric_task(
            task_id='task-1-3-4',
            source='Zadanie utrwalające • Redukcja niewymierności',
            question='Oblicz wartość wyrażenia $\\frac{1}{\\sqrt{2} - 1} - \\sqrt{2}$. Wpisz wynik.',
            correct_val='1',
            explanation='Usuwamy niewymierność z pierwszego ułamka:\n$$\\frac{1(\\sqrt{2} + 1)}{(\\sqrt{2} - 1)(\\sqrt{2} + 1)} = \\frac{\\sqrt{2} + 1}{2 - 1} = \\sqrt{2} + 1$$\nOdejmujemy $\\sqrt{2}$: $(\\sqrt{2} + 1) - \\sqrt{2} = 1$.',
            cke_trap='Pamiętaj, że $(\\sqrt{2})^2 - 1 = 2 - 1 = 1$, więc mianownik całkowicie znika.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-1-3',
        topic_id=topic_id,
        title='L1.1.3: Usuwanie niewymierności z mianownika',
        concept_essence='W matematyce i na maturze CKE mianownik ułamka musi być liczbą wymierną (całkowitą). Aby usunąć pierwiastek z dołu, mnożysz ułamek przez jedynkę w sprytnej postaci: 1) Gdy na dole jest pojedynczy pierwiastek (np. $\\frac{b}{\\sqrt{a}}$), mnożysz licznik i mianownik przez $\\frac{\\sqrt{a}}{\\sqrt{a}}$. 2) Gdy na dole jest suma lub różnica (np. $\\frac{c}{\\sqrt{a} - b}$), stosujesz tzw. sprzężenie – mnożysz górę i dół przez to samo wyrażenie z przeciwnym znakiem $(\\sqrt{a} + b)$, co uruchamia wzór na różnicę kwadratów i natychmiast likwiduje pierwiastek.',
        matura_context='Zadanie na usuwanie niewymierności ze sprzężeniem występuje na maturze w arkuszach czerwcowych i poprawkowych za 1 punkt, a także jako krok w zadaniach z geometrii analitycznej i trygonometrii.',
        core_formulas=[
            {
                'title': 'Typ prosty: samotny pierwiastek',
                'latex': '\\frac{b}{\\sqrt{a}} = \\frac{b\\sqrt{a}}{a}',
                'description': 'Mnożysz licznik i mianownik przez pierwiastek.',
                'in_cke_sheet': False,
                'example': '\\frac{6}{\\sqrt{2}} = \\frac{6\\sqrt{2}}{2} = 3\\sqrt{2}',
                'mnemonic': 'Mnożenie przez 1 w przebraniu pierwiastka.',
                'matura_tip': 'Po wymnożeniu sprawdź czy liczba w liczniku skraca się z mianownikiem.'
            },
            {
                'title': 'Typ ze sprzężeniem: różnica kwadratów',
                'latex': '\\frac{c}{\\sqrt{a} - b} = \\frac{c(\\sqrt{a} + b)}{a - b^2}',
                'description': 'Mnożysz przez wyrażenie z przeciwnym znakiem.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7 (wzory skróconego mnożenia)',
                'example': '\\frac{2}{\\sqrt{3} - 1} = \\frac{2(\\sqrt{3} + 1)}{3 - 1} = \\frac{2(\\sqrt{3} + 1)}{2} = \\sqrt{3} + 1',
                'mnemonic': 'Minus zamieniasz na plus (i odwrotnie).',
                'matura_tip': 'Nie zapomnij podnieść wyrazu wolnego do kwadratu: $b$ staje się $b^2$!'
            }
        ],
        worked_example={
            'problem': 'Usuń niewymierność z mianownika ułamka $\\frac{4}{\\sqrt{5} - 1}$.',
            'steps': [
                {'num': 1, 'label': 'Dobór sprzężenia', 'text': 'W mianowniku mamy $\\sqrt{5} - 1$, więc mnożymy licznik i mianownik przez $(\\sqrt{5} + 1)$.'},
                {'num': 2, 'label': 'Różnica kwadratów w mianowniku', 'text': 'Mianownik: $(\\sqrt{5} - 1)(\\sqrt{5} + 1) = (\\sqrt{5})^2 - 1^2 = 5 - 1 = 4$. Licznik: $4(\\sqrt{5} + 1)$.'},
                {'num': 3, 'label': 'Skrócenie ułamka i wynik CKE', 'text': '$\\frac{4(\\sqrt{5} + 1)}{4} = \\sqrt{5} + 1$.'}
            ],
            'result': '\\sqrt{5} + 1'
        },
        exam_trap='Typowy błąd: Mnożenie przez ten sam znak w mianowniku $(\\sqrt{5} - 1)(\\sqrt{5} - 1)$ lub zapomnienie o nawiasie w liczniku $4\\sqrt{5} + 1$.\n\nPoprawnie: Zmień znak na przeciwny i weź licznik w nawias: $\\frac{4(\\sqrt{5} + 1)}{5 - 1} = \\sqrt{5} + 1$.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    # ----------------------------------------------------
    # Lekcja 1.4: Potęgi o wykładniku ujemnym i ułamkowym (L1.1.4)
    # ----------------------------------------------------
    v4 = get_topic_01_visuals(3)
    l4_tasks = [
        make_sc_task(
            task_id='task-1-4-1',
            source='Rozgrzewka • Wykładnik ujemny',
            question='Liczba $\\left(\\frac{2}{3}\\right)^{-2}$ jest równa',
            options_data=[
                ('A', '$-\\frac{4}{9}$'),
                ('B', '$\\frac{9}{4}$'),
                ('C', '$-\\frac{9}{4}$'),
                ('D', '$\\frac{4}{9}$')
            ],
            correct_id='B',
            explanation='Minus w wykładniku odwraca ułamek: $\\left(\\frac{2}{3}\\right)^{-2} = \\left(\\frac{3}{2}\\right)^2 = \\frac{3^2}{2^2} = \\frac{9}{4}$.',
            cke_trap='Minus w wykładniku NIE tworzy liczby ujemnej! On jedynie odwraca ułamek do góry nogami.'
        ),
        make_sc_task(
            task_id='task-1-4-2',
            source='Matura Maj 2023 • Zad. 1',
            question='Dokończ zdanie. Liczba $16^{-0{,}25} \\cdot 64^{\\frac{2}{3}}$ jest równa',
            options_data=[
                ('A', '$8$'),
                ('B', '$16$'),
                ('C', '$4$'),
                ('D', '$2$')
            ],
            correct_id='A',
            explanation='Zamieniamy wykładnik dziesiętny na ułamek zwykły: $-0{,}25 = -\\frac{1}{4}$.\nObliczamy pierwszy czynnik: $16^{-\\frac{1}{4}} = \\left(\\frac{1}{16}\\right)^{\\frac{1}{4}} = \\sqrt[4]{\\frac{1}{16}} = \\frac{1}{2}$.\nObliczamy drugi czynnik: $64^{\\frac{2}{3}} = (\\sqrt[3]{64})^2 = 4^2 = 16$.\nMnożymy: $\\frac{1}{2} \\cdot 16 = 8$.',
            cke_trap='Mianownik wykładnika to ZAWSZE stopień pierwiastka (tutaj $\\sqrt[3]{64} = 4$, a potem do kwadratu $4^2 = 16$).'
        ),
        make_sc_task(
            task_id='task-1-4-3',
            source='Pułapka CKE • Znak przy wykładniku ujemnym',
            question='Liczba $3^{-2}$ jest równa',
            options_data=[
                ('A', '$-6$'),
                ('B', '$-9$'),
                ('C', '$\\frac{1}{9}$'),
                ('D', '$\\frac{1}{6}$')
            ],
            correct_id='C',
            explanation='Stosujemy regułę $a^{-n} = \\frac{1}{a^n}$. Zatem $3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}$. Wynik jest liczbą dodatnią.',
            cke_trap='Najczęstszy błąd maturzysty: $3^{-2} = -6$ (pomnożenie podstawy przez wykładnik) lub $3^{-2} = -9$ (przypisanie minusa do potęgi).'
        ),
        make_numeric_task(
            task_id='task-1-4-4',
            source='Zadanie utrwalające • Wykładnik ułamkowy',
            question='Oblicz wartość potęgi $27^{\\frac{4}{3}}$. Wpisz wynik jako liczbę całkowitą.',
            correct_val='81',
            explanation='Mianownik 3 zamienia się na pierwiastek sześcienny: $27^{\\frac{4}{3}} = (\\sqrt[3]{27})^4 = 3^4 = 81$.',
            cke_trap='Zawsze najpierw wyciągaj pierwiastek ($\\sqrt[3]{27} = 3$), a dopiero potem potęguj ($3^4 = 81$), żeby uniknąć gigantycznych liczb!'
        )
    ]
    l4 = make_lesson(
        lesson_id='lesson-1-4',
        topic_id=topic_id,
        title='L1.1.4: Potęgi o wykładniku ujemnym i ułamkowym w zadaniach maturalnych CKE',
        concept_essence='Dwa kluczowe mechanizmy do zapamiętania na całe życie: 1) Minus w wykładniku to polecenie odwrócenia liczby: $a^{-n}$ staje się ułamkiem $\\frac{1}{a^n}$. Minus w potędze NIGDY nie tworzy liczby ujemnej – dodatnia podstawa podniesiona do potęgi ujemnej jest nadal ściśle dodatnia! 2) Ułamek w wykładniku to zakamuflowany pierwiastek: mianownik ułamka to zawsze stopień pierwiastka ($a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$). W zadaniach CKE najpierw wyciągaj pierwiastek, by zmniejszyć liczbę, a dopiero potem potęguj.',
        matura_context='Połączenie wykładnika ujemnego i ułamkowego występuje niemal co roku w Zadaniu 1 arkusza CKE (formuła 2023) za 1 punkt.',
        core_formulas=[
            {
                'title': 'Wykładnik ujemny (odwracanie)',
                'latex': 'a^{-n} = \\frac{1}{a^n},\\quad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n',
                'description': 'Minus w wykładniku odwraca liczbę do góry nogami.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '4^{-2} = \\frac{1}{4^2} = \\frac{1}{16},\\quad \\left(\\frac{2}{3}\\right)^{-3} = \\left(\\frac{3}{2}\\right)^3 = \\frac{27}{8}',
                'mnemonic': 'Minus na górze wywraca ułamek do góry dnem.',
                'matura_tip': 'Minus w potędze NIGDY nie daje liczby ujemnej!'
            },
            {
                'title': 'Wykładnik ułamkowy (zamiana na pierwiastek)',
                'latex': 'a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m',
                'description': 'Mianownik n to stopień pierwiastka, licznik m to potęga.',
                'in_cke_sheet': True,
                'cke_page': 'str. 4',
                'example': '8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4',
                'mnemonic': 'Mianownik to korzeń (stopień pierwiastka na dole).',
                'matura_tip': 'Najpierw pierwiastkuj, potem potęguj – mniejsze liczby to brak błędów!'
            }
        ],
        worked_example={
            'problem': 'Oblicz wartość wyrażenia $16^{-\\frac{3}{4}}$.',
            'steps': [
                {'num': 1, 'label': 'Likwidacja minusa', 'text': 'Minus w wykładniku odwraca podstawę: $16^{-\\frac{3}{4}} = \\left(\\frac{1}{16}\\right)^{\\frac{3}{4}}$.'},
                {'num': 2, 'label': 'Zamiana na pierwiastek stopnia 4', 'text': 'Mianownik 4 to pierwiastek stopnia 4: $\\left(\\sqrt[4]{\\frac{1}{16}}\\right)^3$. Ponieważ $\\left(\\frac{1}{2}\\right)^4 = \\frac{1}{16}$, mamy $\\left(\\frac{1}{2}\\right)^3$.'},
                {'num': 3, 'label': 'Końcowe potęgowanie i wynik CKE', 'text': '$\\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$.'}
            ],
            'result': '\\frac{1}{8}'
        },
        exam_trap='Typowy błąd: Twierdzenie, że $3^{-2} = -9$ lub $3^{-2} = -6$.\n\nPoprawnie: Minus w wykładniku to odwrotność, więc $3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}$ (liczba dodatnia!).',
        visuals=v4,
        tasks=l4_tasks
    )
    lessons.append(l4)

    return {
        'id': topic_id,
        'title': topic_title,
        'short_title': 'Potęgi i pierwiastki',
        'importance': 'Pewniak CKE (Tier S+)',
        'matura_points_range': '2–4 pkt',
        'lessons': lessons
    }
