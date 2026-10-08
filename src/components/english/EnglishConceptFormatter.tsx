import React, { useMemo } from 'react';
import {
  Zap,
  BookmarkCheck,
  Award,
  Key,
  ShieldAlert,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export function renderFormattedInline(text: string): React.ReactNode {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      const code = part.slice(1, -1);
      return (
        <span
          key={i}
          className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs sm:text-sm font-bold mx-0.5 shadow-sm inline-block break-words break-all max-w-full align-middle"
        >
          {code}
        </span>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      const bold = part.slice(2, -2);
      return (
        <strong key={i} className="text-white font-extrabold tracking-wide break-words">
          {bold}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      const italic = part.slice(1, -1);
      return (
        <span key={i} className="text-amber-200 italic font-medium break-words">
          {italic}
        </span>
      );
    }
    return <span key={i} className="break-words">{part}</span>;
  });
}

export interface EnglishBentoPoint {
  id: string;
  title: string;
  formula?: string | null;
  explanation: string;
  example?: string | null;
  subPoints?: string[];
}

export interface EnglishParsedBento {
  intro: string;
  bentoPoints: EnglishBentoPoint[];
  goldenRule?: string | null;
}

/**
 * Inteligentny parser Pigułki Bento Języka Angielskiego.
 * Przekształca surowy markdown w ustrukturyzowane, czytelne kafelki wiedzy
 * oparte na wzorcu języka polskiego z platformy JASNE (bez ścian tekstu).
 */
