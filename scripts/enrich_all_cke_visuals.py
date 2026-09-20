import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Helper: helper functions for building MathDiagram and NumberLine structures

def make_number_line(min_v, max_v, ticks, intervals):
    return {
        "min": min_v,
        "max": max_v,
        "ticks": ticks,
        "intervals": intervals
    }

def make_coordinate_plane(width=440, height=260, origin=(220, 130), x_range=(-5, 5), y_range=(-4, 4), step=1, scale=28):
    ox, oy = origin
    ticks = []
    # X ticks
    for val in range(x_range[0], x_range[1] + 1):
        if val == 0: continue
        ticks.append({"x": ox + val * scale, "y": oy, "label": str(val), "axis": "x"})
    # Y ticks
    for val in range(y_range[0], y_range[1] + 1):
        if val == 0: continue
        ticks.append({"x": ox, "y": oy - val * scale, "label": str(val), "axis": "y"})
    
    segments = [
        {"from": [25, oy], "to": [width - 25, oy], "color": "#94A3B8", "strokeWidth": 1.5},
        {"from": [ox, height - 20], "to": [ox, 20], "color": "#94A3B8", "strokeWidth": 1.5}
    ]
    labels = [
        {"x": width - 15, "y": oy + 14, "text": "x", "color": "#94A3B8", "fontSize": 12},
        {"x": ox + 12, "y": 24, "text": "y", "color": "#94A3B8", "fontSize": 12},
        {"x": ox - 10, "y": oy + 14, "text": "O", "color": "#64748B", "fontSize": 11}
    ]
    grid = {
        "minX": 30, "maxX": width - 30, "stepX": scale,
        "minY": 25, "maxY": height - 25, "stepY": scale,
        "color": "rgba(148, 163, 184, 0.12)"
    }
    return {
        "type": "GEOMETRY_2D",
        "width": width,
        "height": height,
        "grid": grid,
        "ticks": ticks,
        "segments": segments,
        "labels": labels,
        "origin": origin,
        "scale": scale
    }

# -------------------------------------------------------------------------------------------------
# 1. MATURA MAJ 2024
# -------------------------------------------------------------------------------------------------

