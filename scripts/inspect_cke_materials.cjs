const fs = require('fs');

async function inspectMaterials() {
  const pages = [
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/materialy-dodatkowe/matematyka-materialy-dodatkowe/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/materialy-dodatkowe/arkusze-pokazowe-marzec-2022/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/materialy-dodatkowe/arkusze-diagnostyczne-wrzesien-2022/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/materialy-dodatkowe/arkusze-diagnostyczne-grudzien-2023/',
    'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/materialy-dodatkowe/arkusze-diagnostyczne-grudzien-2024/'
  ];

  for (const u of pages) {
    console.log(`\n=== Checking: ${u} ===`);
    try {
      const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const linkRegex = /href=["']([^"']+\.pdf)["'][^>]*>(.*?)<\/a>/gi;
      let m;
      while ((m = linkRegex.exec(html)) !== null) {
        const href = m[1];
        const text = m[2].replace(/<[^>]+>/g, '').trim();
        if (/matemat|mma/i.test(href) || /matemat/i.test(text)) {
          const full = href.startsWith('http') ? href : new URL(href, u).href;
          console.log(`  [${text}] -> ${full}`);
        }
      }
    } catch (e) {
      console.error('Error fetching', u, e.message);
    }
  }
}

inspectMaterials();
