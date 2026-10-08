const fs = require('fs');

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    return await res.text();
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err.message);
    return '';
  }
}

async function inspectYearPages() {
  const urls = [
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2023-2/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2024-2/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2025-2/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2026-2/'
  ];

  for (const u of urls) {
    console.log(`\n=================== ${u} ===================`);
    const html = await fetchPage(u);
    // Find all links
    const linkRegex = /href=["']([^"']+)["']/gi;
    let match;
    const found = new Set();
    while ((match = linkRegex.exec(html)) !== null) {
      const link = match[1];
      if (link.startsWith('#') || link.startsWith('javascript:')) continue;
      let full = link;
      if (!full.startsWith('http')) {
        full = new URL(link, u).href;
      }
      found.add(full);
    }
    const mathLinks = [...found].filter(l => l.toLowerCase().includes('matemat') || l.toLowerCase().includes('mma'));
    console.log(`Found ${mathLinks.length} math links in ${u}:`);
    mathLinks.forEach(l => console.log('  ' + l));
  }
}

inspectYearPages();
