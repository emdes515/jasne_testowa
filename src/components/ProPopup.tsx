import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Crown, Heart, Users, ShieldCheck, KeyRound, Loader2 } from 'lucide-react';
import { triggerHaptic } from '../utils';

interface ProPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenParentSponsor?: () => void;
  /**
   * Aktywacja kodem jednorazowym. Weryfikacja odbywa się w Firestore
   * (atomowy batch: users/{uid} + system/proCodes/{kod}) — klient nie może
   * samodzielnie włączyć PRO.
   */
  onActivatePro?: (code: string) => Promise<{ ok: boolean; error?: string }>;
}

export function ProPopup({ isOpen, onClose, onOpenParentSponsor, onActivatePro }: ProPopupProps) {
  const [code, setCode] = useState('');
  const [showCodeField, setShowCodeField] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [activationError, setActivationError] = useState<string | null>(null);

  const handleActivate = async () => {
    if (!onActivatePro || isActivating) return;
    triggerHaptic('medium');
    setIsActivating(true);
    setActivationError(null);
    try {
      const result = await onActivatePro(code);
      if (result?.ok) {
        triggerHaptic('success');
        setCode('');
        setShowCodeField(false);
        onClose();
      } else {
        setActivationError(result?.error || 'Nie udało się aktywować PRO.');
      }
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm overflow-hidden rounded-[32px] p-[1px] bg-gradient-to-b from-amber-400/50 via-orange-500/20 to-[#13141A] shadow-2xl shadow-orange-500/20 my-auto"
          >
            <div className="bg-[#0B0E14] rounded-[31px] p-6 relative overflow-hidden h-full">
              {/* Background effects */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full" />
              <div className="absolute top-1/2 left-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full -translate-y-1/2" />
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col items-center text-center relative z-10 pt-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 p-[1px] mb-4 shadow-lg shadow-orange-500/20">
                  <div className="w-full h-full bg-[#0B0E14] rounded-2xl flex items-center justify-center">
                    <Crown size={32} className="text-amber-400" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-display font-black text-white mb-1.5">
                  Pakiet JASNE. PRO
                </h2>
                <p className="text-[#8B8D98] text-[13px] leading-relaxed mb-5">
                  Gwarancja zdanej matury bez limitów i bez stresu.
                </p>

                <div className="w-full space-y-2.5 mb-6 text-left">
                  {[
                    { title: 'Nielimitowane serca', desc: 'Ucz się bez przerw i bez kar za błędy', icon: Heart, color: 'text-rose-400' },
                    { title: 'AI Egzaminator Maturalny', desc: 'Nielimitowane sprawdzanie odręcznych dowodów CKE', icon: Sparkles, color: 'text-amber-400' },
                    { title: 'Wszystkie lekcje & arkusze', desc: 'Pełna baza zadań Nowej Formuły 2023/2025', icon: Check, color: 'text-emerald-400' },
                    { title: 'Kod aktywacyjny PRO', desc: 'Płatność jednorazowa, aktywacja na Twoim koncie', icon: ShieldCheck, color: 'text-blue-400' }
                  ].map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                      <div key={i} className="flex items-start gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-2.5">
                        <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon size={14} className={feat.color} />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-white">{feat.title}</div>
                          <div className="text-[11px] text-slate-400">{feat.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Primary Button: Poproś rodzica o PRO */}
                {onOpenParentSponsor && (
                  <button 
                    onClick={() => {
                      triggerHaptic('medium');
                      onClose();
                      onOpenParentSponsor();
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 hover:brightness-110 text-slate-950 font-black text-[14px] transition-all shadow-lg shadow-orange-500/25 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mb-2.5"
                  >
                    <Users size={17} className="fill-slate-950" />
                    <span>Poproś rodzica o PRO (BLIK)</span>
                  </button>
                )}

                {/* Kod aktywacyjny — jedyna droga do włączenia PRO */}
                {!showCodeField ? (
                  <button 
                    onClick={() => {
                      triggerHaptic('light');
                      setShowCodeField(true);
                      setActivationError(null);
                    }}
                    className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-3 rounded-xl text-[13px] transition-all border border-white/10 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <KeyRound size={15} className="text-amber-400" />
                    <span>Mam kod aktywacyjny PRO</span>
                  </button>
                ) : (
                  <div className="w-full">
                    <label htmlFor="pro-activation-code" className="block text-left text-[11px] font-bold text-[#8B8D98] mb-1.5">
                      Wpisz kod aktywacyjny z potwierdzenia zakupu
                    </label>
                    <input
                      id="pro-activation-code"
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setActivationError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') void handleActivate();
                      }}
                      autoComplete="off"
                      autoCapitalize="characters"
                      spellCheck={false}
                      inputMode="text"
                      placeholder="JASNE-XXXX-XXXX"
                      className="w-full rounded-xl bg-black/40 border border-white/10 focus:border-amber-400/60 focus:outline-none px-3.5 py-3 text-center text-[15px] font-black tracking-[0.12em] text-white placeholder:text-slate-600"
                    />
                    {activationError && (
                      <p className="mt-2 text-left text-[11px] font-semibold text-rose-300 leading-relaxed">
                        {activationError}
                      </p>
                    )}
                    <button
                      onClick={() => void handleActivate()}
                      disabled={isActivating || code.trim().length < 6}
                      className="mt-2.5 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-[13px] transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isActivating ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          <span>Weryfikuję kod…</span>
                        </>
                      ) : (
                        <>
                          <KeyRound size={15} />
                          <span>Aktywuj PRO</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                <button 
                  onClick={onClose}
                  className="mt-3 text-[#8B8D98] hover:text-white text-[12px] font-medium transition-colors cursor-pointer"
                >
                  Może później
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
