import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Lightbulb, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  Check, 
  X, 
  RefreshCw, 
  Trophy, 
  Flame, 
  Clock, 
  Target, 
  Maximize2, 
  Minimize2, 
  BookOpen,
  Zap,
  RotateCcw,
  Award,
  PenTool,
  Send,
  HelpCircle,
  Bot,
  Loader2,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { triggerHaptic, playSuccessSound, parseSolutionSteps, FormattedSolutionStep } from '../utils';
import { MathText } from './MathText';
import { MathRenderer } from './MathRenderer';
import { Badge } from './Badge';
import { CkeScratchpad } from './CkeScratchpad';
import { OpenTaskWorkspace } from './OpenTaskWorkspace';
import { SessionRunner } from './SessionRunner';
import { TaskCelebrationScreen } from './TaskCelebrationScreen';
import { TaskRetryScreen } from './TaskRetryScreen';
import { TheoryFlashcards, TheoryCardItem, buildTheoryCards, parseTheoryCards } from './TheoryFlashcards';
import { UserState, MathTaskItem, TaskOption, TaskSolutionStep } from '../types';

interface TaskViewProps {
  taskData?: any;
  userState?: UserState;
  onCompleteTask: (taskIds?: string | string[], stars?: number, earnedXp?: number, earnedCoins?: number, nextLesson?: any) => void;
  onCancelTask: () => void;
}

