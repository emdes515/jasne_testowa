/**
 * polishCurriculumData.ts
 * 
 * 17 Oficjalnych Działów CKE Języka Polskiego dla silnika gry LearnView (Trophy Road)
 * z pełnymi pigułkami Core-4 (Bento), mapą węzłów lekcji i egzaminami walki z Bossem (Boss Exam).
 */

import { TopicDocument, LessonDocument, LessonMetadataItem } from '../schema_firestore';
import { LessonTheoryPill } from '../types';
import { ALL_POLISH_TASKS, getPolishTasksByEpoch, getPolishTasksByPart, getPolishBookSummary, getPolishBentoConceptsForLesson } from './polish';
import { POLISH_LESSONS } from './polish/polishLessonsData';
import { PolishLesson } from '../types/lessonTypes';

interface TopicBlueprint {
  id: string;
  numericId: number;
  title: string;
  short_title: string;
  description: string;
  icon: string;
  color: string;
  lessonIds: string[];
  epochFilter?: string;
  partFilter?: 1 | 2 | 3;
}

const TOPIC_BLUEPRINTS: TopicBlueprint[] = [
  // =========================================================================
  // FILAR I: JĘZYK POLSKI W UŻYCIU & WARSZTAT RETORYCZNY (DZIAŁY 1–7)
  // =========================================================================
  {
    id: 'pol-dzial-1',
    numericId: 1,
    title: 'Komunikacja językowa i akty mowy',
    short_title: 'Komunikacja i akty mowy',
    description: 'Funkcja impresywna, poznawcza, ekspresywna, fatyczna i poetycka w arkuszu CKE.',
    icon: 'MessageSquare',
    color: '#FFB800',
    lessonIds: ['lekcja-1'],
    partFilter: 1
  },
  {
    id: 'pol-dzial-2',
    numericId: 2,
    title: 'Retoryka, logika i sztuka argumentacji',
    short_title: 'Retoryka i argumentacja',
    description: 'Środki retoryczne, teza, hipoteza, argument rzeczowy, logiczny i emocjonalny.',
    icon: 'PenTool',
    color: '#FFB800',
    lessonIds: ['lekcja-2'],
    partFilter: 1
  },
  {
    id: 'pol-dzial-3',
    numericId: 3,
    title: 'Style funkcjonalne i rejestry polszczyzny',
    short_title: 'Style i rejestry',
    description: 'Styl potoczny, naukowy, publicystyczny, urzędowy i artystyczny. Rozpoznawanie w tekstach nieliterackich.',
    icon: 'Feather',
    color: '#FFB800',
    lessonIds: ['lekcja-3'],
    partFilter: 1
  },
  {
    id: 'pol-dzial-4',
    numericId: 4,
    title: 'Środki językowe, składnia i mechanizmy perswazji',
    short_title: 'Środki i perswazja',
    description: 'Słownictwo wartościujące, manipulacja językowa, zabiegi składniowe i pytania retoryczne.',
    icon: 'Flame',
    color: '#FFB800',
    lessonIds: ['lekcja-2'],
    partFilter: 1
  },
  {
    id: 'pol-dzial-5',
    numericId: 5,
    title: 'Frazeologia, semantyka i kultura języka',
    short_title: 'Frazeologia i semantyka',
    description: 'Związki frazeologiczne, innowacje, błędy słownikowe i precyzja wypowiedzi.',
    icon: 'Bookmark',
    color: '#FFB800',
    lessonIds: ['lekcja-1'],
    partFilter: 1
  },
  {
    id: 'pol-dzial-6',
    numericId: 6,
    title: 'Spójność, kohezja i krytyczna analiza tekstu',
    short_title: 'Spójność i analiza tekstu',
    description: 'Wskaźniki zespolenia, podział akapitowy, streszczenie logiczne i analiza Prawda/Fałsz.',
    icon: 'Scale',
    color: '#FFB800',
    lessonIds: ['lekcja-3'],
    partFilter: 1
  },
  {
    id: 'pol-dzial-7',
    numericId: 7,
    title: 'Notatka syntetyzująca – Warsztat mistrzowski',
    short_title: 'Notatka syntetyzująca',
    description: 'Synteza dwóch tekstów (60–90 słów), żelazne kryteria CKE (0–3 pkt) bez uogólnień.',
    icon: 'Award',
    color: '#FFB800',
    lessonIds: ['lekcja-4', 'lekcja-5'],
    partFilter: 1
  },

  // =========================================================================
  // FILAR II: TEST HISTORYCZNOLITERACKI & EPOKI CKE (DZIAŁY 8–27)
  // =========================================================================
  {
    id: 'pol-dzial-8',
    numericId: 8,
    title: 'Antyk – Mitologia grecka i teatr',
    short_title: 'Antyk i tragedia grecka',
    description: 'Mitologia grecka, Iliada Homera, Antygona Sofoklesa, konflikt tragiczny, hybris i katharsis.',
    icon: 'Sun',
    color: '#FFB800',
    lessonIds: ['lekcja-6'],
    epochFilter: 'Starożytność i Biblia',
    partFilter: 2
  },
  {
    id: 'pol-dzial-9',
    numericId: 9,
    title: 'Biblia – Sacrum, toposy i przypowieści',
    short_title: 'Biblia i toposy uniwersalne',
    description: 'Księga Rodzaju, Hiob (teodycea), Kohelet (vanitas), Apokalipsa św. Jana i motywy biblijne.',
    icon: 'BookOpen',
    color: '#FFB800',
    lessonIds: ['lekcja-6'],
    epochFilter: 'Starożytność i Biblia',
    partFilter: 2
  },
  {
    id: 'pol-dzial-10',
    numericId: 10,
    title: 'Średniowiecze – Teocentryzm, asceza i śmierć',
    short_title: 'Średniowiecze i Deesis',
    description: 'Bogurodzica (motyw Deesis), Lament świętokrzyski, Legenda o św. Aleksym i danse macabre.',
    icon: 'Shield',
    color: '#FFB800',
    lessonIds: ['lekcja-7'],
    epochFilter: 'Średniowiecze',
    partFilter: 2
  },
  {
    id: 'pol-dzial-11',
    numericId: 11,
    title: 'Renesans – Humanizm Jana Kochanowskiego',
    short_title: 'Renesans – Jan Kochanowski',
    description: 'Pieśni, Fraszki, Treny (kryzys stoicyzmu i żałoba ojca), Odprawa posłów greckich.',
    icon: 'PenTool',
    color: '#FFB800',
    lessonIds: ['lekcja-8'],
    epochFilter: 'Renesans',
    partFilter: 2
  },
  {
    id: 'pol-dzial-12',
    numericId: 12,
    title: 'Renesans dramatyczny – Makbet Williama Szekspira',
    short_title: 'Szekspir – Makbet',
    description: 'Mechanizm zbrodni, somnambulizm Lady Makbet, degradacja tyrana i fatum a wolna wola.',
    icon: 'Flame',
    color: '#FFB800',
    lessonIds: ['lekcja-8'],
    epochFilter: 'Renesans',
    partFilter: 2
  },
  {
    id: 'pol-dzial-13',
    numericId: 13,
    title: 'Barok – Poezja metafizyczna i konceptyzm',
    short_title: 'Barok – Poezja metafizyczna',
    description: 'Jan Andrzej Morsztyn (koncept w Do trupa), Daniel Naborowski (Krótkość żywota, topos vanitas).',
    icon: 'Moon',
    color: '#FFB800',
    lessonIds: ['lekcja-9'],
    epochFilter: 'Barok',
    partFilter: 2
  },
  {
    id: 'pol-dzial-14',
    numericId: 14,
    title: 'Barok sarmacki – Etos szlachecki i pamiętnikarstwo',
    short_title: 'Barok sarmacki i wojny',
    description: 'Jan Chryzostom Pasek (Pamiętniki), Wacław Potocki (Wojna chocimska), sarmatyzm i megalomania.',
    icon: 'Shield',
    color: '#FFB800',
    lessonIds: ['lekcja-9'],
    epochFilter: 'Barok',
    partFilter: 2
  },
  {
    id: 'pol-dzial-15',
    numericId: 15,
    title: 'Oświecenie – Satyra, bajka i dydaktyzm',
    short_title: 'Oświecenie – Ignacy Krasicki',
    description: 'Ignacy Krasicki: Bajki, Satyry (Do króla, Pijaństwo), Hymn do miłości ojczyzny.',
    icon: 'Feather',
    color: '#FFB800',
    lessonIds: ['lekcja-9'],
    epochFilter: 'Oświecenie',
    partFilter: 2
  },
  {
    id: 'pol-dzial-16',
    numericId: 16,
    title: 'Romantyzm I – Ballady, mistycyzm i bunt',
    short_title: 'Romantyzm – Ballady i manifest',
    description: 'Adam Mickiewicz: Romantyczność, Ballady i romanse, Oda do młodości, liryka lozańska.',
    icon: 'Flame',
    color: '#FFB800',
    lessonIds: ['lekcja-10'],
    epochFilter: 'Romantyzm',
    partFilter: 2
  },
  {
    id: 'pol-dzial-17',
    numericId: 17,
    title: 'Romantyzm II – Dziady cz. III: Konrad i Wielka Improwizacja',
    short_title: 'Dziady cz. III – Konrad',
    description: 'Prometeizm, żądanie rządu dusz, pycha (hybris) i ochrona przed błędem kardynalnym.',
    icon: 'Zap',
    color: '#FFB800',
    lessonIds: ['lekcja-10'],
    epochFilter: 'Romantyzm',
    partFilter: 2
  },
  {
    id: 'pol-dzial-18',
    numericId: 18,
    title: 'Romantyzm III – Dziady cz. III: Mesjanizm i Martyrologia',
    short_title: 'Dziady cz. III – Mesjanizm',
    description: 'Widzenie Księdza Piotra (Polska Chrystusem Narodów), Salon Warszawski i Sen Senatora.',
    icon: 'Target',
    color: '#FFB800',
    lessonIds: ['lekcja-11', 'lekcja-12'],
    epochFilter: 'Romantyzm',
    partFilter: 2
  },
  {
    id: 'pol-dzial-19',
    numericId: 19,
    title: 'Romantyzm IV – Kordian Słowackiego: Winkelriedyzm',
    short_title: 'Słowacki – Kordian',
    description: 'Monolog na Mont Blanc (Polska Winkelriedem narodów), Strach i Imaginacja, spisek koronacyjny.',
    icon: 'Compass',
    color: '#FFB800',
    lessonIds: ['lekcja-13'],
    epochFilter: 'Romantyzm',
    partFilter: 2
  },
  {
    id: 'pol-dzial-20',
    numericId: 20,
    title: 'Romantyzm V – Pan Tadeusz: Epopeja narodowa i Jacek Soplica',
    short_title: 'Mickiewicz – Pan Tadeusz',
    description: 'Arkadia szlachecka, ewolucja Jacka Soplicy (Ksiądz Robak) i odkupienie win patriotyczną służbą.',
    icon: 'BookOpen',
    color: '#FFB800',
    lessonIds: ['lekcja-13'],
    epochFilter: 'Romantyzm',
    partFilter: 2
  },
  {
    id: 'pol-dzial-21',
    numericId: 21,
    title: 'Pozytywizm I – Lalka: Stanisław Wokulski i dualizm epok',
    short_title: 'Lalka – Stanisław Wokulski',
    description: 'Wokulski między romantyzmem a pozytywizmem, idealizm miłosny do Łęckiej i próba samobójcza.',
    icon: 'Scale',
    color: '#FFB800',
    lessonIds: ['lekcja-14'],
    epochFilter: 'Pozytywizm',
    partFilter: 2
  },
  {
    id: 'pol-dzial-22',
    numericId: 22,
    title: 'Pozytywizm II – Lalka: Ignacy Rzecki i topos theatrum mundi',
    short_title: 'Lalka – Ignacy Rzecki',
    description: 'Pamiętnik starego subiekta, bonapartyzm, zabawa lalkami (theatrum mundi) i pamięć Wiosny Ludów.',
    icon: 'Clock',
    color: '#FFB800',
    lessonIds: ['lekcja-15'],
    epochFilter: 'Pozytywizm',
    partFilter: 2
  },
  {
    id: 'pol-dzial-23',
    numericId: 23,
    title: 'Pozytywizm III – Panorama społeczna, Powiśle i nowelistyka',
    short_title: 'Pozytywizm – Społeczeństwo',
    description: 'Pasożytnictwo arystokracji, nędza Powiśla, Gloria victis Elizy Orzeszkowej i Potop Henryka Sienkiewicza.',
    icon: 'Layers',
    color: '#FFB800',
    lessonIds: ['lekcja-16'],
    epochFilter: 'Pozytywizm',
    partFilter: 2
  },
  {
    id: 'pol-dzial-24',
    numericId: 24,
    title: 'Młoda Polska I – Nastroje fin de siècle, dekadentyzm i liryka',
    short_title: 'Młoda Polska – Dekadentyzm',
    description: 'Kazimierz Przerwa-Tetmajer (Koniec wieku XIX), Jan Kasprowicz (Dies irae), Leopold Staff (Kowal).',
    icon: 'Moon',
    color: '#FFB800',
    lessonIds: ['lekcja-17'],
    epochFilter: 'Młoda Polska',
    partFilter: 2
  },
  {
    id: 'pol-dzial-25',
    numericId: 25,
    title: 'Młoda Polska II – Wesele Stanisława Wyspiańskiego',
    short_title: 'Wyspiański – Wesele',
    description: 'Zjawy bronowickie (Stańczyk, Rycerz, Upiór), Złoty Róg, czapka z pawich piór i chocholi taniec.',
    icon: 'Award',
    color: '#FFB800',
    lessonIds: ['lekcja-17', 'lekcja-18'],
    epochFilter: 'Młoda Polska',
    partFilter: 2
  },
  {
    id: 'pol-dzial-26',
    numericId: 26,
    title: 'Dwudziestolecie międzywojenne – Przedwiośnie i Ferdydurke',
    short_title: 'Dwudziestolecie międzywojenne',
    description: 'Przedwiośnie Żeromskiego (szklane domy, Cezary Baryka), Ferdydurke Gombrowicza (forma, gęba, upupienie).',
    icon: 'Compass',
    color: '#FFB800',
    lessonIds: ['lekcja-19'],
    epochFilter: 'Dwudziestolecie międzywojenne',
    partFilter: 2
  },
  {
    id: 'pol-dzial-27',
    numericId: 27,
    title: 'Wojna, okupacja i literatura współczesna',
    short_title: 'Wojna i literatura współczesna',
    description: 'Borowski (człowiek zlagrowany), Grudziński (Inny świat), Krall, Camus (Dżuma), Mrożek (Tango), Szymborska, Herbert.',
    icon: 'AlertTriangle',
    color: '#FFB800',
    lessonIds: ['lekcja-20', 'lekcja-21'],
    epochFilter: 'Wojna i okupacja',
    partFilter: 2
  },

  // =========================================================================
  // FILAR III: WYPRACOWANIE MATURALNE CKE (DZIAŁ 28)
  // =========================================================================
  {
    id: 'pol-dzial-28',
    numericId: 28,
    title: 'Wypracowanie maturalne CKE – Teza, kompozycja i eliminacja błędu kardynalnego',
    short_title: 'Wypracowanie maturalne CKE',
    description: 'Formułowanie tezy, hierarchia argumentów, konteksty funkcjonalne i bezwzględna ochrona przed 0/35 pkt.',
    icon: 'GraduationCap',
    color: '#FFB800',
    lessonIds: ['lekcja-22', 'lekcja-23', 'lekcja-24'],
    partFilter: 3
  }
];

