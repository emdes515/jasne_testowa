const cp = require('child_process');
const data = cp.execSync('git show HEAD:seed/curriculum/curriculum_matematyka.json', { maxBuffer: 50*1024*1024, encoding: 'utf8' });
const head = JSON.parse(data);

console.log('=== HEAD GENERIC TASKS IN T2, T3, T5 ===');

let t2Generic = 0;
let t3Generic = 0;
let t5Generic = 0;

head.topics.forEach(tp => {
  tp.lessons.forEach(l => {
    l.tasks.forEach((t, i) => {
      const isCke = t.official_cke || /matura|informator|arkusz pokazowy/i.test(t.badge || t.source || '');
      if (!isCke) {
        if (i === 1) t2Generic++;
        if (i === 2) t3Generic++;
        if (i === 4) t5Generic++;
        // console.log(`[${l.id}] T${i+1} (${t.id}): ${t.badge || t.source} | ${(t.question||'').slice(0, 50)}`);
      }
    });
  });
});

console.log(`Generic counts in HEAD: T2=${t2Generic}, T3=${t3Generic}, T5=${t5Generic} (out of 69 lessons)`);
