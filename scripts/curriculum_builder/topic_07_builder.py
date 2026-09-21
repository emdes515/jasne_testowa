"""
topic_07_builder.py - Dział 1.7: Równania i wyrażenia wymierne (3 lekcje | Tier S+)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_07 import get_topic_07_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_07():
    topic_id = 'dzial-7'
    topic_title = 'Dział 1.7: Równania i wyrażenia wymierne'
    lessons = []

    # ----------------------------------------------------
    # Lekcja 7.1: Dziedzina wyrażenia wymiernego (L1.7.1)
    # ----------------------------------------------------
    v1 = get_topic_07_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-7-1-1',
            source='Rozgrzewka • Mianownik różny od zera',
            question='Dziedziną wyrażenia $W(x) = \\frac{x + 2}{x - 5}$ jest zbiór',
            options_data=[
                ('A', '$\\mathbb{R} \\setminus \\{5\\}$'),
                ('B', '$\\mathbb{R} \\setminus \\{-2\\}$'),
                ('C', '$\\mathbb{R} \\setminus \\{-2, 5\\}$'),
                ('D', '$\\mathbb{R}$')
            ],
            correct_id='A',
            explanation='Warunek istnienia ułamka to mianownik różny od zera: $x - 5 \\ne 0 \\implies x \\ne 5$. Licznik nie wpływa na dziedzinę. Zatem $D = \\mathbb{R} \\setminus \\{5\\}$.',
            cke_trap='Licznik ułamka MOŻE być zerem! Do dziedziny interesuje nas wyłącznie mianownik.'
        ),
        make_sc_task(
            task_id='task-7-1-2',
            source='Matura Maj 2023 • Zad. 6',
            question='Dziedziną funkcji $f(x) = \\frac{2x - 1}{(x + 3)(x - 4)}$ jest zbiór',
            options_data=[
                ('A', '$\\mathbb{R} \\setminus \\{-3, 4\\}$'),
                ('B', '$\\mathbb{R} \\setminus \\{3, -4\\}$'),
                ('C', '$\\mathbb{R} \\setminus \\{\\frac{1}{2}, -3, 4\\}$'),
                ('D', '$\\mathbb{R} \\setminus \\{-3\\}$')
            ],
            correct_id='A',
            explanation='Mianownik zeruje się dla $x = -3$ oraz $x = 4$. Obie te liczby wykluczamy ze zbioru liczb rzeczywistych: $D = \\mathbb{R} \\setminus \\{-3, 4\\}$.',
            cke_trap='Uważaj na znaki w nawiasach: $(x + 3) = 0 \\implies x = -3$, a $(x - 4) = 0 \\implies x = 4$.'
        ),
        make_sc_task(
            task_id='task-7-1-3',
            source='Pułapka CKE • Mianownik z sumą kwadratów',
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
        make_tf_task(
            task_id='task-7-1-4',
            source='Trening CKE • Kolejność działań',
            question='Oceń prawdziwość zdania: Dziedzinę wyrażenia wymiernego należy wyznaczyć przed jakimkolwiek skracaniem ułamka.',
            correct_tf='PRAWDA',
            explanation='Dziedzina to zbiór liczb, dla których wyrażenie w postaci początkowej ma sens. Skrócenie ułamka przed podaniem dziedziny prowadzi do utraty założeń i błędu merytorycznego.',
            cke_trap='Np. $\\frac{x-2}{x-2} = 1$, ale dziedziną jest $\\mathbb{R} \\setminus \\{2\\}$, a nie $\\mathbb{R}$.'
        ),
        make_numeric_task(
            task_id='task-7-1-5',
            source='Utrwalenie • Liczba wykluczonych punktów',
            question='Ile liczb rzeczywistych nie należy do dziedziny wyrażenia $W(x) = \\frac{x^2 - 1}{(x - 1)(x + 2)(x^2 - 9)}$?',
            correct_val=4,
            explanation='Mianownik zeruje się dla: $x = 1$, $x = -2$, $x = 3$, $x = -3$. Jest to łącznie 4 różne liczby.',
            cke_trap='Nawet jeśli licznik $x^2 - 1$ ma wspólny pierwiastek $x = 1$ z mianownikiem, liczba ta MUSI być wykluczona z dziedziny!'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-7-1',
        topic_id=topic_id,
        title='L1.7.1: Dziedzina wyrażenia wymiernego – żelazny warunek mianownik != 0',
        concept_essence='W matematyce nie wolno dzielić przez zero. Dlatego gdy widzisz ułamek algebraiczny, Twoim pierwszym odruchem jest zapisanie warunku: mianownik $\\ne 0$. Wyznaczasz liczby zerujące mianownik i wyrzucasz je ze zbioru liczb rzeczywistych za pomocą ukośnika: $D = \\mathbb{R} \\setminus \\{x_1, x_2\\}$. Pamiętaj: dziedzinę wyznaczasz ZAWSZE na samym początku, zanim cokolwiek skrócić!',
        matura_context='Wyznaczanie dziedziny ułamka algebraicznego to samodzielne zadanie za 1 pkt lub obowiązkowy warunek zaliczenia zadania za 2 pkt.',
        core_formulas=[
            {
                'title': 'Warunek istnienia ułamka algebraicznego',
                'latex': '\\frac{L(x)}{M(x)} \\implies M(x) \\neq 0',
                'description': 'Mianownik ułamka musi być różny od zera.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\frac{1}{x - 3} \\implies x - 3 \\neq 0 \\implies x \\neq 3 \\implies D = \\mathbb{R} \\setminus \\{3\\}',
                'mnemonic': 'Dół ułamka nigdy nie może być zerem.',
                'matura_tip': 'Licznikiem nie przejmujesz się przy dziedzinie.'
            },
            {
                'title': 'Dziedzina dla mianownika kwadratowego',
                'latex': 'x^2 - a^2 \\neq 0 \\implies x \\neq a \\quad \\text{oraz} \\quad x \\neq -a',
                'description': 'Różnica kwadratów w mianowniku wyklucza dwa symetryczne punkty.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': 'x^2 - 4 \\neq 0 \\implies D = \\mathbb{R} \\setminus \\{-2, 2\\}',
                'mnemonic': 'Kwadrat z minusem wyrzuca dwie liczby.',
                'matura_tip': 'Dla $x^2 + 4$ mianownik nigdy się nie zeruje, więc $D = \\mathbb{R}$.'
            }
        ],
        worked_example={
            'problem': 'Wyznacz dziedzinę wyrażenia wymiernego $W(x) = \\frac{3x + 1}{x^2 - 16}$.',
            'steps': [
                {'num': 1, 'label': 'Zapisanie warunku mianownika', 'text': '$x^2 - 16 \\ne 0$.'},
                {'num': 2, 'label': 'Rozwiązanie równania z mianownika', 'text': '$x^2 = 16 \\implies x = 4$ lub $x = -4$.'},
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
    # Lekcja 7.2: Równania L(x)/M(x) = 0 i pierwiastki obce (L1.7.2)
    # ----------------------------------------------------
    v2 = get_topic_07_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-7-2-1',
            source='Rozgrzewka • Zerowanie ułamka',
            question='Równanie $\\frac{x - 3}{x + 4} = 0$ jest spełnione dla',
            options_data=[
                ('A', '$x = 3$'),
                ('B', '$x = -4$'),
                ('C', '$x = 3$ oraz $x = -4$'),
                ('D', 'Żadnej liczby rzeczywistej')
            ],
            correct_id='A',
            explanation='1) Dziedzina: $x + 4 \\ne 0 \\implies x \\ne -4$.\n2) Zerowanie licznika: $x - 3 = 0 \\implies x = 3$.\nLiczba 3 należy do dziedziny, więc jest jedynym rozwiązaniem.',
            cke_trap='Liczba $-4$ zeruje mianownik, więc nie może być rozwiązaniem!'
        ),
        make_sc_task(
            task_id='task-7-2-2',
            source='Matura Maj 2024 • Zad. 8',
            question='Równanie $\\frac{(x - 3)(x + 5)}{x - 3} = 0$ w zbiorze liczb rzeczywistych',
            options_data=[
                ('A', 'Ma dokładnie jedno rozwiązanie: $x = -5$'),
                ('B', 'Ma dokładnie dwa rozwiązania: $x = 3$ oraz $x = -5$'),
                ('C', 'Ma dokładnie jedno rozwiązanie: $x = 3$'),
                ('D', 'Nie ma rozwiązań')
            ],
            correct_id='A',
            explanation='1) Dziedzina: $x - 3 \\ne 0 \\implies x \\ne 3$.\n2) Licznik $= 0$: $x = 3$ lub $x = -5$.\n3) Liczba $x = 3$ jest wykluczona przez mianownik (pierwiastek obcy). Jedynym poprawnym rozwiązaniem jest $x = -5$.',
            cke_trap='Zaznaczenie obu liczb $3$ i $-5$ to klasyczna pułapka maturalna. Zawsze weryfikuj pierwiastki z dziedziną!'
        ),
        make_sc_task(
            task_id='task-7-2-3',
            source='Pułapka CKE • Wszystkie pierwiastki odpadają',
            question='Równanie $\\frac{x^2 - 4}{x - 2} = 0$ ma w zbiorze liczb rzeczywistych',
            options_data=[
                ('A', 'Dokładnie jedno rozwiązanie: $x = -2$'),
                ('B', 'Dwa rozwiązania: $x = 2$ oraz $x = -2$'),
                ('C', 'Jedno rozwiązanie: $x = 2$'),
                ('D', 'Brak rozwiązań')
            ],
            correct_id='A',
            explanation='Dziedzina: $x \\ne 2$. Licznik: $x^2 - 4 = 0 \\implies x = 2$ (odpada!) lub $x = -2$ (zostaje). Równanie ma 1 rozwiązanie: $x = -2$.',
            cke_trap='Liczba $2$ zeruje mianownik i odpada, ale $-2$ nie zeruje mianownika i jest poprawnym rozwiązaniem.'
        ),
        make_tf_task(
            task_id='task-7-2-4',
            source='Trening CKE • Brak rozwiązań w liczniku',
            question='Oceń prawdziwość zdania: Równanie $\\frac{x^2 + 1}{x - 3} = 0$ nie posiada żadnych rozwiązań rzeczywistych.',
            correct_tf='PRAWDA',
            explanation='Ułamek zeruje się wtedy, gdy licznik jest zerem. Wyrażenie $x^2 + 1$ jest zawsze większe od zera i nigdy nie równa się zero, więc równanie nie ma rozwiązań.',
            cke_trap='Nawet jeśli mianownik ma sens, brak zer w liczniku oznacza brak rozwiązań całego równania.'
        ),
        make_numeric_task(
            task_id='task-7-2-5',
            source='Utrwalenie • Suma rozwiązań',
            question='Oblicz sumę wszystkich rozwiązań rzeczywistych równania $\\frac{(x^2 - 9)(x - 5)}{x + 3} = 0$.',
            correct_val=8,
            explanation='Dziedzina: $x \\ne -3$. Licznik zeruje się dla $3, -3, 5$. Liczba $-3$ odpada w dziedzinie. Zostają $3$ oraz $5$. Ich suma wynosi $3 + 5 = 8$.',
            cke_trap='Gdybyś nie odrzucił $-3$, otrzymałbyś błędną sumę $5$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-7-2',
        topic_id=topic_id,
        title='L1.7.2: Rozwiązywanie równań L(x)/M(x) = 0 i eliminacja pierwiastków obcych',
        concept_essence='Równanie w postaci ułamka przyrównanego do zera rozwiązuje się w 3 krokach: 1) KROK 1: Dziedzina — sprawdzasz mianownik $M(x) \\ne 0$ i wykluczasz niebezpieczne liczby. 2) KROK 2: Licznik do zera — ułamek znika, rozwiązujesz $L(x) = 0$ i otrzymujesz kandydatów na pierwiastki. 3) KROK 3: Sito dziedziny — sprawdzasz każdego kandydata. Jeśli którykolwiek zerował mianownik, bezwzględnie go skreślasz (to tzw. pierwiastek obcy!).',
        matura_context='Żelazny pewniak na każdej maturze (Maj 2024 zad. 8, Czerwiec 2023 zad. 6). Zawsze jeden z pierwiastków licznika odpada!',
        core_formulas=[
            {
                'title': 'Rozwiązywanie równania wymiernego',
                'latex': '\\frac{L(x)}{M(x)} = 0 \\implies \\begin{cases} L(x) = 0 \\\\ M(x) \\neq 0 \\end{cases}',
                'description': 'Licznik musi być zerem, a mianownik nie może być zerem.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\frac{x - 2}{x + 1} = 0 \\implies x = 2 \\quad (D = \\mathbb{R} \\setminus \\{-1\\})',
                'mnemonic': 'Licznik do zera, mianownik do kosza (ale po sprawdzeniu dziedziny!).',
                'matura_tip': 'Zawsze zapisz dziedzinę obok równania.'
            },
            {
                'title': 'Eliminacja pierwiastka obcego',
                'latex': 'x_k \\notin D \\implies x_k \\text{ nie jest rozwiązaniem}',
                'description': 'Liczba zerująca mianownik jest natychmiast odrzucana.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\frac{(x-1)(x-2)}{x-1} = 0 \\implies x = 2 \\quad (x = 1 \\text{ odpada})',
                'mnemonic': 'Jeśli mianownik mówi nie, pierwiastek wylatuje.',
                'matura_tip': 'CKE w 99% przypadków podkłada wspólny czynnik w liczniku i mianowniku.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż równanie $\\frac{(x - 4)(x + 2)}{x^2 - 4} = 0$.',
            'steps': [
                {'num': 1, 'label': 'Wyznaczenie dziedziny', 'text': '$x^2 - 4 \\ne 0 \\implies x \\ne 2$ oraz $x \\ne -2$. Dziedzina: $D = \\mathbb{R} \\setminus \\{-2, 2\\}$.'},
                {'num': 2, 'label': 'Przyrównanie licznika do zera', 'text': '$(x - 4)(x + 2) = 0 \\implies x = 4$ lub $x = -2$.'},
                {'num': 3, 'label': 'Weryfikacja z dziedziną i wynik CKE', 'text': 'Kandydat $x = 4 \\in D$ (poprawny). Kandydat $x = -2 \\notin D$ (odpada!). Jedynym rozwiązaniem jest $x = 4$.'}
            ],
            'result': 'x = 4'
        },
        exam_trap='Typowy błąd: Podanie obu liczb z licznika jako odpowiedzi bez sprawdzenia mianownika.\n\nPoprawnie: Zawsze podstaw otrzymane wyniki do mianownika. Jeśli mianownik da 0, skreśl ten wynik natychmiast!',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 7.3: Równania z proporcji (mnożenie na krzyż) (L1.7.3)
    # ----------------------------------------------------
    v3 = get_topic_07_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-7-3-1',
            source='Rozgrzewka • Prosta proporcja',
            question='Rozwiązaniem równania $\\frac{x + 1}{2} = \\frac{3}{4}$ jest liczba',
            options_data=[
                ('A', '$x = \\frac{1}{2}$'),
                ('B', '$x = 1$'),
                ('C', '$x = \\frac{5}{2}$'),
                ('D', '$x = -\\frac{1}{2}$')
            ],
            correct_id='A',
            explanation='Mnożymy na krzyż: $4(x + 1) = 2 \\cdot 3 \\implies 4x + 4 = 6 \\implies 4x = 2 \\implies x = \\frac{2}{4} = \\frac{1}{2}$.',
            cke_trap='Pamiętaj o wymnożeniu CAŁEGO licznika $(x + 1)$ przez 4: $4x + 4$, a nie samo $4x + 1$.'
        ),
        make_sc_task(
            task_id='task-7-3-2',
            source='Matura Maj 2023 • Zad. zbliżone',
            question='Rozwiązaniem równania $\\frac{2}{x - 1} = \\frac{3}{x + 2}$ jest liczba',
            options_data=[
                ('A', '$7$'),
                ('B', '$-7$'),
                ('C', '$5$'),
                ('D', '$-5$')
            ],
            correct_id='A',
            explanation='1) Dziedzina: $x \\ne 1$ oraz $x \\ne -2$.\n2) Mnożymy na krzyż: $2(x + 2) = 3(x - 1) \\implies 2x + 4 = 3x - 3$.\n3) Przenosimy: $-x = -7 \\implies x = 7$. Liczba 7 należy do dziedziny.',
            cke_trap='Zawsze zapisz oba wyrażenia w nawiasach: $2(x + 2) = 3(x - 1)$.'
        ),
        make_sc_task(
            task_id='task-7-3-3',
            source='Pułapka CKE • Rozwiązanie odrzucone w proporcji',
            question='Równanie $\\frac{x - 2}{x + 3} = \\frac{x - 2}{2x + 1}$ dla $x \\ne -3$ oraz $x \\ne -0{,}5$',
            options_data=[
                ('A', 'Ma dokładnie jedno rozwiązanie: $x = 2$'),
                ('B', 'Ma dwa rozwiązania: $x = 2$ oraz $x = -2$'),
                ('C', 'Ma dwa rozwiązania: $x = 2$ oraz $x = 4$'),
                ('D', 'Nie ma rozwiązań')
            ],
            correct_id='A',
            explanation='Liczniki są równe: $x - 2 = 0 \\implies x = 2$. Przyrównanie mianowników: $x + 3 = 2x + 1 \\implies x = 2$. Oba przypadki dają to samo rozwiązanie: $x = 2$, które należy do dziedziny.',
            cke_trap='Ułamek jest spełniony, gdy liczniki są równe zero LUB mianowniki są sobie równe.'
        ),
        make_tf_task(
            task_id='task-7-3-4',
            source='Trening CKE • Zasada proporcji',
            question='Oceń prawdziwość zdania: Równanie $\\frac{A}{B} = \\frac{C}{D}$ po wyznaczeniu dziedziny jest równoważne równaniu $A \\cdot D = B \\cdot C$.',
            correct_tf='PRAWDA',
            explanation='To fundamentalna własność proporcji: iloczyn wyrazów skrajnych równa się iloczynowi wyrazów środkowych.',
            cke_trap='Pamiętaj o konieczności wyznaczenia dziedziny ($B \\ne 0$ i $D \\ne 0$) przed mnożeniem.'
        ),
        make_numeric_task(
            task_id='task-7-3-5',
            source='Utrwalenie • Rozwiązanie proporcji',
            question='Rozwiąż równanie $\\frac{3x - 1}{4} = \\frac{2x + 5}{3}$. Podaj wartość liczby $x$.',
            correct_val=23,
            explanation='Mnożymy na krzyż: $3(3x - 1) = 4(2x + 5) \\implies 9x - 3 = 8x + 20 \\implies 9x - 8x = 20 + 3 \\implies x = 23$.',
            cke_trap='Uważaj na znaki przy wymnażaniu: $3 \\cdot (-1) = -3$ oraz $4 \\cdot 5 = 20$.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-7-3',
        topic_id=topic_id,
        title='L1.7.3: Równania wymierne z proporcji i mnożenie na krzyż',
        concept_essence='Gdy po lewej i prawej stronie masz po jednym ułamku: $\\frac{A}{B} = \\frac{C}{D}$, najwygodniejszą techniką jest mnożenie na krzyż: $A \\cdot D = B \\cdot C$. Pozbywasz się kresek ułamkowych jednym ruchem! Pamiętaj jednak o żelaznej dyscyplinie: 1) Najpierw dziedzina: $B \\ne 0$ oraz $D \\ne 0$. 2) Składniki wielowyrazowe ZAWSZE bierz w nawiasy: $A \\cdot (D) = B \\cdot (C)$. 3) Po wyznaczeniu wyniku porównaj go z dziedziną.',
        matura_context='Regularnie pojawia się w zadaniach zamkniętych i zadaniach otwartych krótkiej odpowiedzi.',
        core_formulas=[
            {
                'title': 'Mnożenie na krzyż (własność proporcji)',
                'latex': '\\frac{a}{b} = \\frac{c}{d} \\implies a \\cdot d = b \\cdot c \\quad (b \\neq 0, d \\neq 0)',
                'description': 'Iloczyn po przekątnych jest sobie równy.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\frac{x}{3} = \\frac{4}{6} \\implies 6x = 12 \\implies x = 2',
                'mnemonic': 'Mnożenie po przekątnej likwiduje ułamki.',
                'matura_tip': 'Zawsze otaczaj wielomiany nawiasami.'
            },
            {
                'title': 'Równanie z liczbą po prawej stronie',
                'latex': '\\frac{f(x)}{g(x)} = c \\implies f(x) = c \\cdot g(x) \\quad (g(x) \\neq 0)',
                'description': 'Liczbę c traktujemy jako ułamek c/1.',
                'in_cke_sheet': False,
                'cke_page': '-',
                'example': '\\frac{2x - 1}{x + 3} = 1 \\implies 2x - 1 = x + 3 \\implies x = 4',
                'mnemonic': 'Mnożysz obie strony przez mianownik.',
                'matura_tip': 'Pamiętaj o dziedzinie: x != -3.'
            }
        ],
        worked_example={
            'problem': 'Rozwiąż równanie $\\frac{x + 3}{x - 2} = \\frac{2x - 1}{2x + 1}$.',
            'steps': [
                {'num': 1, 'label': 'Wyznaczenie dziedziny', 'text': '$x - 2 \\ne 0 \\implies x \\ne 2$ oraz $2x + 1 \\ne 0 \\implies x \\ne -0{,}5$. Dziedzina: $D = \\mathbb{R} \\setminus \\{-0{,}5, 2\\}$.'},
                {'num': 2, 'label': 'Mnożenie na krzyż w nawiasach', 'text': '$(x + 3)(2x + 1) = (x - 2)(2x - 1)$.'},
                {'num': 3, 'label': 'Wymnożenie i redukcja wyrazów podobnych', 'text': '$2x^2 + 7x + 3 = 2x^2 - 5x + 2 \\implies 12x = -1 \\implies x = -\\frac{1}{12}$. Wynik należy do dziedziny.'}
            ],
            'result': 'x = -\\frac{1}{12}'
        },
        exam_trap='Typowy błąd: Mnożenie bez nawiasów: $x + 3 \\cdot 2x + 1$ zamiast $(x + 3)(2x + 1)$.\n\nPoprawnie: Kreska ułamkowa działa jak nawias — przy mnożeniu na krzyż ZAWSZE otaczaj liczniki i mianowniki nawiasami.',
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
        'description': 'Wyznaczanie dziedziny ułamków algebraicznych, rozwiązywanie równań wymiernych, eliminacja pierwiastków obcych oraz metoda proporcji.',
        'lessons': lessons
    }
