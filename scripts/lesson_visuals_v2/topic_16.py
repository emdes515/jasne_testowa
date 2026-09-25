"""
topic_16.py - Dział 16: Planimetria – Czworokąty oraz Okrąg i Koło (3 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_16_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L16.1: Własności czworokątów: trapez, równoległobok i romb
        tab0 = make_geometry_diagram(
            title="Własności trapezu, równoległoboku i rombu",
            badge=r"P = \frac{a + b}{2} \cdot h \quad | \quad \alpha + \beta = 180^\circ \quad | \quad P_{\text{romb}} = \frac{e \cdot f}{2}",
            caption="W każdym trapezie suma miar kątów przy tym samym ramieniu wynosi 180 stopni. Przekątne rombu przecinają się pod kątem prostym.",
            polygons=[
                {
                    'points': [[80, 210], [420, 210], [320, 80], [160, 80]],
                    'fill': 'rgba(255, 184, 0, 0.08)',
                    'stroke': C_PRIMARY,
                    'strokeWidth': 2.5
                }
            ],
            segments=[
                {'from': [160, 80], 'to': [160, 210], 'color': C_SKY, 'strokeWidth': 2, 'dashed': True},
                {'from': [160, 195], 'to': [175, 195], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [175, 195], 'to': [175, 210], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            arcs=[
                {
                    'cx': 80, 'cy': 210, 'r': 35, 'startAngleDeg': -52, 'endAngleDeg': 0,
                    'color': C_SUCCESS, 'label': r'\alpha'
                },
                {
                    'cx': 160, 'cy': 80, 'r': 35, 'startAngleDeg': 0, 'endAngleDeg': 128,
                    'color': C_PURPLE, 'label': r'\beta'
                }
            ],
            points=[
                {'x': 80, 'y': 210, 'color': C_PRIMARY, 'label': 'A', 'attach': 'sw'},
                {'x': 420, 'y': 210, 'color': C_PRIMARY, 'label': 'B', 'attach': 'se'},
                {'x': 320, 'y': 80, 'color': C_PRIMARY, 'label': 'C', 'attach': 'ne'},
                {'x': 160, 'y': 80, 'color': C_PRIMARY, 'label': 'D', 'attach': 'nw'}
            ],
            labels=[
                {'x': 250, 'y': 230, 'text': 'dolna podstawa a', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 240, 'y': 70, 'text': 'górna podstawa b', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 145, 'y': 145, 'text': 'wysokość h', 'color': C_SKY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'end'}
            ],
            metrics=[
                {'label': 'Pole trapezu', 'value': r'$P = \frac{a + b}{2} \cdot h$', 'color': C_PRIMARY},
                {'label': 'Kąty przy ramieniu', 'value': r'$\alpha + \beta = 180^\circ$', 'color': C_SUCCESS},
                {'label': 'Pole rombu', 'value': r'$P = \frac{e \cdot f}{2} = a^2\sin\alpha$', 'color': C_PURPLE}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Obliczanie kątów i pola trapezu prostokątnego krok po kroku",
            badge=r"a = 8, \; b = 5, \; \alpha = 45^\circ \longrightarrow x = 8 - 5 = 3 \longrightarrow h = 3 \longrightarrow P = \frac{8 + 5}{2} \cdot 3 = 19{,}5",
            caption="W trapezie prostokątnym opuszczamy wysokość z wierzchołka górnej podstawy, tworząc trójkąt prostokątny.",
            steps=[
                {'num': 1, 'title': 'Wyznacz odcinek x na dolnej podstawie', 'desc': r'$x = a - b = 8 - 5 = 3$.', 'color': C_SKY},
                {'num': 2, 'title': 'Oblicz wysokość z trójkąta 45°', 'desc': r'Dla kąta $45^\circ$: $h = x = 3$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Podstaw do wzoru na pole', 'desc': r'$P = \frac{8 + 5}{2} \cdot 3 = \frac{13}{2} \cdot 3 = 19{,}5$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Różnica podstaw', 'value': '$x = 3$', 'color': C_SKY},
                {'label': 'Wysokość trapezu', 'value': '$h = 3$', 'color': C_PRIMARY},
                {'label': 'Pole trapezu', 'value': '$P = 19{,}5$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Sumowanie kątów przy podstawie zamiast przy ramieniu",
            badge=r"\alpha + \beta = 180^\circ \quad (\text{przy tym samym ramieniu!}) \neq \text{kąty przy podstawie}",
            caption="W trapezie kąty sumują się do 180° TYLKO przy ramieniu (z własności prostych równoległych). Przy podstawie kąty są równe wyłącznie w trapezie równoramiennym.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Założenie, że suma kątów przy podstawie wynosi $180^\circ$', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Suma $180^\circ$ dotyczy kątów leżących wzdłuż tego samego ramienia: $\angle A + \angle D = 180^\circ$', 'color': C_SUCCESS},
                {'label': 'Równoległobok', 'value': r'Przeciwległe kąty są równe: $\alpha = \gamma, \; \beta = \delta$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L16.2: Kąty wpisane i środkowe
        tab0 = make_geometry_diagram(
            title="Kąt wpisany i środkowy oparte na tym samym łuku",
            badge=r"\beta = 2\alpha \quad | \quad \alpha = \frac{1}{2}\beta \quad | \quad \text{Kąt wpisany na średnicy: } 90^\circ",
            caption="Kąt środkowy ma wierzchołek w środku okręgu i miarę dwukrotnie większą od kąta wpisanego opartego na tym samym łuku.",
            circles=[
                {'cx': 260, 'cy': 140, 'r': 100, 'stroke': C_SLATE, 'fill': 'rgba(14, 21, 34, 0.4)', 'strokeWidth': 2}
            ],
            segments=[
                {'from': [260, 140], 'to': [175, 192], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [260, 140], 'to': [345, 192], 'color': C_PRIMARY, 'strokeWidth': 2},
                {'from': [260, 40], 'to': [175, 192], 'color': C_SUCCESS, 'strokeWidth': 2},
                {'from': [260, 40], 'to': [345, 192], 'color': C_SUCCESS, 'strokeWidth': 2}
            ],
            arcs=[
                {
                    'cx': 260, 'cy': 140, 'r': 26, 'startAngleDeg': 31, 'endAngleDeg': 149,
                    'color': C_PRIMARY, 'label': r'\beta = 2\alpha'
                },
                {
                    'cx': 260, 'cy': 40, 'r': 30, 'startAngleDeg': 59, 'endAngleDeg': 121,
                    'color': C_SUCCESS, 'label': r'\alpha'
                }
            ],
            points=[
                {'x': 260, 'y': 140, 'color': C_PRIMARY, 'label': 'S (środek)', 'attach': 'n'},
                {'x': 260, 'y': 40, 'color': C_SUCCESS, 'label': 'C (wpisany)', 'attach': 'n'},
                {'x': 175, 'y': 192, 'color': C_SLATE, 'label': 'A', 'attach': 'sw'},
                {'x': 345, 'y': 192, 'color': C_SLATE, 'label': 'B', 'attach': 'se'}
            ],
            metrics=[
                {'label': 'Kąt wpisany', 'value': r'$\alpha = \frac{1}{2}\beta$', 'color': C_SUCCESS},
                {'label': 'Kąt środkowy', 'value': r'$\beta = 2\alpha$', 'color': C_PRIMARY},
                {'label': 'Kąt na średnicy', 'value': r'$90^\circ$ (zawsze kąt prosty)', 'color': C_SKY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie kąta środkowego i wpisanego krok po kroku",
            badge=r"\beta - \alpha = 40^\circ \longrightarrow 2\alpha - \alpha = 40^\circ \longrightarrow \alpha = 40^\circ, \quad \beta = 80^\circ",
            caption="Matura sierpień 2023: różnica miar kąta środkowego i wpisanego opartego na tym samym łuku.",
            steps=[
                {'num': 1, 'title': 'Zastosuj zależność między kątami', 'desc': r'Kąt środkowy to dwukrotność kąta wpisanego: $\beta = 2\alpha$.', 'color': C_SKY},
                {'num': 2, 'title': 'Podstaw do podanego równania', 'desc': r'$2\alpha - \alpha = 40^\circ \longrightarrow \alpha = 40^\circ$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz miarę kąta środkowego', 'desc': r'$\beta = 2 \cdot 40^\circ = 80^\circ$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Kąt wpisany alfa', 'value': r'$\alpha = 40^\circ$', 'color': C_SKY},
                {'label': 'Kąt środkowy beta', 'value': r'$\beta = 80^\circ$', 'color': C_PRIMARY},
                {'label': 'Weryfikacja', 'value': r'$80^\circ - 40^\circ = 40^\circ$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Kąty oparte na różnych łukach lub odwrócenie proporcji",
            badge=r"\beta = 2\alpha \quad (\text{środkowy jest WIĘKSZY!}) \neq \alpha = 2\beta",
            caption="Kąt środkowy jest zawsze DWA RAZY WIĘKSZY od kąta wpisanego. Pamiętaj też: reguła działa WYŁĄCZNIE, gdy oba kąty są oparte na TYM SAMYM łuku!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Pomnożenie kąta środkowego przez 2 zamiast podzielenia', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Środek okręgu to "szeroki widok" ($\beta = 2\alpha$), brzeg okręgu to "wąski kąt" ($\alpha = \frac{\beta}{2}$)', 'color': C_SUCCESS},
                {'label': 'Kąt na średnicy', 'value': r'Średnica to kąt środkowy $180^\circ \longrightarrow$ wpisany ma $90^\circ$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L16.3: Styczna do okręgu oraz okrąg wpisany i opisany na trójkącie
        tab0 = make_geometry_diagram(
            title="Styczna do okręgu oraz okręgi wpisane i opisane",
            badge=r"r \perp k \quad (\text{promień prostopadły do stycznej}) \quad | \quad R = \frac{c}{2}, \quad r = \frac{a + b - c}{2}",
            caption="Styczna do okręgu tworzy z promieniem poprowadzonym do punktu styczności kąt prosty 90 stopni. W trójkącie prostokątnym środek okręgu opisanego leży na środku przeciwprostokątnej.",
            circles=[
                {'cx': 220, 'cy': 140, 'r': 70, 'stroke': C_SKY, 'fill': 'rgba(14, 21, 34, 0.4)', 'strokeWidth': 2}
            ],
            segments=[
                {'from': [40, 210], 'to': [440, 210], 'color': C_PRIMARY, 'strokeWidth': 2.5},
                {'from': [220, 140], 'to': [220, 210], 'color': C_SUCCESS, 'strokeWidth': 2},
                {'from': [220, 195], 'to': [235, 195], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [235, 195], 'to': [235, 210], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            points=[
                {'x': 220, 'y': 140, 'color': C_SKY, 'label': 'S (środek)', 'attach': 'n'},
                {'x': 220, 'y': 210, 'color': C_SUCCESS, 'label': 'P (punkt styczności)', 'attach': 's'}
            ],
            labels=[
                {'x': 235, 'y': 175, 'text': 'promień r', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 380, 'y': 228, 'text': 'prosta styczna k', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'}
            ],
            metrics=[
                {'label': 'Kąt ze styczną', 'value': r'$90^\circ$ (promień prostopadły do stycznej)', 'color': C_PRIMARY},
                {'label': 'Promień opisanego R', 'value': r'$R = \frac{c}{2}$ (dla $\triangle$ prostokątnego)', 'color': C_SKY},
                {'label': 'Promień wpisanego r', 'value': r'$r = \frac{a + b - c}{2}$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie promienia wpisanego i opisanego trójkąta prostokątnego krok po kroku",
            badge=r"a = 6, \; b = 8 \longrightarrow c = 10 \longrightarrow R = \frac{10}{2} = 5, \quad r = \frac{6 + 8 - 10}{2} = 2",
            caption="W trójkącie prostokątnym o bokach 6, 8, 10 wyznaczamy oba promienie wprost ze wzorów z Karty Wzorów CKE.",
            steps=[
                {'num': 1, 'title': 'Oblicz przeciwprostokątną z tw. Pitagorasa', 'desc': r'$c = \sqrt{6^2 + 8^2} = \sqrt{100} = 10$.', 'color': C_SKY},
                {'num': 2, 'title': 'Oblicz promień opisanego R', 'desc': r'$R = \frac{c}{2} = \frac{10}{2} = 5$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz promień wpisanego r', 'desc': r'$r = \frac{6 + 8 - 10}{2} = \frac{4}{2} = 2$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Przeciwprostokątna', 'value': '$c = 10$', 'color': C_SKY},
                {'label': 'Promień okręgu opisanego', 'value': '$R = 5$', 'color': C_PRIMARY},
                {'label': 'Promień okręgu wpisanego', 'value': '$r = 2$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie promienia ze średnicą lub pominięcie kąta 90°",
            badge=r"d = 2r \quad | \quad r \perp k",
            caption="W zadaniach maturalnych CKE często podaje średnicę d = 2r, a do wzorów podstawiamy promień r! Zwracaj szczególną uwagę na treść.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Podstawienie średnicy zamiast promienia do wzorów na pole lub promień', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Od razu zapisz: $r = \frac{d}{2}$', 'color': C_SUCCESS},
                {'label': 'Punkt styczności', 'value': r'Kąt między promieniem a styczną ZAWSZE wynosi $90^\circ$', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
