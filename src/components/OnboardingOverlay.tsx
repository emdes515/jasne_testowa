import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import {
  Flame,
  Check,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Zap,
  Target,
  LogIn,
  Lightbulb,
  ShieldCheck,
  Trophy,
  BookOpen,
  Clock,
  Compass,
  Calculator
} from 'lucide-react';
import { triggerHaptic, playSuccessSound } from '../utils';
import { Badge } from './Badge';

export interface OnboardingPreferences {
  targetExam: 'matura_2025' | 'poprawka' | 'e8';
  targetScore: '30' | '70' | '100';
  dailyMinutes: 5 | 10 | 15;
}

interface OnboardingOverlayProps {
  onClose: () => void;
  onNavigate?: (tab: 'nauka' | 'dashboard' | 'arena' | 'profile' | 'simulator') => void;
  onComplete?: (prefs: OnboardingPreferences, shouldOpenAuth?: boolean) => void;
  onOpenAuthModal?: () => void;
  hasProgress?: boolean;
  onLogin?: () => void;
}

interface GoalOption {
  id: string;
  exam: 'matura_2025' | 'poprawka';
  score: '30' | '70' | '100';
  title: string;
  subtitle: string;
  icon: typeof Target;
  badgeText: string;
  badgeVariant: 'jasne' | 'amber';
}

