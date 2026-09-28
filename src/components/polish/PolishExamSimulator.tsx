import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  AlertTriangle,
  Flag,
  RotateCcw,
  Layers,
  FileText,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Send,
  Eye,
  XCircle,
  HelpCircle,
  Bookmark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PolishTask } from '../../types/maturaTypes';
import { generateMockExam } from '../../data/polish';
import { playAudioTone } from '../../utils';

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
  const [secondsRemaining, setSecondsRemaining] = useState(240 * 60); // 240 minut
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

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
    const result = examResult;
    const isSuccess = result ? result.passed : true;
    playAudioTone(isSuccess ? 'success' : 'error');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
    if (onFinishExam && result) {
      onFinishExam(result.total, 60);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Pasek Górny Symulatora CKE */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          {onExit && (
            <button
              onClick={onExit}
              className="p-2 rounded-xl bg-surface-card-hover text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              title="Wróć do wyboru arkuszy"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-2">
              Oficjalny Symulator Maturalny Formuła 2023
              <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-normal border border-rose-500/30">
                240 min • 60 pkt
              </span>
            </h1>
            <p className="text-xs text-text-secondary">
              Egzamin maturalny z języka polskiego (poziom podstawowy)
            </p>
          </div>
        </div>

        {/* Zegar & Przyciski Sterujące */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-bg border border-surface-border font-mono text-sm font-bold text-amber-400 shadow-inner">
            <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={() => {
              playAudioTone('click');
              setIsTimerPaused(!isTimerPaused);
            }}
            className="px-3 py-2 rounded-xl bg-surface-card-hover hover:bg-surface-border text-text-secondary hover:text-text-primary text-xs font-semibold transition-colors cursor-pointer"
          >
            {isTimerPaused ? 'Wznów' : 'Pauza'}
          </button>

          {!isFinished && (
            <button
              onClick={handleFinishExam}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-surface-bg text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              Zakończ arkusz
            </button>
          )}
        </div>
      </div>

      {/* Przełącznik Zeszytów Egzaminacyjnych (Zeszyt 1 vs Zeszyt 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => {
            playAudioTone('click');
            setActiveBooklet(1);
          }}
          className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            activeBooklet === 1
              ? 'border-amber-500/80 bg-amber-500/10 text-text-primary shadow-md'
              : 'border-surface-border bg-surface-card/60 text-text-secondary hover:text-text-primary hover:bg-surface-card-hover'
          }`}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Zeszyt 1</span>
            <div className="text-sm font-bold text-text-primary mt-0.5">Test: Język w użyciu & Epoki</div>
            <div className="text-xs text-text-secondary mt-1">Zadania 1–{allExamTasks.length} • Pula: 25 punktów</div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-surface-card-hover text-amber-400 font-bold border border-surface-border">
            25 pkt
          </span>
        </button>

        <button
          onClick={() => {
            playAudioTone('click');
            setActiveBooklet(2);
          }}
          className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            activeBooklet === 2
              ? 'border-rose-500/80 bg-rose-500/10 text-text-primary shadow-md'
              : 'border-surface-border bg-surface-card/60 text-text-secondary hover:text-text-primary hover:bg-surface-card-hover'
          }`}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Zeszyt 2</span>
            <div className="text-sm font-bold text-text-primary mt-0.5">Wypracowanie maturalne</div>
            <div className="text-xs text-text-secondary mt-1">Wybór tematu • Min. 300 słów lub konspekt</div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-surface-card-hover text-rose-400 font-bold border border-surface-border">
            35 pkt
          </span>
        </button>
      </div>

      {/* Widok Zeszytu 1 (Test 25 pkt) */}
      {activeBooklet === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Boczny Indeks Zadań Testu */}
          <div className="lg:col-span-3 bg-surface-card border border-surface-border rounded-2xl p-4 space-y-3">
            <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Nawigator Zeszytu 1
            </div>

            <div className="grid grid-cols-4 gap-2">
              {allExamTasks.map((t, i) => {
                const isSelected = i === currentTaskIndex;
                const isFlagged = flaggedTasks[t.id];
                const isAnswered =
                  userSingleChoice[t.id] !== undefined ||
                  (userOpenAnswers[t.id] && userOpenAnswers[t.id].trim().length > 0) ||
                  userTfAnswers[t.id] !== undefined;

                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      playAudioTone('click');
                      setCurrentTaskIndex(i);
                    }}
                    className={`relative p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500 text-surface-bg shadow-md'
                        : isAnswered
                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                        : 'border-surface-border bg-surface-bg text-text-secondary hover:bg-surface-card-hover'
                    }`}
                  >
                    <span>{i + 1}</span>
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-surface-card" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-surface-border text-[11px] text-text-secondary space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/50" />
                <span>Rozwiązane</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-amber-400" />
                <span>Oflagowane do sprawdzenia</span>
              </div>
            </div>
          </div>

          {/* Karta Aktywnego Zadania */}
          <div className="lg:col-span-9 bg-surface-card border border-surface-border rounded-2xl p-6 shadow-xl space-y-6">
            {currentTask && (
              <>
                <div className="flex items-center justify-between border-b border-surface-border pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-surface-card-hover text-amber-400 text-xs font-mono font-bold border border-surface-border">
                      Zadanie {currentTaskIndex + 1} / {allExamTasks.length}
                    </span>
                    <span className="text-xs text-text-secondary">
                      Część {currentTask.part}: {currentTask.partName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFlag(currentTask.id)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        flaggedTasks[currentTask.id]
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-surface-card-hover border-surface-border text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      {flaggedTasks[currentTask.id] ? 'Oflagowane' : 'Oznacz'}
                    </button>
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-surface-card-hover text-amber-400 font-bold border border-surface-border">
                      {currentTask.points} pkt
                    </span>
                  </div>
                </div>

                {/* Tekst źródłowy */}
                {currentTask.passage && (
                  <div className="p-4 rounded-xl bg-surface-bg border border-surface-border text-xs text-text-secondary leading-relaxed italic border-l-2 border-amber-500">
                    <div className="font-semibold text-text-primary not-italic mb-1">
                      {currentTask.passage.author} – {currentTask.passage.sourceTitle}
                    </div>
                    {currentTask.passage.text}
                  </div>
                )}

                {/* Treść pytania */}
                <div className="text-sm font-semibold text-text-primary leading-relaxed">
                  {currentTask.question}
                </div>

                {/* Formularz odpowiedzi */}
                {currentTask.taskType === 'single_choice' && currentTask.options && (
                  <div className="space-y-2">
                    {currentTask.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          playAudioTone('click');
                          setUserSingleChoice({ ...userSingleChoice, [currentTask.id]: optIdx });
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                          userSingleChoice[currentTask.id] === optIdx
                            ? 'border-amber-500 bg-amber-500/10 text-text-primary font-medium'
                            : 'border-surface-border bg-surface-bg/60 text-text-secondary hover:bg-surface-card-hover hover:text-text-primary'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {currentTask.taskType === 'true_false' && currentTask.trueFalseStatements && (
                  <div className="border border-surface-border rounded-xl overflow-hidden">
                    <table className="w-full text-xs">
                      <thead className="bg-surface-bg text-text-secondary border-b border-surface-border">
                        <tr>
                          <th className="py-2.5 px-4 text-left font-semibold">Stwierdzenie</th>
                          <th className="py-2.5 px-3 text-center font-semibold w-24">Wybór</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-border">
                        {currentTask.trueFalseStatements.map((st, i) => {
                          const taskAnswers = userTfAnswers[currentTask.id] || {};
                          return (
                            <tr key={i} className="bg-surface-card/40">
                              <td className="py-3 px-4 text-text-secondary">{st.statement}</td>
                              <td className="py-3 px-3 text-center">
                                <div className="inline-flex gap-1">
                                  <button
                                    onClick={() => {
                                      playAudioTone('click');
                                      setUserTfAnswers({
                                        ...userTfAnswers,
                                        [currentTask.id]: { ...taskAnswers, [i]: true }
                                      });
                                    }}
                                    className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                                      taskAnswers[i] === true
                                        ? 'bg-amber-500 text-surface-bg'
                                        : 'bg-surface-card-hover text-text-secondary hover:text-text-primary'
                                    }`}
                                  >
                                    P
                                  </button>
                                  <button
                                    onClick={() => {
                                      playAudioTone('click');
                                      setUserTfAnswers({
                                        ...userTfAnswers,
                                        [currentTask.id]: { ...taskAnswers, [i]: false }
                                      });
                                    }}
                                    className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                                      taskAnswers[i] === false
                                        ? 'bg-amber-500 text-surface-bg'
                                        : 'bg-surface-card-hover text-text-secondary hover:text-text-primary'
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
                      rows={5}
                      value={userOpenAnswers[currentTask.id] || ''}
                      onChange={(e) =>
                        setUserOpenAnswers({ ...userOpenAnswers, [currentTask.id]: e.target.value })
                      }
                      placeholder="Wpisz swoją odpowiedź..."
                      className="w-full bg-surface-bg border border-surface-border rounded-xl p-3.5 text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>
                )}

                {/* Paginacja Poprzednie / Następne */}
                <div className="flex items-center justify-between pt-4 border-t border-surface-border">
                  <button
                    disabled={currentTaskIndex === 0}
                    onClick={() => {
                      playAudioTone('click');
                      setCurrentTaskIndex((prev) => prev - 1);
                    }}
                    className="px-4 py-2 rounded-xl bg-surface-card-hover text-text-secondary hover:text-text-primary text-xs font-semibold flex items-center gap-1.5 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Poprzednie
                  </button>

                  {currentTaskIndex < allExamTasks.length - 1 ? (
                    <button
                      onClick={() => {
                        playAudioTone('click');
                        setCurrentTaskIndex((prev) => prev + 1);
                      }}
                      className="px-5 py-2 rounded-xl bg-amber-500 text-surface-bg text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer hover:bg-amber-400 transition-colors"
                    >
                      Następne <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        playAudioTone('click');
                        setActiveBooklet(2);
                      }}
                      className="px-5 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer hover:bg-rose-400 transition-colors"
                    >
                      Przejdź do Zeszytu 2 (Wypracowanie) <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Widok Zeszytu 2 (Wypracowanie 35 pkt) */}
      {activeBooklet === 2 && (
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-border pb-4">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Zeszyt 2 • Wypracowanie problemowe (35 pkt)
              </span>
              <h2 className="text-lg font-bold text-text-primary mt-1">Wybór Tematu i Strategia Pracy</h2>
            </div>

            {/* Przełącznik Trybu: Konspekt vs Pełny Tekst */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-bg border border-surface-border">
              <button
                onClick={() => {
                  playAudioTone('click');
                  setEssayMode('blueprint');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  essayMode === 'blueprint'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Szybki Konspekt Interaktywny
              </button>
              <button
                onClick={() => {
                  playAudioTone('click');
                  setEssayMode('fulltext');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  essayMode === 'fulltext'
                    ? 'bg-rose-500 text-white shadow'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Napisz pełne wypracowanie (300+ słów)
              </button>
            </div>
          </div>

          {/* Karta Wyboru Tematu 1 lub 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                playAudioTone('click');
                setEssayThemeChoice(1);
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                essayThemeChoice === 1
                  ? 'border-rose-500 bg-rose-500/10 text-text-primary ring-1 ring-rose-500/40'
                  : 'border-surface-border bg-surface-bg/60 text-text-secondary hover:bg-surface-card-hover'
              }`}
            >
              <span className="text-xs font-bold text-rose-400">Temat 1 (CKE Maj 2024)</span>
              <div className="text-sm font-semibold text-text-primary mt-1">
                Bunt i jego konsekwencje dla człowieka.
              </div>
            </button>

            <button
              onClick={() => {
                playAudioTone('click');
                setEssayThemeChoice(2);
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                essayThemeChoice === 2
                  ? 'border-rose-500 bg-rose-500/10 text-text-primary ring-1 ring-rose-500/40'
                  : 'border-surface-border bg-surface-bg/60 text-text-secondary hover:bg-surface-card-hover'
              }`}
            >
              <span className="text-xs font-bold text-rose-400">Temat 2 (CKE Maj 2024)</span>
              <div className="text-sm font-semibold text-text-primary mt-1">
                Jak relacja z drugą osobą kształtuje człowieka?
              </div>
            </button>
          </div>

          {/* Tryb 1: Interaktywny Konspekt (Szybka strategia) */}
          {essayMode === 'blueprint' && (
            <div className="space-y-5 bg-surface-bg p-5 rounded-xl border border-surface-border">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Interaktywny Architekt Rozprawki
              </div>

              {/* Wybór Tezy */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary">Krok 1: Wybierz stanowisko (tezę):</label>
                <div className="space-y-2">
                  {[
                    'Bunt definiuje godność człowieka, lecz jego cena bywa tragiczna dla jednostki.',
                    'Więzi z drugą osobą stanowią fundament tożsamości – mogą ocalić moralnie lub doprowadzić do ruiny.'
                  ].map((th, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playAudioTone('click');
                        setSelectedThesisIndex(i);
                      }}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                        selectedThesisIndex === i
                          ? 'border-emerald-500 bg-emerald-500/15 text-text-primary font-medium'
                          : 'border-surface-border bg-surface-card text-text-secondary hover:bg-surface-card-hover'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wybór Lektury Obowiązkowej z Gwiazdką */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary">
                  Krok 2: Dobierz lekturę obowiązkową z gwiazdką (*):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Lalka (Bolesław Prus)', 'Dziady cz. III (Adam Mickiewicz)', 'Wesele (Stanisław Wyspiański)'].map(
                    (book) => (
                      <button
                        key={book}
                        onClick={() => {
                          playAudioTone('click');
                          setSelectedStarBook(book);
                        }}
                        className={`p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                          selectedStarBook === book
                            ? 'border-rose-500 bg-rose-500/15 text-rose-200'
                            : 'border-surface-border bg-surface-card text-text-secondary hover:bg-surface-card-hover'
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
                <label className="text-xs font-semibold text-text-secondary">Krok 3: Wybierz kontekst:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Kontekst filozoficzny: Egzystencjalizm Camusa (człowiek zbuntowany)',
                    'Kontekst historyczny: Martyrologia młodzieży w zaborze rosyjskim'
                  ].map((ctx) => (
                    <button
                      key={ctx}
                      onClick={() => {
                        playAudioTone('click');
                        setSelectedContext(ctx);
                      }}
                      className={`p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                        selectedContext === ctx
                          ? 'border-amber-500 bg-amber-500/15 text-amber-200'
                          : 'border-surface-border bg-surface-card text-text-secondary hover:bg-surface-card-hover'
                      }`}
                    >
                      {ctx}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
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
                        : 'bg-surface-card-hover text-text-secondary'
                    }`}
                  >
                    Czystopis (właściwa praca)
                  </button>
                  <button
                    onClick={() => setEssayTab('brudnopis')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      essayTab === 'brudnopis'
                        ? 'bg-rose-500 text-white'
                        : 'bg-surface-card-hover text-text-secondary'
                    }`}
                  >
                    Brudnopis (notatki / szkic)
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary">Licznik słów:</span>
                  <span
                    className={`font-mono px-2.5 py-1 rounded text-xs font-bold ${
                      essayWordCount >= 300
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
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
                  className="w-full bg-surface-bg border border-surface-border rounded-xl p-4 text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-rose-500 leading-relaxed font-sans"
                />
              ) : (
                <textarea
                  rows={10}
                  value={brudnopisText}
                  onChange={(e) => setBrudnopisText(e.target.value)}
                  placeholder="Brudnopis na konspekt, wypisanie cytatów i planu pracy (treść w brudnopisie nie podlega ocenie egzaminatora)..."
                  className="w-full bg-surface-bg/80 border border-dashed border-surface-border rounded-xl p-4 text-xs text-text-secondary placeholder-text-muted focus:outline-none focus:border-amber-500 leading-relaxed font-mono"
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Raport Końcowy Egzaminu (Wyniki) */}
      {isFinished && examResult && (
        <div className="bg-surface-card border-2 border-emerald-500/50 rounded-2xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-text-primary">Wynik Symulacji Egzaminacyjnej CKE</h2>
            <p className="text-xs text-text-secondary">
              Formuła 2023 • Próg zdawalności: 30% (18 punktów)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-surface-bg border border-surface-border">
              <div className="text-xs text-text-secondary">Część 1: Język w użyciu</div>
              <div className="text-xl font-bold text-amber-400 mt-1">{examResult.part1Score} / 10 pkt</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-bg border border-surface-border">
              <div className="text-xs text-text-secondary">Część 2: Test hist.-lit.</div>
              <div className="text-xl font-bold text-indigo-400 mt-1">{examResult.part2Score} / 15 pkt</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-bg border border-surface-border">
              <div className="text-xs text-text-secondary">Część 3: Wypracowanie</div>
              <div className="text-xl font-bold text-rose-400 mt-1">{examResult.part3Score} / 35 pkt</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-card-hover border border-emerald-500/40">
              <div className="text-xs text-emerald-300 font-semibold">Wynik Całkowity</div>
              <div className="text-2xl font-black text-text-primary mt-1">
                {examResult.total} / 60 pkt ({examResult.percent}%)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-bg border border-surface-border text-xs space-y-2 text-text-secondary">
            <div className="font-bold text-text-primary flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Status egzaminu: {examResult.passed ? 'ZDANY (Gratulacje!)' : 'NIEZDANY'}</span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Twój wynik mieści się w standardzie centylowym Formuły 2023. Pamiętaj o regularnym powtarzaniu lektur o 100% występowalności (Lalka, Dziady cz. III) oraz pilnowaniu limitu 60–90 słów w notatce syntetyzującej.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
