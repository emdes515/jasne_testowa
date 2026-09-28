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
    expect(okrag?.cke_page).toBe('str. 23');
    expect(okrag?.pageNumber).toBe(23);

    // Stereometria
    const prostopadloscian = formulasMap.get('f-stereo-prostopadloscian');
    expect(prostopadloscian?.cke_page).toBe('str. 24–25');
    expect(prostopadloscian?.pageNumber).toBe(24);

    // Prawdopodobieństwo i statystyka
    const prawd = formulasMap.get('f-komb-prawd');
    expect(prawd?.cke_page).toBe('str. 28');
    expect(prawd?.pageNumber).toBe(28);

    const srednia = formulasMap.get('f-stat-srednia');
    expect(srednia?.cke_page).toBe('str. 29');
    expect(srednia?.pageNumber).toBe(29);
  });

  it('enforces authentic CKE 2023 diagram rules: exactly 12 authentic geometry diagrams, none for algebraic topics', () => {
    const algebraicIds = [
      'f-skrocone-1',
      'f-log-1',
      'f-ciag-arytmetyczny',
      'f-ciag-geometryczny',
      'f-trygo-tabelka',
      'f-komb-prawd',
      'f-stat-srednia',
      'f-potegi-1',
      'f-pierwiastki-1',
      'f-proc-1',
    ];

    const formulasMap = new Map(CKE_FORMULAS_DATA.map(f => [f.id, f]));
    for (const id of algebraicIds) {
      const f = formulasMap.get(id);
      expect(f).toBeDefined();
      expect(f?.diagram, `Algebraic formula ${id} must not have a diagram`).toBeUndefined();
    }

    const authenticGeometricIds = [
      'f-funkcja-kwadratowa',
      'f-funkcja-liniowa',
      'f-trygo-definicje',
      'f-trygo-pola',
      'f-geo-trojkat-rownoboczny',
      'f-geo-tales',
      'f-geo-katy-okrag',
      'f-geo-odleglosc',
      'f-geo-okrag',
      'f-stereo-prostopadloscian',
      'f-stereo-ostroslup',
      'f-stereo-bryly',
    ];

    for (const id of authenticGeometricIds) {
      const f = formulasMap.get(id);
      expect(f).toBeDefined();
      expect(f?.diagram, `Geometric formula ${id} must have an authentic CKE diagram`).toBeDefined();
    }

    const allWithDiagrams = CKE_FORMULAS_DATA.filter(f => f.diagram !== undefined);
    expect(allWithDiagrams.length).toBe(12);
  });

  it('seed/curriculum/cke_formulas.json is synchronized with CKE_FORMULAS_DATA', () => {
    const jsonPath = path.resolve(process.cwd(), 'seed', 'curriculum', 'cke_formulas.json');
    expect(fs.existsSync(jsonPath)).toBe(true);

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    expect(data.formulas).toBeDefined();
    expect(data.formulas.length).toBe(CKE_FORMULAS_DATA.length);
    expect(data.topics.length).toBe(10);

    const jsonDiagrams = data.formulas.filter((f: any) => f.diagram !== undefined);
    expect(jsonDiagrams.length).toBe(12);
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

  it('All 12 geometric diagrams satisfy strict safe margins, bounds and metadata requirements', () => {
    const diagrams = CKE_FORMULAS_DATA
      .filter(f => f.diagram)
      .map(f => ({ id: f.id, diagram: f.diagram as any }));

    expect(diagrams.length).toBe(12);

    for (const { id, diagram: d } of diagrams) {
      // Must have title, formulaBadge, and caption
      expect(d.title, `${id} missing title`).toBeTruthy();
      expect(d.formulaBadge, `${id} missing formulaBadge`).toBeTruthy();
      expect(d.caption, `${id} missing caption`).toBeTruthy();
      expect(d.width, `${id} invalid width`).toBeGreaterThanOrEqual(400);
      expect(d.height, `${id} invalid height`).toBeGreaterThanOrEqual(180);

      // Points margin check
      if (d.points) {
        for (const p of d.points) {
          expect(p.x, `${id} point ${p.label} x < 15`).toBeGreaterThanOrEqual(15);
          expect(p.x, `${id} point ${p.label} x > width - 15`).toBeLessThanOrEqual(d.width - 15);
          expect(p.y, `${id} point ${p.label} y < 15`).toBeGreaterThanOrEqual(15);
          expect(p.y, `${id} point ${p.label} y > height - 15`).toBeLessThanOrEqual(d.height - 15);
        }
      }

      // Labels margin check
      if (d.labels) {
        for (const l of d.labels) {
          expect(l.y, `${id} label "${l.text}" y < 15`).toBeGreaterThanOrEqual(15);
          expect(l.y, `${id} label "${l.text}" y > height - 12`).toBeLessThanOrEqual(d.height - 12);
        }
      }

      // Circles containment check
      if (d.circles) {
        for (const c of d.circles) {
          expect(c.cx - c.r, `${id} circle overflows left`).toBeGreaterThanOrEqual(0);
          expect(c.cx + c.r, `${id} circle overflows right`).toBeLessThanOrEqual(d.width);
          expect(c.cy - c.r, `${id} circle overflows top`).toBeGreaterThanOrEqual(0);
          expect(c.cy + c.r, `${id} circle overflows bottom`).toBeLessThanOrEqual(d.height);
        }
      }
    }
  });
});

