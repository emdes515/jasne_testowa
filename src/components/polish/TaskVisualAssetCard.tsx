import React, { useState, useEffect } from 'react';
import { BookOpen, ImageOff, ZoomIn, X, ShieldCheck } from 'lucide-react';
import { PolishTask } from '../../types/maturaTypes';

interface TaskVisualAssetCardProps {
  task: PolishTask;
  className?: string;
}

export const TaskVisualAssetCard: React.FC<TaskVisualAssetCardProps> = ({ task, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const asset = task.image;
  const rawImageUrl = asset?.imageUrl || task.imageUrl;
  const imageUrl = rawImageUrl;
  const imageCaption = asset?.imageCaption || task.imageCaption;
  const imageAlt = asset?.imageAlt || task.imageAlt || imageCaption || 'Dzieło sztuki maturalnej CKE';
  const fallbackDescription = asset?.fallbackDescription || task.fallbackDescription;
  const sourceDomain = asset?.sourceDomain || 'Domena publiczna • CKE';

  const [currentSrc, setCurrentSrc] = useState<string>(rawImageUrl || '');
  const [retryAttempt, setRetryAttempt] = useState<number>(0);

  // Reset error, retry and zoom state whenever task or image URL changes
  useEffect(() => {
    setHasError(false);
    setIsZoomed(false);
    setCurrentSrc(rawImageUrl || '');
    setRetryAttempt(0);
  }, [task.id, rawImageUrl]);

  const handleImageError = () => {
    if (retryAttempt === 0 && currentSrc.includes('?width=')) {
      // Próba 1: usuń parametr szerokości ?width=1000 (niektóre pliki nie mają wygenerowanego thumbnaila)
      setRetryAttempt(1);
      setCurrentSrc(currentSrc.split('?')[0]);
    } else if (retryAttempt <= 1 && currentSrc.includes('%')) {
      // Próba 2: zdekoduj encje procentowe w URL jeśli były podwójnie kodowane
      setRetryAttempt(2);
      try {
        setCurrentSrc(decodeURI(currentSrc));
      } catch {
        setHasError(true);
      }
    } else {
      setHasError(true);
    }
  };

  if (!rawImageUrl && !imageCaption && !fallbackDescription) {
    return null;
  }

  return (
    <>
      <div
        key={`asset-card-${task.id}`}
        className={`rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-xl transition-all ${className}`}
      >
        {currentSrc && !hasError ? (
          <div className="relative group max-h-[420px] flex items-center justify-center bg-slate-50 dark:bg-slate-950/95 overflow-hidden p-3 select-none">
            <img
              key={`img-${currentSrc}`}
              src={currentSrc}
              alt={imageAlt}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className="max-h-[380px] w-auto max-w-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.01] cursor-zoom-in shadow-md"
              loading="lazy"
              onError={handleImageError}
              onClick={() => setIsZoomed(true)}
              title="Kliknij, aby powiększyć dzieło sztuki"
            />
            {/* Zoom hint badge */}
            <button
              type="button"
              onClick={() => setIsZoomed(true)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/90 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-slate-700/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer shadow-xs"
              title="Powiększ obraz"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-6 text-center space-y-3 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800/80">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 mx-auto">
              {imageUrl && hasError ? (
                <ImageOff className="w-6 h-6" />
              ) : (
                <BookOpen className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                {imageUrl && hasError
                  ? '[Podgląd grafiki niedostępny offline • Tryb awaryjny CKE]'
                  : '[Materiał ikonograficzny CKE]'}
              </div>
              {fallbackDescription && (
                <div className="mt-3 text-xs text-slate-700 dark:text-slate-300 max-w-2xl mx-auto italic leading-relaxed text-left bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold not-italic text-amber-600 dark:text-amber-400 mb-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Szczegółowy opis kompozycji (Fallback dla ucznia):</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">{fallbackDescription}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Metadane i podpis dzieła */}
        {(imageCaption || sourceDomain) && (
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
            {imageCaption && (
              <span className="italic font-medium text-slate-800 dark:text-slate-200">
                {imageCaption}
              </span>
            )}
            {sourceDomain && (
              <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 border border-amber-500/25 font-mono ml-auto">
                <ShieldCheck className="w-3 h-3 text-amber-500 dark:text-amber-400/80" />
                {sourceDomain}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Modal powiększenia obrazu (Deep Inspection View) */}
      {isZoomed && imageUrl && !hasError && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-6xl max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomed(false)}
              className="absolute -top-10 right-0 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 cursor-pointer"
              title="Zamknij podgląd"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={currentSrc}
              alt={imageAlt}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-slate-700"
            />
            {imageCaption && (
              <div className="mt-3 text-center text-xs text-slate-200 font-medium bg-slate-900/90 px-4 py-2 rounded-lg border border-slate-700 max-w-xl">
                {imageCaption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
