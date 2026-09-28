const fs = require('fs');
const path = require('path');
const cp = require('child_process');

console.log('=== STARTING REMEDIATION OF CURRICULUM AND VISUALS ===');

// 1. Load HEAD version of curriculum
const headData = cp.execSync('git show HEAD:seed/curriculum/curriculum_matematyka.json', { maxBuffer: 50*1024*1024, encoding: 'utf8' });
const prod = JSON.parse(headData);

// 2. Load mat/ datasets
const matDir = 'c:/Users/mateu/Downloads/mat';
const matMainPath = path.join(matDir, 'curriculum_matematyka.json');
const matMain = fs.existsSync(matMainPath) ? JSON.parse(fs.readFileSync(matMainPath, 'utf8')) : null;

const matDzialTasks = {};
for (let i = 1; i <= 15; i++) {
  const p = path.join(matDir, `curriculum_dzial_${i}.json`);
  if (!fs.existsSync(p)) continue;
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  const topic = d.topic || (d.topics && d.topics[0]);
  matDzialTasks[i] = [];
  (topic.lessons || []).forEach(l => {
    (l.tasks || []).forEach(t => {
      matDzialTasks[i].push({
        lessonId: l.id,
        lessonTitle: l.title,
        task: t
      });
    });
  });
}

function sanitizeMath(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/\\iff\b/g, ' \\longleftrightarrow ')
    .replace(/\\implies\b/g, ' \\longrightarrow ')
    .replace(/\\lor\b/g, ' \\text{ lub } ')
    .replace(/\\land\b/g, ' \\text{ oraz } ')
    .replace(/\\forall\b/g, ' \\text{dla każdego } ')
    .replace(/\\exists\b/g, ' \\text{istnieje } ')
    .replace(/\\sum\b/g, ' \\text{suma} ')
    .replace(/\\Sigma\b/g, ' \\text{suma} ')
    .replace(/⟹/g, ' \\longrightarrow ')
    .replace(/⟺/g, ' \\longleftrightarrow ')
    .replace(/∧/g, ' \\text{ oraz } ')
    .replace(/∨/g, ' \\text{ lub } ')
    .replace(/∀/g, ' \\text{dla każdego } ')
    .replace(/∃/g, ' \\text{istnieje } ')
    .replace(/∑/g, ' \\text{suma} ');
}

// Clean unicode math chars like 𝒏, 𝟐, etc.
function cleanUnicodeMath(text) {
  if (typeof text !== 'string') return text;
  // Map mathematical bold / italic letters & digits to standard ascii
  return text.normalize('NFKD');
}

// Clean task fields
function cleanTask(t) {
  const fields = ['question', 'content', 'math_statement', 'explanation', 'ckeTrap', 'cke_trap', 'hint_1', 'hint_2', 'instruction', 'scoring_key', 'officialKey'];
  fields.forEach(f => {
    if (t[f]) {
      t[f] = sanitizeMath(cleanUnicodeMath(t[f]));
    }
  });
  if (t.hints) {
    if (t.hints.level_1) t.hints.level_1 = sanitizeMath(cleanUnicodeMath(t.hints.level_1));
    if (t.hints.level_2) t.hints.level_2 = sanitizeMath(cleanUnicodeMath(t.hints.level_2));
  }
  if (Array.isArray(t.options)) {
    t.options.forEach(opt => {
      if (typeof opt === 'object' && opt !== null) {
        if (opt.text) opt.text = sanitizeMath(cleanUnicodeMath(opt.text));
        if (opt.content_latex) opt.content_latex = sanitizeMath(cleanUnicodeMath(opt.content_latex));
      }
    });
  }
  return t;
}

// Golden rule for drawings:
// Essential tasks that MUST retain visual:
const ESSENTIAL_VISUAL_TASK_IDS = new Set([
  'task-3-3-3',
  'task-9-1-3',
  'task-9-1-4',
  'task-9-3-4',
  'task-9-4-3',
  'task-12-1-3'
]);

let removedVisualsCount = 0;

prod.topics.forEach(tp => {
  tp.lessons.forEach(l => {
    l.tasks.forEach(t => {
      cleanTask(t);
      if (ESSENTIAL_VISUAL_TASK_IDS.has(t.id)) {
        // Keep visual, ensure sanitized
      } else {
        // Remove artificial drawings from algebraic tasks
        if (t.plot || t.diagram || t.numberLine) {
          removedVisualsCount++;
          t.plot = null;
          t.diagram = null;
          t.numberLine = null;
        }
        t.explanationPlot = null;
        t.explanationDiagram = null;
        // only keep explanationNumberLine if present for intervals in dzial-5
        if (tp.id !== 'dzial-5') {
          t.explanationNumberLine = null;
        }
      }
    });
  });
});

console.log(`Removed artificial drawings from ${removedVisualsCount} tasks.`);

// Check how many tasks remain with visuals
const remainingVisuals = [];
prod.topics.forEach(tp => {
  tp.lessons.forEach(l => {
    l.tasks.forEach(t => {
      if (t.plot || t.diagram || t.numberLine) {
        remainingVisuals.push(t.id);
      }
    });
  });
});
console.log('Remaining tasks with visuals (should be 6):', remainingVisuals);
