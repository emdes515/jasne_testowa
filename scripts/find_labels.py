import re
import sys
import glob

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/mathVisualRegistry.ts', 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'(\w+):\s*[\'"]([^\'"]*[\u221a\\].*?|.*?[+-]\s*√.*?)[\'"]', content)
print(f"Found {len(matches)} matches in mathVisualRegistry.ts:")
for m in matches:
    print(m)

# Find all points definitions
point_blocks = re.findall(r'\{\s*x:\s*[-\d\.]+\s*,\s*y:\s*[-\d\.]+[^\}]*\}', content)
print(f"\nTotal point blocks: {len(point_blocks)}")
for p in point_blocks:
    if 'label' in p:
        print("POINT:", p.strip().replace('\n', ' '))
