# Parsuje treści nauczania (podstawa 2024) do listy wymagań {code, section, level, text}
import sys, re, json
t = open(sys.argv[1], encoding='utf8').read()
t = re.sub(r'=== PAGE \d+ ===\n?', '', t).replace('\ufeff', '')
t = t.split('Warunki i sposób realizacji')[0]
secs = list(re.finditer(r'^([IVX]{1,4})\. ([A-ZĄĆĘŁŃÓŚŹŻ][^\n]+)$', t, re.M))
out = []
for i, s in enumerate(secs):
    body = t[s.end(): secs[i+1].start() if i+1 < len(secs) else len(t)]
    pp, _, pr = body.partition('Zakres rozszerzony.')
    for level, part in (('PP', pp), ('PR', pr)):
        part = part.split('Uczeń:', 1)[-1] if level == 'PP' else part
        items = re.split(r'(?:^|\n)\s*(\d{1,2})\)\s*', part)
        if len(items) == 1:  # pojedyncze wymaganie bez numeru
            txt = re.sub(r'\s+', ' ', part)
            txt = re.sub(r'^.*?(a ponadto|Uczeń)\s*', '', txt).strip()
            if txt: out.append(dict(code=f"{s.group(1)}.{'R' if level=='PR' else ''}1", section=s.group(1), section_title=s.group(2).strip(' .'), level=level, text=txt))
            continue
        merged = []
        for n, txt in zip(items[1::2], items[2::2]):
            txt = re.sub(r'\s+', ' ', txt).strip()
            # fragmenty wzorów z symbolem Newtona, np. "(n 1) = n", to nie są nowe punkty
            if merged and (txt.startswith('=') or int(n) != len(merged) + 1):
                merged[-1][1] += f' {n}) {txt}'; continue
            merged.append([n, txt])
        for n, txt in merged:
            out.append(dict(code=f"{s.group(1)}.{'R' if level=='PR' else ''}{n}", section=s.group(1), section_title=s.group(2).strip(' .'), level=level, text=txt))
json.dump(out, open(sys.argv[2], 'w', encoding='utf8'), ensure_ascii=False, indent=1)
from collections import Counter
print(len(out), Counter(o['level'] for o in out)); print(Counter((o['section'], o['level']) for o in out))
