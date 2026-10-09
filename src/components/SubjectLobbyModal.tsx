import React from 'react';
import { BookOpen, Calculator, Globe, Dna, Award, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { SubjectId } from '../types/maturaTypes';

interface SubjectLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubject: SubjectId;
  onSelectSubject: (subject: SubjectId) => void;
  polishStats?: { total: number; epochs: number; lektury: number };
  mathStats?: { total: number; topics: number };
}

export const SubjectLobbyModal: React.FC<SubjectLobbyModalProps> = ({
  isOpen,
  onClose,
  currentSubject,
  onSelectSubject,
  polishStats,
  mathStats,
}) => {
  if (!isOpen) return null;

  const subjects = [
    {
      id: 'polski' as SubjectId,
      name: 'Język Polski',
      icon: BookOpen,
      badge: 'Formuła 2023 CKE',
      color: 'from-rose-500 to-amber-500',
      activeColor: 'border-amber-500 bg-amber-500/10 text-amber-300',
      description: 'Zeszyt 1 (Język w użyciu + Test historycznoliteracki) oraz Zeszyt 2 (Wypracowanie i notatka syntetyzująca).',
      stats: polishStats?.total
        ? `${polishStats.total}+ zadań • ${polishStats.epochs || 11} epok • Lektury z gwiazdką`
        : '1056+ zadań • 11 epok • Lektury z gwiazdką',
      available: true,
      features: [
        'Trenażer notatki syntetyzującej (60–90 słów)',
        'Epoki od Antyku do Współczesności wg wag CKE',
        'Wykrywacz błędów kardynalnych (0/35 pkt)',
        'Symulator arkusza CKE 240 minut (60 pkt)'
      ]
    },
    {
      id: 'matematyka' as SubjectId,
      name: 'Matematyka',
      icon: Calculator,
      badge: 'Poziom Podstawowy',
      color: 'from-amber-500 to-orange-500',
      activeColor: 'border-amber-500 bg-amber-500/10 text-amber-400',
      description: 'Kompletna baza zadań, oficjalne karty wzorów CKE, wbudowany kalkulator oraz symulator egzaminu.',
      stats: mathStats?.total
        ? `${mathStats.total} zadań • ${mathStats.topics || 15} działów • Karty Wzorów`
        : '1500 zadań • 15 działów • Karta wzorów',
      available: true,
      features: [
        'Zadania zamknięte i kodowane',
        'Oficjalne tablice matematyczne CKE',
        'Wbudowany brudnopis i kalkulator',
        'Symulator arkusza z natychmiastowym wynikiem'
      ]
    },
    {
      id: 'angielski' as SubjectId,
      name: 'Język Angielski',
      icon: Globe,
      badge: 'Formuła 2023 CKE',
      color: 'from-amber-500 to-orange-500',
      activeColor: 'border-amber-500 bg-amber-500/10 text-amber-300',
      description: 'Czytanie ze zrozumieniem, znajomość środków językowych (Use of English) oraz wypowiedź pisemna (e-mail, wpis na blog).',
      stats: '15 działów • 4 filary CKE • 60 pkt',
      available: true,
      features: [
        'Reading comprehension & Listening',
        'Gramatyka i transformacje zdań',
        'Kreator wypowiedzi pisemnych',
        'Zadania z kluczem odpowiedzi CKE'
      ]
    },
    {
      id: 'biologia' as SubjectId,
      name: 'Biologia',
      icon: Dna,
      badge: 'W planach',
      color: 'from-emerald-500 to-teal-500',
      activeColor: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
      description: 'Zadania doświadczalne, analiza schematów, genetyka, fizjologia i ekologia wg wymagań maturalnych.',
      stats: 'Baza w przygotowaniu',
      available: false,
      features: [
        'Hipotezy i próby badawcze',
        'Krzyżówki genetyczne',
        'Klucze odpowiedzi CKE'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-surface-card border border-surface-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modala */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border bg-surface-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary tracking-tight">Centralne Lobby Maturalne</h2>
              <p className="text-xs text-text-secondary">Wybierz przedmiot, z którego chcesz przygotowywać się do matury</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Zamknij lobby"
            title="Zamknij lobby"
            className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-card-hover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista Przedmiotów */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((sub) => {
              const Icon = sub.icon;
              const isSelected = currentSubject === sub.id;

              return (
                <div
                  key={sub.id}
                  onClick={() => {
                    if (sub.available) {
                      onSelectSubject(sub.id);
                      onClose();
                    }
                  }}
                  className={`relative p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                    sub.available
                      ? isSelected
                        ? 'border-amber-500/80 bg-amber-500/10 shadow-lg shadow-amber-500/10 cursor-pointer ring-1 ring-amber-500/40'
                        : 'border-surface-border bg-surface-card-hover/40 hover:border-surface-border hover:bg-surface-card-hover cursor-pointer'
                      : 'border-surface-border/50 bg-surface-card/40 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${sub.color} text-white shadow-md`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-text-primary flex items-center gap-2">
                            {sub.name}
                            {isSelected && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">
                                Aktywny
                              </span>
                            )}
                          </h3>
                          <span className="text-xs text-text-secondary">{sub.badge}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-text-secondary mb-3 leading-relaxed">{sub.description}</p>

                    <div className="space-y-1.5 mb-4">
                      {sub.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-surface-border flex items-center justify-between mt-auto">
                    <span className="text-[11px] text-text-secondary font-medium">{sub.stats}</span>
                    {sub.available ? (
                      <button
                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-surface-bg shadow-md shadow-amber-500/20'
                            : 'bg-surface-card-hover text-text-primary hover:bg-amber-500 hover:text-surface-bg'
                        }`}
                      >
                        {isSelected ? 'Ucz się teraz' : 'Przełącz'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[11px] px-2.5 py-1 rounded bg-surface-card-hover text-text-muted font-medium">
                        Dostępne wkrótce
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stopka z informacją o Formule 2023 */}
        <div className="px-6 py-3 bg-surface-bg/80 border-t border-surface-border flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Wszystkie materiały są w 100% zgodne z oficjalnymi wymaganiami CKE Formuła 2023.</span>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
};
