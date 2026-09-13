import { describe, it, expect, vi } from 'vitest';
import {
  formatRegenTimer,
  getSyncedHearts,
  deductHeart,
  refillHeartsWithCoins,
  canUseAiVision,
  recordAiVisionUse,
  activatePro,
  MAX_HEARTS,
  HEARTS_REFILL_COIN_COST
} from '../heartsManager';
import { UserState } from '../../types';

describe('heartsManager', () => {
  const baseUserState: UserState = {
    uid: 'test-user',
    isPro: false,
    hearts: 5,
    maxHearts: 5,
    lastHeartRegenTimestamp: Date.now(),
    coins: 500,
    xp: 100,
    aiVisionDailyCount: 0,
    lastVisionDate: new Date().toISOString().split('T')[0]
  } as unknown as UserState;

  describe('formatRegenTimer', () => {
    it('formats milliseconds to MM:SS correctly', () => {
      expect(formatRegenTimer(0)).toBe('00:00');
      expect(formatRegenTimer(-1000)).toBe('00:00');
      expect(formatRegenTimer(65000)).toBe('01:05');
      expect(formatRegenTimer(30 * 60 * 1000)).toBe('30:00');
    });
  });

  describe('getSyncedHearts', () => {
    it('returns MAX_HEARTS and infinity symbol for PRO users', () => {
      const proState = { ...baseUserState, isPro: true, hearts: 2 };
      const result = getSyncedHearts(proState);

      expect(result.isPro).toBe(true);
      expect(result.hearts).toBe(MAX_HEARTS);
      expect(result.formattedTime).toBe('∞');
    });

    it('returns Full when user already has maximum hearts', () => {
      const fullState = { ...baseUserState, hearts: 5 };
      const result = getSyncedHearts(fullState);

      expect(result.hearts).toBe(5);
      expect(result.formattedTime).toBe('Pełne');
      expect(result.timeToNextRegenMs).toBe(0);
    });

    it('regenerates hearts over time based on elapsed intervals', () => {
      const startTime = 1700000000000;
      vi.useFakeTimers();
      vi.setSystemTime(startTime);

      const state = {
        ...baseUserState,
        hearts: 1,
        lastHeartRegenTimestamp: startTime
      };

      // Fast forward by 65 minutes (2 hearts regenerated, since 30m each)
      vi.setSystemTime(startTime + 65 * 60 * 1000);

      const result = getSyncedHearts(state);
      expect(result.hearts).toBe(3);
      expect(result.timeToNextRegenMs).toBeGreaterThan(0);

      vi.useRealTimers();
    });
  });

  describe('deductHeart', () => {
    it('does not deduct hearts for PRO users', () => {
      const proState = { ...baseUserState, isPro: true, hearts: 5 };
      const result = deductHeart(proState);

      expect(result.wasDeducted).toBe(false);
      expect(result.updatedState.hearts).toBe(5);
      expect(result.isOutOfHearts).toBe(false);
    });

    it('deducts 1 heart for standard users and tracks regen timestamp', () => {
      const state = { ...baseUserState, hearts: 3 };
      const result = deductHeart(state);

      expect(result.wasDeducted).toBe(true);
      expect(result.updatedState.hearts).toBe(2);
      expect(result.isOutOfHearts).toBe(false);
    });

    it('identifies when hearts drop to 0', () => {
      const state = { ...baseUserState, hearts: 1 };
      const result = deductHeart(state);

      expect(result.wasDeducted).toBe(true);
      expect(result.updatedState.hearts).toBe(0);
      expect(result.isOutOfHearts).toBe(true);
    });
  });

  describe('refillHeartsWithCoins', () => {
    it('successfully refills hearts if user has enough coins', () => {
      const state = { ...baseUserState, hearts: 1, coins: 300 };
      const result = refillHeartsWithCoins(state);

      expect(result.success).toBe(true);
      expect(result.updatedState.hearts).toBe(MAX_HEARTS);
      expect(result.updatedState.coins).toBe(300 - HEARTS_REFILL_COIN_COST);
    });

    it('fails if user does not have enough coins', () => {
      const state = { ...baseUserState, hearts: 1, coins: 50 };
      const result = refillHeartsWithCoins(state);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.updatedState.hearts).toBe(1);
    });
  });

  describe('canUseAiVision and recordAiVisionUse', () => {
    it('allows unlimited scans for PRO users', () => {
      const proState = activatePro({ ...baseUserState, aiVisionDailyCount: 10 });
      expect(canUseAiVision(proState).allowed).toBe(true);
      expect(canUseAiVision(proState).remainingDaily).toBe(Infinity);

      const updated = recordAiVisionUse(proState);
      expect(updated.isPro).toBe(true);
    });

    it('limits standard users to daily scan limit', () => {
      const today = new Date().toISOString().split('T')[0];
      const state = {
        ...baseUserState,
        isPro: false,
        aiVisionDailyCount: 3,
        lastVisionDate: today
      };

      expect(canUseAiVision(state).allowed).toBe(false);
      expect(canUseAiVision(state).remainingDaily).toBe(0);

      const availableState = {
        ...baseUserState,
        isPro: false,
        aiVisionDailyCount: 2,
        lastVisionDate: today
      };
      expect(canUseAiVision(availableState).allowed).toBe(true);
      const afterRecord = recordAiVisionUse(availableState);
      expect(afterRecord.aiVisionDailyCount).toBe(3);
    });
  });
});
