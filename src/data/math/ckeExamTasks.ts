/**
 * Autentyczne arkusze CKE z matematyki (poziom podstawowy, Formuła 2023) w formacie MaturaTask
 * dla Centrum Egzaminacyjnego.
 *
 * Źródłem są zweryfikowane transkrypcje arkuszy (scripts/math_pp/cke/*.js → build_cke.js →
 * AUTHENTIC_CKE_TASKS). Dzięki temu symulator nie zależy od tego, czy dokument `exams/…`
 * w Firestore został już przeładowany poprawionymi danymi z seed/curriculum/exams.
 */
import { MaturaTask } from '../../types';
import { AUTHENTIC_CKE_TASKS } from './allMathTasks';

const SESSIONS: Record<string, string> = { maj: 'Maj', czerwiec: 'Czerwiec', sierpien: 'Sierpień' };

function toMaturaTask(task: any): MaturaTask {
  const idMatch = String(task.id).match(/^(matura-([a-z]+)-(\d{4}))-zad-/);
  const examId = idMatch ? idMatch[1] : '';
  const session = idMatch ? SESSIONS[idMatch[2]] || '' : '';
  const year = idMatch ? Number(idMatch[3]) : undefined;
  const hasOptionVisuals = Array.isArray(task.options) && task.options.some((o: any) => o?.numberLine || o?.diagram);
  // Opcje z osią liczbową zostają obiektami (symulator rysuje wtedy oś zamiast tekstu)
  const options = Array.isArray(task.options)
    ? (hasOptionVisuals ? task.options : task.options.map((o: any) => (typeof o === 'string' ? o : o.text)))
    : [];

  return {
    id: task.id,
    section: task.sectionTitle,
    topicId: task.topicId,
    type: task.type,
    content: task.content,
    options,
    correctAnswer: task.correct_answer,
    points: task.points,
    // Wszystkie formaty zamknięte CKE są sprawdzane automatycznie (lib/structuredAnswer.ts)
    isClosed: ['SINGLE_CHOICE', 'TRUE_FALSE', 'TWO_PART', 'MULTI_CHOICE'].includes(task.type),
    explanation: task.explanation || '',
    ckeTrap: task.matura_tip,
    source: `Matura ${session} ${year} • Zad. ${task.taskNumber}`,
    year,
    session,
    isCke: true,
    diagram: task.diagram,
    plot: task.plot,
    ...(task.numberLine ? { numberLine: task.numberLine } : {}),
    ...(task.statements ? { statements: task.statements } : {}),
    ...(task.parts ? { parts: task.parts } : {}),
    ...(task.partScoring ? { partScoring: task.partScoring } : {}),
    ...(task.multiSelect ? { multiSelect: task.multiSelect } : {}),
    taskNumber: task.taskNumber,
    ...(examId ? { examId, examName: task.sourceYear } : {})
  } as MaturaTask;
}

let cache: MaturaTask[] | null = null;

/** Wszystkie zadania z sześciu arkuszy CKE (2023–2024), w kolejności arkuszy. */
export function getBundledCkeExamTasks(): MaturaTask[] {
  if (!cache) cache = AUTHENTIC_CKE_TASKS.map(toMaturaTask);
  return cache;
}

/** Zadania jednego arkusza, np. 'matura-maj-2024'. Pusta tablica, gdy arkusza nie ma w paczce. */
export function getBundledCkeExamSheet(examId: string): MaturaTask[] {
  return getBundledCkeExamTasks().filter(t => (t as any).examId === examId);
}
