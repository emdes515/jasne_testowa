/**
 * Adversarial Stress-Test Harness for sanitizeExaminerTip & SessionRunner UI Labels
 * Run with: node scripts/stress_test_sanitize_examiner_tip.cjs
 */

const fs = require('fs');
const path = require('path');

// Extract sanitizeExaminerTip directly from src/components/SessionRunner.tsx to ensure exact source fidelity
const sessionRunnerCode = fs.readFileSync(path.resolve(__dirname, '../src/components/SessionRunner.tsx'), 'utf8');

// Match sanitizeExaminerTip function definition
const fnMatch = sessionRunnerCode.match(/export function sanitizeExaminerTip\([\s\S]*?\n\}/);
if (!fnMatch) {
  console.error("FATAL: Could not find sanitizeExaminerTip in SessionRunner.tsx");
  process.exit(1);
}

// Evaluate the exact function
const sanitizeExaminerTip = new Function('text', `
  ${fnMatch[0].replace('export function sanitizeExaminerTip(text: string): string', 'function sanitizeExaminerTip(text)')}
  return sanitizeExaminerTip(text);
`);

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(description, actual, expected, condition) {
  totalTests++;
  const pass = condition !== undefined ? condition : actual === expected;
  if (pass) {
    passedTests++;
  } else {
    failedTests++;
    failures.push({ description, actual, expected });
    console.error(`  [FAIL] ${description}`);
    console.error(`         Actual:   ${JSON.stringify(actual)}`);
    console.error(`         Expected: ${JSON.stringify(expected)}`);
  }
}

console.log("==================================================================");
console.log("  ADVERSARIAL STRESS TEST: sanitizeExaminerTip in SessionRunner.tsx");
console.log("==================================================================\n");

// -------------------------------------------------------------
// CATEGORY 1: Math Colons and Function Mappings
// -------------------------------------------------------------
console.log("--- Category 1: Math Colons and Function Mappings ---");

assert(
  "LaTeX math colon at start ($f: X \\to Y$) is preserved intact",
  sanitizeExaminerTip("$f: X \\to Y$ jest funkcją ciągłą na przedziale."),
  "$f: X \\to Y$ jest funkcją ciągłą na przedziale."
);

assert(
  "LaTeX math colon with brackets ($f: [0,1] \\to \\mathbb{R}$) is preserved",
  sanitizeExaminerTip("$f: [0, 1] \\to \\mathbb{R}$ przyjmuje wartości dodatnie."),
  "$f: [0, 1] \\to \\mathbb{R}$ przyjmuje wartości dodatnie."
);

assert(
  "LaTeX colon notation \\colon ($f \\colon A \\to B$) is preserved",
  sanitizeExaminerTip("$f \\colon A \\to B$ jest surjekcją."),
  "$f \\colon A \\to B$ jest surjekcją."
);

assert(
  "Ratio with colon (Stosunek 2:3) is preserved",
  sanitizeExaminerTip("Stosunek długości boków wynosi 2:3 w trójkącie podobnym."),
  "Stosunek długości boków wynosi 2:3 w trójkącie podobnym."
);

assert(
  "Short abbreviation with colon (Np. 2:3) under 4 chars is preserved",
  sanitizeExaminerTip("Np. stosunek wynosi 2:3 w tym przypadku."),
  "Np. stosunek wynosi 2:3 w tym przypadku."
);

assert(
  "Uppercase header ending in colon before math formula is stripped",
  sanitizeExaminerTip("KLUCZOWA WŁASNOŚĆ FUNKCJI: $f(x) = ax + b$ ma dokładnie jedno miejsce zerowe."),
  "$f(x) = ax + b$ ma dokładnie jedno miejsce zerowe."
);

// -------------------------------------------------------------
// CATEGORY 2: Factorials and Exclamation Marks in Math
// -------------------------------------------------------------
console.log("--- Category 2: Factorials and Exclamation Marks in Math ---");

