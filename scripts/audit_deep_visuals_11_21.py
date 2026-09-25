import sys
import os
import importlib
import re

sys.path.insert(0, os.path.abspath('.'))
sys.stdout.reconfigure(encoding='utf-8')

print("=================================================================")
print("  AUDYT WIZUALIZACJI: DZIAŁY 11-21 (lesson_visuals_v2)")
print("=================================================================")

for t_num in range(11, 22):
    mod_name = f"scripts.lesson_visuals_v2.topic_{t_num:02d}"
    try:
        mod = importlib.import_module(mod_name)
    except Exception as e:
        print(f"Error loading {mod_name}: {e}")
        continue
        
    func_name = f"get_topic_{t_num:02d}_visuals"
    if not hasattr(mod, func_name):
        print(f"Warning: {func_name} not found in {mod_name}")
        continue
    
    fn = getattr(mod, func_name)
    # Check each lesson
    # Typically 3 or 4 lessons per topic
    for l_idx in range(5):
        try:
            vis = fn(l_idx)
            if not vis:
                continue
        except Exception:
            continue
            
        print(f"\n--- Topic {t_num} | Lesson {l_idx+1} ---")
        for tab_name, tab_data in vis.items():
            if not isinstance(tab_data, dict):
                continue
            title = tab_data.get('title', '')
            badge = tab_data.get('formulaBadge', '') or tab_data.get('badge', '')
            caption = tab_data.get('caption', '')
            width = tab_data.get('width', 520)
            height = tab_data.get('height', 270)
            
            # Check sigmas
            all_text = str(tab_data)
            sigmas = re.findall(r'(\\sum|\\Sigma|∑)', all_text)
            if sigmas:
                print(f"  [!] {tab_name} ({title}): Found SIGMA: {sigmas}")
                
            # Check logic symbols
            logic = re.findall(r'(\\iff|\\wedge|\\vee|\\forall|\\exists|\\implies)', all_text)
            if logic:
                print(f"  [!] {tab_name} ({title}): Found LOGIC SYMBOLS: {set(logic)}")
                
            # Check bounds for points, labels, segments
            points = tab_data.get('points', [])
            for pt in points:
                px, py = pt.get('x', 0), pt.get('y', 0)
                if px < 0 or px > width or py < 0 or py > height:
                    print(f"  [!] {tab_name} Point OUT OF BOUNDS: ({px}, {py}) in [{width}x{height}] - label: {pt.get('label')}")
            
            labels = tab_data.get('labels', [])
            for lbl in labels:
                lx, ly = lbl.get('x', 0), lbl.get('y', 0)
                if lx < 0 or lx > width or ly < 0 or ly > height:
                    print(f"  [!] {tab_name} Label OUT OF BOUNDS: ({lx}, {ly}) in [{width}x{height}] - text: {lbl.get('text')}")
                    
            segments = tab_data.get('segments', [])
            for seg in segments:
                f = seg.get('from', [0, 0])
                t = seg.get('to', [0, 0])
                fx = f[0] if isinstance(f, (list, tuple)) else f.get('x', 0)
                fy = f[1] if isinstance(f, (list, tuple)) else f.get('y', 0)
                tx = t[0] if isinstance(t, (list, tuple)) else t.get('x', 0)
                ty = t[1] if isinstance(t, (list, tuple)) else t.get('y', 0)
                if fx < 0 or fx > width or fy < 0 or fy > height or tx < 0 or tx > width or ty < 0 or ty > height:
                    print(f"  [!] {tab_name} Segment OUT OF BOUNDS: ({fx},{fy})->({tx},{ty}) in [{width}x{height}]")
                    
            # Topic 18 Stereometry checks
            if t_num == 18:
                # check hidden edges and angles
                pass
                
            # Topic 20 Statistics checks (vertical distance)
            if t_num == 20 and tab_name == 'tab0':
                bars = tab_data.get('bars', [])
                for bar in bars:
                    by = bar.get('y', 0)
                    for seg in segments:
                        if seg.get('dashed'):
                            sy = seg.get('from', [0,0])[1] if isinstance(seg.get('from'), (list, tuple)) else seg.get('from', {}).get('y', 0)
                            dist = abs(by - sy)
                            if 0 < dist < 25:
                                print(f"  [!] Topic 20 Bar-to-dashed line distance too small: {dist}px (bar y={by}, line y={sy})")

