import { PolishTask, PolishEpoch, PolishPartNumber } from '../../types/maturaTypes';
import { POLISH_TASKS_PART_1 } from './polishTasksPart1';
import { POLISH_TASKS_PART_2 } from './polishTasksPart2';
import { POLISH_TASKS_PART_3 } from './polishTasksPart3';

export const ALL_POLISH_TASKS: PolishTask[] = [
  ...POLISH_TASKS_PART_1,
  ...POLISH_TASKS_PART_2,
  ...POLISH_TASKS_PART_3,
];

export const POLISH_EPOCHS: PolishEpoch[] = [
  'Starożytność i Biblia',
  'Średniowiecze',
  'Renesans',
  'Barok',
  'Oświecenie',
  'Romantyzm',
  'Pozytywizm',
  'Młoda Polska',
  'Dwudziestolecie międzywojenne',
  'Wojna i okupacja',
  'Współczesność',
];

export function getPolishTasksByPart(part: PolishPartNumber): PolishTask[] {
  return ALL_POLISH_TASKS.filter((task) => task.part === part);
}

export function getPolishTasksByEpoch(epoch: PolishEpoch): PolishTask[] {
  return ALL_POLISH_TASKS.filter((task) => task.epoch === epoch);
}

export function getPolishTasksByLektura(lekturaName: string): PolishTask[] {
  return ALL_POLISH_TASKS.filter(
    (task) => task.lektura && task.lektura.toLowerCase().includes(lekturaName.toLowerCase())
  );
}

export interface PolishStatsSummary {
  totalTasks: number;
  part1Count: number;
  part2Count: number;
  part3Count: number;
  starReadingsCount: number;
  epochsCovered: number;
}

export function getPolishDatabaseStats(): PolishStatsSummary {
  return {
    totalTasks: ALL_POLISH_TASKS.length,
    part1Count: POLISH_TASKS_PART_1.length,
    part2Count: POLISH_TASKS_PART_2.length,
    part3Count: POLISH_TASKS_PART_3.length,
    starReadingsCount: ALL_POLISH_TASKS.filter((t) => t.isStarRequired).length,
    epochsCovered: POLISH_EPOCHS.length,
  };
}

/**
 * Generuje zbalansowany arkusz próbny Formuły 2023:
 * - Część 1: Język w użyciu (zadania zamknięte, otwarte, konfrontacja + notatka syntetyzująca za 4 pkt)
 * - Część 2: Test historycznoliteracki (chronologiczny dobór epok od antyku po współczesność)
 * - Część 3: Wypracowanie (wybór 1 z tematów CKE z konspektem)
 */
export function generateMockExam(): {
  part1Tasks: PolishTask[];
  part2Tasks: PolishTask[];
  essayTask: PolishTask;
} {
  const part1 = POLISH_TASKS_PART_1.slice(0, 6);
  const part2 = POLISH_TASKS_PART_2.slice(0, 8);
  const essay = POLISH_TASKS_PART_3.find((t) => t.taskType === 'essay_blueprint') || POLISH_TASKS_PART_3[0];

  return {
    part1Tasks: part1,
    part2Tasks: part2,
    essayTask: essay,
  };
}

export * from './polishLessonsData';
