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

async function inspectArkusze() {
  const urls = [
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2023-r/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2024-r/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2025-r/'
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
    for (const l of found) {
      if (l.includes('2023') || l.includes('2024') || l.includes('2025') || l.includes('matematyk') || l.includes('.pdf') || l.includes('arkusz')) {
        console.log(' - ' + l);
      }
    }
  }
}

inspectArkusze();
