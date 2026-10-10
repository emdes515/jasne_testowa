import { describe, it, expect } from 'vitest';
import { pickRetryTask, nextQueueIndex } from '../sessionQueue';
import { getMathLessonTaskPool } from '../../data/mathCurriculumData';

const pool = Array.from({ length: 20 }, (_, i) => ({ id: `t${i + 1}` }));

describe('Kolejka zadań sesji – zadania powtórkowe', () => {
  it('po błędzie dobiera zadanie z puli, którego nie było jeszcze w kolejce', () => {
    const queue = [pool[4], pool[7], pool[0]];
    expect(pickRetryTask(pool, queue, 't1', [])!.id).toBe('t2');
  });

  it('po wyczerpaniu puli przechodzi po nierozwiązanych zadaniach zamiast powtarzać to samo', () => {
    // symulacja: uczeń myli się w każdym zadaniu, aż cała pula 20 zadań trafi do kolejki, i myli się dalej
    const queue: { id: string }[] = pool.slice(0, 5);
    const shown: string[] = [];
    let index = 0;
    for (let step = 0; step < 60; step++) {
      const current = queue[index];
      shown.push(current.id);
      const retry = pickRetryTask(pool, queue, current.id, []);
      expect(retry, `krok ${step}`).not.toBeNull();
      queue.push(retry!);
      index = nextQueueIndex(index, queue.length);
    }
    // pierwsze 20 pozycji to cała pula bez powtórzeń
    expect(new Set(shown.slice(0, 20)).size).toBe(20);
    // potem żadne zadanie nie pojawia się dwa razy z rzędu…
    for (let i = 1; i < shown.length; i++) expect(shown[i], `pozycja ${i}`).not.toBe(shown[i - 1]);
    // …a powtórki obejmują wiele różnych zadań, nie jedno w kółko
    expect(new Set(shown.slice(20)).size).toBeGreaterThanOrEqual(15);
  });

  it('po wyczerpaniu puli pomija zadania już rozwiązane poprawnie i bieżące', () => {
    const solved = pool.slice(0, 17).map(t => t.id);
    for (let len = 20; len < 30; len++) {
      const queue = Array.from({ length: len }, (_, i) => pool[i % 20]);
      const retry = pickRetryTask(pool, queue, 't18', solved)!;
      expect(['t19', 't20']).toContain(retry.id);
    }
    // nie ma żadnego innego kandydata → null (SessionRunner powtarza wtedy bieżące zadanie)
    expect(pickRetryTask(pool, pool, 't20', pool.slice(0, 19).map(t => t.id))).toBeNull();
  });

  it('indeks nigdy nie wychodzi poza koniec kolejki', () => {
    expect(nextQueueIndex(0, 5)).toBe(1);
    expect(nextQueueIndex(4, 5)).toBe(4);
    expect(nextQueueIndex(37, 7)).toBe(6);
    expect(nextQueueIndex(0, 0)).toBe(0);
  });

  it('działa na prawdziwej puli lekcji matematyki (20 zadań o unikalnych identyfikatorach)', () => {
    const real = getMathLessonTaskPool('math-lesson-9-1');
    expect(real).toHaveLength(20);
    const queue = real.slice(0, 5);
    const seen = new Set(queue.map((t: any) => t.id));
    for (let i = 0; i < 15; i++) {
      const retry = pickRetryTask(real, queue, queue[queue.length - 1].id, [])!;
      expect(seen.has(retry.id)).toBe(false);
      seen.add(retry.id);
      queue.push(retry);
    }
    expect(seen.size).toBe(20);
  });
});
