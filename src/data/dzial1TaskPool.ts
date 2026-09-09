import { TaskOption, LessonTheoryPill } from '../types';
import curriculumData from './curriculum_matematyka.json';

export type TaskDifficultyTier = 'A' | 'B' | 'C';

export interface PoolTask {
  id: string;
  lessonId: string;
  tier: TaskDifficultyTier;
  tierLabel: string;
  points: number;
  question: string;
  options?: TaskOption[];
  correct_answer?: string;
  correctAnswer?: string;
  input_placeholder?: string;
  statements?: { id: string; text: string; correct: string }[];
  part_1?: { prompt?: string; options: { id: string; text: string }[] };
  part_2?: { prompt?: string; options: { id: string; text: string }[] };
  explanation: string;
  hint_1: string;
  hint_2: string;
  hints?: { level_1: string; level_2: string };
  hint_cost?: { level_1: number; level_2: number } | number;
  ai_hint_enabled?: boolean;
  ai_hint_cost?: number;
  scoring_key?: string;
  cke_tag?: string;
  type?: string;
  source?: string;
  instruction?: string;
  officialKey?: string;
  cke_source?: string;
  ai_tutor_rubric?: {
    max_points: number;
    criterion_1_point: string;
    criterion_2_points: string;
  };
  modelSolutionSteps?: { step_num: number; description: string; latex?: string }[];
}

export interface LessonFormulaSheet {
  lessonId: string;
  title: string;
  formulas: { title: string; latex: string }[];
  goldenRule: string;
  ckeTrap: {
    error: string;
    correct: string;
    description: string;
  };
}

