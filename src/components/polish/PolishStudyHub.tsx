import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  FileText,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  RotateCcw,
  Search,
  Layers,
  Award,
  PenTool,
  Bookmark,
  Send,
  Eye,
  Check,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Star,
  Timer,
  CheckCheck,
  Play,
  Flame,
  Lightbulb,
  Lock,
  RefreshCw,
  Target,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PolishTask, PolishEpoch, PolishPartNumber, PolishTaskType } from '../../types/maturaTypes';
import { PolishLesson, PolishModuleType } from '../../types/lessonTypes';
import { ALL_POLISH_TASKS, POLISH_EPOCHS, POLISH_LESSONS, POLISH_SECTIONS, PolishSection } from '../../data/polish';
import { PolishLessonView } from './PolishLessonView';
import { TaskVisualAssetCard } from './TaskVisualAssetCard';
import { TaskMatchingInteractive } from './TaskMatchingInteractive';

import { UserState } from '../../types';
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

export type { PolishSection };

interface TaskAnswerState {
  selectedOption: number | null;
  tfAnswers: Record<number, boolean>;
  openAnswer: string;
  synthesisText: string;
  isSubmitted: boolean;
  attempts: number;
  pointsAwarded: number;
  maxPoints: number;
  feedback: {
    isCorrect: boolean;
    message: string;
    partialScore?: {
      content: number;
      composition: number;
      language: number;
      total: number;
    };
  } | null;
}

interface PolishStudyHubProps {
  userState?: UserState;
  onDeductCoins?: (amount: number) => boolean;
  onCompleteTask?: (taskId: string, pointsEarned: number) => void;
  onCompleteLesson?: (lessonId: string, pointsEarned: number) => void;
  completedLessonIds?: string[];
  completedTaskIds?: string[];
  initialMode?: 'lessons' | 'task_browser';
  initialActiveLessonId?: string | null;
  initialTaskFilter?: any;
  onOpenAiTutor?: (contextPrompt: string) => void;
  onClose?: () => void;
}

