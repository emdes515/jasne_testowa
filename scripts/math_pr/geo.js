/**
 * Geometria dla generatora PR: liczby postaci (n/d)·√r, dokładne wartości sinusa i cosinusa kątów specjalnych,
 * punkty, wektory i proste w notacji CKE. Wartości do kontroli liczymy osobno na liczbach zmiennoprzecinkowych
 * (współrzędne, Math.sin), a zapis LaTeX sprawdza parser z lib.js (mc({ val })).
 */
import { fr, gcd } from '../math_pp/lib.js';
import { coef } from './common.js';

/** Liczba (n/d)·√r w postaci kanonicznej: r bez czynników kwadratowych, ułamek skrócony, znak w n. */
export function surd(n, d = 1, r = 1) {
  if (n === 0 || r === 0) return { n: 0, d: 1, r: 1 };
  if (d < 0) [n, d] = [-n, -d];
  let out = 1;
  let inn = r;
  for (let k = 2; k * k <= inn; k++) {
    while (inn % (k * k) === 0) {
      out *= k;
      inn /= k * k;
    }
  }
  n *= out;
  const g = gcd(Math.abs(n), d);
  return { n: n / g, d: d / g, r: inn };
}
export const sVal = (s) => (s.n / s.d) * Math.sqrt(s.r);
export const sMul = (a, b) => surd(a.n * b.n, a.d * b.d, a.r * b.r);
/** a / b, z usunięciem niewymierności z mianownika. */
export const sDiv = (a, b) => surd(a.n * b.d, a.d * b.n * b.r, a.r * b.r);
export const sInt = (k) => surd(k);
/** √n w najprostszej postaci jako liczba surd. */
export const root = (n) => surd(1, 1, n);

/** Zapis LaTeX: \frac{3\sqrt{2}}{2}, 2\sqrt{3}, -\frac{1}{2}, 5. */
export function sTex(s) {
  if (s.r === 1) return fr(s.n, s.d);
  const sign = s.n < 0 ? '-' : '';
  const a = Math.abs(s.n);
  const body = `${a === 1 ? '' : a}\\sqrt{${s.r}}`;
  return s.d === 1 ? `${sign}${body}` : `${sign}\\frac{${body}}{${s.d}}`;
}

/** Dokładne sinusy i cosinusy kątów specjalnych (w stopniach). */
const SIN = { 0: [0, 1, 1], 30: [1, 2, 1], 45: [1, 2, 2], 60: [1, 2, 3], 90: [1, 1, 1], 120: [1, 2, 3], 135: [1, 2, 2], 150: [1, 2, 1], 180: [0, 1, 1] };
const COS = { 0: [1, 1, 1], 30: [1, 2, 3], 45: [1, 2, 2], 60: [1, 2, 1], 90: [0, 1, 1], 120: [-1, 2, 1], 135: [-1, 2, 2], 150: [-1, 2, 3], 180: [-1, 1, 1] };
export const sinS = (deg) => surd(...SIN[deg]);
export const cosS = (deg) => surd(...COS[deg]);
export const rad = (deg) => (deg * Math.PI) / 180;

/** Punkt i wektor w notacji CKE. */
export const pt = (x, y) => `(${x}, ${y})`;
export const vec = (x, y) => `[${x}, ${y}]`;
export const dist2 = ([x1, y1], [x2, y2]) => (x2 - x1) ** 2 + (y2 - y1) ** 2;

/** Prosta y = (mn/md)x + (cn/cd) w postaci kierunkowej. */
export function lineTex(mn, md, cn, cd = 1) {
  const mPart = mn === 0 ? '' : `${coef(mn, md)}x`;
  if (!mPart) return `y = ${fr(cn, cd)}`;
  if (cn === 0) return `y = ${mPart}`;
  return `y = ${mPart} ${cn * cd < 0 ? '-' : '+'} ${fr(Math.abs(cn), Math.abs(cd))}`;
}

/** Trójkąty pitagorejskie (a, b, c). */
export const PYTH = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25], [20, 21, 29]];

/** Przesunięcia całkowite o długości 5 (punkty kratowe na okręgu o promieniu 5). */
export const R5 = [[3, 4], [4, 3], [-3, 4], [-4, 3], [3, -4], [4, -3], [-3, -4], [-4, -3], [5, 0], [-5, 0], [0, 5], [0, -5]];
