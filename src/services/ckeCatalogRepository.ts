/**
 * Katalogi CKE: oficjalne wzory matematyczne oraz wagi punktowe działów.
 *
 * ZASADA: żadne treści nie są bundlowane. Wszystko czytamy z Cloud Firestore
 * (`system/ckeFormulas`, `system/ckeSubjectWeights`), a wynik trzymamy w pamięci
 * podręcznej. Firestore SDK ma włączony persistent cache, więc po pierwszym
 * uruchomieniu odczyt jest natychmiastowy i działa offline.
 *
 * Komponenty używają hooka `useCkeCatalogs()`, który sam inicjuje wczytanie
 * i wymusza ponowny render, gdy dane dotrą z chmury.
 */

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { SubjectCkeConfig } from '../types';

export interface CkeFormulaItem {
  id: string;
  topicId: string;
  topicName: string;
  title: string;
  formula: string;
  explanation?: string;
  goldenRule?: string;
  ckeTrap?: string;
  keywords: string[];
}

export interface CkeFormulaTopic {
  id: string;
  name: string;
}

export interface CkeSubjectOption {
  id: string;
  key: string;
  shortName: string;
  fullName: string;
  examTag: string;
  totalPoints: number;
  passingPoints: number;
  accentColor: string;
  glowColor: string;
  isAvailable: boolean;
  iconName: 'math' | 'book' | 'globe' | 'dna' | 'flask';
}

