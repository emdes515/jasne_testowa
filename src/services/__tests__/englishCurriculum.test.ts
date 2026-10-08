// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  mockGetDoc: vi.fn((..._args: any[]): any => Promise.resolve({ exists: () => false, data: () => null })),
  mockGetDocs: vi.fn((..._args: any[]): any => Promise.resolve({ empty: true, forEach: () => {} })),
  mockSetDoc: vi.fn((..._args: any[]): any => Promise.resolve(undefined)),
  mockDoc: vi.fn((..._args: any[]) => ({ id: _args[_args.length - 1], path: _args.slice(1).join('/') })),
  mockCollection: vi.fn((..._args: any[]) => ({ id: _args[_args.length - 1], path: _args.slice(1).join('/') })),
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

import { curriculumRepository, __clearCurriculumMemoryAndStorageForTests } from '../curriculumRepository';
import { calculateMaturaPrediction } from '../../lib/maturaPredictor';
import { ENGLISH_PILLARS } from '../../data/englishCurriculumData';

describe('English Language Module (Język Angielski - CKE Formuła 2023)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    __clearCurriculumMemoryAndStorageForTests();
  });

  describe('Curriculum Pillars & Metadata', () => {
    it('returns the English subject metadata with 4 CKE pillars', async () => {
      const subject = await curriculumRepository.getSubject('jezyk-angielski');
      expect(subject).not.toBeNull();
      expect(subject?.id).toBe('jezyk-angielski');
      expect(subject?.formula).toBe('2023');
      expect(subject?.pillars).toHaveLength(4);
    });

    it('returns 4 pillars through getSubjectPillars with 60 total CKE points and 15 topics', async () => {
      const pillars = await curriculumRepository.getSubjectPillars('jezyk-angielski');
      expect(pillars).toHaveLength(4);

      const totalTopics = pillars.reduce((sum, p) => sum + (p.topics_count || 0), 0);
      expect(totalTopics).toBe(15);

      const totalPoints = pillars.reduce((sum, p) => sum + (p.pointsGoal || 0), 0);
      expect(totalPoints).toBe(60);

      const pillarIds = pillars.map(p => p.id);
      expect(pillarIds).toEqual([
        'pillar-use-of-english',
        'pillar-listening',
        'pillar-reading',
        'pillar-writing'
      ]);
    });
  });

  describe('Topics & Blueprints', () => {
    it('loads all 15 authentic CKE topics', async () => {
      const topics = await curriculumRepository.getTopics('jezyk-angielski');
      expect(topics).toHaveLength(15);

      const topic1 = topics.find(t => t.id === 'eng-dzial-1');
      expect(topic1).toBeDefined();
      expect(topic1?.pillar_id).toBe('pillar-use-of-english');
      expect(topic1?.numericId).toBe(1);

      const topicListening = topics.find(t => t.id === 'eng-dzial-6');
      expect(topicListening).toBeDefined();
      expect(topicListening?.pillar_id).toBe('pillar-listening');

      const topicReading = topics.find(t => t.id === 'eng-dzial-9');
      expect(topicReading).toBeDefined();
      expect(topicReading?.pillar_id).toBe('pillar-reading');

      const topicWriting = topics.find(t => t.id === 'eng-dzial-12');
      expect(topicWriting).toBeDefined();
      expect(topicWriting?.pillar_id).toBe('pillar-writing');
    });

    it('retrieves a single topic by ID', async () => {
      const topic = await curriculumRepository.getTopic('eng-dzial-1', 'jezyk-angielski');
      expect(topic).not.toBeNull();
      expect(topic?.id).toBe('eng-dzial-1');
      expect(topic?.lessons_metadata.length).toBeGreaterThan(0);
    });
  });

  describe('Core-4 Lessons & Tasks', () => {
    it('retrieves a lesson with Core-4 Bento theory pill', async () => {
      const lesson = await curriculumRepository.getLesson('eng-dzial-1', 'eng-lesson-1-1', 'jezyk-angielski');
      expect(lesson).not.toBeNull();
      expect(lesson?.id).toBe('eng-lesson-1-1');
      expect(lesson?.tasks.length).toBeGreaterThan(0);

      const pill = lesson?.theory_pill;
      expect(pill).toBeDefined();
      expect(pill?.concept_essence).toBeTruthy();
      expect((pill?.concept_essence?.length || 0)).toBeGreaterThan(150);
      expect(pill?.worked_examples).toBeDefined();
      expect(pill?.worked_examples?.length).toBeGreaterThanOrEqual(2);
      expect(pill?.worked_example).toBeTruthy();
      expect(pill?.exam_trap).toBeTruthy();
      expect(pill?.matura_context).toBeTruthy();
    });

    it('ensures listening lesson loads with audio_url and transcript_snippet', async () => {
      const lesson = await curriculumRepository.ensureLessonLoaded('eng-lesson-6-1', 'eng-dzial-6', 'jezyk-angielski');
      expect(lesson).not.toBeNull();
      expect(lesson?.tasks.length).toBeGreaterThan(0);

      const listeningTask = lesson?.tasks.find((t: any) => t.audio_url || t.transcript_snippet);
      expect(listeningTask).toBeDefined();
      expect(listeningTask?.audio_url).toContain('.mp3');
      expect(listeningTask?.transcript_snippet).toBeTruthy();
    });

    it('ensures writing lesson loads with CKE rubric criteria', async () => {
      const lesson = await curriculumRepository.ensureLessonLoaded('eng-lesson-15-1', 'eng-dzial-15', 'jezyk-angielski');
      expect(lesson).not.toBeNull();

      const writingTask = lesson?.tasks.find((t: any) => t.type === 'OPEN_TASK');
      expect(writingTask).toBeDefined();
      expect(writingTask?.type).toBe('OPEN_TASK');
      expect(writingTask?.ai_tutor_rubric).toBeDefined();
      expect(writingTask?.ai_tutor_rubric?.max_points).toBe(12);
    });
  });

  describe('Matura Predictor for English', () => {
    it('calculates 60-point scale prediction with 18-point passing threshold', () => {
      const prediction = calculateMaturaPrediction({
        subjectId: 'jezyk-angielski',
        completedTasks: ['eng-task-1-1', 'eng-task-1-2'],
        maturaAttempts: 0
      });

      expect(prediction).toBeDefined();
      expect(prediction.totalExamPoints).toBe(60);
      expect(prediction.passingThresholdPoints).toBe(18);
      expect(prediction.isPassing).toBe(false);
      expect(prediction.predictedPercent).toBeGreaterThanOrEqual(0);
      expect(prediction.predictedPercent).toBeLessThanOrEqual(100);
      expect(prediction.topicBreakdown.length).toBe(15);
    });
  });
});
