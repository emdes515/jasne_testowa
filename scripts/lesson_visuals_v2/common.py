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

def make_plot_diagram(title, badge, caption, curves=None, segments=None, points=None, labels=None, metrics=None, grid=None, ticks=None, width=520, height=270, arcs=None, polygons=None, circles=None):
    return {
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
        {'label': 'PUŁAPKA CKE: Mnożenie przez ujemną', 'value': 'ODWRACA ZWROT ZNAKU! (np. -2x < 6 ⟹ x > -3)', 'color': C_DANGER}
    ]
    return make_symbol_card_grid_diagram(
        title=title or 'Symbole nierówności: Z polskiego na nasze',
        badge=badge or '>,\\; <,\\; \\ge,\\; \\le',
        caption=caption or 'Znak równości w nierówności (kreska na dole ≥, ≤) oznacza, że punkt brzegowy NALEŻY do rozwiązań (zamalowane kółko ●).',
        cards=cards,
        metrics=metrics or def_metrics
    )

def make_infographic_diagram(title, badge, caption, polygons=None, segments=None, points=None, labels=None, metrics=None, width=520, height=270):
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
        'metrics': metrics or []
    }

def make_power_anatomy_diagram(title="Anatomia potęgi: Z polskiego na nasze", badge="a^n = \\underbrace{a \\cdot a \\cdot \\dots \\cdot a}_{n\\text{ jednakowych czynników}}", caption="Podstawa a to liczba, którą mnożysz. Wykładnik n to licznik, ile razy bierzesz ją do mnożenia."):
    """
    Infografika anatomiczna dla potęg: duża podstawa, wykładnik ze strzałką i klamra n-czynników.
    Zero siatek kartezjańskich, brak dublowania wzorów z Tablic CKE!
    """
    width, height = 520, 160
    polygons = []
    segments = []
    labels = []

    polygons.append({
        'points': [[20, 20], [500, 20], [500, 140], [20, 140]],
        'fill': 'rgba(14, 21, 34, 0.95)',
        'stroke': 'rgba(255, 184, 0, 0.35)',
        'strokeWidth': 1.5
    })

    # Duży zapis potęgi: aⁿ
    labels.append({'x': 85, 'y': 88, 'text': 'a', 'color': C_PRIMARY, 'fontSize': 42, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 115, 'y': 62, 'text': 'n', 'color': C_SKY, 'fontSize': 28, 'fontWeight': 'bold', 'anchor': 'middle'})

    # Wskaźnik do wykładnika 'n'
    segments.append({'from': [115, 46], 'to': [115, 34], 'color': C_SKY, 'strokeWidth': 1.5})
    segments.append({'from': [115, 34], 'to': [140, 34], 'color': C_SKY, 'strokeWidth': 1.5})
    labels.append({'x': 148, 'y': 38, 'text': 'WYKŁADNIK (ile razy mnożysz)', 'color': C_SKY, 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'start'})

    # Wskaźnik do podstawy 'a'
    segments.append({'from': [85, 96], 'to': [85, 118], 'color': C_PRIMARY, 'strokeWidth': 1.5})
    segments.append({'from': [85, 118], 'to': [140, 118], 'color': C_PRIMARY, 'strokeWidth': 1.5})
    labels.append({'x': 148, 'y': 122, 'text': 'PODSTAWA (liczba mnożona przez samą siebie)', 'color': C_PRIMARY, 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'start'})

    # Znak równości i rozwinięcie iloczynowe
    labels.append({'x': 175, 'y': 80, 'text': '=', 'color': C_TEXT, 'fontSize': 22, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 320, 'y': 80, 'text': 'a · a · a · ... · a', 'color': C_TEXT, 'fontSize': 18, 'fontWeight': 'bold', 'anchor': 'middle'})

    # Klamra dolna pod rozwinięciem iloczynu
    segments.append({'from': [210, 94], 'to': [430, 94], 'color': C_MUTED, 'strokeWidth': 1.5})
    segments.append({'from': [210, 90], 'to': [210, 94], 'color': C_MUTED, 'strokeWidth': 1.5})
    segments.append({'from': [430, 90], 'to': [430, 94], 'color': C_MUTED, 'strokeWidth': 1.5})
    labels.append({'x': 320, 'y': 108, 'text': 'n jednakowych czynników', 'color': C_MUTED, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'})

    metrics = [
        {'label': 'Podstawa ($a$)', 'value': 'Liczba mnożona przez samą siebie', 'color': C_PRIMARY},
        {'label': 'Wykładnik ($n$)', 'value': 'Ile razy mnożysz ($n \\in \\mathbb{N}^+$)', 'color': C_SKY}
    ]

    return make_infographic_diagram(
        title=title,
        badge=badge,
        caption=caption,
        polygons=polygons,
        segments=segments,
        labels=labels,
        metrics=metrics,
        width=width,
        height=height
    )

def make_root_anatomy_diagram(title="Anatomia pierwiastka: Z polskiego na nasze", badge="\\sqrt[n]{a} = b \\implies b^n = a", caption="Pierwiastkowanie to działanie odwrotne do potęgowania: szukasz b, które do potęgi n daje a."):
    """Infografika anatomiczna dla pierwiastków. Zero emoji, zero akademickiego żargonu!"""
    width, height = 520, 160
    polygons = []
    segments = []
    labels = []

    polygons.append({
        'points': [[20, 20], [500, 20], [500, 140], [20, 140]],
        'fill': 'rgba(14, 21, 34, 0.95)',
        'stroke': 'rgba(16, 185, 129, 0.35)',
        'strokeWidth': 1.5
    })

    labels.append({'x': 70, 'y': 62, 'text': 'n', 'color': C_SKY, 'fontSize': 20, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 105, 'y': 85, 'text': '√', 'color': C_SUCCESS, 'fontSize': 44, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 135, 'y': 80, 'text': 'a', 'color': C_PRIMARY, 'fontSize': 34, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 180, 'y': 80, 'text': '=', 'color': C_TEXT, 'fontSize': 24, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 210, 'y': 80, 'text': 'b', 'color': C_SUCCESS, 'fontSize': 34, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 270, 'y': 80, 'text': 'bo:', 'color': C_MUTED, 'fontSize': 18, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 340, 'y': 80, 'text': 'bⁿ = a', 'color': C_TEXT, 'fontSize': 24, 'fontWeight': 'bold', 'anchor': 'middle'})

    segments.append({'from': [70, 48], 'to': [70, 36], 'color': C_SKY, 'strokeWidth': 1.5})
    segments.append({'from': [70, 36], 'to': [95, 36], 'color': C_SKY, 'strokeWidth': 1.5})
    labels.append({'x': 102, 'y': 40, 'text': 'STOPIEŃ (domyślnie 2)', 'color': C_SKY, 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'start'})

    segments.append({'from': [135, 96], 'to': [135, 118], 'color': C_PRIMARY, 'strokeWidth': 1.5})
    segments.append({'from': [135, 118], 'to': [160, 118], 'color': C_PRIMARY, 'strokeWidth': 1.5})
    labels.append({'x': 168, 'y': 122, 'text': 'LICZBA PODPIERWIASTKOWA', 'color': C_PRIMARY, 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'start'})

    metrics = [
        {'label': 'Stopień pierwiastka ($n$)', 'value': 'Domyślnie $2$ (gdy brak cyfry to $\\sqrt{a}$)', 'color': C_SKY},
        {'label': 'Kardynalny błąd CKE', 'value': '$\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ (np. $\\sqrt{9+16} = 5$, nie $7$!)', 'color': C_DANGER}
    ]

    return make_infographic_diagram(
        title=title,
        badge=badge,
        caption=caption,
        polygons=polygons,
        segments=segments,
        labels=labels,
        metrics=metrics,
        width=width,
        height=height
    )

def make_logarithm_loop_diagram(title="Definicja logarytmu: Ruch po pętli", badge="\\log_a b = c \\iff a^c = b", caption="Pytanie pomocnicze: Do jakiej potęgi podnieść a, żeby otrzymać b?"):
    """Infografika anatomiczna pętli logarytmu ze strzałką kierunkową. Zero emoji!"""
    width, height = 520, 160
    polygons = []
    segments = []
    labels = []

    polygons.append({
        'points': [[20, 20], [500, 20], [500, 140], [20, 140]],
        'fill': 'rgba(14, 21, 34, 0.95)',
        'stroke': 'rgba(255, 184, 0, 0.35)',
        'strokeWidth': 1.5
    })

    labels.append({'x': 75, 'y': 75, 'text': 'log', 'color': C_TEXT, 'fontSize': 28, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 115, 'y': 90, 'text': 'a', 'color': C_PRIMARY, 'fontSize': 24, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 150, 'y': 75, 'text': 'b', 'color': C_SKY, 'fontSize': 32, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 195, 'y': 75, 'text': '=', 'color': C_TEXT, 'fontSize': 24, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 230, 'y': 75, 'text': 'c', 'color': C_SUCCESS, 'fontSize': 32, 'fontWeight': 'bold', 'anchor': 'middle'})

    labels.append({'x': 285, 'y': 75, 'text': 'znaczy:', 'color': C_MUTED, 'fontSize': 16, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 355, 'y': 75, 'text': 'a', 'color': C_PRIMARY, 'fontSize': 32, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 378, 'y': 57, 'text': 'c', 'color': C_SUCCESS, 'fontSize': 22, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 405, 'y': 75, 'text': '=', 'color': C_TEXT, 'fontSize': 24, 'fontWeight': 'bold', 'anchor': 'middle'})
    labels.append({'x': 435, 'y': 75, 'text': 'b', 'color': C_SKY, 'fontSize': 32, 'fontWeight': 'bold', 'anchor': 'middle'})

    # Wektorowa strzałka pętli
    segments.append({'from': [115, 100], 'to': [230, 100], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [230, 100], 'to': [230, 92], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [226, 95], 'to': [230, 91], 'color': C_PRIMARY, 'strokeWidth': 2})
    segments.append({'from': [234, 95], 'to': [230, 91], 'color': C_PRIMARY, 'strokeWidth': 2})
    labels.append({'x': 260, 'y': 122, 'text': 'RUCH PO PĘTLI: podstawa a do potęgi c daje b', 'color': C_PRIMARY, 'fontSize': 11, 'fontWeight': 'bold', 'anchor': 'middle'})

    metrics = [
        {'label': 'Dziedzina podstawy ($a$)', 'value': 'Zawsze $a > 0$ oraz $a \\neq 1$', 'color': C_DANGER},
        {'label': 'Dziedzina liczby ($b$)', 'value': 'Zawsze $b > 0$', 'color': C_SKY}
    ]

    return make_infographic_diagram(
        title=title,
        badge=badge,
        caption=caption,
        polygons=polygons,
        segments=segments,
        labels=labels,
        metrics=metrics,
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
