import sys, json, re
from collections import defaultdict, Counter
rows = json.load(open(sys.argv[1], encoding='utf8')); reqs = json.load(open(sys.argv[2], encoding='utf8'))
E = len({r['exam'] for r in rows}); NEW = lambda e: e.startswith(('2024-grudzien','2025','2026'))
sec_pts = defaultdict(float); sec_ex = defaultdict(set); code_n = Counter(); code_pts = defaultdict(float); code_ex = defaultdict(set)
for r in rows:
    cs = r['codes_2024']; secs = sorted({c.split('.')[0] for c in cs})
    for s in secs: sec_pts[s] += r['points']/len(secs); sec_ex[s].add(r['exam'])
    for c in cs: code_n[c] += 1; code_pts[c] += r['points']/len(cs); code_ex[c].add(r['exam'])
titles = {q['section']: q['section_title'] for q in reqs}
print('## Działy (numeracja 2024)')
for s in titles:
    print(f"{s} | {titles[s]} | {sec_pts[s]/E:.1f} pkt/arkusz | {len(sec_ex[s])}/{E}")
print('\n## Wymagania PR: liczba zadań / pkt łącznie / arkusze')
for q in reqs:
    if q['level']=='PR': print(f"{q['code']} | {code_n[q['code']]} | {code_pts[q['code']]:.0f} | {len(code_ex[q['code']])} | {q['text'][:70]}")
print('\n## Wymagania PP pojawiające się na PR (top)')
for c, n in code_n.most_common():
    if '.R' not in c and n >= 2: print(c, n, f"{code_pts[c]:.0f}", next(q['text'][:70] for q in reqs if q['code']==c))
print('\nnigdy nie wystąpiły (PR):', [q['code'] for q in reqs if q['level']=='PR' and not code_n[q['code']]])
print('zadania bez żadnego wymagania R:', sum(not r['pr_only'] for r in rows), 'pkt:', sum(r['points'] for r in rows if not r['pr_only']))
print('wiązki (zadania z podpunktami):', len({(r['exam'], r['task'].split('.')[0]) for r in rows if '.' in r['task']}))
print('dowody:', sum(r['proof'] for r in rows), 'pkt', sum(r['points'] for r in rows if r['proof']))
print('ogólne IV:', sum('IV' in r['general'] for r in rows))
# typy zadań wg zachowania
def kind(r):
    st = r['statement'].lower(); cs = set(r['codes_2024'])
    if r['proof'] or 'IV' in r['general'] and re.search(r'wykaż|udowodnij', st): return 'dowód'
    if 'XIII.R6' in cs or 'XIII.1' in cs: return 'optymalizacja'
    if 'III.R5' in cs: return 'parametr'
    if re.search(r'oblicz prawdopodob', st): return 'prawdopodobieństwo'
    return 'obliczeniowe/wyznacz'
print('typy:', Counter(kind(r) for r in rows))
print('typy pkt:', {k: sum(r['points'] for r in rows if kind(r)==k) for k in set(map(kind, rows))})
# po erze
for era in (False, True):
    sub=[r for r in rows if NEW(r['exam'])==era]; print('era 2024' if era else 'era 2018', 'arkuszy', len({r['exam'] for r in sub}), 'zadań/arkusz', round(len(sub)/len({r['exam'] for r in sub}),1))
