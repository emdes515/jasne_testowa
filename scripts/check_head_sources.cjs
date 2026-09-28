const cp = require('child_process');
const data = cp.execSync('git show HEAD:seed/curriculum/curriculum_matematyka.json', { maxBuffer: 50*1024*1024, encoding: 'utf8' });
const head = JSON.parse(data);

const posBadges = [{}, {}, {}, {}, {}];

head.topics.forEach(tp => {
  tp.lessons.forEach(l => {
    l.tasks.forEach((t, i) => {
      const src = t.source || t.badge || '';
      const isMatura = /matura\s+(?:maj|czerwiec|sierpi)/i.test(src);
      const isInformator = /informator|pokazowy/i.test(src);
      const isTrening = /trening|wzorzec|autorsk/i.test(src) || (!isMatura && !isInformator);
      const key = isMatura ? 'Matura' : isInformator ? 'Informator' : 'Trening';
      posBadges[i][key] = (posBadges[i][key] || 0) + 1;
    });
  });
});

posBadges.forEach((b, i) => console.log('HEAD Task ' + (i+1) + ' sources:', b));
