import React from 'react';
import { cn } from '../../lib/utils';

export type ProgressBarVariant = 'primary' | 'streak' | 'success' | 'danger' | 'cyan';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  label,
  className,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantStyles: Record<ProgressBarVariant, string> = {
    primary: 'bg-primary shadow-[0_0_12px_rgba(255,184,0,0.35)]',
    streak: 'bg-[#EA580C] shadow-[0_0_12px_rgba(234,88,12,0.35)]',
    success: 'bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.35)]',
    danger: 'bg-[#F43F5E] shadow-[0_0_12px_rgba(244,63,94,0.35)]',
    cyan: 'bg-[#06B6D4] shadow-[0_0_12px_rgba(6,182,212,0.35)]'
  };

  const sizeStyles: Record<ProgressBarSize, string> = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)} {...props}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-xs font-display font-medium text-text-secondary">
          <span>{label || 'Postęp'}</span>
          <span className="font-bold text-text-primary">{Math.round(percentage)}%</span>
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn('w-full bg-white/[0.08] rounded-full overflow-hidden p-0.5', sizeStyles[size])}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-300 ease-out', variantStyles[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';
