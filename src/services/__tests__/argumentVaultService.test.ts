import { describe, it, expect, vi, beforeEach } from 'vitest';
import { argumentVaultService } from '../argumentVaultService';
import { PolishArgumentBlock } from '../../types';

const LALKA_ARGUMENT_BLOCK: PolishArgumentBlock = {
  id: 'arg-block-lalka-idealizm',
  bookId: 'lalka',
  bookTitle: 'Lalka',
  character: 'Stanisław Wokulski',
  theme: 'Idealizm a twarda rzeczywistość',
  claim: 'Konflikt między romantycznymi ideałami a pozytywistycznym pragmatyzmem prowadzi wybitną jednostkę do osamotnienia i emocjonalnej klęski.',
  evidence: 'Stanisław Wokulski gromadzi olbrzymi kapitał w handlu, by zaimponować arystokracji, lecz w relacji z Izabelą Łęcką kieruje się ślepym uwielbieniem kobiety-anioła. Przełomem jest zdemaskowanie flirtu Izabeli ze Starskim w pociągu, co niszczy sens jego egzystencji.',
  contextType: 'FILOZOFICZNY',
  contextDescription: 'Pozytywistyczna koncepcja pracy organicznej i scjentyzmu zderzona z romantycznym mitem miłości tragicznej',
  linkToThesis: 'Los Wokulskiego dowodzi, że jednostka zawieszona między dwiema epokami staje się obca dla obydwu światów.',
  ckeSafetyRating: '100%_SAFE'
};

const DZIADY_ARGUMENT_BLOCK: PolishArgumentBlock = {
  id: 'arg-block-dziady-prometeizm',
  bookId: 'dziady-cz-3',
  bookTitle: 'Dziady cz. III',
  character: 'Konrad',
  theme: 'Bunt prometejski i odpowiedzialność za ojczyznę',
  claim: 'Bunt w imię cierpiącej zbiorowości może wynosić człowieka na wyżyny heroizmu, lecz bez pokory przeradza się w niszczącą pychę.',
  evidence: 'W Wielkiej Improwizacji Konrad w celi bazyliańskiej utożsamia się z całym cierpiącym narodem. Żąda od Boga władzy absolutnej nad duszami ludzkimi.',
  contextType: 'LITERACKI',
  contextDescription: 'Mit prometejski oraz koncepcja poety-wieszcza charakterystyczna dla romantyzmu',
  linkToThesis: 'Upadek Konrada i ocalenie jego duszy przez pokornego księdza Piotra pokazuje mickiewiczowską hierarchię wartości.',
  ckeSafetyRating: '100%_SAFE'
};

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


