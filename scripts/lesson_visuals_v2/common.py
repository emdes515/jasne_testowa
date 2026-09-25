"""
common.py - Współdzielone definicje kolorów i fabryki diagramów wektorowych SVG
dla 225 lekcji matematyki podstawowej (Nocturne Luminary + Core-4).
"""

C_PRIMARY = '#FFB800'    # Bursztynowe złoto (główny akcent)
C_SUCCESS = '#10B981'    # Szmaragdowa zieleń (sukces, strefa dodatnia, poprawne podejście)
C_SKY = '#38BDF8'        # Błękit (osie, linie pomocnicze, dziedzina)
C_DANGER = '#F43F5E'     # Karmazynowy róż (pułapki CKE, strefa ujemna, typowe błędy)
C_PURPLE = '#c084fc'     # Liliowy/fiolet (wypełnienia obszarów, mediany, iloraz geometryczny)
C_SLATE = '#64748B'      # Stonowany szary (osie, siatka)
C_MUTED = '#94A3B8'      # Etykiety i teksty pomocnicze
C_TEXT = '#DFE2F1'       # Główny tekst kontrastowy

def make_number_line(min_val, max_val, ticks, intervals, **kwargs):
    """Generuje obiekt NumberLineData dla osi liczbowej SVG."""
    norm_ticks = []
    for t in ticks:
        if isinstance(t, (int, float)):
            norm_ticks.append({'value': t, 'label': str(t)})
        elif isinstance(t, dict):
            norm_ticks.append(t)
    res = {
        'type': 'number_line',
        'min': min_val,
        'max': max_val,
        'ticks': norm_ticks,
        'intervals': intervals
    }
    for k, v in kwargs.items():
        if v is not None:
            res[k] = v
    return res

def make_geometry_diagram(title, badge, caption, polygons=None, segments=None, points=None, arcs=None, circles=None, labels=None, metrics=None, width=520, height=270):
    return {
        'type': 'GEOMETRY_2D',
        'title': title,
        'formulaBadge': badge,
        'caption': caption,
        'width': width,
        'height': height,
        'polygons': polygons or [],
        'segments': segments or [],
        'points': points or [],
        'arcs': arcs or [],
        'circles': circles or [],
        'labels': labels or [],
        'metrics': metrics or []
    }

def make_plot_diagram(title, badge, caption, curves=None, segments=None, points=None, labels=None, metrics=None, grid=None, ticks=None, width=520, height=270, arcs=None, polygons=None, circles=None, plotData=None):
    res = {
        'type': 'GEOMETRY_2D',
        'title': title,
        'formulaBadge': badge,
        'caption': caption,
        'width': width,
        'height': height,
        'grid': grid or {
            'xLines': [80, 140, 200, 260, 320, 380, 440],
            'yLines': [40, 80, 120, 160, 200, 240],
            'color': 'rgba(148, 163, 184, 0.10)'
        },
        'segments': segments or [],
        'curves': curves or [],
        'points': points or [],
        'labels': labels or [],
        'ticks': ticks or [],
        'arcs': arcs or [],
        'polygons': polygons or [],
        'circles': circles or [],
        'metrics': metrics or []
    }
    if plotData is not None:
        res['plotData'] = plotData
    return res

def make_stereometry_diagram(title, badge, caption, segments=None, polygons=None, points=None, labels=None, metrics=None, width=520, height=270, arcs=None, circles=None):
    return {
        'type': 'STEREOMETRY_3D',
        'title': title,
        'formulaBadge': badge,
        'caption': caption,
        'width': width,
        'height': height,
        'polygons': polygons or [],
        'segments': segments or [],
        'points': points or [],
        'arcs': arcs or [],
        'circles': circles or [],
        'labels': labels or [],
        'metrics': metrics or []
    }

def make_statistics_diagram(title, badge, caption, bars=None, segments=None, ticks=None, labels=None, metrics=None, width=520, height=270):
    return {
        'type': 'STATISTICS',
        'title': title,
        'formulaBadge': badge,
        'caption': caption,
        'width': width,
        'height': height,
        'bars': bars or [],
        'segments': segments or [],
        'ticks': ticks or [],
        'labels': labels or [],
        'metrics': metrics or []
    }

