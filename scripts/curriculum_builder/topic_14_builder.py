"""
topic_14_builder.py - Dział 14: Trygonometria w Trójkącie Prostokątnym i Wzory Redukcyjne (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento + Autentyczne CKE
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lesson_visuals_v2.topic_14 import get_topic_14_visuals
from .helpers import make_sc_task, make_tf_task, make_numeric_task, make_open_task, make_lesson

def build_topic_14():
    topic_id = 'dzial-14'
    topic_title = 'Trygonometria w Trójkącie Prostokątnym i Wzory Redukcyjne'
    topic_number = 14
    lessons = []

    # =========================================================================
    # Lekcja 14.1: Definicje funkcji trygonometrycznych kąta ostrego
    # =========================================================================
    v1 = get_topic_14_visuals(0)
    l1_tasks = [
        make_sc_task(
            task_id='task-14-1-1',
            source='Matura sierpień 2024 • Zad. 17',
            question=r'W trójkącie prostokątnym $ABC$ sinus kąta $CAB$ jest równy $\frac{3}{5}$, a przeciwprostokątna $AB$ jest o $8$ dłuższa od przyprostokątnej $BC$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Długość przeciwprostokątnej $AB$ tego trójkąta jest równa',
            options_data=[
                ('A', '$18$'),
                ('B', '$20$'),
                ('C', '$24$'),
                ('D', '$25$')
            ],
            correct_id='B',
            explanation=r'Niech $|AB| = c$ oraz $|BC| = a$. Z treści zadania wynika, że przeciwprostokątna $c$ jest o $8$ dłuższa od przyprostokątnej $a$, czyli $a = c - 8$.' + '\n' +
                        r'Z definicji sinusa kąta w trójkącie prostokątnym:' + '\n' +
                        r'$$\sin(\angle CAB) = \frac{a}{c} = \frac{c - 8}{c} = \frac{3}{5}$$' + '\n' +
                        r'Mnożymy równanie na krzyż:' + '\n' +
                        r'$$5(c - 8) = 3c \longrightarrow 5c - 40 = 3c \longrightarrow 2c = 40 \longrightarrow c = 20$$' + '\n' +
                        r'Przeciwprostokątna $|AB| = 20$. Poprawna odpowiedź to B.',
            cke_trap=r'Pamiętaj, że sinus to stosunek boku leżącego NAPRZECIWKO kąta ($BC$) do przeciwprostokątnej ($AB$). Pomylenie przyprostokątnych dałoby błędne równanie.'
        ),
        make_sc_task(
            task_id='task-14-1-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie prostokątnym przyprostokątne mają długości $a = 6$ oraz $b = 8$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Cosinus mniejszego kąta ostrego $\alpha$ w tym trójkącie jest równy',
            options_data=[
                ('A', r'$\frac{3}{5}$'),
                ('B', r'$\frac{4}{5}$'),
                ('C', r'$\frac{3}{4}$'),
                ('D', r'$\frac{4}{3}$'),
            ],
            correct_id='B',
            explanation=r'Z twierdzenia Pitagorasa obliczamy przeciwprostokątną $c$:' + '\n' +
                        r'$$c = \sqrt{a^2 + b^2} = \sqrt{6^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = 10$$' + '\n' +
                        r'Mniejszy kąt ostry $\alpha$ leży naprzeciwko krótszego boku $a = 6$. Zatem przyprostokątna przyległa do kąta $\alpha$ to $b = 8$.' + '\n' +
                        r'Cosinus kąta $\alpha$ to stosunek przyprostokątnej przyległej do przeciwprostokątnej:' + '\n' +
                        r'$$\cos\alpha = \frac{b}{c} = \frac{8}{10} = \frac{4}{5}$$',
            cke_trap=r'Mniejszy kąt leży ZAWSZE naprzeciw krótszego boku. Cosinus to bok PRZY tym kącie, czyli dłuższa przyprostokątna podzielona przez przeciwprostokątną.'
        ),
        make_sc_task(
            task_id='task-14-1-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Dany jest trójkąt prostokątny o kącie ostrym $\alpha$, w którym $\operatorname{tg}\alpha = \frac{5}{12}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Sinus kąta $\alpha$ jest równy',
            options_data=[
                ('A', r'$\frac{5}{13}$'),
                ('B', r'$\frac{12}{13}$'),
                ('C', r'$\frac{5}{17}$'),
                ('D', r'$\frac{13}{12}$'),
            ],
            correct_id='A',
            explanation=r'Skoro $\operatorname{tg}\alpha = \frac{a}{b} = \frac{5}{12}$, możemy przyjąć długości przyprostokątnych $a = 5x$ i $b = 12x$ (dla $x > 0$).' + '\n' +
                        r'Z twierdzenia Pitagorasa wyznaczamy przeciwprostokątną:' + '\n' +
                        r'$$c = \sqrt{(5x)^2 + (12x)^2} = \sqrt{25x^2 + 144x^2} = \sqrt{169x^2} = 13x$$' + '\n' +
                        r'Z definicji sinusa kąta ostrego:' + '\n' +
                        r'$$\sin\alpha = \frac{a}{c} = \frac{5x}{13x} = \frac{5}{13}$$',
            cke_trap=r'Tangens to stosunek przyprostokątnych $\frac{a}{b}$. Nie myl go z sinusem $\frac{a}{c}$, którego mianownik stanowi zawsze przeciwprostokątna.'
        ),
        make_numeric_task(
            task_id='task-14-1-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie prostokątnym przeciwprostokątna ma długość $c = 15$, a sinus jednego z kątów ostrych wynosi $\sin\alpha = 0{,}6$.' + '\n' +
                     r'Oblicz długość przyprostokątnej leżącej naprzeciw kąta $\alpha$. Wpisz wynik w pole poniżej.',
            correct_val='9',
            explanation=r'Z definicji sinusa kąta w trójkącie prostokątnym:' + '\n' +
                        r'$$\sin\alpha = \frac{a}{c} \longrightarrow a = c \cdot \sin\alpha$$' + '\n' +
                        r'Podstawiamy dane liczbowe:' + '\n' +
                        r'$$a = 15 \cdot 0{,}6 = 9$$',
            cke_trap=r'Upewnij się, że mnożysz przeciwprostokątną przez sinus, a nie dzielisz: $a = c \cdot \sin\alpha$.'
        ),
        make_open_task(
            task_id='task-14-1-5',
            source='Informator CKE • Zad. 41',
            question=r'W trójkącie prostokątnym $ABC$ przeciwprostokątna $AB$ ma długość $10$, a cosinus kąta ostrego $CAB$ jest równy $\cos(\angle CAB) = \frac{\sqrt{5}}{5}$.' + '\n' +
                     r'Oblicz pole trójkąta $ABC$. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – obliczenie długości przyprostokątnych trójkąta: $|AC| = 10 \cdot \frac{\sqrt{5}}{5} = 2\sqrt{5}$ oraz $|BC| = \sqrt{10^2 - (2\sqrt{5})^2} = \sqrt{80} = 4\sqrt{5}$.' + '\n' +
                        r'2 pkt – poprawne obliczenie pola trójkąta: $P = \frac{1}{2} \cdot 2\sqrt{5} \cdot 4\sqrt{5} = 20$.',
            explanation=r'Krok 1: Z definicji cosinusa w trójkącie prostokątnym:' + '\n' +
                        r'$$\cos(\angle CAB) = \frac{|AC|}{|AB|} \longrightarrow |AC| = 10 \cdot \frac{\sqrt{5}}{5} = 2\sqrt{5}$$' + '\n' +
                        r'Krok 2: Z twierdzenia Pitagorasa wyznaczamy drugą przyprostokątną $|BC|$:' + '\n' +
                        r'$$|BC| = \sqrt{|AB|^2 - |AC|^2} = \sqrt{100 - 20} = \sqrt{80} = 4\sqrt{5}$$' + '\n' +
                        r'Krok 3: Obliczamy pole trójkąta prostokątnego:' + '\n' +
                        r'$$P = \frac{1}{2} \cdot |AC| \cdot |BC| = \frac{1}{2} \cdot 2\sqrt{5} \cdot 4\sqrt{5} = 20.$$',
            cke_trap=r'Pamiętaj, że przeciwprostokątna to bok $AB = 10$, a przyprostokątna przyległa do kąta to $AC$. Pole to połowa iloczynu przyprostokątnych!'
        )
    ]
    l1 = make_lesson(
        lesson_id='lesson-14-1',
        topic_id=topic_id,
        title='Definicje funkcji trygonometrycznych kąta ostrego',
        concept_essence=(
            "Funkcje trygonometryczne kąta ostrego w trójkącie prostokątnym to stosunki długości odpowiednich boków.\n\n"
            "Sinus to stosunek przyprostokątnej leżącej naprzeciw kąta do przeciwprostokątnej (sinus = naprzeciw / najdłuższy).\n\n"
            "Cosinus to stosunek przyprostokątnej przyległej do kąta do przeciwprostokątnej (cosinus = przy kącie / najdłuższy).\n\n"
            "Tangens to stosunek przyprostokątnej leżącej naprzeciw kąta do przyprostokątnej przyległej (tangens = naprzeciw / przy kącie)."
        ),
        matura_context='Pewniak na maturze podstawowej (1–2 pkt). Zadania sprawdzają definicje boków w trójkącie prostokątnym w połączeniu z twierdzeniem Pitagorasa.',
        core_formulas=[
            {
                'title': 'Definicje funkcji trygonometrycznych',
                'latex': r'\sin\alpha = \frac{a}{c}, \quad \cos\alpha = \frac{b}{c}, \quad \operatorname{tg}\alpha = \frac{a}{b}',
                'description': 'Karta wzorów CKE str. 10 (lub str. 12 dla tożsamości). a - naprzeciw kąta, b - przy kącie, c - przeciwprostokątna.',
                'in_cke_sheet': True,
                'cke_page': 'str. 10'
            }
        ],
        worked_example={
            'problem': r'W trójkącie prostokątnym przyprostokątna naprzeciw kąta $\alpha$ ma długość $3$, a przeciwprostokątna wynosi $5$. Oblicz $\cos\alpha$.',
            'steps': [
                r'Krok 1: Z twierdzenia Pitagorasa obliczamy drugą przyprostokątną: $b = \sqrt{5^2 - 3^2} = \sqrt{25 - 9} = \sqrt{16} = 4$.',
                r'Krok 2: Ze wzoru na cosinus kąta ostrego: $\cos\alpha = \frac{b}{c} = \frac{4}{5}$.'
            ],
            'result': r'\cos\alpha = \frac{4}{5}'
        },
        exam_trap=r'Najczęstszy błąd: mylenie przyprostokątnej naprzeciw kąta z przyprostokątną przyległą. Zawsze wskaż palcem kąt i sprawdź, który bok leży naprzeciwko niego.',
        visuals=v1,
        tasks=l1_tasks,
        key_takeaway=r'W trójkącie prostokątnym sinus to bok naprzeciw kąta do przeciwprostokątnej, cosinus to bok przy kącie do przeciwprostokątnej, a tangens to stosunek przyprostokątnych.'
    )
    lessons.append(l1)

    # =========================================================================
    # Lekcja 14.2: Tabela wartości i tożsamości trygonometryczne
    # =========================================================================
    v2 = get_topic_14_visuals(1)
    l2_tasks = [
        make_sc_task(
            task_id='task-14-2-1',
            source='Matura sierpień 2024 • Zad. 16',
            question=r'Kąt $\alpha$ jest ostry oraz $\cos\alpha = \frac{24}{25}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Tangens kąta $\alpha$ jest równy',
            options_data=[
                ('A', r'$\frac{7}{18}$'),
                ('B', r'$\frac{7}{24}$'),
                ('C', r'$\frac{7}{25}$'),
                ('D', r'$\frac{18}{25}$')
            ],
            correct_id='B',
            explanation=r'Z jedynki trygonometrycznej $\sin^2\alpha + \cos^2\alpha = 1$ obliczamy $\sin\alpha$:' + '\n' +
                        r'$$\sin^2\alpha = 1 - \left(\frac{24}{25}\right)^2 = 1 - \frac{576}{625} = \frac{49}{625}$$' + '\n' +
                        r'Ponieważ kąt $\alpha$ jest ostry, $\sin\alpha > 0$, stąd $\sin\alpha = \frac{7}{25}$.' + '\n' +
                        r'Obliczamy tangens kąta $\alpha$:' + '\n' +
                        r'$$\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha} = \frac{\frac{7}{25}}{\frac{24}{25}} = \frac{7}{24}$$' + '\n' +
                        r'Poprawna odpowiedź to B.',
            cke_trap=r'Nie pomyl tangensa ($\frac{\sin\alpha}{\cos\alpha} = \frac{7}{24}$) z sinusem ($\frac{7}{25}$).'
        ),
        make_sc_task(
            task_id='task-14-2-2',
            source='Matura czerwiec 2024 • Zad. 19',
            question=r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Liczba $1 + \cos^2 27^\circ + \cos^2 63^\circ$ jest równa',
            options_data=[
                ('A', '$2$'),
                ('B', '$1$'),
                ('C', r'$\sqrt{2}$'),
                ('D', '$3$')
            ],
            correct_id='A',
            explanation=r'Zauważmy, że $63^\circ = 90^\circ - 27^\circ$.' + '\n' +
                        r'Ze wzorów redukcyjnych $\cos(90^\circ - \alpha) = \sin\alpha$, stąd $\cos 63^\circ = \sin 27^\circ$.' + '\n' +
                        r'Zatem:' + '\n' +
                        r'$$\cos^2 27^\circ + \cos^2 63^\circ = \cos^2 27^\circ + \sin^2 27^\circ = 1$$' + '\n' +
                        r'Całe wyrażenie wynosi $1 + 1 = 2$. Poprawna odpowiedź to A.',
            cke_trap=r'Suma kątów 27° i 63° to 90°. Zamiana cos 63° na sin 27° pozwala zastosować jedynkę trygonometryczną: sin²α + cos²α = 1.'
        ),
        make_sc_task(
            task_id='task-14-2-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Kąt $\alpha$ jest kątem ostrym i $\sin\alpha = \frac{\sqrt{5}}{3}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Wartość $\cos\alpha$ jest równa',
            options_data=[
                ('A', r'$\frac{2}{3}$'),
                ('B', r'$\frac{4}{9}$'),
                ('C', r'$\frac{\sqrt{2}}{3}$'),
                ('D', r'$\frac{2}{\sqrt{5}}$'),
            ],
            correct_id='A',
            explanation=r'Stosujemy jedynkę trygonometryczną $\sin^2\alpha + \cos^2\alpha = 1$:' + '\n' +
                        r'$$\left(\frac{\sqrt{5}}{3}\right)^2 + \cos^2\alpha = 1 \longrightarrow \frac{5}{9} + \cos^2\alpha = 1$$' + '\n' +
                        r'$$\cos^2\alpha = 1 - \frac{5}{9} = \frac{4}{9}$$' + '\n' +
                        r'Dla kąta ostrego $\cos\alpha > 0$, więc $\cos\alpha = \sqrt{\frac{4}{9}} = \frac{2}{3}$.',
            cke_trap=r'Pamiętaj o spierwiastkowaniu wyniku: $\cos^2\alpha = \frac{4}{9} \longrightarrow \cos\alpha = \frac{2}{3}$.'
        ),
        make_numeric_task(
            task_id='task-14-2-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Oblicz wartość wyrażenia $(\sin 45^\circ + \cos 45^\circ)^2$. Wpisz wynik w pole poniżej.',
            correct_val='2',
            explanation=r'Wartości to $\sin 45^\circ = \frac{\sqrt{2}}{2}$ oraz $\cos 45^\circ = \frac{\sqrt{2}}{2}$.' + '\n' +
                        r'Suma w nawiasie wynosi $\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2} = \sqrt{2}$.' + '\n' +
                        r'Podnosimy do kwadratu: $(\sqrt{2})^2 = 2$.',
            cke_trap=r'Możesz też zastosować wzór skróconego mnożenia: $\sin^2 45^\circ + 2\sin 45^\circ\cos 45^\circ + \cos^2 45^\circ = 1 + 2 \cdot \frac{1}{2} = 2$.'
        ),
        make_open_task(
            task_id='task-14-2-5',
            source='Matura maj 2023 • Zad. 21',
            question=r'Kąt $\alpha$ jest ostry oraz $\sin\alpha + \cos\alpha = \frac{7}{5}$.' + '\n' +
                     r'Oblicz wartość iloczynu $\sin\alpha \cdot \cos\alpha$. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt – podniesienie równości $\sin\alpha + \cos\alpha = \frac{7}{5}$ obustronnie do kwadratu i zastosowanie jedynki trygonometrycznej: $1 + 2\sin\alpha\cos\alpha = \frac{49}{25}$.' + '\n' +
                        r'2 pkt – poprawne wyznaczenie wartości iloczynu: $\sin\alpha\cos\alpha = \frac{12}{25}$.',
            explanation=r'Krok 1: Podnosimy obustronnie do kwadratu podaną sumę:' + '\n' +
                        r'$$(\sin\alpha + \cos\alpha)^2 = \left(\frac{7}{5}\right)^2$$' + '\n' +
                        r'$$\sin^2\alpha + 2\sin\alpha\cos\alpha + \cos^2\alpha = \frac{49}{25}$$' + '\n' +
                        r'Krok 2: Korzystamy z jedynki trygonometrycznej $\sin^2\alpha + \cos^2\alpha = 1$:' + '\n' +
                        r'$$1 + 2\sin\alpha\cos\alpha = \frac{49}{25}$$' + '\n' +
                        r'$$2\sin\alpha\cos\alpha = \frac{49}{25} - 1 = \frac{24}{25}$$' + '\n' +
                        r'$$\sin\alpha\cos\alpha = \frac{12}{25}.$$',
            cke_trap=r'Podnosząc sumę do kwadratu, stosujemy wzór skróconego mnożenia: $(\sin\alpha + \cos\alpha)^2 = \sin^2\alpha + 2\sin\alpha\cos\alpha + \cos^2\alpha$, a NIE $\sin^2\alpha + \cos^2\alpha$!'
        )
    ]
    l2 = make_lesson(
        lesson_id='lesson-14-2',
        topic_id=topic_id,
        title='Tabela wartości i tożsamości trygonometryczne',
        concept_essence=(
            "Tożsamości trygonometryczne to fundamentalne związki między funkcjami tego samego kąta.\n\n"
            "Jedynka trygonometryczna to twierdzenie Pitagorasa zapisane funkcjami: $\\sin^2\\alpha + \\cos^2\\alpha = 1$.\n\n"
            "Tangens kąta to iloraz sinusa przez cosinus: $\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}$.\n\n"
            "Tabela kątów $30^\\circ, 45^\\circ, 60^\\circ$ znajduje się w Karcie Wzorów CKE na stronie 15."
        ),
        matura_context='Pewniak na maturze: wyznaczanie jednej funkcji z drugiej (np. cosinus z danego sinusa) lub redukcja wyrażenia do liczby 1.',
        core_formulas=[
            {
                'title': 'Jedynka trygonometryczna',
                'latex': r'\sin^2\alpha + \cos^2\alpha = 1',
                'description': 'Karta wzorów CKE str. 12. Podstawa tożsamości trygonometrycznych.',
                'in_cke_sheet': True,
                'cke_page': 'str. 12'
            },
            {
                'title': 'Tangens',
                'latex': r'\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}',
                'description': 'Karta wzorów CKE str. 12. Dla kątów, gdzie cosinus jest różny od zera.',
                'in_cke_sheet': True,
                'cke_page': 'str. 12'
            }
        ],
        worked_example={
            'problem': r'Kąt $\alpha$ jest ostry i $\cos\alpha = \frac{3}{5}$. Oblicz $\sin\alpha$ oraz $\operatorname{tg}\alpha$.',
            'steps': [
                r'Krok 1: Z jedynki trygonometrycznej: $\sin^2\alpha = 1 - \cos^2\alpha = 1 - \frac{9}{25} = \frac{16}{25}$.',
                r'Krok 2: Dla kąta ostrego $\sin\alpha > 0$, stąd $\sin\alpha = \frac{4}{5}$.',
                r'Krok 3: Obliczamy tangens: $\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha} = \frac{\frac{4}{5}}{\frac{3}{5}} = \frac{4}{3}$.'
            ],
            'result': r'\sin\alpha = \frac{4}{5}, \quad \operatorname{tg}\alpha = \frac{4}{3}'
        },
        exam_trap=r'Suma bez kwadratów NIE wynosi 1: $\sin\alpha + \cos\alpha \neq 1$. Jedynka dotyczy wyłącznie sumy kwadratów!',
        visuals=v2,
        tasks=l2_tasks,
        key_takeaway=r'Zawsze pamiętaj o jedynce trygonometrycznej: $\sin^2\alpha + \cos^2\alpha = 1$. Znając jedną funkcję kąta ostrego, drugą wyznaczysz natychmiast z jedynki.'
    )
    lessons.append(l2)

    # =========================================================================
    # Lekcja 14.3: Wzory redukcyjne i twierdzenie cosinusów
    # =========================================================================
    v3 = get_topic_14_visuals(2)
    l3_tasks = [
        make_sc_task(
            task_id='task-14-3-1',
            source='Matura sierpień 2024 • Zad. 18',
            question=r'Dany jest trójkąt $ABC$, w którym $|AB| = 5$, $|AC| = 2$ oraz $\cos|\angle BAC| = \frac{3}{5}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Długość boku $BC$ tego trójkąta jest równa',
            options_data=[
                ('A', r'$\sqrt{17}$'),
                ('B', r'$\sqrt{23}$'),
                ('C', r'$\sqrt{35}$'),
                ('D', r'$\sqrt{41}$')
            ],
            correct_id='A',
            explanation=r'Z twierdzenia cosinusów dla boku $BC$:' + '\n' +
                        r'$$|BC|^2 = |AB|^2 + |AC|^2 - 2 \cdot |AB| \cdot |AC| \cdot \cos|\angle BAC|$$' + '\n' +
                        r'Podstawiamy dane:' + '\n' +
                        r'$$|BC|^2 = 5^2 + 2^2 - 2 \cdot 5 \cdot 2 \cdot \frac{3}{5} = 25 + 4 - 12 = 17$$' + '\n' +
                        r'Stąd $|BC| = \sqrt{17}$. Poprawna odpowiedź to A.',
            cke_trap=r'Uważaj na znak minus we wzorze: odejmujemy podwojony iloczyn boków pomnożony przez cosinus kąta.'
        ),
        make_sc_task(
            task_id='task-14-3-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Wartość $\cos 120^\circ$ jest równa',
            options_data=[
                ('A', r'$-\frac{1}{2}$'),
                ('B', r'$\frac{1}{2}$'),
                ('C', r'$-\frac{\sqrt{3}}{2}$'),
                ('D', r'$\frac{\sqrt{3}}{2}$'),
            ],
            correct_id='A',
            explanation=r'Stosujemy wzór redukcyjny dla kąta rozwartego:' + '\n' +
                        r'$$\cos(180^\circ - \alpha) = -\cos\alpha$$' + '\n' +
                        r'Dla $120^\circ = 180^\circ - 60^\circ$:' + '\n' +
                        r'$$\cos 120^\circ = -\cos 60^\circ = -\frac{1}{2}$$',
            cke_trap=r'Cosinus kąta rozwartego (między 90° a 180°) jest ZAWSZE ujemny! Sinus tego samego kąta byłby dodatni: $\sin 120^\circ = \sin 60^\circ = \frac{\sqrt{3}}{2}$.'
        ),
        make_sc_task(
            task_id='task-14-3-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie boki mają długości $a = 4$, $b = 6$, a kąt między nimi wynosi $60^\circ$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Kwadrat długości trzeciego boku $c^2$ jest równy',
            options_data=[
                ('A', '$28$'),
                ('B', '$52$'),
                ('C', '$76$'),
                ('D', '$40$'),
            ],
            correct_id='A',
            explanation=r'Z twierdzenia cosinusów:' + '\n' +
                        r'$$c^2 = a^2 + b^2 - 2ab\cos 60^\circ$$' + '\n' +
                        r'Podstawiamy $\cos 60^\circ = \frac{1}{2}$:' + '\n' +
                        r'$$c^2 = 4^2 + 6^2 - 2 \cdot 4 \cdot 6 \cdot \frac{1}{2} = 16 + 36 - 24 = 28$$',
            cke_trap=r'Pamiętaj, że $\cos 60^\circ = \frac{1}{2}$, co skraca dwójkę z wzoru: $2 \cdot 4 \cdot 6 \cdot \frac{1}{2} = 24$.'
        ),
        make_numeric_task(
            task_id='task-14-3-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie boki mają długości $a = 3$ oraz $b = 8$, a kąt między nimi ma miarę $60^\circ$.' + '\n' +
                     r'Oblicz długość trzeciego boku $c$. Wpisz liczbę całkowitą.',
            correct_val='7',
            explanation=r'Z twierdzenia cosinusów:' + '\n' +
                        r'$$c^2 = a^2 + b^2 - 2ab\cos 60^\circ = 3^2 + 8^2 - 2 \cdot 3 \cdot 8 \cdot \frac{1}{2} = 9 + 64 - 24 = 49$$' + '\n' +
                        r'Ponieważ $c > 0$, długość boku wynosi $c = \sqrt{49} = 7$.',
            cke_trap=r'Pamiętaj, że $\cos 60^\circ = \frac{1}{2}$, co redukuje dwójkę z wzoru: $2 \cdot 3 \cdot 8 \cdot \frac{1}{2} = 24$.'
        ),
        make_open_task(
            task_id='task-14-3-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W trójkącie boki mają długości $a = 3$ oraz $b = 5$, a kąt między nimi ma miarę $120^\circ$. Oblicz długość trzeciego boku $c$. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt - poprawne zastosowanie twierdzenia cosinusów z uwzględnieniem cos(120°) = -1/2.' + '\n' +
                        r'2 pkt - obliczenie c^2 = 49 i podanie ostatecznego wyniku c = 7.',
            explanation=r'Krok 1: Wyznaczamy wartość cosinusa kąta rozwartego:' + '\n' +
                        r'$$\cos 120^\circ = -\cos(180^\circ - 120^\circ) = -\cos 60^\circ = -\frac{1}{2}$$' + '\n' +
                        r'Krok 2: Stosujemy twierdzenie cosinusów:' + '\n' +
                        r'$$c^2 = 3^2 + 5^2 - 2 \cdot 3 \cdot 5 \cdot \left(-\frac{1}{2}\right) = 9 + 25 + 15 = 49$$' + '\n' +
                        r'Krok 3: Ponieważ $c > 0$, mamy $c = \sqrt{49} = 7$.',
            cke_trap=r'Minus z wzoru i minus z cosinusa dają PLUS: $- 2ab(-\frac{1}{2}) = +ab$. Zmiana znaku na plus jest kluczowa!'
        )
    ]
    l3 = make_lesson(
        lesson_id='lesson-14-3',
        topic_id=topic_id,
        title='Wzory redukcyjne i twierdzenie sinusów i cosinusów',
        concept_essence=(
            "Wzory redukcyjne pozwalają zamienić funkcje kąta rozwartego na funkcje kąta ostrego.\n\n"
            "Dla kątów z przedziału $(90^\\circ, 180^\\circ)$: $\\sin(180^\\circ - \\alpha) = \\sin\\alpha$, a $\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$.\n\n"
            "Twierdzenie cosinusów to uogólnienie twierdzenia Pitagorasa na dowolny trójkąt: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$."
        ),
        matura_context='Pewniak CKE: obliczanie brakującego boku z twierdzenia cosinusów w zadaniach zamkniętych lub otwartych za 2 pkt.',
        core_formulas=[
            {
                'title': 'Twierdzenie cosinusów',
                'latex': r'c^2 = a^2 + b^2 - 2ab\cos\gamma',
                'description': 'Karta wzorów CKE str. 12–13 (tabela wartości i wzory redukcyjne).',
                'in_cke_sheet': True,
                'cke_page': 'str. 12–13'
            },
            {
                'title': 'Wzory redukcyjne',
                'latex': r'\sin(180^\circ - \alpha) = \sin\alpha, \quad \cos(180^\circ - \alpha) = -\cos\alpha',
                'description': 'Karta wzorów CKE str. 12–13 (tabela wartości i wzory redukcyjne).',
                'in_cke_sheet': True,
                'cke_page': 'str. 12–13'
            }
        ],
        worked_example={
            'problem': r'W trójkącie boki mają długości $2$ i $4$, a kąt między nimi to $60^\circ$. Oblicz długość trzeciego boku.',
            'steps': [
                r'Krok 1: Twierdzenie cosinusów: $c^2 = 2^2 + 4^2 - 2 \cdot 2 \cdot 4 \cdot \cos 60^\circ$.',
                r'Krok 2: Podstawiamy $\cos 60^\circ = \frac{1}{2}$: $c^2 = 4 + 16 - 8 = 12$.',
                r'Krok 3: Obliczamy bok: $c = \sqrt{12} = 2\sqrt{3}$.'
            ],
            'result': r'c = 2\sqrt{3}'
        },
        exam_trap=r'Dla kątów rozwartych cosinus ma znak MINUS, co zamienia odjemną w sumę: $-2ab(-\cos\alpha) = +2ab\cos\alpha$.',
        visuals=v3,
        tasks=l3_tasks,
        key_takeaway=r'Dla kątów rozwartych $\cos(180^\circ - \alpha) = -\cos\alpha$ (znak ujemny!). W twierdzeniu cosinusów $c^2 = a^2 + b^2 - 2ab\cos\gamma$ minus przed podwojonym iloczynem zamienia się wtedy na plus.'
    )
    lessons.append(l3)

    # =========================================================================
    # Lekcja 14.4: Wzór na pole trójkąta z sinusem kąta
    # =========================================================================
    v4 = get_topic_14_visuals(3)
    l4_tasks = [
        make_sc_task(
            task_id='task-14-4-1',
            source='Matura maj 2023 • Zad. 20',
            question=r'W rombie o boku długości $6\sqrt{2}$ kąt rozwarty ma miarę $150^\circ$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Pole tego rombu jest równe',
            options_data=[
                ('A', '$18\sqrt{2}$'),
                ('B', '$36$'),
                ('C', '$36\sqrt{2}$'),
                ('D', '$72$')
            ],
            correct_id='B',
            explanation=r'Pole rombu o boku $a$ i kącie $\alpha$ wyraża się wzorem:' + '\n' +
                        r'$$P = a^2 \cdot \sin\alpha$$' + '\n' +
                        r'Ze wzoru redukcyjnego: $\sin 150^\circ = \sin(180^\circ - 30^\circ) = \sin 30^\circ = \frac{1}{2}$.' + '\n' +
                        r'Podstawiamy długość boku $a = 6\sqrt{2}$:' + '\n' +
                        r'$$P = (6\sqrt{2})^2 \cdot \frac{1}{2} = (36 \cdot 2) \cdot \frac{1}{2} = 72 \cdot \frac{1}{2} = 36$$' + '\n' +
                        r'Poprawna odpowiedź to B.',
            cke_trap=r'W rombie nie dzielimy przez 2 (to nie jest trójkąt!). Romb to dwa złączone trójkąty: $P = a^2\sin\alpha$.'
        ),
        make_sc_task(
            task_id='task-14-4-2',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Boki trójkąta mają długości $8$ i $10$, a kąt zawarty między nimi ma miarę $30^\circ$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Pole tego trójkąta wynosi',
            options_data=[
                ('A', '$20$'),
                ('B', '$40$'),
                ('C', r'$20\sqrt{3}$'),
                ('D', r'$40\sqrt{3}$'),
            ],
            correct_id='A',
            explanation=r'Zastosujmy wzór na pole trójkąta z sinusem kąta:' + '\n' +
                        r'$$P = \frac{1}{2}ab\sin\gamma$$' + '\n' +
                        r'Podstawiamy $a = 8, b = 10$ oraz $\sin 30^\circ = \frac{1}{2}$:' + '\n' +
                        r'$$P = \frac{1}{2} \cdot 8 \cdot 10 \cdot \frac{1}{2} = 40 \cdot \frac{1}{2} = 20$$',
            cke_trap=r'Pamiętaj o współczynniku 1/2 z przodu wzoru na pole trójkąta. Pominięcie 1/2 daje pole równoległoboku (40).'
        ),
        make_sc_task(
            task_id='task-14-4-3',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Pole trójkąta o bokach $6$ i $8$ wynosi $12\sqrt{3}$.' + '\n' +
                     r'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.' + '\n' +
                     r'Kąt ostry $\gamma$ zawarty między tymi bokami ma miarę',
            options_data=[
                ('A', '$30^\circ$'),
                ('B', '$45^\circ$'),
                ('C', '$60^\circ$'),
                ('D', '$75^\circ$'),
            ],
            correct_id='C',
            explanation=r'Podstawiamy dane do wzoru na pole trójkąta:' + '\n' +
                        r'$$P = \frac{1}{2} \cdot 6 \cdot 8 \cdot \sin\gamma = 24\sin\gamma$$' + '\n' +
                        r'Przyrównujemy do podanego pola:' + '\n' +
                        r'$$24\sin\gamma = 12\sqrt{3} \longrightarrow \sin\gamma = \frac{12\sqrt{3}}{24} = \frac{\sqrt{3}}{2}$$' + '\n' +
                        r'Dla kąta ostrego $\sin\gamma = \frac{\sqrt{3}}{2} \longrightarrow \gamma = 60^\circ$.',
            cke_trap=r'Pamiętaj, że $\sin 60^\circ = \frac{\sqrt{3}}{2}$. Nie myl go z $\sin 30^\circ = \frac{1}{2}$.'
        ),
        make_numeric_task(
            task_id='task-14-4-4',
            source='Trening JASNE • Wzorzec CKE',
            question=r'Boki trójkąta mają długości $8$ i $10$, a kąt zawarty między nimi ma miarę $30^\circ$.' + '\n' +
                     r'Oblicz pole tego trójkąta. Wpisz samą liczbę całkowitą.',
            correct_val='20',
            explanation=r'Stosujemy wzór na pole trójkąta z sinusem kąta:' + '\n' +
                        r'$$P = \frac{1}{2}ab\sin 30^\circ = \frac{1}{2} \cdot 8 \cdot 10 \cdot \frac{1}{2} = 40 \cdot \frac{1}{2} = 20.$$',
            cke_trap=r'Pamiętaj o współczynniku $\frac{1}{2}$ z przodu wzoru na pole trójkąta. Pominięcie $\frac{1}{2}$ daje pole równoległoboku (40).'
        ),
        make_open_task(
            task_id='task-14-4-5',
            source='Trening JASNE • Wzorzec CKE',
            question=r'W równoległoboku o bokach długości $4\sqrt{3}$ i $6$ kąt ostry ma miarę $60^\circ$. Oblicz pole tego równoległoboku. Zapisz obliczenia.',
            points=2,
            scoring_key=r'1 pkt - zastosowanie wzoru na pole równoległoboku P = a · b · sin(60°).' + '\n' +
                        r'2 pkt - poprawne obliczenie P = 4√3 · 6 · (√3 / 2) = 36.',
            explanation=r'Krok 1: Wzór na pole równoległoboku o bokach $a, b$ i kącie $\alpha$ między nimi:' + '\n' +
                        r'$$P = a \cdot b \cdot \sin\alpha$$' + '\n' +
                        r'Krok 2: Podstawiamy dane: $a = 4\sqrt{3}, b = 6$ oraz $\sin 60^\circ = \frac{\sqrt{3}}{2}$:' + '\n' +
                        r'$$P = 4\sqrt{3} \cdot 6 \cdot \frac{\sqrt{3}}{2} = 24 \cdot \frac{3}{2} = 36$$',
            cke_trap=r'W równoległoboku wzór nie zawiera ułamka 1/2! Ułamek 1/2 występuje wyłącznie w polu trójkąta.'
        )
    ]
    l4 = make_lesson(
        lesson_id='lesson-14-4',
        topic_id=topic_id,
        title='Wzór na pole trójkąta z sinusem kąta',
        concept_essence=(
            "Wzór na pole trójkąta z sinusem pozwala obliczyć pole bez znajomości wysokości.\n\n"
            "Wystarczy znać dwa boki i kąt między nimi: $P = \\frac{1}{2}ab\\sin\\gamma$.\n\n"
            "Dla równoległoboku i rombu wzór ten podwaja się: $P = ab\\sin\\alpha$ (dla rombu $P = a^2\\sin\\alpha$)."
        ),
        matura_context='Żelazny pewniak CKE za 1–2 pkt. Zadanie pojawia się niemal w każdym arkuszu maturalnym w kontekście trójkątów lub rombów.',
        core_formulas=[
            {
                'title': 'Pole trójkąta z sinusem',
                'latex': r'P = \frac{1}{2}ab\sin\gamma',
                'description': 'Karta wzorów CKE str. 15 (pole trójkąta z sinusem).',
                'in_cke_sheet': True,
                'cke_page': 'str. 15'
            },
            {
                'title': 'Pole równoległoboku',
                'latex': r'P = ab\sin\alpha',
                'description': 'Karta wzorów CKE str. 19–20 (pole równoległoboku i rombu).',
                'in_cke_sheet': True,
                'cke_page': 'str. 19–20'
            }
        ],
        worked_example={
            'problem': r'Oblicz pole trójkąta o bokach długości $4$ i $5$, w którym kąt między tymi bokami wynosi $30^\circ$.',
            'steps': [
                r'Krok 1: Zapisujemy wzór na pole: $P = \frac{1}{2}ab\sin\gamma$.',
                r'Krok 2: Podstawiamy dane: $P = \frac{1}{2} \cdot 4 \cdot 5 \cdot \sin 30^\circ = 10 \cdot \frac{1}{2} = 5$.'
            ],
            'result': r'P = 5'
        },
        exam_trap=r'Nie zapomnij o 1/2 przy trójkącie! Z kolei przy rombie i równoległoboku 1/2 nie występuje.',
        visuals=v4,
        tasks=l4_tasks,
        key_takeaway=r'Wzór na pole z sinusem $P = \frac{1}{2}ab\sin\gamma$ wymaga ZAWSZE kąta zawartego MIĘDZY bokami $a$ i $b$. To najszybszy sposób na pole trójkąta na maturze.'
    )
    lessons.append(l4)

    return {
        'id': topic_id,
        'title': topic_title,
        'topic_number': topic_number,
        'description': 'Definicje funkcji trygonometrycznych, tożsamości, wzory redukcyjne, twierdzenie cosinusów oraz wzory na pole z sinusem kąta.',
        'lessons': lessons
    }
