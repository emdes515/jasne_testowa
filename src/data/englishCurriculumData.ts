/**
 * englishCurriculumData.ts
 *
 * 15 Oficjalnych Działów CKE Języka Angielskiego (Formuła 2023)
 * podzielonych na 4 Filary Kompetencyjne CKE:
 * - Filar I: Znajomość środków językowych (13 pkt)
 * - Filar II: Rozumienie ze słuchu (15 pkt)
 * - Filar III: Rozumienie tekstów pisanych (20 pkt)
 * - Filar IV: Wypowiedź pisemna (12 pkt)
 */

import { TopicDocument, LessonDocument, LessonMetadataItem, SubjectPillarItem } from '../schema_firestore';
import { ALL_ENGLISH_TASKS } from './english/allEnglishTasks';
import { ENGLISH_LESSONS, getEnglishLessonById } from './english/englishLessonsData';

export const ENGLISH_PILLARS: SubjectPillarItem[] = [
  {
    id: 'pillar-use-of-english',
    name: 'Filar I: Znajomość środków językowych',
    short_name: 'Środki Językowe',
    description: 'Gramatyka, parafrazy, luki w tekście, słowotwórstwo i minidialogi (Zadania 8–11).',
    icon: 'Sparkles',
    color: '#10B981',
    topics_count: 5,
    pointsGoal: 13
  },
  {
    id: 'pillar-listening',
    name: 'Filar II: Rozumienie ze słuchu',
    short_name: 'Rozumienie ze Słuchu',
    description: 'Wychwytywanie intencji mówcy, eliminacja dystraktorów i zadania na uzupełnianie informacji (Zadania 1–3).',
    icon: 'Headphones',
    color: '#3B82F6',
    topics_count: 3,
    pointsGoal: 15
  },
  {
    id: 'pillar-reading',
    name: 'Filar III: Rozumienie tekstów pisanych',
    short_name: 'Czytanie Tekstów',
    description: 'Dobieranie nagłówków, luki spójnościowe, teksty wieloźródłowe i Prawda/Fałsz (Zadania 4–7).',
    icon: 'BookOpen',
    color: '#F59E0B',
    topics_count: 3,
    pointsGoal: 20
  },
  {
    id: 'pillar-writing',
    name: 'Filar IV: Wypowiedź pisemna (E-mail & Blog)',
    short_name: 'Warsztat Pisania',
    description: 'Warsztat 4 kropek CKE, łączniki zdań, bank złotych zwrotów i ewaluacja AI (Zadanie 12).',
    icon: 'PenTool',
    color: '#8B5CF6',
    topics_count: 4,
    pointsGoal: 12
  }
];

interface TopicBlueprint {
  id: string;
  numericId: number;
  title: string;
  short_title: string;
  description: string;
  icon: string;
  color: string;
  pillarId: 'pillar-use-of-english' | 'pillar-listening' | 'pillar-reading' | 'pillar-writing';
  pillarName: string;
  pointsRange: string;
  importance: 'CRITICAL_PEWNIAK' | 'HIGH' | 'MEDIUM';
  lessonIds: string[];
}

