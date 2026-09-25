"""
topic_04_builder.py - Dział 1.4: Wzory skróconego mnożenia i algebra (3 lekcje | Tier S)
Żelazna matryca 5-Task: T1 Baza, T2 Pułapka CKE, T3 CKE 1:1, T4 Numeryczne, T5 Otwarte/Dowód z kryteriami.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_04 import get_topic_04_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_open_proof, make_lesson

def build_topic_04():
    topic_id = 'dzial-4'
    topic_title = 'Wzory skróconego mnożenia i algebra'
    topic_number = 4
    lessons = []

    # ----------------------------------------------------
    # Lekcja 4.1: Kwadrat sumy i kwadrat różnicy (L1.4.1)
    # ----------------------------------------------------
    v1 = get_topic_04_visuals(0)
    l1_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-4-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Wyrażenie $(2x + 3)^2$ po zastosowaniu wzoru skróconego mnożenia jest równe',
            options_data=[
                ('A', '$4x^2 + 9$'),
                ('B', '$4x^2 + 6x + 9$'),
                ('C', '$4x^2 + 12x + 9$'),
                ('D', '$2x^2 + 12x + 9$')
            ],
            correct_id='C',
            explanation='$(2x + 3)^2 = (2x)^2 + 2 \\cdot (2x) \\cdot 3 + 3^2 = 4x^2 + 12x + 9$. Wyraz środkowy to $2ab = 12x$.',
            cke_trap='Nigdy nie zapominaj o podwójnym iloczynie $2ab$ — podnoszenie każdego składnika osobno to kardynalny błąd.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-4-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Trójmian kwadratowy $9x^2 - 30x + 25$ można zapisać w postaci',
            options_data=[
                ('A', '$(3x + 5)^2$'),
                ('B', '$(3x - 5)^2$'),
                ('C', '$(9x - 25)^2$'),
                ('D', '$(3x - 5)(3x + 5)$')
            ],
            correct_id='B',
            explanation='Pierwszy wyraz to $(3x)^2$, ostatni to $5^2$, a środkowy to $-2 \\cdot 3x \\cdot 5 = -30x$. Zatem wyrażenie zwija się do $(3x - 5)^2$.',
            cke_trap='Znak minus przy wyrazie środkowym $-30x$ oznacza, że w nawiasie musi być minus: $(3x - 5)^2$.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-4-1-3',
            source='Matura maj 2024 • Zad. 5',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDla każdej liczby rzeczywistej $a$ i dla każdej liczby rzeczywistej $b$ wartość wyrażenia $(2a + b)^2 - (2a - b)^2$ jest równa wartości wyrażenia',
            options_data=[
                ('A', '$8a^2$'),
                ('B', '$8ab$'),
                ('C', '$-8ab$'),
                ('D', '$2b^2$')
            ],
            correct_id='B',
            explanation='Rozwijamy oba wyrażenia ze wzorów skróconego mnożenia na kwadrat sumy i kwadrat różnicy:\n$$(2a + b)^2 = 4a^2 + 4ab + b^2$$\n$$(2a - b)^2 = 4a^2 - 4ab + b^2$$\nOdejmujemy drugie wyrażenie od pierwszego:\n$$(4a^2 + 4ab + b^2) - (4a^2 - 4ab + b^2) = 4a^2 + 4ab + b^2 - 4a^2 + 4ab - b^2 = 8ab$$',
            cke_trap='Minus przed drugim nawiasem zmienia znak każdego składnika wewnątrz: $-(4a^2 - 4ab + b^2) = -4a^2 + 4ab - b^2$. Uważaj, aby nie pominąć podwojonego iloczynu $2 \\cdot 2a \\cdot b = 4ab$.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-4-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz wartość liczbową wyrażenia $(\\sqrt{3} + 2)^2 + (\\sqrt{3} - 2)^2$. Wpisz wynik w pole poniżej.',
            correct_val='14',
            explanation='$(\\sqrt{3} + 2)^2 = 3 + 4\\sqrt{3} + 4 = 7 + 4\\sqrt{3}$.\n$(\\sqrt{3} - 2)^2 = 3 - 4\\sqrt{3} + 4 = 7 - 4\\sqrt{3}$.\nSuma: $7 + 4\\sqrt{3} + 7 - 4\\sqrt{3} = 14$. Wyrazy z pierwiastkiem redukują się wzajemnie.',
            cke_trap='Podwójne iloczyny mają przeciwne znaki i kasują się nawzajem.'
        ),
        # Zadanie 5: Zadanie otwarte / Dowód z kryteriami
        make_open_proof(
            task_id='task-4-1-5',
            source='Informator CKE • Zad. 5',
            question='Wykaż, że dla każdej liczby rzeczywistej $x$ zachodzi nierówność $x^2 - 6x + 10 > 0$. Zapisz pełne uzasadnienie.',
            points=2,
            scoring_key='1 pkt – zapisanie trójmianu w postaci sumy kwadratu i liczby dodatniej: $(x - 3)^2 + 1$.\\n2 pkt – pełne uzasadnienie: kwadrat dowolnej liczby rzeczywistej jest nieujemny: $(x - 3)^2 \\ge 0$, stąd $(x - 3)^2 + 1 \\ge 1 > 0$, co kończy dowód.',
            explanation='Zapisujemy trójmian w postaci kanonicznej (zwijamy część ze zmienną ze wzoru skróconego mnożenia):\n$$x^2 - 6x + 10 = (x^2 - 6x + 9) + 1 = (x - 3)^2 + 1$$\nDla każdej liczby rzeczywistej $x$ kwadrat $(x - 3)^2 \\ge 0$.\nDodając $1$ do obu stron nierówności, otrzymujemy:\n$$(x - 3)^2 + 1 \\ge 0 + 1 = 1 > 0$$\nZatem wyrażenie przyjmuje wartości ściśle dodatnie dla każdego $x \\in \\mathbb{R}$, co kończy dowód.',
            cke_trap='Nie wystarczy policzyć wyróżnika $\\Delta = (-6)^2 - 4 \\cdot 1 \\cdot 10 = -4 < 0$ bez dopisania komentarza o znaku współczynnika $a = 1 > 0$ i ramionach paraboli skierowanych w górę.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-4-1',
        topic_id=topic_id,
        title='Kwadrat sumy i kwadrat różnicy – rozwijanie, zwijanie i wyraz 2ab',
        concept_essence='Kwadrat sumy $(a + b)^2$ to pole kwadratu o boku $(a + b)$. Składa się z czterech części: kwadratu o polu $a^2$, dwóch prostokątów o polu $ab$ (stąd $2ab$!) oraz kwadratu o polu $b^2$. Nigdy nie pisz $(a + b)^2 = a^2 + b^2$! Zawsze pamiętaj o mantrze: kwadrat pierwszego, podwojony iloczyn, kwadrat drugiego.',
        matura_context='Podstawa algebry maturalnej — występuje bezpośrednio w zadaniu za 1 pkt oraz jako element składowy w geometrii analitycznej i zadaniach z planimetrii.',
        core_formulas=[
            {
                'title': 'Kwadrat sumy',
                'latex': '(a + b)^2 = a^2 + 2ab + b^2',
                'description': 'Kwadrat pierwszego plus podwojony iloczyn plus kwadrat drugiego.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': '(x + 5)^2 = x^2 + 10x + 25',
                'mnemonic': 'Kwadrat, podwojony iloczyn, kwadrat.',
                'matura_tip': 'Nie zgub wyrazu 2ab.'
            },
            {
                'title': 'Kwadrat różnicy',
                'latex': '(a - b)^2 = a^2 - 2ab + b^2',
                'description': 'Minus stoi wyłącznie przy podwojonym iloczynie.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': '(2x - 3)^2 = 4x^2 - 12x + 9',
                'mnemonic': 'Ostatni wyraz $+b^2$ jest ZAWSZE ze znakiem plus.',
                'matura_tip': '$(-b)^2 = +b^2$, więc na końcu trójmianu zawsze jest dodawanie.'
            }
        ],
        worked_example={
            'problem': 'Rozwiń wyrażenie $(3x - 2)^2$ i zredukuj wyrazy podobne.',
            'steps': [
                {'num': 1, 'label': 'Zidentyfikowanie składników', 'text': 'Wybieramy $a = 3x$ oraz $b = 2$.'},
                {'num': 2, 'label': 'Zastosowanie wzoru na kwadrat różnicy', 'text': 'Układamy wzór: $(3x)^2 - 2 \\cdot (3x) \\cdot 2 + 2^2$.'},
                {'num': 3, 'label': 'Wykonanie potęgowań i mnożeń', 'text': '$(3x)^2 = 9x^2$, iloczyn środkowy to $-12x$, a kwadrat to $+4$. Wynik to $9x^2 - 12x + 4$.'}
            ],
            'result': '9x^2 - 12x + 4'
        },
        exam_trap='Typowy błąd: Zapominanie o podwojonym iloczynie: $(a + b)^2 = a^2 + b^2$ (tzw. grzech licealisty).\n\nPoprawnie: $(a + b)^2 = a^2 + 2ab + b^2$. Zawsze sprawdzaj, czy Twój wynik ma TRZY składniki.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 4.2: Różnica kwadratów i usuwanie niewymierności (L1.4.2)
    # ----------------------------------------------------
    v2 = get_topic_04_visuals(1)
    l2_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-4-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Wartość wyrażenia $(3 - \\sqrt{5})(3 + \\sqrt{5})$ jest równa',
            options_data=[
                ('A', '$4$'),
                ('B', '$14$'),
                ('C', '$-4$'),
                ('D', '$9 - \\sqrt{5}$')
            ],
            correct_id='A',
            explanation='Stosujemy wzór $(a - b)(a + b) = a^2 - b^2$: $3^2 - (\\sqrt{5})^2 = 9 - 5 = 4$.',
            cke_trap='Wzór na różnicę kwadratów ZAWSZE likwiduje pierwiastki kwadratowe i wyraz środkowy.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-4-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Wyrażenie $16 - 25x^2$ po rozłożeniu na czynniki ma postać',
            options_data=[
                ('A', '$(4 - 5x)^2$'),
                ('B', '$(4 - 5x)(4 + 5x)$'),
                ('C', '$(5x - 4)(5x + 4)$'),
                ('D', '$(16 - 5x)(1 + 5x)$')
            ],
            correct_id='B',
            explanation='$16 - 25x^2 = 4^2 - (5x)^2 = (4 - 5x)(4 + 5x)$. Zwróć uwagę na kolejność: pierwszy wyraz to 4, a nie 5x.',
            cke_trap='Nie zamieniaj kolejności składników — $16 - 25x^2 \\ne 25x^2 - 16$.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-4-2-3',
            source='Informator CKE • Zad. 4',
            question='Liczba $\\frac{4}{\\sqrt{5} - 1}$ po usunięciu niewymierności z mianownika jest równa',
            options_data=[
                ('A', '$\\sqrt{5} + 1$'),
                ('B', '$\\sqrt{5} - 1$'),
                ('C', '$4\\sqrt{5} + 4$'),
                ('D', '$\\frac{\\sqrt{5} + 1}{4}$')
            ],
            correct_id='A',
            explanation='Mnożymy licznik i mianownik przez sprzężenie $(\\sqrt{5} + 1)$:\n$$\\frac{4}{\\sqrt{5} - 1} = \\frac{4(\\sqrt{5} + 1)}{(\\sqrt{5} - 1)(\\sqrt{5} + 1)} = \\frac{4(\\sqrt{5} + 1)}{5 - 1} = \\frac{4(\\sqrt{5} + 1)}{4} = \\sqrt{5} + 1$$',
            cke_trap='W mianowniku powstaje różnica kwadratów $(\\sqrt{5})^2 - 1^2 = 5 - 1 = 4$, która skraca się z czwórką w liczniku.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-4-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz wartość iloczynu $49 \\cdot 51$ korzystając ze wzoru na różnicę kwadratów $(50 - 1)(50 + 1)$. Wpisz wynik w pole poniżej.',
            correct_val='2499',
            explanation='$(50 - 1)(50 + 1) = 50^2 - 1^2 = 2500 - 1 = 2499$.',
            cke_trap='Kwadrat 50 to 2500, odejmujesz 1 i otrzymujesz 2499 bez użycia kalkulatora.'
        ),
        # Zadanie 5: Zadanie otwarte / Dowód z kryteriami
        make_open_proof(
            task_id='task-4-2-5',
            source='Informator CKE • Zad. 8',
            question='Wykaż, że dla każdej liczby rzeczywistej $a \\ne 1$ i $a \\ne -1$ wartość wyrażenia $\\frac{2}{a + 1} - \\frac{2}{a - 1}$ jest równa $\\frac{-4}{a^2 - 1}$. Zapisz uzasadnienie.',
            points=2,
            scoring_key='1 pkt – sprowadzenie obu ułamków do wspólnego mianownika $(a + 1)(a - 1) = a^2 - 1$: $\\frac{2(a - 1) - 2(a + 1)}{a^2 - 1}$.\\n2 pkt – poprawne wykonanie odejmowania w liczniku: $2a - 2 - 2a - 2 = -4$ i sformułowanie wniosku.',
            explanation='Sprowadzamy ułamki do wspólnego mianownika $(a+1)(a-1) = a^2 - 1$:\n$$\\frac{2}{a+1} - \\frac{2}{a-1} = \\frac{2(a-1) - 2(a+1)}{(a+1)(a-1)} = \\frac{2a - 2 - 2a - 2}{a^2 - 1} = \\frac{-4}{a^2 - 1}$$\nCo kończy dowód tożsamości.',
            cke_trap='Uważaj na znak minus przed drugim ułamkiem: $-2(a+1) = -2a - 2$, a nie $-2a + 2$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-4-2',
        topic_id=topic_id,
        title='Wzór na różnicę kwadratów i usuwanie niewymierności',
        concept_essence='Wzór na różnicę kwadratów $a^2 - b^2 = (a - b)(a + b)$ działa w dwie strony: do likwidacji pierwiastków w mianowniku (mnożenie przez sprzężenie) oraz do zamiany sumy na iloczyn nawiasów. Jest to najszybszy sposób rozwiązywania równań wyższych stopni.',
        matura_context='Usuwanie niewymierności z mianownika oraz rozkład różnicy kwadratów to absolutny klasyk matury za 1 punkt.',
        core_formulas=[
            {
                'title': 'Różnica kwadratów',
                'latex': 'a^2 - b^2 = (a - b)(a + b)',
                'description': 'Różnica kwadratów rozkłada się na iloczyn różnicy i sumy.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': 'x^2 - 9 = (x - 3)(x + 3)',
                'mnemonic': 'Różnica kwadratów to dwa nawiasy: z minusem i z plusem.',
                'matura_tip': 'Suma kwadratów $a^2 + b^2$ NIE rozkłada się w liczbach rzeczywistych!'
            },
            {
                'title': 'Usuwanie niewymierności z mianownika (sprzężenie)',
                'latex': '\\frac{c}{\\sqrt{a} - \\sqrt{b}} = \\frac{c(\\sqrt{a} + \\sqrt{b})}{a - b}',
                'description': 'Mnożymy górę i dół przez mianownik ze zmienionym znakiem.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': '\\frac{2}{\\sqrt{3} - 1} = \\frac{2(\\sqrt{3} + 1)}{3 - 1} = \\sqrt{3} + 1',
                'mnemonic': 'Sprzężenie to ten sam mianownik, ale z przeciwnym znakiem.',
                'matura_tip': 'Zawsze zapisuj mianownik w nawiasie przed mnożeniem.'
            }
        ],
        worked_example={
            'problem': 'Usuń niewymierność z mianownika ułamka $\\frac{6}{\\sqrt{7} - 1}$.',
            'steps': [
                {'num': 1, 'label': 'Dobranie sprzężenia mianownika', 'text': 'Dla wyrażenia $(\\sqrt{7} - 1)$ sprzężeniem jest $(\\sqrt{7} + 1)$.'},
                {'num': 2, 'label': 'Mnożenie licznika i mianownika', 'text': '$\\frac{6(\\sqrt{7} + 1)}{(\\sqrt{7} - 1)(\\sqrt{7} + 1)}$.'},
                {'num': 3, 'label': 'Zastosowanie wzoru na różnicę kwadratów i skrócenie', 'text': 'W mianowniku: $(\\sqrt{7})^2 - 1^2 = 7 - 1 = 6$. Szóstka z licznika i mianownika skraca się, dając $\\sqrt{7} + 1$.'}
            ],
            'result': '\\sqrt{7} + 1'
        },
        exam_trap='Typowy błąd: Mnożenie mianownika przez samego siebie zamiast przez sprzężenie, np. mnożenie $\\sqrt{3} + 1$ przez $\\sqrt{3}$.\n\nPoprawnie: Zawsze mnóż przez dwumian ze zmienionym znakiem $(\\sqrt{3} - 1)$, by zastosować wzór $a^2 - b^2$.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 4.3: Wyłączanie wspólnego czynnika i grupowanie (L1.4.3)
    # ----------------------------------------------------
    v3 = get_topic_04_visuals(2)
    l3_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-4-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Wyrażenie $6x^3 - 9x^2$ po wyłączeniu największego wspólnego jednomianu przed nawias ma postać',
            options_data=[
                ('A', '$3x(2x^2 - 3x)$'),
                ('B', '$3x^2(2x - 3)$'),
                ('C', '$x^2(6x - 9)$'),
                ('D', '$3x^2(2x + 3)$')
            ],
            correct_id='B',
            explanation='Największym wspólnym czynnikiem dla liczb 6 i 9 jest 3, a dla potęg $x^3$ i $x^2$ jest $x^2$. Zatem wyłączamy $3x^2$: $3x^2(2x - 3)$.',
            cke_trap='Zawsze wyłączaj najwyższą możliwą potęgę $x$ (tutaj $x^2$, nie samo $x$).'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-4-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Gdy z wyrażenia $-4x + 8$ wyłączymy przed nawias liczbę $-4$, to w nawiasie otrzymamy',
            options_data=[
                ('A', '$x + 2$'),
                ('B', '$x - 2$'),
                ('C', '$-x + 2$'),
                ('D', '$x + 8$')
            ],
            correct_id='B',
            explanation='Dzielimy oba składniki przez $-4$: $(-4x) : (-4) = x$ oraz $(+8) : (-4) = -2$. Otrzymujemy $-4(x - 2)$.',
            cke_trap='Wyciągnięcie minusa przed nawias ZAWSZE odwraca znaki wszystkich wyrazów wewnątrz nawiasu.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-4-3-3',
            source='Informator CKE • Zad. 12',
            question='Wielomian $W(x) = x^3 - 2x^2 - 9x + 18$ po rozłożeniu na czynniki metodą grupowania wyrazów ma postać',
            options_data=[
                ('A', '$(x - 2)(x - 3)(x + 3)$'),
                ('B', '$(x + 2)(x - 3)(x + 3)$'),
                ('C', '$(x - 2)(x^2 + 9)$'),
                ('D', '$(x^2 - 9)(x + 2)$')
            ],
            correct_id='A',
            explanation='$W(x) = x^2(x - 2) - 9(x - 2) = (x - 2)(x^2 - 9) = (x - 2)(x - 3)(x + 3)$.',
            cke_trap='Nie zapomnij rozłożyć nawiasu $(x^2 - 9)$ ze wzoru na różnicę kwadratów na $(x - 3)(x + 3)$.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-4-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Wielomian $W(x) = x^3 - 3x^2 - 4x + 12$ ma trzy pierwiastki rzeczywiste. Oblicz sumę wszystkich pierwiastków tego wielomianu. Wpisz wynik w pole poniżej.',
            correct_val='3',
            explanation='Grupujemy w pary: $x^2(x - 3) - 4(x - 3) = 0 \\implies (x - 3)(x^2 - 4) = 0 \\implies (x - 3)(x - 2)(x + 2) = 0$.\nPierwiastki to: $x_1 = 3$, $x_2 = 2$, $x_3 = -2$.\nSuma: $3 + 2 + (-2) = 3$.',
            cke_trap='Uważaj na znaki pierwiastków: nawias $(x - 3)$ daje $x = 3$, a nie $-3$.'
        ),
        # Zadanie 5: Zadanie otwarte / Dowód CKE z kryteriami
        make_open_proof(
            task_id='task-4-3-5',
            source='Matura czerwiec 2024 • Zad. 5',
            question='Wykaż, że dla każdej liczby naturalnej $n \\ge 1$ liczba $5n^3 - 5n$ jest podzielna przez $30$. Zapisz pełne uzasadnienie.',
            points=2,
            scoring_key='1 pkt – wyłączenie wspólnego czynnika i rozkład ze wzoru na różnicę kwadratów: $5n^3 - 5n = 5n(n^2 - 1) = 5(n - 1)n(n + 1)$.\\n2 pkt – uzasadnienie: iloczyn trzech kolejnych liczb naturalnych $(n - 1)n(n + 1)$ jest podzielny przez $2$ i przez $3$, czyli przez $6$. Ponieważ $5 \\cdot 6 = 30$, liczba jest podzielna przez $30$, co kończy dowód.',
            explanation='Wyłączamy wspólny czynnik $5n$ przed nawias:\n$$5n^3 - 5n = 5n(n^2 - 1)$$\nStosujemy wzór na różnicę kwadratów $n^2 - 1 = (n - 1)(n + 1)$:\n$$5n^3 - 5n = 5(n - 1)n(n + 1)$$\nWyrażenie $(n - 1)n(n + 1)$ to iloczyn trzech kolejnych liczb całkowitych. Wśród trzech kolejnych liczb całkowitych:\n1) Co najmniej jedna jest parzysta (podzielna przez 2).\n2) Dokładnie jedna jest podzielna przez 3.\nZatem iloczyn $(n - 1)n(n + 1)$ jest podzielny przez $2 \\cdot 3 = 6$.\nPo pomnożeniu przez $5$ cała liczba $5(n - 1)n(n + 1)$ jest podzielna przez $5 \\cdot 6 = 30$, co kończy dowód.',
            cke_trap='Kluczowe w dowodzie podzielności jest powołanie się na iloczyn trzech kolejnych liczb całkowitych.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-4-3',
        topic_id=topic_id,
        title='Wyłączanie wspólnego czynnika przed nawias i grupowanie wyrazów',
        concept_essence='Grupowanie wyrazów to technika rozkładania wielomianów 4-wyrazowych na iloczyn nawiasów. Dzielisz wielomian na dwie pary. Z pierwszej wyciągasz $x^2$, z drugiej liczbę (często ujemną!). W obu częściach MUSI pojawić się dokładnie ten sam nawias. Wyciągasz go przed nawias główny, a powstałą różnicę kwadratów rozbijasz na dwa nawiasy liniowe.',
        matura_context='Zadanie otwarte za 2 punkty z rozwiązywania równania trzeciego stopnia metodą grupowania pojawia się regularnie w arkuszach maturalnych.',
        core_formulas=[
            {
                'title': 'Wyłączanie wspólnego czynnika',
                'latex': 'ax + ay = a(x + y)',
                'description': 'Dzielenie każdego wyrazu przez ten sam wspólny czynnik.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': '3x^2 - 6x = 3x(x - 2)',
                'mnemonic': 'Odwrócenie mnożenia przez nawias.',
                'matura_tip': 'Sprawdź swój wynik wymnażając nawias z powrotem.'
            },
            {
                'title': 'Grupowanie wyrazów w pary',
                'latex': 'x^3 - ax^2 - bx + ab = x^2(x - a) - b(x - a) = (x - a)(x^2 - b)',
                'description': 'Standardowy schemat rozkładu wielomianów 3. stopnia.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': 'x^3 - 3x^2 - 4x + 12 = (x - 3)(x - 2)(x + 2)',
                'mnemonic': 'Dwie drużyny po dwa wyrazy, wspólny nawias na czele.',
                'matura_tip': 'Uważaj na znak minus przy wyłączaniu z drugiej pary.'
            }
        ],
        worked_example={
            'problem': 'Rozłóż na czynniki wielomian $P(x) = 3x^3 - x^2 - 12x + 4$.',
            'steps': [
                {'num': 1, 'label': 'Podział na pary', 'text': 'Grupujemy: $(3x^3 - x^2) - (12x - 4)$.'},
                {'num': 2, 'label': 'Wyłączenie wspólnych czynników', 'text': 'Z pierwszej pary wyłączamy $x^2$, z drugiej $-4$: $x^2(3x - 1) - 4(3x - 1)$.'},
                {'num': 3, 'label': 'Wyłączenie wspólnego nawiasu i różnica kwadratów', 'text': '$(3x - 1)(x^2 - 4) = (3x - 1)(x - 2)(x + 2)$.'}
            ],
            'result': '(3x - 1)(x - 2)(x + 2)'
        },
        exam_trap='Typowy błąd: Zgubienie minusa przy wyłączaniu z drugiej pary: $-12x + 4 = -4(3x + 1)$ — nawiasy nie pasują do siebie!\n\nPoprawnie: Zawsze dziel z uwzględnieniem znaku: $(+4) : (-4) = -1$, stąd nawias to $(3x - 1)$.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'order': topic_number,
        'tier': 'Tier S',
        'badge': 'NA 30% • PEWNIAK MATURALNY',
        'estimated_time_formatted': '3 lekcje (~15 min)',
        'description': 'Kwadrat sumy i różnicy, różnica kwadratów, usuwanie niewymierności z mianownika oraz rozkład wielomianów metodą grupowania wyrazów.',
        'lessons': lessons
    }

if __name__ == '__main__':
    t = build_topic_04()
    print(f"Pomyślnie zbudowano {t['title']} ({len(t['lessons'])} lekcje, {sum(len(l['tasks']) for l in t['lessons'])} zadań).")
