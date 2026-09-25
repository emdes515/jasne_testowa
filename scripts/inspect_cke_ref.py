# -*- coding: utf-8 -*-
import sys, os, json, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('seed/curriculum/official_cke_tasks_reference.json', 'r', encoding='utf-8') as f:
    tasks = json.load(f)

print(f"Total tasks in reference: {len(tasks)}")
open_and_num = [t for t in tasks if t.get('type') in ['OPEN_CALCULATION', 'OPEN_PROOF', 'OPEN_TASK', 'NUMERIC_INPUT']]
print(f"Open or numeric tasks: {len(open_and_num)}")
for t in open_and_num:
    content_snippet = t.get('content', '').replace('\n', ' ')[:80]
    print(f"{t.get('badge')} | {t.get('type')} | points={t.get('points')} | ans={t.get('ans')} | {content_snippet}")
