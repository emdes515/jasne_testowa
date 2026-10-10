import { describe, it, expect } from 'vitest';
import {
  describeAnswerKey,
  describeStructuredAnswer,
  getStructuredKind,
  gradeStructuredAnswer,
  isStructuredAnswerComplete,
  normalizeStructuredAnswer,
  setStructuredSlot,
  toggleMultiChoice
} from '../structuredAnswer';
import { AUTHENTIC_CKE_TASKS } from '../../data/math/allMathTasks';

const trueFalse = {
  points: 1,
  correct_answer: 'PF',
  statements: [
    { id: '1', text: 'A', correct: 'P' },
    { id: '2', text: 'B', correct: 'F' }
  ]
};
const twoPart = {
  points: 1,
  correctAnswer: 'B2',
  parts: [
    { options: [{ id: 'A', text: 'rosnący' }, { id: 'B', text: 'malejący' }] },
    { prompt: 'oraz', options: [{ id: '1', text: 'm = 1' }, { id: '2', text: 'm = 2' }, { id: '3', text: 'm = 3' }] }
  ]
};
const table = {
  points: 2,
  correct_answer: 'AE',
  partScoring: 'per_part',
  parts: [1, 2].map(() => ({ options: 'ABCDE'.split('').map(id => ({ id, text: id })) }))
};
const multi = { points: 2, correct_answer: 'BF', multiSelect: 2, options: ['a', 'b', 'c', 'd', 'e', 'f'] };

describe('structuredAnswer – formaty zamknięte CKE inne niż ABCD', () => {
  it('rozpoznaje format zadania', () => {
    expect(getStructuredKind(trueFalse)).toBe('statements');
    expect(getStructuredKind(twoPart)).toBe('parts');
    expect(getStructuredKind(multi)).toBe('multi');
    expect(getStructuredKind({ options: ['a', 'b', 'c', 'd'], correct_answer: 'A' })).toBeNull();
    expect(getStructuredKind(null)).toBeNull();
  });

  it('buduje odpowiedź krok po kroku i wie, kiedy jest kompletna', () => {
    let answer = setStructuredSlot(trueFalse, '', 1, 'F');
    expect(answer).toBe('_F');
    expect(isStructuredAnswerComplete(trueFalse, answer)).toBe(false);
    answer = setStructuredSlot(trueFalse, answer, 0, 'P');
    expect(answer).toBe('PF');
    expect(isStructuredAnswerComplete(trueFalse, answer)).toBe(true);

    let picked = toggleMultiChoice(multi, '', 'F');
    picked = toggleMultiChoice(multi, picked, 'B');
    expect(picked).toBe('BF'); // zawsze w kolejności alfabetycznej, jak w kluczu
    expect(toggleMultiChoice(multi, picked, 'A')).toBe('BF'); // nie da się zaznaczyć trzeciej
    expect(toggleMultiChoice(multi, picked, 'B')).toBe('F'); // ponowne kliknięcie odznacza
    expect(normalizeStructuredAnswer(multi, 'fb')).toBe('BF');
  });

  it('prawda/fałsz i „A/B + uzasadnienie”: punkt tylko za całość', () => {
    expect(gradeStructuredAnswer(trueFalse, 'PF')).toBe(1);
    expect(gradeStructuredAnswer(trueFalse, 'PP')).toBe(0);
    expect(gradeStructuredAnswer(trueFalse, 'P_')).toBe(0);
    expect(gradeStructuredAnswer(twoPart, 'B2')).toBe(1);
    expect(gradeStructuredAnswer(twoPart, 'B3')).toBe(0);
    expect(gradeStructuredAnswer(twoPart, 'A2')).toBe(0);
  });

  it('tabela z dopasowaniem: punkt za każdą poprawną pozycję (zasady CKE)', () => {
    expect(gradeStructuredAnswer(table, 'AE')).toBe(2);
    expect(gradeStructuredAnswer(table, 'AB')).toBe(1);
    expect(gradeStructuredAnswer(table, 'CE')).toBe(1);
    expect(gradeStructuredAnswer(table, 'CB')).toBe(0);
    expect(gradeStructuredAnswer(table, '')).toBe(0);
  });

  it('wybór dwóch odpowiedzi: 2 pkt za obie poprawne, 1 pkt gdy poprawna jest dokładnie jedna (zasady CKE)', () => {
    expect(gradeStructuredAnswer(multi, 'BF')).toBe(2);
    expect(gradeStructuredAnswer(multi, 'FB')).toBe(2);
    expect(gradeStructuredAnswer(multi, 'BC')).toBe(1);
    expect(gradeStructuredAnswer(multi, 'F')).toBe(1);
    expect(gradeStructuredAnswer(multi, 'AC')).toBe(0);
    expect(gradeStructuredAnswer(multi, '')).toBe(0);
  });

  it('opisuje odpowiedź czytelnie', () => {
    expect(describeAnswerKey(trueFalse)).toBe('1 – P, 2 – F');
    expect(describeAnswerKey(twoPart)).toBe('B2');
    expect(describeAnswerKey(table)).toBe('1 – A, 2 – E');
    expect(describeAnswerKey(multi)).toBe('B oraz F');
    expect(describeStructuredAnswer(trueFalse, 'P_')).toBe('1 – P, 2 – —');
  });

  it('każde zadanie CKE w formacie strukturalnym da się rozwiązać na komplet punktów swoim kluczem', () => {
    const structured = AUTHENTIC_CKE_TASKS.filter(t => getStructuredKind(t));
    expect(structured.length).toBeGreaterThan(25);
    for (const task of structured) {
      expect(gradeStructuredAnswer(task, task.correct_answer), task.id).toBe(task.points);
      expect(isStructuredAnswerComplete(task, task.correct_answer), task.id).toBe(true);
      expect(gradeStructuredAnswer(task, ''), task.id).toBe(0);
    }
  });
});
