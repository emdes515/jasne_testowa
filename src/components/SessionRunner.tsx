import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Trophy, 
  Flame, 
  Coins, 
  Zap,
  RefreshCw, 
  RotateCcw, 
  Check, 
  Info,
  Clock,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { playSuccessSound, playErrorSound, triggerHaptic } from '../utils';
import { MathRenderer } from './MathRenderer';
import { Badge } from './Badge';
import { UserState, LessonTheoryPill } from '../types';
import { LessonFormulaSheet, drawSessionTasks, getLessonTheoryPill, getLessonTaskPool } from '../data/dzial1TaskPool';
import { addMistakeToBank, removeMistakeFromBank } from '../utils/mistakesBank';
import { OpenTaskWorkspace } from './OpenTaskWorkspace';

/**
 * Helper to render micro-article text containing markdown bold (**bold**) and LaTeX ($...$)
 */
function renderMicroContent(rawText?: string | any) {
  if (!rawText) return null;
  let textToParse = '';
  if (typeof rawText === 'string') {
    textToParse = rawText;
  } else if (Array.isArray(rawText)) {
    textToParse = rawText.map(item => String(item ?? '')).join('\n\n');
  } else if (typeof rawText === 'object') {
    if ('description' in rawText && typeof rawText.description === 'string') {
      textToParse = rawText.description;
    } else if ('text' in rawText && typeof rawText.text === 'string') {
      textToParse = rawText.text;
    } else {
      try {
        textToParse = JSON.stringify(rawText);
      } catch {
        textToParse = String(rawText);
      }
    }
  } else {
    textToParse = String(rawText);
  }

  if (!textToParse || !textToParse.trim()) return null;

  const parts = textToParse.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return (
            <strong key={index} className="font-bold text-white">
              <MathRenderer content={boldText} />
            </strong>
          );
        }
        return <MathRenderer key={index} content={part} />;
      })}
    </>
  );
}

/**
 * Helper to normalize worked examples whether they come as strings, objects or arrays
 */
interface NormalizedWorkedExample {
  problem: string;
  steps: { num: number | string; label?: string; text: string }[];
  result?: string;
}

function normalizeWorkedExample(raw: any): NormalizedWorkedExample | null {
  if (!raw) return null;

  if (typeof raw === 'object') {
    const steps: { num: number | string; label?: string; text: string }[] = [];
    if (raw.step1) steps.push({ num: 1, text: typeof raw.step1 === 'string' ? raw.step1 : (raw.step1.explanation || raw.step1.text || String(raw.step1)) });
    if (raw.step2) steps.push({ num: 2, text: typeof raw.step2 === 'string' ? raw.step2 : (raw.step2.explanation || raw.step2.text || String(raw.step2)) });
    if (Array.isArray(raw.steps)) {
      raw.steps.forEach((s: any, idx: number) => {
        const text = typeof s === 'string' ? s : (s.explanation || s.text || s.step || String(s));
        steps.push({ num: s.step_num || idx + 1, text });
      });
    }
    return {
      problem: raw.problem || raw.question || raw.task || raw.text || '',
      steps,
      result: raw.result || raw.answer || raw.odpowiedz
    };
  }

  if (typeof raw === 'string') {
    const text = raw.trim();
    if (!text) return null;

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    let problem = '';
    const steps: { num: number | string; label?: string; text: string }[] = [];
    let result: string | undefined = undefined;
    let stepCounter = 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lower = line.toLowerCase();

      if (lower.startsWith('odpowiedź:') || lower.startsWith('odpowiedz:') || lower.startsWith('odp:')) {
        result = line.replace(/^(?:odpowiedź|odpowiedz|odp):\s*/i, '').trim();
      } else if (lower.startsWith('krok ') || lower.startsWith('krok:')) {
        const match = line.match(/^krok\s*(\d+)?:?\s*(.*)$/i);
        const num = match?.[1] ? parseInt(match[1], 10) : stepCounter++;
        const content = match?.[2] || line;
        steps.push({ num, text: content });
      } else if (lower.startsWith('rozwiązanie:') || lower.startsWith('rozwiazanie:')) {
        const content = line.replace(/^(?:rozwiązanie|rozwiazanie):\s*/i, '').trim();
        steps.push({ num: stepCounter++, label: 'Rozwiązanie', text: content });
      } else {
        if (steps.length === 0 && !result) {
          problem = problem ? `${problem}\n${line}` : line;
        } else {
          steps.push({ num: stepCounter++, text: line });
        }
      }
    }

    if (!problem && steps.length > 0) {
      problem = steps.shift()!.text;
    }

    return {
      problem: problem || text,
      steps,
      result
    };
  }

  return null;
}

/**
 * Helper to extract array of formulas safely
 */
function getCoreFormulas(raw: any): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map(item => String(item ?? '').trim()).filter(Boolean);
  }
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith('\\begin{aligned}') && trimmed.endsWith('\\end{aligned}')) {
      return [trimmed];
    }
    if (trimmed.includes('\n')) {
      return trimmed.split('\n').map(l => l.trim()).filter(Boolean);
    }
    return [trimmed];
  }
  return [String(raw)];
}

export interface SessionRunnerProps {
  sessionData: {
    lessonId: string;
    lessonTitle: string;
    tasks: any[];
    formulaSheet?: LessonFormulaSheet | null;
    theoryPill?: LessonTheoryPill | null;
    nextLesson?: any;
    allTaskIdsToMarkCompleted?: string[];
    required_correct_tasks?: number;
    estimated_time_formatted?: string;
  };
  userState?: UserState;
  onCompleteSession: (
    taskIds?: string | string[],
    stars?: number,
    earnedXp?: number,
    earnedCoins?: number,
    nextLesson?: any,
    sessionDurationSeconds?: number,
    mistakesCount?: number
  ) => void;
  onCancelSession: () => void;
}

