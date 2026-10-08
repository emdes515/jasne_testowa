
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/math/generated/all_1500_tasks.json', 'utf8'));

const issues = [];

// ─── Faza 1: Blind solver helpers ───────────────────────────────────────────

function solveArch01(task) {
  // Potęgi: a^(p/q) * a^r = a^(p/q + r)
  // Pattern: "a^(n/m) * a^k = a^?"
  // We read content to extract base and exponents
  const m = task.content.match(/\$(\d+)\^\{\\frac\{(\d+)\}\{(\d+)\}\}\s*\\cdot\s*\1\^\{(\d+)\}\$/);
  if (!m) return null;
  const base = parseInt(m[1]);
  const p = parseInt(m[2]), q = parseInt(m[3]), r = parseInt(m[4]);
  // result exponent: p/q + r = (p + r*q)/q
  const numN = p + r * q, denN = q;
  const g = gcd(numN, denN);
  return `${base}^{\\frac{${numN/g}}{${denN/g}}}`;
}

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

// ─── Full automated audit ────────────────────────────────────────────────────

let pass = 0, warn = 0, fail = 0;
const criticalIssues = [];

for (const task of data) {
  const taskIssues = [];

  const text = [
    task.content || '',
    (task.options || []).join(' '),
    task.explanation || ''
  ].join(' ');

  // ─ 1. Duplicate options check ─
  if (task.type === 'SINGLE_CHOICE') {
    const opts = task.options || [];
    const unique = new Set(opts.map(o => o.trim()));
    if (unique.size !== opts.length) {
      taskIssues.push(`FAZA1: ZDUPLIKOWANE OPCJE: ${JSON.stringify(opts)}`);
    }
  }

  // ─ 2. Degenerate notation ─
  if (/\+\s*-|\+\s*0(?![,.\d])|-\s*0(?![,.\d])/.test(text)) {
    taskIssues.push(`FAZA4: Zdegenerowana notacja (+ -, +0, -0) w treści/wyjaśnieniu`);
  }

  // ─ 3. Division by zero ─
  if (/\\frac\{[^}]+\}\{0\}/.test(text)) {
    taskIssues.push(`FAZA2: Dzielenie przez zero wykryte w treści`);
  }

  // ─ 4. KaTeX balance ─
  const dollarCount = (text.match(/(?<!\\)\$/g) || []).length;
  if (dollarCount % 2 !== 0) {
    taskIssues.push(`FAZA4: Niedomknięty delimiter KaTeX ($) - łącznie ${dollarCount} znaleziono`);
  }

  // ─ 5. Missing diagram for visual tasks ─
  if (/na rysunku|na wykresie/i.test(task.content) && !task.diagram && !task.plot) {
    taskIssues.push(`FAZA2: Odwołanie do rysunku bez dołączonego diagramu SVG`);
  }

  // ─ 6. Step-by-step markers ─
  if (!task.explanation?.includes('Krok 1') || !task.explanation?.includes('Pułapka CKE')) {
    taskIssues.push(`FAZA4: Brak sekcji 'Krok 1' lub 'Pułapka CKE' w wyjaśnieniu`);
  }

  // ─ 7. correct_answer key validity ─
  if (task.type === 'SINGLE_CHOICE') {
    if (!['A','B','C','D'].includes(task.correct_answer)) {
      taskIssues.push(`FAZA1: Niepoprawny klucz odpowiedzi: '${task.correct_answer}'`);
    }
    // Check answer appears in options
    const idx = ['A','B','C','D'].indexOf(task.correct_answer);
    const opts = task.options || [];
    if (idx >= opts.length) {
      taskIssues.push(`FAZA1: Klucz '${task.correct_answer}' wskazuje na nieistniejącą opcję (total opts: ${opts.length})`);
    }
  }

  // ─ 8. ARCH-specific mathematical blind solve checks ─

  // ARCH-01: a^(p/q) · a^r → exponent addition
  if (task.archetypeCode === 'ARCH-01') {
    // Check option uniqueness in terms of exponent values
    const opts = (task.options || []).map(o => o.replace(/\s/g,''));
    const uniqueOpts = new Set(opts);
    if (uniqueOpts.size !== opts.length) {
      taskIssues.push(`FAZA1/ARCH-01: Duplikat opcji po uproszczeniu`);
    }
  }

  // ARCH-02: log validity - base must not be 1 or negative
  if (task.archetypeCode === 'ARCH-02') {
    const baseMatch = task.content?.match(/\\log_\{?(\d+)\}?/g) || [];
    for (const lm of baseMatch) {
      const base = parseInt(lm.replace(/\\log_\{?(\d+)\}?/, '$1'));
      if (base === 1 || base <= 0) {
        taskIssues.push(`FAZA2/ARCH-02: Niedozwolona podstawa logarytmu: ${base}`);
      }
    }
  }

  // ARCH-03: |x - a| <= b – b must be positive
  if (task.archetypeCode === 'ARCH-03') {
    const bMatch = task.content?.match(/\\le\s*(-?\d+)/);
    if (bMatch) {
      const bVal = parseInt(bMatch[1]);
      if (bVal <= 0) {
        taskIssues.push(`FAZA2/ARCH-03: Prawa strona nierówności z wartością bezwzględną musi być > 0, znaleziono: ${bVal}`);
      }
    }
  }

  // ARCH-04: percentages 0-100 check
  if (task.archetypeCode === 'ARCH-04') {
    const pctMatch = task.content?.match(/(\d+)\\%/g) || [];
    for (const p of pctMatch) {
      const val = parseInt(p);
      if (val > 100 || val < 0) {
        taskIssues.push(`FAZA2/ARCH-04: Procent poza zakresem [0,100]: ${val}`);
      }
    }
  }

  // ARCH-08: quadratic inequality - delta must be perfect square
  if (task.archetypeCode === 'ARCH-08') {
    const aMatch = task.content?.match(/\$(-?\d+)x\^2/);
    const bMatch = task.content?.match(/([+-]\s*\d+)x(?!\^)/);
    const cMatch = task.content?.match(/([+-]\s*\d+)\s*[<>\\le\\ge]/);
    if (aMatch && bMatch && cMatch) {
      const a = parseInt(aMatch[1]);
      const b = parseInt(bMatch[1].replace(/\s/g,''));
      const c = parseInt(cMatch[1].replace(/\s/g,''));
      const delta = b*b - 4*a*c;
      if (delta < 0) {
        taskIssues.push(`FAZA2/ARCH-08: Ujemny wyróżnik Δ=${delta} → brak pierwiastków rzeczywistych`);
      } else {
        const sqrtDelta = Math.sqrt(delta);
        if (!Number.isInteger(sqrtDelta)) {
          taskIssues.push(`FAZA2/ARCH-08: Wyróżnik Δ=${delta} nie jest pełnym kwadratem (√Δ≈${sqrtDelta.toFixed(3)})`);
        }
      }
    }
  }

  // ARCH-20: Pythagoras - check for Pythagorean triples
  if (task.archetypeCode === 'ARCH-20') {
    const sidesMatch = task.content?.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (sidesMatch) {
      const sides = [parseInt(sidesMatch[1]), parseInt(sidesMatch[2]), parseInt(sidesMatch[3])].sort((a,b) => a-b);
      if (sides[0]*sides[0] + sides[1]*sides[1] !== sides[2]*sides[2]) {
        taskIssues.push(`FAZA2/ARCH-20: Boki ${sides} NIE tworzą trójki pitagorejskiej`);
      }
    }
  }

  // ─ 9. ARCH-32 specific: open task must have numeric correct_answer ─
  if (task.archetypeCode === 'ARCH-32') {
    const ans = parseFloat(task.correct_answer);
    if (isNaN(ans) || ans <= 0) {
      taskIssues.push(`FAZA1/ARCH-32: Odpowiedź otwarta musi być dodatnią liczbą, znaleziono: '${task.correct_answer}'`);
    }
    // Area must be positive integer or clean decimal
    if (ans !== Math.floor(ans) && (ans * 10) % 1 !== 0) {
      taskIssues.push(`FAZA2/ARCH-32: Maksymalne pole ${ans} nie jest clean math (powinno być całkowite lub .5)`);
    }
  }

  // ─ 10. ARCH-25 circle: radius must be positive ─
  if (task.archetypeCode === 'ARCH-25') {
    const rSqMatch = task.content?.match(/=\s*(\d+)\$/);
    if (rSqMatch) {
      const rSq = parseInt(rSqMatch[1]);
      const r = Math.sqrt(rSq);
      if (!Number.isInteger(r)) {
        taskIssues.push(`FAZA2/ARCH-25: r²=${rSq} nie jest pełnym kwadratem (r≈${r.toFixed(3)})`);
      }
    }
  }

  // ─ Record ─
  if (taskIssues.length > 0) {
    criticalIssues.push({
      id: task.id,
      arch: task.archetypeCode,
      title: task.title,
      type: task.type,
      issues: taskIssues,
      correct_answer: task.correct_answer,
      options: task.options,
      content_preview: (task.content || '').substring(0, 200)
    });
    if (taskIssues.some(i => i.includes('CRITICAL') || i.includes('Klucz') || i.includes('Δ') || i.includes('zero') || i.includes('ZDUPLIKOWANE'))) {
      fail++;
    } else {
      warn++;
    }
  } else {
    pass++;
  }
}

