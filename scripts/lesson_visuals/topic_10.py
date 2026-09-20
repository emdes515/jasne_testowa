"""
topic_10.py - Dział 10: Geometria Analityczna (15 unikalnych lekcji)
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram, make_plot_diagram
)

def get_topic_10_visuals(l_idx, lesson_id, title):
    l_num = l_idx + 1

    if l_num == 1:
        # Długość odcinka: Pitagoras w Oxy
        tab0 = make_plot_diagram(
            'Długość odcinka w układzie współrzędnych: $|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$',
            '|AB| = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}',
            'Wzór na odległość dwóch punktów to bezpośrednie zastosowanie twierdzenia Pitagorasa w układzie kartezjańskim.',
            segments=[
                {'from': [40, 180], 'to': [480, 180], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [120, 240], 'to': [120, 40], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Odcinek AB
                {'from': [180, 140], 'to': [380, 60], 'color': C_PRIMARY, 'strokeWidth': 3.5, 'label': '|AB|'},
                # Trójkąt prostokątny
                {'from': [180, 140], 'to': [380, 140], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True, 'label': 'x_B - x_A'},
                {'from': [380, 140], 'to': [380, 60], 'color': C_SUCCESS, 'strokeWidth': 2, 'dashed': True, 'label': 'y_B - y_A'}
            ],
            points=[
                {'x': 180, 'y': 140, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'A(x_A, y_A)'},
                {'x': 380, 'y': 60, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'B(x_B, y_B)'}
            ],
            metrics=[
                {'label': 'Odległość', 'value': '$|AB| = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2}$', 'color': C_PRIMARY},
                {'label': 'Kwadraty różnic', 'value': 'Zawsze $\\ge 0$ (kolejność odejmowania nie ma znaczenia)', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', '|AB| = √((x₂-x₁)² + (y₂-y₁)¹)', 'Długość.', labels=[{'x': 260, 'y': 130, 'text': '|AB| = √((x_B - x_A)² + (y_B - y_A)²)', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'A(1, 2), B(4, 6)', '|AB| = √(3² + 4²) = √25 = 5', labels=[{'x': 260, 'y': 130, 'text': '|AB| = 5', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Znak pod kwadratem', '(-3)² = +9!', 'Odejmowanie ujemnej daje plus: 2 - (-3) = 5!', labels=[{'x': 260, 'y': 130, 'text': 'Pamiętaj o podwójnym minusie: x_B - (-x_A)!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num == 2:
        # Środek odcinka S = ((x_A+x_B)/2, (y_A+y_B)/2)
        tab0 = make_plot_diagram(
            'Środek odcinka w układzie współrzędnych: $S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)$',
            'S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)',
            'Współrzędne środka to po prostu średnie arytmetyczne odpowiednich współrzędnych obu końców odcinka.',
            segments=[
                {'from': [40, 180], 'to': [480, 180], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [120, 240], 'to': [120, 40], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [160, 150], 'to': [400, 70], 'color': C_PRIMARY, 'strokeWidth': 3}
            ],
            points=[
                {'x': 160, 'y': 150, 'dot': 'filled', 'color': C_SKY, 'label': 'A(x_A, y_A)'},
                {'x': 280, 'y': 110, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'S (ŚRODEK)', 'labelPosition': 'top'},
                {'x': 400, 'y': 70, 'dot': 'filled', 'color': C_SKY, 'label': 'B(x_B, y_B)'}
            ],
            metrics=[
                {'label': 'Współrzędna x_S', 'value': '$x_S = \\frac{x_A + x_B}{2}$', 'color': C_SUCCESS},
                {'label': 'Współrzędna y_S', 'value': '$y_S = \\frac{y_A + y_B}{2}$', 'color': C_SKY},
                {'label': 'Szukanie końca B', 'value': '$x_B = 2x_S - x_A$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór na środek', 'S = ((x₁+x₂)/2, (y₁+y₂)/2)', 'Średnia.', labels=[{'x': 260, 'y': 130, 'text': 'S = ((x_A + x_B)/2, (y_A + y_B)/2)', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'A(2, -4), B(6, 8)', 'S = ((2+6)/2, (-4+8)/2) = (4, 2)', labels=[{'x': 260, 'y': 130, 'text': 'S = (4, 2)', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Wyznaczanie końca B', 'Znany środek i jeden koniec!', 'Gdy znasz środek S i punkt A, punkt B to: x_B = 2x_S - x_A!', labels=[{'x': 260, 'y': 130, 'text': 'Nie dziel współrzędnych S przez 2!', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    elif l_num in (3, 4):
        # Proste kierunkowe, równoległe i prostopadłe
        tab0 = make_plot_diagram(
            'Proste prostopadłe i równoległe w geometrii analitycznej',
            'k \\parallel l \\iff a_1 = a_2,\\quad k \\perp l \\iff a_1 \\cdot a_2 = -1',
            'Równoległe mają identyczne $a$. Prostopadłe mają $a$ przeciwne i odwrócone.',
            segments=[
                {'from': [40, 150], 'to': [480, 150], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Prosta 1
                {'from': [100, 220], 'to': [360, 60], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'k: y = 2x'},
                # Prosta 2 prostopadła
                {'from': [120, 50], 'to': [340, 250], 'color': C_SUCCESS, 'strokeWidth': 3, 'label': 'l: y = -0.5x'}
            ],
            arcs=[{'cx': 230, 'cy': 140, 'r': 24, 'startAngleDeg': 40, 'endAngleDeg': 130, 'color': C_PRIMARY, 'showRightAngleDot': True}],
            metrics=[
                {'label': 'Równoległość', 'value': '$a_1 = a_2$', 'color': C_SKY},
                {'label': 'Prostopadłość', 'value': '$a_1 \\cdot a_2 = -1$', 'color': C_SUCCESS}
            ]
        )
        tab1 = [
            make_geometry_diagram('Warunki', 'a₁ = a₂ vs a₁·a₂ = -1', 'Zależności.', labels=[{'x': 260, 'y': 130, 'text': 'Równoległe: równe | Prostopadłe: iloczyn = -1', 'color': C_PRIMARY, 'fontSize': 17, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'Prosta prostopadła do y = 3x - 1', 'a = -1/3 ⟹ y = -1/3 x + b', labels=[{'x': 260, 'y': 130, 'text': 'y = -1/3 x + b', 'color': C_SUCCESS, 'fontSize': 20, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Zmiana obu rzeczy!', 'I odwróć, i zmień znak!', 'Dla a = 5 prostopadła to -1/5, a NIE -5 ani +1/5!', labels=[{'x': 260, 'y': 130, 'text': 'a = 5 ⟹ a_perp = -1/5', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (5, 6):
        # Równanie okręgu (x-a)^2 + (y-b)^2 = r^2 i styczność
        tab0 = make_plot_diagram(
            'Równanie okręgu w postaci kanonicznej: $(x - a)^2 + (y - b)^2 = r^2$',
            'S = (a, b) \\text{ (środek)},\\quad r = \\text{promień}',
            'Liczby w nawiasach mają ZNAKI PRZECIWNE do współrzędnych środka $S(a, b)$, a po prawej stronie stoi $r^2$ (a nie samo $r$).',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [200, 240], 'to': [200, 40], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Promień r
                {'from': [280, 120], 'to': [345, 75], 'color': C_PRIMARY, 'strokeWidth': 2.5, 'label': 'promień r'}
            ],
            circles=[{'cx': 280, 'cy': 120, 'r': 80, 'fill': 'rgba(255, 184, 0, 0.06)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5}],
            points=[
                {'x': 280, 'y': 120, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'S(a, b) - środek'}
            ],
            metrics=[
                {'label': 'Środek S', 'value': '$S = (a, b)$', 'color': C_SUCCESS},
                {'label': 'Promień r', 'value': '$r = \\sqrt{Prawa\\;strona}$', 'color': C_PRIMARY},
                {'label': 'Styczna do okręgu', 'value': 'Odległość środka $d = r$', 'color': C_SKY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór okręgu', '(x - a)² + (y - b)² = r²', 'Karta CKE.', labels=[{'x': 260, 'y': 130, 'text': '(x - a)² + (y - b)² = r²', 'color': C_PRIMARY, 'fontSize': 20, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', '(x - 3)² + (y + 5)² = 16', 'S(3, -5), r = √16 = 4', labels=[{'x': 260, 'y': 130, 'text': 'S = (3, -5), r = 4', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Promień to √liczby!', 'Po prawej stronie jest r²!', 'Dla = 16 promień r wynosi 4, a NIE 16! Dla (y+5)² współrzędna to -5!', labels=[{'x': 260, 'y': 130, 'text': 'r = √16 = 4  oraz  b = -5!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (7, 8):
        # Wektory w Oxy i symetrie
        tab0 = make_plot_diagram(
            'Wektory w układzie współrzędnych: $\\vec{v} = [x_B - x_A, y_B - y_A]$',
            '\\vec{v} = [v_x, v_y],\\quad |\\vec{v}| = \\sqrt{v_x^2 + v_y^2}',
            'Wektor to uporządkowana para przesunięć: poziomego $v_x$ i pionowego $v_y$. Odejmujemy POCZĄTEK od KOŃCA!',
            segments=[
                {'from': [40, 180], 'to': [480, 180], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [120, 240], 'to': [120, 40], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Wektor
                {'from': [180, 160], 'to': [360, 80], 'color': C_SUCCESS, 'strokeWidth': 3.5, 'label': 'v = [x_B-x_A, y_B-y_A]'}
            ],
            points=[
                {'x': 180, 'y': 160, 'dot': 'filled', 'color': C_SKY, 'label': 'A (początek)'},
                {'x': 360, 'y': 80, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'B (koniec)'}
            ],
            metrics=[
                {'label': 'Zasada wektora', 'value': 'Koniec MINUS Początek', 'color': C_SUCCESS},
                {'label': 'Długość wektora', 'value': '$|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'AB = [x_B - x_A, y_B - y_A]', 'Współrzędne.', labels=[{'x': 260, 'y': 130, 'text': 'vec(AB) = [x_B - x_A, y_B - y_A]', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'A(2, 3), B(7, 1)', 'vec(AB) = [7-2, 1-3] = [5, -2]', labels=[{'x': 260, 'y': 130, 'text': 'vec(AB) = [5, -2]', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Początek minus koniec to BŁĄD!', 'Zawsze KOŃCOWY punkt jest pierwszy!', 'vec(AB) = B - A, a NIE A - B!', labels=[{'x': 260, 'y': 130, 'text': 'Zawsze: B - A (Grot minus Ogon)!', 'color': C_DANGER, 'fontSize': 16, 'anchor': 'middle'}])

    elif l_num in (11, 12):
        # Odległość punktu od prostej i symetralna
        tab0 = make_plot_diagram(
            'Odległość punktu $P(x_0, y_0)$ od prostej w postaci ogólnej $Ax + By + C = 0$',
            'd = \\frac{|A x_0 + B y_0 + C|}{\\sqrt{A^2 + B^2}}',
            'Odległość to długość odcinka PROSTOPADŁEGO do prostej opuszczonego z punktu $P$.',
            segments=[
                {'from': [40, 160], 'to': [480, 160], 'color': C_SLATE, 'strokeWidth': 1.5},
                # Prosta k
                {'from': [80, 220], 'to': [420, 60], 'color': C_PRIMARY, 'strokeWidth': 3, 'label': 'k: Ax + By + C = 0'},
                # Odległość d (prostopadła)
                {'from': [220, 70], 'to': [280, 125], 'color': C_DANGER, 'strokeWidth': 2.5, 'label': 'd (najkrótsza)'}
            ],
            points=[
                {'x': 220, 'y': 70, 'dot': 'filled', 'color': C_SUCCESS, 'label': 'P(x₀, y₀)', 'labelPosition': 'top'}
            ],
            arcs=[{'cx': 280, 'cy': 125, 'r': 18, 'startAngleDeg': 45, 'endAngleDeg': 135, 'color': C_SLATE, 'showRightAngleDot': True}],
            metrics=[
                {'label': 'Wzór na d', 'value': '$d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$', 'color': C_DANGER},
                {'label': 'Wartość bezwzględna', 'value': 'Licznik ZAWSZE $\\ge 0$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'd = |Ax₀ + By₀ + C| / √(A² + B²)', 'Karta wzorów.', labels=[{'x': 260, 'y': 130, 'text': 'd = |Ax₀ + By₀ + C| / √(A² + B²)', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'P(1, 2), 3x + 4y - 1 = 0', 'd = |3(1) + 4(2) - 1| / 5 = 10/5 = 2', labels=[{'x': 260, 'y': 130, 'text': 'd = 2', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Postać kierunkowa y = ax+b', 'Musisz najpierw przenieść na postać ogólną!', 'Wzór działa TYLKO dla Ax + By + C = 0 (przenieś y na prawo)!', labels=[{'x': 260, 'y': 130, 'text': 'y = 2x - 3 ⟹ 2x - y - 3 = 0 (A=2, B=-1, C=-3)', 'color': C_DANGER, 'fontSize': 15, 'anchor': 'middle'}])

    else:
        # l_num in (9, 10, 13, 14, 15): Pole trójkąta z wierzchołków, przekształcenia
        tab0 = make_plot_diagram(
            'Pole trójkąta w układzie współrzędnych z wektorów',
            'P = \\frac{1}{2} |d(\\vec{AB}, \\vec{AC})| = \\frac{1}{2} |(x_B - x_A)(y_C - y_A) - (y_B - y_A)(x_C - x_A)|',
            'Wzór wyznacznikowy pozwala obliczyć pole dowolnego trójkąta w Oxy bezpośrednio ze współrzędnych jego wierzchołków!',
            polygons=[{'points': [[140, 180], [380, 200], [260, 60]], 'fill': 'rgba(255, 184, 0, 0.1)', 'stroke': C_PRIMARY, 'strokeWidth': 2.5}],
            points=[
                {'x': 140, 'y': 180, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'A'},
                {'x': 380, 'y': 200, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'B'},
                {'x': 260, 'y': 60, 'dot': 'filled', 'color': C_PRIMARY, 'label': 'C'}
            ],
            metrics=[
                {'label': 'Wektor AB', 'value': '$[x_B-x_A, y_B-y_A]$', 'color': C_SKY},
                {'label': 'Wektor AC', 'value': '$[x_C-x_A, y_C-y_A]$', 'color': C_SUCCESS},
                {'label': 'Pole', 'value': '$P = \\frac{1}{2} |x_1 y_2 - y_1 x_2|$', 'color': C_PRIMARY}
            ]
        )
        tab1 = [
            make_geometry_diagram('Wzór', 'P = 1/2 |x_AB · y_AC - y_AB · x_AC|', 'Wyznacznik.', labels=[{'x': 260, 'y': 130, 'text': 'Pole trójkąta z wektorów', 'color': C_PRIMARY, 'fontSize': 18, 'anchor': 'middle'}])
        ]
        tab2 = make_geometry_diagram('Przykład', 'A(0,0), B(4,0), C(2,3)', 'P = 1/2 |4·3 - 0·2| = 1/2 · 12 = 6', labels=[{'x': 260, 'y': 130, 'text': 'P = 6', 'color': C_SUCCESS, 'fontSize': 22, 'anchor': 'middle'}])
        tab3 = make_geometry_diagram('Pułapka CKE: Wartość bezwzględna', 'Pole nie może być ujemne!', 'Nawet jeśli iloczyn wyjdzie ujemny (np. -12), wartość bezwzględna daje +12!', labels=[{'x': 260, 'y': 130, 'text': 'Pamiętaj o wartości bezwzględnej w liczniku!', 'color': C_PRIMARY, 'fontSize': 15, 'anchor': 'middle'}])

    return tab0, tab1, tab2, tab3
