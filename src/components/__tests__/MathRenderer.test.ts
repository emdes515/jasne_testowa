import { describe, it, expect } from 'vitest';
import { cleanLatex, formatMathAnswer, autoWrapLatex, convertSlashFractions, parseMixedMathTokens } from '../MathRenderer';

describe('MathRenderer cleanLatex', () => {
  it('handles empty or falsy inputs', () => {
    expect(cleanLatex('')).toBe('');
    expect(cleanLatex(null as any)).toBe('');
    expect(cleanLatex(undefined as any)).toBe('');
  });

  it('strips outer dollar and bracket delimiters', () => {
    expect(cleanLatex('$x^2 + 1$')).toBe('x^2 + 1');
    expect(cleanLatex('$$f(x) = 2x$$')).toBe('f(x) = 2x');
    expect(cleanLatex('\\[a^2 + b^2 = c^2\\]')).toBe('a^2 + b^2 = c^2');
    expect(cleanLatex('\\(x \\in \\mathbb{R}\\)')).toBe('x \\in \\mathbb{R}');
  });

  it('formats Polish decimal commas with braces for KaTeX', () => {
    expect(cleanLatex('x = 0,5')).toBe('x = 0{,}5');
    expect(cleanLatex('3,1415')).toBe('3{,}1415');
  });

  it('escapes unescaped percent signs to prevent LaTeX comment truncations', () => {
    expect(cleanLatex('25%')).toBe('25\\%');
    expect(cleanLatex('100\\%')).toBe('100\\%');
  });

  it('replaces multiplication star with cdot', () => {
    expect(cleanLatex('2 * 3')).toBe('2 \\cdot 3');
  });

  it('converts common math comparison and logic operators', () => {
    expect(cleanLatex('x <= 5')).toBe('x \\le 5');
    expect(cleanLatex('x >= 10')).toBe('x \\ge 10');
    expect(cleanLatex('x != 0')).toBe('x \\neq 0');
    expect(cleanLatex('p => q')).toBe('p \\implies q');
    expect(cleanLatex('p <=> q')).toBe('p \\iff q');
    expect(cleanLatex('x +- 2')).toBe('x \\pm 2');
  });

  it('strips leading and trailing backslash spaces without harming latex macros', () => {
    expect(cleanLatex('\\ x + 1 \\ ')).toBe('x + 1');
    expect(cleanLatex('\\sqrt{16}')).toBe('\\sqrt{16}');
    expect(cleanLatex('\\pi r^2')).toBe('\\pi r^2');
  });

  it('converts slash-notated fractions and parenthesized fraction clauses into proper LaTeX frac', () => {
    expect(cleanLatex('8/15 \\cdot 5/4 = (8 \\cdot 5)/(15 \\cdot 4) = 40/60 = 2/3.'))
      .toBe('\\frac{8}{15} \\cdot \\frac{5}{4} = \\frac{8 \\cdot 5}{15 \\cdot 4} = \\frac{40}{60} = \\frac{2}{3}.');
    expect(cleanLatex('8/15 · 5/4 = (8 · 5)/(15 · 4) = 40/60 = 2/3.'))
      .toBe('\\frac{8}{15} \\cdot \\frac{5}{4} = \\frac{8 \\cdot 5}{15 \\cdot 4} = \\frac{40}{60} = \\frac{2}{3}.');
    expect(cleanLatex('8/15 * 5/4 = (8*5)/(15*4) = 40/60 = 2/3.'))
      .toBe('\\frac{8}{15} \\cdot \\frac{5}{4} = \\frac{8 \\cdot 5}{15 \\cdot 4} = \\frac{40}{60} = \\frac{2}{3}.');
    expect(cleanLatex('x = 1/2, y = -3/4')).toBe('x = \\frac{1}{2}, y = -\\frac{3}{4}');
    expect(cleanLatex('2 1/3')).toBe('2\\frac{1}{3}');
    expect(cleanLatex('\\sqrt{2}/2')).toBe('\\frac{\\sqrt{2}}{2}');
    expect(cleanLatex('(x+1)/(x-1) = 2')).toBe('\\frac{x+1}{x-1} = 2');
    expect(cleanLatex('60\\text{ km/h}')).toBe('60\\text{ km/h}');
  });
});

