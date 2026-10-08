import {
  ALL_ENGLISH_TASKS,
  ENGLISH_TASKS_PILLAR_1,
  ENGLISH_TASKS_PILLAR_2,
  ENGLISH_TASKS_PILLAR_3,
  ENGLISH_TASKS_PILLAR_4,
  getEnglishTasksByPillar,
  getEnglishTasksByTopic,
  getEnglishTasksByLesson,
  EnglishTask
} from './englishTasksPillars';
import { ENGLISH_LESSONS, getEnglishLessonById, EnglishLessonData } from './englishLessonsData';

export {
  ALL_ENGLISH_TASKS,
  ENGLISH_TASKS_PILLAR_1,
  ENGLISH_TASKS_PILLAR_2,
  ENGLISH_TASKS_PILLAR_3,
  ENGLISH_TASKS_PILLAR_4,
  getEnglishTasksByPillar,
  getEnglishTasksByTopic,
  getEnglishTasksByLesson,
  ENGLISH_LESSONS,
  getEnglishLessonById
};
export type { EnglishTask, EnglishLessonData };

export interface EnglishStatsSummary {
  totalTasks: number;
  pillar1Count: number;
  pillar2Count: number;
  pillar3Count: number;
  pillar4Count: number;
  lessonsCount: number;
}

export function getEnglishDatabaseStats(): EnglishStatsSummary {
  return {
    totalTasks: ALL_ENGLISH_TASKS.length,
    pillar1Count: ENGLISH_TASKS_PILLAR_1.length,
    pillar2Count: ENGLISH_TASKS_PILLAR_2.length,
    pillar3Count: ENGLISH_TASKS_PILLAR_3.length,
    pillar4Count: ENGLISH_TASKS_PILLAR_4.length,
    lessonsCount: ENGLISH_LESSONS.length
  };
}
