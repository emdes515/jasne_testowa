const fs = require('fs');

async function testSubsessions() {
  const years = ['2023-2', '2024-2', '2025-2', '2026-2'];
  for (const y of years) {
    const url = `https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/${y}/`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    console.log(`\n=== Year: ${y} ===`);
    // Search for headings or sub-links
    const headings = html.match(/<(?:h1|h2|h3|h4|h5|strong)[^>]*>(.*?)<\/(?:h1|h2|h3|h4|h5|strong)>/gi) || [];
    headings.forEach(h => {
      const clean = h.replace(/<[^>]+>/g, '').trim();
      if (/termin|maj|czerwiec|sierpie|sesj|arkusz/i.test(clean)) {
        console.log('Heading:', clean);
      }
    });

    // Check all hrefs containing 2306, 2308, 2406, 2408, etc.
    const allLinks = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
    const extraSessions = allLinks.filter(l => /(?:2306|2308|2406|2408|2506|2508|czerwiec|sierpien)/i.test(l));
    console.log(`Extra session links (${extraSessions.length}):`);
    extraSessions.forEach(l => console.log('  ', l));
  }
}

testSubsessions();
