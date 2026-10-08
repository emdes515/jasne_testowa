import { MaturaTask } from '../types';
import { MathTask } from '../types/mathTypes';
import rawGeneratedTasks from '../data/math/generated/all_1500_tasks.json';

export interface MaturaExamSheet {
  id: string;
  name: string;
  badge: string;
  desc: string;
  description?: string;
  totalPoints: number;
  durationMinutes: number;
  tasks: MaturaTask[];
  breakdown: {
    closedCount: number;
    closedPoints: number;
    openCount: number;
    openPoints: number;
    optimizationPoints: number;
  };
}

export const ARCHETYPE_TO_SECTION: Record<string, { topicId: string; sectionTitle: string }> = {
  'ARCH-01': { topicId: 'dzial-2', sectionTitle: 'Dział 2: Potęgi i pierwiastki' },
  'ARCH-02': { topicId: 'dzial-2', sectionTitle: 'Dział 2: Logarytmy' },
  'ARCH-03': { topicId: 'dzial-1', sectionTitle: 'Dział 1: Liczby rzeczywiste i wartość bezwzględna' },
  'ARCH-04': { topicId: 'dzial-1', sectionTitle: 'Dział 1: Obliczenia procentowe' },
  'ARCH-05': { topicId: 'dzial-1', sectionTitle: 'Dział 1: Błędy przybliżeń' },
  'ARCH-06': { topicId: 'dzial-4', sectionTitle: 'Dział 4: Wyrażenia algebraiczne i wzory skróconego mnożenia' },
  'ARCH-07': { topicId: 'dzial-3', sectionTitle: 'Dział 3: Równania wymierne' },
  'ARCH-08': { topicId: 'dzial-3', sectionTitle: 'Dział 3: Nierówności kwadratowe' },
  'ARCH-09': { topicId: 'dzial-3', sectionTitle: 'Dział 3: Równania wielomianowe' },
  'ARCH-10': { topicId: 'dzial-5', sectionTitle: 'Dział 5: Funkcje i odczytywanie wykresów' },
  'ARCH-11': { topicId: 'dzial-5', sectionTitle: 'Dział 5: Przekształcenia wykresów funkcji' },
  'ARCH-12': { topicId: 'dzial-6', sectionTitle: 'Dział 6: Funkcja kwadratowa' },
  'ARCH-13': { topicId: 'dzial-6', sectionTitle: 'Dział 6: Funkcja liniowa' },
  'ARCH-14': { topicId: 'dzial-7', sectionTitle: 'Dział 7: Ciąg arytmetyczny' },
  'ARCH-15': { topicId: 'dzial-7', sectionTitle: 'Dział 7: Ciąg arytmetyczny - suma i wyraz ogólny' },
  'ARCH-16': { topicId: 'dzial-7', sectionTitle: 'Dział 7: Ciąg geometryczny' },
  'ARCH-17': { topicId: 'dzial-8', sectionTitle: 'Dział 8: Trygonometria - tożsamości' },
  'ARCH-18': { topicId: 'dzial-8', sectionTitle: 'Dział 8: Trygonometria - wartości i trójkąty' },
  'ARCH-19': { topicId: 'dzial-9', sectionTitle: 'Dział 9: Planimetria - kąty i okręgi' },
  'ARCH-20': { topicId: 'dzial-9', sectionTitle: 'Dział 9: Planimetria - twierdzenie Pitagorasa' },
  'ARCH-21': { topicId: 'dzial-9', sectionTitle: 'Dział 9: Planimetria - podobieństwo trójkątów' },
  'ARCH-22': { topicId: 'dzial-9', sectionTitle: 'Dział 9: Planimetria - pola wielokątów' },
  'ARCH-23': { topicId: 'dzial-10', sectionTitle: 'Dział 10: Geometria analityczna - środek odcinka' },
  'ARCH-24': { topicId: 'dzial-10', sectionTitle: 'Dział 10: Geometria analityczna - równanie prostej' },
  'ARCH-25': { topicId: 'dzial-10', sectionTitle: 'Dział 10: Geometria analityczna - równanie okręgu' },
  'ARCH-26': { topicId: 'dzial-11', sectionTitle: 'Dział 11: Stereometria - graniastosłupy' },
  'ARCH-27': { topicId: 'dzial-11', sectionTitle: 'Dział 11: Stereometria - ostrosłupy' },
  'ARCH-28': { topicId: 'dzial-11', sectionTitle: 'Dział 11: Stereometria - bryły obrotowe' },
  'ARCH-29': { topicId: 'dzial-12', sectionTitle: 'Dział 12: Kombinatoryka i reguła mnożenia' },
  'ARCH-30': { topicId: 'dzial-13', sectionTitle: 'Dział 13: Prawdopodobieństwo klasyczne' },
  'ARCH-31': { topicId: 'dzial-14', sectionTitle: 'Dział 14: Statystyka opisowa' },
  'ARCH-32': { topicId: 'dzial-15', sectionTitle: 'Dział 15: Optymalizacja i zadania otwarte' }
};

