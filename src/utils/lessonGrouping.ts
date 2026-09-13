/**
 * Pomocnicze funkcje grupowania lekcji i weryfikacji postępu
 * Wydzielone z LearnView, aby umożliwić pełne rozbicie na lazy chunk (code-splitting).
 */

export interface LessonGroup {
  id: string;
  name: string;
  badge: string;
  tasks: any[];
  estimated_time_formatted?: string;
  estimated_time_minutes?: number;
  required_correct_tasks?: number;
}

const LESSON_EXPLICIT_DURATIONS: Record<string, string> = {
  '1.1': '~5 min',
  '1.2': '~6 min',
  '1.3': '~6 min',
  '1.4': '~5 min',
  '1.5': '~6 min',
  '1.6': '~7 min',
  '1.7': '~8 min',
};

export function cleanLessonTitle(title?: string): string {
  if (!title) return '';
  return title
    .replace(/^(?:Lekcja\s+)?(?:\d+[-.]\d+)\s*[:.]\s*/i, '')
    .replace(/^★\s*/i, '')
    .trim();
}

export function formatLessonDuration(group: LessonGroup): string {
  const isSprawdzian = group.id.includes('SPRAWDZIAN') || group.name.toLowerCase().includes('sprawdzian');
  if (isSprawdzian) {
    return '~15–20 min';
  }

  if (group.estimated_time_formatted) {
    return group.estimated_time_formatted;
  }

  if (group.estimated_time_minutes) {
    return `~${group.estimated_time_minutes} min`;
  }

  const cleanIdMatch = group.id.match(/(?:lesson-)?(\d+)[-.](\d+)/i) || group.badge.match(/(\d+)\.(\d+)/);
  if (cleanIdMatch) {
    const key = `${cleanIdMatch[1]}.${cleanIdMatch[2]}`;
    if (LESSON_EXPLICIT_DURATIONS[key]) {
      return LESSON_EXPLICIT_DURATIONS[key];
    }
  }

  return '~6 min';
}

export function isTaskCompletedInLesson(
  task: any,
  completedTasks: string[],
  lessonTasks: any[] = []
): boolean {
  if (!task) return false;
  if (completedTasks.includes(task.id)) return true;

  const isTheory = task.id?.includes('THEORY') || task.type === 'theory' || task.cke_source === 'Pigułka Wiedzy';
  if (isTheory && lessonTasks && lessonTasks.length > 1) {
    const practiceTasks = lessonTasks.filter(t => !t.id?.includes('THEORY') && t.type !== 'theory' && t.cke_source !== 'Pigułka Wiedzy');
    if (practiceTasks.length > 0 && practiceTasks.some(t => completedTasks.includes(t.id))) {
      return true;
    }
  }
  return false;
}

export function isLessonCompleted(
  group: LessonGroup, 
  completedTasks: string[], 
  userState?: any
): boolean {
  if (!group) return false;
  const cleanId = group.id.replace(/^(?:pol|eng|mat-roz|math-roz|eng-roz)?[-_]?lesson[-_]?/i, '');
  const dotId = cleanId.replace('-', '.');
  const dashId = `lesson-${dotId.replace('.', '-')}`;
  const polDashId = `pol-lesson-${dotId.replace('.', '-')}`;
  const engDashId = `eng-lesson-${dotId.replace('.', '-')}`;
  const matRozDashId = `mat-roz-lesson-${dotId.replace('.', '-')}`;
  const engRozDashId = `eng-roz-lesson-${dotId.replace('.', '-')}`;

  const userCompletedLessons: string[] = userState?.completed_lessons || [];
  const userCompletedMap = userState?.completedLessons || userState?.progress?.completedLessons || {};

  if (
    userCompletedLessons.includes(group.id) ||
    userCompletedLessons.includes(cleanId) ||
    userCompletedLessons.includes(dotId) ||
    userCompletedLessons.includes(dashId) ||
    userCompletedLessons.includes(polDashId) ||
    userCompletedLessons.includes(engDashId) ||
    userCompletedLessons.includes(matRozDashId) ||
    userCompletedLessons.includes(engRozDashId) ||
    userCompletedMap[group.id]?.status === 'COMPLETED' ||
    userCompletedMap[dotId]?.status === 'COMPLETED' ||
    userCompletedMap[cleanId]?.status === 'COMPLETED' ||
    userCompletedMap[dashId]?.status === 'COMPLETED' ||
    userCompletedMap[polDashId]?.status === 'COMPLETED' ||
    userCompletedMap[engDashId]?.status === 'COMPLETED'
  ) {
    return true;
  }

  if (
    completedTasks.includes(`LESSON-${group.id}`) ||
    completedTasks.includes(`LESSON-${cleanId}`) ||
    completedTasks.includes(`LESSON-${dotId}`) ||
    completedTasks.includes(`LESSON-${dashId}`) ||
    completedTasks.includes(`LESSON-${polDashId}`) ||
    completedTasks.includes(`LESSON-${engDashId}`) ||
    completedTasks.includes(`LESSON-${matRozDashId}`) ||
    completedTasks.includes(`LESSON-${engRozDashId}`) ||
    completedTasks.includes(`LESSON-${group.id.toLowerCase()}`) ||
    completedTasks.includes(group.id) ||
    completedTasks.includes(cleanId) ||
    completedTasks.includes(dotId) ||
    completedTasks.includes(polDashId) ||
    completedTasks.includes(engDashId)
  ) {
    return true;
  }

  if (!group.tasks || group.tasks.length === 0) return false;
  return group.tasks.every(task => isTaskCompletedInLesson(task, completedTasks, group.tasks));
}

