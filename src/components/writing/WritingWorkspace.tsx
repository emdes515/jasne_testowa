import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Lock, 
  CheckSquare, 
  Square, 
  BookMarked, 
  Copy, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  ShieldCheck, 
  Zap, 
  Clock, 
  AlertCircle,
  Loader2,
  Send,
  Eye
} from 'lucide-react';
import { triggerHaptic } from '../../utils';
import { CkeExaminerReport, WritingEvaluationData } from './CkeExaminerReport';

export interface WritingWorkspaceProps {
  taskId: string;
  taskTitle?: string;
  taskQuestion: string;
  contextText?: string;
  subQuestions?: string[];
  maxPoints?: number;
  subject?: 'angielski' | 'polski' | 'matematyka';
  studentText: string;
  onChangeText: (text: string) => void;
  onEvaluate: () => void;
  isEvaluating?: boolean;
  isPro?: boolean;
  onOpenProModal?: () => void;
  evaluation?: WritingEvaluationData | null;
  onResetEvaluation?: () => void;
  onContinue?: () => void;
}

const DEMO_ENGLISH_EVAL: WritingEvaluationData = {
  score: 11,
  maxPoints: 12,
  isPassed: true,
  gradeTitle: "11 / 12 PKT • Wzorcowa realizacja wypowiedzi CKE",
  summary: "Praca znakomicie realizuje wszystkie 4 podpunkty polecenia maturalnego. Wypowiedź liczy 112 słów (idealny zakres 80–130 słów). Styl i rejestr są spójne i naturalne dla korespondencji nieformalnej. Zauważono jeden drobny błąd przyimkowy w 3. akapicie.",
  mentorComment: "Świetna robota! Wypowiedź brzmi naturalnie, a przejścia logiczne między akapitami są płynne. Aby zdobyć pełne 12/12 pkt, zwróć uwagę na kolokację przyimkową 'depend on' zamiast 'depend of'.",
  wordCountStats: {
    totalWords: 112,
    minRequired: 80,
    maxRecommended: 130,
    status: 'OPTIMAL'
  },
  criteriaBreakdown: {
    content: {
      score: 5,
      max: 5,
      comment: "Wszystkie 4 podpunkty polecenia zostały odniesione i szczegółowo rozwinięte zgodnie z zasadą dwuelementowego rozwinięcia CKE.",
      bulletPointsAnalysis: [
        { pointIndex: 1, label: "Powód wyboru roweru", status: 'DEVELOPED', feedback: "Wyjaśniono wybór roweru z dwoma konkretnymi argumentami (pogoda i chęć aktywnego wypoczynku w naturze)." },
        { pointIndex: 2, label: "Opis odwiedzonego miejsca", status: 'DEVELOPED', feedback: "Opisano zabytkowy młyn wodny z XVIII wieku wraz ze szczegółem o kole wodnym." },
        { pointIndex: 3, label: "Problem techniczny i rozwiązanie", status: 'DEVELOPED', feedback: "Przedstawiono zerwany łańcuch rowerowy oraz pomoc miejscowego rolnika." },
        { pointIndex: 4, label: "Propozycja wspólnej wycieczki i termin", status: 'DEVELOPED', feedback: "Zaproponowano wspólny wyjazd w lipcu i wskazano konkretny drugi weekend." }
      ]
    },
    cohesion: {
      score: 2,
      max: 2,
      comment: "Układ tekstu jest przejrzysty, zastosowano naturalne akapity oraz łączniki zdań (Unfortunately, Along the trail, What about)."
    },
    range: {
      score: 3,
      max: 3,
      comment: "Bogaty i zróżnicowany zasób leksykalny na poziomie B1+ (watermill, countryside, snapped, in action)."
    },
    accuracy: {
      score: 1,
      max: 2,
      comment: "Jeden drobny błąd rekcji przyimkowej: użyto 'depended of' zamiast 'depended on'."
    }
  },
  annotatedSentences: [
    {
      originalText: "I decided to go by bike because the weather was great and it depended of my free time.",
      errorType: "GRAMMAR",
      explanation: "Typowy błąd kalki językowej z polskiego. Czasownik 'depend' łączy się wyłącznie z przyimkiem 'on' (depend on), nigdy 'of'.",
      suggestedCorrection: "I decided to go by bike because the weather was great and it depended on my free time."
    }
  ],
  modelImprovement: {
    before: "I had a problem with my bike. The chain was broken. A farmer helped me fix it.",
    after: "Unfortunately, halfway through the trip my chain snapped, but a friendly local farmer immediately helped me repair it with his tools.",
    explanation: "Zastąpienie prostych zdań współrzędnych bogatszym słownictwem (snapped, repair) i łącznikiem narracyjnym (halfway through the trip) podnosi notę za zakres środków językowych z 2/3 na 3/3 pkt."
  },
  strengths: [
    "Wzorcowa realizacja wszystkich 4 kropek z rozwinięciem (5/5 pkt)",
    "Idealna objętość: 112 słów mieści się w optimum 80–130 słów CKE",
    "Naturalny, nieformalny ton z prawidłowym otwarciem i podpisem XYZ"
  ],
  errors: [
    "Rekcja przyimkowa: 'depend of' -> 'depend on'"
  ],
  suggestion: "Warto zapamiętać stałą kolokację: It depends on... (Zależy od...). Na maturze to jedna z najczęstszych pułapek egzaminacyjnych!",
  hintForNextAttempt: "Przy kolejnym zadaniu pamiętaj o użyciu co najmniej jednego zdania złożonego z 'Although' lub 'Even though'."
};

