import React from 'react';
import { LayoutDashboard, GraduationCap, Swords, FileText, User, Sparkles, Trophy, Flame } from 'lucide-react';
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

  // League calculation for mini profile
  const rating = userState?.arenaRating || 1000;
  let leagueName = 'Liga Brązowa';
  let leagueColor = 'text-amber-500';
  if (rating >= 1800) { leagueName = 'Diament'; leagueColor = 'text-sky-400'; }
  else if (rating >= 1500) { leagueName = 'Platyna'; leagueColor = 'text-teal-300'; }
  else if (rating >= 1300) { leagueName = 'Złoto'; leagueColor = 'text-yellow-400'; }
  else if (rating >= 1100) { leagueName = 'Srebro'; leagueColor = 'text-gray-300'; }

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
        <div className="pointer-events-auto flex items-center justify-between gap-1 bg-[#0B0E14]/95 backdrop-blur-[24px] border border-white/10 p-1.5 rounded-[26px] shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.08)] w-full max-w-sm">
          {navItems.filter(item => item.id !== 'profile').map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isArena = item.id === 'arena';
            return (
              <button 
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleTabChange(item.id)}
                className={`relative flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl transition-all duration-200 select-none ${
                  isActive 
                    ? isArena
                      ? 'bg-emerald-400 text-[#080B11] font-black shadow-[0_0_20px_rgba(16,185,129,0.4)] flex-1 active:scale-[0.96]'
                      : 'bg-[#FFB800] text-[#080B11] font-black shadow-[0_0_20px_rgba(255,184,0,0.4)] flex-1 active:scale-[0.96]' 
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/5 active:scale-[0.94] px-3'
                }`}
              >
                <div className={`relative transition-transform duration-200 ${isActive ? 'scale-105' : ''}`}>
                  <Icon size={20} className={isActive ? 'text-[#080B11] stroke-[2.5]' : ''} />
                  {isArena && !isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse" />
                  )}
                </div>
                {isActive && (
                  <span className="text-[11px] font-black tracking-wide whitespace-nowrap text-[#080B11] animate-in fade-in duration-200">
                    {item.label}
                  </span>
                )}
              </button>
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
        className="hidden md:flex lg:hidden flex-col items-center justify-between w-20 shrink-0 h-screen sticky top-0 bg-[#0B0E14] border-r border-white/5 py-5 z-40 select-none pointer-events-auto"
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
              <button
                key={item.id}
                id={`rail-nav-${item.id}`}
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
              </button>
            );
          })}
        </div>

        {/* Bottom Profile Thumbnail */}
        <button
          onClick={onProfileClick}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFB800]/30 to-[#D97706]/30 border border-[#FFB800]/40 p-0.5 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          title="Twój profil"
        >
          <div className="w-full h-full bg-[#141A23] rounded-full flex items-center justify-center text-[#FFB800]">
            <User size={18} />
          </div>
        </button>
      </aside>

      {/* =========================================================================
          3. DESKTOP: Pełny stały pasek boczny (Sidebar, 1024px+)
          Szerokość ok. 270px (w-[270px]), Logo + Formuła 2025, zakłada z podpisami, miniatura profilu
         ========================================================================= */}
      <aside 
        aria-label="Pasek boczny aplikacji"
        className="hidden lg:flex flex-col justify-between w-[270px] shrink-0 h-screen sticky top-0 bg-[#0B0E14] border-r border-white/10 p-5 z-40 select-none shadow-2xl pointer-events-auto"
      >
        <div className="flex flex-col gap-7">
          {/* Oficjalna Identyfikacja JASNE. */}
          <div className="flex items-center gap-3 px-1">
            <img src="/logo.png" alt="JASNE." className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,184,0,0.4)]" />
            <span className="text-2xl font-black tracking-wider text-white">
              JASNE<span className="text-[#FFB800]">.</span>
            </span>
          </div>

          {/* Lista zakładek */}
          <nav className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase text-[#6B7280] tracking-widest px-3 mb-1">
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
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-200 text-left group cursor-pointer ${
                    isActive
                      ? isArena
                        ? 'bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-transparent border border-emerald-500/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.18)] font-black'
                        : 'bg-gradient-to-r from-[#FFB800]/15 via-[#FFB800]/10 to-transparent border border-[#FFB800]/40 text-[#FFB800] shadow-[0_0_20px_rgba(255,184,0,0.12)] font-black'
                      : 'text-[#9CA3AF] hover:text-white hover:bg-white/5 border border-transparent font-medium'
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-all ${
                    isActive 
                      ? isArena
                        ? 'bg-emerald-400 text-black shadow-[0_0_12px_rgba(16,185,129,0.7)]'
                        : 'bg-[#FFB800] text-[#080B11] font-bold shadow-[0_0_12px_rgba(255,184,0,0.6)]' 
                      : 'bg-white/5 text-[#9CA3AF] group-hover:text-white group-hover:bg-white/10'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm leading-tight truncate">
                        {item.label}
                      </span>
                      {isArena && (
                        <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.2 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                          Wkrótce
                        </span>
                      )}
                    </div>
                    <span className={`text-[11px] font-normal truncate ${isActive ? (isArena ? 'text-emerald-400/80' : 'text-[#FFB800]/80') : 'text-[#6B7280]'}`}>
                      {item.sublabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Miniatura Profilu na samym dole */}
        <div 
          onClick={onProfileClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onProfileClick?.(); }}
          className="bg-[#141A23] hover:bg-[#18202C] border border-white/10 hover:border-[#FFB800]/40 rounded-2xl p-3.5 flex items-center gap-3 transition-all duration-200 cursor-pointer group shadow-lg"
          title="Kliknij, aby otworzyć profil i osiągnięcia"
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFB800] to-[#D97706] p-[2px] shadow-[0_0_12px_rgba(255,184,0,0.3)] group-hover:shadow-[0_0_16px_rgba(255,184,0,0.5)] transition-shadow">
              <div className="w-full h-full bg-[#0B0E14] rounded-full flex items-center justify-center">
                <User size={18} className="text-[#FFB800]" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#FFB800] text-[#080B11] text-[9px] font-black px-1.5 py-0.2 rounded-full border border-[#0B0E14] shadow-sm">
              L{currentLevel}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-white text-xs truncate group-hover:text-[#FFB800] transition-colors">
                Konto Ucznia
              </span>
              <span className={`text-[10px] font-bold ${leagueColor}`}>
                {leagueName}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#8B8D98] mt-0.5">
              <span>LVL {currentLevel}</span>
              <span>{xpPct}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#0B0E14] rounded-full overflow-hidden mt-1 border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#D97706] to-[#FFB800] rounded-full"
                style={{ width: `${xpPct}%` }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
