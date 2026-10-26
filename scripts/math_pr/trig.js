/**
 * Trygonometria dla generatora PR: dokładne wartości dla kątów specjalnych (wielokrotności 30° i 45°),
 * zapis kątów w radianach oraz niezależne wyznaczanie rozwiązań równań przez przeszukanie siatki kątów.
 */
import { fr, gcd, Retry } from '../math_pp/lib.js';

const RAD = Math.PI / 180;
export const sinD = (d) => Math.sin(d * RAD);
export const cosD = (d) => Math.cos(d * RAD);
export const tgD = (d) => Math.tan(d * RAD);

/** Kąty specjalne z przedziału [0°, 360°). */
export const SPECIAL = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

const EXACT = [
  [0, '0'],
  [0.5, '\\frac{1}{2}'],
  [Math.SQRT2 / 2, '\\frac{\\sqrt{2}}{2}'],
  [Math.sqrt(3) / 2, '\\frac{\\sqrt{3}}{2}'],
  [1, '1'],
  [Math.sqrt(3), '\\sqrt{3}'],
  [Math.sqrt(3) / 3, '\\frac{\\sqrt{3}}{3}'],
  [2, '2'],
  [1.5, '\\frac{3}{2}']
];

/** Dokładny zapis liczby z tabeli wartości funkcji trygonometrycznych. */
export function valTex(v) {
  for (const [x, t] of EXACT) {
    if (Math.abs(v - x) < 1e-9) return t;
    if (Math.abs(v + x) < 1e-9) return `-${t}`;
  }
  throw new Retry();
}

/** Kąt w stopniach zapisany w radianach: 120 -> \frac{2\pi}{3}, 180 -> \pi, -90 -> -\frac{\pi}{2}. */
export function piTex(deg) {
  if (deg === 0) return '0';
  const sign = deg < 0 ? '-' : '';
  // liczymy w połówkach stopnia, żeby obsłużyć np. 22,5° = π/8
  const a = Math.abs(deg) * 2;
  const g = gcd(a, 360);
  const [n, d] = [a / g, 360 / g];
  if (!Number.isInteger(n) || !Number.isInteger(d)) throw new Error(`piTex: ${deg}`);
  const top = n === 1 ? '\\pi' : `${n}\\pi`;
  return d === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${d}}`;
}

/**
 * Rozwiązania równania f(x) = 0 (x w stopniach) w przedziale domkniętym [lo, hi], szukane na siatce co 2,5°.
 * Wystarcza dla kątów specjalnych i ich wielokrotności (kx dla k = 1, 2, 3, 4, 6). Zwraca stopnie rosnąco.
 */
export function solveDeg(f, lo, hi, step = 2.5) {
  const out = [];
  for (let d = lo; d <= hi + 1e-9; d += step) if (Math.abs(f(d)) < 1e-9) out.push(Math.round(d * 2) / 2);
  return out;
}

/** Zbiór kątów (w stopniach) w notacji CKE w radianach. */
export const piSet = (degs) => (degs.length ? `\\left\\{${degs.map(piTex).join(', ')}\\right\\}` : '\\emptyset');

/** Przedział z końcami w radianach, np. iv(0, 360) -> ⟨0, 2π⟩. */
export const piInterval = (lo, hi) => `\\langle ${piTex(lo)}, ${piTex(hi)} \\rangle`;

/** Ułamek wartości: frt(3, 5) -> \frac{3}{5}. */
export const frt = (n, d) => fr(n, d);

/** Pitagorejskie trójki (przyprostokątne a, b, przeciwprostokątna c). */
export const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
