const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

console.log('=== ALL 41 TASKS WITH PLOT / DIAGRAM / NUMBERLINE ===\n');

prod.topics.forEach(t => {
  t.lessons.forEach(l => {
    l.tasks?.forEach((task, idx) => {
      if (task.diagram || task.plot || task.numberLine) {
        console.log(`[${t.id}] [${l.id}] Task ${idx + 1} (${task.id})`);
        console.log(`Source: ${task.source} | Badge: ${task.badge}`);
        console.log(`Has plot: ${!!task.plot}, diag: ${!!task.diagram}, nl: ${!!task.numberLine}`);
        console.log(`Text: ${(task.question || task.content || '').trim()}`);
        console.log('----------------------------------------------------');
      }
    });
  });
});
