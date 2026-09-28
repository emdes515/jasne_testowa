const cp = require('child_process');
const data = cp.execSync('git show HEAD:seed/curriculum/curriculum_matematyka.json', { maxBuffer: 50*1024*1024, encoding: 'utf8' });
const head = JSON.parse(data);

console.log('=== HEAD T2, T3, T5 FOR DZIAŁ 11 TO 21 ===');
head.topics.slice(10).forEach(tp => {
  console.log(`\nTopic ${tp.id} (${tp.title}):`);
  tp.lessons.forEach(l => {
    [1, 2, 4].forEach(pos => {
      const t = l.tasks[pos];
      const isCke = t && (t.official_cke || /matura|informator|pokazowy/i.test(t.badge || t.source || ''));
      console.log(`  ${l.id} T${pos+1} [${t.type}] [${isCke ? 'CKE' : 'GENERIC'}] [${t.badge || t.source}]: ${(t.question||'').slice(0, 50)}`);
    });
  });
});
