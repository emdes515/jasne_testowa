/**
 * Wspólne narzędzia generatora kursu matematyki (poziom podstawowy, wymagania CKE 2025+).
 * Każde zadanie zamknięte przechodzi niezależną kontrolę: opcje są parsowane z LaTeX-u
 * z powrotem do liczb i porównywane z wartością wyliczoną arytmetycznie.
 */

export const T = String.raw;

// ---------- PRNG ----------
export function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeR(seed) {
  const rnd = mulberry32(seed);
  const r = {
    rnd,
    int: (a, b) => a + Math.floor(rnd() * (b - a + 1)),
    pick: (arr) => arr[Math.floor(rnd() * arr.length)],
    /** liczba całkowita z [a, b] różna od podanych */
    intNot: (a, b, ...not) => {
      for (let i = 0; i < 200; i++) {
        const v = r.int(a, b);
        if (!not.includes(v)) return v;
      }
      throw new Retry();
    },
    shuffle: (arr) => {
      const x = [...arr];
      for (let i = x.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [x[i], x[j]] = [x[j], x[i]];
      }
      return x;
    },
    bool: () => rnd() < 0.5
  };
  return r;
}

/** Sygnał dla buildera: te parametry nie dają poprawnego zadania, losuj ponownie. */
export class Retry extends Error {}
export const need = (cond) => {
  if (!cond) throw new Retry();
};

// ---------- arytmetyka i formatowanie ----------
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

/** Ułamek n/d w LaTeX-u (skrócony, minus przed ułamkiem). */
export function fr(n, d = 1) {
  if (d === 0) throw new Retry();
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d);
  n /= g;
  d /= g;
  if (d === 1) return `${n}`;
  return `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`;
}

/** Liczba dziesiętna z polskim przecinkiem (w trybie matematycznym: 2{,}5). */
export function dec(x, maxDigits = 4) {
  const v = Math.round(x * 10 ** maxDigits) / 10 ** maxDigits;
  let s = v.toFixed(maxDigits).replace(/\.?0+$/, '');
  if (s === '-0') s = '0';
  return s.replace('.', '{,}');
}

/** Liczba w nawiasie, jeśli ujemna: (-3). */
export const par = (n) => (n < 0 ? `(${n})` : `${n}`);

/** Składnik ze znakiem do doklejenia: "+ 3x", "- x", "" dla zera. */
export function sg(n, v = '') {
  if (n === 0) return '';
  const a = Math.abs(n);
  return `${n > 0 ? '+' : '-'} ${v && a === 1 ? '' : a}${v}`;
}

/** Wielomian z listy [współczynnik, 'zmienna'] np. poly([[1,'x^2'],[-3,'x'],[2,'']]) -> "x^2 - 3x + 2". */
export function poly(terms) {
  let out = '';
  for (const [c, v] of terms) {
    if (c === 0) continue;
    const a = Math.abs(c);
    const body = `${v && a === 1 ? '' : a}${v}`;
    if (!out) out = `${c < 0 ? '-' : ''}${body}`;
    else out += ` ${c > 0 ? '+' : '-'} ${body}`;
  }
  return out || '0';
}
export const quad = (a, b, c) => poly([[a, 'x^2'], [b, 'x'], [c, '']]);
export const lin = (a, b, v = 'x') => poly([[a, v], [b, '']]);

/** (x - p) z poprawnym znakiem: xm(3) -> "x - 3", xm(-2) -> "x + 2", xm(0) -> "x". */
export const xm = (p, v = 'x') => (p === 0 ? v : `${v} ${p > 0 ? '-' : '+'} ${Math.abs(p)}`);

/** Pierwiastek kwadratowy z n w najprostszej postaci: sq(72) -> "6\sqrt{2}", sq(9) -> "3". */
export function sq(n, coef = 1) {
  let out = 1;
  let inn = n;
  for (let k = Math.floor(Math.sqrt(n)); k >= 2; k--) {
    if (inn % (k * k) === 0) {
      out *= k;
      inn /= k * k;
      k = Math.floor(Math.sqrt(inn)) + 1;
    }
  }
  const c = coef * out;
  if (inn === 1) return `${c}`;
  return `${c === 1 ? '' : c === -1 ? '-' : c}\\sqrt{${inn}}`;
}

