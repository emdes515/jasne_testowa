"""
topic_15.py - Dział 15: Planimetria – Trójkąty, Cechy Podobieństwa i Twierdzenie Talesa (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_15_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L15.1: Trójkąt równoboczny, równoramienny i prostokątny
        tab0 = make_geometry_diagram(
            title="Własności trójkąta równobocznego i prostokątnego",
            badge=r"h = \frac{a\sqrt{3}}{2}, \quad P = \frac{a^2\sqrt{3}}{4}, \quad R = \frac{2}{3}h, \quad r = \frac{1}{3}h",
            caption="W trójkącie równobocznym wysokość dzieli podstawę na połowy, a środek ciężkości dzieli wysokość w stosunku 2:1.",
            polygons=[
                {
                    'points': [[160, 220], [360, 220], [260, 47]],
                    'fill': 'rgba(255, 184, 0, 0.08)',
                    'stroke': C_PRIMARY,
                    'strokeWidth': 2.5
                }
            ],
            segments=[
                {'from': [260, 47], 'to': [260, 220], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True},
                {'from': [245, 220], 'to': [245, 205], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [245, 205], 'to': [260, 205], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            points=[
                {'x': 160, 'y': 220, 'color': C_PRIMARY, 'label': 'A', 'attach': 'sw'},
                {'x': 360, 'y': 220, 'color': C_PRIMARY, 'label': 'B', 'attach': 'se'},
                {'x': 260, 'y': 47, 'color': C_PRIMARY, 'label': 'C', 'attach': 'n'},
                {'x': 260, 'y': 220, 'color': C_SLATE, 'label': 'D', 'attach': 's'}
            ],
            labels=[
                {'x': 210, 'y': 238, 'text': 'a/2', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 310, 'y': 238, 'text': 'a/2', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 275, 'y': 135, 'text': r'h = a\sqrt{3}/2', 'color': C_SKY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 195, 'y': 120, 'text': 'bok a', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'end'}
            ],
            metrics=[
                {'label': 'Wysokość', 'value': r'$h = \frac{a\sqrt{3}}{2}$', 'color': C_SKY},
                {'label': 'Pole powierzchni', 'value': r'$P = \frac{a^2\sqrt{3}}{4}$', 'color': C_PRIMARY},
                {'label': 'Promienie R i r', 'value': r'$R = \frac{a\sqrt{3}}{3}, \; r = \frac{a\sqrt{3}}{6}$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie boku i wysokości ze znanego pola krok po kroku",
            badge=r"P = 16\sqrt{3} \longrightarrow \frac{a^2\sqrt{3}}{4} = 16\sqrt{3} \longrightarrow a^2 = 64 \longrightarrow a = 8, \quad h = \frac{8\sqrt{3}}{2} = 4\sqrt{3}",
            caption="Podstawiasz dane pole pod wzór z tablic CKE, dzielisz obustronnie przez pierwiastek z 3 i pierwiastkujesz a².",
            steps=[
                {'num': 1, 'title': 'Przyrównaj wzór do wartości', 'desc': r'$\frac{a^2\sqrt{3}}{4} = 16\sqrt{3}$. Dzielimy obustronnie przez $\sqrt{3}$.', 'color': C_SKY},
                {'num': 2, 'title': 'Pomnóż przez 4 i wyciągnij pierwiastek', 'desc': r'$a^2 = 16 \cdot 4 = 64 \longrightarrow a = 8$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz wysokość', 'desc': r'$h = \frac{8\sqrt{3}}{2} = 4\sqrt{3}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Pole P', 'value': r'$16\sqrt{3}$', 'color': C_SKY},
                {'label': 'Bok a', 'value': '$a = 8$', 'color': C_PRIMARY},
                {'label': 'Wysokość h', 'value': r'$h = 4\sqrt{3}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie mianowników we wzorach na h i P trójkąta równobocznego",
            badge=r"h = \frac{a\sqrt{3}}{2} \quad \text{vs} \quad P = \frac{a^2\sqrt{3}}{4}",
            caption="Wysokość ma w mianowniku 2 i bok w pierwszej potędze. Pole ma w mianowniku 4 i bok podniesiony do kwadratu.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zapisanie $P = \frac{a^2\sqrt{3}}{2}$ lub $h = \frac{a\sqrt{3}}{4}$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Wysokość dzieli przez 2, pole dzieli przez 4', 'color': C_SUCCESS},
                {'label': 'Jednostki', 'value': r'h to wymiar liniowy [cm], P to wymiar kwadratowy [cm²]', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L15.2: Twierdzenie Talesa i proste równoległe
        tab0 = make_geometry_diagram(
            title="Twierdzenie Talesa i proste równoległe",
            badge=r"\frac{|AD|}{|AB|} = \frac{|AE|}{|AC|} = \frac{|DE|}{|BC|} \quad (DE \parallel BC)",
            caption="Jeżeli ramiona kąta przetniemy prostymi równoległymi, to odcinki wyznaczone na jednym ramieniu są proporcjonalne do odpowiednich odcinków na drugim ramieniu.",
            segments=[
                {'from': [80, 220], 'to': [440, 220], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [80, 220], 'to': [380, 50], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [230, 220], 'to': [200, 152], 'color': C_PRIMARY, 'strokeWidth': 2.5},
                {'from': [380, 220], 'to': [320, 84], 'color': C_SUCCESS, 'strokeWidth': 2.5}
            ],
            points=[
                {'x': 80, 'y': 220, 'color': C_PRIMARY, 'label': 'A', 'attach': 'sw'},
                {'x': 230, 'y': 220, 'color': C_SLATE, 'label': 'D', 'attach': 's'},
                {'x': 380, 'y': 220, 'color': C_SLATE, 'label': 'B', 'attach': 'se'},
                {'x': 200, 'y': 152, 'color': C_PRIMARY, 'label': 'E', 'attach': 'nw'},
                {'x': 320, 'y': 84, 'color': C_SUCCESS, 'label': 'C', 'attach': 'ne'}
            ],
            labels=[
                {'x': 155, 'y': 238, 'text': '|AD|', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 305, 'y': 238, 'text': '|DB|', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 225, 'y': 175, 'text': 'DE', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 365, 'y': 135, 'text': 'BC', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'}
            ],
            metrics=[
                {'label': 'Warunek równoległości', 'value': r'$DE \parallel BC$', 'color': C_PRIMARY},
                {'label': 'Proporcja ramion', 'value': r'$\frac{|AD|}{|DB|} = \frac{|AE|}{|EC|}$', 'color': C_SKY},
                {'label': 'Proporcja podstaw', 'value': r'$\frac{|DE|}{|BC|} = \frac{|AD|}{|AB|}$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie brakującej długości z twierdzenia Talesa krok po kroku",
            badge=r"\frac{x}{6} = \frac{4}{8} \longrightarrow 8x = 24 \longrightarrow x = 3",
            caption="Układasz proporcję 'krótki do długiego' i mnożysz na krzyż.",
            steps=[
                {'num': 1, 'title': 'Zidentyfikuj odcinki odpowiadające', 'desc': r'Odcinek $x$ odpowiada odcinkowi $4$, a podstawa $6$ odpowiada podstawie $8$.', 'color': C_SKY},
                {'num': 2, 'title': 'Ułóż proporcję Talesa', 'desc': r'$\frac{x}{6} = \frac{4}{8} = \frac{1}{2}$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz x mnożąc na krzyż', 'desc': r'$2x = 6 \longrightarrow x = 3$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Odcinek lewy', 'value': '$x = 3$', 'color': C_SKY},
                {'label': 'Skala proporcji', 'value': r'$k = \frac{1}{2}$', 'color': C_PRIMARY},
                {'label': 'Podstawa', 'value': '$6$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie całego ramienia z jego dolnym fragmentem",
            badge=r"\frac{|DE|}{|BC|} = \frac{|AD|}{|AB|} \neq \frac{|AD|}{|DB|}",
            caption="Dla podstaw trójkątów (odcinki równoległe) proporcja wymaga CAŁEGO boku dużego trójkąta |AB|, a nie tylko dolnego kawałka |DB|!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zapisanie $\frac{|DE|}{|BC|} = \frac{|AD|}{|DB|}$ (fałszywa proporcja)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Dla podstaw zawsze: $\frac{\text{mała podstawa}}{\text{duża podstawa}} = \frac{\text{małe ramię}}{\text{CAŁE ramię}}$', 'color': C_SUCCESS},
                {'label': 'Całe ramię', 'value': r'$|AB| = |AD| + |DB|$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L15.3: Cechy podobieństwa trójkątów i skala podobieństwa pól
        tab0 = make_geometry_diagram(
            title="Cechy podobieństwa trójkątów i skala podobieństwa",
            badge=r"\frac{a_2}{a_1} = k \longrightarrow \frac{\text{Obw}_2}{\text{Obw}_1} = k, \quad \frac{P_2}{P_1} = k^2",
            caption="Dwa trójkąty są podobne, gdy mają równe kąty (cecha KKK) lub proporcjonalne boki. Stosunek ich pól wynosi kwadrat skali podobieństwa!",
            polygons=[
                {
                    'points': [[80, 210], [180, 210], [140, 130]],
                    'fill': 'rgba(56, 189, 248, 0.08)',
                    'stroke': C_SKY,
                    'strokeWidth': 2
                },
                {
                    'points': [[240, 210], [440, 210], [360, 50]],
                    'fill': 'rgba(255, 184, 0, 0.08)',
                    'stroke': C_PRIMARY,
                    'strokeWidth': 2.5
                }
            ],
            labels=[
                {'x': 130, 'y': 175, 'text': 'T₁ (pole P₁)', 'color': C_SKY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 340, 'y': 140, 'text': 'T₂ (pole P₂ = k² · P₁)', 'color': C_PRIMARY, 'fontSize': 13, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 130, 'y': 228, 'text': 'bok a₁', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 340, 'y': 228, 'text': 'bok a₂ = k · a₁', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Skala liniowa', 'value': r'$k = \frac{a_2}{a_1}$', 'color': C_SKY},
                {'label': 'Stosunek obwodów', 'value': r'$\frac{\text{Obw}_2}{\text{Obw}_1} = k$', 'color': C_SUCCESS},
                {'label': 'Stosunek pól', 'value': r'$\frac{P_2}{P_1} = k^2$', 'color': C_DANGER}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Zastosowanie skali podobieństwa do pól krok po kroku",
            badge=r"k = 2 \longrightarrow \frac{P_2}{P_1} = 2^2 = 4 \longrightarrow P_2 = 4 \cdot 30 = 120",
            caption="Matura maj 2023: trójkąty prostokątne T1 i T2. Znając boki T1 (5, 12, 13) wyznaczamy pole T1 = 30, stąd k² = 120/30 = 4, czyli k = 2.",
            steps=[
                {'num': 1, 'title': 'Oblicz pole trójkąta T1', 'desc': r'$P_1 = \frac{1}{2} \cdot 5 \cdot 12 = 30$.', 'color': C_SKY},
                {'num': 2, 'title': 'Wyznacz kwadrat skali podobieństwa', 'desc': r'$\frac{P_2}{P_1} = \frac{120}{30} = 4 = k^2 \longrightarrow k = 2$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz boki trójkąta T2', 'desc': r'Boki $T_2$ to: $5 \cdot 2 = 10, \; 12 \cdot 2 = 24, \; 13 \cdot 2 = 26$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Pole T1', 'value': '$P_1 = 30$', 'color': C_SKY},
                {'label': 'Skala pól', 'value': r'$k^2 = 4 \longrightarrow k = 2$', 'color': C_PRIMARY},
                {'label': 'Przeciwprostokątna T2', 'value': '$c_2 = 26$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie skali boków ze skalą pól",
            badge=r"\frac{P_2}{P_1} = k^2 \neq k",
            caption="Jeśli boki zwiększają się 3 razy, to pole zwiększa się 3² = 9 razy, a NIE 3 razy! To jedna z najczęstszych pomyłek na maturze.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Założenie, że pole rośnie $k$ razy (np. dwukrotnie zamiast 4 razy)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Boki, obwody, promienie, wysokości rosną $k$ razy; POLA rosną $k^2$ razy', 'color': C_SUCCESS},
                {'label': 'Stereometria', 'value': r'Objętości brył podobnych rosną aż $k^3$ razy!', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
