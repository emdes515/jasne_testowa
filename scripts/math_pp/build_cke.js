// Odtwarza w aplikacji autentyczne zadania z arkuszy CKE (matura podstawowa, Formuła 2023)
// z kanonicznych transkrypcji w scripts/math_pp/cke/<arkusz>.js.
//
//   node scripts/math_pp/build_cke.js            – waliduje i zapisuje wszystkie pliki docelowe
//   node scripts/math_pp/build_cke.js --check    – tylko walidacja
//   node scripts/math_pp/build_cke.js --sample=plik.txt
//
// Pliki docelowe (wszystkie powstają z tego samego źródła, więc nie mogą się rozjechać):
//   src/data/math/allMathTasks.ts                       (AUTHENTIC_CKE_TASKS)
//   seed/curriculum/exams/<examId>.json
//   seed/curriculum/zadania_matura.json
//   seed/curriculum/cke_tasks_matematyka.json           (część „matura-*”)
//   seed/curriculum/official_cke_tasks_reference.json
//
// Format zadania w transkrypcji:
//   n     – numer zadania w arkuszu ('7', '14.2'),
//   pts   – liczba punktów, t – numer działu JASNE (1–15),
//   k     – rodzaj: SC (jedna z A–D), PF (dwa zdania prawda/fałsz), AB (A/B + uzasadnienie 1–3),
//           MULTI (dwie odpowiedzi z A–F), FILL (uzupełnij), NUM (uzupełnij liczbą), OPEN, PROOF,
//   q     – treść (LaTeX w $...$), o – opcje, a – odpowiedź (jak w kluczu CKE, wersja A),
//   s     – kroki rozwiązania, trap – typowy błąd, fig – { diagram | plot | numberLine }, optNL – osie liczbowe opcji.
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')).map(([k, v]) => [k, v ?? true]));

const SECTION = {
  1: 'Liczby rzeczywiste', 2: 'Wyrażenia algebraiczne', 3: 'Równania i nierówności', 4: 'Funkcje i ich własności',
  5: 'Funkcja liniowa i układy równań', 6: 'Funkcja kwadratowa', 7: 'Ciągi liczbowe', 8: 'Trygonometria', 9: 'Planimetria',
  10: 'Geometria analityczna', 11: 'Stereometria', 12: 'Kombinatoryka', 13: 'Rachunek prawdopodobieństwa', 14: 'Statystyka', 15: 'Optymalizacja'
};
const LETTERS = 'ABCDEF';
const errors = [];
const fail = (msg) => errors.push(msg);

const officialKeys = JSON.parse(fs.readFileSync(path.join(here, 'cke', 'official_keys.json'), 'utf8'));
const examFiles = fs.readdirSync(path.join(here, 'cke')).filter((f) => /^(maj|czerwiec|sierpien)\d{4}\.js$/.test(f)).sort();