def make_sequence_chain_diagram(title, badge, caption, terms, op_label, is_geom=False, note="Różnica r jest stała dla każdego n", metrics=None, width=520, height=210):
    """
    Wizualizuje łańcuch kolejnych wyrazów ciągu z wektorowymi wagonikami i strzałkami operacji.
    Dynamiczne szerokości wagoników, dwuliniowy układ dla formuł (brak kolizji tekstu),
    autentyczna responsywność i wyśrodkowanie w kadrze SVG.
    """
    n_terms = len(terms)
    polygons = []
    labels = []
    segments = []
    op_color = C_PURPLE if is_geom else C_SUCCESS
    
    # 1. Parsowanie wyrazów i obliczanie optymalnych szerokości
    parsed = []
    for i, term in enumerate(terms):
        s = str(term).strip()
        is_last = (i == n_terms - 1)
        if s == '...':
            parsed.append({'type': 'dots', 'raw': s, 'w': 28, 'is_last': is_last})
        elif '=' in s:
            parts = [p.strip() for p in s.split('=', 1)]
            l_part = parts[0]
            r_part = f"= {parts[1]}" if not parts[1].startswith('=') else parts[1]
            w_req = max(len(l_part) * 11 + 20, len(r_part) * 7.5 + 20)
            w = max(56, min(125, int(w_req)))
            parsed.append({'type': 'split', 'top': l_part, 'bottom': r_part, 'raw': s, 'w': w, 'is_last': is_last})
        else:
            w_req = len(s) * 8.5 + 24
            w = max(52, min(120, int(w_req)))
            parsed.append({'type': 'single', 'text': s, 'raw': s, 'w': w, 'is_last': is_last})

    # 2. Skalowanie szerokości i marginesów
    total_w = sum(p['w'] for p in parsed)
    min_gap = 18
    target_margin = 25
    avail_gap_space = width - 2 * target_margin - total_w
    
    if avail_gap_space < (n_terms - 1) * min_gap:
        scale_factor = (width - 2 * 14 - (n_terms - 1) * min_gap) / max(1, total_w)
        for p in parsed:
            p['w'] = max(36, int(p['w'] * scale_factor))
        total_w = sum(p['w'] for p in parsed)
        gap = min_gap
        start_x = 14
    else:
        gap = min(46, avail_gap_space / max(1, (n_terms - 1)))
        total_chain_w = total_w + (n_terms - 1) * gap
        start_x = max(14, (width - total_chain_w) / 2)

    # 3. Geometria wagoników
    y_box = 44
    box_h = 60
    ay = y_box + box_h / 2
    cur_x = start_x

    for i, p in enumerate(parsed):
        bw = p['w']
        bx = cur_x
        is_last = p['is_last']
        accent_color = C_SUCCESS if is_last else (C_PURPLE if is_geom else C_PRIMARY)
        bg_fill = 'rgba(16, 185, 129, 0.14)' if is_last else ('rgba(192, 132, 252, 0.10)' if is_geom else 'rgba(255, 184, 0, 0.08)')
        
        if p['type'] == 'dots':
            labels.append({
                'x': bx + bw / 2,
                'y': ay,
                'text': '···',
                'color': C_MUTED,
                'fontSize': 18,
                'fontWeight': 'bold',
                'anchor': 'middle'
            })
        else:
            polygons.append({
                'points': [[bx, y_box], [bx + bw, y_box], [bx + bw, y_box + box_h], [bx, y_box + box_h]],
                'fill': bg_fill,
                'stroke': accent_color,
                'strokeWidth': 2 if is_last else 1.5
            })
            
            if p['type'] == 'split':
                labels.append({
                    'x': bx + bw / 2,
                    'y': y_box + 20,
                    'text': p['top'],
                    'color': accent_color,
                    'fontSize': 14,
                    'fontWeight': 'bold',
                    'anchor': 'middle'
                })
                labels.append({
                    'x': bx + bw / 2,
                    'y': y_box + 42,
                    'text': p['bottom'],
                    'color': C_TEXT if is_last else '#CBD5E1',
                    'fontSize': 11 if len(p['bottom']) > 9 else 12,
                    'fontWeight': 'bold',
                    'anchor': 'middle'
                })
            else:
                labels.append({
                    'x': bx + bw / 2,
                    'y': ay,
                    'text': p['text'],
                    'color': accent_color,
                    'fontSize': 13 if len(p['text']) > 6 else 15,
                    'fontWeight': 'bold',
                    'anchor': 'middle'
                })

        # Strzałka i odznaka operacji
        if i < n_terms - 1:
            ax1 = bx + bw + 2
            ax2 = cur_x + bw + gap - 3
            is_dot_transition = (p['type'] == 'dots' or parsed[i+1]['type'] == 'dots')
            
            segments.append({
                'from': [ax1, ay],
                'to': [ax2, ay],
                'color': C_MUTED if is_dot_transition else op_color,
                'strokeWidth': 1.5 if is_dot_transition else 2,
                'dashed': is_dot_transition
            })
            segments.append({
                'from': [ax2 - 5, ay - 4],
                'to': [ax2, ay],
                'color': C_MUTED if is_dot_transition else op_color,
                'strokeWidth': 1.5 if is_dot_transition else 2
            })
            segments.append({
                'from': [ax2 - 5, ay + 4],
                'to': [ax2, ay],
                'color': C_MUTED if is_dot_transition else op_color,
                'strokeWidth': 1.5 if is_dot_transition else 2
            })
            
            if not is_dot_transition:
                labels.append({
                    'x': (ax1 + ax2) / 2,
                    'y': ay - 17,
                    'text': op_label,
                    'color': op_color,
                    'fontSize': 11,
                    'fontWeight': 'bold',
                    'anchor': 'middle',
                    'badge': True
                })

        cur_x += bw + gap

    # 4. Kaseton z zasadą maturalną CKE
    y_note = 135
    note_h = 58
    note_w = min(470, width - 40)
    note_x = (width - note_w) / 2
    
    note_border = 'rgba(16, 185, 129, 0.4)' if not is_geom else 'rgba(192, 132, 252, 0.4)'
    note_bg = 'rgba(16, 185, 129, 0.07)' if not is_geom else 'rgba(192, 132, 252, 0.07)'
    
    polygons.append({
        'points': [
            [note_x, y_note],
            [note_x + note_w, y_note],
            [note_x + note_w, y_note + note_h],
            [note_x, y_note + note_h]
        ],
        'fill': note_bg,
        'stroke': note_border,
        'strokeWidth': 1.5
    })
    
    labels.append({
        'x': width / 2,
        'y': y_note + 18,
        'text': 'ZASADA MATURALNA CKE',
        'color': C_PRIMARY,
        'fontSize': 11,
        'fontWeight': 'bold',
        'anchor': 'middle'
    })
    
    labels.append({
        'x': width / 2,
        'y': y_note + 40,
        'text': note,
        'color': C_SUCCESS if not is_geom else C_PURPLE,
        'fontSize': 12.5,
        'fontWeight': 'bold',
        'anchor': 'middle'
    })
    
    return {
        'type': 'GEOMETRY_2D',
        'title': title,
        'formulaBadge': badge,
        'caption': caption,
        'width': width,
        'height': height,
        'polygons': polygons,
        'segments': segments,
        'labels': labels,
        'metrics': metrics or []
    }

