/**
 * Sesje nauki i egzaminy działowe.
 *
 * ZASADA ARCHITEKTONICZNA: ten moduł NIE zawiera żadnych treści. Wszystkie
 * zadania, karty wzorów i pigułki wiedzy pochodzą z Cloud Firestore przez
 * `curriculumRepository` (pamięć podręczna wypełniana przez getLesson()).
 * Dzięki temu bundle aplikacji nie zawiera kurikulum.
 *
 * Funkcje są synchroniczne, bo wywołują je komponenty w trakcie renderowania —
 * dlatego czytają wyłącznie z pamięci podręcznej. Widoki mają obowiązek pobrać
 * lekcję (getLesson/ensureLessonLoaded) ZANIM uruchomią sesję.
 */

import { TaskOption, LessonTheoryPill } from '../types';
import { curriculumRepository } from '../services/curriculumRepository';
import { normalizeTask } from './mathTasks';
import { enrichTaskWithVisual, enrichTheoryPillWithVisual } from './mathVisualRegistry';
import type { LessonDocument } from '../schema_firestore';

export type TaskDifficultyTier = 'A' | 'B' | 'C';

export interface PoolTask {
  id: string;
  lessonId: string;
  tier: TaskDifficultyTier;
  tierLabel: string;
  points: number;
  question: string;
  options?: TaskOption[];
  correct_answer?: string;
  correctAnswer?: string;
  input_placeholder?: string;
  statements?: { id: string; text: string; correct: string }[];
  part_1?: { prompt?: string; options: { id: string; text: string }[] };
  part_2?: { prompt?: string; options: { id: string; text: string }[] };
  explanation: string;
  hint_1: string;
  hint_2: string;
  hints?: { level_1: string; level_2: string };
  hint_cost?: { level_1: number; level_2: number } | number;
  ai_hint_enabled?: boolean;
  ai_hint_cost?: number;
  scoring_key?: string;
  cke_tag?: string;
  type?: string;
  source?: string;
  instruction?: string;
  officialKey?: string;
  cke_source?: string;
  ai_tutor_rubric?: {
    max_points: number;
    criterion_1_point: string;
    criterion_2_points: string;
  };
  modelSolutionSteps?: { step_num: number; description: string; latex?: string }[];
  plot?: any;
}

export interface LessonFormulaSheet {
  lessonId: string;
  title: string;
  isLeksykon?: boolean;
  formulas: { title: string; latex: string }[];
  goldenRule: string;
  /** Pułapka CKE. Dla części lekcji humanistycznych może nie istnieć. */
  ckeTrap?: { error: string; correct: string; description: string } | null;
}

function normalizeLessonId(id: string): string {
  return String(id).replace(/^pol-/, '').replace(/^lesson-/, '').replace(/^pol-/, '').replace('-', '.');
}

function normalizeCkeTrap(raw: any): LessonFormulaSheet['ckeTrap'] {
  if (!raw) return null;
  if (typeof raw === 'string') {
    return { error: raw, correct: '', description: raw };
  }
  const error = typeof raw.error === 'string' ? raw.error : '';
  const correct = typeof raw.correct === 'string' ? raw.correct : '';
  const description = typeof raw.description === 'string' ? raw.description : '';
  if (!error && !correct && !description) return null;
  return { error, correct, description };
}

function toFormulaSheet(raw: any, lesson?: LessonDocument | null): LessonFormulaSheet | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  return {
    lessonId: raw.lessonId || lesson?.id || '',
    title: raw.title || lesson?.title || '',
    isLeksykon: raw.isLeksykon === true || Boolean((lesson as any)?.leksykon),
    formulas: Array.isArray(raw.formulas) ? raw.formulas : [],
    goldenRule: raw.goldenRule || raw.golden_rule || '',
    ckeTrap: normalizeCkeTrap(raw.ckeTrap ?? raw.cke_trap)
  };
}

/**
 * Karta wzorów dla lekcji — wyłącznie z dokumentu lekcji w Firestore.
 * Zwraca null, jeśli lekcja nie została jeszcze wczytana.
 */
export function getLessonFormulaSheet(lessonId: string): LessonFormulaSheet | null {
  const lesson = curriculumRepository.getCachedLesson(lessonId);
  if (!lesson) return null;
  return toFormulaSheet((lesson as any).formulaSheet || (lesson as any).formula_sheet, lesson);
}

