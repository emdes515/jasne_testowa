/** Dokładne ułamki [licznik, mianownik] do rachunku prawdopodobieństwa i kombinatoryki. */
import { gcd, fr } from '../math_pp/lib.js';

export function q(n, d = 1) {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(Math.abs(n), d) || 1;
  return [n / g, d / g];
}
export const qAdd = ([a, b], [c, d]) => q(a * d + c * b, b * d);
export const qSub = ([a, b], [c, d]) => q(a * d - c * b, b * d);
export const qMul = ([a, b], [c, d]) => q(a * c, b * d);
export const qDiv = ([a, b], [c, d]) => q(a * d, b * c);
export const qPow = (x, k) => (k === 0 ? [1, 1] : qMul(x, qPow(x, k - 1)));
export const qVal = ([a, b]) => a / b;
export const qTex = ([a, b]) => fr(a, b);

export const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
export const binom = (n, k) => (k < 0 || k > n ? 0 : Math.round(fact(n) / (fact(k) * fact(n - k))));
