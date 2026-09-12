import { describe, it, expect } from 'vitest';
import { getAchievementProgress, countTotalClaimable, Achievement, AchievementContext } from '../achievements';

describe('getAchievementProgress', () => {
  const mockAchievement: Achievement = {
    id: 'test_achievement',
    name: 'Test Achievement',
    description: 'A mock achievement for testing',
    category: 'tasks',
    iconName: 'TestIcon',
    accentColor: 'text-test',
    bgGradient: 'bg-test',
    unit: 'tests',
    getValue: (ctx: AchievementContext) => ctx.completedTasksCount,
    tiers: [
      {
        tier: 1,
        tierName: 'Tier 1',
        target: 10,
        rewardCoins: 10,
        rewardTokens: 5,
        rewardXp: 10,
      },
      {
        tier: 2,
        tierName: 'Tier 2',
        target: 50,
        rewardCoins: 50,
        rewardTokens: 25,
        rewardXp: 50,
      },
      {
        tier: 3,
        tierName: 'Tier 3',
        target: 100,
        rewardCoins: 100,
        rewardTokens: 50,
        rewardXp: 100,
      }
    ]
  };

  const baseContext: AchievementContext = {
    completedTasksCount: 0,
    arenaWins: 0,
    arenaRating: 0,
    streakDays: 0,
    maturaAttempts: 0,
    maturaBestScore: 0,
    level: 1,
  };

  it('should return 0 progress for initial state', () => {
    const result = getAchievementProgress(mockAchievement, baseContext);

    expect(result.currentValue).toBe(0);
    expect(result.claimedTier).toBe(0);
    expect(result.progressPercent).toBe(0);
    expect(result.canClaim).toBe(false);
    expect(result.isFullyCompleted).toBe(false);
    expect(result.activeTierIndex).toBe(0);
    expect(result.activeTier?.tier).toBe(1);
  });

  it('should calculate partial progress for the first tier', () => {
    const context = { ...baseContext, completedTasksCount: 5 };
    const result = getAchievementProgress(mockAchievement, context);

    expect(result.currentValue).toBe(5);
    expect(result.progressPercent).toBe(50);
    expect(result.canClaim).toBe(false);
  });

  it('should allow claiming when first tier is met', () => {
    const context = { ...baseContext, completedTasksCount: 10 };
    const result = getAchievementProgress(mockAchievement, context);

    expect(result.currentValue).toBe(10);
    expect(result.progressPercent).toBe(100);
    expect(result.canClaim).toBe(true);
    expect(result.isFullyCompleted).toBe(false);
  });

  it('should calculate progress for second tier after first is claimed', () => {
    const context = { ...baseContext, completedTasksCount: 20 };
    const claimedAchievements = { test_achievement: 1 };

    const result = getAchievementProgress(mockAchievement, context, claimedAchievements);

    expect(result.currentValue).toBe(20);
    expect(result.claimedTier).toBe(1);
    expect(result.activeTier?.tier).toBe(2);
    expect(result.progressPercent).toBe(25);
    expect(result.canClaim).toBe(false);
  });

  it('should cap progress at 100% when active tier target is exceeded but not claimed', () => {
    const context = { ...baseContext, completedTasksCount: 15 };
    const result = getAchievementProgress(mockAchievement, context);

    expect(result.currentValue).toBe(15);
    expect(result.progressPercent).toBe(100);
    expect(result.canClaim).toBe(true);
    expect(result.activeTier?.tier).toBe(1);
  });

  it('should handle fully completed achievement correctly', () => {
    const context = { ...baseContext, completedTasksCount: 150 };
    const claimedAchievements = { test_achievement: 3 };

    const result = getAchievementProgress(mockAchievement, context, claimedAchievements);

    expect(result.currentValue).toBe(150);
    expect(result.claimedTier).toBe(3);
    expect(result.activeTier).toBeNull();
    expect(result.progressPercent).toBe(100);
    expect(result.canClaim).toBe(false);
    expect(result.isFullyCompleted).toBe(true);
    expect(result.activeTierIndex).toBe(2);
  });

  it('should handle missing previous tier target gracefully', () => {
    const malformedAchievement: Achievement = {
      ...mockAchievement,
      tiers: [
        {
          tier: 2,
          tierName: 'Tier 2',
          target: 50,
          rewardCoins: 50,
          rewardTokens: 25,
          rewardXp: 50,
        }
      ]
    };

    const context = { ...baseContext, completedTasksCount: 25 };
    const claimedAchievements = { test_achievement: 1 };

    const result = getAchievementProgress(malformedAchievement, context, claimedAchievements);

    expect(result.currentValue).toBe(25);
    expect(result.activeTier?.tier).toBe(2);
    expect(result.progressPercent).toBe(50);
  });
});

describe('countTotalClaimable', () => {
  const createDefaultContext = (): AchievementContext => ({
    completedTasksCount: 0,
    arenaWins: 0,
    arenaRating: 1000,
    streakDays: 0,
    maturaAttempts: 0,
    maturaBestScore: 0,
    level: 1
  });

  it('returns 0 when no achievements are claimable', () => {
    const context = createDefaultContext();
    expect(countTotalClaimable(context)).toBe(0);
  });

  it('returns 1 when a single achievement is claimable (first_step tier 1)', () => {
    const context = createDefaultContext();
    context.completedTasksCount = 1;
    expect(countTotalClaimable(context)).toBe(1);
  });

  it('returns 2 when multiple achievements are claimable', () => {
    const context = createDefaultContext();
    context.completedTasksCount = 3;
    expect(countTotalClaimable(context)).toBe(2);
  });

  it('does not count already claimed achievements', () => {
    const context = createDefaultContext();
    context.completedTasksCount = 1;
    const claimedAchievements = { first_step: 1 };
    expect(countTotalClaimable(context, claimedAchievements)).toBe(0);
  });

  it('counts achievement again if next tier requirement is met', () => {
    const context = createDefaultContext();
    context.completedTasksCount = 8;
    const claimedAchievements = {
      first_step: 1,
      powers_master: 1,
    };
    expect(countTotalClaimable(context, claimedAchievements)).toBe(2);
  });

  it('returns 0 when achievement is fully claimed even if stats exceed requirement', () => {
    const context = createDefaultContext();
    context.completedTasksCount = 1;
    const claimedAchievements = {
      first_step: 1,
    };
    expect(countTotalClaimable(context, claimedAchievements)).toBe(0);
  });
});
