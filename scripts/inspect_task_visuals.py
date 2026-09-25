import json, re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/mathVisualRegistry.ts', 'r', encoding='utf-8') as f:
    text = f.read()

tv_match = re.search(r'export const TASK_VISUALS: Record<[^>]+>\s*=\s*\{([\s\S]*?)\n\};', text)
if not tv_match:
    print("Could not find TASK_VISUALS")
    sys.exit(1)

tv_keys = re.findall(r"^\s*'([^']+)':", tv_match.group(1), re.MULTILINE)
print(f"Total keys in TASK_VISUALS: {len(tv_keys)}")

tasks_map = {}
with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

for topic in d.get('topics', []):
    for lesson in topic.get('lessons', []):
        for task in lesson.get('tasks', []):
            tasks_map[task.get('id')] = task.get('question', '')

for k in tv_keys:
    q = tasks_map.get(k, '<NOT IN CURRICULUM>')
    print(f"[{k}] {q[:80]}")
