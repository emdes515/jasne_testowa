import { useState } from 'react';
import { UserState } from '../types';
import { User, Flame, Coins, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { triggerHaptic } from '../utils';

export interface HeaderProps {
  state: UserState;
  onProfileClick?: () => void;
  onLogoClick?: () => void;
  currentTab?: string;
}

export function Header({ state, onProfileClick, onLogoClick }: HeaderProps) {
  const [showXpTooltip, setShowXpTooltip] = useState(false);
  const currentXpInLevel = state.xp % 1000;
  const xpPercent = Math.min(100, Math.max(0, (currentXpInLevel / 1000) * 100));

  const toggleXpTooltip = () => {
    triggerHaptic('light');
    setShowXpTooltip(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-2xl border-b border-white/10 px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between relative shadow-lg select-none">
      {/* LEWA STRONA: Klikalny Brand & Logo JASNE. (przenosi do Dashboardu) */}
      <button 
        id="header-brand-logo"
        onClick={() => {
          triggerHaptic('medium');
          if (onLogoClick) onLogoClick();
        }}
        className="flex items-center gap-2.5 group cursor-pointer select-none active:scale-95 transition-all text-left py-1 px-1.5 -ml-1 rounded-xl hover:bg-white/[0.04]"
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
          <span className="text-lg sm:text-xl font-black tracking-wider text-white group-hover:text-[#FFB800] transition-colors leading-none">
            JASNE<span className="text-[#FFB800]">.</span>
          </span>
          <span className="hidden sm:inline-block text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
            Matura 2025
          </span>
        </div>
      </button>

      {/* PRAWA STRONA: Skarbiec i Profil gracza */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
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

        {/* Wskaźnik 3: Profil & Poziom Gracza */}
        <button 
          id="header-profile-button"
          onClick={() => {
            triggerHaptic('light');
            if (onProfileClick) onProfileClick();
          }}
          onMouseEnter={() => setShowXpTooltip(true)}
          onMouseLeave={() => setShowXpTooltip(false)}
          className="flex items-center gap-2 pl-1 pr-2 sm:pr-2.5 py-1 rounded-full bg-[#101726] hover:bg-[#141C2D] border border-white/10 hover:border-[#FFB800]/40 transition-all duration-150 active:scale-95 cursor-pointer group shadow-sm"
          title="Twój profil i postęp XP"
        >
          {/* Avatar z subtelnym bursztynowym obwodem */}
          <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[#FFB800] to-[#D97706] p-[1.5px] shadow-[0_0_10px_rgba(255,184,0,0.35)] shrink-0">
            <div className="w-full h-full bg-[#0E1420] rounded-full flex items-center justify-center">
              <User size={13} className="text-[#FFB800]" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-[11px] sm:text-xs text-white leading-tight group-hover:text-[#FFB800] transition-colors">
              LVL {state.level}
            </span>
            <span className="text-[9px] font-bold text-slate-400 leading-tight">
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
              className="absolute top-[58px] right-3 sm:right-6 z-50 bg-[#101726] border border-[#FFB800]/30 p-3.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.15)] w-64"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#FFB800] flex items-center gap-1">
                  <Sparkles size={12} /> Postęp Poziomu {state.level}
                </span>
                <button 
                  onClick={() => setShowXpTooltip(false)}
                  className="text-[#8B8D98] hover:text-white p-0.5 rounded-md"
                >
                  <X size={13} />
                </button>
              </div>
              <div className="flex items-baseline justify-between text-xs mb-1.5">
                <span className="text-white font-black">{currentXpInLevel} / 1000 XP</span>
                <span className="text-[#8B8D98] text-[10px]">{Math.round(xpPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#0B0E14] rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-[#D97706] to-[#FFB800] rounded-full shadow-[0_0_8px_#FFB800]" 
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-[#9CA3AF] leading-snug">
                Brakuje jeszcze <strong className="text-white">{1000 - currentXpInLevel} XP</strong> do Poziomu {state.level + 1}.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
