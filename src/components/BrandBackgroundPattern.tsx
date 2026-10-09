import React from 'react';
import { JASNE_LOGO_DATA } from './ui/jasneLogoData';

/**
 * BrandBackgroundPattern:
 * Pełna tożsamość wizualna marki "Jasne." według projektu Oskara:
 * 1. Płynne gradienty radialne w tle (ciepły bursztyn + głęboki midnight-blue).
 * 2. Naprzemienny znak wodny SVG: charakterystyczna żarówka JASNE. (#FFB800) oraz sygnatura typograficzna "J.".
 * 3. Zbalansowany kontrast i przezroczystość, by nie rozpraszać podczas nauki, zachowując wyrazisty styl.
 */
export function BrandBackgroundPattern() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
      style={{
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      {/* 1. Dynamiczne poświaty radialne (Warm Amber & Midnight Indigo) */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_15%_15%,rgba(245,158,11,0.07),transparent_50%)]" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_85%_85%,rgba(30,58,138,0.11),transparent_55%)]" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(15,23,42,0.65),transparent_70%)]" />

      {/* 2. Naprzemienny wzór wektorowy logo i sygnatury J. */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.16] dark:opacity-[0.12] transition-opacity duration-300" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <g id="jasne-pattern-bulb">
            <svg 
              viewBox={JASNE_LOGO_DATA.bulb.viewBox} 
              width="44" 
              height="64"
            >
              <path 
                d={JASNE_LOGO_DATA.bulb.path} 
                fill="#FFB800" 
                fillRule="evenodd" 
              />
            </svg>
          </g>

          <pattern 
            id="jasne-alternating-pattern" 
            width="160" 
            height="160" 
            patternUnits="userSpaceOnUse"
          >
            {/* Sam znaczek żarówki */}
            <use 
              href="#jasne-pattern-bulb" 
              x="22" 
              y="10" 
            />

            {/* Sygnatura "J." w pozycji (120, 120) */}
            <text 
              x="120" 
              y="125" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="select-none" 
              fontSize="32" 
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
