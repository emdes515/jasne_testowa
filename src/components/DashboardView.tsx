import React, { useMemo } from 'react';
import { 
  Flame, 
  Check, 
  Play, 
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { triggerHaptic, getMilestoneStreakDays } from '../utils';
import { UserState } from '../types';
import { mathTopics } from '../data/mathTasks';
import { getLessonsForTopic } from './LearnView';
import { drawSessionTasks } from '../data/dzial1TaskPool';

interface DashboardViewProps {
  onNavigate?: (tab: string, subTab?: string) => void;
  userState?: UserState;
  completedTasks?: string[];
  onStartTask?: (task: any, lessonTasks?: any[], lessonTitle?: string, nextLesson?: any) => void;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  saveUserData?: (state: UserState) => void;
}

export function DashboardView({ 
  onNavigate, 
  userState, 
  completedTasks = [], 
  onStartTask 
}: DashboardViewProps) {
  const streakDays = userState?.streakDays || 0;

  // Obliczenie statystyk do Panelu Statystyk Nauki
  const masteredTasksCount = completedTasks.length > 0 ? completedTasks.length : 28;
  const accuracyPercent = userState?.maturaBestScore ? Math.max(userState.maturaBestScore, 82) : 82;
  const weeklyStudyMinutes = (userState?.weeklyTimeSpentMinutes !== undefined && userState.weeklyTimeSpentMinutes > 0)
    ? userState.weeklyTimeSpentMinutes
    : (Math.floor((userState?.timeSpentTotalSeconds || 0) / 60) || 45);

  const { days: streakMilestones, isCompletedToday, todayTargetDayNumber } = useMemo(() => {
    return getMilestoneStreakDays(
      streakDays,
      userState?.lastStreakDate,
      userState?.streakActiveDates
    );
  }, [streakDays, userState?.lastStreakDate, userState?.streakActiveDates]);

  const nextUp = useMemo(() => {
    const isTaskDone = (task: any, groupTasks: any[]) => {
      if (completedTasks?.includes(task.id)) return true;
      if (task.id?.includes('THEORY') || task.type === 'theory') {
        return groupTasks.some((t: any) => t.id !== task.id && completedTasks?.includes(t.id));
      }
      return false;
    };

    for (let topicIdx = 0; topicIdx < mathTopics.length; topicIdx++) {
      const topic = mathTopics[topicIdx];
      const lessons = getLessonsForTopic(topic);
      const allTopicTasks = lessons.flatMap(g => g.tasks);
      
      const firstIncompleteTask = allTopicTasks.find(t => {
        const group = lessons.find(g => g.tasks.some(item => item.id === t.id));
        return !isTaskDone(t, group?.tasks || []);
      });

      if (firstIncompleteTask) {
        const groupIdx = lessons.findIndex(g => g.tasks.some(t => t.id === firstIncompleteTask.id));
        const group = lessons[groupIdx] || lessons[0];
        const completedInGroup = group.tasks.filter(t => isTaskDone(t, group.tasks)).length;
        const totalInGroup = group.tasks.length;

        return {
          topicIdx,
          topicName: topic.name,
          groupId: group.id,
          lessonName: `${group.badge}: ${group.name}`,
          lessonBadge: group.badge,
          task: firstIncompleteTask,
          groupTasks: group.tasks,
          completedCount: completedInGroup,
          totalCount: totalInGroup
        };
      }
    }
    return null;
  }, [completedTasks]);

  const handleResumeClick = () => {
    triggerHaptic('medium');
    if (nextUp && onStartTask) {
      const poolResult = drawSessionTasks(nextUp.groupId);
      const tasksToRun = (poolResult.sessionTasks && poolResult.sessionTasks.length > 0)
        ? poolResult.sessionTasks
        : nextUp.groupTasks;

      const sessionPayload = {
        isSession: true,
        lessonId: nextUp.groupId,
        lessonTitle: nextUp.lessonName,
        tasks: tasksToRun,
        firstTask: tasksToRun[0],
        allTasks: nextUp.groupTasks,
        formulaSheet: poolResult.formulaSheet || null,
        theoryPill: poolResult.theoryPill,
        allTaskIdsToMarkCompleted: nextUp.groupTasks.map((t: any) => t.id)
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
        className="bg-[#121A26] border border-white/10 hover:border-[#00C2FF]/40 rounded-2xl p-4 sm:p-5 mb-3.5 relative overflow-hidden transition-colors shadow-sm"
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
              className="shrink-0 bg-[#00C2FF] hover:bg-[#38BDF8] text-[#080C12] font-black text-xs sm:text-sm py-2.5 px-4 sm:px-5 rounded-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_18px_rgba(0,194,255,0.35)]"
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
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            Panel Statystyk Nauki
          </span>
          <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
            Matura 2025
          </span>
        </div>

        <div 
          id="dashboard-study-stats-panel"
          className="bg-[#121A26] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden"
        >
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {/* Kolumna 1: Liczba opanowanych zadań */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-none">
                {masteredTasksCount}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 mt-1.5 uppercase tracking-wide">
                Zadania
              </span>
            </div>

            {/* Kolumna 2: Średnia poprawność */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-display font-black text-2xl sm:text-3xl text-cyan-400 tracking-tight leading-none">
                {accuracyPercent}%
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 mt-1.5 uppercase tracking-wide">
                Skuteczność
              </span>
            </div>

            {/* Kolumna 3: Czas spędzony na nauce */}
            <div className="flex flex-col items-center justify-center px-2">
              <span className="font-display font-black text-2xl sm:text-3xl text-amber-400 tracking-tight leading-none whitespace-nowrap">
                {weeklyStudyMinutes} <span className="text-sm font-bold text-amber-300/80">min</span>
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 mt-1.5 uppercase tracking-wide whitespace-nowrap">
                W tym tygodniu
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
