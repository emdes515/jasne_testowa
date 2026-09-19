'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const katex = require('katex');
const { execSync } = require('child_process');

const SEED_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const MIRROR_PATH = 'c:/Users/mateu/Downloads/mat/curriculum_matematyka.json';

console.log('===============================================================');
console.log('=== EMPIRICAL CHALLENGER M2.2 - THOROUGH VERIFICATION HARNESS ===');
console.log('===============================================================\n');

let passCount = 0;
let failCount = 0;
const failures = [];

function check(desc, condition, extraInfo = '') {
  if (condition) {
    console.log(`[PASS] ${desc}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${desc} | ${extraInfo}`);
    failCount++;
    failures.push({ desc, extraInfo });
  }
}

// -------------------------------------------------------------
// 1. Check file existence & SHA256 match
// -------------------------------------------------------------
console.log('\n--- 1. SHA256 & Synchronization Verification ---');
check('Seed file exists', fs.existsSync(SEED_PATH), SEED_PATH);
check('Mirror file exists', fs.existsSync(MIRROR_PATH), MIRROR_PATH);

const seedBuf = fs.readFileSync(SEED_PATH);
const mirrorBuf = fs.readFileSync(MIRROR_PATH);

const seedHash = crypto.createHash('sha256').update(seedBuf).digest('hex');
const mirrorHash = crypto.createHash('sha256').update(mirrorBuf).digest('hex');

console.log(`Seed SHA256:   ${seedHash} (${seedBuf.length} bytes)`);
console.log(`Mirror SHA256: ${mirrorHash} (${mirrorBuf.length} bytes)`);

check('SHA256 checksums match exactly', seedHash === mirrorHash, `Seed: ${seedHash}, Mirror: ${mirrorHash}`);
check('Byte lengths match exactly', seedBuf.length === mirrorBuf.length, `Seed: ${seedBuf.length}, Mirror: ${mirrorBuf.length}`);

// -------------------------------------------------------------
// 2. Parse JSON & Data Integrity
// -------------------------------------------------------------
console.log('\n--- 2. JSON Structure and Negative String Cleanliness ---');
let data;
try {
  data = JSON.parse(seedBuf.toString('utf8'));
  check('Seed parses as valid JSON', true);
} catch (e) {
  check('Seed parses as valid JSON', false, e.message);
  process.exit(1);
}

const rawText = seedBuf.toString('utf8');

// Check negative strings
const objObjMatches = rawText.match(/\[object Object\]/g) || [];
check('Zero "[object Object]" anywhere in raw JSON', objObjMatches.length === 0, `Found: ${objObjMatches.length}`);

const residualCkeMatches = rawText.match(/(?:karta|karty|karcie|kartę|kartą)\s+(?:wzor[oó]w\s+)?cke/gi) || [];
check('Zero residual "Karta CKE" / "Karty CKE" in entire dataset', residualCkeMatches.length === 0, `Found: ${residualCkeMatches.length} (${JSON.stringify(residualCkeMatches.slice(0, 5))})`);

const oldErrTipMatches = rawText.match(/\|dokładna\s*-\s*przybliżona\|/gi) || [];
check('Zero residual "|dokładna - przybliżona|" in entire dataset', oldErrTipMatches.length === 0, `Found: ${oldErrTipMatches.length}`);

const oldErrFullMatches = rawText.match(/Błąd\s+bezwzględny\s+to\s+\|dokładna/gi) || [];
check('Zero residual "Błąd bezwzględny to |dokładna" in entire dataset', oldErrFullMatches.length === 0, `Found: ${oldErrFullMatches.length}`);

// Check control character escapes in raw JSON
const formFeedCount = (rawText.match(/\x0c/g) || []).length;
check('Zero raw 0x0C form-feed characters in JSON', formFeedCount === 0, `Found: ${formFeedCount}`);

const bellCount = (rawText.match(/\x07/g) || []).length;
check('Zero raw 0x07 bell characters in JSON', bellCount === 0, `Found: ${bellCount}`);

