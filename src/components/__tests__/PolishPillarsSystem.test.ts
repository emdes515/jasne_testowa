import { describe, it, expect } from 'vitest';
import { 
  POLISH_PILLARS, 
  POLISH_FALLBACK_TOPICS, 
  getPolishFallbackLesson, 
  getPolishFallbackTopic 
} from '../../data/polishCurriculumFallback';
import { 
  CANONICAL_LEKTURY_LIST, 
  findCanonicalLektura, 
  getLekturaByTopic 
} from '../../data/polishLekturyData';
import { curriculumRepository } from '../../services/curriculumRepository';
import { EPOCH_PASSPORTS } from '../polish/PolishEpochPassportModal';

describe('Polish CKE 2023 System - Architecture & Pillars Verification', () => {

  it('should define exactly 3 CKE pillars with authentic point targets', () => {
    expect(POLISH_PILLARS).toHaveLength(3);

    const [pillar1, pillar2, pillar3] = POLISH_PILLARS;
    expect(pillar1.id).toBe('pillar-1-jezyk-w-uzyciu');
    expect(pillar1.pointsGoal).toBe(10);
    expect(pillar1.topics_range).toEqual([1, 4]);

    expect(pillar2.id).toBe('pillar-2-lektury');
    expect(pillar2.pointsGoal).toBe(15);
    expect(pillar2.topics_range).toEqual([5, 16]);

    expect(pillar3.id).toBe('pillar-3-wypracowanie');
    expect(pillar3.pointsGoal).toBe(35);
    expect(pillar3.topics_range).toEqual([17, 20]);
  });

  it('should have exactly 20 authentic CKE topics strictly partitioned across the 3 pillars', () => {
    expect(POLISH_FALLBACK_TOPICS).toHaveLength(20);

    const p1Topics = POLISH_FALLBACK_TOPICS.filter(t => t.pillar_id === 'pillar-1-jezyk-w-uzyciu');
    const p2Topics = POLISH_FALLBACK_TOPICS.filter(t => t.pillar_id === 'pillar-2-lektury');
    const p3Topics = POLISH_FALLBACK_TOPICS.filter(t => t.pillar_id === 'pillar-3-wypracowanie');

    expect(p1Topics).toHaveLength(4);
    expect(p2Topics).toHaveLength(12);
    expect(p3Topics).toHaveLength(4);

    // Topic numbers must be contiguous 1..20
    POLISH_FALLBACK_TOPICS.forEach((t, idx) => {
      expect(t.numericId).toBe(idx + 1);
    });
  });

  it('should map canonical lektury to their official historical epochs (Działy 5–16)', () => {
    const antygona = findCanonicalLektura('antygona');
    expect(antygona).toBeDefined();
    expect(antygona?.numericTopicId).toBe(5);
    expect(antygona?.epoch).toBe('Antyk');

    const dziady = findCanonicalLektura('dziady-3');
    expect(dziady).toBeDefined();
    expect(dziady?.numericTopicId).toBe(10);
    expect(dziady?.epoch).toBe('Romantyzm');

    const kordian = findCanonicalLektura('kordian');
    expect(kordian).toBeDefined();
    expect(kordian?.numericTopicId).toBe(10);
    expect(kordian?.epoch).toBe('Romantyzm');

    const lalka = findCanonicalLektura('lalka');
    expect(lalka).toBeDefined();
    expect(lalka?.numericTopicId).toBe(11);
    expect(lalka?.epoch).toBe('Pozytywizm');

    const wesele = findCanonicalLektura('wesele');
    expect(wesele).toBeDefined();
    expect(wesele?.numericTopicId).toBe(13);
    expect(wesele?.epoch).toBe('Młoda Polska');

    const przedwiosnie = findCanonicalLektura('przedwiosnie');
    expect(przedwiosnie).toBeDefined();
    expect(przedwiosnie?.numericTopicId).toBe(14);
    expect(przedwiosnie?.epoch).toBe('Dwudziestolecie międzywojenne');

    const innySwiat = findCanonicalLektura('inny-swiat');
    expect(innySwiat).toBeDefined();
    expect(innySwiat?.numericTopicId).toBe(15);
    expect(innySwiat?.epoch).toBe('Literatura wojny i okupacji');
  });

  it('should include authentic CKE task-pol-4-1-4 (SYNTHESIS_CONDENSER) in Dział 4', () => {
    const lesson4_1 = getPolishFallbackLesson('pol-lesson-4-1');
    expect(lesson4_1).toBeDefined();
    expect(lesson4_1?.tasks.length).toBeGreaterThanOrEqual(4);

    const synthesisTask = lesson4_1?.tasks.find(t => t.type === 'SYNTHESIS_CONDENSER');
    expect(synthesisTask).toBeDefined();
    expect(synthesisTask?.id).toBe('task-pol-4-1-4');
    expect(synthesisTask?.synthesisData).toBeDefined();
    expect(synthesisTask?.synthesisData?.sourceTexts).toHaveLength(2);
    expect(synthesisTask?.synthesisData?.minWords).toBe(60);
    expect(synthesisTask?.synthesisData?.maxWords).toBe(90);

    const subjectiveElement = synthesisTask?.synthesisData?.availableElements.find((e: any) => e.isSubjectiveTrap);
    expect(subjectiveElement).toBeDefined();
  });

  it('should provide complete philosophical passports for epochs', () => {
    expect(EPOCH_PASSPORTS['dzial-5']).toBeDefined();
    expect(EPOCH_PASSPORTS['dzial-5'].epochName).toBe('Antyk i Biblia');
    expect(EPOCH_PASSPORTS['dzial-5'].ckePewniaki.rule).toContain('Antygona reprezentuje konflikt');

    expect(EPOCH_PASSPORTS['dzial-10']).toBeDefined();
    expect(EPOCH_PASSPORTS['dzial-10'].epochName).toContain('Romantyzm');
    expect(EPOCH_PASSPORTS['dzial-10'].canonicalWorks).toContain('Juliusz Słowacki: Kordian');

    expect(EPOCH_PASSPORTS['dzial-11']).toBeDefined();
    expect(EPOCH_PASSPORTS['dzial-11'].epochName).toBe('Pozytywizm');
    expect(EPOCH_PASSPORTS['dzial-11'].canonicalWorks).toContain('Bolesław Prus: Lalka');
  });

  it('curriculumRepository should seamlessly load topics and pillars for jezyk-polski with 0 reads', async () => {
    const pillars = await curriculumRepository.getSubjectPillars('jezyk-polski');
    expect(pillars).toHaveLength(3);

    const topics = await curriculumRepository.getTopics('jezyk-polski');
    expect(topics).toHaveLength(20);

    const dzial1 = await curriculumRepository.getTopic('pol-dzial-1', 'jezyk-polski');
    expect(dzial1).toBeDefined();
    expect(dzial1?.title).toContain('Funkcje języka');

    const lesson1_1 = await curriculumRepository.getLesson('pol-dzial-1', 'pol-lesson-1-1', 'jezyk-polski');
    expect(lesson1_1).toBeDefined();
    expect(lesson1_1?.title).toContain('Funkcja informatywna');
    expect(lesson1_1?.tasks.length).toBeGreaterThan(0);
  });
});
