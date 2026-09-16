import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  className,
  overlayClassName
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md sm:max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl w-full h-[90vh]'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className={cn('fixed inset-0 bg-black/80 backdrop-blur-md', overlayClassName)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-description' : undefined}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={cn(
              'relative w-full bg-surface-elevated border border-surface-border rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_24px_rgba(255,184,0,0.08)] overflow-hidden flex flex-col max-h-[90vh] z-10',
              sizeClasses[size],
              className
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-4 sm:p-6 pb-3 border-b border-surface-border shrink-0">
                <div className="pr-4 min-w-0">
                  {title && (
                    <h2 id="modal-title" className="font-display font-bold text-lg sm:text-xl text-text-primary truncate">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="modal-description" className="text-xs sm:text-sm text-text-secondary mt-0.5">
                      {description}
                    </p>
                  )}
                </div>

                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 -mr-2 text-text-muted hover:text-text-primary hover:bg-white/[0.08] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                    aria-label="Zamknij okno"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-4 sm:p-6 pt-3 border-t border-surface-border bg-surface-card/50 shrink-0 flex items-center justify-end gap-2.5">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

Modal.displayName = 'Modal';
