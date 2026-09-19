import React from 'react';
import { LayoutDashboard, GraduationCap, Swords, FileText, User, Trophy, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { TabState, UserState } from '../types';
import { triggerHaptic } from '../utils';

interface NavigationProps {
  currentTab: TabState;
  setTab: (tab: TabState) => void;
  userState?: UserState;
  onProfileClick?: () => void;
}

export function Navigation({ currentTab, setTab, userState, onProfileClick }: NavigationProps) {
  const handleTabChange = (tab: TabState) => {
    if (tab !== currentTab) {
      triggerHaptic('light');
      setTab(tab);
    }
  };

  const navItems = [
    { id: 'dashboard' as TabState, label: 'Dashboard', sublabel: 'Główny panel', icon: LayoutDashboard },
    { id: 'nauka' as TabState, label: 'Nauka', sublabel: 'Mapa Wiedzy', icon: GraduationCap },
    { id: 'simulator' as TabState, label: 'Matura', sublabel: 'Symulator arkusza', icon: FileText },
    { id: 'arena' as TabState, label: 'Arena', sublabel: 'Wkrótce: Live 1v1', icon: Swords },
    { id: 'profile' as TabState, label: 'Profil', sublabel: 'Skarbiec & Odznaki', icon: User },
  ];

  const currentLevel = userState?.level || 1;
  const currentXp = userState?.xp || 0;
  const xpInLevel = currentXp % 1000;
  const xpPct = Math.min(100, Math.round((xpInLevel / 1000) * 100));

  return (
    <>
      {/* =========================================================================
          1. MOBILE: Pływający dolny dock (<768px)
          Wysoki kontrast, zaokrąglone rogi, bezpieczne strefy iOS
         ========================================================================= */}
      <nav 
        aria-label="Główna nawigacja mobilna"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none flex justify-center pb-[max(14px,env(safe-area-inset-bottom))] px-3"
      >
        <div className="pointer-events-auto flex items-center justify-between gap-1 bg-surface-bg/95 backdrop-blur-[24px] border border-surface-border p-1.5 rounded-[26px] shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.08)] w-full max-w-sm">
          {navItems.filter(item => item.id !== 'profile').map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isArena = item.id === 'arena';
            return (
              <motion.button 
                key={item.id}
                id={`mobile-nav-${item.id}`}
                whileTap={{ scale: 0.93 }}
                onClick={() => handleTabChange(item.id)}
                className={`relative flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl transition-colors duration-200 select-none ${
                  isActive 
                    ? 'flex-1' 
                    : 'text-text-muted hover:text-text-primary px-3'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileNavActivePill"
                    className={`absolute inset-0 rounded-2xl shadow-[0_0_20px_rgba(255,184,0,0.35)] ${
                      isArena ? 'bg-emerald-400' : 'bg-[#FFB800]'
                    }`}
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <div className={`relative z-10 transition-transform duration-200 ${isActive ? 'scale-105' : ''}`}>
                  <Icon size={20} className={isActive ? 'text-[#080B11] stroke-[2.5]' : ''} />
                  {isArena && !isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse" />
                  )}
                </div>
                {isActive && (
                  <span className="relative z-10 text-[11px] font-black tracking-wide whitespace-nowrap text-[#080B11]">
                    {item.label}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* =========================================================================
          2. TABLET: Wąski Navigation Rail (768px do 1023px)
          Pionowy pasek boczny z ikonami i podpisami
         ========================================================================= */}
      <aside 
        aria-label="Pasek nawigacyjny tabletu"
        className="hidden md:flex lg:hidden flex-col items-center justify-between w-20 shrink-0 h-screen sticky top-0 bg-surface-bg border-r border-surface-border py-5 z-40 select-none pointer-events-auto"
      >
        {/* Logo Mark */}
        <div className="flex flex-col items-center gap-1">
          <img src="/logo.png" alt="JASNE." className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,184,0,0.4)]" />
        </div>

        {/* Rail Items */}
        <div className="flex flex-col items-center gap-3 w-full px-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isArena = item.id === 'arena';
            return (
              <motion.button
                key={item.id}
                id={`rail-nav-${item.id}`}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  if (item.id === 'profile' && onProfileClick) {
                    onProfileClick();
                  } else {
                    handleTabChange(item.id);
                  }
                }}
                className={`w-full py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-200 group relative ${
                  isActive
                    ? isArena
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-[0_0_16px_rgba(16,185,129,0.2)]'
                      : 'bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/40 shadow-[0_0_16px_rgba(255,184,0,0.15)]'
                    : 'text-[#8B8D98] hover:text-white hover:bg-white/5'
                }`}
                title={item.label}
              >
                <div className="relative">
                  <Icon size={20} className={isActive ? (isArena ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'text-[#FFB800] drop-shadow-[0_0_8px_rgba(255,184,0,0.6)]') : 'group-hover:scale-110 transition-transform'} />
                  {isArena && !isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981] animate-pulse" />
                  )}
                </div>
                <span className="text-[10px] font-bold tracking-tight text-center leading-none truncate max-w-full">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom Profile Thumbnail */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={onProfileClick}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFB800]/30 to-[#D97706]/30 border border-[#FFB800]/40 p-0.5 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          title="Twój profil"
        >
          <div className="w-full h-full bg-surface-card rounded-full flex items-center justify-center text-primary">
            <User size={18} />
          </div>
        </motion.button>
      </aside>

      {/* =========================================================================
          3. DESKTOP: Pełny stały pasek boczny (Sidebar, 1024px+)
          Szerokość ok. 270px (w-[270px]), Logo + Formuła 2025, zakłada z podpisami, miniatura profilu
         ========================================================================= */}
      <aside 
        aria-label="Pasek boczny aplikacji"
        className="hidden lg:flex flex-col justify-between w-[270px] shrink-0 h-screen sticky top-0 bg-surface-bg border-r border-surface-border p-5 z-40 select-none shadow-2xl pointer-events-auto"
      >
        <div className="flex flex-col gap-7">
          {/* Oficjalna Identyfikacja JASNE. */}
          <div className="flex items-center gap-3 px-1">
            <img src="/logo.png" alt="JASNE." className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,184,0,0.4)]" />
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-text-primary leading-none">
                JASNE<span className="text-primary">.</span>
              </span>
              <span className="text-[9px] font-bold text-text-muted tracking-wider uppercase mt-1">
                Matura staje się prosta
              </span>
            </div>
          </div>

          {/* Lista zakładek */}
          <nav className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase text-text-muted tracking-widest px-3 mb-1">
              Główna Nawigacja
            </span>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const isArena = item.id === 'arena';
              return (
                <button
                  key={item.id}
                  id={`desktop-sidebar-${item.id}`}
                  onClick={() => {
                    if (item.id === 'profile' && onProfileClick) {
                      onProfileClick();
                    } else {
                      handleTabChange(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 text-left group cursor-pointer ${
                    isActive
                      ? isArena
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.12)]'
                        : 'bg-primary/10 border border-primary/30 text-primary font-bold shadow-[0_0_15px_rgba(255,184,0,0.12)]'
                      : 'border border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-card/60 font-medium'
                  }`}
                >
                  <Icon 
                    size={18} 
                    className={`shrink-0 transition-colors ${
                      isActive 
                        ? isArena ? 'text-emerald-400' : 'text-primary' 
                        : 'text-text-muted group-hover:text-text-primary'
                    }`} 
                  />
                  <span className="text-sm tracking-tight truncate flex-1 font-display">
                    {item.label}
                  </span>
                  {isArena && (
                    <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                      Wkrótce
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Wskaźnik Postępu Poziomu w Sidebarze */}
        <div 
          onClick={onProfileClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onProfileClick?.(); }}
          className="bg-surface-card hover:bg-surface-elevated border border-surface-border hover:border-primary/30 rounded-2xl p-3.5 flex flex-col gap-2 transition-all duration-200 cursor-pointer group shadow-sm"
          title="Kliknij, aby otworzyć profil i osiągnięcia"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary font-display font-black text-xs">
                {currentLevel}
              </div>
              <span className="font-display font-bold text-text-primary text-xs group-hover:text-primary transition-colors">
                Poziom {currentLevel}
              </span>
            </div>
            <span className="text-[10px] font-bold text-text-muted tabular-nums font-mono">
              {xpInLevel} / 1000 XP
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-bg rounded-full overflow-hidden border border-surface-border">
            <div 
              className="h-full bg-gradient-to-r from-[#D97706] to-[#FFB800] rounded-full transition-all duration-500"
              style={{ width: `${xpPct}%` }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
