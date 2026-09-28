const fs = require('fs');
const path = require('path');

const prodPath = 'seed/curriculum/curriculum_matematyka.json';
const prod = JSON.parse(fs.readFileSync(prodPath, 'utf8'));

const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const ckeTasks = ckeData.tasks || ckeData;

function sanitizeMath(text) {
  if (typeof text !== 'string') return text;
  return text
    .replace(/\\iff/g, ' \\longleftrightarrow ')
    .replace(/\\implies/g, ' \\longrightarrow ')
    .replace(/\\lor/g, ' \\text{ lub } ')
    .replace(/\\land/g, ' \\text{ oraz } ')
    .replace(/\\forall/g, ' \\text{dla każdego } ')
    .replace(/\\exists/g, ' \\text{istnieje } ')
    .replace(/\\sum/g, ' \\text{suma} ')
    .replace(/\\Sigma/g, ' \\text{suma} ');
}

function getCkeTask(examKey, zadNum) {
  const found = ckeTasks.find(t => {
    const s = t.source || '';
    return s.toLowerCase().includes(examKey.toLowerCase()) && 
           s.toLowerCase().includes(`zad. ${zadNum}`);
  });
  if (!found) {
    throw new Error(`Task not found: ${examKey} Zad. ${zadNum}`);
  }
  return found;
}

function formatAsProdTask(ckeTask, targetId, targetType, pointsOverride) {
  const letters = ['A', 'B', 'C', 'D'];
  const isClosed = targetType === 'SINGLE_CHOICE';
  let formattedOptions = [];

  if (isClosed && Array.isArray(ckeTask.options) && ckeTask.options.length > 0) {
    formattedOptions = ckeTask.options.map((optItem, idx) => {
      const optId = letters[idx] || String(idx);
      const isCorrect = optId === ckeTask.correctAnswer;
      const optText = typeof optItem === 'object' && optItem !== null ? (optItem.text || optItem.content_latex || '') : String(optItem);
      return {
        id: optId,
        text: sanitizeMath(optText),
        content_latex: sanitizeMath(optText),
        is_correct: isCorrect
      };
    });
  }

  const cleanQuestion = sanitizeMath(ckeTask.content || ckeTask.question || '');
  const cleanExplanation = sanitizeMath(ckeTask.explanation || '');
  const cleanTrap = sanitizeMath(ckeTask.ckeTrap || '').replace(/^pułapka cke:\s*/i, '');
  const pts = pointsOverride || ckeTask.points || (isClosed ? 1 : 2);

  return {
    id: targetId,
    type: targetType,
    points: pts,
    maxPoints: pts,
    badge: ckeTask.source,
    source_badge: ckeTask.source,
    source: ckeTask.source,
    cke_source: ckeTask.source,
    official_cke: true,
    instruction: isClosed 
      ? 'Wybierz właściwą odpowiedź spośród podanych.'
      : (targetType === 'OPEN_PROOF' ? 'Przeprowadź dowód matematyczny i zapisz uzasadnienie.' : 'Rozwiąż zadanie i zapisz pełne obliczenia.'),
    question: cleanQuestion,
    content: cleanQuestion,
    math_statement: cleanQuestion,
    options: formattedOptions,
    correct_answer: ckeTask.correctAnswer || (isClosed ? 'A' : 'dowód'),
    correctAnswer: ckeTask.correctAnswer || (isClosed ? 'A' : 'dowód'),
    explanation: cleanExplanation,
    ckeTrap: cleanTrap || 'Zwróć uwagę na założenia, dziedzinę oraz poprawność kolejnych kroków.',
    cke_trap: cleanTrap || 'Zwróć uwagę na założenia, dziedzinę oraz poprawność kolejnych kroków.',
    hint_1: 'Zajrzyj do Wybranych Wzorów Matematycznych CKE (Karta Wzorów) dla tego działu.',
    hint_2: cleanTrap || 'Wykonaj obliczenia krok po kroku, sprawdzając warunki początkowe.',
    hints: {
      level_1: 'Zajrzyj do Wybranych Wzorów Matematycznych CKE (Karta Wzorów) dla tego działu.',
      level_2: cleanTrap || 'Wykonaj obliczenia krok po kroku, sprawdzając warunki początkowe.'
    },
    diagram: null,
    plot: null,
    numberLine: null,
    explanationDiagram: null,
    explanationPlot: null,
    explanationNumberLine: null
  };
}