function transformPolishLessonToTheoryPill(lesson: PolishLesson): LessonTheoryPill {
  const intro = lesson.introduction;
  const keyPoints = intro?.theoryPoints?.map(tp => `${tp.title}: ${tp.content}`) || [];
  const trap = intro?.ckeExaminerTips?.join(' • ') || 'Zawsze trzymaj się dosłownego sensu tekstu lub kanonicznych faktów lektury.';
  const essence = intro?.lead || lesson.subtitle || lesson.title;

  const bookSummary = getPolishBookSummary(lesson.lektura || lesson.title || lesson.subtitle);
  const cardinalTrap = intro?.cardinalWarning || intro?.ckeExaminerTips?.find(t => /kardynaln/i.test(t));

  const bentoConcepts = (lesson.concepts && lesson.concepts.length > 0)
    ? lesson.concepts
    : getPolishBentoConceptsForLesson(lesson.id);

  return {
    lessonId: lesson.id,
    title: lesson.title,
    concept_essence: essence,
    matura_context: `CKE Formuła 2023 • Moduł: ${lesson.module}${lesson.epoch ? ` • Epoka: ${lesson.epoch}` : ''}. Czas sesji: ok. 4–6 min.`,
    key_points: keyPoints,
    keyPoints: keyPoints,
    bentoConcepts,
    exam_trap: trap,
    trapAlert: trap,
    keyTakeaway: lesson.summary?.keyTakeaways?.join(' • ') || 'Precyzja sformułowań i wierność kryteriom CKE to klucz do 100% punktów.',
    summary: lesson.summary?.keyTakeaways?.join(' ') || essence,
    book_summary: bookSummary,
    streszczenie: bookSummary?.plot_overview,
    worked_example: intro?.gatekeeper ? {
      problem: intro.gatekeeper.question,
      solution: intro.gatekeeper.explanation,
      keyInsight: intro.gatekeeper.hint || 'Klucz CKE opiera się na żelaznej dosłowności.'
    } : undefined,
    polishTheory: {
      lessonNumber: lesson.number,
      module: lesson.module,
      epoch: lesson.epoch,
      lektura: lesson.lektura,
      subtitle: lesson.subtitle,
      lead: intro?.lead || lesson.subtitle,
      objectives: intro?.objectives || [],
      theoryPoints: intro?.theoryPoints || [],
      bentoConcepts,
      ckeExaminerTips: intro?.ckeExaminerTips || [],
      cardinalWarning: cardinalTrap,
      gatekeeper: intro?.gatekeeper,
      goldenRules: lesson.summary?.keyTakeaways || [],
      reflection: lesson.summary?.reflection
    }
  };
}

