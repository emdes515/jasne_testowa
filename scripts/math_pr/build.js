/**
 * Buduje kurs matematyki PR (wymagania CKE od 2025 r.): działy × 5 lekcji (teoria Core-4) + 20 zadań na lekcję,
 * w tym 4 zadania otwarte oceniane etapami z zasad oceniania CKE.
 * Narzędzia (PRNG, konstruktory zadań, parser kontrolny, pigułka) są wspólne z kursem PP: scripts/math_pp/lib.js.
 * Wyjście:
 *   src/data/math/generated/pr_blueprints.json   – działy i lekcje (pigułki teorii)
 *   src/data/math/generated/pr_tasks.json        – zadania przypisane do lekcji
 *   seed/curriculum/curriculum_matematyka_pr.json – ten sam kurs w schemacie Firestore
 * Uruchomienie: node scripts/math_pr/build.js [--sample=plik.txt]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { makeR, finalize, Retry, evalTex, close } from '../math_pp/lib.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.join(ROOT, 'src', 'data', 'math', 'generated');
const SEED_PATH = path.join(ROOT, 'seed', 'curriculum', 'curriculum_matematyka_pr.json');
const TASKS_PER_LESSON = 20;
const OPEN_PER_LESSON = 4;
const SUBJECT_ID = 'matematyka-rozszerzona';

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));

const topics = [];
for (let d = 1; d <= 15; d++) {
  const file = path.join(__dirname, `dzial_${String(d).padStart(2, '0')}.js`);
  if (!fs.existsSync(file)) continue;
  const mod = await import(`file://${file.replace(/\\/g, '/')}`);
  topics.push(mod.default);
}

const errors = [];
const fail = (msg) => errors.push(msg);

const REQUIREMENTS = new Set(
  JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'curriculum', 'matematyka_pr', 'wymagania_2024.json'), 'utf8')).map((q) => q.code)
);

function lintText(id, text, where) {
  const dollars = (text.match(/(?<!\\)\$/g) || []).length;
  if (dollars % 2 !== 0) fail(`${id}: nieparzysta liczba $ (${where})`);
  const checks = [
    [/undefined|NaN|Infinity|\[object/, 'śmieci JS'],
    // np. '\frac' w zwykłym stringu JS daje znak form-feed zamiast polecenia LaTeX
    [/[\x00-\x08\x0b\x0c\x0e-\x1f]/, 'znak sterujący (niezescapowany backslash)'],
    [/\\\\[a-zA-Z]/, 'podwójny backslash przed poleceniem LaTeX'],
    [/(?<![\d,}])1\\sqrt/, 'współczynnik 1 przed pierwiastkiem'],
    [/\+\s*-|-\s*-\s*(\d|\\)|\+\s*\+/, 'podwójny znak'],
    [/(?<![\d,{}])\b1(x|n|a|y|m|k|t)\b(?!\w)/, 'współczynnik 1 przed zmienną'],
    [/\d\.\d/, 'kropka dziesiętna zamiast przecinka'],
    [/\d{,}\d*0{6,}|\d{,}\d*9{6,}/, 'artefakt zmiennoprzecinkowy'],
    // Informator PR dopuszcza ∧, ∨, ⇒, ⇔ w treści zadań, ale kurs tłumaczy warunki słowami (Core-4)
    [/\\iff|\\vee|\\wedge|\\forall|\\exists|\\implies|\\Rightarrow|\\Leftrightarrow/, 'formalizm logiczny'],
    [/\{0\}\{|\\frac\{[^{}]*\}\{0\}/, 'zero w ułamku']
  ];
  for (const [re, name] of checks) {
    const mm = text.match(re);
    if (mm) fail(`${id}: ${name} „${mm[0]}” (${where}): ${text.slice(Math.max(0, mm.index - 40), mm.index + 40).replace(/\n/g, ' ')}`);
  }
}

const allTasks = [];
const blueprints = [];
const sample = [];

for (const t of topics) {
  const d = t.numericId;
  const topicId = `pr-dzial-${d}`;
  if (t.lessons.length !== 5) fail(`${topicId}: liczba lekcji ${t.lessons.length} != 5`);
  const bpLessons = [];
  t.lessons.forEach((l, li) => {
    const order = li + 1;
    const lessonId = `math-pr-lesson-${d}-${order}`;
    const lessonKey = `${d}.${order}`;
    const archetypeCode = `PR${d}.${order}`;
    const r = makeR(50000 + d * 1000 + order * 37);
    const seen = new Set();
    const perGen = l.gens.map(() => 0);
    const quota = Math.ceil(TASKS_PER_LESSON / l.gens.length);
    const lessonTasks = [];
    let attempts = 0;
    let gi = 0;
    while (lessonTasks.length < TASKS_PER_LESSON && attempts < 20000) {
      attempts++;
      const g = gi % l.gens.length;
      gi++;
      if (perGen[g] >= quota + 2) continue;
      let raw;
      try {
        raw = l.gens[g](r);
      } catch (e) {
        if (e instanceof Retry) continue;
        throw new Error(`${lessonKey} gen#${g}: ${e.message}`);
      }
      // Zadania otwarte: dokładnie OPEN_PER_LESSON w puli (SessionRunner dobiera 1 otwarte na sesję)
      if (raw.kind === 'open' && lessonTasks.filter((x) => x.rubric_stages).length >= OPEN_PER_LESSON) continue;
      if (raw.kind !== 'open' && lessonTasks.filter((x) => !x.rubric_stages).length >= TASKS_PER_LESSON - OPEN_PER_LESSON) continue;
      const uniqKey = raw.q + (raw.diagram ? JSON.stringify(raw.diagram) : '');
      if (seen.has(uniqKey)) continue;
      seen.add(uniqKey);
      perGen[g]++;
      const n = lessonTasks.length + 1;
      const task = finalize(
        raw,
        { id: `mat-pr-${d}-${order}-${String(n).padStart(2, '0')}`, lessonId, lessonKey, topicId, sectionTitle: `Dział ${d}: ${t.title}`, archetypeCode, category: t.short_title },
        r
      );
      task.requirements = l.requirements;
      lessonTasks.push(task);
    }
    if (lessonTasks.length < TASKS_PER_LESSON) {
      fail(`${lessonKey} „${l.title}”: tylko ${lessonTasks.length} unikalnych zadań (per gen: ${perGen.join(',')})`);
    }
    if (lessonTasks.filter((x) => x.rubric_stages).length !== OPEN_PER_LESSON) fail(`${lessonKey}: liczba zadań otwartych != ${OPEN_PER_LESSON}`);
    for (const code of l.requirements || []) if (!REQUIREMENTS.has(code)) fail(`${lessonKey}: nieznane wymaganie ${code}`);
    if (!l.requirements?.length) fail(`${lessonKey}: brak wymagań podstawy programowej`);

    for (const task of lessonTasks) {
      lintText(task.id, task.content, 'treść');
      lintText(task.id, task.explanation, 'wyjaśnienie');
      lintText(task.id, task.matura_tip || '', 'wskazówka');
      if (!task.matura_tip) fail(`${task.id}: brak wskazówki`);
      if (task.type === 'TRUE_FALSE') {
        if (task.statements?.length !== 2 || !/^[PF]{2}$/.test(task.correct_answer)) fail(`${task.id}: zadanie P/F wymaga 2 stwierdzeń i klucza typu PF`);
        (task.statements || []).forEach((st) => lintText(task.id, st.text, 'stwierdzenie'));
      }
      if (task.type === 'SINGLE_CHOICE') {
        task.options.forEach((o) => lintText(task.id, o, 'opcja'));
        if (new Set(task.options.map((o) => o.replace(/\s+/g, ''))).size !== 4) fail(`${task.id}: powtórzone opcje`);
        const vals = task.options.map(evalTex);
        for (let i = 0; i < 4; i++)
          for (let j = i + 1; j < 4; j++)
            if (vals[i] !== null && vals[j] !== null && close(vals[i], vals[j])) fail(`${task.id}: dwie opcje o tej samej wartości`);
        if (!'ABCD'.includes(task.correct_answer)) fail(`${task.id}: zły klucz`);
      }
      if (task.rubric_stages) {
        const pts = task.rubric_stages.map((s) => s.points);
        if (pts[pts.length - 1] !== task.points || pts.some((p, i) => i && p <= pts[i - 1])) fail(`${task.id}: etapy muszą rosnąć do ${task.points} pkt`);
        if (task.points < 2 || task.points > 6) fail(`${task.id}: zadanie otwarte PR ma 2–6 pkt`);
        task.rubric_stages.forEach((s) => lintText(task.id, s.criterion, 'etap'));
        (task.zero_rules || []).forEach((z) => lintText(task.id, z, 'reguła zerująca'));
        lintText(task.id, task.correct_answer, 'odpowiedź');
      }
    }

    const pl = l.pill;
    const pillText = JSON.stringify({ ...pl, reading_time_minutes: undefined });
    lintText(`${lessonKey}/teoria`, pillText.replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\"/g, '"'), 'teoria');
    for (const k of ['concept_essence', 'matura_context', 'plain_polish', 'exam_trap']) if (!pl[k] || pl[k].length < 30) fail(`${lessonKey}: brak ${k}`);
    if (!pl.core_formulas.length) fail(`${lessonKey}: brak core_formulas`);
    if (!pl.worked_examples.length) fail(`${lessonKey}: brak worked_examples`);
    // Te same uzupełnienia przykładów co w kursie PP (pola `steps` i `result` czytane przez widoki)
    pl.worked_examples = pl.worked_examples.map((ex) => {
      const steps = String(ex.solution || '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, i) => ({ num: i + 1, text: line.replace(/^\d+[.)]\s*/, '') }));
      if (steps.length < 2) return { ...ex, steps };
      return { ...ex, steps: steps.slice(0, -1), result: steps[steps.length - 1].text };
    });
    for (const ex of pl.worked_examples) if (!ex.problem || !ex.steps.length) fail(`${lessonKey}: przykład bez treści lub kroków`);
    pl.worked_example = pl.worked_examples[0];

    allTasks.push(...lessonTasks);
    bpLessons.push({
      id: lessonId,
      order,
      title: l.title,
      short_title: l.short_title,
      badge: `Lekcja ${lessonKey}`,
      archetypeCode,
      estimated_time_formatted: l.time || '~5 min',
      requirements: l.requirements,
      prereq: l.prereq || [],
      theory_pill: pl
    });

    sample.push(`\n=== ${lessonKey} ${l.title}`);
    for (const task of lessonTasks) {
      sample.push(
        `[${task.id}] ${task.type} ${task.points} pkt: ${task.content.replace(/^Dokończ zdanie\. Wybierz właściwą odpowiedź spośród podanych\.\s*/, '').replace(/\n+/g, ' ⏎ ')}\n` +
          (task.options ? `   ${task.options.map((o, i) => 'ABCD'[i] + ') ' + o).join('   ')}\n` : '') +
          (task.statements ? `   ${task.statements.map((s) => s.text).join(' | ')}\n` : '') +
          (task.rubric_stages ? `   ${task.rubric_stages.map((s) => `${s.points}: ${s.criterion}`).join('\n   ')}\n` : '') +
          `   => ${task.correct_answer}\n   ${task.explanation.replace(/\*\*/g, '').replace(/\n+/g, ' ⏎ ')}`
      );
    }
  });
  blueprints.push({
    id: topicId,
    numericId: d,
    title: t.title,
    short_title: t.short_title,
    description: t.description,
    icon: t.icon,
    color: t.color,
    matura_points_range: t.matura_points_range,
    importance: t.importance,
    cke_formula_page: t.cke_formula_page,
    cke_stats: t.cke_stats,
    lessons: bpLessons
  });
}

