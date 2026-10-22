/** Drobne narzędzia wspólne dla działów kursu PR (poza tymi z scripts/math_pp/lib.js). */
import { fr } from '../math_pp/lib.js';

/** Dwa różne elementy listy (np. dwa zdania do zadania P/F). */
export const pickTwo = (r, list) => {
  const i = r.int(0, list.length - 1);
  const j = r.intNot(0, list.length - 1, i);
  return [list[i], list[j]];
};

/** Współczynnik przed wyrażeniem: co(1, 'b') -> "b", co(3, 'b') -> "3b", co(-1, 'b') -> "-b". */
export const co = (n, v) => (n === 1 ? v : n === -1 ? `-${v}` : `${n}${v}`);

/** Ułamek z ewentualnym skróceniem: frs(4, 6) -> "\frac{4}{6} = \frac{2}{3}", frs(3, 1) -> "3". */
export function frs(n, d) {
  if (d === 1) return `${n}`;
  const raw = `\\frac{${n}}{${d}}`;
  const f = fr(n, d);
  return f === raw ? raw : `${raw} = ${f}`;
}

/** Suma wyrazów [współczynnik, czynnik]: [[2, '\\sin^2 x'], [-1, '\\sin x'], [0, '']] -> 2\sin^2 x - \sin x. */
export function terms(list) {
  let s = '';
  for (const [c, t] of list) {
    if (!c) continue;
    const abs = Math.abs(c);
    const body = t ? `${abs === 1 ? '' : abs}${t}` : `${abs}`;
    s += s ? ` ${c < 0 ? '-' : '+'} ${body}` : `${c < 0 ? '-' : ''}${body}`;
  }
  return s || '0';
}

/** Ułamek jako współczynnik przed wyrażeniem: '' dla 1, "-" dla −1, w pozostałych przypadkach fr(n, d). */
export function coef(n, d = 1) {
  const f = fr(n, d);
  return f === '1' ? '' : f === '-1' ? '-' : f;
}
