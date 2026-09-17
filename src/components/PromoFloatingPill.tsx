import React from 'react';
import { motion } from 'motion/react';
import { Flame, ArrowRight } from 'lucide-react';
import { formatPromoSeconds } from '../services/promotionService';
import { triggerHaptic } from '../utils';

interface PromoFloatingPillProps {
  secondsLeft: number;
  onClick: () => void;
  isVisible?: boolean;
}

export function PromoFloatingPill({
  secondsLeft,
  onClick,
  isVisible = true
}: PromoFloatingPillProps) {
  if (!isVisible || secondsLeft <= 0) return null;

  const isUrgent = secondsLeft <= 300; // < 5 minut

  const handleClick = () => {
    triggerHaptic(isUrgent ? 'heavy' : 'medium');
    onClick();
  };

  return (
    <motion.button
      type="button"
      id="promo-floating-pill"
      initial={{ opacity: 0, scale: 0.88, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -10 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`fixed top-26 right-3 sm:top-24 sm:right-6 z-40 h-10 sm:h-11 flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full transition-all cursor-pointer select-none ${
        isUrgent
          ? 'bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white border border-rose-300/80 shadow-[0_4px_0_#9F1239,0_8px_25px_rgba(244,63,94,0.5)] active:translate-y-1 active:shadow-[0_1px_0_#9F1239]'
          : 'bg-gradient-to-r from-[#FFB800] via-[#FFA000] to-[#FF8C00] text-[#070A0F] border border-amber-200/90 shadow-[0_4px_0_#B37F00,0_8px_25px_rgba(255,184,0,0.45)] active:translate-y-1 active:shadow-[0_1px_0_#B37F00]'
      }`}
      title={isUrgent ? 'Twoja zniżka -50% zaraz wygaśnie! Kliknij, aby odebrać.' : 'Kliknij, aby odebrać 50% zniżki na JASNE PRO'}
      aria-label="Odbierz zniżkę -50% na pakiet PRO"
    >
      {/* Dynamiczna ikona / wskaźnik */}
      <div className="flex items-center justify-center shrink-0">
        {isUrgent ? (
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>
        ) : (
          <Flame size={16} className="text-[#070A0F] fill-[#070A0F]/25 animate-pulse shrink-0" />
        )}
      </div>

      <div className="flex items-center gap-1 font-mono text-xs sm:text-[13px] font-black tracking-tight whitespace-nowrap tabular-nums">
        <span className={isUrgent ? 'text-rose-100 font-black uppercase text-[10px] sm:text-[11px] tracking-wider' : 'text-[#070A0F] font-black'}>
          {isUrgent ? 'Kończy się!' : '-50% PRO:'}
        </span>
        <span className={isUrgent ? 'text-white font-black underline decoration-white/50' : 'text-[#070A0F] font-black'}>
          {formatPromoSeconds(secondsLeft)}
        </span>
      </div>

      <div className={`flex items-center justify-center pl-1.5 border-l text-[10px] sm:text-[11px] font-black uppercase tracking-wider ${
        isUrgent 
          ? 'border-white/30 text-white' 
          : 'border-black/20 text-[#070A0F]'
      }`}>
        <span>Odbierz</span>
        <ArrowRight size={12} className="ml-0.5" strokeWidth={3} />
      </div>
    </motion.button>
  );
}

export default PromoFloatingPill;
