# -*- coding: utf-8 -*-
import json

with open('seed/curriculum/curriculum_matematyka.json', 'r', encoding='utf-8') as f:
    topics = json.load(f)['topics']

print("Lessons with slot badge issues:")
for t in topics:
    for l in t['lessons']:
        t1, t2, t3, t4, t5 = l['tasks']
        s1 = t1.get('badge')
        s2 = t2.get('badge')
        s3 = t3.get('badge')
        is_cke_3 = s3.startswith('Matura') or s3.startswith('Informator')
        is_trening_1 = (s1 == 'Trening JASNE • Wzorzec CKE')
        is_trening_2 = (s2 == 'Trening JASNE • Wzorzec CKE')
        if not (is_cke_3 and is_trening_1 and is_trening_2):
            print(f"  {t['id']} {l['id']}: S1='{s1}' | S2='{s2}' | S3='{s3}'")
