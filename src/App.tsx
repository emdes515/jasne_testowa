/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { UserState, TabState, UserPerks } from './types';
import { DashboardView } from './components/DashboardView';
import { LearnView } from './components/LearnView';
import { ArenaView } from './components/ArenaView';
import { MaturaSimulatorView } from './components/MaturaSimulatorView';
import { ProfileView } from './components/ProfileView';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { SessionRunner } from './components/SessionRunner';
import { RewardPopup } from './components/RewardPopup';
import { auth, db, loginWithGoogle } from './lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, LogIn, User } from 'lucide-react';
import { OnboardingOverlay, OnboardingPreferences } from './components/OnboardingOverlay';
import { ProPopup } from './components/ProPopup';
import { ParentSponsorModal } from './components/ParentSponsorModal';
import { activatePro, deductHeart, refillHeartsWithCoins, getSyncedHearts } from './lib/heartsManager';
import { AuthModal } from './components/AuthModal';
import { DiagnosticTestModal } from './components/DiagnosticTestModal';
import { AiTaskGeneratorModal } from './components/AiTaskGeneratorModal';
import { MistakesBankModal } from './components/MistakesBankModal';
import { ACHIEVEMENTS, ShopItem } from './data/achievements';
import { triggerHaptic, calculateStreakOnTaskCompletion, getTodayDateString, filterActualTaskIds, isActualTaskId } from './utils';
import { buildFirestoreUserPayload } from './schema_firestore';
import { checkSystemMetaVersion } from './lib/curriculumSync';
import { handleFirestoreError, OperationType } from './lib/firestoreErrors';
import { migrateGuestProgressToUser, hasGuestProgress } from './lib/guestMigration';
import { normalizeSubjectFirestoreId } from './services/ckeCatalogRepository';

import { LoadingScreen } from './components/Loading';

