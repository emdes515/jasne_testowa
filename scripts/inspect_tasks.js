const fs = require('fs');

const content = fs.readFileSync('src/data/mathVisualRegistry.ts', 'utf8');
const lines = content.split('\n');
console.log('--- TASK_VISUALS in mathVisualRegistry.ts ---');
lines.forEach((l, idx) => {
  const m = l.match(/^\s*['"](task-[^'"]+)['"]\s*:/);
  if (m) {
    console.log(`Line ${idx + 1}: ${m[1]}`);
  }
});
