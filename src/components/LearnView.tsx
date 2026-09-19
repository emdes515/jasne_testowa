import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  BookOpen, Calculator, Globe, FlaskConical, ChevronRight, ChevronLeft, ChevronDown,
  Lock, BookText, Zap, PenTool, Award, Dna, ArrowRight, CheckCircle2, Check,
  Layers, Play, Target, RefreshCw, X, Loader2,
  Hash, Binary, EqualNot, TrendingUp, Activity, 
  ListOrdered, TriangleRight, CircleDot, Map as MapIcon, Box, PieChart, Clock, Trophy,
  GraduationCap, MessageSquare, Flame, Feather, ShieldAlert, Sun, Moon, Scale, Shield,
  Bookmark, Music, AlertTriangle, Eye, Compass, GitCommit, AlertOctagon
} from 'lucide-react';
import { triggerHaptic } from '../utils';
import { motion, AnimatePresence } from 'motion/react';
import { MathRenderer } from './MathRenderer';
import { drawSessionTasks, getLessonFormulaSheet, loadTopicBossExam } from '../data/dzial1TaskPool';
import { curriculumRepository } from '../services/curriculumRepository';
import { BossExamRunner } from './BossExamRunner';
import { SubjectKey } from '../types';
import { normalizeSubjectFirestoreId } from '../services/ckeCatalogRepository';
import { POLISH_SHOWCASE_LESSONS, PolishLessonShowcase } from '../data/polishVerticalSliceData';
import { findCanonicalLektura, getLekturaByTopic } from '../data/polishLekturyData';
import { ArgumentVaultModal } from './polish/ArgumentVaultModal';
import { PolishHeroContinue } from './polish/PolishHeroContinue';
import { PolishEpochPassportModal } from './polish/PolishEpochPassportModal';
import { argumentVaultService } from '../services/argumentVaultService';


const mathIcons = [
  Hash, 
  Binary, 
  EqualNot, 
  Layers, 
  TrendingUp, 
  Activity, 
  Target, 
  ListOrdered, 
  TriangleRight, 
  CircleDot, 
  MapIcon, 
  Box, 
  PieChart, 
  Clock, 
  Trophy
];

const polishIconMap: Record<string, any> = {
  MessageSquare,
  BookOpen,
  PenTool,
  ShieldAlert,
  Scale,
  Flame,
  Feather,
  Sun,
  Moon,
  Bookmark,
  Shield,
  Music,
  AlertTriangle,
  Eye,
  Compass,
  GitCommit,
  AlertOctagon,
  Trophy,
  Layers,
  GraduationCap
};

function getTopicIcon(subjectKey: string, topicIndex: number, DefaultIcon: any, topic?: any) {
  if (topic?.icon && polishIconMap[topic.icon]) {
    return polishIconMap[topic.icon];
  }
  if (subjectKey === 'math' && topicIndex < mathIcons.length) {
    return mathIcons[topicIndex];
  }
  if (subjectKey === 'pol') {
    return BookOpen;
  }
  return DefaultIcon;
}

/**
 * Polskie reguły gramatyczne liczebników dla lekcji:
 * 1 lekcja, 2-4 lekcje, 5-21 lekcji, 22-24 lekcje itd.
 */
export function formatLessonsCount(count: number): string {
  if (count === 1) return '1 lekcja';
  const rem10 = count % 10;
  const rem100 = count % 100;
  if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 >= 20)) {
    return `${count} lekcje`;
  }
  return `${count} lekcji`;
}

export function formatLessonsNoun(count: number): string {
  if (count === 1) return 'lekcja';
  const rem10 = count % 10;
  const rem100 = count % 100;
  if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 >= 20)) {
    return 'lekcje';
  }
  return 'lekcji';
}

/**
 * Spójny, designerski wskaźnik stanu aktywnego (W TOKU / AKTUALNA LEKCJA).
 * Oparty na zasadach ergonomii wizualnej (Cognitive Load Theory) oraz subtelnej mikrointerakcji:
 * Stały, czytelny punkt odniesienia + łagodna fala sonaru o 2.5s interwale.
 */
