import { TaskOption, LessonTheoryPill } from '../types';
import { curriculumRepository } from '../services/curriculumRepository';
import { normalizeTask } from './mathTasks';
import { allFormulaSheetsByLesson } from './allFormulaSheets';
import { polishTopics } from './polishCurriculum';

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
  isLeksykon?: boolean;
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
      { title: 'Potęga potęgi', latex: '(a^x)^y = a^{x \\cdot y}' },
      { title: 'Potęga o wykładniku ujemnym', latex: 'a^{-n} = \\frac{1}{a^n}' },
      { title: 'Potęga o wykładniku wymiernym', latex: 'a^{\\frac{m}{n}} = \\sqrt[n]{a^m}' }
    ],
    goldenRule: 'Zawsze sprowadzaj podstawy potęg do liczb pierwszych (np. $4 = 2^2$, $9 = 3^2$, $8 = 2^3$).',
    ckeTrap: {
      error: '(-2)^2 \\neq -2^2',
      correct: '(-2)^2 = 4, \\quad -2^2 = -4',
      description: 'Znak minus bez nawiasu nie jest podnoszony do potęgi!'
    }
  },
  '1.2': {
    lessonId: '1.2',
    title: 'Pierwiastki i działania na pierwiastkach',
    formulas: [
      { title: 'Iloczyn pierwiastków', latex: '\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{a \\cdot b}' },
      { title: 'Iloraz pierwiastków', latex: '\\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\frac{a}{b}}' },
      { title: 'Pierwiastek z potęgi parzystej', latex: '\\sqrt{a^2} = |a|' },
      { title: 'Usuwanie niewymierności', latex: '\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}' }
    ],
    goldenRule: 'Pamiętaj: $\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}$! Pierwiastków nie wolno rozbijać przez dodawanie.',
    ckeTrap: {
      error: '\\sqrt{9 + 16} = 3 + 4 = 7',
      correct: '\\sqrt{9 + 16} = \\sqrt{25} = 5',
      description: 'Zawsze wykonaj najpierw dodawanie pod znakiem pierwiastka.'
    }
  },
  '1.3': {
    lessonId: '1.3',
    title: 'Wzory skróconego mnożenia',
    formulas: [
      { title: 'Kwadrat sumy', latex: '(a+b)^2 = a^2 + 2ab + b^2' },
      { title: 'Kwadrat różnicy', latex: '(a-b)^2 = a^2 - 2ab + b^2' },
      { title: 'Różnica kwadratów', latex: 'a^2 - b^2 = (a-b)(a+b)' },
      { title: 'Sześcian sumy', latex: '(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3' },
      { title: 'Różnica sześcianów', latex: 'a^3 - b^3 = (a-b)(a^2 + ab + b^2)' }
    ],
    goldenRule: 'Różnica kwadratów $(a-b)(a+b)$ to najczęstszy sposób na usuwanie niewymierności i rozkład na czynniki.',
    ckeTrap: {
      error: '(a+b)^2 = a^2 + b^2',
      correct: '(a+b)^2 = a^2 + 2ab + b^2',
      description: 'Nigdy nie zapominaj o podwojonym iloczynie ($2ab$)!'
    }
  },
  '1.4': {
    lessonId: '1.4',
    title: 'Logarytmy i ich własności',
    formulas: [
      { title: 'Definicja logarytmu', latex: '\\log_a b = c \\iff a^c = b' },
      { title: 'Suma logarytmów', latex: '\\log_a x + \\log_a y = \\log_a(x \\cdot y)' },
      { title: 'Różnica logarytmów', latex: '\\log_a x - \\log_a y = \\log_a\\left(\\frac{x}{y}\\right)' },
      { title: 'Potęga w liczbie logarytmowanej', latex: '\\log_a(x^k) = k \\cdot \\log_a x' },
      { title: 'Zamiana podstawy', latex: '\\log_a b = \\frac{\\log_c b}{\\log_c a}' }
    ],
    goldenRule: 'Zanim obliczysz logarytm, sprawdź założenia: podstawa $a > 0, a \\neq 1$ oraz liczba logarytmowana $b > 0$.',
    ckeTrap: {
      error: '\\log(x+y) = \\log x + \\log y',
      correct: '\\log(x \\cdot y) = \\log x + \\log y',
      description: 'Suma logarytmów daje logarytm iloczynu, a nie sumy!'
    }
  },
  '1.5': {
    lessonId: '1.5',
    title: 'Wartość bezwzględna i odległość na osi',
    formulas: [
      { title: 'Definicja wartości bezwzględnej', latex: '|x| = \\begin{cases} x & \\text{dla } x \\geq 0 \\\\ -x & \\text{dla } x < 0 \\end{cases}' },
      { title: 'Interpretacja geometryczna', latex: '|x - a| = d(x, a)' },
      { title: 'Równanie $|x| = a$', latex: '|x| = a \\iff x = a \\lor x = -a \\quad (a \\geq 0)' },
      { title: 'Nierówność $|x| < a$', latex: '|x| < a \\iff -a < x < a' },
      { title: 'Nierówność $|x| > a$', latex: '|x| > a \\iff x < -a \\lor x > a' }
    ],
    goldenRule: '$|x - a| \\leq r$ oznacza przedział domknięty o środku w $a$ i promieniu $r$: $[a-r, a+r]$.',
    ckeTrap: {
      error: '|x| = -3 \\implies x = 3',
      correct: '|x| = -3 \\implies x \\in \\emptyset',
      description: 'Wartość bezwzględna nigdy nie może być ujemna!'
    }
  },
  '1.6': {
    lessonId: '1.6',
    title: 'Procenty, punkty procentowe i kapitalizacja',
    formulas: [
      { title: 'Obliczanie procentu danej liczby', latex: 'p\\% \\cdot a = \\frac{p}{100} \\cdot a' },
      { title: 'Podwyżka o p%', latex: 'a \\cdot \\left(1 + \\frac{p}{100}\\right)' },
      { title: 'Obniżka o p%', latex: 'a \\cdot \\left(1 - \\frac{p}{100}\\right)' },
      { title: 'Procent składany', latex: 'K_n = K_0 \\cdot \\left(1 + \\frac{p}{100}\\right)^n' }
    ],
    goldenRule: 'Pamiętaj: wzrost z $10\\%$ do $15\\%$ to wzrost o $5$ punktów procentowych, ale o $50\\%$!',
    ckeTrap: {
      error: 'Cena wzrosła o 20%, a potem spadła o 20% = cena bez zmian',
      correct: '1.20 \\cdot 0.80 = 0.96 \\implies \\text{cena spadła o 4%}',
      description: 'Druga zmiana procentowa odnosi się do nowej, wyższej kwoty bazowej!'
    }
  },
  '1.7': {
    lessonId: '1.7',
    title: 'Błąd bezwzględny, błąd względny i szacowanie',
    formulas: [
      { title: 'Błąd bezwzględny', latex: '\\Delta x = |x - x_0|' },
      { title: 'Błąd względny', latex: '\\delta = \\frac{|x - x_0|}{x}' },
      { title: 'Błąd względny procentowy', latex: '\\delta\\% = \\frac{|x - x_0|}{x} \\cdot 100\\%' }
    ],
    goldenRule: 'W mianowniku błędu względnego zawsze stoi wartość dokładna ($x$), a nie przybliżona ($x_0$).',
    ckeTrap: {
      error: '\\delta = \\frac{|x - x_0|}{x_0}',
      correct: '\\delta = \\frac{|x - x_0|}{x}',
      description: 'Dzielimy przez dokładną wartość rzeczywistą, a nie przez szacunek!'
    }
  }
};