export const isSquare = (n) => n >= 0 && Number.isInteger(Math.sqrt(n));

/** Przedziały w notacji CKE. */
export const iv = {
  cc: (a, b) => `\\langle ${a}, ${b} \\rangle`,
  oo: (a, b) => `(${a}, ${b})`,
  co: (a, b) => `\\langle ${a}, ${b})`,
  oc: (a, b) => `(${a}, ${b} \\rangle`,
  lo: (a) => `(-\\infty, ${a})`,
  lc: (a) => `(-\\infty, ${a} \\rangle`,
  ro: (a) => `(${a}, +\\infty)`,
  rc: (a) => `\\langle ${a}, +\\infty)`
};
export const m = (s) => `$${s}$`;

// ---------- parser LaTeX -> liczba (niezależna kontrola opcji) ----------
function grab(s, i) {
  let d = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === '{') d++;
    else if (s[j] === '}') {
      d--;
      if (d === 0) return [s.slice(i + 1, j), j + 1];
    }
  }
  throw new Error('nawias');
}
function tex(s0) {
  let s = s0.trim();
  s = s
    .replace(/\{,\}/g, '.')
    .replace(/\\left|\\right|\\,|\\;|\\ /g, '')
    .replace(/\\cdot/g, '*')
    .replace(/\\%/g, '')
    .replace(/\^\\circ|\^\{\\circ\}/g, '')
    .replace(/\\text\{[^}]*\}/g, '')
    .replace(/\\pi/g, ' PI ');
  let res = '';
  let i = 0;
  while (i < s.length) {
    if (s.startsWith('\\frac', i)) {
      const [a, j] = grab(s, i + 5);
      const [b, k] = grab(s, j);
      res += `((${tex(a)})/(${tex(b)}))`;
      i = k;
    } else if (s.startsWith('\\sqrt', i)) {
      let j = i + 5;
      let n = '2';
      if (s[j] === '[') {
        const k = s.indexOf(']', j);
        n = s.slice(j + 1, k);
        j = k + 1;
      }
      const [a, k2] = grab(s, j);
      res += `RT(${tex(a)},${tex(n)})`;
      i = k2;
    } else if (s[i] === '^') {
      if (s[i + 1] === '{') {
        const [a, j] = grab(s, i + 1);
        res += `**(${tex(a)})`;
        i = j;
      } else {
        res += `**${s[i + 1]}`;
        i += 2;
      }
    } else {
      res += s[i];
      i++;
    }
  }
  // mnożenie domyślne: 2RT(..), 3 PI, )(
  res = res.replace(/(\d|\))\s*(?=RT\(|PI|\()/g, '$1*').replace(/PI\s*(?=\d|\()/g, 'PI*');
  // -a**b w JS jest błędem składni -> -(a**b)
  res = res.replace(/(^|[(*/+,-])\s*-\s*(\d+(?:\.\d+)?|\([^()]*\))\*\*(\([^()]*\)|\d+)/g, '$1(-1)*($2**$3)');
  return res;
}
/** Zwraca wartość liczbową napisu LaTeX albo null, gdy to nie jest czysta liczba. */
export function evalTex(str) {
  let s = String(str).trim();
  // „$540$ zł”, „$12$ cm” – liczba z krótką jednostką
  const unit = s.match(/^\$([^$]+)\$\s*([a-ząćęłńóśźż]{1,4}(\^[23])?)$/);
  if (unit) s = unit[1];
  s = s.replace(/^\$|\$$/g, '');
  if (s.includes('$')) return null;
  if (/[a-zA-Z]/.test(s.replace(/\\(frac|sqrt|cdot|pi|left|right|circ|text\{[^}]*\})/g, ''))) return null;
  if (/[<>=,;]|\\langle|\\infty|\\cup/.test(s.replace(/\{,\}/g, ''))) return null;
  try {
    // eslint-disable-next-line no-new-func
    const v = Function('RT', 'PI', `"use strict";return (${tex(s)});`)(
      (x, n) => (x < 0 && n % 2 === 1 ? -Math.pow(-x, 1 / n) : Math.pow(x, 1 / n)),
      Math.PI
    );
    return typeof v === 'number' && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}
export const close = (a, b) => Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));

