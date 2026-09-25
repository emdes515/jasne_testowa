# -*- coding: utf-8 -*-
import sys, os, json
sys.path.append('.')
from scripts.inspect_current_state import builders

print("="*80)
print("AUDYT STRUKTURY 5-TASK WE WSZYSTKICH 21 DZIAŁACH")
print("="*80)

discrepancies = []
total_lessons = 0
total_tasks = 0

for b_idx, b in enumerate(builders, 1):
    t = b()
    tid = t.get('id', f'topic-{b_idx}')
    lessons = t.get('lessons', [])
    total_lessons += len(lessons)
    for l_idx, l in enumerate(lessons, 1):
        lid = l.get('id', f'lesson-{l_idx}')
        tasks = l.get('tasks', [])
        total_tasks += len(tasks)
        if len(tasks) != 5:
            discrepancies.append(f"{tid} {lid}: ma {len(tasks)} zadań (powinno być dokładnie 5)")
        else:
            t1, t2, t3, t4, t5 = tasks
            # Check T1
            if t1.get('type') not in ['SINGLE_CHOICE', 'TRUE_FALSE']:
                discrepancies.append(f"{tid} {lid} T1: typ {t1.get('type')} (powinno być SINGLE_CHOICE lub TRUE_FALSE)")
            if t1.get('badge') != 'Trening JASNE • Wzorzec CKE' and not t1.get('badge', '').startswith('Informator'):
                # Note: target says "Trening JASNE • Wzorzec CKE"
                pass
            
            # Check T2
            if t2.get('type') != 'SINGLE_CHOICE':
                discrepancies.append(f"{tid} {lid} T2: typ {t2.get('type')} (powinno być SINGLE_CHOICE)")
            
            # Check T3
            if t3.get('type') != 'SINGLE_CHOICE':
                discrepancies.append(f"{tid} {lid} T3: typ {t3.get('type')} (powinno być SINGLE_CHOICE)")
            
            # Check T4
            if t4.get('type') != 'NUMERIC_INPUT':
                discrepancies.append(f"{tid} {lid} T4: typ {t4.get('type')} (powinno być NUMERIC_INPUT)")
            
            # Check T5
            if t5.get('type') not in ['OPEN_TASK', 'OPEN_PROOF']:
                discrepancies.append(f"{tid} {lid} T5: typ {t5.get('type')} (powinno być OPEN_TASK lub OPEN_PROOF)")
            if not t5.get('scoring_key'):
                discrepancies.append(f"{tid} {lid} T5: brak scoring_key!")

print(f"Łącznie lekcji: {total_lessons}, łącznie zadań: {total_tasks}")
print(f"Liczba niezgodności z matrycą 5-Task: {len(discrepancies)}")
for d in discrepancies[:40]:
    print("  *", d)
if len(discrepancies) > 40:
    print(f"  ... i {len(discrepancies) - 40} kolejnych.")
