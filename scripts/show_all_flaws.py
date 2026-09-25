# -*- coding: utf-8 -*-
import json

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    topics = json.load(f).get('topics', [])

count = 0
for t in topics:
    for l in t.get('lessons', []):
        tasks = l.get('tasks', [])
        for i, tsk in enumerate(tasks, 1):
            b = tsk.get('badge', '')
            if i in [1, 2] and b != 'Trening JASNE • Wzorzec CKE':
                print(f"{t['id']} {l['id']} T{i}: badge='{b}' (expected Trening JASNE)")
                count += 1
            elif i == 3 and not (b.startswith('Matura') or b.startswith('Informator')):
                print(f"{t['id']} {l['id']} T{i}: badge='{b}' (expected Matura/Informator)")
                count += 1
            elif i == 4 and tsk.get('type') != 'NUMERIC_INPUT':
                print(f"{t['id']} {l['id']} T{i}: type={tsk.get('type')} (expected NUMERIC_INPUT)")
                count += 1
            elif i == 5 and (tsk.get('type') not in ['OPEN_TASK', 'OPEN_PROOF'] or not tsk.get('scoring_key') or tsk.get('points', 0) not in [2, 3, 4]):
                print(f"{t['id']} {l['id']} T{i}: type={tsk.get('type')}, pts={tsk.get('points')}, key={bool(tsk.get('scoring_key'))}")
                count += 1

print(f"\nTotal flaws: {count}")
