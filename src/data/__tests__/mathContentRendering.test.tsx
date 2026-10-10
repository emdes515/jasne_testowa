// @vitest-environment happy-dom
/**
 * Pełna weryfikacja renderowania treści matematycznych – tym samym kodem, którego używa aplikacja:
 * każdy tekst z 75 lekcji, 1500 zadań autorskich i 211 zadań CKE przechodzi przez <MathRenderer>,
 * a każdy rysunek przez <MathDiagram> / <NumberLineDiagram>. Test nie przepuszcza wzoru, którego
 * KaTeX nie umie złożyć, ani surowego LaTeX-u widocznego dla ucznia.
 */
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import rawTasks from '../math/generated/all_1500_tasks.json';
import { MATH_TOPIC_BLUEPRINTS } from '../mathCurriculumData';
import { toFormulaBoxContent } from '../../lib/formulaBox';
import { CKE_FORMULAS_DATA } from '../ckeFormulasData';
import { AUTHENTIC_CKE_TASKS } from '../math/allMathTasks';
import { MathRenderer } from '../../components/MathRenderer';
import { MathDiagram } from '../../components/MathDiagram';
import { NumberLineDiagram } from '../../components/NumberLineDiagram';

afterEach(() => cleanup());

type Entry = { where: string; text: string };

function collectStrings(value: any, where: string, out: Entry[], skipKeys: Set<string>) {
  if (typeof value === 'string') {
    if (value.trim()) out.push({ where, text: value });
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => collectStrings(v, `${where}[${i}]`, out, skipKeys));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (!skipKeys.has(k)) collectStrings(v, `${where}.${k}`, out, skipKeys);
    }
  }
}

// pola techniczne i rysunki (te sprawdzamy osobno jako grafiki)
const SKIP = new Set([
  'id', 'lessonId', 'lessonKey', 'topicId', 'archetypeCode', 'type', 'correct', 'cke_page', 'badge', 'estimated_time_formatted',
  'diagram', 'plot', 'numberLine', 'taskNumber', 'sourceYear', 'partScoring', 'icon', 'color', 'importance', 'adaptationNote'
]);

/**
 * Renderuje tekst komponentem aplikacji (do statycznego HTML – bez DOM, żeby kilkanaście tysięcy renderów
 * nie zjadło pamięci) i zwraca listę problemów widocznych dla ucznia.
 */
function renderProblems(text: string, formulaOnly = false): string[] {
  // Wzory z pigułki renderujemy dokładnie tak, jak kaseton wzoru w SessionRunner (toFormulaBoxContent + displayMode).
  const html = renderToStaticMarkup(formulaOnly ? <MathRenderer content={toFormulaBoxContent(text)} displayMode={true} /> : <MathRenderer content={text} />);
  const problems: string[] = [];
  if (html.includes('katex-error')) problems.push('błąd KaTeX');
  if (/\$[^$]+\$|\\[a-zA-Z]+/.test(text) && !html.includes('class="katex"')) problems.push('wzór nie został złożony');
  // Źródło LaTeX-u KaTeX trzyma wyłącznie w <annotation>; wszystko poza nim to tekst widoczny dla ucznia.
  const visible = html
    .replace(/<annotation[^>]*>[\s\S]*?<\/annotation>/g, '')
    .replace(/<[^>]+>/g, '');
  if (/\\[a-zA-Z]{2,}|\$/.test(visible)) problems.push(`surowy LaTeX w tekście: „${visible.slice(0, 80)}”`);
  return problems;
}

function checkAll(entries: Entry[], formulaOnly = false): string[] {
  const seen = new Set<string>();
  const failures: string[] = [];
  for (const e of entries) {
    if (seen.has(e.text)) continue;
    seen.add(e.text);
    const problems = renderProblems(e.text, formulaOnly);
    if (problems.length) failures.push(`${e.where}: ${problems.join('; ')} | ${e.text.slice(0, 90)}`);
  }
  return failures;
}

