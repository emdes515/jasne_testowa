const fs = require('fs');

async function testLinks() {
  const url = 'https://arkusze.pl/matematyka-matura-poziom-podstawowy/';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const linkRegex = /href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
  let m;
  const list = [];
  while ((m = linkRegex.exec(html)) !== null) {
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (/2022|2023|2024|2025|2026/i.test(href) || /2022|2023|2024|2025|2026/i.test(text)) {
      list.push({ href, text });
    }
  }
  console.log(`Matched ${list.length} links:`);
  list.slice(0, 40).forEach(x => console.log(`  [${x.text}] -> ${x.href}`));
}
testLinks();
