import { useState } from 'react';
import { UserState, SubjectKey, SubjectId } from '../types';
import { User, Flame, Coins, Zap, X, Heart, Clock, Users, Sun, Moon, LayoutGrid, BookOpen, Edit3, Calculator, Terminal, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerHaptic } from '../utils';
import { getSyncedHearts, refillHeartsWithCoins, HEARTS_REFILL_COIN_COST } from '../lib/heartsManager';
import { formatPromoSeconds } from '../services/promotionService';
import { useTheme } from '../services/themeManager';
import { JasneLogo } from './ui/JasneLogo';

export interface HeaderProps {
  state: UserState;
  onProfileClick?: () => void;
  onLogoClick?: () => void;
  currentTab?: string;
  selectedSubjectKey?: SubjectKey;
  onSelectSubject?: (key: SubjectKey) => void;
  currentSubject?: SubjectId;
  onSelectSubjectId?: (subjectId: SubjectId) => void;
  onOpenLobby?: () => void;
  onOpenFormulas?: () => void;
  onOpenDictionary?: () => void;
  onOpenScratchpad?: () => void;
  onOpenParentSponsor?: () => void;
  onOpenProPopup?: () => void;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  isGuest?: boolean;
  onLoginClick?: () => void;
  guestPromoSecondsLeft?: number;
  onOpenGuestPromo?: () => void;
  onOpenDevHub?: () => void;
  onOpenBlikModal?: () => void;
}

