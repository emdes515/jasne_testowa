import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coins, Check, Zap, ArrowRight, ShieldCheck, Loader2, Flame } from 'lucide-react';
import { BLIK_COIN_PACKS } from '../data/achievements';
import { BlikCoinPack } from '../types';
import { triggerHaptic, playSuccessSound } from '../utils';
import confetti from 'canvas-confetti';

interface BlikCoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyCoins: (pack: BlikCoinPack) => Promise<boolean> | boolean;
  userCoins?: number;
}

export const BlikCoinModal: React.FC<BlikCoinModalProps> = ({
  isOpen,
  onClose,
  onBuyCoins,
  userCoins = 0
}) => {
  const [selectedPack, setSelectedPack] = useState<BlikCoinPack>(BLIK_COIN_PACKS[1] || BLIK_COIN_PACKS[0]);
  const [blikCode, setBlikCode] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPack = (pack: BlikCoinPack) => {
    triggerHaptic('light');
    setSelectedPack(pack);
    setErrorMsg(null);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (blikCode.replace(/\s+/g, '').length !== 6) {
      triggerHaptic('warning');
      setErrorMsg('Wprowadź poprawny 6-cyfrowy kod BLIK');
      return;
    }

    triggerHaptic('medium');
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // Symulacja autoryzacji bankowej w BFF
      await new Promise(resolve => setTimeout(resolve, 1400));
      const ok = await onBuyCoins(selectedPack);
      
      if (ok) {
        setIsSuccess(true);
        triggerHaptic('success');
        playSuccessSound();
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#FFB800', '#F59E0B', '#10B981', '#FCD34D']
        });
        setTimeout(() => {
          setIsSuccess(false);
          setBlikCode('');
          onClose();
        }, 1800);
      } else {
        triggerHaptic('error');
        setErrorMsg('Transakcja odrzucona przez bank. Spróbuj ponownie.');
      }
    } catch (err) {
      triggerHaptic('error');
      setErrorMsg('Wystąpił błąd połączenia z bramką płatności.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <div 
        id="blik-coin-modal-backdrop"
        className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl select-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-[#0B0F19] border border-white/10 rounded-[32px] p-6 shadow-2xl flex flex-col overflow-hidden text-white"
        >
          {/* Ambient Lighting */}
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-amber-500/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-yellow-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer border border-white/5"
            aria-label="Zamknij"
          >
            <X size={16} />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Coins size={22} />
            </div>
            <div>
              <h2 className="font-display font-black text-lg text-white leading-tight flex items-center gap-2">
                Doładuj Monety Kampusu
              </h2>
              <p className="text-xs text-slate-400">
                Obecny stan: <span className="font-mono font-bold text-amber-300">{userCoins} monet</span>
              </p>
            </div>
          </div>

          {/* Success Screen */}
          {isSuccess ? (
            <div className="py-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <Check size={32} strokeWidth={3} />
              </div>
              <h3 className="font-display font-black text-xl text-white mb-1">
                +{selectedPack.coins} Monet dodane!
              </h3>
              <p className="text-xs text-emerald-400 font-medium">
                Płatność BLIK zrealizowana pomyślnie.
              </p>
            </div>
          ) : (
            <>
              {/* Wybór Pakietów BLIK */}
              <div className="flex flex-col gap-2.5 mb-5">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 px-0.5">
                  Wybierz pakiet monet:
                </span>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {BLIK_COIN_PACKS.map((pack) => {
                    const isSelected = selectedPack.id === pack.id;
                    return (
                      <div
                        key={pack.id}
                        onClick={() => handleSelectPack(pack)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between relative overflow-hidden ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400/60 shadow-md shadow-amber-500/10'
                            : 'bg-white/[0.03] border-white/5 hover:border-white/15'
                        }`}
                      >
                        {pack.popular && (
                          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-yellow-500 text-slate-950 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
                            <Flame size={9} className="fill-slate-950" /> Najpopularniejszy
                          </div>
                        )}

                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-white/5 text-amber-400'
                          }`}>
                            <Coins size={18} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-extrabold text-sm text-white">
                                {pack.name}
                              </span>
                              <span className="text-xs font-mono font-bold text-amber-300">
                                {pack.coins} monet
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400">
                              {pack.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-display font-black text-base text-white">
                            {pack.pricePln} zł
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Formularz Kodu BLIK */}
              <form onSubmit={handlePay} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="blik-code-input" className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 flex items-center justify-between px-0.5">
                    <span>Podaj 6-cyfrowy kod BLIK</span>
                    <span className="text-[10px] text-amber-400 font-bold">Natychmiastowo</span>
                  </label>
                  <input
                    id="blik-code-input"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    disabled={isProcessing}
                    value={blikCode}
                    onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="123 456"
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl px-4 py-3 text-center font-mono font-black text-xl text-amber-300 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 tracking-[0.25em]"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400 font-medium text-center">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isProcessing || blikCode.length !== 6}
                  className={`w-full py-3.5 rounded-xl font-display font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    blikCode.length === 6 && !isProcessing
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 active:scale-[0.98] shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Autoryzacja BLIK...</span>
                    </>
                  ) : (
                    <>
                      <span>Zapłać {selectedPack.pricePln} zł i odbierz {selectedPack.coins} monet</span>
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1 mt-1">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>Szybki przelew BLIK bez karty • Natychmiastowe zasilenie konta</span>
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
