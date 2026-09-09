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
  UserTopicProgressDocument 
} from '../schema_firestore';
import { normalizeTask } from '../data/mathTasks';

// In-Memory Caches for zero unnecessary reads within the app session
let topicsCache: TopicDocument[] | null = null;
const topicByIdCache = new Map<string, TopicDocument>();
const lessonCache = new Map<string, LessonDocument>();
const userTopicProgressCache = new Map<string, UserTopicProgressDocument>();

export const curriculumRepository = {
  /**
   * Fetches all topic cards (metadata + lessons_metadata).
   * Reads from in-memory cache first, then Firestore persistent cache / network.
   */
  async getTopics(): Promise<TopicDocument[]> {
    if (topicsCache && topicsCache.length > 0) {
      return topicsCache;
    }

    try {
      const topicsColRef = collection(db, 'topics');
      const q = query(topicsColRef);
      const snapshot = await getDocs(q);

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
          topicByIdCache.set(topicDoc.id, topicDoc);
        });

        topicsList.sort((a, b) => (a.numericId || 0) - (b.numericId || 0));
        topicsCache = topicsList;
        return topicsList;
      }
    } catch (err) {
      console.warn('[curriculumRepository] Failed to fetch topics from Firestore:', err);
    }

    return topicsCache || [];
  },

  /**
   * Fetches a single topic document: topics/{topic_id}.
   * Exactly 1 document read.
   */
  async getTopic(topicId: string): Promise<TopicDocument | null> {
    if (topicByIdCache.has(topicId)) {
      return topicByIdCache.get(topicId)!;
    }

    try {
      const topicRef = doc(db, 'topics', topicId);
      const snap = await getDoc(topicRef);
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
        topicByIdCache.set(topicId, topicDoc);
        return topicDoc;
      }
    } catch (err) {
      console.warn(`[curriculumRepository] Error fetching topic ${topicId}:`, err);
    }

    return null;
  },

  /**
   * Fetches full lesson document: topics/{topic_id}/lessons/{lesson_id}.
   * Contains theory_pill and full tasks array.
   * Exactly 1 document read. Cached in-memory afterwards (0 reads on revisit).
   */
  async getLesson(topicId: string, lessonId: string): Promise<LessonDocument | null> {
    const cacheKey = `${topicId}/${lessonId}`;
    if (lessonCache.has(cacheKey)) {
      return lessonCache.get(cacheKey)!;
    }

    try {
      const lessonRef = doc(db, 'topics', topicId, 'lessons', lessonId);
      const snap = await getDoc(lessonRef);

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
          tasks: normalizedTasks
        };

        lessonCache.set(cacheKey, lessonDoc);
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
    topicsCache = null;
    topicByIdCache.clear();
    lessonCache.clear();
    userTopicProgressCache.clear();
  }
};
