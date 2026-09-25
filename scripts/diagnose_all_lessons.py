# -*- coding: utf-8 -*-
import json

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    topics = data.get('topics', [])

for t in topics:
    print(f"\n==================== {t['id']}: {t['title']} ====================")
    for l in t.get('lessons', []):
        tasks = l.get('tasks', [])
        print(f"--- {l['id']} | {l['title']} ---")
        for idx, task in enumerate(tasks, 1):
            badge = task.get('badge')
            ttype = task.get('type')
            ans = task.get('correct_answer')
            pts = task.get('points')
            q = task.get('question', '').replace('\n', ' ')[:65]
            print(f"  Slot {idx} [{ttype}, {pts}p, ans={ans}]: badge='{badge}' | q={q}")
