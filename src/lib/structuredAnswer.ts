/**
 * Zadania zamknięte o strukturze innej niż „jedna z A–D” – tak jak w arkuszach CKE:
 *  - `statements`  – kilka stwierdzeń ocenianych jako prawda/fałsz (klucz np. "PF"),
 *  - `parts`       – kilka części, w każdej wybór jednej opcji: „A albo B oraz 1., 2. albo 3.”
 *                    (klucz "B2") albo tabela, w której każdej pozycji przypisuje się literę (klucz "AE"),
 *  - `multiSelect` – wybór kilku odpowiedzi z listy (klucz np. "BF").
 *
 * Odpowiedź ucznia jest zwykłym napisem o tym samym układzie co klucz ("P_" = pierwsza część
 * wybrana, druga jeszcze nie), więc mieści się w dotychczasowym stanie widoków (string na zadanie).
 */

export type StructuredKind = 'statements' | 'parts' | 'multi';

export interface StructuredPart {
  prompt?: string;
  options: { id: string; text: string }[];
}

const EMPTY = '_';

export function getAnswerKey(task: any): string {
  return String(task?.correctAnswer ?? task?.correct_answer ?? '').replace(/\s+/g, '').toUpperCase();
}

export function getStructuredKind(task: any): StructuredKind | null {
  if (!task) return null;
  if (Array.isArray(task.statements) && task.statements.length > 1) return 'statements';
  if (Array.isArray(task.parts) && task.parts.length > 0) return 'parts';
  if (Number(task.multiSelect) > 1 && Array.isArray(task.options) && task.options.length > 0) return 'multi';
  return null;
}

function slotCount(task: any, kind: StructuredKind): number {
  if (kind === 'statements') return task.statements.length;
  if (kind === 'parts') return task.parts.length;
  return Number(task.multiSelect);
}

/** Sprowadza odpowiedź do postaci kanonicznej (stała długość dla części, posortowane litery dla wielokrotnego wyboru). */
export function normalizeStructuredAnswer(task: any, value?: string | null): string {
  const kind = getStructuredKind(task);
  const raw = String(value ?? '').toUpperCase();
  if (!kind) return raw;
  if (kind === 'multi') {
    return Array.from(new Set(raw.replace(/[^A-Z]/g, '').split(''))).sort().join('');
  }
  const n = slotCount(task, kind);
  return (raw + EMPTY.repeat(n)).slice(0, n);
}

/** Ustawia wybór w jednej części (stwierdzeniu / wierszu tabeli). */
export function setStructuredSlot(task: any, value: string | null | undefined, index: number, choice: string): string {
  const chars = normalizeStructuredAnswer(task, value).split('');
  chars[index] = String(choice).toUpperCase();
  return chars.join('');
}

/** Przełącza literę w zadaniu wielokrotnego wyboru (nie pozwala zaznaczyć więcej niż `multiSelect`). */
export function toggleMultiChoice(task: any, value: string | null | undefined, letter: string): string {
  const current = normalizeStructuredAnswer(task, value).split('');
  const id = String(letter).toUpperCase();
  if (current.includes(id)) return current.filter(c => c !== id).join('');
  if (current.length >= Number(task.multiSelect)) return current.join('');
  return [...current, id].sort().join('');
}

export function isStructuredAnswerComplete(task: any, value?: string | null): boolean {
  const kind = getStructuredKind(task);
  if (!kind) return Boolean(value);
  const norm = normalizeStructuredAnswer(task, value);
  if (kind === 'multi') return norm.length === Number(task.multiSelect);
  return !norm.includes(EMPTY);
}

/**
 * Punkty za odpowiedź według zasad CKE:
 *  - prawda/fałsz oraz „A/B + uzasadnienie”: komplet punktów tylko za całość,
 *  - tabela z dopasowaniem (`partScoring: 'per_part'`): punkt za każdą poprawną pozycję,
 *  - wybór dwóch odpowiedzi za 2 pkt: 2 pkt za obie poprawne, 1 pkt gdy poprawna jest dokładnie jedna.
 */
export function gradeStructuredAnswer(task: any, value?: string | null): number {
  const kind = getStructuredKind(task);
  const points = Number(task?.points) || 1;
  const key = getAnswerKey(task);
  if (!kind) return String(value ?? '').trim().toUpperCase() === key ? points : 0;
  const norm = normalizeStructuredAnswer(task, value);

  if (kind === 'multi') {
    const chosen = norm.split('');
    const hits = chosen.filter(c => key.includes(c)).length;
    if (hits === key.length && chosen.length === key.length) return points;
    return points >= 2 && hits === 1 ? 1 : 0;
  }

  const n = slotCount(task, kind);
  let matched = 0;
  for (let i = 0; i < n; i++) if (norm[i] !== EMPTY && norm[i] === key[i]) matched++;
  if (matched === n) return points;
  if (kind === 'parts' && task.partScoring === 'per_part') return Math.floor((points * matched) / n);
  return 0;
}

/** Czytelny zapis odpowiedzi (własnej lub wzorcowej), np. „1 – P, 2 – F” albo „B oraz F”. */
export function describeStructuredAnswer(task: any, value?: string | null): string {
  const kind = getStructuredKind(task);
  if (!kind) return String(value ?? '');
  const norm = normalizeStructuredAnswer(task, value);
  if (kind === 'multi') return norm.split('').join(' oraz ') || '—';
  const show = (c: string) => (c === EMPTY ? '—' : c);
  if (kind === 'parts' && task.parts.length === 2 && !task.partScoring) return `${show(norm[0])}${show(norm[1])}`;
  return norm.split('').map((c, i) => `${i + 1} – ${show(c)}`).join(', ');
}

/** Wzorcowa odpowiedź w czytelnej postaci. */
export function describeAnswerKey(task: any): string {
  return describeStructuredAnswer(task, getAnswerKey(task));
}
