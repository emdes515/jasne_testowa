const fs = require('fs');

for (let d = 1; d <= 15; d++) {
  const p = `c:/Users/mateu/Downloads/mat/curriculum_dzial_${d}.json`;
  if (!fs.existsSync(p)) continue;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const topic = data.topic || (data.topics && data.topics[0]);
  console.log(`\n=== DZIAŁ ${d}: ${topic.title} (${topic.id}) ===`);
  (topic.lessons || []).forEach(l => {
    console.log(`  Lesson ${l.id}: ${l.title} (tasks: ${l.tasks ? l.tasks.length : 0})`);
    (l.tasks || []).forEach((t, i) => {
      const src = t.source || t.badge || '';
      const hasDiag = !!(t.plot || t.diagram || t.numberLine);
      const isCke = /matura|informator|cke/i.test(src);
      if (isCke) {
        console.log(`    T${i+1} [${t.type}] [diag:${hasDiag}] [${src}] ${(t.question || t.content || '').slice(0, 60)}`);
      }
    });
  });
}
