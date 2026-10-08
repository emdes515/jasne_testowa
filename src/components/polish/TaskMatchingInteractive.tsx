import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Zap, 
  RefreshCw, 
  GripVertical, 
  ArrowRight,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { PolishTask } from '../../types/maturaTypes';

interface TaskMatchingInteractiveProps {
  task: PolishTask;
  isSubmitted: boolean;
  onAnswerSubmit: (earnedPoints: number, answerText: string) => void;
  feedback?: { isCorrect: boolean; message: string } | null;
}

// Fallbackowe dystraktory zgodne z epokami CKE, jeśli zadanie nie ma zdefiniowanego własnego
const FALLBACK_DISTRACTORS_BY_EPOCH: Record<string, string[]> = {
  'Starożytność i Biblia': [
    'Wieczna tułaczka po zburzeniu Troi bez wsparcia bóstw opiekuńczych',
    'Zgoda na kompromis z tyranem w celu zachowania dóbr doczesnych'
  ],
  'Średniowiecze': [
    'Dążenie do sławy rycerskiej i bogactwa kosztem zbawienia wiecznego',
    'Bunt przeciw dogmatom Kościoła i gloryfikacja życia doczesnego'
  ],
  'Renesans': [
    'Całkowite odrzucenie nauk antycznych na rzecz ślepego fatalizmu',
    'Afirmacja samotniczego życia w ascezie z dala od spraw ojczyzny'
  ],
  'Barok': [
    'Pochwała trwałego ładu świata i niezmienności ludzkiej fortuny',
    'Płaski realizm pozbawiony metafor i figur konceptystycznych'
  ],
  'Oświecenie': [
    'Bezkrytyczna obrona liberum veto i tradycyjnego pijaństwa sarmackiego',
    'Odrzucenie edukacji i reform społecznych w imię mistycyzmu'
  ],
  'Romantyzm': [
    'Chłodna kalkulacja zysków i uległość wobec władzy carskiej',
    'Uznanie prymatu rozumu i empirii nad czuciem i wiarą'
  ],
  'Pozytywizm': [
    'Bezczynne marzycielstwo i rezygnacja z pracy u podstaw',
    'Arystokratyczna pogarda dla nauki, przemysłu i handlu'
  ],
  'Młoda Polska': [
    'Wspólny, zdyscyplinowany czyn zbrojny chłopów i panów zakończony triumfem',
    'Trzeźwy utylitaryzm i odrzucenie wszelkiej dekadenckiej nastrojowości'
  ],
  'Dwudziestolecie międzywojenne': [
    'Idealna realizacja mitu szklanych domów w odbudowanej Polsce',
    'Całkowita wolność jednostki od presji formy, maski i otoczenia'
  ],
  'Wojna i okupacja': [
    'Bezwzględne poszanowanie praw człowieka w warunkach lagru i getta',
    'Pasywna uległość z całkowitą wiarą w humanizm oprawców'
  ],
  'Współczesność': [
    'Ostateczne zwycięstwo tradycyjnego porządku nad absurdem i anarchią',
    'Całkowity brak zagrożenia ze strony totalitarnych manipulacji'
  ]
};

