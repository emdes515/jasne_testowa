import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserState } from '../types';
import { 
  Settings, 
  LogOut, 
  Bell, 
  Shield, 
  Paintbrush, 
  ChevronRight, 
  User, 
  LogIn, 
  Flame, 
  Trophy, 
  Sparkles, 
  Crown, 
  CheckCircle2, 
  Swords, 
  Zap,
  ShoppingBag,
  Target
} from 'lucide-react';
import { logout, auth, loginWithGoogle } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AchievementsSection } from './AchievementsSection';
import { PerksVaultSection } from './PerksVaultSection';
import { ShopItem, countTotalClaimable } from '../data/achievements';
import { triggerHaptic, getLocalDateString, filterActualTaskIds } from '../utils';

interface ProfileViewProps {
  userState: UserState;
  completedTasks?: string[];
  onClaimAchievement?: (achievementId: string, tier: number) => void;
  onBuyShopItem?: (item: ShopItem, currency: 'tokens' | 'coins') => boolean;
  onUseStreakFreeze?: () => void;
  onOpenAuthModal?: () => void;
  onOpenOnboarding?: () => void;
  initialTab?: 'overview' | 'achievements' | 'perks';
}

type ProfileTab = 'achievements' | 'perks' | 'overview';

export function ProfileView({ 
  userState, 
  completedTasks = [],
  onClaimAchievement = () => {},
  onBuyShopItem = () => false,
  onUseStreakFreeze,
  onOpenAuthModal,
  onOpenOnboarding,
  initialTab = 'overview'
}: ProfileViewProps) {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const streakDays = userState?.streakDays || 0;

  const claimableCount = useMemo(() => {
    return countTotalClaimable(
      {
        completedTasksCount: filterActualTaskIds(completedTasks).length,
        arenaWins: userState.arenaWins || 0,
        arenaRating: userState.arenaRating || 1000,
        streakDays: streakDays,
        maturaAttempts: userState.maturaAttempts || 0,
        maturaBestScore: userState.maturaBestScore || 0,
        level: userState.level || 1
      },
      userState.claimedAchievements || {}
    );
  }, [completedTasks, userState, streakDays]);

  const activityDays = useMemo(() => {
    const today = new Date();
    const todayStr = getLocalDateString(today);
    const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
    const days = [];

    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = getLocalDateString(d);
      const isToday = i === 0;

      let count = userState?.dailyTaskCounts?.[dateStr] || 0;

      // If it's today and dailyTaskCounts hasn't recorded yet, attribute current completed tasks to today
      const actualSolvedCount = filterActualTaskIds(completedTasks).length;
      if (isToday && count === 0 && actualSolvedCount > 0) {
        count = actualSolvedCount;
      }

      // If user had active streak on this date but count was 0, ensure at least 1
      if (count === 0 && userState?.streakActiveDates?.includes(dateStr)) {
        count = 1;
      }

      days.push({
        date: d,
        dateStr,
        dayName: dayNames[d.getDay()],
        count,
        isToday
      });
    }
    return days;
  }, [userState?.dailyTaskCounts, userState?.streakActiveDates, completedTasks]);

  const maxActivityCount = useMemo(() => {
    return Math.max(5, ...activityDays.map(d => d.count));
  }, [activityDays]);

  const todayActivityCount = useMemo(() => {
    const todayItem = activityDays.find(d => d.isToday);
    return todayItem ? todayItem.count : 0;
  }, [activityDays]);

  const handleAuthAction = async () => {
    try {
      if (user) {
        await logout();
        triggerHaptic('light');
      } else {
        if (onOpenAuthModal) {
          onOpenAuthModal();
        } else {
          await loginWithGoogle();
        }
        triggerHaptic('medium');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 pt-6 pb-[140px] max-w-xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl font-bold text-white">Centrum Gracza</h1>
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <Crown size={12} /> {userState.masteryTokens || 0} Żetonów
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#141A23] border border-white/5 p-1 rounded-2xl flex items-center gap-1 mb-6">
          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('overview');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all duration-150 active:scale-[0.96] flex items-center justify-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md'
                : 'text-[#8B8D98] hover:text-white'
            }`}
          >
            <User size={14} />
            <span>Profil</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('achievements');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all duration-150 active:scale-[0.96] flex items-center justify-center gap-1.5 relative ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-[#8B8D98] hover:text-white'
            }`}
          >
            <Trophy size={14} />
            <span>Odznaki</span>
            {claimableCount > 0 && (
              <span className="w-4 h-4 bg-amber-400 text-black text-[9px] font-black rounded-full flex items-center justify-center shadow-sm">
                {claimableCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              setActiveTab('perks');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all duration-150 active:scale-[0.96] flex items-center justify-center gap-1.5 ${
              activeTab === 'perks'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-[#8B8D98] hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            <span>Skarbiec</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'achievements' && (
          <AchievementsSection
            userState={userState}
            completedTasks={completedTasks}
            onClaimTier={onClaimAchievement}
          />
        )}

        {activeTab === 'perks' && (
          <PerksVaultSection
            userState={userState}
            onBuyItem={onBuyShopItem}
            onUseStreakFreeze={onUseStreakFreeze}
          />
        )}

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Profile Summary Card */}
            <div className="bg-[#141A23] border border-white/5 rounded-[24px] p-6 flex flex-col items-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <User size={28} />
              </div>
              
              <h2 className="font-display text-xl font-bold text-white mb-1">
                {user ? (user.displayName || 'Uczeń') : 'Gość (Tryb Demo)'}
              </h2>
              <p className="text-xs text-[#8B8D98]">
                {user ? user.email : 'Postępy zapisywane lokalnie'}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 w-full gap-2 mt-6">
                <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center">
                  <span className="text-[10px] text-[#8B8D98] uppercase font-bold tracking-wider mb-1">Poziom</span>
                  <span className="text-lg font-display font-bold text-white">{userState.level || 1}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center">
                  <span className="text-[10px] text-[#8B8D98] uppercase font-bold tracking-wider mb-1">Zadania</span>
                  <span className="text-lg font-display font-bold text-blue-400">{filterActualTaskIds(completedTasks).length}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center">
                  <span className="text-[10px] text-[#8B8D98] uppercase font-bold tracking-wider mb-1">Seria Dni</span>
                  <span className="text-lg font-display font-bold text-orange-400 flex items-center gap-1">
                    <Flame size={16} className="fill-orange-400" /> {streakDays}
                  </span>
                </div>
                <div className="bg-white/5 rounded-xl p-3 flex flex-col items-center">
                  <span className="text-[10px] text-[#8B8D98] uppercase font-bold tracking-wider mb-1">ELO Areny</span>
                  <span className="text-lg font-display font-bold text-amber-400">{userState.arenaRating || 1000}</span>
                </div>
              </div>
            </div>

            {/* Dynamic Activity Chart (14 Dni Aktywności) */}
            <div className="bg-[#141A23] border border-white/5 rounded-[24px] p-5 sm:p-6 overflow-hidden shadow-md">
              <div className="flex justify-between items-end mb-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-black text-white mb-0.5">
                    {filterActualTaskIds(completedTasks).length}
                  </span>
                  <span className="text-xs text-[#8B8D98]">Rozwiązanych zadań ogółem</span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-500/10 text-[#00C2FF] px-3 py-1.5 rounded-full border border-[#00C2FF]/30">
                  <Flame size={14} className="fill-[#00C2FF]" />
                  <span className="text-xs font-bold">
                    Dziś: {todayActivityCount} {todayActivityCount === 1 ? 'zadanie' : 'zadań'}
                  </span>
                </div>
              </div>

              {/* Subtitle / Legend */}
              <div className="flex items-center justify-between text-[11px] text-[#8B8D98] mb-3 pb-2 border-b border-white/5">
                <span>Historia aktywności (ostatnie 14 dni)</span>
                <span className="text-[#00C2FF] font-medium">Niebieski = ukończone zadania</span>
              </div>
              
              {/* 14-Day Bars Container */}
              <div className="flex items-end justify-between gap-1 sm:gap-1.5 h-28 pt-3 pb-1">
                {activityDays.map((d) => {
                  const hasTasks = d.count > 0;
                  const heightPct = hasTasks 
                    ? Math.max(22, Math.min(100, Math.round((d.count / maxActivityCount) * 100)))
                    : 10;

                  return (
                    <div 
                      key={d.dateStr} 
                      className="flex-1 group flex flex-col items-center justify-end h-full relative cursor-pointer min-w-0"
                      title={`${d.date.toLocaleDateString('pl-PL')}: ${d.count} zadań`}
                    >
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 bg-[#0B0E14] text-white text-[9px] font-bold py-0.5 px-1.5 rounded-md border border-white/10 pointer-events-none whitespace-nowrap z-20 shadow-lg">
                        {d.count} {d.count === 1 ? 'zadanie' : 'zadań'}
                      </div>

                      {hasTasks && (
                        <span className={`text-[8px] sm:text-[9px] font-bold mb-1 leading-none ${d.isToday ? 'text-[#00C2FF]' : 'text-blue-300/80'}`}>
                          {d.count}
                        </span>
                      )}

                      {/* Bar / Point */}
                      <div 
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          hasTasks
                            ? d.isToday
                              ? 'bg-gradient-to-t from-blue-600 via-[#00C2FF] to-cyan-300 shadow-[0_0_12px_rgba(0,194,255,0.5)] border-t border-white/40'
                              : 'bg-gradient-to-t from-blue-700/80 to-blue-400 group-hover:to-[#00C2FF] shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                            : 'bg-white/5 group-hover:bg-white/10'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />

                      {/* Day Label */}
                      <span className={`text-[8px] sm:text-[9px] font-bold mt-1.5 leading-none truncate max-w-full ${d.isToday ? 'text-[#00C2FF] font-black' : 'text-[#8B8D98]'}`}>
                        {d.isToday ? 'Dziś' : d.dayName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & Settings */}
            <div className="bg-[#141A23] border border-white/5 rounded-[24px] overflow-hidden shadow-sm">
              {onOpenOnboarding && (
                <button 
                  onClick={() => {
                    triggerHaptic('light');
                    onOpenOnboarding();
                  }}
                  className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors border-b border-white/5 text-left cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00C2FF]/10 flex items-center justify-center text-[#00C2FF] shrink-0 border border-[#00C2FF]/20">
                    <Target size={18} />
                  </div>
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">Twój Cel i Egzamin</span>
                      <span className="text-[10px] bg-[#00C2FF]/15 text-[#00C2FF] font-bold px-2 py-0.5 rounded-full border border-[#00C2FF]/30">
                        {userState?.onboardingPreferences?.targetScore ? `${userState.onboardingPreferences.targetScore}%` : 'Ustaw'}
                      </span>
                    </div>
                    <span className="text-xs text-[#8B8D98] truncate max-w-full">
                      {userState?.onboardingPreferences 
                        ? `${userState.onboardingPreferences.targetExam === 'matura_2025' ? 'Nowa Formuła 2023' : userState.onboardingPreferences.targetExam === 'poprawka' ? 'Szybka Poprawka' : 'Egzamin Ósmoklasisty'} • ${userState.onboardingPreferences.dailyMinutes} min dziennie`
                        : 'Zmień cel maturalny i czas nauki'}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-[#8B8D98] shrink-0" />
                </button>
              )}

              <button 
                onClick={() => setActiveTab('achievements')}
                className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Trophy size={18} />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm font-bold text-white">System Odznak</span>
                  <span className="text-xs text-[#8B8D98]">Odbieraj nagrody za postępy</span>
                </div>
                <ChevronRight size={18} className="text-[#8B8D98]" />
              </button>

              <button 
                onClick={() => setActiveTab('perks')}
                className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors border-b border-white/5"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <Sparkles size={18} />
                </div>
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm font-bold text-white">Skarbiec & Perki</span>
                  <span className="text-xs text-[#8B8D98]">Zarządzaj bonusami i tarczami</span>
                </div>
                <ChevronRight size={18} className="text-[#8B8D98]" />
              </button>

              <button 
                onClick={handleAuthAction}
                className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${user ? 'bg-white/5 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                  {user ? <LogOut size={18} /> : <LogIn size={18} />}
                </div>
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm font-bold text-white">{user ? 'Wyloguj się' : 'Zaloguj się / Rejestracja'}</span>
                  <span className="text-xs text-[#8B8D98]">{user ? 'Zakończ sesję' : 'Zapisz serię i postępy w chmurze'}</span>
                </div>
                <ChevronRight size={18} className="text-[#8B8D98]" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