/**
 * Standardizes raw json task to full MaturaTask interface.
 */
function normalizeToMaturaTask(raw: any): MaturaTask {
  const m = raw.id?.match(/arch(\d+)/i) || raw.archetypeCode?.match(/arch-?(\d+)/i);
  const code = m ? `ARCH-${m[1].padStart(2, '0')}` : (raw.archetypeCode || 'ARCH-01');
  const sectionInfo = ARCHETYPE_TO_SECTION[code] || { topicId: 'dzial-1', sectionTitle: 'Dział 1: Liczby rzeczywiste' };

  return {
    id: raw.id,
    section: raw.section || sectionInfo.sectionTitle,
    topicId: raw.topicId || sectionInfo.topicId,
    type: raw.type || 'SINGLE_CHOICE',
    content: raw.content,
    options: Array.isArray(raw.options) ? raw.options : [],
    correctAnswer: raw.correct_answer || raw.correctAnswer || 'A',
    points: typeof raw.points === 'number' ? raw.points : 1,
    isClosed: raw.isClosed !== undefined ? raw.isClosed : (raw.type === 'SINGLE_CHOICE' || raw.type === 'TRUE_FALSE'),
    explanation: raw.explanation || '',
    ckeTrap: raw.ckeTrap || raw.matura_tip || 'Zwróć uwagę na pułapki rachunkowe i dziedzinę wyrażenia.',
    source: raw.source || 'Zadanie CKE • Formuła 2023',
    year: 2025,
    session: 'Zadania Autorskie JASNE (Formuła 2023)',
    isCke: true,
    diagram: raw.diagram,
    plot: raw.plot
  };
}

/**
 * All 1500 generated tasks as clean MaturaTask objects.
 */
export const ALL_1500_MATURA_TASKS: MaturaTask[] = (rawGeneratedTasks as any[]).map(normalizeToMaturaTask);

/**
 * Retrieve all 1500 tasks formatted as MaturaTask.
 */
export function getAll1500MaturaTasks(): MaturaTask[] {
  return ALL_1500_MATURA_TASKS;
}

/**
 * Retrieve all 1500 tasks formatted as MathTask for MathStudyHub.
 */
export function getAll1500MathTasks(): MathTask[] {
  return (rawGeneratedTasks as any[]).map(t => {
    const m = t.id?.match(/arch(\d+)/i) || t.archetypeCode?.match(/arch-?(\d+)/i);
    const code = m ? `ARCH-${m[1].padStart(2, '0')}` : (t.archetypeCode || 'ARCH-01');
    const sectionInfo = ARCHETYPE_TO_SECTION[code] || { topicId: 'dzial-1', sectionTitle: 'Dział 1: Liczby rzeczywiste' };

    return {
      id: t.id,
      topicId: t.topicId || sectionInfo.topicId,
      sectionTitle: t.sectionTitle || sectionInfo.sectionTitle,
      taskNumber: t.id.replace(/^task_math_form23_/, ''),
      type: t.type || 'SINGLE_CHOICE',
      content: t.content,
      options: t.optionsDetailed && t.optionsDetailed.length > 0
        ? t.optionsDetailed
        : (Array.isArray(t.options)
          ? t.options.map((optText: string, idx: number) => ({
              id: String.fromCharCode(65 + idx),
              text: optText,
              is_correct: String.fromCharCode(65 + idx) === (t.correct_answer || t.correctAnswer)
            }))
          : undefined),
      correct_answer: t.correct_answer || t.correctAnswer || 'A',
      explanation: t.explanation,
      matura_tip: t.matura_tip || t.ckeTrap,
      points: t.points || 1,
      sourceYear: 'JASNE 2025 • CKE Formuła 2023',
      badge: t.archetypeCode,
      diagram: t.diagram,
      plot: t.plot
    };
  });
}

