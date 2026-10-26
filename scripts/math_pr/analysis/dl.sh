#!/bin/bash
# usage: dl.sh LIST_HTML OUT_DIR
LIST="$1"; OUT="$2"; mkdir -p "$OUT"
MAN="$OUT/_pages.tsv"; : > "$MAN"
grep -oE 'href="https://arkusze.pl/matur[^"]*poziom-rozszerzony[^"]*/"' "$LIST" | sed 's/href="//;s/"$//' | sort -u | while read -r page; do
  html=$(curl -sL -A "Mozilla/5.0" "$page")
  echo "$html" | grep -oE 'href="https://arkusze.pl/[^"]+\.pdf"' | sed 's/href="//;s/"$//' | sort -u | while read -r pdf; do
    f="$OUT/$(basename "$pdf")"
    [ -s "$f" ] || curl -sL -A "Mozilla/5.0" "$pdf" -o "$f"
    printf '%s\t%s\t%s\n' "$page" "$pdf" "$(basename "$pdf")" >> "$MAN"
  done
done
echo done; ls "$OUT" | wc -l