def make_step_flow_diagram(title, badge, caption, steps=None, metrics=None, width=520, height=180):
    """
    Tworzy minimalistyczny mikro-schemat rozwiązania (wycentrowany Hero Formula Box + kluczowy wniosek CKE).
    Zero ściśniętych wagoników w SVG, 100% czytelności na mobile!
    """
    cards = []
    if steps:
        for st in steps:
            desc_clean = st.get('desc', '').strip()
            cards.append({
                'badge': f"Krok {st.get('num', '')}",
                'title': st.get('title', ''),
                'desc': desc_clean,
                'color': st.get('color', C_PRIMARY)
            })

    return {
        'type': 'INFOGRAPHIC',
        'title': title,
        'formulaBadge': badge,
        'caption': caption,
        'width': width,
        'height': height,
        'cards': cards,
        'metrics': metrics or []
    }

def make_comparison_card_diagram(title, badge, caption=None, left_title=None, left_lines=None, right_title=None, right_lines=None, left_color=C_SUCCESS, right_color=C_DANGER, metrics=None, width=520, height=180):
    """
    Tworzy minimalistyczny mikro-schemat kontrastu pułapki (wycentrowany Hero Formula Box + metryki CKE).
    Zero duplikacji tekstu z kart Tab 3, zero emoji!
    """
    clean_title = (title or '').replace('✓', '').replace('❌', '').replace('⚠️', '').strip()
    return {
        'type': 'INFOGRAPHIC',
        'title': clean_title,
        'formulaBadge': badge,
        'caption': caption,
        'width': width,
        'height': height,
        'metrics': metrics or []
    }