assert(
  "LaTeX factorial at start ($n!$) is preserved intact",
  sanitizeExaminerTip("$n!$ oznacza iloczyn kolejnych liczb naturalnych."),
  "$n!$ oznacza iloczyn kolejnych liczb naturalnych."
);

assert(
  "LaTeX factorial with value ($5! = 120$) is preserved",
  sanitizeExaminerTip("$5! = 120$, a $0! = 1$ z definicji kombinatorycznej."),
  "$5! = 120$, a $0! = 1$ z definicji kombinatorycznej."
);

assert(
  "Text starting with Silnia $n!$ is preserved",
  sanitizeExaminerTip("Silnia $n!$ dla $n=0$ wynosi 1."),
  "Silnia $n!$ dla $n=0$ wynosi 1."
);

assert(
  "Bare factorial expression 5! = 120 is preserved (length 1 < 4)",
  sanitizeExaminerTip("5! = 120 jest wartością stałą."),
  "5! = 120 jest wartością stałą."
);

assert(
  "Uppercase banner SILNIA! is stripped and body capitalized",
  sanitizeExaminerTip("SILNIA! Zawsze pamiętaj, że $0! = 1$."),
  "Zawsze pamiętaj, że $0! = 1$."
);

assert(
  "Uppercase banner ending in ! with Polish letters NIE WYMNAŻAJ NAWIASÓW!",
  sanitizeExaminerTip("NIE WYMNAŻAJ NAWIASÓW! Jeśli masz $(x-1)(x-2)=0$, odczytaj pierwiastki."),
  "Jeśli masz $(x-1)(x-2)=0$, odczytaj pierwiastki."
);

// -------------------------------------------------------------
// CATEGORY 3: Polish Diacritics and Uppercase Characters
// -------------------------------------------------------------
console.log("--- Category 3: Polish Diacritics and Character Boundaries ---");

assert(
  "Header with all Polish uppercase diacritics ĄĆĘŁŃÓŚŹŻ ending in colon",
  sanitizeExaminerTip("ŻÓŁĆ GĘŚLĄ JAŹŃ: To jest tekst wyjaśnienia z polskimi znakami."),
  "To jest tekst wyjaśnienia z polskimi znakami."
);

assert(
  "Header with Ś and Ź ending in exclamation mark",
  sanitizeExaminerTip("ŚCIŚLE TAJNE ŹRÓDŁO WIEDZY! Sprawdź współczynnik kierunkowy prostej."),
  "Sprawdź współczynnik kierunkowy prostej."
);

assert(
  "Lower-case Polish letters in header prevent strip (not an ALL-CAPS banner)",
  sanitizeExaminerTip("Żelazna zasada nierówności: Rozwiąż $-3x \\ge 12$."),
  "Żelazna zasada nierówności: Rozwiąż $-3x \\ge 12$."
);

assert(
  "Header with em-dash and en-dash (KROK 1 – DEFINICJA:)",
  sanitizeExaminerTip("KROK 1 – DEFINICJA: Wyznacz dziedzinę wyrażenia."),
  "Wyznacz dziedzinę wyrażenia."
);

assert(
  "Header with hyphen (KROK-1 NAJWAŻNIEJSZY:)",
  sanitizeExaminerTip("KROK-1 NAJWAŻNIEJSZY: Zastosuj twierdzenie Pitagorasa."),
  "Zastosuj twierdzenie Pitagorasa."
);

// -------------------------------------------------------------
// CATEGORY 4: Nested and Multi-line Prefixes
// -------------------------------------------------------------
console.log("--- Category 4: Nested and Multi-line Prefixes ---");

assert(
  "Wskazówka prefix followed by uppercase banner (double prefix)",
  sanitizeExaminerTip("Wskazówka egzaminatora CKE: ŻELAZNY SCHEMAT: Rozwiąż układ równań."),
  "Rozwiąż układ równań."
);

assert(
  "Wskazówka prefix with exclamation banner",
  sanitizeExaminerTip("wskazówka cke: UWAGA NA ZNAK MINUS! Zmień znak nierówności."),
  "Zmień znak nierówności."
);