export const DEFAULT_CKE_SUBJECTS_CONFIG: Record<string, SubjectCkeConfig> = {
  'matematyka-podstawowa': {
    subjectId: 'matematyka-podstawowa',
    name: 'Matematyka (Poziom Podstawowy)',
    totalExamPoints: 50,
    passingThresholdPoints: 15,
    passingThresholdPercent: 30,
    topics: {
      'dzial-1': { topicId: 'dzial-1', name: 'Liczby Rzeczywiste', minPoints: 4, maxPoints: 8, averagePoints: 6, importance: 'CRITICAL_PEWNIAK' },
      'dzial-2': { topicId: 'dzial-2', name: 'Wyrażenia Algebraiczne', minPoints: 2, maxPoints: 4, averagePoints: 3, importance: 'HIGH' },
      'dzial-3': { topicId: 'dzial-3', name: 'Równania i Nierówności', minPoints: 4, maxPoints: 7, averagePoints: 5.5, importance: 'CRITICAL_PEWNIAK' },
      'dzial-4': { topicId: 'dzial-4', name: 'Układy Równań', minPoints: 1, maxPoints: 3, averagePoints: 2, importance: 'MEDIUM' },
      'dzial-5': { topicId: 'dzial-5', name: 'Funkcje i Wykresy', minPoints: 3, maxPoints: 4, averagePoints: 3.5, importance: 'HIGH' },
      'dzial-6': { topicId: 'dzial-6', name: 'Funkcja Kwadratowa', minPoints: 4, maxPoints: 6, averagePoints: 5.5, importance: 'CRITICAL_PEWNIAK' },
      'dzial-7': { topicId: 'dzial-7', name: 'Ciągi Liczbowe', minPoints: 4, maxPoints: 6, averagePoints: 5, importance: 'CRITICAL_PEWNIAK' },
      'dzial-8': { topicId: 'dzial-8', name: 'Trygonometria', minPoints: 3, maxPoints: 5, averagePoints: 4, importance: 'HIGH' },
      'dzial-9': { topicId: 'dzial-9', name: 'Planimetria', minPoints: 5, maxPoints: 7, averagePoints: 6, importance: 'CRITICAL_PEWNIAK' },
      'dzial-10': { topicId: 'dzial-10', name: 'Geometria Analityczna', minPoints: 3, maxPoints: 5, averagePoints: 4, importance: 'HIGH' },
      'dzial-11': { topicId: 'dzial-11', name: 'Stereometria', minPoints: 3, maxPoints: 5, averagePoints: 4, importance: 'MEDIUM' },
      'dzial-12': { topicId: 'dzial-12', name: 'Kombinatoryka', minPoints: 2, maxPoints: 3, averagePoints: 2, importance: 'MEDIUM' },
      'dzial-13': { topicId: 'dzial-13', name: 'Prawdopodobieństwo', minPoints: 3, maxPoints: 5, averagePoints: 4, importance: 'HIGH' },
      'dzial-14': { topicId: 'dzial-14', name: 'Statystyka', minPoints: 2, maxPoints: 3, averagePoints: 2, importance: 'MEDIUM' },
      'dzial-15': { topicId: 'dzial-15', name: 'Optymalizacja', minPoints: 4, maxPoints: 5, averagePoints: 4, importance: 'HIGH' }
    }
  },
  'jezyk-polski': {
    subjectId: 'jezyk-polski',
    name: 'Język Polski (Formuła 2023)',
    totalExamPoints: 60,
    passingThresholdPoints: 18,
    passingThresholdPercent: 30,
    topics: {
      'pol-dzial-1': { topicId: 'pol-dzial-1', name: 'Komunikacja językowa i funkcje wypowiedzi', minPoints: 1, maxPoints: 2, averagePoints: 1.5, importance: 'HIGH' },
      'pol-dzial-2': { topicId: 'pol-dzial-2', name: 'Retoryka, logika i sztuka argumentacji', minPoints: 1, maxPoints: 2, averagePoints: 1.5, importance: 'CRITICAL_PEWNIAK' },
      'pol-dzial-3': { topicId: 'pol-dzial-3', name: 'Style funkcjonalne i rejestry polszczyzny', minPoints: 1, maxPoints: 2, averagePoints: 1.0, importance: 'HIGH' },
      'pol-dzial-4': { topicId: 'pol-dzial-4', name: 'Środki językowe, składnia i mechanizmy perswazji', minPoints: 1, maxPoints: 2, averagePoints: 1.0, importance: 'HIGH' },
      'pol-dzial-5': { topicId: 'pol-dzial-5', name: 'Frazeologia, semantyka i kultura języka', minPoints: 1, maxPoints: 2, averagePoints: 1.0, importance: 'HIGH' },
      'pol-dzial-6': { topicId: 'pol-dzial-6', name: 'Spójność, kohezja i krytyczna analiza tekstu', minPoints: 1, maxPoints: 2, averagePoints: 1.0, importance: 'CRITICAL_PEWNIAK' },
      'pol-dzial-7': { topicId: 'pol-dzial-7', name: 'Notatka syntetyzująca – Warsztat mistrzowski', minPoints: 3, maxPoints: 3, averagePoints: 3.0, importance: 'CRITICAL_PEWNIAK' },
      'pol-dzial-8': { topicId: 'pol-dzial-8', name: 'Antyk i Biblia – Fundamenty kultury europejskiej', minPoints: 2, maxPoints: 5, averagePoints: 3.5, importance: 'CRITICAL_PEWNIAK' },
      'pol-dzial-9': { topicId: 'pol-dzial-9', name: 'Średniowiecze – Teocentryzm, asceza i śmierć', minPoints: 1, maxPoints: 4, averagePoints: 2.5, importance: 'HIGH' },
      'pol-dzial-10': { topicId: 'pol-dzial-10', name: 'Renesans, Barok i Oświecenie', minPoints: 2, maxPoints: 5, averagePoints: 3.5, importance: 'HIGH' },
      'pol-dzial-11': { topicId: 'pol-dzial-11', name: 'Romantyzm – Mesjanizm, bunt metafizyczny i dramat narodowy', minPoints: 5, maxPoints: 15, averagePoints: 10.0, importance: 'CRITICAL_PEWNIAK' },
      'pol-dzial-12': { topicId: 'pol-dzial-12', name: 'Pozytywizm – Praca u podstaw, realizm i portret społeczeństwa', minPoints: 5, maxPoints: 15, averagePoints: 10.0, importance: 'CRITICAL_PEWNIAK' },
      'pol-dzial-13': { topicId: 'pol-dzial-13', name: 'Młoda Polska – Dekadentyzm, mit narodowy i dramat symboliczny', minPoints: 4, maxPoints: 15, averagePoints: 8.0, importance: 'CRITICAL_PEWNIAK' },
      'pol-dzial-14': { topicId: 'pol-dzial-14', name: 'Dwudziestolecie międzywojenne', minPoints: 3, maxPoints: 12, averagePoints: 7.0, importance: 'CRITICAL_PEWNIAK' },
      'pol-dzial-15': { topicId: 'pol-dzial-15', name: 'Literatura wojny i okupacji', minPoints: 4, maxPoints: 15, averagePoints: 8.0, importance: 'CRITICAL_PEWNIAK' },
      'pol-dzial-16': { topicId: 'pol-dzial-16', name: 'Literatura po 1945 r.', minPoints: 4, maxPoints: 15, averagePoints: 8.0, importance: 'CRITICAL_PEWNIAK' },
      'pol-dzial-17': { topicId: 'pol-dzial-17', name: 'Literatura współczesna', minPoints: 2, maxPoints: 10, averagePoints: 5.0, importance: 'HIGH' }
    }
  }
};

export const DEFAULT_CKE_SUBJECT_OPTIONS: CkeSubjectOption[] = [
  {
    id: 'matematyka-podstawowa',
    key: 'math',
    shortName: 'Matematyka',
    fullName: 'Matematyka (Poziom Podstawowy)',
    examTag: 'Podstawa • 50 pkt',
    totalPoints: 50,
    passingPoints: 15,
    accentColor: '#FFB800',
    glowColor: 'rgba(255, 184, 0, 0.25)',
    isAvailable: true,
    iconName: 'math'
  },
  {
    id: 'jezyk-polski',
    key: 'pol',
    shortName: 'Język Polski',
    fullName: 'Język Polski (Poziom Podstawowy)',
    examTag: 'Podstawa • 60 pkt',
    totalPoints: 60,
    passingPoints: 18,
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    isAvailable: true,
    iconName: 'book'
  }
];

