import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  HelpCircle,
  Scale
} from 'lucide-react';
import { SynthesisCondenserTaskData, SynthesisElementOption } from '../../types';
import confetti from 'canvas-confetti';

interface SynthesisCondenserProps {
  data: SynthesisCondenserTaskData;
  onMistake: () => void;
  onComplete: (score: number, maxScore: number) => void;
}

export const SynthesisCondenser: React.FC<SynthesisCondenserProps> = ({
  data,
  onMistake,
  onComplete,
}) => {
  const [activeTextTab, setActiveTextTab] = useState<number>(0);
  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    feedbackTitle: string;
    feedbackMessage: string;
    points: { content: number; cohesion: number; language: number; total: number };
  } | null>(null);

  const selectedElements = data.availableElements.filter(el => selectedElementIds.includes(el.id));
  
  // Obliczanie zsyntezowanego tekstu i liczby słów
  const synthesizedText = selectedElements.map(el => el.text).join(' ');
  const wordCount = synthesizedText.trim().length > 0 ? synthesizedText.trim().split(/\s+/).length : 0;
  const minWords = data.minWords || 60;
  const maxWords = data.maxWords || 90;
  const isWordCountOptimal = wordCount >= minWords && wordCount <= maxWords;

  const toggleElement = (el: SynthesisElementOption) => {
    if (validationResult?.success) return;
    setValidationResult(null);

    setSelectedElementIds(prev => 
      prev.includes(el.id) ? prev.filter(id => id !== el.id) : [...prev, el.id]
    );
  };

  const handleVerifySynthesis = () => {
    if (selectedElements.length === 0) {
      setValidationResult({
        success: false,
        feedbackTitle: 'Brak wybranych twierdzeń',
        feedbackMessage: 'Wybierz kluczowe wnioski syntetyzujące oba teksty źródłowe.',
        points: { content: 0, cohesion: 0, language: 0, total: 0 }
      });
      return;
    }

    // 1. Sprawdzenie pułapki subiektywizmu (w CKE bezwzględnie 0 pkt za treść)
    const subjectiveTrap = selectedElements.find(el => el.isSubjectiveTrap);
    if (subjectiveTrap) {
      onMistake();
      setValidationResult({
        success: false,
        feedbackTitle: 'Pułapka CKE: Subiektywizm i własna ocena!',
        feedbackMessage: subjectiveTrap.explanation || 'Notatka syntetyzująca musi być w 100% obiektywnym uogólnieniem. Używanie zwrotów wartościujących lub własnych opinii ("moim zdaniem", "uważam, że") skutkuje zerowaniem punktów!',
        points: { content: 0, cohesion: 1, language: 1, total: 2 }
      });
      return;
    }

    // 2. Sprawdzenie jednostronności (nieuwzględnienie obu tekstów)
    const oneSidedTrap = selectedElements.find(el => el.isOneSided);
    if (oneSidedTrap) {
      onMistake();
      setValidationResult({
        success: false,
        feedbackTitle: 'Pułapka CKE: Brak syntezy obu tekstów!',
        feedbackMessage: oneSidedTrap.explanation || 'Wybrane stwierdzenie odnosi się wyłącznie do jednego tekstu zamiast dokonać uogólnienia łączącego obie perspektywy.',
        points: { content: 1, cohesion: 1, language: 1, total: 3 }
      });
      return;
    }

    // 3. Sprawdzenie czy wybrano wszystkie kluczowe elementy syntezy
    const keyElements = data.availableElements.filter(el => el.isKeySynthesis);
    const missingKey = keyElements.some(el => !selectedElementIds.includes(el.id));
    if (missingKey) {
      onMistake();
      setValidationResult({
        success: false,
        feedbackTitle: 'Niepełna synteza materiału',
        feedbackMessage: 'W twojej notatce brakuje kluczowego uogólnienia łączącego stanowiska autorów wokół zadanego tematu.',
        points: { content: 1, cohesion: 1, language: 1, total: 3 }
      });
      return;
    }

    // 4. Sprawdzenie limitu słów
    if (wordCount < minWords) {
      onMistake();
      setValidationResult({
        success: false,
        feedbackTitle: 'Za mało słów (< 60 słów)',
        feedbackMessage: `Twoja notatka liczy ${wordCount} słów. Egzaminator CKE wymaga minimum 60 słów. Rozwiń syntezę o wspólny wniosek.`,
        points: { content: 2, cohesion: 1, language: 0, total: 3 }
      });
      return;
    }

    if (wordCount > maxWords) {
      onMistake();
      setValidationResult({
        success: false,
        feedbackTitle: 'Przekroczony limit słów (> 90 słów)',
        feedbackMessage: `Twoja notatka liczy ${wordCount} słów (limit to 90). Zgodnie z zasadami CKE powyżej 90 słów odejmowany jest punkt za poprawność! Skróć tekst.`,
        points: { content: 2, cohesion: 1, language: 0, total: 3 }
      });
      return;
    }

    // SUKCES: 4/4 PKT CKE
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#F43F5E', '#FFB800', '#10B981']
      });
    } catch (e) {}

    setValidationResult({
      success: true,
      feedbackTitle: 'Perfekcyjna Notatka Syntetyzująca (4/4 pkt CKE)!',
      feedbackMessage: 'Wzorowe połączenie obu tekstów, pełna obiektywność, idealna spójność logiczna oraz bezbłędne zmieszczenie się w rygorze 60–90 słów.',
      points: { content: 2, cohesion: 1, language: 1, total: 4 }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 text-slate-100">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/40 via-surface-card to-amber-950/20 border border-rose-500/20 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <Scale size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                Arkusz 1, cz. 1 • 4 pkt CKE
              </span>
              <span className="text-xs text-slate-400">Limit: 60–90 słów</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-200 mt-0.5">
              Mistrz Notatki Syntetyzującej
            </h3>
          </div>
        </div>

        {/* Word count pill */}
        <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 border ${
          wordCount === 0 
            ? 'bg-slate-800/80 border-slate-700 text-slate-400' 
            : isWordCountOptimal 
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
              : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
        }`}>
          <span>{wordCount}</span>
          <span className="text-[10px] opacity-70">/ 60–90 słów</span>
        </div>
      </div>

      {/* Matura Task Prompt */}
      <div className="bg-surface-card border border-white/5 rounded-xl p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          <HelpCircle size={14} className="text-rose-400" />
          Polecenie maturalne CKE:
        </div>
        <p className="text-sm text-slate-200 font-medium leading-relaxed">
          {data.topic}
        </p>
      </div>

      {/* Source Texts Tabs */}
      {data.sourceTexts && data.sourceTexts.length > 0 && (
        <div className="bg-surface-card border border-white/5 rounded-xl overflow-hidden">
          <div className="flex border-b border-white/5 bg-slate-900/50">
            {data.sourceTexts.map((st, idx) => (
              <button
                key={st.id || idx}
                onClick={() => setActiveTextTab(idx)}
                className={`flex-1 px-4 py-2.5 text-xs font-semibold text-left transition-colors flex items-center gap-2 border-b-2 ${
                  activeTextTab === idx 
                    ? 'border-rose-500 text-rose-300 bg-rose-500/5' 
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <BookOpen size={14} className={activeTextTab === idx ? 'text-rose-400' : 'text-slate-500'} />
                <span className="truncate">Tekst {idx + 1}: {st.author}</span>
              </button>
            ))}
          </div>
          
          <div className="p-4 max-h-48 overflow-y-auto custom-scrollbar text-xs text-slate-300 leading-relaxed italic bg-slate-950/30">
            <div className="font-bold not-italic text-slate-400 mb-1.5 text-[11px]">
              {data.sourceTexts[activeTextTab]?.author}: „{data.sourceTexts[activeTextTab]?.workTitle}” (fragment)
            </div>
            {data.sourceTexts[activeTextTab]?.excerpt}
          </div>
        </div>
      )}

      {/* Available Blocks Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
          <span className="flex items-center gap-1.5">
            <Layers size={14} className="text-rose-400" />
            Wybierz klocki syntezy do swojej notatki:
          </span>
          <span className="text-[11px] text-slate-400">Odrzuć subiektywne opinie i dygresje</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {data.availableElements.map((el) => {
            const isSelected = selectedElementIds.includes(el.id);
            return (
              <button
                key={el.id}
                onClick={() => toggleElement(el)}
                className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-rose-500/10 border-rose-500/50 text-slate-100 shadow-sm'
                    : 'bg-surface-card border-white/5 text-slate-300 hover:border-white/20 hover:bg-slate-800/40'
                }`}
              >
                <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                  isSelected ? 'bg-rose-500 border-rose-500 text-white' : 'border-slate-600 bg-slate-900/60'
                }`}>
                  {isSelected && <CheckCircle2 size={12} />}
                </div>
                <div className="flex-1">
                  <span>{el.text}</span>
                  {el.isSubjectiveTrap && isSelected && (
                    <div className="mt-1 text-[11px] text-amber-400 flex items-center gap-1">
                      <AlertTriangle size={12} />
                      <span>Zawiera opinię lub sąd wartościujący (pułapka CKE)</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Synthesis Preview */}
      {selectedElements.length > 0 && (
        <div className="bg-slate-900/60 border border-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <FileText size={14} className="text-rose-400" />
              Podgląd Twojej notatki:
            </span>
            <span className={isWordCountOptimal ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
              {wordCount} słów {isWordCountOptimal ? '✓' : '(cel: 60–90)'}
            </span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed italic bg-surface-card p-3 rounded-lg border border-white/5">
            „{synthesizedText}”
          </p>
        </div>
      )}

      {/* Validation Feedback Card */}
      <AnimatePresence>
        {validationResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-xl border ${
              validationResult.success 
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 font-bold text-sm">
                {validationResult.success ? (
                  <CheckCircle2 size={18} className="text-emerald-400" />
                ) : (
                  <AlertTriangle size={18} className="text-rose-400" />
                )}
                <span>{validationResult.feedbackTitle}</span>
              </div>
              <span className="text-xs font-mono font-bold bg-white/5 px-2 py-0.5 rounded">
                Wynik: {validationResult.points.total} / 4 pkt CKE
              </span>
            </div>
            <p className="text-xs opacity-90 leading-relaxed mb-3">
              {validationResult.feedbackMessage}
            </p>

            {validationResult.success ? (
              <button
                onClick={() => onComplete(validationResult.points.total, 4)}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span>Przejdź dalej (+40 XP)</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => setValidationResult(null)}
                className="text-xs underline text-rose-300 hover:text-white transition-colors"
              >
                Popraw dobór klocków i spróbuj ponownie
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      {!validationResult?.success && (
        <button
          onClick={handleVerifySynthesis}
          disabled={selectedElements.length === 0}
          className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-950/40 flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <Sparkles size={16} />
          <span>Oceń notatkę wg kryteriów CKE</span>
        </button>
      )}
    </div>
  );
};
