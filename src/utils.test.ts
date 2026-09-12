import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as utils from './utils';
import {
  getLocalDateString,
  calculateStreakOnTaskCompletion,
  isStreakCompletedToday,
  parseSolutionSteps
} from './utils';

/* =========================================================================
   1. getLocalDateString tests (PR #6)
   ========================================================================= */
describe('getLocalDateString', () => {
  it('returns correctly formatted string for a specific date', () => {
    // Month is 0-indexed in Date constructor (4 is May)
    const d = new Date(2023, 4, 9);
    expect(getLocalDateString(d)).toBe('2023-05-09');
  });

  it('handles leap year dates correctly', () => {
    const d = new Date(2024, 1, 29); // 1 is Feb
    expect(getLocalDateString(d)).toBe('2024-02-29');
  });

  it('handles end of year dates correctly', () => {
    const d = new Date(2023, 11, 31); // 11 is Dec
    expect(getLocalDateString(d)).toBe('2023-12-31');
  });

  it('pads single-digit month and day correctly', () => {
    const d = new Date(2024, 0, 1); // Jan 1st
    expect(getLocalDateString(d)).toBe('2024-01-01');
  });

  it('defaults to the current date if no argument is provided', () => {
    const today = new Date();
    const expectedYear = today.getFullYear();
    const expectedMonth = String(today.getMonth() + 1).padStart(2, '0');
    const expectedDay = String(today.getDate()).padStart(2, '0');
    const expected = `${expectedYear}-${expectedMonth}-${expectedDay}`;

    expect(getLocalDateString()).toBe(expected);
  });
});

/* =========================================================================
   2. calculateStreakOnTaskCompletion tests (PR #12)
   ========================================================================= */
describe('calculateStreakOnTaskCompletion', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-10-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts a fresh streak when no lastStreakDate is provided', () => {
    const result = calculateStreakOnTaskCompletion(0, undefined, []);
    expect(result).toEqual({
      newStreakDays: 1,
      newLastStreakDate: '2023-10-15',
      newStreakActiveDates: ['2023-10-15'],
      isFirstCompletionToday: true
    });
  });

  it('starts a fresh streak when currentStreakDays is 0 even if lastStreakDate is provided', () => {
    const result = calculateStreakOnTaskCompletion(0, '2023-10-10', ['2023-10-10']);
    expect(result).toEqual({
      newStreakDays: 1,
      newLastStreakDate: '2023-10-15',
      newStreakActiveDates: ['2023-10-10', '2023-10-15'],
      isFirstCompletionToday: true
    });
  });

  it('continues a streak when lastStreakDate is yesterday', () => {
    const result = calculateStreakOnTaskCompletion(5, '2023-10-14', ['2023-10-10', '2023-10-14']);
    expect(result).toEqual({
      newStreakDays: 6,
      newLastStreakDate: '2023-10-15',
      newStreakActiveDates: ['2023-10-10', '2023-10-14', '2023-10-15'],
      isFirstCompletionToday: true
    });
  });

  it('breaks a streak when lastStreakDate is older than yesterday', () => {
    const result = calculateStreakOnTaskCompletion(5, '2023-10-13', ['2023-10-13']);
    expect(result).toEqual({
      newStreakDays: 1,
      newLastStreakDate: '2023-10-15',
      newStreakActiveDates: ['2023-10-13', '2023-10-15'],
      isFirstCompletionToday: true
    });
  });

  it('maintains the current streak when task is completed again today', () => {
    const result = calculateStreakOnTaskCompletion(5, '2023-10-15', ['2023-10-14', '2023-10-15']);
    expect(result).toEqual({
      newStreakDays: 5,
      newLastStreakDate: '2023-10-15',
      newStreakActiveDates: ['2023-10-14', '2023-10-15'],
      isFirstCompletionToday: false
    });
  });

  it('safeguards against streak dropping below 1 if already counted today', () => {
    const result = calculateStreakOnTaskCompletion(0, '2023-10-15', ['2023-10-15']);
    expect(result).toEqual({
      newStreakDays: 1,
      newLastStreakDate: '2023-10-15',
      newStreakActiveDates: ['2023-10-15'],
      isFirstCompletionToday: false
    });
  });

  it('handles undefined streakActiveDates gracefully', () => {
    // @ts-ignore - testing runtime safeguard
    const result = calculateStreakOnTaskCompletion(3, '2023-10-14', undefined);
    expect(result).toEqual({
      newStreakDays: 4,
      newLastStreakDate: '2023-10-15',
      newStreakActiveDates: ['2023-10-15'],
      isFirstCompletionToday: true
    });
  });
});

/* =========================================================================
   3. isStreakCompletedToday tests (PR #14 & #21)
   ========================================================================= */
