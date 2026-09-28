const fs = require('fs');
const path = require('path');

const matDir = 'c:/Users/mateu/Downloads/mat';
const files = fs.readdirSync(matDir).filter(f => f.startsWith('curriculum_dzial_') && f.endsWith('.json'));

const maturaTasks = [];

files.forEach(f => {
  const data = JSON.parse(fs.readFileSync(path.join(matDir, f), 'utf8'));
  const topic = data.topic || (data.topics && data.topics[0]);
  const lessons = topic ? (topic.lessons || []) : [];
  lessons.forEach(l => {
    (l.tasks || []).forEach(t => {
      const s = (t.source || t.badge || '');
      if (/matura\s+(?:maj|czerwiec|sierpi|grudzi)/i.test(s) || /informator/i.test(s) || /pokazowy/i.test(s)) {
        maturaTasks.push({
          file: f,
          topicId: topic.id,
          lessonId: l.id,
          lessonTitle: l.title,
          id: t.id,
          type: t.type,
          source: t.source,
          badge: t.badge,
          points: t.points,
          hasPlot: !!t.plot,
          hasDiagram: !!t.diagram,
          question: (t.question || t.content || '').slice(0, 80)
        });
      }
    });
  });
});

console.log('Total authentic matura/CKE tasks found in mat/:', maturaTasks.length);
const sources = {};
maturaTasks.forEach(t => {
  sources[t.source] = (sources[t.source] || 0) + 1;
});
console.log('Sources breakdown (first 25):', Object.entries(sources).slice(0, 25));
