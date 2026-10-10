/**
 * Rysunki w pigułkach wiedzy kursu matematyki PP.
 * Regresja: flaga noAutoVisual odcinała wszystkie 75 pigułek od rejestru schematów.
 */
import { describe, it, expect } from 'vitest';
import blueprints from '../math/generated/math_blueprints.json';
import {
  MATH_PP_LESSON_VISUALS,
  THEORY_DIAGRAMS,
  GEOMETRIC_ARCHETYPES,
  THEORY_NUMBER_LINES,
  enrichTheoryPillWithVisual
} from '../mathVisualRegistry';

const lessons = (blueprints as any[]).flatMap(d => d.lessons as any[]);

describe('Rysunki w pigułkach matematyki PP', () => {
  it('każdy wpis mapy wskazuje istniejącą lekcję i istniejący schemat', () => {
    for (const [key, visual] of Object.entries(MATH_PP_LESSON_VISUALS)) {
      expect(lessons.some(l => l.id === `math-lesson-${key}`), `lekcja ${key}`).toBe(true);
      expect(THEORY_DIAGRAMS[visual.diagram] || GEOMETRIC_ARCHETYPES[visual.diagram], `schemat ${visual.diagram}`).toBeTruthy();
      if (visual.numberLine) expect(THEORY_NUMBER_LINES[visual.numberLine], `oś ${visual.numberLine}`).toBeTruthy();
    }
  });

  it('pigułka lekcji z mapy dostaje rysunek, a pozostałe nie dostają rysunku z cudzego tematu', () => {
    for (const lesson of lessons) {
      const key = String(lesson.id).replace('math-lesson-', '');
      const enriched = enrichTheoryPillWithVisual(lesson.theory_pill, lesson.id);
      if (MATH_PP_LESSON_VISUALS[key]) expect(enriched.diagram, lesson.id).toBeTruthy();
      else expect(enriched.diagram ?? null, lesson.id).toBeNull();
    }
    expect(Object.keys(MATH_PP_LESSON_VISUALS).length).toBeGreaterThanOrEqual(24);
  });
});
