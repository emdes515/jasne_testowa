import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  BookOpen, Calculator, Globe, FlaskConical, ChevronRight, ChevronLeft, ChevronDown,
  Lock, BookText, Zap, PenTool, Award, Dna, ArrowRight, CheckCircle2, Check,
  Sparkles, Layers, Play, Target, RefreshCw, X, Loader2,
  Hash, Binary, EqualNot, TrendingUp, Activity, 
  ListOrdered, TriangleRight, CircleDot, Map as MapIcon, Box, PieChart, Clock, Trophy,
  GraduationCap
} from 'lucide-react';
import { triggerHaptic } from '../utils';
import { motion, AnimatePresence } from 'motion/react';
import { MathRenderer } from './MathRenderer';
import { mathTopics, setGlobalMathTopics, buildProcessedTopic } from '../data/mathTasks';
import { drawSessionTasks, getLessonFormulaSheet } from '../data/dzial1TaskPool';
import { curriculumRepository } from '../services/curriculumRepository';
import { BossExamRunner } from './BossExamRunner';

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

function getTopicIcon(subjectKey: string, topicIndex: number, DefaultIcon: any) {
  if (subjectKey === 'math' && topicIndex < mathIcons.length) {
    return mathIcons[topicIndex];
  }
  return DefaultIcon;
}

/**
 * Spójny, designerski wskaźnik stanu aktywnego (W TOKU / AKTUALNA LEKCJA).
 * Oparty na zasadach ergonomii wizualnej (Cognitive Load Theory) oraz subtelnej mikrointerakcji:
 * Stały, czytelny punkt odniesienia + łagodna fala sonaru o 2.5s interwale.
 */
export function ActiveBadge({ label = 'W TOKU' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/30 px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(255,184,0,0.15)] select-none">
      <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75 [animation-duration:2.5s]" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FFB800]" />
      </span>
      <span>{label}</span>
    </span>
  );
}

export interface LessonGroup {
  id: string;
  name: string;
  badge: string;
  tasks: any[];
  estimated_time_formatted?: string;
  estimated_time_minutes?: number;
  required_correct_tasks?: number;
}

const LESSON_EXPLICIT_DURATIONS: Record<string, string> = {
  '1.1': '~5 min',
  '1.2': '~6 min',
  '1.3': '~6 min',
  '1.4': '~5 min',
  '1.5': '~6 min',
  '1.6': '~7 min',
  '1.7': '~8 min',
};

export function formatLessonDuration(group: LessonGroup): string {
  const isSprawdzian = group.id.includes('SPRAWDZIAN') || group.name.toLowerCase().includes('sprawdzian');
  if (isSprawdzian) {
    return '~15–20 min';
  }

  // Wymóg dynamicznego szacowania: Użycie pola estimated_time_formatted z curriculum
  if (group.estimated_time_formatted) {
    return group.estimated_time_formatted;
  }

  if (group.estimated_time_minutes) {
    return `~${group.estimated_time_minutes} min`;
  }

  const cleanIdMatch = group.id.match(/(?:lesson-)?(\d+)[-.](\d+)/i) || group.badge.match(/(\d+)\.(\d+)/);
  if (cleanIdMatch) {
    const key = `${cleanIdMatch[1]}.${cleanIdMatch[2]}`;
    if (LESSON_EXPLICIT_DURATIONS[key]) {
      return LESSON_EXPLICIT_DURATIONS[key];
    }
  }

  return '~6 min';
}

/**
 * Robust check if a single task in a lesson is completed.
 * Theory tasks are considered completed if explicitly in completedTasks
 * OR if any practice task in that same lesson has been completed.
 */
export function isTaskCompletedInLesson(
  task: any,
  completedTasks: string[],
  lessonTasks: any[] = []
): boolean {
  if (!task) return false;
  if (completedTasks.includes(task.id)) return true;

  const isTheory = task.id?.includes('THEORY') || task.type === 'theory' || task.cke_source === 'Pigułka Wiedzy';
  if (isTheory && lessonTasks && lessonTasks.length > 1) {
    const practiceTasks = lessonTasks.filter(t => !t.id?.includes('THEORY') && t.type !== 'theory' && t.cke_source !== 'Pigułka Wiedzy');
    if (practiceTasks.length > 0 && practiceTasks.some(t => completedTasks.includes(t.id))) {
      return true;
    }
  }
  return false;
}

/**
 * A lesson is 100% completed if it is registered in completed_lessons, completedTasks, or all its tasks are done.
 */