maj_2024_diagrams = {
    # Zad 11: Dwie proste równoległe k i l
    "11": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Wykresy funkcji liniowych $f$ oraz $g$ w układzie współrzędnych",
            "width": 440,
            "height": 260,
            "grid": {"minX": 30, "maxX": 410, "stepX": 30, "minY": 25, "maxY": 235, "stepY": 30, "color": "rgba(148, 163, 184, 0.1)"},
            "ticks": [
                {"x": 190, "y": 130, "label": "-1", "axis": "x"},
                {"x": 250, "y": 130, "label": "1", "axis": "x"},
                {"x": 220, "y": 100, "label": "1", "axis": "y"},
                {"x": 220, "y": 160, "label": "-1", "axis": "y"}
            ],
            "segments": [
                # Osie
                {"from": [20, 130], "to": [420, 130], "color": "#94A3B8", "strokeWidth": 1.5},
                {"from": [220, 240], "to": [220, 20], "color": "#94A3B8", "strokeWidth": 1.5},
                # Prosta k (f(x) = ax + b, rosnąca, b > 0)
                {"from": [70, 220], "to": [370, 40], "color": "#FFB800", "strokeWidth": 2.5, "label": "k: y = ax + b"},
                # Prosta l (g(x) = cx + d, równoległa, d < 0)
                {"from": [120, 235], "to": [410, 60], "color": "#38BDF8", "strokeWidth": 2.5, "label": "l: y = cx + d"}
            ],
            "points": [
                {"x": 220, "y": 130, "label": "O", "labelPosition": "bottom-left", "dot": "none"},
                {"x": 220, "y": 100, "label": "b", "labelPosition": "left", "dot": "filled", "color": "#FFB800"},
                {"x": 220, "y": 160, "label": "d", "labelPosition": "right", "dot": "filled", "color": "#38BDF8"}
            ],
            "labels": [
                {"x": 415, "y": 144, "text": "x", "color": "#94A3B8"},
                {"x": 232, "y": 24, "text": "y", "color": "#94A3B8"}
            ]
        }
    },
    # Zad 14.1 - 14.4: Wykres funkcji kwadratowej f(x)
    "14.1": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Wykres funkcji kwadratowej $f$ z wierzchołkiem $W = (1, 9)$",
            "width": 460,
            "height": 280,
            "grid": {"minX": 30, "maxX": 430, "stepX": 25, "minY": 25, "maxY": 255, "stepY": 20, "color": "rgba(148, 163, 184, 0.12)"},
            "ticks": [
                {"x": 145, "y": 200, "label": "-2", "axis": "x"},
                {"x": 195, "y": 200, "label": "0", "axis": "x"},
                {"x": 220, "y": 200, "label": "1", "axis": "x"},
                {"x": 295, "y": 200, "label": "4", "axis": "x"},
                {"x": 195, "y": 40, "label": "8", "axis": "y"}
            ],
            "segments": [
                {"from": [20, 200], "to": [440, 200], "color": "#94A3B8", "strokeWidth": 1.5},
                {"from": [195, 260], "to": [195, 20], "color": "#94A3B8", "strokeWidth": 1.5},
                # Oś symetrii x = 1
                {"from": [220, 250], "to": [220, 30], "color": "#64748B", "strokeWidth": 1.2, "dashed": True}
            ],
            "curves": [
                # Parabola y = -(x-1)^2 + 9, wierzchołek (1, 9) -> px(220, 20), miejsca zerowe -2 -> px(145, 200), 4 -> px(295, 200)
                {"path": "M 120,250 Q 220,-30 320,250", "color": "#FFB800", "strokeWidth": 2.5}
            ],
            "points": [
                {"x": 220, "y": 20, "label": "W(1, 9)", "labelPosition": "top", "dot": "filled", "color": "#10B981"},
                {"x": 145, "y": 200, "label": "(-2, 0)", "labelPosition": "bottom-left", "dot": "filled", "color": "#FFB800"},
                {"x": 295, "y": 200, "label": "(4, 0)", "labelPosition": "bottom-right", "dot": "filled", "color": "#FFB800"},
                {"x": 195, "y": 40, "label": "(0, 8)", "labelPosition": "left", "dot": "filled", "color": "#38BDF8"}
            ],
            "labels": [
                {"x": 435, "y": 214, "text": "x", "color": "#94A3B8"},
                {"x": 208, "y": 24, "text": "y", "color": "#94A3B8"},
                {"x": 330, "y": 240, "text": "y = f(x)", "color": "#FFB800", "fontSize": 12}
            ]
        }
    },
    # Zad 18: Kąt alfa w układzie współrzędnych
    "18": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Kąt $\\alpha$ o wierzchołku $O=(0,0)$ w układzie kartezjańskim",
            "width": 420,
            "height": 260,
            "grid": {"minX": 30, "maxX": 390, "stepX": 30, "minY": 30, "maxY": 230, "stepY": 30, "color": "rgba(148, 163, 184, 0.12)"},
            "segments": [
                {"from": [20, 180], "to": [400, 180], "color": "#94A3B8", "strokeWidth": 1.5},
                {"from": [260, 240], "to": [260, 20], "color": "#94A3B8", "strokeWidth": 1.5},
                # Ramię końcowe kąta przechodzące przez P(-4, 3) -> px: 260 - 4*30 = 140, 180 - 3*30 = 90
                {"from": [260, 180], "to": [100, 60], "color": "#FFB800", "strokeWidth": 2.5},
                # Linie pomocnicze rzutujące punkt P
                {"from": [140, 180], "to": [140, 90], "color": "#64748B", "strokeWidth": 1, "dashed": True},
                {"from": [260, 90], "to": [140, 90], "color": "#64748B", "strokeWidth": 1, "dashed": True}
            ],
            "arcs": [
                {"cx": 260, "cy": 180, "r": 36, "startAngleDeg": 0, "endAngleDeg": 143, "color": "#10B981", "label": "α"}
            ],
            "points": [
                {"x": 260, "y": 180, "label": "O", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 140, "y": 90, "label": "P(-4, 3)", "labelPosition": "top-left", "dot": "filled", "color": "#FFB800"}
            ],
            "ticks": [
                {"x": 140, "y": 180, "label": "-4", "axis": "x"},
                {"x": 260, "y": 90, "label": "3", "axis": "y"}
            ],
            "labels": [
                {"x": 395, "y": 194, "text": "x", "color": "#94A3B8"},
                {"x": 272, "y": 24, "text": "y", "color": "#94A3B8"}
            ]
        }
    },
    # Zad 20: Trójkąt KLM z dwusieczną kąta
    "20": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Trójkąt $KLM$ z dwusieczną kąta $KML$ przecinającą bok $KL$ w punkcie $D$",
            "width": 440,
            "height": 260,
            "polygons": [
                {"points": [[50, 220], [390, 220], [170, 50]], "fill": "rgba(255, 184, 0, 0.06)", "stroke": "#FFB800", "strokeWidth": 2}
            ],
            "segments": [
                # Dwusieczna MD
                {"from": [170, 50], "to": [175, 220], "color": "#38BDF8", "strokeWidth": 2, "label": "dwusieczna"}
            ],
            "arcs": [
                {"cx": 170, "cy": 50, "r": 28, "startAngleDeg": 125, "endAngleDeg": 148, "color": "#10B981", "label": "•"},
                {"cx": 170, "cy": 50, "r": 28, "startAngleDeg": 148, "endAngleDeg": 170, "color": "#10B981", "label": "•"}
            ],
            "points": [
                {"x": 50, "y": 220, "label": "K", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 390, "y": 220, "label": "L", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 170, "y": 50, "label": "M", "labelPosition": "top", "dot": "filled"},
                {"x": 175, "y": 220, "label": "D", "labelPosition": "bottom", "dot": "filled", "color": "#38BDF8"}
            ],
            "labels": [
                {"x": 95, "y": 125, "text": "a", "color": "#FFB800", "fontSize": 13},
                {"x": 290, "y": 125, "text": "b", "color": "#FFB800", "fontSize": 13}
            ]
        }
    },
    # Zad 22: Trójkąt wpisany w okrąg z kątem 42 stopnie
    "22": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Kąt wpisany $\\angle ACB = 42^\\circ$ i kąt środkowy $\\angle ASB$ w okręgu",
            "width": 440,
            "height": 260,
            "circles": [
                {"cx": 220, "cy": 135, "r": 95, "stroke": "#38BDF8", "strokeWidth": 2, "fill": "rgba(56, 189, 248, 0.04)"}
            ],
            "polygons": [
                # Trójkąt ABC
                {"points": [[135, 175], [305, 175], [200, 42]], "stroke": "#FFB800", "strokeWidth": 2, "fill": "rgba(255, 184, 0, 0.05)"}
            ],
            "segments": [
                # Promienie SA i SB do środka
                {"from": [220, 135], "to": [135, 175], "color": "#10B981", "strokeWidth": 1.5, "dashed": True},
                {"from": [220, 135], "to": [305, 175], "color": "#10B981", "strokeWidth": 1.5, "dashed": True}
            ],
            "arcs": [
                {"cx": 200, "cy": 42, "r": 24, "startAngleDeg": 120, "endAngleDeg": 162, "color": "#FFB800", "label": "42°"},
                {"cx": 220, "cy": 135, "r": 25, "startAngleDeg": 115, "endAngleDeg": 195, "color": "#10B981", "label": "84°"}
            ],
            "points": [
                {"x": 135, "y": 175, "label": "A", "labelPosition": "left", "dot": "filled"},
                {"x": 305, "y": 175, "label": "B", "labelPosition": "right", "dot": "filled"},
                {"x": 200, "y": 42, "label": "C", "labelPosition": "top", "dot": "filled"},
                {"x": 220, "y": 135, "label": "S", "labelPosition": "top", "dot": "filled", "color": "#10B981"}
            ]
        }
    },
    # Zad 25.1 / 25.2: Graniastosłup prawidłowy sześciokątny
    "25.1": {
        "diagram": {
            "type": "STEREOMETRY_3D",
            "title": "Graniastosłup prawidłowy sześciokątny z dłuższą przekątną podstawy $AD$ i przekątną bryły $AD'$",
            "width": 460,
            "height": 280,
            "polygons": [
                # Górna podstawa A'B'C'D'E'F'
                {"points": [[180, 50], [240, 50], [280, 75], [260, 100], [200, 100], [160, 75]], "stroke": "#38BDF8", "strokeWidth": 2, "fill": "rgba(56, 189, 248, 0.1)"}
            ],
            "segments": [
                # Krawędzie pionowe widoczne
                {"from": [180, 50], "to": [180, 180], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [240, 50], "to": [240, 180], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [280, 75], "to": [280, 205], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [260, 100], "to": [260, 230], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [200, 100], "to": [200, 230], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [160, 75], "to": [160, 205], "color": "#38BDF8", "strokeWidth": 1.75},
                # Dolna podstawa widoczna
                {"from": [160, 205], "to": [200, 230], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [200, 230], "to": [260, 230], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [260, 230], "to": [280, 205], "color": "#38BDF8", "strokeWidth": 1.75},
                # Dolna podstawa niewidoczna (dashed)
                {"from": [160, 205], "to": [180, 180], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
                {"from": [180, 180], "to": [240, 180], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
                {"from": [240, 180], "to": [280, 205], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
                # Dłuższa przekątna podstawy AD (dashed)
                {"from": [160, 205], "to": [260, 230], "color": "#FFB800", "strokeWidth": 1.5, "dashed": True, "label": "AD"},
                # Najdłuższa przekątna graniastosłupa AD' (D' to [260, 100])
                {"from": [160, 205], "to": [260, 100], "color": "#10B981", "strokeWidth": 2, "label": "AD'"}
            ],
            "points": [
                {"x": 160, "y": 205, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 260, "y": 230, "label": "D", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 260, "y": 100, "label": "D'", "labelPosition": "top-right", "dot": "filled", "color": "#10B981"}
            ]
        }
    },
    # Zad 29: Diagram słupkowy ze sprawdzianu z matematyki
    "29": {
        "diagram": {
            "type": "STATISTICS",
            "title": "Wyniki sprawdzianu z matematyki w klasie maturalnej (liczba uczniów vs ocena)",
            "width": 460,
            "height": 260,
            "segments": [
                # Osie
                {"from": [50, 210], "to": [420, 210], "color": "#94A3B8", "strokeWidth": 1.5},
                {"from": [50, 210], "to": [50, 25], "color": "#94A3B8", "strokeWidth": 1.5}
            ],
            "ticks": [
                {"x": 50, "y": 185, "label": "2", "axis": "y"},
                {"x": 50, "y": 155, "label": "4", "axis": "y"},
                {"x": 50, "y": 125, "label": "6", "axis": "y"},
                {"x": 50, "y": 95, "label": "8", "axis": "y"},
                {"x": 50, "y": 65, "label": "10", "axis": "y"}
            ],
            "bars": [
                {"x": 80, "y": 195, "width": 38, "height": 15, "label": "1", "category": "1"},
                {"x": 135, "y": 165, "width": 38, "height": 45, "label": "3", "category": "2"},
                {"x": 190, "y": 95, "width": 38, "height": 115, "label": "8", "category": "3"},
                {"x": 245, "y": 65, "width": 38, "height": 145, "label": "10", "category": "4"},
                {"x": 300, "y": 125, "width": 38, "height": 85, "label": "6", "category": "5"},
                {"x": 355, "y": 180, "width": 38, "height": 30, "label": "2", "category": "6"}
            ],
            "labels": [
                {"x": 425, "y": 215, "text": "ocena", "color": "#94A3B8", "fontSize": 11},
                {"x": 50, "y": 16, "text": "liczba uczniów", "color": "#94A3B8", "fontSize": 11}
            ]
        }
    }
}

# -------------------------------------------------------------------------------------------------
# 2. MATURA CZERWIEC 2024
# -------------------------------------------------------------------------------------------------

czerwiec_2024_diagrams = {
    # Zad 20: Trapez prostokątny ABCD (podstawy 8 i 5, wysokość AD = 4)
    "20": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Trapez prostokątny $ABCD$ o podstawach $|AB| = 8$, $|CD| = 5$ i wysokości $|AD|$",
            "width": 440,
            "height": 260,
            "polygons": [
                {"points": [[70, 200], [350, 200], [245, 70], [70, 70]], "fill": "rgba(255, 184, 0, 0.08)", "stroke": "#FFB800", "strokeWidth": 2}
            ],
            "arcs": [
                {"cx": 70, "cy": 200, "r": 16, "startAngleDeg": 270, "endAngleDeg": 360, "color": "#FFB800", "showRightAngleDot": True},
                {"cx": 70, "cy": 70, "r": 16, "startAngleDeg": 0, "endAngleDeg": 90, "color": "#FFB800", "showRightAngleDot": True}
            ],
            "segments": [
                # Wysokość z punktu C na podstawę AB (dashed)
                {"from": [245, 70], "to": [245, 200], "color": "#38BDF8", "strokeWidth": 1.5, "dashed": True, "label": "h = 4"}
            ],
            "points": [
                {"x": 70, "y": 200, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 350, "y": 200, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 245, "y": 70, "label": "C", "labelPosition": "top-right", "dot": "filled"},
                {"x": 70, "y": 70, "label": "D", "labelPosition": "top-left", "dot": "filled"}
            ],
            "labels": [
                {"x": 210, "y": 222, "text": "|AB| = 8", "color": "#FFB800", "fontSize": 12},
                {"x": 155, "y": 56, "text": "|CD| = 5", "color": "#FFB800", "fontSize": 12},
                {"x": 42, "y": 140, "text": "AD", "color": "#FFB800", "fontSize": 12},
                {"x": 310, "y": 130, "text": "BC", "color": "#FFB800", "fontSize": 12}
            ]
        }
    },
    # Zad 21: Kąty w okręgu o środku S i łuk AB
    "21": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Okrąg o środku w punkcie $S$ i kąty oparte na łuku $AB$",
            "width": 440,
            "height": 260,
            "circles": [
                {"cx": 220, "cy": 130, "r": 90, "stroke": "#38BDF8", "strokeWidth": 2, "fill": "rgba(56, 189, 248, 0.04)"}
            ],
            "segments": [
                {"from": [220, 130], "to": [140, 175], "color": "#10B981", "strokeWidth": 1.5},
                {"from": [220, 130], "to": [300, 175], "color": "#10B981", "strokeWidth": 1.5},
                {"from": [140, 175], "to": [210, 42], "color": "#FFB800", "strokeWidth": 1.75},
                {"from": [300, 175], "to": [210, 42], "color": "#FFB800", "strokeWidth": 1.75}
            ],
            "points": [
                {"x": 140, "y": 175, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 300, "y": 175, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 210, "y": 42, "label": "C", "labelPosition": "top", "dot": "filled"},
                {"x": 220, "y": 130, "label": "S", "labelPosition": "bottom", "dot": "filled", "color": "#10B981"}
            ]
        }
    },
    # Zad 27: Graniastosłup prawidłowy czworokątny z przekątną
    "27": {
        "diagram": {
            "type": "STEREOMETRY_3D",
            "title": "Graniastosłup prawidłowy czworokątny z przekątną bryły $AC'$ i przekątną podstawy $AC$",
            "width": 440,
            "height": 270,
            "polygons": [
                {"points": [[160, 60], [280, 60], [330, 95], [210, 95]], "stroke": "#38BDF8", "strokeWidth": 2, "fill": "rgba(56, 189, 248, 0.08)"}
            ],
            "segments": [
                {"from": [160, 60], "to": [160, 190], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
                {"from": [280, 60], "to": [280, 190], "color": "#38BDF8", "strokeWidth": 2},
                {"from": [330, 95], "to": [330, 225], "color": "#38BDF8", "strokeWidth": 2},
                {"from": [210, 95], "to": [210, 225], "color": "#38BDF8", "strokeWidth": 2},
                {"from": [210, 225], "to": [330, 225], "color": "#38BDF8", "strokeWidth": 2},
                {"from": [330, 225], "to": [280, 190], "color": "#38BDF8", "strokeWidth": 2},
                {"from": [280, 190], "to": [160, 190], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
                {"from": [160, 190], "to": [210, 225], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
                # Przekątna podstawy AC (dashed)
                {"from": [210, 225], "to": [280, 190], "color": "#FFB800", "strokeWidth": 1.5, "dashed": True, "label": "d = 4√2"},
                # Przekątna bryły AC'
                {"from": [210, 225], "to": [280, 60], "color": "#10B981", "strokeWidth": 2, "label": "D"}
            ],
            "points": [
                {"x": 210, "y": 225, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 330, "y": 225, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 280, "y": 190, "label": "C", "labelPosition": "right", "dot": "filled"},
                {"x": 280, "y": 60, "label": "C'", "labelPosition": "top-right", "dot": "filled", "color": "#10B981"}
            ]
        }
    },
    # Zad 28: Diagram słupkowy sprawdzianu Czerwiec 2024
    "28": {
        "diagram": {
            "type": "STATISTICS",
            "title": "Diagram wyników sprawdzianu z matematyki (częstość ocen)",
            "width": 460,
            "height": 260,
            "segments": [
                {"from": [50, 210], "to": [420, 210], "color": "#94A3B8", "strokeWidth": 1.5},
                {"from": [50, 210], "to": [50, 25], "color": "#94A3B8", "strokeWidth": 1.5}
            ],
            "ticks": [
                {"x": 50, "y": 175, "label": "2", "axis": "y"},
                {"x": 50, "y": 140, "label": "4", "axis": "y"},
                {"x": 50, "y": 105, "label": "6", "axis": "y"},
                {"x": 50, "y": 70, "label": "8", "axis": "y"}
            ],
            "bars": [
                {"x": 85, "y": 175, "width": 38, "height": 35, "label": "2", "category": "1"},
                {"x": 140, "y": 140, "width": 38, "height": 70, "label": "4", "category": "2"},
                {"x": 195, "y": 70, "width": 38, "height": 140, "label": "8", "category": "3"},
                {"x": 250, "y": 88, "width": 38, "height": 122, "label": "7", "category": "4"},
                {"x": 305, "y": 140, "width": 38, "height": 70, "label": "4", "category": "5"},
                {"x": 360, "y": 192, "width": 38, "height": 18, "label": "1", "category": "6"}
            ],
            "labels": [
                {"x": 425, "y": 215, "text": "ocena", "color": "#94A3B8", "fontSize": 11},
                {"x": 50, "y": 16, "text": "liczba uczniów", "color": "#94A3B8", "fontSize": 11}
            ]
        }
    }
}

# -------------------------------------------------------------------------------------------------
# 3. MATURA MAJ 2023
# -------------------------------------------------------------------------------------------------

maj_2023_diagrams = {
    # Zad 1: Oś liczbowa w pytaniu (suma przedziałów (-inf, -2> u (3, +inf))
    "1": {
        "numberLine": {
            "min": -5,
            "max": 6,
            "ticks": [-2, 3],
            "intervals": [
                {"from": None, "to": -2, "toIncluded": True},
                {"from": 3, "to": None, "fromIncluded": False}
            ]
        }
    },
    # Zad 10: Dwie proste przecinające się w układzie współrzędnych
    "10": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Interpretacja geometryczna układu równań w układzie współrzędnych",
            "width": 440,
            "height": 260,
            "grid": {"minX": 30, "maxX": 410, "stepX": 30, "minY": 25, "maxY": 235, "stepY": 30, "color": "rgba(148, 163, 184, 0.1)"},
            "ticks": [
                {"x": 160, "y": 130, "label": "0", "axis": "x"},
                {"x": 220, "y": 130, "label": "2", "axis": "x"},
                {"x": 160, "y": 100, "label": "1", "axis": "y"}
            ],
            "segments": [
                {"from": [20, 130], "to": [420, 130], "color": "#94A3B8", "strokeWidth": 1.5},
                {"from": [160, 240], "to": [160, 20], "color": "#94A3B8", "strokeWidth": 1.5},
                # Prosta 1: y = 2x - 3 (przechodzi przez (2, 1) px: 220, 100)
                {"from": [100, 220], "to": [280, 10], "color": "#FFB800", "strokeWidth": 2.5, "label": "y = 2x - 3"},
                # Prosta 2: y = -x + 3 (przechodzi przez (2, 1))
                {"from": [100, 40], "to": [310, 250], "color": "#38BDF8", "strokeWidth": 2.5, "label": "y = -x + 3"}
            ],
            "points": [
                {"x": 220, "y": 100, "label": "(2, 1)", "labelPosition": "top-right", "dot": "filled", "color": "#10B981"}
            ],
            "labels": [
                {"x": 415, "y": 144, "text": "x", "color": "#94A3B8"},
                {"x": 172, "y": 24, "text": "y", "color": "#94A3B8"}
            ]
        }
    },
    # Zad 14: Parabola z wierzchołkiem W(-2, 9) i miejscami zerowymi -5 i 1
    "14": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Wykres funkcji kwadratowej $f(x)$ z wierzchołkiem $W = (-2, 9)$",
            "width": 440,
            "height": 260,
            "grid": {"minX": 30, "maxX": 410, "stepX": 25, "minY": 25, "maxY": 235, "stepY": 20, "color": "rgba(148, 163, 184, 0.12)"},
            "segments": [
                {"from": [20, 190], "to": [420, 190], "color": "#94A3B8", "strokeWidth": 1.5},
                {"from": [245, 240], "to": [245, 20], "color": "#94A3B8", "strokeWidth": 1.5}
            ],
            "curves": [
                {"path": "M 100,240 Q 195,-20 290,240", "color": "#FFB800", "strokeWidth": 2.5}
            ],
            "points": [
                {"x": 195, "y": 25, "label": "W(-2, 9)", "labelPosition": "top", "dot": "filled", "color": "#10B981"},
                {"x": 120, "y": 190, "label": "-5", "labelPosition": "bottom-left", "dot": "filled", "color": "#FFB800"},
                {"x": 270, "y": 190, "label": "1", "labelPosition": "bottom-right", "dot": "filled", "color": "#FFB800"}
            ],
            "labels": [
                {"x": 415, "y": 204, "text": "x", "color": "#94A3B8"},
                {"x": 257, "y": 24, "text": "y", "color": "#94A3B8"}
            ]
        }
    },
    # Zad 21: Kąty w okręgu, trójkąt ACO, kąt 70 stopni
    "21": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Kąt $\\angle ACO = 70^\\circ$ w okręgu o środku $O$",
            "width": 440,
            "height": 260,
            "circles": [
                {"cx": 220, "cy": 130, "r": 90, "stroke": "#38BDF8", "strokeWidth": 2, "fill": "rgba(56, 189, 248, 0.04)"}
            ],
            "polygons": [
                {"points": [[140, 175], [300, 175], [195, 42]], "stroke": "#FFB800", "strokeWidth": 2, "fill": "rgba(255, 184, 0, 0.05)"}
            ],
            "segments": [
                {"from": [220, 130], "to": [140, 175], "color": "#10B981", "strokeWidth": 1.5, "dashed": True},
                {"from": [220, 130], "to": [195, 42], "color": "#10B981", "strokeWidth": 1.5, "dashed": True}
            ],
            "arcs": [
                {"cx": 195, "cy": 42, "r": 22, "startAngleDeg": 125, "endAngleDeg": 195, "color": "#FFB800", "label": "70°"}
            ],
            "points": [
                {"x": 140, "y": 175, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 300, "y": 175, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 195, "y": 42, "label": "C", "labelPosition": "top", "dot": "filled"},
                {"x": 220, "y": 130, "label": "O", "labelPosition": "bottom", "dot": "filled", "color": "#10B981"}
            ]
        }
    },
    # Zad 26: Ostrosłup prawidłowy czworokątny z kątem nachylenia ściany bocznej
    "26": {
        "diagram": {
            "type": "STEREOMETRY_3D",
            "title": "Ostrosłup prawidłowy czworokątny z wysokością ściany bocznej $h_s$ i kątem nachylenia $\\alpha$",
            "width": 440,
            "height": 260,
            "segments": [
                # Podstawa ABCD
                {"from": [120, 200], "to": [260, 220], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [260, 220], "to": [340, 170], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [340, 170], "to": [200, 150], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
                {"from": [200, 150], "to": [120, 200], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
                # Krawędzie boczne
                {"from": [120, 200], "to": [230, 45], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [260, 220], "to": [230, 45], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [340, 170], "to": [230, 45], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [200, 150], "to": [230, 45], "color": "#64748B", "strokeWidth": 1.25, "dashed": True},
                # Wysokość ostrosłupa H (środek podstawy to ok. (230, 185))
                {"from": [230, 45], "to": [230, 185], "color": "#10B981", "strokeWidth": 1.5, "dashed": True, "label": "H"},
                # Wysokość ściany bocznej hs (do środka krawędzi BC: ok. (300, 195))
                {"from": [230, 45], "to": [300, 195], "color": "#FFB800", "strokeWidth": 1.75, "label": "hs"},
                # Odcinek łączący spodek wysokości z krawędzią BC (promień okręgu wpisanego a/2)
                {"from": [230, 185], "to": [300, 195], "color": "#FFB800", "strokeWidth": 1.5, "dashed": True, "label": "a/2"}
            ],
            "arcs": [
                {"cx": 300, "cy": 195, "r": 20, "startAngleDeg": 200, "endAngleDeg": 260, "color": "#FFB800", "label": "α"}
            ],
            "points": [
                {"x": 230, "y": 45, "label": "S", "labelPosition": "top", "dot": "filled"},
                {"x": 120, "y": 200, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 260, "y": 220, "label": "B", "labelPosition": "bottom", "dot": "filled"},
                {"x": 340, "y": 170, "label": "C", "labelPosition": "right", "dot": "filled"}
            ]
        }
    }
}

# -------------------------------------------------------------------------------------------------
# 4. MATURA SIERPIEŃ 2024
# -------------------------------------------------------------------------------------------------

sierpien_2024_diagrams = {
    # Zad 8: Dwie proste przecinające się
    "8": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Interpretacja geometryczna układu równań w układzie współrzędnych",
            "width": 440,
            "height": 260,
            "grid": {"minX": 30, "maxX": 410, "stepX": 30, "minY": 25, "maxY": 235, "stepY": 30, "color": "rgba(148, 163, 184, 0.1)"},
            "ticks": [
                {"x": 180, "y": 130, "label": "0", "axis": "x"},
                {"x": 210, "y": 130, "label": "1", "axis": "x"},
                {"x": 180, "y": 70, "label": "2", "axis": "y"}
            ],
            "segments": [
                {"from": [20, 130], "to": [420, 130], "color": "#94A3B8", "strokeWidth": 1.5},
                {"from": [180, 240], "to": [180, 20], "color": "#94A3B8", "strokeWidth": 1.5},
                # Dwie proste
                {"from": [90, 220], "to": [330, 20], "color": "#FFB800", "strokeWidth": 2.5},
                {"from": [90, 40], "to": [310, 240], "color": "#38BDF8", "strokeWidth": 2.5}
            ],
            "points": [
                {"x": 210, "y": 70, "label": "(1, 2)", "labelPosition": "top-right", "dot": "filled", "color": "#10B981"}
            ],
            "labels": [
                {"x": 415, "y": 144, "text": "x", "color": "#94A3B8"},
                {"x": 192, "y": 24, "text": "y", "color": "#94A3B8"}
            ]
        }
    },
    # Zad 19: Okrąg o środku S i kąt środkowy 160 stopni
    "19": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Kąt środkowy $\\angle KSM = 160^\\circ$ i kąt wpisany $\\angle KLM$ w okręgu",
            "width": 440,
            "height": 260,
            "circles": [
                {"cx": 220, "cy": 130, "r": 90, "stroke": "#38BDF8", "strokeWidth": 2, "fill": "rgba(56, 189, 248, 0.04)"}
            ],
            "segments": [
                {"from": [220, 130], "to": [135, 160], "color": "#10B981", "strokeWidth": 1.75},
                {"from": [220, 130], "to": [305, 160], "color": "#10B981", "strokeWidth": 1.75},
                {"from": [135, 160], "to": [220, 40], "color": "#FFB800", "strokeWidth": 1.75},
                {"from": [305, 160], "to": [220, 40], "color": "#FFB800", "strokeWidth": 1.75}
            ],
            "arcs": [
                {"cx": 220, "cy": 130, "r": 25, "startAngleDeg": 100, "endAngleDeg": 260, "color": "#10B981", "label": "160°"},
                {"cx": 220, "cy": 40, "r": 25, "startAngleDeg": 125, "endAngleDeg": 235, "color": "#FFB800", "label": "80°"}
            ],
            "points": [
                {"x": 135, "y": 160, "label": "K", "labelPosition": "left", "dot": "filled"},
                {"x": 305, "y": 160, "label": "M", "labelPosition": "right", "dot": "filled"},
                {"x": 220, "y": 40, "label": "L", "labelPosition": "top", "dot": "filled"},
                {"x": 220, "y": 130, "label": "S", "labelPosition": "bottom", "dot": "filled", "color": "#10B981"}
            ]
        }
    },
    # Zad 20: Trapez prostokątny o podstawach 12 i 6
    "20": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Trapez prostokątny $ABCD$ o podstawach $|AB| = 12$ oraz $|CD| = 6$",
            "width": 440,
            "height": 260,
            "polygons": [
                {"points": [[60, 200], [380, 200], [220, 70], [60, 70]], "fill": "rgba(255, 184, 0, 0.08)", "stroke": "#FFB800", "strokeWidth": 2}
            ],
            "arcs": [
                {"cx": 60, "cy": 200, "r": 16, "startAngleDeg": 270, "endAngleDeg": 360, "color": "#FFB800", "showRightAngleDot": True},
                {"cx": 60, "cy": 70, "r": 16, "startAngleDeg": 0, "endAngleDeg": 90, "color": "#FFB800", "showRightAngleDot": True}
            ],
            "segments": [
                {"from": [220, 70], "to": [220, 200], "color": "#38BDF8", "strokeWidth": 1.5, "dashed": True, "label": "h"}
            ],
            "points": [
                {"x": 60, "y": 200, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 380, "y": 200, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 220, "y": 70, "label": "C", "labelPosition": "top-right", "dot": "filled"},
                {"x": 60, "y": 70, "label": "D", "labelPosition": "top-left", "dot": "filled"}
            ],
            "labels": [
                {"x": 220, "y": 222, "text": "|AB| = 12", "color": "#FFB800"},
                {"x": 140, "y": 56, "text": "|CD| = 6", "color": "#FFB800"}
            ]
        }
    }
}

