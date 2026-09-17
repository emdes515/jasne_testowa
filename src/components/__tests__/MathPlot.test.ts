import { describe, it, expect } from 'vitest';
import { normalizeTask } from '../../data/mathTasks';

describe('normalizeTask - plot preservation', () => {
  it('should preserve plot property when present on raw task', () => {
    const rawTask = {
      id: 'task-4-4-1',
      type: 'SINGLE_CHOICE',
      question: 'Na podstawie wykresu funkcji...',
      plot: {
        type: 'PIECEWISE_LINEAR',
        xRange: [-5, 7],
        yRange: [-4, 5],
        gridStep: 1,
        segments: [
          { from: [-3, -2], to: [0, 1], startDot: 'filled', endDot: 'none' }
        ]
      }
    };

    const normalized = normalizeTask(rawTask, { id: 'lesson-4-4', title: 'Odczytywanie z wykresu' }, { id: 'dzial-4' });

    expect(normalized.plot).toBeDefined();
    expect(normalized.plot.type).toBe('PIECEWISE_LINEAR');
    expect(normalized.plot.segments).toHaveLength(1);
    expect(normalized.plot.xRange).toEqual([-5, 7]);
  });

  it('should preserve GEOMETRY plots with hideAxes and segment labels', () => {
    const rawGeometryTask = {
      id: 'task-9-6-6',
      type: 'SINGLE_CHOICE',
      question: 'Na rysunku proste k i l są równoległe...',
      plot: {
        type: 'GEOMETRY',
        hideAxes: true,
        hideGrid: true,
        xRange: [0, 10],
        yRange: [0, 8],
        segments: [
          { from: [1, 1], to: [4, 1.45], color: '#F59E0B', label: 'a = 4' }
        ],
        labels: [
          { x: 3.4, y: 4.6, text: 'k' }
        ]
      }
    };

    const normalized = normalizeTask(rawGeometryTask, { id: 'lesson-9-6', title: 'Twierdzenie Talesa' }, { id: 'dzial-9' });

    expect(normalized.plot).toBeDefined();
    expect(normalized.plot.hideAxes).toBe(true);
    expect(normalized.plot.hideGrid).toBe(true);
    expect(normalized.plot.segments[0].label).toBe('a = 4');
    expect(normalized.plot.labels[0].text).toBe('k');
  });

  it('should leave plot undefined if raw task has no plot', () => {
    const rawTask = {
      id: 'task-1-1-1',
      type: 'SINGLE_CHOICE',
      question: 'Oblicz wartość wyrażenia...'
    };

    const normalized = normalizeTask(rawTask, { id: 'lesson-1-1', title: 'Zbiory' }, { id: 'dzial-1' });

    expect(normalized.plot).toBeUndefined();
  });
});
