const fs = require('fs');
const path = require('path');

const matDir = 'c:/Users/mateu/Downloads/mat';
const files = fs.readdirSync(matDir).filter(f => f.startsWith('curriculum_dzial_') && f.endsWith('.json'));

console.log('Found', files.length, 'dzial files in mat dir');

files.sort((a, b) => {
  const numA = parseInt(a.match(/\d+/)[0], 10);
  const numB = parseInt(b.match(/\d+/)[0], 10);
  return numA - numB;
});

files.forEach(f => {
  const data = JSON.parse(fs.readFileSync(path.join(matDir, f), 'utf8'));
  const topic = data.topic || (data.topics && data.topics[0]);
  const lessons = topic ? (topic.lessons || []) : [];
  let ckeCount = 0;
  let totalTasks = 0;
  const sampleCke = [];
  lessons.forEach(l => {
    (l.tasks || []).forEach(t => {
      totalTasks++;
      const s = t.source || t.badge || '';
      if (/matura|informator|arkusz pokazowy|cke/i.test(s) && !/trening|autorsk/i.test(s)) {
        ckeCount++;
        if (sampleCke.length < 3) sampleCke.push({ id: t.id, source: s, badge: t.badge, type: t.type });
      }
    });
  });
  console.log(`${f} (${topic?.id} "${topic?.title}"): ${lessons.length} lessons, ${totalTasks} tasks, ${ckeCount} CKE tasks`);
  if (sampleCke.length > 0) {
    console.log('   Samples:', JSON.stringify(sampleCke));
  }
});
