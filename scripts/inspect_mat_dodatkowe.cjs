async function inspect() {
  const url = 'https://cke.gov.pl/egzamin-maturalny/egzamin-maturalny-w-formule-2023/materialy-dodatkowe/matematyka-materialy-dodatkowe/';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const linkRegex = /href=["']([^"']+\.pdf)["'][^>]*>(.*?)<\/a>/gi;
  let m;
  console.log('PDFs in matematyka-materialy-dodatkowe:');
  while ((m = linkRegex.exec(html)) !== null) {
    console.log('  ', m[2].replace(/<[^>]+>/g, '').trim(), '->', m[1]);
  }
}
inspect();
