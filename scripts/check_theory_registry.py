import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/data/mathVisualRegistry.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find matches for 'lesson-...' in THEORY_DIAGRAMS block
theory_block = content.split('export const THEORY_DIAGRAMS')[1].split('export const TASK_VISUALS')[0]
matches = re.findall(r"'([a-zA-Z0-9_\-]+)':\s*\{[\s\S]*?type:\s*'([^']+)'", theory_block)

print(f"Theory diagrams count: {len(matches)}")
for k, t in matches:
    print(f"  {k} -> {t}")
