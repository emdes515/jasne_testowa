const fs = require('fs');
const path = require('path');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));
const matDir = 'c:/Users/mateu/Downloads/mat';

console.log('=== PROD TOPICS ===');
prod.topics.forEach(t => {
  console.log(`${t.id}: ${t.title} (${t.lessons.length} lessons)`);
  t.lessons.forEach(l => {
    console.log(`   ${l.id}: ${l.title}`);
  });
});

console.log('\n=== MAT DZIAL FILES ===');
for (let i = 1; i <= 15; i++) {
  const file = `curriculum_dzial_${i}.json`;
  const fPath = path.join(matDir, file);
  if (fs.existsSync(fPath)) {
    const data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
    const topic = data.topic || (data.topics && data.topics[0]);
    console.log(`${file} -> ${topic?.id}: ${topic?.title} (${topic?.lessons?.length} lessons)`);
  }
}