console.log(`\n=== RAPORT AUDYTU BAZY JASNE (1500 zadań) ===`);
console.log(`PASS: ${pass} | WARN: ${warn} | FAIL: ${fail}`);
console.log(`Łączna liczba zadań z problemami: ${criticalIssues.length}\n`);

// Group by archetype
const byArch = {};
for (const issue of criticalIssues) {
  if (!byArch[issue.arch]) byArch[issue.arch] = [];
  byArch[issue.arch].push(issue);
}

for (const arch of Object.keys(byArch).sort()) {
  console.log(`\n--- ${arch} (${byArch[arch].length} problemów) ---`);
  for (const issue of byArch[arch].slice(0, 5)) { // show first 5 per arch
    console.log(`  [${issue.id}] ${issue.title || ''}:`);
    for (const i of issue.issues) {
      console.log(`    ❌ ${i}`);
    }
  }
  if (byArch[arch].length > 5) {
    console.log(`  ... i ${byArch[arch].length - 5} więcej w tym archeotypie`);
  }
}

// Save full report
fs.writeFileSync('audit_report_full.json', JSON.stringify({ summary: { pass, warn, fail, total_issues: criticalIssues.length }, issues_by_arch: byArch }, null, 2));
console.log(`\nPełny raport JSON zapisany do: audit_report_full.json`);
