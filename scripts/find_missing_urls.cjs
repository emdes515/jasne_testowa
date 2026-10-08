const fs = require('fs');

async function findMissing() {
  // Let's check CKE page for arkusze pokazowe marzec 2022
  const ckePokazowe = 'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/materialy-dodatkowe/arkusze-pokazowe-marzec-2022/';
  const res1 = await fetch(ckePokazowe, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html1 = await res1.text();
  console.log('--- CKE Pokazowe marzec 2022 ---');
  for (const m of html1.matchAll(/href=["']([^"']+\.pdf)["'][^>]*>(.*?)<\/a>/gi)) {
    if (/matemat|mma/i.test(m[1]) || /matemat/i.test(m[2])) {
      console.log(' ', m[2].replace(/<[^>]+>/g, '').trim(), '->', m[1]);
    }
  }

  // Let's check CKE page for grudzień 2023 diagnostyczne
  const ckeDiag23 = 'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/materialy-dodatkowe/arkusze-diagnostyczne-grudzien-2023/';
  const res2 = await fetch(ckeDiag23, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html2 = await res2.text();
  console.log('--- CKE Diag grudzień 2023 ---');
  for (const m of html2.matchAll(/href=["']([^"']+\.pdf)["'][^>]*>(.*?)<\/a>/gi)) {
    if (/matemat|mma/i.test(m[1]) || /matemat/i.test(m[2])) {
      console.log(' ', m[2].replace(/<[^>]+>/g, '').trim(), '->', m[1]);
    }
  }

  // Let's check Arkusze.pl for marzec 2022 / przykładowy 2023
  const arkuszeSearch = 'https://arkusze.pl/matura-matematyka-2023-przykladowy-arkusz-cke-poziom-podstawowy/';
  const res3 = await fetch(arkuszeSearch, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html3 = await res3.text();
  console.log('--- Arkusze.pl przykladowy 2023 ---');
  for (const m of html3.matchAll(/href=["']([^"']+\.pdf)["'][^>]*>(.*?)<\/a>/gi)) {
    console.log(' ', m[2].replace(/<[^>]+>/g, '').trim(), '->', m[1]);
  }
}

findMissing();
