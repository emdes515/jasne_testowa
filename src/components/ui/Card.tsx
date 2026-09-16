import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export type CardVariant = 'default' | 'interactive' | 'elevated' | 'glass';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  className,
  variant = 'default',
  children,
  ...props
}, ref) => {
  const variantStyles: Record<CardVariant, string> = {
    default: 'bg-surface-card border border-surface-border shadow-sm',
    interactive: 'bg-surface-card border border-surface-border transition-all duration-200 hover:bg-surface-card-hover hover:border-[#FFB800]/35 hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5),0_0_16px_-2px_rgba(255,184,0,0.12)] hover:-translate-y-0.5 cursor-pointer',
    elevated: 'bg-surface-elevated border border-white/[0.12] shadow-xl',
    glass: 'bg-surface-card/90 backdrop-blur-xl border border-surface-border'
  };

  return (
    <div
      ref={ref}
      className={cn('rounded-2xl text-text-primary relative overflow-hidden', variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
});
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-5 pb-3', className)} {...props}>
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({
  className,
  children,
  ...props
}, ref) => (
  <h3 ref={ref} className={cn('font-display font-bold text-base sm:text-lg text-text-primary tracking-tight leading-snug', className)} {...props}>
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({
  className,
  children,
  ...props
}, ref) => (
  <p ref={ref} className={cn('text-xs sm:text-sm text-text-secondary leading-relaxed', className)} {...props}>
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cn('p-5 pt-0', className)} {...props}>
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cn('flex items-center p-5 pt-0', className)} {...props}>
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';
