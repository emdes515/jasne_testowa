/**
 * mathCurriculumData.ts
 *
 * 15 działów matematyki na poziomie podstawowym (wymagania egzaminacyjne CKE obowiązujące od 2025 r.)
 * z kurikulum Core-4 Bento dla silnika nauki LearnView: 75 mikrolekcji (po 5 na dział).
 *
 * Treść (pigułki teorii i zadania) NIE jest pisana ręcznie w tym pliku – powstaje w generatorze
 * `scripts/math_pp/` (`node scripts/math_pp/build.js`), który zapisuje:
 *   - src/data/math/generated/math_blueprints.json  (działy, lekcje, pigułki),
 *   - src/data/math/generated/all_1500_tasks.json   (75 lekcji × 20 unikalnych zadań).
 * Każde zadanie jest przypisane do lekcji przez pole `lessonId`.
 */

import { TopicDocument, LessonDocument, LessonMetadataItem } from '../schema_firestore';
import { LessonTheoryPill } from '../types';
import rawGeneratedTasks from './math/generated/all_1500_tasks.json';
import rawBlueprints from './math/generated/math_blueprints.json';
import { enrichTaskWithVisual } from './mathVisualRegistry';

export interface MathLessonDefinition {
  id: string;
  order: number;
  title: string;
  short_title: string;
  badge: string;
  archetypeCode: string;
  estimated_time_formatted: string;
  theory_pill: LessonTheoryPill;
  formula_sheet?: {
    lessonId: string;
    title: string;
    formulas: { title: string; latex: string }[];
    goldenRule: string;
    ckeTrap?: { error: string; correct: string; description: string } | null;
  };
}

export interface MathTopicBlueprint {
  id: string;
  numericId: number;
  title: string;
  short_title: string;
  description: string;
  icon: string;
  color: string;
  matura_points_range: string;
  importance: 'CRITICAL_PEWNIAK' | 'HIGH';
  cke_formula_page?: string;
  lessons: MathLessonDefinition[];
}

export const MATH_TOPIC_BLUEPRINTS: MathTopicBlueprint[] = rawBlueprints as unknown as MathTopicBlueprint[];



export function getMathTopicBlueprint(topicId: string): MathTopicBlueprint | undefined {
  return MATH_TOPIC_BLUEPRINTS.find(b => b.id === topicId);
}

export function getAllMathTopicBlueprints(): MathTopicBlueprint[] {
  return MATH_TOPIC_BLUEPRINTS;
}

/**
 * Normalizuje surowe zadanie do formatu zadania w LearnView / SessionRunner
 */