function normalizeLessonId(id: string): string {
  return String(id).replace(/^lesson-/, '').replace('-', '.');
}

export function getLessonFormulaSheet(lessonId: string): LessonFormulaSheet | null {
  const normId = normalizeLessonId(lessonId);
  return (allFormulaSheetsByLesson as Record<string, LessonFormulaSheet>)[normId] || formulaSheetsByLesson[normId] || null;
}

export function getLessonTheoryPill(lessonId: string): LessonTheoryPill | null {
  return null;
}

export function getLessonTaskPool(lessonId: string): PoolTask[] {
  if (lessonId.startsWith('pol-')) {
    for (const topic of polishTopics) {
      for (const lesson of topic.lessons || []) {
        if (lesson.id === lessonId) {
          return (lesson.tasks || []) as unknown as PoolTask[];
        }
      }
    }
  }
  return [];
}

export interface SessionTasksDrawResult {
  lessonId: string;
  sessionTasks: any[];
  formulaSheet: LessonFormulaSheet | null;
  theoryPill?: any;
  required_correct_tasks?: number;
  estimated_time_formatted?: string;
}

/**
 * Draws session tasks for a lesson.
 * Supports task randomization from pools for both Mathematics and Polish.
 */
export function drawSessionTasks(lessonId: string, providedTasks?: any[], providedFormulaSheet?: any): SessionTasksDrawResult {
  const normId = normalizeLessonId(lessonId);
  const formulaSheet = providedFormulaSheet || getLessonFormulaSheet(normId);
  const isPolish = lessonId.startsWith('pol-') || (providedTasks && providedTasks[0]?.id?.includes('pol'));

  if (isPolish) {
    let pool = (providedTasks && providedTasks.length > 0) ? providedTasks : getLessonTaskPool(lessonId);
    if (!pool || pool.length === 0) {
      pool = getLessonTaskPool(lessonId);
    }

    // Losowanie zadań z puli (Task Pool Randomization)
    const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());
    let drawnTasks: any[] = [];

    if (pool && pool.length > 5) {
      const openTasks = pool.filter((t: any) => 
        t.type === 'OPEN_TASK' || t.type === 'OPEN_SHORT' || t.type === 'OPEN_PROOF' || t.type === 'SHORT_ANSWER' || t.type === 'OPEN_SYNTHESIS'
      );
      const singleTasks = pool.filter((t: any) => t.type === 'SINGLE_CHOICE' || t.type === 'SINGLE');
      const tfTasks = pool.filter((t: any) => t.type === 'TRUE_FALSE');

      const chosenOpen = shuffle(openTasks).slice(0, Math.min(2, openTasks.length));
      const chosenSingle = shuffle(singleTasks).slice(0, Math.min(2, singleTasks.length));
      const chosenTf = shuffle(tfTasks).slice(0, Math.min(1, tfTasks.length));

      drawnTasks = [...chosenSingle, ...chosenOpen, ...chosenTf];
      if (drawnTasks.length < 5) {
        const remaining = pool.filter((t: any) => !drawnTasks.some(d => d.id === t.id));
        drawnTasks.push(...shuffle(remaining).slice(0, 5 - drawnTasks.length));
      }
    } else if (pool && pool.length > 0) {
      drawnTasks = shuffle(pool);
    }

    const sessionTasks = drawnTasks.map((t: any) => {
      const norm = normalizeTask(t, { id: lessonId, title: t.title || 'Lekcja' }, { id: 'jezyk-polski', short_title: 'Język Polski' });
      return {
        ...norm,
        ...t,
        topic: 'Język Polski',
        instruction: t.instruction || (norm.instruction.includes('dowód') ? 'Sformułuj odpowiedź własnymi słowami na podstawie tekstu/lektury. Pamiętaj o uzasadnieniu.' : norm.instruction),
        cke_badge: t.cke_badge || t.badge,
        hint: t.hints?.level_1 || t.hint_1 || t.hint || norm.hint,
        hint_cost: t.hint_cost || 10,
        ai_hint_enabled: true,
        scoring_key: t.scoring_key || norm.scoring_key
      };
    });

    return {
      lessonId,
      sessionTasks,
      formulaSheet: formulaSheet || null,
      required_correct_tasks: 3,
      estimated_time_formatted: '~5 min'
    };
  }

  // Fallback to cached tasks in curriculumRepository
  const cachedTasks = curriculumRepository.getAllCachedTasks().filter((t: any) => {
    return t.lessonId === lessonId || t.lessonId === normId || t.id?.includes(lessonId);
  });

  return {
    lessonId,
    sessionTasks: cachedTasks,
    formulaSheet,
    required_correct_tasks: 3,
    estimated_time_formatted: '~5 min'
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
  boss_name: string;
  boss_message: string;
  timeLimitMinutes: number;
  passingScore: number;
  totalQuestions: number;
  rewardXp: number;
  rewardCoins: number;
  badgeId: string;
  tasks: BossExamTask[];
}

