"""
topic_18_builder.py - Dział 18: Stereometria (Geometria Przestrzenna 2.5D) (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Autentyczne CKE
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_18 import get_topic_18_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_18():
    topic_id = 'dzial-18'
    topic_title = 'Stereometria (Geometria Przestrzenna)'
    topic_number = 18
    lessons = []

    # =========================================================================
    # Lekcja 18.1: Graniastosłupy proste i prawidłowe
    # =========================================================================
    v1 = get_topic_18_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-18-1-1',
            source='Matura czerwiec 2024 • Zad. 26',
            question=r'Przekątna ściany sześcianu ma długość $2\sqrt{2}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Objętość tego sześcianu jest równa',
            options_data=[
                ('A', '$8$'),
                ('B', '$24$'),
                ('C', r'$\frac{16\sqrt{6}}{9}$'),
                ('D', r'$16\sqrt{2}$')
            ],
            correct_id='A',
            explanation=r'Ściana sześcianu jest kwadratem o boku $a$.' + '\n' +
                        r'Długość przekątnej kwadratu to $d = a\sqrt{2}$.' + '\n' +
                        r'$$a\sqrt{2} = 2\sqrt{2} \longrightarrow a = 2$$' + '\n' +
                        r'Objętość sześcianu wynosi:' + '\n' +
                        r'$$V = a^3 = 2^3 = 8$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Przekątna ŚCIANY to $d = a\sqrt{2}$, natomiast przekątna BRYŁY (sześcianu) to $D = a\sqrt{3}$. Nie myl tych dwóch pojęć.'
        ),
        make_sc_task(
            task_id='task-18-1-2',
            source='Matura sierpień 2024 • Zad. 25',
            question=r'Długości trzech wychodzących z jednego wierzchołka krawędzi prostopadłościanu są trzema kolejnymi liczbami naturalnymi parzystymi. Najdłuższa krawędź tego prostopadłościanu ma długość $10$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Pole powierzchni całkowitej tego prostopadłościanu jest równe',
            options_data=[
                ('A', '$376$'),
                ('B', '$466$'),
                ('C', '$480$'),
                ('D', '$720$')
            ],
            correct_id='A',
            explanation=r'Kolejne liczby naturalne parzyste kończące się na $10$ to: $a = 6$, $b = 8$ oraz $c = 10$.' + '\n' +
                        r'Pole powierzchni całkowitej prostopadłościanu wynosi:' + '\n' +
                        r'$$P_c = 2(ab + bc + ac) = 2(6 \cdot 8 + 8 \cdot 10 + 6 \cdot 10)$$' + '\n' +
                        r'$$P_c = 2(48 + 80 + 60) = 2 \cdot 188 = 376$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Uważaj na treść: liczby PARZYSTE ($6, 8, 10$), a nie kolejne naturalne ($8, 9, 10$).',
            diagram=v1['tab0']
        ),
        make_sc_task(
            task_id='task-18-1-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W graniastosłupie prawidłowym czworokątnym krawędź podstawy ma długość $4$, a wysokość graniastosłupa wynosi $6$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Długość przekątnej tego graniastosłupa jest równa',
            options_data=[
                ('A', r'$2\sqrt{17}$'),
                ('B', r'$4\sqrt{2}$'),
                ('C', '$10$'),
                ('D', r'$2\sqrt{13}$'),
            ],
            correct_id='A',
            explanation=r'Podstawą jest kwadrat o boku $a = 4$. Przekątna podstawy to $d_p = a\sqrt{2} = 4\sqrt{2}$.' + '\n' +
                        r'Z twierdzenia Pitagorasa dla trójkąta prostokątnego o bokach $d_p, H, D$:' + '\n' +
                        r'$$D = \sqrt{d_p^2 + H^2} = \sqrt{(4\sqrt{2})^2 + 6^2} = \sqrt{32 + 36} = \sqrt{68} = \sqrt{4 \cdot 17} = 2\sqrt{17}$$',
            cke_trap=r'Przekątna graniastosłupa to $D = \sqrt{a^2 + a^2 + H^2} = \sqrt{2a^2 + H^2}$. Pamiętaj o wyłączeniu czynnika przed pierwiastek.',
            diagram=v1['tab0']
        ),
        make_numeric_task(
            task_id='task-18-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Krawędzie prostopadłościanu mają długości $2, 3$ oraz $6$. Oblicz długość przekątnej tego prostopadłościanu. Wpisz wynik w pole poniżej.',
            correct_val=7,
            explanation=r'Wzór na przekątną prostopadłościanu:' + '\n' +
                        r'$$D = \sqrt{a^2 + b^2 + c^2} = \sqrt{2^2 + 3^2 + 6^2} = \sqrt{4 + 9 + 36} = \sqrt{49} = 7$$',
            cke_trap=r'Elegancki trójwymiarowy wektor pitagorejski: $\sqrt{4 + 9 + 36} = \sqrt{49} = 7$.',
            diagram=v1['tab0']
        ),
        make_open_task(
            task_id='task-18-1-5',
            source='Matura maj 2023 • Zad. 26',
            question=r'W graniastosłupie prawidłowym trójkątnym pole powierzchni bocznej jest równe $72$, a wysokość graniastosłupa wynosi $6$.' + '\n' +
                     r'Oblicz objętość tego graniastosłupa. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – wyznaczenie długości krawędzi podstawy graniastosłupa: a = 4.' + '\n' +
                        r'2 pkt – obliczenie pola podstawy oraz objętości graniastosłupa: V = 24\sqrt{3}.',
            explanation=r'Krok 1: Powierzchnia boczna graniastosłupa trójkątnego to 3 przystające prostokąty o wymiarach $a \times H$:' + '\n' +
                        r'$$P_b = 3 \cdot a \cdot H \longrightarrow 72 = 3 \cdot a \cdot 6 \longrightarrow 18a = 72 \longrightarrow a = 4$$' + '\n' +
                        r'Krok 2: Podstawą jest trójkąt równoboczny o boku $a = 4$. Obliczamy pole podstawy:' + '\n' +
                        r'$$P_p = \frac{a^2\sqrt{3}}{4} = \frac{4^2\sqrt{3}}{4} = 4\sqrt{3}$$' + '\n' +
                        r'Krok 3: Objętość graniastosłupa:' + '\n' +
                        r'$$V = P_p \cdot H = 4\sqrt{3} \cdot 6 = 24\sqrt{3}$$',
            cke_trap=r'Pamiętaj, że w graniastosłupie prawidłowym trójkątnym podstawą jest trójkąt równoboczny ($P_p = \frac{a^2\sqrt{3}}{4}$), a ściany boczne są 3.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-18-1',
        topic_id=topic_id,
        title='Graniastosłupy proste i prawidłowe',
        concept_essence=(
            "Graniastosłup prawidłowy to graniastosłup prosty, którego podstawą jest wielokąt foremny (trójkąt równoboczny, kwadrat, sześciokąt foremny).\n\n"
            "Przekątna prostopadłościanu $D = \\sqrt{a^2 + b^2 + c^2}$ łączy dwa przeciwległe wierzchołki bryły.\n\n"
            "Objętość to pole podstawy razy wysokość: $V = P_p \\cdot H$, a pole całkowite $P_c = 2P_p + P_b$."
        ),
        matura_context='Pewniak za 1–2 pkt. Zadania sprawdzają obliczanie przekątnej, kąta nachylenia przekątnej do podstawy oraz liczbę krawędzi i wierzchołków.',
        core_formulas=[
            {
                'title': 'Przekątna prostopadłościanu',
                'latex': r'D = \sqrt{a^2 + b^2 + c^2}',
                'description': 'Karta wzorów CKE str. 25. a, b, c - długości krawędzi.',
                'in_cke_sheet': True,
                'cke_page': 'str. 25'
            },
            {
                'title': 'Objętość graniastosłupa',
                'latex': r'V = P_p \cdot H',
                'description': 'Karta wzorów CKE str. 25. P_p - pole podstawy, H - wysokość.',
                'in_cke_sheet': True,
                'cke_page': 'str. 25'
            }
        ],
        worked_example={
            'problem': r'W prostopadłościanie o wymiarach podstawy $3$ i $4$ oraz wysokości $12$ oblicz długość przekątnej bryły $D$.',
            'steps': [
                r'Krok 1: Przekątna podstawy: $d_p = \sqrt{3^2 + 4^2} = 5$.',
                r'Krok 2: Przekątna bryły: $D = \sqrt{d_p^2 + H^2} = \sqrt{5^2 + 12^2} = \sqrt{169} = 13$.'
            ],
            'result': r'D = 13'
        },
        exam_trap=r'Mylenie przekątnej ściany ($d = a\sqrt{2}$) z przekątną całego prostopadłościanu ($D = \sqrt{a^2 + b^2 + c^2}$).',
        visuals=v1,
        tasks=l1_tasks,
        key_takeaway=r'Przekątna prostopadłościanu to $D = \sqrt{a^2 + b^2 + c^2}$. Kąt nachylenia przekątnej do podstawy tworzy trójkąt prostokątny z wysokością $H$ i przekątną podstawy $d_p$.'
    )
    lessons.append(l1)

    # =========================================================================
    # Lekcja 18.2: Ostrosłupy prawidłowe
    # =========================================================================
    v2 = get_topic_18_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-18-2-1',
            source='Matura sierpień 2024 • Zad. 24',
            question=r'Liczba wszystkich ścian ostrosłupa prawidłowego jest równa $12$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Liczba wszystkich wierzchołków tego ostrosłupa jest równa',
            options_data=[
                ('A', '$10$'),
                ('B', '$11$'),
                ('C', '$12$'),
                ('D', '$13$')
            ],
            correct_id='C',
            explanation=r'W każdym ostrosłupie $n$-kątnym:' + '\n' +
                        r'Liczba ścian to $S = n + 1$ (jedna podstawa i $n$ ścian bocznych).' + '\n' +
                        r'Liczba wierzchołków to $W = n + 1$ ($n$ wierzchołków podstawy i jeden wierzchołek główny).' + '\n' +
                        r'Zatem w każdym ostrosłupie liczba wszystkich ścian jest równa liczbie wszystkich wierzchołków: $S = W$.' + '\n' +
                        r'Skoro $S = 12$, to $W = 12$. Poprawna odpowiedź to C.',
            cke_trap=r'W ostrosłupie liczba ścian i liczba wierzchołków jest ZAWSZE TAKA SAMA i wynosi $n + 1$. Liczba krawędzi wynosi $2n$.'
        ),
        make_sc_task(
            task_id='task-18-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Podstawą ostrosłupa prawidłowego czworokątnego jest kwadrat o boku $a = 6$. Wysokość ostrosłupa wynosi $H = 4$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Objętość tego ostrosłupa jest równa',
            options_data=[
                ('A', '$48$'),
                ('B', '$144$'),
                ('C', '$72$'),
                ('D', '$36$'),
            ],
            correct_id='A',
            explanation=r'Pole podstawy wynosi $P_p = a^2 = 6^2 = 36$.' + '\n' +
                        r'Wzór na objętość ostrosłupa:' + '\n' +
                        r'$$V = \frac{1}{3}P_p \cdot H = \frac{1}{3} \cdot 36 \cdot 4 = 12 \cdot 4 = 48$$',
            cke_trap=r'Koniecznie pamiętaj o współczynniku $\frac{1}{3}$! Brak $\frac{1}{3}$ daje objętość graniastosłupa (144).',
            diagram=v2['tab0']
        ),
        make_sc_task(
            task_id='task-18-2-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $a = 8$, a wysokość ściany bocznej wynosi $h_b = 5$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Wysokość $H$ tego ostrosłupa jest równa',
            options_data=[
                ('A', '$3$'),
                ('B', '$4$'),
                ('C', r'$\sqrt{41}$'),
                ('D', r'$\sqrt{9}$'),
            ],
            correct_id='A',
            explanation=r'W ostrosłupie prawidłowym czworokątnym wysokość $H$, promień $r = \frac{a}{2}$ oraz wysokość ściany $h_b$ tworzą trójkąt prostokątny:' + '\n' +
                        r'$$r = \frac{8}{2} = 4$$' + '\n' +
                        r'$$H = \sqrt{h_b^2 - r^2} = \sqrt{5^2 - 4^2} = \sqrt{25 - 16} = \sqrt{9} = 3$$',
            cke_trap=r'Promień łączący spodek wysokości ze środkiem krawędzi podstawy to POŁOWA boku kwadratu: $r = \frac{a}{2} = 4$.',
            diagram=v2['tab0']
        ),
        make_numeric_task(
            task_id='task-18-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Podstawą ostrosłupa prawidłowego czworokątnego jest kwadrat o boku $a = 10$. Wysokość ściany bocznej tego ostrosłupa wynosi $h_b = 13$.' + '\n' +
                     r'Oblicz wysokość $H$ tego ostrosłupa. Wpisz wynik w pole poniżej.',
            correct_val=12,
            explanation=r'W ostrosłupie prawidłowym czworokątnym spodek wysokości jest środkiem kwadratu.' + '\n' +
                        r'Odległość od środka podstawy do krawędzi podstawy wynosi $r = \frac{a}{2} = \frac{10}{2} = 5$.' + '\n' +
                        r'Z twierdzenia Pitagorasa dla trójkąta prostokątnego o przyprostokątnych $H, r$ i przeciwprostokątnej $h_b$:' + '\n' +
                        r'$$H = \sqrt{h_b^2 - r^2} = \sqrt{13^2 - 5^2} = \sqrt{169 - 25} = \sqrt{144} = 12$$',
            cke_trap=r'Pamiętaj, że odcinek łączący spodek wysokości ze środkiem krawędzi podstawy to połowa boku kwadratu: $r = \frac{a}{2} = 5$.',
            diagram=v2['tab0']
        ),
        make_open_task(
            task_id='task-18-2-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $10$, a krawędź boczna ma długość $13$. Oblicz wysokość ściany bocznej $h_b$ tego ostrosłupa. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – wyznaczenie trójkąta prostokątnego w ścianie bocznej o bokach 5, h_b, 13.' + '\n' +
                        r'2 pkt – poprawne obliczenie h_b = \sqrt{169 - 25} = 12.',
            explanation=r'Krok 1: W ścianie bocznej wysokość $h_b$ dzieli podstawę na połowy: $\frac{a}{2} = \frac{10}{2} = 5$.' + '\n' +
                        r'Krok 2: Z twierdzenia Pitagorasa w ścianie bocznej:' + '\n' +
                        r'$$h_b^2 + 5^2 = 13^2 \longrightarrow h_b^2 + 25 = 169 \longrightarrow h_b^2 = 144$$' + '\n' +
                        r'Krok 3: Obliczamy $h_b = \sqrt{144} = 12$.',
            cke_trap=r'Zastosuj twierdzenie Pitagorasa w ŚCIANIE BOCZNEJ, a nie w przekroju osiowym. Boki to $5, h_b, 13$.',
            diagram=v2['tab0']
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-18-2',
        topic_id=topic_id,
        title='Ostrosłupy prawidłowe i kluczowe trójkąty prostokątne',
        concept_essence=(
            "Ostrosłup prawidłowy ma w podstawie wielokąt foremny, a jego ściany boczne są przystającymi trójkątami równoramiennymi.\n\n"
            "Kluczowy trójkąt prostokątny nr 1: wysokość bryły $H$, promień wpisany w podstawę $r$ i wysokość ściany $h_b$ ($H^2 + r^2 = h_b^2$).\n\n"
            "Kluczowy trójkąt prostokątny nr 2: wysokość bryły $H$, promień opisany na podstawie $R$ i krawędź boczna $b$ ($H^2 + R^2 = b^2$).\n\n"
            "Objętość: $V = \\frac{1}{3}P_p \\cdot H$."
        ),
        matura_context='Pewniak za 1–2 pkt. Zadania badają powiązania między $H, r, h_b, b$ w ostrosłupie czworokątnym lub trójkątnym.',
        core_formulas=[
            {
                'title': 'Objętość ostrosłupa',
                'latex': r'V = \frac{1}{3}P_p \cdot H',
                'description': 'Karta wzorów CKE str. 25. Objętość ostrosłupa to 1/3 iloczynu pola podstawy i wysokości.',
                'in_cke_sheet': True,
                'cke_page': 'str. 25'
            },
            {
                'title': 'Zależność w ścianie bocznej',
                'latex': r'H^2 + r^2 = h_b^2',
                'description': 'Karta wzorów CKE str. 25. Trójkąt prostokątny łączący wysokość H, promień r i wysokość ściany h_b.',
                'in_cke_sheet': True,
                'cke_page': 'str. 25'
            }
        ],
        worked_example={
            'problem': r'W ostrosłupie prawidłowym czworokątnym $a = 6$, a wysokość $H = 4$. Oblicz wysokość ściany bocznej $h_b$.',
            'steps': [
                r'Krok 1: Promień w kwadracie to $r = \frac{a}{2} = 3$.',
                r'Krok 2: Twierdzenie Pitagorasa: $h_b = \sqrt{H^2 + r^2} = \sqrt{4^2 + 3^2} = \sqrt{25} = 5$.'
            ],
            'result': r'h_b = 5'
        },
        exam_trap=r'Pominięcie 1/3 w objętości lub mylenie wysokości ściany bocznej ($h_b$) z wysokością ostrosłupa ($H$).',
        visuals=v2,
        tasks=l2_tasks,
        key_takeaway=r'W ostrosłupie nie myl wysokości bryły $H$ z wysokością ściany bocznej $h_b$. Objętość to ZAWSZE $V = \frac{1}{3}P_p H$ (pamiętaj o $\frac{1}{3}$!).'
    )
    lessons.append(l2)

    # =========================================================================
    # Lekcja 18.3: Bryły obrotowe: walec, stożek i kula
    # =========================================================================
    v3 = get_topic_18_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-18-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Przekrój osiowy stożka jest trójkątem równobocznym o boku długości $8$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Objętość tego stożka jest równa',
            options_data=[
                ('A', r'$\frac{64\sqrt{3}}{3}\pi$'),
                ('B', r'$64\sqrt{3}\pi$'),
                ('C', r'$\frac{16\sqrt{3}}{3}\pi$'),
                ('D', r'$32\pi$')
            ],
            correct_id='A',
            explanation=r'Przekrój osiowy ma podstawę $2r = 8 \longrightarrow r = 4$ oraz tworzącą $l = 8$.' + '\n' +
                        r'Wysokość stożka $H$ to wysokość trójkąta równobocznego:' + '\n' +
                        r'$$H = \frac{8\sqrt{3}}{2} = 4\sqrt{3}$$' + '\n' +
                        r'Objętość stożka wynosi:' + '\n' +
                        r'$$V = \frac{1}{3}\pi r^2 H = \frac{1}{3}\pi \cdot 4^2 \cdot 4\sqrt{3} = \frac{1}{3}\pi \cdot 16 \cdot 4\sqrt{3} = \frac{64\sqrt{3}}{3}\pi$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Średnica podstawy to bok trójkąta ($2r = 8$), stąd promień to $r = 4$, a nie $8$.',
            diagram=v3['tab0']
        ),
        make_sc_task(
            task_id='task-18-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Walec i stożek mają takie same promienie podstaw $r$ oraz równe wysokości $H$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Stosunek objętości walca do objętości stożka wynosi',
            options_data=[
                ('A', '$3$'),
                ('B', r'$\frac{1}{3}$'),
                ('C', '$1$'),
                ('D', '$9$'),
            ],
            correct_id='A',
            explanation=r'Objętość walca to $V_w = \pi r^2 H$.' + '\n' +
                        r'Objętość stożka to $V_s = \frac{1}{3}\pi r^2 H$.' + '\n' +
                        r'$$\frac{V_w}{V_s} = \frac{\pi r^2 H}{\frac{1}{3}\pi r^2 H} = 3$$',
            cke_trap=r'Walec mieści w sobie dokładnie 3 identyczne stożki o tej samej podstawie i wysokości.'
        ),
        make_sc_task(
            task_id='task-18-3-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Pole powierzchni kuli jest równe $36\pi$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Objętość tej kuli wynosi',
            options_data=[
                ('A', r'$36\pi$'),
                ('B', r'$18\pi$'),
                ('C', r'$108\pi$'),
                ('D', r'$72\pi$'),
            ],
            correct_id='A',
            explanation=r'Wzór na pole kuli: $P = 4\pi R^2 = 36\pi \longrightarrow 4R^2 = 36 \longrightarrow R^2 = 9 \longrightarrow R = 3$.' + '\n' +
                        r'Objętość kuli:' + '\n' +
                        r'$$V = \frac{4}{3}\pi R^3 = \frac{4}{3}\pi \cdot 3^3 = \frac{4}{3}\pi \cdot 27 = 36\pi$$',
            cke_trap=r'Dla promienia R = 3 pole powierzchni i objętość kuli mają taką samą wartość liczbową: $36\pi$.'
        ),
        make_numeric_task(
            task_id='task-18-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Stożek ma promień podstawy $r = 3$ oraz tworzącą $l = 5$. Oblicz objętość tego stożka podzieloną przez $\pi$. Wpisz wynik w pole poniżej.',
            correct_val=12,
            explanation=r'Z twierdzenia Pitagorasa wysokość stożka wynosi: $H = \sqrt{5^2 - 3^2} = 4$.' + '\n' +
                        r'Objętość stożka: $V = \frac{1}{3}\pi r^2 H = \frac{1}{3}\pi \cdot 9 \cdot 4 = 12\pi$.' + '\n' +
                        r'Po podzieleniu przez $\pi$ wynik wynosi 12.',
            cke_trap=r'Nie zapomnij wyznaczyć wysokości H z twierdzenia Pitagorasa ($H = 4$) przed podstawieniem do wzoru na objętość.',
            diagram=v3['tab0']
        ),
        make_open_task(
            task_id='task-18-3-5',
            source='Matura czerwiec 2024 • Zad. 27',
            question=r'Przekrój osiowy walca jest kwadratem o polu równym $36$.' + '\n' +
                     r'Oblicz pole powierzchni całkowitej oraz objętość tego walca. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – wyznaczenie promienia podstawy r = 3 oraz wysokości walca H = 6.' + '\n' +
                        r'2 pkt – obliczenie objętości walca V = 54\pi oraz pola całkowitego P_c = 54\pi.',
            explanation=r'Krok 1: Przekrój osiowy walca jest prostokątem o bokach $2r$ oraz $H$. Skoro przekrój jest kwadratem o polu $36$:' + '\n' +
                        r'$$H = 2r = \sqrt{36} = 6 \longrightarrow r = 3$$' + '\n' +
                        r'Krok 2: Pole powierzchni całkowitej walca:' + '\n' +
                        r'$$P_c = 2\pi r^2 + 2\pi r H = 2\pi \cdot 3^2 + 2\pi \cdot 3 \cdot 6 = 18\pi + 36\pi = 54\pi$$' + '\n' +
                        r'Krok 3: Objętość walca:' + '\n' +
                        r'$$V = \pi r^2 H = \pi \cdot 3^2 \cdot 6 = 54\pi$$',
            cke_trap=r'Pamiętaj, że bok kwadratu będącego przekrojem osiowym walca to ŚREDNICA podstawy ($2r = 6$), zatem promień wynosi $r = 3$.',
            diagram=v3['tab0']
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-18-3',
        topic_id=topic_id,
        title='Bryły obrotowe: walec, stożek i kula',
        concept_essence=(
            "Walec: $V = \\pi r^2 H$, $P_b = 2\\pi r H$, $P_c = 2\\pi r^2 + 2\\pi r H$.\n\n"
            "Stożek: przekrój tworzy trójkąt prostokątny $r^2 + H^2 = l^2$, $V = \\frac{1}{3}\\pi r^2 H$, $P_b = \\pi r l$.\n\n"
            "Kula: $V = \\frac{4}{3}\\pi R^3$, $P = 4\\pi R^2$."
        ),
        matura_context='Pewniak CKE za 1 pkt. Pytania dotyczą przekroju osiowego stożka/walca, wyznaczania tworzącej l oraz wzorów na objętość.',
        core_formulas=[
            {
                'title': 'Objętość walca',
                'latex': r'V = \pi r^2 H',
                'description': 'Karta wzorów CKE str. 26. Walec o promieniu r i wysokości H.',
                'in_cke_sheet': True,
                'cke_page': 'str. 26'
            },
            {
                'title': 'Objętość stożka',
                'latex': r'V = \frac{1}{3}\pi r^2 H',
                'description': 'Karta wzorów CKE str. 26. Stożek o promieniu r i wysokości H.',
                'in_cke_sheet': True,
                'cke_page': 'str. 26'
            },
            {
                'title': 'Objętość i pole kuli',
                'latex': r'V = \frac{4}{3}\pi R^3, \quad P = 4\pi R^2',
                'description': 'Karta wzorów CKE str. 26. Kula o promieniu R.',
                'in_cke_sheet': True,
                'cke_page': 'str. 26'
            }
        ],
        worked_example={
            'problem': r'Oblicz pole powierzchni bocznej stożka o promieniu podstawy $3$ i wysokości $4$.',
            'steps': [
                r'Krok 1: Obliczamy tworzącą stożka: $l = \sqrt{3^2 + 4^2} = 5$.',
                r'Krok 2: Pole boczne ze wzoru: $P_b = \pi r l = \pi \cdot 3 \cdot 5 = 15\pi$.'
            ],
            'result': r'P_b = 15\pi'
        },
        exam_trap=r'Podstawienie wysokości H zamiast tworzącej l do pola bocznego stożka ($P_b = \pi r l$).',
        visuals=v3,
        tasks=l3_tasks,
        key_takeaway=r'W stożku tworząca $l$, promień $r$ i wysokość $H$ tworzą trójkąt prostokątny ($r^2 + H^2 = l^2$). Pole powierzchni bocznej to $P_b = \pi r l$ – zawsze z tworzącą $l$, nigdy z $H$!'
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'description': 'Graniastosłupy proste i prawidłowe, ostrosłupy oraz bryły obrotowe (walec, stożek, kula).',
        'lessons': lessons
    }
