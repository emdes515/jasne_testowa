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
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#070a0f] border border-[#141d2e] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#dfe2f1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nagłówek Modala */}
        <header className="p-4 sm:p-5 border-b border-[#141d2e] bg-[#0e1522]/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffb800]/15 border border-[#ffb800]/30 flex items-center justify-center text-[#ffdca1] shrink-0">
              <BookOpen className="w-5 h-5 text-[#ffdca1]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#ffb800]/10 text-[#ffdca1] border border-[#ffb800]/20">
                  Formuła 2023 • CKE
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Oficjalny Słownik Maturalny
                </h2>
              </div>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                14 działów tematycznych CKE • Pewniaki Phrasal Verbs • Spójniki do e-maila i rozprawki
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Przełącznik Tryb Fiszki */}
            <button
              onClick={() => setIsFlashcardMode(!isFlashcardMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
                isFlashcardMode
                  ? 'bg-[#ffb800] text-slate-950 border-[#ffdca1] shadow-sm'
                  : 'bg-[#0e1522] border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1]'
              }`}
              title="Ukryj tłumaczenia, aby sprawdzić swoją pamięć"
            >
              {isFlashcardMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Tryb Fiszki</span>
            </button>

            {/* Przycisk Zamknięcia */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#0e1522] hover:bg-[#141d2e] border border-[#141d2e] text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
              title="Zamknij słownik"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Pasek Wyszukiwania i Statystyk */}
        <div className="p-4 border-b border-[#141d2e] bg-[#070a0f] space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj po angielsku lub polsku (np. reliable, zakwaterowanie, put off)..."
              className="w-full bg-[#0e1522] border border-[#141d2e] rounded-xl pl-10 pr-9 py-2 text-sm text-[#dfe2f1] placeholder-[#94a3b8] focus:outline-none focus:border-[#ffdca1] shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white"
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
                  ? 'bg-[#ffb800]/20 border border-[#ffb800]/40 text-[#ffdca1]'
                  : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1]'
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
                      ? 'bg-[#ffb800]/20 border border-[#ffb800]/40 text-[#ffdca1]'
                      : 'bg-[#0e1522] border border-[#141d2e] text-[#94a3b8] hover:text-[#dfe2f1]'
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
            <div className="text-center py-12 text-[#94a3b8] space-y-2">
              <Search className="w-8 h-8 mx-auto text-[#94a3b8]/50" />
              <p className="text-sm font-semibold text-white">Nie znaleziono słówek pasujących do zapytania.</p>
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
                    className="p-4 rounded-xl bg-[#0e1522] border border-[#141d2e] hover:border-[#1e293b] transition-all flex flex-col justify-between gap-3 shadow-xs"
                  >
                    {/* Górny wiersz: Słowo, wymowa, przyciski akcji */}
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-white tracking-tight">
                              {item.word}
                            </h3>
                            <button
                              onClick={() => handlePlayAudio(item.word)}
                              className="p-1 rounded-md bg-[#070a0f] hover:bg-[#141d2e] text-[#ffdca1] border border-[#141d2e] transition-colors"
                              title="Odsłuchaj wymowę (native speaker)"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#94a3b8] font-mono">
                            <span>{item.phonetic}</span>
                            <span>•</span>
                            <span className="italic text-[#dfe2f1] font-sans text-[11px]">{item.partOfSpeech}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#070a0f] border border-[#141d2e] text-[#ffb800]">
                            {item.level}
                          </span>
                          <button
                            onClick={() => handleCopyWord(item)}
                            className="p-1 rounded-md text-[#94a3b8] hover:text-white transition-colors"
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
                            className="w-full py-1.5 px-3 rounded-lg bg-[#070a0f] hover:bg-[#141d2e] border border-dashed border-[#ffb800]/40 text-xs font-semibold text-[#ffdca1] flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Eye className="w-3 h-3 text-[#ffb800]" />
                            <span>Kliknij, aby odkryć znaczenie</span>
                          </button>
                        ) : (
                          <p className="text-sm font-semibold text-[#ffdca1]">
                            {item.translation}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Przykład i Pułapka CKE */}
                    {isRevealed && (
                      <div className="space-y-2 pt-2 border-t border-[#141d2e] text-xs">
                        <div className="bg-[#070a0f]/60 p-2.5 rounded-lg border border-[#141d2e] space-y-1">
                          <p className="text-white italic leading-relaxed">
                            "{item.exampleEn}"
                          </p>
                          <p className="text-[#94a3b8] text-[11px]">
                            {item.examplePl}
                          </p>
                        </div>

                        {item.collocations && item.collocations.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider">Kolokacje:</span>
                            {item.collocations.map((c, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-[#070a0f] border border-[#141d2e] text-[#dfe2f1]">
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
        <footer className="p-3 border-t border-[#141d2e] bg-[#0e1522] flex items-center justify-between text-xs text-[#94a3b8]">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#ffdca1]" />
            Wymagania leksykalne CKE Formuła 2023
          </span>
          <span className="text-[#ffdca1] font-medium">
            Pokazano: {filteredWords.length} słówek
          </span>
        </footer>
      </div>
    </div>
  );
};
