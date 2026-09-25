# -*- coding: utf-8 -*-
import sys, os, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('seed/curriculum/official_cke_tasks_reference.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

query = sys.argv[1].lower() if len(sys.argv) > 1 else ''
print(f"Searching for: '{query}'")
matches = []
for t in data:
    txt = (t.get('content', '') + ' ' + t.get('question', '') + ' ' + str(t.get('ans', ''))).lower()
    if query in txt or query in t.get('badge', '').lower():
        matches.append(t)

print(f"Found {len(matches)} matches:")
for m in matches[:15]:
    b = m.get('badge')
    typ = m.get('type')
    ans = m.get('ans')
    c = m.get('content', '').replace('\n', ' ')[:90]
    print(f"  {b} [{typ}, ans={ans}]: {c}")

if len(matches) == 1 or (len(sys.argv) > 2 and sys.argv[2] == '--full'):
    target = matches[0]
    print("\nFULL DETAILS OF FIRST MATCH:")
    print(json.dumps(target, ensure_ascii=False, indent=2))
