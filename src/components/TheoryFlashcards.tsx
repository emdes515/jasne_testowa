import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  X,
  Check
} from 'lucide-react';
import { MathRenderer } from './MathRenderer';
import { triggerHaptic } from '../utils';

export interface TheoryCardItem {
  title: string;
  badge?: string;
  type?: 'essence' | 'formulas' | 'example' | 'trap' | 'takeaway' | 'default';
  concept_essence?: string;
  matura_context?: string;
  formulas?: string[];
  core_formulas?: string;
  formula_notes?: string;
  worked_example?: {
    problem: string;
    step1?: string;
    step2?: string;
    result?: string;
    steps?: { step_num: number; explanation: string }[];
  };
  exam_trap?: string;
  trap_error?: string;
  trap_correct?: string;
  trap_note?: string;
  content?: string;
}

export function buildTheoryCards(theoryItem: any): TheoryCardItem[] {
  const pill = theoryItem?.theory_pill;
  if (pill) {
    const cards: TheoryCardItem[] = [];

    // Card 1: Istota pojęcia & Strategia maturalna (Bento Essence)
    if (pill.concept_essence || pill.matura_context || pill.intuition || pill.key_takeaway) {
      cards.push({
        title: pill.title || 'Istota pojęcia & Strategia maturalna',
        badge: 'Fundament Maturalny',
        type: 'essence',
        concept_essence: pill.concept_essence || pill.intuition,
        matura_context: pill.matura_context || pill.key_takeaway,
        content: pill.concept_essence || pill.intuition || pill.key_takeaway
      });
    }

    // Card 2: Złote Wzory (Karty Wzorów)
    const rawFormulas = pill.core_formulas || pill.core_formula || pill.coreFormulaLatex;
    if (rawFormulas || (pill.formulas && pill.formulas.length > 0)) {
      let formulasList: string[] = pill.formulas || [];
      if (!formulasList || formulasList.length === 0) {
        if (Array.isArray(rawFormulas)) {
          formulasList = rawFormulas.map((f: any) => String(f).trim()).filter(Boolean);
        } else if (typeof rawFormulas === 'string') {
          formulasList = rawFormulas
            .split(/\n+|\$\$\s*\$\$|\\quad(?!\w)|,\s*(?=\\[a-zA-Z]+|[a-zA-Z0-9])/)
            .map((f: string) => f.replace(/\$\$/g, '').trim())
            .filter((f: string) => f.length > 0 && f !== ',');
        }
      }

      cards.push({
        title: 'Złote Wzory i Zależności',
        badge: 'Karta Wzorów',
        type: 'formulas',
        core_formulas: typeof rawFormulas === 'string' ? rawFormulas : undefined,
        formulas: formulasList,
        formula_notes: pill.formula_notes
      });
    }

    // Card 3: Przykład z arkusza (Worked Example)
    if (pill.worked_example) {
      cards.push({
        title: 'Przykład z arkusza krok po kroku',
        badge: 'Modelowe Rozwiązanie',
        type: 'example',
        worked_example: pill.worked_example
      });
    }

    // Card 4: Pułapka Egzaminacyjna (Exam Trap - delicate warning border, no AI slop)
    if (pill.exam_trap || pill.cke_trap || pill.trap_error || pill.trapAlert) {
      cards.push({
        title: 'Pułapka Egzaminacyjna',
        badge: 'Uwaga na Egzaminie',
        type: 'trap',
        exam_trap: pill.exam_trap || pill.cke_trap || pill.trapAlert,
        trap_error: pill.trap_error,
        trap_correct: pill.trap_correct,
        trap_note: pill.trap_note || pill.exam_trap || pill.cke_trap || pill.trapAlert,
        content: pill.exam_trap || pill.cke_trap || pill.trapAlert
      });
    }

    if (cards.length > 0) return cards;
  }

  // Fallback to parsing officialKey if no structured theory_pill
  return parseTheoryCards(theoryItem?.officialKey || '', theoryItem?.question || '');
}

