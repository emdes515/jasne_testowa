const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));
const content = fs.readFileSync('src/data/mathVisualRegistry.ts', 'utf8');

// Find all tasks in prod
const taskMap = {};
prod.topics.forEach(t => {
  t.lessons.forEach(l => {
    l.tasks?.forEach(task => {
      taskMap[task.id] = {
        topic: t.id,
        lesson: l.id,
        text: (task.question || task.content || '').trim(),
        hasPlot: !!task.plot,
        hasDiagram: !!task.diagram,
        hasNumberLine: !!task.numberLine
      };
    });
  });
});

// Find TASK_VISUALS keys
const m = content.match(/export const TASK_VISUALS[^{]*\{([\s\S]*?)\n\};/);
if (m) {
  const keys = m[1].match(/['"]([^'"]+)['"](?=\s*:)/g);
  console.log('TASK_VISUALS keys:');
  keys?.forEach(rawK => {
    const k = rawK.replace(/['"]/g, '');
    const inProd = taskMap[k];
    console.log(`Key: ${k} | In prod: ${!!inProd} | Topic: ${inProd?.topic} | Text: ${inProd?.text?.slice(0, 50)}`);
  });
}
