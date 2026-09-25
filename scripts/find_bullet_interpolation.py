import os, sys
sys.stdout.reconfigure(encoding='utf-8')

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith(('.ts', '.tsx')):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as handle:
                for idx, line in enumerate(handle):
                    if '•' in line and ('${' in line or '+' in line):
                        print(f"{filepath}:{idx+1}: {line.strip()}")
