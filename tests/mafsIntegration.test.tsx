// @vitest-environment happy-dom
import React from 'react';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MathPlot, MafsPlot, PlotData } from '../src/components/MathPlot';
import { MathDiagram } from '../src/components/MathDiagram';

beforeAll(() => {
  if (typeof window !== 'undefined' && !window.ResizeObserver) {
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as any;
  }
});

afterEach(() => {
  cleanup();
});

describe('Native MathPlot & Pure Vector SVG Visualizations', () => {
  describe('MathPlot Component', () => {
    it('renders parabola correctly in Cartesian coordinates', () => {
      const plot: PlotData = {
        type: 'PARABOLA',
        xRange: [-5, 5],
        yRange: [-5, 5],
        parabola: {
          a: 1,
          p: 2,
          q: -3,
          color: '#FFB800'
        },
        axisOfSymmetry: 2,
        points: [
          { x: 2, y: -3, label: 'W(2,-3)', dot: 'filled' }
        ]
      };

      const { container } = render(<MathPlot plot={plot} width={360} />);
      expect(container.querySelector('svg')).toBeDefined();
      expect(container.textContent).toContain('W(2,-3)');
      expect(container.textContent).toContain('Wektorowy układ współrzędnych CKE');
    });

    it('renders piecewise linear function with segments and hollow/filled dots', () => {
      const plot: PlotData = {
        type: 'PIECEWISE_LINEAR',
        xRange: [-6, 6],
        yRange: [-4, 5],
        segments: [
          { from: [-5, 0], to: [-2, 3], startDot: 'filled', endDot: 'filled', color: '#10B981' },
          { from: [-2, 3], to: [1, -3], startDot: 'none', endDot: 'hollow', color: '#10B981' }
        ],
        points: [
          { x: -5, y: 0, label: 'A(-5,0)' },
          { x: -2, y: 3, label: 'B(-2,3)' }
        ]
      };

      const { container } = render(<MathPlot plot={plot} width={360} />);
      expect(container.querySelector('svg')).toBeDefined();
      expect(container.textContent).toContain('A(-5,0)');
      expect(container.textContent).toContain('B(-2,3)');
    });

    it('renders linear function with slope and intercept', () => {
      const plot: PlotData = {
        type: 'LINEAR',
        xRange: [-4, 4],
        yRange: [-4, 4],
        lines: [
          { slope: 2, intercept: -1, color: '#38BDF8' }
        ],
        points: [
          { x: 0.5, y: 0, label: 'x0=0.5', dot: 'filled' }
        ]
      };

      const { container } = render(<MathPlot plot={plot} width={360} />);
      expect(container.querySelector('svg')).toBeDefined();
      expect(container.textContent).toContain('x0=0.5');
    });

    it('renders multi-panel comparison plots', () => {
      const plot: PlotData = {
        panels: [
          {
            title: 'Panel 1: a > 0',
            badge: 'Rosnąca',
            plot: {
              xRange: [-3, 3],
              yRange: [-3, 3],
              lines: [{ slope: 1, intercept: 0 }]
            }
          },
          {
            title: 'Panel 2: a < 0',
            badge: 'Malejąca',
            plot: {
              xRange: [-3, 3],
              yRange: [-3, 3],
              lines: [{ slope: -1, intercept: 0 }]
            }
          }
        ]
      };

      const { container } = render(<MathPlot plot={plot} />);
      expect(screen.getByText('Panel 1: a > 0')).toBeDefined();
      expect(screen.getByText('Panel 2: a < 0')).toBeDefined();
      expect(screen.getByText('Rosnąca')).toBeDefined();
      expect(screen.getByText('Malejąca')).toBeDefined();
    });

    it('renders inequality shaded regions without errors', () => {
      const plot: PlotData = {
        type: 'PARABOLA',
        xRange: [-4, 4],
        yRange: [-5, 5],
        parabola: { a: 1, p: 0, q: -4 },
        inequalityRegions: [
          { fromX: -4, toX: -2, condition: 'above', color: '#10B981' },
          { fromX: 2, toX: 4, condition: 'above', color: '#10B981' }
        ]
      };

      const { container } = render(<MathPlot plot={plot} />);
      const polygons = container.querySelectorAll('polygon');
      expect(polygons.length).toBeGreaterThanOrEqual(2);
    });

    it('renders backwards-compatible MafsPlot export', () => {
      const plot: PlotData = {
        type: 'LINEAR',
        lines: [{ slope: 1, intercept: 0 }]
      };
      const { container } = render(<MafsPlot plot={plot} />);
      expect(container.querySelector('svg')).toBeDefined();
    });
  });

  describe('MathDiagram with Native SVG Integration', () => {
    it('automatically defaults PlotData to MathPlot', () => {
      const plot: PlotData = {
        type: 'PARABOLA',
        parabola: { a: 1, p: 0, q: 0 }
      };

      const { container } = render(<MathDiagram diagram={plot} />);
      expect(container.querySelector('svg')).toBeDefined();
      expect(container.textContent).toContain('Wektorowy układ współrzędnych CKE');
    });

    it('does NOT show "Zbadaj w Mafs" button (Mafs lab pop-up completely removed)', () => {
      const diagram = {
        type: 'INFOGRAPHIC' as const,
        title: 'Własności paraboli i wyróżnik delta',
        formulaBadge: 'y = ax^2 + bx + c',
        width: 360,
        height: 120
      };

      render(<MathDiagram diagram={diagram} />);
      expect(screen.queryByText('Zbadaj w Mafs')).toBeNull();
      expect(screen.queryByText('Laboratorium Matematyczne Mafs')).toBeNull();
    });
  });
});
