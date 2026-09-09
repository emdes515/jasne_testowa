import curriculumData from './curriculum_matematyka.json';
import { MathTaskItem, TaskOption } from '../types';
import { parseSolutionSteps } from '../utils';

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
}

/**
 * Transforms the official CKE 2025 curriculum into structured math topics and tasks.
 */
function buildMathTopics(): ProcessedTopic[] {
  const topics = (curriculumData as any).topics || [];

  return topics.map((topic: any) => {
    const allTasks: any[] = [];
    const lessons = topic.lessons || [];
    const numericTopicId = typeof topic.id === 'number' 
      ? topic.id 
      : parseInt(String(topic.id).replace(/\D/g, '') || '1', 10);

    lessons.forEach((lesson: any) => {
      // 1. Add Theory Pill Task if available
      if (lesson.theory_pill) {
        const pill = lesson.theory_pill;
        const formulasString = Array.isArray(pill.core_formulas) 
          ? pill.core_formulas.join('\n') 
          : (pill.core_formulas || pill.core_formula || '');

        const theoryTask = {
          id: `THEORY-${lesson.id}`,
          type: 'theory',
          cke_source: 'Pigułka Wiedzy',
          title: `Lekcja ${lesson.id}: ${lesson.title}`,
          topic: `${topic.short_title || topic.title} • Lekcja ${lesson.id}`,
          instruction: 'Zapoznaj się z kluczową regułą i wzorami przed przystąpieniem do zadań.',
          math_statement: formulasString,
          question: lesson.title,
          theory_pill: pill,
          officialKey: `• Istota Pojęcia:\n${pill.concept_essence || ''}\n\n• Kontekst Maturalny:\n${pill.matura_context || ''}\n\n• Pułapka:\n${pill.exam_trap || pill.cke_trap || ''}`,
          maxPoints: 0,
          difficulty: 'Teoria',
          xp: 5,
          time: '2 min',
          hints: {
            level_1: pill.matura_context || pill.key_takeaway || 'Zapoznaj się ze wzorami.',
            level_2: pill.exam_trap || pill.cke_trap || 'Uważaj na typowe błędy.',
            ai_tutor_prompt: `Wyjaśnij zagadnienie: ${lesson.title}`
          },
          official_solution_steps: [
            { step_num: 1, description: pill.matura_context || pill.key_takeaway || 'Opanuj wzory i pułapki.' }
          ],
          lessonId: lesson.id
        };
        allTasks.push(theoryTask);
      }

      // 2. Add Practice & Exam Tasks
      const tasks = lesson.tasks || [];
      tasks.forEach((task: any) => {
        const isMulti = task.type === 'MULTI_CHOICE';
        const isSingle = task.type === 'SINGLE_CHOICE';
        const isProof = task.type === 'OPEN_PROOF' || task.type === 'OPEN_GENERAL';
        const isNumeric = task.type === 'NUMERIC_INPUT';
        const isTrueFalse = task.type === 'TRUE_FALSE';
        const isTwoPart = task.type === 'TWO_PART';

        const options: TaskOption[] = (task.options || []).map((opt: any, idx: number) => {
          if (typeof opt === 'string') {
            const letterMatch = opt.match(/^([A-D1-4])[\.\)]\s*(.*)$/);
            const optId = letterMatch ? letterMatch[1] : (['A', 'B', 'C', 'D'][idx] || String(idx + 1));
            const isOptCorrect = isSingle 
              ? (task.correct_answer === opt || task.correct_answer === optId || opt.startsWith(task.correct_answer + '.'))
              : (Array.isArray(task.correct_answers) && (task.correct_answers.includes(opt) || task.correct_answers.includes(optId)));
            return {
              id: optId,
              content_latex: opt,
              is_correct: Boolean(isOptCorrect)
            };
          }
          return {
            id: opt.id,
            content_latex: opt.text,
            is_correct: isSingle ? opt.id === task.correct_answer : (task.correct_answers || []).includes(opt.id)
          };
        });

        let defaultInstruction = 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.';
        if (isMulti) defaultInstruction = 'Wybierz wszystkie właściwe odpowiedzi spośród podanych.';
        if (isNumeric) defaultInstruction = 'Oblicz wartość i wpisz ostateczny wynik poniżej.';
        if (isTrueFalse) defaultInstruction = 'Oceń prawdziwość podanych zdań. Zaznacz P (Prawda) lub F (Fałsz).';
        if (isTwoPart) defaultInstruction = 'Dokończ zdanie. Wybierz właściwą odpowiedź oraz jej uzasadnienie.';
        if (isProof) defaultInstruction = 'Przeprowadź rozwiązanie / dowód w brudnopisie lub na tablicy cyfrowej.';

        let difficultyLabel = 'Standard Maturalny';
        if (task.difficulty === 'EASY') difficultyLabel = 'Rozgrzewka';
        if (task.difficulty === 'HARD') difficultyLabel = 'Wymagające';

        const questionContent = task.content || task.question || '';

        // Prepare part_1 and part_2 for TWO_PART
        let part_1 = task.part_1;
        let part_2 = task.part_2;
        if (isTwoPart && (!part_1 || !part_2)) {
          if (task.options && Array.isArray(task.options)) {
            part_1 = {
              prompt: 'Wybierz odpowiedź (część 1):',
              options: task.options.map((opt: string, idx: number) => {
                const id = opt.match(/^([A-Za-z])/)?.[1] || ['A', 'B'][idx] || String(idx + 1);
                return { id, text: opt };
              })
            };
          }
          if (task.options_part2 && Array.isArray(task.options_part2)) {
            part_2 = {
              prompt: 'Wybierz uzasadnienie (część 2):',
              options: task.options_part2.map((opt: string, idx: number) => {
                const id = opt.match(/^([1-9])/)?.[1] || String(idx + 1);
                return { id, text: opt };
              })
            };
          }
        }

        const taskItem = {
          id: task.id,
          type: task.type,
          source: task.source || 'Zadanie Maturalne',
          cke_source: task.source || 'Zadanie Maturalne',
          points: task.points || (isProof ? 2 : 1),
          ai_tutor_rubric: task.ai_tutor_rubric,
          title: `Lekcja ${lesson.id}: ${lesson.title}`,
          topic: `${topic.short_title || topic.title} • ${lesson.title}`,
          instruction: defaultInstruction,
          math_statement: questionContent,
          question: questionContent,
          content: questionContent,
          options: options.length > 0 ? options : undefined,
          options_part2: task.options_part2,
          required_selections_count: isMulti ? (task.correct_answers?.length || 2) : 1,
          numeric_correct_answer: task.correct_answer,
          correct_answer: task.correct_answer,
          correctAnswer: task.correctAnswer || task.correct_answer,
          input_placeholder: task.input_placeholder || 'Wpisz liczbę lub ułamek...',
          statements: task.statements,
          part_1,
          part_2,
          hints: {
            level_1: task.hint_1 || 'Zastosuj wzory i tożsamości z oficjalnej Karty Wzorów.',
            level_2: task.hint_2 || 'Przekształć wyrażenie krok po kroku i uprość wynik.',
            ai_tutor_prompt: `Pomóż uczniowi rozwiązać zadanie maturalne bez podawania gotowej odpowiedzi: ${questionContent}`
          },
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
          lessonId: lesson.id
        };

        allTasks.push(taskItem);
      });
    });

    return {
      id: `math-${topic.id}`,
      numericId: numericTopicId,
      name: topic.title,
      short_title: topic.short_title || topic.title,
      icon: topic.icon || 'Binary',
      color: topic.color || '#00E5FF',
      matura_points_range: topic.matura_points_range || '4–8 pkt',
      importance: topic.importance || 'Kluczowy pewniak',
      description: topic.description || '',
      progress: '0%',
      locked: numericTopicId > 1,
      lessons: lessons,
      tasks: allTasks,
      final_test: topic.final_test
    };
  });
}

export const mathTopics = buildMathTopics();