assert(
  "Newline after colon in uppercase banner is cleanly stripped",
  sanitizeExaminerTip("ŻELAZNY SCHEMAT KROK PO KROKU:\n1) Zapisz wzór funkcji."),
  "1) Zapisz wzór funkcji."
);

assert(
  "Multiple leading newlines and spaces before uppercase header",
  sanitizeExaminerTip("\n\n   \t ŻELAZNA ZASADA:\n\nTreść wskazówki bez nagłówka."),
  "Treść wskazówki bez nagłówka."
);

assert(
  "Banner spanning multiple lines (with internal newline before colon)",
  sanitizeExaminerTip("ŻELAZNY SCHEMAT 5 KROKÓW\nCKE NA 4 PUNKTY:\n1) Oznacz niewiadome."),
  "1) Oznacz niewiadome."
);

// -------------------------------------------------------------
// CATEGORY 5: Boundary & Null/Empty Edge Cases
// -------------------------------------------------------------
console.log("--- Category 5: Boundary & Null/Empty Edge Cases ---");

assert("Empty string", sanitizeExaminerTip(""), "");
assert("Null value", sanitizeExaminerTip(null), "");
assert("Undefined value", sanitizeExaminerTip(undefined), "");
assert("Whitespace only", sanitizeExaminerTip("   \t\n\r  "), "");
assert("Only an uppercase banner without body", sanitizeExaminerTip("ŻELAZNA ZASADA CKE:"), "");
assert("Single character", sanitizeExaminerTip("a"), "A");
assert("Single character uppercase", sanitizeExaminerTip("Z"), "Z");
assert("Short 3-letter uppercase header with colon (ABC: ) is NOT stripped", sanitizeExaminerTip("ABC: test"), "ABC: test");
assert("Exactly 4-letter uppercase header with colon (ABCD: ) IS stripped", sanitizeExaminerTip("ABCD: test"), "Test");

// -------------------------------------------------------------
// CATEGORY 6: Tone Calibration (NIGDY, ZAWSZE, DOKŁADNY, 100% pewniak)
// -------------------------------------------------------------
console.log("--- Category 6: Tone Calibration ---");

assert(
  "NIGDY nie daje -> nie daje",
  sanitizeExaminerTip("Pamiętaj, że egzaminator NIGDY nie daje punktu za sam wynik."),
  "Pamiętaj, że egzaminator nie daje punktu za sam wynik."
);

assert(
  "ZAWSZE -> zawsze (mid-sentence)",
  sanitizeExaminerTip("W mianowniku ZAWSZE stoi wartość dokładna."),
  "W mianowniku zawsze stoi wartość dokładna."
);

assert(
  "ZAWSZE -> Zawsze (at start of cleaned sentence)",
  sanitizeExaminerTip("KROK 1: ZAWSZE sprawdzaj założenia."),
  "Zawsze sprawdzaj założenia."
);

assert(
  "DOKŁADNY -> dokładny",
  sanitizeExaminerTip("Podaj DOKŁADNY wynik w postaci ułamka zwykłego."),
  "Podaj dokładny wynik w postaci ułamka zwykłego."
);

assert(
  "100% pewniak! replacement",
  sanitizeExaminerTip("To zadanie to 100% pewniak! Warto je przećwiczyć."),
  "To zadanie to Częsty motyw w arkuszach CKE. Warto je przećwiczyć."
);

// -------------------------------------------------------------
// CATEGORY 7: ReDoS and Performance Under Stress
// -------------------------------------------------------------
console.log("--- Category 7: ReDoS and Performance ---");

const t0 = Date.now();
// 100,000 characters of uppercase without colon (worst-case scan)
const hugeTextNoColon = "A".repeat(100000);
const r1 = sanitizeExaminerTip(hugeTextNoColon);
const t1 = Date.now();
const timeNoColon = t1 - t0;
assert("ReDoS check on 100k uppercase chars (execution < 100ms)", timeNoColon < 100, true, timeNoColon < 100);