export const formulaSheetsByLesson: Record<string, LessonFormulaSheet> = {
  '1.1': {
    lessonId: '1.1',
    title: 'Potęgi o wykładnikach całkowitych i wymiernych',
    formulas: [
      { title: 'Iloczyn potęg o tej samej podstawie', latex: 'a^x \\cdot a^y = a^{x+y}' },
      { title: 'Iloraz potęg o tej samej podstawie', latex: '\\frac{a^x}{a^y} = a^{x-y}' },
      { title: 'Potęgowanie potęgi', latex: '(a^x)^y = a^{x \\cdot y}' },
      { title: 'Potęga iloczynu i ilorazu', latex: '(a \\cdot b)^x = a^x \\cdot b^x, \\quad \\left(\\frac{a}{b}\\right)^x = \\frac{a^x}{b^x}' },
      { title: 'Ujemny wykładnik potęgi', latex: 'a^{-x} = \\frac{1}{a^x}, \\quad \\left(\\frac{a}{b}\\right)^{-x} = \\left(\\frac{b}{a}\\right)^x' },
      { title: 'Wykładnik wymierny (ułamkowy)', latex: 'a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m' }
    ],
    goldenRule: 'Zawsze sprowadzaj potęgi do wspólnej podstawy (zazwyczaj 2, 3 lub 5). Wyłączaj wspólny czynnik o najniższym wykładniku przed nawias przy sumach!',
    ckeTrap: {
      error: '2^3 \\cdot 2^4 = 4^7 \\quad \\text{oraz} \\quad (a + b)^2 = a^2 + b^2',
      correct: '2^3 \\cdot 2^4 = 2^{3+4} = 2^7 \\quad \\text{oraz} \\quad (a + b)^2 = a^2 + 2ab + b^2',
      description: 'Przy mnożeniu potęg o równej podstawie podstawa NIE ulega zmianie, jedynie wykładniki się sumują. Połowa liczby 2^{100} to 2^{99}, a NIE 1^{100} ani 2^{50}!'
    }
  },
  '1.2': {
    lessonId: '1.2',
    title: 'Pierwiastki i działania na liczbach niewymiernych',
    formulas: [
      { title: 'Iloczyn i iloraz pod pierwiastkiem', latex: '\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}, \\quad \\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}' },
      { title: 'Pierwiastek kwadratowy z kwadratu', latex: '\\sqrt{a^2} = |a|' },
      { title: 'Usuwanie niewymierności z mianownika', latex: '\\frac{c}{\\sqrt{a} - \\sqrt{b}} = \\frac{c(\\sqrt{a} + \\sqrt{b})}{a - b}' },
      { title: 'Wzory skróconego mnożenia', latex: '(a - b)(a + b) = a^2 - b^2, \\quad (a \\pm b)^2 = a^2 \\pm 2ab + b^2' }
    ],
    goldenRule: 'Wyłączaj czynniki przed znak pierwiastka przez rozkład na czynniki pierwsze. Aby usunąć niewymierność z sumy/różnicy w mianowniku, pomnóż licznik i mianownik przez sprzężenie.',
    ckeTrap: {
      error: '\\sqrt{a + b} = \\sqrt{a} + \\sqrt{b} \\quad (\\text{np. } \\sqrt{9 + 16} = 3 + 4 = 7)',
      correct: '\\sqrt{9 + 16} = \\sqrt{25} = 5 \\neq 7',
      description: 'Pod pierwiastkiem NIE WOLNO rozbijać dodawania ani odejmowania na dwa oddzielne pierwiastki!'
    }
  },
  '1.3': {
    lessonId: '1.3',
    title: 'Logarytmy od podstaw do pewniaków',
    formulas: [
      { title: 'Definicja logarytmu', latex: '\\log_a b = c \\iff a^c = b \\quad (a > 0, a \\neq 1, b > 0)' },
      { title: 'Suma i różnica logarytmów', latex: '\\log_a x + \\log_a y = \\log_a(x \\cdot y), \\quad \\log_a x - \\log_a y = \\log_a\\left(\\frac{x}{y}\\right)' },
      { title: 'Mnożenie logarytmu przez liczbę', latex: 'k \\cdot \\log_a x = \\log_a(x^k)' },
      { title: 'Tożsamość logarytmiczna', latex: 'a^{\\log_a b} = b, \\quad \\log_a a = 1, \\quad \\log_a 1 = 0' }
    ],
    goldenRule: 'Logarytm to pytanie o wykładnik: „Do jakiej potęgi podnieść a, by wyszło b?”. Zawsze najpierw wciągaj współczynniki przed logarytmem jako wykładniki potęg argumentu.',
    ckeTrap: {
      error: '\\log_a(x + y) = \\log_a x + \\log_a y \\quad \\text{oraz} \\quad \\frac{\\log_a x}{\\log_a y} = \\log_a(x - y)',
      correct: '\\log_a(x \\cdot y) = \\log_a x + \\log_a y \\quad \\text{oraz} \\quad \\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y',
      description: 'Suma logarytmów daje logarytm ILOCZYNU. Logarytm z sumy argumentów jest nierozkładalny!'
    }
  },
  '1.4': {
    lessonId: '1.4',
    title: 'Procenty, punkty procentowe i obliczenia finansowe',
    formulas: [
      { title: 'O ile procent więcej / mniej', latex: '\\text{O ile \\% więcej od } B: \\quad \\frac{A - B}{B} \\cdot 100\\%' },
      { title: 'Kolejne obniżki i podwyżki', latex: 'C_{\\text{końcowa}} = C_0 \\cdot (1 + p_1) \\cdot (1 - p_2)' },
      { title: 'Procent składany (lokata)', latex: 'K_n = K_0 \\cdot (1 + p)^n' },
      { title: 'Punkty procentowe', latex: '\\Delta p.p. = p_2 - p_1' }
    ],
    goldenRule: 'W mianowniku ZAWSZE ląduje baza wyjściowa („od czego liczysz”). Dwie kolejne obniżki o 20% to obniżka o 36%, a nie o 40%!',
    ckeTrap: {
      error: '\\text{Obniżka o 20\\% i podwyżka o 20\\% przywraca cenę pierwotną}',
      correct: '100 \\xrightarrow{-20\\%} 80 \\xrightarrow{+20\\%} 96 \\quad (\\text{strata 4\\%})',
      description: 'Podwyżka i obniżka o ten sam procent nigdy nie dają tej samej kwoty, bo liczone są od innej podstawy!'
    }
  },
  '1.5': {
    lessonId: '1.5',
    title: 'Wartość bezwzględna i przedziały liczbowe',
    formulas: [
      { title: 'Definicja wartości bezwzględnej', latex: '|x| = \\begin{cases} x & \\text{dla } x \\ge 0 \\\\ -x & \\text{dla } x < 0 \\end{cases}' },
      { title: 'Interpretacja odległości na osi', latex: '|x - a| \\le r \\iff x \\in \\langle a - r, a + r \\rangle' },
      { title: 'Nierówność zewnętrzna', latex: '|x - a| \\ge r \\iff x \\le a - r \\;\\lor\\; x \\ge a + r' },
      { title: 'Środek i promień przedziału', latex: 'a = \\frac{x_1 + x_2}{2}, \\quad r = \\frac{x_2 - x_1}{2}' }
    ],
    goldenRule: 'Krok 1: Oszacuj znak wewnątrz kresek wartości bezwzględnej. Krok 2: Jeśli wnętrze jest ujemne, zdejmij moduł i zmień znak KAŻDEGO wyrazu!',
    ckeTrap: {
      error: '|2 - \\sqrt{5}| = 2 - \\sqrt{5} \\quad (\\text{błędny wynik ujemny!})',
      correct: '2 < \\sqrt{5} \\implies 2 - \\sqrt{5} < 0 \\implies |2 - \\sqrt{5}| = \\sqrt{5} - 2 > 0',
      description: 'Wartość bezwzględna NIGDY nie może dać liczby ujemnej. Jeśli wyrażenie jest mniejsze od zera, odwróć kolejność odejmowania!'
    }
  },
  '1.6': {
    lessonId: '1.6',
    title: 'Błąd bezwzględny, względny i szacowanie',
    formulas: [
      { title: 'Błąd bezwzględny', latex: '\\Delta_x = |x - a|' },
      { title: 'Błąd względny', latex: '\\delta_x = \\frac{|x - a|}{x}' },
      { title: 'Błąd względny procentowy', latex: '\\delta_{\\%} = \\frac{|x - a|}{x} \\cdot 100\\%' },
      { title: 'Szacowanie wartości', latex: 'x - \\Delta_x \\le a \\le x + \\Delta_x' }
    ],
    goldenRule: 'x to wartość dokładna, a to przybliżenie. Błąd względny dzielimy ZAWSZE przez wartość DOKŁADNĄ x, a nigdy przez przybliżenie!',
    ckeTrap: {
      error: '\\delta = \\frac{|x - a|}{a} \\quad (\\text{dzielenie przez przybliżenie!})',
      correct: '\\delta = \\frac{|x - a|}{x} \\quad (\\text{dzielenie przez wartość dokładną})',
      description: 'Klasyczna pułapka maturalna: uczeń dzieli błąd bezwzględny przez podane przybliżenie zamiast przez liczbę dokładną.'
    }
  },
  '1.7': {
    lessonId: '1.7',
    title: 'Podzielność, liczby pierwsze i dowodzenie',
    formulas: [
      { title: 'Liczba podzielna przez k', latex: 'n = k \\cdot m, \\quad m \\in \\mathbb{Z}' },
      { title: 'Dzielenie z resztą', latex: 'n = k \\cdot m + r, \\quad m \\in \\mathbb{Z}, \\; 0 \\le r < k' },
      { title: 'Iloczyn 2 kolejnych liczb', latex: 'n(n+1) = 2k \\quad (\\text{zawsze parzysty})' },
      { title: 'Iloczyn 3 kolejnych liczb', latex: '(n-1)n(n+1) = 6k \\quad (\\text{podzielny przez 6})' }
    ],
    goldenRule: 'W zadaniu dowodowym przekształć algebraicznie wyrażenie tak, by wyłączyć szukaną wielokrotność przed nawias. Na końcu ZAWSZE dopisz słowny wniosek podsumowujący dowód!',
    ckeTrap: {
      error: '\\text{Brak formalnego komentarza: } m \\in \\mathbb{Z} \\implies -1 \\text{ pkt na maturze}',
      correct: 'W = 3(n^2 + 2n + 1) + 2 = 3k + 2, \\quad \\text{gdzie } k \\in \\mathbb{Z}',
      description: 'Egzaminator bezwzględnie odejmie 1 punkt za brak słownego podsumowania i uzasadnienia, dlaczego liczba w nawiasie jest całkowita!'
    }
  }
};

function normalizeLessonId(id: string): string {
  return String(id).replace(/^lesson-/, '').replace('-', '.');
}

/**
 * Authoritative pool of all authentic matura tasks from curriculum_matematyka.json.
 */
