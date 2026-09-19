import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { sanitizeExaminerTip } from '../SessionRunner';

describe('Adversarial Stress Test: sanitizeExaminerTip', () => {
  describe('Category 1: Mathematical colons and function signatures', () => {
    it('preserves LaTeX mapping colons at start of string', () => {
      expect(sanitizeExaminerTip('$f: X \\to Y$ jest funkcją ciągłą.')).toBe(
        '$f: X \\to Y$ jest funkcją ciągłą.'
      );
      expect(sanitizeExaminerTip('$f: [0, 1] \\to \\mathbb{R}$ jest określona wzorem.')).toBe(
        '$f: [0, 1] \\to \\mathbb{R}$ jest określona wzorem.'
      );
      expect(sanitizeExaminerTip('$f \\colon A \\to B$')).toBe('$f \\colon A \\to B$');
    });

    it('preserves ratios with colons', () => {
      expect(sanitizeExaminerTip('Stosunek 2:3 jest proporcją boków.')).toBe(
        'Stosunek 2:3 jest proporcją boków.'
      );
      expect(sanitizeExaminerTip('Np. stosunek wynosi 1:4.')).toBe(
        'Np. stosunek wynosi 1:4.'
      );
    });

    it('strips uppercase banner preceding a math formula', () => {
      expect(sanitizeExaminerTip('KLUCZOWA WŁASNOŚĆ FUNKCJI: $f(x) = ax + b$')).toBe(
        '$f(x) = ax + b$'
      );
    });
  });

  describe('Category 2: Factorials and exclamation marks', () => {
    it('preserves factorials at the start of expression', () => {
      expect(sanitizeExaminerTip('$n!$ oznacza iloczyn kolejnych liczb.')).toBe(
        '$n!$ oznacza iloczyn kolejnych liczb.'
      );
      expect(sanitizeExaminerTip('$5! = 120$')).toBe('$5! = 120$');
      expect(sanitizeExaminerTip('5! = 120')).toBe('5! = 120');
      expect(sanitizeExaminerTip('Silnia $n!$ rośnie szybko.')).toBe(
        'Silnia $n!$ rośnie szybko.'
      );
    });

    it('strips uppercase banner ending in exclamation mark and capitalizes body', () => {
      expect(sanitizeExaminerTip('SILNIA! Pamiętaj, że $0! = 1$.')).toBe(
        'Pamiętaj, że $0! = 1$.'
      );
      expect(sanitizeExaminerTip('NIE WYMNAŻAJ NAWIASÓW! Jeśli masz $(x - 1)(x - 2) = 0$')).toBe(
        'Jeśli masz $(x - 1)(x - 2) = 0$'
      );
    });
  });

  describe('Category 3: Polish diacritics and boundary characters', () => {
    it('strips banners with all Polish uppercase diacritics ĄĆĘŁŃÓŚŹŻ', () => {
      expect(sanitizeExaminerTip('ŻÓŁĆ GĘŚLĄ JAŹŃ: Wyjaśnienie.')).toBe('Wyjaśnienie.');
      expect(sanitizeExaminerTip('ŚCIŚLE TAJNE ŹRÓDŁO! Pamiętaj o delcie.')).toBe('Pamiętaj o delcie.');
      expect(sanitizeExaminerTip('ŁATWE PUNKTY: Rozwiąż nierówność.')).toBe('Rozwiąż nierówność.');
      expect(sanitizeExaminerTip('ÓSMA ZASADA: Sprawdź dziedzinę.')).toBe('Sprawdź dziedzinę.');
    });

    it('does not strip non-ALL-CAPS headers with lowercase Polish letters', () => {
      expect(sanitizeExaminerTip('Żelazna zasada nierówności: Zmień znak.')).toBe(
        'Żelazna zasada nierówności: Zmień znak.'
      );
    });

    it('handles dashes, em-dashes and hyphens in uppercase banners', () => {
      expect(sanitizeExaminerTip('KROK 1 – DEFINICJA: Wyznacz $x$.')).toBe('Wyznacz $x$.');
      expect(sanitizeExaminerTip('KROK—METODA: Zastosuj wzór.')).toBe('Zastosuj wzór.');
      expect(sanitizeExaminerTip('KROK-1 NAJWAŻNIEJSZY: Oblicz $y$.')).toBe('Oblicz $y$.');
    });
  });

  describe('Category 4: Nested, multi-line, and whitespace edge cases', () => {
    it('strips double prefixes (wskazówka + uppercase banner)', () => {
      expect(sanitizeExaminerTip('Wskazówka egzaminatora CKE: ŻELAZNY SCHEMAT: Treść.')).toBe('Treść.');
      expect(sanitizeExaminerTip('wskazówka cke: UWAGA NA MINUS! Rozwiąż.')).toBe('Rozwiąż.');
      expect(sanitizeExaminerTip('Wskazówka: WAŻNA UWAGA: Treść.')).toBe('Treść.');
    });

    it('handles newlines and leading/trailing whitespace cleanly', () => {
      expect(sanitizeExaminerTip('ŻELAZNY SCHEMAT:\n1) Zapisz wzór.')).toBe('1) Zapisz wzór.');
      expect(sanitizeExaminerTip('\n\n  \t ŻELAZNA ZASADA:\n\nTreść porady.')).toBe('Treść porady.');
      expect(sanitizeExaminerTip('ŻELAZNY SCHEMAT 5 KROKÓW\nCKE NA 4 PUNKTY:\n1) Oznacz.')).toBe('1) Oznacz.');
    });

    it('handles empty and boundary inputs safely', () => {
      expect(sanitizeExaminerTip('')).toBe('');
      expect(sanitizeExaminerTip(null as any)).toBe('');
      expect(sanitizeExaminerTip(undefined as any)).toBe('');
      expect(sanitizeExaminerTip('   \t\n\r  ')).toBe('');
      expect(sanitizeExaminerTip('ŻELAZNA ZASADA CKE:')).toBe('');
      expect(sanitizeExaminerTip('a')).toBe('A');
      expect(sanitizeExaminerTip('Z')).toBe('Z');
      expect(sanitizeExaminerTip('ABC: test')).toBe('ABC: test');
      expect(sanitizeExaminerTip('ABCD: test')).toBe('Test');
    });
  });

  describe('Category 5: Tone calibration', () => {
    it('calibrates sensationalist keywords', () => {
      expect(sanitizeExaminerTip('Egzaminator NIGDY nie daje punktu.')).toBe(
        'Egzaminator nie daje punktu.'
      );
      expect(sanitizeExaminerTip('W mianowniku ZAWSZE stoi wartość.')).toBe(
        'W mianowniku zawsze stoi wartość.'
      );
      expect(sanitizeExaminerTip('KROK 1: ZAWSZE sprawdzaj założenia.')).toBe(
        'Zawsze sprawdzaj założenia.'
      );
      expect(sanitizeExaminerTip('Podaj DOKŁADNY wynik.')).toBe('Podaj dokładny wynik.');
      expect(sanitizeExaminerTip('To zadanie to 100% pewniak! Warto.')).toBe(
        'To zadanie to Częsty motyw w arkuszach CKE. Warto.'
      );
    });
  });

  describe('Category 6: ReDoS and performance bounds', () => {
    it('executes in linear time under large repetitive input', () => {
      const hugeInput = 'A'.repeat(100000);
      const start = Date.now();
      const result = sanitizeExaminerTip(hugeInput);
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(150);
      expect(typeof result).toBe('string');
    });

    it('executes in linear time when huge uppercase banner matches', () => {
      const hugeBanner = 'A'.repeat(100000) + ': Treść';
      const start = Date.now();
      const result = sanitizeExaminerTip(hugeBanner);
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(150);
      expect(result).toBe('Treść');
    });
  });

  describe('Category 7: Full curriculum integrity check', () => {
    it('successfully processes all 225 curriculum lessons without losing substantive content', () => {
      const currPath = path.resolve(__dirname, '../../../seed/curriculum/curriculum_matematyka.json');
      const currData = JSON.parse(fs.readFileSync(currPath, 'utf8'));

      let processed = 0;
      for (const topic of currData.topics) {
        for (const lesson of topic.lessons) {
          processed++;
          const tip = lesson.theory_pill?.matura_context;
          const sanitized = sanitizeExaminerTip(tip);
          if (tip && tip.trim().length > 0) {
            expect(typeof sanitized).toBe('string');
            expect(sanitized.length).toBeGreaterThan(0);
          }
        }
      }
      expect(processed).toBe(225);
    });
  });
});

describe('Adversarial Check: Absence of Forbidden CKE Strings', () => {
  const filePath = path.resolve(__dirname, '../SessionRunner.tsx');
  const content = fs.readFileSync(filePath, 'utf8');

  const forbiddenStrings = [
    'Patent maturalny CKE',
    'W Karcie Wzorów CKE',
    'Wskazówka egzaminatora CKE',
    'Karta CKE:'
  ];

  for (const forbidden of forbiddenStrings) {
    it(`strictly does not contain "${forbidden}"`, () => {
      const occurrences = (content.match(new RegExp(forbidden.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')) || []).length;
      expect(occurrences).toBe(0);
    });
  }

  it('strictly contains the standardized replacement labels', () => {
    expect(content).toContain('Patent maturalny');
    expect(content).toContain('W karcie wzorów');
    expect(content).toContain('Wskazówka egzaminatora');
    expect(content).toContain('Karta wzorów:');
  });
});

