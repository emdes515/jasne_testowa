/**
 * Cloud Firestore Schema Definition & Flat-Bundle Architecture
 * 
 * Cost-Optimized Schema:
 * 1. Collection 'topics' (Działy):
 *    Document: topics/{topic_id} (e.g. dzial-1)
 *    Contents: Topic metadata (title, description, icon) + array lessons_metadata (only lesson IDs, titles, required points).
 *    Cost: 1 single document read to render the entire topic map!
 * 
 * 2. Subcollection 'lessons' (Lekcje wewnątrz Działu):
 *    Document: topics/{topic_id}/lessons/{lesson_id} (e.g. lesson-1-1)
 *    Contents: theory_pill object + full tasks array.
 *    Cost: 1 single document read for theory + all practice tasks!
 * 
 * 3. Collection 'users' (Progres Gracza):
 *    Document: users/{user_id} -> Basic profile, level, coins (e.g. 150), stats.
 *    Subcollection: users/{user_id}/progress/{topic_id} -> Completed lessons, errors, stars, unlocked elements.
 */

import { LessonTheoryPill, UserPerks, UserAiUsageSummary } from './types';
import { filterActualTaskIds } from './utils';
export interface SubjectTopicMetadata {
  id: string; // e.g. "dzial-1"
  numericId: number; // 1
  title: string;
  name: string;
  short_title: string;
  icon: string;
  color: string;
  lessons_count: number;
  tasks_count: number;
}

export interface SubjectDocument {
  id: string; // e.g. "matematyka-podstawowa"
  key: string; // e.g. "math"
  name: string; // e.g. "Matematyka Podstawowa"
  short_name: string; // e.g. "Matematyka"
  level: string; // e.g. "Nowa Formuła 2023 (Poziom Podstawowy)"
  icon: string; // e.g. "Calculator"
  color: string; // e.g. "#FFB800"
  topics_count: number;
  lessons_count: number;
  tasks_count: number;
  topics_metadata?: SubjectTopicMetadata[];
  /** Filary przedmiotu (język polski: 3 filary). Treść wyłącznie z Firestore. */
  pillars?: Array<{
    id: string;
    name: string;
    short_title?: string;
    description?: string;
    icon?: string;
    color?: string;
    topics_count?: number;
  }>;
  updatedAt?: string;
}

export interface LessonMetadataItem {
  id: string; // e.g. "lesson-1-1"
  title: string; // e.g. "Zbiory liczbowe i osie"
  required_points?: number;
  required_correct_tasks?: number;
  estimated_time_minutes?: number;
  estimated_time_formatted?: string;
  tasks_count?: number;
  order?: number;
}

export interface TopicDocument {
  id: string; // e.g. "dzial-1"
  numericId: number; // 1
  title: string;
  name: string;
  short_title: string;
  description: string;
  icon: string;
  color: string;
  matura_points_range: string;
  importance: string;
  lessons_metadata: LessonMetadataItem[];
  final_test?: any;
  order?: number;
  updatedAt?: string;
}

export interface LessonDocument {
  id: string; // e.g. "lesson-1-1"
  topic_id: string; // e.g. "dzial-1"
  title: string;
  estimated_time_minutes?: number;
  estimated_time_formatted?: string;
  required_correct_tasks?: number;
  theory_pill: LessonTheoryPill;
  tasks: any[];
  formulaSheet?: any;
  formula_sheet?: any;
  updatedAt?: string;
}

export interface UserTopicProgressDocument {
  topic_id: string;
  completedLessons: Record<string, {
    status: 'COMPLETED' | 'IN_PROGRESS';
    accuracy: number;
    xpEarned: number;
    completedAt: string;
    mistakesCount?: number;
  }>;
  completedTasks: string[];
  taskStars: Record<string, number>;
  mistakesCount: number;
  unlockedItems: string[];
  updatedAt: string;
}

export interface SystemMeta {
  curriculumVersion: string;
  systemName?: string;
  updatedAt?: string;
  minAppVersion?: string;
}

export interface UserProfileSection {
  displayName: string;
  email: string;
  avatarUrl?: string;
  createdAt: number;
}

