/**
 * Leniwe ładowanie danych matematyki (kurikulum, 1500 zadań, arkusze CKE – ok. 2,9 MB).
 * Dzięki temu startowa paczka aplikacji zawiera tylko powłokę i Dashboard, a dane
 * dociągają się równolegle w tle (App woła loadMathCurriculum() zaraz po starcie).
 */
type MathCurriculumModule = typeof import('./mathCurriculumData');
type CkeExamTasksModule = typeof import('./math/ckeExamTasks');
type AllMathTasksModule = typeof import('./math/allMathTasks');

export type MathDataBundle = MathCurriculumModule & CkeExamTasksModule & Pick<AllMathTasksModule, 'ALL_MATH_TASKS'>;

let loadedBundle: MathDataBundle | null = null;
let pending: Promise<MathDataBundle> | null = null;

export function loadMathCurriculum(): Promise<MathDataBundle> {
  if (loadedBundle) return Promise.resolve(loadedBundle);
  if (!pending) {
    pending = Promise.all([
      import('./mathCurriculumData'),
      import('./math/ckeExamTasks'),
      import('./math/allMathTasks'),
    ]).then(([curriculum, ckeExams, allTasks]) => {
      loadedBundle = { ...curriculum, ...ckeExams, ALL_MATH_TASKS: allTasks.ALL_MATH_TASKS };
      return loadedBundle;
    }).catch(err => {
      pending = null;
      throw err;
    });
  }
  return pending;
}

type MathRozCurriculumModule = typeof import('./mathRozCurriculumData');

let loadedRoz: MathRozCurriculumModule | null = null;
let pendingRoz: Promise<MathRozCurriculumModule> | null = null;

/** Kurs rozszerzony to osobna paczka – pobierana dopiero po wejściu w Matematykę Rozszerzoną. */
export function loadMathRozCurriculum(): Promise<MathRozCurriculumModule> {
  if (loadedRoz) return Promise.resolve(loadedRoz);
  if (!pendingRoz) {
    pendingRoz = import('./mathRozCurriculumData').then(mod => {
      loadedRoz = mod;
      return mod;
    }).catch(err => {
      pendingRoz = null;
      throw err;
    });
  }
  return pendingRoz;
}

/** Dostęp synchroniczny – null, dopóki dane nie zostały pobrane. */
export function getMathCurriculumIfLoaded(): MathDataBundle | null {
  return loadedBundle;
}
