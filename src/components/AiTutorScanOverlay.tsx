import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Check, Brain } from 'lucide-react';

interface AiTutorScanOverlayProps {
  isPolish?: boolean;
  onCancel?: () => void;
  isFinished?: boolean;
  onAnimationComplete?: () => void;
}

export const AiTutorScanOverlay: React.FC<AiTutorScanOverlayProps> = ({
  isPolish = false,
  onCancel,
  isFinished = false,
  onAnimationComplete
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const onAnimationCompleteRef = useRef(onAnimationComplete);
  onAnimationCompleteRef.current = onAnimationComplete;

  // Handle ESC key to cancel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  // Robust completion trigger: fires when isFinished transitions to true
  useEffect(() => {
    if (isFinished) {
      setIsCompleted(true);
      const timer = setTimeout(() => {
        onAnimationCompleteRef.current?.();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isFinished]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#070A12]/80 backdrop-blur-md p-4 select-none"
      >
        {/* Soft centered ambient glow behind the card */}
        <div
          className={`absolute w-96 h-96 rounded-full blur-[120px] transition-colors duration-500 pointer-events-none ${
            isCompleted ? 'bg-emerald-500/20' : 'bg-[#FFB800]/15'
          }`}
        />

        {/* Elegant, calm floating glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative max-w-md w-full bg-[#0E1524]/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/70 flex flex-col items-center text-center overflow-hidden"
        >
          {/* Subtle top border highlight */}
          <div
            className={`absolute top-0 inset-x-0 h-0.5 transition-colors duration-500 ${
              isCompleted
                ? 'bg-gradient-to-r from-transparent via-emerald-400 to-transparent'
                : 'bg-gradient-to-r from-transparent via-[#FFB800]/60 to-transparent'
            }`}
          />

          {/* Close / Cancel Button */}
          {onCancel && (
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
              title="Anuluj sprawdzanie (Esc)"
            >
              <X size={16} />
            </button>
          )}

          {/* Calm, aesthetic central glowing orb */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center my-3">
            {/* Outer subtle smooth spinner ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
              className={`absolute inset-0 rounded-full border-2 border-transparent transition-colors duration-500 ${
                isCompleted
                  ? 'border-t-emerald-400 border-r-emerald-500/40'
                  : 'border-t-[#FFB800] border-r-[#FFB800]/30'
              }`}
            />

            {/* Central icon container */}
            <motion.div
              animate={isCompleted ? { scale: [1, 1.1, 1] } : { scale: [1, 1.03, 1] }}
              transition={{ repeat: isCompleted ? 0 : Infinity, duration: 2.2, ease: 'easeInOut' }}
              className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
                isCompleted
                  ? 'bg-emerald-500/15 border border-emerald-400/50 text-emerald-400 shadow-emerald-500/20'
                  : 'bg-[#FFB800]/15 border border-[#FFB800]/40 text-[#FFB800] shadow-[#FFB800]/20'
              }`}
            >
              {isCompleted ? (
                <Check className="w-8 h-8 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
              ) : isPolish ? (
                <Sparkles className="w-8 h-8 drop-shadow-[0_0_12px_rgba(255,184,0,0.8)]" />
              ) : (
                <Brain className="w-8 h-8 drop-shadow-[0_0_12px_rgba(255,184,0,0.8)]" />
              )}
            </motion.div>
          </div>

          {/* Status Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 mt-2 mb-3 ${
              isCompleted
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                : 'bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isCompleted ? 'bg-emerald-400' : 'bg-[#FFB800] animate-pulse'
              }`}
            />
            <span>{isCompleted ? 'Weryfikacja zakończona' : 'Tutor AI • CKE Formuła 2025'}</span>
          </div>

          {/* Stable Height Title & Subtitle Container (prevents layout jumping) */}
          <div className="h-16 flex flex-col justify-center mb-4">
            <h3
              className={`text-lg sm:text-xl font-bold transition-colors duration-300 leading-snug ${
                isCompleted ? 'text-emerald-300' : 'text-white'
              }`}
            >
              {isCompleted ? 'Rozwiązanie sprawdzone!' : 'Sprawdzam Twoje rozwiązanie...'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm">
              {isCompleted
                ? 'Otwieram oficjalny raport oceny i wskazówki mentora.'
                : isPolish
                ? 'Weryfikuję argumentację, tezę i kryteria egzaminacyjne CKE.'
                : 'Weryfikuję tok myślenia, obliczenia i kryteria punktacji CKE.'}
            </p>
          </div>

          {/* Smooth, Sleek Progress Bar - NO JITTER, NO PERCENTAGES */}
          <div className="w-full max-w-xs space-y-2 mt-1">
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
              {isCompleted ? (
                <motion.div
                  initial={{ width: '60%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                />
              ) : (
                <motion.div
                  animate={{
                    x: ['-100%', '250%']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'easeInOut'
                  }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#FFB800] to-transparent rounded-full shadow-[0_0_8px_rgba(255,184,0,0.8)]"
                />
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-0.5">
              <span>{isCompleted ? 'Ocena gotowa' : 'Trwa weryfikacja kryteriów'}</span>
              <span className={isCompleted ? 'text-emerald-400 font-semibold' : 'text-amber-400/90'}>
                {isCompleted ? 'Sukces' : 'Analiza w toku'}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