export function parseEnglishBentoTheory(content: string): EnglishParsedBento {
  if (!content) {
    return { intro: '', bentoPoints: [], goldenRule: null };
  }

  const lines = content.split('\n');
  const bentoPoints: EnglishBentoPoint[] = [];
  const introLines: string[] = [];
  let goldenRule: string | null = null;

  let currentPoint: EnglishBentoPoint | null = null;
  let pointCounter = 1;
  let inGoldenSection = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    // Nagłówki sekcji: ###
    if (trimmed.startsWith('### ')) {
      if (currentPoint) {
        bentoPoints.push(currentPoint);
        currentPoint = null;
      }
      const headerText = trimmed.replace(/^###\s+/, '').replace(/^\d+\.\s*/, '');
      if (/złota reguła|żelazna reguła|żelazna zasada|gwarancja punktu|pamiętaj/i.test(headerText)) {
        inGoldenSection = true;
        continue;
      } else {
        inGoldenSection = false;
      }

      // Jeśli sekcja dotyczy słów kluczy lub zestawień, twórz dedykowany kafelek Bento
      if (/słowa-klucze|sygnały|łączniki|wskazówki/i.test(headerText)) {
        currentPoint = {
          id: `bento-pt-${pointCounter++}`,
          title: headerText,
          formula: 'Sygnały CKE',
          explanation: '',
          subPoints: []
        };
      }
      continue;
    }

    // Wewnątrz złotej zasady
    if (inGoldenSection) {
      const cleanGolden = trimmed.replace(/^\*\s+/, '');
      goldenRule = goldenRule ? `${goldenRule} ${cleanGolden}` : cleanGolden;
      continue;
    }

    // Wstęp przed pierwszą sekcją / pierwszym punktem
    if (!currentPoint && bentoPoints.length === 0 && !trimmed.startsWith('*')) {
      introLines.push(trimmed);
      continue;
    }

    // Nowy punkt pojęciowy Bento: linia zaczynająca się od "* **"
    const conceptMatch = trimmed.match(/^\*\s+\*\*([^*]+)\*\*:\s*(.*)$/) || trimmed.match(/^\*\s+\*\*([^*]+)\*\*\s*(.*)$/);
    if (conceptMatch) {
      if (currentPoint) {
        bentoPoints.push(currentPoint);
      }

      const rawTitle = conceptMatch[1].trim().replace(/:$/, '').trim();
      let cleanTitle = rawTitle;
      let formula: string | null = null;

      // Wyciągnięcie wzoru lub tagu z nawiasu: np. "Present Perfect (have/has + III forma)" -> "Present Perfect", "have/has + V₃"
      const parenMatch = rawTitle.match(/^([^(]+)\(([^)]+)\)$/);
      if (parenMatch) {
        cleanTitle = parenMatch[1].trim();
        formula = parenMatch[2].trim().replace(/III forma/i, 'V₃');
      }

      let body = conceptMatch[2].trim();
      let example: string | null = null;

      // Wykrycie przykładu w cudzysłowie w nawiasie: np. („I must call my mom”)
      const parenQuoteMatch = body.match(/\(([„"'][^"”']+[”"']?)\)/);
      if (parenQuoteMatch) {
        example = parenQuoteMatch[1].replace(/^[„"']|[”"']$/g, '');
        body = body.replace(/\([„"'][^"”']+[”"']?\)/, '').trim();
      }

      currentPoint = {
        id: `bento-pt-${pointCounter++}`,
        title: cleanTitle,
        formula,
        explanation: body,
        example,
        subPoints: []
      };
      continue;
    }

    // Wewnątrz aktywnego punktu Bento
    if (currentPoint) {
      // Schemat / Wzór
      if (trimmed.includes('Schemat:') || trimmed.includes('Wzór:')) {
        const schemaText = trimmed.replace(/^[\*\s]*\*?(?:Schemat|Wzór):\*?\s*/i, '').trim();
        currentPoint.formula = currentPoint.formula ? `${currentPoint.formula} • ${schemaText}` : schemaText;
        continue;
      }

      // Przykład CKE
      if (trimmed.includes('Przykład:')) {
        const exampleText = trimmed.replace(/^[\*\s]*\*?Przykład:\*?\s*/i, '').trim();
        currentPoint.example = currentPoint.example ? `${currentPoint.example} | ${exampleText}` : exampleText;
        continue;
      }

      // Podpunkty / Słowa klucze
      if (trimmed.startsWith('* ') || trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
        const bulletText = trimmed.replace(/^[\*\•\-]\s+/, '').trim();
        if (!currentPoint.subPoints) currentPoint.subPoints = [];
        currentPoint.subPoints.push(bulletText);
        continue;
      }

      // Dalszy ciąg opisu
      if (!currentPoint.explanation) {
        currentPoint.explanation = trimmed;
      } else {
        currentPoint.explanation += ` ${trimmed}`;
      }
      continue;
    }

    // Luźne punkty przed pierwszym kafelkiem
    if (trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
      introLines.push(trimmed.replace(/^[\*\•]\s+/, ''));
    }
  }

  if (currentPoint) {
    bentoPoints.push(currentPoint);
  }

  // Wyczyść ewentualne cudzysłowy w przykładach
  for (const pt of bentoPoints) {
    if (pt.example) {
      pt.example = pt.example.replace(/^„|”$/g, '').replace(/^"|"$/g, '').trim();
    }
  }

  return {
    intro: introLines.join(' '),
    bentoPoints,
    goldenRule
  };
}

/**
 * Nowoczesny komponent prezentacji wiedzy dla Języka Angielskiego,
 * zgodny z design systemem Nocturne Luminary i wzorcem kart z Języka Polskiego.
 */
export const EnglishConceptFormatter: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  const { intro, bentoPoints, goldenRule } = useMemo(() => parseEnglishBentoTheory(content), [content]);

  return (
    <div className="space-y-4">
      {/* 1. INTRO / SENS ZAGADNIENIA (Wzór z polskiego: lewy akcent #FFB800) */}
      {intro && (
        <section className="p-3.5 sm:p-4 rounded-xl border-l-4 border-l-[#FFB800] border border-white/10 bg-black/40 text-slate-200 text-xs sm:text-sm leading-relaxed shadow-inner min-w-0 overflow-hidden">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
            Wprowadzenie & Sens Zagadnienia CKE:
          </span>
          <div className="text-slate-200 break-words">
            {renderFormattedInline(intro)}
          </div>
        </section>
      )}

      {/* 2. GŁÓWNE FILARY WIEDZY CKE (Bento Grid 2-kolumny – czyste kafelki pojęć) */}
      {bentoPoints.length > 0 && (
        <section className="rounded-2xl p-4 sm:p-5 bg-[#0E1522] border border-emerald-500/20 flex flex-col gap-3.5 shadow-sm min-w-0 overflow-hidden">
          <div className="flex items-center justify-between gap-2 flex-wrap min-w-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 min-w-0">
              <BookmarkCheck size={16} className="text-emerald-400 shrink-0" />
              <span className="truncate">Główne filary wiedzy CKE</span>
            </div>
            <span className="text-[10px] font-medium text-emerald-300/90 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono shrink-0">
              {bentoPoints.length} kluczowe pojęcia
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {bentoPoints.map((point, pIdx) => (
              <div
                key={point.id || pIdx}
                className="rounded-xl p-3.5 sm:p-4 bg-slate-950/70 border border-white/10 flex flex-col justify-between gap-2.5 hover:border-emerald-500/40 transition-colors shadow-sm group min-w-0 overflow-hidden"
              >
                <div className="space-y-2 min-w-0">
                  {/* Górny pasek: Licznik 01, 02 + Tytuł pojęcia + Pigułka formuły */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2 min-w-0">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {String(pIdx + 1).padStart(2, '0')}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight break-words min-w-0">
                        {point.title}
                      </h4>
                    </div>
                    {point.formula && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-300 break-words whitespace-normal max-w-full text-left">
                        {point.formula}
                      </span>
                    )}
                  </div>

                  {/* Zwięzły opis „z polskiego na nasze” */}
                  {point.explanation && (
                    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal break-words">
                      {renderFormattedInline(point.explanation)}
                    </div>
                  )}

                  {/* Podpunkty / Słowa kluczowe */}
                  {point.subPoints && point.subPoints.length > 0 && (
                    <div className="space-y-1.5 pt-1 min-w-0">
                      {point.subPoints.map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                          <div className="flex-1 min-w-0 break-words">{renderFormattedInline(sub)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Przykład maturalny z ikoną Zap (dokładnie jak w polskim) */}
                {point.example && (
                  <div className="mt-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed flex flex-col gap-0.5 min-w-0 overflow-hidden">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
                      <Zap size={11} className="text-emerald-400 shrink-0" />
                      <span>Przykład maturalny:</span>
                    </span>
                    <span className="font-medium text-white italic break-words">
                      „{point.example}”
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. ZŁOTA ZASADA MATURALNA („Z polskiego na nasze”) */}
      {goldenRule && (
        <section className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-[#0E1522] to-amber-500/10 border border-amber-500/40 shadow-[0_4px_20px_rgba(255,184,0,0.1)] flex items-start gap-3 min-w-0 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <Award size={16} />
          </div>
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Złota zasada maturalna („Z polskiego na nasze”)
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed break-words">
              {renderFormattedInline(goldenRule)}
            </p>
          </div>
        </section>
      )}
    </div>
  );
};
