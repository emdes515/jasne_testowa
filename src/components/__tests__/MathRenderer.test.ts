import { describe, it, expect } from 'vitest';
import { cleanLatex, formatMathAnswer, autoWrapLatex, convertSlashFractions } from '../MathRenderer';

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
});