let formulas: CkeFormulaItem[] = [];
let formulaTopics: CkeFormulaTopic[] = [];
let subjectsConfig: Record<string, SubjectCkeConfig> = { ...DEFAULT_CKE_SUBJECTS_CONFIG };
let subjectOptions: CkeSubjectOption[] = [ ...DEFAULT_CKE_SUBJECT_OPTIONS ];
let isLoaded = false;
let loadPromise: Promise<void> | null = null;
let loadFailed = false;

const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach(listener => {
    try {
      listener();
    } catch (err) {
      console.warn('[ckeCatalogRepository] listener error:', err);
    }
  });
}

export function subscribeCkeCatalogs(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Hook mobilny: uruchamia wczytanie katalogów przy pierwszym montażu
 * i zwraca `true`, gdy dane są już dostępne.
 */
export function useCkeCatalogs(): boolean {
  const [version, setVersion] = useState(0);
  useEffect(() => subscribeCkeCatalogs(() => setVersion(v => v + 1)), []);
  useEffect(() => {
    void ensureCkeCatalogsLoaded();
  }, []);
  void version;
  return isLoaded;
}

export function isCkeCatalogLoaded(): boolean {
  return isLoaded;
}

export function didCkeCatalogLoadFail(): boolean {
  return loadFailed;
}

/** Idempotentne wczytanie katalogów CKE z Firestore (2 odczyty, potem cache). */
export async function ensureCkeCatalogsLoaded(): Promise<void> {
  if (isLoaded) return;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      const [formulasSnap, weightsSnap] = await Promise.all([
        getDoc(doc(db, 'system', 'ckeFormulas')),
        getDoc(doc(db, 'system', 'ckeSubjectWeights'))
      ]);

      if (formulasSnap.exists()) {
        const data = formulasSnap.data() as { formulas?: CkeFormulaItem[]; topics?: CkeFormulaTopic[] };
        formulas = Array.isArray(data.formulas) ? data.formulas : [];
        formulaTopics = Array.isArray(data.topics) ? data.topics : [];
      }

      if (weightsSnap.exists()) {
        const data = weightsSnap.data() as { subjects?: Record<string, SubjectCkeConfig>; options?: CkeSubjectOption[] };
        subjectsConfig = data.subjects && typeof data.subjects === 'object' ? data.subjects : {};
        subjectOptions = Array.isArray(data.options) ? data.options : [];
      }

      isLoaded = formulas.length > 0 || subjectOptions.length > 0;
      loadFailed = !isLoaded;
    } catch (err) {
      loadFailed = true;
      console.warn('[ckeCatalogRepository] Nie udało się wczytać katalogów CKE:', err);
    } finally {
      loadPromise = null;
      emit();
    }
  })();

  return loadPromise;
}

/**
 * Bezpieczne kształty zapasowe. To NIE są treści kurikulum — zero nazw działów,
 * wag i wzorów. Służą tylko temu, żeby UI nie wybuchło, zanim katalogi dotrą
 * z Firestore (stan pusty = brak danych, nie zmyślone dane).
 */
const FALLBACK_SUBJECT_CONFIG: SubjectCkeConfig = {
  subjectId: 'matematyka-podstawowa',
  name: '',
  totalExamPoints: 50,
  passingThresholdPoints: 15,
  passingThresholdPercent: 30,
  topics: {}
};

const FALLBACK_SUBJECT_OPTION: CkeSubjectOption = {
  id: '',
  key: '',
  shortName: '',
  fullName: '',
  examTag: '',
  totalPoints: 0,
  passingPoints: 0,
  accentColor: '#64748B',
  glowColor: 'rgba(100,116,139,0.35)',
  isAvailable: false,
  iconName: 'math'
};

export function getCkeFormulas(): CkeFormulaItem[] {
  return formulas;
}

export function getCkeFormulaTopics(): CkeFormulaTopic[] {
  return formulaTopics.length > 0 ? formulaTopics : [{ id: 'all', name: 'Wszystkie działy' }];
}

export function getCkeAvailableSubjects(): CkeSubjectOption[] {
  return subjectOptions;
}

/** Konfiguracja wag CKE przedmiotu (kształt zapasowy do czasu wczytania katalogu). */
export function getSubjectCkeConfig(subjectId?: string): SubjectCkeConfig {
  const normId = subjectId === 'pol' || subjectId === 'jezyk-polski'
    ? 'jezyk-polski'
    : 'matematyka-podstawowa';

  return subjectsConfig[normId] || subjectsConfig['matematyka-podstawowa'] || FALLBACK_SUBJECT_CONFIG;
}

export function getSubjectMetaByKey(key: string): CkeSubjectOption {
  return subjectOptions.find(s => s.key === key || s.id === key) || subjectOptions[0] || FALLBACK_SUBJECT_OPTION;
}

/** Tylko do testów — czyści pamięć podręczną katalogów. */
export function resetCkeCatalogCache(): void {
  formulas = [];
  formulaTopics = [];
  subjectsConfig = { ...DEFAULT_CKE_SUBJECTS_CONFIG };
  subjectOptions = [ ...DEFAULT_CKE_SUBJECT_OPTIONS ];
  isLoaded = false;
  loadFailed = false;
  loadPromise = null;
}
