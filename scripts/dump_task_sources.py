import json

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

topics = data.get('topics', [])
with open('scripts/task_sources_dump.txt', 'w', encoding='utf-8') as out:
    for topic in topics:
        for lesson in topic.get('lessons', []):
            tasks = lesson.get('tasks', [])
            lid = lesson.get('id')
            out.write(f'{lid} ({lesson.get("title")}):\n')
            for i, t in enumerate(tasks, 1):
                out.write(f'  T{i} [{t.get("type")}]: {t.get("source")}\n')

print('Dumped to scripts/task_sources_dump.txt')
