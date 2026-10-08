import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, X, Zap, Heart, Coins, Trophy, Shield, Flame, 
  CheckCircle2, RotateCcw, Copy, ExternalLink,
  BookOpen, Calculator, Globe, GraduationCap, Swords, Bot, Layers
} from 'lucide-react';
import { UserState, TabState, SubjectKey, SubjectId } from '../types';
import { 
  applyFullDeveloperAccess, 
  disableDeveloperAccess, 
  addDevResources 
} from '../services/devService';
import { triggerHaptic } from '../utils';

interface DevHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: UserState;
  onUpdateUserState: (updater: (prev: UserState) => UserState) => void;
  onNavigate?: (tab: TabState, subTab?: string) => void;
  onSelectSubject?: (key: SubjectKey) => void;
  onSelectSubjectId?: (id: SubjectId) => void;
}

export function DevHubModal({
  isOpen,
  onClose,
  userState,
  onUpdateUserState,
  onNavigate,
  onSelectSubject,
  onSelectSubjectId,
}: DevHubModalProps) {
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState<'powers' | 'teleport' | 'debug'>('powers');

  if (!isOpen) return null;

  const isDevActive = Boolean(userState.isDev || userState.isPro);

  const handleToggleDev = () => {
    triggerHaptic('medium');
    if (isDevActive) {
      onUpdateUserState(prev => disableDeveloperAccess(prev));
    } else {
      onUpdateUserState(prev => applyFullDeveloperAccess(prev));
    }
  };

  const handleMaxResources = () => {
    triggerHaptic('success');
    onUpdateUserState(prev => applyFullDeveloperAccess(prev));
  };

  const handleUnlockAllLessons = () => {
    triggerHaptic('success');
    onUpdateUserState(prev => applyFullDeveloperAccess(prev));
  };

  const handleAddCoins = (amount: number) => {
    triggerHaptic('light');
    onUpdateUserState(prev => addDevResources(prev, { coins: amount }));
  };

  const handleAddXp = (amount: number) => {
    triggerHaptic('light');
    onUpdateUserState(prev => addDevResources(prev, { xp: amount }));
  };

  const handleAddStreak = (days: number) => {
    triggerHaptic('light');
    onUpdateUserState(prev => addDevResources(prev, { streak: days }));
  };

  const handleCopyJson = () => {
    triggerHaptic('light');
    const summary = {
      isDev: userState.isDev,
      isPro: userState.isPro,
      level: userState.level,
      xp: userState.xp,
      coins: userState.coins,
      gems: userState.gems,
      hearts: userState.hearts,
      streakDays: userState.streakDays,
      currentSubject: userState.currentSubject,
      perks: userState.perks,
      completedLessonsMathCount: userState.completed_lessons?.length || 0,
      completedLessonsPolishCount: userState.completedLessonsPolish?.length || 0,
      completedLessonsEnglishCount: userState.completedLessonsEnglish?.length || 0,
    };
    navigator.clipboard.writeText(JSON.stringify(summary, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleResetToFresh = () => {
    triggerHaptic('warning');
    if (window.confirm('Czy na pewno chcesz zresetować stan konta do czystego profilu startowego?')) {
      const freshState: UserState = {
        xp: 0,
        coins: 50,
        gems: 10,
        level: 1,
        campusRust: 0,
        lastActive: Date.now(),
        arenaRating: 1000,
        arenaWins: 0,
        masteryTokens: 0,
        streakDays: 0,
        streakActiveDates: [],
        dailyTaskCounts: {},
        claimedAchievements: {},
        timeSpentTotalSeconds: 0,
        weeklyTimeSpentMinutes: 0,
        hearts: 5,
        maxHearts: 5,
        isPro: false,
        isDev: false,
        lastHeartRegenTimestamp: Date.now(),
        aiVisionDailyCount: 0,
        perks: {
          xpBoostPercent: 0,
          coinBoostPercent: 0,
          streakFreezes: 0,
          arenaShields: 0,
          arenaTokenBonusPercent: 0,
          temporaryXpBoostCharges: 0,
        },
        maturaAttempts: 0,
        currentSubject: 'matematyka',
        completed_lessons: [],
        completedLessonsPolish: [],
        completedLessonsEnglish: [],
      };
      localStorage.removeItem('jasne_dev_mode_active');
      localStorage.setItem('matura_quest_cached_user', JSON.stringify(freshState));
      localStorage.setItem('matura_quest_guest_user', JSON.stringify(freshState));
      onUpdateUserState(() => freshState);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-[#090E17] border border-emerald-500/40 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Glow accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-surface-border flex items-center justify-between bg-surface-card/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Terminal size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-base sm:text-lg text-white">
                  Panel Deweloperski
                </h3>
                <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full border ${
                  isDevActive 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                    : 'bg-white/5 text-text-muted border-white/10'
                }`}>
                  {isDevActive ? '● PEŁNY DOSTĘP DEV' : '○ STANDARD'}
                </span>
              </div>
              <p className="text-text-muted text-xs">
                Odblokowanie funkcji, zasobów i modułów platformy JASNE
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs switcher */}
        <div className="flex items-center gap-1 p-2 sm:px-6 bg-surface-card/20 border-b border-surface-border">
          <button
            onClick={() => setActiveTab('powers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'powers'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            ⚡ Super-Moce i Zasoby
          </button>
          <button
            onClick={() => setActiveTab('teleport')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'teleport'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            🧭 Szybki Skok (Teleport)
          </button>
          <button
            onClick={() => setActiveTab('debug')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'debug'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            🔍 Diagnostyka Stanu
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {activeTab === 'powers' && (
            <div className="space-y-4">
              {/* Główny przełącznik Dev Mode */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-surface-card to-surface-card border border-emerald-500/30 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-emerald-400" />
                    <span className="font-bold text-white text-sm">
                      Master Switch: Tryb Deweloperski & PRO
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">
                    Włącza nielimitowane serca, brak limitu AI Vision oraz znosi wszystkie blokady.
                  </p>
                </div>
                <button
                  onClick={handleToggleDev}
                  className={`px-4 py-2 rounded-xl font-black text-xs transition-all cursor-pointer shadow-md ${
                    isDevActive
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/30'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {isDevActive ? 'WYŁĄCZ' : 'WŁĄCZ PEŁNY DEV'}
                </button>
              </div>

              {/* Grid 1-kliknięciowych akcji */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Max zasoby */}
                <button
                  onClick={handleMaxResources}
                  className="p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-amber-500/40 text-left transition-all group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Coins size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      MAX ZASOBY
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-amber-300 transition-colors">
                    99 999 Monet & Gems + 150k XP
                  </h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Ustawia maksymalny poziom (99), potężną pulę waluty i tokenów areny.
                  </p>
                </button>

                {/* 2. Odblokowanie wszystkich 225 lekcji */}
                <button
                  onClick={handleUnlockAllLessons}
                  className="p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-emerald-500/40 text-left transition-all group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <GraduationCap size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      225 LEKCJI
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-emerald-300 transition-colors">
                    Odblokuj Wszystkie Lekcje Core-4
                  </h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Oznacza jako zaliczone 15 działów Matematyki, Polskiego i Angielskiego.
                  </p>
                </button>

                {/* 3. Nielimitowane serca */}
                <button
                  onClick={() => {
                    triggerHaptic('success');
                    onUpdateUserState(prev => ({
                      ...prev,
                      isPro: true,
                      isDev: true,
                      hearts: 999,
                      maxHearts: 999
                    }));
                  }}
                  className="p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-rose-500/40 text-left transition-all group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                      <Heart size={16} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                      INFINITE HEARTS
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-rose-300 transition-colors">
                    Nieskończone Serca (∞)
                  </h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Zero kar za błędy podczas rozwiązywania zadań i sprawdzianów.
                  </p>
                </button>

                {/* 4. Maksymalne Perki */}
                <button
                  onClick={() => {
                    triggerHaptic('success');
                    onUpdateUserState(prev => ({
                      ...prev,
                      perks: {
                        streakFreezes: 99,
                        arenaShields: 99,
                        xpBoostPercent: 50,
                        coinBoostPercent: 50,
                        arenaTokenBonusPercent: 50,
                        temporaryXpBoostCharges: 99,
                      }
                    }));
                  }}
                  className="p-3.5 rounded-2xl bg-surface-card hover:bg-surface-card-hover border border-surface-border hover:border-blue-500/40 text-left transition-all group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Shield size={16} />
                    </div>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                      MAX PERKS
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-blue-300 transition-colors">
                    99 Zamrożeń Streaku & Tarcze
                  </h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Ochrona serii dni i ratingu ELO w Arenie przed spadkiem.
                  </p>
                </button>
              </div>

              {/* Szybkie doładowania liczbowe */}
              <div className="p-3.5 rounded-2xl bg-surface-card/60 border border-surface-border space-y-2.5">
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider block">
                  Szybkie Mikro-Doładowania:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleAddCoins(5000)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-amber-300 border border-amber-500/30 cursor-pointer flex items-center gap-1.5"
                  >
                    <Coins size={13} /> +5 000 Monet
                  </button>
                  <button
                    onClick={() => handleAddXp(2500)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-emerald-300 border border-emerald-500/30 cursor-pointer flex items-center gap-1.5"
                  >
                    <Zap size={13} /> +2 500 XP
                  </button>
                  <button
                    onClick={() => handleAddStreak(7)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-orange-300 border border-orange-500/30 cursor-pointer flex items-center gap-1.5"
                  >
                    <Flame size={13} /> +7 Dni Streaku
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teleport' && (
            <div className="space-y-3">
              <p className="text-xs text-text-muted mb-2">
                Błyskawicznie przełącz widok i aktywny przedmiot jednym kliknięciem:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Matematyka */}
                <button
                  onClick={() => {
                    onSelectSubject?.('math');
                    onSelectSubjectId?.('matematyka');
                    onNavigate?.('learn');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-surface-card hover:bg-amber-500/10 border border-surface-border hover:border-amber-500/40 text-left transition flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                    <Calculator size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Matematyka: 15 Działów</h5>
                    <p className="text-[10px] text-text-muted">Przejdź do kursu matematyki</p>
                  </div>
                </button>

                {/* Polski */}
                <button
                  onClick={() => {
                    onSelectSubject?.('pol');
                    onSelectSubjectId?.('polski');
                    onNavigate?.('learn');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-surface-card hover:bg-amber-500/10 border border-surface-border hover:border-amber-500/40 text-left transition flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Język Polski: 15 Działów</h5>
                    <p className="text-[10px] text-text-muted">Przejdź do kursu polskiego</p>
                  </div>
                </button>

                {/* Angielski */}
                <button
                  onClick={() => {
                    onSelectSubject?.('eng');
                    onSelectSubjectId?.('angielski');
                    onNavigate?.('learn');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-surface-card hover:bg-amber-500/10 border border-surface-border hover:border-amber-500/40 text-left transition flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                    <Globe size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Język Angielski: 15 Działów</h5>
                    <p className="text-[10px] text-text-muted">Przejdź do kursu angielskiego</p>
                  </div>
                </button>

                {/* Symulator Matury */}
                <button
                  onClick={() => {
                    onNavigate?.('simulator');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-surface-card hover:bg-purple-500/10 border border-surface-border hover:border-purple-500/40 text-left transition flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                    <GraduationCap size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Symulator Matury (3 Formaty)</h5>
                    <p className="text-[10px] text-text-muted">Ekspresowe, Mini, Pełne</p>
                  </div>
                </button>

                {/* Arena ELO */}
                <button
                  onClick={() => {
                    onNavigate?.('arena');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-surface-card hover:bg-orange-500/10 border border-surface-border hover:border-orange-500/40 text-left transition flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
                    <Swords size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Arena ELO & Pojedynki</h5>
                    <p className="text-[10px] text-text-muted">PvP i rankingi maturalne</p>
                  </div>
                </button>

                {/* Profil & Sklep */}
                <button
                  onClick={() => {
                    onNavigate?.('profil');
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-surface-card hover:bg-blue-500/10 border border-surface-border hover:border-blue-500/40 text-left transition flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Profil, Sklep & Osiągnięcia</h5>
                    <p className="text-[10px] text-text-muted">Ekwipunek i statystyki</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'debug' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-secondary">
                  Stan Profilu (Podgląd pamięci podręcznej):
                </span>
                <button
                  onClick={handleCopyJson}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-bold text-text-secondary hover:text-white flex items-center gap-1 cursor-pointer transition"
                >
                  {copiedJson ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedJson ? 'Skopiowano!' : 'Kopiuj JSON'}</span>
                </button>
              </div>

              <pre className="p-3 rounded-2xl bg-black/60 border border-surface-border text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-48">
                {JSON.stringify({
                  isDev: userState.isDev,
                  isPro: userState.isPro,
                  level: userState.level,
                  xp: userState.xp,
                  coins: userState.coins,
                  gems: userState.gems,
                  hearts: userState.hearts,
                  maxHearts: userState.maxHearts,
                  streakDays: userState.streakDays,
                  currentSubject: userState.currentSubject,
                  perks: userState.perks,
                  completedLessonsCount: {
                    math: userState.completed_lessons?.length || 0,
                    polish: userState.completedLessonsPolish?.length || 0,
                    english: userState.completedLessonsEnglish?.length || 0,
                  }
                }, null, 2)}
              </pre>

              <div className="pt-2 border-t border-surface-border flex items-center justify-between">
                <span className="text-xs text-rose-400 font-semibold">
                  Strefa niebezpieczna:
                </span>
                <button
                  onClick={handleResetToFresh}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>Resetuj stan do nowego konta (Gość)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-surface-border bg-surface-card/60 flex items-center justify-between">
          <div className="text-[11px] text-text-muted flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Developer Mode Enabled (JASNE Platform Engine)</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer"
          >
            Zamknij
          </button>
        </div>
      </motion.div>
    </div>
  );
}
