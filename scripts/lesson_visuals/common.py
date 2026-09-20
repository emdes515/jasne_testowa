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
        'text': '💡 ZASADA MATURALNA CKE',
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

def make_step_flow_diagram(title, badge, caption, steps, metrics=None, width=520, height=270):
    """
    Tworzy schemat procesowy krok po kroku (np. Krok 1 -> Krok 2 -> Krok 3).
    """
    n = len(steps)
    card_w = (width - 60 - (n - 1) * 20) / n
    card_h = 135
    y_card = 60
    
    polygons = []
    segments = []
    labels = []
    
    for i, st in enumerate(steps):
        cx = 30 + i * (card_w + 20)
        c_color = st.get('color', C_PRIMARY)
        
        polygons.append({
            'points': [[cx, y_card], [cx + card_w, y_card], [cx + card_w, y_card + card_h], [cx, y_card + card_h]],
            'fill': 'rgba(14, 21, 34, 0.95)',
            'stroke': c_color,
            'strokeWidth': 1.8
        })
        
        polygons.append({
            'points': [[cx + 10, y_card + 10], [cx + 32, y_card + 10], [cx + 32, y_card + 30], [cx + 10, y_card + 30]],
            'fill': c_color,
            'stroke': c_color,
            'strokeWidth': 1
        })
        labels.append({
            'x': cx + 21,
            'y': y_card + 20,
            'text': str(st.get('num', i + 1)),
            'color': '#080B11',
            'fontSize': 12,
            'fontWeight': 'bold',
            'anchor': 'middle'
        })
        
        labels.append({
            'x': cx + 38,
            'y': y_card + 20,
            'text': st.get('title', ''),
            'color': c_color,
            'fontSize': 11,
            'fontWeight': 'bold',
            'anchor': 'start'
        })
        
        desc_lines = st.get('desc', '').split('\n')
        for l_idx, dl in enumerate(desc_lines[:3]):
            labels.append({
                'x': cx + 10,
                'y': y_card + 50 + l_idx * 22,
                'text': dl,
                'color': C_TEXT if l_idx == 0 else C_MUTED,
                'fontSize': 11,
                'fontWeight': 'bold' if l_idx == 0 else 'normal',
                'anchor': 'start'
            })
            
        if i < n - 1:
            ax1 = cx + card_w + 3
            ax2 = ax1 + 14
            ay = y_card + card_h / 2
            segments.append({'from': [ax1, ay], 'to': [ax2, ay], 'color': C_MUTED, 'strokeWidth': 2})
            segments.append({'from': [ax2 - 4, ay - 3], 'to': [ax2, ay], 'color': C_MUTED, 'strokeWidth': 2})
            segments.append({'from': [ax2 - 4, ay + 3], 'to': [ax2, ay], 'color': C_MUTED, 'strokeWidth': 2})
            
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

def make_comparison_card_diagram(title, badge, caption, left_title, left_lines, right_title, right_lines, left_color=C_SUCCESS, right_color=C_DANGER, metrics=None, width=520, height=270):
    """
    Tworzy zestawienie dwóch skontrastowanych paneli (Wzorcowe podejście vs Pułapka CKE).
    """
    polygons = []
    segments = []
    labels = []
    
    lx1, lx2 = 30, 245
    y1, y2 = 45, 205
    polygons.append({
        'points': [[lx1, y1], [lx2, y1], [lx2, y2], [lx1, y2]],
        'fill': 'rgba(16, 185, 129, 0.05)',
        'stroke': left_color,
        'strokeWidth': 1.8
    })
    polygons.append({
        'points': [[lx1, y1], [lx2, y1], [lx2, y1 + 30], [lx1, y1 + 30]],
        'fill': 'rgba(16, 185, 129, 0.15)',
        'stroke': left_color,
        'strokeWidth': 1
    })
    labels.append({
        'x': (lx1 + lx2) / 2,
        'y': y1 + 15,
        'text': left_title,
        'color': left_color,
        'fontSize': 11,
        'fontWeight': 'bold',
        'anchor': 'middle'
    })
    for l_idx, line in enumerate(left_lines[:4]):
        labels.append({
            'x': lx1 + 12,
            'y': y1 + 50 + l_idx * 26,
            'text': line,
            'color': C_TEXT,
            'fontSize': 12,
            'fontWeight': 'normal',
            'anchor': 'start'
        })
        
    rx1, rx2 = 275, 490
    polygons.append({
        'points': [[rx1, y1], [rx2, y1], [rx2, y2], [rx1, y2]],
        'fill': 'rgba(244, 63, 94, 0.05)',
        'stroke': right_color,
        'strokeWidth': 1.8
    })
    polygons.append({
        'points': [[rx1, y1], [rx2, y1], [rx2, y1 + 30], [rx1, y1 + 30]],
        'fill': 'rgba(244, 63, 94, 0.15)',
        'stroke': right_color,
        'strokeWidth': 1
    })
    labels.append({
        'x': (rx1 + rx2) / 2,
        'y': y1 + 15,
        'text': right_title,
        'color': right_color,
        'fontSize': 11,
        'fontWeight': 'bold',
        'anchor': 'middle'
    })
    for r_idx, line in enumerate(right_lines[:4]):
        labels.append({
            'x': rx1 + 12,
            'y': y1 + 50 + r_idx * 26,
            'text': line,
            'color': C_TEXT,
            'fontSize': 12,
            'fontWeight': 'normal',
            'anchor': 'start'
        })
        
    labels.append({
        'x': 260,
        'y': (y1 + y2) / 2,
        'text': 'VS',
        'color': C_PRIMARY,
        'fontSize': 12,
        'fontWeight': 'bold',
        'anchor': 'middle',
        'badge': True
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
        badge=badge or '>,\; <,\; \\ge,\; \\le',
        caption=caption or 'Znak równości w nierówności (kreska na dole ≥, ≤) oznacza, że punkt brzegowy NALEŻY do rozwiązań (zamalowane kółko ●).',
        cards=cards,
        metrics=metrics or def_metrics
    )


