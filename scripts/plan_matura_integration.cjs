const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));
const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const ckeTasks = ckeData.tasks || ckeData;

// Let's index all official matura tasks
const officialExams = [
  'Matura Maj 2024 (Formuła 2023)',
  'Matura Czerwiec 2024 (Formuła 2023)',
  'Matura Sierpień 2024 (Formuła 2023)',
  'Matura Maj 2023 (Formuła 2023)',
  'Matura Czerwiec 2023 (Formuła 2023)',
  'Matura Sierpień 2023 (Formuła 2023)'
];

const officialTasks = ckeTasks.filter(t => officialExams.includes(t.examName));

console.log('Indexed official matura tasks:', officialTasks.length);

// Also index Informator tasks with zad number
const informatorTasks = ckeTasks.filter(t => t.source && /informator.*zad/i.test(t.source));
console.log('Indexed Informator CKE tasks:', informatorTasks.length);
