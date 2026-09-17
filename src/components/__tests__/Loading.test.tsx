// @vitest-environment happy-dom
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { LoadingSpinner, LoadingScreen, AsyncContent } from '../Loading';

describe('Loading components', () => {
  const onUnhandledRejection = (reason: any) => {
    if (reason?.name === 'AbortError' || reason?.message?.includes('The animation was canceled')) {
      return;
    }
  };

  beforeAll(() => {
    process.on('unhandledRejection', onUnhandledRejection);
  });

  afterAll(() => {
    process.removeListener('unhandledRejection', onUnhandledRejection);
  });

  afterEach(() => {
    cleanup();
  });
  it('renders LoadingSpinner with default and custom sizes', () => {
    const { container, rerender } = render(<LoadingSpinner size="md" />);
    expect(screen.getByRole('status')).toBeDefined();
    expect(container.querySelector('svg')).toBeDefined();

    rerender(<LoadingSpinner size="sm" />);
    expect(screen.getByRole('status')).toBeDefined();

    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByRole('status')).toBeDefined();

    rerender(<LoadingSpinner size="xl" color="#38bdf8" />);
    expect(screen.getByRole('status')).toBeDefined();
    expect(container.querySelector('svg')).toBeDefined();
  });

  it('renders LoadingScreen with custom message and brand elements', () => {
    render(<LoadingScreen message="Testowe ładowanie..." subtext="Pobieranie bazy zadań CKE" />);
    expect(screen.getByText('Testowe ładowanie...')).toBeDefined();
    expect(screen.getByText('Pobieranie bazy zadań CKE')).toBeDefined();
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0);
  });

  it('renders AsyncContent correctly in loading and ready states', () => {
    const { rerender } = render(
      <AsyncContent isLoading={true} fallbackMessage="Czekaj na dane..." className="custom-wrapper">
        <div>Dane załadowane</div>
      </AsyncContent>
    );

    expect(screen.getByText('Czekaj na dane...')).toBeDefined();

    rerender(
      <AsyncContent isLoading={false}>
        <div>Dane załadowane</div>
      </AsyncContent>
    );

    expect(screen.getByText('Dane załadowane')).toBeDefined();
  });
});
