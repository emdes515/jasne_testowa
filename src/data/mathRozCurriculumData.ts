/**
 * mathRozCurriculumData.ts
 *
 * Matematyka na poziomie rozszerzonym (wymagania egzaminacyjne CKE od 2025 r.) dla LearnView / SessionRunnera.
 * Treść powstaje w generatorze `scripts/math_pr/` (`node scripts/math_pr/build.js`), który zapisuje:
 *   - src/data/math/generated/pr_blueprints.json (działy, lekcje, pigułki),
 *   - src/data/math/generated/pr_tasks.json      (po 20 zadań na lekcję, w tym 4 otwarte z etapami CKE).
 *
 * Lekcje są rejestrowane wyłącznie pod identyfikatorami `math-pr-lesson-X-Y` (i z prefiksem działu),
 * żeby nie kolidowały z kluczami kursu PP typu "5.1" albo "lesson-5-1".
 */

import { TopicDocument, LessonDocument, LessonMetadataItem } from '../schema_firestore';
import rawTasks from './math/generated/pr_tasks.json';
import rawBlueprints from './math/generated/pr_blueprints.json';
import { normalizeMathTaskForRunner, MathTopicBlueprint, MathLessonDefinition, MATH_LESSON_SESSION_SIZE } from './mathCurriculumData';

export const MATH_ROZ_SUBJECT_ID = 'matematyka-rozszerzona';

type MathRozLessonDefinition = MathLessonDefinition & { requirements?: string[]; prereq?: string[] };
type MathRozTopicBlueprint = Omit<MathTopicBlueprint, 'lessons'> & { cke_stats?: string; lessons: MathRozLessonDefinition[] };

const MATH_ROZ_BLUEPRINTS = rawBlueprints as unknown as MathRozTopicBlueprint[];

const tasksByLesson: Record<string, any[]> = {};
(rawTasks as any[]).forEach(task => {
  (tasksByLesson[task.lessonId] ||= []).push(task);
});

const MATH_ROZ_LESSON_DOCUMENTS: Map<string, LessonDocument> = new Map();

export const MATH_ROZ_CURRICULUM_TOPICS: TopicDocument[] = MATH_ROZ_BLUEPRINTS.map(bp => {
  const topicTasks: any[] = [];
  const lessonsMetadata: LessonMetadataItem[] = bp.lessons.map(l => {
    const pool = (tasksByLesson[l.id] || []).map(t => ({
      ...normalizeMathTaskForRunner(t, l.id, bp.id),
      cke_tag: `Lekcja ${t.lessonKey}`,
      badge: `Lekcja ${t.lessonKey}`
    }));
    topicTasks.push(...pool);

    const lessonDoc: LessonDocument = {
      id: l.id,
      topic_id: bp.id,
      title: l.title,
      theory_pill: l.theory_pill,
      tasks: pool,
      required_correct_tasks: Math.min(3, pool.length || 3),
      estimated_time_formatted: l.estimated_time_formatted,
      requirements: l.requirements,
      prereq: l.prereq
    };
    MATH_ROZ_LESSON_DOCUMENTS.set(l.id, lessonDoc);
    MATH_ROZ_LESSON_DOCUMENTS.set(`${bp.id}/${l.id}`, lessonDoc);
    MATH_ROZ_LESSON_DOCUMENTS.set(`${MATH_ROZ_SUBJECT_ID}/${bp.id}/${l.id}`, lessonDoc);

    return {
      id: l.id,
      order: l.order,
      title: l.title,
      short_title: l.short_title,
      badge: l.badge,
      tasks_count: Math.min(MATH_LESSON_SESSION_SIZE, pool.length),
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
    subject_id: MATH_ROZ_SUBJECT_ID,
    lessons_metadata: lessonsMetadata,
    tasks: topicTasks
  } as TopicDocument;
});

export function isMathRozLessonId(lessonId?: string, topicId?: string): boolean {
  return String(lessonId || '').startsWith('math-pr-') || String(topicId || '').startsWith('pr-dzial-');
}

export function getMathRozLessonDocument(topicId?: string, lessonId?: string): LessonDocument | null {
  if (!lessonId) return null;
  const cleanId = String(lessonId).trim();
  return (
    MATH_ROZ_LESSON_DOCUMENTS.get(cleanId) ||
    (topicId ? MATH_ROZ_LESSON_DOCUMENTS.get(`${topicId}/${cleanId}`) : null) ||
    null
  );
}
