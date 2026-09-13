// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  sanitizeModelKey, 
  recordAiTokenUsage, 
  getGuestAiTokens, 
  clearGuestAiTokens 
} from '../aiUsageTracker';

// Mock Firestore
const mocks = vi.hoisted(() => ({
  mockUpdateDoc: vi.fn().mockResolvedValue(undefined),
  mockSetDoc: vi.fn().mockResolvedValue(undefined),
  mockAddDoc: vi.fn().mockResolvedValue({ id: 'mock-event-id' }),
  mockIncrement: vi.fn((n: number) => ({ _increment: n })),
  mockDoc: vi.fn((_db?: any, ...pathSegments: any[]) => ({ path: pathSegments.join('/') })),
  mockCollection: vi.fn((_db?: any, ...pathSegments: any[]) => ({ path: pathSegments.join('/') }))
}));

vi.mock('firebase/firestore', () => ({
  doc: (...args: any[]) => mocks.mockDoc(...args),
  collection: (...args: any[]) => mocks.mockCollection(...args),
  updateDoc: (...args: any[]) => mocks.mockUpdateDoc(...args),
  setDoc: (...args: any[]) => mocks.mockSetDoc(...args),
  addDoc: (...args: any[]) => mocks.mockAddDoc(...args),
  increment: (n: number) => mocks.mockIncrement(n)
}));

// Mock Firebase Auth
vi.mock('../../lib/firebase', () => ({
  db: { _type: 'mockDb' },
  auth: { currentUser: null }
}));

import { auth } from '../../lib/firebase';

describe('aiUsageTracker Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    (auth as any).currentUser = null;
  });

  describe('sanitizeModelKey', () => {
    it('converts special characters to valid Firestore field key identifiers', () => {
      expect(sanitizeModelKey('google/gemma-4-31b-it:free')).toBe('google_gemma_4_31b_it_free');
      expect(sanitizeModelKey('liquid/lfm-2.5-2.6b:free')).toBe('liquid_lfm_2_5_2_6b_free');
      expect(sanitizeModelKey('')).toBe('unknown');
      expect(sanitizeModelKey(undefined)).toBe('unknown');
    });
  });

  describe('Guest AI Token Usage (localStorage)', () => {
    it('accumulates usage into localStorage when user is not authenticated', async () => {
      await recordAiTokenUsage({
        type: 'HINT',
        usage: {
          promptTokens: 100,
          completionTokens: 50,
          totalTokens: 150,
          model: 'google/gemma-4-31b-it',
          estimatedCostUsd: 0.0001
        },
        taskId: 'task-1'
      });

      const guestTokens = getGuestAiTokens();
      expect(guestTokens).not.toBeNull();
      expect(guestTokens?.totalTokens).toBe(150);
      expect(guestTokens?.promptTokens).toBe(100);
      expect(guestTokens?.completionTokens).toBe(50);
      expect(guestTokens?.totalRequests).toBe(1);
      expect(guestTokens?.estimatedCostUsd).toBe(0.0001);
      expect(guestTokens?.modelsUsed?.google_gemma_4_31b_it).toBe(150);

      // Second request accumulates
      await recordAiTokenUsage({
        type: 'EVALUATION',
        usage: {
          promptTokens: 200,
          completionTokens: 100,
          totalTokens: 300,
          model: 'google/gemma-4-31b-it',
          estimatedCostUsd: 0.0002
        },
        taskId: 'task-1'
      });

      const updatedGuestTokens = getGuestAiTokens();
      expect(updatedGuestTokens?.totalTokens).toBe(450);
      expect(updatedGuestTokens?.totalRequests).toBe(2);
      expect(updatedGuestTokens?.estimatedCostUsd).toBe(0.0003);

      clearGuestAiTokens();
      expect(getGuestAiTokens()).toBeNull();
    });
  });

  describe('Authenticated AI Token Usage (Firestore)', () => {
    it('performs atomic increment on users/{userId} and writes event to ai_usage_events with ZERO reads', async () => {
      await recordAiTokenUsage({
        userId: 'user_abc123',
        type: 'EVALUATION',
        usage: {
          promptTokens: 150,
          completionTokens: 80,
          totalTokens: 230,
          model: 'google/gemma-4-31b-it',
          estimatedCostUsd: 0.00015
        },
        taskId: 'task-exam-2024',
        hasImage: true
      });

      // 1. Check atomic updateDoc was invoked
      expect(mocks.mockDoc).toHaveBeenCalledWith(expect.anything(), 'users', 'user_abc123');
      expect(mocks.mockUpdateDoc).toHaveBeenCalledTimes(1);

      const updatePayload = mocks.mockUpdateDoc.mock.calls[0][1];
      expect(updatePayload['aiUsage.totalTokens']).toEqual({ _increment: 230 });
      expect(updatePayload['aiUsage.promptTokens']).toEqual({ _increment: 150 });
      expect(updatePayload['aiUsage.completionTokens']).toEqual({ _increment: 80 });
      expect(updatePayload['aiUsage.totalRequests']).toEqual({ _increment: 1 });
      expect(updatePayload['aiUsage.estimatedCostUsd']).toEqual({ _increment: 0.00015 });
      expect(updatePayload['aiUsage.modelsUsed.google_gemma_4_31b_it']).toEqual({ _increment: 230 });

      // 2. Check time-series audit log was created in users/user_abc123/ai_usage_events
      expect(mocks.mockCollection).toHaveBeenCalledWith(expect.anything(), 'users', 'user_abc123', 'ai_usage_events');
      expect(mocks.mockAddDoc).toHaveBeenCalledTimes(1);

      const eventPayload = mocks.mockAddDoc.mock.calls[0][1];
      expect(eventPayload.type).toBe('EVALUATION');
      expect(eventPayload.model).toBe('google/gemma-4-31b-it');
      expect(eventPayload.totalTokens).toBe(230);
      expect(eventPayload.promptTokens).toBe(150);
      expect(eventPayload.completionTokens).toBe(80);
      expect(eventPayload.estimatedCostUsd).toBe(0.00015);
      expect(eventPayload.taskId).toBe('task-exam-2024');
      expect(eventPayload.hasImage).toBe(true);
    });

    it('uses auth.currentUser.uid if userId parameter is omitted', async () => {
      (auth as any).currentUser = { uid: 'auth_user_999' };

      await recordAiTokenUsage({
        type: 'HINT',
        usage: {
          promptTokens: 50,
          completionTokens: 25,
          totalTokens: 75,
          model: 'liquid/lfm-2.5-2.6b:free'
        }
      });

      expect(mocks.mockDoc).toHaveBeenCalledWith(expect.anything(), 'users', 'auth_user_999');
      expect(mocks.mockUpdateDoc).toHaveBeenCalledTimes(1);
    });

    it('ignores calls with missing or 0 total tokens gracefully without errors', async () => {
      await recordAiTokenUsage({
        userId: 'user_123',
        type: 'HINT',
        usage: null
      });

      await recordAiTokenUsage({
        userId: 'user_123',
        type: 'HINT',
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
      });

      expect(mocks.mockUpdateDoc).not.toHaveBeenCalled();
      expect(mocks.mockAddDoc).not.toHaveBeenCalled();
    });
  });
});
