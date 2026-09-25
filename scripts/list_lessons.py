import json

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for i, t in enumerate(data.get('topics', [])):
    name = t.get('name') or t.get('title')
    tid = t.get('id')
    lessons = t.get('lessons', [])
    print(f"=== DZIAL {i+1}: {name} ({tid}) [Lekcji: {len(lessons)}] ===")
    for l in lessons:
        lid = l.get('id')
        ltitle = l.get('title') or l.get('name')
        print(f"  * {lid}: {ltitle}")
