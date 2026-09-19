'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const katex = require('katex');
const { execSync } = require('child_process');

const SEED_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const MIRROR_PATH = 'c:/Users/mateu/Downloads/mat/curriculum_matematyka.json';

console.log('=== CHALLENGER M2.1 ADVERSARIAL AUDIT & EMPIRICAL HARNESS ===\n');

let failedTests = 0;
let passedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName} - ${details}`);
    failedTests++;
  }
}

// -------------------------------------------------------------
// CHECK 1: File Existence and Checksums
// -------------------------------------------------------------
console.log('--- Checking File Existence and Synchronized Checksums ---');
assert(fs.existsSync(SEED_PATH), 'Seed file exists at path');
assert(fs.existsSync(MIRROR_PATH), 'Mirror file exists at path');

const seedRaw = fs.readFileSync(SEED_PATH, 'utf8');
const mirrorRaw = fs.readFileSync(MIRROR_PATH, 'utf8');

const seedHash = crypto.createHash('sha256').update(seedRaw).digest('hex');
const mirrorHash = crypto.createHash('sha256').update(mirrorRaw).digest('hex');

console.log(`Seed SHA256:   ${seedHash} (${seedRaw.length} bytes)`);
console.log(`Mirror SHA256: ${mirrorHash} (${mirrorRaw.length} bytes)`);
assert(seedHash === mirrorHash, 'Seed and mirror files are bit-for-bit identical');

// -------------------------------------------------------------
// CHECK 2: Empirical test for [object Object]
// -------------------------------------------------------------
console.log('\n--- Checking for [object Object] instances ---');
const seedObjectMatches = seedRaw.match(/\[object\s+Object\]/g) || [];
const mirrorObjectMatches = mirrorRaw.match(/\[object\s+Object\]/g) || [];
assert(seedObjectMatches.length === 0, 'Seed file has 0 instances of "[object Object]"', `Found: ${seedObjectMatches.length}`);
assert(mirrorObjectMatches.length === 0, 'Mirror file has 0 instances of "[object Object]"', `Found: ${mirrorObjectMatches.length}`);

// Also check loose object stringification
const looseSeedObj = seedRaw.match(/object Object/gi) || [];
assert(looseSeedObj.length === 0, 'Seed file has 0 instances of loose "object Object"', `Found: ${looseSeedObj.length}`);

// -------------------------------------------------------------
// CHECK 3: Parse JSON & Structure Integrity
// -------------------------------------------------------------
console.log('\n--- Checking JSON Structure and core_formulas Object Format ---');
let data;
try {
  data = JSON.parse(seedRaw);
  assert(true, 'Seed JSON parses cleanly');
} catch (e) {
  assert(false, 'Seed JSON parses cleanly', e.message);
  process.exit(1);
}

let totalTopics = data.topics.length;
let totalLessons = 0;
let totalCoreFormulas = 0;
let nonObjectCoreFormulas = 0;
let rawSlashFractionsP = [];
let rawSlashFractionsQ = [];
let otherSlashFractions = [];
let ckeInTips = [];
let ckeInEntireDataset = [];

data.topics.forEach((topic, tIdx) => {
  topic.lessons.forEach((lesson, lIdx) => {
    totalLessons++;
    const cf = lesson.theory_pill?.core_formulas;
    if (cf) {
      if (!Array.isArray(cf)) {
        nonObjectCoreFormulas++;
      } else {
        cf.forEach((item, fIdx) => {
          totalCoreFormulas++;
          if (typeof item !== 'object' || item === null) {
            nonObjectCoreFormulas++;
            return;
          }

          const tip = item.matura_tip;
          if (typeof tip === 'string') {
            // Check for raw slash fraction p = -b/(2a) or p = -b/2a
            const pMatch = tip.match(/(?<!\\frac\{b\}\{)p\s*=\s*-b\s*\/\s*\(?2a\)?/gi);
            if (pMatch) {
              rawSlashFractionsP.push({ lesson: lesson.id, fIdx, tip, matches: pMatch });
            }

            // Check for raw slash fraction q = -delta/(4a) or q = -\Delta/4a
            const qMatch = tip.match(/(?<!\\frac\{\\Delta\}\{)q\s*=\s*-(?:\\Delta|Delta|delta)\s*\/\s*\(?4a\)?/gi);
            if (qMatch) {
              rawSlashFractionsQ.push({ lesson: lesson.id, fIdx, tip, matches: qMatch });
            }

            // Check for other slash fractions like 1/3, 1/2 outside math mode or unformatted
            const slashFractionMatch = tip.match(/\b\d+\/\d+\b/g);
            if (slashFractionMatch) {
              otherSlashFractions.push({ lesson: lesson.id, fIdx, matches: slashFractionMatch });
            }

            // Check for Karta CKE / Karty CKE
            const ckeMatch = tip.match(/\b(?:w\s+)?(?:karcie|karty|karta|kartę|kartą)\s+(?:wzor[oó]w\s+)?cke\b/gi);
            if (ckeMatch) {
              ckeInTips.push({ lesson: lesson.id, fIdx, tip, matches: ckeMatch });
            }
          }
        });
      }
    }
  });
});

console.log(`Total topics: ${totalTopics}`);
console.log(`Total lessons: ${totalLessons}`);
console.log(`Total core_formulas: ${totalCoreFormulas}`);

assert(totalLessons === 225, 'Total lessons is exactly 225');
assert(nonObjectCoreFormulas === 0, 'All core_formulas are objects (0 non-objects)', `Found: ${nonObjectCoreFormulas}`);
assert(rawSlashFractionsP.length === 0, 'Zero raw slash fractions p = -b/(2a) in core_formulas[].matura_tip', JSON.stringify(rawSlashFractionsP));
assert(rawSlashFractionsQ.length === 0, 'Zero raw slash fractions q = -delta/(4a) in core_formulas[].matura_tip', JSON.stringify(rawSlashFractionsQ));
assert(ckeInTips.length === 0, 'Zero occurrences of "Karta CKE" / "Karty CKE" in core_formulas[].matura_tip', JSON.stringify(ckeInTips));

// -------------------------------------------------------------
// CHECK 4: Dataset-Wide Check for "Karta CKE"
// -------------------------------------------------------------
console.log('\n--- Checking Dataset-Wide for "Karta CKE" / "Karty CKE" ---');
const globalCkeMatches = seedRaw.match(/(?:w\s+)?(?:karcie|karty|karta|kartę|kartą)\s+(?:wzor[oó]w\s+)?cke/gi) || [];
assert(globalCkeMatches.length === 0, 'Entire dataset has 0 occurrences of "Karta CKE" / "Karty CKE"', `Found ${globalCkeMatches.length}: ${JSON.stringify(globalCkeMatches.slice(0, 5))}`);

// -------------------------------------------------------------
// CHECK 5: Check 5 Absolute Error Erroneous Tips Replaced
// -------------------------------------------------------------
console.log('\n--- Checking 5 Erroneous Absolute Error Tips in Dział 1 ---');
const errTipSubstring = 'Błąd bezwzględny to |dokładna - przybliżona|';
const errMatches = seedRaw.match(new RegExp(errTipSubstring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || [];
console.log(`Total occurrences of absolute error tip across whole dataset: ${errMatches.length}`);

// Check specific formulas in lesson-1-1, lesson-1-5, lesson-1-6
const l1_1 = data.topics[0].lessons.find(l => l.id === 'lesson-1-1');
const l1_5 = data.topics[0].lessons.find(l => l.id === 'lesson-1-5');
const l1_6 = data.topics[0].lessons.find(l => l.id === 'lesson-1-6');

assert(!l1_1.theory_pill.core_formulas[0].matura_tip.includes(errTipSubstring), 'lesson-1-1 formula 0 tip does not contain absolute error text');
assert(!l1_1.theory_pill.core_formulas[1].matura_tip.includes(errTipSubstring), 'lesson-1-1 formula 1 tip does not contain absolute error text');
assert(!l1_5.theory_pill.core_formulas[0].matura_tip.includes(errTipSubstring), 'lesson-1-5 formula 0 tip does not contain absolute error text');
assert(!l1_5.theory_pill.core_formulas[1].matura_tip.includes(errTipSubstring), 'lesson-1-5 formula 1 tip does not contain absolute error text');
assert(!l1_6.theory_pill.core_formulas[0].matura_tip.includes(errTipSubstring), 'lesson-1-6 formula 0 tip does not contain absolute error text');

// Verify authentic topics in those formulas
assert(l1_1.theory_pill.core_formulas[0].matura_tip.includes('nierówność ostra'), 'lesson-1-1 formula 0 tip explains intervals');
assert(l1_1.theory_pill.core_formulas[1].matura_tip.includes('suma $A \\cup B$'), 'lesson-1-1 formula 1 tip explains union/intersection');
assert(l1_5.theory_pill.core_formulas[0].matura_tip.includes('Mnożnik podwyżki'), 'lesson-1-5 formula 0 tip explains percentage multiplier');
assert(l1_5.theory_pill.core_formulas[1].matura_tip.includes('wielkość bazową'), 'lesson-1-5 formula 1 tip explains base value in percentage');
assert(l1_6.theory_pill.core_formulas[0].matura_tip.includes('punkty procentowe'), 'lesson-1-6 formula 0 tip explains percentage points');

// -------------------------------------------------------------
// CHECK 6: KaTeX Parse Integrity Across All Math Delimiters
// -------------------------------------------------------------
console.log('\n--- Checking KaTeX Parse Integrity Across All Strings ---');
let parseErrors = [];
function checkKatex(val, pathStr) {
  if (typeof val === 'string') {
    const mathRegex = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
    let m;
    while ((m = mathRegex.exec(val)) !== null) {
      const math = m[1] || m[2];
      try {
        katex.renderToString(math, { throwOnError: true });
      } catch (err) {
        parseErrors.push({ pathStr, math, error: err.message });
      }
    }
  } else if (Array.isArray(val)) {
    val.forEach((v, i) => checkKatex(v, `${pathStr}[${i}]`));
  } else if (val && typeof val === 'object') {
    Object.entries(val).forEach(([k, v]) => checkKatex(v, `${pathStr}.${k}`));
  }
}
checkKatex(data, 'root');
assert(parseErrors.length === 0, 'Zero KaTeX parse errors across entire dataset', `Errors found: ${parseErrors.length} (${JSON.stringify(parseErrors.slice(0, 3))})`);

// -------------------------------------------------------------
// CHECK 7: Idempotency of scripts/standardize_math_curriculum.cjs
// -------------------------------------------------------------
console.log('\n--- Checking Idempotency of scripts/standardize_math_curriculum.cjs ---');
const beforeRunHash = crypto.createHash('sha256').update(fs.readFileSync(SEED_PATH, 'utf8')).digest('hex');

console.log('Executing pass 1 of standardize_math_curriculum.cjs...');
try {
  execSync('node scripts/standardize_math_curriculum.cjs', { stdio: 'pipe' });
} catch (e) {
  console.error('Pass 1 failed to execute:', e.message);
}

const pass1Raw = fs.readFileSync(SEED_PATH, 'utf8');
const pass1Hash = crypto.createHash('sha256').update(pass1Raw).digest('hex');
console.log(`After pass 1 SHA256: ${pass1Hash}`);

console.log('Executing pass 2 of standardize_math_curriculum.cjs...');
try {
  execSync('node scripts/standardize_math_curriculum.cjs', { stdio: 'pipe' });
} catch (e) {
  console.error('Pass 2 failed to execute:', e.message);
}

const pass2Raw = fs.readFileSync(SEED_PATH, 'utf8');
const pass2Hash = crypto.createHash('sha256').update(pass2Raw).digest('hex');
console.log(`After pass 2 SHA256: ${pass2Hash}`);

assert(pass1Hash === pass2Hash, 'Script execution is strictly idempotent (Pass 1 hash === Pass 2 hash)');
assert(pass1Raw.length === pass2Raw.length, `Byte length unchanged after multiple runs (${pass1Raw.length} bytes)`);

// Check if double dollar or corrupted math occurred after re-running
const tripleDollars = pass2Raw.match(/\${3,}/g) || [];
assert(tripleDollars.length === 0, 'Zero triple-dollars ($$$) or delimiter explosion after idempotent run', `Found: ${tripleDollars.length}`);

const pass2ObjectMatches = pass2Raw.match(/\[object\s+Object\]/g) || [];
assert(pass2ObjectMatches.length === 0, 'Still 0 instances of "[object Object]" after second run');

// Check mirror after run 2
const mirror2Raw = fs.readFileSync(MIRROR_PATH, 'utf8');
const mirror2Hash = crypto.createHash('sha256').update(mirror2Raw).digest('hex');
assert(pass2Hash === mirror2Hash, 'Mirror remains synchronized with seed after multiple runs');

// Summary
console.log('\n=============================================================');
console.log(`RESULTS: ${passedTests} passed, ${failedTests} failed.`);
if (failedTests === 0) {
  console.log('VERDICT: APPROVE');
  process.exit(0);
} else {
  console.log('VERDICT: REJECT');
  process.exit(1);
}
