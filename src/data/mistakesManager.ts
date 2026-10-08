import { MistakeEntry } from '../types/mistakeTypes';

const STORAGE_KEY = 'jasne_mistake_notebook_v1';

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function notifyMistakesUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('jasne_mistakes_updated'));
  }
}

/**
 * Odczytuje wszystkie wpisy z bazy Zeszytu Błędów.
 */
export function getMistakes(): MistakeEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Błąd odczytu Zeszytu Błędów:', e);
    return [];
  }
}

/**
 * Zwraca liczbę wszystkich aktywnych błędów (etap 0 lub 1 – jeszcze nieopanowane).
 */
export function getActiveMistakesCount(): number {
  return getMistakes().filter((m) => m.stage < 2).length;
}

/**
 * Zwraca liczbę zadań, które uczeń może poprawić dzisiaj (etap < 2 oraz brak zaliczenia dzisiaj).
 */
export function getTodayReviewableCount(): number {
  const today = getTodayDateString();
  return getMistakes().filter((m) => m.stage < 2 && m.lastSuccessDate !== today).length;
}

/**
 * Sprawdza, czy dane zadanie jest zablokowane na resztę dzisiejszego dnia
 * (ochrona pamięci długotrwałej po 1. poprawnym zaliczeniu).
 */
export function isMistakeLockedToday(mistake: MistakeEntry): boolean {
  if (mistake.stage !== 1) return false;
  return mistake.lastSuccessDate === getTodayDateString();
}

/**
 * Automatycznie rejestruje błąd w Zeszycie Błędów.
 * Jeśli zadanie już istnieje w bazie, aktualizuje historię prób i resetuje etap do 0.
 */
export function recordMistake(data: {
  taskId: string;
  subject: 'polski' | 'matematyka';
  topicOrEpoch: string;
  title: string;
  question: string;
  taskType: string;
  points: number;
  options?: string[];
  correctAnswer: any;
  userWrongAnswer?: any;
  explanation?: string;
  ckeKeyCriteria?: string[];
  visualAsset?: any;
  passage?: { author?: string; sourceTitle?: string; text: string };
  passage2?: { author?: string; sourceTitle?: string; text: string };
  trueFalseStatements?: Array<{ statement: string; isTrue: boolean; explanation?: string }>;
  matchingPairs?: Array<{ left: string; right: string }>;
  distractor?: string;
}): MistakeEntry {
  const currentMistakes = getMistakes();
  const existingIndex = currentMistakes.findIndex(
    (m) => m.taskId === data.taskId && m.subject === data.subject
  );

  const nowIso = new Date().toISOString();

  if (existingIndex !== -1) {
    // Aktualizacja istniejącego błędu – jeśli uczeń popełnił błąd, resetujemy etap do 0
    const existing = currentMistakes[existingIndex];
    const updated: MistakeEntry = {
      ...existing,
      ...data,
      stage: 0, // Powrót do etapu 0
      lastSuccessDate: undefined, // Usunięcie blokady dziennej
      lastAttemptAt: nowIso,
      attemptsCount: existing.attemptsCount + 1,
    };
    currentMistakes[existingIndex] = updated;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentMistakes));
      notifyMistakesUpdated();
    } catch {}
    return updated;
  }

  // Nowy wpis w Zeszycie Błędów
  const newEntry: MistakeEntry = {
    id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...data,
    stage: 0,
    firstFailedAt: nowIso,
    lastAttemptAt: nowIso,
    attemptsCount: 1,
  };

  const updatedList = [newEntry, ...currentMistakes];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    notifyMistakesUpdated();
  } catch {}

  return newEntry;
}

/**
 * Zapisuje wynik próby poprawienia błędu w Zeszycie Błędów.
 * 
 * Zgodnie z żelazną zasadą ustaloną z użytkownikiem:
 * - Błąd NIE blokuje zadania (uczeń może natychmiast próbować dalej, dopóki nie zrozumie).
 * - Sukces (poprawna odpowiedź) zalicza 1. etap i BLOKUJE zadanie do jutra (ochrona pamięci długotrwałej).
 * - Kolejnego dnia sukces w 2. etapie ostatecznie przenosi zadanie do OPANOWANYCH (etap 2).
 */
export function submitCorrection(
  entryId: string,
  isCorrect: boolean
): {
  success: boolean;
  newStage: 0 | 1 | 2;
  lockedUntilTomorrow: boolean;
} {
  const currentMistakes = getMistakes();
  const index = currentMistakes.findIndex((m) => m.id === entryId);

  if (index === -1) {
    return { success: false, newStage: 0, lockedUntilTomorrow: false };
  }

  const mistake = currentMistakes[index];
  const nowIso = new Date().toISOString();
  const today = getTodayDateString();

  let nextStage: 0 | 1 | 2 = mistake.stage;
  let lockedUntilTomorrow = false;

  if (isCorrect) {
    if (mistake.stage === 0) {
      // Zaliczenie 1. etapu: awans do etapu 1 i blokada na resztę dzisiejszego dnia
      nextStage = 1;
      mistake.lastSuccessDate = today;
      lockedUntilTomorrow = true;
    } else if (mistake.stage === 1) {
      // Zaliczenie 2. etapu: ostateczne opanowanie!
      nextStage = 2;
      mistake.lastSuccessDate = today;
      lockedUntilTomorrow = false;
    }
  } else {
    // Ponowny błąd: reset etapu do 0, ale zadanie NIE JEST blokowane (uczeń może próbować dalej)
    nextStage = 0;
    mistake.lastSuccessDate = undefined;
    lockedUntilTomorrow = false;
  }

  mistake.stage = nextStage;
  mistake.lastAttemptAt = nowIso;
  mistake.attemptsCount += 1;

  currentMistakes[index] = mistake;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentMistakes));
    notifyMistakesUpdated();
  } catch {}

  return {
    success: isCorrect,
    newStage: nextStage,
    lockedUntilTomorrow,
  };
}

/**
 * Usuwa błąd z bazy (opcjonalne czyszczenie).
 */
export function removeMistake(entryId: string): void {
  const currentMistakes = getMistakes();
  const filtered = currentMistakes.filter((m) => m.id !== entryId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    notifyMistakesUpdated();
  } catch {}
}
