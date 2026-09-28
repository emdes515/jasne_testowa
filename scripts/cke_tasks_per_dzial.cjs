const fs = require('fs');
const path = require('path');

const matDir = 'c:/Users/mateu/Downloads/mat';

for (let i = 1; i <= 15; i++) {
  const fPath = path.join(matDir, `curriculum_dzial_${i}.json`);
  if (!fs.existsSync(fPath)) continue;
  const data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  const topic = data.topic || (data.topics && data.topics[0]);
  const ckeTasks = [];
  (topic.lessons || []).forEach(l => {
    (l.tasks || []).forEach(t => {
      const s = (t.source || t.badge || '');
      if (/matura\s+(?:maj|czerwiec|sierpi|grudzi)/i.test(s) || (/informator|pokazowy/i.test(s) && /zad/i.test(s))) {
        ckeTasks.push({
          source: t.source,
          badge: t.badge,
          type: t.type,
          points: t.points,
          q: (t.question || t.content || '').slice(0, 60),
          optCount: t.options?.length,
          hasPlot: !!t.plot,
          hasDiagram: !!t.diagram
        });
      }
    });
  });
  console.log(`Dział ${i} (${topic.title}): found ${ckeTasks.length} specific CKE tasks`);
  if (ckeTasks.length > 0) {
    console.log('  Top 3:', ckeTasks.slice(0, 3));
  }
}