// -------------------------------------------------------------
// 3. Verification of the 5 replaced tips + lesson-1-6 formula 1
// -------------------------------------------------------------
console.log('\n--- 3. Specific Verification of the 5 Replaced Tips & Lesson 1-6 Formula 1 ---');

const dzial1 = data.topics.find(t => t.id === 'dzial-1');
check('Dział 1 exists in dataset', !!dzial1);

const l1_1 = dzial1?.lessons.find(l => l.id === 'lesson-1-1');
const l1_5 = dzial1?.lessons.find(l => l.id === 'lesson-1-5');
const l1_6 = dzial1?.lessons.find(l => l.id === 'lesson-1-6');

check('lesson-1-1 exists', !!l1_1);
check('lesson-1-5 exists', !!l1_5);
check('lesson-1-6 exists', !!l1_6);

const targetFormulas = [
  { lesson: l1_1, lid: 'lesson-1-1', fIdx: 0, expectedTitle: 'Przedział domknięty i otwarty', expectedTopicKeyword: 'nierówność ostra' },
  { lesson: l1_1, lid: 'lesson-1-1', fIdx: 1, expectedTitle: 'Suma i iloczyn przedziałów', expectedTopicKeyword: 'suma $A \\cup B$' },
  { lesson: l1_5, lid: 'lesson-1-5', fIdx: 0, expectedTitle: 'Mnożnik podwyżki i obniżki procentowej', expectedTopicKeyword: 'Mnożnik podwyżki' },
  { lesson: l1_5, lid: 'lesson-1-5', fIdx: 1, expectedTitle: 'Jaki procent liczby b stanowi liczba a', expectedTopicKeyword: 'wielkość bazową' },
  { lesson: l1_6, lid: 'lesson-1-6', fIdx: 0, expectedTitle: 'Różnica w punktach procentowych', expectedTopicKeyword: 'punkty procentowe' },
];

for (const tf of targetFormulas) {
  const f = tf.lesson?.theory_pill?.core_formulas?.[tf.fIdx];
  const tip = f?.matura_tip || '';
  
  check(`${tf.lid} formula ${tf.fIdx} exists and has title '${tf.expectedTitle}'`, f && f.title === tf.expectedTitle, `Actual title: ${f?.title}`);
  check(`${tf.lid} formula ${tf.fIdx} does NOT contain '|dokładna - przybliżona|'`, !tip.includes('|dokładna - przybliżona|'), `Tip: ${tip}`);
  check(`${tf.lid} formula ${tf.fIdx} does NOT contain 'Błąd bezwzględny to'`, !tip.includes('Błąd bezwzględny to'), `Tip: ${tip}`);
  check(`${tf.lid} formula ${tf.fIdx} contains relevant pedagogical content ('${tf.expectedTopicKeyword}')`, tip.includes(tf.expectedTopicKeyword), `Tip: ${tip}`);
  check(`${tf.lid} formula ${tf.fIdx} uses 'karcie wzorów' instead of 'Karcie CKE'`, !tip.includes('Karcie CKE') && !tip.includes('Karta CKE'), `Tip: ${tip}`);

  // Test KaTeX formulas inside the tip
  const mathMatches = tip.match(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g) || [];
  check(`${tf.lid} formula ${tf.fIdx} has KaTeX wrapped expressions`, mathMatches.length > 0, `Matches: ${mathMatches.length}`);
  
  for (const m of mathMatches) {
    const raw = m.startsWith('$$') ? m.slice(2, -2) : m.slice(1, -1);
    try {
      katex.renderToString(raw, { throwOnError: true });
      check(`${tf.lid} f${tf.fIdx} KaTeX valid: ${m}`, true);
    } catch (e) {
      check(`${tf.lid} f${tf.fIdx} KaTeX valid: ${m}`, false, e.message);
    }
  }
}