/**
 * Zbudowane działy Języka Polskiego dla LearnView (Trophy Road)
 */
export const POLISH_CURRICULUM_TOPICS: TopicDocument[] = TOPIC_BLUEPRINTS.map(bp => {
  const matchingLessons = POLISH_LESSONS.filter(l =>
    bp.lessonIds.includes(l.id) ||
    bp.lessonIds.some(id => {
      const num = parseInt(id.replace('lekcja-', ''), 10);
      return !isNaN(num) && l.number === num;
    })
  );

  // Zadania dla działu (pula zadań)
  let topicTasks = ALL_POLISH_TASKS.filter(t => {
    if (bp.partFilter && t.part !== bp.partFilter) return false;
    if (bp.epochFilter && t.epoch !== bp.epochFilter) return false;
    return true;
  });

  if (topicTasks.length === 0) {
    topicTasks = ALL_POLISH_TASKS.slice(0, 15);
  }

  const lessonsMetadata: LessonMetadataItem[] = matchingLessons.map((l, idx) => ({
    id: l.id,
    order: idx + 1,
    title: l.title,
    short_title: l.title.length > 28 ? l.title.substring(0, 26) + '...' : l.title,
    badge: `Lekcja ${l.number}`,
    tasks_count: Math.min(7, Math.max(3, (l.taskIds || []).length || 5)),
    estimated_time_formatted: '~5 min',
    points_to_unlock: idx === 0 ? 0 : 15,
    required_correct_tasks: 3
  }));

  return {
    id: bp.id,
    numericId: bp.numericId,
    subject_id: 'jezyk-polski',
    title: bp.title,
    name: bp.title,
    short_title: bp.short_title,
    description: bp.description,
    icon: bp.icon,
    color: bp.color,
    lessons_count: lessonsMetadata.length,
    tasks_count: topicTasks.length,
    lessons_metadata: lessonsMetadata,
    matura_points_range: bp.numericId <= 7 ? '10–15 pkt' : bp.numericId <= 27 ? '15–20 pkt' : '35 pkt',
    importance: bp.numericId <= 7 ? 'Kluczowe' : bp.numericId <= 27 ? 'Bardzo wysokie' : 'Fundamentalne',
    pillar_id: bp.numericId <= 7 ? 'pillar-1-jezyk-w-uzyciu' : bp.numericId <= 27 ? 'pillar-2-lektury' : 'pillar-3-wypracowanie',
    pillar_name: bp.numericId <= 7 ? 'Język w użyciu' : bp.numericId <= 27 ? 'Lektury i epoki' : 'Wypracowanie'
  };
});

