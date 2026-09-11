import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  ShieldAlert, 
  ShieldCheck, 
  Award,
  Target,
  Zap,
  ArrowRight
} from 'lucide-react';
import { PredictorResult } from '../types';
import { triggerHaptic } from '../utils';
import { getSubjectMetaByKey } from '../data/ckeSubjectWeights';

interface PredictorWidgetProps {
  result: PredictorResult;
  currentSubjectKey?: string;
  onOpenDetails: () => void;
  onNavigate?: (tab: string, subTab?: string) => void;
}

// 60fps GPU-friendly animated count-up hook
function useAnimatedCounter(targetValue: number, duration: number = 900): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = 0;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cubic ease out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (targetValue - startValue) * easeOut);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue, duration]);

  return count;
}

export const PredictorWidget: React.FC<PredictorWidgetProps> = ({
  result,
  currentSubjectKey = 'math',
  onOpenDetails,
  onNavigate
}) => {
  const isPol = result.subjectId === 'jezyk-polski' || currentSubjectKey === 'pol';
  const subjectMeta = getSubjectMetaByKey(currentSubjectKey);
  const pointsMissingToPass = Math.max(0, result.passingThresholdPoints - result.predictedPoints);
  const pointsOverPass = Math.max(0, result.predictedPoints - result.passingThresholdPoints);
  const animatedPercent = useAnimatedCounter(result.predictedPercent);

  // Status configuration (no CKE, no sparkles, clear typography)
  const statusConfig = (() => {
    if (!result.isPassing) {
      return {
        badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]',
        glowColor: 'rgba(244, 63, 94, 0.25)',
        ringColor: '#F43F5E',
        gradientId: 'grad-fail',
        gradientStops: ['#F43F5E', '#FB7185'],
        icon: ShieldAlert,
        statusLabel: 'Poniżej progu 30%',
        mobileLabel: `-${pointsMissingToPass.toFixed(1)} pkt`,
        deltaText: `Do zaliczenia (15 pkt): brakuje ${pointsMissingToPass.toFixed(1)} pkt`
      };
    }
    if (result.predictedPercent >= 70) {
      return {
        badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
        glowColor: 'rgba(245, 158, 11, 0.25)',
        ringColor: '#FFB800',
        gradientId: 'grad-high',
        gradientStops: ['#D97706', '#FFB800', '#FDE047'],
        icon: Award,
        statusLabel: 'Wysoki wynik',
        mobileLabel: `${result.predictedPercent}%`,
        deltaText: `Próg zdany! Wynik konkursowy (+${pointsOverPass.toFixed(1)} pkt)`
      };
    }
    return {
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
      glowColor: 'rgba(16, 185, 129, 0.25)',
      ringColor: '#10B981',
      gradientId: 'grad-pass',
      gradientStops: ['#059669', '#10B981', '#34D399'],
      icon: ShieldCheck,
      statusLabel: 'Wynik zdający',
      mobileLabel: `+${pointsOverPass.toFixed(1)} pkt`,
      deltaText: `Próg 30% zaliczony (+${pointsOverPass.toFixed(1)} pkt ponad minimum)`
    };
  })();

  const StatusIcon = statusConfig.icon;

  // Arc calculations (88px box, radius 37)
  const size = 88;
  const strokeWidth = 7;
  const radius = 37;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(1, Math.max(0, result.predictedPercent / 100));
  const strokeDashoffset = circumference - progressRatio * circumference;

  // 30% threshold notch position on the circular ring
  // Gauge starts at -90deg (top). 30% corresponds to -90 + (0.30 * 360) = 18 degrees
  const notchAngleRad = (18 * Math.PI) / 180;
  const notchInnerRadius = radius - 4;
  const notchOuterRadius = radius + 4;
  const notchX1 = center + notchInnerRadius * Math.cos(notchAngleRad);
  const notchY1 = center + notchInnerRadius * Math.sin(notchAngleRad);
  const notchX2 = center + notchOuterRadius * Math.cos(notchAngleRad);
  const notchY2 = center + notchOuterRadius * Math.sin(notchAngleRad);

  // Horizontal milestone bar calculations
  const currentPointsClamped = Math.min(result.totalExamPoints, Math.max(0, result.predictedPoints));
  const pointsPercentOfTotal = (currentPointsClamped / result.totalExamPoints) * 100;
  const passThresholdPercentOfTotal = (result.passingThresholdPoints / result.totalExamPoints) * 100; // 30%

  return (
    <motion.div 
      id="matura-predictor-hero-widget"
      whileTap={{ scale: 0.99 }}
      onClick={() => {
        triggerHaptic('light');
        onOpenDetails();
      }}
      className={`group relative w-full rounded-3xl bg-gradient-to-b from-[#111728]/95 via-[#0C101C]/98 to-[#070A12]/98 border p-4 sm:p-5 shadow-[0_15px_45px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 cursor-pointer mb-3.5 select-none overflow-hidden ${
        isPol 
          ? 'border-rose-500/20 hover:border-rose-500/40 hover:shadow-[0_12px_45px_rgba(244,63,94,0.2)]' 
          : 'border-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_12px_45px_rgba(255,184,0,0.2)]'
      }`}
    >
      {/* Specular Ambient Sweep Line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-sweep transition-opacity duration-500" />
      </div>

      {/* Top Glass Border Reflection */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Ambient Color Glows */}
      <div 
        className="absolute -top-14 -left-14 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-35"
        style={{ backgroundColor: statusConfig.glowColor }}
      />
      <div 
        className="absolute -bottom-14 -right-14 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-15"
        style={{ backgroundColor: isPol ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 184, 0, 0.2)' }}
      />

      {/* 1. HEADER: BRANDING + SUBJECT PILL + COMPACT STATUS */}
      <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
        {/* Left: Branding & Subject */}
        <div className="flex items-center gap-2 min-w-0">
          <span 
            className="w-2 h-2 rounded-full animate-pulse shrink-0 shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: statusConfig.ringColor, color: statusConfig.ringColor }}
          />
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-200 whitespace-nowrap">
              PROGNOZA MATURY
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-slate-300 whitespace-nowrap">
              {subjectMeta.shortName}
            </span>
          </div>
        </div>

        {/* Right: Status Badge */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] sm:text-[11px] font-bold shrink-0 tracking-tight transition-transform group-hover:scale-102 ${statusConfig.badgeBg}`}>
          <StatusIcon size={12} className="shrink-0" />
          <span className="hidden xs:inline sm:inline">{statusConfig.statusLabel}</span>
          <span className="font-extrabold">{statusConfig.mobileLabel}</span>
        </div>
      </div>

      {/* 2. MAIN TELEMETRY ROW: HIGH-TECH CIRCLE + METRICS */}
      <div className="flex items-center gap-3.5 sm:gap-4 relative z-10 mb-3">
        {/* Speedometer Gauge Ring */}
        <div className="relative w-[88px] h-[88px] shrink-0 flex items-center justify-center">
          {/* Radial Backlight behind the ring */}
          <div 
            className="absolute inset-2 rounded-full blur-md opacity-25"
            style={{ backgroundColor: statusConfig.ringColor }}
          />

          <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
            <defs>
              <linearGradient id={statusConfig.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                {statusConfig.gradientStops.map((color, idx) => (
                  <stop 
                    key={color} 
                    offset={`${(idx / (statusConfig.gradientStops.length - 1)) * 100}%`} 
                    stopColor={color} 
                  />
                ))}
              </linearGradient>
            </defs>

            {/* Recessed track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              className="stroke-[#131B2B]"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* 30% Pass Threshold Tick Notch */}
            <line
              x1={notchX1}
              y1={notchY1}
              x2={notchX2}
              y2={notchY2}
              stroke="#FDE047"
              strokeWidth="2.2"
              strokeLinecap="round"
              className="opacity-90 shadow-[0_0_6px_#FDE047]"
            />

            {/* Animated Active Progress Arc */}
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              stroke={`url(#${statusConfig.gradientId})`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              fill="transparent"
              style={{
                filter: `drop-shadow(0 0 6px ${statusConfig.ringColor})`
              }}
            />
          </svg>

          {/* Central Percentage & Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
            <span className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
              {animatedPercent}%
            </span>
            <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5">
              SZACUNEK
            </span>
          </div>
        </div>

        {/* Right Info: Score & Tactical Guidance */}
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-baseline gap-1 text-white">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Stan:</span>
            <span className={`text-xl sm:text-2xl font-black tracking-tight ${isPol ? 'text-rose-400' : 'text-[#FFB800]'}`}>
              {result.predictedPoints}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-400">
              / {result.totalExamPoints} pkt
            </span>
          </div>

          <div className="text-xs text-slate-300 font-medium leading-tight mt-1 truncate">
            {statusConfig.deltaText}
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
              !result.isPassing 
                ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
            }`}>
              {!result.isPassing ? <ShieldAlert size={10} /> : <ShieldCheck size={10} />}
              <span>{result.isPassing ? 'Próg 30% osiągnięty' : 'Wymagane min. 15 pkt'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. VISUAL MILESTONE PROGRESS BAR (0 -> 15 pkt [30%] -> 50 pkt) */}
      <div className="relative z-10 pt-2 pb-1 border-t border-white/5">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1.5 px-0.5">
          <span>0 pkt</span>
          <span className="text-amber-300 font-black flex items-center gap-1">
            <Target size={11} className="text-amber-400" />
            <span>Próg 30% (15 pkt)</span>
          </span>
          <span>{result.totalExamPoints} pkt (100%)</span>
        </div>

        {/* The Track */}
        <div className="relative w-full h-2 rounded-full bg-slate-800/80 overflow-hidden border border-white/5">
          {/* Animated Progress Fill */}
          <motion.div
            className={`h-full rounded-full transition-all duration-1000 ${
              !result.isPassing 
                ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                : result.predictedPercent >= 70
                ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 shadow-[0_0_10px_rgba(255,184,0,0.6)]'
                : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${pointsPercentOfTotal}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* 30% Threshold Marker Line inside track */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-amber-400 z-10 shadow-[0_0_6px_#FCD34D]"
            style={{ left: `${passThresholdPercentOfTotal}%` }}
          />
        </div>
      </div>

      {/* 4. TACTICAL HIGH-ROI ACCELERATOR STRIP */}
      {result.nextBestTopic && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            triggerHaptic('medium');
            if (onNavigate) {
              onNavigate('learn');
            } else {
              onOpenDetails();
            }
          }}
          className="mt-2.5 p-2 sm:p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-amber-500/30 transition-all flex items-center justify-between gap-2 group/tip"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
              <Zap size={13} className="fill-amber-400/30" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none">
                Najszybszy skok punktowy
              </span>
              <span className="text-xs font-bold text-slate-200 truncate block mt-0.5 group-hover/tip:text-amber-300 transition-colors">
                +{result.nextBestTopic.potentialPointGain} pkt w dziale: <strong className="text-white">{result.nextBestTopic.topicName}</strong>
              </span>
            </div>
          </div>

          <span className="text-[11px] font-bold text-amber-400 group-hover/tip:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0 pl-1">
            <span>Trenuj</span>
            <ArrowRight size={12} />
          </span>
        </div>
      )}

      {/* 5. FOOTER: DETAILS PROMPT */}
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/5 text-xs relative z-10">
        <div className="text-[10px] sm:text-[11px] text-slate-400 truncate">
          Próg zdania: <span className="font-bold text-slate-200">15 / 50 pkt (30%)</span>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-slate-300 group-hover:text-white transition-colors shrink-0 ml-2">
          <span>Szczegóły &amp; symulator</span>
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