const TOPIC_BLUEPRINTS: TopicBlueprint[] = [
  // FILAR I: ŚRODKI JĘZYKOWE (DZIAŁY 1–5)
  {
    id: 'eng-dzial-1',
    numericId: 1,
    title: 'Czasy gramatyczne i aspekty w kontekście maturalnym',
    short_title: 'Czasy i Aspekty',
    description: '7 modułów: Present Simple/Continuous, Past Simple/Continuous, Present Perfect, Past Perfect, Czasy Przyszłe i Miks Maturalny.',
    icon: 'Clock',
    color: '#10B981',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    pointsRange: '4–6 pkt',
    importance: 'CRITICAL_PEWNIAK',
    lessonIds: [
      'eng-lesson-1-1',
      'eng-lesson-1-2',
      'eng-lesson-1-3',
      'eng-lesson-1-4',
      'eng-lesson-1-5',
      'eng-lesson-1-6',
      'eng-lesson-1-7'
    ]
  },
  {
    id: 'eng-dzial-2',
    numericId: 2,
    title: 'Konstrukcje czasownikowe: Gerund, Infinitive i Modals',
    short_title: 'Bezokolicznik i Gerundium',
    description: 'Czasowniki łączące się z to + bezokolicznik vs formy z -ing oraz modalne (must, can, should, might).',
    icon: 'Zap',
    color: '#10B981',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    pointsRange: '2–4 pkt',
    importance: 'HIGH',
    lessonIds: ['eng-lesson-2-1', 'eng-lesson-2-2', 'eng-lesson-2-3']
  },
  {
    id: 'eng-dzial-3',
    numericId: 3,
    title: 'Okresy warunkowe (Conditionals 0, 1, 2) i zdania czasowe',
    short_title: 'Okresy Warunkowe',
    description: 'Zasada if/unless, First Conditional (realna przyszłość) oraz Second Conditional (gdybanie).',
    icon: 'GitFork',
    color: '#10B981',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    pointsRange: '3–5 pkt',
    importance: 'CRITICAL_PEWNIAK',
    lessonIds: ['eng-lesson-3-1', 'eng-lesson-3-2', 'eng-lesson-3-3']
  },
  {
    id: 'eng-dzial-4',
    numericId: 4,
    title: 'Słowotwórstwo i False Friends – Części mowy w zadaniach CKE',
    short_title: 'Słowotwórstwo',
    description: 'Przedrostki zaprzeczające (un-, in-, im-, dis-), sufiksy rzeczownikowe i przymiotnikowe oraz pułapki leksykalne.',
    icon: 'Shuffle',
    color: '#10B981',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    pointsRange: '3–4 pkt',
    importance: 'HIGH',
    lessonIds: ['eng-lesson-4-1', 'eng-lesson-4-2', 'eng-lesson-4-3']
  },
  {
    id: 'eng-dzial-5',
    numericId: 5,
    title: 'Parafrazy ze słowem kluczem i tłumaczenie fragmentów zdań',
    short_title: 'Parafrazy i Tłumaczenia',
    description: 'Mowa zależna (Reported Speech), strona bierna (Passive Voice), too/enough i konstrukcje kluczowe.',
    icon: 'Repeat',
    color: '#10B981',
    pillarId: 'pillar-use-of-english',
    pillarName: 'Znajomość środków językowych',
    pointsRange: '3–4 pkt',
    importance: 'CRITICAL_PEWNIAK',
    lessonIds: ['eng-lesson-5-1', 'eng-lesson-5-2', 'eng-lesson-5-3']
  },

  // FILAR II: ROZUMIENIE ZE SŁUCHU (DZIAŁY 6–8)
  {
    id: 'eng-dzial-6',
    numericId: 6,
    title: 'Wybór wielokrotny ze słuchu – Wywiady, komunikaty i dystraktory',
    short_title: 'Słuchanie: Wybór ABCD',
    description: 'Rozpoznawanie intencji mówcy, kontekstu sytuacyjnego i eliminacja słów-przynęt CKE.',
    icon: 'Headphones',
    color: '#3B82F6',
    pillarId: 'pillar-listening',
    pillarName: 'Rozumienie ze słuchu',
    pointsRange: '5–6 pkt',
    importance: 'CRITICAL_PEWNIAK',
    lessonIds: ['eng-lesson-6-1', 'eng-lesson-6-2', 'eng-lesson-6-3']
  },
  {
    id: 'eng-dzial-7',
    numericId: 7,
    title: 'Dobieranie wypowiedzi do osób i sytuacji (Zadanie 2 CKE)',
    short_title: 'Słuchanie: Dobieranie',
    description: 'Identyfikacja głównej myśli 4 różnych mówców, wychwytywanie synonimów i emocji.',
    icon: 'Users',
    color: '#3B82F6',
    pillarId: 'pillar-listening',
    pillarName: 'Rozumienie ze słuchu',
    pointsRange: '4–5 pkt',
    importance: 'HIGH',
    lessonIds: ['eng-lesson-7-1', 'eng-lesson-7-2', 'eng-lesson-7-3']
  },
  {
    id: 'eng-dzial-8',
    numericId: 8,
    title: 'Uzupełnianie luk i notatek ze słuchu (Zadanie otwarte)',
    short_title: 'Słuchanie: Luki Informacyjne',
    description: 'Wpisywanie brakujących informacji, liczb, dat i precyzyjnych terminów z nagrania.',
    icon: 'FileEdit',
    color: '#3B82F6',
    pillarId: 'pillar-listening',
    pillarName: 'Rozumienie ze słuchu',
    pointsRange: '3–4 pkt',
    importance: 'MEDIUM',
    lessonIds: ['eng-lesson-8-1', 'eng-lesson-8-2', 'eng-lesson-8-3']
  },

  // FILAR III: ROZUMIENIE TEKSTÓW PISANYCH (DZIAŁY 9–11)
  {
    id: 'eng-dzial-9',
    numericId: 9,
    title: 'Dobieranie nagłówków i zdań do luk w tekście',
    short_title: 'Czytanie: Nagłówki i Luki',
    description: 'Struktura akapitu, wskaźniki zespolenia (cohesion), zaimki anaforyczne i spójniki logiczne.',
    icon: 'Layout',
    color: '#F59E0B',
    pillarId: 'pillar-reading',
    pillarName: 'Rozumienie tekstów pisanych',
    pointsRange: '6–8 pkt',
    importance: 'CRITICAL_PEWNIAK',
    lessonIds: ['eng-lesson-9-1', 'eng-lesson-9-2', 'eng-lesson-9-3']
  },
  {
    id: 'eng-dzial-10',
    numericId: 10,
    title: 'Analiza szczegółowa tekstu i zadania Prawda / Fałsz',
    short_title: 'Czytanie: Prawda czy Fałsz',
    description: 'Weryfikacja faktów, wyłapywanie modalności i pułapki kwantyfikatorów (always, sometimes, all).',
    icon: 'CheckSquare',
    color: '#F59E0B',
    pillarId: 'pillar-reading',
    pillarName: 'Rozumienie tekstów pisanych',
    pointsRange: '5–6 pkt',
    importance: 'HIGH',
    lessonIds: ['eng-lesson-10-1', 'eng-lesson-10-2', 'eng-lesson-10-3']
  },
  {
    id: 'eng-dzial-11',
    numericId: 11,
    title: 'Teksty użytkowe i wieloźródłowe – Ogłoszenia, maile i recenzje',
    short_title: 'Czytanie: Teksty Użytkowe',
    description: 'Praca z kilkoma krótkimi tekstami, wyszukiwanie ofert i informacji praktycznych.',
    icon: 'Inbox',
    color: '#F59E0B',
    pillarId: 'pillar-reading',
    pillarName: 'Rozumienie tekstów pisanych',
    pointsRange: '4–6 pkt',
    importance: 'HIGH',
    lessonIds: ['eng-lesson-11-1', 'eng-lesson-11-2', 'eng-lesson-11-3']
  },

  // FILAR IV: WYPOWIEDŹ PISEMNA (DZIAŁY 12–15)
  {
    id: 'eng-dzial-12',
    numericId: 12,
    title: 'Warsztat 4 kropek CKE – Rozwinięcie podpunktów vs wzmianka',
    short_title: 'Pisanie: Warsztat 4 Kropek',
    description: 'Kryteria oceny treści (0–5 pkt): jak rozwinąć każdy podpunkt, aby zdobyć maksymalną punktację.',
    icon: 'ListChecks',
    color: '#8B5CF6',
    pillarId: 'pillar-writing',
    pillarName: 'Wypowiedź pisemna',
    pointsRange: '5 pkt (treść)',
    importance: 'CRITICAL_PEWNIAK',
    lessonIds: ['eng-lesson-12-1', 'eng-lesson-12-2', 'eng-lesson-12-3']
  },
  {
    id: 'eng-dzial-13',
    numericId: 13,
    title: 'Spójność i logika tekstu – Łączniki zdań i podział na akapity',
    short_title: 'Pisanie: Spójność i Łączniki',
    description: 'Złoty zestaw łączników: First of all, What is more, However, In addition, To sum up.',
    icon: 'Link',
    color: '#8B5CF6',
    pillarId: 'pillar-writing',
    pillarName: 'Wypowiedź pisemna',
    pointsRange: '2 pkt (spójność)',
    importance: 'HIGH',
    lessonIds: ['eng-lesson-13-1', 'eng-lesson-13-2', 'eng-lesson-13-3']
  },
  {
    id: 'eng-dzial-14',
    numericId: 14,
    title: 'Zakres i poprawność językowa – Podnoszenie oceny stylu',
    short_title: 'Pisanie: Słownictwo i Styl',
    description: 'Zastępowanie prostych słów wyrażeniami B1/B2, unikanie powtórzeń i typowych błędów ortograficznych.',
    icon: 'Award',
    color: '#8B5CF6',
    pillarId: 'pillar-writing',
    pillarName: 'Wypowiedź pisemna',
    pointsRange: '5 pkt (zakres i gramatyka)',
    importance: 'HIGH',
    lessonIds: ['eng-lesson-14-1', 'eng-lesson-14-2', 'eng-lesson-14-3']
  },
  {
    id: 'eng-dzial-15',
    numericId: 15,
    title: 'Symulacje maturalne E-mail i Wpis na blogu (Zadanie 12 CKE)',
    short_title: 'Pisanie: Pełna Symulacja CKE',
    description: 'Pisanie pełnej wypowiedzi 80–130 słów z natychmiastową ewaluacją AI wg kryteriów egzaminacyjnych.',
    icon: 'Send',
    color: '#8B5CF6',
    pillarId: 'pillar-writing',
    pillarName: 'Wypowiedź pisemna',
    pointsRange: '12 pkt (pełne zadanie)',
    importance: 'CRITICAL_PEWNIAK',
    lessonIds: ['eng-lesson-15-1', 'eng-lesson-15-2', 'eng-lesson-15-3']
  }
];

