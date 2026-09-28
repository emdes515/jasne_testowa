const fs = require('fs');

const data = JSON.parse(fs.readFileSync('c:/Users/mateu/Downloads/mat/curriculum_matematyka.json', 'utf8'));

let totalTasks = 0;
let cleanTasks = 0;
let junkTasks = 0;

data.topics.forEach(tp => {
  tp.lessons.forEach(l => {
    l.tasks.forEach(t => {
      totalTasks++;
      const exp = t.explanation || '';
      const q = t.question || t.content || '';
      const isJunk = /odpowiedź niepoprawna|albo brak odpowiedzi|0 pkt/i.test(exp)
        || /[\u{1D400}-\u{1D7FF}]/u.test(q)
        || /jeżeli zdający|otrzymuje 0 punktów/i.test(exp);
      if (isJunk) {
        junkTasks++;
      } else {
        cleanTasks++;
      }
    });
  });
});

console.log(`mat/curriculum_matematyka.json: total=${totalTasks}, clean=${cleanTasks}, junk=${junkTasks}`);