export interface UserStatsSection {
  level: number;
  xp: number;
  coins: number;
  gems: number;
  masteryTokens: number;
  arenaRating: number;
  arenaWins: number;
  totalTasksCompleted: number;
  timeSpentTotalSeconds?: number;
  weeklyTimeSpentMinutes?: number;
}

export interface UserStreakSection {
  currentDays: number;
  lastActiveDate?: string;
  streakActiveDates: string[];
  activityHistory: Record<string, number>;
}

export interface LessonProgressItem {
  status: 'COMPLETED' | 'IN_PROGRESS';
  accuracy: number;
  xpEarned: number;
  completedAt: string;
  mistakesCount?: number;
}

export interface FirestoreUserDocument {
  profile: UserProfileSection;
  stats: UserStatsSection;
  streak: UserStreakSection;

  // Primary fields
  coins: number;
  xp: number;
  gems: number;
  level: number;
  campusRust: number;
  lastActive: number;
  arenaRating: number;
  arenaWins: number;
  masteryTokens: number;
  streakDays: number;
  lastStreakDate?: string;
  streakActiveDates?: string[];
  dailyTaskCounts?: Record<string, number>;
  claimedAchievements?: Record<string, number>;
  perks?: UserPerks;
  timeSpentTotalSeconds?: number;
  weeklyTimeSpentMinutes?: number;
  lastWeekKey?: string;
  maturaAttempts?: number;
  maturaBestScore?: number;
  hasCompletedOnboarding?: boolean;
  onboardingPreferences?: {
    targetExam: 'matura_2025' | 'poprawka' | 'e8';
    targetScore: '30' | '70' | '100';
    dailyMinutes: 5 | 10 | 15;
  };

  // Backwards compatibility convenience
  completedTasks?: string[];
  taskStars?: Record<string, number>;
  completed_lessons?: string[];
  completedLessons?: Record<string, any>;

  // Hearts & PRO Sponsorship fields
  isPro?: boolean;
  hearts?: number;
  maxHearts?: number;
  lastHeartRegenTimestamp?: number;
  aiVisionDailyCount?: number;
  lastVisionDate?: string;

  // AI Token Usage Analytics
  aiUsage?: UserAiUsageSummary;
}

export function getCurrentIsoWeekKey(): string {
  const d = new Date();
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}

export function removeUndefinedFields<T extends Record<string, any>>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => (item && typeof item === 'object' ? removeUndefinedFields(item) : item)) as any;
  }
  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      sanitized[key] = (value !== null && typeof value === 'object' && !(value instanceof Date))
        ? removeUndefinedFields(value)
        : value;
    }
  }
  return sanitized;
}

export function buildInitialUserDocument(authUser?: any): Partial<FirestoreUserDocument> {
  const todayStr = new Date().toISOString().split('T')[0];
  return {
    coins: 150, // Standard starting coins
    xp: 0,
    gems: 0,
    level: 1,
    campusRust: 0,
    lastActive: Date.now(),
    arenaRating: 1000,
    arenaWins: 0,
    masteryTokens: 0,
    streakDays: 0,
    streakActiveDates: [],
    dailyTaskCounts: {},
    claimedAchievements: {},
    isPro: false,
    hearts: 5,
    maxHearts: 5,
    lastHeartRegenTimestamp: Date.now(),
    aiVisionDailyCount: 0,
    perks: {
      xpBoostPercent: 0,
      coinBoostPercent: 0,
      streakFreezes: 1,
      arenaShields: 0,
      arenaTokenBonusPercent: 0,
      temporaryXpBoostCharges: 0
    },
    profile: {
      displayName: authUser?.displayName || 'Uczeń',
      email: authUser?.email || '',
      avatarUrl: authUser?.photoURL || '',
      createdAt: Date.now()
    },
    stats: {
      level: 1,
      xp: 0,
      coins: 150,
      gems: 0,
      masteryTokens: 0,
      arenaRating: 1000,
      arenaWins: 0,
      totalTasksCompleted: 0
    },
    streak: {
      currentDays: 0,
      streakActiveDates: [],
      activityHistory: { [todayStr]: 0 }
    },
    hasCompletedOnboarding: true,
    timeSpentTotalSeconds: 0,
    weeklyTimeSpentMinutes: 0,
    lastWeekKey: getCurrentIsoWeekKey()
  };
}

