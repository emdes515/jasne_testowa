import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  BookOpen, 
  RotateCcw, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  FileText,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { triggerHaptic } from '../../utils';

export interface AnnotatedSentence {
  originalText: string;
  errorType: 'GRAMMAR' | 'VOCABULARY' | 'PUNCTUATION' | 'SPELLING' | 'STYLE' | 'COHESION' | 'LITERARY_FACT' | 'LOGIC';
  explanation: string;
  suggestedCorrection: string;
}

export interface BulletPointAnalysis {
  pointIndex: number;
  label: string;
  status: 'DEVELOPED' | 'MENTIONED' | 'MISSING';
  feedback: string;
}

export interface CriteriaBreakdownItem {
  score: number;
  max: number;
  comment?: string;
  bulletPointsAnalysis?: BulletPointAnalysis[];
}

export interface WordCountStats {
  totalWords: number;
  minRequired: number;
  maxRecommended?: number;
  status: 'OPTIMAL' | 'TOO_SHORT' | 'TOO_LONG';
}

export interface ModelImprovement {
  before: string;
  after: string;
  explanation: string;
}

export interface WritingEvaluationData {
  score: number;
  maxPoints: number;
  isPassed: boolean;
  gradeTitle?: string;
  summary?: string;
  mentorComment?: string;
  strengths?: string[];
  errors?: string[];
  ckeFeedback?: string;
  suggestion?: string;
  hintForNextAttempt?: string;
  wordCountStats?: WordCountStats;
  criteriaBreakdown?: Record<string, CriteriaBreakdownItem>;
  annotatedSentences?: AnnotatedSentence[];
  modelImprovement?: ModelImprovement;
}

export interface CkeExaminerReportProps {
  evaluation: WritingEvaluationData;
  studentAnswer: string;
  onRetryOrEdit?: () => void;
  onContinue?: () => void;
  taskTitle?: string;
}

