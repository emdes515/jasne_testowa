const fs = require('fs');
const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

console.log('=== LESSONS IN SEED NEEDING CKE TASKS IN TASK 2, 3, OR 5 ===\n');

prod.topics.forEach(t => {
  t.lessons.forEach(l => {
    const t2 = l.tasks[1];
    const t3 = l.tasks[2];
    const t5 = l.tasks[4];

    const isGeneric = (task) => {
      if (!task) return true;
      const s = task.source || task.badge || '';
      return !(/matura\s+(?:maj|czerwiec|sierpi|grudzi|wrzesi|marzec)|informator|arkusz pokazowy/i.test(s));
    };

    const t2Gen = isGeneric(t2);
    const t3Gen = isGeneric(t3);
    const t5Gen = isGeneric(t5);

    if (t2Gen || t3Gen || t5Gen) {
      console.log(`[${t.id}] ${l.id} ("${l.title}"):`);
      if (t2Gen) console.log(`   Task 2 is generic: "${t2?.source || t2?.badge}" - "${(t2?.question || '').slice(0, 50)}"`);
      if (t3Gen) console.log(`   Task 3 is generic: "${t3?.source || t3?.badge}" - "${(t3?.question || '').slice(0, 50)}"`);
      if (t5Gen) console.log(`   Task 5 is generic: "${t5?.source || t5?.badge}" - "${(t5?.question || '').slice(0, 50)}"`);
    }
  });
});
