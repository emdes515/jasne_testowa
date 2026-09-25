"""
topic_18.py - Dział 18: Stereometria (Geometria Przestrzenna 2.5D) (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_stereometry_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_18_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L18.1: Graniastosłupy i prostopadłościany
        tab0 = make_stereometry_diagram(
            title="Przekątna prostopadłościanu i kąt nachylenia do podstawy",
            badge=r"D = \sqrt{a^2 + b^2 + c^2}, \quad d_p = \sqrt{a^2 + b^2}, \quad V = a \cdot b \cdot c, \quad P_c = 2(ab + bc + ac)",
            caption="Przekątna prostopadłościanu D tworzy z przekątną podstawy d_p trójkąt prostokątny o przyprostokątnych d_p i wysokości c.",
            segments=[
                # Podstawa dolna ABCD (ABCD: A(140,210), B(320,210), C(380,165), D(200,165))
                {'from': [140, 210], 'to': [320, 210], 'color': C_PRIMARY, 'strokeWidth': 2}, # AB
                {'from': [320, 210], 'to': [380, 165], 'color': C_PRIMARY, 'strokeWidth': 2}, # BC
                {'from': [380, 165], 'to': [200, 165], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True}, # CD (niewidoczna)
                {'from': [200, 165], 'to': [140, 210], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True}, # DA (niewidoczna)
                # Krawędzie boczne
                {'from': [140, 210], 'to': [140, 95], 'color': C_PRIMARY, 'strokeWidth': 2}, # AA'
                {'from': [320, 210], 'to': [320, 95], 'color': C_PRIMARY, 'strokeWidth': 2}, # BB'
                {'from': [380, 165], 'to': [380, 50], 'color': C_PRIMARY, 'strokeWidth': 2}, # CC'
                {'from': [200, 165], 'to': [200, 50], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True}, # DD' (niewidoczna)
                # Podstawa górna A'B'C'D'
                {'from': [140, 95], 'to': [320, 95], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [320, 95], 'to': [380, 50], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [380, 50], 'to': [200, 50], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [200, 50], 'to': [140, 95], 'color': C_PRIMARY, 'strokeWidth': 2},
                # Przekątna podstawy AC (niewidoczna, płaszczyzna podstawy)
                {'from': [140, 210], 'to': [380, 165], 'color': C_SKY, 'strokeWidth': 1.8, 'dashed': True},
                # Przekątna bryły AC' (główna)
                {'from': [140, 210], 'to': [380, 50], 'color': C_SUCCESS, 'strokeWidth': 2.5}
            ],
            points=[
                {'x': 140, 'y': 210, 'color': C_PRIMARY, 'label': 'A', 'attach': 'sw'},
                {'x': 320, 'y': 210, 'color': C_PRIMARY, 'label': 'B', 'attach': 'se'},
                {'x': 380, 'y': 165, 'color': C_PRIMARY, 'label': 'C', 'attach': 'e'},
                {'x': 380, 'y': 50, 'color': C_SUCCESS, 'label': "C'", 'attach': 'ne'}
            ],
            labels=[
                {'x': 230, 'y': 225, 'text': 'krawędź a', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 365, 'y': 195, 'text': 'bok b', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 395, 'y': 110, 'text': 'wysokość c (H)', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 240, 'y': 110, 'text': r'przekątna D', 'color': C_SUCCESS, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'end'}
            ],
            metrics=[
                {'label': 'Przekątna podstawy', 'value': r'$d_p = \sqrt{a^2 + b^2}$', 'color': C_SKY},
                {'label': 'Przekątna prostopadłościanu', 'value': r'$D = \sqrt{a^2 + b^2 + c^2}$', 'color': C_SUCCESS},
                {'label': 'Objętość bryły', 'value': r'$V = a \cdot b \cdot c$', 'color': C_PRIMARY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Obliczanie przekątnej prostopadłościanu krok po kroku",
            badge=r"a = 3, \; b = 4, \; c = 12 \longrightarrow d_p = \sqrt{3^2 + 4^2} = 5 \longrightarrow D = \sqrt{5^2 + 12^2} = 13",
            caption="Stosujemy dwukrotnie twierdzenie Pitagorasa: najpierw w podstawie (dp = 5), a następnie w trójkącie pionowym z wysokością (D = 13).",
            steps=[
                {'num': 1, 'title': 'Oblicz przekątną podstawy dp', 'desc': r'$d_p = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$.', 'color': C_SKY},
                {'num': 2, 'title': 'Zastosuj twierdzenie Pitagorasa dla D', 'desc': r'$D = \sqrt{d_p^2 + c^2} = \sqrt{5^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wyznacz objętość bryły', 'desc': r'$V = a \cdot b \cdot c = 3 \cdot 4 \cdot 12 = 144$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Przekątna podstawy dp', 'value': '$5$', 'color': C_SKY},
                {'label': 'Przekątna bryły D', 'value': '$13$', 'color': C_PRIMARY},
                {'label': 'Objętość V', 'value': '$144$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie przekątnej ściany z przekątną bryły lub kąta nachylenia",
            badge=r"D = \sqrt{a^2 + b^2 + c^2} \neq \sqrt{a^2 + b^2} \quad (\text{przekątna ściany})",
            caption="Przekątna prostopadłościanu przechodzi przez środek całej bryły łącząc przeciwległe wierzchołki. Kąt nachylenia do podstawy tworzy ona z przekątną PODSTAWY, a nie z krawędzią boczną!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Mylenie kąta nachylenia do podstawy z kątem nachylenia do krawędzi bocznej', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Kąt nachylenia do podstawy leży w trójkącie prostokątnym o bokach: $d_p$, $H$, $D$', 'color': C_SUCCESS},
                {'label': 'Sześcian', 'value': r'Dla sześcianu o krawędzi $a$: $d_p = a\sqrt{2}, \; D = a\sqrt{3}$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L18.2: Ostrosłupy prawidłowe
        tab0 = make_stereometry_diagram(
            title="Ostrosłup prawidłowy i kluczowe trójkąty prostokątne",
            badge=r"V = \frac{1}{3}P_p \cdot H \quad | \quad H^2 + r^2 = h_b^2 \quad | \quad H^2 + R^2 = b^2",
            caption="W ostrosłupie prawidłowym spodek wysokości H pokrywa się ze środkiem okręgu wpisanego (promień r) i opisanego (promień R) na podstawie.",
            segments=[
                # Podstawa ABCD
                {'from': [140, 205], 'to': [320, 205], 'color': C_PRIMARY, 'strokeWidth': 2}, # AB
                {'from': [320, 205], 'to': [370, 160], 'color': C_PRIMARY, 'strokeWidth': 2}, # BC
                {'from': [370, 160], 'to': [190, 160], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True}, # CD
                {'from': [190, 160], 'to': [140, 205], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True}, # DA
                # Krawędzie boczne z wierzchołka S(255, 45)
                {'from': [255, 45], 'to': [140, 205], 'color': C_PRIMARY, 'strokeWidth': 2}, # SA
                {'from': [255, 45], 'to': [320, 205], 'color': C_PRIMARY, 'strokeWidth': 2}, # SB
                {'from': [255, 45], 'to': [370, 160], 'color': C_PRIMARY, 'strokeWidth': 2}, # SC
                {'from': [255, 45], 'to': [190, 160], 'color': C_SLATE, 'strokeWidth': 1.5, 'dashed': True}, # SD
                # Wysokość ostrosłupa SO (O = (255, 182))
                {'from': [255, 45], 'to': [255, 182], 'color': C_DANGER, 'strokeWidth': 2, 'dashed': True},
                # Promień r do ściany bocznej BC (środek krawędzi M = (345, 182))
                {'from': [255, 182], 'to': [345, 182], 'color': C_SKY, 'strokeWidth': 1.8, 'dashed': True},
                # Wysokość ściany bocznej SM
                {'from': [255, 45], 'to': [345, 182], 'color': C_SUCCESS, 'strokeWidth': 2}
            ],
            arcs=[
                # Kąt nachylenia krawędzi bocznej α (błękit #38BDF8)
                {'cx': 320, 'cy': 205, 'r': 22, 'startAngleDeg': 230, 'endAngleDeg': 285, 'color': '#38BDF8', 'label': r'\alpha'},
                # Kąt nachylenia ściany bocznej β (szmaragd #34D399)
                {'cx': 345, 'cy': 182, 'r': 20, 'startAngleDeg': 210, 'endAngleDeg': 270, 'color': '#34D399', 'label': r'\beta'}
            ],
            points=[
                {'x': 255, 'y': 45, 'color': C_PRIMARY, 'label': 'S (wierzchołek)', 'attach': 'n'},
                {'x': 255, 'y': 182, 'color': C_DANGER, 'label': 'O (spodek H)', 'attach': 's'},
                {'x': 345, 'y': 182, 'color': C_SUCCESS, 'label': 'M', 'attach': 'se'}
            ],
            labels=[
                {'x': 295, 'y': 215, 'text': 'R', 'color': '#38BDF8', 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 300, 'y': 175, 'text': 'kąt krawędzi α', 'color': '#38BDF8', 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 370, 'y': 150, 'text': 'kąt ściany β', 'color': '#34D399', 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 240, 'y': 115, 'text': 'wysokość H', 'color': C_DANGER, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'end'},
                {'x': 310, 'y': 105, 'text': r'wysokość ściany h_b', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 295, 'y': 195, 'text': 'promień r = a/2', 'color': C_SKY, 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Kąt krawędzi α (błękit)', 'value': r'$H^2 + R^2 = b^2$', 'color': '#38BDF8'},
                {'label': 'Kąt ściany β (szmaragd)', 'value': r'$H^2 + r^2 = h_b^2$', 'color': '#34D399'},
                {'label': 'Objętość ostrosłupa', 'value': r'$V = \frac{1}{3}P_p \cdot H$', 'color': C_PRIMARY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Obliczanie wysokości i objętości ostrosłupa prawidłowego czworokątnego krok po kroku",
            badge=r"a = 6, \; h_b = 5 \longrightarrow r = 3 \longrightarrow H = \sqrt{5^2 - 3^2} = 4 \longrightarrow V = \frac{1}{3} \cdot 36 \cdot 4 = 48",
            caption="W ostrosłupie czworokątnym promień r to połowa boku kwadratu: r = a/2 = 3. Z trójkąta prostokątnego wyznaczamy wysokość H = 4.",
            steps=[
                {'num': 1, 'title': 'Wyznacz promień r w podstawie', 'desc': r'W kwadracie o boku $a = 6$: $r = \frac{a}{2} = 3$.', 'color': C_SKY},
                {'num': 2, 'title': 'Oblicz wysokość bryły H', 'desc': r'$H = \sqrt{h_b^2 - r^2} = \sqrt{5^2 - 3^2} = \sqrt{25 - 9} = \sqrt{16} = 4$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz pole podstawy i objętość', 'desc': r'$P_p = 6^2 = 36 \longrightarrow V = \frac{1}{3} \cdot 36 \cdot 4 = 12 \cdot 4 = 48$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Promień r', 'value': '$r = 3$', 'color': C_SKY},
                {'label': 'Wysokość H', 'value': '$H = 4$', 'color': C_PRIMARY},
                {'label': 'Objętość V', 'value': '$V = 48$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zapominanie o ułamku 1/3 lub mylenie krawędzi z wysokością ściany",
            badge=r"V = \frac{1}{3}P_p \cdot H \neq P_p \cdot H \quad | \quad h_b \neq b",
            caption="Objętość ostrosłupa to ZAWSZE 1/3 pola podstawy i wysokości. Ponadto wysokość ściany bocznej hb jest krótsza od krawędzi bocznej b!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Pominięcie czynnika $\frac{1}{3}$ we wzorze na objętość ostrosłupa', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Mylenie wysokości ściany bocznej $h_b$ z krawędzią boczną $b$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Wysokość ściany $h_b$ łączy wierzchołek ze środkiem boku podstawy pod kątem $90^\circ$', 'color': C_SUCCESS}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L18.3: Bryły obrotowe: walec, stożek i kula
        tab0 = make_stereometry_diagram(
            title="Bryły obrotowe: walec, stożek i kula",
            badge=r"V_{\text{walec}} = \pi r^2 H, \quad V_{\text{stożek}} = \frac{1}{3}\pi r^2 H, \quad V_{\text{kula}} = \frac{4}{3}\pi R^3, \quad r^2 + H^2 = l^2",
            caption="Stożek powstaje z obrotu trójkąta prostokątnego wokół przyprostokątnej (tworząca l to przeciwprostokątna). Walec powstaje z obrotu prostokąta.",
            segments=[
                # Stożek: podstawa elipsa w osi x=260, y=200, rx=70, ry=20
                {'from': [190, 200], 'to': [260, 60], 'color': C_PRIMARY, 'strokeWidth': 2}, # tworząca lewa l
                {'from': [330, 200], 'to': [260, 60], 'color': C_PRIMARY, 'strokeWidth': 2}, # tworząca prawa l
                {'from': [260, 60], 'to': [260, 200], 'color': C_DANGER, 'strokeWidth': 2, 'dashed': True}, # wysokość H
                {'from': [260, 200], 'to': [330, 200], 'color': C_SUCCESS, 'strokeWidth': 2, 'dashed': True} # promień r
            ],
            circles=[
                {'cx': 260, 'cy': 200, 'r': 70, 'stroke': C_SLATE, 'fill': 'rgba(14, 21, 34, 0.4)', 'strokeWidth': 1.5, 'dashed': True}
            ],
            points=[
                {'x': 260, 'y': 60, 'color': C_PRIMARY, 'label': 'S (wierzchołek)', 'attach': 'n'},
                {'x': 260, 'y': 200, 'color': C_DANGER, 'label': 'O', 'attach': 'sw'},
                {'x': 330, 'y': 200, 'color': C_SUCCESS, 'label': 'B', 'attach': 'se'}
            ],
            labels=[
                {'x': 245, 'y': 130, 'text': 'H', 'color': C_DANGER, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'end'},
                {'x': 295, 'y': 215, 'text': 'promień r', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 305, 'y': 125, 'text': 'tworząca l', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'start'}
            ],
            metrics=[
                {'label': 'Tworząca stożka', 'value': r'$r^2 + H^2 = l^2$', 'color': C_PRIMARY},
                {'label': 'Objętość stożka', 'value': r'$V = \frac{1}{3}\pi r^2 H$', 'color': C_SKY},
                {'label': 'Pole boczne stożka', 'value': r'$P_b = \pi r l$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Obliczanie pola bocznego i objętości stożka krok po kroku",
            badge=r"r = 3, \; H = 4 \longrightarrow l = \sqrt{3^2 + 4^2} = 5 \longrightarrow V = \frac{1}{3}\pi \cdot 9 \cdot 4 = 12\pi, \quad P_b = \pi \cdot 3 \cdot 5 = 15\pi",
            caption="W przekroju osiowym stożka mamy trójkąt równoramienny o wysokości H i ramieniu l.",
            steps=[
                {'num': 1, 'title': 'Oblicz tworzącą l z twierdzenia Pitagorasa', 'desc': r'$l = \sqrt{r^2 + H^2} = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$.', 'color': C_SKY},
                {'num': 2, 'title': 'Oblicz objętość stożka', 'desc': r'$V = \frac{1}{3}\pi r^2 H = \frac{1}{3}\pi \cdot 3^2 \cdot 4 = \frac{1}{3}\pi \cdot 36 = 12\pi$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz pole powierzchni bocznej', 'desc': r'$P_b = \pi r l = \pi \cdot 3 \cdot 5 = 15\pi$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Tworząca l', 'value': '$l = 5$', 'color': C_SKY},
                {'label': 'Objętość stożka', 'value': r'$V = 12\pi$', 'color': C_PRIMARY},
                {'label': 'Pole boczne', 'value': r'$P_b = 15\pi$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie tworzącej stożka z wysokością lub pominięcie liczby pi",
            badge=r"P_b = \pi r l \neq \pi r H \quad | \quad V = \frac{4}{3}\pi R^3 \neq 4\pi R^3",
            caption="W polu powierzchni bocznej stożka ZAWSZE występuje tworząca l (odcinek skośny), a NIE wysokość H! Nie zapominaj też o dopisaniu liczby pi do wyniku.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD 1', 'value': r'Podstawienie wysokości $H$ zamiast tworzącej $l$ do $P_b = \pi r l$', 'color': C_DANGER},
                {'label': 'KARDYNALNY BŁĄD 2', 'value': r'Zgubienie liczby $\pi$ w ostatecznym wyniku', 'color': C_DANGER},
                {'label': 'Kula', 'value': r'Pole kuli to $4\pi R^2$, a objętość to $\frac{4}{3}\pi R^3$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