function lint(id, where, text) {
  if (typeof text !== 'string') return;
  if ((text.match(/\$/g) || []).length % 2) fail(`${id}: nieparzysta liczba $ (${where})`);
  if (/undefined|NaN|\[object/.test(text)) fail(`${id}: śmieci w tekście (${where})`);
  if (/\\\\[a-zA-Z]/.test(text)) fail(`${id}: podwójny backslash (${where})`);
  if (/\d\.\d/.test(text)) fail(`${id}: kropka dziesiętna (${where}): ${text.match(/.{0,12}\d\.\d.{0,12}/)[0]}`);
  if (/[𝑎-𝑧𝒂-𝒛𝟎-𝟗]/u.test(text)) fail(`${id}: znaki matematyczne Unicode zamiast LaTeX (${where})`);
  if (/BRUDNOPIS|Brudnopis|Strona \d+ z|Wersja A|0 pkt –|Zasady oceniania/.test(text)) fail(`${id}: pozostałość po arkuszu/kluczu (${where})`);
}

const steps = (s) => s.map((x, i) => `**Krok ${i + 1}:** ${x}`).join('\n\n');

function convert(exam, t) {
  const id = `${exam.examId}-zad-${t.n.replace('.', '_')}`;
  const sectionTitle = `Dział ${t.t}: ${SECTION[t.t]}`;
  if (!SECTION[t.t]) fail(`${id}: zły dział ${t.t}`);
  if (!Array.isArray(t.s) || !t.s.length) fail(`${id}: brak kroków rozwiązania`);
  let type, content = t.q, options, correct, answerLine, officialKey = t.a;

  if (t.k === 'SC') {
    type = 'SINGLE_CHOICE';
    if (t.o?.length !== 4) fail(`${id}: SC wymaga 4 opcji`);
    if (!'ABCD'.includes(t.a) || t.a.length !== 1) fail(`${id}: zły klucz ${t.a}`);
    options = t.o; correct = t.a;
    answerLine = `Prawidłowa odpowiedź: **${t.a}**.`;
  } else if (t.k === 'PF') {
    type = 'SINGLE_CHOICE';
    if (t.st?.length !== 2 || !/^[PF]{2}$/.test(t.a)) fail(`${id}: PF wymaga 2 zdań i klucza typu PF`);
    content = `${t.q}\n\nOceń prawdziwość poniższych stwierdzeń.\n\n**1.** ${t.st[0]}\n\n**2.** ${t.st[1]}`;
    options = ['1. – prawda, 2. – prawda', '1. – prawda, 2. – fałsz', '1. – fałsz, 2. – prawda', '1. – fałsz, 2. – fałsz'];
    correct = LETTERS[['PP', 'PF', 'FP', 'FF'].indexOf(t.a)];
    answerLine = `Prawidłowa odpowiedź: **${correct}** (w arkuszu CKE: ${t.a.split('').join(', ')}).`;
  } else if (t.k === 'AB') {
    type = 'SINGLE_CHOICE';
    if (t.ab?.length !== 2 || t.r?.length !== 3 || !/^[AB][123]$/.test(t.a)) fail(`${id}: AB wymaga 2 zakończeń, 3 uzasadnień i klucza typu B2`);
    options = t.ab.flatMap((x) => t.r.map((y) => `${x}, ${t.join || 'ponieważ'} ${y}`));
    correct = LETTERS['AB'.indexOf(t.a[0]) * 3 + Number(t.a[1]) - 1];
    answerLine = `Prawidłowa odpowiedź: **${correct}** (w arkuszu CKE: ${t.a[0]}${t.a[1]}).`;
  } else if (t.k === 'MULTI') {
    type = 'OPEN_CALCULATION';
    if (!(t.o?.length >= 5) || !/^[A-F]{2}$/.test(t.a)) fail(`${id}: MULTI wymaga listy A–F i klucza z dwóch liter`);
    content = `${t.q}\n\n${t.o.map((x, i) => `**${LETTERS[i]}.** ${x}`).join('\n\n')}`;
    correct = `${t.a[0]} i ${t.a[1]}`;
    answerLine = `Prawidłowe odpowiedzi: **${t.a[0]}** oraz **${t.a[1]}**.`;
  } else if (t.k === 'NUM') {
    type = 'NUMERIC_INPUT';
    if (!/^-?\d+(,\d+)?$/.test(String(t.a))) fail(`${id}: NUM wymaga liczby z przecinkiem dziesiętnym`);
    correct = String(t.a);
    answerLine = `Prawidłowa odpowiedź: **${t.a}**.`;
  } else if (t.k === 'FILL' || t.k === 'OPEN' || t.k === 'PROOF') {
    type = t.k === 'PROOF' ? 'OPEN_PROOF' : 'OPEN_CALCULATION';
    if (!t.a || t.a.length < 1) fail(`${id}: brak odpowiedzi`);
    correct = t.a;
    answerLine = t.k === 'PROOF' ? `**Wniosek:** ${t.a}` : `**Odpowiedź:** ${t.a}`;
    officialKey = null;
  } else {
    fail(`${id}: nieznany rodzaj ${t.k}`);
  }

  // Zgodność z kluczem CKE (wersja A) i punktacją zapisaną w dotychczasowej bazie
  const ref = officialKeys[id];
  if (!ref) fail(`${id}: brak zadania o tym id w dotychczasowej bazie (official_keys.json)`);
  else {
    if (ref.points !== t.pts) fail(`${id}: punkty ${t.pts} ≠ ${ref.points} w bazie`);
    if (['SC', 'PF', 'AB', 'MULTI'].includes(t.k) && /^[A-F]{1,2}\d?$/.test(ref.key) && ref.key !== t.a) fail(`${id}: klucz ${t.a} ≠ oficjalny ${ref.key}`);
  }

  const explanation = [steps(t.s), t.trap ? `**Pułapka CKE:** ${t.trap}` : null, answerLine].filter(Boolean).join('\n\n');
  const tip = t.tip || t.trap || 'Sprawdź, czy odpowiadasz dokładnie na to, o co pytają w poleceniu.';
  lint(id, 'treść', content); lint(id, 'wyjaśnienie', explanation); lint(id, 'wskazówka', tip); lint(id, 'odpowiedź', correct);
  (options || []).forEach((o) => lint(id, 'opcja', o));
  if (options && new Set(options).size !== options.length) fail(`${id}: powtórzone opcje`);

  const fig = t.fig || {};
  return {
    id, n: t.n, type, content, options, correct, explanation, tip, sectionTitle, officialKey,
    topicId: `dzial-${t.t}`, points: t.pts, isClosed: type === 'SINGLE_CHOICE', optNL: t.optNL,
    diagram: fig.diagram, plot: fig.plot, numberLine: fig.numberLine, adapted: t.adapted
  };
}

const exams = [];
for (const f of examFiles) {
  const exam = (await import(pathToFileURL(path.join(here, 'cke', f)).href)).default;
  const tasks = exam.tasks.map((t) => convert(exam, t));
  const ids = new Set(tasks.map((t) => t.id));
  if (ids.size !== tasks.length) fail(`${exam.examId}: powtórzone numery zadań`);
  const expected = Object.keys(officialKeys).filter((id) => id.startsWith(`${exam.examId}-zad-`));
  for (const id of expected) if (!ids.has(id)) fail(`${exam.examId}: brak transkrypcji zadania ${id}`);
  const total = exam.tasks.reduce((sum, t) => sum + t.pts, 0);
  if (total !== exam.totalPoints) fail(`${exam.examId}: suma punktów ${total} ≠ ${exam.totalPoints}`);
  exams.push({ exam, tasks });
}

const count = exams.reduce((n, e) => n + e.tasks.length, 0);
console.log(`Arkusze: ${exams.length}, zadania: ${count}`);
for (const { exam, tasks } of exams) console.log(`  ${exam.examId}: ${tasks.length} zadań, ${exam.totalPoints} pkt, z rysunkiem: ${tasks.filter((t) => t.diagram || t.plot || t.numberLine || t.optNL).length}`);

if (args.sample) {
  const out = exams.flatMap(({ tasks }) => tasks.map((t) => `[${t.id}] (${t.type}, ${t.points} pkt, ${t.topicId})\n${t.content}\n${(t.options || []).map((o, i) => `   ${LETTERS[i]}) ${o}`).join('\n')}\n=> ${t.correct}\n${t.explanation}\n`));
  fs.writeFileSync(args.sample, out.join('\n'));
}
if (errors.length) {
  console.log(`\nBŁĘDY (${errors.length}):\n${errors.join('\n')}`);
  process.exit(1);
}
if (args.check) process.exit(0);