export const ENGLISH_CURRICULUM_TOPICS: TopicDocument[] = TOPIC_BLUEPRINTS.map(bp => {
  const matchingLessons = ENGLISH_LESSONS.filter(l => bp.lessonIds.includes(l.id));
  const topicTasks = ALL_ENGLISH_TASKS.filter(t => t.topicId === bp.id);

  const lessonsMetadata: LessonMetadataItem[] = matchingLessons.map((l, idx) => {
    const tasksForLesson = ALL_ENGLISH_TASKS.filter(t => l.taskIds.includes(t.id));
    const normalizedTasks = tasksForLesson.map(t => normalizeEnglishTaskForRunner(t, l.id, l.topicId));
    return {
      id: l.id,
      order: idx + 1,
      title: l.title,
      tasks_count: Math.max(3, l.taskIds.length || 3),
      estimated_time_formatted: `~${l.estimatedMinutes} min`,
      required_correct_tasks: 2,
      tasks: normalizedTasks
    };
  });

  return {
    id: bp.id,
    numericId: bp.numericId,
    subject_id: 'jezyk-angielski',
    title: bp.title,
    name: bp.title,
    short_title: bp.short_title,
    description: bp.description,
    icon: bp.icon,
    color: '#FFB800',
    lessons_count: lessonsMetadata.length,
    tasks_count: Math.max(topicTasks.length, 3),
    tasks: topicTasks.map(t => normalizeEnglishTaskForRunner(t, t.lessonId || bp.lessonIds[0], bp.id)),
    lessons_metadata: lessonsMetadata,
    matura_points_range: bp.pointsRange,
    importance: bp.importance,
    pillar_id: bp.pillarId,
    pillar_name: bp.pillarName
  };
});

