import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Target, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Award, 
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathRenderer } from './MathRenderer';
import { triggerHaptic, playSuccessSound, playErrorSound } from '../utils';

interface DiagnosticTask {
  id: string;
  topic: string;
  domain: string;
  question: string;
  instruction?: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  weight: number;
}

const MATH_DIAGNOSTIC_TASKS: DiagnosticTask[] = [
  {
    id: 'diag-math-1',
    topic: 'Liczby rzeczywiste i potęgi',
    domain: 'Fundamenty algebry',
    question: 'Wartość wyrażenia $2^3 \\cdot 2^4 : 2^5$ jest równa:',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    options: [
      { id: 'A', text: '$2^2 = 4$', isCorrect: true },
      { id: 'B', text: '$2^7 = 128$', isCorrect: false },
      { id: 'C', text: '$2^1 = 2$', isCorrect: false },
      { id: 'D', text: '$2^{12}$', isCorrect: false }
    ],
    explanation: 'Zgodnie z prawami działań na potęgach: $2^{3+4-5} = 2^2 = 4$.',
    weight: 1
  },
  {
    id: 'diag-math-2',
    topic: 'Równania i nierówności',
    domain: 'Funkcje i algebra',
    question: 'Rozwiązaniem równania $\\frac{x - 3}{x + 2} = 0$ jest liczba:',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    options: [
      { id: 'A', text: '$x = -2$', isCorrect: false },
      { id: 'B', text: '$x = 3$', isCorrect: true },
      { id: 'C', text: '$x = 0$', isCorrect: false },
      { id: 'D', text: '$x = -3$', isCorrect: false }
    ],
    explanation: 'Ułamek jest równy zero, gdy licznik wynosi zero i mianownik jest różny od zera: $x - 3 = 0 \\implies x = 3$ (oraz $x \\neq -2$).',
    weight: 1
  },
  {
    id: 'diag-math-3',
    topic: 'Funkcja liniowa i proste prostopadłe',
    domain: 'Geometria analityczna',
    question: 'Współczynnik kierunkowy prostej prostopadłej do prostej o równaniu $y = 2x + 5$ wynosi:',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    options: [
      { id: 'A', text: '$a = 2$', isCorrect: false },
      { id: 'B', text: '$a = -2$', isCorrect: false },
      { id: 'C', text: '$a = -\\frac{1}{2}$', isCorrect: true },
      { id: 'D', text: '$a = \\frac{1}{2}$', isCorrect: false }
    ],
    explanation: 'Dwie proste są prostopadłe, gdy iloczyn ich współczynników wynosi $-1$: $a_1 \\cdot a_2 = -1 \\implies 2 \\cdot a_2 = -1 \\implies a_2 = -\\frac{1}{2}$.',
    weight: 1
  }
];

const POLISH_DIAGNOSTIC_TASKS: DiagnosticTask[] = [
  {
    id: 'diag-pol-1',
    topic: 'Pozytywizm i motyw pracy',
    domain: 'Lektury obowiązkowe',
    question: 'Który z bohaterów powieści *Lalka* Bolesława Prusa reprezentuje idee pracy u podstaw i scjentyzmu?',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    options: [
      { id: 'A', text: 'Julian Ochocki', isCorrect: true },
      { id: 'B', text: 'Ignacy Rzecki', isCorrect: false },
      { id: 'C', text: 'Tomasz Łęcki', isCorrect: false },
      { id: 'D', text: 'Kazimierz Starski', isCorrect: false }
    ],
    explanation: 'Julian Ochocki jest młodym naukowcem i idealistą naukowym poświęcającym życie badaniom fizycznym i wynalazkom.',
    weight: 1
  },
  {
    id: 'diag-pol-2',
    topic: 'Romantyzm i motyw prometejski',
    domain: 'Dramat romantyczny',
    question: 'W której części *Dziadów* Adama Mickiewicza znajduje się słynna *Wielka Improwizacja* Konrada?',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    options: [
      { id: 'A', text: 'W części II', isCorrect: false },
      { id: 'B', text: 'W części III', isCorrect: true },
      { id: 'C', text: 'W części IV', isCorrect: false },
      { id: 'D', text: 'W Ustępie', isCorrect: false }
    ],
    explanation: 'Wielka Improwizacja, w której Konrad występuje w imieniu narodu przeciw Bogu, jest kluczową sceną aktu I *Dziadów części III*.',
    weight: 1
  },
  {
    id: 'diag-pol-3',
    topic: 'Język i retoryka',
    domain: 'Formuła CKE',
    question: 'Środek stylistyczny polegający na celowym wyolbrzymieniu cech opisywanego zjawiska to:',
    instruction: 'Wybierz właściwą odpowiedź spośród podanych.',
    options: [
      { id: 'A', text: 'Hiperbola', isCorrect: true },
      { id: 'B', text: 'Litota', isCorrect: false },
      { id: 'C', text: 'Oksymoron', isCorrect: false },
      { id: 'D', text: 'Anafora', isCorrect: false }
    ],
    explanation: 'Hiperbola (przesadnia) to figura retoryczna polegająca na zamierzonym wyolbrzymieniu (np. morze łez).',
    weight: 1
  }
];