// ---------- emisja ----------
const mathTask = ({ exam }, t) => ({
  id: t.id,
  topicId: t.topicId,
  sectionTitle: t.sectionTitle,
  taskNumber: t.n,
  type: t.type,
  content: t.content,
  ...(t.options ? { options: t.options.map((text, i) => ({ id: LETTERS[i], text, is_correct: LETTERS[i] === t.correct, ...(t.optNL ? { numberLine: t.optNL[i] } : {}) })) } : {}),
  correct_answer: t.correct,
  explanation: t.explanation,
  matura_tip: t.tip,
  points: t.points,
  sourceYear: exam.examName,
  ...(t.diagram ? { diagram: t.diagram } : {}),
  ...(t.plot ? { plot: t.plot } : {}),
  ...(t.numberLine ? { numberLine: t.numberLine } : {}),
  ...(t.adapted ? { adaptationNote: t.adapted } : {})
});
const seedTask = ({ exam }, t) => ({
  id: t.id,
  examId: exam.examId,
  examName: exam.examName,
  taskNumber: t.n,
  section: t.sectionTitle,
  topicId: t.topicId,
  type: t.type,
  content: t.content,
  options: t.options ? (t.optNL ? t.options.map((text, i) => ({ id: LETTERS[i], text, numberLine: t.optNL[i], is_correct: LETTERS[i] === t.correct })) : t.options) : [],
  correctAnswer: t.correct,
  points: t.points,
  isClosed: t.isClosed,
  explanation: t.explanation,
  ckeTrap: t.tip,
  source: `${exam.sourceLabel} • Zad. ${t.n}`,
  year: exam.year,
  session: exam.session,
  isCke: true,
  ...(t.diagram ? { diagram: t.diagram } : {}),
  ...(t.plot ? { plot: t.plot } : {}),
  ...(t.numberLine ? { numberLine: t.numberLine } : {}),
  ...(t.adapted ? { adaptationNote: t.adapted } : {})
});
const refTask = ({ exam }, t) => ({
  badge: `${exam.refLabel} • Zad. ${t.n}`,
  exam: exam.refLabel,
  num: t.n,
  type: t.type,
  ans: t.correct,
  content: t.content,
  options: t.options || [],
  points: t.points,
  numberLine: t.numberLine || null,
  diagram: t.diagram || t.plot || null
});
const writeJson = (rel, data) => fs.writeFileSync(path.join(root, rel), JSON.stringify(data, null, 2) + '\n');
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const done = new Map(exams.map((e) => [e.exam.examId, e]));
const examIdOf = (id) => String(id).replace(/-zad-.*$/, '');

