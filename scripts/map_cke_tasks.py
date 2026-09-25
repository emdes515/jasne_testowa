# -*- coding: utf-8 -*-
import json
import re

with open('seed/curriculum/official_cke_tasks_reference.json', 'r', encoding='utf-8') as f:
    ref = json.load(f)

print(f"Total tasks in reference: {len(ref)}")

# List all tasks with their badge, exam, num, type, ans, and first 60 chars of content
for idx, t in enumerate(ref):
    badge = t.get('badge')
    typ = t.get('type')
    ans = t.get('ans')
    c = t.get('content', '').replace('\n', ' ')[:70]
    print(f"[{idx+1:03d}] {badge} | {typ} | ans={ans} | {c}")
