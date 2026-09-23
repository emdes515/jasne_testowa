import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

tasks_with_visual_reference = []
for t_idx, topic in enumerate(data['topics']):
    for l_idx, lesson in enumerate(topic['lessons']):
        for task in lesson.get('tasks', []):
            q = task.get('question', '') or task.get('content', '') or ''
            has_ref = any(phrase in q.lower() for phrase in ['na rysunku', 'na wykresie', 'na osi', 'z wykresu', 'z rysunku', 'wykres funkcji', 'wykres przedstawia'])
            diag = task.get('diagram')
            plot = task.get('plot')
            nl = task.get('numberLine') or task.get('number_line')
            if has_ref or diag or plot or nl:
                tasks_with_visual_reference.append({
                    'id': task.get('id'),
                    'topic_id': topic.get('id'),
                    'lesson_id': lesson.get('id'),
                    'has_ref': has_ref,
                    'has_diag': bool(diag),
                    'has_plot': bool(plot),
                    'has_nl': bool(nl),
                    'diag_title': diag.get('title') if isinstance(diag, dict) else None,
                    'question_start': q.replace('\n', ' ')[:90]
                })

print(f"Total tasks with visual ref or visuals: {len(tasks_with_visual_reference)}")
for t in tasks_with_visual_reference:
    print(f"{t['id']} | Topic: {t['topic_id']} | Ref: {t['has_ref']} | Diag: {t['has_diag']} | Plot: {t['has_plot']} | NL: {t['has_nl']} | DiagTitle: {t['diag_title']} | Q: {t['question_start']}")
