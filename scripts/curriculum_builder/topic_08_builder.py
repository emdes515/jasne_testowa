"""
topic_08_builder.py - Dział 1.8: Nierówności kwadratowe (4 lekcje | Tier S+)
Żelazna matryca 5-Task: T1 Baza, T2 Pułapka CKE, T3 CKE 1:1, T4 Numeryczne, T5 Otwarte/Dowód z kryteriami.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_08 import get_topic_08_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_open_proof, make_lesson

def build_topic_08():
    topic_id = 'dzial-8'
    topic_title = 'Nierówności kwadratowe'
    topic_number = 8
    lessons = []

    # ----------------------------------------------------
    # Lekcja 8.1: Wyróżnik Delta i miejsca zerowe trójmianu (L1.8.1)
    # ----------------------------------------------------
    v1 = get_topic_08_visuals(0)
    l1_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-8-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Wyróżnik $\\Delta$ trójmianu kwadratowego $y = x^2 - 5x + 6$ wynosi',
            options_data=[
                ('A', '$1$'),
                ('B', '$-1$'),
                ('C', '$49$'),
                ('D', '$0$')
            ],
            correct_id='A',
            explanation='Wzór na deltę to $\\Delta = b^2 - 4ac$. Mamy $a = 1$, $b = -5$, $c = 6$:\n$$\\Delta = (-5)^2 - 4 \\cdot 1 \\cdot 6 = 25 - 24 = 1$$',
            cke_trap='Pamiętaj, że $(-5)^2 = +25$, a nie $-25$. Kwadrat dowolnej liczby jest nieujemny.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-8-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Dla równania $2x^2 - 4x + 1 = 0$ wyraz $b^2$ we wzorze na wyróżnik wynosi',
            options_data=[
                ('A', '$-16$'),
                ('B', '$16$'),
                ('C', '$-8$'),
                ('D', '$8$')
            ],
            correct_id='B',
            explanation='Podnosimy do kwadratu cały współczynnik $b = -4$:\n$$b^2 = (-4)^2 = 16$$',
            cke_trap='Wpisanie do kalkulatora bez nawiasu $-4^2$ daje $-16$. Zawsze pamiętaj o nawiasie: $(-4)^2 = +16$.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-8-1-3',
            source='Matura sierpień 2023 • Zad. 13',
            question='Funkcja kwadratowa $f$ jest określona wzorem $f(x) = (x - 13)^2 - 256$. Jednym z miejsc zerowych tej funkcji jest liczba $(-3)$.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDrugim miejscem zerowym funkcji $f$ jest liczba',
            options_data=[
                ('A', '$-29$'),
                ('B', '$-23$'),
                ('C', '$23$'),
                ('D', '$29$')
            ],
            correct_id='D',
            explanation='Przyrównujemy funkcję do zera:\n$$(x - 13)^2 - 256 = 0 \\longrightarrow (x - 13)^2 = 256$$\n$$x - 13 = 16 \\quad \\text{lub} \\quad x - 13 = -16$$\n$$x = 29 \\quad \\text{lub} \\quad x = -3$$\nDrugim miejscem zerowym jest liczba $29$.',
            cke_trap='Można również skorzystać z osi symetrii paraboli: $p = 13$, a odległość od $p$ do $-3$ wynosi $16$, więc drugie miejsce to $13 + 16 = 29$.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-8-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz mniejsze miejsce zerowe funkcji kwadratowej $f(x) = x^2 - 2x - 8$. Wpisz wynik w pole poniżej.',
            correct_val='-2',
            explanation='$\\Delta = (-2)^2 - 4 \\cdot 1 \\cdot (-8) = 4 + 32 = 36$, $\\sqrt{\\Delta} = 6$.\n$$x_1 = \\frac{2 - 6}{2} = \\frac{-4}{2} = -2$$\n$$x_2 = \\frac{2 + 6}{2} = 4$$\nMniejsze miejsce zerowe to $-2$.',
            cke_trap='Uwaga na minusy we wzorze: $-b = -(-2) = +2$.'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-8-1-5',
            source='Informator CKE • Zad. 21',
            question='Wyznacz miejsca zerowe funkcji kwadratowej $f(x) = 2x^2 - 7x + 3$. Zapisz pełne obliczenia z wyróżnikiem $\\Delta$.',
            points=2,
            scoring_key='1 pkt – poprawne obliczenie wyróżnika: $\\Delta = (-7)^2 - 4 \\cdot 2 \\cdot 3 = 49 - 24 = 25$, $\\sqrt{\\Delta} = 5$.\\n2 pkt – poprawne obliczenie obu miejsc zerowych: $x_1 = \\frac{7 - 5}{4} = \\frac{1}{2}$, $x_2 = \\frac{7 + 5}{4} = 3$.',
            explanation='1) Obliczamy wyróżnik $\\Delta$:\n$$\\Delta = b^2 - 4ac = (-7)^2 - 4 \\cdot 2 \\cdot 3 = 49 - 24 = 25$$\n$$\\sqrt{\\Delta} = \\sqrt{25} = 5$$\n2) Obliczamy miejsca zerowe ze wzorów:\n$$x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a} = \\frac{-(-7) - 5}{2 \\cdot 2} = \\frac{7 - 5}{4} = \\frac{2}{4} = \\frac{1}{2}$$\n$$x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a} = \\frac{-(-7) + 5}{2 \\cdot 2} = \\frac{7 + 5}{4} = \\frac{12}{4} = 3$$\nOdpowiedź: Miejsca zerowe to $x_1 = \\frac{1}{2}$ oraz $x_2 = 3$.',
            cke_trap='Mianownik to $2a = 2 \\cdot 2 = 4$, a nie $2$. Zapominanie o pomnożeniu przez współczynnik $a$ to częsty błąd.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-8-1',
        topic_id=topic_id,
        title='Wyróżnik Delta i miejsca zerowe trójmianu kwadratowego',
        concept_essence='Wyróżnik trójmianu kwadratowego $\\Delta = b^2 - 4ac$ to detektor liczby miejsc zerowych: 1) $\\Delta > 0$: dwa różne miejsca zerowe $x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}$, $x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}$. 2) $\\Delta = 0$: jedno podwójne miejsce zerowe $x_0 = -\\frac{b}{2a}$. 3) $\\Delta < 0$: brak miejsc zerowych (parabola nie przecina osi $OX$). Pamiętaj o żelaznej zasadzie: $(-b)^2$ to ZAWSZE liczba dodatnia!',
        matura_context='Podstawa algebry licealnej — występuje w zadaniach zamkniętych za 1 pkt oraz jako krok 1 każdego zadania otwartego z nierówności kwadratowych.',
        core_formulas=[
            {
                'title': 'Wyróżnik trójmianu kwadratowego (Delta)',
                'latex': '\\Delta = b^2 - 4ac',
                'description': 'Liczba określająca liczbę pierwiastków trójmianu.',
                'in_cke_sheet': True,
                'cke_page': 'str. 8',
                'example': 'x^2 - 4x + 3 \\longrightarrow \\Delta = (-4)^2 - 4(1)(3) = 16 - 12 = 4',
                'mnemonic': 'b do kwadratu odjąć cztery ac.',
                'matura_tip': 'Gdy b jest ujemne, b^2 jest dodatnie.'
            },
            {
                'title': 'Miejsca zerowe dla Delty > 0',
                'latex': 'x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}, \\quad x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}',
                'description': 'Dwa symetryczne punkty przecięcia z osią OX.',
                'in_cke_sheet': True,
                'cke_page': 'str. 8',
                'example': 'x_{1,2} = \\frac{4 \\pm 2}{2} \\longrightarrow x_1 = 1, x_2 = 3',
                'mnemonic': 'Minus b plus minus pierwiastek przez dwa a.',
                'matura_tip': 'Nie zapomnij o 2a w mianowniku, gdy a różne od 1.'
            }
        ],
        worked_example={
            'problem': 'Oblicz miejsca zerowe trójmianu $y = 3x^2 - 5x - 2$.',
            'steps': [
                {'num': 1, 'label': 'Wypisanie współczynników', 'text': '$a = 3$, $b = -5$, $c = -2$.'},
                {'num': 2, 'label': 'Obliczenie delty', 'text': '$\\Delta = (-5)^2 - 4 \\cdot 3 \\cdot (-2) = 25 + 24 = 49$, $\\sqrt{\\Delta} = 7$.'},
                {'num': 3, 'label': 'Zastosowanie wzorów i wynik CKE', 'text': '$x_1 = \\frac{5 - 7}{6} = -\\frac{1}{3}$, $x_2 = \\frac{5 + 7}{6} = 2$.'}
            ],
            'result': 'x_1 = -\\frac{1}{3}, \\quad x_2 = 2'
        },
        exam_trap='Typowy błąd: Błędne znaki przy $b = -5$: napisanie $-5$ zamiast $-(-5) = +5$ we wzorze na $x_{1,2}$.\n\nPoprawnie: Wzór to $-b$, więc liczba ujemna staje się dodatnia: $-(-5) = 5$.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 8.2: Szkicowanie paraboli i odczytywanie przedziałów (L1.8.2)
    # ----------------------------------------------------
    v2 = get_topic_08_visuals(1)
    l2_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-8-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Parabola funkcji $f(x) = x^2 - 6x + 5$ ma miejsca zerowe $1$ oraz $5$, a jej ramiona są skierowane w górę. Zbiorem rozwiązań nierówności $x^2 - 6x + 5 \\le 0$ jest',
            options_data=[
                ('A', '$[1, 5]$'),
                ('B', '$(1, 5)$'),
                ('C', '$(-\\infty, 1] \\cup [5, +\\infty)$'),
                ('D', '$(-\\infty, 1) \\cup (5, +\\infty)$')
            ],
            correct_id='A',
            explanation='Wartości $\\le 0$ (pod osią $OX$ i na osi) leżą pomiędzy miejscami zerowymi: $x \\in [1, 5]$. Nierówność nieostra ($\\le$) oznacza nawiasy domknięte.',
            cke_trap='Nierówność $\\le$ oznacza przedział domknięty (z pierwiastkami włącznie).'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-8-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Rozwiązaniem nierówności $(x - 2)(x + 4) < 0$ jest przedział',
            options_data=[
                ('A', '$[-4, 2]$'),
                ('B', '$(-4, 2)$'),
                ('C', '$(-\\infty, -4) \\cup (2, +\\infty)$'),
                ('D', '$(-\\infty, -2) \\cup (4, +\\infty)$')
            ],
            correct_id='B',
            explanation='Miejsca zerowe to $-4$ oraz $2$. Ramiona paraboli w górę ($a = 1 > 0$). Szukamy wartości ujemnych ($< 0$), czyli wnętrza między pierwiastkami. Nierówność ostra oznacza nawiasy okrągłe: $(-4, 2)$.',
            cke_trap='Nie myl znaków pierwiastków: $(x - 2) = 0 \\implies x = 2$, a $(x + 4) = 0 \\implies x = -4$.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-8-2-3',
            source='Informator CKE • Zad. 22',
            question='Zbiorem rozwiązań nierówności $(x - 1)(x + 3) > 0$ jest',
            options_data=[
                ('A', '$(-\\infty, -3) \\cup (1, +\\infty)$'),
                ('B', '$(-3, 1)$'),
                ('C', '$(-\\infty, -1) \\cup (3, +\\infty)$'),
                ('D', '$[-3, 1]$')
            ],
            correct_id='A',
            explanation='Miejsca zerowe to $-3$ oraz $1$. Współczynnik $a = 1 > 0$ (ramiona w górę). Wartości dodatnie ($> 0$, nad osią) znajdują się na zewnątrz pierwiastków: $(-\\infty, -3) \\cup (1, +\\infty)$.',
            cke_trap='Dla znaku $>$ przy ramionach w górę rozwiązaniem są ZAWSZE dwa przedziały zewnętrzne połączone sumą.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-8-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Ile liczb całkowitych należy do zbioru rozwiązań nierówności $(x + 2)(x - 4) \\le 0$? Wpisz wynik w pole poniżej.',
            correct_val='7',
            explanation='Zbiorem rozwiązań jest przedział $[-2, 4]$.\nLiczby całkowite w tym przedziale to: $-2, -1, 0, 1, 2, 3, 4$.\nJest ich łącznie $7$.',
            cke_trap='Pamiętaj o uwzględnieniu zera oraz obu krańców przedziału domkniętego.'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-8-2-5',
            source='Informator CKE • Zad. 23',
            question='Rozwiąż nierówność $x^2 - 2x - 8 \\ge 0$. Zapisz obliczenia.',
            points=2,
            scoring_key='1 pkt – obliczenie wyróżnika $\\Delta = 36$ i miejsc zerowych: $x_1 = -2$, $x_2 = 4$.\\n2 pkt – poprawna interpretacja geometryczna (parabola ramionami w górę) i zapisanie rozwiązania: $x \\in (-\\infty, -2] \\cup [4, +\\infty)$.',
            explanation='1) Wyznaczamy miejsca zerowe trójmianu $x^2 - 2x - 8 = 0$:\n$$\\Delta = (-2)^2 - 4 \\cdot 1 \\cdot (-8) = 4 + 32 = 36$$\n$$\\sqrt{\\Delta} = 6$$\n$$x_1 = \\frac{2 - 6}{2} = -2, \\quad x_2 = \\frac{2 + 6}{2} = 4$$\n2) Ponieważ $a = 1 > 0$, parabola ma ramiona skierowane w górę.\n3) Szukamy wartości $\\ge 0$ (nad osią $OX$ i na osi). Wykres leży nad osią na zewnątrz pierwiastków.\nOdpowiedź: $x \\in (-\\infty, -2] \\cup [4, +\\infty)$.',
            cke_trap='Nierówność $\\ge$ wymaga nawiasów domkniętych przy liczbach $-2$ oraz $4$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-8-2',
        topic_id=topic_id,
        title='Szkicowanie paraboli i odczytywanie przedziałów rozwiązań',
        concept_essence='Szkic paraboli to niezawodna maszyna do odczytywania nierówności kwadratowych: 1) Wyznaczasz miejsca zerowe $x_1, x_2$. 2) Patrzysz na znak współczynnika $a$: jeśli $a > 0$, ramiona idą w górę (uśmiech); jeśli $a < 0$, ramiona idą w dół (smutek). 3) Znak $>$ lub $\\ge$ oznacza wartości NAD osią $OX$. Znak $<$ lub $\\le$ oznacza wartości POD osią $OX$. 4) Dla $\\le, \\ge$ nawiasy są domknięte; dla $<, >$ nawiasy są okrągłe.',
        matura_context='Zadanie otwarte za 2 punkty występujące na 100% matur CKE w Formule 2015 i Formule 2023.',
        core_formulas=[
            {
                'title': 'Kierunek ramion paraboli',
                'latex': 'a > 0 \\longrightarrow \\bigcup \\quad (\\text{w górę}), \\quad a < 0 \\longrightarrow \\bigcap \\quad (\\text{w dół})',
                'description': 'Znak liczby przy x^2 decyduje o kształcie paraboli.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '-2x^2 + 3x \\longrightarrow a = -2 < 0 \\longrightarrow \\text{ramiona w dół}',
                'mnemonic': 'Dodatni to uśmiech, ujemny to smutek.',
                'matura_tip': 'Zawsze narysuj szybki szkic osi i paraboli w brudnopisie.'
            },
            {
                'title': 'Odczyt przedziału dla a > 0',
                'latex': 'f(x) \\le 0 \\longrightarrow x \\in [x_1, x_2], \\quad f(x) \\ge 0 \\longrightarrow x \\in (-\\infty, x_1] \\cup [x_2, +\\infty)',
                'description': 'Mniejszy od zera to wnętrze, większy to skrzydła zewnętrzne.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x^2 - 9 \\le 0 \\longrightarrow x \\in [-3, 3]',
                'mnemonic': 'Mniejsze to brzuszek pod osią, większe to ramiona nad osią.',
                'matura_tip': 'Uważaj na nawiasy przy nieskończoności — zawsze okrągłe!'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż nierówność $-x^2 + 5x - 6 \\ge 0$.',
            'steps': [
                {'num': 1, 'label': 'Miejsca zerowe', 'text': '$\\Delta = 25 - 24 = 1$. $x_1 = \\frac{-5 - 1}{-2} = 3$, $x_2 = \\frac{-5 + 1}{-2} = 2$.'},
                {'num': 2, 'label': 'Kierunek ramion', 'text': 'Współczynnik $a = -1 < 0$, więc ramiona paraboli są skierowane w dół.'},
                {'num': 3, 'label': 'Odczyt przedziału i wynik CKE', 'text': 'Szukamy wartości $\\ge 0$ (nad osią). Dla ramion w dół wykres jest nad osią pomiędzy pierwiastkami: $x \\in [2, 3]$.'}
            ],
            'result': 'x \\in [2, 3]'
        },
        exam_trap='Typowy błąd: Odruchowe zapisywanie sumy przedziałów $(-\\infty, 2] \\cup [3, +\\infty)$ dla znaku $\\ge 0$ bez sprawdzenia znaku $a$.\n\nPoprawnie: Gdy $a < 0$, ramiona idą w dół, więc wartości dodatnie są WEWNĄTRZ między pierwiastkami!',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 8.3: Nierówności niepełne (L1.8.3)
    # ----------------------------------------------------
    v3 = get_topic_08_visuals(2)
    l3_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-8-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Miejscami zerowymi trójmianu w nierówności $x^2 - 4x \\le 0$ są liczby',
            options_data=[
                ('A', '$0$ oraz $4$'),
                ('B', '$0$ oraz $-4$'),
                ('C', '$2$ oraz $-2$'),
                ('D', 'Tylko liczba $4$')
            ],
            correct_id='A',
            explanation='Wyłączamy $x$ przed nawias: $x(x - 4) = 0 \\longrightarrow x = 0$ lub $x = 4$. Liczenie delty nie jest potrzebne!',
            cke_trap='Nigdy nie dziel nierówności przez $x$! Wyłącz $x$ przed nawias, aby nie stracić pierwiastka $0$.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-8-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Rozwiązaniem nierówności $-x^2 + 9 > 0$ jest przedział',
            options_data=[
                ('A', '$(-3, 3)$'),
                ('B', '$(-\\infty, -3) \\cup (3, +\\infty)$'),
                ('C', '$[-3, 3]$'),
                ('D', '$\\emptyset$')
            ],
            correct_id='A',
            explanation='Miejsca zerowe to $3$ oraz $-3$. Współczynnik $a = -1 < 0$ (ramiona w dół). Wartości dodatnie ($> 0$, nad osią) leżą pomiędzy pierwiastkami: $(-3, 3)$.',
            cke_trap='Minus przy $x^2$ oznacza ramiona w dół, więc wartości dodatnie są W ŚRODKU, nie na zewnątrz.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-8-3-3',
            source='Informator CKE • Zad. 24',
            question='Zbiorem rozwiązań nierówności $x^2 - 25 \\le 0$ jest przedział',
            options_data=[
                ('A', '$[-5, 5]$'),
                ('B', '$(-5, 5)$'),
                ('C', '$(-\\infty, -5] \\cup [5, +\\infty)$'),
                ('D', '$[0, 5]$')
            ],
            correct_id='A',
            explanation='Rozkładamy ze wzoru na różnicę kwadratów: $(x - 5)(x + 5) \\le 0$. Miejsca zerowe to $-5$ oraz $5$. Ramiona w górę ($a = 1 > 0$). Wartości ujemne i zerowe leżą między pierwiastkami: $[-5, 5]$.',
            cke_trap='Równanie $x^2 = 25$ ma dwa pierwiastki: $5$ oraz $-5$. Nie zapominaj o ujemnym bracie bliźniaku.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-8-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Wyznacz największą liczbę całkowitą spełniającą nierówność $x^2 - 6x < 0$. Wpisz wynik w pole poniżej.',
            correct_val='5',
            explanation='Wyłączamy $x$ przed nawias: $x(x - 6) < 0$. Miejsca zerowe: $0$ oraz $6$. Zbiorem rozwiązań jest przedział otwarty $(0, 6)$.\nNajwiększą liczbą całkowitą w tym przedziale jest $5$.',
            cke_trap='Dla nierówności ostrej $< 0$ liczba $6$ nie należy do rozwiązań — szukaną liczbą jest $5$.'
        ),
        # Zadanie 5: Zadanie otwarte CKE 1:1 z kryteriami
        make_open_task(
            task_id='task-8-3-5',
            source='Matura czerwiec 2023 • Zad. 8',
            question='Rozwiąż nierówność $x(2x - 1) < 2x$. Zapisz obliczenia.',
            points=2,
            scoring_key='1 pkt – uporządkowanie nierówności do postaci kwadratowej: $2x^2 - 3x < 0$ i wyznaczenie miejsc zerowych $x_1 = 0$, $x_2 = \\frac{3}{2}$.\\n2 pkt – prawidłowe odczytanie przedziału dla paraboli skierowanej ramionami w górę: $x \\in \\left(0, \\frac{3}{2}\\right)$.',
            explanation='1) Wymnażamy nawias i przenosimy wszystkie wyrazy na lewą stronę:\n$$2x^2 - x < 2x$$\n$$2x^2 - 3x < 0$$\n2) Wyznaczamy miejsca zerowe, wyłączając $x$ przed nawias:\n$$x(2x - 3) = 0 \\longrightarrow x = 0 \\quad \\text{lub} \\quad x = \\frac{3}{2}$$\n3) Współczynnik $a = 2 > 0$, więc ramiona paraboli skierowane są w górę.\nWartości ujemne ($< 0$) znajdują się pod osią $OX$, czyli między pierwiastkami.\nOdpowiedź: $x \\in \\left(0, \\frac{3}{2}\\right)$.',
            cke_trap='Dzielenie obu stron nierówności przez $x$ jest niedopuszczalne, ponieważ nie znamy znaku $x$. Przenosimy na jedną stronę i wyłączamy $x$ przed nawias.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-8-3',
        topic_id=topic_id,
        title='Nierówności kwadratowe niepełne – bez liczenia delty',
        concept_essence='Gdy w trójmianie brakuje wyrazu wolnego ($c = 0$) lub wyrazu liniowego ($b = 0$), liczenie delty to strata cennego czasu: 1) Brak $c$ ($ax^2 + bx$): wyłączasz $x$ przed nawias: $x(ax + b)$. Miejsca zerowe to od razu $0$ oraz $-\\frac{b}{a}$. 2) Brak $b$ ($ax^2 - c$): rozkładasz na różnicę kwadratów $(x - \\sqrt{c})(x + \\sqrt{c})$. Miejsca zerowe to liczby przeciwne $\\pm \\sqrt{c}$. Następnie rysujesz parabolę i odczytujesz przedział.',
        matura_context='Bardzo częste zadania testowe sprawdzające sprawność algebraiczną maturzysty.',
        core_formulas=[
            {
                'title': 'Rozkład dla c = 0',
                'latex': 'ax^2 + bx = x(ax + b)',
                'description': 'Miejsca zerowe: x = 0 lub x = -b/a.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '2x^2 - 6x = 2x(x - 3) \\longrightarrow x_1 = 0, x_2 = 3',
                'mnemonic': 'Iks przed nawias załatwia sprawę.',
                'matura_tip': 'Nie licz delty, gdy c = 0.'
            },
            {
                'title': 'Rozkład dla b = 0',
                'latex': 'x^2 - c = (x - \\sqrt{c})(x + \\sqrt{c}) \\quad (c > 0)',
                'description': 'Miejsca zerowe: x = sqrt(c) lub x = -sqrt(c).',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': 'x^2 - 25 = (x - 5)(x + 5) \\longrightarrow x_1 = -5, x_2 = 5',
                'mnemonic': 'Różnica kwadratów daje dwa przeciwne pierwiastki.',
                'matura_tip': 'Nierówność $x^2 + 25 \\le 0$ jest sprzeczna (brak rozwiązań).'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż nierówność $3x - x^2 \\ge 0$.',
            'steps': [
                {'num': 1, 'label': 'Wyłączenie x przed nawias', 'text': '$x(3 - x) \\ge 0$. Miejsca zerowe: $x_1 = 0, x_2 = 3$.'},
                {'num': 2, 'label': 'Kierunek ramion paraboli', 'text': 'Współczynnik przy $x^2$ wynosi $-1 < 0$, więc ramiona idą w dół.'},
                {'num': 3, 'label': 'Odczyt przedziału i wynik CKE', 'text': 'Wartości $\\ge 0$ (nad osią) leżą między pierwiastkami: $x \\in [0, 3]$.'}
            ],
            'result': 'x \\in [0, 3]'
        },
        exam_trap='Typowy błąd: Dzielenie nierówności przez $x$ i utrata rozwiązania $x = 0$.\n\nPoprawnie: Nigdy nie dziel nierówności przez niewiadomą $x$, bo nie znasz jej znaku! Zawsze wyłączaj przed nawias.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    # ----------------------------------------------------
    # Lekcja 8.4: Nierówności z Delta <= 0 (L1.8.4)
    # ----------------------------------------------------
    v4 = get_topic_08_visuals(3)
    l4_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-8-4-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Zbiorem rozwiązań nierówności $x^2 + 4 > 0$ jest',
            options_data=[
                ('A', '$\\mathbb{R}$ (zbiór liczb rzeczywistych)'),
                ('B', '$\\emptyset$ (zbiór pusty)'),
                ('C', '$(-2, 2)$'),
                ('D', '$(-\\infty, -2) \\cup (2, +\\infty)$')
            ],
            correct_id='A',
            explanation='Dla każdego $x \\in \\mathbb{R}$ mamy $x^2 \\ge 0$, więc $x^2 + 4 \\ge 4 > 0$. Nierówność jest spełniona przez każdą liczbę rzeczywistą.',
            cke_trap='Brak miejsc zerowych ($\\Delta < 0$) nie oznacza braku rozwiązań nierówności!'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-8-4-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Zbiorem rozwiązań nierówności $(x - 3)^2 \\le 0$ jest',
            options_data=[
                ('A', '$\\{3\\}$ (tylko liczba 3)'),
                ('B', '$\\emptyset$'),
                ('C', '$\\mathbb{R}$'),
                ('D', '$(-\\infty, 3]$')
            ],
            correct_id='A',
            explanation='Kwadrat liczby rzeczywistej nigdy nie jest ujemny ($(x-3)^2 \\ge 0$). Nierówność $(x-3)^2 \\le 0$ może być spełniona tylko wtedy, gdy $(x-3)^2 = 0$, czyli $x = 3$.',
            cke_trap='Znak $\\le$ to "mniejsze LUB równe". Równość zachodzi dla $x = 3$.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-8-4-3',
            source='Informator CKE • Zad. 25',
            question='Zbiorem rozwiązań nierówności $-2x^2 + 3x - 5 > 0$ jest',
            options_data=[
                ('A', '$\\emptyset$'),
                ('B', '$\\mathbb{R}$'),
                ('C', '$(-\\infty, 0)$'),
                ('D', '$(0, +\\infty)$')
            ],
            correct_id='A',
            explanation='$\\Delta = 9 - 40 = -31 < 0$. Ponieważ $a = -2 < 0$, cała parabola leży pod osią $OX$. Wartości nigdy nie są dodatnie ($> 0$), więc zbiór rozwiązań jest pusty.',
            cke_trap='Gdy $a < 0$ i $\\Delta < 0$, funkcja przyjmuje wyłącznie wartości ujemne.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-8-4-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Podaj jedyną liczbę spełniającą nierówność $-(x - 7)^2 \\ge 0$. Wpisz wynik w pole poniżej.',
            correct_val='7',
            explanation='Mnożymy przez $-1$: $(x - 7)^2 \\le 0$. Ponieważ kwadrat liczby rzeczywistej jest zawsze $\\ge 0$, jedyną możliwością jest $(x - 7)^2 = 0 \\longrightarrow x = 7$.',
            cke_trap='Minus przed nawiasem odwraca znak nierówności przy mnożeniu przez $-1$.'
        ),
        # Zadanie 5: Zadanie otwarte / Dowód z kryteriami
        make_open_proof(
            task_id='task-8-4-5',
            source='Informator CKE • Zad. 26',
            question='Wykaż, że nierówność $x^2 - 4x + 5 \\le 0$ nie posiada rozwiązań w zbiorze liczb rzeczywistych. Zapisz pełne uzasadnienie.',
            points=2,
            scoring_key='1 pkt – obliczenie wyróżnika: $\\Delta = (-4)^2 - 4 \\cdot 1 \\cdot 5 = 16 - 20 = -4 < 0$ (lub zapisanie w postaci kanonicznej $(x - 2)^2 + 1$).\\n2 pkt – pełne uzasadnienie: ponieważ $a = 1 > 0$ i $\\Delta < 0$, parabola leży w całości nad osią $OX$ i przyjmuje wyłącznie wartości dodatnie, zatem zbiór rozwiązań nierówności $\\le 0$ jest pusty: $x \\in \\emptyset$.',
            explanation='Sposób 1 (wyróżnik $\\Delta$):\nObliczamy deltę: $\\Delta = (-4)^2 - 4 \\cdot 1 \\cdot 5 = 16 - 20 = -4 < 0$.\nWspółczynnik przy $x^2$ wynosi $a = 1 > 0$, więc ramiona paraboli są skierowane w górę.\nPonieważ $\\Delta < 0$ oraz $a > 0$, parabola leży w całości nad osią $OX$ i dla każdego $x \\in \\mathbb{R}$ zachodzi $x^2 - 4x + 5 > 0$.\nZatem nierówność $x^2 - 4x + 5 \\le 0$ nie ma rozwiązań w $\\mathbb{R}$ ($x \\in \\emptyset$), co kończy dowód.\n\nSposób 2 (postać kanoniczna):\n$$x^2 - 4x + 5 = (x - 2)^2 + 1$$\nPonieważ $(x - 2)^2 \\ge 0$, to $(x - 2)^2 + 1 \\ge 1 > 0$ dla każdego $x \\in \\mathbb{R}$, więc wyrażenie nigdy nie jest $\\le 0$.',
            cke_trap='Nie wystarczy napisać "delta jest ujemna, więc brak rozwiązań" — trzeba koniecznie podać argument o znaku współczynnika $a = 1 > 0$.'
        )
    ]
    l4 = make_lesson(
        lesson_id='lesson-8-4',
        topic_id=topic_id,
        title='Nierówności kwadratowe z ujemną deltą – zbiór pusty vs cały zbiór liczb rzeczywistych',
        concept_essence='Ujemna delta nie oznacza braku rozwiązań nierówności — oznacza jedynie brak miejsc zerowych! Gdy $\\Delta < 0$, parabola nigdy nie dotyka osi $OX$: 1) Jeśli $a > 0$, cały wykres unosi się nad osią $OX$ — wtedy nierówność $f(x) > 0$ spełniają WSZYSTKIE liczby ($x \\in \\mathbb{R}$), a nierówność $f(x) \\le 0$ nie ma rozwiązań ($\\emptyset$). 2) Jeśli $a < 0$, cały wykres wisi pod osią $OX$ — wtedy $f(x) < 0$ spełnia całe $\\mathbb{R}$, a $f(x) \\ge 0$ to zbiór pusty.',
        matura_context='Podchwytliwe zadanie testowe CKE za 1 punkt, w którym ponad 40% maturzystów błędnie zaznacza brak rozwiązań.',
        core_formulas=[
            {
                'title': 'Delta ujemna i ramiona w górę',
                'latex': '\\Delta < 0, a > 0 \\longrightarrow \\begin{cases} ax^2 + bx + c > 0 \\longrightarrow x \\in \\mathbb{R} \\\\ ax^2 + bx + c \\le 0 \\longrightarrow x \\in \\emptyset \\end{cases}',
                'description': 'Parabola w całości nad osią pozioma.',
                'in_cke_sheet': True,
                'cke_page': 'str. 8',
                'example': 'x^2 + 1 > 0 \\longrightarrow x \\in \\mathbb{R}',
                'mnemonic': 'Wisi w powietrzu nad osią — zawsze dodatnia.',
                'matura_tip': 'Nie pisz brak rozwiązań, gdy delta jest ujemna!'
            },
            {
                'title': 'Delta równa zero (punkt styczności)',
                'latex': '(x - x_0)^2 \\le 0 \\longrightarrow x = x_0',
                'description': 'Rozwiązanie jednopunktowe w wierzchołku paraboli.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '(x - 2)^2 \\le 0 \\longrightarrow x = 2',
                'mnemonic': 'Wierzchołek całuje oś w jednym punkcie.',
                'matura_tip': 'Dla ostrego znaku < zbiór jest pusty.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż nierówność $-x^2 + 2x - 3 \\ge 0$.',
            'steps': [
                {'num': 1, 'label': 'Obliczenie delty', 'text': '$\\Delta = 2^2 - 4 \\cdot (-1) \\cdot (-3) = 4 - 12 = -8 < 0$. Brak miejsc zerowych.'},
                {'num': 2, 'label': 'Kierunek ramion i położenie paraboli', 'text': 'Współczynnik $a = -1 < 0$ (ramiona w dół). Parabola wisi w całości pod osią $OX$.'},
                {'num': 3, 'label': 'Odczyt i wynik CKE', 'text': 'Szukamy wartości $\\ge 0$ (nad osią). Wykres nigdy tam nie sięga: $x \\in \\emptyset$ (brak rozwiązań).'}
            ],
            'result': 'x \\in \\emptyset'
        },
        exam_trap='Typowy błąd: Pisanie $x \\in \\emptyset$ przy nierówności $x^2 + 5 > 0$ tylko dlatego, że $\\Delta < 0$.\n\nPoprawnie: Wykres leży w całości NAD osią, więc nierówność jest spełniona dla KAŻDEJ liczby rzeczywistej: $x \\in \\mathbb{R}$.',
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
        'description': 'Wyróżnik Delta, szkicowanie paraboli, odczytywanie przedziałów, nierówności niepełne oraz przypadki z Deltą niedodatnią.',
        'lessons': lessons
    }

if __name__ == '__main__':
    t = build_topic_08()
    print(f"Pomyślnie zbudowano {t['title']} ({len(t['lessons'])} lekcje, {sum(len(l['tasks']) for l in t['lessons'])} zadań).")
