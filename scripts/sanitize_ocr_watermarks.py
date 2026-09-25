import os
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Patterns to remove
WATERMARK_LINE_PATTERNS = [
    re.compile(r'^\s*(?:Więcej|Wiecej)\s+arkuszy\s+znajdziesz\s+na\s+stronie:\s*arkusze\.pl.*$', re.IGNORECASE),
    re.compile(r'^\s*Egzamin\s+maturalny\s+z\s+matematyki.*$', re.IGNORECASE),
    re.compile(r'^\s*Zasady\s+oceniania\s+rozwiąz(?:ań|an)\s+zadań.*$', re.IGNORECASE),
    re.compile(r'^\s*Strona\s+\d+\s+z\s+\d+.*$', re.IGNORECASE),
    re.compile(r'^\s*Ocena\s+prac\s+osób\s+ze\s+stwierdzoną\s+dyskalkulią.*$', re.IGNORECASE),
    re.compile(r'^\s*Obowiązują\s+ogólne\s+zasady\s+oceniania.*$', re.IGNORECASE),
    re.compile(r'.*arkusze\.pl.*', re.IGNORECASE)
]

def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return text
    
    lines = text.split('\n')
    cleaned_lines = []
    for line in lines:
        if any(pat.match(line.strip()) for pat in WATERMARK_LINE_PATTERNS):
            continue
        cleaned_lines.append(line)
    
    result = '\n'.join(cleaned_lines)
    # Remove any stray 'arkusze.pl'
    result = re.sub(r'arkusze\.pl', '', result, flags=re.IGNORECASE)
    # Collapse multiple consecutive newlines (3+ to 2)
    result = re.sub(r'\n{3,}', '\n\n', result)
    return result.strip()

def clean_obj(obj):
    if isinstance(obj, str):
        return clean_text(obj)
    elif isinstance(obj, list):
        return [clean_obj(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: clean_obj(v) for k, v in obj.items()}
    return obj

files_to_clean = [
    'seed/curriculum/cke_tasks_matematyka.json',
    'seed/curriculum/zadania_matura.json',
    'seed/curriculum/curriculum_matematyka.json'
]

exams_dir = 'seed/curriculum/exams'
if os.path.exists(exams_dir):
    for f in os.listdir(exams_dir):
        if f.endswith('.json'):
            files_to_clean.append(os.path.join(exams_dir, f))

total_modified = 0
for file_path in files_to_clean:
    if not os.path.exists(file_path):
        continue
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        raw_before = json.dumps(data, ensure_ascii=False)
        cleaned_data = clean_obj(data)
        raw_after = json.dumps(cleaned_data, ensure_ascii=False)
        
        if raw_before != raw_after:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(cleaned_data, f, ensure_ascii=False, indent=2)
            print(f"Cleaned watermarks in: {file_path}")
            total_modified += 1
        else:
            print(f"No watermarks found in: {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"\nDone! Modified {total_modified} files.")
