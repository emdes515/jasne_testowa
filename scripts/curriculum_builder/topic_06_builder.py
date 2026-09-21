"""
topic_06_builder.py - Dział 1.6: Równania w postaci iloczynowej (3 lekcje | Tier S+)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_06 import get_topic_06_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_06():
    topic_id = 'dzial-6'
    topic_title = 'Dział 1.6: Równania w postaci iloczynowej'
    lessons = []

    # ----------------------------------------------------
    # Lekcja 6.1: Reguła zerowania iloczynu (L1.6.1)
    # ----------------------------------------------------
    v1 = get_topic_06_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-6-1-1',
            source='Rozgrzewka • Dwa nawiasy liniowe',
            question='Rozwiązaniami równania $(x - 4)(2x + 6) = 0$ są liczby',
            options_data=[
                ('A', '$x = 4$ oraz $x = -3$'),
                ('B', '$x = -4$ oraz $x = 3$'),
                ('C', '$x = 4$ oraz $x = 3$'),
                ('D', '$x = -4$ oraz $x = -3$')
            ],
            correct_id='A',
            explanation='Przyrównujemy każdy nawias z osobna do zera: $x - 4 = 0 \\implies x = 4$ lub $2x + 6 = 0 \\implies 2x = -6 \\implies x = -3$.',
            cke_trap='Nigdy nie wymnażaj nawiasów, gdy po prawej stronie jest zero!'
        ),
        make_sc_task(
            task_id='task-6-1-2',
            source='Matura Maj 2023 • Zad. 7',
            question='Liczba różnych rozwiązań rzeczywistych równania $3x(x + 5)(x - 2) = 0$ jest równa',
            options_data=[
                ('A', '$2$'),
                ('B', '$3$'),
                ('C', '$1$'),
                ('D', '$4$')
            ],
            correct_id='B',
            explanation='Mamy trzy czynniki: $3x = 0 \\implies x_1 = 0$, $x + 5 = 0 \\implies x_2 = -5$, $x - 2 = 0 \\implies x_3 = 2$. Równanie ma 3 różne rozwiązania.',
            cke_trap='Nie zapomnij o czynniku $3x$ stojącym przed nawiasami — daje on rozwiązanie $x = 0$.'
        ),
        make_sc_task(
            task_id='task-6-1-3',
            source='Pułapka CKE • Prawa strona inna niż zero',
            question='Uczeń próbuje rozwiązać równanie $(x - 1)(x - 2) = 6$. Które stwierdzenie jest w 100% poprawne?',
            options_data=[
                ('A', 'Rozwiązania to $x - 1 = 6$ lub $x - 2 = 6$, czyli $x = 7$ lub $x = 8$.'),
                ('B', 'Reguła iloczynowa działa TYLKO gdy po prawej stronie jest zero. Trzeba wymnożyć nawiasy, przenieść 6 na lewo i policzyć deltę.'),
                ('C', 'Rozwiązaniami są $x = 1$ oraz $x = 2$.'),
                ('D', 'Równanie nie ma rozwiązań rzeczywistych.')
            ],
            correct_id='B',
            explanation='Reguła zerowania iloczynu działa WYŁĄCZNIE dla zera ($A \\cdot B = 0$). Gdy po prawej stronie stoi 6, wymnażamy: $x^2 - 3x + 2 = 6 \\implies x^2 - 3x - 4 = 0$ i liczymy deltę.',
            cke_trap='Przyrównywanie nawiasów do liczby różnej od zera to fatalny błąd rzeczowy.'
        ),
        make_tf_task(
            task_id='task-6-1-4',
            source='Trening CKE • Krotność pierwiastków',
            question='Oceń prawdziwość zdania: Równanie $(x - 3)^2 = 0$ ma dokładnie dwa różne rozwiązania rzeczywiste.',
            correct_tf='FAŁSZ',
            explanation='Równanie $(x - 3)^2 = 0$ ma tylko jedno rozwiązanie: $x = 3$ (jest to tzw. pierwiastek podwójny, ale wartość liczbowa jest jedna).',
            cke_trap='Rozróżniaj liczbę rozwiązań (jedno: x = 3) od krotności pierwiastka (krotność 2).'
        ),
        make_numeric_task(
            task_id='task-6-1-5',
            source='Utrwalenie • Iloczyn rozwiązań',
            question='Oblicz iloczyn wszystkich rozwiązań równania $(x + 4)(x - 2)(x - 3) = 0$.',
            correct_val=-24,
            explanation='Rozwiązania to: $x_1 = -4$, $x_2 = 2$, $x_3 = 3$. Ich iloczyn wynosi $(-4) \\cdot 2 \\cdot 3 = -24$.',
            cke_trap='Pamiętaj o znaku minus przy pierwszym pierwiastku: $x + 4 = 0 \\implies x = -4$.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-6-1',
        topic_id=topic_id,
        title='L1.6.1: Reguła zerowania iloczynu – z polskiego na nasze',
        concept_essence='Równanie w postaci iloczynowej to najłatwiejsze punkty na maturze. Zasada jest prosta: jeśli iloczyn kilku czynników daje zero, to przynajmniej jeden z nich musi być zerem. Gdy widzisz nawiasy przyrównane do zera: $(x - a)(x - b) = 0$, NIGDY ich nie wymnażaj! Przyrównaj każdy nawias z osobna do zera i połącz je słowem LUB.',
        matura_context='Pojawia się w 100% arkuszy maturalnych CKE na pozycji zadania 6 lub 7 za 1 punkt.',
        core_formulas=[
            {
                'title': 'Reguła zerowania iloczynu',
                'latex': 'A \\cdot B = 0 \\implies A = 0 \\quad \\text{lub} \\quad B = 0',
                'description': 'Iloczyn jest zerem, gdy co najmniej jeden czynnik jest zerem.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '(x - 2)(x + 5) = 0 \\implies x = 2 \\text{ lub } x = -5',
                'mnemonic': 'Każdy nawias do zera osobno.',
                'matura_tip': 'Nie wymnażaj nawiasów, gdy po prawej stronie jest 0!'
            },
            {
                'title': 'Czynnik x przed nawiasami',
                'latex': 'x(ax + b) = 0 \\implies x = 0 \\quad \\text{lub} \\quad ax + b = 0',
                'description': 'Samotny iks przed nawiasem zawsze daje rozwiązanie x = 0.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '3x(x - 4) = 0 \\implies x = 0 \\text{ lub } x = 4',
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
        make_sc_task(
            task_id='task-6-2-1',
            source='Rozgrzewka • Różnica kwadratów w nawiasie',
            question='Równanie $(x^2 - 9)(x + 2) = 0$ ma w zbiorze liczb rzeczywistych',
            options_data=[
                ('A', 'Dokładnie jedno rozwiązanie: $x = -2$'),
                ('B', 'Dokładnie dwa rozwiązania: $x = 3, x = -2$'),
                ('C', 'Dokładnie trzy rozwiązania: $x = -3, x = 3, x = -2$'),
                ('D', 'Cztery rozwiązania')
            ],
            correct_id='C',
            explanation='$x^2 - 9 = 0 \\implies x = 3$ lub $x = -3$. Drugi nawias: $x + 2 = 0 \\implies x = -2$. Łącznie są 3 rozwiązania rzeczywiste: $\\{-3, -2, 3\\}$.',
            cke_trap='Nawias $(x^2 - 9)$ daje DWA rozwiązania: pamiętaj o pierwiastku ujemnym $-3$.'
        ),
        make_sc_task(
            task_id='task-6-2-2',
            source='Matura Maj 2024 • Zad. 7',
            question='Równanie $(x^2 + 4)(x - 1)(x + 3) = 0$ ma w zbiorze liczb rzeczywistych dokładnie',
            options_data=[
                ('A', '$4$ rozwiązania'),
                ('B', '$3$ rozwiązania'),
                ('C', '$2$ rozwiązania: $1$ oraz $-3$'),
                ('D', '$1$ rozwiązanie')
            ],
            correct_id='C',
            explanation='Nawias $x^2 + 4 = 0 \\implies x^2 = -4$ nie ma rozwiązań rzeczywistych (kwadrat nie może być ujemny). Pozostałe nawiasy dają: $x = 1$ oraz $x = -3$. Równanie ma 2 rozwiązania.',
            cke_trap='Nawias z plusem $(x^2 + 4)$ jest nierozkładalny i nie daje żadnego rozwiązania rzeczywistego.'
        ),
        make_sc_task(
            task_id='task-6-2-3',
            source='Pułapka CKE • Ujemny bliźniak',
            question='Rozwiązaniem równania $x(x^2 - 5) = 0$ jest zbiór',
            options_data=[
                ('A', '$\\{0, \\sqrt{5}\\}$'),
                ('B', '$\\{0, -\\sqrt{5}, \\sqrt{5}\\}$'),
                ('C', '$\\{-\\sqrt{5}, \\sqrt{5}\\}$'),
                ('D', '$\\{0, 5, -5\\}$')
            ],
            correct_id='B',
            explanation='$x = 0$ lub $x^2 - 5 = 0 \\implies x^2 = 5 \\implies x = \\sqrt{5}$ lub $x = -\\sqrt{5}$. Pełny zbiór to $\\{-\\sqrt{5}, 0, \\sqrt{5}\\}$.',
            cke_trap='Równanie $x^2 = c$ (dla $c > 0$) ma ZAWSZE dwa rozwiązania: dodatnie i ujemne.'
        ),
        make_tf_task(
            task_id='task-6-2-4',
            source='Trening CKE • Suma kwadratów',
            question='Oceń prawdziwość zdania: Równanie $(x^2 + 1)(x^2 + 16) = 0$ nie posiada żadnego rozwiązania w zbiorze liczb rzeczywistych.',
            correct_tf='PRAWDA',
            explanation='Dla każdego $x \\in \\mathbb{R}$ mamy $x^2 \\ge 0$, więc $x^2 + 1 \\ge 1 > 0$ oraz $x^2 + 16 \\ge 16 > 0$. Żaden z czynników nigdy nie jest zerem.',
            cke_trap='Suma kwadratu i liczby dodatniej nigdy nie równa się zero.'
        ),
        make_numeric_task(
            task_id='task-6-2-5',
            source='Utrwalenie • Suma rozwiązań',
            question='Oblicz sumę wszystkich rozwiązań rzeczywistych równania $(x^2 - 4)(x - 7)(x^2 + 25) = 0$.',
            correct_val=7,
            explanation='Czynnik $(x^2 - 4)$ daje $2$ oraz $-2$. Czynnik $(x - 7)$ daje $7$. Czynnik $(x^2 + 25)$ nie daje rozwiązań. Suma: $(-2) + 2 + 7 = 7$.',
            cke_trap='Pierwiastki z $(x^2 - 4)$ to liczby przeciwne, które sumują się do zera.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-6-2',
        topic_id=topic_id,
        title='L1.6.2: Czynniki kwadratowe rozkładalne vs nierozkładalne w równaniach',
        concept_essence='Gdy w równaniu iloczynowym pojawia się nawias stopnia drugiego, natychmiast badasz jego znak: 1) Różnica kwadratów $(x^2 - c = 0)$ daje DWA rozwiązania: $x = \\sqrt{c}$ oraz $x = -\\sqrt{c}$. 2) Suma kwadratów $(x^2 + c = 0$, gdzie $c > 0$) to klasyczna pułapka CKE — kwadrat nie może być ujemny, więc taki nawias jest martwy i nie daje żadnego rozwiązania rzeczywistego.',
        matura_context='Ulubiona pułapka egzaminatorów CKE w zadaniach testowych (Maj 2024 zad. 7, Czerwiec 2023 zad. 7).',
        core_formulas=[
            {
                'title': 'Różnica kwadratów w równaniu',
                'latex': 'x^2 - c = 0 \\implies x = \\sqrt{c} \\quad \\text{lub} \\quad x = -\\sqrt{c}',
                'description': 'Zawsze dwa rozwiązania symetryczne.',
                'in_cke_sheet': True,
                'cke_page': 'str. 7',
                'example': 'x^2 - 16 = 0 \\implies x = 4 \\text{ lub } x = -4',
                'mnemonic': 'Kwadrat z minusem daje dwa pierwiastki.',
                'matura_tip': 'Nie zgub ujemnego rozwiązania.'
            },
            {
                'title': 'Suma kwadratów (brak rozwiązań)',
                'latex': 'x^2 + c = 0 \\implies x \\in \\emptyset \\quad (c > 0)',
                'description': 'Wyrażenie zawsze dodatnie w liczbach rzeczywistych.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x^2 + 9 = 0 \\implies x^2 = -9 \\text{ (sprzeczność)}',
                'mnemonic': 'Kwadrat z plusem nie daje nic.',
                'matura_tip': 'Ignoruj ten nawias przy wyznaczaniu pierwiastków.'
            }
        ],
        worked_example={
            'problem': 'Wyznacz wszystkie rozwiązania rzeczywiste równania $(x^2 - 16)(x^2 + 1)(2x - 6) = 0$.',
            'steps': [
                {'num': 1, 'label': 'Analiza pierwszego nawiasu', 'text': '$x^2 - 16 = 0 \\implies x^2 = 16 \\implies x = 4$ lub $x = -4$.'},
                {'num': 2, 'label': 'Analiza drugiego nawiasu (pułapka)', 'text': '$x^2 + 1 = 0 \\implies x^2 = -1$. Brak rozwiązań rzeczywistych.'},
                {'num': 3, 'label': 'Analiza trzeciego nawiasu i wynik CKE', 'text': '$2x - 6 = 0 \\implies 2x = 6 \\implies x = 3$. Rozwiązania: $x \\in \\{-4, 3, 4\\}$.'}
            ],
            'result': 'x \\in \\{-4, 3, 4\\}'
        },
        exam_trap='Typowy błąd: Wypisywanie $x = 3$ lub $x = -3$ z nawiasu $(x^2 + 9 = 0)$.\n\nPoprawnie: Suma kwadratów NIGDY nie równa się zero w liczbach rzeczywistych. Ten nawias po prostu pomijasz.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 6.3: Równania 3. stopnia z grupowaniem (L1.6.3)
    # ----------------------------------------------------
    v3 = get_topic_06_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-6-3-1',
            source='Rozgrzewka • Wyłączanie x w równaniu 3. stopnia',
            question='Rozwiązaniami równania $x^3 - 4x = 0$ są liczby',
            options_data=[
                ('A', '$x = 2$ oraz $x = -2$'),
                ('B', '$x = 0, x = 2, x = -2$'),
                ('C', '$x = 0$ oraz $x = 4$'),
                ('D', '$x = 0$ oraz $x = 2$')
            ],
            correct_id='B',
            explanation='Wyłączamy $x$ przed nawias: $x(x^2 - 4) = 0 \\implies x(x - 2)(x + 2) = 0$. Rozwiązania to $0, 2, -2$.',
            cke_trap='Dzielenie przez $x$ gubi pierwiastek $x = 0$. Zawsze wyłączaj $x$ przed nawias!'
        ),
        make_sc_task(
            task_id='task-6-3-2',
            source='Matura Maj 2023 • Zad. 8',
            question='Rozwiązaniami równania $x^3 - 3x^2 - 4x + 12 = 0$ są liczby',
            options_data=[
                ('A', '$-2, 2, 3$'),
                ('B', '$-3, -2, 2$'),
                ('C', '$-4, 3, 4$'),
                ('D', '$-2, 3$')
            ],
            correct_id='A',
            explanation='$x^2(x - 3) - 4(x - 3) = 0 \\implies (x - 3)(x^2 - 4) = 0 \\implies (x - 3)(x - 2)(x + 2) = 0$. Pierwiastki to $3, 2, -2$.',
            cke_trap='Grupuj w pary: z pierwszej wyciągnij $x^2$, z drugiej $-4$.'
        ),
        make_sc_task(
            task_id='task-6-3-3',
            source='Pułapka CKE • Dzielenie równania przez x',
            question='Uczeń rozwiązywał równanie $x^3 = 9x$ i podzielił obie strony przez $x$, otrzymując $x^2 = 9 \\implies x = 3$ lub $x = -3$. Jaki błąd popełnił?',
            options_data=[
                ('A', 'Nie popełnił błędu, wynik jest pełny.'),
                ('B', 'Stracił pierwiastek $x = 0$, ponieważ nie wolno dzielić równania przez niewiadomą!'),
                ('C', 'Równanie $x^2 = 9$ ma tylko jedno rozwiązanie $x = 3$.'),
                ('D', 'Powinien podzielić przez 9, a nie przez x.')
            ],
            correct_id='B',
            explanation='Dzielenie przez niewiadomą bez sprawdzenia, czy może być zerem, bezpowrotnie kasuje rozwiązanie $x = 0$. Prawidłowy zapis to $x^3 - 9x = 0 \\implies x(x^2 - 9) = 0$, co daje 3 rozwiązania: $-3, 0, 3$.',
            cke_trap='Nigdy nie dziel równania przez $x$. Przenieś wszystko na jedną stronę i wyłącz $x$ przed nawias.'
        ),
        make_tf_task(
            task_id='task-6-3-4',
            source='Trening CKE • Grupowanie wyrazów',
            question='Oceń prawdziwość zdania: Równanie $x^3 + 2x^2 + x + 2 = 0$ ma trzy różne pierwiastki rzeczywiste.',
            correct_tf='FAŁSZ',
            explanation='$x^2(x + 2) + 1(x + 2) = 0 \\implies (x + 2)(x^2 + 1) = 0$. Czynnik $x^2 + 1$ nie ma pierwiastków rzeczywistych, więc jedynym rozwiązaniem jest $x = -2$.',
            cke_trap='Nawias $(x^2 + 1)$ nie daje pierwiastków rzeczywistych.'
        ),
        make_open_task(
            task_id='task-6-3-5',
            source='Matura Maj 2024 • Zad. Otwarte 2 pkt',
            question='Rozwiąż równanie $2x^3 - 3x^2 - 18x + 27 = 0$. Zapisz pełne rozumowanie.',
            points=2,
            scoring_key='1 pkt: poprawne pogrupowanie wyrazów i postać (2x - 3)(x^2 - 9) = 0.\n2 pkt: podanie wszystkich trzech rozwiązań: x = 1.5, x = -3, x = 3.',
            explanation='1) Grupujemy w pary: $x^2(2x - 3) - 9(2x - 3) = 0$.\n2) Wyłączamy nawias: $(2x - 3)(x^2 - 9) = 0$.\n3) Rozkładamy różnicę kwadratów: $(2x - 3)(x - 3)(x + 3) = 0$.\n4) Pierwiastki: $2x - 3 = 0 \\implies x = 1{,}5$, $x - 3 = 0 \\implies x = 3$, $x + 3 = 0 \\implies x = -3$. Rozwiązania: $\\{-3, 1{,}5, 3\\}$.',
            cke_trap='Pamiętaj o wyłączeniu $-9$ z drugiej pary: $(-18x + 27) = -9(2x - 3)$.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-6-3',
        topic_id=topic_id,
        title='L1.6.3: Równania stopnia trzeciego rozwiązywane przez grupowanie wyrazów',
        concept_essence='Równanie 3. stopnia z 4 wyrazami to żelazny pewniak w zadaniach otwartych za 2 punkty. Schemat jest niezmienny: 1) Dzielisz wyrazy na dwie pary. 2) Z pierwszej wyciągasz $x^2$, z drugiej liczbę (uwaga na minus!). 3) W obu nawiasach powstaje to samo wyrażenie liniowe — wyciągasz je przed nawias główny. 4) Pozostały nawias kwadratowy $(x^2 - c)$ rozkładasz na dwa nawiasy ze wzoru $a^2 - b^2$. 5) Zapisujesz 3 pierwiastki.',
        matura_context='Klasyczne zadanie otwarte za 2 punkty występujące na co drugiej maturze CKE.',
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
                'latex': 'x^3 = cx \\implies x(x^2 - c) = 0 \\quad (\\text{NIE: } x^2 = c)',
                'description': 'Przeniesienie na jedną stronę zachowuje pierwiastek x = 0.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x^3 - 4x = 0 \\implies x(x - 2)(x + 2) = 0',
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
        'tier': 'Tier S+',
        'badge': 'NA 30% • PEWNIAK MATURALNY',
        'estimated_time_formatted': '3 lekcje (~15 min)',
        'description': 'Reguła zerowania iloczynu, czynniki kwadratowe rozkładalne i nierozkładalne oraz równania stopnia trzeciego z grupowaniem wyrazów.',
        'lessons': lessons
    }
