const fs = require('fs');
const path = require('path');

const matDir = 'c:/Users/mateu/Downloads/mat';

console.log('=== OPEN TASKS IN MAT/*.JSON ===');

for (let i = 1; i <= 15; i++) {
  const fPath = path.join(matDir, `curriculum_dzial_${i}.json`);
  if (!fs.existsSync(fPath)) continue;
  const data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  const topic = data.topic || (data.topics && data.topics[0]);
  (topic.lessons || []).forEach(l => {
    (l.tasks || []).forEach(t => {
      if (t.type && (t.type.includes('OPEN') || t.type === 'OPEN_PROOF' || t.type === 'OPEN_TASK' || t.type === 'OPEN_GENERAL')) {
        const src = t.source || t.badge || '';
        if (/matura|informator/i.test(src)) {
          console.log(`[Dział ${i}] [${t.type}] [${src}] ${(t.question || t.content || '').slice(0, 70)}`);
        }
      }
    });
  });
}
