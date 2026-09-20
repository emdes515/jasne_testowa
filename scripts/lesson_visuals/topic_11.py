"""
topic_11.py - Dział 11: Stereometria (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram, make_stereometry_diagram
)

def get_topic_11_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Prostopadłościan i sześcian: Przekątna bryły D = sqrt(a^2 + b^2 + c^2)
        tab0 = make_stereometry_diagram(
            'Prostopadłościan: Przekątna bryły $D = \\sqrt{a^2 + b^2 + c^2}$',
            'D = \\sqrt{a^2 + b^2 + c^2},\\quad V = abc,\\quad P_c = 2(ab + bc + ac)',
            'Przekątna bryły $D$ łączy dwa przeciwległe wierzchołki w przestrzeni 3D. Obliczamy ją z podwójnego twierdzenia Pitagorasa.',
            segments=[
                # Podstawa dolna ABCD
                {'from': [140, 200], 'to': [320, 200], 'color': C_PRIMARY, 'strokeWidth': 2, 'label': 'a'},
                {'from': [320, 200], 'to': [390, 150], 'color': C_SKY, 'strokeWidth': 2, 'label': 'b'},
                {'from': [140, 200], 'to': [210, 150], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [210, 150], 'to': [390, 150], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True},
                # Krawędzie pionowe
                {'from': [140, 200], 'to': [140, 90], 'color': C_SUCCESS, 'strokeWidth': 2, 'label': 'c (H)'},
                {'from': [320, 200], 'to': [320, 90], 'color': C_SUCCESS, 'strokeWidth': 2},
                {'from': [390, 150], 'to': [390, 40], 'color': C_SUCCESS, 'strokeWidth': 2},
                {'from': [210, 150], 'to': [210, 40], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True},
                # Podstawa górna
                {'from': [140, 90], 'to': [320, 90], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [320, 90], 'to': [390, 40], 'color': C_SKY, 'strokeWidth': 2},
                {'from': [390, 40], 'to': [210, 40], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [210, 40], 'to': [140, 90], 'color': C_SKY, 'strokeWidth': 2},
                # Przekątna bryły D
                {'from': [140, 200], 'to': [390, 40], 'color': C_DANGER, 'strokeWidth': 3, 'label': 'Przekątna D'},
                # Przekątna podstawy d
                {'from': [140, 200], 'to': [390, 150], 'color': C_SKY, 'strokeWidth': 1.5, 'dashed': True, 'label': 'd = √(a²+b²)'}
            ],
            points=[
                {'x': 140, 'y': 200, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'A'},
                {'x': 390, 'y': 40, 'dot': 'filled', 'color': C_DANGER, 'label': 'C\''}
            ],
            metrics=[
                {'label': 'Przekątna podstawy', 'value': '$d = \\sqrt{a^2 + b^2}$', 'color': C_SKY},
                {'label': 'Przekątna bryły', 'value': '$D = \\sqrt{d^2 + c^2} = \\sqrt{a^2 + b^2 + c^2}$', 'color': C_DANGER},
                {'label': 'Sześcian (a=b=c)', 'value': '$D = a\\sqrt{3}$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór D', 'D = √(a² + b² + c²)', 'Karta CKE.', labels=[{'x': 260, 'y': 130, 'text': 'D = √(a² + b² + c²)', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: a=3, b=4, c=12', 'D = √(9 + 16 + 144) = √169 = 13', 'Krok po kroku.', labels=[{'x': 260, 'y': 130, 'text': 'D = 13', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Sześcian a√3', 'D = a√3 a NIE a√2!', 'Przekątna ściany (kwadratu) to a√2, a przekątna BRYŁY (sześcianu) to a√3!', labels=[{'x': 260, 'y': 130, 'text': 'Ściana: d = a√2 | Bryła: D = a√3!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (2, 3):
        # Graniastosłupy prawidłowe: trójkątny i sześciokątny (przekątne podstawy)
        tab0 = make_stereometry_diagram(
            'Graniastosłup prawidłowy sześciokątny: Dwie przekątne podstawy',
            'd_1 = 2a \\text{ (dłuższa)},\\quad d_2 = a\\sqrt{3} \\text{ (krótsza)},\\quad P_p = 6 \\cdot \\frac{a^2\\sqrt{3}}{4}',
            'Podstawa składa się z 6 trójkątów równobocznych. Dłuższa przekątna podstawy ma długość $2a$, a krótsza $a\\sqrt{3}$.',
            segments=[
                # Podstawa sześciokątna
                {'from': [180, 210], 'to': [300, 210], 'color': C_PRIMARY, 'strokeWidth': 2, 'label': 'a'},
                {'from': [300, 210], 'to': [370, 175], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [370, 175], 'to': [320, 140], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [320, 140], 'to': [200, 140], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [200, 140], 'to': [130, 175], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [130, 175], 'to': [180, 210], 'color': C_PRIMARY, 'strokeWidth': 2},
                # Dłuższa przekątna podstawy
                {'from': [130, 175], 'to': [370, 175], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True, 'label': 'd_długa = 2a'},
                # Wysokość H
                {'from': [370, 175], 'to': [370, 60], 'color': C_SUCCESS, 'strokeWidth': 2.5, 'label': 'H'}
            ],
            metrics=[
                {'label': 'Pole podstawy', 'value': '$P_p = \\frac{3a^2\\sqrt{3}}{2}$', 'color': C_PRIMARY},
                {'label': 'Dłuższa przekątna', 'value': '$d_1 = 2a$', 'color': C_SKY},
                {'label': 'Krótsza przekątna', 'value': '$d_2 = a\\sqrt{3}$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Sześciokąt', '6 trójkątów równobocznych', 'Podstawa.', labels=[{'x': 260, 'y': 130, 'text': 'P_p = 6 · (a²√3 / 4) = 3a²√3 / 2', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: a = 4, H = 5', 'V = (3·16√3 / 2) · 5 = 120√3', 'Objętość.', labels=[{'x': 260, 'y': 130, 'text': 'V = 120√3', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Dłuższa vs Krótsza przekątna', 'Dłuższa to 2a, Krótsza to a√3!', 'W zadaniu z przekątną bryły zawsze sprawdź, o którą przekątną podstawy chodzi!', labels=[{'x': 260, 'y': 130, 'text': 'Dłuższa przekątna podstawy = 2a!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (4, 5):
        # Ostrosłup prawidłowy czworokątny: Trójkąty prostokątne w bryle
        tab0 = make_stereometry_diagram(
            'Ostrosłup prawidłowy czworokątny: Kluczowe trójkąty prostokątne',
            'V = \\frac{1}{3} P_p \\cdot H,\\quad H^2 + \\left(\\frac{d}{2}\\right)^2 = b^2,\\quad H^2 + \\left(\\frac{a}{2}\\right)^2 = h_s^2',
            'Dwa kluczowe trójkąty: I (z krawędzią boczną $b$ i połową przekątnej $d/2$) oraz II (z wysokością ściany bocznej $h_s$ i połową boku $a/2$).',
            segments=[
                # Podstawa ABCD
                {'from': [140, 200], 'to': [340, 200], 'color': C_PRIMARY, 'strokeWidth': 2, 'label': 'a'},
                {'from': [340, 200], 'to': [400, 150], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [140, 200], 'to': [200, 150], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True},
                {'from': [200, 150], 'to': [400, 150], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True},
                # Przekątne podstawy
                {'from': [140, 200], 'to': [400, 150], 'color': C_SLATE, 'strokeWidth': 1, 'dashed': True},
                {'from': [340, 200], 'to': [200, 150], 'color': C_SLATE, 'strokeWidth': 1, 'dashed': True},
                # Wysokość ostrosłupa H
                {'from': [270, 175], 'to': [270, 40], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'Wysokość H'},
                # Krawędź boczna
                {'from': [140, 200], 'to': [270, 40], 'color': C_DANGER, 'strokeWidth': 2.5, 'label': 'krawędź b'},
                # Wysokość ściany bocznej h_s
                {'from': [240, 200], 'to': [270, 40], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True, 'label': 'h_s'}
            ],
            points=[
                {'x': 270, 'y': 40, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'Wierzchołek S'}
            ],
            metrics=[
                {'label': 'Trójkąt I (krawędź b)', 'value': '$H^2 + (d/2)^2 = b^2$', 'color': C_DANGER},
                {'label': 'Trójkąt II (ściana h_s)', 'value': '$H^2 + (a/2)^2 = h_s^2$', 'color': C_SKY},
                {'label': 'Objętość V', 'value': '$V = \\frac{1}{3} a^2 H$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Objętość', 'V = 1/3 · P_p · H', 'Ostrosłup.', labels=[{'x': 260, 'y': 130, 'text': 'V = 1/3 · P_p · H (zawsze z 1/3!)', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'a=6, b=5 ⟹ d=6√2, d/2=3√2', 'H² = 25 - 18 = 7 ⟹ H = √7', labels=[{'x': 260, 'y': 130, 'text': 'H = √7, V = 1/3 · 36 · √7 = 12√7', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Zapomnienie o 1/3', 'V ostrosłupa to 1/3 Pp · H!', 'Nie zapominaj o ułamku 1/3 we wzorze na objętość ostrosłupa!', labels=[{'x': 260, 'y': 130, 'text': 'Pamiętaj o ułamku 1/3!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (6, 7):
        # Walec i stożek: Przekroje osiowe i tworząca l
        tab0 = make_geometry_diagram(
            'Stożek i Walec: Przekroje osiowe i tworząca $l$',
            '\\text{Stożek: } r^2 + H^2 = l^2,\\; V = \\frac{1}{3}\\pi r^2 H;\\quad \\text{Walec: } V = \\pi r^2 H',
            'Przekrój osiowy stożka to trójkąt równoramienny o podstawie $2r$ i ramionach $l$. Tworząca $l$ tworzy trójkąt prostokątny z $r$ i $H$.',
            polygons=[
                # Przekrój stożka
                {'points': [[160, 200], [360, 200], [260, 60]], 'fill': 'rgba(255, 184, 0, 0.1)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5}
            ],
            segments=[
                {'from': [260, 200], 'to': [260, 60], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'H'},
                {'from': [260, 200], 'to': [360, 200], 'color': C_SKY, 'strokeWidth': 3, 'label': 'promień r'},
                {'from': [260, 60], 'to': [360, 200], 'color': C_DANGER, 'strokeWidth': 3, 'label': 'tworząca l'}
            ],
            arcs=[{'cx': 260, 'cy': 200, 'r': 20, 'startAngleDeg': 270, 'endAngleDeg': 360, 'color': C_SLATE, 'showRightAngleDot': True}],
            metrics=[
                {'label': 'Pitagoras w stożku', 'value': '$r^2 + H^2 = l^2$', 'color': C_PRIMARY},
                {'label': 'Pole boczne stożka', 'value': '$P_b = \\pi r l$', 'color': C_SKY},
                {'label': 'Objętość stożka', 'value': '$V = \\frac{1}{3}\\pi r^2 H$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Stożek wzory', 'r² + H² = l²', 'Tworząca l.', labels=[{'x': 260, 'y': 130, 'text': 'P_b = πrl, V = 1/3 πr²H', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: r=3, H=4', 'l² = 9 + 16 = 25 ⟹ l = 5', 'P_b = 15π, V = 12π', labels=[{'x': 260, 'y': 130, 'text': 'l = 5, V = 12π', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Średnica vs Promień', 'Podstawa ma 2r!', 'W zadaniu często podana jest średnica 2r przekroju – natychmiast podziel ją na pół!', labels=[{'x': 260, 'y': 130, 'text': 'Średnica 2r ⟹ promień r = średnica / 2!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 8:
        # Kula: Pole 4 pi R^2 i objętość 4/3 pi R^3
        tab0 = make_geometry_diagram(
            'Kula: Pole powierzchni i objętość',
            'P = 4\\pi R^2,\\quad V = \\frac{4}{3}\\pi R^3',
            'Kula zależy wyłącznie od jednego parametru: promienia $R$. Przekrój przez środek kuli to koło wielkie o polu $\\pi R^2$.',
            circles=[{'cx': 260, 'cy': 140, 'r': 85, 'fill': 'rgba(56, 189, 248, 0.08)', 'stroke': C_SKY, 'strokeWidth': 2.5}],
            segments=[
                {'from': [260, 140], 'to': [345, 140], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'R'}
            ],
            points=[{'x': 260, 'y': 140, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'S (środek)'}],
            metrics=[
                {'label': 'Pole powierzchni', 'value': '$P = 4\\pi R^2$', 'color': C_SKY},
                {'label': 'Objętość', 'value': '$V = \\frac{4}{3}\\pi R^3$', 'color': C_PRIMARY},
                {'label': 'Koło wielkie', 'value': '$P_{koła} = \\pi R^2 = \\frac{1}{4}P_{kuli}$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzory kuli', 'P = 4πR², V = 4/3 πR³', 'Karta wzorów.', labels=[{'x': 260, 'y': 130, 'text': 'P = 4πR², V = 4/3 πR³', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: R = 3', 'P = 36π, V = 4/3 · π · 27 = 36π', 'Krok po kroku.', labels=[{'x': 260, 'y': 130, 'text': 'P = 36π, V = 36π', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Potęga R³ w objętości', 'R³ a nie R²!', 'W objętości promień podnosimy do sześcianu (R³), a w polu do kwadratu (R²)!', labels=[{'x': 260, 'y': 130, 'text': 'Objętość wymaga R³!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (9, 10):
        # Kąty w bryłach: kąt nachylenia krawędzi vs kąt nachylenia ściany do podstawy
        tab0 = make_stereometry_diagram(
            'Kąty w ostrosłupie: Krawędź boczna vs Ściana boczna do podstawy',
            '\\alpha \\text{ (krawędź do podstawy: przy } d/2),\\quad \\beta \\text{ (ściana do podstawy: przy } a/2)',
            'Kąt nachylenia krawędzi bocznej leży przy przekątnej ($d/2$). Kąt nachylenia ściany bocznej leży przy wysokości ściany $h_s$ i boku ($a/2$).',
            segments=[
                # Podstawa
                {'from': [140, 200], 'to': [340, 200], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [340, 200], 'to': [400, 150], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Wysokość H
                {'from': [270, 175], 'to': [270, 40], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'H'},
                # Trójkąt kąta krawędzi (alfa)
                {'from': [140, 200], 'to': [270, 175], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True, 'label': 'd/2'},
                {'from': [140, 200], 'to': [270, 40], 'color': C_SKY, 'strokeWidth': 2.5, 'label': 'krawędź b'},
                # Trójkąt kąta ściany (beta)
                {'from': [270, 175], 'to': [240, 200], 'color': C_PRIMARY, 'strokeWidth': 2, 'dashed': True, 'label': 'a/2'},
                {'from': [240, 200], 'to': [270, 40], 'color': C_PRIMARY, 'strokeWidth': 2.5, 'label': 'h_s'}
            ],
            arcs=[
                {'cx': 140, 'cy': 200, 'r': 35, 'startAngleDeg': 310, 'endAngleDeg': 350, 'color': C_SKY, 'label': 'α'},
                {'cx': 240, 'cy': 200, 'r': 30, 'startAngleDeg': 290, 'endAngleDeg': 360, 'color': C_PRIMARY, 'label': 'β'}
            ],
            metrics=[
                {'label': 'Kąt krawędzi α', 'value': '$\\operatorname{tg}\\alpha = \\frac{H}{d/2}$', 'color': C_SKY},
                {'label': 'Kąt ściany β', 'value': '$\\operatorname{tg}\\beta = \\frac{H}{a/2}$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Rozróżnienie kątów', 'Krawędź (d/2) vs Ściana (a/2)', 'Klucz maturalny.', labels=[{'x': 260, 'y': 130, 'text': 'tg α = H / (d/2)  oraz  tg β = H / (a/2)', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Kąt nachylenia krawędzi bocznej 45°', 'H = d/2', labels=[{'x': 260, 'y': 130, 'text': 'tg 45° = 1 ⟹ H = d/2 = a√2 / 2', 'color': C_SUCCESS, 'fontSize': 18, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Pomylenie kąta krawędzi ze ścianą!', 'Krawędź idzie do narożnika, ściana na środek boku!', 'Najczęstszy błąd maturzystów – wstawienie a/2 zamiast d/2!', labels=[{'x': 260, 'y': 130, 'text': 'Krawędź ⟹ d/2 (wierzchołek podstawy)!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    else:
        # l_num in (11, 12, 13, 14, 15): Przekroje, podobieństwo brył (k, k^2, k^3)
        tab0 = make_stereometry_diagram(
            'Podobieństwo brył: Skala długości $k$, pól $k^2$ i objętości $k^3$',
            '\\frac{a_2}{a_1} = k,\\quad \\frac{P_2}{P_1} = k^2,\\quad \\frac{V_2}{V_1} = k^3',
            'Gdy wymiary bryły rosną $k$ razy, jej pole powierzchni rośnie $k^2$ razy, a objętość rośnie aż $k^3$ razy!',
            segments=[
                # Mała bryła
                {'from': [100, 180], 'to': [160, 180], 'color': C_SKY, 'strokeWidth': 2},
                {'from': [160, 180], 'to': [160, 120], 'color': C_SKY, 'strokeWidth': 2},
                {'from': [100, 180], 'to': [100, 120], 'color': C_SKY, 'strokeWidth': 2},
                {'from': [100, 120], 'to': [160, 120], 'color': C_SKY, 'strokeWidth': 2},
                # Duża bryła (2x)
                {'from': [260, 220], 'to': [380, 220], 'color': C_PRIMARY, 'strokeWidth': 2.5},
                {'from': [380, 220], 'to': [380, 100], 'color': C_PRIMARY, 'strokeWidth': 2.5},
                {'from': [260, 220], 'to': [260, 100], 'color': C_PRIMARY, 'strokeWidth': 2.5},
                {'from': [260, 100], 'to': [380, 100], 'color': C_PRIMARY, 'strokeWidth': 2.5}
            ],
            labels=[
                {'x': 130, 'y': 150, 'text': 'V₁', 'color': C_SKY, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 320, 'y': 160, 'text': 'V₂ = k³ · V₁', 'color': C_PRIMARY, 'fontSize': 18, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Krawędzie', 'value': 'Skala $k$', 'color': C_SKY},
                {'label': 'Pole powierzchni', 'value': 'Skala $k^2$', 'color': C_PRIMARY},
                {'label': 'Objętość', 'value': 'Skala $k^3$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Skala objętości', 'V₂ / V₁ = k³', 'Sześcian skali.', labels=[{'x': 260, 'y': 130, 'text': 'Stosunek objętości brył wynosi k³', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: k = 2, V₁ = 3 dm³', 'V₂ = 2³ · 3 = 8 · 3 = 24 dm³', 'Objętość rośnie 8 razy.', labels=[{'x': 260, 'y': 130, 'text': 'V₂ = 24 dm³', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: 2 razy większa krawędź to 8x większa bryła!', 'k³ = 2³ = 8!', 'Częsty błąd: podwojenie objętości zamiast pomnożenia przez 8!', labels=[{'x': 260, 'y': 130, 'text': 'BŁĄD: V₂ = 2 · V₁ (BŁĄD!) ⟹ POPRAWNIE: 8 · V₁!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
