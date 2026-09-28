const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));
const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const ckeTasks = ckeData.tasks || ckeData;

console.log('Comparing prod tasks with CKE database...');

// Map CKE tasks by various keywords or matching content
let exactMatches = 0;
let partialMatches = 0;

prod.topics.forEach(t => {
  t.lessons.forEach(l => {
    l.tasks.forEach((task, idx) => {
      const q = (task.question || task.content || '').trim();
      const match = ckeTasks.find(ct => {
        const cq = (ct.content || ct.question || '').trim();
        return cq && (cq === q || q.includes(cq) || cq.includes(q));
      });
      if (match) {
        exactMatches++;
        // console.log(`[${l.id}] Task ${idx+1} matched ${match.source} (${match.examName})`);
      }
    });
  });
});

console.log(`Total exact/substring matches found: ${exactMatches}`);