/** Pigułka wiedzy z dokumentu lekcji (wzbogacona o schematy wektorowe). */
export function getLessonTheoryPill(lessonId: string): LessonTheoryPill | null {
  const lesson = curriculumRepository.getCachedLesson(lessonId);
  const raw = (lesson?.theory_pill as LessonTheoryPill) || null;
  return raw ? enrichTheoryPillWithVisual(raw, lessonId) : null;
}

/** Pula zadań lekcji z dokumentu lekcji w Firestore (wzbogacona o wykresy). */
export function getLessonTaskPool(lessonId: string): PoolTask[] {
  const lesson = curriculumRepository.getCachedLesson(lessonId);
  return ((lesson?.tasks as unknown as PoolTask[]) || []).map(t => enrichTaskWithVisual(t, lessonId));
}

export interface SessionTasksDrawResult {
  lessonId: string;
  sessionTasks: any[];
  formulaSheet: LessonFormulaSheet | null;
  theoryPill?: any;
  required_correct_tasks?: number;
  estimated_time_formatted?: string;
}

/** Losowanie bez powtórzeń z zachowaniem kolejności. */
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => 0.5 - Math.random());
}

/**
 * Przygotowuje zadania sesji dla lekcji.
 *
 * Źródło zadań (w kolejności): jawne `providedTasks` z widoku → dokument lekcji
 * w pamięci podręcznej Firestore. Dla języka polskiego pula jest losowana
 * (2 otwarte + 2 zamknięte + 1 prawda/fałsz), dla matematyki zwracamy komplet.
 */
export function drawSessionTasks(
  lessonId: string,
  providedTasks?: any[],
  providedFormulaSheet?: any
): SessionTasksDrawResult {
  const lesson = curriculumRepository.getCachedLesson(lessonId);
  const formulaSheet =
    toFormulaSheet(providedFormulaSheet, lesson) || toFormulaSheet(
      (lesson as any)?.formulaSheet || (lesson as any)?.formula_sheet,
      lesson
    );

  const provided = Array.isArray(providedTasks) && providedTasks.length > 0 ? providedTasks : null;
  const pool: any[] = provided || ((lesson?.tasks as any[]) || []);

  const isPolish =
    lessonId.startsWith('pol-') ||
    String(pool[0]?.id || '').includes('pol') ||
    Boolean((lesson as any)?.leksykon);

  if (!isPolish) {
    let mathTasks = [...pool];
    if (mathTasks.length > 18) {
      // Wymieszaj i wylosuj 15-18 zadań z zachowaniem reprezentacji zadań otwartych
      const openTasks = mathTasks.filter((t: any) => 
        t.type === 'OPEN_PROOF' || t.type === 'OPEN_TASK' || t.type === 'SHORT_ANSWER'
      );
      const closedTasks = mathTasks.filter((t: any) => 
        t.type !== 'OPEN_PROOF' && t.type !== 'OPEN_TASK' && t.type !== 'SHORT_ANSWER'
      );

      // Cel: 15-18 zadań, w tym 2-4 otwarte
      const openCount = Math.min(openTasks.length, Math.max(2, Math.min(4, Math.floor(openTasks.length * 0.5))));
      const closedCount = Math.min(closedTasks.length, 16 - openCount);

      const drawn = [
        ...shuffle(openTasks).slice(0, openCount),
        ...shuffle(closedTasks).slice(0, closedCount)
      ];
      mathTasks = shuffle(drawn);
    } else if (mathTasks.length > 0) {
      // Losowa kolejność przy każdym podejściu do sesji
      mathTasks = shuffle(mathTasks);
    }

    return {
      lessonId,
      sessionTasks: mathTasks.map(t => enrichTaskWithVisual(t, lessonId)),
      formulaSheet,
      theoryPill: lesson?.theory_pill ? enrichTheoryPillWithVisual(lesson.theory_pill, lessonId) : undefined,
      required_correct_tasks: lesson?.required_correct_tasks || 4,
      estimated_time_formatted: lesson?.estimated_time_formatted || '~8 min'
    };
  }

  let drawnTasks: any[] = [];
  if (pool.length > 5) {
    const openTasks = pool.filter((t: any) =>
      t.type === 'OPEN_TASK' || t.type === 'OPEN_SHORT' || t.type === 'OPEN_PROOF' ||
      t.type === 'SHORT_ANSWER' || t.type === 'OPEN_SYNTHESIS'
    );
    const singleTasks = pool.filter((t: any) => t.type === 'SINGLE_CHOICE' || t.type === 'SINGLE');
    const tfTasks = pool.filter((t: any) => t.type === 'TRUE_FALSE');

    drawnTasks = [
      ...shuffle(singleTasks).slice(0, Math.min(2, singleTasks.length)),
      ...shuffle(openTasks).slice(0, Math.min(2, openTasks.length)),
      ...shuffle(tfTasks).slice(0, Math.min(1, tfTasks.length))
    ];

    if (drawnTasks.length < 5) {
      const remaining = pool.filter((t: any) => !drawnTasks.some(d => d.id === t.id));
      drawnTasks.push(...shuffle(remaining).slice(0, 5 - drawnTasks.length));
    }
  } else if (pool.length > 0) {
    drawnTasks = shuffle(pool);
  }

  const sessionTasks = drawnTasks.map((t: any) => {
    const norm = normalizeTask(t, { id: lessonId, title: t.title || lesson?.title || 'Lekcja' }, { id: 'jezyk-polski', short_title: 'Język Polski' });
    return {
      ...norm,
      ...t,
      topic: 'Język Polski',
      instruction: t.instruction || (norm.instruction.includes('dowód')
        ? 'Sformułuj odpowiedź własnymi słowami na podstawie tekstu/lektury. Pamiętaj o uzasadnieniu.'
        : norm.instruction),
      cke_badge: t.cke_badge || t.badge,
      hint: t.hints?.level_1 || t.hint_1 || t.hint || norm.hint,
      hint_cost: t.hint_cost || 10,
      ai_hint_enabled: true,
      scoring_key: t.scoring_key || norm.scoring_key
    };
  });

  return {
    lessonId,
    sessionTasks,
    formulaSheet,
    theoryPill: lesson?.theory_pill,
    required_correct_tasks: lesson?.required_correct_tasks || 3,
    estimated_time_formatted: lesson?.estimated_time_formatted || '~5 min'
  };
}

