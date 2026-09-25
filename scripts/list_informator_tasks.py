# -*- coding: utf-8 -*-
import json

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    topics = json.load(f)['topics']

for t in topics:
    for l in t['lessons']:
        for task in l['tasks']:
            b = task.get('badge', '')
            if b.startswith('Informator'):
                print(f"{t['id']} {l['id']} [{task['id']}] {task['type']}: {b}")
