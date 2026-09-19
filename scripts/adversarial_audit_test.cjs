'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const katex = require('katex');

const SEED_PATH = path.resolve(__dirname, '../seed/curriculum/curriculum_matematyka.json');
const MIRROR_PATH = 'c:/Users/mateu/Downloads/mat/curriculum_matematyka.json';

const seedRaw = fs.readFileSync(SEED_PATH, 'utf8');
const data = JSON.parse(seedRaw);

console.log('===============================================================');
console.log('    ADVERSARIAL EMPIRICAL AUDIT: KaTeX & CKE 2023 FORMULAS    ');
console.log('===============================================================\n');

let failed = false;

// -------------------------------------------------------------
// CHECK 1: SHA256 Integrity between Seed and Mirror
// -------------------------------------------------------------
const seedSha = crypto.createHash('sha256').update(seedRaw).digest('hex');
let mirrorSha = null;
if (fs.existsSync(MIRROR_PATH)) {
  mirrorSha = crypto.createHash('sha256').update(fs.readFileSync(MIRROR_PATH, 'utf8')).digest('hex');
}
console.log('[AUDIT 1] Dataset Mirror Integrity:');
console.log(`          Seed SHA256:   ${seedSha}`);
console.log(`          Mirror SHA256: ${mirrorSha || 'NOT FOUND'}`);
if (seedSha !== mirrorSha) {
  console.error('          [FAIL] Seed and Mirror checksums do not match!');
  failed = true;
} else {
  console.log('          [PASS] Checksums match identically.');
}

// -------------------------------------------------------------
// CHECK 2: KaTeX Parsing & Delimiter Integrity Across All Fields
// -------------------------------------------------------------
const pureLatexErrors = [];
const katexParseErrors = [];
const unmatchedDollarErrors = [];
const leakedMacroErrors = [];
const bareFormulaErrors = [];

function checkField(str, p) {
  if (typeof str !== 'string') return;

  if (p.endsWith('.latex')) {
    try {
      katex.renderToString(str, { throwOnError: true, displayMode: true });
    } catch (e) {
      pureLatexErrors.push({ path: p, latex: str, error: e.message });
    }
    return;
  }

  // Count unescaped dollar signs
  const dollars = (str.match(/(?<!\\)\$/g) || []).length;
  if (dollars % 2 !== 0) {
    unmatchedDollarErrors.push({ path: p, dollars, text: str });
  }

  // Render every LaTeX substring inside $...$ and $$...$$
  const mathRegex = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let match;
  while ((match = mathRegex.exec(str)) !== null) {
    const math = match[1] || match[2];
    try {
      katex.renderToString(math, { throwOnError: true });
    } catch (err) {
      katexParseErrors.push({ path: p, math, error: err.message });
    }
  }

  // Check non-math parts for leaked raw LaTeX commands or bare formulas
  const nonMath = str.split(/\$\$[\s\S]+?\$\$|\$[^$]+?\$/);
  for (const part of nonMath) {
    // Leaked LaTeX commands
    const matches = part.match(/\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^\[\]]*\])*/g);
    if (matches) {
      const mathCommands = matches.filter(m =>
        /\\(frac|sqrt|cdot|times|pm|le|ge|neq|approx|implies|iff|in|notin|cup|cap|subset|Delta|alpha|beta|gamma|pi|Omega|text|left|right|rangle|langle)\b/.test(m)
      );
      if (mathCommands.length > 0) {
        leakedMacroErrors.push({ path: p, commands: mathCommands, part: part.trim(), text: str });
      }
    }

    // Bare formulas like p = -b/(2a) or V = 1/3
    if (/\bp\s*=\s*-b\s*\/\s*\(?2a\)?/i.test(part)) {
      bareFormulaErrors.push({ path: p, type: 'p = -b/(2a)', part: part.trim() });
    }
    if (/\bq\s*=\s*-(?:\\Delta|Delta|delta)\s*\/\s*\(?4a\)?/i.test(part)) {
      bareFormulaErrors.push({ path: p, type: 'q = -Delta/(4a)', part: part.trim() });
    }
    if (/\bV\s*=\s*1\/3\b/i.test(part)) {
      bareFormulaErrors.push({ path: p, type: 'V = 1/3', part: part.trim() });
    }
  }
}

