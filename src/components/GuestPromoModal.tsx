import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Heart, Brain, Target, ArrowRight, Crown, Tag } from 'lucide-react';
import { PromotionConfig, getGuestPromoRemainingSeconds, formatPromoSeconds } from '../services/promotionService';
import { triggerHaptic } from '../utils';

interface GuestPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimPromo: (promo: PromotionConfig) => void;
  promoConfig: PromotionConfig;
}

export function GuestPromoModal({ isOpen, onClose, onClaimPromo, promoConfig }: GuestPromoModalProps) {
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => 
    getGuestPromoRemainingSeconds(promoConfig.durationMinutes)
  );

  useEffect(() => {
    if (!isOpen) return;

    setRemainingSeconds(getGuestPromoRemainingSeconds(promoConfig.durationMinutes));

    const interval = setInterval(() => {
      const remaining = getGuestPromoRemainingSeconds(promoConfig.durationMinutes);
      setRemainingSeconds(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, promoConfig.durationMinutes]);

  if (!isOpen) return null;

  const isUrgent = remainingSeconds > 0 && remainingSeconds < 300; // < 5 minut

  const handleClaim = () => {
    triggerHaptic('success');
    onClaimPromo(promoConfig);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
        {/* Tło dismiss */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-[#0A0E17] border-t sm:border border-[#FFB800]/30 rounded-t-[32px] sm:rounded-[28px] p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,184,0,0.12)] overflow-hidden z-10 max-h-[92vh] flex flex-col justify-between"
        >
          {/* Akcentowa linijka na górze */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D97706] via-[#FFB800] to-[#F59E0B]" />

          {/* Przycisk zamknięcia */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer z-20"
            aria-label="Zamknij okno"
          >
            <X size={18} />
          </button>

          <div>
            {/* Pigułka statusu + Zegar */}
            <div className="flex items-center justify-between gap-2 mb-3.5 pr-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 border border-[#FFB800]/30 text-[#FFB800] text-[10px] sm:text-[11px] font-black tracking-wider uppercase">
                <Crown size={12} className="text-[#FFB800]" />
                <span>VOUCHER POWITALNY</span>
              </span>

              <div 
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-black tabular-nums ${
                  isUrgent 
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
                    : 'bg-white/5 border-[#FFB800]/30 text-[#FFB800]'
                }`}
                title="Czas na zabezpieczenie zniżki"
              >
                <Clock size={12} className={isUrgent ? 'text-rose-300' : 'text-[#FFB800]'} />
                <span>{remainingSeconds > 0 ? formatPromoSeconds(remainingSeconds) : 'WYGASŁA'}</span>
              </div>
            </div>

            {/* Nagłówek i Obietnica */}
            <div className="text-left mb-3">
              <h2 className="font-display font-black text-2xl sm:text-[26px] text-white leading-tight">
                Zdobądź <span className="text-[#FFB800] underline decoration-[#FFB800]/50">-{promoConfig.discountPercent}%</span> na JASNE PRO
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Tylko teraz przy utworzeniu darmowego konta. Zapisz swoje postępy i ucz się bez ograniczeń.
              </p>
            </div>

            {/* CYBER VOUCHER TICKET (KARTA CENOWA) */}
            <div className="my-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#121824] to-[#0A0E17] border border-[#FFB800]/40 shadow-inner relative overflow-hidden">
              {/* Ozdobny znak wodny kodu */}
              <div className="absolute -right-4 -bottom-4 text-white/[0.03] font-mono font-black text-6xl select-none pointer-events-none">
                PRO
              </div>

              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#FFB800]">
                    <Tag size={11} />
                    <span>Cena gwarantowana do matury</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-display font-black text-[#FFB800] tracking-tight">
                      {promoConfig.discountedPriceMonthly.toFixed(2).replace('.', ',')} zł
                    </span>
                    <span className="text-xs font-semibold text-slate-400">/ miesiąc</span>
                    <span className="text-xs line-through text-slate-500 font-bold ml-1">
                      {promoConfig.originalPriceMonthly.toFixed(2).replace('.', ',')} zł
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end">
                  <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
                    -{promoConfig.discountPercent}% TANIEJ
                  </span>
                </div>
              </div>
            </div>

            {/* 3 KOLOROWE KARTY KORZYŚCI */}
            <div className="space-y-2 mb-4 text-left">
              {/* KORZYŚĆ 1: Serca */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-rose-500/30 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-400">
                  <Heart size={16} className="fill-rose-500/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white leading-tight">Nielimitowane serca</div>
                  <div className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">Rozwiązuj zadania bez wymuszonych przerw i bez stresu</div>
                </div>
              </div>

              {/* KORZYŚĆ 2: AI Tutor */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400">
                  <Brain size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white leading-tight">Inteligentny AI Tutor CKE</div>
                  <div className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">Krok po kroku wyjaśnia błędy i ocenia dowody maturalne</div>
                </div>
              </div>

              {/* KORZYŚĆ 3: Predyktor Matury */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                  <Target size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white leading-tight">Pełny Predyktor Wyniku CKE</div>
                  <div className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">Dokładna prognoza % i diagnoza brakujących punktów</div>
                </div>
              </div>
            </div>
          </div>

          {/* PRZYCISKI AKCJI */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleClaim}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#FFB800] via-[#FFA000] to-[#FF8C00] hover:brightness-105 text-[#070A0F] font-display font-black text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_0_#B37F00] active:translate-y-1 active:shadow-none min-h-[48px]"
            >
              <span>Zablokuj rabat -50% (14,50 zł/mc)</span>
              <ArrowRight size={16} strokeWidth={3} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-1.5 text-center text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Zaloguj się, jeśli masz już konto
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default GuestPromoModal;