// -------------------------------------------------------------
// REPLACEMENTS MAP FOR LESSONS
// [lessonId]: { task2: [exam, zad], task3: [exam, zad], task5: [exam, zad, type, pts] }
// -------------------------------------------------------------
const REPLACEMENTS = {
  // DZIAŁ 1: Potęgi i pierwiastki
  'lesson-1-1': {
    task2: ['Matura Czerwiec 2023', 2],
    task5: ['Matura Maj 2024', 3, 'OPEN_PROOF', 2]
  },
  'lesson-1-2': {
    task2: ['Matura Sierpień 2024', 2],
    task5: ['Matura Sierpień 2023', 4, 'OPEN_PROOF', 2]
  },
  'lesson-1-3': {
    task2: ['Matura Czerwiec 2024', 2],
    task5: ['Matura Czerwiec 2024', 5, 'OPEN_PROOF', 2]
  },
  'lesson-1-4': {
    task2: ['Matura Maj 2023', 2],
    task5: ['Matura Maj 2023', 3, 'OPEN_PROOF', 2]
  },

  // DZIAŁ 2: Logarytmy
  'lesson-2-1': {
    task2: ['Matura Maj 2023', 4],
    task5: ['Matura Czerwiec 2024', 4, 'OPEN_TASK', 2]
  },
  'lesson-2-2': {
    task2: ['Matura Czerwiec 2024', 3],
    task5: ['Matura Czerwiec 2023', 4, 'OPEN_TASK', 2]
  },
  'lesson-2-3': {
    task2: ['Matura Sierpień 2024', 4],
    task5: ['Matura Sierpień 2024', 3, 'OPEN_PROOF', 2]
  },

  // DZIAŁ 3: Wartość bezwzględna
  'lesson-3-1': {
    task2: ['Matura Maj 2024', 1],
    task5: ['Matura Czerwiec 2023', 1, 'OPEN_TASK', 2]
  },
  'lesson-3-2': {
    task2: ['Matura Sierpień 2023', 1],
    task5: ['Matura Sierpień 2024', 1, 'OPEN_TASK', 2]
  },
  'lesson-3-3': {
    task2: ['Matura Czerwiec 2024', 1],
    task5: ['Matura Maj 2023', 1, 'OPEN_PROOF', 2]
  },

  // DZIAŁ 4: Wzory skróconego mnożenia i algebra
  'lesson-4-1': {
    task2: ['Matura Maj 2023', 5]
  },
  'lesson-4-2': {
    task2: ['Matura Czerwiec 2024', 4]
  },
  'lesson-4-3': {
    task2: ['Matura Czerwiec 2023', 5]
  },

  // DZIAŁ 5: Nierówności liniowe
  'lesson-5-1': {
    task2: ['Matura Czerwiec 2024', 6]
  },
  'lesson-5-2': {
    task2: ['Matura Maj 2023', 6]
  },
  'lesson-5-3': {
    task2: ['Matura Sierpień 2024', 5]
  },

  // DZIAŁ 6: Równania w postaci iloczynowej
  'lesson-6-1': {
    task2: ['Matura Maj 2024', 7],
    task5: ['Matura Maj 2024', 9, 'OPEN_TASK', 3]
  },
  'lesson-6-2': {
    task2: ['Matura Czerwiec 2024', 7],
    task5: ['Matura Czerwiec 2024', 10, 'OPEN_TASK', 3]
  },
  'lesson-6-3': {
    task2: ['Matura Sierpień 2024', 6],
    task5: ['Matura Maj 2023', 9, 'OPEN_TASK', 3]
  },

  // DZIAŁ 7: Równania i wyrażenia wymierne
  'lesson-7-1': {
    task2: ['Matura Czerwiec 2024', 7]
  },
  'lesson-7-2': {
    task2: ['Matura Sierpień 2023', 7]
  },
  'lesson-7-3': {
    task2: ['Matura Maj 2023', 8]
  },

  // DZIAŁ 8: Nierówności kwadratowe
  'lesson-8-1': {
    task2: ['Matura Maj 2024', 11]
  },
  'lesson-8-2': {
    task2: ['Matura Czerwiec 2024', 8]
  },
  'lesson-8-3': {
    task2: ['Matura Sierpień 2024', 8],
    task5: ['Matura Czerwiec 2023', 8, 'OPEN_TASK', 2]
  },
  'lesson-8-4': {
    task2: ['Matura Maj 2023', 11]
  },

  // DZIAŁ 9: Odczytywanie informacji z wykresu
  'lesson-9-1': {
    task2: ['Matura Maj 2024', 12]
  },
  'lesson-9-2': {
    task2: ['Matura Maj 2023', 10]
  },
  'lesson-9-3': {
    task2: ['Matura Sierpień 2024', 8]
  },
  'lesson-9-4': {
    task2: ['Matura Sierpień 2023', 10]
  },

  // DZIAŁ 10: Funkcja liniowa
  'lesson-10-1': {
    task2: ['Matura Sierpień 2024', 10]
  },
  'lesson-10-2': {
    task2: ['Matura Czerwiec 2023', 26]
  },
  'lesson-10-3': {
    task2: ['Matura Maj 2024', 23]
  },
  'lesson-10-4': {
    task2: ['Matura Maj 2023', 23]
  },

  // DZIAŁ 11: Ciągi liczbowe
  'lesson-11-1': {
    task2: ['Matura Czerwiec 2024', 15],
    task5: ['Matura Maj 2024', 17, 'OPEN_TASK', 3]
  },
  'lesson-11-2': {
    task2: ['Matura Sierpień 2024', 15]
  },
  'lesson-11-3': {
    task2: ['Matura Czerwiec 2024', 16],
    task3: ['Matura Sierpień 2024', 16]
  },

  // DZIAŁ 12: Funkcja kwadratowa
  'lesson-12-1': {
    task2: ['Matura Czerwiec 2024', 13]
  },
  'lesson-12-2': {
    task2: ['Matura Sierpień 2024', 13],
    task5: ['Matura Czerwiec 2023', 14, 'OPEN_TASK', 2]
  },
  'lesson-12-3': {
    task2: ['Matura Sierpień 2023', 14],
    task5: ['Matura Maj 2023', 14, 'OPEN_TASK', 2]
  },
  'lesson-12-4': {
    task2: ['Matura Maj 2023', 13],
    task5: ['Matura Sierpień 2023', 33, 'OPEN_TASK', 4]
  },

  // DZIAŁ 13: Przekształcenia wykresów
  'lesson-13-1': {
    task2: ['Matura Czerwiec 2024', 12],
    task3: ['Matura Sierpień 2024', 12]
  },
  'lesson-13-2': {
    task2: ['Matura Czerwiec 2023', 13],
    task3: ['Matura Sierpień 2023', 12],
    task5: ['Matura Czerwiec 2023', 13, 'OPEN_TASK', 2]
  },
  'lesson-13-3': {
    task2: ['Matura Maj 2023', 10],
    task3: ['Matura Maj 2024', 12],
    task5: ['Matura Sierpień 2024', 12, 'OPEN_TASK', 2]
  },

  // DZIAŁ 14: Trygonometria
  'lesson-14-1': {
    task2: ['Matura Czerwiec 2024', 18],
    task3: ['Matura Maj 2024', 16]
  },
  'lesson-14-2': {
    task3: ['Matura Maj 2023', 19],
    task5: ['Matura Czerwiec 2024', 19, 'OPEN_TASK', 2]
  },
  'lesson-14-3': {
    task2: ['Matura Czerwiec 2023', 19],
    task3: ['Matura Maj 2023', 20],
    task5: ['Matura Czerwiec 2023', 19, 'OPEN_TASK', 2]
  },
  'lesson-14-4': {
    task2: ['Matura Sierpień 2023', 20],
    task3: ['Matura Czerwiec 2023', 20],
    task5: ['Matura Czerwiec 2023', 20, 'OPEN_TASK', 2]
  },

  // DZIAŁ 15: Planimetria – Trójkąty
  'lesson-15-1': {
    task2: ['Matura Czerwiec 2023', 21],
    task3: ['Matura Maj 2024', 20]
  },
  'lesson-15-2': {
    task2: ['Matura Czerwiec 2024', 20],
    task3: ['Matura Sierpień 2023', 23],
    task5: ['Matura Czerwiec 2024', 20, 'OPEN_TASK', 2]
  },
  'lesson-15-3': {
    task2: ['Matura Czerwiec 2024', 21],
    task5: ['Matura Maj 2023', 22, 'OPEN_TASK', 2]
  },

  // DZIAŁ 16: Planimetria – Czworokąty i okrąg
  'lesson-16-1': {
    task2: ['Matura Czerwiec 2024', 22],
    task3: ['Matura Czerwiec 2023', 25],
    task5: ['Matura Sierpień 2023', 24, 'OPEN_TASK', 2]
  },
  'lesson-16-2': {
    task3: ['Matura Czerwiec 2023', 23],
    task5: ['Matura Sierpień 2023', 22, 'OPEN_TASK', 2]
  },
  'lesson-16-3': {
    task2: ['Matura Maj 2023', 23],
    task3: ['Matura Sierpień 2024', 22],
    task5: ['Matura Maj 2024', 24, 'OPEN_TASK', 2]
  },

  // DZIAŁ 17: Geometria analityczna
  'lesson-17-1': {
    task2: ['Matura Czerwiec 2023', 27],
    task3: ['Matura Czerwiec 2023', 28],
    task5: ['Matura Sierpień 2024', 23, 'OPEN_TASK', 2]
  },
  'lesson-17-2': {
    task2: ['Matura Maj 2024', 23],
    task5: ['Matura Czerwiec 2024', 24, 'OPEN_TASK', 4]
  },
  'lesson-17-3': {
    task3: ['Matura Sierpień 2023', 26],
    task5: ['Matura Sierpień 2024', 23, 'OPEN_TASK', 2]
  },

  // DZIAŁ 18: Stereometria
  'lesson-18-1': {
    task3: ['Matura Czerwiec 2024', 26],
    task5: ['Matura Maj 2023', 25, 'OPEN_TASK', 2]
  },
  'lesson-18-2': {
    task2: ['Matura Maj 2024', 26],
    task3: ['Matura Czerwiec 2024', 25],
    task5: ['Matura Maj 2023', 26, 'OPEN_TASK', 4]
  },
  'lesson-18-3': {
    task2: ['Matura Czerwiec 2024', 27],
    task3: ['Matura Maj 2023', 27],
    task5: ['Matura Czerwiec 2024', 27, 'OPEN_TASK', 2]
  },

  // DZIAŁ 19: Kombinatoryka i prawdopodobieństwo
  'lesson-19-1': {
    task2: ['Matura Maj 2024', 27],
    task3: ['Matura Maj 2023', 28],
    task5: ['Matura Czerwiec 2024', 29, 'OPEN_TASK', 2]
  },
  'lesson-19-2': {
    task2: ['Matura Czerwiec 2024', 30],
    task3: ['Matura Sierpień 2023', 30],
    task5: ['Matura Maj 2024', 30, 'OPEN_TASK', 2]
  },
  'lesson-19-3': {
    task2: ['Matura Sierpień 2024', 29],
    task3: ['Matura Sierpień 2023', 31],
    task5: ['Matura Czerwiec 2024', 31, 'OPEN_TASK', 2]
  },

  // DZIAŁ 20: Statystyka
  'lesson-20-1': {
    task2: ['Matura Maj 2024', 28],
    task3: ['Matura Czerwiec 2024', 28],
    task5: ['Matura Maj 2024', 28, 'OPEN_TASK', 2]
  },
  'lesson-20-2': {
    task2: ['Matura Maj 2024', 29],
    task3: ['Matura Sierpień 2024', 28],
    task5: ['Matura Maj 2023', 29, 'OPEN_TASK', 2]
  },
  'lesson-20-3': {
    task2: ['Matura Sierpień 2023', 32],
    task3: ['Matura Maj 2023', 29],
    task5: ['Matura Sierpień 2024', 28, 'OPEN_TASK', 2]
  },

  // DZIAŁ 21: Optymalizacja
  'lesson-21-1': {
    task2: ['Matura Sierpień 2024', 30],
    task3: ['Matura Sierpień 2024', 30],
    task5: ['Matura Maj 2024', 31, 'OPEN_TASK', 4]
  },
  'lesson-21-2': {
    task2: ['Matura Maj 2024', 31],
    task3: ['Matura Maj 2024', 31],
    task5: ['Matura Sierpień 2024', 30, 'OPEN_TASK', 3]
  },
  'lesson-21-3': {
    task2: ['Matura Sierpień 2023', 33],
    task3: ['Matura Sierpień 2023', 33],
    task5: ['Matura Sierpień 2023', 33, 'OPEN_TASK', 4]
  }
};