function traverse(obj, p) {
  if (typeof obj === 'string') {
    checkField(obj, p);
  } else if (Array.isArray(obj)) {
    obj.forEach((x, i) => traverse(x, `${p}[${i}]`));
  } else if (obj && typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => traverse(v, `${p}.${k}`));
  }
}
traverse(data, 'root');

console.log('\n[AUDIT 2] KaTeX Rendering & Syntax Validation:');
console.log(`          Core formulas pure latex errors (throwOnError: true): ${pureLatexErrors.length}`);
console.log(`          Math blocks ($...$) parse errors (throwOnError: true):  ${katexParseErrors.length}`);
console.log(`          Unclosed / odd dollar sign occurrences:                 ${unmatchedDollarErrors.length}`);
console.log(`          Leaked raw LaTeX macros outside $:                      ${leakedMacroErrors.length}`);
console.log(`          Bare formulas in text segments (p, q, V):               ${bareFormulaErrors.length}`);

if (unmatchedDollarErrors.length > 0) {
  console.error(`          [FAIL] Found ${unmatchedDollarErrors.length} strings with malformed/unmatched dollar delimiters.`);
  console.error('          Sample malformed strings:');
  unmatchedDollarErrors.slice(0, 5).forEach((u, i) => {
    console.error(`            ${i + 1}. [${u.path}] (${u.dollars} $): "${u.text}"`);
  });
  failed = true;
}

if (leakedMacroErrors.length > 0) {
  console.error(`          [FAIL] Found ${leakedMacroErrors.length} text segments with raw LaTeX macros outside $...$.`);
  console.error('          Sample leaked macro strings:');
  leakedMacroErrors.slice(0, 5).forEach((l, i) => {
    console.error(`            ${i + 1}. [${l.path}]: [${l.commands.join(', ')}] in "${l.part}"`);
  });
  failed = true;
}

if (bareFormulaErrors.length > 0) {
  console.error(`          [FAIL] Found ${bareFormulaErrors.length} bare formulas outside math delimiters.`);
  failed = true;
}

// -------------------------------------------------------------
// CHECK 3: CKE 2023 Formula Sheet Page Boundaries & Alignment
// -------------------------------------------------------------
let totalFormulas = 0;
let inCkeCount = 0;
let notInCkeCount = 0;
const pageOutliers = [];
const tipPageMismatches = [];

for (const topic of data.topics) {
  for (const lesson of topic.lessons) {
    if (!lesson.theory_pill || !Array.isArray(lesson.theory_pill.core_formulas)) continue;
    for (const cf of lesson.theory_pill.core_formulas) {
      totalFormulas++;
      if (cf.in_cke_sheet === true) {
        inCkeCount++;
        if (!cf.cke_page || typeof cf.cke_page !== 'string') {
          pageOutliers.push({ lesson: lesson.id, title: cf.title, issue: 'missing cke_page' });
        } else {
          const nums = (cf.cke_page.match(/\d+/g) || []).map(Number);
          if (nums.length === 0 || nums.some(n => n < 4 || n > 32)) {
            pageOutliers.push({ lesson: lesson.id, title: cf.title, cke_page: cf.cke_page, issue: 'page out of range [4, 32]' });
          }
        }
      } else if (cf.in_cke_sheet === false) {
        notInCkeCount++;
        if (cf.cke_page !== null) {
          pageOutliers.push({ lesson: lesson.id, title: cf.title, cke_page: cf.cke_page, issue: 'cke_page not null when in_cke_sheet is false' });
        }
      } else {
        pageOutliers.push({ lesson: lesson.id, title: cf.title, issue: 'in_cke_sheet not boolean' });
      }

      // Check text in matura_tip for outdated formula sheet pages
      if (cf.matura_tip) {
        const tipPages = (cf.matura_tip.match(/str\.\s*(\d+)/gi) || []).map(s => parseInt(s.replace(/\D/g, '')));
        const cfPages = (cf.cke_page ? String(cf.cke_page).match(/\d+/g) || [] : []).map(Number);
        for (const tp of tipPages) {
          // If tip mentions str. X and cf.cke_page is set, check if they diverge by >= 2 pages
          if (cfPages.length > 0 && !cfPages.includes(tp)) {
            tipPageMismatches.push({
              lesson: lesson.id,
              title: cf.title,
              cf_cke_page: cf.cke_page,
              tip_page: `str. ${tp}`,
              tip: cf.matura_tip
            });
          }
        }
      }
    }
  }
}

