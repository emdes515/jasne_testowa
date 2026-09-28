const fs = require('fs');
const path = require('path');

const matDir = 'c:/Users/mateu/Downloads/mat';

for (let i = 1; i <= 15; i++) {
  const fPath = path.join(matDir, `curriculum_dzial_${i}.json`);
  if (!fs.existsSync(fPath)) continue;
  const data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  const topic = data.topic || (data.topics && data.topics[0]);
  console.log(`\n================ DZIAŁ ${i}: ${topic.title} ===============`);
  (topic.lessons || []).slice(0, 5).forEach((l, lIdx) => {
    console.log(`Lesson ${lIdx + 1}: ${l.id} - ${l.title}`);
    (l.tasks || []).forEach((t, tIdx) => {
      const s = t.source || t.badge || '';
      if (/matura|informator|pokazowy/i.test(s)) {
        console.log(`   Task ${tIdx + 1} [${t.type}] (${s}): ${(t.question || t.content || '').slice(0, 60)}`);
      }
    });
  });
}
