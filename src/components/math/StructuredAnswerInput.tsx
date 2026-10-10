import React from 'react';
import { Check, X } from 'lucide-react';
import { MathRenderer } from '../MathRenderer';
import { MathDiagram } from '../MathDiagram';
import { NumberLineDiagram } from '../NumberLineDiagram';
import {
  getAnswerKey,
  getStructuredKind,
  normalizeStructuredAnswer,
  setStructuredSlot,
  toggleMultiChoice
} from '../../lib/structuredAnswer';

export interface StructuredAnswerInputProps {
  task: any;
  /** Odpowiedź w postaci napisu o układzie klucza, np. "P_" albo "BF" */
  value?: string | null;
  onChange: (next: string) => void;
  /** Blokada edycji (po sprawdzeniu / oddaniu arkusza) */
  disabled?: boolean;
  /** Pokazuje poprawność każdej części (po sprawdzeniu) */
  reveal?: boolean;
}

const base = 'rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-1.5 select-none';
const idle = 'bg-[#141d2e]/80 border-white/10 text-[#dfe2f1] hover:border-white/25';
const picked = 'bg-[#ffb800]/15 border-[#ffb800] text-[#ffdca1] shadow-[0_0_14px_rgba(255,184,0,0.15)]';
const good = 'bg-emerald-500/15 border-emerald-500 text-emerald-300';
const bad = 'bg-[rgba(244,63,94,0.12)] border-[#f43f5e] text-[#f43f5e]';
const faded = 'bg-[#0e1522]/60 border-white/5 text-slate-500';

function choiceClass(isSelected: boolean, isCorrect: boolean, reveal: boolean): string {
  if (reveal) return isCorrect ? good : isSelected ? bad : faded;
  return isSelected ? picked : idle;
}

/**
 * Pole odpowiedzi dla zadań zamkniętych w formatach CKE innych niż ABCD:
 * prawda/fałsz dla kilku stwierdzeń, wybór w kilku częściach, wybór kilku odpowiedzi.
 */
export const StructuredAnswerInput: React.FC<StructuredAnswerInputProps> = ({ task, value, onChange, disabled = false, reveal = false }) => {
  const kind = getStructuredKind(task);
  if (!kind) return null;
  const answer = normalizeStructuredAnswer(task, value);
  const key = getAnswerKey(task);
  const locked = disabled || reveal;

  if (kind === 'statements') {
    return (
      <div className="space-y-2.5" data-testid="structured-statements">
        {task.statements.map((stmt: any, idx: number) => {
          const chosen = answer[idx];
          const rowOk = reveal && chosen === key[idx];
          return (
            <div
              key={stmt.id || idx}
              className={`p-3.5 rounded-2xl border flex flex-col gap-3 ${
                reveal ? (rowOk ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-rose-950/20 border-[#f43f5e]/40') : 'bg-[#0e1522] border-white/[0.08]'
              }`}
            >
              <div className="flex gap-2.5 text-sm leading-relaxed text-[#dfe2f1]">
                <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 text-xs font-black flex items-center justify-center shrink-0">{idx + 1}</span>
                <div className="min-w-0 flex-1 overflow-x-auto"><MathRenderer content={stmt.text} /></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['P', 'F'] as const).map(choice => (
                  <button
                    key={choice}
                    type="button"
                    disabled={locked}
                    aria-pressed={chosen === choice}
                    onClick={() => onChange(setStructuredSlot(task, answer, idx, choice))}
                    className={`${base} py-2.5 ${locked ? 'cursor-default' : 'cursor-pointer active:scale-[0.98]'} ${choiceClass(chosen === choice, key[idx] === choice, reveal)}`}
                  >
                    {reveal && key[idx] === choice && <Check size={14} />}
                    {reveal && chosen === choice && key[idx] !== choice && <X size={14} />}
                    <span>{choice === 'P' ? 'P – prawda' : 'F – fałsz'}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (kind === 'parts') {
    return (
      <div className="space-y-4" data-testid="structured-parts">
        {task.parts.map((part: any, idx: number) => (
          <div key={idx} className="space-y-2">
            {part.prompt && (
              <div className="text-xs sm:text-sm font-semibold text-[#d5c4ab] leading-relaxed">
                <MathRenderer content={part.prompt} />
              </div>
            )}
            <div className={`grid gap-2 ${part.options.length > 3 && part.options.every((o: any) => String(o.text).length < 28) ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1'}`}>
              {part.options.map((opt: any) => {
                const id = String(opt.id).toUpperCase();
                const isSelected = answer[idx] === id;
                return (
                  <button
                    key={id}
                    type="button"
                    disabled={locked}
                    aria-pressed={isSelected}
                    onClick={() => onChange(setStructuredSlot(task, answer, idx, id))}
                    className={`${base} px-3 py-2.5 !justify-start text-left font-medium ${locked ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'} ${choiceClass(isSelected, key[idx] === id, reveal)}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-black/30 border border-white/10 text-xs font-black flex items-center justify-center shrink-0">{id}</span>
                    <span className="min-w-0 flex-1 overflow-x-auto"><MathRenderer content={opt.text} /></span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // wybór kilku odpowiedzi
  const limit = Number(task.multiSelect);
  return (
    <div className="space-y-2.5" data-testid="structured-multi">
      <p className="text-xs font-semibold text-[#d5c4ab]">
        Zaznacz {limit === 2 ? 'dwie odpowiedzi' : `${limit} odpowiedzi`} ({answer.length}/{limit}).
      </p>
      {task.options.map((opt: any, idx: number) => {
        const id = String.fromCharCode(65 + idx);
        const isSelected = answer.includes(id);
        const text = typeof opt === 'string' ? opt : opt.text || '';
        return (
          <button
            key={id}
            type="button"
            disabled={locked || (!isSelected && answer.length >= limit)}
            aria-pressed={isSelected}
            onClick={() => onChange(toggleMultiChoice(task, answer, id))}
            className={`${base} w-full px-3.5 py-3 !justify-start text-left font-medium ${locked ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'} ${choiceClass(isSelected, key.includes(id), reveal)} disabled:opacity-60`}
          >
            <span className="w-7 h-7 rounded-lg bg-black/30 border border-white/10 text-xs font-black flex items-center justify-center shrink-0">{id}</span>
            <span className="min-w-0 flex-1 overflow-x-auto">
              {typeof opt === 'object' && opt.numberLine ? <NumberLineDiagram data={opt.numberLine} /> : typeof opt === 'object' && opt.diagram ? <MathDiagram diagram={opt.diagram} /> : <MathRenderer content={text} />}
            </span>
          </button>
        );
      })}
    </div>
  );
};
