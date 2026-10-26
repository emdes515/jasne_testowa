// @vitest-environment happy-dom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { MathDiagram } from '../../components/MathDiagram';
import { MATH_PP_LESSON_VISUALS, resolveLessonDiagram } from '../mathVisualRegistry';

afterEach(cleanup);

describe('Rysunki w pigułkach matematyki PP – renderowanie', () => {
  it.each(Object.entries(MATH_PP_LESSON_VISUALS))('lekcja %s: schemat rysuje się bez błędu', (_key, visual) => {
    for (const key of [visual.diagram, visual.trapDiagram].filter(Boolean) as string[]) {
      const { container } = render(<MathDiagram diagram={resolveLessonDiagram(key) as any} />);
      expect(container.querySelector('svg'), key).not.toBeNull();
      expect(container.querySelector('.katex-error'), key).toBeNull();
      cleanup();
    }
  });
});
