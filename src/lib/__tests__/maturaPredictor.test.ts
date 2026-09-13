import { describe, it, expect } from 'vitest';
import { extractTopicIdFromEntityId, calculateMaturaPrediction } from '../maturaPredictor';

describe('maturaPredictor', () => {
  describe('extractTopicIdFromEntityId', () => {
    it('correctly maps math task and lesson identifiers to dzial-X', () => {
      expect(extractTopicIdFromEntityId('task-1-2-3', 'matematyka-podstawowa')).toBe('dzial-1');
      expect(extractTopicIdFromEntityId('lesson-2-1', 'matematyka-podstawowa')).toBe('dzial-2');
      expect(extractTopicIdFromEntityId('dzial-5', 'matematyka-podstawowa')).toBe('dzial-5');
      expect(extractTopicIdFromEntityId('THEORY-lesson-3-1', 'matematyka-podstawowa')).toBe('dzial-3');
      expect(extractTopicIdFromEntityId('LESSON-4-2', 'matematyka-podstawowa')).toBe('dzial-4');
      expect(extractTopicIdFromEntityId('1.5', 'matematyka-podstawowa')).toBe('dzial-1');
      expect(extractTopicIdFromEntityId('12.3', 'matematyka-podstawowa')).toBe('dzial-12');
    });

    it('correctly maps polish task and lesson identifiers to pol-dzial-X', () => {
      expect(extractTopicIdFromEntityId('pol-dzial-2', 'jezyk-polski')).toBe('pol-dzial-2');
      expect(extractTopicIdFromEntityId('pol-task-3-1', 'jezyk-polski')).toBe('pol-dzial-3');
      expect(extractTopicIdFromEntityId('pol-lesson-1-4', 'jezyk-polski')).toBe('pol-dzial-1');
    });

    it('correctly maps english basic and extended identifiers', () => {
      expect(extractTopicIdFromEntityId('eng-1-1-1', 'jezyk-angielski')).toBe('eng-dzial-1');
      expect(extractTopicIdFromEntityId('eng-dzial-4', 'jezyk-angielski')).toBe('eng-dzial-4');
      expect(extractTopicIdFromEntityId('eng-roz-1-1-1', 'jezyk-angielski-rozszerzony')).toBe('eng-roz-dzial-1');
      expect(extractTopicIdFromEntityId('eng-roz-dzial-3', 'jezyk-angielski-rozszerzony')).toBe('eng-roz-dzial-3');
    });

    it('correctly maps math extended identifiers', () => {
      expect(extractTopicIdFromEntityId('mat-roz-1-1-1', 'matematyka-rozszerzona')).toBe('mat-roz-dzial-1');
      expect(extractTopicIdFromEntityId('mat-roz-dzial-5', 'matematyka-rozszerzona')).toBe('mat-roz-dzial-5');
    });

    it('returns null for unmatchable IDs', () => {
      expect(extractTopicIdFromEntityId('random-id-xyz', 'matematyka-podstawowa')).toBeNull();
      expect(extractTopicIdFromEntityId('', 'matematyka-podstawowa')).toBeNull();
    });
  });

  describe('calculateMaturaPrediction', () => {
    it('returns initial calibration status when user has 0 tasks and 0 attempts', () => {
      const result = calculateMaturaPrediction({
        subjectId: 'matematyka-podstawowa',
        completedTasks: [],
        lessonMistakes: {},
        userLessonsCompleted: [],
        maturaAttempts: 0
      });

      expect(result).toBeDefined();
      expect(result.isCalibrating).toBe(true);
      expect(result.calibrationProgress.current).toBe(0);
      expect(result.predictedPercent).toBeGreaterThanOrEqual(0);
      expect(result.topicBreakdown.length).toBeGreaterThan(0);
    });

    it('exits calibration when sufficient tasks are completed', () => {
      const result = calculateMaturaPrediction({
        subjectId: 'matematyka-podstawowa',
        completedTasks: [
          'task-1-1-1',
          'task-1-1-2',
          'task-1-2-1',
          'task-1-2-2',
          'task-1-3-1',
          'task-2-1-1'
        ],
        lessonMistakes: {},
        userLessonsCompleted: ['lesson-1-1'],
        maturaAttempts: 0
      });

      expect(result.isCalibrating).toBe(false);
      expect(result.predictedPercent).toBeGreaterThan(0);
      expect(result.predictedPoints).toBeGreaterThan(0);
    });

    it('applies simulated mastery overrides accurately', () => {
      const resultWithoutOverride = calculateMaturaPrediction({
        subjectId: 'matematyka-podstawowa',
        completedTasks: [],
        lessonMistakes: {},
        userLessonsCompleted: []
      });

      const resultWithOverride = calculateMaturaPrediction({
        subjectId: 'matematyka-podstawowa',
        completedTasks: [],
        lessonMistakes: {},
        userLessonsCompleted: [],
        simulatedMasteryOverrides: {
          'dzial-1': 100,
          'dzial-2': 100,
          'dzial-3': 100
        }
      });

      expect(resultWithOverride.predictedPoints).toBeGreaterThan(resultWithoutOverride.predictedPoints);
      const dzial1 = resultWithOverride.topicBreakdown.find(t => t.topicId === 'dzial-1');
      expect(dzial1?.masteryPercent).toBe(100);
    });

    it('correctly calculates prediction for English and Math Rozszerzona', () => {
      const engResult = calculateMaturaPrediction({
        subjectId: 'jezyk-angielski',
        completedTasks: ['eng-1-1-1', 'eng-1-1-2', 'eng-1-1-3', 'eng-1-1-4', 'eng-1-1-5'],
        lessonMistakes: {},
        userLessonsCompleted: ['eng-lesson-1-1']
      });
      expect(engResult.subjectId).toBe('jezyk-angielski');
      expect(engResult.totalExamPoints).toBe(60);
      expect(engResult.passingThresholdPoints).toBe(18);

      const mathRozResult = calculateMaturaPrediction({
        subjectId: 'matematyka-rozszerzona',
        completedTasks: ['mat-roz-1-1-1', 'mat-roz-1-1-2', 'mat-roz-1-1-3', 'mat-roz-1-1-4', 'mat-roz-1-1-5'],
        lessonMistakes: {},
        userLessonsCompleted: ['mat-roz-lesson-1-1']
      });
      expect(mathRozResult.subjectId).toBe('matematyka-rozszerzona');
      expect(mathRozResult.totalExamPoints).toBe(50);
    });
  });
});
