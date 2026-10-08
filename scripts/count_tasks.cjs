const fs = require('fs');
const path = require('path');

function countTasks() {
  console.log('=== RAPORT LICZBY ZADAŃ W BAZIE JASNE ===\n');

  // 1. Egzaminy CKE (seed/curriculum/exams/*.json)
  const examsDir = 'seed/curriculum/exams';
  let ckeExamTasksTotal = 0;
  const examBreakdown = {};
  if (fs.existsSync(examsDir)) {
    const files = fs.readdirSync(examsDir).filter(f => f.endsWith('.json'));
    for (const f of files) {
      const data = JSON.parse(fs.readFileSync(path.join(examsDir, f), 'utf-8'));
      examBreakdown[f] = data.length;
      ckeExamTasksTotal += data.length;
    }
  }

  // 2. allMathTasks.ts (zasilające Bazy Zadań w MathStudyHub)
  const mathTasksTs = 'src/data/math/allMathTasks.ts';
  let allMathTasksCount = 0;
  if (fs.existsSync(mathTasksTs)) {
    const content = fs.readFileSync(mathTasksTs, 'utf-8');
    const matches = content.match(/"id":/g);
    allMathTasksCount = matches ? matches.length : 0;
  }

  // 3. curriculum_matematyka.json (Lekcje kursu matematyki)
  const curMath = 'seed/curriculum/curriculum_matematyka.json';
  let curMathTasks = 0;
  let curMathLessons = 0;
  let curMathTopics = 0;
  if (fs.existsSync(curMath)) {
    const data = JSON.parse(fs.readFileSync(curMath, 'utf-8'));
    curMathTopics = (data.topics || []).length;
    for (const top of data.topics || []) {
      curMathLessons += (top.lessons || []).length;
      for (const les of top.lessons || []) {
        curMathTasks += (les.tasks || []).length;
      }
    }
  }

  // 4. Język Polski (src/data/polish/)
  const polishFiles = [
    { file: 'src/data/polish/polishTasksPart1.ts', name: 'Część 1 (Język w użyciu)' },
    { file: 'src/data/polish/polishTasksPart2.ts', name: 'Część 2 (Test historycznoliteracki)' },
    { file: 'src/data/polish/polishTasksPart3.ts', name: 'Część 3 (Wypracowanie)' }
  ];
  let totalPolishTasks = 0;
  const polishBreakdown = {};
  for (const pf of polishFiles) {
    if (fs.existsSync(pf.file)) {
      const c = fs.readFileSync(pf.file, 'utf-8');
      const m = c.match(/id:\s*['"][^'"]+['"]/g);
      const cnt = m ? m.length : 0;
      polishBreakdown[pf.name] = cnt;
      totalPolishTasks += cnt;
    }
  }

  // 5. Pobrane oficjalne arkusze PDF (baza_cke_matematyka)
  let downloadedExamsCount = 0;
  let manifestItemsCount = 0;
  const manifestFile = 'baza_cke_matematyka/manifest.json';
  if (fs.existsSync(manifestFile)) {
    const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf-8'));
    manifestItemsCount = manifest.length;
    downloadedExamsCount = manifest.filter(m => m.type === 'arkusz').length;
  }

  console.log('1. MATEMATYKA - BAZA ZADAŃ (MathStudyHub Task Browser):');
  console.log(`   Łącznie: ${allMathTasksCount} autentycznych zadań z oficjalnych matur CKE Formuła 2023`);
  for (const [exam, count] of Object.entries(examBreakdown)) {
    console.log(`   - ${exam.replace('.json', '')}: ${count} zadań`);
  }

  console.log('\n2. MATEMATYKA - KURS LEKCYJNY (curriculum_matematyka.json):');
  console.log(`   - Działów: ${curMathTopics}`);
  console.log(`   - Lekcji: ${curMathLessons}`);
  console.log(`   - Zadań w mikrolekcjach: ${curMathTasks} zadań`);

  console.log('\n3. JĘZYK POLSKI - BAZA ZADAŃ (PolishStudyHub):');
  console.log(`   Łącznie: ${totalPolishTasks} zadań`);
  for (const [part, count] of Object.entries(polishBreakdown)) {
    console.log(`   - ${part}: ${count} zadań`);
  }

  console.log('\n4. POBRANE OFICJALNE DOKUMENTY CKE (baza_cke_matematyka):');
  console.log(`   - Wszystkich plików PDF: ${manifestItemsCount}`);
  console.log(`   - W tym pełnych arkuszy maturalnych z zadaniami: ${downloadedExamsCount} arkuszy (roczniki 2022-2026, PP i PR)`);
}

countTasks();