def make_symbol_card_grid_diagram(title, badge, caption, cards, metrics=None, width=520, height=270):
    """
    Rysuje siatkę 2, 3 lub 4 kart symboli matematycznych (np. >, <, >=, <= lub zbiorów).
    Każda karta zawiera powiększony symbol, nazwę, regułę graficzną i wyjaśnienie.
    """
    n = len(cards)
    gap = 14
    margin = 24
    card_w = (width - 2 * margin - (n - 1) * gap) / n
    card_h = 145
    y_card = 55
    
    polygons = []
    segments = []
    labels = []
    
    for i, c in enumerate(cards):
        cx = margin + i * (card_w + gap)
        c_color = c.get('color', C_PRIMARY)
        
        # Główny kaseton karty
        polygons.append({
            'points': [[cx, y_card], [cx + card_w, y_card], [cx + card_w, y_card + card_h], [cx, y_card + card_h]],
            'fill': 'rgba(14, 21, 34, 0.95)',
            'stroke': c_color,
            'strokeWidth': 1.8
        })
        
        # Pasek nagłówka symbolu
        polygons.append({
            'points': [[cx, y_card], [cx + card_w, y_card], [cx + card_w, y_card + 46], [cx, y_card + 46]],
            'fill': f'{c_color}18',
            'stroke': c_color,
            'strokeWidth': 1
        })
        
        # Duży symbol
        labels.append({
            'x': cx + card_w / 2,
            'y': y_card + 23,
            'text': c.get('sym', ''),
            'color': c_color,
            'fontSize': 22,
            'fontWeight': 'bold',
            'anchor': 'middle'
        })
        
        # Nazwa symbolu
        labels.append({
            'x': cx + card_w / 2,
            'y': y_card + 60,
            'text': c.get('name', ''),
            'color': C_TEXT,
            'fontSize': 11,
            'fontWeight': 'bold',
            'anchor': 'middle'
        })
        
        # Linie opisu i reguły
        desc_lines = c.get('lines', [])
        for l_idx, line in enumerate(desc_lines[:3]):
            labels.append({
                'x': cx + 10,
                'y': y_card + 82 + l_idx * 20,
                'text': line,
                'color': C_MUTED if l_idx > 0 else c_color,
                'fontSize': 10,
                'fontWeight': 'bold' if l_idx == 0 else 'normal',
                'anchor': 'start'
            })
            
    return {
        'type': 'GEOMETRY_2D',
        'title': title,
        'formulaBadge': badge,
        'caption': caption,
        'width': width,
        'height': height,
        'polygons': polygons,
        'segments': segments,
        'labels': labels,
        'metrics': metrics or []
    }

