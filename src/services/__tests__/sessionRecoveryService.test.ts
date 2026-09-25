// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  saveSessionState,
  saveSessionStateSync,
  restoreSessionState,
  clearSessionState,
  saveCanvasDrawing,
  restoreCanvasDrawing,
  generateSessionId,
  SESSION_STORAGE_KEY,
  SESSION_EXPIRATION_MS,
  SavedSessionState,
  __resetDatabaseConnectionForTests
} from '../sessionRecoveryService';

describe('sessionRecoveryService', () => {
  beforeEach(async () => {
    delete (window as any).indexedDB;
    localStorage.clear();
    __resetDatabaseConnectionForTests();
    vi.restoreAllMocks();
  });

  afterEach(async () => {
    await clearSessionState();
    delete (window as any).indexedDB;
    localStorage.clear();
    __resetDatabaseConnectionForTests();
  });

  const mockTasks = [
    { id: 'task-1-1', type: 'SINGLE_CHOICE', question: 'Oblicz 2+2', points: 1 },
    { id: 'task-1-2', type: 'OPEN_PROOF', question: 'Wykaż, że...', points: 2 }
  ];

  const sampleState: SavedSessionState = {
    sessionId: 'sess_1_1_test_123',
    lessonId: '1.1',
    lessonTitle: 'Lekcja 1.1: Potęgi i pierwiastki',
    tasks: mockTasks,
    currentQueueIndex: 1,
    currentStep: 1,
    theorySubStep: 2,
    selectedOption: 'B',
    openAnswerText: 'Krok 1: $x^2 - 4 = 0$',
    activeSeconds: 145,
    sessionMistakesCount: 1,
    correctAnswersCount: 1,
    timestamp: Date.now(),
    required_correct_tasks: 4,
    correctlySolvedTaskIds: ['task-1-1']
  };

  it('1. correctly saves and restores session state with preserved types and values', async () => {
    await saveSessionState(sampleState);

    const storedRaw = localStorage.getItem(SESSION_STORAGE_KEY);
    expect(storedRaw).toBeTruthy();

    const restored = await restoreSessionState();
    expect(restored).not.toBeNull();
    expect(restored?.sessionId).toBe(sampleState.sessionId);
    expect(restored?.lessonId).toBe(sampleState.lessonId);
    expect(restored?.lessonTitle).toBe(sampleState.lessonTitle);
    expect(restored?.tasks).toHaveLength(2);
    expect(restored?.tasks[0].id).toBe('task-1-1');
    expect(restored?.currentQueueIndex).toBe(1);
    expect(restored?.currentStep).toBe(1);
    expect(restored?.theorySubStep).toBe(2);
    expect(restored?.selectedOption).toBe('B');
    expect(restored?.openAnswerText).toBe('Krok 1: $x^2 - 4 = 0$');
    expect(restored?.activeSeconds).toBe(145);
    expect(restored?.sessionMistakesCount).toBe(1);
    expect(restored?.correctAnswersCount).toBe(1);
    expect(restored?.required_correct_tasks).toBe(4);
    expect(restored?.correctlySolvedTaskIds).toEqual(['task-1-1']);
    expect(restored?.isRestoredSession).toBe(true);
  });

  it('synchronously saves session state via saveSessionStateSync (beforeunload/visibilitychange)', async () => {
    saveSessionStateSync(sampleState);

    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed.sessionId).toBe(sampleState.sessionId);
    expect(parsed.activeSeconds).toBe(145);
  });

  it('2. saves and restores large canvas DataURL drawing via IndexedDB or fallback engine', async () => {
    // Generate a ~150KB mock Base64 DataURL (representing a complex student math scratchpad)
    const largeDrawingPayload = 'data:image/png;base64,' + 'A'.repeat(150000);

    const sessionId = 'sess_scratchpad_test';
    const taskId = 'task-open-proof-99';

    await saveCanvasDrawing(sessionId, taskId, largeDrawingPayload);
    const restoredDrawing = await restoreCanvasDrawing(sessionId, taskId);

    expect(restoredDrawing).toBe(largeDrawingPayload);
    expect(restoredDrawing?.length).toBeGreaterThan(150000);

    // Verify non-existent task returns null
    const nonExistent = await restoreCanvasDrawing(sessionId, 'non-existent-task');
    expect(nonExistent).toBeNull();
  });

  it('automatically pre-loads canvas drawing into restored state if current task matches', async () => {
    const drawingDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    await saveCanvasDrawing(sampleState.sessionId, 'task-1-2', drawingDataUrl);
    await saveSessionState(sampleState);

    const restored = await restoreSessionState();
    expect(restored).not.toBeNull();
    expect(restored?.openCanvasDataUrl).toBe(drawingDataUrl);
  });

  it('3. rejects expired sessions (> 24 hours) and cleans up storage', async () => {
    const expiredTimestamp = Date.now() - (SESSION_EXPIRATION_MS + 60 * 1000); // 24h + 1 minute ago
    const expiredState: SavedSessionState = {
      ...sampleState,
      timestamp: expiredTimestamp
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(expiredState));

    const restored = await restoreSessionState();
    expect(restored).toBeNull();

    // Verify localStorage item was purged
    expect(localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
  });

  it('preserves valid sessions within 24 hours boundary', async () => {
    const recentTimestamp = Date.now() - (SESSION_EXPIRATION_MS - 5 * 60 * 1000); // 23 hours 55 min ago
    const validRecentState: SavedSessionState = {
      ...sampleState,
      timestamp: recentTimestamp
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(validRecentState));

    const restored = await restoreSessionState();
    expect(restored).not.toBeNull();
    expect(restored?.sessionId).toBe(sampleState.sessionId);
  });

  it('4. completely wipes session state and scratchpads when clearSessionState is invoked', async () => {
    await saveSessionState(sampleState);
    await saveCanvasDrawing(sampleState.sessionId, 'task-1-1', 'data:image/png;base64,sample1');
    await saveCanvasDrawing(sampleState.sessionId, 'task-1-2', 'data:image/png;base64,sample2');

    expect(localStorage.getItem(SESSION_STORAGE_KEY)).toBeTruthy();
    expect(await restoreCanvasDrawing(sampleState.sessionId, 'task-1-1')).toBeTruthy();

    await clearSessionState(sampleState.sessionId);

    expect(localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
    expect(await restoreCanvasDrawing(sampleState.sessionId, 'task-1-1')).toBeNull();
    expect(await restoreCanvasDrawing(sampleState.sessionId, 'task-1-2')).toBeNull();

    const restored = await restoreSessionState();
    expect(restored).toBeNull();
  });

  it('5. generates unique, collision-resistant session IDs with lesson context', () => {
    const id1 = generateSessionId('1.1');
    const id2 = generateSessionId('1.1');
    const id3 = generateSessionId('pol-3-2');

    expect(id1).toMatch(/^sess_1_1_\d+_[a-z0-9]+$/);
    expect(id3).toMatch(/^sess_pol_3_2_\d+_[a-z0-9]+$/);
    expect(id1).not.toBe(id2);
  });

  it('handles corrupted localStorage payload gracefully without throwing', async () => {
    localStorage.setItem(SESSION_STORAGE_KEY, '{ broken json - invalid formatting');
    const restored = await restoreSessionState();
    expect(restored).toBeNull();
  });

  it('operates safely when IndexedDB is mocked or triggers an error', async () => {
    // Test with mock IndexedDB implementation
    const mockStore: Record<string, any> = {};
    const mockDb = {
      objectStoreNames: { contains: vi.fn().mockReturnValue(true) },
      transaction: vi.fn().mockReturnValue({
        objectStore: vi.fn().mockReturnValue({
          put: vi.fn().mockImplementation((val, key) => {
            mockStore[key] = val;
            const req = { onsuccess: null as any, onerror: null as any };
            setTimeout(() => req.onsuccess?.(), 0);
            return req;
          }),
          get: vi.fn().mockImplementation((key) => {
            const req = { result: mockStore[key] || null, onsuccess: null as any, onerror: null as any };
            setTimeout(() => req.onsuccess?.(), 0);
            return req;
          }),
          clear: vi.fn().mockImplementation(() => {
            Object.keys(mockStore).forEach(k => delete mockStore[k]);
            const req = { onsuccess: null as any, onerror: null as any };
            setTimeout(() => req.onsuccess?.(), 0);
            return req;
          }),
          openCursor: vi.fn().mockImplementation(() => {
            const keys = Object.keys(mockStore);
            let idx = 0;
            const req = {
              result: null as any,
              onsuccess: null as any,
              onerror: null as any
            };
            const advance = () => {
              if (idx < keys.length) {
                const k = keys[idx++];
                req.result = {
                  key: k,
                  value: mockStore[k],
                  delete: () => { delete mockStore[k]; },
                  continue: () => { setTimeout(advance, 0); }
                };
              } else {
                req.result = null;
              }
              req.onsuccess?.({ target: req });
            };
            setTimeout(advance, 0);
            return req;
          })
        })
      }),
      close: vi.fn()
    };

    const mockIdbFactory = {
      open: vi.fn().mockImplementation(() => {
        const req = {
          result: mockDb,
          onsuccess: null as any,
          onerror: null as any,
          onupgradeneeded: null as any
        };
        setTimeout(() => req.onsuccess?.(), 0);
        return req;
      })
    };

    (window as any).indexedDB = mockIdbFactory;
    __resetDatabaseConnectionForTests();

    const sessionId = 'mock_idb_session';
    const taskId = 'task_draw_1';
    const drawing = 'data:image/png;base64,mocked_idb_canvas_data';

    await saveCanvasDrawing(sessionId, taskId, drawing);
    const retrieved = await restoreCanvasDrawing(sessionId, taskId);
    expect(retrieved).toBe(drawing);
    expect(mockStore[`${sessionId}_${taskId}`]).toBe(drawing);

    await clearSessionState();
    const retrievedAfterClear = await restoreCanvasDrawing(sessionId, taskId);
    expect(retrievedAfterClear).toBeNull();
  });

  it('6. validates correct parameter mapping and hydration ready for SessionRunner', async () => {
    const fullState: SavedSessionState = {
      sessionId: 'sess_hydration_test_42',
      lessonId: '3.3',
      lessonTitle: 'Lekcja 3.3: Nierówności kwadratowe',
      tasks: [
        { id: 'task-3-3-1', type: 'SINGLE_CHOICE', question: 'Rozwiąż $x^2 - 4 > 0$' },
        { id: 'task-3-3-2', type: 'OPEN_PROOF', question: 'Wykaż nierówność' },
        { id: 'task-3-3-3', type: 'NUMERIC_INPUT', question: 'Podaj pierwiastek' }
      ],
      currentQueueIndex: 2,
      currentStep: 1,
      theorySubStep: 3,
      selectedOption: null,
      openAnswerText: 'Wartość wynosi 7',
      numericInput: '7',
      tfSelections: { 'stmt-1': 'P', 'stmt-2': 'F' },
      twoPart1: 'A',
      twoPart2: '1',
      activeSeconds: 420,
      sessionMistakesCount: 2,
      correctAnswersCount: 2,
      timestamp: Date.now(),
      required_correct_tasks: 3,
      correctlySolvedTaskIds: ['task-3-3-1', 'task-3-3-2']
    };

    const drawing = 'data:image/png;base64,drawing_for_task_3';
    await saveCanvasDrawing(fullState.sessionId, 'task-3-3-3', drawing);
    await saveSessionState(fullState);

    const restored = await restoreSessionState();
    expect(restored).not.toBeNull();
    // Simulate what App.tsx passes to SessionRunner sessionData
    const sessionRunnerInput = {
      ...restored,
      isSession: true,
      lessonTasks: restored?.tasks
    };

    expect(sessionRunnerInput.sessionId).toBe('sess_hydration_test_42');
    expect(sessionRunnerInput.lessonId).toBe('3.3');
    expect(sessionRunnerInput.currentQueueIndex).toBe(2);
    expect(sessionRunnerInput.currentStep).toBe(1);
    expect(sessionRunnerInput.theorySubStep).toBe(3);
    expect(sessionRunnerInput.openAnswerText).toBe('Wartość wynosi 7');
    expect(sessionRunnerInput.numericInput).toBe('7');
    expect(sessionRunnerInput.tfSelections).toEqual({ 'stmt-1': 'P', 'stmt-2': 'F' });
    expect(sessionRunnerInput.twoPart1).toBe('A');
    expect(sessionRunnerInput.twoPart2).toBe('1');
    expect(sessionRunnerInput.activeSeconds).toBe(420);
    expect(sessionRunnerInput.sessionMistakesCount).toBe(2);
    expect(sessionRunnerInput.correctAnswersCount).toBe(2);
    expect(sessionRunnerInput.openCanvasDataUrl).toBe(drawing);
    expect(sessionRunnerInput.isRestoredSession).toBe(true);
  });

  it('7. safely handles empty, missing or null edge cases in canvas drawing API', async () => {
    // Calling with empty or missing IDs should resolve safely without throwing
    await expect(saveCanvasDrawing('', '', 'data:...')).resolves.not.toThrow();
    await expect(saveCanvasDrawing('sess', '', 'data:...')).resolves.not.toThrow();
    await expect(saveCanvasDrawing('', 'task', 'data:...')).resolves.not.toThrow();

    const emptyResult = await restoreCanvasDrawing('', '');
    expect(emptyResult).toBeNull();
    const missingTaskResult = await restoreCanvasDrawing('sess', '');
    expect(missingTaskResult).toBeNull();
  });

  it('8. strips heavy openCanvasDataUrl from localStorage to prevent QuotaExceededError and saves to IndexedDB', async () => {
    const hugeDrawing = 'data:image/png;base64,' + 'Z'.repeat(80000);
    const stateWithDrawing: SavedSessionState = {
      ...sampleState,
      openCanvasDataUrl: hugeDrawing
    };

    await saveSessionState(stateWithDrawing);

    // Verify localStorage does NOT contain the heavy canvas Base64
    const rawLocal = localStorage.getItem(SESSION_STORAGE_KEY);
    expect(rawLocal).toBeTruthy();
    expect(rawLocal).not.toContain(hugeDrawing);
    const parsedLocal = JSON.parse(rawLocal!);
    expect(parsedLocal.openCanvasDataUrl).toBeUndefined();

    // Verify IndexedDB DOES contain the heavy drawing
    const currentTaskId = sampleState.tasks[sampleState.currentQueueIndex].id;
    const restoredDrawing = await restoreCanvasDrawing(sampleState.sessionId, currentTaskId);
    expect(restoredDrawing).toBe(hugeDrawing);
  });

  it('9. clearSessionState with sessionId only clears matching session from localStorage', async () => {
    await saveSessionState(sampleState);

    // Call clearSessionState with a DIFFERENT session ID
    await clearSessionState('sess_different_session_999');

    // Sample session in localStorage must remain untouched
    const rawLocal = localStorage.getItem(SESSION_STORAGE_KEY);
    expect(rawLocal).toBeTruthy();
    expect(JSON.parse(rawLocal!).sessionId).toBe(sampleState.sessionId);

    // Calling clearSessionState with the MATCHING session ID removes it
    await clearSessionState(sampleState.sessionId);
    expect(localStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
  });

  it('10. clearSessionState cleans memory fallback even when IndexedDB succeeds', async () => {
    const sessionId = 'sess_mem_clean_test';
    const taskId = 'task_1';
    const drawing = 'data:image/png;base64,mem_clean';

    await saveCanvasDrawing(sessionId, taskId, drawing);
    expect(await restoreCanvasDrawing(sessionId, taskId)).toBe(drawing);

    await clearSessionState(sessionId);
    expect(await restoreCanvasDrawing(sessionId, taskId)).toBeNull();
  });

  it('11. preserves full theoryPill with formulas, examples, traps and vector diagram losslessly across save and restore', async () => {
    const stateWithTheoryPill: SavedSessionState = {
      ...sampleState,
      currentStep: 0,
      theorySubStep: 1,
      originTab: 'learn',
      theoryPill: {
        concept_essence: 'Potęgi o wykładniku wymiernym to uogólnienie potęgowania.',
        matura_context: 'Pewniak maturalny CKE za 1 pkt.',
        core_formulas: [
          { name: 'Definicja', formula: 'a^{\\frac{m}{n}} = \\sqrt[n]{a^m}', description: 'Zamiana potęgi na pierwiastek' }
        ],
        worked_example: {
          problem: 'Oblicz wartość wyrażenia $8^{\\frac{2}{3}}$',
          steps: [
            'Zastosuj wzór: $8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2$',
            'Pierwiastek sześcienny z 8 to 2: $2^2 = 4$'
          ],
          result: '4'
        },
        exam_trap: 'Pamiętaj o założeniu $a > 0$ dla potęg o wykładniku wymiernym!',
        diagram: {
          type: 'cartesian',
          points: [{ x: 1, y: 2, label: 'P(1,2)' }],
          segments: [{ x1: 0, y1: 0, x2: 1, y2: 2, color: '#FFB800' }]
        }
      }
    };

    await saveSessionState(stateWithTheoryPill);

    const restored = await restoreSessionState();
    expect(restored).not.toBeNull();
    expect(restored?.originTab).toBe('learn');
    expect(restored?.theoryPill).toBeDefined();
    expect(restored?.theoryPill.concept_essence).toBe('Potęgi o wykładniku wymiernym to uogólnienie potęgowania.');
    expect(restored?.theoryPill.matura_context).toBe('Pewniak maturalny CKE za 1 pkt.');
    expect(restored?.theoryPill.core_formulas).toHaveLength(1);
    expect(restored?.theoryPill.core_formulas[0].formula).toBe('a^{\\frac{m}{n}} = \\sqrt[n]{a^m}');
    expect(restored?.theoryPill.worked_example.result).toBe('4');
    expect(restored?.theoryPill.exam_trap).toContain('Pamiętaj o założeniu');
    expect(restored?.theoryPill.diagram).toEqual({
      type: 'cartesian',
      points: [{ x: 1, y: 2, label: 'P(1,2)' }],
      segments: [{ x1: 0, y1: 0, x2: 1, y2: 2, color: '#FFB800' }]
    });
  });

  it('12. preserves originTab in saveSessionStateSync for synchronous beforeunload handling', () => {
    const stateWithOrigin: SavedSessionState = {
      ...sampleState,
      originTab: 'arena'
    };

    saveSessionStateSync(stateWithOrigin);

    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed.originTab).toBe('arena');
  });
});

