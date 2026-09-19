import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ShieldCheck, AlertOctagon, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { CardinalDetectorTaskData, CardinalSnippet } from '../../types';

interface CardinalDetectorProps {
  data: CardinalDetectorTaskData;
  onMistake: (isCardinalPenalty: boolean, snippet: CardinalSnippet) => void;
  onComplete: (result: { success: boolean; defeatedSnippet: CardinalSnippet }) => void;
}

export const CardinalDetector: React.FC<CardinalDetectorProps> = ({
  data,
  onMistake,
  onComplete,
}) => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(null);
  const [shakeSnippetId, setShakeSnippetId] = useState<string | null>(null);
  const [revealedResult, setRevealedResult] = useState<{
    snippet: CardinalSnippet;
    isCorrectHunt: boolean;
  } | null>(null);

  const handleSelectSnippet = (snippet: CardinalSnippet) => {
    if (revealedResult?.isCorrectHunt) return;

    setSelectedSnippetId(snippet.id);

    const isCardinal = Boolean(snippet.isCardinalError ?? snippet.isCardinal);
    if (isCardinal) {
      // Success! User caught the cardinal error
      setRevealedResult({
        snippet,
        isCorrectHunt: true
      });
    } else {
      // High stakes failure! False accusation of safe text (-2 hearts)
      setShakeSnippetId(snippet.id);
      setTimeout(() => setShakeSnippetId(null), 700);

      onMistake(true, snippet); // true = cardinal penalty (-2 hearts)
      setRevealedResult({
        snippet,
        isCorrectHunt: false
      });
    }
  };

  const handleContinue = () => {
    if (revealedResult?.isCorrectHunt) {
      onComplete({
        success: true,
        defeatedSnippet: revealedResult.snippet
      });
    } else {
      // Clear error and let user retry
      setRevealedResult(null);
      setSelectedSnippetId(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 select-none py-2">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-[#0e1626] border border-rose-500/30 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            TRYB REWIZORA CKE • POLOWANIE NA KARDYNAŁA
          </span>
          <span className="text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
            STAWKA: -2 ❤️ ZA POMYŁKĘ!
          </span>
        </div>
        <h3 className="text-sm sm:text-base font-bold text-white mb-1">
          {data.contextTopic}
        </h3>
        <p className="text-xs text-slate-300">
          Kliknij fragment, który zawiera <strong className="text-rose-400">błąd kardynalny</strong> unieważniający całe wypracowanie!
        </p>
      </div>

      {/* Snippet Choice Cards */}
      <div className="flex flex-col gap-3">
        {data.snippets.map((snippet, idx) => {
          const isSelected = selectedSnippetId === snippet.id;
          const isShaking = shakeSnippetId === snippet.id;

          return (
            <motion.div
              key={snippet.id}
              animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
              transition={{ duration: 0.5 }}
              onClick={() => handleSelectSnippet(snippet)}
              className={`p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer relative ${
                isSelected
                  ? snippet.isCardinalError
                    ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/40'
                    : 'bg-slate-900/80 border-rose-500/80'
                  : 'bg-[#0e1626]/90 border-slate-700/80 hover:border-slate-600 hover:bg-[#131d31]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif">
                  „{snippet.text}”
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Revealed Feedback Sheet */}
      <AnimatePresence>
        {revealedResult && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            className={`p-5 rounded-2xl border-2 shadow-2xl ${
              revealedResult.isCorrectHunt
                ? 'bg-emerald-950/40 border-emerald-500/70 shadow-emerald-950/40'
                : 'bg-rose-950/50 border-rose-500/80 shadow-rose-950/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {revealedResult.isCorrectHunt ? (
                <>
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <span className="text-base font-black text-emerald-300 uppercase tracking-wide">
                    🎯 KARDYNAŁ ZNEUTRALIZOWANY! (+40 XP)
                  </span>
                </>
              ) : (
                <>
                  <AlertOctagon className="w-6 h-6 text-rose-500 animate-pulse" />
                  <span className="text-base font-black text-rose-400 uppercase tracking-wide">
                    ⚠️ BŁĄD OCENY! (-2 ❤️ STRACONE)
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-slate-200 mb-3 leading-relaxed">
              {revealedResult.snippet.explanation}
            </p>

            {revealedResult.isCorrectHunt && revealedResult.snippet.safeRevision && (
              <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-xs text-emerald-200 mb-4">
                <span className="font-bold text-emerald-300 block mb-1">
                  🛡️ Jak napisać to bezpiecznie na maturze:
                </span>
                {revealedResult.snippet.safeRevision}
              </div>
            )}

            {!revealedResult.isCorrectHunt && (
              <div className="p-3 bg-rose-950/30 rounded-xl border border-rose-800/40 text-xs text-rose-200 mb-4">
                Wskazany przez Ciebie fragment był w 100% poprawny merytorycznie. Nie trać czujności – szukaj zdania, które całkowicie przeinacza fabułę lub los postaci!
              </div>
            )}

            <button
              onClick={handleContinue}
              className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 ${
                revealedResult.isCorrectHunt
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-900/30'
                  : 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 shadow-rose-900/30'
              }`}
            >
              <span>{revealedResult.isCorrectHunt ? 'Przejdź do Klocków TEEL' : 'Spróbuj ponownie'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CKE Matura Trap Info Pill */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-300">Patent Egzaminatora: </strong>
          {data.ckeWarningTip}
        </div>
      </div>
    </div>
  );
};
