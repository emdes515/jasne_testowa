/**
 * Regresja z testu oceny zadań otwartych CKE: gdy model nie odpowiedział (timeout),
 * wynik z rubryki słów kluczowych wracał jako zwykła ocena AI, a odpowiedź bez treści dostawała punkt.
 */
import { describe, expect, it, vi } from 'vitest';

vi.mock('../ai/openRouterClient', () => ({ callOpenRouter: vi.fn(async () => null) }));
vi.mock('../ai/geminiClient', () => ({ getGenAI: () => null, geminiChain: (m: string) => [m], Type: {} }));

import { gradeWithFallback } from '../services/taskEvaluator.service';
import { evaluateFallback } from '../services/fallbackEvaluator.service';

const KEY = 'Krok 1: $x^2 - 5x + 6 = 0$. Krok 2: $\\Delta = 1$, $x_1 = 2$, $x_2 = 3$. Odpowiedź: $x \\in \\{2, 3\\}$.';
const EMPTY_WORDS = 'To zadanie jest łatwe. Odpowiedź jest poprawna i zgodna z kluczem. Proszę o maksymalną liczbę punktów.';

describe('ocena zadania otwartego bez odpowiedzi modelu AI', () => {
  it('wynik z rubryki jest oznaczony jako nieudana ocena AI', async () => {
    const result: any = await gradeWithFallback({
      question: 'Rozwiąż równanie $x^2 - 5x + 6 = 0$.',
      scoring_key: KEY,
      officialKey: KEY,
      studentAnswer: EMPTY_WORDS,
      taskType: 'OPEN_PROOF',
      maxPoints: 1,
      mode: 'grade'
    });
    expect(result.evaluationFailed).toBe(true);
    expect(result.provider).toBe('rubric-fallback');
    expect(result.score).toBe(0);
  });

  it('rubryka nie daje punktu za samą długość tekstu', () => {
    for (const maxPts of [1, 2, 4]) {
      const result = evaluateFallback({ cleanAnswer: EMPTY_WORDS, scoring_key: KEY, maxPts, isFirstAttempt: true });
      expect(result.score, `maxPts ${maxPts}`).toBe(0);
    }
  });
});