describe('formatMathAnswer', () => {
  it('handles empty or falsy inputs', () => {
    expect(formatMathAnswer('')).toBe('');
    expect(formatMathAnswer(null)).toBe('');
    expect(formatMathAnswer(undefined)).toBe('');
  });

  it('formats simple numeric fractions into LaTeX fraction wrapped in dollars', () => {
    expect(formatMathAnswer('1/8')).toBe('$\\frac{1}{8}$');
    expect(formatMathAnswer('-1/8')).toBe('$-\\frac{1}{8}$');
    expect(formatMathAnswer('3/4')).toBe('$\\frac{3}{4}$');
    expect(formatMathAnswer('-3/4')).toBe('$-\\frac{3}{4}$');
    expect(formatMathAnswer('5/2')).toBe('$\\frac{5}{2}$');
  });

  it('formats mixed numbers into LaTeX fractions', () => {
    expect(formatMathAnswer('2 1/3')).toBe('$2\\frac{1}{3}$');
    expect(formatMathAnswer('-1 2/5')).toBe('$-1\\frac{2}{5}$');
  });

  it('formats algebraic fractions', () => {
    expect(formatMathAnswer('(x+1)/(x-1)')).toBe('$\\frac{x+1}{x-1}$');
    expect(formatMathAnswer('x/2')).toBe('$\\frac{x}{2}$');
  });

  it('formats decimals with Polish comma notation', () => {
    expect(formatMathAnswer('0.125')).toBe('$0{,}125$');
    expect(formatMathAnswer('0,125')).toBe('$0{,}125$');
    expect(formatMathAnswer('-2.5')).toBe('$-2{,}5$');
  });

  it('formats integers into math mode for uniform typography', () => {
    expect(formatMathAnswer('42')).toBe('$42$');
    expect(formatMathAnswer('-5')).toBe('$-5$');
  });

  it('preserves existing LaTeX commands and delimiters', () => {
    expect(formatMathAnswer('\\frac{1}{8}')).toBe('$\\frac{1}{8}$');
    expect(formatMathAnswer('$\\frac{1}{8}$')).toBe('$\\frac{1}{8}$');
    expect(formatMathAnswer('$$\\sqrt{2}$$')).toBe('$$\\sqrt{2}$$');
  });

  it('leaves single-choice and true-false text options intact', () => {
    expect(formatMathAnswer('A')).toBe('A');
    expect(formatMathAnswer('B')).toBe('B');
    expect(formatMathAnswer('P (Prawda)')).toBe('P (Prawda)');
    expect(formatMathAnswer('F (Fałsz)')).toBe('F (Fałsz)');
  });
});

