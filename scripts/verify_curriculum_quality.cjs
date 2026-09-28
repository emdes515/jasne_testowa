const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

console.log('=== VERIFYING CURRICULUM QUALITY ===\n');

let totalTasks = 0;
let forbiddenSymbols = 0;
const forbiddenRegex = /\\(iff|implies|lor|land|forall|exists|sum|Sigma)\b/g;

const positionTypes = [new Set(), new Set(), new Set(), new Set(), new Set()];
const positionBadges = [{}, {}, {}, {}, {}];

const visualTasks = [];

prod.topics.forEach(t => {
  t.lessons.forEach(l => {
    if (l.tasks.length !== 5) {
      console.error(`ERROR: Lesson ${l.id} has ${l.tasks.length} tasks instead of 5!`);
    }
    l.tasks.forEach((task, idx) => {
      totalTasks++;
      positionTypes[idx].add(task.type);

      const src = task.source || task.badge || 'MISSING';
      const isMatura = /matura\s+(?:maj|czerwiec|sierpi)/i.test(src);
      const isInformator = /informator|pokazowy/i.test(src);
      const category = isMatura ? 'Matura' : isInformator ? 'Informator' : 'Trening/Autorskie';
      positionBadges[idx][category] = (positionBadges[idx][category] || 0) + 1;

      // Check forbidden symbols
      const allText = JSON.stringify(task);
      const matches = allText.match(forbiddenRegex);
      if (matches) {
        forbiddenSymbols += matches.length;
        console.warn(`[${l.id}] Task ${idx+1} (${task.id}) has forbidden symbols:`, matches);
      }

      // Check visuals
      if (task.plot || task.diagram || task.numberLine) {
        visualTasks.push({
          id: task.id,
          lesson: l.id,
          topic: t.id,
          plot: !!task.plot,
          diagram: !!task.diagram,
          numberLine: !!task.numberLine,
          text: (task.question || task.content || '').slice(0, 60)
        });
      }
    });
  });
});

console.log(`Total tasks verified: ${totalTasks}`);
console.log('Position task types:');
positionTypes.forEach((types, idx) => console.log(`  Task ${idx+1}:`, Array.from(types)));

console.log('\nPosition sources breakdown:');
positionBadges.forEach((counts, idx) => console.log(`  Task ${idx+1}:`, counts));

console.log(`\nForbidden academic logic symbols count: ${forbiddenSymbols}`);

console.log(`\nRemaining tasks with visuals (${visualTasks.length}):`);
visualTasks.forEach(vt => console.log(`  ${vt.id} [${vt.lesson}] [plot:${vt.plot}, diag:${vt.diagram}, nl:${vt.numberLine}]: ${vt.text}`));
