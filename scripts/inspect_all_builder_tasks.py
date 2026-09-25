# -*- coding: utf-8 -*-
import sys, os, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.append('.')
from scripts.inspect_current_state import builders

for b_idx, b in enumerate(builders, 1):
    t = b()
    print(f"\n==================== TOPIC {b_idx:02d}: {t.get('id')} ({t.get('title')}) ====================")
    for l_idx, l in enumerate(t.get('lessons', []), 1):
        print(f"\n  --- Lesson {b_idx}.{l_idx}: {l.get('id')} | {l.get('title')} ---")
        tasks = l.get('tasks', [])
        for t_idx, tsk in enumerate(tasks, 1):
            q_snip = tsk.get('question', '').replace('\n', ' ')[:60]
            ans = tsk.get('correct_answer')
            num_ans = tsk.get('numeric_correct_answer')
            score = tsk.get('scoring_key')
            score_snip = score[:40] if score else None
            print(f"    T{t_idx}: [{tsk.get('type')}] badge='{tsk.get('badge')}' | ans='{ans}' (num={num_ans}) | score={score_snip} | q='{q_snip}'")
