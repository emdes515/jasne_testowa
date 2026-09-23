"""
topic_02_builder.py - Dział 1.2: Logarytmy (3 lekcje | Tier S+)
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_02 import get_topic_02_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_02():
    topic_id = 'dzial-2'
    topic_title = 'Logarytmy'
    topic_number = 2
    lessons = []

    # ----------------------------------------------------
    # Lekcja 2.1: Definicja logarytmu (L1.2.1)
    # ----------------------------------------------------
    v1 = get_topic_02_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-2-1-1',
            source='Rozgrzewka • Definicja logarytmu',
            question='Wartość logarytmu $\\log_2 32$ jest równa',
            options_data=[
                ('A', '$16$'),
                ('B', '$5$'),
                ('C', '$64$'),
                ('D', '$4$')
            ],
            correct_id='B',
            explanation='Z definicji logarytmu: $\\log_2 32 = c \\implies 2^c = 32$. Ponieważ $2^5 = 32$, wynik to $5$.',
            cke_trap='Logarytm to pytanie o wykładnik potęgi, a nie iloraz (nie dziel 32 przez 2!).'
        ),
        make_sc_task(
            task_id='task-2-1-2',
            source='Matura maj 2024 • Zad. 4',
            question='Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nLiczba $\\log_{\\sqrt{3}} 9$ jest równa',
            options_data=[
                ('A', '$2$'),
                ('B', '$3$'),
                ('C', '$4$'),
                ('D', '$9$')
            ],
            correct_id='C',
            explanation='Z definicji logarytmu $\\log_{\\sqrt{3}} 9 = c$, co oznacza, że $(\\sqrt{3})^c = 9$. Sprowadzamy obie strony do wspólnej podstawy $3$:\n$$(\\sqrt{3})^c = (3^{\\frac{1}{2}})^c = 3^{\\frac{c}{2}}, \\quad 9 = 3^2$$\nPrzyrównujemy wykładniki: $\\frac{c}{2} = 2$, co oznacza, że $c = 4$. Zatem $\\log_{\\sqrt{3}} 9 = 4$.',
            cke_trap='Nie myl pierwiastka w podstawie z dzieleniem $9 : \\sqrt{3}$. Poprawny wynik $4$ wynika z faktu, że $(\\sqrt{3})^4 = 3^2 = 9$.'
        ),
        make_sc_task(
            task_id='task-2-1-3',
            source='Pułapka CKE • Ujemny wynik logarytmu',
            question='Wartość wyrażenia $\\log_5 \\frac{1}{25}$ wynosi',
            options_data=[
                ('A', '$-2$'),
                ('B', '$2$'),
                ('C', '$\\frac{1}{2}$'),
                ('D', '$-\\frac{1}{2}$')
            ],
            correct_id='A',
            explanation='$5^c = \\frac{1}{25} = 5^{-2} \\implies c = -2$. Ułamek w liczbie logarytmowanej daje ujemny wykładnik.',
            cke_trap='Liczba logarytmowana musi być dodatnia, ale wynik logarytmu jak najbardziej może być ujemny!'
        ),
        make_tf_task(
            task_id='task-2-1-4',
            source='Trening CKE • Logarytm z jedynki i podstawy',
            question='Oceń prawdziwość zdania: Dla każdej dozwolonej podstawy $a > 0, a \\neq 1$ zachodzi $\\log_a 1 = 0$ oraz $\\log_a a = 1$.',
            correct_tf='PRAWDA',
            explanation='Ponieważ $a^0 = 1$ oraz $a^1 = a$, te dwie własności są zawsze prawdziwe.',
            cke_trap='Niezależnie od podstawy, logarytm z liczby 1 wynosi zawsze zero.'
        ),
        make_numeric_task(
            task_id='task-2-1-5',
            source='Utrwalenie • Logarytm dziesiętny',
            question='Oblicz wartość logarytmu dziesiętnego $\\log 1000$.',
            correct_val=3,
            explanation='Brak podstawy oznacza podstawę 10: $10^c = 1000 = 10^3 \\implies c = 3$.',
            cke_trap='Zapis $\\log x$ bez dolnego indeksu to logarytm o podstawie 10.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-2-1',
        topic_id=topic_id,
        title='Definicja logarytmu i pętla logarytmiczna',
        concept_essence='Logarytm to pytanie o wykładnik potęgi: "Do jakiej potęgi $c$ muszę podnieść podstawę $a$, aby otrzymać liczbę $b$?". Zasada pętli: podstawa $a$ zatacza koło przez znak równości do liczby $c$ i ląduje na $b$ ($a^c = b$). Warunki konieczne (CKE): podstawa $a > 0$ i $a \\neq 1$, liczba logarytmowana $b > 0$.',
        matura_context='Pewniak za 1 punkt na każdej maturze (zazwyczaj zadanie 2 lub 3).',
        core_formulas=[
            {
                'title': 'Definicja logarytmu',
                'latex': r'\log_a b = c \implies a^c = b',
                'description': 'Logarytm to wykładnik potęgi, do której należy podnieść a, by otrzymać b.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': r'\log_3 81 = 4, \quad \text{bo } 3^4 = 81',
                'mnemonic': 'Kółko potęgowania: a podnosisz do wyniku c i lądujesz w b.',
                'matura_tip': r'Gdy brak podstawy (np. $\log 100$), domyślną podstawą jest 10 ($\log_{10} 100 = 2$).'
            },
            {
                'title': 'Warunki istnienia logarytmu',
                'latex': r'a > 0,\quad a \neq 1,\quad b > 0',
                'description': 'Założenia konieczne, by logarytm istniał w liczbach rzeczywistych.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': r'\log_5 1 = 0, \quad \log_a a = 1',
                'mnemonic': 'Podstawa: dodatnia i nie jeden. Środek: tylko dodatni!',
                'matura_tip': r'Logarytm z 1 to ZAWSZE 0, niezależnie od podstawy (bo $a^0 = 1$).'
            }
        ],
        worked_example={
            'problem': r'Oblicz wartość logarytmu $\log_{\sqrt{2}} 8$.',
            'steps': [
                {'num': 1, 'label': 'Zapisanie równania wykładniczego', 'text': r'Układamy równanie z definicji: $(\sqrt{2})^c = 8$.'},
                {'num': 2, 'label': 'Sprowadzenie do podstawy 2', 'text': r'Lewa strona: $(\sqrt{2})^c = (2^{\frac{1}{2}})^c = 2^{\frac{c}{2}}$. Prawa strona: $8 = 2^3$.'},
                {'num': 3, 'label': 'Przyrównanie wykładników i wynik CKE', 'text': r'$\frac{c}{2} = 3 \implies c = 6$. Zatem $\log_{\sqrt{2}} 8 = 6$.'}
            ],
            'result': '6'
        },
        exam_trap=r'Typowy błąd: Dzielenie liczb w logarytmie: $\log_2 16 = 16 : 2 = 8$.' + '\n\n' + r'Poprawnie: Pytaj o potęgę: $2^c = 16 \implies c = 4$, bo $2^4 = 16$.',
        visuals=v1,
        tasks=l1_tasks
    )
    lessons.append(l1)

    # ----------------------------------------------------
    # Lekcja 2.2: Wzory na sumę i różnicę logarytmów (L1.2.2)
    # ----------------------------------------------------
    v2 = get_topic_02_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-2-2-1',
            source='Rozgrzewka • Suma logarytmów',
            question=r'Wartość wyrażenia $\log_6 4 + \log_6 9$ jest równa',
            options_data=[
                ('A', r'$\log_6 13$'),
                ('B', '$2$'),
                ('C', '$1$'),
                ('D', r'$\log_{12} 36$')
            ],
            correct_id='B',
            explanation=r'Suma logarytmów o tej samej podstawie to logarytm iloczynu: $\log_6 4 + \log_6 9 = \log_6(4 \cdot 9) = \log_6 36$. Ponieważ $6^2 = 36$, wartość wynosi $2$.',
            cke_trap='Nigdy nie dodawaj liczb w środku ($4 + 9 = 13$) ani podstaw ($6 + 6 = 12$)!'
        ),
        make_sc_task(
            task_id='task-2-2-2',
            source='Matura maj 2023 • Zad. 4',
            question=r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' + r'Liczba $\log_9 27 + \log_9 3$ jest równa',
            options_data=[
                ('A', '$81$'),
                ('B', '$9$'),
                ('C', '$4$'),
                ('D', '$2$')
            ],
            correct_id='D',
            explanation=r'Stosujemy wzór na sumę logarytmów o tej samej podstawie: $\log_a x + \log_a y = \log_a(x \cdot y)$.' + '\n' + r'$$\log_9 27 + \log_9 3 = \log_9(27 \cdot 3) = \log_9 81$$' + '\n' + r'Ponieważ $9^2 = 81$, wartość logarytmu wynosi $2$.',
            cke_trap=r'Nigdy nie dodawaj liczb logarytmowanych: $27 + 3 = 30$. Dodawanie logarytmów zamienia się w mnożenie liczb pod logarytmem: $27 \cdot 3 = 81$.'
        ),
        make_sc_task(
            task_id='task-2-2-3',
            source='Pułapka CKE • Suma logarytmów dziesiętnych',
            question=r'Wartość wyrażenia $\log 25 + \log 40$ jest równa',
            options_data=[
                ('A', r'$\log 65$'),
                ('B', '$3$'),
                ('C', '$1000$'),
                ('D', '$4$')
            ],
            correct_id='B',
            explanation=r'Brak podstawy oznacza logarytm dziesiętny (podstawa 10). Dodawanie zamienia się w mnożenie: $\log(25 \cdot 40) = \log 1000$. Ponieważ $10^3 = 1000$, wynik to $3$.',
            cke_trap=r'Pamiętaj: $\log 1000 = 3$, a nie $1000$ (pytamy o potęgę dziesiątki!).'
        ),
        make_numeric_task(
            task_id='task-2-2-4',
            source='Zadanie utrwalające • Iloraz logarytmów',
            question=r'Oblicz wartość wyrażenia $\log_2 48 - \log_2 3$. Wpisz wynik jako liczbę całkowitą.',
            correct_val='4',
            explanation=r'Stosujemy wzór na różnicę logarytmów: $\log_2 48 - \log_2 3 = \log_2\left(\frac{48}{3}\right) = \log_2 16 = 4$, bo $2^4 = 16$.',
            cke_trap='Sprawdź dzielenie: $48 : 3 = 16$.'
        ),
        make_sc_task(
            task_id='task-2-2-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wartość wyrażenia $\log_2 12 + \log_2 \frac{4}{3}$ jest równa',
            options_data=[
                ('A', '$4$'),
                ('B', r'$\log_2 \frac{40}{3}$'),
                ('C', '$16$'),
                ('D', '$2$')
            ],
            correct_id='A',
            explanation=r'Stosujemy wzór na sumę logarytmów o tej samej podstawie: $\log_2 12 + \log_2 \frac{4}{3} = \log_2\left(12 \cdot \frac{4}{3}\right) = \log_2(4 \cdot 4) = \log_2 16 = 4$, ponieważ $2^4 = 16$.',
            cke_trap=r'Nigdy nie dodawaj liczb w ułamku ($12 + \frac{4}{3} = \frac{40}{3}$) – dodawanie logarytmów zamienia się w mnożenie liczb pod logarytmem!'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-2-2',
        topic_id=topic_id,
        title='Wzory na sumę i różnicę logarytmów o tej samej podstawie',
        concept_essence=r'W zadaniach maturalnych niemal nigdy nie dostaniesz "ładnych" logarytmów do policzenia w pamięci (np. $\log_6 4$ ani $\log_6 9$ nie dają liczb całkowitych). Kluczem jest połączenie ich w jeden logarytm: DODAWANIE dwóch logarytmów zamienia się w MNOŻENIE ich wnętrz: $\log_a x + \log_a y = \log_a(x \cdot y)$. ODEJMOWANIE zamienia się w DZIELENIE: $\log_a x - \log_a y = \log_a\left(\frac{x}{y}\right)$. Po wymnożeniu lub skróceniu w środku zawsze pojawia się "magiczna liczba", która natychmiast ładnie się logarytmuje!',
        matura_context='Zadanie łączące sumę lub różnicę logarytmów pojawia się w każdym arkuszu maturalnym CKE na pozycji 2–4 za 1 punkt.',
        core_formulas=[
            {
                'title': 'Suma logarytmów (mnożenie wnętrz)',
                'latex': r'\log_a x + \log_a y = \log_a(x \cdot y)',
                'description': 'Dodawanie logarytmów o tej samej podstawie to logarytm iloczynu.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': r'\log_2 6 + \log_2 \left(\frac{4}{3}\right) = \log_2\left(6 \cdot \frac{4}{3}\right) = \log_2 8 = 3',
                'mnemonic': 'Plus na zewnątrz to mnożenie w środku.',
                'matura_tip': 'Podstawa a musi być identyczna w obu składnikach!'
            },
            {
                'title': 'Różnica logarytmów (dzielenie wnętrz)',
                'latex': r'\log_a x - \log_a y = \log_a\left(\frac{x}{y}\right)',
                'description': 'Odejmowanie logarytmów to logarytm ilorazu.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': r'\log_5 100 - \log_5 4 = \log_5\left(\frac{100}{4}\right) = \log_5 25 = 2',
                'mnemonic': 'Minus na zewnątrz to kreska ułamkowa w środku.',
                'matura_tip': 'Dzielisz pierwszy składnik przez drugi.'
            }
        ],
        worked_example={
            'problem': r'Oblicz wartość wyrażenia $\log_3 18 - \log_3 2$.',
            'steps': [
                {'num': 1, 'label': 'Weryfikacja wspólnej podstawy', 'text': r'Oba logarytmy mają tę samą podstawę $a = 3$, a między nimi stoi znak minus.'},
                {'num': 2, 'label': 'Złożenie w iloraz', 'text': r'$\log_3 18 - \log_3 2 = \log_3\left(\frac{18}{2}\right) = \log_3 9$.'},
                {'num': 3, 'label': 'Obliczenie wartości logarytmu', 'text': r'$\log_3 9 = 2$, ponieważ $3^2 = 9$.'}
            ],
            'result': '2'
        },
        exam_trap=r'Typowy błąd: Odejmowanie liczb wewnątrz logarytmu: $\log_3 18 - \log_3 2 = \log_3(18 - 2) = \log_3 16$.' + '\n\n' + r'Poprawnie: Znak minus oznacza DZIELENIE wnętrz: $\log_3(18 : 2) = \log_3 9 = 2$.',
        visuals=v2,
        tasks=l2_tasks
    )
    lessons.append(l2)

    # ----------------------------------------------------
    # Lekcja 2.3: Potęga w logarytmie (L1.2.3)
    # ----------------------------------------------------
    v3 = get_topic_02_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-2-3-1',
            source='Rozgrzewka • Zrzucanie potęgi',
            question=r'Wartość wyrażenia $2\log_3 6 - \log_3 4$ jest równa',
            options_data=[
                ('A', '$2$'),
                ('B', r'$\log_3 8$'),
                ('C', '$1$'),
                ('D', r'$\log_3 32$')
            ],
            correct_id='A',
            explanation=r'Najpierw wciągamy współczynnik $2$ do potęgi liczby logarytmowanej: $2\log_3 6 = \log_3(6^2) = \log_3 36$.' + '\n' + r'Teraz stosujemy wzór na różnicę: $\log_3 36 - \log_3 4 = \log_3\left(\frac{36}{4}\right) = \log_3 9 = 2$.',
            cke_trap=r'Nie wolno dzielić $6 : 4$, dopóki przed pierwszym logarytmem stoi współczynnik 2!'
        ),
        make_sc_task(
            task_id='task-2-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Dokończ zdanie. Liczba $2\log_5 10 - \log_5 4$ jest równa',
            options_data=[
                ('A', '$2$'),
                ('B', r'$\log_5 16$'),
                ('C', r'$\log_5 96$'),
                ('D', '$5$')
            ],
            correct_id='A',
            explanation=r'KROK 1: Wciągamy dwójkę: $2\log_5 10 = \log_5(10^2) = \log_5 100$.' + '\n' + r'KROK 2: Odejmujemy logarytmy: $\log_5 100 - \log_5 4 = \log_5\left(\frac{100}{4}\right) = \log_5 25 = 2$, bo $5^2 = 25$.',
            cke_trap='Zawsze likwiduj współczynnik stojący przed logarytmem ZANIM połączysz składniki w jeden logarytm!'
        ),
        make_sc_task(
            task_id='task-2-3-3',
            source='Pułapka CKE • Ułamek przed logarytmem',
            question=r'Wartość wyrażenia $\frac{1}{2}\log_2 36 - \log_2 3$ jest równa',
            options_data=[
                ('A', '$1$'),
                ('B', '$2$'),
                ('C', r'$\log_2 15$'),
                ('D', '$0$')
            ],
            correct_id='A',
            explanation=r'Współczynnik $\frac{1}{2}$ wciągamy jako pierwiastek kwadratowy: $\frac{1}{2}\log_2 36 = \log_2(36^{\frac{1}{2}}) = \log_2(\sqrt{36}) = \log_2 6$.' + '\n' + r'Różnica: $\log_2 6 - \log_2 3 = \log_2\left(\frac{6}{3}\right) = \log_2 2 = 1$.',
            cke_trap=r'Współczynnik $\frac{1}{2}$ oznacza pierwiastek kwadratowy $\sqrt{36} = 6$, a nie dzielenie $36 : 2 = 18$!'
        ),
        make_numeric_task(
            task_id='task-2-3-4',
            source='Zadanie utrwalające • Mnożnik i suma',
            question=r'Oblicz wartość wyrażenia $3\log_4 2 + \log_4 8$. Wpisz wynik jako liczbę całkowitą.',
            correct_val='3',
            explanation=r'Wciągamy trójkę: $3\log_4 2 = \log_4(2^3) = \log_4 8$.' + '\n' + r'Dodajemy logarytmy: $\log_4 8 + \log_4 8 = \log_4(8 \cdot 8) = \log_4 64 = 3$, bo $4^3 = 64$.',
            cke_trap=r'Pamiętaj: $2^3 = 8$, a $8 \cdot 8 = 64 = 4^3$.'
        ),
        make_sc_task(
            task_id='task-2-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Liczba $2\log_6 3 + \log_6 4$ jest równa',
            options_data=[
                ('A', '$2$'),
                ('B', r'$\log_6 10$'),
                ('C', '$6$'),
                ('D', r'$\log_6 24$')
            ],
            correct_id='A',
            explanation=r'KROK 1: Wciągamy dwójkę do potęgi liczby logarytmowanej: $2\log_6 3 = \log_6(3^2) = \log_6 9$.' + '\n' + r'KROK 2: Dodajemy logarytmy, zamieniając sumę na iloczyn: $\log_6 9 + \log_6 4 = \log_6(9 \cdot 4) = \log_6 36$.' + '\n' + r'KROK 3: Obliczamy wartość: $\log_6 36 = 2$, ponieważ $6^2 = 36$.',
            cke_trap=r'Częsty błąd to mnożenie $2 \cdot 3 = 6$ zamiast potęgowania $3^2 = 9$. Mnożnik przed logarytmem wędruje do wykładnika potęgi!'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-2-3',
        topic_id=topic_id,
        title='Potęga w liczbie logarytmowanej i wyrażenia z CKE',
        concept_essence=r'Wzór na "windę potęgi" $k \cdot \log_a x = \log_a(x^k)$ działa w dwie strony: 1) Wykładnik potęgi ze środka logarytmu możesz "zrzucić windą" na sam początek jako zwykły mnożnik. 2) Mnożnik stojący przed logarytmem możesz "wciągnąć windą" na górę jako potęgę liczby x. Na maturze reguła ta jest niezbędna przy sumie i różnicy: NIGDY nie łącz logarytmów w iloczyn lub iloraz, dopóki przed którymś z nich stoi jakakolwiek liczba (np. 2, 3 czy $\frac{1}{2}$)! Najpierw wciągasz liczbę do potęgi, dopiero potem łączysz.',
        matura_context=r'Wyrażenie typu $2\log_a x - \log_a y$ to ulubiony schemat CKE za 1 punkt (pojawia się naprzemiennie z czystą różnicą logarytmów).',
        core_formulas=[
            {
                'title': 'Logarytm potęgi ("Winda wykładnika")',
                'latex': r'k \cdot \log_a x = \log_a(x^k)',
                'description': 'Mnożnik przed logarytmem wchodzi jako wykładnik potęgi liczby x.',
                'in_cke_sheet': True,
                'cke_page': 'str. 5',
                'example': r'2\log_3 5 = \log_3(5^2) = \log_3 25',
                'mnemonic': 'Liczba z przodu wskakuje na barana (staje się potęgą).',
                'matura_tip': 'Zawsze zlikwiduj mnożnik przed zastosowaniem wzoru na sumę/różnicę!'
            }
        ],
        worked_example={
            'problem': r'Oblicz wartość wyrażenia $2\log_5 10 - \log_5 4$.',
            'steps': [
                {'num': 1, 'label': 'Wciągnięcie współczynnika do potęgi', 'text': r'Współczynnik 2 przed pierwszym logarytmem wciągamy do potęgi liczby 10: $2\log_5 10 = \log_5(10^2) = \log_5 100$.'},
                {'num': 2, 'label': 'Zastosowanie wzoru na różnicę', 'text': r'Teraz oba logarytmy mają współczynnik 1: $\log_5 100 - \log_5 4 = \log_5\left(\frac{100}{4}\right) = \log_5 25$.'},
                {'num': 3, 'label': 'Obliczenie wyniku CKE', 'text': r'$\log_5 25 = 2$, bo $5^2 = 25$.'}
            ],
            'result': '2'
        },
        exam_trap=r'Typowy błąd: Dzielenie z pozostawieniem współczynnika: $2\log 10 - \log 4 = 2\log\left(\frac{10}{4}\right)$.' + '\n\n' + r'Poprawnie: Najpierw wciągnij 2 do potęgi: $\log(10^2) - \log 4 = \log\left(\frac{100}{4}\right) = \log 25$.',
        visuals=v3,
        tasks=l3_tasks
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'order': topic_number,
        'short_title': 'Logarytmy',
        'importance': 'Pewniak CKE (Tier S+)',
        'matura_points_range': '1–2 pkt',
        'lessons': lessons
    }
