// @vitest-environment happy-dom
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { OpenTaskWorkspace } from '../OpenTaskWorkspace';
import { SessionRunner } from '../SessionRunner';
import { __resetDatabaseConnectionForTests, SESSION_STORAGE_KEY } from '../../services/sessionRecoveryService';

// Mock dependencies for SessionRunner
vi.mock('../../lib/firebase', () => ({
  auth: { currentUser: null },
  db: {}
}));

vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

describe('Session Recovery Component Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    __resetDatabaseConnectionForTests();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
    __resetDatabaseConnectionForTests();
  });

  describe('OpenTaskWorkspace whiteboard restoration', () => {
    it('initializes activeTab to whiteboard when savedCanvasDataUrl is provided with empty text value', () => {
      const mockSavedDrawing = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

      render(
        <OpenTaskWorkspace
          task={{ id: 'task-open-1', type: 'OPEN_PROOF', question: 'Wykaż tożsamość' }}
          value=""
          onChangeValue={vi.fn()}
          savedCanvasDataUrl={mockSavedDrawing}
          onSaveCanvasData={vi.fn()}
        />
      );

      // Verify that the whiteboard toggle is active
      const whiteboardToggle = document.getElementById('toggle-math-whiteboard-mode');
      expect(whiteboardToggle?.className).toContain('bg-[#FFB800]');

      // Verify whiteboard tools are present
      const clearBtn = screen.getByTitle('Wyczyść tablicę');
      expect(clearBtn).toBeDefined();

      const penBtn = screen.getByText('Pióro');
      expect(penBtn).toBeDefined();
    });

    it('defaults activeTab to keyboard when user already has typed text value', () => {
      const mockSavedDrawing = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

      render(
        <OpenTaskWorkspace
          task={{ id: 'task-open-1', type: 'OPEN_PROOF', question: 'Wykaż tożsamość' }}
          value="x^2 + 4 = 0"
          onChangeValue={vi.fn()}
          savedCanvasDataUrl={mockSavedDrawing}
          onSaveCanvasData={vi.fn()}
        />
      );

      // Verify that keyboard toggle button has active styling
      const keyboardToggle = document.getElementById('toggle-math-keyboard-mode');
      expect(keyboardToggle?.className).toContain('bg-[#FFB800]');

      // Verify user answer preview is displayed
      expect(screen.getByText('Twoja odpowiedź:')).toBeDefined();
    });
  });

  describe('SessionRunner state preservation on initial mount', () => {
    const mockTasks = [
      { id: 'task-rec-1', type: 'SINGLE_CHOICE', question: 'Zadanie 1', options: [{ id: 'A', text: 'Odp A' }] },
      { id: 'task-rec-2', type: 'SINGLE_CHOICE', question: 'Zadanie 2', options: [{ id: 'B', text: 'Odp B' }] },
      { id: 'task-rec-3', type: 'SINGLE_CHOICE', question: 'Zadanie 3', options: [{ id: 'C', text: 'Odp C' }] }
    ];

    it('does NOT wipe restored queue index, active time, or answers on mount', async () => {
      const restoredSessionData = {
        sessionId: 'sess_persisted_test_77',
        lessonId: '1.1',
        lessonTitle: 'Lekcja 1.1: Potęgi i pierwiastki',
        tasks: mockTasks,
        taskQueue: mockTasks,
        currentQueueIndex: 2,
        currentStep: 1, // tasks mode
        theorySubStep: 0,
        selectedOption: 'C',
        openAnswerText: '',
        activeSeconds: 195,
        sessionMistakesCount: 1,
        correctAnswersCount: 2,
        earnedXp: 35,
        earnedCoins: 25,
        unlockedHints: { 'task-rec-3': 'Wskazówka do zadania 3' },
        isRestoredSession: true
      };

      render(
        <SessionRunner
          sessionData={restoredSessionData as any}
          userState={{ coins: 100, hearts: 5, xp: 50, streakDays: 3, isPro: false } as any}
          onCompleteSession={vi.fn()}
          onCancelSession={vi.fn()}
        />
      );

      // Verify that SessionRunner renders Task 3, NOT Task 1!
      expect(screen.getByText('Zadanie 3')).toBeDefined();

      // Fast-forward debounce timer (300ms)
      await act(async () => {
        await new Promise(r => setTimeout(r, 350));
      });

      // Verify that localStorage contains the preserved values and was NOT wiped to 0
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);

      expect(parsed.sessionId).toBe('sess_persisted_test_77');
      expect(parsed.currentQueueIndex).toBe(2);
      expect(parsed.currentStep).toBe(1);
      expect(parsed.activeSeconds).toBeGreaterThanOrEqual(195);
      expect(parsed.correctAnswersCount).toBe(2);
      expect(parsed.earnedXp).toBe(35);
      expect(parsed.earnedCoins).toBe(25);
    });

    it('preserves theorySubStep when resuming in theory mode (step 0)', async () => {
      const restoredTheorySession = {
        sessionId: 'sess_theory_restore_12',
        lessonId: '1.1',
        lessonTitle: 'Lekcja 1.1: Potęgi i pierwiastki',
        tasks: mockTasks,
        taskQueue: mockTasks,
        currentQueueIndex: 0,
        currentStep: 0, // theory mode
        theorySubStep: 2, // Przykład / Analiza
        selectedOption: null,
        openAnswerText: '',
        activeSeconds: 45,
        sessionMistakesCount: 0,
        correctAnswersCount: 0,
        isRestoredSession: true
      };

      render(
        <SessionRunner
          sessionData={restoredTheorySession as any}
          userState={{ coins: 100, hearts: 5, xp: 50, streakDays: 3, isPro: false } as any}
          onCompleteSession={vi.fn()}
          onCancelSession={vi.fn()}
        />
      );

      // Fast-forward debounce timer
      await act(async () => {
        await new Promise(r => setTimeout(r, 350));
      });

      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);

      // theorySubStep must NOT be reset to 0!
      expect(parsed.theorySubStep).toBe(2);
      expect(parsed.currentStep).toBe(0);
    });
  });
});
