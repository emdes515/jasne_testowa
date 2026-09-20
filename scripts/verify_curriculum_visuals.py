import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

print("=== WERYFIKACJA DIAGRAMÓW KURIKULUM ===")
topics = d.get('topics', [])
print(f"Liczba działów: {len(topics)}")

total_lessons = 0
total_tasks = 0
tasks_with_diagram = 0
tasks_with_numberline = 0

for t in topics:
    t_id = t.get('id')
    lessons = t.get('lessons', [])
    total_lessons += len(lessons)
    for l in lessons:
        l_id = l.get('id')
        tasks = l.get('tasks', [])
        total_tasks += len(tasks)
        for idx, task in enumerate(tasks):
            if task.get('diagram'):
                tasks_with_diagram += 1
            if task.get('numberLine'):
                tasks_with_numberline += 1

print(f"Łącznie lekcji: {total_lessons}")
print(f"Łącznie zadań: {total_tasks}")
print(f"Zadania z diagramem: {tasks_with_diagram} (oczekiwano: 179 autentycznych)")
print(f"Zadania z numberLine: {tasks_with_numberline}")

# Sprawdzenie Lekcji 7.4 (Zadanie otwarte i inne)
for t in topics:
    if t.get('id') == 'dzial-7':
        for l in t.get('lessons', []):
            if l.get('id') == 'lesson-7-4':
                print("\n--- Sprawdzenie Lekcji 7.4 Zadania ---")
                for idx, task in enumerate(l.get('tasks', [])):
                    print(f"Zadanie {idx+1}: type={task.get('type')}, diagram={bool(task.get('diagram'))}, numberLine={bool(task.get('numberLine'))}")

            if l.get('id') == 'lesson-7-5':
                print("\n--- Sprawdzenie Lekcji 7.5 Wzory ---")
                pill = l.get('theory_pill', {})
                formulas = pill.get('core_formulas', [])
                for f_idx, formula in enumerate(formulas):
                    d_obj = formula.get('diagram')
                    if d_obj:
                        print(f"Formuła {f_idx+1}: diagram type={d_obj.get('type')}, height={d_obj.get('height')}, wagonów={len(d_obj.get('polygons', []))}")

print("\n=== KONIEC WERYFIKACJI ===")
