import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Target, 
  Wrench, 
  Coins, 
  Check, 
  Clock, 
  Trophy,
  ArrowRight
} from 'lucide-react';
import { UserState, DailyChallengeId, DailyChallenge } from '../types';
import { getTodayDateString, triggerHaptic, playSuccessSound } from '../utils';
import confetti from 'canvas-confetti';

interface DailyChallengesWidgetProps {
  userState?: UserState;
  onClaimChallenge?: (challengeId: DailyChallengeId, rewardCoins: number) => void;
  onNavigate?: (tab: string, subTab?: string) => void;
  onOpenMistakesBank?: () => void;
}

export const DailyChallengesWidget: React.FC<DailyChallengesWidgetProps> = ({
  userState,
  onClaimChallenge,
  onNavigate,
  onOpenMistakesBank
}) => {
  const todayStr = useMemo(() => getTodayDateString(), []);

  // Countdown do północy
  const [timeLeftStr, setTimeLeftStr] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diffMs = Math.max(0, midnight.getTime() - now.getTime());
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeftStr(`${hours}h ${mins.toString().padStart(2, '0')}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const todayTasksCompleted = userState?.dailyTaskCounts?.[todayStr] || 0;
  const isPerfectLessonCompleted = Boolean(userState?.dailyChallengesState?.[todayStr]?.perfectLesson);
  const isMaintenanceCompleted = Boolean(userState?.dailyChallengesState?.[todayStr]?.reviewOrArenaDone);

  const claimedChallenges: DailyChallengeId[] = useMemo(() => {
    return userState?.dailyChallengesClaimed?.[todayStr] || [];
  }, [userState?.dailyChallengesClaimed, todayStr]);

  const challenges: DailyChallenge[] = useMemo(() => [
    {
      id: 'warmup',
      title: 'Rozgrzewka',
      description: 'Rozwiąż min. 3 zadania',
      target: 3,
      current: Math.min(3, todayTasksCompleted),
      rewardCoins: 10,
      isCompleted: todayTasksCompleted >= 3,
      isClaimed: claimedChallenges.includes('warmup')
    },
    {
      id: 'sniper',
      title: 'Snajper',
      description: 'Ukończ 1 lekcję bez błędu',
      target: 1,
      current: isPerfectLessonCompleted ? 1 : 0,
      rewardCoins: 15,
      isCompleted: isPerfectLessonCompleted,
      isClaimed: claimedChallenges.includes('sniper')
    },
    {
      id: 'maintenance',
      title: 'Konserwacja',
      description: 'Bank Błędów lub walka Areny',
      target: 1,
      current: isMaintenanceCompleted ? 1 : 0,
      rewardCoins: 10,
      isCompleted: isMaintenanceCompleted,
      isClaimed: claimedChallenges.includes('maintenance')
    }
  ], [todayTasksCompleted, isPerfectLessonCompleted, isMaintenanceCompleted, claimedChallenges]);

  const completedCount = challenges.filter(c => c.isCompleted).length;
  const totalCoinsAvailable = challenges.reduce((sum, c) => sum + (c.isClaimed ? 0 : c.rewardCoins), 0);

  const handleClaim = (challenge: DailyChallenge) => {
    if (!challenge.isCompleted || challenge.isClaimed || !onClaimChallenge) return;
    
    triggerHaptic('success');
    playSuccessSound();
    
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#FFB800', '#F59E0B', '#10B981', '#FCD34D']
      });
    } catch (e) {}

    onClaimChallenge(challenge.id, challenge.rewardCoins);
  };

  return (
    <div 
      id="daily-challenges-card"
      className="bg-surface-card border border-surface-border hover:border-surface-border-hover rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all shadow-sm"
    >
      {/* Background Accent Blooms */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Widgetu */}
      <div className="flex items-center justify-between mb-3.5 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-black text-sm text-text-primary tracking-tight">
                Wyzwania Dnia
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
                +35 monet
              </span>
            </div>
            <p className="text-[11px] text-text-muted">
              {completedCount} z 3 ukończone dzisiaj
            </p>
          </div>
        </div>

        {timeLeftStr && (
          <div className="flex items-center gap-1 text-[11px] text-text-muted font-mono bg-white/[0.03] border border-white/5 px-2 py-1 rounded-lg">
            <Clock size={11} className="text-amber-400/80" />
            <span>{timeLeftStr}</span>
          </div>
        )}
      </div>

      {/* Pasek Postępu Dnia */}
      <div className="w-full bg-surface-elevated h-1.5 rounded-full overflow-hidden mb-3.5 border border-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(completedCount / 3) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Lista 3 Wyzwań */}
      <div className="flex flex-col gap-2 relative z-10">
        {challenges.map((ch) => {
          const isReadyToClaim = ch.isCompleted && !ch.isClaimed;
          const isDone = ch.isCompleted && ch.isClaimed;

          return (
            <div
              key={ch.id}
              className={`p-2.5 sm:p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                isDone 
                  ? 'bg-emerald-950/15 border-emerald-500/25 opacity-80'
                  : isReadyToClaim
                    ? 'bg-amber-500/10 border-amber-400/40 shadow-sm animate-pulse'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
              }`}
            >
              {/* Ikona + Treść */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                  isDone 
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                    : isReadyToClaim
                      ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                      : 'bg-white/5 border-white/5 text-text-muted'
                }`}>
                  {ch.id === 'warmup' && <Flame size={14} />}
                  {ch.id === 'sniper' && <Target size={14} />}
                  {ch.id === 'maintenance' && <Wrench size={14} />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-bold text-xs text-text-primary truncate">
                      {ch.title}
                    </span>
                    <span className="text-[10px] text-text-muted font-mono">
                      ({ch.current}/{ch.target})
                    </span>
                  </div>
                  <p className="text-[10px] text-text-muted truncate mt-0.5">
                    {ch.description}
                  </p>
                </div>
              </div>

              {/* Akcja / Status */}
              <div className="shrink-0 flex items-center">
                {isDone ? (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
                    <Check size={12} strokeWidth={2.5} />
                    <span>Zaliczone</span>
                  </div>
                ) : isReadyToClaim ? (
                  <button
                    type="button"
                    onClick={() => handleClaim(ch)}
                    className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-[11px] flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    <Coins size={11} className="fill-slate-950" />
                    <span>+{ch.rewardCoins}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300/80 bg-white/5 border border-white/5 px-2 py-1 rounded-lg">
                    <Coins size={11} className="text-amber-400" />
                    <span>+{ch.rewardCoins}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