export function TaskView({ taskData, userState, onCompleteTask, onCancelTask }: TaskViewProps) {
  if (taskData?.isSession) {
    return (
      <SessionRunner 
        sessionData={taskData} 
        userState={userState} 
        onCompleteSession={onCompleteTask} 
        onCancelSession={onCancelTask} 
      />
    );
  }

  // Determine tasks pool for this lesson
  const rawLessonTasks: any[] = (taskData?.lessonTasks && Array.isArray(taskData.lessonTasks) && taskData.lessonTasks.length > 0)
    ? taskData.lessonTasks
    : (taskData ? [taskData] : []);

  const theoryTask = rawLessonTasks.find((t: any) => t.type === 'theory' || t.id?.includes('THEORY'));
  const practiceTasksList = rawLessonTasks.filter((t: any) => t.type !== 'theory' && !t.id?.includes('THEORY'));

  // Initial mode
  const startsWithTheory = Boolean(taskData?.type === 'theory' || taskData?.id?.includes('THEORY'));
  const [isInTheoryMode, setIsInTheoryMode] = useState<boolean>(startsWithTheory);
  const [currentTheoryIndex, setCurrentTheoryIndex] = useState<number>(0);

  // Practice tasks queue
  const initialPracticeQueue = practiceTasksList.length > 0 
    ? practiceTasksList 
    : (startsWithTheory ? [] : [taskData]);

  const [practiceQueue, setPracticeQueue] = useState<any[]>(initialPracticeQueue);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);

  // Retry buffer & phase
  const [mistakesBuffer, setMistakesBuffer] = useState<any[]>([]);
  const [isRetryPhase, setIsRetryPhase] = useState<boolean>(false);
  const [showRetryInterstitial, setShowRetryInterstitial] = useState<boolean>(false);

  // Statistics for Star Rating and Rewards
  const [firstPassMistakesCount, setFirstPassMistakesCount] = useState<number>(0);
  const [firstAttemptCorrectCount, setFirstAttemptCorrectCount] = useState<number>(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [accumulatedXp, setAccumulatedXp] = useState<number>(startsWithTheory ? 5 : 0);
  const [accumulatedCoins, setAccumulatedCoins] = useState<number>(2);

  // Active question interaction state
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [twoPart1, setTwoPart1] = useState<string>('');
  const [twoPart2, setTwoPart2] = useState<string>('');
  const [tfSelections, setTfSelections] = useState<Record<string, 'P' | 'F'>>({});
  const [numericValue, setNumericValue] = useState<string>('');
  const [openProofText, setOpenProofText] = useState<string>('');
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeIncorrect, setShakeIncorrect] = useState<boolean>(false);
  const [showSolutionSteps, setShowSolutionSteps] = useState<boolean>(false);

  // Scratchpad Bottom Sheet state
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [scratchpadDataUrl, setScratchpadDataUrl] = useState<string>('');

  // Scroll refs for question and solution steps
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to feedback/solution when evaluated or steps toggled
  useEffect(() => {
    if (isEvaluated) {
      const timer = setTimeout(() => {
        if (solutionRef.current) {
          solutionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [isEvaluated, showSolutionSteps]);

  // Hints drawer state (Static CKE hints only for closed tasks)
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [unlockedHintLevel, setUnlockedHintLevel] = useState<number>(1);
  
  // Socratic AI Tutor state (Active strictly for OPEN_PROOF tasks)
  const [showOpenProofTutorSheet, setShowOpenProofTutorSheet] = useState<boolean>(false);
  const [aiTutorResponse, setAiTutorResponse] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Celebration state
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const activeTask: any = isInTheoryMode 
    ? (theoryTask || taskData)
    : (practiceQueue[currentTaskIndex] || taskData || {});

  // Determine Task Type (supporting both standard and legacy)
  const taskType: string = (() => {
    if (activeTask.type === 'theory' || activeTask.id?.includes('THEORY')) return 'theory';
    if (activeTask.type === 'SINGLE_CHOICE' || activeTask.type === 'MULTI_CHOICE') {
      return activeTask.type;
    }
    if (activeTask.type === 'NUMERIC_INPUT' || activeTask.type === 'OPEN_PROOF' || activeTask.type === 'OPEN_TASK') {
      return activeTask.type;
    }
    // Infer for legacy tasks with options:
    if (activeTask.options && Array.isArray(activeTask.options) && activeTask.options.length > 0) {
      return (activeTask.required_selections_count && activeTask.required_selections_count > 1) ? 'MULTI_CHOICE' : 'SINGLE_CHOICE';
    }
    if (activeTask.question && activeTask.question.includes('A)') && activeTask.question.includes('B)')) {
      const isMulti = /wybierz\s+(dwie|2|trzy|3)/i.test(activeTask.question);
      return isMulti ? 'MULTI_CHOICE' : 'SINGLE_CHOICE';
    }
    if (activeTask.method === 'Dowód' || activeTask.title?.toLowerCase().includes('dowód')) {
      return 'OPEN_PROOF';
    }
    // Any task without multiple choice options is an OPEN TASK (calculation or proof)
    return 'OPEN_TASK';
  })();

  // Parse or normalize options
  const normalizedOptions: TaskOption[] = (() => {
    if (activeTask.options && Array.isArray(activeTask.options) && activeTask.options.length > 0) {
      return activeTask.options;
    }
    // Fallback: parse lines like "A) $3^3$" from legacy question string
    if (activeTask.question) {
      const lines = activeTask.question.split('\n');
      const parsed: TaskOption[] = [];
      const key = (activeTask.officialKey || '').toUpperCase();

      lines.forEach((line: string) => {
        const match = line.match(/^([A-F])[\).]\s+(.*)/i);
        if (match) {
          const optId = match[1].toUpperCase();
          const content = match[2].trim();
          const isCorr = key.includes(optId);
          parsed.push({ id: optId, content_latex: content, is_correct: isCorr });
        }
      });
      return parsed;
    }
    return [];
  })();

  // Formatted solution steps with individual cards, highlighted titles, and spacing
  const solutionSteps = React.useMemo<FormattedSolutionStep[]>(() => {
    if (activeTask.official_solution_steps && activeTask.official_solution_steps.length > 1) {
      return activeTask.official_solution_steps.map((s: any) => {
        const desc = s.description || '';
        const titleMatch = desc.match(/^\*\*([^*]+)\*\*:\s*([\s\S]*)$/);
        return {
          stepNum: s.step_num,
          label: `Krok ${s.step_num}`,
          title: titleMatch ? titleMatch[1] : undefined,
          content: titleMatch ? titleMatch[2] : desc
        };
      });
    }
    const raw = activeTask.explanation || activeTask.officialKey || activeTask.official_solution_steps?.[0]?.description || activeTask.hints?.level_1 || '';
    return parseSolutionSteps(raw);
  }, [activeTask]);

  const requiredCount: number = activeTask.required_selections_count || (taskType === 'MULTI_CHOICE' ? 2 : 1);

  // Check if user is ready to submit
  const isReadyToVerify = (() => {
    if (isEvaluated) return false;
    if (taskType === 'SINGLE_CHOICE') {
      return selectedOptions.length === 1;
    }
    if (taskType === 'MULTI_CHOICE') {
      return selectedOptions.length === requiredCount;
    }
    if (taskType === 'TWO_PART') {
      return twoPart1 !== '' && twoPart2 !== '';
    }
    if (taskType === 'TRUE_FALSE') {
      const statements = activeTask.statements || [];
      return statements.length > 0 && statements.every((s: any) => Boolean(tfSelections[s.id]));
    }
    if (taskType === 'NUMERIC_INPUT' || taskType === 'OPEN_TASK') {
      return numericValue.trim().length > 0 || scratchpadDataUrl.length > 50;
    }
    if (taskType === 'OPEN_PROOF') {
      return openProofText.trim().length > 0 || numericValue.trim().length > 0 || scratchpadDataUrl.length > 50;
    }
    return false;
  })();

  // Trigger celebration confetti
  const triggerCelebration = () => {
    setIsCompleted(true);
    triggerHaptic('success');
    playSuccessSound();

    const end = Date.now() + 2000;
    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: ['#F59E0B', '#FACC15', '#FFE885', '#00C2FF']
      });
    }, 250);
  };

  // Option selection handler
  const handleSelectOption = (optId: string) => {
    if (isEvaluated) return;
    triggerHaptic('light');

    if (taskType === 'MULTI_CHOICE') {
      setSelectedOptions(prev => {
        if (prev.includes(optId)) {
          return prev.filter(id => id !== optId);
        } else {
          if (prev.length < requiredCount) {
            return [...prev, optId];
          } else {
            return [...prev.slice(1), optId];
          }
        }
      });
    } else {
      setSelectedOptions([optId]);
    }
  };

  // Desktop keyboard shortcuts: 1-4/A-D for options, Enter/Space for checking/proceeding, Esc to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in text inputs or textareas
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') return;

      if (isCompleted || showRetryInterstitial || isScratchpadOpen || showHintModal || showOpenProofTutorSheet) return;

      const key = e.key.toUpperCase();
      const code = e.code;

      if (!isEvaluated && taskType === 'SINGLE_CHOICE' && normalizedOptions.length > 0) {
        let chosenId: string | null = null;
        if (key === '1' || key === 'A') chosenId = normalizedOptions[0]?.id;
        else if (key === '2' || key === 'B') chosenId = normalizedOptions[1]?.id;
        else if (key === '3' || key === 'C') chosenId = normalizedOptions[2]?.id;
        else if (key === '4' || key === 'D') chosenId = normalizedOptions[3]?.id;

        if (chosenId) {
          e.preventDefault();
          handleSelectOption(chosenId);
          return;
        }
      }

      if (key === 'ENTER' || code === 'Space') {
        e.preventDefault();
        if (isInTheoryMode) {
          // Trigger next card
          if (currentTheoryIndex < buildTheoryCards(theoryTask || activeTask).length - 1) {
            setCurrentTheoryIndex(i => i + 1);
          } else {
            if (practiceQueue.length > 0) {
              setCurrentTaskIndex(0);
              setIsInTheoryMode(false);
            } else {
              triggerCelebration();
            }
          }
          return;
        }

        if (!isEvaluated) {
          if (isReadyToVerify) {
            handleVerifyAnswer();
          }
        } else {
          handleNextQuestion();
        }
        return;
      }

      if (key === 'ESCAPE') {
        e.preventDefault();
        onCancelTask();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isCompleted, 
    showRetryInterstitial, 
    isScratchpadOpen, 
    showHintModal, 
    showOpenProofTutorSheet, 
    isEvaluated, 
    taskType, 
    normalizedOptions, 
    isReadyToVerify,
    isInTheoryMode,
    currentTheoryIndex,
    theoryTask,
    activeTask,
    practiceQueue
  ]);

  // Verification Handler
  const handleVerifyAnswer = () => {
    if (!isReadyToVerify) return;
    triggerHaptic('medium');
    setIsEvaluated(true);

    let evaluatedCorrect = false;

    if (taskType === 'SINGLE_CHOICE') {
      const selected = selectedOptions[0];
      const correctOpt = normalizedOptions.find(o => o.is_correct);
      evaluatedCorrect = correctOpt ? correctOpt.id === selected : false;
    } else if (taskType === 'MULTI_CHOICE') {
      const correctIds = normalizedOptions.filter(o => o.is_correct).map(o => o.id).sort().join(',');
      const selectedSorted = [...selectedOptions].sort().join(',');
      evaluatedCorrect = selectedSorted === correctIds;
    } else if (taskType === 'TWO_PART') {
      const correctRaw = String(activeTask.correct_answer || activeTask.correctAnswer || activeTask.officialKey || '').trim();
      const expected1 = activeTask.part_1?.correct || activeTask.correct_combination?.[0] || (correctRaw.length >= 1 ? correctRaw[0] : '');
      const expected2 = activeTask.part_2?.correct || activeTask.correct_combination?.[1] || (correctRaw.length >= 2 ? correctRaw.slice(1).replace(/[^0-9A-Za-z]/g, '') : '');
      
      const matches1 = twoPart1.toUpperCase() === String(expected1).toUpperCase();
      const matches2 = twoPart2.toUpperCase() === String(expected2).toUpperCase();
      evaluatedCorrect = matches1 && matches2;
    } else if (taskType === 'TRUE_FALSE') {
      const statements = activeTask.statements || [];
      evaluatedCorrect = statements.length > 0 && statements.every((s: any) => tfSelections[s.id] === s.correct);
    } else if (taskType === 'NUMERIC_INPUT' || taskType === 'OPEN_TASK') {
      const rawExpected = String(activeTask.numeric_correct_answer || '').trim();
      const normalizeMath = (str: string) => {
        return str
          .toLowerCase()
          .replace(/\s+/g, '')
          .replace(/,/g, '.')
          .replace(/[{}]/g, '')
          .replace(/\\cdot/g, '*')
          .replace(/\*/g, '');
      };

      const expected = normalizeMath(rawExpected);
      const entered = normalizeMath(numericValue);

      if (rawExpected) {
        evaluatedCorrect = entered === expected;
        // Also allow comparing fractions to decimals (e.g. 1/2 == 0.5)
        if (!evaluatedCorrect && rawExpected.includes('/') && !isNaN(Number(numericValue.replace(',', '.')))) {
          const [num, den] = rawExpected.split('/').map(Number);
          if (den !== 0 && Math.abs(num / den - Number(numericValue.replace(',', '.'))) < 0.001) {
            evaluatedCorrect = true;
          }
        }
      } else {
        // Multi-step calculation or whiteboard answer
        evaluatedCorrect = true;
      }
      setShowSolutionSteps(true);
    } else if (taskType === 'OPEN_PROOF') {
      // In open proof, user self-evaluates or gets verified
      evaluatedCorrect = true;
      setShowSolutionSteps(true);
    }

    setIsCorrect(evaluatedCorrect);

    if (evaluatedCorrect) {
      triggerHaptic('success');
      playSuccessSound();

      if (!isRetryPhase) {
        setFirstAttemptCorrectCount(c => c + 1);
        setAccumulatedXp(x => x + 10);
        setAccumulatedCoins(c => c + 3);
        setCompletedTaskIds(prev => Array.from(new Set([...prev, activeTask.id])));
      } else {
        setAccumulatedXp(x => x + 5);
        setAccumulatedCoins(c => c + 2);
        setCompletedTaskIds(prev => Array.from(new Set([...prev, activeTask.id])));
        setMistakesBuffer(prev => prev.filter(t => t.id !== activeTask.id));
      }
    } else {
      triggerHaptic('error');
      setShakeIncorrect(true);
      setShowSolutionSteps(true);
      setTimeout(() => setShakeIncorrect(false), 500);

      if (!isRetryPhase) {
        setFirstPassMistakesCount(m => m + 1);
        setMistakesBuffer(prev => {
          if (prev.some(t => t.id === activeTask.id)) return prev;
          return [...prev, activeTask];
        });
      }
    }
  };

  // Advance to next question or trigger retry / completion
  const handleNextQuestion = () => {
    triggerHaptic('medium');

    // Reset interaction states
    setSelectedOptions([]);
    setTwoPart1('');
    setTwoPart2('');
    setTfSelections({});
    setNumericValue('');
    setOpenProofText('');
    setIsEvaluated(false);
    setIsCorrect(null);
    setShowSolutionSteps(false);
    setShowHintModal(false);
    setUnlockedHintLevel(1);
    setAiTutorResponse('');
    setShowOpenProofTutorSheet(false);

    if (currentTaskIndex < practiceQueue.length - 1) {
      setCurrentTaskIndex(idx => idx + 1);
    } else {
      if (!isRetryPhase && mistakesBuffer.length > 0) {
        setShowRetryInterstitial(true);
      } else {
        triggerCelebration();
      }
    }
  };

  // Launch Retry Phase
  const handleStartRetryPhase = () => {
    triggerHaptic('medium');
    setPracticeQueue([...mistakesBuffer]);
    setMistakesBuffer([]);
    setCurrentTaskIndex(0);
    setIsRetryPhase(true);
    setShowRetryInterstitial(false);

    // Reset state
    setSelectedOptions([]);
    setTwoPart1('');
    setTwoPart2('');
    setTfSelections({});
    setNumericValue('');
    setOpenProofText('');
    setIsEvaluated(false);
    setIsCorrect(null);
    setShowSolutionSteps(false);
    setShowHintModal(false);
  };

  // Dedicated Socratic AI Tutor query - strictly for OPEN_PROOF tasks
  const handleAskAiTutor = async () => {
    if (taskType !== 'OPEN_PROOF') return;
    setIsAiLoading(true);
    setShowOpenProofTutorSheet(true);
    triggerHaptic('light');

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: activeTask.math_statement || activeTask.question,
          instruction: activeTask.instruction,
          studentAnswer: openProofText || 'Uczeń prosi o pierwszą ukierunkowaną wskazówkę',
          staticHint: activeTask.hints?.level_1
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiTutorResponse(data.reply || activeTask.hints?.level_1 || 'Zwróć uwagę na rozkład na czynniki i własności liczb naturalnych.');
      } else {
        setAiTutorResponse(activeTask.hints?.level_1 || 'Spróbuj wyłączyć wspólny czynnik przed nawias.');
      }
    } catch {
      setAiTutorResponse(activeTask.hints?.level_1 || 'Zastosuj wzory skróconego mnożenia lub rozkład na czynniki liniowe.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Calculate star rating (1-3 stars)
  const calculatedStars = firstPassMistakesCount === 0 ? 3 : firstPassMistakesCount <= 2 ? 2 : 1;

  // --------------------------------------------------------------------------
  // 1. OFFICIAL SUCCESS / CELEBRATION SCREEN
  // --------------------------------------------------------------------------
  const handleContinue = () => {
    // Ensure all tasks from this lesson (theory + all practice tasks solved) are included
    const allLessonTaskIds = (rawLessonTasks || []).map((t: any) => t.id);
    const allDoneIds = Array.from(new Set([
      ...completedTaskIds,
      ...(theoryTask ? [theoryTask.id] : []),
      ...allLessonTaskIds
    ]));

    onCompleteTask(
      allDoneIds,
      calculatedStars,
      Math.max(15, accumulatedXp),
      Math.max(5, accumulatedCoins),
      taskData?.nextLesson || null
    );
  };

  if (isCompleted) {
    return (
      <TaskCelebrationScreen
        totalEarnedXp={Math.max(15, accumulatedXp)}
        totalEarnedCoins={Math.max(5, accumulatedCoins)}
        streakDays={userState?.streakDays || 1}
        firstPassMistakesCount={firstPassMistakesCount}
        onContinue={handleContinue}
      />
    );
  }

  // --------------------------------------------------------------------------
  // 2. RETRY INTERSTITIAL SCREEN
  // --------------------------------------------------------------------------
  if (showRetryInterstitial) {
    return (
      <TaskRetryScreen
        mistakesCount={mistakesBuffer.length}
        onStartRetryPhase={handleStartRetryPhase}
        onCancelTask={onCancelTask}
      />
    );
  }

  // --------------------------------------------------------------------------
  // 3. THEORY FLASHCARDS (PIGUŁKA WIEDZY)
  // --------------------------------------------------------------------------
  if (isInTheoryMode) {
    const theoryItem = theoryTask || activeTask;

    return (
      <TheoryFlashcards
        theoryItem={theoryItem}
        cards={buildTheoryCards(theoryItem)}
        currentTheoryIndex={currentTheoryIndex}
        setCurrentTheoryIndex={setCurrentTheoryIndex}
        practiceQueueLength={practiceQueue.length}
        onCancelTask={onCancelTask}
        onStartPractice={() => {
          setCurrentTaskIndex(0);
          setIsInTheoryMode(false);
        }}
        onCompleteTheory={triggerCelebration}
      />
    );
  }
  // --------------------------------------------------------------------------
  // 4. UNIWERSALNA "RAMKA AKTYWNOŚCI" (CKE TASK CONTAINER)
  // --------------------------------------------------------------------------
  const progressPercent = practiceQueue.length > 0 
    ? ((currentTaskIndex + (isEvaluated && isCorrect ? 1 : 0)) / practiceQueue.length) * 100 
    : 100;

  const pointsCount = activeTask.points || (activeTask.cke_source?.includes('2 pkt') || taskType === 'MULTI_CHOICE' || taskType === 'OPEN_PROOF' ? 2 : 1);
  const pointsBadge = `${pointsCount} pkt`;
  const instructionText = activeTask.instruction || '';
  const mathStatement = activeTask.math_statement || activeTask.question || '';

  const isShortOptions = normalizedOptions.every(opt => (opt.content_latex || '').length < 35 && !opt.content_latex.includes('\n'));

  return (
    <div className="fixed inset-0 z-50 bg-[#070A0F]/90 backdrop-blur-xl flex items-center justify-center p-0 md:p-6 lg:p-8 overflow-hidden">
      <div className={`w-full h-full h-[100dvh] md:h-[90vh] md:max-h-[850px] md:max-w-[760px] bg-[#0B0E14] md:rounded-[32px] md:border md:border-white/10 md:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,229,255,0.06)] flex flex-col justify-between items-stretch overflow-hidden relative ${shakeIncorrect ? 'animate-shake' : ''}`}>
        {/* -------------------------------------------------------------------- */}
        {/* SECTION 1: HEADER (Compact, Zero-Scroll Sticky Top)                  */}
        {/* -------------------------------------------------------------------- */}
      <header className="shrink-0 px-4 pt-3 pb-2.5 border-b border-white/5 bg-[#0B0E14] flex flex-col gap-2 z-20">
        <div className="flex items-center justify-between">
          {/* Exit button */}
          <button 
            type="button"
            onClick={onCancelTask}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors active:scale-95"
            title="Zamknij zadanie"
          >
            <X size={16} />
          </button>

          {/* Clean Points Badge: strictly "1 pkt" or "2 pkt" */}
          <div className="flex items-center gap-1.5">
            <Badge variant="cyan">
              {pointsBadge}
            </Badge>
            {(activeTask.difficulty === 'Wymagające' || activeTask.difficulty === 'HARD' || activeTask.tags?.includes('Wymagające')) && (
              <Badge variant="amber">
                Wymagające
              </Badge>
            )}
          </div>

          {/* Lesson progress indicator */}
          <div className="flex items-center gap-1.5">
            {isRetryPhase ? (
              <Badge variant="amber" icon={<RotateCcw size={10} />}>
                Poprawka: {currentTaskIndex + 1}/{practiceQueue.length}
              </Badge>
            ) : (
              <span className="text-xs font-bold text-[#8B8D98]">
                {currentTaskIndex + 1}/{practiceQueue.length}
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className={`h-full rounded-full transition-all duration-300 ${
              isRetryPhase ? 'bg-amber-400' : 'bg-[#00C2FF]'
            }`}
            style={{ width: `${Math.min(100, Math.max(8, progressPercent))}%` }}
          />
        </div>
      </header>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 2: BODY (Zero-Scroll Flex Container for Task & Answers)      */}
      {/* -------------------------------------------------------------------- */}
      <main 
        ref={mainScrollRef} 
        className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 pb-28 flex flex-col justify-between items-stretch gap-2.5 custom-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Task Question Card */}
        <div className="bg-[#141C28] border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col gap-2.5 shrink-0">
          {/* Authentic Source & Exam Metadata line above question */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#8B8D98] flex-wrap pb-1 border-b border-white/5">
            <span className="font-bold text-amber-400 uppercase tracking-wide">
              {taskType === 'OPEN_PROOF' ? 'Zadanie Otwarte' : 'Zadanie Maturalne'}
            </span>
            <span className="text-white/20">•</span>
            <span className="font-semibold text-white/90">
              {pointsBadge}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-cyan-400 font-semibold tracking-wide">
              {activeTask.source || activeTask.cke_source || 'Matura Maj 2024 • Zadanie 1'}
            </span>
          </div>

          {instructionText && (
            <div className="text-xs sm:text-sm text-[#8B8D98] font-medium leading-relaxed">
              <MathRenderer content={instructionText} />
            </div>
          )}

          {/* Math Statement - Prominent KaTeX rendered */}
          <div className="text-white font-bold text-base sm:text-lg leading-snug">
            <MathRenderer content={mathStatement} />
          </div>

          {/* Auxiliary Buttons: Brudnopis & Wskazówka */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  setIsScratchpadOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-[#00C2FF] hover:text-[#00E5FF] bg-[#00C2FF]/10 hover:bg-[#00C2FF]/15 border border-[#00C2FF]/25 px-2.5 py-1 rounded-xl transition-all active:scale-95 shadow-[0_0_12px_rgba(0,194,255,0.1)]"
              >
                <PenTool size={12} />
                <span>Brudnopis</span>
                {scratchpadDataUrl.length > 50 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Zawiera zapisane obliczenia" />
                )}
              </button>

              {activeTask.hints?.level_1 && (
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    setShowHintModal(true);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/15 border border-amber-400/25 px-2.5 py-1 rounded-xl transition-all active:scale-95"
                >
                  <Lightbulb size={12} />
                  <span>Wskazówka</span>
                </button>
              )}
            </div>

            {taskType === 'MULTI_CHOICE' && (
              <span className="text-[11px] font-bold text-[#8B8D98] bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                Zaznaczono: <strong className="text-white">{selectedOptions.length}</strong> / {requiredCount}
              </span>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* DYNAMIC ANSWER MODULE DEPENDING ON TYPE                             */}
        {/* ------------------------------------------------------------------ */}

        {/* 1. SINGLE_CHOICE MODULE (2x2 Compact Grid for short math options) */}
        {taskType === 'SINGLE_CHOICE' && (
          <motion.div
            key={`single-options-${activeTask?.id || currentTaskIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={isShortOptions ? "grid grid-cols-2 gap-2 sm:gap-2.5 w-full my-auto" : "grid grid-cols-1 gap-2 w-full my-auto"}
          >
            {normalizedOptions.map(opt => {
              const isSelected = selectedOptions.includes(opt.id);
              const isOptionCorrect = opt.is_correct;

              let cardClasses = isShortOptions 
                ? "h-[52px] sm:h-[56px] px-3 rounded-xl border text-left flex items-center gap-2.5 transition-all select-none overflow-hidden "
                : "p-3 sm:p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all select-none ";
              let badgeClasses = "w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center shrink-0 border ";

              if (!isEvaluated) {
                if (isSelected) {
                  cardClasses += "bg-[#00C2FF]/10 border-[#00C2FF] text-white shadow-[0_0_15px_rgba(0,194,255,0.2)] scale-[1.01]";
                  badgeClasses += "bg-[#00C2FF] text-[#0B131E] border-[#00C2FF]";
                } else {
                  cardClasses += "bg-[#141C28] hover:bg-[#1A2434] border-white/5 hover:border-white/15 text-white/90";
                  badgeClasses += "bg-[#0F1622] text-[#8B8D98] border-white/10";
                }
              } else {
                if (isOptionCorrect) {
                  cardClasses += "bg-emerald-500/15 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                  badgeClasses += "bg-emerald-500 text-white border-emerald-500";
                } else if (isSelected && !isOptionCorrect) {
                  cardClasses += "bg-rose-500/15 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.3)]";
                  badgeClasses += "bg-rose-500 text-white border-rose-500";
                } else {
                  cardClasses += "bg-[#141C28] opacity-40 border-white/5 text-white/60";
                  badgeClasses += "bg-[#0F1622] text-[#8B8D98] border-white/5";
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isEvaluated}
                  onClick={() => handleSelectOption(opt.id)}
                  className={cardClasses}
                >
                  <div className={badgeClasses}>
                    {opt.id}
                  </div>
                  <div className="flex-1 text-xs sm:text-sm font-bold truncate overflow-x-auto">
                    <MathRenderer content={opt.content_latex} />
                  </div>
                  {!isEvaluated && (
                    <span className="hidden md:inline-flex items-center text-[10px] font-mono font-bold text-[#8B8D98] bg-[#0F1622] border border-white/10 px-1.5 py-0.5 rounded mr-1">
                      {opt.id}
                    </span>
                  )}
                  {isEvaluated && isOptionCorrect && (
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  )}
                  {isEvaluated && isSelected && !isOptionCorrect && (
                    <X size={16} className="text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* 2. MULTI_CHOICE MODULE */}
        {taskType === 'MULTI_CHOICE' && (
          <motion.div
            key={`multi-options-${activeTask?.id || currentTaskIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-2 w-full my-auto"
          >
            {normalizedOptions.map(opt => {
              const isSelected = selectedOptions.includes(opt.id);
              const isOptionCorrect = opt.is_correct;

              let cardClasses = "p-3 sm:p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all select-none ";
              let checkboxClasses = "w-6 h-6 rounded-md font-black text-xs flex items-center justify-center shrink-0 border ";

              if (!isEvaluated) {
                if (isSelected) {
                  cardClasses += "bg-[#00C2FF]/10 border-[#00C2FF] text-white shadow-[0_0_15px_rgba(0,194,255,0.2)]";
                  checkboxClasses += "bg-[#00C2FF] text-[#0B131E] border-[#00C2FF]";
                } else {
                  cardClasses += "bg-[#141C28] hover:bg-[#1A2434] border-white/5 hover:border-white/15 text-white/90";
                  checkboxClasses += "bg-[#0F1622] text-transparent border-white/15";
                }
              } else {
                if (isOptionCorrect) {
                  cardClasses += "bg-emerald-500/15 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                  checkboxClasses += "bg-emerald-500 text-white border-emerald-500";
                } else if (isSelected && !isOptionCorrect) {
                  cardClasses += "bg-rose-500/15 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.3)]";
                  checkboxClasses += "bg-rose-500 text-white border-rose-500";
                } else {
                  cardClasses += "bg-[#141C28] opacity-40 border-white/5 text-white/60";
                  checkboxClasses += "bg-[#0F1622] text-transparent border-white/5";
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isEvaluated}
                  onClick={() => handleSelectOption(opt.id)}
                  className={cardClasses}
                >
                  <div className={checkboxClasses}>
                    {isSelected ? <Check size={14} /> : opt.id}
                  </div>
                  <div className="flex-1 text-xs sm:text-sm font-bold leading-snug">
                    <MathRenderer content={opt.content_latex} />
                  </div>
                  {isEvaluated && isOptionCorrect && (
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  )}
                  {isEvaluated && isSelected && !isOptionCorrect && (
                    <X size={16} className="text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* 3. TWO_PART (Two-step Grid Selection: A/B then 1/2/3) */}
        {taskType === 'TWO_PART' && (
          <div className="w-full space-y-4 my-auto py-2">
            {/* Krok 1 */}
            <div className="p-4 rounded-2xl bg-[#141C28] border border-white/10 space-y-2.5 text-left">
              <div className="text-xs sm:text-sm font-bold text-[#00C2FF] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#00C2FF]/20 text-[#00C2FF] text-xs flex items-center justify-center font-bold">1</span>
                <span>{activeTask.part_1?.prompt || 'Wybierz pierwszą część zdania:'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(activeTask.part_1?.options || []).map((opt: any) => {
                  const isSelected = twoPart1 === opt.id;
                  const target1 = (activeTask.part_1?.correct || activeTask.correct_combination?.[0] || (activeTask.correct_answer || activeTask.correctAnswer || '')[0]);
                  const isOptionCorrect = opt.id === target1;

                  let btnClass = 'p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all text-xs sm:text-sm cursor-pointer select-none ';
                  if (!isEvaluated) {
                    btnClass += isSelected 
                      ? 'bg-[#00C2FF]/15 border-[#00C2FF] text-white shadow-[0_0_12px_rgba(0,194,255,0.2)]'
                      : 'bg-[#0B0E14] border-white/10 hover:border-white/20 text-white/90';
                  } else {
                    if (isOptionCorrect) {
                      btnClass += 'bg-emerald-500/15 border-emerald-500 text-emerald-100';
                    } else if (isSelected && !isOptionCorrect) {
                      btnClass += 'bg-rose-500/15 border-rose-500 text-rose-100';
                    } else {
                      btnClass += 'bg-[#0B0E14]/40 border-white/5 opacity-40 text-white/40';
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
                      <span className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border ${
                        isSelected ? 'bg-[#00C2FF] text-[#0B131E] border-[#00C2FF]' : 'bg-white/5 border-white/10 text-white/80'
                      }`}>
                        {opt.id}
                      </span>
                      <div className="flex-1 font-medium">
                        <MathRenderer content={opt.text || opt.content_latex || ''} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Krok 2 */}
            <div className="p-4 rounded-2xl bg-[#141C28] border border-white/10 space-y-2.5 text-left">
              <div className="text-xs sm:text-sm font-bold text-[#00C2FF] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#00C2FF]/20 text-[#00C2FF] text-xs flex items-center justify-center font-bold">2</span>
                <span>{activeTask.part_2?.prompt || 'Wybierz uzasadnienie:'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {(activeTask.part_2?.options || []).map((opt: any) => {
                  const isSelected = twoPart2 === opt.id;
                  const target2 = (activeTask.part_2?.correct || activeTask.correct_combination?.[1] || (activeTask.correct_answer || activeTask.correctAnswer || '')[1]);
                  const isOptionCorrect = opt.id === target2;

                  let btnClass = 'p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all text-xs sm:text-sm cursor-pointer select-none ';
                  if (!isEvaluated) {
                    btnClass += isSelected 
                      ? 'bg-[#00C2FF]/15 border-[#00C2FF] text-white shadow-[0_0_12px_rgba(0,194,255,0.2)]'
                      : 'bg-[#0B0E14] border-white/10 hover:border-white/20 text-white/90';
                  } else {
                    if (isOptionCorrect) {
                      btnClass += 'bg-emerald-500/15 border-emerald-500 text-emerald-100';
                    } else if (isSelected && !isOptionCorrect) {
                      btnClass += 'bg-rose-500/15 border-rose-500 text-rose-100';
                    } else {
                      btnClass += 'bg-[#0B0E14]/40 border-white/5 opacity-40 text-white/40';
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
                      <span className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border ${
                        isSelected ? 'bg-[#00C2FF] text-[#0B131E] border-[#00C2FF]' : 'bg-white/5 border-white/10 text-white/80'
                      }`}>
                        {opt.id}
                      </span>
                      <div className="flex-1 font-medium">
                        <MathRenderer content={opt.text || opt.content_latex || ''} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 4. TRUE_FALSE (P / F Statement Selection) */}
        {taskType === 'TRUE_FALSE' && (
          <div className="w-full space-y-3 my-auto py-2">
            <div className="text-xs sm:text-sm font-semibold text-white/80 flex items-center justify-between px-1">
              <span>Oceń prawdziwość zdań:</span>
              <span className="text-[11px] text-white/50">Wybierz P (Prawda) lub F (Fałsz)</span>
            </div>
            <div className="space-y-2.5">
              {(activeTask.statements || []).map((stmt: any, idx: number) => {
                const userSelection = tfSelections[stmt.id];
                const isStatementCorrect = isEvaluated && userSelection === stmt.correct;

                return (
                  <div
                    key={stmt.id || idx}
                    className={`p-4 rounded-2xl border transition-all text-left ${
                      isEvaluated
                        ? isStatementCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/30'
                          : 'bg-rose-500/10 border-rose-500/30'
                        : 'bg-[#141C28] border-white/10'
                    } flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="shrink-0 w-6 h-6 rounded-lg bg-[#0B0E14] border border-white/10 text-[#00C2FF] font-bold text-xs flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                        <MathRenderer content={stmt.text || stmt.statement || ''} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {(['P', 'F'] as const).map((opt) => {
                        const isOptSelected = userSelection === opt;
                        const isThisTheCorrectAnswer = stmt.correct === opt;

                        let btnClass = 'w-11 h-10 rounded-xl text-xs font-black flex items-center justify-center transition-all cursor-pointer border select-none ';
                        if (!isEvaluated) {
                          btnClass += isOptSelected
                            ? 'bg-[#00C2FF] border-[#00C2FF] text-[#0B131E] shadow-[0_0_12px_rgba(0,194,255,0.3)]'
                            : 'bg-[#0B0E14] border-white/10 text-white/70 hover:text-white hover:border-white/20';
                        } else {
                          if (isThisTheCorrectAnswer) {
                            btnClass += 'bg-emerald-500 border-emerald-500 text-white';
                          } else if (isOptSelected && !isThisTheCorrectAnswer) {
                            btnClass += 'bg-rose-500 border-rose-500 text-white';
                          } else {
                            btnClass += 'bg-[#0B0E14]/40 border-white/5 text-white/30 opacity-40';
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

        {/* 5. UNIVERSAL OPEN TASK WORKSPACE */}
        {(taskType === 'OPEN_TASK' || taskType === 'OPEN_PROOF' || taskType === 'NUMERIC_INPUT') && (
          <OpenTaskWorkspace
            task={activeTask}
            isEvaluated={isEvaluated}
            isCorrect={isCorrect}
            value={numericValue}
            onChangeValue={(val) => {
              setNumericValue(val);
              setOpenProofText(val);
            }}
            savedCanvasDataUrl={scratchpadDataUrl}
            onSaveCanvasData={(dataUrl) => setScratchpadDataUrl(dataUrl)}
            onOpenScratchpad={() => setIsScratchpadOpen(true)}
            onSubmit={handleVerifyAnswer}
            onAskAiTutor={taskType === 'OPEN_PROOF' ? handleAskAiTutor : undefined}
          />
        )}
      </main>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 3: BOTTOM PANEL / BOTTOM SHEET (Duolingo-style Feedback)      */}
      {/* -------------------------------------------------------------------- */}
      {!isEvaluated ? (
        <footer className="shrink-0 p-4 border-t border-white/5 bg-[#0B0E14] z-20 flex flex-col gap-2.5" style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
          {/* Main Action Button (No lonely hanging hint here - hint is next to scratchpad) */}
          <button
            type="button"
            disabled={!isReadyToVerify}
            onClick={handleVerifyAnswer}
            className={`w-full py-3.5 px-6 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 select-none ${
              isReadyToVerify
                ? 'bg-[#00C2FF] hover:bg-[#00B4E6] border-b-4 border-[#0099CC] text-[#0B131E] active:translate-y-1 active:border-b-0 shadow-[0_0_20px_rgba(0,194,255,0.25)]'
                : 'bg-white/5 text-[#8B8D98] border border-white/5 cursor-not-allowed opacity-60'
            }`}
          >
            <span>SPRAWDŹ</span>
            <span className="hidden md:inline-flex text-[10px] font-mono font-bold opacity-75 bg-black/25 px-1.5 py-0.5 rounded">Enter ↵</span>
            <ArrowRight size={16} />
          </button>
        </footer>
      ) : (
        /* MODERN BOTTOM SHEET FOR EVALUATED ANSWER (Smooth internal scroll, zero cutoff) */
        <motion.footer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className={`shrink-0 p-4 border-t z-30 flex flex-col gap-3 rounded-t-2xl shadow-2xl max-h-[60vh] ${
            isCorrect
              ? 'bg-[#0E1C1A] border-emerald-500/30'
              : 'bg-[#181216] border-rose-500/30'
          }`}
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          {/* Header with state and discrete pill */}
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {isCorrect ? <Check size={16} className="stroke-[3]" /> : <X size={16} className="stroke-[3]" />}
              </div>
              <span className={`font-display font-black text-base ${
                isCorrect ? 'text-emerald-300' : 'text-rose-300'
              }`}>
                {isCorrect 
                  ? (isRetryPhase ? 'Poprawione! Świetna robota' : 'Poprawna odpowiedź!') 
                  : 'Niepoprawna odpowiedź'}
              </span>
            </div>

            {/* Discrete info pill */}
            <div>
              {isCorrect ? (
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  {isRetryPhase ? '+5 XP' : '+10 XP'}
                </span>
              ) : (
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                  Pętla powtórkowa
                </span>
              )}
            </div>
          </div>

          {/* Internal scrollable container for solution and steps with safe padding - never cut off under button */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-1 pb-8">
            {/* Header for solution section */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#00C2FF] flex items-center gap-1.5">
                <BookOpen size={13} className="text-[#00C2FF]" />
                {isCorrect ? 'Oficjalne rozwiązanie maturalne:' : 'Wyjaśnienie i kroki rozwiązania:'}
              </span>
              {isCorrect && solutionSteps.length > 1 && (
                <button
                  type="button"
                  onClick={() => setShowSolutionSteps(!showSolutionSteps)}
                  className="text-[11px] font-bold text-[#00C2FF] hover:underline flex items-center gap-1"
                >
                  <span>{showSolutionSteps ? 'Zwiń kroki' : `Wszystkie kroki (${solutionSteps.length})`}</span>
                  {showSolutionSteps ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              )}
            </div>

            {/* If NOT correct: Show ALL steps separated into individual, clean, highlighted cards */}
            {!isCorrect ? (
              <div className="flex flex-col gap-2.5">
                {solutionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0B0E14]/95 border border-white/10 hover:border-white/20 rounded-xl p-3 sm:p-3.5 flex flex-col gap-2 shadow-sm transition-all"
                  >
                    {/* Step Title / Badge - hide redundant WYJAŚNIENIE badge */}
                    {Boolean(step.title || (step.label && !step.label.toLowerCase().includes('wyjaśnienie'))) && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {step.label && !step.label.toLowerCase().includes('wyjaśnienie') && (
                          <span className="bg-[#00C2FF]/15 text-[#00C2FF] font-black text-[11px] px-2.5 py-0.5 rounded-md border border-[#00C2FF]/30 uppercase tracking-wide shrink-0">
                            {step.label}
                          </span>
                        )}
                        {step.title && (
                          <span className="font-bold text-white text-xs leading-snug">
                            {step.title}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Step Body (KaTeX / Text) */}
                    <div className="text-xs text-white/90 leading-relaxed overflow-x-auto pl-0.5">
                      <MathRenderer content={step.content} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* If CORRECT: Show primary solution, with collapsible detailed breakdown */
              <div className="flex flex-col gap-2.5">
                <div className="bg-[#0B0E14]/95 border border-white/10 rounded-xl p-3 sm:p-3.5 flex flex-col gap-1.5 shadow-sm">
                  {solutionSteps[0]?.title && (
                    <div className="flex items-center gap-2 mb-1">
                      {solutionSteps[0].label && !solutionSteps[0].label.toLowerCase().includes('wyjaśnienie') && (
                        <span className="bg-emerald-500/15 text-emerald-400 font-black text-[10px] px-2 py-0.5 rounded-md border border-emerald-500/30 uppercase">
                          {solutionSteps[0].label}
                        </span>
                      )}
                      <span className="font-bold text-white text-xs">{solutionSteps[0].title}</span>
                    </div>
                  )}
                  <div className="text-xs text-white/90 leading-relaxed overflow-x-auto">
                    <MathRenderer content={solutionSteps[0]?.content || activeTask.explanation || 'Poprawna odpowiedź.'} />
                  </div>
                </div>

                <AnimatePresence>
                  {showSolutionSteps && solutionSteps.length > 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2.5 pt-1"
                    >
                      {solutionSteps.slice(1).map((step, idx) => (
                        <div
                          key={idx}
                          className="bg-[#0F1622] border border-white/10 rounded-xl p-3 flex flex-col gap-1.5 shadow-sm"
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-[#00C2FF]/15 text-[#00C2FF] font-black text-[10px] px-2 py-0.5 rounded-md border border-[#00C2FF]/30">
                              {step.label}
                            </span>
                            {step.title && (
                              <span className="font-bold text-white text-xs">{step.title}</span>
                            )}
                          </div>
                          <div className="text-xs text-white/90 leading-relaxed overflow-x-auto">
                            <MathRenderer content={step.content} />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Full-width bottom action button (no duplicate arrows, pinned below solution) */}
          <button
            type="button"
            onClick={handleNextQuestion}
            className={`w-full py-3.5 px-6 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 group shrink-0 active:translate-y-1 active:border-b-0 ${
              isCorrect
                ? 'bg-[#00C2FF] hover:bg-[#00B4E6] border-b-4 border-[#0099CC] text-[#0B131E] shadow-[0_0_20px_rgba(0,194,255,0.25)]'
                : 'bg-rose-500 hover:bg-rose-600 border-b-4 border-rose-700 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]'
            }`}
          >
            <span>
              {currentTaskIndex < practiceQueue.length - 1 
                ? 'Następne zadanie' 
                : (!isRetryPhase && mistakesBuffer.length > 0)
                  ? 'Przejdź do powtórki'
                  : 'Ukończ lekcję'}
            </span>
            <span className="hidden md:inline-flex text-[10px] font-mono font-bold opacity-75 bg-black/25 px-1.5 py-0.5 rounded">Spacja ␣</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.footer>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* CKE SCRATCHPAD BOTTOM SHEET                                          */}
      {/* -------------------------------------------------------------------- */}
      <CkeScratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
        savedDataUrl={scratchpadDataUrl}
        onSaveData={(dataUrl) => setScratchpadDataUrl(dataUrl)}
        isOpenProof={taskType === 'OPEN_PROOF'}
        taskQuestion={activeTask.math_statement || activeTask.question}
        taskInstruction={activeTask.instruction}
        staticHint={activeTask.hints?.level_1}
        studentText={openProofText}
      />

      {/* -------------------------------------------------------------------- */}
      {/* STATIC HINT DRAWER / MODAL (FOR CLOSED & OPEN TASKS, NO AI BOTS)    */}
      {/* -------------------------------------------------------------------- */}
      <AnimatePresence>
        {showHintModal && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHintModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="relative z-10 w-full max-w-xl mx-auto bg-[#141C28] border-t border-white/15 rounded-t-3xl p-5 shadow-2xl flex flex-col gap-4 pointer-events-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb size={18} className="text-amber-400" />
                  <span className="font-display font-bold text-white text-base">
                    Wskazówki do zadania
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHintModal(false)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Level 1 Static Hint */}
              <div className="bg-[#0B0E14] border border-white/10 rounded-xl p-3.5 text-xs text-white/90 leading-relaxed">
                <div className="font-bold text-amber-400 mb-1 flex items-center gap-1">
                  <span>Wskazówka (Karta Wzorów):</span>
                </div>
                <MathRenderer content={activeTask.hints?.level_1 || 'Zwróć uwagę na sprowadzenie wyrażeń do wspólnej postaci i odpowiednie wzory maturalne.'} />
              </div>

              {/* Level 2 Static Hint */}
              {unlockedHintLevel >= 2 ? (
                <div className="bg-[#0B0E14] border border-white/10 rounded-xl p-3.5 text-xs text-white/90 leading-relaxed">
                  <div className="font-bold text-[#00C2FF] mb-1 flex items-center gap-1">
                    <span>Krok rozwiązania:</span>
                  </div>
                  <MathRenderer content={activeTask.hints?.level_2 || 'Podstaw odpowiednie wzory skróconego mnożenia lub twierdzenia o potęgach i logarytmach.'} />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    setUnlockedHintLevel(2);
                  }}
                  className="py-2.5 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-xs font-bold text-white/80 hover:text-white transition-all text-center"
                >
                  Odblokuj kolejny krok (Poziom 2)
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------------- */}
      {/* DEDICATED SOCRATIC AI TUTOR BOTTOM SHEET (OPEN_PROOF ONLY, MAX 35%)  */}
      {/* -------------------------------------------------------------------- */}
      <AnimatePresence>
        {taskType === 'OPEN_PROOF' && showOpenProofTutorSheet && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOpenProofTutorSheet(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="relative z-10 w-full max-w-xl mx-auto max-h-[35vh] bg-[#141C28] border-t border-white/15 rounded-t-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3 overflow-y-auto custom-scrollbar pointer-events-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Bot size={18} className="text-[#00C2FF]" />
                  <span className="font-display font-bold text-white text-sm sm:text-base">
                    Wskazówka Tutora (Metoda sokratejska)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOpenProofTutorSheet(false)}
                  className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="text-xs sm:text-sm text-white/95 leading-relaxed py-1">
                {isAiLoading ? (
                  <div className="flex items-center gap-2 text-[#00C2FF] py-3 font-bold">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Tutor analizuje zadanie i Twoje rozumowanie...</span>
                  </div>
                ) : (
                  <MathRenderer content={aiTutorResponse || activeTask.hints?.level_1 || 'Zwróć uwagę na rozkład na czynniki liniowe lub wyłączenie wspólnego składnika przed nawias.'} />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
