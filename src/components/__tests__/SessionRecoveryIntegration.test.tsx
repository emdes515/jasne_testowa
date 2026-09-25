// @vitest-environment happy-dom
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { OpenTaskWorkspace } from '../OpenTaskWorkspace';
import { SessionRunner } from '../SessionRunner';
import App from '../../App';
import { curriculumRepository } from '../../services/curriculumRepository';
import { __resetDatabaseConnectionForTests, SESSION_STORAGE_KEY } from '../../services/sessionRecoveryService';

// Mock dependencies for SessionRunner and App
vi.mock('../../lib/firebase', () => ({
  auth: { currentUser: null },
  db: {}
}));

vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null]
}));

vi.mock('../../lib/curriculumSync', () => ({
  checkSystemMetaVersion: vi.fn().mockResolvedValue({ upToDate: true, serverVersion: '2.0.0' }),
  APP_CURRICULUM_VERSION: '2.0.0'
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

    it('restores genuine theoryPill and does not degrade to emergency fallback text when resuming at step 0', async () => {
      const genuineTheoryPill = {
        title: 'Lekcja 1.1: Potęgi i pierwiastki',
        concept_essence: 'Potęgi o wykładniku wymiernym to uogólnienie potęgowania na ułamki.',
        matura_context: 'Pewniak maturalny CKE za 1 punkt.',
        core_formulas: [
          { name: 'Definicja', formula: 'a^{m/n} = \\sqrt[n]{a^m}', description: 'Przejście z potęgi na pierwiastek' }
        ],
        worked_example: {
          problem: 'Oblicz 8^{2/3}',
          steps: ['(\\sqrt[3]{8})^2', '2^2 = 4'],
          result: '4'
        },
        exam_trap: 'Uwaga na ujemne podstawy!',
        diagram: {
          type: 'cartesian',
          points: [{ x: 1, y: 2, label: 'A' }]
        }
      };

      const restoredSession = {
        sessionId: 'sess_bento_restore_test',
        lessonId: '1.1',
        lessonTitle: 'Lekcja 1.1: Potęgi i pierwiastki',
        tasks: mockTasks,
        taskQueue: mockTasks,
        currentQueueIndex: 0,
        currentStep: 0, // theory mode
        theorySubStep: 0,
        theoryPill: genuineTheoryPill,
        originTab: 'nauka',
        selectedOption: null,
        openAnswerText: '',
        activeSeconds: 15,
        sessionMistakesCount: 0,
        correctAnswersCount: 0,
        isRestoredSession: true
      };

      render(
        <SessionRunner
          sessionData={restoredSession as any}
          userState={{ coins: 100, hearts: 5, xp: 50, streakDays: 3, isPro: false } as any}
          onCompleteSession={vi.fn()}
          onCancelSession={vi.fn()}
        />
      );

      // Verify that genuine theory content is rendered
      expect(screen.getByText(/Potęgi o wykładniku wymiernym to uogólnienie/)).toBeDefined();

      // Verify that the generic emergency fallback is NOT rendered
      expect(screen.queryByText(/Zapoznaj się z kluczowymi pojęciami, własnościami i wzorami/)).toBeNull();

      // Fast-forward debounce timer (300ms)
      await act(async () => {
        await new Promise(r => setTimeout(r, 350));
      });

      // Verify that auto-saved session preserved the theoryPill and originTab
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.theoryPill).toBeDefined();
      expect(parsed.theoryPill.concept_essence).toBe('Potęgi o wykładniku wymiernym to uogólnienie potęgowania na ułamki.');
      expect(parsed.originTab).toBe('nauka');
    });

    it('asynchronously re-fetches theory pill when session is restored with degraded placeholder text', async () => {
      const genuineDoc = {
        id: '1.1',
        topic_id: 'dzial-1',
        title: 'Lekcja 1.1: Potęgi i pierwiastki',
        theory_pill: {
          concept_essence: 'Potęgi o wykładniku wymiernym to uogólnienie potęgowania na ułamki.',
          matura_context: 'Pewniak CKE w arkuszu',
          core_formulas: [{ name: 'Potęga', formula: 'a^n' }],
          worked_example: { problem: 'Oblicz', steps: ['Krok 1'], result: '4' },
          exam_trap: 'Uwaga na zero!',
          diagram: { type: 'cartesian', points: [] }
        },
        tasks: mockTasks
      };
      const ensureSpy = vi.spyOn(curriculumRepository, 'ensureLessonLoaded').mockResolvedValue(genuineDoc as any);

      // Degraded session with emergency string
      const degradedSession = {
        sessionId: 'sess_degraded_test_99',
        lessonId: '1.1',
        lessonTitle: 'Lekcja 1.1: Potęgi i pierwiastki',
        tasks: mockTasks,
        taskQueue: mockTasks,
        currentQueueIndex: 0,
        currentStep: 0,
        theorySubStep: 0,
        theoryPill: {
          concept_essence: 'Zapoznaj się z kluczowymi pojęciami, własnościami i wzorami dla tej lekcji.'
        },
        originTab: 'learn',
        isRestoredSession: true
      };

      render(
        <SessionRunner
          sessionData={degradedSession as any}
          userState={{ coins: 100, hearts: 5, xp: 50, streakDays: 3, isPro: false } as any}
          onCompleteSession={vi.fn()}
          onCancelSession={vi.fn()}
        />
      );

      // Allow async ensureLessonLoaded to resolve and state to settle
      await act(async () => {
        await new Promise(r => setTimeout(r, 400));
      });

      expect(ensureSpy).toHaveBeenCalled();
      expect(screen.getByText(/Potęgi o wykładniku wymiernym to uogólnienie/)).toBeDefined();

      // Auto-save must be triggered with originTab and recovered non-degraded theoryPill
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.originTab).toBe('learn');
      expect(parsed.theoryPill).toBeDefined();
      expect(parsed.theoryPill.concept_essence).toBe('Potęgi o wykładniku wymiernym to uogólnienie potęgowania na ułamki.');
    });
  });

  describe('Tab & context persistence across refreshes', () => {
    it('restores active tab correctly when App mounts with saved tab in localStorage', async () => {
      // 1. Test 'learn' tab restoration
      localStorage.setItem('jasne_active_tab_v1', 'learn');
      const { unmount } = render(<App />);
      expect(document.getElementById('learn-scroll-content')).not.toBeNull();
      unmount();

      // 2. Test 'arena' tab restoration
      localStorage.setItem('jasne_active_tab_v1', 'arena');
      const { unmount: unmountArena } = render(<App />);
      expect(screen.getAllByText(/Arena/i).length).toBeGreaterThan(0);
      unmountArena();

      // 3. Test 'simulator' tab restoration
      localStorage.setItem('jasne_active_tab_v1', 'simulator');
      const { unmount: unmountSim } = render(<App />);
      expect(screen.getAllByText(/Symulator/i).length).toBeGreaterThan(0);
      unmountSim();

      // 4. Test fallback to 'dashboard' when no saved tab
      localStorage.removeItem('jasne_active_tab_v1');
      const { unmount: unmountDash } = render(<App />);
      expect(screen.getAllByText(/Główny panel|Dashboard/i).length).toBeGreaterThan(0);
      unmountDash();
    });
  });
});