/**
 * Normalizacja zadania z języka polskiego dla silnika gier SessionRunner
 */
export function normalizePolishTaskForRunner(task: any, lessonId: string, topicId: string): any {
  if (!task) return null;

  const rawTaskType = String(task.taskType || task.type || 'single_choice').toLowerCase();
  let type = 'SINGLE_CHOICE';
  let options = task.options || [];
  let statements = task.statements || [];
  let correctAnswer = task.correctAnswer || task.correct_answer;

  if (rawTaskType === 'single_choice') {
    type = 'SINGLE_CHOICE';
    if (Array.isArray(task.options)) {
      options = task.options.map((opt: any, idx: number) => {
        if (typeof opt === 'string') {
          const match = opt.match(/^([A-D1-4])[\.\)]\s*(.*)$/);
          const letter = match ? match[1].toUpperCase() : (['A', 'B', 'C', 'D'][idx] || String(idx + 1));
          const text = match ? match[2].trim() : opt;
          return { id: letter, text };
        }
        return opt;
      });
    }
    if (typeof task.correctOptionIndex === 'number') {
      correctAnswer = ['A', 'B', 'C', 'D'][task.correctOptionIndex] || 'A';
    } else if (!correctAnswer && options.length > 0) {
      correctAnswer = options[0].id || 'A';
    }
  } else if (rawTaskType === 'true_false') {
    type = 'TRUE_FALSE';
    if (Array.isArray(task.trueFalseStatements)) {
      statements = task.trueFalseStatements.map((s: any, idx: number) => ({
        id: String(idx + 1),
        text: s.statement || s.text || '',
        correct: (s.isTrue === true || s.correct === 'P' || s.correct === true) ? 'P' : 'F',
        explanation: s.explanation || ''
      }));
    }
  } else {
    type = 'OPEN_TASK';
  }

  return {
    ...task,
    id: task.id || `pol-task-${lessonId}-${Math.random().toString(36).substring(7)}`,
    lessonId,
    topicId,
    type,
    question: task.question || task.title || '',
    options,
    statements,
    correct_answer: correctAnswer,
    correctAnswer: correctAnswer,
    officialKey: task.correctAnswerText || (Array.isArray(task.ckeKeyCriteria) ? task.ckeKeyCriteria.join('\n') : task.officialKey || ''),
    explanation: task.explanation || '',
    hints: {
      level_1: task.hintCke || task.hints?.level_1 || 'Zwróć uwagę na kluczowe pojęcia i kontekst wypowiedzi.',
      level_2: task.hints?.level_2 || (task.explanation ? `Wskazówka: ${task.explanation.slice(0, 150)}...` : 'Uważnie przeczytaj polecenie.')
    },
    hint_1: task.hintCke || task.hint_1 || 'Zwróć uwagę na kluczowe pojęcia i kontekst wypowiedzi.',
    hint_2: task.hint_2 || 'Przeanalizuj treść i intencję nadawcy.',
    points: task.points || 1,
    source: task.sourceYear || task.source || 'CKE Język Polski',
    passage: task.passage,
    passage2: task.passage2
  };
}

