'use strict';

/**
 * Challenger M3.1 Comprehensive Empirical Adversarial Test Suite
 * Exhaustive empirical testing across all 3,821 tasks, 225 lessons, and 307 formula objects.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const katex = require('katex');

const SEED_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const MIRROR_PATH = 'c:/Users/mateu/Downloads/mat/curriculum_matematyka.json';

console.log('================================================================');
console.log('   CHALLENGER M3.1 EMPIRICAL ADVERSARIAL STRESS TEST SUITE      ');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

function check(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests++;
    const msg = `[FAIL] ${testName}${details ? ' - ' + details : ''}`;
    console.error(`  ${msg}`);
    failureDetails.push(msg);
  }
}

// -------------------------------------------------------------
// CHECK 1: File Existence, Byte-Level Equality & SHA256 Checksums
// -------------------------------------------------------------
console.log('>>> CHECK 1: Dataset Existence & Checksum Synchronization');
check(fs.existsSync(SEED_PATH), 'Master seed dataset exists at path');
check(fs.existsSync(MIRROR_PATH), 'Mirror distribution dataset exists at path');

const seedRaw = fs.readFileSync(SEED_PATH, 'utf8');
const mirrorRaw = fs.readFileSync(MIRROR_PATH, 'utf8');

const seedHash = crypto.createHash('sha256').update(seedRaw).digest('hex');
const mirrorHash = crypto.createHash('sha256').update(mirrorRaw).digest('hex');

console.log(`    Seed SHA256:   ${seedHash} (${seedRaw.length} bytes)`);
console.log(`    Mirror SHA256: ${mirrorHash} (${mirrorRaw.length} bytes)`);

check(seedHash === mirrorHash, 'Seed and mirror SHA256 hashes match exactly');
check(seedRaw.length === mirrorRaw.length, 'Seed and mirror byte lengths match exactly (5,230,328 bytes)');
check(seedRaw === mirrorRaw, 'Seed and mirror strings are 100% verbatim identical');

// -------------------------------------------------------------
// CHECK 2: Curriculum Structure & Task Topology
// -------------------------------------------------------------
console.log('\n>>> CHECK 2: Curriculum Hierarchy & Task Topology');

const data = JSON.parse(seedRaw);
check(Array.isArray(data.topics), 'data.topics is an Array');
check(data.topics.length === 15, 'Exactly 15 topics/sections present');

let totalLessons = 0;
let totalTasks = 0;
const allTaskIds = new Set();
const duplicateTaskIds = [];
const taskTypesCount = {};

for (const topic of data.topics) {
  totalLessons += (topic.lessons || []).length;
  for (const lesson of topic.lessons || []) {
    for (const task of lesson.tasks || []) {
      totalTasks++;
      taskTypesCount[task.type] = (taskTypesCount[task.type] || 0) + 1;
      if (allTaskIds.has(task.id)) {
        duplicateTaskIds.push(task.id);
      }
      allTaskIds.add(task.id);
    }
  }
}

console.log(`    Total Lessons:   ${totalLessons}`);
console.log(`    Total Tasks:     ${totalTasks}`);
console.log(`    Unique Task IDs: ${allTaskIds.size}`);
console.log('    Task Types Breakdown:', JSON.stringify(taskTypesCount, null, 2));

check(totalLessons === 225, 'Exactly 225 lessons present in curriculum');
check(totalTasks === 3821, 'Exactly 3,821 unique tasks in curriculum');
check(duplicateTaskIds.length === 0, 'Zero duplicate task IDs across all 3,821 tasks');

// -------------------------------------------------------------
// CHECK 3: Options Integrity & options.includes(correct_answer)
// -------------------------------------------------------------
console.log('\n>>> CHECK 3: Multiple-Choice & Options Integrity');

let tasksWithOptions = 0;
let singleChoiceCount = 0;
let trueFalseWithOptions = 0;
let trueFalseWithoutOptions = 0;
let answerMismatches = [];
let duplicateOptionsTasks = [];
let prefixOptionsTasks = [];
let emptyOptionTasks = [];
let invalidOptionCountTasks = [];

// Strict prefix regex targeting option letters: Odp A., A., A), B., etc.
const strictPrefixRegex = /^(?:(?:Odp\.?|Odpowiedź)?\s*)?[A-D][.:)]\s+/i;

for (const topic of data.topics) {
  for (const lesson of topic.lessons) {
    for (const task of lesson.tasks) {
      const tid = task.id;
      const type = task.type;
      const opts = task.options;
      const ans = task.correct_answer;

      if (type === 'SINGLE_CHOICE') {
        singleChoiceCount++;
        if (!Array.isArray(opts) || opts.length !== 4) {
          invalidOptionCountTasks.push({ id: tid, len: opts ? opts.length : null });
        }
      }

      if (type === 'TRUE_FALSE') {
        if (Array.isArray(opts) && opts.length > 0) {
          trueFalseWithOptions++;
          if (opts.length !== 2) {
            invalidOptionCountTasks.push({ id: tid, len: opts.length });
          }
        } else {
          trueFalseWithoutOptions++;
        }
      }

      if (Array.isArray(opts) && opts.length > 0) {
        tasksWithOptions++;

        // Assert options.includes(correct_answer)
        if (!opts.includes(ans)) {
          answerMismatches.push({ id: tid, type, ans, opts });
        }

        // Duplicate options check
        const trimmed = opts.map(o => (typeof o === 'string' ? o.trim() : String(o)));
        if (new Set(trimmed).size !== trimmed.length) {
          duplicateOptionsTasks.push({ id: tid, opts });
        }

        // Prefix and empty option checks
        for (const opt of opts) {
          if (typeof opt !== 'string' || opt.trim() === '') {
            emptyOptionTasks.push({ id: tid, opt });
          }
          if (typeof opt === 'string' && strictPrefixRegex.test(opt.trim())) {
            // Exclude math equations like $A = 5$ or $B = \dots$
            if (!opt.startsWith('$A =') && !opt.startsWith('$B =') && !opt.startsWith('$C =') && !opt.startsWith('$D =')) {
              prefixOptionsTasks.push({ id: tid, opt });
            }
          }
        }
      }
    }
  }
}

console.log(`    Tasks with options evaluated: ${tasksWithOptions}`);
console.log(`    SINGLE_CHOICE tasks:          ${singleChoiceCount}`);
console.log(`    TRUE_FALSE with options:      ${trueFalseWithOptions}`);
console.log(`    TRUE_FALSE without options:   ${trueFalseWithoutOptions}`);

check(tasksWithOptions === 2154, 'Exactly 2,154 tasks have options evaluated (1,902 SINGLE_CHOICE + 252 TRUE_FALSE)');
check(answerMismatches.length === 0, '100% of tasks with options satisfy options.includes(correct_answer) (0 mismatches)', `Mismatches: ${JSON.stringify(answerMismatches)}`);
check(duplicateOptionsTasks.length === 0, 'Zero tasks with duplicate options');
check(prefixOptionsTasks.length === 0, 'Zero tasks with option prefixes (Odp A., A., B., etc.)');
check(emptyOptionTasks.length === 0, 'Zero empty or non-string options');
check(invalidOptionCountTasks.length === 0, 'All SINGLE_CHOICE have exactly 4 options and TRUE_FALSE with options have 2');

// -------------------------------------------------------------
// CHECK 4: Open Tasks Scoring Keys
// -------------------------------------------------------------
console.log('\n>>> CHECK 4: Open Tasks Scoring Keys (OPEN_PROOF & OPEN_GENERAL)');

let totalOpenTasks = 0;
let openProofCount = 0;
let openGeneralCount = 0;
let missingScoringKeyTasks = [];
let dzial1to3OpenTasks = 0;
let dzial1to3MissingKeys = 0;

for (let ti = 0; ti < data.topics.length; ti++) {
  const topic = data.topics[ti];
  const isDzial1to3 = (ti <= 2);

  for (const lesson of topic.lessons) {
    for (const task of lesson.tasks) {
      if (task.type === 'OPEN_PROOF' || task.type === 'OPEN_GENERAL') {
        totalOpenTasks++;
        if (task.type === 'OPEN_PROOF') openProofCount++;
        if (task.type === 'OPEN_GENERAL') openGeneralCount++;
        if (isDzial1to3) dzial1to3OpenTasks++;

        let hasKey = false;
        if (typeof task.scoring_key === 'string' && task.scoring_key.trim().length > 0) {
          hasKey = true;
        } else if (Array.isArray(task.scoring_key) && task.scoring_key.length > 0 && task.scoring_key.every(s => typeof s === 'string' && s.trim().length > 0)) {
          hasKey = true;
        }

        if (!hasKey) {
          missingScoringKeyTasks.push({ id: task.id, type: task.type });
          if (isDzial1to3) dzial1to3MissingKeys++;
        }
      }
    }
  }
}

console.log(`    Total Open Tasks:        ${totalOpenTasks} (OPEN_PROOF: ${openProofCount}, OPEN_GENERAL: ${openGeneralCount})`);
console.log(`    Działy 1–3 Open Tasks:   ${dzial1to3OpenTasks}`);

check(totalOpenTasks === 676, 'Exactly 676 open tasks in curriculum');
check(missingScoringKeyTasks.length === 0, '100% of open tasks have non-empty scoring_key (0 missing)');
check(dzial1to3MissingKeys === 0, 'All open tasks in Działy 1–3 have scoring_key populated (0 missing)');

// -------------------------------------------------------------
// CHECK 5: CKE 2023 Formula Sheet Page References (307 Formulas)
// -------------------------------------------------------------
console.log('\n>>> CHECK 5: CKE 2023 Formula Sheet Page Mapping (307 Formulas)');

let totalFormulas = 0;
let formulasInSheet = 0;
let formulasNotInSheet = 0;
let invalidPages = [];

for (const topic of data.topics) {
  for (const lesson of topic.lessons) {
    if (lesson.theory_pill && Array.isArray(lesson.theory_pill.core_formulas)) {
      for (const cf of lesson.theory_pill.core_formulas) {
        totalFormulas++;
        if (cf.in_cke_sheet === true) {
          formulasInSheet++;
          if (typeof cf.cke_page !== 'string') {
            invalidPages.push({ lesson: lesson.id, title: cf.title, reason: 'not a string' });
          } else {
            const pageNums = (cf.cke_page.match(/\d+/g) || []).map(Number);
            if (pageNums.length === 0 || pageNums.some(p => p < 4 || p > 32)) {
              invalidPages.push({ lesson: lesson.id, title: cf.title, page: cf.cke_page, reason: 'page not in [4..32]' });
            }
          }
        } else if (cf.in_cke_sheet === false) {
          formulasNotInSheet++;
          if (cf.cke_page !== null) {
            invalidPages.push({ lesson: lesson.id, title: cf.title, page: cf.cke_page, reason: 'not null when false' });
          }
        } else {
          invalidPages.push({ lesson: lesson.id, title: cf.title, reason: 'missing boolean flag' });
        }
      }
    }
  }
}

console.log(`    Total Core Formulas:      ${totalFormulas}`);
console.log(`    In CKE Sheet:             ${formulasInSheet}`);
console.log(`    Not In CKE Sheet:         ${formulasNotInSheet}`);

check(totalFormulas === 307, 'Exactly 307 core formulas verified across curriculum');
check(formulasInSheet === 211, 'Exactly 211 formulas marked in_cke_sheet: true');
check(formulasNotInSheet === 96, 'Exactly 96 formulas marked in_cke_sheet: false');
check(invalidPages.length === 0, '100% of CKE formula pages are valid (pages strictly in [4..32] or null)', `Invalid: ${JSON.stringify(invalidPages)}`);

// -------------------------------------------------------------
// CHECK 6: Adversarial Stress Test: Delimiter Balance & KaTeX Integrity
// -------------------------------------------------------------
console.log('\n>>> CHECK 6: Adversarial Stress Test: KaTeX Math Blocks & Delimiter Balance');

let katexTestedBlocks = 0;
let katexParseErrors = [];
let unbalancedDollarFields = [];

function checkKaTeXIntegrity(str, p) {
  if (typeof str !== 'string') return;
  const mathRegex = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let match;
  while ((match = mathRegex.exec(str)) !== null) {
    katexTestedBlocks++;
    const math = match[1] || match[2];
    try {
      katex.renderToString(math, { throwOnError: true });
    } catch (err) {
      katexParseErrors.push({ path: p, math, error: err.message });
    }
  }

  const dollarCount = (str.match(/(?<!\\)\$/g) || []).length;
  if (dollarCount % 2 !== 0) {
    unbalancedDollarFields.push({ path: p, dollarCount, text: str });
  }
}

function traverseKaTeX(obj, p = 'root') {
  if (typeof obj === 'string') {
    checkKaTeXIntegrity(obj, p);
  } else if (Array.isArray(obj)) {
    obj.forEach((x, i) => traverseKaTeX(x, `${p}[${i}]`));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      traverseKaTeX(v, `${p}.${k}`);
    }
  }
}

traverseKaTeX(data);

console.log(`    Total KaTeX math blocks rendered: ${katexTestedBlocks}`);
console.log(`    KaTeX syntax/parse errors:        ${katexParseErrors.length}`);
console.log(`    Unbalanced dollar delimiter fields: ${unbalancedDollarFields.length}`);

check(katexTestedBlocks > 20000, `Tested over 20,000 KaTeX math blocks (actual: ${katexTestedBlocks})`);
check(katexParseErrors.length === 0, 'Zero KaTeX parse errors when rendering matched math blocks');
check(unbalancedDollarFields.length === 0, 'Zero unbalanced dollar delimiter fields across entire dataset');

// -------------------------------------------------------------
// CHECK 7: UI Labels & Sanitization in SessionRunner.tsx
// -------------------------------------------------------------
console.log('\n>>> CHECK 7: UI Labels & Sanitization in SessionRunner.tsx');
const sessionRunnerPath = path.resolve(__dirname, '..', 'src', 'components', 'SessionRunner.tsx');
check(fs.existsSync(sessionRunnerPath), 'SessionRunner.tsx exists');
const sessionRunnerCode = fs.readFileSync(sessionRunnerPath, 'utf8');

check(!sessionRunnerCode.includes('Patent maturalny CKE'), 'No residual "Patent maturalny CKE" string in SessionRunner.tsx');
check(!sessionRunnerCode.includes('Karta CKE:'), 'No residual "Karta CKE:" string in SessionRunner.tsx');
check(!sessionRunnerCode.includes('Wskazówka egzaminatora CKE'), 'No residual "Wskazówka egzaminatora CKE" string in SessionRunner.tsx');
check(sessionRunnerCode.includes('Patent maturalny'), 'Contains clean "Patent maturalny" label');
check(sessionRunnerCode.includes('Karta wzorów:'), 'Contains clean "Karta wzorów:" label');
check(sessionRunnerCode.includes('Wskazówka egzaminatora'), 'Contains clean "Wskazówka egzaminatora" label');

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL CHECKS EXECUTED: ${totalTests}`);
console.log(`PASSED:                ${passedTests}`);
console.log(`FAILED:                ${failedTests}`);
console.log('================================================================');

if (failedTests > 0) {
  console.error('\n[RESULT: FAIL] - Core checklist failed.');
  process.exit(1);
} else {
  console.log('\n[RESULT: PASS] - All verification criteria passed successfully (Exit code 0).');
  process.exit(0);
}
