const fs = require('fs');
const path = require('path');

const prodPath = 'seed/curriculum/curriculum_matematyka.json';
const prod = JSON.parse(fs.readFileSync(prodPath, 'utf8'));

const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const ckeTasks = ckeData.tasks || ckeData;

// Index of CKE tasks by unique source or ID
const ckeMap = {};
ckeTasks.forEach(t => {
  if (t.source) ckeMap[t.source.toLowerCase().trim()] = t;
  if (t.id) ckeMap[t.id.toLowerCase().trim()] = t;
});

console.log('Total CKE tasks indexed:', Object.keys(ckeMap).length);
