import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  BookOpen,
  Calculator,
  Globe,
  Dna,
  FlaskConical,
  Lock
} from 'lucide-react';
import { PredictorResult } from '../types';
import { triggerHaptic } from '../utils';
import { getCkeAvailableSubjects, useCkeCatalogs } from '../services/ckeCatalogRepository';

interface PredictorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseResult: PredictorResult;
  subjectId: string;
  currentSubjectKey?: string;
  onSelectSubject?: (subjectKey: string) => void;
  completedTasks?: string[];
  lessonMistakes?: Record<string, number>;
  userLessonsCompleted?: string[];
  maturaAttempts?: number;
  maturaBestScore?: number;
  onNavigate?: (tab: string, subTab?: string) => void;
  onOpenParentSponsor?: () => void;
  onOpenProPopup?: () => void;
  onOpenDiagnostic?: () => void;
}

export const PredictorDetailsModal: React.FC<PredictorDetailsModalProps> = ({
  isOpen,
  onClose,
  baseResult,
  subjectId,
  currentSubjectKey = 'math',
  onSelectSubject,
  onOpenParentSponsor,
  onOpenDiagnostic,
  onNavigate
}) => {
  const isPol = subjectId.includes('polski') || currentSubjectKey === 'pol';
  // Lista przedmiotów CKE pochodzi z Firestore (system/ckeSubjectWeights).
  useCkeCatalogs();
  const pointsMissing = Math.max(0, baseResult.passingThresholdPoints - baseResult.predictedPoints);
  const pointsOver = Math.max(0, baseResult.predictedPoints - baseResult.passingThresholdPoints);

  // Krótki, zwięzły komentarz dopasowany do aktualnego wyniku
  const commentText = (() => {
    if (!baseResult.isPassing) {
      return `Do zdania matury potrzebujesz minimum 30% (${baseResult.passingThresholdPoints} pkt). Do progu brakuje Ci jeszcze ${pointsMissing.toFixed(1)} pkt. Rozwiązuj kolejne lekcje w aplikacji, aby wejść w bezpieczną strefę punktową.`;
    }
    if (baseResult.predictedPercent >= 70) {
      return `Bardzo wysoki wynik (${baseResult.predictedPercent}%). Masz solidnie opanowane kluczowe tematy. Utrzymuj regularny kontakt z zadaniami, by powtórzyć ten wynik na egzaminie.`;
    }
    return `Ten wynik (${baseResult.predictedPercent}%) gwarantuje zdanie matury (+${pointsOver.toFixed(1)} pkt ponad próg 30%). Aby zdobyć więcej punktów pod kątem rekrutacji na studia, przerób dział: ${baseResult.nextBestTopic.topicName}.`;
  })();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          id="predictor-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-[#0C101C] border border-white/10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
          >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isPol ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                <TrendingUp size={16} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white leading-tight">
                  Twój Szacowany Wynik
                </h3>
                <p className="text-[11px] text-slate-400">
                  Aktualna prognoza punktowa
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer border border-white/5"
              aria-label="Zamknij"
            >
              <X size={15} />
            </button>
          </div>

          {/* Subject Switcher Bar inside modal */}
          <div className="p-3 bg-black/30 border-b border-white/5">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {getCkeAvailableSubjects().map((sub) => {
                const isActive = sub.key === currentSubjectKey || sub.id === subjectId;
                const SubIcon = 
                  sub.iconName === 'math' || sub.iconName === 'calculator' ? Calculator : 
                  sub.iconName === 'book' ? BookOpen : 
                  sub.iconName === 'globe' ? Globe :
                  sub.iconName === 'dna' ? Dna :
                  sub.iconName === 'flask' ? FlaskConical : Calculator;

                return (
                  <button
                    key={sub.id}
                    type="button"
                    disabled={!sub.isAvailable}
                    onClick={() => {
                      if (sub.isAvailable && onSelectSubject && sub.key !== currentSubjectKey) {
                        triggerHaptic('light');
                        onSelectSubject(sub.key);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'text-white shadow-sm'
                        : sub.isAvailable
                        ? 'text-slate-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 opacity-50 cursor-not-allowed'
                    }`}
                    style={isActive ? {
                      backgroundColor: sub.accentColor,
                      color: sub.accentColor === '#FFB800' ? '#080B11' : '#FFFFFF',
                      boxShadow: `0 0 14px ${sub.accentColor}66`
                    } : undefined}
                  >
                    <SubIcon size={13} />
                    <span>{sub.shortName}</span>
                    {!sub.isAvailable && <Lock size={10} className="ml-0.5 text-slate-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content: Prosty wynik procentowy i krótki komentarz */}
          <div className="p-5 flex flex-col gap-4">
            {/* Wynik */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 text-center">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {baseResult.predictedPercent}%
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">
                {baseResult.predictedPoints} / {baseResult.totalExamPoints} pkt
              </span>

              <div className="mt-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  baseResult.isPassing 
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
                    : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                }`}>
                  {baseResult.isPassing ? (
                    <>
                      <ShieldCheck size={13} />
                      <span>Próg 30% zdany</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert size={13} />
                      <span>Poniżej progu 30%</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Bardzo krótki, zwięzły komentarz */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-white block mb-1">Podsumowanie:</span>
              {commentText}
            </div>

            {/* Opcja Testu Diagnostycznego */}
            {onOpenDiagnostic && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-emerald-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-200">
                  <span className="font-extrabold text-amber-300 block">Szybki Test Diagnostyczny CKE</span>
                  <span className="text-[11px] text-slate-300">Rozwiąż 3 zadania, aby dokładnie skalibrować predyktor.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('medium');
                    onClose();
                    onOpenDiagnostic();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#FFB800] hover:bg-amber-400 active:scale-95 text-amber-950 font-black text-xs shrink-0 cursor-pointer transition-all shadow-md"
                >
                  Rozpocznij ›
                </button>
              </div>
            )}

            {/* Opcja sponsoringu rodzica */}
            {onOpenParentSponsor && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  <span className="font-bold text-amber-300 block">Pakiet PRO</span>
                  <span>Poproś rodzica o nielimitowane serca i powtórki.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('success');
                    onClose();
                    onOpenParentSponsor();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black text-xs shrink-0 cursor-pointer transition-all"
                >
                  BLIK ›
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 active:scale-98 text-white font-bold text-xs tracking-wide transition cursor-pointer"
            >
              Wróć do nauki
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};
