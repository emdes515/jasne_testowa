'use strict';

const fs = require('fs');
const path = require('path');

const CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const data = JSON.parse(fs.readFileSync(CURRICULUM_PATH, 'utf8'));

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
 * Wraps bare mathematical tokens in LaTeX delimiters $...$
 */
function wrapMathTokens(str) {
  if (!str || typeof str !== 'string') return str;

  // Split into math ($...$) and non-math segments
  const parts = str.split(/(\$[^$]+\$|\$\$[^$]+\$\$)/g);
  
  for (let i = 0; i < parts.length; i += 2) {
    let seg = parts[i];
    if (!seg) continue;

    // 1. Bare LaTeX commands like \frac{...}{...}, \sqrt{...}, \cdot, etc.
    seg = seg.replace(/(\\frac\{[^{}]+\}\{[^{}]+\})/g, '$$$1$$');
    seg = seg.replace(/(\\sqrt(?:\[[0-9]+\])?\{[^{}]+\})/g, '$$$1$$');
    seg = seg.replace(/(\\mathbb\{[A-Z]+\})/g, '$$$1$$');
    seg = seg.replace(/(\\Delta\b)/g, '$$$1$$');
    seg = seg.replace(/(\\alpha\b|\\beta\b|\\gamma\b|\\pi\b|\\Omega\b)/g, '$$$1$$');
    seg = seg.replace(/(\\sin\b|\\cos\b|\\operatorname\{tg\}\b|\\operatorname\{ctg\}\b|\\tan\b|\\cot\b)/g, '$$$1$$');
    seg = seg.replace(/(\\le\b|\\ge\b|\\neq\b|\\approx\b|\\in\b|\\notin\b|\\subset\b|\\cup\b|\\cap\b)/g, '$$$1$$');
    seg = seg.replace(/(\\iff\b|\\implies\b)/g, '$$$1$$');

    // 2. Variables with powers e.g. x^2, a^3, n^2, x^{...}
    seg = seg.replace(/\b([xyzabckmnpq])\^([0-9]+|\{[^}]+\})/g, '$$$1^$2$$');

    // 3. Subscript variables e.g. x_0, y_0, a_n, S_n, x_1, x_2
    seg = seg.replace(/\b([xyzabckmnpqS])_([0-9n]|\{[^}]+\})/g, '$$$1_$2$$');

    // 4. Function notations e.g. f(x), g(x), W(x), P(x)
    seg = seg.replace(/\b([fgWP])\(([xyz0-9])\)/g, '$$$1($2)$$');

    // 5. Percentages e.g. p%, 10%, 20%
    seg = seg.replace(/\b([px])%/g, '$$$1\\%$$');

    // 6. Common equations like y = ax + b, a > 0, delta = b^2 - 4ac
    seg = seg.replace(/\b([xyz])\s*=\s*([0-9]+)/g, '$$$1 = $2$$');
    seg = seg.replace(/\b([abckmnpq])\s*([<>]=?)\s*([0-9]+)/g, '$$$1 $2 $3$$');

    // 7. Coordinates e.g. (x, y), (0, c), (p, q), (x_1, y_1)
    seg = seg.replace(/(?<!\$)\(([xyzpqa-d0-9_-]+),\s*([xyzpqa-d0-9_-]+)\)(?!\$)/g, '$$($1, $2)$$');

    // Clean up accidental double dollar signs or nested delimiters
    seg = seg.replace(/\${2,}(.*?)\${2,}/g, '$$$1$$');
    seg = seg.replace(/\$(\$[^$]+\$)\$/g, '$1');

    parts[i] = seg;
  }

  return parts.join('');
}

/**
 * Cleans up and standardizes task explanation and hint strings
 */
function cleanTaskText(text) {
  if (!text || typeof text !== 'string') return text;
  let s = text;
  
  // Wrap unescaped LaTeX expressions that start with \frac, \sqrt, etc.
  s = s.replace(/(?<!\$)((\\frac\{[^{}]+\}\{[^{}]+\}|\\sqrt(?:\[[0-9]+\])?\{[^{}]+\}|[a-zA-Z0-9^_{}]+\s*=\s*[^,.;\s]+|\\in\s*\\mathbb\{[A-Z]+\})(?:[^$.,;\n]*))(?![\w$])/g, (match) => {
    if (match.includes('$')) return match;
    return `$${match.trim()}$`;
  });

  // Wrap remaining bare \sqrt or \frac if any
  s = s.replace(/(?<!\$)\\sqrt\{([^}]+)\}(?!\$)/g, '$\\sqrt{$1}$');
  s = s.replace(/(?<!\$)\\frac\{([^}]+)\}\{([^}]+)\}(?!\$)/g, '$\\frac{$1}{$2}$');

  // Fix multiple adjacent dollars
  s = s.replace(/\${2,}/g, '$$').replace(/\$(\$[^$]+\$)\$/g, '$1');
  return s;
}

