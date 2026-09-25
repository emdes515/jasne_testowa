# -*- coding: utf-8 -*-
import sys, os, io, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

dzial_num = sys.argv[1] if len(sys.argv) > 1 else '1'
fpath = rf"c:\Users\mateu\Downloads\mat\curriculum_dzial_{dzial_num}.json"
if not os.path.exists(fpath):
    print("File not found:", fpath)
    sys.exit(0)

with open(fpath, 'r', encoding='utf-8') as f:
    data = json.load(f)

top = data.get('topic', {})
lessons = top.get('lessons', [])
print(f"=== DZIAŁ {dzial_num}: {top.get('title')} ({len(lessons)} lessons) ===")

open_tasks = []
num_tasks = []
cke_tasks = []

for l in lessons:
    for t in l.get('tasks', []):
        if not isinstance(t, dict): continue
        typ = t.get('type')
        b = str(t.get('badge') or t.get('source') or '')
        if typ in ['OPEN_TASK', 'OPEN_PROOF', 'OPEN_CALCULATION']:
            open_tasks.append((l.get('title'), t))
        elif typ == 'NUMERIC_INPUT':
            num_tasks.append((l.get('title'), t))
        elif 'matura' in b.lower():
            cke_tasks.append((l.get('title'), t))

print(f"Total open: {len(open_tasks)}, numeric: {len(num_tasks)}, CKE: {len(cke_tasks)}")
print("\n--- SAMPLE OPEN TASKS ---")
for l_title, t in open_tasks[:8]:
    q = t.get('question', '').replace('\n', ' ')[:80]
    sk = str(t.get('scoring_key') or t.get('explanation') or '')[:70]
    print(f"[{l_title[:25]}] {t.get('id')} ({t.get('points', 2)} pkt): {q}")
    print(f"   sk: {sk}")

print("\n--- SAMPLE NUMERIC TASKS ---")
for l_title, t in num_tasks[:8]:
    q = t.get('question', '').replace('\n', ' ')[:80]
    ans = t.get('correct_answer')
    print(f"[{l_title[:25]}] {t.get('id')} (ans={ans}): {q}")
