import { describe, expect, it } from 'vitest';
import { evaluateFallback } from '../services/fallbackEvaluator.service';

describe('fallbackEvaluator', () => {
  describe('mathematics tasks', () => {
    it('should award full points when final fraction answer is present', () => {
      const result = evaluateFallback({
        cleanAnswer: 'Wynik końcowy to \\frac{2}{5}',
        scoring_key: '2/5',
        maxPts: 2,
        isFirstAttempt: true,
      });

      expect(result.score).toBe(2);
      expect(result.isPassed).toBe(true);
      expect(result.gradeTitle).toContain('2 / 2 PKT');
    });

    it('should award partial points when step is made in proof or fractions', () => {
      const result = evaluateFallback({
        cleanAnswer: 'Wspólny mianownik to 6, więc mamy 1/6 + 3/6',
        scoring_key: 'ułamek nieskracalny 2/5',
        maxPts: 2,
        isFirstAttempt: true,
      });

      expect(result.score).toBe(1);
      // Math.ceil(2 * 0.5) is 1, so score 1 passes minimum threshold
      expect(result.isPassed).toBe(true);
    });

    it('should handle whiteboard placeholder by requiring verification without crashing', () => {
      const result = evaluateFallback({
        cleanAnswer: '[rozwiązanie odręczne na tablicy]',
        scoring_key: '4k(k+1) + 1',
        maxPts: 2,
        isFirstAttempt: true,
      });

      expect(result.score).toBe(0);
      expect(result.isPassed).toBe(false);
      expect(result.summary).toContain('trybie offline');
    });
  });

  describe('english tasks', () => {
    it('should match normalized english key answer', () => {
      const result = evaluateFallback({
        cleanAnswer: "he doesn't have",
        scoring_key: "does not have",
        maxPts: 1,
        isFirstAttempt: true,
        isEnglish: true,
      });

      expect(result.score).toBe(1);
      expect(result.isPassed).toBe(true);
    });

    it('should award 0 points for short completely wrong answer', () => {
      const result = evaluateFallback({
        cleanAnswer: 'xyz',
        scoring_key: 'looking forward to hearing',
        maxPts: 1,
        isFirstAttempt: true,
        isEnglish: true,
      });

      expect(result.score).toBe(0);
      expect(result.isPassed).toBe(false);
    });
  });
});
