'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const katex = require('katex');

const CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const MIRROR_PATH = 'c:/Users/mateu/Downloads/mat/curriculum_matematyka.json';

const SCORING_KEYS_PATH = path.resolve(__dirname, '..', '.agents', 'explorer_m3_2', 'scoring_keys_48.json');
const MAPPED_FORMULAS_PATH = path.resolve(__dirname, '..', '.agents', 'spec_miner_m3_3', 'mapped_formulas.json');

// Load M3 deliverables
const scoringKeys = fs.existsSync(SCORING_KEYS_PATH)
  ? JSON.parse(fs.readFileSync(SCORING_KEYS_PATH, 'utf8'))
  : {};

const formulaMap = new Map();
if (fs.existsSync(MAPPED_FORMULAS_PATH)) {
  const mappedList = JSON.parse(fs.readFileSync(MAPPED_FORMULAS_PATH, 'utf8'));
  for (const item of mappedList) {
    const key = `${item.topic_id}:${item.lesson_id}:${item.formula_idx}`;
    formulaMap.set(key, {
      in_cke_sheet: item.new_in_cke_sheet,
      cke_page: item.new_cke_page
    });
  }
} else {
  console.warn(`[WARN] mapped_formulas.json not found at ${MAPPED_FORMULAS_PATH}`);
}

// 1. Read raw JSON and fix JSON control character escapes before JSON.parse
let raw = fs.readFileSync(CURRICULUM_PATH, 'utf8');
raw = raw.replace(/(?<!\\)\\frac/g, '\\\\frac');
raw = raw.replace(/\\u0007lpha/g, '\\\\alpha');
const data = JSON.parse(raw);

/**
 * Normalizes colon placement inside bold: **Title**: -> **Title:**
 */
function fixBoldColons(text) {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/\*\*([^*]+)\*\*:\s*/g, '**$1:** ')
    .replace(/\*\*([^*]+):\*\*\s*/g, '**$1:** ')
    .replace(/\s+:\s+/g, ': ');
}

/**
 * Replaces variations of "Karta CKE", "Karty CKE" with "karty wzorów" / "karcie wzorów"
 */
function replaceKartaCke(str) {
  if (!str || typeof str !== 'string') return str;
  let s = str;

  // Preposition + phrase
  s = s.replace(/\bw\s+Karcie\s+(?:Wzor[oó]w\s+)?CKE\b/gi, 'w karcie wzorów');
  s = s.replace(/\bW\s+Karcie\s+(?:Wzor[oó]w\s+)?CKE\b/g, 'W karcie wzorów');
  s = s.replace(/\bz\s+Karty\s+(?:Wzor[oó]w\s+)?CKE\b/gi, 'z karty wzorów');
  s = s.replace(/\bZ\s+Karty\s+(?:Wzor[oó]w\s+)?CKE\b/g, 'Z karty wzorów');
  s = s.replace(/\bw\s+Karcie\s+Wzor[oó]w\b/gi, 'w karcie wzorów');
  s = s.replace(/\bW\s+Karcie\s+Wzor[oó]w\b/g, 'W karcie wzorów');
  s = s.replace(/\bz\s+Karty\s+Wzor[oó]w\b/gi, 'z karty wzorów');
  s = s.replace(/\bZ\s+Karty\s+Wzor[oó]w\b/g, 'Z karty wzorów');

  // Direct phrase
  s = s.replace(/\bKarcie\s+(?:Wzor[oó]w\s+)?CKE\b/gi, 'karcie wzorów');
  s = s.replace(/\bKarty\s+(?:Wzor[oó]w\s+)?CKE\b/gi, 'karty wzorów');
  s = s.replace(/\bKarta\s+(?:Wzor[oó]w\s+)?CKE\b/gi, 'karta wzorów');
  s = s.replace(/\bKarty\s+Wzor[oó]w\b/g, 'karty wzorów');
  s = s.replace(/\bKarta\s+Wzor[oó]w\b/g, 'karta wzorów');
  s = s.replace(/\bKarcie\s+Wzor[oó]w\b/g, 'karcie wzorów');

  // Sentence starts / capitalization
  s = s.replace(/(?:^|([.!?:]\s+))karty\s+wzorów\b/g, '$1Karty wzorów');
  s = s.replace(/(?:^|([.!?:]\s+))karta\s+wzorów\b/g, '$1Karta wzorów');
  s = s.replace(/(?:^|([.!?:]\s+))karcie\s+wzorów\b/g, '$1Karcie wzorów');

  return s;
}