const normOpt = (s) => String(s).replace(/\s+/g, '').replace(/\\left|\\right/g, '');

// ---------- konstruktory zadań ----------
const INTRO = 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\n';

function explain(steps, trap, summary) {
  const body = steps.map((s, i) => `**Krok ${i + 1}:** ${s}`).join('\n\n');
  return `${body}\n\n**Pułapka CKE:** ${trap}\n\n**Podsumowanie:** ${summary}`;
}

/**
 * Zadanie zamknięte ABCD.
 * o = { title, q, ok, bad[], steps[], trap, tip, val?, ask?, diagram?, numberLine? }
 *  - ok/bad: treści opcji (już z $...$ gdy matematyka)
 *  - val: wartość liczbowa poprawnej odpowiedzi (uruchamia kontrolę parsera)
 *  - ask: true, gdy treść jest pytaniem (bez formuły „Dokończ zdanie”)
 */
export function mc(o) {
  const okVal = evalTex(o.ok);
  if (o.val !== undefined) {
    if (okVal === null || !close(okVal, o.val)) {
      throw new Error(`Kontrola parsera: opcja "${o.ok}" != ${o.val} w zadaniu: ${o.q}`);
    }
  }
  const opts = [o.ok];
  const vals = [okVal];
  for (const b of o.bad) {
    if (b === undefined || b === null) continue;
    if (opts.some((x) => normOpt(x) === normOpt(b))) continue;
    const v = evalTex(b);
    if (v !== null && vals.some((x) => x !== null && close(x, v))) continue;
    opts.push(b);
    vals.push(v);
    if (opts.length === 4) break;
  }
  if (opts.length < 4) throw new Retry();
  return {
    kind: 'mc',
    title: o.title,
    q: (o.ask ? '' : INTRO) + o.q,
    opts,
    steps: o.steps,
    trap: o.trap,
    tip: o.tip,
    diagram: o.diagram,
    numberLine: o.numberLine
  };
}

/** Zadanie z odpowiedzią liczbową (kodowaną). ans: liczba całkowita lub skończony ułamek dziesiętny. */
export function num(o) {
  if (typeof o.ans !== 'number' || !Number.isFinite(o.ans)) throw new Error(`num: zła odpowiedź w: ${o.q}`);
  need(Math.abs(o.ans * 100 - Math.round(o.ans * 100)) < 1e-9);
  return { kind: 'num', title: o.title, q: o.q, ans: o.ans, steps: o.steps, trap: o.trap, tip: o.tip, diagram: o.diagram };
}

/**
 * Zadanie typu „Oceń prawdziwość” w stylu CKE (dwa zdania -> opcje PP, PF, FP, FF).
 * s1, s2: [treść zdania, czyPrawdziwe, uzasadnienie]
 */
export function pf(o) {
  const code = (o.s1[1] ? 'P' : 'F') + (o.s2[1] ? 'P' : 'F');
  const all = ['PP', 'PF', 'FP', 'FF'];
  return {
    kind: 'mc',
    fixedOrder: true,
    title: o.title,
    q: `${o.q}\n\nOceń prawdziwość poniższych stwierdzeń.\n\n**1.** ${o.s1[0]}\n\n**2.** ${o.s2[0]}`,
    opts: [code, ...all.filter((x) => x !== code)].map(
      (c) => `1. – ${c[0] === 'P' ? 'prawda' : 'fałsz'}, 2. – ${c[1] === 'P' ? 'prawda' : 'fałsz'}`
    ),
    order: all.map((c) => `1. – ${c[0] === 'P' ? 'prawda' : 'fałsz'}, 2. – ${c[1] === 'P' ? 'prawda' : 'fałsz'}`),
    steps: [`Stwierdzenie 1: ${o.s1[2]}`, `Stwierdzenie 2: ${o.s2[2]}`],
    trap: o.trap,
    tip: o.tip,
    diagram: o.diagram
  };
}

