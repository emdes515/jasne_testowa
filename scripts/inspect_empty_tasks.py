import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

tasks_to_check = [
    ('seed/curriculum/exams/matura-maj-2024.json', ['1', '14.4', '25.2']),
    ('seed/curriculum/exams/matura-czerwiec-2024.json', ['15.1']),
    ('seed/curriculum/exams/matura-sierpien-2023.json', ['1', '14.3']),
    ('seed/curriculum/exams/matura-czerwiec-2023.json', ['14'])
]

for fpath, nums in tasks_to_check:
    with open(fpath, 'r', encoding='utf-8') as f:
        tasks = json.load(f)
    print('===', fpath, '===')
    for t in tasks:
        if t.get('taskNumber') in nums:
            print(f"Task {t.get('taskNumber')}: correct={t.get('correctAnswer')}")
            print('Content:', t.get('content')[:140].replace('\n', ' '))
            print('Options:', t.get('options'))
