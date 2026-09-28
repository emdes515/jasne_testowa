import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ChevronRight,
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
  Timer,
  CheckCheck,
  Play,
  Flame,
  Lightbulb,
  Lock,
  RefreshCw,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playAudioTone } from '../../utils';
import { PolishTask, PolishEpoch, PolishPartNumber, PolishTaskType } from '../../types/maturaTypes';
import { PolishLesson, PolishModuleType } from '../../types/lessonTypes';
import { ALL_POLISH_TASKS, POLISH_EPOCHS, POLISH_LESSONS } from '../../data/polish';
import { PolishLessonView } from './PolishLessonView';

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
  onCompleteTask?: (taskId: string, pointsEarned: number) => void;
  onCompleteLesson?: (lessonId: string, pointsEarned: number) => void;
  onOpenAiTutor?: (contextPrompt: string) => void;
  completedLessonIds?: string[];
  completedTaskIds?: string[];
  initialMode?: 'lessons' | 'task_browser';
  initialActiveLessonId?: string | null;
  initialTaskFilter?: {
    part?: PolishPartNumber | 'all';
    epoch?: PolishEpoch | 'all';
    type?: PolishTaskType | 'all';
  };
}

export const PolishStudyHub: React.FC<PolishStudyHubProps> = ({
  onCompleteTask,
  onCompleteLesson,
  onOpenAiTutor,
  completedLessonIds: propCompletedLessonIds,
  completedTaskIds: propCompletedTaskIds,
  initialMode = 'lessons',
  initialActiveLessonId = null,
  initialTaskFilter,
}) => {
  // Główny tryb: Kurs Lekcyjny (24 lekcje po 45 min) vs Baza Zadań (Filtry)
  const [hubMode, setHubMode] = useState<'lessons' | 'task_browser'>(initialMode);

  // Aktywna lekcja (jeśli użytkownik wszedł w tryb 45-minutowej sesji)
  const [activeLessonId, setActiveLessonId] = useState<string | null>(initialActiveLessonId);

  // Filtry dla kursu lekcyjnego
  const [selectedLessonModule, setSelectedLessonModule] = useState<PolishModuleType | 'all'>('all');
  const [lessonSearchQuery, setLessonSearchQuery] = useState('');

  // Ukończone lekcje (zapisywane lokalnie + synchronizowane z UserState)
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jasne_completed_lessons');
      const local: string[] = saved ? JSON.parse(saved) : [];
      const fromProps = (propCompletedLessonIds || []).map((id) => id.replace(/^lesson-/, ''));
      return Array.from(new Set([...local, ...fromProps]));
    } catch {
      return (propCompletedLessonIds || []).map((id) => id.replace(/^lesson-/, ''));
    }
  });

  useEffect(() => {
    if (propCompletedLessonIds && propCompletedLessonIds.length > 0) {
      const fromProps = propCompletedLessonIds.map((id) => id.replace(/^lesson-/, ''));
      setCompletedLessonIds((prev) => Array.from(new Set([...prev, ...fromProps])));
    }
  }, [propCompletedLessonIds]);

  useEffect(() => {
    if (initialMode) setHubMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (initialActiveLessonId !== undefined) setActiveLessonId(initialActiveLessonId);
  }, [initialActiveLessonId]);

  const handleCompleteLesson = (lessonId: string, pointsEarned: number) => {
    const cleanId = lessonId.replace(/^lesson-/, '');
    setCompletedLessonIds((prev) => {
      if (prev.includes(cleanId)) return prev;
      const updated = [...prev, cleanId];
      try {
        localStorage.setItem('jasne_completed_lessons', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    playAudioTone('success');
    if (onCompleteLesson) {
      onCompleteLesson(cleanId, pointsEarned);
    } else if (onCompleteTask) {
      onCompleteTask(`lesson-${cleanId}`, pointsEarned);
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
  const [selectedPart, setSelectedPart] = useState<PolishPartNumber | 'all'>(initialTaskFilter?.part || 'all');
  const [selectedEpoch, setSelectedEpoch] = useState<PolishEpoch | 'all'>(initialTaskFilter?.epoch || 'all');
  const [selectedType, setSelectedType] = useState<PolishTaskType | 'all'>(initialTaskFilter?.type || 'all');
  const [taskSearchQuery, setTaskSearchQuery] = useState('');
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  useEffect(() => {
    if (initialTaskFilter) {
      if (initialTaskFilter.part !== undefined) setSelectedPart(initialTaskFilter.part);
      if (initialTaskFilter.epoch !== undefined) setSelectedEpoch(initialTaskFilter.epoch);
      if (initialTaskFilter.type !== undefined) setSelectedType(initialTaskFilter.type);
      setActiveTaskIndex(0);
    }
  }, [initialTaskFilter]);

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
      playAudioTone('success');
      const earned = newAttempts === 1 ? currentTask.points : Math.max(0.5, currentTask.points * 0.5);
      updateCurrentAnswer({
        isSubmitted: true,
        attempts: newAttempts,
        pointsAwarded: earned,
        feedback: {
          isCorrect: true,
          message:
            newAttempts === 1
              ? `✅ Znakomicie! Poprawna odpowiedź z oficjalnego klucza CKE (+${earned} pkt).`
              : `✅ Poprawna odpowiedź w 2. próbie (+${earned} pkt).`,
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
      playAudioTone('error');
      if (newAttempts === 1) {
        updateCurrentAnswer({
          attempts: newAttempts,
          feedback: {
            isCorrect: false,
            message:
              '❌ Niestety to nie jest poprawna odpowiedź. Masz jeszcze 1 próbę (za 50% punktów) lub możesz odsłonić klucz CKE.',
          },
        });
      } else {
        updateCurrentAnswer({
          isSubmitted: true,
          attempts: newAttempts,
          pointsAwarded: 0,
          feedback: {
            isCorrect: false,
            message: '❌ Błędna odpowiedź w 2. próbie (0 pkt). Zapoznaj się z poniższym wyjaśnieniem i oficjalnym kluczem CKE.',
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
      playAudioTone('success');
      updateCurrentAnswer({
        isSubmitted: true,
        attempts: newAttempts,
        pointsAwarded: earned,
        feedback: {
          isCorrect: true,
          message: `✅ Bezbłędna ocena wszystkich stwierdzeń! Przyznano ${earned}/${currentTask.points} pkt CKE.`,
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
      playAudioTone('error');
      if (newAttempts === 1) {
        updateCurrentAnswer({
          attempts: newAttempts,
          feedback: {
            isCorrect: false,
            message: `⚠️ Poprawnie oceniono ${correctCount} z ${statements.length} zdań. Możesz poprawić odpowiedzi w 2. próbie lub odsłonić klucz CKE.`,
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
      message = `⚠️ Liczba słów (${words}) jest poniżej bezwzględnego progu CKE (60–90 słów) – utrata punktu za kompozycję.`;
    } else if (words > 90) {
      message = `⚠️ Przekroczono limit słów (${words} > 90) – utrata punktu za kompozycję i formę.`;
    } else {
      message = `✅ Liczba słów (${words}) idealnie mieści się w wyznaczonym oknie 60–90 wyrazów!`;
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

    playAudioTone(total >= 2 ? 'success' : 'error');
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
            ? `✅ Twoja odpowiedź spełnia kryteria egzaminatora CKE (${earned}/${currentTask.points} pkt).`
            : `⚠️ Częściowa zgodność z kluczem CKE (${earned}/${currentTask.points} pkt). Porównaj swoją wersję ze wzorcem poniżej.`,
      },
    });

    playAudioTone(earned > 0 ? 'success' : 'error');
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

  // Jeśli użytkownik jest w trakcie 45-minutowej lekcji, wyświetl widok PolishLessonView
  if (activeLessonId) {
    const cleanId = activeLessonId.replace(/^lesson-/, '');
    const currentLesson = POLISH_LESSONS.find(
      (l) => l.id === activeLessonId || l.id === cleanId || l.id === `lekcja-${cleanId}`
    );
    if (currentLesson) {
      return (
        <PolishLessonView
          lesson={currentLesson}
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
      );
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Przełącznik Głównego Trybu Nauki */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-surface-card/90 border border-surface-border p-2 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHubMode('lessons')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              hubMode === 'lessons'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-500/20'
                : 'text-text-secondary hover:text-white hover:bg-surface-card-hover'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>🎓 Kurs Lekcyjny (24 lekcje po 45 min)</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-surface-bg/40 text-black font-extrabold uppercase">
              Rekomendowane
            </span>
          </button>

          <button
            onClick={() => setHubMode('task_browser')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              hubMode === 'task_browser'
                ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/20'
                : 'text-text-secondary hover:text-white hover:bg-surface-card-hover'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>🔍 Wyszukiwarka Zadań CKE ({ALL_POLISH_TASKS.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-text-secondary">
          <Timer className="w-3.5 h-3.5 text-amber-400" />
          <span>Każda sesja lekcyjna trwa dokładnie 45 minut</span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* WIDOK 1: KATALOG 24 LEKCJI (PO 45 MIN)                                */}
      {/* ===================================================================== */}
      {hubMode === 'lessons' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Baner Tytułowy Kursu */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/60 via-surface-card to-rose-950/60 border border-amber-800/40 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Formuła 2023 • Poziom Podstawowy
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface-card-hover/80 text-text-secondary border border-surface-border">
                    Struktura 45-minutowych bloków
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Kompletny Kurs Maturalny: 24 Lekcje po 45 Minut
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-2 max-w-3xl leading-relaxed">
                  Każda sesja to standardowa jednostka lekcyjna (45 min):{' '}
                  <strong className="text-amber-300">Wstęp teoretyczny z patentami CKE (~12 min)</strong>{' '}
                  ➔ <strong className="text-rose-300">Praktyka na autentycznych zadaniach CKE (~25 min)</strong>{' '}
                  ➔ <strong className="text-emerald-300">Podsumowanie i eliminacja błędów kardynalnych (~8 min)</strong>.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0">
                <div className="px-4 py-3 rounded-xl bg-surface-card/90 border border-surface-border text-center">
                  <div className="text-xl font-bold text-amber-400">24</div>
                  <div className="text-[11px] text-text-secondary">Lekcje po 45 min</div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-surface-card/90 border border-surface-border text-center">
                  <div className="text-xl font-bold text-emerald-400">
                    {completedLessonIds.length}/24
                  </div>
                  <div className="text-[11px] text-text-secondary">Ukończono</div>
                </div>
                <div className="col-span-2 sm:col-span-1 px-4 py-3 rounded-xl bg-surface-card/90 border border-surface-border text-center">
                  <div className="text-xl font-bold text-rose-400">18 h</div>
                  <div className="text-[11px] text-text-secondary">Całkowity czas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filtry Modułów i Wyszukiwarka Lekcji */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              <button
                onClick={() => setSelectedLessonModule('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedLessonModule === 'all'
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'bg-surface-card border border-surface-border text-text-secondary hover:text-white'
                }`}
              >
                Wszystkie Lekcje (24)
              </button>
              <button
                onClick={() => setSelectedLessonModule('Język w użyciu')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedLessonModule === 'Język w użyciu'
                    ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20'
                    : 'bg-surface-card border border-surface-border text-text-secondary hover:text-white'
                }`}
              >
                Moduł 1: Język w użyciu (7 lekcji)
              </button>
              <button
                onClick={() => setSelectedLessonModule('Test historycznoliteracki')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedLessonModule === 'Test historycznoliteracki'
                    ? 'bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20'
                    : 'bg-surface-card border border-surface-border text-text-secondary hover:text-white'
                }`}
              >
                Moduł 2: Epoki & Lektury (12 lekcji)
              </button>
              <button
                onClick={() => setSelectedLessonModule('Warsztat wypracowania')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedLessonModule === 'Warsztat wypracowania'
                    ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-surface-card border border-surface-border text-text-secondary hover:text-white'
                }`}
              >
                Moduł 3: Wypracowanie (5 lekcji)
              </button>
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Szukaj lekcji, lektury, epoki..."
                value={lessonSearchQuery}
                onChange={(e) => setLessonSearchQuery(e.target.value)}
                className="w-full bg-surface-card border border-surface-border rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Siatka Kart Lekcji */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedLessonIds.includes(lesson.id) || completedLessonIds.includes(`lesson-${lesson.id}`);
              let moduleBadgeColor = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
              if (lesson.module === 'Test historycznoliteracki') {
                moduleBadgeColor = 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
              } else if (lesson.module === 'Warsztat wypracowania') {
                moduleBadgeColor = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
              }

              return (
                <div
                  key={lesson.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                    isCompleted
                      ? 'bg-surface-card/60 border-emerald-500/40'
                      : 'bg-surface-card/90 border-surface-border hover:border-amber-500/50 hover:bg-surface-card-hover'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Górny pasek tagów */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Lekcja {lesson.number}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-surface-card-hover text-text-secondary border border-surface-border flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          45 min
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded-lg text-[11px] font-medium border ${moduleBadgeColor}`}
                        >
                          {lesson.module}
                        </span>
                        {lesson.epoch && (
                          <span className="px-2 py-0.5 rounded-lg text-[11px] bg-surface-card-hover text-text-secondary border border-surface-border">
                            {lesson.epoch}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tytuł i Podtytuł */}
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                        {lesson.subtitle}
                      </p>
                    </div>

                    {/* Przegląd 3-stopniowej sesji */}
                    <div className="bg-surface-bg/70 rounded-xl p-3 border border-surface-border space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          1
                        </span>
                        <span className="truncate">
                          <strong>Wstęp:</strong> {lesson.introduction.lead.slice(0, 75)}...
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          2
                        </span>
                        <span>
                          <strong>Praktyka:</strong> {lesson.taskIds.length} zadania z kluczem CKE
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          3
                        </span>
                        <span>
                          <strong>Podsumowanie:</strong> Wnioski & Błędy kardynalne
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dolny pasek akcji */}
                  <div className="flex items-center justify-between pt-2 border-t border-surface-border/60">
                    <div className="text-xs">
                      {isCompleted ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> Ukończona (+150 XP)
                        </span>
                      ) : (
                        <span className="text-text-muted text-[11px]">Do zrealizowania</span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setActiveLessonId(lesson.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
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

      {/* ===================================================================== */}
      {/* WIDOK 2: BAZA WSZYSTKICH ZADAŃ CKE (SWOBODNY PRZEGLĄD)                  */}
      {/* ===================================================================== */}
      {hubMode === 'task_browser' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Baner Tytułowy Bazy Zadań */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/70 via-surface-card to-amber-950/60 border border-rose-800/40 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Formuła 2023 CKE
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface-card-hover/80 text-text-secondary border border-surface-border">
                    Swobodny Bank Pytań • 60 pkt
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Baza Wszystkich Zadań CKE
                </h1>
                <p className="text-sm text-text-secondary mt-1 max-w-2xl leading-relaxed">
                  Zadania podzielone wg 3 części egzaminu maturalnego z filtrowaniem po epoce, typie zadania i lekturze.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-3 rounded-xl bg-surface-card/80 border border-surface-border text-center">
                  <div className="text-xl font-bold text-amber-400">{ALL_POLISH_TASKS.length}</div>
                  <div className="text-[11px] text-text-secondary">Dostępnych zadań</div>
                </div>
                <div className="px-4 py-3 rounded-xl bg-surface-card/80 border border-surface-border text-center">
                  <div className="text-xl font-bold text-rose-400">11</div>
                  <div className="text-[11px] text-text-secondary">Epok literackich</div>
                </div>
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
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedPart === 'all'
                  ? 'bg-amber-500/15 border-amber-500/60 shadow-md text-white'
                  : 'bg-surface-card/60 border-surface-border text-text-secondary hover:text-text-primary hover:bg-surface-card-hover'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Pokaż wszystko
              </div>
              <div className="text-sm font-bold mt-0.5 text-white">Wszystkie Części CKE</div>
              <div className="text-xs text-text-secondary mt-1">
                Pełny bank {ALL_POLISH_TASKS.length} pytań
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedPart(1);
                handleSelectTask(0);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedPart === 1
                  ? 'bg-rose-500/15 border-rose-500/60 shadow-md text-white'
                  : 'bg-surface-card/60 border-surface-border text-text-secondary hover:text-text-primary hover:bg-surface-card-hover'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                Część 1 (10 pkt)
              </div>
              <div className="text-sm font-bold mt-0.5 text-white">Język polski w użyciu</div>
              <div className="text-xs text-text-secondary mt-1">
                Czytanie, retoryka i notatka syntetyzująca
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedPart(2);
                handleSelectTask(0);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedPart === 2
                  ? 'bg-indigo-500/15 border-indigo-500/60 shadow-md text-white'
                  : 'bg-surface-card/60 border-surface-border text-text-secondary hover:text-text-primary hover:bg-surface-card-hover'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Część 2 (15 pkt)
              </div>
              <div className="text-sm font-bold mt-0.5 text-white">Test historycznoliteracki</div>
              <div className="text-xs text-text-secondary mt-1">
                Epoki, toposy, dzieła sztuki, lektury *
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedPart(3);
                handleSelectTask(0);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedPart === 3
                  ? 'bg-emerald-500/15 border-emerald-500/60 shadow-md text-white'
                  : 'bg-surface-card/60 border-surface-border text-text-secondary hover:text-text-primary hover:bg-surface-card-hover'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Część 3 (35 pkt)
              </div>
              <div className="text-sm font-bold mt-0.5 text-white">Warsztat wypracowania</div>
              <div className="text-xs text-text-secondary mt-1">
                Konspekty, błędy kardynalne, konteksty
              </div>
            </button>
          </div>

          {/* Filtry epok */}
          {(selectedPart === 2 || selectedPart === 'all') && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <button
                onClick={() => setSelectedEpoch('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedEpoch === 'all'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-surface-card border border-surface-border text-text-secondary hover:text-text-primary'
                }`}
              >
                Wszystkie epoki
              </button>
              {POLISH_EPOCHS.map((ep) => (
                <button
                  key={ep}
                  onClick={() => setSelectedEpoch(ep)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedEpoch === ep
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'bg-surface-card border border-surface-border text-text-secondary hover:text-text-primary'
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
            <div className="lg:col-span-4 bg-surface-card/90 border border-surface-border rounded-2xl p-4 flex flex-col max-h-[750px] overflow-hidden">
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Szukaj po tytule, lekturze..."
                  value={taskSearchQuery}
                  onChange={(e) => setTaskSearchQuery(e.target.value)}
                  className="w-full bg-surface-bg border border-surface-border rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="text-xs font-semibold text-text-secondary px-1 mb-2 flex items-center justify-between">
                <span>Zadania ({filteredTasks.length})</span>
                {selectedPart !== 'all' && <span>Część {selectedPart}</span>}
              </div>

              <div className="overflow-y-auto space-y-2 pr-1 scrollbar-thin flex-1">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-8 text-xs text-text-muted">
                    Brak zadań spełniających wybrane kryteria filtrów.
                  </div>
                ) : (
                  filteredTasks.map((task, idx) => {
                    const isCurrent = idx === activeTaskIndex;
                    const answerState = taskAnswers[task.id];
                    const isDone = Boolean(answerState?.isSubmitted || propCompletedTaskIds?.includes(task.id));
                    const pointsShown = answerState?.isSubmitted ? answerState.pointsAwarded : (propCompletedTaskIds?.includes(task.id) ? task.points : 0);
                    return (
                      <button
                        key={task.id}
                        onClick={() => handleSelectTask(idx)}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                          isCurrent
                            ? 'border-amber-500/80 bg-amber-500/10 text-white shadow-sm'
                            : isDone
                            ? 'border-emerald-500/30 bg-emerald-500/5 text-text-secondary hover:bg-surface-card-hover'
                            : 'border-surface-border bg-surface-bg/60 text-text-secondary hover:bg-surface-card-hover hover:border-surface-border'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold truncate">{task.title}</span>
                          {isDone ? (
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {pointsShown}/{task.points} pkt
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-card-hover text-amber-400 shrink-0">
                              {task.points} pkt
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
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
            <div className="lg:col-span-8 bg-surface-card border border-surface-border rounded-2xl p-6 shadow-xl flex flex-col min-h-[600px]">
              {currentTask ? (
                <div className="space-y-6">
                  {/* Nagłówek Zadania */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-card-hover text-amber-400 border border-surface-border">
                          Część {currentTask.part}: {currentTask.partName}
                        </span>
                        {currentTask.epoch && (
                          <span className="px-2 py-0.5 rounded text-[11px] bg-surface-card-hover text-indigo-300">
                            {currentTask.epoch}
                          </span>
                        )}
                        {currentTask.sourceYear && (
                          <span className="text-[11px] text-text-muted font-mono">
                            {currentTask.sourceYear}
                          </span>
                        )}
                      </div>
                      <h2 className="text-lg font-bold text-white tracking-tight">
                        {currentTask.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                        Waga: {currentTask.points} {currentTask.points === 1 ? 'punkt' : 'punkty'}
                      </span>
                    </div>
                  </div>

                  {/* Fragment Tekstu Źródłowego */}
                  {currentTask.passage && (
                    <div className="p-4 rounded-xl bg-surface-bg border border-surface-border space-y-2">
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span className="font-semibold text-text-secondary">
                          {currentTask.passage.author || 'Tekst źródłowy'}
                        </span>
                        {currentTask.passage.sourceTitle && (
                          <span className="italic">{currentTask.passage.sourceTitle}</span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary italic leading-relaxed whitespace-pre-line border-l-2 border-amber-500/60 pl-3">
                        {currentTask.passage.text}
                      </p>
                    </div>
                  )}

                  {/* Drugi Tekst Źródłowy */}
                  {currentTask.passage2 && (
                    <div className="p-4 rounded-xl bg-surface-bg border border-surface-border space-y-2">
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span className="font-semibold text-text-secondary">
                          {currentTask.passage2.author || 'Drugi tekst źródłowy'}
                        </span>
                        {currentTask.passage2.sourceTitle && (
                          <span className="italic">{currentTask.passage2.sourceTitle}</span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary italic leading-relaxed whitespace-pre-line border-l-2 border-rose-500/60 pl-3">
                        {currentTask.passage2.text}
                      </p>
                    </div>
                  )}

                  {/* Ikonografia / Dzieło sztuki */}
                  {currentTask.imageCaption && (
                    <div className="p-4 rounded-xl bg-surface-bg border border-surface-border text-center space-y-2">
                      <div className="p-8 rounded-lg bg-surface-card border border-surface-border/60 flex flex-col items-center justify-center text-text-secondary">
                        <BookOpen className="w-10 h-10 text-amber-500/60 mb-2" />
                        <span className="text-xs font-semibold text-text-secondary">
                          [Dzieło sztuki maturalnej]
                        </span>
                        <span className="text-xs text-text-muted italic mt-1">
                          {currentTask.imageCaption}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Treść Polecenia */}
                  <div className="text-sm font-semibold text-white leading-relaxed">
                    {currentTask.question}
                  </div>

                  {/* 1. Zadanie Jednokrotnego Wyboru (ABCD) */}
                  {currentTask.taskType === 'single_choice' && currentTask.options && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        {currentTask.options.map((opt, i) => {
                          const isSelected = currentAnswerState.selectedOption === i;
                          const isCorrect = i === currentTask.correctOptionIndex;
                          let optionStyle =
                            'border-surface-border bg-surface-bg/60 text-text-primary hover:border-surface-border';

                          if (currentAnswerState.isSubmitted) {
                            if (isCorrect) {
                              optionStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              optionStyle = 'border-rose-500 bg-rose-500/15 text-rose-300';
                            }
                          } else if (isSelected) {
                            optionStyle = 'border-amber-500 bg-amber-500/15 text-white';
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
                              className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between ${optionStyle}`}
                            >
                              <span>{opt}</span>
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
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 disabled:opacity-40 transition-all cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Zatwierdź odpowiedź</span>
                          </button>
                        </div>
                      )}

                      {/* Druga próba jeśli błąd w 1. podejściu */}
                      {!currentAnswerState.isSubmitted && currentAnswerState.attempts === 1 && currentAnswerState.feedback && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2 animate-fadeIn">
                          <div className="font-semibold">{currentAnswerState.feedback.message}</div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleRetryTask}
                              className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs flex items-center gap-1 hover:bg-amber-400"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Spróbuj ponownie (2. próba)</span>
                            </button>
                            <button
                              onClick={handleSurrenderKey}
                              className="px-3 py-1.5 rounded-lg bg-surface-card-hover text-text-secondary hover:text-white text-xs"
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
                      <div className="border border-surface-border rounded-xl overflow-hidden">
                        <table className="w-full text-xs">
                          <thead className="bg-surface-bg border-b border-surface-border text-text-secondary">
                            <tr>
                              <th className="py-2.5 px-4 text-left font-semibold">Stwierdzenie</th>
                              <th className="py-2.5 px-3 text-center font-semibold w-28">Ocena CKE</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-surface-border">
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
                                        ? 'bg-emerald-500/5'
                                        : 'bg-rose-500/5'
                                      : 'bg-surface-card/40'
                                  }`}
                                >
                                  <td className="py-3 px-4 text-text-secondary leading-relaxed">
                                    {item.statement}
                                    {showExplanation && (
                                      <div className="text-[11px] text-text-secondary mt-1 italic">
                                        Prawidłowo: <strong>{item.isTrue ? 'PRAWDA' : 'FAŁSZ'}</strong> – {item.explanation}
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
                                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                                          currentVal === true
                                            ? 'bg-amber-500 text-black font-bold'
                                            : 'bg-surface-card-hover text-text-secondary hover:text-white'
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
                                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                                          currentVal === false
                                            ? 'bg-amber-500 text-black font-bold'
                                            : 'bg-surface-card-hover text-text-secondary hover:text-white'
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
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 disabled:opacity-40 transition-all cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Zatwierdź tabelę P/F</span>
                          </button>
                        </div>
                      )}

                      {!currentAnswerState.isSubmitted && currentAnswerState.attempts === 1 && currentAnswerState.feedback && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2 animate-fadeIn">
                          <div className="font-semibold">{currentAnswerState.feedback.message}</div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCurrentAnswer({ feedback: null })}
                              className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs flex items-center gap-1 hover:bg-amber-400"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Popraw odpowiedzi (2. próba)</span>
                            </button>
                            <button
                              onClick={handleSurrenderKey}
                              className="px-3 py-1.5 rounded-lg bg-surface-card-hover text-text-secondary hover:text-white text-xs"
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
                        <span className="text-text-secondary font-medium">
                          Notatka syntetyzująca (oficjalne rygorystyczne kryteria CKE):
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-text-secondary">Wyrazy:</span>
                          <span
                            className={`font-mono px-2.5 py-0.5 rounded text-xs font-bold ${
                              synthesisWordCount >= 60 && synthesisWordCount <= 90
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : synthesisWordCount > 90
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
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
                        className="w-full bg-surface-bg border border-surface-border rounded-xl p-3.5 text-xs text-white placeholder-text-muted focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
                      />

                      {!currentAnswerState.isSubmitted && (
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-[11px] text-text-secondary">
                            {synthesisWordCount < 60
                              ? `⚠️ Brakuje jeszcze ${60 - synthesisWordCount} słów do dolnego progu CKE.`
                              : synthesisWordCount <= 90
                              ? '✔️ Długość tekstu idealnie spełnia kryterium CKE (60–90).'
                              : `⚠️ Przekroczono limit o ${synthesisWordCount - 90} słów.`}
                          </div>
                          <button
                            onClick={handleSubmitSynthesis}
                            disabled={synthesisWordCount < 20}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 disabled:opacity-40 transition-all cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                            <span>Zatwierdź i oceń notatkę (matryca CKE)</span>
                          </button>
                        </div>
                      )}

                      {/* Szczegółowa matryca oceniania notatki syntetyzującej */}
                      {currentAnswerState.feedback?.partialScore && (
                        <div className="p-4 rounded-xl bg-surface-bg border border-amber-500/40 space-y-3 animate-fadeIn">
                          <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <Target className="w-4 h-4" />
                              Oficjalna Matryca Oceny Notatki CKE
                            </span>
                            <span className="text-sm font-mono text-white">
                              {currentAnswerState.feedback.partialScore.total} / 4 pkt
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                            <div className="p-3 rounded-lg bg-surface-card border border-surface-border">
                              <div className="text-[11px] text-text-secondary">1. Treść i synteza:</div>
                              <div className="text-sm font-bold text-white mt-0.5">
                                {currentAnswerState.feedback.partialScore.content} / 2 pkt
                              </div>
                              <div className="text-[10px] text-text-secondary mt-1">
                                Zestawienie obu autorów i uogólnienie
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-surface-card border border-surface-border">
                              <div className="text-[11px] text-text-secondary">2. Kompozycja:</div>
                              <div className="text-sm font-bold text-white mt-0.5">
                                {currentAnswerState.feedback.partialScore.composition} / 1 pkt
                              </div>
                              <div className="text-[10px] text-text-secondary mt-1">
                                Przedział 60–90 słów & spójność
                              </div>
                            </div>

                            <div className="p-3 rounded-lg bg-surface-card border border-surface-border">
                              <div className="text-[11px] text-text-secondary">3. Język i styl:</div>
                              <div className="text-sm font-bold text-white mt-0.5">
                                {currentAnswerState.feedback.partialScore.language} / 1 pkt
                              </div>
                              <div className="text-[10px] text-text-secondary mt-1">
                                Parafraza własnymi słowami
                              </div>
                            </div>
                          </div>

                          <div className="text-xs text-amber-200 leading-relaxed pt-1">
                            {currentAnswerState.feedback.message}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 4. Zadanie Otwarte Krótkiej Odpowiedzi */}
                  {currentTask.taskType === 'short_open' && (
                    <div className="space-y-3">
                      <label className="text-xs text-text-secondary font-medium">Twoja odpowiedź:</label>
                      <textarea
                        rows={3}
                        value={currentAnswerState.openAnswer}
                        onChange={(e) =>
                          updateCurrentAnswer({ openAnswer: e.target.value })
                        }
                        disabled={currentAnswerState.isSubmitted}
                        placeholder="Sformułuj precyzyjną odpowiedź własnymi słowami..."
                        className="w-full bg-surface-bg border border-surface-border rounded-xl p-3 text-xs text-white placeholder-text-muted focus:outline-none focus:border-amber-500 leading-relaxed"
                      />

                      {!currentAnswerState.isSubmitted && (
                        <div className="flex items-center justify-end pt-2">
                          <button
                            onClick={handleSubmitOpenTask}
                            disabled={!currentAnswerState.openAnswer.trim()}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 disabled:opacity-40 transition-all cursor-pointer"
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
                    <div className="p-4 rounded-xl bg-surface-bg border border-emerald-500/30 space-y-3">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4" />
                        Modelowy konspekt maturalny CKE (35 pkt)
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-semibold text-text-secondary">Rekomendowane tezy:</span>
                          <ul className="list-disc list-inside text-text-secondary mt-1 space-y-1">
                            {currentTask.essayBlueprint.recommendedTheses.map((t, i) => (
                              <li key={i}>{t}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-surface-border">
                          <span className="font-semibold text-rose-400">Lektury z gwiazdką (*):</span>
                          <div className="text-text-secondary mt-1">
                            {currentTask.essayBlueprint.mandatoryStarBooks.join(' • ')}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-surface-border">
                          <span className="font-semibold text-amber-400">Proponowane konteksty:</span>
                          <div className="space-y-1 mt-1">
                            {currentTask.essayBlueprint.suggestedContexts.map((c, i) => (
                              <div key={i} className="text-text-secondary">
                                <span className="text-text-secondary font-medium capitalize">
                                  [{c.type}]
                                </span>{' '}
                                {c.description}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] font-medium mt-2">
                          {currentTask.essayBlueprint.cardinalErrorWarning}
                        </div>
                      </div>

                      {!currentAnswerState.isSubmitted && (
                        <div className="pt-3 border-t border-surface-border flex justify-end">
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
                            className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400"
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
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>{currentAnswerState.feedback.message}</span>
                        <span className="font-mono text-sm px-2 py-0.5 rounded bg-surface-card border border-surface-border text-amber-400">
                          Zdobyto: {currentAnswerState.pointsAwarded} / {currentTask.points} pkt
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Przyciski Akcji */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-surface-border">
                    <div className="flex items-center gap-2">
                      {currentAnswerState.isSubmitted ? (
                        <>
                          <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className="px-4 py-2 rounded-xl bg-surface-card-hover hover:bg-surface-card-hover text-text-primary text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            {showExplanation ? 'Ukryj wyjaśnienie' : 'Pokaż wyjaśnienie'}
                          </button>

                          <button
                            onClick={() => setShowCkeKey(!showCkeKey)}
                            className="px-4 py-2 rounded-xl bg-surface-card-hover hover:bg-surface-card-hover text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            {showCkeKey ? 'Ukryj klucz CKE' : 'Klucz punktowania CKE'}
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-text-muted bg-surface-bg px-3.5 py-2 rounded-xl border border-surface-border">
                          <Lock className="w-3.5 h-3.5 text-amber-500/70" />
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
                        className="px-4 py-2 rounded-xl bg-surface-card-hover hover:bg-surface-border border border-surface-border text-text-primary text-xs font-medium flex items-center gap-2 transition-all"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                        <span>Zapytaj AI Tutora o to zadanie</span>
                      </button>
                    )}
                  </div>

                  {/* Sekcja Klucza CKE i Modelowej Odpowiedzi */}
                  {showCkeKey && (
                    <div className="p-4 rounded-xl bg-surface-bg border border-surface-border space-y-3 animate-fadeIn">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        Oficjalny Schemat Oceniania CKE
                      </div>

                      {currentTask.correctAnswerText && (
                        <div>
                          <div className="text-[11px] font-semibold text-text-secondary">
                            Wzorcowa odpowiedź:
                          </div>
                          <div className="text-xs text-text-primary mt-0.5">
                            {currentTask.correctAnswerText}
                          </div>
                        </div>
                      )}

                      {currentTask.synthesisModelSummary && (
                        <div>
                          <div className="text-[11px] font-semibold text-text-secondary">
                            Wzorcowa notatka syntetyzująca (CKE):
                          </div>
                          <div className="text-xs text-text-primary mt-0.5 italic bg-surface-card p-2.5 rounded-lg border border-surface-border">
                            „{currentTask.synthesisModelSummary}”
                          </div>
                        </div>
                      )}

                      {currentTask.ckeKeyCriteria && (
                        <div>
                          <div className="text-[11px] font-semibold text-text-secondary">
                            Kryteria przyznawania punktów:
                          </div>
                          <ul className="list-disc list-inside text-xs text-text-secondary mt-1 space-y-1">
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
                    <div className="p-4 rounded-xl bg-surface-card-hover/40 border border-surface-border/60 text-xs text-text-secondary space-y-1 animate-fadeIn">
                      <span className="font-semibold text-white">
                        Wyjaśnienie i kontekst merytoryczny:
                      </span>
                      <p className="leading-relaxed">{currentTask.explanation}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-text-muted">
                  Wybierz zadanie z listy po lewej stronie.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
