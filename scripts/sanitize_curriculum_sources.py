import os
import sys
import io
import re
import json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

CURRICULUM_PATH = r"c:\Users\mateu\Downloads\0.45-main\seed\curriculum\curriculum_matematyka.json"
ZADANIA_MATURA_PATH = r"c:\Users\mateu\Downloads\0.45-main\seed\curriculum\zadania_matura.json"

def main():
    print("🧹 Rozpoczynam oczyszczanie i normalizację etykiet źródeł w curriculum_matematyka.json...")

    with open(ZADANIA_MATURA_PATH, 'r', encoding='utf-8') as f:
        real_cke_tasks = json.load(f)

    print(f"Załadowano {len(real_cke_tasks)} autentycznych zadań CKE z 6 arkuszy.")

    # Create a lookup for authentic tasks based on normalized snippets of text
    def normalize_for_match(text):
        if not text:
            return ""
        t = text.lower()
        t = re.sub(r'[^a-z0-9\+\-\=]', '', t)
        return t

    real_lookup = {}
    for t in real_cke_tasks:
        norm = normalize_for_match(t.get('content', ''))
        if len(norm) > 15:
            real_lookup[norm[:40]] = t

    with open(CURRICULUM_PATH, 'r', encoding='utf-8') as f:
        curriculum = json.load(f)

    sanitized_count = 0
    confirmed_cke_count = 0

    for topic in curriculum.get('topics', []):
        for lesson in topic.get('lessons', []):
            for task in lesson.get('tasks', []):
                s = task.get('source') or task.get('cke_source') or task.get('badge') or ''
                q = task.get('question') or task.get('content') or ''
                norm_q = normalize_for_match(q)

                is_real_match = False
                matched_source = None
                if len(norm_q) > 15:
                    key = norm_q[:40]
                    if key in real_lookup:
                        is_real_match = True
                        matched_source = real_lookup[key]['source']

                # Check if task claimed to be an official matura session
                if re.search(r'matura\s+(?:maj|czerwiec|sierpien|sierpień|wrzesien|wrzesień|grudzien|grudzień)\s+20\d\d', s, re.IGNORECASE):
                    if is_real_match and matched_source:
                        task['source'] = matched_source
                        task['cke_source'] = matched_source
                        confirmed_cke_count += 1
                    else:
                        # Fake badge! Reset to Zadanie autorskie
                        task['source'] = "Zadanie autorskie"
                        if 'cke_source' in task:
                            task['cke_source'] = "Zadanie autorskie"
                        sanitized_count += 1
                elif 'informator' in s.lower():
                    # Keep clean Informator tag
                    zad_match = re.search(r'zad(?:anie)?\.?\s*(\d+)', s, re.IGNORECASE)
                    if zad_match:
                        task['source'] = f"CKE • Informator maturalny • Zad. {zad_match.group(1)}"
                    else:
                        task['source'] = "CKE • Informator maturalny"
                    task['cke_source'] = task['source']
                elif 'pokazow' in s.lower():
                    zad_match = re.search(r'zad(?:anie)?\.?\s*(\d+)', s, re.IGNORECASE)
                    if zad_match:
                        task['source'] = f"CKE • Arkusz pokazowy • Zad. {zad_match.group(1)}"
                    else:
                        task['source'] = "CKE • Arkusz pokazowy"
                    task['cke_source'] = task['source']
                elif not s:
                    task['source'] = "Zadanie autorskie"
                    task['cke_source'] = "Zadanie autorskie"

    print(f"✓ Oczyszczono {sanitized_count} fałszywych badge'y (przywrócono 'Zadanie autorskie').")
    print(f"✓ Potwierdzono {confirmed_cke_count} autentycznych powiązań CKE.")

    with open(CURRICULUM_PATH, 'w', encoding='utf-8') as f:
        json.dump(curriculum, f, ensure_ascii=False, indent=2)

    print(f"💾 Zapisano zaktualizowany plik {CURRICULUM_PATH}")

if __name__ == "__main__":
    main()