export function parseTheoryCards(officialKey: string, question: string): TheoryCardItem[] {
  const sanitized = (officialKey || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .trim();

  if (sanitized.includes('•')) {
    const rawBullets = sanitized.split(/\n?•\s*/).filter(b => b.trim().length > 0);
    const bullets = rawBullets.filter(b => !b.toLowerCase().startsWith('pigułka wiedzy'));

    return bullets.map(b => {
      const lines = b.split('\n').map(l => l.trim()).filter(Boolean);
      let title = lines[0] || 'Kluczowa Reguła';

      if (title.includes(':')) {
        const colonIdx = title.indexOf(':');
        const afterColon = title.substring(colonIdx + 1).trim();
        title = title.substring(0, colonIdx).trim();
        if (afterColon) {
          lines[0] = afterColon;
        } else {
          lines.shift();
        }
      } else {
        lines.shift();
      }

      const content = lines.join('\n\n');
      const isTrap = title.toLowerCase().includes('pułapk') || title.toLowerCase().includes('błąd');

      return {
        title,
        badge: isTrap ? 'Częsty Błąd' : 'Kluczowa Reguła',
        type: isTrap ? 'trap' : 'default',
        content,
        trap_note: isTrap ? content : undefined
      };
    });
  }

  return [{
    title: 'Pigułka wiedzy',
    badge: 'Podsumowanie',
    type: 'default',
    content: sanitized || question
  }];
}

interface TheoryFlashcardsProps {
  theoryItem: any;
  cards: TheoryCardItem[];
  currentTheoryIndex: number;
  setCurrentTheoryIndex: (index: number | ((prev: number) => number)) => void;
  practiceQueueLength: number;
  onCancelTask: () => void;
  onStartPractice: () => void;
  onCompleteTheory: () => void;
}

export function TheoryFlashcards({
  theoryItem,
  cards,
  currentTheoryIndex,
  setCurrentTheoryIndex,
  practiceQueueLength,
  onCancelTask,
  onStartPractice,
  onCompleteTheory
}: TheoryFlashcardsProps) {
  const currentCard = cards[currentTheoryIndex] || cards[0];
  const isLastCard = currentTheoryIndex === cards.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-[#070A0F]/90 backdrop-blur-xl flex items-center justify-center p-0 md:p-6 lg:p-8 overflow-hidden">
      <div className="w-full h-full h-[100dvh] md:h-[90vh] md:max-h-[850px] md:max-w-[760px] bg-[#0B0E14] md:rounded-[32px] md:border md:border-white/10 md:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,229,255,0.06)] flex flex-col justify-start items-stretch overflow-hidden relative">
        <header className="shrink-0 px-4 pt-3.5 pb-3 border-b border-white/5 bg-[#0B0E14] flex items-center justify-between z-20">
        <button
          onClick={onCancelTask}
          className="flex items-center gap-1.5 text-[#9CA3AF] hover:text-white text-xs font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors active:scale-95"
        >
          <X size={14} /> Zamknij
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#00C2FF] bg-[#00C2FF]/10 border border-[#00C2FF]/20 px-2.5 py-1 rounded-full flex items-center gap-1">
            <BookOpen size={12} />
            <span>{theoryItem.topic || 'Pigułka wiedzy'}</span>
          </span>
          <span className="text-xs font-bold text-[#8B8D98]">
            {currentTheoryIndex + 1} / {cards.length}
          </span>
        </div>
      </header>

      <main
        className="flex-1 min-h-0 overflow-y-auto px-4 py-3 flex flex-col justify-start items-stretch gap-3 custom-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheoryIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.18 }}
            className="bg-[#141C28] border border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-xl flex-1 min-h-0 flex flex-col justify-between relative overflow-y-auto custom-scrollbar"
          >
            <div className="flex-1 flex flex-col justify-start">
              <div className="flex items-center justify-between gap-2 mb-2 text-xs font-bold">
                <div className="flex items-center gap-2">
                  {currentCard.type === 'trap' ? (
                    <>
                      <AlertTriangle size={14} className="text-amber-400" />
                      <span className="text-amber-400 font-black uppercase tracking-wider">{currentCard.badge || 'Częsty Błąd'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} className="text-[#00C2FF]" />
                      <span className="text-[#00C2FF] font-black uppercase tracking-wider">{currentCard.badge || 'Kluczowa Reguła'}</span>
                    </>
                  )}
                </div>

                {/* Elegant pagination dots in card header */}
                <div className="flex items-center gap-1.5">
                  {cards.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCurrentTheoryIndex(idx);
                        triggerHaptic('light');
                      }}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        idx === currentTheoryIndex ? 'w-5 bg-[#00C2FF] shadow-[0_0_8px_rgba(0,194,255,0.5)]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-label={`Przejdź do kroku ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-display font-black text-lg sm:text-xl text-white mb-2 leading-snug">
                {currentCard.title}
              </h3>

              {/* Card Type: essence (Istota pojęcia & Kontekst maturalny) */}
              {currentCard.type === 'essence' ? (
                <div className="flex flex-col gap-3.5 w-full my-auto">
                  {currentCard.concept_essence && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1622] border border-white/10 text-white/95 text-sm sm:text-base leading-relaxed break-words">
                      <span className="text-[11px] font-bold text-[#00C2FF] uppercase tracking-wider block mb-1.5">
                        Istota pojęcia:
                      </span>
                      <MathRenderer content={currentCard.concept_essence} className="leading-relaxed" />
                    </div>
                  )}
                  {currentCard.matura_context && (
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-slate-300 text-xs sm:text-sm leading-relaxed break-words">
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                        Wskazówka egzaminacyjna:
                      </span>
                      <MathRenderer content={currentCard.matura_context} className="leading-relaxed" />
                    </div>
                  )}
                </div>
              ) : currentCard.type === 'formulas' ? (
                /* Card Type: formulas */
                <div className="flex flex-col gap-3 w-full my-auto">
                  {currentCard.core_formulas ? (
                    <div className="w-full bg-[#0B101B] border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                      <div className="w-full max-w-full overflow-x-auto py-1 text-center">
                        <MathRenderer content={currentCard.core_formulas} displayMode={true} />
                      </div>
                    </div>
                  ) : currentCard.formulas && currentCard.formulas.length > 0 ? (
                    <div className="w-full bg-[#0B101B] border border-white/10 rounded-xl overflow-hidden shadow-inner">
                      <div className="divide-y divide-white/10 flex flex-col">
                        {currentCard.formulas.map((formula, idx) => (
                          <div
                            key={idx}
                            className="w-full py-2 px-3 flex items-center justify-between gap-2.5 hover:bg-white/[0.02] transition-colors"
                          >
                            <span className="text-xs font-mono font-bold text-[#00C2FF]/70 shrink-0 w-5 text-left">
                              {idx + 1}.
                            </span>
                            <div className="flex-1 flex items-center justify-center py-1 text-center overflow-visible min-h-[36px] no-scrollbar">
                              <MathRenderer
                                content={formula.startsWith('$') ? formula : `$${formula}$`}
                                className="text-white font-bold text-xs sm:text-sm text-center"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {currentCard.formula_notes && (
                    <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-xs text-slate-400 leading-relaxed">
                      <MathRenderer content={currentCard.formula_notes} />
                    </div>
                  )}
                </div>
              ) : currentCard.type === 'example' && currentCard.worked_example ? (
                /* Card Type: example (Worked example krok po kroku) */
                <div className="flex flex-col gap-3 w-full my-auto text-left">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#0F1622] border border-white/10">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                      Zadanie z arkusza:
                    </span>
                    <div className="text-xs sm:text-sm font-medium text-white leading-relaxed">
                      <MathRenderer content={currentCard.worked_example.problem} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {currentCard.worked_example.step1 && (
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </span>
                        <div className="flex-1 leading-relaxed">
                          <MathRenderer content={currentCard.worked_example.step1} />
                        </div>
                      </div>
                    )}

                    {currentCard.worked_example.step2 && (
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </span>
                        <div className="flex-1 leading-relaxed">
                          <MathRenderer content={currentCard.worked_example.step2} />
                        </div>
                      </div>
                    )}

                    {currentCard.worked_example.steps?.map((st) => (
                      <div key={st.step_num} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {st.step_num}
                        </span>
                        <div className="flex-1 leading-relaxed">
                          <MathRenderer content={st.explanation} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {currentCard.worked_example.result && (
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-400 font-medium">Wynik końcowy:</span>
                      <span className="font-mono font-bold text-emerald-300">
                        <MathRenderer content={`$${currentCard.worked_example.result}$`} />
                      </span>
                    </div>
                  )}
                </div>
              ) : currentCard.type === 'trap' ? (
                /* Card Type: trap (Delicate warning border, Apple-like, no AI slop) */
                <div className="flex flex-col gap-3 w-full my-auto text-left">
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/30 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Uwaga na egzaminie:</span>
                    </div>
                    <div className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-normal">
                      <MathRenderer content={currentCard.exam_trap || currentCard.content || ''} />
                    </div>
                  </div>

                  {currentCard.trap_error && (
                    <div className="p-3 sm:p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-rose-400 mb-1.5 shrink-0">
                        <X size={14} className="stroke-[3]" />
                        <span>Częsty błąd</span>
                      </div>
                      <div className="text-white font-medium text-xs sm:text-sm leading-relaxed break-words py-0.5 max-w-full">
                        <MathRenderer
                          content={currentCard.trap_error.startsWith('$') ? currentCard.trap_error : `$${currentCard.trap_error}$`}
                          className="flex flex-wrap items-center gap-x-1.5 gap-y-1 break-words max-w-full"
                        />
                      </div>
                    </div>
                  )}

                  {currentCard.trap_correct && (
                    <div className="p-3 sm:p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-400 mb-1.5 shrink-0">
                        <Check size={14} className="stroke-[3]" />
                        <span>Prawidłowy zapis</span>
                      </div>
                      <div className="text-white font-medium text-xs sm:text-sm leading-relaxed break-words py-0.5 max-w-full">
                        <MathRenderer
                          content={currentCard.trap_correct.startsWith('$') ? currentCard.trap_correct : `$${currentCard.trap_correct}$`}
                          className="flex flex-wrap items-center gap-x-1.5 gap-y-1 break-words max-w-full"
                        />
                      </div>
                    </div>
                  )}

                  {(currentCard.trap_note && currentCard.trap_note !== currentCard.exam_trap) && (
                    <div className="p-3 bg-[#0F1622] border border-white/10 rounded-xl text-xs sm:text-sm text-[#9CA3AF] leading-relaxed break-words max-w-full">
                      <MathRenderer content={currentCard.trap_note} className="break-words" />
                    </div>
                  )}
                </div>
              ) : (
                /* Card Type: takeaway or default */
                <div className="bg-[#0F1622] border border-white/10 rounded-2xl p-4 sm:p-5 my-auto text-white/95 text-sm sm:text-base leading-relaxed break-words">
                  <MathRenderer content={currentCard.content || ''} className="leading-relaxed" />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="shrink-0 p-4 border-t border-white/5 bg-[#0B0E14] flex gap-3 z-20" style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
        {currentTheoryIndex > 0 && (
          <button
            onClick={() => {
              setCurrentTheoryIndex((i: number) => i - 1);
              triggerHaptic('light');
            }}
            className="bg-[#141C28] hover:bg-[#1A2434] text-white border border-white/10 font-bold px-5 py-3.5 rounded-xl text-sm transition-all flex items-center justify-center active:scale-95"
          >
            Wstecz
          </button>
        )}

        <button
          onClick={() => {
            triggerHaptic('light');
            if (!isLastCard) {
              setCurrentTheoryIndex((i: number) => i + 1);
            } else {
              if (practiceQueueLength > 0) {
                onStartPractice();
              } else {
                onCompleteTheory();
              }
            }
          }}
          className="flex-1 bg-[#00C2FF] hover:bg-[#00B4E6] border-b-4 border-[#0099CC] text-[#0B131E] font-black py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 group active:translate-y-1 active:border-b-0 shadow-[0_0_20px_rgba(0,194,255,0.25)]"
        >
          <span>
            {!isLastCard
              ? 'Następna karta'
              : practiceQueueLength > 0
                ? `Rozpocznij zadania (1/${practiceQueueLength})`
                : 'Rozpocznij zadania'}
          </span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  </div>
  );
}
