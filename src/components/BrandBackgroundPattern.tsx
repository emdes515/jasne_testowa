import React from 'react';

/**
 * BrandBackgroundPattern:
 * Czyste, estetyczne tło tożsamości marki "Jasne.":
 * Naprzemiennie rozmieszczony sam znaczek (żarówka ze wskazanego pliku, BEZ napisu "jasne") oraz sygnatura "J."
 * Wycięty czysto bez poszarpanych krawędzi, z gładką przezroczystością i optymalnym kontrastem.
 */
export function BrandBackgroundPattern() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#070A0F]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,184,0,0.035),transparent)]" />
    </div>
  );
}

export default BrandBackgroundPattern;
