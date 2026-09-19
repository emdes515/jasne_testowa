import React, { useState, useEffect, useRef } from 'react';
import { 
  Swords, 
  Trophy, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Bell, 
  BellRing,
  Ticket, 
  Terminal, 
  Cpu, 
  GraduationCap, 
  FileText, 
  Flame,
  Radio,
  Layers,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { UserState, TabState } from '../types';
import { triggerHaptic, playSuccessSound } from '../utils';

interface ArenaViewProps {
  userState?: UserState;
  onUpdateUserState?: (updater: (prev: UserState) => UserState) => void;
  saveUserData?: (newState: UserState) => void;
  onNavigate?: (tab: TabState) => void;
}

// Math tokens for ambient matrix background
const MATH_GLYPHS = [
  '\\Delta > 0',
  '\\lim_{x \\to 0}',
  '\\int f(x)dx',
  '\\sin^2\\alpha + \\cos^2\\alpha = 1',
  'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}',
  'a^2 + b^2 = c^2',
  '\\pi \\approx 3{,}14',
  'f\'(x_0)',
  '2^x = 8 \\Rightarrow x = 3',
  '\\log_a (x \\cdot y)',
  'V = \\frac{1}{3}P_p \\cdot H',
  'P(A) = \\frac{|A|}{|\\Omega|}'
];

interface RadarBlip {
  id: string;
  name: string;
  rating: number;
  angle: number; // in degrees
  dist: number; // 0 to 1
  label: string;
}

const RADAR_BLIPS: RadarBlip[] = [
  { id: 'b1', name: 'Maksymilian_W', rating: 1480, angle: 35, dist: 0.65, label: 'Gotowy' },
  { id: 'b2', name: 'Julia_K', rating: 1620, angle: 120, dist: 0.78, label: 'Szuka 1v1' },
  { id: 'b3', name: 'Tymon_Matura', rating: 1390, angle: 215, dist: 0.52, label: 'W kolejce' },
  { id: 'b4', name: 'Zuzia_Liceum', rating: 1540, angle: 300, dist: 0.85, label: 'Gotowa' }
];

export function ArenaView({ userState, onUpdateUserState, saveUserData, onNavigate }: ArenaViewProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Ticket claim state (persisted locally)
  const [hasClaimedTicket, setHasClaimedTicket] = useState<boolean>(() => {
    try {
      return localStorage.getItem('maturaquest_arena_ticket_claimed') === 'true';
    } catch {
      return false;
    }
  });

  const [ticketNumber, setTicketNumber] = useState<string>(() => {
    try {
      return localStorage.getItem('maturaquest_arena_ticket_no') || 'JASNE-2025-0842';
    } catch {
      return 'JASNE-2025-0842';
    }
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('maturaquest_arena_notify') === 'true';
    } catch {
      return true;
    }
  });

  const [activeBlip, setActiveBlip] = useState<RadarBlip | null>(null);

  // Background Interactive Canvas for Matrix Math & Emerald Dust
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      text?: string;
      isGlyph: boolean;
    }

    const particles: Particle[] = [];
    const count = Math.min(30, Math.floor(width / 40));

    for (let i = 0; i < count; i++) {
      const isGlyph = i % 4 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.4,
        size: isGlyph ? 11 : 1 + Math.random() * 2,
        alpha: 0.15 + Math.random() * 0.35,
        text: isGlyph ? MATH_GLYPHS[Math.floor(Math.random() * MATH_GLYPHS.length)] : undefined,
        isGlyph
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        if (p.isGlyph && p.text) {
          ctx.font = '11px "JetBrains Mono", monospace';
          ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha * 0.75})`;
          ctx.fillText(p.text, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#10B981';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClaimTicket = () => {
    triggerHaptic('success');
    playSuccessSound();

    const randomNum = `JASNE-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNumber(randomNum);
    setHasClaimedTicket(true);

    try {
      localStorage.setItem('maturaquest_arena_ticket_claimed', 'true');
      localStorage.setItem('maturaquest_arena_ticket_no', randomNum);
      localStorage.setItem('maturaquest_arena_notify', 'true');
    } catch {}

    // Bonus perks update if available
    if (onUpdateUserState) {
      onUpdateUserState((prev) => {
        const nextTokens = (prev.masteryTokens || 0) + 100;
        const nextShields = (prev.perks?.arenaShields || 0) + 1;
        const updated = {
          ...prev,
          masteryTokens: nextTokens,
          perks: {
            ...prev.perks,
            arenaShields: nextShields
          }
        };
        if (saveUserData) saveUserData(updated);
        return updated;
      });
    }

    // Emerald confetti explosion
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#34D399', '#059669', '#6EE7B7', '#FFB800']
    });
  };

  const handleToggleNotifications = () => {
    triggerHaptic('light');
    setNotificationsEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('maturaquest_arena_notify', String(next));
      } catch {}
      return next;
    });
  };

  const userRating = userState?.arenaRating || 1000;
  const userShields = userState?.perks?.arenaShields || 0;
  const userTokens = userState?.masteryTokens || 0;

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden bg-surface-bg text-text-primary flex flex-col items-center justify-start pb-24">
      {/* Background canvas with drifting emerald math matrix */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-70"
      />

      {/* Emerald Atmospheric Glow Blooms */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-emerald-500/20 via-emerald-600/10 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[300px] bg-teal-500/10 blur-[100px] pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 pt-6 sm:pt-10 flex flex-col items-center">
        
        {/* =========================================================================
            1. TOP SYSTEM TELEMETRY BADGE
           ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold tracking-wide uppercase text-[11px]">Arena 2.0 • Tryb Multiplayer Live</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-xs font-mono">
            <Terminal size={12} className="text-emerald-400" />
            <span>Silnik: Real-time WebSocket CKE</span>
          </div>
        </motion.div>

        {/* =========================================================================
            2. THE CYBER-RADAR HERO ANIMATION (Zielona interaktywna animacja)
           ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative my-4 sm:my-8 flex items-center justify-center"
        >
          {/* Outer Ambient Glow Disc */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-emerald-500/15 blur-[60px] pointer-events-none" />

          {/* Sonar Ping Waves (radiating outward) */}
          <div className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full border border-emerald-500/30 animate-ping pointer-events-none [animation-duration:3.5s]" />
          <div className="absolute w-52 sm:w-64 h-52 sm:h-64 rounded-full border border-emerald-400/20 animate-ping pointer-events-none [animation-duration:4.5s] [animation-delay:1.2s]" />

          {/* Radar Frame (Outer Ring) */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-emerald-500/30 bg-[#0B1218]/80 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.18)] flex items-center justify-center">
            
            {/* Concentric Coordinate Rings */}
            <div className="absolute inset-4 sm:inset-6 rounded-full border border-dashed border-emerald-500/20 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-12 sm:inset-16 rounded-full border border-emerald-500/25" />
            <div className="absolute inset-20 sm:inset-28 rounded-full border border-dashed border-emerald-400/30 animate-[spin_40s_linear_infinite_reverse]" />

            {/* Radar Crosshairs */}
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent pointer-events-none" />
            <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent pointer-events-none" />

            {/* Angle Markers */}
            <span className="absolute top-2 text-[9px] font-mono text-emerald-400/60 font-bold">000°</span>
            <span className="absolute right-2 text-[9px] font-mono text-emerald-400/60 font-bold">090°</span>
            <span className="absolute bottom-2 text-[9px] font-mono text-emerald-400/60 font-bold">180°</span>
            <span className="absolute left-2 text-[9px] font-mono text-emerald-400/60 font-bold">270°</span>

            {/* Radar Sweep Beam (Conic Gradient rotating 360deg) */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div 
                className="w-full h-full rounded-full animate-[spin_4s_linear_infinite]"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.4) 0deg, rgba(16, 185, 129, 0.08) 45deg, transparent 60deg)'
                }}
              />
            </div>

            {/* Simulated Contender Radar Blips */}
            {RADAR_BLIPS.map((blip) => {
              const rad = (blip.angle * Math.PI) / 180;
              const radiusPx = (blip.dist * 160); // approx based on size
              const x = Math.cos(rad) * radiusPx;
              const y = Math.sin(rad) * radiusPx;

              return (
                <div
                  key={blip.id}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  onMouseEnter={() => setActiveBlip(blip)}
                  onMouseLeave={() => setActiveBlip(null)}
                  className="absolute z-20 group cursor-pointer"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute h-3 w-3 rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] border border-white/40" />
                  </div>

                  {/* Blip Hover Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#091014] border border-emerald-500/40 px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap shadow-xl z-30">
                    <span className="text-emerald-300 font-bold">{blip.name}</span>
                    <span className="text-slate-400 ml-1.5 font-sans">({blip.rating} ELO)</span>
                  </div>
                </div>
              );
            })}

            {/* Central Stage: Crossed Swords Core */}
            <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#064E3B]/80 via-[#022c22]/90 to-[#031510] border-2 border-emerald-400/60 p-1 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.5)] group hover:scale-105 transition-transform duration-300">
              <div className="relative flex items-center justify-center">
                <Swords size={38} className="text-emerald-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                <Zap size={16} className="text-teal-200 absolute -top-2 -right-2 animate-bounce" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-300 mt-1">
                SEZON 1
              </span>
            </div>
          </div>
        </motion.div>

        {/* Radar Telemetry Subtitle */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-xl px-2"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400/90 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-lg mb-3">
            <Radio size={13} className="text-emerald-400 animate-pulse" />
            <span>Radar aktywacji: Wyszukiwanie rywali w całej Polsce...</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-3">
            Szybkie starcia 1v1 na żywo.{' '}
            <span className="text-emerald-400 font-black">
              Dostępne wkrótce!
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Wyłączyliśmy testową wersję z botami, aby dać Ci <strong>prawdziwy tryb rywalizacji</strong>. 
            Przenosimy pojedynki na zsynchronizowany w milisekundach silnik multiplayer z ligami ELO i pewniakami z arkuszy CKE.
          </p>
        </motion.div>

        {/* =========================================================================
            3. PROGRESS & TELEMETRY TERMINAL (Wskaźnik wdrożenia)
           ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-2xl bg-[#0C131B]/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl backdrop-blur-md"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Postęp wdrożenia silnika 1v1
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                88% UKOŃCZONE
              </span>
              <span className="text-[11px] text-slate-400">Ostatnia prosta przed premierą</span>
            </div>
          </div>

          {/* Progress Bar with glowing shimmer */}
          <div className="w-full h-3 bg-[#061014] rounded-full overflow-hidden p-0.5 border border-emerald-500/20 mb-3">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300 relative shadow-[0_0_12px_rgba(52,211,153,0.7)] transition-all duration-1000"
              style={{ width: '88%' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
            </div>
          </div>

          {/* Quick checklist pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
              <span className="truncate">Zegar CKE: 100%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
              <span className="truncate">Baza Zadań: 100%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
              <span className="truncate">Ligi ELO: 100%</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/30 text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="truncate font-bold">Stresstesty 1v1</span>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            4. BILET WCZESNEGO DOSTĘPU (Interactive Season 1 Pass)
           ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-2xl mb-10"
        >
          {!hasClaimedTicket ? (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/60 via-[#0B1515] to-[#070D12] border-2 border-emerald-500/40 p-5 sm:p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Ticket size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                      Darmowy Bilet Sezonu 1
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full font-bold border border-emerald-500/30">
                      VIP
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base sm:text-lg mb-1">
                    Odbierz darmowy bilet przedpremierowy
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                    Zarezerwuj unikalny numer zawodnika. Otrzymasz <strong>+100 Żetonów Mistrzostwa</strong> i dodatkową <strong>Tarczę ELO</strong> w dniu oficjalnego otwarcia Areny!
                  </p>
                </div>
              </div>

              <button
                id="claim-arena-ticket-btn"
                onClick={handleClaimTicket}
                className="w-full sm:w-auto shrink-0 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-black text-sm tracking-wide shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap size={16} />
                <span>Odbierz Bilet (+100 Żetonów)</span>
              </button>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#06261E]/90 via-[#0B1A17] to-[#071210] border-2 border-emerald-400/60 p-5 sm:p-6 shadow-[0_0_35px_rgba(16,185,129,0.25)] flex flex-col sm:flex-row items-center justify-between gap-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-black flex items-center justify-center shrink-0 font-black shadow-[0_0_20px_rgba(52,211,153,0.8)]">
                  <CheckCircle2 size={26} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-mono font-black uppercase text-emerald-400 tracking-wider">
                      Twój Bilet Jest Aktywny:
                    </span>
                    <span className="font-mono text-xs font-black bg-black/50 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                      {ticketNumber}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base">
                    Jesteś na liście pierwszeństwa Sezonu 1!
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-emerald-200/80">
                    <span className="bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                      💰 +100 Żetonów w Skarbcu
                    </span>
                    <span className="bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                      🛡️ +1 Tarcza ELO
                    </span>
                    <span className="bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded">
                      🎖️ Tytuł: Pionier Areny 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* Notification toggle button */}
              <button
                onClick={handleToggleNotifications}
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  notificationsEnabled
                    ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {notificationsEnabled ? (
                  <>
                    <BellRing size={14} className="text-emerald-400" />
                    <span>Powiadomienia: Włączone</span>
                  </>
                ) : (
                  <>
                    <Bell size={14} />
                    <span>Włącz powiadomienie</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* =========================================================================
            5. SNEAK PEEK: CO POJAWI SIĘ W ARENIE 2.0? (3 kolumny)
           ========================================================================= */}
        <div className="w-full max-w-4xl mb-12">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              Zapowiedź Nowego Modułu
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
              Czego możesz się spodziewać w pełnej wersji?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="rounded-2xl bg-surface-card/90 border border-emerald-500/20 p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-lg">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                  <Zap size={20} />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-black uppercase text-emerald-400 bg-emerald-950/60 px-2 py-0.2 rounded border border-emerald-500/20">
                    Czas: 60 sekund
                  </span>
                </div>
                <h3 className="font-display font-bold text-text-primary text-base mb-2">
                  Starcia Blitz 1v1
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  3 dynamiczne rundy zadań zamkniętych CKE. Oboje widzicie to samo zadanie w tym samym momencie. 
                  Szybka kalkulacja i bezbłędna intuicja dają przewagę.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-surface-card/90 border border-teal-500/20 p-5 flex flex-col justify-between hover:border-teal-500/40 transition-colors shadow-lg">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-300 flex items-center justify-center mb-4">
                  <Trophy size={20} />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-black uppercase text-teal-300 bg-teal-950/60 px-2 py-0.2 rounded border border-teal-500/20">
                    5 Lig ELO
                  </span>
                </div>
                <h3 className="font-display font-bold text-text-primary text-base mb-2">
                  System Rankingowy ELO
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Od Ligi Brązowej po elitarny Diament. Matchmaking dobierze rywala o zbliżonym poziomie. 
                  Za awans do wyższej ligi otrzymasz unikalne tytuły na profilu i mnożniki XP.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-surface-card/90 border border-primary/20 p-5 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-lg">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 text-primary flex items-center justify-center mb-4">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-black uppercase text-primary bg-primary/10 px-2 py-0.2 rounded border border-primary/20">
                    Ochrona Skarbca
                  </span>
                </div>
                <h3 className="font-display font-bold text-text-primary text-base mb-2">
                  Tarcze Straty ELO
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Twoje Tarcze ELO ze Skarbca chronią Twój dorobek. Nawet przy gorszym dniu lub trudnym zadaniu 
                  nie stracisz punktów rankingowych. Pełne bezpieczeństwo i motywacja.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            6. USER'S PRESERVED STATS & TRAINING CTAs
           ========================================================================= */}
        <div className="w-full max-w-3xl bg-surface-card border border-surface-border rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs text-text-muted font-mono">Twój stan konta do Sezonu 1:</span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1">
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                <Trophy size={14} className="text-amber-400" />
                <span className="text-xs text-slate-300 font-bold">ELO:</span>
                <span className="text-sm font-black text-amber-400 font-display">{userRating}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                <ShieldCheck size={14} className="text-sky-400" />
                <span className="text-xs text-slate-300 font-bold">Tarcze:</span>
                <span className="text-sm font-black text-sky-400 font-display">{userShields}x</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                <Zap size={14} className="text-emerald-400" />
                <span className="text-xs text-slate-300 font-bold">Żetony:</span>
                <span className="text-sm font-black text-emerald-400 font-display">{userTokens}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {onNavigate && (
              <>
                <button
                  id="arena-goto-learn-btn"
                  onClick={() => {
                    triggerHaptic('light');
                    onNavigate('nauka');
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <GraduationCap size={15} className="text-[#FFB800]" />
                  <span>Trenuj w Mapie Wiedzy</span>
                </button>

                <button
                  id="arena-goto-matura-btn"
                  onClick={() => {
                    triggerHaptic('light');
                    onNavigate('simulator');
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  <FileText size={15} className="text-emerald-400" />
                  <span>Arkusz Maturalny</span>
                  <ArrowRight size={14} />
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