export function normalizeMathTaskForRunner(task: any, lessonId: string, topicId: string): any {
  if (!task) return null;

  const rawCorrect = task.correct_answer || task.correctAnswer || 'A';
  const isSingle = task.type === 'SINGLE_CHOICE' || !task.type;
  const isNumeric = task.type === 'NUMERIC_INPUT';
  // Zadania prawda/fałsz: SessionRunner ocenia każde stwierdzenie osobno (pole `statements`)
  const isTrueFalse = task.type === 'TRUE_FALSE' && Array.isArray(task.statements);

  // Format options
  let options = undefined;
  if (Array.isArray(task.options) && task.options.length > 0) {
    options = task.options.map((optText: any, idx: number) => {
      const optId = String.fromCharCode(65 + idx);
      const isCorrect = String(optId) === String(rawCorrect) || String(optText) === String(rawCorrect);
      return {
        id: optId,
        text: String(optText),
        content_latex: String(optText),
        is_correct: isCorrect
      };
    });
  }

  const questionText = task.content || task.question || '';
  const lessonLabel = task.lessonKey ? `Lekcja ${task.lessonKey}` : task.archetypeCode;
  // Druga podpowiedź = pierwszy krok rozwiązania (cały, bez ucinania w środku wzoru)
  const firstStep = String(task.explanation || '').match(/\*\*Krok 1:\*\*\s*([\s\S]*?)(?:\n\n|$)/);
  const secondHint = firstStep ? `Pierwszy krok: ${firstStep[1].trim()}` : 'Sprawdź kolejność działań i założenia zadania.';

  const taskObj = {
    id: task.id || `math-task-${lessonId}-${Math.random().toString(36).substring(7)}`,
    lessonId,
    topicId,
    type: isNumeric ? 'NUMERIC_INPUT' : isTrueFalse ? 'TRUE_FALSE' : 'SINGLE_CHOICE',
    statements: isTrueFalse ? task.statements : undefined,
    title: task.title || 'Zadanie w stylu maturalnym',
    question: questionText,
    content: questionText,
    math_statement: questionText,
    options,
    correct_answer: rawCorrect,
    correctAnswer: rawCorrect,
    numeric_correct_answer: isNumeric ? rawCorrect : undefined,
    explanation: task.explanation || '',
    matura_tip: task.matura_tip || 'Zwróć uwagę na założenia i wzory z karty wzorów CKE.',
    cke_tag: lessonLabel,
    badge: lessonLabel,
    points: task.points || 1,
    source: 'JASNE • zadanie autorskie w stylu CKE',
    diagram: task.diagram,
    plot: task.plot,
    numberLine: task.numberLine,
    hints: {
      level_1: task.matura_tip || 'Zwróć uwagę na wzory z karty wzorów CKE.',
      level_2: secondHint
    },
    hint_1: task.matura_tip || 'Zwróć uwagę na wzory z karty wzorów CKE.',
    hint_2: secondHint,
    // Etykieta używana przez SessionRunner w tytule zadania powtórkowego po błędzie
    tierLabel: 'ta sama lekcja'
  };

  return enrichTaskWithVisual(taskObj, lessonId);
}

// Mapowanie zadań z all_1500_tasks.json do lekcji (pole lessonId, np. "math-lesson-6-2")
const tasksByLesson: Record<string, any[]> = {};
(rawGeneratedTasks as any[]).forEach(task => {
  const key = task.lessonId;
  if (!key) return;
  if (!tasksByLesson[key]) {
    tasksByLesson[key] = [];
  }
  tasksByLesson[key].push(task);
});

/** Liczba zadań w jednej sesji mikrolekcji (Core-4: 4–6 minut). */
export const MATH_LESSON_SESSION_SIZE = 5;

/**
 * Pełne pule zadań lekcji (po 20), znormalizowane dla SessionRunnera.
 * Generator układa zadania rotacyjnie po typach, więc każde kolejne 5 zadań to przekrój lekcji.
 */
const MATH_LESSON_TASK_POOLS: Map<string, any[]> = new Map();

/** Zwraca pełną pulę zadań lekcji (np. do powtórek i sprawdzianów). */
export function getMathLessonTaskPool(lessonId: string): any[] {
  return MATH_LESSON_TASK_POOLS.get(lessonId) || [];
}

/**
 * Okno 5 zadań z puli, zmieniane raz na dobę – dla widoków, które pokazują stały zestaw
 * (MathStudyHub). Silnik sesji (drawSessionTasks) sam losuje 5 zadań z pełnej puli lekcji.
 */
function pickSessionTasks(pool: any[], rotation: number = 0): any[] {
  if (pool.length <= MATH_LESSON_SESSION_SIZE) return pool;
  const windows = Math.floor(pool.length / MATH_LESSON_SESSION_SIZE);
  const start = (((rotation % windows) + windows) % windows) * MATH_LESSON_SESSION_SIZE;
  return pool.slice(start, start + MATH_LESSON_SESSION_SIZE);
}

function currentRotation(): number {
  const now = new Date();
  return Math.floor((now.getTime() - now.getTimezoneOffset() * 60000) / 86400000);
}

/**
 * Cache pełnych dokumentów lekcji dla Matematyki
 */
