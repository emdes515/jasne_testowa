import React, { useState, useEffect } from 'react';
import { getCleanLogoUrls, subscribeCleanLogo } from '../utils/logoCleaner';

interface JasneLogoProps {
  variant?: 'icon' | 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export function JasneLogo({
  variant = 'horizontal',
  size = 'md',
  className = '',
}: JasneLogoProps) {
  const [logoState, setLogoState] = useState(() => getCleanLogoUrls());

  useEffect(() => {
    return subscribeCleanLogo((res) => {
      setLogoState(res);
    });
  }, []);

  // Rozmiary dla pełnego logo ze wskazanego pliku graficznego (powiększone i wyraźne)
  const fullSizes = {
    xs: 'h-9 w-auto',
    sm: 'h-13 w-auto',
    md: 'h-18 w-auto',
    lg: 'h-24 w-auto',
    xl: 'h-32 w-auto'
  };

  // Rozmiary dla ikony (sama żarówka z oficjalnego pliku graficznego)
  const iconSizes = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  if (variant === 'icon') {
    return (
      <div 
        className={`relative inline-flex items-center justify-center shrink-0 ${iconSizes[size]} ${className}`}
        title="Jasne."
      >
        <img
          src={logoState.bulbOnlyUrl || '/logo-transparent.png'}
          alt="Jasne."
          className="w-full h-full object-contain select-none pointer-events-none drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center group select-none ${className}`}>
      <img
        src={logoState.fullLogoUrl || '/logo-transparent.png'}
        alt="Jasne."
        className={`${fullSizes[size]} object-contain select-none pointer-events-none transition-transform duration-200 group-hover:scale-105 drop-shadow-sm`}
      />
    </div>
  );
}

export default JasneLogo;
