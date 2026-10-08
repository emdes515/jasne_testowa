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
  Headphones,
  Users,
  FileEdit,
  Layout,
  Inbox,
  Target,
  CheckSquare,
  PenTool,
  GitFork,
  Shuffle,
  Repeat,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Play,
  Lightbulb,
  Check,
  GraduationCap,
  Star,
  Key,
  ExternalLink,
  Shield,
  Compass,
  Trophy,
  Globe,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ENGLISH_SECTIONS, EnglishSection, EnglishTask } from '../../types/englishTypes';
import { ALL_ENGLISH_TASKS } from '../../data/english/allEnglishTasks';
import { getEnglishLessonsByTopic, EnglishLessonData, ENGLISH_LESSONS } from '../../data/english/englishLessonsData';
import { getEnglishLessonDocument } from '../../data/englishCurriculumData';
import { getDuetDataForLesson } from '../../data/english/englishDuetData';
import { playSuccessSound, playErrorSound, triggerHaptic } from '../../utils';
import { EnglishLessonView } from './EnglishLessonView';
import { EnglishDictionaryModal } from './EnglishDictionaryModal';
import { EnglishConceptFormatter, renderFormattedInline } from './EnglishConceptFormatter';

const ActiveBadge: React.FC<{ label?: string }> = ({ label = 'AKTUALNA LEKCJA' }) => (
  <span className="relative inline-flex items-center gap-1.5 text-xs font-black uppercase text-amber-300 bg-amber-500/20 border border-amber-500/50 px-3 py-1 rounded-full shadow-md tracking-wider">
    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
    <span>{label}</span>
  </span>
);

interface MaturalnyDuetGameProps {
  lessonId: string;
  topicId?: string;
}

