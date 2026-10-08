import React, { useState, useMemo } from 'react';
import { Zap, Check, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getDuetDataForLesson } from '../../data/english/englishDuetData';
import { playSuccessSound, playErrorSound, triggerHaptic } from '../../utils';

export interface MaturalnyDuetGameProps {
  lessonId: string;
  topicId?: string;
  className?: string;
  onComplete?: () => void;
}

export const MaturalnyDuetGame: React.FC<MaturalnyDuetGameProps> = ({ 
  lessonId, 
  topicId,
  className = '',
  onComplete
}) => {
  const duetData = useMemo(() => getDuetDataForLesson(lessonId, topicId), [lessonId, topicId]);
  const pairs = duetData.pairs;

  const [shuffleSeed, setShuffleSeed] = useState(0);

  const leftItems = useMemo(() => {
    return pairs.map(p => ({ id: p.id, text: p.leftText }));
  }, [pairs]);

  const rightItems = useMemo(() => {
    const items = [...pairs.map(p => ({ id: p.id, text: p.rightText }))];
    // Deterministic shuffle using seed
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.abs(Math.sin((shuffleSeed + 1) * 997 + i * 29)) * (i + 1)) % (i + 1);
      [items[i], items[j]] = [items[j], items[i]];
    }
    // Avoid identical alignment if multiple items
    if (items.length > 1 && items.every((it, idx) => it.id === leftItems[idx].id)) {
      [items[0], items[1]] = [items[1], items[0]];
    }
    return items;
  }, [pairs, shuffleSeed, leftItems]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [errorPair, setErrorPair] = useState<{ left: string; right: string } | null>(null);

  const storageKey = `jasne_duet_completed_${lessonId}`;
  const [isPersistedDone, setIsPersistedDone] = useState<boolean>(() => {
    try {
      return localStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  });

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Correct pair matched!
      const nextMatched = [...matchedIds, leftId];
      setMatchedIds(nextMatched);
      setSelectedLeft(null);
      setSelectedRight(null);
      setErrorPair(null);
      triggerHaptic('light');

      if (nextMatched.length === pairs.length) {
        playSuccessSound();
        try {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.7 }
          });
          localStorage.setItem(storageKey, 'true');
          setIsPersistedDone(true);
          onComplete?.();
        } catch {
          // ignore
        }
      }
    } else {
      // Mismatch
      playErrorSound();
      setErrorPair({ left: leftId, right: rightId });
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setErrorPair(null);
      }, 700);
    }
  };

  const handleSelectLeft = (id: string) => {
    if (matchedIds.includes(id) || errorPair) return;
    if (selectedLeft === id) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(id);
    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleSelectRight = (id: string) => {
    if (matchedIds.includes(id) || errorPair) return;
    if (selectedRight === id) {
      setSelectedRight(null);
      return;
    }
    setSelectedRight(id);
    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const handleReset = () => {
    triggerHaptic('light');
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
    setErrorPair(null);
    setShuffleSeed(prev => prev + 1);
  };

  if (!pairs || pairs.length === 0) {
    return null;
  }

  return (
    <div className={`rounded-2xl border border-[#ffb800]/30 bg-[#0e1522] p-4 sm:p-5 md:p-6 shadow-xl space-y-4 relative overflow-hidden min-w-0 ${className}`}>
      {/* Glow accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffb800]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#141d2e] relative z-10 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#ffb800]/10 border border-[#ffb800]/30 flex items-center justify-center text-[#ffdca1] shrink-0 shadow-sm">
            <Zap className="w-5 h-5 text-[#ffb800]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase text-[#ffdca1] tracking-wider">
                SZYBKI TRENING PEWNIAKA
              </span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20 shrink-0">
                TAP-TO-MATCH ({pairs.length} PARY)
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 break-words">
              Maturalny Duet: Połącz w pary
            </h4>
          </div>
        </div>

        {/* Progress / Status */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {isPersistedDone && (
            <span className="text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              ZALICZONE
            </span>
          )}
          <span className="text-xs font-mono font-bold text-[#94a3b8] bg-[#070a0f] border border-[#141d2e] px-3 py-1 rounded-full">
            Dopasowano: <strong className="text-[#ffdca1]">{matchedIds.length}</strong>/{pairs.length}
          </span>
          {matchedIds.length > 0 && (
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-[#070a0f] hover:bg-[#141d2e] border border-[#141d2e] text-[#94a3b8] hover:text-[#ffdca1] transition-colors cursor-pointer"
              title="Wymieszaj i zagraj ponownie"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed relative z-10 break-words">
        Kliknij sygnał lub zwrot w <strong className="text-[#ffdca1]">Kolumnie A</strong>, a następnie dobierz do niego pasującą regułę lub zastosowanie w <strong className="text-[#ffdca1]">Kolumnie B</strong>.
      </p>

      {/* Plansza dwukolumnowa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 relative z-10 min-w-0">
        {/* Kolumna A: Sygnały */}
        <div className="space-y-2.5 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffdca1] block px-1 truncate">
            KOLUMNA A: SYGNAŁ / STRUKTURA
          </span>
          <div className="space-y-2 min-w-0">
            {leftItems.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedLeft === item.id;
              const isError = errorPair?.left === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleSelectLeft(item.id)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-2.5 min-h-[52px] min-w-0 overflow-hidden cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 opacity-90 cursor-default shadow-sm'
                      : isError
                      ? 'bg-rose-950/60 border border-rose-500 text-rose-200 ring-2 ring-rose-500/40 animate-pulse'
                      : isSelected
                      ? 'bg-[#ffb800]/15 border-2 border-[#ffdca1] text-white ring-2 ring-[#ffb800]/30 shadow-sm'
                      : 'bg-[#070a0f] border border-[#141d2e] hover:border-[#ffdca1]/50 hover:bg-[#121b2b] text-[#dfe2f1]'
                  }`}
                >
                  <span className="leading-snug min-w-0 break-words flex-1">{item.text}</span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kolumna B: Reguły */}
        <div className="space-y-2.5 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffdca1] block px-1 truncate">
            KOLUMNA B: REGUŁA / ZASTOSOWANIE
          </span>
          <div className="space-y-2 min-w-0">
            {rightItems.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedRight === item.id;
              const isError = errorPair?.right === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleSelectRight(item.id)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-2.5 min-h-[52px] min-w-0 overflow-hidden cursor-pointer ${
                    isMatched
                      ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 opacity-90 cursor-default shadow-sm'
                      : isError
                      ? 'bg-rose-950/60 border border-rose-500 text-rose-200 ring-2 ring-rose-500/40 animate-pulse'
                      : isSelected
                      ? 'bg-[#ffb800]/15 border-2 border-[#ffdca1] text-white ring-2 ring-[#ffb800]/30 shadow-sm'
                      : 'bg-[#070a0f] border border-[#141d2e] hover:border-[#ffdca1]/50 hover:bg-[#121b2b] text-[#dfe2f1]'
                  }`}
                >
                  <span className="leading-snug min-w-0 break-words flex-1">{item.text}</span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-400 shrink-0 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