/**
 * Cache pełnych dokumentów lekcji dla Języka Polskiego
 */
export const POLISH_LESSON_DOCUMENTS: Map<string, LessonDocument> = new Map();

TOPIC_BLUEPRINTS.forEach(bp => {
  const matchingLessons = POLISH_LESSONS.filter(l =>
    bp.lessonIds.includes(l.id) ||
    bp.lessonIds.some(id => {
      const num = parseInt(id.replace('lekcja-', ''), 10);
      return !isNaN(num) && l.number === num;
    })
  );
  
  matchingLessons.forEach((l, idx) => {
    // Przypisanie zadań: najpierw zadania z taskIds z lekcji, a reszta dobrana z puli działu
    const explicitTasks = (l.taskIds || [])
      .map(id => ALL_POLISH_TASKS.find(t => t.id === id))
      .filter(Boolean);

    let candidatePool = ALL_POLISH_TASKS.filter(t => {
      if (bp.partFilter && t.part !== bp.partFilter) return false;
      if (bp.epochFilter && t.epoch !== bp.epochFilter) return false;
      return true;
    });

    if (candidatePool.length === 0) {
      candidatePool = ALL_POLISH_TASKS;
    }

    // Wybierz maksymalnie 7 zróżnicowanych zadań (zgodnie z wymogiem: w każdej lekcji polskiego maks po 7 zadań)
    const rawTasksForLesson = Array.from(new Set([...explicitTasks, ...candidatePool])).slice(0, 7);
    const tasksForLesson = rawTasksForLesson.map(t => normalizePolishTaskForRunner(t, l.id, bp.id));

    const lessonDoc: LessonDocument = {
      id: l.id,
      topic_id: bp.id,
      title: l.title,
      theory_pill: transformPolishLessonToTheoryPill(l),
      tasks: tasksForLesson,
      required_correct_tasks: Math.min(3, tasksForLesson.length),
      estimated_time_formatted: '~5 min'
    };

    POLISH_LESSON_DOCUMENTS.set(l.id, lessonDoc);
    POLISH_LESSON_DOCUMENTS.set(`${bp.id}/${l.id}`, lessonDoc);
    POLISH_LESSON_DOCUMENTS.set(`jezyk-polski/${bp.id}/${l.id}`, lessonDoc);
  });
});

