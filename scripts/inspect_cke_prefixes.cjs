const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const prefixes = new Map();
let totalMatches = 0;

for (const topic of data.topics) {
  for (const lesson of topic.lessons) {
    const pill = lesson.theory_pill || {};
    const items = [
      { field: 'matura_context', text: pill.matura_context },
      { field: 'keyTakeaway', text: pill.keyTakeaway }
    ];
    for (const item of items) {
      const t = item.text;
      if (!t) continue;
      // Match things like "Rozróżnienie CKE:", "Pewniak CKE:", "Klucz do 1 pkt CKE:", etc.
      const m = t.match(/^([^:\n.!?]{2,45}:)/);
      if (m) {
        const pref = m[1].trim();
        prefixes.set(pref, (prefixes.get(pref) || 0) + 1);
        totalMatches++;
      }
    }
  }
}

console.log('Total matches in matura_context/keyTakeaway:', totalMatches);
console.log('Unique prefixes found:');
for (const [pref, count] of prefixes.entries()) {
  console.log(`  "${pref}" (${count})`);
}
