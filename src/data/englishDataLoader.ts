/**
 * Leniwe ładowanie danych języka angielskiego.
 * Baza 1500 zadań to ok. 2,9 MB JSON – nie może trafiać do startowej paczki aplikacji,
 * bo większość uczniów zaczyna od matematyki na telefonie. Moduł pobieramy dopiero,
 * gdy angielski jest faktycznie potrzebny, a potem trzymamy w pamięci.
 */
type EnglishCurriculumModule = typeof import('./englishCurriculumData');

let loadedModule: EnglishCurriculumModule | null = null;
let pending: Promise<EnglishCurriculumModule> | null = null;

export function loadEnglishCurriculum(): Promise<EnglishCurriculumModule> {
  if (loadedModule) return Promise.resolve(loadedModule);
  if (!pending) {
    pending = import('./englishCurriculumData').then(mod => {
      loadedModule = mod;
      return mod;
    }).catch(err => {
      pending = null;
      throw err;
    });
  }
  return pending;
}

/** Dostęp synchroniczny – null, dopóki moduł nie został pobrany. */
export function getEnglishCurriculumIfLoaded(): EnglishCurriculumModule | null {
  return loadedModule;
}
