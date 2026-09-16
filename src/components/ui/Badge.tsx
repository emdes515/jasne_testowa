import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 
  | 'primary' 
  | 'amber' 
  | 'jasne' 
  | 'secondary' 
  | 'blue' 
  | 'success' 
  | 'emerald' 
  | 'tertiary' 
  | 'danger' 
  | 'crimson' 
  | 'flame' 
  | 'streak' 
  | 'cyan' 
  | 'neutral';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    primary: 'bg-[#FFB800]/12 text-[#FFB800] border-[#FFB800]/30 shadow-[0_0_10px_rgba(255,184,0,0.12)]',
    amber: 'bg-[#FFB800]/12 text-[#FFB800] border-[#FFB800]/30 shadow-[0_0_10px_rgba(255,184,0,0.12)]',
    jasne: 'bg-[#FFB800]/12 text-[#FFB800] border-[#FFB800]/30 shadow-[0_0_10px_rgba(255,184,0,0.12)]',
    secondary: 'bg-[#2563EB]/15 text-[#93C5FD] border-[#2563EB]/35',
    blue: 'bg-[#38BDF8]/12 text-[#38BDF8] border-[#38BDF8]/30',
    success: 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30 shadow-[0_0_10px_rgba(16,185,129,0.12)]',
    emerald: 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30 shadow-[0_0_10px_rgba(16,185,129,0.12)]',
    tertiary: 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30 shadow-[0_0_10px_rgba(16,185,129,0.12)]',
    danger: 'bg-[#F43F5E]/15 text-[#FB7185] border-[#F43F5E]/30 shadow-[0_0_10px_rgba(244,63,94,0.12)]',
    crimson: 'bg-[#F43F5E]/15 text-[#FB7185] border-[#F43F5E]/30 shadow-[0_0_10px_rgba(244,63,94,0.12)]',
    flame: 'bg-[#EA580C]/15 text-[#FB923C] border-[#EA580C]/35 shadow-[0_0_10px_rgba(234,88,12,0.15)]',
    streak: 'bg-[#EA580C]/15 text-[#FB923C] border-[#EA580C]/35 shadow-[0_0_10px_rgba(234,88,12,0.15)]',
    cyan: 'bg-[#06B6D4]/15 text-[#67E8F9] border-[#06B6D4]/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]',
    neutral: 'bg-white/[0.06] text-text-secondary border-white/10'
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px] tracking-[0.05em]',
    md: 'px-2.5 py-1 text-[11px] sm:text-[12px] tracking-[0.04em]'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-display font-bold uppercase whitespace-nowrap select-none backdrop-blur-sm transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      {children && <span>{children}</span>}
    </span>
  );
};

Badge.displayName = 'Badge';
