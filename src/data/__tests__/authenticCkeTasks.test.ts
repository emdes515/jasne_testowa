import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { AUTHENTIC_CKE_TASKS } from '../math/allMathTasks';
import { getBundledCkeExamTasks, getBundledCkeExamSheet } from '../math/ckeExamTasks';

const EXAMS = [
  'matura-maj-2024',
  'matura-czerwiec-2024',
  'matura-sierpien-2024',
  'matura-maj-2023',
  'matura-czerwiec-2023',
  'matura-sierpien-2023'
];
// Pozostałości po ekstrakcji z PDF: znaki matematyczne Unicode, elementy strony arkusza i klucza oceniania
const PDF_GARBAGE = /[\u{1D400}-\u{1D7FF}]|BRUDNOPIS|Brudnopis|Strona \d+ z \d+|Wersja A|0 pkt –|Zasady oceniania|MMAP-P0/u;
const seedPath = (...p: string[]) => path.resolve(process.cwd(), 'seed', 'curriculum', ...p);

describe('Autentyczne zadania CKE (matura podstawowa 2023–2024) – transkrypcje z scripts/math_pp/cke', () => {
  it('obejmują 6 kompletnych arkuszy po 46 punktów', () => {
    expect(AUTHENTIC_CKE_TASKS).toHaveLength(211);
    expect(new Set(AUTHENTIC_CKE_TASKS.map(t => t.id)).size).toBe(211);
    for (const examId of EXAMS) {
      const sheet = AUTHENTIC_CKE_TASKS.filter(t => t.id.startsWith(`${examId}-zad-`));
      expect(sheet.length, examId).toBeGreaterThanOrEqual(34);
      expect(sheet.reduce((sum, t) => sum + t.points, 0), examId).toBe(46);
    }
  });

  it('mają czysty zapis w KaTeX, poprawny klucz i rozwiązanie krok po kroku', () => {
    for (const t of AUTHENTIC_CKE_TASKS) {
      const optionTexts = (t.options || []).map(o => o.text);
      const structuredTexts = [...(t.statements || []).map(s => s.text), ...(t.parts || []).flatMap(p => [p.prompt || '', ...p.options.map(o => o.text)])];
      const text = [t.content, t.explanation, t.matura_tip, t.correct_answer, ...optionTexts, ...structuredTexts].join('\n');
      expect(text, t.id).not.toMatch(PDF_GARBAGE);
      expect(text, t.id).not.toMatch(/undefined|NaN|\[object/);
      expect((text.match(/\$/g) || []).length % 2, t.id).toBe(0);
      expect(t.explanation, t.id).toMatch(/\*\*Krok 1:\*\*/);
      expect(t.topicId, t.id).toMatch(/^dzial-(?:[1-9]|1[0-5])$/);

      if (t.type === 'SINGLE_CHOICE') {
        expect(t.options!.length, t.id).toBeGreaterThanOrEqual(4);
        expect(new Set(optionTexts).size, t.id).toBe(optionTexts.length);
        expect(t.options!.filter(o => o.is_correct), t.id).toHaveLength(1);
        expect(t.options!.find(o => o.is_correct)!.id, t.id).toBe(t.correct_answer);
      } else if (t.type === 'TRUE_FALSE') {
        // format natywny CKE: stwierdzenia oceniane osobno, klucz typu "PF"
        expect(t.statements!.length, t.id).toBeGreaterThanOrEqual(2);
        expect(t.correct_answer, t.id).toBe(t.statements!.map(s => s.correct).join(''));
        expect(t.correct_answer, t.id).toMatch(/^[PF]+$/);
      } else if (t.type === 'TWO_PART') {
        // „A/B + uzasadnienie” albo tabela z dopasowaniem: po jednym wyborze w każdej części
        expect(t.parts!.length, t.id).toBeGreaterThanOrEqual(2);
        expect(String(t.correct_answer).length, t.id).toBe(t.parts!.length);
        t.parts!.forEach((part, i) => expect(part.options.map(o => o.id), t.id).toContain(String(t.correct_answer)[i]));
      } else if (t.type === 'MULTI_CHOICE') {
        // „wybierz dwie odpowiedzi”: klucz z dwóch liter, dokładnie tyle opcji oznaczonych jako poprawne
        expect(t.multiSelect, t.id).toBe(2);
        expect(t.correct_answer, t.id).toMatch(/^[A-F]{2}$/);
        expect(t.options!.filter(o => o.is_correct).map(o => o.id).join(''), t.id).toBe(t.correct_answer);
      } else {
        // zadania otwarte i z luką mają treść odpowiedzi, a nie przypadkową literę
        expect(t.options, t.id).toBeUndefined();
        expect(['A', 'B', 'C', 'D'], t.id).not.toContain(t.correct_answer);
        expect(String(t.correct_answer).length, t.id).toBeGreaterThan(0);
      }
    }
  });

  it('są udostępniane symulatorowi jako arkusze z poprawnymi metadanymi', () => {
    const all = getBundledCkeExamTasks();
    expect(all).toHaveLength(211);
    all.forEach(t => expect(t.isCke).toBe(true));
    // wszystkie formaty zamknięte są sprawdzane automatycznie; otwarte trafiają do oceny AI
    all.forEach(t => expect(t.isClosed, t.id).toBe(['SINGLE_CHOICE', 'TRUE_FALSE', 'TWO_PART', 'MULTI_CHOICE'].includes(String(t.type))));
    // nagłówek zadania pokazuje numer z arkusza CKE, a nie pozycję na liście
    expect((getBundledCkeExamSheet('matura-maj-2024')[24] as any).taskNumber).toBe('22');

    const may2024 = getBundledCkeExamSheet('matura-maj-2024');
    expect(may2024).toHaveLength(35);
    expect(may2024.reduce((sum, t) => sum + t.points, 0)).toBe(46);
    expect(may2024[0].source).toBe('Matura Maj 2024 • Zad. 1');
    // zadanie 1 – odpowiedzi są osiami liczbowymi
    expect((may2024[0].options as any[]).every(o => o.numberLine)).toBe(true);
    // zadanie 11 – wykres dwóch prostych równoległych
    expect((may2024.find(t => t.id.endsWith('zad-11')) as any).plot.lines).toHaveLength(2);
    expect(getBundledCkeExamSheet('nie-ma-takiego-arkusza')).toHaveLength(0);
  });

  it('pliki seed są zsynchronizowane z danymi aplikacji i nie zawierają zadań udających CKE', () => {
    const merged = JSON.parse(fs.readFileSync(seedPath('zadania_matura.json'), 'utf8'));
    expect(merged.map((t: any) => t.id)).toEqual(AUTHENTIC_CKE_TASKS.map(t => t.id));
    merged.forEach((t: any, i: number) => {
      expect(t.content, t.id).toBe(AUTHENTIC_CKE_TASKS[i].content);
      expect(t.correctAnswer, t.id).toBe(AUTHENTIC_CKE_TASKS[i].correct_answer);
    });

    for (const examId of EXAMS) {
      const sheet = JSON.parse(fs.readFileSync(seedPath('exams', `${examId}.json`), 'utf8'));
      expect(sheet.map((t: any) => t.id), examId).toEqual(AUTHENTIC_CKE_TASKS.filter(t => t.id.startsWith(`${examId}-zad-`)).map(t => t.id));
    }

    const ckePool = JSON.parse(fs.readFileSync(seedPath('cke_tasks_matematyka.json'), 'utf8'));
    expect(ckePool).toHaveLength(211);
    ckePool.forEach((t: any) => expect(String(t.id), t.id).toMatch(/^matura-(maj|czerwiec|sierpien)-202[34]-zad-/));
  });
});
