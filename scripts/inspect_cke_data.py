import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/ckeFormulasData.ts', encoding='utf-8') as f:
    content = f.read()

items = re.findall(r"id:\s*['\"]([^'\"]+)['\"].*?topicId:\s*['\"]([^'\"]+)['\"].*?title:\s*['\"]([^'\"]+)['\"].*?cke_page:\s*['\"]([^'\"]+)['\"]", content, re.DOTALL)
print(f"Total found: {len(items)}")
for item_id, topic_id, title, page in items:
    print(f"{item_id:20} | {topic_id:20} | {page:8} | {title}")
