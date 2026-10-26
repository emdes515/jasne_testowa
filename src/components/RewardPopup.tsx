import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Coins, Star, X, Crown, Zap } from 'lucide-react';
import { useEffect } from 'react';
import { triggerHaptic } from '../utils';
import confetti from 'canvas-confetti';

interface RewardPopupProps {
  reward: { 
    xp: number; 
    coins: number; 
    tokens?: number;
    levelUp?: number;
    title?: string;
    description?: string;
    bonusNote?: string;
  } | null;
  onClose: () => void;
}

export function RewardPopup({ reward, onClose }: RewardPopupProps) {
  useEffect(() => {
    if (reward) {
      triggerHaptic(reward.levelUp ? 'heavy' : 'success');
      
      if (reward.levelUp || reward.title) {
        // Trigger confetti for level up or achievement
        // Krótka salwa w barwach marki; emisja co 6. klatkę, żeby nie zasłaniać treści i nie dławić telefonu
        const duration = 1200;
        let frameIndex = 0;
        const end = Date.now() + duration;

        const frame = () => {
          if (frameIndex++ % 6 !== 0) {
            if (Date.now() < end) requestAnimationFrame(frame);
            return;
          }
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FFB800', '#FFDCA1', '#10B981', '#FFFFFF']
          });
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FFB800', '#FFDCA1', '#10B981', '#FFFFFF']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      }
      
      const timer = setTimeout(() => {
        onClose();
      }, reward.levelUp ? 6000 : 4500); // Give more time if leveled up
      
      return () => clearTimeout(timer);
    }
  }, [reward, onClose]);

  return (
    <AnimatePresence>
      {reward && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ 
              scale: 1, 
              y: 0, 
              opacity: 1, 
              transition: { type: 'spring', bounce: 0.5, duration: 0.6 }
            }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-sm ${reward.levelUp ? 'bg-gradient-to-b from-blue-900/60 to-[#13141A]' : 'bg-surface-card-hover'} border border-hairline rounded-[32px] p-7 flex flex-col items-center relative overflow-hidden shadow-2xl`}
          >
            {/* Background effects */}
            {reward.levelUp && (
              <>
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [1, 2, 3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-blue-500/30 rounded-full z-0"
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/40 blur-[80px] rounded-full z-0"></div>
              </>
            )}
            
            {!reward.levelUp && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 blur-[50px] rounded-full z-0"></div>
            )}
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-veil hover:bg-veil-strong text-white/50 hover:text-text-strong transition-colors z-20"
            >
              <X size={16} />
            </button>

            {reward.levelUp ? (
              <div className="relative z-10 w-full flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', bounce: 0.6, duration: 0.8 }}
                  className="w-28 h-28 rounded-full bg-blue-500/20 border-4 border-blue-400 flex flex-col items-center justify-center mb-3 relative shadow-[0_0_80px_rgba(59,130,246,0.6)]"
                >
                  <span className="font-display text-xs font-bold text-blue-300 uppercase tracking-widest mt-1">Poziom</span>
                  <motion.span 
                    initial={{ scale: 0.5 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 0.8, duration: 0.5, ease: 'easeInOut' }}
                    className="font-display text-5xl font-bold text-text-strong leading-none shadow-blue-500/50 drop-shadow-2xl"
                  >
                    {reward.levelUp}
                  </motion.span>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-6"
                >
                  <h2 className="font-display text-3xl font-black text-amber-300 mb-1 uppercase tracking-wider drop-shadow-[0_0_20px_rgba(255,184,0,0.4)]">
                    Awans!
                  </h2>
                  <p className="text-blue-200/80 text-xs max-w-[250px] mx-auto">
                    Twoje umiejętności rosną! Osiągnięto nowy poziom wtajemniczenia.
                  </p>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.6 }}
                className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 relative z-10 shadow-[0_0_40px_rgba(245,158,11,0.3)]"
              >
                <Trophy size={32} className="text-amber-400" />
              </motion.div>
            )}

            {!reward.levelUp && (
              <div className="text-center mb-6 relative z-10">
                <h2 className="font-display text-xl font-bold text-text-strong mb-1.5">
                  {reward.title || 'Nagroda odebrana!'}
                </h2>
                <p className="text-text-secondary text-xs max-w-[260px] mx-auto">
                  {reward.description || 'Dobra robota! Punkty i waluta zostały dopisane do Twojego konta.'}
                </p>
                {reward.bonusNote && (
                  <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-[11px] font-bold">
                    <Zap size={12} />
                    {reward.bonusNote}
                  </div>
                )}
              </div>
            )}

            <div className={`w-full grid ${reward.tokens ? 'grid-cols-3' : 'grid-cols-2'} gap-2.5 relative z-10`}>
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-veil border border-hairline-soft rounded-[18px] p-3 flex flex-col items-center justify-center"
              >
                <div className="flex items-center gap-1 mb-1">
                  <Star size={13} className="text-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">XP</span>
                </div>
                <span className="font-display text-xl font-bold text-text-strong">+{reward.xp}</span>
              </motion.div>

              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-veil border border-hairline-soft rounded-[18px] p-3 flex flex-col items-center justify-center"
              >
                <div className="flex items-center gap-1 mb-1">
                  <Coins size={13} className="text-amber-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Monety</span>
                </div>
                <span className="font-display text-xl font-bold text-text-strong">+{reward.coins}</span>
              </motion.div>

              {reward.tokens !== undefined && reward.tokens > 0 && (
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-amber-500/10 border border-amber-500/20 rounded-[18px] p-3 flex flex-col items-center justify-center"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <Crown size={13} className="text-amber-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Żetony</span>
                  </div>
                  <span className="font-display text-xl font-bold text-amber-400">+{reward.tokens}</span>
                </motion.div>
              )}
            </div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={onClose}
              className="mt-6 w-full py-3.5 bg-jasne hover:bg-primary-hover text-on-primary font-bold rounded-2xl transition-colors text-sm shadow-lg active:scale-[0.97]"
            >
              Świetnie!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