interface DiagnosticTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectKey?: string;
  onComplete?: (assessedPercent: number, correctCount: number, totalCount: number) => void;
  onCompleteDiagnostic?: (assessedPercent: number, correctCount: number, totalCount: number) => void;
}

export const DiagnosticTestModal: React.FC<DiagnosticTestModalProps> = ({
  isOpen,
  onClose,
  subjectKey = 'math',
  onComplete,
  onCompleteDiagnostic
}) => {
  const handleFinalComplete = onComplete || onCompleteDiagnostic || (() => {});
  const isPolish = subjectKey === 'pol';
  const tasks = isPolish ? POLISH_DIAGNOSTIC_TASKS : MATH_DIAGNOSTIC_TASKS;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [answersState, setAnswersState] = useState<Record<number, { selected: string; isCorrect: boolean }>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentTask = tasks[currentIndex];

  const handleSelectOption = (id: string) => {
    if (isAnswerChecked || isFinished) return;
    triggerHaptic('light');
    setSelectedOption(id);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerChecked) return;
    const correct = currentTask.options.find(o => o.id === selectedOption)?.isCorrect || false;

    if (correct) {
      triggerHaptic('success');
      playSuccessSound();
    } else {
      triggerHaptic('error');
      playErrorSound();
    }

    setIsAnswerChecked(true);
    setAnswersState(prev => ({
      ...prev,
      [currentIndex]: { selected: selectedOption, isCorrect: correct }
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < tasks.length - 1) {
      triggerHaptic('light');
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsFinished(true);
      triggerHaptic('success');
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const correctAnswersCount = Object.values(answersState).filter(a => a.isCorrect).length;
  
  // Dynamic scale: 3/3 -> 78%, 2/3 -> 54%, 1/3 -> 34%, 0/3 -> 20%
  const assessedPercent = Math.min(
    100,
    Math.round(20 + (correctAnswersCount / tasks.length) * 60)
  );

  const assessedPoints = Math.round((assessedPercent / 100) * 50 * 10) / 10;
  const isPassing = assessedPercent >= 30;

  const levelLabel = assessedPercent >= 75
    ? 'Zaawansowany (Top Klasa)'
    : assessedPercent >= 50
    ? 'Solidna Podstawa (Powyżej progu)'
    : assessedPercent >= 30
    ? 'Poziom Podstawowy (Na progu 30%)'
    : 'Wymaga Powtórzenia Fundamentów';

  const handleApplyResult = () => {
    triggerHaptic('medium');
    handleFinalComplete(assessedPercent, correctAnswersCount, tasks.length);
    onClose();
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setAnswersState({});
    setIsFinished(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#0C101C] border border-white/10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isPolish ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                <Target size={18} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  Test Diagnostyczny Poziomu
                </h3>
                <p className="text-[11px] text-slate-400">
                  {isPolish ? 'Język Polski' : 'Matematyka'} • Kalibracja Predyktora CKE
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition border border-white/5 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
            {!isFinished ? (
              <>
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400 font-semibold">
                    <span>Pytanie {currentIndex + 1} z {tasks.length}</span>
                    <span className="text-amber-400 font-bold">{currentTask.domain}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 w-full">
                    {tasks.map((_, idx) => {
                      const isDone = idx < currentIndex;
                      const isActive = idx === currentIndex;
                      return (
                        <div
                          key={idx}
                          className={`flex-1 h-2 sm:h-2.5 rounded-full overflow-hidden relative transition-all duration-300 ${
                            isDone
                              ? 'bg-emerald-500/20 border border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                              : isActive
                                ? 'bg-amber-500/20 border border-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.5)] ring-1 ring-[#FFB800]/50'
                                : 'bg-slate-900/80 border border-white/10'
                          }`}
                        >
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isDone
                                ? 'w-full bg-gradient-to-r from-emerald-500 to-emerald-400'
                                : isActive
                                  ? 'w-full bg-gradient-to-r from-[#FF8800] via-[#FFB800] to-[#FFE082] animate-pulse'
                                  : 'w-0'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Question box */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {currentTask.topic}
                  </span>
                  <div className="text-sm sm:text-base font-medium text-white leading-relaxed">
                    <MathRenderer content={currentTask.question} />
                  </div>
                </div>

                {/* Options (strictly one marked correct!) */}
                <div className="space-y-2 pt-1">
                  {currentTask.options.map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    const isThisCorrect = opt.isCorrect;

                    let btnClass = 'w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all text-xs sm:text-sm font-medium cursor-pointer ';
                    if (!isAnswerChecked) {
                      btnClass += isSelected
                        ? isPolish
                          ? 'bg-rose-500/15 border-rose-500 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                          : 'bg-amber-500/15 border-amber-500 text-amber-100 shadow-[0_0_15px_rgba(255,184,0,0.25)]'
                        : 'bg-slate-900/60 hover:bg-slate-900/90 border-slate-800 text-slate-200';
                    } else {
                      if (isThisCorrect) {
                        btnClass += 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
                      } else if (isSelected && !isThisCorrect) {
                        btnClass += 'bg-rose-950/40 border-rose-500 text-rose-200';
                      } else {
                        btnClass += 'bg-slate-900/30 border-slate-800/40 opacity-40 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isAnswerChecked}
                        onClick={() => handleSelectOption(opt.id)}
                        className={btnClass}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border ${
                            isSelected && !isAnswerChecked
                              ? isPolish ? 'bg-rose-500 text-white border-rose-400' : 'bg-[#FFB800] text-slate-950 border-amber-400'
                              : isAnswerChecked && isThisCorrect
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                              : isAnswerChecked && isSelected && !isThisCorrect
                              ? 'bg-rose-500 text-white border-rose-400'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}>
                            {opt.id}
                          </span>
                          <span className="flex-1">
                            <MathRenderer content={opt.text} />
                          </span>
                        </div>
                        {isAnswerChecked && isThisCorrect && (
                          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                        )}
                        {isAnswerChecked && isSelected && !isThisCorrect && (
                          <XCircle size={18} className="text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on checked */}
                {isAnswerChecked && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 leading-relaxed"
                  >
                    <span className="font-bold text-white block mb-1">Wyjaśnienie:</span>
                    <MathRenderer content={currentTask.explanation} />
                  </motion.div>
                )}

                {/* Action button */}
                <div className="pt-2">
                  {!isAnswerChecked ? (
                    <button
                      type="button"
                      disabled={!selectedOption}
                      onClick={handleCheckAnswer}
                      className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition shadow-md cursor-pointer ${
                        selectedOption
                          ? isPolish ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'bg-[#FFB800] hover:bg-amber-400 text-slate-950'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Sprawdź odpowiedź
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <span>{currentIndex < tasks.length - 1 ? 'Kolejne pytanie' : 'Zobacz wynik testu'}</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Diagnostic Summary Results */
              <div className="space-y-4 text-center py-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,184,0,0.2)]">
                  <Award size={32} className="text-amber-400" />
                </div>

                <div>
                  <span className={`inline-block text-xs font-black uppercase px-3 py-1 rounded-full border mb-2 ${
                    isPassing
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                  }`}>
                    {isPassing ? '✓ Prognoza powyżej progu 30%' : '✕ Poniżej progu 30%'}
                  </span>
                  <h4 className="text-3xl sm:text-4xl font-black text-white">
                    {assessedPercent}%
                  </h4>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">
                    Szacowany wynik: {assessedPoints} / 50 pkt ({correctAnswersCount}/{tasks.length} poprawnych)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Twój oszacowany poziom:</span>
                    <span className="font-bold text-white">{levelLabel}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-slate-400">Pewność predyktora:</span>
                    <span className="font-bold text-emerald-400">Wysoka (Skalibrowano)</span>
                  </div>
                  <p className="text-slate-300 pt-1 leading-relaxed">
                    Test diagnostyczny precyzyjnie zaktualizował Twój wskaźnik szansy maturalnej. Wynik został uwzględniony w predyktorze na pulpicie.
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleApplyResult}
                    className={`w-full py-3.5 rounded-xl font-black text-xs sm:text-sm tracking-wide transition shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                      isPolish
                        ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-950/50'
                        : 'bg-[#FFB800] hover:bg-amber-400 text-slate-950 shadow-amber-950/50'
                    }`}
                  >
                    <span>Zapisz i zaktualizuj Predyktor</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw size={13} />
                    <span>Powtórz test diagnostyczny</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
