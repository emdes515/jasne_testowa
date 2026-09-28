const fs = require('fs');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

console.log('=== AUDITING ALL TASKS IN PROD ===');
const issues = [];

prod.topics.forEach(tp => {
  tp.lessons.forEach(l => {
    l.tasks.forEach((t, idx) => {
      const q = (t.question || t.content || '');
      const hasVisual = !!(t.plot || t.diagram || t.numberLine);
      
      // Check 1: Does task text explicitly refer to a drawing that is missing?
      if (/na rysunku|z wykresu|na wykresie|na osi liczbowej|przedstawiono wykres|odczytaj z wykresu/i.test(q)) {
        // Is it one where options have drawings, or is it an actual missing diagram?
        const isOptionsNl = Array.isArray(t.options) && t.options.some(opt => opt.numberLine || /⟨|\(|\[/.test(opt.text || ''));
        if (!hasVisual && !isOptionsNl) {
          issues.push({
            type: 'MISSING_DRAWING',
            id: t.id,
            lesson: l.id,
            badge: t.badge,
            question: q.slice(0, 100)
          });
        }
      }

      // Check 2: Does an algebraic task have an unnecessary drawing?
      if (hasVisual) {
        // Is it purely algebraic without reference to drawing?
        if (!/na rysunku|z wykresu|na wykresie|na osi liczbowej|przedstawiono/i.test(q)) {
          issues.push({
            type: 'UNNECESSARY_DRAWING',
            id: t.id,
            lesson: l.id,
            badge: t.badge,
            question: q.slice(0, 100)
          });
        }
      }
    });
  });
});

console.log('Total issues found:', issues.length);
issues.forEach(iss => {
  console.log(`[${iss.type}] ${iss.id} (${iss.lesson}) [${iss.badge}]: ${iss.question}`);
});
