import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  hasError,
  leftIcon,
  rightIcon,
  helperText,
  disabled,
  id,
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3.5 pointer-events-none text-text-muted flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={id}
          disabled={disabled}
          className={cn(
            'w-full bg-surface-card border border-surface-border text-text-primary rounded-xl text-sm font-sans placeholder:text-text-muted transition-all duration-200 min-h-[44px]',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
            hasError && 'border-[#F43F5E] focus:border-[#F43F5E] focus:ring-[#F43F5E]/20 text-[#FB7185]',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-bg',
            leftIcon ? 'pl-10 pr-3.5' : 'px-3.5',
            rightIcon ? 'pr-10' : '',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 pointer-events-none text-text-muted flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {helperText && (
        <p className={cn('text-xs', hasError ? 'text-[#FB7185]' : 'text-text-muted')}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
