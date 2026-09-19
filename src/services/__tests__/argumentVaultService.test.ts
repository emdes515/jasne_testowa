import { describe, it, expect, vi, beforeEach } from 'vitest';
import { argumentVaultService } from '../argumentVaultService';
import { LALKA_ARGUMENT_BLOCK, DZIADY_ARGUMENT_BLOCK, POLISH_SHOWCASE_LESSONS } from '../../data/polishVerticalSliceData';

describe('argumentVaultService', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      clear: vi.fn(() => {
        store = {};
      })
    };
  })();

  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock);
    localStorageMock.clear();
  });

  it('starts with an empty vault', () => {
    const vault = argumentVaultService.getVault();
    expect(vault.unlockedBlocks).toEqual([]);
    expect(argumentVaultService.getCoverage().unlockedCount).toBe(0);
    expect(argumentVaultService.getCoverage().coveragePercent).toBe(0);
  });

  it('adds and deduplicates argument blocks', () => {
    const res1 = argumentVaultService.addBlock(LALKA_ARGUMENT_BLOCK);
    expect(res1.success).toBe(true);
    expect(res1.isNew).toBe(true);

    // Adding same block again does not duplicate
    const res2 = argumentVaultService.addBlock(LALKA_ARGUMENT_BLOCK);
    expect(res2.success).toBe(true);
    expect(res2.isNew).toBe(false);

    const blocks = argumentVaultService.getUnlockedBlocks();
    expect(blocks.length).toBe(1);
    expect(blocks[0].bookTitle).toBe('Lalka');
    expect(blocks[0].character).toBe('Stanisław Wokulski');
  });

  it('calculates coverage correctly when multiple themes added', () => {
    argumentVaultService.addBlock(LALKA_ARGUMENT_BLOCK);
    argumentVaultService.addBlock(DZIADY_ARGUMENT_BLOCK);

    const coverage = argumentVaultService.getCoverage();
    expect(coverage.unlockedCount).toBe(2);
    expect(coverage.uniqueThemesCount).toBe(2);
    expect(coverage.coveragePercent).toBeGreaterThan(0);
  });

  it('exports clipboard text formatted with TEEL structure', () => {
    argumentVaultService.addBlock(LALKA_ARGUMENT_BLOCK);
    const text = argumentVaultService.exportToClipboardText();

    expect(text).toContain('SKARBIEC ARGUMENTÓW JASNE');
    expect(text).toContain('[T] Teza cząstkowa:');
    expect(text).toContain('[E] Sytuacja / Argument:');
    expect(text).toContain('[C] Kontekst');
    expect(text).toContain('[L] Puenta / Wniosek:');
    expect(text).toContain('Stanisław Wokulski');
  });
});

describe('polishVerticalSliceData integrity', () => {
  it('contains valid showcase lessons for Lalka and Dziady cz. III', () => {
    expect(POLISH_SHOWCASE_LESSONS.length).toBe(2);

    POLISH_SHOWCASE_LESSONS.forEach(lesson => {
      expect(lesson.tasks.length).toBe(3);

      // Task 1: SWIPE_MATCH
      const t1 = lesson.tasks[0];
      expect(t1.type).toBe('SWIPE_MATCH');
      expect(t1.swipeData).toBeDefined();
      expect(t1.swipeData!.cards.length).toBeGreaterThanOrEqual(4);
      t1.swipeData!.cards.forEach(card => {
        expect(card.statement.length).toBeGreaterThan(10);
        expect(typeof card.isCorrect).toBe('boolean');
        expect(card.explanation.length).toBeGreaterThan(5);
      });

      // Task 2: CARDINAL_DETECTOR
      const t2 = lesson.tasks[1];
      expect(t2.type).toBe('CARDINAL_DETECTOR');
      expect(t2.cardinalData).toBeDefined();
      expect(t2.cardinalData!.snippets.length).toBe(3);
      const cardinalErrors = t2.cardinalData!.snippets.filter(s => s.isCardinalError);
      expect(cardinalErrors.length).toBe(1);

      // Task 3: ARGUMENT_BUILDER
      const t3 = lesson.tasks[2];
      expect(t3.type).toBe('ARGUMENT_BUILDER');
      expect(t3.argumentBuilderData).toBeDefined();
      const bData = t3.argumentBuilderData!;
      expect(bData.claimOptions.some(o => o.isCorrect)).toBe(true);
      expect(bData.evidenceOptions.some(o => o.isCorrect)).toBe(true);
      expect(bData.contextOptions.some(o => o.isCorrect)).toBe(true);
      expect(bData.linkOptions.some(o => o.isCorrect)).toBe(true);
      expect(bData.resultingBlock).toBeDefined();
    });
  });
});