# -------------------------------------------------------------------------------------------------
# 5. MATURA CZERWIEC 2023
# -------------------------------------------------------------------------------------------------

czerwiec_2023_diagrams = {
    # Zad 20: Trójkąt o kątach 30, 45, 105 stopni
    "20": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Trójkąt o kątach $30^\\circ, 45^\\circ, 105^\\circ$",
            "width": 440,
            "height": 260,
            "polygons": [
                {"points": [[50, 200], [380, 200], [170, 80]], "fill": "rgba(255, 184, 0, 0.08)", "stroke": "#FFB800", "strokeWidth": 2}
            ],
            "segments": [
                # Wysokość dzieląca trójkąt na 45-45-90 i 30-60-90
                {"from": [170, 80], "to": [170, 200], "color": "#38BDF8", "strokeWidth": 1.5, "dashed": True, "label": "h"}
            ],
            "arcs": [
                {"cx": 50, "cy": 200, "r": 35, "startAngleDeg": 315, "endAngleDeg": 360, "color": "#10B981", "label": "45°"},
                {"cx": 380, "cy": 200, "r": 45, "startAngleDeg": 180, "endAngleDeg": 210, "color": "#10B981", "label": "30°"},
                {"cx": 170, "cy": 80, "r": 28, "startAngleDeg": 135, "endAngleDeg": 240, "color": "#FFB800", "label": "105°"}
            ],
            "points": [
                {"x": 50, "y": 200, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 380, "y": 200, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 170, "y": 80, "label": "C", "labelPosition": "top", "dot": "filled"}
            ]
        }
    },
    # Zad 22: Trapez z przecinającymi się przekątnymi w E
    "22": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Trapez $ABCD$ o podstawach $AB$ i $CD$ z przekątnymi przecinającymi się w punkcie $E$",
            "width": 440,
            "height": 260,
            "polygons": [
                {"points": [[60, 200], [380, 200], [280, 70], [140, 70]], "fill": "rgba(255, 184, 0, 0.06)", "stroke": "#FFB800", "strokeWidth": 2}
            ],
            "segments": [
                {"from": [60, 200], "to": [280, 70], "color": "#38BDF8", "strokeWidth": 1.75},
                {"from": [380, 200], "to": [140, 70], "color": "#38BDF8", "strokeWidth": 1.75}
            ],
            "points": [
                {"x": 60, "y": 200, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 380, "y": 200, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 280, "y": 70, "label": "C", "labelPosition": "top-right", "dot": "filled"},
                {"x": 140, "y": 70, "label": "D", "labelPosition": "top-left", "dot": "filled"},
                {"x": 210, "y": 140, "label": "E", "labelPosition": "top", "dot": "filled", "color": "#10B981"}
            ]
        }
    },
    # Zad 25: Równoległobok ABCD o polu 40√6
    "25": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Równoległobok $ABCD$ o boku $|AD| = 10$ i polu $P = 40\\sqrt{6}$",
            "width": 440,
            "height": 260,
            "polygons": [
                {"points": [[60, 190], [320, 190], [380, 70], [120, 70]], "fill": "rgba(255, 184, 0, 0.06)", "stroke": "#FFB800", "strokeWidth": 2}
            ],
            "segments": [
                {"from": [120, 70], "to": [120, 190], "color": "#38BDF8", "strokeWidth": 1.5, "dashed": True, "label": "h"}
            ],
            "arcs": [
                {"cx": 60, "cy": 190, "r": 28, "startAngleDeg": 295, "endAngleDeg": 360, "color": "#10B981", "label": "α"}
            ],
            "points": [
                {"x": 60, "y": 190, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 320, "y": 190, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 380, "y": 70, "label": "C", "labelPosition": "top-right", "dot": "filled"},
                {"x": 120, "y": 70, "label": "D", "labelPosition": "top-left", "dot": "filled"}
            ],
            "labels": [
                {"x": 75, "y": 125, "text": "10", "color": "#FFB800"}
            ]
        }
    }
}

