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
  Cpu,
  FileText,
  Layers,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';
import { triggerHaptic, getMilestoneStreakDays, filterActualTaskIds } from '../utils';
import { UserState, SubjectKey } from '../types';
import { POLISH_SHOWCASE_LESSONS, PolishLessonShowcase } from '../data/polishVerticalSliceData';
import { CANONICAL_LEKTURY_LIST, CanonicalLektura } from '../data/polishLekturyData';
import { POLISH_FALLBACK_TOPICS } from '../data/polishCurriculumFallback';
import { ArgumentVaultModal } from './polish/ArgumentVaultModal';
import { PolishDailyMission } from './polish/PolishDailyMission';
import { ExamHubModal } from './ExamHubModal';
import { argumentVaultService } from '../services/argumentVaultService';

import { getLessonsForTopic } from '../utils/lessonGrouping';
import { drawSessionTasks } from '../data/dzial1TaskPool';
import { curriculumRepository } from '../services/curriculumRepository';
import { PredictorWidget } from './PredictorWidget';
import { PredictorDetailsModal } from './PredictorDetailsModal';
import { calculateMaturaPrediction } from '../lib/maturaPredictor';
import { getCkeAvailableSubjects, normalizeSubjectFirestoreId, useCkeCatalogs } from '../services/ckeCatalogRepository';

interface DashboardViewProps {
  onNavigate?: (tab: string, subTab?: string) => void;
  userState?: UserState;
  completedTasks?: string[];
  lessonMistakes?: Record<string, number>;
  taskStars?: Record<string, number>;
  selectedSubjectKey?: SubjectKey;
  onSelectSubject?: (key: SubjectKey) => void;
  onStartTask?: (task: any, lessonTasks?: any[], lessonTitle?: string, nextLesson?: any) => void;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  saveUserData?: (state: UserState) => void;
  onOpenParentSponsor?: () => void;
  onOpenProPopup?: () => void;
  onOpenDiagnostic?: () => void;
  onOpenAiGenerator?: () => void;
  onOpenMistakesBank?: () => void;
}