// Check lesson-1-6 formula 1 (legitimate absolute error formula)
console.log('\n--- Checking Lesson 1-6 Formula 1 (Legitimate Absolute Error) ---');
const f1_6_1 = l1_6?.theory_pill?.core_formulas?.[1];
check('lesson-1-6 formula 1 exists', !!f1_6_1);
check('lesson-1-6 formula 1 title is "Błąd bezwzględny i względny"', f1_6_1?.title === 'Błąd bezwzględny i względny', `Title: ${f1_6_1?.title}`);
check('lesson-1-6 formula 1 latex is intact', f1_6_1?.latex && f1_6_1.latex.includes('\\Delta = |x - x_0|'), `Latex: ${f1_6_1?.latex}`);

// Validate KaTeX of formula 1 latex
try {
  katex.renderToString(f1_6_1?.latex || '', { throwOnError: true });
  check('lesson-1-6 formula 1 latex renders cleanly in KaTeX', true);
} catch (e) {
  check('lesson-1-6 formula 1 latex renders cleanly in KaTeX', false, e.message);
}

const tip1_6_1 = f1_6_1?.matura_tip || '';
console.log('lesson-1-6 formula 1 matura_tip:', tip1_6_1);
check('lesson-1-6 formula 1 matura_tip is present and non-empty', tip1_6_1.length > 0);
check('lesson-1-6 formula 1 references "karty wzorów"', tip1_6_1.includes('karty wzorów'), `Tip: ${tip1_6_1}`);
check('lesson-1-6 formula 1 does NOT reference "Karty CKE" or "Karta CKE"', !tip1_6_1.includes('CKE'), `Tip: ${tip1_6_1}`);

// Validate KaTeX inside tip1_6_1
const tip1_6_1_math = tip1_6_1.match(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g) || [];
check('lesson-1-6 formula 1 matura_tip contains KaTeX math', tip1_6_1_math.length > 0, `Matches: ${tip1_6_1_math.length}`);
for (const m of tip1_6_1_math) {
  const raw = m.startsWith('$$') ? m.slice(2, -2) : m.slice(1, -1);
  try {
    katex.renderToString(raw, { throwOnError: true });
    check(`lesson-1-6 f1 tip math '${m}' renders cleanly in KaTeX`, true);
  } catch (e) {
    check(`lesson-1-6 f1 tip math '${m}' renders cleanly in KaTeX`, false, e.message);
  }
}

// -------------------------------------------------------------
// 4. Task Counts and Deduplication in Dział 1 and Globally
// -------------------------------------------------------------
console.log('\n--- 4. Task Counts and Deduplication Verification ---');

let d1TotalTasks = 0;
const d1TaskIds = [];
const d1DuplicateTaskIds = [];
const lessonTaskCounts = {};

dzial1?.lessons.forEach((lesson) => {
  const lTasks = lesson.tasks || [];
  lessonTaskCounts[lesson.id] = lTasks.length;
  d1TotalTasks += lTasks.length;

  const seenInLesson = new Set();
  lTasks.forEach((t) => {
    if (seenInLesson.has(t.id)) {
      d1DuplicateTaskIds.push({ lesson: lesson.id, taskId: t.id, type: 'within-lesson' });
    }
    seenInLesson.add(t.id);

    if (d1TaskIds.includes(t.id)) {
      d1DuplicateTaskIds.push({ lesson: lesson.id, taskId: t.id, type: 'across-dzial1' });
    }
    d1TaskIds.push(t.id);
  });
});

console.log('Dział 1 task counts by lesson:', JSON.stringify(lessonTaskCounts, null, 2));
console.log(`Dział 1 total tasks: ${d1TotalTasks}`);
console.log(`Dział 1 unique task IDs: ${new Set(d1TaskIds).size}`);