/**
 * Converts Unicode math symbols to standard LaTeX equivalents
 */
function convertUnicodeMath(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/⁴/g, '^4')
    .replace(/₁/g, '_1')
    .replace(/₂/g, '_2')
    .replace(/₃/g, '_3')
    .replace(/₄/g, '_4')
    .replace(/ₙ/g, '_n')
    .replace(/[Δ∆]/g, '\\Delta')
    .replace(/·/g, '\\cdot')
    .replace(/≤/g, '\\le')
    .replace(/≥/g, '\\ge')
    .replace(/≠/g, '\\neq')
    .replace(/≈/g, '\\approx')
    .replace(/∈/g, '\\in')
    .replace(/∉/g, '\\notin')
    .replace(/∪/g, '\\cup')
    .replace(/∩/g, '\\cap')
    .replace(/⊂/g, '\\subset')
    .replace(/Ω/g, '\\Omega')
    .replace(/π/g, '\\pi');
}

/**
 * Safely standardizes text by splitting into math and non-math segments
 */
function standardizeText(str) {
  if (!str || typeof str !== 'string') return str;

  // 1. Terminology replacement
  let s = replaceKartaCke(str);

  // 2. Split on existing math blocks ($...$ or $$...$$)
  const parts = s.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g);

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      // Inside math block ($...$ or $$...$$)
      let math = parts[i];
      math = convertUnicodeMath(math);
      math = math.replace(/p\s*=\s*-b\s*\/\s*\(?2a\)?/gi, 'p = -\\frac{b}{2a}');
      math = math.replace(/p\s*=\s*-b\s*\/\s*2a/gi, 'p = -\\frac{b}{2a}');
      math = math.replace(/q\s*=\s*-(?:\\Delta|Delta)\s*\/\s*\(?4a\)?/gi, 'q = -\\frac{\\Delta}{4a}');
      math = math.replace(/q\s*=\s*-(?:\\Delta|Delta)\s*\/\s*4a/gi, 'q = -\\frac{\\Delta}{4a}');
      math = math.replace(/q\s*=\s*-delta\s*\/\s*\(?4a\)?/gi, 'q = -\\frac{\\Delta}{4a}');
      parts[i] = math;
    } else {
      // Non-math text segment
      let seg = parts[i];
      if (!seg) continue;

      seg = convertUnicodeMath(seg);

      // Specific known formulas outside $
      seg = seg.replace(/\bp\s*=\s*-b\s*\/\s*\(?2a\)?/gi, '$p = -\\frac{b}{2a}$');
      seg = seg.replace(/\bp\s*=\s*-b\s*\/\s*2a/gi, '$p = -\\frac{b}{2a}$');
      seg = seg.replace(/\bq\s*=\s*-(?:\\Delta|Delta|delta)\s*\/\s*\(?4a\)?/gi, '$q = -\\frac{\\Delta}{4a}$');
      seg = seg.replace(/\bq\s*=\s*-(?:\\Delta|Delta|delta)\s*\/\s*4a/gi, '$q = -\\frac{\\Delta}{4a}$');

      seg = seg.replace(/\bV\s*=\s*1\/3\s*(?:\\cdot|\*|\s)?\s*P_?p\s*(?:\\cdot|\*|\s)?\s*H\b/g, '$V = \\frac{1}{3}P_p \\cdot H$');
      seg = seg.replace(/\bV\s*=\s*1\/3\s*(?:\\cdot|\*|\s)?\s*\\pi\s*(?:\\cdot|\*|\s)?\s*r\^2\s*(?:\\cdot|\*|\s)?\s*H\b/g, '$V = \\frac{1}{3}\\pi r^2 H$');
      seg = seg.replace(/\bV\s*=\s*1\/3\s*\*\s*pi\s*\*\s*r\^2\s*\*\s*H\b/g, '$V = \\frac{1}{3}\\pi r^2 H$');

      seg = seg.replace(/\bP\(A\)\s*=\s*\|A\|\s*\/\s*\|(?:\\Omega|Omega)\|\b/g, '$P(A) = \\frac{|A|}{|\\Omega|}$');
      seg = seg.replace(/\bP\(A'\)\s*=\s*1\s*-\s*P\(A\)\b/g, '$P(A\') = 1 - P(A)$');
      seg = seg.replace(/\bP\(A\s*\\cup\s*B\)\s*=\s*P\(A\)\s*\+\s*P\(B\)\s*-\s*P\(A\s*\\cap\s*B\)\b/g, '$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$');

      seg = seg.replace(/(?:\\Delta|Delta)\s*=\s*b\^2\s*-\s*4ac\b/g, '$\\Delta = b^2 - 4ac$');
      seg = seg.replace(/\bax\^2\s*\+\s*bx\s*\+\s*c\b/g, '$ax^2 + bx + c$');
      seg = seg.replace(/\by\s*=\s*ax\s*\+\s*b\b/g, '$y = ax + b$');
      seg = seg.replace(/\ba_1\s*=\s*a_2\b/g, '$a_1 = a_2$');
      seg = seg.replace(/\ba_1\s*\\cdot\s*a_2\s*=\s*-1\b/g, '$a_1 \\cdot a_2 = -1$');
      seg = seg.replace(/\ba_n\s*=\s*a_1\s*\+\s*\(n\s*-\s*1\)r\b/g, '$a_n = a_1 + (n-1)r$');

      seg = seg.replace(/\b(W|w)z[oó]r\s+na\s+p\s+jest/g, '$1zór na $p$ jest');
      seg = seg.replace(/\bwsp[oó]łrzędną\s+wierzchołka\s+p\b/g, 'współrzędną wierzchołka $p$');
      seg = seg.replace(/\bwierzchołek\s+paraboli\s+p\b/g, 'wierzchołek paraboli $p$');
      seg = seg.replace(/\bpierwiastki\s+x_1,\s*x_2\b/g, 'pierwiastki $x_1, x_2$');
      seg = seg.replace(/\bwspółczynnik\s+kierunkowy\s+a\b/g, 'współczynnik kierunkowy $a$');
      seg = seg.replace(/\bliczby\s+przy\s+x\^3,\s*x\^2,\s*x\b/g, 'liczby przy $x^3$, $x^2$, $x$');
      seg = seg.replace(/\b\|x\|\b/g, '$|x|$');
      seg = seg.replace(/\bliczby\s+x\b/g, 'liczby $x$');

      // 1. Wrap expressions containing \sqrt or \frac in non-math segment
      seg = seg.replace(/([a-zA-Z|]+\s*=\s*)?(\\sqrt\{[^{}]+\}|\\frac\{[^{}]+\}\{[^{}]+\})/g, '$$$1$2$$');

      // 2. Sub-split by $ so variable wrapping only targets remaining non-math parts
      const subParts = seg.split(/(\$[^$]+?\$)/g);
      for (let j = 0; j < subParts.length; j += 2) {
        let sub = subParts[j];
        sub = sub.replace(/(\\Delta\b)(?!\$)/g, '$$$1$$');
        sub = sub.replace(/(\\alpha\b|\\beta\b|\\gamma\b|\\pi\b|\\Omega\b)(?!\$)/g, '$$$1$$');
        sub = sub.replace(/\b([xyzabckmnpq])\^([0-9]+|\{[^}]+\})/g, '$$$1^$2$$');
        sub = sub.replace(/\b([xyzabckmnpqS])_([0-9n]|\{[^}]+\})/g, '$$$1_$2$$');
        subParts[j] = sub;
      }
      seg = subParts.join('');

      // Clean double dollars
      seg = seg.replace(/\${2,}(.*?)\${2,}/g, '$$$1$$');
      seg = seg.replace(/\$(\$[^$]+\$)\$/g, '$1');

      parts[i] = seg;
    }
  }

  let result = parts.join('');
  result = result.replace(/\${2,}/g, '$$').replace(/\$(\$[^$]+\$)\$/g, '$1');
  return result;
}