const t2 = Date.now();
// 100,000 characters of uppercase with colon at the end
const hugeTextWithColon = "A".repeat(100000) + ": Treść";
const r2 = sanitizeExaminerTip(hugeTextWithColon);
const t3 = Date.now();
const timeWithColon = t3 - t2;
assert("ReDoS check on 100k uppercase chars with colon (execution < 100ms)", timeWithColon < 100, true, timeWithColon < 100);
assert("Huge text with colon correctly stripped down to body", r2, "Treść");

// -------------------------------------------------------------
// CATEGORY 8: Randomized Fuzzing (5,000 generated samples)
// -------------------------------------------------------------
console.log("--- Category 8: Fuzzing Harness (5,000 iterations) ---");

let fuzzCrashes = 0;
const chars = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻaąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż0123456789 \t\n:!$-+*/=()[]{}\'",.?~`@#%^&*_–—';

for (let i = 0; i < 5000; i++) {
  const len = Math.floor(Math.random() * 200);
  let randomStr = '';
  for (let j = 0; j < len; j++) {
    randomStr += chars[Math.floor(Math.random() * chars.length)];
  }
  try {
    const out = sanitizeExaminerTip(randomStr);
    if (typeof out !== 'string') {
      fuzzCrashes++;
    }
  } catch (e) {
    fuzzCrashes++;
    console.error("Fuzz crash on input: " + JSON.stringify(randomStr), e);
  }
}
assert("5,000 fuzz samples ran with 0 crashes or type anomalies", fuzzCrashes, 0);

// -------------------------------------------------------------
// CATEGORY 9: Complete Scan of 225 Curriculum Lessons
// -------------------------------------------------------------
console.log("--- Category 9: Complete Scan of 225 Curriculum Lessons ---");

const currData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../seed/curriculum/curriculum_matematyka.json'), 'utf8'));
let curriculumErrors = 0;
let lessonsProcessed = 0;

for (const topic of currData.topics) {
  for (const lesson of topic.lessons) {
    lessonsProcessed++;
    const tip = lesson.theory_pill?.matura_context;
    try {
      const sanitized = sanitizeExaminerTip(tip);
      if (tip && !sanitized && tip.trim().length > 0) {
        // Only fails if legitimate substantive tip became empty
        if (!/^[A-ZĄĆĘŁŃÓŚŹŻ0-9\s–—\-]{4,}[:!]\s*$/.test(tip.trim())) {
          curriculumErrors++;
          console.error(`Lesson ${lesson.id} lost all substantive content! Raw: ${tip}`);
        }
      }
    } catch (err) {
      curriculumErrors++;
      console.error(`Crash on lesson ${lesson.id}:`, err);
    }
  }
}
assert("All 225 lessons processed without errors", curriculumErrors, 0);
assert("225 lessons verified", lessonsProcessed, 225);

// -------------------------------------------------------------
// CATEGORY 10: Forbidden CKE Strings in SessionRunner.tsx
// -------------------------------------------------------------
console.log("--- Category 10: Forbidden CKE Strings in SessionRunner.tsx ---");

const forbiddenStrings = [
  'Patent maturalny CKE',
  'W Karcie Wzorów CKE',
  'Wskazówka egzaminatora CKE',
  'Karta CKE:'
];

forbiddenStrings.forEach(str => {
  const occurrences = (sessionRunnerCode.match(new RegExp(str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g')) || []).length;
  assert(`SessionRunner.tsx contains 0 occurrences of "${str}"`, occurrences, 0);
});

// Also check standardized replacements exist
const expectedLabels = [
  'Patent maturalny',
  'W karcie wzorów',
  'Wskazówka egzaminatora',
  'Karta wzorów:'
];

expectedLabels.forEach(label => {
  const exists = sessionRunnerCode.includes(label);
  assert(`SessionRunner.tsx contains standardized label "${label}"`, exists, true);
});

console.log("\n==================================================================");
console.log(`STRESS TEST SUMMARY: ${passedTests} passed, ${failedTests} failed out of ${totalTests} tests.`);
console.log("==================================================================");

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

