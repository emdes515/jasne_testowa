"""
topic_16_builder.py - Dział 16: Planimetria – Czworokąty oraz Okrąg i Koło (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Autentyczne CKE
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_16 import get_topic_16_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_16():
    topic_id = 'dzial-16'
    topic_title = 'Planimetria – Czworokąty oraz Okrąg i Koło'
    topic_number = 16
    lessons = []

    # =========================================================================
    # Lekcja 16.1: Własności czworokątów: trapez, równoległobok i romb
    # =========================================================================
    v1 = get_topic_16_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-16-1-1',
            source='Matura czerwiec 2024 • Zad. 20',
            question=r'Podstawy trapezu prostokątnego $ABCD$ mają długości: $|AB| = 8$ oraz $|CD| = 5$.' + '\n' +
                     r'Wysokość $AD$ tego trapezu ma długość $\sqrt{3}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Miara kąta ostrego $ABC$ jest równa',
            options_data=[
                ('A', '$15^\circ$'),
                ('B', '$30^\circ$'),
                ('C', '$45^\circ$'),
                ('D', '$60^\circ$')
            ],
            correct_id='B',
            explanation=r'Opuszczamy wysokość $CE$ z wierzchołka $C$ na podstawę $AB$. Wtedy $|AE| = |CD| = 5$.' + '\n' +
                        r'Długość odcinka $EB$ wynosi: $|EB| = |AB| - |AE| = 8 - 5 = 3$.' + '\n' +
                        r'W trójkącie prostokątnym $CEB$ przyprostokątne to $|CE| = \sqrt{3}$ oraz $|EB| = 3$.' + '\n' +
                        r'Tangens kąta ostrego $\angle ABC$ wynosi:' + '\n' +
                        r'$$\operatorname{tg}(\angle ABC) = \frac{|CE|}{|EB|} = \frac{\sqrt{3}}{3}$$' + '\n' +
                        r'Z tabeli wartości funkcji trygonometrycznych: $\operatorname{tg} 30^\circ = \frac{\sqrt{3}}{3}$, stąd miara kąta to $30^\circ$. Poprawna odpowiedź to B.',
            cke_trap=r'Pamiętaj, że rzut górnej podstawy na dolną daje odcinek o długości $8 - 5 = 3$. Nie myl tangensa $\frac{\sqrt{3}}{3}$ ($30^\circ$) z tangensem $\sqrt{3}$ ($60^\circ$).'
        ),
        make_sc_task(
            task_id='task-16-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trapezie równoramiennym kąt rozwarty ma miarę $125^\circ$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Miara kąta ostrego w tym trapezie jest równa',
            options_data=[
                ('A', '$55^\circ$'),
                ('B', '$65^\circ$'),
                ('C', '$45^\circ$'),
                ('D', '$35^\circ$'),
            ],
            correct_id='A',
            explanation=r'W każdym trapezie suma kątów przy tym samym ramieniu wynosi $180^\circ$:' + '\n' +
                        r'$$\alpha + 125^\circ = 180^\circ \longrightarrow \alpha = 180^\circ - 125^\circ = 55^\circ$$',
            cke_trap=r'Kąty przy jednym ramieniu trapezu ZAWSZE sumują się do $180^\circ$, niezależnie od tego, czy trapez jest równoramienny, czy dowolny.'
        ),
        make_sc_task(
            task_id='task-16-1-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Przekątne rombu mają długości $10$ oraz $24$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Długość boku tego rombu wynosi',
            options_data=[
                ('A', '$13$'),
                ('B', '$12$'),
                ('C', '$15$'),
                ('D', '$26$'),
            ],
            correct_id='A',
            explanation=r'Przekątne rombu przecinają się w połowie pod kątem prostym.' + '\n' +
                        r'Połowy przekątnych to $e_1 = \frac{10}{2} = 5$ oraz $f_1 = \frac{24}{2} = 12$.' + '\n' +
                        r'Z twierdzenia Pitagorasa w trójkącie prostokątnym wyznaczamy bok rombu $a$:' + '\n' +
                        r'$$a = \sqrt{5^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13$$',
            cke_trap=r'Nie podstawiaj całych przekątnych do twierdzenia Pitagorasa! Przekątne rombu dzielą się na połowy, więc liczymy z boków 5 i 12.'
        ),
        make_numeric_task(
            task_id='task-16-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Podstawy trapezu mają długości $6$ oraz $14$, a jego wysokość wynosi $5$.' + '\n' +
                     r'Oblicz pole tego trapezu. Wpisz wynik w pole poniżej.',
            correct_val=50,
            explanation=r'Zastosujmy wzór na pole trapezu:' + '\n' +
                        r'$$P = \frac{a + b}{2} \cdot h = \frac{6 + 14}{2} \cdot 5 = \frac{20}{2} \cdot 5 = 10 \cdot 5 = 50$$',
            cke_trap=r'Pamiętaj o dodaniu podstaw przed podzieleniem przez 2: $(6 + 14) / 2 = 10$.'
        ),
        make_open_task(
            task_id='task-16-1-5',
            source='Matura czerwiec 2023 • Zad. 21',
            question=r'W trapezie prostokątnym $ABCD$ podstawy mają długości $|AB| = 10$ oraz $|CD| = 6$. Ramię prostopadłe $AD$ ma długość $3$.' + '\n' +
                     r'Oblicz obwód tego trapezu. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – wyznaczenie długości rzutu drugiego ramienia na podstawę: 10 - 6 = 4 oraz obliczenie długości ramienia pochyłego BC z twierdzenia Pitagorasa: |BC| = \sqrt{4^2 + 3^2} = 5.' + '\n' +
                        r'2 pkt – obliczenie obwodu trapezu: Obw = 10 + 5 + 6 + 3 = 24.',
            explanation=r'Krok 1: Opuszczamy wysokość $CE$ na dłuższą podstawę $AB$. Wtedy $|AE| = |CD| = 6$, stąd $|EB| = 10 - 6 = 4$.' + '\n' +
                        r'Krok 2: W trójkącie prostokątnym $CEB$ przyprostokątne to $|CE| = 3$ i $|EB| = 4$. Z twierdzenia Pitagorasa:' + '\n' +
                        r'$$|BC| = \sqrt{4^2 + 3^2} = \sqrt{16 + 9} = \sqrt{25} = 5$$' + '\n' +
                        r'Krok 3: Obwód trapezu:' + '\n' +
                        r'$$\mathrm{Obw} = |AB| + |BC| + |CD| + |DA| = 10 + 5 + 6 + 3 = 24$$',
            cke_trap=r'Pamiętaj, że obwód to suma wszystkich czterech boków: nie zapomnij dodać ramienia prostopadłego $AD = 3$.'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-16-1',
        topic_id=topic_id,
        title='Własności czworokątów: trapez, równoległobok i romb',
        concept_essence=(
            "Trapez to czworokąt mający co najmniej jedną parę boków równoległych (podstawy). Suma kątów przy ramieniu wynosi $180^\\circ$, a pole to $P = \\frac{a+b}{2} \\cdot h$.\n\n"
            "Równoległobok ma przeciwległe boki równe i równoległe, a przekątne dzielą się na połowy.\n\n"
            "Romb ma wszystkie boki równe, a jego przekątne przecinają się pod kątem prostym: $P = \\frac{e \\cdot f}{2} = a^2\\sin\\alpha$."
        ),
        matura_context='Pewniak na maturze (1–2 pkt). Zadania dotyczą obliczania kątów przy ramieniu trapezu, wysokości lub boku rombu z połówek przekątnych.',
        core_formulas=[
            {
                'title': 'Pole trapezu',
                'latex': r'P = \frac{a + b}{2} \cdot h',
                'description': 'Karta wzorów CKE str. 19–20. a, b - podstawy, h - wysokość.',
                'in_cke_sheet': True,
                'cke_page': 'str. 19–20'
            },
            {
                'title': 'Pole rombu z przekątnymi',
                'latex': r'P = \frac{e \cdot f}{2}',
                'description': 'Karta wzorów CKE str. 19–20. e, f - długości przekątnych.',
                'in_cke_sheet': True,
                'cke_page': 'str. 19–20'
            }
        ],
        worked_example={
            'problem': r'W trapezie o podstawach $4$ i $10$ oraz wysokości $6$ oblicz pole.',
            'steps': [
                r'Krok 1: Wzór na pole trapezu: $P = \frac{a + b}{2} \cdot h$.',
                r'Krok 2: Podstawiamy dane: $P = \frac{4 + 10}{2} \cdot 6 = \frac{14}{2} \cdot 6 = 7 \cdot 6 = 42$.'
            ],
            'result': r'P = 42'
        },
        exam_trap=r'Sumowanie kątów przy podstawie zamiast przy ramieniu. Kąty w trapezie dają 180° wyłącznie przy tym samym ramieniu!',
        visuals=v1,
        tasks=l1_tasks,
        key_takeaway=r'W każdym trapezie suma miar kątów przy tym samym ramieniu wynosi $180^\circ$. W rombie przekątne przecinają się w połowie pod kątem prostym.'
    )
    lessons.append(l1)

    # =========================================================================
    # Lekcja 16.2: Kąty wpisane i środkowe
    # =========================================================================
    v2 = get_topic_16_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-16-2-1',
            source='Matura sierpień 2023 • Zad. 22',
            question=r'W okręgu $\mathcal{O}$ kąt środkowy $\beta$ oraz kąt wpisany $\alpha$ są oparte na tym samym łuku. Kąt $\beta$ ma miarę o $40^\circ$ większą od kąta $\alpha$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Miara kąta $\beta$ jest równa',
            options_data=[
                ('A', '$40^\circ$'),
                ('B', '$80^\circ$'),
                ('C', '$100^\circ$'),
                ('D', '$120^\circ$')
            ],
            correct_id='B',
            explanation=r'Kąt środkowy oparty na tym samym łuku jest dwukrotnie większy od kąta wpisanego: $\beta = 2\alpha$.' + '\n' +
                        r'Z treści zadania wiemy, że $\beta = \alpha + 40^\circ$.' + '\n' +
                        r'Przyrównujemy:' + '\n' +
                        r'$$2\alpha = \alpha + 40^\circ \longrightarrow \alpha = 40^\circ$$' + '\n' +
                        r'Stąd miara kąta środkowego $\beta = 2 \cdot 40^\circ = 80^\circ$. Poprawna odpowiedź to B.',
            cke_trap=r'Uważaj, o który kąt pyta zadanie: kąt wpisany $\alpha = 40^\circ$, czy środkowy $\beta = 80^\circ$. Pytanie dotyczy kąta $\beta$.'
        ),
        make_sc_task(
            task_id='task-16-2-2',
            source='Matura maj 2024 • Zad. 22',
            question=r'W trójkącie $ABC$ wpisanym w okrąg o środku w punkcie $S$, kąt $ACB$ ma miarę $42^\circ$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Miara kąta środkowego $ASB$ opartego na tym samym łuku jest równa',
            options_data=[
                ('A', '$21^\circ$'),
                ('B', '$42^\circ$'),
                ('C', '$84^\circ$'),
                ('D', '$138^\circ$')
            ],
            correct_id='C',
            explanation=r'Kąt $ACB$ to kąt wpisany oparty na łuku $AB$. Jego miara to $\alpha = 42^\circ$.' + '\n' +
                        r'Kąt $ASB$ to kąt środkowy oparty na tym samym łuku $AB$.' + '\n' +
                        r'Z twierdzenia o kącie wpisanym i środkowym:' + '\n' +
                        r'$$\angle ASB = 2 \cdot \angle ACB = 2 \cdot 42^\circ = 84^\circ$$' + '\n' +
                        r'Poprawna odpowiedź to C.',
            cke_trap=r'Kąt środkowy jest DWA RAZY WIĘKSZY od wpisanego, a nie dwa razy mniejszy! Podzielenie przez 2 ($21^\circ$) to typowa pułapka.'
        ),
        make_sc_task(
            task_id='task-16-2-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Kąt wpisany oparty jest na średnicy okręgu.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Miara tego kąta wynosi',
            options_data=[
                ('A', '$45^\circ$'),
                ('B', '$60^\circ$'),
                ('C', '$90^\circ$'),
                ('D', '$180^\circ$'),
            ],
            correct_id='C',
            explanation=r'Średnica okręgu wyznacza kąt środkowy półpełny o mierze $180^\circ$.' + '\n' +
                        r'Kąt wpisany oparty na średnicy ma miarę równą połowie kąta półpełnego: $\frac{180^\circ}{2} = 90^\circ$.',
            cke_trap=r'Żelazna reguła: każdy trójkąt wpisany w okrąg, którego jeden bok jest średnicą, jest trójkątem PROSTOKĄTNYM.'
        ),
        make_numeric_task(
            task_id='task-16-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Kąt środkowy w okręgu ma miarę $130^\circ$. Oblicz miarę kąta wpisanego opartego na tym samym łuku (w stopniach). Wpisz wynik w pole poniżej.',
            correct_val=65,
            explanation=r'Z twierdzenia o kącie wpisanym i środkowym:' + '\n' +
                        r'$$\alpha = \frac{\beta}{2} = \frac{130^\circ}{2} = 65^\circ$$',
            cke_trap=r'Pamiętaj: kąt wpisany jest POŁOWĄ kąta środkowego: $130 / 2 = 65^\circ$.'
        ),
        make_open_task(
            task_id='task-16-2-5',
            source='Matura maj 2023 • Zad. 22',
            question=r'Punkty $A$, $B$ i $C$ leżą na okręgu o środku $S$. Miara kąta środkowego $ASB$ jest o $50^\circ$ większa od miary kąta wpisanego $ACB$ opartego na tym samym łuku.' + '\n' +
                     r'Oblicz miarę kąta środkowego $ASB$. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – zapisanie równania wiążącego miary kątów: 2\alpha = \alpha + 50^\circ lub wyznaczenie miary kąta wpisanego: \alpha = 50^\circ.' + '\n' +
                        r'2 pkt – obliczenie miary kąta środkowego: \beta = 100^\circ.',
            explanation=r'Krok 1: Oznaczmy miarę kąta wpisanego $ACB$ jako $\alpha$. Wtedy kąt środkowy $ASB$ oparty na tym samym łuku ma miarę $\beta = 2\alpha$.' + '\n' +
                        r'Krok 2: Z treści zadania: $\beta = \alpha + 50^\circ$.' + '\n' +
                        r'Układamy równanie:' + '\n' +
                        r'$$2\alpha = \alpha + 50^\circ \longrightarrow \alpha = 50^\circ$$' + '\n' +
                        r'Krok 3: Kąt środkowy wynosi zatem $\beta = 2 \cdot 50^\circ = 100^\circ$.',
            cke_trap=r'Pamiętaj, że zadanie pyta o kąt środkowy $ASB$ ($100^\circ$), a nie o kąt wpisany $ACB$ ($50^\circ$).'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-16-2',
        topic_id=topic_id,
        title='Kąty wpisane i środkowe oparte na tym samym łuku',
        concept_essence=(
            "Kąt środkowy ma wierzchołek w środku okręgu, a kąt wpisany ma wierzchołek na brzegu okręgu.\n\n"
            "Jeśli oba kąty są oparte na tym samym łuku, to kąt środkowy jest dwukrotnie większy od kąta wpisanego: $\\beta = 2\\alpha$.\n\n"
            "Kąt wpisany oparty na średnicy ma miarę $90^\\circ$ (tworzy trójkąt prostokątny)."
        ),
        matura_context='Żelazny pewniak każdego arkusza maturalnego CKE (1 pkt). Zawsze szukaj wspólnego łuku dla kąta wpisanego i środkowego.',
        core_formulas=[
            {
                'title': 'Kąt wpisany i środkowy',
                'latex': r'\beta = 2\alpha',
                'description': 'Karta wzorów CKE str. 17. beta - kąt środkowy, alfa - kąt wpisany na tym samym łuku.',
                'in_cke_sheet': True,
                'cke_page': 'str. 17'
            }
        ],
        worked_example={
            'problem': r'Kąt wpisany w okrąg ma miarę $35^\circ$. Oblicz miarę kąta środkowego opartego na tym samym łuku.',
            'steps': [
                r'Krok 1: Wypisujemy zależność: $\beta = 2\alpha$.',
                r'Krok 2: Mnożymy kąt wpisany przez 2: $\beta = 2 \cdot 35^\circ = 70^\circ$.'
            ],
            'result': r'\beta = 70^\circ'
        },
        exam_trap=r'Odwrócenie relacji: dzielenie zamiast mnożenia (np. przyjęcie, że środkowy to 17,5° zamiast 70°). Środkowy jest ZAWSZE większy!',
        visuals=v2,
        tasks=l2_tasks,
        key_takeaway=r'Kąt środkowy jest dwa razy większy od kąta wpisanego opartego na tym samym łuku ($\beta = 2\alpha$). Kąt wpisany oparty na średnicy ma ZAWSZE $90^\circ$.'
    )
    lessons.append(l2)

    # =========================================================================
    # Lekcja 16.3: Styczna do okręgu oraz okrąg wpisany i opisany na trójkącie
    # =========================================================================
    v3 = get_topic_16_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-16-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Prosta $k$ jest styczna do okręgu o środku $S$ w punkcie $P$. Odcinek $SA$ przecina okrąg w punkcie $B$, a punkt $A$ leży na prostej $k$.' + '\n' +
                     r'Długość promienia okręgu wynosi $r = 5$, a $|AP| = 12$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Długość odcinka $SA$ jest równa',
            options_data=[
                ('A', '$13$'),
                ('B', '$17$'),
                ('C', r'$\sqrt{119}$'),
                ('D', '$15$')
            ],
            correct_id='A',
            explanation=r'Promień poprowadzony do punktu styczności jest prostopadły do stycznej: $SP \perp k$, stąd $\angle SPA = 90^\circ$.' + '\n' +
                        r'Trójkąt $SPA$ jest prostokątny o przyprostokątnych $|SP| = 5$ oraz $|AP| = 12$.' + '\n' +
                        r'Z twierdzenia Pitagorasa:' + '\n' +
                        r'$$|SA| = \sqrt{5^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Kluczowa własność: promień tworzy ze styczną kąt prosty w punkcie styczności. Dzięki temu zawsze możemy zastosować twierdzenie Pitagorasa.'
        ),
        make_sc_task(
            task_id='task-16-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie prostokątnym przyprostokątne mają długości $a = 6$ oraz $b = 8$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Promień okręgu wpisanego w ten trójkąt jest równy',
            options_data=[
                ('A', '$2$'),
                ('B', '$3$'),
                ('C', '$4$'),
                ('D', '$5$'),
            ],
            correct_id='A',
            explanation=r'Krok 1: Przeciwprostokątna $c = \sqrt{6^2 + 8^2} = 10$.' + '\n' +
                        r'Krok 2: Wzór na promień okręgu wpisanego w trójkąt prostokątny:' + '\n' +
                        r'$$r = \frac{a + b - c}{2} = \frac{6 + 8 - 10}{2} = \frac{4}{2} = 2$$',
            cke_trap=r'Nie myl promienia okręgu wpisanego ($r = 2$) z promieniem okręgu opisanego ($R = \frac{c}{2} = 5$).'
        ),
        make_sc_task(
            task_id='task-16-3-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Na trójkącie równobocznym o boku $a = 6$ opisano okrąg.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Promień $R$ tego okręgu wynosi',
            options_data=[
                ('A', r'$2\sqrt{3}$'),
                ('B', r'$\sqrt{3}$'),
                ('C', r'$3\sqrt{3}$'),
                ('D', '$4$'),
            ],
            correct_id='A',
            explanation=r'W trójkącie równobocznym promień okręgu opisanego to $\frac{2}{3}$ wysokości:' + '\n' +
                        r'$$h = \frac{a\sqrt{3}}{2} = \frac{6\sqrt{3}}{2} = 3\sqrt{3}$$' + '\n' +
                        r'$$R = \frac{2}{3}h = \frac{2}{3} \cdot 3\sqrt{3} = 2\sqrt{3}$$',
            cke_trap=r'Dla okręgu opisanego bierzemy $\frac{2}{3}h$, a dla wpisanego $\frac{1}{3}h = \sqrt{3}$.'
        ),
        make_numeric_task(
            task_id='task-16-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Prosta $k$ jest styczna w punkcie $A$ do okręgu o środku $S$ i promieniu $r = 8$. Punkt $B$ leży na prostej $k$, a odległość punktu $B$ od środka okręgu wynosi $|SB| = 17$.' + '\n' +
                     r'Oblicz długość odcinka $AB$. Wpisz wynik w pole poniżej.',
            correct_val=15,
            explanation=r'Promień poprowadzony do punktu styczności jest prostopadły do stycznej: $SA \perp AB$, zatem trójkąt $SAB$ jest prostokątny z kątem prostym przy wierzchołku $A$.' + '\n' +
                        r'Z twierdzenia Pitagorasa:' + '\n' +
                        r'$$|AB|^2 + |SA|^2 = |SB|^2 \longrightarrow |AB|^2 + 8^2 = 17^2$$' + '\n' +
                        r'$$|AB|^2 + 64 = 289 \longrightarrow |AB|^2 = 225 \longrightarrow |AB| = 15$$',
            cke_trap=r'Pamiętaj, że przeciwprostokątną jest odcinek łączący środek okręgu z punktem $B$ ($|SB| = 17$), a promień ($r = 8$) to przyprostokątna.'
        ),
        make_open_task(
            task_id='task-16-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie prostokątnym o polu $P = 24$ jedna z przyprostokątnych ma długość $6$. Oblicz promień okręgu wpisanego w ten trójkąt. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – obliczenie drugiej przyprostokątnej b = 8 i przeciwprostokątnej c = 10.' + '\n' +
                        r'2 pkt – zastosowanie wzoru r = (a + b - c)/2 i podanie wyniku r = 2.',
            explanation=r'Krok 1: Z wzoru na pole $P = \frac{1}{2}ab \longrightarrow 24 = \frac{1}{2} \cdot 6 \cdot b \longrightarrow 3b = 24 \longrightarrow b = 8$.' + '\n' +
                        r'Krok 2: Przeciwprostokątna z twierdzenia Pitagorasa: $c = \sqrt{6^2 + 8^2} = 10$.' + '\n' +
                        r'Krok 3: Promień okręgu wpisanego:' + '\n' +
                        r'$$r = \frac{a + b - c}{2} = \frac{6 + 8 - 10}{2} = \frac{4}{2} = 2$$',
            cke_trap=r'Uważaj: wzór $r = \frac{a + b - c}{2}$ działa WYŁĄCZNIE dla trójkąta PROSTOKĄTNEGO. Dla dowolnego trójkąta stosujemy $r = \frac{P}{p}$, gdzie $p$ to połowa obwodu.'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-16-3',
        topic_id=topic_id,
        title='Styczna do okręgu oraz okrąg wpisany i opisany na trójkącie',
        concept_essence=(
            "Styczna do okręgu ma dokładnie jeden punkt wspólny z okręgiem i jest prostopadła do promienia poprowadzonego do tego punktu ($r \\perp k$).\n\n"
            "Dla trójkąta prostokątnego promień okręgu opisanego to $R = \\frac{c}{2}$, a promień wpisanego to $r = \\frac{a+b-c}{2}$.\n\n"
            "Dla trójkąta równobocznego $R = \\frac{2}{3}h = \\frac{a\\sqrt{3}}{3}$ oraz $r = \\frac{1}{3}h = \\frac{a\\sqrt{3}}{6}$."
        ),
        matura_context='Pewniak maturalny CKE (1–2 pkt). Zadania łączą styczną z trójkątem prostokątnym lub badają promienie wpisane i opisane.',
        core_formulas=[
            {
                'title': 'Promień okręgu wpisanego w trójkąt prostokątny',
                'latex': r'r = \frac{a + b - c}{2}',
                'description': 'Karta wzorów CKE str. 17.',
                'in_cke_sheet': True,
                'cke_page': 'str. 17'
            },
            {
                'title': 'Promień okręgu opisanego na trójkącie prostokątnym',
                'latex': r'R = \frac{c}{2}',
                'description': 'Karta wzorów CKE str. 15. R = c/2 (promień to połowa przeciwprostokątnej).',
                'in_cke_sheet': True,
                'cke_page': 'str. 15'
            }
        ],
        worked_example={
            'problem': r'W trójkącie prostokątnym o bokach $3, 4, 5$ oblicz promień okręgu wpisanego $r$ oraz promień okręgu opisanego $R$.',
            'steps': [
                r'Krok 1: Promień opisanego: $R = \frac{c}{2} = \frac{5}{2} = 2{,}5$.',
                r'Krok 2: Promień wpisanego: $r = \frac{a + b - c}{2} = \frac{3 + 4 - 5}{2} = \frac{2}{2} = 1$.'
            ],
            'result': r'R = 2{,}5, \quad r = 1'
        },
        exam_trap=r'Mylenie promienia wpisanego z opisanym oraz pominięcie faktu, że promień tworzy ze styczną kąt prosty.',
        visuals=v3,
        tasks=l3_tasks,
        key_takeaway=r'Promień okręgu poprowadzony do punktu styczności jest ZAWSZE prostopadły do stycznej ($r \perp k$). W trójkącie prostokątnym promień opisanego to połowa przeciwprostokątnej ($R = \frac{c}{2}$).'
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'description': 'Własności czworokątów (trapez, romb, równoległobok), kąty wpisane i środkowe oraz styczna i promienie okręgów.',
        'lessons': lessons
    }
