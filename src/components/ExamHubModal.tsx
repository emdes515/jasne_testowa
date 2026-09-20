import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Layers, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  Clock, 
  Award, 
  Target, 
  CheckCircle2, 
  Zap,
  Flame,
  ChevronRight
} from 'lucide-react';
import { triggerHaptic } from '../utils';
import { SubjectKey } from '../types';

export interface ExamHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMode: (mode: 'maraton' | 'exam_setup' | 'full_exams') => void;
  selectedSubjectKey?: SubjectKey;
  totalTasksCount?: number;
}

export function ExamHubModal({
  isOpen,
  onClose,
  onSelectMode,
  selectedSubjectKey = 'math',
  totalTasksCount = 1006
}: ExamHubModalProps) {
  if (!isOpen) return null;

  const isPolish = selectedSubjectKey === 'pol';

  const handleModeClick = (mode: 'maraton' | 'exam_setup' | 'full_exams') => {
    triggerHaptic('medium');
    onSelectMode(mode);
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            triggerHaptic('light');
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-[#0b0f19] border border-white/10 rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-white/5 flex items-start justify-between gap-3 bg-gradient-to-b from-[#111726]/70 to-transparent shrink-0">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isPolish 
                    ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30' 
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                }`}>
                  {isPolish ? 'Język Polski • Egzamin CKE' : 'Matematyka • Egzamin CKE'}
                </span>
                <span className="text-[10px] font-medium text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                  Formuła 2023
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-display font-extrabold text-white tracking-tight leading-snug">
                Centrum Egzaminacyjne CKE
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Wybierz dogodny tryb przygotowania do egzaminu maturalnego
              </p>
            </div>

            <button
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
              className="w-9 h-9 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition active:scale-95 shrink-0 flex items-center justify-center cursor-pointer border border-white/5"
              aria-label="Zamknij okno"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista 3 Trybów w stylu Bento */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-3 custom-scrollbar flex-1">
            {/* Tryb 1: Rozwiąż wszystkie zadania z bazy (Maraton CKE) */}
            <div
              onClick={() => handleModeClick('maraton')}
              className="group relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#121927] via-[#0f1422] to-[#0a0e18] border border-amber-500/30 hover:border-amber-400/60 transition-all duration-200 cursor-pointer shadow-lg shadow-amber-950/20 active:scale-[0.99] flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-[#FFB800] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md uppercase tracking-wider font-mono">
                        {isPolish ? '1056 zadań z bazy' : `${totalTasksCount} oficjalnych zadań`}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Trening ciągły
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      Rozwiąż wszystkie zadania z bazy
                    </h3>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 text-slate-400 group-hover:text-amber-300 flex items-center justify-center transition-all shrink-0">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pl-0.5">
                Przerabiaj autentyczne pytania egzaminacyjne zadanie po zadaniu. Zero presji zegara, natychmiastowe objaśnienia po błędzie i polowanie na pułapki CKE.
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-amber-300/90 font-medium">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ciągły drill i utrwalanie wiedzy</span>
                </span>
                <span className="font-bold flex items-center gap-1 group-hover:underline">
                  Rozpocznij maraton
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Tryb 2: Mini Matura CKE */}
            <div
              onClick={() => handleModeClick('exam_setup')}
              className="group relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#161228] via-[#110e20] to-[#0a0815] border border-purple-500/25 hover:border-purple-400/50 transition-all duration-200 cursor-pointer shadow-md hover:shadow-purple-950/20 active:scale-[0.99] flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[10px] font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-md uppercase tracking-wider font-mono">
                        20 – 35 min
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        5 lub 10 zadań
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                      Szybka Mini Matura CKE
                    </h3>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 text-slate-400 group-hover:text-purple-300 flex items-center justify-center transition-all shrink-0">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pl-0.5">
                Przekrojowy test z losowo dobranych działów. Idealna próba generalna przed sprawdzianem z symulacją punktacji procentowej i realnym zegarem.
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-purple-300/90 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Szybka weryfikacja formy</span>
                </span>
                <span className="font-bold flex items-center gap-1 group-hover:underline">
                  Skonfiguruj test
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Tryb 3: Pełne Oficjalne Arkusze CKE */}
            <div
              onClick={() => handleModeClick('full_exams')}
              className="group relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#0e1927] via-[#0a121e] to-[#070d16] border border-sky-500/25 hover:border-sky-400/50 transition-all duration-200 cursor-pointer shadow-md hover:shadow-sky-950/20 active:scale-[0.99] flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[10px] font-bold text-sky-300 bg-sky-500/15 border border-sky-500/30 px-2 py-0.5 rounded-md uppercase tracking-wider font-mono">
                        180 min • {isPolish ? '60 pkt' : '50 pkt'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Oficjalne arkusze CKE
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                      Pełne Arkusze Maturalne
                    </h3>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 group-hover:bg-sky-500/20 group-hover:border-sky-500/40 text-slate-400 group-hover:text-sky-300 flex items-center justify-center transition-all shrink-0">
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed pl-0.5">
                Rozwiązuj 6 autentycznych oficjalnych arkuszy CKE (Maj, Czerwiec, Sierpień 2024 i 2023) w pełnym reżimie czasowym z oficjalnym kluczem oceniania.
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-sky-300/90 font-medium">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  <span>Autentyczny symulator matury</span>
                </span>
                <span className="font-bold flex items-center gap-1 group-hover:underline">
                  Wybierz arkusz
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 sm:p-4 border-t border-white/5 bg-[#080c14] flex items-center justify-between text-xs text-slate-400 shrink-0">
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Każde zadanie weryfikowane przez algorytmy zgodności z kluczem CKE
            </span>
            <button
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs transition cursor-pointer"
            >
              Zamknij
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
