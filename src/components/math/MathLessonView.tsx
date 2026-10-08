import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Award,
  BookOpen,
  Check,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathRenderer } from '../MathRenderer';
import { MathLessonDefinition } from '../../data/mathCurriculumData';
import { triggerHaptic, playSuccessSound } from '../../utils';

export interface MathLessonDefinitionData extends MathLessonDefinition {
  tasks: any[];
  topicId?: string;
  topicTitle?: string;
}

export interface MathLessonViewProps {
  lesson: MathLessonDefinitionData;
  onBack: () => void;
  onNextLesson?: (nextId?: string) => void;
  onCompleteLesson?: (lessonId: string, pointsEarned: number) => void;
  onOpenFormulas?: (sectionId?: string) => void;
  userState?: any;
}

export const MathLessonView: React.FC<MathLessonViewProps> = ({
  lesson,
  onBack,
  onNextLesson,
  onCompleteLesson
}) => {
  const [currentStep, setCurrentStep] = useState<'theory' | 'practice' | 'completed'>('theory');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const tasks = lesson.tasks || [];
  const currentTask = tasks[currentTaskIndex];
  const theory = lesson.theory_pill;

  const handleCheckAnswer = () => {
    if (!selectedOption || !currentTask) return;
    setIsAnswerChecked(true);
    const isCorrect = selectedOption === (currentTask.correctAnswer || currentTask.correct_answer);
    if (isCorrect) {
      triggerHaptic('success');
      playSuccessSound();
      setCorrectCount(prev => prev + 1);
    } else {
      triggerHaptic('error');
    }
  };

  const handleNextTask = () => {
    if (currentTaskIndex + 1 < tasks.length) {
      setCurrentTaskIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setCurrentStep('completed');
      triggerHaptic('success');
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      if (onCompleteLesson) {
        onCompleteLesson(lesson.id, (correctCount + 1) * 10);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070a0f] text-[#dfe2f1] font-sans pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#070a0f]/95 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Powrót do kursu</span>
        </button>
        <div className="text-center">
          <span className="text-[10px] font-bold text-[#FFB800] tracking-wider uppercase block">
            {lesson.badge || 'Lekcja matematyki'}
          </span>
          <span className="text-xs sm:text-sm font-black text-white truncate max-w-xs block">
            {lesson.title}
          </span>
        </div>
        <div className="w-16" />
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {currentStep === 'theory' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e1522] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-[#FFB800]">
                <BookOpen size={20} />
                <h2 className="text-base sm:text-lg font-black text-white">Istota pojęcia w pigułce</h2>
              </div>
              {theory?.concept_essence && (
                <div className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  <MathRenderer content={typeof theory.concept_essence === 'string' ? theory.concept_essence : JSON.stringify(theory.concept_essence)} />
                </div>
              )}
              {theory?.plain_polish && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs sm:text-sm text-amber-200">
                  <span className="font-bold block mb-1">Z polskiego na nasze:</span>
                  {theory.plain_polish}
                </div>
              )}
            </div>

            {theory?.exam_trap && (
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 space-y-2">
                <div className="flex items-center gap-2 font-black text-sm text-rose-300">
                  <AlertCircle size={18} />
                  <span>Pułapka egzaminacyjna CKE</span>
                </div>
                <div className="text-xs sm:text-sm leading-relaxed">
                  <MathRenderer content={typeof theory.exam_trap === 'string' ? theory.exam_trap : JSON.stringify(theory.exam_trap)} />
                </div>
              </div>
            )}

            <button
              onClick={() => {
                triggerHaptic('medium');
                setCurrentStep('practice');
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Przejdź do zadań treningowych ({tasks.length})</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {currentStep === 'practice' && currentTask && (
          <div className="space-y-6 animate-fadeIn">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Zadanie {currentTaskIndex + 1} z {tasks.length}</span>
              <span className="text-[#FFB800]">{correctCount} poprawnych</span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#0e1522] border border-white/10 space-y-4">
              <span className="text-[10px] font-bold text-[#FFB800] uppercase tracking-wider block">
                Zadanie maturalne
              </span>
              <div className="text-sm sm:text-base text-white leading-relaxed">
                <MathRenderer content={currentTask.question || currentTask.content || ''} />
              </div>

              {currentTask.options && currentTask.options.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  {currentTask.options.map((opt: any, idx: number) => {
                    const optId = typeof opt === 'string' ? String.fromCharCode(65 + idx) : (opt.id || String.fromCharCode(65 + idx));
                    const optText = typeof opt === 'string' ? opt : (opt.text || opt.content || '');
                    const isSelected = selectedOption === optId;
                    const isCorrectAnswer = optId === (currentTask.correctAnswer || currentTask.correct_answer);

                    let btnStyle = 'border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.06]';
                    if (isAnswerChecked) {
                      if (isCorrectAnswer) {
                        btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-300';
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-[#FFB800] bg-[#FFB800]/15 text-[#FFDCA1] font-bold';
                    }

                    return (
                      <button
                        key={optId}
                        disabled={isAnswerChecked}
                        onClick={() => {
                          triggerHaptic('light');
                          setSelectedOption(optId);
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-black/40 flex items-center justify-center text-xs font-bold shrink-0">
                            {optId}
                          </span>
                          <span><MathRenderer content={optText} /></span>
                        </div>
                        {isAnswerChecked && isCorrectAnswer && (
                          <Check size={16} className="text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {isAnswerChecked && currentTask.explanation && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed mt-4">
                  <span className="font-bold text-[#FFB800] block mb-1">Wyjaśnienie:</span>
                  <MathRenderer content={currentTask.explanation} />
                </div>
              )}
            </div>

            {!isAnswerChecked ? (
              <button
                disabled={!selectedOption}
                onClick={handleCheckAnswer}
                className="w-full py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                Sprawdź odpowiedź
              </button>
            ) : (
              <button
                onClick={handleNextTask}
                className="w-full py-3.5 rounded-xl font-black text-sm bg-emerald-500 text-black hover:bg-emerald-400 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{currentTaskIndex + 1 < tasks.length ? 'Następne zadanie' : 'Zakończ lekcję'}</span>
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        )}

        {currentStep === 'completed' && (
          <div className="text-center space-y-6 py-12 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <Award size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Świetna robota!</h2>
              <p className="text-sm text-slate-400 mt-1">
                Lekcja ukończona: {correctCount} / {tasks.length} poprawnych odpowiedzi
              </p>
            </div>
            <button
              onClick={onBack}
              className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-black font-black text-sm hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg"
            >
              Wróć do mapy nauki
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