export interface BossExamTask {
  id: string;
  lessonId: string;
  lessonOrder: number;
  lessonTitle: string;
  topicLabel: string;
  question: string;
  options?: TaskOption[];
  correct_answer?: string;
  correctAnswer?: string;
  input_placeholder?: string;
  statements?: { id: string; text: string; correct: string }[];
  part_1?: { prompt?: string; options: { id: string; text: string }[] };
  part_2?: { prompt?: string; options: { id: string; text: string }[] };
  explanation: string;
  hint_1: string;
  hint_2: string;
  source: string;
  type: string;
  points: number;
  ai_tutor_rubric?: any;
}

export interface BossExamData {
  id: string;
  title: string;
  subtitle: string;
  boss_name: string;
  boss_message: string;
  timeLimitMinutes: number;
  passingScore: number;
  totalQuestions: number;
  rewardXp: number;
  rewardCoins: number;
  badgeId: string;
  tasks: BossExamTask[];
}

/** @deprecated Zachowane dla zgodności importów. Pula jest teraz w Firestore. */
export const dzial1TasksPool: PoolTask[] = [];

/**
 * Generuje egzamin działowy z podanych zadań (z Firestore).
 * Gdy zadania nie zostaną przekazane, sięga do pamięci podręcznej repozytorium.
 */
