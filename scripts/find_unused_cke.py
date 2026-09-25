# -*- coding: utf-8 -*-
import json

with open('seed/curriculum/official_cke_tasks_reference.json', 'r', encoding='utf-8') as f:
    ref = json.load(f)

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    topics = data.get('topics', [])

used_badges = set()
for t in topics:
    for l in t.get('lessons', []):
        for task in l.get('tasks', []):
            b = task.get('badge')
            if b:
                used_badges.add(b.lower().strip())

unused = []
used = []
for item in ref:
    b = item.get('badge', '').lower().strip()
    if b in used_badges:
        used.append(item)
    else:
        unused.append(item)

print(f"Total in ref: {len(ref)}")
print(f"Used: {len(used)}")
print(f"Unused: {len(unused)}")
print("\nSample unused tasks:")
for u in unused[:40]:
    c = u.get('content', '').replace('\n', ' ')[:70]
    print(f"  {u.get('badge')} [{u.get('type')}, ans={u.get('ans')}]: {c}")
