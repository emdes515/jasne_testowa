import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { 
  THEORY_DIAGRAMS, 
  THEORY_NUMBER_LINES, 
  enrichTheoryPillWithVisual 
} from '../mathVisualRegistry';
import { formatSvgText } from '../../components/MathDiagram';

describe('Inequality Diagrams and Math Visuals Verification', () => {
  const inequalityLessons = [
    'lesson-3-1',
    'lesson-3-2',
    'lesson-5-1',
    'lesson-5-2',
    'lesson-5-3',
    'lesson-8-1',
    'lesson-8-2',
    'lesson-8-3',
    'lesson-8-4',
  ];

  it('all inequality lessons in Dział 3, 5, 8 have registered theory diagrams', () => {
    for (const id of inequalityLessons) {
      const diagram = THEORY_DIAGRAMS[id];
      expect(diagram, `Missing diagram for ${id}`).toBeDefined();
      expect(diagram.title).toBeTruthy();
      expect(diagram.formulaBadge).toBeTruthy();
      expect(diagram.metrics && diagram.metrics.length > 0).toBe(true);
    }
  });

  it('all Dział 5 lessons have fallback number lines registered', () => {
    const dzial5 = ['lesson-5-1', 'lesson-5-2', 'lesson-5-3'];
    for (const id of dzial5) {
      const nl = THEORY_NUMBER_LINES[id];
      expect(nl, `Missing number line for ${id}`).toBeDefined();
      expect(nl.ticks.length).toBeGreaterThan(0);
      expect(nl.intervals.length).toBeGreaterThan(0);
    }
  });

  it('enrichTheoryPillWithVisual attaches diagrams and number lines without mutating original pill', () => {
    const rawPill = { title: 'Test Lesson', concept_essence: 'Definicja pojęcia' };
    for (const id of inequalityLessons) {
      const enriched = enrichTheoryPillWithVisual(rawPill, id);
      expect(enriched.diagram).toBeDefined();
      expect(enriched.concept_essence).toBe('Definicja pojęcia');
    }
  });

  it('diagram labels on the far left (x <= 100) are not centered, preventing left-edge cutoffs', () => {
    for (const id of inequalityLessons) {
      const diagram = THEORY_DIAGRAMS[id];
      if (diagram.labels) {
        for (const lbl of diagram.labels) {
          // If label is on the left side of the diagram, it should not default to middle anchor
          // without having anchor set or being handled by smart anchor
          if (lbl.x <= 60) {
            expect(lbl.anchor === 'start' || lbl.anchor === undefined).toBe(true);
          }
        }
      }
    }
  });

  it('formatSvgText cleanly replaces LaTeX entities into unicode without damage', () => {
    expect(formatSvgText('x > a \\implies x \\in (a, +\\infty)')).toBe('x > a ⟹ x ∈ (a, +∞)');
    expect(formatSvgText('x \\ge a \\implies x \\in \\langle a, +\\infty)')).toBe('x ≥ a ⟹ x ∈ ⟨a, +∞)');
    expect(formatSvgText('\\Delta = b^2 - 4ac')).toBe('Δ = b² - 4ac');
  });

  it('getCandidateLessonVisualIds correctly resolves all ID variations for Dział 5 and 8', () => {
    const rawPill = { title: 'Test Lesson', concept_essence: 'Definicja pojęcia' };
    const dzial5Variants = ['lesson-5-1', 'dzial-5-lekcja-1', 'dzial-5-1', 'dzial-5', '5.1', '5-1', 'lesson-5.1'];
    for (const variant of dzial5Variants) {
      const enriched = enrichTheoryPillWithVisual(rawPill, variant);
      expect(enriched.diagram, `Failed to resolve diagram for ${variant}`).toBeDefined();
      expect(enriched.diagram.title).toContain('Reguła zmiany zwrotu');
    }

    const dzial8Variants = ['lesson-8-2', 'dzial-8-lekcja-2', 'dzial-8-2', '8.2', 'lesson-8.2'];
    for (const variant of dzial8Variants) {
      const enriched = enrichTheoryPillWithVisual(rawPill, variant);
      expect(enriched.diagram, `Failed to resolve diagram for ${variant}`).toBeDefined();
      expect(enriched.diagram.title).toContain('Rozwiązywanie nierówności kwadratowej');
    }
  });

  it('all diagram labels starting at x <= 60 fit comfortably within diagram width (<= 540) to prevent right-edge clipping', () => {
    for (const id of inequalityLessons) {
      const diagram = THEORY_DIAGRAMS[id];
      if (diagram.labels) {
        for (const lbl of diagram.labels) {
          if (lbl.anchor === 'start' || (lbl.x <= 120 && !lbl.anchor)) {
            const cleanText = formatSvgText(lbl.text);
            const fontSize = lbl.fontSize || 12;
            const approxWidth = cleanText.length * (fontSize * 0.65);
            const rightEdge = lbl.x + approxWidth;
            expect(rightEdge, `Label "${cleanText}" in ${id} overflows width 540 (rightEdge: ${rightEdge})`).toBeLessThanOrEqual(540);
          }
        }
      }
    }
  });

  it('parabola vertex W and polygon points in lesson-8-1 and lesson-8-2 are mathematically aligned to the bezier curve (y=175)', () => {
    const l81 = THEORY_DIAGRAMS['lesson-8-1'];
    const wPoint81 = l81.points?.find(p => p.label?.includes('W'));
    expect(wPoint81).toBeDefined();
    expect(wPoint81?.y).toBe(175);

    const l82 = THEORY_DIAGRAMS['lesson-8-2'];
    const wPoint82 = l82.points?.find(p => p.label?.includes('W'));
    expect(wPoint82).toBeDefined();
    expect(wPoint82?.y).toBe(175);

    // Verify red zone polygon vertex point is at y=175
    const redPolygon = l82.polygons?.[2];
    expect(redPolygon).toBeDefined();
    expect(Array.isArray(redPolygon?.points)).toBe(true);
    if (Array.isArray(redPolygon?.points)) {
      const vertexPolyPoint = (redPolygon.points as [number, number][]).find(pt => pt[0] === 270);
      expect(vertexPolyPoint).toBeDefined();
      expect(vertexPolyPoint?.[1]).toBe(175);
    }
  });

  it('master curriculum JSON and mirror contain valid escaped LaTeX \\neq and no unwanted newlines in formulas', () => {
    const srcPath = path.resolve(process.cwd(), 'seed/curriculum/curriculum_matematyka.json');
    const content = fs.readFileSync(srcPath, 'utf8');
    const parsed = JSON.parse(content);
    
    // Check topic 2, lesson 1 (Definicja logarytmu)
    const topic2Lesson1 = parsed.topics[1].lessons[0];
    const essence = topic2Lesson1.theory_pill.concept_essence;
    expect(essence).toContain('a \\neq 1');
    expect(essence).not.toMatch(/\n\s*eq\b/);

    // Verify mirror exists and has same content
    const mirrorPath = 'c:/Users/mateu/Downloads/mat/curriculum_matematyka.json';
    if (fs.existsSync(mirrorPath)) {
      const mirrorContent = fs.readFileSync(mirrorPath, 'utf8');
      const mirrorParsed = JSON.parse(mirrorContent);
      expect(mirrorParsed.topics[1].lessons[0].theory_pill.concept_essence).toBe(essence);
    }
  });

  it('lesson-8-1 roots points (x1, x2) are mathematically aligned with the parabola curve intersection at y=140', () => {
    const l81 = THEORY_DIAGRAMS['lesson-8-1'];
    const x1 = l81.points?.find(p => p.label?.includes('x₁'));
    const x2 = l81.points?.find(p => p.label?.includes('x₂'));
    expect(x1).toBeDefined();
    expect(x1?.x).toBe(185);
    expect(x1?.y).toBe(140);
    expect(x2).toBeDefined();
    expect(x2?.x).toBe(355);
    expect(x2?.y).toBe(140);
  });

  it('lesson-8-3 quadratic curves pass through their respective roots points at y=135', () => {
    const l83 = THEORY_DIAGRAMS['lesson-8-3'];
    expect(l83.curves?.[0]?.path).toContain('Q 150 277.5');
    expect(l83.curves?.[1]?.path).toContain('Q 390 277.5');
  });

  it('zero Sparkles icons remain in src/components', () => {
    const compDir = path.resolve(process.cwd(), 'src/components');
    const getAllFiles = (dir: string): string[] => {
      let results: string[] = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat && stat.isDirectory()) {
          results = results.concat(getAllFiles(full));
        } else if (/\.(tsx|ts)$/.test(file) && !file.includes('.test.')) {
          results.push(full);
        }
      });
      return results;
    };

    const files = getAllFiles(compDir);
    const filesWithSparkles: string[] = [];
    files.forEach(f => {
      const content = fs.readFileSync(f, 'utf8');
      if (content.includes('Sparkles')) {
        filesWithSparkles.push(path.relative(compDir, f));
      }
    });

    expect(filesWithSparkles, `Found Sparkles in: ${filesWithSparkles.join(', ')}`).toEqual([]);
  });

  it('all function and linear lessons in Dział 9 and 10 have registered Mafs PLOT diagrams', () => {
    const dzial9and10 = [
      'lesson-9-1',
      'lesson-9-2',
      'lesson-9-3',
      'lesson-9-4',
      'lesson-10-1',
      'lesson-10-2',
      'lesson-10-3',
      'lesson-10-4',
    ];
    for (const id of dzial9and10) {
      const diagram = THEORY_DIAGRAMS[id];
      expect(diagram, `Missing diagram for ${id}`).toBeDefined();
      expect(diagram.type).toBe('PLOT');
      expect((diagram as any).plotData, `Missing plotData for ${id}`).toBeDefined();
      expect(diagram.title).toBeTruthy();
      expect(diagram.formulaBadge).toBeTruthy();
    }
  });

  it('all inequality and number line lessons in Dział 3, 5, 7, 8 have registered Mafs PLOT diagrams', () => {
    const numberLineLessons = [
      'lesson-3-1',
      'lesson-3-2',
      'lesson-5-1',
      'lesson-5-2',
      'lesson-5-3',
      'lesson-7-2',
      'lesson-8-1',
      'lesson-8-2',
      'lesson-8-3',
      'lesson-8-4',
    ];
    for (const id of numberLineLessons) {
      const diagram = THEORY_DIAGRAMS[id];
      expect(diagram, `Missing diagram for ${id}`).toBeDefined();
      expect(diagram.type).toBe('PLOT');
      expect((diagram as any).plotData, `Missing plotData for ${id}`).toBeDefined();
      expect(diagram.title).toBeTruthy();
      expect(diagram.formulaBadge).toBeTruthy();
    }
  });

  it('lesson-6-1 has no parabola diagram assigned in THEORY_DIAGRAMS', () => {
    expect(THEORY_DIAGRAMS['lesson-6-1']).toBeUndefined();
  });
});

