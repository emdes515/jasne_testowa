import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  HeartCrack, 
  Zap, 
  Coins, 
  Clock, 
  ArrowRight, 
  X, 
  Users,
  ShieldAlert
} from 'lucide-react';
import { triggerHaptic } from '../utils';
import { formatRegenTimer, HEARTS_REFILL_COIN_COST } from '../lib/heartsManager';

interface OutOfHeartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefillWithCoins: () => void;
  onOpenParentSponsor: () => void;
  onOpenProPopup: () => void;
  coins: number;
  initialTimeToNextRegenMs?: number;
}

export const OutOfHeartsModal: React.FC<OutOfHeartsModalProps> = ({
  isOpen,
  onClose,
  onRefillWithCoins,
  onOpenParentSponsor,
  onOpenProPopup,
  coins,
  initialTimeToNextRegenMs = 30 * 60 * 1000
}) => {
  const [timeLeftMs, setTimeLeftMs] = useState(initialTimeToNextRegenMs);

  useEffect(() => {
    setTimeLeftMs(initialTimeToNextRegenMs);
  }, [initialTimeToNextRegenMs, isOpen]);

  // Licznik regeneracji na żywo co sekundę
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeftMs(prev => Math.max(0, prev - 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const canAffordCoins = coins >= HEARTS_REFILL_COIN_COST;

  return (
    <AnimatePresence>
      <div 
        id="out-of-hearts-backdrop"
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-sm bg-[#0B0F19] border border-white/10 rounded-[32px] p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col items-center text-center overflow-hidden"
        >
          {/* Ambient Lighting Background */}
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-rose-500/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer border border-white/5"
            aria-label="Zamknij"
          >
            <X size={16} />
          </button>

          {/* 1. Pięć Pojemników Serc (5 Heart Containers Showcase) */}
          <div className="w-full mt-2 mb-4">
            <div className="w-full py-4 px-3 bg-slate-900/70 border border-white/5 rounded-2xl flex flex-col items-center gap-2.5 shadow-inner">
              <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                {[0, 1, 2, 3, 4].map((idx) => {
                  const isLastLost = idx === 4;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border transition-all ${
                        isLastLost
                          ? 'bg-rose-950/30 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                          : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      {isLastLost ? (
                        <HeartCrack className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400 animate-pulse drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                      ) : (
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 fill-slate-800/40 stroke-[1.5]" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
                <ShieldAlert size={13} className="text-rose-400 shrink-0" />
                <span>0 / 5 serc aktywnych</span>
              </div>
            </div>
          </div>

          {/* 2. Typografia i Komunikat */}
          <h2 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-tight">
            Skończyły Ci się serca!
          </h2>
          <p className="text-xs text-slate-300/90 leading-relaxed mt-1.5 max-w-xs mx-auto">
            Błędy to naturalna część nauki matury. Odczekaj na regenerację lub kontynuuj bez ograniczeń.
          </p>

          {/* 3. Karta Odliczania Regeneracji (Live Regen Timer) */}
          <div className="w-full bg-[#101626]/90 border border-white/10 rounded-2xl p-3 my-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Clock size={16} className="text-amber-400 shrink-0" />
              <span className="font-medium">Kolejne serce za:</span>
            </div>
            <span className="font-mono font-bold text-sm text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/25 tracking-wider shadow-[0_0_12px_rgba(245,158,11,0.15)]">
              {formatRegenTimer(timeLeftMs)}
            </span>
          </div>

          {/* 4. Stos Przycisków Akcji (Conversion Stack) */}
          <div className="w-full space-y-2.5">
            {/* Opcja 1: POPROŚ RODZICA (Główna konwersja) */}
            <button
              id="out-of-hearts-parent-sponsor-btn"
              onClick={() => {
                triggerHaptic('medium');
                onOpenParentSponsor();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF8800] via-[#FFB800] to-[#FFD54F] hover:brightness-105 active:scale-[0.98] text-amber-950 font-black text-sm transition-all shadow-[0_0_25px_rgba(255,184,0,0.35)] cursor-pointer flex flex-col items-center justify-center gap-0.5 group border-t border-white/40"
            >
              <div className="flex items-center gap-2">
                <Users size={17} className="fill-amber-950 text-amber-950" />
                <span>Poproś rodzica o PRO (BLIK)</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
              </div>
              <span className="text-[10px] font-semibold text-slate-900/80 tracking-normal">
                Szybki przelew bez karty • Nielimitowane serca
              </span>
            </button>

            {/* Opcja 2: UZUPEŁNIJ ZA MONETY */}
            <button
              id="out-of-hearts-refill-coins-btn"
              disabled={!canAffordCoins}
              onClick={() => {
                triggerHaptic('medium');
                onRefillWithCoins();
              }}
              className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between transition-all border ${
                canAffordCoins
                  ? 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-white active:scale-[0.98] cursor-pointer shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500 cursor-not-allowed opacity-75'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart size={16} className={canAffordCoins ? "text-rose-500 fill-rose-500" : "text-slate-500"} />
                <span>Uzupełnij do 5 serc</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono font-bold">
                <Coins size={14} className={canAffordCoins ? "text-amber-400" : "text-slate-500"} />
                <span className={canAffordCoins ? "text-amber-300" : "text-slate-500"}>
                  {HEARTS_REFILL_COIN_COST}
                </span>
              </div>
            </button>

            {!canAffordCoins && (
              <p className="text-[11px] text-slate-500 text-center">
                Masz {coins} monet (brakuje {HEARTS_REFILL_COIN_COST - coins} do natychmiastowego napełnienia).
              </p>
            )}

            {/* Opcja 3: PRO DLA CIEBIE */}
            <button
              onClick={() => {
                triggerHaptic('light');
                onOpenProPopup();
              }}
              className="w-full py-2 text-xs text-[#FFB800] hover:text-amber-300 font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap size={14} />
              <span>Odblokuj nielimitowane serca w PRO</span>
            </button>

            {/* Opcja 4: Wyjdź / poczekaj */}
            <button
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
              className="w-full py-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Wróć do menu głównego
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
