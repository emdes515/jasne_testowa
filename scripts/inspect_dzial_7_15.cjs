const fs = require('fs');
const path = require('path');
const matDir = 'c:/Users/mateu/Downloads/mat';

for (let i = 7; i <= 15; i++) {
  const fPath = path.join(matDir, `curriculum_dzial_${i}.json`);
  if (!fs.existsSync(fPath)) continue;
  const data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  const topic = data.topic || (data.topics && data.topics[0]);
  console.log(`\n=== Dział ${i}: ${topic.title} ===`);
  const sources = new Set();
  (topic.lessons || []).forEach(l => {
    (l.tasks || []).forEach(t => {
      if (t.source || t.badge) sources.add(`${t.source || t.badge} (type: ${t.type})`);
    });
  });
  console.log(Array.from(sources).slice(0, 15));
}
