const fs = require('fs');

const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const ckeTasks = ckeData.tasks || ckeData;

console.log('=== SEARCHING FOR REAL NIERÓWNOŚCI KWADRATOWE IN CKE TASKS ===');
ckeTasks.forEach(t => {
  const q = (t.content || t.question || '') + ' ' + (t.explanation || '');
  if (/nierówność/i.test(q) && (/< 0|> 0|\\le 0|\\ge 0|<= 0|>= 0/.test(q) || /x\^2|x²/.test(q))) {
    if (/x\^2|x²|\(x\s*[-+]\s*\d+\)\(x\s*[-+]\s*\d+\)/.test(q)) {
      console.log(`[${t.source}] [${t.type}] [pts: ${t.points}]`);
      console.log('  Q:', (t.content || t.question || '').slice(0, 90));
      console.log('  Ans:', t.correctAnswer);
    }
  }
});
