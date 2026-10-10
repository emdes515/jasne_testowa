import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Volume2,
  BookOpen,
  Filter,
  Check,
  Copy,
  Lightbulb,
  Layers,
  GraduationCap,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  ENGLISH_DICTIONARY,
  ENGLISH_VOCAB_CATEGORIES,
  EnglishDictionaryWord,
  EnglishVocabCategory
} from '../../data/english/englishDictionaryData';
import { triggerHaptic } from '../../utils';

interface EnglishDictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: EnglishVocabCategory | 'all';
}

export const EnglishDictionaryModal: React.FC<EnglishDictionaryModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'all'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EnglishVocabCategory | 'all'>(initialCategory);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [revealedFlashcardIds, setRevealedFlashcardIds] = useState<Record<string, boolean>>({});
  const [copiedWordId, setCopiedWordId] = useState<string | null>(null);

  // Filtrowanie słownika
  const filteredWords = useMemo(() => {
    return ENGLISH_DICTIONARY.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const wordMatch = item.word.toLowerCase().includes(q);
        const transMatch = item.translation.toLowerCase().includes(q);
        const exMatch = item.exampleEn.toLowerCase().includes(q) || item.examplePl.toLowerCase().includes(q);
        const collocMatch = (item.collocations || []).some(c => c.toLowerCase().includes(q));
        if (!wordMatch && !transMatch && !exMatch && !collocMatch) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Wymowa audio (SpeechSynthesis)
  const handlePlayAudio = (text: string) => {
    try {
      triggerHaptic('light');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn('Speech synthesis unavailable:', e);
    }
  };

  // Kopiowanie słówka
  const handleCopyWord = (item: EnglishDictionaryWord) => {
    try {
      triggerHaptic('light');
      navigator.clipboard.writeText(`${item.word} – ${item.translation}`);
      setCopiedWordId(item.id);
      setTimeout(() => setCopiedWordId(null), 2000);
    } catch {}
  };

  // Odsłonięcie pojedynczej fiszki
  const toggleRevealFlashcard = (id: string) => {
    triggerHaptic('light');
    setRevealedFlashcardIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-surface-bg border border-surface-line rounded-2xl shadow-2xl flex flex-col overflow-hidden text-text-soft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nagłówek Modala */}
        <header className="p-4 sm:p-5 border-b border-surface-line bg-surface-panel/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden xs:flex w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 items-center justify-center text-accent-soft shrink-0">
              <BookOpen className="w-5 h-5 text-accent-soft" />
            </div>
            <div>
              <div className="flex flex-col-reverse items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/10 text-accent-soft border border-primary/20 whitespace-nowrap">
                  Formuła 2023 • CKE
                </span>
                <h2 className="text-base sm:text-lg font-bold text-text-strong tracking-tight">
                  Oficjalny Słownik Maturalny
                </h2>
              </div>
              <p className="hidden sm:block text-xs text-text-secondary mt-0.5">
                14 działów tematycznych CKE • Pewniaki Phrasal Verbs • Spójniki do e-maila i rozprawki
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Przełącznik Tryb Fiszki */}
            <button
              onClick={() => setIsFlashcardMode(!isFlashcardMode)}
              aria-label="Tryb fiszek"
              className={`px-3 min-h-[40px] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
                isFlashcardMode
                  ? 'bg-primary text-slate-950 border-[#ffdca1] shadow-sm'
                  : 'bg-surface-panel border-surface-line text-text-secondary hover:text-text-soft'
              }`}
              title="Ukryj tłumaczenia, aby sprawdzić swoją pamięć"
            >
              {isFlashcardMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Tryb Fiszki</span>
            </button>

            {/* Przycisk Zamknięcia */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-surface-panel hover:bg-surface-card-hover border border-surface-line text-text-secondary hover:text-text-strong transition-colors cursor-pointer"
              title="Zamknij słownik"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Pasek Wyszukiwania i Statystyk */}
        <div className="p-4 border-b border-surface-line bg-surface-bg space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj po angielsku lub polsku (np. reliable, zakwaterowanie, put off)..."
              className="w-full bg-surface-panel border border-surface-line rounded-xl pl-10 pr-9 py-2 text-sm text-text-soft placeholder-[#94a3b8] focus:outline-none focus:border-[#ffdca1] shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-strong"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Horyzontalna lista kategorii tematycznych */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-primary/20 border border-primary/40 text-accent-soft'
                  : 'bg-surface-panel border border-surface-line text-text-secondary hover:text-text-soft'
              }`}
            >
              Wszystkie ({ENGLISH_DICTIONARY.length})
            </button>
            {ENGLISH_VOCAB_CATEGORIES.map(cat => {
              const count = ENGLISH_DICTIONARY.filter(w => w.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-primary/20 border border-primary/40 text-accent-soft'
                      : 'bg-surface-panel border border-surface-line text-text-secondary hover:text-text-soft'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista Słówek (Scrollable Body) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredWords.length === 0 ? (
            <div className="text-center py-12 text-text-secondary space-y-2">
              <Search className="w-8 h-8 mx-auto text-text-secondary/50" />
              <p className="text-sm font-semibold text-text-strong">Nie znaleziono słówek pasujących do zapytania.</p>
              <p className="text-xs">Spróbuj zmienić kategorię lub wpisać prostsze hasło.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredWords.map(item => {
                const isRevealed = !isFlashcardMode || revealedFlashcardIds[item.id];
                const isCopied = copiedWordId === item.id;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-surface-panel border border-surface-line hover:border-[#1e293b] transition-all flex flex-col justify-between gap-3 shadow-xs"
                  >
                    {/* Górny wiersz: Słowo, wymowa, przyciski akcji */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-text-strong tracking-tight">
                              {item.word}
                            </h3>
                            <button
                              onClick={() => handlePlayAudio(item.word)}
                              className="p-1 rounded-md bg-surface-bg hover:bg-surface-card-hover text-accent-soft border border-surface-line transition-colors"
                              title="Odsłuchaj wymowę (native speaker)"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-text-secondary font-mono">
                            <span>{item.phonetic}</span>
                            <span>•</span>
                            <span className="italic text-text-soft font-sans text-[11px]">{item.partOfSpeech}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-bg border border-surface-line text-text-accent">
                            {item.level}
                          </span>
                          <button
                            onClick={() => handleCopyWord(item)}
                            className="p-1 rounded-md text-text-secondary hover:text-text-strong transition-colors"
                            title="Skopiuj słówko"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Tłumaczenie polskie / Fiszka */}
                      <div className="mt-2.5">
                        {isFlashcardMode && !isRevealed ? (
                          <button
                            onClick={() => toggleRevealFlashcard(item.id)}
                            className="w-full py-1.5 px-3 rounded-lg bg-surface-bg hover:bg-surface-card-hover border border-dashed border-primary/40 text-xs font-semibold text-accent-soft flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Eye className="w-3 h-3 text-text-accent" />
                            <span>Kliknij, aby odkryć znaczenie</span>
                          </button>
                        ) : (
                          <p className="text-sm font-semibold text-accent-soft">
                            {item.translation}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Przykład i Pułapka CKE */}
                    {isRevealed && (
                      <div className="space-y-2 pt-2 border-t border-surface-line text-xs">
                        <div className="bg-surface-bg/60 p-2.5 rounded-lg border border-surface-line space-y-1">
                          <p className="text-text-strong italic leading-relaxed">
                            "{item.exampleEn}"
                          </p>
                          <p className="text-text-secondary text-[11px]">
                            {item.examplePl}
                          </p>
                        </div>

                        {item.collocations && item.collocations.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Kolokacje:</span>
                            {item.collocations.map((c, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-bg border border-surface-line text-text-soft">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.ckeTip && (
                          <div className="flex items-start gap-1.5 text-[11px] text-amber-300/90 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span><strong>Patent CKE:</strong> {item.ckeTip}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Stopka Modala */}
        <footer className="p-3 border-t border-surface-line bg-surface-panel flex items-center justify-between text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-accent-soft" />
            Wymagania leksykalne CKE Formuła 2023
          </span>
          <span className="text-accent-soft font-medium">
            Pokazano: {filteredWords.length} słówek
          </span>
        </footer>
      </div>
    </div>
  );
};
