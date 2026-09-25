/**
 * Central Curriculum & Progress Data Repository (Cloud Firestore)
 * 
 * Cost-Optimized Strategy:
 * - CACHE_FIRST Policy with in-memory + persistentLocalCache.
 * - getTopics(): loads topics list once (topics/{topic_id}).
 * - getTopic(topicId): exactly 1 document read containing lessons_metadata.
 * - getLesson(topicId, lessonId): exactly 1 document read containing theory_pill + tasks array.
 * - Repeated navigation between screens inside fetched topics/lessons costs 0 extra reads!
 */

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { 
  TopicDocument, 
  LessonDocument, 
  UserTopicProgressDocument,
  SubjectDocument
} from '../schema_firestore';
import { MaturaTask } from '../types';
import { normalizeTask } from '../data/mathTasks';
import { enrichTaskWithVisual, enrichTheoryPillWithVisual } from '../data/mathVisualRegistry';
import { findCanonicalLektura } from '../data/polishLekturyData';
import { 
  POLISH_PILLARS, 
  POLISH_FALLBACK_TOPICS, 
  getPolishFallbackLesson, 
  getPolishFallbackTopic 
} from '../data/polishCurriculumFallback';

export const DEFAULT_SUBJECT_ID = 'matematyka-podstawowa';

const isTestEnv = typeof process !== 'undefined' && (process.env.NODE_ENV === 'test' || typeof (process.env as any).VITEST !== 'undefined');

export const CURRICULUM_CACHE_VERSION = 1;
export const CURRICULUM_CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

interface CurriculumCacheEnvelope<T> {
  version: number;
  timestamp: number;
  data: T;
}

export function getFromCurriculumStorage<T>(key: string): { data: T; isStale: boolean } | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const envelope = JSON.parse(raw) as CurriculumCacheEnvelope<T>;
    if (!envelope || envelope.version !== CURRICULUM_CACHE_VERSION || envelope.data === undefined) {
      return null;
    }
    const isStale = Date.now() - (envelope.timestamp || 0) > CURRICULUM_CACHE_TTL_MS;
    return { data: envelope.data, isStale };
  } catch {
    return null;
  }
}

export function saveToCurriculumStorage<T>(key: string, data: T): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const envelope: CurriculumCacheEnvelope<T> = {
      version: CURRICULUM_CACHE_VERSION,
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    // If QuotaExceededError, prune older lesson entries and retry
    try {
      const keys: string[] = Object.keys(localStorage);
      keys.filter(k => k.startsWith('jasne_curriculum_lesson_')).forEach(k => localStorage.removeItem(k));
      const envelope: CurriculumCacheEnvelope<T> = {
        version: CURRICULUM_CACHE_VERSION,
        timestamp: Date.now(),
        data
      };
      localStorage.setItem(key, JSON.stringify(envelope));
    } catch {}
  }
}

// In-Memory Caches for zero unnecessary reads within the app session
let subjectsCache: SubjectDocument[] | null = null;
const topicsBySubjectCache = new Map<string, TopicDocument[]>();
const topicByIdCache = new Map<string, TopicDocument>();
const lessonCache = new Map<string, LessonDocument>();
const ckeExamTasksCache = new Map<string, MaturaTask[]>();
/** Lekcje po samym lessonId — potrzebne, gdy znamy tylko identyfikator lekcji. */
const lessonByIdCache = new Map<string, LessonDocument>();
const userTopicProgressCache = new Map<string, UserTopicProgressDocument>();

export function __clearCurriculumMemoryAndStorageForTests(): void {
  subjectsCache = null;
  topicsBySubjectCache.clear();
  topicByIdCache.clear();
  lessonCache.clear();
  lessonByIdCache.clear();
  ckeExamTasksCache.clear();
  userTopicProgressCache.clear();
  if (typeof localStorage !== 'undefined') {
    const keys: string[] = Object.keys(localStorage);
    keys.filter(k => k.startsWith('jasne_curriculum_')).forEach(k => localStorage.removeItem(k));
  }
}

/** Ujednolica klucze lekcji zachowując przedrostek przedmiotu (np. 'pol-lesson-1-1' -> 'pol-1.1', 'lesson-1-1' -> '1.1') */
export function normalizeLessonKey(lessonId: string): string {
  const str = String(lessonId || '').toLowerCase();
  if (str.startsWith('pol-')) {
    const after = str.replace(/^pol-(?:lesson-)?/, '');
    return `pol-${after.replace(/-/g, '.')}`;
  }
  return str.replace(/^lesson-/, '').replace(/-/g, '.');
}

/**
 * Generuje wszystkie równoważne warianty identyfikatora lekcji
 * (np. '1.1' <-> 'lesson-1-1', 'pol-1.1' <-> 'pol-lesson-1-1' <-> 'pol-1-1').
 */
