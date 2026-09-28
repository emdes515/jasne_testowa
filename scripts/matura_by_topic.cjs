const fs = require('fs');
const data = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const tasks = data.tasks || data;

const maturaOnly = tasks.filter(t => t.source && /matura\s+(?:maj|czerwiec|sierpi|grudzi)/i.test(t.source));

console.log('Total matura tasks with specific session in cke_tasks_matematyka.json:', maturaOnly.length);

const byTopic = {};
maturaOnly.forEach(t => {
  byTopic[t.topicId] = byTopic[t.topicId] || [];
  byTopic[t.topicId].push({
    source: t.source,
    type: t.type,
    points: t.points,
    content: (t.content || '').slice(0, 50)
  });
});

Object.entries(byTopic).forEach(([top, list]) => {
  console.log(`Topic ${top}: ${list.length} tasks`);
  const sc = list.filter(x => x.type === 'SINGLE_CHOICE');
  const open = list.filter(x => x.type.startsWith('OPEN'));
  console.log(`   SC: ${sc.length}, OPEN: ${open.length}`);
});
