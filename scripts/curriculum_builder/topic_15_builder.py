"""
topic_15_builder.py - Dział 15: Planimetria – Trójkąty, Cechy Podobieństwa i Twierdzenie Talesa (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Autentyczne CKE
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_15 import get_topic_15_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_15():
    topic_id = 'dzial-15'
    topic_title = 'Planimetria – Trójkąty, Cechy Podobieństwa i Twierdzenie Talesa'
    topic_number = 15
    lessons = []

    # =========================================================================
    # Lekcja 15.1: Własności trójkątów: równoramienny, równoboczny i prostokątny
    # =========================================================================
    v1 = get_topic_15_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-15-1-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Pole trójkąta równobocznego jest równe $16\sqrt{3}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Długość boku tego trójkąta wynosi',
            options_data=[
                ('A', '$4$'),
                ('B', '$8$'),
                ('C', '$16$'),
                ('D', r'$4\sqrt{3}$')
            ],
            correct_id='B',
            explanation=r'Wzór na pole trójkąta równobocznego o boku $a$:' + '\n' +
                        r'$$P = \frac{a^2\sqrt{3}}{4}$$' + '\n' +
                        r'Przyrównujemy do danej wartości pola:' + '\n' +
                        r'$$\frac{a^2\sqrt{3}}{4} = 16\sqrt{3} \implies a^2 = 16 \cdot 4 = 64$$' + '\n' +
                        r'Ponieważ $a > 0$, otrzymujemy $a = \sqrt{64} = 8$. Poprawna odpowiedź to B.',
            cke_trap=r'Pamiętaj, że we wzorze na pole w mianowniku stoi 4, a nie 2! Pomnożenie przez 2 dałoby $a^2 = 32$, co jest błędem.'
        ),
        make_sc_task(
            task_id='task-15-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Wysokość trójkąta równobocznego jest równa $6\sqrt{3}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Pole tego trójkąta wynosi',
            options_data=[
                ('A', r'$36\sqrt{3}$'),
                ('B', r'$18\sqrt{3}$'),
                ('C', r'$72\sqrt{3}$'),
                ('D', '$36$'),
            ],
            correct_id='A',
            explanation=r'Wzór na wysokość trójkąta równobocznego: $h = \frac{a\sqrt{3}}{2}$.' + '\n' +
                        r'$$\frac{a\sqrt{3}}{2} = 6\sqrt{3} \implies a = 12$$' + '\n' +
                        r'Obliczamy pole trójkąta równobocznego:' + '\n' +
                        r'$$P = \frac{a^2\sqrt{3}}{4} = \frac{12^2\sqrt{3}}{4} = \frac{144\sqrt{3}}{4} = 36\sqrt{3}$$',
            cke_trap=r'Nie myl boku z wysokością. Najpierw wyznacz bok $a = 12$, a dopiero potem pole.'
        ),
        make_sc_task(
            task_id='task-15-1-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie równoramiennym kąt między ramionami ma miarę $100^\circ$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Kąt przy podstawie tego trójkąta ma miarę',
            options_data=[
                ('A', r'$40^\circ$'),
                ('B', r'$50^\circ$'),
                ('C', r'$80^\circ$'),
                ('D', r'$45^\circ$'),
            ],
            correct_id='A',
            explanation=r'W każdym trójkącie suma miar kątów wynosi $180^\circ$.' + '\n' +
                        r'W trójkącie równoramiennym kąty przy podstawie są równe: $\alpha = \beta$.' + '\n' +
                        r'$$2\alpha + 100^\circ = 180^\circ \implies 2\alpha = 80^\circ \implies \alpha = 40^\circ$$',
            cke_trap=r'Uważaj, który kąt podano w treści: kąt MIĘDZY ramionami ($100^\circ$) czy kąt przy podstawie.'
        ),
        make_tf_task(
            task_id='task-15-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Oceń prawdziwość poniższego zdania:' + '\n' +
                     r'W każdym trójkącie prostokątnym promień okręgu opisanego jest równy połowie długości przeciwprostokątnej.',
            correct_tf='P',
            explanation=r'Środek okręgu opisanego na trójkącie prostokątnym leży dokładnie w środku przeciwprostokątnej.' + '\n' +
                        r'Przeciwprostokątna jest średnicą tego okręgu ($d = 2R$), więc promień $R = \frac{c}{2}$. Zdanie jest prawdziwe.',
            cke_trap=r'Twierdzenie Talesa o kącie wpisanym opartym na średnicy gwarantuje, że przeciwprostokątna trójkąta prostokątnego jest średnicą okręgu opisanego.'
        ),
        make_numeric_task(
            task_id='task-15-1-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie prostokątnym przyprostokątne mają długości $6$ oraz $8$. Oblicz promień okręgu opisanego na tym trójkącie. Wpisz wynik w pole poniżej.',
            correct_val=5,
            explanation=r'Z twierdzenia Pitagorasa obliczamy przeciwprostokątną $c$:' + '\n' +
                        r'$$c = \sqrt{6^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = 10$$' + '\n' +
                        r'Promień okręgu opisanego to połowa przeciwprostokątnej:' + '\n' +
                        r'$$R = \frac{c}{2} = \frac{10}{2} = 5$$',
            cke_trap=r'Nie zapomnij podzielić przeciwprostokątnej przez 2: $R = \frac{c}{2} = 5$. Wynik 10 to średnica, a nie promień!'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-15-1',
        topic_id=topic_id,
        title='Własności trójkątów: równoramienny, równoboczny i prostokątny',
        concept_essence=(
            "Trójkąt równoboczny ma wszystkie boki równe i kąty po $60^\\circ$. Jego wysokość $h = \\frac{a\\sqrt{3}}{2}$, a pole $P = \\frac{a^2\\sqrt{3}}{4}$.\n\n"
            "Trójkąt równoramienny ma równe ramiona i równe kąty przy podstawie, a wysokość dzieli podstawę na połowy.\n\n"
            "W trójkącie prostokątnym środek okręgu opisanego to środek przeciwprostokątnej, więc promień $R = \\frac{c}{2}$."
        ),
        matura_context='Fundament planimetrii na maturze (1–2 pkt). Pytania sprawdzają wzory na trójkąt równoboczny oraz własności kątów i promieni.',
        core_formulas=[
            {
                'title': 'Wysokość trójkąta równobocznego',
                'latex': r'h = \frac{a\sqrt{3}}{2}',
                'description': 'Karta wzorów CKE str. 16.',
                'in_cke_sheet': True,
                'cke_page': 'str. 16'
            },
            {
                'title': 'Pole trójkąta równobocznego',
                'latex': r'P = \frac{a^2\sqrt{3}}{4}',
                'description': 'Karta wzorów CKE str. 16.',
                'in_cke_sheet': True,
                'cke_page': 'str. 16'
            }
        ],
        worked_example={
            'problem': r'Dany jest trójkąt równoboczny o boku $a = 6$. Oblicz jego wysokość $h$ i pole $P$.',
            'steps': [
                r'Krok 1: Wysokość ze wzoru: $h = \frac{6\sqrt{3}}{2} = 3\sqrt{3}$.',
                r'Krok 2: Pole ze wzoru: $P = \frac{6^2\sqrt{3}}{4} = \frac{36\sqrt{3}}{4} = 9\sqrt{3}$.'
            ],
            'result': r'h = 3\sqrt{3}, \quad P = 9\sqrt{3}'
        },
        exam_trap=r'Mylenie mianowników: wysokość dzieli przez 2 ($h = \frac{a\sqrt{3}}{2}$), a pole dzieli przez 4 ($P = \frac{a^2\sqrt{3}}{4}$).',
        visuals=v1,
        tasks=l1_tasks,
        key_takeaway=r'Dla trójkąta równobocznego o boku $a$ zapamiętaj: wysokość dzieli przez $2$ ($h = \frac{a\sqrt{3}}{2}$), a pole dzieli przez $4$ ($P = \frac{a^2\sqrt{3}}{4}$).'
    )
    lessons.append(l1)

    # =========================================================================
    # Lekcja 15.2: Twierdzenie Talesa i proste równoległe
    # =========================================================================
    v2 = get_topic_15_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-15-2-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Ramiona kąta przecięto dwiema prostymi równoległymi $DE$ i $BC$. Na jednym ramieniu leżą punkty $A, D, B$ (w tej kolejności), a na drugim $A, E, C$.' + '\n' +
                     r'Długości odcinków wynoszą: $|AD| = 4$, $|DB| = 6$ oraz $|AE| = 6$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Długość odcinka $EC$ jest równa',
            options_data=[
                ('A', '$9$'),
                ('B', '$8$'),
                ('C', '$10$'),
                ('D', '$12$')
            ],
            correct_id='A',
            explanation=r'Z twierdzenia Talesa dla odcinków na ramionach kąta:' + '\n' +
                        r'$$\frac{|AD|}{|DB|} = \frac{|AE|}{|EC|}$$' + '\n' +
                        r'Podstawiamy wartości: $\frac{4}{6} = \frac{6}{|EC|}$.' + '\n' +
                        r'Mnożymy na krzyż: $4 \cdot |EC| = 36 \implies |EC| = 9$.' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Dla odcinków na ramionach stosunek górnego do dolnego kawałka jest równy: $\frac{4}{6} = \frac{6}{|EC|}$. Nie myl z całym ramieniem.'
        ),
        make_sc_task(
            task_id='task-15-2-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie $ABC$ odcinek $DE$ jest równoległy do podstawy $AB$, przy czym $D \in AC$ oraz $E \in BC$.' + '\n' +
                     r'Wiadomo, że $|CD| = 3$, $|DA| = 6$ oraz $|DE| = 4$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Długość podstawy $AB$ jest równa',
            options_data=[
                ('A', '$12$'),
                ('B', '$8$'),
                ('C', '$10$'),
                ('D', '$15$'),
            ],
            correct_id='A',
            explanation=r'Trójkąty $CDE$ i $CAB$ są podobne. Stosunek podstaw odpowiada stosunkowi CAŁYCH boków:' + '\n' +
                        r'$$|CA| = |CD| + |DA| = 3 + 6 = 9$$' + '\n' +
                        r'Układamy proporcję:' + '\n' +
                        r'$$\frac{|DE|}{|AB|} = \frac{|CD|}{|CA|} \implies \frac{4}{|AB|} = \frac{3}{9} = \frac{1}{3}$$' + '\n' +
                        r'$$|AB| = 4 \cdot 3 = 12$$',
            cke_trap=r'Kluczowa pułapka: proporcja podstaw wymaga CAŁEGO boku $|CA| = 3 + 6 = 9$, a nie tylko dolnego fragmentu $|DA| = 6$! Błąd dałby $|AB| = 8$.'
        ),
        make_sc_task(
            task_id='task-15-2-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Proste $k$ i $l$ są równoległe i przecinają ramiona kąta o wierzchołku $O$.' + '\n' +
                     r'Na jednym ramieniu wyznaczają odcinki $|OA| = 2$ oraz $|AB| = x$, a na drugim $|OC| = 3$ oraz $|CD| = 6$.' + '\n' +
                     r'Długość odcinka $x$ wynosi',
            options_data=[
                ('A', '$4$'),
                ('B', '$3$'),
                ('C', '$5$'),
                ('D', '$6$'),
            ],
            correct_id='A',
            explanation=r'Z twierdzenia Talesa:' + '\n' +
                        r'$$\frac{|OA|}{|AB|} = \frac{|OC|}{|CD|} \implies \frac{2}{x} = \frac{3}{6} = \frac{1}{2}$$' + '\n' +
                        r'$$x = 2 \cdot 2 = 4$$',
            cke_trap=r'Upewnij się, że zachowujesz tę samą kolejność odcinków w obu ułamkach.'
        ),
        make_tf_task(
            task_id='task-15-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Oceń prawdziwość poniższego zdania:' + '\n' +
                     r'Odcinek łączący środki dwóch ramion dowolnego trójkąta jest równoległy do trzeciego boku i ma długość równą połowie tego boku.',
            correct_tf='P',
            explanation=r'Z twierdzenia o linii środkowej trójkąta (wniosek z twierdzenia Talesa):' + '\n' +
                        r'Skala podobieństwa małego trójkąta do dużego wynosi $k = \frac{1}{2}$. Odcinek jest równoległy do podstawy i ma długość $\frac{1}{2}$ podstawy. Zdanie jest prawdziwe.',
            cke_trap=r'Linia środkowa trójkąta dzieli jego pole w stosunku $1 : 4$ (pole małego trójkąta to $\frac{1}{4}$ pola dużego).'
        ),
        make_numeric_task(
            task_id='task-15-2-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie $ABC$ odcinek równoległy do boku $AB$ o długości $10$ dzieli bok $AC$ w stosunku $2 : 3$ (licząc od wierzchołka $C$).' + '\n' +
                     r'Oblicz długość tego odcinka równoległego. Wpisz wynik w pole poniżej.',
            correct_val=4,
            explanation=r'Stosunek $|CD| : |DA| = 2 : 3$. Cały bok $|CA| = 2x + 3x = 5x$.' + '\n' +
                        r'Stosunek małego boku do całego boku wynosi $\frac{2x}{5x} = \frac{2}{5}$.' + '\n' +
                        r'Długość odcinka równoległego $d$:' + '\n' +
                        r'$$\frac{d}{10} = \frac{2}{5} \implies d = 10 \cdot \frac{2}{5} = 4$$',
            cke_trap=r'Nie dziel $10$ przez $3$ ani przez $2$! Proporcja wymaga stosunku części do CAŁOŚCI, czyli $\frac{2}{2 + 3} = \frac{2}{5}$.'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-15-2',
        topic_id=topic_id,
        title='Twierdzenie Talesa i proste równoległe',
        concept_essence=(
            "Twierdzenie Talesa mówi, że proste równoległe wycinają na ramionach kąta odcinki proporcjonalne.\n\n"
            "Dla odcinków na ramionach: $\\frac{|AD|}{|DB|} = \\frac{|AE|}{|EC|}$ (odcinek górny do dolnego).\n\n"
            "Dla odcinków równoległych (podstaw trójkątów): $\\frac{|DE|}{|BC|} = \\frac{|AD|}{|AB|}$ (podstawa mała do dużej = bok mały do CAŁEGO boku)."
        ),
        matura_context='Częste zadanie geometryczne za 1 pkt. Egzaminatorzy regularnie sprawdzają, czy uczeń pamięta o wzięciu całego ramienia przy porównywaniu podstaw.',
        core_formulas=[
            {
                'title': 'Twierdzenie Talesa',
                'latex': r'\frac{|AD|}{|AB|} = \frac{|AE|}{|AC|} = \frac{|DE|}{|BC|}',
                'description': 'Karta wzorów CKE str. 16. Warunek: DE równoległe do BC.',
                'in_cke_sheet': True,
                'cke_page': 'str. 16'
            }
        ],
        worked_example={
            'problem': r'W trójkącie $ABC$ odcinek $DE \parallel AB$. Wiadomo, że $|CD| = 2$, $|CA| = 6$ oraz $|AB| = 15$. Oblicz długość $|DE|$.',
            'steps': [
                r'Krok 1: Układamy proporcję Talesa dla podstaw: $\frac{|DE|}{|AB|} = \frac{|CD|}{|CA|}$.',
                r'Krok 2: Podstawiamy dane: $\frac{|DE|}{15} = \frac{2}{6} = \frac{1}{3}$.',
                r'Krok 3: Obliczamy $|DE| = 15 \cdot \frac{1}{3} = 5$.'
            ],
            'result': r'|DE| = 5'
        },
        exam_trap=r'Kardynalny błąd: porównywanie podstaw z fragmentem boku zamiast z całym bokiem: $\frac{|DE|}{|BC|} \neq \frac{|AD|}{|DB|}$.',
        visuals=v2,
        tasks=l2_tasks,
        key_takeaway=r'W twierdzeniu Talesa porównując podstawy trójkątów $\frac{|DE|}{|AB|}$ musisz ZAWSZE wziąć CAŁE ramiona $\frac{|CD|}{|CA|}$, a nie tylko dolne odcięte fragmenty!'
    )
    lessons.append(l2)

    # =========================================================================
    # Lekcja 15.3: Cechy podobieństwa trójkątów i skala podobieństwa pól
    # =========================================================================
    v3 = get_topic_15_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-15-3-1',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Trójkąty prostokątne $T_1$ i $T_2$ są podobne. Przyprostokątne trójkąta $T_1$ mają długości $5$ i $12$. Przeciwprostokątna trójkąta $T_2$ ma długość $26$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Pole trójkąta $T_2$ jest równe',
            options_data=[
                ('A', '$120$'),
                ('B', '$60$'),
                ('C', '$150$'),
                ('D', '$240$')
            ],
            correct_id='A',
            explanation=r'Krok 1: Obliczamy przeciwprostokątną trójkąta $T_1$ z twierdzenia Pitagorasa:' + '\n' +
                        r'$$c_1 = \sqrt{5^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13$$' + '\n' +
                        r'Krok 2: Wyznaczamy skalę podobieństwa $k$ trójkąta $T_2$ do $T_1$:' + '\n' +
                        r'$$k = \frac{c_2}{c_1} = \frac{26}{13} = 2$$' + '\n' +
                        r'Krok 3: Obliczamy pole trójkąta $T_1$:' + '\n' +
                        r'$$P_1 = \frac{1}{2} \cdot 5 \cdot 12 = 30$$' + '\n' +
                        r'Krok 4: Stosunek pól figur podobnych wynosi $k^2$:' + '\n' +
                        r'$$P_2 = k^2 \cdot P_1 = 2^2 \cdot 30 = 4 \cdot 30 = 120$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Pola figur podobnych rosną w skali $k^2$! Jeśli boki rosną 2 razy ($k = 2$), to pole rośnie 4 razy ($k^2 = 4$). Błąd polega na pomnożeniu pola przez 2 zamiast przez 4.'
        ),
        make_sc_task(
            task_id='task-15-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Trójkąt $T_2$ jest podobny do trójkąta $T_1$ w skali $k = 3$. Pole trójkąta $T_1$ wynosi $8$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Pole trójkąta $T_2$ jest równe',
            options_data=[
                ('A', '$24$'),
                ('B', '$72$'),
                ('C', '$48$'),
                ('D', '$144$'),
            ],
            correct_id='B',
            explanation=r'Stosunek pól figur podobnych wynosi $k^2$:' + '\n' +
                        r'$$\frac{P_2}{P_1} = k^2 = 3^2 = 9$$' + '\n' +
                        r'$$P_2 = 9 \cdot P_1 = 9 \cdot 8 = 72$$',
            cke_trap=r'Nie mnóż pola przez $k = 3$ (co dałoby błędne 24). Pole rośnie $k^2 = 9$ razy!'
        ),
        make_sc_task(
            task_id='task-15-3-3',
            source='Matura sierpień 2023 • Zad. 20',
            question=r'Trapez $T_1$, o polu równym $52$ i obwodzie $36$, jest podobny do trapezu $T_2$. Pole trapezu $T_2$ jest równe $13$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Obwód trapezu $T_2$ jest równy',
            options_data=[
                ('A', '$18$'),
                ('B', '$9$'),
                ('C', r'$\frac{169}{9}$'),
                ('D', r'$\frac{52}{3}$'),
            ],
            correct_id='A',
            explanation=r'Krok 1: Skala podobieństwa pól trapezu $T_2$ do $T_1$ wynosi:' + '\n' +
                        r'$$k^2 = \frac{P_2}{P_1} = \frac{13}{52} = \frac{1}{4}$$' + '\n' +
                        r'Krok 2: Skala podobieństwa obwodów (skala liniowa) to pierwiastek ze skali pól:' + '\n' +
                        r'$$k = \sqrt{\frac{1}{4}} = \frac{1}{2}$$' + '\n' +
                        r'Krok 3: Obliczamy obwód trapezu $T_2$:' + '\n' +
                        r'$$\text{Obw}_2 = k \cdot \text{Obw}_1 = \frac{1}{2} \cdot 36 = 18$$' + '\n' +
                        r'Poprawna odpowiedź to A.',
            cke_trap=r'Nie pomyl skali pól $k^2$ ze skalą liniową $k$. Obwód zmienia się w skali $k = \sqrt{\frac{13}{52}} = \frac{1}{2}$, a nie $\frac{1}{4}$.'
        ),
        make_tf_task(
            task_id='task-15-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Oceń prawdziwość poniższego zdania:' + '\n' +
                     r'Każde dwa dowolne trójkąty prostokątne równoramienne są podobne.',
            correct_tf='P',
            explanation=r'W każdym trójkącie prostokątnym równoramiennym miary kątów wynoszą $90^\circ, 45^\circ, 45^\circ$.' + '\n' +
                        r'Z cechy KKK (kąt-kąt-kąt), jeśli odpowiednie kąty są równe, to figury są podobne. Zdanie jest prawdziwe.',
            cke_trap=r'Dla cechy KKK wystarczy równość dwóch kątów, bo trzeci kąt wynika z sumy 180°.'
        ),
        make_open_task(
            task_id='task-15-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Trójkąty $ABC$ i $A\'B\'C\'$ są podobne. Obwód trójkąta $ABC$ wynosi $18$, a jego pole to $12$. Obwód trójkąta $A\'B\'C\'$ wynosi $36$. Oblicz pole trójkąta $A\'B\'C\'$. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt - obliczenie skali podobieństwa k = 36 / 18 = 2.' + '\n' +
                        r'2 pkt - zastosowanie k^2 = 4 i obliczenie pola P = 4 · 12 = 48.',
            explanation=r'Krok 1: Wyznaczamy skalę podobieństwa ze stosunku obwodów:' + '\n' +
                        r"$$k = \frac{\text{Obw}'}{\text{Obw}} = \frac{36}{18} = 2$$" + '\n' +
                        r"Krok 2: Obliczamy pole trójkąta podobnego za pomocą kwadratu skali $k^2$:" + '\n' +
                        r"$$P' = k^2 \cdot P = 2^2 \cdot 12 = 4 \cdot 12 = 48$$",
            cke_trap=r'Pamiętaj: obwód rośnie $k$ razy, ale pole rośnie $k^2$ razy!'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-15-3',
        topic_id=topic_id,
        title='Cechy podobieństwa trójkątów i skala podobieństwa pól',
        concept_essence=(
            "Cechy podobieństwa trójkątów: KKK (kąt-kąt-kąt), BBB (bok-bok-bok), BKB (bok-kąt-bok).\n\n"
            "Skala podobieństwa $k = \\frac{a_2}{a_1}$ określa powiększenie wszystkich wymiarów liniowych (boków, wysokości, obwodów, promieni).\n\n"
            "Stosunek pól figur podobnych wynosi kwadrat skali podobieństwa: $\\frac{P_2}{P_1} = k^2$."
        ),
        matura_context='Pewniak maturalny za 1–2 pkt. Zadania testują zrozumienie relacji między skalą liniową k a skalą powierzchni k².',
        core_formulas=[
            {
                'title': 'Skala podobieństwa obwodów',
                'latex': r'\frac{\text{Obw}_2}{\text{Obw}_1} = k',
                'description': 'Karta wzorów CKE str. 16.',
                'in_cke_sheet': True,
                'cke_page': 'str. 16'
            },
            {
                'title': 'Skala podobieństwa pól',
                'latex': r'\frac{P_2}{P_1} = k^2',
                'description': 'Stosunek pól jest równy kwadratowi skali podobieństwa.',
                'in_cke_sheet': True,
                'cke_page': 'str. 16'
            }
        ],
        worked_example={
            'problem': r'Trójkąt $T_2$ jest podobny do trójkąta $T_1$ w skali $k = 2$. Obwód $T_1$ to $10$, a pole to $6$. Oblicz obwód i pole $T_2$.',
            'steps': [
                r'Krok 1: Obwód rośnie $k$ razy: $\text{Obw}_2 = 2 \cdot 10 = 20$.',
                r'Krok 2: Pole rośnie $k^2 = 4$ razy: $P_2 = 4 \cdot 6 = 24$.'
            ],
            'result': r'\text{Obw}_2 = 20, \quad P_2 = 24'
        },
        exam_trap=r'Najczęstszy błąd: mnożenie pola przez $k$ zamiast przez $k^2$. Wymiar kwadratowy wymaga potęgi 2.',
        visuals=v3,
        tasks=l3_tasks,
        key_takeaway=r'Wszystkie wymiary liniowe (boki, obwód, wysokość, promień) zmieniają się w skali $k$, a pole figury ZAWSZE w skali $k^2$.'
    )
    lessons.append(l3)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'description': 'Własności trójkątów równobocznych, prostokątnych, twierdzenie Talesa oraz cechy i skala podobieństwa figur.',
        'lessons': lessons
    }
