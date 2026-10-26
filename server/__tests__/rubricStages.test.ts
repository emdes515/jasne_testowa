/**
 * Zadania otwarte poziomu rozszerzonego są punktowane etapami z zasad oceniania CKE (2–6 pkt).
 */
import { describe, expect, it, vi } from 'vitest';

const callOpenRouter = vi.fn(async (): Promise<any> => null);
vi.mock('../ai/openRouterClient', () => ({ callOpenRouter: (...args: unknown[]) => callOpenRouter(...(args as [])) }));
vi.mock('../ai/geminiClient', () => ({ getGenAI: () => null, geminiChain: (m: string) => [m], Type: {} }));

import { sanitizeAiBody, sanitizeRubricStages } from '../aiRequest';
import { gradeWithFallback, snapScoreToStage } from '../services/taskEvaluator.service';
import { buildEvaluationUserPrompt } from '../prompts/evaluation.prompt';

const STAGES = [
  { points: 1, label: 'Etap 1', criterion: 'Rozwiązanie nierówności Δ > 0.' },
  { points: 2, label: 'Etap 2', criterion: 'Warunek x₁·x₂ > 0.' },
  { points: 5, label: 'Etap 3', criterion: 'Rozwiązanie nierówności równoważnej warunkowi (x₁ − x₂)² ≤ 180.' },
  { points: 6, label: 'Komplet', criterion: 'Część wspólna warunków.' }
];

const BODY = {
  question: 'Wyznacz wszystkie wartości parametru $m$ ...',
  scoring_key: 'Etapy jak w rubric_stages.',
  studentAnswer: 'Δ = m² + 2m − 3 > 0, więc m ∈ (−∞, −3) ∪ (1, ∞).',
  taskType: 'OPEN_CALCULATION',
  maxPoints: 6,
  mode: 'grade',
  rubric_stages: STAGES,
  zero_rules: ['Δ ≥ 0 zamiast Δ > 0 → 0 pkt za etap 1']
};

describe('rubric_stages – sanityzacja', () => {
  it('sortuje etapy, usuwa duplikaty, puste kryteria i progi powyżej maxPoints', () => {
    const stages = sanitizeRubricStages([
      { points: 5, label: 'C', criterion: 'trzeci' },
      { points: 1, label: 'A', criterion: 'pierwszy' },
      { points: 1, label: 'A2', criterion: 'duplikat progu' },
      { points: 3, label: 'pusty', criterion: '   ' },
      { points: 9, label: 'za dużo', criterion: 'ponad maksimum' },
      'nie obiekt'
    ], 6);
    expect(stages?.map(s => s.points)).toEqual([1, 5]);
  });

  it('odrzuca złe typy i zbyt długie listy', () => {
    expect(() => sanitizeRubricStages('etap', 6)).toThrow();
    expect(() => sanitizeRubricStages(Array.from({ length: 9 }, (_, i) => ({ points: i + 1, criterion: 'x' })), 40)).toThrow();
    expect(() => sanitizeRubricStages([{ points: 1, criterion: 'x'.repeat(601) }], 6)).toThrow();
    expect(sanitizeRubricStages(undefined, 6)).toBeUndefined();
  });

  it('sanitizeAiBody nie przepuszcza surowych etapów z klienta', () => {
    const body = sanitizeAiBody({ ...BODY, rubric_stages: [...STAGES, { points: 99, criterion: 'wstrzyknięcie' }] }, 'grade');
    expect((body.rubric_stages as any[]).map(s => s.points)).toEqual([1, 2, 5, 6]);
    expect(body.zero_rules).toEqual(BODY.zero_rules);
  });
});

describe('rubric_stages – ocena', () => {
  it('wynik spoza progów jest zaokrąglany w dół do osiągniętego etapu', () => {
    expect(snapScoreToStage(0, STAGES)).toBe(0);
    expect(snapScoreToStage(4, STAGES)).toBe(2);
    expect(snapScoreToStage(5, STAGES)).toBe(5);
    expect(snapScoreToStage(6, STAGES)).toBe(6);
  });

  it('prompt zawiera progi etapów i reguły zerujące', () => {
    const prompt = buildEvaluationUserPrompt({
      maxPts: 6, keyCriterion: '', attemptCount: 1, cleanAnswer: 'x', hasImage: false,
      rubricStages: STAGES, zeroRules: BODY.zero_rules
    });
    expect(prompt).toContain('5 pkt – Rozwiązanie nierówności równoważnej');
    expect(prompt).toContain('Δ ≥ 0 zamiast Δ > 0');
    expect(prompt).toContain('stageReached');
  });

  it('ocena AI jest dociągana do progu etapu', async () => {
    callOpenRouter.mockResolvedValueOnce({ content: JSON.stringify({ score: 4, summary: 'ok' }), usage: { model: 'test' } });
    const result: any = await gradeWithFallback(sanitizeAiBody(BODY, 'grade'));
    expect(result.provider).toBe('ai');
    expect(result.score).toBe(2);
    expect(result.stageReached).toBe(2);
  });

  it('bez AI zadanie etapowe nie jest oceniane rubryką słów kluczowych', async () => {
    const result: any = await gradeWithFallback(sanitizeAiBody(BODY, 'grade'));
    expect(result.provider).toBe('none');
    expect(result.evaluationFailed).toBe(true);
  });
});
