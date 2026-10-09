import { PART1_JEZYK_W_UZYCIU_TASKS } from './part1_jezyk_w_uzyciu';
import { PART2_TEST_HISTORYCZNY_TASKS } from './part2_test_historyczny';
import { PART3_WYPRACOWANIE_TASKS } from './part3_wypracowanie';
import { Task800Item } from './types';

export const ALL_POLISH_TASKS_800: Task800Item[] = [
  ...PART1_JEZYK_W_UZYCIU_TASKS,
  ...PART2_TEST_HISTORYCZNY_TASKS,
  ...PART3_WYPRACOWANIE_TASKS
];

export function getTasksForLesson(lessonId: string): Task800Item[] {
  return ALL_POLISH_TASKS_800.filter((t: any) => t.lessonId === lessonId || t.tags?.includes(lessonId));
}

export function resetLessonTasks(_lessonId?: string): void {
  // no-op reset helper
}

export function shuffleTaskOptions<T extends { options?: any }>(task: T): T {
  if (!Array.isArray(task.options) || task.options.length <= 1) return task;
  const shuffled = [...task.options].sort(() => 0.5 - Math.random());
  return { ...task, options: shuffled };
}

export function getTargetCounts(): Record<string, number> {
  return {
    part1: PART1_JEZYK_W_UZYCIU_TASKS.length,
    part2: PART2_TEST_HISTORYCZNY_TASKS.length,
    part3: PART3_WYPRACOWANIE_TASKS.length,
    total: ALL_POLISH_TASKS_800.length
  };
}