# -------------------------------------------------------------------------------------------------
# 6. MATURA SIERPIEŃ 2023
# -------------------------------------------------------------------------------------------------

sierpien_2023_diagrams = {
    # Zad 24: Trapez równoramienny o podstawach 6 i ramieniu 4
    "24": {
        "diagram": {
            "type": "GEOMETRY_2D",
            "title": "Trapez równoramienny $ABCD$ o podstawie $|CD| = 6$ i ramionach $|AD| = |BC| = 4$",
            "width": 440,
            "height": 260,
            "polygons": [
                {"points": [[60, 190], [380, 190], [280, 70], [160, 70]], "fill": "rgba(255, 184, 0, 0.08)", "stroke": "#FFB800", "strokeWidth": 2}
            ],
            "segments": [
                {"from": [160, 70], "to": [160, 190], "color": "#38BDF8", "strokeWidth": 1.5, "dashed": True, "label": "h"},
                {"from": [280, 70], "to": [280, 190], "color": "#38BDF8", "strokeWidth": 1.5, "dashed": True, "label": "h"}
            ],
            "arcs": [
                {"cx": 60, "cy": 190, "r": 30, "startAngleDeg": 310, "endAngleDeg": 360, "color": "#10B981", "label": "60°"},
                {"cx": 380, "cy": 190, "r": 30, "startAngleDeg": 180, "endAngleDeg": 230, "color": "#10B981", "label": "60°"}
            ],
            "points": [
                {"x": 60, "y": 190, "label": "A", "labelPosition": "bottom-left", "dot": "filled"},
                {"x": 380, "y": 190, "label": "B", "labelPosition": "bottom-right", "dot": "filled"},
                {"x": 280, "y": 70, "label": "C", "labelPosition": "top-right", "dot": "filled"},
                {"x": 160, "y": 70, "label": "D", "labelPosition": "top-left", "dot": "filled"}
            ],
            "labels": [
                {"x": 220, "y": 55, "text": "|CD| = 6", "color": "#FFB800"},
                {"x": 95, "y": 125, "text": "4", "color": "#FFB800"},
                {"x": 340, "y": 125, "text": "4", "color": "#FFB800"}
            ]
        }
    }
}

