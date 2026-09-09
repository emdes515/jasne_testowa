import React from 'react';

export type BadgeVariant = 'cyan' | 'amber' | 'emerald' | 'jasne' | 'blue';
export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Standardowy system odznak aplikacji JASNE.:
 * - Półprzezroczyste ciemne tło
 * - Subtelna ramka 1px
 * - Pełna pastylka (rounded-full)
 * - Mikro-typografia (11-12px, pogrubiona, wielkie litery, brak łamania wierszy)
 * - Warianty:
 *    - jasne / cyan: Główny akcent Solar Amber (#FFB800)
 *    - blue: Pomocniczy błękit (#38BDF8)
 *    - amber: Waga zadania i seria
 *    - emerald: Statusy zaliczenia (np. ZALICZONE 100%)
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'jasne',
  size = 'md',
  children,
  icon,
  className = '',
  id
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    jasne: 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30 shadow-[0_0_12px_rgba(255,184,0,0.12)]',
    cyan: 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30 shadow-[0_0_12px_rgba(255,184,0,0.12)]',
    amber: 'bg-amber-400/10 text-amber-300 border-amber-400/30 shadow-[0_0_12px_rgba(251,191,36,0.12)]',
    emerald: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30 shadow-[0_0_12px_rgba(52,211,153,0.12)]',
    blue: 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30 shadow-[0_0_12px_rgba(56,189,248,0.12)]'
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-[12px]'
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold uppercase tracking-wider whitespace-nowrap select-none backdrop-blur-sm ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0 flex items-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
