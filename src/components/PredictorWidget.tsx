import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  ShieldAlert, 
  ShieldCheck, 
  Award
} from 'lucide-react';
import { PredictorResult } from '../types';
import { triggerHaptic } from '../utils';
import { getSubjectMetaByKey } from '../services/ckeCatalogRepository';

interface PredictorWidgetProps {
  result: PredictorResult;
  currentSubjectKey?: string;
  onOpenDetails: () => void;
  onOpenDiagnostic?: () => void;
  onNavigate?: (tab: string, subTab?: string) => void;
}

// 60fps GPU-friendly animated count-up hook
function useAnimatedCounter(targetValue: number, duration: number = 800): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = 0;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
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
  onOpenDiagnostic,
  onNavigate
}) => {
  const isPol = result.subjectId === 'jezyk-polski' || currentSubjectKey === 'pol';
  const subjectMeta = getSubjectMetaByKey(currentSubjectKey);
  const pointsMissingToPass = Math.max(0, result.passingThresholdPoints - result.predictedPoints);
  const pointsOverPass = Math.max(0, result.predictedPoints - result.passingThresholdPoints);
  const animatedPercent = useAnimatedCounter(result.predictedPercent);

  // Status configuration: refined, single-purpose, calm
  const statusConfig = (() => {
    if (!result.isPassing) {
      return {
        badgeClass: 'bg-rose-500/10 border-rose-500/25 text-rose-300',
        ringColor: '#F43F5E',
        gradientId: 'grad-fail',
        gradientStops: ['#F43F5E', '#FB7185'],
        icon: ShieldAlert,
        statusLabel: 'Poniżej progu 30%'
      };
    }
    if (result.predictedPercent >= 70) {
      return {
        badgeClass: 'bg-amber-500/10 border-amber-500/25 text-amber-300',
        ringColor: '#FFB800',
        gradientId: 'grad-high',
        gradientStops: ['#D97706', '#FFB800'],
        icon: Award,
        statusLabel: 'Wysoki wynik'
      };
    }
    return {
      badgeClass: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300',
      ringColor: '#10B981',
      gradientId: 'grad-pass',
      gradientStops: ['#059669', '#10B981'],
      icon: ShieldCheck,
      statusLabel: 'Próg zdany'
    };
  })();

  const StatusIcon = statusConfig.icon;

  // Precision circle calculations (84px box, radius 36)
  const size = 84;
  const strokeWidth = 5.5;
  const radius = 36;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(1, Math.max(0, result.predictedPercent / 100));
  const strokeDashoffset = circumference - progressRatio * circumference;

  // Milestone bar calculations
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
      className={`group relative w-full rounded-3xl bg-surface-card/95 border p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 cursor-pointer mb-3.5 select-none overflow-hidden ${
        isPol 
          ? 'border-rose-500/20 hover:border-rose-500/40' 
          : 'border-surface-border hover:border-primary/40'
      }`}
    >
      {/* Top Glass Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

      {/* 1. HEADER: BRANDING + CALM STATUS PILL */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span 
            className="w-2 h-2 rounded-full animate-pulse shrink-0 shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: statusConfig.ringColor, color: statusConfig.ringColor }}
          />
          <span className="text-xs font-bold tracking-wider text-text-secondary uppercase whitespace-nowrap">
            Prognoza Matury
          </span>
          <span className="hidden sm:inline-flex text-[11px] font-semibold text-text-muted px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.05] whitespace-nowrap">
            {subjectMeta.shortName}
          </span>
        </div>

        {/* Single Refined Status Pill */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold shrink-0 whitespace-nowrap ${statusConfig.badgeClass}`}>
          <StatusIcon size={12} className="shrink-0" />
          <span>{statusConfig.statusLabel}</span>
        </div>
      </div>

      {/* 2. HERO ROW: PRECISION DIAL + SCORE */}
      <div className="flex items-center gap-4 relative z-10 mb-4">
        {/* Precision Circle Dial */}
        <div className="relative w-[84px] h-[84px] shrink-0 flex items-center justify-center">
          {/* Ambient Glow behind ring */}
          <div 
            className="absolute inset-2 rounded-full blur-md opacity-20 pointer-events-none"
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

            {/* Subtle recessed track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              className="stroke-white/[0.08]"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Active progress arc */}
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              stroke={`url(#${statusConfig.gradientId})`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              fill="transparent"
              style={{
                filter: `drop-shadow(0 0 6px ${statusConfig.ringColor})`
              }}
            />
          </svg>

          {/* Center Metric */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
            <span className="font-display text-3xl font-black text-text-primary tracking-tight tabular-nums leading-none">
              {animatedPercent}%
            </span>
            <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider mt-1">
              PROGNOZA
            </span>
          </div>
        </div>

        {/* Right Info: Clean Score & Sentence */}
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl sm:text-4xl font-black text-text-primary tracking-tight tabular-nums leading-none">
              {result.predictedPoints}
            </span>
            <span className="text-text-muted font-medium text-sm">
              / {result.totalExamPoints} pkt
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed mt-1.5">
            {!result.isPassing ? (
              <>
                Do zdania matury ({result.passingThresholdPoints} pkt) brakuje Ci{' '}
                <strong className="text-rose-300 font-bold">{pointsMissingToPass.toFixed(1)} pkt</strong>.
              </>
            ) : (
              <>
                Wynik powyżej progu 30%. Zapas nad progiem zdania:{' '}
                <strong className="text-emerald-300 font-bold">+{pointsOverPass.toFixed(1)} pkt</strong>.
              </>
            )}
          </p>
        </div>
      </div>

      {/* 3. HORIZONTAL MILESTONE TRACK (0 -> 15 pkt [30%] -> 50 pkt) */}
      <div className="relative z-10 pt-3 pb-1 border-t border-white/[0.06]">
        {/* Milestone Labels */}
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-1.5 px-0.5">
          <span>0 pkt</span>
          <span className="text-amber-400/90 font-semibold flex items-center gap-1 whitespace-nowrap">
            Próg zdania: {result.passingThresholdPoints} pkt (30%)
          </span>
          <span>{result.totalExamPoints} pkt max</span>
        </div>

        {/* The Track */}
        <div className="relative w-full h-2 rounded-full bg-white/[0.06] overflow-hidden border border-white/[0.04]">
          {/* Animated Progress Fill */}
          <motion.div
            className={`h-full rounded-full transition-all ${
              !result.isPassing 
                ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                : result.predictedPercent >= 70
                ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 shadow-[0_0_8px_rgba(255,184,0,0.5)]'
                : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${pointsPercentOfTotal}%` }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* 30% Pass Threshold Tick Line */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-amber-400/80 z-10 shadow-[0_0_4px_#FCD34D]"
            style={{ left: `${passThresholdPercentOfTotal}%` }}
          />
        </div>
      </div>

      {/* 4. FOOTER: QUIET CALCULATION PROMPT */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-border text-xs relative z-10">
        <span className="text-[11px] text-text-muted">
          Kalibracja modelu CKE
        </span>

        <div className="flex items-center gap-1 text-xs font-semibold text-text-secondary group-hover:text-primary transition-colors shrink-0 ml-2">
          <span>Szczegóły kalkulacji</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};


