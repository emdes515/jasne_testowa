// @vitest-environment happy-dom
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { 
  ALL_POLISH_TASKS, 
  POLISH_EPOCHS, 
  POLISH_LESSONS, 
  getPolishTasksByPart, 
  getPolishTasksByEpoch, 
  getPolishDatabaseStats, 
  generateMockExam 
} from '../../../data/polish';
import { MATURA_LEKTURY } from '../../../data/maturaLektury';
import { SubjectLobbyModal } from '../../SubjectLobbyModal';
import { playAudioTone } from '../../../utils';
import { UserState } from '../../../types';

describe('Polish Module Integration & Data Integrity', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe('1. CKE 2023 Curriculum Data Integrity', () => {
    it('should verify all Polish lessons exist and meet Core-4 / CKE structure', () => {
      expect(POLISH_LESSONS.length).toBe(75);
      
      POLISH_LESSONS.forEach((lesson, index) => {
        expect(lesson.number).toBe(index + 1);
        expect(lesson.id).toMatch(/^(lekcja-\d+|pol-lesson-[\w-]+)$/);
        expect(lesson.title).toBeTruthy();
        expect(lesson.durationMinutes).toBe(45);
        expect(lesson.introduction).toBeDefined();
        expect(lesson.introduction.gatekeeper).toBeDefined();
        expect(lesson.introduction.gatekeeper.options.length).toBeGreaterThanOrEqual(3);
        expect(typeof lesson.introduction.gatekeeper.correctIndex).toBe('number');
      });
    });

    it('should verify POLISH_EPOCHS covers all 11 required CKE epochs', () => {
      expect(POLISH_EPOCHS.length).toBe(11);
      expect(POLISH_EPOCHS).toContain('Starożytność i Biblia');
      expect(POLISH_EPOCHS).toContain('Średniowiecze');
      expect(POLISH_EPOCHS).toContain('Renesans');
      expect(POLISH_EPOCHS).toContain('Barok');
      expect(POLISH_EPOCHS).toContain('Oświecenie');
      expect(POLISH_EPOCHS).toContain('Romantyzm');
      expect(POLISH_EPOCHS).toContain('Pozytywizm');
      expect(POLISH_EPOCHS).toContain('Młoda Polska');
      expect(POLISH_EPOCHS).toContain('Dwudziestolecie międzywojenne');
      expect(POLISH_EPOCHS).toContain('Wojna i okupacja');
      expect(POLISH_EPOCHS).toContain('Współczesność');
    });

    it('should verify MATURA_LEKTURY compulsory readings have cardinal error warnings', () => {
      expect(MATURA_LEKTURY.length).toBeGreaterThanOrEqual(6);

      MATURA_LEKTURY.forEach((book) => {
        expect(book.id).toBeTruthy();
        expect(book.title).toBeTruthy();
        expect(book.epoch).toBeTruthy();
        expect(book.cardinalWarning).toBeTruthy();
        expect(book.cardinalWarning.length).toBeGreaterThan(15);
      });
    });

    it('should verify ALL_POLISH_TASKS has valid parts and taskTypes', () => {
      expect(ALL_POLISH_TASKS.length).toBeGreaterThanOrEqual(20);

      ALL_POLISH_TASKS.forEach((task) => {
        expect([1, 2, 3]).toContain(task.part);
        expect(task.title).toBeTruthy();
        expect(task.question).toBeTruthy();
        expect(task.points).toBeGreaterThan(0);
        expect([
          'single_choice',
          'true_false',
          'matching',
          'short_open',
          'synthesis_note',
          'cardinal_error_detector',
          'context_architect',
          'essay_blueprint'
        ]).toContain(task.taskType);
      });
    });
  });

  describe('2. Polish Query & Mock Exam Blueprint', () => {
    it('should filter tasks by part correctly', () => {
      const part1 = getPolishTasksByPart(1);
      const part2 = getPolishTasksByPart(2);
      const part3 = getPolishTasksByPart(3);

      expect(part1.every((t) => t.part === 1)).toBe(true);
      expect(part2.every((t) => t.part === 2)).toBe(true);
      expect(part3.every((t) => t.part === 3)).toBe(true);
      expect(part1.length + part2.length + part3.length).toBe(ALL_POLISH_TASKS.length);
    });

    it('should filter tasks by epoch correctly', () => {
      const romantyzmTasks = getPolishTasksByEpoch('Romantyzm');
      expect(romantyzmTasks.every((t) => t.epoch === 'Romantyzm')).toBe(true);
    });

    it('should return valid database summary statistics', () => {
      const stats = getPolishDatabaseStats();
      expect(stats.totalTasks).toBe(ALL_POLISH_TASKS.length);
      expect(stats.epochsCovered).toBe(11);
      expect(stats.part1Count).toBeGreaterThan(0);
      expect(stats.part2Count).toBeGreaterThan(0);
      expect(stats.part3Count).toBeGreaterThan(0);
    });

    it('should generate a valid 3-part mock exam structure', () => {
      const mockExam = generateMockExam();
      expect(mockExam.part1Tasks.length).toBeGreaterThan(0);
      expect(mockExam.part2Tasks.length).toBeGreaterThan(0);
      expect(mockExam.essayTask).toBeDefined();
      expect(mockExam.part1Tasks.every((t) => t.part === 1)).toBe(true);
      expect(mockExam.part2Tasks.every((t) => t.part === 2)).toBe(true);
      expect(mockExam.essayTask.part).toBe(3);
    });
  });

  describe('3. Web Audio API Procedural Tone Generator', () => {
    it('should safely execute playAudioTone without throwing in test environment', () => {
      expect(() => playAudioTone('success')).not.toThrow();
      expect(() => playAudioTone('error')).not.toThrow();
      expect(() => playAudioTone('click')).not.toThrow();
    });

    it('should invoke AudioContext oscillator and gain nodes when available', () => {
      const mockOscillator = {
        type: 'sine',
        frequency: { setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      };
      const mockGain = {
        gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect: vi.fn(),
      };
      const mockContext = {
        state: 'running',
        currentTime: 0,
        resume: vi.fn().mockResolvedValue(undefined),
        createOscillator: vi.fn().mockReturnValue(mockOscillator),
        createGain: vi.fn().mockReturnValue(mockGain),
        destination: {},
      };

      const MockAudioContext = vi.fn(function (this: any) {
        return mockContext;
      });

      vi.stubGlobal('AudioContext', MockAudioContext);
      if (typeof window !== 'undefined') {
        (window as any).AudioContext = MockAudioContext;
      }

      playAudioTone('success');
      expect(mockContext.createOscillator).toHaveBeenCalled();
      expect(mockContext.createGain).toHaveBeenCalled();
      expect(mockOscillator.start).toHaveBeenCalled();
      vi.unstubAllGlobals();
    });
  });

  describe('4. SubjectLobbyModal Component', () => {
    it('should render subject options and allow switching to Polish', () => {
      const onSelectSubject = vi.fn();
      const onClose = vi.fn();

      render(
        <SubjectLobbyModal
          isOpen={true}
          onClose={onClose}
          currentSubject="matematyka"
          onSelectSubject={onSelectSubject}
          polishStats={{ total: 1056, epochs: 11, lektury: 10 }}
          mathStats={{ total: 1006, topics: 15 }}
        />
      );

      expect(screen.getByText('Centralne Lobby Maturalne')).toBeDefined();
      expect(screen.getByText('Język Polski')).toBeDefined();
      expect(screen.getByText('Matematyka')).toBeDefined();

      const polishCard = screen.getByText('Język Polski').closest('div[class*="rounded-xl"]');
      expect(polishCard).toBeDefined();
      if (polishCard) {
        fireEvent.click(polishCard);
        expect(onSelectSubject).toHaveBeenCalledWith('polski');
      }
    });

    it('should call onClose when close button is clicked', () => {
      const onSelectSubject = vi.fn();
      const onClose = vi.fn();

      render(
        <SubjectLobbyModal
          isOpen={true}
          onClose={onClose}
          currentSubject="polski"
          onSelectSubject={onSelectSubject}
        />
      );

      const closeButton = screen.getByTitle('Zamknij lobby');
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('5. Polish UserState Separation', () => {
    it('should properly isolate completedLessonsPolish from completedTasksPolish and math completed_lessons', () => {
      const initialState: UserState = {
        xp: 100,
        coins: 50,
        gems: 5,
        level: 1,
        campusRust: 0,
        lastActive: Date.now(),
        streakDays: 3,
        completed_lessons: ['lesson-1-1'],
        completedLessonsPolish: [],
        completedTasksPolish: [],
        polishStats: { totalPoints: 0, completedCount: 0 }
      };

      // Simulating handlePolishLessonComplete
      const lessonId = 'lesson-lekcja-1';
      const cleanLessonId = lessonId.replace(/^lesson-/, '');
      const lessonPoints = 15;
      
      const afterLessonState: UserState = {
        ...initialState,
        completedLessonsPolish: [...(initialState.completedLessonsPolish || []), cleanLessonId],
        polishStats: {
          totalPoints: (initialState.polishStats?.totalPoints || 0) + lessonPoints,
          completedCount: 1,
          lastLessonId: cleanLessonId
        }
      };

      expect(afterLessonState.completedLessonsPolish).toContain('lekcja-1');
      expect(afterLessonState.completedTasksPolish?.length).toBe(0);
      expect(afterLessonState.completed_lessons).toEqual(['lesson-1-1']); // Math untouched
      expect(afterLessonState.polishStats?.completedCount).toBe(1);
      expect(afterLessonState.polishStats?.totalPoints).toBe(15);

      // Simulating handlePolishTaskComplete for single question
      const singleTaskId = 'p1-02';
      const taskPoints = 2;

      const afterTaskState: UserState = {
        ...afterLessonState,
        completedTasksPolish: [...(afterLessonState.completedTasksPolish || []), singleTaskId],
        polishStats: {
          ...afterLessonState.polishStats!,
          totalPoints: afterLessonState.polishStats!.totalPoints + taskPoints,
        }
      };

      expect(afterTaskState.completedTasksPolish).toContain('p1-02');
      expect(afterTaskState.completedLessonsPolish).toEqual(['lekcja-1']); // Still only 1 lesson completed
      expect(afterTaskState.polishStats?.completedCount).toBe(1);
      expect(afterTaskState.polishStats?.totalPoints).toBe(17);
    });
  });

  describe('6. Synthesis Note Word Counter & Constraints', () => {
    const evaluateSynthesisWords = (text: string) => {
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const isValid = words >= 60 && words <= 90;
      const isUnder = words < 60;
      const isOver = words > 90;
      return { words, isValid, isUnder, isOver };
    };

    it('should flag under-limit text (< 60 words)', () => {
      const shortText = 'To jest za krótki tekst syntezy zawierający zaledwie kilka słów.';
      const res = evaluateSynthesisWords(shortText);
      expect(res.words).toBeLessThan(60);
      expect(res.isValid).toBe(false);
      expect(res.isUnder).toBe(true);
    });

    it('should accept valid synthesis length (60 to 90 words)', () => {
      const validText = Array(75).fill('słowo').join(' ');
      const res = evaluateSynthesisWords(validText);
      expect(res.words).toBe(75);
      expect(res.isValid).toBe(true);
      expect(res.isUnder).toBe(false);
      expect(res.isOver).toBe(false);
    });

    it('should flag over-limit text (> 90 words)', () => {
      const longText = Array(95).fill('słowo').join(' ');
      const res = evaluateSynthesisWords(longText);
      expect(res.words).toBe(95);
      expect(res.isValid).toBe(false);
      expect(res.isOver).toBe(true);
    });
  });
});
