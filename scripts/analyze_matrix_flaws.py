# -*- coding: utf-8 -*-
import json
import sys

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    topics = data.get('topics', []) if isinstance(data, dict) else data

issues = []
for t in topics:
    tid = t['id']
    for l in t.get('lessons', []):
        lid = l['id']
        tasks = l.get('tasks', [])
        if len(tasks) != 5:
            issues.append(f"{tid} {lid}: {len(tasks)} tasks instead of 5")
            continue
        t1, t2, t3, t4, t5 = tasks
        # T1 check
        if t1.get('badge') != 'Trening JASNE • Wzorzec CKE':
            issues.append(f"{tid} {lid} T1: badge is '{t1.get('badge')}', expected 'Trening JASNE • Wzorzec CKE'")
        # T2 check
        if t2.get('badge') != 'Trening JASNE • Wzorzec CKE':
            issues.append(f"{tid} {lid} T2: badge is '{t2.get('badge')}', expected 'Trening JASNE • Wzorzec CKE'")
        # T3 check
        b3 = t3.get('badge', '')
        if not (b3.startswith('Matura') or b3.startswith('Informator')):
            issues.append(f"{tid} {lid} T3: badge is '{b3}', expected authentic CKE/Informator badge!")
        # T4 check
        if t4.get('type') != 'NUMERIC_INPUT':
            issues.append(f"{tid} {lid} T4: type is {t4.get('type')}, expected NUMERIC_INPUT")
        # T5 check
        if t5.get('type') not in ['OPEN_TASK', 'OPEN_PROOF']:
            issues.append(f"{tid} {lid} T5: type is {t5.get('type')}, expected OPEN_TASK or OPEN_PROOF")
        if not t5.get('scoring_key'):
            issues.append(f"{tid} {lid} T5: missing scoring_key")
        pts5 = t5.get('points', 0)
        if pts5 < 2 or pts5 > 4:
            issues.append(f"{tid} {lid} T5: points={pts5}, expected 2-4")

print(f"Total issues found: {len(issues)}")
for iss in issues[:30]:
    print("  -", iss)
if len(issues) > 30:
    print(f"  ... and {len(issues) - 30} more.")

print("\n--- SLOT BADGE BREAKDOWN ---")
for slot_idx in range(5):
    b_counts = {}
    for t in topics:
        for l in t.get('lessons', []):
            task = l['tasks'][slot_idx]
            b = task.get('badge', '')
            cat = 'CKE Matura' if b.startswith('Matura') else ('CKE Informator' if b.startswith('Informator') else 'Trening JASNE')
            b_counts[cat] = b_counts.get(cat, 0) + 1
    print(f"Slot {slot_idx + 1} ({['T1 Baza', 'T2 Pulapka', 'T3 CKE 1:1', 'T4 Numeric', 'T5 Open'][slot_idx]}): {b_counts}")