export function isLessonCompleted(
  group: LessonGroup, 
  completedTasks: string[], 
  userState?: any
): boolean {
  if (!group) return false;
  const cleanId = group.id.replace('lesson-', '');
  const dotId = cleanId.replace('-', '.');
  const dashId = `lesson-${dotId.replace('.', '-')}`;

  // Check userState completed_lessons if available
  const userCompletedLessons: string[] = userState?.completed_lessons || [];
  const userCompletedMap = userState?.completedLessons || userState?.progress?.completedLessons || {};

  if (
    userCompletedLessons.includes(group.id) ||
    userCompletedLessons.includes(cleanId) ||
    userCompletedLessons.includes(dotId) ||
    userCompletedLessons.includes(dashId) ||
    userCompletedMap[group.id]?.status === 'COMPLETED' ||
    userCompletedMap[dotId]?.status === 'COMPLETED' ||
    userCompletedMap[cleanId]?.status === 'COMPLETED' ||
    userCompletedMap[dashId]?.status === 'COMPLETED'
  ) {
    return true;
  }

  // Check completedTasks tags and identifiers
  if (
    completedTasks.includes(`LESSON-${group.id}`) ||
    completedTasks.includes(`LESSON-${cleanId}`) ||
    completedTasks.includes(`LESSON-${dotId}`) ||
    completedTasks.includes(`LESSON-${dashId}`) ||
    completedTasks.includes(`LESSON-${group.id.toLowerCase()}`) ||
    completedTasks.includes(group.id) ||
    completedTasks.includes(cleanId) ||
    completedTasks.includes(dotId)
  ) {
    return true;
  }

  if (!group.tasks || group.tasks.length === 0) return false;
  return group.tasks.every(task => isTaskCompletedInLesson(task, completedTasks, group.tasks));
}

/**
 * Cascading Progression Rule:
 * 1. Lesson at index 0 is ALWAYS unlocked.
 * 2. Lesson at index > 0 is unlocked IF AND ONLY IF the immediately preceding lesson
 *    (index - 1) is 100% completed.
 */
export function isLessonUnlocked(
  groupIdx: number,
  allGroups: LessonGroup[],
  completedTasks: string[],
  userState?: any
): boolean {
  if (groupIdx === 0) return true;
  const prevGroup = allGroups[groupIdx - 1];
  if (!prevGroup) return false;
  return isLessonCompleted(prevGroup, completedTasks, userState);
}

export function getLockRequirementLabel(prevGroup?: LessonGroup): string {
  if (!prevGroup) return 'poprzedniej lekcji';
  const rawBadge = (prevGroup.badge || '').trim();
  if (!rawBadge) return 'poprzedniej lekcji';
  
  if (/sprawdzian/i.test(rawBadge)) {
    return 'Sprawdzianu';
  }
  
  const numOrSub = rawBadge.replace(/^lekcja[\s\u00a0:]*/i, '').trim();
  if (numOrSub) {
    return `Lekcji ${numOrSub}`;
  }
  return 'poprzedniej lekcji';
}

export function getLessonsForTopic(topic: any): LessonGroup[] {
  if (!topic) return [];
  
  // Cost-Optimized Flat-Bundle: lessons_metadata contains the list of lessons for this topic
  if (topic.lessons_metadata && Array.isArray(topic.lessons_metadata) && topic.lessons_metadata.length > 0) {
    return topic.lessons_metadata.map((meta: any) => {
      const isSprawdzian = (meta.title || '').toLowerCase().includes('sprawdzian');
      const cleanId = String(meta.id).replace(/^lesson-/, '').replace('-', '.');
      return {
        id: String(meta.id),
        name: meta.title,
        badge: isSprawdzian ? 'Sprawdzian' : `Lekcja ${cleanId}`,
        tasks: meta.tasks || [],
        estimated_time_formatted: meta.estimated_time_formatted || '~5 min',
        estimated_time_minutes: meta.estimated_time_minutes || 5,
        required_correct_tasks: meta.required_points || meta.required_correct_tasks || 3
      };
    });
  }

  // Fallback for full lessons structure
  if (topic.lessons && Array.isArray(topic.lessons) && topic.lessons.length > 0) {
    return topic.lessons.map((lesson: any) => {
      const lessonTasks = (topic.tasks || []).filter((t: any) => String(t.lessonId) === String(lesson.id));
      const isSprawdzian = (lesson.title || '').toLowerCase().includes('sprawdzian');
      const cleanId = String(lesson.id).replace(/^lesson-/, '').replace('-', '.');
      return {
        id: String(lesson.id),
        name: lesson.title,
        badge: isSprawdzian ? 'Sprawdzian' : `Lekcja ${cleanId}`,
        tasks: lessonTasks,
        estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
        estimated_time_minutes: lesson.estimated_time_minutes || 5,
        required_correct_tasks: lesson.required_correct_tasks || lesson.required_points || 3
      };
    });
  }
  
  return [];
}