export const dzial1TasksPool: PoolTask[] = (() => {
  const d1 = (curriculumData as any).topics?.[0];
  if (!d1 || !d1.lessons) return [];

  const pool: PoolTask[] = [];

  d1.lessons.forEach((lesson: any, lIdx: number) => {
    const lessonNormId = normalizeLessonId(lesson.id || `1.${lIdx + 1}`);

    (lesson.tasks || []).forEach((t: any) => {
      const isProof = t.type === 'OPEN_PROOF' || t.type === 'OPEN_GENERAL';
      const tier: TaskDifficultyTier = t.difficulty === 'EASY' ? 'A' : t.difficulty === 'HARD' ? 'C' : 'B';
      const tierLabel = t.difficulty === 'EASY' ? 'Rozgrzewka' : t.difficulty === 'HARD' ? 'Wymagające' : 'Pewniak Maturalny';

      const options: TaskOption[] | undefined = t.options ? t.options.map((opt: any, idx: number) => {
        if (typeof opt === 'string') {
          const letterMatch = opt.match(/^([A-D1-4])[\.\)]\s*(.*)$/);
          const optId = letterMatch ? letterMatch[1] : (['A', 'B', 'C', 'D'][idx] || String(idx + 1));
          const isOptCorrect = (t.correct_answer === opt || t.correct_answer === optId || opt.startsWith(t.correct_answer + '.'));
          return {
            id: optId,
            content_latex: opt,
            is_correct: Boolean(isOptCorrect)
          };
        }
        return {
          id: opt.id,
          content_latex: opt.text || opt.content_latex,
          is_correct: opt.id === t.correct_answer
        };
      }) : undefined;

      let part_1 = t.part_1;
      let part_2 = t.part_2;
      if (t.type === 'TWO_PART' && (!part_1 || !part_2)) {
        if (t.options && Array.isArray(t.options)) {
          part_1 = {
            prompt: 'Wybierz odpowiedź (część 1):',
            options: t.options.map((opt: string, idx: number) => {
              const id = opt.match(/^([A-Za-z])/)?.[1] || ['A', 'B'][idx] || String(idx + 1);
              return { id, text: opt };
            })
          };
        }
        if (t.options_part2 && Array.isArray(t.options_part2)) {
          part_2 = {
            prompt: 'Wybierz uzasadnienie (część 2):',
            options: t.options_part2.map((opt: string, idx: number) => {
              const id = opt.match(/^([1-9])/)?.[1] || String(idx + 1);
              return { id, text: opt };
            })
          };
        }
      }

      let instruction = 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.';
      if (isProof) instruction = 'Przeprowadź rozwiązanie / dowód w brudnopisie lub na tablicy cyfrowej.';
      else if (t.type === 'NUMERIC_INPUT') instruction = 'Oblicz wartość i wpisz ostateczny wynik poniżej.';
      else if (t.type === 'TRUE_FALSE') instruction = 'Oceń prawdziwość podanych zdań. Zaznacz P (Prawda) lub F (Fałsz).';
      else if (t.type === 'TWO_PART') instruction = 'Dokończ zdanie. Wybierz właściwą odpowiedź oraz jej uzasadnienie.';

      const questionText = t.content || t.question || '';

      pool.push({
        id: t.id,
        lessonId: lessonNormId,
        tier,
        tierLabel,
        points: t.points || (isProof ? 2 : 1),
        question: questionText,
        options,
        correct_answer: t.correct_answer,
        correctAnswer: t.correctAnswer || t.correct_answer,
        input_placeholder: t.input_placeholder || 'Wpisz liczbę lub ułamek...',
        statements: t.statements,
        part_1,
        part_2,
        explanation: t.explanation,
        hint_1: t.hints?.level_1 || t.hint_1 || 'Zastosuj wzory z tablic maturalnych CKE.',
        hint_2: t.hints?.level_2 || t.hint_2 || 'Przekształć krok po kroku.',
        hints: {
          level_1: t.hints?.level_1 || t.hint_1 || 'Zastosuj wzory z tablic maturalnych CKE.',
          level_2: t.hints?.level_2 || t.hint_2 || 'Przekształć krok po kroku.'
        },
        hint_cost: t.hint_cost || { level_1: 5, level_2: 10 },
        ai_hint_enabled: Boolean(t.ai_hint_enabled || isProof),
        ai_hint_cost: t.ai_hint_cost || 20,
        scoring_key: t.scoring_key || t.explanation || t.officialKey,
        type: t.type,
        source: t.source || 'Zadanie Maturalne',
        cke_source: t.source || 'Zadanie Maturalne',
        cke_tag: t.source || 'Pewniak Maturalny',
        officialKey: t.explanation,
        instruction,
        ai_tutor_rubric: t.ai_tutor_rubric,
        modelSolutionSteps: [
          { step_num: 1, description: t.explanation }
        ]
      });
    });
  });

  return pool;
})();

/**
 * Helper: True randomized Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Complete, authoritative Theory Pills (Pigułki Wiedzy) for all 7 lessons in Dział 1.
 * Provides rich pedagogical structure: Intuition, KaTeX Core Formulas, Worked Example (Sweller, 2006), and CKE Exam Trap.
 */
