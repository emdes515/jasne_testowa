const fs = require('fs');
const cp = require('child_process');

const headData = cp.execSync('git show HEAD:seed/curriculum/curriculum_matematyka.json', { maxBuffer: 50*1024*1024, encoding: 'utf8' });
const head = JSON.parse(headData);

const matData = JSON.parse(fs.readFileSync('c:/Users/mateu/Downloads/mat/curriculum_matematyka.json', 'utf8'));

console.log('=== COMPARING LESSON TITLES FOR DZIAŁ 1-10 ===');
head.topics.slice(0, 10).forEach(tp => {
  const matTp = matData.topics.find(t => t.id === tp.id);
  console.log(`\nTopic ${tp.id} (${tp.title}):`);
  tp.lessons.forEach(l => {
    const matL = matTp ? matTp.lessons.find(ml => ml.id === l.id) : null;
    console.log(`  Prod: ${l.id} - ${l.title}`);
    console.log(`  Mat:  ${matL ? matL.id + ' - ' + matL.title : 'NOT FOUND'}`);
  });
});
