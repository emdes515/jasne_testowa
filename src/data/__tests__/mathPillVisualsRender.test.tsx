// @vitest-environment happy-dom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { MathDiagram } from '../../components/MathDiagram';
import { MATH_PP_LESSON_VISUALS, THEORY_DIAGRAMS, GEOMETRIC_ARCHETYPES } from '../mathVisualRegistry';

afterEach(cleanup);

describe('Rysunki w pigułkach matematyki PP – renderowanie', () => {
  it.each(Object.entries(MATH_PP_LESSON_VISUALS))('lekcja %s: schemat rysuje się bez błędu', (_key, visual) => {
    const diagram = THEORY_DIAGRAMS[visual.diagram] || GEOMETRIC_ARCHETYPES[visual.diagram];
    const { container } = render(<MathDiagram diagram={diagram as any} />);
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.querySelector('.katex-error')).toBeNull();
  });
});