export const defaultTheoryPillsByLesson: Record<string, LessonTheoryPill> = {
  '1.1': {
    lessonId: '1.1',
    title: 'Potęgi o wykładnikach całkowitych i wymiernych',
    concept_essence: 'Potęgowanie to skrócony zapis wielokrotnego mnożenia tej samej liczby ($a^n = a \\cdot a \\cdot ... \\cdot a$). Ujemny wykładnik oznacza odwrócenie liczby ($a^{-n} = \\frac{1}{a^n}$), a wykładnik ułamkowy reprezentuje pierwiastkowanie ($a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$). Pamiętaj: potęgować można wyłącznie liczby o dodatniej podstawie, gdy wykładnik nie jest całkowity.',
    matura_context: 'W arkuszu maturalnym zadania z potęg to gwarantowany 1 punkt na samym początku egzaminu. W 90% przypadków kluczem jest **sprowadzenie wszystkich liczb do wspólnej bazy** (najczęściej $2$, $3$ lub $5$). Egzaminator sprawdza, czy nie ulegniesz pokusie mnożenia podstaw zamiast dodawania wykładników.',
    core_formulas: `\\begin{aligned} a^x \\cdot a^y &= a^{x+y} \\\\[6pt] \\frac{a^x}{a^y} &= a^{x-y} \\\\[6pt] (a^x)^y &= a^{x \\cdot y} \\\\[6pt] a^{-x} &= \\frac{1}{a^x} \\\\[6pt] a^{\\frac{m}{n}} &= \\sqrt[n]{a^m} \\end{aligned}`,
    formula_notes: 'Wzory obowiązują dla podstaw $a > 0$, $b > 0$ oraz dowolnych wykładników rzeczywistych.',
    coreFormulaLatex: `\\begin{aligned} a^x \\cdot a^y &= a^{x+y} \\\\[6pt] \\frac{a^x}{a^y} &= a^{x-y} \\\\[6pt] (a^x)^y &= a^{x \\cdot y} \\\\[6pt] a^{-x} &= \\frac{1}{a^x} \\\\[6pt] a^{\\frac{m}{n}} &= \\sqrt[n]{a^m} \\end{aligned}`,
    worked_example: {
      problem: 'Oblicz wartość wyrażenia: $9^3 \\cdot 27^{-1}$',
      step1: 'Sprowadź potęgi do wspólnej podstawy $3$: zapisz $9 = 3^2$ oraz $27 = 3^3$.',
      step2: 'Zastosuj działania na potęgach: $(3^2)^3 \\cdot (3^3)^{-1} = 3^6 \\cdot 3^{-3} = 3^{6 - 3} = 3^3 = 27$.',
      result: '27'
    },
    exam_trap: 'Podstawa potęgi **nigdy się nie zmienia** przy mnożeniu potęg o tej samej podstawie! Błąd: $2^3 \\cdot 2^4 \\neq 4^7$. Prawidłowo: $2^3 \\cdot 2^4 = 2^7$. Pamiętaj też: połowa liczby $2^{100}$ to $2^{99}$, a nie $1^{100}$ ani $2^{50}$!',
    intuition: 'W potęgach **90% zadań maturalnych** polega na sprowadzeniu liczb do wspólnej podstawy (najczęściej **2, 3 lub 5**). Pamiętaj: wykładnik ujemny odwraca ułamek, a ułamkowy zamienia się w pierwiastek.',
    keyTakeaway: 'Sprowadzaj wszystkie potęgi do wspólnej podstawy (najczęściej 2, 3 lub 5). Wykładnik ujemny odwraca liczbę, a ułamek zamienia się w pierwiastek.',
    trapAlert: 'Uwaga na pułapkę: podstawa potęgi się NIE zmienia! Przykład: $2^3 \\cdot 2^4 = 2^7$, a nie $4^7$.'
  },
  '1.2': {
    lessonId: '1.2',
    title: 'Pierwiastki i działania na liczbach niewymiernych',
    concept_essence: 'Pierwiastek $n$-tego stopnia z liczby $a$ to liczba, która podniesiona do potęgi $n$ daje $a$. Pierwiastkowanie jest operacją rozdzielną względem mnożenia i dzielenia, ale **nigdy względem dodawania i odejmowania**. Z definicji $\\sqrt{a^2} = |a|$, co zabezpiecza nieujemność wyniku dla pierwiastków stopnia parzystego.',
    matura_context: 'Zadania z pierwiastków sprawdzają wyłączanie czynnika przed znak pierwiastka (poprzez rozkład na iloczyn z kwadratem) oraz usuwanie niewymierności z mianownika. W zadaniach otwartych brak usunięcia niewymierności ze sprzężeniem grozi utratą punktu za wynik.',
    core_formulas: `\\begin{aligned} \\sqrt[n]{a \\cdot b} &= \\sqrt[n]{a} \\cdot \\sqrt[n]{b} \\\\[6pt] \\sqrt[n]{\\frac{a}{b}} &= \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}} \\\\[6pt] \\sqrt{a^2} &= |a| \\\\[6pt] \\frac{c}{\\sqrt{a} - \\sqrt{b}} &= \\frac{c(\\sqrt{a} + \\sqrt{b})}{a - b} \\end{aligned}`,
    formula_notes: 'Usuwanie niewymierności opiera się na wzorze skróconego mnożenia: $(\\sqrt{a} - \\sqrt{b})(\\sqrt{a} + \\sqrt{b}) = a - b$.',
    coreFormulaLatex: `\\begin{aligned} \\sqrt[n]{a \\cdot b} &= \\sqrt[n]{a} \\cdot \\sqrt[n]{b} \\\\[6pt] \\sqrt[n]{\\frac{a}{b}} &= \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}} \\\\[6pt] \\sqrt{a^2} &= |a| \\\\[6pt] \\frac{c}{\\sqrt{a} - \\sqrt{b}} &= \\frac{c(\\sqrt{a} + \\sqrt{b})}{a - b} \\end{aligned}`,
    worked_example: {
      problem: 'Uprość wyrażenie: $\\sqrt{50} - \\sqrt{18}$',
      step1: 'Rozłóż liczby podpierwiastkowe na iloczyn z kwadratem: $\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$ oraz $\\sqrt{18} = \\sqrt{9 \\cdot 2} = 3\\sqrt{2}$.',
      step2: 'Wykonaj odejmowanie wyrazów podobnych: $5\\sqrt{2} - 3\\sqrt{2} = (5-3)\\sqrt{2} = 2\\sqrt{2}$.',
      result: '2\\sqrt{2}'
    },
    exam_trap: 'Nigdy nie rozbijaj sumy ani różnicy pod pierwiastkiem! $\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}$. Zauważ: $\\sqrt{9+16} = \\sqrt{25} = 5$, podczas gdy $3+4 = 7$!',
    intuition: 'Pierwiastków **nigdy nie dodajemy pod jednym znakiem**. Zamiast tego rozkładaj liczby pod pierwiastkiem na iloczyn kwadratów i usuwaj niewymierność mnożąc przez sprzężenie.',
    keyTakeaway: 'Nigdy nie dodawaj liczb pod pierwiastkami ($\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}$). Usuwaj niewymierność z mianownika.',
    trapAlert: 'Pamiętaj: $\\sqrt{a^2} = |a|$. Dla liczby ujemnej pierwiastek z kwadratu daje wartość dodatnią!'
  },
  '1.3': {
    lessonId: '1.3',
    title: 'Logarytmy i tożsamości logarytmiczne',
    concept_essence: 'Logarytm $\\log_a b = c$ to wykładnik potęgi, do którego należy podnieść podstawę $a$, aby otrzymać liczbę logarytmowaną $b$ ($a^c = b$). Warunki konieczne istnienia logarytmu: podstawa $a > 0$ i $a \\neq 1$ oraz argument $b > 0$. Logarytm zamienia operację mnożenia argumentów na proste dodawanie wartości.',
    matura_context: 'W arkuszu maturalnym regularnie pojawia się zwijanie sumy lub różnicy logarytmów o tej samej podstawie w jeden logarytm. Pamiętaj: przed zastosowaniem wzoru na sumę, każda liczba stojąca przed logarytmem musi najpierw trafić do potęgi argumentu.',
    core_formulas: `\\begin{aligned} \\log_a b = c &\\iff a^c = b \\\\[6pt] \\log_a x + \\log_a y &= \\log_a(x \\cdot y) \\\\[6pt] \\log_a x - \\log_a y &= \\log_a\\left(\\frac{x}{y}\\right) \\\\[6pt] k \\cdot \\log_a x &= \\log_a(x^k) \\end{aligned}`,
    formula_notes: 'Wzory obowiązują dla podstawy $a > 0, a \\neq 1$ oraz liczb logarytmowanych $x > 0, y > 0$.',
    coreFormulaLatex: `\\begin{aligned} \\log_a b = c &\\iff a^c = b \\\\[6pt] \\log_a x + \\log_a y &= \\log_a(x \\cdot y) \\\\[6pt] \\log_a x - \\log_a y &= \\log_a\\left(\\frac{x}{y}\\right) \\\\[6pt] k \\cdot \\log_a x &= \\log_a(x^k) \\end{aligned}`,
    worked_example: {
      problem: 'Oblicz wartość wyrażenia: $2\\log_2 6 - \\log_2 9$',
      step1: 'Wciągnij współczynnik $2$ do wykładnika potęgi argumentu: $2\\log_2 6 = \\log_2(6^2) = \\log_2 36$.',
      step2: 'Zastosuj wzór na różnicę logarytmów: $\\log_2 36 - \\log_2 9 = \\log_2\\left(\\frac{36}{9}\\right) = \\log_2 4 = 2$, bo $2^2 = 4$.',
      result: '2'
    },
    exam_trap: 'Suma logarytmów daje logarytm iloczynu, a NIE sumy! Błąd: $\\log(x+y) \\neq \\log x + \\log y$. Ponadto ułamek $\\frac{\\log_a x}{\\log_a y}$ to NIE jest $\\log_a(x-y)$!',
    intuition: 'Logarytm $\\log_a b$ to po prostu pytanie: **„Do jakiej potęgi podnieść $a$, aby otrzymać $b$?”** Suma logarytmów zamienia się w logarytm iloczynu.',
    keyTakeaway: 'Logarytm to pytanie o wykładnik: „Do jakiej potęgi podnieść a, by wyszło b?”. Zawsze najpierw wciągaj współczynniki przed logarytmem jako wykładniki.',
    trapAlert: 'Suma logarytmów daje logarytm ILOCZYNU. Logarytm z sumy argumentów jest nierozkładalny!'
  },
  '1.4': {
    lessonId: '1.4',
    title: 'Procenty, punkty procentowe i obliczenia finansowe',
    concept_essence: 'Jeden procent to jedna setna części całości ($1\\% = 0{,}01$). Przy zmianach procentowych kluczowe jest pojęcie mnożnika cenowego: podwyżka o $p\\%$ oznacza pomnożenie wielkości przez $(1 + \\frac{p}{100})$, a obniżka przez $(1 - \\frac{p}{100})$. Punkt procentowy ($p.p.$) to arytmetyczna różnica między dwiema stopami procentowymi.',
    matura_context: 'W zadaniach maturalnych Egzaminator sprawdza wielokrotne zmiany cen (np. obniżka, a potem podwyżka) oraz różnicę między procentem a punktem procentowym. Egzaminator punktuje poprawne zidentyfikowanie **bazy wyjściowej** – czyli wartości, od której w danym kroku naliczany jest procent.',
    core_formulas: `\\begin{aligned} C_{\\text{końcowa}} &= C_0 \\cdot (1 + p) \\\\[6pt] C_{\\text{końcowa}} &= C_0 \\cdot (1 - p) \\\\[6pt] \\text{Względna zmiana} &= \\frac{K - P}{P} \\cdot 100\\% \\\\[6pt] \\Delta p.p. &= p_2 - p_1 \\end{aligned}`,
    formula_notes: 'W mianowniku wzoru na względną zmianę zawsze umieszczaj początkową wartość bazową $P$.',
    coreFormulaLatex: `\\begin{aligned} C_{\\text{końcowa}} &= C_0 \\cdot (1 + p) \\\\[6pt] C_{\\text{końcowa}} &= C_0 \\cdot (1 - p) \\\\[6pt] \\text{Względna zmiana} &= \\frac{K - P}{P} \\cdot 100\\% \\\\[6pt] \\Delta p.p. &= p_2 - p_1 \\end{aligned}`,
    worked_example: {
      problem: 'Towar kosztował $200$ zł. Cenę obniżono o $20\\%$, a potem nową cenę podniesiono o $10\\%$. Ile wynosi cena końcowa?',
      step1: 'Zapisz mnożniki cenowe: obniżka o $20\\%$ to współczynnik $0{,}8$, a podwyżka o $10\\%$ to współczynnik $1{,}1$.',
      step2: 'Oblicz cenę końcową mnożąc kolejne czynniki: $200 \\cdot 0{,}8 \\cdot 1{,}1 = 160 \\cdot 1{,}1 = 176$ zł.',
      result: '176\\text{ zł}'
    },
    exam_trap: 'Dwie kolejne obniżki o $20\\%$ to NIE jest obniżka o $40\\%$! Ze $100$ zł po $-20\\%$ zostaje $80$ zł, a po kolejnym $-20\\%$ zostaje $64$ zł (czyli łączna obniżka o $36\\%$). Podwyżka i obniżka o ten sam procent nigdy nie przywracają ceny wyjściowej!',
    intuition: 'W zadaniach z procentami kluczem jest **baza wyjściowa**. Podwyżka o $p\\%$ to mnożenie przez $(1 + \\frac{p}{100})$, a obniżka przez $(1 - \\frac{p}{100})$.',
    keyTakeaway: 'W mianowniku ZAWSZE ląduje baza wyjściowa („od czego liczysz”). Dwie kolejne obniżki o 20% to obniżka o 36%, a nie o 40%!',
    trapAlert: 'Podwyżka i obniżka o ten sam procent nigdy nie dają tej samej kwoty, bo liczone są od innej podstawy!'
  },
  '1.5': {
    lessonId: '1.5',
    title: 'Wartość bezwzględna i przedziały liczbowe',
    concept_essence: 'Wartość bezwzględna $|x|$ określa odległość liczby $x$ od zera na osi liczbowej. Ponieważ odległość jest zawsze nieujemna, $|x| \\ge 0$ dla dowolnego $x$. Wyrażenie $|x - a| \\le r$ interpretujemy geometrycznie jako zbiór punktów oddalonych od środka $a$ o co najwyżej promień $r$.',
    matura_context: 'W arkuszu maturalnym pojawiają się dwa kluczowe warianty: zdejmowanie modułu z różnicy niewymiernej (np. $|3 - \\pi|$) oraz zapis przedziałów liczbowych. Egzaminator bada, czy sprawdzasz znak wyrażenia pod modułem przed opuszczeniem kresek wartości bezwzględnej.',
    core_formulas: `\\begin{aligned} |x| &= \\begin{cases} x & \\text{gdy } x \\ge 0 \\\\ -x & \\text{gdy } x < 0 \\end{cases} \\\\[6pt] |x - a| \\le r &\\iff x \\in \\langle a-r, a+r \\rangle \\\\[6pt] |x - a| \\ge r &\\iff x \\le a-r \\;\\lor\\; x \\ge a+r \\end{aligned}`,
    formula_notes: 'Liczba $a$ to środek przedziału na osi liczbowej, a $r$ to promień (odległość od środka).',
    coreFormulaLatex: `\\begin{aligned} |x| &= \\begin{cases} x & \\text{gdy } x \\ge 0 \\\\ -x & \\text{gdy } x < 0 \\end{cases} \\\\[6pt] |x - a| \\le r &\\iff x \\in \\langle a-r, a+r \\rangle \\\\[6pt] |x - a| \\ge r &\\iff x \\le a-r \\;\\lor\\; x \\ge a+r \\end{aligned}`,
    worked_example: {
      problem: 'Uprość wyrażenie: $|3 - \\pi| + |2 - \\sqrt{5}|$',
      step1: 'Oceń znak wyrażenia wewnątrz każdego modułu: $\\pi \\approx 3{,}14 \\implies 3 - \\pi < 0$ oraz $\\sqrt{5} \\approx 2{,}24 \\implies 2 - \\sqrt{5} < 0$.',
      step2: 'Zdejmij moduły zmieniając znaki na przeciwne: $|3 - \\pi| = \\pi - 3$ oraz $|2 - \\sqrt{5}| = \\sqrt{5} - 2$. Wynik: $(\\pi - 3) + (\\sqrt{5} - 2) = \\pi + \\sqrt{5} - 5$.',
      result: '\\pi + \\sqrt{5} - 5'
    },
    exam_trap: 'Klasyczny błąd na maturze: pisanie $|2 - \\sqrt{5}| = 2 - \\sqrt{5}$. Ponieważ $2 < \\sqrt{5}$, wynik $2 - \\sqrt{5} < 0$ byłby ujemny, co jest sprzeczne z definicją modułu! Poprawnie: $|2 - \\sqrt{5}| = \\sqrt{5} - 2$.',
    intuition: 'Wartość bezwzględna to **odległość na osi liczbowej** – nigdy nie może być ujemna! Przed zdjęciem kresek modułu sprawdź znak wyrażenia w środku.',
    keyTakeaway: 'Krok 1: Oszacuj znak wewnątrz kresek wartości bezwzględnej. Krok 2: Jeśli wnętrze jest ujemne, zdejmij moduł i zmień znak KAŻDEGO wyrazu!',
    trapAlert: 'Wartość bezwzględna NIGDY nie może dać liczby ujemnej. Jeśli wyrażenie jest mniejsze od zera, odwróć kolejność odejmowania!'
  },
  '1.6': {
    lessonId: '1.6',
    title: 'Błąd bezwzględny, względny i szacowanie',
    concept_essence: 'Przybliżenie wartości dokładnej $x$ liczbą szacowaną $a$ wiąże się z błędem. Błąd bezwzględny $\\Delta_x = |x - a|$ mierzy różnicę między tymi wartościami. Błąd względny $\\delta_x = \\frac{|x - a|}{x}$ odnosi tę różnicę do rzeczywistej wielkości, pozwalając obiektywnie ocenić precyzję oszacowania.',
    matura_context: 'W zadaniach z błędu względnego Egzaminator sprawdza mianownik ułamka. Żelazna reguła egzaminacyjna: **zawsze dzielimy przez wartość dokładną $x$**, a nigdy przez przybliżenie $a$. Zastosowanie przybliżenia w mianowniku powoduje całkowite wyzerowanie zadania.',
    core_formulas: `\\begin{aligned} \\Delta_x &= |x - a| \\\\[6pt] \\delta_x &= \\frac{|x - a|}{x} \\\\[6pt] \\delta_{\\%} &= \\frac{|x - a|}{x} \\cdot 100\\% \\end{aligned}`,
    formula_notes: '$\\Delta_x$ to błąd bezwzględny, $\\delta_x$ to błąd względny, a $\\delta_{\\%}$ to błąd procentowy. Pamiętaj: w mianowniku zawsze stoi wartość dokładna $x$.',
    coreFormulaLatex: `\\begin{aligned} \\Delta_x &= |x - a| \\\\[6pt] \\delta_x &= \\frac{|x - a|}{x} \\\\[6pt] \\delta_{\\%} &= \\frac{|x - a|}{x} \\cdot 100\\% \\end{aligned}`,
    worked_example: {
      problem: 'Liczbę $x = \\frac{5}{8}$ zaokrąglono do $a = 0{,}6$. Oblicz błąd względny tego przybliżenia.',
      step1: 'Zapisz wartość dokładną dziesiętnie: $x = 0{,}625$ oraz wyznacz błąd bezwzględny: $\\Delta = |0{,}625 - 0{,}6| = 0{,}025$.',
      step2: 'Oblicz błąd względny dzieląc błąd bezwzględny przez liczbę dokładną: $\\delta = \\frac{0{,}025}{0{,}625} = \\frac{1}{25} = 0{,}04 = 4\\%$.',
      result: '4\\%'
    },
    exam_trap: 'Zawsze dziel przez wartość DOKŁADNĄ $x$, a nie przez przybliżenie $a$! Błąd: $\\frac{0{,}025}{0{,}6} \\approx 4{,}17\\%$. Egzaminator bezlitośnie zeruje zadanie za dzielenie przez przybliżenie.',
    intuition: 'Błąd bezwzględny to prosta różnica $|x - a|$. W błędzie względnym pamiętaj o żelaznej regule: **zawsze dzielisz przez wartość DOKŁADNĄ $x$**, nigdy przez przybliżenie $a$!',
    keyTakeaway: 'x to wartość dokładna, a to przybliżenie. Błąd względny dzielimy ZAWSZE przez wartość DOKŁADNĄ x, a nigdy przez przybliżenie!',
    trapAlert: 'Klasyczna pułapka maturalna: uczeń dzieli błąd bezwzględny przez podane przybliżenie zamiast przez liczbę dokładną.'
  },
  '1.7': {
    lessonId: '1.7',
    title: 'Podzielność, liczby pierwsze i dowodzenie',
    concept_essence: 'Liczba całkowita $n$ jest podzielna przez liczbę $k \\neq 0$ wtedy i tylko wtedy, gdy istnieje liczba całkowita $m$, taka że $n = k \\cdot m$. W dowodach podzielności dążymy do wyłączenia szukanej wielokrotności przed nawias lub zapisu wyrażenia w postaci iloczynu kolejnych liczb całkowitych.',
    matura_context: 'W zadaniu dowodowym z algebry egzaminator oczekuje precyzji: przekształcenia algebraicznego z wyłączeniem szukanej wielokrotności oraz formalnego komentarza słownego uzasadniającego, dlaczego czynniki gwarantują podzielność.',
    core_formulas: `\\begin{aligned} n &= k \\cdot m \\quad (m \\in \\mathbb{Z}) \\\\[6pt] n(n+1) &= 2k \\\\[6pt] (n-1)n(n+1) &= 6k \\end{aligned}`,
    formula_notes: 'Iloczyn dwóch kolejnych liczb całkowitych jest zawsze podzielny przez 2, a iloczyn trzech kolejnych liczb całkowitych dzieli się przez 6.',
    coreFormulaLatex: `\\begin{aligned} n &= k \\cdot m \\quad (m \\in \\mathbb{Z}) \\\\[6pt] n(n+1) &= 2k \\\\[6pt] (n-1)n(n+1) &= 6k \\end{aligned}`,
    worked_example: {
      problem: 'Udowodnij, że dla każdej liczby całkowitej $n$ wyrażenie $n^3 - n$ jest podzielne przez $6$.',
      step1: 'Rozłóż wyrażenie na czynniki: $n^3 - n = n(n^2 - 1) = (n-1)n(n+1)$.',
      step2: 'Zapisz wniosek: $(n-1), n, (n+1)$ to iloczyn trzech kolejnych liczb całkowitych. Wśród nich co najmniej jedna jest podzielna przez 2 i dokładnie jedna przez 3, zatem iloczyn dzieli się przez $2 \\cdot 3 = 6$.',
      result: '6 \\mid (n^3 - n)'
    },
    exam_trap: 'Brak formalnego komentarza słownego to utrata 1 punktu na maturze! Samo rozłożenie na nawiasy nie wystarczy – egzaminator wymaga uzasadnienia, że iloczyn kolejnych liczb zawiera wielokrotności 2 i 3.',
    intuition: 'W zadaniu dowodowym z podzielności Twoim celem jest **wyłączenie szukanej wielokrotności przed nawias** (np. $W = 6k$) i formalne uzasadnienie, dlaczego liczba w nawiasie $k$ jest całkowita.',
    keyTakeaway: 'W zadaniu dowodowym przekształć algebraicznie wyrażenie tak, by wyłączyć szukaną wielokrotność przed nawias. Na końcu ZAWSZE dopisz słowny wniosek podsumowujący dowód!',
    trapAlert: 'Egzaminator bezwzględnie odejmie 1 punkt za brak słownego podsumowania i uzasadnienia, dlaczego liczba w nawiasie jest całkowita!'
  }
};

