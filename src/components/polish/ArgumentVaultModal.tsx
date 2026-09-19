import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, ShieldCheck, BookOpen, Layers, Sparkles, Filter } from 'lucide-react';
import { PolishArgumentBlock } from '../../types';
import { argumentVaultService } from '../../services/argumentVaultService';

interface ArgumentVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArgumentVaultModal: React.FC<ArgumentVaultModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [blocks, setBlocks] = useState<PolishArgumentBlock[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [copiedToast, setCopiedToast] = useState<boolean>(false);

  const loadVault = () => {
    const loaded = argumentVaultService.getUnlockedBlocks();
    setBlocks(loaded);
  };

  useEffect(() => {
    if (isOpen) {
      loadVault();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => loadVault();
    window.addEventListener('jasne:vault_updated', handleUpdate);
    return () => window.removeEventListener('jasne:vault_updated', handleUpdate);
  }, []);

  if (!isOpen) return null;

  const coverage = argumentVaultService.getCoverage();
  const availableBooks = Array.from(new Set(blocks.map(b => b.bookTitle)));

  const filteredBlocks = blocks.filter(b => {
    if (selectedFilter === 'ALL') return true;
    return b.bookTitle === selectedFilter;
  });

  const handleCopyAll = () => {
    const text = argumentVaultService.exportToClipboardText();
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-3xl max-h-[90vh] bg-[#0c121e] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-[#0e1626] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>📚 Baza Gotowych Argumentów CKE</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {blocks.length} / 7 argumentów CKE
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Wzorcowe argumenty wypracowaniowe CKE 2023 (Teza • Dowód • Kontekst • Puenta)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coverage Stat Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-rose-950/20 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <div className="flex items-center justify-between sm:justify-start gap-3 mb-1">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Pokrycie Motywów Maturalnych CKE
              </span>
              <span className="text-xs font-black text-amber-400">
                {coverage.coveragePercent}% ({coverage.uniqueThemesCount} / {coverage.totalKnownThemes} motywów)
              </span>
            </div>
            <div className="w-full sm:w-72 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${Math.max(5, coverage.coveragePercent)}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleCopyAll}
            disabled={blocks.length === 0}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shrink-0 cursor-pointer"
          >
            {copiedToast ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Skopiowano bazę argumentów!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Kopiuj bazę argumentów (Format CKE)</span>
              </>
            )}
          </button>
        </div>

        {/* Filter Chips */}
        {availableBooks.length > 0 && (
          <div className="px-5 py-2.5 bg-[#0a0f1a] border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors ${
                selectedFilter === 'ALL'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Wszystkie ({blocks.length})
            </button>
            {availableBooks.map(book => (
              <button
                key={book}
                onClick={() => setSelectedFilter(book)}
                className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors ${
                  selectedFilter === book
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {book}
              </button>
            ))}
          </div>
        )}

        {/* Blocks List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4">
          {filteredBlocks.length === 0 ? (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center">
              <BookOpen className="w-14 h-14 text-slate-600 mb-3" />
              <h3 className="text-base font-bold text-slate-200 mb-1">
                Brak odblokowanych argumentów
              </h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Zaliczaj lekcje lektur kanonicznych (np. <strong>Antygona</strong>, <strong>Dziady cz. III</strong>, <strong>Lalka</strong>, <strong>Wesele</strong>), aby odblokować wzorcowe argumenty CKE!
              </p>
            </div>
          ) : (
            filteredBlocks.map((b, idx) => (
              <div
                key={b.id || idx}
                className="p-4 sm:p-5 rounded-xl bg-[#0f172a]/90 border border-slate-700/80 hover:border-amber-500/50 transition-colors shadow-lg flex flex-col gap-3"
              >
                {/* Block Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {b.bookTitle}
                    </span>
                    <span className="text-xs text-slate-300 font-bold">
                      {b.character}
                    </span>
                    <span className="text-xs text-slate-400">• Motyw: {b.theme}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    100% BEZPIECZNY CKE
                  </span>
                </div>

                {/* Structure Elements */}
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <strong className="text-amber-400 uppercase tracking-wide block mb-0.5">
                      [Teza] Teza cząstkowa:
                    </strong>
                    <span className="text-slate-200 leading-relaxed">{b.claim}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <strong className="text-sky-400 uppercase tracking-wide block mb-0.5">
                      [Dowód] Sytuacja z lektury / Fakt:
                    </strong>
                    <span className="text-slate-200 leading-relaxed">{b.evidence}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <strong className="text-purple-400 uppercase tracking-wide block mb-0.5">
                      [Kontekst] Kontekst ({b.contextType}):
                    </strong>
                    <span className="text-slate-200 leading-relaxed">{b.contextDescription}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <strong className="text-emerald-400 uppercase tracking-wide block mb-0.5">
                      [Puenta] Podsumowanie i wniosek do tematu:
                    </strong>
                    <span className="text-slate-200 leading-relaxed">{b.linkToThesis}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0e1626] flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Argumenty zapisują się automatycznie w Twoim profilu
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
          >
            Zamknij
          </button>
        </div>
      </motion.div>
    </div>
  );
};
