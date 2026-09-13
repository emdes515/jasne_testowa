import { describe, expect, it } from 'vitest';
import {
  HttpError,
  clampInt,
  oneOf,
  optionalDataImage,
  optionalText,
  readScoringKey,
  requireObjectBody,
} from '../validation';

const PNG_1PX =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==';

describe('optionalDataImage', () => {
  it('akceptuje poprawny obraz PNG i liczy rozmiar', () => {
    const image = optionalDataImage(PNG_1PX, 1024 * 1024, 'studentImage');
    expect(image).not.toBeNull();
    expect(image?.mimeType).toBe('image/png');
    expect(image?.bytes).toBeGreaterThan(0);
    expect(image?.dataUrl).toBe(PNG_1PX);
  });

  it('zwraca null dla braku wartości (obraz jest opcjonalny)', () => {
    expect(optionalDataImage(undefined, 1024)).toBeNull();
    expect(optionalDataImage(null, 1024)).toBeNull();
    expect(optionalDataImage('', 1024)).toBeNull();
  });

  it('odrzuca zwykły URL zamiast data URL', () => {
    expect(() => optionalDataImage('https://example.com/a.png', 1024)).toThrow(HttpError);
  });

  it('odrzuca niedozwolony typ MIME (np. SVG z potencjalnym skryptem)', () => {
    const svg = `data:image/svg+xml;base64,${Buffer.from('<svg/>').toString('base64')}`;
    expect(() => optionalDataImage(svg, 1024)).toThrow(/Nieobsługiwany typ obrazu/);
  });

  it('odrzuca obraz powyżej limitu rozmiaru kodem 413', () => {
    let thrown: unknown;
    try {
      optionalDataImage(PNG_1PX, 10);
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(HttpError);
    expect((thrown as HttpError).status).toBe(413);
  });
});

describe('optionalText / requireObjectBody', () => {
  it('koercuje liczby i wartości logiczne do tekstu', () => {
    expect(optionalText(42, 100, 'studentAnswer')).toBe('42');
    expect(optionalText(true, 100, 'studentAnswer')).toBe('true');
  });

  it('odrzuca obiekty i tablice', () => {
    expect(() => optionalText({ a: 1 }, 100, 'question')).toThrow(HttpError);
    expect(() => optionalText([1, 2], 100, 'question')).toThrow(HttpError);
  });

  it('egzekwuje limit długości', () => {
    expect(() => optionalText('x'.repeat(11), 10, 'question')).toThrow(/przekracza limit/);
  });

  it('wymaga obiektu w body', () => {
    expect(() => requireObjectBody([])).toThrow(HttpError);
    expect(() => requireObjectBody('tekst')).toThrow(HttpError);
    expect(requireObjectBody({ a: 1 })).toEqual({ a: 1 });
  });
});

describe('readScoringKey', () => {
  it('preferuje scoring_key, potem scoringKey i officialKey', () => {
    expect(readScoringKey({ scoring_key: 'A', scoringKey: 'B', officialKey: 'C' }, 100)).toBe('A');
    expect(readScoringKey({ scoringKey: 'B', officialKey: 'C' }, 100)).toBe('B');
    expect(readScoringKey({ officialKey: 'C' }, 100)).toBe('C');
    expect(readScoringKey({}, 100)).toBe('');
  });
});

describe('oneOf / clampInt', () => {
  it('zwraca dopasowaną wartość lub fallback', () => {
    expect(oneOf('GRADE', ['hint', 'grade'] as const, 'hint')).toBe('grade');
    expect(oneOf('nieznany', ['hint', 'grade'] as const, 'hint')).toBe('hint');
    expect(oneOf(undefined, ['hint', 'grade'] as const, 'hint')).toBe('hint');
  });

  it('przycina liczby do zakresu', () => {
    expect(clampInt('7', 0, 5, 1)).toBe(5);
    expect(clampInt(-3, 0, 5, 1)).toBe(0);
    expect(clampInt('abc', 0, 5, 2)).toBe(2);
    expect(clampInt(3.9, 0, 5, 1)).toBe(3);
  });
});
