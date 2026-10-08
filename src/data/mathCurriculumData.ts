/**
 * mathCurriculumData.ts
 * 
 * 21 Oficjalnych Działów CKE Matematyki Podstawowej (Formuła 2023)
 * z pełnym kurikulum Core-4 Bento dla silnika nauki LearnView (Trophy Road),
 * autentycznymi mikrolekcjami oraz bazą 1500 zweryfikowanych zadań CKE
 * jako źródłem egzaminów, sprawdzianów bossa i maratonu.
 */

import { TopicDocument, LessonDocument, LessonMetadataItem } from '../schema_firestore';
import { LessonTheoryPill } from '../types';
import rawGeneratedTasks from './math/generated/all_1500_tasks.json';
import { enrichTaskWithVisual } from './mathVisualRegistry';
import raw21Data from './math/math21Curriculum.json';

export interface MathLessonDefinition {
  id: string;
  order: number;
  title: string;
  short_title: string;
  badge: string;
  archetypeCode: string;
  estimated_time_formatted: string;
  theory_pill: LessonTheoryPill;
  tasks?: any[];
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
  lessons: MathLessonDefinition[];
}

export const MATH_TOPIC_BLUEPRINTS: MathTopicBlueprint[] = raw21Data.topics as MathTopicBlueprint[];

export function getMathTopicBlueprint(topicId: string): MathTopicBlueprint | undefined {
  return MATH_TOPIC_BLUEPRINTS.find(b => 
    b.id === topicId || 
    b.numericId === parseInt(String(topicId).replace(/\D/g, '') || '0', 10)
  );
}

export function getAllMathTopicBlueprints(): MathTopicBlueprint[] {
  return MATH_TOPIC_BLUEPRINTS;
}

// Mapa archetypów z bazy 1500 zadań CKE
const tasksByArchetype: Record<string, any[]> = {};
(rawGeneratedTasks as any[]).forEach(t => {
  const code = t.archetypeCode || t.archetype || 'ARCH-01';
  if (!tasksByArchetype[code]) tasksByArchetype[code] = [];
  tasksByArchetype[code].push(t);
});

export function normalizeMathTaskForRunner(task: any, lessonId: string, topicId: string): any {
  const norm = {
    ...task,
    id: task.id || `gen-${Math.random().toString(36).substring(2, 9)}`,
    lessonId,
    topicId,
    type: task.type === 'SINGLE_CHOICE' ? 'SINGLE_CHOICE' : (task.type || 'SINGLE_CHOICE'),
    question: task.content || task.question || task.title || '',
    statement: task.content || task.question || task.title || '',
    options: Array.isArray(task.options) ? task.options : [],
    correct_answer: task.correctAnswer || task.correct_answer || 'A',
    correctAnswer: task.correctAnswer || task.correct_answer || 'A',
    explanation: task.explanation || '',
    explanation_steps: task.explanation ? [task.explanation] : [],
    matura_tip: task.matura_tip || task.tip || 'Zwróć uwagę na założenia i dziedzinę zadania.',
    points: task.points || 1,
    source: 'CKE Formuła 2023 (Baza 1500 Zadań)',
    isClosed: task.isClosed !== undefined ? task.isClosed : (task.type === 'SINGLE_CHOICE' || !task.type)
  };

  return enrichTaskWithVisual(norm, topicId);
}

export const MATH_LESSON_DOCUMENTS: Map<string, LessonDocument> = new Map();

/**
 * 21 Oficjalnych Działów CKE Matematyki Podstawowej
 */
export const MATH_CURRICULUM_TOPICS: TopicDocument[] = MATH_TOPIC_BLUEPRINTS.map(bp => {
  const topicTasksAll: any[] = [];

  const lessonsMetadata: LessonMetadataItem[] = bp.lessons.map(l => {
    const rawLessonTasks = (l.tasks && l.tasks.length > 0) ? l.tasks : (tasksByArchetype[l.archetypeCode] || []);
    const normalizedLessonTasks = rawLessonTasks.map((t, idx) => 
      normalizeMathTaskForRunner(t, l.id, bp.id)
    );

    const sessionTasks = normalizedLessonTasks.slice(0, 5);
    sessionTasks.forEach(st => topicTasksAll.push(st));

    const lessonDoc: LessonDocument = {
      id: l.id,
      topic_id: bp.id,
      title: l.title,
      theory_pill: l.theory_pill,
      tasks: sessionTasks,
      required_correct_tasks: Math.min(3, sessionTasks.length),
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
      tasks_count: sessionTasks.length,
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
 * Generuje Boss Exam dla wybranego działu Matematyki (1 z 21 działów CKE)
 * z bazy 1500 zadań zweryfikowanych CKE.
 */
export function loadMathTopicBossExam(topicId: string, topicTitle?: string): any {
  const bp = MATH_TOPIC_BLUEPRINTS.find(b => 
    b.id === topicId || 
    b.numericId === parseInt(String(topicId).replace(/\D/g, '') || '1', 10)
  ) || MATH_TOPIC_BLUEPRINTS[0];

  // Zbierz zadania ze wszystkich lekcji/archetypów tego działu
  const topicArchetypes = bp.lessons.map(l => l.archetypeCode);
  const candidatePool: any[] = [];
  topicArchetypes.forEach(arch => {
    const list = tasksByArchetype[arch] || [];
    candidatePool.push(...list);
  });

  const available = candidatePool.length > 0 ? candidatePool : (rawGeneratedTasks as any[]);
  // Wymieszaj i wybierz 5 zadań
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  const chosen = shuffled.slice(0, 5);

  const examTasks = chosen.map((t, idx) => {
    const norm = normalizeMathTaskForRunner(t, `${bp.id}-boss`, bp.id);
    return {
      id: norm.id || `boss-math-${bp.id}-${idx + 1}`,
      lessonId: `${bp.id}.${idx + 1}`,
      lessonOrder: idx + 1,
      lessonTitle: norm.title || `Zadanie ${idx + 1}`,
      topicLabel: `${bp.short_title} • Zadanie ${idx + 1}`,
      question: norm.question || norm.title || '',
      type: norm.type || 'SINGLE_CHOICE',
      points: norm.points || 1,
      options: norm.options || [],
      correctAnswer: norm.correctAnswer || 'A',
      explanation: norm.explanation || 'Szczegółowe rozwiązanie krok po kroku w karcie odpowiedzi.',
      matura_tip: norm.matura_tip || 'Uważaj na pułapki CKE.',
      isCke: true
    };
  });

  return {
    examId: `boss-exam-${bp.id}`,
    title: `Sprawdzian z Działu: ${bp.title}`,
    topicId: bp.id,
    topicTitle: topicTitle || bp.title,
    tasks: examTasks,
    totalPoints: examTasks.reduce((sum: number, t: any) => sum + (t.points || 1), 0),
    timeLimitMinutes: 25,
    passingScorePercent: 60
  };
}
