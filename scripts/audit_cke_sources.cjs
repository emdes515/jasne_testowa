const fs = require('fs');
const path = require('path');

// 1. Load official exam tasks
const examsDir = path.resolve(__dirname, '..', 'seed', 'curriculum', 'exams');
const examFiles = fs.readdirSync(examsDir).filter(f => f.endsWith('.json'));

const officialExamTasks = new Map(); // key: "Maj 2024 • Zad. 7" or similar -> task object

for (const file of examFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(examsDir, file), 'utf8'));
  for (const t of content) {
    // Standardize source key e.g. "Maj 2024 • Zad. 7"
    const session = t.session; // e.g. "Maj", "Czerwiec", "Sierpień"
    const year = t.year;       // e.g. 2024
    const taskNum = t.taskNumber; // e.g. "7"
    const key = `${session} ${year} • Zad. ${taskNum}`;
    officialExamTasks.set(key, t);
  }
}

console.log(`Loaded ${officialExamTasks.size} official CKE exam tasks from 6 exams.`);

// 2. Load Module 1 tasks
const currPath = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const curr = JSON.parse(fs.readFileSync(currPath, 'utf8'));

const module1Tasks = [];
curr.topics.slice(0, 10).forEach(topic => {
  topic.lessons.forEach(lesson => {
    (lesson.tasks || []).forEach(task => {
      module1Tasks.push({
        topicId: topic.id,
        lessonId: lesson.id,
        taskId: task.id,
        source: task.source || '',
        question: task.question || task.content || '',
        options: (task.options || []).map(o => o.text || o),
        correctAnswer: task.correct_answer || task.correctAnswer
      });
    });
  });
});

console.log(`Auditing ${module1Tasks.length} tasks in Module 1...`);

const report = [];

for (const task of module1Tasks) {
  // Check if source matches official pattern: e.g. "Maj 2024 • Zad. 7"
  const match = task.source.match(/^(Maj|Czerwiec|Sierpień|Grudzień|Marzec|Wrzesień)\s+(\d{4})\s*•\s*Zad\.\s*(\d+)/i);
  if (match) {
    const session = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
    const year = match[2];
    const taskNum = match[3];
    const key = `${session} ${year} • Zad. ${taskNum}`;
    
    const official = officialExamTasks.get(key);
    if (!official) {
      report.push({
        status: 'UNKNOWN_EXAM_OR_TASK',
        taskId: task.taskId,
        source: task.source,
        key,
        reason: 'Exam or task number not in the 6 primary official JSONs'
      });
    } else {
      // Compare question contents
      const normTaskQ = task.question.toLowerCase().replace(/[^a-z0-9]/g, '');
      const normOffQ = (official.content || official.question || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // Compute simple overlap / containment
      const matches = normTaskQ.includes(normOffQ.slice(0, 30)) || normOffQ.includes(normTaskQ.slice(0, 30));
      if (!matches) {
        report.push({
          status: 'MISMATCH',
          taskId: task.taskId,
          source: task.source,
          key,
          taskQuestion: task.question.slice(0, 100),
          officialContent: (official.content || '').slice(0, 100),
          officialOptions: official.options
        });
      } else {
        report.push({
          status: 'MATCH',
          taskId: task.taskId,
          source: task.source,
          key
        });
      }
    }
  }
}

const mismatches = report.filter(r => r.status === 'MISMATCH');
const unknown = report.filter(r => r.status === 'UNKNOWN_EXAM_OR_TASK');
const matches = report.filter(r => r.status === 'MATCH');

console.log(`\nRESULTS:`);
console.log(`MATCHES: ${matches.length}`);
console.log(`MISMATCHES: ${mismatches.length}`);
console.log(`UNKNOWN: ${unknown.length}`);

if (mismatches.length > 0) {
  console.log('\n--- MISMATCHES DETAILS ---');
  mismatches.forEach(m => {
    console.log(`\n[${m.taskId}] claimed source: "${m.source}"`);
    console.log(`  Task Q:     ${m.taskQuestion}`);
    console.log(`  Official Q: ${m.officialContent}`);
  });
}
