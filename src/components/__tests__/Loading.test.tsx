// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { LoadingSpinner, LoadingScreen, AsyncContent } from '../Loading';

describe('Loading components', () => {
  it('renders LoadingSpinner with default and custom sizes', () => {
    const { container, rerender } = render(<LoadingSpinner size="md" />);
    expect(screen.getByRole('status')).toBeDefined();
    expect(container.querySelector('svg')).toBeDefined();

    rerender(<LoadingSpinner size="sm" />);
    expect(screen.getByRole('status')).toBeDefined();

    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders LoadingScreen with custom message and brand elements', () => {
    render(<LoadingScreen message="Testowe ładowanie..." />);
    expect(screen.getByText('Testowe ładowanie...')).toBeDefined();
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0);
  });

  it('renders AsyncContent correctly in loading and ready states', () => {
    const { rerender } = render(
      <AsyncContent isLoading={true} fallbackMessage="Czekaj na dane...">
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
