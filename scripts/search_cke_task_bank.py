# -*- coding: utf-8 -*-
import json
import os
import sys

query = sys.argv[1].lower() if len(sys.argv) > 1 else ''
print(f"Searching CKE tasks for keyword: '{query}'")

# Search in official reference
with open('seed/curriculum/official_cke_tasks_reference.json', 'r', encoding='utf-8') as f:
    ref = json.load(f)

print(f"\n--- MATCHES IN official_cke_tasks_reference.json ---")
for t in ref:
    c = (t.get('content', '') + ' ' + t.get('question', '')).lower()
    b = t.get('badge', '').lower()
    if query in c or query in b:
        ans = t.get('ans')
        typ = t.get('type')
        print(f"  {t.get('badge')} [{typ}, ans={ans}]: {t.get('content', '').replace(chr(10), ' ')[:80]}")

# Search in all curriculum_dzial_1..15.json
print(f"\n--- MATCHES IN curriculum_dzial_1..15.json ---")
for i in range(1, 16):
    fpath = rf"c:\Users\mateu\Downloads\mat\curriculum_dzial_{i}.json"
    if not os.path.exists(fpath): continue
    with open(fpath, 'r', encoding='utf-8') as f:
        d = json.load(f)
    for l in d.get('topic', {}).get('lessons', []):
        for t in l.get('tasks', []):
            if not isinstance(t, dict): continue
            b = str(t.get('badge') or t.get('source') or '')
            q = t.get('question', '').replace('\n', ' ')
            if query in q.lower() or query in b.lower():
                if 'matura' in b.lower() or 'informator' in b.lower():
                    ans = t.get('correct_answer')
                    typ = t.get('type')
                    print(f"  [Dział {i}] {b} [{typ}, ans={ans}]: {q[:80]}")
