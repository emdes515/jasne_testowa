import sys
import os
import re

sys.path.insert(0, os.path.abspath('.'))
sys.stdout.reconfigure(encoding='utf-8')

print("Starting automated cleanup of builders and visuals 11-21...")

# 1. Update topic_18.py
t18_path = "scripts/lesson_visuals_v2/topic_18.py"
with open(t18_path, encoding='utf-8') as f:
    t18_content = f.read()

# Replace \implies with \longrightarrow
t18_content = t18_content.replace(r'\implies', r'\longrightarrow')

# In L18.2, add alpha and beta angles
# Check if segments has OB and arcs has alpha, beta
old_l18_2_marker = "{'from': [255, 45], 'to': [345, 182], 'color': C_SUCCESS, 'strokeWidth': 2}"
new_l18_2_segments = """{'from': [255, 45], 'to': [345, 182], 'color': C_SUCCESS, 'strokeWidth': 2}, # SM
                # Promień okręgu opisanego R (do wierzchołka B)
                {'from': [255, 182], 'to': [320, 205], 'color': '#38BDF8', 'strokeWidth': 1.8, 'dashed': True}"""

if old_l18_2_marker in t18_content and "'to': [320, 205]" not in t18_content:
    t18_content = t18_content.replace(old_l18_2_marker, new_l18_2_segments)

# Add arcs in L18.2
old_l18_2_points_marker = "points=[\n                {'x': 255, 'y': 45"
new_l18_2_arcs = """arcs=[
                # Kąt nachylenia krawędzi bocznej α (błękit #38BDF8)
                {'cx': 320, 'cy': 205, 'r': 22, 'startAngleDeg': 230, 'endAngleDeg': 285, 'color': '#38BDF8', 'label': r'\\alpha'},
                # Kąt nachylenia ściany bocznej β (szmaragd #34D399)
                {'cx': 345, 'cy': 182, 'r': 20, 'startAngleDeg': 210, 'endAngleDeg': 270, 'color': '#34D399', 'label': r'\\beta'}
            ],
            points=[
                {'x': 255, 'y': 45"""

if old_l18_2_points_marker in t18_content and "startAngleDeg" not in t18_content:
    t18_content = t18_content.replace(old_l18_2_points_marker, new_l18_2_arcs)

# Add point B and update labels and metrics in L18.2
old_l18_2_labels_marker = "labels=[\n                {'x': 240, 'y': 115"
new_l18_2_labels = """labels=[
                {'x': 295, 'y': 215, 'text': 'R', 'color': '#38BDF8', 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 300, 'y': 175, 'text': 'kąt krawędzi α', 'color': '#38BDF8', 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'middle'},
                {'x': 370, 'y': 150, 'text': 'kąt ściany β', 'color': '#34D399', 'fontSize': 10, 'fontWeight': 'bold', 'anchor': 'start'},
                {'x': 240, 'y': 115"""

if old_l18_2_labels_marker in t18_content and "'text': 'kąt krawędzi α'" not in t18_content:
    t18_content = t18_content.replace(old_l18_2_labels_marker, new_l18_2_labels)

# Metrics in L18.2
old_l18_2_metrics = """            metrics=[
                {'label': 'Objętość ostrosłupa', 'value': r'$V = \\frac{1}{3}P_p \\cdot H$', 'color': C_PRIMARY},
                {'label': 'Trójkąt ze ścianą', 'value': r'$H^2 + r^2 = h_b^2$', 'color': C_SUCCESS},
                {'label': 'Trójkąt z krawędzią', 'value': r'$H^2 + R^2 = b^2$', 'color': C_SKY}
            ]"""

new_l18_2_metrics = """            metrics=[
                {'label': 'Kąt krawędzi α (błękit)', 'value': r'$H^2 + R^2 = b^2$', 'color': '#38BDF8'},
                {'label': 'Kąt ściany β (szmaragd)', 'value': r'$H^2 + r^2 = h_b^2$', 'color': '#34D399'},
                {'label': 'Objętość ostrosłupa', 'value': r'$V = \\frac{1}{3}P_p \\cdot H$', 'color': C_PRIMARY}
            ]"""

if old_l18_2_metrics in t18_content:
    t18_content = t18_content.replace(old_l18_2_metrics, new_l18_2_metrics)

with open(t18_path, 'w', encoding='utf-8') as f:
    f.write(t18_content)
print("Updated topic_18.py successfully.")

# 2. Update topic_20.py
t20_path = "scripts/lesson_visuals_v2/topic_20.py"
with open(t20_path, encoding='utf-8') as f:
    t20_content = f.read()

# Replace \implies with \longrightarrow
t20_content = t20_content.replace(r'\implies', r'\longrightarrow')

# Update L20.3 bar heights and segments for >= 25px clearance
old_l20_3_bars = """            bars=[
                {'x': 120, 'y': 180, 'width': 45, 'height': 30, 'color': C_SKY, 'label': 'x₁=2'},
                {'x': 180, 'y': 150, 'width': 45, 'height': 60, 'color': C_SKY, 'label': 'x₂=4'},
                {'x': 240, 'y': 120, 'width': 45, 'height': 90, 'color': C_SKY, 'label': 'x₃=6'},
                {'x': 300, 'y': 90, 'width': 45, 'height': 120, 'color': C_SKY, 'label': 'x₄=8'}
            ],
            segments=[
                {'from': [80, 210], 'to': [440, 210], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [80, 135], 'to': [440, 135], 'color': C_PRIMARY, 'strokeWidth': 1.8, 'dashed': True}
            ],"""

new_l20_3_bars = """            bars=[
                {'x': 120, 'y': 195, 'width': 45, 'height': 30, 'color': C_SKY, 'label': 'x₁=2'},
                {'x': 180, 'y': 165, 'width': 45, 'height': 60, 'color': C_SKY, 'label': 'x₂=4'},
                {'x': 240, 'y': 105, 'width': 45, 'height': 120, 'color': C_SKY, 'label': 'x₃=6'},
                {'x': 300, 'y': 75, 'width': 45, 'height': 150, 'color': C_SKY, 'label': 'x₄=8'}
            ],
            segments=[
                {'from': [80, 225], 'to': [440, 225], 'color': C_SLATE, 'strokeWidth': 2},
                {'from': [80, 135], 'to': [440, 135], 'color': C_PRIMARY, 'strokeWidth': 1.8, 'dashed': True}
            ],"""

if old_l20_3_bars in t20_content:
    t20_content = t20_content.replace(old_l20_3_bars, new_l20_3_bars)

with open(t20_path, 'w', encoding='utf-8') as f:
    f.write(t20_content)
print("Updated topic_20.py successfully.")

# 3. Clean \implies from ALL visuals topic_11 to topic_21
for t_num in range(11, 22):
    v_path = f"scripts/lesson_visuals_v2/topic_{t_num:02d}.py"
    if os.path.exists(v_path):
        with open(v_path, encoding='utf-8') as f:
            v_content = f.read()
        v_updated = v_content.replace(r'\implies', r'\longrightarrow')
        if v_updated != v_content:
            with open(v_path, 'w', encoding='utf-8') as f:
                f.write(v_updated)
            print(f"Cleaned \\implies in {v_path}")

print("Visuals cleanup complete.")