export function generateTopicBossExam(topic?: any, allTopicTasks?: any[]): BossExamData {
  const topicId = topic?.id || 'dzial-1';
  const rawTopicName = topic?.name || topic?.title || 'Liczby Rzeczywiste';
  const cleanTitle = String(rawTopicName)
    .replace(/^Dział\s+\d+:\s*/i, '')
    .replace(/\s*\(Poziom\s+Podstawowy\)/gi, '')
    .replace(/\s*\(Formuła\s+2023\)/gi, '')
    .trim();

  let pool: any[] = [];
  if (allTopicTasks && allTopicTasks.length > 0) {
    pool = [...allTopicTasks];
  } else if (topic?.tasks && Array.isArray(topic.tasks) && topic.tasks.length > 0) {
    pool = [...topic.tasks];
  } else if (topic?.lessons && Array.isArray(topic.lessons)) {
    topic.lessons.forEach((l: any) => {
      if (Array.isArray(l.tasks)) pool.push(...l.tasks);
    });
  }

  if (pool.length === 0) {
    const cached = curriculumRepository.getAllCachedTasks();
    pool = cached.filter((t: any) => (
      t.topicId === topicId ||
      t.lessonId?.startsWith(topicId) ||
      t.id?.includes(topicId) ||
      (t.topic && t.topic.toLowerCase().includes(cleanTitle.toLowerCase()))
    ));
    if (pool.length === 0 && cached.length > 0) pool = cached;
  }

  const practiceTasks = pool.filter((t: any) =>
    t.type !== 'theory' && !t.id?.includes('THEORY') && t.cke_source !== 'Pigułka Wiedzy'
  );

  const tasksByLesson = new Map<string, any[]>();
  practiceTasks.forEach((t: any) => {
    const lId = t.lessonId || 'general';
    if (!tasksByLesson.has(lId)) tasksByLesson.set(lId, []);
    tasksByLesson.get(lId)!.push(t);
  });

  const chosenPool: any[] = [];
  if (tasksByLesson.size > 1) {
    tasksByLesson.forEach((lessonTasks) => {
      if (chosenPool.length < 10 && lessonTasks.length > 0) chosenPool.push(lessonTasks[0]);
    });
  }

  if (chosenPool.length < 7) {
    for (const t of practiceTasks) {
      if (!chosenPool.some(cp => cp.id === t.id)) {
        chosenPool.push(t);
        if (chosenPool.length >= 7) break;
      }
    }
  }

  if (chosenPool.length === 0 && pool.length > 0) {
    chosenPool.push(...pool.slice(0, 7));
  }

  const examTasks: BossExamTask[] = chosenPool.map((chosen, idx) => ({
    id: chosen.id || `boss-task-${topicId}-${idx + 1}`,
    lessonId: chosen.lessonId || `${topicId}.${idx + 1}`,
    lessonOrder: idx + 1,
    lessonTitle: chosen.lessonTitle || chosen.title || `Zadanie ${idx + 1}`,
    topicLabel: chosen.topic || cleanTitle,
    question: chosen.question || chosen.content || '',
    options: chosen.options || [],
    correct_answer: chosen.correct_answer || chosen.correctAnswer,
    correctAnswer: chosen.correctAnswer || chosen.correct_answer,
    input_placeholder: chosen.input_placeholder,
    statements: chosen.statements,
    part_1: chosen.part_1,
    part_2: chosen.part_2,
    explanation: chosen.explanation || '',
    hint_1: chosen.hints?.level_1 || chosen.hint_1 || '',
    hint_2: chosen.hints?.level_2 || chosen.hint_2 || '',
    source: chosen.source || `Zadanie Maturalne CKE ${idx + 1}`,
    type: chosen.type || 'SINGLE_CHOICE',
    points: chosen.points || 1,
    ai_tutor_rubric: chosen.ai_tutor_rubric
  }));

  const totalQuestions = examTasks.length || 7;
  const passingScore = Math.max(1, Math.ceil(totalQuestions * 0.7));

  return {
    id: `BOSS-EXAM-${String(topicId).toUpperCase()}`,
    title: `Sprawdzian: ${cleanTitle}`,
    subtitle: `Ostateczne starcie z materiałem: ${cleanTitle}. Rozwiąż ${totalQuestions} zadań z tego działu.`,
    boss_name: `Mistrz: ${cleanTitle}`,
    boss_message: `Egzaminator czeka! Wykaż się wiedzą z działu: ${cleanTitle}. Zdobądź minimum 70%!`,
    timeLimitMinutes: Math.min(30, Math.max(15, totalQuestions * 2.5)),
    passingScore,
    totalQuestions,
    rewardXp: 200,
    rewardCoins: 100,
    badgeId: `master_${String(topicId).toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    tasks: examTasks
  };
}

/**
 * Pobiera zadania działu z Firestore i buduje egzamin działowy.
 * To preferowana droga — widoki nie mają dostępu do treści poza Firestore.
 */
export async function loadTopicBossExam(topic: any, subjectId: string): Promise<BossExamData> {
  const topicId = topic?.id;
  let tasks: any[] = [];

  if (topicId) {
    const lessons = await curriculumRepository.getTopicLessons(topicId, subjectId);
    tasks = lessons.flatMap(lesson => (lesson.tasks || []).map((task: any) => enrichTaskWithVisual({
      ...task,
      lessonId: lesson.id,
      lessonTitle: lesson.title
    }, lesson.id)));
  }

  return generateTopicBossExam(topic, tasks);
}

/** @deprecated Użyj loadTopicBossExam — wymaga identyfikatora przedmiotu. */
export function generateDzial1BossExam(tasks?: any[]): BossExamData {
  return generateTopicBossExam({ id: 'dzial-1', name: 'Liczby Rzeczywiste' }, tasks);
}
