import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useId } from 'react';
import { JasneLogo } from './ui/JasneLogo';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  className = '',
  color = '#FFB800'
}: LoadingSpinnerProps) {
  const gradientId = useId();

  const sizeConfig = {
    sm: { dimension: 20, stroke: 2.5, radius: 7, centerDot: 3 },
    md: { dimension: 36, stroke: 3, radius: 13, centerDot: 4 },
    lg: { dimension: 56, stroke: 3.5, radius: 21, centerDot: 6 },
    xl: { dimension: 72, stroke: 4, radius: 28, centerDot: 8 },
  };

  const { dimension, stroke, radius, centerDot } = sizeConfig[size] || sizeConfig.md;
  const circumference = 2 * Math.PI * radius;
  // Arc length: ~65% of circumference
  const strokeDashoffset = circumference * 0.35;

  return (
    <div 
      role="status" 
      aria-label="Ładowanie..." 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      <motion.svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        className="overflow-visible"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="60%" stopColor={color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Faint track circle */}
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeOpacity="0.12"
        />

        {/* Dynamic orbital arc with smooth kinetic gradient */}
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </motion.svg>

      {/* Luminary core glow pulse */}
      {size !== 'sm' && (
        <motion.div
          animate={{
            scale: [0.85, 1.2, 0.85],
            opacity: [0.35, 0.85, 0.35]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: centerDot,
            height: centerDot,
            backgroundColor: color,
            boxShadow: `0 0 ${centerDot * 2}px ${color}`
          }}
        />
      )}
    </div>
  );
}

export interface JasneLogoLoaderProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export function JasneLogoLoader({
  size = 56,
  className = '',
  glow = true
}: JasneLogoLoaderProps) {
  return (
    <div 
      role="status"
      aria-label="Ładowanie..."
      className={`relative flex items-center justify-center p-3 rounded-3xl bg-white/[0.02] border border-white/5 shadow-[0_0_30px_rgba(255,184,0,0.12)] ${className}`}
    >
      <JasneLogo variant="loader" size={size} glow={glow} />
    </div>
  );
}

export function LoadingScreen({ 
  message = "Wczytywanie danych...",
  subtext,
  useBrandLogo = true
}: { 
  message?: string;
  subtext?: string;
  useBrandLogo?: boolean;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0E18]"
    >
      {/* Ethereal ambient warm glow */}
      <div className="absolute w-72 h-72 rounded-full bg-[#FFB800]/10 blur-[80px] pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        {useBrandLogo ? (
          <JasneLogoLoader size={60} />
        ) : (
          <div className="relative p-3 rounded-full bg-white/[0.02] border border-white/5 shadow-[0_0_30px_rgba(255,184,0,0.08)]">
            <LoadingSpinner size="lg" />
          </div>
        )}
        
        <div className="flex flex-col items-center text-center gap-1.5">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/80 font-display font-bold tracking-[0.22em] text-xs uppercase"
          >
            {message}
          </motion.div>
          {subtext && (
            <p className="text-white/40 text-[11px] font-medium tracking-wide">
              {subtext}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// A wrapper for async content that might load within a page section
export function AsyncContent({ 
  isLoading, 
  children, 
  fallbackMessage,
  className = ""
}: { 
  isLoading: boolean; 
  children: ReactNode;
  fallbackMessage?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full flex flex-col flex-1 h-full min-h-[140px] ${className}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#0A0E18]/70 backdrop-blur-md rounded-[28px] border border-white/5"
          >
            <LoadingSpinner size="md" />
            {fallbackMessage && (
              <motion.div 
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-4 text-[#FFB800]/80 text-[11px] font-bold uppercase tracking-widest text-center px-4"
              >
                {fallbackMessage}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`transition-opacity duration-300 flex-1 flex flex-col h-full ${isLoading ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
}