check('Dział 1 has exactly 251 tasks', d1TotalTasks === 251, `Found: ${d1TotalTasks}`);
check('Dział 1 has exactly 251 unique task IDs', new Set(d1TaskIds).size === 251, `Found: ${new Set(d1TaskIds).size}`);
check('Dział 1 has zero duplicate task IDs', d1DuplicateTaskIds.length === 0, `Duplicates found: ${JSON.stringify(d1DuplicateTaskIds)}`);
check('Dział 1 has exactly 15 lessons', dzial1?.lessons.length === 15, `Found: ${dzial1?.lessons.length}`);

// Global Task Counts
let globalTotalTasks = 0;
const globalTaskIds = new Set();
const globalDuplicates = [];
const topicCounts = {};

data.topics.forEach((topic) => {
  let topicTaskCount = 0;
  topic.lessons.forEach((lesson) => {
    const lTasks = lesson.tasks || [];
    topicTaskCount += lTasks.length;
    globalTotalTasks += lTasks.length;

    lTasks.forEach((t) => {
      if (globalTaskIds.has(t.id)) {
        globalDuplicates.push({ topic: topic.id, lesson: lesson.id, taskId: t.id });
      }
      globalTaskIds.add(t.id);
    });
  });
  topicCounts[topic.id] = topicTaskCount;
});

console.log('\nTask counts by Topic:', JSON.stringify(topicCounts, null, 2));
console.log(`Total tasks across all 15 topics: ${globalTotalTasks}`);
console.log(`Total unique task IDs across all 15 topics: ${globalTaskIds.size}`);

check('Total tasks across all 15 topics is exactly 3,821', globalTotalTasks === 3821, `Found: ${globalTotalTasks}`);
check('Total unique task IDs across all 15 topics is exactly 3,821', globalTaskIds.size === 3821, `Found: ${globalTaskIds.size}`);
check('Zero duplicate task IDs across the entire curriculum', globalDuplicates.length === 0, `Duplicates: ${JSON.stringify(globalDuplicates)}`);
check('Total topics is exactly 15', data.topics.length === 15, `Found: ${data.topics.length}`);

// Verify topics 2-15 each have exactly 255 tasks
for (let i = 2; i <= 15; i++) {
  const tid = `dzial-${i}`;
  check(`Topic ${tid} has exactly 255 tasks`, topicCounts[tid] === 255, `Actual: ${topicCounts[tid]}`);
}

// -------------------------------------------------------------
// 5. KaTeX parsing across all mathematical expressions in dataset
// -------------------------------------------------------------
console.log('\n--- 5. KaTeX Comprehensive Parsing Audit Across Whole Dataset ---');

let totalMathTokens = 0;
const katexErrors = [];

function checkAllKatex(obj, pathStr) {
  if (typeof obj === 'string') {
    const mathRegex = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
    let m;
    while ((m = mathRegex.exec(obj)) !== null) {
      totalMathTokens++;
      const math = m[1] || m[2];
      try {
        katex.renderToString(math, { throwOnError: true });
      } catch (err) {
        katexErrors.push({ pathStr, math, error: err.message });
      }
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, i) => checkAllKatex(item, `${pathStr}[${i}]`));
  } else if (obj && typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => checkAllKatex(v, `${pathStr}.${k}`));
  }
}

checkAllKatex(data, 'root');
console.log(`Total KaTeX math tokens checked across entire curriculum: ${totalMathTokens}`);
check('Zero KaTeX parsing errors across entire dataset', katexErrors.length === 0, `Errors: ${katexErrors.length} (${JSON.stringify(katexErrors.slice(0, 3))})`);

// -------------------------------------------------------------
// 6. Summary and Final Exit Code
// -------------------------------------------------------------
console.log('\n===============================================================');
console.log(`SUMMARY: ${passCount} PASSED, ${failCount} FAILED.`);
console.log('===============================================================');

if (failCount === 0) {
  console.log('\n*** FINAL VERDICT: APPROVE ***\n');
  process.exit(0);
} else {
  console.log('\n*** FINAL VERDICT: REJECT ***\n');
  console.error('Failure Details:', JSON.stringify(failures, null, 2));
  process.exit(1);
}
