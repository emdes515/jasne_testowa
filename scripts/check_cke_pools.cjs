const fs = require('fs');
const path = require('path');

const matDir = 'c:/Users/mateu/Downloads/mat';

const mapping = {
  'dzial-1': [ 'curriculum_dzial_1.json' ],
  'dzial-2': [ 'curriculum_dzial_1.json' ],
  'dzial-3': [ 'curriculum_dzial_1.json' ],
  'dzial-4': [ 'curriculum_dzial_2.json' ],
  'dzial-5': [ 'curriculum_dzial_3.json' ],
  'dzial-6': [ 'curriculum_dzial_3.json' ],
  'dzial-7': [ 'curriculum_dzial_3.json' ],
  'dzial-8': [ 'curriculum_dzial_3.json', 'curriculum_matematyka.json' ],
  'dzial-9': [ 'curriculum_dzial_4.json', 'curriculum_matematyka.json' ],
  'dzial-10': [ 'curriculum_dzial_5.json', 'curriculum_matematyka.json' ],
  'dzial-11': [ 'curriculum_dzial_7.json' ],
  'dzial-12': [ 'curriculum_dzial_6.json' ],
  'dzial-13': [ 'curriculum_dzial_4.json' ],
  'dzial-14': [ 'curriculum_dzial_8.json' ],
  'dzial-15': [ 'curriculum_dzial_9.json' ],
  'dzial-16': [ 'curriculum_dzial_9.json' ],
  'dzial-17': [ 'curriculum_dzial_10.json' ],
  'dzial-18': [ 'curriculum_dzial_11.json' ],
  'dzial-19': [ 'curriculum_dzial_12.json', 'curriculum_dzial_13.json' ],
  'dzial-20': [ 'curriculum_dzial_14.json' ],
  'dzial-21': [ 'curriculum_dzial_15.json' ]
};

console.log('=== VERIFYING CKE TASK POOLS FOR ALL 21 DZIAŁY ===');
for (const [dzial, files] of Object.entries(mapping)) {
  let ckeCount = 0;
  for (const f of files) {
    const fPath = path.join(matDir, f);
    if (!fs.existsSync(fPath)) continue;
    const data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
    const topics = data.topics || (data.topic ? [data.topic] : []);
    topics.forEach(tp => {
      (tp.lessons || []).forEach(l => {
        (l.tasks || []).forEach(t => {
          const src = t.source || t.badge || '';
          if (/matura\s+(?:maj|czerwiec|sierpi|grudzi)|informator|arkusz pokazowy/i.test(src)) {
            const exp = t.explanation || '';
            const q = t.question || t.content || '';
            const isJunk = /odpowiedź niepoprawna|albo brak odpowiedzi|0 pkt/i.test(exp)
              || /[\u{1D400}-\u{1D7FF}]/u.test(q);
            if (!isJunk && q.length > 15) {
              ckeCount++;
            }
          }
        });
      });
    });
  }
  console.log(`${dzial}: ${ckeCount} clean CKE tasks available`);
}
