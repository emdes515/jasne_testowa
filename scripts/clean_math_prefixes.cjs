'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SEED_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const MIRROR_PATH = 'c:/Users/mateu/Downloads/mat/curriculum_matematyka.json';

console.log('Loading curriculum from:', SEED_PATH);
const data = JSON.parse(fs.readFileSync(SEED_PATH, 'utf8'));

function cleanMathText(text) {
  if (!text || typeof text !== 'string') return text;
  let s = text.trim();
  
  // 1. Remove wskazówka egzaminatora prefixes
  s = s.replace(/^(?:wskazówka\s+egzaminatora\s+cke|wskazówka\s+egzaminatora|wskazówka\s+cke|wskazówka)\s*[:\-–!]\s*/i, '');
  
  // 2. Remove case-insensitive CKE / maturalny heading prefixes up to 70 chars
  s = s.replace(/^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż0-9\s$.,()–—\-]{2,70}?\s*(?:CKE|maturaln[a-ząćęłńóśźż]+)\s*(?:dla\s+zadania\s+za\s+\d+\s*pkt)?\s*[:\-–!]\s*/i, '');
  
  // 3. Remove known pedagogical pseudo-headings
  s = s.replace(/^(?:żelazna\s+zasada[a-ząćęłńóśźż\s]*|złota\s+(?:zasada|reguła)[a-ząćęłńóśźż\s]*|kluczowa\s+zasada[a-ząćęłńóśźż\s]*|klucz\s+do[a-ząćęłńóśźż\s]*|algorytm[a-ząćęłńóśźż\s]*|schemat[a-ząćęłńóśźż\s]*|checklista[a-ząćęłńóśźż\s]*|błyskawiczny\s+(?:odczyt|sposób)|błyskawiczne\s+wyznaczanie\s+boków|trik\s+(?:z|na)[a-ząćęłńóśźż\s]*|strategia\s+wyboru\s+narzędzia|trójki\s+pitagorejskie\s+na\s+pamięć|najpopularniejsza\s+cecha\s+na\s+maturze|warunek\s+styczności\s+na\s+maturze|częste\s+przekroje\s+na\s+maturze|praktyczny\s+sposób\s+na\s+równanie\s+prostej|przejście\s+z\s+postaci\s+ogólnej\s+do\s+kierunkowej|skracanie\s+silni|metoda\s+sklejenia|zadania\s+z\s+dodawaniem\s+kul|zestawienie\s+miar\s+w\s+1\s+minutę|przewodnik\s+wyboru\s+metody|kwadrat\s+optymalny|zliczanie\s+odcinków\s+siatki|odejmij\s+bramę\s+na\s+samym\s+początku|pole\s+trójkąta\s+z\s+sumą\s+boków|kluczowy\s+skrót\s+matematyczny|bilans\s+obwodu\s+okna\s+normańskiego|uważaj\s+na\s+(?:treść\s+zadania|potęgi\s+we\s+wzorach|nawias\s+przy\s+odejmowaniu\s+kosztów))\s*[:\-–!]\s*/i, '');
  
  // 4. Remove uppercase heading prefixes (at least 4 chars followed by : or !)
  s = s.replace(/^[A-ZĄĆĘŁŃÓŚŹŻ0-9\s–—\-]{4,}[:!]\s*/, '');
  
  // 5. Tone calibrations
  s = s.replace(/[Żż]elazny\s+pewniak[^\n:!.]*(?::|!|\.|\b)\s*/gi, '')
       .replace(/\b100%\s+pewniak!?/gi, 'Częsty motyw w arkuszach CKE.')
       .replace(/NIGDY\s+nie\s+daje/g, 'nie daje')
       .replace(/\bNIGDY\b/g, 'nigdy')
       .replace(/\bZAWSZE\b/g, 'zawsze')
       .replace(/\bDOKŁADNY\b/g, 'dokładny')
       .trim();
       
  if (s.length > 0) {
    s = s.charAt(0).toUpperCase() + s.slice(1);
  }
  return s;
}

