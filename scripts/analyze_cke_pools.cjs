const fs = require('fs');
const path = require('path');

const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const ckeTasks = ckeData.tasks || ckeData;

// Also load mat/ files
const matDir = 'c:/Users/mateu/Downloads/mat';
const allMatCke = [];

for (let i = 1; i <= 15; i++) {
  const fPath = path.join(matDir, `curriculum_dzial_${i}.json`);
  if (!fs.existsSync(fPath)) continue;
  const data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  const topic = data.topic || (data.topics && data.topics[0]);
  (topic.lessons || []).forEach(l => {
    (l.tasks || []).forEach(t => {
      const s = t.source || t.badge || '';
      if (/matura\s+(?:maj|czerwiec|sierpi|grudzi)|informator|arkusz pokazowy/i.test(s)) {
        allMatCke.push({
          dzialNum: i,
          topicId: topic.id,
          lessonId: l.id,
          lessonTitle: l.title,
          task: t
        });
      }
    });
  });
}

console.log('Total CKE tasks in cke_tasks_matematyka:', ckeTasks.length);
console.log('Total CKE tasks in mat/ folder:', allMatCke.length);

// Let's see all matura tasks with year 2023 or 2024
const realMaturaFromCke = ckeTasks.filter(t => t.source && /matura\s+(?:maj|czerwiec|sierpi)/i.test(t.source));
console.log('Real official matura tasks in cke_tasks_matematyka:', realMaturaFromCke.length);

// Let's print out what topics we have in prod
const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

console.log('\n--- Prod topics & lessons needing CKE injection ---');
prod.topics.forEach(t => {
  console.log(`\nTopic: ${t.id} (${t.title})`);
  t.lessons.forEach(l => {
    const t2 = l.tasks[1];
    const t3 = l.tasks[2];
    const t5 = l.tasks[4];
    console.log(`  ${l.id}: T2="${t2.source || t2.badge}", T3="${t3.source || t3.badge}", T5="${t5.source || t5.badge}"`);
  });
});