# -------------------------------------------------------------------------------------------------
# INJECTION ROUTINE
# -------------------------------------------------------------------------------------------------

all_exam_map = {
    "seed/curriculum/exams/matura-maj-2024.json": maj_2024_diagrams,
    "seed/curriculum/exams/matura-czerwiec-2024.json": czerwiec_2024_diagrams,
    "seed/curriculum/exams/matura-sierpien-2024.json": sierpien_2024_diagrams,
    "seed/curriculum/exams/matura-maj-2023.json": maj_2023_diagrams,
    "seed/curriculum/exams/matura-czerwiec-2023.json": czerwiec_2023_diagrams,
    "seed/curriculum/exams/matura-sierpien-2023.json": sierpien_2023_diagrams,
}

total_updated = 0

for filepath, diag_dict in all_exam_map.items():
    if not os.path.exists(filepath):
        print(f"[SKIP] File not found: {filepath}")
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        tasks = json.load(f)
    
    file_updated = 0
    for t in tasks:
        t_num = str(t.get('taskNumber', '')).strip()
        if t_num in diag_dict:
            props = diag_dict[t_num]
            if "diagram" in props:
                t["diagram"] = props["diagram"]
            if "numberLine" in props:
                t["numberLine"] = props["numberLine"]
            file_updated += 1
            total_updated += 1
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(tasks, f, indent=2, ensure_ascii=False)
    print(f"[OK] {filepath}: updated {file_updated} visual tasks.")

