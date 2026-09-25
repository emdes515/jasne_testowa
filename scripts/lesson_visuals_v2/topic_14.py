"""
topic_14.py - Dział 14: Trygonometria w Trójkącie Prostokątnym i Wzory Redukcyjne (4 lekcje | Tier S)
Nocturne Luminary + Core-4 Bento Visuals
100% Real KaTeX, 0% Emojis, Zero Mafs dependencies.
"""
from .common import (
    C_PRIMARY, C_SUCCESS, C_SKY, C_DANGER, C_PURPLE, C_SLATE, C_MUTED, C_TEXT,
    make_geometry_diagram, make_step_flow_diagram, make_comparison_card_diagram
)

def get_topic_14_visuals(l_idx):
    l_num = l_idx + 1

    if l_num == 1:
        # L14.1: Definicje funkcji trygonometrycznych w trójkącie prostokątnym
        tab0 = make_geometry_diagram(
            title="Funkcje trygonometryczne kąta ostrego w trójkącie prostokątnym",
            badge=r"\sin\alpha = \frac{a}{c}, \quad \cos\alpha = \frac{b}{c}, \quad \operatorname{tg}\alpha = \frac{a}{b}",
            caption="Wszystkie funkcje definiujemy jako stosunki odpowiednich boków względem kąta alfa: naprzeciwko (a), przy kącie (b) oraz przeciwprostokątnej (c).",
            polygons=[
                {
                    'points': [[120, 220], [380, 220], [380, 60]],
                    'fill': 'rgba(255, 184, 0, 0.08)',
                    'stroke': C_PRIMARY,
                    'strokeWidth': 2.5
                }
            ],
            segments=[
                {'from': [360, 220], 'to': [360, 200], 'color': C_SLATE, 'strokeWidth': 1.5},
                {'from': [360, 200], 'to': [380, 200], 'color': C_SLATE, 'strokeWidth': 1.5}
            ],
            arcs=[
                {
                    'cx': 120, 'cy': 220, 'r': 40, 'startAngleDeg': -32, 'endAngleDeg': 0,
                    'color': C_SUCCESS, 'label': r'\alpha'
                },
                {
                    'cx': 370, 'cy': 210, 'r': 2, 'startAngleDeg': 0, 'endAngleDeg': 360,
                    'color': C_SLATE, 'showRightAngleDot': True
                }
            ],
            points=[
                {'x': 120, 'y': 220, 'color': C_SUCCESS, 'label': 'A', 'attach': 'sw'},
                {'x': 380, 'y': 220, 'color': C_SLATE, 'label': 'C (90°)', 'attach': 'se'},
                {'x': 380, 'y': 60, 'color': C_SKY, 'label': 'B', 'attach': 'ne'}
            ],
            labels=[
                {'x': 250, 'y': 238, 'text': 'przyprostokątna przy kącie b', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 395, 'y': 140, 'text': 'przyprostokątna naprzeciw a', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 235, 'y': 125, 'text': 'przeciwprostokątna c', 'color': C_SUCCESS, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'end'}
            ],
            metrics=[
                {'label': 'Sinus kąta', 'value': r'$\sin\alpha = \frac{\text{naprzeciw}}{\text{przeciwprostokątna}} = \frac{a}{c}$', 'color': C_PRIMARY},
                {'label': 'Cosinus kąta', 'value': r'$\cos\alpha = \frac{\text{przy kącie}}{\text{przeciwprostokątna}} = \frac{b}{c}$', 'color': C_SKY},
                {'label': 'Tangens kąta', 'value': r'$\operatorname{tg}\alpha = \frac{\text{naprzeciw}}{\text{przy kącie}} = \frac{a}{b}$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Wyznaczanie funkcji trygonometrycznych z twierdzenia Pitagorasa krok po kroku",
            badge=r"a = 3, \quad c = 5 \implies b = \sqrt{5^2 - 3^2} = 4 \implies \sin\alpha = \frac{3}{5}, \quad \cos\alpha = \frac{4}{5}",
            caption="Mając dwa boki trójkąta prostokątnego, trzeci bok zawsze obliczasz z twierdzenia Pitagorasa.",
            steps=[
                {'num': 1, 'title': 'Zastosuj twierdzenie Pitagorasa', 'desc': r'$a^2 + b^2 = c^2 \implies 3^2 + b^2 = 5^2 \implies 9 + b^2 = 25$.', 'color': C_SKY},
                {'num': 2, 'title': 'Oblicz brakujący bok b', 'desc': r'$b^2 = 16 \implies b = 4$ (długość boku jest zawsze dodatnia).', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Zapisz wartości funkcji', 'desc': r'$\sin\alpha = \frac{3}{5}, \quad \cos\alpha = \frac{4}{5}, \quad \operatorname{tg}\alpha = \frac{3}{4}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Przyprostokątne', 'value': '$a = 3, \; b = 4$', 'color': C_SKY},
                {'label': 'Przeciwprostokątna', 'value': '$c = 5$', 'color': C_PRIMARY},
                {'label': 'Tangens alfa', 'value': r'$\operatorname{tg}\alpha = \frac{3}{4}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie przyprostokątnej leżącej naprzeciw z przyległą",
            badge=r"\sin\alpha = \frac{a}{c} \neq \frac{b}{c} \quad (\cos\alpha \text{ to bok PRZY kącie!})",
            caption="Zawsze patrz, gdzie leży kąt alfa. Sinus to zawsze bok leżący DALEJ (naprzeciwko kąta), podzielony przez najdłuższy bok.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zapisanie $\sin\alpha = \frac{b}{c}$ (pomylenie z cosinusem)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Wskaż palcem kąt $\alpha \longrightarrow$ bok naprzeciw to licznik sinusa', 'color': C_SUCCESS},
                {'label': 'Złota zasada', 'value': r'$\sin\alpha < 1$ oraz $\cos\alpha < 1$ dla kątów ostrych', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 2:
        # L14.2: Tabela wartości i tożsamości trygonometryczne
        tab0 = make_step_flow_diagram(
            title="Kluczowe tożsamości trygonometryczne CKE",
            badge=r"\sin^2\alpha + \cos^2\alpha = 1 \quad | \quad \operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}",
            caption="Jedynka trygonometryczna pozwala wyznaczyć jedną funkcję, gdy znasz drugą. Dla kąta ostrego wartości są zawsze dodatnie.",
            steps=[
                {'num': 1, 'title': 'Jedynka trygonometryczna', 'desc': r'$\sin^2\alpha + \cos^2\alpha = 1$ (Karta Wzorów CKE str. 14).', 'color': C_PRIMARY},
                {'num': 2, 'title': 'Definicja tangensa', 'desc': r'$\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}$ dla $\cos\alpha \neq 0$.', 'color': C_SKY},
                {'num': 3, 'title': 'Wartości kątów 30°, 45°, 60°', 'desc': r'$\sin 30^\circ = \frac{1}{2}, \; \sin 45^\circ = \frac{\sqrt{2}}{2}, \; \sin 60^\circ = \frac{\sqrt{3}}{2}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Jedynka trygonometryczna', 'value': r'$\sin^2\alpha + \cos^2\alpha = 1$', 'color': C_PRIMARY},
                {'label': 'Tangens', 'value': r'$\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}$', 'color': C_SKY},
                {'label': 'Znak dla kąta ostrego', 'value': r'$\sin\alpha > 0, \; \cos\alpha > 0$', 'color': C_SUCCESS}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Obliczanie sinusa z danej wartości cosinusa krok po kroku",
            badge=r"\cos\alpha = \frac{24}{25} \implies \sin^2\alpha = 1 - \left(\frac{24}{25}\right)^2 = \frac{49}{625} \implies \sin\alpha = \frac{7}{25}",
            caption="Wykorzystujemy tożsamość pitagorejską sin²α + cos²α = 1 i pierwiastkujemy wynik z dodatnim znakiem dla kąta ostrego.",
            steps=[
                {'num': 1, 'title': 'Podstaw do jedynki trygonometrycznej', 'desc': r'$\sin^2\alpha + \left(\frac{24}{25}\right)^2 = 1 \implies \sin^2\alpha + \frac{576}{625} = 1$.', 'color': C_SKY},
                {'num': 2, 'title': 'Odejmij ułamek od jedynki', 'desc': r'$\sin^2\alpha = \frac{625}{625} - \frac{576}{625} = \frac{49}{625}$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Wyciągnij pierwiastek', 'desc': r'Dla kąta ostrego $\sin\alpha > 0$, stąd $\sin\alpha = \sqrt{\frac{49}{625}} = \frac{7}{25}$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Cosinus', 'value': r'$\cos\alpha = \frac{24}{25}$', 'color': C_SKY},
                {'label': 'Kwadrat sinusa', 'value': r'$\sin^2\alpha = \frac{49}{625}$', 'color': C_PRIMARY},
                {'label': 'Sinus alfa', 'value': r'$\sin\alpha = \frac{7}{25}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Zapominanie o kwadratach lub błędne podnoszenie do potęgi",
            badge=r"\sin^2\alpha + \cos^2\alpha = 1 \neq \sin\alpha + \cos\alpha",
            caption="Suma sinusa i cosinusa NIE wynosi 1! Jedynka zachodzi wyłącznie dla sumy KWADRATÓW.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Zapisanie $\sin\alpha + \cos\alpha = 1$ (brak kwadratów)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Zawsze podnoś ułamek do kwadratu: $(\frac{a}{b})^2 = \frac{a^2}{b^2}$', 'color': C_SUCCESS},
                {'label': 'Kąt ostry', 'value': r'Zawsze wybieraj znak dodatni przy pierwiastkowaniu', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 3:
        # L14.3: Wzory redukcyjne i twierdzenie cosinusów
        tab0 = make_geometry_diagram(
            title="Wzory redukcyjne dla kątów rozwartych i twierdzenie cosinusów",
            badge=r"\sin(180^\circ - \alpha) = \sin\alpha, \quad \cos(180^\circ - \alpha) = -\cos\alpha, \quad c^2 = a^2 + b^2 - 2ab\cos\gamma",
            caption="Sinus kąta rozwartego jest dodatni, a cosinus ujemny. Twierdzenie cosinusów to uogólnienie twierdzenia Pitagorasa.",
            polygons=[
                {
                    'points': [[80, 210], [320, 210], [220, 80]],
                    'fill': 'rgba(56, 189, 248, 0.08)',
                    'stroke': C_SKY,
                    'strokeWidth': 2.5
                }
            ],
            arcs=[
                {
                    'cx': 80, 'cy': 210, 'r': 35, 'startAngleDeg': -52, 'endAngleDeg': 0,
                    'color': C_PRIMARY, 'label': r'\gamma'
                }
            ],
            points=[
                {'x': 80, 'y': 210, 'color': C_PRIMARY, 'label': 'A', 'attach': 'sw'},
                {'x': 320, 'y': 210, 'color': C_SLATE, 'label': 'B', 'attach': 'se'},
                {'x': 220, 'y': 80, 'color': C_SUCCESS, 'label': 'C', 'attach': 'n'}
            ],
            labels=[
                {'x': 200, 'y': 228, 'text': 'bok c', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 140, 'y': 140, 'text': 'bok b', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'end'},
                {'x': 280, 'y': 140, 'text': 'bok a', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'start'}
            ],
            metrics=[
                {'label': 'Sinus rozwarty', 'value': r'$\sin(180^\circ - \alpha) = \sin\alpha > 0$', 'color': C_SUCCESS},
                {'label': 'Cosinus rozwarty', 'value': r'$\cos(180^\circ - \alpha) = -\cos\alpha < 0$', 'color': C_DANGER},
                {'label': 'Twierdzenie cosinusów', 'value': r'$c^2 = a^2 + b^2 - 2ab\cos\gamma$', 'color': C_PRIMARY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Twierdzenie cosinusów w praktyce krok po kroku",
            badge=r"a = 5, \; b = 2, \; \cos\gamma = \frac{3}{5} \implies c^2 = 5^2 + 2^2 - 2 \cdot 5 \cdot 2 \cdot \frac{3}{5} = 25 + 4 - 12 = 17 \implies c = \sqrt{17}",
            caption="Obliczamy trzeci bok trójkąta znając dwa boki i cosinus kąta między nimi (zadanie z matury CKE).",
            steps=[
                {'num': 1, 'title': 'Zapisz twierdzenie cosinusów', 'desc': r'$c^2 = a^2 + b^2 - 2ab\cos\gamma$.', 'color': C_SKY},
                {'num': 2, 'title': 'Podstaw dane liczbowe', 'desc': r'$c^2 = 5^2 + 2^2 - 2 \cdot 5 \cdot 2 \cdot \frac{3}{5} = 29 - 12 = 17$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz długość boku c', 'desc': r'$c = \sqrt{17}$ (bok trójkąta $c > 0$).', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Suma kwadratów', 'value': '$5^2 + 2^2 = 29$', 'color': C_SKY},
                {'label': 'Iloczyn 2ab cos γ', 'value': '$2 \\cdot 5 \\cdot 2 \\cdot \\frac{3}{5} = 12$', 'color': C_PRIMARY},
                {'label': 'Długość boku c', 'value': '$c = \\sqrt{17}$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Znak minus przy cosinusie kąta rozwartego",
            badge=r"\cos 150^\circ = -\cos(180^\circ - 150^\circ) = -\cos 30^\circ = -\frac{\sqrt{3}}{2}",
            caption="W twierdzeniu cosinusów dla kąta rozwartego minus z wzoru i minus z cosinusa dają PLUS!",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Przyjęcie $\cos 150^\circ = +\frac{\sqrt{3}}{2}$ (brak minusa)', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'$\cos(\text{rozwarty}) < 0$, stąd $-2ab(-\cos\alpha) = +2ab\cos\alpha$', 'color': C_SUCCESS},
                {'label': 'Sinus kąta rozwartego', 'value': r'$\sin 150^\circ = \sin 30^\circ = +\frac{1}{2}$ (zawsze dodatni)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    elif l_num == 4:
        # L14.4: Wzór na pole trójkąta z sinusem kąta
        tab0 = make_geometry_diagram(
            title="Wzór na pole trójkąta z sinusem kąta",
            badge=r"P = \frac{1}{2}ab\sin\gamma \quad | \quad P_{\text{romb}} = a^2\sin\alpha",
            caption="Pole trójkąta to połowa iloczynu dwóch boków i sinusa kąta zawartego między nimi. Dla rombu lub równoległoboku nie dzielimy przez 2.",
            polygons=[
                {
                    'points': [[100, 210], [420, 210], [280, 70]],
                    'fill': 'rgba(16, 185, 129, 0.09)',
                    'stroke': C_SUCCESS,
                    'strokeWidth': 2.5
                }
            ],
            arcs=[
                {
                    'cx': 100, 'cy': 210, 'r': 40, 'startAngleDeg': -38, 'endAngleDeg': 0,
                    'color': C_PRIMARY, 'label': r'\gamma'
                }
            ],
            points=[
                {'x': 100, 'y': 210, 'color': C_PRIMARY, 'label': 'A', 'attach': 'sw'},
                {'x': 420, 'y': 210, 'color': C_SLATE, 'label': 'B', 'attach': 'se'},
                {'x': 280, 'y': 70, 'color': C_SKY, 'label': 'C', 'attach': 'n'}
            ],
            labels=[
                {'x': 260, 'y': 230, 'text': 'bok a', 'color': C_PRIMARY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 180, 'y': 130, 'text': 'bok b', 'color': C_SKY, 'fontSize': 12, 'fontWeight': 'bold', 'anchor': 'end'}
            ],
            metrics=[
                {'label': 'Pole trójkąta', 'value': r'$P = \frac{1}{2}ab\sin\gamma$', 'color': C_SUCCESS},
                {'label': 'Pole równoległoboku', 'value': r'$P = ab\sin\alpha$', 'color': C_SKY},
                {'label': 'Pole rombu', 'value': r'$P = a^2\sin\alpha$', 'color': C_PRIMARY}
            ]
        )
        tab2 = make_step_flow_diagram(
            title="Obliczanie pola rombu z sinusem kąta krok po kroku",
            badge=r"a = 6\sqrt{2}, \quad \alpha = 150^\circ \implies P = (6\sqrt{2})^2 \cdot \sin 150^\circ = 72 \cdot \frac{1}{2} = 36",
            caption="Zadanie maturalne CKE maj 2023: pole rombu o boku a i kącie rozwartym 150 stopni.",
            steps=[
                {'num': 1, 'title': 'Zastosuj wzór na pole rombu', 'desc': r'$P = a^2 \cdot \sin\alpha$.', 'color': C_SKY},
                {'num': 2, 'title': 'Wyznacz sinus kąta 150°', 'desc': r'$\sin 150^\circ = \sin(180^\circ - 30^\circ) = \sin 30^\circ = \frac{1}{2}$.', 'color': C_PRIMARY},
                {'num': 3, 'title': 'Oblicz pole', 'desc': r'$P = (6\sqrt{2})^2 \cdot \frac{1}{2} = (36 \cdot 2) \cdot \frac{1}{2} = 72 \cdot \frac{1}{2} = 36$.', 'color': C_SUCCESS}
            ],
            metrics=[
                {'label': 'Bok do kwadratu', 'value': r'$(6\sqrt{2})^2 = 72$', 'color': C_SKY},
                {'label': 'Sinus 150°', 'value': r'$\sin 150^\circ = \frac{1}{2}$', 'color': C_PRIMARY},
                {'label': 'Pole rombu', 'value': '$P = 36$', 'color': C_SUCCESS}
            ]
        )
        tab3 = make_comparison_card_diagram(
            title="Pułapka CKE: Mylenie wzoru na pole trójkąta z polem czworokąta",
            badge=r"P_{\triangle} = \frac{1}{2}ab\sin\gamma \quad \text{vs} \quad P_{\text{równoległobok}} = ab\sin\gamma",
            caption="W trójkącie ZAWSZE mnożymy przez 1/2. W równoległoboku i rombie dzielenie przez 2 jest błędem.",
            metrics=[
                {'label': 'KARDYNALNY BŁĄD', 'value': r'Pominięcie $\frac{1}{2}$ przy liczeniu pola trójkąta', 'color': C_DANGER},
                {'label': 'POPRAWNY ODRUCH CKE', 'value': r'Dla trójkąta: połowa iloczynu boków i sinusa', 'color': C_SUCCESS},
                {'label': 'Kąt rozwarty', 'value': r'$\sin(180^\circ - \alpha) = \sin\alpha$ (znak się nie zmienia)', 'color': C_PRIMARY}
            ]
        )
        return {'tab0': tab0, 'tab2': tab2, 'tab3': tab3}

    return {'tab0': None, 'tab2': None, 'tab3': None}