export function ActiveBadge({ label = 'W TOKU', isRose = false }: { label?: string; isRose?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full select-none ${
      isRose
        ? 'text-[#F43F5E] bg-[#F43F5E]/10 border border-[#F43F5E]/30 shadow-sm'
        : 'text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/30 shadow-sm'
    }`}>
      <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 [animation-duration:2.5s] ${
          isRose ? 'bg-[#F43F5E]' : 'bg-[#FFB800]'
        }`} />
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
          isRose ? 'bg-[#F43F5E]' : 'bg-[#FFB800]'
        }`} />
      </span>
      <span>{label}</span>
    </span>
  );
}

import {
  type LessonGroup,
  cleanLessonTitle,
  formatLessonDuration,
  isTaskCompletedInLesson,
  isLessonCompleted,
  isLessonUnlocked,
  getLockRequirementLabel,
  getLessonsForTopic
} from '../utils/lessonGrouping';

export {
  type LessonGroup,
  cleanLessonTitle,
  formatLessonDuration,
  isTaskCompletedInLesson,
  isLessonCompleted,
  isLessonUnlocked,
  getLockRequirementLabel,
  getLessonsForTopic
};

function cleanTopicTitle(text: string): string {
  if (!text) return '';
  return text
    .replace(/^Dział\s+\d+:\s*/i, '')
    .replace(/\s*\(Poziom\s+Podstawowy\)/gi, '')
    .replace(/\s*\(Formuła\s+2023\)/gi, '')
    .trim();
}

// Treści (działy, filary, zadania) pochodzą WYŁĄCZNIE z Cloud Firestore.
// Bundle aplikacji nie zawiera żadnego kurikulum.

const initialDataBySubject: Record<string, any> = {
  math: {
    key: 'math',
    name: 'Matematyka',
    shortName: 'Matematyka',
    level: 'Nowa Formuła 2023',
    icon: Calculator,
    color: 'text-blue-400',
    accentColor: '#FFB800',
    topics: []
  },
  pol: {
    key: 'pol',
    name: 'Język Polski',
    shortName: 'J. Polski',
    level: 'Nowa Formuła 2023',
    icon: BookOpen,
    color: 'text-rose-400',
    accentColor: '#F43F5E',
    topics: [],
    pillars: []
  },
  eng: {
    key: 'eng',
    name: 'Język Angielski',
    shortName: 'Angielski',
    level: 'Podstawa • B1/B2',
    icon: Globe,
    color: 'text-emerald-400',
    accentColor: '#10B981',
    topics: []
  },
  'math-roz': {
    key: 'math-roz',
    name: 'Matematyka Rozszerzona',
    shortName: 'Matematyka Roz.',
    level: 'Rozszerzenie • 2023',
    icon: Calculator,
    color: 'text-sky-400',
    accentColor: '#38BDF8',
    topics: []
  },
  'eng-roz': {
    key: 'eng-roz',
    name: 'Język Angielski Rozszerzony',
    shortName: 'Angielski Roz.',
    level: 'Rozszerzenie • B2/C1',
    icon: Globe,
    color: 'text-purple-400',
    accentColor: '#A855F7',
    topics: []
  }
};

type ViewState = 'subjects' | 'topics' | 'lessons' | 'tasks';

interface LearnViewProps {
  userState?: any;
  completedTasks?: string[];
  taskStars?: Record<string, number>;
  lessonMistakes?: Record<string, number>;
  selectedSubjectKey?: SubjectKey;
  onSelectSubject?: (key: SubjectKey) => void;
  onStartTask?: (task: any, lessonTasks?: any[], lessonTitle?: string, nextLesson?: any) => void;
  onCompleteTask?: (taskIds?: string | string[], stars?: number, earnedXp?: number, earnedCoins?: number, nextLesson?: any, sessionDurationSeconds?: number) => void;
  isGuest?: boolean;
  onLoginRequest?: () => void;
  onProRequest?: () => void;
  onBackToDashboard?: () => void;
  onSheetToggle?: (isOpen: boolean) => void;
}

export function LearnView({ 
  userState,
  onStartTask, 
  onCompleteTask,
  isGuest, 
  onBackToDashboard,
  completedTasks = [],
  taskStars = {},
  lessonMistakes = {},
  selectedSubjectKey: propSubjectKey,
  onSelectSubject,
  onSheetToggle
}: LearnViewProps) {
  const [isBossExamOpen, setIsBossExamOpen] = useState<boolean>(false);
  const [bossExamData, setBossExamData] = useState<any>(null);
  const [isBossExamLoading, setIsBossExamLoading] = useState<boolean>(false);
  const [isArgumentVaultOpen, setIsArgumentVaultOpen] = useState<boolean>(false);

  const handleStartPolishShowcase = (showcase: PolishLessonShowcase) => {
    triggerHaptic('medium');
    const sessionPayload = {
      isSession: true,
      isPolish: true,
      subjectId: 'jezyk-polski',
      topicId: 'pol-showcase',
      lessonId: showcase.id,
      lessonTitle: `${showcase.badge}: ${showcase.title}`,
      tasks: showcase.tasks,
      formulaSheet: null,
      theoryPill: showcase.theoryPill,
      required_correct_tasks: showcase.tasks.length,
      estimated_time_formatted: showcase.estimatedTime
    };

    onStartTask?.(sessionPayload, showcase.tasks, showcase.title);
  };


  const getLessonMistakes = (lessonGroupId: string) => {
    if (lessonMistakes && lessonMistakes[lessonGroupId] !== undefined) {
      return lessonMistakes[lessonGroupId];
    }
    const cleanId = lessonGroupId.replace('lesson-', '').replace('-', '.');
    if (lessonMistakes && lessonMistakes[cleanId] !== undefined) {
      return lessonMistakes[cleanId];
    }
    try {
      const raw = localStorage.getItem('matura_quest_lesson_mistakes');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed[lessonGroupId] !== undefined) return parsed[lessonGroupId];
        if (parsed[cleanId] !== undefined) return parsed[cleanId];
      }
    } catch (e) {}
    return 0;
  };

  // Subject selection (math, pol, eng, math-roz, eng-roz)
  const [internalSubjectKey, setInternalSubjectKey] = useState<SubjectKey>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_selected_subject');
      if (stored && ['math', 'pol', 'eng', 'math-roz', 'eng-roz'].includes(stored)) return stored as SubjectKey;
    } catch(e) {}
    return 'math';
  });

  const selectedSubjectKey = (propSubjectKey || internalSubjectKey) as SubjectKey;

  // Identyfikator przedmiotu w Firestore — jedno źródło prawdy dla odczytów treści.
  const subjectFirestoreId = normalizeSubjectFirestoreId(selectedSubjectKey);

  const setSelectedSubjectKey = (key: SubjectKey) => {
    setInternalSubjectKey(key);
    if (onSelectSubject) {
      onSelectSubject(key);
    }
  };

  // Screen view state
  const [viewState, setViewState] = useState<ViewState>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_last_viewed');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.viewState === 'lessons' || parsed.viewState === 'topics') {
          return parsed.viewState;
        }
      }
    } catch(e) {}
    return 'topics';
  });

  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number | null>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_last_viewed');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.topicIndex !== undefined && parsed.topicIndex !== null) return parsed.topicIndex;
      }
    } catch(e) {}
    return 0;
  });

  // Smart Accordion single expanded lesson
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  // Subject Switcher Bottom Sheet / Desktop Modal
  const [isSubjectSheetOpen, setIsSubjectSheetOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() => 
    typeof window !== 'undefined' ? window.innerWidth >= 768 : false
  );

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openSubjectSheet = (open: boolean) => {
    setIsSubjectSheetOpen(open);
    onSheetToggle?.(open);
  };

  useEffect(() => {
    if (!isSubjectSheetOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') openSubjectSheet(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSubjectSheetOpen]);

  // Locked lesson notification snackbar
  const [showLockedToast, setShowLockedToast] = useState<boolean>(false);
  const [lockedToastMessage, setLockedToastMessage] = useState<string>('');
  const toastTimeoutRef = useRef<any>(null);

  // =========================================================================
  // LAZY LOADING DLA LIST DZIAŁÓW (TROPHY ROAD WINDOWING & INTERSECTION OBSERVER)
  // Stopniowo renderuje działy partiami (batch), aby odciążyć DOM i wątek renderowania,
  // zachowując natychmiastową dostępność aktywnego działu użytkownika.
  // =========================================================================
  const TOPICS_BATCH_SIZE = 6;
  const [visibleTopicsCount, setVisibleTopicsCount] = useState<number>(TOPICS_BATCH_SIZE);
  const [isLoadingMoreTopics, setIsLoadingMoreTopics] = useState<boolean>(false);
  const topicSentinelRef = useRef<HTMLDivElement | null>(null);

  // Persist selections
  useEffect(() => {
    localStorage.setItem('matura_quest_selected_subject', selectedSubjectKey);
    localStorage.setItem('matura_quest_last_viewed', JSON.stringify({
      viewState,
      subjectKey: selectedSubjectKey,
      topicIndex: selectedTopicIndex
    }));
  }, [viewState, selectedSubjectKey, selectedTopicIndex]);

  const [mathTopicsList, setMathTopicsList] = useState<any[]>([]);
  const [polishTopicsList, setPolishTopicsList] = useState<any[]>([]);
  const [polishPillarsList, setPolishPillarsList] = useState<any[]>([]);
  const [engTopicsList, setEngTopicsList] = useState<any[]>([]);
  const [mathRozTopicsList, setMathRozTopicsList] = useState<any[]>([]);
  const [engRozTopicsList, setEngRozTopicsList] = useState<any[]>([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState<boolean>(true);
  const [topicsLoadError, setTopicsLoadError] = useState<string | null>(null);
  const [selectedPillarId, setSelectedPillarId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_selected_polish_pillar');
      if (stored && (stored === 'pillar-1-jezyk-w-uzyciu' || stored === 'pillar-2-lektury' || stored === 'pillar-3-wypracowanie')) {
        return stored;
      }
    } catch(e) {}
    return 'pillar-1-jezyk-w-uzyciu';
  });
  const [passportEpochId, setPassportEpochId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSubjectKey === 'pol') {
      try {
        localStorage.setItem('matura_quest_selected_polish_pillar', selectedPillarId);
      } catch(e) {}
    }
  }, [selectedPillarId, selectedSubjectKey]);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingTopics(true);
    setTopicsLoadError(null);

    const loadCurriculum = async () => {
      try {
        const [mathLoaded, polishLoaded, pillars, engLoaded, mathRozLoaded, engRozLoaded] = await Promise.all([
          curriculumRepository.getTopics('matematyka-podstawowa'),
          curriculumRepository.getTopics('jezyk-polski'),
          curriculumRepository.getSubjectPillars('jezyk-polski'),
          curriculumRepository.getTopics('jezyk-angielski'),
          curriculumRepository.getTopics('matematyka-rozszerzona'),
          curriculumRepository.getTopics('jezyk-angielski-rozszerzony')
        ]);

        if (!isMounted) return;

        const polishTopicsFiltered = (polishLoaded || [])
          .filter((t: any) => {
            const num = typeof t.numericId === 'number' ? t.numericId : parseInt(String(t.id).replace(/\D/g, '') || '1', 10);
            return num >= 1 && num <= 20;
          })
          .sort((a: any, b: any) => (a.numericId || 0) - (b.numericId || 0));

        setMathTopicsList(mathLoaded || []);
        setPolishTopicsList(polishTopicsFiltered);
        setPolishPillarsList(Array.isArray(pillars) ? pillars : []);
        setEngTopicsList(engLoaded || []);
        setMathRozTopicsList(mathRozLoaded || []);
        setEngRozTopicsList(engRozLoaded || []);

        if ((mathLoaded || []).length === 0 && polishTopicsFiltered.length === 0 && (engLoaded || []).length === 0) {
          setTopicsLoadError('Nie udało się wczytać programu nauczania. Sprawdź połączenie z internetem i spróbuj ponownie.');
        }
      } catch (err) {
        console.warn('[LearnView] Could not load curriculum from Firestore:', err);
        if (isMounted) {
          setTopicsLoadError('Nie udało się wczytać programu nauczania z chmury.');
        }
      } finally {
        if (isMounted) setIsLoadingTopics(false);
      }
    };

    void loadCurriculum();
    return () => { isMounted = false; };
  }, []);

  const dataBySubject: Record<string, any> = {
    ...initialDataBySubject,
    math: {
      ...initialDataBySubject.math,
      topics: mathTopicsList
    },
    pol: {
      ...initialDataBySubject.pol,
      topics: polishTopicsList,
      pillars: polishPillarsList
    },
    eng: {
      ...initialDataBySubject.eng,
      topics: engTopicsList
    },
    'math-roz': {
      ...initialDataBySubject['math-roz'],
      topics: mathRozTopicsList
    },
    'eng-roz': {
      ...initialDataBySubject['eng-roz'],
      topics: engRozTopicsList
    }
  };

  const currentSubject = dataBySubject[selectedSubjectKey] || dataBySubject['math'];
  const currentTopic = (currentSubject && selectedTopicIndex !== null && currentSubject.topics[selectedTopicIndex]) 
    ? currentSubject.topics[selectedTopicIndex] 
    : (currentSubject?.topics?.[0] || null);

  const lessonsForCurrentTopic = currentTopic ? getLessonsForTopic(currentTopic) : [];

  // Aktualizuj lub resetuj liczbę widocznych działów przy zmianie przedmiotu lub wybranego działu
  useEffect(() => {
    const total = currentSubject?.topics?.length || 0;
    if (total === 0) {
      setVisibleTopicsCount(0);
      return;
    }
    // Wyznacz indeks bieżącego aktywnego działu (pierwszy nieukończony dział)
    const activeTopicIdx = currentSubject.topics.findIndex((t: any) => {
      const lessons = getLessonsForTopic(t);
      if (lessons.length > 0) {
        return !lessons.every((l: any) => isLessonCompleted(l, completedTasks, userState));
      }
      const tasks = t.tasks || [];
      return tasks.length === 0 || !tasks.every((tsk: any) => completedTasks.includes(tsk.id));
    });
    const beaconIdx = activeTopicIdx !== -1 ? activeTopicIdx : 0;
    const targetIdx = Math.max(beaconIdx, selectedTopicIndex ?? 0);
    // Zapewnij, że aktywny dział i jego sąsiedzi są od razu widoczni
    const initialBatch = Math.min(total, Math.max(TOPICS_BATCH_SIZE, targetIdx + 2));
    setVisibleTopicsCount((prev) => Math.max(initialBatch, Math.min(prev, total)));
  }, [selectedSubjectKey, currentSubject?.topics?.length, selectedTopicIndex, completedTasks.length]);

  // Intersection Observer dla automatycznego płynnego doczytywania kolejnych partii
  useEffect(() => {
    if (viewState !== 'topics' && viewState !== 'subjects') return;

    const sentinel = topicSentinelRef.current;
    if (!sentinel) return;

    const totalTopics = currentSubject?.topics?.length || 0;
    if (visibleTopicsCount >= totalTopics) return;

    const scrollContainer = typeof document !== 'undefined' ? document.getElementById('main-scroll-container') : null;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setIsLoadingMoreTopics(true);
          // Krótki interwał asynchroniczny zapobiegający blokowaniu klatki animacji
          const timer = setTimeout(() => {
            setVisibleTopicsCount((prev) => Math.min(totalTopics, prev + TOPICS_BATCH_SIZE));
            setIsLoadingMoreTopics(false);
          }, 80);
          return () => clearTimeout(timer);
        }
      },
      {
        root: scrollContainer || null,
        rootMargin: '240px',
        threshold: 0.05
      }
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, [viewState, visibleTopicsCount, currentSubject?.topics?.length]);

  // =========================================================================
  // AUTO-FOCUS & AUTO-EXPAND ON ENTERING LESSONS VIEW
  // Finds the first unlocked lesson that is not yet 100% completed,
  // expands it for convenience.
  // =========================================================================
  useEffect(() => {
    if (viewState === 'lessons' && lessonsForCurrentTopic.length > 0) {
      // Find the first unlocked, incomplete lesson
      const activeLesson = lessonsForCurrentTopic.find((group, idx) => {
        const unlocked = isLessonUnlocked(idx, lessonsForCurrentTopic, completedTasks, userState);
        const completed = isLessonCompleted(group, completedTasks, userState);
        return unlocked && !completed;
      }) || lessonsForCurrentTopic[0];

      if (activeLesson) {
        setExpandedLessonId(activeLesson.id);
      }
    }
  }, [viewState, selectedTopicIndex, lessonsForCurrentTopic.length]);

  // Overall math progress calculation
  const totalMathTasks = mathTopicsList.reduce((acc, t) => acc + (t.lessons_metadata?.reduce((sum: number, l: any) => sum + (l.tasks_count || 0), 0) || 0), 0);
  const completedMathTasks = mathTopicsList.reduce((acc, t) => acc + (t.tasks || []).filter((tsk: any) => completedTasks.includes(tsk.id)).length, 0);
  const mathProgressPercent = totalMathTasks > 0 ? Math.round((completedMathTasks / totalMathTasks) * 100) : 0;

  // Polish progress calculation
  const totalPolLessons = polishTopicsList.reduce((acc, t) => acc + (getLessonsForTopic(t).length || 0), 0);
  const completedPolLessons = polishTopicsList.reduce((acc, t) => {
    return acc + getLessonsForTopic(t).filter(l => isLessonCompleted(l, completedTasks, userState)).length;
  }, 0);
  const polProgressPercent = totalPolLessons > 0 ? Math.round((completedPolLessons / totalPolLessons) * 100) : 0;

  // English basic progress calculation
  const totalEngLessons = engTopicsList.reduce((acc, t) => acc + (getLessonsForTopic(t).length || 0), 0);
  const completedEngLessons = engTopicsList.reduce((acc, t) => {
    return acc + getLessonsForTopic(t).filter(l => isLessonCompleted(l, completedTasks, userState)).length;
  }, 0);
  const engProgressPercent = totalEngLessons > 0 ? Math.round((completedEngLessons / totalEngLessons) * 100) : 0;

  // Math extended progress calculation
  const totalMathRozLessons = mathRozTopicsList.reduce((acc, t) => acc + (getLessonsForTopic(t).length || 0), 0);
  const completedMathRozLessons = mathRozTopicsList.reduce((acc, t) => {
    return acc + getLessonsForTopic(t).filter(l => isLessonCompleted(l, completedTasks, userState)).length;
  }, 0);
  const mathRozProgressPercent = totalMathRozLessons > 0 ? Math.round((completedMathRozLessons / totalMathRozLessons) * 100) : 0;

  // English extended progress calculation
  const totalEngRozLessons = engRozTopicsList.reduce((acc, t) => acc + (getLessonsForTopic(t).length || 0), 0);
  const completedEngRozLessons = engRozTopicsList.reduce((acc, t) => {
    return acc + getLessonsForTopic(t).filter(l => isLessonCompleted(l, completedTasks, userState)).length;
  }, 0);
  const engRozProgressPercent = totalEngRozLessons > 0 ? Math.round((completedEngRozLessons / totalEngRozLessons) * 100) : 0;

  const handleSelectTopic = (index: number, locked: boolean = false) => {
    if (locked) {
      triggerHaptic('error');
      setLockedToastMessage('Ukończ poprzedni dział, aby odblokować ten materiał');
      setShowLockedToast(true);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => setShowLockedToast(false), 2500);
      return;
    }
    triggerHaptic('light');
    setSelectedTopicIndex(index);
    setViewState('lessons');
    if (typeof document !== 'undefined') {
      const mainContainer = document.getElementById('main-scroll-container');
      if (mainContainer) {
        mainContainer.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  const handleBack = () => {
    triggerHaptic('light');
    if (viewState === 'lessons') {
      setViewState('topics');
      if (typeof document !== 'undefined') {
        setTimeout(() => {
          const el = document.getElementById(`topic-card-${selectedTopicIndex}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 50);
      }
    } else if (viewState === 'topics') {
      // Per prompt requirement: Clicking < in topics screen opens the Subject Switcher Bottom Sheet
      openSubjectSheet(true);
    }
  };

  const handleLessonHeaderClick = (group: LessonGroup, isUnlocked: boolean) => {
    if (!isUnlocked) {
      triggerHaptic('error');
      setLockedToastMessage('Ukończ poprzednią lekcję, aby odblokować ten materiał');
      setShowLockedToast(true);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => setShowLockedToast(false), 2500);
      return;
    }

    triggerHaptic('light');
    // Smart Accordion: Clicking current closes it; clicking another closes previous and opens current
    setExpandedLessonId(prev => prev === group.id ? null : group.id);
  };

  const handleStartLessonSession = async (group: LessonGroup, nextLessonPayload?: any, explicitTopicId?: string) => {
    triggerHaptic('medium');
    const topicId = explicitTopicId || currentTopic?.id || 'dzial-1';
    // Flat-Bundle: 1 single document read for full theory_pill + tasks (0 reads if cached)
    const lessonDoc = await curriculumRepository.getLesson(topicId, group.id, subjectFirestoreId);
    const tasks = (lessonDoc?.tasks && lessonDoc.tasks.length > 0) ? lessonDoc.tasks : group.tasks;
    const lessonFormulaSheet = lessonDoc?.formula_sheet || lessonDoc?.formulaSheet;
    const poolResult = drawSessionTasks(group.id, tasks, lessonFormulaSheet);
    const tasksToRun = (poolResult.sessionTasks && poolResult.sessionTasks.length > 0)
      ? poolResult.sessionTasks
      : tasks;

    const cleanName = cleanLessonTitle(group.name);
    const isSprawdzian = group.badge.toLowerCase().includes('sprawdzian') || cleanName.toLowerCase().includes('sprawdzian');
    const fullLessonTitle = isSprawdzian
      ? (cleanName.toLowerCase().includes('sprawdzian') ? cleanName : `${group.badge}: ${cleanName}`)
      : `${group.badge}: ${cleanName}`;

    const sessionPayload = {
      isSession: true,
      isPolish: selectedSubjectKey === 'pol',
      subjectId: subjectFirestoreId,
      topicId: topicId,
      lessonId: group.id,
      lessonTitle: fullLessonTitle,
      tasks: tasksToRun,
      formulaSheet: lessonFormulaSheet || poolResult.formulaSheet || (selectedSubjectKey === 'pol' ? ((lessonDoc as any)?.formulaSheet || (lessonDoc as any)?.leksykon || null) : getLessonFormulaSheet(group.id)),
      theoryPill: lessonDoc?.theory_pill || poolResult.theoryPill,
      nextLesson: nextLessonPayload,
      allTaskIdsToMarkCompleted: tasks.map((t: any) => t.id),
      required_correct_tasks: group.required_correct_tasks || poolResult.required_correct_tasks || 3,
      estimated_time_formatted: group.estimated_time_formatted || poolResult.estimated_time_formatted
    };

    onStartTask?.(sessionPayload, tasksToRun, fullLessonTitle, nextLessonPayload);
  };

  const handleStartPolishDailyLesson = async (topicId: string, lessonId: string) => {
    triggerHaptic('medium');
    const lessonDoc = await curriculumRepository.ensureLessonLoaded(lessonId, topicId, 'jezyk-polski');
    if (lessonDoc) {
      const topicIdx = (currentSubject?.topics || []).findIndex((t: any) => t.id === topicId || t.numericId === parseInt(topicId.replace(/\D/g, ''), 10));
      if (topicIdx !== -1) setSelectedTopicIndex(topicIdx);
      const group: LessonGroup = {
        id: lessonDoc.id,
        name: lessonDoc.title,
        badge: 'Lekcja',
        tasks: lessonDoc.tasks || [],
        estimated_time_formatted: lessonDoc.estimated_time_formatted || '~5 min'
      };
      handleStartLessonSession(group, undefined, topicId);
    }
  };

  return (
    <div 
      id="learn-scroll-content"
      className="flex flex-col min-h-full max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto w-full overflow-x-hidden relative pb-32 md:pb-12"
      style={{ 
        WebkitOverflowScrolling: 'touch'
      }}
    >
      
      {/* =========================================================================
          GLOBAL SNACKBAR / TOAST DLA ZABLOKOWANYCH LEKCJI
         ========================================================================= */}
      <AnimatePresence>
        {showLockedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#141A23]/95 backdrop-blur-md border border-amber-500/40 text-amber-300 font-semibold text-xs sm:text-sm shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2.5 pointer-events-none max-w-[90vw]"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Lock size={13} />
            </div>
            <span>{lockedToastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {/* =========================================================================
            SCREEN 1: ŚCIEŻKA DZIAŁÓW (TROPHY ROAD)
            Działa dla Matematyki oraz Języka Polskiego.
           ========================================================================= */}
        {(viewState === 'topics' || viewState === 'subjects') && currentSubject && (() => {
          const allSubjectTopics = currentSubject.topics || [];
          // Ochrona przed duplikowaniem działów na liście (np. topic-1 i dzial-1)
          const seenTopicNums = new Set<number>();
          const dedupedTopics = allSubjectTopics.filter((t: any, idx: number) => {
            const num = t.numericId || (idx + 1);
            if (seenTopicNums.has(num)) return false;
            seenTopicNums.add(num);
            return true;
          });
          const topicsMatchingFilter = (selectedSubjectKey === 'pol' && selectedPillarId !== 'all')
            ? dedupedTopics.filter((t: any) => t.pillar_id === selectedPillarId)
            : dedupedTopics;

          const completedTopicsCount = topicsMatchingFilter.filter((t: any) => {
            const lessons = getLessonsForTopic(t);
            if (lessons.length > 0) {
              return lessons.every((l: any) => isLessonCompleted(l, completedTasks, userState));
            }
            const tasks = t.tasks || [];
            return tasks.length > 0 && tasks.every((tsk: any) => completedTasks.includes(tsk.id));
          }).length;
          const totalTopicsCount = topicsMatchingFilter.length;

          // Find active topic index: pierwszy nieukończony dział
          const activeTopicIdx = topicsMatchingFilter.findIndex((t: any) => {
            const lessons = getLessonsForTopic(t);
            if (lessons.length > 0) {
              return !lessons.every((l: any) => isLessonCompleted(l, completedTasks, userState));
            }
            const tasks = t.tasks || [];
            return tasks.length === 0 || !tasks.every((tsk: any) => completedTasks.includes(tsk.id));
          });
          const currentActiveIdx = activeTopicIdx !== -1 ? activeTopicIdx : 0;
          const visibleTopics = topicsMatchingFilter.slice(0, visibleTopicsCount);
          const hasMoreTopics = visibleTopicsCount < topicsMatchingFilter.length;

          return (
            <motion.div 
              key={`topics-${selectedSubjectKey}-${selectedPillarId}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col w-full"
            >
              {/* Sub-header wyboru przedmiotu i postępu działów */}
              <header className="px-3 sm:px-6 py-2.5 sticky top-0 bg-surface-bg/90 backdrop-blur-xl z-20 border-b border-surface-border shadow-sm shrink-0">
                <div className="max-w-3xl mx-auto w-full flex items-center justify-between gap-2.5">
                  <button
                    id="learn-subject-switcher-trigger"
                    onClick={() => {
                      triggerHaptic('light');
                      openSubjectSheet(true);
                    }}
                    className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 transition-all cursor-pointer group active:scale-[0.98] shadow-sm min-w-0"
                    title="Kliknij, aby zmienić przedmiot"
                  >
                    <h1 className="font-display font-black text-text-primary text-sm sm:text-base tracking-tight leading-none group-hover:text-primary transition-colors shrink-0 whitespace-nowrap">
                      {currentSubject.name}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/25 shrink-0">
                      {currentSubject.key === 'math' 
                        ? 'Formuła 2023' 
                        : currentSubject.key === 'eng' 
                          ? 'Podstawa • B1/B2' 
                          : currentSubject.key === 'eng-roz' 
                            ? 'Rozszerzenie • B2/C1'
                            : (currentSubject.level || 'Formuła 2023')}
                    </span>
                    <ChevronDown size={13} className="text-text-muted group-hover:text-primary transition-colors shrink-0" />
                  </button>

                  <div className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-surface-card border border-surface-border text-[11px] font-bold text-text-muted whitespace-nowrap shadow-sm">
                    <span className="text-emerald-400 font-black">{completedTopicsCount}/{totalTopicsCount}</span>
                    <span>{selectedSubjectKey === 'pol' ? (selectedPillarId === 'pillar-2-lektury' ? 'epok' : selectedPillarId === 'pillar-3-wypracowanie' ? 'modułów' : 'działów') : 'działów'}</span>
                  </div>
                </div>
              </header>

              {/* Stany ładowania / błędu — treści pobieramy wyłącznie z Firestore */}
              {isLoadingTopics && currentSubject.topics.length === 0 && (
                <div className="px-3 sm:px-6 pt-3">
                  <div className="max-w-3xl mx-auto w-full space-y-2.5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="h-[76px] rounded-2xl bg-surface-card border border-surface-border animate-pulse" />
                    ))}
                  </div>
                </div>
              )}

              {!isLoadingTopics && topicsLoadError && currentSubject.topics.length === 0 && (
                <div className="px-3 sm:px-6 pt-3">
                  <div className="max-w-3xl mx-auto w-full rounded-2xl border border-amber-500/30 bg-amber-500/5 px-4 py-3.5 flex items-start gap-3">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-amber-200">{topicsLoadError}</p>
                      <button
                        type="button"
                        onClick={() => {
                          triggerHaptic('light');
                          window.location.reload();
                        }}
                        className="mt-2 rounded-lg bg-amber-500/15 px-3 py-1.5 text-[11px] font-bold text-amber-200 active:scale-95"
                      >
                        Spróbuj ponownie
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Polish Hero Continue Card (Język Polski CKE) */}
              {selectedSubjectKey === 'pol' && (
                <div className="px-3 sm:px-6 pt-3 pb-1">
                  <div className="max-w-3xl mx-auto w-full">
                    <PolishHeroContinue 
                      topics={polishTopicsList}
                      completedTasks={completedTasks}
                      userState={userState}
                      onStartLesson={handleStartPolishDailyLesson}
                    />
                  </div>
                </div>
              )}

              {/* Pillar Switcher Segmented Control (Język Polski: Filar I vs Filar II vs Filar III) */}
              {selectedSubjectKey === 'pol' && (
                <div className="px-3 sm:px-6 py-2 sticky top-[49px] bg-surface-bg/95 backdrop-blur-xl z-19 border-b border-surface-border shadow-sm">
                  <div className="max-w-3xl mx-auto w-full">
                    <div className="grid grid-cols-3 p-1 rounded-xl bg-[#101726] border border-white/10 relative gap-1">
                      {/* Tab 1: Filar I */}
                      <button
                        onClick={() => {
                          triggerHaptic('light');
                          setSelectedPillarId('pillar-1-jezyk-w-uzyciu');
                          setVisibleTopicsCount(TOPICS_BATCH_SIZE);
                        }}
                        className={`relative z-10 flex items-center justify-center gap-1 sm:gap-2 py-2 px-1 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-bold transition-colors cursor-pointer ${
                          selectedPillarId === 'pillar-1-jezyk-w-uzyciu'
                            ? 'text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {selectedPillarId === 'pillar-1-jezyk-w-uzyciu' && (
                          <motion.div
                            layoutId="activePolishPillarTab"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-rose-500/25 to-rose-600/20 border border-rose-500/40 shadow-sm"
                          />
                        )}
                        <MessageSquare size={13} className={selectedPillarId === 'pillar-1-jezyk-w-uzyciu' ? 'text-rose-400 shrink-0 relative z-10' : 'text-slate-500 shrink-0 relative z-10'} />
                        <span className="truncate relative z-10">Filar I: Język</span>
                        <span className={`hidden md:inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 relative z-10 ${
                          selectedPillarId === 'pillar-1-jezyk-w-uzyciu' ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 text-slate-500'
                        }`}>
                          4 działy
                        </span>
                      </button>

                      {/* Tab 2: Filar II */}
                      <button
                        onClick={() => {
                          triggerHaptic('light');
                          setSelectedPillarId('pillar-2-lektury');
                          setVisibleTopicsCount(TOPICS_BATCH_SIZE);
                        }}
                        className={`relative z-10 flex items-center justify-center gap-1 sm:gap-2 py-2 px-1 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-bold transition-colors cursor-pointer ${
                          selectedPillarId === 'pillar-2-lektury'
                            ? 'text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {selectedPillarId === 'pillar-2-lektury' && (
                          <motion.div
                            layoutId="activePolishPillarTab"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-rose-500/25 to-rose-600/20 border border-rose-500/40 shadow-sm"
                          />
                        )}
                        <BookOpen size={13} className={selectedPillarId === 'pillar-2-lektury' ? 'text-rose-400 shrink-0 relative z-10' : 'text-slate-500 shrink-0 relative z-10'} />
                        <span className="truncate relative z-10">Filar II: Lektury</span>
                        <span className={`hidden md:inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 relative z-10 ${
                          selectedPillarId === 'pillar-2-lektury' ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 text-slate-500'
                        }`}>
                          12 epok
                        </span>
                      </button>

                      {/* Tab 3: Filar III */}
                      <button
                        onClick={() => {
                          triggerHaptic('light');
                          setSelectedPillarId('pillar-3-wypracowanie');
                          setVisibleTopicsCount(TOPICS_BATCH_SIZE);
                        }}
                        className={`relative z-10 flex items-center justify-center gap-1 sm:gap-2 py-2 px-1 sm:px-2.5 rounded-lg text-[11px] sm:text-xs font-bold transition-colors cursor-pointer ${
                          selectedPillarId === 'pillar-3-wypracowanie'
                            ? 'text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {selectedPillarId === 'pillar-3-wypracowanie' && (
                          <motion.div
                            layoutId="activePolishPillarTab"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-rose-500/25 to-rose-600/20 border border-rose-500/40 shadow-sm"
                          />
                        )}
                        <Feather size={13} className={selectedPillarId === 'pillar-3-wypracowanie' ? 'text-rose-400 shrink-0 relative z-10' : 'text-slate-500 shrink-0 relative z-10'} />
                        <span className="truncate relative z-10">Filar III: Wypracowanie</span>
                        <span className={`hidden md:inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 relative z-10 ${
                          selectedPillarId === 'pillar-3-wypracowanie' ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 text-slate-500'
                        }`}>
                          35 pkt
                        </span>
                      </button>
                    </div>

                    {/* Sub-description ribbon for active pillar */}
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400 px-1">
                      <span className="truncate">
                        {selectedPillarId === 'pillar-1-jezyk-w-uzyciu'
                          ? '• Arkusz 1, cz. 1: Język w użyciu i notatka syntetyzująca (10 pkt)'
                          : selectedPillarId === 'pillar-2-lektury'
                            ? '• Arkusz 1, cz. 2: Kanon lektur z gwiazdką i test historycznoliteracki (15 pkt)'
                            : '• Arkusz 2: Warsztat wypracowania maturalnego CKE (35 pkt)'}
                      </span>
                      <span className="text-[10px] text-rose-400 font-semibold shrink-0 ml-2">
                        {selectedPillarId === 'pillar-1-jezyk-w-uzyciu' 
                          ? 'Działy 1–4 • 10 pkt CKE' 
                          : selectedPillarId === 'pillar-2-lektury'
                            ? 'Działy 5–16 • 15 pkt CKE'
                            : 'Działy 17–20 • 35 pkt CKE'}
                      </span>
                    </div>

                    {selectedPillarId === 'pillar-2-lektury' && (
                      <div className="mt-2 flex items-center justify-between p-2.5 rounded-xl bg-[#0e1626] border border-amber-500/30 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span className="truncate">Baza Gotowych Argumentów CKE</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold shrink-0">
                                {argumentVaultService.getUnlockedBlocks().length} / 7 argumentów CKE
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 truncate hidden sm:block">
                              Zaliczaj lekcje kanoniczne <span className="text-amber-300 font-semibold">★ Kanon CKE</span>, aby odblokować gotowe argumenty do wypracowania.
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            triggerHaptic('light');
                            setIsArgumentVaultOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs shrink-0 transition active:scale-95 cursor-pointer"
                        >
                          Otwórz Bazę Argumentów
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Lista Działów z marginesem pod dolną nawigację */}
              <div className="flex-1 px-4 sm:px-6 pt-3 pb-36 sm:pb-40 relative max-w-3xl mx-auto w-full">
                <div className="space-y-3.5 relative z-10">

                  {visibleTopics.map((topic: any, idx: number) => {

                    // Wszystkie działy są od razu odblokowane (brak blokad między działami)
                    const isUnlocked = true;
                    const isLocked = false;

                    const allTopicTasks = topic.tasks || [];
                    const completedTopicTasks = allTopicTasks.filter((t: any) => completedTasks.includes(t.id));
                    const topicLessons = getLessonsForTopic(topic);
                    const topicLessonsCount = topicLessons.length;
                    const completedTopicLessonsCount = topicLessons.filter(l => isLessonCompleted(l, completedTasks, userState)).length;

                    const isFullyCompleted = topicLessonsCount > 0
                      ? (completedTopicLessonsCount === topicLessonsCount)
                      : (allTopicTasks.length > 0 && completedTopicTasks.length === allTopicTasks.length);
                    const isBeaconTopic = (idx === currentActiveIdx) && !isFullyCompleted;

                    const progressPercent = topicLessonsCount > 0 
                      ? Math.round((completedTopicLessonsCount / topicLessonsCount) * 100)
                      : allTopicTasks.length > 0 
                        ? Math.round((completedTopicTasks.length / allTopicTasks.length) * 100) 
                        : 0;

                    const cleanName = cleanTopicTitle(topic.name || topic.title);
                    const topicNum = topic.numericId || (idx + 1);
                    const formattedNumber = String(topicNum).padStart(2, '0');
                    const realTopicIdx = currentSubject.topics.findIndex((t: any) => t.id === topic.id);
                    const TopicIcon = getTopicIcon(selectedSubjectKey, idx, BookOpen, topic);

                    return (
                      <button 
                        key={topic.id || idx}
                        id={`topic-card-${topic.id || idx}`}
                        onClick={() => handleSelectTopic(realTopicIdx !== -1 ? realTopicIdx : idx, isLocked)}
                        style={{
                          contentVisibility: 'auto',
                          containIntrinsicSize: '0 100px'
                        }}
                        className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 group flex flex-col gap-2.5 relative overflow-hidden cursor-pointer active:scale-[0.99] ${
                          isBeaconTopic
                            ? selectedSubjectKey === 'pol'
                              ? 'bg-gradient-to-r from-[#221018] to-[#140C12] border-[#F43F5E] ring-1 ring-[#F43F5E]/30 shadow-[0_4px_24px_rgba(244,63,94,0.18)]'
                              : 'bg-gradient-to-r from-[#151D2C] to-[#0E1420] border-[#FFB800] ring-1 ring-[#FFB800]/30 shadow-[0_4px_24px_rgba(255,184,0,0.15)]'
                            : isFullyCompleted
                              ? 'bg-[#0E1524] border-emerald-500/30 hover:border-emerald-500/50 shadow-sm'
                              : isLocked
                                ? 'bg-[#0B0F17]/60 border-white/5 opacity-60 hover:opacity-75'
                                : 'bg-[#101726] border-white/10 hover:border-white/20 shadow-sm'
                        }`}
                      >
                        {/* Wiersz 1 (Góra): Numer działu (np. "01") + Paszport Epoki / Status po lewej, Liczba lekcji po prawej */}
                        <div className="flex items-center justify-between gap-2 w-full flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-black text-xs text-slate-300 bg-black/40 border border-white/10 px-2.5 py-0.5 rounded-lg tracking-wider">
                              {formattedNumber}
                            </span>
                            
                            {topic.pillar_id === 'pillar-2-lektury' && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  triggerHaptic('light');
                                  setPassportEpochId(topic.id.replace('pol-', ''));
                                }}
                                className="inline-flex items-center gap-1.5 text-[10px] font-bold text-purple-300 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer"
                              >
                                <Compass size={11} className="text-purple-400" />
                                <span>Paszport Epoki</span>
                              </button>
                            )}

                            {isLocked ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
                                <Lock size={10} className="text-slate-400" />
                                <span>ZABLOKOWANY</span>
                              </span>
                            ) : isFullyCompleted ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full shadow-sm">
                                <CheckCircle2 size={11} className="text-emerald-400" />
                                <span>ZALICZONY</span>
                              </span>
                            ) : isBeaconTopic ? (
                              <ActiveBadge label="W TOKU" isRose={selectedSubjectKey === 'pol'} />
                            ) : null}
                          </div>

                          <div className="flex items-center gap-2">
                            {topic.matura_points_range && (
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md hidden sm:inline-block ${
                                selectedSubjectKey === 'pol'
                                  ? 'text-rose-300 bg-rose-500/10 border border-rose-500/20'
                                  : 'text-amber-400/90 bg-amber-400/10 border border-amber-400/20'
                              }`}>
                                {topic.matura_points_range}
                              </span>
                            )}
                            <span className="text-[11px] font-semibold text-slate-400">
                              {topicLessonsCount > 0 ? formatLessonsCount(topicLessonsCount) : 'W opracowaniu'}
                            </span>
                          </div>
                        </div>

                        {/* Wiersz 2 (Środek): Ikona + Duży, czytelny tytuł działu + wskaźnik wejścia */}
                        <div className="flex items-center justify-between gap-3 w-full">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                              isBeaconTopic
                                ? selectedSubjectKey === 'pol'
                                  ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                                  : 'bg-[#FFB800]/15 border-[#FFB800]/40 text-[#FFB800]'
                                : isFullyCompleted
                                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                  : 'bg-white/5 border-white/10 text-slate-300 group-hover:text-white group-hover:border-white/20'
                            }`}>
                              <TopicIcon size={18} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h2 className={`font-display font-black text-base sm:text-lg leading-snug break-words transition-colors ${
                                isLocked 
                                  ? 'text-slate-400' 
                                  : selectedSubjectKey === 'pol' 
                                    ? 'text-white group-hover:text-rose-400' 
                                    : 'text-white group-hover:text-[#FFB800]'
                              }`}>
                                <MathRenderer content={cleanName} />
                              </h2>
                              {topic.matura_focus ? (
                                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                  {topic.matura_focus}
                                </p>
                              ) : topic.short_title && topic.short_title !== cleanName ? (
                                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                                  {topic.short_title}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          {!isLocked && (
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                              isBeaconTopic
                                ? selectedSubjectKey === 'pol'
                                  ? 'bg-rose-500/15 text-rose-400 group-hover:bg-rose-500 group-hover:text-white shadow-sm'
                                  : 'bg-[#FFB800]/15 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-[#080B11] shadow-sm'
                                : isFullyCompleted
                                  ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-emerald-950'
                                  : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white'
                            }`}>
                              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          )}
                        </div>

                        {/* Wiersz 3 (Dół): Cienki, elegancki pasek postępu z licznikiem */}
                        <div className="space-y-1.5 w-full pt-0.5">
                          <div className="flex items-center justify-between text-[11px] font-semibold">
                            <span className="text-slate-400">
                              {isLocked 
                                ? 'Zablokowany' 
                                : topicLessonsCount > 0 
                                  ? `Ukończono: ${completedTopicLessonsCount}/${topicLessonsCount} ${formatLessonsNoun(topicLessonsCount)}` 
                                  : `Postęp zadań: ${completedTopicTasks.length}/${allTopicTasks.length}`}
                            </span>
                            {!isLocked && (
                              <span className={
                                isFullyCompleted 
                                  ? "text-emerald-400 font-bold" 
                                  : isBeaconTopic 
                                    ? selectedSubjectKey === 'pol' ? "text-rose-400 font-bold" : "text-[#FFB800] font-bold" 
                                    : "text-slate-300 font-bold"
                              }>
                                {progressPercent}%
                              </span>
                            )}
                          </div>
                          <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-surface-border">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                isLocked 
                                  ? 'bg-transparent' 
                                  : isFullyCompleted
                                    ? 'bg-emerald-400 shadow-sm'
                                    : isBeaconTopic 
                                      ? selectedSubjectKey === 'pol'
                                        ? 'bg-rose-500 shadow-sm'
                                        : 'bg-[#FFB800] shadow-sm' 
                                      : 'bg-white/30'
                              }`} 
                              style={{ width: `${isLocked ? 0 : progressPercent}%` }} 
                            />
                          </div>
                        </div>

                        {/* Wiersz 4: Lektury w danym dziale / epoce (Filar II) */}
                        {topic.required_books && topic.required_books.length > 0 && (() => {
                          const canonicalBooks: { original: string; canonical: any }[] = [];
                          const otherBooks: string[] = [];
                          topic.required_books.forEach((book: string) => {
                            const canon = findCanonicalLektura(book);
                            if (canon && !canonicalBooks.some(c => c.canonical.id === canon.id)) {
                              canonicalBooks.push({ original: book, canonical: canon });
                            } else {
                              otherBooks.push(book);
                            }
                          });

                          return (
                            <div className="pt-2.5 border-t border-white/5 w-full flex flex-col gap-2">
                              {/* 1. Lektury obowiązkowe w całości (Kanon CKE z gwiazdką) */}
                              {canonicalBooks.length > 0 && (
                                <div className="flex flex-col gap-1.5">
                                  {canonicalBooks.map(({ original, canonical }) => (
                                    <div
                                      key={canonical.id}
                                      className="flex items-center justify-between gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-500/50 transition-colors"
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-amber-400 text-xs font-black shrink-0">★</span>
                                        <div className="min-w-0 text-left">
                                          <div className="text-[11px] font-bold text-amber-200 truncate flex items-center gap-1.5">
                                            <span>{original}</span>
                                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-extrabold uppercase shrink-0">
                                              W całości
                                            </span>
                                          </div>
                                          <div className="text-[10px] text-slate-400 truncate">
                                            Motyw: {canonical.keyTheme || canonical.heroCharacter}
                                          </div>
                                        </div>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          triggerHaptic('medium');
                                          handleStartPolishDailyLesson(topic.id, canonical.id);
                                        }}
                                        className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-[10px] shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-1"
                                      >
                                        <span>★ Trenuj lekturę</span>
                                        <ChevronRight size={12} strokeWidth={3} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* 2. Pozostałe utwory i fragmenty z epoki */}
                              {otherBooks.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                                    Utwory i fragmenty:
                                  </span>
                                  {otherBooks.map((book: string, bIdx: number) => (
                                    <span
                                      key={bIdx}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-slate-300 border border-white/10"
                                    >
                                      <BookOpen size={10} className="text-slate-400 shrink-0" />
                                      <span className="truncate max-w-[200px] sm:max-w-[260px]">{book}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </button>
                    );
                  })}
                </div>
                
                {/* Lazy Loading Sentinel / Progressive Loader */}
                {hasMoreTopics && (
                  <div 
                    ref={topicSentinelRef}
                    className="pt-6 pb-2 flex flex-col items-center justify-center relative z-10 gap-2.5"
                  >
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A23]/90 border border-white/10 text-xs text-[#8B8D98] backdrop-blur-md shadow-lg">
                      <Loader2 size={13} className="animate-spin text-[#FFB800]" />
                      <span>Doczytywanie kolejnych działów ({visibleTopics.length} z {totalTopicsCount})...</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        triggerHaptic('light');
                        setVisibleTopicsCount(totalTopicsCount);
                      }}
                      className="text-[11px] font-semibold text-[#FFB800] hover:text-[#FFC72C] underline underline-offset-2 cursor-pointer py-1 px-3 transition-colors active:scale-95"
                    >
                      Pokaż wszystkie działy ({totalTopicsCount})
                    </button>
                  </div>
                )}

                {/* Trofeum na mecie (wyświetlane po wczytaniu wszystkich działów) */}
                {!hasMoreTopics && (
                  <div className="flex flex-col items-center justify-center mt-8 mb-4 relative z-10 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-2xl flex items-center justify-center shadow-sm border border-[#FFFBEB]/30 mb-2">
                      <Trophy size={28} className="text-white drop-shadow-md" />
                    </div>
                    <p className="text-xs font-black uppercase text-amber-400 tracking-wider">Matura zdana na 100%</p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">Ukończ wszystkie działy, aby zdobyć trofeum</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })()}

        {/* =========================================================================
            SCREEN 2: INTELIGENTNY AKORDEON LEKCJI (SMART EXPANSION & AUTO-FOCUS)
            Z kaskadowym odblokowywaniem i trybem powtórkowym.
           ========================================================================= */}
        {viewState === 'lessons' && currentTopic && (() => {
          const completedLessonsCount = lessonsForCurrentTopic.filter(g => isLessonCompleted(g, completedTasks, userState)).length;
          const totalLessonsCount = lessonsForCurrentTopic.length;

          return (
            <motion.div 
              key="lessons"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col w-full"
            >
              {/* Header działu */}
              <header className="px-4 py-2.5 sm:py-3 sticky top-0 bg-surface-bg/95 backdrop-blur-md z-20 border-b border-surface-border shadow-sm shrink-0">
                <div className="max-w-3xl mx-auto w-full flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button 
                        id="lessons-back-button"
                        onClick={handleBack}
                        className="w-9 h-9 rounded-xl bg-surface-card border border-surface-border flex items-center justify-center text-text-primary hover:bg-surface-card-hover transition-colors shadow-sm shrink-0 cursor-pointer active:scale-95"
                        aria-label="Wróć do listy działów"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <h2 className="font-display font-black text-text-primary text-base sm:text-lg leading-tight truncate">
                        <MathRenderer content={cleanTopicTitle(currentTopic.name || currentTopic.title)} />
                      </h2>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card border border-surface-border text-[11px] font-bold text-text-muted whitespace-nowrap">
                      {totalLessonsCount > 0 ? (
                        <>
                          <span className={selectedSubjectKey === 'pol' ? 'text-rose-400 font-black' : 'text-emerald-400 font-black'}>{completedLessonsCount}/{totalLessonsCount}</span>
                          <span>{formatLessonsNoun(totalLessonsCount)}</span>
                        </>
                      ) : (
                        <span className={selectedSubjectKey === 'pol' ? 'text-rose-400 font-semibold' : 'text-primary font-semibold'}>W opracowaniu</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center pl-0 sm:pl-11">
                    <button
                      id="lessons-subject-switcher-badge"
                      onClick={() => {
                        triggerHaptic('light');
                        openSubjectSheet(true);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-surface-card border border-surface-border text-[10px] sm:text-[11px] font-medium text-text-muted transition-colors cursor-pointer group ${
                        selectedSubjectKey === 'pol' ? 'hover:border-rose-500/40' : 'hover:border-primary/40'
                      }`}
                      title="Zmień przedmiot"
                    >
                      <span className="text-text-muted font-normal">Dział {(selectedTopicIndex ?? 0) + 1}</span>
                      <span className="text-white/20">•</span>
                      <span className={`font-medium transition-colors ${selectedSubjectKey === 'pol' ? 'text-text-primary group-hover:text-rose-400' : 'text-text-primary group-hover:text-primary'}`}>{currentSubject.name}</span>
                      <span className="text-white/20">•</span>
                      <span className={`font-medium ${selectedSubjectKey === 'pol' ? 'text-rose-400' : 'text-primary'}`}>{currentSubject.key === 'math' ? 'Nowa Formuła 2023' : (currentSubject.level || 'Nowa Formuła 2023')}</span>
                    </button>
                  </div>
                </div>
              </header>
              
              {/* Inteligentny Akordeon Lekcji z bezpiecznym paddingiem na dole */}
              <div className="flex-1 px-4 sm:px-5 pt-3 pb-36 sm:pb-40 space-y-3.5 max-w-3xl mx-auto w-full">
                {/* Pasek Postępu Działu - Minimalistyczny, 6-milimetrowy pasek w kolorze szmaragdowym/turkusowym */}
                {(() => {
                  const completedLessonsCount = lessonsForCurrentTopic.filter(g => isLessonCompleted(g, completedTasks, userState)).length;
                  const totalLessonsCount = lessonsForCurrentTopic.length;
                  const progressPct = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

                  return (
                    <div className="bg-[#101724] border border-white/10 rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 mb-1">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-slate-300 font-semibold flex items-center gap-2">
                          <GraduationCap className={`w-4 h-4 ${selectedSubjectKey === 'pol' ? 'text-rose-400' : 'text-[#FFB800]'}`} />
                          <span>Postęp Działu {(selectedTopicIndex ?? 0) + 1}:</span>
                        </span>
                        <span className="font-bold text-white">
                          <span className={`${selectedSubjectKey === 'pol' ? 'text-rose-400' : 'text-emerald-400'} font-extrabold`}>{completedLessonsCount}/{totalLessonsCount}</span> {formatLessonsNoun(totalLessonsCount)} ukończonych ({progressPct}%)
                        </span>
                      </div>
                      {/* Minimalistyczny 6-milimetrowy (h-2) pasek postępu */}
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-white/10">
                        <div 
                          className={`h-full transition-all duration-500 rounded-full ${
                            selectedSubjectKey === 'pol'
                              ? 'bg-gradient-to-r from-rose-600 to-rose-400 shadow-sm'
                              : 'bg-gradient-to-r from-[#D97706] to-[#FFB800] shadow-sm'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}

                {lessonsForCurrentTopic.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-[#141A23]/70 border border-white/10 rounded-3xl mt-4 sm:mt-6 max-w-md mx-auto shadow-xl">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFB800]/15 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800] mb-4 shadow-sm">
                      <Clock size={28} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/25 px-3 py-1 rounded-full mb-3">
                      W opracowaniu • Dostępne wkrótce
                    </span>
                    <h3 className="text-lg sm:text-xl font-display font-black text-white mb-2">
                      <MathRenderer content={cleanTopicTitle(currentTopic.name)} />
                    </h3>
                    <p className="text-xs sm:text-sm text-[#8B8D98] leading-relaxed mb-4 max-w-xs">
                      {currentTopic.description || 'Struktura lekcji oraz baza zadań dla tego działu są przygotowywane zgodnie z wymogami Nowej Formuły 2023.'}
                    </p>
                    <div className="w-full bg-surface-elevated border border-surface-border rounded-xl p-3 mb-5 text-left text-xs text-text-secondary space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-text-muted font-medium">
                        <span>Waga w arkuszu maturalnym:</span>
                        <span className="text-primary font-bold">{currentTopic.matura_points_range || '3–6 pkt'}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-text-muted font-medium">
                        <span>Status:</span>
                        <span className="text-amber-400 font-bold">Pewniaki w przygotowaniu</span>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-2.5">
                      <button
                        onClick={() => {
                          triggerHaptic('light');
                          setSelectedTopicIndex(0);
                          setViewState('lessons');
                        }}
                        className="w-full py-3.5 px-5 rounded-xl bg-[#FFB800] hover:bg-[#FFC72C] text-[#080B11] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
                      >
                        <span>Przejdź do Działu 1 (Liczby Rzeczywiste)</span>
                        <ArrowRight size={16} strokeWidth={3} />
                      </button>
                      <button
                        onClick={handleBack}
                        className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 active:scale-98 transition-all cursor-pointer"
                      >
                        <span>Wróć do listy działów</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {lessonsForCurrentTopic.map((group, groupIdx) => {
                      // CASCADING PROGRESSION ENGINE:
                      const isUnlocked = isLessonUnlocked(groupIdx, lessonsForCurrentTopic, completedTasks, userState);
                      const isCompleted = isLessonCompleted(group, completedTasks, userState);
                      const prevGroup = groupIdx > 0 ? lessonsForCurrentTopic[groupIdx - 1] : null;

                      const isCurrentActiveLesson = isUnlocked && !isCompleted && (
                        lessonsForCurrentTopic.findIndex((g, i) => isLessonUnlocked(i, lessonsForCurrentTopic, completedTasks, userState) && !isLessonCompleted(g, completedTasks, userState)) === groupIdx
                      );

                      // Next lesson in line
                      const nextGroup = groupIdx < lessonsForCurrentTopic.length - 1 ? lessonsForCurrentTopic[groupIdx + 1] : null;
                      const nextPoolResult = nextGroup ? drawSessionTasks(nextGroup.id) : null;
                      const nextTasksToRun = nextGroup ? (
                        (nextPoolResult?.sessionTasks && nextPoolResult.sessionTasks.length > 0)
                          ? nextPoolResult.sessionTasks
                          : nextGroup.tasks
                      ) : [];

                      const afterNextGroup = (nextGroup && groupIdx + 1 < lessonsForCurrentTopic.length - 1) 
                        ? lessonsForCurrentTopic[groupIdx + 2] 
                        : null;

                      const nextLessonPayload = nextGroup ? {
                        isSession: true,
                        isPolish: selectedSubjectKey === 'pol',
                        subjectId: subjectFirestoreId,
                        lessonId: nextGroup.id,
                        lessonTitle: `${nextGroup.badge}: ${nextGroup.name}`,
                        tasks: nextTasksToRun,
                        firstTask: nextTasksToRun[0],
                        allTasks: nextGroup.tasks,
                        formulaSheet: nextPoolResult?.formulaSheet || null,
                        allTaskIdsToMarkCompleted: nextGroup.tasks.map((t: any) => t.id),
                        nextLesson: afterNextGroup ? {
                          isSession: true,
                          isPolish: selectedSubjectKey === 'pol',
                          subjectId: subjectFirestoreId,
                          lessonId: afterNextGroup.id,
                          lessonTitle: `${afterNextGroup.badge}: ${afterNextGroup.name}`
                        } : null
                      } : null;

                      const cleanLessonNumber = (() => {
                        if (/sprawdzian/i.test(group.id) || /sprawdzian/i.test(group.badge || '')) return '★';
                        const badgeMatch = (group.badge || '').match(/(\d+(?:\.\d+)?)/);
                        if (badgeMatch) return badgeMatch[1];
                        const stripped = group.id.replace(/^(?:pol|eng|mat-roz|math-roz|eng-roz)?[-_]?lesson[-_]?/i, '');
                        return stripped.replace('-', '.');
                      })();

                      return (
                        <div 
                          key={group.id}
                          id={`lesson-card-${group.id}`}
                          className={`rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col gap-3.5 ${
                            isCompleted
                              ? 'border-emerald-500/30 bg-[#0E1524] shadow-[0_4px_20px_rgba(16,185,129,0.06)]'
                              : isCurrentActiveLesson
                                ? selectedSubjectKey === 'pol'
                                  ? 'border-2 border-rose-500 bg-gradient-to-b from-[#201318] to-[#120B0E] shadow-sm ring-1 ring-rose-500/40'
                                  : 'border-2 border-[#FFB800] bg-gradient-to-b from-[#151D2C] to-[#0E1420] shadow-sm ring-1 ring-[#FFB800]/40'
                                : !isUnlocked
                                  ? 'border-white/5 bg-[#0A0E17]/60 opacity-60'
                                  : 'border-white/10 bg-[#101726]'
                          }`}
                        >
                          {/* Górna część karty */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0 flex-1">
                              {/* Ikona statusu (3 Stany) */}
                              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 transition-all ${
                                isCompleted
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-sm'
                                  : isCurrentActiveLesson
                                    ? selectedSubjectKey === 'pol'
                                      ? 'bg-rose-500/20 border border-rose-500 text-rose-400 shadow-sm'
                                      : 'bg-[#FFB800]/20 border border-[#FFB800] text-[#FFB800] shadow-sm'
                                    : !isUnlocked
                                      ? 'bg-white/5 border-white/10 text-slate-500'
                                      : 'bg-white/5 border-white/10 text-slate-300'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle2 size={22} className="stroke-[2.5]" />
                                ) : !isUnlocked ? (
                                  <Lock size={18} />
                                ) : (
                                  <span className="font-display font-extrabold text-xs sm:text-sm">{cleanLessonNumber}</span>
                                )}
                              </div>

                              {/* Tytuł i metadane */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider bg-[#080B10] px-2 py-0.5 rounded-full border border-white/5">
                                    {group.badge}
                                  </span>
                                  {selectedSubjectKey === 'pol' && findCanonicalLektura(group.id) && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-amber-300 bg-amber-500/15 border border-amber-500/40 px-2 py-0.5 rounded-full shadow-sm">
                                      ★ KANON CKE
                                    </span>
                                  )}
                                  {isCompleted && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-300 bg-emerald-500/15 border border-emerald-500/40 px-2.5 py-0.5 rounded-full shadow-sm">
                                      ✓ ZALICZONA
                                    </span>
                                  )}
                                  {isCurrentActiveLesson && (
                                    <ActiveBadge label="AKTUALNA LEKCJA" isRose={selectedSubjectKey === 'pol'} />
                                  )}
                                  {!isUnlocked && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                                      ZABLOKOWANA
                                    </span>
                                  )}
                                </div>

                                <h3 className={`font-display font-bold text-base sm:text-lg leading-snug break-words ${
                                  isUnlocked ? 'text-white' : 'text-slate-400'
                                }`}>
                                  <MathRenderer content={group.name} />
                                </h3>

                                {/* Szacowany czas i zadania w sesji - Bilans Skuteczności i dynamiczny wymóg */}
                                <div className="flex items-center gap-2.5 mt-1.5 text-xs text-slate-400 flex-wrap">
                                  {(() => {
                                    const reqTasks = group.required_correct_tasks || 4;
                                    const taskNoun = reqTasks === 1 ? 'poprawne zadanie' : reqTasks < 5 ? 'poprawne zadania' : 'poprawnych zadań';
                                    const lessonMistakesCount = getLessonMistakes(group.id);

                                    if (isCompleted) {
                                      return (
                                        <>
                                          {lessonMistakesCount === 0 ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                                              <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                                              <span>0 błędów</span>
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
                                              <span>{lessonMistakesCount} {lessonMistakesCount === 1 ? 'błąd' : lessonMistakesCount < 5 ? 'błędy' : 'błędów'}</span>
                                            </span>
                                          )}
                                          <span>•</span>
                                          <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            <span>{formatLessonDuration(group)}</span>
                                          </span>
                                        </>
                                      );
                                    }

                                    if (isCurrentActiveLesson) {
                                      return (
                                        <>
                                          <span className="flex items-center gap-1 text-[#FFB800] font-medium">
                                            <Clock size={13} />
                                            <span>{formatLessonDuration(group)}</span>
                                          </span>
                                          <span>•</span>
                                          <span className="text-white font-medium">Wymóg: {reqTasks} {taskNoun}</span>
                                          <span>•</span>
                                          <span className="text-slate-400">Pewniaki maturalne</span>
                                        </>
                                      );
                                    }

                                    if (!isUnlocked) {
                                      return (
                                        <span className="text-slate-500 flex items-center gap-1">
                                          <Lock size={12} />
                                          <span>Odblokuje się po zaliczeniu {getLockRequirementLabel(prevGroup)}</span>
                                        </span>
                                      );
                                    }

                                    return (
                                      <>
                                        <span className="flex items-center gap-1">
                                          <Clock size={12} />
                                          <span>{formatLessonDuration(group)}</span>
                                        </span>
                                        <span>•</span>
                                        <span>Wymóg: {reqTasks} {taskNoun}</span>
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Dolna część karty: 3 Stany przycisków */}
                          <div className="pt-1">
                            {!isUnlocked ? (
                              <div className="w-full py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center gap-2 text-xs text-slate-500 cursor-not-allowed select-none">
                                <Lock size={13} />
                                <span>
                                  Odblokuje się po zaliczeniu {getLockRequirementLabel(prevGroup)}
                                </span>
                              </div>
                            ) : isCompleted ? (
                              <button
                                id={`repeat-lesson-btn-${group.id}`}
                                onClick={() => handleStartLessonSession(group, nextLessonPayload)}
                                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-[0.99] cursor-pointer"
                              >
                                <RefreshCw size={14} className="stroke-[2.5] text-emerald-400" />
                                <span>POWTÓRZ LEKCJĘ</span>
                              </button>
                            ) : (
                              <button
                                id={`start-lesson-btn-${group.id}`}
                                onClick={() => handleStartLessonSession(group, nextLessonPayload)}
                                className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer ${
                                  selectedSubjectKey === 'pol'
                                    ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-sm'
                                    : 'bg-[#FFB800] hover:bg-[#FFC72C] text-[#080B11] shadow-sm'
                                }`}
                              >
                                <Play size={16} fill={selectedSubjectKey === 'pol' ? '#FFFFFF' : '#080B11'} strokeWidth={0} />
                                <span>ROZPOCZNIJ LEKCJĘ</span>
                                <ArrowRight size={16} strokeWidth={3} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* ================= AUTOMATYCZNY SPRAWDZIAN DZIAŁU / LEKTURY (BOSS EXAM) ================= */}
                    {(() => {
                      if (!currentTopic) return null;
                      const isMath = selectedSubjectKey === 'math';
                      const topicIdUpper = String(currentTopic.id || 'dzial-1').toUpperCase();
                      const cleanTitle = cleanTopicTitle(currentTopic.name);

                      // Egzamin działowy pobiera zadania z Firestore (1 odczyt na lekcję,
                      // potem z pamięci podręcznej) — w bundlu nie ma żadnych zadań.
                      const openExam = async () => {
                        triggerHaptic('medium');
                        setIsBossExamLoading(true);
                        try {
                          const data = await loadTopicBossExam(currentTopic, subjectFirestoreId);
                          setBossExamData(data);
                          setIsBossExamOpen(true);
                        } catch (err) {
                          console.warn('[LearnView] Nie udało się wczytać sprawdzianu działu:', err);
                        } finally {
                          setIsBossExamLoading(false);
                        }
                      };
                      const defaultTotalQuestions = lessonsForCurrentTopic.length > 0 ? Math.min(10, Math.max(5, lessonsForCurrentTopic.length)) : 7;
                      const examData = currentTopic.final_test || currentTopic.epoch_exam || currentTopic.book_exam || {
                        id: `BOSS-EXAM-${topicIdUpper}`,
                        title: `SPRAWDZIAN: ${cleanTitle.toUpperCase()}`,
                        subtitle: `${defaultTotalQuestions} kluczowych zadań maturalnych z działu • Limit: 20 minut • Próg zaliczenia: 70%`,
                        totalQuestions: defaultTotalQuestions,
                        timeLimitMinutes: 20,
                        rewardXp: 150,
                        badgeTitle: `MISTRZ: ${cleanTitle.toUpperCase()}`
                      };

                      const examId = examData.id || `BOSS-EXAM-${topicIdUpper}`;
                      const isBossExamPassed = completedTasks.includes(examId) || 
                                               completedTasks.includes(`BOSS-EXAM-${currentTopic.id}`) ||
                                               completedTasks.includes(`BOSS-EXAM-${topicIdUpper}`) ||
                                               completedTasks.includes(`SPRAWDZIAN-${currentTopic.id}`) ||
                                               completedTasks.includes(`SPRAWDZIAN-${topicIdUpper}`) ||
                                               (currentTopic.id === 'dzial-1' && (completedTasks.includes('BOSS-EXAM-DZIAL-1') || completedTasks.includes('SPRAWDZIAN-DZIAL-1')));

                      const completedCount = lessonsForCurrentTopic.filter(g => isLessonCompleted(g, completedTasks, userState)).length;
                      const allDone = lessonsForCurrentTopic.length > 0 && completedCount === lessonsForCurrentTopic.length;

                      return (
                        <div 
                          id={`boss-exam-${currentTopic.id}-card`}
                          className={`rounded-3xl border-2 p-5 sm:p-6 flex flex-col gap-4 transition-all duration-300 mt-6 relative overflow-hidden ${
                            isBossExamPassed
                              ? 'bg-gradient-to-br from-[#101A14] via-[#0D1612] to-[#0A110E] border-emerald-500/50 shadow-md shadow-black/20'
                              : allDone
                                ? 'bg-gradient-to-br from-[#1A152C] via-[#141024] to-[#0D0B18] border-purple-500/60 shadow-md shadow-black/20'
                                : 'bg-gradient-to-br from-[#161724] via-[#11121C] to-[#0B0C14] border-white/15'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3.5">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                                isBossExamPassed
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-sm'
                                  : allDone
                                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-sm'
                                    : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                              }`}>
                                <Trophy size={24} className="stroke-[2.2]" />
                              </div>

                              <div>
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300">
                                    {currentTopic.pillar_name ? currentTopic.pillar_name : `Zwieńczenie Działu ${(selectedTopicIndex ?? 0) + 1}`}
                                  </span>
                                  {isBossExamPassed && (
                                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                                      ✓ {examData.badgeTitle || 'ZALICZONY'}
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-display font-extrabold text-white text-lg sm:text-xl">
                                  <MathRenderer content={examData.title || `SPRAWDZIAN: ${cleanTopicTitle(currentTopic.name).toUpperCase()}`} />
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                                  {examData.subtitle || `${examData.totalQuestions || 8} pytań maturalnych • Limit: ${examData.timeLimitMinutes || 20} minut`}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Metadane sprawdzianu */}
                          <div className="grid grid-cols-3 gap-2 py-1 text-center">
                            <div className="bg-black/30 border border-white/5 rounded-xl p-2.5">
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Liczba Zadań</span>
                              <span className="text-sm font-extrabold text-white">{examData.totalQuestions || 8} pytań</span>
                            </div>
                            <div className="bg-black/30 border border-white/5 rounded-xl p-2.5">
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Limit Czasu</span>
                              <span className="text-sm font-extrabold text-[#FFB800]">{examData.timeLimitMinutes || 20} minut</span>
                            </div>
                            <div className="bg-black/30 border border-white/5 rounded-xl p-2.5">
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Nagroda</span>
                              <span className="text-sm font-extrabold text-amber-400">+{examData.rewardXp || 150} XP + Trofeum</span>
                            </div>
                          </div>

                          {/* Przycisk akcji sprawdzianu */}
                          <button
                            id="start-boss-exam-btn"
                            onClick={() => {
                              void openExam();
                            }}
                            disabled={isBossExamLoading}
                            className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition active:scale-[0.99] cursor-pointer shadow-lg ${
                              isBossExamPassed
                                ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40'
                                : 'bg-gradient-to-r from-[#FFB800] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-[#080B11] shadow-[0_0_20px_rgba(255,184,0,0.35)]'
                            }`}
                          >
                            <Trophy size={18} />
                            <span>{isBossExamLoading ? 'WCZYTUJĘ ZADANIA...' : (isBossExamPassed ? 'POWTÓRZ SPRAWDZIAN DZIAŁU' : 'ROZPOCZNIJ SPRAWDZIAN DZIAŁU')}</span>
                            <ArrowRight size={18} strokeWidth={2.5} />
                          </button>
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>
            </motion.div>
          );
        })()}

      </AnimatePresence>

      {/* =========================================================================
          PRZEŁĄCZNIK PRZEDMIOTÓW: WYSWUWANY OD DOŁU ARKUSZ (BOTTOM SHEET)
          Uruchamiany po kliknięciu < w widoku działów lub kliknięciu w tytuł "Matematyka".
         ========================================================================= */}
      {isMounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isSubjectSheetOpen && (
            <div 
              key="subject-sheet-portal-wrapper"
              id="subject-sheet-wrapper"
              className="fixed inset-0 z-[120] flex items-end md:items-center justify-center pointer-events-auto p-0 md:p-4"
            >
              {/* Full Screen Backdrop Overlay - completely dims the entire screen including top header */}
              <motion.div
                key="subject-sheet-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => openSubjectSheet(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer z-[120]"
              />

              {/* Bottom Sheet on Mobile / Centered Modal Dialog on Desktop */}
              <motion.div
                key="subject-sheet-modal-content"
                initial={isDesktop ? { opacity: 0, scale: 0.96, y: 0 } : { y: '100%' }}
                animate={isDesktop ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }}
                exit={isDesktop ? { opacity: 0, scale: 0.96, y: 0 } : { y: '100%' }}
                transition={isDesktop ? { duration: 0.2, ease: [0.16, 1, 0.3, 1] } : { type: 'spring', damping: 26, stiffness: 280 }}
                className="relative z-[125] w-full max-w-lg md:max-w-[800px] mx-auto bg-[#0E131C] border-t md:border border-white/10 rounded-t-3xl md:rounded-3xl p-5 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.9)] flex flex-col gap-4 max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
                style={{ paddingBottom: isDesktop ? '1.5rem' : 'max(24px, env(safe-area-inset-bottom, 24px))' }}
              >
                {/* Grab handle (tylko na mobile) */}
                <div 
                  className="md:hidden w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-1 cursor-pointer" 
                  onClick={() => openSubjectSheet(false)} 
                />

                {/* 1. Nagłówek (Header): "Wybierz przedmiot nauki", brak podtytułu, więcej światła */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/5">
                  <h3 className="font-display font-black text-white text-lg sm:text-xl tracking-tight">
                    Wybierz przedmiot nauki
                  </h3>
                  <button
                    id="subject-sheet-close-btn"
                    onClick={() => openSubjectSheet(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
                    aria-label="Zamknij"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Lista dostępnych przedmiotów: pionowa lista na mobile, CSS Grid 2-kolumnowy na desktopie */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pb-2">
                  
                  {/* 1. Matematyka */}
                  <div
                    id="subject-card-math"
                    onClick={() => {
                      triggerHaptic('light');
                      setSelectedSubjectKey('math');
                      setSelectedTopicIndex(0);
                      setViewState('topics');
                      openSubjectSheet(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedSubjectKey === 'math'
                        ? 'border-[#FFB800] bg-gradient-to-br from-[#151D2C] via-[#111724] to-[#0E1420] ring-1 ring-[#FFB800]/40 shadow-sm'
                        : 'border-white/10 bg-[#101726] hover:border-white/20 hover:bg-[#141C2C]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                        <Calculator size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-display font-black text-white text-base">
                            Matematyka
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20">
                            <span className="w-1 h-1 rounded-full bg-[#FFB800]" />
                            Nowa Formuła 2023
                          </span>
                        </div>
                        <p className="text-xs text-[#8B8D98] truncate">
                          14 działów • 150+ lekcji
                        </p>
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-surface-border">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                mathProgressPercent > 0 ? 'bg-[#FFB800]' : 'bg-transparent'
                              }`}
                              style={{ width: `${mathProgressPercent}%` }}
                            />
                          </div>
                          <span className={`text-[11px] font-bold shrink-0 ${
                            mathProgressPercent > 0 ? 'text-[#FFB800]' : 'text-slate-500'
                          }`}>
                            {mathProgressPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {selectedSubjectKey === 'math' && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                        className="w-6 h-6 rounded-full bg-[#FFB800] text-[#080B11] font-bold flex items-center justify-center shrink-0 shadow-sm"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>

                  {/* 2. Język Polski */}
                  <div
                    id="subject-card-pol"
                    onClick={() => {
                      triggerHaptic('light');
                      setSelectedSubjectKey('pol');
                      setSelectedTopicIndex(0);
                      setViewState('topics');
                      openSubjectSheet(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedSubjectKey === 'pol'
                        ? 'border-rose-500 bg-gradient-to-br from-[#2D161F] to-[#1C1217] ring-1 ring-rose-500/30 shadow-sm'
                        : 'border-white/10 bg-[#141A23] hover:border-white/20 hover:bg-[#18202C]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-rose-400 flex items-center justify-center shrink-0">
                        <BookOpen size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-display font-black text-white text-base">
                            Język Polski
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <span className="w-1 h-1 rounded-full bg-rose-400" />
                            Nowa Formuła 2023
                          </span>
                        </div>
                        <p className="text-xs text-[#8B8D98] truncate">
                          17 działów • 2 Filary • 102 lekcje • 28 lektur
                        </p>
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-surface-border">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                polProgressPercent > 0 ? 'bg-rose-400' : 'bg-transparent'
                              }`}
                              style={{ width: `${polProgressPercent}%` }}
                            />
                          </div>
                          <span className={`text-[11px] font-bold shrink-0 ${
                            polProgressPercent > 0 ? 'text-rose-400' : 'text-slate-500'
                          }`}>
                            {polProgressPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {selectedSubjectKey === 'pol' && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                        className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>

                  {/* 3. Język Angielski */}
                  <div
                    id="subject-card-eng"
                    onClick={() => {
                      triggerHaptic('light');
                      setSelectedSubjectKey('eng');
                      setSelectedTopicIndex(0);
                      setViewState('topics');
                      openSubjectSheet(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedSubjectKey === 'eng'
                        ? 'border-emerald-500 bg-gradient-to-br from-[#10281F] to-[#0A1A14] ring-1 ring-emerald-500/30 shadow-sm'
                        : 'border-white/10 bg-[#141A23] hover:border-white/20 hover:bg-[#18202C]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
                        <Globe size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-display font-black text-white text-base">
                            Język Angielski
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="w-1 h-1 rounded-full bg-emerald-400" />
                            Podstawa • B1/B2
                          </span>
                        </div>
                        <p className="text-xs text-[#8B8D98] truncate">
                          10 działów • 23 lekcje • 184 zadania
                        </p>
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-surface-border">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                engProgressPercent > 0 ? 'bg-emerald-400' : 'bg-transparent'
                              }`}
                              style={{ width: `${engProgressPercent}%` }}
                            />
                          </div>
                          <span className={`text-[11px] font-bold shrink-0 ${
                            engProgressPercent > 0 ? 'text-emerald-400' : 'text-slate-500'
                          }`}>
                            {engProgressPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {selectedSubjectKey === 'eng' && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                        className="w-6 h-6 rounded-full bg-emerald-500 text-[#080B11] font-bold flex items-center justify-center shrink-0 shadow-sm"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>

                  {/* 4. Matematyka Rozszerzona */}
                  <div
                    id="subject-card-math-roz"
                    onClick={() => {
                      triggerHaptic('light');
                      setSelectedSubjectKey('math-roz');
                      setSelectedTopicIndex(0);
                      setViewState('topics');
                      openSubjectSheet(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedSubjectKey === 'math-roz'
                        ? 'border-sky-400 bg-gradient-to-br from-[#0E2034] to-[#0A1524] ring-1 ring-sky-400/30 shadow-sm'
                        : 'border-white/10 bg-[#141A23] hover:border-white/20 hover:bg-[#18202C]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0 shadow-sm">
                        <Calculator size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-display font-black text-white text-base">
                            Matematyka Rozszerzona
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            <span className="w-1 h-1 rounded-full bg-sky-400" />
                            Rozszerzenie • 2023
                          </span>
                        </div>
                        <p className="text-xs text-[#8B8D98] truncate">
                          15 działów • 20 lekcji • 120 zadań
                        </p>
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-surface-border">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                mathRozProgressPercent > 0 ? 'bg-sky-400' : 'bg-transparent'
                              }`}
                              style={{ width: `${mathRozProgressPercent}%` }}
                            />
                          </div>
                          <span className={`text-[11px] font-bold shrink-0 ${
                            mathRozProgressPercent > 0 ? 'text-sky-400' : 'text-slate-500'
                          }`}>
                            {mathRozProgressPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {selectedSubjectKey === 'math-roz' && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                        className="w-6 h-6 rounded-full bg-sky-400 text-[#080B11] font-bold flex items-center justify-center shrink-0 shadow-sm"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>

                  {/* 5. Język Angielski Rozszerzony */}
                  <div
                    id="subject-card-eng-roz"
                    onClick={() => {
                      triggerHaptic('light');
                      setSelectedSubjectKey('eng-roz');
                      setSelectedTopicIndex(0);
                      setViewState('topics');
                      openSubjectSheet(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedSubjectKey === 'eng-roz'
                        ? 'border-purple-400 bg-gradient-to-br from-[#241233] to-[#160B20] ring-1 ring-purple-400/30 shadow-sm'
                        : 'border-white/10 bg-[#141A23] hover:border-white/20 hover:bg-[#18202C]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 shadow-sm">
                        <Globe size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-display font-black text-white text-base">
                            Język Angielski Rozszerzony
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                            <span className="w-1 h-1 rounded-full bg-purple-400" />
                            Rozszerzenie • B2+/C1
                          </span>
                        </div>
                        <p className="text-xs text-[#8B8D98] truncate">
                          10 działów • 18 lekcji • 72 zadania
                        </p>
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <div className="flex-1 h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-surface-border">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                engRozProgressPercent > 0 ? 'bg-purple-400' : 'bg-transparent'
                              }`}
                              style={{ width: `${engRozProgressPercent}%` }}
                            />
                          </div>
                          <span className={`text-[11px] font-bold shrink-0 ${
                            engRozProgressPercent > 0 ? 'text-purple-400' : 'text-slate-500'
                          }`}>
                            {engRozProgressPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {selectedSubjectKey === 'eng-roz' && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                        className="w-6 h-6 rounded-full bg-purple-400 text-white font-bold flex items-center justify-center shrink-0 shadow-sm"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>

                  {/* 6. Przedmioty w przygotowaniu */}
                  <div className="p-4 rounded-2xl border border-white/5 bg-[#10141C]/50 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-slate-500 flex items-center justify-center shrink-0">
                        <BookOpen size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display font-bold text-white/70 text-base">
                            Kolejne przedmioty
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                            <Lock size={10} className="text-slate-400" />
                            <span>Wkrótce</span>
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280] truncate">
                          Biologia • Chemia • Fizyka
                        </p>
                      </div>
                    </div>
                    <Lock size={16} className="text-slate-600 shrink-0" />
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* =========================================================================
          BOSS EXAM RUNNER: DYNAMICZNY SPRAWDZIAN DZIAŁU / LEKTURY
         ========================================================================= */}
      {isBossExamOpen && bossExamData && isMounted && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[150] bg-[#080C14] text-white">
          <BossExamRunner
            initialExamData={bossExamData}
            onRestart={() => bossExamData}
            onCancel={() => setIsBossExamOpen(false)}
            onCompleteExam={(score, passed, xp, coins, badgeId) => {
              setIsBossExamOpen(false);
              if (onCompleteTask) {
                const topicTag = String(currentTopic?.id || 'dzial-1').toUpperCase();
                onCompleteTask(
                  [
                    `BOSS-EXAM-${topicTag}`, 
                    `SPRAWDZIAN-${topicTag}`, 
                    `BOSS-EXAM-${currentTopic?.id}`, 
                    `SPRAWDZIAN-${currentTopic?.id}`,
                    badgeId
                  ],
                  passed ? 3 : 1,
                  xp,
                  coins
                );
              }
            }}
          />
        </div>,
        document.body
      )}

      {/* Skarbiec Argumentów Modal */}
      <ArgumentVaultModal
        isOpen={isArgumentVaultOpen}
        onClose={() => setIsArgumentVaultOpen(false)}
      />

      {/* Paszport Epoki Modal */}
      {passportEpochId && (
        <PolishEpochPassportModal
          epochId={passportEpochId}
          isOpen={Boolean(passportEpochId)}
          onClose={() => setPassportEpochId(null)}
        />
      )}

    </div>
  );
}

