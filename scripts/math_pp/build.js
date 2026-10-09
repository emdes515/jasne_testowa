/**
 * Buduje kurs matematyki PP: 15 działów × 5 lekcji (teoria Core-4) + 20 unikalnych zadań na lekcję.
 * Wyjście:
 *   src/data/math/generated/math_blueprints.json  – działy i lekcje (pigułki teorii)
 *   src/data/math/generated/all_1500_tasks.json   – zadania przypisane do lekcji
 * Uruchomienie: node scripts/math_pp/build.js [--only=3] [--sample=plik.txt]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { makeR, finalize, Retry, evalTex, close } from './lib.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '../../src/data/math/generated');
const TASKS_PER_LESSON = 20;

const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));
const only = args.only ? args.only.split(',').map(Number) : null;

const topics = [];
for (let d = 1; d <= 15; d++) {
  const file = path.join(__dirname, `dzial_${String(d).padStart(2, '0')}.js`);
  if (!fs.existsSync(file)) continue;
  if (only && !only.includes(d)) continue;
  const mod = await import(`file://${file.replace(/\\/g, '/')}`);
  topics.push(mod.default);
}

const errors = [];
const fail = (msg) => errors.push(msg);

function lintText(id, text, where) {
  const dollars = (text.match(/(?<!\\)\$/g) || []).length;
  if (dollars % 2 !== 0) fail(`${id}: nieparzysta liczba $ (${where})`);
  const checks = [
    [/undefined|NaN|Infinity|\[object/, 'śmieci JS'],
    [/\\\\[a-zA-Z]/, 'podwójny backslash przed poleceniem LaTeX'],
    [/(?<![\d,}])1\\sqrt/, 'współczynnik 1 przed pierwiastkiem'],
    [/\+\s*-|-\s*-\s*\d|\+\s*\+/, 'podwójny znak'],
    [/(?<![\d,{}])\b1(x|n|a|y)\b(?!\w)/, 'współczynnik 1 przed zmienną'],
    [/\d\.\d/, 'kropka dziesiętna zamiast przecinka'],
    [/\d{,}\d*0{6,}|\d{,}\d*9{6,}/, 'artefakt zmiennoprzecinkowy'],
    [/\\iff|\\vee|\\wedge|\\forall|\\exists|\\implies|\\Rightarrow|\\Leftrightarrow/, 'formalizm logiczny zakazany na PP'],
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
  const topicId = `dzial-${d}`;
  if (t.lessons.length !== 5) fail(`${topicId}: liczba lekcji ${t.lessons.length} != 5`);
  const bpLessons = [];
  t.lessons.forEach((l, li) => {
    const order = li + 1;
    const lessonId = `math-lesson-${d}-${order}`;
    const lessonKey = `${d}.${order}`;
    const archetypeCode = `L${d}.${order}`;
    const r = makeR(d * 1000 + order * 37);
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
      const uniqKey = raw.q + (raw.diagram ? JSON.stringify(raw.diagram) : '');
      if (!raw || seen.has(uniqKey)) continue;
      seen.add(uniqKey);
      perGen[g]++;
      const n = lessonTasks.length + 1;
      const task = finalize(
        raw,
        {
          id: `mat-pp-${d}-${order}-${String(n).padStart(2, '0')}`,
          lessonId,
          lessonKey,
          topicId,
          sectionTitle: `Dział ${d}: ${t.title}`,
          archetypeCode,
          category: t.short_title
        },
        r
      );
      lessonTasks.push(task);
    }
    if (lessonTasks.length < TASKS_PER_LESSON) {
      fail(`${lessonKey} „${l.title}”: tylko ${lessonTasks.length} unikalnych zadań (per gen: ${perGen.join(',')})`);
    }
    // kontrole zadań
    for (const task of lessonTasks) {
      lintText(task.id, task.content, 'treść');
      lintText(task.id, task.explanation, 'wyjaśnienie');
      lintText(task.id, task.matura_tip || '', 'wskazówka');
      if (!task.matura_tip) fail(`${task.id}: brak wskazówki`);
      if (task.type === 'SINGLE_CHOICE') {
        task.options.forEach((o) => lintText(task.id, o, 'opcja'));
        if (new Set(task.options.map((o) => o.replace(/\s+/g, ''))).size !== 4) fail(`${task.id}: powtórzone opcje`);
        const vals = task.options.map(evalTex);
        for (let i = 0; i < 4; i++)
          for (let j = i + 1; j < 4; j++)
            if (vals[i] !== null && vals[j] !== null && close(vals[i], vals[j])) fail(`${task.id}: dwie opcje o tej samej wartości (${task.options[i]} / ${task.options[j]})`);
        if (!'ABCD'.includes(task.correct_answer)) fail(`${task.id}: zły klucz`);
      }
      if (/rysunk|wykres(?:ie)? przedstawion/i.test(task.content) && !task.diagram && !task.numberLine) fail(`${task.id}: odwołanie do rysunku bez rysunku`);
    }
    // kontrole pigułki
    const pl = l.pill;
    const pillText = JSON.stringify({ ...pl, reading_time_minutes: undefined });
    lintText(`${lessonKey}/teoria`, pillText.replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\"/g, '"'), 'teoria');
    for (const k of ['concept_essence', 'matura_context', 'plain_polish', 'exam_trap']) if (!pl[k] || pl[k].length < 30) fail(`${lessonKey}: brak ${k}`);
    if (!pl.core_formulas.length) fail(`${lessonKey}: brak core_formulas`);
    if (!pl.worked_examples.length) fail(`${lessonKey}: brak worked_examples`);
    // SessionRunner czyta kroki z pola `steps`, a MathStudyHub – z `worked_example.solution`:
    // uzupełniamy oba warianty, żeby żaden widok nie musiał „dorabiać” przykładu z zadań lekcji.
    pl.worked_examples = pl.worked_examples.map((ex) => ({
      ...ex,
      steps:
        ex.steps ||
        String(ex.solution || '')
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line, i) => ({ num: i + 1, text: line.replace(/^\d+[.)]\s*/, '') }))
    }));
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
      theory_pill: pl
    });
    // próbka do przeglądu: po 2 zadania z każdego generatora
    const byTitle = {};
    for (const task of lessonTasks) (byTitle[task.title] = byTitle[task.title] || []).push(task);
    sample.push(`\n=== ${lessonKey} ${l.title} (${Object.entries(byTitle).map(([k, v]) => `${k}: ${v.length}`).join('; ')})`);
    for (const list of Object.values(byTitle))
      for (const task of list.slice(0, args.n ? Number(args.n) : 2)) {
        sample.push(
          `[${task.id}] ${task.content.replace(/^Dokończ zdanie\. Wybierz właściwą odpowiedź spośród podanych\.\s*/, '').replace(/\n+/g, ' ⏎ ')}\n   ${
            task.options ? task.options.map((o, i) => 'ABCD'[i] + ') ' + o).join('   ') : ''
          } => ${task.correct_answer}\n   ${task.explanation.replace(/\*\*/g, '').replace(/\n+/g, ' ⏎ ')}\n   TIP: ${task.matura_tip}${task.diagram ? '\n   DIAGRAM: ' + JSON.stringify(task.diagram.plotData ? task.diagram.plotData.segments.map((s) => [s.from, s.to, s.startDot, s.endDot]) : task.diagram).slice(0, 300) : ''}`
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
    lessons: bpLessons
  });
}

