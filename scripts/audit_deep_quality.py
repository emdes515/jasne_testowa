# -*- coding: utf-8 -*-
import json
import re
import sys

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    topics = data.get('topics', []) if isinstance(data, dict) else data

FORBIDDEN_LOGIC = [r'\iff', r'\implies', r'\land', r'\lor', r'\wedge', r'\vee', r'\forall', r'\exists']
EMOJI_PATTERN = re.compile(r'[\U00010000-\U0010ffff]', flags=re.UNICODE)

forbidden_logic_issues = []
emoji_issues = []
comma_issues = []
duplicate_options = []
ans_distribution = {}

for t in topics:
    tid = t['id']
    for l in t.get('lessons', []):
        lid = l['id']
        for task_idx, task in enumerate(l.get('tasks', []), 1):
            task_id = task.get('id', f"{tid}-{lid}-t{task_idx}")
            t_str = json.dumps(task, ensure_ascii=False)
            
            # Check forbidden logic
            for sym in FORBIDDEN_LOGIC:
                if sym in t_str:
                    forbidden_logic_issues.append((task_id, sym))
            
            # Check emojis
            emojis = EMOJI_PATTERN.findall(t_str)
            if emojis:
                emoji_issues.append((task_id, emojis))
            
            # Check decimal comma in math: $12,5$ instead of $12{,}5$
            for m in re.finditer(r'\$([^\$]+)\$', t_str):
                math_content = m.group(1)
                # match digit,digit without braces
                # check if there's digit,digit where comma is not surrounded by {}
                # replace {,} first, then check if ,\d remains
                without_braced = math_content.replace('{,}', 'COMMA')
                if re.search(r'\d,\d', without_braced):
                    comma_issues.append((task_id, math_content))
            
            # Check SINGLE_CHOICE
            if task.get('type') == 'SINGLE_CHOICE':
                ans = task.get('correct_answer')
                ans_distribution[ans] = ans_distribution.get(ans, 0) + 1
                opts = [str(o.get('text', '')).strip() for o in task.get('options', [])]
                if len(set(opts)) != len(opts):
                    duplicate_options.append((task_id, opts))

print(f"=== DEEP QUALITY AUDIT RESULTS ===")
print(f"Forbidden logic symbols: {len(forbidden_logic_issues)}")
for x in forbidden_logic_issues[:10]:
    print("  Logic:", x)

print(f"Emoji issues: {len(emoji_issues)}")
for x in emoji_issues[:10]:
    print("  Emoji:", x)

print(f"Decimal comma issues: {len(comma_issues)}")
for x in comma_issues[:10]:
    print("  Comma:", x)

print(f"Duplicate options in SINGLE_CHOICE: {len(duplicate_options)}")
for x in duplicate_options[:10]:
    print("  Duplicate opts:", x)

print(f"Answer distribution (SINGLE_CHOICE): {ans_distribution}")

print("\n--- PER-TOPIC SINGLE_CHOICE DISTRIBUTION ---")
for t in topics:
    sc = [tsk['correct_answer'] for l in t['lessons'] for tsk in l['tasks'] if tsk['type'] == 'SINGLE_CHOICE']
    print(f"  {t['id']} ({t['title'][:30]}): total {len(sc)} | A={sc.count('A')}, B={sc.count('B')}, C={sc.count('C')}, D={sc.count('D')}")

