"""
topic_06_builder.py - Dział 1.6: Równania w postaci iloczynowej (3 lekcje | Tier S+)
Żelazna matryca 5-Task: T1 Baza, T2 Pułapka CKE, T3 CKE 1:1, T4 Numeryczne, T5 Otwarte/Dowód z kryteriami.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_06 import get_topic_06_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_06():
    topic_id = 'dzial-6'
    topic_title = 'Równania w postaci iloczynowej'
    topic_number = 6
    lessons = []

    # ----------------------------------------------------
    # Lekcja 6.1: Reguła zerowania iloczynu (L1.6.1)
    # ----------------------------------------------------
    v1 = get_topic_06_visuals(0)
    l1_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-6-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Rozwiązaniami równania $(x - 4)(2x + 6) = 0$ są liczby',
            options_data=[
                ('A', '$x = 4$ oraz $x = -3$'),
                ('B', '$x = -4$ oraz $x = 3$'),
                ('C', '$x = 4$ oraz $x = 3$'),
                ('D', '$x = -4$ oraz $x = -3$')
            ],
            correct_id='A',
            explanation='Przyrównujemy każdy nawias z osobna do zera:\n$$x - 4 = 0 \\longrightarrow x = 4$$\n$$2x + 6 = 0 \\longrightarrow 2x = -6 \\longrightarrow x = -3$$\nRozwiązaniami są liczby $4$ oraz $-3$.',
            cke_trap='Nigdy nie wymnażaj nawiasów, gdy po prawej stronie jest zero!'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-6-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Uczeń próbuje rozwiązać równanie $(x - 1)(x - 2) = 6$. Które stwierdzenie jest w 100% poprawne?',
            options_data=[
                ('A', 'Rozwiązania to $x - 1 = 6$ lub $x - 2 = 6$, czyli $x = 7$ lub $x = 8$.'),
                ('B', 'Reguła iloczynowa działa TYLKO gdy po prawej stronie jest zero. Trzeba wymnożyć nawiasy, przenieść 6 na lewo i policzyć deltę.'),
                ('C', 'Rozwiązaniami są $x = 1$ oraz $x = 2$.'),
                ('D', 'Równanie nie ma rozwiązań rzeczywistych.')
            ],
            correct_id='B',
            explanation='Reguła zerowania iloczynu działa WYŁĄCZNIE dla zera ($A \\cdot B = 0$). Gdy po prawej stronie stoi 6, wymnażamy:\n$$x^2 - 3x + 2 = 6 \\longrightarrow x^2 - 3x - 4 = 0$$\ni liczymy deltę: $\\Delta = 9 + 16 = 25$, skąd $x = -1$ lub $x = 4$.',
            cke_trap='Przyrównywanie nawiasów do liczby różnej od zera to fatalny błąd rzeczowy.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-6-1-3',
            source='Matura maj 2023 • Zad. 7',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nJednym z rozwiązań równania $\\sqrt{3}(x^2 - 2)(x + 3) = 0$ jest liczba',
            options_data=[
                ('A', '$3$'),
                ('B', '$2$'),
                ('C', '$\\sqrt{3}$'),
                ('D', '$\\sqrt{2}$')
            ],
            correct_id='D',
            explanation='Stała $\\sqrt{3} \\ne 0$.\nRozwiązujemy poszczególne czynniki:\n$$x^2 - 2 = 0 \\longrightarrow x^2 = 2 \\longrightarrow x = \\sqrt{2} \\quad \\text{lub} \\quad x = -\\sqrt{2}$$\n$$x + 3 = 0 \\longrightarrow x = -3$$\nJednym z rozwiązań podanych w opcjach jest liczba $\\sqrt{2}$.',
            cke_trap='Liczba $3$ nie jest rozwiązaniem, ponieważ $x + 3 = 0 \\implies x = -3$ (z minusem!).'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-6-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz iloczyn wszystkich rozwiązań równania $(x + 4)(x - 2)(x - 3) = 0$. Wpisz wynik w pole poniżej.',
            correct_val='-24',
            explanation='Rozwiązania to: $x_1 = -4$, $x_2 = 2$, $x_3 = 3$.\nIch iloczyn wynosi: $(-4) \\cdot 2 \\cdot 3 = -24$.',
            cke_trap='Pamiętaj o znaku minus przy pierwszym pierwiastku: $x + 4 = 0 \\implies x = -4$.'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-6-1-5',
            source='Informator CKE • Zad. 13',
            question='Rozwiąż równanie $x(x - 5)(2x + 8) = 0$. Podaj wszystkie jego rozwiązania i oblicz ich sumę. Zapisz pełne rozumowanie.',
            points=2,
            scoring_key='1 pkt – przyrównanie każdego z trzech czynników do zera i wyznaczenie rozwiązań: $x_1 = 0$, $x_2 = 5$, $x_3 = -4$.\\n2 pkt – podanie pełnego zbioru rozwiązań $x \\in \\{-4, 0, 5\\}$ oraz obliczenie ich sumy: $-4 + 0 + 5 = 1$.',
            explanation='Przyrównujemy każdy czynnik do zera:\n1) $x = 0$\n2) $x - 5 = 0 \\longrightarrow x = 5$\n3) $2x + 8 = 0 \\longrightarrow 2x = -8 \\longrightarrow x = -4$\nZbiór rozwiązań: $x \\in \\{-4, 0, 5\\}$.\nSuma rozwiązań: $(-4) + 0 + 5 = 1$.',
            cke_trap='Nie zapomnij o czynniku $x$ stojącym na początku przed nawiasem — daje on rozwiązanie $x = 0$.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-6-1',
        topic_id=topic_id,
        title='Reguła zerowania iloczynu – z polskiego na nasze',
        concept_essence='Równanie w postaci iloczynowej to najłatwiejsze punkty na maturze. Zasada jest prosta: jeśli iloczyn kilku czynników daje zero, to przynajmniej jeden z nich musi być zerem. Gdy widzisz nawiasy przyrównane do zera: $(x - a)(x - b) = 0$, NIGDY ich nie wymnażaj! Przyrównaj każdy nawias z osobna do zera i połącz je słowem LUB.',
        matura_context='Pojawia się w 100% arkuszy maturalnych CKE na pozycji zadania 6 lub 7 za 1 punkt.',
        core_formulas=[
            {
                'title': 'Reguła zerowania iloczynu',
                'latex': 'A \\cdot B = 0 \\longrightarrow A = 0 \\quad \\text{lub} \\quad B = 0',
                'description': 'Iloczyn jest zerem, gdy co najmniej jeden czynnik jest zerem.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '(x - 2)(x + 5) = 0 \\longrightarrow x = 2 \\text{ lub } x = -5',
                'mnemonic': 'Każdy nawias do zera osobno.',
                'matura_tip': 'Nie wymnażaj nawiasów, gdy po prawej stronie jest 0!'
            },
            {
                'title': 'Czynnik x przed nawiasami',
                'latex': 'x(ax + b) = 0 \\longrightarrow x = 0 \\quad \\text{lub} \\quad ax + b = 0',
                'description': 'Samotny iks przed nawiasem zawsze daje rozwiązanie x = 0.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '3x(x - 4) = 0 \\longrightarrow x = 0 \\text{ lub } x = 4',
                'mnemonic': 'Samotny iks to darmowe zero.',
                'matura_tip': 'Nigdy nie dziel równania przez x!'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż równanie $2x(x - 5)(3x + 9) = 0$.',
            'steps': [
                {'num': 1, 'label': 'Identyfikacja czynników', 'text': 'Mamy trzy czynniki: $2x$, $(x - 5)$ oraz $(3x + 9)$.'},
                {'num': 2, 'label': 'Przyrównanie każdego czynnika do zera', 'text': '$2x = 0 \\implies x = 0$, $x - 5 = 0 \\implies x = 5$, $3x + 9 = 0 \\implies x = -3$.'},
                {'num': 3, 'label': 'Zapisanie zbioru rozwiązań CKE', 'text': '$x \\in \\{-3, 0, 5\\}$.'}
            ],
            'result': 'x \\in \\{-3, 0, 5\\}'
        },
        exam_trap='Typowy błąd: Wymnażanie nawiasów w postaci iloczynowej i próba liczenia delty z wielomianu 3. stopnia.\n\nPoprawnie: Postać iloczynowa to gotowe rozwiązanie! Po prostu wyciągnij pierwiastki z każdego nawiasu.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 6.2: Czynniki kwadratowe rozkładalne vs nierozkładalne (L1.6.2)
    # ----------------------------------------------------
    v2 = get_topic_06_visuals(1)
    l2_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-6-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Równanie $(x^2 - 9)(x + 2) = 0$ ma w zbiorze liczb rzeczywistych',
            options_data=[
                ('A', 'Dokładnie jedno rozwiązanie: $x = -2$'),
                ('B', 'Dokładnie dwa rozwiązania: $x = 3, x = -2$'),
                ('C', 'Dokładnie trzy rozwiązania: $x = -3, x = 3, x = -2$'),
                ('D', 'Cztery rozwiązania')
            ],
            correct_id='C',
            explanation='$x^2 - 9 = 0 \\longrightarrow x = 3$ lub $x = -3$. Drugi nawias: $x + 2 = 0 \\longrightarrow x = -2$. Łącznie są 3 rozwiązania rzeczywiste: $\\{-3, -2, 3\\}$.',
            cke_trap='Nawias $(x^2 - 9)$ daje DWA rozwiązania: pamiętaj o pierwiastku ujemnym $-3$.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-6-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Rozwiązaniem równania $x(x^2 - 5) = 0$ jest zbiór',
            options_data=[
                ('A', '$\\{0, \\sqrt{5}\\}$'),
                ('B', '$\\{0, -\\sqrt{5}, \\sqrt{5}\\}$'),
                ('C', '$\\{-\\sqrt{5}, \\sqrt{5}\\}$'),
                ('D', '$\\{0, 5, -5\\}$')
            ],
            correct_id='B',
            explanation='$x = 0$ lub $x^2 - 5 = 0 \\longrightarrow x^2 = 5 \\longrightarrow x = \\sqrt{5}$ lub $x = -\\sqrt{5}$. Pełny zbiór to $\\{-\\sqrt{5}, 0, \\sqrt{5}\\}$.',
            cke_trap='Równanie $x^2 = c$ (dla $c > 0$) ma ZAWSZE dwa rozwiązania: dodatnie i ujemne.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-6-2-3',
            source='Informator CKE • Zad. 14',
            question='Równanie $(x^2 + 4)(x - 1)(x + 3) = 0$ ma w zbiorze liczb rzeczywistych dokładnie',
            options_data=[
                ('A', '$4$ rozwiązania'),
                ('B', '$3$ rozwiązania'),
                ('C', '$2$ rozwiązania: $1$ oraz $-3$'),
                ('D', '$1$ rozwiązanie')
            ],
            correct_id='C',
            explanation='Nawias $x^2 + 4 = 0 \\longrightarrow x^2 = -4$ nie ma rozwiązań rzeczywistych (kwadrat nie może być ujemny). Pozostałe nawiasy dają: $x = 1$ oraz $x = -3$. Równanie ma 2 rozwiązania.',
            cke_trap='Nawias z plusem $(x^2 + 4)$ jest nierozkładalny i nie daje żadnego rozwiązania rzeczywistego.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-6-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz sumę wszystkich rozwiązań rzeczywistych równania $(x^2 - 4)(x - 7)(x^2 + 25) = 0$. Wpisz wynik w pole poniżej.',
            correct_val='7',
            explanation='Czynnik $(x^2 - 4)$ daje $2$ oraz $-2$.\nCzynnik $(x - 7)$ daje $7$.\nCzynnik $(x^2 + 25)$ nie daje rozwiązań rzeczywistych.\nSuma: $(-2) + 2 + 7 = 7$.',
            cke_trap='Pierwiastki z $(x^2 - 4)$ to liczby przeciwne, które sumują się do zera.'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-6-2-5',
            source='Informator CKE • Zad. 15',
            question='Rozwiąż równanie $(x^2 - 12)(x^2 + 9) = 0$ w zbiorze liczb rzeczywistych. Wyznacz wszystkie jego rozwiązania i zapisz je w najprostszej postaci z wyłączonym czynnikiem spod pierwiastka.',
            points=2,
            scoring_key='1 pkt – stwierdzenie, że czynnik $x^2 + 9 > 0$ nie posiada rozwiązań rzeczywistych, i zapisanie równania $x^2 = 12$.\\n2 pkt – poprawne wyznaczenie obu rozwiązań rzeczywistych w postaci uproszczonej: $x_1 = -2\\sqrt{3}$, $x_2 = 2\\sqrt{3}$.',
            explanation='1) Dla każdego $x \\in \\mathbb{R}$ mamy $x^2 \\ge 0$, stąd $x^2 + 9 \\ge 9 > 0$. Czynnik $x^2 + 9 = 0$ jest sprzeczny w $\\mathbb{R}$.\n2) Przyrównujemy pierwszy czynnik do zera:\n$$x^2 - 12 = 0 \\longrightarrow x^2 = 12$$\n$$x = \\sqrt{12} \\quad \\text{lub} \\quad x = -\\sqrt{12}$$\nWyłączamy czynnik przed pierwiastek: $\\sqrt{12} = \\sqrt{4 \\cdot 3} = 2\\sqrt{3}$.\nRozwiązania: $x_1 = -2\\sqrt{3}$, $x_2 = 2\\sqrt{3}$.',
            cke_trap='Niewyłączenie czynnika spod pierwiastka (pozostawienie $\\pm\\sqrt{12}$) może skutkować utratą punktu za postać wyniku.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-6-2',
        topic_id=topic_id,
        title='Czynniki kwadratowe rozkładalne vs nierozkładalne w równaniach',
        concept_essence='Gdy w równaniu iloczynowym pojawia się nawias stopnia drugiego, natychmiast badasz jego znak: 1) Różnica kwadratów $(x^2 - c = 0)$ daje DWA rozwiązania: $x = \\sqrt{c}$ oraz $x = -\\sqrt{c}$. 2) Suma kwadratów $(x^2 + c = 0$, gdzie $c > 0$) to klasyczna pułapka CKE — kwadrat nie może być ujemny, więc taki nawias jest martwy i nie daje żadnego rozwiązania rzeczywistego.',
        matura_context='Ulubiona pułapka egzaminatorów CKE w zadaniach testowych (Maj 2024 zad. 7, Czerwiec 2023 zad. 7).',
        core_formulas=[
            {
                'title': 'Różnica kwadratów w równaniu',
                'latex': 'x^2 - c = 0 \\longrightarrow x = \\sqrt{c} \\quad \\text{lub} \\quad x = -\\sqrt{c}',
                'description': 'Zawsze dwa rozwiązania symetryczne.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': 'x^2 - 7 = 0 \\longrightarrow x = \\sqrt{7} \\text{ lub } x = -\\sqrt{7}',
                'mnemonic': 'Kwadrat z minusem daje dwa pierwiastki.',
                'matura_tip': 'Nie zapomnij o ujemnym bracie bliźniaku.'
            },
            {
                'title': 'Suma kwadratów w równaniu (nawias pusty)',
                'latex': 'x^2 + c = 0 \\quad (c > 0) \\longrightarrow x \\in \\emptyset',
                'description': 'Kwadrat nie może być równy liczbie ujemnej.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x^2 + 9 = 0 \\longrightarrow x^2 = -9 \\longrightarrow \\text{brak rozwiązań}',
                'mnemonic': 'Kwadrat z plusem nie daje rozwiązań.',
                'matura_tip': 'Nawias $x^2 + c$ po prostu ignorujesz.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż równanie $(x^2 - 16)(x^2 + 1)(x - 3) = 0$.',
            'steps': [
                {'num': 1, 'label': 'Nawias różnicy kwadratów', 'text': '$x^2 - 16 = 0 \\implies x = 4$ lub $x = -4$.'},
                {'num': 2, 'label': 'Nawias sumy kwadratów', 'text': '$x^2 + 1 = 0 \\implies x^2 = -1$ (brak rozwiązań rzeczywistych).'},
                {'num': 3, 'label': 'Nawias liniowy i wynik CKE', 'text': '$x - 3 = 0 \\implies x = 3$. Zbiór rozwiązań: $x \\in \\{-4, 3, 4\\}$.'}
            ],
            'result': 'x \\in \\{-4, 3, 4\\}'
        },
        exam_trap='Typowy błąd: Próba rozkładania sumy kwadratów: $x^2 + 4 = (x + 2)(x - 2)$ i dopisywanie fałszywych rozwiązań $x = \\pm 2$.\n\nPoprawnie: Suma kwadratów $x^2 + 4$ nigdy się nie zeruje — nie daje żadnych pierwiastków.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 6.3: Równania stopnia 3 rozwiązywane przez grupowanie (L1.6.3)
    # ----------------------------------------------------
    v3 = get_topic_06_visuals(2)
    l3_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-6-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Rozwiązaniami równania $x^3 - 2x^2 - 9x + 18 = 0$ są liczby',
            options_data=[
                ('A', '$\\{-3, 2, 3\\}$'),
                ('B', '$\\{-2, 3\\}$'),
                ('C', '$\\{2, 9\\}$'),
                ('D', '$\\{-3, -2, 3\\}$')
            ],
            correct_id='A',
            explanation='Grupujemy w pary: $x^2(x - 2) - 9(x - 2) = 0 \\longrightarrow (x - 2)(x^2 - 9) = 0 \\longrightarrow (x - 2)(x - 3)(x + 3) = 0$.\nRozwiązania to: $x = 2$, $x = 3$, $x = -3$.',
            cke_trap='Pamiętaj o rozłożeniu $(x^2 - 9)$ na dwa nawiasy: $(x - 3)(x + 3)$.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-6-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question='W równaniu $2x^3 - 3x^2 - 8x + 12 = 0$ wyłączenie wspólnego czynnika z drugiej pary $(-8x + 12)$ daje',
            options_data=[
                ('A', '$-4(2x + 3)$'),
                ('B', '$-4(2x - 3)$'),
                ('C', '$+4(2x - 3)$'),
                ('D', '$-8(x - 12)$')
            ],
            correct_id='B',
            explanation='Dzielimy przez $-4$: $(-8x) : (-4) = 2x$ oraz $(+12) : (-4) = -3$. Otrzymujemy $-4(2x - 3)$. Dzięki temu nawias zgadza się z nawiasem z pierwszej pary: $x^2(2x - 3)$.',
            cke_trap='Minus przed nawiasem zmienia znak wewnątrz z plusa na minus: $+12 : (-4) = -3$.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-6-3-3',
            source='Informator CKE • Zad. 16',
            question='Równanie $x^3 - 5x^2 + 4x - 20 = 0$ ma w zbiorze liczb rzeczywistych',
            options_data=[
                ('A', 'Dokładnie jedno rozwiązanie: $x = 5$'),
                ('B', 'Dokładnie dwa rozwiązania: $x = 5, x = 2$'),
                ('C', 'Trzy rozwiązania: $x = 5, x = 2, x = -2$'),
                ('D', 'Zero rozwiązań')
            ],
            correct_id='A',
            explanation='Grupujemy: $x^2(x - 5) + 4(x - 5) = 0 \\longrightarrow (x - 5)(x^2 + 4) = 0$.\nCzynnik $(x^2 + 4)$ jest zawsze $> 0$ i nie ma pierwiastków rzeczywistych.\nJedynym rozwiązaniem jest $x = 5$.',
            cke_trap='Czynnik $(x^2 + 4)$ nie daje pierwiastków w liczbach rzeczywistych.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-6-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz największe rozwiązanie rzeczywiste równania $x^3 + 4x^2 - 9x - 36 = 0$. Wpisz wynik w pole poniżej.',
            correct_val='3',
            explanation='Grupujemy w pary: $x^2(x + 4) - 9(x + 4) = 0 \\longrightarrow (x + 4)(x^2 - 9) = 0 \\longrightarrow (x + 4)(x - 3)(x + 3) = 0$.\nRozwiązaniami są liczby: $-4$, $-3$, $3$.\nNajwiększym rozwiązaniem jest liczba $3$.',
            cke_trap='Uważaj na wybór największego rozwiązania: spośród $\\{-4, -3, 3\\}$ jest to $3$.'
        ),
        # Zadanie 5: Zadanie otwarte CKE 1:1 z kryteriami
        make_open_task(
            task_id='task-6-3-5',
            source='Matura maj 2023 • Zad. 9',
            question='Rozwiąż równanie $3x^3 - 2x^2 - 12x + 8 = 0$. Zapisz obliczenia.',
            points=3,
            scoring_key='1 pkt – podział wielomianu na pary i wyłączenie wspólnych czynników: $x^2(3x - 2) - 4(3x - 2) = 0$.\\n2 pkt – doprowadzenie do postaci iloczynowej: $(3x - 2)(x^2 - 4) = 0$ lub $(3x - 2)(x - 2)(x + 2) = 0$.\\n3 pkt – wyznaczenie wszystkich trzech rozwiązań: $x_1 = \\frac{2}{3}$, $x_2 = 2$, $x_3 = -2$.',
            explanation='1) Grupujemy wyrazy w pary:\n$$(3x^3 - 2x^2) - (12x - 8) = 0$$\n2) Wyłączamy wspólne czynniki przed nawiasy:\n$$x^2(3x - 2) - 4(3x - 2) = 0$$\n3) Wyłączamy wspólny nawias $(3x - 2)$:\n$$(3x - 2)(x^2 - 4) = 0$$\n4) Rozkładamy różnicę kwadratów $(x^2 - 4) = (x - 2)(x + 2)$:\n$$(3x - 2)(x - 2)(x + 2) = 0$$\n5) Przyrównujemy każdy czynnik do zera:\n$$3x - 2 = 0 \\longrightarrow x = \\frac{2}{3}$$\n$$x - 2 = 0 \\longrightarrow x = 2$$\n$$x + 2 = 0 \\longrightarrow x = -2$$\nOdpowiedź: $x \\in \\left\\{-2, \\frac{2}{3}, 2\\right\\}$.',
            cke_trap='Pamiętaj o wyłączeniu $-4$ z drugiej pary: $(-12x + 8) = -4(3x - 2)$. Zły znak w nawiasie uniemożliwia dalszy rozkład.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-6-3',
        topic_id=topic_id,
        title='Równania stopnia trzeciego rozwiązywane przez grupowanie wyrazów',
        concept_essence='Równanie 3. stopnia z 4 wyrazami to żelazny pewniak w zadaniach otwartych za 2 lub 3 punkty. Schemat jest niezmienny: 1) Dzielisz wyrazy na dwie pary. 2) Z pierwszej wyciągasz $x^2$, z drugiej liczbę (uwaga na minus!). 3) W obu nawiasach powstaje to samo wyrażenie liniowe — wyciągasz je przed nawias główny. 4) Pozostały nawias kwadratowy $(x^2 - c)$ rozkładasz na dwa nawiasy ze wzoru $a^2 - b^2$. 5) Zapisujesz 3 pierwiastki.',
        matura_context='Klasyczne zadanie otwarte za 2–3 punkty występujące na co drugiej maturze CKE.',
        core_formulas=[
            {
                'title': 'Schemat grupowania wyrazów',
                'latex': 'x^3 - ax^2 - bx + ab = x^2(x - a) - b(x - a) = (x - a)(x^2 - b) = 0',
                'description': 'Doprowadzenie wielomianu do postaci iloczynowej.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x^3 - 2x^2 - 9x + 18 = (x - 2)(x - 3)(x + 3) = 0',
                'mnemonic': 'Para z iksem kwadrat, para ze stałą, wspólny nawias.',
                'matura_tip': 'Gdy nawiasy w obu parach się różnią, natychmiast sprawdź znaki!'
            },
            {
                'title': 'Zakaz dzielenia przez niewiadomą',
                'latex': 'x^3 = cx \\longrightarrow x(x^2 - c) = 0 \\quad (\\text{NIE: } x^2 = c)',
                'description': 'Przeniesienie na jedną stronę zachowuje pierwiastek x = 0.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x^3 - 4x = 0 \\longrightarrow x(x - 2)(x + 2) = 0',
                'mnemonic': 'Nigdy nie kasuj iksa dzieleniem.',
                'matura_tip': 'Dzielenie przez x to strata 1 punktu w zadaniu otwartym.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż równanie $3x^3 - 2x^2 - 12x + 8 = 0$.',
            'steps': [
                {'num': 1, 'label': 'Podział na pary i wyłączenie czynników', 'text': '$x^2(3x - 2) - 4(3x - 2) = 0$.'},
                {'num': 2, 'label': 'Wyłączenie wspólnego nawiasu', 'text': '$(3x - 2)(x^2 - 4) = 0$.'},
                {'num': 3, 'label': 'Rozkład różnicy kwadratów i wynik CKE', 'text': '$(3x - 2)(x - 2)(x + 2) = 0 \\implies x = \\frac{2}{3}$ lub $x = 2$ lub $x = -2$.'}
            ],
            'result': 'x \\in \\{-2, \\frac{2}{3}, 2\\}'
        },
        exam_trap='Typowy błąd: Dzielenie równania przez niewiadomą $x$ i utrata pierwiastka $x = 0$.\n\nPoprawnie: Zawsze przenoś wszystkie wyrazy na lewą stronę i wyłączaj $x$ przed nawias.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'order': topic_number,
        'tier': 'Tier S+',
        'badge': 'NA 30% • PEWNIAK MATURALNY',
        'estimated_time_formatted': '3 lekcje (~15 min)',
        'description': 'Reguła zerowania iloczynu, czynniki kwadratowe rozkładalne i nierozkładalne oraz równania stopnia trzeciego z grupowaniem wyrazów.',
        'lessons': lessons
    }

if __name__ == '__main__':
    t = build_topic_06()
    print(f"Pomyślnie zbudowano {t['title']} ({len(t['lessons'])} lekcje, {sum(len(l['tasks']) for l in t['lessons'])} zadań).")
