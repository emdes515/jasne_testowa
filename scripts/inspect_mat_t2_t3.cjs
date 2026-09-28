const fs = require('fs');

const matData = JSON.parse(fs.readFileSync('c:/Users/mateu/Downloads/mat/curriculum_matematyka.json', 'utf8'));

console.log('=== INSPECTING T2 AND T3 IN MAT/CURRICULUM_MATEMATYKA.JSON ===');
matData.topics.forEach(tp => {
  tp.lessons.forEach(l => {
    const t2 = l.tasks[1];
    const t3 = l.tasks[2];
    console.log(`[${l.id}]`);
    console.log(`  T2 [${t2 ? t2.type : 'N/A'}] [${t2 ? (t2.badge || t2.source) : 'N/A'}]: ${(t2?.question || '').slice(0, 50)}`);
    console.log(`  T3 [${t3 ? t3.type : 'N/A'}] [${t3 ? (t3.badge || t3.source) : 'N/A'}]: ${(t3?.question || '').slice(0, 50)}`);
  });
});
