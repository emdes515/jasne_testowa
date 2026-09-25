import sys
import os
import importlib

sys.path.insert(0, os.path.abspath('.'))
sys.stdout.reconfigure(encoding='utf-8')

for t_num in range(11, 22):
    mod_name = f"scripts.lesson_visuals_v2.topic_{t_num:02d}"
    try:
        mod = importlib.import_module(mod_name)
    except Exception as e:
        continue
        
    fn = getattr(mod, f"get_topic_{t_num:02d}_visuals", None)
    if not fn:
        continue
        
    for l_idx in range(5):
        try:
            vis = fn(l_idx)
            if not vis:
                continue
        except Exception:
            continue
            
        for tab_name, d in vis.items():
            if not isinstance(d, dict) or d.get('type') in ('PIECEWISE_LINEAR', 'LINEAR', 'PARABOLA') or 'plotData' in d:
                continue
            w = d.get('width', 520)
            h = d.get('height', 270)
            
            # Check curves
            for c in d.get('curves', []):
                q = c.get('quadratic')
                if q:
                    for pt in (q.get('start'), q.get('control'), q.get('end')):
                        if pt and (pt[0] < 0 or pt[0] > w or pt[1] < 0 or pt[1] > h):
                            print(f"[BOUNDS] T{t_num} L{l_idx+1} {tab_name} quadratic point out of bounds: {pt} in {w}x{h}")
                            
            # Check polygons
            for p in d.get('polygons', []):
                pts = p.get('points', [])
                if isinstance(pts, list):
                    for pt in pts:
                        x = pt[0] if isinstance(pt, (list, tuple)) else pt.get('x', 0)
                        y = pt[1] if isinstance(pt, (list, tuple)) else pt.get('y', 0)
                        if x < 0 or x > w or y < 0 or y > h:
                            print(f"[BOUNDS] T{t_num} L{l_idx+1} {tab_name} polygon point out of bounds: ({x},{y}) in {w}x{h}")
                            
            # Check circles
            for c in d.get('circles', []):
                cx, cy, r = c.get('cx', 0), c.get('cy', 0), c.get('r', 0)
                if cx - r < 0 or cx + r > w or cy - r < 0 or cy + r > h:
                    print(f"[BOUNDS] T{t_num} L{l_idx+1} {tab_name} circle out of bounds: cx={cx}, cy={cy}, r={r} in {w}x{h}")

print("Bounds check completed.")
