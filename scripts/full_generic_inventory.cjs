const fs = require('fs');
const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

const isGeneric = (task) => {
  if (!task) return true;
  const s = task.source || task.badge || '';
  return !(/matura\s+(?:maj|czerwiec|sierpi|grudzi|wrzesi|marzec)|informator|arkusz pokazowy/i.test(s));
};

let genericT2 = 0;
let genericT3 = 0;
let genericT5 = 0;

prod.topics.forEach(t => {
  console.log(`\nTopic ${t.id} (${t.title}):`);
  t.lessons.forEach(l => {
    const t2 = l.tasks[1];
    const t3 = l.tasks[2];
    const t5 = l.tasks[4];
    const g2 = isGeneric(t2);
    const g3 = isGeneric(t3);
    const g5 = isGeneric(t5);
    if (g2) genericT2++;
    if (g3) genericT3++;
    if (g5) genericT5++;
    console.log(`  ${l.id}: T2: ${g2 ? 'GENERIC (' + t2?.type + ')' : t2.source} | T3: ${g3 ? 'GENERIC (' + t3?.type + ')' : t3.source} | T5: ${g5 ? 'GENERIC (' + t5?.type + ')' : t5.source}`);
  });
});

console.log(`\nTotal generic T2: ${genericT2}, T3: ${genericT3}, T5: ${genericT5}`);
