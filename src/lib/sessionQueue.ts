/**
 * Kolejka zadań sesji (Mastery Learning) – czysta logika wydzielona z SessionRunner, żeby dało się ją testować.
 */

interface QueueTask {
  id: string;
}

/**
 * Zadanie powtórkowe po błędnej odpowiedzi.
 * 1. Najpierw zadanie z puli lekcji, którego nie było jeszcze w kolejce.
 * 2. Gdy cała pula była już w kolejce – zadanie, którego uczeń nie rozwiązał jeszcze poprawnie, inne niż bieżące
 *    (kolejne powtórki przechodzą po takich zadaniach po kolei, zamiast pokazywać w kółko to samo).
 * 3. Gdy nie ma żadnego kandydata – null (wywołujący powtarza wtedy bieżące zadanie).
 */
export function pickRetryTask<T extends QueueTask>(
  lessonPool: T[],
  queue: QueueTask[],
  currentTaskId: string | undefined,
  correctlySolvedIds: string[]
): T | null {
  const usedIds = new Set(queue.map(t => t.id));
  const unused = lessonPool.find(t => !usedIds.has(t.id));
  if (unused) return unused;

  const solved = new Set(correctlySolvedIds);
  const recyclable = lessonPool.filter(t => t.id !== currentTaskId && !solved.has(t.id));
  if (recyclable.length === 0) return null;
  return recyclable[queue.length % recyclable.length];
}

/** Indeks następnego zadania – nigdy poza koniec kolejki (inaczej wyświetlałoby się w kółko pierwsze zadanie). */
export function nextQueueIndex(currentIndex: number, queueLength: number): number {
  return Math.min(currentIndex + 1, Math.max(queueLength - 1, 0));
}
