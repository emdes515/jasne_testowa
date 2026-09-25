import re
import glob
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

builders = sorted(glob.glob('scripts/curriculum_builder/topic_*_builder.py'))

print(f"Checking {len(builders)} builders...")

for b in builders:
    fname = os.path.basename(b)
    # Check topics 11 to 21
    m = re.search(r'topic_(\d+)_builder\.py', fname)
    if not m:
        continue
    topic_num = int(m.group(1))
    if topic_num < 11 or topic_num > 21:
        continue
    
    with open(b, encoding='utf-8') as f:
        content = f.read()
    
    # 1. cke_page matches
    cke_pages = re.findall(r'cke_page[\'"]?\s*:\s*[\'"]([^\'"]+)[\'"]', content)
    # Also search for "str." in content
    str_pages = re.findall(r'str\.\s*\d+(?:[–-]\d+)?', content)
    
    # 2. Sigma
    sigmas = re.findall(r'(\\sum|\\Sigma|∑)', content)
    
    # 3. Logic symbols
    logic = re.findall(r'(\\iff|\\wedge|\\vee|\\forall|\\exists|\\implies)', content)
    
    print(f"\n--- {fname} (Topic {topic_num}) ---")
    print(f"  cke_pages defined: {set(cke_pages)}")
    print(f"  Sample 'str. X' mentions: {set(str_pages[:8])}")
    if sigmas:
        print(f"  ⚠️ SIGMA FOUND ({len(sigmas)}): {sigmas[:5]}")
    else:
        print("  ✓ No sigmas found")
    if logic:
        print(f"  ⚠️ LOGIC SYMBOLS FOUND ({len(logic)}): {set(logic)}")
    else:
        print("  ✓ No logic symbols found")
