const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));
const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const ckeTasks = ckeData.tasks || ckeData;

// Let's create helper to find official matura tasks
function findOfficial(examKeyword, zadNum) {
  return ckeTasks.find(t => {
    const s = t.source || '';
    const e = t.examName || '';
    return s.toLowerCase().includes(examKeyword.toLowerCase()) && 
           s.toLowerCase().includes(`zad. ${zadNum}`);
  });
}

function findInformator(zadNum) {
  return ckeTasks.find(t => {
    const s = t.source || '';
    return /informator/i.test(s) && (s.includes(`Zad. ${zadNum}`) || s.includes(`zad. ${zadNum}`));
  });
}

console.log('Testing specific lookups:');
console.log('Matura Maj 2024 Zad 4:', findOfficial('Matura Maj 2024', 4)?.source);
console.log('Matura Maj 2023 Zad 15:', findOfficial('Matura Maj 2023', 15)?.source);
console.log('Matura Czerwiec 2024 Zad 20:', findOfficial('Matura Czerwiec 2024', 20)?.source);
console.log('Matura Sierpień 2023 Zad 33:', findOfficial('Matura Sierpień 2023', 33)?.source);
console.log('Matura Maj 2024 Zad 31:', findOfficial('Matura Maj 2024', 31)?.source);
console.log('Informator Zad 43:', findInformator(43)?.source);
