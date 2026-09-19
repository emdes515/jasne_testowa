import { PolishArgumentBlock, UserArgumentVault } from '../types';

const STORAGE_KEY = 'jasne_argument_vault_v1';

// Total number of canonical matura themes in CKE Formula 2023/2026
export const TOTAL_CKE_THEMES_COUNT = 24;

export const argumentVaultService = {
  getVault(): UserArgumentVault {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { unlockedBlocks: [], customBlocks: [] };
      }
      const parsed = JSON.parse(raw);
      return {
        unlockedBlocks: Array.isArray(parsed.unlockedBlocks) ? parsed.unlockedBlocks : [],
        customBlocks: Array.isArray(parsed.customBlocks) ? parsed.customBlocks : []
      };
    } catch (e) {
      console.warn('[ArgumentVault] Error reading from localStorage', e);
      return { unlockedBlocks: [], customBlocks: [] };
    }
  },

  hasBlock(id: string): boolean {
    const vault = this.getVault();
    return vault.unlockedBlocks.some(b => b.id === id);
  },

  addBlock(block: PolishArgumentBlock): { success: boolean; isNew: boolean } {
    try {
      const vault = this.getVault();
      const existingIndex = vault.unlockedBlocks.findIndex(b => b.id === block.id);
      
      if (existingIndex >= 0) {
        return { success: true, isNew: false };
      }

      const blockWithTime: PolishArgumentBlock = {
        ...block,
        unlockedAt: block.unlockedAt || Date.now()
      };

      vault.unlockedBlocks.unshift(blockWithTime);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vault));

      // Trigger custom window event so UI badges/modals react immediately
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('jasne:vault_updated', { detail: { block: blockWithTime } }));
      }

      return { success: true, isNew: true };
    } catch (e) {
      console.error('[ArgumentVault] Error saving block', e);
      return { success: false, isNew: false };
    }
  },

  getUnlockedBlocks(): PolishArgumentBlock[] {
    return this.getVault().unlockedBlocks;
  },

  getCoverage() {
    const blocks = this.getUnlockedBlocks();
    const uniqueThemes = new Set(blocks.map(b => b.theme.toLowerCase().trim()));
    const coveragePercent = Math.min(100, Math.round((uniqueThemes.size / TOTAL_CKE_THEMES_COUNT) * 100));
    
    return {
      unlockedCount: blocks.length,
      uniqueThemesCount: uniqueThemes.size,
      totalKnownThemes: TOTAL_CKE_THEMES_COUNT,
      coveragePercent
    };
  },

  exportToClipboardText(): string {
    const blocks = this.getUnlockedBlocks();
    if (blocks.length === 0) {
      return 'Twój Skarbiec Argumentów jest jeszcze pusty. Rozwiąż mikro-lekcje z lektur, aby zdobyć klocki!';
    }

    let text = `🎒 SKARBIEC ARGUMENTÓW JASNE (Matura CKE 2026)\n`;
    text += `Liczba odblokowanych klocków: ${blocks.length}\n`;
    text += `Data wygenerowania: ${new Date().toLocaleDateString('pl-PL')}\n\n`;
    text += `====================================================\n\n`;

    blocks.forEach((b, index) => {
      text += `[${index + 1}] MOTYW: ${b.theme.toUpperCase()}\n`;
      text += `📖 Lektura: ${b.bookTitle} (Bohater: ${b.character})\n`;
      text += `🎯 [T] Teza cząstkowa: ${b.claim}\n`;
      text += `🔍 [E] Sytuacja / Argument: ${b.evidence}\n`;
      text += `📚 [C] Kontekst (${b.contextType}): ${b.contextDescription}\n`;
      text += `💡 [L] Puenta / Wniosek: ${b.linkToThesis}\n`;
      text += `🛡️ Status CKE: ${b.ckeSafetyRating === '100%_SAFE' ? '100% Bezpieczny (Brak ryzyka kardynała)' : 'Wymaga precyzji'}\n`;
      text += `\n----------------------------------------------------\n\n`;
    });

    return text;
  }
};
