import React from 'react';
import { motion } from 'motion/react';
import {
  RotateCcw,
  X,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface TaskRetryScreenProps {
  mistakesCount: number;
  onStartRetryPhase: () => void;
  onCancelTask: () => void;
}

export function TaskRetryScreen({
  mistakesCount,
  onStartRetryPhase,
  onCancelTask
}: TaskRetryScreenProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#070A0F]/90 backdrop-blur-xl flex items-center justify-center p-0 md:p-6 lg:p-8 select-none overflow-hidden">
      <div className="w-full h-full md:h-[90vh] md:max-h-[850px] md:max-w-[760px] bg-[#0B0E14] md:rounded-[32px] md:border md:border-white/10 md:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,229,255,0.06)] flex flex-col justify-between items-stretch overflow-hidden relative">
        <header className="shrink-0 px-4 pt-4 pb-3 border-b border-white/5 bg-[#0B0E14] flex items-center justify-between z-20">
        <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <RotateCcw size={14} /> Pętla Poprawkowa
        </span>
        <button
          onClick={onCancelTask}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-8 flex flex-col items-center justify-center text-center w-full custom-scrollbar">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-20 h-20 rounded-3xl bg-[#00C2FF]/15 border-2 border-[#00C2FF] text-[#00C2FF] flex items-center justify-center shadow-[0_0_30px_rgba(0,194,255,0.25)] mb-5"
        >
          <RotateCcw size={40} className="animate-spin-slow" />
        </motion.div>

        <span className="text-xs font-black uppercase text-[#00C2FF] tracking-widest px-3 py-1 rounded-full bg-[#00C2FF]/10 border border-[#00C2FF]/20 mb-3">
          Faza Poprawkowa
        </span>

        <h2 className="font-display font-black text-2xl sm:text-3xl text-white mb-2 tracking-tight">
          Czas na szybką powtórkę!
        </h2>

        <p className="text-[#9CA3AF] text-sm max-w-sm leading-relaxed mb-6">
          Popraw błędy, aby ukończyć lekcję i utrwalić wiedzę. Pętla poprawek to najskuteczniejszy sposób na 100% z matury.
        </p>

        <div className="w-full bg-[#141C28] border border-white/10 rounded-2xl p-4 text-left shadow-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-amber-400" />
              Zadania do poprawy:
            </span>
            <span className="text-xs font-black text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
              {mistakesCount} {mistakesCount === 1 ? 'zadanie' : 'zadania'}
            </span>
          </div>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Za każdą udaną poprawkę otrzymujesz <span className="text-[#00C2FF] font-bold">+5 XP</span> oraz odblokowujesz oficjalny Ekran Sukcesu z gwiazdkami.
          </p>
        </div>
      </div>

      <footer className="shrink-0 w-full p-4 bg-[#0B0E14]/95 backdrop-blur-md border-t border-white/5" style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
        <button
          onClick={onStartRetryPhase}
          className="w-full bg-[#00C2FF] hover:bg-[#00B4E6] border-b-4 border-[#0099CC] text-[#0B131E] font-black text-base py-3.5 px-6 rounded-2xl active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(0,194,255,0.25)]"
        >
          <span>Popraw błędy</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  </div>
  );
}