describe('autoWrapLatex', () => {
  it('handles empty or falsy strings', () => {
    expect(autoWrapLatex('')).toBe('');
    expect(autoWrapLatex(null as any)).toBe('');
    expect(autoWrapLatex(undefined as any)).toBe('');
  });

  it('wraps pure math expressions without delimiters in dollars', () => {
    expect(autoWrapLatex('(\\sqrt{7}-1)^2 + 2\\sqrt{7} = 7 - 2\\sqrt{7} + 1 + 2\\sqrt{7} = 8 \\in \\mathbb{Z}.'))
      .toBe('$(\\sqrt{7}-1)^2 + 2\\sqrt{7} = 7 - 2\\sqrt{7} + 1 + 2\\sqrt{7} = 8 \\in \\mathbb{Z}$.');
    expect(autoWrapLatex('8 \\in \\mathbb{Z}')).toBe('$8 \\in \\mathbb{Z}$');
    expect(autoWrapLatex('\\frac{1}{8}')).toBe('$\\frac{1}{8}$');
    expect(cleanLatex('A \\cup B = \\{x \\in \\mathbb{R}: x \\in A \\text{ lub } x \\in B\\}'))
      .toBe('A \\cup B = \\{x \\in \\mathbb{R}: x \\in A \\text{ lub } x \\in B\\}');
  });

  it('wraps math expressions in CKE scoring criteria lines', () => {
    expect(autoWrapLatex('1 pkt za zastosowanie wzoru skróconego mnożenia: 7 - 2\\sqrt{7} + 1.'))
      .toBe('1 pkt za zastosowanie wzoru skróconego mnożenia: $7 - 2\\sqrt{7} + 1$.');
    expect(autoWrapLatex('1 pkt za redukcję wyrazów z pierwiastkiem i wynik a = 8 \\in \\mathbb{Z}.'))
      .toBe('1 pkt za redukcję wyrazów z pierwiastkiem i wynik $a = 8 \\in \\mathbb{Z}$.');
  });

  it('preserves existing dollar delimited formulas', () => {
    expect(autoWrapLatex('Wykaż, że liczba $a = (\\sqrt{7} - 1)^2 + 2\\sqrt{7}$ jest liczbą całkowitą.'))
      .toBe('Wykaż, że liczba $a = (\\sqrt{7} - 1)^2 + 2\\sqrt{7}$ jest liczbą całkowitą.');
  });

  it('wraps and converts math equations with fractions', () => {
    expect(autoWrapLatex('8/15 * 5/4 = (8*5)/(15*4) = 40/60 = 2/3.'))
      .toBe('$\\frac{8}{15} \\cdot \\frac{5}{4} = \\frac{8 \\cdot 5}{15 \\cdot 4} = \\frac{40}{60} = \\frac{2}{3}$.');
    expect(autoWrapLatex('8/15 · 5/4 = (8 · 5)/(15 · 4) = 40/60 = 2/3.'))
      .toBe('$\\frac{8}{15} \\cdot \\frac{5}{4} = \\frac{8 \\cdot 5}{15 \\cdot 4} = \\frac{40}{60} = \\frac{2}{3}$.');
    expect(autoWrapLatex('Krok po kroku: 8/15 · 5/4 = (8 · 5)/(15 · 4) = 40/60 = 2/3.'))
      .toBe('Krok po kroku: $\\frac{8}{15} \\cdot \\frac{5}{4} = \\frac{8 \\cdot 5}{15 \\cdot 4} = \\frac{40}{60} = \\frac{2}{3}$.');
  });

  it('converts algebraic variable fractions, inequalities with != and pi in prose', () => {
    const input = 'Liczba wymierna to każda liczba, którą można przedstawić w postaci ułamka zwykłego p/q, gdzie licznik i mianownik są całkowite (q != 0). Rozwinięcia dziesiętne liczb wymiernych są skończone lub nieskończone okresowe. Liczby niewymierne mają rozwinięcia nieskończone nieokresowe (np. pierwiastki niedające się wyliczyć, liczba pi).';
    const output = autoWrapLatex(input);
    expect(output).toContain('$\\frac{p}{q}$');
    expect(output).toContain('($q \\neq 0$)');
    expect(output).toContain('liczba $\\pi$');
    expect(output).not.toContain('!=');

    expect(autoWrapLatex('x != 5')).toBe('$x \\neq 5$');
    expect(autoWrapLatex('a != 0')).toBe('$a \\neq 0$');
    expect(autoWrapLatex('wartość pi')).toBe('wartość $\\pi$');
  });

  it('wraps mathematical interval definitions in prose and heals corrupted angle tokens', () => {
    expect(cleanLatex('B = (-1, 6angle.')).toBe('B = (-1, 6\\rangle.');
    expect(cleanLatex('x \\in \\x0dangle -5, 2)')).toBe('x \\in \\rangle -5, 2)');
    expect(autoWrapLatex('Wyznacz zbiór B = (-1, 6\\rangle. Zbadaj jego elementy.'))
      .toBe('Wyznacz zbiór $B = (-1, 6\\rangle$. Zbadaj jego elementy.');
    expect(autoWrapLatex('Wyznacz zbiór A = \\langle -5, 2) w zadaniu.'))
      .toBe('Wyznacz zbiór $A = \\langle -5, 2)$ w zadaniu.');
  });
});

