// @vitest-environment happy-dom
import React from 'react';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MafsPlot } from '../src/components/mafs/MafsPlot';
import { MafsInteractiveLab } from '../src/components/mafs/MafsInteractiveLab';
import { MathDiagram } from '../src/components/MathDiagram';
import { PlotData } from '../src/components/MathPlot';

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

describe('Mafs Integration & Mathematical Visualizations', () => {
  describe('MafsPlot Component', () => {
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

      const { container } = render(<MafsPlot plot={plot} width={360} />);
      expect(container.querySelector('.MafsView')).toBeDefined();
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

      const { container } = render(<MafsPlot plot={plot} width={360} />);
      expect(container.querySelector('.MafsView')).toBeDefined();
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

      const { container } = render(<MafsPlot plot={plot} width={360} />);
      expect(container.querySelector('.MafsView')).toBeDefined();
      expect(container.textContent).toContain('x0=0.5');
    });
  });

  describe('MafsInteractiveLab Component', () => {
    it('renders ParabolaLab with vertex and inequality controls', () => {
      const { container } = render(<MafsInteractiveLab initialLab="PARABOLA" />);
      expect(screen.getByText('Laboratorium Matematyczne Mafs')).toBeDefined();
      expect(screen.getByText('Parabola & Nierówności')).toBeDefined();
      expect(container.textContent).toContain('Postać kanoniczna & wierzchołek');
      expect(container.textContent).toContain('W = (1, -4)');
      expect(screen.getByText('f(x) ≥ 0 (nad osią)')).toBeDefined();
      expect(screen.getByText('f(x) ≤ 0 (pod osią)')).toBeDefined();
    });

    it('renders LinearFunctionLab and toggles perpendicular line', () => {
      const { container } = render(<MafsInteractiveLab initialLab="LINEAR" />);
      expect(screen.getByText('Funkcja Liniowa')).toBeDefined();
      expect(container.textContent).toContain('Równanie prostej y = ax + b');
      expect(container.textContent).toContain('Współczynnik kierunkowy');

      const perpCheckbox = screen.getByRole('checkbox');
      expect(perpCheckbox).toBeDefined();
      fireEvent.click(perpCheckbox);
      expect(container.textContent).toContain('a₁ · a₂ = -1');
    });

    it('renders GraphInspectorLab with probe and filters', () => {
      const { container } = render(<MafsInteractiveLab initialLab="GRAPH_INSPECTOR" />);
      expect(screen.getByText('Sonda Wykresu CKE')).toBeDefined();
      expect(container.textContent).toContain('Odczyt wartości f(x)');
      expect(container.textContent).toContain('D_f =');
      expect(container.textContent).toContain('Miejsca zerowe f(x) = 0');

      const domainBtn = screen.getByText('Dziedzina D_f (oś OX)');
      fireEvent.click(domainBtn);
      expect(domainBtn).toBeDefined();
    });

    it('renders AbsoluteValueLab and updates radius', () => {
      const { container } = render(<MafsInteractiveLab initialLab="ABSOLUTE_VALUE" />);
      expect(screen.getByText('Wartość Bezwzględna')).toBeDefined();
      expect(container.textContent).toContain('Interpretacja geometryczna odległości');
      expect(container.textContent).toContain('Środek');
      expect(container.textContent).toContain('Promień');
    });

    it('renders TrigonometryCircleLab with angle presets and Pythagorean identity', () => {
      const { container } = render(<MafsInteractiveLab initialLab="TRIGONOMETRY" />);
      expect(screen.getByText('Trygonometria (Okrąg)')).toBeDefined();
      expect(container.textContent).toContain('Kąt α:');
      expect(container.textContent).toContain('cos α (poziom)');
      expect(container.textContent).toContain('sin α (pion)');
      expect(container.textContent).toContain('sin²α + cos²α = 1');

      // Test kliknięcia w preset kąta 60 stopni
      const btn60 = screen.getByText('60°');
      fireEvent.click(btn60);
      expect(container.textContent).toContain('60°');
    });
  });

  describe('MathDiagram with Mafs Integration', () => {
    it('automatically defaults PlotData to MafsPlot', () => {
      const plot: PlotData = {
        type: 'PARABOLA',
        parabola: { a: 1, p: 0, q: 0 }
      };

      const { container } = render(<MathDiagram diagram={plot} />);
      expect(container.querySelector('.MafsView')).toBeDefined();
    });

    it('shows "Zbadaj w Mafs" button when topic relates to quadratic function', () => {
      const diagram = {
        type: 'INFOGRAPHIC' as const,
        title: 'Własności paraboli i wyróżnik delta',
        formulaBadge: 'y = ax^2 + bx + c',
        width: 360,
        height: 120
      };

      const { container } = render(<MathDiagram diagram={diagram} />);
      const mafsToggle = screen.getByText('Zbadaj w Mafs');
      expect(mafsToggle).toBeDefined();

      // Kliknięcie przełącza na laboratorium Mafs
      fireEvent.click(mafsToggle);
      expect(screen.getByText('Laboratorium Matematyczne Mafs')).toBeDefined();
      expect(screen.getByText('Pokaż schemat CKE')).toBeDefined();

      // Powtórne kliknięcie wraca do schematu CKE
      fireEvent.click(screen.getByText('Pokaż schemat CKE'));
      expect(screen.getByText('Zbadaj w Mafs')).toBeDefined();
    });
  });
});