/** Zamienia wynik konstruktora na finalny obiekt zadania (tasowanie opcji, wyjaśnienie). */
export function finalize(raw, meta, r) {
  const base = {
    id: meta.id,
    lessonId: meta.lessonId,
    lessonKey: meta.lessonKey,
    topicId: meta.topicId,
    sectionTitle: meta.sectionTitle,
    archetypeCode: meta.archetypeCode,
    category: meta.category,
    title: raw.title,
    points: 1
  };
  if (raw.kind === 'num') {
    const ansStr = String(Math.round(raw.ans * 100) / 100).replace('.', ',');
    return {
      ...base,
      type: 'NUMERIC_INPUT',
      content: raw.q,
      correct_answer: ansStr,
      explanation: explain(raw.steps, raw.trap, `Prawidłowa odpowiedź to **${ansStr}**.`),
      matura_tip: raw.tip,
      ...(raw.diagram ? { diagram: raw.diagram } : {})
    };
  }
  const correct = raw.opts[0];
  const options = raw.fixedOrder ? raw.order : r.shuffle(raw.opts);
  const letter = 'ABCD'[options.indexOf(correct)];
  return {
    ...base,
    type: 'SINGLE_CHOICE',
    content: raw.q,
    options,
    correct_answer: letter,
    explanation: explain(raw.steps, raw.trap, `Prawidłową odpowiedzią jest **${letter}**.`),
    matura_tip: raw.tip,
    ...(raw.diagram ? { diagram: raw.diagram } : {}),
    ...(raw.numberLine ? { numberLine: raw.numberLine } : {})
  };
}

// ---------- pigułka teorii ----------
/**
 * Kompaktowy zapis lekcji -> LessonTheoryPill.
 * p = { essence, context, pl, steps:[[tytuł, opis, tip]], formulas:[[nazwa, latex, strona?]],
 *       examples:[[tytuł, pkt, treść, rozwiązanie, wniosek]], trap, fail, win, why, ckeTip, points:[] }
 */
export function pill(p) {
  return {
    reading_time_minutes: p.minutes || 3.5,
    noAutoVisual: true,
    concept_essence: p.essence,
    matura_context: p.context,
    plain_polish: `Z polskiego na nasze: ${p.pl}`,
    algorithm_steps: p.steps.map(([title, description, tip], i) => ({ stepNumber: i + 1, title, description, tip })),
    core_formulas: p.formulas.map(([name, formula, page]) => ({
      name,
      formula,
      ...(page ? { cke_page: `str. ${page}`, in_cke_sheet: true } : {})
    })),
    worked_examples: p.examples.map(([title, points, problem, solution, keyInsight]) => ({
      title,
      points,
      problem,
      solution,
      keyInsight
    })),
    exam_trap: p.trap,
    trap_details: { fail: `Błąd: ${p.fail}`, win: `Poprawnie: ${p.win}`, explanation: p.why, ckeTip: p.ckeTip },
    key_points: p.points
  };
}

// ---------- wykres funkcji łamanej (format MathPlot: PIECEWISE_LINEAR) ----------
export function plotPolyline(pts, { leftClosed = true, rightClosed = true } = {}) {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const segments = [];
  for (let i = 0; i < pts.length - 1; i++) {
    segments.push({
      from: pts[i],
      to: pts[i + 1],
      color: '#38bdf8',
      weight: 2.5,
      startDot: i === 0 ? (leftClosed ? 'filled' : 'hollow') : 'none',
      endDot: i === pts.length - 2 ? (rightClosed ? 'filled' : 'hollow') : 'none'
    });
  }
  return {
    type: 'PLOT',
    title: 'Wykres funkcji y = f(x)',
    caption: 'Każda kratka ma bok długości 1.',
    plotData: {
      type: 'PIECEWISE_LINEAR',
      xRange: [Math.min(...xs) - 1, Math.max(...xs) + 1],
      yRange: [Math.min(...ys, 0) - 1, Math.max(...ys, 0) + 1],
      gridStep: 1,
      segments,
      points: pts.map(([x, y], i) => ({
        x,
        y,
        label: `(${x}, ${y})`,
        dot: (i === 0 && !leftClosed) || (i === pts.length - 1 && !rightClosed) ? 'hollow' : 'filled',
        color: '#ffb800'
      }))
    }
  };
}
