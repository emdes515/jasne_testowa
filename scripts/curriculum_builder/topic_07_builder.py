"""
topic_07_builder.py - Dział 1.7: Równania i wyrażenia wymierne (3 lekcje | Tier S+)
Żelazna matryca 5-Task: T1 Baza, T2 Pułapka CKE, T3 CKE 1:1, T4 Numeryczne, T5 Otwarte/Dowód z kryteriami.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_07 import get_topic_07_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_07():
    topic_id = 'dzial-7'
    topic_title = 'Równania i wyrażenia wymierne'
    topic_number = 7
    lessons = []

    # ----------------------------------------------------
    # Lekcja 7.1: Dziedzina wyrażenia wymiernego (L1.7.1)
    # ----------------------------------------------------
    v1 = get_topic_07_visuals(0)
    l1_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-7-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Dziedziną wyrażenia $W(x) = \\frac{x + 2}{x - 5}$ jest zbiór',
            options_data=[
                ('A', '$\\mathbb{R} \\setminus \\{5\\}$'),
                ('B', '$\\mathbb{R} \\setminus \\{-2\\}$'),
                ('C', '$\\mathbb{R} \\setminus \\{-2, 5\\}$'),
                ('D', '$\\mathbb{R}$')
            ],
            correct_id='A',
            explanation='Warunek istnienia ułamka to mianownik różny od zera:\n$$x - 5 \\ne 0 \\longrightarrow x \\ne 5$$\nLicznik nie wpływa na dziedzinę. Zatem $D = \\mathbb{R} \\setminus \\{5\\}$.',
            cke_trap='Licznik ułamka MOŻE być zerem! Do dziedziny interesuje nas wyłącznie mianownik.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-7-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Dziedziną wyrażenia $G(x) = \\frac{x - 7}{x^2 + 9}$ jest',
            options_data=[
                ('A', '$\\mathbb{R}$ (wszystkie liczby rzeczywiste)'),
                ('B', '$\\mathbb{R} \\setminus \\{-3, 3\\}$'),
                ('C', '$\\mathbb{R} \\setminus \\{7\\}$'),
                ('D', '$\\mathbb{R} \\setminus \\{-9\\}$')
            ],
            correct_id='A',
            explanation='Dla każdego $x \\in \\mathbb{R}$ kwadrat jest nieujemny: $x^2 \\ge 0$, więc $x^2 + 9 \\ge 9 > 0$. Mianownik NIGDY się nie zeruje! Dziedziną jest cały zbiór $\\mathbb{R}$.',
            cke_trap='Nie myl sumy kwadratów $x^2 + 9$ z różnicą kwadratów $x^2 - 9$. Suma kwadratów nigdy nie jest zerem.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-7-1-3',
            source='Matura maj 2024 • Zad. 7',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nRównanie $\\frac{x+1}{(x+2)(x-3)} = 0$ w zbiorze liczb rzeczywistych',
            options_data=[
                ('A', 'nie ma rozwiązania.'),
                ('B', 'ma dokładnie jedno rozwiązanie: $(-1)$.'),
                ('C', 'ma dokładnie dwa rozwiązania: $(-2)$ oraz $3$.'),
                ('D', 'ma dokładnie trzy rozwiązania: $(-1)$, $(-2)$ oraz $3$.')
            ],
            correct_id='B',
            explanation='1) Dziedzina: mianownik $(x + 2)(x - 3) \\ne 0 \\longrightarrow x \\ne -2$ oraz $x \\ne 3$.\n2) Ułamek jest zerem, gdy licznik jest zerem: $x + 1 = 0 \\longrightarrow x = -1$.\n3) Liczba $-1 \\in D$, więc równanie ma dokładnie jedno rozwiązanie: $(-1)$.',
            cke_trap='Liczby zerujące mianownik ($-2$ i $3$) NIE są rozwiązaniami równania, lecz punktami wykluczonymi z dziedziny!'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-7-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Ile liczb rzeczywistych nie należy do dziedziny wyrażenia $W(x) = \\frac{x^2 - 1}{(x - 1)(x + 2)(x^2 - 9)}$? Wpisz wynik w pole poniżej.',
            correct_val='4',
            explanation='Mianownik zeruje się dla:\n1) $x - 1 = 0 \\longrightarrow x = 1$\n2) $x + 2 = 0 \\longrightarrow x = -2$\n3) $x^2 - 9 = 0 \\longrightarrow x = 3$ lub $x = -3$\nJest to łącznie $4$ różne liczby: $\\{-3, -2, 1, 3\\}$.',
            cke_trap='Nawet jeśli licznik $x^2 - 1$ ma wspólny pierwiastek $x = 1$ z mianownikiem, liczba ta MUSI być wykluczona z dziedziny!'
        ),
        # Zadanie 5: Zadanie otwarte z kryteriami
        make_open_task(
            task_id='task-7-1-5',
            source='Informator CKE • Zad. 17',
            question='Wyznacz dziedzinę wyrażenia wymiernego $W(x) = \\frac{2x + 5}{x^3 - 4x}$. Zapisz wszystkie obliczenia i podaj dziedzinę w postaci zbioru.',
            points=2,
            scoring_key='1 pkt – zapisanie warunku $x^3 - 4x \\ne 0$ i rozłożenie mianownika na czynniki: $x(x - 2)(x + 2) \\ne 0$.\\n2 pkt – wyznaczenie liczb wykluczonych $x \\ne 0$, $x \\ne 2$, $x \\ne -2$ oraz zapisanie dziedziny: $D = \\mathbb{R} \\setminus \\{-2, 0, 2\\}$.',
            explanation='1) Zapisujemy warunek istnienia ułamka:\n$$x^3 - 4x \\ne 0$$\n2) Rozkładamy mianownik na czynniki:\n$$x(x^2 - 4) \\ne 0$$\n$$x(x - 2)(x + 2) \\ne 0$$\n3) Mianownik zeruje się dla $x = 0$, $x = 2$, $x = -2$.\n4) Zapisujemy dziedzinę wyrażenia:\n$$D = \\mathbb{R} \\setminus \\{-2, 0, 2\\}$$',
            cke_trap='Pamiętaj o wyłączeniu $x$ przed nawias — mianownik zeruje się również dla $x = 0$.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-7-1',
        topic_id=topic_id,
        title='Dziedzina wyrażenia wymiernego – warunek niezerowego mianownika',
        concept_essence='W matematyce nie wolno dzielić przez zero. Dlatego gdy widzisz ułamek algebraiczny, Twoim pierwszym krokiem jest zapisanie warunku: mianownik $\\ne 0$. Wyznaczasz liczby zerujące mianownik i wyrzucasz je ze zbioru liczb rzeczywistych za pomocą ukośnika: $D = \\mathbb{R} \\setminus \\{x_1, x_2\\}$. Pamiętaj: dziedzinę wyznaczasz ZAWSZE na samym początku, zanim cokolwiek skrócić!',
        matura_context='Wyznaczanie dziedziny ułamka algebraicznego to samodzielne zadanie za 1 pkt lub obowiązkowy warunek zaliczenia zadania za 2 pkt.',
        core_formulas=[
            {
                'title': 'Warunek istnienia ułamka algebraicznego',
                'latex': '\\frac{L(x)}{M(x)} \\longrightarrow M(x) \\neq 0',
                'description': 'Mianownik ułamka musi być różny od zera.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\frac{1}{x - 3} \\longrightarrow x - 3 \\neq 0 \\longrightarrow x \\neq 3 \\longrightarrow D = \\mathbb{R} \\setminus \\{3\\}',
                'mnemonic': 'Dół ułamka nigdy nie może być zerem.',
                'matura_tip': 'Licznikiem nie przejmujesz się przy dziedzinie.'
            },
            {
                'title': 'Dziedzina dla mianownika kwadratowego',
                'latex': 'x^2 - a^2 \\neq 0 \\longrightarrow x \\neq a \\quad \\text{oraz} \\quad x \\neq -a',
                'description': 'Różnica kwadratów w mianowniku wyklucza dwa symetryczne punkty.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x^2 - 4 \\neq 0 \\longrightarrow D = \\mathbb{R} \\setminus \\{-2, 2\\}',
                'mnemonic': 'Kwadrat z minusem wyrzuca dwie liczby.',
                'matura_tip': 'Dla $x^2 + 4$ mianownik nigdy się nie zeruje, więc $D = \\mathbb{R}$.'
            }
        ],
        worked_example={
            'problem': 'Wyznacz dziedzinę wyrażenia wymiernego $W(x) = \\frac{3x + 1}{x^2 - 16}$.',
            'steps': [
                {'num': 1, 'label': 'Zapisanie warunku mianownika', 'text': '$x^2 - 16 \\ne 0$.'},
                {'num': 2, 'label': 'Rozwiązanie równania z mianownika', 'text': '$x^2 = 16 \\longrightarrow x = 4$ lub $x = -4$.'},
                {'num': 3, 'label': 'Wykluczenie punktów i wynik CKE', 'text': 'Wyrzucamy liczby $-4$ oraz $4$ ze zbioru liczb rzeczywistych: $D = \\mathbb{R} \\setminus \\{-4, 4\\}$.'}
            ],
            'result': 'D = \\mathbb{R} \\setminus \\{-4, 4\\}'
        },
        exam_trap='Typowy błąd: Skracanie nawiasu przed wyznaczeniem dziedziny, np. skracanie $\\frac{x-2}{x-2}$ i podawanie dziedziny $\\mathbb{R}$.\n\nPoprawnie: Dziedzinę bada się w postaci wyjściowej ułamka: $x - 2 \\ne 0 \\implies D = \\mathbb{R} \\setminus \\{2\\}$.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 7.2: Rozwiązywanie równań wymiernych (L1.7.2)
    # ----------------------------------------------------
    v2 = get_topic_07_visuals(1)
    l2_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-7-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question='Rozwiązaniem równania $\\frac{x - 3}{x + 1} = 0$ jest liczba',
            options_data=[
                ('A', '$x = -1$'),
                ('B', '$x = 3$'),
                ('C', '$x = 3$ oraz $x = -1$'),
                ('D', 'Brak rozwiązań')
            ],
            correct_id='B',
            explanation='Ułamek jest równy zero, gdy licznik równa się zero, a mianownik jest różny od zera: $x - 3 = 0 \\longrightarrow x = 3$. Dziedzina to $x \\ne -1$. Ponieważ $3 \\ne -1$, rozwiązaniem jest $x = 3$.',
            cke_trap='Liczba $x = -1$ zeruje mianownik, więc nie może być rozwiązaniem!'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-7-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question='Równanie $\\frac{x^2 - 4}{x - 2} = 0$ w zbiorze liczb rzeczywistych',
            options_data=[
                ('A', 'ma dwa rozwiązania: $x = 2$ oraz $x = -2$'),
                ('B', 'nie ma rozwiązań'),
                ('C', 'ma dokładnie jedno rozwiązanie: $x = -2$'),
                ('D', 'ma dokładnie jedno rozwiązanie: $x = 2$')
            ],
            correct_id='C',
            explanation='Dziedzina: $x - 2 \\ne 0 \\longrightarrow x \\ne 2$. Licznik zeruje się dla $x^2 = 4 \\longrightarrow x = 2$ lub $x = -2$. Kandydat $x = 2$ odpada ze względu na dziedzinę. Jedynym rozwiązaniem jest $x = -2$.',
            cke_trap='Zawsze konfrontuj kandydatów z licznika z dziedziną mianownika! Odrzucenie pierwiastka obcego to klucz do punktu.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-7-2-3',
            source='Matura maj 2023 • Zad. 8',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nRównanie $\\frac{(x+1)(x-1)^2}{(x-1)(x+1)^2} = 0$ w zbiorze liczb rzeczywistych',
            options_data=[
                ('A', 'nie ma rozwiązania.'),
                ('B', 'ma dokładnie jedno rozwiązanie: $-1$.'),
                ('C', 'ma dokładnie jedno rozwiązanie: $1$.'),
                ('D', 'ma dokładnie dwa rozwiązania: $-1$ oraz $1$.')
            ],
            correct_id='A',
            explanation='1) Dziedzina: mianownik $(x-1)(x+1)^2 \\ne 0 \\longrightarrow x \\ne 1$ oraz $x \\ne -1$.\n2) Licznik $(x+1)(x-1)^2 = 0 \\longrightarrow x = -1$ lub $x = 1$.\n3) Obie liczby zerujące licznik są wykluczone przez mianownik! Zatem równanie nie ma żadnego rozwiązania rzeczywistego.',
            cke_trap='Wszystkie pierwiastki licznika okazały się pierwiastkami obcymi. Odpowiedź to: brak rozwiązania.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-7-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz jedyne rozwiązanie rzeczywiste równania $\\frac{2x - 6}{x + 4} = 0$. Wpisz wynik w pole poniżej.',
            correct_val='3',
            explanation='Dziedzina: $x \\ne -4$.\nPrzyrównujemy licznik do zera: $2x - 6 = 0 \\longrightarrow 2x = 6 \\longrightarrow x = 3$.\nLiczba $3 \\ne -4$, więc rozwiązaniem jest $3$.',
            cke_trap='Dzielenie przez $2$: $2x = 6 \\implies x = 3$.'
        ),
        # Zadanie 5: Zadanie otwarte CKE z kryteriami
        make_open_task(
            task_id='task-7-2-5',
            source='Informator CKE • Zad. 19',
            question='Rozwiąż równanie $\\frac{3x - 6}{x - 2} = x + 1$. Zapisz pełne obliczenia z uwzględnieniem dziedziny.',
            points=2,
            scoring_key='1 pkt – wyznaczenie dziedziny $D = \\mathbb{R} \\setminus \\{2\\}$ i doprowadzenie równania do postaci kwadratowej: $x^2 - 4x + 4 = 0$ (lub $(x - 2)^2 = 0$).\\n2 pkt – wyznaczenie kandydata $x = 2$, odrzucenie go ze względu na założenie $x \\ne 2$ i sformułowanie poprawnej odpowiedzi: równanie nie ma rozwiązań ($x \\in \\emptyset$).',
            explanation='1) Dziedzina: mianownik $x - 2 \\ne 0 \\longrightarrow x \\ne 2$, czyli $D = \\mathbb{R} \\setminus \\{2\\}$.\n2) Mnożymy obie strony przez $(x - 2)$:\n$$3x - 6 = (x + 1)(x - 2)$$\n$$3x - 6 = x^2 - 2x + x - 2$$\n$$3x - 6 = x^2 - x - 2$$\n3) Przenosimy na jedną stronę:\n$$x^2 - 4x + 4 = 0$$\n$$(x - 2)^2 = 0 \\longrightarrow x = 2$$\n4) Konfrontacja z dziedziną:\nLiczba $x = 2$ nie należy do dziedziny ($2 \\notin D$).\nZatem równanie nie ma rozwiązań rzeczywistych ($x \\in \\emptyset$).',
            cke_trap='Bez wyznaczenia dziedziny uczeń poda $x = 2$ i straci punkty. Mianownik dla $x=2$ daje dzielenie przez zero!'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-7-2',
        topic_id=topic_id,
        title='Rozwiązywanie równań wymiernych i eliminacja pierwiastków obcych',
        concept_essence='Ułamek równa się zero tylko wtedy, gdy jego licznik jest zerem. Procedura maturalna ma 3 kroki: 1) Wyznaczasz dziedzinę (mianownik $\\ne 0$). 2) Przyrównujesz licznik do zera i wyznaczasz kandydatów na rozwiązania. 3) Porównujesz otrzymane liczby z dziedziną — jeśli któryś kandydat zeruje mianownik, jest tzw. pierwiastkiem obcym i musisz go bezwzględnie odrzucić!',
        matura_context='Podchwytliwe zadania zamknięte i otwarte za 1–2 pkt. Egzaminatorzy CKE celowo dobierają licznik tak, by miał wspólny pierwiastek z mianownikiem.',
        core_formulas=[
            {
                'title': 'Równanie ułamkowe równe zero',
                'latex': '\\frac{L(x)}{M(x)} = 0 \\longrightarrow \\begin{cases} L(x) = 0 \\\\ M(x) \\neq 0 \\end{cases}',
                'description': 'Licznik musi być zerem, a mianownik nie może być zerem.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\frac{x - 4}{x + 2} = 0 \\longrightarrow x = 4 \\quad (x \\neq -2)',
                'mnemonic': 'Góra do zera, dół do kosza (ale po sprawdzeniu dziedziny!).',
                'matura_tip': 'Zawsze zapisuj założenie z mianownika obok równania.'
            },
            {
                'title': 'Eliminacja pierwiastka obcego',
                'latex': 'x_0 \\in \\text{rozwiązań } L(x) = 0 \\quad \\text{oraz} \\quad M(x_0) = 0 \\longrightarrow x_0 \\notin D',
                'description': 'Kandydat zerujący mianownik odpada z ostatecznej odpowiedzi.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\frac{x^2 - 1}{x - 1} = 0 \\longrightarrow x = -1 \\quad (x = 1 \\text{ odpada})',
                'mnemonic': 'Pierwiastek z mianownika to fałszywy przyjaciel.',
                'matura_tip': 'Napisz wyraźnie w arkuszu: "x = 2 nie należy do dziedziny".'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż równanie $\\frac{x^2 - 9}{x + 3} = 0$.',
            'steps': [
                {'num': 1, 'label': 'Założenie z mianownika', 'text': '$x + 3 \\ne 0 \\implies x \\ne -3$. Dziedzina: $D = \\mathbb{R} \\setminus \\{-3\\}$.'},
                {'num': 2, 'label': 'Przyrównanie licznika do zera', 'text': '$x^2 - 9 = 0 \\implies x = 3$ lub $x = -3$.'},
                {'num': 3, 'label': 'Sprawdzenie z dziedziną i wynik CKE', 'text': 'Liczba $-3$ odpada, bo $-3 \\notin D$. Jedynym rozwiązaniem jest $x = 3$.'}
            ],
            'result': 'x = 3'
        },
        exam_trap='Typowy błąd: Podanie dwóch rozwiązań $x = 3$ oraz $x = -3$ bez sprawdzenia dziedziny.\n\nPoprawnie: Liczba $-3$ daje $0$ w mianowniku, więc odpada. Rozwiązaniem jest tylko $x = 3$.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 7.3: Równania wymierne z proporcji (L1.7.3)
    # ----------------------------------------------------
    v3 = get_topic_07_visuals(2)
    l3_tasks = [
        # Zadanie 1: Rozgrzewka / Baza
        make_sc_task(
            task_id='task-7-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Rozwiązaniem równania $\frac{x}{3} = \frac{4}{6}$ jest',
            options_data=[
                ('A', '$x = 1$'),
                ('B', '$x = 2$'),
                ('C', '$x = 12$'),
                ('D', '$x = 4$')
            ],
            correct_id='B',
            explanation=r'Mnożymy na krzyż: $6 \cdot x = 3 \cdot 4 \longrightarrow 6x = 12 \longrightarrow x = 2$.',
            cke_trap='Iloczyn wyrazów skrajnych równa się iloczynowi wyrazów środkowych.'
        ),
        # Zadanie 2: Wzorzec CKE / Pułapka
        make_sc_task(
            task_id='task-7-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question='W równaniu $\\frac{x + 1}{2} = \\frac{3}{x - 1}$ mnożenie na krzyż daje równanie',
            options_data=[
                ('A', '$(x + 1)(x - 1) = 6$'),
                ('B', '$x^2 - 1 = 5$'),
                ('C', '$x + 1 = 6$'),
                ('D', '$(x + 1) \\cdot 3 = 2(x - 1)$')
            ],
            correct_id='A',
            explanation='Mnożymy po przekątnych: $(x + 1) \\cdot (x - 1) = 2 \\cdot 3 = 6$. Pamiętaj o nawiasach przy wielomianach!',
            cke_trap='Nigdy nie mnóż bez nawiasów: zapis $x + 1 \\cdot x - 1$ to częsty błąd zapisu.'
        ),
        # Zadanie 3: Autentyk CKE 1:1
        make_sc_task(
            task_id='task-7-3-3',
            source='Informator CKE • Zad. 18',
            question='Rozwiązaniem równania $\\frac{x - 1}{x + 2} = \\frac{2}{3}$ w zbiorze liczb rzeczywistych jest liczba',
            options_data=[
                ('A', '$7$'),
                ('B', '$-7$'),
                ('C', '$5$'),
                ('D', '$1$')
            ],
            correct_id='A',
            explanation='Dziedzina: $x \\ne -2$.\nMnożymy na krzyż:\n$$3(x - 1) = 2(x + 2)$$\n$$3x - 3 = 2x + 4$$\n$$3x - 2x = 4 + 3 \\longrightarrow x = 7$$\nLiczba $7 \\ne -2$, więc spełnia równanie.',
            cke_trap='Uważaj na wymnożenie obu składników w nawiasie przez liczbę stojącą przed nawiasem: $2(x+2) = 2x + 4$.'
        ),
        # Zadanie 4: Wpisz wynik / Numeryczne
        make_numeric_task(
            task_id='task-7-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question='Oblicz rozwiązanie równania $\\frac{5}{x + 2} = \\frac{3}{x - 2}$. Wpisz wynik w pole poniżej.',
            correct_val='8',
            explanation='Dziedzina: $x \\ne -2$ oraz $x \\ne 2$.\nMnożymy na krzyż:\n$$5(x - 2) = 3(x + 2)$$\n$$5x - 10 = 3x + 6$$\n$$2x = 16 \\longrightarrow x = 8$$\nLiczba $8$ należy do dziedziny.',
            cke_trap='Pamiętaj o znaku minus przy wymnażaniu: $5 \\cdot (-2) = -10$.'
        ),
        # Zadanie 5: Zadanie otwarte CKE z kryteriami
        make_open_task(
            task_id='task-7-3-5',
            source='Informator CKE • Zad. 20',
            question='Rozwiąż równanie $\\frac{3x - 1}{x + 5} = \\frac{2x - 3}{x + 5}$. Zapisz obliczenia.',
            points=2,
            scoring_key='1 pkt – wyznaczenie dziedziny równania $x \\ne -5$ i przyrównanie liczników (lub pomnożenie przez wspólny mianownik): $3x - 1 = 2x - 3$.\\n2 pkt – rozwiązanie równania liniowego $x = -2$, sprawdzenie warunku dziedziny ($-2 \\ne -5$) i zapisanie odpowiedzi $x = -2$.',
            explanation='1) Dziedzina: mianownik $x + 5 \\ne 0 \\longrightarrow x \\ne -5$, czyli $D = \\mathbb{R} \\setminus \\{-5\\}$.\n2) Mianowniki obu ułamków są identyczne, więc dla $x \\ne -5$ przyrównujemy liczniki:\n$$3x - 1 = 2x - 3$$\n$$3x - 2x = -3 + 1$$\n$$x = -2$$\n3) Sprawdzamy z dziedziną: $-2 \\ne -5$, zatem liczba $-2$ jest poprawnym rozwiązaniem równania.',
            cke_trap='Gdyby z obliczeń wyszło $x = -5$, równanie nie miałoby rozwiązań, ponieważ $-5$ zeruje mianownik.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-7-3',
        topic_id=topic_id,
        title='Równania wymierne z proporcji i mnożenie na krzyż',
        concept_essence='Gdy po obu stronach równania masz po jednym ułamku: $\\frac{A}{B} = \\frac{C}{D}$, najwygodniejszą metodą jest mnożenie po przekątnych (tzw. mnożenie na krzyż): $A \\cdot D = B \\cdot C$. Zanim to zrobisz, ZAWSZE zapisz w nawiasach całe wyrażenia dwumianowe i wyznacz dziedzinę: $B \\ne 0$ oraz $D \\ne 0$. Po wymnożeniu otrzymujesz proste równanie liniowe lub kwadratowe.',
        matura_context='Podstawowy typ równania wymiernego za 1–2 pkt w każdym arkuszu maturalnym.',
        core_formulas=[
            {
                'title': 'Mnożenie na krzyż (proporcja)',
                'latex': '\\frac{a}{b} = \\frac{c}{d} \\longrightarrow a \\cdot d = b \\cdot c \\quad (b, d \\neq 0)',
                'description': 'Iloczyn po jednej przekątnej równa się iloczynowi po drugiej.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\frac{x}{2} = \\frac{6}{3} \\longrightarrow 3x = 12 \\longrightarrow x = 4',
                'mnemonic': 'Przekątne mnożą się na krzyż.',
                'matura_tip': 'Pamiętaj o nawiasach: $(x+1)(x-2)$, a nie $x+1 \\cdot x-2$.'
            },
            {
                'title': 'Dziedzina proporcji',
                'latex': 'b \\neq 0 \\quad \\text{oraz} \\quad d \\neq 0',
                'description': 'Oba mianowniki muszą być jednocześnie różne od zera.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\frac{1}{x - 1} = \\frac{2}{x + 3} \\longrightarrow x \\neq 1 \\text{ oraz } x \\neq -3',
                'mnemonic': 'Sprawdź oba doły ułamków.',
                'matura_tip': 'Nawet banalne mnożenie na krzyż wymaga założeń wstępnych.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż równanie $\\frac{2x - 1}{x + 2} = \\frac{3}{4}$.',
            'steps': [
                {'num': 1, 'label': 'Wyznaczenie dziedziny', 'text': '$x + 2 \\ne 0 \\implies x \\ne -2$. Dziedzina: $D = \\mathbb{R} \\setminus \\{-2\\}$.'},
                {'num': 2, 'label': 'Mnożenie na krzyż', 'text': '$4 \\cdot (2x - 1) = 3 \\cdot (x + 2) \\implies 8x - 4 = 3x + 6$.'},
                {'num': 3, 'label': 'Rozwiązanie równania liniowego', 'text': '$8x - 3x = 6 + 4 \\implies 5x = 10 \\implies x = 2$.'},
                {'num': 4, 'label': 'Sprawdzenie z dziedziną i wynik CKE', 'text': '$2 \\ne -2$, więc rozwiązaniem jest $x = 2$.'}
            ],
            'result': 'x = 2'
        },
        exam_trap='Typowy błąd: Wymnażanie na krzyż bez nawiasów: $4 \\cdot 2x - 1 = 3 \\cdot x + 2$ (brak wymnożenia wyrazów wolnych $-1$ i $+2$).\n\nPoprawnie: Zawsze bierz cały licznik i mianownik w nawias: $4(2x - 1) = 3(x + 2)$.',
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
        'description': 'Dziedzina wyrażenia wymiernego, warunek mianownika różnego od zera, eliminacja pierwiastków obcych oraz rozwiązywanie równań z proporcji.',
        'lessons': lessons
    }

if __name__ == '__main__':
    t = build_topic_07()
    print(f"Pomyślnie zbudowano {t['title']} ({len(t['lessons'])} lekcje, {sum(len(l['tasks']) for l in t['lessons'])} zadań).")
