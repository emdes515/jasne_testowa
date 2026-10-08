import React from 'react';

/**
 * BrandBackgroundPattern:
 * Czyste, estetyczne tło tożsamości marki "Jasne." w standardzie Nocturne Luminary:
 * Subtelna poświata ambientowa zoptymalizowana sprzętowo, eliminująca rozpraszające znaki wodne.
 */
export function BrandBackgroundPattern() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#070A0F]"
      aria-hidden="true"
      style={{
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        contain: 'strict'
      }}
    >
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,184,0,0.035),transparent)]" />
    </div>
  );
}
