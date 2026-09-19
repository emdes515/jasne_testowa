import React, { useState, useEffect, useMemo } from 'react';
import { Flame, Clock, Trophy, Check, ArrowRight, Target, Swords, FileText, Zap, Coins, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserState } from '../types';
import { getMilestoneStreakDays, getTodayDateString, triggerHaptic, playSuccessSound, filterActualTaskIds } from '../utils';
import confetti from 'canvas-confetti';

interface GamificationSidebarProps {
  userState?: UserState;
  completedTasks?: string[];
  onNavigate?: (tab: string, subTab?: string) => void;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  saveUserData?: (state: UserState) => void;
}

export const GamificationSidebar: React.FC<GamificationSidebarProps> = ({
  userState,
  completedTasks = [],
  onNavigate,
  onUpdateUserState,
  saveUserData
}) => {
  const streakDays = userState?.streakDays || 0;
  const todayStr = getTodayDateString();
  const todayTasksCompleted = userState?.dailyTaskCounts?.[todayStr] || 0;
  const currentProgress = Math.min(5, todayTasksCompleted);

  // 7-day streak track
  const { days: streakMilestones, isCompletedToday, todayTargetDayNumber } = useMemo(() => {
    return getMilestoneStreakDays(
      streakDays,
      userState?.lastStreakDate,
      userState?.streakActiveDates
    );
  }, [streakDays, userState?.lastStreakDate, userState?.streakActiveDates]);

  // Live countdown to midnight reset
  const [secondsUntilReset, setSecondsUntilReset] = useState<string>('00:00:00');
  const [timeUntilResetShort, setTimeUntilResetShort] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diffMs = Math.max(0, midnight.getTime() - now.getTime());
      
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeUntilResetShort(`${hours}h ${mins.toString().padStart(2, '0')}m`);
      setSecondsUntilReset(
        `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Daily Mission Tiers
  const DAILY_TIERS = useMemo(() => [
    { id: 1, target: 1, title: 'Rozgrzewka', shortReward: '+10 Monet', coins: 10, xp: 0, icon: <Coins size={11} /> },
    { id: 2, target: 3, title: 'Trening Maturalny', shortReward: '+20 Monet +15 XP', coins: 20, xp: 15, icon: <Zap size={11} /> },
    { id: 3, target: 5, title: 'Skrzynia Dnia', shortReward: '+50 Monet +30 XP', coins: 50, xp: 30, icon: <Gift size={11} />, bonusType: 'freeze' as const }
  ], []);

  const [claimedTiers, setClaimedTiers] = useState<number[]>(() => {
    try {
      if (userState?.dailyQuestsClaimed?.[todayStr] && Array.isArray(userState.dailyQuestsClaimed[todayStr])) {
        return userState.dailyQuestsClaimed[todayStr];
      }
      const stored = localStorage.getItem(`matura_quest_daily_tiers_claimed_${todayStr}`);
      if (stored) return JSON.parse(stored);
      return [];
    } catch {
      return [];
    }
  });

  const [floatingReward, setFloatingReward] = useState<{ text: string; id: number } | null>(null);

  const claimableTier = useMemo(() => {
    return DAILY_TIERS.find(t => todayTasksCompleted >= t.target && !claimedTiers.includes(t.id)) || null;
  }, [DAILY_TIERS, todayTasksCompleted, claimedTiers]);

  const isAllTiersCompleted = useMemo(() => {
    return DAILY_TIERS.every(t => claimedTiers.includes(t.id));
  }, [DAILY_TIERS, claimedTiers]);

  const nextTargetTier = useMemo(() => {
    return DAILY_TIERS.find(t => todayTasksCompleted < t.target) || DAILY_TIERS[DAILY_TIERS.length - 1];
  }, [DAILY_TIERS, todayTasksCompleted]);

  const tasksToNextTier = Math.max(0, nextTargetTier.target - todayTasksCompleted);

  const handleClaimTier = (tier: typeof DAILY_TIERS[0]) => {
    if (claimedTiers.includes(tier.id)) return;
    if (todayTasksCompleted < tier.target) return;

    triggerHaptic('success');
    playSuccessSound();

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#FFB800', '#10B981', '#FFD700']
      });
    } catch {}

    const updatedClaimed = [...claimedTiers, tier.id];
    setClaimedTiers(updatedClaimed);

    try {
      localStorage.setItem(`matura_quest_daily_tiers_claimed_${todayStr}`, JSON.stringify(updatedClaimed));
    } catch {}

    setFloatingReward({
      text: tier.shortReward,
      id: Date.now()
    });
    setTimeout(() => setFloatingReward(null), 2000);

    if (onUpdateUserState) {
      onUpdateUserState(prev => {
        const updatedPerks = { ...(prev.perks || {
          xpBoostPercent: 0,
          coinBoostPercent: 0,
          streakFreezes: 0,
          arenaShields: 0,
          arenaTokenBonusPercent: 0,
          temporaryXpBoostCharges: 0
        }) };

        if (tier.bonusType === 'freeze') {
          updatedPerks.streakFreezes = (updatedPerks.streakFreezes || 0) + 1;
        }

        const nextState: UserState = {
          ...prev,
          coins: (prev.coins || 0) + tier.coins,
          xp: (prev.xp || 0) + tier.xp,
          perks: updatedPerks,
          dailyQuestsClaimed: {
            ...(prev.dailyQuestsClaimed || {}),
            [todayStr]: updatedClaimed
          }
        };
        saveUserData?.(nextState);
        return nextState;
      });
    }
  };

  // League details
  const rating = userState?.arenaRating || 1000;
  let leagueName = 'Brązowa';
  let leagueColor = 'text-amber-500';
  if (rating >= 1800) { leagueName = 'Diamentowa'; leagueColor = 'text-sky-400'; }
  else if (rating >= 1500) { leagueName = 'Platynowa'; leagueColor = 'text-teal-300'; }
  else if (rating >= 1300) { leagueName = 'Złota'; leagueColor = 'text-yellow-400'; }
  else if (rating >= 1100) { leagueName = 'Srebrna'; leagueColor = 'text-gray-300'; }

  return (
    <aside 
      aria-label="Panel boczny grywalizacji"
      className="hidden lg:flex flex-col gap-5 w-full sticky top-20 self-start"
    >
      {/* 1. STREAK WIDGET (Seria Dni) */}
      <div className="bg-gradient-to-br from-surface-card to-surface-bg border border-streak-flame/30 rounded-3xl p-5 relative overflow-hidden shadow-[0_4px_24px_rgba(234,88,12,0.12)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-streak-flame/15 rounded-full blur-[35px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
        
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-streak-flame text-xl tracking-tight">
                {streakDays} {streakDays === 1 ? 'Dzień' : 'Dni'}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-streak-flame bg-streak-flame/10 px-2 py-0.5 rounded-full border border-streak-flame/20">
                Seria
              </span>
            </div>
            <p className="text-text-muted text-[11px] leading-tight mt-1">
              {isCompletedToday 
                ? 'Cel na dziś zaliczony! Płomień płonie.' 
                : `Rozwiąż zadanie, aby zaliczyć Dzień ${todayTargetDayNumber}!`}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#C2410C] flex items-center justify-center shadow-[0_0_16px_rgba(249,115,22,0.4)] border border-white/20 shrink-0">
            <Flame size={22} className="text-white fill-white animate-pulse" />
          </div>
        </div>

        {/* 7-dniowa ścieżka serii */}
        <div className="grid grid-cols-7 gap-1.5 pt-3 border-t border-surface-border relative z-10">
          {streakMilestones.map(m => (
            <div key={m.dayNumber} className="flex flex-col items-center gap-1">
              <div 
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black transition-all ${
                  m.isCompleted 
                    ? 'bg-[#F97316] text-white shadow-[0_0_10px_rgba(249,115,22,0.5)] border border-white/20' 
                    : m.isTargetToday
                      ? 'border-2 border-dashed border-[#F97316] text-[#F97316] bg-[#F97316]/15 animate-pulse'
                      : 'bg-white/5 border border-surface-border text-text-muted'
                }`}
                title={m.fullLabel}
              >
                {m.isCompleted ? (
                  <Check size={14} strokeWidth={3} />
                ) : m.isTargetToday ? (
                  <Flame size={14} className="fill-[#EA580C]" />
                ) : (
                  <span>{m.dayNumber}</span>
                )}
              </div>
              <span className={`text-[10px] font-bold ${m.isCompleted ? 'text-streak-flame' : m.isTargetToday ? 'text-text-primary' : 'text-text-muted'}`}>
                {m.shortLabel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. WYZWANIE DNIA (Daily Missions) Z ZEGAREM */}
      <div className="bg-surface-card border border-primary/30 rounded-3xl p-5 relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <AnimatePresence>
          {floatingReward && (
            <motion.div
              key={floatingReward.id}
              initial={{ y: 0, opacity: 1, scale: 0.8 }}
              animate={{ y: -30, opacity: 0, scale: 1.2 }}
              exit={{ opacity: 0 }}
              className="absolute top-3 right-4 z-30 bg-amber-400 text-black font-black text-xs px-3 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.9)]"
            >
              {floatingReward.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(255,184,0,0.15)]">
              <Zap size={10} />
              <span>WYZWANIE DNIA</span>
            </span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            <Clock size={11} className="text-amber-400" />
            <span>{secondsUntilReset}</span>
          </div>
        </div>

        {/* Progress header */}
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-bold text-text-primary">
            Postęp zadań: <span className="text-primary font-black">{currentProgress}</span> / 5
          </span>
          <span className="text-[11px] text-text-muted">
            {isAllTiersCompleted ? 'Wszystko odebrane' : `Do celu: ${tasksToNextTier}`}
          </span>
        </div>

        {/* Progress line with nodes */}
        <div className="relative w-full my-3 px-2">
          <div className="w-full bg-surface-bg h-2 rounded-full overflow-hidden border border-surface-border">
            <div 
              className="h-full bg-gradient-to-r from-[#D97706] via-[#FFB800] to-amber-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,184,0,0.4)]"
              style={{ width: `${Math.min(100, Math.round((currentProgress / 5) * 100))}%` }}
            />
          </div>

          {DAILY_TIERS.map(tier => {
            const percent = (tier.target / 5) * 100;
            const isClaimed = claimedTiers.includes(tier.id);
            const isUnlocked = todayTasksCompleted >= tier.target;
            const isClaimable = isUnlocked && !isClaimed;

            return (
              <div 
                key={tier.id}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                style={{ left: `calc(${percent}% + ${percent === 20 ? '4px' : percent === 100 ? '-4px' : '0px'})` }}
              >
                <button
                  disabled={!isClaimable}
                  onClick={() => isClaimable && handleClaimTier(tier)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-all border-2 ${
                    isClaimed
                      ? 'bg-emerald-500 border-emerald-400 text-white'
                      : isClaimable
                        ? 'bg-gradient-to-br from-amber-400 to-yellow-500 border-white text-black shadow-[0_0_12px_rgba(245,158,11,0.8)] scale-110 animate-pulse cursor-pointer'
                        : isUnlocked
                          ? 'bg-primary border-white text-black'
                          : 'bg-surface-card border-surface-border text-text-muted'
                  }`}
                  title={`${tier.title}: ${tier.shortReward}`}
                >
                  {isClaimed ? <Check size={11} strokeWidth={3} /> : tier.icon}
                </button>
              </div>
            );
          })}
        </div>

        {/* Action button */}
        <div className="pt-2 border-t border-surface-border flex items-center justify-between gap-2">
          <div className="text-[11px] font-semibold text-text-primary/90 truncate flex-1">
            {claimableTier ? (
              <span className="text-amber-300 font-black">Nagroda gotowa do odebrania!</span>
            ) : tasksToNextTier > 0 ? (
              <span>Cel: <strong className="text-text-primary">{nextTargetTier.title}</strong></span>
            ) : (
              <span className="text-emerald-400">Komplet nagród odebrany</span>
            )}
          </div>

          {claimableTier ? (
            <button
              onClick={() => handleClaimTier(claimableTier)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs flex items-center gap-1 shadow-[0_0_14px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>ODBIERZ</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate?.('nauka')}
              className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-[#070A0F] font-bold text-xs flex items-center gap-1 shadow-[0_0_12px_rgba(255,184,0,0.35)] active:scale-95 transition-all cursor-pointer"
            >
              <span>TRENUJ</span>
              <ArrowRight size={12} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>

      {/* 3. SKRÓT DO POWTÓREK & STATYSTYK */}
      <div className="bg-surface-card border border-surface-border rounded-3xl p-5 flex flex-col gap-3.5 shadow-lg">
        <span className="text-[10px] font-black uppercase text-text-muted tracking-widest flex items-center gap-1.5">
          <Zap size={13} className="text-primary" />
          <span>Szybkie Moduły</span>
        </span>

        <button
          onClick={() => onNavigate?.('simulator')}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-surface-border hover:border-primary/30 transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30 group-hover:scale-105 transition-transform">
              <FileText size={18} />
            </div>
            <div>
              <div className="font-display font-bold text-text-primary text-xs">Arkusze Maturalne</div>
              <div className="text-[10px] text-text-muted">Nowa Formuła 2023 • Podstawa</div>
            </div>
          </div>
          <ArrowRight size={14} className="text-text-muted group-hover:text-text-primary group-hover:translate-x-1 transition-all" />
        </button>

        <button
          id="gamification-sidebar-arena-btn"
          onClick={() => onNavigate?.('arena')}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-emerald-500/10 border border-surface-border hover:border-emerald-500/30 transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all">
              <Swords size={18} />
            </div>
            <div>
              <div className="font-display font-bold text-text-primary text-xs flex items-center gap-1.5">
                <span>Arena 2.0</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  Wkrótce
                </span>
              </div>
              <div className="text-[10px] text-text-muted group-hover:text-emerald-300/80 transition-colors">
                Multiplayer Live 1v1 • Bilet
              </div>
            </div>
          </div>
          <ArrowRight size={14} className="text-text-muted group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </button>

        <div className="pt-2 border-t border-surface-border flex items-center justify-between text-[11px] text-text-muted px-1">
          <span>Zrobione zadania maturalne:</span>
          <strong className="text-text-primary font-black text-xs">{filterActualTaskIds(completedTasks).length}</strong>
        </div>
      </div>
    </aside>
  );
};
