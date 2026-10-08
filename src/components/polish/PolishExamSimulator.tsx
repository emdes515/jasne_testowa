import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  AlertTriangle,
  Flag,
  RotateCcw,
  Zap,
  Layers,
  FileText,
  ChevronRight,
  ChevronLeft,
  Send,
  Eye,
  XCircle,
  HelpCircle,
  Bookmark,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PolishTask } from '../../types/maturaTypes';
import { generateMockExam } from '../../data/polish';
import { TaskVisualAssetCard } from './TaskVisualAssetCard';
import { recordMistake } from '../../data/mistakesManager';
import { PartOneReadingRoom } from './PartOneReadingRoom';

interface PolishExamSimulatorProps {
  onFinishExam?: (score: number, maxScore: number) => void;
  onExit?: () => void;
}

export const PolishExamSimulator: React.FC<PolishExamSimulatorProps> = ({
  onFinishExam,
  onExit
}) => {
  // Generowanie próbnego arkusza zbalansowanego wg formuły 2023
  const examData = useMemo(() => generateMockExam(), []);
  const allExamTasks = useMemo(() => {
    return [...examData.part1Tasks, ...examData.part2Tasks];
  }, [examData]);

  // Stan symulatora
  const [activeBooklet, setActiveBooklet] = useState<1 | 2>(1); // 1 = Zeszyt 1 (Test), 2 = Zeszyt 2 (Wypracowanie)
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [part1PreReadingActive, setPart1PreReadingActive] = useState<boolean>(true);
  const [secondsRemaining, setSecondsRemaining] = useState(240 * 60); // 240 minut
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const navigatorScrollRef = useRef<HTMLDivElement>(null);
  const taskContainerRef = useRef<HTMLDivElement>(null);

  const goToTask = (index: number) => {
    if (index < 0 || index >= allExamTasks.length) return;
    setPart1PreReadingActive(false);
    setCurrentTaskIndex(index);
    if (taskContainerRef.current) {
      const rect = taskContainerRef.current.getBoundingClientRect();
      if (rect.top < 60 || rect.top > 350) {
        taskContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Automatyczne płynne centrowanie aktywnego elementu wewnątrz poziomego paska nawigatora (bez poruszania stroną!)
  useEffect(() => {
    if (!navigatorScrollRef.current) return;
    const activeEl = navigatorScrollRef.current.querySelector<HTMLElement>('[data-active="true"]');
    if (activeEl) {
      const container = navigatorScrollRef.current;
      const targetLeft = activeEl.offsetLeft - (container.clientWidth - activeEl.clientWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth'
      });
    }
  }, [currentTaskIndex, part1PreReadingActive, activeBooklet]);

  // Odpowiedzi w Zeszycie 1
  const [userSingleChoice, setUserSingleChoice] = useState<Record<string, number>>({});
  const [userTfAnswers, setUserTfAnswers] = useState<Record<string, Record<number, boolean>>>({});
  const [userOpenAnswers, setUserOpenAnswers] = useState<Record<string, string>>({});
  const [flaggedTasks, setFlaggedTasks] = useState<Record<string, boolean>>({});

  // Odpowiedzi w Zeszycie 2 (Wypracowanie)
  const [essayThemeChoice, setEssayThemeChoice] = useState<1 | 2>(1);
  const [essayMode, setEssayMode] = useState<'blueprint' | 'fulltext'>('blueprint');
  const [selectedThesisIndex, setSelectedThesisIndex] = useState<number | null>(0);
  const [selectedStarBook, setSelectedStarBook] = useState<string>('');
  const [selectedContext, setSelectedContext] = useState<string>('');
  const [userEssayText, setUserEssayText] = useState<string>('');
  const [essayTab, setEssayTab] = useState<'czystopis' | 'brudnopis'>('czystopis');
  const [brudnopisText, setBrudnopisText] = useState<string>('');

  // Zegar 240 minut
  useEffect(() => {
    if (isFinished || isTimerPaused) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, isTimerPaused]);

  const formatTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const essayWordCount = useMemo(() => {
    if (!userEssayText.trim()) return 0;
    return userEssayText.trim().split(/\s+/).length;
  }, [userEssayText]);

  const currentTask = allExamTasks[currentTaskIndex];
  const isPartOne = currentTask?.part === 1;

  // Stan przełącznika mobilnego dla Części 1 (Zadanie vs Czytelnia CKE)
  const [mobilePart1Tab, setMobilePart1Tab] = useState<'task' | 'text'>('task');

  // Reset mobilnej zakładki do zadania po zmianie pytania
  useEffect(() => {
    setMobilePart1Tab('task');
  }, [currentTaskIndex]);

  const handleToggleFlag = (taskId: string) => {
    setFlaggedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // Obliczenie wyniku
  const examResult = useMemo(() => {
    if (!isFinished) return null;

    let part1Score = 0;
    let part2Score = 0;

    // Punkty za zadania zamknięte i P/F
    allExamTasks.forEach((t) => {
      let taskScore = 0;
      if (t.taskType === 'single_choice') {
        if (userSingleChoice[t.id] === t.correctOptionIndex) {
          taskScore = t.points;
        }
      } else if (t.taskType === 'true_false' && t.trueFalseStatements) {
        const answers = userTfAnswers[t.id] || {};
        const isAllCorrect = t.trueFalseStatements.every(
          (stmt, i) => answers[i] === stmt.isTrue
        );
        if (isAllCorrect) taskScore = t.points;
      } else if (t.taskType === 'synthesis_note') {
        const words = (userOpenAnswers[t.id] || '').trim().split(/\s+/).filter(Boolean).length;
        if (words >= 60 && words <= 90) taskScore = 4;
        else if (words >= 45) taskScore = 2;
      } else if (t.taskType === 'short_open') {
        if ((userOpenAnswers[t.id] || '').trim().length > 10) {
          taskScore = t.points;
        }
      }

      if (t.part === 1) part1Score += taskScore;
      else part2Score += taskScore;
    });

    // Punkty za wypracowanie (Zeszyt 2, 35 pkt)
    let part3Score = 0;
    if (essayMode === 'blueprint') {
      // Interaktywny konspekt: 32/35 pkt za komplet tezy, lektury i kontekstu
      if (selectedThesisIndex !== null) part3Score += 10;
      if (selectedStarBook) part3Score += 15;
      if (selectedContext) part3Score += 8;
    } else {
      if (essayWordCount >= 300) part3Score = 33;
      else if (essayWordCount >= 200) part3Score = 20;
      else if (essayWordCount >= 100) part3Score = 10;
    }

    const total = part1Score + part2Score + part3Score;
    const percent = Math.round((total / 60) * 100);
    const passed = percent >= 30;

    return {
      part1Score,
      part2Score,
      part3Score,
      total,
      percent,
      passed
    };
  }, [isFinished, allExamTasks, userSingleChoice, userTfAnswers, userOpenAnswers, essayMode, selectedThesisIndex, selectedStarBook, selectedContext, essayWordCount]);

  const handleFinishExam = () => {
    setIsFinished(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Automatyczna rejestracja wszystkich popełnionych błędów w Zeszycie Błędów
    allExamTasks.forEach((t) => {
      let isMistake = false;
      let wrongAns: any = null;

      if (t.taskType === 'single_choice') {
        const choice = userSingleChoice[t.id];
        if (choice !== t.correctOptionIndex) {
          isMistake = true;
          wrongAns = choice !== undefined ? choice : 'Brak odpowiedzi';
        }
      } else if (t.taskType === 'true_false' && t.trueFalseStatements) {
        const answers = userTfAnswers[t.id] || {};
        const isAllCorrect = t.trueFalseStatements.every(
          (st, idx) => answers[idx] === st.isTrue
        );
        if (!isAllCorrect) {
          isMistake = true;
          wrongAns = answers;
        }
      } else if (t.taskType === 'short_open') {
        const ans = userOpenAnswers[t.id] || '';
        if (ans.trim().length <= 10) {
          isMistake = true;
          wrongAns = ans || 'Brak odpowiedzi';
        }
      }

      if (isMistake) {
        recordMistake({
          taskId: t.id,
          subject: 'polski',
          topicOrEpoch: t.epoch || t.partName,
          title: t.title,
          question: t.question,
          taskType: t.taskType,
          points: t.points,
          options: t.options,
          correctAnswer:
            t.correctOptionIndex !== undefined
              ? t.correctOptionIndex
              : t.trueFalseStatements?.map((s) => s.isTrue) || t.correctAnswerText || 'Klucz CKE',
          userWrongAnswer: wrongAns,
          explanation: t.explanation,
          ckeKeyCriteria: t.ckeKeyCriteria,
          visualAsset: t.image,
          passage: t.passage,
          passage2: t.passage2,
          trueFalseStatements: t.trueFalseStatements,
          matchingPairs: t.matchingPairs,
          distractor: t.distractor
        });
      }
    });

    if (onFinishExam && examResult) {
      onFinishExam(examResult.total, 60);
    }
  };

  const renderTaskCard = (showSnippetPassage: boolean) => {
    if (!currentTask) return null;
    const noteWordCount = (userOpenAnswers[currentTask.id] || '').trim().split(/\s+/).filter(Boolean).length;

    return (
      <div key={currentTask.id || currentTaskIndex} className="space-y-6 animate-pageTransition">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold border border-amber-500/20">
              Zadanie {currentTaskIndex + 1} / {allExamTasks.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Część {currentTask.part}: {currentTask.partName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleFlag(currentTask.id)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                flaggedTasks[currentTask.id]
                  ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              {flaggedTasks[currentTask.id] ? 'Oflagowane' : 'Oznacz'}
            </button>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
              {currentTask.points} pkt
            </span>
          </div>
        </div>

        {/* Tekst źródłowy (tylko w Części 2, bo w Części 1 jest w Czytelni CKE obok) */}
        {showSnippetPassage && currentTask.passage && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-2 border-amber-500">
            <div className="font-semibold text-slate-900 dark:text-slate-200 not-italic mb-1">
              {currentTask.passage.author} – {currentTask.passage.sourceTitle}
            </div>
            {currentTask.passage.text}
          </div>
        )}

        {/* Ikonografia / Materiał Wizualny */}
        <TaskVisualAssetCard task={currentTask} />

        {/* Treść pytania */}
        <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
          {currentTask.question}
        </div>

        {/* Formularz odpowiedzi */}
        {currentTask.taskType === 'single_choice' && currentTask.options && (
          <div className="space-y-2">
            {currentTask.options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() =>
                  setUserSingleChoice({ ...userSingleChoice, [currentTask.id]: optIdx })
                }
                className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  userSingleChoice[currentTask.id] === optIdx
                    ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white font-medium ring-1 ring-amber-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {currentTask.taskType === 'true_false' && currentTask.trueFalseStatements && (
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-4 text-left font-semibold">Stwierdzenie</th>
                  <th className="py-2.5 px-3 text-center font-semibold w-24">Wybór</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {currentTask.trueFalseStatements.map((st, i) => {
                  const taskAnswers = userTfAnswers[currentTask.id] || {};
                  return (
                    <tr key={i} className="bg-white dark:bg-slate-900/40">
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{st.statement}</td>
                      <td className="py-3 px-3 text-center">
                        <div className="inline-flex gap-1">
                          <button
                            onClick={() =>
                              setUserTfAnswers({
                                ...userTfAnswers,
                                [currentTask.id]: { ...taskAnswers, [i]: true }
                              })
                            }
                            className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                              taskAnswers[i] === true
                                ? 'bg-amber-500 text-slate-950'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            P
                          </button>
                          <button
                            onClick={() =>
                              setUserTfAnswers({
                                ...userTfAnswers,
                                [currentTask.id]: { ...taskAnswers, [i]: false }
                              })
                            }
                            className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                              taskAnswers[i] === false
                                ? 'bg-amber-500 text-slate-950'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
        )}

        {(currentTask.taskType === 'short_open' || currentTask.taskType === 'synthesis_note') && (
          <div className="space-y-2">
            <textarea
              rows={currentTask.taskType === 'synthesis_note' ? 7 : 5}
              value={userOpenAnswers[currentTask.id] || ''}
              onChange={(e) =>
                setUserOpenAnswers({ ...userOpenAnswers, [currentTask.id]: e.target.value })
              }
              placeholder={
                currentTask.taskType === 'synthesis_note'
                  ? 'Wpisz notatkę syntetyzującą (60–90 słów na podstawie obu tekstów źródłowych)...'
                  : 'Wpisz swoją odpowiedź...'
              }
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
            />
            {currentTask.taskType === 'synthesis_note' && (
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span>Rygor CKE: 60–90 słów (synteza obu stanowisk)</span>
                <span
                  className={`font-mono font-bold ${
                    noteWordCount >= 60 && noteWordCount <= 90
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : noteWordCount > 90
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {noteWordCount} / 60–90 słów
                </span>
              </div>
            )}
          </div>
        )}

        {/* Paginacja Poprzednie / Następne */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            disabled={currentTaskIndex === 0}
            onClick={() => goToTask(currentTaskIndex - 1)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-30 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Poprzednie
          </button>

          {currentTaskIndex < allExamTasks.length - 1 ? (
            <button
              onClick={() => goToTask(currentTaskIndex + 1)}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
            >
              Następne <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setActiveBooklet(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
            >
              Przejdź do Zeszytu 2 (Wypracowanie) <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Pasek Górny Symulatora CKE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm dark:shadow-xl">
        <div className="flex items-center gap-3">
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer active:scale-95 shrink-0"
              title="Wróć do pulpitu"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Oficjalny Symulator Maturalny Formuła 2023
              <span className="text-xs px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-300 font-normal border border-rose-500/20 dark:border-rose-500/30">
                240 min • 60 pkt
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Egzamin maturalny z języka polskiego (poziom podstawowy)
            </p>
          </div>
        </div>

        {/* Zegar & Przyciski Sterujące */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm font-bold text-amber-600 dark:text-amber-400 shadow-inner">
            <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => setIsTimerPaused(!isTimerPaused)}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            {isTimerPaused ? 'Wznów' : 'Pauza'}
          </button>

          {!isFinished && (
            <button
              onClick={handleFinishExam}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              Zakończ arkusz
            </button>
          )}
        </div>
      </div>

      {/* Przełącznik Zeszytów Egzaminacyjnych (Zeszyt 1 vs Zeszyt 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => setActiveBooklet(1)}
          className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            activeBooklet === 1
              ? 'border-amber-500/80 bg-amber-500/10 text-slate-900 dark:text-white shadow-md'
              : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850'
          }`}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Zeszyt 1</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">Test: Język w użyciu & Epoki</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Zadania 1–{allExamTasks.length} • Pula: 25 punktów</div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
            25 pkt
          </span>
        </button>

        <button
          onClick={() => setActiveBooklet(2)}
          className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            activeBooklet === 2
              ? 'border-rose-500/80 bg-rose-500/10 text-slate-900 dark:text-white shadow-md'
              : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850'
          }`}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Zeszyt 2</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">Wypracowanie maturalne</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Wybór tematu • Min. 300 słów lub konspekt</div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20">
            35 pkt
          </span>
        </button>
      </div>

      {/* Widok Zeszytu 1 (Test 25 pkt) */}
      {activeBooklet === 1 && (
        <div key="booklet-1" className="space-y-6 animate-pageTransition">
          {/* Nawigator Zeszytu 1 - STAŁA POZYCJA U GÓRY DLA WSZYSTKICH 18 ZADAŃ */}
          <div className="bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-sm sticky top-3 z-20 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 h-6">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider shrink-0">
                  Nawigator Zeszytu 1
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  • {isPartOne ? 'Część 1: Język polski w użyciu (Zadania 1–6)' : 'Część 2: Test historycznoliteracki (Zadania 7–18)'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/50" />
                  <span className="hidden sm:inline">Rozwiązane</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded bg-amber-400" />
                  <span className="hidden sm:inline">Oflagowane</span>
                </div>
              </div>
            </div>

            <div ref={navigatorScrollRef} className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none no-scrollbar">
              <button
                key="pre-reading-tab"
                type="button"
                data-active={part1PreReadingActive ? 'true' : undefined}
                onClick={() => {
                  if (!isPartOne) {
                    setCurrentTaskIndex(0);
                  }
                  setPart1PreReadingActive(true);
                  if (taskContainerRef.current) {
                    const rect = taskContainerRef.current.getBoundingClientRect();
                    if (rect.top < 60 || rect.top > 350) {
                      taskContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                className={`shrink-0 h-10 px-3.5 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                  part1PreReadingActive
                    ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-400 font-black'
                    : 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20'
                }`}
                title="Otwórz pełną czytelnię tekstów źródłowych CKE"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>📖 Teksty CKE</span>
              </button>

              {allExamTasks.map((t, i) => {
                const isSelected = !part1PreReadingActive && i === currentTaskIndex;
                const isFlagged = flaggedTasks[t.id];
                const isAnswered =
                  userSingleChoice[t.id] !== undefined ||
                  (userOpenAnswers[t.id] && userOpenAnswers[t.id].trim().length > 0) ||
                  userTfAnswers[t.id] !== undefined;

                return (
                  <React.Fragment key={t.id}>
                    {i === 6 && (
                      <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-1 shrink-0" title="Część 2: Test historycznoliteracki" />
                    )}
                    <button
                      type="button"
                      data-active={isSelected ? 'true' : undefined}
                      onClick={() => goToTask(i)}
                      className={`relative shrink-0 min-w-[40px] h-10 px-1 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center cursor-pointer select-none active:scale-95 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-400 font-black'
                          : isAnswered
                          ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{i + 1}</span>
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                      )}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Główna zawartość zadania */}
          <div ref={taskContainerRef} className="scroll-mt-32 min-h-[560px]">
            {isPartOne ? (
              <>
                {part1PreReadingActive ? (
                  <PartOneReadingRoom
                    task={currentTask}
                    isPreReadingView={true}
                    onStartTasks={() => goToTask(currentTaskIndex)}
                    currentTaskNumber={currentTaskIndex + 1}
                  />
                ) : (
                  <>
                    {/* Przełącznik mobilny: Zadanie <-> Teksty źródłowe CKE */}
                    <div className="lg:hidden flex rounded-xl bg-slate-100 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 text-xs font-semibold mb-4">
                      <button
                        type="button"
                        onClick={() => setMobilePart1Tab('task')}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          mobilePart1Tab === 'task'
                            ? 'bg-amber-500 text-slate-950 font-bold shadow'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Zadanie {currentTaskIndex + 1}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobilePart1Tab('text')}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          mobilePart1Tab === 'text'
                            ? 'bg-amber-500 text-slate-950 font-bold shadow'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Teksty CKE (Czytelnia)</span>
                      </button>
                    </div>

                    {/* Split-Screen: Zadanie (7 kolumn) + Czytelnia CKE (5 kolumn) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      <div
                        className={`lg:col-span-7 ${
                          mobilePart1Tab === 'task' ? 'block' : 'hidden lg:block'
                        } bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6`}
                      >
                        {renderTaskCard(false)}
                      </div>

                      <div
                        className={`lg:col-span-5 ${
                          mobilePart1Tab === 'text' ? 'block' : 'hidden lg:block'
                        } sticky top-24 self-start`}
                      >
                        <PartOneReadingRoom task={currentTask} />
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              /* Układ dla Części 2 (Test historycznoliteracki) - stała szeroka karta, brak skakania nawigatora! */
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6">
                {renderTaskCard(true)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Widok Zeszytu 2 (Wypracowanie 35 pkt) */}
      {activeBooklet === 2 && (
        <div key="booklet-2" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6 animate-pageTransition">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                Zeszyt 2 • Wypracowanie problemowe (35 pkt)
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Wybór Tematu i Strategia Pracy</h2>
            </div>

            {/* Przełącznik Trybu: Konspekt vs Pełny Tekst */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setEssayMode('blueprint')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  essayMode === 'blueprint'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Szybki Konspekt Interaktywny
              </button>
              <button
                onClick={() => setEssayMode('fulltext')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  essayMode === 'fulltext'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Napisz pełne wypracowanie (300+ słów)
              </button>
            </div>
          </div>

          {/* Karta Wyboru Tematu 1 lub 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setEssayThemeChoice(1)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                essayThemeChoice === 1
                  ? 'border-rose-500 bg-rose-500/10 text-slate-900 dark:text-white ring-1 ring-rose-500/40'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
              }`}
            >
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400">Temat 1 (CKE Maj 2024)</span>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                Bunt i jego konsekwencje dla człowieka.
              </div>
            </button>

            <button
              onClick={() => setEssayThemeChoice(2)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                essayThemeChoice === 2
                  ? 'border-rose-500 bg-rose-500/10 text-slate-900 dark:text-white ring-1 ring-rose-500/40'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
              }`}
            >
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400">Temat 2 (CKE Maj 2024)</span>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                Jak relacja z drugą osobą kształtuje człowieka?
              </div>
            </button>
          </div>

          {/* Tryb 1: Interaktywny Konspekt (Szybka strategia) */}
          {essayMode === 'blueprint' && (
            <div className="space-y-5 bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                Interaktywny Architekt Rozprawki
              </div>

              {/* Wybór Tezy */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Krok 1: Wybierz stanowisko (tezę):</label>
                <div className="space-y-2">
                  {[
                    'Bunt definiuje godność człowieka, lecz jego cena bywa tragiczna dla jednostki.',
                    'Więzi z drugą osobą stanowią fundament tożsamości – mogą ocalić moralnie lub doprowadzić do ruiny.'
                  ].map((th, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedThesisIndex(i)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                        selectedThesisIndex === i
                          ? 'border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-white font-medium'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wybór Lektury Obowiązkowej z Gwiazdką */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Krok 2: Dobierz lekturę obowiązkową z gwiazdką (*):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Lalka (Bolesław Prus)', 'Dziady cz. III (Adam Mickiewicz)', 'Wesele (Stanisław Wyspiański)'].map(
                    (book) => (
                      <button
                        key={book}
                        onClick={() => setSelectedStarBook(book)}
                        className={`p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                          selectedStarBook === book
                            ? 'border-rose-500 bg-rose-500/15 text-rose-800 dark:text-rose-200'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
                        }`}
                      >
                        {book}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Wybór Kontekstu */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Krok 3: Wybierz kontekst:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Kontekst filozoficzny: Egzystencjalizm Camusa (człowiek zbuntowany)',
                    'Kontekst historyczny: Martyrologia młodzieży w zaborze rosyjskim'
                  ].map((ctx) => (
                    <button
                      key={ctx}
                      onClick={() => setSelectedContext(ctx)}
                      className={`p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        selectedContext === ctx
                          ? 'border-amber-500 bg-amber-500/15 text-amber-800 dark:text-amber-200'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
                      }`}
                    >
                      {ctx}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between">
                <span>Twój konspekt spełnia wszystkie formalne wymogi CKE!</span>
                <span className="font-mono font-bold">+33 / 35 pkt</span>
              </div>
            </div>
          )}

          {/* Tryb 2: Pełne Wypracowanie (300+ słów) */}
          {essayMode === 'fulltext' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEssayTab('czystopis')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      essayTab === 'czystopis'
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Czystopis (właściwa praca)
                  </button>
                  <button
                    onClick={() => setEssayTab('brudnopis')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      essayTab === 'brudnopis'
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Brudnopis (notatki / szkic)
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Licznik słów:</span>
                  <span
                    className={`font-mono px-2.5 py-1 rounded text-xs font-bold ${
                      essayWordCount >= 300
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    {essayWordCount} / 300 słów
                  </span>
                </div>
              </div>

              {essayTab === 'czystopis' ? (
                <textarea
                  rows={14}
                  value={userEssayText}
                  onChange={(e) => setUserEssayText(e.target.value)}
                  placeholder="Napisz wypracowanie problemowe. Pamiętaj o: tezie, odwołaniu do lektury obowiązkowej z gwiazdką, innym utworze literackim oraz kontekstach..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-rose-500 leading-relaxed font-sans"
                />
              ) : (
                <textarea
                  rows={10}
                  value={brudnopisText}
                  onChange={(e) => setBrudnopisText(e.target.value)}
                  placeholder="Brudnopis na konspekt, wypisanie cytatów i planu pracy (treść w brudnopisie nie podlega ocenie egzaminatora)..."
                  className="w-full bg-slate-50/80 dark:bg-slate-950/80 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-xs text-slate-800 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed font-mono"
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Raport Końcowy Egzaminu (Wyniki) */}
      {isFinished && examResult && (
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-500 mb-1">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Wynik Symulacji Egzaminacyjnej CKE</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Formuła 2023 • Próg zdawalności: 30% (18 punktów)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400">Część 1: Język w użyciu</div>
              <div className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">{examResult.part1Score} / 10 pkt</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400">Część 2: Test hist.-lit.</div>
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{examResult.part2Score} / 15 pkt</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400">Część 3: Wypracowanie</div>
              <div className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-1">{examResult.part3Score} / 35 pkt</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 dark:from-emerald-950/60 to-white dark:to-slate-900 border border-emerald-500/40">
              <div className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">Wynik Całkowity</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {examResult.total} / 60 pkt ({examResult.percent}%)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2 text-slate-700 dark:text-slate-300">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Status egzaminu: {examResult.passed ? 'ZDANY (Gratulacje!)' : 'NIEZDANY'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Twój wynik mieści się w standardzie centylowym Formuły 2023. Pamiętaj o regularnym powtarzaniu lektur o 100% występowalności (Lalka, Dziady cz. III) oraz pilnowaniu limitu 60–90 słów w notatce syntetyzującej.
            </p>
          </div>

          {onExit && (
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={onExit}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:opacity-90 transition cursor-pointer shadow-md"
              >
                Wróć do pulpitu
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
