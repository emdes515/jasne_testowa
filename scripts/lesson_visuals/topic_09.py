"""
topic_09.py - Dział 9: Planimetria (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram
)

def get_topic_09_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Kąty przyległe, wierzchołkowe i naprzemianległe
        tab0 = make_geometry_diagram(
            'Kąty na płaszczyźnie: Proste równoległe przecięte sieczną',
            '\\alpha + \\beta = 180^\\circ \\text{ (przyległe)},\\quad \\alpha_1 = \\alpha_2 \\text{ (wierzchołkowe / naprzemianległe)}',
            'Sieczna tworzy dwie grupy kątów: wszystkie ostre są sobie równe, wszystkie rozwarte są sobie równe, a ich suma wynosi $180^\\circ$.',
            segments=[
                {'from': [60, 100], 'to': [460, 100], 'color': C_SLATE, 'strokeWidth': 2, 'label': 'k ∥ l'},
                {'from': [60, 180], 'to': [460, 180], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [140, 240], 'to': [380, 40], 'color': C_PRIMARY, 'strokeWidth': 2.5, 'label': 'sieczna'}
            ],
            arcs=[
                {'cx': 308, 'cy': 100, 'r': 25, 'startAngleDeg': 30, 'endAngleDeg': 150, 'color': C_SUCCESS, 'label': 'α'},
                {'cx': 212, 'cy': 180, 'r': 25, 'startAngleDeg': 210, 'endAngleDeg': 330, 'color': C_SUCCESS, 'label': 'α'}
            ],
            metrics=[
                {'label': 'Przyległe', 'value': 'Suma $= 180^\\circ$', 'color': C_PRIMARY},
                {'label': 'Naprzemianległe', 'value': 'Kąty są równe', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Kąty', 'α + β = 180°', 'Zależności.', labels=[{'x': 260, 'y': 130, 'text': 'Kąty naprzemianległe i odpowiadające są RÓWNE', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: α = 40°', 'Kąt rozwarty β = 180° - 40° = 140°', 'Szybki rachunek.', labels=[{'x': 260, 'y': 130, 'text': 'β = 140°', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Warunek równoległości', 'Tylko dla k ∥ l!', 'Kąty naprzemianległe są równe TYLKO wtedy, gdy przecinane proste są równoległe!', labels=[{'x': 260, 'y': 130, 'text': 'Sprawdź, czy proste są równoległe!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (2, 3):
        # Trójkąty: suma kątów, Pitagoras i trójki pitagorejskie
        tab0 = make_geometry_diagram(
            'Twierdzenie Pitagorasa i trójki pitagorejskie',
            'a^2 + b^2 = c^2,\\quad (3, 4, 5),\\; (5, 12, 13),\\; (8, 15, 17)',
            'Suma kwadratów długości przyprostokątnych jest równa kwadratowi długości przeciwprostokątnej.',
            polygons=[{'points': [[120, 200], [380, 200], [120, 70]], 'fill': 'rgba(255, 184, 0, 0.08)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5}],
            segments=[
                {'from': [120, 200], 'to': [120, 70], 'color': C_SKY, 'strokeWidth': 3, 'label': 'a = 3'},
                {'from': [120, 200], 'to': [380, 200], 'color': C_SKY, 'strokeWidth': 3, 'label': 'b = 4'},
                {'from': [120, 70], 'to': [380, 200], 'color': C_SUCCESS, 'strokeWidth': 3.5, 'label': 'c = 5'}
            ],
            arcs=[{'cx': 120, 'cy': 200, 'r': 20, 'startAngleDeg': 270, 'endAngleDeg': 360, 'color': C_SLATE, 'showRightAngleDot': True}],
            metrics=[
                {'label': 'Pitagoras', 'value': '$a^2 + b^2 = c^2$', 'color': C_PRIMARY},
                {'label': 'Trójka egipska', 'value': '$3^2 + 4^2 = 9 + 16 = 25 = 5^2$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór Pitagorasa', 'a² + b² = c²', 'Klucz geometrii.', labels=[{'x': 260, 'y': 130, 'text': 'a² + b² = c²', 'color': C_PRIMARY, 'fontSize': 22, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: a=5, b=12', 'c² = 25 + 144 = 169 ⟹ c = 13', 'Trójka (5, 12, 13).', labels=[{'x': 260, 'y': 130, 'text': 'c = 13', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Nierówność trójkąta', 'a + b > c', 'Trójkąt można zbudować tylko wtedy, gdy suma dwóch krótszych boków jest WIĘKSZA od najdłuższego!', labels=[{'x': 260, 'y': 130, 'text': 'Boki (2, 3, 6) NIE tworzą trójkąta, bo 2+3 < 6!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 4:
        # Trójkąt równoboczny: wysokość h, pole P, promienie r i R
        tab0 = make_geometry_diagram(
            'Trójkąt równoboczny: Wszystkie wzory od jednego boku $a$',
            'h = \\frac{a\\sqrt{3}}{2},\\quad P = \\frac{a^2\\sqrt{3}}{4},\\quad r = \\frac{1}{3}h,\\quad R = \\frac{2}{3}h',
            'Wysokość dzieli trójkąt równoboczny na dwa trójkąty $30^\\circ-60^\\circ-90^\\circ$. Środek ciężkości dzieli wysokość w stosunku 2:1.',
            polygons=[{'points': [[120, 220], [380, 220], [250, 40]], 'fill': 'rgba(255, 184, 0, 0.08)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5}],
            segments=[
                {'from': [250, 40], 'to': [250, 220], 'color': C_SUCCESS, 'strokeWidth': 2, 'dashed': True, 'label': 'h = a√3/2'}
            ],
            points=[{'x': 250, 'y': 160, 'dot': 'filled', 'color': C_SKY, 'label': 'S (2:1)'}],
            metrics=[
                {'label': 'Wysokość', 'value': '$h = \\frac{a\\sqrt{3}}{2}$', 'color': C_SUCCESS},
                {'label': 'Pole', 'value': '$P = \\frac{a^2\\sqrt{3}}{4}$', 'color': C_PRIMARY},
                {'label': 'Promień wpisany r', 'value': '$r = \\frac{1}{3}h = \\frac{a\\sqrt{3}}{6}$', 'color': C_SKY},
                {'label': 'Promień opisany R', 'value': '$R = \\frac{2}{3}h = \\frac{a\\sqrt{3}}{3}$', 'color': C_PURPLE}
            ]
        )
        tab1 = [
            make_geometry_diagram('Karta CKE', 'P = a²√3 / 4', 'Równoboczny.', labels=[{'x': 260, 'y': 130, 'text': 'h = a√3/2, P = a²√3/4', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: a = 6', 'h = 3√3, P = 9√3, r = √3, R = 2√3', 'Krok po kroku.', labels=[{'x': 260, 'y': 130, 'text': 'h = 3√3, P = 9√3', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Promień r to 1/3 h, a NIE 1/2 h!', 'Podział wysokości 2:1!', 'Środek dzieli wysokość na 1/3 (promień r) oraz 2/3 (promień R)!', labels=[{'x': 260, 'y': 130, 'text': 'r = h/3, R = 2h/3 (stosunek 2:1!)', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num == 5:
        # Trójkąty szczególne: 30-60-90 i 45-45-90
        tab0 = make_geometry_diagram(
            'Trójkąty szczególne: Błyskawiczne wyznaczanie boków',
            '30^\\circ-60^\\circ-90^\\circ \\implies a,\\; a\\sqrt{3},\\; 2a;\\quad 45^\\circ-45^\\circ-90^\\circ \\implies a,\\; a,\\; a\\sqrt{2}',
            'Mając dany tylko JEDEN bok, od razu znasz długości pozostałych dwóch bez używania trygonometrii.',
            polygons=[
                {'points': [[80, 200], [220, 200], [80, 60]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[280, 200], [420, 200], [280, 60]], 'fill': 'rgba(16, 185, 129, 0.1)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 150, 'y': 225, 'text': '30°-60°-90°: a (naprzeciw 30°), a√3, 2a', 'color': C_SKY, 'fontSize': 13, 'anchor': 'middle'},
                {'x': 350, 'y': 225, 'text': '45°-45°-90°: a, a, a√2 (połowa kwadratu)', 'color': C_SUCCESS, 'fontSize': 13, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Naprzeciw 30°', 'value': 'Zawsze połowa przeciwprostokątnej ($a = c/2$)', 'color': C_SKY},
                {'label': 'Przekątna kwadratu', 'value': '$d = a\\sqrt{2}$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Trójkąt 30-60-90', 'a, a√3, 2a', 'Relacje.', labels=[{'x': 260, 'y': 130, 'text': 'Krótka = a, Długa = a√3, Przeciwprostokątna = 2a', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: Przeciwprostokątna c = 10', 'a = 5, b = 5√3 (dla kątów 30°-60°)', 'Wynik natychmiastowy.', labels=[{'x': 260, 'y': 130, 'text': 'a = 5, b = 5√3', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: a√3 leży naprzeciwko 60°', 'Bok najdłuższy leży naprzeciw kąta największego!', 'Bok a√3 przylega do kąta 30° i leży naprzeciwko 60°!', labels=[{'x': 260, 'y': 130, 'text': 'Naprzeciw 30° leży NAJKRÓTSZY bok a!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (6, 7, 8):
        # Twierdzenie Talesa i Podobieństwo figur (skala k i k^2)
        tab0 = make_geometry_diagram(
            'Podobieństwo figur: Skala liniowa $k$ oraz skala pól $k^2$',
            '\\frac{a_2}{a_1} = k,\\quad \\frac{\\text{Obw}_2}{\\text{Obw}_1} = k,\\quad \\frac{P_2}{P_1} = k^2',
            'Gdy powiększasz boki figury $k$ razy, jej obwód rośnie $k$ razy, ale jej pole powierzchni rośnie aż $k^2$ razy!',
            polygons=[
                {'points': [[80, 200], [180, 200], [130, 100]], 'fill': 'rgba(56, 189, 248, 0.1)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[240, 200], [440, 200], [340, 40]], 'fill': 'rgba(255, 184, 0, 0.12)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5}
            ],
            labels=[
                {'x': 130, 'y': 160, 'text': 'Pole P₁', 'color': C_SKY, 'fontSize': 14, 'anchor': 'middle'},
                {'x': 340, 'y': 140, 'text': 'Pole P₂ = k² · P₁', 'color': C_PRIMARY, 'fontSize': 16, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Długości i obwody', 'value': 'Skala $k$', 'color': C_SKY},
                {'label': 'Pola powierzchni', 'value': 'Skala $k^2$', 'color': C_PRIMARY},
                {'label': 'Objętości brył', 'value': 'Skala $k^3$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Skala pól', 'P₂ / P₁ = k²', 'Kwadrat skali.', labels=[{'x': 260, 'y': 130, 'text': 'Stosunek pól figur podobnych wynosi k²', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: k = 3, P₁ = 5', 'P₂ = 3² · 5 = 9 · 5 = 45', 'Pole rośnie 9 razy.', labels=[{'x': 260, 'y': 130, 'text': 'P₂ = 45 cm²', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Zapomnienie o kwadracie k²', 'Pole rośnie k², a NIE k razy!', 'Częsty błąd: pomnożenie pola przez 3 zamiast przez 9!', labels=[{'x': 260, 'y': 130, 'text': 'BŁĄD: P₂ = 3 · 5 = 15. POPRAWNIE: 9 · 5 = 45!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (9, 10, 11):
        # Kąty w okręgu: kąt środkowy i wpisany, styczne
        tab0 = make_geometry_diagram(
            'Kąty w okręgu: Kąt środkowy jest dwa razy większy od wpisanego',
            '\\beta = 2\\alpha \\text{ (oparte na tym samym łuku)}',
            'Kąt wpisany i środkowy oparte na tym samym łuku mają relację 1:2. Kąt wpisany oparty na średnicy ZAWSZE ma $90^\\circ$.',
            circles=[{'cx': 260, 'cy': 150, 'r': 90, 'fill': 'rgba(255, 184, 0, 0.05)', 'stroke': C_PRIMARY, 'strokeWidth': 2}],
            segments=[
                # Kąt środkowy (od środka (260, 150) do (180, 200) i (340, 200))
                {'from': [260, 150], 'to': [180, 200], 'color': C_SKY, 'strokeWidth': 2.5},
                {'from': [260, 150], 'to': [340, 200], 'color': C_SKY, 'strokeWidth': 2.5},
                # Kąt wpisany (od (260, 60) do (180, 200) i (340, 200))
                {'from': [260, 60], 'to': [180, 200], 'color': C_SUCCESS, 'strokeWidth': 2.5},
                {'from': [260, 60], 'to': [340, 200], 'color': C_SUCCESS, 'strokeWidth': 2.5}
            ],
            arcs=[
                {'cx': 260, 'cy': 150, 'r': 30, 'startAngleDeg': 35, 'endAngleDeg': 145, 'color': C_SKY, 'label': '2α (środkowy)'},
                {'cx': 260, 'cy': 60, 'r': 35, 'startAngleDeg': 45, 'endAngleDeg': 135, 'color': C_SUCCESS, 'label': 'α (wpisany)'}
            ],
            metrics=[
                {'label': 'Kąt wpisany', 'value': '$\\alpha = \\frac{1}{2}\\beta$', 'color': C_SUCCESS},
                {'label': 'Kąt środkowy', 'value': '$\\beta = 2\\alpha$', 'color': C_SKY},
                {'label': 'Kąt na średnicy', 'value': 'Zawsze prosty: $90^\\circ$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Twierdzenie', 'β = 2α', 'Kąty na tym samym łuku.', labels=[{'x': 260, 'y': 130, 'text': 'Kąt środkowy = 2 · Kąt wpisany', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Kąt wpisany α = 35°', 'Kąt środkowy β = 2 · 35° = 70°', labels=[{'x': 260, 'y': 130, 'text': 'β = 70°', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Ten sam łuk!', 'Sprawdź punkty oparcia!', 'Kąty muszą być oparte na dokładnie TYM SAMYM łuku okręgu!', labels=[{'x': 260, 'y': 130, 'text': 'Upewnij się, że ramiona kątów trafiają w te same punkty okręgu!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 12:
        # Czworokąty wpisane i opisane na okręgu
        tab0 = make_geometry_diagram(
            'Czworokąty w okręgu: Wpisany vs Opisany',
            '\\text{Wpisany: } \\alpha + \\gamma = \\beta + \\delta = 180^\\circ,\\quad \\text{Opisany: } a + c = b + d',
            'W okrąg wpiszesz czworokąt tylko gdy sumy przeciwległych KĄTÓW dają 180°. Opiszesz tylko gdy sumy przeciwległych BOKÓW są równe.',
            polygons=[
                {'points': [[120, 180], [200, 230], [240, 90], [140, 70]], 'fill': 'rgba(56, 189, 248, 0.08)', 'stroke': C_SKY, 'strokeWidth': 2},
                {'points': [[320, 190], [420, 190], [400, 90], [300, 110]], 'fill': 'rgba(16, 185, 129, 0.08)', 'stroke': C_SUCCESS, 'strokeWidth': 2}
            ],
            labels=[
                {'x': 175, 'y': 250, 'text': 'Wpisany: KĄTY = 180°', 'color': C_SKY, 'fontSize': 13, 'anchor': 'middle'},
                {'x': 360, 'y': 250, 'text': 'Opisany: BOKI a + c = b + d', 'color': C_SUCCESS, 'fontSize': 13, 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Wpisany (na okręgu)', 'value': 'Przeciwległe kąty sumują się do $180^\\circ$', 'color': C_SKY},
                {'label': 'Opisany (wokół okręgu)', 'value': 'Suma przeciwległych boków: $a + c = b + d$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Warunki', 'Kąty 180° vs Boki równe', 'Rozróżnienie.', labels=[{'x': 260, 'y': 130, 'text': 'Wpisany ⟺ kąty 180° | Opisany ⟺ boki a+c = b+d', 'color': C_PRIMARY, 'fontSize': 16, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Czworokąt opisany: boki 3, 5, 7, x', '3 + 7 = 5 + x ⟹ x = 5', labels=[{'x': 260, 'y': 130, 'text': '10 = 5 + x ⟹ x = 5', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Pomylenie kątów z bokami', 'Wpisany to KĄTY, opisany to BOKI!', 'Mnemonik: Wpisany ma punkty w środku okręgu ⟹ patrzymy na kąty!', labels=[{'x': 260, 'y': 130, 'text': 'Nie sumuj boków w czworokącie wpisanym!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    else:
        # l_num in (13, 14, 15): Czworokąty pola, wycinek koła, dowody
        tab0 = make_geometry_diagram(
            'Pole wycinka koła $P_w$ oraz długość łuku $l$',
            'P_w = \\frac{\\alpha}{360^\\circ} \\cdot \\pi r^2,\\quad l = \\frac{\\alpha}{360^\\circ} \\cdot 2\\pi r',
            'Kąt środkowy $\\alpha$ wycina ułamek $\\frac{\\alpha}{360^\\circ}$ z całego pola koła (lub całego obwodu okręgu).',
            circles=[{'cx': 260, 'cy': 150, 'r': 90, 'fill': 'rgba(255, 184, 0, 0.04)', 'stroke': C_SLATE, 'strokeWidth': 1.5, 'dashed': True}],
            polygons=[{'points': [[260, 150], [350, 150], [324, 86]], 'fill': 'rgba(255, 184, 0, 0.2)', 'stroke': C_PRIMARY, 'strokeWidth': 2}],
            arcs=[{'cx': 260, 'cy': 150, 'r': 90, 'startAngleDeg': 315, 'endAngleDeg': 360, 'color': C_PRIMARY, 'label': 'łuk l'}],
            metrics=[
                {'label': 'Ułamek koła', 'value': '$\\frac{\\alpha}{360^\\circ}$', 'color': C_PRIMARY},
                {'label': 'Pole wycinka', 'value': '$P_w = \\frac{\\alpha}{360^\\circ} \\pi r^2$', 'color': C_SUCCESS},
                {'label': 'Długość łuku', 'value': '$l = \\frac{\\alpha}{360^\\circ} 2\\pi r$', 'color': C_SKY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzory', 'P_w i l', 'Wycinki.', labels=[{'x': 260, 'y': 130, 'text': 'P_w = (α/360°)·πr², l = (α/360°)·2πr', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład: r=6, α=60°', 'P_w = (60/360) · π · 36 = 6π', 'Szybki ułamek 1/6.', labels=[{'x': 260, 'y': 130, 'text': 'P_w = 1/6 · 36π = 6π', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: 2πr a nie πr²', 'Łuk to ułamek OBWODU (2πr)!', 'Pole wycinka używa πr², a długość łuku używa 2πr!', labels=[{'x': 260, 'y': 130, 'text': 'Dla długości łuku: 2πr (obwód)!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