let contextChanges = 0;
let formulaChanges = 0;
let trapChanges = 0;
let diagramFixes = 0;

for (const topic of data.topics) {
  for (const lesson of topic.lessons) {
    const pill = lesson.theory_pill;
    if (pill) {
      if (pill.matura_context) {
        const cleaned = cleanMathText(pill.matura_context);
        if (cleaned !== pill.matura_context) {
          pill.matura_context = cleaned;
          contextChanges++;
        }
      }
      if (pill.keyTakeaway) {
        const cleaned = cleanMathText(pill.keyTakeaway);
        if (cleaned !== pill.keyTakeaway) {
          pill.keyTakeaway = cleaned;
          contextChanges++;
        }
      }
      if (pill.core_formulas && Array.isArray(pill.core_formulas)) {
        for (const f of pill.core_formulas) {
          if (f.matura_tip) {
            const cleaned = cleanMathText(f.matura_tip);
            if (cleaned !== f.matura_tip) {
              f.matura_tip = cleaned;
              formulaChanges++;
            }
          }
        }
      }
      if (pill.exam_trap && pill.exam_trap.tip) {
        const cleaned = cleanMathText(pill.exam_trap.tip);
        if (cleaned !== pill.exam_trap.tip) {
          pill.exam_trap.tip = cleaned;
          trapChanges++;
        }
      }
      if (pill.diagram && pill.diagram.metrics) {
        for (const m of pill.diagram.metrics) {
          if (m.label === 'Karta CKE') {
            m.label = 'Karta wzorów';
            diagramFixes++;
          }
        }
      }
      if (pill.plot && pill.plot.metrics) {
        for (const m of pill.plot.metrics) {
          if (m.label === 'Karta CKE') {
            m.label = 'Karta wzorów';
            diagramFixes++;
          }
        }
      }
    }

    // Fix diagram/plot metrics in tasks
    if (lesson.tasks && Array.isArray(lesson.tasks)) {
      for (const task of lesson.tasks) {
        if (task.diagram && task.diagram.metrics) {
          for (const m of task.diagram.metrics) {
            if (m.label === 'Karta CKE') {
              m.label = 'Karta wzorów';
              diagramFixes++;
            }
          }
        }
        if (task.plot && task.plot.metrics) {
          for (const m of task.plot.metrics) {
            if (m.label === 'Karta CKE') {
              m.label = 'Karta wzorów';
              diagramFixes++;
            }
          }
        }
      }
    }
  }
}

console.log(`Changes summary:`);
console.log(`- matura_context/keyTakeaway cleaned: ${contextChanges}`);
console.log(`- formula matura_tip cleaned: ${formulaChanges}`);
console.log(`- exam_trap tip cleaned: ${trapChanges}`);
console.log(`- diagram/plot metrics 'Karta CKE' -> 'Karta wzorów': ${diagramFixes}`);

const serialized = JSON.stringify(data, null, 2) + '\n';
fs.writeFileSync(SEED_PATH, serialized, 'utf8');
console.log(`Written to: ${SEED_PATH}`);

if (fs.existsSync(path.dirname(MIRROR_PATH))) {
  fs.writeFileSync(MIRROR_PATH, serialized, 'utf8');
  console.log(`Mirrored to: ${MIRROR_PATH}`);
}

const seedBuf = fs.readFileSync(SEED_PATH);
const mirrorBuf = fs.readFileSync(MIRROR_PATH);
const seedHash = crypto.createHash('sha256').update(seedBuf).digest('hex');
const mirrorHash = crypto.createHash('sha256').update(mirrorBuf).digest('hex');
console.log(`Seed SHA256:   ${seedHash}`);
console.log(`Mirror SHA256: ${mirrorHash}`);
console.log(`Hashes match: ${seedHash === mirrorHash}`);