const DEMO_POLISH_EVAL: WritingEvaluationData = {
  score: 31,
  maxPoints: 35,
  isPassed: true,
  gradeTitle: "31 / 35 PKT • Bardzo dobre wypracowanie maturalne",
  summary: "Praca w pełni realizuje temat maturalny, stawia jasną tezę we wstępie oraz konsekwentnie rozwija argumentację. Odwołano się poprawnie do lektury obowiązkowej (Lalka B. Prusa) oraz innego utworu literackiego (Zbrodnia i kara F. Dostojewskiego). Objętość: 365 słów (wymóg min. 300 słów spełniony).",
  mentorComment: "Znakomity poziom erudycyjny i logiczny. Praca cechuje się dojrzałym językiem i trafnym doborem kontekstów historycznoliterackich. Drobne potknięcie interpunkcyjne w akapicie drugim nie wpłynęło na odbiór całości.",
  wordCountStats: {
    totalWords: 365,
    minRequired: 300,
    status: 'OPTIMAL'
  },
  criteriaBreakdown: {
    content: {
      score: 14,
      max: 16,
      comment: "Trafne sformułowanie stanowiska, pogłębiona analiza motywacji bohaterów, poprawny kontekst społeczno-filozoficzny."
    },
    cohesion: {
      score: 5,
      max: 5,
      comment: "Kompozycja trójdzielna, wyraźne akapity, spójne przejścia między lekturami za pomocą zdań wiążących."
    },
    range: {
      score: 6,
      max: 7,
      comment: "Bogate słownictwo erudycyjne (determinizm, idealizm, alienacja, aksjologia)."
    },
    accuracy: {
      score: 6,
      max: 7,
      comment: "Dwa drobne błędy interpunkcyjne (brak przecinka przed imiesłowem przysłówkowym)."
    }
  },
  annotatedSentences: [
    {
      originalText: "Wokulski dążąc do zdobycia majątku i pozycji zapomniał o własnych ideałach.",
      errorType: "PUNCTUATION",
      explanation: "Imiesłowowy równoważnik zdania ('dążąc do zdobycia majątku i pozycji') musi być obustronnie wydzielony przecinkami.",
      suggestedCorrection: "Wokulski, dążąc do zdobycia majątku i pozycji, zapomniał o własnych ideałach."
    }
  ],
  modelImprovement: {
    before: "Raskolnikow zabił lichwiarkę bo myślał że jest niezwykłym człowiekiem.",
    after: "Zbrodnia Raskolnikowa nie wynikała ze zwykłej chęci zysku, lecz stanowiła tragiczny eksperyment na własnej moralności, wynikający z wyznawania teorii o ludziach 'niezwykłych'.",
    explanation: "Pogłębienie interpretacji psychologicznej i zastąpienie potocznego uzasadnienia terminologią literacką podnosi ocenę argumentacji."
  },
  strengths: [
    "Precyzyjne i dojrzałe sformułowanie tezy we wstępie",
    "Funkcjonalne wykorzystanie lektury z gwiazdką (Lalka)",
    "Brak błędów rzeczowych i kardynalnych"
  ],
  errors: [
    "Dwa błędy interpunkcyjne przy imiesłowach przysłówkowych"
  ],
  suggestion: "Zwracaj szczególną uwagę na wydzielanie przecinkami imiesłowów zakończonych na -ąc, -wszy, -łszy.",
  hintForNextAttempt: "W zakończeniu warto dodać jedno zdanie o uniwersalnym wymiarze problemu we współczesnym świecie."
};

