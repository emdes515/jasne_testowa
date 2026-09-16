import { describe, expect, it } from 'vitest';
import { cleanThinkingTokens, deepSanitizeLatex, extractStructuredJson } from '../ai/latexSanitizer';

describe('latexSanitizer', () => {
  describe('cleanThinkingTokens', () => {
    it('should strip <think> blocks and whitespace', () => {
      const input = '<think>I need to think step by step\nCalculate log3(27)</think>\n\nFinal answer is $3$.';
      expect(cleanThinkingTokens(input)).toBe('Final answer is $3$.');
    });

    it('should strip <thought> blocks', () => {
      const input = '<thought>Internal monologue</thought>Wynik to 5.';
      expect(cleanThinkingTokens(input)).toBe('Wynik to 5.');
    });

    it('should strip "Here\'s a thinking process:" header', () => {
      const input = "Here's a thinking process:\n\nKrok 1: Wzór skróconego mnożenia.";
      expect(cleanThinkingTokens(input)).toBe('Krok 1: Wzór skróconego mnożenia.');
    });
  });

  describe('deepSanitizeLatex', () => {
    it('should fix corrupted LaTeX macros in strings and nested objects', () => {
      const input = {
        title: '▲rac{1}{2}',
        nested: {
          formula: '\x08egin{matrix}',
          list: ['\x0dight)', '\x0dangle', 'B = (-1, 6angle.'],
        },
      };

      const result = deepSanitizeLatex(input);
      expect(result.title).toBe('\\frac{1}{2}');
      expect(result.nested.formula).toBe('\\begin{matrix}');
      expect(result.nested.list[0]).toBe('\\right)');
      expect(result.nested.list[1]).toBe('\\rangle');
      expect(result.nested.list[2]).toBe('B = (-1, 6\\rangle.');
    });
  });

  describe('extractStructuredJson', () => {
    it('should parse raw JSON string', () => {
      const input = '{"score": 2, "maxPoints": 2, "isPassed": true}';
      const result = extractStructuredJson(input);
      expect(result).toEqual({ score: 2, maxPoints: 2, isPassed: true });
    });

    it('should extract JSON from markdown code block', () => {
      const input = 'Here is the result:\n```json\n{"score": 1, "isPassed": false}\n```';
      const result = extractStructuredJson(input);
      expect(result).toEqual({ score: 1, isPassed: false });
    });

    it('should repair LaTeX unescaped backslashes in JSON strings', () => {
      const input = '{"latex": "\\text{Wynik}: \\sqrt{5}"}';
      const result = extractStructuredJson(input);
      expect(result).toBeDefined();
      expect(result.latex).toContain('\\sqrt{5}');
    });

    it('should preserve \\rangle and intervals without corrupting to carriage return', () => {
      const input = '{"mentorComment": "Zbiór B to (-1, 6\\\\rangle."}';
      const result = extractStructuredJson(input);
      expect(result).toBeDefined();
      expect(result.mentorComment).toBe('Zbiór B to (-1, 6\\rangle.');
    });

    it('should restore \\rangle even if AI emits single backslash \\rangle in JSON string', () => {
      // In raw JSON string with single slash: {"ans": "\rangle"}
      const input = '{"ans": "\\rangle"}';
      const result = extractStructuredJson(input);
      expect(result).toBeDefined();
      expect(result.ans).toBe('\\rangle');
    });

    it('should return null for non-JSON string', () => {
      expect(extractStructuredJson('To nie jest JSON')).toBeNull();
      expect(extractStructuredJson('')).toBeNull();
    });
  });
});
