import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { sanitizeExaminerTip } from '../SessionRunner';

interface Lesson {
  id: string;
  title: string;
  theory_pill?: {
    matura_context?: string;
    keyTakeaway?: string;
    concept_essence?: any;
    core_formulas?: any[];
    worked_example?: any;
    exam_trap?: any;
  };
}

interface Topic {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Curriculum {
  topics: Topic[];
}

describe('Milestone M1 Challenger 2 - Empirical Curriculum & Sanitization Audit', () => {
  const backupPath = path.resolve(__dirname, '../../../seed/curriculum/curriculum_matematyka_v1_backup.json');
  const masterPath = path.resolve(__dirname, '../../../seed/curriculum/curriculum_matematyka.json');
  const curriculumPath = fs.existsSync(backupPath) ? backupPath : masterPath;
  const curriculumData: Curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

  const target9Headers: Record<string, string> = {
    'lesson-3-3': 'ŻELAZNA ZASADA NIERÓWNOŚCI CKE:',
    'lesson-3-8': 'NIE WYMNAŻAJ NAWIASÓW!',
    'lesson-3-14': 'OBOWIĄZKOWY KROK 1:',
    'lesson-7-5': 'NAJLEPSZY TRIK MATURALNY NA CIĄGI:',
    'lesson-7-10': 'TRIK Z DZIELENIEM INDEKSÓW:',
    'lesson-13-2': 'NIEZAWODNY TRIK CKE:',
    'lesson-14-4': 'ŻELAZNA ZASADA MEDIANY:',
    'lesson-15-1': 'ŻELAZNY SCHEMAT 5 KROKÓW CKE NA 4 PUNKTY:',
    'lesson-15-15': 'CHECKLISTA MATURALNA DLA ZADANIA ZA 4 PKT:'
  };

  const target9Ids = Object.keys(target9Headers);

  const allLessons: Lesson[] = [];
  curriculumData.topics.forEach(t => (t.lessons || []).forEach(l => allLessons.push(l)));

  it('verifies curriculum dataset contains exactly 15 topics and 225 lessons', () => {
    expect(curriculumData.topics.length).toBe(15);
    expect(allLessons.length).toBe(225);
  });

  describe('Verification of the 9 known uppercase-headed lessons', () => {
    target9Ids.forEach(id => {
      const expectedHeader = target9Headers[id];

      it(`lesson ${id} cleanly strips "${expectedHeader}" and preserves subsequent text`, () => {
        const lesson = allLessons.find(l => l.id === id);
        expect(lesson).toBeDefined();

        const fileContent = lesson!.theory_pill?.matura_context || lesson!.theory_pill?.keyTakeaway || '';
        expect(fileContent.length).toBeGreaterThan(15);

        // If dataset was already batch-sanitized, prepend expectedHeader to thoroughly verify stripping logic
        const raw = fileContent.trim().startsWith(expectedHeader) ? fileContent : `${expectedHeader} ${fileContent}`;

        // Confirm raw starts with the expected header
        expect(raw.trim().startsWith(expectedHeader)).toBe(true);

        // Expected subsequent text after stripping header and initial spaces
        const expectedRemainder = raw.trim().slice(expectedHeader.length).trim();
        expect(expectedRemainder.length).toBeGreaterThan(15);

        // Sanitize
        const sanitized = sanitizeExaminerTip(raw);

        // 1. Header must NOT be present at start
        expect(sanitized.startsWith(expectedHeader)).toBe(false);

        // 2. Must not start with punctuation artifacts
        expect(sanitized).not.toMatch(/^[:!–—\-\s]/);

        // 3. First character must be uppercase
        expect(sanitized[0]).toBe(sanitized[0].toUpperCase());

        // 4. Check that substantive remainder is preserved (accounting for standard tone adjustments like ZAWSZE -> zawsze)
        // Check that key words from expectedRemainder exist in sanitized
        const words = expectedRemainder.split(/\s+/).filter(w => w.length > 4 && !/^[A-ZĄĆĘŁŃÓŚŹŻ]+$/.test(w));
        for (let i = 0; i < Math.min(5, words.length); i++) {
          expect(sanitized).toContain(words[i]);
        }

        // 5. LaTeX formulas preserved
        const rawFormulas = raw.match(/\$[^\$]+\$/g) || [];
        const sanitizedFormulas = sanitized.match(/\$[^\$]+\$/g) || [];
        expect(sanitizedFormulas.length).toBe(rawFormulas.length);

        console.log(`[PASS 9-KNOWN] ${id}:`);
        console.log(`   Header stripped: "${expectedHeader}"`);
        console.log(`   Sanitized text:  "${sanitized.slice(0, 90)}..."`);
      });
    });
  });

  describe('Verification of the other 216 lessons', () => {
    const remainingLessons = allLessons.filter(l => !target9Ids.includes(l.id));

    it('confirms exactly 216 remaining lessons exist', () => {
      expect(remainingLessons.length).toBe(216);
    });

    it('all 216 remaining lessons preserve all substantive content and all LaTeX formulas', () => {
      const modifiedLessons: Array<{ id: string; raw: string; sanitized: string; diffs: string[] }> = [];

      remainingLessons.forEach(lesson => {
        const raw = lesson.theory_pill?.matura_context || lesson.theory_pill?.keyTakeaway || '';
        expect(raw.length, `Lesson ${lesson.id} has empty tip`).toBeGreaterThan(0);

        const sanitized = sanitizeExaminerTip(raw);
        expect(sanitized.length, `Lesson ${lesson.id} became empty after sanitization`).toBeGreaterThan(0);

        // Check formula count preservation: NO FORMULAS MAY BE LOST
        const rawFormulas = raw.match(/\$[^\$]+\$/g) || [];
        const sanitizedFormulas = sanitized.match(/\$[^\$]+\$/g) || [];
        expect(
          sanitizedFormulas.length,
          `Lesson ${lesson.id} lost LaTeX formulas during sanitization`
        ).toBe(rawFormulas.length);

        // Check if modified
        if (sanitized !== raw) {
          const diffs: string[] = [];
          if (/^(?:wskazówka\s+egzaminatora\s+cke|wskazówka\s+cke|wskazówka)\s*:\s*/i.test(raw)) {
            diffs.push('Stripped "wskazówka:" label');
          }
          if (/^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż0-9\s$.,()–—\-]{2,70}?\s*(?:CKE|maturaln[a-ząćęłńóśźż]+)\s*(?:dla\s+zadania\s+za\s+\d+\s*pkt)?\s*[:\-–!]\s*/i.test(raw)) {
            diffs.push('Stripped CKE/maturalny heading prefix');
          }
          if (/^(?:żelazna\s+zasada|złota\s+(?:zasada|reguła)|kluczowa\s+zasada|klucz\s+do|algorytm|schemat|checklista|błyskawiczny|błyskawiczne|trik|strategia|zliczanie|odejmij|kwadrat|pole\s+trójkąta|uważaj|skracanie|metoda|zadania|zestawienie|przewodnik|trójki|najpopularniejsza|warunek|częste|praktyczny|przejście|bilans)/i.test(raw)) {
            diffs.push('Stripped pedagogical pseudo-heading');
          }
          if (/^[A-ZĄĆĘŁŃÓŚŹŻ0-9\s–—\-]{4,}[:!]/.test(raw)) {
            diffs.push('Stripped uppercase heading');
          }
          if (/[Żż]elazny\s+pewniak/i.test(raw)) {
            diffs.push('Removed "żelazny pewniak" phrase');
          }
          if (/\b100%\s+pewniak!?/i.test(raw)) {
            diffs.push('Replaced "100% pewniak"');
          }
          if (/NIGDY\s+nie\s+daje/.test(raw)) {
            diffs.push('Tone calibration: NIGDY nie daje -> nie daje');
          }
          if (/\bNIGDY\b/.test(raw)) {
            diffs.push('Tone calibration: NIGDY -> nigdy');
          }
          if (/\bZAWSZE\b/.test(raw)) {
            diffs.push('Tone calibration: ZAWSZE -> zawsze');
          }
          if (/\bDOKŁADNY\b/.test(raw)) {
            diffs.push('Tone calibration: DOKŁADNY -> dokładny');
          }
          if (raw.trim() !== raw) {
            diffs.push('Trimmed leading/trailing whitespace');
          }
          if (sanitized[0] !== raw[0]) {
            diffs.push('Capitalized first letter');
          }

          modifiedLessons.push({ id: lesson.id, raw, sanitized, diffs });
        }
      });

      console.log(`Remaining 216 lessons: ${216 - modifiedLessons.length} completely identical, ${modifiedLessons.length} refined by tone/label sanitization.`);
      modifiedLessons.forEach(m => {
        console.log(`   [REFINED] ${m.id} (${m.diffs.join(', ')}):`);
        console.log(`      Raw:       "${m.raw.slice(0, 75)}..."`);
        console.log(`      Sanitized: "${m.sanitized.slice(0, 75)}..."`);
      });

      // Assert that none of the remaining lessons suffered unintended damage
      // Every modified lesson must have an identified legitimate reason
      modifiedLessons.forEach(m => {
        expect(m.diffs.length).toBeGreaterThan(0);
        // Ensure length did not collapse catastrophically
        expect(m.sanitized.length).toBeGreaterThan(15);
      });
    });
  });

  describe('Adversarial Stress Testing of sanitizeExaminerTip', () => {
    it('handles empty and whitespace-only inputs gracefully', () => {
      expect(sanitizeExaminerTip('')).toBe('');
      expect(sanitizeExaminerTip('   ')).toBe('');
      expect(sanitizeExaminerTip('\n\t  \n')).toBe('');
      expect(sanitizeExaminerTip(null as any)).toBe('');
      expect(sanitizeExaminerTip(undefined as any)).toBe('');
    });

    it('handles boundary header length: 3 chars vs 4+ chars', () => {
      const threeChar = 'ABC: Treść wskazówki.';
      expect(sanitizeExaminerTip(threeChar)).toBe('ABC: Treść wskazówki.');

      const fourChar = 'ABCD: Treść wskazówki.';
      expect(sanitizeExaminerTip(fourChar)).toBe('Treść wskazówki.');
    });

    it('correctly handles all Polish uppercase diacritics in headers', () => {
      const polishHeader = 'ŻÓŁĆ GĘŚLĄ JAŹŃ: Prawidłowe zastosowanie wzorów.';
      expect(sanitizeExaminerTip(polishHeader)).toBe('Prawidłowe zastosowanie wzorów.');

      const polishBang = 'BŁĄD KOSZTOWNY! Nie dziel przez zero.';
      expect(sanitizeExaminerTip(polishBang)).toBe('Nie dziel przez zero.');
    });

    it('handles formula right after the header', () => {
      const input = 'OBOWIĄZKOWY KROK: $x^2 - 4 = 0$ ma dwa pierwiastki.';
      expect(sanitizeExaminerTip(input)).toBe('$x^2 - 4 = 0$ ma dwa pierwiastki.');
    });

    it('handles nested prefix: Wskazówka CKE: ŻELAZNY SCHEMAT: Treść', () => {
      const input = 'Wskazówka egzaminatora CKE: ŻELAZNY SCHEMAT CKE: Treść porady.';
      expect(sanitizeExaminerTip(input)).toBe('Treść porady.');
    });

    it('handles dashes in header: KROK 1 – ZASTOSUJ WZÓR: Treść', () => {
      const input = 'KROK 1 – ZASTOSUJ WZÓR: Podstaw wartości do wzoru.';
      expect(sanitizeExaminerTip(input)).toBe('Podstaw wartości do wzoru.');
    });

    it('preserves tips that start with lists or numbers', () => {
      const input = '1) Wyznacz dziedzinę równania. 2) Rozwiąż równanie.';
      expect(sanitizeExaminerTip(input)).toBe('1) Wyznacz dziedzinę równania. 2) Rozwiąż równanie.');
    });

    it('preserves tips that contain math in parentheses or brackets', () => {
      const input = 'Zwróć uwagę na przedział $(-3, 5\\rangle$. Punkt 5 należy do zbioru.';
      expect(sanitizeExaminerTip(input)).toBe('Zwróć uwagę na przedział $(-3, 5\\rangle$. Punkt 5 należy do zbioru.');
    });

    it('calibrates sensationalist words in various positions', () => {
      const input = 'Egzaminator CKE NIGDY nie daje punktu za błędny wynik, ZAWSZE sprawdza DOKŁADNY zapis.';
      const result = sanitizeExaminerTip(input);
      expect(result).toBe('Egzaminator CKE nie daje punktu za błędny wynik, zawsze sprawdza dokładny zapis.');
    });
  });
});
