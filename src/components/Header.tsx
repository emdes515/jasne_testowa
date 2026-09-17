import { useState } from 'react';
import { UserState, SubjectKey } from '../types';
import { User, Flame, Coins, Zap, X, Heart, Clock, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerHaptic } from '../utils';
import { getSyncedHearts, refillHeartsWithCoins, HEARTS_REFILL_COIN_COST } from '../lib/heartsManager';
import { formatPromoSeconds } from '../services/promotionService';

export interface HeaderProps {
  state: UserState;
  onProfileClick?: () => void;
  onLogoClick?: () => void;
  currentTab?: string;
  selectedSubjectKey?: SubjectKey;
  onSelectSubject?: (key: SubjectKey) => void;
  onOpenParentSponsor?: () => void;
  onOpenProPopup?: () => void;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  isGuest?: boolean;
  onLoginClick?: () => void;
  guestPromoSecondsLeft?: number;
  onOpenGuestPromo?: () => void;
}

export function Header({ 
  state, 
  onProfileClick, 
  onLogoClick, 
  currentTab,
  selectedSubjectKey,
  onSelectSubject,
  onOpenParentSponsor,
  onOpenProPopup,
  onUpdateUserState,
  isGuest,
  onLoginClick,
  guestPromoSecondsLeft,
  onOpenGuestPromo
}: HeaderProps) {
  const [showXpTooltip, setShowXpTooltip] = useState(false);
  const [showHeartsPopup, setShowHeartsPopup] = useState(false);
  const currentXpInLevel = state.xp % 1000;
  const xpPercent = Math.min(100, Math.max(0, (currentXpInLevel / 1000) * 100));

  const heartsData = getSyncedHearts(state);

  const toggleXpTooltip = () => {
    triggerHaptic('light');
    setShowXpTooltip(prev => !prev);
  };

  const handleRefillCoins = () => {
    triggerHaptic('success');
    if (!onUpdateUserState) return;
    const result = refillHeartsWithCoins(state);
    if (result.success) {
      onUpdateUserState(() => result.updatedState);
      setShowHeartsPopup(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-bg/90 backdrop-blur-2xl border-b border-surface-border px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between relative shadow-lg select-none">
      {/* LEWA STRONA: Klikalny Brand & Logo JASNE. (widoczny tylko na mobile/tablecie, na PC ukryty bo jest w stałym sidebarze) */}
      <button 
        id="header-brand-logo"
        onClick={() => {
          triggerHaptic('medium');
          if (onLogoClick) onLogoClick();
        }}
        className="lg:hidden flex items-center gap-2 group cursor-pointer select-none active:scale-95 transition-all text-left py-1 px-1 -ml-1 rounded-xl hover:bg-white/[0.04] shrink-0"
        title="Przejdź do pulpitu głównego JASNE."
        aria-label="Pulpit główny JASNE."
      >
        <div className="relative flex items-center justify-center shrink-0">
          <img 
            src="/logo.png" 
            alt="JASNE." 
            className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,184,0,0.5)] group-hover:scale-105 transition-transform duration-200" 
          />
          <div className="absolute inset-0 bg-[#FFB800]/20 blur-md rounded-full -z-10 group-hover:bg-[#FFB800]/35 transition-colors" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-black tracking-wider text-white group-hover:text-[#FFB800] transition-colors leading-none">
            JASNE<span className="text-[#FFB800]">.</span>
          </span>
          <span className="hidden sm:inline-block text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
            Matura staje się prosta
          </span>
        </div>
      </button>

      {/* Indykator aktywnego przedmiotu */}
      {selectedSubjectKey && (
        <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide border shadow-sm ${
          selectedSubjectKey === 'pol'
            ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
        }`}>
          <span className={`w-2 h-2 rounded-full ${selectedSubjectKey === 'pol' ? 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(255,184,0,0.6)]'} animate-pulse`} />
          <span>{selectedSubjectKey === 'pol' ? 'Język Polski CKE' : 'Matematyka CKE'}</span>
        </div>
      )}

      {/* Spacer na desktopie */}
      <div className="hidden lg:block w-4" />

      {/* PRAWA STRONA: Skarbiec i Profil gracza */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Wskaźnik Serc (Hearts Engine) */}
        <div className="relative">
          <button 
            id="header-hearts-button"
            onClick={() => {
              triggerHaptic('light');
              setShowHeartsPopup(prev => !prev);
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-sm border ${
              heartsData.isPro
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : heartsData.hearts <= 1
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
            title={heartsData.isPro ? 'Pakiet PRO: Nielimitowane serca' : `Serca: ${heartsData.hearts}/${heartsData.maxHearts}`}
          >
            <Heart size={14} className={heartsData.hearts > 0 ? "text-rose-500 fill-rose-500" : "text-rose-500"} />
            <span className="font-display font-black text-xs leading-none">
              {heartsData.isPro ? '∞' : heartsData.hearts}
            </span>
          </button>

          {/* Hearts Popover */}
          <AnimatePresence>
            {showHeartsPopup && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowHeartsPopup(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 z-50 w-72 bg-surface-elevated border border-surface-border rounded-2xl p-4 shadow-2xl text-left"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-surface-border">
                    <div className="flex items-center gap-1.5">
                      <Heart size={16} className="text-rose-500 fill-rose-500" />
                      <span className="font-bold text-sm text-text-primary">Serca (Życia)</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-rose-400">
                      {heartsData.isPro ? 'Nielimitowane' : `${heartsData.hearts} / ${heartsData.maxHearts}`}
                    </span>
                  </div>

                  {/* Serca ikony */}
                  <div className="flex items-center justify-center gap-2 py-3">
                    {Array.from({ length: heartsData.maxHearts }).map((_, idx) => {
                      const hasHeart = idx < heartsData.hearts || heartsData.isPro;
                      return (
                        <Heart 
                          key={idx} 
                          size={22} 
                          className={hasHeart ? "text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "text-slate-700"} 
                        />
                      );
                    })}
                  </div>

                  {/* Status regeneracji */}
                  {!heartsData.isPro && heartsData.hearts < heartsData.maxHearts && (
                    <div className="bg-surface-card border border-surface-border rounded-xl p-2.5 mb-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <Clock size={13} className="text-primary" />
                        <span>Kolejne serce za:</span>
                      </div>
                      <span className="font-mono font-bold text-primary">{heartsData.formattedTime}</span>
                    </div>
                  )}

                  {heartsData.isPro && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 mb-3 text-center">
                      <span className="text-xs font-bold text-amber-300">
                        Pakiet PRO aktywny – brak limitu serc
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    {/* Odnów za monety */}
                    {!heartsData.isPro && heartsData.hearts < heartsData.maxHearts && (
                      <button
                        onClick={handleRefillCoins}
                        disabled={state.coins < HEARTS_REFILL_COIN_COST}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                          state.coins >= HEARTS_REFILL_COIN_COST
                            ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 cursor-pointer'
                            : 'bg-white/5 border border-white/5 text-slate-500 cursor-not-allowed opacity-75'
                        }`}
                      >
                        <span>Uzupełnij do pełna</span>
                        <span className="flex items-center gap-1 font-mono text-amber-300">
                          <Coins size={12} /> {HEARTS_REFILL_COIN_COST}
                        </span>
                      </button>
                    )}

                    {/* Poproś rodzica o PRO */}
                    {!heartsData.isPro && onOpenParentSponsor && (
                      <button
                        onClick={() => {
                          setShowHeartsPopup(false);
                          onOpenParentSponsor();
                        }}
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-[#FF8800] to-[#FFB800] hover:brightness-110 text-slate-950 flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/20"
                      >
                        <Users size={14} className="fill-slate-950" />
                        <span>Poproś rodzica o PRO (BLIK)</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Wskaźnik 1: Płomień Passy */}
        <button 
          onClick={() => {
            triggerHaptic('light');
            if (onProfileClick) onProfileClick();
          }}
          className="flex items-center gap-1 sm:gap-1.5 bg-[#F97316]/10 hover:bg-[#F97316]/20 border border-[#F97316]/30 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(249,115,22,0.12)]"
          title={`Aktualna seria: ${state.streakDays || 0} dni z rzędu`}
        >
          <Flame size={14} className="text-[#F97316] fill-[#F97316] animate-pulse" />
          <span className="font-display font-black text-[#F97316] text-xs leading-none">
            {state.streakDays || 0}
          </span>
        </button>

        {/* Wskaźnik 2: Główne Monety */}
        <div 
          className="flex items-center gap-1 sm:gap-1.5 bg-[#FFB800]/10 border border-[#FFB800]/30 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full shadow-[0_0_12px_rgba(255,184,0,0.12)]"
          title={`Monety: ${state.coins}`}
        >
          <Coins size={13} className="text-[#FFB800]" />
          <span className="font-display font-black text-amber-200 text-xs leading-none">
            {state.coins.toLocaleString('pl-PL')}
          </span>
        </div>

        {/* Wskaźnik Gościa (widoczny tylko na desktopie, gdy jest dużo miejsca) */}
        {isGuest && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              onLoginClick?.();
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
            title="Kliknij, aby się zalogować i zapisać postępy w chmurze"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
            <span>Konto Gościa • Zaloguj się</span>
          </button>
        )}

        {/* Wskaźnik 3: Profil & Poziom Gracza */}
        <button 
          id="header-profile-button"
          onClick={() => {
            triggerHaptic('light');
            if (onProfileClick) onProfileClick();
          }}
          onMouseEnter={() => setShowXpTooltip(true)}
          onMouseLeave={() => setShowXpTooltip(false)}
          className="flex items-center gap-2 pl-1 pr-2 sm:pr-2.5 py-1 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 transition-all duration-150 active:scale-95 cursor-pointer group shadow-sm"
          title="Twój profil i postęp XP"
        >
          {/* Avatar z subtelnym bursztynowym obwodem */}
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[#FFB800] to-[#D97706] p-[1.5px] shadow-[0_0_10px_rgba(255,184,0,0.35)] shrink-0">
            <div className="w-full h-full bg-surface-card rounded-full flex items-center justify-center">
              <User size={13} className="text-primary" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-[11px] sm:text-xs text-text-primary leading-tight group-hover:text-primary transition-colors">
              LVL {state.level}
            </span>
            <span className="text-[9px] font-bold text-text-muted leading-tight">
              {currentXpInLevel} XP
            </span>
          </div>
        </button>
      </div>

      {/* Dyskretny, ambientowy pasek postępu XP wbudowany w dolną krawędź nagłówka */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.05] overflow-hidden cursor-pointer"
        onClick={toggleXpTooltip}
        title={`Postęp poziomu: ${currentXpInLevel}/1000 XP (${Math.round(xpPercent)}%)`}
      >
        <div 
          className="h-full bg-gradient-to-r from-[#D97706] to-[#FFB800] transition-all duration-700 shadow-[0_0_8px_rgba(255,184,0,0.7)]"
          style={{ width: `${xpPercent}%` }}
        />
      </div>

      {/* Floating Tooltip dla dokładnych wartości XP */}
      <AnimatePresence>
        {showXpTooltip && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setShowXpTooltip(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-[58px] right-3 sm:right-6 z-50 bg-surface-elevated border border-primary/30 p-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.15)] w-64"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-primary flex items-center gap-1">
                  <Zap size={12} /> Postęp Poziomu {state.level}
                </span>
                <button 
                  onClick={() => setShowXpTooltip(false)}
                  className="text-text-muted hover:text-text-primary p-0.5 rounded-md"
                >
                  <X size={13} />
                </button>
              </div>
              <div className="flex items-baseline justify-between text-xs mb-1.5">
                <span className="text-text-primary font-black">{currentXpInLevel} / 1000 XP</span>
                <span className="text-text-muted text-[10px]">{Math.round(xpPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-bg rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-[#D97706] to-[#FFB800] rounded-full shadow-[0_0_8px_#FFB800]" 
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-text-secondary leading-snug">
                Brakuje jeszcze <strong className="text-text-primary">{1000 - currentXpInLevel} XP</strong> do Poziomu {state.level + 1}.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
