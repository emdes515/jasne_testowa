import sys, fitz
src, out = sys.argv[1], sys.argv[2]
d = fitz.open(src)
with open(out, 'w', encoding='utf8') as f:
    for i, p in enumerate(d):
        f.write(f"\n\n=== PAGE {i+1} ===\n")
        f.write(p.get_text())
print(src, len(d))
