// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { renderSvgTextContent, formatSvgText } from '../MathDiagram';
import React from 'react';
import { render } from '@testing-library/react';

describe('MathDiagram - SvgText and Subscripts Rendering', () => {
  it('correctly handles plain text without underscores', () => {
    const res = renderSvgTextContent('Prosta k: y = 2x + 1');
    expect(res).toBe('Prosta k: y = 2x + 1');
  });

  it('correctly renders ASCII subscripts as SVG tspans with baseline shift', () => {
    const { container } = render(
      <svg>
        <text>{renderSvgTextContent('A(x_A, y_A)')}</text>
      </svg>
    );

    const tspans = container.querySelectorAll('tspan');
    expect(tspans.length).toBeGreaterThanOrEqual(2);
    const subTspans = Array.from(tspans).filter(t => t.getAttribute('dy') === '3');
    expect(subTspans.length).toBe(2);
    expect(subTspans[0].textContent).toBe('A');
    expect(subTspans[1].textContent).toBe('A');
  });

  it('correctly handles non-ASCII Polish subscript characters like y_śr = 9', () => {
    const { container } = render(
      <svg>
        <text>{renderSvgTextContent('y_śr = 9')}</text>
      </svg>
    );

    const tspans = container.querySelectorAll('tspan');
    expect(tspans.length).toBeGreaterThanOrEqual(1);
    const subTspans = Array.from(tspans).filter(t => t.getAttribute('dy') === '3');
    expect(subTspans.length).toBe(1);
    expect(subTspans[0].textContent).toBe('śr');
  });

  it('correctly handles LaTeX delta and differences: \\Delta x = x_B - x_A', () => {
    const { container } = render(
      <svg>
        <text>{renderSvgTextContent('\\Delta x = x_B - x_A')}</text>
      </svg>
    );

    const textEl = container.querySelector('text');
    expect(textEl?.textContent).toContain('Δ');
    const subTspans = Array.from(container.querySelectorAll('tspan')).filter(t => t.getAttribute('dy') === '3');
    expect(subTspans.length).toBe(2);
    expect(subTspans[0].textContent).toBe('B');
    expect(subTspans[1].textContent).toBe('A');
  });

  it('correctly formats formatSvgText for math symbols', () => {
    expect(formatSvgText('\\Delta')).toBe('Δ');
    expect(formatSvgText('\\alpha')).toBe('α');
    expect(formatSvgText('x^2')).toBe('x²');
    expect(formatSvgText('x_1')).toBe('x₁');
  });
});