export function OnboardingOverlay({
  onClose,
  onNavigate,
  onComplete,
  onOpenAuthModal,
  onLogin
}: OnboardingOverlayProps) {
  // 5-krokowy nowoczesny flow:
  // 1. Cel maturalny (Domyślnie Matematyka Podstawowa Formuła 2023)
  // 2. Mikro-Zadanie Wizualne CKE (Wykres funkcji kwadratowej & zbiór wartości)
  // 3. Ekosystem JASNE (3 świecące karty Bento: Minimatury 20 min, Baza CKE, AI Tutor)
  // 4. Interaktywny Przegląd Kokpitu (Anatomia interfejsu z 4 hotspotami)
  // 5. Finałowy sukces, Dzień 1 Serii & Zabezpieczenie postępów (Loss Aversion)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Krok 1: Wybór celu
  const [targetExam, setTargetExam] = useState<'matura_2025' | 'poprawka'>('matura_2025');
  const [targetScore, setTargetScore] = useState<'30' | '70' | '100'>('70');
  const [selectedGoalId, setSelectedGoalId] = useState<string>('matura_70');

  // Krok 2: Zadanie demonstracyjne (Wykres funkcji kwadratowej)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isTaskSolved, setIsTaskSolved] = useState<boolean>(false);
  const [showWrongTip, setShowWrongTip] = useState<boolean>(false);

  // Krok 4: Hotspoty interfejsu
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  // Auto-advance timer
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const goalOptions: GoalOption[] = [
    {
      id: 'matura_70',
      exam: 'matura_2025',
      score: '70',
      title: '70%+ • Solidny wynik',
      subtitle: 'Studia dzienne • Pewne schematy z 14 działów maturalnych',
      icon: GraduationCap,
      badgeText: 'NAJPOPULARNIEJSZY',
      badgeVariant: 'jasne'
    },
    {
      id: 'matura_30',
      exam: 'matura_2025',
      score: '30',
      title: '30%+ • Zdać na luzie',
      subtitle: 'Święty spokój, zero stresu • Pewniaki z zadań zamkniętych CKE',
      icon: ShieldCheck,
      badgeText: 'PEWNE ZALICZENIE',
      badgeVariant: 'amber'
    },
    {
      id: 'matura_100',
      exam: 'matura_2025',
      score: '100',
      title: '100% • Top uczelnie',
      subtitle: 'Kierunki techniczne, medyczne, finanse • Maksimum punktów',
      icon: Trophy,
      badgeText: 'MAKSYMALNY WYNIK',
      badgeVariant: 'jasne'
    },
    {
      id: 'poprawka',
      exam: 'poprawka',
      score: '30',
      title: 'Szybka Poprawka / Ekspres',
      subtitle: 'Tryb ratunkowy • Powtórka kluczowych schematów za 1 pkt',
      icon: Zap,
      badgeText: 'RATUNEK',
      badgeVariant: 'amber'
    }
  ];

  // Krok 1: Wybór celu z płynnym auto-advance
  const handleSelectGoal = (option: GoalOption) => {
    setSelectedGoalId(option.id);
    setTargetExam(option.exam);
    setTargetScore(option.score);
    triggerHaptic('light');

    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = setTimeout(() => {
      setCurrentStep(2);
    }, 260);
  };

  // Krok 2: Odpowiedź na zadanie z wykresem paraboli
  const handleSelectAnswer = (ans: string) => {
    if (isTaskSolved) return;
    setSelectedAnswer(ans);

    if (ans === 'A') {
      setIsTaskSolved(true);
      setShowWrongTip(false);
      triggerHaptic('success');
      playSuccessSound();
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.55 }
      });

      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = setTimeout(() => {
        setCurrentStep(3);
      }, 950);
    } else {
      setShowWrongTip(true);
      triggerHaptic('warning');
    }
  };

  const handleFinishOnboarding = (openAuth: boolean = false) => {
    triggerHaptic('medium');
    const prefs: OnboardingPreferences = {
      targetExam,
      targetScore,
      dailyMinutes: 10
    };

    if (onComplete) {
      onComplete(prefs, openAuth);
    } else {
      onClose();
      if (openAuth && (onOpenAuthModal || onLogin)) {
        if (onOpenAuthModal) onOpenAuthModal();
        else if (onLogin) onLogin();
      } else if (onNavigate) {
        onNavigate('dashboard');
      }
    }
  };

  // Hotspoty dla Kroku 4 (Anatomia Aplikacji)
  const hotspots = [
    {
      id: 'nav',
      title: 'Nawigacja & Menu',
      badge: 'SZYBKI DOSTĘP',
      icon: Compass,
      desc: 'Intuicyjny dock u dołu ekranu. Błyskawicznie przełączaj się między nauką, arkuszami CKE i pojedynkami 1v1.',
      color: '#FFB800'
    },
    {
      id: 'simulator',
      title: 'Symulator Mini-matur',
      badge: '20 MINUT CKE',
      icon: Clock,
      desc: 'Kompaktowe arkusze maturalne. Sprawdzasz tempo, korzystasz z brudnopisu i tablic wzorów bez znużenia.',
      color: '#38BDF8'
    },
    {
      id: 'learn',
      title: 'Mapa Nauki & Bento',
      badge: '14 DZIAŁÓW',
      icon: BookOpen,
      desc: 'Drzewo powtórek podzielone na mikro-lekcje (4–6 min). Pigułka teorii, oficjalne wzory i zadania ze schematów CKE.',
      color: '#10B981'
    },
    {
      id: 'streak',
      title: 'Seria Dni & Skarbiec',
      badge: 'GRYWALIZACJA',
      icon: Flame,
      desc: 'Rozwiązuj choć 1 zadanie dziennie, by utrzymać płomień serii, zdobywać monety i chronić streak zamrażarkami.',
      color: '#EA580C'
    }
  ];

  return (
    <div 
      id="onboarding-overlay"
      className="fixed inset-0 z-[100] flex flex-col bg-[#070A0F] text-white overflow-hidden font-sans select-none touch-pan-y"
    >
      {/* Dynamiczne oświetlenie tła Nocturne Luminary */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[280px] bg-gradient-to-b from-[#FFB800]/12 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[260px] bg-gradient-to-t from-amber-500/10 to-transparent blur-[90px] pointer-events-none" />

      {/* Pasek postępu na samej górze */}
      <div className="w-full bg-white/5 h-1.5 relative overflow-hidden shrink-0 z-30">
        <motion.div
          className="h-full bg-gradient-to-r from-[#D97706] via-[#FFB800] to-[#FFC72C] shadow-[0_0_12px_rgba(255,184,0,0.8)]"
          initial={false}
          animate={{ width: `${(currentStep / 5) * 100}%` }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Górny pasek nawigacyjny kroku */}
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5 bg-[#0B0F19]/90 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2">
          {currentStep > 1 ? (
            <button
              onClick={() => {
                if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
                triggerHaptic('light');
                setCurrentStep(prev => Math.max(1, prev - 1));
              }}
              className="p-1.5 -ml-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Wróć"
            >
              <ArrowLeft size={17} />
              <span className="text-xs font-semibold hidden xs:inline">Wróć</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Badge variant="jasne" icon={<Calculator size={13} />}>
                MATEMATYKA PODSTAWOWA
              </Badge>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
          <span className="text-[11px] font-bold text-white">
            Krok {currentStep}
          </span>
          <span className="text-[11px] text-slate-400">/ 5</span>
        </div>

        <button
          onClick={() => {
            triggerHaptic('light');
            handleFinishOnboarding(false);
          }}
          className="text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          Pomiń
        </button>
      </div>

      {/* Główny kontener kroków */}
      <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-4 max-w-xl mx-auto w-full flex flex-col justify-between overscroll-y-contain">
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* KROK 1: Wybór Celu (Matematyka Podstawowa CKE)           */}
          {/* ======================================================== */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col gap-3.5 flex-1 justify-between"
            >
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <Badge variant="jasne" icon={<Target size={12} />}>
                    TWÓJ CEL MATURALNY • FORMUŁA 2023
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  W co celujesz na maturze z matematyki?
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Matematyka została ustawiona jako Twój główny przedmiot. Wybierz cel – dopasujemy schematy CKE i tempo nauki.
                </p>
              </div>

              {/* Kafelki celów */}
              <div className="flex flex-col gap-2.5 my-auto">
                {goalOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedGoalId === opt.id;

                  return (
                    <button
                      key={opt.id}
                      id={`onboarding-goal-${opt.id}`}
                      onClick={() => handleSelectGoal(opt)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-150 relative flex items-center gap-3.5 cursor-pointer active:scale-[0.99] ${
                        isSelected
                          ? 'border-[#FFB800] bg-[#FFB800]/10 shadow-[0_0_20px_rgba(255,184,0,0.2)]'
                          : 'bg-[#0E1522]/90 border-white/10 hover:border-white/20 hover:bg-[#131D2E]'
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                          isSelected
                            ? 'bg-[#FFB800]/20 border-[#FFB800]/40 text-[#FFB800]'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        <Icon size={20} />
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-sm font-bold text-white">
                            {opt.title}
                          </span>
                          <Badge variant={opt.badgeVariant}>
                            {opt.badgeText}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 leading-tight truncate">
                          {opt.subtitle}
                        </p>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#FFB800] border-[#FFB800] text-[#080B11]'
                            : 'border-white/20 text-transparent'
                        }`}
                      >
                        <Check size={13} strokeWidth={3} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Przycisk dalej & podpowiedź */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  id="onboarding-step1-continue"
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-[#080B11] bg-[#FFB800] hover:bg-[#FFC72C] active:scale-[0.99] transition flex items-center justify-center gap-2 text-sm sm:text-base shadow-[0_0_20px_rgba(255,184,0,0.35)]"
                >
                  <span>DALEJ</span>
                  <ArrowRight size={17} />
                </button>
                <span className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                  <Lightbulb size={12} className="text-amber-400 shrink-0" />
                  <span>Kliknięcie celu automatycznie przenosi Cię do kolejnego kroku</span>
                </span>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* KROK 2: Wizualne Zadanie CKE z Wykresem Paraboli        */}
          {/* ======================================================== */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col gap-3 flex-1 justify-between"
            >
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <Badge variant="jasne" icon={<Target size={12} />}>
                    PEWNIAK CKE • ANALIZA WYKRESU
                  </Badge>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  Rozwiąż 1 pewniaka z wykresu i poczuj satysfakcję
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Zadanie z oficjalnej puli CKE Formuła 2023. Zobacz, jak działa odczytywanie zbioru wartości:
                </p>
              </div>

              {/* Rysunek wykresu funkcji kwadratowej (SVG) */}
              <div className="bg-[#0E1522]/95 border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center relative shadow-lg">
                <div className="w-full flex items-center justify-between text-[11px] text-slate-400 mb-1 px-1">
                  <span className="font-semibold text-amber-400/90 flex items-center gap-1">
                    <Zap size={13} /> Wierzchołek paraboli: W = (1, -4)
                  </span>
                  <span className="font-mono text-slate-500">Zadanie za 1 pkt</span>
                </div>

                <div className="w-full max-w-[320px] bg-[#070A0F] rounded-xl border border-white/10 p-2 flex items-center justify-center overflow-hidden">
                  <svg 
                    viewBox="0 0 300 170" 
                    className="w-full h-auto select-none"
                    aria-label="Wykres funkcji kwadratowej f z wierzchołkiem w punkcie (1, -4)"
                  >
                    {/* Siatka pomocnicza */}
                    <defs>
                      <pattern id="onboarding-grid" width="28" height="16" patternUnits="userSpaceOnUse">
                        <path d="M 28 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="300" height="170" fill="url(#onboarding-grid)" />

                    {/* Oś OX (y = 90) */}
                    <line x1="20" y1="90" x2="280" y2="90" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
                    <polygon points="280,87 288,90 280,93" fill="rgba(255, 255, 255, 0.6)" />
                    <text x="282" y="82" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="monospace">x</text>

                    {/* Oś OY (x = 120) */}
                    <line x1="120" y1="165" x2="120" y2="12" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
                    <polygon points="117,12 120,4 123,12" fill="rgba(255, 255, 255, 0.6)" />
                    <text x="126" y="15" fill="#94A3B8" fontSize="11" fontWeight="bold" fontFamily="monospace">y</text>

                    {/* Skala na osi OX */}
                    <text x="112" y="103" fill="#64748B" fontSize="9">0</text>
                    <line x1="148" y1="88" x2="148" y2="92" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                    <text x="145" y="103" fill="#94A3B8" fontSize="9">1</text>
                    <line x1="204" y1="88" x2="204" y2="92" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                    <text x="201" y="103" fill="#94A3B8" fontSize="9">3</text>
                    <line x1="92" y1="88" x2="92" y2="92" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                    <text x="85" y="103" fill="#94A3B8" fontSize="9">-1</text>

                    {/* Rzędna wierzchołka y = -4 (Y_pixel = 90 + 4*16 = 154) */}
                    <line x1="117" y1="154" x2="123" y2="154" stroke="#FFB800" strokeWidth="1.5" />
                    <text x="96" y="157" fill="#FFB800" fontSize="10" fontWeight="bold">-4</text>

                    {/* Linie rzutowania do wierzchołka (1, -4) -> (148, 154) */}
                    <line x1="148" y1="90" x2="148" y2="154" stroke="rgba(255, 184, 0, 0.4)" strokeDasharray="3,3" strokeWidth="1" />
                    <line x1="120" y1="154" x2="148" y2="154" stroke="rgba(255, 184, 0, 0.4)" strokeDasharray="3,3" strokeWidth="1" />

                    {/* Parabola: dokładnie od (64, 18) przez (148, 154) do (232, 18) */}
                    <path 
                      d="M 64 18 Q 148 290 232 18" 
                      fill="none" 
                      stroke="#FFB800" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />

                    {/* Punkt wierzchołka W = (1, -4) */}
                    <circle cx="148" cy="154" r="4.5" fill="#FFB800" stroke="#070A0F" strokeWidth="1.5" />
                    <circle cx="148" cy="154" r="8" fill="none" stroke="#FFB800" strokeWidth="1" opacity="0.5" />
                    <text x="156" y="157" fill="#FFB800" fontSize="10" fontWeight="bold">W = (1, -4)</text>

                    {/* Podpis wykresu */}
                    <text x="225" y="40" fill="#FBBF24" fontSize="11" fontWeight="bold">y = f(x)</text>
                  </svg>
                </div>

                <div className="w-full text-center mt-2.5">
                  <span className="text-xs sm:text-sm font-bold text-white">
                    Zbiorem wartości funkcji <InlineMath math="f" /> jest przedział:
                  </span>
                </div>

                {/* 4 Opcje odpowiedzi */}
                <div className="grid grid-cols-2 gap-2 w-full mt-2.5">
                  {[
                    { id: 'A', math: '\\langle -4, +\\infty)', label: 'A', isCorrect: true },
                    { id: 'B', math: '(-4, +\\infty)', label: 'B', isCorrect: false },
                    { id: 'C', math: '(-\\infty, 1\\rangle', label: 'C', isCorrect: false },
                    { id: 'D', math: '\\langle 1, +\\infty)', label: 'D', isCorrect: false }
                  ].map((opt) => {
                    const isSelected = selectedAnswer === opt.id;
                    const isCorrect = opt.isCorrect;

                    let btnStyle = 'bg-white/5 border-white/10 text-white hover:bg-white/10';
                    if (isTaskSolved && isCorrect) {
                      btnStyle =
                        'bg-emerald-500 border-emerald-400 text-emerald-950 shadow-[0_0_25px_rgba(16,185,129,0.7)] scale-[1.02] font-black';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                    }

                    return (
                      <button
                        key={opt.id}
                        id={`onboarding-option-${opt.id}`}
                        disabled={isTaskSolved}
                        onClick={() => handleSelectAnswer(opt.id)}
                        className={`h-12 sm:h-14 rounded-xl border text-sm sm:text-base font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${btnStyle}`}
                      >
                        <span className="text-xs opacity-60 font-mono">{opt.label}.</span>
                        <span>
                          <InlineMath math={opt.math} />
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Podpowiedź przy błędzie (Pułapka CKE) */}
                {showWrongTip && !isTaskSolved && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mt-2.5 p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-200 text-xs flex items-start gap-2 text-left"
                  >
                    <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Pułapka CKE!</strong> Zbiór wartości odczytujemy z osi <strong>OY</strong> (od dołu do góry). Najniższa wartość to <InlineMath math="-4" />. Ponieważ punkt należy do wykresu, nawias musi być <strong>domknięty</strong> <InlineMath math="\\langle" />. Wybierz odpowiedź <strong>A</strong>!
                    </span>
                  </motion.div>
                )}

                {/* Karta sukcesu po poprawnej odpowiedzi */}
                {isTaskSolved && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full mt-2.5 p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl flex items-center justify-between gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  >
                    <div className="flex items-center gap-2 text-left">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                        <Check size={18} strokeWidth={3} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Świetnie! Zbiór wartości to <InlineMath math="\\langle -4, +\\infty)" />.
                        </span>
                        <span className="text-[11px] text-emerald-300">
                          Rozpracowałeś pułapkę CKE na domknięty nawias.
                        </span>
                      </div>
                    </div>
                    <Badge variant="emerald">
                      +15 XP NA START!
                    </Badge>
                  </motion.div>
                )}
              </div>

              <div className="text-center pt-0.5">
                <span className="text-[11px] text-slate-500">
                  {isTaskSolved ? 'Przechodzę do możliwości platformy...' : 'Wybierz poprawną odpowiedź, aby przejść dalej'}
                </span>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* KROK 3: Ekosystem JASNE (Karty Bento & Minimatury)      */}
          {/* ======================================================== */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col gap-3.5 flex-1 justify-between"
            >
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <Badge variant="jasne" icon={<Compass size={12} />}>
                    EKOSYSTEM MATURALNY JASNE
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Wszystko, czego potrzebujesz do matury
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Połączyliśmy autentyczne arkusze CKE, mikronaukę i AI, abyś uczył się bez stresu:
                </p>
              </div>

              {/* 3 Bento Cards */}
              <div className="flex flex-col gap-2.5 my-auto">
                {/* Bento 1: System Mini-matur CKE */}
                <div className="bg-[#0E1522]/90 border border-amber-500/30 rounded-2xl p-3.5 sm:p-4 shadow-[0_4px_15px_rgba(255,184,0,0.08)] relative overflow-hidden">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#FFB800] shrink-0 mt-0.5">
                      <Clock size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          System Mini-matur CKE (20 minut)
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          19:59
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Kompaktowa próba generalna arkusza z oficjalnym stoperem, brudnopisem i natychmiastowym przeliczeniem wyniku procentowego.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bento 2: Baza Wszystkich Zadań CKE */}
                <div className="bg-[#0E1522]/90 border border-sky-500/30 rounded-2xl p-3.5 sm:p-4 shadow-[0_4px_15px_rgba(56,189,248,0.06)] relative overflow-hidden">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                      <BookOpen size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <h4 className="text-sm font-bold text-white">
                          Baza Wszystkich Zadań CKE
                        </h4>
                        <Badge variant="jasne">
                          14 DZIAŁÓW CKE
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Przerobisz oficjalne zadania z arkuszy 2015–2025. Każde zadanie z pigułką Core-4, wzorami z tablic i ostrzeżeniem o pułapce.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bento 3: AI Tutor & Seria Nawykowa */}
                <div className="bg-[#0E1522]/90 border border-emerald-500/30 rounded-2xl p-3.5 sm:p-4 shadow-[0_4px_15px_rgba(16,185,129,0.06)] relative overflow-hidden">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Flame size={20} className="fill-emerald-400 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <h4 className="text-sm font-bold text-white">
                          AI Tutor & Seria Nawykowa
                        </h4>
                        <Badge variant="emerald">
                          ZERO STRESU
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        5–10 minut dziennie wystarczy, by nie zapomnieć wiedzy do maja. AI Tutor natychmiast wyjaśnia błędy, a seria motywuje do systematyczności.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Przycisk dalej */}
              <div className="pt-2">
                <button
                  id="onboarding-step3-continue"
                  onClick={() => {
                    triggerHaptic('medium');
                    setCurrentStep(4);
                  }}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-[#080B11] bg-[#FFB800] hover:bg-[#FFC72C] active:scale-[0.99] transition flex items-center justify-center gap-2 text-base shadow-[0_0_20px_rgba(255,184,0,0.35)]"
                >
                  <span>ZOBACZ JAK WYGLĄDA KOKPIT</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* KROK 4: Interaktywny Przegląd Kokpitu (Anatomia Interfejsu) */}
          {/* ======================================================== */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col gap-3.5 flex-1 justify-between"
            >
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <Badge variant="jasne" icon={<Compass size={12} />}>
                    PRZEGLĄD INTERFEJSU
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Twój kokpit w pigułce
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Dotknij sekcji poniżej, aby podejrzeć najważniejsze strefy aplikacji:
                </p>
              </div>

              {/* Interaktywna makieta kokpitu */}
              <div className="bg-[#0E1522]/90 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
                {/* 4 Zakładki / Hotspoty */}
                <div className="grid grid-cols-2 gap-2">
                  {hotspots.map((hs, idx) => {
                    const Icon = hs.icon;
                    const isActive = activeHotspot === idx;
                    return (
                      <button
                        key={hs.id}
                        onClick={() => {
                          triggerHaptic('light');
                          setActiveHotspot(idx);
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer active:scale-[0.98] ${
                          isActive
                            ? 'border-[#FFB800] bg-[#FFB800]/15 text-white shadow-sm'
                            : 'border-white/5 bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        <div 
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${hs.color}20`, color: hs.color }}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold block truncate leading-tight">
                            {hs.title}
                          </span>
                          <span className="text-[10px] opacity-70 block truncate">
                            {hs.badge}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamiczny podgląd wybranego modułu */}
                <div className="bg-[#070A0F] border border-white/10 rounded-xl p-3.5 min-h-[120px] flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: hotspots[activeHotspot].color }} 
                    />
                    <h4 className="text-sm font-bold text-white">
                      {hotspots[activeHotspot].title}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                      {hotspots[activeHotspot].badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {hotspots[activeHotspot].desc}
                  </p>
                </div>

                {/* Szybka wizualizacja paska akcji w aplikacji */}
                <div className="flex items-center justify-between px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Wszystkie moduły zintegrowane w 1 koncie
                  </span>
                  <span className="text-[#FFB800] font-semibold">Formuła 2023</span>
                </div>
              </div>

              {/* Przycisk dalej */}
              <div className="pt-2">
                <button
                  id="onboarding-step4-continue"
                  onClick={() => {
                    triggerHaptic('medium');
                    setCurrentStep(5);
                  }}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-[#080B11] bg-[#FFB800] hover:bg-[#FFC72C] active:scale-[0.99] transition flex items-center justify-center gap-2 text-base shadow-[0_0_20px_rgba(255,184,0,0.35)]"
                >
                  <span>ODBIERZ SWÓJ PLAN NAUKI</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* KROK 5: Finał & Zabezpieczenie Progresu (Loss Aversion)   */}
          {/* ======================================================== */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3.5 flex-1 items-center text-center justify-between py-1"
            >
              <div>
                <div className="mb-2 flex items-center justify-center">
                  <Badge variant="amber" icon={<Flame size={12} className="fill-amber-400" />}>
                    DZIEŃ 1 SERII ODBLOKOWANY
                  </Badge>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Twój plan nauki z matematyki jest gotowy!
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  Zdobyłeś już pierwsze <strong>15 XP</strong> i odblokowałeś <strong className="text-amber-400">Dzień 1 Serii</strong>.
                </p>
              </div>

              {/* Płomień streaku z animacją pulsu */}
              <div className="relative my-1">
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center shadow-[0_0_45px_rgba(245,158,11,0.55)] border-2 border-white/30 relative z-10"
                >
                  <Flame size={52} className="text-white fill-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                </motion.div>
                <div className="absolute inset-0 bg-amber-500/30 rounded-3xl blur-2xl -z-10 animate-pulse" />
              </div>

              {/* Karta podsumowania startu */}
              <div className="w-full bg-[#0E1522]/90 border border-white/10 rounded-2xl p-3.5 text-left shadow-lg">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-[#FFB800]" />
                    Twój spersonalizowany start:
                  </span>
                  <Badge variant="emerald">
                    MATEMATYKA CKE
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-2.5">
                  <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Cel maturalny</span>
                    <strong className="text-[#FFB800] text-xs block mt-0.5">
                      {targetScore}%
                    </strong>
                  </div>

                  <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Zdobyte XP</span>
                    <strong className="text-emerald-400 text-xs block mt-0.5">
                      +15 XP
                    </strong>
                  </div>

                  <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                    <span className="text-[10px] text-slate-400 block">Seria nauki</span>
                    <strong className="text-amber-400 text-xs block mt-0.5 flex items-center justify-center gap-1">
                      <Flame size={12} className="fill-amber-400" /> Dzień 1
                    </strong>
                  </div>
                </div>

                {/* Komunikat psychologiczny Loss Aversion */}
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-300 leading-relaxed flex items-start gap-2">
                  <Lightbulb size={15} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Utwórz darmowe konto, aby <strong>zabezpieczyć 15 XP</strong>, utrzymać serię i synchronizować postępy między telefonem a komputerem.
                  </span>
                </div>
              </div>

              {/* Przyciski CTA */}
              <div className="w-full flex flex-col gap-2 pt-1">
                <button
                  id="onboarding-save-progress-button"
                  onClick={() => handleFinishOnboarding(true)}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-[#080B11] bg-[#FFB800] hover:bg-[#FFC72C] active:scale-[0.99] transition flex items-center justify-center gap-2 text-base shadow-[0_0_20px_rgba(255,184,0,0.35)]"
                >
                  <LogIn size={18} className="stroke-[2.5]" />
                  <span>ZAPISZ SWÓJ PROGRES (LOGOWANIE)</span>
                </button>

                <button
                  id="onboarding-guest-continue-button"
                  onClick={() => handleFinishOnboarding(false)}
                  className="text-xs text-slate-400 hover:text-slate-200 underline decoration-slate-600 underline-offset-4 transition py-1 cursor-pointer"
                >
                  Przejdź do Dashboardu jako gość
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default OnboardingOverlay;
