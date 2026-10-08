const fs = require('fs');
const path = require('path');

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

async function discover() {
  const pages = [
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/informatory/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2023-r/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2024-r/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/materialy-dodatkowe/'
  ];

  for (const pageUrl of pages) {
    console.log(`\n========================================`);
    console.log(`Scanning: ${pageUrl}`);
    const html = await fetchPage(pageUrl);
    if (!html) continue;

    // find all links
    const linkRegex = /href=["']([^"']+)["']/gi;
    let match;
    const found = new Set();
    while ((match = linkRegex.exec(html)) !== null) {
      const link = match[1];
      const lower = link.toLowerCase();
      if (lower.includes('matemat') || lower.includes('wzor') || lower.includes('em23') || lower.includes('arkusze')) {
        let full = link;
        if (!full.startsWith('http')) {
          full = new URL(link, pageUrl).href;
        }
        found.add(full);
      }
    }
    console.log(`Found ${found.size} relevant links:`);
    for (const l of found) {
      console.log(' - ' + l);
    }
  }
}

discover();
