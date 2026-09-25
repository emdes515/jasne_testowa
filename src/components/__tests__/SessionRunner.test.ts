import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { sanitizeExaminerTip, resolveCkeTopicForDepartment, isEmergencyFallback } from '../SessionRunner';

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

describe('SessionRunner - resolveCkeTopicForDepartment', () => {
  it('correctly maps Dział 8 (Nierówności kwadratowe) to funkcje-rownania', () => {
    expect(resolveCkeTopicForDepartment('DZIAŁ 8', 'Nierówności kwadratowe', 'Wyróżnik delta')).toBe('funkcje-rownania');
  });

  it('correctly maps Dział 8 with CKE Trygonometria to trygonometria', () => {
    expect(resolveCkeTopicForDepartment('DZIAŁ 8', 'Trygonometria', 'Tożsamości trygonometryczne')).toBe('trygonometria');
  });

  it('correctly maps all 10 microlearning curriculum departments', () => {
    expect(resolveCkeTopicForDepartment('DZIAŁ 1', 'Potęgi i pierwiastki')).toBe('potegi-pierwiastki');
    expect(resolveCkeTopicForDepartment('DZIAŁ 2', 'Logarytmy')).toBe('logarytmy-procenty');
    expect(resolveCkeTopicForDepartment('DZIAŁ 3', 'Wartość bezwzględna')).toBe('potegi-pierwiastki');
    expect(resolveCkeTopicForDepartment('DZIAŁ 4', 'Wzory skróconego mnożenia i algebra')).toBe('potegi-pierwiastki');
    expect(resolveCkeTopicForDepartment('DZIAŁ 5', 'Nierówności liniowe')).toBe('funkcje-rownania');
    expect(resolveCkeTopicForDepartment('DZIAŁ 6', 'Równania w postaci iloczynowej')).toBe('funkcje-rownania');
    expect(resolveCkeTopicForDepartment('DZIAŁ 7', 'Równania i wyrażenia wymierne')).toBe('funkcje-rownania');
    expect(resolveCkeTopicForDepartment('DZIAŁ 8', 'Nierówności kwadratowe')).toBe('funkcje-rownania');
    expect(resolveCkeTopicForDepartment('DZIAŁ 9', 'Wykres funkcji i odczyt własności')).toBe('funkcje-rownania');
    expect(resolveCkeTopicForDepartment('DZIAŁ 10', 'Funkcja liniowa i jej własności')).toBe('funkcje-rownania');
  });

  it('correctly maps CKE standard 15 departments', () => {
    expect(resolveCkeTopicForDepartment('DZIAŁ 7', 'Ciągi Liczbowe')).toBe('ciagi');
    expect(resolveCkeTopicForDepartment('DZIAŁ 11', 'Trygonometria')).toBe('trygonometria');
    expect(resolveCkeTopicForDepartment('DZIAŁ 12', 'Planimetria')).toBe('planimetria');
    expect(resolveCkeTopicForDepartment('DZIAŁ 13', 'Geometria Analityczna')).toBe('geometria');
    expect(resolveCkeTopicForDepartment('DZIAŁ 14', 'Stereometria')).toBe('stereometria');
    expect(resolveCkeTopicForDepartment('DZIAŁ 15', 'Kombinatoryka i statystyka')).toBe('prawdopodobienstwo');
  });
});

describe('SessionRunner - isEmergencyFallback', () => {
  it('identifies null or undefined pill as emergency fallback', () => {
    expect(isEmergencyFallback(null)).toBe(true);
    expect(isEmergencyFallback(undefined)).toBe(true);
    expect(isEmergencyFallback({})).toBe(true);
  });

  it('identifies pill without concept_essence as emergency fallback', () => {
    expect(isEmergencyFallback({ title: 'Test' })).toBe(true);
  });

  it('identifies string fallback placeholder as emergency fallback', () => {
    expect(isEmergencyFallback({
      concept_essence: 'Zapoznaj się z kluczowymi pojęciami, własnościami i wzorami dla tej lekcji.'
    })).toBe(true);
    expect(isEmergencyFallback({
      concept_essence: 'Zapoznaj sie z kluczowymi pojęciami.'
    })).toBe(true);
  });

  it('identifies genuine string content as NOT emergency fallback', () => {
    expect(isEmergencyFallback({
      concept_essence: 'Średnia arytmetyczna to suma liczb podzielona przez ich liczbę.'
    })).toBe(false);
  });

  it('handles object concept_essence gracefully without crashing (P0 runtime fix)', () => {
    expect(isEmergencyFallback({
      concept_essence: { lead: 'Zapoznaj się z kluczowymi pojęciami...' }
    })).toBe(true);
    expect(isEmergencyFallback({
      concept_essence: { lead: 'Prawdziwa teoria w obiekcie', pillars: [] }
    })).toBe(false);
  });

  it('handles array or numeric concept_essence gracefully without crashing', () => {
    expect(isEmergencyFallback({
      concept_essence: ['Punkt 1', 'Punkt 2']
    })).toBe(false);
    expect(isEmergencyFallback({
      concept_essence: 12345
    })).toBe(false);
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

  it('contains the compact department formulas button, badge button and drawer in SessionRunner.tsx', () => {
    const filePath = path.resolve(__dirname, '../SessionRunner.tsx');
    const content = fs.readFileSync(filePath, 'utf8');

    expect(content).toContain('id="session-formulas-button"');
    expect(content).toContain('id="session-department-badge-button"');
    expect(content).toContain('id="session-formula-sheet-backdrop"');
    expect(content).toContain('departmentFormulas');
    expect(content).toContain('drawerFormulas');
    expect(content).toContain('matchedCkeTopicId');
  });
});

