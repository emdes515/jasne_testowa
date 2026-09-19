// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import React from 'react';

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}));

vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

vi.mock('../../utils', () => ({
  triggerHaptic: vi.fn(),
  playSuccessSound: vi.fn()
}));

import { OnboardingOverlay } from '../OnboardingOverlay';

describe('OnboardingOverlay Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('renders Step 1 with default mathematics badge and 4 matura goals', () => {
    render(<OnboardingOverlay onClose={vi.fn()} />);

    expect(screen.getByText('MATEMATYKA PODSTAWOWA')).toBeDefined();
    expect(screen.getByText('W co celujesz na maturze z matematyki?')).toBeDefined();
    expect(screen.getByText('70%+ • Solidny wynik')).toBeDefined();
    expect(screen.getByText('30%+ • Zdać na luzie')).toBeDefined();
    expect(screen.getByText('100% • Top uczelnie')).toBeDefined();
    expect(screen.getByText('Szybka Poprawka / Ekspres')).toBeDefined();
  });

  it('advances from Step 1 to Step 2 with the CKE quadratic graph task', () => {
    render(<OnboardingOverlay onClose={vi.fn()} />);

    const continueBtn = screen.getByRole('button', { name: /DALEJ/i });
    fireEvent.click(continueBtn);

    expect(screen.getByText('PEWNIAK CKE • ANALIZA WYKRESU')).toBeDefined();
    expect(screen.getByText(/Wierzchołek paraboli: W = \(1, -4\)/i)).toBeDefined();
    expect(screen.getByText(/Zbiorem wartości funkcji/i)).toBeDefined();
  });

  it('handles wrong and correct answers in Step 2', () => {
    render(<OnboardingOverlay onClose={vi.fn()} />);

    // Go to step 2
    fireEvent.click(screen.getByRole('button', { name: /DALEJ/i }));

    // Click wrong answer B
    const optB = screen.getByRole('button', { name: /B\./i });
    fireEvent.click(optB);

    expect(screen.getByText(/Pułapka CKE!/i)).toBeDefined();

    // Click correct answer A
    const optA = screen.getByRole('button', { name: /A\./i });
    fireEvent.click(optA);

    expect(screen.getByText(/\+15 XP NA START!/i)).toBeDefined();

    // Advance timer
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    // Should now be on Step 3 (Bento Ecosystem)
    expect(screen.getByText('EKOSYSTEM MATURALNY JASNE')).toBeDefined();
    expect(screen.getByText(/System Mini-matur CKE/i)).toBeDefined();
  });

  it('completes the full flow and triggers onComplete', () => {
    const handleComplete = vi.fn();
    render(<OnboardingOverlay onClose={vi.fn()} onComplete={handleComplete} />);

    // Step 1 -> Step 2
    fireEvent.click(screen.getByRole('button', { name: /DALEJ/i }));

    // Step 2 -> Solve task
    fireEvent.click(screen.getByRole('button', { name: /A\./i }));
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    // Step 3 -> Click continue
    const step3Btn = screen.getByRole('button', { name: /ZOBACZ JAK WYGLĄDA KOKPIT/i });
    fireEvent.click(step3Btn);

    // Step 4 -> Interaktywny Kokpit
    expect(screen.getByText('PRZEGLĄD INTERFEJSU')).toBeDefined();
    const step4Btn = screen.getByRole('button', { name: /ODBIERZ SWÓJ PLAN NAUKI/i });
    fireEvent.click(step4Btn);

    // Step 5 -> Finałowy ekran
    expect(screen.getByText('DZIEŃ 1 SERII ODBLOKOWANY')).toBeDefined();
    expect(screen.getByText('Twój plan nauki z matematyki jest gotowy!')).toBeDefined();

    // Click guest continue
    const guestBtn = screen.getByRole('button', { name: /Przejdź do Dashboardu jako gość/i });
    fireEvent.click(guestBtn);

    expect(handleComplete).toHaveBeenCalledTimes(1);
    expect(handleComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        targetExam: 'matura_2025',
        targetScore: '70'
      }),
      false
    );
  });
});
