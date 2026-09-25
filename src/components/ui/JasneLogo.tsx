import React, { useId } from 'react';
import { motion } from 'motion/react';

export interface JasneLogoProps {
  /**
   * Wariant wyświetlania:
   * - 'icon': sam wektorowy sygnet żarówki w birecie (do favicon, app icon, header, sidebar)
   * - 'full': sygnet + precyzyjny branding typograficzny JASNE.
   * - 'loader': dedykowana animacja ładowania z pulsującym żarnikiem i poświatą neonową
   */
  variant?: 'icon' | 'full' | 'loader';
  /**
   * Rozmiar bazowy (wysokość w pikselach)
   * Domyślnie 40px
   */
  size?: number;
  /**
   * Dodatkowe klasy CSS kontenera
   */
  className?: string;
  /**
   * Czy włączyć świetlistą poświatę (neon glow)
   */
  glow?: boolean;
  /**
   * Tekst podtytułu (widoczny tylko w wariancie 'full')
   * Domyślnie: 'Matura staje się prosta'
   */
  subtext?: string;
  /**
   * Czy ukryć podtytuł na małych ekranach (dla wariantu 'full')
   */
  hideSubtextOnMobile?: boolean;
}

export const JasneLogo: React.FC<JasneLogoProps> = ({
  variant = 'icon',
  size = 40,
  className = '',
  glow = true,
  subtext = 'Matura staje się prosta',
  hideSubtextOnMobile = true
}) => {
  const filterId = useId();
  const isLoader = variant === 'loader';

  // Wymiary SVG: proporcja 100:115
  const svgWidth = size;
  const svgHeight = Math.round(size * 1.15);

  return (
    <div 
      className={`inline-flex items-center gap-3 select-none ${className}`}
      role={isLoader ? "status" : "img"}
      aria-label={isLoader ? "Ładowanie..." : "JASNE. - Logo"}
    >
      {/* KONTENER IKONY SYGNETU */}
      <div 
        className="relative flex items-center justify-center shrink-0"
        style={{ width: svgWidth, height: svgHeight }}
      >
        {/* Tło świetlne (Ambient Glow) */}
        {glow && (
          <div 
            className={`absolute inset-0 bg-[#FFB800]/20 blur-md rounded-full -z-10 transition-opacity duration-300 ${
              isLoader ? 'animate-pulse' : ''
            }`}
          />
        )}

        <svg
          viewBox="0 0 100 115"
          width={svgWidth}
          height={svgHeight}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            {/* Filtr rozmycia gaussowskiego dla poświaty neonowej */}
            <filter id={`jasne-glow-${filterId}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. BIRET AKADEMICKI (Mortarboard Cap) */}
          <polygon
            points="50,14 16,30 50,46 84,30"
            stroke="#DFE2F1"
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="#0B101B"
          />
          {/* Czasza biretu */}
          <path
            d="M32 38 V48 C32 54 68 54 68 48 V38"
            stroke="#DFE2F1"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Chwost (Tassel) - frędzel akademicki */}
          <g>
            <path
              d="M74 35 V48"
              stroke="#FFB800"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="74" cy="48" r="1.5" fill="#FFB800" />
            <path
              d="M71 49 C71 49 74 54 74 57 C74 54 77 49 77 49 Z"
              fill="#FFB800"
            />
          </g>

          {/* 2. SYLWETKA BAŃKI ŻARÓWKI (Bulb Outline) */}
          <path
            d="M33 52 C25 62 25 72 31 82 C35 88 38 92 38 96 H62 C62 92 65 88 69 82 C75 72 75 62 67 52"
            stroke="#DFE2F1"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. GWINT ŻARÓWKI (Screw Thread Base) */}
          <path d="M41 101 H59" stroke="#DFE2F1" strokeWidth="3" strokeLinecap="round" />
          <path d="M43 106 H57" stroke="#DFE2F1" strokeWidth="3" strokeLinecap="round" />
          <path d="M46 111 H54" stroke="#DFE2F1" strokeWidth="3" strokeLinecap="round" />

          {/* 4. ŚWIECĄCY ŻARNIK NEONOWY (Amber Glow Filament) */}
          {isLoader ? (
            <motion.path
              d="M44 84 V68 C44 63 38 63 38 68 C38 74 50 76 50 76 C50 76 62 74 62 68 C62 63 56 63 56 68 V84"
              stroke="#FFB800"
              strokeWidth="3.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#jasne-glow-${filterId})`}
              animate={{
                opacity: [0.45, 1, 0.45],
                strokeWidth: [3.2, 4.2, 3.2],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ) : (
            <path
              d="M44 84 V68 C44 63 38 63 38 68 C38 74 50 76 50 76 C50 76 62 74 62 68 C62 63 56 63 56 68 V84"
              stroke="#FFB800"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#jasne-glow-${filterId})`}
            />
          )}
        </svg>
      </div>

      {/* TYPOGRAFIA DLA WARIANTU FULL */}
      {variant === 'full' && (
        <div className="flex flex-col text-left">
          <span 
            className="font-black tracking-wider text-text-primary leading-none"
            style={{ fontSize: Math.max(16, Math.round(size * 0.55)) }}
          >
            JASNE<span className="text-[#FFB800]">.</span>
          </span>
          {subtext && (
            <span 
              className={`text-[10px] font-bold text-text-muted tracking-wider uppercase mt-1 ${
                hideSubtextOnMobile ? 'hidden sm:inline-block' : 'inline-block'
              }`}
            >
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