// 1) arkusze w seed/curriculum/exams
for (const e of exams) writeJson(`seed/curriculum/exams/${e.exam.examId}.json`, e.tasks.map((t) => seedTask(e, t)));

// 2) zbiorcze pliki seed – podmieniamy zadania przepisanych arkuszy, resztę zostawiamy bez zmian
const replaceIn = (list, make, keyOf) => {
  const out = [];
  const emitted = new Set();
  for (const item of list) {
    const ex = keyOf(item);
    if (!done.has(ex)) { out.push(item); continue; }
    if (emitted.has(ex)) continue;
    emitted.add(ex);
    const e = done.get(ex);
    out.push(...e.tasks.map((t) => make(e, t)));
  }
  return out;
};
writeJson('seed/curriculum/zadania_matura.json', replaceIn(readJson('seed/curriculum/zadania_matura.json'), seedTask, (x) => examIdOf(x.id)));
writeJson('seed/curriculum/cke_tasks_matematyka.json', replaceIn(readJson('seed/curriculum/cke_tasks_matematyka.json'), seedTask, (x) => (String(x.id).startsWith('matura-') ? examIdOf(x.id) : '')));
const refToExam = new Map(exams.map((e) => [e.exam.refLabel.toLowerCase(), e.exam.examId]));
writeJson('seed/curriculum/official_cke_tasks_reference.json', replaceIn(readJson('seed/curriculum/official_cke_tasks_reference.json'), refTask, (x) => refToExam.get(String(x.exam).toLowerCase()) || ''));

// 3) src/data/math/allMathTasks.ts – literał AUTHENTIC_CKE_TASKS
const tsPath = path.join(root, 'src/data/math/allMathTasks.ts');
let ts = fs.readFileSync(tsPath, 'utf8').replace(/\r\n/g, '\n');
const marker = 'export const AUTHENTIC_CKE_TASKS: MathTask[] = ';
const a = ts.indexOf(marker) + marker.length;
const b = ts.indexOf('\n];', a) + 2;
if (a < marker.length || b < 2) throw new Error('Nie znaleziono AUTHENTIC_CKE_TASKS');
const current = JSON.parse(ts.slice(a, b));
const next = replaceIn(current, mathTask, (x) => examIdOf(x.id));
fs.writeFileSync(tsPath, ts.slice(0, a) + JSON.stringify(next, null, 2) + ts.slice(b));
console.log(`Zapisano ${exams.length} arkuszy (${count} zadań) do plików aplikacji i seed.`);
