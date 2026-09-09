import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserState } from '../types';
import { buildInitialUserDocument, removeUndefinedFields } from '../schema_firestore';
import { filterActualTaskIds, isActualTaskId } from '../utils';

export interface GuestProgressData {
  completed_lessons: string[];
  completedTasks: string[];
  taskStars: Record<string, number>;
  lessonMistakes: Record<string, number>;
  completedLessons: Record<string, any>;
  xp: number;
  coins: number;
  gems: number;
  streakDays: number;
  streakActiveDates: string[];
  lastStreakDate?: string;
  dailyTaskCounts: Record<string, number>;
  timeSpentTotalSeconds: number;
  weeklyTimeSpentMinutes: number;
  perks?: any;
  hasCompletedOnboarding?: boolean;
  onboardingPreferences?: any;
}

export interface MergedMigrationResult {
  userState: Partial<UserState>;
  completedTasks: string[];
  taskStars: Record<string, number>;
}

export interface MigrationOptions {
  defaultDisplayName?: string;
}

/**
 * Reads any guest progress stored locally in localStorage.
 */
export function getGuestProgress(): GuestProgressData | null {
  try {
    const guestUserStr = localStorage.getItem('matura_quest_guest_user');
    const guestUser = guestUserStr ? JSON.parse(guestUserStr) : null;

    const storedTasksStr = localStorage.getItem('matura_quest_completed_tasks');
    const storedTasks: string[] = storedTasksStr ? JSON.parse(storedTasksStr) : [];

    const storedStarsStr = localStorage.getItem('matura_quest_task_stars');
    const storedStars: Record<string, number> = storedStarsStr ? JSON.parse(storedStarsStr) : {};

    const storedMistakesStr = localStorage.getItem('matura_quest_lesson_mistakes');
    const storedMistakes: Record<string, number> = storedMistakesStr ? JSON.parse(storedMistakesStr) : {};

    // Collect all lesson identifiers
    const lessonsSet = new Set<string>();

    if (guestUser) {
      if (Array.isArray(guestUser.completed_lessons)) {
        guestUser.completed_lessons.forEach((l: string) => l && lessonsSet.add(l));
      }
      if (guestUser.completedLessons && typeof guestUser.completedLessons === 'object' && !Array.isArray(guestUser.completedLessons)) {
        Object.keys(guestUser.completedLessons).forEach((k) => k && lessonsSet.add(k));
      }
      if (Array.isArray(guestUser.progress?.completedLessons)) {
        guestUser.progress.completedLessons.forEach((l: string) => l && lessonsSet.add(l));
      } else if (guestUser.progress?.completedLessons && typeof guestUser.progress.completedLessons === 'object') {
        Object.keys(guestUser.progress.completedLessons).forEach((k) => k && lessonsSet.add(k));
      }
    }

    if (Array.isArray(storedTasks)) {
      storedTasks.forEach((id: string) => {
        if (typeof id === 'string' && id.startsWith('LESSON-')) {
          const lessonKey = id.replace('LESSON-', '');
          if (lessonKey) lessonsSet.add(lessonKey);
        }
      });
    }

    const completed_lessons = Array.from(lessonsSet);
    const xp = Number(guestUser?.xp ?? guestUser?.stats?.xp ?? 0);
    const coins = Number(guestUser?.coins ?? guestUser?.stats?.coins ?? 0);
    const validStoredTasks = Array.isArray(storedTasks)
      ? storedTasks.filter(id => typeof id === 'string' && (id.startsWith('LESSON-') || isActualTaskId(id)))
      : [];

    // Check if there is actual progress
    const hasAnyProgress = 
      completed_lessons.length > 0 || 
      validStoredTasks.length > 0 || 
      xp > 0 || 
      coins > 0;

    if (!hasAnyProgress && !guestUser) {
      return null;
    }

    const combinedTasks = Array.from(new Set([
      ...(Array.isArray(guestUser?.completedTasks) ? guestUser.completedTasks : []),
      ...validStoredTasks
    ])).filter(id => typeof id === 'string' && (id.startsWith('LESSON-') || isActualTaskId(id)));

    return {
      completed_lessons,
      completedTasks: combinedTasks,
      taskStars: { ...(guestUser?.taskStars || {}), ...storedStars },
      lessonMistakes: storedMistakes,
      completedLessons: guestUser?.completedLessons || guestUser?.progress?.completedLessons || {},
      xp,
      coins,
      gems: Number(guestUser?.gems ?? guestUser?.stats?.gems ?? 0),
      streakDays: Number(guestUser?.streakDays ?? guestUser?.streak?.currentDays ?? 0),
      streakActiveDates: Array.isArray(guestUser?.streakActiveDates) 
        ? guestUser.streakActiveDates 
        : (Array.isArray(guestUser?.streak?.streakActiveDates) ? guestUser.streak.streakActiveDates : []),
      lastStreakDate: guestUser?.lastStreakDate || guestUser?.streak?.lastActiveDate,
      dailyTaskCounts: guestUser?.dailyTaskCounts || guestUser?.streak?.activityHistory || {},
      timeSpentTotalSeconds: Number(guestUser?.timeSpentTotalSeconds ?? guestUser?.stats?.timeSpentTotalSeconds ?? 0),
      weeklyTimeSpentMinutes: Number(guestUser?.weeklyTimeSpentMinutes ?? guestUser?.stats?.weeklyTimeSpentMinutes ?? 0),
      perks: guestUser?.perks,
      hasCompletedOnboarding: guestUser?.hasCompletedOnboarding,
      onboardingPreferences: guestUser?.onboardingPreferences
    };
  } catch (err) {
    console.error("Error reading guest progress:", err);
    return null;
  }
}

