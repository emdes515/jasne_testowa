async function inspectPage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const pdfRegex = /href=["']([^"']+\.pdf)["'][^>]*>(.*?)<\/a>/gi;
  let m;
  console.log('PDFs in', url);
  while ((m = pdfRegex.exec(html)) !== null) {
    console.log('  ', m[2].replace(/<[^>]+>/g, '').trim(), '->', m[1]);
  }
}
inspectPage('https://arkusze.pl/matura-matematyka-2023-maj-poziom-podstawowy/');