export const WritingWorkspace: React.FC<WritingWorkspaceProps> = ({
  taskId,
  taskTitle,
  taskQuestion,
  contextText,
  subQuestions = [],
  maxPoints = 12,
  subject = 'angielski',
  studentText,
  onChangeText,
  onEvaluate,
  isEvaluating = false,
  isPro = false,
  onOpenProModal,
  evaluation = null,
  onResetEvaluation,
  onContinue
}) => {
  const [showPhraseBank, setShowPhraseBank] = useState<boolean>(false);
  const [activePhraseCategory, setActivePhraseCategory] = useState<string>('linking');
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);
  const [checkedBulletPoints, setCheckedBulletPoints] = useState<Record<number, boolean>>({});
  const [isSavedLocally, setIsSavedLocally] = useState<boolean>(false);
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Determine writing task type and target word limits
  const isEnglishWriting = subject === 'angielski';
  const isPolishEssay = subject === 'polski' && maxPoints >= 30;
  const isPolishSynthesis = subject === 'polski' && maxPoints <= 5;

  const minWordLimit = isPolishEssay ? 300 : isPolishSynthesis ? 60 : 80;
  const maxWordLimit = isPolishSynthesis ? 90 : isEnglishWriting ? 130 : undefined;

  // Real-time word counter
  const words = studentText.trim() ? studentText.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  // LocalStorage autosave
  useEffect(() => {
    const storageKey = `jasne_writing_draft_${taskId}`;
    if (!studentText) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        onChangeText(saved);
        setIsSavedLocally(true);
      }
    } else {
      const timer = setTimeout(() => {
        localStorage.setItem(storageKey, studentText);
        setIsSavedLocally(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [studentText, taskId, onChangeText]);

  // Extract or synthesize 4 bullet points for English Task 12
  const bulletPoints = React.useMemo(() => {
    if (subQuestions && subQuestions.length > 0) {
      return subQuestions;
    }
    // Parse from taskQuestion if contains bullet points or dashes
    const lines = taskQuestion.split('\n').filter(l => l.trim().startsWith('•') || l.trim().startsWith('-') || /^\d+\./.test(l.trim()));
    if (lines.length >= 3) {
      return lines.map(l => l.replace(/^[•\-\d.]\s*/, '').trim());
    }
    return [
      'Wyjaśnij powód lub okoliczności sytuacji',
      'Opisz szczegóły wydarzenia lub problemu',
      'Przedstaw swoje odczucia lub reakcję',
      'Zaproponuj rozwiązanie lub zadaj pytanie odbiorcy'
    ];
  }, [taskQuestion, subQuestions]);

  const toggleBulletPoint = (idx: number) => {
    triggerHaptic('light');
    setCheckedBulletPoints(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const insertPhrase = (phrase: string) => {
    triggerHaptic('success');
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = studentText.substring(0, start);
      const after = studentText.substring(end);
      const needSpaceBefore = before.length > 0 && !before.endsWith(' ') && !before.endsWith('\n');
      const formatted = `${needSpaceBefore ? ' ' : ''}${phrase} `;
      onChangeText(before + formatted + after);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + formatted.length, start + formatted.length);
      }, 50);
    } else {
      onChangeText(studentText ? `${studentText} ${phrase}` : phrase);
    }

    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 1500);
  };

  // Word count status and color
  const getWordCountStatus = () => {
    if (wordCount === 0) return { label: 'Zacznij pisać', color: 'text-text-muted', barColor: 'bg-surface-border' };
    if (wordCount < minWordLimit) {
      return { 
        label: `Za mało słów (${wordCount}/${minWordLimit})`, 
        color: 'text-amber-400', 
        barColor: 'bg-amber-400' 
      };
    }
    if (maxWordLimit && wordCount > maxWordLimit) {
      return { 
        label: `Powyżej limitu (${wordCount}/${maxWordLimit})`, 
        color: 'text-amber-300', 
        barColor: 'bg-amber-400' 
      };
    }
    return { 
      label: `Idealny zakres CKE (${wordCount} słów)`, 
      color: 'text-emerald-400', 
      barColor: 'bg-emerald-400' 
    };
  };

  const countStatus = getWordCountStatus();
  const progressPercent = Math.min(100, Math.round((wordCount / (maxWordLimit || minWordLimit * 1.2)) * 100));

  // Bank of phrases categorized
  const phraseCategories = isEnglishWriting ? [
    {
      id: 'linking',
      title: 'Łączniki zdań (Linking Words)',
      phrases: ['However,', 'Furthermore,', 'In addition,', 'On the other hand,', 'Therefore,', 'As a result,', 'For instance,', 'Although']
    },
    {
      id: 'openers',
      title: 'Otwarcie listu / bloga',
      phrases: [
        'How are you doing?',
        'I am writing to tell you that...',
        'It was great to hear from you!',
        'You won’t believe what happened!'
      ]
    },
    {
      id: 'opinions',
      title: 'Wyrażanie opinii & emocji',
      phrases: [
        'In my opinion,',
        'From my point of view,',
        'I was really disappointed because...',
        'I strongly believe that...'
      ]
    },
    {
      id: 'closers',
      title: 'Zakończenie i pożegnanie',
      phrases: [
        'Let me know what you think.',
        'Write back soon!',
        'That’s all for now.',
        'I look forward to hearing from you.'
      ]
    }
  ] : [
    {
      id: 'intro',
      title: 'Wprowadzenie tezy i problemu',
      phrases: [
        'Rozważając powyższy problem, warto postawić tezę, że...',
        'Literatura od zarania dziejów stawia pytanie o...',
        'Zagadnienie to ujawnia złożoność ludzkiej natury...'
      ]
    },
    {
      id: 'argument',
      title: 'Rozwinięcie i odwołanie do lektur',
      phrases: [
        'Znakomitym potwierdzeniem tej myśli jest postawa bohatera...',
        'Warto przywołać w tym miejscu kontekst utworu...',
        'Pisarz ukazuje w swoim dziele dramatyczny konflikt pomiędzy...',
        'Świadczy to o głębokiej przemianie wewnętrznej postaci...'
      ]
    },
    {
      id: 'synthesis',
      title: 'Synteza i podsumowanie',
      phrases: [
        'Reasumując powyższe rozważania, należy skonstatować, że...',
        'Zarówno doświadczenia literackie, jak i konteksty kulturowe dowodzą, że...',
        'Ostatecznym wnioskiem płynącym z analizy obu dzieł jest...'
      ]
    }
  ];

  // If already evaluated or in demo mode, render the detailed CKE Examiner Report
  const activeEval = evaluation || (isDemoActive ? (isEnglishWriting ? DEMO_ENGLISH_EVAL : DEMO_POLISH_EVAL) : null);
  const activeStudentAnswer = evaluation 
    ? studentText 
    : (isDemoActive 
        ? (isEnglishWriting 
            ? "Hi Sam,\nHow are you? I've just come back from a cycling trip. I decided to go by bike because the weather was great and it depended of my free time. Along the trail, I visited an 18th-century wooden watermill. Halfway through my chain snapped, but a friendly local farmer helped me fix it. We should definitely go cycling together in July! What about the second weekend?\nWrite back soon,\nXYZ" 
            : "Wokulski dążąc do zdobycia majątku i pozycji zapomniał o własnych ideałach. Z kolei Raskolnikow zabił lichwiarkę bo myślał że jest niezwykłym człowiekiem.") 
        : studentText);

  if (activeEval) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-4">
        {isDemoActive && !evaluation && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-bold text-amber-300">
                TRYB POKAZOWY (DEMO): Przykładowa ocena wypracowania maturalnego CKE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  setIsDemoActive(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold transition cursor-pointer"
              >
                Wróć do edytora
              </button>
              {onOpenProModal && (
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('medium');
                    onOpenProModal();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-[#070A0F] font-black transition cursor-pointer flex items-center gap-1.5"
                >
                  <Lock size={12} />
                  <span>Aktywuj PRO</span>
                </button>
              )}
            </div>
          </div>
        )}
        <CkeExaminerReport
          evaluation={activeEval}
          studentAnswer={activeStudentAnswer}
          onRetryOrEdit={isDemoActive ? () => setIsDemoActive(false) : onResetEvaluation}
          onContinue={onContinue}
          taskTitle={taskTitle}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* 1. KARTA POLECENIA ZADANIA */}
      <div className="p-5 sm:p-6 rounded-3xl bg-surface-card border border-surface-border shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {isEnglishWriting ? 'Zadanie 12 CKE • Wypowiedź Pisemna' : isPolishEssay ? 'Część 3 CKE • Wypracowanie' : 'Część 1 CKE • Notatka Syntetyzująca'}
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/25">
            Maks. {maxPoints} pkt
          </span>
        </div>

        {taskTitle && (
          <h2 className="text-lg sm:text-xl font-black text-white font-display">
            {taskTitle}
          </h2>
        )}

        {contextText && (
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-surface-border text-sm text-text-secondary leading-relaxed font-serif">
            {contextText}
          </div>
        )}

        <div className="text-sm sm:text-base text-text-primary leading-relaxed whitespace-pre-wrap font-sans">
          {taskQuestion}
        </div>

        {/* Interaktywna check-lista 4 kropek dla języka angielskiego */}
        {isEnglishWriting && bulletPoints.length > 0 && (
          <div className="pt-3 border-t border-surface-border/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span className="font-bold text-white flex items-center gap-1.5">
                <CheckSquare size={14} className="text-primary" />
                Matryca 4 podpunktów CKE (odhaczaj w trakcie pisania):
              </span>
              <span>{Object.values(checkedBulletPoints).filter(Boolean).length} / {bulletPoints.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {bulletPoints.map((bp, idx) => {
                const isChecked = Boolean(checkedBulletPoints[idx]);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleBulletPoint(idx)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left text-xs transition cursor-pointer active:scale-98 ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                        : 'bg-surface-card-hover border-surface-border text-text-secondary hover:text-white'
                    }`}
                  >
                    <span className="mt-0.5 text-primary shrink-0">
                      {isChecked ? <CheckSquare size={16} className="text-emerald-400" /> : <Square size={16} className="text-text-muted" />}
                    </span>
                    <span className="leading-snug">
                      <strong>Kropka {idx + 1}:</strong> {bp}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. GŁÓWNY WARSZTAT PISARSKI / EDYTOR */}
      <div className="p-5 sm:p-6 rounded-3xl bg-surface-card border border-surface-border shadow-2xl space-y-4">
        {/* Pasek narzędziowy nad edytorem: Licznik słów + Bank zwrotów */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Aktywny wskaźnik słów CKE */}
          <div className="space-y-1.5 flex-1 max-w-sm">
            <div className="flex items-center justify-between text-xs">
              <span className={`font-bold flex items-center gap-1.5 ${countStatus.color}`}>
                <FileText size={14} />
                {countStatus.label}
              </span>
              <span className="text-[11px] text-text-muted">
                Wymóg: {minWordLimit}{maxWordLimit ? `–${maxWordLimit}` : '+'} słów
              </span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-surface-elevated overflow-hidden border border-surface-border/50">
              <div
                className={`h-full rounded-full transition-all duration-300 ${countStatus.barColor}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Przycisk Banku Zwrotów */}
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              setShowPhraseBank(prev => !prev);
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer shrink-0 ${
              showPhraseBank
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-surface-elevated border-surface-border text-text-secondary hover:text-white'
            }`}
          >
            <BookMarked size={14} />
            <span>Bank Złotych Zwrotów</span>
            {showPhraseBank ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Rozwijany Bank Złotych Zwrotów */}
        {showPhraseBank && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-surface-card-hover to-surface-card border border-primary/20 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {phraseCategories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActivePhraseCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activePhraseCategory === cat.id
                      ? 'bg-primary text-[#070A0F]'
                      : 'bg-surface-elevated text-text-secondary hover:text-white'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {(phraseCategories.find(c => c.id === activePhraseCategory)?.phrases || []).map((phrase, pIdx) => {
                const isJustCopied = copiedPhrase === phrase;
                return (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => insertPhrase(phrase)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-primary/15 border border-surface-border hover:border-primary/40 text-text-primary text-xs font-medium transition cursor-pointer active:scale-95 group"
                    title="Kliknij, aby wstawić do tekstu"
                  >
                    <span>{phrase}</span>
                    <span className="text-text-muted group-hover:text-primary transition-colors">
                      {isJustCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-text-muted italic">
              💡 Kliknij dowolny zwrot, aby wstawić go bezpośrednio do Twojego wypracowania.
            </p>
          </div>
        )}

        {/* Pole tekstowe edytora */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={studentText}
            onChange={(e) => onChangeText(e.target.value)}
            disabled={isEvaluating}
            placeholder={
              isEnglishWriting
                ? "Napisz swoją wypowiedź po angielsku (Dear Sam, / Hi everyone! ...). Pamiętaj o rozwinięciu wszystkich 4 punktów polecenia."
                : isPolishEssay
                  ? "Wpisz swoje wypracowanie maturalne (min. 300 słów). Zadbaj o wstęp z tezą, akapity argumentacyjne z lekturą obowiązkową i kontekstem oraz syntezę na koniec."
                  : "Napisz zwięzłą notatkę syntetyzującą (60–90 słów) przedstawiającą wspólny problem i stanowiska obu autorów."
            }
            className="w-full min-h-[260px] sm:min-h-[320px] p-4 sm:p-5 rounded-2xl bg-[#070A0F]/90 border border-surface-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-white placeholder-text-muted font-sans text-sm sm:text-base leading-relaxed resize-y transition shadow-inner outline-none select-text"
          />

          {isSavedLocally && (
            <span className="absolute bottom-3 right-4 text-[10px] font-semibold text-text-muted/60 pointer-events-none flex items-center gap-1">
              <Check size={11} className="text-emerald-400" />
              Szkic zapisany w pamięci
            </span>
          )}
        </div>

        {/* 3. DOLNY PANEL AKCJI / BRAMKA PRO */}
        <div className="pt-3 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-text-muted space-y-0.5">
            <span className="flex items-center gap-1.5 text-text-secondary font-medium">
              <ShieldCheck size={14} className="text-primary" />
              Ocena adaptacyjna CKE (0 serc ryzyka – piszesz bez obaw o utratę żyć)
            </span>
            <span>
              Audyt obejmuje 4 oficjalne kryteria CKE, oznaczenie błędów i wzorzec 100%.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isPro ? (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('medium');
                  onEvaluate();
                }}
                disabled={isEvaluating || wordCount < 10}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs sm:text-sm transition cursor-pointer shadow-xl active:scale-95 ${
                  isEvaluating || wordCount < 10
                    ? 'bg-surface-elevated text-text-muted cursor-not-allowed border border-surface-border'
                    : 'bg-primary hover:bg-primary/90 text-[#070A0F] shadow-primary/20'
                }`}
              >
                {isEvaluating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Egzaminator CKE ocenia...</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    <span>Oceń przez AI CKE</span>
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    setIsDemoActive(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 text-xs font-bold text-text-secondary hover:text-white transition cursor-pointer"
                  title="Zobacz przykładowy oficjalny raport egzaminatora CKE"
                >
                  <Eye size={14} className="text-primary" />
                  <span>Podgląd raportu CKE</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('medium');
                    if (onOpenProModal) onOpenProModal();
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#070A0F] font-black text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
                >
                  <Lock size={15} />
                  <span>Odblokuj Audyt CKE (PRO)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
