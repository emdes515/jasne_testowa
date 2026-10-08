import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Award,
  BookOpen,
  Check,
  AlertCircle,
  Clock,
  RotateCcw,
  Zap,
  HelpCircle,
  Lightbulb,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EnglishLessonData } from '../../data/english/englishLessonsData';
import { ALL_ENGLISH_TASKS } from '../../data/english/allEnglishTasks';
import { EnglishTask } from '../../types/englishTypes';
import { triggerHaptic, playSuccessSound, playErrorSound } from '../../utils';
import { EnglishConceptFormatter } from './EnglishConceptFormatter';

export interface EnglishLessonViewProps {
  lesson: EnglishLessonData;
  onBack: () => void;
  onNextLesson?: (nextId: string) => void;
  onCompleteLesson?: (lessonId: string, pointsEarned: number) => void;
}

export const EnglishLessonView: React.FC<EnglishLessonViewProps> = ({
  lesson,
  onBack,
  onNextLesson,
  onCompleteLesson
}) => {
  const [currentStep, setCurrentStep] = useState<'theory' | 'practice' | 'completed'>('theory');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // Retrieve tasks for this lesson
  const tasks: EnglishTask[] = useMemo(() => {
    if (lesson.taskIds && lesson.taskIds.length > 0) {
      const matched = lesson.taskIds
        .map((id) => ALL_ENGLISH_TASKS.find((t) => t.id === id))
        .filter((t): t is EnglishTask => Boolean(t));
      if (matched.length > 0) return matched;
    }
    // Fallback to tasks from the same topic
    const topicTasks = ALL_ENGLISH_TASKS.filter((t) => t.topicId === lesson.topicId);
    return topicTasks.slice(0, 5);
  }, [lesson]);

  const currentTask: EnglishTask | undefined = tasks[currentTaskIndex];
  const theory = lesson.theoryPill;

  const handleCheckAnswer = () => {
    if (!currentTask || isAnswerChecked) return;

    let isCorrect = false;
    const taskType = currentTask.type;

    if (taskType === 'SINGLE_CHOICE' || currentTask.options) {
      if (!selectedOption) return;
      isCorrect = selectedOption.trim().toLowerCase() === (currentTask.correctAnswer || '').trim().toLowerCase();
    } else {
      if (!typedAnswer.trim()) return;
      const cleanTyped = typedAnswer.trim().toLowerCase();
      const cleanCorrect = (currentTask.correctAnswer || '').trim().toLowerCase();
      isCorrect = cleanTyped === cleanCorrect;
    }

    setIsAnswerChecked(true);

    if (isCorrect) {
      triggerHaptic('success');
      playSuccessSound();
      setCorrectCount((prev) => prev + 1);
    } else {
      triggerHaptic('error');
      playErrorSound();
    }
  };

  const handleNextTask = () => {
    if (currentTaskIndex + 1 < tasks.length) {
      setCurrentTaskIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTypedAnswer('');
      setIsAnswerChecked(false);
    } else {
      setCurrentStep('completed');
      triggerHaptic('success');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      const pts = (correctCount + 1) * 15;
      if (onCompleteLesson) {
        onCompleteLesson(lesson.id, pts);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-[#dfe2f1] font-sans pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#070a0f]/95 backdrop-blur-md border-b border-[#141d2e] px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Powrót do modułu</span>
        </button>
        <div className="text-center max-w-sm truncate">
          <span className="text-[10px] font-bold text-[#FFB800] tracking-wider uppercase block">
            Język Angielski • Formuła 2023
          </span>
          <span className="text-xs sm:text-sm font-black text-white truncate block">
            {lesson.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
          <Clock size={14} className="text-amber-400" />
          <span>{lesson.estimatedMinutes || 6} min</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* ========================================================================= */}
        {/* TEORIA I PIGUŁKA BENTO */}
        {/* ========================================================================= */}
        {currentStep === 'theory' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header / Subtitle */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e1522] border border-[#141d2e] shadow-xl">
              <div className="flex items-center gap-2 text-[#FFB800] mb-2">
                <BookOpen size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Klucz do tematu</span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white mb-2">{lesson.title}</h1>
              {lesson.subtitle && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{lesson.subtitle}</p>
              )}

              {theory?.concept_essence && (
                <div className="mt-4 pt-4 border-t border-white/5 text-sm sm:text-base leading-relaxed">
                  <EnglishConceptFormatter content={theory.concept_essence} />
                </div>
              )}
            </div>

            {/* Modelowe przykłady krok po kroku */}
            {theory?.worked_examples && Array.isArray(theory.worked_examples) && theory.worked_examples.length > 0 && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0e1522] border border-[#141d2e] space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-emerald-400">
                  <FileCheck size={18} />
                  <h2 className="text-sm sm:text-base font-black text-white">Modelowe rozwiązanie CKE</h2>
                </div>
                <div className="space-y-4">
                  {theory.worked_examples.map((ex: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                      <div className="text-xs font-bold text-emerald-300">
                        {ex.title || `Przykład ${idx + 1}`}
                      </div>
                      <div className="text-sm font-semibold text-white">{ex.problem}</div>
                      {ex.steps && Array.isArray(ex.steps) && (
                        <div className="space-y-1.5 mt-2 pt-2 border-t border-white/5 text-xs text-slate-300">
                          {ex.steps.map((st: any, sIdx: number) => (
                            <div key={sIdx} className="flex gap-2">
                              <span className="font-bold text-emerald-400 shrink-0">Krok {st.num}:</span>
                              <span>{st.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {ex.result && (
                        <div className="mt-2 text-xs font-bold text-[#FFB800] bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                          Wynik: {ex.result}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pułapka CKE */}
            {theory?.exam_trap && (
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 space-y-2 shadow-xl">
                <div className="flex items-center gap-2 font-black text-sm text-rose-300">
                  <AlertCircle size={18} />
                  <span>Pułapka egzaminacyjna CKE / False Friends</span>
                </div>
                <div className="text-xs sm:text-sm leading-relaxed text-rose-100">
                  <EnglishConceptFormatter content={typeof theory.exam_trap === 'string' ? theory.exam_trap : JSON.stringify(theory.exam_trap)} />
                </div>
              </div>
            )}

            {/* Kontekst maturalny */}
            {theory?.matura_context && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-2 shadow-xl">
                <div className="flex items-center gap-2 font-black text-sm text-amber-300">
                  <Lightbulb size={18} />
                  <span>Wskazówka egzaminatora i kontekst arkusza</span>
                </div>
                <div className="text-xs sm:text-sm leading-relaxed text-amber-100">
                  {typeof theory.matura_context === 'string' ? theory.matura_context : JSON.stringify(theory.matura_context)}
                </div>
              </div>
            )}

            {/* Przycisk przejścia do zadań */}
            <button
              onClick={() => {
                triggerHaptic('medium');
                setCurrentStep('practice');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Przejdź do zadań treningowych ({tasks.length})</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ĆWICZENIA PRAKTYCZNE */}
        {/* ========================================================================= */}
        {currentStep === 'practice' && currentTask && (
          <div className="space-y-6 animate-fadeIn">
            {/* Pasek postępu */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="flex items-center gap-2">
                <Zap size={14} className="text-[#FFB800]" />
                Zadanie {currentTaskIndex + 1} z {tasks.length}
              </span>
              <span className="text-[#FFB800] bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                {correctCount} poprawnych
              </span>
            </div>

            {/* Karta Zadania */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e1522] border border-[#141d2e] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#FFB800] uppercase tracking-wider">
                  Zadanie maturalne • {currentTask.type || 'Praktyka'}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {currentTask.points || 1} pkt
                </span>
              </div>

              <div className="text-sm sm:text-base text-white leading-relaxed font-medium">
                {currentTask.question || (currentTask as any).content || ''}
              </div>

              {/* Fragment kontekstowy (np. tekst/dialog) */}
              {(currentTask as any).contextText && (
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-xs sm:text-sm text-slate-300 italic">
                  {(currentTask as any).contextText}
                </div>
              )}

              {/* Opcje wyboru (jeśli zadanie zamknięte) */}
              {currentTask.options && currentTask.options.length > 0 ? (
                <div className="space-y-2.5 pt-2">
                  {currentTask.options.map((opt, oIdx) => {
                    const optKey = typeof opt === 'string' ? opt : (opt as any).text || (opt as any).label || '';
                    const isSelected = selectedOption === optKey;
                    const isCorrect = isAnswerChecked && (optKey === currentTask.correctAnswer);
                    const isWrongSelected = isAnswerChecked && isSelected && !isCorrect;

                    let btnStyle = 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200';
                    if (isSelected) {
                      btnStyle = 'bg-amber-500/20 border-amber-500/60 text-amber-200 shadow-md';
                    }
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-md';
                    } else if (isWrongSelected) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-md';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswerChecked}
                        onClick={() => {
                          triggerHaptic('light');
                          setSelectedOption(optKey);
                        }}
                        className={`w-full p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span className="leading-snug">{optKey}</span>
                        {isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Wpisz odpowiedź (luka / zadanie otwarte) */
                <div className="space-y-2 pt-2">
                  <input
                    type="text"
                    disabled={isAnswerChecked}
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    placeholder="Wpisz brakujące słowo / frazę..."
                    className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Wyjaśnienie po sprawdzeniu */}
              {isAnswerChecked && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-2 text-xs sm:text-sm animate-fadeIn">
                  <div className="font-bold flex items-center gap-2">
                    {selectedOption?.trim().toLowerCase() === (currentTask.correctAnswer || '').trim().toLowerCase() ||
                     typedAnswer.trim().toLowerCase() === (currentTask.correctAnswer || '').trim().toLowerCase() ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 size={16} /> Świetnie! Poprawna odpowiedź
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <AlertCircle size={16} /> Wymagana forma: <strong className="text-white">{currentTask.correctAnswer}</strong>
                      </span>
                    )}
                  </div>
                  {currentTask.explanation && (
                    <p className="text-slate-300 leading-relaxed">{currentTask.explanation}</p>
                  )}
                  {currentTask.ckeTrap && (
                    <div className="text-rose-300 text-[11px] bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                      <strong>Pułapka CKE:</strong> {currentTask.ckeTrap}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Przyciski akcji */}
            <div className="flex gap-3">
              {!isAnswerChecked ? (
                <button
                  disabled={!selectedOption && !typedAnswer.trim()}
                  onClick={handleCheckAnswer}
                  className="w-full py-3.5 rounded-xl bg-[#FFB800] disabled:opacity-40 disabled:cursor-not-allowed text-black font-black text-sm shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Sprawdź odpowiedź
                </button>
              ) : (
                <button
                  onClick={handleNextTask}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-black text-sm shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{currentTaskIndex + 1 < tasks.length ? 'Następne zadanie' : 'Zakończ lekcję'}</span>
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PODSUMOWANIE UKOŃCZENIA */}
        {/* ========================================================================= */}
        {currentStep === 'completed' && (
          <div className="text-center py-10 space-y-6 animate-scaleIn">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800] shadow-2xl">
              <Award size={40} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Lekcja Ukończona!</h2>
              <p className="text-sm text-slate-400">
                Opanowałeś koncept: <span className="text-[#FFB800] font-semibold">{lesson.title}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="p-4 rounded-xl bg-[#0e1522] border border-[#141d2e]">
                <span className="text-2xl font-black text-emerald-400 block">{correctCount} / {tasks.length}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Poprawne zadania</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0e1522] border border-[#141d2e]">
                <span className="text-2xl font-black text-[#FFB800] block">+{(correctCount + 1) * 15}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Zdobyte XP</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto pt-4">
              <button
                onClick={onBack}
                className="flex-1 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition-all cursor-pointer"
              >
                Wróć do modułu
              </button>
              {onNextLesson && (
                <button
                  onClick={() => {
                    const nextId = `eng-lesson-${parseInt(lesson.id.replace(/\D/g, '') || '1') + 1}`;
                    onNextLesson(nextId);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-[#FFB800] hover:brightness-110 text-black font-black text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Kolejna lekcja</span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
