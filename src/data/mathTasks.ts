import { MathTaskItem, TaskOption } from '../types';
import { parseSolutionSteps } from '../utils';
import { TopicDocument, LessonDocument } from '../schema_firestore';

export interface CurriculumTopic {
  id: number;
  slug: string;
  title: string;
  short_title: string;
  icon: string;
  color: string;
  matura_points_range: string;
  importance: string;
  description: string;
  lessons: any[];
}

export interface ProcessedTopic {
  id: string;
  numericId: number;
  name: string;
  short_title: string;
  icon: string;
  color: string;
  matura_points_range: string;
  importance: string;
  description: string;
  progress: string;
  locked: boolean;
  lessons: any[];
  tasks: any[];
  final_test?: any;
  lessons_metadata?: any[];
}

/**
 * Normalizes raw task from Firestore into MathTaskItem format
 */
export function normalizeTask(task: any, lesson: any, topic: any): any {
  if (!task) return null;
  const rawType = String(task.type || 'SINGLE_CHOICE').toUpperCase();
  const isMulti = rawType === 'MULTI_CHOICE';
  const isSingle = rawType === 'SINGLE_CHOICE';
  const isProof = rawType === 'OPEN_PROOF' || rawType === 'OPEN_GENERAL' || rawType === 'OPEN_TASK';
  const isNumeric = rawType === 'NUMERIC_INPUT';
  const isTrueFalse = rawType === 'TRUE_FALSE';
  const isTwoPart = rawType === 'TWO_PART';

  // Resilient resolution of correct answer (from direct field OR from options array marked is_correct: true)
  const optionWithCorrect = Array.isArray(task.options)
    ? task.options.find((o: any) => o && (o.is_correct === true || o.isCorrect === true))
    : null;
  const rawCorrect = task.correct_answer || task.correctAnswer || (optionWithCorrect ? (optionWithCorrect.id || optionWithCorrect.key || 'A') : 'A');
  let normCorrect = String(rawCorrect).trim();
  const letterMatch = normCorrect.match(/^(?:Odp\s*)?([A-D1-4])/i);
  if (letterMatch && (isSingle || isMulti)) {
    normCorrect = letterMatch[1].toUpperCase();
  } else if (isSingle && Array.isArray(task.options)) {
    const rawTrimmed = String(rawCorrect).trim();
    const foundIdx = task.options.findIndex((o: any) => {
      if (typeof o === 'string') {
        const clean = o.replace(/^([A-D1-4])[\.\)]\s*/, '').trim();
        return o.trim() === rawTrimmed || clean === rawTrimmed;
      }
      return (o.text && o.text.trim() === rawTrimmed) || 
             (o.content_latex && o.content_latex.trim() === rawTrimmed) || 
             (o.id && o.id.trim().toUpperCase() === rawTrimmed.toUpperCase());
    });
    if (foundIdx !== -1) {
      normCorrect = ['A', 'B', 'C', 'D'][foundIdx] || String(foundIdx + 1);
    }
  }

  // Support TRUE_FALSE conversion ('P' / 'F')
  if (isTrueFalse) {
    if (normCorrect === 'B' || normCorrect.toLowerCase() === 'fałsz' || normCorrect.toLowerCase() === 'false') {
      normCorrect = 'F';
    } else if (normCorrect === 'A' || normCorrect.toLowerCase() === 'prawda' || normCorrect.toLowerCase() === 'true') {
      normCorrect = 'P';
    }
  }

  const options: TaskOption[] = (task.options || []).map((opt: any, idx: number) => {
    if (typeof opt === 'string') {
      const optLetterMatch = opt.match(/^([A-D1-4])[\.\)]\s*(.*)$/);
      const optId = optLetterMatch ? optLetterMatch[1].toUpperCase() : (['A', 'B', 'C', 'D'][idx] || String(idx + 1));
      const optText = optLetterMatch ? optLetterMatch[2].trim() : opt;
      const isOptCorrect = isSingle 
        ? (optId === normCorrect || opt === rawCorrect || opt.startsWith(rawCorrect + '.'))
        : (Array.isArray(task.correct_answers) && (task.correct_answers.includes(opt) || task.correct_answers.includes(optId)));
      return {
        id: optId,
        text: optText || opt,
        content_latex: optText || opt,
        is_correct: Boolean(isOptCorrect)
      };
    }
    const optId = opt.id || opt.key || opt.label || (['A', 'B', 'C', 'D'][idx] || String(idx + 1));
    const optText = opt.text || opt.content_latex || opt.content || '';
    const isOptMarked = opt.is_correct === true || opt.isCorrect === true;
    return {
      id: optId,
      text: optText,
      content_latex: optText,
      is_correct: isOptMarked || (isSingle ? (optId === normCorrect || optId === task.correct_answer) : (task.correct_answers || []).includes(optId))
    };
  });

  if (isSingle && options.length > 0) {
    const correctIndices = options.map((o, idx) => (o.is_correct ? idx : -1)).filter(idx => idx !== -1);
    if (correctIndices.length === 0) {
      const directIdx = options.findIndex(o => o.id === normCorrect);
      const chosenIdx = directIdx !== -1 ? directIdx : 0;
      options.forEach((o, idx) => { o.is_correct = idx === chosenIdx; });
    } else if (correctIndices.length > 1) {
      const directIdx = options.findIndex(o => o.id === normCorrect);
      const chosenIdx = directIdx !== -1 ? directIdx : correctIndices[0];
      options.forEach((o, idx) => { o.is_correct = idx === chosenIdx; });
    }
  }

  let defaultInstruction = 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.';
  if (isMulti) defaultInstruction = 'Wybierz wszystkie właściwe odpowiedzi spośród podanych.';
  if (isNumeric) defaultInstruction = 'Oblicz wartość i wpisz ostateczny wynik poniżej.';
  if (isTrueFalse) defaultInstruction = 'Oceń prawdziwość podanych zdań. Zaznacz P (Prawda) lub F (Fałsz).';
  if (isTwoPart) defaultInstruction = 'Dokończ zdanie. Wybierz właściwą odpowiedź oraz jej uzasadnienie.';
  if (isProof) defaultInstruction = 'Przeprowadź rozwiązanie / dowód w brudnopisie lub na tablicy cyfrowej.';

  let difficultyLabel = 'Standard Maturalny';
  if (task.difficulty === 'EASY') difficultyLabel = 'Rozgrzewka';
  if (task.difficulty === 'HARD') difficultyLabel = 'Wymagające';

  const questionContent = task.content || task.question || task.statement || '';

  return {
    id: task.id,
    type: rawType,
    source: task.source || task.cke_source || 'Zadanie Maturalne',
    cke_source: task.source || task.cke_source || 'Zadanie Maturalne',
    cke_tag: task.cke_tag,
    cke_badge: task.cke_badge || task.badge,
    points: task.points || (isProof ? 2 : 1),
    ai_tutor_rubric: task.ai_tutor_rubric,
    title: lesson ? `Lekcja ${lesson.id.replace(/^lesson-/, '').replace(/^pol-lesson-/, '').replace(/-/g, '.')}: ${lesson.title}` : 'Zadanie',
    topic: topic ? `${topic.short_title || topic.title} • ${lesson?.title || ''}` : 'Matematyka',
    instruction: task.instruction || defaultInstruction,
    math_statement: questionContent,
    question: questionContent,
    content: questionContent,
    options: options.length > 0 ? options : undefined,
    options_part2: task.options_part2,
    required_selections_count: isMulti ? (task.correct_answers?.length || 2) : 1,
    numeric_correct_answer: task.correct_answer,
    correct_answer: isSingle ? normCorrect : task.correct_answer,
    correctAnswer: isSingle ? normCorrect : (task.correctAnswer || task.correct_answer),
    raw_correct_answer: rawCorrect,
    input_placeholder: task.input_placeholder || (isProof ? 'Sformułuj odpowiedź pisemną...' : 'Wpisz liczbę lub ułamek...'),
    statements: task.statements,
    part_1: task.part_1 ? {
      ...task.part_1,
      options: (task.part_1.options || []).map((o: any, idx: number) => ({
        ...o,
        id: o.id || o.key || o.label || String.fromCharCode(65 + idx)
      }))
    } : undefined,
    part_2: task.part_2 ? {
      ...task.part_2,
      options: (task.part_2.options || []).map((o: any, idx: number) => ({
        ...o,
        id: o.id || o.key || o.label || String(idx + 1)
      }))
    } : undefined,
    hints: {
      level_1: task.hints?.level_1 || task.hint_1 || task.hint || 'Zwróć uwagę na kluczowe założenia w poleceniu.',
      level_2: task.hints?.level_2 || task.hint_2 || 'Przeanalizuj powiązania logiczne i sformułuj precyzyjny wniosek.',
      ai_tutor_prompt: `Pomóż uczniowi rozwiązać zadanie maturalne: ${questionContent}`
    },
    hint: task.hint || task.hints?.level_1 || task.hint_1 || 'Zwróć uwagę na kluczowe założenia w poleceniu.',
    hint_cost: task.hint_cost || task.hintCost || (isProof ? 20 : 10),
    ai_hint_enabled: Boolean(task.ai_hint_enabled !== undefined ? task.ai_hint_enabled : (isProof || task.type === 'OPEN_GENERAL' || task.type === 'OPEN_PROOF' || task.type === 'OPEN_TASK')),
    ai_hint_cost: task.ai_hint_cost || task.hint_cost || 20,
    scoring_key: task.scoring_key || task.scoringKey || task.explanation || '',
    official_solution_steps: (() => {
      const parsed = parseSolutionSteps(task.explanation || '');
      if (parsed.length > 0) {
        return parsed.map(s => ({
          step_num: s.stepNum,
          description: s.title ? `**${s.title}:** ${s.content}` : s.content
        }));
      }
      return [{ step_num: 1, description: task.explanation || 'Brak opisu rozwiązania.' }];
    })(),
    officialKey: task.explanation,
    explanation: task.explanation,
    maxPoints: task.points || (isProof ? 2 : 1),
    difficulty: difficultyLabel,
    xp: (task.points || 1) * 10,
    time: `${(task.points || 1) * 2} min`,
    tags: task.tags || [`${task.points || 1} pkt`],
    lessonId: lesson?.id
  };
}

