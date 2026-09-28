const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

console.log('--- ALL TASKS IN PROD WITH VISUALS ---');
prod.topics.forEach(t => {
  t.lessons.forEach(l => {
    l.tasks.forEach(task => {
      if (task.plot || task.diagram || task.numberLine) {
        const text = (task.question || task.content || '').replace(/\n/g, ' ');
        console.log(`${task.id} [${t.id}] | plot: ${!!task.plot}, diag: ${!!task.diagram}, nl: ${!!task.numberLine} | text: ${text.slice(0, 75)}`);
      }
    });
  });
});
