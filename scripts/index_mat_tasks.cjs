const fs = require('fs');
const path = require('path');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));
const matDir = 'c:/Users/mateu/Downloads/mat';

// Let's create an index of all CKE tasks in matDir
const matCkeTasks = [];

for (let i = 1; i <= 15; i++) {
  const fPath = path.join(matDir, `curriculum_dzial_${i}.json`);
  if (!fs.existsSync(fPath)) continue;
  const data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  const topic = data.topic || (data.topics && data.topics[0]);
  (topic.lessons || []).forEach(l => {
    (l.tasks || []).forEach(t => {
      const s = t.source || t.badge || '';
      if (/matura\s+(?:maj|czerwiec|sierpi|grudzi)|informator|arkusz pokazowy/i.test(s)) {
        matCkeTasks.push({
          dzialNum: i,
          topicTitle: topic.title,
          lessonTitle: l.title,
          task: t
        });
      }
    });
  });
}

console.log('Total CKE tasks indexed from mat/:', matCkeTasks.length);

// Let's see some tasks for different areas:
// Planimetria, Stereometria, Ciągi, Geometria analityczna, Kombinatoryka, Prawdopodobieństwo, Statystyka, Optymalizacja
const dzialSummary = {};
matCkeTasks.forEach(item => {
  dzialSummary[item.dzialNum] = (dzialSummary[item.dzialNum] || 0) + 1;
});
console.log('CKE tasks per dzial in mat/:', dzialSummary);
