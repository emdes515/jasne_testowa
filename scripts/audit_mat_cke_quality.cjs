const fs = require('fs');
const path = require('path');

const matDir = 'c:/Users/mateu/Downloads/mat';

console.log('=== AUDITING MAT/*.JSON TASKS QUALITY ===');

let totalCke = 0;
let cleanCke = 0;

for (let i = 1; i <= 15; i++) {
  const fPath = path.join(matDir, `curriculum_dzial_${i}.json`);
  if (!fs.existsSync(fPath)) continue;
  const data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  const topic = data.topic || (data.topics && data.topics[0]);
  (topic.lessons || []).forEach(l => {
    (l.tasks || []).forEach(t => {
      const src = t.source || t.badge || '';
      if (/matura\s+(?:maj|czerwiec|sierpi|grudzi)|informator/i.test(src)) {
        totalCke++;
        const exp = t.explanation || '';
        const q = t.question || t.content || '';
        const isJunk = /odpowiedź niepoprawna|albo brak odpowiedzi|0 pkt/i.test(exp)
          || /[\u{1D400}-\u{1D7FF}]/u.test(q)
          || /jeżeli zdający|otrzymuje 0 punktów/i.test(exp);
        if (!isJunk && q.length > 20 && exp.length > 20) {
          cleanCke++;
        }
      }
    });
  });
}

console.log(`Total CKE in mat/dzial_*.json: ${totalCke}, Clean & ready: ${cleanCke}`);
