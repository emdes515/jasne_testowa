import React, { useState, useEffect } from 'react';
import { getCleanLogoUrls, subscribeCleanLogo } from '../utils/logoCleaner';

/**
 * BrandBackgroundPattern:
 * Czyste, estetyczne tło tożsamości marki "Jasne.":
 * Naprzemiennie rozmieszczony sam znaczek (żarówka ze wskazanego pliku, BEZ napisu "jasne") oraz sygnatura "J."
 * Wycięty czysto bez poszarpanych krawędzi, z gładką przezroczystością i optymalnym kontrastem.
 */
export function BrandBackgroundPattern() {
  const [logoState, setLogoState] = useState(() => getCleanLogoUrls());

  useEffect(() => {
    return subscribeCleanLogo((res) => {
      setLogoState(res);
    });
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.20] dark:opacity-[0.14] transition-opacity duration-300" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern 
            id="jasne-alternating-pattern" 
            width="160" 
            height="160" 
            patternUnits="userSpaceOnUse"
          >
            {/* 1. TYLKO ZNACZEK (sama żarówka bez napisu "Jasne.") - idealnie wycięty z czystym kanałem alfa */}
            <image 
              href={logoState.bulbOnlyUrl} 
              x="20" 
              y="16" 
              width="48" 
              height="48" 
              preserveAspectRatio="xMidYMid meet" 
            />

            {/* 2. Sygnatura "J." w pozycji (120, 120) naprzemiennie */}
            <text 
              x="120" 
              y="125" 
              textAnchor="middle" 
              dominantBaseline="middle"
              className="select-none" 
              fontSize="30" 
              fontWeight="900"
              fontFamily="Outfit, Inter, system-ui, sans-serif" 
              fill="#FFB800"
              letterSpacing="-0.05em"
              style={{ textShadow: '0 0 1px rgba(245, 158, 11, 0.4)' }}
            >
              J<tspan fill="#F59E0B">.</tspan>
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jasne-alternating-pattern)" />
      </svg>
    </div>
  );
}

export default BrandBackgroundPattern;
