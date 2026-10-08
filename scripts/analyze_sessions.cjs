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

async function analyze() {
  const pages = [
    { year: 2023, url: 'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2023-2/' },
    { year: 2024, url: 'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2024-2/' },
    { year: 2025, url: 'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2025-2/' },
    { year: 2026, url: 'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/arkusze/2026-2/' }
  ];

  for (const p of pages) {
    const html = await fetchPage(p.url);
    console.log(`\n============================`);
    console.log(`YEAR ${p.year}: ${p.url}`);
    
    // Look for sections/headers or subpages
    // CKE often has subpages or anchor tabs for "termin główny (maj)", "termin dodatkowy (czerwiec)", "termin poprawkowy (sierpień)"
    const lines = html.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/czerwiec|sierpie|termin dodatkowy|termin poprawkowy/i.test(line)) {
        console.log(`Line ${i}: ${line.trim().substring(0, 150)}`);
      }
    }

    // Also extract all hrefs containing .pdf and matemat
    const pdfRegex = /href=["']([^"']+\.pdf)["'][^>]*>(.*?)<\/a>/gi;
    let m;
    const pdfs = [];
    while ((m = pdfRegex.exec(html)) !== null) {
      const href = m[1];
      const text = m[2].replace(/<[^>]+>/g, '').trim();
      if (/matemat|mma/i.test(href) || /matemat/i.test(text)) {
        pdfs.push({ href: href.startsWith('http') ? href : new URL(href, p.url).href, text });
      }
    }
    console.log(`Found ${pdfs.length} math PDFs for ${p.year}`);
    pdfs.forEach(x => console.log(`  [${x.text}] -> ${x.href}`));
  }
}

analyze();
