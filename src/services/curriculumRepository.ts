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
import { normalizeTask } from '../data/mathTasks';

export const DEFAULT_SUBJECT_ID = 'matematyka-podstawowa';

// In-Memory Caches for zero unnecessary reads within the app session
let subjectsCache: SubjectDocument[] | null = null;
const topicsBySubjectCache = new Map<string, TopicDocument[]>();
const topicByIdCache = new Map<string, TopicDocument>();
const lessonCache = new Map<string, LessonDocument>();
const userTopicProgressCache = new Map<string, UserTopicProgressDocument>();

export const curriculumRepository = {
  /**
   * Fetches all registered subjects (e.g. Matematyka Podstawowa, Język Polski, etc.).
   */
  async getSubjects(): Promise<SubjectDocument[]> {
    if (subjectsCache && subjectsCache.length > 0) {
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

    try {
      // 1. Sprawdź nową hierarchię wieloprzedmiotową: subjects/{subjectId}/topics
      const subjectTopicsColRef = collection(db, 'subjects', subjectId, 'topics');
      let snapshot = await getDocs(query(subjectTopicsColRef));

      // 2. Fallback do root /topics jeśli hierarchia subjectu jest pusta
      if (snapshot.empty) {
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

        topicsList.sort((a, b) => (a.numericId || 0) - (b.numericId || 0));
        topicsBySubjectCache.set(subjectId, topicsList);
        return topicsList;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Failed to fetch topics for subject ${subjectId}:`, err);
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

    try {
      // 1. Sprawdź subjects/{subjectId}/topics/{topicId}
      let topicRef = doc(db, 'subjects', subjectId, 'topics', topicId);
      let snap = await getDoc(topicRef);

      // 2. Fallback do topics/{topicId}
      if (!snap.exists()) {
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

    try {
      // 1. Sprawdź subjects/{subjectId}/topics/{topicId}/lessons/{lessonId}
      let lessonRef = doc(db, 'subjects', subjectId, 'topics', topicId, 'lessons', lessonId);
      let snap = await getDoc(lessonRef);

      // 2. Fallback do topics/{topicId}/lessons/{lessonId}
      if (!snap.exists()) {
        lessonRef = doc(db, 'topics', topicId, 'lessons', lessonId);
        snap = await getDoc(lessonRef);
      }

      if (snap.exists()) {
        const data = snap.data() as LessonDocument;
        const rawTasks = data.tasks || [];
        const normalizedTasks = rawTasks.map((t: any) => 
          normalizeTask(t, { id: snap.id, title: data.title }, { id: topicId })
        );

        const lessonDoc: LessonDocument = {
          ...data,
          id: snap.id,
          topic_id: topicId,
          title: data.title || snap.id,
          theory_pill: data.theory_pill || { concept_essence: data.title },
          formulaSheet: (data as any).formulaSheet || (data as any).formula_sheet || null,
          formula_sheet: (data as any).formula_sheet || (data as any).formulaSheet || null,
          tasks: normalizedTasks
        };

        lessonCache.set(cacheKey, lessonDoc);
        lessonCache.set(fallbackCacheKey, lessonDoc);
        return lessonDoc;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Error fetching lesson ${cacheKey}:`, err);
    }

    return null;
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
   * Clears in-memory caches if manual refresh is requested.
   */
  clearCache(): void {
    subjectsCache = null;
    topicsBySubjectCache.clear();
    topicByIdCache.clear();
    lessonCache.clear();
    userTopicProgressCache.clear();
  }
};

