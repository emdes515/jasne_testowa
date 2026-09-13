#!/usr/bin/env node
/**
 * check_seed_redundancy.cjs
 * ---------------------------------------------------------------------------
 * READ-ONLY diagnostic tool. It never writes, moves or deletes anything.
 *
 * Purpose:
 *   The repository used to keep the seed curriculum data in the repository root
 *   both as "aggregates" (one file per subject) and as per-unit fragments
 *   (`curriculum_dzial_<N>.json`, `curriculum_rozdzial_<N>.json`).
 *   Only the aggregates are consumed by `scripts/seed_database.cjs`.
 *
 *   This script answers the question: "are the per-unit fragments fully
 *   contained in the corresponding aggregate?" so that redundant fragments can
 *   be safely deleted instead of being migrated to `seed/curriculum/`.
 *
 * What is compared (per unit file, per topic):
 *   1. the topic identifiers            (`topics[].id`, `numericId`)
 *   2. the number of topics / lessons / tasks
 *   3. the lesson identifiers           (`lessons[].id`)
 *   4. a canonical (key-sorted) JSON deep-equality check of the whole topic
 *      object against the matching aggregate topic
 *
 * Exit codes:
 *   0 - every per-unit fragment is fully contained in an aggregate (redundant)
 *   1 - at least one per-unit fragment carries content absent from the
 *       aggregates (NOT redundant - must be kept/migrated)
 *   2 - a file could not be read or parsed
 *
 * Usage:
 *   node scripts/check_seed_redundancy.cjs
 *   node scripts/check_seed_redundancy.cjs --json     # machine-readable output
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SEARCH_DIRS = [path.join(ROOT, 'seed', 'curriculum'), ROOT];

const AGGREGATES = [
  { subject: 'matematyka-podstawowa', basename: 'curriculum_matematyka.json' },
  { subject: 'jezyk-polski', basename: 'curriculum_jezyk_polski.json' }
];

const JSON_OUT = process.argv.includes('--json');

function resolveFile(basename) {
  for (const dir of SEARCH_DIRS) {
    const candidate = path.join(dir, basename);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/** Deterministic JSON with recursively sorted object keys. */
function canonical(value) {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value && typeof value === 'object') {
    return (
      '{' +
      Object.keys(value)
        .sort()
        .map((k) => JSON.stringify(k) + ':' + canonical(value[k]))
        .join(',') +
      '}'
    );
  }
  return JSON.stringify(value === undefined ? null : value);
}

function countTasks(topic) {
  return (topic.lessons || []).reduce((acc, l) => acc + (l.tasks || []).length, 0);
}

/** Normalises any supported fragment/aggregate shape into a topic array. */
function extractTopics(json) {
  if (!json || typeof json !== 'object') return [];
  if (Array.isArray(json.topics)) return json.topics;
  if (json.topic && typeof json.topic === 'object') return [json.topic];
  return [];
}

function topicKey(topic) {
  if (topic == null) return '<null>';
  if (topic.id !== undefined) return String(topic.id);
  if (topic.numericId !== undefined) return String(topic.numericId);
  return '<no-id>';
}

function listPerUnitFiles() {
  const found = [];
  const seen = new Set();
  for (const dir of SEARCH_DIRS) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!/^curriculum_(dzial|rozdzial)_\d+\.json$/.test(name)) continue;
      const full = path.join(dir, name);
      if (seen.has(full)) continue;
      seen.add(full);
      found.push(full);
    }
  }
  return found.sort();
}

