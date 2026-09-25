"""
topic_20_builder.py - Dział 20: Statystyka Opisowa (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Autentyczne CKE
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_20 import get_topic_20_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_20():
    topic_id = 'dzial-20'
    topic_title = 'Statystyka Opisowa'
    topic_number = 20
    lessons = []

    # =========================================================================
    # Lekcja 20.1: Średnia arytmetyczna i średnia ważona
    # =========================================================================
    v1 = get_topic_20_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-20-1-1',
            source='Matura maj 2024 • Zad. 28',
            question=r'Średnia arytmetyczna trzech liczb: $a, b, c$, jest równa $9$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Średnia arytmetyczna sześciu liczb: $a, a, b, b, c, c$, jest równa',
            options_data=[
                ('A', '$9$'),
                ('B', '$6$'),
                ('C', '$4{,}5$'),
                ('D', '$18$')
            ],
            correct_id='A',
            explanation=r'Z definicji średniej arytmetycznej trzech liczb:' + '\n' +
                        r'$$\frac{a + b + c}{3} = 9 \longrightarrow a + b + c = 27$$' + '\n' +
                        r'Średnia arytmetyczna sześciu liczb $a, a, b, b, c, c$:' + '\n' +
                        r'$$\frac{a + a + b + b + c + c}{6} = \frac{2a + 2b + 2c}{6} = \frac{2(a + b + c)}{6} = \frac{a + b + c}{3} = 9$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Podwojenie liczności każdej wartości nie zmienia średniej arytmetycznej! Zmiana nastąpiłaby tylko wtedy, gdyby dodano liczby o innej średniej.'
        ),
        make_sc_task(
            task_id='task-20-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Średnia arytmetyczna czterech liczb: $4, 8, x, 12$ wynosi $9$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Liczba $x$ jest równa',
            options_data=[
                ('A', '$12$'),
                ('B', '$10$'),
                ('C', '$8$'),
                ('D', '$14$'),
            ],
            correct_id='A',
            explanation=r'Z definicji średniej arytmetycznej:' + '\n' +
                        r'$$\frac{4 + 8 + x + 12}{4} = 9$$' + '\n' +
                        r'Mnożymy obustronnie przez 4:' + '\n' +
                        r'$$24 + x = 36 \longrightarrow x = 36 - 24 = 12$$',
            cke_trap=r'Przeliczaj na sumę łączną: 4 liczby o średniej 9 muszą sumować się do $4 \cdot 9 = 36$.'
        ),
        make_sc_task(
            task_id='task-20-1-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Uczeń otrzymał z matematyki oceny: 5 z wagą 3, 3 z wagą 2 oraz 4 z wagą 1.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Średnia ważona ocen tego ucznia wynosi',
            options_data=[
                ('A', '$4{,}17$'),
                ('B', '$4{,}00$'),
                ('C', '$4{,}50$'),
                ('D', '$3{,}83$'),
            ],
            correct_id='A',
            explanation=r'Wzór na średnią ważoną:' + '\n' +
                        r'$$\bar{s} = \frac{w_1 a_1 + w_2 a_2 + \dots + w_n a_n}{w_1 + w_2 + \dots + w_n} = \frac{3 \cdot 5 + 2 \cdot 3 + 1 \cdot 4}{3 + 2 + 1} = \frac{15 + 6 + 4}{6} = \frac{25}{6} \approx 4{,}17$$',
            cke_trap=r'W mianowniku średniej ważonej ZAWSZE stoi suma wag ($3 + 2 + 1 = 6$), a NIE liczba ocen (3)!'
        ),
        make_numeric_task(
            task_id='task-20-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Średnia arytmetyczna pięciu liczb wynosi $12$. Do tych liczb dopisano liczbę $18$. Oblicz średnią arytmetyczną otrzymanych sześciu liczb. Wpisz wynik w pole poniżej.',
            correct_val=13,
            explanation=r'Krok 1: Suma początkowa pięciu liczb wynosi $5 \cdot 12 = 60$.' + '\n' +
                        r'Krok 2: Nowa suma wynosi $60 + 18 = 78$.' + '\n' +
                        r'Krok 3: Nowa średnia arytmetyczna: $\bar{x} = \frac{78}{6} = 13$.',
            cke_trap=r'Pamiętaj, że liczba danych wzrosła z 5 do 6, więc dzielimy sumę 78 przez 6, co daje 13.'
        ),
        make_open_task(
            task_id='task-20-1-5',
            source='Matura maj 2023 • Zad. 28',
            question=r'Średnia arytmetyczna zestawu czterech liczb: $6, 10, 14, x$ jest równa $x$.' + '\n' +
                     r'Oblicz liczbę $x$. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – ułożenie równania z definicji średniej arytmetycznej: \frac{30 + x}{4} = x.' + '\n' +
                        r'2 pkt – poprawne rozwiązanie równania i podanie wartości x = 10.',
            explanation=r'Krok 1: Z definicji średniej arytmetycznej czterech liczb:' + '\n' +
                        r'$$\frac{6 + 10 + 14 + x}{4} = x$$' + '\n' +
                        r'Krok 2: Upraszczamy licznik: $6 + 10 + 14 = 30$, stąd:' + '\n' +
                        r'$$\frac{30 + x}{4} = x$$' + '\n' +
                        r'Krok 3: Mnożymy obustronnie przez 4:' + '\n' +
                        r'$$30 + x = 4x \longrightarrow 3x = 30 \longrightarrow x = 10$$',
            cke_trap=r'Pamiętaj, że w mianowniku dzielimy przez liczbę wszystkich elementów (4), wliczając niewiadomą $x$.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-20-1',
        topic_id=topic_id,
        title='Średnia arytmetyczna i średnia ważona',
        concept_essence=(
            "Średnia arytmetyczna to suma wszystkich liczb podzielona przez ich liczbę: $\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}$.\n\n"
            "Kluczowa tożsamość sumy łącznej: $\\text{Suma} = n \\cdot \\bar{x}$.\n\n"
            "Średnia ważona uwzględnia wagę (istotność) poszczególnych danych: w mianowniku dzielimy przez sumę wag: $w_1 + w_2 + \\dots + w_n$."
        ),
        matura_context='Pewniak za 1 pkt. Egzaminatorzy sprawdzają umiejętność przeliczania średniej na sumę łączną lub wyznaczania brakującej danej x.',
        core_formulas=[
            {
                'title': 'Średnia arytmetyczna',
                'latex': r'\bar{x} = \frac{x_1 + x_2 + \dots + x_n}{n}',
                'description': 'Karta wzorów CKE str. 29.',
                'in_cke_sheet': True,
                'cke_page': 'str. 29'
            },
            {
                'title': 'Średnia ważona',
                'latex': r'\bar{s} = \frac{w_1 a_1 + w_2 a_2 + \dots + w_n a_n}{w_1 + w_2 + \dots + w_n}',
                'description': 'Karta wzorów CKE str. 29. Dzielimy przez sumę wag.',
                'in_cke_sheet': True,
                'cke_page': 'str. 29'
            }
        ],
        worked_example={
            'problem': r'Średnia arytmetyczna liczb $2, 5, 7, x$ wynosi $6$. Wyznacz liczbę $x$.',
            'steps': [
                r'Krok 1: Wzór na średnią: $\frac{2 + 5 + 7 + x}{4} = 6$.',
                r'Krok 2: Mnożymy przez 4: $14 + x = 24 \longrightarrow x = 10$.'
            ],
            'result': r'x = 10'
        },
        exam_trap=r'Dzielenie przez starą liczbę danych po dodaniu nowego elementu lub dzielenie przez liczbę ocen zamiast sumy wag w średniej ważonej.',
        visuals=v1,
        tasks=l1_tasks,
        key_takeaway=r'Suma łączna to iloczyn liczności i średniej: $\text{Suma} = n \cdot \bar{x}$. W średniej ważonej dzielimy zawsze przez sumę wag: $w_1 + w_2 + \dots + w_n$.'
    )
    lessons.append(l1)

    # =========================================================================
    # Lekcja 20.2: Mediana, dominanta i rozstęp
    # =========================================================================
    v2 = get_topic_20_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-20-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Dany jest zestaw sześciu liczb: $8, 3, 5, 7, 2, 9$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Mediana tego zestawu liczb jest równa',
            options_data=[
                ('A', '$6$'),
                ('B', '$5{,}5$'),
                ('C', '$5$'),
                ('D', '$7$')
            ],
            correct_id='A',
            explanation=r'Krok bezwzględny: porządkujemy liczby niemalejąco:' + '\n' +
                        r'$$2, 3, 5, 7, 8, 9$$' + '\n' +
                        r'Liczba danych wynosi $n = 6$ (parzysta).' + '\n' +
                        r'Mediana to średnia arytmetyczna dwóch środkowych wyrazów (3. i 4. element):' + '\n' +
                        r'$$M_e = \frac{5 + 7}{2} = \frac{12}{2} = 6$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Najczęstszy błąd: wyznaczanie środka z NIEUPORZĄDKOWANEJ listy liczb! Gdyby wziąć środkowe liczby z treści ($5$ i $7$), wynik przypadkowo by się zgadzał, ale przy innej kolejności byłby błędny.'
        ),
        make_sc_task(
            task_id='task-20-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Dany jest uporządkowany rosnąco zestaw liczb: $1, 3, 4, x, 7, 9, 10$. Mediana tego zestawu wynosi $6$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Liczba $x$ jest równa',
            options_data=[
                ('A', '$6$'),
                ('B', '$5$'),
                ('C', '$7$'),
                ('D', '$4$'),
            ],
            correct_id='A',
            explanation=r'Zestaw liczy $n = 7$ liczb (liczba nieparzysta).' + '\n' +
                        r'Mediana w nieparzystym uporządkowanym zestawie to dokładnie środkowy (czwarty) element.' + '\n' +
                        r'Czwartym elementem jest $x$, więc $M_e = x = 6$.',
            cke_trap=r'Dla nieparzystej liczby danych nie liczymy żadnej średniej – bierzemy bezpośrednio element leżący w samym środku.'
        ),
        make_sc_task(
            task_id='task-20-2-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W zestawie danych: $2, 4, 4, 5, 7, 8, 9, 11$ dominanta to $D$, a rozstęp to $R$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Wartości $D$ i $R$ są równe',
            options_data=[
                ('A', '$D = 4$ oraz $R = 9$'),
                ('B', '$D = 4$ oraz $R = 11$'),
                ('C', '$D = 5$ oraz $R = 9$'),
                ('D', '$D = 4$ oraz $R = 7$'),
            ],
            correct_id='A',
            explanation=r'Dominanta to wartość występująca najczęściej: liczba $4$ pojawia się dwukrotnie, stąd $D = 4$.' + '\n' +
                        r'Rozstęp to różnica między wartością największą i najmniejszą:' + '\n' +
                        r'$$R = x_{\max} - x_{\min} = 11 - 2 = 9$$',
            cke_trap=r'Rozstęp to różnica $11 - 2 = 9$, a nie sama największa wartość 11.'
        ),
        make_numeric_task(
            task_id='task-20-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Oblicz medianę zestawu liczb: $12, 4, 7, 9, 15, 2, 8$. Wpisz wynik w pole poniżej.',
            correct_val=8,
            explanation=r'Porządkujemy 7 liczb niemalejąco:' + '\n' +
                        r'$$2, 4, 7, 8, 9, 12, 15$$' + '\n' +
                        r'Liczba elementów $n = 7$ (nieparzysta). Środkowym (czwartym) elementem jest $8$. Mediana wynosi $8$.',
            cke_trap=r'Pamiętaj o wcześniejszym uporządkowaniu liczb: 2, 4, 7, 8, 9, 12, 15.'
        ),
        make_open_task(
            task_id='task-20-2-5',
            source='Matura czerwiec 2024 • Zad. 29',
            question=r'Dany jest zestaw pięciu liczb: $3, 8, 2, 11, x$. Średnia arytmetyczna tego zestawu jest równa $6$.' + '\n' +
                     r'Wyznacz liczbę $x$, a następnie uporządkuj wszystkie liczby i oblicz medianę tego zestawu. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – obliczenie wartości x = 6 z równania średniej arytmetycznej: \frac{3 + 8 + 2 + 11 + x}{5} = 6.' + '\n' +
                        r'2 pkt – uporządkowanie liczb (2, 3, 6, 8, 11) i poprawne wyznaczenie mediany M_e = 6.',
            explanation=r'Krok 1: Wyznaczamy liczbę $x$ ze wzoru na średnią arytmetyczną:' + '\n' +
                        r'$$\frac{3 + 8 + 2 + 11 + x}{5} = 6 \longrightarrow \frac{24 + x}{5} = 6 \longrightarrow 24 + x = 30 \longrightarrow x = 6$$' + '\n' +
                        r'Krok 2: Zapisujemy pełny zestaw liczb i porządkujemy go niemalejąco:' + '\n' +
                        r'$$2, 3, 6, 8, 11$$' + '\n' +
                        r'Krok 3: Ponieważ liczba elementów $n = 5$ jest nieparzysta, mediana to środkowy (trzeci) element:' + '\n' +
                        r'$$M_e = 6$$',
            cke_trap=r'Przed wyznaczeniem mediany bezwzględnie uporządkuj liczby po wyliczeniu $x$: $2, 3, 6, 8, 11$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-20-2',
        topic_id=topic_id,
        title='Mediana, dominanta i rozstęp',
        concept_essence=(
            "Mediana to wartość środkowa w uporządkowanym niemalejąco zestawie danych.\n\n"
            "Dla nieparzystego $n$: mediana to dokładnie środkowa liczba.\n\n"
            "Dla parzystego $n$: mediana to średnia arytmetyczna dwóch środkowych liczb.\n\n"
            "Dominanta to wartość najczęstsza, a rozstęp to różnica $x_{\\max} - x_{\\min}$."
        ),
        matura_context='Pewniak za 1 pkt. Najważniejszy test czujności maturzysty: ZAWSZE zacznij od posortowania liczb!',
        core_formulas=[
            {
                'title': 'Mediana (wartość środkowa)',
                'latex': r'M_e = \frac{x_k + x_{k+1}}{2} \text{ dla parzystych } n = 2k',
                'description': 'Karta wzorów CKE str. 30. Wymagane wcześniejsze posortowanie danych.',
                'in_cke_sheet': True,
                'cke_page': 'str. 30'
            }
        ],
        worked_example={
            'problem': r'Wyznacz medianę liczb: $9, 3, 1, 7, 5$.',
            'steps': [
                r'Krok 1: Porządkujemy rosnąco: $1, 3, 5, 7, 9$.',
                r'Krok 2: Liczba danych $n = 5$ (nieparzysta). Środek to 3. liczba: $5$.'
            ],
            'result': r'M_e = 5'
        },
        exam_trap=r'Wskazanie środkowej liczby bez wcześniejszego uporządkowania całego zestawu danych.',
        visuals=v2,
        tasks=l2_tasks,
        key_takeaway=r'ŻELAZNA ZASADA MEDIANY: zanim wskażesz środek, bezwzględnie uporządkuj liczby niemalejąco! Dla parzystego $n$ mediana to średnia dwóch środkowych liczb.'
    )
    lessons.append(l2)

    # =========================================================================
    # Lekcja 20.3: Odchylenie standardowe i wariancja
    # =========================================================================
    v3 = get_topic_20_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-20-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Dany jest zestaw czterech liczb: $1, 3, 5, 7$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Wariancja $\sigma^2$ tego zestawu liczb jest równa',
            options_data=[
                ('A', '$5$'),
                ('B', r'$\sqrt{5}$'),
                ('C', '$4$'),
                ('D', '$20$')
            ],
            correct_id='A',
            explanation=r'Krok 1: Obliczamy średnią arytmetyczną:' + '\n' +
                        r'$$\bar{x} = \frac{1 + 3 + 5 + 7}{4} = \frac{16}{4} = 4$$' + '\n' +
                        r'Krok 2: Obliczamy wariancję ze wzoru:' + '\n' +
                        r'$$\sigma^2 = \frac{(1 - 4)^2 + (3 - 4)^2 + (5 - 4)^2 + (7 - 4)^2}{4}$$' + '\n' +
                        r'$$\sigma^2 = \frac{(-3)^2 + (-1)^2 + 1^2 + 3^2}{4} = \frac{9 + 1 + 1 + 9}{4} = \frac{20}{4} = 5$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Zadanie pyta o WARIANCJĘ $\sigma^2 = 5$. Odpowiedź $\sqrt{5}$ to odchylenie standardowe $\sigma$. Uważaj na pytanie!'
        ),
        make_sc_task(
            task_id='task-20-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wariancja zestawu danych wynosi $\sigma^2 = 16$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Odchylenie standardowe $\sigma$ tych danych jest równe',
            options_data=[
                ('A', '$4$'),
                ('B', '$16$'),
                ('C', '$256$'),
                ('D', '$8$'),
            ],
            correct_id='A',
            explanation=r'Odchylenie standardowe to pierwiastek kwadratowy z wariancji:' + '\n' +
                        r'$$\sigma = \sqrt{\sigma^2} = \sqrt{16} = 4$$',
            cke_trap=r'Odchylenie to pierwiastek z wariancji: $\sigma = \sqrt{16} = 4$. Nie podnoś do kwadratu!'
        ),
        make_sc_task(
            task_id='task-20-3-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W dwóch klasach III A i III B średnia ocen ze sprawdzianu wyniosła $3{,}8$. Odchylenie standardowe w klasie III A wyniosło $\sigma_A = 0{,}6$, a w klasie III B $\sigma_B = 1{,}4$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.',
            options_data=[
                ('A', 'W klasie III A oceny uczniów są bardziej skupione wokół średniej niż w klasie III B.'),
                ('B', 'W klasie III B oceny uczniów są bardziej skupione wokół średniej niż w klasie III A.'),
                ('C', 'Wszyscy uczniowie klasy III A otrzymali wyższe oceny niż uczniowie klasy III B.'),
                ('D', 'Średnia ocen w obu klasach jest inna.')
            ],
            correct_id='A',
            explanation=r'Odchylenie standardowe mierzy stopień rozproszenia wyników wokół średniej.' + '\n' +
                        r'Mniejsze odchylenie ($\sigma_A = 0{,}6 < 1{,}4$) oznacza, że wyniki są bardziej zwarte i zbliżone do średniej arytmetycznej.',
            cke_trap=r'Mniejsze odchylenie standardowe oznacza MNIEJSZY rozrzut wyników (większe skupienie wokół średniej).'
        ),
        make_numeric_task(
            task_id='task-20-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Dany jest zestaw czterech liczb: $2, 4, 6, 8$. Oblicz wariancję $\sigma^2$ tego zestawu liczb. Wpisz wynik w pole poniżej.',
            correct_val=5,
            explanation=r'Krok 1: Średnia arytmetyczna wynosi:' + '\n' +
                        r'$$\bar{x} = \frac{2 + 4 + 6 + 8}{4} = \frac{20}{4} = 5$$' + '\n' +
                        r'Krok 2: Wariancja to średnia kwadratów odchyleń od średniej:' + '\n' +
                        r'$$\sigma^2 = \frac{(2 - 5)^2 + (4 - 5)^2 + (6 - 5)^2 + (8 - 5)^2}{4} = \frac{9 + 1 + 1 + 9}{4} = \frac{20}{4} = 5$$',
            cke_trap=r'Pamiętaj: pytanie dotyczy WARIANCJI $\sigma^2 = 5$, a nie odchylenia standardowego ($\sqrt{5}$).'
        ),
        make_open_task(
            task_id='task-20-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Oblicz odchylenie standardowe zestawu liczb: $2, 2, 8, 8$. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – obliczenie średniej \bar{x} = 5 i wariancji \sigma^2 = \frac{9 + 9 + 9 + 9}{4} = 9.' + '\n' +
                        r'2 pkt – wyciągnięcie pierwiastka i podanie odchylenia standardowego \sigma = 3.',
            explanation=r'Krok 1: Średnia arytmetyczna: $\bar{x} = \frac{2 + 2 + 8 + 8}{4} = \frac{20}{4} = 5$.' + '\n' +
                        r'Krok 2: Wariancja:' + '\n' +
                        r'$$\sigma^2 = \frac{2 \cdot (2 - 5)^2 + 2 \cdot (8 - 5)^2}{4} = \frac{2 \cdot 9 + 2 \cdot 9}{4} = \frac{36}{4} = 9$$' + '\n' +
                        r'Krok 3: Odchylenie standardowe: $\sigma = \sqrt{\sigma^2} = \sqrt{9} = 3$.',
            cke_trap=r'Nie pomyl wariancji ($\sigma^2 = 9$) z odchyleniem standardowym ($\sigma = 3$).'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-20-3',
        topic_id=topic_id,
        title='Odchylenie standardowe i wariancja',
        concept_essence=(
            "Wariancja $\\sigma^2$ to średnia arytmetyczna kwadratów odchyleń danych od ich średniej.\n\n"
            "Odchylenie standardowe $\\sigma = \\sqrt{\\sigma^2}$ to pierwiastek kwadratowy z wariancji.\n\n"
            "Mniejsza wartość odchylenia oznacza, że dane są bardziej skupione wokół średniej."
        ),
        matura_context='Pojawia się w zadaniach za 1–2 pkt. Kluczem jest staranne obliczenie średniej i zsumowanie kwadratów odchyleń.',
        core_formulas=[
            {
                'title': 'Wariancja i odchylenie standardowe',
                'latex': r'\sigma^2 = \frac{(a_1 - \bar{a})^2 + (a_2 - \bar{a})^2 + \dots + (a_n - \bar{a})^2}{n}, \quad \sigma = \sqrt{\sigma^2}',
                'description': 'Karta wzorów CKE str. 30.',
                'in_cke_sheet': True,
                'cke_page': 'str. 30'
            }
        ],
        worked_example={
            'problem': r'Oblicz odchylenie standardowe liczb $1, 5$.',
            'steps': [
                r'Krok 1: Średnia: $\bar{x} = \frac{1 + 5}{2} = 3$.',
                r'Krok 2: Wariancja: $\sigma^2 = \frac{(1 - 3)^2 + (5 - 3)^2}{2} = \frac{4 + 4}{2} = 4$.',
                r'Krok 3: Odchylenie standardowe: $\sigma = \sqrt{4} = 2$.'
            ],
            'result': r'\sigma = 2'
        },
        exam_trap=r'Podanie wariancji zamiast odchylenia standardowego (zapomnienie o wyciągnięciu pierwiastka).',
        visuals=v3,
        tasks=l3_tasks,
        key_takeaway=r'Wariancja $\sigma^2$ to średnia kwadratów odchyleń od średniej. Odchylenie standardowe $\sigma$ to pierwiastek kwadratowy z wariancji: $\sigma = \sqrt{\sigma^2}$.'
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'description': 'Średnia arytmetyczna i ważona, mediana, dominanta, rozstęp oraz wariancja i odchylenie standardowe.',
        'lessons': lessons
    }
