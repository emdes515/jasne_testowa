import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { TOAST_EVENT, ToastPayload } from '../lib/toast';
import { triggerHaptic } from '../utils';

const TONE_STYLES: Record<ToastPayload['tone'], { icon: typeof Info; iconClass: string; borderClass: string }> = {
  info: { icon: Info, iconClass: 'text-primary', borderClass: 'border-primary/40' },
  success: { icon: CheckCircle2, iconClass: 'text-emerald-400', borderClass: 'border-emerald-500/40' },
  warning: { icon: AlertTriangle, iconClass: 'text-amber-400', borderClass: 'border-amber-500/40' },
};

/** Jedno miejsce wyświetlania komunikatów z showToast() – montowane raz w App. */
export function ToastHost() {
  const [toast, setToast] = useState<ToastPayload | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const detail = (event as CustomEvent<ToastPayload>).detail;
      if (!detail?.message) return;
      triggerHaptic(detail.tone === 'warning' ? 'medium' : 'light');
      setToast(detail);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setToast(null), 3200);
    };
    window.addEventListener(TOAST_EVENT, handleToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, handleToast);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const tone = toast ? TONE_STYLES[toast.tone] : null;
  const Icon = tone?.icon;

  return (
    <div
      className="fixed inset-x-0 top-[calc(4.25rem+env(safe-area-inset-top,0px))] z-[200] flex justify-center px-4 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence>
        {toast && tone && Icon && (
          <motion.div
            key={toast.message}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            onClick={() => setToast(null)}
            className={`pointer-events-auto max-w-sm w-full flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-surface-elevated border ${tone.borderClass} shadow-[0_12px_32px_rgba(0,0,0,0.45)] cursor-pointer`}
          >
            <Icon size={18} className={`${tone.iconClass} shrink-0 mt-0.5`} aria-hidden="true" />
            <span className="text-sm font-semibold text-text-primary leading-snug">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
