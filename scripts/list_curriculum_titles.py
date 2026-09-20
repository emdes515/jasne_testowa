import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

topics = data.get('topics', [])
for t in topics:
    print(f"=== {t.get('id')}: {t.get('title')} ===")
    for l in t.get('lessons', []):
        print(f"  {l.get('id')}: {l.get('title')}")
