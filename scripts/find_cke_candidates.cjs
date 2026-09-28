const fs = require('fs');

const ckeData = JSON.parse(fs.readFileSync('seed/curriculum/cke_tasks_matematyka.json', 'utf8'));
const tasks = ckeData.tasks || ckeData;

function findTasks(regex, limit = 5) {
  return tasks.filter(t => {
    const s = `${t.topicId} ${t.section} ${t.content} ${t.explanation}`;
    return regex.test(s);
  }).map(t => ({
    id: t.id,
    topicId: t.topicId,
    source: t.source,
    type: t.type,
    points: t.points,
    content: (t.content || '').slice(0, 70)
  })).slice(0, limit);
}

console.log('--- Trygonometria ---');
console.log(findTasks(/trygonometr|sinus|cosinus|tangens/i, 6));

console.log('\n--- Planimetria: trójkąty / podobieństwo / Tales ---');
console.log(findTasks(/podobieństw|tales|trójkąt.*kąt|przeciwprostokątn/i, 6));

console.log('\n--- Planimetria: czworokąty / okrąg ---');
console.log(findTasks(/trapez|romb|równoległobok|kąt wpisan|styczna.*okrąg/i, 6));

console.log('\n--- Geometria analityczna ---');
console.log(findTasks(/środek odcinka|długość odcinka|okrąg o równaniu|prosta.*prostopadła/i, 6));

console.log('\n--- Stereometria ---');
console.log(findTasks(/graniastosłup|ostrosłup|stożek|walec|kula|przekątna.*prostopadłościan/i, 6));

console.log('\n--- Kombinatoryka / Prawdopodobieństwo ---');
console.log(findTasks(/prawdopodobieństw|reguła mnożenia|losujemy|kostk|urn/i, 6));

console.log('\n--- Statystyka ---');
console.log(findTasks(/średnia arytmetyczna|mediana|odchylenie standardowe|wariancja/i, 6));

console.log('\n--- Optymalizacja ---');
console.log(findTasks(/największ.*pole|najmniejsz.*koszt|optymal|ogrodzeni/i, 6));
