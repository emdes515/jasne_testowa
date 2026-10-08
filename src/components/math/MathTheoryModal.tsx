import React, { useState, useEffect } from 'react';
import { 
  X, Compass, Zap, Calculator, CheckCircle2, ShieldAlert, 
  ArrowRight, ArrowLeft, Play, Clock, Target, AlertTriangle, 
  BookOpen, ChevronRight, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MathRenderer } from '../MathRenderer';
import { NumberLineDiagram } from '../NumberLineDiagram';
import { MathDiagram } from '../MathDiagram';
import { triggerHaptic } from '../../utils';
import { LessonTheoryPill } from '../../types';

interface MathTheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSession?: () => void;
  lessonTitle: string;
  lessonBadge: string;
  theoryPill?: LessonTheoryPill | null;
  topicTitle?: string;
}

export function MathTheoryModal({
  isOpen,
  onClose,
  onStartSession,
  lessonTitle,
  lessonBadge,
  theoryPill,
  topicTitle
}: MathTheoryModalProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setActiveTab((prev) => Math.min(prev + 1, 4));
      } else if (e.key === 'ArrowLeft') {
        setActiveTab((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !theoryPill) return null;

  const tabs = [
    { id: 0, title: 'Sedno & Intuicja', icon: Compass, time: '~45 s' },
    { id: 1, title: 'Wzory & Tłumaczenie', icon: Calculator, time: '~45 s' },
    { id: 2, title: 'Algorytm CKE', icon: Zap, time: '~45 s' },
    { id: 3, title: 'Przykłady (1-2 pkt)', icon: CheckCircle2, time: '~60 s' },
    { id: 4, title: 'Pułapka CKE', icon: ShieldAlert, time: '~45 s' }
  ];

  const formulasList = Array.isArray(theoryPill.core_formulas)
    ? theoryPill.core_formulas
    : theoryPill.core_formulas
      ? [theoryPill.core_formulas]
      : [];

  const workedExamples = Array.isArray(theoryPill.worked_examples) && theoryPill.worked_examples.length > 0
    ? theoryPill.worked_examples
    : theoryPill.worked_example
      ? [theoryPill.worked_example]
      : [];

  const algorithmSteps = theoryPill.algorithm_steps || [];
  const trapDetails = theoryPill.trap_details;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] bg-[#0E1522] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-[#121B2C]/90 flex items-center justify-between shrink-0">
          <div className="min-w-0 flex-1 pr-3">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30">
                {lessonBadge}
              </span>
              {topicTitle && (
                <span className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                  {topicTitle}
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20">
                <Clock size={11} />
                <span>{theoryPill.reading_time_minutes ? `~${theoryPill.reading_time_minutes} min` : '~3-4 min'} nauki</span>
              </span>
            </div>
            <h2 className="font-display font-black text-base sm:text-lg text-white leading-snug truncate">
              {lessonTitle}
            </h2>
          </div>

          <button
            onClick={() => {
              triggerHaptic('light');
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            aria-label="Zamknij podgląd teorii"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-2 sm:px-6 pt-2 pb-1 border-b border-white/10 bg-[#0B101A] flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  triggerHaptic('light');
                  setActiveTab(tab.id);
                }}
                className={`flex-1 min-w-[110px] sm:min-w-0 py-2 sm:py-2.5 px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 text-xs font-bold transition-all cursor-pointer relative ${
                  isActive
                    ? 'text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Icon size={14} className={isActive ? 'text-[#FFB800]' : 'text-slate-400'} />
                  <span className="truncate">{tab.title}</span>
                </div>
                <span className="text-[9px] font-normal text-slate-500">{tab.time}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-sm leading-relaxed overscroll-contain">
          <AnimatePresence mode="wait">
            {/* Tab 0: Sedno & Intuicja */}
            {activeTab === 0 && (
              <motion.div
                key="tab-0"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
                className="space-y-4"
              >
                {/* Karta Sedna Konceptu */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#141E30] to-[#0F1726] border border-white/10 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FFB800]">
                    <Target size={14} />
                    <span>Sedno Konceptu (Core Concept)</span>
                  </div>
                  <div className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    <MathRenderer content={theoryPill.concept_essence || theoryPill.intuition || ''} />
                  </div>
                </div>

                {/* Z polskiego na nasze */}
                {theoryPill.plain_polish && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#1A1811] border border-[#FFB800]/25 shadow-sm space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                      <BookOpen size={14} />
                      <span>Z polskiego na nasze (Intuicja bez żargonu)</span>
                    </div>
                    <div className="text-amber-100/90 text-sm leading-relaxed font-medium">
                      <MathRenderer content={theoryPill.plain_polish} />
                    </div>
                  </div>
                )}

                {/* Diagram / Oś liczbowa */}
                {(theoryPill.numberLine || theoryPill.diagram) && (
                  <div className="p-4 rounded-2xl bg-[#090D15] border border-white/10 flex flex-col items-center justify-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Wizualizacja geometryczna / Oś liczbowa
                    </span>
                    {theoryPill.numberLine ? (
                      <NumberLineDiagram data={theoryPill.numberLine} height={60} maxWidth="420px" />
                    ) : (
                      <MathDiagram diagram={theoryPill.diagram} compact />
                    )}
                  </div>
                )}

                {/* Kontekst CKE */}
                {theoryPill.matura_context && (
                  <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2.5">
                    <HelpCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-blue-300">Kontekst egzaminacyjny CKE: </span>
                      <span>{theoryPill.matura_context}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab 1: Wzory & Tłumaczenie */}
            {activeTab === 1 && (
              <motion.div
                key="tab-1"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
                className="space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-300">
                    <span className="flex items-center gap-1.5 text-[#FFB800]">
                      <Calculator size={14} />
                      <span>Oficjalne wzory CKE i ich interpretacja</span>
                    </span>
                    <span className="text-slate-500 font-normal">Karta EM2023</span>
                  </div>

                  {formulasList.length > 0 ? (
                    formulasList.map((f: any, idx: number) => {
                      const title = typeof f === 'string' ? `Wzór ${idx + 1}` : (f.name || f.title || `Wzór ${idx + 1}`);
                      const formula = typeof f === 'string' ? f : (f.formula || f.latex || '');
                      return (
                        <div key={idx} className="p-4 rounded-2xl bg-[#121B2C] border border-white/10 space-y-2">
                          <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
                            <span>{title}</span>
                            <span className="text-[10px] text-slate-500 font-mono">#{idx + 1}</span>
                          </div>
                          <div className="py-2 px-3 rounded-xl bg-[#090D15] border border-white/5 overflow-x-auto text-center font-mono">
                            <MathRenderer content={`$$${formula}$$`} />
                          </div>
                          {f.plainPolish && (
                            <p className="text-xs text-slate-300 leading-relaxed pt-1">
                              <span className="text-[#FFB800] font-semibold">Tłumaczenie: </span>
                              {f.plainPolish}
                            </p>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs">
                      Brak osobnych wzorów algebraicznych dla tej mikrolekcji.
                    </div>
                  )}
                </div>

                {theoryPill.formula_notes && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                    <span className="font-bold text-amber-300">Wskazówka do wzorów: </span>
                    <MathRenderer content={theoryPill.formula_notes} />
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab 2: Algorytm CKE */}
            {activeTab === 2 && (
              <motion.div
                key="tab-2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FFB800] mb-1">
                  <Zap size={14} />
                  <span>Algorytm postępowania CKE (Krok po kroku)</span>
                </div>

                {algorithmSteps.length > 0 ? (
                  <div className="space-y-3">
                    {algorithmSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#121B2C] border border-white/10 flex items-start gap-3.5 shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#FFB800]/15 border border-[#FFB800]/30 text-[#FFB800] font-display font-black text-sm flex items-center justify-center shrink-0">
                          {step.stepNumber || idx + 1}
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <h4 className="font-bold text-white text-sm">
                            {step.title}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <MathRenderer content={step.description} />
                          </p>
                          {step.tip && (
                            <div className="pt-1 text-[11px] text-[#FFB800] font-medium flex items-center gap-1.5">
                              <span>💡 Wskazówka:</span>
                              <MathRenderer content={step.tip} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {(theoryPill.key_points || []).map((pt, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-slate-200">
                        <span className="w-5 h-5 rounded-md bg-[#FFB800]/20 text-[#FFB800] font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <MathRenderer content={pt} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab 3: Przykłady (1-2 pkt) */}
            {activeTab === 3 && (
              <motion.div
                key="tab-3"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FFB800]">
                  <CheckCircle2 size={14} />
                  <span>Wzorcowe rozwiązania maturalne</span>
                </div>

                {workedExamples.map((ex: any, idx: number) => {
                  const pointsBadge = ex.points || (idx === 0 ? '1 pkt' : '2 pkt');
                  const title = ex.title || (idx === 0 ? 'Zadanie Standardowe' : 'Zadanie Podchwytliwe');
                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-[#121B2C] border border-white/10 space-y-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{title}</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                          pointsBadge.includes('2')
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {pointsBadge}
                        </span>
                      </div>

                      {/* Treść zadania */}
                      <div className="p-3 rounded-xl bg-[#090D15] border border-white/5 text-xs sm:text-sm text-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Polecenie:</span>
                        <MathRenderer content={ex.problem || ''} />
                      </div>

                      {/* Krok po kroku rozwiązanie */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Rozwiązanie krok po kroku:</span>
                        <div className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                          <MathRenderer content={ex.solution || ''} />
                        </div>
                      </div>

                      {/* Kluczowa myśl */}
                      {ex.keyInsight && (
                        <div className="p-2.5 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/25 text-xs text-amber-200 flex items-start gap-2">
                          <Target size={14} className="text-[#FFB800] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#FFB800]">Klucz myślenia: </span>
                            <MathRenderer content={ex.keyInsight} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Tab 4: Pułapka CKE */}
            {activeTab === 4 && (
              <motion.div
                key="tab-4"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-400">
                  <ShieldAlert size={14} />
                  <span>Pułapka CKE & Kontrprzykład (Gdzie maturzyści tracą punkt)</span>
                </div>

                {trapDetails ? (
                  <div className="space-y-3">
                    {/* FAIL vs WIN Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* FAIL */}
                      <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-black text-rose-400 uppercase tracking-wider">
                          <X size={14} />
                          <span>Typowy Błąd (FAIL)</span>
                        </div>
                        <p className="text-xs sm:text-sm text-rose-200 leading-relaxed font-medium">
                          <MathRenderer content={trapDetails.fail} />
                        </p>
                      </div>

                      {/* WIN */}
                      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400 uppercase tracking-wider">
                          <CheckCircle2 size={14} />
                          <span>Prawidłowy Schemat (WIN)</span>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed font-medium">
                          <MathRenderer content={trapDetails.win} />
                        </p>
                      </div>
                    </div>

                    {/* Wyjaśnienie przyczyny */}
                    <div className="p-4 rounded-2xl bg-[#141A26] border border-white/10 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Dlaczego tak się dzieje?</span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        <MathRenderer content={trapDetails.explanation} />
                      </p>
                    </div>

                    {/* Wskazówka egzaminatora */}
                    {trapDetails.ckeTip && (
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                        <AlertTriangle size={16} className="text-[#FFB800] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#FFB800]">Wskazówka Egzaminatora CKE: </span>
                          <span>{trapDetails.ckeTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase">
                      <AlertTriangle size={15} />
                      <span>Uważaj na ten błąd:</span>
                    </div>
                    <div className="text-sm text-rose-200 leading-relaxed">
                      <MathRenderer content={theoryPill.exam_trap || theoryPill.trapAlert || ''} />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-white/10 bg-[#121B2C]/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                triggerHaptic('light');
                setActiveTab((prev) => Math.max(prev - 1, 0));
              }}
              disabled={activeTab === 0}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
                activeTab === 0
                  ? 'border-white/5 text-slate-600 cursor-not-allowed'
                  : 'border-white/10 text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer'
              }`}
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Wstecz</span>
            </button>

            <button
              onClick={() => {
                triggerHaptic('light');
                setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
              }}
              disabled={activeTab === tabs.length - 1}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition ${
                activeTab === tabs.length - 1
                  ? 'border-white/5 text-slate-600 cursor-not-allowed'
                  : 'border-white/10 text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer'
              }`}
            >
              <span className="hidden sm:inline">Dalej</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onStartSession ? (
              <button
                onClick={() => {
                  triggerHaptic('medium');
                  onClose();
                  onStartSession();
                }}
                className="py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 active:scale-[0.98] transition cursor-pointer bg-[#FFB800] hover:bg-[#FFC72C] text-[#080B11] shadow-md shadow-amber-500/20"
              >
                <Play size={14} fill="#080B11" strokeWidth={0} />
                <span>ROZPOCZNIJ ZADANIA Z TEJ LEKCJI</span>
                <ChevronRight size={15} strokeWidth={3} />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs cursor-pointer"
              >
                Zamknij
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