function getCurrentIsoWeekKey(): string {
  const d = new Date();
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export default function App() {
  const [user, loading] = useAuthState(auth);
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_completed_tasks');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      // Sanityzacja: zachowaj tylko znaczniki LESSON- oraz rzeczywiste zadania (bez gołych '1.1', '1-1')
      return Array.isArray(parsed) 
        ? parsed.filter(id => typeof id === 'string' && (id.startsWith('LESSON-') || isActualTaskId(id))) 
        : [];
    } catch {
      return [];
    }
  });
  const [taskStars, setTaskStars] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_task_stars');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [lessonMistakes, setLessonMistakes] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_lesson_mistakes');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Rule 1: Check system/meta version once upon startup (cached, 0 extra reads if up to date)
  useEffect(() => {
    checkSystemMetaVersion().catch(err => console.info("Curriculum meta check:", err));
  }, []);
  const [currentTab, setCurrentTab] = useState<TabState>('dashboard');

  // Reset scroll position to top when navigating between tabs
  useEffect(() => {
    const mainContainer = document.getElementById('main-scroll-container');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentTab]);
  const [activeTask, setActiveTask] = useState<boolean>(false);
  const [activeTaskData, setActiveTaskData] = useState<any>(null);
  const [reward, setReward] = useState<{ 
    xp: number; 
    coins: number; 
    tokens?: number; 
    levelUp?: number; 
    title?: string; 
    description?: string; 
    bonusNote?: string 
  } | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);
  const [showProPopup, setShowProPopup] = useState(false);
  const [showParentSponsorModal, setShowParentSponsorModal] = useState(false);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [showAiGeneratorModal, setShowAiGeneratorModal] = useState(false);
  const [showMistakesModal, setShowMistakesModal] = useState(false);
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<'math' | 'pol'>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_selected_subject');
      if (stored === 'math' || stored === 'pol') return stored;
    } catch {}
    return 'math';
  });

  const handleSelectSubject = (key: 'math' | 'pol') => {
    setSelectedSubjectKey(key);
    try {
      localStorage.setItem('matura_quest_selected_subject', key);
      window.dispatchEvent(new Event('storage'));
    } catch {}
  };

  const [isSubjectSheetOpen, setIsSubjectSheetOpen] = useState(false);
  const [profileInitialTab, setProfileInitialTab] = useState<'overview' | 'achievements' | 'perks'>('overview');
  
  const [userState, setUserState] = useState<UserState>({
    xp: 0,
    coins: 0,
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
    timeSpentTotalSeconds: 0,
    weeklyTimeSpentMinutes: 0,
    lastWeekKey: getCurrentIsoWeekKey(),
    hearts: 5,
    maxHearts: 5,
    isPro: false,
    lastHeartRegenTimestamp: Date.now(),
    aiVisionDailyCount: 0,
    perks: {
      xpBoostPercent: 0,
      coinBoostPercent: 0,
      streakFreezes: 0,
      arenaShields: 0,
      arenaTokenBonusPercent: 0,
      temporaryXpBoostCharges: 0,
    },
    maturaAttempts: 0
  });

  useEffect(() => {
    let unsubscribe = () => {};
    let isMounted = true;

    if (user) {
      // 1. Sprawdź, czy w stanie lokalnym istnieją jakiekolwiek postępy gościa i wykonaj automatyczną migrację
      if (hasGuestProgress()) {
        migrateGuestProgressToUser(user).then((mergedResult) => {
          if (mergedResult && isMounted) {
            setUserState(prev => ({
              ...prev,
              ...mergedResult.userState
            }));
            setCompletedTasks(mergedResult.completedTasks);
            setTaskStars(mergedResult.taskStars);
          }
        }).catch(err => {
          console.error("Migration error in auth listener:", err);
        });
      }

      const userRef = doc(db, 'users', user.uid);
      unsubscribe = onSnapshot(userRef, async (snap) => {
        if (snap.exists()) {
          const data = snap.data() as any;

          // Rule 2: Single-Document User State (users/{userId})
          const stats = data.stats || {};
          const streak = data.streak || {};
          const progress = data.progress || {};

          // Populate completed tasks and stars from single document (sanitizing legacy IDs)
          const rawLoaded = progress.completedTasks || data.completedTasks || [];
          const loadedCompleted = (Array.isArray(rawLoaded) ? rawLoaded : [])
            .filter((id: any) => typeof id === 'string' && (id.startsWith('LESSON-') || isActualTaskId(id)));
          const loadedStars = progress.taskStars || data.taskStars || {};
          
          setCompletedTasks(loadedCompleted);
          setTaskStars(loadedStars);
          try {
            localStorage.setItem("matura_quest_completed_tasks", JSON.stringify(loadedCompleted));
            localStorage.setItem("matura_quest_task_stars", JSON.stringify(loadedStars));
          } catch {}

          // Populate completed_lessons list
          const rawCompletedLessons = data.completed_lessons || progress.completedLessons || [];
          const loadedCompletedLessons: string[] = Array.isArray(rawCompletedLessons)
            ? rawCompletedLessons
            : Object.keys(data.completedLessons || progress.completedLessons || {});

          setUserState(prev => ({
            ...prev,
            ...data,
            xp: stats.xp ?? data.xp ?? prev.xp,
            coins: stats.coins ?? data.coins ?? prev.coins,
            gems: stats.gems ?? data.gems ?? prev.gems,
            level: stats.level ?? data.level ?? prev.level,
            arenaRating: stats.arenaRating ?? data.arenaRating ?? prev.arenaRating,
            arenaWins: stats.arenaWins ?? data.arenaWins ?? prev.arenaWins,
            masteryTokens: stats.masteryTokens ?? data.masteryTokens ?? prev.masteryTokens,
            streakDays: streak.currentDays ?? data.streakDays ?? prev.streakDays,
            lastStreakDate: streak.lastActiveDate ?? data.lastStreakDate ?? prev.lastStreakDate,
            streakActiveDates: streak.streakActiveDates ?? data.streakActiveDates ?? prev.streakActiveDates,
            dailyTaskCounts: streak.activityHistory ?? data.dailyTaskCounts ?? prev.dailyTaskCounts ?? {},
            timeSpentTotalSeconds: stats.timeSpentTotalSeconds ?? data.timeSpentTotalSeconds ?? prev.timeSpentTotalSeconds ?? 0,
            weeklyTimeSpentMinutes: stats.weeklyTimeSpentMinutes ?? data.weeklyTimeSpentMinutes ?? prev.weeklyTimeSpentMinutes ?? 0,
            lastWeekKey: stats.lastWeekKey ?? data.lastWeekKey ?? prev.lastWeekKey ?? getCurrentIsoWeekKey(),
            hearts: typeof data.hearts === 'number' ? data.hearts : (prev.hearts ?? 5),
            maxHearts: typeof data.maxHearts === 'number' ? data.maxHearts : (prev.maxHearts ?? 5),
            isPro: data.isPro ?? prev.isPro ?? false,
            lastHeartRegenTimestamp: data.lastHeartRegenTimestamp ?? prev.lastHeartRegenTimestamp ?? Date.now(),
            aiVisionDailyCount: data.aiVisionDailyCount ?? prev.aiVisionDailyCount ?? 0,
            lastVisionDate: data.lastVisionDate ?? prev.lastVisionDate,
            completed_lessons: loadedCompletedLessons,
            completedLessons: data.completedLessons || progress.completedLessons || prev.completedLessons || {},
            perks: {
              xpBoostPercent: 0,
              coinBoostPercent: 0,
              streakFreezes: 0,
              arenaShields: 0,
              arenaTokenBonusPercent: 0,
              temporaryXpBoostCharges: 0,
              ...(data.perks || {})
            },
            claimedAchievements: data.claimedAchievements || {}
          }));

          if (!data.hasCompletedOnboarding) {
            setIsNewUser(true);
          }
        } else {
          // New User Setup - initialize and migrate any guest data
          const mergedResult = await migrateGuestProgressToUser(user);
          if (mergedResult && isMounted) {
            setUserState(prev => ({
              ...prev,
              ...mergedResult.userState
            }));
            setCompletedTasks(mergedResult.completedTasks);
            setTaskStars(mergedResult.taskStars);
            setIsNewUser(true);
          }
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
      });
    } else if (!loading) {
      // Guest mode initialization from localStorage
      const savedGuest = localStorage.getItem('matura_quest_guest_user');
      if (savedGuest) {
        try {
          const parsed = JSON.parse(savedGuest);
          setUserState(prev => ({
            ...prev,
            ...parsed,
            streakDays: typeof parsed.streakDays === 'number' ? parsed.streakDays : (prev.streakDays || 0),
            streakActiveDates: Array.isArray(parsed.streakActiveDates) ? parsed.streakActiveDates : (prev.streakActiveDates || []),
            lastStreakDate: parsed.lastStreakDate || prev.lastStreakDate,
            completed_lessons: Array.isArray(parsed.completed_lessons) ? parsed.completed_lessons : (prev.completed_lessons || []),
            completedLessons: parsed.completedLessons || prev.completedLessons || {},
            hearts: typeof parsed.hearts === 'number' ? parsed.hearts : (prev.hearts ?? 5),
            maxHearts: typeof parsed.maxHearts === 'number' ? parsed.maxHearts : (prev.maxHearts ?? 5),
            isPro: parsed.isPro ?? prev.isPro ?? false,
            lastHeartRegenTimestamp: parsed.lastHeartRegenTimestamp ?? prev.lastHeartRegenTimestamp ?? Date.now(),
            aiVisionDailyCount: parsed.aiVisionDailyCount ?? prev.aiVisionDailyCount ?? 0,
            lastVisionDate: parsed.lastVisionDate ?? prev.lastVisionDate,
            perks: {
              xpBoostPercent: 0,
              coinBoostPercent: 0,
              streakFreezes: 0,
              arenaShields: 0,
              arenaTokenBonusPercent: 0,
              temporaryXpBoostCharges: 0,
              ...(parsed.perks || {})
            },
            claimedAchievements: parsed.claimedAchievements || {}
          }));
        } catch (e) {
          console.error("Failed to parse guest state:", e);
        }
      } else {
        setUserState({
          xp: 0,
          coins: 50,
          gems: 5,
          level: 1,
          campusRust: 0,
          lastActive: Date.now(),
          arenaRating: 1000,
          arenaWins: 0,
          masteryTokens: 0,
          streakDays: 0,
          streakActiveDates: [],
          claimedAchievements: {},
          completed_lessons: [],
          completedLessons: {},
          hearts: 5,
          maxHearts: 5,
          isPro: false,
          lastHeartRegenTimestamp: Date.now(),
          aiVisionDailyCount: 0,
          perks: {
            xpBoostPercent: 0,
            coinBoostPercent: 0,
            streakFreezes: 0,
            arenaShields: 0,
            arenaTokenBonusPercent: 0,
            temporaryXpBoostCharges: 0,
          },
          maturaAttempts: 0
        });
        setCompletedTasks([]);
        setTaskStars({});
        setLessonMistakes({});
        try {
          localStorage.removeItem('matura_quest_completed_tasks');
          localStorage.removeItem('matura_quest_task_stars');
          localStorage.removeItem('matura_quest_lesson_mistakes');
        } catch {}
      }

      // Check if user has already completed onboarding
      const guestOnboardingCompleted = localStorage.getItem('matura_quest_onboarding_completed') === 'true';
      if (!guestOnboardingCompleted) {
        setTimeout(() => setShowGuestPrompt(true), 600);
      }
    }
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user, loading]);

  const handleOnboardingComplete = async (prefs: OnboardingPreferences, shouldOpenAuth: boolean = false) => {
    triggerHaptic('success');
    const todayStr = getTodayDateString();

    const currentStreakDates = userState.streakActiveDates || [];
    const updatedStreakDates = currentStreakDates.includes(todayStr)
      ? currentStreakDates
      : [...currentStreakDates, todayStr];

    const currentDailyCounts = userState.dailyTaskCounts || {};
    const updatedDailyCounts = {
      ...currentDailyCounts,
      [todayStr]: (currentDailyCounts[todayStr] || 0) + 1
    };

    const updatedState: UserState = {
      ...userState,
      xp: (userState.xp || 0) + 15,
      coins: (userState.coins || 0) + 20,
      streakDays: Math.max(1, userState.streakDays || 1),
      lastStreakDate: todayStr,
      streakActiveDates: updatedStreakDates,
      dailyTaskCounts: updatedDailyCounts,
      hasCompletedOnboarding: true,
      onboardingPreferences: prefs
    };

    setUserState(updatedState);
    await saveUserData(updatedState);

    try {
      localStorage.setItem('matura_quest_onboarding_completed', 'true');
      localStorage.setItem('matura_quest_onboarding_prefs', JSON.stringify(prefs));
    } catch (e) {}

    setShowGuestPrompt(false);
    setIsNewUser(false);
    setCurrentTab('nauka');

    setReward({
      xp: 15,
      coins: 20,
      title: 'Plan Nauki Uruchomiony!',
      bonusNote: 'Dzień 1 Serii rozpalony! Powodzenia w Dziale 1.'
    });

    if (shouldOpenAuth) {
      setTimeout(() => setShowAuthModal(true), 400);
    }
  };

  const saveUserData = async (newState: UserState) => {
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        const payload = buildFirestoreUserPayload(
          newState,
          completedTasks,
          taskStars,
          (userState as any).completedLessons || {},
          user
        );
        await setDoc(userRef, payload, { merge: true });
      } catch (err) {
        console.error("Failed to save user data to Firestore:", err);
      }
    } else {
      try {
        localStorage.setItem('matura_quest_guest_user', JSON.stringify(newState));
      } catch (e) {
        console.error("Failed to save guest state to localStorage:", e);
      }
    }
  };

  const handleStartTask = (task?: any, lessonTasks?: any[], lessonTitle?: string, nextLesson?: any) => {
    try {
      const stored = localStorage.getItem('matura_quest_last_viewed');
      const parsed = stored ? JSON.parse(stored) : {};
      localStorage.setItem('matura_quest_last_viewed', JSON.stringify({
        ...parsed,
        viewState: 'lessons'
      }));
    } catch {}

    const tasksList = task?.tasks || lessonTasks || task?.lessonTasks || (task ? [task] : []);
    setActiveTaskData({
      ...(task || {}),
      isSession: true,
      tasks: tasksList,
      lessonTasks: tasksList,
      lessonTitle: lessonTitle || task?.lessonTitle || task?.topic || 'Lekcja',
      nextLesson: nextLesson || task?.nextLesson
    });
    setActiveTask(true);
  };

  const handleCancelTask = () => {
    setActiveTask(false);
    setActiveTaskData(null);
  };

  const handleStartRehabSession = (tasks: any[]) => {
    if (!tasks || tasks.length === 0) return;
    const sessionPayload = {
      isSession: true,
      isPolish: selectedSubjectKey === 'pol',
      subjectId: normalizeSubjectFirestoreId(selectedSubjectKey),
      topicId: 'rehab-mistakes',
      lessonId: 'rehab',
      lessonTitle: 'Trening Błędów: Sesja Rehabilitacji',
      tasks,
      firstTask: tasks[0],
      allTasks: tasks,
      allTaskIdsToMarkCompleted: tasks.map((t: any) => t.id),
      required_correct_tasks: tasks.length,
      estimated_time_formatted: `~${tasks.length * 2} min`
    };
    handleStartTask(sessionPayload, tasks, sessionPayload.lessonTitle);
  };

  const handleCompleteDiagnostic = (assessedPercent: number, correctCount: number, _totalCount: number) => {
    setUserState(prev => {
      const next: UserState = {
        ...prev,
        maturaBestScore: Math.max(prev.maturaBestScore || 0, assessedPercent),
        maturaAttempts: Math.max(1, (prev.maturaAttempts || 0) + 1),
        xp: (prev.xp || 0) + correctCount * 25 + 50,
        coins: (prev.coins || 0) + correctCount * 15 + 30,
      };
      saveUserData(next);
      return next;
    });
    setReward({
      xp: correctCount * 25 + 50,
      coins: correctCount * 15 + 30,
      title: 'Diagnoza Poziomu Zakończona!',
      description: `Twój wynik to ${assessedPercent}%. Twój Predyktor Maturalny został zaktualizowany!`
    });
  };

  // Rule 3: Single atomic write per lesson completion (No write-bombing, 0 writes during questions)
  const handleCompleteTask = async (
    taskIds?: string | string[],
    stars: number = 3,
    earnedXp: number = 30,
    earnedCoins: number = 10,
    nextLesson?: any,
    sessionDurationSeconds: number = 0,
    mistakesCount: number = 0
  ) => {
    const rawIdsToAdd = Array.isArray(taskIds) 
      ? taskIds 
      : (taskIds ? [taskIds] : []);

    // Rozdziel rzeczywiste zadania od znaczników lekcji
    const validSolvedTaskIds = filterActualTaskIds(rawIdsToAdd);
    const lessonTagsFromPayload = rawIdsToAdd.filter(id => typeof id === 'string' && id.startsWith('LESSON-'));

    let currentCompleted = [...completedTasks];
    let newTaskStars = { ...taskStars };

    // Dodaj wyłącznie poprawnie rozwiązane zadania
    validSolvedTaskIds.forEach(id => {
      if (!currentCompleted.includes(id)) {
        currentCompleted.push(id);
      }
      newTaskStars[id] = Math.max(newTaskStars[id] || 0, stars);
    });

    // Dodaj znaczniki lekcji (zawsze z prefiksem LESSON-)
    lessonTagsFromPayload.forEach(tag => {
      if (!currentCompleted.includes(tag)) {
        currentCompleted.push(tag);
      }
    });

    const todayStr = getTodayDateString();

    // Determine lesson key (e.g. "1.1") from lessonTitle or lessonId
    const rawLessonId = String(activeTaskData?.lessonId || '');
    const cleanLessonId = rawLessonId.replace(/^(lesson-|pol-lesson-)/, '');
    const dotLessonId = cleanLessonId.replace('-', '.');
    const lessonTitle = activeTaskData?.lessonTitle || '';
    const match = lessonTitle.match(/(?:Lekcja\s+|[\d]+:|^)([\d]+[.-][\d]+)/i) || lessonTitle.match(/([\d]+\.[\d]+)/);
    const lessonKey = match ? match[1].replace('-', '.') : (dotLessonId || '1.1');

    // Rejestruj znaczniki ukończenia lekcji WYŁĄCZNIE z prefiksem LESSON- (żeby nie fałszowały statystyk zadań)
    const extraLessonTags = [
      `LESSON-${rawLessonId}`,
      `LESSON-${cleanLessonId}`,
      `LESSON-${dotLessonId}`,
      `LESSON-${lessonKey}`
    ].filter(Boolean);

    extraLessonTags.forEach(tag => {
      if (!currentCompleted.includes(tag)) {
        currentCompleted.push(tag);
      }
    });

    setCompletedTasks(currentCompleted);
    setTaskStars(newTaskStars);
    try {
      localStorage.setItem("matura_quest_completed_tasks", JSON.stringify(currentCompleted));
      localStorage.setItem("matura_quest_task_stars", JSON.stringify(newTaskStars));
    } catch (e) {
      console.error("Error saving local cache progress:", e);
    }

    // Update lesson mistakes record
    if (rawLessonId || lessonKey) {
      const updatedMistakes = {
        ...lessonMistakes,
        [rawLessonId]: mistakesCount,
        [cleanLessonId]: mistakesCount,
        [dotLessonId]: mistakesCount,
        [lessonKey]: mistakesCount
      };
      setLessonMistakes(updatedMistakes);
      try {
        localStorage.setItem("matura_quest_lesson_mistakes", JSON.stringify(updatedMistakes));
      } catch (e) {}
    }

    setUserState(prev => {
      const isDoubleXp = (prev.perks?.temporaryXpBoostCharges || 0) > 0;
      const xpBoostPct = prev.perks?.xpBoostPercent || 0;
      const baseXp = isDoubleXp ? earnedXp * 2 : earnedXp;
      const xpGained = Math.round(baseXp * (1 + xpBoostPct / 100));

      const coinBoostPct = prev.perks?.coinBoostPercent || 0;
      const coinsGained = Math.round(earnedCoins * (1 + coinBoostPct / 100));

      const newXp = prev.xp + xpGained;
      const newLevel = Math.floor(newXp / 1000) + 1;

      const newCharges = isDoubleXp 
        ? Math.max(0, (prev.perks?.temporaryXpBoostCharges || 1) - 1) 
        : (prev.perks?.temporaryXpBoostCharges || 0);

      const streakCalc = calculateStreakOnTaskCompletion(
        prev.streakDays || 0,
        prev.lastStreakDate,
        prev.streakActiveDates || []
      );

      // Dzienna liczba rozwiązanych zadań zwiększa się WYŁĄCZNIE o faktycznie poprawnie rozwiązane zadania
      const newlySolvedCount = validSolvedTaskIds.length;
      const updatedDailyCounts = {
        ...(prev.dailyTaskCounts || {}),
        [todayStr]: ((prev.dailyTaskCounts || {})[todayStr] || 0) + newlySolvedCount
      };

      const existingCompletedLessons = (prev as any).progress?.completedLessons || (prev as any).completedLessons || {};
      const lessonCompletionRecord = {
        status: 'COMPLETED' as const,
        accuracy: 100,
        xpEarned: xpGained,
        completedAt: new Date().toISOString()
      };
      const updatedCompletedLessons = {
        ...existingCompletedLessons,
        [lessonKey]: lessonCompletionRecord,
        [rawLessonId]: lessonCompletionRecord,
        [cleanLessonId]: lessonCompletionRecord,
        [dotLessonId]: lessonCompletionRecord,
        [`lesson-${cleanLessonId}`]: lessonCompletionRecord
      };

      const updatedCompletedLessonsArray = Array.from(new Set([
        ...(prev.completed_lessons || []),
        lessonKey,
        rawLessonId,
        cleanLessonId,
        dotLessonId,
        `lesson-${cleanLessonId}`,
        `lesson-${dotLessonId.replace('.', '-')}`
      ])).filter(Boolean);

      // Active Time Tracking Engine: total seconds + weekly minutes with Monday 00:00 reset
      const currentWeekKey = getCurrentIsoWeekKey();
      const isNewWeek = prev.lastWeekKey && prev.lastWeekKey !== currentWeekKey;
      const baseWeeklyMinutes = isNewWeek ? 0 : (prev.weeklyTimeSpentMinutes || 0);
      const addedMinutes = sessionDurationSeconds >= 15 
        ? Math.max(1, Math.round(sessionDurationSeconds / 60)) 
        : Math.round(sessionDurationSeconds / 60);
      const updatedWeeklyMinutes = baseWeeklyMinutes + addedMinutes;
      const updatedTotalSeconds = (prev.timeSpentTotalSeconds || 0) + sessionDurationSeconds;

      const newState: UserState = {
        ...prev,
        xp: newXp,
        coins: prev.coins + coinsGained,
        level: newLevel,
        streakDays: streakCalc.newStreakDays,
        lastStreakDate: streakCalc.newLastStreakDate,
        streakActiveDates: streakCalc.newStreakActiveDates,
        dailyTaskCounts: updatedDailyCounts,
        campusRust: Math.max(0, prev.campusRust - 15),
        lastActive: Date.now(),
        timeSpentTotalSeconds: updatedTotalSeconds,
        weeklyTimeSpentMinutes: updatedWeeklyMinutes,
        lastWeekKey: currentWeekKey,
        completed_lessons: updatedCompletedLessonsArray,
        completedLessons: updatedCompletedLessons,
        perks: {
          ...prev.perks!,
          temporaryXpBoostCharges: newCharges
        }
      };

      // Rule 3: EXACTLY ONE atomic write per completed lesson to users/{userId}
      const singleDocPayload = buildFirestoreUserPayload(
        newState,
        currentCompleted,
        newTaskStars,
        updatedCompletedLessons,
        user
      );

      if (user) {
        const userRef = doc(db, 'users', user.uid);
        setDoc(userRef, singleDocPayload, { merge: true }).catch(err => {
          console.warn("Offline or sync deferred to local Firestore cache:", err);
        });

        // KROK 2: Write progress to subcollection users/{userId}/progress/{topicId}
        const topicId = activeTaskData?.topicId || 'dzial-1';
        const progressRef = doc(db, 'users', user.uid, 'progress', topicId);
        setDoc(progressRef, {
          topic_id: topicId,
          completedLessons: updatedCompletedLessons,
          completedTasks: currentCompleted,
          taskStars: newTaskStars,
          mistakesCount: mistakesCount || 0,
          updatedAt: new Date().toISOString()
        }, { merge: true }).catch(err => {
          console.warn("Topic progress subcollection sync deferred:", err);
        });
      } else {
        localStorage.setItem('matura_quest_guest_user', JSON.stringify(singleDocPayload));
      }

      return {
        ...newState,
        ...singleDocPayload
      };
    });

    if (nextLesson) {
      handleStartTask(
        nextLesson, 
        nextLesson.lessonTasks || [nextLesson], 
        nextLesson.lessonTitle || nextLesson.title || 'Kolejna Lekcja', 
        nextLesson.nextLesson
      );
    } else {
      setActiveTask(false);
      setActiveTaskData(null);
      setCurrentTab('nauka');
    }
  };

  const handleMaturaReward = (baseXp: number, baseCoins: number) => {
    setUserState(prev => {
      const xpBoostPct = prev.perks?.xpBoostPercent || 0;
      const xpGained = Math.round(baseXp * (1 + xpBoostPct / 100));

      const coinBoostPct = prev.perks?.coinBoostPercent || 0;
      const coinsGained = Math.round(baseCoins * (1 + coinBoostPct / 100));

      const newXp = prev.xp + xpGained;
      const prevLevel = prev.level;
      const newLevel = Math.floor(newXp / 1000) + 1;
      const isLevelUp = newLevel > prevLevel;

      const bonusLabels: string[] = [];
      if (xpBoostPct > 0) bonusLabels.push(`+${xpBoostPct}% XP z Odznak`);
      if (coinBoostPct > 0) bonusLabels.push(`+${coinBoostPct}% Monet`);

      setReward({
        xp: xpGained,
        coins: coinsGained,
        levelUp: isLevelUp ? newLevel : undefined,
        bonusNote: bonusLabels.length > 0 ? bonusLabels.join(' • ') : undefined
      });

      const newState = {
        ...prev,
        xp: newXp,
        coins: prev.coins + coinsGained,
        level: newLevel,
        maturaAttempts: (prev.maturaAttempts || 0) + 1,
        campusRust: Math.max(0, prev.campusRust - 25),
        lastActive: Date.now()
      };
      saveUserData(newState);
      return newState;
    });
  };

  const handleClaimAchievement = (achievementId: string, tierNumber: number) => {
    const ach = ACHIEVEMENTS.find(a => a.id === achievementId);
    if (!ach) return;
    const tier = ach.tiers.find(t => t.tier === tierNumber);
    if (!tier) return;

    setUserState(prev => {
      const currentClaimed = prev.claimedAchievements?.[achievementId] || 0;
      if (currentClaimed >= tierNumber) return prev;

      const rewardXp = tier.rewardXp || 0;
      const rewardCoins = tier.rewardCoins || 0;
      const rewardTokens = tier.rewardTokens || 0;

      const newXp = prev.xp + rewardXp;
      const newCoins = prev.coins + rewardCoins;
      const newTokens = (prev.masteryTokens || 0) + rewardTokens;

      const prevLevel = prev.level;
      const newLevel = Math.floor(newXp / 1000) + 1;
      const isLevelUp = newLevel > prevLevel;

      const perk = tier.perkEffect;
      const updatedPerks: UserPerks = {
        xpBoostPercent: (prev.perks?.xpBoostPercent || 0) + (perk?.xpBoostPercent || 0),
        coinBoostPercent: (prev.perks?.coinBoostPercent || 0) + (perk?.coinBoostPercent || 0),
        streakFreezes: (prev.perks?.streakFreezes || 0) + (perk?.streakFreezes || 0),
        arenaShields: (prev.perks?.arenaShields || 0) + (perk?.arenaShields || 0),
        arenaTokenBonusPercent: (prev.perks?.arenaTokenBonusPercent || 0) + (perk?.arenaTokenBonusPercent || 0),
        temporaryXpBoostCharges: (prev.perks?.temporaryXpBoostCharges || 0) + (perk?.temporaryXpBoostCharges || 0),
      };

      const updatedClaimed = {
        ...(prev.claimedAchievements || {}),
        [achievementId]: tierNumber
      };

      const newState: UserState = {
        ...prev,
        xp: newXp,
        coins: newCoins,
        masteryTokens: newTokens,
        level: newLevel,
        perks: updatedPerks,
        claimedAchievements: updatedClaimed
      };

      setReward({
        xp: rewardXp,
        coins: rewardCoins,
        tokens: rewardTokens,
        levelUp: isLevelUp ? newLevel : undefined,
        title: `Odznaka: ${ach.name}!`,
        description: `Odebrano nagrody za poziom ${tierNumber} oraz stały bonus do konta!`
      });

      triggerHaptic('success');
      saveUserData(newState);
      return newState;
    });
  };

  const handleBuyShopItem = (item: ShopItem, currency: 'tokens' | 'coins'): boolean => {
    let success = false;
    setUserState(prev => {
      if (currency === 'tokens') {
        if ((prev.masteryTokens || 0) < item.tokenPrice) return prev;
      } else {
        if (prev.coins < item.coinPrice) return prev;
      }

      success = true;
      const newTokens = currency === 'tokens' ? (prev.masteryTokens || 0) - item.tokenPrice : (prev.masteryTokens || 0);
      const newCoins = currency === 'coins' ? prev.coins - item.coinPrice : prev.coins;

      const updatedPerks: UserPerks = {
        xpBoostPercent: prev.perks?.xpBoostPercent || 0,
        coinBoostPercent: prev.perks?.coinBoostPercent || 0,
        streakFreezes: (prev.perks?.streakFreezes || 0) + (item.effectType === 'streakFreeze' ? item.amount : 0),
        arenaShields: (prev.perks?.arenaShields || 0) + (item.effectType === 'arenaShield' ? item.amount : 0),
        arenaTokenBonusPercent: prev.perks?.arenaTokenBonusPercent || 0,
        temporaryXpBoostCharges: (prev.perks?.temporaryXpBoostCharges || 0) + (item.effectType === 'xpDouble' ? item.amount : 0),
      };

      const newState: UserState = {
        ...prev,
        masteryTokens: newTokens,
        coins: newCoins,
        perks: updatedPerks
      };

      triggerHaptic('heavy');
      saveUserData(newState);
      return newState;
    });
    return success;
  };

  const handleUseStreakFreeze = () => {
    setUserState(prev => {
      if ((prev.perks?.streakFreezes || 0) <= 0) return prev;
      const newState: UserState = {
        ...prev,
        campusRust: 0,
        perks: {
          ...prev.perks!,
          streakFreezes: Math.max(0, (prev.perks?.streakFreezes || 1) - 1)
        }
      };
      triggerHaptic('success');
      saveUserData(newState);
      return newState;
    });
  };

  const handleDeductCoins = (amount: number): boolean => {
    if ((userState.coins || 0) < amount) return false;
    const newCoins = Math.max(0, (userState.coins || 0) - amount);
    const updated = {
      ...userState,
      coins: newCoins
    };
    setUserState(updated);
    saveUserData(updated);
    return true;
  };

  const handleActivatePro = () => {
    setUserState(prev => {
      const updated = activatePro(prev);
      saveUserData(updated);
      return updated;
    });
  };

  const handleDeductHeart = (): { wasDeducted: boolean; isOutOfHearts: boolean } => {
    let result = { wasDeducted: false, isOutOfHearts: false };
    setUserState(prev => {
      if (prev.isPro) {
        return prev;
      }
      const res = deductHeart(prev);
      result = {
        wasDeducted: res.wasDeducted,
        isOutOfHearts: res.isOutOfHearts
      };
      if (res.wasDeducted) {
        saveUserData(res.updatedState);
      }
      return res.updatedState;
    });
    return result;
  };

  if (loading) {
    return <LoadingScreen message="Autoryzacja..." />;
  }

  const handleLoginClick = () => {
    triggerHaptic('light');
    setShowAuthModal(true);
  };

  const isGuest = !user;
  const guestHasProgress = isGuest && (
    (userState.xp || 0) > 0 || 
    ((userState.completed_lessons || []).length > 0) || 
    (userState.coins || 0) > 50 || 
    completedTasks.length > 0
  );

  return (
    <div className="h-full h-[100dvh] w-full bg-[#0B0E14] text-slate-100 font-sans flex flex-col md:flex-row overflow-hidden selection:bg-blue-500/30">
      {/* 1. NAWIGACJA (DLA DESKTOPU I TABLETU: LEWY PANEL BOCZNY; DLA MOBILNYCH: DOLNY DOCK) */}
      {!activeTask && (
        <Navigation currentTab={currentTab} setTab={setCurrentTab} />
      )}

      {/* 2. GŁÓWNY OBSZAR APLIKACJI (PRZESTRONNY DLA PC/DESKTOPU) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full min-w-0">
        {!activeTask && (
          <Header 
            state={userState} 
            selectedSubjectKey={selectedSubjectKey}
            onSelectSubject={handleSelectSubject}
            onProfileClick={() => setCurrentTab('profile')} 
            onLogoClick={() => {
              triggerHaptic('medium');
              setCurrentTab('dashboard');
              if (typeof document !== 'undefined') {
                const container = document.getElementById('main-scroll-container');
                if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            currentTab={currentTab} 
            onOpenParentSponsor={() => setShowParentSponsorModal(true)}
            onOpenProPopup={() => setShowProPopup(true)}
            onUpdateUserState={(updater) => {
              setUserState(prev => {
                const next = updater(prev);
                saveUserData(next);
                return next;
              });
            }}
          />
        )}
        
        {isGuest && !activeTask && !showGuestPrompt && (
          <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-blue-900/40 border-b border-blue-500/20 px-4 py-2 flex items-center justify-between text-xs shrink-0">
            <span className="text-slate-300">
              Używasz wersji demonstracyjnej jako Gość. Zaloguj się, aby zapisywać postępy w chmurze!
            </span>
            <button
              onClick={handleLoginClick}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition shrink-0 ml-2"
            >
              Zaloguj się
            </button>
          </div>
        )}
        
        <main 
          id="main-scroll-container"
          tabIndex={-1}
          className={`flex-1 min-h-0 flex flex-col focus:outline-none ${
            activeTask
              ? 'overflow-hidden p-0'
              : 'overflow-y-auto overflow-x-hidden overscroll-y-contain touch-pan-y no-scrollbar pb-32 md:pb-8'
          } relative z-10 w-full`} 
          style={{ 
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {activeTask ? (
            <SessionRunner 
              key={activeTaskData?.lessonId || activeTaskData?.id || 'session-runner'}
              sessionData={activeTaskData?.isSession ? activeTaskData : {
                isSession: true,
                lessonId: activeTaskData?.lessonId || activeTaskData?.id || 'single-task',
                lessonTitle: activeTaskData?.lessonTitle || activeTaskData?.title || 'Zadanie',
                tasks: activeTaskData?.tasks || activeTaskData?.lessonTasks || (activeTaskData ? [activeTaskData] : []),
                ...activeTaskData
              }} 
              userState={userState} 
              onCompleteSession={handleCompleteTask} 
              onCancelSession={handleCancelTask}
              onDeductCoins={handleDeductCoins}
              onDeductHeart={handleDeductHeart}
              onOpenParentSponsor={() => setShowParentSponsorModal(true)}
              onOpenProPopup={() => setShowProPopup(true)}
              onUpdateUserState={(updater) => {
                setUserState(prev => {
                  const next = updater(prev);
                  saveUserData(next);
                  return next;
                });
              }}
            />
          ) : (
            <>
              {currentTab === 'dashboard' && (
                <DashboardView 
                  onNavigate={(tab, subTab) => {
                    setCurrentTab(tab as TabState);
                    if (subTab) setProfileInitialTab(subTab as any);
                  }} 
                  userState={userState}
                  completedTasks={completedTasks}
                  lessonMistakes={lessonMistakes}
                  taskStars={taskStars}
                  selectedSubjectKey={selectedSubjectKey}
                  onSelectSubject={handleSelectSubject}
                  onStartTask={handleStartTask}
                  onUpdateUserState={setUserState}
                  saveUserData={saveUserData}
                  onOpenParentSponsor={() => setShowParentSponsorModal(true)}
                  onOpenProPopup={() => setShowProPopup(true)}
                  onOpenDiagnostic={() => setShowDiagnosticModal(true)}
                  onOpenAiGenerator={() => setShowAiGeneratorModal(true)}
                  onOpenMistakesBank={() => setShowMistakesModal(true)}
                />
              )}
              {currentTab === 'nauka' && (
                <LearnView 
                  userState={userState}
                  selectedSubjectKey={selectedSubjectKey}
                  onSelectSubject={handleSelectSubject}
                  onStartTask={handleStartTask} 
                  onCompleteTask={handleCompleteTask}
                  isGuest={isGuest} 
                  onLoginRequest={handleLoginClick}
                  onProRequest={() => setShowProPopup(true)}
                  completedTasks={completedTasks}
                  taskStars={taskStars}
                  lessonMistakes={lessonMistakes}
                  onBackToDashboard={() => setCurrentTab('dashboard')}
                  onSheetToggle={setIsSubjectSheetOpen}
                />
              )}
              {currentTab === 'simulator' && <MaturaSimulatorView onEarnReward={handleMaturaReward} />}
              {currentTab === 'arena' && (
                <ArenaView 
                  userState={userState} 
                  onUpdateUserState={setUserState} 
                  saveUserData={saveUserData} 
                  onNavigate={(tab) => setCurrentTab(tab)}
                />
              )}
              {currentTab === 'profile' && (
                <ProfileView 
                  userState={userState} 
                  completedTasks={completedTasks}
                  onClaimAchievement={handleClaimAchievement}
                  onBuyShopItem={handleBuyShopItem}
                  onUseStreakFreeze={handleUseStreakFreeze}
                  onOpenAuthModal={() => setShowAuthModal(true)}
                  onOpenOnboarding={() => setShowGuestPrompt(true)}
                  initialTab={profileInitialTab}
                />
              )}
            </>
          )}
        </main>
      </div>

      <AnimatePresence>
        {(showGuestPrompt || isNewUser) && (
          <OnboardingOverlay 
            onClose={() => {
              setShowGuestPrompt(false);
              setIsNewUser(false);
            }}
            onNavigate={setCurrentTab}
            onComplete={handleOnboardingComplete}
            onOpenAuthModal={() => setShowAuthModal(true)}
            hasProgress={guestHasProgress}
            onLogin={handleLoginClick}
          />
        )}
      </AnimatePresence>

      <RewardPopup reward={reward} onClose={() => setReward(null)} />
      <ProPopup 
        isOpen={showProPopup} 
        onClose={() => setShowProPopup(false)} 
        onOpenParentSponsor={() => {
          setShowProPopup(false);
          setShowParentSponsorModal(true);
        }}
        onActivatePro={handleActivatePro}
      />
      <ParentSponsorModal
        isOpen={showParentSponsorModal}
        onClose={() => setShowParentSponsorModal(false)}
        onActivatePro={handleActivatePro}
        studentName="Twój maturzysta"
      />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <DiagnosticTestModal
        isOpen={showDiagnosticModal}
        onClose={() => setShowDiagnosticModal(false)}
        subjectKey={selectedSubjectKey}
        onComplete={handleCompleteDiagnostic}
      />
      <AiTaskGeneratorModal
        isOpen={showAiGeneratorModal}
        onClose={() => setShowAiGeneratorModal(false)}
        currentSubjectKey={selectedSubjectKey}
        onStartCustomTask={(task) => {
          setShowAiGeneratorModal(false);
          const customSession = {
            isSession: true,
            isPolish: selectedSubjectKey === 'pol',
            subjectId: normalizeSubjectFirestoreId(selectedSubjectKey),
            topicId: 'custom-ai-task',
            lessonId: 'ai-gen',
            lessonTitle: task.topic || 'Zadanie Wygenerowane przez AI',
            tasks: [task],
            firstTask: task,
            allTasks: [task],
            allTaskIdsToMarkCompleted: [task.id],
            required_correct_tasks: 1,
            estimated_time_formatted: '~3 min'
          };
          handleStartTask(customSession, [task], task.title || 'Zadanie Wygenerowane przez AI');
        }}
      />
      <MistakesBankModal
        isOpen={showMistakesModal}
        onClose={() => setShowMistakesModal(false)}
        onStartRehabSession={handleStartRehabSession}
        onNavigateToLessons={() => setCurrentTab('nauka')}
      />
    </div>
  );
}
