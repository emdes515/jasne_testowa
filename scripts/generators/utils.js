/**
 * Helper utilities for task generation, formatting, KaTeX validation and shuffling.
 */

// Simple deterministic PRNG (Mulberry32)
export function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Ensures clean polynomial formatting without "+ -", "+ 0", "- 0".
 */
export function formatSigned(num, variable = '') {
  if (num === 0) return '';
  const sign = num > 0 ? '+ ' : '- ';
  const absVal = Math.abs(num);
  const valStr = (variable && absVal === 1) ? '' : absVal;
  return `${sign}${valStr}${variable}`;
}

/**
 * Formats a quadratic polynomial ax^2 + bx + c cleanly.
 */
export function formatQuadratic(a, b, c) {
  let res = '';
  if (a === 1) res += 'x^2';
  else if (a === -1) res += '-x^2';
  else res += `${a}x^2`;

  if (b !== 0) {
    res += ' ' + (b > 0 ? '+ ' : '- ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'x';
  }
  if (c !== 0) {
    res += ' ' + (c > 0 ? '+ ' : '- ') + Math.abs(c);
  }
  return res;
}

/**
 * Greatest common divisor
 */
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

/**
 * Formats fraction cleanly in KaTeX
 */
export function formatFraction(num, den) {
  if (den === 0) throw new Error('Division by zero!');
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcd(num, den);
  num = num / g;
  den = den / g;
  if (den === 1) return `${num}`;
  if (num < 0) return `-\\frac{${Math.abs(num)}}{${den}}`;
  return `\\frac{${num}}{${den}}`;
}

/**
 * Shuffles options using Fisher-Yates with deterministic PRNG,
 * verifies uniqueness, sets correct_answer to new letter ('A', 'B', 'C', 'D'),
 * and appends "Podsumowanie: Prawidłową odpowiedzią jest [Letter]." to explanation.
 */
export function finalizeSingleChoiceTask(task, seed = 12345) {
  if (!task.options || task.options.length !== 4) {
    throw new Error(`Task ${task.id} must have exactly 4 options!`);
  }

  // Ensure all options are strictly unique
  const uniqueSet = new Set(task.options);
  if (uniqueSet.size !== 4) {
    throw new Error(`Task ${task.id} has duplicate options: ${JSON.stringify(task.options)}`);
  }

  const rng = mulberry32(seed);
  const letters = ['A', 'B', 'C', 'D'];
  
  // Originally options[0] is the correct option
  const originalCorrect = task.options[0];
  const items = [...task.options];

  // Fisher-Yates shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }

  const correctIndex = items.indexOf(originalCorrect);
  const correctLetter = letters[correctIndex];

  task.options = items;
  task.correct_answer = correctLetter;

  // Append summary if not present
  if (!task.explanation.includes('Podsumowanie:')) {
    task.explanation += `\n\n**Podsumowanie:** Prawidłową odpowiedzią jest **${correctLetter}**.`;
  }

  return task;
}

/**
 * Creates guaranteed 4 unique options from a correct option and list of candidate distractors.
 */
export function makeOptions(correctOpt, candidateDistractors) {
  const options = [correctOpt];
  for (const cand of candidateDistractors) {
    if (cand !== undefined && cand !== null && !options.includes(cand)) {
      options.push(cand);
    }
    if (options.length === 4) break;
  }
  if (options.length < 4) {
    throw new Error(`Could not form 4 unique options for correct=${correctOpt}, candidates=${JSON.stringify(candidateDistractors)}`);
  }
  return options;
}