/**
 * Checks whether the current device has guest progress worth migrating.
 */
export function hasGuestProgress(): boolean {
  const progress = getGuestProgress();
  if (!progress) return false;
  return progress.completed_lessons.length > 0 || 
         progress.completedTasks.length > 0 || 
         progress.xp > 0 || 
         progress.coins > 0;
}

let inFlightMigrationPromise: Promise<MergedMigrationResult | null> | null = null;

/**
 * Migrates local guest progress into the authenticated user's Firestore document.
 * Performs Set union on completed_lessons and adds XP & Coins.
 * Cleans up temporary guest state from localStorage upon completion.
 */
export async function migrateGuestProgressToUser(
  authUser: User,
  options?: MigrationOptions
): Promise<MergedMigrationResult | null> {
  if (!authUser?.uid) return null;

  if (inFlightMigrationPromise) {
    return inFlightMigrationPromise;
  }

  inFlightMigrationPromise = (async () => {
    try {
      const guestProgress = getGuestProgress();
      const hasProgress = guestProgress && (
        guestProgress.completed_lessons.length > 0 ||
        guestProgress.completedTasks.length > 0 ||
        guestProgress.xp > 0 ||
        guestProgress.coins > 0
      );

      const userRef = doc(db, 'users', authUser.uid);
      const snap = await getDoc(userRef);
      const now = Date.now();

      // If document already exists and there is no guest progress, no write is needed
      if (snap.exists() && !hasProgress) {
        return null;
      }

      let mergedXP = 0;
      let mergedCoins = 0;
      let mergedGems = 0;
      let mergedLevel = 1;
      let mergedStreakDays = 0;
      let mergedStreakDates: string[] = [];
      let mergedLastStreakDate: string | undefined = undefined;
      let mergedDailyCounts: Record<string, number> = {};
      let mergedTimeSpentTotalSeconds = 0;
      let mergedWeeklyTimeSpentMinutes = 0;
      let mergedLessons: string[] = [];
      let mergedTasks: string[] = [];
      let mergedStars: Record<string, number> = {};
      let mergedLessonsMap: Record<string, any> = {};
      let mergedPerks: any = {};
      let hasCompletedOnboarding = true;
      let onboardingPreferences: any = null;

      if (snap.exists()) {
        // SCENARIUSZ A: Scalanie z istniejącym kontem w bazie danych
        const dbData = snap.data() || {};
        const dbStats = dbData.stats || {};
        const dbStreak = dbData.streak || {};
        const dbProgress = dbData.progress || {};

        // 1. Unia zaliczonych lekcji (Set union)
        const rawDbLessons = dbData.completed_lessons || dbProgress.completedLessons || [];
        const dbLessonsList: string[] = Array.isArray(rawDbLessons)
          ? rawDbLessons
          : Object.keys(dbData.completedLessons || dbProgress.completedLessons || {});
        mergedLessons = Array.from(new Set([
          ...dbLessonsList,
          ...(guestProgress?.completed_lessons || [])
        ])).filter(Boolean);

        // 2. Unia zadań (Set union)
        const rawDbTasks = dbData.completedTasks || dbProgress.completedTasks || [];
        const dbTasksList: string[] = Array.isArray(rawDbTasks) ? rawDbTasks : [];
        mergedTasks = Array.from(new Set([
          ...dbTasksList,
          ...(guestProgress?.completedTasks || [])
        ])).filter((id: string) => typeof id === 'string' && (id.startsWith('LESSON-') || isActualTaskId(id)));

        // 3. Gwiazdki (Math.max)
        const dbStars: Record<string, number> = dbData.taskStars || dbProgress.taskStars || {};
        mergedStars = { ...dbStars };
        for (const [taskId, stars] of Object.entries(guestProgress?.taskStars || {})) {
          mergedStars[taskId] = Math.max(mergedStars[taskId] || 0, stars);
        }

        // 4. Słownik ukończonych lekcji (Map union)
        const rawDbLessonsMap = (typeof dbData.completedLessons === 'object' && !Array.isArray(dbData.completedLessons))
          ? dbData.completedLessons
          : (typeof dbProgress.completedLessons === 'object' && !Array.isArray(dbProgress.completedLessons) ? dbProgress.completedLessons : {});
        mergedLessonsMap = {
          ...rawDbLessonsMap,
          ...(guestProgress?.completedLessons || {})
        };

        // 5. Dodawanie XP i monet (dbXP + localXP, dbCoins + localCoins)
        const dbXP = Number(dbStats.xp ?? dbData.xp ?? 0);
        mergedXP = dbXP + (guestProgress?.xp || 0);
        mergedLevel = Math.floor(mergedXP / 1000) + 1;

        const dbCoins = Number(dbStats.coins ?? dbData.coins ?? 0);
        mergedCoins = dbCoins + (guestProgress?.coins || 0);

        const dbGems = Number(dbStats.gems ?? dbData.gems ?? 0);
        mergedGems = dbGems + (guestProgress?.gems || 0);

        // 6. Seria i aktywność
        const dbStreakDays = Number(dbStreak.currentDays ?? dbData.streakDays ?? 0);
        mergedStreakDays = Math.max(dbStreakDays, guestProgress?.streakDays || 0);

        const dbStreakDates: string[] = Array.isArray(dbStreak.streakActiveDates)
          ? dbStreak.streakActiveDates
          : (Array.isArray(dbData.streakActiveDates) ? dbData.streakActiveDates : []);
        mergedStreakDates = Array.from(new Set([
          ...dbStreakDates,
          ...(guestProgress?.streakActiveDates || [])
        ]));

        mergedLastStreakDate = guestProgress?.lastStreakDate || dbStreak.lastActiveDate || dbData.lastStreakDate;

        const dbDailyCounts: Record<string, number> = dbStreak.activityHistory || dbData.dailyTaskCounts || {};
        mergedDailyCounts = { ...dbDailyCounts };
        for (const [date, count] of Object.entries(guestProgress?.dailyTaskCounts || {})) {
          mergedDailyCounts[date] = (mergedDailyCounts[date] || 0) + count;
        }

        mergedTimeSpentTotalSeconds = (Number(dbStats.timeSpentTotalSeconds ?? dbData.timeSpentTotalSeconds ?? 0)) + (guestProgress?.timeSpentTotalSeconds || 0);
        mergedWeeklyTimeSpentMinutes = (Number(dbStats.weeklyTimeSpentMinutes ?? dbData.weeklyTimeSpentMinutes ?? 0)) + (guestProgress?.weeklyTimeSpentMinutes || 0);
        mergedPerks = { ...(dbData.perks || {}), ...(guestProgress?.perks || {}) };
        hasCompletedOnboarding = dbData.hasCompletedOnboarding ?? guestProgress?.hasCompletedOnboarding ?? true;
        onboardingPreferences = dbData.onboardingPreferences || guestProgress?.onboardingPreferences || null;

        const mergedPayload = {
          xp: mergedXP,
          coins: mergedCoins,
          gems: mergedGems,
          level: mergedLevel,
          lastActive: now,
          streakDays: mergedStreakDays,
          lastStreakDate: mergedLastStreakDate,
          streakActiveDates: mergedStreakDates,
          dailyTaskCounts: mergedDailyCounts,
          timeSpentTotalSeconds: mergedTimeSpentTotalSeconds,
          weeklyTimeSpentMinutes: mergedWeeklyTimeSpentMinutes,
          completed_lessons: mergedLessons,
          completedLessons: mergedLessonsMap,
          completedTasks: mergedTasks,
          taskStars: mergedStars,
          perks: mergedPerks,
          hasCompletedOnboarding,
          onboardingPreferences,
          stats: {
            ...dbStats,
            xp: mergedXP,
            coins: mergedCoins,
            gems: mergedGems,
            level: mergedLevel,
            totalTasksCompleted: filterActualTaskIds(mergedTasks).length,
            timeSpentTotalSeconds: mergedTimeSpentTotalSeconds,
            weeklyTimeSpentMinutes: mergedWeeklyTimeSpentMinutes
          },
          streak: {
            ...dbStreak,
            currentDays: mergedStreakDays,
            lastActiveDate: mergedLastStreakDate,
            streakActiveDates: mergedStreakDates,
            activityHistory: mergedDailyCounts
          },
          progress: {
            ...dbProgress,
            completedTasks: mergedTasks,
            taskStars: mergedStars,
            completedLessons: mergedLessonsMap
          }
        };

        await setDoc(userRef, removeUndefinedFields(mergedPayload), { merge: true });
      } else {
        // SCENARIUSZ B: Nowe konto (nowy użytkownik z ew. postępami gościa)
        const initialDoc = buildInitialUserDocument({
          ...authUser,
          displayName: options?.defaultDisplayName || authUser.displayName || 'Uczeń'
        });
        mergedXP = (initialDoc.xp || 0) + (guestProgress?.xp || 0);
        mergedCoins = (initialDoc.coins || 150) + (guestProgress?.coins || 0);
        mergedGems = (initialDoc.gems || 0) + (guestProgress?.gems || 0);
        mergedLevel = Math.floor(mergedXP / 1000) + 1;
        mergedLessons = Array.from(new Set(guestProgress?.completed_lessons || []));
        mergedTasks = Array.from(new Set(guestProgress?.completedTasks || []));
        mergedStars = { ...(guestProgress?.taskStars || {}) };
        mergedLessonsMap = { ...(guestProgress?.completedLessons || {}) };
        mergedStreakDays = guestProgress?.streakDays || initialDoc.streakDays || 0;
        mergedStreakDates = guestProgress?.streakActiveDates || initialDoc.streakActiveDates || [];
        mergedLastStreakDate = guestProgress?.lastStreakDate || initialDoc.lastStreakDate;
        mergedDailyCounts = guestProgress?.dailyTaskCounts || initialDoc.dailyTaskCounts || {};
        mergedTimeSpentTotalSeconds = guestProgress?.timeSpentTotalSeconds || 0;
        mergedWeeklyTimeSpentMinutes = guestProgress?.weeklyTimeSpentMinutes || 0;
        mergedPerks = { ...(initialDoc.perks || {}), ...(guestProgress?.perks || {}) };
        hasCompletedOnboarding = guestProgress?.hasCompletedOnboarding ?? true;
        onboardingPreferences = guestProgress?.onboardingPreferences || null;

        const newUserData = {
          ...initialDoc,
          xp: mergedXP,
          coins: mergedCoins,
          gems: mergedGems,
          level: mergedLevel,
          lastActive: now,
          streakDays: mergedStreakDays,
          lastStreakDate: mergedLastStreakDate,
          streakActiveDates: mergedStreakDates,
          dailyTaskCounts: mergedDailyCounts,
          timeSpentTotalSeconds: mergedTimeSpentTotalSeconds,
          weeklyTimeSpentMinutes: mergedWeeklyTimeSpentMinutes,
          completed_lessons: mergedLessons,
          completedLessons: mergedLessonsMap,
          completedTasks: mergedTasks,
          taskStars: mergedStars,
          perks: mergedPerks,
          hasCompletedOnboarding,
          onboardingPreferences,
          stats: {
            ...(initialDoc.stats || {}),
            xp: mergedXP,
            coins: mergedCoins,
            gems: mergedGems,
            level: mergedLevel,
            totalTasksCompleted: filterActualTaskIds(mergedTasks).length,
            timeSpentTotalSeconds: mergedTimeSpentTotalSeconds,
            weeklyTimeSpentMinutes: mergedWeeklyTimeSpentMinutes
          },
          streak: {
            ...(initialDoc.streak || {}),
            currentDays: mergedStreakDays,
            lastActiveDate: mergedLastStreakDate,
            streakActiveDates: mergedStreakDates,
            activityHistory: mergedDailyCounts
          },
          progress: {
            completedTasks: mergedTasks,
            taskStars: mergedStars,
            completedLessons: mergedLessonsMap
          }
        };

        await setDoc(userRef, removeUndefinedFields(newUserData), { merge: true });
      }

      // Aktualizacja subkolekcji users/{userId}/progress/dzial-1 jeśli były zaliczone lekcje/zadania
      if (mergedTasks.length > 0 || mergedLessons.length > 0) {
        try {
          const progressRef = doc(db, 'users', authUser.uid, 'progress', 'dzial-1');
          await setDoc(progressRef, {
            topic_id: 'dzial-1',
            completedLessons: mergedLessonsMap,
            completedTasks: mergedTasks,
            taskStars: mergedStars,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch (err) {
          console.warn("Topic progress subcollection sync deferred:", err);
        }
      }

      // Czyszczenie tymczasowego stanu gościa z localStorage (zapobieganie dublowaniu punktów)
      try {
        localStorage.removeItem('matura_quest_guest_user');
        localStorage.setItem('matura_quest_completed_tasks', JSON.stringify(mergedTasks));
        localStorage.setItem('matura_quest_task_stars', JSON.stringify(mergedStars));
      } catch (e) {
        console.error("Failed to update localStorage after migration:", e);
      }

      return {
        userState: {
          xp: mergedXP,
          coins: mergedCoins,
          gems: mergedGems,
          level: mergedLevel,
          lastActive: now,
          streakDays: mergedStreakDays,
          lastStreakDate: mergedLastStreakDate,
          streakActiveDates: mergedStreakDates,
          dailyTaskCounts: mergedDailyCounts,
          timeSpentTotalSeconds: mergedTimeSpentTotalSeconds,
          weeklyTimeSpentMinutes: mergedWeeklyTimeSpentMinutes,
          completed_lessons: mergedLessons,
          completedLessons: mergedLessonsMap,
          perks: mergedPerks,
          hasCompletedOnboarding,
          onboardingPreferences
        },
        completedTasks: mergedTasks,
        taskStars: mergedStars
      };
    } catch (err) {
      console.error("Error migrating guest progress to Firestore user:", err);
      return null;
    } finally {
      inFlightMigrationPromise = null;
    }
  })();

  return inFlightMigrationPromise;
}