export function buildFirestoreUserPayload(
  userState: any,
  completedTasks: string[] = [],
  taskStars: Record<string, number> = {},
  completedLessons: Record<string, any> = {},
  authUser?: any
): Partial<FirestoreUserDocument> {
  const todayStr = new Date().toISOString().split('T')[0];
  const dailyCounts = userState.dailyTaskCounts || {};

  const activityHistory: Record<string, number> = {};
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().split('T')[0];
    activityHistory[dStr] = dailyCounts[dStr] || (userState.streakActiveDates?.includes(dStr) ? 1 : 0);
  }

  const profile: UserProfileSection = {
    displayName: authUser?.displayName || userState.profile?.displayName || 'Uczeń',
    email: authUser?.email || userState.profile?.email || '',
    avatarUrl: authUser?.photoURL || userState.profile?.avatarUrl || '',
    createdAt: userState.profile?.createdAt || Date.now()
  };

  const stats: UserStatsSection = {
    level: userState.level || 1,
    xp: userState.xp || 0,
    coins: userState.coins !== undefined ? userState.coins : 150,
    gems: userState.gems || 0,
    masteryTokens: userState.masteryTokens || 0,
    arenaRating: userState.arenaRating || 1000,
    arenaWins: userState.arenaWins || 0,
    totalTasksCompleted: filterActualTaskIds(completedTasks).length,
    timeSpentTotalSeconds: userState.timeSpentTotalSeconds || 0,
    weeklyTimeSpentMinutes: userState.weeklyTimeSpentMinutes || 0
  };

  const streak: UserStreakSection = {
    currentDays: userState.streakDays || 0,
    lastActiveDate: userState.lastStreakDate || undefined,
    streakActiveDates: userState.streakActiveDates || [],
    activityHistory
  };

  const rawPayload = {
    profile,
    stats,
    streak,
    coins: stats.coins,
    xp: stats.xp,
    gems: stats.gems,
    level: stats.level,
    campusRust: userState.campusRust || 0,
    lastActive: Date.now(),
    arenaRating: stats.arenaRating,
    arenaWins: stats.arenaWins,
    masteryTokens: stats.masteryTokens,
    streakDays: streak.currentDays,
    lastStreakDate: userState.lastStreakDate || undefined,
    streakActiveDates: streak.streakActiveDates,
    dailyTaskCounts: dailyCounts,
    claimedAchievements: userState.claimedAchievements || {},
    perks: userState.perks || {
      xpBoostPercent: 0,
      coinBoostPercent: 0,
      streakFreezes: 1,
      arenaShields: 0,
      arenaTokenBonusPercent: 0,
      temporaryXpBoostCharges: 0
    },
    timeSpentTotalSeconds: stats.timeSpentTotalSeconds,
    weeklyTimeSpentMinutes: stats.weeklyTimeSpentMinutes,
    lastWeekKey: userState.lastWeekKey || getCurrentIsoWeekKey(),
    maturaAttempts: userState.maturaAttempts || 0,
    maturaBestScore: userState.maturaBestScore || 0,
    hasCompletedOnboarding: userState.hasCompletedOnboarding ?? true,
    onboardingPreferences: userState.onboardingPreferences || null,
    isPro: Boolean(userState.isPro),
    hearts: typeof userState.hearts === 'number' ? userState.hearts : 5,
    maxHearts: userState.maxHearts || 5,
    lastHeartRegenTimestamp: userState.lastHeartRegenTimestamp || Date.now(),
    aiVisionDailyCount: userState.aiVisionDailyCount || 0,
    lastVisionDate: userState.lastVisionDate || undefined,
    completedTasks,
    taskStars,
    completed_lessons: Array.from(new Set([
      ...(userState.completed_lessons || []),
      ...Object.keys(completedLessons || {})
    ])),
    completedLessons: completedLessons || {},
    aiUsage: userState.aiUsage || undefined
  };

  return removeUndefinedFields(rawPayload);
}