/**
 * Standardizes a concept_essence string into clean, bulleted micro-content
 */
function standardizeConceptEssence(lesson, topic) {
  let ce = lesson.theory_pill?.concept_essence || '';
  if (!ce) return ce;

  // Preserve specifically curated lessons
  if (lesson.id === 'lesson-1-1') {
    return '• **Nawiasy okrągłe $(a, b)$:** wykluczają punkty brzegowe z przedziału (nierówności ostre $<, >$).\n\n• **Nawiasy domknięte $\\langle a, b\\rangle$:** włączają punkty brzegowe do przedziału (nierówności słabe $\\le, \\ge$).';
  }
  if (lesson.id === 'lesson-1-5') {
    return '• **Podwyżka ceny o $p\\%$:** pomnożenie ceny początkowej przez mnożnik $\\left(1 + \\frac{p}{100}\\right)$.\n\n• **Obniżka ceny o $p\\%$:** pomnożenie ceny początkowej przez mnożnik $\\left(1 - \\frac{p}{100}\\right)$.\n\n• **Wielokrotne zmiany cen:** kolejne mnożniki mnożymy przez siebie, np. dwie kolejne obniżki o $10\\%$ dają mnożnik $0{,}90 \\cdot 0{,}90 = 0{,}81$ (obniżka o $19\\%$, a nie o $20\\%$).';
  }
  if (lesson.id === 'lesson-1-6') {
    return '• **Błąd bezwzględny $\\Delta$:** moduł różnicy między wartością dokładną $x$ a przybliżoną $x_0$:\n$$\\Delta = |x - x_0|$$\n\n• **Błąd względny $\\delta$:** stosunek błędu bezwzględnego do modułu wartości DOKŁADNEJ $x$:\n$$\\delta = \\frac{|x - x_0|}{|x|} \\cdot 100\\%$$';
  }

  // Pre-normalize numbered lists: e.g. "1. Oznaczenie ... 2. Zapisanie ..." -> split on numbering
  let normalizedCe = ce.replace(/\r\n/g, '\n').trim();

  // If already bulleted, normalize bullets
  if (normalizedCe.includes('•')) {
    const lines = normalizedCe.split('\n').map(l => l.trim()).filter(Boolean);
    const bullets = lines.map(line => {
      let cleanLine = line.replace(/^[•\-*]\s*/, '').trim();
      cleanLine = fixBoldColons(cleanLine);
      cleanLine = wrapMathTokens(cleanLine);
      return `• ${cleanLine}`;
    });
    return bullets.join('\n\n');
  }

  // Detect numbered items e.g. "1. ... 2. ... 3. ..." or "1) ... 2) ..."
  const hasNumberedList = /\b[1-5]\.\s+[A-ZĄĆĘŁŃÓŚŹŻ]/.test(normalizedCe);
  if (hasNumberedList) {
    // Extract intro before "1."
    const introMatch = normalizedCe.match(/^(.*?)(?:(?:\n|^)\s*1\.\s+)(.*)$/s);
    if (introMatch) {
      const intro = introMatch[1].trim().replace(/:\s*$/, '');
      const listContent = '1. ' + introMatch[2].trim();
      const items = listContent.split(/(?:^|\n|\s+)(?=[1-9]\.\s+)/).map(item => item.trim()).filter(Boolean);
      
      const bullets = [];
      if (intro && intro.length > 5) {
        bullets.push(`• **Zasada ogólna:** ${wrapMathTokens(intro)}.`);
      }
      for (const item of items) {
        const itemClean = item.replace(/^[1-9]\.\s*/, '').trim();
        if (!itemClean) continue;
        const boldSplit = itemClean.match(/^([^:–—]+)[:–—]\s*(.*)$/);
        if (boldSplit && boldSplit[1].length < 35) {
          bullets.push(`• **${boldSplit[1].trim()}:** ${wrapMathTokens(boldSplit[2].trim())}`);
        } else {
          bullets.push(`• ${wrapMathTokens(itemClean)}`);
        }
      }
      if (bullets.length > 1) {
        return bullets.map(b => fixBoldColons(b)).join('\n\n');
      }
    }
  }

  // Break into sentences/clauses
  const sentences = normalizedCe.split(/(?<=[.!?])\s+(?=[A-ZĄĆĘŁŃÓŚŹŻ])/).map(s => s.trim()).filter(Boolean);
  
  if (sentences.length <= 1) {
    let s = wrapMathTokens(sentences[0]);
    s = fixBoldColons(s);
    return '• ' + s;
  }

  const bullets = sentences.map((sent, idx) => {
    let s = wrapMathTokens(sent);
    s = fixBoldColons(s);

    if (s.startsWith('•')) return s;

    // Check if sentence starts with bold
    if (/^\*\*[^*]+\*\*/.test(s)) {
      return '• ' + s;
    }

    // Attempt to extract key term before common verbs
    const match = s.match(/^([A-ZĄĆĘŁŃÓŚŹŻa-z0-9\$\s\{\}\\\^_\/–—]+?)\s+(to|oznacza|mówi|polega|jest|wynosi|wynikają|odpowiada|obliczamy|określa|wymaga|pozwala|informuje|rozwiązujemy)\s+(.*)/i);
    if (match && match[1].length < 40 && !match[1].includes('.') && !match[1].includes(',')) {
      const title = match[1].trim();
      const verb = match[2];
      const rest = match[3];
      return `• **${title}:** ${verb} ${rest}`;
    }

    // If first sentence, use topic/lesson title keywords
    if (idx === 0) {
      const shortTitle = lesson.title.split(/[:(]/)[0].trim();
      return `• **${shortTitle}:** ${s.charAt(0).toLowerCase() + s.slice(1)}`;
    }

    return `• ${s}`;
  });

  return bullets.join('\n\n');
}

/**
 * Standardizes core_formulas into clean line-separated formulas
 */
function standardizeCoreFormulas(cf) {
  if (!cf) return cf;
  if (Array.isArray(cf)) {
    return cf.map(f => typeof f === 'string' ? f.trim() : f).filter(Boolean).join('\n');
  }
  if (typeof cf === 'string') {
    let s = cf.trim();
    if (s.includes('. ') && (s.includes('=') || s.includes('\\'))) {
      s = s.split(/(?<=\.)\s+(?=[A-Z$])/).join('\n');
    }
    return s;
  }
  return cf;
}

/**
 * Main processing loop
 */
let updatedEssenceCount = 0;
let updatedTasksCount = 0;

for (const topic of data.topics) {
  for (const lesson of topic.lessons) {
    if (!lesson.theory_pill) continue;

    const oldCe = lesson.theory_pill.concept_essence;
    const newCe = standardizeConceptEssence(lesson, topic);
    if (newCe !== oldCe) {
      lesson.theory_pill.concept_essence = newCe;
      updatedEssenceCount++;
    }

    // Fix core formulas
    if (lesson.theory_pill.core_formulas) {
      lesson.theory_pill.core_formulas = standardizeCoreFormulas(lesson.theory_pill.core_formulas);
    }

    // Fix worked example
    if (typeof lesson.theory_pill.worked_example === 'string') {
      lesson.theory_pill.worked_example = wrapMathTokens(lesson.theory_pill.worked_example);
    }

    // Fix exam trap
    if (typeof lesson.theory_pill.exam_trap === 'string') {
      let trap = lesson.theory_pill.exam_trap;
      trap = fixBoldColons(trap);
      trap = wrapMathTokens(trap);
      trap = trap.replace(/^Błąd typowy:?/i, 'Typowy błąd:');
      trap = trap.replace(/^Kardynalny błąd:?/i, 'Typowy błąd:');
      lesson.theory_pill.exam_trap = trap;
    }

    // Process tasks
    for (const task of lesson.tasks || []) {
      if (task.explanation) {
        const clean = cleanTaskText(task.explanation);
        if (clean !== task.explanation) {
          task.explanation = clean;
          updatedTasksCount++;
        }
      }
      if (task.hint) {
        const clean = cleanTaskText(task.hint);
        if (clean !== task.hint) {
          task.hint = clean;
          updatedTasksCount++;
        }
      }
    }
  }
}

fs.writeFileSync(CURRICULUM_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`Successfully standardized curriculum!`);
console.log(`Updated concept_essence in ${updatedEssenceCount} lessons.`);
console.log(`Updated task explanations/hints in ${updatedTasksCount} places.`);