function cleanTopicTitle(text: string): string {
  if (!text) return '';
  return text.replace(/^Dział\s+\d+:\s*/i, '').replace(/\s*\(Poziom\s+Podstawowy\)/gi, '').trim();
}

// Curriculum metadata for Polish (Clean metadata, no hardcoded task arrays)
const polishTopics = [
  {
    id: 'pol-1',
    numericId: 1,
    name: 'Dział 1: Epoki Literackie – Od Antyku do Współczesności',
    short_title: 'Epoki Literackie',
    icon: 'BookOpen',
    color: '#F43F5E',
    matura_points_range: '6–12 pkt',
    importance: 'Kluczowy (rozprawka i test historycznoliteracki)',
    description: 'Fundament matury z języka polskiego: toposy biblijne i antyczne, arcydzieła renesansu, romantyzmu oraz pozytywizmu.',
    progress: '0%',
    locked: false,
    lessons_metadata: [
      { id: '1.1', title: 'Antyk i Biblia – motywy i toposy maturalne', required_points: 3, estimated_time_formatted: '~5 min' },
      { id: '1.2', title: 'Średniowiecze – Bogurodzica i etos rycerski', required_points: 3, estimated_time_formatted: '~5 min' },
      { id: '1.3', title: 'Renesans – Jan Kochanowski (Pieśni i Treny)', required_points: 3, estimated_time_formatted: '~5 min' }
    ],
    tasks: []
  },
  {
    id: 'pol-2',
    numericId: 2,
    name: 'Dział 2: Lektury Obowiązkowe (Pan Tadeusz, Dziady, Lalka)',
    short_title: 'Lektury Obowiązkowe',
    icon: 'BookOpen',
    color: '#E11D48',
    matura_points_range: '15–35 pkt',
    importance: 'Fundament wypracowania maturalnego',
    description: 'Najważniejsze dzieła polskiego kanonu: problematyka narodowa, egzystencjalna i obyczajowa.',
    progress: '0%',
    locked: false,
    lessons_metadata: [
      { id: '2.1', title: 'Adam Mickiewicz: Dziady cz. III i Kordian', required_points: 3, estimated_time_formatted: '~5 min' },
      { id: '2.2', title: 'Adam Mickiewicz: Pan Tadeusz', required_points: 3, estimated_time_formatted: '~5 min' },
      { id: '2.3', title: 'Bolesław Prus: Lalka', required_points: 3, estimated_time_formatted: '~5 min' }
    ],
    tasks: []
  }
];

const initialDataBySubject: Record<string, any> = {
  math: {
    key: 'math',
    name: 'Matematyka',
    level: 'Nowa Formuła 2023',
    icon: Calculator,
    color: 'text-blue-400',
    topics: []
  },
  pol: {
    key: 'pol',
    name: 'Język Polski',
    level: 'Nowa Formuła 2023',
    icon: BookOpen,
    color: 'text-rose-400',
    topics: polishTopics
  },
  eng: {
    key: 'eng',
    name: 'Język Angielski',
    level: 'Poziom Podstawowy • B1/B2',
    icon: Globe,
    color: 'text-emerald-400',
    topics: []
  }
};

type ViewState = 'subjects' | 'topics' | 'lessons' | 'tasks';

