import os, sys, json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(__file__))
from lesson_visuals import get_visuals_for_lesson

curriculum_path = os.path.join(os.path.dirname(__file__), '..', 'seed', 'curriculum', 'curriculum_matematyka.json')
with open(curriculum_path, 'r', encoding='utf-8') as f:
    curriculum = json.load(f)

for t_id in ['dzial-2', 'dzial-5', 'dzial-8', 'dzial-12']:
    topic = next(t for t in curriculum['topics'] if t['id'] == t_id)
    l = topic['lessons'][0]
    v = get_visuals_for_lesson(t_id, l['id'], l.get('title', ''), 0)
    print(f'=== {t_id} {l["id"]} ===')
    for i, tab in enumerate(v):
        items = tab if isinstance(tab, list) else [tab]
        for item in items:
            if isinstance(item, dict):
                print(f' Tab {i}: title="{item.get("title")}", badge="{item.get("formulaBadge")}", segs={len(item.get("segments",[]))}, polys={len(item.get("polygons",[]))}, lbls={len(item.get("labels",[]))}')
                for lbl in item.get('labels', [])[:2]:
                    print(f'    lbl: {lbl.get("text")}')
