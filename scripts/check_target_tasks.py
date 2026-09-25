import json, sys
sys.stdout.reconfigure(encoding='utf-8')
target_ids = ['task-6-14-8', 'task-8-1-2-1', 'task-8-4-1', 'task-8-4-2', 'task-8-4-3', 'task-9-1-2', 'task-9-1-3', 'task-9-2-3', 'task-9-3-2', 'task-9-3-4', 'task-10-1-1', 'task-10-1-3']
with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
for topic in d.get('topics', []):
    for lesson in topic.get('lessons', []):
        for task in lesson.get('tasks', []):
            if task.get('id') in target_ids:
                print(f"{task.get('id')}: {task.get('question')}")