def make_inequality_explainer_diagram(title=None, badge=None, caption=None, metrics=None):
    """
    Dedykowana infografika 4 znaków nierówności CKE (>, <, >=, <=) ze schematem kółek i przedziałów.
    """
    cards = [
        {
            'sym': '>',
            'name': 'Większe niż',
            'color': C_SKY,
            'lines': ['○ Kółko otwarte', '⟶ W prawo do +∞', 'Nawias: (a, +∞)']
        },
        {
            'sym': '<',
            'name': 'Mniejsze niż',
            'color': C_PURPLE,
            'lines': ['○ Kółko otwarte', '⟵ W lewo do -∞', 'Nawias: (-∞, a)']
        },
        {
            'sym': '≥',
            'name': 'Większe lub równe',
            'color': C_SUCCESS,
            'lines': ['● Zamalowane!', '⟶ W prawo do +∞', 'Nawias: [a, +∞)']
        },
        {
            'sym': '≤',
            'name': 'Mniejsze lub równe',
            'color': C_PRIMARY,
            'lines': ['● Zamalowane!', '⟵ W lewo do -∞', 'Nawias: (-∞, a]']
        }
    ]
    def_metrics = [
        {'label': 'Ostre: > oraz <', 'value': 'Kółko otwarte ○, nawias ( )', 'color': C_SKY},
        {'label': 'Słabe: ≥ oraz ≤', 'value': 'Kółko zamalowane ●, nawias [ ]', 'color': C_SUCCESS},
        {'label': 'PUŁAPKA CKE: Mnożenie przez ujemną', 'value': 'ODWRACA ZWROT ZNAKU! (np. -2x < 6 -> x > -3)', 'color': C_DANGER}
    ]
    return make_symbol_card_grid_diagram(
        title=title or 'Symbole nierówności: Z polskiego na nasze',
        badge=badge or '>,\\; <,\\; \\ge,\\; \\le',
        caption=caption or 'Znak równości w nierówności (kreska na dole ≥, ≤) oznacza, że punkt brzegowy NALEŻY do rozwiązań (zamalowane kółko ●).',
        cards=cards,
        metrics=metrics or def_metrics
    )

def make_infographic_diagram(title, badge, caption, polygons=None, segments=None, points=None, labels=None, metrics=None, cards=None, width=520, height=270):
    """
    Uniwersalna fabryka infografik anatomicznych SVG (type: 'INFOGRAPHIC').
    Gwarantuje brak siatek współrzędnych i osi kartezjańskich.
    """
    return {
        'type': 'INFOGRAPHIC',
        'title': title,
        'formulaBadge': badge,
        'caption': caption,
        'width': width,
        'height': height,
        'polygons': polygons or [],
        'segments': segments or [],
        'points': points or [],
        'labels': labels or [],
        'metrics': metrics or [],
        'cards': cards or []
    }