export const SessionRunner: React.FC<SessionRunnerProps> = ({
  sessionData,
  userState,
  onCompleteSession,
  onCancelSession
}) => {
  const {
    lessonId = '1.1',
    lessonTitle = 'Lekcja 1.1',
    tasks = [],
    formulaSheet,
    nextLesson,
    allTaskIdsToMarkCompleted = []
  } = sessionData;

  // Dynamiczny wymóg zaliczenia zadań – odczytywany z obiektu lekcji
  const targetCorrectAnswers = sessionData.required_correct_tasks || (sessionData as any).tasksRequired || 4;
  const [sessionMistakesCount, setSessionMistakesCount] = useState<number>(0);

  const [taskQueue, setTaskQueue] = useState<any[]>(() => {
    if (tasks && tasks.length >= targetCorrectAnswers) return [...tasks];
    const pool = getLessonTaskPool(lessonId);
    if (pool.length > 0) {
      const drawn = drawSessionTasks(lessonId);
      return drawn.sessionTasks.length > 0 ? drawn.sessionTasks : [...tasks];
    }
    return [...tasks];
  });
  const [currentQueueIndex, setCurrentQueueIndex] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: Pigułka wiedzy, 1: Zadania
  const [theorySubStep, setTheorySubStep] = useState<number>(0); // 0: Istota i Strategia, 1: Wzory, 2: Przykład i Pułapka
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Active Time Tracking Engine: Tracks active study time with 120s inactivity & visibility auto-pause
  const [activeSeconds, setActiveSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const lastActivityRef = React.useRef<number>(Date.now());

  // Theory Pill resolution: provided in payload or fetched from lesson curriculum
  const theoryPill: LessonTheoryPill = useMemo(() => {
    if (sessionData.theoryPill) return sessionData.theoryPill;
    return getLessonTheoryPill(lessonId);
  }, [sessionData.theoryPill, lessonId]);

  // AI Tutor for Open Tasks
  const [openAnswerText, setOpenAnswerText] = useState<string>('');
  const [openCanvasDataUrl, setOpenCanvasDataUrl] = useState<string>('');
  const [isTutorScanning, setIsTutorScanning] = useState<boolean>(false);
  const [tutorEvaluation, setTutorEvaluation] = useState<any | null>(null);
  const [showModelSolution, setShowModelSolution] = useState<boolean>(false);

  // Statistics: postęp mierzony liczbą poprawnych odpowiedzi (wymóg: 4)
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [earnedXp, setEarnedXp] = useState<number>(0);
  const [earnedCoins, setEarnedCoins] = useState<number>(0);

  // Modals & Drawers
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showFormulaSheet, setShowFormulaSheet] = useState<boolean>(false);
  const [isSessionComplete, setIsSessionComplete] = useState<boolean>(false);

  // Scroll Container Ref do resetowania pozycji przewijania przy każdym nowym kroku
  const taskAreaRef = React.useRef<HTMLElement>(null);

  const isTheoryStep = currentStep === 0;
  const currentTask = taskQueue[currentQueueIndex] || taskQueue[0] || tasks[0];

  // Task format classification
  const isNumericTask = currentTask?.type === 'NUMERIC_INPUT';
  const isTrueFalseTask = currentTask?.type === 'TRUE_FALSE';
  const isTwoPartTask = currentTask?.type === 'TWO_PART';
  const isOpenTask = (currentTask?.type === 'OPEN_PROOF' || currentTask?.type === 'OPEN_TASK') && !isNumericTask && !isTrueFalseTask && !isTwoPartTask;
  const isSingleChoice = !isOpenTask && !isNumericTask && !isTrueFalseTask && !isTwoPartTask;

  // New task format interaction states
  const [numericInput, setNumericInput] = useState<string>('');
  const [tfSelections, setTfSelections] = useState<Record<string, 'P' | 'F'>>({});
  const [twoPart1, setTwoPart1] = useState<string | null>(null);
  const [twoPart2, setTwoPart2] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Validation if user can click check answer
  const isReadyToCheck = useMemo(() => {
    if (isEvaluated) return false;
    if (isSingleChoice) return selectedOption !== null;
    if (isNumericTask) return numericInput.trim().length > 0;
    if (isTrueFalseTask) {
      const statements = currentTask?.statements || [];
      if (statements.length > 1) {
        return Object.keys(tfSelections).length === statements.length;
      }
      return selectedOption === 'P' || selectedOption === 'F' || tfSelections['single'] !== undefined;
    }
    if (isTwoPartTask) return Boolean(twoPart1 && twoPart2);
    if (isOpenTask) return (openAnswerText.trim().length > 0 || openCanvasDataUrl.length > 50) && !isTutorScanning;
    return false;
  }, [isEvaluated, isSingleChoice, selectedOption, isNumericTask, numericInput, isTrueFalseTask, tfSelections, isTwoPartTask, twoPart1, twoPart2, isOpenTask, openAnswerText, openCanvasDataUrl, isTutorScanning, currentTask]);

  // Reset pozycji przewijania do samej góry przy przejściu do nowego kroku lub podkarty teorii
  useEffect(() => {
    if (taskAreaRef.current) {
      taskAreaRef.current.scrollTop = 0;
    }
  }, [currentStep, theorySubStep, currentQueueIndex]);

  // Active Time Tracking Listener
  useEffect(() => {
    const markActive = () => {
      lastActivityRef.current = Date.now();
      if (isPaused && document.visibilityState === 'visible') {
        setIsPaused(false);
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        setIsPaused(true);
      } else {
        lastActivityRef.current = Date.now();
        setIsPaused(false);
      }
    };

    window.addEventListener('mousemove', markActive, { passive: true });
    window.addEventListener('mousedown', markActive, { passive: true });
    window.addEventListener('keydown', markActive, { passive: true });
    window.addEventListener('touchstart', markActive, { passive: true });
    window.addEventListener('scroll', markActive, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    const timer = setInterval(() => {
      if (isSessionComplete) return;

      const idleDuration = Date.now() - lastActivityRef.current;
      const isHidden = document.visibilityState === 'hidden';

      if (idleDuration > 120000 || isHidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
        setActiveSeconds(prev => prev + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', markActive);
      window.removeEventListener('mousedown', markActive);
      window.removeEventListener('keydown', markActive);
      window.removeEventListener('touchstart', markActive);
      window.removeEventListener('scroll', markActive);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isSessionComplete, isPaused]);

  // Humanizacja prezentacji czasu: np. 36 sek lub 1 min 45 s
  const formattedHumanTime = useMemo(() => {
    const m = Math.floor(activeSeconds / 60);
    const s = activeSeconds % 60;
    if (m === 0) {
      return `${s} sek`;
    }
    if (s === 0) {
      return `${m} min`;
    }
    return `${m} min ${s} s`;
  }, [activeSeconds]);

  const formatSourceTag = (source?: string, points?: number, isOpen?: boolean) => {
    const pts = points || (isOpen ? 2 : 1);
    if (!source) return `Zadanie maturalne • ${pts} pkt`;
    let clean = source.replace(/CKE/gi, 'Zadanie').replace(/Zadanie\s*Zadanie/gi, 'Zadanie').trim();
    if (clean.toLowerCase().includes('pkt')) return clean;
    return `${clean} • ${pts} pkt`;
  };

  const correctAnswerLabel = useMemo(() => {
    if (isSingleChoice) {
      return currentTask?.correct_answer || currentTask?.correctAnswer || 'A';
    }
    if (isNumericTask) {
      return String(currentTask?.correctAnswer || currentTask?.correct_answer || currentTask?.numeric_correct_answer || '');
    }
    if (isTrueFalseTask) {
      const statements = currentTask?.statements || [];
      if (statements.length > 1) {
        return statements.map((s: any, idx: number) => `${idx + 1}:${s.correct}`).join(', ');
      }
      const rawTarget = String(currentTask?.correct_answer || currentTask?.correctAnswer || currentTask?.statements?.[0]?.correct || 'P').trim().toUpperCase();
      const normTarget = (rawTarget.startsWith('P') || rawTarget.startsWith('T') || rawTarget === 'TRUE') ? 'P (Prawda)' : 'F (Fałsz)';
      return normTarget;
    }
    if (isTwoPartTask) {
      return String(currentTask?.correctAnswer || currentTask?.correct_answer || '');
    }
    return '';
  }, [currentTask, isSingleChoice, isNumericTask, isTrueFalseTask, isTwoPartTask]);

  // Reset state on step / question change
  useEffect(() => {
    setSelectedOption(null);
    setNumericInput('');
    setTfSelections({});
    setTwoPart1(null);
    setTwoPart2(null);
    setShowExplanation(false);
    setOpenAnswerText('');
    setOpenCanvasDataUrl('');
    setIsTutorScanning(false);
    setTutorEvaluation(null);
    setShowModelSolution(false);
    setIsEvaluated(false);
    setIsCorrect(null);
    if (currentStep === 0) {
      setTheorySubStep(0);
    }
  }, [currentStep, currentQueueIndex]);

  // Reset entire session state when lessonId changes (e.g. proceeding to next lesson)
  useEffect(() => {
    setCurrentStep(0);
    setTheorySubStep(0);
    setActiveSeconds(0);
    setIsPaused(false);
    setSelectedOption(null);
    setNumericInput('');
    setTfSelections({});
    setTwoPart1(null);
    setTwoPart2(null);
    setShowExplanation(false);
    setOpenAnswerText('');
    setIsTutorScanning(false);
    setTutorEvaluation(null);
    setShowModelSolution(false);
    setIsEvaluated(false);
    setIsCorrect(null);
    setCorrectAnswersCount(0);
    setEarnedXp(0);
    setEarnedCoins(0);
    setShowExitModal(false);
    setShowFormulaSheet(false);
    setIsSessionComplete(false);
  }, [lessonId]);

  // Dynamically resolve next lesson in chain (e.g. 1.1 -> 1.2 -> ... -> 1.7)
  const resolvedNextLesson = useMemo(() => {
    if (nextLesson && nextLesson.isSession && nextLesson.tasks && nextLesson.tasks.length > 0) {
      return nextLesson;
    }

    // Try auto-resolving next lesson in Dział 1: Liczby Rzeczywiste
    const match = String(lessonId).match(/^(?:lesson-)?(\d+)\.(\d+)$/);
    if (match) {
      const topicNum = parseInt(match[1], 10);
      const lessonNum = parseInt(match[2], 10);
      if (topicNum === 1 && lessonNum < 7) {
        const nextId = `1.${lessonNum + 1}`;
        const poolResult = drawSessionTasks(nextId);
        if (poolResult.sessionTasks && poolResult.sessionTasks.length > 0) {
          const titles: Record<string, string> = {
            '1.1': 'Lekcja 1.1: Potęgi i wykładniki',
            '1.2': 'Lekcja 1.2: Pierwiastki i działania',
            '1.3': 'Lekcja 1.3: Logarytmy i ich własności',
            '1.4': 'Lekcja 1.4: Procenty i punkty procentowe',
            '1.5': 'Lekcja 1.5: Wartość bezwzględna i oś liczbowa',
            '1.6': 'Lekcja 1.6: Błąd bezwzględny, względny i szacowanie',
            '1.7': 'Lekcja 1.7: Wielki Sprawdzian Działu 1'
          };
          return {
            isSession: true,
            lessonId: nextId,
            lessonTitle: titles[nextId] || `Lekcja ${nextId}`,
            tasks: poolResult.sessionTasks,
            formulaSheet: poolResult.formulaSheet,
            allTaskIdsToMarkCompleted: poolResult.sessionTasks.map((t: any) => t.id),
            nextLesson: lessonNum + 1 < 7 ? {
              isSession: true,
              lessonId: `1.${lessonNum + 2}`
            } : null
          };
        }
      }
    }

    // Fallback: if nextLesson provided with tasks
    if (nextLesson) {
      return {
        isSession: true,
        lessonId: nextLesson.lessonId || nextLesson.id || 'next',
        lessonTitle: nextLesson.lessonTitle || nextLesson.title || 'Kolejna Lekcja',
        tasks: nextLesson.tasks || nextLesson.lessonTasks || nextLesson.allTasks || (nextLesson.firstTask ? [nextLesson.firstTask] : []),
        formulaSheet: nextLesson.formulaSheet || null,
        nextLesson: nextLesson.nextLesson || null
      };
    }

    return null;
  }, [lessonId, nextLesson]);

  // Keyboard navigation for desktop: 1-4 / A-D to select, Enter/Space to check or proceed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showExitModal || isSessionComplete) return;

      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          if (!isEvaluated && !isTutorScanning && openAnswerText.trim()) {
            handleCheckOpenAnswerWithTutor();
          }
        }
        return;
      }

      const key = e.key.toUpperCase();
      const code = e.code;

      // Handle Theory Sub-step Navigation with Arrow Keys
      if (isTheoryStep) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setTheorySubStep(prev => Math.max(0, prev - 1));
          return;
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setTheorySubStep(prev => Math.min(3, prev + 1));
          return;
        }
      }

      // Handle True/False Selection (P / 1 or F / 2)
      if (!isEvaluated && isTrueFalseTask && (!currentTask?.statements || currentTask.statements.length <= 1)) {
        if (key === 'P' || key === '1' || key === 'T') {
          e.preventDefault();
          handleSelectOption('P');
          setTfSelections({ single: 'P' });
          return;
        }
        if (key === 'F' || key === '2') {
          e.preventDefault();
          handleSelectOption('F');
          setTfSelections({ single: 'F' });
          return;
        }
      }

      // Handle Option Selection (1, 2, 3, 4 or A, B, C, D)
      if (!isEvaluated && currentTask?.options && !isOpenTask && !isTrueFalseTask) {
        let chosenOptionId: string | null = null;
        if (key === '1' || key === 'A') {
          chosenOptionId = currentTask.options[0]?.id || 'A';
        } else if (key === '2' || key === 'B') {
          chosenOptionId = currentTask.options[1]?.id || 'B';
        } else if (key === '3' || key === 'C') {
          chosenOptionId = currentTask.options[2]?.id || 'C';
        } else if (key === '4' || key === 'D') {
          chosenOptionId = currentTask.options[3]?.id || 'D';
        }

        if (chosenOptionId) {
          e.preventDefault();
          handleSelectOption(chosenOptionId);
          return;
        }
      }

      // Handle Check or Next Step (Enter or Space)
      if (key === 'ENTER' || code === 'Space') {
        e.preventDefault();
        if (isTheoryStep) {
          triggerHaptic('medium');
          if (theorySubStep < 3) {
            setTheorySubStep(prev => prev + 1);
          } else {
            playSuccessSound();
            setCurrentStep(1);
          }
          return;
        }
        if (!isEvaluated) {
          if (isOpenTask) {
            if (openAnswerText.trim() && !isTutorScanning) {
              handleCheckOpenAnswerWithTutor();
            }
          } else if (isReadyToCheck) {
            handleCheckAnswer();
          }
        } else if (isEvaluated) {
          handleNextStep();
        }
        return;
      }

      // Handle Formula Sheet Toggle (F or W)
      if (key === 'F' || key === 'W') {
        e.preventDefault();
        setShowFormulaSheet(prev => !prev);
        return;
      }

      // Handle Escape (Exit modal)
      if (key === 'ESCAPE') {
        e.preventDefault();
        if (showFormulaSheet) {
          setShowFormulaSheet(false);
        } else {
          setShowExitModal(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEvaluated, selectedOption, isReadyToCheck, openAnswerText, isTutorScanning, isOpenTask, currentTask, showExitModal, isSessionComplete, showFormulaSheet]);

  // Handle option click
  const handleSelectOption = (optionId: string) => {
    if (isEvaluated) return;
    triggerHaptic('light');
    setSelectedOption(optionId);
  };

  // Check answer for standard multiple-choice and new task types
  const handleCheckAnswer = () => {
    if (isEvaluated) return;

    let correct = false;

    if (isSingleChoice) {
      if (!selectedOption) return;
      const target = currentTask?.correct_answer || currentTask?.correctAnswer || 'A';
      correct = selectedOption === target;
    } else if (isNumericTask) {
      if (!numericInput.trim()) return;
      const userClean = numericInput.trim().replace(',', '.');
      const targetClean = String(currentTask?.correctAnswer || currentTask?.correct_answer || currentTask?.numeric_correct_answer || '').trim().replace(',', '.');
      if (userClean === targetClean) {
        correct = true;
      } else {
        const userNum = parseFloat(userClean);
        const targetNum = parseFloat(targetClean);
        if (!isNaN(userNum) && !isNaN(targetNum) && Math.abs(userNum - targetNum) < 1e-6) {
          correct = true;
        }
      }
    } else if (isTrueFalseTask) {
      const statements = currentTask?.statements || [];
      if (statements.length > 1) {
        const allCorrect = statements.every(stmt => tfSelections[stmt.id] === stmt.correct);
        correct = allCorrect;
      } else {
        const userChoice = selectedOption || tfSelections['single'];
        if (!userChoice) return;
        const rawTarget = String(currentTask?.correct_answer || currentTask?.correctAnswer || currentTask?.statements?.[0]?.correct || 'P').trim().toUpperCase();
        const normTarget = (rawTarget.startsWith('P') || rawTarget.startsWith('T') || rawTarget === 'TRUE') ? 'P' : 'F';
        const normUser = (userChoice.startsWith('P') || userChoice.startsWith('T') || userChoice === 'TRUE') ? 'P' : 'F';
        correct = normUser === normTarget;
      }
    } else if (isTwoPartTask) {
      if (!twoPart1 || !twoPart2) return;
      const userChoice = `${twoPart1}${twoPart2}`.toUpperCase();
      const target = String(currentTask?.correctAnswer || currentTask?.correct_answer || '').replace(/\s+/g, '').toUpperCase();
      correct = userChoice === target;
    }

    setIsEvaluated(true);
    setIsCorrect(correct);

    if (correct) {
      triggerHaptic('success');
      playSuccessSound();
      setCorrectAnswersCount(prev => prev + 1);
      setEarnedXp(prev => prev + 10);
      setEarnedCoins(prev => prev + 3);

      if (currentTask?.id) {
        removeMistakeFromBank(currentTask.id);
      }

      try {
        confetti({
          particleCount: 28,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10B981', '#06B6D4', '#3B82F6', '#F59E0B']
        });
      } catch (e) {}
    } else {
      triggerHaptic('error');
      playErrorSound();
      setEarnedXp(prev => prev + 2); // Small effort XP
      setSessionMistakesCount(prev => prev + 1);

      if (currentTask?.id) {
        addMistakeToBank(currentTask.id);
      }

      // Zasada Mastery Learning: błędna odpowiedź nie przesuwa paska postępu,
      // a zadanie (lub inne wylosowane z tej samej lekcji) trafia na koniec kolejki
      const lessonPool = getLessonTaskPool(lessonId);
      const usedIds = taskQueue.map((t: any) => t.id);
      const unusedInPool = lessonPool.filter((t: any) => !usedIds.includes(t.id));
      if (unusedInPool.length > 0) {
        const nextPoolTask = unusedInPool[0];
        const formattedTask = {
          ...currentTask,
          id: nextPoolTask.id,
          type: nextPoolTask.type || currentTask.type,
          title: `Zadanie powtórkowe • ${nextPoolTask.tierLabel}`,
          instruction: nextPoolTask.instruction || 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.',
          math_statement: nextPoolTask.question,
          question: nextPoolTask.question,
          options: nextPoolTask.options || [],
          correct_answer: nextPoolTask.correct_answer,
          correctAnswer: nextPoolTask.correctAnswer || nextPoolTask.correct_answer,
          numeric_correct_answer: nextPoolTask.correct_answer,
          input_placeholder: nextPoolTask.input_placeholder,
          statements: nextPoolTask.statements,
          part_1: nextPoolTask.part_1,
          part_2: nextPoolTask.part_2,
          explanation: nextPoolTask.explanation,
          officialKey: nextPoolTask.officialKey || nextPoolTask.explanation,
          hints: {
            level_1: nextPoolTask.hint_1,
            level_2: nextPoolTask.hint_2
          },
          isRetry: true
        };
        setTaskQueue(prev => [...prev, formattedTask]);
      } else {
        setTaskQueue(prev => [...prev, { ...currentTask, isRetry: true }]);
      }
    }
  };

  const fetchAiTutorEvaluation = async (effectiveAnswer: string) => {
    try {
      const response = await fetch('/api/evaluate-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentTask?.question || currentTask?.math_statement,
          officialKey: currentTask?.officialKey || currentTask?.explanation,
          studentAnswer: effectiveAnswer,
          taskType: 'OPEN_PROOF',
          maxPoints: currentTask?.points || 2,
          ai_tutor_rubric: currentTask?.ai_tutor_rubric,
          attemptCount: 1
        })
      });
      if (response.ok) {
        return await response.json();
      }
      console.warn('AI Tutor response not OK, using client-side rubric evaluation');
    } catch (err) {
      console.warn('AI Tutor service unavailable, activating client-side evaluation fallback');
    }
    return null;
  };

  const getFallbackEvaluation = (effectiveAnswer: string) => {
    const text = effectiveAnswer.toLowerCase();
    const hasAlgebraProgress =
      text.includes('3n^2') || text.includes('3n²') || text.includes('4n(n+1)') ||
      text.includes('4k(k+1)') || text.includes('4k(') || text.includes('4n(') ||
      text.includes('5(n-1)') || text.includes('5n(') || text.includes('2^96') ||
      text.includes('2^{96}') || text.includes('2^20') || text.includes('2^{20}') ||
      text.includes('2k') || text.includes('wyłącz') || text.includes('wspólny') ||
      text.includes('rozł') || text.includes('kwadrat') || text.includes('iloczyn') ||
      text.includes('reszt');

    const hasConclusion =
      text.includes('podziel') || text.includes('całkowit') || text.includes('wniosek') ||
      text.includes('udowodnion') || text.includes('cnd') || text.includes('c.n.d') ||
      text.includes('reszta 2') || text.includes('8k') || text.includes('30k') ||
      text.includes('21k') || text.includes('k \\in') || text.includes('c \\in') ||
      text.includes('n \\in');

    let fallbackScore = 0;
    if (hasAlgebraProgress && hasConclusion) {
      fallbackScore = 2;
    } else if (hasAlgebraProgress || text.length > 25) {
      fallbackScore = 1;
    }

    return {
      score: fallbackScore,
      maxPoints: currentTask?.points || 2,
      isPassed: fallbackScore >= 1,
      gradeTitle: fallbackScore === 2
        ? '2 / 2 PKT – Pełny dowód i wniosek'
        : (fallbackScore === 1 ? '1 / 2 PKT – Zasadniczy postęp' : '0 / 2 PKT – Próba rozwiązania'),
      summary: fallbackScore === 2
        ? (currentTask?.ai_tutor_rubric?.criterion_2_points || 'Perfekcyjne rozwiązanie! Odpowiedź w pełni zgodna ze schematem maturalnym.')
        : fallbackScore === 1
        ? (currentTask?.ai_tutor_rubric?.criterion_1_point || 'Zasadniczy postęp w dowodzie. Poprawne przekształcenie algebraiczne.')
        : 'Dowód wymaga dopracowania kluczowych przekształceń algebraicznych.',
      strengths: fallbackScore >= 1 ? ['Podjęto poprawną metodę algebraiczną', 'Zastosowano rozkład na czynniki'] : [],
      errors: fallbackScore < 2 ? ['Pamiętaj o formalnym wniosku końcowym powołującym się na podzielność przez liczbę całkowitą'] : [],
      maturaFeedback: fallbackScore === 2
        ? 'Egzaminator maturalny przyznaje pełne 2 punkty za kompletny dowód i prawidłowy wniosek.'
        : fallbackScore === 1
        ? 'Egzaminator maturalny docenia poprawny tok algebraiczny. Do pełnych 2 punktów sformułuj precyzyjny wniosek końcowy.'
        : 'Brak kluczowego przekształcenia algebraicznego. Spróbuj wyłączyć wspólny czynnik przed nawias.',
      ckeFeedback: fallbackScore === 2
        ? 'Egzaminator maturalny przyznaje pełne 2 punkty za kompletny dowód i prawidłowy wniosek.'
        : fallbackScore === 1
        ? 'Egzaminator maturalny docenia poprawny tok algebraiczny. Do pełnych 2 punktów sformułuj precyzyjny wniosek końcowy.'
        : 'Brak kluczowego przekształcenia algebraicznego. Spróbuj wyłączyć wspólny czynnik przed nawias.',
      suggestion: 'Zapoznaj się z wzorcowym modelem rozwiązania poniżej.',
      hintForNextAttempt: ''
    };
  };

  const applyEvaluationRewardsAndRequeue = (evalData: any) => {
    if (evalData.score >= (currentTask?.points || 2)) {
      triggerHaptic('success');
      playSuccessSound();
      setCorrectAnswersCount(prev => prev + 1);
      setEarnedXp(prev => prev + 25);
      setEarnedCoins(prev => prev + 8);
      if (currentTask?.id) removeMistakeFromBank(currentTask.id);
      try {
        confetti({
          particleCount: 35,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#10B981', '#06B6D4', '#F59E0B']
        });
      } catch (e) {}
    } else if (evalData.score > 0) {
      triggerHaptic('medium');
      playSuccessSound();
      setCorrectAnswersCount(prev => prev + 1);
      setEarnedXp(prev => prev + 15);
      setEarnedCoins(prev => prev + 4);
      if (currentTask?.id) removeMistakeFromBank(currentTask.id);
    } else {
      triggerHaptic('error');
      playErrorSound();
      setEarnedXp(prev => prev + 3);
      setSessionMistakesCount(prev => prev + 1);
      if (currentTask?.id) addMistakeToBank(currentTask.id);

      // Re-queue open task
      const lessonPool = getLessonTaskPool(lessonId);
      const usedIds = taskQueue.map((t: any) => t.id);
      const unusedInPool = lessonPool.filter((t: any) => !usedIds.includes(t.id));
      if (unusedInPool.length > 0) {
        const nextPoolTask = unusedInPool[0];
        setTaskQueue(prev => [...prev, {
          ...currentTask,
          id: nextPoolTask.id,
          question: nextPoolTask.question,
          math_statement: nextPoolTask.question,
          explanation: nextPoolTask.explanation,
          officialKey: nextPoolTask.officialKey || nextPoolTask.explanation,
          isRetry: true
        }]);
      } else {
        setTaskQueue(prev => [...prev, { ...currentTask, isRetry: true }]);
      }
    }
  };

  // Check open task answer with AI Tutor
  const handleCheckOpenAnswerWithTutor = async () => {
    let effectiveAnswer = openAnswerText;
    if (!effectiveAnswer.trim() && openCanvasDataUrl && openCanvasDataUrl.length > 50) {
      effectiveAnswer = '[Rozwiązanie odręczne na tablicy]';
      setOpenAnswerText(effectiveAnswer);
    }
    if (!effectiveAnswer.trim() || isTutorScanning || isEvaluated) return;

    setIsTutorScanning(true);
    triggerHaptic('medium');

    let evalData = await fetchAiTutorEvaluation(effectiveAnswer);

    // If server evaluation didn't succeed, generate resilient rubric evaluation
    if (!evalData) {
      evalData = getFallbackEvaluation(effectiveAnswer);
    }

    setTutorEvaluation(evalData);
    setIsEvaluated(true);
    setIsTutorScanning(false);

    const passed = evalData.isPassed ?? (evalData.score >= 1);
    setIsCorrect(passed);

    applyEvaluationRewardsAndRequeue(evalData);
  };

  // Next step or finish – Mastery Learning (dynamiczny wymóg poprawnych odpowiedzi)
  const handleNextStep = () => {
    if (isTheoryStep) {
      setCurrentStep(1);
      setCurrentQueueIndex(0);
      setSelectedOption(null);
      setIsEvaluated(false);
      setIsCorrect(null);
      return;
    }

    if (correctAnswersCount >= targetCorrectAnswers) {
      // Zdobyto wymaganą liczbę poprawnych odpowiedzi – lekcja zaliczona!
      setIsSessionComplete(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#10B981', '#06B6D4', '#F59E0B', '#8B5CF6']
        });
      } catch (e) {}
    } else {
      // Przejdź do kolejnego zadania z kolejki
      setCurrentQueueIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsEvaluated(false);
      setIsCorrect(null);
      setOpenAnswerText('');
      setTutorEvaluation(null);
      setShowModelSolution(false);
    }
  };

  // Final finish - Always marks lesson completed and returns to learning map
  const handleFinishSession = (_goToNextLesson = false) => {
    const finalEarnedXp = Math.max(40, earnedXp + 20);
    const finalEarnedCoins = Math.max(15, earnedCoins + 6);

    const stars = 3;

    const cleanLessonId = lessonId.replace('lesson-', '');
    // All task IDs in current session plus lesson completion tags
    const completedIds = [
      `LESSON-${lessonId}`,
      `LESSON-${cleanLessonId}`,
      `LESSON-${lessonId.toLowerCase()}`,
      ...taskQueue.map(t => t.id),
      ...allTaskIdsToMarkCompleted
    ];

    onCompleteSession(completedIds, stars, finalEarnedXp, finalEarnedCoins, null, activeSeconds, sessionMistakesCount);
  };

  // Render Celebration Screen - Unified 150ms fade-in, zero CLS/stagger jitter
  if (isSessionComplete) {
    const calculatedXp = Math.max(35, earnedXp + 20);
    const calculatedCoins = Math.max(12, earnedCoins + 6);
    const streakDays = (userState?.streakDays || 0) + 1;
    const cleanLessonNumber = lessonId.replace('lesson-', '').replace('-', '.');

    const accuracyPct = sessionMistakesCount === 0 
      ? 100 
      : Math.round((targetCorrectAnswers / (targetCorrectAnswers + sessionMistakesCount)) * 100);

    const mistakesCountLabel = sessionMistakesCount === 1 
      ? '1 błąd poprawiony w trakcie nauki'
      : sessionMistakesCount < 5 
        ? `${sessionMistakesCount} błędy poprawione w trakcie nauki` 
        : `${sessionMistakesCount} błędów poprawionych w trakcie nauki`;

    return (
      <div 
        id="session-celebration-screen"
        className="fixed inset-0 z-50 bg-[#070A0F]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 text-white select-none overflow-y-auto"
      >
        <div className="w-full max-w-md bg-[#0B0F19] rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 sm:p-8 text-white select-none relative shadow-2xl my-auto">
          <div className="w-full flex flex-col items-center justify-center text-center">
            
            {/* 1. Profesjonalny puchar Lucide Trophy w złotym okręgu sukcesu */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="relative mt-2 mb-6 flex items-center justify-center"
            >
              {/* Radial ambient glow */}
              <div className="absolute w-44 h-44 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
              <div className="absolute w-36 h-36 rounded-full border border-amber-400/20 animate-spin pointer-events-none" style={{ animationDuration: '24s' }} />

              {/* Glowing golden success circle with centered Lucide Trophy */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-400/25 via-yellow-500/15 to-amber-600/20 flex items-center justify-center border-2 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.4)] z-10">
                <Trophy size={50} className="text-amber-400 drop-shadow-md shrink-0" strokeWidth={2} />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2"
            >
              Lekcja {cleanLessonNumber} ukończona!
            </motion.h1>

            {/* Dynamiczny komunikat gratulacyjny (Koniec ze sztucznym botem) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="text-slate-300 text-sm sm:text-base max-w-sm mb-5 leading-relaxed font-medium"
            >
              {sessionMistakesCount === 0 
                ? '🏆 Perfekcyjna runda! Opanowałeś wszystkie zadania za pierwszym podejściem.'
                : '💪 Lekcja zaliczona! Wyeliminowałeś wszystkie pułapki w pętli i opanowałeś materiał.'
              }
            </motion.p>

            {/* 2. Równy rozmiar 4 kafelków: XP, Monety, Seria, Czas Sesji */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5"
            >
              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[90px] shadow-sm">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-1 text-cyan-400">
                  <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">+{calculatedXp}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">XP</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[90px] shadow-sm">
                <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-1 text-amber-400">
                  <Coins className="w-3.5 h-3.5" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">+{calculatedCoins}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Monet</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[90px] shadow-sm">
                <div className="w-7 h-7 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mb-1 text-orange-400">
                  <Flame className="w-3.5 h-3.5" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">{streakDays} dni</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Seria</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[90px] shadow-sm">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-1 text-emerald-400">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">{formattedHumanTime}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Czas</span>
              </div>
            </motion.div>

            {/* 3. Karta podsumowania błędów (Bilans Skuteczności) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="flex items-center justify-center mb-6"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold ${
                sessionMistakesCount === 0 
                  ? 'bg-slate-900/90 border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.12)]' 
                  : 'bg-slate-900/90 border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.12)]'
              }`}>
                {sessionMistakesCount === 0 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                <span>
                  {sessionMistakesCount === 0 
                    ? 'Skuteczność: 100% • 0 błędów'
                    : `Skuteczność: ${accuracyPct}% • ${mistakesCountLabel}`
                  }
                </span>
              </div>
            </motion.div>

            {/* Wyłącznie JEDEN, nowoczesny przycisk akcji: Przejdź do mapy lekcji → */}
            <div className="w-full pt-3 border-t border-slate-800/80">
              <button
                id="session-celebration-return-button"
                onClick={() => handleFinishSession(false)}
                className="w-full py-4 px-6 rounded-2xl font-black text-slate-950 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] transition shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 text-base cursor-pointer tracking-wide"
              >
                <span>Przejdź do mapy lekcji</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Tier color mapping
  const tier = currentTask?.tier || 'A';
  const tierBadgeColor = 
    tier === 'C' 
      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' 
      : tier === 'B' 
        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' 
        : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';

  return (
    <div 
      id="session-runner-modal"
      className="fixed inset-0 z-50 bg-[#070A0F] flex items-center justify-center p-0 md:p-6 lg:p-8"
    >
      <div 
        id="session-runner-container"
        className="w-full h-full h-[100dvh] md:h-[92vh] md:max-h-[920px] md:max-w-2xl bg-[#0B0F19] md:rounded-[32px] md:border md:border-white/10 md:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,229,255,0.06)] flex flex-col justify-between overflow-hidden relative text-white transition-all duration-200"
      >
      {/* ================= DEDICATED FOCUS SESSION BAR ================= */}
      <header 
        id="session-header"
        className="w-full shrink-0 bg-[#0B0F19] border-b border-white/10 z-20 sticky top-0"
      >
        <div className="w-full mx-auto px-4 sm:px-6 pt-3 pb-2.5 flex flex-col gap-2 transition-all max-w-2xl">
          {/* Linia 1: Przycisk wyjścia X oraz 4 segmenty postępu */}
          <div className="flex items-center gap-3 w-full">
            <button
              id="session-exit-button"
              onClick={() => setShowExitModal(true)}
              className="w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition active:scale-95 shrink-0 flex items-center justify-center cursor-pointer"
              title="Przerwij sesję"
              aria-label="Przerwij sesję"
            >
              <X className="w-5 h-5" />
            </button>

            {isTheoryStep ? (
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <span className="text-xs font-bold text-cyan-400 whitespace-nowrap">Krok 1: Pigułka wiedzy</span>
                <span className="text-xs text-slate-400 truncate">• Wprowadzenie i Wzory</span>
              </div>
            ) : (
              <div className="flex-1 flex items-center gap-1.5">
                {Array.from({ length: targetCorrectAnswers }).map((_, segIdx) => {
                  const isDone = correctAnswersCount > segIdx;
                  const isNext = correctAnswersCount === segIdx;

                  return (
                    <div
                      key={segIdx}
                      className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
                        isDone
                          ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]'
                          : isNext
                            ? 'bg-cyan-500/40 border border-cyan-400/60'
                            : 'bg-slate-800'
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Linia 2: Cel lekcji / Wzory */}
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="text-xs font-medium text-slate-300 select-none flex items-center gap-1.5 whitespace-nowrap">
              <span>Cel lekcji:</span>
              <span className="text-emerald-400 font-bold">{correctAnswersCount} z {targetCorrectAnswers}</span>
              <span className="text-slate-400">poprawnych zadań</span>
            </div>

            <button
              id="session-formulas-button"
              onClick={() => setShowFormulaSheet(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shrink-0 shadow-sm cursor-pointer ml-auto"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Wzory</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN TASK AREA ================= */}
      <main 
        id="session-task-area"
        ref={taskAreaRef}
        className={`w-full mx-auto flex-1 min-h-0 overflow-y-auto overscroll-y-contain touch-pan-y flex flex-col justify-start transition-all max-w-2xl px-4 ${
          isTheoryStep 
            ? 'pb-28 sm:pb-32' 
            : isEvaluated ? 'pb-28 sm:pb-32' : 'pb-24 sm:pb-28'
        }`}
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y'
        }}
      >
        {isTheoryStep ? (
          <div id="session-theory-pill-content" className="w-full max-w-2xl mx-auto space-y-4 pt-2">
            {/* 4 logiczne segmenty pigułki wiedzy */}
            <div className="grid grid-cols-4 gap-1.5 py-1">
              {[
                { id: 0, title: 'Istota' },
                { id: 1, title: 'Wzory' },
                { id: 2, title: 'Przykład' },
                { id: 3, title: 'Pułapka' }
              ].map((step) => {
                const isActive = theorySubStep === step.id;
                const isDone = theorySubStep > step.id;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      triggerHaptic('light');
                      setTheorySubStep(step.id);
                    }}
                    className="py-1 flex flex-col gap-1.5 cursor-pointer group transition-all"
                    aria-label={`Przejdź do zakładki: ${step.title}`}
                  >
                    <div className={`h-1.5 rounded-full transition-all duration-200 ${
                      isActive 
                        ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' 
                        : isDone 
                          ? 'bg-slate-500' 
                          : 'bg-slate-800'
                    }`} />
                    <span className={`text-[11px] sm:text-xs text-center font-medium transition-colors ${
                      isActive ? 'text-cyan-300 font-bold' : 'text-slate-400 group-hover:text-slate-300'
                    }`}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {/* Zakładka 0: Istota & Strategia maturalna */}
              {theorySubStep === 0 && (
                <motion.div
                  key="theory-tab-0"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <section className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>Istota pojęcia</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                      {theoryPill.title || lessonTitle}
                    </h1>
                    {(theoryPill.concept_essence || theoryPill.intuition) && (
                      <div className="rounded-2xl p-4 sm:p-5 bg-slate-900/70 border border-slate-800 text-slate-200 text-sm sm:text-base leading-relaxed">
                        {renderMicroContent(theoryPill.concept_essence || theoryPill.intuition)}
                      </div>
                    )}
                  </section>

                  {(theoryPill.matura_context || theoryPill.keyTakeaway) && (
                    <section className="rounded-2xl p-4 sm:p-5 bg-slate-900/40 border border-slate-800 flex flex-col gap-2.5">
                      <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Strategia maturalna</span>
                      </div>
                      <div className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                        {renderMicroContent(theoryPill.matura_context || theoryPill.keyTakeaway)}
                      </div>
                    </section>
                  )}
                </motion.div>
              )}

              {/* Zakładka 1: Wzory (KaTeX) */}
              {theorySubStep === 1 && (
                <motion.div
                  key="theory-tab-1"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {(() => {
                    const formulas = getCoreFormulas(theoryPill.core_formulas || theoryPill.coreFormulaLatex);
                    return (
                      <section className="rounded-2xl p-4 sm:p-5 bg-slate-900/70 border border-slate-800 flex flex-col gap-3.5">
                        <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                          <BookOpen className="w-4 h-4 text-cyan-400" />
                          <span>Kluczowe wzory i zależności</span>
                        </div>

                        {formulas.length > 0 ? (
                          <div className="space-y-2.5 py-1">
                            {formulas.map((formula, fIdx) => (
                              <div
                                key={fIdx}
                                className="rounded-xl p-3.5 sm:p-4 bg-slate-950/60 border border-slate-800/80 text-center overflow-x-auto shadow-inner"
                              >
                                <MathRenderer content={formula} displayMode={true} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-slate-950/40 text-center text-slate-400 text-sm">
                            W tym temacie nie ma dodatkowych wzorów formalnych – stosuj definicję i podstawowe reguły rachunkowe.
                          </div>
                        )}

                        {theoryPill.formula_notes && (
                          <div className="mt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 pt-3 leading-relaxed">
                            <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                              Wskazówka do wzorów
                            </span>
                            {renderMicroContent(theoryPill.formula_notes)}
                          </div>
                        )}
                      </section>
                    );
                  })()}
                </motion.div>
              )}

              {/* Zakładka 2: Przykład z arkusza */}
              {theorySubStep === 2 && (
                <motion.div
                  key="theory-tab-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {(() => {
                    const normExample = normalizeWorkedExample(theoryPill.worked_example);
                    if (!normExample) {
                      return (
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 text-sm text-center">
                          Brak przykładu dla tej pigułki wiedzy.
                        </div>
                      );
                    }

                    return (
                      <section className="rounded-2xl p-4 sm:p-5 bg-slate-900/70 border border-slate-800 flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span>Przykład z arkusza krok po kroku</span>
                        </div>

                        {/* Treść zadania */}
                        <div className="border-l-2 border-cyan-500/50 pl-3.5 py-1 bg-slate-950/30 rounded-r-xl">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Treść zadania
                          </span>
                          <div className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                            {renderMicroContent(normExample.problem)}
                          </div>
                        </div>

                        {/* Lista kroków rozwiązania */}
                        {normExample.steps.length > 0 && (
                          <div className="space-y-3 pt-1 border-t border-slate-800/80">
                            {normExample.steps.map((st, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-200">
                                <span className="shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center mt-0.5">
                                  {st.num}
                                </span>
                                <div className="flex-1 leading-relaxed">
                                  {st.label && (
                                    <span className="text-xs font-semibold text-cyan-400 block mb-0.5">
                                      {st.label}
                                    </span>
                                  )}
                                  {renderMicroContent(st.text)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Wynik / Odpowiedź końcowa */}
                        {normExample.result && (
                          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm">
                            <span className="text-slate-400 font-medium">Odpowiedź końcowa:</span>
                            <span className="font-semibold text-emerald-400">
                              <MathRenderer content={normExample.result.includes('$') ? normExample.result : `$${normExample.result}$`} />
                            </span>
                          </div>
                        )}
                      </section>
                    );
                  })()}
                </motion.div>
              )}

              {/* Zakładka 3: Pułapka egzaminacyjna */}
              {theorySubStep === 3 && (
                <motion.div
                  key="theory-tab-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {(theoryPill.exam_trap || theoryPill.trapAlert) ? (
                    <section className="rounded-2xl p-5 bg-amber-500/10 border border-amber-500/30 flex flex-col gap-3 shadow-[0_0_20px_rgba(245,158,11,0.06)]">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Pułapka egzaminacyjna</span>
                      </div>
                      <div className="text-sm sm:text-base text-amber-100/95 leading-relaxed font-normal">
                        {renderMicroContent(theoryPill.exam_trap || theoryPill.trapAlert)}
                      </div>
                    </section>
                  ) : (
                    <section className="rounded-2xl p-5 bg-slate-900/60 border border-slate-800 text-slate-300 text-sm leading-relaxed">
                      Zwracaj szczególną uwagę na dziedzinę wyrażeń i znaki przy redukcji wyrazów podobnych.
                    </section>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <>
            {/* Sztywny margines górny + Tytuł lekcji i pojedyncza linia metadanych */}
            <div className="pt-5 pb-3 flex flex-col gap-2 shrink-0">
              <h1 className="text-base sm:text-lg font-bold text-white leading-snug break-words">
                {lessonTitle}
              </h1>
              
              {/* Autentyczna, elegancka etykieta źródła zadania (Source Tag) */}
              <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-cyan-300 font-medium text-[11px] sm:text-xs shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{formatSourceTag(currentTask?.source || currentTask?.cke_source, currentTask?.points, isOpenTask)}</span>
                </span>
                {isOpenTask ? (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    Zadanie Otwarte • 2 pkt
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    Pewniak Maturalny
                  </span>
                )}
                {currentTask?.tierLabel && (
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    • {currentTask.tierLabel}
                  </span>
                )}
              </div>
            </div>
            {/* Task Question Statement */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed break-words">
                <MathRenderer content={currentTask?.question || currentTask?.math_statement || ''} />
              </div>
            </div>

        {/* OPEN TASK WORKSPACE (DWA TRYBY: KLAWIATURA VS TABLICA) */}
        {isOpenTask ? (
          <div className="space-y-4 pt-1">
            <OpenTaskWorkspace
              task={currentTask}
              isEvaluated={isEvaluated}
              isCorrect={isCorrect}
              value={openAnswerText}
              onChangeValue={(val) => setOpenAnswerText(val)}
              savedCanvasDataUrl={openCanvasDataUrl}
              onSaveCanvasData={(dataUrl) => setOpenCanvasDataUrl(dataUrl)}
              onSubmit={handleCheckOpenAnswerWithTutor}
              onAskAiTutor={handleCheckOpenAnswerWithTutor}
              inputPlaceholder="Zapisz swoje rozwiązanie lub użyj klawiatury..."
            />

            {/* AI Tutor Scanning State (pulsujący gradient błękitno-indygo) */}
            {isTutorScanning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#071927] via-[#0b1626] to-[#121633] border border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.25)] flex flex-col items-center text-center my-3 relative overflow-hidden animate-pulse"
              >
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-indigo-600/40 border border-cyan-400/60 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                  <Sparkles className="w-7 h-7 text-cyan-300 animate-spin-slow shrink-0" />
                  <div className="absolute inset-0 rounded-2xl border border-cyan-400/40 animate-ping opacity-25" />
                </div>
                <h4 className="font-bold text-white text-base sm:text-lg mb-1">
                  Twój Osobisty Tutor AI sprawdza poprawność dowodu i argumentację...
                </h4>
                <p className="text-xs sm:text-sm text-cyan-300/85 max-w-md">
                  Weryfikuję przekształcenia algebraiczne, tożsamości oraz precyzję dowodu zgodnie z kryteriami maturalnymi.
                </p>
              </motion.div>
            )}

            {/* Tutor Feedback Card */}
            {isEvaluated && tutorEvaluation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-[#0f172a] border border-slate-700/80 p-4 sm:p-5 shadow-xl space-y-3.5"
              >
                {/* Header + Score Badge */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base leading-tight">
                        Ocena Tutora AI
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        Standardy oceniania egzaminu maturalnego
                      </span>
                    </div>
                  </div>

                  {/* Score badge */}
                  <div className={`px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
                    tutorEvaluation.score === (currentTask?.points || 2)
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : tutorEvaluation.score > 0
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                  }`}>
                    {tutorEvaluation.score === (currentTask?.points || 2) ? (
                      <CheckCircle2 size={16} />
                    ) : tutorEvaluation.score > 0 ? (
                      <Sparkles size={16} />
                    ) : (
                      <AlertTriangle size={16} />
                    )}
                    <span>{tutorEvaluation.gradeTitle || `${tutorEvaluation.score} / ${currentTask?.points || 2} PKT`}</span>
                  </div>
                </div>

                {/* Tutor Explanation & Strengths/Errors */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <p className="font-medium text-slate-300">
                    {tutorEvaluation.ckeFeedback || tutorEvaluation.summary}
                  </p>

                  {tutorEvaluation.strengths && tutorEvaluation.strengths.length > 0 && (
                    <div className="mt-2.5 pt-2.5 border-t border-white/5 space-y-1">
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide block">
                        Mocne strony Twojego dowodu:
                      </span>
                      {tutorEvaluation.strengths.map((str: string, sIdx: number) => (
                        <div key={sIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {tutorEvaluation.errors && tutorEvaluation.errors.length > 0 && (
                    <div className="mt-2.5 pt-2.5 border-t border-white/5 space-y-1">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide block">
                        Zalecenie do zapisu maturalnego:
                      </span>
                      {tutorEvaluation.errors.map((err: string, eIdx: number) => (
                        <div key={eIdx} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                          <span>{err}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Model Solution Dropdown */}
                <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowModelSolution(prev => !prev)}
                    className="w-full p-3 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-cyan-300 hover:bg-cyan-500/10 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={16} />
                      <span>Wzorcowy dowód maturalny (Krok po kroku)</span>
                    </span>
                    <span className="text-xs font-normal text-cyan-400/80">
                      {showModelSolution ? 'Zwiń ▲' : 'Rozwiń ▼'}
                    </span>
                  </button>
                  {showModelSolution && (
                    <div className="p-3.5 pt-0 border-t border-cyan-500/20 text-xs sm:text-sm text-slate-200 space-y-2.5 max-h-56 overflow-y-auto">
                      {currentTask?.modelSolutionSteps && currentTask.modelSolutionSteps.length > 0 ? (
                        <div className="space-y-2">
                          {currentTask.modelSolutionSteps.map((step: any, sIdx: number) => (
                            <div key={sIdx} className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                              <span className="text-[11px] font-bold text-cyan-400 block mb-0.5">
                                Krok {step.step_num}: {step.description}
                              </span>
                              {step.latex && <MathRenderer content={`$${step.latex}$`} />}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                          <MathRenderer content={currentTask?.officialKey || currentTask?.explanation || ''} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        ) : isNumericTask ? (
          /* 1. NUMERIC INPUT FORMAT */
          <motion.div
            key={`session-numeric-${currentStep}-${currentTask?.id || ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full my-auto py-2"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col gap-3">
              <label className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center justify-between">
                <span>Wpisz wynik liczbowy:</span>
                <span className="text-[11px] text-slate-500 font-mono">użyj przecinka lub kropki</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="decimal"
                  disabled={isEvaluated}
                  value={numericInput}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.,/-]/g, '');
                    setNumericInput(val);
                  }}
                  placeholder={currentTask?.input_placeholder || "np. 12 lub 3,5"}
                  className={`w-full text-lg sm:text-2xl font-bold font-mono px-4 py-3.5 rounded-xl border transition-all outline-none ${
                    isEvaluated
                      ? isCorrect
                        ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300'
                        : 'bg-rose-950/30 border-rose-500 text-rose-300'
                      : 'bg-slate-950 border-slate-700 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'
                  }`}
                />
                {isEvaluated && (
                  <div className="absolute right-3.5 flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <X className="w-6 h-6 text-rose-400 stroke-[2.5]" />
                    )}
                  </div>
                )}
              </div>

              {isEvaluated && !isCorrect && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm text-rose-200 flex items-center justify-between">
                  <span>Prawidłowy wynik:</span>
                  <span className="font-mono font-black text-emerald-400 text-base">
                    {currentTask?.correctAnswer || currentTask?.correct_answer}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ) : isTrueFalseTask ? (
          /* 2. TRUE_FALSE STATEMENTS FORMAT */
          <motion.div
            key={`session-tf-${currentStep}-${currentTask?.id || ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full my-auto space-y-3 py-2"
          >
            {(!currentTask?.statements || currentTask.statements.length <= 1) ? (
              <div className="space-y-3">
                <div className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center justify-between px-1">
                  <span>Oceń prawdziwość stwierdzenia:</span>
                  <span className="text-[11px] text-slate-500">Wybierz PRAWDA lub FAŁSZ</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {[
                    { id: 'P' as const, label: 'PRAWDA', shortcut: 'P / 1', desc: 'Stwierdzenie jest prawdziwe' },
                    { id: 'F' as const, label: 'FAŁSZ', shortcut: 'F / 2', desc: 'Stwierdzenie jest fałszywe' }
                  ].map((item) => {
                    const userChoice = selectedOption || tfSelections['single'];
                    const isOptSelected = userChoice === item.id;
                    const rawTarget = String(currentTask?.correct_answer || currentTask?.correctAnswer || currentTask?.statements?.[0]?.correct || 'P').trim().toUpperCase();
                    const normTarget = (rawTarget.startsWith('P') || rawTarget.startsWith('T') || rawTarget === 'TRUE') ? 'P' : 'F';
                    const isThisTheCorrectAnswer = normTarget === item.id;

                    let cardClass = 'group relative flex flex-col p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left select-none ';
                    if (!isEvaluated) {
                      if (isOptSelected) {
                        cardClass += 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.25)] ring-2 ring-cyan-400/20';
                      } else {
                        cardClass += 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200';
                      }
                    } else {
                      if (isThisTheCorrectAnswer) {
                        cardClass += 'bg-emerald-950/30 border-emerald-500 text-emerald-100 shadow-[0_0_24px_rgba(16,185,129,0.2)]';
                      } else if (isOptSelected && !isThisTheCorrectAnswer) {
                        cardClass += 'bg-rose-950/30 border-rose-500 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
                      } else {
                        cardClass += 'bg-slate-900/30 border-slate-800/60 opacity-40 cursor-not-allowed';
                      }
                    }

                    return (
                      <button
                        key={item.id}
                        type="button"
                        disabled={isEvaluated}
                        onClick={() => {
                          if (isEvaluated) return;
                          triggerHaptic('light');
                          setSelectedOption(item.id);
                          setTfSelections({ single: item.id });
                        }}
                        className={cardClass}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center transition-all ${
                              !isEvaluated
                                ? isOptSelected
                                  ? 'bg-cyan-400 text-slate-950 shadow-md'
                                  : 'bg-slate-800 border border-slate-700 text-slate-300 group-hover:border-slate-600'
                                : isThisTheCorrectAnswer
                                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                                  : isOptSelected
                                    ? 'bg-rose-500 text-white font-black'
                                    : 'bg-slate-800 text-slate-600'
                            }`}>
                              {item.id}
                            </span>
                            <span className="font-bold text-base sm:text-lg tracking-wide text-white">
                              {item.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {!isEvaluated && (
                              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                                {item.shortcut}
                              </span>
                            )}
                            {isEvaluated && isThisTheCorrectAnswer && (
                              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                                <Check size={14} className="stroke-[3]" />
                                Poprawna
                              </span>
                            )}
                            {isEvaluated && isOptSelected && !isThisTheCorrectAnswer && (
                              <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                                <X size={14} className="stroke-[3]" />
                                Twój wybór
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 mt-0.5 font-normal">
                          {item.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center justify-between px-1">
                  <span>Oceń prawdziwość zdań:</span>
                  <span className="text-[11px] text-slate-500">Wybierz P lub F dla każdego zdania</span>
                </div>
                <div className="space-y-2.5">
                  {(currentTask?.statements || []).map((stmt: any, idx: number) => {
                    const userSelection = tfSelections[stmt.id];
                    const isStatementCorrect = isEvaluated && userSelection === stmt.correct;

                    return (
                      <div
                        key={stmt.id || idx}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                          isEvaluated
                            ? isStatementCorrect
                              ? 'bg-emerald-950/20 border-emerald-500/40'
                              : 'bg-rose-950/20 border-rose-500/40'
                            : 'bg-slate-900/50 border-slate-800'
                        } flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                      >
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                          <span className="shrink-0 w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed break-words flex-1">
                            <MathRenderer content={stmt.text} />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          {(['P', 'F'] as const).map((opt) => {
                            const isOptSelected = userSelection === opt;
                            const isThisTheCorrectAnswer = stmt.correct === opt;

                            let btnClass = 'w-11 h-10 rounded-xl font-bold text-sm flex items-center justify-center transition-all cursor-pointer ';
                            if (!isEvaluated) {
                              if (isOptSelected) {
                                btnClass += 'bg-cyan-400 text-slate-950 border border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.4)]';
                              } else {
                                btnClass += 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700';
                              }
                            } else {
                              if (isThisTheCorrectAnswer) {
                                btnClass += 'bg-emerald-500 text-slate-950 border border-emerald-400 font-black shadow-[0_0_12px_rgba(16,185,129,0.3)]';
                              } else if (isOptSelected && !isThisTheCorrectAnswer) {
                                btnClass += 'bg-rose-500 text-white border border-rose-400';
                              } else {
                                btnClass += 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed';
                              }
                            }

                            return (
                              <button
                                key={opt}
                                type="button"
                                disabled={isEvaluated}
                                onClick={() => {
                                  if (isEvaluated) return;
                                  triggerHaptic('light');
                                  setTfSelections(prev => ({ ...prev, [stmt.id]: opt }));
                                }}
                                className={btnClass}
                              >
                                <span>{opt}</span>
                                {isEvaluated && isThisTheCorrectAnswer && (
                                  <Check size={12} className="ml-0.5 stroke-[3]" />
                                )}
                                {isEvaluated && isOptSelected && !isThisTheCorrectAnswer && (
                                  <X size={12} className="ml-0.5 stroke-[3]" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        ) : isTwoPartTask ? (
          /* 3. TWO_PART FORMAT */
          <motion.div
            key={`session-twopart-${currentStep}-${currentTask?.id || ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full my-auto space-y-4 py-2"
          >
            {/* Część 1 */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2.5">
              <div className="text-xs sm:text-sm font-semibold text-cyan-300 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">1</span>
                <span>{currentTask?.part_1?.prompt || 'Wybierz pierwszą część zdania:'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(currentTask?.part_1?.options || []).map((opt: any) => {
                  const isSelected = twoPart1 === opt.id;
                  const target1 = (currentTask?.correctAnswer || currentTask?.correct_answer || '')[0];
                  const isOptionCorrect = opt.id === target1;

                  let btnClass = 'p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs sm:text-sm ';
                  if (!isEvaluated) {
                    btnClass += isSelected 
                      ? 'bg-cyan-950/30 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';
                  } else {
                    if (isOptionCorrect) {
                      btnClass += 'bg-emerald-950/30 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !isOptionCorrect) {
                      btnClass += 'bg-rose-950/30 border-rose-500 text-rose-200';
                    } else {
                      btnClass += 'bg-slate-950/40 border-slate-800/40 opacity-40 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isEvaluated}
                      onClick={() => {
                        if (isEvaluated) return;
                        triggerHaptic('light');
                        setTwoPart1(opt.id);
                      }}
                      className={btnClass}
                    >
                      <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {opt.id}
                      </span>
                      <span className="flex-1 break-words">
                        <MathRenderer content={opt.text} />
                      </span>
                      {isEvaluated && isOptionCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />}
                      {isEvaluated && isSelected && !isOptionCorrect && <X className="w-4 h-4 text-rose-400 shrink-0 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Część 2 */}
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2.5">
              <div className="text-xs sm:text-sm font-semibold text-cyan-300 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">2</span>
                <span>{currentTask?.part_2?.prompt || 'Wybierz drugą część zdania / uzasadnienie:'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(currentTask?.part_2?.options || []).map((opt: any) => {
                  const isSelected = twoPart2 === opt.id;
                  const target2 = (currentTask?.correctAnswer || currentTask?.correct_answer || '')[1];
                  const isOptionCorrect = opt.id === target2;

                  let btnClass = 'p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs sm:text-sm ';
                  if (!isEvaluated) {
                    btnClass += isSelected 
                      ? 'bg-cyan-950/30 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';
                  } else {
                    if (isOptionCorrect) {
                      btnClass += 'bg-emerald-950/30 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !isOptionCorrect) {
                      btnClass += 'bg-rose-950/30 border-rose-500 text-rose-200';
                    } else {
                      btnClass += 'bg-slate-950/40 border-slate-800/40 opacity-40 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isEvaluated}
                      onClick={() => {
                        if (isEvaluated) return;
                        triggerHaptic('light');
                        setTwoPart2(opt.id);
                      }}
                      className={btnClass}
                    >
                      <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {opt.id}
                      </span>
                      <span className="flex-1 break-words">
                        <MathRenderer content={opt.text} />
                      </span>
                      {isEvaluated && isOptionCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[3]" />}
                      {isEvaluated && isSelected && !isOptionCorrect && <X className="w-4 h-4 text-rose-400 shrink-0 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          /* 4. STANDARD SINGLE CHOICE (A, B, C, D) - ANSWERS ALWAYS VISIBLE */
          <motion.div 
            key={`session-options-${currentStep}-${currentTask?.id || ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="space-y-3 pt-1"
          >
            {currentTask?.options?.map((option: any) => {
              const isSelected = selectedOption === option.id;
              const isOptionCorrect = option.id === currentTask?.correct_answer;

              // Clean high-contrast styles: answers remain 100% visible on screen
              let borderStyle = 'border-slate-800 hover:border-slate-700 bg-slate-900/50';
              if (isSelected && !isEvaluated) {
                borderStyle = 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]';
              } else if (isEvaluated) {
                if (isOptionCorrect) {
                  borderStyle = 'border-emerald-500 bg-emerald-950/35 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.25)]';
                } else if (isSelected && !isOptionCorrect) {
                  borderStyle = 'border-rose-500/80 bg-rose-950/35 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.25)]';
                } else {
                  borderStyle = 'border-slate-800/50 opacity-40 bg-slate-900/20 text-slate-500';
                }
              }

              return (
                <button
                  key={option.id}
                  id={`session-option-${option.id}`}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isEvaluated}
                  className={`w-full min-h-[58px] p-3 sm:p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all duration-150 ${borderStyle} active:scale-[0.99]`}
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <span 
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border transition-colors ${
                        isSelected && !isEvaluated
                          ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                          : isEvaluated && isOptionCorrect
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black'
                            : isEvaluated && isSelected && !isOptionCorrect
                              ? 'bg-rose-500 border-rose-400 text-white font-black'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {option.id}
                    </span>
                    <div className="text-sm sm:text-base text-slate-100 font-medium break-words flex-1">
                      <MathRenderer content={option.content_latex || option.text || ''} />
                    </div>
                  </div>

                  {/* Keyboard badge for desktop */}
                  {!isEvaluated && (
                    <span className="hidden md:inline-flex items-center text-[11px] font-mono font-bold text-slate-400 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded shrink-0 mr-1">
                      {option.id}
                    </span>
                  )}

                  {/* Selection / Status Icon */}
                  {isSelected && !isEvaluated && (
                    <div className="w-5 h-5 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    </div>
                  )}
                  {isEvaluated && isOptionCorrect && (
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 stroke-[3]" />
                  )}
                  {isEvaluated && isSelected && !isOptionCorrect && (
                    <X className="w-5 h-5 text-rose-400 shrink-0 stroke-[3]" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
          </>
        )}
      </main>

      {/* ================= STICKY BOTTOM CTA FOR THEORY STEP ================= */}
      {isTheoryStep && (
        <footer 
          id="session-theory-sticky-cta"
          className="w-full shrink-0 sticky bottom-0 z-30 bg-[#0B0F19]/95 backdrop-blur-md border-t border-slate-800 px-4 py-3"
        >
          <div className="w-full max-w-2xl mx-auto flex items-center gap-2">
            {theorySubStep > 0 && (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  setTheorySubStep(prev => Math.max(0, prev - 1));
                }}
                className="h-[48px] px-4 rounded-xl font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-1.5 text-sm shrink-0 cursor-pointer active:scale-95 transition"
                aria-label="Wróć do poprzedniej karty"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Wróć</span>
              </button>
            )}

            {theorySubStep < 3 ? (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  setTheorySubStep(prev => Math.min(3, prev + 1));
                }}
                className="flex-1 h-[48px] px-4 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] transition flex items-center justify-center gap-2 text-sm cursor-pointer tracking-wide"
              >
                <span>Dalej</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            ) : (
              <button
                type="button"
                id="session-start-tasks-button"
                onClick={() => {
                  triggerHaptic('medium');
                  playSuccessSound();
                  setCurrentStep(1);
                }}
                className="flex-1 h-[48px] px-4 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] transition flex items-center justify-center gap-2 text-sm cursor-pointer tracking-wide"
              >
                <span>Rozpocznij zadania</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </footer>
      )}

      {/* ================= BOTTOM ACTION & FEEDBACK BAR (ELEGANT 90-110PX BAR) ================= */}
      {!isTheoryStep && (
        <footer 
          id="session-footer-drawer"
          className="w-full shrink-0 sticky bottom-0 z-30"
        >
        <AnimatePresence mode="wait">
          {!isEvaluated ? (
            /* Normal Action Bar */
            <div 
              id="session-check-bar"
              className="w-full bg-[#0B0F19]/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 sm:py-4"
            >
              <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-2">
                {isOpenTask ? (
                  <button
                    id="session-check-tutor-button"
                    onClick={handleCheckOpenAnswerWithTutor}
                    disabled={(!openAnswerText.trim() && openCanvasDataUrl.length <= 50) || isTutorScanning}
                    className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                      (openAnswerText.trim() || openCanvasDataUrl.length > 50) && !isTutorScanning
                        ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.4)] active:scale-[0.99] cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.2]" />
                    <span>{isTutorScanning ? 'ANALIZA W TOKU...' : 'SPRAWDŹ Z TUTOREM AI'}</span>
                  </button>
                ) : (
                  <button
                    id="session-check-button"
                    onClick={handleCheckAnswer}
                    disabled={!isReadyToCheck}
                    className={`w-full py-3.5 sm:py-4 px-6 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      isReadyToCheck
                        ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.99]'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                    }`}
                  >
                    <span>SPRAWDŹ</span>
                    <span className="hidden md:inline-flex text-[10px] font-mono font-bold opacity-75 bg-black/25 px-1.5 py-0.5 rounded">Enter ↵</span>
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </button>
                )}
                <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
                  <Info className="w-3.5 h-3.5" />
                  <span>
                    {isOpenTask 
                      ? 'Naciśnij Enter aby sprawdzić dowód z Tutorem AI' 
                      : isNumericTask 
                        ? 'Wpisz liczbę i naciśnij Enter' 
                        : isTrueFalseTask
                          ? 'Oceń wszystkie zdania i naciśnij Enter'
                          : isTwoPartTask
                            ? 'Zaznacz obie części zdania i naciśnij Enter'
                            : 'Wybierz opcję klawiszami 1-4 / A-D lub kliknij'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Compact Bottom Summary Bar - Answers stay 100% visible, zero truncation */
            <motion.div
              key="feedback-bottom-bar"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className={`w-full border-t-2 px-4 py-3 sm:py-3.5 min-h-[88px] flex items-center backdrop-blur-md shadow-2xl ${
                isCorrect 
                  ? 'bg-[#0B1A16]/95 border-emerald-500 shadow-[0_-8px_25px_rgba(16,185,129,0.2)]' 
                  : 'bg-[#1C0F14]/95 border-rose-500 shadow-[0_-8px_25px_rgba(244,63,94,0.2)]'
              }`}
            >
              <div className="w-full max-w-2xl mx-auto flex items-center justify-between gap-3">
                {/* Status Section (Left) - Bez ucinania tekstu */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border ${
                    isCorrect 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                      : 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                  }`}>
                    {isCorrect ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                    ) : (
                      <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`font-bold text-sm sm:text-base leading-snug whitespace-normal ${
                      isCorrect ? 'text-emerald-300' : 'text-rose-300'
                    }`}>
                      {isCorrect ? 'Świetnie! Poprawna odpowiedź' : 'Niepoprawna odpowiedź'}
                    </div>
                    {!isCorrect && (
                      <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                        Prawidłowa: <span className="font-bold text-white font-mono bg-white/10 px-1.5 py-0.5 rounded">{correctAnswerLabel}</span>
                      </div>
                    )}
                    {/* View Explanation Trigger */}
                    <button
                      type="button"
                      onClick={() => setShowExplanation(prev => !prev)}
                      className="mt-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition underline underline-offset-2 whitespace-nowrap"
                    >
                      <BookOpen size={13} />
                      <span>Zobacz wyjaśnienie {showExplanation ? '▴' : '▾'}</span>
                    </button>
                  </div>
                </div>

                {/* Primary CTA (Right): Dalej → lub Ukończ lekcję */}
                <button
                  id="session-next-step-button"
                  onClick={handleNextStep}
                  className={`h-11 sm:h-12 px-5 sm:px-6 rounded-xl font-black text-sm flex items-center justify-center gap-1.5 transition active:scale-[0.98] shadow-lg cursor-pointer shrink-0 ${
                    isCorrect
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                      : 'bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.35)]'
                  }`}
                >
                  <span>
                    {isCorrect && correctAnswersCount >= targetCorrectAnswers
                      ? 'Ukończ lekcję'
                      : 'Dalej'}
                  </span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
      )}

      {/* ================= EXPLANATION & MATURA TRAP MODAL (ON-DEMAND) ================= */}
      <AnimatePresence>
        {showExplanation && (
          <div 
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowExplanation(false);
            }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="w-full sm:max-w-xl max-h-[85vh] bg-[#0B0F19] border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Wyjaśnienie i Pułapka</h3>
                    <p className="text-xs text-slate-400">{currentTask?.title || 'Zadanie maturalne'}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowExplanation(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
                {/* Pułapka egzaminacyjna (brak etykiety CKE) */}
                {(currentTask?.hints?.level_2 || currentTask?.hint_2 || formulaSheet?.ckeTrap?.description || theoryPill?.trapAlert) && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <AlertTriangle size={15} />
                      <span>Pułapka egzaminacyjna</span>
                    </div>
                    <div className="text-xs sm:text-sm text-amber-100/90 leading-relaxed break-words overflow-x-auto">
                      {renderMicroContent(
                        currentTask?.hints?.level_2 || 
                        currentTask?.hint_2 || 
                        formulaSheet?.ckeTrap?.description || 
                        theoryPill?.trapAlert
                      )}
                    </div>
                  </div>
                )}

                {/* Metodyczne wyjaśnienie zadania */}
                {currentTask?.explanation && (
                  <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                      Krok po kroku:
                    </span>
                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto max-w-full">
                      <MathRenderer content={currentTask.explanation} />
                    </div>
                  </div>
                )}

                {/* Poprawna odpowiedź */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-400 font-medium">Poprawna odpowiedź:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm sm:text-base">
                    {correctAnswerLabel}
                  </span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-950/40 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setShowExplanation(false)}
                  className="w-full sm:w-auto py-2.5 px-6 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
                >
                  Zamknij wyjaśnienie
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= EXIT CONFIRMATION MODAL ================= */}
      <AnimatePresence>
        {showExitModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowExitModal(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
              </div>
              <h2 className="text-lg font-bold text-white mb-2">Przerwać sesję?</h2>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Postęp z tej sesji nie zostanie zapisany w Twoim profilu. Czy na pewno chcesz wyjść do menu?
              </p>
              <div className="flex flex-col gap-2.5">
                <button
                  id="session-modal-stay-button"
                  onClick={() => setShowExitModal(false)}
                  className="w-full py-3.5 px-4 rounded-xl font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition"
                >
                  WRÓĆ DO SESJI
                </button>
                <button
                  id="session-modal-quit-button"
                  onClick={() => {
                    setShowExitModal(false);
                    onCancelSession();
                  }}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition text-sm"
                >
                  PRZERWIJ I WYJDŹ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= FORMULA SHEET DRAWER ================= */}
      <AnimatePresence>
        {showFormulaSheet && (
          <div 
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowFormulaSheet(false);
            }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full max-w-xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <div>
                    <h3 className="font-bold text-white text-base">Karta Wzorów Maturalnych</h3>
                    <p className="text-xs text-slate-400">{formulaSheet?.title || lessonTitle}</p>
                  </div>
                </div>
                <button
                  id="session-formulas-close-button"
                  onClick={() => setShowFormulaSheet(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-5 overflow-y-auto space-y-4">
                {/* Core Formula from Theory Pill */}
                {theoryPill?.coreFormulaLatex && (
                  <div className="bg-cyan-950/25 border border-cyan-500/40 rounded-xl p-4 text-center">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                      Główny Wzór Lekcji (Pigułka Wiedzy)
                    </span>
                    <div className="w-full max-w-full overflow-x-auto py-1 px-2 text-center">
                      <MathRenderer content={theoryPill.coreFormulaLatex} displayMode={true} />
                    </div>
                  </div>
                )}

                {/* Additional Formulas List if provided */}
                {formulaSheet?.formulas && formulaSheet.formulas.length > 0 && (
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Tablice i Tożsamości Maturalne
                    </span>
                    {formulaSheet.formulas.map((f, i) => (
                      <div 
                        key={i} 
                        className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col gap-1"
                      >
                        <span className="text-xs text-slate-400 font-medium">{f.title}</span>
                        <div className="w-full max-w-full overflow-x-auto py-1 px-2 text-center">
                          <MathRenderer content={f.latex} displayMode={true} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Golden Rule */}
                {(theoryPill?.keyTakeaway || formulaSheet?.goldenRule) && (
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                    <span className="font-bold text-emerald-300 block mb-1">Złota Strategia Maturalna:</span>
                    <MathRenderer content={theoryPill?.keyTakeaway || formulaSheet?.goldenRule} />
                  </div>
                )}

                {/* Exam Trap */}
                {(theoryPill?.trapAlert || formulaSheet?.ckeTrap) && (
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Uwaga na Pułapkę Egzaminacyjną!</span>
                    </div>
                    {theoryPill?.trapAlert ? (
                      <div className="text-slate-300 leading-relaxed text-xs">
                        <MathRenderer content={theoryPill.trapAlert} />
                      </div>
                    ) : formulaSheet?.ckeTrap ? (
                      <div className="space-y-1 text-xs">
                        <div className="text-rose-300">
                          <span className="font-semibold">Błąd Typowy: </span>
                          <MathRenderer content={`$${formulaSheet.ckeTrap.error}$`} />
                        </div>
                        <div className="text-emerald-300">
                          <span className="font-semibold">Poprawnie: </span>
                          <MathRenderer content={`$${formulaSheet.ckeTrap.correct}$`} />
                        </div>
                        <div className="text-slate-300 mt-1 leading-relaxed text-[11px]">
                          <MathRenderer content={formulaSheet.ckeTrap.description} />
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex justify-end">
                <button
                  onClick={() => setShowFormulaSheet(false)}
                  className="w-full sm:w-auto py-2.5 px-6 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-white transition"
                >
                  Zamknij kartę wzorów
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};
