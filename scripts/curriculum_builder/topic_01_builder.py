"""
topic_01_builder.py - Dział 1.1: Potęgi i pierwiastki (4 lekcje | Tier S+)
Matryca 5-Task: Baza (SC/TF) -> Pułapka CKE (SC) -> Autentyk CKE (SC) -> Numeryczne (NUMERIC_INPUT) -> Otwarte CKE (OPEN_TASK/OPEN_PROOF)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_01 import get_topic_01_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_01():
    topic_id = 'dzial-1'
    topic_title = 'Potęgi i pierwiastki'
    topic_number = 1
    lessons = []

    # ----------------------------------------------------
    # Lekcja 1.1: Działania na potęgach (L1.1.1)
    # ----------------------------------------------------
    v1 = get_topic_01_visuals(0)
    l1_tasks = [
        # Zadanie 1: Rozgrzewka / Baza pojęciowa
        make_sc_task(
            task_id='task-1-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Wartość iloczynu $2^3 \\cdot 2^4$ jest równa',
            options_data=[
                ('A', '$2^7$'),
                ('B', '$2^{12}$'),
                ('C', '$4^7$'),
                ('D', '$4^{12}$')
            ],
            correct_id='A',
            explanation='Stosujemy prawo mnożenia potęg o tej samej podstawie: $a^m \\cdot a^n = a^{m+n}$.\n$$2^3 \\cdot 2^4 = 2^{3+4} = 2^7$$\nPodstawa $2$ pozostaje bez zmian, a wykładniki dodajemy do siebie.',
            cke_trap='Nigdy nie mnóż podstaw potęg ($2 \\cdot 2 \\neq 4$) ani nie mnóż wykładników przy mnożeniu ($3 \\cdot 4 \\neq 12$).'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka egzaminacyjna
        make_sc_task(
            task_id='task-1-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Dokończ zdanie. Wartość wyrażenia $\\frac{5^{12} + 5^{13} + 5^{14}}{5^{12}}$ jest równa',
            options_data=[
                ('A', '$5^1 + 5^2$'),
                ('B', '$31$'),
                ('C', '$5^{27}$'),
                ('D', '$15$')
            ],
            correct_id='B',
            explanation='W liczniku wyłączamy najmniejszą wspólną potęgę $5^{12}$ przed nawias:\n$$5^{12} + 5^{13} + 5^{14} = 5^{12}(1 + 5^1 + 5^2) = 5^{12}(1 + 5 + 25) = 5^{12} \\cdot 31$$\nDzielimy przez mianownik:\n$$\\frac{5^{12} \\cdot 31}{5^{12}} = 31$$',
            cke_trap='Nigdy nie dodawaj wykładników przy dodawaniu potęg ($5^{12} + 5^{13} + 5^{14} \\neq 5^{39}$). Przy sumie potęg zawsze wyłączaj najmniejszą potęgę przed nawias!'
        ),
        # Zadanie 3: Autentyk CKE Zamknięty 1:1
        make_sc_task(
            task_id='task-1-1-3',
            source='Matura CKE Maj 2024 • Zadanie 2 (1 pkt)',
            question='Dokończ zdanie. Liczba $\\left(\\frac{1}{16}\\right)^8 \\cdot 8^{16}$ jest równa',
            options_data=[
                ('A', '$2^{24}$'),
                ('B', '$2^{16}$'),
                ('C', '$2^{12}$'),
                ('D', '$2^8$')
            ],
            correct_id='B',
            explanation='Sprowadzamy obie potęgi do wspólnej podstawy $2$:\n$$\\frac{1}{16} = 2^{-4} \\longrightarrow \\left(\\frac{1}{16}\\right)^8 = (2^{-4})^8 = 2^{-32}$$\n$$8 = 2^3 \\longrightarrow 8^{16} = (2^3)^{16} = 2^{48}$$\nMnożymy potęgi o tej samej podstawie:\n$$2^{-32} \\cdot 2^{48} = 2^{-32 + 48} = 2^{16}$$',
            cke_trap='Uważaj na znak minus przy zamianie ułamka $\\frac{1}{16}$ na potęgę dwójki: to $2^{-4}$, a nie $2^4$.'
        ),
        # Zadanie 4: Autentyk CKE Krótka Odpowiedź
        make_numeric_task(
            task_id='task-1-1-4',
            source='Matura CKE Czerwiec 2024 • Zadanie 1 (1 pkt)',
            question='Oblicz wartość wyrażenia $2^{-1} \\cdot 32^{\\frac{3}{5}}$. Wpisz wynik jako liczbę całkowitą.',
            correct_val='4',
            explanation='Sprowadzamy liczbę $32$ do potęgi dwójki: $32 = 2^5$.\nWtedy:\n$$32^{\\frac{3}{5}} = (2^5)^{\\frac{3}{5}} = 2^{5 \\cdot \\frac{3}{5}} = 2^3 = 8$$\nObliczamy iloczyn:\n$$2^{-1} \\cdot 8 = \\frac{1}{2} \\cdot 8 = 4$$',
            cke_trap='Nie mnóż $2^{-1}$ przez $32$ przed obliczeniem potęgi. Potęgowanie ma pierwszeństwo przed mnożeniem.'
        ),
        # Zadanie 5: Zadanie Otwarte z Brudnopisem & Krokami
        make_open_task(
            task_id='task-1-1-5',
            source='Informator CKE Formuła 2023 • Zadanie otwarte (2 pkt)',
            question='Wykaż, że liczba $3^{45} + 9^{22} + 27^{14}$ jest podzielna przez $37$. Zapisz pełne uzasadnienie.',
            points=2,
            scoring_key='1 pkt – sprowadzenie wszystkich składników do wspólnej podstawy $3$: $3^{45} + 3^{44} + 3^{42}$.\\n2 pkt – wyłączenie $3^{42}$ przed nawias: $3^{42}(3^3 + 3^2 + 1) = 3^{42} \\cdot 37$ i sformułowanie poprawnego wniosku o podzielności przez 37.',
            explanation='Sprowadzamy wszystkie potęgi do wspólnej podstawy 3:\n$$9^{22} = (3^2)^{22} = 3^{44}, \\quad 27^{14} = (3^3)^{14} = 3^{42}$$\nZapisujemy sumę:\n$$3^{45} + 3^{44} + 3^{42}$$\nWyłączamy najmniejszą potęgę $3^{42}$ przed nawias:\n$$3^{42}(3^3 + 3^2 + 1) = 3^{42}(27 + 9 + 1) = 3^{42} \\cdot 37$$\nPonieważ liczba 37 jest jednym z całkowitych czynników iloczynu, cała liczba jest podzielna przez 37, co kończy dowód.',
            cke_trap='W dowodzie maturalnym kluczem jest wyłączenie najmniejszej potęgi przed nawias, aby wyodrębnić zadany dzielnik.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-1-1',
        topic_id=topic_id,
        title='Działania na potęgach o wykładnikach całkowitych i wymiernych',
        concept_essence=(
            "Potęgowanie to skrócony zapis wielokrotnego mnożenia tej samej liczby: zapis $a^n$ oznacza, że liczbę $a$ (podstawę) mnożysz przez samą siebie $n$ razy (wykładnik).\n\n"
            "Podstawa potęgi jest jak nienaruszalna cegiełka bazy – podczas dodawania wykładników baza nigdy nie ulega zmianie.\n\n"
            "Wykładnik to licznik powtórzeń i operacji – wszystkie prawa działań na potęgach wykonujesz wyłącznie na licznikach na górze.\n\n"
            "Wskazówka: gdy w zadaniu widzisz różne liczby (np. 4, 8, 16 lub 9, 27), Twoim pierwszym krokiem jest zamiana ich na wspólną bazę: najczęściej 2, 3 lub 5."
        ),
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
                {'num': 1, 'label': 'Sprowadzenie do wspólnej podstawy 2', 'text': 'Liczby 4 i 8 zapisujemy jako potęgi dwójki: $4 = 2^2$, $8 = 2^3$. Wtedy $4^3 = (2^2)^3 = 2^6$ oraz $8^4 = (2^3)^4 = 2^{12}$.'},
                {'num': 2, 'label': 'Działania na wykładnikach w liczniku', 'text': 'W liczniku dodajemy wykładniki: $2^7 \\cdot 2^6 = 2^{7+6} = 2^{13}$. Wyrażenie przyjmuje postać $\\frac{2^{13}}{2^{12}}$.'},
                {'num': 3, 'label': 'Ostateczna redukcja i wynik CKE', 'text': 'Odejmujemy wykładnik mianownika od licznika: $2^{13} : 2^{12} = 2^{13-12} = 2^1 = 2$.'}
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
        # Zadanie 1: Rozgrzewka / Baza pojęciowa
        make_sc_task(
            task_id='task-1-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Liczba $\\sqrt{72}$ po wyłączeniu czynnika przed znak pierwiastka jest równa',
            options_data=[
                ('A', '$3\\sqrt{8}$'),
                ('B', '$6\\sqrt{2}$'),
                ('C', '$2\\sqrt{6}$'),
                ('D', '$36\\sqrt{2}$')
            ],
            correct_id='B',
            explanation='Rozkładamy 72 na iloczyn największego kwadratu: $72 = 36 \\cdot 2$. Zatem $\\sqrt{72} = \\sqrt{36 \\cdot 2} = \\sqrt{36} \\cdot \\sqrt{2} = 6\\sqrt{2}$.',
            cke_trap='Choć $72 = 9 \\cdot 8$, to wyciągnięcie $3\\sqrt{8}$ nie jest postacią ostateczną, bo z 8 można jeszcze wyciągnąć 2.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka egzaminacyjna
        make_sc_task(
            task_id='task-1-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Dokończ zdanie. Liczba $\\sqrt{75} - \\sqrt{27}$ jest równa',
            options_data=[
                ('A', '$\\sqrt{48}$'),
                ('B', '$2\\sqrt{3}$'),
                ('C', '$4\\sqrt{3}$'),
                ('D', '$\\sqrt{3}$')
            ],
            correct_id='B',
            explanation='Wyłączamy czynnik przed znak pierwiastka z obu liczb:\n$$\\sqrt{75} = \\sqrt{25 \\cdot 3} = 5\\sqrt{3}$$\n$$\\sqrt{27} = \\sqrt{9 \\cdot 3} = 3\\sqrt{3}$$\nOdejmujemy: $5\\sqrt{3} - 3\\sqrt{3} = (5 - 3)\\sqrt{3} = 2\\sqrt{3}$.',
            cke_trap='Nigdy nie odejmuj liczb pod pierwiastkami: $\\sqrt{75} - \\sqrt{27} \\neq \\sqrt{75 - 27} = \\sqrt{48}$.'
        ),
        # Zadanie 3: Autentyk CKE Zamknięty 1:1
        make_sc_task(
            task_id='task-1-2-3',
            source='Matura sierpień 2023 • Zad. 2',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba $3\\sqrt{45} - \\sqrt{20}$ jest równa',
            options_data=[
                ('A', '$(7 \\cdot 5)^{\\frac{1}{2}}$'),
                ('B', '$5^{\\frac{1}{2}}$'),
                ('C', '$7$'),
                ('D', '$7 \\cdot 5^{\\frac{1}{2}}$')
            ],
            correct_id='D',
            explanation='Wyłączamy czynnik przed znak pierwiastka:\n$$3\\sqrt{45} = 3\\sqrt{9 \\cdot 5} = 3 \\cdot 3\\sqrt{5} = 9\\sqrt{5}$$\n$$\\sqrt{20} = \\sqrt{4 \\cdot 5} = 2\\sqrt{5}$$\nOdejmujemy: $9\\sqrt{5} - 2\\sqrt{5} = 7\\sqrt{5} = 7 \\cdot 5^{\\frac{1}{2}}$.',
            cke_trap='Pamiętaj, że zapis $5^{\\frac{1}{2}}$ oznacza dokładnie $\\sqrt{5}$. Opcja D to $7\\sqrt{5}$.'
        ),
        # Zadanie 4: Autentyk CKE Krótka Odpowiedź
        make_numeric_task(
            task_id='task-1-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz wartość wyrażenia $\\frac{\\sqrt[3]{54}}{\\sqrt[3]{2}}$. Wpisz wynik jako liczbę całkowitą.',
            correct_val='3',
            explanation='Stosujemy regułę ilorazu pierwiastków tego samego stopnia: $\\frac{\\sqrt[3]{54}}{\\sqrt[3]{2}} = \\sqrt[3]{\\frac{54}{2}} = \\sqrt[3]{27} = 3$.',
            cke_trap='Pamiętaj: $\\sqrt[3]{27} = 3$, ponieważ $3^3 = 27$.'
        ),
        # Zadanie 5: Zadanie Otwarte z Brudnopisem & Krokami
        make_open_task(
            task_id='task-1-2-5',
            source='Trening JASNE • Wzorzec CKE',
            question='Wykaż, że liczba $\\frac{\\sqrt{50} + \\sqrt{72}}{\\sqrt{2}}$ jest liczbą całkowitą równą $11$. Zapisz pełne obliczenia.',
            points=2,
            scoring_key='1 pkt – wyłączenie czynników przed pierwiastki: $\\sqrt{50} = 5\\sqrt{2}$ oraz $\\sqrt{72} = 6\\sqrt{2}$ (lub podzielenie każdego składnika w liczniku przez $\\sqrt{2}$).\\n2 pkt – wykonanie redukcji: $\\frac{11\\sqrt{2}}{\\sqrt{2}} = 11$ i sformułowanie wniosku, że $11 \\in \\mathbb{C}$.',
            explanation='Wyłączamy czynniki przed pierwiastki w liczniku:\n$$\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$$\n$$\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$$\nDodajemy wyrazy podobne:\n$$5\\sqrt{2} + 6\\sqrt{2} = 11\\sqrt{2}$$\nDzielimy przez mianownik:\n$$\\frac{11\\sqrt{2}}{\\sqrt{2}} = 11$$\nLiczba 11 jest całkowita, co kończy dowód.',
            cke_trap='Nie skracaj pojedynczego składnika sumy z mianownikiem bez wyłączenia wspólnego czynnika przed nawias.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-1-2',
        topic_id=topic_id,
        title='Działania na pierwiastkach i wyłączanie czynnika przed znak pierwiastka',
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
        # Zadanie 1: Rozgrzewka / Baza pojęciowa
        make_sc_task(
            task_id='task-1-3-1',
            source='Trening JASNE • Wzorzec CKE',
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
        # Zadanie 2: Wzorzec CKE / Pułapka egzaminacyjna
        make_sc_task(
            task_id='task-1-3-2',
            source='Trening JASNE • Wzorzec CKE',
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
        # Zadanie 3: Autentyk CKE Zamknięty 1:1
        make_sc_task(
            task_id='task-1-3-3',
            source='Matura czerwiec 2024 • Zad. 1',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba $2^{-1} \\cdot 32^{\\frac{3}{5}}$ jest równa',
            options_data=[
                ('A', '$-16$'),
                ('B', '$-4$'),
                ('C', '$2$'),
                ('D', '$4$')
            ],
            correct_id='D',
            explanation='Przekształcamy potęgi o podstawie 2:\n$$2^{-1} = \\frac{1}{2}$$\n$$32^{\\frac{3}{5}} = (2^5)^{\\frac{3}{5}} = 2^{5 \\cdot \\frac{3}{5}} = 2^3 = 8$$\nObliczamy iloczyn:\n$$2^{-1} \\cdot 32^{\\frac{3}{5}} = \\frac{1}{2} \\cdot 8 = 4$$\nPoprawna odpowiedź to D.',
            cke_trap='Pamiętaj, że $2^{-1} = \\frac{1}{2}$ (odwrotność), a nie $-2$. Wykładnik ujemny odwraca liczbę, a nie zmienia jej znak na minus!'
        ),
        # Zadanie 4: Autentyk CKE Krótka Odpowiedź
        make_numeric_task(
            task_id='task-1-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz wartość wyrażenia $\\frac{1}{\\sqrt{2} - 1} - \\sqrt{2}$. Wpisz wynik jako liczbę całkowitą.',
            correct_val='1',
            explanation='Usuwamy niewymierność z pierwszego ułamka:\n$$\\frac{1(\\sqrt{2} + 1)}{(\\sqrt{2} - 1)(\\sqrt{2} + 1)} = \\frac{\\sqrt{2} + 1}{2 - 1} = \\sqrt{2} + 1$$\nOdejmujemy $\\sqrt{2}$: $(\\sqrt{2} + 1) - \\sqrt{2} = 1$.',
            cke_trap='Pamiętaj, że $(\\sqrt{2})^2 - 1 = 2 - 1 = 1$, więc mianownik całkowicie znika.'
        ),
        # Zadanie 5: Zadanie Otwarte z Brudnopisem & Krokami
        make_open_task(
            task_id='task-1-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question='Wykaż, że liczba $\\frac{1}{\\sqrt{3} - \\sqrt{2}} - \\frac{1}{\\sqrt{3} + \\sqrt{2}}$ jest równa $2\\sqrt{2}$. Zapisz pełne uzasadnienie.',
            points=2,
            scoring_key='1 pkt – usunięcie niewymierności z obu ułamków przez pomnożenie przez ich sprzężenia: $\\frac{\\sqrt{3}+\\sqrt{2}}{3-2} - \\frac{\\sqrt{3}-\\sqrt{2}}{3-2}$.\\n2 pkt – wykonanie redukcji: $(\\sqrt{3} + \\sqrt{2}) - (\\sqrt{3} - \\sqrt{2}) = \\sqrt{3} + \\sqrt{2} - \\sqrt{3} + \\sqrt{2} = 2\\sqrt{2}$ i sformułowanie wniosku.',
            explanation='Usuwamy niewymierność z obu mianowników:\n$$\\frac{1}{\\sqrt{3} - \\sqrt{2}} = \\frac{\\sqrt{3} + \\sqrt{2}}{(\\sqrt{3})^2 - (\\sqrt{2})^2} = \\frac{\\sqrt{3} + \\sqrt{2}}{3 - 2} = \\sqrt{3} + \\sqrt{2}$$\n$$\\frac{1}{\\sqrt{3} + \\sqrt{2}} = \\frac{\\sqrt{3} - \\sqrt{2}}{(\\sqrt{3})^2 - (\\sqrt{2})^2} = \\frac{\\sqrt{3} - \\sqrt{2}}{3 - 2} = \\sqrt{3} - \\sqrt{2}$$\nOdejmujemy drugie wyrażenie od pierwszego:\n$$(\\sqrt{3} + \\sqrt{2}) - (\\sqrt{3} - \\sqrt{2}) = \\sqrt{3} + \\sqrt{2} - \\sqrt{3} + \\sqrt{2} = 2\\sqrt{2}$$\nCo kończy dowód.',
            cke_trap='Pamiętaj o nawiasie przy odejmowaniu drugiego ułamka: minus przed nawiasem zmienia znak każdego składnika wewnątrz.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-1-3',
        topic_id=topic_id,
        title='Usuwanie niewymierności z mianownika',
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
                {'num': 1, 'label': 'Wyznaczenie sprzężenia mianownika', 'text': 'Sprzężeniem mianownika $\\sqrt{5} - 1$ jest $\\sqrt{5} + 1$. Mnożymy licznik i mianownik.'},
                {'num': 2, 'label': 'Zastosowanie wzoru skróconego mnożenia', 'text': 'W mianowniku: $(\\sqrt{5} - 1)(\\sqrt{5} + 1) = (\\sqrt{5})^2 - 1^2 = 5 - 1 = 4$.'},
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
        # Zadanie 1: Rozgrzewka / Baza pojęciowa
        make_sc_task(
            task_id='task-1-4-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Liczba $\\left(\\frac{2}{3}\\right)^{-2}$ jest równa',
            options_data=[
                ('A', '$-\\frac{4}{9}$'),
                ('B', '$\\frac{9}{4}$'),
                ('C', '$-\\frac{9}{4}$'),
                ('D', '$\\frac{4}{9}$')
            ],
            correct_id='B',
            explanation='Minus w wykładniku odwraca ułamek: $\\left(\\frac{2}{3}\\right)^{-2} = \\left(\\frac{3}{2}\\right)^2 = \\frac{3^2}{2^2} = \\frac{9}{4}$.',
            cke_trap='Minus w wykładniku nie tworzy liczby ujemnej. On jedynie odwraca ułamek do góry nogami.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka egzaminacyjna
        make_sc_task(
            task_id='task-1-4-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Dokończ zdanie. Liczba $3^{-2}$ jest równa',
            options_data=[
                ('A', '$-6$'),
                ('B', '$-9$'),
                ('C', '$\\frac{1}{9}$'),
                ('D', '$\\frac{1}{6}$')
            ],
            correct_id='C',
            explanation='Stosujemy regułę $a^{-n} = \\frac{1}{a^n}$. Zatem $3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}$. Wynik jest ściśle dodatni.',
            cke_trap='Najczęstszy błąd: $3^{-2} = -6$ (pomnożenie podstawy przez wykładnik) lub $3^{-2} = -9$ (przypisanie minusa do wyniku potęgowania).'
        ),
        # Zadanie 3: Autentyk CKE Zamknięty 1:1
        make_sc_task(
            task_id='task-1-4-3',
            source='Matura sierpień 2024 • Zad. 2',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba $\\left(\\frac{4}{25}\\right)^{-0{,}5}$ jest równa',
            options_data=[
                ('A', '$0{,}04$'),
                ('B', '$0{,}8$'),
                ('C', '$2{,}5$'),
                ('D', '$0{,}4$')
            ],
            correct_id='C',
            explanation='Zapisujemy wykładnik dziesiętny jako ułamek: $-0{,}5 = -\\frac{1}{2}$.\nMinus w wykładniku odwraca ułamek:\n$$\\left(\\frac{4}{25}\\right)^{-\\frac{1}{2}} = \\left(\\frac{25}{4}\\right)^{\\frac{1}{2}}$$\nWykładnik $\\frac{1}{2}$ oznacza pierwiastek kwadratowy:\n$$\\sqrt{\\frac{25}{4}} = \\frac{5}{2} = 2{,}5$$',
            cke_trap='Minus w wykładniku nie tworzy liczby ujemnej. Dystraktory ujemne są celowo eliminowane z klucza CKE.'
        ),
        # Zadanie 4: Autentyk CKE Krótka Odpowiedź
        make_numeric_task(
            task_id='task-1-4-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz wartość potęgi $27^{\\frac{4}{3}}$. Wpisz wynik jako liczbę całkowitą.',
            correct_val='81',
            explanation='Mianownik 3 zamienia się na pierwiastek sześcienny: $27^{\\frac{4}{3}} = (\\sqrt[3]{27})^4 = 3^4 = 81$.',
            cke_trap='Zawsze najpierw wyciągaj pierwiastek ($\\sqrt[3]{27} = 3$), a dopiero potem potęguj ($3^4 = 81$).'
        ),
        # Zadanie 5: Zadanie Otwarte z Brudnopisem & Krokami
        make_open_task(
            task_id='task-1-4-5',
            source='Trening JASNE • Wzorzec CKE',
            question='Wykaż, że dla każdej liczby rzeczywistej $a > 0$ wartość wyrażenia $\\frac{a^{-2} \\cdot (a^3)^2}{a^5}$ jest równa $\\frac{1}{a}$. Zapisz obliczenia.',
            points=2,
            scoring_key='1 pkt – uproszczenie licznika: $a^{-2} \\cdot a^6 = a^{-2+6} = a^4$.\\n2 pkt – wykonanie dzielenia potęg: $\\frac{a^4}{a^5} = a^{4-5} = a^{-1} = \\frac{1}{a}$ i sformułowanie wniosku.',
            explanation='Upraszczamy licznik ze wzorów na potęgowanie potęgi i mnożenie potęg:\n$$(a^3)^2 = a^{3 \\cdot 2} = a^6$$\n$$a^{-2} \\cdot a^6 = a^{-2+6} = a^4$$\nDzielimy przez mianownik:\n$$\\frac{a^4}{a^5} = a^{4-5} = a^{-1} = \\frac{1}{a}$$\nCo należało wykazać.',
            cke_trap='Pamiętaj: $a^{-1} = \\frac{1}{a}$. Nie myl wykładnika potęgi ze współczynnikiem liczbowym.'
        )
    ]
    l4 = make_lesson(
        lesson_id='lesson-1-4',
        topic_id=topic_id,
        title='Potęgi o wykładniku ujemnym i ułamkowym w zadaniach maturalnych CKE',
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
        'topic_number': topic_number,
        'order': topic_number,
        'short_title': 'Potęgi i pierwiastki',
        'importance': 'Pewniak CKE (Tier S+)',
        'matura_points_range': '2–4 pkt',
        'lessons': lessons
    }