const ids = new Set();
const contents = new Set();
for (const task of allTasks) {
  if (ids.has(task.id)) fail(`duplikat id ${task.id}`);
  ids.add(task.id);
  const ck = task.content + (task.statements ? JSON.stringify(task.statements.map((st) => st.text)) : '');
  if (contents.has(ck)) fail(`duplikat treści ${task.id}`);
  contents.add(ck);
}
const dist = { A: 0, B: 0, C: 0, D: 0 };
allTasks.filter((x) => x.type === 'SINGLE_CHOICE').forEach((x) => dist[x.correct_answer]++);
const byType = allTasks.reduce((acc, x) => ({ ...acc, [x.type]: (acc[x.type] || 0) + 1 }), {});

if (args.sample) fs.writeFileSync(args.sample, sample.join('\n'), 'utf8');

console.log(`Działy: ${blueprints.length}, lekcje: ${blueprints.reduce((s, b) => s + b.lessons.length, 0)}, zadania: ${allTasks.length}`);
console.log('Typy:', byType, '| rozkład klucza:', dist);
if (errors.length) {
  console.error(`\nBŁĘDY (${errors.length}):\n` + errors.slice(0, 60).join('\n'));
  process.exit(1);
}

// Pilot: kurs budowany działami – zapisujemy komplet tego, co już istnieje.
fs.writeFileSync(path.join(OUT_DIR, 'pr_blueprints.json'), JSON.stringify(blueprints, null, 1), 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'pr_tasks.json'), JSON.stringify(allTasks, null, 1), 'utf8');

