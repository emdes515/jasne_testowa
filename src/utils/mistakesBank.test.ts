import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getMistakesBank,
  saveMistakesBank,
  addMistakeToBank,
  removeMistakeFromBank,
  clearMistakesBank
} from './mistakesBank';

describe('mistakesBank', () => {
  const STORAGE_KEY = 'matura_mistakes_bank';

  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      clear: vi.fn(() => {
        store = {};
      })
    };
  })();

  // Mock CustomEvent
  class CustomEventMock {
    type: string;
    detail: any;
    constructor(event: string, params?: { detail: any }) {
      this.type = event;
      this.detail = params?.detail;
    }
  }

  beforeEach(() => {
    // Setup window environment for testing
    vi.stubGlobal('localStorage', localStorageMock);
    vi.stubGlobal('window', {
      dispatchEvent: vi.fn()
    });
    vi.stubGlobal('CustomEvent', CustomEventMock);
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('getMistakesBank', () => {
    it('should return empty array if no data in localStorage', () => {
      expect(getMistakesBank()).toEqual([]);
      expect(localStorage.getItem).toHaveBeenCalledWith(STORAGE_KEY);
    });

    it('should return parsed array if valid data exists', () => {
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(['task1', 'task2']));
      expect(getMistakesBank()).toEqual(['task1', 'task2']);
    });

    it('should return empty array if stored data is invalid JSON', () => {
      localStorageMock.setItem(STORAGE_KEY, 'invalid-json');
      // Supress console.error for this test as we expect it
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(getMistakesBank()).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should return empty array if stored data is not an array', () => {
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify({ not: 'an array' }));
      expect(getMistakesBank()).toEqual([]);
    });

    it('should return empty array if window is undefined', () => {
      vi.unstubAllGlobals(); // removes window
      vi.stubGlobal('window', undefined);
      expect(getMistakesBank()).toEqual([]);
    });
  });

  describe('saveMistakesBank', () => {
    it('should save to localStorage and dispatch event', () => {
      const bank = ['task1'];
      saveMistakesBank(bank);

      expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(bank));
      expect(window.dispatchEvent).toHaveBeenCalled();
    });

    it('should do nothing if window is undefined', () => {
      vi.unstubAllGlobals();
      vi.stubGlobal('window', undefined);

      saveMistakesBank(['task1']);
      // We can't check localStorage because it might fail if we try to access it
      // But we can verify it doesn't throw
    });
  });

  describe('addMistakeToBank', () => {
    it('should add task if not already in bank', () => {
      addMistakeToBank('task1');
      expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(['task1']));
    });

    it('should not add task if already in bank', () => {
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(['task1']));
      vi.clearAllMocks();

      addMistakeToBank('task1');
      // It will call getItem inside getMistakesBank, but shouldn't call setItem
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should do nothing if taskId is falsy', () => {
      addMistakeToBank('');
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('removeMistakeFromBank', () => {
    it('should remove task if it exists in bank', () => {
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(['task1', 'task2']));
      vi.clearAllMocks();

      removeMistakeFromBank('task1');
      expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(['task2']));
    });

    it('should do nothing if task does not exist in bank', () => {
      localStorageMock.setItem(STORAGE_KEY, JSON.stringify(['task1']));
      vi.clearAllMocks();

      removeMistakeFromBank('task2');
      // Shouldn't call setItem since it wasn't modified
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should do nothing if taskId is falsy', () => {
      removeMistakeFromBank('');
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('clearMistakesBank', () => {
    it('should save empty array', () => {
      clearMistakesBank();
      expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([]));
    });
  });
});
