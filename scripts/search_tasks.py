# -*- coding: utf-8 -*-
import json
import sys

ref = json.load(open('seed/curriculum/official_cke_tasks_reference.json', encoding='utf-8'))
query = sys.argv[1] if len(sys.argv) > 1 else ''

for x in ref:
    b = x.get('badge', '')
    c = x.get('content', '')
    combined = (b + ' ' + c + ' ' + str(x.get('options', []))).lower()
    if query.lower() in combined:
        print(f"=== {b} | ans={x.get('ans')} | pts={x.get('points')} ===")
        print(f"Content: {c.strip()[:150]}")
        print(f"Options: {x.get('options')}\n")
