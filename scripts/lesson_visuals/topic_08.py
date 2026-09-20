"""
topic_08.py - Dział 8: Trygonometria (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_number_line, make_geometry_diagram, make_plot_diagram
)

def get_topic_08_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Definicje sin, cos, tg w trójkącie prostokątnym
        tab0 = make_geometry_diagram(
            'Definicje $\\sin \\alpha, \\cos \\alpha, \\operatorname{tg} \\alpha$ w trójkącie prostokątnym',
            '\\sin \\alpha = \\frac{a}{c},\\quad \\cos \\alpha = \\frac{b}{c},\\quad \\operatorname{tg} \\alpha = \\frac{a}{b}',
            'Wszystko zależy od położenia boków względem kąta $\\alpha$: $a$ (naprzeciwko), $b$ (przy kącie), $c$ (przeciwprostokątna).',
            polygons=[{'points': [[120, 220], [380, 220], [120, 70]], 'fill': 'rgba(255, 184, 0, 0.08)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5}],
            segments=[
                {'from': [120, 220], 'to': [120, 70], 'color': C_DANGER, 'strokeWidth': 3, 'label': 'a (naprzeciw)'},
                {'from': [120, 220], 'to': [380, 220], 'color': C_SKY, 'strokeWidth': 3, 'label': 'b (przy kącie)'},
                {'from': [120, 70], 'to': [380, 220], 'color': C_SUCCESS, 'strokeWidth': 3.5, 'label': 'c (przeciwprostokątna)'}
            ],
            arcs=[
                {'cx': 380, 'cy': 220, 'r': 40, 'startAngleDeg': 150, 'endAngleDeg': 180, 'color': C_PRIMARY, 'label': 'α'},
                {'cx': 120, 'cy': 220, 'r': 20, 'startAngleDeg': 270, 'endAngleDeg': 360, 'color': C_SLATE, 'showRightAngleDot': True}
            ],
            metrics=[
                {'label': 'Sinus', 'value': '$\\frac{\\text{naprzeciw}}{\\text{przeciwprostokątna}}$', 'color': C_DANGER},
                {'label': 'Cosinus', 'value': '$\\frac{\\text{przyległa}}{\\text{przeciwprostokątna}}$', 'color': C_SKY},
                {'label': 'Tangens', 'value': '$\\frac{\\text{naprzeciw}}{\\text{przyległa}}$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Sinus', 'sin α = a/c', 'Stosunek boków.', labels=[{'x': 260, 'y': 130, 'text': 'sin α = a / c', 'color': C_DANGER, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: a=3, b=4, c=5', 'sin α = 3/5, cos α = 4/5, tg α = 3/4', 'Trójkąt egipski.', labels=[{'x': 260, 'y': 130, 'text': 'sin α = 0.6, cos α = 0.8, tg α = 0.75', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Kąt beta u góry!', 'Dla drugiego kąta role przyprostokątnych się zamieniają!', 'Dla kąta β: naprzeciwko leży bok b, więc sin β = b/c!', labels=[{'x': 260, 'y': 130, 'text': 'Zawsze patrz, który bok leży naprzeciw danego kąta!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 2:
        # Wartości dla kątów 30, 45, 60 stopni
        tab0 = make_geometry_diagram(
            'Kąty szczególne $30^\\circ, 45^\\circ, 60^\\circ$: Trójkąty wzorcowe',
            '\\text{Połowa kwadratu } (45^\\circ) \\text{ oraz połowa trójkąta równobocznego } (30^\\circ, 60^\\circ)',
            'Wszystkie wartości trygonometryczne dla tych kątów wynikają bezpośrednio z twierdzenia Pitagorasa.',
            polygons=[
                # Połówka równobocznego
                {'points': [[80, 220], [220, 220], [80, 60]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY, 'strokeWidth': 2},
                # Połówka kwadratu
                {'points': [[300, 220], [440, 220], [300, 80]], 'fill': 'rgba(16, 185, 129, 0.1)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 150, 'y': 240, 'text': '30°-60°-90° (a, a√3, 2a)', 'color': C_SKY, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 370, 'y': 240, 'text': '45°-45°-90° (a, a, a√2)', 'color': C_SUCCESS, 'fontSize': 14, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'sin 30° = cos 60°', 'value': '$1/2$', 'color': C_SKY},
                {'label': 'sin 45° = cos 45°', 'value': '$\\sqrt{2}/2$', 'color': C_SUCCESS},
                {'label': 'sin 60° = cos 30°', 'value': '$\\sqrt{3}/2$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Tabela wartości', '30°, 45°, 60°', 'Karta CKE.', labels=[{'x': 260, 'y': 130, 'text': 'Wartości wprost z oficjalnej karty wzorów CKE', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'sin 30° + cos 60°', '1/2 + 1/2 = 1', labels=[{'x': 260, 'y': 130, 'text': '1/2 + 1/2 = 1', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Zamiana sin 30° z cos 30°', 'sin 30° to 1/2, a cos 30° to √3/2!', 'Nie myl wartości dla 30° i 60°!', labels=[{'x': 260, 'y': 130, 'text': 'sin 30° = 1/2 (najmniejszy sinus z tabeli)', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 3:
        # Jedynka trygonometryczna: sin^2 a + cos^2 a = 1
        tab0 = make_geometry_diagram(
            'Jedynka trygonometryczna: $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$',
            '\\sin^2 \\alpha + \\cos^2 \\alpha = 1',
            'To po prostu twierdzenie Pitagorasa $a^2 + b^2 = c^2$ podzielone obustronnie przez przeciwprostokątną $c^2$.',
            circles=[{'cx': 260, 'cy': 150, 'r': 90, 'fill': 'rgba(255, 184, 0, 0.05)', 'stroke': C_PRIMARY, 'strokeWidth': 2}],
            segments=[
                {'from': [150, 150], 'to': [370, 150], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [260, 240], 'to': [260, 60], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [260, 150], 'to': [330, 90], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'r = 1'},
                {'from': [330, 150], 'to': [330, 90], 'color': C_DANGER, 'strokeWidth': 2.5, 'label': 'sin α'},
                {'from': [260, 150], 'to': [330, 150], 'color': C_SKY, 'strokeWidth': 2.5, 'label': 'cos α'}
            ],
            metrics=[
                {'label': 'Wyznaczanie cosinusa', 'value': '$\\cos^2 \\alpha = 1 - \\sin^2 \\alpha$', 'color': C_SKY},
                {'label': 'Wyznaczanie sinusa', 'value': '$\\sin^2 \\alpha = 1 - \\cos^2 \\alpha$', 'color': C_DANGER},
                {'label': 'Kąt ostry', 'value': '$\\sin \\alpha > 0,\\; \\cos \\alpha > 0$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'sin² α + cos² α = 1', 'Zawsze równe 1.', labels=[{'x': 260, 'y': 130, 'text': 'sin² α + cos² α = 1', 'color': C_PRIMARY, 'fontSize': 22, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: sin α = 3/5', 'cos² α = 1 - 9/25 = 16/25', 'cos α = 4/5', labels=[{'x': 260, 'y': 130, 'text': 'cos α = √(16/25) = 4/5', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Znak cosinusa dla kąta rozwartego', 'Dla kąta rozwartego cos α < 0!', 'Jeśli α ∈ (90°, 180°), to cosinus jest UJEMNY: cos α = -4/5!', labels=[{'x': 260, 'y': 130, 'text': 'Kąt rozwarty ⟹ cos α < 0!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (4, 5):
        # Związek tangensa z sinusem/cosinusem i kąty dopełniające
        tab0 = make_geometry_diagram(
            'Związki między funkcjami: $\\operatorname{tg} \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha},\\; \\sin(90^\\circ - \\alpha) = \\cos \\alpha$',
            '\\operatorname{tg} \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha},\\quad \\sin(90^\\circ - \\alpha) = \\cos \\alpha',
            'Sinus kąta ostrego w trójkącie prostokątnym jest równy cosinusowi drugiego kąta ostrego.',
            polygons=[{'points': [[140, 200], [360, 200], [140, 90]], 'fill': 'rgba(56, 189, 248, 0.08)', 'stroke': C_SKY, 'strokeWidth': 2}],
            arcs=[
                {'cx': 360, 'cy': 200, 'r': 35, 'startAngleDeg': 150, 'endAngleDeg': 180, 'color': C_PRIMARY, 'label': 'α'},
                {'cx': 140, 'cy': 90, 'r': 35, 'startAngleDeg': 60, 'endAngleDeg': 90, 'color': C_SUCCESS, 'label': '90°-α'}
            ],
            metrics=[
                {'label': 'Tangens', 'value': '$\\operatorname{tg} \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}$', 'color': C_PRIMARY},
                {'label': 'Kąty dopełniające', 'value': '$\\sin 20^\\circ = \\cos 70^\\circ$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'tg α = sin α / cos α', 'Iloraz.', labels=[{'x': 260, 'y': 130, 'text': 'tg α = sin α / cos α', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'sin α = 3/5, cos α = 4/5', 'tg α = (3/5) / (4/5) = 3/4', labels=[{'x': 260, 'y': 130, 'text': 'tg α = 3/4', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Dzielenie przez cos α', 'cos α ≠ 0', 'Tangens dla 90° nie istnieje!', labels=[{'x': 260, 'y': 130, 'text': 'Dla α = 90° tangens nie istnieje!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (6, 7):
        # Wzory redukcyjne dla kątów rozwartych (180 - a) i układ Oxy
        tab0 = make_plot_diagram(
            'Trygonometria kąta rozwartego $\\alpha \\in (90^\\circ, 180^\\circ)$ w II ćwiartce',
            '\\sin(180^\\circ - \\alpha) = \\sin \\alpha,\\quad \\cos(180^\\circ - \\alpha) = -\\cos \\alpha,\\quad \\operatorname{tg}(180^\\circ - \\alpha) = -\\operatorname{tg} \\alpha',
            'W II ćwiartce tylko sinus jest dodatni! Cosinus i tangens kąta rozwartego są ZAWSZE ujemne.',
            segments=[
                {'from': [40, 150], 'to': [480, 150], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [250, 240], 'to': [250, 40], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Ramię kąta rozwartego
                {'from': [250, 150], 'to': [130, 60], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'ramię kąta α'}
            ],
            arcs=[{'cx': 250, 'cy': 150, 'r': 45, 'startAngleDeg': 145, 'endAngleDeg': 180, 'color': C_PRIMARY, 'label': 'α > 90°'}],
            metrics=[
                {'label': 'Sinus w II ćwiartce', 'value': '$\\sin(120^\\circ) = \\sin(60^\\circ) = \\frac{\\sqrt{3}}{2} > 0$', 'color': C_SUCCESS},
                {'label': 'Cosinus w II ćwiartce', 'value': '$\\cos(120^\\circ) = -\\cos(60^\\circ) = -\\frac{1}{2} < 0$', 'color': C_DANGER},
                {'label': 'Wierszyk znaków', 'value': 'W pierwszej wszystkie, w drugiej tylko sinus...', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzory redukcyjne', '180° - α', 'II ćwiartka.', labels=[{'x': 260, 'y': 130, 'text': 'sin(180°-α) = sin α, cos(180°-α) = -cos α', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'sin 150° i cos 150°', 'sin 150° = 1/2, cos 150° = -√3/2', labels=[{'x': 260, 'y': 130, 'text': 'sin 150° = 1/2, cos 150° = -√3/2', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Zgubiony minus w cosinusie', 'cos 120° = -1/2, a NIE +1/2!', 'Cosinus kąta rozwartego w trójkącie ZAWSZE ma znak minus!', labels=[{'x': 260, 'y': 130, 'text': 'Pamiętaj o minusie dla cosinusa i tangensa w II ćwiartce!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 8:
        # Pole trójkąta z sinusem: P = 1/2 a b sin gamma
        tab0 = make_geometry_diagram(
            'Pole trójkąta z sinusem kąta między bokami',
            'P = \\frac{1}{2} a b \\sin \\gamma',
            'Wystarczą dwa dowolne boki i kąt MIĘDZY NIMI. Nie potrzebujesz szukać wysokości $h$!',
            polygons=[{'points': [[100, 200], [420, 200], [200, 70]], 'fill': 'rgba(255, 184, 0, 0.08)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5}],
            segments=[
                {'from': [100, 200], 'to': [200, 70], 'color': C_SKY, 'strokeWidth': 3, 'label': 'bok a'},
                {'from': [100, 200], 'to': [420, 200], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'bok b'}
            ],
            arcs=[{'cx': 100, 'cy': 200, 'r': 40, 'startAngleDeg': 310, 'endAngleDeg': 360, 'color': C_PRIMARY, 'label': 'γ'}],
            metrics=[
                {'label': 'Wzór na pole', 'value': '$P = \\frac{1}{2}ab\\sin\\gamma$', 'color': C_PRIMARY},
                {'label': 'Romb i równoległobok', 'value': '$P = ab\\sin\\gamma$ (bez 1/2!)', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'P = 1/2 · a · b · sin γ', 'Pole z kątem.', labels=[{'x': 260, 'y': 130, 'text': 'P = 1/2 · a · b · sin γ', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: a=6, b=8, γ=30°', 'P = 1/2 · 6 · 8 · 1/2 = 12', 'Szybkie pole.', labels=[{'x': 260, 'y': 130, 'text': 'P = 24 · 0.5 = 12', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Kąt musi być MIĘDZY bokami', 'Nie dowolny kąt!', 'Wzór działa TYLKO dla kąta leżącego bezpośrednio między bokami a i b!', labels=[{'x': 260, 'y': 130, 'text': 'Kąt musi być zawarty między tymi dwoma bokami!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 9:
        # Twierdzenie sinusów: a/sin alfa = 2R
        tab0 = make_geometry_diagram(
            'Twierdzenie sinusów: Związek boku, kąta i promienia okręgu opisanego $R$',
            '\\frac{a}{\\sin \\alpha} = \\frac{b}{\\sin \\beta} = \\frac{c}{\\sin \\gamma} = 2R',
            'Iloraz dowolnego boku przez sinus kąta leżącego naprzeciwko niego jest stały i równy średnicy okręgu opisanego $2R$.',
            circles=[{'cx': 260, 'cy': 150, 'r': 95, 'fill': 'rgba(56, 189, 248, 0.05)', 'stroke': C_SKY, 'strokeWidth': 2}],
            polygons=[{'points': [[180, 210], [350, 190], [240, 58]], 'fill': 'rgba(255, 184, 0, 0.08)', 'stroke': C_PRIMARY, 'strokeWidth': 2}],
            segments=[
                {'from': [180, 210], 'to': [350, 190], 'color': C_DANGER, 'strokeWidth': 3, 'label': 'bok a'},
                {'from': [260, 150], 'to': [350, 190], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True, 'label': 'R'}
            ],
            arcs=[{'cx': 240, 'cy': 58, 'r': 30, 'startAngleDeg': 45, 'endAngleDeg': 115, 'color': C_PRIMARY, 'label': 'α'}],
            metrics=[
                {'label': 'Wzór', 'value': '$\\frac{a}{\\sin\\alpha} = 2R$', 'color': C_PRIMARY},
                {'label': 'Promień R', 'value': '$R = \\frac{a}{2\\sin\\alpha}$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór sinusów', 'a / sin α = 2R', 'Twierdzenie sinusów.', labels=[{'x': 260, 'y': 130, 'text': 'a / sin α = 2R', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'a = 10, α = 30° ⟹ 2R', '2R = 10 / (1/2) = 20 ⟹ R = 10', labels=[{'x': 260, 'y': 130, 'text': 'Średnica 2R = 20, promień R = 10', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: 2R a nie R!', 'Wynik ilorazu to 2R!', 'Częsty błąd: podanie 2R jako promienia zamiast podzielenia przez 2!', labels=[{'x': 260, 'y': 130, 'text': 'Pamiętaj: a / sin α = 2R, więc R to POŁOWA tego wyniku!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 10:
        # Twierdzenie cosinusów (Carnota): c^2 = a^2 + b^2 - 2ab cos gamma
        tab0 = make_geometry_diagram(
            'Twierdzenie cosinusów: Uogólnione twierdzenie Pitagorasa',
            'c^2 = a^2 + b^2 - 2ab \\cos \\gamma',
            'Działa w KAŻDYM trójkącie! Gdy $\\gamma = 90^\\circ$, $\\cos 90^\\circ = 0$ i wzór zamienia się w zwykłe $a^2 + b^2 = c^2$.',
            polygons=[{'points': [[100, 200], [420, 200], [220, 70]], 'fill': 'rgba(255, 184, 0, 0.08)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5}],
            segments=[
                {'from': [100, 200], 'to': [220, 70], 'color': C_SKY, 'strokeWidth': 3, 'label': 'a'},
                {'from': [100, 200], 'to': [420, 200], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'b'},
                {'from': [220, 70], 'to': [420, 200], 'color': C_DANGER, 'strokeWidth': 3.5, 'label': 'c (szukany)'}
            ],
            arcs=[{'cx': 100, 'cy': 200, 'r': 40, 'startAngleDeg': 315, 'endAngleDeg': 360, 'color': C_PRIMARY, 'label': 'γ'}],
            metrics=[
                {'label': 'Wzór Carnota', 'value': '$c^2 = a^2 + b^2 - 2ab\\cos\\gamma$', 'color': C_PRIMARY},
                {'label': 'Kąt rozwarty', 'value': '$\\cos\\gamma < 0 \\implies$ składnik staje się DODATNI ($+2ab|\\cos\\gamma|$)', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór cosinusów', 'c² = a² + b² - 2ab cos γ', 'Wzór Carnota.', labels=[{'x': 260, 'y': 130, 'text': 'c² = a² + b² - 2ab cos γ', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: a=4, b=5, γ=60°', 'c² = 16 + 25 - 2(4)(5)(1/2) = 21', 'c = √21', labels=[{'x': 260, 'y': 130, 'text': 'c² = 41 - 20 = 21 ⟹ c = √21', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Kąt rozwarty 120°', 'cos 120° = -1/2 (dwa minusy dają plus!)', 'Dla kąta rozwartego odejmowanie zamienia się w dodawanie: -2ab(-1/2) = +ab!', labels=[{'x': 260, 'y': 130, 'text': 'Minus z wzoru i minus z cosinusa dają PLUS!', 'color': C_SUCCESS, 'fontSize': 15, 'anchor': 'middle'}])

    else:
        # l_num in (11, 12, 13, 14, 15): Zadania w figurach, tożsamości, kąt wzniesienia/depresji
        tab0 = make_geometry_diagram(
            'Kąt wzniesienia i kąt depresji w zadaniach praktycznych',
            '\\text{Kąt wzniesienia (w górę)},\\quad \\text{Kąt depresji (w dół od poziomu wzroku)}',
            'Kąt depresji z wierzchołka wieży jest RÓWNY kątowi wzniesienia z poziomu gruntu (kąty naprzemianległe!).',
            segments=[
                {'from': [100, 220], 'to': [440, 220], 'color': C_SLATE, 'strokeWidth': 2, 'label': 'poziom gruntu'},
                # Wieża
                {'from': [100, 220], 'to': [100, 60], 'color': C_PRIMARY, 'strokeWidth': 4, 'label': 'wieża h'},
                # Poziom wzroku u góry
                {'from': [100, 60], 'to': [300, 60], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True, 'label': 'poziom wzroku'},
                # Linia wzroku
                {'from': [100, 60], 'to': [380, 220], 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': 'linia widzenia'}
            ],
            arcs=[
                {'cx': 380, 'cy': 220, 'r': 40, 'startAngleDeg': 155, 'endAngleDeg': 180, 'color': C_PRIMARY, 'label': 'α (wzniesienie)'},
                {'cx': 100, 'cy': 60, 'r': 40, 'startAngleDeg': 0, 'endAngleDeg': 30, 'color': C_PRIMARY, 'label': 'α (depresja)'}
            ],
            metrics=[
                {'label': 'Wysokość h', 'value': '$h = d \\cdot \\operatorname{tg}\\alpha$', 'color': C_PRIMARY},
                {'label': 'Kąty równe', 'value': 'Wzniesienie = Depresja (naprzemianległe)', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Zadania praktyczne', 'h = d · tg α', 'Modelowanie.', labels=[{'x': 260, 'y': 130, 'text': 'tg α = wysokość / odległość', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'd = 50 m, α = 30°', 'h = 50 · √3/3 ≈ 28.87 m', labels=[{'x': 260, 'y': 130, 'text': 'Wysokość obiektu wynosi 50√3/3 m', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Kąt do pionu!', 'Kąt wzniesienia liczymy od POZIOMU!', 'Nie mierz kąta od pionowej ściany wieży – zawsze od linii poziomej!', labels=[{'x': 260, 'y': 130, 'text': 'Kąt ZAWSZE przylega do linii poziomej!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
