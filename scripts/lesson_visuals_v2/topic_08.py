"""
topic_08.py - Dział 1.8: Nierówności kwadratowe (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero redundant SVG wagons.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_plot_diagram
)

def get_topic_08_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L1.8.1: Wyróżnik Delta i miejsca zerowe trójmianu kwadratowego
        tab0 = make_plot_diagram(
            title='Delta (\\Delta) i liczba miejsc zerowych funkcji kwadratowej',
            badge=r'\Delta = b^2 - 4ac,\quad x_{1,2} = \frac{-b \pm \sqrt{\Delta}}{2a}',
            caption='Znak wyróżnika delty decyduje o liczbie przecięć paraboli z osią OX: \\Delta > 0 (dwa miejsca zerowe), \\Delta = 0 (jedno), \\Delta < 0 (brak).',
            curves=[
                {'path': 'M 80 80 Q 200 240 320 80', 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': 'Δ > 0 (2 punkty)'},
                {'path': 'M 240 180 Q 340 180 440 60', 'color': C_PRIMARY, 'strokeWidth': 2, 'label': 'Δ = 0 (1 punkt)'}
            ],
            segments=[
                {'from': [40, 180], 'to': [480, 180], 'color': C_SLATE, 'strokeWidth': 2}
            ],
            points=[
                {'x': 130, 'y': 180, 'color': C_SUCCESS, 'label': 'x₁'},
                {'x': 270, 'y': 180, 'color': C_SUCCESS, 'label': 'x₂'},
                {'x': 340, 'y': 180, 'color': C_PRIMARY, 'label': 'x₀'}
            ],
            metrics=[
                {'label': '$\\Delta > 0$', 'value': 'Dwa pierwiastki $x_1$ i $x_2$', 'color': C_SUCCESS},
                {'label': '$\\Delta = 0$', 'value': 'Jeden pierwiastek podwójny $x_0 = \\frac{-b}{2a}$', 'color': C_PRIMARY},
                {'label': '$\\Delta < 0$', 'value': 'Brak pierwiastków rzeczywistych', 'color': C_DANGER}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 2:
        # L1.8.2: Szkicowanie paraboli i odczytywanie przedziałów rozwiązań
        tab0 = make_plot_diagram(
            title='Szkic paraboli i odczyt stref nierówności (+ oraz -)',
            badge=r'\begin{cases} a > 0 \implies \text{ramiona w górę } (\cup) \\ a < 0 \implies \text{ramiona w dół } (\cap) \end{cases}',
            caption='Kierunek ramion zależy od współczynnika a. Wartości dodatnie (+) leżą NAD osią OX, ujemne (-) POD osią OX.',
            curves=[
                {'path': 'M 60 70 Q 200 250 340 70', 'color': C_PRIMARY, 'strokeWidth': 2.5}
            ],
            segments=[
                {'from': [40, 160], 'to': [440, 160], 'color': C_SLATE, 'strokeWidth': 2}
            ],
            points=[
                {'x': 115, 'y': 160, 'color': C_SUCCESS, 'label': 'x₁'},
                {'x': 285, 'y': 160, 'color': C_SUCCESS, 'label': 'x₂'}
            ],
            labels=[
                {'x': 80, 'y': 120, 'text': '+ (nad osią)', 'color': C_SUCCESS, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 320, 'y': 120, 'text': '+ (nad osią)', 'color': C_SUCCESS, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 200, 'y': 200, 'text': '- (pod osią)', 'color': C_DANGER, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Nierówność $> 0$', 'value': 'Suma przedziałów: $(-\\infty, x_1) \\cup (x_2, +\\infty)$', 'color': C_SUCCESS},
                {'label': 'Nierówność $< 0$', 'value': 'Przedział wewnętrzny: $(x_1, x_2)$', 'color': C_DANGER},
                {'label': 'Znak $\\ge$ lub $\\le$', 'value': 'Nawiasy domknięte $[ ]$ przy liczbach!', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 3:
        # L1.8.3: Nierówności kwadratowe niepełne – bez liczenia delty
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Nierówności kwadratowe niepełne: Błyskawiczna metoda bez delty',
            'formulaBadge': r'x(ax + b) \ge 0 \quad \text{oraz} \quad x^2 - c \ge 0 \implies (x - \sqrt{c})(x + \sqrt{c}) \ge 0',
            'caption': 'Nie trać czasu na deltę, gdy brakuje wyrazu wolnego c lub środkowego b! Zastosuj wyciąganie x lub różnicę kwadratów.',
            'cards': [
                {
                    'badge': 'Przypadek 1: Brak c (c = 0)',
                    'title': 'Wyciągnij x przed nawias',
                    'formula': r'x^2 - 6x \ge 0 \implies x(x - 6) \ge 0',
                    'desc': 'Miejsca zerowe to natychmiast $x_1 = 0$ oraz $x_2 = 6$. Czas rozwiązania: 10 sekund.',
                    'color': C_SKY
                },
                {
                    'badge': 'Przypadek 2: Brak b (b = 0)',
                    'title': 'Różnica kwadratów',
                    'formula': r'x^2 - 9 < 0 \implies (x - 3)(x + 3) < 0',
                    'desc': 'Miejsca zerowe to $x_1 = -3$ oraz $x_2 = 3$. Ramiona w górę, więc rozwiązaniem jest przedział $(-3, 3)$.',
                    'color': C_SUCCESS
                }
            ],
            'metrics': [
                {'label': 'Oszczędność czasu', 'value': 'Zrobione w 20 sekund bez liczenia $\\Delta$', 'color': C_PRIMARY},
                {'label': 'Kardynalna pułapka', 'value': 'Dla $x^2 - 9 < 0$ rozwiązaniem NIE jest $x < 3$!', 'color': C_DANGER},
                {'label': 'Waga w CKE', 'value': 'Zadanie za 2 pkt w każdym arkuszu', 'color': C_SUCCESS}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    elif l_num == 4:
        # L1.8.4: Nierówności kwadratowe z ujemną deltą (Δ < 0)
        tab0 = {
            'type': 'INFOGRAPHIC',
            'title': 'Ujemna delta (Δ < 0): Zbiór pusty vs cały zbiór liczb rzeczywistych',
            'formulaBadge': r'\Delta < 0 \implies \begin{cases} ax^2 + bx + c > 0 \implies x \in \mathbb{R} & (a > 0) \\ ax^2 + bx + c < 0 \implies x \in \emptyset & (a > 0) \end{cases}',
            'caption': 'Gdy delta jest ujemna, parabola NIGDY nie dotyka osi OX! Wisi w całości nad osią (dla a > 0) lub leży w całości pod osią (dla a < 0).',
            'cards': [
                {
                    'badge': 'a > 0 oraz Δ < 0: Cała nad osią',
                    'title': 'Wykres wisi w całości w strefie dodatniej',
                    'formula': r'x^2 + 2x + 5 > 0 \implies x \in \mathbb{R}',
                    'desc': 'Parabola wisi nad osią $OX$. Każdy punkt ma $y > 0$, więc nierówność jest spełniona dla KAŻDEJ liczby rzeczywistej.',
                    'color': C_SUCCESS
                },
                {
                    'badge': 'a > 0 oraz Δ < 0: Sprzeczność',
                    'title': 'Brak punktów pod osią',
                    'formula': r'x^2 + 2x + 5 \le 0 \implies x \in \emptyset',
                    'desc': 'Żaden punkt paraboli nie leży na osi ani pod osią. Nierówność nie ma ani jednego rozwiązania (zbiór pusty $\\emptyset$).',
                    'color': C_DANGER
                }
            ],
            'metrics': [
                {'label': 'Brak miejsc zerowych', 'value': 'Wykres nie przecina osi $OX$', 'color': C_SKY},
                {'label': 'Wynik CKE', 'value': 'ZAWSZE $\\mathbb{R}$ albo zbiór pusty $\\emptyset$', 'color': C_PRIMARY},
                {'label': 'Pułapka maturzysty', 'value': 'Pomyłka: $\\Delta < 0$ to nie zawsze brak rozwiązań!', 'color': C_DANGER}
            ]
        }
        return {'tab0': tab0, 'tab2': None, 'tab3': None}

    return {'tab0': None, 'tab2': None, 'tab3': None}
