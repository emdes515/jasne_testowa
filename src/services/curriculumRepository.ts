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

// In-Memory Caches for zero unnecessary reads within the app session
let subjectsCache: SubjectDocument[] | null = null;
const topicsBySubjectCache = new Map<string, TopicDocument[]>();
const topicByIdCache = new Map<string, TopicDocument>();
const lessonCache = new Map<string, LessonDocument>();
const ckeExamTasksCache = new Map<string, MaturaTask[]>();
/** Lekcje po samym lessonId — potrzebne, gdy znamy tylko identyfikator lekcji. */
const lessonByIdCache = new Map<string, LessonDocument>();
const userTopicProgressCache = new Map<string, UserTopicProgressDocument>();

/** Ujednolica klucze lekcji zachowując przedrostek przedmiotu (np. 'pol-lesson-1-1' -> 'pol-1.1', 'lesson-1-1' -> '1.1') */
export function normalizeLessonKey(lessonId: string): string {
  const str = String(lessonId || '').toLowerCase();
  if (str.startsWith('pol-')) {
    return str.replace(/^pol-lesson-/, 'pol-').replace(/-/g, '.');
  }
  return str.replace(/^lesson-/, '').replace(/-/g, '.');
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
      return subjectsCache;
    }

    try {
      const subjectsColRef = collection(db, 'subjects');
      const snap = await getDocs(query(subjectsColRef));
      if (!snap.empty) {
        const list: SubjectDocument[] = [];
        snap.forEach(d => {
          list.push({ ...d.data(), id: d.id } as SubjectDocument);
        });
        subjectsCache = list;
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
   * Reads from in-memory cache first, then Firestore persistent cache / network.
   */
  async getTopics(subjectId: string = DEFAULT_SUBJECT_ID): Promise<TopicDocument[]> {
    if (topicsBySubjectCache.has(subjectId)) {
      return topicsBySubjectCache.get(subjectId)!;
    }

    if (isTestEnv && (subjectId === 'jezyk-polski' || subjectId === 'pol')) {
      topicsBySubjectCache.set(subjectId, POLISH_FALLBACK_TOPICS);
      for (const t of POLISH_FALLBACK_TOPICS) {
        topicByIdCache.set(`${subjectId}/${t.id}`, t);
        topicByIdCache.set(t.id, t);
      }
      return POLISH_FALLBACK_TOPICS;
    }

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
   * Exactly 1 document read. Cached in-memory afterwards (0 reads on revisit).
   */
  async getLesson(topicId: string, lessonId: string, subjectId: string = DEFAULT_SUBJECT_ID): Promise<LessonDocument | null> {
    const cacheKey = `${subjectId}/${topicId}/${lessonId}`;
    const fallbackCacheKey = `${topicId}/${lessonId}`;

    if (lessonCache.has(cacheKey)) {
      return lessonCache.get(cacheKey)!;
    }
    if (lessonCache.has(fallbackCacheKey)) {
      return lessonCache.get(fallbackCacheKey)!;
    }

    // 0. Sprawdź czy to kanoniczna lektura z bazy Filaru II języka polskiego
    const canonical = findCanonicalLektura(lessonId) || findCanonicalLektura(topicId);
    if (canonical && (subjectId === 'jezyk-polski' || subjectId === 'pol' || lessonId.startsWith('pol-') || topicId.startsWith('pol-'))) {
      const lessonDoc = buildCanonicalLessonDoc(canonical, topicId);
      lessonCache.set(cacheKey, lessonDoc);
      lessonCache.set(fallbackCacheKey, lessonDoc);
      lessonByIdCache.set(lessonDoc.id, lessonDoc);
      lessonByIdCache.set(normalizeLessonKey(lessonDoc.id), lessonDoc);
      return lessonDoc;
    }

    if (isTestEnv && (subjectId === 'jezyk-polski' || subjectId === 'pol' || lessonId.startsWith('pol-') || topicId?.startsWith('pol-'))) {
      const fallbackLesson = getPolishFallbackLesson(lessonId);
      if (fallbackLesson) {
        lessonCache.set(cacheKey, fallbackLesson);
        lessonCache.set(fallbackCacheKey, fallbackLesson);
        lessonByIdCache.set(fallbackLesson.id, fallbackLesson);
        lessonByIdCache.set(normalizeLessonKey(fallbackLesson.id), fallbackLesson);
        return fallbackLesson;
      }
    }

    try {
      // 1. Sprawdź subjects/{subjectId}/topics/{topicId}/lessons/{lessonId}
      let lessonRef = doc(db, 'subjects', subjectId, 'topics', topicId, 'lessons', lessonId);
      let snap = await getDoc(lessonRef);

      // 2. Fallback do topics/{topicId}/lessons/{lessonId} (TYLKO dla matematyki podstawowej)
      if (!snap.exists() && (subjectId === DEFAULT_SUBJECT_ID || (!lessonId.startsWith('pol-') && !topicId.startsWith('pol-') && subjectId !== 'jezyk-polski' && subjectId !== 'pol'))) {
        lessonRef = doc(db, 'topics', topicId, 'lessons', lessonId);
        snap = await getDoc(lessonRef);
      }

      if (snap.exists()) {
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

        lessonCache.set(cacheKey, lessonDoc);
        lessonCache.set(fallbackCacheKey, lessonDoc);
        lessonByIdCache.set(lessonDoc.id, lessonDoc);
        lessonByIdCache.set(normalizeLessonKey(lessonDoc.id), lessonDoc);
        if (subjectId) {
          lessonByIdCache.set(`${subjectId}:${lessonDoc.id}`, lessonDoc);
          lessonByIdCache.set(`${subjectId}:${normalizeLessonKey(lessonDoc.id)}`, lessonDoc);
        }
        return lessonDoc;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Error fetching lesson ${cacheKey}:`, err);
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
        lessonCache.set(cacheKey, fallbackLesson);
        lessonCache.set(fallbackCacheKey, fallbackLesson);
        lessonByIdCache.set(fallbackLesson.id, fallbackLesson);
        lessonByIdCache.set(normalizeLessonKey(fallbackLesson.id), fallbackLesson);
        lessonByIdCache.set(`jezyk-polski:${fallbackLesson.id}`, fallbackLesson);
        lessonByIdCache.set(`jezyk-polski:${normalizeLessonKey(fallbackLesson.id)}`, fallbackLesson);
        return fallbackLesson;
      }
    }

    return null;
  },

  /**
   * Zwraca lekcję z pamięci podręcznej po samym lessonId ('lesson-1-1' / '1.1' / 'pol-lesson-1-1').
   *
   * Używane przez funkcje synchroniczne (losowanie zadań sesji, karta wzorów),
   * które nie mogą wykonać odczytu z sieci. Lekcja MUSI zostać wcześniej pobrana
   * przez getLesson() — robią to widoki przed rozpoczęciem sesji.
   */
  getCachedLesson(lessonId: string, subjectId?: string): LessonDocument | null {
    if (!lessonId) return null;
    const isPolish = subjectId === 'jezyk-polski' || subjectId === 'pol' || lessonId.startsWith('pol-');

    // 1. Sprawdź najpierw klucz z jawnym subjectId
    if (subjectId) {
      const scoped = lessonByIdCache.get(`${subjectId}:${lessonId}`) || lessonByIdCache.get(`${subjectId}:${normalizeLessonKey(lessonId)}`);
      if (scoped) return scoped;
    }

    // 2. Sprawdź bezpośrednio po id lub normalizeLessonKey, ale upewnij się, że nie zwracamy lekcji z innego przedmiotu
    const direct = lessonByIdCache.get(lessonId) || lessonByIdCache.get(normalizeLessonKey(lessonId));
    if (direct) {
      const directIsPolish = direct.id.startsWith('pol-') || direct.topic_id?.startsWith('pol-') || Boolean((direct as any).leksykon);
      if (isPolish && directIsPolish) return direct;
      if (!isPolish && !directIsPolish) return direct;
    }

    const wanted = normalizeLessonKey(lessonId);
    for (const lesson of lessonCache.values()) {
      if (lesson?.id && normalizeLessonKey(lesson.id) === wanted) {
        const lessonIsPolish = lesson.id.startsWith('pol-') || lesson.topic_id?.startsWith('pol-') || Boolean((lesson as any).leksykon);
        if (isPolish && lessonIsPolish) return lesson;
        if (!isPolish && !lessonIsPolish) return lesson;
      }
    }

    const canonical = findCanonicalLektura(lessonId);
    if (canonical) {
      const lessonDoc = buildCanonicalLessonDoc(canonical);
      lessonByIdCache.set(canonical.id, lessonDoc);
      lessonByIdCache.set(normalizeLessonKey(canonical.id), lessonDoc);
      lessonByIdCache.set(`jezyk-polski:${canonical.id}`, lessonDoc);
      return lessonDoc;
    }

    if (isPolish) {
      const fallback = getPolishFallbackLesson(lessonId);
      if (fallback) {
        lessonByIdCache.set(fallback.id, fallback);
        lessonByIdCache.set(normalizeLessonKey(fallback.id), fallback);
        lessonByIdCache.set(`jezyk-polski:${fallback.id}`, fallback);
        return fallback;
      }
    }

    return null;
  },

  /**
   * Dociąga lekcję, jeśli nie ma jej jeszcze w pamięci (np. wznowienie sesji
   * z localStorage albo wejście z egzaminu działowego).
   */
  async ensureLessonLoaded(
    lessonId: string,
    topicId?: string,
    subjectId: string = DEFAULT_SUBJECT_ID
  ): Promise<LessonDocument | null> {
    const cached = this.getCachedLesson(lessonId, subjectId);
    if (cached) return cached;
    if (!topicId) return null;
    return this.getLesson(topicId, lessonId, subjectId);
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

