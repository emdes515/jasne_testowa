import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { LoadingSpinner } from '../Loading';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'ok' | 'neutral';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-display font-bold transition-all duration-75 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:shadow-none disabled:translate-y-0 active:translate-y-1 active:shadow-none';

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-[#0A0E18] shadow-[0_4px_0_#B37F00] hover:bg-[#FFC72C] hover:brightness-105',
    secondary: 'bg-surface-card-hover text-text-primary border border-surface-border shadow-[0_4px_0_#10192A] hover:bg-surface-elevated hover:border-white/20 hover:text-white',
    outline: 'bg-transparent text-text-primary border border-white/15 shadow-[0_2px_0_#10192A] hover:border-primary hover:text-primary hover:bg-primary/5',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.06] active:translate-y-0.5',
    destructive: 'bg-[#F43F5E]/15 text-[#FB7185] border border-[#F43F5E]/30 shadow-[0_4px_0_#A62A3F] hover:bg-[#F43F5E]/25 hover:border-[#F43F5E]/50',
    ok: 'bg-[#10B981] text-[#04140E] shadow-[0_4px_0_#0A7D57] hover:brightness-105',
    neutral: 'bg-ink-800 text-ink-050 border-2 border-ink-700 shadow-[0_4px_0_#10192A] hover:bg-ink-850'
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5 min-h-[36px]',
    md: 'px-4 py-2.5 text-sm rounded-xl gap-2 min-h-[44px]',
    lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5 min-h-[52px]',
    icon: 'p-2.5 rounded-xl min-h-[44px] min-w-[44px] justify-center'
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner size="sm" className="shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>
      )}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon && (
        <span className="shrink-0 flex items-center">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
