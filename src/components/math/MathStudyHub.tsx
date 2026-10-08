import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Search,
  Filter,
  Layers,
  Award,
  Zap,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Flame,
  Clock,
  FileText,
  Calculator,
  Compass,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Target,
  Play,
  GraduationCap,
  Star,
  Check,
  Trophy,
  Lightbulb,
  LineChart,
  PieChart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathRenderer } from '../MathRenderer';
import { MathDiagram } from '../MathDiagram';
import { NumberLineDiagram } from '../NumberLineDiagram';
import { CkeFormulasModal } from '../CkeFormulasModal';
import { MATH_SECTIONS, MathSection, MathTask, MathTaskType } from '../../types/mathTypes';
import { ALL_MATH_TASKS } from '../../data/math/allMathTasks';
import { MATH_TOPIC_BLUEPRINTS, ALL_MATH_LESSONS, getMathLessonDocument } from '../../data/mathCurriculumData';
import { MathLessonView, MathLessonDefinitionData } from './MathLessonView';
import { triggerHaptic } from '../../utils';

export function ActiveBadge({ label = 'W TOKU' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full select-none text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/30 shadow-sm">
      <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 [animation-duration:2.5s] bg-[#FFB800]" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FFB800]" />
      </span>
      <span>{label}</span>
    </span>
  );
}

interface TaskAnswerState {
  selectedOptionId: string | null;
  numericAnswer: string;
  isSubmitted: boolean;
  isCorrect: boolean | null;
  showExplanation: boolean;
  attempts: number;
}

export interface MathStudyHubProps {
  onCompleteTask?: (taskId: string, pointsEarned: number) => void;
  onCompleteLesson?: (lessonId: string, pointsEarned: number) => void;
  completedLessonIds?: string[] | Record<string, any>;
  completedTaskIds?: string[];
  initialMode?: 'lessons' | 'task_browser';
  initialActiveTopicId?: string | null;
  initialActiveLessonId?: string | null;
  onStartTask?: (task: any) => void;
  onOpenAiTutor?: (contextPrompt: string) => void;
  onClose?: () => void;
  onOpenFormulaModal?: () => void;
  userState?: any;
}

export const MathStudyHub: React.FC<MathStudyHubProps> = ({
  onCompleteTask,
  onCompleteLesson,
  completedLessonIds: propCompletedLessonIds = [],
  completedTaskIds: propCompletedTaskIds = [],
  initialMode = 'lessons',
  initialActiveTopicId = null,
  initialActiveLessonId = null,
  onStartTask,
  onOpenAiTutor,
  onClose,
  onOpenFormulaModal,
  userState
}) => {
  const isDev = Boolean(userState?.isDev || userState?.isPro);

  // Main view mode: Kurs Lekcyjny (75 Lekcji Profilowanych) vs Baza Zadań CKE
  const [hubMode, setHubMode] = useState<'lessons' | 'task_browser'>(initialActiveLessonId ? 'lessons' : initialMode);

  // Aktywna lekcja (widok 3-etapowy MathLessonView - identyczny z polskim)
  const [activeLessonId, setActiveLessonId] = useState<string | null>(initialActiveLessonId || null);

  // Filtrowanie lekcji w kursie
  const [selectedLessonSection, setSelectedLessonSection] = useState<string | 'all'>('all');
  const [lessonSearchQuery, setLessonSearchQuery] = useState('');

  // Widok kursu: domyślnie 'sections_roadmap' (15 działów) - spójny z angielskim i polskim
  const [courseViewMode, setCourseViewMode] = useState<'lessons_grid' | 'sections_roadmap'>('sections_roadmap');

  // Mobile accordion state: domyślnie pierwszy dział jest rozwinięty
  const [expandedSectionIds, setExpandedSectionIds] = useState<Record<string, boolean>>(() => ({
    [MATH_SECTIONS[0]?.id || 'dzial-1']: true
  }));

  const toggleMobileSection = (id: string) => {
    triggerHaptic('light');
    setExpandedSectionIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Expanded section in course mode
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(initialActiveTopicId);

  // Sub-tabs inside expanded section: Lekcje Core-4 vs Baza Zadań Działu
  const [sectionInnerTab, setSectionInnerTab] = useState<'lessons' | 'tasks'>('lessons');

  // Active expanded Bento Core-4 pill ID inside lesson cards
  const [expandedLessonPillId, setExpandedLessonPillId] = useState<string | null>(null);

  // Formula Sheet Modal state
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [formulaModalTopic, setFormulaModalTopic] = useState<string>('all');

  // Completed tasks state
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    if (propCompletedTaskIds && propCompletedTaskIds.length > 0) return propCompletedTaskIds;
    try {
      const saved = localStorage.getItem('jasne_completed_math_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Task Browser Filters
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'closed' | 'open'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [taskPage, setTaskPage] = useState(1);
  const TASKS_PER_PAGE = 12;

  // Inline answers state for task browser
  const [answerStates, setAnswerStates] = useState<Record<string, TaskAnswerState>>({});

  // Filter tasks in task browser
  const filteredTasks = useMemo(() => {
    return ALL_MATH_TASKS.filter(task => {
      // Filter by section
      if (selectedSectionFilter !== 'all' && task.topicId !== selectedSectionFilter) {
        return false;
      }
      // Filter by closed vs open
      if (selectedTypeFilter === 'closed') {
        if (task.type !== 'SINGLE_CHOICE' && task.type !== 'TRUE_FALSE') return false;
      } else if (selectedTypeFilter === 'open') {
        if (task.type === 'SINGLE_CHOICE' || task.type === 'TRUE_FALSE') return false;
      }
      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const contentMatch = task.content.toLowerCase().includes(q);
        const sectionMatch = task.sectionTitle.toLowerCase().includes(q);
        const sourceMatch = (task.sourceYear || '').toLowerCase().includes(q);
        if (!contentMatch && !sectionMatch && !sourceMatch) return false;
      }
      return true;
    });
  }, [selectedSectionFilter, selectedTypeFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / TASKS_PER_PAGE));
  const displayedTasks = useMemo(() => {
    const start = (taskPage - 1) * TASKS_PER_PAGE;
    return filteredTasks.slice(start, start + TASKS_PER_PAGE);
  }, [filteredTasks, taskPage]);

  // Open CKE Formula Sheet for a specific section
  const handleOpenFormulas = (sectionId?: string) => {
    if (onOpenFormulaModal) {
      onOpenFormulaModal();
      return;
    }
    if (sectionId) {
      setFormulaModalTopic(sectionId);
    } else {
      setFormulaModalTopic('all');
    }
    setIsFormulaModalOpen(true);
  };

  // Inline answer selection
  const handleSelectOption = (taskId: string, optionId: string, correctAnswer?: string) => {
    const current = answerStates[taskId] || {
      selectedOptionId: null,
      numericAnswer: '',
      isSubmitted: false,
      isCorrect: null,
      showExplanation: false,
      attempts: 0
    };

    if (current.isSubmitted && current.isCorrect) return;

    const isCorrect = optionId.toUpperCase() === (correctAnswer || 'A').toUpperCase();
    const newAttempts = current.attempts + 1;

    setAnswerStates(prev => ({
      ...prev,
      [taskId]: {
        ...current,
        selectedOptionId: optionId,
        isSubmitted: true,
        isCorrect,
        showExplanation: true,
        attempts: newAttempts
      }
    }));

    if (isCorrect) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ffdca1', '#ffb800', '#10b981', '#ffffff']
      });

      if (!completedTaskIds.includes(taskId)) {
        const next = [...completedTaskIds, taskId];
        setCompletedTaskIds(next);
        try {
          localStorage.setItem('jasne_completed_math_tasks', JSON.stringify(next));
        } catch {}
        if (onCompleteTask) {
          onCompleteTask(taskId, 1);
        }
      }
    }
  };

  // Numeric input check
  const handleCheckNumeric = (taskId: string, correctAnswer?: string) => {
    const current = answerStates[taskId] || {
      selectedOptionId: null,
      numericAnswer: '',
      isSubmitted: false,
      isCorrect: null,
      showExplanation: false,
      attempts: 0
    };

    const cleanInput = current.numericAnswer.trim().replace(',', '.');
    const cleanExpected = String(correctAnswer || '').trim().replace(',', '.');
    const isCorrect = cleanInput.length > 0 && (cleanInput === cleanExpected || parseFloat(cleanInput) === parseFloat(cleanExpected));

    setAnswerStates(prev => ({
      ...prev,
      [taskId]: {
        ...current,
        isSubmitted: true,
        isCorrect,
        showExplanation: true,
        attempts: current.attempts + 1
      }
    }));

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#ffdca1', '#ffb800', '#10b981']
      });

      if (!completedTaskIds.includes(taskId)) {
        const next = [...completedTaskIds, taskId];
        setCompletedTaskIds(next);
        try {
          localStorage.setItem('jasne_completed_math_tasks', JSON.stringify(next));
        } catch {}
        if (onCompleteTask) {
          onCompleteTask(taskId, 2);
        }
      }
    }
  };

  // Ukończone lekcje
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    if (Array.isArray(propCompletedLessonIds) && propCompletedLessonIds.length > 0) {
      return propCompletedLessonIds;
    }
    try {
      const saved = localStorage.getItem('jasne_completed_math_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleCompleteLesson = (lessonId: string, pointsEarned: number) => {
    onCompleteLesson?.(lessonId, pointsEarned);
    setCompletedLessonIds((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      if (arr.includes(lessonId)) return arr;
      const updated = [...arr, lessonId];
      try {
        localStorage.setItem('jasne_completed_math_lessons', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    if (onCompleteTask) {
      onCompleteTask(`math-lesson-${lessonId}`, pointsEarned);
    }
  };

  // Filtrowanie lekcji w kursie
  const filteredLessons = useMemo(() => {
    return ALL_MATH_LESSONS.filter((lesson) => {
      if (selectedLessonSection !== 'all' && lesson.topicId !== selectedLessonSection) return false;
      if (lessonSearchQuery.trim()) {
        const q = lessonSearchQuery.toLowerCase();
        const matchTitle = lesson.title.toLowerCase().includes(q);
        const matchShort = lesson.short_title.toLowerCase().includes(q);
        const matchTopic = (lesson.topicTitle || '').toLowerCase().includes(q);
        const matchBadge = (lesson.badge || '').toLowerCase().includes(q);
        if (!matchTitle && !matchShort && !matchTopic && !matchBadge) return false;
      }
      return true;
    });
  }, [selectedLessonSection, lessonSearchQuery]);

  // Obsługa odpowiedzi w przeglądarce zadań
  const handleSubmitAnswer = (taskId: string) => {
    const task = ALL_MATH_TASKS.find(t => t.id === taskId);
    if (!task) return;
    const ans = answerStates[taskId];
    const correctAns = (task as any).correctAnswer || (task as any).correct_answer || '';
    if (task.type === 'SINGLE_CHOICE') {
      if (ans?.selectedOptionId) {
        handleSelectOption(taskId, ans.selectedOptionId, correctAns);
      }
    } else {
      handleCheckNumeric(taskId, correctAns);
    }
  };

  const handleResetTask = (taskId: string) => {
    setAnswerStates(prev => ({
      ...prev,
      [taskId]: {
        selectedOptionId: null,
        numericAnswer: '',
        isSubmitted: false,
        isCorrect: null,
        showExplanation: false,
        attempts: 0
      }
    }));
  };

  const handleToggleExplanation = (taskId: string) => {
    setAnswerStates(prev => {
      const cur = prev[taskId];
      if (!cur) return prev;
      return {
        ...prev,
        [taskId]: {
          ...cur,
          showExplanation: !cur.showExplanation
        }
      };
    });
  };

  // Jeśli użytkownik jest w trakcie aktywnej lekcji, wyświetl widok MathLessonView (identyczny z PolishLessonView)
  if (activeLessonId) {
    const lessonMeta = ALL_MATH_LESSONS.find(l => l.id === activeLessonId) || ALL_MATH_LESSONS[0];
    const lessonDoc = getMathLessonDocument(lessonMeta.topicId, activeLessonId);
    const fullLessonData: MathLessonDefinitionData = {
      ...lessonMeta,
      theory_pill: lessonDoc?.theory_pill || lessonMeta.theory_pill,
      tasks: lessonDoc?.tasks || []
    };

    return (
      <div key={activeLessonId} className="fixed inset-0 z-50 bg-[#070a0f] overflow-y-auto w-full h-full animate-pageTransition">
        <MathLessonView
          lesson={fullLessonData}
          onBack={() => {
            setActiveLessonId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNextLesson={() => {
            const currentIndex = ALL_MATH_LESSONS.findIndex(l => l.id === activeLessonId);
            if (currentIndex >= 0 && currentIndex < ALL_MATH_LESSONS.length - 1) {
              setActiveLessonId(ALL_MATH_LESSONS[currentIndex + 1].id);
            } else {
              setActiveLessonId(null);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onCompleteLesson={handleCompleteLesson}
          onOpenFormulas={handleOpenFormulas}
          userState={userState}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a0f] text-[#dfe2f1] font-sans pb-28 sm:pb-24">
      {/* Top Bar / Hub Header */}
      <header className="relative sm:sticky sm:top-0 z-30 bg-[#070a0f]/95 backdrop-blur-md border-b border-[#141d2e] px-3.5 py-2.5 sm:px-6 sm:py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-[#0e1522] hover:bg-[#141d2e] text-[#94a3b8] hover:text-[#ffdca1] transition-colors shrink-0 cursor-pointer"
                title="Wróć"
              >
                ←
              </button>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 shrink-0">
                  Formuła 2023
                </span>
                <h1 className="text-base sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5 truncate">
                  <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdca1] shrink-0" />
                  <span>Matematyka CKE</span>
                </h1>
              </div>
              <p className="text-xs text-[#94a3b8] hidden sm:block mt-0.5">
                15 działów tematycznych • 211 autentycznych zadań z matur • Karta Wzorów 2023
              </p>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            <button
              onClick={() => handleOpenFormulas()}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0e1522] hover:bg-[#141d2e] border border-[#ffb800]/30 text-[#ffdca1] text-xs font-medium transition-all shadow-sm cursor-pointer"
              title="Otwórz oficjalną kartę wzorów CKE"
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffb800]" />
              <span className="hidden sm:inline">Karta Wzorów CKE</span>
              <span className="sm:hidden text-[11px]">Wzory</span>
            </button>

            {userState && (
              <div className="hidden sm:flex items-center gap-2 sm:gap-3 bg-[#0e1522] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#141d2e] text-[11px] sm:text-xs">
                <span className="flex items-center gap-1 text-rose-400 font-semibold" title="Serca">
                  ❤️ {userState.hearts ?? 5}
                </span>
                <span className="flex items-center gap-1 text-[#ffdca1] font-semibold" title="Monety">
                  🪙 {userState.coins ?? 0}
                </span>
                <span className="flex items-center gap-1 text-orange-400 font-semibold" title="Dni streaku">
                  <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-orange-500" /> {userState.streakDays ?? 0}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="max-w-7xl mx-auto mt-2.5 flex border-b border-[#141d2e] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setHubMode('lessons')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
              hubMode === 'lessons'
                ? 'border-[#ffdca1] text-[#ffdca1] bg-[#ffb800]/5'
                : 'border-transparent text-[#94a3b8] hover:text-[#dfe2f1]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Kurs Lekcyjny <span className="hidden sm:inline">(15 Działów • 75 Lekcji)</span></span>
          </button>
          <button
            onClick={() => setHubMode('task_browser')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors shrink-0 whitespace-nowrap cursor-pointer ${
              hubMode === 'task_browser'
                ? 'border-[#ffdca1] text-[#ffdca1] bg-[#ffb800]/5'
                : 'border-transparent text-[#94a3b8] hover:text-[#dfe2f1]'
            }`}
          >
            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Baza Zadań CKE ({filteredTasks.length})</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main id="learn-scroll-content" className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
        {/* ================================================================= */}
        {/* TRYB 1: KURS LEKCYJNY (DOKŁADNIE JAK W JĘZYKU POLSKIM)            */}
        {/* ================================================================= */}
        {hubMode === 'lessons' && !expandedSectionId && (
          <div className="space-y-6 animate-fadeIn">
            {/* Baner Tytułowy Kursu */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0e1522] p-4 sm:p-5 rounded-xl border border-[#141d2e]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#ffb800]/10 border border-[#ffb800]/20 text-[#ffdca1] text-xs font-bold">
                    Kompletny Kurs Maturalny CKE
                  </span>
                  <span className="text-xs text-[#94a3b8]">15 Działów • 75 Lekcji Profilowanych (15–45 min)</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Ścieżka Opanowania Podstawy Programowej CKE
                </h2>
                <p className="text-xs text-[#94a3b8] mt-1">
                  Wstęp teoretyczny z patentami CKE • Praktyka na autentycznych zadaniach CKE • Podsumowanie i eliminacja błędów kardynalnych.
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-xs text-[#94a3b8]">Ukończone lekcje:</span>
                  <div className="text-sm font-bold text-[#ffdca1]">
                    {isDev ? ALL_MATH_LESSONS.length : (Array.isArray(completedLessonIds) ? completedLessonIds.length : Object.keys(completedLessonIds || {}).length)} / {ALL_MATH_LESSONS.length} lekcji CKE
                  </div>
                </div>

                {/* Przełącznik widoku: Siatka lekcji vs Roadmapa Działów */}
                <div className="flex items-center gap-1 bg-[#070a0f] p-1 rounded-xl border border-[#141d2e]">
                  <button
                    onClick={() => setCourseViewMode('lessons_grid')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      courseViewMode === 'lessons_grid'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1] border border-[#ffb800]/30 shadow-xs'
                        : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                    }`}
                  >
                    Siatka lekcji ({filteredLessons.length})
                  </button>
                  <button
                    onClick={() => setCourseViewMode('sections_roadmap')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      courseViewMode === 'sections_roadmap'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1] border border-[#ffb800]/30 shadow-xs'
                        : 'text-[#94a3b8] hover:text-[#dfe2f1]'
                    }`}
                  >
                    Działy CKE (15)
                  </button>
                </div>
              </div>
            </div>

            {/* WIDOK 1A: SIATKA LEKCJI CKE (IDENTYCZNY JAK W POLSKIM) */}
            {courseViewMode === 'lessons_grid' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Filtry Działów i Wyszukiwarka Lekcji */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    <button
                      onClick={() => setSelectedLessonSection('all')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        selectedLessonSection === 'all'
                          ? 'bg-[#ffb800]/15 border border-[#ffb800]/40 text-[#ffdca1] font-bold shadow-sm'
                          : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1] hover:border-[#1e293b]'
                      }`}
                    >
                      Wszystkie działy ({ALL_MATH_LESSONS.length})
                    </button>
                    {MATH_SECTIONS.map((sec) => {
                      const count = ALL_MATH_LESSONS.filter(l => l.topicId === sec.id).length;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => setSelectedLessonSection(sec.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                            selectedLessonSection === sec.id
                              ? 'bg-[#ffb800]/15 border border-[#ffb800]/40 text-[#ffdca1] font-bold shadow-sm'
                              : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1] hover:border-[#1e293b]'
                          }`}
                        >
                          {sec.numericId}. {sec.short_title} ({count})
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative w-full sm:w-72 shrink-0">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input
                      type="text"
                      placeholder="Szukaj lekcji, działu, pojęcia..."
                      value={lessonSearchQuery}
                      onChange={(e) => setLessonSearchQuery(e.target.value)}
                      className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#dfe2f1] placeholder-[#94a3b8] focus:outline-none focus:border-[#ffdca1] shadow-sm"
                    />
                  </div>
                </div>

                {/* Siatka Kart Lekcji */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLessons.map((lesson) => {
                    const isCompleted = isDev || (Array.isArray(completedLessonIds) ? completedLessonIds.includes(lesson.id) : !!(completedLessonIds as any)?.[lesson.id]);
                    const lessonDoc = getMathLessonDocument(lesson.topicId, lesson.id);
                    const taskCount = lessonDoc?.tasks?.length || 5;

                    return (
                      <div
                        key={lesson.id}
                        className={`p-5 rounded-xl border transition-all flex flex-col justify-between gap-4 bg-[#0e1522] ${
                          isCompleted
                            ? 'border-emerald-500/40 ring-1 ring-emerald-500/20'
                            : 'border-[#141d2e] hover:border-[#1e293b] hover:bg-[#121b2b]'
                        }`}
                      >
                        <div className="space-y-3">
                          {/* Górny pasek tagów */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20">
                                {lesson.badge || `Lekcja ${lesson.order}`}
                              </span>
                              <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-[#070a0f] text-[#94a3b8] border border-[#141d2e] flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#ffb800]" />
                                {lesson.estimated_time_formatted || '~5 min'}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-lg text-[11px] font-medium bg-[#070a0f] text-[#dfe2f1] border border-[#141d2e]">
                                {lesson.topicShortTitle || lesson.topicTitle}
                              </span>
                              {lesson.archetypeCode && (
                                <span className="px-2 py-0.5 rounded-lg text-[11px] font-mono bg-[#070a0f] text-[#ffb800] border border-[#141d2e]">
                                  {lesson.archetypeCode}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Tytuł i Podtytuł */}
                          <div>
                            <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                              {lesson.title}
                            </h3>
                            <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                              {lesson.short_title}
                            </p>
                          </div>

                          {/* Przegląd 3-stopniowej sesji */}
                          <div className="bg-[#070a0f]/60 rounded-xl p-3 border border-[#141d2e] space-y-1.5 text-[11px]">
                            <div className="flex items-center gap-2 text-[#dfe2f1]">
                              <span className="w-4 h-4 rounded-full bg-[#ffb800]/20 text-[#ffdca1] flex items-center justify-center text-[10px] font-bold shrink-0">
                                1
                              </span>
                              <span className="truncate">
                                <strong>Wstęp:</strong> {(lesson.theory_pill?.concept_essence || '').slice(0, 75)}...
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[#dfe2f1]">
                              <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                                2
                              </span>
                              <span>
                                <strong>Praktyka:</strong> Zadania CKE ({taskCount} zadań maturalnych)
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[#dfe2f1]">
                              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                                3
                              </span>
                              <span className="truncate">
                                <strong>Podsumowanie:</strong> Pułapki egzaminatora CKE i karta wzorów
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Dolny pasek akcji */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#141d2e]">
                          <div className="text-xs">
                            {isCompleted ? (
                              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" /> Ukończona (+150 XP)
                              </span>
                            ) : (
                              <span className="text-[#94a3b8] text-[11px]">Do zrealizowania</span>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              setActiveLessonId(lesson.id);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#ffb800]/10 transition-all cursor-pointer"
                          >
                            <span>Rozpocznij lekcję</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* WIDOK 1B: ROADMAPA 15 DZIAŁÓW */}
            {courseViewMode === 'sections_roadmap' && (
              <div className="space-y-4 animate-fadeIn">
                {/* Mobile accordion controls */}
                <div className="sm:hidden flex items-center justify-between text-xs text-[#94a3b8] px-1">
                  <span>Dotknij dział, aby rozwinąć lekcje:</span>
                  <button
                    type="button"
                    onClick={() => {
                      triggerHaptic('light');
                      const allOpen = Object.keys(expandedSectionIds).length >= MATH_SECTIONS.length;
                      if (allOpen) {
                        setExpandedSectionIds({});
                      } else {
                        const all: Record<string, boolean> = {};
                        MATH_SECTIONS.forEach(s => { all[s.id] = true; });
                        setExpandedSectionIds(all);
                      }
                    }}
                    className="text-primary font-bold hover:underline cursor-pointer"
                  >
                    {Object.keys(expandedSectionIds).length >= MATH_SECTIONS.length ? 'Zwiń wszystkie' : 'Rozwiń wszystkie'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
                {MATH_SECTIONS.map((sec) => {
                  const sectionTasks = ALL_MATH_TASKS.filter(t => t.topicId === sec.id);
                  const blueprint = MATH_TOPIC_BLUEPRINTS.find(b => b.id === sec.id);
                  const sectionLessons = blueprint?.lessons || [];
                  const completedLessonsCount = isDev
                    ? (sectionLessons.length || 5)
                    : sectionLessons.filter(l =>
                        Array.isArray(completedLessonIds)
                          ? completedLessonIds.includes(l.id)
                          : typeof completedLessonIds === 'object' && completedLessonIds !== null && !!(completedLessonIds as any)[l.id]
                      ).length;
                  const totalLessonsCount = sectionLessons.length || 5;
                  const progressPct = isDev ? 100 : (totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0);
                  const isExpanded = !!expandedSectionIds[sec.id];

                  return (
                    <div
                      key={sec.id}
                      className={`bg-[#0e1522] border rounded-xl p-3.5 sm:p-5 shadow-sm flex flex-col justify-between transition-all duration-200 group/card min-w-0 overflow-hidden ${
                        isExpanded ? 'border-primary/40' : 'border-[#141d2e] hover:border-[#1e293b]'
                      }`}
                    >
                      <div className="min-w-0">
                        {/* Górny nagłówek z numerem i wagą CKE (klikalny na mobile jako akordeon) */}
                        <div 
                          onClick={() => toggleMobileSection(sec.id)}
                          className="flex items-center justify-between gap-2 min-w-0 cursor-pointer sm:cursor-default select-none pb-1"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/20 flex items-center justify-center text-[#ffdca1] shrink-0 group-hover/card:scale-105 transition-transform">
                              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdca1]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] font-bold uppercase text-[#ffdca1] bg-[#ffb800]/10 px-2 py-0.5 rounded-md border border-[#ffb800]/20 shrink-0">
                                  Dział {sec.numericId}
                                </span>
                                <span className="text-[10px] text-[#94a3b8] font-medium truncate max-w-[120px]">
                                  Formuła 2023
                                </span>
                              </div>
                              <h4 className="text-xs sm:text-sm font-bold text-white leading-tight mt-1 truncate">
                                {sec.short_title}
                              </h4>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] sm:text-[11px] font-bold text-[#ffdca1] px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#ffb800]/10 border border-[#ffb800]/20 rounded-lg">
                              {sec.points_range}
                            </span>
                            <span className={`sm:hidden p-1 rounded-md text-text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180 text-primary' : ''}`}>
                              <ChevronDown size={15} />
                            </span>
                          </div>
                        </div>

                        {/* Mini pasek postępu gdy zwinięte na mobile */}
                        {!isExpanded && (
                          <div className="sm:hidden mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#94a3b8]">
                            <span>Postęp: <strong className="text-[#ffdca1]">{completedLessonsCount}/{sectionLessons.length || 5}</strong></span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-[#070a0f] rounded-full overflow-hidden border border-[#141d2e]">
                                <div
                                  className="h-full bg-gradient-to-r from-[#ea580c] to-[#ffb800] rounded-full"
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-[#ffdca1] font-bold">{progressPct}%</span>
                            </div>
                          </div>
                        )}

                        {/* Rozwijana zawartość na mobile (zawsze widoczna na desktopie >= 640px) */}
                        <div className={`${isExpanded ? 'block' : 'hidden sm:block'} pt-2`}>
                          <p className="text-xs text-[#94a3b8] leading-relaxed mb-3 line-clamp-2 break-words">
                            {sec.description}
                          </p>

                          {/* ŚCIEŻKA 5 MIKROLEKCJI (MINI ROADMAP) */}
                          <div className="space-y-1.5 my-3 p-3 rounded-xl bg-[#070a0f] border border-[#141d2e] min-w-0">
                            <div className="flex items-center justify-between text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-1 min-w-0">
                              <span className="truncate">Ścieżka mikrolekcji Core-4:</span>
                              <span className="text-[#ffdca1] font-mono shrink-0 ml-1">{completedLessonsCount}/{sectionLessons.length || 5}</span>
                            </div>
                            {sectionLessons.map((l, lIdx) => {
                              const isLComp = isDev || (Array.isArray(completedLessonIds)
                                ? completedLessonIds.includes(l.id)
                                : typeof completedLessonIds === 'object' && completedLessonIds !== null && !!(completedLessonIds as any)[l.id]);
                              return (
                                <div key={l.id} className="flex items-center justify-between text-xs py-0.5 gap-2 min-w-0">
                                  <div className="flex items-center gap-2 min-w-0 flex-1">
                                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                                      isLComp ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-[#0e1522] text-[#94a3b8] border border-[#141d2e]'
                                    }`}>
                                      {isLComp ? '✓' : `${sec.numericId}.${lIdx + 1}`}
                                    </span>
                                    <span className={`truncate text-xs min-w-0 flex-1 ${isLComp ? 'text-[#94a3b8] line-through' : 'text-[#dfe2f1] font-medium'}`}>
                                      {l.short_title || l.title}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-[#94a3b8]/80 font-mono shrink-0">{l.estimated_time_formatted || '~5 min'}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* PASEK POSTĘPU DZIAŁU */}
                          <div className="space-y-1.5 mb-4 min-w-0">
                            <div className="flex items-center justify-between text-xs min-w-0 gap-2">
                              <span className="text-[#94a3b8] font-medium truncate">Postęp działu:</span>
                              <span className="font-bold text-[#ffdca1] shrink-0">
                                {completedLessonsCount} / {sectionLessons.length || 5} lekcji ({progressPct}%)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-[#070a0f] rounded-full overflow-hidden border border-[#141d2e]">
                              <div
                                className="h-full bg-gradient-to-r from-[#ea580c] to-[#ffb800] transition-all duration-300 rounded-full"
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PRZYCISKI AKCJI KARTY */}
                      <div className={`${isExpanded ? 'block' : 'hidden sm:block'} space-y-2 pt-2 border-t border-[#141d2e] min-w-0`}>
                        <button
                          onClick={() => {
                            setExpandedSectionId(sec.id);
                            setSectionInnerTab('lessons');
                          }}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:brightness-110 text-[#070a0f] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer min-w-0"
                        >
                          <Play className="w-3.5 h-3.5 fill-[#070a0f] shrink-0" />
                          <span className="truncate">Otwórz dział i 5 lekcji</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </button>

                      <button
                        onClick={() => {
                          setSelectedSectionFilter(sec.id);
                          setHubMode('task_browser');
                          setTaskPage(1);
                        }}
                        className="w-full py-2 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-w-0"
                      >
                        <Target className="w-3.5 h-3.5 text-[#ffb800] shrink-0" />
                        <span className="truncate">Przeglądaj wszystkie {sectionTasks.length} zadań CKE</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    )}

        {/* ================================================================= */}
        {/* TRYB 1B: ROZWINIĘTY DZIAŁ Z 3 LEKCJAMI CORE-4                      */}
        {/* ================================================================= */}
        {hubMode === 'lessons' && expandedSectionId && (() => {
          const currentSection = MATH_SECTIONS.find(s => s.id === expandedSectionId);
          if (!currentSection) return null;

          const blueprint = MATH_TOPIC_BLUEPRINTS.find(b => b.id === currentSection.id);
          const sectionLessons = blueprint?.lessons || [];
          const sectionTasks = ALL_MATH_TASKS.filter(t => t.topicId === currentSection.id);

          const handleStartLessonDirect = (lesson: any) => {
            setActiveLessonId(lesson.id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };

          return (
            <div className="space-y-6">
              {/* PRZYCISK POWROTU & SUB-TABS */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setExpandedSectionId(null)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0e1522] border border-[#141d2e] text-xs font-semibold text-[#94a3b8] hover:text-[#dfe2f1] hover:bg-[#141d2e] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#ffdca1]" />
                  Wróć do wszystkich 15 działów
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSectionInnerTab('lessons')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      sectionInnerTab === 'lessons'
                        ? 'bg-[#ffb800]/15 border border-[#ffb800]/40 text-[#ffdca1] shadow-sm'
                        : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1]'
                    }`}
                  >
                    5 Lekcji Core-4
                  </button>
                  <button
                    onClick={() => setSectionInnerTab('tasks')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      sectionInnerTab === 'tasks'
                        ? 'bg-[#ffb800]/15 border border-[#ffb800]/40 text-[#ffdca1] shadow-sm'
                        : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1]'
                    }`}
                  >
                    Baza Zadań Działu ({sectionTasks.length})
                  </button>
                </div>
              </div>

              {/* BANER DZIAŁU */}
              <div className="bg-[#0e1522] border border-[#141d2e] rounded-xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/20 flex items-center justify-center text-[#ffdca1] shrink-0">
                      <Calculator className="w-6 h-6 text-[#ffdca1]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 text-xs font-bold">
                          Dział {currentSection.numericId}
                        </span>
                        <span className="text-xs font-semibold text-[#94a3b8]">
                          Formuła 2023
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-white">
                        {currentSection.title}
                      </h2>
                      <p className="text-xs text-[#94a3b8] mt-1 max-w-2xl leading-relaxed">
                        {currentSection.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-[#070a0f] border border-[#141d2e] text-xs font-bold text-[#ffdca1]">
                      Waga CKE: {currentSection.points_range}
                    </span>
                    <button
                      onClick={() => handleOpenFormulas(currentSection.id)}
                      className="flex items-center gap-1.5 text-xs text-[#ffb800] hover:underline"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Karta wzorów ({currentSection.cke_formula_page || 'strony'})</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SUB-TAB 1: LEKCJE CORE-4 */}
              {sectionInnerTab === 'lessons' && (
                <div className="space-y-4">
                  {/* PASEK POSTĘPU DZIAŁU */}
                  {(() => {
                    const completedLessonsCount = isDev
                      ? (sectionLessons.length || 5)
                      : sectionLessons.filter(l =>
                          Array.isArray(completedLessonIds)
                            ? completedLessonIds.includes(l.id)
                            : typeof completedLessonIds === 'object' && completedLessonIds !== null && !!(completedLessonIds as any)[l.id]
                        ).length;
                    const totalLessonsCount = sectionLessons.length || 5;
                    const progressPct = isDev ? 100 : (totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0);

                    return (
                      <div className="bg-[#0e1522] border border-[#141d2e] rounded-xl p-4 sm:p-5 shadow-sm flex flex-col gap-2.5 mb-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-[#dfe2f1] font-semibold flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-[#ffb800]" />
                            <span>Postęp Działu {currentSection.numericId}:</span>
                          </span>
                          <span className="font-bold text-white">
                            <span className="text-[#ffdca1] font-extrabold">{completedLessonsCount}/{totalLessonsCount}</span> lekcji zaliczonych ({progressPct}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#070a0f] overflow-hidden border border-[#141d2e]">
                          <div
                            className="h-full bg-gradient-to-r from-[#ea580c] to-[#ffb800] shadow-sm transition-all duration-500 rounded-full"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#dfe2f1] uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#ffb800]" />
                      <span>Program Mikrolekcji Core-4 (5 lekcji)</span>
                    </h3>
                    <span className="text-xs text-[#94a3b8]">
                      Czas przejścia: ok. 5 min / lekcja
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {sectionLessons.map((lesson, idx) => {
                      const isLessonCompleted = isDev || (Array.isArray(completedLessonIds)
                        ? completedLessonIds.includes(lesson.id)
                        : typeof completedLessonIds === 'object' && completedLessonIds !== null && !!(completedLessonIds as any)[lesson.id]);
                      const firstUncompletedIdx = sectionLessons.findIndex(l => {
                        const done = isDev || (Array.isArray(completedLessonIds)
                          ? completedLessonIds.includes(l.id)
                          : typeof completedLessonIds === 'object' && completedLessonIds !== null && !!(completedLessonIds as any)[l.id]);
                        return !done;
                      });
                      const isCurrentActiveLesson = !isLessonCompleted && (firstUncompletedIdx === -1 ? idx === 0 : firstUncompletedIdx === idx);
                      const isPillOpen = expandedLessonPillId === lesson.id;

                      return (
                        <div
                          key={lesson.id}
                          className={`rounded-xl border transition-all duration-200 p-4 sm:p-5 flex flex-col gap-4 shadow-sm min-w-0 overflow-hidden ${
                            isLessonCompleted
                              ? 'border-emerald-500/30 bg-emerald-950/10'
                              : isCurrentActiveLesson
                                ? 'border-[#ffdca1] bg-[#0e1522] ring-1 ring-[#ffdca1]/30'
                                : 'border-[#141d2e] bg-[#0e1522]'
                          }`}
                        >
                          {/* GÓRNA CZĘŚĆ KARTY LEKCJI */}
                          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 min-w-0">
                            <div className="flex items-start gap-3.5 min-w-0 flex-1 w-full xl:w-auto">
                              {/* NUMER LUB ZNACZNIK STATUSU */}
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 transition-all ${
                                isLessonCompleted
                                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                  : isCurrentActiveLesson
                                    ? 'bg-[#ffb800]/15 border border-[#ffdca1] text-[#ffdca1]'
                                    : 'bg-[#070a0f] border-[#141d2e] text-[#94a3b8]'
                              }`}>
                                {isLessonCompleted ? (
                                  <CheckCircle2 size={20} className="stroke-[2.5]" />
                                ) : (
                                  <span className="font-bold text-xs sm:text-sm">
                                    {currentSection.numericId}.{idx + 1}
                                  </span>
                                )}
                              </div>

                              {/* TYTUŁ I METADANE LEKCJI */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap min-w-0">
                                  <span className="text-[10px] font-bold uppercase text-[#94a3b8] tracking-wider bg-[#070a0f] px-2 py-0.5 rounded-full border border-[#141d2e] shrink-0">
                                    LEKCJA {currentSection.numericId}.{idx + 1}
                                  </span>
                                  {isLessonCompleted && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-300 bg-emerald-500/15 border border-emerald-500/40 px-2.5 py-0.5 rounded-full shadow-sm shrink-0">
                                      ✓ ZALICZONA
                                    </span>
                                  )}
                                  {isCurrentActiveLesson && (
                                    <ActiveBadge label="AKTUALNA LEKCJA" />
                                  )}
                                </div>

                                <h4 className="font-bold text-base sm:text-lg text-white leading-snug break-words">
                                  {lesson.title}
                                </h4>
                                <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed break-words">
                                  {lesson.short_title} • {lesson.theory_pill.matura_context}
                                </p>

                                <div className="flex items-center gap-2.5 mt-2 text-xs text-[#94a3b8] flex-wrap min-w-0">
                                  <span className="flex items-center gap-1 text-[#dfe2f1] font-medium">
                                    <Clock className="w-3.5 h-3.5 text-[#ffb800] shrink-0" />
                                    <span>{lesson.estimated_time_formatted || '~5 min'}</span>
                                  </span>
                                  <span>•</span>
                                  <span className="text-white font-medium">
                                    Wymóg: Zadania CKE
                                  </span>
                                  <span>•</span>
                                  <span className="text-[#ffdca1] font-medium flex items-center gap-1">
                                    <Star className="w-3 h-3 text-[#ffb800] shrink-0" />
                                    Pewniaki CKE
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* PRZYCISKI AKCJI LEKCJI */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full xl:w-auto pt-2 xl:pt-0 shrink-0 min-w-0">
                              <button
                                onClick={() => setExpandedLessonPillId(isPillOpen ? null : lesson.id)}
                                className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer min-w-0 flex-1 sm:flex-none text-center ${
                                  isPillOpen
                                    ? 'bg-[#ffb800]/15 border-[#ffdca1] text-[#ffdca1] shadow-sm'
                                    : 'bg-[#070a0f] hover:bg-[#141d2e] border-[#141d2e] text-[#dfe2f1] hover:text-white'
                                }`}
                              >
                                <Lightbulb className="w-4 h-4 text-[#ffb800] shrink-0" />
                                <span className="truncate">{isPillOpen ? 'Zwiń zasady' : 'Karty wiedzy & Strategia CKE'}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 shrink-0 ${isPillOpen ? 'rotate-180' : ''}`} />
                              </button>

                              {isLessonCompleted ? (
                                <button
                                  onClick={() => handleStartLessonDirect(lesson)}
                                  className="px-5 py-2.5 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] hover:border-[#ffdca1]/40 text-[#dfe2f1] hover:text-[#ffdca1] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer min-w-0 flex-1 sm:flex-none text-center"
                                >
                                  <RotateCcw size={15} className="stroke-[2.5] text-[#ffdca1] shrink-0" />
                                  <span>POWTÓRZ MISJĘ</span>
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStartLessonDirect(lesson)}
                                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:brightness-110 text-[#070a0f] shadow-sm min-w-0 flex-1 sm:flex-none text-center"
                                >
                                  <Play size={15} fill="#070a0f" strokeWidth={0} className="shrink-0" />
                                  <span>ROZPOCZNIJ LEKCJĘ</span>
                                  <ArrowRight size={15} strokeWidth={3} className="shrink-0" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* ROZWIJANA PIGUŁKA BENTO W STYLU GAME HUD */}
                          {isPillOpen && (
                            <div className="mt-3 pt-5 border-t border-[#141d2e] space-y-6 animate-fadeIn min-w-0 overflow-hidden">
                              {/* NAGŁÓWEK BENTO HUD */}
                              <div className="flex items-center justify-between p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] shadow-sm min-w-0 gap-2">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-9 h-9 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/20 flex items-center justify-center text-[#ffdca1] font-bold shrink-0">
                                    <BookOpen className="w-5 h-5 text-[#ffdca1]" />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-[10px] font-bold uppercase text-[#ffdca1] tracking-wider block truncate">
                                      BENTO CORE-4 • ZESTAW WIEDZY
                                    </span>
                                    <h3 className="text-sm sm:text-base font-bold text-white truncate">
                                      Pigułka Wiedzy Bento & Strategia CKE
                                    </h3>
                                  </div>
                                </div>
                                <span className="text-xs font-mono font-bold text-[#ffdca1] bg-[#ffb800]/10 border border-[#ffb800]/20 px-3 py-1 rounded-full hidden sm:inline-block shrink-0">
                                  FORMUŁA 2023
                                </span>
                              </div>

                              {/* SEKCJA 1: PEWNIAKI MATURALNE & WZORY */}
                              <div className="p-4 sm:p-5 md:p-6 rounded-xl bg-[#070a0f] border border-[#ffb800]/30 space-y-5 shadow-sm min-w-0 overflow-hidden">
                                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#141d2e] min-w-0">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/30 flex items-center justify-center text-[#ffdca1] shrink-0">
                                      <Star className="w-5 h-5 text-[#ffdca1]" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[10px] font-bold uppercase text-[#ffdca1] tracking-wider">
                                          PEWNIAKI MATURALNE
                                        </span>
                                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 tracking-wider shrink-0">
                                          🔥 100% CKE STANDARD
                                        </span>
                                      </div>
                                      <h4 className="text-base sm:text-lg font-bold text-white break-words">
                                        Istota Konceptu & Żelazne Wzory
                                      </h4>
                                    </div>
                                  </div>
                                  <span className="text-xs font-mono font-bold text-[#ffdca1] bg-[#ffb800]/10 border border-[#ffb800]/20 px-3 py-1 rounded-full hidden sm:inline-block shrink-0">
                                    PUNKTOWANIE CKE
                                  </span>
                                </div>

                                <div className="text-sm sm:text-base text-[#dfe2f1] leading-relaxed break-words">
                                  <MathRenderer content={lesson.theory_pill.concept_essence} />
                                </div>

                                {/* Formuły KaTeX */}
                                {lesson.theory_pill.core_formulas && lesson.theory_pill.core_formulas.length > 0 && (
                                  <div className="space-y-2 pt-2">
                                    <div className="text-xs font-bold uppercase tracking-wider text-[#ffdca1] flex items-center gap-1.5">
                                      <Compass className="w-3.5 h-3.5 text-[#ffb800]" />
                                      <span>Kluczowe Wzory Egzaminacyjne (Karta CKE):</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {lesson.theory_pill.core_formulas.map((f: any, fIdx: number) => (
                                        <div key={fIdx} className="p-3 rounded-xl bg-[#0e1522] border border-[#141d2e] space-y-1">
                                          <div className="text-[11px] font-semibold text-[#94a3b8]">{f.name}</div>
                                          <div className="text-sm font-mono text-[#ffdca1] bg-[#070a0f] p-2 rounded-lg border border-[#141d2e]">
                                            <MathRenderer content={`$$${f.formula}$$`} />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Key Points */}
                                {lesson.theory_pill.key_points && lesson.theory_pill.key_points.length > 0 && (
                                  <div className="pt-2">
                                    <div className="p-4 rounded-xl bg-[#0e1522] border border-[#141d2e] space-y-2">
                                      <div className="text-xs font-bold uppercase text-[#ffdca1] tracking-wider">
                                        Z polskiego na nasze (Kluczowe Zasady):
                                      </div>
                                      <ul className="space-y-1.5 text-xs text-[#dfe2f1]">
                                        {lesson.theory_pill.key_points.map((pt: string, ptIdx: number) => (
                                          <li key={ptIdx} className="flex items-start gap-2">
                                            <span className="text-[#ffb800] shrink-0 font-bold">•</span>
                                            <span><MathRenderer content={pt} /></span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* SEKCJA 2: BOSS TRAP (PUŁAPKA CKE) */}
                              {lesson.theory_pill.exam_trap && (
                                <div className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-4 sm:p-5 md:p-6 space-y-3 min-w-0 overflow-hidden">
                                  <div className="flex items-center justify-between gap-3 flex-wrap min-w-0">
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0">
                                        <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                                      </div>
                                      <div className="min-w-0">
                                        <span className="text-[10px] font-bold uppercase text-rose-400/80 tracking-widest block truncate">
                                          STREFA ZAGROŻENIA • LOSS AVERSION
                                        </span>
                                        <h4 className="text-sm sm:text-base font-bold text-rose-300 uppercase tracking-wide truncate">
                                          Pułapka Egzaminacyjna CKE (Boss Trap)
                                        </h4>
                                      </div>
                                    </div>
                                    <span className="text-[10px] sm:text-xs font-bold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-3 py-1 rounded-full uppercase tracking-wider shrink-0">
                                      -1 PKT NA MATURZE
                                    </span>
                                  </div>
                                  <div className="text-sm sm:text-base text-rose-100 font-medium leading-relaxed bg-[#070a0f] p-4 rounded-xl border border-rose-500/20 break-words">
                                    <MathRenderer content={lesson.theory_pill.exam_trap} />
                                  </div>
                                </div>
                              )}

                              {/* SEKCJA 3: MISJE MODELOWE KROK PO KROKU */}
                              {lesson.theory_pill.worked_example && (
                                <div className="space-y-4 min-w-0">
                                  <div className="flex items-center gap-3 px-1 min-w-0">
                                    <div className="w-9 h-9 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/20 flex items-center justify-center text-[#ffdca1] shrink-0">
                                      <Target className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                      <span className="text-[10px] font-bold uppercase text-[#ffdca1] tracking-wider block truncate">
                                        MISJE MODELOWE
                                      </span>
                                      <h4 className="text-base sm:text-lg font-bold text-white truncate">
                                        Modelowe Zadanie CKE Krok po Kroku
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="p-4 sm:p-5 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-4 shadow-sm min-w-0 overflow-hidden">
                                    <div className="space-y-3.5 min-w-0">
                                      <div className="flex items-center justify-between gap-2 min-w-0">
                                        <span className="text-xs sm:text-sm font-bold text-[#ffdca1] bg-[#ffb800]/10 border border-[#ffb800]/20 px-3 py-1 rounded-xl truncate">
                                          Zadanie Wzorcowe CKE
                                        </span>
                                        <span className="text-[11px] font-mono text-[#94a3b8] font-bold shrink-0">ARKUSZ CKE</span>
                                      </div>

                                      <div className="p-4 rounded-xl bg-[#0e1522] border border-[#141d2e] text-sm text-[#dfe2f1] font-medium leading-relaxed break-words">
                                        <MathRenderer content={lesson.theory_pill.worked_example.problem} />
                                      </div>

                                      <div className="p-3.5 rounded-xl bg-[#0e1522] border border-[#141d2e] space-y-2">
                                        <div className="text-xs font-bold text-[#ffdca1] uppercase tracking-wide">
                                          Rozwiązanie i algorytm myślenia:
                                        </div>
                                        <div className="text-xs sm:text-sm text-[#dfe2f1] leading-relaxed break-words">
                                          <MathRenderer content={lesson.theory_pill.worked_example.solution} />
                                        </div>
                                      </div>
                                    </div>

                                    {lesson.theory_pill.worked_example.keyInsight && (
                                      <div className="p-3.5 rounded-xl bg-[#0e1522] border border-[#141d2e] text-[#ffdca1] text-xs sm:text-sm flex items-start gap-2.5 min-w-0">
                                        <Lightbulb className="w-4 h-4 text-[#ffb800] shrink-0 mt-0.5" />
                                        <span className="leading-relaxed break-words flex-1">
                                          <strong>Wskazówka Egzaminatora:</strong> <MathRenderer content={lesson.theory_pill.worked_example.keyInsight} />
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* SEKCJA 4: DOLNY BANER CTA */}
                              <div className="pt-3 min-w-0">
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 sm:p-5 md:p-6 rounded-xl bg-gradient-to-r from-[#141d2e] to-[#0e1522] border border-[#ffb800]/30 min-w-0 overflow-hidden">
                                  <div className="space-y-1 text-center lg:text-left min-w-0 flex-1">
                                    <div className="text-sm sm:text-base font-bold text-white flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                                      <Trophy className="w-5 h-5 text-[#ffb800] shrink-0" />
                                      <span className="break-words">Zasady opanowane? Ruszaj do walki o punkty!</span>
                                    </div>
                                    <div className="text-xs sm:text-sm text-[#94a3b8] break-words">
                                      Lekcja zawiera zadania maturalne z tego działu. Każde rozwiązanie to natychmiastowe punkty XP i monety!
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleStartLessonDirect(lesson)}
                                    className="w-full lg:w-auto py-3 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:brightness-110 text-[#070a0f] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-3 cursor-pointer shrink-0 text-center"
                                  >
                                    <Play className="w-4 h-4 fill-[#070a0f] shrink-0" />
                                    <span className="whitespace-normal sm:whitespace-nowrap">ROZPOCZNIJ MISJĘ</span>
                                    <ArrowRight className="w-4 h-4 stroke-[3] shrink-0" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: BAZA ZADAŃ DZIAŁU */}
              {sectionInnerTab === 'tasks' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-sm font-bold text-[#dfe2f1] uppercase tracking-wider">
                      Zadania CKE z Działu {currentSection.numericId} ({sectionTasks.length} zadań)
                    </h3>
                    <button
                      onClick={() => {
                        setSelectedSectionFilter(currentSection.id);
                        setHubMode('task_browser');
                        setTaskPage(1);
                      }}
                      className="text-xs text-[#ffdca1] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      Otwórz w pełnej przeglądarce zadań →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {sectionTasks.map((task) => {
                      const isCompleted = completedTaskIds.includes(task.id);
                      const answerState = answerStates[task.id] || {
                        selectedOptionId: null,
                        numericAnswer: '',
                        isSubmitted: false,
                        isCorrect: null,
                        showExplanation: false,
                        attempts: 0
                      };

                      return (
                        <div
                          key={task.id}
                          className={`p-4 sm:p-5 rounded-xl border bg-[#0e1522] space-y-4 transition-all ${
                            isCompleted
                              ? 'border-emerald-500/40 bg-emerald-950/10'
                              : 'border-[#141d2e] hover:border-[#1e293b]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-[#ffb800]/10 text-[#ffdca1] font-bold border border-[#ffb800]/20">
                                {task.sourceYear || 'CKE'}
                              </span>
                              <span className="text-[#94a3b8] font-medium">
                                {task.type === 'SINGLE_CHOICE' ? 'Zamknięte (ABCD)' : 'Otwarte'}
                              </span>
                            </div>
                            <span className="font-bold text-[#ffdca1]">
                              {task.points} {task.points === 1 ? 'pkt' : 'punkty'}
                            </span>
                          </div>

                          <div className="text-sm text-white leading-relaxed">
                            <MathRenderer content={task.content} />
                          </div>

                          {/* Options if closed */}
                          {task.type === 'SINGLE_CHOICE' && task.options && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                              {task.options.map((opt) => {
                                const isSelected = answerState.selectedOptionId === opt.id;
                                const isCorrectOpt = opt.is_correct || opt.id === task.correct_answer;
                                return (
                                  <button
                                    key={opt.id}
                                    onClick={() => handleSelectOption(task.id, opt.id)}
                                    className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 cursor-pointer ${
                                      answerState.isSubmitted
                                        ? isCorrectOpt
                                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                                          : isSelected
                                            ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                                            : 'bg-[#070a0f] border-[#141d2e] text-[#94a3b8]'
                                        : isSelected
                                          ? 'bg-[#ffb800]/15 border-[#ffdca1] text-[#ffdca1]'
                                          : 'bg-[#070a0f] hover:bg-[#141d2e] border-[#141d2e] text-[#dfe2f1]'
                                    }`}
                                  >
                                    <span className="w-5 h-5 rounded-md border border-[#141d2e] bg-[#0e1522] flex items-center justify-center text-xs font-bold shrink-0">
                                      {opt.id}
                                    </span>
                                    <span className="flex-1"><MathRenderer content={opt.text} /></span>
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#141d2e]">
                            {!answerState.isSubmitted ? (
                              <button
                                onClick={() => handleSubmitAnswer(task.id)}
                                disabled={task.type === 'SINGLE_CHOICE' && !answerState.selectedOptionId}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] text-[#070a0f] text-xs font-bold disabled:opacity-40 transition-all cursor-pointer"
                              >
                                Sprawdź odpowiedź
                              </button>
                            ) : (
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold flex items-center gap-1 ${
                                  answerState.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                                }`}>
                                  {answerState.isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                  {answerState.isCorrect ? 'Poprawna odpowiedź!' : 'Błędna odpowiedź'}
                                </span>
                                <button
                                  onClick={() => handleResetTask(task.id)}
                                  className="text-xs text-[#94a3b8] hover:text-white underline ml-2"
                                >
                                  Spróbuj ponownie
                                </button>
                              </div>
                            )}

                            {answerState.isSubmitted && task.explanation && (
                              <button
                                onClick={() => handleToggleExplanation(task.id)}
                                className="text-xs text-[#ffdca1] hover:underline flex items-center gap-1"
                              >
                                {answerState.showExplanation ? 'Ukryj wyjaśnienie' : 'Pokaż wyjaśnienie CKE'}
                              </button>
                            )}
                          </div>

                          {/* Explanation */}
                          {answerState.showExplanation && task.explanation && (
                            <div className="p-3.5 rounded-xl bg-[#070a0f] border border-[#ffb800]/30 text-xs text-[#dfe2f1] space-y-1.5 animate-fadeIn">
                              <div className="font-bold text-[#ffdca1] flex items-center gap-1.5">
                                <Lightbulb className="w-4 h-4 text-[#ffb800]" />
                                <span>Wyjaśnienie krok po kroku:</span>
                              </div>
                              <MathRenderer content={task.explanation} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ================================================================= */}
        {/* TRYB 2: BAZA ZADAŃ CKE (TASK BROWSER & INLINE SOLVER)              */}
        {/* ================================================================= */}
        {hubMode === 'task_browser' && (
          <div className="space-y-6">
            {/* Filter Controls Bar */}
            <div className="bg-[#0e1522] p-4 rounded-xl border border-[#141d2e] flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Section Dropdown */}
              <div className="w-full md:w-auto flex-1 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-[#ffdca1]" />
                  <span className="text-xs text-[#94a3b8] whitespace-nowrap">Dział:</span>
                  <select
                    value={selectedSectionFilter}
                    onChange={(e) => {
                      setSelectedSectionFilter(e.target.value);
                      setTaskPage(1);
                    }}
                    className="flex-1 sm:w-60 bg-[#070a0f] border border-[#141d2e] rounded-lg px-3 py-1.5 text-xs text-[#dfe2f1] focus:outline-none focus:border-[#ffb800]"
                  >
                    <option value="all">Wszystkie 15 działów</option>
                    {MATH_SECTIONS.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.numericId}. {s.short_title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Task Type Filter: Wszystkie / Zamknięte / Otwarte */}
                <div className="flex items-center gap-1 bg-[#070a0f] p-1 rounded-lg border border-[#141d2e]">
                  <button
                    onClick={() => { setSelectedTypeFilter('all'); setTaskPage(1); }}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      selectedTypeFilter === 'all'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1] font-semibold'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    Wszystkie
                  </button>
                  <button
                    onClick={() => { setSelectedTypeFilter('closed'); setTaskPage(1); }}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      selectedTypeFilter === 'closed'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1] font-semibold'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    Zamknięte (ABCD)
                  </button>
                  <button
                    onClick={() => { setSelectedTypeFilter('open'); setTaskPage(1); }}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      selectedTypeFilter === 'open'
                        ? 'bg-[#ffb800]/20 text-[#ffdca1] font-semibold'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    Otwarte / Kodowane
                  </button>
                </div>
              </div>

              {/* Text Search */}
              <div className="w-full md:w-64 relative">
                <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Szukaj zadania..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setTaskPage(1);
                  }}
                  className="w-full bg-[#070a0f] border border-[#141d2e] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#dfe2f1] placeholder-[#64748b] focus:outline-none focus:border-[#ffb800]"
                />
              </div>
            </div>

            {/* Results count indicator */}
            <div className="flex items-center justify-between text-xs text-[#94a3b8] px-1">
              <span>
                Znaleziono <strong className="text-white">{filteredTasks.length}</strong> zadań maturalnych
              </span>
              <span>
                Strona {taskPage} z {totalPages}
              </span>
            </div>

            {/* Tasks List */}
            {displayedTasks.length === 0 ? (
              <div className="text-center py-16 bg-[#0e1522] rounded-xl border border-[#141d2e]">
                <HelpCircle className="w-10 h-10 text-[#64748b] mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-white">Brak zadań spełniających kryteria</h3>
                <p className="text-xs text-[#94a3b8] mt-1">Zmień filtry lub wyczyść wyszukiwaną frazę.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedTasks.map((task) => {
                  const state = answerStates[task.id] || {
                    selectedOptionId: null,
                    numericAnswer: '',
                    isSubmitted: false,
                    isCorrect: null,
                    showExplanation: false,
                    attempts: 0
                  };

                  const isDone = completedTaskIds.includes(task.id);

                  return (
                    <article
                      key={task.id}
                      className={`bg-[#0e1522] rounded-xl border p-5 transition-all ${
                        state.isSubmitted && state.isCorrect
                          ? 'border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                          : state.isSubmitted && !state.isCorrect
                          ? 'border-rose-500/40 shadow-sm shadow-rose-500/10'
                          : 'border-[#141d2e] hover:border-[#1e293b]'
                      }`}
                    >
                      {/* Task Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#141d2e]">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#ffb800]/10 border border-[#ffb800]/20 text-[11px] font-semibold text-[#ffdca1]">
                            {task.sourceYear || 'Matura CKE'}
                          </span>
                          <span className="text-xs font-semibold text-white">
                            Zadanie {task.taskNumber || ''}
                          </span>
                          <span className="text-xs text-[#94a3b8]">
                            • {task.sectionTitle}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#070a0f] text-[#94a3b8] border border-[#141d2e]">
                            {task.points} {task.points === 1 ? 'punkt' : 'punkty'}
                          </span>
                          {isDone && (
                            <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Rozwiązane
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Task Content */}
                      <div className="text-sm text-[#dfe2f1] leading-relaxed mb-4">
                        <MathRenderer content={task.content} />
                      </div>

                      {/* Visual diagrams / plots if available */}
                      {Boolean((task as any).diagram || (task as any).plot) && (
                        <div className="mb-4 flex justify-center p-3 rounded-xl bg-[#070a0f] border border-[#141d2e]">
                          <MathDiagram diagram={(task as any).diagram || (task as any).plot} />
                        </div>
                      )}

                      {/* Visual diagrams if available */}
                      {task.options?.some(o => o.numberLine) && (
                        <div className="mb-4 p-2 rounded-lg bg-[#070a0f] border border-[#141d2e]">
                          <span className="text-[10px] text-[#94a3b8] font-semibold uppercase block mb-1">
                            Oś liczbowa:
                          </span>
                          {task.options.filter(o => o.numberLine).map(o => (
                            <div key={o.id} className="my-1">
                              <span className="text-xs font-bold text-[#ffdca1] mr-2">Opcja {o.id}:</span>
                              <NumberLineDiagram {...o.numberLine} />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Interactive Answer Area (INLINE) */}
                      {task.type === 'SINGLE_CHOICE' && task.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                          {task.options.map((opt) => {
                            const isSelected = state.selectedOptionId === opt.id;
                            const isCorrectOpt = opt.id.toUpperCase() === (task.correct_answer || 'A').toUpperCase();

                            let btnStyle = 'bg-[#070a0f] border-[#141d2e] text-[#dfe2f1] hover:border-[#ffb800]/50 hover:bg-[#121b2b]';
                            if (state.isSubmitted) {
                              if (isSelected) {
                                btnStyle = state.isCorrect
                                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-semibold'
                                  : 'bg-rose-950/40 border-rose-500 text-rose-300 font-semibold';
                              } else if (isCorrectOpt && !state.isCorrect) {
                                btnStyle = 'bg-emerald-950/20 border-emerald-500/50 text-emerald-400';
                              }
                            }

                            return (
                              <button
                                key={opt.id}
                                disabled={state.isSubmitted && Boolean(state.isCorrect)}
                                onClick={() => handleSelectOption(task.id, opt.id, task.correct_answer)}
                                className={`flex items-start gap-2.5 p-3 rounded-lg border text-left text-xs transition-all ${btnStyle}`}
                              >
                                <span className="w-5 h-5 rounded flex items-center justify-center bg-[#0e1522] border border-[#141d2e] font-bold text-[11px] shrink-0 text-[#ffdca1]">
                                  {opt.id}
                                </span>
                                <div className="flex-1">
                                  <MathRenderer content={opt.text} />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Numeric Input Area */}
                      {task.type === 'NUMERIC_INPUT' && (
                        <div className="mt-4 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Wpisz wynik (np. 12 lub 3.5)..."
                            value={state.numericAnswer}
                            disabled={state.isSubmitted && Boolean(state.isCorrect)}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAnswerStates(prev => ({
                                ...prev,
                                [task.id]: {
                                  ...(prev[task.id] || {}),
                                  selectedOptionId: null,
                                  numericAnswer: val,
                                  isSubmitted: false,
                                  isCorrect: null,
                                  showExplanation: false,
                                  attempts: prev[task.id]?.attempts || 0
                                }
                              }));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckNumeric(task.id, task.correct_answer);
                            }}
                            className="bg-[#070a0f] border border-[#141d2e] rounded-lg px-3 py-2 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#ffb800] w-60"
                          />
                          <button
                            onClick={() => handleCheckNumeric(task.id, task.correct_answer)}
                            disabled={state.isSubmitted && Boolean(state.isCorrect)}
                            className="px-4 py-2 rounded-lg bg-[#ffb800] text-black font-semibold text-xs hover:bg-[#ffdca1] transition-colors"
                          >
                            Sprawdź
                          </button>
                        </div>
                      )}

                      {/* Open Proof / Open Calculation */}
                      {(task.type === 'OPEN_PROOF' || task.type === 'OPEN_CALCULATION') && (
                        <div className="mt-4">
                          <button
                            onClick={() => {
                              setAnswerStates(prev => ({
                                ...prev,
                                [task.id]: {
                                  ...(prev[task.id] || {
                                    selectedOptionId: null,
                                    numericAnswer: '',
                                    isSubmitted: true,
                                    isCorrect: true,
                                    showExplanation: true,
                                    attempts: 1
                                  }),
                                  showExplanation: !prev[task.id]?.showExplanation
                                }
                              }));
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-xs font-medium text-[#ffdca1] flex items-center gap-1.5 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#ffb800]" />
                            {state.showExplanation ? 'Ukryj schemat oceniania CKE' : 'Pokaż schemat oceniania i pełny dowód CKE'}
                          </button>
                        </div>
                      )}

                      {/* Feedback & Examiner Trap Banner */}
                      {state.showExplanation && (
                        <div className="mt-4 p-3.5 rounded-lg bg-[#070a0f] border border-[#ffb800]/20 space-y-2">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="flex items-center gap-1.5 text-[#ffdca1]">
                              <AlertTriangle className="w-3.5 h-3.5 text-[#ffb800]" />
                              Wskazówka Egzaminatora CKE
                            </span>
                            <span className="text-[11px] text-[#94a3b8]">
                              Poprawna: <strong className="text-emerald-400">{task.correct_answer}</strong>
                            </span>
                          </div>

                          <div className="text-xs text-[#dfe2f1] leading-relaxed">
                            <MathRenderer content={task.matura_tip || task.explanation || 'Pamiętaj o dokładnym przeanalizowaniu dziedziny wyrażenia i warunków zadania.'} />
                          </div>

                          {task.explanation && task.explanation !== task.matura_tip && (
                            <div className="pt-2 border-t border-[#141d2e] text-[11px] text-[#94a3b8]">
                              <strong className="text-[#dfe2f1]">Wyjaśnienie:</strong>{' '}
                              <MathRenderer content={task.explanation} />
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-4">
                    <button
                      onClick={() => setTaskPage(p => Math.max(1, p - 1))}
                      disabled={taskPage === 1}
                      className="px-3 py-1.5 rounded bg-[#0e1522] border border-[#141d2e] text-xs text-[#dfe2f1] disabled:opacity-40 hover:bg-[#141d2e]"
                    >
                      ← Poprzednia
                    </button>
                    <span className="text-xs text-[#94a3b8] px-2">
                      {taskPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setTaskPage(p => Math.min(totalPages, p + 1))}
                      disabled={taskPage === totalPages}
                      className="px-3 py-1.5 rounded bg-[#0e1522] border border-[#141d2e] text-xs text-[#dfe2f1] disabled:opacity-40 hover:bg-[#141d2e]"
                    >
                      Następna →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* CKE Formulas Modal */}
      <CkeFormulasModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
        initialTopicId={formulaModalTopic}
      />
    </div>
  );
};