function formatFormulasBlock(raw: any): any {
  if (!raw) return '';
  if (Array.isArray(raw)) {
    return raw;
  }
  return String(raw);
}

/**
 * Retrieves the comprehensive Theory Pill (Pigułka Wiedzy) for a given lesson
 */
export function getLessonTheoryPill(lessonId: string): LessonTheoryPill {
  const normTarget = normalizeLessonId(lessonId);
  const d1 = (curriculumData as any).topics?.[0];
  const lesson = d1?.lessons?.find((l: any) => 
    String(l.id) === lessonId || 
    normalizeLessonId(l.id) === normTarget ||
    String(l.id).endsWith(normTarget.replace('.', '-')) ||
    String(l.id).endsWith(normTarget)
  );
  const formulaSheet = formulaSheetsByLesson[normTarget] || formulaSheetsByLesson['1.1'];
  const defaultPill = defaultTheoryPillsByLesson[normTarget] || defaultTheoryPillsByLesson['1.1'];

  const pillData = lesson?.theory_pill || lesson?.theoryPill || {};
  const formattedFormulas = formatFormulasBlock(pillData.core_formulas || defaultPill?.core_formulas || pillData.coreFormulaLatex || defaultPill?.coreFormulaLatex);

  return {
    lessonId: normTarget,
    title: lesson?.title || defaultPill?.title || formulaSheet?.title || `Lekcja ${normTarget}`,
    concept_essence: pillData.concept_essence || defaultPill?.concept_essence || pillData.intuition || defaultPill?.intuition,
    matura_context: pillData.matura_context || defaultPill?.matura_context || pillData.keyTakeaway || defaultPill?.keyTakeaway,
    core_formulas: formattedFormulas,
    formula_notes: pillData.formula_notes || defaultPill?.formula_notes || '',
    coreFormulaLatex: formattedFormulas,
    worked_example: pillData.worked_example || defaultPill?.worked_example,
    exam_trap: pillData.exam_trap || pillData.cke_trap || defaultPill?.exam_trap,
    intuition: pillData.concept_essence || defaultPill?.concept_essence || pillData.intuition || defaultPill?.intuition,
    keyTakeaway: pillData.matura_context || defaultPill?.matura_context || pillData.keyTakeaway,
    trapAlert: pillData.exam_trap || defaultPill?.exam_trap || pillData.trapAlert,
    summary: pillData.summary || ''
  };
}