print(f"\nŁącznie zaktualizowano {total_updated} zadań wizualnych w pojedynczych arkuszach.")

# -------------------------------------------------------------------------------------------------
# REBUILD zadania_matura.json & cke_tasks_matematyka.json
# -------------------------------------------------------------------------------------------------
print("\nBudowanie master sheeta zadania_matura.json...")
master_tasks = []
for ef in all_exam_map.keys():
    with open(ef, 'r', encoding='utf-8') as f:
        master_tasks.extend(json.load(f))

with open('seed/curriculum/zadania_matura.json', 'w', encoding='utf-8') as f:
    json.dump(master_tasks, f, indent=2, ensure_ascii=False)
print(f"[OK] Zapisano {len(master_tasks)} zadań do seed/curriculum/zadania_matura.json")

# Update cke_tasks_matematyka.json
print("\nAktualizacja bazy Maratonu cke_tasks_matematyka.json...")
with open('seed/curriculum/cke_tasks_matematyka.json', 'r', encoding='utf-8') as f:
    maraton = json.load(f)

exam_task_by_id = {t.get('id'): t for t in master_tasks if t.get('id')}
maraton_updated = 0
for t in maraton:
    tid = t.get('id')
    if tid in exam_task_by_id:
        src_task = exam_task_by_id[tid]
        if 'diagram' in src_task:
            t['diagram'] = src_task['diagram']
            maraton_updated += 1
        if 'numberLine' in src_task:
            t['numberLine'] = src_task['numberLine']
            maraton_updated += 1
        if 'options' in src_task:
            t['options'] = src_task['options']

with open('seed/curriculum/cke_tasks_matematyka.json', 'w', encoding='utf-8') as f:
    json.dump(maraton, f, indent=2, ensure_ascii=False)
print(f"[OK] Zsynchronizowano {maraton_updated} pól wizualnych w cke_tasks_matematyka.json")