export function DashboardView({ 
  onNavigate, 
  userState, 
  completedTasks = [], 
  lessonMistakes = {},
  taskStars = {},
  selectedSubjectKey: propSubjectKey,
  onSelectSubject,
  onStartTask,
  onOpenParentSponsor,
  onOpenProPopup,
  onOpenDiagnostic,
  onOpenAiGenerator,
  onOpenMistakesBank
}: DashboardViewProps) {
  useCkeCatalogs();
  const streakDays = userState?.streakDays || 0;
  const [isArgumentVaultOpen, setIsArgumentVaultOpen] = useState<boolean>(false);
  const [isExamHubOpen, setIsExamHubOpen] = useState<boolean>(false);
  const [polishTopics, setPolishTopics] = useState<any[]>(POLISH_FALLBACK_TOPICS);

  useEffect(() => {
    let isMounted = true;
    curriculumRepository.getTopics('jezyk-polski').then(t => {
      if (isMounted && t && t.length > 0) {
        setPolishTopics(t);
      }
    }).catch(err => {
      console.warn('[DashboardView] Could not load Polish topics from repository:', err);
    });
    return () => { isMounted = false; };
  }, []);

  const handleStartCanonicalLektura = (showcase: CanonicalLektura | PolishLessonShowcase) => {
    triggerHaptic('medium');
    const sessionPayload = {
      isSession: true,
      originTab: 'dashboard',
      isPolish: true,
      subjectId: 'jezyk-polski',
      topicId: (showcase as any).epochId || 'pol-showcase',
      lessonId: showcase.id,
      lessonTitle: `${showcase.badge}: ${showcase.title}`,
      tasks: showcase.tasks,
      formulaSheet: {
        title: `Kanon Lektur CKE: ${(showcase as any).bookTitle || showcase.title}`,
        description: `Kluczowe pojęcia i motywy do wykorzystania na rozprawce`,
        formulas: ((showcase.theoryPill as any)?.key_concepts || []).map((c: any) => ({
          name: c.title,
          formula: c.def,
          description: `Kluczowe pojęcie: ${c.title}`
        }))
      },
      theoryPill: showcase.theoryPill,
      required_correct_tasks: showcase.tasks.length,
      estimated_time_formatted: showcase.estimatedTime
    };

    onStartTask?.(sessionPayload, showcase.tasks, showcase.title);
  };

  const handleStartPolishDailyLesson = async (topicId: string, lessonId: string) => {
    triggerHaptic('medium');
    const lessonDoc = await curriculumRepository.ensureLessonLoaded(lessonId, topicId, 'jezyk-polski');
    if (lessonDoc) {
      const sessionPayload = {
        isSession: true,
        originTab: 'dashboard',
        isPolish: true,
        subjectId: 'jezyk-polski',
        topicId: topicId,
        lessonId: lessonDoc.id,
        lessonTitle: lessonDoc.title,
        tasks: lessonDoc.tasks || [],
        formulaSheet: (lessonDoc as any).formulaSheet || (lessonDoc as any).leksykon || null,
        theoryPill: lessonDoc.theory_pill,
        required_correct_tasks: (lessonDoc.tasks || []).length,
        estimated_time_formatted: lessonDoc.estimated_time_formatted || '~5 min'
      };
      onStartTask?.(sessionPayload, lessonDoc.tasks || [], lessonDoc.title);
    }
  };


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

  const [internalSubjectKey, setInternalSubjectKey] = useState<SubjectKey>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_selected_subject');
      if (stored && ['math', 'pol', 'eng', 'math-roz', 'eng-roz'].includes(stored)) {
        return stored as SubjectKey;
      }
      return 'math';
    } catch {
      return 'math';
    }
  });

  const selectedSubjectKey = (propSubjectKey || internalSubjectKey) as SubjectKey;

  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    let isSubscribed = true;
    const firestoreSubjectId = normalizeSubjectFirestoreId(selectedSubjectKey);

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
        const validKeys: SubjectKey[] = ['math', 'pol', 'eng', 'math-roz', 'eng-roz'];
        if (stored !== selectedSubjectKey && validKeys.includes(stored as SubjectKey)) {
          setInternalSubjectKey(stored as SubjectKey);
          onSelectSubject?.(stored as SubjectKey);
        }
      } catch {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [selectedSubjectKey, onSelectSubject]);

  const [showPredictorDetails, setShowPredictorDetails] = useState<boolean>(false);

  const handleSelectSubject = (newSubjectKey: string) => {
    const subMeta = getCkeAvailableSubjects().find(s => s.key === newSubjectKey);
    if (subMeta && !subMeta.isAvailable) {
      return; // ignores unavailable subjects
    }
    const validKeys: SubjectKey[] = ['math', 'pol', 'eng', 'math-roz', 'eng-roz'];
    if (!validKeys.includes(newSubjectKey as SubjectKey)) return;
    const key = newSubjectKey as SubjectKey;
    setInternalSubjectKey(key);
    onSelectSubject?.(key);
    try {
      localStorage.setItem('matura_quest_selected_subject', key);
      window.dispatchEvent(new Event('storage'));
    } catch {}
  };

  const currentSubjectId = normalizeSubjectFirestoreId(selectedSubjectKey);

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
        const cleanId = l.id.replace(/^(?:pol|eng|mat-roz|math-roz|eng-roz)?[-_]?lesson[-_]?/i, '');
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

    const defaultTopicId = (() => {
      switch (selectedSubjectKey) {
        case 'pol': return 'pol-dzial-1';
        case 'eng': return 'eng-dzial-1';
        case 'math-roz': return 'mat-roz-dzial-1';
        case 'eng-roz': return 'eng-roz-dzial-1';
        case 'math':
        default:
          return 'dzial-1';
      }
    })();
    const topicId = nextUp.topicId || defaultTopicId;
    const subjectFirestoreId = normalizeSubjectFirestoreId(selectedSubjectKey);

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
      originTab: 'dashboard',
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

  const renderStreakWidget = () => (
    <motion.div 
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="bg-surface-card border border-surface-border rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-sm group"
    >
      <div className="flex items-center justify-between relative z-10 mb-3.5">
        <div className="pr-2">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-black text-streak-flame text-lg sm:text-xl tracking-wide">
              {streakDays} {streakDays === 1 ? 'Dzień' : 'Dni'} z rzędu!
            </h3>
          </div>
          <p className="text-text-secondary text-[11px] leading-tight mt-0.5">
            {isCompletedToday 
              ? "Dzisiejszy cel serii zaliczony! Ogień płonie dalej."
              : `Cel na dziś: rozwiąż zadanie, aby zaliczyć Dzień ${todayTargetDayNumber}!`}
          </p>
        </div>
        
        <div className="w-10 h-10 rounded-xl bg-[#F97316]/15 border border-[#F97316]/30 flex items-center justify-center shrink-0">
          <Flame size={20} className="text-[#F97316] fill-[#F97316]" />
        </div>
      </div>

      {/* 7-dniowa ścieżka serii z wysokim kontrastem */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 relative z-10 pt-3 border-t border-surface-border">
        {streakMilestones.map((m) => {
          return (
            <div key={m.dayNumber} className="flex flex-col items-center gap-1">
              <div 
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-200 relative ${
                  m.isCompleted
                    ? 'bg-[#F97316] text-white shadow-sm border border-[#F97316]'
                    : m.isTargetToday
                    ? 'border-2 border-dashed border-[#F97316] text-[#F97316] bg-[#F97316]/10 shadow-sm'
                    : 'bg-surface-bg border border-surface-border text-slate-400'
                }`}
                title={m.fullLabel}
              >
                {m.isCompleted ? (
                  <Check size={15} strokeWidth={3} />
                ) : m.isTargetToday ? (
                  <Flame size={14} className="fill-[#EA580C]" />
                ) : (
                  <span>{m.dayNumber}</span>
                )}
              </div>
              <span 
                className={`text-[10px] font-bold text-center leading-none truncate max-w-full ${
                  m.isCompleted 
                    ? 'text-[#EA580C]' 
                    : m.isTargetToday 
                    ? 'text-white font-extrabold' 
                    : 'text-text-muted'
                }`}
              >
                {m.shortLabel}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div 
      id="dashboard-scroll-content"
      className="flex flex-col p-4 sm:p-6 lg:p-8 pt-5 pb-28 sm:pb-32 md:pb-8 max-w-6xl xl:max-w-7xl mx-auto w-full"
    >
      {/* 0. PASEK WYBORU PRZEDMIOTU (SEGMENTED CONTROL, CYBER-TACTILE) */}
      <div className="w-full shrink-0 mb-6 select-none flex justify-center">
        <div 
          id="dashboard-subject-pills"
          className="bg-surface-card border border-surface-border p-1.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto max-w-full scrollbar-none touch-pan-x"
        >
          {getCkeAvailableSubjects().filter(s => s.isAvailable).map((sub) => {
            const isActive = sub.key === selectedSubjectKey;
            const SubIcon = sub.key === 'pol' ? BookOpen : sub.key.includes('eng') ? Globe : Calculator;
            const accentColor = sub.accentColor || (sub.key === 'pol' ? '#F43F5E' : '#FFB800');

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  handleSelectSubject(sub.key);
                }}
                className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 border cursor-pointer shrink-0 whitespace-nowrap min-h-[42px] ${
                  isActive
                    ? 'bg-surface-card-hover border-primary/40 text-text-primary shadow-sm'
                    : 'border-transparent text-text-muted hover:text-text-secondary hover:bg-white/[0.04]'
                }`}
                style={isActive ? {
                  borderColor: `${accentColor}50`,
                  backgroundColor: `${accentColor}12`
                } : undefined}
              >
                <div 
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'bg-white/5 text-text-muted group-hover:text-text-primary'
                  }`}
                  style={isActive ? {
                    backgroundColor: accentColor,
                    color: accentColor === '#FFB800' ? '#080B11' : '#FFFFFF'
                  } : undefined}
                >
                  <SubIcon size={13} />
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-extrabold text-xs sm:text-sm tracking-tight">{sub.shortName}</span>
                    {isActive && (
                      <span 
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                    )}
                  </div>
                  <span className="text-[10px] text-text-muted font-medium leading-tight mt-0.5">
                    {sub.examTag}
                  </span>
                </div>
              </button>
            );
          })}

          {/* Kafelek kolejnych przedmiotów w przygotowaniu na końcu rzędu */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-text-muted bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-xl shrink-0 whitespace-nowrap">
            <span className="font-bold text-text-muted uppercase tracking-wider text-[10px]">Wkrótce:</span>
            <span className="text-text-secondary font-medium">Biologia</span>
            <span className="text-slate-600">•</span>
            <span className="text-text-secondary font-medium">Chemia</span>
            <span className="text-slate-600">•</span>
            <span className="text-text-secondary font-medium">Fizyka</span>
          </div>
        </div>
      </div>

      {/* GŁÓWNA SIATKA DASHBOARDU: 2 KOLUMNY NA DESKTOPIE, 1 NA MOBILE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEWA KOLUMNA: KARTA LEKCJI (HERO), PREDYKTOR, STATYSTYKI */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
          
          {/* DZISIEJSZA MISJA CKE - JEDYNY DEDYKOWANY MODUŁ JĘZYKA POLSKIEGO NA DASHBOARDZIE */}
          {selectedSubjectKey === 'pol' && (
            <PolishDailyMission
              onStartLesson={handleStartPolishDailyLesson}
              completedTasks={completedTasks}
              userState={userState}
            />
          )}

          {/* 1. KARTA BIEŻĄCEGO POSTĘPU / NASTĘPNA LEKCJA (HERO CARD) - DLA POZOSTAŁYCH PRZEDMIOTÓW */}
          {selectedSubjectKey !== 'pol' && (() => {
            const activeSub = getCkeAvailableSubjects().find(s => s.key === selectedSubjectKey) || {
              name: 'Matematyka',
              shortName: 'Matematyka',
              accentColor: '#FFB800'
            };
            const accentColor = activeSub.accentColor || '#FFB800';

            return (
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="bg-surface-card border rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-colors shadow-lg group"
                style={{
                  borderColor: `${accentColor}40`,
                  boxShadow: `0 0 35px -8px ${accentColor}25`
                }}
              >
                {/* Luminous ambient highlight */}
                <div 
                  className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none blur-3xl opacity-20 transition-opacity group-hover:opacity-30"
                  style={{ backgroundColor: accentColor }}
                />

                <div className="flex flex-col gap-3 relative z-10">
                  {/* Tag działu i nazwa przedmiotu */}
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider"
                      style={{
                        color: accentColor,
                        backgroundColor: `${accentColor}18`,
                        border: `1px solid ${accentColor}35`
                      }}
                    >
                      {nextUp ? `Dział ${(nextUp.topicIdx ?? 0) + 1}` : 'Dział 1'}
                    </span>
                    <span className="text-xs font-semibold text-text-secondary">
                      {(activeSub as any).name || activeSub.shortName}
                    </span>
                  </div>

                  {/* Tytuł lekcji */}
                  <div>
                    <h2 className="font-display font-black text-text-primary text-lg sm:text-2xl leading-tight">
                      {nextUp ? nextUp.lessonName : 'Wszystkie działy ukończone!'}
                    </h2>
                    {nextUp?.topicName && (
                      <p className="text-xs sm:text-sm text-text-secondary font-medium mt-1">
                        {nextUp.topicName}
                      </p>
                    )}
                  </div>

                  {/* Pigułki metadanych lekcji: czas, zadania, pewniak */}
                  <div className="flex items-center gap-2 flex-wrap pt-0.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-bg border border-surface-border text-xs font-medium text-text-secondary">
                      <Clock size={13} className="text-text-muted" />
                      <span>~8 min</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-bg border border-surface-border text-xs font-medium text-text-secondary">
                      <FileText size={13} className="text-text-muted" />
                      <span>{nextUp ? `${nextUp.totalCount} zadania` : '4 zadania'}</span>
                    </span>
                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{
                        color: accentColor,
                        backgroundColor: `${accentColor}12`,
                        border: `1px solid ${accentColor}25`
                      }}
                    >
                      <Target size={13} />
                      <span>Pewniak maturalny</span>
                    </span>
                  </div>
                </div>

                {/* Stopka karty: postęp i wyrazisty CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-4 mt-2 border-t border-surface-border relative z-10">
                  <span className="text-xs sm:text-sm font-medium text-text-secondary">
                    {nextUp ? `${nextUp.completedCount}/${nextUp.totalCount} zadań zaliczonych w tej lekcji` : 'Wszystko zaliczone!'}
                  </span>

                  <button
                    id="dashboard-resume-learning-button"
                    type="button"
                    onClick={handleResumeClick}
                    className="shrink-0 font-display font-black text-xs sm:text-sm py-3 px-6 sm:px-7 rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap self-stretch sm:self-auto hover:brightness-105 active:scale-[0.98]"
                    style={{
                      backgroundColor: accentColor,
                      color: accentColor === '#FFB800' ? '#070A0F' : '#FFFFFF',
                      boxShadow: accentColor === '#FFB800' ? '0 0 25px rgba(255,184,0,0.35)' : '0 0 25px rgba(244,63,94,0.35)'
                    }}
                  >
                    <span>{nextUp ? ((nextUp.completedCount || 0) > 0 ? 'Wznów lekcję' : 'Rozpocznij lekcję') : 'Otwórz mapę'}</span>
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </button>
                </div>
              </motion.div>
            );
          })()}

          {/* WIDGET SERII (STREAK) NA MOBILE - WYŻEJ W PIONOWYM UKŁADZIE PONIŻEJ KARTY LEKCJI */}
          <div className="block lg:hidden">
            {renderStreakWidget()}
          </div>

          {/* CENTRUM EGZAMINACYJNE CKE (BENTO TRIGGER CARD) */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="bg-surface-card border border-surface-border hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all duration-200 shadow-md group"
          >
            {/* Ambient luminous glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-500/10 pointer-events-none blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />

            <div className="flex flex-col gap-4 relative z-10">
              {/* Header tags */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/25">
                    <GraduationCap size={13} className="text-amber-400" />
                    Centrum Egzaminacyjne CKE
                  </span>
                  <span className="text-xs font-semibold text-text-secondary">
                    {getCkeAvailableSubjects().find(s => s.key === selectedSubjectKey)?.fullName || (selectedSubjectKey === 'pol' ? 'Język Polski' : 'Matematyka')}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full tabular-nums">
                  {selectedSubjectKey === 'pol' ? '1056 zadań z kluczem' : '1006 zadań z kluczem'}
                </span>
              </div>

              {/* Title and subtitle */}
              <div>
                <h3 className="font-display font-black text-text-primary text-base sm:text-xl leading-tight">
                  Oficjalna Baza Zadań i Arkuszy CKE
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary font-medium mt-1 leading-relaxed">
                  Rozwiązuj zadania według wybranej strategii: maraton pytań z bazy CKE, szybki trening egzaminacyjny lub autentyczne arkusze maturalne.
                </p>
              </div>

              {/* 3 Interactive Quick-action pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('medium');
                    onNavigate?.('simulator', 'maraton');
                  }}
                  className="p-3.5 rounded-xl bg-surface-bg hover:bg-surface-card-hover border border-surface-border hover:border-amber-500/40 text-left transition-all group/btn cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">Tryb 1</span>
                    <Layers size={14} className="text-amber-400 group-hover/btn:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-text-primary">Wszystkie zadania</div>
                  <div className="text-[11px] text-text-muted mt-0.5">Maraton pytań CKE</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('medium');
                    onNavigate?.('simulator', 'exam_setup');
                  }}
                  className="p-3.5 rounded-xl bg-surface-bg hover:bg-surface-card-hover border border-surface-border hover:border-purple-500/40 text-left transition-all group/btn cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider">Tryb 2</span>
                    <GraduationCap size={14} className="text-purple-400 group-hover/btn:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-text-primary">Mini Matura</div>
                  <div className="text-[11px] text-text-muted mt-0.5">Szybki test 20–35 min</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('medium');
                    onNavigate?.('simulator', 'full_exams');
                  }}
                  className="p-3.5 rounded-xl bg-surface-bg hover:bg-surface-card-hover border border-surface-border hover:border-sky-500/40 text-left transition-all group/btn cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold text-sky-400 uppercase tracking-wider">Tryb 3</span>
                    <FileText size={14} className="text-sky-400 group-hover/btn:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-text-primary">Pełne Arkusze</div>
                  <div className="text-[11px] text-text-muted mt-0.5">Maj/Czerwiec 2015–2024</div>
                </button>
              </div>

              {/* Main CTA button */}
              <div className="pt-2 border-t border-surface-border flex items-center justify-between gap-3">
                <span className="text-xs text-text-secondary font-medium hidden sm:inline">
                  Wybierz format treningu i zacznij rozwiązywać arkusz
                </span>
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('medium');
                    setIsExamHubOpen(true);
                  }}
                  className="w-full sm:w-auto font-display font-black text-xs sm:text-sm py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 ml-auto"
                >
                  <span>Otwórz Centrum Egzaminacyjne</span>
                  <ArrowRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* 2. DYNAMICZNY PREDYKTOR WYNIKU MATURALNEGO CKE */}
          <PredictorWidget
            result={maturaPrediction}
            currentSubjectKey={selectedSubjectKey}
            onOpenDetails={() => setShowPredictorDetails(true)}
            onOpenDiagnostic={onOpenDiagnostic}
            onNavigate={onNavigate}
          />

          {/* 3. SEKCJA: PANEL STATYSTYK NAUKI */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-center mb-2.5 px-0.5">
              <div className="flex items-center gap-2">
                <BarChart3 size={15} className="text-[#FFB800]" />
                <h3 className="text-sm font-bold text-slate-200 text-center">
                  Twoje postępy
                </h3>
              </div>
            </div>

            <div 
              id="dashboard-study-stats-panel"
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3"
            >
              {/* KARTA 1: UKOŃCZONE ZADANIA */}
              <motion.div 
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-emerald-500/25 rounded-2xl p-4 flex flex-col items-center text-center justify-between relative overflow-hidden transition-all shadow-sm group cursor-default"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mb-3 group-hover:scale-110 transition-transform duration-200 mx-auto">
                  <CheckCircle2 size={16} strokeWidth={2.2} />
                </div>

                <div className="w-full flex flex-col items-center text-center">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight leading-none text-center tabular-nums font-mono">
                    {masteredTasksCount}
                  </div>
                  <div className="mt-1.5 flex flex-col items-center text-center">
                    <span className="text-xs sm:text-sm font-medium text-text-secondary leading-tight text-center">
                      Ukończone zadania
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-text-muted font-normal mt-0.5 truncate text-center">
                      W wybranym programie
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* KARTA 2: SKUTECZNOŚĆ & BANK BŁĘDÓW */}
              <motion.div 
                role={onOpenMistakesBank ? "button" : undefined}
                tabIndex={onOpenMistakesBank ? 0 : undefined}
                onClick={() => {
                  if (onOpenMistakesBank) {
                    triggerHaptic('light');
                    onOpenMistakesBank();
                  }
                }}
                onKeyDown={(e) => {
                  if (onOpenMistakesBank && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onOpenMistakesBank();
                  }
                }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`bg-surface-card hover:bg-surface-card-hover border rounded-2xl p-4 flex flex-col items-center text-center justify-between relative overflow-hidden transition-all shadow-sm group select-none ${
                  onOpenMistakesBank ? 'cursor-pointer hover:border-amber-500/40 hover:shadow-md border-surface-border' : 'cursor-default border-surface-border'
                }`}
                title={onOpenMistakesBank ? "Kliknij, aby otworzyć Bank Błędów i sesję rehabilitacyjną" : undefined}
              >
                <div className="absolute top-3.5 right-3.5">
                  {totalMistakes > 0 ? (
                    <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                      <span>{totalMistakes} {totalMistakes === 1 ? 'błąd' : totalMistakes < 5 ? 'błędy' : 'błędów'}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      0 błędów
                    </span>
                  )}
                </div>

                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mb-3 group-hover:scale-110 transition-transform duration-200 mx-auto">
                  <Zap size={16} strokeWidth={2.2} />
                </div>

                <div className="w-full flex flex-col items-center text-center">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight leading-none text-center tabular-nums font-mono">
                    {accuracyPercent}%
                  </div>
                  <div className="mt-1.5 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center gap-1 text-center">
                      <span className="text-xs sm:text-sm font-medium text-text-secondary leading-tight text-center">
                        Skuteczność
                      </span>
                      {onOpenMistakesBank && totalMistakes > 0 && (
                        <span className="text-[10px] text-amber-400 font-bold group-hover:underline">
                          →
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-text-muted font-normal mt-0.5 truncate text-center">
                      {totalMistakes > 0 ? `${totalMistakes} do powtórki` : '0 błędów'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* KARTA 3: CZAS NAUKI */}
              <motion.div 
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-amber-500/25 rounded-2xl p-4 flex flex-col items-center text-center justify-between relative overflow-hidden transition-all shadow-sm group cursor-default"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mb-3 group-hover:scale-110 transition-transform duration-200 mx-auto">
                  <Clock size={16} strokeWidth={2.2} />
                </div>

                <div className="w-full flex flex-col items-center text-center">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight leading-none whitespace-nowrap text-center tabular-nums font-mono">
                    {studyTimeValue} <span className="text-xs sm:text-sm font-medium text-text-muted font-sans">{studyTimeUnit}</span>
                  </div>
                  <div className="mt-1.5 flex flex-col items-center text-center">
                    <span className="text-xs sm:text-sm font-medium text-text-secondary leading-tight text-center">
                      Czas nauki
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-text-muted font-normal mt-0.5 truncate text-center">
                      W tym tygodniu
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* PRAWA KOLUMNA: SERIA DNI (STREAK) + SZYBKIE NARZĘDZIA */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
          
          {/* WIDGET SERII (STREAK) NA DESKTOPIE */}
          <div className="hidden lg:block">
            {renderStreakWidget()}
          </div>

          {/* SZYBKIE AKCJE AI & DIAGNOSTYKA */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 px-0.5">
              <Cpu size={14} className="text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Narzędzia Egzaminacyjne
              </h3>
            </div>

            {onOpenDiagnostic && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  onOpenDiagnostic();
                }}
                className="p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 transition-all flex items-center justify-between text-left group shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Target size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">
                        Test Poziomu
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                        CKE
                      </span>
                    </div>
                    <p className="text-xs font-bold text-text-primary truncate mt-0.5">
                      Oceń poziom i skalibruj predyktor
                    </p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-text-muted group-hover:text-primary shrink-0 group-hover:translate-x-1 transition-all" />
              </button>
            )}

            {onOpenAiGenerator && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  onOpenAiGenerator();
                }}
                className="p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-purple-500/40 transition-all flex items-center justify-between text-left group shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Cpu size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-purple-300 uppercase tracking-wider">
                        Generator Zadań AI
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        Model CKE
                      </span>
                    </div>
                    <p className="text-xs font-bold text-text-primary truncate mt-0.5">
                      Nowe zadania z kluczem CKE
                    </p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-text-muted group-hover:text-purple-400 shrink-0 group-hover:translate-x-1 transition-all" />
              </button>
            )}

            {onOpenMistakesBank && totalMistakes > 0 && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  onOpenMistakesBank();
                }}
                className="p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 transition-all flex items-center justify-between text-left group shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Zap size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider">
                        Bank Błędów
                      </span>
                      <span className="text-[10px] font-extrabold text-primary bg-primary/15 border border-primary/30 px-1.5 py-0.5 rounded-full">
                        {totalMistakes} do powtórki
                      </span>
                    </div>
                    <p className="text-xs font-bold text-text-primary truncate mt-0.5">
                      Rozpocznij sesję rehabilitacji
                    </p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-text-muted group-hover:text-primary shrink-0 group-hover:translate-x-1 transition-all" />
              </button>
            )}
          </div>
        </div>

      </div>

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

      {/* Skarbiec Argumentów Modal */}
      <ArgumentVaultModal
        isOpen={isArgumentVaultOpen}
        onClose={() => setIsArgumentVaultOpen(false)}
      />

      {/* Centrum Egzaminacyjne CKE Modal */}
      <ExamHubModal
        isOpen={isExamHubOpen}
        onClose={() => setIsExamHubOpen(false)}
        onSelectMode={(mode) => onNavigate?.('simulator', mode)}
        selectedSubjectKey={selectedSubjectKey}
      />
    </div>
  );
}

