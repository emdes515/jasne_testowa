const fs = require('fs');
const path = require('path');

// Extract sanitizeExaminerTip directly from SessionRunner.tsx source to ensure 100% fidelity
const sessionRunnerSource = fs.readFileSync(
  path.resolve(__dirname, '../src/components/SessionRunner.tsx'),
  'utf8'
);

const sanitizeMatch = sessionRunnerSource.match(/export function sanitizeExaminerTip\([\s\S]*?\n\}/);
if (!sanitizeMatch) {
  throw new Error('Failed to find sanitizeExaminerTip in src/components/SessionRunner.tsx');
}

// Evaluate sanitizeExaminerTip (strip TypeScript annotations)
const jsFunctionCode = sanitizeMatch[0]
  .replace('export function sanitizeExaminerTip', 'function sanitizeExaminerTip')
  .replace(/\(text:\s*string\):\s*string/, '(text)');
const sanitizeExaminerTip = new Function(
  `${jsFunctionCode}; return sanitizeExaminerTip;`
)();

const curriculumPath = path.resolve(__dirname, '../seed/curriculum/curriculum_matematyka.json');
const data = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));

const target9 = [
  'lesson-3-3',
  'lesson-3-8',
  'lesson-3-14',
  'lesson-7-5',
  'lesson-7-10',
  'lesson-13-2',
  'lesson-14-4',
  'lesson-15-1',
  'lesson-15-15'
];

let allLessons = {};
let totalCount = 0;
data.topics.forEach(t => {
  (t.lessons || []).forEach(l => {
    totalCount++;
    allLessons[l.id] = l;
  });
});

console.log('================================================================');
console.log(`Curriculum loaded: ${data.topics.length} topics, ${totalCount} total lessons.`);
console.log('================================================================\n');

console.log('----------------------------------------------------------------');
console.log('SECTION 1: DETAILED AUDIT OF THE 9 KNOWN UPPERCASE-HEADED LESSONS');
console.log('----------------------------------------------------------------');

let knownPassed = 0;
target9.forEach((id, idx) => {
  const l = allLessons[id];
  if (!l) {
    console.error(`[FAIL] Lesson ${id} NOT FOUND!`);
    return;
  }
  const raw = l.theory_pill?.matura_context || '';
  const san = sanitizeExaminerTip(raw);

  const rawFormulas = raw.match(/\$[^\$]+\$/g) || [];
  const sanFormulas = san.match(/\$[^\$]+\$/g) || [];

  const rawWords = raw.split(/\s+/).filter(Boolean).length;
  const sanWords = san.split(/\s+/).filter(Boolean).length;

  // Header detection
  const headerMatch = raw.match(/^[A-ZĄĆĘŁŃÓŚŹŻ0-9\s–—\-]{4,}[:!]/);
  const strippedHeader = headerMatch ? headerMatch[0] : 'NONE';

  const checkHeaderRemoved = !san.startsWith(strippedHeader);
  const checkNoPunctuationArtifact = !/^[:!–—\-\s]/.test(san);
  const checkFormulasPreserved = rawFormulas.length === sanFormulas.length;
  const checkSubstantiveLength = san.length > 20;
  const checkCapitalized = san.length > 0 && san[0] === san[0].toUpperCase();

  const isOk = checkHeaderRemoved && checkNoPunctuationArtifact && checkFormulasPreserved && checkSubstantiveLength && checkCapitalized;
  if (isOk) knownPassed++;

  console.log(`${idx + 1}. [${isOk ? 'PASS' : 'FAIL'}] ${id} (${l.title})`);
  console.log(`   Header Detected & Stripped: "${strippedHeader}"`);
  console.log(`   Raw Length:        ${raw.length} chars, ${rawWords} words, ${rawFormulas.length} formulas`);
  console.log(`   Sanitized Length:  ${san.length} chars, ${sanWords} words, ${sanFormulas.length} formulas`);
  console.log(`   Formula Delta:     ${rawFormulas.length - sanFormulas.length} formulas lost (0 expected)`);
  console.log(`   Cleaned Text:      "${san.slice(0, 110)}..."`);
  console.log('');
});

console.log(`Summary 9 Known Lessons: ${knownPassed} / 9 passed verification.\n`);

console.log('----------------------------------------------------------------');
console.log('SECTION 2: DETAILED AUDIT OF THE REMAINING 216 LESSONS');
console.log('----------------------------------------------------------------');

let remainingTotal = 0;
let identicalCount = 0;
let toneCalibratedCount = 0;
let damagedCount = 0;

const issues = [];
const calibratedList = [];

Object.keys(allLessons).forEach(id => {
  if (target9.includes(id)) return;
  remainingTotal++;

  const l = allLessons[id];
  const raw = l.theory_pill?.matura_context || '';
  if (!raw) {
    issues.push({ id, reason: 'Empty matura_context' });
    damagedCount++;
    return;
  }

  const san = sanitizeExaminerTip(raw);
  if (!san) {
    issues.push({ id, reason: 'Sanitized output became empty' });
    damagedCount++;
    return;
  }

  const rawFormulas = raw.match(/\$[^\$]+\$/g) || [];
  const sanFormulas = san.match(/\$[^\$]+\$/g) || [];

  if (rawFormulas.length !== sanFormulas.length) {
    issues.push({
      id,
      reason: `Formula count changed: raw=${rawFormulas.length}, san=${sanFormulas.length}`
    });
    damagedCount++;
    return;
  }

  if (san === raw) {
    identicalCount++;
  } else {
    toneCalibratedCount++;
    const diffs = [];
    if (raw.includes('ZAWSZE') && !san.includes('ZAWSZE')) diffs.push('ZAWSZE -> zawsze');
    if (raw.includes('DOKŁADNY') && !san.includes('DOKŁADNY')) diffs.push('DOKŁADNY -> dokładny');
    if (raw.includes('NIGDY nie daje') && !san.includes('NIGDY nie daje')) diffs.push('NIGDY nie daje -> nie daje');
    if (raw.trim() !== raw) diffs.push('Trimmed whitespace');
    if (san[0] !== raw[0]) diffs.push('Capitalized first char');

    calibratedList.push({
      id,
      title: l.title,
      diffs: diffs.join(', '),
      previewRaw: raw.slice(0, 80),
      previewSan: san.slice(0, 80)
    });
  }
});

console.log(`Remaining Lessons Tested: ${remainingTotal}`);
console.log(`  Identical (no change needed):  ${identicalCount}`);
console.log(`  Refined (tone calibration):    ${toneCalibratedCount}`);
console.log(`  Damaged / Issues:              ${damagedCount}`);

if (issues.length > 0) {
  console.log('\nIssues detected:');
  issues.forEach(iss => console.log(`  [ISSUE] ${iss.id}: ${iss.reason}`));
} else {
  console.log('\nZero issues detected among all 216 remaining lessons.');
}

console.log('\nBreakdown of 31 Tone-Calibrated Lessons:');
calibratedList.forEach((item, idx) => {
  console.log(`  ${idx + 1}. ${item.id}: [${item.diffs}]`);
  console.log(`     Raw: ${item.previewRaw}...`);
  console.log(`     San: ${item.previewSan}...`);
});

console.log('\n================================================================');
const verdict = knownPassed === 9 && remainingTotal === 216 && damagedCount === 0;
console.log(`OVERALL EMPIRICAL VERDICT: ${verdict ? 'APPROVE' : 'REJECT'}`);
console.log('================================================================');

if (!verdict) {
  process.exit(1);
}