// globalne kontrole
const ids = new Set();
const contents = new Set();
for (const task of allTasks) {
  if (ids.has(task.id)) fail(`duplikat id ${task.id}`);
  ids.add(task.id);
  const ck = task.content + (task.diagram ? JSON.stringify(task.diagram) : '');
  if (contents.has(ck)) fail(`duplikat treści ${task.id}`);
  contents.add(ck);
}
const dist = { A: 0, B: 0, C: 0, D: 0 };
allTasks.filter((x) => x.type === 'SINGLE_CHOICE').forEach((x) => dist[x.correct_answer]++);

if (args.sample) fs.writeFileSync(args.sample, sample.join('\n'), 'utf8');

console.log(`Działy: ${blueprints.length}, lekcje: ${blueprints.reduce((s, b) => s + b.lessons.length, 0)}, zadania: ${allTasks.length} (unikalne treści: ${contents.size})`);
console.log('Rozkład klucza:', dist, '| NUMERIC_INPUT:', allTasks.filter((x) => x.type === 'NUMERIC_INPUT').length);
if (errors.length) {
  console.error(`\nBŁĘDY (${errors.length}):\n` + errors.slice(0, 60).join('\n'));
  process.exit(1);
}
if (!only) {
  if (blueprints.length !== 15 || allTasks.length !== 1500) {
    console.error('Niepełny kurs – nie zapisuję plików wynikowych.');
    process.exit(1);
  }
  fs.writeFileSync(path.join(OUT_DIR, 'math_blueprints.json'), JSON.stringify(blueprints, null, 1), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, 'all_1500_tasks.json'), JSON.stringify(allTasks, null, 1), 'utf8');
  console.log('Zapisano math_blueprints.json i all_1500_tasks.json');
}