export const MATH_LESSON_DOCUMENTS: Map<string, LessonDocument> = new Map();

/**
 * Budowa pełnych dokumentów lekcji i tematów
 */
export const MATH_CURRICULUM_TOPICS: TopicDocument[] = MATH_TOPIC_BLUEPRINTS.map(bp => {
  const topicTasksAll: any[] = [];

  const lessonsMetadata: LessonMetadataItem[] = bp.lessons.map(l => {
    const pool = (tasksByLesson[l.id] || []).map(t => normalizeMathTaskForRunner(t, l.id, bp.id));
    MATH_LESSON_TASK_POOLS.set(l.id, pool);
    // Dokument lekcji niesie PEŁNĄ pulę 20 zadań: drawSessionTasks losuje z niej 5 na sesję,
    // a SessionRunner po błędnej odpowiedzi dobiera z reszty puli nowe zadanie powtórkowe.
    const sessionTasks = pool;

    topicTasksAll.push(...pool);

    const lessonDoc: LessonDocument = {
      id: l.id,
      topic_id: bp.id,
      title: l.title,
      theory_pill: l.theory_pill,
      tasks: sessionTasks,
      required_correct_tasks: Math.min(3, sessionTasks.length || 3),
      estimated_time_formatted: l.estimated_time_formatted
    };

    // Zarejestruj ze wszystkimi wariantami kluczy
    MATH_LESSON_DOCUMENTS.set(l.id, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`${bp.id}/${l.id}`, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`matematyka-podstawowa/${bp.id}/${l.id}`, lessonDoc);

    const cleanOrder = String(bp.numericId) + '.' + String(l.order);
    MATH_LESSON_DOCUMENTS.set(cleanOrder, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`lesson-${bp.numericId}-${l.order}`, lessonDoc);
    MATH_LESSON_DOCUMENTS.set(`math-lesson-${bp.numericId}-${l.order}`, lessonDoc);

    return {
      id: l.id,
      order: l.order,
      title: l.title,
      short_title: l.short_title,
      badge: l.badge,
      tasks_count: Math.min(MATH_LESSON_SESSION_SIZE, sessionTasks.length),
      estimated_time_formatted: l.estimated_time_formatted,
      points_to_unlock: l.order === 1 ? 0 : 15,
      required_correct_tasks: 3
    };
  });

  return {
    id: bp.id,
    numericId: bp.numericId,
    name: bp.title,
    title: bp.title,
    short_title: bp.short_title,
    description: bp.description,
    icon: bp.icon,
    color: bp.color,
    matura_points_range: bp.matura_points_range,
    importance: bp.importance,
    lessons_metadata: lessonsMetadata,
    tasks: topicTasksAll
  };
});

/**
 * Płaska lista wszystkich lekcji matematyki CKE z przypisanymi działami
 */
export const ALL_MATH_LESSONS = MATH_TOPIC_BLUEPRINTS.flatMap(bp => 
  bp.lessons.map(l => ({
    ...l,
    topicId: bp.id,
    topicNumericId: bp.numericId,
    topicTitle: bp.title,
    topicShortTitle: bp.short_title,
    color: bp.color,
    icon: bp.icon,
  }))
);

/**
 * Pobiera dokument lekcji matematyki
 */
export function getMathLessonDocument(topicId?: string, lessonId?: string): LessonDocument | null {
  if (!lessonId) return null;
  const cleanId = String(lessonId).trim();

  const found = MATH_LESSON_DOCUMENTS.get(cleanId) ||
         (topicId ? MATH_LESSON_DOCUMENTS.get(`${topicId}/${cleanId}`) : null) ||
         (topicId ? MATH_LESSON_DOCUMENTS.get(`matematyka-podstawowa/${topicId}/${cleanId}`) : null) ||
         null;

  if (found) {
    return { ...found, id: cleanId };
  }
  return null;
}

