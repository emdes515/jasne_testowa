import React, { useId } from 'react';
import { motion } from 'motion/react';
import { JASNE_LOGO_DATA } from './jasneLogoData';

export interface JasneLogoProps {
  /**
   * Wariant wyświetlania:
   * - 'icon': sam wektorowy sygnet żarówki z mózgiem i gwintem
   * - 'horizontal': żarówka obok napisu Jasne. (pozioma kompozycja do headerów)
   * - 'vertical' | 'full': pełne logo pionowe (żarówka nad napisem Jasne., dokładnie jak w pliku marki)
   * - 'loader': animowany wektor ładowania z pulsującą neonową poświatą
   */
  variant?: 'icon' | 'horizontal' | 'vertical' | 'full' | 'loader';
  /**
   * Rozmiar bazowy (wysokość w pikselach lub token Tailwind)
   * Domyślnie 40px
   */
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Dodatkowe klasy CSS kontenera
   */
  className?: string;
  /**
   * Czy włączyć świetlistą poświatę (neon glow)
   */
  glow?: boolean;
  /**
   * Kolor wiodący logo (domyślnie złocisty bursztyn #FFB800)
   */
  color?: string;
  /**
   * Tekst podtytułu (widoczny w wariancie 'full' / 'vertical' / 'horizontal')
   * Domyślnie dla full: 'Matura staje się prosta'
   */
  subtext?: string;
  /**
   * Czy ukryć podtytuł na małych ekranach
   */
  hideSubtextOnMobile?: boolean;
  /**
   * Opcjonalna funkcja obsługi kliknięcia
   */
  onClick?: () => void;
}

const SIZE_MAP: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72
};

export const JasneLogo: React.FC<JasneLogoProps> = ({
  variant = 'icon',
  size = 40,
  className = '',
  glow = true,
  color = '#FFB800',
  subtext,
  hideSubtextOnMobile = true,
  onClick
}) => {
  const filterId = useId();
  const isLoader = variant === 'loader';

  // Rozstrzygnięcie rozmiaru liczbowego
  const numericHeight = typeof size === 'number' ? size : SIZE_MAP[size] || 40;

  // 1. WARIANT: ICON (lub LOADER)
  if (variant === 'icon' || variant === 'loader') {
    const bulbAspect = JASNE_LOGO_DATA.bulb.width / JASNE_LOGO_DATA.bulb.height;
    const bulbWidth = Math.round(numericHeight * bulbAspect);

    return (
      <div 
        className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
        style={{ width: bulbWidth, height: numericHeight }}
        role={isLoader ? "status" : "img"}
        aria-label={isLoader ? "Ładowanie..." : "JASNE."}
        onClick={onClick}
      >
        {/* Tło świetlne (Ambient Amber Glow) */}
        {glow && (
          <div 
            className={`absolute inset-0 bg-[#FFB800]/25 blur-md rounded-full -z-10 transition-opacity duration-300 pointer-events-none ${
              isLoader ? 'animate-pulse' : ''
            }`}
          />
        )}

        <svg
          viewBox={JASNE_LOGO_DATA.bulb.viewBox}
          width={bulbWidth}
          height={numericHeight}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            <filter id={`jasne-glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {isLoader ? (
            <motion.path
              d={JASNE_LOGO_DATA.bulb.path}
              fill={color}
              fillRule="evenodd"
              filter={`url(#jasne-glow-${filterId})`}
              animate={{
                opacity: [0.55, 1, 0.55],
                scale: [0.97, 1.02, 0.97],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: 'center' }}
            />
          ) : (
            <path
              d={JASNE_LOGO_DATA.bulb.path}
              fill={color}
              fillRule="evenodd"
              filter={glow ? `url(#jasne-glow-${filterId})` : undefined}
            />
          )}
        </svg>
      </div>
    );
  }

  // 2. WARIANT: HORIZONTAL (Żarówka z lewej + "Jasne." z prawej)
  if (variant === 'horizontal') {
    const { width: origW, height: origH } = JASNE_LOGO_DATA.horizontal;
    const hAspect = origW / origH;
    const totalWidth = Math.round(numericHeight * hAspect);

    return (
      <div 
        className={`relative inline-flex items-center gap-2.5 select-none shrink-0 ${className}`}
        role="img"
        aria-label="JASNE. - Matura staje się prosta"
        onClick={onClick}
      >
        {glow && (
          <div 
            className="absolute left-0 top-0 w-10 h-10 bg-[#FFB800]/20 blur-md rounded-full -z-10 pointer-events-none"
          />
        )}

        <svg
          viewBox={JASNE_LOGO_DATA.horizontal.viewBox}
          width={totalWidth}
          height={numericHeight}
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <g transform={`scale(${JASNE_LOGO_DATA.horizontal.bulbScale})`}>
            <path d={JASNE_LOGO_DATA.bulb.path} fillRule="evenodd" />
          </g>
          <g 
            transform={`translate(${JASNE_LOGO_DATA.horizontal.textOffsetX}, ${JASNE_LOGO_DATA.horizontal.textOffsetY}) scale(${JASNE_LOGO_DATA.horizontal.textScale})`}
          >
            <path d={JASNE_LOGO_DATA.text.path} fillRule="evenodd" />
          </g>
        </svg>

        {subtext && (
          <span 
            className={`text-[10px] font-bold text-text-muted tracking-wider uppercase ml-1 ${
              hideSubtextOnMobile ? 'hidden sm:inline-block' : 'inline-block'
            }`}
          >
            {subtext}
          </span>
        )}
      </div>
    );
  }

  // 3. WARIANT: VERTICAL / FULL (Pionowy układ: żarówka nad napisem Jasne.)
  const fullAspect = JASNE_LOGO_DATA.full.width / JASNE_LOGO_DATA.full.height;
  const fullWidth = Math.round(numericHeight * fullAspect);

  return (
    <div 
      className={`inline-flex flex-col items-center justify-center select-none group shrink-0 ${className}`}
      role="img"
      aria-label="JASNE. - Logo"
      onClick={onClick}
    >
      <div 
        className="relative flex items-center justify-center"
        style={{ width: fullWidth, height: numericHeight }}
      >
        {glow && (
          <div 
            className="absolute inset-0 bg-[#FFB800]/20 blur-lg rounded-full -z-10 pointer-events-none"
          />
        )}

        <svg
          viewBox={JASNE_LOGO_DATA.full.viewBox}
          width={fullWidth}
          height={numericHeight}
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            <filter id={`jasne-full-glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path 
            d={JASNE_LOGO_DATA.full.path} 
            fillRule="evenodd" 
            filter={glow ? `url(#jasne-full-glow-${filterId})` : undefined}
          />
        </svg>
      </div>

      {subtext && (
        <span 
          className={`text-[11px] font-bold text-text-muted tracking-wider uppercase mt-2 text-center ${
            hideSubtextOnMobile ? 'hidden sm:inline-block' : 'inline-block'
          }`}
        >
          {subtext}
        </span>
      )}
    </div>
  );
};

export default JasneLogo;