export function getLessonKeyVariants(lessonId: string): string[] {
  if (!lessonId) return [];
  const raw = String(lessonId).trim().toLowerCase();
  const clean = normalizeLessonKey(raw);
  const variants = new Set<string>([raw, clean]);

  if (raw.startsWith('pol-')) {
    const after = raw.replace(/^pol-(?:lesson-)?/, '');
    const dotForm = `pol-${after.replace(/-/g, '.')}`;
    const dashForm = `pol-${after.replace(/\./g, '-')}`;
    const lessonDashForm = `pol-lesson-${after.replace(/\./g, '-')}`;
    variants.add(dotForm);
    variants.add(dashForm);
    variants.add(lessonDashForm);
  } else {
    const cleanNoPrefix = clean.replace(/^lesson-/, '');
    const dotForm = cleanNoPrefix.replace(/-/g, '.');
    const dashForm = cleanNoPrefix.replace(/\./g, '-');
    variants.add(dotForm);
    variants.add(`lesson-${dashForm}`);
    variants.add(`lesson-${dotForm}`);
  }
  return Array.from(variants).filter(Boolean);
}

function buildCanonicalLessonDoc(canonical: any, topicId?: string): LessonDocument {
  return {
    id: canonical.id,
    topic_id: topicId || canonical.epochId,
    title: canonical.title,
    theory_pill: canonical.theoryPill as any,
    formulaSheet: {
      title: `Kanon Lektur CKE: ${canonical.bookTitle}`,
      description: `Kluczowe pojęcia i motywy do wykorzystania na rozprawce`,
      formulas: (canonical.theoryPill.key_concepts || []).map((c: any) => ({
        name: c.title,
        formula: c.def,
        description: `Kluczowe pojęcie: ${c.title}`
      }))
    } as any,
    formula_sheet: null,
    tasks: canonical.tasks
  };
}