export const CkeExaminerReport: React.FC<CkeExaminerReportProps> = ({
  evaluation,
  studentAnswer,
  onRetryOrEdit,
  onContinue,
  taskTitle
}) => {
  const [selectedAnnotationIndex, setSelectedAnnotationIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'report' | 'text' | 'criteria'>('report');

  const {
    score,
    maxPoints,
    isPassed,
    gradeTitle,
    summary,
    mentorComment,
    strengths = [],
    errors = [],
    ckeFeedback,
    suggestion,
    wordCountStats,
    criteriaBreakdown = {},
    annotatedSentences = [],
    modelImprovement
  } = evaluation;

  const scorePercent = maxPoints > 0 ? Math.round((score / maxPoints) * 100) : 0;

  const getScoreBadgeColor = () => {
    if (scorePercent >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (scorePercent >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  const getErrorTypeBadge = (type: string) => {
    switch (type) {
      case 'GRAMMAR':
        return { label: 'Gramatyka', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' };
      case 'VOCABULARY':
        return { label: 'Słownictwo', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'PUNCTUATION':
        return { label: 'Interpunkcja', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
      case 'SPELLING':
        return { label: 'Ortografia', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
      case 'STYLE':
      case 'COHESION':
        return { label: 'Styl i Spójność', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      case 'LITERARY_FACT':
        return { label: 'Fakt literacki', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      default:
        return { label: 'Uwaga językowa', color: 'bg-surface-elevated text-text-secondary border-surface-border' };
    }
  };

  // Helper to render student text with interactive highlights
  const renderInteractiveText = () => {
    if (!studentAnswer) return <p className="text-text-muted italic">Brak tekstu do wyświetlenia.</p>;
    if (!annotatedSentences || annotatedSentences.length === 0) {
      return (
        <div className="p-4 rounded-xl bg-surface-card border border-surface-border text-text-primary leading-relaxed whitespace-pre-wrap font-sans text-sm">
          {studentAnswer}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-surface-border text-text-primary leading-relaxed text-sm sm:text-base font-sans select-text">
          {annotatedSentences.map((ann, idx) => {
            const isSelected = selectedAnnotationIndex === idx;
            const badge = getErrorTypeBadge(ann.errorType);
            return (
              <span
                key={idx}
                onClick={() => {
                  triggerHaptic('light');
                  setSelectedAnnotationIndex(isSelected ? null : idx);
                }}
                className={`cursor-pointer transition-all duration-200 inline rounded-sm px-1 py-0.5 mx-0.5 border-b-2 ${
                  isSelected
                    ? 'bg-primary/20 border-primary text-white font-medium ring-2 ring-primary/40'
                    : 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-400 text-amber-100'
                }`}
                title="Kliknij, aby zobaczyć uwagę egzaminatora"
              >
                {ann.originalText}
                <span className={`text-[10px] uppercase font-bold ml-1 px-1 py-0.2 rounded border ${badge.color}`}>
                  {badge.label}
                </span>
              </span>
            );
          })}
        </div>

        {/* Selected annotation drawer */}
        {selectedAnnotationIndex !== null && annotatedSentences[selectedAnnotationIndex] && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-surface-card to-surface-card-hover border border-primary/30 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Analiza egzaminatora: {getErrorTypeBadge(annotatedSentences[selectedAnnotationIndex].errorType).label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAnnotationIndex(null)}
                className="text-text-muted hover:text-white text-xs font-semibold px-2 py-0.5 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                Zamknij
              </button>
            </div>

            <p className="text-sm text-text-secondary mb-3 leading-relaxed">
              {annotatedSentences[selectedAnnotationIndex].explanation}
            </p>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col gap-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                Sugerowana poprawna wersja:
              </span>
              <p className="text-sm font-medium text-emerald-200">
                „{annotatedSentences[selectedAnnotationIndex].suggestedCorrection}”
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const criteriaLabels: Record<string, { title: string; defaultMax: number }> = {
    // English Writing 12 pkt
    content: { title: '1. Treść i realizacja 4 podpunktów', defaultMax: 5 },
    coherence: { title: '2. Spójność i logika wypowiedzi', defaultMax: 2 },
    vocabularyRange: { title: '3. Zakres środków językowych (B1/B1+)', defaultMax: 3 },
    correctness: { title: '4. Poprawność środków językowych', defaultMax: 2 },
    // Polish Essay 35 pkt
    formal: { title: 'I. Warunki formalne i brak błędu kardynalnego', defaultMax: 1 },
    literary_cultural: { title: 'II. Kompetencje literackie i kulturowe', defaultMax: 16 },
    composition: { title: 'III. Kompozycja tekstu i spójność', defaultMax: 7 },
    language_style: { title: 'IV. Język, styl i poprawność', defaultMax: 11 },
    // Polish Synthesis 4 pkt
    synthesis_content: { title: '1. Treść i synteza obu tekstów', defaultMax: 2 },
    language_correctness: { title: '3. Poprawność językowa i limit słów', defaultMax: 1 },
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 1. NAGŁÓWEK KARTY EGZAMINATORA */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-surface-card to-surface-card-hover border border-surface-border shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/25">
                <ShieldCheck size={14} />
                Oficjalny Raport CKE
              </span>
              {wordCountStats && (
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  wordCountStats.status === 'OPTIMAL'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                }`}>
                  <FileText size={13} />
                  {wordCountStats.totalWords} słów
                  {wordCountStats.status === 'OPTIMAL' ? ' (w normie CKE)' : ' (uwaga na limit)'}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
              {gradeTitle || `${score} / ${maxPoints} PKT – Raport Egzaminacyjny`}
            </h2>

            {summary && (
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
                {summary}
              </p>
            )}
          </div>

          {/* Główny widget punktacji */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-[#070A0F]/80 border border-surface-border shrink-0 text-center min-w-[150px] shadow-inner">
            <div className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-baseline justify-center gap-1">
              <span className={scorePercent >= 80 ? 'text-emerald-400' : scorePercent >= 50 ? 'text-primary' : 'text-rose-400'}>
                {score}
              </span>
              <span className="text-text-muted text-lg font-bold">/ {maxPoints}</span>
            </div>
            <span className={`mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getScoreBadgeColor()}`}>
              {scorePercent}% wyniku
            </span>
          </div>
        </div>

        {/* Zakładki nawigacyjne w raporcie */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-surface-border/60 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'report'
                ? 'bg-primary text-[#070A0F] shadow-sm'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            <Lightbulb size={15} />
            Podsumowanie i Wskazówki
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('criteria')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'criteria'
                ? 'bg-primary text-[#070A0F] shadow-sm'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            <Award size={15} />
            Podkryteria CKE
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'text'
                ? 'bg-primary text-[#070A0F] shadow-sm'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText size={15} />
            Tekst z Korektą ({annotatedSentences.length} uwag)
          </button>
        </div>
      </div>

      {/* 2. ZAKŁADKA 1: PODSUMOWANIE I WSKAZÓWKI */}
      {activeTab === 'report' && (
        <div className="space-y-6">
          {/* Komentarz Mentora */}
          {mentorComment && (
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-card border border-primary/20 relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
                    Głos Mentora CKE
                  </h3>
                  <p className="text-sm sm:text-base text-text-primary leading-relaxed font-sans">
                    {mentorComment}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Modelowe ulepszenie: Przed i Po */}
          {modelImprovement && modelImprovement.before && modelImprovement.after && (
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-card border border-surface-border space-y-3">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-amber-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">
                  Podnieś wynik na 100%: Modelowe Ulepszenie Zdania
                </h3>
              </div>
              <p className="text-xs text-text-muted">
                Zobacz, jak drobna zmiana słownictwa i składni podnosi dojrzałość wypowiedzi:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-2">
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                    Wersja w Twojej pracy:
                  </span>
                  <p className="text-sm text-text-primary italic">
                    „{modelImprovement.before}”
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Wzorcowa konstrukcja CKE:
                  </span>
                  <p className="text-sm text-emerald-200 font-medium">
                    „{modelImprovement.after}”
                  </p>
                </div>
              </div>

              {modelImprovement.explanation && (
                <p className="text-xs text-text-secondary mt-2 bg-white/[0.02] p-2.5 rounded-lg border border-surface-border/50">
                  💡 <strong>Dlaczego to działa lepiej:</strong> {modelImprovement.explanation}
                </p>
              )}
            </div>
          )}

          {/* Mocne strony i Błędy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strengths.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-emerald-500/20 space-y-2.5">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  Co zrobiłeś świetnie:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary">
                  {strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {errors.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-rose-500/20 space-y-2.5">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle size={15} />
                  Co wymaga poprawy:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary">
                  {errors.map((err, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{err}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Złota wskazówka CKE */}
          {(suggestion || ckeFeedback) && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
              <TrendingUp size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Złota rada egzaminatora CKE na maturę:
                </h4>
                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                  {suggestion || ckeFeedback}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. ZAKŁADKA 2: PODKRYTERIA CKE */}
      {activeTab === 'criteria' && (
        <div className="space-y-4">
          {Object.keys(criteriaBreakdown).length === 0 ? (
            <div className="p-6 rounded-2xl bg-surface-card border border-surface-border text-center text-text-muted">
              Brak szczegółowego podziału kryteriów dla tego typu zadania.
            </div>
          ) : (
            Object.entries(criteriaBreakdown).map(([key, itemRaw]) => {
              const item = itemRaw as any;
              const meta = criteriaLabels[key] || { title: key, defaultMax: item.max || 1 };
              const itemMax = item.max || meta.defaultMax;
              const percent = itemMax > 0 ? Math.round((item.score / itemMax) * 100) : 0;

              return (
                <div key={key} className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-sm font-bold text-white font-sans">
                      {meta.title}
                    </h4>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-base font-black text-primary font-display">
                        {item.score} / {itemMax} pkt
                      </span>
                    </div>
                  </div>

                  {/* Pasek postępu dla danego kryterium */}
                  <div className="w-full h-2 rounded-full bg-surface-elevated overflow-hidden border border-surface-border/50">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        percent >= 80 ? 'bg-emerald-400' : percent >= 50 ? 'bg-amber-400' : 'bg-rose-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {item.comment && (
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {item.comment}
                    </p>
                  )}

                  {/* Analiza 4 podpunktów polecenia (dla angielskiego Zad. 12) */}
                  {item.bulletPointsAnalysis && item.bulletPointsAnalysis.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-surface-border/40 space-y-2">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                        Szczegółowa realizacja 4 kropek polecenia:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.bulletPointsAnalysis.map((bp) => {
                          const statusConfig = {
                            DEVELOPED: { label: 'Rozwinięty (100%)', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
                            MENTIONED: { label: 'Tylko odniesiony', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
                            MISSING: { label: 'Brak odniesienia', badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30' }
                          }[bp.status] || { label: bp.status, badge: 'bg-surface-elevated text-text-muted' };

                          return (
                            <div key={bp.pointIndex} className="p-2.5 rounded-xl bg-surface-card-hover border border-surface-border/60 text-xs space-y-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-white">Kropka {bp.pointIndex}: {bp.label}</span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${statusConfig.badge}`}>
                                  {statusConfig.label}
                                </span>
                              </div>
                              <p className="text-text-secondary text-[11px] leading-snug">
                                {bp.feedback}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 4. ZAKŁADKA 3: INTERAKTYWNY TEKST Z KOREKTĄ */}
      {activeTab === 'text' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-text-muted px-1">
            <span>Kliknij podświetlone zdanie, aby poznać przyczynę błędu i sugerowaną poprawkę:</span>
            <span>{annotatedSentences.length} oznaczonych fragmentów</span>
          </div>
          {renderInteractiveText()}
        </div>
      )}

      {/* 5. PRZYCISKI AKCJI NA DOLE */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-surface-border">
        {onRetryOrEdit && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('medium');
              onRetryOrEdit();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-border hover:border-primary/50 text-text-secondary hover:text-white font-bold text-xs sm:text-sm transition cursor-pointer active:scale-95"
          >
            <RotateCcw size={16} />
            Popraw tekst w edytorze
          </button>
        )}

        {onContinue && (
          <button
            type="button"
            onClick={() => {
              triggerHaptic('success');
              onContinue();
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-[#070A0F] font-black text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-primary/20 active:scale-95 ml-auto"
          >
            Kontynuuj
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
