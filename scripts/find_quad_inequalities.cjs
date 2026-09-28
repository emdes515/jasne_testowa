const fs = require('fs');

const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const ckeTasks = ckeData.tasks || ckeData;

console.log('--- CKE TASKS FOR NIERÓWNOŚCI KWADRATOWE ---');
ckeTasks.forEach(t => {
  const q = t.content || t.question || '';
  if (/nierówność|nierówności/i.test(q) && /x\^2|x²/i.test(q)) {
    console.log(t.source, '|', (t.points || 1) + ' pkt', '|', q.slice(0, 100));
  }
});