describe('isStreakCompletedToday', () => {
  const MOCK_TODAY = '2024-05-10';

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(MOCK_TODAY + 'T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return true if lastStreakDate is today', () => {
    expect(isStreakCompletedToday(MOCK_TODAY)).toBe(true);
  });

  it('should return false if lastStreakDate is not today and no streakActiveDates are provided', () => {
    expect(isStreakCompletedToday('2024-05-09')).toBe(false);
  });

  it('should return true if streakActiveDates includes today', () => {
    expect(isStreakCompletedToday('2024-05-01', ['2024-05-08', '2024-05-09', MOCK_TODAY])).toBe(true);
  });

  it('should return false if streakActiveDates does not include today', () => {
    expect(isStreakCompletedToday('2024-05-01', ['2024-05-08', '2024-05-09'])).toBe(false);
  });

  it('should return true if both lastStreakDate is today and streakActiveDates includes today', () => {
    expect(isStreakCompletedToday(MOCK_TODAY, ['2024-05-08', MOCK_TODAY])).toBe(true);
  });

  it('should return false if neither condition is met', () => {
    expect(isStreakCompletedToday('2024-05-09', ['2024-05-08'])).toBe(false);
  });

  it('should handle undefined lastStreakDate gracefully (only streakActiveDates provided)', () => {
    expect(isStreakCompletedToday(undefined, [MOCK_TODAY])).toBe(true);
    expect(isStreakCompletedToday(undefined, ['2024-05-09'])).toBe(false);
  });

  it('should handle undefined streakActiveDates gracefully', () => {
    expect(isStreakCompletedToday(MOCK_TODAY, undefined)).toBe(true);
    expect(isStreakCompletedToday('2024-05-09', undefined)).toBe(false);
  });

  it('should handle both being undefined', () => {
    expect(isStreakCompletedToday(undefined, undefined)).toBe(false);
  });
});

/* =========================================================================
   4. parseSolutionSteps tests (PR #16 & #17)
   ========================================================================= */
describe('parseSolutionSteps', () => {
  it('should return an empty array for undefined or empty input', () => {
    expect(parseSolutionSteps()).toEqual([]);
    expect(parseSolutionSteps('')).toEqual([]);
    expect(parseSolutionSteps('   ')).toEqual([]);
  });

  it('should return a single step with label "Wyjaśnienie" for simple text without "Krok"', () => {
    const text = 'This is a simple explanation.';
    const result = parseSolutionSteps(text);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      stepNum: 1,
      label: 'Wyjaśnienie',
      content: text
    });
  });

  it('should split by paragraphs and assign "Krok X" for multi-paragraph text without "Krok"', () => {
    const text = 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.';
    const result = parseSolutionSteps(text);

    expect(result).toHaveLength(3);

    expect(result[0]).toEqual({
      stepNum: 1,
      label: 'Krok 1',
      content: 'First paragraph.'
    });

    expect(result[1]).toEqual({
      stepNum: 2,
      label: 'Krok 2',
      content: 'Second paragraph.'
    });

    expect(result[2]).toEqual({
      stepNum: 3,
      label: 'Krok 3',
      content: 'Third paragraph.'
    });
  });

  it('should correctly identify standard steps like "Krok 1:", "Krok 2:"', () => {
    const text = 'Krok 1: This is step one.\nKrok 2: This is step two.';
    const result = parseSolutionSteps(text);

    expect(result).toHaveLength(2);

    expect(result[0]).toEqual({
      stepNum: 1,
      label: 'Krok 1',
      content: 'This is step one.'
    });

    expect(result[1]).toEqual({
      stepNum: 2,
      label: 'Krok 2',
      content: 'This is step two.'
    });
  });

  it('should parse short title and separate it from content for steps with titles', () => {
    const text = 'Krok 1: Introduction\nHere is the introduction.\nKrok 2: Details\nHere are the details.';
    const result = parseSolutionSteps(text);

    expect(result).toHaveLength(2);

    expect(result[0]).toEqual({
      stepNum: 1,
      label: 'Krok 1',
      title: 'Introduction',
      content: 'Here is the introduction.'
    });

    expect(result[1]).toEqual({
      stepNum: 2,
      label: 'Krok 2',
      title: 'Details',
      content: 'Here are the details.'
    });
  });

  it('should parse introductory text before the first "Krok" as "Wprowadzenie"', () => {
    const text = 'This is an introduction before the steps.\nKrok 1: Step one.\nKrok 2: Step two.';
    const result = parseSolutionSteps(text);

    expect(result).toHaveLength(3);

    expect(result[0]).toEqual({
      stepNum: 1,
      label: 'Wprowadzenie',
      content: 'This is an introduction before the steps.'
    });

    expect(result[1]).toEqual({
      stepNum: 1,
      label: 'Krok 1',
      content: 'Step one.'
    });

    expect(result[2]).toEqual({
      stepNum: 2,
      label: 'Krok 2',
      content: 'Step two.'
    });
  });

  it('should skip title parsing if it contains $ (likely math formula)', () => {
    const text = 'Krok 1: Equation $x=2$\nThis is math.';
    const result = parseSolutionSteps(text);

    expect(result).toHaveLength(1);

    expect(result[0]).toEqual({
      stepNum: 1,
      label: 'Krok 1',
      content: 'Equation $x=2$\nThis is math.'
    });
  });
});
