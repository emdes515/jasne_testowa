import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Crown } from 'lucide-react';

interface ProPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProPopup({ isOpen, onClose }: ProPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-sm overflow-hidden rounded-[32px] p-[1px] bg-gradient-to-b from-amber-400/50 via-orange-500/20 to-[#13141A] shadow-2xl shadow-orange-500/20"
          >
            <div className="bg-[#0B0E14] rounded-[31px] p-6 relative overflow-hidden h-full">
              {/* Background effects */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full" />
              <div className="absolute top-1/2 left-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full -translate-y-1/2" />
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col items-center text-center relative z-10 pt-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 p-[1px] mb-6 shadow-lg shadow-orange-500/20">
                  <div className="w-full h-full bg-[#0B0E14] rounded-2xl flex items-center justify-center">
                    <Crown size={32} className="text-amber-400" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-display font-bold text-white mb-2">Odblokuj pełen potencjał</h2>
                <p className="text-[#8B8D98] text-[14px] leading-relaxed mb-6">
                  Uzyskaj dostęp do wszystkich przedmiotów, nielimitowanych powtórek i zaawansowanych statystyk.
                </p>

                <div className="w-full space-y-3 mb-8">
                  {[
                    'Dostęp do wszystkich przedmiotów',
                    'Inteligentne powtórki (Spaced Repetition)',
                    'Brak reklam i limitów',
                    'Priorytetowe wsparcie lektorów'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-left">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-amber-400" />
                      </div>
                      <span className="text-[13px] text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-4 rounded-xl text-[15px] transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  Przejdź na PRO
                </button>
                <button 
                  onClick={onClose}
                  className="mt-4 text-[#8B8D98] hover:text-white text-[13px] font-bold transition-colors"
                >
                  Może później
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
