import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  BookOpen, 
  AlertCircle,
  AlertTriangle,
  Sparkles,
  Award
} from 'lucide-react';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export interface MaturaAiEvaluation {
  score: number;
  maxPoints: number;
  isPassed?: boolean;
  gradeTitle?: string;
  mentorComment?: string;
  ckeFeedback?: string;
  strengths?: string[];
  errors?: string[];
  suggestion?: string;
  ckeTrap?: string;
  transcription?: string;
  criteriaBreakdown?: any;
}

export interface MaturaTaskReviewItem {
  id: string;
  section: string;
  content: string;
  options: string[];
  correctAnswer: string;
  points: number;
  isClosed: boolean;
  explanation: string;
  userAnswer?: string;
  userPointsEarned: number;
  isFlagged?: boolean;
  aiEvaluation?: MaturaAiEvaluation;
}

interface MaturaExamReviewProps {
  tasks: MaturaTaskReviewItem[];
  timeSpentSeconds: number;
  onRetryMistakes: (mistakeTasks: MaturaTaskReviewItem[]) => void;
  onBackToMenu: () => void;
  xpAwarded?: number;
  coinsAwarded?: number;
}

export function MaturaExamReview({
  tasks,
  timeSpentSeconds,
  onRetryMistakes,
  onBackToMenu,
  xpAwarded = 0,
  coinsAwarded = 0,
}: MaturaExamReviewProps) {
  const [filter, setFilter] = useState<'all' | 'mistakes'>('all');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
  const earnedPoints = tasks.reduce((sum, t) => sum + t.userPointsEarned, 0);
  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  const isPassed = percentage >= 30;

  const mistakes = tasks.filter(t => t.userPointsEarned < t.points);
  const displayedTasks = filter === 'mistakes' ? mistakes : tasks;

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  const renderMathContent = (content: string) => (
    <div className="prose prose-invert max-w-none text-sm leading-relaxed overflow-x-auto py-1 -my-1 text-text-primary math-render">
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content}
      </Markdown>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Top Banner Card - Nocturne Luminary */}
      <div className="bg-surface-card border border-[#FFB800]/20 rounded-[28px] p-6 sm:p-8 text-center relative overflow-hidden shadow-xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 bg-gradient-to-tr from-[#FFB800]/20 to-amber-600/20 border border-[#FFB800]/40 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
          <Trophy className="text-[#FFB800]" size={32} />
        </div>

        <span className={`inline-block text-xs font-black uppercase px-3.5 py-1 rounded-full mb-3 border tracking-wider ${
          isPassed 
            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
            : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
        }`}>
          {isPassed ? '✓ Egzamin Zdany (>= 30%)' : '✕ Poniżej progu 30%'}
        </span>

        <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-2 tracking-tight tabular-nums font-mono">
          {earnedPoints} / {totalPoints} pkt ({percentage}%)
        </h2>
        <p className="text-text-secondary text-sm max-w-md mx-auto mb-6 leading-relaxed">
          {percentage >= 80 
            ? 'Genialny wynik! Perfekcyjne opanowanie materiału i wysoka precyzja zgodna z CKE.'
            : percentage >= 50
            ? 'Dobry wynik! Przeanalizuj popełnione błędy, aby pewnie podbić wynik powyżej 80%.'
            : isPassed
            ? 'Próg zdawalności osiągnięty, ale zalecamy powtórzenie kluczowych zadań z bazy błędów.'
            : 'Nie poddawaj się! Wykorzystaj oficjalny klucz odpowiedzi i przećwicz błędy w trybie maratonu.'}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 bg-[#070A0F]/80 border border-surface-border rounded-2xl p-3 sm:p-4 mb-6 text-left">
          <div>
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block">Czas arkusza</span>
            <div className="flex items-center gap-1.5 mt-0.5 text-white font-bold text-sm tabular-nums font-mono">
              <Clock size={14} className="text-[#FFB800]" />
              <span>{formatTime(timeSpentSeconds)}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block">Błędy do powtórki</span>
            <div className="flex items-center gap-1.5 mt-0.5 text-white font-bold text-sm">
              <AlertCircle size={14} className={mistakes.length > 0 ? 'text-amber-400' : 'text-emerald-400'} />
              <span>{mistakes.length} zad.</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block">Zdobyte XP</span>
            <div className="flex items-center gap-1 mt-0.5 text-[#FFB800] font-bold text-sm">
              <Zap size={14} className="text-[#FFB800]" />
              <span>+{xpAwarded} XP</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {mistakes.length > 0 && (
            <button
              onClick={() => onRetryMistakes(mistakes)}
              className="flex-1 py-3.5 px-4 bg-gradient-to-r from-[#FFB800] via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black rounded-xl font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>Przećwicz tylko błędy ({mistakes.length})</span>
            </button>
          )}

          <button
            onClick={onBackToMenu}
            className="flex-1 py-3.5 px-4 bg-white/5 hover:bg-white/10 text-white border border-surface-border rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-[0.98]"
          >
            <ArrowLeft size={16} />
            <span>Wróć do menu</span>
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen size={18} className="text-[#FFB800]" />
            Szczegółowy przegląd zadań
          </h3>

          {/* Filters */}
          <div className="flex bg-surface-card border border-surface-border p-1 rounded-xl text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                filter === 'all' ? 'bg-[#FFB800] text-black shadow-sm' : 'text-text-muted hover:text-white'
              }`}
            >
              Wszystkie ({tasks.length})
            </button>
            <button
              onClick={() => setFilter('mistakes')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                filter === 'mistakes' ? 'bg-[#FFB800] text-black shadow-sm' : 'text-text-muted hover:text-white'
              }`}
            >
              Błędne ({mistakes.length})
            </button>
          </div>
        </div>

        {/* Task Cards */}
        <div className="space-y-3">
          {displayedTasks.map((task) => {
            const originalIndex = tasks.findIndex(t => t.id === task.id) + 1;
            const isFullScore = task.userPointsEarned === task.points;
            const isPartial = task.userPointsEarned > 0 && task.userPointsEarned < task.points;
            const isExpanded = expandedTaskId === task.id;

            return (
              <div
                key={task.id}
                className={`bg-surface-card border rounded-2xl overflow-hidden transition-all shadow-sm ${
                  isFullScore 
                    ? 'border-emerald-500/25' 
                    : isPartial 
                    ? 'border-amber-500/35' 
                    : 'border-rose-500/25'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                      isFullScore 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                        : isPartial
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    }`}>
                      {originalIndex}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-bold text-sm">
                          Zadanie {originalIndex}
                        </span>
                        <span className="text-[11px] text-text-muted bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                          {task.section}
                        </span>
                      </div>
                      <span className="text-xs text-text-secondary block mt-0.5">
                        {task.isClosed ? 'Zadanie zamknięte' : 'Zadanie otwarte (Egzaminator AI)'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className={`text-sm font-black ${
                        isFullScore ? 'text-emerald-400' : isPartial ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {task.userPointsEarned} / {task.points} pkt
                      </span>
                    </div>

                    {isExpanded ? (
                      <ChevronUp size={18} className="text-text-muted" />
                    ) : (
                      <ChevronDown size={18} className="text-text-muted" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-5 pt-3 border-t border-surface-border bg-[#070A0F]/60 space-y-4"
                    >
                      {/* Task Question Content */}
                      <div className="p-4 rounded-xl bg-surface-card border border-surface-border">
                        <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">
                          Treść polecenia CKE:
                        </div>
                        {renderMathContent(task.content)}
                      </div>

                      {/* Closed Questions Comparison */}
                      {task.isClosed && (
                        <div className="space-y-2">
                          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                            Warianty odpowiedzi:
                          </div>
                          {task.options.map((opt, optIdx) => {
                            const optLetter = String.fromCharCode(65 + optIdx);
                            const isUserPick = task.userAnswer === optLetter;
                            const isCorrectPick = task.correctAnswer.includes(optLetter);

                            let itemStyle = 'bg-surface-card border-surface-border text-text-secondary';
                            if (isCorrectPick) {
                              itemStyle = 'bg-emerald-500/10 border-emerald-500/40 text-white';
                            } else if (isUserPick && !isCorrectPick) {
                              itemStyle = 'bg-rose-500/10 border-rose-500/40 text-white';
                            }

                            return (
                              <div
                                key={optIdx}
                                className={`p-3 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${itemStyle}`}
                              >
                                <div className="flex items-start gap-3 flex-1 overflow-x-auto">
                                  <span className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                                    isCorrectPick
                                      ? 'bg-emerald-500 text-black'
                                      : isUserPick
                                      ? 'bg-rose-500 text-white'
                                      : 'bg-white/5 text-text-muted'
                                  }`}>
                                    {optLetter}
                                  </span>
                                  <div className="pt-0.5">{renderMathContent(opt)}</div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                  {isCorrectPick && (
                                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/15 px-2 py-0.5 rounded-lg">
                                      <CheckCircle2 size={12} /> Poprawna
                                    </span>
                                  )}
                                  {isUserPick && !isCorrectPick && (
                                    <span className="flex items-center gap-1 text-rose-400 text-xs font-bold bg-rose-500/15 px-2 py-0.5 rounded-lg">
                                      <XCircle size={12} /> Twój wybór
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Open Question AI Tutor Scoring & Feedback */}
                      {!task.isClosed && (
                        <div className="space-y-3">
                          {/* Rozwiązanie ucznia */}
                          <div className="p-4 rounded-xl bg-surface-card border border-surface-border">
                            <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5 flex items-center justify-between">
                              <span>Twoje zapisane rozwiązanie:</span>
                              <span className="text-[#FFB800] text-xs font-bold">
                                {task.userPointsEarned} / {task.points} pkt CKE
                              </span>
                            </div>
                            {task.userAnswer ? (
                              <div className="p-3 rounded-lg bg-[#070A0F] border border-white/5">
                                {renderMathContent(task.userAnswer)}
                              </div>
                            ) : (
                              <div className="text-xs text-text-muted italic">
                                Brak zapisanego rozwiązania (puste zadanie).
                              </div>
                            )}
                          </div>

                          {/* Karta Oceny Tutora AI */}
                          {task.aiEvaluation && (
                            <div className="p-4 rounded-xl bg-[#FFB800]/5 border border-[#FFB800]/25 space-y-3">
                              <div className="flex items-center gap-2 text-xs font-black text-[#FFB800] uppercase tracking-wider">
                                <Sparkles size={14} />
                                <span>Ocena Egzaminatora AI</span>
                              </div>

                              {task.aiEvaluation.mentorComment && (
                                <div className="text-xs sm:text-sm text-text-primary leading-relaxed">
                                  <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                    {task.aiEvaluation.mentorComment}
                                  </Markdown>
                                </div>
                              )}

                              {task.aiEvaluation.strengths && task.aiEvaluation.strengths.length > 0 && (
                                <div className="space-y-1">
                                  <div className="text-[11px] font-bold text-emerald-400">Mocne strony:</div>
                                  <ul className="list-disc list-inside text-xs text-text-secondary space-y-0.5">
                                    {task.aiEvaluation.strengths.map((str, sIdx) => (
                                      <li key={sIdx}>{str}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {task.aiEvaluation.errors && task.aiEvaluation.errors.length > 0 && (
                                <div className="space-y-1">
                                  <div className="text-[11px] font-bold text-rose-400">Wymaga poprawy:</div>
                                  <ul className="list-disc list-inside text-xs text-text-secondary space-y-0.5">
                                    {task.aiEvaluation.errors.map((err, eIdx) => (
                                      <li key={eIdx}>{err}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Pułapka Egzaminacyjna CKE (jeśli obecna) */}
                      {(task.aiEvaluation?.ckeTrap || (task as any).ckeTrap) && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                          <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={16} />
                          <div>
                            <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-0.5">
                              Pułapka Egzaminacyjna CKE
                            </div>
                            <div className="text-xs text-text-secondary leading-relaxed">
                              {task.aiEvaluation?.ckeTrap || (task as any).ckeTrap}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Matura Explanation */}
                      <div className="bg-surface-card border border-surface-border rounded-xl p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#FFB800] uppercase tracking-wider mb-2">
                          <Award size={14} />
                          Oficjalny klucz i rozwiązanie CKE
                        </div>
                        <div className="text-text-secondary text-xs leading-relaxed">
                          {renderMathContent(task.explanation)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
