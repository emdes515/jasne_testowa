import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Clock, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  BookOpen, 
  Award,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { MathRenderer, formatMathAnswer } from './MathRenderer';
import { OpenTaskWorkspace } from './OpenTaskWorkspace';
import { BossExamData, BossExamTask, generateDzial1BossExam } from '../data/dzial1TaskPool';
import { triggerHaptic, playSuccessSound, playErrorSound } from '../utils';

interface BossExamRunnerProps {
  initialExamData?: BossExamData;
  onCompleteExam: (score: number, passed: boolean, xp: number, coins: number, badgeId: string) => void;
  onCancel: () => void;
  onRestart?: () => BossExamData;
}

export const BossExamRunner: React.FC<BossExamRunnerProps> = ({
  initialExamData,
  onCompleteExam,
  onCancel,
  onRestart
}) => {
  const [examData, setExamData] = useState<BossExamData>(() => initialExamData || generateDzial1BossExam());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [openAnswers, setOpenAnswers] = useState<Record<number, string>>({});
  const [twoPartAnswers, setTwoPartAnswers] = useState<Record<number, { p1?: string; p2?: string }>>({});
  const [tfAnswers, setTfAnswers] = useState<Record<number, Record<string, 'P' | 'F'>>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>((initialExamData?.timeLimitMinutes || 20) * 60);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showExitConfirm, setShowExitConfirm] = useState<boolean>(false);
  const [resultScore, setResultScore] = useState<number>(0);
  const [isPassed, setIsPassed] = useState<boolean>(false);

  useEffect(() => {
    if (initialExamData) {
      setExamData(initialExamData);
      setTimeLeftSeconds((initialExamData.timeLimitMinutes || 20) * 60);
      setCurrentIndex(0);
      setSelectedAnswers({});
      setOpenAnswers({});
      setTwoPartAnswers({});
      setTfAnswers({});
      setIsFinished(false);
      setResultScore(0);
      setIsPassed(false);
    }
  }, [initialExamData]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isFinished) return;

    timerRef.current = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinishExamAuto();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isFinished, selectedAnswers, openAnswers, twoPartAnswers, tfAnswers]);

  const currentTask: BossExamTask = examData.tasks[currentIndex];
  const isTwoPart = currentTask?.type === 'TWO_PART';
  const isTrueFalse = currentTask?.type === 'TRUE_FALSE';
  const isNumeric = currentTask?.type === 'NUMERIC_INPUT';
  const isOpenProof = currentTask?.type === 'OPEN_PROOF';
  const isOpenTask = isOpenProof || (!currentTask?.options || currentTask?.options.length === 0 && !isTwoPart && !isTrueFalse);

  // Format mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optId: string) => {
    triggerHaptic('light');
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optId
    }));
  };

  const handleOpenAnswerChange = (val: string) => {
    setOpenAnswers(prev => ({
      ...prev,
      [currentIndex]: val
    }));
  };

  // Evaluation of questions
  const evaluateExam = () => {
    let score = 0;
    examData.tasks.forEach((task, idx) => {
      if (task.type === 'TWO_PART') {
        const tp = twoPartAnswers[idx];
        const correctRaw = String(task.correct_answer || '').trim();
        const exp1 = (task as any).part_1?.correct || (task as any).correct_combination?.[0] || correctRaw[0] || '';
        const exp2 = (task as any).part_2?.correct || (task as any).correct_combination?.[1] || correctRaw.slice(1).replace(/[^0-9A-Za-z]/g, '') || '';
        if (tp && tp.p1?.toUpperCase() === String(exp1).toUpperCase() && tp.p2?.toUpperCase() === String(exp2).toUpperCase()) {
          score += (task.points || 1);
        }
      } else if (task.type === 'TRUE_FALSE') {
        const stmts = (task as any).statements || [];
        const ans = tfAnswers[idx] || {};
        if (stmts.length > 0 && stmts.every((s: any) => ans[s.id] === s.correct)) {
          score += (task.points || 1);
        }
      } else if (task.type === 'NUMERIC_INPUT') {
        const parseVal = (raw: string) => {
          const s = raw.trim().replace(',', '.');
          const frac = s.match(/\\frac\{([^}]+)\}\{([^}]+)\}/);
          if (frac) {
            const n = parseFloat(frac[1]);
            const d = parseFloat(frac[2]);
            if (!isNaN(n) && !isNaN(d) && d !== 0) return n / d;
          }
          if (s.includes('/')) {
            const p = s.split('/');
            if (p.length === 2) {
              const n = parseFloat(p[0]);
              const d = parseFloat(p[1]);
              if (!isNaN(n) && !isNaN(d) && d !== 0) return n / d;
            }
          }
          return parseFloat(s);
        };
        const normStr = (s: string) => s
          .replace(/\s+/g, '')
          .replace(/,/g, '.')
          .replace(/\\left/g, '')
          .replace(/\\right/g, '')
          .replace(/\\langle\s*/g, '⟨')
          .replace(/\\rangle\s*/g, '⟩')
          .replace(/\\infty\s*/g, '∞')
          .replace(/−/g, '-');

        const val = (openAnswers[idx] || '').trim();
        const expected = String(task.correct_answer || (task as any).numeric_correct_answer || '').trim();

        if (normStr(val) === normStr(expected)) {
          score += (task.points || 1);
        } else {
          const vNum = parseVal(val);
          const eNum = parseVal(expected);
          if (!isNaN(vNum) && !isNaN(eNum) && Math.abs(vNum - eNum) < 1e-6) {
            score += (task.points || 1);
          }
        }
      } else if (task.type === 'OPEN_PROOF' || (!task.options || task.options.length === 0)) {
        const text = (openAnswers[idx] || '').toLowerCase();
        // Generous rubric for open proof in exam: basic algebra steps or key factorisation
        if (text.length > 20 && (text.includes('podziel') || text.includes('całkowit') || text.includes('k') || text.includes('2^') || text.includes('3n') || text.includes('4k') || text.includes('dla każdego') || text.includes('cnd') || text.includes('co kończy dowód'))) {
          score += (task.points || 1);
        }
      } else {
        const selected = selectedAnswers[idx];
        if (selected && selected === task.correct_answer) {
          score += (task.points || 1);
        }
      }
    });
    return score;
  };

  const handleFinishExamAuto = () => {
    const score = evaluateExam();
    const passed = score >= examData.passingScore;
    setResultScore(score);
    setIsPassed(passed);
    setIsFinished(true);

    if (passed) {
      triggerHaptic('success');
      playSuccessSound();
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#06B6D4', '#EAB308']
        });
      } catch (e) {}
    } else {
      triggerHaptic('error');
      playErrorSound();
    }
  };

  const handleRestartExam = () => {
    const newExam = onRestart ? onRestart() : (initialExamData || generateDzial1BossExam());
    setExamData(newExam);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setOpenAnswers({});
    setTwoPartAnswers({});
    setTfAnswers({});
    setTimeLeftSeconds((newExam.timeLimitMinutes || 20) * 60);
    setIsFinished(false);
    setResultScore(0);
    setIsPassed(false);
  };

  const handleFinalClaim = () => {
    onCompleteExam(
      resultScore,
      isPassed,
      isPassed ? examData.rewardXp : 30,
      isPassed ? examData.rewardCoins : 10,
      examData.badgeId
    );
  };

  // Results Screen
  if (isFinished) {
    const percent = Math.round((resultScore / examData.totalQuestions) * 100);

    return (
      <div 
        id="boss-exam-results-screen"
        className="fixed inset-0 z-50 bg-[#070A0F]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 text-white select-none overflow-y-auto"
      >
        <div className="w-full max-w-xl bg-[#0B0F19] rounded-3xl border border-white/10 flex flex-col p-6 sm:p-8 text-white relative shadow-2xl my-auto">
          
          <div className="flex flex-col items-center text-center">
            {/* Crown / Trophy icon */}
            <div className="relative mb-5 flex items-center justify-center">
              <div className={`absolute w-36 h-36 rounded-full blur-2xl pointer-events-none ${
                isPassed ? 'bg-amber-500/25' : 'bg-rose-500/20'
              }`} />
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-2 z-10 shadow-xl ${
                isPassed 
                  ? 'bg-gradient-to-br from-amber-400/25 to-amber-600/20 border-amber-400/80 text-amber-400 shadow-amber-500/30' 
                  : 'bg-gradient-to-br from-rose-500/20 to-slate-800 border-rose-500/50 text-rose-400'
              }`}>
                {isPassed ? (
                  <Trophy size={48} className="text-amber-400" />
                ) : (
                  <AlertTriangle size={44} className="text-rose-400" />
                )}
              </div>
            </div>

            <span className={`text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full border mb-3 ${
              isPassed 
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' 
                : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
            }`}>
              {isPassed ? 'SPRAWDZIAN ZALICZONY' : 'SPRAWDZIAN NIEZALICZONY'}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              {isPassed ? (examData.boss_name ? `${examData.boss_name} pokonany!` : 'Dział 1 Opanowany!') : 'Wymagana powtórka materiału'}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-md leading-relaxed">
              {isPassed 
                ? 'Gratulacje! Osiągnąłeś próg egzaminacyjny z Działu 1: Liczby Rzeczywiste. Złota Odznaka Mistrza Działu oraz Dział 2 zostały odblokowane!' 
                : `Do zaliczenia wymagane jest min. ${examData.passingScore} z ${examData.totalQuestions} punktów (${Math.round((examData.passingScore / examData.totalQuestions) * 100)}%). Przeanalizuj poniższe tematy z błędami i spróbuj ponownie.`}
            </p>

            {/* Score pill */}
            <div className="w-full bg-[#101726] rounded-2xl border border-white/10 p-4 mb-6 flex items-center justify-around">
              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Wynik</span>
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {resultScore} <span className="text-sm font-normal text-slate-400">/ {examData.totalQuestions} pkt</span>
                </span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Skuteczność</span>
                <span className={`text-2xl sm:text-3xl font-black ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {percent}%
                </span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Nagroda</span>
                <span className="text-lg sm:text-xl font-black text-amber-400 flex items-center justify-center gap-1">
                  +{isPassed ? examData.rewardXp : 30} XP
                </span>
              </div>
            </div>

            {/* Diagnostics breakdown per lesson */}
            <div className="w-full text-left mb-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Przegląd pytań i tematów maturalnych:
              </h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {examData.tasks.map((t, idx) => {
                  let isOk = false;
                  if (t.type === 'TWO_PART') {
                    const tp = twoPartAnswers[idx];
                    const correctRaw = String(t.correct_answer || '').trim();
                    const exp1 = (t as any).part_1?.correct || (t as any).correct_combination?.[0] || correctRaw[0] || '';
                    const exp2 = (t as any).part_2?.correct || (t as any).correct_combination?.[1] || correctRaw.slice(1).replace(/[^0-9A-Za-z]/g, '') || '';
                    isOk = Boolean(tp && tp.p1?.toUpperCase() === String(exp1).toUpperCase() && tp.p2?.toUpperCase() === String(exp2).toUpperCase());
                  } else if (t.type === 'TRUE_FALSE') {
                    const stmts = (t as any).statements || [];
                    const ans = tfAnswers[idx] || {};
                    isOk = stmts.length > 0 && stmts.every((s: any) => ans[s.id] === s.correct);
                  } else if (t.type === 'NUMERIC_INPUT') {
                    const val = (openAnswers[idx] || '').trim().replace(/\s+/g, '').replace(/,/g, '.');
                    const expected = String(t.correct_answer || (t as any).numeric_correct_answer || '').trim().replace(/\s+/g, '').replace(/,/g, '.');
                    isOk = Boolean(val && val === expected);
                  } else if (t.type === 'OPEN_PROOF' || (!t.options || t.options.length === 0)) {
                    isOk = (openAnswers[idx] || '').length > 20;
                  } else {
                    isOk = selectedAnswers[idx] === t.correct_answer;
                  }

                  return (
                    <div 
                      key={t.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                        isOk 
                          ? 'bg-emerald-950/20 border-emerald-500/20 text-slate-200' 
                          : 'bg-rose-950/20 border-rose-500/20 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {isOk ? (
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle size={16} className="text-rose-400 shrink-0" />
                        )}
                        <div className="truncate">
                          <span className="font-bold text-white block truncate">
                            Zadanie {idx + 1}: {t.topicLabel?.replace(/^undefined\s*•\s*/i, '') || t.lessonTitle || `Zadanie ${idx + 1}`}
                          </span>
                          {!isOk && t.correct_answer && (
                            <span className="text-[11px] text-rose-300 flex items-center gap-1">
                              <span>Prawidłowa odp:</span>
                              <span className="font-bold text-white inline-flex items-center">
                                <MathRenderer content={formatMathAnswer(t.correct_answer)} />
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        isOk ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {isOk ? `${t.points || 1} pkt` : '0 pkt'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action buttons */}
            <div className="w-full flex flex-col sm:flex-row gap-3">
              {isPassed ? (
                <button
                  id="boss-exam-claim-success-button"
                  onClick={handleFinalClaim}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-[#FFB800] hover:brightness-110 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 active:scale-98 transition-all cursor-pointer"
                >
                  <Award size={18} />
                  <span>ODBIERZ ZŁOTĄ ODZNAKĘ I ODBLOKUJ DZIAŁ 2</span>
                </button>
              ) : (
                <>
                  <button
                    id="boss-exam-retry-button"
                    onClick={handleRestartExam}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-[#FFB800] hover:bg-[#FFC72C] text-[#080B11] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer shadow-[0_0_20px_rgba(255,184,0,0.35)]"
                  >
                    <RefreshCw size={15} />
                    <span>POWTÓRZ SPRAWDZIAN (NOWY ZESTAW)</span>
                  </button>
                  <button
                    id="boss-exam-exit-fail-button"
                    onClick={onCancel}
                    className="py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition active:scale-98 cursor-pointer border border-white/10"
                  >
                    Wróć do powtórki lekcji
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Active Exam View
  const answeredCount = examData.tasks.filter((t, idx) => {
    if (t.type === 'TWO_PART') {
      const tp = twoPartAnswers[idx];
      return tp && tp.p1 && tp.p2;
    }
    if (t.type === 'TRUE_FALSE') {
      const stmts = (t as any).statements || [];
      const tf = tfAnswers[idx] || {};
      return stmts.length > 0 && stmts.every((s: any) => Boolean(tf[s.id]));
    }
    if (t.type === 'NUMERIC_INPUT' || t.type === 'OPEN_PROOF' || (!t.options || t.options.length === 0)) {
      return (openAnswers[idx] || '').trim().length > 0;
    }
    return selectedAnswers[idx] !== undefined;
  }).length;
  const isTimeCritical = timeLeftSeconds < 180; // < 3 min

  return (
    <div 
      id="boss-exam-screen"
      className="fixed inset-0 z-50 bg-[#070A0F] flex flex-col text-white select-none overflow-hidden"
    >
      {/* Top Exam Header */}
      <header className="w-full bg-[#0B0F19] border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            id="boss-exam-exit-button"
            onClick={() => setShowExitConfirm(true)}
            className="w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center justify-center cursor-pointer"
            title="Przerwij sprawdzian"
          >
            <X size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {examData.title ? examData.title.toUpperCase() : 'SPRAWDZIAN DZIAŁU'}
              </span>
              <span className="text-xs text-slate-400">
                Pytanie {currentIndex + 1} z {examData.totalQuestions}
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-200">
              {currentTask.topicLabel?.replace(/^undefined\s*•\s*/i, '') || currentTask.lessonTitle || 'Zadanie sprawdzianu'}
            </h2>
          </div>
        </div>

        {/* 15 min Timer */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
          isTimeCritical 
            ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse' 
            : 'bg-slate-900 border-white/10 text-[#FFB800]'
        }`}>
          <Clock size={16} className={isTimeCritical ? 'text-rose-400' : 'text-[#FFB800]'} />
          <span>{formatTime(timeLeftSeconds)}</span>
        </div>
      </header>

      {/* Navigation segments 1 to 7 */}
      <div className="w-full bg-[#090D14] px-4 py-2 border-b border-white/5 flex items-center justify-center gap-1.5 sm:gap-2">
        {examData.tasks.map((_, idx) => {
          const isAnswered = selectedAnswers[idx] !== undefined || (openAnswers[idx] || '').trim().length > 0;
          const isCurrent = currentIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-7 px-2.5 sm:px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isCurrent 
                  ? 'bg-[#FFB800] text-[#080B11] font-bold shadow-md shadow-[rgba(255,184,0,0.35)] scale-105' 
                  : isAnswered 
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' 
                    : 'bg-slate-900 border border-white/5 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span>{idx + 1}</span>
              {isAnswered && !isCurrent && <CheckCircle2 size={10} className="text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Question Content Area */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-3xl w-full mx-auto flex flex-col justify-between">
        <div className="space-y-6">
          {/* Question banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0F1622] border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-white/5 pb-2">
              {(() => {
                const s = currentTask.source || 'Zadanie egzaminacyjne';
                const isAutorskie = /autorsk/i.test(s);
                const isInformator = /informator|arkusz\s*pokazowy/i.test(s);
                const badgeClass = isAutorskie
                  ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                  : isInformator
                    ? 'bg-amber-500/15 border-amber-400/30 text-amber-300'
                    : 'bg-sky-500/15 border-sky-400/30 text-sky-300';
                const dotClass = isAutorskie ? 'bg-emerald-400' : isInformator ? 'bg-amber-400' : 'bg-sky-400';
                return (
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border font-semibold text-[11px] sm:text-xs shadow-sm ${badgeClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 shadow-sm ${dotClass}`} />
                    <span>{s}</span>
                  </span>
                );
              })()}
              <span className="font-bold text-amber-400">{currentTask.points} pkt</span>
            </div>

            <div className="text-base sm:text-lg font-medium text-white leading-relaxed">
              <MathRenderer content={currentTask.question} displayMode={true} />
            </div>
          </div>

          {/* TWO_PART Input */}
          {isTwoPart && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2 text-left">
                <div className="text-xs font-bold text-[#FFB800] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FFB800]/20 text-[#FFB800] text-xs flex items-center justify-center font-bold">1</span>
                  <span>{(currentTask as any).part_1?.prompt || 'Wybierz pierwszą część zdania:'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {((currentTask as any).part_1?.options || []).map((opt: any) => {
                    const isSel = twoPartAnswers[currentIndex]?.p1 === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          triggerHaptic('light');
                          setTwoPartAnswers(prev => ({
                            ...prev,
                            [currentIndex]: { ...(prev[currentIndex] || {}), p1: opt.id }
                          }));
                        }}
                        className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition text-xs cursor-pointer ${
                          isSel 
                            ? 'bg-[#FFB800]/15 border-[#FFB800] text-white shadow-[0_0_12px_rgba(255,184,0,0.25)]' 
                            : 'bg-slate-950/60 border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded font-bold text-xs flex items-center justify-center shrink-0 border ${
                          isSel ? 'bg-[#FFB800] text-[#080B11] font-bold border-[#FFB800]' : 'bg-slate-800 border-white/10 text-slate-400'
                        }`}>{opt.id}</span>
                        <div className="flex-1">
                          <MathRenderer content={opt.text || opt.content_latex || ''} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2 text-left">
                <div className="text-xs font-bold text-[#FFB800] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FFB800]/20 text-[#FFB800] text-xs flex items-center justify-center font-bold">2</span>
                  <span>{(currentTask as any).part_2?.prompt || 'Wybierz uzasadnienie:'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {((currentTask as any).part_2?.options || []).map((opt: any) => {
                    const isSel = twoPartAnswers[currentIndex]?.p2 === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          triggerHaptic('light');
                          setTwoPartAnswers(prev => ({
                            ...prev,
                            [currentIndex]: { ...(prev[currentIndex] || {}), p2: opt.id }
                          }));
                        }}
                        className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition text-xs cursor-pointer ${
                          isSel 
                            ? 'bg-[#FFB800]/15 border-[#FFB800] text-white shadow-[0_0_12px_rgba(255,184,0,0.25)]' 
                            : 'bg-slate-950/60 border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded font-bold text-xs flex items-center justify-center shrink-0 border ${
                          isSel ? 'bg-[#FFB800] text-[#080B11] font-bold border-[#FFB800]' : 'bg-slate-800 border-white/10 text-slate-400'
                        }`}>{opt.id}</span>
                        <div className="flex-1">
                          <MathRenderer content={opt.text || opt.content_latex || ''} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TRUE_FALSE Input */}
          {isTrueFalse && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Oceń prawdziwość zdań:
              </span>
              <div className="space-y-2">
                {((currentTask as any).statements || []).map((stmt: any, idx: number) => {
                  const sel = tfAnswers[currentIndex]?.[stmt.id];
                  return (
                    <div key={stmt.id || idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-start gap-2.5 flex-1">
                        <span className="w-5 h-5 rounded bg-slate-800 text-[#FFB800] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="text-slate-200 font-medium leading-relaxed">
                          <MathRenderer content={stmt.text || stmt.statement || ''} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {(['P', 'F'] as const).map(v => (
                          <button
                            key={v}
                            type="button"
                            onClick={() => {
                              triggerHaptic('light');
                              setTfAnswers(prev => ({
                                ...prev,
                                [currentIndex]: { ...(prev[currentIndex] || {}), [stmt.id]: v }
                              }));
                            }}
                            className={`w-10 h-8 rounded-lg text-xs font-bold border transition cursor-pointer ${
                              sel === v 
                                ? 'bg-[#FFB800] border-[#FFB800] text-[#080B11] font-bold shadow-md shadow-[rgba(255,184,0,0.3)]' 
                                : 'bg-slate-950 border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* NUMERIC_INPUT */}
          {isNumeric && (
            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Wpisz wynik liczbowy:
              </label>
              <OpenTaskWorkspace
                task={currentTask as any}
                value={openAnswers[currentIndex] || ''}
                onChangeValue={(val) => handleOpenAnswerChange(val)}
                hideWhiteboard={true}
                inputPlaceholder="Wpisz wynik (użyj klawiatury)..."
              />
            </div>
          )}

          {/* OPEN_PROOF input */}
          {isOpenProof && (
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Twoje rozwiązanie algebraiczne i wniosek:
              </label>
              <textarea
                value={openAnswers[currentIndex] || ''}
                onChange={(e) => handleOpenAnswerChange(e.target.value)}
                placeholder="Zapisz przekształcenia (np. wyłączenie przed nawias, rozkład na czynniki) oraz uzasadnienie podzielności..."
                rows={5}
                className="w-full rounded-2xl bg-slate-900/80 border border-white/10 p-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#FFB800] transition text-sm leading-relaxed"
              />
            </div>
          )}

          {/* SINGLE_CHOICE / Options */}
          {!isTwoPart && !isTrueFalse && !isNumeric && !isOpenProof && currentTask.options && currentTask.options.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTask.options?.map((opt) => {
                const isSelected = selectedAnswers[currentIndex] === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFB800]/15 border-[#FFB800] text-white shadow-[0_0_15px_rgba(255,184,0,0.25)]'
                        : 'bg-slate-900/60 border-white/10 hover:border-white/20 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border ${
                      isSelected 
                        ? 'bg-[#FFB800] text-[#080B11] border-[#FFB800] font-extrabold' 
                        : 'bg-slate-800 border-white/10 text-slate-400'
                    }`}>
                      {opt.id}
                    </span>
                    <div className="text-sm font-medium flex-1 pt-0.5">
                      <MathRenderer content={(opt as any).content_latex || (opt as any).text || ''} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation bottom bar */}
        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`py-3 px-4 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition ${
              currentIndex === 0 
                ? 'opacity-40 cursor-not-allowed text-slate-600 bg-slate-900' 
                : 'text-slate-300 bg-slate-900 hover:bg-slate-800 border border-white/10 cursor-pointer active:scale-95'
            }`}
          >
            <ChevronLeft size={16} />
            <span>Poprzednie</span>
          </button>

          {currentIndex < examData.totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex(prev => Math.min(examData.totalQuestions - 1, prev + 1))}
              className="py-3 px-5 rounded-xl bg-[#FFB800] hover:bg-[#FFC72C] text-[#080B11] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md shadow-[rgba(255,184,0,0.35)]"
            >
              <span>Następne pytanie</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              id="boss-exam-finish-submit-button"
              onClick={handleFinishExamAuto}
              className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-lg shadow-amber-500/30"
            >
              <Award size={16} />
              <span>ZAKOŃCZ I OCEŃ SPRAWDZIAN ({answeredCount}/{examData.totalQuestions})</span>
            </button>
          )}
        </div>
      </main>

      {/* Exit confirmation modal */}
      {showExitConfirm && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowExitConfirm(false);
          }}
        >
          <div className="bg-[#0B0F19] rounded-2xl border border-white/10 p-6 max-w-sm w-full text-center">
            <AlertTriangle size={36} className="text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Przerwać sprawdzian?</h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              Sprawdzian jest w toku. Jeśli wyjdziesz teraz, Twoje dotychczasowe odpowiedzi nie zostaną zaliczone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
              >
                Kontynuuj sprawdzian
              </button>
              <button
                onClick={onCancel}
                className="py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold cursor-pointer"
              >
                Przerwij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
