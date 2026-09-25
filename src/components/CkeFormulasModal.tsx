import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, BookOpen, AlertTriangle, Compass, Eye, EyeOff, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getCkeFormulas, getCkeFormulaTopics, useCkeCatalogs, type CkeFormulaItem, type CkeFormulaSubItem } from '../services/ckeCatalogRepository';
import { CKE_FORMULAS_DATA } from '../data/ckeFormulasData';
import { MathRenderer } from './MathRenderer';
import { MathPlot } from './MathPlot';
import { MathDiagram } from './MathDiagram';
import { NumberLineDiagram } from './NumberLineDiagram';

interface CkeFormulasModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopicId?: string;
}

export const CkeFormulasModal: React.FC<CkeFormulasModalProps> = ({
  isOpen,
  onClose,
  initialTopicId = 'all'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(initialTopicId);
  const [expandedDiagrams, setExpandedDiagrams] = useState<Record<string, boolean>>({});
  const chipsScrollRef = useRef<HTMLDivElement>(null);

  const toggleDiagram = (id: string) => {
    setExpandedDiagrams(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Katalog wzorów CKE pochodzi z Firestore (system/ckeFormulas).
  const isCatalogLoaded = useCkeCatalogs();

  // Funkcja pomocnicza do bezpiecznego rozbicia wzoru głównego i własności cząstkowych
  const resolveFormulaContent = (item: CkeFormulaItem): { mainFormula: string; subFormulas: CkeFormulaSubItem[] } => {
    if (item.subFormulas && item.subFormulas.length > 0) {
      return {
        mainFormula: item.formula,
        subFormulas: item.subFormulas
      };
    }

    // Fallback parser w przypadku starych stringów z nowymi liniami (\n)
    if (item.formula.includes('\n')) {
      const lines = item.formula.split('\n').map(l => l.trim()).filter(Boolean);
      const main = lines[0];
      const subs: CkeFormulaSubItem[] = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const colonIdx = line.indexOf(':');
        if (colonIdx > 0) {
          subs.push({
            label: line.slice(0, colonIdx).trim(),
            formula: line.slice(colonIdx + 1).trim()
          });
        } else {
          subs.push({
            label: `Własność ${i}`,
            formula: line
          });
        }
      }

      return {
        mainFormula: main,
        subFormulas: subs
      };
    }

    return {
      mainFormula: item.formula,
      subFormulas: []
    };
  };

  // Filtered formulas
  const filteredFormulas = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const source = getCkeFormulas().length > 0 ? getCkeFormulas() : CKE_FORMULAS_DATA;

    return source.filter((item: CkeFormulaItem) => {
      // Topic match
      if (selectedTopic !== 'all' && item.topicId !== selectedTopic) {
        return false;
      }

      // Search match
      if (!query) return true;

      const inTitle = item.title.toLowerCase().includes(query);
      const inFormula = item.formula.toLowerCase().includes(query);
      const inTopic = item.topicName.toLowerCase().includes(query);
      const inKeywords = item.keywords.some(k => k.toLowerCase().includes(query));
      const inGolden = item.goldenRule?.toLowerCase().includes(query) ?? false;
      const inTrap = item.ckeTrap?.toLowerCase().includes(query) ?? false;
      const inSub = item.subFormulas?.some(s => s.label.toLowerCase().includes(query) || s.formula.toLowerCase().includes(query)) ?? false;

      return inTitle || inFormula || inTopic || inKeywords || inGolden || inTrap || inSub;
    });
  }, [searchQuery, selectedTopic, isCatalogLoaded]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div 
        id="cke-formulas-modal-backdrop"
        className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 text-white select-none overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-[#0E131E] border border-white/10 rounded-t-[28px] sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#121824] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFB800]/15 border border-[#FFB800]/30 text-[#FFB800] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,184,0,0.2)]">
                <BookOpen size={20} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  Wzory
                  <span className="text-[10px] font-medium tracking-tight px-2 py-0.5 rounded-full bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20">
                    Nowa Formuła 2023
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Cyfrowy niezbędnik maturalny • Oficjalne wzory i pułapki egzaminacyjne
                </p>
              </div>
            </div>

            <button
              id="cke-formulas-close-button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Zamknij"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search bar & Category filters */}
          <div className="p-4 bg-[#0B0F17] border-b border-white/5 flex flex-col gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="cke-formulas-search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Szukaj wzoru (np. potęgi, logarytm, delta, procenty)..."
                className="w-full bg-[#141B26] border border-white/10 focus:border-[#FFB800]/60 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded-md"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Topic Filter Chips */}
            <div className="relative flex items-center group/cke-modal-filter w-full">
              <button
                type="button"
                onClick={() => chipsScrollRef.current?.scrollBy({ left: -150, behavior: 'smooth' })}
                className="hidden sm:flex absolute left-0 z-10 w-6 h-6 items-center justify-center rounded-full bg-[#0E1522]/95 border border-white/20 text-slate-300 hover:text-white hover:bg-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.5)] cursor-pointer transition -translate-x-1"
                aria-label="Przewiń działy w lewo"
                title="Przewiń w lewo"
              >
                <ChevronLeft size={13} />
              </button>

              <div 
                ref={chipsScrollRef}
                onWheel={(e) => {
                  if (e.deltaY !== 0) {
                    e.currentTarget.scrollLeft += e.deltaY;
                  }
                }}
                className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mb-1 px-0.5 sm:px-6 scroll-smooth w-full"
              >
                <Filter size={13} className="text-slate-500 shrink-0 mr-1 ml-0.5" />
                {getCkeFormulaTopics().map(topic => {
                  const isSelected = selectedTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-[#FFB800] text-[#080B11] font-bold shadow-[0_0_12px_rgba(255,184,0,0.4)]'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                      }`}
                    >
                      {topic.name}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => chipsScrollRef.current?.scrollBy({ left: 150, behavior: 'smooth' })}
                className="hidden sm:flex absolute right-0 z-10 w-6 h-6 items-center justify-center rounded-full bg-[#0E1522]/95 border border-white/20 text-slate-300 hover:text-white hover:bg-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.5)] cursor-pointer transition translate-x-1"
                aria-label="Przewiń działy w prawo"
                title="Przewiń w prawo"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Formulas List */}
          <div 
            id="cke-formulas-list"
            className="flex-1 overflow-y-auto p-4 space-y-3.5"
            style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))' }}
          >
            {!isCatalogLoaded ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#FFB800]/30 border-t-[#FFB800] animate-spin mb-3" />
                <p className="text-sm font-semibold text-slate-300">Wczytuję oficjalne wzory CKE…</p>
                <p className="text-xs text-slate-500 mt-1">Katalog pobierany z chmury.</p>
              </div>
            ) : filteredFormulas.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <BookOpen size={36} className="text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-slate-300">Nie znaleziono wzorów</p>
                <p className="text-xs text-slate-500 mt-1">
                  Spróbuj wpisać inną frazę lub wybrać inny dział.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTopic('all');
                  }}
                  className="mt-3 px-4 py-1.5 rounded-xl bg-white/10 text-xs font-semibold text-slate-200 hover:bg-white/15 cursor-pointer"
                >
                  Pokaż wszystkie wzory
                </button>
              </div>
            ) : (
              filteredFormulas.map(item => {
                const { mainFormula, subFormulas } = resolveFormulaContent(item);

                return (
                  <div
                    key={item.id}
                    className="bg-[#121824] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 shadow-sm hover:border-[#FFB800]/30 transition-all"
                  >
                    {/* Top Bar: Title & Topic Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/20 px-2 py-0.5 rounded-full shrink-0">
                        {item.topicName}
                      </span>
                    </div>

                    {/* Główny Wzór KaTeX o wysokim kontraście */}
                    <div className="bg-[#070A11] border border-[#FFB800]/25 rounded-xl p-3 sm:p-4 text-center shadow-[inset_0_2px_12px_rgba(0,0,0,0.6)] overflow-x-auto">
                      <div className="font-mono text-amber-200 font-bold text-base sm:text-lg leading-relaxed tracking-wide">
                        <MathRenderer content={mainFormula} displayMode />
                      </div>
                    </div>

                    {/* Własności i wzory cząstkowe (subFormulas) */}
                    {subFormulas.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                        {subFormulas.map((sub, idx) => (
                          <div
                            key={idx}
                            className="bg-[#0B101A] border border-white/5 hover:border-white/15 rounded-xl p-2.5 sm:p-3 flex flex-col justify-between gap-1 transition-all"
                          >
                            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-slate-400">
                              {sub.label}
                            </span>
                            <div className="text-white font-semibold text-xs sm:text-sm overflow-x-auto py-0.5">
                              <MathRenderer content={sub.formula} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Wyjaśnienie */}
                    {item.explanation && (
                      <div className="text-xs text-slate-300 leading-relaxed pt-0.5">
                        <MathRenderer content={item.explanation} />
                      </div>
                    )}

                    {/* Złota zasada & Pułapka CKE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {item.goldenRule && (
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-200">
                          <Compass size={15} className="text-amber-400 shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <strong className="block text-amber-300 font-bold text-[11px] uppercase tracking-wider mb-0.5">
                              Złota Zasada Maturalna
                            </strong>
                            <div className="leading-relaxed">
                              <MathRenderer content={item.goldenRule} />
                            </div>
                          </div>
                        </div>
                      )}

                      {item.ckeTrap && (
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 flex items-start gap-2 text-xs text-rose-200">
                          <AlertTriangle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <strong className="block text-rose-300 font-bold text-[11px] uppercase tracking-wider mb-0.5">
                              Typowa Pułapka Egzaminacyjna
                            </strong>
                            <div className="leading-relaxed">
                              <MathRenderer content={item.ckeTrap} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Szkic geometryczny (opcjonalny, rozwijany akordeon) */}
                    {item.diagram && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => toggleDiagram(item.id)}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-all cursor-pointer shadow-sm"
                        >
                          {expandedDiagrams[item.id] ? (
                            <>
                              <EyeOff size={13} className="text-slate-400 shrink-0" />
                              <span>Ukryj wizualizację</span>
                            </>
                          ) : (
                            <>
                              <Eye size={13} className="text-sky-400 shrink-0" />
                              <span>Wizualizacja geometryczna</span>
                            </>
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedDiagrams[item.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pt-2.5"
                            >
                              <div className="rounded-xl border border-white/10 bg-[#070A0F] p-3 shadow-inner">
                                {'intervals' in item.diagram ? (
                                  <NumberLineDiagram data={item.diagram as any} height={120} />
                                ) : (
                                  <MathDiagram diagram={item.diagram as any} compact borderless />
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-3.5 sm:p-4 border-t border-white/10 bg-[#121824] flex items-center justify-end shrink-0">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              Wróć do lekcji
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
