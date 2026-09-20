/**
 * compile_cke_tasks.cjs
 * 
 * Konsoliduje i normalizuje wszystkie oficjalne zadania CKE z:
 * 1. seed/curriculum/curriculum_matematyka.json (zadania z etykietą CKE/Matura)
 * 2. seed/curriculum/zadania_matura.json (arkusze egzaminacyjne)
 * 
 * Wynik: seed/curriculum/cke_tasks_matematyka.json oraz zaktualizowany seed/curriculum/zadania_matura.json
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const MATURA_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'zadania_matura.json');
const OUTPUT_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'cke_tasks_matematyka.json');

function extractYear(src) {
  const match = src.match(/20\d\d/);
  return match ? parseInt(match[0], 10) : 2024;
}

function extractSession(src) {
  const lower = src.toLowerCase();
  if (lower.includes('maj')) return 'Maj';
  if (lower.includes('czerwiec')) return 'Czerwiec';
  if (lower.includes('sierpień') || lower.includes('sierpien')) return 'Sierpień';
  if (lower.includes('informator')) return 'Informator CKE';
  if (lower.includes('pokazowy')) return 'Arkusz Pokazowy';
  return 'Oficjalne CKE';
}

function normalizeSection(rawSection, topicId) {
  const s = (rawSection || '').toLowerCase();
  if (topicId === 'dzial-1' || s.includes('liczby rzeczywiste') || s.includes('potęg')) return 'Dział 1: Liczby Rzeczywiste';
  if (topicId === 'dzial-2' || s.includes('wyrażenia algebraiczne') || s.includes('wielomian')) return 'Dział 2: Wyrażenia Algebraiczne i Wielomiany';
  if (topicId === 'dzial-3' || s.includes('równania i nierówności') || s.includes('nierówności')) return 'Dział 3: Równania i Nierówności';
  if (topicId === 'dzial-4' || s.includes('własności funkcji') || s.includes('odczytywanie wykresów')) return 'Dział 4: Własności Funkcji i Wykresy';
  if (topicId === 'dzial-5' || s.includes('funkcja liniowa')) return 'Dział 5: Funkcja Liniowa i Układy Równań';
  if (topicId === 'dzial-6' || s.includes('funkcja kwadratowa')) return 'Dział 6: Funkcja Kwadratowa';
  if (topicId === 'dzial-7' || s.includes('ciągi')) return 'Dział 7: Ciągi Liczbowe';
  if (topicId === 'dzial-8' || s.includes('trygonometria')) return 'Dział 8: Trygonometria';
  if (topicId === 'dzial-9' || s.includes('planimetria')) return 'Dział 9: Planimetria';
  if (topicId === 'dzial-10' || s.includes('geometria analityczna')) return 'Dział 10: Geometria Analityczna';
  if (topicId === 'dzial-11' || s.includes('stereometria')) return 'Dział 11: Stereometria';
  if (topicId === 'dzial-12' || s.includes('kombinatoryka')) return 'Dział 12: Kombinatoryka';
  if (topicId === 'dzial-13' || s.includes('prawdopodobieństw')) return 'Dział 13: Rachunek Prawdopodobieństwa';
  if (topicId === 'dzial-14' || s.includes('statystyk')) return 'Dział 14: Statystyka';
  if (topicId === 'dzial-15' || s.includes('optymalizac') || s.includes('modelowanie')) return 'Dział 15: Zadania Optymalizacyjne';

  return 'Dział 1: Liczby Rzeczywiste';
}

function run() {
  console.log('🚀 Rozpoczynam konsolidację bazy zadań CKE...');

  const compiledTasks = [];
  const seenIds = new Set();

  // 1. Przetwarzanie curriculum_matematyka.json
  if (fs.existsSync(CURRICULUM_PATH)) {
    const curr = JSON.parse(fs.readFileSync(CURRICULUM_PATH, 'utf8'));
    let currCount = 0;

    (curr.topics || []).forEach(topic => {
      const topicId = topic.id;
      const topicTitle = topic.title || topic.name || '';
      const sectionName = normalizeSection(topicTitle, topicId);

      (topic.lessons || []).forEach(lesson => {
        (lesson.tasks || []).forEach(task => {
          const src = task.source || task.cke_source || task.badge || '';
          const isCke = /cke|matura|arkusz|informator/i.test(src);

          if (isCke) {
            const taskId = String(task.id);
            if (!seenIds.has(taskId)) {
              seenIds.add(taskId);
              currCount++;

              const content = task.question || task.content || task.math_statement || task.instruction || '';
              const rawOptions = Array.isArray(task.options) 
                ? task.options.map(opt => (typeof opt === 'object' && opt !== null ? (opt.content_latex || opt.text || '') : String(opt)))
                : [];

              let correctAnswer = task.correct_answer || task.correctAnswer || '';
              let isClosed = task.type === 'SINGLE_CHOICE' || (rawOptions.length > 0 && task.type !== 'OPEN_PROOF' && task.type !== 'OPEN_GENERAL');

              // Jeśli to SINGLE_CHOICE z options, wyznacz literę A, B, C, D
              if (rawOptions.length > 0) {
                const optIndex = rawOptions.findIndex(o => o.trim() === String(correctAnswer).trim());
                if (optIndex >= 0) {
                  correctAnswer = String.fromCharCode(65 + optIndex);
                }
              }

              if (task.type === 'TRUE_FALSE') {
                isClosed = true;
                if (!rawOptions.length) {
                  rawOptions.push('PRAWDA', 'FAŁSZ');
                }
                const upper = String(correctAnswer).toUpperCase();
                if (upper.startsWith('P')) correctAnswer = 'A';
                else if (upper.startsWith('F')) correctAnswer = 'B';
              }

              compiledTasks.push({
                id: taskId,
                topicId: topicId,
                section: sectionName,
                type: task.type || (isClosed ? 'SINGLE_CHOICE' : 'OPEN_GENERAL'),
                content: content,
                options: rawOptions,
                correctAnswer: String(correctAnswer),
                points: Number(task.points) || 1,
                isClosed: Boolean(isClosed),
                explanation: task.explanation || task.hints?.level_2 || task.hint || 'Brak oficjalnego komentarza.',
                ckeTrap: task.ckeTrap || task.exam_trap || (task.hint ? `Pułapka CKE: ${task.hint}` : undefined),
                source: src.trim() || 'CKE • Formuła 2023',
                year: extractYear(src),
                session: extractSession(src),
                isCke: true
              });
            }
          }
        });
      });
    });

    console.log(`✓ Wyodrębniono ${currCount} zadań CKE z kurikulum.`);
  }

  // 2. Przetwarzanie zadania_matura.json
  if (fs.existsSync(MATURA_PATH)) {
    const matura = JSON.parse(fs.readFileSync(MATURA_PATH, 'utf8'));
    let maturaCount = 0;

    matura.forEach((task, idx) => {
      const taskId = task.id ? (task.id.startsWith('matura-') ? task.id : `matura-${task.id}`) : `matura-task-${idx}`;
      if (!seenIds.has(taskId)) {
        seenIds.add(taskId);
        maturaCount++;

        const section = task.section || normalizeSection('', task.topicId);
        const src = task.source || 'CKE • Oficjalny arkusz maturalny';

        compiledTasks.push({
          id: taskId,
          examId: task.examId,
          examName: task.examName,
          taskNumber: task.taskNumber,
          topicId: task.topicId || 'dzial-1',
          section: section,
          type: task.type || (task.isClosed ? 'SINGLE_CHOICE' : 'OPEN_GENERAL'),
          content: task.content || '',
          options: Array.isArray(task.options) ? task.options : [],
          correctAnswer: String(task.correctAnswer || 'A'),
          points: Number(task.points) || 1,
          isClosed: task.isClosed !== undefined ? task.isClosed : true,
          explanation: task.explanation || 'Oficjalny klucz odpowiedzi CKE.',
          ckeTrap: task.ckeTrap || (task.explanation ? `Wymóg CKE: ${task.explanation}` : undefined),
          source: src,
          year: task.year || extractYear(src),
          session: task.session || extractSession(src),
          isCke: true
        });
      }
    });

    console.log(`✓ Dołączono ${maturaCount} zadań z oficjalnych arkuszy maturalnych.`);
  }

  console.log(`\n🎉 ŁĄCZNIE SKONSOLIDOWANO: ${compiledTasks.length} ZADAŃ CKE!`);

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(compiledTasks, null, 2), 'utf8');
  console.log(`✓ Zapisano skonsolidowany katalog: ${OUTPUT_PATH}`);
}

run();