export const ENGLISH_LESSON_DOCUMENTS = new Map<string, LessonDocument>();

ENGLISH_LESSONS.forEach(l => {
  const tasksForLesson = ALL_ENGLISH_TASKS.filter(t => l.taskIds.includes(t.id));
  const normalizedTasks = tasksForLesson.map(t => normalizeEnglishTaskForRunner(t, l.id, l.topicId));

  const doc: LessonDocument = {
    id: l.id,
    topic_id: l.topicId,
    title: l.title,
    estimated_time_minutes: l.estimatedMinutes,
    estimated_time_formatted: `~${l.estimatedMinutes} min`,
    required_correct_tasks: 2,
    theory_pill: l.theoryPill ? {
      ...l.theoryPill,
      worked_example: (l.theoryPill as any).worked_example || (Array.isArray((l.theoryPill as any).worked_examples) ? (l.theoryPill as any).worked_examples[0] : undefined)
    } : undefined,
    tasks: normalizedTasks
  };

  ENGLISH_LESSON_DOCUMENTS.set(`jezyk-angielski/${l.topicId}/${l.id}`, doc);
  ENGLISH_LESSON_DOCUMENTS.set(`jezyk-angielski/${l.id}`, doc);
  ENGLISH_LESSON_DOCUMENTS.set(l.id, doc);
});