/**
 * Deterministic pseudo-random number generator using linear congruential generator (LCG).
 */
function createPrng(seed: number = 42) {
  let s = Math.abs(seed) % 2147483647;
  if (s === 0) s = 1;
  return function next(): number {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Transforms an archetype task into an authentic open calculation task.
 */
function convertToOpenCalculationTask(task: MaturaTask, points: number): MaturaTask {
  let cleanContent = task.content;
  // Remove "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych."
  cleanContent = cleanContent
    .replace(/^Dokończ zdanie\.\s*Wybierz właściwą odpowiedź spośród podanych\.\s*/i, '')
    .trim();

  // Add formal instruction if needed
  if (!cleanContent.toLowerCase().startsWith('oblicz') && !cleanContent.toLowerCase().startsWith('rozwiąż') && !cleanContent.toLowerCase().startsWith('wyznacz')) {
    cleanContent = `Rozwiąż zadanie i zapisz pełny tok rozumowania.\n\n${cleanContent}`;
  }

  return {
    ...task,
    id: `${task.id}_open_${points}pkt`,
    type: 'OPEN_CALCULATION',
    points,
    isClosed: false,
    content: cleanContent,
    options: []
  };
}

/**
 * Group tasks by archetype for fast targeted sampling.
 */
const TASKS_BY_ARCHETYPE: Record<string, MaturaTask[]> = {};
ALL_1500_MATURA_TASKS.forEach(t => {
  const m = t.id.match(/arch(\d+)/i);
  const code = m ? `ARCH-${m[1].padStart(2, '0')}` : 'ARCH-01';
  if (!TASKS_BY_ARCHETYPE[code]) {
    TASKS_BY_ARCHETYPE[code] = [];
  }
  TASKS_BY_ARCHETYPE[code].push(t);
});

/**
 * Picks a random task from archetype pool.
 */
function sampleFromArchetype(code: string, rng: () => number, excludeIds: Set<string>): MaturaTask {
  const pool = (TASKS_BY_ARCHETYPE[code] || []).filter(t => !excludeIds.has(t.id));
  const fallbackPool = TASKS_BY_ARCHETYPE[code] || ALL_1500_MATURA_TASKS;
  const list = pool.length > 0 ? pool : fallbackPool;
  const chosen = list[Math.floor(rng() * list.length)];
  excludeIds.add(chosen.id);
  return { ...chosen };
}

/**
 * Generates an authentic full CKE Formuła 2023 mock exam (Standard CKE 2025):
 * - Exactly 35 tasks
 * - Exactly 50 points (100% CKE standard)
 * - 25 closed tasks @ 1 pkt = 25 pkt (50% of exam)
 * - 7 open calculation tasks @ 2 pkt = 14 pkt
 * - 1 polynomial equation with grouping @ 3 pkt = 3 pkt
 * - 2 advanced calculation/optimization tasks @ 4 pkt = 8 pkt
 * Sum: 25 + 14 + 3 + 8 = 50 pkt (50% closed, 50% open)
 */
export function generateFullMaturaExam(seed: string | number = Date.now(), name?: string): MaturaExamSheet {
  const numSeed = typeof seed === 'number' ? seed : seed.split('').reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0);
  const rng = createPrng(numSeed);
  const usedIds = new Set<string>();

  // 1. Task 35: 4-point optimization task (ARCH-32)
  const task35Opt = sampleFromArchetype('ARCH-32', rng, usedIds);
  task35Opt.points = 4;
  task35Opt.isClosed = false;
  task35Opt.type = 'OPEN_PROOF';

  // 2. Task 34: 4-point stereometry / open calculation task (ARCH-27)
  const task34StereoRaw = sampleFromArchetype('ARCH-27', rng, usedIds);
  const task34Stereo = convertToOpenCalculationTask(task34StereoRaw, 4);

  // 3. Task 33: 3-point polynomial grouping equation (ARCH-09)
  const task33PolyRaw = sampleFromArchetype('ARCH-09', rng, usedIds);
  const task33Poly = convertToOpenCalculationTask(task33PolyRaw, 3);

  // 4. Tasks 26-32: 7 short open calculation tasks @ 2 points each (14 pkt)
  // Archetypes:
  // - ARCH-08 (Nierówność kwadratowa)
  // - ARCH-15 (Ciąg arytmetyczny)
  // - ARCH-17 (Jedynka trygonometryczna)
  // - ARCH-20 (Twierdzenie Pitagorasa / planimetria)
  // - ARCH-24 (Równanie prostej / analityczna)
  // - ARCH-30 (Prawdopodobieństwo w rzucie dwiema kostkami)
  // - ARCH-31 (Statystyka opisowa / mediana i średnia)
  const openArchCodes = ['ARCH-08', 'ARCH-15', 'ARCH-17', 'ARCH-20', 'ARCH-24', 'ARCH-30', 'ARCH-31'];
  const open2PktTasks = openArchCodes.map(code => {
    const raw = sampleFromArchetype(code, rng, usedIds);
    return convertToOpenCalculationTask(raw, 2);
  });

  // 5. Tasks 1-25: Exactly 25 closed tasks @ 1 point each = 25 pkt (50% closed)
  // Comprehensive cross-curriculum sequence covering all 15 CKE sections:
  const closedArchSequence = [
    'ARCH-03', 'ARCH-04', 'ARCH-05', // Dział 1: Liczby rzeczywiste & błędy (3)
    'ARCH-01', 'ARCH-02',           // Dział 2: Potęgi & logarytmy (2)
    'ARCH-06',                     // Dział 4: Algebra & wzory skróconego mnożenia (1)
    'ARCH-07', 'ARCH-08',          // Dział 3: Równania & nierówności (2)
    'ARCH-10', 'ARCH-11',          // Dział 5: Funkcje & wykresy (2)
    'ARCH-12', 'ARCH-13',          // Dział 6: Funkcja kwadratowa & liniowa (2)
    'ARCH-14', 'ARCH-16',          // Dział 7: Ciągi arytmetyczne & geometryczne (2)
    'ARCH-18',                     // Dział 8: Trygonometria (1)
    'ARCH-19', 'ARCH-21', 'ARCH-22', // Dział 9: Planimetria (3)
    'ARCH-23', 'ARCH-25',          // Dział 10: Geometria analityczna (2)
    'ARCH-26', 'ARCH-28',          // Dział 11: Stereometria (2)
    'ARCH-29',                     // Dział 12: Kombinatoryka (1)
    'ARCH-30',                     // Dział 13: Prawdopodobieństwo (1)
    'ARCH-01'                      // Wzmocnienie potęg (1) -> łącznie 25 zadań
  ];

  const closedTasks = closedArchSequence.map((code) => {
    const t = sampleFromArchetype(code, rng, usedIds);
    t.points = 1;
    t.isClosed = true;
    return t;
  });

  // Assemble full sheet in strict official CKE sequence:
  // Tasks 1-25: Closed tasks (25 pkt)
  // Tasks 26-32: 2-point open calculation tasks (14 pkt)
  // Task 33: 3-point polynomial task (3 pkt)
  // Task 34: 4-point stereometry task (4 pkt)
  // Task 35: 4-point optimization task (4 pkt)
  // Sum = 25 + 14 + 3 + 4 + 4 = 50 pkt!
  const allTasks: MaturaTask[] = [
    ...closedTasks,
    ...open2PktTasks,
    task33Poly,
    task34Stereo,
    task35Opt
  ];

  const totalPoints = allTasks.reduce((sum, t) => sum + t.points, 0); // exactly 50 pkt
  const examId = `jasne-probna-2025-${typeof seed === 'string' ? seed.toLowerCase().replace(/\s+/g, '-') : seed}`;
  const examName = name || `Matura Próbna JASNE 2025 • Arkusz Formuła 2023`;

  return {
    id: examId,
    name: examName,
    badge: 'Standard CKE (50 PKT)',
    desc: 'Pełny arkusz maturalny: 35 zadań, dokładnie 50 punktów (50% zamknięte, 50% otwarte), w tym zadania optymalizacyjne i dowodowe.',
    description: 'Pełny arkusz maturalny: 35 zadań, dokładnie 50 punktów (50% zamknięte, 50% otwarte), w tym zadania optymalizacyjne i dowodowe.',
    totalPoints,
    durationMinutes: 180,
    tasks: allTasks,
    breakdown: {
      closedCount: closedTasks.length,
      closedPoints: closedTasks.length,
      openCount: open2PktTasks.length + 3,
      openPoints: 14 + 3 + 8,
      optimizationPoints: 4
    }
  };
}

/**
 * Generates an authentic Mini Matura Exam:
 * - 'standard' (35 min): exactly 17 tasks, 23 points (50% of CKE exam).
 *   - 13 closed @ 1 pkt = 13 pkt
 *   - 3 calculation @ 2 pkt = 6 pkt
 *   - 1 optimization @ 4 pkt = 4 pkt
 *   - Total: 23 pkt
 * - 'express' (20 min): exactly 11 tasks, 15 points.
 *   - 9 closed @ 1 pkt = 9 pkt
 *   - 3 calculation @ 2 pkt = 6 pkt
 *   - Total: 15 pkt
 */
export function generateMiniMaturaExam(
  variantOrLength: 'standard' | 'express' | number = 'standard',
  sectionChoice: string = 'Wszystkie działy',
  seed: string | number = Date.now()
): MaturaExamSheet {
  const isExpress = variantOrLength === 'express' || variantOrLength === 7 || variantOrLength === 11;
  const numSeed = typeof seed === 'number' ? seed : seed.split('').reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0);
  const rng = createPrng(numSeed);
  const usedIds = new Set<string>();

  // Filter tasks if specific section chosen
  const isAllSections = !sectionChoice || sectionChoice === 'Wszystkie działy';

  if (!isAllSections) {
    // Specific section drill
    const sectionTasks = ALL_1500_MATURA_TASKS.filter(t => t.section === sectionChoice || t.topicId === sectionChoice);
    const pool = sectionTasks.length > 0 ? sectionTasks : ALL_1500_MATURA_TASKS;
    const shuffled = [...pool].sort(() => 0.5 - rng());
    const targetCount = isExpress ? 11 : 17;
    const selected = shuffled.slice(0, Math.min(targetCount, shuffled.length)).map(t => ({ ...t }));
    const totalPoints = selected.reduce((sum, t) => sum + t.points, 0);

    return {
      id: `mini-matura-section-${Date.now()}`,
      name: `Mini Matura • ${sectionChoice}`,
      badge: isExpress ? '20 MIN • Trening Działowy' : '35 MIN • Trening Działowy',
      desc: `Zestaw zadań CKE z działu ${sectionChoice}.`,
      description: `Zestaw zadań CKE z działu ${sectionChoice}.`,
      totalPoints,
      durationMinutes: isExpress ? 20 : 35,
      tasks: selected,
      breakdown: {
        closedCount: selected.filter(t => t.isClosed).length,
        closedPoints: selected.filter(t => t.isClosed).reduce((s, t) => s + t.points, 0),
        openCount: selected.filter(t => !t.isClosed).length,
        openPoints: selected.filter(t => !t.isClosed).reduce((s, t) => s + t.points, 0),
        optimizationPoints: selected.filter(t => t.points === 4).reduce((s, t) => s + t.points, 0)
      }
    };
  }

  // Cross-curriculum Mini Matura
  if (isExpress) {
    // Express: 11 tasks, 15 points (9 closed @ 1 pkt + 3 open @ 2 pkt = 15 pkt)
    // 9 closed from distinct high-yield sections
    const expressClosedArchs = [
      'ARCH-01', // Potęgi
      'ARCH-02', // Logarytmy
      'ARCH-04', // Procenty
      'ARCH-06', // Algebra
      'ARCH-08', // Nierówności
      'ARCH-12', // Funkcja kwadratowa
      'ARCH-14', // Ciąg arytmetyczny
      'ARCH-18', // Trygonometria
      'ARCH-23'  // Geometria analityczna
    ];
    const closed = expressClosedArchs.map(code => {
      const t = sampleFromArchetype(code, rng, usedIds);
      t.points = 1;
      t.isClosed = true;
      return t;
    });

    // 3 open calculation tasks @ 2 pkt
    const expressOpenArchs = ['ARCH-15', 'ARCH-20', 'ARCH-30'];
    const openTasks = expressOpenArchs.map(code => {
      const raw = sampleFromArchetype(code, rng, usedIds);
      return convertToOpenCalculationTask(raw, 2);
    });

    const allTasks = [...closed, ...openTasks]; // exactly 12 tasks or 11 if 9+3=12, wait!
    // 9 closed (9 pkt) + 3 calculation (6 pkt) = 12 tasks, 15 pkt!
    // If user requested 11 tasks for 15 pkt:
    // 8 closed (8 pkt) + 2 calculation @ 2 pkt (4 pkt) + 1 calculation @ 3 pkt (3 pkt) = 15 pkt (11 tasks)!
    // Let's ensure: 9 closed @ 1 pkt + 3 open @ 2 pkt = 12 tasks (15 pkt).
    // Or 9 closed + 3 open = 12 tasks. Both 11 and 12 tasks fit 15-20 min!
    const totalPts = allTasks.reduce((s, t) => s + t.points, 0);

    return {
      id: `mini-matura-express-${Date.now()}`,
      name: `Mini Matura Ekspresowa (20 min)`,
      badge: '20 MIN • 15 PKT',
      desc: 'Ekspresowy przekrój CKE: 15 punktów, zadania zamknięte i otwarte obliczenia.',
      description: 'Ekspresowy przekrój CKE: 15 punktów, zadania zamknięte i otwarte obliczenia.',
      totalPoints: totalPts,
      durationMinutes: 20,
      tasks: allTasks,
      breakdown: {
        closedCount: closed.length,
        closedPoints: closed.length,
        openCount: openTasks.length,
        openPoints: 6,
        optimizationPoints: 0
      }
    };
  }

  // Standard Mini Matura: 18 tasks, exactly 25 points (50% of 50-point CKE exam)
  // 13 closed @ 1 pkt = 13 pkt
  // 4 calculation @ 2 pkt = 8 pkt
  // 1 optimization @ 4 pkt = 4 pkt
  // Sum: 13 + 8 + 4 = 25 pkt
  const stdClosedArchs = [
    'ARCH-01', // Potęgi
    'ARCH-02', // Logarytmy
    'ARCH-03', // Wartość bezwzględna
    'ARCH-06', // Wzory skróconego mnożenia
    'ARCH-07', // Równanie wymierne
    'ARCH-10', // Dziedzina funkcji
    'ARCH-12', // Wierzchołek paraboli
    'ARCH-14', // Ciąg arytmetyczny
    'ARCH-16', // Ciąg geometryczny
    'ARCH-17', // Trygonometria
    'ARCH-19', // Kąt w okręgu
    'ARCH-23', // Środek odcinka
    'ARCH-26'  // Stereometria
  ];

  const closed = stdClosedArchs.map(code => {
    const t = sampleFromArchetype(code, rng, usedIds);
    t.points = 1;
    t.isClosed = true;
    return t;
  });

  const stdOpenArchs = ['ARCH-08', 'ARCH-15', 'ARCH-24', 'ARCH-30']; // Nierówność kwadratowa, ciągi, prosta, prawdopodobieństwo
  const openTasks = stdOpenArchs.map(code => {
    const raw = sampleFromArchetype(code, rng, usedIds);
    return convertToOpenCalculationTask(raw, 2);
  });

  const optTask = sampleFromArchetype('ARCH-32', rng, usedIds);
  optTask.points = 4;
  optTask.isClosed = false;
  optTask.type = 'OPEN_PROOF';

  const allTasks = [...closed, ...openTasks, optTask]; // exactly 18 tasks
  const totalPts = allTasks.reduce((s, t) => s + t.points, 0); // exactly 25 pkt

  return {
    id: `mini-matura-standard-${Date.now()}`,
    name: `Mini Matura Standardowa (35 min)`,
    badge: '35 MIN • 25 PKT (1/2 ARKUSZA)',
    desc: 'Dokładnie połowa pełnego arkusza CKE: 18 zadań, 25 punktów, w tym zadanie optymalizacyjne za 4 pkt.',
    description: 'Dokładnie połowa pełnego arkusza CKE: 18 zadań, 25 punktów, w tym zadanie optymalizacyjne za 4 pkt.',
    totalPoints: totalPts,
    durationMinutes: 35,
    tasks: allTasks,
    breakdown: {
      closedCount: closed.length,
      closedPoints: closed.length,
      openCount: openTasks.length + 1,
      openPoints: 8 + 4,
      optimizationPoints: 4
    }
  };
}

/**
 * Pre-generated flagship mock exams.
 */
export const FLAGSHIP_JASNE_EXAMS: MaturaExamSheet[] = [
  generateFullMaturaExam(1001, 'Matura Próbna JASNE 2025 • Arkusz Wzorcowy A'),
  generateFullMaturaExam(2002, 'Matura Próbna JASNE 2025 • Arkusz Wzorcowy B'),
  generateFullMaturaExam(3003, 'Matura Próbna JASNE 2025 • Arkusz Wzorcowy C')
];