/**
 * Authoritative Content Defect Map for the 18 identified semantic defects (explorer_m3_1).
 */
const CONTENT_DEFECT_MAP = {
  'task-4-08-09': '$(-5, 4)$',
  'task-10-4-13': '$y = -2x + 7$',
  'task-10-6-13': '$m = 3$ lub $m = -3$',
  'task-11-6-11': '$6$ lub $8$',
  'task-11-13-11': '$600\\text{ cm}^2$',
  'task-11-13-13': '$5\\text{ cm}$',
  'task-11-13-15': '$2\\text{ m}^3$',
  'task-11-14-15': '$125\\,000$ razy',
  'task-12-6-15': '$5$ cyfr',
  'task-12-9-15': '$3$ elementy',
  'task-12-15-15': '$10$ sposobów',
  'task-13-14-11': 'Nie, bo $0{,}3 \\cdot 0{,}4 = 0{,}12 \\neq 0{,}15$',
  'task-14-2-11': '34/3',
  'task-14-10-15': 'wynosi 2 niezależnie od k',
  'task-14-15-11': '\\sqrt{1{,}2}',
  'task-14-15-12': 'średnia 72 kg, odchylenie 5 kg',
  'task-15-4-14': '600 m^2',
  'task-15-11-14': '4 + \\sqrt{21} s'
};