export const dzial1TasksPool: PoolTask[] = [];

/**
 * Generates Boss Exam for Dział 1 using available cached tasks.
 */
export function generateDzial1BossExam(tasks?: any[]): BossExamData {
  const pool = (tasks && tasks.length > 0) ? tasks : curriculumRepository.getAllCachedTasks();
  const chosenPool = pool.slice(0, Math.min(10, pool.length));

  const examTasks: BossExamTask[] = chosenPool.map((chosen, idx) => ({
    id: chosen.id || `boss-task-${idx + 1}`,
    lessonId: chosen.lessonId || '1.1',
    lessonOrder: idx + 1,
    lessonTitle: chosen.title || `Zadanie ${idx + 1}`,
    topicLabel: chosen.topic || 'Liczby Rzeczywiste',
    question: chosen.question || chosen.content || '',
    options: chosen.options || [],
    correct_answer: chosen.correct_answer || chosen.correctAnswer,
    correctAnswer: chosen.correctAnswer || chosen.correct_answer,
    input_placeholder: chosen.input_placeholder,
    statements: chosen.statements,
    part_1: chosen.part_1,
    part_2: chosen.part_2,
    explanation: chosen.explanation || '',
    hint_1: chosen.hints?.level_1 || chosen.hint_1 || '',
    hint_2: chosen.hints?.level_2 || chosen.hint_2 || '',
    source: chosen.source || `Zadanie Maturalne ${idx + 1}`,
    type: chosen.type || 'SINGLE_CHOICE',
    points: chosen.points || 1,
    ai_tutor_rubric: chosen.ai_tutor_rubric
  }));

  return {
    id: 'exam-dzial-1',
    title: 'Sprawdzian: Liczby Rzeczywiste',
    subtitle: 'Ostateczne starcie z działem 1. Rozwiąż zadania ze wszystkich lekcji.',
    boss_name: 'Królowa Liczb Rzeczywistych',
    boss_message: 'Egzaminator czeka! Przypomnij sobie wzory na logarytmy i potęgi.',
    timeLimitMinutes: 20,
    passingScore: 7,
    totalQuestions: examTasks.length || 7,
    rewardXp: 200,
    rewardCoins: 100,
    badgeId: 'master_dzial_1',
    tasks: examTasks
  };
}
