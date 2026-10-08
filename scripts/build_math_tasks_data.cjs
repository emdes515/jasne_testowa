const fs = require('fs');
const path = require('path');

const EXAMS_DIR = path.resolve(__dirname, '..', 'seed', 'curriculum', 'exams');
const OUT_FILE = path.resolve(__dirname, '..', 'src', 'data', 'math', 'allMathTasks.ts');

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });

const files = [
  'matura-maj-2024.json',
  'matura-czerwiec-2024.json',
  'matura-sierpien-2024.json',
  'matura-maj-2023.json',
  'matura-czerwiec-2023.json',
  'matura-sierpien-2023.json'
];

const allTasks = [];

for (const file of files) {
  const filePath = path.join(EXAMS_DIR, file);
  if (!fs.existsSync(filePath)) continue;
  const list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  for (const t of list) {
    // Map topicId to standard 'dzial-1' .. 'dzial-15'
    let topicId = t.topicId || 'dzial-1';
    if (!topicId.startsWith('dzial-')) {
      const m = String(t.section || '').match(/Dział\s*(\d+)/i) || String(topicId).match(/(\d+)/);
      topicId = m ? `dzial-${m[1]}` : 'dzial-1';
    }

    // Determine type
    const rawType = String(t.type || 'SINGLE_CHOICE').toUpperCase();
    let type = 'SINGLE_CHOICE';
    if (rawType.includes('PROOF')) type = 'OPEN_PROOF';
    else if (rawType.includes('CALCULATION') || rawType.includes('OPEN')) type = 'OPEN_CALCULATION';
    else if (rawType.includes('NUMERIC')) type = 'NUMERIC_INPUT';
    else if (rawType.includes('TRUE_FALSE')) type = 'TRUE_FALSE';
    else if (rawType.includes('TWO_PART')) type = 'TWO_PART';

    // Normalize options
    let options = [];
    if (Array.isArray(t.options)) {
      options = t.options.map((o, idx) => {
        if (typeof o === 'string') {
          const letter = String.fromCharCode(65 + idx);
          return { id: letter, text: o, is_correct: false };
        }
        return {
          id: o.id || String.fromCharCode(65 + idx),
          text: o.text || '',
          is_correct: Boolean(o.is_correct || o.isCorrect),
          numberLine: o.numberLine || undefined
        };
      });
    }

    allTasks.push({
      id: t.id,
      topicId,
      sectionTitle: t.section || 'Dział tematyczny',
      taskNumber: t.taskNumber || '',
      type,
      content: t.content || '',
      options: options.length > 0 ? options : undefined,
      correct_answer: t.correct_answer || t.correctAnswer || (options.find(o => o.is_correct)?.id || 'A'),
      explanation: t.explanation || t.scoring_key || '',
      matura_tip: t.matura_tip || t.examinerTip || 'Zwróć uwagę na założenia i dziedzinę wyrażenia.',
      points: Number(t.points) || 1,
      sourceYear: t.examName || file.replace('.json', '')
    });
  }
}

console.log(`Aggregated ${allTasks.length} authentic CKE math tasks.`);

const fileContent = `import { MathTask } from '../../types/mathTypes';

export const ALL_MATH_TASKS: MathTask[] = ${JSON.stringify(allTasks, null, 2)};
`;

fs.writeFileSync(OUT_FILE, fileContent, 'utf-8');
console.log(`Generated: ${OUT_FILE}`);
