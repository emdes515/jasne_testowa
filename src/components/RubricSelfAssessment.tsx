import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ListChecks } from 'lucide-react';
import { MathRenderer } from './MathRenderer';
import type { RubricStage } from '../types';

interface RubricSelfAssessmentProps {
  stages: RubricStage[];
  zeroRules?: string[];
  maxPoints: number;
  onConfirm: (points: number) => void;
}

/**
 * Samoocena zadania otwartego etapami z zasad oceniania CKE (bez kosztu AI).
 * Uczeń rozwiązuje na kartce lub tablicy i zaznacza najwyższy etap, który ma w całości.
 */
export function RubricSelfAssessment({ stages, zeroRules, maxPoints, onConfirm }: RubricSelfAssessmentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-primary/10 hover:bg-primary/15 px-4 py-3 text-sm font-bold text-text-accent transition active:scale-[0.99] cursor-pointer"
      >
        <ListChecks size={16} />
        Oceń się etapami CKE (bez AI)
      </button>
    );
  }

  const options = [{ points: 0, label: '0 pkt', criterion: 'Nie mam jeszcze żadnego z etapów poniżej.' }, ...stages];

  return (
    <div className="rounded-2xl border border-hairline bg-surface-card-hover p-4 sm:p-5 space-y-3">
      <div>
        <p className="text-sm font-bold text-text-strong">Oceń się jak egzaminator CKE</p>
        <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
          Zaznacz najwyższy etap, który masz w całości. Punkty za etap obejmują wszystkie wcześniejsze.
        </p>
      </div>

      <div className="space-y-2" role="radiogroup" aria-label="Osiągnięty etap rozwiązania">
        {options.map(stage => {
          const isSelected = selected === stage.points;
          return (
            <button
              key={stage.points}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelected(stage.points)}
              className={`w-full text-left rounded-xl border px-3 py-2.5 transition cursor-pointer ${
                isSelected ? 'border-primary bg-primary/10' : 'border-hairline bg-surface-raised hover:border-primary/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-black ${isSelected ? 'bg-primary text-amber-950' : 'bg-veil text-text-accent'}`}>
                  {stage.points} pkt
                </span>
                <span className="min-w-0 text-xs sm:text-sm leading-relaxed text-text-strong break-words">
                  <MathRenderer content={stage.criterion} />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {zeroRules && zeroRules.length > 0 && (
        <div className="rounded-xl border border-alert-crimson/40 bg-alert-crimson-bg px-3 py-2 space-y-1">
          {zeroRules.map(rule => (
            <p key={rule} className="flex items-start gap-2 text-xs leading-relaxed text-rose-200">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-alert-crimson" />
              <span className="min-w-0 break-words"><MathRenderer content={rule} /></span>
            </p>
          ))}
        </div>
      )}

      <button
        type="button"
        disabled={selected === null}
        onClick={() => selected !== null && onConfirm(selected)}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-jasne hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-3 text-sm font-black text-amber-950 transition active:scale-[0.99] cursor-pointer"
      >
        <CheckCircle2 size={16} />
        {selected === null ? 'Wybierz etap' : `Zatwierdź: ${selected} / ${maxPoints} pkt`}
      </button>
    </div>
  );
}