/**
 * Stały na dany dzień zestaw 5 zadań lekcji (dla widoków bez własnego losowania).
 */
export function getMathLessonSessionTasks(lessonId: string): any[] {
  const doc = MATH_LESSON_DOCUMENTS.get(String(lessonId).trim());
  const pool = doc ? MATH_LESSON_TASK_POOLS.get(doc.id) || [] : [];
  return pickSessionTasks(pool, currentRotation());
}

/**
 * Generuje Boss Exam dla wybranego działu Matematyki
 */
export function loadMathTopicBossExam(topicId: string, topicTitle?: string): any {
  const bp = MATH_TOPIC_BLUEPRINTS.find(b => 
    b.id === topicId || 
    b.numericId === parseInt(String(topicId).replace(/\D/g, '') || '1', 10)
  ) || MATH_TOPIC_BLUEPRINTS[0];

  // Zbierz zadania ze wszystkich lekcji tego działu
  const candidatePool: any[] = [];
  bp.lessons.forEach(l => {
    candidatePool.push(...(tasksByLesson[l.id] || []));
  });

  const available = candidatePool.length > 0 ? candidatePool : (rawGeneratedTasks as any[]);
  // Po jednym losowym zadaniu z każdej lekcji działu (pełny przekrój), a w razie braków – dobór z całej puli
  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const chosen: any[] = [];
  bp.lessons.forEach(l => {
    const list = tasksByLesson[l.id] || [];
    if (list.length > 0) chosen.push(list[Math.floor(Math.random() * list.length)]);
  });
  if (chosen.length < 5) {
    const used = new Set(chosen.map(t => t.id));
    chosen.push(...shuffle(available.filter(t => !used.has(t.id))).slice(0, 5 - chosen.length));
  }

  const examTasks = chosen.map((t, idx) => {
    const norm = normalizeMathTaskForRunner(t, `${bp.id}-boss`, bp.id);
    return {
      id: norm.id || `boss-math-${bp.id}-${idx + 1}`,
      lessonId: `${bp.id}.${idx + 1}`,
      lessonOrder: idx + 1,
      lessonTitle: norm.title || `Zadanie ${idx + 1}`,
      topicLabel: `${bp.short_title} • Zadanie ${idx + 1}`,
      question: norm.question || norm.title || '',
      content: norm.content || norm.question || '',
      math_statement: norm.question || norm.title || '',
      options: norm.options || [],
      correct_answer: norm.correct_answer || norm.correctAnswer,
      correctAnswer: norm.correctAnswer || norm.correct_answer,
      numeric_correct_answer: norm.numeric_correct_answer,
      explanation: norm.explanation || '',
      matura_tip: norm.matura_tip || '',
      hint_1: norm.hint_1 || '',
      hint_2: norm.hint_2 || '',
      source: 'JASNE • Sprawdzian działowy (zadania w stylu CKE)',
      numberLine: norm.numberLine,
      type: norm.type || 'SINGLE_CHOICE',
      points: norm.points || 1,
      diagram: norm.diagram,
      plot: norm.plot
    };
  });

  const totalQuestions = examTasks.length || 5;
  const passingScore = Math.max(1, Math.ceil(totalQuestions * 0.7));

  return {
    id: `BOSS-EXAM-${String(bp.id).toUpperCase()}`,
    title: `Sprawdzian: ${bp.short_title}`,
    subtitle: `Ostateczne starcie z materiałem: ${bp.title}. Rozwiąż ${totalQuestions} zadań z tego działu.`,
    boss_name: `Egzaminator: ${bp.short_title}`,
    boss_message: `Egzaminator czeka! Wykaż się wiedzą z działu: ${bp.short_title}. Zdobądź minimum 70%!`,
    timeLimitMinutes: 20,
    passingScore,
    totalQuestions,
    rewardXp: 200,
    rewardCoins: 100,
    badgeId: `master_${String(bp.id).toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    tasks: examTasks
  };
}