/**
 * Pobiera dokument lekcji języka polskiego
 */
export function getPolishLessonDocument(topicId?: string, lessonId?: string): LessonDocument | null {
  if (!lessonId) return null;
  return POLISH_LESSON_DOCUMENTS.get(lessonId) ||
         (topicId ? POLISH_LESSON_DOCUMENTS.get(`${topicId}/${lessonId}`) : null) ||
         (topicId ? POLISH_LESSON_DOCUMENTS.get(`jezyk-polski/${topicId}/${lessonId}`) : null) ||
         null;
}

/**
 * Generuje Boss Exam dla wybranego działu Języka Polskiego
 */
export function loadPolishTopicBossExam(topicId: string, topicTitle?: string): any {
  const bp = TOPIC_BLUEPRINTS.find(b => b.id === topicId || b.numericId === parseInt(topicId.replace(/\D/g, '') || '1', 10)) || TOPIC_BLUEPRINTS[0];

  let candidateTasks = ALL_POLISH_TASKS.filter(t => {
    if (bp.partFilter && t.part !== bp.partFilter) return false;
    if (bp.epochFilter && t.epoch !== bp.epochFilter) return false;
    return true;
  });

  if (candidateTasks.length < 5) {
    candidateTasks = ALL_POLISH_TASKS.slice(0, 10);
  }

  // Wymieszaj i weź 5 zadań, znormalizuj dla BossExamRunner
  const chosen = [...candidateTasks].sort(() => 0.5 - Math.random()).slice(0, 5);
  const examTasks = chosen.map((t, idx) => {
    const norm = normalizePolishTaskForRunner(t, `${bp.id}-boss`, bp.id);
    return {
      id: norm.id || `boss-pol-${bp.id}-${idx + 1}`,
      lessonId: `${bp.id}.${idx + 1}`,
      lessonOrder: idx + 1,
      lessonTitle: norm.title || `Zadanie ${idx + 1}`,
      topicLabel: `${bp.short_title} • Zadanie ${idx + 1}`,
      question: norm.question || norm.title || '',
      options: norm.options || [],
      correct_answer: norm.correct_answer || norm.correctAnswer,
      correctAnswer: norm.correctAnswer || norm.correct_answer,
      statements: norm.statements,
      explanation: norm.explanation || '',
      hint_1: norm.hints?.level_1 || norm.hint_1 || '',
      hint_2: norm.hints?.level_2 || norm.hint_2 || '',
      source: norm.source || 'CKE Język Polski',
      type: norm.type || 'SINGLE_CHOICE',
      points: norm.points || 1,
      passage: norm.passage,
      passage2: norm.passage2
    };
  });

  const totalQuestions = examTasks.length || 5;
  const passingScore = Math.max(1, Math.ceil(totalQuestions * 0.7));

  return {
    id: `BOSS-EXAM-${String(bp.id).toUpperCase()}`,
    title: `Sprawdzian: ${bp.short_title}`,
    subtitle: `Ostateczne starcie z materiałem: ${bp.title}. Rozwiąż ${totalQuestions} zadań z tego działu.`,
    boss_name: `Egzaminator CKE: ${bp.short_title}`,
    boss_message: `Egzaminator czeka! Wykaż się wiedzą z działu: ${bp.short_title}. Zdobądź minimum 70%!`,
    timeLimitMinutes: 15,
    passingScore,
    totalQuestions,
    rewardXp: 200,
    rewardCoins: 100,
    badgeId: `master_${String(bp.id).toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    tasks: examTasks
  };
}