export function normalizeEnglishTaskForRunner(task: any, lessonId: string, topicId: string): any {
  if (!task) return null;

  const rawType = String(task.type || 'single_choice').toUpperCase();
  let type = rawType;
  let options = task.options || [];

  if (rawType === 'SINGLE_CHOICE' && Array.isArray(task.options)) {
    options = task.options.map((opt: any, idx: number) => {
      if (typeof opt === 'string') {
        const letter = ['A', 'B', 'C', 'D'][idx] || String(idx + 1);
        return { id: letter, text: opt };
      }
      return opt;
    });
  }

  const rubric = task.ai_tutor_rubric
    ? { ...task.ai_tutor_rubric, max_points: task.ai_tutor_rubric.max_points || task.points || 12 }
    : undefined;

  const audioUrl = task.audioUrl || task.audio_url || (task.transcriptSnippet || task.pillarId === 'pillar-listening' ? `/audio/cke_listening_${task.id}.mp3` : undefined);

  return {
    id: task.id,
    lesson_id: lessonId,
    topic_id: topicId,
    type,
    title: task.title,
    question: task.question,
    context_text: task.contextText || task.context_text,
    audio_url: audioUrl,
    transcript_snippet: task.transcriptSnippet || task.transcript_snippet,
    options,
    correctAnswer: task.correctAnswer,
    correct_answer: task.correctAnswer,
    explanation: task.explanation,
    ckeTrap: task.ckeTrap,
    source: task.source,
    points: task.points || 1,
    ai_tutor_rubric: rubric
  };
}

export function getEnglishLessonDocument(lessonId: string, topicId?: string): LessonDocument | null {
  return (topicId ? ENGLISH_LESSON_DOCUMENTS.get(`jezyk-angielski/${topicId}/${lessonId}`) : null) ||
         ENGLISH_LESSON_DOCUMENTS.get(`jezyk-angielski/${lessonId}`) ||
         ENGLISH_LESSON_DOCUMENTS.get(lessonId) ||
         null;
}

export function loadEnglishTopicBossExam(topicId: string, fallbackTitle?: string): any {
  const bp = TOPIC_BLUEPRINTS.find(s => s.id === topicId) || {
    id: topicId,
    title: fallbackTitle || 'Język Angielski CKE',
    short_title: fallbackTitle || 'Język Angielski'
  };

  let candidateTasks = ALL_ENGLISH_TASKS.filter(t => t.topicId === bp.id);
  if (candidateTasks.length < 5) {
    candidateTasks = ALL_ENGLISH_TASKS.slice(0, 10);
  }

  const chosen = [...candidateTasks].sort(() => 0.5 - Math.random()).slice(0, 5);
  const examTasks = chosen.map((t, idx) => {
    const norm = normalizeEnglishTaskForRunner(t, `${bp.id}-boss`, bp.id);
    return {
      id: norm.id || `boss-eng-${bp.id}-${idx + 1}`,
      lessonId: `${bp.id}.${idx + 1}`,
      lessonOrder: idx + 1,
      lessonTitle: norm.title || `Zadanie ${idx + 1}`,
      topicLabel: `${bp.short_title} • Zadanie ${idx + 1}`,
      question: norm.question || norm.title || '',
      options: norm.options || [],
      correct_answer: norm.correct_answer || norm.correctAnswer,
      correctAnswer: norm.correctAnswer || norm.correct_answer,
      explanation: norm.explanation || '',
      source: norm.source || 'CKE Język Angielski Formuła 2023',
      type: norm.type || 'SINGLE_CHOICE',
      points: norm.points || 1,
      transcript_snippet: norm.transcript_snippet,
      context_text: norm.context_text
    };
  });

  const totalQuestions = examTasks.length || 5;
  const passingScore = Math.max(1, Math.ceil(totalQuestions * 0.7));

  return {
    id: `BOSS-EXAM-${String(bp.id).toUpperCase()}`,
    title: `Sprawdzian Działu: ${bp.short_title}`,
    subtitle: `Ostateczne starcie z materiałem: ${bp.title}. Rozwiąż ${totalQuestions} zadań z tego działu.`,
    boss_name: `Egzaminator CKE: ${bp.short_title}`,
    boss_message: `Egzaminator CKE czeka! Rozwiąż zadania z działu: ${bp.short_title}. Zdobądź minimum 70%!`,
    timeLimitMinutes: 15,
    passingScore,
    totalQuestions,
    rewardXp: 200,
    rewardCoins: 100,
    badgeId: `master_${String(bp.id).toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    tasks: examTasks
  };
}

