// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  mockGetDoc: vi.fn((..._args: any[]): any => Promise.resolve({ exists: () => false, data: () => null })),
  mockGetDocs: vi.fn((..._args: any[]): any => Promise.resolve({ empty: true, forEach: () => {} })),
  mockSetDoc: vi.fn((..._args: any[]): any => Promise.resolve(undefined)),
  mockDoc: vi.fn((..._args: any[]) => {
    const pathSegments = _args.slice(1);
    return {
      id: pathSegments[pathSegments.length - 1],
      path: pathSegments.join('/')
    };
  }),
  mockCollection: vi.fn((..._args: any[]) => {
    const pathSegments = _args.slice(1);
    return {
      id: pathSegments[pathSegments.length - 1],
      path: pathSegments.join('/')
    };
  }),
  mockQuery: vi.fn((...args: any[]) => args[0]),
  mockOrderBy: vi.fn((..._args: any[]) => {})
}));

vi.mock('firebase/firestore', () => ({
  doc: (...args: any[]) => mocks.mockDoc(...args),
  collection: (...args: any[]) => mocks.mockCollection(...args),
  getDoc: (...args: any[]) => mocks.mockGetDoc(...args),
  getDocs: (...args: any[]) => mocks.mockGetDocs(...args),
  setDoc: (...args: any[]) => mocks.mockSetDoc(...args),
  query: (...args: any[]) => mocks.mockQuery(...args),
  orderBy: (...args: any[]) => mocks.mockOrderBy(...args)
}));

vi.mock('../../firebase', () => ({
  db: { _type: 'mockDb' }
}));

import {
  curriculumRepository,
  getFromCurriculumStorage,
  saveToCurriculumStorage,
  CURRICULUM_CACHE_VERSION,
  CURRICULUM_CACHE_TTL_MS,
  __clearCurriculumMemoryAndStorageForTests,
  normalizeLessonKey
} from '../curriculumRepository';

