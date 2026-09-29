import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Award,
  FileText,
  Bookmark,
  Eye,
  XCircle,
  HelpCircle,
  Check,
  Send,
  Lightbulb,
  GraduationCap,
  ListOrdered,
  Flame,
  CheckCheck,
  Lock,
  Unlock,
  ShieldCheck,
  RefreshCw,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playAudioTone } from '../../utils';
import { PolishLesson } from '../../types/lessonTypes';
import { PolishTask } from '../../types/maturaTypes';
import { ALL_POLISH_TASKS } from '../../data/polish';

interface PolishLessonViewProps {
  lesson: PolishLesson;
  onBack: () => void;
  onNextLesson?: (nextLessonId: string) => void;
  onCompleteLesson?: (lessonId: string, pointsEarned: number) => void;
}

export type LessonStage = 'intro' | 'practice' | 'summary';

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
    message: string;
    isCorrect: boolean;
    partialScore?: {
      content: number;
      composition: number;
      language: number;
      total: number;
    };
  } | null;
}

export const PolishLessonView: React.FC<PolishLessonViewProps> = ({
  lesson,
  onBack,
  onNextLesson,
  onCompleteLesson,
}) => {
  // Etap lekcji: 1. Wstęp Teoretyczny, 2. Zadania CKE, 3. Podsumowanie
  const [currentStage, setCurrentStage] = useState<LessonStage>('intro');

  // Weryfikacja wstępu teoretycznego (Gatekeeper) – zapamiętywana lokalnie
  const [isIntroPassed, setIsIntroPassed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`jasne_gatekeeper_${lesson.id}`);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Stan odpowiedzi na pytanie Gatekeepera
  const [gatekeeperSelected, setGatekeeperSelected] = useState<number | null>(null);
  const [gatekeeperSubmitted, setGatekeeperSubmitted] = useState<boolean>(false);
  const [gatekeeperError, setGatekeeperError] = useState<boolean>(false);

  // Zadania przypisane do tej lekcji
  const lessonTasks = useMemo(() => {
    return ALL_POLISH_TASKS.filter((task) => lesson.taskIds.includes(task.id));
  }, [lesson.taskIds]);

  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const currentTask = lessonTasks[activeTaskIndex] || lessonTasks[0];

  // Odpowiedzi i stan sprawdzania dla każdego zadania w lekcji
  const [taskAnswers, setTaskAnswers] = useState<Record<string, TaskAnswerState>>({});

  const [showExplanation, setShowExplanation] = useState(false);
  const [showCkeKey, setShowCkeKey] = useState(false);
  const [lessonFinished, setLessonFinished] = useState(false);

  // 45-minutowy Licznik Czasu Lekcji (2700 sekund)
  const [secondsRemaining, setSecondsRemaining] = useState(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pobierz bieżący stan odpowiedzi dla aktywnego zadania
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
    setTaskAnswers((prev) => ({
      ...prev,
      [currentTask.id]: {
        ...(prev[currentTask.id] || {
          selectedOption: null,
          tfAnswers: {},
          openAnswer: '',
          synthesisText: '',
          isSubmitted: false,
          attempts: 0,
          pointsAwarded: 0,
          maxPoints: currentTask.points,
          feedback: null,
        }),
        ...patch,
      },
    }));
  };

  // Licznik słów dla notatki syntetyzującej
  const synthesisWordCount = useMemo(() => {
    const text = currentAnswerState.synthesisText?.trim() || '';
    if (!text) return 0;
    return text.split(/\s+/).length;
  }, [currentAnswerState.synthesisText]);

  // Statystyki ukończenia zadań w lekcji
  const completedTasksCount = useMemo(() => {
    return Object.values(taskAnswers).filter((a) => a.isSubmitted).length;
  }, [taskAnswers]);

  const completionPercent = useMemo(() => {
    if (lessonTasks.length === 0) return 100;
    return Math.round((completedTasksCount / lessonTasks.length) * 100);
  }, [completedTasksCount, lessonTasks.length]);

  const isSummaryUnlocked = completionPercent >= 70;

  // Weryfikacja Gatekeepera we Wstępie Teoretycznym
  const handleVerifyGatekeeper = () => {
    if (gatekeeperSelected === null) return;
    setGatekeeperSubmitted(true);

    if (gatekeeperSelected === lesson.introduction.gatekeeper.correctIndex) {
      playAudioTone('success');
      setGatekeeperError(false);
      setIsIntroPassed(true);
      try {
        localStorage.setItem(`jasne_gatekeeper_${lesson.id}`, 'true');
      } catch {}

      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      setTimeout(() => {
        setCurrentStage('practice');
      }, 1200);
    } else {
      playAudioTone('error');
      setGatekeeperError(true);
    }
  };

  // =========================================================================
  // MECHANIKA OCENIANIA ZADAŃ W LEKCJI (KROK 2)
  // =========================================================================

  // 1. Sprawdzanie zadania ABCD z systemem 2 prób
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
              ? `Znakomicie! Poprawna odpowiedź z klucza CKE (+${earned} pkt).`
              : `Poprawna odpowiedź w 2. próbie (+${earned} pkt).`,
        },
      });
      setShowExplanation(true);
      setShowCkeKey(true);
    } else {
      playAudioTone('error');
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

  // 2. Sprawdzanie zadania Prawda / Fałsz (Tabela)
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

    // Oficjalne kryteria CKE dla P/F:
    // Dla 2 zdań: 2 poprawne = 1 pkt, 1 lub 0 = 0 pkt
    // Dla 3 zdań: 3 poprawne = 2 pkt, 2 poprawne = 1 pkt, <2 = 0 pkt
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
          message: `Bezbłędna ocena wszystkich stwierdzeń! Przyznano ${earned}/${currentTask.points} pkt CKE.`,
        },
      });
      setShowExplanation(true);
      setShowCkeKey(true);
    } else {
      playAudioTone('error');
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
      }
    }
  };

  // 3. Szczegółowa ewaluacja notatki syntetyzującej wg oficjalnej matrycy CKE (4 pkt)
  const handleSubmitSynthesis = () => {
    if (!currentTask) return;
    const text = currentAnswerState.synthesisText?.trim() || '';
    const words = synthesisWordCount;

    // Kryterium 1: Treść (0–2 pkt) – synteza obu autorów
    // Sprawdzamy czy uczeń odnosi się do obu tekstów
    const hasAuthor1 = /autor|tekst|pierwsz|stanowisk|krzemińsk|luecke|dyczewsk|limon/i.test(text);
    const hasAuthor2 = /drugi|drugiego|z kolei|natomiast|odmiennie|podobnie|oba|obydwa/i.test(text);
    const hasSynthesis = /wspóln|syntez|wniosek|zarówno|podsumowuj|pokazuj/i.test(text);

    let contentScore = 0;
    if (hasAuthor1 && hasAuthor2 && hasSynthesis && words >= 50) {
      contentScore = 2;
    } else if ((hasAuthor1 || hasAuthor2) && words >= 40) {
      contentScore = 1;
    }

    // Kryterium 2: Kompozycja i spójność (0–1 pkt)
    // CKE: 60–90 słów = 1 pkt; poniżej 60 lub powyżej 90 = 0 pkt!
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

    playAudioTone(total >= 2 ? 'success' : 'error');
    setShowExplanation(true);
    setShowCkeKey(true);
  };

  // 4. Sprawdzanie zadania otwartego (1–2 pkt)
  const handleSubmitOpenTask = () => {
    if (!currentTask) return;
    const answer = currentAnswerState.openAnswer.trim();
    if (!answer) return;

    let earned = 0;
    const len = answer.length;
    // Analiza merytoryczna słów kluczowych
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

    playAudioTone(earned > 0 ? 'success' : 'error');
    setShowExplanation(true);
    setShowCkeKey(true);
  };

  // Reset do 2. próby
  const handleRetryTask = () => {
    if (!currentTask) return;
    updateCurrentAnswer({
      selectedOption: null,
      feedback: null,
    });
  };

  // Zakończenie lekcji i XP
  const handleFinishLesson = () => {
    setLessonFinished(true);
    playAudioTone('success');
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
    });

    const totalPointsEarned = Object.values(taskAnswers).reduce(
      (acc, a) => acc + (a.pointsAwarded || 0),
      0
    );

    if (onCompleteLesson) {
      onCompleteLesson(lesson.id, totalPointsEarned);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 animate-fadeIn">
      {/* Pasek Górny z Czasomierzem i Nawigacją */}
      <div className="bg-surface-card/90 border border-surface-border rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-surface-card-hover hover:bg-surface-card-hover text-text-secondary hover:text-white transition-colors"
              title="Powrót do spisu lekcji"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Lekcja {lesson.number} z 24
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-surface-card-hover text-text-secondary border border-surface-border">
                  {lesson.module}
                </span>
                {lesson.epoch && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    {lesson.epoch}
                  </span>
                )}
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
                {lesson.title}
              </h1>
              <p className="text-xs text-text-secondary">{lesson.subtitle}</p>
            </div>
          </div>

          {/* Panel Kontrolny 45 Minutowej Sesji */}
          <div className="flex items-center gap-3 self-end md:self-center">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-bg border border-surface-border">
              <Clock
                className={`w-4 h-4 ${
                  secondsRemaining < 300
                    ? 'text-rose-400 animate-pulse'
                    : 'text-amber-400'
                }`}
              />
              <div className="flex flex-col">
                <span className="text-[10px] text-text-secondary leading-none">
                  Czas lekcji (45 min)
                </span>
                <span className="font-mono text-sm font-bold text-white tracking-wider">
                  {formatTimer(secondsRemaining)}
                </span>
              </div>
              <div className="flex items-center ml-2 border-l border-surface-border pl-2 gap-1">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1 rounded-lg hover:bg-surface-card-hover text-text-secondary hover:text-white transition-colors"
                  title={isTimerRunning ? 'Wstrzymaj sesję' : 'Wznów sesję'}
                >
                  {isTimerRunning ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>
                <button
                  onClick={() => setSecondsRemaining(45 * 60)}
                  className="p-1 rounded-lg hover:bg-surface-card-hover text-text-secondary hover:text-white transition-colors"
                  title="Zresetuj czas do 45:00"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Etapowa Nawigacja z Blokadami Dydaktycznymi */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-surface-border">
          {/* KROK 1: Wstęp Teoretyczny */}
          <button
            onClick={() => setCurrentStage('intro')}
            className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
              currentStage === 'intro'
                ? 'bg-amber-500/15 border-amber-500/60 shadow text-amber-300'
                : 'bg-surface-bg/60 border-surface-border text-text-secondary hover:bg-surface-card-hover/50 hover:text-text-primary'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                currentStage === 'intro'
                  ? 'bg-amber-500 text-black'
                  : isIntroPassed
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-surface-card-hover text-text-secondary'
              }`}
            >
              {isIntroPassed ? <Check className="w-3.5 h-3.5" /> : '1'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate flex items-center gap-1.5">
                <span>1. Wstęp Teoretyczny</span>
                {isIntroPassed && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              </div>
              <div className="text-[10px] text-text-muted truncate hidden sm:block">
                Kluczowe pojęcia & Gatekeeper CKE
              </div>
            </div>
          </button>

          {/* KROK 2: Praktyka CKE (Zablokowana dopóki nie zdano Gatekeepera) */}
          <button
            onClick={() => {
              if (isIntroPassed) {
                setCurrentStage('practice');
              }
            }}
            disabled={!isIntroPassed}
            className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
              !isIntroPassed
                ? 'bg-surface-bg/30 border-surface-border text-text-muted cursor-not-allowed opacity-60'
                : currentStage === 'practice'
                ? 'bg-amber-500/15 border-amber-500/60 shadow text-amber-300'
                : 'bg-surface-bg/60 border-surface-border text-text-secondary hover:bg-surface-card-hover/50 hover:text-text-primary'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                !isIntroPassed
                  ? 'bg-surface-card text-text-muted'
                  : currentStage === 'practice'
                  ? 'bg-amber-500 text-black'
                  : 'bg-surface-card-hover text-text-secondary'
              }`}
            >
              {!isIntroPassed ? <Lock className="w-3 h-3 text-text-muted" /> : '2'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate flex items-center gap-1.5">
                <span>2. Praktyka CKE</span>
                {!isIntroPassed && <Lock className="w-3 h-3 text-amber-500/60 shrink-0" />}
              </div>
              <div className="text-[10px] text-text-muted truncate hidden sm:block">
                {!isIntroPassed
                  ? 'Wymaga zdania wstępu'
                  : `Zadania z arkuszy (${completedTasksCount}/${lessonTasks.length})`}
              </div>
            </div>
          </button>

          {/* KROK 3: Podsumowanie (Zablokowane dopóki nie ukończono min. 70% zadań) */}
          <button
            onClick={() => {
              if (isSummaryUnlocked) {
                setCurrentStage('summary');
              }
            }}
            disabled={!isSummaryUnlocked}
            className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
              !isSummaryUnlocked
                ? 'bg-surface-bg/30 border-surface-border text-text-muted cursor-not-allowed opacity-60'
                : currentStage === 'summary'
                ? 'bg-amber-500/15 border-amber-500/60 shadow text-amber-300'
                : 'bg-surface-bg/60 border-surface-border text-text-secondary hover:bg-surface-card-hover/50 hover:text-text-primary'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                !isSummaryUnlocked
                  ? 'bg-surface-card text-text-muted'
                  : currentStage === 'summary'
                  ? 'bg-amber-500 text-black'
                  : 'bg-surface-card-hover text-text-secondary'
              }`}
            >
              {!isSummaryUnlocked ? <Lock className="w-3 h-3 text-text-muted" /> : '3'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate flex items-center gap-1.5">
                <span>3. Podsumowanie</span>
                {!isSummaryUnlocked && <Lock className="w-3 h-3 text-text-muted shrink-0" />}
              </div>
              <div className="text-[10px] text-text-muted truncate hidden sm:block">
                {!isSummaryUnlocked
                  ? `Min. 70% zadań (${completionPercent}%)`
                  : 'Wnioski & Zaliczenie (+XP)'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ETAP 1: WSTĘP TEORETYCZNY + GATEKEEPER CKE                                */}
      {/* ========================================================================= */}
      {currentStage === 'intro' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-surface-card border border-surface-border rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-l-4 border-amber-500 pl-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Wstęp merytoryczny (ok. 12 min)
              </span>
              <p className="text-base sm:text-lg text-text-primary font-medium mt-1 leading-relaxed">
                {lesson.introduction.lead}
              </p>
            </div>

            {/* Cele Lekcji */}
            <div className="bg-surface-bg/80 rounded-xl p-5 border border-surface-border space-y-3">
              <div className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Czego nauczysz się w tej sesji:
              </div>
              <ul className="space-y-2">
                {lesson.introduction.objectives.map((obj, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-text-secondary flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kompendium Wiedzy (Punkty Teoretyczne) */}
            <div className="space-y-4 pt-2">
              <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Kompendium wiedzy maturalnej:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.introduction.theoryPoints.map((tp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-surface-bg/60 border border-surface-border space-y-2 hover:border-surface-border transition-colors"
                  >
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-[10px]">
                        § {idx + 1}
                      </span>
                      {tp.title}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">
                      {tp.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Wskazówki Egzaminatorów CKE */}
            {lesson.introduction.ckeExaminerTips.length > 0 && (
              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Wskazówki i patenty egzaminatorów CKE:
                </div>
                <ul className="space-y-2">
                  {lesson.introduction.ckeExaminerTips.map((tip, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-amber-200 flex items-start gap-2"
                    >
                      <span className="text-amber-400 font-bold shrink-0">▸</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ostrzeżenie przed Błędem Kardynalnym */}
            {lesson.introduction.cardinalWarning && (
              <div className="p-4 sm:p-5 rounded-xl bg-rose-950/40 border border-rose-600/40 text-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  Błąd Kardynalny – Ostrzeżenie (0 pkt za wypracowanie):
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-rose-100">
                  {lesson.introduction.cardinalWarning}
                </p>
              </div>
            )}

            {/* ============================================================= */}
            {/* GATEKEEPER CKE: QUIZ WERYFIKACYJNY ODBLOKOWUJĄCY ZADANIA      */}
            {/* ============================================================= */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-surface-border">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-bg via-surface-card to-amber-950/30 border border-amber-500/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <span>Gatekeeper CKE: Test Zrozumienia Wstępu</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Wymagane do odblokowania zadań
                  </span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed">
                  Zgodnie z zasadą pełnego przygotowania maturalnego, nie możesz przejść do zadań praktycznych bez zrozumienia kluczowej pułapki CKE z tego działu.
                </p>

                <div className="p-4 rounded-xl bg-surface-bg border border-surface-border text-xs sm:text-sm font-semibold text-white leading-relaxed">
                  {lesson.introduction.gatekeeper.question}
                </div>

                {/* Opcje odpowiedzi Gatekeepera */}
                <div className="space-y-2">
                  {lesson.introduction.gatekeeper.options.map((opt, idx) => {
                    const isSelected = gatekeeperSelected === idx;
                    const isCorrect = idx === lesson.introduction.gatekeeper.correctIndex;
                    let style = 'border-surface-border bg-surface-card text-text-secondary hover:border-surface-border';

                    if (gatekeeperSubmitted) {
                      if (isCorrect) {
                        style = 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        style = 'border-rose-500 bg-rose-500/15 text-rose-300';
                      }
                    } else if (isSelected) {
                      style = 'border-amber-500 bg-amber-500/15 text-white shadow-sm';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!isIntroPassed) {
                            setGatekeeperSelected(idx);
                            setGatekeeperSubmitted(false);
                            setGatekeeperError(false);
                          }
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {gatekeeperSubmitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {gatekeeperSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Komunikat o błędzie lub sukcesie */}
                {gatekeeperSubmitted && gatekeeperError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 space-y-1 animate-fadeIn">
                    <div className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      Niepoprawna odpowiedź!
                    </div>
                    <p className="leading-relaxed">{lesson.introduction.gatekeeper.hint}</p>
                    <p className="text-[11px] text-text-secondary pt-1">
                      Wybierz inną odpowiedź i zatwierdź ponownie, aby odblokować zadania CKE.
                    </p>
                  </div>
                )}

                {isIntroPassed && (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-200 space-y-2 animate-fadeIn">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      Znakomicie! Wstęp teoretyczny zaliczony.
                    </div>
                    <p className="leading-relaxed">
                      {lesson.introduction.gatekeeper.explanation}
                    </p>
                  </div>
                )}

                {/* Przycisk akcji Gatekeepera */}
                <div className="pt-2 flex justify-end">
                  {!isIntroPassed ? (
                    <button
                      onClick={handleVerifyGatekeeper}
                      disabled={gatekeeperSelected === null}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-40 transition-all cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Zatwierdź odpowiedź i odblokuj zadania CKE</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentStage('practice')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                    >
                      <span>Przejdź do zadań praktycznych CKE ({lessonTasks.length} zadań)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAP 2: ZADANIA PRAKTYCZNE CKE Z PRECYZYJNĄ MECHANIKĄ OCENIANIA           */}
      {/* ========================================================================= */}
      {currentStage === 'practice' && (
        <div className="space-y-6 animate-fadeIn">
          {lessonTasks.length === 0 ? (
            <div className="bg-surface-card border border-surface-border rounded-2xl p-12 text-center text-text-secondary">
              Brak przypisanych zadań w tej lekcji.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Lewy Pasek: Indeks zadań w tej lekcji */}
              <div className="lg:col-span-4 bg-surface-card border border-surface-border rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-text-secondary pb-2 border-b border-surface-border">
                  <span>Zadania w lekcji ({lessonTasks.length})</span>
                  <span className="text-amber-400 font-bold">
                    {completedTasksCount}/{lessonTasks.length} ({completionPercent}%)
                  </span>
                </div>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                  {lessonTasks.map((t, idx) => {
                    const isCurrent = idx === activeTaskIndex;
                    const ans = taskAnswers[t.id];
                    const isDone = ans?.isSubmitted;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setActiveTaskIndex(idx);
                          setShowExplanation(ans?.isSubmitted || false);
                          setShowCkeKey(ans?.isSubmitted || false);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                          isCurrent
                            ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                            : 'border-surface-border bg-surface-bg/60 text-text-secondary hover:bg-surface-card-hover'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold truncate">
                            Zadanie {idx + 1}: {t.title}
                          </span>
                          {isDone ? (
                            <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {ans.pointsAwarded}/{t.points} pkt
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-text-muted">
                              {t.points} pkt
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-text-secondary truncate">
                          {t.taskType === 'single_choice' && 'ABCD • Zamknięte'}
                          {t.taskType === 'true_false' && 'Tabela Prawda/Fałsz'}
                          {t.taskType === 'synthesis_note' && 'Notatka syntetyzująca'}
                          {t.taskType === 'short_open' && 'Zadanie otwarte krótkiej odp.'}
                          {t.taskType === 'essay_blueprint' && 'Konspekt wypracowania (35 pkt)'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pasek postępu odblokowania Podsumowania */}
                <div className="pt-3 border-t border-surface-border space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-text-secondary">
                    <span>Odblokowanie Podsumowania:</span>
                    <span className={completionPercent >= 70 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                      {completionPercent}% / min. 70%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-card-hover overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        completionPercent >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, completionPercent)}%` }}
                    />
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      onClick={() => setCurrentStage('intro')}
                      className="text-xs text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      Wstęp
                    </button>
                    <button
                      onClick={() => {
                        if (isSummaryUnlocked) setCurrentStage('summary');
                      }}
                      disabled={!isSummaryUnlocked}
                      className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                        isSummaryUnlocked
                          ? 'text-emerald-400 hover:text-emerald-300'
                          : 'text-text-muted cursor-not-allowed'
                      }`}
                    >
                      {!isSummaryUnlocked && <Lock className="w-3 h-3 text-text-muted" />}
                      Podsumowanie
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Prawa Kolumna: Aktywne Zadanie Lekcji */}
              <div className="lg:col-span-8 bg-surface-card border border-surface-border rounded-2xl p-6 shadow-xl space-y-6">
                {currentTask && (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-card-hover text-amber-400">
                            Część {currentTask.part}: {currentTask.partName}
                          </span>
                          {currentTask.epoch && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-surface-card-hover text-indigo-300">
                              {currentTask.epoch}
                            </span>
                          )}
                        </div>
                        <h2 className="text-base font-bold text-white">
                          Zadanie {activeTaskIndex + 1}: {currentTask.title}
                        </h2>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                        Waga: {currentTask.points} pkt
                      </span>
                    </div>

                    {/* Tekst źródłowy 1 */}
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

                    {/* Tekst źródłowy 2 */}
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

                    {/* Ikonografia */}
                    {currentTask.imageCaption && (
                      <div className="p-6 rounded-xl bg-surface-bg border border-surface-border text-center space-y-2">
                        <BookOpen className="w-8 h-8 text-amber-500/60 mx-auto" />
                        <div className="text-xs font-semibold text-text-secondary">
                          [Dzieło sztuki maturalnej]
                        </div>
                        <div className="text-xs text-text-muted italic">
                          {currentTask.imageCaption}
                        </div>
                      </div>
                    )}

                    {/* Treść Polecenia */}
                    <div className="text-sm font-semibold text-white leading-relaxed">
                      {currentTask.question}
                    </div>

                    {/* ========================================================= */}
                    {/* WARIANT 1: ZADANIE JEDNOKROTNEGO WYBORU (ABCD)             */}
                    {/* ========================================================= */}
                    {currentTask.taskType === 'single_choice' && currentTask.options && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          {currentTask.options.map((opt, i) => {
                            const isSelected = currentAnswerState.selectedOption === i;
                            const isCorrect = i === currentTask.correctOptionIndex;
                            let style = 'border-surface-border bg-surface-bg/60 text-text-primary hover:border-surface-border';

                            if (currentAnswerState.isSubmitted) {
                              if (isCorrect) {
                                style = 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-semibold';
                              } else if (isSelected && !isCorrect) {
                                style = 'border-rose-500 bg-rose-500/15 text-rose-300';
                              }
                            } else if (isSelected) {
                              style = 'border-amber-500 bg-amber-500/15 text-white';
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
                                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between ${style}`}
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
                                onClick={() => {
                                  updateCurrentAnswer({ isSubmitted: true, pointsAwarded: 0 });
                                  setShowExplanation(true);
                                  setShowCkeKey(true);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-surface-card-hover text-text-secondary hover:text-white text-xs"
                              >
                                Odsłoń klucz CKE (0 pkt)
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* WARIANT 2: ZADANIE PRAWDA / FAŁSZ (TABELA)                 */}
                    {/* ========================================================= */}
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
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* WARIANT 3: TRENAŻER NOTATKI SYNTETYZUJĄCEJ (4 PKT CKE)     */}
                    {/* ========================================================= */}
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

                    {/* ========================================================= */}
                    {/* WARIANT 4: ZADANIE OTWARTE KRÓTKIEJ ODPOWIEDZI             */}
                    {/* ========================================================= */}
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

                    {/* ========================================================= */}
                    {/* WARIANT 5: KONSPEKT WYPRACOWANIA (35 PKT)                 */}
                    {/* ========================================================= */}
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
                                  <span className="text-text-secondary font-medium capitalize">[{c.type}]</span> {c.description}
                                </div>
                              ))}
                            </div>
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

                    {/* Pasek Narzędzi i Nawigacji po Zadaniu */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-surface-border">
                      <div className="flex items-center gap-2">
                        {currentAnswerState.isSubmitted ? (
                          <>
                            <button
                              onClick={() => setShowExplanation(!showExplanation)}
                              className="px-3.5 py-2 rounded-xl bg-surface-card-hover hover:bg-surface-card-hover text-text-primary text-xs font-semibold flex items-center gap-1.5"
                            >
                              <Eye className="w-4 h-4" />
                              {showExplanation ? 'Ukryj wyjaśnienie' : 'Wyjaśnienie'}
                            </button>
                            <button
                              onClick={() => setShowCkeKey(!showCkeKey)}
                              className="px-3.5 py-2 rounded-xl bg-surface-card-hover hover:bg-surface-card-hover text-amber-400 text-xs font-semibold flex items-center gap-1.5"
                            >
                              <FileText className="w-4 h-4" />
                              {showCkeKey ? 'Ukryj klucz CKE' : 'Klucz CKE'}
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-text-muted italic">
                            🔒 Klucz CKE i wyjaśnienia odblokują się po zatwierdzeniu odpowiedzi.
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {activeTaskIndex < lessonTasks.length - 1 ? (
                          <button
                            onClick={() => {
                              const nextIdx = activeTaskIndex + 1;
                              setActiveTaskIndex(nextIdx);
                              const nextAns = taskAnswers[lessonTasks[nextIdx]?.id];
                              setShowExplanation(nextAns?.isSubmitted || false);
                              setShowCkeKey(nextAns?.isSubmitted || false);
                            }}
                            className="px-4 py-2 rounded-xl bg-surface-card-hover hover:bg-surface-card-hover text-white text-xs font-semibold flex items-center gap-1"
                          >
                            Następne zadanie
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (isSummaryUnlocked) setCurrentStage('summary');
                            }}
                            disabled={!isSummaryUnlocked}
                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                              isSummaryUnlocked
                                ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20'
                                : 'bg-surface-card-hover text-text-muted cursor-not-allowed opacity-60'
                            }`}
                          >
                            {!isSummaryUnlocked && <Lock className="w-3.5 h-3.5" />}
                            Podsumowanie lekcji
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Klucz CKE (wyświetlany po zatwierdzeniu) */}
                    {showCkeKey && currentAnswerState.isSubmitted && (
                      <div className="p-4 rounded-xl bg-surface-bg border border-surface-border space-y-3 animate-fadeIn">
                        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          Oficjalny klucz punktowania CKE
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
                              Kryteria punktacji:
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

                    {/* Wyjaśnienie merytoryczne */}
                    {showExplanation && currentAnswerState.isSubmitted && (
                      <div className="p-4 rounded-xl bg-surface-card-hover/40 border border-surface-border/60 text-xs text-text-secondary space-y-1 animate-fadeIn">
                        <span className="font-semibold text-white">
                          Wyjaśnienie i kontekst merytoryczny:
                        </span>
                        <p className="leading-relaxed">{currentTask.explanation}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* ETAP 3: PODSUMOWANIE LEKCJI & ZALICZENIE (+XP)                            */}
      {/* ========================================================================= */}
      {currentStage === 'summary' && (
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-5">
            <div>
              <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Podsumowanie sesji 45-minutowej
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Kluczowe Wnioski & Utrwalenie Wiedzy
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-xl bg-surface-bg border border-surface-border text-center">
                <div className="text-sm font-bold text-amber-400">
                  {completedTasksCount} / {lessonTasks.length}
                </div>
                <div className="text-[10px] text-text-secondary">Wykonanych zadań</div>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-surface-bg border border-surface-border text-center">
                <div className="text-sm font-bold text-emerald-400">
                  {Math.round((45 * 60 - secondsRemaining) / 60)} min
                </div>
                <div className="text-[10px] text-text-secondary">Czas pracy</div>
              </div>
            </div>
          </div>

          {/* Kluczowe wnioski z lekcji */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              Do zapamiętania na maturę:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.summary.keyTakeaways.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-surface-bg/80 border border-surface-border text-xs text-text-secondary flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    ✓
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Zadanie utrwalające / refleksja */}
          <div className="p-5 rounded-xl bg-surface-bg border border-surface-border space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Zadanie domowe / Trening refleksyjny:
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed italic">
              „{lesson.summary.reflection}”
            </p>
          </div>

          {/* Ukończenie lekcji i XP */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-surface-border">
            <button
              onClick={() => setCurrentStage('practice')}
              className="px-4 py-2.5 rounded-xl bg-surface-card-hover hover:bg-surface-card-hover text-text-secondary text-xs font-semibold flex items-center gap-1 self-start"
            >
              <ChevronLeft className="w-4 h-4" />
              Wróć do zadań
            </button>

            <div className="flex items-center gap-3">
              {!lessonFinished ? (
                <button
                  onClick={handleFinishLesson}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  Zakończ lekcję i odbierz +150 XP!
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4" /> Lekcja zaliczona (+150 XP)
                  </span>

                  {lesson.number < 24 && onNextLesson && (
                    <button
                      onClick={() => onNextLesson(`lekcja-${lesson.number + 1}`)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-black text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
                    >
                      <span>Następna lekcja ({lesson.number + 1}/24)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