// -------------------------------------------------------------
// EXECUTE REPLACEMENTS
// -------------------------------------------------------------
let replacedT2 = 0;
let replacedT3 = 0;
let replacedT5 = 0;

prod.topics.forEach(t => {
  t.lessons.forEach(l => {
    const repl = REPLACEMENTS[l.id];
    if (repl) {
      if (repl.task2) {
        const [exam, zad] = repl.task2;
        const ckeT = getCkeTask(exam, zad);
        l.tasks[1] = formatAsProdTask(ckeT, l.tasks[1].id, 'SINGLE_CHOICE', 1);
        replacedT2++;
      }
      if (repl.task3) {
        const [exam, zad] = repl.task3;
        const ckeT = getCkeTask(exam, zad);
        l.tasks[2] = formatAsProdTask(ckeT, l.tasks[2].id, 'SINGLE_CHOICE', 1);
        replacedT3++;
      }
      if (repl.task5) {
        const [exam, zad, type, pts] = repl.task5;
        const ckeT = getCkeTask(exam, zad);
        l.tasks[4] = formatAsProdTask(ckeT, l.tasks[4].id, type, pts);
        replacedT5++;
      }
    }
  });
});

console.log(`Replaced: T2=${replacedT2}, T3=${replacedT3}, T5=${replacedT5}`);

