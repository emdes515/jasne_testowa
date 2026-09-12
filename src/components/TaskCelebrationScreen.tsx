import React from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  Zap,
  Coins,
  Flame,
  CheckCircle2,
  RefreshCw,
  X,
  ArrowRight
} from 'lucide-react';

interface TaskCelebrationScreenProps {
  totalEarnedXp: number;
  totalEarnedCoins: number;
  streakDays: number;
  firstPassMistakesCount: number;
  onContinue: () => void;
}

export function TaskCelebrationScreen({
  totalEarnedXp,
  totalEarnedCoins,
  streakDays,
  firstPassMistakesCount,
  onContinue
}: TaskCelebrationScreenProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#070A0F]/90 backdrop-blur-xl flex items-center justify-center p-0 md:p-6 lg:p-8 select-none overflow-hidden">
      <div className="w-full h-full md:h-[90vh] md:max-h-[850px] md:max-w-[760px] bg-[#0B0E14] md:rounded-[32px] md:border md:border-white/10 md:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,229,255,0.06)] flex flex-col justify-between items-stretch overflow-hidden relative">
        {/* Top bar header */}
        <header className="shrink-0 px-4 pt-4 pb-3 border-b border-white/5 bg-[#0B0E14] flex items-center justify-end z-20">
          <button
            onClick={onContinue}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors active:scale-95"
            title="Zamknij"
          >
            <X size={16} />
          </button>
        </header>

        {/* Juicy Vertical Center Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col items-center justify-center text-center w-full custom-scrollbar">
          {/* 1. Large Glowing Trophy in centered golden success disc */}
          <div className="relative mb-5 flex items-center justify-center">
            <div className="absolute w-44 h-44 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
            <div className="absolute w-36 h-36 rounded-full border border-amber-400/20 animate-spin pointer-events-none" style={{ animationDuration: '24s' }} />

            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 14, stiffness: 220 }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border-2 bg-gradient-to-br from-amber-400/25 via-yellow-500/15 to-amber-600/20 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.4)] z-10"
            >
              <Trophy size={52} className="text-amber-400 drop-shadow-md shrink-0" strokeWidth={2} />
            </motion.div>
          </div>

          {/* 2. Bold Title and Subtitle */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight mb-1.5"
          >
            Lekcja ukończona!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="text-slate-400 text-sm mb-5"
          >
            Wszystkie zadania rozwiązane pomyślnie.
          </motion.p>

          {/* 3. Three Equal Reward Cards (XP, Monety, Seria) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full grid grid-cols-3 gap-3 mb-5 max-w-sm sm:max-w-md"
          >
            {/* XP Card */}
            <div className="bg-[#141C28] border border-cyan-500/30 rounded-2xl p-3.5 flex flex-col items-center justify-center min-h-[96px] shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-1.5 text-cyan-400">
                <Zap size={16} className="fill-cyan-400 text-cyan-400" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">+{totalEarnedXp}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mt-0.5">
                XP
              </span>
            </div>

            {/* Coins Card */}
            <div className="bg-[#141C28] border border-amber-400/30 rounded-2xl p-3.5 flex flex-col items-center justify-center min-h-[96px] shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-1.5 text-amber-400">
                <Coins size={16} className="text-amber-400" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">+{totalEarnedCoins}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mt-0.5">
                Monet
              </span>
            </div>

            {/* Streak Card */}
            <div className="bg-[#141C28] border border-orange-500/30 rounded-2xl p-3.5 flex flex-col items-center justify-center min-h-[96px] shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mb-1.5 text-orange-400">
                <Flame size={16} className="fill-orange-400 text-orange-400" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">{streakDays} dni</span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mt-0.5">
                Seria
              </span>
            </div>
          </motion.div>

          {/* 4. Elegant Accuracy / Completion Pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 shadow-sm ${
              firstPassMistakesCount === 0
                ? 'bg-slate-900/90 border border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.12)]'
                : 'bg-slate-900/90 border border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.12)]'
            }`}
          >
            {firstPassMistakesCount === 0 ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Bezbłędnie (0 błędów) • 100% skuteczności</span>
              </>
            ) : (
              <>
                <RefreshCw size={13} className="text-amber-400 shrink-0" />
                <span>Zaliczono z pętlą • {firstPassMistakesCount} {firstPassMistakesCount === 1 ? 'błąd poprawiony' : firstPassMistakesCount < 5 ? 'błędy poprawione' : 'błędów poprawionych'}</span>
              </>
            )}
          </motion.div>
        </div>

        {/* 5. Sticky Action Footer: powrót do mapy lekcji */}
        <footer className="shrink-0 w-full p-4 bg-[#0B0E14] border-t border-white/5 z-20" style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
          <div className="flex flex-col items-center w-full">
            <button
              onClick={onContinue}
              className="w-full h-[52px] bg-[#00C2FF] hover:bg-[#00B4E6] border-b-4 border-[#0099CC] text-[#0B131E] font-black text-base px-6 rounded-2xl active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(0,194,255,0.35)] cursor-pointer"
            >
              <span>WRÓĆ DO MAPY NAUKI</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <p className="text-center text-xs font-semibold text-[#8B8D98] mt-2.5 truncate max-w-full px-2">
              Zobacz swój zaliczony krok na mapie działu
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