/**
 * Builds a ProcessedTopic from a Firestore TopicDocument and optional LessonDocuments
 */
export function buildProcessedTopic(topicDoc: TopicDocument, lessonsDocs: LessonDocument[] = []): ProcessedTopic {
  const numericId = topicDoc.numericId || parseInt(String(topicDoc.id).replace(/\D/g, '') || '1', 10);
  
  const allTasks: any[] = [];
  const lessons = lessonsDocs.length > 0 
    ? lessonsDocs 
    : (topicDoc.lessons_metadata || []).map(m => ({
        id: m.id,
        title: m.title,
        estimated_time_minutes: m.estimated_time_minutes || 5,
        estimated_time_formatted: m.estimated_time_formatted || '~5 min',
        required_correct_tasks: m.required_points || 3,
        tasks: []
      }));

  lessonsDocs.forEach(lesson => {
    // Add theory pill if present
    if (lesson.theory_pill) {
      const pill = lesson.theory_pill;
      const formulasString = Array.isArray(pill.core_formulas) 
        ? pill.core_formulas.join('\n') 
        : (pill.core_formulas || (pill as any).core_formula || '');

      allTasks.push({
        id: `THEORY-${lesson.id}`,
        type: 'theory',
        cke_source: 'Pigułka Wiedzy',
        title: `Lekcja ${lesson.id.replace(/^lesson-/, '').replace(/^pol-lesson-/, '').replace(/-/g, '.')}: ${lesson.title}`,
        topic: `${topicDoc.short_title || topicDoc.title} • Lekcja ${lesson.id.replace(/^lesson-/, '').replace(/^pol-lesson-/, '').replace(/-/g, '.')}`,
        instruction: 'Zapoznaj się z kluczową regułą i wzorami przed przystąpieniem do zadań.',
        math_statement: formulasString,
        question: lesson.title,
        theory_pill: pill,
        officialKey: `• Istota Pojęcia:\n${pill.concept_essence || ''}\n\n• Kontekst Maturalny:\n${pill.matura_context || ''}\n\n• Pułapka:\n${pill.exam_trap || (pill as any).cke_trap || ''}`,
        maxPoints: 0,
        difficulty: 'Teoria',
        xp: 5,
        time: '2 min',
        lessonId: lesson.id
      });
    }

    // Add practice tasks
    (lesson.tasks || []).forEach(task => {
      const normalized = normalizeTask(task, lesson, topicDoc);
      if (normalized) allTasks.push(normalized);
    });
  });

  return {
    id: topicDoc.id,
    numericId,
    name: topicDoc.title || topicDoc.name,
    short_title: topicDoc.short_title || topicDoc.title,
    icon: topicDoc.icon || 'Binary',
    color: topicDoc.color || '#FFB800',
    matura_points_range: topicDoc.matura_points_range || '4–8 pkt',
    importance: topicDoc.importance || 'Kluczowy pewniak',
    description: topicDoc.description || '',
    progress: '0%',
    locked: false,
    lessons,
    tasks: allTasks,
    final_test: topicDoc.final_test,
    lessons_metadata: topicDoc.lessons_metadata
  };
}

// Global in-memory topics holder for legacy synchronous readers
export let mathTopics: ProcessedTopic[] = [];

export function setGlobalMathTopics(topics: ProcessedTopic[]): void {
  mathTopics = topics;
}