describe('parseMixedMathTokens punctuation binding', () => {
  it('binds trailing periods directly to inline math to eliminate orphan dots', () => {
    const input = 'Przychód wynosi $R(x) = 15000$. Wtedy zysk rośnie.';
    const tokens = parseMixedMathTokens(input);

    expect(tokens).toHaveLength(3);
    expect(tokens[0]).toEqual({ type: 'text', raw: 'Przychód wynosi ' });
    expect(tokens[1]).toEqual({
      type: 'inline-math',
      raw: '$R(x) = 15000$',
      math: 'R(x) = 15000',
      trailingPunct: '.'
    });
    expect(tokens[2]).toEqual({ type: 'text', raw: ' Wtedy zysk rośnie.' });
  });

  it('binds opening brackets and trailing punctuation together for expressions like ($x \\ge 0$).', () => {
    const input = 'Niech $x$ oznacza liczbę podwyżek ($x \\ge 0$). Wtedy nowa cena to $C(x) = 50 + 2x$, a zysk rośnie.';
    const tokens = parseMixedMathTokens(input);

    const inequalityToken = tokens.find(t => t.type === 'inline-math' && t.math?.includes('\\ge'));
    expect(inequalityToken).toBeDefined();
    expect(inequalityToken?.leadingPunct).toBe('(');
    expect(inequalityToken?.trailingPunct).toBe(').');

    // Preceding text should not have dangling "("
    const prevIndex = tokens.indexOf(inequalityToken!);
    expect(tokens[prevIndex - 1].raw).not.toMatch(/\($/);

    // Following text should not have dangling "). "
    expect(tokens[prevIndex + 1].raw.trimStart()).toMatch(/^Wtedy nowa cena/);
  });

  it('binds commas so they do not wrap alone to the next line', () => {
    const input = 'Dla $x \\in [0, 30)$, funkcja rośnie.';
    const tokens = parseMixedMathTokens(input);

    const mathToken = tokens.find(t => t.type === 'inline-math');
    expect(mathToken).toBeDefined();
    expect(mathToken?.trailingPunct).toBe(',');
    expect(tokens[tokens.indexOf(mathToken!) + 1].raw.trimStart()).toMatch(/^funkcja rośnie\./);
  });

  it('correctly distinguishes display-math and does not swallow text', () => {
    const input = 'Wzór ogólny:\n$$f(x) = ax^2 + bx + c$$\ngdzie $a \\neq 0$.';
    const tokens = parseMixedMathTokens(input);

    expect(tokens).toHaveLength(4);
    expect(tokens[0].type).toBe('text');
    expect(tokens[1].type).toBe('display-math');
    expect(tokens[2].type).toBe('text');
    expect(tokens[3].type).toBe('inline-math');
    expect(tokens[3].trailingPunct).toBe('.');
  });
});

describe('Lesson titles and Greek letter math normalization', () => {
  it('correctly auto-wraps lesson titles containing multiple formulas separated by conjunctions', () => {
    const title = 'Współrzędne wierzchołka paraboli: p = -b/(2a) i q = -delta/(4a)';
    const wrapped = autoWrapLatex(title);
    expect(wrapped).toBe('Współrzędne wierzchołka paraboli: $p = -\\frac{b}{2a}$ i $q = -\\frac{\\Delta}{4a}$');
  });

  it('correctly auto-wraps quadratic canonical form titles', () => {
    const title = 'Postać kanoniczna funkcji kwadratowej: f(x) = a(x - p)^2 + q';
    const wrapped = autoWrapLatex(title);
    expect(wrapped).toBe('Postać kanoniczna funkcji kwadratowej: $f(x) = a(x - p)^2 + q$');
  });

  it('normalizes Greek delta in cleanLatex', () => {
    expect(cleanLatex('q = -delta/(4a)')).toBe('q = -\\frac{\\Delta}{4a}');
    expect(cleanLatex('\\Delta > 0')).toBe('\\Delta > 0');
  });

  it('preserves negative sign on fraction numerators in convertSlashFractions', () => {
    expect(cleanLatex('p = -b/(2a)')).toBe('p = -\\frac{b}{2a}');
    expect(cleanLatex('x = -1/2')).toBe('x = -\\frac{1}{2}');
  });

  it('auto-wraps variable equations in continuous prose', () => {
    const text = 'Szukana wielkość to wierzchołek paraboli p = -b/(2a). Wtedy y = 50 - x.';
    const wrapped = autoWrapLatex(text);
    expect(wrapped).toContain('$p = -\\frac{b}{2a}$');
    expect(wrapped).toContain('$y = 50 - x$');
  });

  it('correctly normalizes LaTeX parentheses and bracket delimiters into math tokens', () => {
    const text = 'Dla stopnia parzystego wynik jest ZAWSZE nieujemny: \\(\\sqrt{(-3)^2} = |-3| = 3\\), a nie \\(-3\\)!';
    const wrapped = autoWrapLatex(text);
    expect(wrapped).not.toContain('\\(');
    expect(wrapped).not.toContain('\\)');
    expect(wrapped).toContain('$\\sqrt{(-3)^2} = |-3| = 3$');
    expect(wrapped).toContain('$-3$');

    const tokens = parseMixedMathTokens(wrapped);
    const mathTokens = tokens.filter(t => t.type === 'inline-math');
    expect(mathTokens.length).toBe(2);
    expect(mathTokens[0].math).toBe('\\sqrt{(-3)^2} = |-3| = 3');
    expect(mathTokens[1].math).toBe('-3');
  });
});

