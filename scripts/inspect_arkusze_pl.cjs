const fs = require('fs');

async function checkArkuszePl() {
  const urls = [
    'https://arkusze.pl/matematyka-matura-poziom-podstawowy/',
    'https://arkusze.pl/matematyka-matura-poziom-rozszerzony/',
    'https://arkusze.pl/matematyka-matura-karty-wzorow-informatory/'
  ];
  for (const u of urls) {
    try {
      console.log(`\nFetching: ${u}`);
      const res = await fetch(u, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      const html = await res.text();
      console.log(`Length: ${html.length}`);
      // Find links matching 2022, 2023, 2024, 2025, 2026
      const regex = /href=["'](https:\/\/arkusze\.pl\/matematyka-[^"']+)["'][^>]*>(.*?)<\/a>/gi;
      let m;
      const links = [];
      while ((m = regex.exec(html)) !== null) {
        links.push({ url: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() });
      }
      console.log(`Found ${links.length} exam links:`);
      links.filter(l => /2022|2023|2024|2025|2026|nowa|formula-2023/i.test(l.url) || /2022|2023|2024|2025|2026/i.test(l.text))
           .forEach(l => console.log(`  [${l.text}] -> ${l.url}`));
    } catch(e) {
      console.error('Err:', e.message);
    }
  }
}

checkArkuszePl();
