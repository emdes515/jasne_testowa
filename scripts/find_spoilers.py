import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/mathVisualRegistry.ts', 'r', encoding='utf-8') as f:
    text = f.read()

for reg_name in ['TASK_VISUALS', 'EXPLANATION_VISUALS']:
    reg_match = re.search(rf'export const {reg_name}: Record<[^>]+>\s*=\s*\{{([\s\S]*?)\n\}};', text)
    if reg_match:
        block = reg_match.group(1)
        labels = re.findall(r"label:\s*['\"]([^'\"]+)['\"]", block)
        spoilers = [l for l in labels if any(w in l.lower() for w in ['jedyn', 'brak', 'cała', 'calosc', 'max', 'min', 'odcinek', 'const', '⟹', '>', '<', '≤', '≥', 'równ', 'zamalowany', 'otwarty'])]
        print(f"{reg_name}: {len(labels)} labels, {len(spoilers)} spoilers")
        for s in spoilers:
            print(f"  [{reg_name}] {s}")
