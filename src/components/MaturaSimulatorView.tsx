import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Target, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Clock, 
  Flag, 
  Pen, 
  Pause, 
  Play, 
  AlertTriangle, 
  RotateCcw, 
  Filter, 
  Search, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Flame, 
  Award, 
  Layers, 
  Zap, 
  Check, 
  X,
  FileText,
  Compass,
  Shuffle,
  BarChart3,
  CheckSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

import { MaturaTask, UserState, CkeTaskCompletionRecord } from '../types';
import { curriculumRepository } from '../services/curriculumRepository';
import { calculateMaturaPrediction } from '../lib/maturaPredictor';
import { playSuccessSound, playErrorSound, triggerHaptic } from '../utils';
import { ScratchpadModal } from './ScratchpadModal';
import { CkeFormulasModal } from './CkeFormulasModal';
import { MaturaExamReview, MaturaTaskReviewItem } from './MaturaExamReview';

export interface MaturaSimulatorViewProps {
  onEarnReward?: (xp: number, coins: number, showModal?: boolean) => void;
  userState?: UserState;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  completedTasks?: string[];
  onCompleteTask?: (taskId: string, points?: number) => void;
}

export function MaturaSimulatorView({
  onEarnReward,
  userState,
  onUpdateUserState,
  completedTasks = [],
  onCompleteTask
}: MaturaSimulatorViewProps) {
  // Baza wszystkich zadań pobierana przez curriculumRepository (Cache-First z Firestore)
  const [tasks, setTasks] = useState<MaturaTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Główne widoki zgodne z 4 Filarami:
  // 'hub' - centralny pulpit Symulatora (Bento)
  // 'exam_setup' - konfigurator Mini Matury
  // 'full_exams' - Filar 2: Pełne Oficjalne Arkusze CKE (Maj 2024, Czerwiec 2024, Maj 2023...)
  // 'topics_bank' - Filar 3: 15 Kafelków Działów CKE
  // 'topic_detail' - Szczegółowy widok wybranego działu
  // 'exam' - uniwersalny runner arkusza (z zegarem 20/35/180 min lub bezstresowy)
  // 'exam_review' - podsumowanie arkusza (MaturaExamReview)
  // 'maraton' - Filar 4: Trening ciągły / losowe zadania CKE / drill pojedynczy
  // 'mistakes' - Filar 5: Baza Błędów
  const [view, setView] = useState<
    'hub' | 'exam_setup' | 'full_exams' | 'topics_bank' | 'topic_detail' | 'exam' | 'exam_review' | 'maraton' | 'mistakes'
  >('hub');

  // Modale pomocnicze
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isFormulasOpen, setIsFormulasOpen] = useState(false);

  // Bank błędów (localStorage)
  const [mistakesBank, setMistakesBank] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('matura_mistakes_bank');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveMistakesBank = (newBank: string[]) => {
    setMistakesBank(newBank);
    try {
      localStorage.setItem('matura_mistakes_bank', JSON.stringify(newBank));
    } catch (e) {
      console.error('Failed to save mistakes bank:', e);
    }
  };

  const addMistake = (taskId: string) => {
    if (!mistakesBank.includes(taskId)) {
      const updated = [...mistakesBank, taskId];
      saveMistakesBank(updated);
    }
  };

  const removeMistake = (taskId: string) => {
    if (mistakesBank.includes(taskId)) {
      const updated = mistakesBank.filter(id => id !== taskId);
      saveMistakesBank(updated);
    }
  };

  // Ładowanie zadań Cache-First z Firestore
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const loadedTasks = await curriculumRepository.getCkeExamTasks('matematyka-podstawowa');
        if (!isMounted) return;
        if (!loadedTasks || loadedTasks.length === 0) {
          setLoadError('Baza arkuszy CKE nie została jeszcze wgrana do bazy chmurowej.');
          setTasks([]);
        } else {
          setTasks(loadedTasks);
        }
      } catch (err) {
        console.warn('[MaturaSimulatorView] Błąd wczytywania zadań:', err);
        if (isMounted) {
          setLoadError('Nie udało się połączyć z bazą zadań CKE.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void load();
    return () => { isMounted = false; };
  }, []);

  // Lista 15 kanonicznych działów CKE
  const CANONICAL_TOPICS = useMemo(() => [
    'Dział 1: Liczby Rzeczywiste',
    'Dział 2: Wyrażenia Algebraiczne i Wielomiany',
    'Dział 3: Równania i Nierówności',
    'Dział 4: Własności Funkcji i Wykresy',
    'Dział 5: Funkcja Liniowa i Układy Równań',
    'Dział 6: Funkcja Kwadratowa',
    'Dział 7: Ciągi Liczbowe',
    'Dział 8: Trygonometria',
    'Dział 9: Planimetria',
    'Dział 10: Geometria Analityczna',
    'Dział 11: Stereometria',
    'Dział 12: Kombinatoryka',
    'Dział 13: Rachunek Prawdopodobieństwa',
    'Dział 14: Statystyka',
    'Dział 15: Zadania Optymalizacyjne'
  ], []);

  // Rekordy ukończenia zadań z UserState
  const completedCkeRecords = useMemo<Record<string, CkeTaskCompletionRecord>>(() => {
    return userState?.completedCkeTasks || {};
  }, [userState?.completedCkeTasks]);

  const isTaskPassed = (taskId: string) => {
    if (completedCkeRecords[taskId]?.status === 'passed') return true;
    if (completedTasks.includes(taskId)) return true;
    return false;
  };

  const isTaskFailed = (taskId: string) => {
    if (completedCkeRecords[taskId]?.status === 'failed') return true;
    return mistakesBank.includes(taskId);
  };

  const completedCkeCount = useMemo(() => {
    return tasks.filter(t => isTaskPassed(t.id)).length;
  }, [tasks, completedCkeRecords, completedTasks]);

  const completionPct = tasks.length > 0 ? Math.round((completedCkeCount / tasks.length) * 100) : 0;

  // Matura Predictor
  const maturaPrediction = useMemo(() => {
    return calculateMaturaPrediction({
      subjectId: 'matematyka-podstawowa',
      completedTasks: completedTasks || [],
      maturaAttempts: userState?.maturaAttempts || 0,
      maturaBestScore: userState?.maturaBestScore || 0
    });
  }, [userState, completedTasks]);

  // Znajdź najsłabszy dział (z najniższym % zdanych zadań)
  const weakestSection = useMemo(() => {
    let minPct = 101;
    let weakest = CANONICAL_TOPICS[0];
    CANONICAL_TOPICS.forEach(topic => {
      const topicTasks = tasks.filter(t => t.section === topic);
      if (topicTasks.length > 0) {
        const passed = topicTasks.filter(t => isTaskPassed(t.id)).length;
        const pct = Math.round((passed / topicTasks.length) * 100);
        if (pct < minPct) {
          minPct = pct;
          weakest = topic;
        }
      }
    });
    return weakest;
  }, [tasks, CANONICAL_TOPICS, completedCkeRecords, completedTasks]);

  // =========================================================================
  // RUNNER ARKUSZA (Zarówno Mini Matura, jak i Pełny Arkusz CKE)
  // =========================================================================
  const [examTitle, setExamTitle] = useState('Mini Matura CKE');
  const [examTasks, setExamTasks] = useState<MaturaTask[]>([]);
  const [examCurrentIndex, setExamCurrentIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [examOpenScores, setExamOpenScores] = useState<Record<string, number>>({});
  const [flaggedTasks, setFlaggedTasks] = useState<Set<string>>(new Set());
  const [examTimeLeft, setExamTimeLeft] = useState(20 * 60);
  const [examTotalDuration, setExamTotalDuration] = useState(20 * 60);
  const [isExamTimed, setIsExamTimed] = useState(true);
  const [isExamPaused, setIsExamPaused] = useState(false);
  const [examTimeSpent, setExamTimeSpent] = useState(0);
  const [examReviewItems, setExamReviewItems] = useState<MaturaTaskReviewItem[]>([]);
  const [earnedReward, setEarnedReward] = useState<{ xp: number; coins: number } | null>(null);

  // Konfigurator Mini Matury
  const [setupSection, setSetupSection] = useState('Wszystkie działy');
  const [setupLength, setSetupLength] = useState<7 | 12>(7);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (view === 'exam' && isExamTimed && !isExamPaused) {
      timerRef.current = setInterval(() => {
        setExamTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [view, isExamTimed, isExamPaused, examTasks, examAnswers, examOpenScores]);

  // Uruchomienie Mini Matury
  const startMiniExam = (sectionChoice: string = setupSection, count: number = setupLength) => {
    let pool = tasks;
    if (sectionChoice !== 'Wszystkie działy') {
      pool = pool.filter(t => t.section === sectionChoice);
    }
    if (pool.length === 0) {
      alert('Brak zadań spełniających kryteria!');
      return;
    }
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));
    const duration = count === 7 ? 20 * 60 : 35 * 60;

    setExamTitle(`Mini Matura • ${sectionChoice === 'Wszystkie działy' ? 'Przekrój Całościowy' : sectionChoice}`);
    setExamTasks(selected);
    setExamCurrentIndex(0);
    setExamAnswers({});
    setExamOpenScores({});
    setFlaggedTasks(new Set());
    setExamTimeLeft(duration);
    setExamTotalDuration(duration);
    setIsExamTimed(true);
    setIsExamPaused(false);
    setView('exam');
  };

  // Uruchomienie Pełnego Arkusza CKE
  const startFullExam = (examName: string, sheetTasks: MaturaTask[], timed: boolean) => {
    if (sheetTasks.length === 0) {
      alert('Brak zadań w wybranym arkuszu!');
      return;
    }
    const duration = 180 * 60; // 3 godziny
    setExamTitle(`Oficjalny Arkusz CKE • ${examName}`);
    setExamTasks(sheetTasks);
    setExamCurrentIndex(0);
    setExamAnswers({});
    setExamOpenScores({});
    setFlaggedTasks(new Set());
    setExamTimeLeft(duration);
    setExamTotalDuration(duration);
    setIsExamTimed(timed);
    setIsExamPaused(false);
    setView('exam');
  };

  const handleFinishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const spent = isExamTimed ? examTotalDuration - examTimeLeft : 0;
    setExamTimeSpent(spent);

    let totalScore = 0;
    const newMistakesToAdd: string[] = [];
    const correctlySolved: string[] = [];

    const reviews: MaturaTaskReviewItem[] = examTasks.map(t => {
      const userAns = examAnswers[t.id];
      let earned = 0;
      if (t.isClosed) {
        earned = userAns === t.correctAnswer ? t.points : 0;
      } else {
        earned = examOpenScores[t.id] || 0;
      }

      if (earned >= t.points) {
        correctlySolved.push(t.id);
        if (onCompleteTask) onCompleteTask(t.id, earned);
      } else {
        newMistakesToAdd.push(t.id);
      }

      totalScore += earned;

      return {
        id: t.id,
        section: t.section,
        content: t.content,
        options: t.options,
        correctAnswer: t.correctAnswer,
        points: t.points,
        isClosed: t.isClosed,
        explanation: t.explanation,
        userAnswer: userAns,
        userPointsEarned: earned,
        isFlagged: flaggedTasks.has(t.id)
      };
    });

    setExamReviewItems(reviews);

    const updatedBank = Array.from(
      new Set([
        ...mistakesBank.filter(id => !correctlySolved.includes(id)),
        ...newMistakesToAdd
      ])
    );
    saveMistakesBank(updatedBank);

    if (onUpdateUserState) {
      onUpdateUserState(prev => {
        const ckeMap = { ...(prev.completedCkeTasks || {}) };
        reviews.forEach(r => {
          ckeMap[r.id] = {
            status: r.userPointsEarned >= r.points ? 'passed' : 'failed',
            score: r.userPointsEarned,
            solvedAt: new Date().toISOString(),
            userAnswer: r.userAnswer
          };
        });

        const maxExamPoints = examTasks.reduce((s, t) => s + t.points, 0);
        const scorePct = maxExamPoints > 0 ? Math.round((totalScore / maxExamPoints) * 100) : 0;
        const best = Math.max(prev.maturaBestScore || 0, scorePct);

        return {
          ...prev,
          completedCkeTasks: ckeMap,
          maturaAttempts: (prev.maturaAttempts || 0) + 1,
          maturaBestScore: best
        };
      });
    }

    const xp = 60 + totalScore * 15;
    const coins = 20 + totalScore * 5;
    setEarnedReward({ xp, coins });
    if (onEarnReward) onEarnReward(xp, coins, true);

    if (totalScore > 0) {
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }

    setView('exam_review');
  };

  const toggleFlag = (taskId: string) => {
    setFlaggedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
  };

  // =========================================================================
  // TRYB MARATONU / LOSOWY TRENING ("PO PROSTU RÓB ZADANIA")
  // =========================================================================
  const [maratonList, setMaratonList] = useState<MaturaTask[]>([]);
  const [maratonIndex, setMaratonIndex] = useState(0);
  const [maratonSelectedAnswer, setMaratonSelectedAnswer] = useState<string | null>(null);
  const [maratonSubmitted, setMaratonSubmitted] = useState(false);
  const [maratonSelfScore, setMaratonSelfScore] = useState<number | null>(null);
  const [randomScope, setRandomScope] = useState<'unsolved' | 'all' | 'weakest'>('unsolved');

  const startMaraton = (taskList: MaturaTask[], startIndex: number = 0) => {
    if (taskList.length === 0) {
      alert('Brak zadań w wybranej grupie!');
      return;
    }
    setMaratonList(taskList);
    setMaratonIndex(startIndex);
    setMaratonSelectedAnswer(null);
    setMaratonSubmitted(false);
    setMaratonSelfScore(null);
    setView('maraton');
  };

  // Szybki start 1 kliknięciem (Losowy Trening CKE)
  const startRandomTraining = (scope: 'unsolved' | 'all' | 'weakest' = randomScope) => {
    let pool = tasks;
    if (scope === 'weakest') {
      pool = tasks.filter(t => t.section === weakestSection);
    } else if (scope === 'unsolved') {
      const unsolved = tasks.filter(t => !isTaskPassed(t.id));
      if (unsolved.length > 0) pool = unsolved;
    }

    if (pool.length === 0) {
      alert('Gratulacje! Wszystkie zadania zostały już zaliczone.');
      pool = tasks;
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setRandomScope(scope);
    startMaraton(shuffled, 0);
  };

  const currentMaratonTask = maratonList[maratonIndex] || null;

  const handleMaratonAnswer = (optLetter: string) => {
    if (maratonSubmitted || !currentMaratonTask) return;
    setMaratonSelectedAnswer(optLetter);
    setMaratonSubmitted(true);

    const isCorrect = currentMaratonTask.correctAnswer.trim().toUpperCase() === optLetter.trim().toUpperCase();

    if (isCorrect) {
      playSuccessSound();
      triggerHaptic('success');
      removeMistake(currentMaratonTask.id);
      if (onEarnReward) onEarnReward(15, 5, false);
      if (onCompleteTask) onCompleteTask(currentMaratonTask.id, currentMaratonTask.points);
      try {
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
      } catch (e) {}
    } else {
      playErrorSound();
      triggerHaptic('error');
      addMistake(currentMaratonTask.id);
    }

    if (onUpdateUserState) {
      onUpdateUserState(prev => {
        const ckeMap = { ...(prev.completedCkeTasks || {}) };
        ckeMap[currentMaratonTask.id] = {
          status: isCorrect ? 'passed' : 'failed',
          score: isCorrect ? currentMaratonTask.points : 0,
          solvedAt: new Date().toISOString(),
          userAnswer: optLetter
        };
        return {
          ...prev,
          completedCkeTasks: ckeMap
        };
      });
    }
  };

  const handleMaratonSelfScore = (score: number) => {
    if (!currentMaratonTask) return;
    setMaratonSelfScore(score);
    setMaratonSubmitted(true);

    const isPassed = score >= currentMaratonTask.points;
    if (isPassed) {
      playSuccessSound();
      triggerHaptic('success');
      removeMistake(currentMaratonTask.id);
      if (onEarnReward) onEarnReward(20, 8, false);
      if (onCompleteTask) onCompleteTask(currentMaratonTask.id, score);
    } else {
      playErrorSound();
      triggerHaptic('error');
      addMistake(currentMaratonTask.id);
    }

    if (onUpdateUserState) {
      onUpdateUserState(prev => {
        const ckeMap = { ...(prev.completedCkeTasks || {}) };
        ckeMap[currentMaratonTask.id] = {
          status: isPassed ? 'passed' : 'failed',
          score: score,
          solvedAt: new Date().toISOString()
        };
        return {
          ...prev,
          completedCkeTasks: ckeMap
        };
      });
    }
  };

  const handleNextMaratonTask = () => {
    if (maratonIndex < maratonList.length - 1) {
      setMaratonIndex(prev => prev + 1);
      setMaratonSelectedAnswer(null);
      setMaratonSubmitted(false);
      setMaratonSelfScore(null);
    } else {
      alert('Świetna robota! Ukończyłeś tę serię zadań.');
      setView('hub');
    }
  };

  // Wybrany dział do podglądu (Filar 3)
  const [selectedTopicName, setSelectedTopicName] = useState<string>(CANONICAL_TOPICS[0]);
  const topicTasks = useMemo(() => {
    return tasks.filter(t => t.section === selectedTopicName);
  }, [tasks, selectedTopicName]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const renderMathContent = (content: string) => (
    <div className="prose prose-invert max-w-none math-render overflow-x-auto py-2 -my-2 text-text-primary text-sm sm:text-base leading-relaxed">
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </Markdown>
    </div>
  );

  return (
    <div className="flex flex-col p-3.5 sm:p-6 pb-40 sm:pb-24 max-w-4xl mx-auto w-full relative">
      {/* GŁÓWNY PASEK NAWIGACJI */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {view !== 'hub' && (
            <button
              onClick={() => {
                if (view === 'exam') {
                  if (confirm('Czy na pewno chcesz przerwać arkusz?')) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setView('hub');
                  }
                } else if (view === 'topic_detail') {
                  setView('topics_bank');
                } else {
                  setView('hub');
                }
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-surface-card border border-surface-border text-text-muted hover:text-white hover:bg-white/5 transition-all shrink-0 cursor-pointer active:scale-95"
              title="Wróć"
            >
              <ArrowLeft size={16} />
            </button>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <h1 className="font-display text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
                {view === 'hub' && 'Symulator CKE'}
                {view === 'exam_setup' && 'Mini Matura CKE'}
                {view === 'full_exams' && 'Pełne Arkusze CKE'}
                {view === 'topics_bank' && 'Bank 15 Działów'}
                {view === 'topic_detail' && selectedTopicName}
                {view === 'exam' && examTitle}
                {view === 'exam_review' && 'Wyniki Arkusza'}
                {view === 'maraton' && 'Trening Zadań CKE'}
                {view === 'mistakes' && 'Baza Błędów CKE'}
              </h1>
              <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                Formuła 2023
              </span>
            </div>
            {view !== 'hub' && (
              <p className="text-text-secondary text-xs sm:text-sm truncate mt-0.5">
                {view === 'full_exams' && 'Autentyczne kompletne arkusze egzaminacyjne CKE (31 zadań • 50 pkt)'}
                {view === 'topics_bank' && 'Komplet 15 oficjalnych działów z indywidualnymi postępami'}
                {view === 'exam' && `Zadanie ${examCurrentIndex + 1} z ${examTasks.length}`}
                {view === 'maraton' && `Zadanie ${maratonIndex + 1} z ${maratonList.length}`}
              </p>
            )}
          </div>
        </div>

        {/* Przyciski pomocnicze: Wzory & Brudnopis */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsFormulasOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-surface-card hover:bg-white/10 text-white border border-surface-border text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
            title="Karta wzorów CKE"
          >
            <BookOpen size={14} className="text-[#FFB800]" />
            <span className="hidden sm:inline">Wzory CKE</span>
          </button>

          <button
            onClick={() => setIsScratchpadOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-surface-card hover:bg-white/10 text-white border border-surface-border text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
            title="Otwórz brudnopis"
          >
            <Pen size={14} className="text-blue-400" />
            <span className="hidden sm:inline">Brudnopis</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-[#FFB800] animate-spin mb-4" />
          <p className="text-text-secondary text-sm font-medium">Wczytywanie 1006 oficjalnych zadań CKE...</p>
        </div>
      ) : loadError ? (
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-3">
            <AlertTriangle className="text-amber-400" size={24} />
          </div>
          <p className="text-white text-base font-bold mb-1">Baza CKE niedostępna</p>
          <p className="text-text-muted text-xs max-w-sm leading-relaxed mb-5">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#FFB800] text-black font-bold text-xs rounded-xl shadow-lg hover:bg-amber-400 transition-colors"
          >
            Spróbuj ponownie
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {/* =========================================================================
              VIEW: HUB (GŁÓWNY PULPIT BENTO Z 4 FILARAMI)
             ========================================================================= */}
          {view === 'hub' && (
            <motion.div
              key="hub"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col gap-3.5 sm:gap-5"
            >
              {/* HERO CARD ZE STATYSTYKAMI POSTĘPU BAZY CKE */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-card via-surface-card to-[#0d131f] border border-surface-border p-4 sm:p-5 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB800]/5 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

                <div className="relative z-10 flex flex-col gap-3.5">
                  {/* Górny wiersz: Badge i odznaki metryk bez łamania tekstu */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FFB800] bg-[#FFB800]/10 px-2.5 py-0.5 rounded-md border border-[#FFB800]/25 flex items-center gap-1">
                        <Flame size={12} className="text-[#FFB800]" />
                        Baza CKE
                      </span>
                      <span className="text-text-muted text-[11px] font-medium">• 15 działów</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-bg/80 border border-surface-border text-xs font-semibold text-white whitespace-nowrap">
                        <Award size={13} className="text-emerald-400 shrink-0" />
                        <span className="text-text-muted text-[10px] hidden xs:inline">Predictor:</span>
                        <span className="text-emerald-400 font-bold">{maturaPrediction.predictedPercent}%</span>
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-bg/80 border border-surface-border text-xs font-semibold text-white whitespace-nowrap">
                        <GraduationCap size={13} className="text-blue-400 shrink-0" />
                        <span className="text-text-muted text-[10px] hidden xs:inline">Arkusze:</span>
                        <span className="text-blue-400 font-bold">{userState?.maturaAttempts || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pasek postępu */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-secondary text-[11px] font-medium">Ukończono w bazie pytań:</span>
                      <span className="text-white font-bold text-xs">
                        <span className="text-[#FFB800]">{completedCkeCount}</span> / {tasks.length} ({completionPct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-bg/90 rounded-full overflow-hidden p-0.5 border border-surface-border/80">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 via-[#FFB800] to-yellow-300 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,184,0,0.4)]"
                        style={{ width: `${Math.max(completionPct, 1.5)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* FILAR 4: SZYBKI BANER 1 KLIKNIĘCIEM - "PO PROSTU RÓB ZADANIA" */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-surface-card to-surface-card border border-[#FFB800]/30 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB800]/20 border border-[#FFB800]/40 flex items-center justify-center shrink-0 text-[#FFB800]">
                    <Shuffle size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-black uppercase text-[#FFB800] bg-[#FFB800]/10 px-1.5 py-0.5 rounded border border-[#FFB800]/25">
                        Szybki start
                      </span>
                      <span className="text-[11px] text-text-muted truncate">Zero konfiguracji</span>
                    </div>
                    <h3 className="font-bold text-white text-sm sm:text-base truncate">
                      🎲 Losowy Trening CKE
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <select
                    value={randomScope}
                    onChange={e => setRandomScope(e.target.value as any)}
                    className="flex-1 sm:flex-none bg-surface-bg border border-surface-border text-text-secondary text-xs rounded-xl px-2.5 py-2 outline-none focus:border-[#FFB800]"
                  >
                    <option value="unsolved">Tylko nierozwiązane</option>
                    <option value="all">Wszystkie 1006 pytań</option>
                    <option value="weakest">Mój najsłabszy dział</option>
                  </select>

                  <button
                    onClick={() => startRandomTraining(randomScope)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#FFB800] text-black font-extrabold text-xs tracking-wide shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Zap size={14} fill="black" />
                    <span>Rozpocznij</span>
                  </button>
                </div>
              </div>

              {/* BENTO GRID 2x2: 4 GŁÓWNE FILARY PRZYGOTOWANIA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* FILAR 1: MINI MATURY CKE */}
                <button
                  onClick={() => setView('exam_setup')}
                  className="group text-left rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-[#FFB800]/50 p-4 sm:p-5 transition-all active:scale-[0.99] shadow-md flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/25 flex items-center justify-center">
                        <Clock className="text-[#FFB800]" size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded-full border border-[#FFB800]/20 whitespace-nowrap">
                        20–35 min
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#FFB800] transition-colors mb-1">
                      ⚡ Mini Matury CKE
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                      Ekspresowe arkusze próbne (7 lub 12 zadań) z oficjalnym zegarem. Bez stresu i utraty serc.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-[#FFB800] gap-1 mt-3 group-hover:translate-x-0.5 transition-transform">
                    <span>Napisz arkusz</span>
                    <ChevronRight size={13} />
                  </div>
                </button>

                {/* FILAR 2: PEŁNE OFICJALNE ARKUSZE CKE */}
                <button
                  onClick={() => setView('full_exams')}
                  className="group text-left rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-emerald-500/50 p-4 sm:p-5 transition-all active:scale-[0.99] shadow-md flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                        <FileText className="text-emerald-400" size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
                        31 zadań • 50 pkt
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-emerald-400 transition-colors mb-1">
                      📜 Pełne Arkusze CKE
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                      Oryginalne matury (Maj 2024, Czerwiec, Pokazowy). Tryb z zegarem 180 min lub bezstresowy.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-emerald-400 gap-1 mt-3 group-hover:translate-x-0.5 transition-transform">
                    <span>Wybierz arkusz</span>
                    <ChevronRight size={13} />
                  </div>
                </button>

                {/* FILAR 3: BANK ZADAŃ PODZIELONY NA DZIAŁY */}
                <button
                  onClick={() => setView('topics_bank')}
                  className="group text-left rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-blue-500/50 p-4 sm:p-5 transition-all active:scale-[0.99] shadow-md flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center">
                        <Layers className="text-blue-400" size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 whitespace-nowrap">
                        15 działów CKE
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-blue-400 transition-colors mb-1">
                      📚 Bank Zadań Działami
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                      Przerób wszystkie zadania CKE z konkretnego działu z indywidualnym paskiem opanowania.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-blue-400 gap-1 mt-3 group-hover:translate-x-0.5 transition-transform">
                    <span>Przeglądaj działy</span>
                    <ChevronRight size={13} />
                  </div>
                </button>

                {/* FILAR 4: BAZA BŁĘDÓW I POWTÓRKI */}
                <button
                  onClick={() => {
                    const errorTasks = tasks.filter(t => mistakesBank.includes(t.id));
                    if (errorTasks.length === 0) {
                      alert('Świetnie! Nie masz obecnie żadnych zadań w Bazie Błędów.');
                      return;
                    }
                    startMaraton(errorTasks, 0);
                  }}
                  className={`group text-left rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border p-4 sm:p-5 transition-all active:scale-[0.99] shadow-md flex flex-col justify-between cursor-pointer ${
                    mistakesBank.length > 0 ? 'hover:border-rose-500/50' : 'opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        mistakesBank.length > 0 ? 'bg-rose-500/10 border border-rose-500/25' : 'bg-white/5 border border-white/10'
                      }`}>
                        <RotateCcw className={mistakesBank.length > 0 ? 'text-rose-400' : 'text-text-muted'} size={18} />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                        mistakesBank.length > 0 ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' : 'text-text-muted bg-white/5 border-white/10'
                      }`}>
                        {mistakesBank.length} do powtórki
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-rose-400 transition-colors mb-1">
                      🔁 Baza Twoich Błędów
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                      Utrwal wiedzę na zadaniach, w których popełniłeś błąd. Skuteczna redukcja pułapek CKE.
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-rose-400 gap-1 mt-3 group-hover:translate-x-0.5 transition-transform">
                    <span>Przetrenuj błędy</span>
                    <ChevronRight size={13} />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              VIEW: FULL_EXAMS (FILAR 2: PEŁNE OFICJALNE ARKUSZE CKE)
             ========================================================================= */}
          {view === 'full_exams' && (
            <motion.div
              key="full_exams"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-5"
            >
              <div className="p-6 rounded-[28px] bg-surface-card border border-surface-border shadow-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Oryginalne Arkusze Egzaminacyjne
                  </span>
                  <span className="text-xs text-text-muted">• Formuła 2023 (Podstawa)</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Wybierz pełny arkusz CKE do rozwiązania
                </h2>
                <p className="text-text-secondary text-xs sm:text-sm mb-6">
                  Autentyczne zestawy maturalne z lat ubiegłych. Możesz pisać z oficjalnym zegarem 180 minut lub w trybie bezstresowym.
                </p>

                {/* Lista gotowych arkuszy rocznikowych */}
                <div className="space-y-3">
                  {[
                    {
                      name: 'Matura Maj 2024',
                      badge: 'Sesja Główna 2024',
                      desc: 'Oficjalny arkusz z maja 2024 r. Kompletny przekrój nowej formuły.',
                      filter: (t: MaturaTask) => (t.source || '').includes('Maj 2024')
                    },
                    {
                      name: 'Matura Czerwiec 2024',
                      badge: 'Termin Dodatkowy 2024',
                      desc: 'Oficjalny arkusz czerwcowy z dodatkowego terminu.',
                      filter: (t: MaturaTask) => (t.source || '').includes('Czerwiec 2024')
                    },
                    {
                      name: 'Oficjalny Arkusz Pokazowy CKE',
                      badge: 'Wzorcowy Arkusz CKE',
                      desc: 'Oryginalny arkusz demonstracyjny przygotowany przez ekspertów CKE.',
                      filter: (t: MaturaTask) => (t.source || '').toLowerCase().includes('pokazowy')
                    },
                    {
                      name: 'Informator Maturalny CKE (Zestaw)',
                      badge: 'Standard Egzaminacyjny',
                      desc: 'Zbiór zadań z oficjalnego Informatora CKE o egzaminie maturalnym.',
                      filter: (t: MaturaTask) => (t.source || '').toLowerCase().includes('informator')
                    }
                  ].map((sheet, sIdx) => {
                    const sheetTasks = tasks.filter(sheet.filter);
                    const count = sheetTasks.length;
                    const points = sheetTasks.reduce((sum, t) => sum + t.points, 0);

                    return (
                      <div
                        key={sIdx}
                        className="p-5 rounded-2xl bg-surface-bg border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/40 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              {sheet.badge}
                            </span>
                            <span className="text-xs font-bold text-white">
                              {count > 0 ? `${count} zadań` : '31 zadań'} • {points > 0 ? `${points} pkt` : '50 pkt'}
                            </span>
                          </div>
                          <h3 className="font-bold text-base text-white">{sheet.name}</h3>
                          <p className="text-xs text-text-secondary mt-0.5">{sheet.desc}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => startFullExam(sheet.name, sheetTasks.length ? sheetTasks : tasks.slice(0, 31), false)}
                            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition-colors"
                          >
                            Tryb bezstresowy
                          </button>

                          <button
                            onClick={() => startFullExam(sheet.name, sheetTasks.length ? sheetTasks : tasks.slice(0, 31), true)}
                            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs shadow-md transition-colors flex items-center gap-1.5"
                          >
                            <Clock size={13} />
                            <span>Zegar 180 min</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              VIEW: TOPICS_BANK (FILAR 3: 15 KAFELKÓW DZIAŁÓW CKE)
             ========================================================================= */}
          {view === 'topics_bank' && (
            <motion.div
              key="topics_bank"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-5"
            >
              <div className="p-6 rounded-[28px] bg-surface-card border border-surface-border shadow-xl">
                <h2 className="text-xl font-bold text-white mb-1">
                  Bank Zadań CKE według Działów
                </h2>
                <p className="text-text-secondary text-xs sm:text-sm mb-6">
                  Wybierz dział, aby zobaczyć autentyczne zadania CKE lub uruchomić ciągły trening z tego tematu.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {CANONICAL_TOPICS.map((topic, idx) => {
                    const topicAll = tasks.filter(t => t.section === topic);
                    const topicPassed = topicAll.filter(t => isTaskPassed(t.id)).length;
                    const pct = topicAll.length > 0 ? Math.round((topicPassed / topicAll.length) * 100) : 0;

                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-surface-bg border border-surface-border hover:border-[#FFB800]/40 transition-all flex flex-col justify-between group shadow-sm"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded border border-[#FFB800]/20">
                              Dział {idx + 1}
                            </span>
                            <span className="text-[10px] font-bold text-text-muted">
                              {topicPassed} / {topicAll.length} zaliczone
                            </span>
                          </div>

                          <h3 className="font-bold text-sm text-white mb-3 group-hover:text-[#FFB800] transition-colors line-clamp-1">
                            {topic.replace(/^Dział \d+:\s*/, '')}
                          </h3>

                          {/* Mini pasek postępu */}
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                            <div
                              className="h-full bg-[#FFB800] rounded-full transition-all duration-300"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-surface-border/50">
                          <button
                            onClick={() => {
                              setSelectedTopicName(topic);
                              setView('topic_detail');
                            }}
                            className="flex-1 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-text-secondary hover:text-white transition-colors text-center"
                          >
                            Zadania ({topicAll.length})
                          </button>

                          <button
                            onClick={() => startMaraton(topicAll, 0)}
                            className="px-3 py-1.5 rounded-xl bg-[#FFB800] text-black font-black text-xs hover:brightness-105 transition-colors"
                            title="Ćwicz ten dział ciągiem"
                          >
                            Ćwicz
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              VIEW: TOPIC_DETAIL (PRZEGLĄDARKA ZADAŃ W KONKRETNYM DZIALE)
             ========================================================================= */}
          {view === 'topic_detail' && (
            <motion.div
              key="topic_detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-5"
            >
              <div className="p-5 rounded-[26px] bg-surface-card border border-surface-border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded border border-[#FFB800]/20 mb-1 inline-block">
                    Katalog Zadań CKE
                  </span>
                  <h2 className="text-xl font-bold text-white">{selectedTopicName}</h2>
                  <p className="text-xs text-text-secondary">
                    {topicTasks.length} oficjalnych zadań CKE z tego działu.
                  </p>
                </div>

                <button
                  onClick={() => startMaraton(topicTasks, 0)}
                  className="px-5 py-3 rounded-2xl bg-[#FFB800] text-black font-black text-xs sm:text-sm shadow-md hover:brightness-105 flex items-center justify-center gap-2 shrink-0"
                >
                  <Play size={14} fill="black" />
                  <span>Rozpocznij drill z tego działu</span>
                </button>
              </div>

              {/* Lista zadań w dziale */}
              <div className="space-y-3">
                {topicTasks.map((t, idx) => {
                  const passed = isTaskPassed(t.id);
                  const failed = isTaskFailed(t.id);

                  return (
                    <div
                      key={t.id}
                      onClick={() => startMaraton(topicTasks, idx)}
                      className="p-4 rounded-2xl bg-surface-card border border-surface-border hover:border-[#FFB800]/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                    >
                      <div className="flex-1 overflow-hidden space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded">
                            {t.source || 'CKE'}
                          </span>
                          <span className="text-[10px] text-text-muted">
                            {t.points} pkt • {t.isClosed ? 'Zamknięte' : 'Otwarte'}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-text-primary line-clamp-2 math-render">
                          <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                            {t.content}
                          </Markdown>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {passed ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                            <CheckCircle2 size={13} />
                            <span>Zaliczone</span>
                          </span>
                        ) : failed ? (
                          <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                            <XCircle size={13} />
                            <span>Do powtórki</span>
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-text-muted bg-white/5 px-2.5 py-1 rounded-lg">
                            Do zrobienia
                          </span>
                        )}
                        <ChevronRight size={14} className="text-text-muted" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              VIEW: EXAM_SETUP (KONFIGURATOR MINI MATURY)
             ========================================================================= */}
          {view === 'exam_setup' && (
            <motion.div
              key="exam_setup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col gap-6"
            >
              <div className="p-6 rounded-[28px] bg-surface-card border border-surface-border shadow-xl">
                <h2 className="text-lg font-bold text-white mb-1">Skonfiguruj swój arkusz Mini Matury</h2>
                <p className="text-text-secondary text-xs sm:text-sm mb-6">
                  Wybierz zakres tematyczny i długość sesji. Zadania zostaną dobrane z oficjalnej bazy CKE.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-2">
                      Zakres tematyczny arkusza
                    </label>
                    <select
                      value={setupSection}
                      onChange={e => setSetupSection(e.target.value)}
                      className="w-full bg-surface-bg border border-surface-border rounded-xl px-4 py-3 text-white text-sm focus:border-[#FFB800] outline-none"
                    >
                      <option value="Wszystkie działy">Wszystkie działy (Przekrój Maturalny)</option>
                      {CANONICAL_TOPICS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-2">
                      Długość arkusza
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSetupLength(7)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          setupLength === 7
                            ? 'bg-[#FFB800]/10 border-[#FFB800] text-white shadow-[0_0_15px_rgba(255,184,0,0.15)]'
                            : 'bg-surface-bg border-surface-border text-text-muted hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                          <span className="font-bold text-sm">Ekspresowy</span>
                          <span className="text-[10px] font-black uppercase text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/20 px-1.5 py-0.5 rounded w-fit">20 MIN</span>
                        </div>
                        <p className="text-xs text-text-secondary">7 zadań • Przekrój CKE</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSetupLength(12)}
                        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
                          setupLength === 12
                            ? 'bg-[#FFB800]/10 border-[#FFB800] text-white shadow-[0_0_15px_rgba(255,184,0,0.15)]'
                            : 'bg-surface-bg border-surface-border text-text-muted hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1.5">
                          <span className="font-bold text-sm">Standardowy</span>
                          <span className="text-[10px] font-black uppercase text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/20 px-1.5 py-0.5 rounded w-fit">35 MIN</span>
                        </div>
                        <p className="text-xs text-text-secondary">12 zadań • 1/2 arkusza</p>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => startMiniExam(setupSection, setupLength)}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-[#FFB800] text-black font-black text-sm tracking-wide shadow-lg hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Play size={16} fill="black" />
                    <span>Rozpocznij arkusz</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              VIEW: EXAM (RUNNER ARKUSZA Z ZEGAREM)
             ========================================================================= */}
          {view === 'exam' && examTasks.length > 0 && (
            <motion.div
              key="exam"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-card border border-surface-border shadow-md">
                <div className="flex items-center gap-2">
                  {isExamTimed && (
                    <>
                      <button
                        onClick={() => setIsExamPaused(!isExamPaused)}
                        className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
                          isExamPaused
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        {isExamPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} />}
                        <span>{isExamPaused ? 'Wznów' : 'Pauza'}</span>
                      </button>

                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
                        examTimeLeft < 300
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
                          : 'bg-surface-bg border-surface-border text-white'
                      }`}>
                        <Clock size={15} />
                        <span>{formatTimer(examTimeLeft)}</span>
                      </div>
                    </>
                  )}
                  {!isExamTimed && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                      Tryb bezstresowy (bez limitu czasu)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFlag(examTasks[examCurrentIndex].id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                      flaggedTasks.has(examTasks[examCurrentIndex].id)
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-white/5 border-white/10 text-text-muted hover:text-white'
                    }`}
                  >
                    <Flag size={14} fill={flaggedTasks.has(examTasks[examCurrentIndex].id) ? 'currentColor' : 'none'} />
                    <span className="hidden sm:inline">Oflaguj</span>
                  </button>

                  <button
                    onClick={() => {
                      const unanswered = examTasks.filter(t => !examAnswers[t.id] && examOpenScores[t.id] === undefined).length;
                      if (unanswered > 0) {
                        if (confirm(`Masz jeszcze ${unanswered} nieodpowiedzianych pytań. Czy na pewno chcesz oddać arkusz?`)) {
                          handleFinishExam();
                        }
                      } else {
                        handleFinishExam();
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition-all"
                  >
                    Oddaj arkusz
                  </button>
                </div>
              </div>

              {/* Pasek numerów zadań */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 -mx-1">
                {examTasks.map((t, idx) => {
                  const isCurrent = idx === examCurrentIndex;
                  const isAnswered = examAnswers[t.id] !== undefined || examOpenScores[t.id] !== undefined;
                  const isFlagged = flaggedTasks.has(t.id);

                  return (
                    <button
                      key={t.id}
                      onClick={() => setExamCurrentIndex(idx)}
                      className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition-all relative ${
                        isCurrent
                          ? 'bg-[#FFB800] text-black shadow-[0_0_12px_rgba(255,184,0,0.5)] font-black scale-105'
                          : isAnswered
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                          : 'bg-surface-card border border-surface-border text-text-muted hover:text-white'
                      }`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Karta pytania */}
              {isExamPaused ? (
                <div className="p-12 rounded-[28px] bg-surface-card border border-surface-border text-center flex flex-col items-center justify-center my-6">
                  <Pause size={48} className="text-amber-400 mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold text-white mb-2">Arkusz zapauzowany</h3>
                  <button
                    onClick={() => setIsExamPaused(false)}
                    className="px-6 py-3 rounded-2xl bg-[#FFB800] text-black font-black text-sm shadow-lg hover:brightness-105"
                  >
                    Wznów arkusz
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-[28px] bg-surface-card border border-surface-border shadow-xl space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-surface-border pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-text-secondary text-xs font-bold">
                        Zadanie {examCurrentIndex + 1}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/20 text-[#FFB800] text-xs font-bold">
                        {examTasks[examCurrentIndex].points} {examTasks[examCurrentIndex].points === 1 ? 'punkt' : 'punkty'}
                      </span>
                      {examTasks[examCurrentIndex].source && (
                        <span className="text-text-muted text-xs hidden sm:inline">
                          • {examTasks[examCurrentIndex].source}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-text-muted">
                      {examTasks[examCurrentIndex].section}
                    </span>
                  </div>

                  {renderMathContent(examTasks[examCurrentIndex].content)}

                  {examTasks[examCurrentIndex].isClosed && examTasks[examCurrentIndex].options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {examTasks[examCurrentIndex].options.map((opt, optIdx) => {
                        const optLetter = String.fromCharCode(65 + optIdx);
                        const isSelected = examAnswers[examTasks[examCurrentIndex].id] === optLetter;

                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              const currId = examTasks[examCurrentIndex].id;
                              setExamAnswers(prev => ({ ...prev, [currId]: optLetter }));
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                              isSelected
                                ? 'bg-[#FFB800]/15 border-[#FFB800] shadow-[0_0_15px_rgba(255,184,0,0.15)] text-white'
                                : 'bg-surface-bg border-surface-border text-text-secondary hover:border-white/20 hover:text-white'
                            }`}
                          >
                            <span className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-[#FFB800] text-black'
                                : 'bg-white/5 text-text-muted border border-white/10'
                            }`}>
                              {optLetter}
                            </span>
                            <div className="flex-1 overflow-x-auto text-sm leading-relaxed pt-0.5">
                              <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                {opt}
                              </Markdown>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {!examTasks[examCurrentIndex].isClosed && (
                    <div className="p-4 rounded-2xl bg-surface-bg border border-surface-border space-y-3">
                      <div className="text-xs font-bold text-text-muted uppercase">Zadanie otwarte</div>
                      <p className="text-xs text-text-secondary">
                        Rozwiąż to zadanie w brudnopisie lub na kartce. Po oddaniu arkusza porównasz swoje kroki z oficjalnym kluczem CKE.
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-xs text-text-muted">Twoja wstępna ocena:</span>
                        {Array.from({ length: examTasks[examCurrentIndex].points + 1 }).map((_, pt) => {
                          const currId = examTasks[examCurrentIndex].id;
                          const isSel = examOpenScores[currId] === pt;
                          return (
                            <button
                              key={pt}
                              onClick={() => setExamOpenScores(prev => ({ ...prev, [currId]: pt }))}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                isSel
                                  ? 'bg-[#FFB800] text-black border-[#FFB800]'
                                  : 'bg-white/5 border-white/10 text-text-muted hover:text-white'
                              }`}
                            >
                              {pt} pkt
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-surface-border">
                    <button
                      disabled={examCurrentIndex === 0}
                      onClick={() => setExamCurrentIndex(prev => Math.max(0, prev - 1))}
                      className="px-4 py-2.5 rounded-xl border border-surface-border text-xs font-bold text-text-muted hover:text-white disabled:opacity-40 flex items-center gap-1.5"
                    >
                      <ChevronLeft size={16} />
                      <span>Poprzednie</span>
                    </button>

                    <button
                      disabled={examCurrentIndex === examTasks.length - 1}
                      onClick={() => setExamCurrentIndex(prev => Math.min(examTasks.length - 1, prev + 1))}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white disabled:opacity-40 flex items-center gap-1.5"
                    >
                      <span>Następne</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* =========================================================================
              VIEW: EXAM_REVIEW (PODSUMOWANIE ODDANEGO ARKUSZA)
             ========================================================================= */}
          {view === 'exam_review' && (
            <MaturaExamReview
              tasks={examReviewItems}
              timeSpentSeconds={examTimeSpent}
              onRetryMistakes={mistakeItems => {
                const mistakeTasks = tasks.filter(t => mistakeItems.some(m => m.id === t.id));
                if (mistakeTasks.length > 0) {
                  startMaraton(mistakeTasks, 0);
                }
              }}
              onBackToMenu={() => setView('hub')}
              xpAwarded={earnedReward?.xp}
              coinsAwarded={earnedReward?.coins}
            />
          )}

          {/* =========================================================================
              VIEW: MARATON / POJEDYNCZE ZADANIE CKE
             ========================================================================= */}
          {view === 'maraton' && currentMaratonTask && (
            <motion.div
              key="maraton"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-card border border-surface-border">
                <span className="text-xs font-bold text-text-muted">
                  Zadanie {maratonIndex + 1} z {maratonList.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    disabled={maratonIndex === 0}
                    onClick={() => {
                      setMaratonIndex(prev => prev - 1);
                      setMaratonSelectedAnswer(null);
                      setMaratonSubmitted(false);
                      setMaratonSelfScore(null);
                    }}
                    className="p-1.5 rounded-lg border border-surface-border text-text-muted hover:text-white disabled:opacity-30"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    disabled={maratonIndex >= maratonList.length - 1}
                    onClick={handleNextMaratonTask}
                    className="p-1.5 rounded-lg border border-surface-border text-text-muted hover:text-white disabled:opacity-30"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-[28px] bg-surface-card border border-surface-border shadow-xl space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-surface-border pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] text-xs font-bold">
                      {currentMaratonTask.source || 'Oficjalne CKE'}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold">
                      {currentMaratonTask.points} {currentMaratonTask.points === 1 ? 'punkt' : 'punkty'}
                    </span>
                  </div>
                  <span className="text-xs text-text-muted">{currentMaratonTask.section}</span>
                </div>

                {renderMathContent(currentMaratonTask.content)}

                {currentMaratonTask.isClosed && currentMaratonTask.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentMaratonTask.options.map((opt, optIdx) => {
                      const optLetter = String.fromCharCode(65 + optIdx);
                      const isSelected = maratonSelectedAnswer === optLetter;
                      const isCorrectAnswer = currentMaratonTask.correctAnswer.trim().toUpperCase() === optLetter;

                      let btnStyle = 'bg-surface-bg border-surface-border text-text-secondary hover:border-white/20 hover:text-white';
                      if (maratonSubmitted) {
                        if (isCorrectAnswer) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                        } else if (isSelected && !isCorrectAnswer) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-[#FFB800]/15 border-[#FFB800] text-white';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={maratonSubmitted}
                          onClick={() => handleMaratonAnswer(optLetter)}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${btnStyle}`}
                        >
                          <span className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                            maratonSubmitted && isCorrectAnswer
                              ? 'bg-emerald-500 text-black'
                              : maratonSubmitted && isSelected && !isCorrectAnswer
                              ? 'bg-rose-500 text-white'
                              : isSelected
                              ? 'bg-[#FFB800] text-black'
                              : 'bg-white/5 text-text-muted border border-white/10'
                          }`}>
                            {optLetter}
                          </span>
                          <div className="flex-1 overflow-x-auto text-sm leading-relaxed pt-0.5">
                            <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                              {opt}
                            </Markdown>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {!currentMaratonTask.isClosed && !maratonSubmitted && (
                  <div className="p-4 rounded-2xl bg-surface-bg border border-surface-border space-y-3">
                    <div className="text-xs font-bold text-text-muted uppercase">Zadanie otwarte</div>
                    <p className="text-xs text-text-secondary">
                      Rozwiąż zadanie w brudnopisie lub na kartce, a następnie oceń swoje rozwiązanie według oficjalnego klucza punktacji CKE:
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      {Array.from({ length: currentMaratonTask.points + 1 }).map((_, pt) => (
                        <button
                          key={pt}
                          onClick={() => handleMaratonSelfScore(pt)}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-white hover:bg-[#FFB800] hover:text-black transition-colors"
                        >
                          {pt} pkt
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {maratonSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-surface-bg border border-surface-border space-y-4"
                  >
                    <div className="flex items-center gap-2.5">
                      {(maratonSelectedAnswer && currentMaratonTask.correctAnswer.trim().toUpperCase() === maratonSelectedAnswer.trim().toUpperCase()) ||
                       (maratonSelfScore !== null && maratonSelfScore >= currentMaratonTask.points) ? (
                        <>
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <Check size={18} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-emerald-400">Świetnie! Poprawna odpowiedź</div>
                            <div className="text-xs text-text-muted">+15 XP • Zadanie zaliczone w CKE</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                            <X size={18} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-rose-400">Błędna odpowiedź</div>
                            <div className="text-xs text-text-muted">Poprawna odpowiedź: {currentMaratonTask.correctAnswer}. Zadanie dodano do Bazy Błędów.</div>
                          </div>
                        </>
                      )}
                    </div>

                    {currentMaratonTask.ckeTrap && (
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                        <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={16} />
                        <div>
                          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-0.5">
                            Pułapka Egzaminacyjna CKE
                          </div>
                          <div className="text-xs text-text-secondary leading-relaxed">
                            {currentMaratonTask.ckeTrap}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="text-xs font-bold text-text-muted uppercase mb-1">
                        Oficjalne rozwiązanie CKE:
                      </div>
                      <div className="text-xs text-text-secondary leading-relaxed math-render">
                        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                          {currentMaratonTask.explanation}
                        </Markdown>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        onClick={handleNextMaratonTask}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#FFB800] text-black font-black text-xs shadow-md hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-1.5"
                      >
                        <span>Następne zadanie CKE</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* MODAL BRUDNOPISU */}
      <ScratchpadModal
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* MODAL KARTY WZORÓW CKE */}
      <CkeFormulasModal
        isOpen={isFormulasOpen}
        onClose={() => setIsFormulasOpen(false)}
      />
    </div>
  );
}
