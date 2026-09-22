# -*- coding: utf-8 -*-
import os
import re
import sys

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

files_map = {
    'topic_02_builder.py': ('Logarytmy', 2),
    'topic_03_builder.py': ('Wartość bezwzględna', 3),
    'topic_04_builder.py': ('Wzory skróconego mnożenia i algebra', 4),
    'topic_05_builder.py': ('Nierówności liniowe', 5),
    'topic_06_builder.py': ('Równania w postaci iloczynowej', 6),
    'topic_07_builder.py': ('Równania i wyrażenia wymierne', 7),
    'topic_08_builder.py': ('Nierówności kwadratowe', 8),
    'topic_09_builder.py': ('Odczytywanie informacji z wykresu funkcji', 9),
    'topic_10_builder.py': ('Funkcja liniowa i jej własności', 10),
}

base_dir = r'c:\Users\mateu\Downloads\0.45-main\scripts\curriculum_builder'

for fname, (clean_title, num) in files_map.items():
    fpath = os.path.join(base_dir, fname)
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace topic_title = ...
    content = re.sub(
        r"topic_title\s*=\s*['\"]Dział\s*[\d.]+\s*:\s*(.*?)['\"]",
        f"topic_title = '{clean_title}'\n    topic_number = {num}",
        content
    )

    # 2. Add topic_number to returned dict
    if "'topic_number'" not in content:
        content = re.sub(
            r"('title':\s*topic_title,)",
            f"\\1\n        'topic_number': topic_number,\n        'order': topic_number,",
            content
        )

    # 3. Clean lesson titles if they have L1.X.Y:
    content = re.sub(r"title='L\d+(?:\.\d+)+\s*:\s*", "title='", content)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Updated {fname}: title={clean_title}, num={num}")
