import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { sanitizeExaminerTip } from '../SessionRunner';

describe('SessionRunner - sanitizeExaminerTip', () => {
  it('returns empty string for null, undefined, or empty string', () => {
    expect(sanitizeExaminerTip('')).toBe('');
    expect(sanitizeExaminerTip(null as any)).toBe('');
    expect(sanitizeExaminerTip(undefined as any)).toBe('');
  });

  it('strips leading uppercase headers ending with colon', () => {
    const input = 'ŻELAZNA ZASADA NIERÓWNOŚCI CKE: Rozwiąż $-3x \\ge 12$. Dzielisz przez liczbę ujemną.';
    const result = sanitizeExaminerTip(input);
    expect(result).toBe('Rozwiąż $-3x \\ge 12$. Dzielisz przez liczbę ujemną.');
  });

  it('strips leading uppercase headers ending with exclamation mark', () => {
    const input = 'NIE WYMNAŻAJ NAWIASÓW! Jeśli masz $(x - 3)(2x + 5) = 0$, nie licz delty!';
    const result = sanitizeExaminerTip(input);
    expect(result).toBe('Jeśli masz $(x - 3)(2x + 5) = 0$, nie licz delty!');
  });

  it('strips leading uppercase headers with numbers and steps', () => {
    const input = 'OBOWIĄZKOWY KROK 1: Zawsze napisz DZIEDZINĘ ($Q(x) \\neq 0$)!';
    const result = sanitizeExaminerTip(input);
    expect(result).toBe('Zawsze napisz DZIEDZINĘ ($Q(x) \\neq 0$)!');
  });

  it('strips 5-step master scheme uppercase headers', () => {
    const input = 'ŻELAZNY SCHEMAT 5 KROKÓW CKE NA 4 PUNKTY: 1) Wprowadź oznaczenia.';
    const result = sanitizeExaminerTip(input);
    expect(result).toBe('1) Wprowadź oznaczenia.');
  });

  it('strips sequence trick uppercase header', () => {
    const input = 'NAJLEPSZY TRIK MATURALNY NA CIĄGI: Nie układaj układu równań z $a_1$!';
    const result = sanitizeExaminerTip(input);
    expect(result).toBe('Nie układaj układu równań z $a_1$!');
  });

  it('strips 4-point checklist uppercase header', () => {
    const input = 'CHECKLISTA MATURALNA DLA ZADANIA ZA 4 PKT: 1) Czy podałem dziedzinę jako przedział otwarty? TAK.';
    const result = sanitizeExaminerTip(input);
    expect(result).toBe('1) Czy podałem dziedzinę jako przedział otwarty? TAK.');
  });

  it('strips leading lowercase or mixed-case wskazówka labels', () => {
    const input = 'Wskazówka egzaminatora CKE: Pamiętaj o sprawdzeniu założeń.';
    const result = sanitizeExaminerTip(input);
    expect(result).toBe('Pamiętaj o sprawdzeniu założeń.');
  });

  it('strips both wskazówka prefix and subsequent uppercase banner', () => {
    const input = 'Wskazówka CKE: ŻELAZNA ZASADA MEDIANY: Pierwszy krok to uporządkowanie liczb.';
    const result = sanitizeExaminerTip(input);
    expect(result).toBe('Pierwszy krok to uporządkowanie liczb.');
  });

  it('calibrates sensationalist language', () => {
    const input = 'Pamiętaj, że egzaminator NIGDY nie daje punktu za sam wynik. ZAWSZE pamiętaj o jednostkach. DOKŁADNY wynik.';
    const result = sanitizeExaminerTip(input);
    expect(result).toContain('nie daje');
    expect(result).not.toContain('NIGDY nie daje');
    expect(result).toContain('zawsze');
    expect(result).not.toContain('ZAWSZE');
    expect(result).toContain('dokładny');
    expect(result).not.toContain('DOKŁADNY');
  });

  it('capitalizes the first character of the cleaned output', () => {
    const input = 'OBOWIĄZKOWY KROK 1: zawsze sprawdzaj dziedzinę.';
    const result = sanitizeExaminerTip(input);
    expect(result.startsWith('Zawsze')).toBe(true);
  });
});

describe('SessionRunner - UI Label Integrity Check', () => {
  it('does not contain prohibited CKE branding strings in SessionRunner.tsx', () => {
    const filePath = path.resolve(__dirname, '../SessionRunner.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    const forbiddenStrings = [
      'Patent maturalny CKE',
      'W Karcie Wzorów CKE',
      'Wskazówka egzaminatora CKE',
      'Karta CKE'
    ];

    for (const forbidden of forbiddenStrings) {
      expect(content).not.toContain(forbidden);
    }
  });

  it('contains the unified, standardized UI labels in SessionRunner.tsx', () => {
    const filePath = path.resolve(__dirname, '../SessionRunner.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('Patent maturalny');
    expect(content).toContain('W karcie wzorów');
    expect(content).toContain('Wskazówka egzaminatora');
    expect(content).toContain('Karta wzorów:');
    expect(content).toContain('Kryteria oceniania: Warunki formalne');
  });
});
