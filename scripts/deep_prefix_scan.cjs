const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const foundInFields = {};
const sampleMatches = {};

function checkField(fieldName, text, lessonId) {
  if (!text || typeof text !== 'string') return;
  const trimmed = text.trim();
  const m = trimmed.match(/^([A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż0-9\s$.,()\-–—]{2,50}\s*(?:CKE|maturaln[a-ząćęłńóśźż]+|zasada|trik|trick|klucz|schemat|pewniak|uwaga|reguła|algorytm|krok|ważne|rozróżnienie|uwaga)\s*[:\-–!])/i)
         || trimmed.match(/^([A-ZĄĆĘŁŃÓŚŹŻ0-9\s–—\-]{4,}[:!])/);
  if (m) {
    foundInFields[fieldName] = (foundInFields[fieldName] || 0) + 1;
    if (!sampleMatches[fieldName]) sampleMatches[fieldName] = [];
    if (sampleMatches[fieldName].length < 5) {
      sampleMatches[fieldName].push({ lessonId, match: m[0], sample: trimmed.slice(0, 80) });
    }
  }
}

for (const topic of data.topics) {
  for (const lesson of topic.lessons) {
    const pill = lesson.theory_pill || {};
    checkField('matura_context', pill.matura_context, lesson.id);
    checkField('keyTakeaway', pill.keyTakeaway, lesson.id);
    checkField('concept_essence', pill.concept_essence, lesson.id);
    if (pill.exam_trap) {
      checkField('exam_trap.description', pill.exam_trap.description, lesson.id);
      checkField('exam_trap.tip', pill.exam_trap.tip, lesson.id);
      checkField('exam_trap.error', pill.exam_trap.error, lesson.id);
      checkField('exam_trap.correct', pill.exam_trap.correct, lesson.id);
    }
    if (pill.core_formulas) {
      for (const f of pill.core_formulas) {
        checkField('core_formulas.matura_tip', f.matura_tip, lesson.id);
        checkField('core_formulas.description', f.description, lesson.id);
      }
    }
  }
}

console.log('Matches by field:');
console.log(JSON.stringify(foundInFields, null, 2));
console.log('\nSamples:');
console.log(JSON.stringify(sampleMatches, null, 2));