function main() {
  const report = { aggregates: [], units: [], redundant: true, errors: [] };

  // ---- Load aggregates -----------------------------------------------------
  const aggregateTopics = new Map(); // subject -> Map(topicKey -> {topic, canonical})
  const aggregateIndex = new Map(); // topicKey -> [subject, ...]

  for (const agg of AGGREGATES) {
    const file = resolveFile(agg.basename);
    if (!file) {
      report.errors.push(`Brak pliku agregatu: ${agg.basename}`);
      continue;
    }
    let json;
    try {
      json = readJson(file);
    } catch (err) {
      report.errors.push(`Nie mozna sparsowac ${file}: ${err.message}`);
      continue;
    }
    const topics = extractTopics(json);
    const map = new Map();
    let lessons = 0;
    let tasks = 0;
    for (const topic of topics) {
      lessons += (topic.lessons || []).length;
      tasks += countTasks(topic);
      const key = topicKey(topic);
      map.set(key, { topic, canonical: canonical(topic) });
      if (!aggregateIndex.has(key)) aggregateIndex.set(key, []);
      aggregateIndex.get(key).push(agg.subject);
    }
    aggregateTopics.set(agg.subject, map);
    report.aggregates.push({
      subject: agg.subject,
      file: path.relative(ROOT, file).replace(/\\/g, '/'),
      topics: topics.length,
      lessons,
      tasks
    });
  }

  // ---- Inspect per-unit fragments -----------------------------------------
  for (const file of listPerUnitFiles()) {
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    let json;
    try {
      json = readJson(file);
    } catch (err) {
      report.errors.push(`Nie mozna sparsowac ${file}: ${err.message}`);
      continue;
    }

    const topics = extractTopics(json);
    const entry = {
      file: rel,
      aggregate: null,
      subject: null,
      topics: topics.length,
      lessons: 0,
      tasks: 0,
      contained: true,
      identityMatch: true,
      deepEqual: true,
      details: []
    };

    if (topics.length === 0) {
      entry.contained = false;
      entry.identityMatch = false;
      entry.deepEqual = false;
      entry.details.push('Plik nie zawiera zadnego tematu (brak `topics[]` lub `topic`).');
    }

    for (const topic of topics) {
      entry.lessons += (topic.lessons || []).length;
      entry.tasks += countTasks(topic);

      const key = topicKey(topic);
      const subjects = aggregateIndex.get(key) || [];
      if (subjects.length === 0) {
        entry.identityMatch = false;
        entry.deepEqual = false;
        entry.contained = false;
        entry.details.push(`Temat "${key}" nie istnieje w zadnym agregacie.`);
        continue;
      }

      let matched = null;
      for (const subject of subjects) {
        const aggEntry = aggregateTopics.get(subject).get(key);
        if (aggEntry && aggEntry.canonical === canonical(topic)) {
          matched = { subject, exact: true };
          break;
        }
        if (!matched) matched = { subject, exact: false, aggEntry };
      }

      entry.subject = entry.subject || matched.subject;
      entry.aggregate = entry.aggregate || AGGREGATES.find((a) => a.subject === matched.subject).basename;

      if (!matched.exact) {
        // Identity matched but payload differs: compare structurally to explain.
        const aggTopic = matched.aggEntry.topic;
        const aggLessons = (aggTopic.lessons || []).length;
        const unitLessons = (topic.lessons || []).length;
        const aggTasks = countTasks(aggTopic);
        const unitTasks = countTasks(topic);
        const aggLessonIds = new Set((aggTopic.lessons || []).map((l) => String(l.id)));
        const missingLessons = (topic.lessons || [])
          .map((l) => String(l.id))
          .filter((id) => !aggLessonIds.has(id));

        const identical =
          canonical(aggTopic) === canonical(topic) &&
          aggLessons === unitLessons &&
          aggTasks === unitTasks;

        if (!identical) {
          entry.deepEqual = false;
          entry.contained = false;
          entry.details.push(
            `Temat "${key}": lekcje ${unitLessons}/${aggLessons}, zadania ${unitTasks}/${aggTasks}` +
              (missingLessons.length
                ? `, lekcje spoza agregatu: ${missingLessons.join(', ')}`
                : '')
          );
        }
      }
    }

    if (!entry.contained) report.redundant = false;
    report.units.push(entry);
  }

  // ---- Output --------------------------------------------------------------
  if (JSON_OUT) {
    process.stdout.write(JSON.stringify(report, null, 2) + '\n');
  } else {
    console.log('=== AGREGATY (seed/curriculum) ===');
    for (const a of report.aggregates) {
      console.log(
        `  ${a.file.padEnd(45)} [${a.subject}] działy: ${a.topics}, lekcje: ${a.lessons}, zadania: ${a.tasks}`
      );
    }
    console.log('\n=== PLIKI PER-DZIAL / PER-ROZDZIAL ===');
    for (const u of report.units) {
      const mark = u.contained ? 'REDUNDANTNY ' : 'UNIKALNY    ';
      console.log(
        `  ${mark} ${u.file.padEnd(34)} -> ${u.aggregate || '?'} | działy: ${u.topics}, lekcje: ${u.lessons}, zadania: ${u.tasks}`
      );
      for (const d of u.details) console.log(`        - ${d}`);
    }
    console.log('\n=== WERDYKT ===');
    console.log(
      report.redundant
        ? '  Wszystkie pliki per-dzial sa w calosci zawarte w agregatach -> mozna je usunac.'
        : '  Co najmniej jeden plik per-dzial zawiera tresc nieobecna w agregatach -> NIE usuwac, przeniesc do seed/curriculum/.'
    );
    if (report.errors.length) {
      console.log('\n=== BLEDY ===');
      for (const e of report.errors) console.log('  ! ' + e);
    }
  }

  if (report.errors.length) process.exit(2);
  process.exit(report.redundant ? 0 : 1);
}

main();
