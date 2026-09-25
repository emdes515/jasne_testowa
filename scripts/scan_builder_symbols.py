import sys
import os
import re

sys.path.insert(0, os.path.abspath('.'))
sys.stdout.reconfigure(encoding='utf-8')

for topic_num in range(11, 22):
    b_path = f"scripts/curriculum_builder/topic_{topic_num:02d}_builder.py"
    with open(b_path, encoding='utf-8') as f:
        content = f.read()
        
    sigmas = re.findall(r'(\\sum|\\Sigma|∑)', content)
    logic = re.findall(r'(\\iff|\\wedge|\\vee|\\forall|\\exists|\\implies)', content)
    
    print(f"Topic {topic_num:02d}: Sigmas={len(sigmas)}, Logic={len(logic)}")
    if sigmas:
        print(f"   Sigmas: {sigmas}")
    if logic:
        # Show first 3 occurrences with context
        matches = [m.start() for m in re.finditer(r'(\\iff|\\wedge|\\vee|\\forall|\\exists|\\implies)', content)]
        for pos in matches[:4]:
            snippet = content[max(0, pos-40):min(len(content), pos+50)].replace('\n', ' ')
            print(f"   Logic match: ...{snippet}...")