export function isLessonUnlocked(
  _groupIdx: number,
  _allGroups: LessonGroup[],
  _completedTasks: string[],
  _userState?: any
): boolean {
  return true;
}

export function getLockRequirementLabel(prevGroup?: LessonGroup): string {
  if (!prevGroup) return 'poprzedniej lekcji';
  const rawBadge = (prevGroup.badge || '').trim();
  if (!rawBadge) return 'poprzedniej lekcji';
  
  if (/sprawdzian/i.test(rawBadge)) {
    return 'Sprawdzianu';
  }
  
  const numOrSub = rawBadge.replace(/^lekcja[\s\u00a0:]*/i, '').trim();
  if (numOrSub) {
    return `Lekcji ${numOrSub}`;
  }
  return 'poprzedniej lekcji';
}

export function getLessonsForTopic(topic: any): LessonGroup[] {
  if (!topic) return [];
  
  if (topic.lessons_metadata && Array.isArray(topic.lessons_metadata) && topic.lessons_metadata.length > 0) {
    return topic.lessons_metadata.map((meta: any) => {
      const rawTitle = meta.name || meta.title || '';
      const isSprawdzian = rawTitle.toLowerCase().includes('sprawdzian') || String(meta.id).toLowerCase().includes('sprawdzian');
      const cleanId = String(meta.id).replace(/^(?:pol|eng|mat-roz|math-roz|eng-roz)?[-_]?lesson[-_]?/i, '').replace('-', '.');
      const cleanName = cleanLessonTitle(rawTitle);
      const formattedBadge = isSprawdzian ? 'Sprawdzian' : (meta.badge && !meta.badge.includes('lesson-') ? meta.badge : `Lekcja ${cleanId}`);
      return {
        id: String(meta.id),
        name: cleanName,
        badge: formattedBadge,
        tasks: meta.tasks || [],
        estimated_time_formatted: meta.estimated_time_formatted || '~5 min',
        estimated_time_minutes: meta.estimated_time_minutes || 5,
        required_correct_tasks: meta.required_points || meta.required_correct_tasks || 3
      };
    });
  }

  if (topic.lessons && Array.isArray(topic.lessons) && topic.lessons.length > 0) {
    return topic.lessons.map((lesson: any) => {
      const lessonTasks = (topic.tasks || []).filter((t: any) => String(t.lessonId) === String(lesson.id));
      const rawTitle = lesson.name || lesson.title || '';
      const isSprawdzian = rawTitle.toLowerCase().includes('sprawdzian') || String(lesson.id).toLowerCase().includes('sprawdzian');
      const cleanId = String(lesson.id).replace(/^(?:pol|eng|mat-roz|math-roz|eng-roz)?[-_]?lesson[-_]?/i, '').replace('-', '.');
      const cleanName = cleanLessonTitle(rawTitle);
      const formattedBadge = isSprawdzian ? 'Sprawdzian' : (lesson.badge && !lesson.badge.includes('lesson-') ? lesson.badge : `Lekcja ${cleanId}`);
      return {
        id: String(lesson.id),
        name: cleanName,
        badge: formattedBadge,
        tasks: (lesson.tasks && lesson.tasks.length > 0) ? lesson.tasks : lessonTasks,
        estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
        estimated_time_minutes: lesson.estimated_time_minutes || 5,
        required_correct_tasks: lesson.required_correct_tasks || lesson.required_points || 3
      };
    });
  }
  
  return [];
}
