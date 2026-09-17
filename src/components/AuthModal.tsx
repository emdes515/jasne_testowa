import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { LoadingSpinner } from './Loading';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithPopup 
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { triggerHaptic } from '../utils';
import { migrateGuestProgressToUser } from '../lib/guestMigration';
import { PromotionConfig, claimPromotionForUser } from '../services/promotionService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  promoContext?: {
    promoConfig: PromotionConfig;
    timeLeftFormatted?: string;
  };
}

export function AuthModal({ isOpen, onClose, onSuccess, promoContext }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (promoContext) {
      setMode('register');
    }
  }, [promoContext, isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setError('Wypełnij wszystkie wymagane pola.');
      return;
    }

    if (mode === 'register' && password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków.');
      return;
    }

    setLoading(true);
    triggerHaptic('medium');

    try {
      if (mode === 'login') {
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
        await migrateGuestProgressToUser(userCredential.user);
        if (promoContext) {
          await claimPromotionForUser(userCredential.user.uid, promoContext.promoConfig);
        }
        setSuccessMsg('Zalogowano pomyślnie!');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) {
          await updateProfile(userCredential.user, {
            displayName: name.trim()
          });
        }
        await migrateGuestProgressToUser(userCredential.user, {
          defaultDisplayName: name.trim()
        });
        if (promoContext) {
          await claimPromotionForUser(userCredential.user.uid, promoContext.promoConfig);
        }
        setSuccessMsg('Konto zostało utworzone! Rabat powitalny został przypisany.');
      }

      triggerHaptic('success');
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 500);
    } catch (err: any) {
      console.error('Auth error:', err);
      let message = 'Wystąpił błąd autoryzacji.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        message = 'Nieprawidłowy adres e-mail lub hasło.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'Konto z tym adresem e-mail już istnieje. Zaloguj się.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Podaj poprawny format adresu e-mail.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Hasło jest zbyt słabe (minimum 6 znaków).';
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
      triggerHaptic('warning');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    triggerHaptic('medium');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await migrateGuestProgressToUser(result.user);
        if (promoContext) {
          await claimPromotionForUser(result.user.uid, promoContext.promoConfig);
        }
      }
      setSuccessMsg('Zalogowano przez Google!');
      triggerHaptic('success');
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 500);
    } catch (err: any) {
      console.error('Google auth error:', err);
      if (
        err.code === 'auth/popup-closed-by-user' ||
        err.code === 'auth/cancelled-popup-request' ||
        err.code === 'auth/popup-blocked'
      ) {
        setError('Logowanie Google zostało przerwane lub zablokowane przez przeglądarkę. Możesz zalogować się adresem e-mail powyżej.');
      } else if (
        err.code === 'auth/unauthorized-domain' ||
        err.message?.includes('unauthorized-domain')
      ) {
        setError('Domena podglądu wymaga autoryzacji Google. Skorzystaj z logowania Email + Hasło powyżej.');
      } else {
        setError('Nie udało się zalogować przez Google. Użyj formularza e-mail.');
      }
      triggerHaptic('warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
      {/* Backdrop dismiss */}
      <div 
        onClick={onClose}
        className="fixed inset-0"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-md bg-surface-card border-t sm:border border-surface-border rounded-t-[32px] sm:rounded-3xl p-6 sm:p-7 shadow-2xl overflow-y-auto max-h-[92vh] z-10"
      >
        {/* Subtle Cyber Amber Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D97706] via-[#FFB800] to-[#F59E0B]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-primary p-2 rounded-xl hover:bg-white/5 transition-colors z-20 cursor-pointer"
          aria-label="Zamknij"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary mb-3 shadow-sm">
            <ShieldCheck size={24} />
          </div>
          <h2 className="font-display font-black text-xl text-text-primary">
            {mode === 'login' ? 'Witaj ponownie!' : 'Dołącz do Kampusu JASNE'}
          </h2>
          <p className="text-xs text-text-secondary mt-1 max-w-xs">
            {mode === 'login' 
              ? 'Zaloguj się, aby synchronizować serię dni, zadania i odznaki w chmurze.' 
              : 'Utwórz konto i zachowaj swoje osiągnięcia na każdym urządzeniu.'}
          </p>
        </div>

        {/* Promotional Context Banner */}
        {promoContext && (
          <div className="w-full mb-4 p-3 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-between text-left">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Zap size={15} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-primary uppercase tracking-wide truncate">
                  Rabat -{promoContext.promoConfig.discountPercent}% zarezerwowany
                </div>
                <div className="text-[11px] text-text-secondary truncate">
                  Zostanie przypisany do Twojego konta
                </div>
              </div>
            </div>
            {promoContext.timeLeftFormatted && (
              <span className="text-xs font-mono font-black text-primary px-2 py-0.5 rounded-md bg-surface-elevated border border-primary/30 shrink-0 ml-2">
                {promoContext.timeLeftFormatted}
              </span>
            )}
          </div>
        )}

        {/* Tabs: Logowanie / Rejestracja */}
        <div className="bg-surface-elevated p-1 rounded-xl flex items-center gap-1 mb-5 border border-surface-border">
          <button
            type="button"
            onClick={() => {
              resetForm();
              setMode('login');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'login'
                ? 'bg-primary text-[#070A0F] shadow-sm font-black'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <LogIn size={13} />
            <span>Logowanie</span>
          </button>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setMode('register');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'register'
                ? 'bg-primary text-[#070A0F] shadow-sm font-black'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <UserPlus size={13} />
            <span>Rejestracja</span>
          </button>
        </div>

        {/* Alert Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 mb-4 flex items-start gap-2.5 text-rose-300 text-xs leading-relaxed"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-4 flex items-center gap-2.5 text-emerald-300 text-xs font-bold"
            >
              <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5 text-left">
                Twoje Imię lub Pseudonim
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="np. Aleksander"
                  className="w-full bg-surface-elevated border border-surface-border focus:border-primary rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5 text-left">
              Adres E-mail
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj.email@gmail.com"
                className="w-full bg-surface-elevated border border-surface-border focus:border-primary rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-text-muted uppercase tracking-wider mb-1.5 text-left">
              Hasło {mode === 'register' && <span className="text-text-muted normal-case">(min. 6 znaków)</span>}
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-elevated border border-surface-border focus:border-primary rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-primary hover:bg-amber-400 disabled:opacity-60 text-[#070A0F] font-display font-black text-sm rounded-xl transition-all shadow-[0_3px_0_#B37F00] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size="sm" color="#070A0F" className="shrink-0" />
                <span>Przetwarzanie...</span>
              </div>
            ) : mode === 'login' ? (
              <>
                <LogIn size={15} />
                <span>Zaloguj się</span>
              </>
            ) : promoContext ? (
              <>
                <Zap size={15} />
                <span>Odbierz rabat -{promoContext.promoConfig.discountPercent}% i utwórz konto</span>
              </>
            ) : (
              <>
                <UserPlus size={15} />
                <span>Utwórz bezpłatne konto</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-[1px] bg-surface-border" />
          <span className="text-[10px] uppercase font-bold text-text-muted">lub</span>
          <div className="flex-1 h-[1px] bg-surface-border" />
        </div>

        {/* Google Sign-in Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 px-4 bg-surface-elevated hover:bg-surface-card-hover border border-surface-border text-text-primary font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] min-h-[42px]"
        >
          {loading ? (
            <div className="flex items-center gap-2 text-white/70">
              <LoadingSpinner size="sm" className="shrink-0" />
              <span>Łączenie z Google...</span>
            </div>
          ) : (
            <>
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Kontynuuj przez Google</span>
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
