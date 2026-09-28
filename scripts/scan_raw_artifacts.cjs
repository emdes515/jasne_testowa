const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

let rawRubricExplanations = 0;
let unicodeMathChars = 0;
let openWithA = 0;
let rawExaminerTraps = 0;

prod.topics.forEach(tp => {
  tp.lessons.forEach(l => {
    l.tasks.forEach(t => {
      const exp = t.explanation || '';
      const q = t.question || '';
      const trap = t.ckeTrap || '';

      if (/odpowiedź niepoprawna|albo brak odpowiedzi|0 pkt/i.test(exp)) {
        rawRubricExplanations++;
      }
      if (/[\u{1D400}-\u{1D7FF}]/u.test(q)) {
        unicodeMathChars++;
      }
      if ((t.type === 'OPEN_PROOF' || t.type === 'OPEN_TASK') && (t.correctAnswer === 'A' || t.correct_answer === 'A')) {
        openWithA++;
      }
      if (/jeżeli zdający|otrzymuje 0 punktów|zasady oceniania/i.test(trap)) {
        rawExaminerTraps++;
      }
    });
  });
});

console.log('--- RAW SCRAPE ARTIFACTS IN PROD ---');
console.log('Raw rubric in explanations:', rawRubricExplanations);
console.log('Unicode math characters in questions:', unicodeMathChars);
console.log('Open tasks with correctAnswer="A":', openWithA);
console.log('Raw examiner grading rules in ckeTrap:', rawExaminerTraps);
