import React, { useMemo, useState, useEffect } from 'react';
import { 
  Flame, 
  Check, 
  Play, 
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Zap,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { triggerHaptic, getMilestoneStreakDays, filterActualTaskIds } from '../utils';
import { UserState } from '../types';
import { mathTopics } from '../data/mathTasks';
import { getLessonsForTopic } from './LearnView';
import { drawSessionTasks } from '../data/dzial1TaskPool';
import { curriculumRepository } from '../services/curriculumRepository';

interface DashboardViewProps {
  onNavigate?: (tab: string, subTab?: string) => void;
  userState?: UserState;
  completedTasks?: string[];
  lessonMistakes?: Record<string, number>;
  taskStars?: Record<string, number>;
  onStartTask?: (task: any, lessonTasks?: any[], lessonTitle?: string, nextLesson?: any) => void;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  saveUserData?: (state: UserState) => void;
}

export function DashboardView({ 
  onNavigate, 
  userState, 
  completedTasks = [], 
  lessonMistakes = {},
  taskStars = {},
  onStartTask 
}: DashboardViewProps) {
  const streakDays = userState?.streakDays || 0;

  // 1. ZADANIA - Rzeczywista liczba unikalnych, poprawnie rozwiązanych zadań
  const actualCompletedTasks = useMemo(() => {
    return filterActualTaskIds(completedTasks);
  }, [completedTasks]);

  const masteredTasksCount = actualCompletedTasks.length;

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const todayTasksCount = userState?.dailyTaskCounts?.[todayStr] || 0;

  // 2. SKUTECZNOŚĆ - Rzeczywisty procent wyliczony z rozwiązanych zadań oraz popełnionych błędów
  const { accuracyPercent, totalMistakes, accuracyBadgeLabel } = useMemo(() => {
    const uniqueMistakes: Record<string, number> = {};
    Object.entries(lessonMistakes).forEach(([k, count]) => {
      const cleanKey = k.replace('lesson-', '').replace('-', '.');
      if (uniqueMistakes[cleanKey] === undefined || count > uniqueMistakes[cleanKey]) {
        uniqueMistakes[cleanKey] = count;
      }
    });

    const mistakesSum = Object.values(uniqueMistakes).reduce((acc, curr) => acc + curr, 0);
    const solvedCount = actualCompletedTasks.length;

    if (solvedCount === 0 && mistakesSum === 0) {
      if (userState?.maturaBestScore && userState.maturaBestScore > 0) {
        return {
          accuracyPercent: userState.maturaBestScore,
          totalMistakes: 0,
          accuracyBadgeLabel: `${userState.maturaBestScore}%`
        };
      }
      return {
        accuracyPercent: 0,
        totalMistakes: 0,
        accuracyBadgeLabel: '0%'
      };
    }

    const totalAttempts = solvedCount + mistakesSum;
    const computedPct = totalAttempts > 0 
      ? Math.min(100, Math.max(0, Math.round((solvedCount / totalAttempts) * 100)))
      : 100;

    let badgeLabel = 'Świetnie';
    if (computedPct === 100) badgeLabel = '100%';
    else if (computedPct >= 90) badgeLabel = 'Top';
    else if (computedPct >= 75) badgeLabel = 'Dobra';
    else badgeLabel = 'W toku';

    return {
      accuracyPercent: computedPct,
      totalMistakes: mistakesSum,
      accuracyBadgeLabel: badgeLabel
    };
  }, [actualCompletedTasks.length, lessonMistakes, userState?.maturaBestScore]);

  // 3. CZAS NAUKI - Rzeczywisty czas aktywności w bieżącym tygodniu
  const { studyTimeValue, studyTimeUnit, isStudyActiveThisWeek, activeDaysLabel } = useMemo(() => {
    const weeklyMins = userState?.weeklyTimeSpentMinutes || 0;
    const totalSecs = userState?.timeSpentTotalSeconds || 0;

    let effectiveMinutes = weeklyMins;
    if (effectiveMinutes === 0 && totalSecs >= 60) {
      effectiveMinutes = Math.floor(totalSecs / 60);
    }

    const activeDates = userState?.streakActiveDates || [];
    const daysCount = activeDates.length > 0 
      ? Math.min(7, activeDates.length) 
      : (streakDays > 0 ? Math.min(7, streakDays) : 0);

    const hasActivity = effectiveMinutes > 0 || streakDays > 0 || totalSecs > 0;

    if (effectiveMinutes === 0 && totalSecs > 0 && totalSecs < 60) {
      return {
        studyTimeValue: '< 1',
        studyTimeUnit: 'min',
        isStudyActiveThisWeek: true,
        activeDaysLabel: daysCount > 0 ? `${daysCount} dni z nauką` : 'Aktywna sesja'
      };
    }

    return {
      studyTimeValue: String(effectiveMinutes),
      studyTimeUnit: 'min',
      isStudyActiveThisWeek: hasActivity,
      activeDaysLabel: daysCount > 0 ? `${daysCount} dni z nauką` : 'Ten tydzień'
    };
  }, [userState?.weeklyTimeSpentMinutes, userState?.timeSpentTotalSeconds, userState?.streakActiveDates, streakDays]);

  const { days: streakMilestones, isCompletedToday, todayTargetDayNumber } = useMemo(() => {
    return getMilestoneStreakDays(
      streakDays,
      userState?.lastStreakDate,
      userState?.streakActiveDates
    );
  }, [streakDays, userState?.lastStreakDate, userState?.streakActiveDates]);

  const [topics, setTopics] = useState<any[]>(() => mathTopics);

  useEffect(() => {
    let isSubscribed = true;
    curriculumRepository.getTopics().then(loaded => {
      if (isSubscribed && loaded && loaded.length > 0) {
        setTopics(loaded);
      }
    });
    return () => { isSubscribed = false; };
  }, []);

  const nextUp = useMemo(() => {
    for (let topicIdx = 0; topicIdx < topics.length; topicIdx++) {
      const topic = topics[topicIdx];
      const lessons = getLessonsForTopic(topic);
      const incompleteLesson = lessons.find(l => {
        const cleanId = l.id.replace('lesson-', '');
        const dotId = cleanId.replace('-', '.');
        const userLessons: string[] = (userState as any)?.completed_lessons || [];
        const isDone = 
          completedTasks.includes(`LESSON-${l.id}`) ||
          completedTasks.includes(`LESSON-${cleanId}`) ||
          completedTasks.includes(`LESSON-${dotId}`) ||
          completedTasks.includes(l.id) ||
          completedTasks.includes(cleanId) ||
          userLessons.includes(l.id) ||
          userLessons.includes(cleanId) ||
          userLessons.includes(dotId);
        return !isDone;
      });

      if (incompleteLesson) {
        return {
          topicIdx,
          topicId: topic.id,
          topicName: topic.name || topic.title,
          groupId: incompleteLesson.id,
          lessonName: `${incompleteLesson.badge}: ${incompleteLesson.name}`,
          lessonBadge: incompleteLesson.badge,
          task: null,
          groupTasks: [],
          completedCount: 0,
          totalCount: incompleteLesson.required_correct_tasks || 3
        };
      }
    }
    return null;
  }, [topics, completedTasks, userState]);

  const handleResumeClick = async () => {
    triggerHaptic('medium');
    if (nextUp && onStartTask) {
      const topicId = nextUp.topicId || 'dzial-1';
      // 1 document read (0 if cached)
      const lessonDoc = await curriculumRepository.getLesson(topicId, nextUp.groupId);
      const tasks = lessonDoc?.tasks || [];
      const poolResult = drawSessionTasks(nextUp.groupId, tasks);
      const tasksToRun = (poolResult.sessionTasks && poolResult.sessionTasks.length > 0)
        ? poolResult.sessionTasks
        : tasks;

      const sessionPayload = {
        isSession: true,
        lessonId: nextUp.groupId,
        lessonTitle: nextUp.lessonName,
        tasks: tasksToRun,
        firstTask: tasksToRun[0],
        allTasks: tasks,
        formulaSheet: poolResult.formulaSheet || null,
        theoryPill: lessonDoc?.theory_pill || poolResult.theoryPill,
        allTaskIdsToMarkCompleted: tasks.map((t: any) => t.id)
      };

      onStartTask(sessionPayload, sessionPayload.tasks, sessionPayload.lessonTitle);
    } else {
      onNavigate?.('nauka');
    }
  };

  return (
    <div 
      id="dashboard-scroll-content"
      className="flex flex-col p-4 sm:p-6 pt-5 pb-[140px] max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto w-full overflow-x-hidden"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {/* 1. KARTA BIEŻĄCEGO POSTĘPU: NASTĘPNY KROK W NAUCE */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="bg-[#121A26] border border-white/10 hover:border-[#FFB800]/40 rounded-2xl p-4 sm:p-5 mb-3.5 relative overflow-hidden transition-colors shadow-sm"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
              <Play size={10} fill="currentColor" />
              <span>Następny Krok w Nauce</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {nextUp ? `${nextUp.completedCount}/${nextUp.totalCount} kroków` : 'Wszystko zaliczone!'}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-black text-white text-base sm:text-lg leading-tight truncate">
                {nextUp ? nextUp.lessonName : 'Wszystkie działy ukończone!'}
              </h3>
              {nextUp && (
                <p className="text-xs text-slate-400 font-medium truncate mt-1">
                  {nextUp.topicName}
                </p>
              )}
            </div>

            <button
              id="dashboard-resume-learning-button"
              onClick={handleResumeClick}
              className="shrink-0 bg-[#FFB800] hover:bg-[#FFC72C] text-[#080B11] font-bold text-xs sm:text-sm py-2.5 px-4 sm:px-5 rounded-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,184,0,0.35)]"
            >
              <span>{nextUp ? 'WZNÓW NAUKĘ' : 'OTWÓRZ MAPĘ'}</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. KARTA SERII DNI (STREAK) */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="bg-gradient-to-br from-[#141A23] to-[#0B0E14] border border-[#F97316]/30 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-[0_4px_20px_rgba(249,115,22,0.12)]"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#F97316]/15 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#EA580C]/10 rounded-full blur-[30px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10 mb-3.5">
          <div className="pr-2">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-[#F97316] text-lg sm:text-xl tracking-wide drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
                {streakDays} {streakDays === 1 ? 'Dzień' : 'Dni'} z rzędu!
              </h3>
            </div>
            <p className="text-[#8B8D98] text-[11px] leading-tight mt-0.5">
              {isCompletedToday 
                ? "Dzisiejszy cel serii zaliczony! Ogień płonie dalej."
                : `Cel na dziś: rozwiąż zadanie, aby zaliczyć Dzień ${todayTargetDayNumber}!`}
            </p>
          </div>
          
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#C2410C] flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)] border border-white/20 shrink-0">
            <Flame size={20} className="text-white fill-white animate-pulse" />
          </div>
        </div>

        {/* 7-dniowa ścieżka serii */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 relative z-10 pt-3 border-t border-white/5">
          {streakMilestones.map((m) => {
            return (
              <div key={m.dayNumber} className="flex flex-col items-center gap-1">
                <div 
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-200 relative ${
                    m.isCompleted
                      ? 'bg-[#F97316] text-white shadow-[0_0_12px_rgba(249,115,22,0.5)] border border-white/20'
                      : m.isTargetToday
                      ? 'border-2 border-dashed border-[#F97316] text-[#F97316] bg-[#F97316]/15 shadow-[0_0_10px_rgba(249,115,22,0.3)] animate-pulse'
                      : 'bg-white/5 border border-white/5 text-[#8B8D98]'
                  }`}
                  title={m.fullLabel}
                >
                  {m.isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : m.isTargetToday ? (
                    <Flame size={15} className="fill-[#F97316]" />
                  ) : (
                    <span>{m.dayNumber}</span>
                  )}
                </div>
                <span 
                  className={`text-[9px] sm:text-[10px] font-bold text-center leading-none truncate max-w-full ${
                    m.isCompleted 
                      ? 'text-[#F97316]' 
                      : m.isTargetToday 
                      ? 'text-white' 
                      : 'text-[#8B8D98]'
                  }`}
                >
                  {m.shortLabel}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 3. SEKCJA: PANEL STATYSTYK NAUKI */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="mt-3.5"
      >
        {/* Nagłówek: Czysty minimalizm bez kapitalików na siłę i bez zbędnych badge'y */}
        <div className="flex items-center mb-3 px-0.5">
          <div className="flex items-center gap-2">
            <BarChart3 size={15} className="text-[#FFB800]" />
            <h3 className="text-sm font-medium text-slate-200">
              Twoje postępy
            </h3>
          </div>
        </div>

        <div 
          id="dashboard-study-stats-panel"
          className="grid grid-cols-3 gap-2.5 sm:gap-3"
        >
          {/* KARTA 1: UKOŃCZONE ZADANIA */}
          <div className="bg-[#121824]/80 border border-white/5 hover:border-white/10 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mb-3">
              <CheckCircle2 size={16} strokeWidth={2.2} />
            </div>

            <div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-none">
                {masteredTasksCount}
              </div>
              <div className="mt-1.5 flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-slate-200 leading-tight">
                  Ukończone zadania
                </span>
              </div>
            </div>
          </div>

          {/* KARTA 2: SKUTECZNOŚĆ */}
          <div className="bg-[#121824]/80 border border-white/5 hover:border-white/10 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800] shrink-0 mb-3">
              <Zap size={16} strokeWidth={2.2} />
            </div>

            <div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-none">
                {accuracyPercent}%
              </div>
              <div className="mt-1.5 flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-slate-200 leading-tight">
                  Skuteczność
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-normal mt-0.5 truncate">
                  Z poprawnych odp.
                </span>
              </div>
            </div>
          </div>

          {/* KARTA 3: CZAS NAUKI */}
          <div className="bg-[#121824]/80 border border-white/5 hover:border-white/10 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mb-3">
              <Clock size={16} strokeWidth={2.2} />
            </div>

            <div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-none whitespace-nowrap">
                {studyTimeValue} <span className="text-xs sm:text-sm font-medium text-slate-400">{studyTimeUnit}</span>
              </div>
              <div className="mt-1.5 flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-slate-200 leading-tight">
                  Czas nauki
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-normal mt-0.5 truncate">
                  W tym tygodniu
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
