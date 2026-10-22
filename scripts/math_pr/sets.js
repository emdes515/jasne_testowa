/**
 * Zbiory liczb rzeczywistych jako sumy przedziałów – do wyliczania, formatowania i weryfikacji
 * odpowiedzi w zadaniach z parametrem. Przedział: [lo, hi, loDomknięty, hiDomknięty].
 */
import { fr, iv } from '../math_pp/lib.js';

const INF = Infinity;

export const gt = (a, closed = false) => [[a, INF, closed, false]];
export const lt = (a, closed = false) => [[-INF, a, false, closed]];

/** (m − r1)(m − r2) op 0 dla r1 ≤ r2 (trójmian o dodatnim współczynniku przy m²). */
export function quadIneq(r1, r2, op) {
  if (r1 > r2) [r1, r2] = [r2, r1];
  if (op === '>') return r1 === r2 ? [[-INF, r1, false, false], [r1, INF, false, false]] : [[-INF, r1, false, false], [r2, INF, false, false]];
  if (op === '>=') return [[-INF, r1, false, true], [r2, INF, true, false]];
  if (op === '<') return r1 === r2 ? [] : [[r1, r2, false, false]];
  if (op === '<=') return [[r1, r2, true, true]];
  throw new Error(`quadIneq: nieznany operator ${op}`);
}

export function intersect(A, B) {
  const out = [];
  for (const a of A)
    for (const b of B) {
      const [lo, loC] = a[0] > b[0] ? [a[0], a[2]] : b[0] > a[0] ? [b[0], b[2]] : [a[0], a[2] && b[2]];
      const [hi, hiC] = a[1] < b[1] ? [a[1], a[3]] : b[1] < a[1] ? [b[1], b[3]] : [a[1], a[3] && b[3]];
      if (lo < hi || (lo === hi && loC && hiC)) out.push([lo, hi, loC, hiC]);
    }
  return out.sort((x, y) => x[0] - y[0]);
}

export const intersectAll = (...sets) => sets.reduce((acc, s) => intersect(acc, s));

/** Scala przedziały, które się nakładają albo stykają domkniętym końcem (także punkty {a}). */
export function normalize(S) {
  const sorted = S.map((s) => [...s]).sort((x, y) => x[0] - y[0] || x[1] - y[1]);
  const out = [];
  for (const s of sorted) {
    const last = out[out.length - 1];
    if (last && (s[0] < last[1] || (s[0] === last[1] && (last[3] || s[2])))) {
      if (s[0] === last[0]) last[2] = last[2] || s[2];
      if (s[1] > last[1]) [last[1], last[3]] = [s[1], s[3]];
      else if (s[1] === last[1]) last[3] = last[3] || s[3];
    } else out.push(s);
  }
  return out;
}

export const union = (...sets) => normalize(sets.flat());

/** Usuwa punkty (np. miejsca zerowe mianownika) ze zbioru. */
export function removePoints(S, pts) {
  let out = S.map((s) => [...s]);
  for (const p of pts) {
    out = out.flatMap(([lo, hi, loC, hiC]) => {
      if (p < lo || p > hi || (p === lo && !loC) || (p === hi && !hiC)) return [[lo, hi, loC, hiC]];
      const parts = [];
      if (p > lo) parts.push([lo, p, loC, false]);
      if (p < hi) parts.push([p, hi, false, hiC]);
      return parts;
    });
  }
  return out;
}

/**
 * Zbiór rozwiązań nierówności sign · Π(x − r) op 0 (pierwiastki z krotnością przez powtórzenie),
 * wyznaczony metodą „wężyka”: znak w każdym przedziale między pierwiastkami.
 */
export function signSet(roots, op, sign = 1) {
  const pts = [...new Set(roots)].sort((a, b) => a - b);
  const val = (x) => sign * roots.reduce((p, r) => p * (x - r), 1);
  const ok = (v) => (op === '>' ? v > 0 : op === '>=' ? v >= 0 : op === '<' ? v < 0 : v <= 0);
  const bounds = [-INF, ...pts, INF];
  const out = [];
  for (let i = 0; i < bounds.length - 1; i++) {
    const lo = bounds[i];
    const hi = bounds[i + 1];
    const mid = lo === -INF ? hi - 1 : hi === INF ? lo + 1 : (lo + hi) / 2;
    if (ok(val(mid))) out.push([lo, hi, false, false]);
  }
  if (op === '>=' || op === '<=') for (const p of pts) out.push([p, p, true, true]);
  return normalize(out);
}

export const contains = (S, x) => S.some(([lo, hi, loC, hiC]) => (x > lo || (loC && x === lo)) && (x < hi || (hiC && x === hi)));

export const endpoints = (S) => S.flatMap(([lo, hi]) => [lo, hi]).filter(Number.isFinite);

/** Liczba wymierna o małym mianowniku w LaTeX-u. */
export function numTex(v) {
  for (let d = 1; d <= 30; d++) if (Math.abs(v * d - Math.round(v * d)) < 1e-9) return fr(Math.round(v * d), d);
  throw new Error(`numTex: ${v} nie jest prostym ułamkiem`);
}

/** Zbiór w notacji CKE, np. (-\infty, -3) \cup (1, +\infty). */
export function fmt(S) {
  if (S.length === 0) return '\\emptyset';
  return S.map(([lo, hi, loC, hiC]) => {
    if (lo === hi) return `\\{${numTex(lo)}\\}`;
    if (lo === -INF) return hiC ? iv.lc(numTex(hi)) : iv.lo(numTex(hi));
    if (hi === INF) return loC ? iv.rc(numTex(lo)) : iv.ro(numTex(lo));
    const a = numTex(lo);
    const b = numTex(hi);
    return loC && hiC ? iv.cc(a, b) : loC ? iv.co(a, b) : hiC ? iv.oc(a, b) : iv.oo(a, b);
  }).join(' \\cup ');
}

/** Pierwiastki A·x² + B·x + C = 0 (A ≠ 0) albo null, gdy nie ma dwóch różnych pierwiastków rzeczywistych. */
export function twoRoots(A, B, C) {
  const D = B * B - 4 * A * C;
  if (D <= 1e-12) return null;
  const s = Math.sqrt(D);
  return [(-B - s) / (2 * A), (-B + s) / (2 * A)].sort((x, y) => x - y);
}

/**
 * Niezależna kontrola odpowiedzi: na siatce wartości parametru warunek liczony na faktycznych
 * pierwiastkach (`onRoots`) musi zgadzać się ze zbiorem `S`; w końcach przedziałów – warunek dokładny `exact`.
 */
export function verifySet(S, onRoots, exact, where, range = 40, step = 0.25) {
  const ends = endpoints(S);
  for (let m = -range; m <= range; m += step) {
    if (ends.some((e) => Math.abs(e - m) < 1e-6)) continue;
    if (Boolean(onRoots(m)) !== contains(S, m)) throw new Error(`Kontrola zbioru: m = ${m} w zadaniu: ${where}`);
  }
  for (const e of ends) {
    if (Boolean(exact(e)) !== contains(S, e)) throw new Error(`Kontrola końca przedziału: m = ${e} w zadaniu: ${where}`);
  }
}
