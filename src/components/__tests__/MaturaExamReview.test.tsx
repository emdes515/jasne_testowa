// @vitest-environment happy-dom
/**
 * Ekran wyników arkusza (MaturaExamReview) dla wszystkich 6 autentycznych arkuszy CKE.
 * Regresja: rozwinięcie zadania, którego odpowiedzi są rysunkami / osiami liczbowymi (maj 2024, zad. 1),
 * wywalało aplikację, a formaty inne niż ABCD nie miały swojego widoku.
 */
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MaturaExamReview, MaturaTaskReviewItem } from '../MaturaExamReview';
import { getBundledCkeExamSheet } from '../../data/math/ckeExamTasks';
import { describeAnswerKey, describeStructuredAnswer, getAnswerKey, getStructuredKind, gradeStructuredAnswer } from '../../lib/structuredAnswer';

const EXAMS = ['matura-maj-2024', 'matura-czerwiec-2024', 'matura-sierpien-2024', 'matura-maj-2023', 'matura-czerwiec-2023', 'matura-sierpien-2023'];

afterEach(cleanup);

/** Pozycje podsumowania zbudowane tak samo jak w MaturaSimulatorView po oddaniu arkusza. */
function buildReview(examId: string, answerOf: (task: any) => string | undefined): MaturaTaskReviewItem[] {
  return getBundledCkeExamSheet(examId).map((t: any) => {
    const userAns = t.isClosed ? answerOf(t) : undefined;
    const structured = Boolean(getStructuredKind(t));
    const earned = !t.isClosed ? 0 : structured ? gradeStructuredAnswer(t, userAns) : userAns === t.correctAnswer ? t.points : 0;
    return {
      id: t.id,
      section: t.section,
      content: t.content,
      options: t.options,
      correctAnswer: structured ? describeAnswerKey(t) : t.correctAnswer,
      points: t.points,
      isClosed: t.isClosed,
      explanation: t.explanation,
      userAnswer: structured && userAns ? describeStructuredAnswer(t, userAns) : userAns,
      userPointsEarned: earned,
      sourceTask: t,
      rawUserAnswer: userAns
    };
  });
}

function expandEveryRow(container: HTMLElement, count: number) {
  for (let i = 0; i < count; i++) {
    const rows = Array.from(container.querySelectorAll('button')).filter(b => /Zadanie \d/.test(b.textContent || '') && /pkt/.test(b.textContent || ''));
    expect(rows.length, 'liczba wierszy').toBe(count);
    fireEvent.click(rows[i]);
    const text = container.textContent || '';
    expect(text, `wiersz ${i + 1}: rozwiązanie`).toContain('Krok 1');
    expect(container.querySelector('.katex-error'), `wiersz ${i + 1}: błąd KaTeX`).toBeNull();
    fireEvent.click(rows[i]);
  }
}

describe('Ekran wyników arkusza CKE', () => {
  it.each(EXAMS)('%s: każde zadanie rozwija się z kluczem i rozwiązaniem (pusty arkusz)', examId => {
    const review = buildReview(examId, () => undefined);
    expect(review.reduce((s, t) => s + t.points, 0)).toBe(46);
    const { container } = render(<MaturaExamReview tasks={review} timeSpentSeconds={0} onRetryMistakes={() => {}} onBackToMenu={() => {}} />);
    expect(container.textContent).toContain('0 / 46 pkt');
    expandEveryRow(container, review.length);
  }, 120_000);

  it.each(EXAMS)('%s: komplet poprawnych odpowiedzi zamkniętych daje pełną punktację tych zadań', examId => {
    const review = buildReview(examId, t => (getStructuredKind(t) ? getAnswerKey(t) : t.correctAnswer));
    const closedPoints = review.filter(t => t.isClosed).reduce((s, t) => s + t.points, 0);
    expect(review.reduce((s, t) => s + t.userPointsEarned, 0)).toBe(closedPoints);
    const { container } = render(<MaturaExamReview tasks={review} timeSpentSeconds={0} onRetryMistakes={() => {}} onBackToMenu={() => {}} />);
    expect(container.textContent).toContain(`${closedPoints} / 46 pkt`);
    expandEveryRow(container, review.length);
  }, 120_000);

  it('formaty inne niż ABCD pokazują klucz, a zadanie z osiami liczbowymi w odpowiedziach rysuje osie', () => {
    const review = buildReview('matura-maj-2024', t => (getStructuredKind(t) ? getAnswerKey(t) : t.correctAnswer));
    const { container } = render(<MaturaExamReview tasks={review} timeSpentSeconds={0} onRetryMistakes={() => {}} onBackToMenu={() => {}} />);
    const rows = () => Array.from(container.querySelectorAll('button')).filter(b => /Zadanie \d/.test(b.textContent || '') && /pkt/.test(b.textContent || ''));

    // zadanie 1: cztery odpowiedzi są osiami liczbowymi – wcześniej rozwinięcie kończyło się wyjątkiem
    expect((review[0].options as any[]).every(o => o && typeof o === 'object' && o.numberLine)).toBe(true);
    fireEvent.click(rows()[0]);
    expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(4);
    expect(container.textContent).toContain('Poprawna');
    fireEvent.click(rows()[0]);

    const structuredIdx = review.map((t, i) => (getStructuredKind(t.sourceTask) ? i : -1)).filter(i => i >= 0);
    expect(structuredIdx.length).toBeGreaterThanOrEqual(4);
    for (const i of structuredIdx) {
      fireEvent.click(rows()[i]);
      expect(container.querySelector('[data-testid^="structured"]'), `zadanie ${i + 1}`).not.toBeNull();
      expect(container.textContent, `zadanie ${i + 1}`).toContain('Poprawna odpowiedź:');
      fireEvent.click(rows()[i]);
    }
  }, 120_000);

  it('punkty cząstkowe: w zadaniu „wybierz dwie” jedna trafiona odpowiedź daje 1 z 2 punktów', () => {
    const multi = EXAMS.flatMap(id => getBundledCkeExamSheet(id)).filter((t: any) => getStructuredKind(t) === 'multi') as any[];
    expect(multi.length).toBeGreaterThan(0);
    for (const t of multi) {
      const key = getAnswerKey(t);
      const wrongLetter = 'ABCDEF'.split('').find(l => !key.includes(l))!;
      expect(gradeStructuredAnswer(t, key), t.id).toBe(t.points);
      expect(gradeStructuredAnswer(t, [key[0], wrongLetter].sort().join('')), t.id).toBe(1);
      expect(gradeStructuredAnswer(t, ''), t.id).toBe(0);
    }
  });
});