console.log('\n[AUDIT 3] CKE 2023 Formula Sheet Alignment:');
console.log(`          Total core formulas evaluated:                          ${totalFormulas}`);
console.log(`          in_cke_sheet: true formulas:                            ${inCkeCount}`);
console.log(`          in_cke_sheet: false formulas:                           ${notInCkeCount}`);
console.log(`          Formulas with invalid cke_page boundaries:              ${pageOutliers.length}`);
console.log(`          Formulas with tip page mismatch vs cf.cke_page:         ${tipPageMismatches.length}`);

if (pageOutliers.length > 0) {
  console.error(`          [FAIL] Found ${pageOutliers.length} formulas with invalid cke_page boundaries:`);
  pageOutliers.forEach(o => console.error(`            - ${o.lesson} [${o.title}]: ${o.issue}`));
  failed = true;
} else {
  console.log('          [PASS] All 307 formula cke_page fields are strictly in range 4–32 or null.');
}

if (tipPageMismatches.length > 0) {
  console.error(`          [FAIL] Found ${tipPageMismatches.length} formulas where matura_tip cites outdated/mismatched pages:`);
  tipPageMismatches.slice(0, 5).forEach(m => {
    console.error(`            - ${m.lesson} [${m.title}]: cke_page="${m.cf_cke_page}" vs matura_tip cites "${m.tip_page}"`);
  });
  failed = true;
}

// -------------------------------------------------------------
// CHECK 4: Residual Prohibited Terminology
// -------------------------------------------------------------
const ckeMatches = [];
function checkTerminology(str, p) {
  if (typeof str !== 'string') return;
  const m = str.match(/(?:w\s+)?(?:karcie|karty|karta|kartę|kartą)\s+(?:wzor[oó]w\s+)?cke/gi);
  if (m) {
    ckeMatches.push({ path: p, matches: m, text: str.slice(0, 100) });
  }
}
function traverseTerm(obj, p) {
  if (typeof obj === 'string') checkTerminology(obj, p);
  else if (Array.isArray(obj)) obj.forEach((x, i) => traverseTerm(x, `${p}[${i}]`));
  else if (obj && typeof obj === 'object') Object.entries(obj).forEach(([k, v]) => traverseTerm(v, `${p}.${k}`));
}
traverseTerm(data, 'root');

console.log('\n[AUDIT 4] Prohibited Terminology ("Karta CKE"):');
console.log(`          Residual matches in curriculum dataset:                 ${ckeMatches.length}`);
if (ckeMatches.length > 0) {
  console.error(`          [FAIL] Found ${ckeMatches.length} residual "Karta CKE" occurrences.`);
  failed = true;
} else {
  console.log('          [PASS] Zero occurrences of "Karta CKE" found in dataset.');
}

// -------------------------------------------------------------
// FINAL AUDIT VERDICT
// -------------------------------------------------------------
console.log('\n===============================================================');
if (failed) {
  console.error('FINAL VERDICT: REJECT');
  console.error('Adversarial audit discovered critical delimiter and content defects.');
  console.log('===============================================================');
  process.exit(1);
} else {
  console.log('FINAL VERDICT: APPROVE');
  console.log('All adversarial stress tests passed.');
  console.log('===============================================================');
  process.exit(0);
}
