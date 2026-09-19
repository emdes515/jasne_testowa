import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, Layers, ShieldAlert, BookOpen, BookmarkCheck, ArrowRight } from 'lucide-react';
import { ArgumentBuilderTaskData, PolishArgumentBlock, ArgumentSlotOption } from '../../types';
import { argumentVaultService } from '../../services/argumentVaultService';
import confetti from 'canvas-confetti';

interface ArgumentBuilderProps {
  data: ArgumentBuilderTaskData;
  onComplete: (unlockedBlock: PolishArgumentBlock) => void;
  onMistake: (isFatal: boolean) => void;
}

export const ArgumentBuilder: React.FC<ArgumentBuilderProps> = ({
  data,
  onComplete,
  onMistake,
}) => {
  const [selectedClaim, setSelectedClaim] = useState<ArgumentSlotOption | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<ArgumentSlotOption | null>(null);
  const [selectedContext, setSelectedContext] = useState<ArgumentSlotOption | null>(null);
  const [selectedLink, setSelectedLink] = useState<ArgumentSlotOption | null>(null);

  const [activeTab, setActiveTab] = useState<'T' | 'E' | 'C' | 'L'>('T');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSuccessUnlocked, setIsSuccessUnlocked] = useState<boolean>(false);

  const isAllSelected = Boolean(selectedClaim && selectedEvidence && selectedContext && selectedLink);

  const handleValidateAndSave = () => {
    if (!selectedClaim || !selectedEvidence || !selectedContext || !selectedLink) return;

    const isSlotValid = (slot: ArgumentSlotOption) => slot.isCorrect !== undefined ? slot.isCorrect : (slot.isOptimal ?? false);

    // Check if any slot is marked incorrect
    if (!isSlotValid(selectedClaim)) {
      setValidationError(selectedClaim.trapNote || 'Teza cząstkowa jest nielogiczna lub sprzeczna z wymową dzieła!');
      onMistake(false);
      return;
    }
    if (!isSlotValid(selectedEvidence)) {
      setValidationError(selectedEvidence.trapNote || 'Wybrany dowód fabularny zawiera błąd rzeczowy!');
      onMistake(false);
      return;
    }
    if (!isSlotValid(selectedContext)) {
      setValidationError(selectedContext.trapNote || 'Kontekst jest anachroniczny lub niefunkcjonalny!');
      onMistake(false);
      return;
    }
    if (!isSlotValid(selectedLink)) {
      setValidationError(selectedLink.trapNote || 'Puenta nie łączy się logicznie z tematem pracy!');
      onMistake(false);
      return;
    }

    // Success!
    setValidationError(null);
    setIsSuccessUnlocked(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}

    // Save to Vault
    argumentVaultService.addBlock(data.resultingBlock);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 select-none py-2">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-[#0e1626] border border-amber-500/30 shadow-lg">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wider">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            KLOCKI TEEL • WARSZTAT ROZPRAWKI
          </span>
          <span className="text-xs font-bold text-slate-400">
            {data.workTitle} ({data.character})
          </span>
        </div>
        <h3 className="text-sm sm:text-base font-bold text-white mb-1">
          Temat: „{data.thesisPrompt}”
        </h3>
        <p className="text-xs text-slate-300">
          Wybierz po jednym klocku z każdej kategorii, aby zbudować kompletny argument maturalny za 35 pkt.
        </p>
      </div>

      {/* 4 Step Selector Tabs */}
      <div className="grid grid-cols-4 gap-2">
        {(['T', 'E', 'C', 'L'] as const).map(tab => {
          const labels = {
            T: 'Teza [T]',
            E: 'Dowód [E]',
            C: 'Kontekst [C]',
            L: 'Puenta [L]'
          };
          const isFilled =
            (tab === 'T' && selectedClaim) ||
            (tab === 'E' && selectedEvidence) ||
            (tab === 'C' && selectedContext) ||
            (tab === 'L' && selectedLink);

          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-950/30'
                  : isFilled
                  ? 'bg-slate-900/90 border-emerald-500/60 text-slate-300'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[11px] font-black uppercase ${isActive ? 'text-amber-300' : 'text-slate-400'}`}>
                  {tab}
                </span>
                {isFilled && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <span className="text-xs font-bold truncate text-slate-200">{labels[tab]}</span>
            </button>
          );
        })}
      </div>

      {/* Current Tab Slot Options */}
      <div className="p-4 rounded-2xl bg-[#0e1626]/80 border border-slate-800 flex flex-col gap-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          Wybierz wariant dla: {activeTab === 'T' ? 'Teza cząstkowa' : activeTab === 'E' ? 'Dowód z lektury' : activeTab === 'C' ? 'Kontekst pogłębiający' : 'Puenta i wniosek'}
        </div>

        {activeTab === 'T' &&
          data.claimOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => {
                setSelectedClaim(opt);
                setValidationError(null);
                setActiveTab('E');
              }}
              className={`p-3.5 rounded-xl text-left text-xs sm:text-sm border transition-all ${
                selectedClaim?.id === opt.id
                  ? 'bg-amber-500/20 border-amber-500 text-white font-medium'
                  : 'bg-slate-900/60 border-slate-700 hover:border-slate-600 text-slate-300'
              }`}
            >
              {opt.text}
            </button>
          ))}

        {activeTab === 'E' &&
          data.evidenceOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => {
                setSelectedEvidence(opt);
                setValidationError(null);
                setActiveTab('C');
              }}
              className={`p-3.5 rounded-xl text-left text-xs sm:text-sm border transition-all ${
                selectedEvidence?.id === opt.id
                  ? 'bg-amber-500/20 border-amber-500 text-white font-medium'
                  : 'bg-slate-900/60 border-slate-700 hover:border-slate-600 text-slate-300'
              }`}
            >
              {opt.text}
            </button>
          ))}

        {activeTab === 'C' &&
          data.contextOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => {
                setSelectedContext(opt);
                setValidationError(null);
                setActiveTab('L');
              }}
              className={`p-3.5 rounded-xl text-left text-xs sm:text-sm border transition-all ${
                selectedContext?.id === opt.id
                  ? 'bg-amber-500/20 border-amber-500 text-white font-medium'
                  : 'bg-slate-900/60 border-slate-700 hover:border-slate-600 text-slate-300'
              }`}
            >
              {opt.text}
            </button>
          ))}

        {activeTab === 'L' &&
          data.linkOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => {
                setSelectedLink(opt);
                setValidationError(null);
              }}
              className={`p-3.5 rounded-xl text-left text-xs sm:text-sm border transition-all ${
                selectedLink?.id === opt.id
                  ? 'bg-amber-500/20 border-amber-500 text-white font-medium'
                  : 'bg-slate-900/60 border-slate-700 hover:border-slate-600 text-slate-300'
              }`}
            >
              {opt.text}
            </button>
          ))}
      </div>

      {/* Validation Error Alert */}
      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/60 text-xs sm:text-sm text-rose-200 flex items-start gap-2.5"
          >
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-300 block mb-0.5">Pułapka w klocku:</strong>
              {validationError}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Unlocked Banner */}
      {isSuccessUnlocked ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border-2 border-emerald-500/80 shadow-2xl flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>KLOCEK DODANY DO TWOJEGO SKARBCA ARGUMENTÓW!</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Złożyłeś wzorcowy argument TEEL. Możesz do niego wrócić w dowolnej chwili w Skarbcu lub wyeksportować przed egzaminem.
          </p>

          <button
            onClick={() => onComplete(data.resultingBlock)}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-transform active:scale-95"
          >
            <span>Zakończ i odbierz nagrody sesji</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        /* Action Button */
        <button
          disabled={!isAllSelected}
          onClick={handleValidateAndSave}
          className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
            isAllSelected
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-950/40 active:scale-98 cursor-pointer'
              : 'bg-slate-800/60 border border-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          <BookmarkCheck className="w-5 h-5" />
          <span>{isAllSelected ? 'Złóż i Zapisz Klocek w Skarbcu' : 'Wybierz wszystkie 4 klocki (T, E, C, L)'}</span>
        </button>
      )}
    </div>
  );
};