/**
 * Zwraca całą dostępną pulę zadań dla danej lekcji (do pętli Mastery Learning)
 */
export function getLessonTaskPool(lessonId: string): PoolTask[] {
  const normTarget = normalizeLessonId(lessonId);
  return dzial1TasksPool.filter(t => t.lessonId === normTarget || t.lessonId === lessonId);
}

export const LESSON_DEFAULT_DURATIONS: Record<string, string> = {
  '1.1': '~5 min',
  '1.2': '~6 min',
  '1.3': '~6 min',
  '1.4': '~5 min',
  '1.5': '~6 min',
  '1.6': '~7 min',
  '1.7': '~8 min',
};

export const LESSON_DEFAULT_REQUIRED_TASKS: Record<string, number> = {
  '1.1': 4,
  '1.2': 4,
  '1.3': 4,
  '1.4': 4,
  '1.5': 4,
  '1.6': 4,
  '1.7': 4,
};

/**
 * Dynamic Session Generator (Mastery Workout Flow):
 * Losuje z puli danej lekcji zestaw zadań maturalnych.
 * Towarzyszy im Krok 1 (Pigułka Wiedzy) oraz dynamiczny cel poprawnych odpowiedzi (required_correct_tasks).
 */
export function drawSessionTasks(lessonId: string): {
  sessionTasks: any[];
  formulaSheet: LessonFormulaSheet | null;
  theoryPill: LessonTheoryPill;
  lessonKey: string;
  required_correct_tasks: number;
  estimated_time_formatted: string;
} {
  const normId = normalizeLessonId(lessonId);
  const lessonPool = dzial1TasksPool.filter(t => t.lessonId === normId || t.lessonId === lessonId);
  const formulaSheet = formulaSheetsByLesson[normId] || formulaSheetsByLesson['1.1'];
  const theoryPill = getLessonTheoryPill(lessonId);

  const d1 = (curriculumData as any).topics?.[0];
  const lessonMeta = d1?.lessons?.find((l: any) => 
    String(l.id) === lessonId || 
    normalizeLessonId(l.id) === normId ||
    String(l.id).endsWith(normId.replace('.', '-')) ||
    String(l.id).endsWith(normId)
  );

  const required_correct_tasks = lessonMeta?.required_correct_tasks || LESSON_DEFAULT_REQUIRED_TASKS[normId] || 4;
  const estimated_time_formatted = lessonMeta?.estimated_time_formatted || LESSON_DEFAULT_DURATIONS[normId] || '~6 min';

  if (lessonPool.length === 0) {
    return { 
      sessionTasks: [], 
      formulaSheet, 
      theoryPill, 
      lessonKey: normId, 
      required_correct_tasks, 
      estimated_time_formatted 
    };
  }

  // Dynamiczny cel: required_correct_tasks z puli lekcji
  const targetCount = Math.min(required_correct_tasks, lessonPool.length);

  // Dynamic random shuffle
  const shuffled = shuffleArray(lessonPool);
  const rawTasks = shuffled.slice(0, targetCount);

  // Map to unified TaskItem structure
  const sessionTasks = rawTasks.map((task, idx) => ({
    id: task.id,
    lessonId: normId,
    type: task.type || (task.options && task.options.length > 0 ? 'SINGLE_CHOICE' : 'OPEN_PROOF'),
    tier: task.tier,
    tierLabel: task.tierLabel,
    stepNumber: idx + 1,
    totalSteps: rawTasks.length,
    points: task.points,
    source: task.source || 'Zadanie Maturalne',
    cke_source: task.source || 'Zadanie Maturalne',
    title: `Zadanie ${idx + 1} z ${rawTasks.length} • ${task.tierLabel}`,
    topic: `Liczby Rzeczywiste • Lekcja ${normId}`,
    instruction: task.instruction || (task.type === 'OPEN_PROOF' ? 'Zapisz swoje rozwiązanie lub dowód na tablicy cyfrowej...' : 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.'),
    math_statement: task.question,
    question: task.question,
    options: task.options || [],
    correct_answer: task.correct_answer,
    correctAnswer: task.correctAnswer || task.correct_answer,
    input_placeholder: task.input_placeholder,
    statements: task.statements,
    part_1: task.part_1,
    part_2: task.part_2,
    numeric_correct_answer: task.correct_answer,
    explanation: task.explanation,
    officialKey: task.officialKey || task.explanation,
    ai_tutor_rubric: task.ai_tutor_rubric,
    modelSolutionSteps: task.modelSolutionSteps || [{ step_num: 1, description: task.explanation }],
    hints: {
      level_1: task.hint_1,
      level_2: task.hint_2,
      ai_tutor_prompt: `Pomóż uczniowi rozwiązać zadanie maturalne: ${task.question}`
    },
    maxPoints: task.points,
    difficulty: task.tierLabel,
    xp: task.points * 10
  }));

  return {
    sessionTasks,
    formulaSheet,
    theoryPill,
    lessonKey: normId,
    required_correct_tasks,
    estimated_time_formatted
  };
}

export interface BossExamTask {
  id: string;
  lessonId: string;
  lessonOrder: number;
  lessonTitle: string;
  topicLabel: string;
  question: string;
  options?: TaskOption[];
  correct_answer?: string;
  correctAnswer?: string;
  input_placeholder?: string;
  statements?: { id: string; text: string; correct: string }[];
  part_1?: { prompt?: string; options: { id: string; text: string }[] };
  part_2?: { prompt?: string; options: { id: string; text: string }[] };
  explanation: string;
  hint_1: string;
  hint_2: string;
  source: string;
  type: string;
  points: number;
  ai_tutor_rubric?: any;
}

export interface BossExamData {
  id: string;
  title: string;
  subtitle: string;
  boss_name?: string;
  boss_message?: string;
  timeLimitMinutes: number;
  passingScore: number;
  totalQuestions: number;
  rewardXp: number;
  rewardCoins: number;
  badgeId: string;
  tasks: BossExamTask[];
}

/**
 * Automatyczny generator sprawdzianu Działu 1 (Boss Exam):
 * Losuje 10 zadań ze wszystkich lekcji Działu 1 (zgodnie z final_test w curriculum).
 * Zegar 20 minut, próg zaliczenia: 7 z 10 pkt (70%).
 */
export function generateDzial1BossExam(): BossExamData {
  const d1 = (curriculumData as any).topics?.[0];
  const finalTest = d1?.final_test || {};
  const tasksToDraw = finalTest.tasks_to_draw || 10;

  // Shuffle and draw 10 tasks across Dział 1
  const shuffledPool = shuffleArray([...dzial1TasksPool]);
  const chosenPool = shuffledPool.slice(0, Math.min(tasksToDraw, shuffledPool.length));

  const examTasks: BossExamTask[] = chosenPool.map((chosen, idx) => ({
    id: chosen.id,
    lessonId: chosen.lessonId,
    lessonOrder: idx + 1,
    lessonTitle: `Zadanie ${idx + 1} (${chosen.tierLabel})`,
    topicLabel: 'Liczby Rzeczywiste',
    question: chosen.question,
    options: chosen.options || [],
    correct_answer: chosen.correct_answer,
    correctAnswer: chosen.correctAnswer || chosen.correct_answer,
    input_placeholder: chosen.input_placeholder,
    statements: chosen.statements,
    part_1: chosen.part_1,
    part_2: chosen.part_2,
    explanation: chosen.explanation,
    hint_1: chosen.hint_1,
    hint_2: chosen.hint_2,
    source: chosen.source || `Zadanie Maturalne ${idx + 1}`,
    type: chosen.type || (chosen.options && chosen.options.length > 0 ? 'SINGLE_CHOICE' : 'OPEN_PROOF'),
    points: chosen.points || 1,
    ai_tutor_rubric: chosen.ai_tutor_rubric
  }));

  return {
    id: 'exam-dzial-1',
    title: finalTest.title || 'Sprawdzian: Liczby Rzeczywiste',
    subtitle: finalTest.description || 'Czas na ostateczne starcie z działem 1. Ten test wylosuje 10 zadań ze wszystkich lekcji w tym dziale.',
    boss_name: finalTest.boss_name || 'Królowa Liczb Rzeczywistych',
    boss_message: finalTest.boss_message || 'Egzaminator czeka! Przypomnij sobie wzory na logarytmy i potęgi. Pamiętaj, nie ma pośpiechu.',
    timeLimitMinutes: 20,
    passingScore: 7,
    totalQuestions: examTasks.length,
    rewardXp: 200,
    rewardCoins: 100,
    badgeId: 'master_dzial_1',
    tasks: examTasks
  };
}