interface LearnViewProps {
  userState?: any;
  completedTasks?: string[];
  taskStars?: Record<string, number>;
  lessonMistakes?: Record<string, number>;
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
  onSheetToggle
}: LearnViewProps) {
  const [isBossExamOpen, setIsBossExamOpen] = useState<boolean>(false);

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

  // Subject selection (math, pol, eng)
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_selected_subject');
      if (stored && (stored === 'math' || stored === 'pol')) return stored;
    } catch(e) {}
    return 'math';
  });

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

  const [mathTopicsList, setMathTopicsList] = useState<any[]>(() => mathTopics);
  const [isLoadingTopics, setIsLoadingTopics] = useState<boolean>(mathTopics.length === 0);

  useEffect(() => {
    let isMounted = true;
    curriculumRepository.getTopics().then(loaded => {
      if (isMounted && loaded && loaded.length > 0) {
        setMathTopicsList(loaded);
        setGlobalMathTopics(loaded.map(t => buildProcessedTopic(t)));
        setIsLoadingTopics(false);
      }
    }).catch(err => {
      console.warn('Could not load topics from Firestore:', err);
      if (isMounted) setIsLoadingTopics(false);
    });
    return () => { isMounted = false; };
  }, []);

  const dataBySubject: Record<string, any> = {
    ...initialDataBySubject,
    math: {
      ...initialDataBySubject.math,
      topics: mathTopicsList
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
  const totalMathTasks = mathTopics.reduce((acc, t) => acc + (t.tasks?.length || 0), 0);
  const completedMathTasks = mathTopics.reduce((acc, t) => {
    return acc + (t.tasks || []).filter((tsk: any) => completedTasks.includes(tsk.id)).length;
  }, 0);
  const mathProgressPercent = totalMathTasks > 0 ? Math.round((completedMathTasks / totalMathTasks) * 100) : 0;

  // Polish progress calculation
  const totalPolTasks = polishTopics.reduce((acc, t) => acc + (t.tasks?.length || 0), 0);
  const completedPolTasks = polishTopics.reduce((acc, t) => {
    return acc + (t.tasks || []).filter((tsk: any) => completedTasks.includes(tsk.id)).length;
  }, 0);
  const polProgressPercent = totalPolTasks > 0 ? Math.round((completedPolTasks / totalPolTasks) * 100) : 0;

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

  const handleStartLessonSession = async (group: LessonGroup, nextLessonPayload?: any) => {
    triggerHaptic('medium');
    const topicId = currentTopic?.id || 'dzial-1';
    // Flat-Bundle: 1 single document read for full theory_pill + tasks (0 reads if cached)
    const lessonDoc = await curriculumRepository.getLesson(topicId, group.id);
    const tasks = (lessonDoc?.tasks && lessonDoc.tasks.length > 0) ? lessonDoc.tasks : group.tasks;
    const poolResult = drawSessionTasks(group.id, tasks);
    const tasksToRun = (poolResult.sessionTasks && poolResult.sessionTasks.length > 0)
      ? poolResult.sessionTasks
      : tasks;

    const sessionPayload = {
      isSession: true,
      lessonId: group.id,
      lessonTitle: `${group.badge}: ${group.name}`,
      tasks: tasksToRun,
      formulaSheet: poolResult.formulaSheet || getLessonFormulaSheet(group.id),
      theoryPill: lessonDoc?.theory_pill || poolResult.theoryPill,
      nextLesson: nextLessonPayload,
      allTaskIdsToMarkCompleted: tasks.map((t: any) => t.id),
      required_correct_tasks: group.required_correct_tasks || poolResult.required_correct_tasks || 3,
      estimated_time_formatted: group.estimated_time_formatted || poolResult.estimated_time_formatted
    };

    onStartTask?.(sessionPayload, tasksToRun, `${group.badge}: ${group.name}`, nextLessonPayload);
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
          const completedTopicsCount = currentSubject.topics.filter((t: any) => {
            const lessons = getLessonsForTopic(t);
            if (lessons.length > 0) {
              return lessons.every((l: any) => isLessonCompleted(l, completedTasks, userState));
            }
            const tasks = t.tasks || [];
            return tasks.length > 0 && tasks.every((tsk: any) => completedTasks.includes(tsk.id));
          }).length;
          const totalTopicsCount = currentSubject.topics.length;

          // Find active topic index: pierwszy nieukończony dział
          const activeTopicIdx = currentSubject.topics.findIndex((t: any) => {
            const lessons = getLessonsForTopic(t);
            if (lessons.length > 0) {
              return !lessons.every((l: any) => isLessonCompleted(l, completedTasks, userState));
            }
            const tasks = t.tasks || [];
            return tasks.length === 0 || !tasks.every((tsk: any) => completedTasks.includes(tsk.id));
          });
          const currentActiveIdx = activeTopicIdx !== -1 ? activeTopicIdx : 0;
          const visibleTopics = currentSubject.topics.slice(0, visibleTopicsCount);
          const hasMoreTopics = visibleTopicsCount < currentSubject.topics.length;

          return (
            <motion.div 
              key={`topics-${selectedSubjectKey}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col w-full"
            >
              {/* Sub-header wyboru przedmiotu i postępu działów */}
              <header className="px-3 sm:px-6 py-2.5 sticky top-0 bg-[#0B0E14]/90 backdrop-blur-xl z-20 border-b border-white/5 shadow-sm shrink-0">
                <div className="max-w-3xl mx-auto w-full flex items-center justify-between gap-2.5">
                  <button
                    id="learn-subject-switcher-trigger"
                    onClick={() => {
                      triggerHaptic('light');
                      openSubjectSheet(true);
                    }}
                    className="flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-xl bg-[#101726] hover:bg-[#141C2D] border border-white/10 hover:border-[#FFB800]/40 transition-all cursor-pointer group active:scale-[0.98] shadow-sm min-w-0"
                    title="Kliknij, aby zmienić przedmiot"
                  >
                    <h1 className="font-display font-black text-white text-sm sm:text-base tracking-tight leading-none group-hover:text-[#FFB800] transition-colors truncate">
                      {currentSubject.name}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/25 shrink-0">
                      {currentSubject.key === 'math' ? 'Formuła 2023' : (currentSubject.level || 'Formuła 2023')}
                    </span>
                    <ChevronDown size={13} className="text-slate-400 group-hover:text-[#FFB800] transition-colors shrink-0" />
                  </button>

                  <div className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#101726] border border-white/10 text-[11px] font-bold text-[#8B8D98] whitespace-nowrap shadow-sm">
                    <span className="text-emerald-400 font-black">{completedTopicsCount}/{totalTopicsCount}</span>
                    <span>działów</span>
                  </div>
                </div>
              </header>
              
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

                    const cleanName = cleanTopicTitle(topic.name);
                    const formattedNumber = String(idx + 1).padStart(2, '0');

                    return (
                      <button 
                        key={topic.id || idx}
                        id={`topic-card-${topic.id || idx}`}
                        onClick={() => handleSelectTopic(idx, isLocked)}
                        style={{
                          contentVisibility: 'auto',
                          containIntrinsicSize: '0 100px'
                        }}
                        className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 group flex flex-col gap-2.5 relative overflow-hidden cursor-pointer active:scale-[0.99] ${
                          isBeaconTopic
                            ? 'bg-gradient-to-r from-[#151D2C] to-[#0E1420] border-[#FFB800] ring-1 ring-[#FFB800]/30 shadow-[0_4px_24px_rgba(255,184,0,0.15)]'
                            : isFullyCompleted
                              ? 'bg-[#0E1524] border-emerald-500/30 hover:border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.08)]'
                              : isLocked
                                ? 'bg-[#0B0F17]/60 border-white/5 opacity-60 hover:opacity-75'
                                : 'bg-[#101726] border-white/10 hover:border-white/20 shadow-sm'
                        }`}
                      >
                        {/* Wiersz 1 (Góra): Numer działu (np. "01") + Pastylka stanu po lewej, Liczba lekcji po prawej */}
                        <div className="flex items-center justify-between gap-2 w-full">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-black text-xs text-slate-300 bg-black/40 border border-white/10 px-2 py-0.5 rounded-lg tracking-wider">
                              {formattedNumber}
                            </span>
                            {isLocked ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
                                <Lock size={10} className="text-slate-400" />
                                <span>ZABLOKOWANY</span>
                              </span>
                            ) : isFullyCompleted ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                <CheckCircle2 size={11} className="text-emerald-400" />
                                <span>ZALICZONY</span>
                              </span>
                            ) : isBeaconTopic ? (
                              <ActiveBadge label="W TOKU" />
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-slate-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                                DOSTĘPNY
                              </span>
                            )}
                          </div>

                          <span className="text-[11px] font-semibold text-slate-400">
                            {topicLessonsCount > 0 ? `${topicLessonsCount} lekcji` : 'W opracowaniu'}
                          </span>
                        </div>

                        {/* Wiersz 2 (Środek): Duży, czytelny tytuł działu + wskaźnik wejścia */}
                        <div className="flex items-center justify-between gap-3 w-full">
                          <h2 className={`font-display font-black text-base sm:text-lg leading-snug break-words transition-colors ${
                            isLocked ? 'text-slate-400' : 'text-white group-hover:text-[#FFB800]'
                          }`}>
                            {cleanName}
                          </h2>

                          {!isLocked && (
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                              isBeaconTopic
                                ? 'bg-[#FFB800]/15 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-[#080B11] shadow-[0_0_12px_rgba(255,184,0,0.2)]'
                                : isFullyCompleted
                                  ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950'
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
                                  ? `Ukończono: ${completedTopicLessonsCount}/${topicLessonsCount} lekcji` 
                                  : `Postęp zadań: ${completedTopicTasks.length}/${allTopicTasks.length}`}
                            </span>
                            {!isLocked && (
                              <span className={isFullyCompleted ? "text-emerald-400 font-bold" : isBeaconTopic ? "text-[#FFB800] font-bold" : "text-slate-300 font-bold"}>
                                {progressPercent}%
                              </span>
                            )}
                          </div>
                          <div className="w-full h-1.5 bg-[#0B0E14] rounded-full overflow-hidden border border-white/5">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                isLocked 
                                  ? 'bg-transparent' 
                                  : isFullyCompleted
                                    ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                                    : isBeaconTopic 
                                      ? 'bg-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.6)]' 
                                      : 'bg-white/30'
                              }`} 
                              style={{ width: `${isLocked ? 0 : progressPercent}%` }} 
                            />
                          </div>
                        </div>
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
                    <div className="w-14 h-14 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.3)] border border-[#FFFBEB]/30 mb-2">
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
              <header className="px-4 py-2.5 sm:py-3 sticky top-0 bg-[#0B0E14]/95 backdrop-blur-md z-20 border-b border-white/5 shadow-sm shrink-0">
                <div className="max-w-3xl mx-auto w-full flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3 w-full">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button 
                        id="lessons-back-button"
                        onClick={handleBack}
                        className="w-9 h-9 rounded-xl bg-[#141A23] border border-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-sm shrink-0 cursor-pointer active:scale-95"
                        aria-label="Wróć do listy działów"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <h2 className="font-display font-black text-white text-base sm:text-lg leading-tight truncate">
                        {cleanTopicTitle(currentTopic.name)}
                      </h2>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101726] border border-white/10 text-[11px] font-bold text-[#8B8D98] whitespace-nowrap">
                      {totalLessonsCount > 0 ? (
                        <>
                          <span className="text-emerald-400 font-black">{completedLessonsCount}/{totalLessonsCount}</span>
                          <span>lekcji</span>
                        </>
                      ) : (
                        <span className="text-[#FFB800] font-semibold">W opracowaniu</span>
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
                      className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#141A23] border border-white/10 hover:border-[#FFB800]/40 text-[10px] sm:text-[11px] font-medium text-[#9CA3AF] transition-colors cursor-pointer group"
                      title="Zmień przedmiot"
                    >
                      <span className="text-slate-400 font-normal">Dział {(selectedTopicIndex ?? 0) + 1}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-white group-hover:text-[#FFB800] font-medium transition-colors">{currentSubject.name}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-[#FFB800] font-medium">{currentSubject.key === 'math' ? 'Nowa Formuła 2023' : (currentSubject.level || 'Nowa Formuła 2023')}</span>
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
                          <GraduationCap className="w-4 h-4 text-[#FFB800]" />
                          <span>Postęp Działu {(selectedTopicIndex ?? 0) + 1}:</span>
                        </span>
                        <span className="font-bold text-white">
                          <span className="text-emerald-400 font-extrabold">{completedLessonsCount}/{totalLessonsCount}</span> lekcji ukończonych ({progressPct}%)
                        </span>
                      </div>
                      {/* Minimalistyczny 6-milimetrowy (h-2) pasek postępu */}
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-white/10">
                        <div 
                          className="h-full bg-gradient-to-r from-[#D97706] to-[#FFB800] transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(255,184,0,0.5)]"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}

                {lessonsForCurrentTopic.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-[#141A23]/70 border border-white/10 rounded-3xl mt-4 sm:mt-6 max-w-md mx-auto shadow-xl">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFB800]/15 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800] mb-4 shadow-[0_0_20px_rgba(255,184,0,0.2)]">
                      <Sparkles size={28} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/25 px-3 py-1 rounded-full mb-3">
                      W opracowaniu • Dostępne wkrótce
                    </span>
                    <h3 className="text-lg sm:text-xl font-display font-black text-white mb-2">
                      {cleanTopicTitle(currentTopic.name)}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#8B8D98] leading-relaxed mb-4 max-w-xs">
                      {currentTopic.description || 'Struktura lekcji oraz baza zadań dla tego działu są przygotowywane zgodnie z wymogami Nowej Formuły 2023.'}
                    </p>
                    <div className="w-full bg-[#0B0E14] border border-white/5 rounded-xl p-3 mb-5 text-left text-xs text-slate-300 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>Waga w arkuszu maturalnym:</span>
                        <span className="text-[#FFB800] font-bold">{currentTopic.matura_points_range || '3–6 pkt'}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
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
                        className="w-full py-3.5 px-5 rounded-xl bg-[#FFB800] hover:bg-[#FFC72C] text-[#080B11] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.35)] active:scale-98 transition-all cursor-pointer"
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
                        lessonId: nextGroup.id,
                        lessonTitle: `${nextGroup.badge}: ${nextGroup.name}`,
                        tasks: nextTasksToRun,
                        firstTask: nextTasksToRun[0],
                        allTasks: nextGroup.tasks,
                        formulaSheet: nextPoolResult?.formulaSheet || null,
                        allTaskIdsToMarkCompleted: nextGroup.tasks.map((t: any) => t.id),
                        nextLesson: afterNextGroup ? {
                          isSession: true,
                          lessonId: afterNextGroup.id,
                          lessonTitle: `${afterNextGroup.badge}: ${afterNextGroup.name}`
                        } : null
                      } : null;

                      return (
                        <div 
                          key={group.id}
                          id={`lesson-card-${group.id}`}
                          className={`rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col gap-3.5 ${
                            isCompleted
                              ? 'border-emerald-500/30 bg-[#0E1524] shadow-[0_4px_20px_rgba(16,185,129,0.06)]'
                              : isCurrentActiveLesson
                                ? 'border-2 border-[#FFB800] bg-gradient-to-b from-[#151D2C] to-[#0E1420] shadow-[0_0_25px_rgba(255,184,0,0.22)] ring-1 ring-[#FFB800]/40'
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
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                                  : isCurrentActiveLesson
                                    ? 'bg-[#FFB800]/20 border border-[#FFB800] text-[#FFB800] shadow-[0_0_15px_rgba(255,184,0,0.3)]'
                                    : !isUnlocked
                                      ? 'bg-white/5 border-white/10 text-slate-500'
                                      : 'bg-white/5 border-white/10 text-slate-300'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle2 size={22} className="stroke-[2.5]" />
                                ) : !isUnlocked ? (
                                  <Lock size={18} />
                                ) : (
                                  <span className="font-display font-extrabold text-xs sm:text-sm">{group.id.replace('lesson-', '')}</span>
                                )}
                              </div>

                              {/* Tytuł i metadane */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider bg-[#080B10] px-2 py-0.5 rounded-full border border-white/5">
                                    {group.badge}
                                  </span>
                                  {isCompleted && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-emerald-300 bg-emerald-500/15 border border-emerald-500/40 px-2.5 py-0.5 rounded-full shadow-sm">
                                      ✓ ZALICZONA
                                    </span>
                                  )}
                                  {isCurrentActiveLesson && (
                                    <ActiveBadge label="AKTUALNA LEKCJA" />
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
                                  {group.name}
                                </h3>

                                {/* Szacowany czas i zadania w sesji - Bilans Skuteczności i dynamiczny wymóg */}
                                <div className="flex items-center gap-2.5 mt-1.5 text-xs text-slate-400 flex-wrap">
                                  {(() => {
                                    const reqTasks = group.required_correct_tasks || 4;
                                    const taskNoun = reqTasks === 1 ? 'poprawne zadanie' : reqTasks < 5 ? 'poprawne zadania' : 'poprawnych zadań';
                                    const lessonMistakesCount = getLessonMistakes(group.id);

                                    if (isCompleted) {
                                      const mistakesLabel = lessonMistakesCount === 1 
                                        ? '1 błąd poprawiony' 
                                        : lessonMistakesCount < 5 
                                          ? `${lessonMistakesCount} błędy poprawione` 
                                          : `${lessonMistakesCount} błędów poprawionych`;

                                      return (
                                        <>
                                          {lessonMistakesCount === 0 ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                                              <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                                              <span>Bezbłędnie (0 błędów) • {reqTasks}/{reqTasks} zadań</span>
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/25 text-slate-300 text-xs font-semibold">
                                              <RefreshCw size={11} className="text-[#38BDF8] shrink-0" />
                                              <span>Zaliczono z pętlą • <span className="text-[#38BDF8] font-bold">{mistakesLabel}</span></span>
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
                                className="w-full py-3.5 px-6 rounded-xl bg-[#FFB800] hover:bg-[#FFC72C] text-[#080B11] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.35)] active:scale-[0.98] transition cursor-pointer"
                              >
                                <Play size={16} fill="#080B11" strokeWidth={0} />
                                <span>ROZPOCZNIJ LEKCJĘ</span>
                                <ArrowRight size={16} strokeWidth={3} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* ================= AUTOMATYCZNY SPRAWDZIAN DZIAŁU (BOSS EXAM) ================= */}
                    {(() => {
                      const isBossExamPassed = completedTasks.includes('BOSS-EXAM-DZIAL-1') || completedTasks.includes('SPRAWDZIAN-DZIAL-1');
                      const completedCount = lessonsForCurrentTopic.filter(g => isLessonCompleted(g, completedTasks, userState)).length;
                      const allDone = completedCount === lessonsForCurrentTopic.length;

                      return (
                        <div 
                          id="boss-exam-dzial-1-card"
                          className={`rounded-3xl border-2 p-5 sm:p-6 flex flex-col gap-4 transition-all duration-300 mt-6 relative overflow-hidden ${
                            isBossExamPassed
                              ? 'bg-gradient-to-br from-[#101A14] via-[#0D1612] to-[#0A110E] border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                              : allDone
                                ? 'bg-gradient-to-br from-[#1A152C] via-[#141024] to-[#0D0B18] border-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.2)]'
                                : 'bg-gradient-to-br from-[#161724] via-[#11121C] to-[#0B0C14] border-white/15'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3.5">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                                isBossExamPassed
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                  : allDone
                                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                                    : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                              }`}>
                                <Trophy size={24} className="stroke-[2.2]" />
                              </div>

                              <div>
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300">
                                    Zwieńczenie Działu 1
                                  </span>
                                  {isBossExamPassed && (
                                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                                      ✓ MISTRZ LICZB RZECZYWISTYCH
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-display font-extrabold text-white text-lg sm:text-xl">
                                  SPRAWDZIAN DZIAŁU 1: LICZBY RZECZYWISTE
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                                  7 kluczowych zadań maturalnych (po 1 z lekcji 1.1–1.7) • Limit: 15 minut • Próg zaliczenia: 70% (5 z 7 zadań)
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Metadane sprawdzianu */}
                          <div className="grid grid-cols-3 gap-2 py-1 text-center">
                            <div className="bg-black/30 border border-white/5 rounded-xl p-2.5">
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Liczba Zadań</span>
                              <span className="text-sm font-extrabold text-white">7 pytań</span>
                            </div>
                            <div className="bg-black/30 border border-white/5 rounded-xl p-2.5">
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Limit Czasu</span>
                              <span className="text-sm font-extrabold text-[#FFB800]">15 minut</span>
                            </div>
                            <div className="bg-black/30 border border-white/5 rounded-xl p-2.5">
                              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Nagroda</span>
                              <span className="text-sm font-extrabold text-amber-400">+100 XP + Trofeum</span>
                            </div>
                          </div>

                          {/* Przycisk akcji sprawdzianu */}
                          <button
                            id="start-boss-exam-btn"
                            onClick={() => {
                              triggerHaptic('medium');
                              setIsBossExamOpen(true);
                            }}
                            className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition active:scale-[0.99] cursor-pointer shadow-lg ${
                              isBossExamPassed
                                ? 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40'
                                : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)]'
                            }`}
                          >
                            <Trophy size={18} />
                            <span>{isBossExamPassed ? 'POWTÓRZ SPRAWDZIAN DZIAŁU' : 'ROZPOCZNIJ SPRAWDZIAN DZIAŁU'}</span>
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
                className="relative z-[125] w-full max-w-lg md:max-w-[800px] bg-[#0E131C] border-t md:border border-white/10 rounded-t-3xl md:rounded-3xl p-5 sm:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.9)] flex flex-col gap-4 max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
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
                        ? 'border-[#FFB800] bg-gradient-to-br from-[#151D2C] via-[#111724] to-[#0E1420] ring-1 ring-[#FFB800]/40 shadow-[0_0_24px_rgba(255,184,0,0.22)]'
                        : 'border-white/10 bg-[#101726] hover:border-white/20 hover:bg-[#141C2C]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
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
                          <div className="flex-1 h-1.5 bg-[#0B0E14] rounded-full overflow-hidden border border-white/5">
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
                        className="w-6 h-6 rounded-full bg-[#FFB800] text-[#080B11] font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,184,0,0.4)]"
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
                        ? 'border-rose-500 bg-gradient-to-br from-[#2D161F] to-[#1C1217] ring-1 ring-rose-500/30 shadow-[0_0_24px_rgba(244,63,94,0.22)]'
                        : 'border-white/10 bg-[#141A23] hover:border-white/20 hover:bg-[#18202C]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-rose-400 flex items-center justify-center shrink-0">
                        <BookOpen size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display font-black text-white text-base">
                            Język Polski
                          </span>
                        </div>
                        <p className="text-xs text-[#8B8D98] truncate">
                          Epoki literackie • Lektury • Język w użyciu
                        </p>
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <div className="flex-1 h-1.5 bg-[#0B0E14] rounded-full overflow-hidden border border-white/5">
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
                        className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(244,63,94,0.4)]"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>

                  {/* 3. Język Angielski */}
                  <div
                    id="subject-card-eng"
                    onClick={() => {
                      triggerHaptic('medium');
                      setLockedToastMessage('Kurs Języka Angielskiego pojawi się w kolejnej aktualizacji!');
                      setShowLockedToast(true);
                      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
                      toastTimeoutRef.current = setTimeout(() => setShowLockedToast(false), 2500);
                    }}
                    className="p-4 rounded-2xl border border-white/5 bg-[#10141C]/70 opacity-70 hover:opacity-90 transition-all cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-slate-500 flex items-center justify-center shrink-0">
                        <Globe size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display font-black text-white/70 text-base">
                            Język Angielski
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                            <Lock size={10} className="text-slate-400" />
                            <span>Wkrótce</span>
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280] truncate">
                          Gramatyka • Słownictwo • Wypowiedź
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
          BOSS EXAM RUNNER: SPRAWDZIAN DZIAŁU 1 (MISTRZ LICZB RZECZYWISTYCH)
         ========================================================================= */}
      {isBossExamOpen && isMounted && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[150] bg-[#080C14] text-white">
          <BossExamRunner
            onCancel={() => setIsBossExamOpen(false)}
            onCompleteExam={(score, passed, xp, coins, badgeId) => {
              setIsBossExamOpen(false);
              if (onCompleteTask) {
                onCompleteTask(
                  ['BOSS-EXAM-DZIAL-1', 'SPRAWDZIAN-DZIAL-1'],
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

    </div>
  );
}
