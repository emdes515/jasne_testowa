import os, glob, json, sys

available = {}
for i in range(1, 25):
    fpath = rf'c:\Users\mateu\Downloads\mat\curriculum_dzial_{i}.json'
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    top = data.get('topic', {})
    lessons = top.get('lessons', [])
    cke_sc = 0
    cke_num = 0
    cke_open = 0
    total_tasks = 0
    for l in lessons:
        for t in l.get('tasks', []):
            if not isinstance(t, dict): continue
            total_tasks += 1
            typ = t.get('type')
            b = str(t.get('badge') or t.get('source') or '')
            is_cke = ('matura' in b.lower() or 'informator' in b.lower()) and not ('trening' in b.lower())
            if is_cke:
                if typ == 'SINGLE_CHOICE': cke_sc += 1
                elif typ == 'NUMERIC_INPUT': cke_num += 1
                elif typ in ['OPEN_TASK', 'OPEN_PROOF', 'OPEN_CALCULATION']: cke_open += 1
    t_name = top.get('title') or 'unknown'
    available[f'dzial_{i}'] = {
        'title': t_name,
        'total': total_tasks,
        'cke_sc': cke_sc,
        'cke_num': cke_num,
        'cke_open': cke_open
    }

with open('scripts/available_cke_summary.txt', 'w', encoding='utf-8') as out:
    out.write('=== CKE TASKS AVAILABLE IN curriculum_dzial_*.json ===\n')
    for k, v in available.items():
        out.write(f"{k:10} | {v['title']:35} | Total: {v['total']:3} | CKE SC: {v['cke_sc']:3} | CKE Num: {v['cke_num']:3} | CKE Open: {v['cke_open']:3}\n")

print('Summary written to scripts/available_cke_summary.txt')