export function Header({ 
  state, 
  onProfileClick, 
  onLogoClick, 
  currentTab,
  selectedSubjectKey,
  onSelectSubject,
  currentSubject,
  onSelectSubjectId,
  onOpenLobby,
  onOpenFormulas,
  onOpenDictionary,
  onOpenScratchpad,
  onOpenParentSponsor,
  onOpenProPopup,
  onUpdateUserState,
  isGuest,
  onLoginClick,
  guestPromoSecondsLeft,
  onOpenGuestPromo,
  onOpenDevHub,
  onOpenBlikModal
}: HeaderProps) {
  const [showXpTooltip, setShowXpTooltip] = useState(false);
  const [showHeartsPopup, setShowHeartsPopup] = useState(false);
  const [isMobileSubjectSheetOpen, setIsMobileSubjectSheetOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const currentXpInLevel = state.xp % 1000;
  const xpPercent = Math.min(100, Math.max(0, (currentXpInLevel / 1000) * 100));

  const isMathActive = currentSubject === 'matematyka' || selectedSubjectKey === 'math' || (!currentSubject && !selectedSubjectKey);
  const isPolActive = currentSubject === 'polski' || selectedSubjectKey === 'pol';
  const isEngActive = currentSubject === 'angielski' || selectedSubjectKey === 'eng';

  const activeSubjectInfo = isEngActive
    ? { key: 'eng' as SubjectKey, id: 'angielski' as SubjectId, label: 'Język Angielski', shortLabel: 'Angielski', examTag: 'Formuła 2023 • Poziom Podstawowy', accentColor: '#38BDF8' }
    : isPolActive
      ? { key: 'pol' as SubjectKey, id: 'polski' as SubjectId, label: 'Język Polski', shortLabel: 'Polski', examTag: 'Formuła 2023 • Epoki & Lektury', accentColor: '#F43F5E' }
      : { key: 'math' as SubjectKey, id: 'matematyka' as SubjectId, label: 'Matematyka', shortLabel: 'Matematyka', examTag: 'Formuła 2023 • 15 Działów CKE', accentColor: '#FFB800' };

  const handleSelectMobileSubject = (key: SubjectKey, id: SubjectId) => {
    triggerHaptic('medium');
    onSelectSubject?.(key);
    onSelectSubjectId?.(id);
    setIsMobileSubjectSheetOpen(false);
  };

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
        className="lg:hidden flex items-center gap-1 sm:gap-2 group cursor-pointer select-none active:scale-95 transition-all text-left py-1 px-1 -ml-1 rounded-xl hover:bg-white/[0.04] shrink-0"
        title="Przejdź do pulpitu głównego JASNE."
        aria-label="Pulpit główny JASNE."
      >
        <JasneLogo variant="icon" size={24} glow={true} className="group-hover:scale-105 transition-transform duration-200 shrink-0" />
        <div className="flex flex-col text-left min-w-0">
          <span className="text-xs sm:text-base font-black tracking-wider text-text-primary group-hover:text-primary transition-colors leading-none">
            JASNE<span className="text-primary">.</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-bold text-text-muted tracking-wider uppercase mt-0.5">
            Matura staje się prosta
          </span>
        </div>
      </button>

      {/* CENTRUM: Selektor przedmiotu + Przycisk Lobby */}
      <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 shrink">
        {/* MOBILNY KOMPAKTOWY PRZEŁĄCZNIK PRZEDMIOTU (< 640px) */}
        <div className="sm:hidden relative shrink-0">
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              setIsMobileSubjectSheetOpen(true);
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-surface-card border border-primary/40 text-text-primary text-xs font-bold transition-all active:scale-95 shadow-xs shrink-0"
          >
            {isMathActive ? (
              <span className="w-[18px] h-[13px] rounded-[3px] bg-[#070A0F] border border-[#FFB800] text-[#FFB800] inline-flex items-center justify-center shrink-0 select-none shadow-xs">
                <svg className="w-3.5 h-2.5 text-[#FFB800]" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 11.5l3 4 4.5-12.5h12.5" />
                  <text x="14" y="14.5" fill="currentColor" stroke="none" fontSize="8.5" fontWeight="bold" fontFamily="serif" fontStyle="italic">x</text>
                </svg>
              </span>
            ) : isPolActive ? (
              <span
                className="w-[18px] h-[13px] inline-flex items-center justify-center shrink-0 select-none text-[12px] font-bold leading-none italic text-[#FFB800]"
                style={{
                  fontFamily: "'Alex Brush', 'Playfair Display', 'Brush Script MT', 'Apple Chancery', 'Segoe Script', cursive, serif",
                }}
              >
                P
              </span>
            ) : (
              <span className="w-[18px] h-[13px] rounded-[3px] bg-[#070A0F] border border-[#FFB800] inline-flex items-center justify-center shrink-0 select-none shadow-xs overflow-hidden">
                <svg className="w-full h-full block" viewBox="0 0 18 13" fill="none" aria-hidden="true">
                  <path d="M0 0L18 13M18 0L0 13" stroke="#FFB800" strokeWidth="3" strokeOpacity="0.4" />
                  <path d="M0 0L18 13M18 0L0 13" stroke="#FFB800" strokeWidth="1.2" />
                  <path d="M9 0V13M0 6.5H18" stroke="#070A0F" strokeWidth="4.6" />
                  <path d="M9 0V13M0 6.5H18" stroke="#FFB800" strokeWidth="3.6" strokeOpacity="0.4" />
                  <path d="M9 0V13M0 6.5H18" stroke="#FFB800" strokeWidth="1.8" />
                </svg>
              </span>
            )}
            <span className="text-amber-200 font-extrabold text-[11px] truncate max-w-[70px] xs:max-w-[95px]">{activeSubjectInfo.shortLabel}</span>
            <ChevronDown size={11} className="text-text-muted shrink-0" />
          </button>
        </div>

        {/* DESKTOP PEŁNY PRZEŁĄCZNIK PRZEDMIOTÓW (>= 640px) */}
        <div className="hidden sm:flex relative items-center bg-surface-card border border-surface-border rounded-full p-0.5 shadow-inner">
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onSelectSubject?.('math');
              onSelectSubjectId?.('matematyka');
            }}
            className={`relative z-10 flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-colors duration-200 cursor-pointer ${
              (currentSubject === 'matematyka' || selectedSubjectKey === 'math' || (!currentSubject && !selectedSubjectKey))
                ? 'text-amber-200 font-extrabold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {(currentSubject === 'matematyka' || selectedSubjectKey === 'math' || (!currentSubject && !selectedSubjectKey)) && (
              <motion.div
                layoutId="activeHeaderSubjectIndicator"
                className="absolute inset-0 rounded-full bg-amber-500/20 border border-amber-500/40 shadow-[0_0_12px_rgba(255,184,0,0.25)] pointer-events-none"
                transition={{ type: 'spring', stiffness: 440, damping: 30 }}
              />
            )}
            <span className="relative z-10 w-[18px] h-[13px] rounded-[3px] bg-[#070A0F] border border-[#FFB800] text-[#FFB800] inline-flex items-center justify-center shrink-0 select-none shadow-xs">
              <svg className="w-3.5 h-2.5 text-[#FFB800]" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 11.5l3 4 4.5-12.5h12.5" />
                <text x="14" y="14.5" fill="currentColor" stroke="none" fontSize="8.5" fontWeight="bold" fontFamily="serif" fontStyle="italic">x</text>
              </svg>
            </span>
            <span className="relative z-10 hidden sm:inline">Matematyka</span>
            <span className="relative z-10 hidden xs:inline sm:hidden">Mat</span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onSelectSubject?.('pol');
              onSelectSubjectId?.('polski');
            }}
            className={`relative z-10 flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-colors duration-200 cursor-pointer ${
              (currentSubject === 'polski' || selectedSubjectKey === 'pol')
                ? 'text-amber-200 font-extrabold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {(currentSubject === 'polski' || selectedSubjectKey === 'pol') && (
              <motion.div
                layoutId="activeHeaderSubjectIndicator"
                className="absolute inset-0 rounded-full bg-amber-500/20 border border-amber-500/40 shadow-[0_0_12px_rgba(255,184,0,0.25)] pointer-events-none"
                transition={{ type: 'spring', stiffness: 440, damping: 30 }}
              />
            )}
            <span
              className="relative z-10 w-[18px] h-[13px] inline-flex items-center justify-center shrink-0 select-none text-[12px] font-bold leading-none italic text-[#FFB800]"
              style={{
                fontFamily: "'Alex Brush', 'Playfair Display', 'Brush Script MT', 'Apple Chancery', 'Segoe Script', cursive, serif",
              }}
            >
              P
            </span>
            <span className="relative z-10 hidden sm:inline">Polski</span>
            <span className="relative z-10 hidden xs:inline sm:hidden">Pol</span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onSelectSubject?.('eng');
              onSelectSubjectId?.('angielski');
            }}
            className={`relative z-10 flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-colors duration-200 cursor-pointer ${
              (currentSubject === 'angielski' || selectedSubjectKey === 'eng')
                ? 'text-amber-200 font-extrabold'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {(currentSubject === 'angielski' || selectedSubjectKey === 'eng') && (
              <motion.div
                layoutId="activeHeaderSubjectIndicator"
                className="absolute inset-0 rounded-full bg-amber-500/20 border border-amber-500/40 shadow-[0_0_12px_rgba(255,184,0,0.25)] pointer-events-none"
                transition={{ type: 'spring', stiffness: 440, damping: 30 }}
              />
            )}
            <span className="relative z-10 w-[18px] h-[13px] rounded-[3px] bg-[#070A0F] border border-[#FFB800] inline-flex items-center justify-center shrink-0 select-none shadow-xs overflow-hidden">
              <svg className="w-full h-full block" viewBox="0 0 18 13" fill="none" aria-hidden="true">
                {/* Przekątne - podkład krzyża św. Andrzeja */}
                <path d="M0 0L18 13M18 0L0 13" stroke="#FFB800" strokeWidth="3" strokeOpacity="0.4" />
                {/* Przekątne - linie krzyża św. Patryka */}
                <path d="M0 0L18 13M18 0L0 13" stroke="#FFB800" strokeWidth="1.2" />
                {/* Ciemna szczelina oddzielająca przekątne od krzyża głównego */}
                <path d="M9 0V13M0 6.5H18" stroke="#070A0F" strokeWidth="4.6" />
                {/* Obwódka krzyża św. Jerzego */}
                <path d="M9 0V13M0 6.5H18" stroke="#FFB800" strokeWidth="3.6" strokeOpacity="0.4" />
                {/* Główny krzyż św. Jerzego */}
                <path d="M9 0V13M0 6.5H18" stroke="#FFB800" strokeWidth="1.8" />
              </svg>
            </span>
            <span className="relative z-10 hidden sm:inline">Angielski</span>
            <span className="relative z-10 hidden xs:inline sm:hidden">Ang</span>
          </button>
        </div>

        {/* Przycisk Lobby */}
        {onOpenLobby && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              onOpenLobby();
            }}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 text-text-secondary hover:text-primary text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95"
            title="Lobby wyboru przedmiotów"
          >
            <LayoutGrid size={13} className="text-primary" />
            <span className="hidden sm:inline">Lobby</span>
          </button>
        )}

        {/* Tablice Wzorów CKE - TYLKO DLA MATEMATYKI */}
        {(currentSubject === 'matematyka' || selectedSubjectKey === 'math' || (!currentSubject && !selectedSubjectKey)) && onOpenFormulas && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onOpenFormulas();
            }}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 text-text-secondary hover:text-primary text-[11px] font-bold transition-all cursor-pointer"
            title="Tablice Wzorów CKE (Matematyka)"
          >
            <BookOpen size={13} className="text-primary" />
            <span>Wzory</span>
          </button>
        )}

        {/* Słownik Maturalny CKE - TYLKO DLA ANGIELSKIEGO */}
        {(currentSubject === 'angielski' || selectedSubjectKey === 'eng') && onOpenDictionary && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onOpenDictionary();
            }}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 text-text-secondary hover:text-primary text-[11px] font-bold transition-all cursor-pointer"
            title="Oficjalny Słownik Maturalny CKE (Język Angielski)"
          >
            <BookOpen size={13} className="text-primary" />
            <span>Słownik</span>
          </button>
        )}

        {/* Brudnopis */}
        {onOpenScratchpad && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              onOpenScratchpad();
            }}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 text-text-secondary hover:text-primary text-[11px] font-bold transition-all cursor-pointer"
            title="Otwórz brudnopis"
          >
            <Edit3 size={13} className="text-primary" />
            <span>Brudnopis</span>
          </button>
        )}
      </div>

      {/* Spacer na desktopie */}
      <div className="hidden lg:block w-4" />

      {/* PRAWA STRONA: Skarbiec i Profil gracza */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* MOBILNA ZINTEGROWANA PIGUŁKA GAMIFIKACJI (< 640px) */}
        <div className="sm:hidden flex items-center bg-surface-card border border-white/10 rounded-full px-1.5 py-0.5 shadow-sm text-xs font-mono font-bold shrink-0">
          {/* Serca */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              setShowHeartsPopup(prev => !prev);
            }}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-rose-400 active:scale-95 transition"
            title={`Serca: ${heartsData.hearts}/${heartsData.maxHearts}`}
          >
            <Heart size={12} className={heartsData.hearts > 0 ? "text-rose-500 fill-rose-500" : "text-rose-500"} />
            <span className="text-[11px] leading-none font-black">{heartsData.isPro ? '∞' : heartsData.hearts}</span>
          </button>

          <span className="text-white/15 text-[10px] select-none">•</span>

          {/* Streak */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              if (onProfileClick) onProfileClick();
            }}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[#F97316] active:scale-95 transition"
            title={`Passa: ${state.streakDays || 0} dni`}
          >
            <Flame size={12} className="text-[#F97316] fill-[#F97316]" />
            <span className="text-[11px] leading-none font-black">{state.streakDays || 0}</span>
          </button>

          <span className="text-white/15 text-[10px] select-none">•</span>

          {/* Monety */}
          <button
            type="button"
            onClick={() => {
              if (onOpenBlikModal) {
                triggerHaptic('light');
                onOpenBlikModal();
              }
            }}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-primary active:scale-95 transition"
            title={`Monety: ${state.coins}`}
          >
            <Coins size={12} className="text-primary" />
            <span className="text-[11px] leading-none font-black">{state.coins}</span>
          </button>
        </div>

        {/* Wskaźnik Serc (Desktop >= 640px) */}
        <div className="relative hidden sm:block">
          <button 
            id="header-hearts-button"
            onClick={() => {
              triggerHaptic('light');
              setShowHeartsPopup(prev => !prev);
            }}
            className={`hidden sm:flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-2.5 min-h-[44px] min-w-[44px] rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-sm border ${
              heartsData.isPro
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : heartsData.hearts <= 1
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
            title={heartsData.isPro ? 'Pakiet PRO: Nielimitowane serca' : `Serca: ${heartsData.hearts}/${heartsData.maxHearts}`}
          >
            <Heart size={14} className={heartsData.hearts > 0 ? "text-rose-500 fill-rose-500" : "text-rose-500"} />
            <span className="font-display font-black text-xs leading-none tabular-nums font-mono">
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

        {/* Wskaźnik 1: Płomień Passy (Desktop >= 640px) */}
        <button 
          onClick={() => {
            triggerHaptic('light');
            if (onProfileClick) onProfileClick();
          }}
          className="hidden sm:flex items-center justify-center gap-1 sm:gap-1.5 bg-[#F97316]/10 hover:bg-[#F97316]/20 border border-[#F97316]/30 px-2.5 sm:px-2.5 min-h-[44px] min-w-[44px] rounded-full transition-all duration-150 active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(249,115,22,0.12)]"
          title={`Aktualna seria: ${state.streakDays || 0} dni z rzędu`}
        >
          <Flame size={14} className="text-[#F97316] fill-[#F97316] animate-pulse" />
          <span className="font-display font-black text-[#F97316] text-xs leading-none tabular-nums font-mono">
            {state.streakDays || 0}
          </span>
        </button>

        {/* Wskaźnik 2: Główne Monety (Desktop >= 640px) */}
        <button 
          type="button"
          onClick={() => {
            if (onOpenBlikModal) {
              triggerHaptic('light');
              onOpenBlikModal();
            }
          }}
          className="hidden sm:flex items-center justify-center gap-1 sm:gap-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 px-2.5 sm:px-2.5 min-h-[44px] rounded-full shadow-[0_0_12px_rgba(255,184,0,0.12)] cursor-pointer transition active:scale-95"
          title={`Monety: ${state.coins} • Kliknij, aby doładować`}
        >
          <Coins size={13} className="text-primary" />
          <span className="font-display font-black text-primary text-xs leading-none tabular-nums font-mono">
            {state.coins.toLocaleString('pl-PL')}
          </span>
        </button>

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

        {/* Przełącznik Motywu (Szybki 1-tap na desktopie, na mobile w profilu) */}
        <button 
          id="header-theme-toggle"
          type="button"
          onClick={() => {
            triggerHaptic('light');
            toggleTheme();
          }}
          className="hidden sm:flex min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 text-text-muted hover:text-primary transition-all duration-150 active:scale-90 cursor-pointer shadow-sm items-center justify-center shrink-0"
          title={resolvedTheme === 'dark' ? 'Przełącz na motyw jasny (Solar Luminary)' : 'Przełącz na motyw ciemny (Nocturne Luminary)'}
          aria-label={resolvedTheme === 'dark' ? 'Przełącz na motyw jasny' : 'Przełącz na motyw ciemny'}
        >
          {resolvedTheme === 'dark' ? (
            <Sun size={15} className="text-amber-400 hover:rotate-45 transition-transform duration-200" />
          ) : (
            <Moon size={15} className="text-amber-600 hover:-rotate-12 transition-transform duration-200" />
          )}
        </button>

        {/* Wskaźnik 3: Profil & Poziom Gracza */}
        <button 
          id="header-profile-button"
          onClick={() => {
            triggerHaptic('light');
            if (onProfileClick) onProfileClick();
          }}
          onMouseEnter={() => setShowXpTooltip(true)}
          onMouseLeave={() => setShowXpTooltip(false)}
          className="flex items-center gap-1.5 sm:gap-2 p-0.5 sm:p-1 sm:pl-1 sm:pr-2.5 rounded-full bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-primary/40 transition-all duration-150 active:scale-95 cursor-pointer group shadow-sm shrink-0"
          title="Twój profil i postęp XP"
        >
          {/* Avatar z subtelnym bursztynowym obwodem */}
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#FFB800] to-[#D97706] p-[1.5px] shadow-[0_0_10px_rgba(255,184,0,0.35)] shrink-0">
            <div className="w-full h-full bg-surface-card rounded-full flex items-center justify-center">
              <User size={12} className="text-primary sm:w-[13px] sm:h-[13px]" />
            </div>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-display font-black text-[11px] sm:text-xs text-text-primary leading-tight group-hover:text-primary transition-colors tabular-nums font-mono">
              LVL {state.level}
            </span>
            <span className="text-[10px] font-bold text-text-muted leading-tight tabular-nums font-mono">
              {currentXpInLevel} XP
            </span>
          </div>
        </button>

        {/* Przycisk Panelu Deweloperskiego (DEV) */}
        {onOpenDevHub && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              onOpenDevHub();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 text-[10px] sm:text-xs font-black shadow-[0_0_12px_rgba(16,185,129,0.25)] transition-all cursor-pointer active:scale-95 shrink-0"
            title="Panel Deweloperski (Pełny Dostęp do Wszystkich Zasobów)"
            aria-label="Panel Deweloperski"
          >
            <Terminal size={11} className="text-emerald-400 animate-pulse sm:w-[13px] sm:h-[13px]" />
            <span className="font-mono tracking-wider font-black">DEV</span>
          </button>
        )}
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

      {/* Mobilny BottomSheet wyboru przedmiotu */}
      <AnimatePresence>
        {isMobileSubjectSheetOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:hidden">
            {/* Tło przyciemnione */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileSubjectSheetOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            {/* Arkusz wysuwany z dołu */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
              className="relative z-10 w-full bg-[#0E1522] border-t border-white/10 rounded-t-3xl p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl space-y-3.5"
            >
              {/* Uchwyt do przeciągania */}
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto -mt-1 mb-1" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-white">Wybierz Przedmiot Maturalny</h3>
                  <p className="text-[11px] text-text-muted">Formuła 2023 • Poziom Podstawowy CKE</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileSubjectSheetOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 text-text-muted hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Lista przedmiotów */}
              <div className="space-y-2 pt-1">
                {/* 1. Matematyka */}
                <button
                  type="button"
                  onClick={() => handleSelectMobileSubject('math', 'matematyka')}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isMathActive
                      ? 'bg-amber-500/15 border-amber-500/50 shadow-[0_0_15px_rgba(255,184,0,0.15)]'
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#070A0F] border border-[#FFB800] text-[#FFB800] inline-flex items-center justify-center shrink-0 shadow-xs">
                      <svg className="w-4 h-3.5 text-[#FFB800]" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 11.5l3 4 4.5-12.5h12.5" />
                        <text x="14" y="14.5" fill="currentColor" stroke="none" fontSize="8.5" fontWeight="bold" fontFamily="serif" fontStyle="italic">x</text>
                      </svg>
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-white">Matematyka</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">180 min</span>
                      </div>
                      <span className="text-[11px] text-text-muted">15 działów • 75 lekcji • 1500 zadań</span>
                    </div>
                  </div>
                  {isMathActive && (
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>

                {/* 2. Język Polski */}
                <button
                  type="button"
                  onClick={() => handleSelectMobileSubject('pol', 'polski')}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isPolActive
                      ? 'bg-rose-500/15 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-xl bg-[#070A0F] border border-rose-500 inline-flex items-center justify-center shrink-0 text-base font-bold italic text-rose-400 shadow-xs"
                      style={{
                        fontFamily: "'Alex Brush', 'Playfair Display', 'Brush Script MT', 'Apple Chancery', 'Segoe Script', cursive, serif",
                      }}
                    >
                      P
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-white">Język Polski</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">240 min</span>
                      </div>
                      <span className="text-[11px] text-text-muted">Epoki literackie • Lektury obowiązkowe • Matura ustna</span>
                    </div>
                  </div>
                  {isPolActive && (
                    <div className="w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-300">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>

                {/* 3. Język Angielski */}
                <button
                  type="button"
                  onClick={() => handleSelectMobileSubject('eng', 'angielski')}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isEngActive
                      ? 'bg-sky-500/15 border-sky-500/50 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#070A0F] border border-[#FFB800] inline-flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                      <svg className="w-5 h-3.5 block" viewBox="0 0 18 13" fill="none" aria-hidden="true">
                        <path d="M0 0L18 13M18 0L0 13" stroke="#FFB800" strokeWidth="3" strokeOpacity="0.4" />
                        <path d="M0 0L18 13M18 0L0 13" stroke="#FFB800" strokeWidth="1.2" />
                        <path d="M9 0V13M0 6.5H18" stroke="#070A0F" strokeWidth="4.6" />
                        <path d="M9 0V13M0 6.5H18" stroke="#FFB800" strokeWidth="3.6" strokeOpacity="0.4" />
                        <path d="M9 0V13M0 6.5H18" stroke="#FFB800" strokeWidth="1.8" />
                      </svg>
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-white">Język Angielski</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">120 min</span>
                      </div>
                      <span className="text-[11px] text-text-muted">Gramatyka CKE • Środki językowe • Słownictwo</span>
                    </div>
                  </div>
                  {isEngActive && (
                    <div className="w-5 h-5 rounded-full bg-sky-500/20 border border-sky-500/50 flex items-center justify-center text-sky-300">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
