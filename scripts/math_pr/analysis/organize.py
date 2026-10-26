import sys, os, re, json, shutil
root = sys.argv[1]; raw = os.path.join(root, '_raw')
pages = {}
for line in open(os.path.join(raw, '_pages.tsv'), encoding='utf8'):
    page, pdf, fn = line.rstrip('\n').split('\t')
    pages[fn] = (page, pdf)

def classify(fn):
    m = re.match(r'matematyka-(\d{4})-(.+?)-rozszerzona(-2)?(-odpowiedzi)?(-2)?\.pdf$', fn)
    year = int(m.group(1)); tag = m.group(2)
    stara = 'stara' in tag
    pl = 'politechnika-lodzka' in tag; ne = 'nowa-era' in tag
    if 'probna' in tag or 'przykladowy' in tag or 'poprawkowa' in tag and False: pass
    kind = 'glowna'
    if 'przykladowy' in tag: kind = 'przykladowy_cke'
    elif pl: kind = 'probna_politechnika_lodzka'
    elif ne: kind = 'probna_nowa_era'
    elif 'probna' in tag: kind = 'probna_cke'
    elif 'poprawkowa' in tag: kind = 'poprawkowa'
    session = tag.split('-')[0]
    if stara:
        formula = 'F2015' if year >= 2023 else 'F2005'
    elif year >= 2023 or (year == 2022 and session == 'grudzien'):
        formula = 'F2023'
    elif year >= 2015:
        formula = 'F2015'
    else:
        formula = 'F2005'
    return dict(year=year, session=session, kind=kind, formula=formula,
                is_key=bool(m.group(4)), variant=2 if (m.group(3) or m.group(5)) else 1)

exams = {}
for fn in sorted(os.listdir(raw)):
    if not fn.endswith('.pdf'): continue
    c = classify(fn)
    dst_dir = os.path.join(root, c['formula'], str(c['year']))
    os.makedirs(dst_dir, exist_ok=True)
    shutil.move(os.path.join(raw, fn), os.path.join(dst_dir, fn))
    exam_id = fn.replace('-odpowiedzi-2', '-2').replace('-odpowiedzi', '').replace('.pdf', '')
    e = exams.setdefault(exam_id, {k: c[k] for k in ('formula','year','session','kind','variant')} | {'id': exam_id, 'source_page': pages.get(fn, ('',''))[0]})
    rel = f"{c['formula']}/{c['year']}/{fn}"
    if c['is_key']: e['key_file'] = rel; e['key_url'] = pages.get(fn, ('',''))[1]
    else: e['sheet_file'] = rel; e['sheet_url'] = pages.get(fn, ('',''))[1]
lst = sorted(exams.values(), key=lambda e: (e['year'], e['id']))
json.dump({'source': 'https://arkusze.pl/matematyka-matura-poziom-rozszerzony/',
           'downloaded': '2026-10-22',
           'formula_notes': {'F2023': 'obowiązująca (podstawa 2018 z nowelizacją 2024, egzamin od 2023, wymagania od 2025)',
                             'F2015': 'poprzednia formuła – materiał pomocniczy, zakres w dużej części wspólny',
                             'F2005': 'archiwalna – tylko inspiracja, inny zakres i styl'},
           'exams': lst}, open(os.path.join(root, 'manifest.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=1)
shutil.move(os.path.join(raw, '_pages.tsv'), os.path.join(root, '_pages.tsv'))
os.rmdir(raw)
from collections import Counter
print(Counter((e['formula'], e['kind']) for e in lst))
print('missing key:', [e['id'] for e in lst if 'key_file' not in e])
