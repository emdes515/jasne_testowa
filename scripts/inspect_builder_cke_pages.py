import sys
import os
import glob
import re

sys.path.insert(0, os.path.abspath('.'))
sys.stdout.reconfigure(encoding='utf-8')

for topic_num in range(11, 16):
    b_path = f"scripts/curriculum_builder/topic_{topic_num:02d}_builder.py"
    if not os.path.exists(b_path):
        continue
    with open(b_path, encoding='utf-8') as f:
        content = f.read()
        
    print(f"\n=======================================================")
    print(f"  TOPIC {topic_num:02d}: {b_path}")
    print(f"=======================================================")
    
    # Extract lessons
    lessons = re.findall(r"['\"]id['\"]\s*:\s*['\"]([^'\"]+)['\"].*?['\"]title['\"]\s*:\s*['\"]([^'\"]+)['\"].*?cke_page['\"]?\s*:\s*['\"]([^'\"]+)['\"]", content, re.DOTALL)
    if not lessons:
        # try another pattern
        lessons = re.findall(r"id\s*=\s*['\"]([^'\"]+)['\"].*?title\s*=\s*['\"]([^'\"]+)['\"].*?cke_page\s*=\s*['\"]([^'\"]+)['\"]", content, re.DOTALL)
    
    # Find all cke_page occurrences with surrounding context
    cke_page_matches = re.finditer(r"['\"]?cke_page['\"]?\s*:\s*['\"]([^'\"]+)['\"]", content)
    for m in cke_page_matches:
        start = max(0, m.start() - 100)
        end = min(len(content), m.end() + 100)
        snippet = content[start:end].replace('\n', ' ')
        print(f"  cke_page snippet: {snippet}")

