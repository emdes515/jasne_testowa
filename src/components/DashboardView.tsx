import React, { useMemo, useState, useEffect } from 'react';
import { 
  Flame, 
  Check, 
  Play, 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  Zap, 
  Clock,
  BookOpen,
  Calculator,
  Globe,
  Dna,
  FlaskConical,
  Lock,
  Target,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { triggerHaptic, getMilestoneStreakDays, filterActualTaskIds } from '../utils';
import { UserState } from '../types';
import { mathTopics } from '../data/mathTasks';
import { defaultPolishTopics } from '../data/polishCurriculum';
import { getLessonsForTopic } from './LearnView';
import { drawSessionTasks } from '../data/dzial1TaskPool';
import { curriculumRepository } from '../services/curriculumRepository';
import { PredictorWidget } from './PredictorWidget';
import { PredictorDetailsModal } from './PredictorDetailsModal';
import { calculateMaturaPrediction } from '../lib/maturaPredictor';
import { CKE_AVAILABLE_SUBJECTS } from '../data/ckeSubjectWeights';

interface DashboardViewProps {
  onNavigate?: (tab: string, subTab?: string) => void;
  userState?: UserState;
  completedTasks?: string[];
  lessonMistakes?: Record<string, number>;
  taskStars?: Record<string, number>;
  onStartTask?: (task: any, lessonTasks?: any[], lessonTitle?: string, nextLesson?: any) => void;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  saveUserData?: (state: UserState) => void;
  onOpenParentSponsor?: () => void;
  onOpenProPopup?: () => void;
  onOpenDiagnostic?: () => void;
  onOpenAiGenerator?: () => void;
}

export function DashboardView({ 
  onNavigate, 
  userState, 
  completedTasks = [], 
  lessonMistakes = {},
  taskStars = {},
  onStartTask,
  onOpenParentSponsor,
  onOpenProPopup,
  onOpenDiagnostic,
  onOpenAiGenerator
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

  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>(() => {
    try {
      return localStorage.getItem('matura_quest_selected_subject') || 'math';
    } catch {
      return 'math';
    }
  });

  const [topics, setTopics] = useState<any[]>(() => 
    selectedSubjectKey === 'pol' ? defaultPolishTopics : mathTopics
  );

  useEffect(() => {
    let isSubscribed = true;
    const firestoreSubjectId = selectedSubjectKey === 'pol' ? 'jezyk-polski' : 'matematyka-podstawowa';
    const fallbackTopics = selectedSubjectKey === 'pol' ? defaultPolishTopics : mathTopics;
    setTopics(fallbackTopics);

    curriculumRepository.getTopics(firestoreSubjectId).then(loaded => {
      if (isSubscribed && loaded && loaded.length > 0) {
        setTopics(loaded);
      }
    });
    return () => { isSubscribed = false; };
  }, [selectedSubjectKey]);

  useEffect(() => {
    const handleStorage = () => {
      try {
        const stored = localStorage.getItem('matura_quest_selected_subject') || 'math';
        if (stored !== selectedSubjectKey) {
          setSelectedSubjectKey(stored);
        }
      } catch {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [selectedSubjectKey]);

  const [showPredictorDetails, setShowPredictorDetails] = useState<boolean>(false);

  const handleSelectSubject = (newSubjectKey: string) => {
    setSelectedSubjectKey(newSubjectKey);
    try {
      localStorage.setItem('matura_quest_selected_subject', newSubjectKey);
      window.dispatchEvent(new Event('storage'));
    } catch {}
  };

  const currentSubjectId = selectedSubjectKey === 'pol' ? 'jezyk-polski' : 'matematyka-podstawowa';

  // Dynamiczny predyktor wyniku maturalnego CKE (obliczany w czasie rzeczywistym)
  const maturaPrediction = useMemo(() => {
    return calculateMaturaPrediction({
      subjectId: currentSubjectId,
      completedTasks,
      lessonMistakes,
      userLessonsCompleted: userState?.completed_lessons,
      maturaAttempts: userState?.maturaAttempts,
      maturaBestScore: userState?.maturaBestScore
    });
  }, [
    currentSubjectId,
    completedTasks,
    lessonMistakes,
    userState?.completed_lessons,
    userState?.maturaAttempts,
    userState?.maturaBestScore
  ]);

  const nextUp = useMemo(() => {
    for (let topicIdx = 0; topicIdx < topics.length; topicIdx++) {
      const topic = topics[topicIdx];
      const lessons = getLessonsForTopic(topic);
      const incompleteLesson = lessons.find(l => {
        const cleanId = l.id.replace(/^(lesson-|pol-lesson-)/, '');
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
          groupTasks: incompleteLesson.tasks || [],
          incompleteLesson,
          completedCount: 0,
          totalCount: incompleteLesson.required_correct_tasks || 3
        };
      }
    }
    return null;
  }, [topics, completedTasks, userState]);

  const handleResumeClick = async () => {
    triggerHaptic('medium');
    if (!nextUp) {
      onNavigate?.('nauka');
      return;
    }

    const defaultTopicId = selectedSubjectKey === 'pol' ? 'pol-dzial-1' : 'dzial-1';
    const topicId = nextUp.topicId || defaultTopicId;
    const subjectFirestoreId = selectedSubjectKey === 'pol' ? 'jezyk-polski' : 'matematyka-podstawowa';

    // 1 document read (0 if cached)
    let lessonDoc: any = null;
    try {
      lessonDoc = await curriculumRepository.getLesson(topicId, nextUp.groupId, subjectFirestoreId);
    } catch (err) {
      console.warn('Could not fetch lesson from repository, falling back to local curriculum', err);
    }

    const localTasks = (nextUp.groupTasks && nextUp.groupTasks.length > 0)
      ? nextUp.groupTasks
      : ((nextUp as any).incompleteLesson?.tasks || []);
    const tasks = (lessonDoc?.tasks && lessonDoc.tasks.length > 0) ? lessonDoc.tasks : localTasks;
    const lessonFormulaSheet = lessonDoc?.formula_sheet || lessonDoc?.formulaSheet || (nextUp as any).incompleteLesson?.formula_sheet;
    const poolResult = drawSessionTasks(nextUp.groupId, tasks, lessonFormulaSheet);
    const tasksToRun = (poolResult.sessionTasks && poolResult.sessionTasks.length > 0)
      ? poolResult.sessionTasks
      : (tasks.length > 0 ? tasks : localTasks);

    if (!tasksToRun || tasksToRun.length === 0) {
      onNavigate?.('nauka');
      return;
    }

    const sessionPayload = {
      isSession: true,
      isPolish: selectedSubjectKey === 'pol',
      subjectId: subjectFirestoreId,
      topicId,
      lessonId: nextUp.groupId,
      lessonTitle: nextUp.lessonName,
      tasks: tasksToRun,
      firstTask: tasksToRun[0],
      allTasks: tasks,
      formulaSheet: lessonFormulaSheet || poolResult.formulaSheet || (selectedSubjectKey === 'pol' ? (lessonDoc as any)?.leksykon || ((nextUp as any).incompleteLesson as any)?.leksykon || null : null),
      theoryPill: lessonDoc?.theory_pill || poolResult.theoryPill || ((nextUp as any).incompleteLesson as any)?.theory_pill,
      allTaskIdsToMarkCompleted: tasks.map((t: any) => t.id),
      required_correct_tasks: (nextUp as any).incompleteLesson?.required_correct_tasks || poolResult.required_correct_tasks || 3,
      estimated_time_formatted: (nextUp as any).incompleteLesson?.estimated_time_formatted || poolResult.estimated_time_formatted || '~5 min'
    };

    if (onStartTask) {
      onStartTask(sessionPayload, tasksToRun, sessionPayload.lessonTitle);
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
      {/* 0. PASEK WYBORU PRZEDMIOTU (GLOBAL DASHBOARD CONTEXT) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-3.5 scroll-smooth select-none">
        {CKE_AVAILABLE_SUBJECTS.map((sub) => {
          const isActive = sub.key === selectedSubjectKey;
          const SubIcon = 
            sub.iconName === 'math' ? Calculator :
            sub.iconName === 'book' ? BookOpen :
            sub.iconName === 'dna' ? Dna :
            sub.iconName === 'flask' ? FlaskConical :
            Globe;

          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => {
                if (!sub.isAvailable) {
                  triggerHaptic('medium');
                  return;
                }
                triggerHaptic('light');
                handleSelectSubject(sub.key);
              }}
              className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-200 shrink-0 border cursor-pointer ${
                isActive
                  ? sub.key === 'pol'
                    ? 'bg-gradient-to-r from-rose-500/20 via-rose-500/10 to-transparent border-rose-500/50 text-white shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                    : 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border-amber-500/50 text-white shadow-[0_0_20px_rgba(255,184,0,0.25)]'
                  : sub.isAvailable
                  ? 'bg-[#111726]/80 hover:bg-[#162033] border-white/5 hover:border-white/15 text-slate-400 hover:text-slate-200'
                  : 'bg-black/30 border-white/5 text-slate-600 opacity-60 cursor-not-allowed'
              }`}
            >
              <div 
                className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isActive
                    ? sub.key === 'pol' ? 'bg-rose-500 text-white' : 'bg-[#FFB800] text-slate-950'
                    : 'bg-white/5 text-slate-400 group-hover:text-white'
                }`}
              >
                <SubIcon size={13} />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-extrabold text-[12px] tracking-tight">{sub.shortName}</span>
                  {!sub.isAvailable ? (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/5 text-slate-500 border border-white/5">
                      Wkrótce
                    </span>
                  ) : isActive ? (
                    <span 
                      className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                      style={{ backgroundColor: sub.key === 'pol' ? '#F43F5E' : '#FFB800' }}
                    />
                  ) : null}
                </div>
                <span className="text-[10px] text-slate-400/80 font-medium leading-tight mt-0.5">
                  {sub.examTag}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 1. DYNAMICZNY PREDYKTOR WYNIKU MATURALNEGO CKE */}
      <PredictorWidget
        result={maturaPrediction}
        currentSubjectKey={selectedSubjectKey}
        onOpenDetails={() => setShowPredictorDetails(true)}
        onOpenDiagnostic={onOpenDiagnostic}
        onNavigate={onNavigate}
      />

      {/* SZYBKIE AKCJE AI & DIAGNOSTYKA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
        {onOpenDiagnostic && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              onOpenDiagnostic();
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-[#121A26] to-[#10141E] hover:from-[#172233] hover:to-[#141A26] border border-amber-500/25 hover:border-amber-400/50 transition-all flex items-center justify-between text-left group shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Target size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider block">
                  Test Poziomu
                </span>
                <p className="text-xs font-bold text-white truncate">
                  Oceń poziom i skalibruj predyktor
                </p>
              </div>
            </div>
            <ArrowRight size={14} className="text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {onOpenAiGenerator && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              onOpenAiGenerator();
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-[#18111A] to-[#120F16] hover:from-[#211624] hover:to-[#18111A] border border-purple-500/25 hover:border-purple-400/50 transition-all flex items-center justify-between text-left group shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold text-purple-300 uppercase tracking-wider block">
                  Generator Zadań AI
                </span>
                <p className="text-xs font-bold text-white truncate">
                  Nowe zadania z kluczem CKE
                </p>
              </div>
            </div>
            <ArrowRight size={14} className="text-purple-400 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* 2. KARTA BIEŻĄCEGO POSTĘPU: NASTĘPNY KROK W NAUCE */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className={`border rounded-2xl p-4 sm:p-5 mb-3.5 relative overflow-hidden transition-colors shadow-sm ${
          selectedSubjectKey === 'pol'
            ? 'bg-[#18111A] border-rose-500/25 hover:border-rose-500/45'
            : 'bg-[#121A26] border-white/10 hover:border-[#FFB800]/40'
        }`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                selectedSubjectKey === 'pol'
                  ? 'text-rose-400 bg-rose-500/15 border-rose-500/30'
                  : 'text-amber-400 bg-amber-400/10 border-amber-400/20'
              }`}>
                <Play size={10} fill="currentColor" />
                <span>Następny Krok w Nauce</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                selectedSubjectKey === 'pol'
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
              }`}>
                {selectedSubjectKey === 'pol' ? 'Język Polski' : 'Matematyka'}
              </span>
            </div>
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

            <motion.button
              id="dashboard-resume-learning-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleResumeClick}
              className={`shrink-0 font-bold text-xs sm:text-sm py-2.5 px-4 sm:px-5 rounded-xl transition-all flex items-center gap-2 cursor-pointer relative overflow-hidden ${
                selectedSubjectKey === 'pol'
                  ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_25px_rgba(244,63,94,0.4)]'
                  : 'bg-[#FFB800] hover:bg-[#FFC72C] text-[#080B11] shadow-[0_0_25px_rgba(255,184,0,0.4)]'
              }`}
            >
              <span>{nextUp ? ((nextUp.completedCount || 0) > 0 ? 'WZNÓW NAUKĘ' : 'ROZPOCZNIJ NAUKĘ') : 'OTWÓRZ MAPĘ'}</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* 2. KARTA SERII DNI (STREAK) */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="bg-gradient-to-br from-[#141A23] to-[#0B0E14] border border-[#F97316]/30 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-[0_4px_25px_rgba(249,115,22,0.15)] group"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#F97316]/15 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#EA580C]/10 rounded-full blur-[30px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="flex items-center justify-between relative z-10 mb-3.5">
          <div className="pr-2">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-[#F97316] text-lg sm:text-xl tracking-wide drop-shadow-[0_0_12px_rgba(249,115,22,0.5)]">
                {streakDays} {streakDays === 1 ? 'Dzień' : 'Dni'} z rzędu!
              </h3>
            </div>
            <p className="text-[#8B8D98] text-[11px] leading-tight mt-0.5">
              {isCompletedToday 
                ? "Dzisiejszy cel serii zaliczony! Ogień płonie dalej."
                : `Cel na dziś: rozwiąż zadanie, aby zaliczyć Dzień ${todayTargetDayNumber}!`}
            </p>
          </div>
          
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#C2410C] flex items-center justify-center shadow-[0_0_18px_rgba(249,115,22,0.5)] border border-white/20 shrink-0">
            <Flame size={20} className="text-white fill-white animate-flame-breath" />
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
                      ? 'border-2 border-dashed border-[#F97316] text-[#F97316] bg-[#F97316]/15 shadow-[0_0_12px_rgba(249,115,22,0.4)] animate-pulse'
                      : 'bg-white/5 border border-white/5 text-[#8B8D98]'
                  }`}
                  title={m.fullLabel}
                >
                  {m.isCompleted ? (
                    <Check size={16} strokeWidth={3} />
                  ) : m.isTargetToday ? (
                    <Flame size={15} className="fill-[#F97316] animate-flame-breath" />
                  ) : (
                    <span>{m.dayNumber}</span>
                  )}
                </div>
                <span 
                  className={`text-[9px] sm:text-[10px] font-bold text-center leading-none truncate max-w-full ${
                    m.isCompleted 
                      ? 'text-[#F97316]' 
                      : m.isTargetToday 
                      ? 'text-white font-extrabold' 
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
          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-[#121824]/80 hover:bg-[#151E2E] border border-white/5 hover:border-emerald-500/25 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all shadow-sm group cursor-default"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mb-3 group-hover:scale-110 transition-transform duration-200">
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
          </motion.div>

          {/* KARTA 2: SKUTECZNOŚĆ */}
          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-[#121824]/80 hover:bg-[#151E2E] border border-white/5 hover:border-amber-500/25 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all shadow-sm group cursor-default"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center justify-center text-[#FFB800] shrink-0 mb-3 group-hover:scale-110 transition-transform duration-200">
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
          </motion.div>

          {/* KARTA 3: CZAS NAUKI */}
          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-[#121824]/80 hover:bg-[#151E2E] border border-white/5 hover:border-amber-500/25 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all shadow-sm group cursor-default"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mb-3 group-hover:scale-110 transition-transform duration-200">
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
          </motion.div>
        </div>
      </motion.div>

      {/* MODAL SZCZEGÓŁOWY I SYMULATOR PREDYKTORA */}
      <PredictorDetailsModal
        isOpen={showPredictorDetails}
        onClose={() => setShowPredictorDetails(false)}
        baseResult={maturaPrediction}
        subjectId={currentSubjectId}
        currentSubjectKey={selectedSubjectKey}
        onSelectSubject={handleSelectSubject}
        completedTasks={completedTasks}
        lessonMistakes={lessonMistakes}
        userLessonsCompleted={userState?.completed_lessons}
        maturaAttempts={userState?.maturaAttempts}
        maturaBestScore={userState?.maturaBestScore}
        onNavigate={onNavigate}
        onOpenParentSponsor={onOpenParentSponsor}
        onOpenProPopup={onOpenProPopup}
      />
    </div>
  );
}