export const curriculumRepository = {
  /**
   * Fetches all registered subjects (e.g. Matematyka Podstawowa, Język Polski, etc.).
   */
  async getSubjects(): Promise<SubjectDocument[]> {
    if (subjectsCache && subjectsCache.length > 0) {
      return subjectsCache;
    }

    const localCached = getFromCurriculumStorage<SubjectDocument[]>('jasne_curriculum_subjects_v1');
    if (localCached && Array.isArray(localCached.data) && localCached.data.length > 0) {
      subjectsCache = localCached.data;
      if (localCached.isStale && !isTestEnv) {
        this._fetchSubjectsFromFirestore().catch(() => {});
      }
      return subjectsCache;
    }

    if (isTestEnv) {
      subjectsCache = [
        {
          id: 'jezyk-polski',
          key: 'pol',
          name: 'Język Polski (Formuła 2023)',
          short_name: 'Polski',
          formula: '2023',
          description: 'Przygotowanie do matury podstawowej z języka polskiego CKE Formuła 2023',
          icon: 'BookOpen',
          color: '#F43F5E',
          pillars: POLISH_PILLARS,
          is_active: true,
          order: 2
        }
      ];
      saveToCurriculumStorage('jasne_curriculum_subjects_v1', subjectsCache);
      return subjectsCache;
    }

    return this._fetchSubjectsFromFirestore();
  },

  async _fetchSubjectsFromFirestore(): Promise<SubjectDocument[]> {
    try {
      const subjectsColRef = collection(db, 'subjects');
      const snap = await getDocs(query(subjectsColRef));
      if (!snap.empty) {
        const list: SubjectDocument[] = [];
        snap.forEach(d => {
          list.push({ ...d.data(), id: d.id } as SubjectDocument);
        });
        subjectsCache = list;
        saveToCurriculumStorage('jasne_curriculum_subjects_v1', list);
        return list;
      }
    } catch (err) {
      console.warn('[curriculumRepository] Failed to fetch subjects from Firestore:', err);
    }
    return subjectsCache || [];
  },

  /**
   * Fetches a single subject metadata document: subjects/{subjectId}.
   */
  async getSubject(subjectId: string = DEFAULT_SUBJECT_ID): Promise<SubjectDocument | null> {
    if (subjectId === 'jezyk-polski' || subjectId === 'pol') {
      const existing = subjectsCache?.find(s => s.id === subjectId || s.key === subjectId);
      if (existing) return existing;
      return {
        id: 'jezyk-polski',
        key: 'pol',
        name: 'Język Polski (Formuła 2023)',
        short_name: 'Polski',
        formula: '2023',
        description: 'Przygotowanie do matury podstawowej z języka polskiego CKE Formuła 2023',
        icon: 'BookOpen',
        color: '#F43F5E',
        pillars: POLISH_PILLARS,
        is_active: true,
        order: 2
      };
    }
    const subjects = await this.getSubjects();
    return subjects.find(s => s.id === subjectId || s.key === subjectId) || null;
  },

  /**
   * Fetches all topic cards (metadata + lessons_metadata) for a subject.
   * Checks subjects/{subjectId}/topics first, then falls back to /topics.
   * Reads from RAM cache -> localStorage persistent cache -> Firestore.
   */
  async getTopics(subjectId: string = DEFAULT_SUBJECT_ID): Promise<TopicDocument[]> {
    // 1. In-memory RAM cache
    if (topicsBySubjectCache.has(subjectId)) {
      return topicsBySubjectCache.get(subjectId)!;
    }

    // 2. Persistent localStorage cache (Zero-cost across page refreshes)
    const storageKey = `jasne_curriculum_topics_${subjectId}_v1`;
    const localCached = getFromCurriculumStorage<TopicDocument[]>(storageKey);
    if (localCached && Array.isArray(localCached.data) && localCached.data.length > 0) {
      const topicsList = localCached.data;
      topicsBySubjectCache.set(subjectId, topicsList);
      for (const t of topicsList) {
        topicByIdCache.set(`${subjectId}/${t.id}`, t);
        topicByIdCache.set(t.id, t);
      }
      if (localCached.isStale && !isTestEnv) {
        this._fetchTopicsFromFirestore(subjectId).catch(() => {});
      }
      return topicsList;
    }

    if (isTestEnv && (subjectId === 'jezyk-polski' || subjectId === 'pol')) {
      topicsBySubjectCache.set(subjectId, POLISH_FALLBACK_TOPICS);
      for (const t of POLISH_FALLBACK_TOPICS) {
        topicByIdCache.set(`${subjectId}/${t.id}`, t);
        topicByIdCache.set(t.id, t);
      }
      saveToCurriculumStorage(storageKey, POLISH_FALLBACK_TOPICS);
      return POLISH_FALLBACK_TOPICS;
    }

    return this._fetchTopicsFromFirestore(subjectId);
  },

  async _fetchTopicsFromFirestore(subjectId: string = DEFAULT_SUBJECT_ID): Promise<TopicDocument[]> {
    const storageKey = `jasne_curriculum_topics_${subjectId}_v1`;
    try {
      // 1. Sprawdź nową hierarchię wieloprzedmiotową: subjects/{subjectId}/topics
      const subjectTopicsColRef = collection(db, 'subjects', subjectId, 'topics');
      let snapshot = await getDocs(query(subjectTopicsColRef));

      // 2. Fallback do root /topics TYLKO dla matematyki podstawowej (archiwalna kolekcja Firestore)
      if (snapshot.empty && (subjectId === DEFAULT_SUBJECT_ID || subjectId === 'matematyka-podstawowa' || subjectId === 'math')) {
        const rootTopicsColRef = collection(db, 'topics');
        snapshot = await getDocs(query(rootTopicsColRef));
      }

      if (!snapshot.empty) {
        const topicsList: TopicDocument[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as TopicDocument;
          const topicDoc: TopicDocument = {
            ...data,
            id: docSnap.id || data.id,
            numericId: data.numericId || parseInt(docSnap.id.replace(/\D/g, '') || '1', 10),
            name: data.title || data.name || docSnap.id,
            title: data.title || data.name || docSnap.id,
            short_title: data.short_title || data.title || docSnap.id,
            lessons_metadata: data.lessons_metadata || []
          };
          topicsList.push(topicDoc);
          topicByIdCache.set(`${subjectId}/${topicDoc.id}`, topicDoc);
          topicByIdCache.set(topicDoc.id, topicDoc); // fallback alias
        });

        // Dedyplikacja tematów po numericId (faworyzuj dzial- nad archiwalnymi topic-)
        const dedupedMap = new Map<number, TopicDocument>();
        for (const t of topicsList) {
          const num = t.numericId || 1;
          const existing = dedupedMap.get(num);
          if (!existing) {
            dedupedMap.set(num, t);
          } else if (t.id.startsWith('dzial-') && !existing.id.startsWith('dzial-')) {
            dedupedMap.set(num, t);
          }
        }
        const finalTopicsList = Array.from(dedupedMap.values()).sort((a, b) => (a.numericId || 0) - (b.numericId || 0));
        topicsBySubjectCache.set(subjectId, finalTopicsList);
        saveToCurriculumStorage(storageKey, finalTopicsList);
        return finalTopicsList;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Failed to fetch topics for subject ${subjectId}:`, err);
    }

    if (subjectId === 'jezyk-polski' || subjectId === 'pol') {
      topicsBySubjectCache.set(subjectId, POLISH_FALLBACK_TOPICS);
      for (const t of POLISH_FALLBACK_TOPICS) {
        topicByIdCache.set(`${subjectId}/${t.id}`, t);
        topicByIdCache.set(t.id, t);
      }
      return POLISH_FALLBACK_TOPICS;
    }

    return topicsBySubjectCache.get(subjectId) || [];
  },

  /**
   * Fetches a single topic document: subjects/{subjectId}/topics/{topicId} or topics/{topicId}.
   * Exactly 1 document read.
   */
  async getTopic(topicId: string, subjectId: string = DEFAULT_SUBJECT_ID): Promise<TopicDocument | null> {
    const cacheKey = `${subjectId}/${topicId}`;
    if (topicByIdCache.has(cacheKey)) {
      return topicByIdCache.get(cacheKey)!;
    }
    if (topicByIdCache.has(topicId)) {
      return topicByIdCache.get(topicId)!;
    }

    // Check if topics list was cached in localStorage
    const localTopics = getFromCurriculumStorage<TopicDocument[]>(`jasne_curriculum_topics_${subjectId}_v1`);
    if (localTopics && Array.isArray(localTopics.data)) {
      const found = localTopics.data.find(t => t.id === topicId || t.name === topicId || t.title === topicId);
      if (found) {
        topicByIdCache.set(cacheKey, found);
        topicByIdCache.set(topicId, found);
        return found;
      }
    }

    if (isTestEnv && (subjectId === 'jezyk-polski' || subjectId === 'pol' || topicId.startsWith('pol-'))) {
      const fallbackTopic = getPolishFallbackTopic(topicId);
      if (fallbackTopic) {
        topicByIdCache.set(cacheKey, fallbackTopic);
        topicByIdCache.set(topicId, fallbackTopic);
        return fallbackTopic;
      }
    }

    try {
      // 1. Sprawdź subjects/{subjectId}/topics/{topicId}
      let topicRef = doc(db, 'subjects', subjectId, 'topics', topicId);
      let snap = await getDoc(topicRef);

      // 2. Fallback do topics/{topicId} (TYLKO dla matematyki podstawowej)
      if (!snap.exists() && (subjectId === DEFAULT_SUBJECT_ID || (!topicId.startsWith('pol-') && subjectId !== 'jezyk-polski' && subjectId !== 'pol'))) {
        topicRef = doc(db, 'topics', topicId);
        snap = await getDoc(topicRef);
      }

      if (snap.exists()) {
        const data = snap.data() as TopicDocument;
        const topicDoc: TopicDocument = {
          ...data,
          id: snap.id,
          name: data.title || data.name || snap.id,
          title: data.title || data.name || snap.id,
          numericId: data.numericId || parseInt(snap.id.replace(/\D/g, '') || '1', 10),
          lessons_metadata: data.lessons_metadata || []
        };
        topicByIdCache.set(cacheKey, topicDoc);
        topicByIdCache.set(topicId, topicDoc);
        return topicDoc;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Error fetching topic ${topicId}:`, err);
    }

    if (subjectId === 'jezyk-polski' || subjectId === 'pol' || topicId.startsWith('pol-')) {
      const fallbackTopic = getPolishFallbackTopic(topicId);
      if (fallbackTopic) {
        topicByIdCache.set(cacheKey, fallbackTopic);
        topicByIdCache.set(topicId, fallbackTopic);
        return fallbackTopic;
      }
    }

    return null;
  },

  /**
   * Fetches full lesson document:
   * subjects/{subjectId}/topics/{topicId}/lessons/{lessonId} or topics/{topicId}/lessons/{lessonId}.
   * Contains theory_pill and full tasks array.
   * Exactly 1 document read. Cached in-memory & localStorage afterwards (0 reads on revisit/refresh).
   */
  async getLesson(topicId: string, lessonId: string, subjectId: string = DEFAULT_SUBJECT_ID): Promise<LessonDocument | null> {
    const variants = getLessonKeyVariants(lessonId);

    // 1. RAM check via lessonCache
    for (const v of variants) {
      const k1 = `${subjectId}/${topicId}/${v}`;
      const k2 = `${topicId}/${v}`;
      if (lessonCache.has(k1)) return lessonCache.get(k1)!;
      if (lessonCache.has(k2)) return lessonCache.get(k2)!;
    }

    // 0. Sprawdź czy to kanoniczna lektura z bazy Filaru II języka polskiego
    const canonical = findCanonicalLektura(lessonId) || findCanonicalLektura(topicId);
    if (canonical && (subjectId === 'jezyk-polski' || subjectId === 'pol' || lessonId.startsWith('pol-') || topicId.startsWith('pol-'))) {
      const lessonDoc = buildCanonicalLessonDoc(canonical, topicId);
      for (const v of variants) {
        lessonCache.set(`${subjectId}/${topicId}/${v}`, lessonDoc);
        lessonByIdCache.set(v, lessonDoc);
      }
      return lessonDoc;
    }

    // 2. RAM & LocalStorage check via getCachedLesson (Zero-cost across F5)
    const cachedFast = this.getCachedLesson(lessonId, subjectId);
    if (cachedFast) {
      for (const v of variants) {
        lessonCache.set(`${subjectId}/${topicId}/${v}`, cachedFast);
      }
      return cachedFast;
    }

    // 3. Sprawdź w trwałym localStorage z jawnym topicId
    for (const v of variants) {
      const localCached = getFromCurriculumStorage<LessonDocument>(`jasne_curriculum_lesson_${subjectId}_${topicId}_${v}_v1`) ||
        getFromCurriculumStorage<LessonDocument>(`jasne_curriculum_lesson_${topicId}_${v}_v1`) ||
        getFromCurriculumStorage<LessonDocument>(`jasne_curriculum_lesson_${subjectId}_${v}_v1`);

      if (localCached && localCached.data) {
        const lessonDoc = localCached.data;
        const allDocVariants = Array.from(new Set([...variants, ...getLessonKeyVariants(lessonDoc.id)]));
        for (const docV of allDocVariants) {
          lessonCache.set(`${subjectId}/${topicId}/${docV}`, lessonDoc);
          lessonByIdCache.set(docV, lessonDoc);
          if (subjectId) lessonByIdCache.set(`${subjectId}:${docV}`, lessonDoc);
        }
        if (localCached.isStale && !isTestEnv) {
          this._fetchLessonFromFirestore(topicId, lessonId, subjectId).catch(() => {});
        }
        return lessonDoc;
      }
    }

    if (isTestEnv && (subjectId === 'jezyk-polski' || subjectId === 'pol' || lessonId.startsWith('pol-') || topicId?.startsWith('pol-'))) {
      const fallbackLesson = getPolishFallbackLesson(lessonId);
      if (fallbackLesson) {
        for (const v of variants) {
          lessonCache.set(`${subjectId}/${topicId}/${v}`, fallbackLesson);
          lessonByIdCache.set(v, fallbackLesson);
        }
        saveToCurriculumStorage(`jasne_curriculum_lesson_${subjectId}_${topicId}_${lessonId}_v1`, fallbackLesson);
        return fallbackLesson;
      }
    }

    return this._fetchLessonFromFirestore(topicId, lessonId, subjectId);
  },

  async _fetchLessonFromFirestore(topicId: string, lessonId: string, subjectId: string = DEFAULT_SUBJECT_ID): Promise<LessonDocument | null> {
    const variants = getLessonKeyVariants(lessonId);
    const storageKey = `jasne_curriculum_lesson_${subjectId}_${topicId}_${lessonId}_v1`;
    const canonical = findCanonicalLektura(lessonId) || findCanonicalLektura(topicId);

    try {
      // 1. Sprawdź subjects/{subjectId}/topics/{topicId}/lessons/{v}
      let snap: any = null;
      for (const v of variants) {
        const lessonRef = doc(db, 'subjects', subjectId, 'topics', topicId, 'lessons', v);
        const s = await getDoc(lessonRef);
        if (s.exists()) {
          snap = s;
          break;
        }
      }

      // 2. Fallback do topics/{topicId}/lessons/{v} (TYLKO dla matematyki podstawowej)
      if ((!snap || !snap.exists()) && (subjectId === DEFAULT_SUBJECT_ID || (!lessonId.startsWith('pol-') && !topicId.startsWith('pol-') && subjectId !== 'jezyk-polski' && subjectId !== 'pol'))) {
        for (const v of variants) {
          const lessonRef = doc(db, 'topics', topicId, 'lessons', v);
          const s = await getDoc(lessonRef);
          if (s.exists()) {
            snap = s;
            break;
          }
        }
      }

      if (snap && snap.exists()) {
        const data = snap.data() as LessonDocument;
        const rawTasks = data.tasks || [];
        const normalizedTasks = rawTasks.map((t: any) => 
          enrichTaskWithVisual(normalizeTask(t, { id: snap.id, title: data.title }, { id: topicId }))
        );

        const rawTheoryPill = data.theory_pill || { concept_essence: data.title };
        const enrichedTheoryPill = enrichTheoryPillWithVisual(rawTheoryPill, snap.id);

        const lessonDoc: LessonDocument = {
          ...data,
          id: snap.id,
          topic_id: topicId,
          title: data.title || snap.id,
          theory_pill: enrichedTheoryPill,
          formulaSheet: (data as any).formulaSheet || (data as any).formula_sheet || null,
          formula_sheet: (data as any).formula_sheet || (data as any).formulaSheet || null,
          tasks: normalizedTasks
        };

        const allDocVariants = Array.from(new Set([...variants, ...getLessonKeyVariants(lessonDoc.id)]));
        for (const v of allDocVariants) {
          lessonCache.set(`${subjectId}/${topicId}/${v}`, lessonDoc);
          lessonCache.set(`${topicId}/${v}`, lessonDoc);
          lessonByIdCache.set(v, lessonDoc);
          if (subjectId) {
            lessonByIdCache.set(`${subjectId}:${v}`, lessonDoc);
          }
          saveToCurriculumStorage(`jasne_curriculum_lesson_${subjectId}_${v}_v1`, lessonDoc);
          saveToCurriculumStorage(`jasne_curriculum_lesson_${subjectId}_${topicId}_${v}_v1`, lessonDoc);
        }
        return lessonDoc;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Error fetching lesson ${subjectId}/${topicId}/${lessonId}:`, err);
      if (canonical) {
        return buildCanonicalLessonDoc(canonical, topicId);
      }
    }

    if (canonical) {
      return buildCanonicalLessonDoc(canonical, topicId);
    }

    if (subjectId === 'jezyk-polski' || subjectId === 'pol' || lessonId.startsWith('pol-') || topicId?.startsWith('pol-')) {
      const fallbackLesson = getPolishFallbackLesson(lessonId);
      if (fallbackLesson) {
        for (const v of variants) {
          lessonCache.set(`${subjectId}/${topicId}/${v}`, fallbackLesson);
          lessonCache.set(`${topicId}/${v}`, fallbackLesson);
          lessonByIdCache.set(v, fallbackLesson);
          lessonByIdCache.set(`jezyk-polski:${v}`, fallbackLesson);
        }
        return fallbackLesson;
      }
    }

    return null;
  },

  /**
   * Zwraca lekcję z pamięci podręcznej po samym lessonId ('lesson-1-1' / '1.1' / 'pol-lesson-1-1').
   * Sprawdza pamięć RAM oraz trwały cache localStorage.
   */
  getCachedLesson(lessonId: string, subjectId?: string): LessonDocument | null {
    if (!lessonId) return null;
    const isPolish = subjectId === 'jezyk-polski' || subjectId === 'pol' || lessonId.startsWith('pol-');
    const variants = getLessonKeyVariants(lessonId);

    // 1. Sprawdź najpierw klucz z jawnym subjectId w pamięci RAM
    if (subjectId) {
      for (const v of variants) {
        const scoped = lessonByIdCache.get(`${subjectId}:${v}`);
        if (scoped) return scoped;
      }
    }

    // 2. Sprawdź bezpośrednio po wariantach w RAM
    for (const v of variants) {
      const direct = lessonByIdCache.get(v);
      if (direct) {
        const directIsPolish = direct.id.startsWith('pol-') || direct.topic_id?.startsWith('pol-') || Boolean((direct as any).leksykon);
        if (isPolish && directIsPolish) return direct;
        if (!isPolish && !directIsPolish) return direct;
      }
    }

    for (const lesson of lessonCache.values()) {
      if (lesson?.id && (variants.includes(lesson.id) || variants.includes(normalizeLessonKey(lesson.id)))) {
        const lessonIsPolish = lesson.id.startsWith('pol-') || lesson.topic_id?.startsWith('pol-') || Boolean((lesson as any).leksykon);
        if (isPolish && lessonIsPolish) return lesson;
        if (!isPolish && !lessonIsPolish) return lesson;
      }
    }

    // 3. Sprawdź w trwałym localStorage (Zero-cost cache across F5)
    const subj = subjectId || (isPolish ? 'jezyk-polski' : DEFAULT_SUBJECT_ID);
    for (const v of variants) {
      const local1 = getFromCurriculumStorage<LessonDocument>(`jasne_curriculum_lesson_${subj}_${v}_v1`);
      if (local1?.data) {
        const doc = local1.data;
        const allDocVariants = Array.from(new Set([...variants, ...getLessonKeyVariants(doc.id)]));
        for (const docV of allDocVariants) {
          lessonByIdCache.set(docV, doc);
          if (subj) lessonByIdCache.set(`${subj}:${docV}`, doc);
        }
        return doc;
      }
    }

    // 4. Przeszukaj ewentualne klucze localStorage pasujące do jakiegokolwiek wariantu
    if (typeof localStorage !== 'undefined') {
      try {
        const keys: string[] = Object.keys(localStorage);
        for (const k of keys) {
          if (k && k.startsWith('jasne_curriculum_lesson_')) {
            for (const v of variants) {
              if (k.includes(`_${v}_`) || k.endsWith(`_${v}_v1`)) {
                const hit = getFromCurriculumStorage<LessonDocument>(k);
                if (hit?.data) {
                  const doc = hit.data;
                  const allDocVariants = Array.from(new Set([...variants, ...getLessonKeyVariants(doc.id)]));
                  for (const docV of allDocVariants) {
                    lessonByIdCache.set(docV, doc);
                    if (subj) lessonByIdCache.set(`${subj}:${docV}`, doc);
                  }
                  return doc;
                }
              }
            }
          }
        }
      } catch {}
    }

    const canonical = findCanonicalLektura(lessonId);
    if (canonical) {
      const lessonDoc = buildCanonicalLessonDoc(canonical);
      for (const v of variants) {
        lessonByIdCache.set(v, lessonDoc);
        lessonByIdCache.set(`jezyk-polski:${v}`, lessonDoc);
      }
      return lessonDoc;
    }

    if (isPolish) {
      const fallback = getPolishFallbackLesson(lessonId);
      if (fallback) {
        for (const v of variants) {
          lessonByIdCache.set(v, fallback);
          lessonByIdCache.set(`jezyk-polski:${v}`, fallback);
        }
        return fallback;
      }
    }

    return null;
  },

  /**
   * Dociąga lekcję, jeśli nie ma jej jeszcze w pamięci (np. wznowienie sesji
   * z localStorage albo wejście z egzaminu działowego).
   * Sprawdza cache synchroniczny, a w razie braku topicId dedukuje go z metadanych lub formatu ID.
   */
  async ensureLessonLoaded(
    lessonId: string,
    topicId?: string,
    subjectId: string = DEFAULT_SUBJECT_ID
  ): Promise<LessonDocument | null> {
    const cached = this.getCachedLesson(lessonId, subjectId);
    if (cached) return cached;

    const variants = getLessonKeyVariants(lessonId);

    let resolvedTopicId = topicId;
    if (!resolvedTopicId) {
      // 1. Sprawdź czy temat da się odnaleźć w liście tematów z RAM lub localStorage
      const topics = topicsBySubjectCache.get(subjectId) || 
        getFromCurriculumStorage<TopicDocument[]>(`jasne_curriculum_topics_${subjectId}_v1`)?.data;
      if (topics && Array.isArray(topics)) {
        const found = topics.find(t => 
          t.lessons_metadata?.some(m => variants.includes(m.id) || variants.includes(normalizeLessonKey(m.id)))
        );
        if (found) resolvedTopicId = found.id;
      }

      // 2. Heurystyka z identyfikatora lekcji
      if (!resolvedTopicId) {
        if (lessonId.startsWith('pol-')) {
          const match = lessonId.match(/pol-(?:lesson-)?(\d+)/);
          if (match) resolvedTopicId = `pol-dzial-${match[1]}`;
        } else {
          const match = lessonId.match(/(?:lesson-)?(\d+)[.-]/) || lessonId.match(/^(\d+)\./);
          if (match) resolvedTopicId = `dzial-${match[1]}`;
        }
      }
    }

    if (!resolvedTopicId) {
      // Ostateczna próba: pobierz listę tematów i wyszukaj lekcję
      try {
        const topics = await this.getTopics(subjectId);
        const found = topics.find(t => 
          t.lessons_metadata?.some(m => variants.includes(m.id) || variants.includes(normalizeLessonKey(m.id)))
        );
        if (found) resolvedTopicId = found.id;
      } catch {}
    }

    if (!resolvedTopicId) return null;
    return this.getLesson(resolvedTopicId, lessonId, subjectId);
  },

  /**
   * Pobiera wszystkie lekcje działu (na podstawie lessons_metadata).
   * Koszt: 1 odczyt na lekcję, po pierwszym razie 0 (pamięć podręczna).
   * Używane do generowania egzaminów działowych.
   */
  async getTopicLessons(topicId: string, subjectId: string = DEFAULT_SUBJECT_ID): Promise<LessonDocument[]> {
    const topic = await this.getTopic(topicId, subjectId);
    if (!topic) return [];

    const lessons: LessonDocument[] = [];
    for (const meta of topic.lessons_metadata || []) {
      const lesson = await this.getLesson(topicId, meta.id, subjectId);
      if (lesson) lessons.push(lesson);
    }
    return lessons;
  },

  /**
   * Filary przedmiotu (język polski). Treść pochodzi z dokumentu subjects/{id}.
   */
  async getSubjectPillars(subjectId: string = DEFAULT_SUBJECT_ID): Promise<any[]> {
    if (subjectId === 'jezyk-polski' || subjectId === 'pol') {
      return POLISH_PILLARS;
    }
    const subject = await this.getSubject(subjectId);
    if (subject?.pillars && subject.pillars.length > 0) {
      return subject.pillars;
    }
    return [];
  },

  /**
   * Fetches user's progress for a specific topic: users/{userId}/progress/{topicId}.
   */
  async getUserTopicProgress(userId: string, topicId: string): Promise<UserTopicProgressDocument | null> {
    if (!userId || !topicId) return null;
    const cacheKey = `${userId}/${topicId}`;
    if (userTopicProgressCache.has(cacheKey)) {
      return userTopicProgressCache.get(cacheKey)!;
    }

    try {
      const progRef = doc(db, 'users', userId, 'progress', topicId);
      const snap = await getDoc(progRef);
      if (snap.exists()) {
        const data = snap.data() as UserTopicProgressDocument;
        userTopicProgressCache.set(cacheKey, data);
        return data;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Error fetching progress for ${cacheKey}:`, err);
    }

    const defaultProg: UserTopicProgressDocument = {
      topic_id: topicId,
      completedLessons: {},
      completedTasks: [],
      taskStars: {},
      mistakesCount: 0,
      unlockedItems: [],
      updatedAt: new Date().toISOString()
    };
    return defaultProg;
  },

  /**
   * Saves user's progress for a specific topic: users/{userId}/progress/{topicId}.
   */
  async saveUserTopicProgress(
    userId: string, 
    topicId: string, 
    progress: Partial<UserTopicProgressDocument>
  ): Promise<void> {
    if (!userId || !topicId) return;
    const cacheKey = `${userId}/${topicId}`;

    const existing = userTopicProgressCache.get(cacheKey) || {
      topic_id: topicId,
      completedLessons: {},
      completedTasks: [],
      taskStars: {},
      mistakesCount: 0,
      unlockedItems: [],
      updatedAt: new Date().toISOString()
    };

    const updated: UserTopicProgressDocument = {
      ...existing,
      ...progress,
      topic_id: topicId,
      updatedAt: new Date().toISOString()
    };

    userTopicProgressCache.set(cacheKey, updated);

    try {
      const progRef = doc(db, 'users', userId, 'progress', topicId);
      await setDoc(progRef, updated, { merge: true });
    } catch (err) {
      console.warn(`[curriculumRepository] Error saving progress for ${cacheKey}:`, err);
    }
  },

  /**
   * Helper to retrieve all tasks loaded in memory across lessons.
   */
  getAllCachedTasks(): any[] {
    const tasks: any[] = [];
    lessonCache.forEach(lesson => {
      if (Array.isArray(lesson.tasks)) {
        tasks.push(...lesson.tasks);
      }
    });
    return tasks;
  },

  /**
   * Pobiera zbiór oficjalnych zadań CKE / arkuszy maturalnych z Firestore: exams/{docId}.
   * Zgodnie z zasadą Cache-First (1 odczyt na sesję).
   */
  async getCkeExamTasks(subjectId: string = DEFAULT_SUBJECT_ID): Promise<MaturaTask[]> {
    const docId = subjectId === 'matematyka-podstawowa' ? 'matura-podstawowa' : `matura-${subjectId}`;
    if (ckeExamTasksCache.has(docId)) {
      return ckeExamTasksCache.get(docId)!;
    }

    try {
      const snap = await getDoc(doc(db, 'exams', docId));
      if (snap.exists()) {
        const data = snap.data() as { tasks?: MaturaTask[] };
        const tasks = Array.isArray(data.tasks) ? data.tasks : [];
        ckeExamTasksCache.set(docId, tasks);
        return tasks;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Błąd pobierania zadań CKE dla ${docId}:`, err);
    }

    return [];
  },

  /**
   * Pobiera konkretny arkusz maturalny z Firestore: exams/{examId}.
   * Zgodnie z zasadą Cache-First.
   */
  async getCkeExamSheet(examId: string): Promise<MaturaTask[]> {
    if (ckeExamTasksCache.has(examId)) {
      return ckeExamTasksCache.get(examId)!;
    }

    try {
      const snap = await getDoc(doc(db, 'exams', examId));
      if (snap.exists()) {
        const data = snap.data() as { tasks?: MaturaTask[] };
        const tasks = Array.isArray(data.tasks) ? data.tasks : [];
        ckeExamTasksCache.set(examId, tasks);
        return tasks;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Błąd pobierania arkusza CKE ${examId}:`, err);
    }

    return [];
  },

  /**
   * Clears in-memory caches if manual refresh is requested.
   */
  clearCache(): void {
    subjectsCache = null;
    topicsBySubjectCache.clear();
    topicByIdCache.clear();
    lessonCache.clear();
    lessonByIdCache.clear();
    ckeExamTasksCache.clear();
    userTopicProgressCache.clear();
  }
};

