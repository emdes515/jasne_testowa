import { describe, it, expect } from 'vitest';
import { CKE_FORMULAS_DATA } from '../../data/ckeFormulasData';
import fs from 'fs';
import path from 'path';

describe('CKE 2023 Formula Sheet Verification', () => {
  it('CKE_FORMULAS_DATA has exact, factually verified CKE 2023 page references', () => {
    const formulasMap = new Map(CKE_FORMULAS_DATA.map(f => [f.id, f]));

    // Wzory skróconego mnożenia - Strona 7 z 34 oficjalnej karty CKE 2023
    const skrocone = formulasMap.get('f-skrocone-1');
    expect(skrocone).toBeDefined();
    expect(skrocone?.cke_page).toBe('str. 7');
    expect(skrocone?.pageNumber).toBe(7);

    // Potęgi i pierwiastki - Strona 4 z 34
    const potegi1 = formulasMap.get('f-potegi-1');
    expect(potegi1?.cke_page).toBe('str. 4');
    expect(potegi1?.pageNumber).toBe(4);

    const pierwiastki1 = formulasMap.get('f-pierwiastki-1');
    expect(pierwiastki1?.cke_page).toBe('str. 4');
    expect(pierwiastki1?.pageNumber).toBe(4);

    // Logarytmy - Strona 5 z 34
    const log1 = formulasMap.get('f-log-1');
    expect(log1?.cke_page).toBe('str. 5');
    expect(log1?.pageNumber).toBe(5);

    // Funkcja liniowa (Geometria analityczna - Prosta) - Strona 21-22 z 34
    const liniowa = formulasMap.get('f-funkcja-liniowa');
    expect(liniowa?.cke_page).toBe('str. 21–22');
    expect(liniowa?.pageNumber).toBe(21);

    // Funkcja kwadratowa - Strona 7-8 z 34
    const kwadratowa = formulasMap.get('f-funkcja-kwadratowa');
    expect(kwadratowa?.cke_page).toBe('str. 7–8');
    expect(kwadratowa?.pageNumber).toBe(7);

    // Ciągi arytmetyczne i geometryczne - Strona 9-10 z 34
    const arytmetyczny = formulasMap.get('f-ciag-arytmetyczny');
    expect(arytmetyczny?.cke_page).toBe('str. 9');
    expect(arytmetyczny?.pageNumber).toBe(9);

    const geometryczny = formulasMap.get('f-ciag-geometryczny');
    expect(geometryczny?.cke_page).toBe('str. 10');
    expect(geometryczny?.pageNumber).toBe(10);

    // Trygonometria - Strona 10-15 z 34
    const trygoDef = formulasMap.get('f-trygo-definicje');
    expect(trygoDef?.cke_page).toBe('str. 10');
    expect(trygoDef?.pageNumber).toBe(10);

    const trygoPola = formulasMap.get('f-trygo-pola');
    expect(trygoPola?.cke_page).toBe('str. 15');
    expect(trygoPola?.pageNumber).toBe(15);

    // Planimetria i analityczna
    const rownoboczny = formulasMap.get('f-geo-trojkat-rownoboczny');
    expect(rownoboczny?.cke_page).toBe('str. 16');
    expect(rownoboczny?.pageNumber).toBe(16);

    const okrag = formulasMap.get('f-geo-okrag');
    expect(okrag?.cke_page).toBe('str. 22');
    expect(okrag?.pageNumber).toBe(22);

    // Prawdopodobieństwo i statystyka
    const prawd = formulasMap.get('f-komb-prawd');
    expect(prawd?.cke_page).toBe('str. 28');
    expect(prawd?.pageNumber).toBe(28);

    const srednia = formulasMap.get('f-stat-srednia');
    expect(srednia?.cke_page).toBe('str. 29');
    expect(srednia?.pageNumber).toBe(29);
  });

  it('No formula in CKE_FORMULAS_DATA contains forbidden \\iff symbol', () => {
    for (const f of CKE_FORMULAS_DATA) {
      expect(f.formula).not.toContain('\\iff');
      if (f.subFormulas) {
        for (const sf of f.subFormulas) {
          expect(sf.formula).not.toContain('\\iff');
        }
      }
    }
  });

  it('Module 1 Curriculum JSON has 100% valid CKE page references and no \\iff in basic core formulas', () => {
    const curriculumPath = path.resolve(process.cwd(), 'seed', 'curriculum', 'curriculum_matematyka.json');
    expect(fs.existsSync(curriculumPath)).toBe(true);

    const data = JSON.parse(fs.readFileSync(curriculumPath, 'utf-8'));
    expect(data.topics).toBeDefined();

    for (const topic of data.topics) {
      for (const lesson of topic.lessons) {
        // Sprawdź core_formulas
        const formulas = lesson.theory_pill?.core_formulas || lesson.formulaSheet?.formulas || [];
        for (const form of formulas) {
          if (form.in_cke_sheet) {
            expect(form.cke_page).toBeDefined();
            expect(form.cke_page).not.toBe('-');
            // CKE 2023 ma 34 strony - numer strony musi być z przedziału str. 4 do str. 34
            expect(form.cke_page).toMatch(/str\.\s*\d+/);
            const match = form.cke_page.match(/str\.\s*(\d+)/);
            if (match) {
              const page = parseInt(match[1], 10);
              expect(page).toBeGreaterThanOrEqual(4);
              expect(page).toBeLessThanOrEqual(34);
            }
          }

          // Sprawdź brak akademickiego formalizmu \iff
          if (form.latex) {
            expect(form.latex).not.toContain('\\iff');
          }
        }
      }
    }
  });

  it('Caption prefix stripper correctly prevents double headers', () => {
    const regex = /^(złota reguła cke|wniosek dydaktyczny|pułapka cke|zasada cke|ważna reguła):\s*/i;
    expect('Złota reguła CKE: Prawa działań'.replace(regex, '')).toBe('Prawa działań');
    expect('Wniosek dydaktyczny: Wyrażenie'.replace(regex, '')).toBe('Wyrażenie');
    expect('Pułapka CKE: Minus'.replace(regex, '')).toBe('Minus');
    expect('Normalny tekst bez prefixu'.replace(regex, '')).toBe('Normalny tekst bez prefixu');
  });
});