export const TaskMatchingInteractive: React.FC<TaskMatchingInteractiveProps> = ({
  task,
  isSubmitted,
  onAnswerSubmit,
  feedback
}) => {
  const originalPairs = useMemo(() => task.matchingPairs || [], [task.matchingPairs]);

  // Ustal dystraktor dla tego zadania
  const distractorText = useMemo(() => {
    if (task.distractors && task.distractors.length > 0) {
      return task.distractors[0];
    }
    const epochPool = task.epoch ? FALLBACK_DISTRACTORS_BY_EPOCH[task.epoch] : null;
    if (epochPool && epochPool.length > 0) {
      return epochPool[0];
    }
    return 'Postawa bierna: rezygnacja z walki o wartości moralne i uległość wobec okoliczności';
  }, [task.distractors, task.epoch]);

  // Inicjalizacja puli odpowiedzi (prawidłowe + 1 dystraktor), pomieszane
  const initialPool = useMemo(() => {
    const rights = originalPairs.map(p => p.right);
    const withDistractor = [...rights, distractorText];
    // Deterministic shuffle oparte na ID zadania
    return withDistractor.sort((a, b) => {
      const hashA = (a.length * 31 + a.charCodeAt(0)) % 100;
      const hashB = (b.length * 31 + b.charCodeAt(0)) % 100;
      return hashA - hashB;
    });
  }, [originalPairs, distractorText]);

  // Stany komponentu
  const [pairs, setPairs] = useState<Record<string, string>>({});
  const [availablePool, setAvailablePool] = useState<string[]>(initialPool);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null);

  // Stan weryfikacji i drugiej szansy
  const [verifiedState, setVerifiedState] = useState<{
    isChecked: boolean;
    isAllCorrect: boolean;
    correctLeftKeys: string[];
    incorrectLeftKeys: string[];
    identifiedDistractor: string | null;
    isSecondChance: boolean;
  }>({
    isChecked: false,
    isAllCorrect: false,
    correctLeftKeys: [],
    incorrectLeftKeys: [],
    identifiedDistractor: null,
    isSecondChance: false
  });

  // Reset stanu przy zmianie zadania
  useEffect(() => {
    setPairs({});
    setAvailablePool(initialPool);
    setSelectedLeft(null);
    setDraggedItem(null);
    setDragOverTarget(null);
    setVerifiedState({
      isChecked: false,
      isAllCorrect: false,
      correctLeftKeys: [],
      incorrectLeftKeys: [],
      identifiedDistractor: null,
      isSecondChance: false
    });
  }, [task.id, initialPool]);

  // Obsługa sparowania (zarówno z Drag & Drop jak i Click-to-Pair)
  const assignPair = (leftKey: string, rightValue: string) => {
    if (verifiedState.isChecked && verifiedState.isAllCorrect) return;

    // Jeśli ten slot po lewej miał już przypisaną wartość, zwróć ją do puli
    const existingValue = pairs[leftKey];
    
    // Jeśli ten rightValue był już gdzieś przypisany, zwolnij go stamtąd
    const currentOccupantLeft = Object.keys(pairs).find(k => pairs[k] === rightValue);

    const newPairs = { ...pairs };
    if (currentOccupantLeft && currentOccupantLeft !== leftKey) {
      delete newPairs[currentOccupantLeft];
    }
    newPairs[leftKey] = rightValue;

    // Przelicz dostępną pulę
    const usedValues = Object.values(newPairs);
    const newPool = initialPool.filter(item => !usedValues.includes(item));

    setPairs(newPairs);
    setAvailablePool(newPool);
    setSelectedLeft(null);
  };

  // Zwolnienie elementu z powrotem do puli
  const unassignPair = (leftKey: string) => {
    if (verifiedState.isChecked && verifiedState.isAllCorrect) return;
    const val = pairs[leftKey];
    if (!val) return;

    const newPairs = { ...pairs };
    delete newPairs[leftKey];

    setPairs(newPairs);
    setAvailablePool(prev => [...prev, val]);
    setSelectedLeft(null);
  };

  // ==========================================
  // CLICK-TO-PAIR LOGIKA
  // ==========================================
  const handleLeftClick = (leftKey: string) => {
    if (verifiedState.isChecked && verifiedState.isAllCorrect) return;
    if (pairs[leftKey]) {
      // Jeśli już ma przypisany kafelek, kliknięcie go usuwa
      unassignPair(leftKey);
    } else {
      setSelectedLeft(prev => (prev === leftKey ? null : leftKey));
    }
  };

  const handlePoolItemClick = (poolItem: string) => {
    if (verifiedState.isChecked && verifiedState.isAllCorrect) return;
    if (selectedLeft) {
      assignPair(selectedLeft, poolItem);
    }
  };

  // ==========================================
  // DRAG & DROP LOGIKA (HTML5 Touch-friendly)
  // ==========================================
  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDragOver = (e: React.DragEvent, targetLeftKey: string) => {
    e.preventDefault();
    if (dragOverTarget !== targetLeftKey) {
      setDragOverTarget(targetLeftKey);
    }
  };

  const handleDragLeave = () => {
    setDragOverTarget(null);
  };

  const handleDrop = (e: React.DragEvent, targetLeftKey: string) => {
    e.preventDefault();
    setDragOverTarget(null);
    const item = draggedItem || e.dataTransfer.getData('text/plain');
    if (item) {
      assignPair(targetLeftKey, item);
      setDraggedItem(null);
    }
  };

  // ==========================================
  // SPRAWDZENIE I PROCEDURA DRUGIEJ SZANSY
  // ==========================================
  const handleCheck = () => {
    const correctMap = new Map(originalPairs.map(p => [p.left, p.right]));
    const correctLeftKeys: string[] = [];
    const incorrectLeftKeys: string[] = [];
    let distractorUsed: string | null = null;

    originalPairs.forEach(p => {
      const userChoice = pairs[p.left];
      if (userChoice === correctMap.get(p.left)) {
        correctLeftKeys.push(p.left);
      } else {
        incorrectLeftKeys.push(p.left);
        if (userChoice === distractorText) {
          distractorUsed = userChoice;
        }
      }
    });

    const isAllCorrect = incorrectLeftKeys.length === 0;

    if (isAllCorrect) {
      // Pełny sukces!
      const earned = verifiedState.isSecondChance ? 1 : 2;
      setVerifiedState({
        isChecked: true,
        isAllCorrect: true,
        correctLeftKeys,
        incorrectLeftKeys: [],
        identifiedDistractor: null,
        isSecondChance: verifiedState.isSecondChance
      });
      const resultText = originalPairs.map(p => `${p.left} -> ${pairs[p.left]}`).join(' | ');
      onAnswerSubmit(earned, resultText);
    } else {
      // Błąd – aktywacja drugiej szansy
      setVerifiedState({
        isChecked: true,
        isAllCorrect: false,
        correctLeftKeys,
        incorrectLeftKeys,
        identifiedDistractor: distractorUsed,
        isSecondChance: true
      });
    }
  };

  // Przejście do poprawki (Druga szansa)
  const handleRetryIncorrect = () => {
    // Zachowaj poprawne pary, a błędne zwróć do puli
    const newPairs: Record<string, string> = {};
    const returnedItems: string[] = [];

    originalPairs.forEach(p => {
      if (verifiedState.correctLeftKeys.includes(p.left)) {
        newPairs[p.left] = pairs[p.left];
      } else {
        if (pairs[p.left]) {
          returnedItems.push(pairs[p.left]);
        }
      }
    });

    setPairs(newPairs);
    setAvailablePool(prev => [...prev, ...returnedItems]);
    setVerifiedState(prev => ({
      ...prev,
      isChecked: false,
      isSecondChance: true
    }));
  };

  const allAssigned = originalPairs.every(p => !!pairs[p.left]);

  return (
    <div className="space-y-4 select-none">
      {/* Pasek instrukcji i statusu */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            {selectedLeft ? (
              <span className="text-amber-700 dark:text-amber-300 font-medium animate-pulse">
                Wybrano pozycję. Kliknij pasujący kafelek z puli po prawej, aby go dopasować.
              </span>
            ) : (
              <span>
                Przeciągnij kafelki w wolne sloty lub <strong className="text-slate-900 dark:text-white">kliknij hasło, a potem odpowiedź</strong>.
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-700 dark:text-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          <span>1 dodatkowy dystraktor (pułapka CKE)</span>
        </div>
      </div>

      {/* Główny obszar dopasowywania: 2 Kolumny */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* LEWA KOLUMNA: Hasła / Bohaterowie / Motywy ze slotami docelowymi */}
        <div className="md:col-span-6 space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Pozycje do przypisania ({originalPairs.length})
          </div>

          {originalPairs.map((p, idx) => {
            const assignedValue = pairs[p.left];
            const isTargeted = dragOverTarget === p.left || selectedLeft === p.left;
            const isChecked = verifiedState.isChecked;
            const isCorrect = isChecked && verifiedState.correctLeftKeys.includes(p.left);
            const isIncorrect = isChecked && verifiedState.incorrectLeftKeys.includes(p.left);

            return (
              <div
                key={idx}
                onDragOver={(e) => handleDragOver(e, p.left)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, p.left)}
                onClick={() => handleLeftClick(p.left)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                  isCorrect
                    ? 'bg-emerald-500/15 dark:bg-emerald-950/40 border-emerald-500/60 text-slate-900 dark:text-white shadow-xs'
                    : isIncorrect
                    ? 'bg-rose-500/15 dark:bg-rose-950/40 border-rose-500/60 text-slate-900 dark:text-white shadow-xs'
                    : isTargeted
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 ring-2 ring-amber-400/30'
                    : assignedValue
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-950/70 border-dashed border-slate-300 dark:border-slate-800 hover:border-amber-500/50 hover:bg-slate-100 dark:hover:bg-slate-900/50'
                }`}
              >
                {/* Tytuł pozycji z lewej */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-300 font-mono text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-xs text-slate-900 dark:text-white">
                      {p.left}
                    </span>
                  </div>

                  {isCorrect && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Trafienie
                    </span>
                  )}
                  {isIncorrect && (
                    <span className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                      <XCircle className="w-3.5 h-3.5" /> Błędne
                    </span>
                  )}
                </div>

                {/* Slot na przypisaną odpowiedź */}
                {assignedValue ? (
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 text-xs text-slate-800 dark:text-slate-200 flex items-start justify-between gap-2 group">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{assignedValue}</span>
                    </div>
                    {!isChecked && (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 group-hover:text-rose-500 font-medium shrink-0 pt-0.5">
                        (kliknij by cofnąć)
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-800/70 bg-slate-100/50 dark:bg-slate-950/40 text-center text-xs text-slate-500 dark:text-slate-400 italic">
                    {isTargeted ? 'Upuść kafelek tutaj...' : 'Kliknij lub przeciągnij odpowiedź'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PRAWA KOLUMNA: Pula odpowiedzi do wzięcia (z 1 dystraktorem) */}
        <div className="md:col-span-6 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            <span>Pula odpowiedzi do wyboru ({availablePool.length})</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
              Zawiera 1 dystraktor
            </span>
          </div>

          <div className="space-y-2 min-h-[220px]">
            {availablePool.length === 0 ? (
              <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30 text-center text-xs text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-500/70" />
                <span>Wszystkie kafelki zostały rozmieszczone w slotach!</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Naciśnij poniżej „Sprawdź dopasowanie”, aby zweryfikować poprawność.
                </span>
              </div>
            ) : (
              availablePool.map((item, idx) => {
                const isDistractorTrapped = 
                  verifiedState.isChecked && 
                  verifiedState.identifiedDistractor === item;

                return (
                  <div
                    key={`pool-${idx}`}
                    draggable={!verifiedState.isChecked}
                    onDragStart={(e) => handleDragStart(e, item)}
                    onClick={() => handlePoolItemClick(item)}
                    className={`p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-grab active:cursor-grabbing flex items-start gap-2.5 ${
                      isDistractorTrapped
                        ? 'bg-amber-500/15 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200 shadow-xs'
                        : selectedLeft
                        ? 'bg-amber-50 dark:bg-slate-900 border-amber-500/70 hover:bg-amber-100/50 dark:hover:bg-amber-950/20 text-slate-900 dark:text-white shadow-xs ring-1 ring-amber-500/30 animate-pulse'
                        : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 shadow-xs'
                    }`}
                  >
                    <GripVertical className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span>{item}</span>
                      {isDistractorTrapped && (
                        <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                          <ShieldAlert className="w-3 h-3" />
                          <span>Zdemaskowano: To był dystraktor (pułapka CKE)!</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Komunikat o błędzie i aktywacja Drugiej Szansy */}
      {verifiedState.isChecked && !verifiedState.isAllCorrect && (
        <div className="p-4 rounded-xl bg-rose-500/10 dark:bg-rose-950/30 border border-rose-500/40 text-rose-800 dark:text-rose-200 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="font-bold text-rose-700 dark:text-rose-300">
                Wykryto niezgodność w dopasowaniu ({verifiedState.correctLeftKeys.length}/{originalPairs.length} trafień)
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {verifiedState.identifiedDistractor ? (
                  <span>
                    Uwaga: Jeden z wybranych kafelków to <strong className="text-amber-700 dark:text-amber-300">dystraktor</strong> – brzmi wiarygodnie, lecz nie odpowiada faktom z lektury.
                  </span>
                ) : (
                  <span>Niektóre postawy lub atrybuty zostały zamienione miejscami.</span>
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRetryIncorrect}
            className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Popraw błędne pary (Druga szansa – 1 pkt)</span>
          </button>
        </div>
      )}

      {/* Pasek Akcji: Sprawdź Dopasowanie */}
      {!verifiedState.isChecked && (
        <div className="pt-2 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {allAssigned ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Wszystkie sloty obsadzone. Gotowy do zatwierdzenia.
              </span>
            ) : (
              <span>Pozostało kafelków do przypisania: {originalPairs.length - Object.keys(pairs).length}</span>
            )}
          </div>

          <button
            type="button"
            disabled={!allAssigned}
            onClick={handleCheck}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              allAssigned
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/20 cursor-pointer'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700/50'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Sprawdź dopasowanie {verifiedState.isSecondChance ? '(za 1 pkt)' : '(za 2 pkt)'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