const seedTask = (t) => ({
  id: t.id,
  type: t.type,
  points: t.points,
  maxPoints: t.points,
  title: t.title,
  source: 'JASNE • zadanie autorskie w stylu CKE',
  badge: `Lekcja ${t.lessonKey}`,
  question: t.content,
  content: t.content,
  math_statement: t.content,
  ...(t.options ? { options: t.options.map((text, i) => ({ id: 'ABCD'[i], text, content_latex: text, is_correct: 'ABCD'[i] === t.correct_answer })) } : {}),
  ...(t.statements ? { statements: t.statements } : {}),
  correct_answer: t.correct_answer,
  ...(t.type === 'NUMERIC_INPUT' ? { numeric_correct_answer: t.correct_answer } : {}),
  ...(t.rubric_stages ? { rubric_stages: t.rubric_stages, scoring_key: t.scoring_key, official_solution_steps: t.official_solution_steps } : {}),
  ...(t.zero_rules ? { zero_rules: t.zero_rules } : {}),
  requirements: t.requirements,
  explanation: t.explanation,
  matura_tip: t.matura_tip,
  hints: { level_1: t.matura_tip, level_2: (t.explanation.match(/\*\*Krok 1:\*\*\s*([\s\S]*?)(?:\n\n|$)/) || [])[1] || '' }
});
const seedCurriculum = {
  module_id: SUBJECT_ID,
  module_title: 'Matematyka – poziom rozszerzony (wymagania CKE od 2025 r.)',
  module_description: 'Kurs generowany przez scripts/math_pr/build.js – nie edytuj ręcznie.',
  total_topics: blueprints.length,
  total_lessons: blueprints.reduce((n, b) => n + b.lessons.length, 0),
  total_tasks: allTasks.length,
  topics: blueprints.map((bp) => ({
    id: bp.id,
    numericId: bp.numericId,
    topic_number: bp.numericId,
    order: bp.numericId,
    title: bp.title,
    short_title: bp.short_title,
    description: bp.description,
    icon: bp.icon,
    color: bp.color,
    importance: bp.importance,
    matura_points_range: bp.matura_points_range,
    cke_formula_page: bp.cke_formula_page,
    lessons: bp.lessons.map((l) => ({
      id: l.id,
      topic_id: bp.id,
      title: l.title,
      estimated_time_minutes: Number(String(l.estimated_time_formatted).replace(/\D/g, '')) || 5,
      estimated_time_formatted: l.estimated_time_formatted,
      required_correct_tasks: 3,
      requirements: l.requirements,
      prereq: l.prereq,
      theory_pill: l.theory_pill,
      tasks: allTasks.filter((t) => t.lessonId === l.id).map(seedTask)
    }))
  }))
};
fs.writeFileSync(SEED_PATH, JSON.stringify(seedCurriculum, null, 1) + '\n', 'utf8');
console.log('Zapisano pr_blueprints.json, pr_tasks.json i seed/curriculum/curriculum_matematyka_pr.json');
