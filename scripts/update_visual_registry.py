import re

with open('src/data/mathVisualRegistry.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace spoiler labels
replacements = [
    ("label: '(0, c), c > 0'", "label: '(0, c)'"),
    ("label: 'min: (-1, -2)'", "label: '(-1, -2)'"),
    ("label: 'max: (3, 4)'", "label: '(3, 4)'"),
    ("label: '(-3, 1) zamalowany'", "label: '(-3, 1)'"),
    ("label: '(4, 5) otwarty'", "label: '(4, 5)'"),
    ("label: 'P(2, -3) ⟹ f(2) = -3'", "label: 'P(2, -3)'"),
    ("label: 'max: (1, 4)'", "label: '(1, 4)'"),
    ("label: 'odcinek poziomy: f(x) = const = 3'", "label: 'y = 3'"),
    ("label: 'a = -2 < 0 (ramiona w dół)'", "label: 'W(p, q)'"),
    ("label: 'W(0, 4) > 0: cała parabola nad OX'", "label: 'W(0, 4)'"),
    ("label: 'W(3, 0): jedyny punkt ≤ 0'", "label: 'W(3, 0)'"),
    ("label: 'W pod osią, a < 0: brak punktów > 0'", "label: 'W(1, -2)'"),
    ("label: 'P(0, 7) = (0, b)'", "label: 'P(0, 7)'"),
    ("label: 'x₀ = 7/3'", "label: 'x₀'"),
    ("label: '(0, b), b > 0'", "label: '(0, b)'"),
]

for old, new in replacements:
    content = content.replace(old, new)

# 2. Extract specific task blocks from TASK_VISUALS
explanation_task_ids = [
    'task-8-1-2-1', 'task-8-1-2-2', 'task-8-1-2-3',
    'task-8-1-3-1', 'task-8-1-3-2',
    'task-8-4-1', 'task-8-4-2', 'task-8-4-3',
    'task-10-1-1', 'task-10-2-2', 'task-10-2-3',
    'task-10-3-1', 'task-10-3-2'
]

# We will locate the block for each task in content and cut it out into explanation_blocks
explanation_blocks = []

for tid in explanation_task_ids:
    # Pattern to match: 'tid': { ... },
    pattern = rf"(\s*//[^\n]*\n)?(\s*'{re.escape(tid)}':\s*\{{[\s\S]*?\n\s*\}},\n)"
    m = re.search(pattern, content)
    if m:
        comment = m.group(1) or ""
        block = m.group(2)
        full_match = m.group(0)
        explanation_blocks.append(comment + block)
        content = content.replace(full_match, "\n")
    else:
        print(f"Warning: could not find {tid}")

explanation_registry_code = "\n// =========================================================================\n" \
    "// 3B. EXPLANATION VISUALS (WYKRESY POMOCNICZE POKAZYWANE WYŁĄCZNIE PO ODPOWIEDZI)\n" \
    "// =========================================================================\n" \
    "export const EXPLANATION_VISUALS: Record<string, PlotData | MathDiagramData> = {\n" + \
    "".join(explanation_blocks) + \
    "};\n\n"

# Insert EXPLANATION_VISUALS before "export const THEORY_NUMBER_LINES"
insert_pos = content.find("export const THEORY_NUMBER_LINES")
if insert_pos == -1:
    raise Exception("Could not find insertion position")

content = content[:insert_pos] + explanation_registry_code + content[insert_pos:]

# 3. Update enrichTaskWithVisual
# Replace:
#   const registered = TASK_VISUALS[taskId];
#   const registeredNumberLine = TASK_NUMBER_LINES[taskId];
old_enrich_head = """  const registered = TASK_VISUALS[taskId];
  const registeredNumberLine = TASK_NUMBER_LINES[taskId];

  let resolvedTask = { ...task };"""

new_enrich_head = """  const registered = TASK_VISUALS[taskId];
  const registeredNumberLine = TASK_NUMBER_LINES[taskId];
  const registeredExplanation = EXPLANATION_VISUALS[taskId];

  let resolvedTask = { ...task };

  // 0. Obsługa wykresów wyjaśniających (explanationPlot / explanationDiagram)
  if (!resolvedTask.explanationPlot && registeredExplanation) {
    resolvedTask.explanationPlot = registeredExplanation;
    resolvedTask.explanationDiagram = registeredExplanation;
  }

  // Zadania z bazy EXPLANATION_VISUALS to zadania czysto analityczne / obliczeniowe -
  // nie mogą mieć wykresu w treści pytania (zero spoilerów przed rozwiązaniem)!
  if (registeredExplanation) {
    return {
      ...resolvedTask,
      plot: null,
      diagram: null
    };
  }"""

if old_enrich_head in content:
    content = content.replace(old_enrich_head, new_enrich_head)
    print("Updated enrichTaskWithVisual successfully")
else:
    print("Warning: could not find old_enrich_head")

with open('src/data/mathVisualRegistry.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished updating src/data/mathVisualRegistry.ts")