def make_power_anatomy_diagram(title="Anatomia potęgi: Z polskiego na nasze", badge="a^n = \\underbrace{a \\cdot a \\cdot \\dots \\cdot a}_{n\\text{ czynników}}", caption="Prawa działań na potęgach działają tylko dla jednakowych podstaw. Zawsze sprowadzaj liczby do wspólnej bazy (2, 3 lub 5)."):
    """
    Infografika anatomiczna dla potęg zoptymalizowana pod ekrany mobilne (360x125 px).
    Czysty SVG o dużych, czytelnych etykietach (14 px) bez mikroskopijnych elementów.
    """
    width, height = 360, 125
    segments = []
    labels = []

    # Wycentrowany zapis potęgi: a^n
    labels.append({'x': 180, 'y': 70, 'text': 'a', 'color': C_PRIMARY, 'fontSize': 48, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 208, 'y': 44, 'text': 'n', 'color': C_SKY, 'fontSize': 30, 'fontWeight': 'bold', 'anchor': 'middle'})

    # Wskaźnik z lewej strony do podstawy 'a'
    segments.append({'from': [35, 70], 'to': [152, 70], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [145, 65], 'to': [152, 70], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [145, 75], 'to': [152, 70], 'color': C_PRIMARY, 'strokeWidth': 2})
    labels.append({'x': 90, 'y': 48, 'text': 'PODSTAWA', 'color': C_PRIMARY, 'fontSize': 14, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 90, 'y': 92, 'text': '(mnożona baza)', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'})

    # Wskaźnik z prawej strony do wykładnika 'n'
    segments.append({'from': [225, 42], 'to': [325, 42], 'color': C_SKY, 'strokeWidth': 2})
    segments.append({'from': [232, 37], 'to': [225, 42], 'color': C_SKY, 'strokeWidth': 2})
    segments.append({'from': [232, 47], 'to': [225, 42], 'color': C_SKY, 'strokeWidth': 2})
    labels.append({'x': 275, 'y': 24, 'text': 'WYKŁADNIK', 'color': C_SKY, 'fontSize': 14, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 275, 'y': 64, 'text': '(ile razy: n ∈ ℝ)', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'})

    cards = [
        {
            'badge': 'PRAWDA',
            'color': C_SUCCESS,
            'title': 'Potęgowanie to mnożenie',
            'formula': '2^3 = 2 \\cdot 2 \\cdot 2 = 8',
            'desc': 'Mnożysz podstawę 2 przez samą siebie dokładnie 3 razy.'
        },
        {
            'badge': 'PUŁAPKA CKE',
            'color': C_DANGER,
            'title': 'To NIE jest zwykłe mnożenie!',
            'formula': '2^3 \\neq 2 \\cdot 3 = 6',
            'desc': 'Najczęstszy błąd pod presją czasu: mnożenie podstawy przez wykładnik. Pamiętaj: 2³ = 8, a nie 6!'
        },
        {
            'badge': 'ODWRACANIE',
            'color': C_PRIMARY,
            'title': 'Wykładnik ujemny odwraca ułamek',
            'formula': 'a^{-1} = \\frac{1}{a}, \\quad a^{-n} = \\frac{1}{a^n}',
            'desc': 'Minus w wykładniku NIE tworzy liczby ujemnej! Jego rolą jest przeniesienie liczby do mianownika.'
        }
    ]

    return make_infographic_diagram(
        title=title,
        badge=badge,
        caption=caption,
        polygons=[],
        segments=segments,
        labels=labels,
        metrics=[],
        cards=cards,
        width=width,
        height=height
    )

def make_root_anatomy_diagram(title="Anatomia pierwiastka: Z polskiego na nasze", badge="\\sqrt[n]{a} = b \\quad \\text{bo} \\quad b^n = a", caption="Zawsze sprawdzaj pierwiastek działaniem odwrotnym: podnieś wynik do potęgi stopnia pierwiastka!"):
    """
    Infografika anatomiczna dla pierwiastków zoptymalizowana pod ekrany mobilne (360x125 px).
    Czysty SVG o dużych, czytelnych etykietach bez akademickiego formalizmu logiki (zakaz \\longleftrightarrow).
    """
    width, height = 360, 125
    segments = []
    labels = []

    # Wycentrowany zapis pierwiastka: \sqrt[n]{a}
    labels.append({'x': 165, 'y': 44, 'text': 'n', 'color': C_SKY, 'fontSize': 22, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 185, 'y': 68, 'text': '√', 'color': C_SUCCESS, 'fontSize': 48, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 215, 'y': 70, 'text': 'a', 'color': C_PRIMARY, 'fontSize': 34, 'fontWeight': 'bold', 'anchor': 'middle'})

    # Wskaźnik z lewej do stopnia 'n'
    segments.append({'from': [35, 44], 'to': [150, 44], 'color': C_SKY, 'strokeWidth': 2})
    segments.append({'from': [143, 39], 'to': [150, 44], 'color': C_SKY, 'strokeWidth': 2})
    segments.append({'from': [143, 49], 'to': [150, 44], 'color': C_SKY, 'strokeWidth': 2})
    labels.append({'x': 90, 'y': 26, 'text': 'STOPIEŃ (n)', 'color': C_SKY, 'fontSize': 14, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 90, 'y': 64, 'text': '(domyślnie 2: √)', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'})

    # Wskaźnik z prawej do liczby podpierwiastkowej 'a'
    segments.append({'from': [230, 70], 'to': [330, 70], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [237, 65], 'to': [230, 70], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [237, 75], 'to': [230, 70], 'color': C_PRIMARY, 'strokeWidth': 2})
    labels.append({'x': 280, 'y': 48, 'text': 'LICZBA a', 'color': C_PRIMARY, 'fontSize': 14, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 280, 'y': 90, 'text': '(pod pierwiastkiem)', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'})

    cards = [
        {
            'badge': 'INTUICJA',
            'color': C_SUCCESS,
            'title': 'Działanie odwrotne do potęgi',
            'formula': '\\sqrt[3]{8} = 2 \\longrightarrow 2^3 = 8',
            'desc': 'Zadajesz sobie pytanie: jaka liczba podniesiona do potęgi n daje liczbę pod pierwiastkiem?'
        },
        {
            'badge': 'STOPIEŃ 2',
            'color': C_SKY,
            'title': 'Pierwiastek kwadratowy',
            'formula': '\\sqrt{9} = \\sqrt[2]{9} = 3',
            'desc': 'Gdy nad pierwiastkiem nie ma liczby, stopień wynosi 2. Nigdy nie piszemy małej 2 nad zwykłym pierwiastkiem.'
        },
        {
            'badge': 'PUŁAPKA CKE',
            'color': C_DANGER,
            'title': 'Pierwiastek z kwadratu',
            'formula': '\\sqrt{a^2} = |a| \\neq a',
            'desc': 'Dla stopnia parzystego wynik jest ZAWSZE nieujemny: $\\sqrt{(-3)^2} = |-3| = 3$, a nie $-3$!'
        }
    ]

    return make_infographic_diagram(
        title=title,
        badge=badge,
        caption=caption,
        polygons=[],
        segments=segments,
        labels=labels,
        metrics=[],
        cards=cards,
        width=width,
        height=height
    )

def make_logarithm_loop_diagram(title="Definicja logarytmu: Ruch po pętli", badge="\\log_a b = c \\longrightarrow a^c = b", caption="Pytanie pomocnicze: Do jakiej potęgi podnieść a, żeby otrzymać b?"):
    """
    Infografika anatomiczna pętli logarytmu zoptymalizowana pod ekrany mobilne (360x125 px).
    Brak symbolu \\longleftrightarrow, wyraźny wektor pętli i duża czytelność na telefonach.
    """
    width, height = 360, 125
    segments = []
    labels = []

    # Zapis logarytmu z lewej: log_a b = c
    labels.append({'x': 36, 'y': 55, 'text': 'log', 'color': C_TEXT, 'fontSize': 24, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 62, 'y': 68, 'text': 'a', 'color': C_PRIMARY, 'fontSize': 20, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 86, 'y': 55, 'text': 'b', 'color': C_SKY, 'fontSize': 26, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 114, 'y': 55, 'text': '=', 'color': C_TEXT, 'fontSize': 22, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 138, 'y': 55, 'text': 'c', 'color': C_SUCCESS, 'fontSize': 26, 'fontWeight': 'bold', 'anchor': 'middle'})

    # Wskaźnik transformacji na postać potęgową
    segments.append({'from': [160, 55], 'to': [195, 55], 'color': C_MUTED, 'strokeWidth': 2})
    segments.append({'from': [188, 50], 'to': [195, 55], 'color': C_MUTED, 'strokeWidth': 2})
    segments.append({'from': [188, 60], 'to': [195, 55], 'color': C_MUTED, 'strokeWidth': 2})
    labels.append({'x': 178, 'y': 40, 'text': 'PĘTLA', 'color': C_MUTED, 'fontSize': 9, 'fontWeight': 'bold', 'anchor': 'middle'})

    # Postać potęgowa z prawej: a^c = b
    labels.append({'x': 230, 'y': 55, 'text': 'a', 'color': C_PRIMARY, 'fontSize': 28, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 252, 'y': 38, 'text': 'c', 'color': C_SUCCESS, 'fontSize': 20, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 282, 'y': 55, 'text': '=', 'color': C_TEXT, 'fontSize': 22, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 310, 'y': 55, 'text': 'b', 'color': C_SKY, 'fontSize': 28, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 270, 'y': 98, 'text': 'WYNIK: aᶜ = b', 'color': C_SUCCESS, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'})

    # KROK 1: Wektor pętli dolnej (od podstawy a do wykładnika c)
    segments.append({'from': [62, 78], 'to': [62, 84], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [62, 84], 'to': [138, 84], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [138, 84], 'to': [138, 70], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [133, 75], 'to': [138, 68], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [143, 75], 'to': [138, 68], 'color': C_PRIMARY, 'strokeWidth': 2})
    labels.append({'x': 100, 'y': 98, 'text': '1. Podnosisz a do potęgi c', 'color': C_PRIMARY, 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'middle'})

    # KROK 2: Wektor pętli górnej (od potęgi c z powrotem do liczby b)
    segments.append({'from': [138, 42], 'to': [138, 28], 'color': C_SKY, 'strokeWidth': 2})
    segments.append({'from': [138, 28], 'to': [86, 28], 'color': C_SKY, 'strokeWidth': 2})
    segments.append({'from': [86, 28], 'to': [86, 42], 'color': C_SKY, 'strokeWidth': 2})
    segments.append({'from': [81, 37], 'to': [86, 44], 'color': C_SKY, 'strokeWidth': 2})
    segments.append({'from': [91, 37], 'to': [86, 44], 'color': C_SKY, 'strokeWidth': 2})
    labels.append({'x': 112, 'y': 17, 'text': '2. Lądujesz na liczbie b', 'color': C_SKY, 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'middle'})

    cards = [
        {
            'badge': 'ZŁOTA PĘTLA',
            'color': C_PRIMARY,
            'title': 'Ruch po okręgu',
            'formula': '\\log_a b = c \\longrightarrow a^c = b',
            'desc': 'Zaczynasz od podstawy a, idziesz przez znak równości do potęgi c i lądujesz na liczbie b.'
        },
        {
            'badge': 'DOMYŚLNA BAZA 10',
            'color': C_SKY,
            'title': 'Logarytm dziesiętny',
            'formula': '\\log b = \\log_{10} b',
            'desc': 'Brak zapisanej podstawy oznacza bazę 10, np. \\(\\log 100 = 2\\), bo \\(10^2 = 100\\).'
        },
        {
            'badge': 'PUŁAPKA CKE',
            'color': C_DANGER,
            'title': 'Dziedzina logarytmu',
            'formula': 'a > 0, \\; a \\neq 1, \\; b > 0',
            'desc': 'Podstawa i liczba logarytmowana muszą być ściśle dodatnie, a podstawa nie może być równa 1!'
        }
    ]

    return make_infographic_diagram(
        title=title,
        badge=badge,
        caption=caption,
        polygons=[],
        segments=segments,
        labels=labels,
        metrics=[],
        cards=cards,
        width=width,
        height=height
    )


def make_algebraic_identity_diagram(title="Wzory skróconego mnożenia: Z polskiego na nasze", badge="(a \\pm b)^2 = a^2 \\pm 2ab + b^2", caption="Kwadrat sumy to nie suma kwadratów! Zawsze pamiętaj o podwójnym iloczynie 2ab."):
    """Infografika dla algebry i wzorów skróconego mnożenia renderowana w czystym HTML/KaTeX."""
    cards = [
        {
            'badge': 'Kwadrat sumy',
            'title': 'Nie gub wyrazu środkowego!',
            'formula': '(a + b)^2 = a^2 + 2ab + b^2',
            'desc': 'Przykład: $(x + 3)^2 = x^2 + 6x + 9$',
            'color': C_SUCCESS
        },
        {
            'badge': 'Kwadrat różnicy',
            'title': 'Minus tylko przy 2ab!',
            'formula': '(a - b)^2 = a^2 - 2ab + b^2',
            'desc': 'Przykład: $(x - 4)^2 = x^2 - 8x + 16$',
            'color': C_PRIMARY
        },
        {
            'badge': 'Różnica kwadratów',
            'title': 'Dwa nawiasy (suma i różnica)',
            'formula': 'a^2 - b^2 = (a - b)(a + b)',
            'desc': 'Przykład: $x^2 - 25 = (x - 5)(x + 5)$',
            'color': C_SKY
        }
    ]
    metrics = [
        {'label': 'Kardynalny błąd CKE', 'value': '$(a + b)^2 \\neq a^2 + b^2$ (brak $2ab$ to 0 pkt!)', 'color': C_DANGER},
        {'label': 'Wyłączanie przed nawias', 'value': 'Zawsze sprawdź najpierw, czy można wyłączyć wspólny czynnik', 'color': C_SUCCESS}
    ]
    return {
        'type': 'INFOGRAPHIC',
        'title': title,
        'formulaBadge': badge,
        'caption': caption,
        'cards': cards,
        'metrics': metrics
    }