/**
 * Strips outer LaTeX $...$ delimiters and trims whitespace.
 */
function stripMathDelims(s) {
  if (typeof s !== 'string') return '';
  s = s.trim();
  if (s.startsWith('$') && s.endsWith('$') && s.length >= 2) {
    return s.slice(1, -1).trim();
  }
  return s;
}

/**
 * Normalizes decimal separators ({,} and , to .) and collapses spaces.
 */
function normalizeText(s) {
  if (typeof s !== 'string') return '';
  s = stripMathDelims(s);
  s = s.replace(/\{,\}/g, '.');
  s = s.replace(/,/g, '.');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

/**
 * Deterministically resolves task.correct_answer to match verbatim in task.options.
 */
function resolveCorrectAnswer(task) {
  const tid = task.id;
  const opts = task.options;
  if (!opts || !Array.isArray(opts) || opts.length === 0) {
    return task.correct_answer;
  }

  const currentAns = task.correct_answer;

  // 1. Content defect lookup
  if (CONTENT_DEFECT_MAP[tid]) {
    const fixed = CONTENT_DEFECT_MAP[tid];
    if (opts.includes(fixed)) return fixed;
    throw new Error(`[CRITICAL] Content fix "${fixed}" not found in options for task "${tid}": ${JSON.stringify(opts)}`);
  }

  // 2. Exact verbatim match
  if (opts.includes(currentAns)) {
    return currentAns;
  }

  // 3. Delimiter match ($...$ stripping)
  const targetStripped = stripMathDelims(currentAns);
  const delimMatches = opts.filter(opt => stripMathDelims(opt) === targetStripped);
  if (delimMatches.length === 1) {
    return delimMatches[0];
  }
  if (delimMatches.length > 1) {
    throw new Error(`[CRITICAL] Ambiguous delimiter match for task "${tid}": ${delimMatches.join(' vs ')}`);
  }

  // 4. Decimal notation and whitespace normalization
  const targetNorm = normalizeText(currentAns);
  const normMatches = opts.filter(opt => normalizeText(opt) === targetNorm);
  if (normMatches.length === 1) {
    return normMatches[0];
  }
  if (normMatches.length > 1) {
    throw new Error(`[CRITICAL] Ambiguous normalized decimal match for task "${tid}": ${normMatches.join(' vs ')}`);
  }

  throw new Error(`[CRITICAL] Failed to resolve correct_answer for task "${tid}": ans="${currentAns}", opts=${JSON.stringify(opts)}`);
}

/**
 * Standardizes core_formulas: aligns CKE 2023 pages, PRESERVES array of objects and authentic tips!
 */
function standardizeCoreFormulas(cf, topicId, lessonId) {
  if (!cf) return cf;

  if (Array.isArray(cf)) {
    return cf.map((f, idx) => {
      if (typeof f === 'string') {
        return standardizeText(f.trim());
      }
      if (f && typeof f === 'object') {
        const updated = { ...f };
        if (updated.title) updated.title = fixBoldColons(updated.title.trim());
        if (updated.description) updated.description = standardizeText(updated.description);

        // Align CKE 2023 formula sheet page and in_cke_sheet flag
        const fMapping = formulaMap.get(`${topicId}:${lessonId}:${idx}`);
        if (fMapping) {
          updated.in_cke_sheet = fMapping.in_cke_sheet;
          updated.cke_page = fMapping.cke_page;
        }

        // Substitute authentic matura tips for lessons 1.1, 1.5, 1.6
        if (lessonId === 'lesson-1-1') {
          if (idx === 0) {
            updated.matura_tip = "Tego zapisu NIE MA w karcie wzorów. Pamiętaj: nierówność ostra ($<$ lub $>$) oznacza kółko otwarte i nawias okrągły $(a, b)$, a nierówność słaba ($\\le$ lub $\\ge$) to kółko zamalowane i nawias domknięty $\\langle a, b \\rangle$. Przy nieskończoności ($-\\infty$, $+\\infty$) zawsze stosuj nawias okrągły.";
          } else if (idx === 1) {
            updated.matura_tip = "Tego zapisu NIE MA w karcie wzorów. Pamiętaj: suma $A \\cup B$ to połączenie obu przedziałów (bierzesz wszystko), a iloczyn (część wspólna) $A \\cap B$ to tylko część nakładająca się na siebie. Na maturze zawsze narysuj oba przedziały na jednej osi liczbowej, aby uniknąć pomyłki na krańcach.";
          }
        } else if (lessonId === 'lesson-1-5') {
          if (idx === 0) {
            updated.matura_tip = "Tego wzoru NIE MA w karcie wzorów – warto go opanować! Mnożnik podwyżki o $p\\%$ to $\\left(1 + \\frac{p}{100}\\right)$, a obniżki to $\\left(1 - \\frac{p}{100}\\right)$. Klasyczna pułapka maturalna: po dwóch kolejnych obniżkach o $10\\%$ cena nie spada o $20\\%$, lecz wynosi $c_0 \\cdot 0{,}9 \\cdot 0{,}9 = 0{,}81 c_0$ (obniżka o $19\\%$).";
          } else if (idx === 1) {
            updated.matura_tip = "Tego wzoru NIE MA w karcie wzorów. W mianowniku zawsze umieszczaj wielkość bazową (tę, do której się odnosisz po słowie 'od' lub 'stanowi'). Na maturze uważaj na pytanie 'o ile procent $a$ jest większe/mniejsze od $b$' – wtedy w liczniku jest $|a - b|$, a w mianowniku liczba odniesienia $b$.";
          }
        } else if (lessonId === 'lesson-1-6') {
          if (idx === 0) {
            updated.matura_tip = "Tego pojęcia NIE MA w karcie wzorów. Zapamiętaj: punkty procentowe (p.p.) to bezwzględna różnica między dwoma procentami ($p_2 - p_1$). Jeśli poparcie wzrosło z $20\\%$ do $25\\%$, to wzrosło o $5$ punktów procentowych (p.p.), ale względny wzrost poparcia wynosi $\\frac{5}{20} \\cdot 100\\% = 25\\%$.";
          } else if (idx === 1 && updated.matura_tip) {
            updated.matura_tip = standardizeText(updated.matura_tip);
          }
        } else if (updated.matura_tip) {
          updated.matura_tip = standardizeText(updated.matura_tip);
        }

        return updated;
      }
      return f;
    });
  }

  if (typeof cf === 'string') {
    return standardizeText(cf);
  }

  return cf;
}

// 2. Process all lessons and deduplicate Dział 1
let removedDups = 0;
let totalTasks = 0;
let processedLessons = 0;
let appliedScoringKeys = 0;
let checkedOptionsTasks = 0;
let resolvedAnswersCount = 0;

for (let ti = 0; ti < data.topics.length; ti++) {
  const topic = data.topics[ti];
  const isDzial1 = (ti === 0);

  for (const lesson of topic.lessons) {
    processedLessons++;

    // Lesson titles
    if (lesson.title) lesson.title = standardizeText(lesson.title);
    if (lesson.formula_sheet && lesson.formula_sheet.title) lesson.formula_sheet.title = standardizeText(lesson.formula_sheet.title);
    if (lesson.formulaSheet && lesson.formulaSheet.title) lesson.formulaSheet.title = standardizeText(lesson.formulaSheet.title);

    // Deduplicate tasks in Dział 1
    if (isDzial1 && Array.isArray(lesson.tasks)) {
      const seen = new Set();
      const initial = lesson.tasks.length;
      lesson.tasks = lesson.tasks.filter(t => {
        if (seen.has(t.id)) return false;
        seen.add(t.id);
        return true;
      });
      removedDups += (initial - lesson.tasks.length);
    }
    totalTasks += (lesson.tasks || []).length;

    if (!lesson.theory_pill) continue;

    // Standardize concept_essence
    if (typeof lesson.theory_pill.concept_essence === 'string') {
      lesson.theory_pill.concept_essence = standardizeText(lesson.theory_pill.concept_essence);
    }

    // Fix core formulas
    if (lesson.theory_pill.core_formulas) {
      lesson.theory_pill.core_formulas = standardizeCoreFormulas(lesson.theory_pill.core_formulas, topic.id, lesson.id);
    }

    // Fix worked example
    if (lesson.theory_pill.worked_example) {
      if (typeof lesson.theory_pill.worked_example === 'string') {
        lesson.theory_pill.worked_example = standardizeText(lesson.theory_pill.worked_example);
      } else if (typeof lesson.theory_pill.worked_example === 'object') {
        const we = lesson.theory_pill.worked_example;
        if (we.problem) we.problem = standardizeText(we.problem);
        if (we.result) we.result = standardizeText(we.result);
        if (Array.isArray(we.steps)) {
          we.steps.forEach(step => {
            if (step.label) step.label = fixBoldColons(step.label);
            if (step.text) step.text = standardizeText(step.text);
            if (step.desc) step.desc = standardizeText(step.desc);
            if (step.math) step.math = standardizeText(step.math);
          });
        }
      }
    }

    // Fix exam trap
    if (typeof lesson.theory_pill.exam_trap === 'string') {
      let trap = lesson.theory_pill.exam_trap;
      trap = fixBoldColons(trap);
      trap = standardizeText(trap);
      trap = trap.replace(/^Błąd typowy:?/i, 'Typowy błąd:');
      trap = trap.replace(/^Kardynalny błąd:?/i, 'Typowy błąd:');
      lesson.theory_pill.exam_trap = trap;
    }

    // Fix matura_context
    if (typeof lesson.theory_pill.matura_context === 'string') {
      lesson.theory_pill.matura_context = standardizeText(lesson.theory_pill.matura_context);
    }

    // Process tasks
    for (const task of lesson.tasks || []) {
      if (task.explanation) task.explanation = standardizeText(task.explanation);
      if (task.hint) task.hint = standardizeText(task.hint);
      if (task.question) task.question = standardizeText(task.question);
      if (task.content) task.content = standardizeText(task.content);
      if (Array.isArray(task.ai_hints)) {
        task.ai_hints = task.ai_hints.map(standardizeText);
      }

      // Populate scoring_key for open tasks if missing / present in scoringKeys (all 48 tasks in Działy 1-3)
      if (task.type === 'OPEN_PROOF' || task.type === 'OPEN_GENERAL') {
        if (scoringKeys[task.id]) {
          task.scoring_key = scoringKeys[task.id];
          appliedScoringKeys++;
        }
      }

      // Standardize correct_answer for tasks with options
      if (task.options && Array.isArray(task.options) && task.options.length > 0) {
        checkedOptionsTasks++;
        const resolved = resolveCorrectAnswer(task);
        if (resolved !== task.correct_answer) {
          task.correct_answer = resolved;
          resolvedAnswersCount++;
        }
      }
    }
  }
}

// 3. Save standardized JSON to canonical seed path
fs.writeFileSync(CURRICULUM_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`[OK] Successfully standardized curriculum at ${CURRICULUM_PATH}`);
console.log(`     Processed lessons: ${processedLessons}`);
console.log(`     Removed duplicate tasks from Dział 1: ${removedDups}`);
console.log(`     Total unique tasks remaining: ${totalTasks}`);
console.log(`     Scoring keys applied to open tasks: ${appliedScoringKeys}`);
console.log(`     Multiple-choice tasks evaluated: ${checkedOptionsTasks}`);
console.log(`     Correct answers resolved/normalized: ${resolvedAnswersCount}`);

// 4. Mirror to distribution target
if (fs.existsSync(path.dirname(MIRROR_PATH))) {
  fs.copyFileSync(CURRICULUM_PATH, MIRROR_PATH);
  console.log(`[OK] Successfully mirrored standardized curriculum to ${MIRROR_PATH}`);
} else {
  console.warn(`[WARN] Mirror target directory does not exist: ${path.dirname(MIRROR_PATH)}`);
}

// Compute SHA256 checksums to guarantee byte-for-byte synchronization
const seedSha = crypto.createHash('sha256').update(fs.readFileSync(CURRICULUM_PATH)).digest('hex');
let mirrorSha = null;
if (fs.existsSync(MIRROR_PATH)) {
  mirrorSha = crypto.createHash('sha256').update(fs.readFileSync(MIRROR_PATH)).digest('hex');
}
console.log(`     Seed SHA256:   ${seedSha}`);
console.log(`     Mirror SHA256: ${mirrorSha}`);
console.log(`     Checksums Identical: ${seedSha === mirrorSha}`);

// 5. Verification checks
let verificationFailed = false;

let parseErrors = [];
function checkAll(obj, pathStr = '') {
  if (typeof obj === 'string') {
    if (obj.includes('[object Object]')) {
      console.error('FATAL: [object Object] found at', pathStr);
      verificationFailed = true;
    }
    const mathRegex = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
    let match;
    while ((match = mathRegex.exec(obj)) !== null) {
      const math = match[1] || match[2];
      try {
        katex.renderToString(math, { throwOnError: true });
      } catch (err) {
        parseErrors.push({ pathStr, math, error: err.message });
      }
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((x, i) => checkAll(x, `${pathStr}[${i}]`));
  } else if (obj && typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => checkAll(v, `${pathStr}.${k}`));
  }
}
checkAll(data);

console.log(`[VERIFY] Total KaTeX parse errors across entire dataset: ${parseErrors.length}`);
if (parseErrors.length > 0) {
  parseErrors.slice(0, 5).forEach(e => console.error('  Error at', e.pathStr, e.error));
  verificationFailed = true;
}

const serialized = JSON.stringify(data);
const ckeMatches = serialized.match(/(?:w\s+)?(?:karcie|karty|karta)\s+(?:wzor[oó]w\s+)?cke/gi);
console.log(`[VERIFY] Residual Kart* CKE matches in entire dataset: ${ckeMatches ? ckeMatches.length : 0}`);
if (ckeMatches && ckeMatches.length > 0) {
  verificationFailed = true;
}

const rawPMatches = serialized.match(/(?<!\\frac\{b\}\{)p\s*=\s*-b\s*\/\s*\(?2a\)?/gi);
console.log(`[VERIFY] Residual raw p = -b/(2a) matches in entire dataset: ${rawPMatches ? rawPMatches.length : 0}`);
if (rawPMatches && rawPMatches.length > 0) {
  verificationFailed = true;
}

// Verify 100% options.includes(correct_answer)
let answerMismatches = 0;
let tasksWithDuplicateOptions = 0;
let tasksWithOptionPrefixes = 0;
const prefixPattern = /^(?:Odp\.?|Odpowiedź)?\s*[A-D][.:)]\s*/i;

let openTasksCount = 0;
let missingScoringKeyCount = 0;
let totalCoreFormulas = 0;
let invalidCkePageCount = 0;

for (const topic of data.topics) {
  for (const lesson of topic.lessons) {
    // Core formulas verification
    if (lesson.theory_pill && Array.isArray(lesson.theory_pill.core_formulas)) {
      for (const cf of lesson.theory_pill.core_formulas) {
        totalCoreFormulas++;
        if (cf.in_cke_sheet === true) {
          if (!cf.cke_page || typeof cf.cke_page !== 'string') {
            invalidCkePageCount++;
            console.error(`[VERIFY FAIL] Formula "${cf.title}" in ${lesson.id} has in_cke_sheet: true but invalid cke_page: ${cf.cke_page}`);
          } else {
            // Check pages are within 4-32
            const pageNums = (cf.cke_page.match(/\d+/g) || []).map(Number);
            if (pageNums.length === 0 || pageNums.some(p => p < 4 || p > 32)) {
              invalidCkePageCount++;
              console.error(`[VERIFY FAIL] Formula "${cf.title}" in ${lesson.id} has out-of-range cke_page: ${cf.cke_page}`);
            }
          }
        } else if (cf.in_cke_sheet === false) {
          if (cf.cke_page !== null) {
            invalidCkePageCount++;
            console.error(`[VERIFY FAIL] Formula "${cf.title}" in ${lesson.id} has in_cke_sheet: false but non-null cke_page: ${cf.cke_page}`);
          }
        } else {
          invalidCkePageCount++;
          console.error(`[VERIFY FAIL] Formula "${cf.title}" in ${lesson.id} missing in_cke_sheet boolean flag`);
        }
      }
    }

    // Tasks verification
    for (const task of lesson.tasks || []) {
      if (task.type === 'OPEN_PROOF' || task.type === 'OPEN_GENERAL') {
        openTasksCount++;
        let hasValidKey = false;
        if (typeof task.scoring_key === 'string' && task.scoring_key.trim().length > 0) {
          hasValidKey = true;
        } else if (Array.isArray(task.scoring_key) && task.scoring_key.length > 0 && task.scoring_key.every(s => typeof s === 'string' && s.trim().length > 0)) {
          hasValidKey = true;
        }
        if (!hasValidKey) {
          missingScoringKeyCount++;
          console.error(`[VERIFY FAIL] Open task ${task.id} (${task.type}) missing scoring_key!`);
        }
      }

      if (task.options && Array.isArray(task.options) && task.options.length > 0) {
        if (!task.options.includes(task.correct_answer)) {
          answerMismatches++;
          console.error(`[VERIFY FAIL] Task ${task.id}: correct_answer "${task.correct_answer}" not in options ${JSON.stringify(task.options)}`);
        }

        const trimmedOpts = task.options.map(o => (typeof o === 'string' ? o.trim() : o));
        if (new Set(trimmedOpts).size !== trimmedOpts.length) {
          tasksWithDuplicateOptions++;
          console.error(`[VERIFY FAIL] Task ${task.id} has duplicate options: ${JSON.stringify(task.options)}`);
        }

        for (const opt of task.options) {
          if (typeof opt === 'string' && prefixPattern.test(opt)) {
            tasksWithOptionPrefixes++;
            console.error(`[VERIFY FAIL] Task ${task.id} option has unwanted prefix: "${opt}"`);
          }
        }
      }
    }
  }
}

console.log(`[VERIFY] Multiple-choice correct_answer mismatches: ${answerMismatches}`);
if (answerMismatches > 0) verificationFailed = true;

console.log(`[VERIFY] Tasks with duplicate options: ${tasksWithDuplicateOptions}`);
if (tasksWithDuplicateOptions > 0) verificationFailed = true;

console.log(`[VERIFY] Tasks with option prefixes: ${tasksWithOptionPrefixes}`);
if (tasksWithOptionPrefixes > 0) verificationFailed = true;

console.log(`[VERIFY] Open tasks count: ${openTasksCount}, Missing scoring keys: ${missingScoringKeyCount}`);
if (missingScoringKeyCount > 0) verificationFailed = true;

console.log(`[VERIFY] Total core formulas verified: ${totalCoreFormulas}, Invalid CKE pages: ${invalidCkePageCount}`);
if (invalidCkePageCount > 0) verificationFailed = true;

if (mirrorSha !== null && seedSha !== mirrorSha) {
  console.error('[VERIFY FAIL] Seed and Mirror SHA256 checksums do not match!');
  verificationFailed = true;
}

if (verificationFailed) {
  console.error('\n[FATAL] Standardization verification failed. Please review errors above.');
  process.exit(1);
}

console.log('\n[SUCCESS] All verification checks passed with 100% integrity.');