const MaturalnyDuetGame: React.FC<MaturalnyDuetGameProps> = ({ lessonId, topicId }) => {
  const duetData = useMemo(() => getDuetDataForLesson(lessonId, topicId), [lessonId, topicId]);
  const pairs = duetData.pairs;

  const [shuffleSeed, setShuffleSeed] = useState(0);

  const leftItems = useMemo(() => {
    return pairs.map(p => ({ id: p.id, text: p.leftText }));
  }, [pairs]);

  const rightItems = useMemo(() => {
    const items = [...pairs.map(p => ({ id: p.id, text: p.rightText }))];
    // Deterministic shuffle using seed
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.abs(Math.sin((shuffleSeed + 1) * 997 + i * 29)) * (i + 1)) % (i + 1);
      [items[i], items[j]] = [items[j], items[i]];
    }
    // Avoid identical alignment if multiple items
    if (items.length > 1 && items.every((it, idx) => it.id === leftItems[idx].id)) {
      [items[0], items[1]] = [items[1], items[0]];
    }
    return items;
  }, [pairs, shuffleSeed, leftItems]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [errorPair, setErrorPair] = useState<{ left: string; right: string } | null>(null);

  const storageKey = `jasne_duet_completed_${lessonId}`;
  const [isPersistedDone, setIsPersistedDone] = useState<boolean>(() => {
    try {
      return localStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  });

  const isAllMatched = matchedIds.length === pairs.length && pairs.length > 0;

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Correct pair matched!
      const nextMatched = [...matchedIds, leftId];
      setMatchedIds(nextMatched);
      setSelectedLeft(null);
      setSelectedRight(null);
      setErrorPair(null);
      triggerHaptic();

      if (nextMatched.length === pairs.length) {
        playSuccessSound();
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.65 }
          });
          localStorage.setItem(storageKey, 'true');
          setIsPersistedDone(true);
        } catch {
          // ignore
        }
      }
    } else {
      // Mismatch
      playErrorSound();
      setErrorPair({ left: leftId, right: rightId });
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setErrorPair(null);
      }, 700);
    }
  };

  const handleSelectLeft = (id: string) => {
    if (matchedIds.includes(id) || errorPair) return;
    if (selectedLeft === id) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(id);
    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleSelectRight = (id: string) => {
    if (matchedIds.includes(id) || errorPair) return;
    if (selectedRight === id) {
      setSelectedRight(null);
      return;
    }
    setSelectedRight(id);
    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const handleReset = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
    setErrorPair(null);
    setShuffleSeed(prev => prev + 1);
  };

  return (
    <div className="rounded-2xl border border-[#ffb800]/30 bg-[#0e1522] p-4 sm:p-5 md:p-6 shadow-xl space-y-4 relative overflow-hidden min-w-0">
      {/* GLOW ACCENT */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffb800]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* HEADER KAFELKA */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#141d2e] relative z-10 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/30 flex items-center justify-center text-[#ffdca1] shrink-0 shadow-sm">
            <Zap className="w-5 h-5 text-[#ffb800]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase text-[#ffdca1] tracking-wider">
                SZYBKI TRENING PEWNIAKA
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 shrink-0">
                TAP-TO-MATCH (3 PARY)
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 break-words">
              Maturalny Duet: Połącz w pary
            </h4>
          </div>
        </div>

        {/* PROGRESS / BADGE */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {isPersistedDone && (
            <span className="text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              ZALICZONE
            </span>
          )}
          <span className="text-xs font-mono font-bold text-[#94a3b8] bg-[#070a0f] border border-[#141d2e] px-3 py-1 rounded-full">
            Dopasowano: <strong className="text-[#ffdca1]">{matchedIds.length}</strong>/{pairs.length}
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed relative z-10 break-words">
        Kliknij sygnał lub zwrot w <strong className="text-[#ffdca1]">Kolumnie A</strong>, a następnie dobierz do niego pasującą regułę lub zastosowanie w <strong className="text-[#ffdca1]">Kolumnie B</strong>.
      </p>

      {/* PLANSZA DWUKOLUMNOWA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 relative z-10 min-w-0">
        {/* KOLUMNA A: SYGNAŁY / ELEMENTY WYJŚCIOWE */}
        <div className="space-y-2.5 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffdca1] block px-1 truncate">
            KOLUMNA A: SYGNAŁ / POCZĄTEK
          </span>
          <div className="space-y-2 min-w-0">
            {leftItems.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedLeft === item.id;
              const isError = errorPair?.left === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleSelectLeft(item.id)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-2.5 min-h-[52px] min-w-0 overflow-hidden cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 opacity-90 cursor-default shadow-sm'
                      : isError
                      ? 'bg-rose-950/60 border border-rose-500 text-rose-200 ring-2 ring-rose-500/40 animate-pulse'
                      : isSelected
                      ? 'bg-[#ffb800]/15 border-2 border-[#ffdca1] text-white ring-2 ring-[#ffb800]/30 shadow-sm'
                      : 'bg-[#070a0f] border border-[#141d2e] hover:border-[#ffdca1]/50 hover:bg-[#121b2b] text-[#dfe2f1]'
                  }`}
                >
                  <span className="leading-snug min-w-0 break-words flex-1">{item.text}</span>
                  {isMatched ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : isSelected ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffb800] shrink-0 animate-ping" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-[#141d2e] bg-[#0e1522] flex items-center justify-center text-[10px] text-[#94a3b8] shrink-0">
                      A
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* KOLUMNA B: REGUŁY / ZASTOSOWANIE */}
        <div className="space-y-2.5 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffdca1] block px-1 truncate">
            KOLUMNA B: REGUŁA / ZASTOSOWANIE CKE
          </span>
          <div className="space-y-2 min-w-0">
            {rightItems.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedRight === item.id;
              const isError = errorPair?.right === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleSelectRight(item.id)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-2.5 min-h-[52px] min-w-0 overflow-hidden cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 opacity-90 cursor-default shadow-sm'
                      : isError
                      ? 'bg-rose-950/60 border border-rose-500 text-rose-200 ring-2 ring-rose-500/40 animate-pulse'
                      : isSelected
                      ? 'bg-[#ffb800]/15 border-2 border-[#ffdca1] text-white ring-2 ring-[#ffb800]/30 shadow-sm'
                      : 'bg-[#070a0f] border border-[#141d2e] hover:border-[#ffdca1]/50 hover:bg-[#121b2b] text-[#dfe2f1]'
                  }`}
                >
                  <span className="leading-snug min-w-0 break-words flex-1">{item.text}</span>
                  {isMatched ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : isSelected ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffb800] shrink-0 animate-ping" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-[#141d2e] bg-[#0e1522] flex items-center justify-center text-[10px] text-[#94a3b8] shrink-0">
                      B
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOX SUKCESU PO SPAROWANIU 3/3 */}
      {isAllMatched && (
        <div className="mt-4 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-950/80 via-[#0e1522] to-[#070a0f] border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl relative z-10 animate-fadeIn">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/30 flex items-center justify-center text-[#ffdca1] shrink-0 shadow-sm">
              <Trophy className="w-5 h-5 text-[#ffb800] animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-white">
                  Pewniak w Garści!
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffb800]/15 text-[#ffdca1] border border-[#ffb800]/30">
                  +10 XP ROZGRZEWKI
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed">
                Wzorowo sparowano wszystkie reguły. Jesteś w pełni gotowy na właściwą misję!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-[#0e1522] hover:bg-[#141d2e] border border-[#141d2e] text-xs font-semibold text-[#dfe2f1] flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#ffdca1]" />
            Zagraj ponownie
          </button>
        </div>
      )}
    </div>
  );
};

interface TaskAnswerState {
  selectedOptionId: string | null;
  textAnswer: string;
  isSubmitted: boolean;
  isCorrect: boolean | null;
  showExplanation: boolean;
  attempts: number;
}

export interface EnglishStudyHubProps {
  onCompleteTask?: (taskId: string, pointsEarned: number) => void;
  onCompleteLesson?: (lessonId: string, pointsEarned: number) => void;
  completedLessonIds?: string[] | Record<string, any>;
  completedTaskIds?: string[];
  initialMode?: 'lessons' | 'task_browser';
  initialActiveTopicId?: string | null;
  initialActiveLessonId?: string | null;
  onStartTask?: (task: any, lessonTasks?: any[], lessonTitle?: string) => void;
  onStartLesson?: (lessonId: string, topicId: string) => void;
  onOpenAiTutor?: (contextPrompt: string) => void;
  onClose?: () => void;
  userState?: any;
}

export const EnglishStudyHub: React.FC<EnglishStudyHubProps> = ({
  onCompleteTask,
  onCompleteLesson: _onCompleteLesson,
  completedLessonIds = [],
  completedTaskIds: propCompletedTaskIds = [],
  initialMode = 'lessons',
  initialActiveTopicId = null,
  initialActiveLessonId = null,
  onStartTask,
  onStartLesson,
  onOpenAiTutor,
  onClose,
  userState
}) => {
  const isDev = Boolean(userState?.isDev || userState?.isPro);

  // Tryb widoku: Kurs Działowy (15 Działów) vs Baza Zadań CKE (1500 zadań)
  const [hubMode, setHubMode] = useState<'lessons' | 'task_browser'>(initialActiveLessonId ? 'lessons' : initialMode);

  // Szybki modal z Maturalnym Duetem
  const [showQuickDuetModal, setShowQuickDuetModal] = useState(false);
  const [quickDuetTopicId, setQuickDuetTopicId] = useState('topic-1');
  const [showDictionaryModal, setShowDictionaryModal] = useState(false);

  // Rozwinięty dział w trybie kursu
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(initialActiveTopicId);

  // Mobile accordion state: domyślnie pierwszy dział jest rozwinięty
  const [expandedSectionIds, setExpandedSectionIds] = useState<Record<string, boolean>>(() => ({
    [ENGLISH_SECTIONS[0]?.id || 'topic-1']: true
  }));

  const toggleMobileSection = (id: string) => {
    triggerHaptic('light');
    setExpandedSectionIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const [sectionInnerTab, setSectionInnerTab] = useState<'lessons' | 'tasks'>('lessons');
  const [expandedLessonPillId, setExpandedLessonPillId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(initialActiveLessonId || null);

  React.useEffect(() => {
    if (initialActiveLessonId) {
      setActiveLessonId(initialActiveLessonId);
      setHubMode('lessons');
    }
  }, [initialActiveLessonId]);

  // Ukończone zadania
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    if (propCompletedTaskIds && propCompletedTaskIds.length > 0) return propCompletedTaskIds;
    try {
      const saved = localStorage.getItem('jasne_completed_english_tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filtry w przeglądarce zadań
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>(initialActiveTopicId || 'all');
  const [selectedPillarFilter, setSelectedPillarFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'closed' | 'open'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [taskPage, setTaskPage] = useState(1);
  const TASKS_PER_PAGE = 12;

  // Stan odpowiedzi dla poszczególnych zadań
  const [answerStates, setAnswerStates] = useState<Record<string, TaskAnswerState>>({});

  // Widoczność transkryptu audio
  const [expandedTranscripts, setExpandedTranscripts] = useState<Record<string, boolean>>({});

  // Ikony dla działów
  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock': return <Clock className="w-5 h-5 text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'GitFork': return <GitFork className="w-5 h-5 text-teal-400" />;
      case 'Shuffle': return <Shuffle className="w-5 h-5 text-indigo-400" />;
      case 'Repeat': return <Repeat className="w-5 h-5 text-purple-400" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-blue-400" />;
      case 'Users': return <Users className="w-5 h-5 text-cyan-400" />;
      case 'FileEdit': return <FileEdit className="w-5 h-5 text-sky-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-amber-500" />;
      case 'FileText': return <FileText className="w-5 h-5 text-orange-400" />;
      case 'Inbox': return <Inbox className="w-5 h-5 text-yellow-400" />;
      case 'Target': return <Target className="w-5 h-5 text-rose-400" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5 text-red-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-fuchsia-400" />;
      case 'PenTool': return <PenTool className="w-5 h-5 text-violet-400" />;
      default: return <BookOpen className="w-5 h-5 text-amber-400" />;
    }
  };

  // Filtrowanie zadań
  const filteredTasks = useMemo(() => {
    return ALL_ENGLISH_TASKS.filter(task => {
      // Filtr działu
      if (selectedSectionFilter !== 'all' && task.topicId !== selectedSectionFilter) {
        return false;
      }

      // Filtr filaru
      if (selectedPillarFilter !== 'all' && task.pillarId !== selectedPillarFilter) {
        return false;
      }

      // Filtr typu
      if (selectedTypeFilter === 'closed') {
        if (task.type !== 'SINGLE_CHOICE' && task.type !== 'TRUE_FALSE') return false;
      } else if (selectedTypeFilter === 'open') {
        if (task.type === 'SINGLE_CHOICE' || task.type === 'TRUE_FALSE') return false;
      }

      // Szukajka tekstowa
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(q);
        const matchQuestion = task.question.toLowerCase().includes(q);
        const matchContext = task.contextText ? task.contextText.toLowerCase().includes(q) : false;
        const matchTranscript = task.transcriptSnippet ? task.transcriptSnippet.toLowerCase().includes(q) : false;
        if (!matchTitle && !matchQuestion && !matchContext && !matchTranscript) {
          return false;
        }
      }

      return true;
    });
  }, [selectedSectionFilter, selectedPillarFilter, selectedTypeFilter, searchQuery]);

  // Paginacja
  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const currentTasks = useMemo(() => {
    const start = (taskPage - 1) * TASKS_PER_PAGE;
    return filteredTasks.slice(start, start + TASKS_PER_PAGE);
  }, [filteredTasks, taskPage]);

  // Obsługa odpowiedzi na zadanie jednokrotnego wyboru
  const handleOptionSelect = (taskId: string, optionId: string) => {
    const current = answerStates[taskId];
    if (current?.isSubmitted) return;

    setAnswerStates(prev => ({
      ...prev,
      [taskId]: {
        selectedOptionId: optionId,
        textAnswer: prev[taskId]?.textAnswer || '',
        isSubmitted: false,
        isCorrect: null,
        showExplanation: false,
        attempts: prev[taskId]?.attempts || 0
      }
    }));
  };

  // Zatwierdzenie odpowiedzi
  const handleSubmitAnswer = (task: EnglishTask) => {
    const state = answerStates[task.id];
    let isCorrect = false;

    if (task.type === 'SINGLE_CHOICE' || task.type === 'TRUE_FALSE') {
      if (!state?.selectedOptionId) return;
      isCorrect = state.selectedOptionId === task.correctAnswer || 
                  (task.optionsDetailed?.find(o => o.id === state.selectedOptionId)?.is_correct ?? false);
    } else {
      // Zadanie otwarte (tekstowe)
      const userText = (state?.textAnswer || '').trim().toLowerCase();
      const targetText = task.correctAnswer.trim().toLowerCase();
      const variants = (task.acceptedVariants || []).map(v => v.trim().toLowerCase());
      isCorrect = userText === targetText || variants.includes(userText);
    }

    if (isCorrect) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
      if (!completedTaskIds.includes(task.id)) {
        const nextCompleted = [...completedTaskIds, task.id];
        setCompletedTaskIds(nextCompleted);
        try {
          localStorage.setItem('jasne_completed_english_tasks', JSON.stringify(nextCompleted));
        } catch {}
        onCompleteTask?.(task.id, task.points || 1);
      }
    }

    setAnswerStates(prev => ({
      ...prev,
      [task.id]: {
        selectedOptionId: prev[task.id]?.selectedOptionId || null,
        textAnswer: prev[task.id]?.textAnswer || '',
        isSubmitted: true,
        isCorrect,
        showExplanation: true,
        attempts: (prev[task.id]?.attempts || 0) + 1
      }
    }));
  };

  // Reset zadania
  const handleResetTask = (taskId: string) => {
    setAnswerStates(prev => {
      const next = { ...prev };
      delete next[taskId];
      return next;
    });
  };

  // Jeśli użytkownik jest w trakcie aktywnej lekcji angielskiego, wyświetl gamingowy widok EnglishLessonView (dokładnie jak PolishLessonView) na pełnym ekranie
  if (activeLessonId) {
    const currentLesson = ENGLISH_LESSONS.find((l) => 
      l.id === activeLessonId || 
      l.id.replace('eng-lesson-', 'eng-') === activeLessonId.replace('eng-lesson-', 'eng-') ||
      l.id.replace('eng-lesson-', '') === activeLessonId.replace('eng-lesson-', '') ||
      l.id.replace(/^eng-lesson-/, 'lesson-') === activeLessonId
    );
    if (currentLesson) {
      return (
        <div key={activeLessonId} className="fixed inset-0 z-50 bg-[#070a0f] overflow-y-auto w-full h-full animate-pageTransition">
          <EnglishLessonView
            lesson={currentLesson}
            onBack={() => {
              setActiveLessonId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNextLesson={(nextId) => {
              setActiveLessonId(nextId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCompleteLesson={(lessonId, pointsEarned) => {
              if (_onCompleteLesson) _onCompleteLesson(lessonId, pointsEarned);
            }}
          />
        </div>
      );
    }
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
                className="p-1.5 rounded-lg bg-[#0e1522] hover:bg-[#141d2e] text-[#94a3b8] hover:text-[#ffdca1] transition-colors cursor-pointer shrink-0"
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
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdca1] shrink-0" />
                  <span>Język Angielski CKE</span>
                </h1>
              </div>
              <p className="text-xs text-[#94a3b8] hidden sm:block mt-0.5">
                15 działów tematycznych • 1500 autentycznych zadań CKE • CEFR B1 / B1+
              </p>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            <button
              onClick={() => setShowDictionaryModal(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0e1522] hover:bg-[#141d2e] border border-[#ffb800]/30 text-[#ffdca1] text-xs font-medium transition-all shadow-sm cursor-pointer"
              title="Oficjalny Słownik Maturalny CKE (14 działów)"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffb800]" />
              <span className="hidden sm:inline">Słownik CKE</span>
              <span className="sm:hidden text-[11px]">Słownik</span>
            </button>

            <button
              onClick={() => setShowQuickDuetModal(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0e1522] hover:bg-[#141d2e] border border-[#ffb800]/30 text-[#ffdca1] text-xs font-medium transition-all shadow-sm cursor-pointer"
              title="Grywalizacja par maturalnych CKE"
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffb800]" />
              <span className="hidden sm:inline">Maturalny Duet</span>
              <span className="sm:hidden text-[11px]">Duet</span>
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
            onClick={() => {
              setHubMode('lessons');
              setExpandedSectionId(null);
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
              hubMode === 'lessons'
                ? 'border-[#ffdca1] text-[#ffdca1] bg-[#ffb800]/5'
                : 'border-transparent text-[#94a3b8] hover:text-[#dfe2f1]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Kurs Działowy <span className="hidden sm:inline">(15 Działów)</span></span>
          </button>
          <button
            onClick={() => setHubMode('task_browser')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
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

      {/* TRYB 1: BAZA ZADAŃ CKE (TASK BROWSER) */}
      {hubMode === 'task_browser' && (
        <div className="space-y-6">
          {/* PASEK STATYSTYK I FILTRÓW */}
          <div className="bg-[#0e1522] border border-[#141d2e] rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-[#141d2e]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/20 flex items-center justify-center text-[#ffdca1] font-bold text-sm">
                  1500
                </div>
                <div>
                  <div className="text-xs text-[#94a3b8] font-medium">Baza Zadań CKE</div>
                  <div className="text-sm font-bold text-white">Komplet zadań w 15 Działach</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  {completedTaskIds.length}
                </div>
                <div>
                  <div className="text-xs text-[#94a3b8] font-medium">Rozwiązane zadania</div>
                  <div className="text-sm font-bold text-emerald-400">
                    {((completedTaskIds.length / 1500) * 100).toFixed(1)}% opanowania bazy
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/20 flex items-center justify-center text-[#ffdca1] font-bold text-sm">
                  60
                </div>
                <div>
                  <div className="text-xs text-[#94a3b8] font-medium">Maksymalny wynik matury</div>
                  <div className="text-sm font-bold text-white">Formuła 2023 Podstawa</div>
                </div>
              </div>
            </div>

            {/* KONTROLKI FILTRÓW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Filtr Działu */}
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-1.5">Dział Maturalny</label>
                <select
                  value={selectedSectionFilter}
                  onChange={(e) => {
                    setSelectedSectionFilter(e.target.value);
                    setTaskPage(1);
                  }}
                  className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl px-3 py-2 text-sm text-[#dfe2f1] focus:outline-none focus:border-[#ffdca1] transition-colors"
                >
                  <option value="all">Wszystkie 15 Działów</option>
                  {ENGLISH_SECTIONS.map(sec => (
                    <option key={sec.id} value={sec.id}>
                      {sec.short_title} ({sec.taskCount || 0} zadań)
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtr Filaru CKE */}
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-1.5">Filar Kompetencyjny</label>
                <select
                  value={selectedPillarFilter}
                  onChange={(e) => {
                    setSelectedPillarFilter(e.target.value);
                    setTaskPage(1);
                  }}
                  className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl px-3 py-2 text-sm text-[#dfe2f1] focus:outline-none focus:border-[#ffdca1] transition-colors"
                >
                  <option value="all">Wszystkie 4 Filary</option>
                  <option value="pillar-use-of-english">I: Środki Językowe (375)</option>
                  <option value="pillar-listening">II: Rozumienie ze Słuchu (375)</option>
                  <option value="pillar-reading">III: Rozumienie Tekstów (500)</option>
                  <option value="pillar-writing">IV: Warsztat Pisania (250)</option>
                </select>
              </div>

              {/* Filtr Typu zadania */}
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-1.5">Typ Zadania</label>
                <select
                  value={selectedTypeFilter}
                  onChange={(e) => {
                    setSelectedTypeFilter(e.target.value as any);
                    setTaskPage(1);
                  }}
                  className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl px-3 py-2 text-sm text-[#dfe2f1] focus:outline-none focus:border-[#ffdca1] transition-colors"
                >
                  <option value="all">Wszystkie formaty</option>
                  <option value="closed">Zadania zamknięte (Wybór ABC, P/F)</option>
                  <option value="open">Zadania otwarte (Luki, parafrazy, notatki)</option>
                </select>
              </div>

              {/* Szukajka */}
              <div>
                <label className="block text-xs font-semibold text-[#94a3b8] mb-1.5">Wyszukaj frazę</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="np. Present Perfect, suitcase..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setTaskPage(1);
                    }}
                    className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl pl-9 pr-3 py-2 text-sm text-[#dfe2f1] placeholder-[#94a3b8]/60 focus:outline-none focus:border-[#ffdca1] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* LISTA ZADAŃ */}
          <div className="flex items-center justify-between text-sm text-[#94a3b8] px-1">
            <span>
              Znaleziono <strong className="text-white">{filteredTasks.length}</strong> zadań spełniających kryteria
            </span>
            <span>
              Strona <strong className="text-white">{taskPage}</strong> z <strong className="text-white">{Math.max(1, totalPages)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 min-w-0">
            {currentTasks.map((task) => {
              const state = answerStates[task.id];
              const isCompleted = completedTaskIds.includes(task.id);
              const isTranscriptOpen = !!expandedTranscripts[task.id];

              return (
                <div
                  key={task.id}
                  className={`bg-[#0e1522] border rounded-xl p-4 sm:p-6 transition-all duration-200 shadow-sm min-w-0 overflow-hidden ${
                    state?.isSubmitted
                      ? state.isCorrect
                        ? 'border-emerald-500/50 bg-emerald-950/20'
                        : 'border-rose-500/50 bg-rose-950/20'
                      : 'border-[#141d2e] hover:border-[#1e293b]'
                  }`}
                >
                  {/* METADANE ZADANIA */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#141d2e] min-w-0">
                    <div className="flex flex-wrap items-center gap-2 min-w-0">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#ffb800]/10 border border-[#ffb800]/20 text-[#ffdca1] text-xs font-bold">
                        {task.sectionTitle.split(':')[0]}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#070a0f] border border-[#141d2e] text-[#94a3b8] text-xs font-medium">
                        {task.pillarName}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#070a0f] border border-[#141d2e] text-[#94a3b8] text-xs">
                        {task.source}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-[#94a3b8]">
                        Waga: {task.points} {task.points === 1 ? 'pkt' : 'pkt'}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Rozwiązane
                        </span>
                      )}
                    </div>
                  </div>

                  {/* TYTUŁ I PYTANIE */}
                  <h3 className="text-base font-bold text-white mb-3 break-words">
                    {task.title}
                  </h3>

                  {/* DLA SŁUCHANIA: TRANSKRYPT AUDIO */}
                  {task.transcriptSnippet && (
                    <div className="mb-4 bg-[#070a0f] border border-[#141d2e] rounded-xl p-4 min-w-0 overflow-hidden">
                      <div className="flex items-center justify-between gap-2 flex-wrap min-w-0">
                        <div className="flex items-center gap-2 text-[#ffdca1] font-semibold text-xs uppercase tracking-wide">
                          <Volume2 className="w-4 h-4 text-[#ffb800] shrink-0" />
                          <span>Nagranie Audio / Transkrypt CKE</span>
                        </div>
                        <button
                          onClick={() => setExpandedTranscripts(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                          className="text-xs text-[#ffdca1] hover:text-white font-medium underline flex items-center gap-1 cursor-pointer"
                        >
                          {isTranscriptOpen ? 'Ukryj transkrypt' : 'Pokaż transkrypt lektora'}
                        </button>
                      </div>
                      {isTranscriptOpen && (
                        <div className="mt-3 pt-3 border-t border-[#141d2e] text-xs text-[#dfe2f1] font-mono whitespace-pre-line leading-relaxed bg-[#0e1522] p-3 rounded-lg break-words">
                          {task.transcriptSnippet}
                        </div>
                      )}
                    </div>
                  )}

                  {/* DLA CZYTANIA: TEKST ŹRÓDŁOWY */}
                  {task.contextText && (
                    <div className="mb-4 bg-[#070a0f] border border-[#141d2e] rounded-xl p-4 min-w-0 overflow-hidden">
                      <div className="flex items-center gap-2 text-[#ffdca1] font-semibold text-xs uppercase tracking-wide mb-2">
                        <BookOpen className="w-4 h-4 text-[#ffb800] shrink-0" />
                        <span>Tekst Źródłowy CKE</span>
                      </div>
                      <div className="text-sm text-[#dfe2f1] whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto pr-2 break-words">
                        {task.contextText}
                      </div>
                    </div>
                  )}

                  {/* TREŚĆ POLECENIA */}
                  <div className="text-sm text-[#dfe2f1] whitespace-pre-line leading-relaxed mb-5 font-medium break-words">
                    {task.question}
                  </div>

                  {/* INTERAKCJA ODPOWIEDZI */}
                  {task.type === 'SINGLE_CHOICE' || task.type === 'TRUE_FALSE' ? (
                    <div className="space-y-2 mb-5 min-w-0">
                      {(task.optionsDetailed || task.options?.map((opt, i) => ({
                        id: ['A', 'B', 'C', 'D'][i] || String(i + 1),
                        text: opt,
                        is_correct: opt === task.correctAnswer
                      })) || []).map((opt) => {
                        const isSelected = state?.selectedOptionId === opt.id || state?.selectedOptionId === opt.text;
                        const showCorrect = state?.isSubmitted && (opt.is_correct || opt.id === task.correctAnswer || opt.text === task.correctAnswer);
                        const showWrong = state?.isSubmitted && isSelected && !state.isCorrect;

                        return (
                          <button
                            key={opt.id}
                            disabled={state?.isSubmitted}
                            onClick={() => handleOptionSelect(task.id, opt.id)}
                            className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 min-w-0 overflow-hidden cursor-pointer ${
                              showCorrect
                                ? 'bg-emerald-950/40 border-2 border-emerald-500 text-emerald-200 font-semibold'
                                : showWrong
                                ? 'bg-rose-950/40 border-2 border-rose-500 text-rose-200'
                                : isSelected
                                ? 'bg-[#ffb800]/15 border-2 border-[#ffdca1] text-white shadow-sm'
                                : 'bg-[#070a0f] border border-[#141d2e] text-[#dfe2f1] hover:border-[#1e293b] hover:bg-[#121b2b]'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                              showCorrect
                                ? 'bg-emerald-500 text-[#070a0f]'
                                : showWrong
                                ? 'bg-rose-500 text-white'
                                : isSelected
                                ? 'bg-[#ffb800] text-[#070a0f]'
                                : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8]'
                            }`}>
                              {opt.id}
                            </span>
                            <span className="flex-1 leading-relaxed break-words min-w-0">{opt.text}</span>
                            {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                            {showWrong && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    /* ZADANIE OTWARTE (WPISYWANIE SŁOWA/LUKI) */
                    <div className="space-y-3 mb-5 min-w-0">
                      <div className="flex items-center gap-3 min-w-0">
                        <input
                          type="text"
                          disabled={state?.isSubmitted}
                          placeholder="Wpisz brakujące wyrazy..."
                          value={state?.textAnswer || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setAnswerStates(prev => ({
                              ...prev,
                              [task.id]: {
                                selectedOptionId: null,
                                textAnswer: val,
                                isSubmitted: false,
                                isCorrect: null,
                                showExplanation: false,
                                attempts: prev[task.id]?.attempts || 0
                              }
                            }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !state?.isSubmitted) {
                              handleSubmitAnswer(task);
                            }
                          }}
                          className={`flex-1 bg-[#070a0f] border rounded-xl px-4 py-3 text-sm text-[#dfe2f1] placeholder-[#94a3b8]/60 focus:outline-none transition-colors min-w-0 ${
                            state?.isSubmitted
                              ? state.isCorrect
                                ? 'border-emerald-500 bg-emerald-950/20 text-emerald-200'
                                : 'border-rose-500 bg-rose-950/20 text-rose-200'
                              : 'border-[#141d2e] focus:border-[#ffdca1]'
                          }`}
                        />
                      </div>
                      {state?.isSubmitted && (
                        <div className="text-xs text-[#dfe2f1] break-words">
                          Klucz odpowiedzi: <strong className="text-emerald-400">{task.correctAnswer}</strong>
                          {task.acceptedVariants && task.acceptedVariants.length > 0 && (
                            <span className="text-[#94a3b8]"> (lub: {task.acceptedVariants.join(', ')})</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* PRZYCISKI AKCJI */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 min-w-0">
                    {!state?.isSubmitted ? (
                      <button
                        onClick={() => handleSubmitAnswer(task)}
                        disabled={
                          (task.type === 'SINGLE_CHOICE' || task.type === 'TRUE_FALSE')
                            ? !state?.selectedOptionId
                            : !state?.textAnswer?.trim()
                        }
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:brightness-110 text-[#070a0f] font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center gap-2 cursor-pointer"
                      >
                        <span>Zatwierdź odpowiedź</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleResetTask(task.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                        <span>Spróbuj ponownie</span>
                      </button>
                    )}

                    {onOpenAiTutor && (
                      <button
                        onClick={() => onOpenAiTutor(`Pomóż mi zrozumieć zadanie z języka angielskiego: "${task.title}". Treść: "${task.question}". Wyjaśnij regułę gramatyczną i pułapkę CKE.`)}
                        className="flex items-center gap-1.5 text-xs text-[#ffdca1] hover:text-white font-medium px-3 py-1.5 rounded-lg bg-[#ffb800]/10 border border-[#ffb800]/20 transition-colors cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 text-[#ffb800] shrink-0" />
                        <span>Zapytaj AI Tutora</span>
                      </button>
                    )}
                  </div>

                  {/* WYJAŚNIENIE CORE-4 I PUŁAPKA CKE */}
                  {state?.showExplanation && (
                    <div className="mt-5 pt-4 border-t border-[#141d2e] space-y-3 animate-fadeIn min-w-0">
                      <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-2 min-w-0 overflow-hidden">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Dlaczego ta odpowiedź jest poprawna?</span>
                        </div>
                        <p className="text-xs text-[#dfe2f1] leading-relaxed break-words">
                          {task.explanation}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5 min-w-0 overflow-hidden">
                        <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wide">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>Pułapka CKE i błąd myślowy</span>
                        </div>
                        <p className="text-xs text-[#dfe2f1] leading-relaxed break-words">
                          {task.ckeTrap}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* PAGINACJA */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={taskPage === 1}
                onClick={() => setTaskPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-xl bg-[#0e1522] border border-[#141d2e] text-sm font-semibold text-[#dfe2f1] disabled:opacity-40 hover:bg-[#141d2e] transition-colors cursor-pointer"
              >
                Poprzednia strona
              </button>
              <span className="px-4 py-2 text-xs font-medium text-[#94a3b8]">
                Strona {taskPage} z {totalPages}
              </span>
              <button
                disabled={taskPage === totalPages}
                onClick={() => setTaskPage(p => Math.min(totalPages, p + 1))}
                className="px-4 py-2 rounded-xl bg-[#0e1522] border border-[#141d2e] text-sm font-semibold text-[#dfe2f1] disabled:opacity-40 hover:bg-[#141d2e] transition-colors cursor-pointer"
              >
                Następna strona
              </button>
            </div>
          )}
        </div>
      )}

      {/* TRYB 2: KURS DZIAŁOWY (15 DZIAŁÓW MATURALNYCH) */}
      {hubMode === 'lessons' && !expandedSectionId && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0e1522] p-4 sm:p-5 rounded-xl border border-[#141d2e]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#ffb800]/10 border border-[#ffb800]/20 text-[#ffdca1] text-xs font-bold">
                  Kompletny Kurs Maturalny CKE
                </span>
                <span className="text-xs text-[#94a3b8]">15 Działów • 75 Lekcji Core-4</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Wybierz dział egzaminacyjny i rozpocznij lekcję
              </h2>
              <p className="text-xs text-[#94a3b8] mt-1">
                Każdy dział zawiera dokładnie 5 dedykowanych mikrolekcji z Pigułką Bento, pułapkami CKE i zadaniami treningowymi.
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-[#94a3b8]">Opanowane zadania w kursie:</span>
              <div className="text-sm font-bold text-[#ffdca1]">
                {isDev ? ALL_ENGLISH_TASKS.length : completedTaskIds.length} / {ALL_ENGLISH_TASKS.length} zadań CKE
              </div>
            </div>
          </div>

          {/* Siatka 15 Kart Działów (Akordeon na mobile) */}
          <div className="space-y-4">
            {/* Mobile accordion controls */}
            <div className="sm:hidden flex items-center justify-between text-xs text-[#94a3b8] px-1">
              <span>Dotknij dział, aby rozwinąć lekcje:</span>
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  const allOpen = Object.keys(expandedSectionIds).length >= ENGLISH_SECTIONS.length;
                  if (allOpen) {
                    setExpandedSectionIds({});
                  } else {
                    const all: Record<string, boolean> = {};
                    ENGLISH_SECTIONS.forEach(s => { all[s.id] = true; });
                    setExpandedSectionIds(all);
                  }
                }}
                className="text-primary font-bold hover:underline cursor-pointer"
              >
                {Object.keys(expandedSectionIds).length >= ENGLISH_SECTIONS.length ? 'Zwiń wszystkie' : 'Rozwiń wszystkie'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
            {ENGLISH_SECTIONS.map((section) => {
              const sectionTasks = ALL_ENGLISH_TASKS.filter(t => t.topicId === section.id);
              const completedInSection = isDev ? sectionTasks : sectionTasks.filter(t => completedTaskIds.includes(t.id));
              const sectionLessons = getEnglishLessonsByTopic(section.id);
              const completedLessonsCount = isDev
                ? (sectionLessons.length || 5)
                : sectionLessons.filter(l => 
                    Array.isArray(completedLessonIds) 
                      ? completedLessonIds.includes(l.id)
                      : typeof completedLessonIds === 'object' && completedLessonIds !== null && !!(completedLessonIds as any)[l.id]
                  ).length;
              const totalLessonsCount = sectionLessons.length || 5;
              const progressPct = isDev ? 100 : (totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0);
              const isExpanded = !!expandedSectionIds[section.id];

              return (
                <div
                  key={section.id}
                  className={`bg-[#0e1522] border rounded-xl p-3.5 sm:p-5 shadow-sm flex flex-col justify-between transition-all duration-200 group/card min-w-0 overflow-hidden ${
                    isExpanded ? 'border-primary/40' : 'border-[#141d2e] hover:border-[#1e293b]'
                  }`}
                >
                  <div className="min-w-0">
                    {/* Górny nagłówek z numerem i wagą CKE (klikalny na mobile jako akordeon) */}
                    <div 
                      onClick={() => toggleMobileSection(section.id)}
                      className="flex items-center justify-between gap-2 min-w-0 cursor-pointer sm:cursor-default select-none pb-1"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/20 flex items-center justify-center text-[#ffdca1] shrink-0 group-hover/card:scale-105 transition-transform">
                          {getSectionIcon(section.icon)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold uppercase text-[#ffdca1] bg-[#ffb800]/10 px-2 py-0.5 rounded-md border border-[#ffb800]/20 shrink-0">
                              Dział {section.numericId}
                            </span>
                            <span className="text-[10px] text-[#94a3b8] font-medium truncate max-w-[120px]">
                              {section.pillarName}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-white leading-tight mt-1 truncate">
                            {section.short_title}
                          </h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#ffdca1] px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#ffb800]/10 border border-[#ffb800]/20 rounded-lg">
                          {section.points_range}
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
                        {section.description}
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
                                  {isLComp ? '✓' : `${section.numericId}.${lIdx + 1}`}
                                </span>
                                <span className={`truncate text-xs min-w-0 flex-1 ${isLComp ? 'text-[#94a3b8] line-through' : 'text-[#dfe2f1] font-medium'}`}>
                                  {l.title.replace(/^Lekcja \d+\.\d+:\s*/i, '')}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#94a3b8]/80 font-mono shrink-0">5 pytań</span>
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
                        setExpandedSectionId(section.id);
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
                        setSelectedSectionFilter(section.id);
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
        </div>
      )}

      {/* TRYB 2B: ROZWINIĘTY DZIAŁ Z 3 LEKCJAMI CORE-4 */}
      {hubMode === 'lessons' && expandedSectionId && (() => {
        const currentSection = ENGLISH_SECTIONS.find(s => s.id === expandedSectionId);
        if (!currentSection) return null;

        const sectionLessons = getEnglishLessonsByTopic(currentSection.id);
        const sectionTasks = ALL_ENGLISH_TASKS.filter(t => t.topicId === currentSection.id);

        const handleStartLessonDirect = (lesson: EnglishLessonData) => {
          setActiveLessonId(lesson.id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        return (
          <div className="space-y-6">
            {/* PRZYCISK POWROTU */}
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
                    {getSectionIcon(currentSection.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 text-xs font-bold">
                        Dział {currentSection.numericId}
                      </span>
                      <span className="text-xs font-semibold text-[#94a3b8]">
                        {currentSection.pillarName}
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
                  <span className="text-xs text-[#94a3b8] font-medium">
                    {sectionTasks.length} pytań w puli
                  </span>
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
                                {lesson.subtitle}
                              </p>

                              <div className="flex items-center gap-2.5 mt-2 text-xs text-[#94a3b8] flex-wrap min-w-0">
                                <span className="flex items-center gap-1 text-[#dfe2f1] font-medium">
                                  <Clock className="w-3.5 h-3.5 text-[#ffb800] shrink-0" />
                                  <span>~{lesson.estimatedMinutes} min</span>
                                </span>
                                <span>•</span>
                                <span className="text-white font-medium">
                                  Wymóg: {lesson.taskIds.length} zadań maturalnych
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

                            {/* SEKCJA 1: PEWNIAKI MATURALNE */}
                            {(() => {
                              const pewniakData = getDuetDataForLesson(lesson.id, lesson.topicId);
                              return (
                                <>
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
                                              🔥 {pewniakData.ckeFrequency}
                                            </span>
                                          </div>
                                          <h4 className="text-base sm:text-lg font-bold text-white break-words">
                                            100% CKE Standard & Żelazne Reguły
                                          </h4>
                                        </div>
                                      </div>
                                      <span className="text-xs font-mono font-bold text-[#ffdca1] bg-[#ffb800]/10 border border-[#ffb800]/20 px-3 py-1 rounded-full hidden sm:inline-block shrink-0">
                                        BEZLITOSNE PUNKTOWANIE
                                      </span>
                                    </div>

                                    <EnglishConceptFormatter content={lesson.theoryPill.concept_essence} />

                                    {/* KARTA KONTRASTU CKE: DO vs DON'T */}
                                    {pewniakData.doVsDont && (
                                      <div className="pt-2 min-w-0">
                                        <div className="rounded-xl border border-[#141d2e] bg-[#0e1522] p-4 sm:p-5 space-y-3 min-w-0 overflow-hidden">
                                          <div className="flex items-center justify-between gap-2 border-b border-[#141d2e] pb-2 flex-wrap min-w-0">
                                            <div className="flex items-center gap-2 min-w-0">
                                              <span className="w-2 h-2 rounded-full bg-[#ffb800] shrink-0" />
                                              <span className="text-xs font-bold uppercase text-[#dfe2f1] tracking-wider truncate">
                                                KONTRAST CKE • DO VS DON'T
                                              </span>
                                            </div>
                                            <span className="text-[10px] font-bold text-[#ffdca1] uppercase shrink-0">
                                              Różnica między 100% a 0 pkt
                                            </span>
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1 min-w-0">
                                            {/* DO */}
                                            <div className="rounded-xl p-3.5 bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between gap-2 min-w-0 overflow-hidden">
                                              <div className="min-w-0">
                                                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase mb-1">
                                                  <Check className="w-4 h-4 stroke-[3] shrink-0" />
                                                  <span>100% CKE Standard (DO)</span>
                                                </div>
                                                <div className="text-xs sm:text-sm font-bold text-emerald-100 font-mono bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-500/30 break-words whitespace-normal">
                                                  {pewniakData.doVsDont.doText}
                                                </div>
                                              </div>
                                              <p className="text-xs text-emerald-200/90 leading-relaxed break-words">
                                                {pewniakData.doVsDont.doExplanation}
                                              </p>
                                            </div>

                                            {/* DON'T */}
                                            <div className="rounded-xl p-3.5 bg-rose-950/20 border border-rose-500/30 flex flex-col justify-between gap-2 min-w-0 overflow-hidden">
                                              <div className="min-w-0">
                                                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase mb-1">
                                                  <XCircle className="w-4 h-4 stroke-[2.5] shrink-0" />
                                                  <span>Typowy błąd CKE (DON'T)</span>
                                                </div>
                                                <div className="text-xs sm:text-sm font-bold text-rose-200 font-mono bg-rose-950/60 p-2.5 rounded-lg border border-rose-500/30 line-through decoration-rose-400 decoration-2 break-words whitespace-normal">
                                                  {pewniakData.doVsDont.dontText}
                                                </div>
                                              </div>
                                              <p className="text-xs text-rose-200/90 leading-relaxed break-words">
                                                {pewniakData.doVsDont.dontExplanation}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* SEKCJA 1B: KAFELEK MINI-INTERAKCJI: MATURALNY DUET */}
                                  <MaturalnyDuetGame lessonId={lesson.id} topicId={lesson.topicId} />
                                </>
                              );
                            })()}

                            {/* SEKCJA 2: BOSS TRAP (PUŁAPKA CKE) */}
                            {lesson.theoryPill.exam_trap && (
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
                                  {lesson.theoryPill.exam_trap}
                                </div>
                              </div>
                            )}

                            {/* SEKCJA 3: MISJE MODELOWE KROK PO KROKU */}
                            {lesson.theoryPill.worked_examples && lesson.theoryPill.worked_examples.length > 0 && (
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
                                      Modelowe Zadania CKE Krok po Kroku
                                    </h4>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
                                  {lesson.theoryPill.worked_examples.map((ex: any, exIdx: number) => (
                                    <div key={exIdx} className="p-4 sm:p-5 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-4 flex flex-col justify-between shadow-sm min-w-0 overflow-hidden">
                                      <div className="space-y-3.5 min-w-0">
                                        <div className="flex items-center justify-between gap-2 min-w-0">
                                          <span className="text-xs sm:text-sm font-bold text-[#ffdca1] bg-[#ffb800]/10 border border-[#ffb800]/20 px-3 py-1 rounded-xl truncate">
                                            {ex.title || `Misja Modelowa #${exIdx + 1}`}
                                          </span>
                                          <span className="text-[11px] font-mono text-[#94a3b8] font-bold shrink-0">ARKUSZ CKE</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-[#0e1522] border border-[#141d2e] text-sm text-[#dfe2f1] font-medium leading-relaxed italic break-words">
                                          "{ex.problem}"
                                        </div>

                                        {ex.steps && (
                                          <div className="space-y-2.5 pt-1 min-w-0">
                                            {ex.steps.map((st: any, sIdx: number) => (
                                              <div key={sIdx} className="flex items-start gap-3 p-3 rounded-xl bg-[#0e1522] border border-[#141d2e] min-w-0">
                                                <span className="px-2.5 py-1 rounded-lg bg-[#ffb800]/10 border border-[#ffb800]/20 text-[#ffdca1] text-xs font-bold shrink-0 mt-0.5">
                                                  KROK {st.num || sIdx + 1}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                  {st.label && <strong className="text-xs sm:text-sm font-bold text-white block mb-0.5 break-words">{st.label}:</strong>}
                                                  <span className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed break-words">{st.text}</span>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>

                                      <div className="space-y-3 pt-3 border-t border-[#141d2e] min-w-0">
                                        {ex.result && (
                                          <div className="p-3.5 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/30 flex flex-wrap items-center justify-between gap-2 min-w-0">
                                            <span className="text-xs sm:text-sm font-bold text-[#dfe2f1]">Zwycięska odpowiedź CKE:</span>
                                            <span className="text-xs sm:text-sm md:text-base font-bold text-[#ffdca1] bg-[#070a0f] px-3.5 py-1.5 rounded-lg border border-[#ffb800]/30 font-mono break-words">
                                              {ex.result}
                                            </span>
                                          </div>
                                        )}
                                        {ex.matura_tip && (
                                          <div className="p-3.5 rounded-xl bg-[#0e1522] border border-[#141d2e] text-[#ffdca1] text-xs sm:text-sm flex items-start gap-2.5 min-w-0">
                                            <Lightbulb className="w-4 h-4 text-[#ffb800] shrink-0 mt-0.5" />
                                            <span className="leading-relaxed break-words flex-1"><strong>Wskazówka Egzaminatora:</strong> {ex.matura_tip}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
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
                                    Lekcja zawiera {lesson.taskIds.length} wyselekcjonowanych zadań maturalnych. Każde zadanie to natychmiastowe XP i monety!
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleStartLessonDirect(lesson)}
                                  className="w-full lg:w-auto py-3 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:brightness-110 text-[#070a0f] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-3 cursor-pointer shrink-0 text-center"
                                >
                                  <Play className="w-4 h-4 fill-[#070a0f] shrink-0" />
                                  <span className="whitespace-normal sm:whitespace-nowrap">ROZPOCZNIJ MISJĘ ({lesson.taskIds.length} ZADAŃ)</span>
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
                    Otwórz w pełnej przeglądarce zadań
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {sectionTasks.slice(0, 10).map((task) => {
                    return (
                      <div
                        key={task.id}
                        className="bg-[#0e1522] border border-[#141d2e] rounded-xl p-5 space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#ffdca1]">{task.id}</span>
                          <span className="text-[#94a3b8]">{task.source}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white">{task.title}</h4>
                        <p className="text-xs text-[#dfe2f1] whitespace-pre-line">{task.question}</p>

                        {task.transcriptSnippet && (
                          <div className="p-3 rounded-xl bg-[#070a0f] border border-[#141d2e] text-xs text-[#94a3b8]">
                            <span className="font-bold text-[#ffdca1]">Transkrypcja audio: </span>
                            {task.transcriptSnippet}
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-between">
                          <button
                            onClick={() => {
                              setSelectedSectionFilter(currentSection.id);
                              setSearchQuery(task.id);
                              setHubMode('task_browser');
                            }}
                            className="text-xs text-[#ffdca1] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            Rozwiąż to zadanie interaktywnie →
                          </button>
                          <span className="text-xs text-[#94a3b8]">Waga: {task.points} pkt</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })()}
      </main>

      {/* SZYBKI MODAL MATURALNY DUET */}
      {showQuickDuetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0e1522] border border-[#141d2e] rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#141d2e]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/20 flex items-center justify-center text-[#ffdca1]">
                  <Zap className="w-5 h-5 text-[#ffb800]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Maturalny Duet • Trening Par CKE</h3>
                  <p className="text-xs text-[#94a3b8]">Dopasuj wyrażenia z oficjalnej podstawy programowej</p>
                </div>
              </div>
              <button
                onClick={() => setShowQuickDuetModal(false)}
                className="p-2 rounded-lg bg-[#070a0f] hover:bg-[#141d2e] text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section Selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#94a3b8] mb-1.5">Wybierz dział do gry w Duet:</label>
              <select
                value={quickDuetTopicId}
                onChange={(e) => setQuickDuetTopicId(e.target.value)}
                className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl px-3 py-2 text-sm text-[#dfe2f1] focus:outline-none focus:border-[#ffdca1]"
              >
                {ENGLISH_SECTIONS.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    Dział {sec.numericId}: {sec.short_title}
                  </option>
                ))}
              </select>
            </div>

            <MaturalnyDuetGame lessonId={`eng-lesson-${quickDuetTopicId.replace('topic-', '')}-1`} topicId={quickDuetTopicId} />
          </div>
        </div>
      )}

      {/* Modal Słownika Maturalnego CKE */}
      <EnglishDictionaryModal
        isOpen={showDictionaryModal}
        onClose={() => setShowDictionaryModal(false)}
      />
    </div>
  );
};
