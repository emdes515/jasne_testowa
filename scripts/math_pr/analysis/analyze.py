import sys, os, re, json
from collections import defaultdict, Counter
d = sys.argv[1]; out = sys.argv[2]
HDR = re.compile(r'^Zadanie (\d+(?:\.\d+)?)\. \(0[–-](\d)\)', re.M)
CODE = re.compile(r'\b([IVX]{1,4})\.(R?)(\d{0,2})\)')
GEN = re.compile(r'^(I|II|III|IV)\. (Sprawność|Wykorzystanie i tworzenie|Wykorzystanie i interpretowanie|Rozumowanie)', re.M)
rows = []
for fn in sorted(os.listdir(d)):
    if not fn.endswith('-odpowiedzi.txt') or 'politechnika' in fn: continue
    exam = fn.replace('-rozszerzona-odpowiedzi.txt', '').replace('matematyka-', '')
    key = open(os.path.join(d, fn), encoding='utf8').read()
    sheet_fn = os.path.join(d, fn.replace('-odpowiedzi', ''))
    sheet = open(sheet_fn, encoding='utf8').read() if os.path.exists(sheet_fn) else ''
    hs = list(HDR.finditer(key))
    for i, h in enumerate(hs):
        block = key[h.end(): hs[i+1].start() if i+1 < len(hs) else len(key)]
        req = block.split('Zasady oceniania')[0]
        codes = sorted({f"{r}.{'R' if R else ''}{n or '1'}" for r, R, n in CODE.findall(req)})
        gens = sorted(set(GEN.findall(req)), key=lambda x: x[0])
        no = h.group(1)
        m = re.search(r'Zadanie ' + re.escape(no) + r'\.\s*\(0[–-]\d\)(.{0,700})', sheet, re.S)
        stmt = re.sub(r'\s+', ' ', m.group(1)).strip()[:400] if m else ''
        proof = bool(re.search(r'\b(Wykaż|Udowodnij|Uzasadnij)', stmt))
        rows.append(dict(exam=exam, task=no, points=int(h.group(2)), codes=codes,
                         general=[g[0] for g in gens], proof=proof, statement=stmt))
json.dump(rows, open(out, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
per = defaultdict(int)
for r in rows: per[r['exam']] += r['points']
print('punkty/arkusz:', dict(per))
print('zadan:', len(rows), 'dowodow:', sum(r['proof'] for r in rows), 'bez kodow:', [ (r['exam'],r['task']) for r in rows if not r['codes']])
print('rozklad pkt:', Counter(r['points'] for r in rows))