describe('Renderowanie całej treści matematycznej (KaTeX + rysunki)', () => {
  it('75 pigułek teorii składa się bez błędów', () => {
    const texts: Entry[] = [];
    const formulas: Entry[] = [];
    for (const bp of MATH_TOPIC_BLUEPRINTS) {
      for (const lesson of bp.lessons) {
        const pill: any = lesson.theory_pill;
        const { core_formulas, ...rest } = pill;
        collectStrings(rest, lesson.id, texts, SKIP);
        collectStrings([lesson.title, lesson.short_title], `${lesson.id}.title`, texts, SKIP);
        (core_formulas || []).forEach((f: any, i: number) => {
          texts.push({ where: `${lesson.id}.core_formulas[${i}].name`, text: f.name });
          formulas.push({ where: `${lesson.id}.core_formulas[${i}].formula`, text: f.formula });
        });
      }
    }
    expect(texts.length).toBeGreaterThan(2000);
    expect(checkAll(texts)).toEqual([]);
    expect(checkAll(formulas, true)).toEqual([]);
  }, 300_000);

  it('karta wzorów CKE (okno „Wzory” i szuflada w sesji) składa się bez błędów', () => {
    const formulas: Entry[] = [];
    const texts: Entry[] = [];
    CKE_FORMULAS_DATA.forEach((item: any) => {
      formulas.push({ where: `${item.id}.formula`, text: item.formula });
      (item.subFormulas || []).forEach((sub: any, i: number) => formulas.push({ where: `${item.id}.subFormulas[${i}]`, text: sub.formula }));
      collectStrings({ title: item.title, explanation: item.explanation, goldenRule: item.goldenRule, ckeTrap: item.ckeTrap, labels: (item.subFormulas || []).map((x: any) => x.label) }, String(item.id), texts, SKIP);
    });
    expect(formulas.length).toBeGreaterThan(26);
    expect(checkAll(formulas, true)).toEqual([]);
    expect(checkAll(texts)).toEqual([]);
  }, 120_000);

  it('1500 zadań autorskich składa się bez błędów', () => {
    const texts: Entry[] = [];
    (rawTasks as any[]).forEach(t => collectStrings({ content: t.content, options: t.options, statements: t.statements, explanation: t.explanation, tip: t.matura_tip, title: t.title }, t.id, texts, SKIP));
    expect(texts.length).toBeGreaterThan(9000);
    expect(checkAll(texts)).toEqual([]);
  }, 600_000);

  it('211 zadań z arkuszy CKE składa się bez błędów', () => {
    const texts: Entry[] = [];
    AUTHENTIC_CKE_TASKS.forEach((t: any) => collectStrings({ content: t.content, options: t.options, statements: t.statements, parts: t.parts, explanation: t.explanation, tip: t.matura_tip, answer: t.type === 'SINGLE_CHOICE' ? '' : t.correct_answer }, t.id, texts, new Set([...SKIP, 'is_correct'])));
    expect(texts.length).toBeGreaterThan(1200);
    expect(checkAll(texts)).toEqual([]);
  }, 300_000);

  it('wszystkie rysunki (wykresy, figury, diagramy słupkowe, osie liczbowe) renderują się jako poprawne SVG', () => {
    const visuals: { where: string; data: any; kind: 'diagram' | 'numberLine' }[] = [];
    const add = (where: string, t: any) => {
      if (t.diagram || t.plot) visuals.push({ where, data: t.diagram || t.plot, kind: 'diagram' });
      if (t.numberLine) visuals.push({ where, data: t.numberLine, kind: 'numberLine' });
      (Array.isArray(t.options) ? t.options : []).forEach((o: any, i: number) => {
        if (o && typeof o === 'object') {
          if (o.diagram) visuals.push({ where: `${where}.options[${i}]`, data: o.diagram, kind: 'diagram' });
          if (o.numberLine) visuals.push({ where: `${where}.options[${i}]`, data: o.numberLine, kind: 'numberLine' });
        }
      });
    };
    (rawTasks as any[]).forEach(t => add(t.id, t));
    AUTHENTIC_CKE_TASKS.forEach((t: any) => add(t.id, t));
    expect(visuals.length).toBeGreaterThan(80);

    const failures: string[] = [];
    for (const v of visuals) {
      const { container } = render(v.kind === 'diagram' ? <MathDiagram diagram={v.data} /> : <NumberLineDiagram data={v.data} />);
      const svgs = container.querySelectorAll('svg');
      const html = container.innerHTML;
      if (svgs.length === 0) failures.push(`${v.where}: brak SVG`);
      else if (/NaN|undefined|Infinity/.test(html)) failures.push(`${v.where}: błędne współrzędne w SVG`);
      else if (!container.querySelector('svg line, svg path, svg rect, svg circle, svg polyline, svg polygon')) failures.push(`${v.where}: pusty rysunek`);
      cleanup();
    }
    expect(failures).toEqual([]);
  }, 300_000);
});
