const fs = require('fs');

const content = fs.readFileSync('src/data/mathVisualRegistry.ts', 'utf8');
const lines = content.split('\n');
console.log('--- TASK_VISUALS / EXPLANATION_VISUALS in mathVisualRegistry.ts ---');
let currentExport = '';
lines.forEach((l, idx) => {
  if (l.includes('export const TASK_VISUALS')) currentExport = 'TASK_VISUALS';
  else if (l.includes('export const TASK_NUMBER_LINES')) currentExport = 'TASK_NUMBER_LINES';
  else if (l.includes('export const EXPLANATION_VISUALS')) currentExport = 'EXPLANATION_VISUALS';
  else if (l.includes('export const GEOMETRIC_ARCHETYPES')) currentExport = 'GEOMETRIC_ARCHETYPES';
  else if (l.includes('export const THEORY_DIAGRAMS')) currentExport = 'THEORY_DIAGRAMS';

  const m = l.match(/^\s*['"](task-[^'"]+)['"]\s*:/);
  if (m) {
    console.log(`[${currentExport}] Line ${idx + 1}: ${m[1]}`);
  }
});
