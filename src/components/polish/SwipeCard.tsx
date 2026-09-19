import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Check, X, Flame, AlertOctagon, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { SwipeTaskData, SwipeItem } from '../../types';

interface SwipeCardProps {
  data: SwipeTaskData;
  onMistake: (isCardinalTrap: boolean, item: SwipeItem) => void;
  onComplete: (stats: { correctCount: number; totalCards: number }) => void;
  isSoundEnabled?: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  data,
  onMistake,
  onComplete,
}) => {
  const cards = data.cards || [];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [activeExplanation, setActiveExplanation] = useState<{
    item: SwipeItem;
    userChoseRight: boolean;
  } | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const leftOpacity = useTransform(x, [-120, -30], [1, 0]);
  const rightOpacity = useTransform(x, [30, 120], [0, 1]);

  const currentCard = cards[currentIndex];

  const handleDecision = (choseRight: boolean) => {
    if (!currentCard || activeExplanation) return;

    setSwipeDirection(choseRight ? 'right' : 'left');

    const cardIsCorrect = currentCard.isCorrect !== undefined ? currentCard.isCorrect : currentCard.isTrue;
    const isCorrectChoice = choseRight === cardIsCorrect;

    if (isCorrectChoice) {
      setCorrectCount(prev => prev + 1);
      advanceNext();
    } else {
      // Mistake!
      onMistake(Boolean(currentCard.isCardinalTrap), currentCard);
      setActiveExplanation({
        item: currentCard,
        userChoseRight: choseRight
      });
    }
  };

  const advanceNext = () => {
    setSwipeDirection(null);
    x.set(0);
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(prev => prev + 1);
      setActiveExplanation(null);
    } else {
      onComplete({
        correctCount: correctCount + (activeExplanation ? 0 : 1),
        totalCards: cards.length
      });
    }
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    const threshold = 90;
    if (info.offset.x > threshold) {
      handleDecision(true);
    } else if (info.offset.x < -threshold) {
      handleDecision(false);
    }
  };

  if (!currentCard) {
    return (
      <div className="p-8 text-center text-slate-300">
        <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-1">Rozgrzewka ukończona!</h3>
        <p className="text-sm text-slate-400">Świetna robota – tempo i wiedza faktograficzna opanowane.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none py-2">
      {/* Progress & Title Header */}
      <div className="w-full flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <Flame className="w-3 h-3 text-rose-400" />
            TINDER MOTYWÓW
          </span>
          {data.themeTitle && (
            <span className="text-xs text-slate-400 font-medium truncate max-w-[170px]">
              {data.themeTitle}
            </span>
          )}
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
          Karta {currentIndex + 1} z {cards.length}
        </span>
      </div>

      {/* Card Swipe Container */}
      <div className="relative w-full h-[330px] flex items-center justify-center">
        {/* Next Card Ghost Background */}
        {currentIndex + 1 < cards.length && (
          <div className="absolute w-[94%] h-[310px] bg-[#0d1422] border border-slate-800 rounded-2xl opacity-50 scale-95 translate-y-3 pointer-events-none" />
        )}

        <AnimatePresence mode="wait">
          {activeExplanation ? (
            /* Error / Explanation Card */
            <motion.div
              key="explanation"
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full h-full bg-[#111827] border-2 border-rose-500/60 rounded-2xl p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-rose-400 text-sm font-bold mb-2">
                  <AlertOctagon className="w-5 h-5 text-rose-500 animate-pulse" />
                  {activeExplanation.item.isCardinalTrap ? 'PUŁAPKA KARDYNALNA CKE!' : 'BŁĄD FAKTOGRAFICZNY!'}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                  Twoja odpowiedź: {activeExplanation.userChoseRight ? 'PRAWDA' : 'FAŁSZ'} • Prawidłowa:{' '}
                  <span className="text-emerald-400 font-bold">
                    {activeExplanation.item.isCorrect ? 'PRAWDA' : 'FAŁSZ'}
                  </span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-sm text-slate-200 leading-relaxed mb-3">
                  {activeExplanation.item.explanation}
                </div>
                {activeExplanation.item.maturaTip && (
                  <p className="text-xs text-amber-300/90 italic bg-amber-950/20 p-2.5 rounded-lg border border-amber-800/30">
                    💡 Wskazówka CKE: {activeExplanation.item.maturaTip}
                  </p>
                )}
              </div>

              <button
                onClick={advanceNext}
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30 transition-transform active:scale-95"
              >
                <span>Rozumiem, dalej</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            /* Active Interactive Swipe Card */
            <motion.div
              key={currentCard.id}
              style={{ x, rotate }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={handleDragEnd}
              animate={
                swipeDirection === 'left'
                  ? { x: -350, opacity: 0, rotate: -25 }
                  : swipeDirection === 'right'
                  ? { x: 350, opacity: 1, rotate: 25 }
                  : { x: 0, opacity: 1, rotate: 0 }
              }
              transition={{ type: 'spring', stiffness: 350, damping: 26 }}
              className="absolute w-full h-full bg-[#0e1626] border border-slate-700/80 rounded-2xl p-6 shadow-2xl flex flex-col justify-between cursor-grab active:cursor-grabbing backdrop-blur-md"
            >
              {/* Overlaid Swipe Indicators */}
              <motion.div
                style={{ opacity: leftOpacity }}
                className="absolute top-4 right-4 bg-rose-500 text-white font-black text-xs px-3 py-1.5 rounded-lg border border-rose-300 shadow-lg shadow-rose-900/50 uppercase tracking-wider rotate-12 pointer-events-none"
              >
                {data.leftLabel || 'FAŁSZ'}
              </motion.div>
              <motion.div
                style={{ opacity: rightOpacity }}
                className="absolute top-4 left-4 bg-emerald-500 text-white font-black text-xs px-3 py-1.5 rounded-lg border border-emerald-300 shadow-lg shadow-emerald-900/50 uppercase tracking-wider -rotate-12 pointer-events-none"
              >
                {data.rightLabel || 'PRAWDA'}
              </motion.div>

              {/* Card Header Hint */}
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1 text-slate-400">
                  <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
                  Prawda czy Fałsz?
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Przesuń kartę lub kliknij przycisk
                </span>
              </div>

              {/* Card Statement Content */}
              <div className="my-auto px-2 py-4">
                <p className="text-base sm:text-lg font-medium text-slate-100 text-center leading-relaxed">
                  „{currentCard.statement}”
                </p>
              </div>

              {/* Drag Hint Footer */}
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-2 border-t border-slate-800/80">
                <span className="text-rose-400/80 flex items-center gap-1">
                  ← {data.leftLabel || 'Fałsz'}
                </span>
                <span className="text-emerald-400/80 flex items-center gap-1">
                  {data.rightLabel || 'Prawda'} →
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button Controls for Desktop / Accessibility */}
      {!activeExplanation && (
        <div className="flex items-center justify-center gap-6 mt-4 w-full px-4">
          <button
            onClick={() => handleDecision(false)}
            aria-label="Fałsz lub Kardynał"
            className="flex-1 py-3 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-rose-950/20"
          >
            <X className="w-5 h-5 text-rose-400 stroke-[3]" />
            <span className="text-xs uppercase tracking-wider">{data.leftLabel || 'Fałsz'}</span>
          </button>

          <button
            onClick={() => handleDecision(true)}
            aria-label="Prawda lub Czysty Fakt"
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-emerald-950/20"
          >
            <Check className="w-5 h-5 text-emerald-400 stroke-[3]" />
            <span className="text-xs uppercase tracking-wider">{data.rightLabel || 'Prawda'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
