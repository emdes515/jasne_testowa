const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

function computeBadge(task) {
  const raw = (task?.badge || task?.source_badge || task?.source || task?.cke_source || '').trim();
  
  if (!raw) {
    return {
      label: 'Trening JASNE • Baza CKE',
      type: 'autorskie',
      badgeClass: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
    };
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
    const isProbna = /próbna|probna/i.test(raw) && !/grudzi?e[nń]|wrzesi?e[nń]|marzec/i.test(raw);
    const prefix = isProbna ? 'Matura próbna' : 'Matura';
    let label = `${prefix} ${mClean} ${yearMatch[0]}`;
    if (zadMatch) {
      label += ` • Zad. ${zadMatch[1]}`;
    }
    return {
      label,
      type: 'cke_matura',
      badgeClass: 'bg-sky-500/15 border-sky-400/30 text-sky-300'
    };
  }

  if (isInformatorOrPokazowy) {
    let label = /pokazowy/i.test(raw) ? 'Arkusz pokazowy CKE' : 'Informator CKE';
    if (zadMatch) {
      label += ` • Zad. ${zadMatch[1]}`;
    }
    return {
      label,
      type: 'cke_matura',
      badgeClass: 'bg-sky-500/15 border-sky-400/30 text-sky-300'
    };
  }

  if (yearMatch && (hasMaturaKeywords || /202[3-6]/.test(raw))) {
    let label = `Matura ${yearMatch[0]}`;
    if (zadMatch) {
      label += ` • Zad. ${zadMatch[1]}`;
    }
    return {
      label,
      type: 'cke_matura',
      badgeClass: 'bg-sky-500/15 border-sky-400/30 text-sky-300'
    };
  }

  if (zadMatch && hasMaturaKeywords) {
    const cleanRaw = raw.replace(/\bCKE\s+CKE\b/gi, 'CKE').replace(/\bCKE\s*•\s*CKE\b/gi, 'CKE').trim();
    return {
      label: cleanRaw.startsWith('CKE') || cleanRaw.startsWith('Matura') ? cleanRaw : `Matura • Zad. ${zadMatch[1]}`,
      type: 'cke_matura',
      badgeClass: 'bg-sky-500/15 border-sky-400/30 text-sky-300'
    };
  }

  return {
    label: 'Trening JASNE • Baza CKE',
    type: 'autorskie',
    badgeClass: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
  };
}

const badgeStats = {};
prod.topics.forEach(t => {
  t.lessons.forEach(l => {
    l.tasks.forEach(task => {
      const b = computeBadge(task);
      const key = `${b.type} [${b.badgeClass}]`;
      badgeStats[key] = (badgeStats[key] || 0) + 1;
    });
  });
});

console.log('Badge stats across all 345 tasks:');
console.log(badgeStats);

// Sample check Task 2, Task 3, Task 5 in a sample lesson
const sampleL = prod.topics[9].lessons[0]; // dzial-10 lesson 1
console.log(`\nSample lesson ${sampleL.id} (${sampleL.title}):`);
sampleL.tasks.forEach((t, i) => {
  const b = computeBadge(t);
  console.log(`  Task ${i+1}: "${b.label}" (${b.badgeClass})`);
});