describe('curriculumRepository - Zero-Cost Persistent Cache Architecture', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    __clearCurriculumMemoryAndStorageForTests();
  });

  afterEach(() => {
    localStorage.clear();
    __clearCurriculumMemoryAndStorageForTests();
  });

  describe('Storage Envelope & Cache Management', () => {
    it('saves and retrieves envelope with correct version and fresh timestamp', () => {
      const payload = { id: 'test-doc', name: 'Test' };
      saveToCurriculumStorage('jasne_test_key', payload);

      const cached = getFromCurriculumStorage<typeof payload>('jasne_test_key');
      expect(cached).not.toBeNull();
      expect(cached?.data).toEqual(payload);
      expect(cached?.isStale).toBe(false);
    });

    it('rejects cached items with version mismatch', () => {
      const outdatedEnvelope = {
        version: CURRICULUM_CACHE_VERSION + 999,
        timestamp: Date.now(),
        data: { id: 'old' }
      };
      localStorage.setItem('jasne_test_key', JSON.stringify(outdatedEnvelope));

      const cached = getFromCurriculumStorage('jasne_test_key');
      expect(cached).toBeNull();
    });

    it('flags items as stale when timestamp exceeds TTL (12 hours)', () => {
      const staleTimestamp = Date.now() - (CURRICULUM_CACHE_TTL_MS + 60 * 1000);
      const staleEnvelope = {
        version: CURRICULUM_CACHE_VERSION,
        timestamp: staleTimestamp,
        data: { id: 'stale-data' }
      };
      localStorage.setItem('jasne_test_key', JSON.stringify(staleEnvelope));

      const cached = getFromCurriculumStorage<any>('jasne_test_key');
      expect(cached).not.toBeNull();
      expect(cached?.data.id).toBe('stale-data');
      expect(cached?.isStale).toBe(true);
    });

    it('handles QuotaExceededError by pruning older lesson cache entries', () => {
      localStorage.setItem('jasne_curriculum_lesson_old_1', '{"data":"old1"}');
      localStorage.setItem('jasne_curriculum_lesson_old_2', '{"data":"old2"}');
      localStorage.setItem('user_unrelated_key', 'keep_me');

      // Force QuotaExceededError on the first setItem call for the new item
      const originalSetItem = localStorage.setItem.bind(localStorage);
      let failedOnce = false;
      vi.spyOn(localStorage, 'setItem').mockImplementation((key: string, val: string) => {
        if (!failedOnce && key === 'jasne_quota_key') {
          failedOnce = true;
          throw new DOMException('QuotaExceededError', 'QuotaExceededError');
        }
        return originalSetItem(key, val);
      });

      saveToCurriculumStorage('jasne_quota_key', { success: true });

      // After pruning, old lesson entries should be removed
      expect(localStorage.getItem('jasne_curriculum_lesson_old_1')).toBeNull();
      expect(localStorage.getItem('jasne_curriculum_lesson_old_2')).toBeNull();
      expect(localStorage.getItem('user_unrelated_key')).toBe('keep_me');

      const retrieved = getFromCurriculumStorage<{ success: boolean }>('jasne_quota_key');
      expect(retrieved?.data.success).toBe(true);
    });
  });

  describe('Zero-Cost Reads across Refreshes & Memory Rebuild', () => {
    it('normalizeLessonKey normalizes various lesson ID representations', () => {
      expect(normalizeLessonKey('lesson-1-1')).toBe('1.1');
      expect(normalizeLessonKey('1.1')).toBe('1.1');
      expect(normalizeLessonKey('pol-lesson-1-1')).toBe('pol-1.1');
      expect(normalizeLessonKey('pol-1.1')).toBe('pol-1.1');
    });

    it('getTopics fetches from Firestore on first call and uses localStorage with 0 Firestore reads on second call after RAM wipe', async () => {
      const mockTopics = [
        {
          id: 'dzial-1',
          numericId: 1,
          title: 'Liczby rzeczywiste',
          lessons_metadata: [{ id: '1.1', title: 'Potęgi' }]
        },
        {
          id: 'dzial-2',
          numericId: 2,
          title: 'Algebra',
          lessons_metadata: [{ id: '2.1', title: 'Wyrażenia' }]
        }
      ];

      mocks.mockGetDocs.mockResolvedValueOnce({
        empty: false,
        forEach: (cb: (doc: any) => void) => {
          mockTopics.forEach(t => cb({ id: t.id, data: () => t }));
        }
      });

      // 1. First call: reads from Firestore
      const topics1 = await curriculumRepository.getTopics('matematyka-podstawowa');
      expect(topics1).toHaveLength(2);
      expect(mocks.mockGetDocs).toHaveBeenCalledTimes(1);

      // Verify localStorage was populated
      const localCached = getFromCurriculumStorage('jasne_curriculum_topics_matematyka-podstawowa_v1');
      expect(localCached).not.toBeNull();

      // 2. Second call in same session: reads from RAM cache (0 Firestore reads)
      const topics2 = await curriculumRepository.getTopics('matematyka-podstawowa');
      expect(topics2).toHaveLength(2);
      expect(mocks.mockGetDocs).toHaveBeenCalledTimes(1);

      // 3. Simulate page refresh: wipe in-memory cache only, leaving localStorage intact
      // We manually clear memory maps by calling getCachedLesson reset or re-clearing memory
      __clearCurriculumMemoryAndStorageForTests();
      // Re-populate localStorage to simulate persisted session after F5
      saveToCurriculumStorage('jasne_curriculum_topics_matematyka-podstawowa_v1', mockTopics);

      const topicsAfterF5 = await curriculumRepository.getTopics('matematyka-podstawowa');
      expect(topicsAfterF5).toHaveLength(2);
      // Still exactly 1 Firestore call from the beginning!
      expect(mocks.mockGetDocs).toHaveBeenCalledTimes(1);
    });

    it('getLesson fetches from Firestore once and serves from localStorage with 0 Firestore reads after page refresh', async () => {
      const mockLesson = {
        id: '1.1',
        topic_id: 'dzial-1',
        title: 'Potęgi i pierwiastki',
        theory_pill: {
          concept_essence: 'Definicja potęgowania',
          core_formulas: [{ name: 'Wzór', formula: 'a^n' }]
        },
        tasks: [
          { id: 'task-1', type: 'SINGLE_CHOICE', question: '2^3 = ?' }
        ]
      };

      mocks.mockGetDoc.mockResolvedValueOnce({
        exists: () => true,
        id: '1.1',
        data: () => mockLesson
      });

      // 1. First call: reads from Firestore
      const lesson1 = await curriculumRepository.getLesson('dzial-1', '1.1', 'matematyka-podstawowa');
      expect(lesson1).not.toBeNull();
      expect(lesson1?.id).toBe('1.1');
      expect(mocks.mockGetDoc).toHaveBeenCalledTimes(1);

      // 2. Immediate second call: reads from RAM cache (0 extra Firestore calls)
      const lesson2 = await curriculumRepository.getLesson('dzial-1', '1.1', 'matematyka-podstawowa');
      expect(lesson2?.id).toBe('1.1');
      expect(mocks.mockGetDoc).toHaveBeenCalledTimes(1);

      // 3. Simulate F5 refresh: wipe RAM, keep localStorage
      __clearCurriculumMemoryAndStorageForTests();
      saveToCurriculumStorage('jasne_curriculum_lesson_matematyka-podstawowa_dzial-1_1.1_v1', mockLesson);

      const lessonAfterF5 = await curriculumRepository.getLesson('dzial-1', '1.1', 'matematyka-podstawowa');
      expect(lessonAfterF5).not.toBeNull();
      expect(lessonAfterF5?.id).toBe('1.1');
      expect(lessonAfterF5?.theory_pill?.concept_essence).toBe('Definicja potęgowania');
      // Still 0 additional Firestore calls!
      expect(mocks.mockGetDoc).toHaveBeenCalledTimes(1);
    });

    it('getCachedLesson synchronously retrieves lesson from persistent localStorage cache', () => {
      const mockLesson = {
        id: '1.2',
        topic_id: 'dzial-1',
        title: 'Pierwiastki arytmetyczne',
        theory_pill: { concept_essence: 'Zasady wyciągania pierwiastka' },
        tasks: []
      };

      // Save to localStorage directly
      saveToCurriculumStorage('jasne_curriculum_lesson_matematyka-podstawowa_1.2_v1', mockLesson);

      // Synchronous retrieval must find the lesson immediately
      const hit = curriculumRepository.getCachedLesson('1.2', 'matematyka-podstawowa');
      expect(hit).not.toBeNull();
      expect(hit?.id).toBe('1.2');
      expect(hit?.theory_pill?.concept_essence).toBe('Zasady wyciągania pierwiastka');
    });

    it('ensureLessonLoaded resolves topicId automatically and returns lesson from persistent cache', async () => {
      const mockLesson = {
        id: '1.3',
        topic_id: 'dzial-1',
        title: 'Logarytmy',
        theory_pill: { concept_essence: 'Definicja logarytmu' },
        tasks: []
      };

      saveToCurriculumStorage('jasne_curriculum_lesson_matematyka-podstawowa_dzial-1_1.3_v1', mockLesson);

      // Call ensureLessonLoaded without topicId
      const loaded = await curriculumRepository.ensureLessonLoaded('1.3', undefined, 'matematyka-podstawowa');
      expect(loaded).not.toBeNull();
      expect(loaded?.id).toBe('1.3');
      expect(loaded?.theory_pill?.concept_essence).toBe('Definicja logarytmu');
    });
  });
});
