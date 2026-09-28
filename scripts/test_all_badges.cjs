const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

function computeTaskBadge(task) {
  const raw = (task?.badge || task?.source_badge || task?.source || task?.cke_source || '').trim();
  if (!raw) {
    return { label: 'Trening JASNE • Baza CKE', type: 'autorskie' };
  }
  const zadMatch = raw.match(/zad(?:anie)?\.?\s*(\d+(?:\.\d+)?)/i);
  const monthMatch = raw.match(/(maj|czerwiec|sierpi?e[nń]|grudzi?e[nń]|wrzesi?e[nń]|marzec)/i);
  const yearMatch = raw.match(/20\d\d/);
  const isInformatorOrPokazowy = /informator|arkusz\s*pokazowy/i.test(raw);
  const hasMaturaKeywords = /matura|cke/i.test(raw);

  if (monthMatch && yearMatch) {
    const mRaw = monthMatch[1].toLowerCase();
    const monthMap = {
      maj: 'maj', czerwiec: 'czerwiec', sierpien: 'sierpień', 'sierpień': 'sierpień',
      grudzien: 'grudzień', 'grudzień': 'grudzień', wrzesien: 'wrzesień', 'wrzesień': 'wrzesień', marzec: 'marzec'
    };
    const mClean = monthMap[mRaw] || mRaw;
    const isProbna = /próbna|probna/i.test(raw);
    const prefix = isProbna ? 'Matura próbna' : 'Matura';
    let label = `${prefix} ${mClean} ${yearMatch[0]}`;
    if (zadMatch) label += ` • Zad. ${zadMatch[1]}`;
    return { label, type: 'cke_matura' };
  }

  if (isInformatorOrPokazowy) {
    let label = /pokazowy/i.test(raw) ? 'Arkusz pokazowy CKE' : 'Informator CKE';
    if (zadMatch) label += ` • Zad. ${zadMatch[1]}`;
    return { label, type: 'cke_matura' };
  }

  if (yearMatch && (hasMaturaKeywords || /202[3-6]/.test(raw))) {
    let label = `Matura ${yearMatch[0]}`;
    if (zadMatch) label += ` • Zad. ${zadMatch[1]}`;
    return { label, type: 'cke_matura' };
  }

  if (zadMatch && (hasMaturaKeywords || task.official_cke)) {
    return { label: `Matura • Zad. ${zadMatch[1]}`, type: 'cke_matura' };
  }

  return { label: 'Trening JASNE • Baza CKE', type: 'autorskie' };
}

let ckeCount = 0;
let autorskieCount = 0;
const sampleBadges = new Set();

prod.topics.forEach(tp => {
  tp.lessons.forEach(l => {
    l.tasks.forEach(t => {
      const b = computeTaskBadge(t);
      if (b.type === 'cke_matura') ckeCount++;
      else autorskieCount++;
      sampleBadges.add(b.label);
    });
  });
});

console.log('=== BADGE COMPUTATION TEST ===');
console.log('Total CKE badges (sky-blue):', ckeCount);
console.log('Total Training badges (emerald):', autorskieCount);
console.log('Sample computed labels (first 25):', Array.from(sampleBadges).slice(0, 25));
