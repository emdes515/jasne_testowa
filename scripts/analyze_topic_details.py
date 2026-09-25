# -*- coding: utf-8 -*-
import sys, os, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.append('.')
from scripts.inspect_current_state import builders

def analyze_topics(start_idx, end_idx):
    for b_idx in range(start_idx, end_idx + 1):
        b = builders[b_idx - 1]
        t = b()
        print(f"\n==================== TOPIC {b_idx:02d}: {t.get('id')} ({t.get('title')}) ====================")
        for l_idx, l in enumerate(t.get('lessons', []), 1):
            tasks = l.get('tasks', [])
            print(f"\n  --- L{b_idx}.{l_idx}: {l.get('id')} | {l.get('title')} ({len(tasks)} tasks) ---")
            for t_idx, tsk in enumerate(tasks, 1):
                tid = tsk.get('id')
                ttype = tsk.get('type')
                badge = tsk.get('badge')
                ans = tsk.get('correct_answer')
                num_ans = tsk.get('numeric_correct_answer')
                q = tsk.get('question', '').replace('\n', ' ')[:70]
                sk = tsk.get('scoring_key')
                if isinstance(sk, list):
                    sk_s = (str(sk[0])[:40] + '...') if sk else '[]'
                elif isinstance(sk, str):
                    sk_s = (sk[:40] + '...') if sk else 'None'
                else:
                    sk_s = 'None'
                print(f"    T{t_idx}: {tid} | {ttype} | badge='{badge}' | ans={ans} (num={num_ans}) | sk={sk_s}")
                print(f"        q: {q}")

if __name__ == '__main__':
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    analyze_topics(start, end)
