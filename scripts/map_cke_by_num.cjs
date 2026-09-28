const fs = require('fs');

const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const tasks = ckeData.tasks || ckeData;

// Let's print out all tasks from the 6 official sessions with their exact task numbers and questions
const officialExams = [
  'Matura Maj 2024 (Formuła 2023)',
  'Matura Czerwiec 2024 (Formuła 2023)',
  'Matura Sierpień 2024 (Formuła 2023)',
  'Matura Maj 2023 (Formuła 2023)',
  'Matura Czerwiec 2023 (Formuła 2023)',
  'Matura Sierpień 2023 (Formuła 2023)'
];

const examTasks = tasks.filter(t => officialExams.includes(t.examName));

console.log('Exam tasks count:', examTasks.length);

const byTaskNum = {};
examTasks.forEach(t => {
  const m = t.source.match(/Zad\.\s*(\d+(?:\.\d+)?)/i);
  const num = m ? m[1] : 'other';
  byTaskNum[num] = byTaskNum[num] || [];
  byTaskNum[num].push(t);
});

// Let's print numbers 1 to 36
for (let i = 1; i <= 36; i++) {
  const list = byTaskNum[String(i)] || [];
  console.log(`\n=== ZADANIE ${i} (${list.length} exams) ===`);
  list.forEach(t => {
    console.log(`  [${t.source}] [${t.type}, ${t.points}p]: ${(t.content || '').slice(0, 70)}`);
  });
}
