import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  MessageCircle,
  Coins,
  KeyRound,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { triggerHaptic } from '../utils';

interface ParentSponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Aktywacja kodem jednorazowym (atomowy zapis w Firestore). */
  onActivatePro: (code: string) => Promise<{ ok: boolean; error?: string }>;
  studentName?: string;
}

export const ParentSponsorModal: React.FC<ParentSponsorModalProps> = ({
  isOpen,
  onClose,
  onActivatePro,
  studentName = 'Twój maturzysta'
}) => {
  const [copied, setCopied] = useState(false);
  const [customName, setCustomName] = useState(studentName === 'Twój maturzysta' || studentName === 'Uczeń' ? '' : studentName);
  const [activationCode, setActivationCode] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [activationError, setActivationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const displayName = customName.trim() || 'Twoje dziecko';
  const sponsorUrl = 'https://jasne.edu.pl/sponsor/matura-pro';
  
  const sponsorMessage = `Cześć! Uczę się do egzaminu maturalnego w aplikacji JASNE. (https://jasne.edu.pl).

Żebym mógł uczyć się bez limitów (nielimitowane serca, sprawdzanie zadań otwartych przez AI egzaminatora wg oficjalnego klucza CKE), potrzebuję pełnego konta PRO.

Czy moglibyście mi kupić dostęp? To jednorazowy wydatek 39 zł przez bezpieczny i szybki BLIK:
👉 ${sponsorUrl}

Dzięki wielkie za pomoc w zdaniu matury! ❤️
— ${displayName}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sponsorMessage);
      setCopied(true);
      triggerHaptic('success');
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleWhatsApp = () => {
    triggerHaptic('medium');
    const url = `https://wa.me/?text=${encodeURIComponent(sponsorMessage)}`;
    window.open(url, '_blank');
  };

  const handleSms = () => {
    triggerHaptic('medium');
    const url = `sms:?body=${encodeURIComponent(sponsorMessage)}`;
    window.location.href = url;
  };

  const handleActivateWithCode = async () => {
    if (isActivating) return;
    triggerHaptic('medium');
    setIsActivating(true);
    setActivationError(null);
    try {
      const result = await onActivatePro(activationCode);
      if (result?.ok) {
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFB800', '#10B981', '#F59E0B', '#3B82F6']
          });
        } catch (e) {}
        triggerHaptic('success');
        setActivationCode('');
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
      <div 
        id="parent-sponsor-backdrop"
        className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-lg bg-[#0B0F17] border border-white/10 rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col my-auto"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#FFB800]/15 blur-3xl rounded-full pointer-events-none -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none translate-y-1/2" />

          {/* Modal Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between bg-[#111724]/80 relative z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-[1px] shadow-lg shadow-amber-500/20 shrink-0">
                <div className="w-full h-full bg-[#0B0F17] rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    Poproś rodzica o PRO
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    Szybki BLIK
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  94% rodziców z chęcią funduje przygotowanie do matury
                </p>
              </div>
            </div>

            <button
              id="parent-sponsor-close-button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer shrink-0"
              aria-label="Zamknij"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[72vh] custom-scrollbar relative z-10">
            {/* Value Proposition Pills */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#111726]/90 border border-white/5 rounded-2xl p-2.5 sm:p-3 flex flex-col items-center">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400 mb-1" />
                <span className="text-[11px] font-bold text-white">Nielimitowane serca</span>
                <span className="text-[9px] text-slate-400">Zero przerw w nauce</span>
              </div>
              <div className="bg-[#111726]/90 border border-white/5 rounded-2xl p-2.5 sm:p-3 flex flex-col items-center">
                <Sparkles className="w-5 h-5 text-[#FFB800] mb-1" />
                <span className="text-[11px] font-bold text-white">AI Egzaminator CKE</span>
                <span className="text-[9px] text-slate-400">Ocena tablicy i dowodów</span>
              </div>
              <div className="bg-[#111726]/90 border border-white/5 rounded-2xl p-2.5 sm:p-3 flex flex-col items-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="text-[11px] font-bold text-white">Tylko 39 zł BLIK</span>
                <span className="text-[9px] text-slate-400">Bez abonamentu</span>
              </div>
            </div>

            {/* Student Name Input */}
            <div className="bg-[#111726]/60 border border-white/5 rounded-2xl p-3 sm:p-3.5 space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Twoje imię (do podpisu w wiadomości):
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="np. Mateusz, Julia..."
                className="w-full bg-[#080C14] border border-white/10 focus:border-[#FFB800]/60 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition"
              />
            </div>

            {/* Message Preview Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Gotowa wiadomość do wysłania:
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs font-semibold text-[#FFB800] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Skopiowano!' : 'Kopiuj treść'}</span>
                </button>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#080C14] border border-white/10 text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap select-all">
                {sponsorMessage}
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle size={17} />
                <span>Wyślij WhatsApp</span>
              </button>

              <button
                onClick={handleSms}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-400 font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
              >
                <Smartphone size={17} />
                <span>Wyślij SMS</span>
              </button>
            </div>

            {/* Direct Copy Button */}
            <button
              onClick={handleCopy}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                copied 
                  ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Wiadomość skopiowana do schowka!' : 'Skopiuj treść do schowka'}</span>
            </button>
          </div>

          {/* Modal Footer: aktywacja kodem po opłaceniu BLIK-iem */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#111724]/90 flex flex-col gap-3 shrink-0">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span>Płatność BLIK realizuje rodzic. Kod aktywacyjny przychodzi w potwierdzeniu zakupu.</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="parent-activation-code"
                type="text"
                value={activationCode}
                onChange={(e) => {
                  setActivationCode(e.target.value.toUpperCase());
                  setActivationError(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void handleActivateWithCode();
                }}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="JASNE-XXXX-XXXX"
                className="flex-1 bg-[#080C14] border border-white/10 focus:border-[#FFB800]/60 rounded-xl px-3.5 py-2.5 text-center text-sm font-black tracking-[0.12em] text-white placeholder:text-slate-600 outline-none transition"
              />
              <button
                id="activate-pro-with-code-button"
                onClick={() => void handleActivateWithCode()}
                disabled={isActivating || activationCode.trim().length < 6}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                {isActivating ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Weryfikuję…</span>
                  </>
                ) : (
                  <>
                    <KeyRound size={14} />
                    <span>Aktywuj PRO</span>
                  </>
                )}
              </button>
            </div>

            {activationError && (
              <p className="text-[11px] font-semibold text-rose-300 leading-relaxed">{activationError}</p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
