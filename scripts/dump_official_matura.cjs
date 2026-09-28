const fs = require('fs');

const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const tasks = ckeData.tasks || ckeData;

const officialExams = [
  'Matura Maj 2024 (Formuła 2023)',
  'Matura Czerwiec 2024 (Formuła 2023)',
  'Matura Sierpień 2024 (Formuła 2023)',
  'Matura Maj 2023 (Formuła 2023)',
  'Matura Czerwiec 2023 (Formuła 2023)',
  'Matura Sierpień 2023 (Formuła 2023)'
];

const examTasks = tasks.filter(t => officialExams.includes(t.examName));
console.log('Total official matura exam tasks:', examTasks.length);

const bySession = {};
examTasks.forEach(t => {
  bySession[t.examName] = bySession[t.examName] || [];
  bySession[t.examName].push({
    source: t.source,
    type: t.type,
    points: t.points,
    q: (t.content || t.question || '').slice(0, 60),
    topicId: t.topicId
  });
});

Object.entries(bySession).forEach(([name, list]) => {
  console.log(`\n=== ${name} (${list.length} tasks) ===`);
  list.slice(0, 10).forEach(t => console.log(`  ${t.source} [${t.type}, ${t.points}p]: ${t.q}`));
});