// -------------------------------------------------------------
// SANITIZE ALL DRAWINGS & LOGIC SYMBOLS ACROSS ALL TOPICS
// -------------------------------------------------------------
let sanitizedDrawings = 0;
let sanitizedLatexCount = 0;

// Golden Rule exceptions: tasks that MUST retain drawings because text refers to them
const ALLOWED_VISUAL_TASK_IDS = new Set([
  'task-3-3-3', // number line explicitly mentioned in text
  'task-9-1-3', // "Na rysunku przedstawiono wykres"
  'task-9-1-4', // "Na rysunku przedstawiono wykres"
  'task-9-3-4', // "Na rysunku przedstawiono wykres"
  'task-9-4-3', // "Na rysunku przedstawiono wykres"
  'task-12-1-3' // "Na rysunku przedstawiono wykres funkcji kwadratowej"
]);

prod.topics.forEach(t => {
  t.lessons.forEach(l => {
    l.tasks.forEach(task => {
      // 1. Logic symbols sanitization
      ['question', 'content', 'math_statement', 'explanation', 'ckeTrap', 'cke_trap'].forEach(field => {
        if (task[field]) {
          const old = task[field];
          task[field] = sanitizeMath(task[field]);
          if (old !== task[field]) sanitizedLatexCount++;
        }
      });
      if (Array.isArray(task.options)) {
        task.options.forEach(opt => {
          if (opt.text) opt.text = sanitizeMath(opt.text);
          if (opt.content_latex) opt.content_latex = sanitizeMath(opt.content_latex);
        });
      }

      // 2. Visual drawing sanation: remove if purely algebraic / calculation
      if (task.plot || task.diagram || task.numberLine) {
        if (!ALLOWED_VISUAL_TASK_IDS.has(task.id)) {
          task.plot = null;
          task.diagram = null;
          task.numberLine = null;
          sanitizedDrawings++;
        } else {
          // If allowed, ensure question text explicitly references the visual
          if (task.id === 'task-12-1-3') {
            if (!task.question.includes('Na rysunku')) {
              task.question = 'Na rysunku przedstawiono wykres funkcji kwadratowej $f$ w kartezjańskim układzie współrzędnych $(x, y)$. Funkcja kwadratowa $f$ jest określona wzorem:';
              task.content = task.question;
              task.math_statement = task.question;
            }
          }
        }
      }
    });
  });
});

console.log(`Sanitized drawings removed: ${sanitizedDrawings}`);
console.log(`Latex fields sanitized from academic logic symbols: ${sanitizedLatexCount}`);

// Save modified curriculum
fs.writeFileSync(prodPath, JSON.stringify(prod, null, 2), 'utf8');
console.log('Successfully written updated curriculum to', prodPath);
