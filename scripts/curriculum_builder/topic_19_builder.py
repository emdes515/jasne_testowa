"""
topic_19_builder.py - Dział 19: Kombinatoryka i Rachunek Prawdopodobieństwa (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Autentyczne CKE
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_19 import get_topic_19_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_19():
    topic_id = 'dzial-19'
    topic_title = 'Kombinatoryka i Rachunek Prawdopodobieństwa'
    topic_number = 19
    lessons = []

    # =========================================================================
    # Lekcja 19.1: Reguła mnożenia i reguła dodawania
    # =========================================================================
    v1 = get_topic_19_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-19-1-1',
            source='Matura maj 2024 • Zad. 27',
            question=r'Rozważamy wszystkie kody czterocyfrowe utworzone tylko z cyfr $1, 3, 6, 8$, przy czym w każdym kodzie każda z tych cyfr występuje dokładnie jeden raz.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Liczba wszystkich takich kodów jest równa',
            options_data=[
                ('A', '$4$'),
                ('B', '$10$'),
                ('C', '$24$'),
                ('D', '$16$')
            ],
            correct_id='C',
            explanation=r'Mamy zbiór $4$ różnych cyfr $\{1, 3, 6, 8\}$ i tworzymy kody czterocyfrowe bez powtórzeń.' + '\n' +
                        r'Na pierwsze miejsce możemy wybrać dowolną z $4$ cyfr.' + '\n' +
                        r'Na drugie miejsce jedną z pozostałych $3$ cyfr.' + '\n' +
                        r'Na trzecie miejsce jedną z $2$ cyfr.' + '\n' +
                        r'Na czwarte miejsce ostatnią $1$ cyfrę.' + '\n' +
                        r'Z reguły mnożenia (permutacja $4$ elementów):' + '\n' +
                        r'$$N = 4 \cdot 3 \cdot 2 \cdot 1 = 24$$' + '\n' +
                        r'Poprawna odpowiedź to C.',
            cke_trap=r'Warunek "każda cyfra występuje dokładnie jeden raz" oznacza brak powtórzeń. Gdyby cyfry mogły się powtarzać, wynik wynosiłby $4^4 = 256$.'
        ),
        make_sc_task(
            task_id='task-19-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Ile jest wszystkich liczb naturalnych trzycyfrowych o różnych cyfrach utworzonych wyłącznie z cyfr ze zbioru $\{1, 2, 3, 4, 5\}$?' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.',
            options_data=[
                ('A', '$60$'),
                ('B', '$125$'),
                ('C', '$15$'),
                ('D', '$20$'),
            ],
            correct_id='A',
            explanation=r'Mamy $5$ cyfr do dyspozycji i wybieramy $3$ różne cyfry:' + '\n' +
                        r'Na miejsce setek: $5$ możliwości.' + '\n' +
                        r'Na miejsce dziesiątek: $4$ możliwości.' + '\n' +
                        r'Na miejsce jedności: $3$ możliwości.' + '\n' +
                        r'$$N = 5 \cdot 4 \cdot 3 = 60$$',
            cke_trap=r'Zwróć uwagę na zwrot "o różnych cyfrach". Oznacza to zmniejszanie liczby opcji: $5 \cdot 4 \cdot 3 = 60$.'
        ),
        make_sc_task(
            task_id='task-19-1-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Ile jest wszystkich liczb naturalnych dwucyfrowych parzystych?' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.',
            options_data=[
                ('A', '$45$'),
                ('B', '$50$'),
                ('C', '$40$'),
                ('D', '$90$'),
            ],
            correct_id='A',
            explanation=r'Liczba dwucyfrowa ma postać $ab$.' + '\n' +
                        r'Cyfra dziesiątek $a \in \{1, 2, 3, 4, 5, 6, 7, 8, 9\}$ (9 możliwości, bez zera).' + '\n' +
                        r'Cyfra jedności $b \in \{0, 2, 4, 6, 8\}$ (5 możliwości, bo liczba jest parzysta).' + '\n' +
                        r'$$N = 9 \cdot 5 = 45$$',
            cke_trap=r'Cyfra dziesiątek nie może być zerem (jest 9 opcji, a nie 10). Cyfr parzystych jedności jest 5: 0, 2, 4, 6, 8.'
        ),
        make_numeric_task(
            task_id='task-19-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W menu restauracji są $3$ rodzaje zup, $4$ dania główne i $2$ desery. Ile różnych zestawów obiadowych (zupa + danie + deser) można skomponować? Wpisz wynik w pole poniżej.',
            correct_val=24,
            explanation=r'Z reguły mnożenia:' + '\n' +
                        r'$$N = 3 \cdot 4 \cdot 2 = 24$$',
            cke_trap=r'Niezależne wybory z różnych kategorii zawsze mnożymy: $3 \cdot 4 \cdot 2 = 24$.'
        ),
        make_open_task(
            task_id='task-19-1-5',
            source='Matura czerwiec 2023 • Zad. 28',
            question=r'Ile jest wszystkich liczb naturalnych czterocyfrowych, w których cyfra setek jest równa $5$, a cyfra jedności jest parzysta?' + '\n' +
                     r'Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – określenie liczby możliwości wyboru poszczególnych cyfr (tysiące: 9, setki: 1, dziesiątki: 10, jedności: 5).' + '\n' +
                        r'2 pkt – zastosowanie reguły mnożenia i obliczenie liczby wszystkich takich liczb: N = 9 \cdot 1 \cdot 10 \cdot 5 = 450.',
            explanation=r'Krok 1: Analizujemy możliwości dla poszczególnych pozycji czterocyfrowej liczby $abcd$:' + '\n' +
                        r'- cyfra tysięcy $a \in \{1, 2, 3, 4, 5, 6, 7, 8, 9\}$: $9$ możliwości (zero nie może stać na początku),' + '\n' +
                        r'- cyfra setek $b = 5$: $1$ możliwość,' + '\n' +
                        r'- cyfra dziesiątek $c \in \{0, 1, 2, \dots, 9\}$: $10$ możliwości,' + '\n' +
                        r'- cyfra jedności $d \in \{0, 2, 4, 6, 8\}$: $5$ możliwości (cyfry parzyste).' + '\n' +
                        r'Krok 2: Z reguły mnożenia obliczamy liczbę wszystkich takich liczb:' + '\n' +
                        r'$$N = 9 \cdot 1 \cdot 10 \cdot 5 = 450$$',
            cke_trap=r'Pamiętaj, że cyfra tysięcy nie może być zerem (jest 9 możliwości, a nie 10), natomiast cyfra dziesiątek może być dowolna (10 możliwości).'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-19-1',
        topic_id=topic_id,
        title='Reguła mnożenia i reguła dodawania',
        concept_essence=(
            "Reguła mnożenia służy do zliczania liczby ciągów zdarzeń: jeśli etap 1 ma $n_1$ możliwości, etap 2 ma $n_2$ możliwości itd., to całkowita liczba sekwencji to $n_1 \\cdot n_2 \\cdot \\dots \\cdot n_k$.\n\n"
            "Reguła dodawania stosowana jest, gdy wybieramy jeden wariant ze zbiorów rozłącznych: $n_1 + n_2$.\n\n"
            "W tworzeniu liczb naturalnych pierwsza cyfra nie może być zerem."
        ),
        matura_context='Pewniak za 1 pkt. Pytania dotyczą tworzenia kodów, liczb o różnych cyfrach lub rzutów monetami/kostkami.',
        core_formulas=[
            {
                'title': 'Reguła mnożenia',
                'latex': r'N = n_1 \cdot n_2 \cdot \dots \cdot n_k',
                'description': 'Karta wzorów CKE str. 26. Całkowita liczba permutacji i wyborów wieloetapowych.',
                'in_cke_sheet': True,
                'cke_page': 'str. 26'
            }
        ],
        worked_example={
            'problem': r'Ile jest liczb czterocyfrowych o różnych cyfrach utworzonych z cyfr $\{1, 2, 3, 4\}$?',
            'steps': [
                r'Krok 1: Na 1. miejsce: 4 możliwości, na 2.: 3 możliwości, na 3.: 2 możliwości, na 4.: 1 możliwość.',
                r'Krok 2: Mnożymy: $N = 4 \cdot 3 \cdot 2 \cdot 1 = 24$.'
            ],
            'result': r'N = 24'
        },
        exam_trap=r'Zezwolenie na zero na początku liczby lub potraktowanie losowania z powtórzeniami jako losowania bez powtórzeń.',
        visuals=v1,
        tasks=l1_tasks,
        key_takeaway=r'Gdy wybory są niezależne, liczby możliwości mnożymy (reguła mnożenia). Jeśli tworzysz liczbę wielocyfrową, pierwsza cyfra NIE MOŻE być zerem!'
    )
    lessons.append(l1)

    # =========================================================================
    # Lekcja 19.2: Klasyczna definicja prawdopodobieństwa
    # =========================================================================
    v2 = get_topic_19_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-19-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Rzucamy dwukrotnie symetryczną sześcienną kostką do gry.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Prawdopodobieństwo zdarzenia, że w pierwszym rzucie wypadnie większa liczba oczek niż w drugim, jest równe',
            options_data=[
                ('A', r'$\frac{15}{36}$'),
                ('B', r'$\frac{18}{36}$'),
                ('C', r'$\frac{6}{36}$'),
                ('D', r'$\frac{21}{36}$')
            ],
            correct_id='A',
            explanation=r'Wszystkich wyników dwukrotnego rzutu kostką jest $|\Omega| = 6 \cdot 6 = 36$.' + '\n' +
                        r'Wyniki z jednakową liczbą oczek na obu kostkach to: $(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)$ (jest ich $6$).' + '\n' +
                        r'Pozostałych wyników o różnych liczbach oczek jest $36 - 6 = 30$.' + '\n' +
                        r'Z symetrii kostki: w dokładnie połowie z nich na pierwszej kostce jest więcej oczek niż na drugiej:' + '\n' +
                        r'$$|A| = \frac{30}{2} = 15$$' + '\n' +
                        r'Stąd $P(A) = \frac{15}{36} = \frac{5}{12}$. Poprawna odpowiedź to A.',
            cke_trap=r'Nie zapomnij odrzucić par o jednakowych oczkach (6 par) przed podzieleniem przez 2. Wynik $\frac{18}{36}$ to błąd polegający na wliczeniu remisów.'
        ),
        make_sc_task(
            task_id='task-19-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Ze zbioru liczb naturalnych dwucyfrowych losujemy jedną liczbę.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Prawdopodobieństwo wylosowania liczby podzielnej przez $10$ jest równe',
            options_data=[
                ('A', r'$\frac{1}{10}$'),
                ('B', r'$\frac{1}{9}$'),
                ('C', r'$\frac{1}{5}$'),
                ('D', r'$\frac{1}{90}$'),
            ],
            correct_id='A',
            explanation=r'Liczb dwucyfrowych jest $99 - 10 + 1 = 90$, zatem $|\Omega| = 90$.' + '\n' +
                        r'Liczby dwucyfrowe podzielne przez $10$ to: $10, 20, 30, 40, 50, 60, 70, 80, 90$. Jest ich $|A| = 9$.' + '\n' +
                        r'$$P(A) = \frac{9}{90} = \frac{1}{10}$$',
            cke_trap=r'Liczb dwucyfrowych jest 90, a NIE 99 ani 100! Zakres to od 10 do 99 włącznie: $99 - 10 + 1 = 90$.'
        ),
        make_sc_task(
            task_id='task-19-2-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W rzucie dwiema symetrycznymi kostkami do gry suma wyrzuconych oczek wynosi co najmniej $11$.' + '\n' +
                     r'Prawdopodobieństwo tego zdarzenia jest równe',
            options_data=[
                ('A', r'$\frac{3}{36}$'),
                ('B', r'$\frac{2}{36}$'),
                ('C', r'$\frac{4}{36}$'),
                ('D', r'$\frac{1}{36}$'),
            ],
            correct_id='A',
            explanation=r'Suma "co najmniej 11" oznacza sumę równą $11$ lub $12$.' + '\n' +
                        r'Pary dające sumę 11: $(5, 6), (6, 5)$ (2 pary).' + '\n' +
                        r'Pary dające sumę 12: $(6, 6)$ (1 para).' + '\n' +
                        r'Łącznie $|A| = 2 + 1 = 3$.' + '\n' +
                        r'$$P(A) = \frac{3}{36} = \frac{1}{12}$$',
            cke_trap=r'Pamiętaj, że $(5, 6)$ oraz $(6, 5)$ to dwa różne zdarzenia elementarne!'
        ),
        make_numeric_task(
            task_id='task-19-2-4',
            source='Matura maj 2023 • Zad. 27',
            question=r'Ze zbioru liczb naturalnych dwucyfrowych losujemy jedną liczbę.' + '\n' +
                     r'Oblicz liczbę wszystkich zdarzeń sprzyjających wylosowaniu liczby podzielnej przez $15$. Wpisz wynik w pole poniżej.',
            correct_val=6,
            explanation=r'Liczby dwucyfrowe to liczby ze zbioru $\{10, 11, 12, \dots, 99\}$.' + '\n' +
                        r'Wypisujemy liczby dwucyfrowe podzielne przez $15$:' + '\n' +
                        r'$$15, 30, 45, 60, 75, 90$$' + '\n' +
                        r'Jest ich dokładnie $6$.',
            cke_trap=r'Pamiętaj, że $15 \cdot 1 = 15$ to najmniejsza, a $15 \cdot 6 = 90$ to największa liczba dwucyfrowa podzielna przez 15. Kolejna to $15 \cdot 7 = 105$ (trzycyfrowa).'
        ),
        make_open_task(
            task_id='task-19-2-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Rzucamy dwukrotnie symetryczną sześcienną kostką do gry. Oblicz prawdopodobieństwo zdarzenia, że iloczyn wyrzuconych oczek jest liczbą nieparzystą. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – określenie |\Omega| = 36 oraz warunku nieparzystości iloczynu (obie kostki nieparzyste).' + '\n' +
                        r'2 pkt – wyznaczenie |A| = 3 \cdot 3 = 9 i obliczenie P(A) = \frac{9}{36} = \frac{1}{4}.',
            explanation=r'Krok 1: Przestrzeń zdarzeń $|\Omega| = 6 \cdot 6 = 36$.' + '\n' +
                        r'Krok 2: Iloczyn dwóch liczb jest nieparzysty tylko wtedy, gdy obie mnożone liczby są nieparzyste.' + '\n' +
                        r'Liczby nieparzyste na kostce to $\{1, 3, 5\}$ (3 możliwości).' + '\n' +
                        r'Zatem sprzyjających par jest $|A| = 3 \cdot 3 = 9$.' + '\n' +
                        r'Krok 3: Obliczamy prawdopodobieństwo:' + '\n' +
                        r'$$P(A) = \frac{|A|}{|\Omega|} = \frac{9}{36} = \frac{1}{4}$$',
            cke_trap=r'Iloczyn jest parzysty, gdy choć jedna liczba jest parzysta. Iloczyn jest nieparzysty TYLKO gdy obie są nieparzyste.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-19-2',
        topic_id=topic_id,
        title='Klasyczna definicja prawdopodobieństwa',
        concept_essence=(
            "Klasyczna definicja prawdopodobieństwa: $P(A) = \\frac{|A|}{|\\Omega|}$, gdzie $|\\Omega|$ to liczba wszystkich jednakowo prawdopodobnych zdarzeń, a $|A|$ to liczba zdarzeń sprzyjających.\n\n"
            "Prawdopodobieństwo zawsze mieści się w przedziale $\\langle 0, 1 \\rangle$.\n\n"
            "Dla dwukrotnego rzutu kostką siatka $6 \\times 6$ daje $|\\Omega| = 36$ par."
        ),
        matura_context='Pewniak za 1–2 pkt. Zadanie pojawia się co roku w wersji zamkniętej lub otwartej (rzut kostką, losowanie liczb).',
        core_formulas=[
            {
                'title': 'Klasyczna definicja prawdopodobieństwa',
                'latex': r'P(A) = \frac{|A|}{|\Omega|}',
                'description': 'Karta wzorów CKE str. 28. Stosunek liczby zdarzeń sprzyjających do liczby wszystkich zdarzeń elementarnych.',
                'in_cke_sheet': True,
                'cke_page': 'str. 28'
            },
            {
                'title': 'Zdarzenie przeciwne',
                'latex': r'P(A) = 1 - P(A\')',
                'description': 'Karta wzorów CKE str. 27. Suma prawdopodobieństw zdarzeń przeciwnych wynosi 1.',
                'in_cke_sheet': True,
                'cke_page': 'str. 27'
            }
        ],
        worked_example={
            'problem': r'Rzucamy dwiema kostkami. Oblicz prawdopodobieństwo wyrzucenia sumy równej $4$.',
            'steps': [
                r'Krok 1: Przestrzeń zdarzeń: $|\Omega| = 36$.',
                r'Krok 2: Wypisujemy pary: $(1, 3), (2, 2), (3, 1)$ $\longrightarrow$ $|A| = 3$.',
                r'Krok 3: Prawdopodobieństwo: $P(A) = \frac{3}{36} = \frac{1}{12}$.'
            ],
            'result': r'P(A) = \frac{1}{12}'
        },
        exam_trap=r'Zapomnienie o parach symetrycznych: $(1, 3)$ i $(3, 1)$ to dwa OSOBNE zdarzenia w rzucie dwiema kostkami.',
        visuals=v2,
        tasks=l2_tasks,
        key_takeaway=r'W rzucie dwiema kostkami zawsze twórz tabelę $6 \times 6$ ($|\Omega| = 36$). Pamiętaj, że pary $(1, 2)$ i $(2, 1)$ to dwa różne zdarzenia.'
    )
    lessons.append(l2)

    # =========================================================================
    # Lekcja 19.3: Drzewo stochastyczne i losowanie bez zwracania
    # =========================================================================
    v3 = get_topic_19_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-19-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W urnie jest $5$ kul białych i $3$ kule czarne. Losujemy kolejno bez zwracania dwie kule.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Prawdopodobieństwo wylosowania dwóch kul białych jest równe',
            options_data=[
                ('A', r'$\frac{5}{14}$'),
                ('B', r'$\frac{25}{64}$'),
                ('C', r'$\frac{5}{16}$'),
                ('D', r'$\frac{10}{56}$')
            ],
            correct_id='A',
            explanation=r'W urnie jest łącznie $5 + 3 = 8$ kul.' + '\n' +
                        r'Prawdopodobieństwo wylosowania kuli białej w pierwszym losowaniu wynosi $\frac{5}{8}$.' + '\n' +
                        r'Ponieważ losowanie odbywa się BEZ ZWRACANIA, w urnie zostają $4$ białe kule i łącznie $7$ kul.' + '\n' +
                        r'Prawdopodobieństwo wylosowania kuli białej w drugim losowaniu wynosi $\frac{4}{7}$.' + '\n' +
                        r'Z reguły mnożenia prawdopodobieństw (drzewo):' + '\n' +
                        r'$$P(B_1 \cap B_2) = \frac{5}{8} \cdot \frac{4}{7} = \frac{20}{56} = \frac{5}{14}$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Losowanie bez zwracania zmniejsza liczbę kul w puli o 1! Pozostawienie mianownika 8 w obu losowaniach ($\frac{5}{8} \cdot \frac{5}{8} = \frac{25}{64}$) to kardynalny błąd.'
        ),
        make_sc_task(
            task_id='task-19-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W pudełku jest $6$ kul zielonych i $4$ czerwone. Losujemy bez zwracania dwie kule.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Prawdopodobieństwo wylosowania kul o różnych kolorach wynosi',
            options_data=[
                ('A', r'$\frac{8}{15}$'),
                ('B', r'$\frac{4}{15}$'),
                ('C', r'$\frac{12}{25}$'),
                ('D', r'$\frac{24}{100}$'),
            ],
            correct_id='A',
            explanation=r'Łącznie kul jest $10$.' + '\n' +
                        r'Różne kolory oznaczają gałąź $(Z, C)$ lub $(C, Z)$.' + '\n' +
                        r'$$P(Z, C) = \frac{6}{10} \cdot \frac{4}{9} = \frac{24}{90}$$' + '\n' +
                        r'$$P(C, Z) = \frac{4}{10} \cdot \frac{6}{9} = \frac{24}{90}$$' + '\n' +
                        r'Dodajemy prawdopodobieństwa obu gałęzi:' + '\n' +
                        r'$$P = \frac{24}{90} + \frac{24}{90} = \frac{48}{90} = \frac{8}{15}$$',
            cke_trap=r'Nie zapomnij o DWÓCH gałęziach: zielona-czerwona ORAZ czerwona-zielona! Obliczenie tylko jednej gałęzi daje połowę wyniku ($\frac{4}{15}$).'
        ),
        make_sc_task(
            task_id='task-19-3-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Rzucamy monetą, a następnie symetryczną sześcienną kostką do gry.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Prawdopodobieństwo wyrzucenia orła i liczby oczek większej niż $4$ wynosi',
            options_data=[
                ('A', r'$\frac{1}{6}$'),
                ('B', r'$\frac{1}{12}$'),
                ('C', r'$\frac{1}{4}$'),
                ('D', r'$\frac{1}{3}$'),
            ],
            correct_id='A',
            explanation=r'Rzut monetą i kostką to zdarzenia niezależne.' + '\n' +
                        r'Prawdopodobieństwo orła: $P(O) = \frac{1}{2}$.' + '\n' +
                        r'Liczby oczek większe niż 4 na kostce to $\{5, 6\}$ (2 liczby): $P(K > 4) = \frac{2}{6} = \frac{1}{3}$.' + '\n' +
                        r'Mnożymy prawdopodobieństwa:' + '\n' +
                        r'$$P = \frac{1}{2} \cdot \frac{1}{3} = \frac{1}{6}$$',
            cke_trap=r'Dla zdarzeń niezależnych mnożymy prawdopodobieństwa pojedynczych etapów.'
        ),
        make_numeric_task(
            task_id='task-19-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W pojemniku jest $6$ kul białych oraz pewna liczba kul czarnych. Prawdopodobieństwo wylosowania kuli czarnej w pojedynczym losowaniu jest równe $\frac{1}{3}$.' + '\n' +
                     r'Oblicz, ile kul czarnych znajduje się w tym pojemniku. Wpisz wynik w pole poniżej.',
            correct_val=3,
            explanation=r'Niech $n$ oznacza liczbę kul czarnych. Łączna liczba kul w pojemniku to $6 + n$.' + '\n' +
                        r'Z klasycznej definicji prawdopodobieństwa:' + '\n' +
                        r'$$P(C) = \frac{n}{6 + n} = \frac{1}{3}$$' + '\n' +
                        r'Mnożymy na krzyż:' + '\n' +
                        r'$$3n = 6 + n \longrightarrow 2n = 6 \longrightarrow n = 3$$',
            cke_trap=r'Pamiętaj, że w mianowniku musi być suma WSZYSTKICH kul w pojemniku ($6 + n$), a nie tylko białe kule.'
        ),
        make_open_task(
            task_id='task-19-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W urnie znajdują się $4$ kule białe i $2$ kule czarne. Losujemy bez zwracania dwie kule. Oblicz prawdopodobieństwo wylosowania co najmniej jednej kuli czarnej. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – zastosowanie zdarzenia przeciwnego A\' (dwie kule białe) lub rozrysowanie drzewa stochastycznego.' + '\n' +
                        r'2 pkt – poprawne obliczenie P(A\') = \frac{4}{6} \cdot \frac{3}{5} = \frac{2}{5} i podanie P(A) = 1 - \frac{2}{5} = \frac{3}{5}.',
            explanation=r'Krok 1: Korzystamy ze zdarzenia przeciwnego $A\'$: "wylosowano zero kul czarnych", czyli wylosowano dwie kule białe.' + '\n' +
                        r'Krok 2: Prawdopodobieństwo dwóch kul białych bez zwracania:' + '\n' +
                        r'$$P(A\') = \frac{4}{6} \cdot \frac{3}{5} = \frac{12}{30} = \frac{2}{5}$$' + '\n' +
                        r'Krok 3: Prawdopodobieństwo zdarzenia $A$:' + '\n' +
                        r'$$P(A) = 1 - P(A\') = 1 - \frac{2}{5} = \frac{3}{5}$$',
            cke_trap=r'Zwrot "co najmniej jedna" najszybciej rozwiązuje się przez zdarzenie przeciwne: $1 - P(\text{żadna})$.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-19-3',
        topic_id=topic_id,
        title='Drzewo stochastyczne i losowanie bez zwracania',
        concept_essence=(
            "Drzewo stochastyczne to graficzna metoda analizy doświadczeń wieloetapowych.\n\n"
            "Reguła mnożenia: prawdopodobieństwo zdarzenia reprezentowanego przez daną ścieżkę to iloczyn prawdopodobieństw wzdłuż gałęzi.\n\n"
            "Reguła dodawania: jeśli zdarzenie składa się z kilku ścieżek, dodajemy ich prawdopodobieństwa.\n\n"
            "W losowaniu bez zwracania po każdym etapie mianownik zmniejsza się o 1."
        ),
        matura_context='Pewniak za 2 pkt w zadaniach otwartych. Zawsze rysuj drzewko z ułamkami na gałęziach i kontroluj zmniejszanie mianownika.',
        core_formulas=[
            {
                'title': 'Prawdopodobieństwo w drzewie',
                'latex': r'P(A) = P(s_1) + P(s_2) + \dots + P(s_k)',
                'description': 'Karta wzorów CKE str. 28.',
                'in_cke_sheet': True,
                'cke_page': 'str. 28'
            }
        ],
        worked_example={
            'problem': r'W urnie jest $3$ kule białe i $2$ czarne. Losujemy bez zwracania $2$ kule. Oblicz prawdopodobieństwo dwóch kul czarnych.',
            'steps': [
                r'Krok 1: W urnie jest $5$ kul. Szansa na czarną w I losowaniu: $\frac{2}{5}$.',
                r'Krok 2: Zostały $4$ kule, w tym $1$ czarna. Szansa w II losowaniu: $\frac{1}{4}$.',
                r'Krok 3: Mnożymy: $P = \frac{2}{5} \cdot \frac{1}{4} = \frac{2}{20} = \frac{1}{10}$.'
            ],
            'result': r'P = \frac{1}{10}'
        },
        exam_trap=r'Niezmniejszenie mianownika w II etapie przy losowaniu "bez zwracania" lub pominięcie drugiej gałęzi przy różnych kolorach.',
        visuals=v3,
        tasks=l3_tasks,
        key_takeaway=r'W losowaniu BEZ ZWRACANIA w każdym kolejnym kroku mianownik (i licznik wylosowanego koloru) zmniejsza się o $1$! Wzdłuż gałęzi drzewa prawdopodobieństwa mnożymy.'
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'description': 'Reguła mnożenia, klasyczna definicja prawdopodobieństwa, tabela rzutu kostkami oraz drzewa stochastyczne w losowaniu bez zwracania.',
        'lessons': lessons
    }