export const PolishStudyHub: React.FC<PolishStudyHubProps> = ({
  userState,
  onDeductCoins,
  onCompleteTask,
  onCompleteLesson,
  completedLessonIds: propCompletedLessonIds,
  completedTaskIds: _propCompletedTaskIds,
  initialMode,
  initialActiveLessonId,
  initialTaskFilter: _initialTaskFilter,
  onOpenAiTutor,
  onClose,
}) => {
  const isDev = Boolean(userState?.isDev || userState?.isPro);

  // Główny tryb: Kurs Lekcyjny (24 lekcje po 45 min) vs Baza Zadań (Filtry)
  const [hubMode, setHubMode] = useState<'lessons' | 'task_browser'>(initialMode || 'lessons');

  // Aktywna lekcja (jeśli użytkownik wszedł w tryb 45-minutowej sesji)
  const [activeLessonId, setActiveLessonId] = useState<string | null>(initialActiveLessonId || null);

  // Rozwinięty dział w trybie kursu
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);

  // Mobile accordion state: domyślnie pierwszy dział jest rozwinięty
  const [expandedSectionIds, setExpandedSectionIds] = useState<Record<string, boolean>>(() => ({
    [POLISH_SECTIONS[0]?.id || 'pol-dzial-1']: true
  }));

  const toggleMobileSection = (id: string) => {
    triggerHaptic('light');
    setExpandedSectionIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Sub-tabs wewnątrz rozwiniętego działu: Lekcje Core-4 vs Baza Zadań Działu
  const [sectionInnerTab, setSectionInnerTab] = useState<'lessons' | 'tasks'>('lessons');

  // ID rozwiniętej pigułki Bento w kartach lekcji
  const [expandedLessonPillId, setExpandedLessonPillId] = useState<string | null>(null);

  // Ikona dla działu
  const getPolishSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-5 h-5 text-emerald-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-amber-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-fuchsia-400" />;
      case 'PenTool': return <PenTool className="w-5 h-5 text-teal-400" />;
      default: return <BookOpen className="w-5 h-5 text-amber-400" />;
    }
  };

  // Zadania dla danego działu
  const getSectionTasks = (secId: string) => {
    switch (secId) {
      case 'pol-dzial-1':
        return ALL_POLISH_TASKS.filter(t => t.part === 1 || t.partName === 'Język polski w użyciu');
      case 'pol-dzial-2': {
        const syn = ALL_POLISH_TASKS.filter(t => t.taskType === 'synthesis_note');
        return syn.length > 0 ? syn : ALL_POLISH_TASKS.filter(t => t.part === 1).slice(0, 10);
      }
      case 'pol-dzial-3': {
        const ret = ALL_POLISH_TASKS.filter(t => t.taskType === 'single_choice' && t.part === 1);
        return ret.length > 0 ? ret : ALL_POLISH_TASKS.filter(t => t.part === 1).slice(0, 10);
      }
      case 'pol-dzial-4': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Starożytność i Biblia');
        return res.length > 0 ? res : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(0, 8);
      }
      case 'pol-dzial-5': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Średniowiecze');
        return res.length > 0 ? res : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(4, 12);
      }
      case 'pol-dzial-6': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Renesans');
        return res.length > 0 ? res : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(8, 16);
      }
      case 'pol-dzial-7': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Barok');
        return res.length > 0 ? res : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(10, 18);
      }
      case 'pol-dzial-8': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Oświecenie');
        return res.length > 0 ? res : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(12, 20);
      }
      case 'pol-dzial-9': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Romantyzm');
        return res.length > 0 ? res.slice(0, Math.ceil(res.length / 2)) : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(14, 22);
      }
      case 'pol-dzial-10': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Romantyzm');
        return res.length > 0 ? res.slice(Math.floor(res.length / 2)) : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(16, 24);
      }
      case 'pol-dzial-11': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Pozytywizm');
        return res.length > 0 ? res : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(18, 26);
      }
      case 'pol-dzial-12': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Młoda Polska');
        return res.length > 0 ? res : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(20, 28);
      }
      case 'pol-dzial-13': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Dwudziestolecie międzywojenne');
        return res.length > 0 ? res : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(22, 30);
      }
      case 'pol-dzial-14': {
        const res = ALL_POLISH_TASKS.filter(t => t.epoch === 'Wojna i okupacja' || t.epoch === 'Współczesność');
        return res.length > 0 ? res : ALL_POLISH_TASKS.filter(t => t.part === 2).slice(24, 32);
      }
      case 'pol-dzial-15':
        return ALL_POLISH_TASKS.filter(t => t.part === 3 || t.taskType === 'essay_blueprint' || t.taskType === 'cardinal_error_detector');
      default:
        return ALL_POLISH_TASKS.slice(0, 10);
    }
  };

  // Filtry dla kursu lekcyjnego
  const [selectedLessonModule, setSelectedLessonModule] = useState<PolishModuleType | 'all'>('all');
  const [lessonSearchQuery, setLessonSearchQuery] = useState('');

  // Ukończone lekcje (zapisywane lokalnie)
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    if (propCompletedLessonIds && propCompletedLessonIds.length > 0) return propCompletedLessonIds;
    try {
      const saved = localStorage.getItem('jasne_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleCompleteLesson = (lessonId: string, pointsEarned: number) => {
    onCompleteLesson?.(lessonId, pointsEarned);
    setCompletedLessonIds((prev) => {
      if (prev.includes(lessonId)) return prev;
      const updated = [...prev, lessonId];
      try {
        localStorage.setItem('jasne_completed_lessons', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    if (onCompleteTask) {
      onCompleteTask(`lesson-${lessonId}`, pointsEarned);
    }
  };

  // Filtrowanie lekcji
  const filteredLessons = useMemo(() => {
    return POLISH_LESSONS.filter((lesson) => {
      if (selectedLessonModule !== 'all' && lesson.module !== selectedLessonModule) return false;
      if (lessonSearchQuery.trim()) {
        const q = lessonSearchQuery.toLowerCase();
        const matchTitle = lesson.title.toLowerCase().includes(q);
        const matchSubtitle = lesson.subtitle.toLowerCase().includes(q);
        const matchEpoch = lesson.epoch?.toLowerCase().includes(q);
        const matchLektura = lesson.lektura?.toLowerCase().includes(q);
        if (!matchTitle && !matchSubtitle && !matchEpoch && !matchLektura) return false;
      }
      return true;
    });
  }, [selectedLessonModule, lessonSearchQuery]);

  // Stan bazy pojedynczych zadań
  const [selectedPart, setSelectedPart] = useState<PolishPartNumber | 'all'>('all');
  const [selectedEpoch, setSelectedEpoch] = useState<PolishEpoch | 'all'>('all');
  const [selectedType, setSelectedType] = useState<PolishTaskType | 'all'>('all');
  const [taskSearchQuery, setTaskSearchQuery] = useState('');
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [taskPage, setTaskPage] = useState(1);

  // Stan odpowiedzi i postępów w bazie pojedynczych zadań CKE
  const [taskAnswers, setTaskAnswers] = useState<Record<string, TaskAnswerState>>(() => {
    try {
      const saved = localStorage.getItem('jasne_polish_browser_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [showExplanation, setShowExplanation] = useState(false);
  const [showCkeKey, setShowCkeKey] = useState(false);

  // Filtrowanie zadań
  const filteredTasks = useMemo(() => {
    return ALL_POLISH_TASKS.filter((task) => {
      if (selectedPart !== 'all' && task.part !== selectedPart) return false;
      if (selectedEpoch !== 'all' && task.epoch !== selectedEpoch) return false;
      if (selectedType !== 'all' && task.taskType !== selectedType) return false;
      if (taskSearchQuery.trim()) {
        const q = taskSearchQuery.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(q);
        const matchQuestion = task.question.toLowerCase().includes(q);
        const matchLektura = task.lektura?.toLowerCase().includes(q);
        const matchEpoch = task.epoch?.toLowerCase().includes(q);
        if (!matchTitle && !matchQuestion && !matchLektura && !matchEpoch) return false;
      }
      return true;
    });
  }, [selectedPart, selectedEpoch, selectedType, taskSearchQuery]);

  const currentTask = filteredTasks[activeTaskIndex] || filteredTasks[0];

  const currentAnswerState = useMemo<TaskAnswerState>(() => {
    if (!currentTask) {
      return {
        selectedOption: null,
        tfAnswers: {},
        openAnswer: '',
        synthesisText: '',
        isSubmitted: false,
        attempts: 0,
        pointsAwarded: 0,
        maxPoints: 0,
        feedback: null,
      };
    }
    return (
      taskAnswers[currentTask.id] || {
        selectedOption: null,
        tfAnswers: {},
        openAnswer: '',
        synthesisText: '',
        isSubmitted: false,
        attempts: 0,
        pointsAwarded: 0,
        maxPoints: currentTask.points,
        feedback: null,
      }
    );
  }, [taskAnswers, currentTask]);

  const updateCurrentAnswer = (patch: Partial<TaskAnswerState>) => {
    if (!currentTask) return;
    setTaskAnswers((prev) => {
      const current = prev[currentTask.id] || {
        selectedOption: null,
        tfAnswers: {},
        openAnswer: '',
        synthesisText: '',
        isSubmitted: false,
        attempts: 0,
        pointsAwarded: 0,
        maxPoints: currentTask.points,
        feedback: null,
      };
      const updated = {
        ...prev,
        [currentTask.id]: {
          ...current,
          ...patch,
        },
      };
      try {
        localStorage.setItem('jasne_polish_browser_answers', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleSelectTask = (index: number) => {
    setActiveTaskIndex(index);
    setShowExplanation(false);
    setShowCkeKey(false);
  };

  const synthesisWordCount = useMemo(() => {
    const text = currentAnswerState.synthesisText?.trim() || '';
    if (!text) return 0;
    return text.split(/\s+/).length;
  }, [currentAnswerState.synthesisText]);

  // =========================================================================
  // MECHANIKA OCENIANIA ZADAŃ W BAZIE CKE (BLOKADA KLUCZA DO ZATWIERDZENIA)
  // =========================================================================

  // 1. Zadanie ABCD z systemem 2 prób
  const handleSubmitSingleChoice = () => {
    if (!currentTask || currentAnswerState.selectedOption === null) return;
    const isCorrect = currentAnswerState.selectedOption === currentTask.correctOptionIndex;
    const newAttempts = currentAnswerState.attempts + 1;

    if (isCorrect) {
      const earned = newAttempts === 1 ? currentTask.points : Math.max(0.5, currentTask.points * 0.5);
      updateCurrentAnswer({
        isSubmitted: true,
        attempts: newAttempts,
        pointsAwarded: earned,
        feedback: {
          isCorrect: true,
          message:
            newAttempts === 1
              ? `Znakomicie! Poprawna odpowiedź z oficjalnego klucza CKE (+${earned} pkt).`
              : `Poprawna odpowiedź w 2. próbie (+${earned} pkt).`,
        },
      });
      setShowExplanation(true);
      setShowCkeKey(true);
      if (onCompleteTask) {
        onCompleteTask(currentTask.id, earned);
      }
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    } else {
      if (newAttempts === 1) {
        updateCurrentAnswer({
          attempts: newAttempts,
          feedback: {
            isCorrect: false,
            message:
              'Niestety to nie jest poprawna odpowiedź. Masz jeszcze 1 próbę (za 50% punktów) lub możesz odsłonić klucz CKE.',
          },
        });
      } else {
        updateCurrentAnswer({
          isSubmitted: true,
          attempts: newAttempts,
          pointsAwarded: 0,
          feedback: {
            isCorrect: false,
            message: 'Błędna odpowiedź w 2. próbie (0 pkt). Zapoznaj się z poniższym wyjaśnieniem i oficjalnym kluczem CKE.',
          },
        });
        setShowExplanation(true);
        setShowCkeKey(true);
      }
    }
  };

  // 2. Zadanie Prawda / Fałsz (Tabela CKE)
  const handleSubmitTrueFalse = () => {
    if (!currentTask || !currentTask.trueFalseStatements) return;
    const statements = currentTask.trueFalseStatements;
    const answers = currentAnswerState.tfAnswers;
    const newAttempts = currentAnswerState.attempts + 1;

    let correctCount = 0;
    statements.forEach((item, idx) => {
      if (answers[idx] === item.isTrue) {
        correctCount++;
      }
    });

    const isAllCorrect = correctCount === statements.length;

    let earned = 0;
    if (statements.length === 2) {
      earned = isAllCorrect ? 1 : 0;
    } else if (statements.length === 3) {
      earned = correctCount === 3 ? 2 : correctCount === 2 ? 1 : 0;
    } else {
      earned = isAllCorrect ? currentTask.points : 0;
    }

    if (newAttempts > 1 && earned > 0) {
      earned = Math.max(0.5, earned * 0.5);
    }

    if (isAllCorrect) {
      updateCurrentAnswer({
        isSubmitted: true,
        attempts: newAttempts,
        pointsAwarded: earned,
        feedback: {
          isCorrect: true,
          message: `Bezbłędna ocena wszystkich stwierdzeń! Przyznano ${earned}/${currentTask.points} pkt CKE.`,
        },
      });
      setShowExplanation(true);
      setShowCkeKey(true);
      if (onCompleteTask) {
        onCompleteTask(currentTask.id, earned);
      }
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    } else {
      if (newAttempts === 1) {
        updateCurrentAnswer({
          attempts: newAttempts,
          feedback: {
            isCorrect: false,
            message: `Poprawnie oceniono ${correctCount} z ${statements.length} zdań. Możesz poprawić odpowiedzi w 2. próbie lub odsłonić klucz CKE.`,
          },
        });
      } else {
        updateCurrentAnswer({
          isSubmitted: true,
          attempts: newAttempts,
          pointsAwarded: earned,
          feedback: {
            isCorrect: earned > 0,
            message: `Wynik ostateczny: ${correctCount}/${statements.length} poprawnych zdań (${earned}/${currentTask.points} pkt). Zobacz wyjaśnienia do każdego wiersza poniżej.`,
          },
        });
        setShowExplanation(true);
        setShowCkeKey(true);
        if (earned > 0 && onCompleteTask) {
          onCompleteTask(currentTask.id, earned);
        }
      }
    }
  };

  // 3. Notatka syntetyzująca wg matrycy CKE (4 pkt)
  const handleSubmitSynthesis = () => {
    if (!currentTask) return;
    const text = currentAnswerState.synthesisText?.trim() || '';
    const words = synthesisWordCount;

    // Kryterium 1: Treść (0–2 pkt) – synteza obu autorów
    const hasAuthor1 = /autor|tekst|pierwsz|stanowisk|krzemińsk|luecke|dyczewsk|limon|kołakowsk/i.test(text);
    const hasAuthor2 = /drugi|drugiego|z kolei|natomiast|odmiennie|podobnie|oba|obydwa/i.test(text);
    const hasSynthesis = /wspóln|syntez|wniosek|zarówno|podsumowuj|pokazuj|konkluduj/i.test(text);

    let contentScore = 0;
    if (hasAuthor1 && hasAuthor2 && hasSynthesis && words >= 50) {
      contentScore = 2;
    } else if ((hasAuthor1 || hasAuthor2) && words >= 40) {
      contentScore = 1;
    }

    // Kryterium 2: Kompozycja i spójność (0–1 pkt)
    let compositionScore = 0;
    if (words >= 60 && words <= 90) {
      compositionScore = 1;
    }

    // Kryterium 3: Język i styl (0–1 pkt)
    let languageScore = 0;
    if (words >= 55 && !/fajne|mega|super|spoko|głupie/i.test(text)) {
      languageScore = 1;
    }

    const total = contentScore + compositionScore + languageScore;

    let message = '';
    if (words < 60) {
      message = `Liczba słów (${words}) jest poniżej bezwzględnego progu CKE (60–90 słów) – utrata punktu za kompozycję.`;
    } else if (words > 90) {
      message = `Przekroczono limit słów (${words} > 90) – utrata punktu za kompozycję i formę.`;
    } else {
      message = `Liczba słów (${words}) idealnie mieści się w wyznaczonym oknie 60–90 wyrazów!`;
    }

    updateCurrentAnswer({
      isSubmitted: true,
      attempts: currentAnswerState.attempts + 1,
      pointsAwarded: total,
      feedback: {
        isCorrect: total >= 3,
        message,
        partialScore: {
          content: contentScore,
          composition: compositionScore,
          language: languageScore,
          total,
        },
      },
    });

    setShowExplanation(true);
    setShowCkeKey(true);
    if (onCompleteTask) {
      onCompleteTask(currentTask.id, total);
    }
    if (total >= 3) {
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  // 4. Zadanie otwarte (krótka odpowiedź)
  const handleSubmitOpenTask = () => {
    if (!currentTask) return;
    const answer = currentAnswerState.openAnswer.trim();
    if (!answer) return;

    let earned = 0;
    const len = answer.length;
    if (currentTask.ckeKeyCriteria && currentTask.ckeKeyCriteria.length > 0) {
      if (len > 30) {
        earned = currentTask.points;
      } else if (len > 12) {
        earned = Math.max(1, Math.floor(currentTask.points / 2));
      }
    } else {
      earned = len > 20 ? currentTask.points : 1;
    }

    updateCurrentAnswer({
      isSubmitted: true,
      attempts: currentAnswerState.attempts + 1,
      pointsAwarded: earned,
      feedback: {
        isCorrect: earned === currentTask.points,
        message:
          earned === currentTask.points
            ? `Twoja odpowiedź spełnia kryteria egzaminatora CKE (${earned}/${currentTask.points} pkt).`
            : `Częściowa zgodność z kluczem CKE (${earned}/${currentTask.points} pkt). Porównaj swoją wersję ze wzorcem poniżej.`,
      },
    });

    setShowExplanation(true);
    setShowCkeKey(true);
    if (onCompleteTask) {
      onCompleteTask(currentTask.id, earned);
    }
    if (earned === currentTask.points) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  // Obsługa interaktywnego dopasowania (Drag & Drop / Click-to-Pair)
  const handleMatchingAnswerSubmit = (earnedPoints: number, answerText: string) => {
    if (!currentTask) return;
    const isFull = earnedPoints === currentTask.points;

    updateCurrentAnswer({
      isSubmitted: true,
      attempts: currentAnswerState.attempts + 1,
      pointsAwarded: earnedPoints,
      feedback: {
        isCorrect: isFull,
        message: isFull
          ? `✅ Znakomita analiza! Poprawnie dopasowano wszystkie pozycje i zneutralizowano dystraktor (+${earnedPoints} pkt).`
          : `⚠️ Poprawne dopasowanie w procedurze 2. szansy (+${earnedPoints} pkt).`,
      },
    });

    setShowExplanation(true);
    setShowCkeKey(true);
    if (onCompleteTask) {
      onCompleteTask(currentTask.id, earnedPoints);
    }
    if (isFull) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  // Druga próba
  const handleRetryTask = () => {
    if (!currentTask) return;
    updateCurrentAnswer({
      selectedOption: null,
      feedback: null,
    });
  };

  // Poddanie zadania / odsłonięcie klucza za 0 pkt
  const handleSurrenderKey = () => {
    if (!currentTask) return;
    updateCurrentAnswer({
      isSubmitted: true,
      pointsAwarded: 0,
      feedback: {
        isCorrect: false,
        message: 'Klucz odpowiedzi odsłonięty bez przyznania punktów (0 pkt).',
      },
    });
    setShowExplanation(true);
    setShowCkeKey(true);
  };

  // Jeśli użytkownik jest w trakcie 45-minutowej lekcji, wyświetl widok PolishLessonView na pełnym ekranie
  if (activeLessonId) {
    const currentLesson = POLISH_LESSONS.find((l) => l.id === activeLessonId);
    if (currentLesson) {
      return (
        <div key={activeLessonId} className="fixed inset-0 z-50 bg-[#070a0f] overflow-y-auto w-full h-full animate-pageTransition">
          <PolishLessonView
            lesson={currentLesson}
            userState={userState}
            onDeductCoins={onDeductCoins}
            onBack={() => {
              setActiveLessonId(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNextLesson={(nextId) => {
              setActiveLessonId(nextId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCompleteLesson={handleCompleteLesson}
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
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffdca1] shrink-0" />
                  <span>Język Polski CKE</span>
                </h1>
              </div>
              <p className="text-xs text-[#94a3b8] hidden sm:block mt-0.5">
                15 modułów egzaminacyjnych • 75 autentycznych lekcji Core-4 • Baza zadań CKE
              </p>
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            <button
              onClick={() => {
                setSelectedLessonModule('Warsztat wypracowania');
                setHubMode('lessons');
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0e1522] hover:bg-[#141d2e] border border-[#ffb800]/30 text-[#ffdca1] text-xs font-medium transition-all shadow-sm cursor-pointer"
              title="Notatki i synteza CKE"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffb800]" />
              <span className="hidden sm:inline">Warsztat & Synteza</span>
              <span className="sm:hidden text-[11px]">Synteza</span>
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
            <span>Kurs Działowy <span className="hidden sm:inline">(15 Działów)</span></span>
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
        {/* ===================================================================== */}
        {/* WIDOK 1: KURS DZIAŁOWY (15 DZIAŁÓW MATURALNYCH)                       */}
        {/* ===================================================================== */}
        {hubMode === 'lessons' && !expandedSectionId && (
          <div className="space-y-6 animate-fadeIn">
            {/* Baner Tytułowy Kursu */}
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

              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs text-[#94a3b8]">Ukończone lekcje w kursie:</span>
                <div className="text-sm font-bold text-[#ffdca1]">
                  {isDev ? 75 : completedLessonIds.length} / 75 lekcji CKE
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
                    const allOpen = Object.keys(expandedSectionIds).length >= POLISH_SECTIONS.length;
                    if (allOpen) {
                      setExpandedSectionIds({});
                    } else {
                      const all: Record<string, boolean> = {};
                      POLISH_SECTIONS.forEach(s => { all[s.id] = true; });
                      setExpandedSectionIds(all);
                    }
                  }}
                  className="text-primary font-bold hover:underline cursor-pointer"
                >
                  {Object.keys(expandedSectionIds).length >= POLISH_SECTIONS.length ? 'Zwiń wszystkie' : 'Rozwiń wszystkie'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {POLISH_SECTIONS.map((section) => {
                const sectionTasks = getSectionTasks(section.id);
                const sectionLessons = POLISH_LESSONS.filter(l => section.lessonIds.includes(l.id));
                const completedLessonsCount = isDev ? sectionLessons.length : sectionLessons.filter(l => completedLessonIds.includes(l.id)).length;
                const progressPct = isDev ? 100 : (sectionLessons.length > 0 ? Math.round((completedLessonsCount / sectionLessons.length) * 100) : 0);
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
                            {getPolishSectionIcon(section.icon)}
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
                          <span>Postęp: <strong className="text-[#ffdca1]">{completedLessonsCount}/{sectionLessons.length}</strong></span>
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

                        {/* ŚCIEŻKA LEKCJI (MINI ROADMAP) */}
                        <div className="space-y-1.5 my-3 p-3 rounded-xl bg-[#070a0f] border border-[#141d2e] min-w-0">
                          <div className="flex items-center justify-between text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider mb-1 min-w-0">
                            <span className="truncate">Ścieżka mikrolekcji Core-4:</span>
                            <span className="text-[#ffdca1] font-mono shrink-0 ml-1">{completedLessonsCount}/{sectionLessons.length}</span>
                          </div>
                          {sectionLessons.map((l, lIdx) => {
                            const isLComp = isDev || completedLessonIds.includes(l.id);
                            return (
                              <div key={l.id} className="flex items-center justify-between text-xs py-0.5 gap-2 min-w-0">
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                                    isLComp ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-[#0e1522] text-[#94a3b8] border border-[#141d2e]'
                                  }`}>
                                    {isLComp ? '✓' : `${section.numericId}.${lIdx + 1}`}
                                  </span>
                                  <span className={`truncate text-xs min-w-0 flex-1 ${isLComp ? 'text-[#94a3b8] line-through' : 'text-[#dfe2f1] font-medium'}`}>
                                    {l.title.replace(/^Lekcja \d+:\s*/i, '')}
                                  </span>
                                </div>
                                <span className="text-[10px] text-[#94a3b8]/80 font-mono shrink-0">{l.durationMinutes || 45} min</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* PASEK POSTĘPU DZIAŁU */}
                        <div className="space-y-1.5 mb-4 min-w-0">
                          <div className="flex items-center justify-between text-xs min-w-0 gap-2">
                            <span className="text-[#94a3b8] font-medium truncate">Postęp działu:</span>
                            <span className="font-bold text-[#ffdca1] shrink-0">
                              {completedLessonsCount} / {sectionLessons.length} lekcji ({progressPct}%)
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

        {/* ===================================================================== */}
        {/* WIDOK 1B: ROZWINIĘTY DZIAŁ Z LEKCJAMI CORE-4                           */}
        {/* ===================================================================== */}
        {hubMode === 'lessons' && expandedSectionId && (() => {
          const currentSection = POLISH_SECTIONS.find(s => s.id === expandedSectionId);
          if (!currentSection) return null;

          const sectionLessons = POLISH_LESSONS.filter(l => currentSection.lessonIds.includes(l.id));
          const sectionTasks = getSectionTasks(currentSection.id);

          const handleStartLessonDirect = (lesson: PolishLesson) => {
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
                      {getPolishSectionIcon(currentSection.icon)}
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
                    const completedLessonsCount = isDev ? sectionLessons.length : sectionLessons.filter(l => completedLessonIds.includes(l.id)).length;
                    const totalLessonsCount = sectionLessons.length;
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
                      Czas przejścia: ok. 5–6 min / lekcja
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {sectionLessons.map((lesson, idx) => {
                      const isLessonCompleted = isDev || completedLessonIds.includes(lesson.id);
                      const firstUncompletedIdx = sectionLessons.findIndex(l => !isDev && !completedLessonIds.includes(l.id));
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
                                    <span>~{lesson.durationMinutes || 45} min</span>
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
                                        Wstęp Merytoryczny & Strategia
                                      </h4>
                                    </div>
                                  </div>
                                  <span className="text-xs font-mono font-bold text-[#ffdca1] bg-[#ffb800]/10 border border-[#ffb800]/20 px-3 py-1 rounded-full hidden sm:inline-block shrink-0">
                                    PUNKTOWANIE CKE
                                  </span>
                                </div>

                                <p className="text-sm sm:text-base text-[#dfe2f1] leading-relaxed break-words">
                                  {lesson.introduction.lead}
                                </p>

                                {/* Punkty teoretyczne */}
                                {lesson.introduction.theoryPoints && lesson.introduction.theoryPoints.length > 0 && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                    {lesson.introduction.theoryPoints.map((tp, tpIdx) => (
                                      <div key={tpIdx} className="p-3.5 rounded-xl bg-[#0e1522] border border-[#141d2e] space-y-1">
                                        <div className="text-xs font-bold text-[#ffdca1]">{tp.title}</div>
                                        <p className="text-xs text-[#94a3b8] leading-relaxed">{tp.content}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Wskazówki egzaminatora */}
                                {lesson.introduction.ckeExaminerTips && lesson.introduction.ckeExaminerTips.length > 0 && (
                                  <div className="p-4 rounded-xl bg-[#0e1522] border border-[#141d2e] space-y-2">
                                    <div className="text-xs font-bold uppercase text-[#ffdca1] tracking-wider flex items-center gap-1.5">
                                      <Lightbulb className="w-4 h-4 text-[#ffb800]" />
                                      <span>Patenty Egzaminatora CKE:</span>
                                    </div>
                                    <ul className="space-y-1.5 text-xs text-[#dfe2f1]">
                                      {lesson.introduction.ckeExaminerTips.map((tip, tipIdx) => (
                                        <li key={tipIdx} className="flex items-start gap-2">
                                          <span className="text-[#ffb800] shrink-0 font-bold">•</span>
                                          <span>{tip}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>

                              {/* SEKCJA 2: BOSS TRAP (PUŁAPKA CKE) */}
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
                                  {lesson.introduction.gatekeeper?.explanation || 'Zwracaj szczególną uwagę na kwantyfikatory skrajne i dosłowność tekstu. Nie dopowiadaj wiedzy pozatekstowej w Części 1 ani nie myl faktów fabularnych w lekturach z gwiazdką.'}
                                </div>
                              </div>

                              {/* SEKCJA 3: MISJE MODELOWE KROK PO KROKU */}
                              {lesson.introduction.gatekeeper && (
                                <div className="space-y-4 min-w-0">
                                  <div className="flex items-center gap-3 px-1 min-w-0">
                                    <div className="w-9 h-9 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/20 flex items-center justify-center text-[#ffdca1] shrink-0">
                                      <Target className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                      <span className="text-[10px] font-bold uppercase text-[#ffdca1] tracking-wider block truncate">
                                        ZADANIE KONTROLNE
                                      </span>
                                      <h4 className="text-base sm:text-lg font-bold text-white truncate">
                                        Pytanie Selekcyjne (Gatekeeper CKE)
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="p-4 sm:p-5 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-4 shadow-sm min-w-0 overflow-hidden">
                                    <div className="p-4 rounded-xl bg-[#0e1522] border border-[#141d2e] text-sm text-[#dfe2f1] font-medium leading-relaxed break-words">
                                      "{lesson.introduction.gatekeeper.question}"
                                    </div>

                                    <div className="space-y-2">
                                      {lesson.introduction.gatekeeper.options.map((opt, oIdx) => {
                                        const isCorrect = oIdx === lesson.introduction.gatekeeper.correctIndex;
                                        return (
                                          <div
                                            key={oIdx}
                                            className={`p-3 rounded-xl border text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
                                              isCorrect
                                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                                                : 'bg-[#0e1522] border-[#141d2e] text-[#94a3b8]'
                                            }`}
                                          >
                                            <span className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold shrink-0 ${
                                              isCorrect
                                                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                                : 'bg-[#070a0f] border-[#141d2e] text-[#94a3b8]'
                                            }`}>
                                              {String.fromCharCode(65 + oIdx)}
                                            </span>
                                            <span className="flex-1">{opt}</span>
                                            {isCorrect && (
                                              <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
                                                Klucz CKE
                                              </span>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {lesson.introduction.gatekeeper.explanation && (
                                      <div className="p-3.5 rounded-xl bg-[#0e1522] border border-[#141d2e] text-[#ffdca1] text-xs sm:text-sm flex items-start gap-2.5 min-w-0">
                                        <Lightbulb className="w-4 h-4 text-[#ffb800] shrink-0 mt-0.5" />
                                        <span className="leading-relaxed break-words flex-1">
                                          <strong>Wyjaśnienie odpowiedzi:</strong> {lesson.introduction.gatekeeper.explanation}
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
                                      Lekcja zawiera {lesson.taskIds.length} autentycznych zadań CKE. Zdobądź pełną pulę punktów i awansuj w rankingu!
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleStartLessonDirect(lesson)}
                                    className="w-full lg:w-auto py-3 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:brightness-110 text-[#070a0f] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-3 cursor-pointer shrink-0 text-center"
                                  >
                                    <Play className="w-4 h-4 fill-[#070a0f] shrink-0" />
                                    <span className="whitespace-normal sm:whitespace-nowrap">ROZPOCZNIJ LEKCJĘ ({lesson.taskIds.length} ZADAŃ)</span>
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
                      const isTaskCompleted = (userState?.completedTasksPolish || []).includes(task.id);
                      return (
                        <div
                          key={task.id}
                          className={`p-4 sm:p-5 rounded-xl border bg-[#0e1522] space-y-3 transition-all ${
                            isTaskCompleted
                              ? 'border-emerald-500/40 bg-emerald-950/10'
                              : 'border-[#141d2e] hover:border-[#1e293b]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-[#ffb800]/10 text-[#ffdca1] font-bold border border-[#ffb800]/20">
                                {task.partName}
                              </span>
                              {task.epoch && (
                                <span className="text-[#94a3b8] font-medium">
                                  {task.epoch}
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-[#ffdca1]">
                              {task.points} {task.points === 1 ? 'pkt' : 'punkty'} CKE
                            </span>
                          </div>

                          <h4 className="text-sm font-semibold text-white leading-snug">
                            {task.title}
                          </h4>
                          <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-3">
                            {task.question}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-[#141d2e]">
                            <span className="text-[11px] text-[#94a3b8]">
                              Typ: {task.taskType}
                            </span>
                            <button
                              onClick={() => {
                                setHubMode('task_browser');
                                const foundIdx = filteredTasks.findIndex(t => t.id === task.id);
                                if (foundIdx !== -1) setActiveTaskIndex(foundIdx);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-xs text-[#ffdca1] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              Rozwiąż to zadanie →
                            </button>
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

      {/* ===================================================================== */}
      {/* WIDOK 2: BAZA WSZYSTKICH ZADAŃ CKE (SWOBODNY PRZEGLĄD)                  */}
      {/* ===================================================================== */}
      {hubMode === 'task_browser' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Baner Tytułowy Bazy Zadań */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0e1522] p-4 sm:p-5 rounded-xl border border-[#141d2e]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-lg bg-[#ffb800]/10 border border-[#ffb800]/20 text-[#ffdca1] text-xs font-bold">
                  Baza Wszystkich Zadań CKE
                </span>
                <span className="text-xs text-[#94a3b8]">Swobodny Bank Pytań • 60 pkt</span>
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Oficjalne Zadania Egzaminacyjne Formuły 2023
              </h2>
              <p className="text-xs text-[#94a3b8] mt-1">
                Zadania podzielone wg 3 części egzaminu z filtrowaniem po epoce, typie zadania i lekturze.
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs text-[#94a3b8]">Dostępnych pytań:</span>
              <div className="text-sm font-bold text-[#ffdca1]">
                {ALL_POLISH_TASKS.length} zadań CKE
              </div>
            </div>
          </div>

          {/* Nawigacja 3 Części Egzaminu CKE */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <button
              onClick={() => {
                setSelectedPart('all');
                handleSelectTask(0);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedPart === 'all'
                  ? 'bg-[#ffb800]/15 border-[#ffb800]/60 shadow-md text-white'
                  : 'bg-[#0e1522] border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1] hover:border-[#1e293b]'
              }`}
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                Pokaż wszystko
              </div>
              <div className="text-sm font-bold mt-0.5 text-white">Wszystkie Części CKE</div>
              <div className="text-xs text-[#94a3b8] mt-1">
                Pełny bank {ALL_POLISH_TASKS.length} pytań
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedPart(1);
                handleSelectTask(0);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedPart === 1
                  ? 'bg-[#ffb800]/15 border-[#ffb800]/60 shadow-md text-white'
                  : 'bg-[#0e1522] border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1] hover:border-[#1e293b]'
              }`}
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#ffdca1]">
                Część 1 (10 pkt)
              </div>
              <div className="text-sm font-bold mt-0.5 text-white">Język w użyciu</div>
              <div className="text-xs text-[#94a3b8] mt-1">
                Czytanie i notatka syntetyzująca
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedPart(2);
                handleSelectTask(0);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedPart === 2
                  ? 'bg-[#ffb800]/15 border-[#ffb800]/60 shadow-md text-white'
                  : 'bg-[#0e1522] border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1] hover:border-[#1e293b]'
              }`}
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#ffdca1]">
                Część 2 (15 pkt)
              </div>
              <div className="text-sm font-bold mt-0.5 text-white">Test historycznoliteracki</div>
              <div className="text-xs text-[#94a3b8] mt-1">
                Epoki, toposy, lektury CKE
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedPart(3);
                handleSelectTask(0);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedPart === 3
                  ? 'bg-[#ffb800]/15 border-[#ffb800]/60 shadow-md text-white'
                  : 'bg-[#0e1522] border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1] hover:border-[#1e293b]'
              }`}
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#ffdca1]">
                Część 3 (35 pkt)
              </div>
              <div className="text-sm font-bold mt-0.5 text-white">Warsztat wypracowania</div>
              <div className="text-xs text-[#94a3b8] mt-1">
                Konspekty i eliminacja błędów
              </div>
            </button>
          </div>

          {/* Filtry epok */}
          {(selectedPart === 2 || selectedPart === 'all') && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <button
                onClick={() => setSelectedEpoch('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedEpoch === 'all'
                    ? 'bg-[#ffb800]/15 border border-[#ffb800]/40 text-[#ffdca1] font-bold shadow-sm'
                    : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1]'
                }`}
              >
                Wszystkie epoki
              </button>
              {POLISH_EPOCHS.map((ep) => (
                <button
                  key={ep}
                  onClick={() => setSelectedEpoch(ep)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedEpoch === ep
                      ? 'bg-[#ffb800]/15 border border-[#ffb800]/40 text-[#ffdca1] font-bold shadow-sm'
                      : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1]'
                  }`}
                >
                  {ep}
                </button>
              ))}
            </div>
          )}

          {/* Główny Układ: Lista Zadań (Lewa) + Karta Zadania (Prawa) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Lewy Pasek: Indeks Zadań */}
            <div className="lg:col-span-4 bg-[#0e1522] border border-[#141d2e] rounded-xl p-4 flex flex-col max-h-[750px] overflow-hidden shadow-sm">
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Szukaj po tytule, lekturze..."
                  value={taskSearchQuery}
                  onChange={(e) => setTaskSearchQuery(e.target.value)}
                  className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl pl-9 pr-3 py-2 text-xs text-[#dfe2f1] placeholder-[#94a3b8] focus:outline-none focus:border-[#ffdca1]"
                />
              </div>

              <div className="text-xs font-semibold text-[#94a3b8] px-1 mb-2 flex items-center justify-between">
                <span>Zadania ({filteredTasks.length})</span>
                {selectedPart !== 'all' && <span>Część {selectedPart}</span>}
              </div>

              <div className="overflow-y-auto space-y-2 pr-1 scrollbar-thin flex-1">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-8 text-xs text-[#94a3b8]">
                    Brak zadań spełniających wybrane kryteria filtrów.
                  </div>
                ) : (
                  filteredTasks.map((task, idx) => {
                    const isCurrent = idx === activeTaskIndex;
                    const answerState = taskAnswers[task.id];
                    const isDone = answerState?.isSubmitted;
                    return (
                      <button
                        key={task.id}
                        onClick={() => handleSelectTask(idx)}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer ${
                          isCurrent
                            ? 'border-[#ffb800]/80 bg-[#ffb800]/10 text-white shadow-sm'
                            : isDone
                            ? 'border-emerald-500/30 bg-emerald-950/20 text-[#dfe2f1] hover:bg-emerald-950/30'
                            : 'border-[#141d2e] bg-[#070a0f]/60 text-[#dfe2f1] hover:bg-[#070a0f] hover:border-[#1e293b]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold truncate text-white">{task.title}</span>
                          {isDone ? (
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 shrink-0 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {answerState.pointsAwarded}/{task.points} pkt
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 shrink-0">
                              {task.points} pkt
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
                          <span>{task.partName}</span>
                          {task.epoch && <span>• {task.epoch}</span>}
                        </div>
                        {task.lektura && (
                          <div className="flex items-center gap-1 text-[10px] text-rose-400">
                            <Bookmark className="w-3 h-3" />
                            <span className="truncate">{task.lektura}</span>
                          </div>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Prawa Kolumna: Aktywne Zadanie */}
            <div className="lg:col-span-8 bg-[#0e1522] border border-[#141d2e] rounded-xl p-5 sm:p-6 shadow-xl flex flex-col min-h-[600px]">
              {currentTask ? (
                <div className="space-y-6">
                  {/* Nagłówek Zadania */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#141d2e] pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20">
                          Część {currentTask.part}: {currentTask.partName}
                        </span>
                        {currentTask.epoch && (
                          <span className="px-2 py-0.5 rounded text-[11px] bg-[#070a0f] text-[#94a3b8] border border-[#141d2e]">
                            {currentTask.epoch}
                          </span>
                        )}
                        {currentTask.sourceYear && (
                          <span className="text-[11px] text-[#94a3b8] font-mono">
                            {currentTask.sourceYear}
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg font-bold text-white tracking-tight">
                        {currentTask.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/30 text-[#ffdca1] font-mono text-xs font-bold">
                        Waga: {currentTask.points} {currentTask.points === 1 ? 'punkt' : 'punkty'}
                      </span>
                    </div>
                  </div>

                  {/* Fragment Tekstu Źródłowego */}
                  {currentTask.passage && (
                    <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#94a3b8]">
                        <span className="font-semibold text-white">
                          {currentTask.passage.author || 'Tekst źródłowy'}
                        </span>
                        {currentTask.passage.sourceTitle && (
                          <span className="italic">{currentTask.passage.sourceTitle}</span>
                        )}
                      </div>
                      <p className="text-xs text-[#dfe2f1] italic leading-relaxed whitespace-pre-line border-l-2 border-[#ffb800]/60 pl-3">
                        {currentTask.passage.text}
                      </p>
                    </div>
                  )}

                  {/* Drugi Tekst Źródłowy */}
                  {currentTask.passage2 && (
                    <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#94a3b8]">
                        <span className="font-semibold text-white">
                          {currentTask.passage2.author || 'Drugi tekst źródłowy'}
                        </span>
                        {currentTask.passage2.sourceTitle && (
                          <span className="italic">{currentTask.passage2.sourceTitle}</span>
                        )}
                      </div>
                      <p className="text-xs text-[#dfe2f1] italic leading-relaxed whitespace-pre-line border-l-2 border-rose-500/60 pl-3">
                        {currentTask.passage2.text}
                      </p>
                    </div>
                  )}

                  {/* Ikonografia / Dzieło sztuki */}
                  <TaskVisualAssetCard task={currentTask} />

                  {/* Treść Polecenia z ujednoliconym obramowaniem i stałą wysokością minimalną */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#070a0f] border border-[#141d2e] text-sm sm:text-base font-medium text-white leading-relaxed min-h-[84px] sm:min-h-[96px] flex flex-col justify-center shadow-sm">
                    <div>{currentTask.question}</div>
                  </div>

                  {/* 1. Zadanie Jednokrotnego Wyboru (ABCD) */}
                  {currentTask.taskType === 'single_choice' && currentTask.options && (
                    <div className="space-y-3 pt-1">
                      <div className="space-y-2.5">
                        {currentTask.options.map((opt, i) => {
                          const isSelected = currentAnswerState.selectedOption === i;
                          const isCorrect = i === currentTask.correctOptionIndex;
                          let optionStyle =
                            'border-[#141d2e] bg-[#070a0f] text-[#dfe2f1] hover:border-[#1e293b] hover:bg-[#141d2e]';

                          if (currentAnswerState.isSubmitted) {
                            if (isCorrect) {
                              optionStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-100 font-semibold shadow-sm';
                            } else if (isSelected && !isCorrect) {
                              optionStyle = 'border-rose-500 bg-rose-950/40 text-rose-100 shadow-sm';
                            }
                          } else if (isSelected) {
                            optionStyle = 'border-[#ffb800] bg-[#ffb800]/10 text-white font-medium ring-1 ring-[#ffb800]/30 shadow-sm';
                          }

                          return (
                            <button
                              key={i}
                              onClick={() => {
                                if (!currentAnswerState.isSubmitted) {
                                  updateCurrentAnswer({ selectedOption: i });
                                }
                              }}
                              disabled={currentAnswerState.isSubmitted}
                              className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-center justify-between cursor-pointer min-h-[58px] sm:min-h-[62px] ${optionStyle}`}
                            >
                              <span className="flex-1 pr-3 leading-relaxed">{opt}</span>
                              {currentAnswerState.isSubmitted && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                              {currentAnswerState.isSubmitted && isSelected && !isCorrect && (
                                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Przycisk Zatwierdź / Druga próba */}
                      {!currentAnswerState.isSubmitted && (
                        <div className="flex items-center justify-end gap-2 pt-2">
                          <button
                            onClick={handleSubmitSingleChoice}
                            disabled={currentAnswerState.selectedOption === null}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ffb800]/10 disabled:opacity-40 transition-all cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Zatwierdź odpowiedź</span>
                          </button>
                        </div>
                      )}

                      {/* Druga próba jeśli błąd w 1. podejściu */}
                      {!currentAnswerState.isSubmitted && currentAnswerState.attempts === 1 && currentAnswerState.feedback && (
                        <div className="p-3.5 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/30 text-xs text-[#ffdca1] space-y-2 animate-fadeIn">
                          <div className="font-semibold">{currentAnswerState.feedback.message}</div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleRetryTask}
                              className="px-3 py-1.5 rounded-lg bg-[#ffb800] text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-[#ffc72c] cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Spróbuj ponownie (2. próba)</span>
                            </button>
                            <button
                              onClick={handleSurrenderKey}
                              className="px-3 py-1.5 rounded-lg bg-[#141d2e] hover:bg-[#1e293b] text-[#94a3b8] hover:text-white text-xs cursor-pointer"
                            >
                              Odsłoń klucz CKE (0 pkt)
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 2. Zadanie Prawda / Fałsz */}
                  {currentTask.taskType === 'true_false' && currentTask.trueFalseStatements && (
                    <div className="space-y-3">
                      <div className="border border-[#141d2e] rounded-xl overflow-hidden bg-[#070a0f]">
                        <table className="w-full text-xs">
                          <thead className="bg-[#070a0f] border-b border-[#141d2e] text-[#94a3b8]">
                            <tr>
                              <th className="py-2.5 px-4 text-left font-semibold">Stwierdzenie</th>
                              <th className="py-2.5 px-3 text-center font-semibold w-28">Ocena CKE</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#141d2e]">
                            {currentTask.trueFalseStatements.map((item, idx) => {
                              const currentVal = currentAnswerState.tfAnswers?.[idx];
                              const isSubmitted = currentAnswerState.isSubmitted;
                              const isCorrectRow = isSubmitted && currentVal === item.isTrue;

                              return (
                                <tr
                                  key={idx}
                                  className={`${
                                    isSubmitted
                                      ? isCorrectRow
                                        ? 'bg-emerald-950/20'
                                        : 'bg-rose-950/20'
                                      : 'bg-[#0e1522]'
                                  }`}
                                >
                                  <td className="py-3 px-4 text-[#dfe2f1] leading-relaxed">
                                    {item.statement}
                                    {showExplanation && (
                                      <div className="text-[11px] text-[#94a3b8] mt-1 italic">
                                        Prawidłowo: <strong className="text-white">{item.isTrue ? 'PRAWDA' : 'FAŁSZ'}</strong> – {item.explanation}
                                      </div>
                                    )}
                                  </td>
                                  <td className="py-3 px-3 text-center">
                                    <div className="inline-flex items-center gap-1.5">
                                      <button
                                        onClick={() => {
                                          if (!isSubmitted) {
                                            updateCurrentAnswer({
                                              tfAnswers: {
                                                ...currentAnswerState.tfAnswers,
                                                [idx]: true,
                                              },
                                            });
                                          }
                                        }}
                                        disabled={isSubmitted}
                                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                                          currentVal === true
                                            ? 'bg-[#ffb800] text-slate-950 font-bold shadow-sm'
                                            : 'bg-[#070a0f] border border-[#141d2e] text-[#94a3b8] hover:text-white hover:border-[#1e293b]'
                                        }`}
                                      >
                                        P
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (!isSubmitted) {
                                            updateCurrentAnswer({
                                              tfAnswers: {
                                                ...currentAnswerState.tfAnswers,
                                                [idx]: false,
                                              },
                                            });
                                          }
                                        }}
                                        disabled={isSubmitted}
                                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                                          currentVal === false
                                            ? 'bg-[#ffb800] text-slate-950 font-bold shadow-sm'
                                            : 'bg-[#070a0f] border border-[#141d2e] text-[#94a3b8] hover:text-white hover:border-[#1e293b]'
                                        }`}
                                      >
                                        F
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {!currentAnswerState.isSubmitted && (
                        <div className="flex items-center justify-end pt-2">
                          <button
                            onClick={handleSubmitTrueFalse}
                            disabled={
                              Object.keys(currentAnswerState.tfAnswers).length <
                              currentTask.trueFalseStatements.length
                            }
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ffb800]/10 disabled:opacity-40 transition-all cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Zatwierdź tabelę P/F</span>
                          </button>
                        </div>
                      )}

                      {!currentAnswerState.isSubmitted && currentAnswerState.attempts === 1 && currentAnswerState.feedback && (
                        <div className="p-3.5 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/30 text-xs text-[#ffdca1] space-y-2 animate-fadeIn">
                          <div className="font-semibold">{currentAnswerState.feedback.message}</div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCurrentAnswer({ feedback: null })}
                              className="px-3 py-1.5 rounded-lg bg-[#ffb800] text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-[#ffc72c] cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Popraw odpowiedzi (2. próba)</span>
                            </button>
                            <button
                              onClick={handleSurrenderKey}
                              className="px-3 py-1.5 rounded-lg bg-[#141d2e] hover:bg-[#1e293b] text-[#94a3b8] hover:text-white text-xs cursor-pointer"
                            >
                              Odsłoń klucz CKE (0 pkt)
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. Trenażer Notatki Syntetyzującej */}
                  {currentTask.taskType === 'synthesis_note' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#94a3b8] font-medium">
                          Notatka syntetyzująca (oficjalne rygorystyczne kryteria CKE):
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[#94a3b8]">Wyrazy:</span>
                          <span
                            className={`font-mono px-2.5 py-0.5 rounded text-xs font-bold ${
                              synthesisWordCount >= 60 && synthesisWordCount <= 90
                                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/40'
                                : synthesisWordCount > 90
                                ? 'bg-rose-950/40 text-rose-400 border border-rose-500/40'
                                : 'bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/30'
                            }`}
                          >
                            {synthesisWordCount} / 60–90 słów
                          </span>
                        </div>
                      </div>

                      <textarea
                        rows={6}
                        value={currentAnswerState.synthesisText}
                        onChange={(e) =>
                          updateCurrentAnswer({ synthesisText: e.target.value })
                        }
                        disabled={currentAnswerState.isSubmitted}
                        placeholder="Wpisz syntetyczne zestawienie obu tekstów (60–90 słów). Wskaż stanowisko autora 1, autora 2 oraz syntezę..."
                        className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl p-3.5 text-xs text-[#dfe2f1] placeholder-[#94a3b8] focus:outline-none focus:border-[#ffdca1] leading-relaxed font-sans"
                      />

                      {!currentAnswerState.isSubmitted && (
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-[11px] text-[#94a3b8]">
                            {synthesisWordCount < 60
                              ? `Brakuje jeszcze ${60 - synthesisWordCount} słów do dolnego progu CKE.`
                              : synthesisWordCount <= 90
                              ? 'Długość tekstu idealnie spełnia kryterium CKE (60–90).'
                              : `Przekroczono limit o ${synthesisWordCount - 90} słów.`}
                          </div>
                          <button
                            onClick={handleSubmitSynthesis}
                            disabled={synthesisWordCount < 20}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-[#ffb800]/10 disabled:opacity-40 transition-all cursor-pointer"
                          >
                            <Zap className="w-4 h-4" />
                            <span>Zatwierdź i oceń notatkę (matryca CKE)</span>
                          </button>
                        </div>
                      )}

                      {/* Szczegółowa matryca oceniania notatki syntetyzującej */}
                      {currentAnswerState.feedback?.partialScore && (
                        <div className="p-4 rounded-xl bg-[#070a0f] border border-[#ffb800]/30 space-y-3 animate-fadeIn">
                          <div className="flex items-center justify-between text-xs font-bold text-[#ffdca1] uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <Target className="w-4 h-4 text-[#ffb800]" />
                              Oficjalna Matryca Oceny Notatki CKE
                            </span>
                            <span className="text-sm font-mono text-white">
                              {currentAnswerState.feedback.partialScore.total} / 4 pkt
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                            <div className="p-3 rounded-lg bg-[#0e1522] border border-[#141d2e]">
                              <div className="text-[11px] text-[#94a3b8]">1. Treść i synteza:</div>
                              <div className="text-sm font-bold text-white mt-0.5">
                                {currentAnswerState.feedback.partialScore.content} / 2 pkt
                              </div>
                              <div className="text-[10px] text-[#94a3b8] mt-1">
                                Zestawienie obu autorów i uogólnienie
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-[#0e1522] border border-[#141d2e]">
                              <div className="text-[11px] text-[#94a3b8]">2. Kompozycja:</div>
                              <div className="text-sm font-bold text-white mt-0.5">
                                {currentAnswerState.feedback.partialScore.composition} / 1 pkt
                              </div>
                              <div className="text-[10px] text-[#94a3b8] mt-1">
                                Przedział 60–90 słów & spójność
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-[#0e1522] border border-[#141d2e]">
                              <div className="text-[11px] text-[#94a3b8]">3. Język i styl:</div>
                              <div className="text-sm font-bold text-white mt-0.5">
                                {currentAnswerState.feedback.partialScore.language} / 1 pkt
                              </div>
                              <div className="text-[10px] text-[#94a3b8] mt-1">
                                Parafraza własnymi słowami
                              </div>
                            </div>
                          </div>

                          <div className="text-xs text-[#ffdca1] leading-relaxed pt-1">
                            {currentAnswerState.feedback.message}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3b. Interaktywne Dopasowanie (Drag & Drop + Dystraktor) */}
                  {currentTask.taskType === 'matching' && (
                    <TaskMatchingInteractive
                      task={currentTask}
                      isSubmitted={currentAnswerState.isSubmitted}
                      onAnswerSubmit={handleMatchingAnswerSubmit}
                      feedback={currentAnswerState.feedback}
                    />
                  )}

                  {/* 4. Zadanie Otwarte Krótkiej Odpowiedzi */}
                  {currentTask.taskType === 'short_open' && (
                    <div className="space-y-3">
                      <label className="text-xs text-[#94a3b8] font-medium">Twoja odpowiedź:</label>
                      <textarea
                        rows={3}
                        value={currentAnswerState.openAnswer}
                        onChange={(e) =>
                          updateCurrentAnswer({ openAnswer: e.target.value })
                        }
                        disabled={currentAnswerState.isSubmitted}
                        placeholder="Sformułuj precyzyjną odpowiedź własnymi słowami..."
                        className="w-full bg-[#070a0f] border border-[#141d2e] rounded-xl p-3 text-xs text-[#dfe2f1] placeholder-[#94a3b8] focus:outline-none focus:border-[#ffdca1] leading-relaxed font-sans"
                      />

                      {!currentAnswerState.isSubmitted && (
                        <div className="flex items-center justify-end pt-2">
                          <button
                            onClick={handleSubmitOpenTask}
                            disabled={!currentAnswerState.openAnswer.trim()}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#ffb800] hover:from-[#f97316] hover:to-[#ffc72c] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#ffb800]/10 disabled:opacity-40 transition-all cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Zatwierdź odpowiedź (sprawdź z CKE)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 5. Warsztat Wypracowania – Interaktywny Konspekt */}
                  {currentTask.taskType === 'essay_blueprint' && currentTask.essayBlueprint && (
                    <div className="p-4 rounded-xl bg-[#070a0f] border border-emerald-500/30 space-y-3">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-400" />
                        Modelowy konspekt maturalny CKE (35 pkt)
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-semibold text-white">Rekomendowane tezy:</span>
                          <ul className="list-disc list-inside text-[#dfe2f1] mt-1 space-y-1">
                            {currentTask.essayBlueprint.recommendedTheses.map((t, i) => (
                              <li key={i}>{t}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-[#141d2e]">
                          <span className="font-semibold text-rose-400">Lektury z gwiazdką (*):</span>
                          <div className="text-[#dfe2f1] mt-1">
                            {currentTask.essayBlueprint.mandatoryStarBooks.join(' • ')}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#141d2e]">
                          <span className="font-semibold text-[#ffdca1]">Proponowane konteksty:</span>
                          <div className="space-y-1 mt-1">
                            {currentTask.essayBlueprint.suggestedContexts.map((c, i) => (
                              <div key={i} className="text-[#dfe2f1]">
                                <span className="text-white font-medium capitalize">
                                  [{c.type}]
                                </span>{' '}
                                {c.description}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-200 text-[11px] font-medium mt-2">
                          {currentTask.essayBlueprint.cardinalErrorWarning}
                        </div>
                      </div>

                      {!currentAnswerState.isSubmitted && (
                        <div className="pt-3 border-t border-[#141d2e] flex justify-end">
                          <button
                            onClick={() => {
                              updateCurrentAnswer({
                                isSubmitted: true,
                                pointsAwarded: currentTask.points,
                                feedback: {
                                  isCorrect: true,
                                  message: 'Konspekt przeanalizowany. Zobacz oficjalne kryteria CKE.',
                                },
                              });
                              setShowExplanation(true);
                              setShowCkeKey(true);
                              if (onCompleteTask) {
                                onCompleteTask(currentTask.id, currentTask.points);
                              }
                            }}
                            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 cursor-pointer"
                          >
                            Oznacz konspekt jako przyswojony (+{currentTask.points} pkt)
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Komunikat informacyjny po zatwierdzeniu */}
                  {currentAnswerState.isSubmitted && currentAnswerState.feedback && (
                    <div
                      className={`p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                        currentAnswerState.feedback.isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                          : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{currentAnswerState.feedback.message}</span>
                        <span className="font-mono text-sm px-2 py-0.5 rounded bg-[#070a0f] border border-[#141d2e] text-[#ffdca1]">
                          Zdobyto: {currentAnswerState.pointsAwarded} / {currentTask.points} pkt
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Przyciski Akcji */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#141d2e]">
                    <div className="flex items-center gap-2">
                      {currentAnswerState.isSubmitted ? (
                        <>
                          <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className="px-4 py-2 rounded-xl bg-[#0e1522] hover:bg-[#141d2e] text-[#dfe2f1] border border-[#141d2e] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-[#ffdca1]" />
                            {showExplanation ? 'Ukryj wyjaśnienie' : 'Pokaż wyjaśnienie'}
                          </button>

                          <button
                            onClick={() => setShowCkeKey(!showCkeKey)}
                            className="px-4 py-2 rounded-xl bg-[#0e1522] hover:bg-[#141d2e] text-[#ffdca1] border border-[#ffb800]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <FileText className="w-4 h-4 text-[#ffb800]" />
                            {showCkeKey ? 'Ukryj klucz CKE' : 'Klucz punktowania CKE'}
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] bg-[#070a0f] px-3.5 py-2 rounded-xl border border-[#141d2e]">
                          <Lock className="w-3.5 h-3.5 text-[#ffb800]" />
                          <span>Zatwierdź odpowiedź, aby odsłonić klucz CKE i wyjaśnienie</span>
                        </div>
                      )}
                    </div>

                    {onOpenAiTutor && (
                      <button
                        onClick={() =>
                          onOpenAiTutor(
                            `Przeanalizuj zadanie CKE: "${currentTask.title}". Pytanie: "${currentTask.question}". ${
                              currentAnswerState.isSubmitted
                                ? `Moja odpowiedź zdobyła ${currentAnswerState.pointsAwarded}/${currentTask.points} pkt.`
                                : 'Pomóż mi zrozumieć to zadanie bez zdradzania bezpośredniej odpowiedzi.'
                            }`
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-[#0e1522] hover:bg-[#141d2e] border border-[#141d2e] text-[#dfe2f1] text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 text-[#ffb800]" />
                        <span>Zapytaj AI Tutora o to zadanie</span>
                      </button>
                    )}
                  </div>

                  {/* Sekcja Klucza CKE i Modelowej Odpowiedzi */}
                  {showCkeKey && (
                    <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] space-y-3 animate-fadeIn">
                      <div className="text-xs font-bold text-[#ffdca1] uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#ffb800]" />
                        Oficjalny Schemat Oceniania CKE
                      </div>

                      {currentTask.correctAnswerText && (
                        <div>
                          <div className="text-[11px] font-semibold text-[#94a3b8]">
                            Wzorcowa odpowiedź:
                          </div>
                          <div className="text-xs text-[#dfe2f1] mt-0.5">
                            {currentTask.correctAnswerText}
                          </div>
                        </div>
                      )}

                      {currentTask.synthesisModelSummary && (
                        <div>
                          <div className="text-[11px] font-semibold text-[#94a3b8]">
                            Wzorcowa notatka syntetyzująca (CKE):
                          </div>
                          <div className="text-xs text-[#dfe2f1] mt-0.5 italic bg-[#0e1522] p-2.5 rounded-lg border border-[#141d2e]">
                            „{currentTask.synthesisModelSummary}”
                          </div>
                        </div>
                      )}

                      {currentTask.ckeKeyCriteria && (
                        <div>
                          <div className="text-[11px] font-semibold text-[#94a3b8]">
                            Kryteria przyznawania punktów:
                          </div>
                          <ul className="list-disc list-inside text-xs text-[#dfe2f1] mt-1 space-y-1">
                            {currentTask.ckeKeyCriteria.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Wyjaśnienie Merytoryczne */}
                  {showExplanation && (
                    <div className="p-4 rounded-xl bg-[#070a0f] border border-[#141d2e] text-xs text-[#dfe2f1] space-y-1 animate-fadeIn">
                      <span className="font-semibold text-white">
                        Wyjaśnienie i kontekst merytoryczny:
                      </span>
                      <p className="leading-relaxed">{currentTask.explanation}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-[#94a3b8]">
                  Wybierz zadanie z listy po lewej stronie.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  );
};
