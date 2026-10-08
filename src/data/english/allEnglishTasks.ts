/**
 * src/data/english/allEnglishTasks.ts
 *
 * Kompletna baza 1500 autentycznych zadań CKE z języka angielskiego (Formuła 2023)
 * podzielona na 15 Działów Egzaminacyjnych i 4 Filary Kompetencyjne CKE.
 */

import { EnglishTask, ENGLISH_SECTIONS } from '../../types/englishTypes';
import all1500EnglishTasksData from './generated/all_1500_english_tasks.json';

export const ALL_ENGLISH_TASKS: EnglishTask[] = all1500EnglishTasksData as EnglishTask[];
export const all1500EnglishTasks = ALL_ENGLISH_TASKS;
export { ENGLISH_SECTIONS };

export function getEnglishTasksBySection(sectionId: string): EnglishTask[] {
  return ALL_ENGLISH_TASKS.filter(task => task.topicId === sectionId);
}

export function getEnglishTasksByPillar(pillarId: string): EnglishTask[] {
  return ALL_ENGLISH_TASKS.filter(task => task.pillarId === pillarId);
}

export function getEnglishTaskById(taskId: string): EnglishTask | undefined {
  return ALL_ENGLISH_TASKS.find(task => task.id === taskId);
}

export function getEnglishTasksStats() {
  const bySection: Record<string, number> = {};
  const byPillar: Record<string, number> = {};

  for (const task of ALL_ENGLISH_TASKS) {
    bySection[task.topicId] = (bySection[task.topicId] || 0) + 1;
    byPillar[task.pillarId] = (byPillar[task.pillarId] || 0) + 1;
  }

  return {
    total: ALL_ENGLISH_TASKS.length,
    bySection,
    byPillar
  };
}
