import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import React from 'react';

// Mock window.location.reload
const mockReload = vi.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload, href: '/' },
  writable: true,
});

// Test component that throws error
const ThrowErrorComponent: React.FC<{ shouldThrow: boolean }> = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    mockReload.mockClear();
  });

  it('renders children when no error occurs', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={false} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('shows fallback UI when error occurs', () => {
    // Suppress console.error for this test
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/Ups! Coś poszło nie tak/i)).toBeInTheDocument();
    expect(screen.getByText(/Odśwież stronę/i)).toBeInTheDocument();
    expect(screen.getByText(/Strona główna/i)).toBeInTheDocument();
    
    vi.restoreAllMocks();
  });

  it('calls onError callback when error is caught', () => {
    const onErrorMock = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary onError={onErrorMock}>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(onErrorMock).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
    
    vi.restoreAllMocks();
  });

  it('reloads page when reset button is clicked', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const resetButton = screen.getByText(/Odśwież stronę/i);
    fireEvent.click(resetButton);
    
    expect(mockReload).toHaveBeenCalledTimes(1);
    
    vi.restoreAllMocks();
  });

  it('navigates to home when home button is clicked', () => {
    const originalHref = window.location.href;
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const homeButton = screen.getByText(/Strona główna/i);
    fireEvent.click(homeButton);
    
    expect(window.location.href).toBe('/');
    
    vi.restoreAllMocks();
  });

  it('renders custom fallback when provided', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const customFallback = <div data-testid="custom-fallback">Custom error message</div>;
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    
    vi.restoreAllMocks();
  });
});
