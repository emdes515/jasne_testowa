import { T, mc, num, pf, open, pill, poly, xm, sq, m, need, isSquare } from '../math_pp/lib.js';
import { signSet, fmt, verifySet, contains } from './sets.js';
import { pickTwo, co } from './common.js';

const TIP_REMAINDER = 'Reszta z dzielenia wielomianu $W(x)$ przez dwumian $x - a$ jest równa $W(a)$. Gdy $W(a) = 0$, wielomian jest podzielny przez $x - a$.';
const TIP_ROOTS = 'Pierwiastek całkowity wielomianu o współczynnikach całkowitych jest dzielnikiem wyrazu wolnego. Tego twierdzenia nie ma na karcie wzorów – zapamiętaj je.';
const TIP_SIGN = 'Metoda „wężyka”: zaznacz pierwiastki na osi, zacznij z prawej strony od znaku współczynnika przy najwyższej potędze; przy pierwiastku parzystej krotności znak się nie zmienia.';

/** Wielomian z listy współczynników od najwyższej potęgi, np. [1, 0, -4, 3] -> x^3 - 4x + 3. */
const ptex = (coefs, v = 'x') => {
  const n = coefs.length - 1;
  return poly(coefs.map((c, i) => [c, n - i === 0 ? '' : n - i === 1 ? v : `${v}^${n - i}`]));
};
const peval = (coefs, x) => coefs.reduce((acc, c) => acc * x + c, 0);
const pmul = (a, b) => {
  const out = Array(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => (out[i + j] += x * y)));
  return out;
};
/** Dzielenie przez (x − a) schematem Hornera: [iloraz, reszta]. */
const horner = (coefs, a) => {
  const q = [];
  let acc = 0;
  for (const c of coefs) {
    acc = acc * a + c;
    q.push(acc);
  }
  return [q.slice(0, -1), q[q.length - 1]];
};
const divisors = (n) => {
  const out = [];
  for (let d = 1; d <= Math.abs(n); d++) if (n % d === 0) out.push(d);
  return out;
};
const pmSet = (ds) => `\\{${ds.map((d) => `\\pm ${d}`).join(', ')}\\}`;
const fct = (p) => (p === 0 ? 'x' : `(${xm(p)})`);
const nSol = (n) => (n === 1 ? 'rozwiązanie' : n >= 2 && n <= 4 ? 'rozwiązania' : 'rozwiązań');
const kk = (k) => (k * k === 1 ? '' : k * k);
const roots = (list) => `\\{${[...new Set(list)].sort((a, b) => a - b).join(', ')}\\}`;

// ---------- 2.1 Dzielenie przez (x − a) i reszta ----------
const randomCubic = (r) => [r.pick([1, 1, 2, -1]), r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)];

const remainderValue = (r) => {
  const W = randomCubic(r);
  const a = r.intNot(-3, 3, 0);
  const R = peval(W, a);
  return num({
    title: 'Reszta z dzielenia przez dwumian',
    q: T`Oblicz resztę z dzielenia wielomianu $W(x) = ${ptex(W)}$ przez dwumian $${xm(a)}$. Wpisz liczbę.`,
    ans: R,
    steps: [
      T`Reszta z dzielenia przez $${xm(a)}$ jest równa $W(${a})$ – nie trzeba wykonywać dzielenia.`,
      T`$W(${a}) = ${R}$.`
    ],
    trap: T`Dwumian $${xm(a)}$ zeruje się dla $x = ${a}$ – to tę liczbę podstawiasz, a nie $${-a}$.`,
    tip: TIP_REMAINDER
  });
};

const quotientChoice = (r) => {
  const a = r.intNot(-4, 4, 0);
  const Q = [1, r.int(-5, 5), r.int(-5, 5)];
  const R = r.int(-5, 5);
  const W = pmul([1, -a], Q);
  W[W.length - 1] += R;
  const [Qwrong] = horner(W, -a);
  return mc({
    title: 'Iloraz z dzielenia przez dwumian',
    q: T`Iloraz z dzielenia wielomianu $W(x) = ${ptex(W)}$ przez dwumian $${xm(a)}$ jest równy`,
    ok: m(ptex(Q)),
    bad: [m(ptex(Qwrong)), m(ptex([1, Q[1], -Q[2]])), m(ptex([1, Q[1] - a, Q[2]])), m(ptex([1, -Q[1], Q[2]]))],
    steps: [
      T`Schemat Hornera dla $a = ${a}$: współczynniki $${W.join(',\\; ')}$.`,
      T`Kolejne liczby: $${horner(W, a)[0].join(',\\; ')}$, reszta $${R}$.`,
      T`Iloraz: $${ptex(Q)}$${R ? T`, a $W(x) = (${xm(a)})(${ptex(Q)}) ${R > 0 ? '+' : '-'} ${Math.abs(R)}$` : ''}.`
    ],
    trap: T`W schemacie Hornera mnożysz przez $${a}$ (pierwiastek dwumianu), a nie przez $${-a}$.`,
    tip: TIP_REMAINDER
  });
};

const parameterDivisible = (r) => {
  const a = r.intNot(-3, 3, 0);
  const mm = r.intNot(-5, 5, 0);
  const b = r.int(-6, 6);
  const c = -(a ** 3 + mm * a * a + b * a);
  need(c !== 0);
  const W = `x^3 + mx^2 ${b === 0 ? '' : `${b > 0 ? '+' : '-'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}x `}${c > 0 ? '+' : '-'} ${Math.abs(c)}`;
  return num({
    title: 'Parametr z podzielności wielomianu',
    q: T`Wielomian $W(x) = ${W}$ jest podzielny przez dwumian $${xm(a)}$. Oblicz $m$. Wpisz liczbę.`,
    ans: mm,
    steps: [
      T`Podzielność przez $${xm(a)}$ oznacza $W(${a}) = 0$.`,
      T`$W(${a}) = ${a ** 3} + ${co(a * a, 'm')} ${b * a < 0 ? '-' : '+'} ${Math.abs(b * a)} ${c > 0 ? '+' : '-'} ${Math.abs(c)} = ${co(a * a, 'm')} ${a ** 3 + b * a + c > 0 ? '+' : '-'} ${Math.abs(a ** 3 + b * a + c)}$.`,
      T`$${co(a * a, 'm')} = ${-(a ** 3 + b * a + c)}$, więc $m = ${mm}$.`
    ],
    trap: T`Podzielność to warunek $W(${a}) = 0$ – nie licz $W(${-a})$.`,
    tip: TIP_REMAINDER
  });
};

const REMAINDER_FACTS = [
  [T`Reszta z dzielenia wielomianu $W(x)$ przez $x - a$ jest równa $W(a)$.`, true, 'Twierdzenie o reszcie (Bézouta).'],
  [T`Reszta z dzielenia wielomianu $W(x)$ przez $x + 2$ jest równa $W(2)$.`, false, T`$x + 2 = x - (-2)$, więc reszta to $W(-2)$.`],
  [T`Jeśli $W(a) = 0$, to wielomian $W(x)$ jest podzielny przez $x - a$.`, true, 'Twierdzenie Bézouta.'],
  [T`Reszta z dzielenia wielomianu stopnia $3$ przez dwumian $x - a$ może być wielomianem stopnia $1$.`, false, 'Reszta ma stopień mniejszy niż dzielnik – przy dzieleniu przez dwumian jest liczbą.']
];

const remainderFacts = (r) => {
  const [s1] = pickTwo(r, REMAINDER_FACTS);
  const root = r.intNot(-3, 3, 0);
  const W = pmul([1, -root], [1, r.int(-4, 4), r.intNot(-5, 5, 0)]);
  const t = r.bool() ? root : r.intNot(-3, 3, 0, root);
  const truth = peval(W, t) === 0;
  return pf({
    title: 'Podzielność wielomianu przez dwumian',
    s1,
    s2: [T`Wielomian $W(x) = ${ptex(W)}$ jest podzielny przez dwumian $${xm(t)}$.`, truth, T`$W(${t}) = ${peval(W, t)}$${truth ? ', więc wielomian jest podzielny.' : ' – reszta różna od zera.'}`],
    trap: 'Podzielność sprawdzasz jednym podstawieniem – liczbą, przy której dwumian się zeruje.',
    tip: TIP_REMAINDER
  });
};

const openTwoRemainders = (r) => {
  const p = r.intNot(-5, 5, 0);
  const q = r.intNot(-6, 6, 0);
  const c = r.intNot(-6, 6, 0);
  const a = r.intNot(-3, 3, 0);
  const b = r.intNot(-3, 3, 0, a);
  const W = [1, p, q, c];
  const R1 = peval(W, a);
  const R2 = peval(W, b);
  const eq = (x, R) => `${x * x}p ${x < 0 ? '-' : '+'} ${Math.abs(x)}q = ${R - x ** 3 - c}`;
  return open({
    title: 'Współczynniki wielomianu z dwóch reszt',
    q: T`Wielomian $W(x) = x^3 + px^2 + qx ${c > 0 ? '+' : '-'} ${Math.abs(c)}$ przy dzieleniu przez dwumian $${xm(a)}$ daje resztę $${R1}$, a przy dzieleniu przez dwumian $${xm(b)}$ – resztę $${R2}$. Oblicz $p$ i $q$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie warunków $W(${a}) = ${R1}$ oraz $W(${b}) = ${R2}$.`],
      [2, 'Etap 2', T`Zapisanie układu równań: $${eq(a, R1)}$, $${eq(b, R2)}$.`],
      [3, 'Komplet', T`Rozwiązanie układu: $p = ${p}$, $q = ${q}$.`]
    ],
    steps: [
      T`Z twierdzenia o reszcie: $W(${a}) = ${R1}$ i $W(${b}) = ${R2}$.`,
      T`$W(${a}) = ${a ** 3} + ${a * a}p ${a < 0 ? '-' : '+'} ${Math.abs(a)}q ${c > 0 ? '+' : '-'} ${Math.abs(c)}$, więc $${eq(a, R1)}$; analogicznie $${eq(b, R2)}$.`,
      T`Rozwiązanie układu: $p = ${p}$, $q = ${q}$.`
    ],
    trap: T`Reszta z dzielenia przez $${xm(a)}$ to $W(${a})$ – przy dwumianie z plusem podstawiasz liczbę ujemną.`,
    tip: TIP_REMAINDER,
    answer: m(`p = ${p}, \\; q = ${q}`)
  });
};

// ---------- 2.2 Pierwiastki całkowite ----------
const candidateSet = (r) => {
  const c = r.pick([4, 6, 8, 9, 10, 12, 15]) * r.pick([1, -1]);
  const W = [1, r.int(-5, 5), r.int(-6, 6), c];
  const ds = divisors(c);
  return mc({
    title: 'Kandydaci na pierwiastki całkowite',
    q: T`Zbiór wszystkich liczb całkowitych, które mogą być pierwiastkami wielomianu $W(x) = ${ptex(W)}$, to podzbiór zbioru`,
    ok: m(pmSet(ds)),
    bad: [m(`\\{${ds.join(', ')}\\}`), m(pmSet([1, Math.abs(c)])), m(pmSet(ds.slice(0, -1))), m(pmSet([...ds, 2 * Math.abs(c)]))],
    steps: [
      T`Pierwiastek całkowity wielomianu o współczynnikach całkowitych jest dzielnikiem wyrazu wolnego $${c}$.`,
      T`Dzielniki $${c}$: $${pmSet(ds)}$.`
    ],
    trap: 'Dzielniki liczby to także liczby UJEMNE – pierwiastek może być ujemny.',
    tip: TIP_ROOTS
  });
};

const findIntegerRoot = (r) => {
  const p = r.intNot(-4, 4, 0);
  const e = r.int(-4, 4);
  const f = r.intNot(-6, 6, 0);
  const D = e * e - 4 * f;
  need(D < 0 || !isSquare(D));
  const W = pmul([1, -p], [1, e, f]);
  const cand = divisors(W[3]).flatMap((d) => [d, -d]).filter((t) => peval(W, t) !== 0);
  need(cand.length >= 3);
  return mc({
    title: 'Pierwiastek całkowity wielomianu',
    q: T`Jedynym pierwiastkiem całkowitym wielomianu $W(x) = ${ptex(W)}$ jest liczba`,
    ok: m(p),
    val: p,
    bad: r.shuffle(cand).slice(0, 4).map((t) => m(t)),
    steps: [
      T`Kandydaci to dzielniki wyrazu wolnego $${W[3]}$.`,
      T`$W(${p}) = 0$, więc $${p}$ jest pierwiastkiem. Po podzieleniu: $W(x) = (${xm(p)})(${ptex([1, e, f])})$.`,
      T`Trójmian $${ptex([1, e, f])}$ ma $\Delta = ${D}$, więc nie ma pierwiastków całkowitych.`
    ],
    trap: 'Sprawdzaj kandydatów podstawieniem – nie zgaduj po znakach współczynników.',
    tip: TIP_ROOTS
  });
};

const sumOfIntegerRoots = (r) => {
  const p = r.int(-5, 5);
  const q = r.intNot(-5, 5, p);
  const k = r.int(1, 9);
  const W = pmul(pmul([1, -p], [1, -q]), [1, 0, k]);
  return num({
    title: 'Suma pierwiastków wielomianu',
    q: T`Oblicz sumę wszystkich pierwiastków rzeczywistych wielomianu $W(x) = (${xm(p)})(${xm(q)})(x^2 + ${k})$. Wpisz liczbę.`,
    ans: p + q,
    steps: [
      T`$W(x) = 0$, gdy $x = ${p}$ albo $x = ${q}$ albo $x^2 = -${k}$.`,
      T`Równanie $x^2 = -${k}$ nie ma rozwiązań, więc pierwiastki to $${p}$ i $${q}$, a ich suma to $${p + q}$.`
    ],
    trap: T`Czynnik $x^2 + ${k}$ nie daje pierwiastków rzeczywistych – nie licz $\pm\sqrt{${k}}$.`,
    tip: 'Iloczyn jest równy zeru, gdy co najmniej jeden czynnik jest równy zeru.'
  });
};

const rootMembership = (r) => {
  const [a, b, c] = r.shuffle([-4, -3, -2, -1, 1, 2, 3, 4]).slice(0, 3);
  const W = pmul(pmul([1, -a], [1, -b]), [1, -c]);
  const pick = () => (r.bool() ? r.pick([a, b, c]) : r.intNot(-4, 4, a, b, c, 0));
  const t1 = pick();
  let t2 = pick();
  if (t2 === t1) t2 = r.intNot(-5, 5, t1, 0);
  const st = (t) => [T`Liczba $${t}$ jest pierwiastkiem wielomianu $W(x) = ${ptex(W)}$.`, peval(W, t) === 0, T`$W(${t}) = ${peval(W, t)}$.`];
  return pf({ title: 'Czy liczba jest pierwiastkiem wielomianu', s1: st(t1), s2: st(t2), trap: 'Pierwiastek to liczba, dla której $W(x) = 0$ – sprawdź podstawieniem.', tip: TIP_ROOTS });
};

const fmtRoot = (u, w, sign) => {
  const s = sq(w);
  if (u === 0) return sign < 0 ? `-${s}` : s;
  return `${u} ${sign < 0 ? '-' : '+'} ${s}`;
};

const openCubicEquation = (r) => {
  const p = r.intNot(-4, 4, 0);
  const u = r.int(-3, 3);
  const w = r.pick([2, 3, 5, 6, 7, 8, 12]);
  const Q = [1, -2 * u, u * u - w];
  const W = pmul([1, -p], Q);
  need(W[3] !== 0 && Q[2] !== 0);
  for (const x of [p, u - Math.sqrt(w), u + Math.sqrt(w)]) if (Math.abs(peval(W, x)) > 1e-9) throw new Error('2.2: kontrola pierwiastków');
  const answer = `x \\in \\{${p}, ${fmtRoot(u, w, -1)}, ${fmtRoot(u, w, 1)}\\}`;
  return open({
    title: 'Równanie wielomianowe stopnia trzeciego',
    q: T`Rozwiąż równanie $${ptex(W)} = 0$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Wskazanie pierwiastka całkowitego $x = ${p}$ (wśród dzielników wyrazu wolnego $${W[3]}$).`],
      [2, 'Etap 2', T`Podzielenie wielomianu przez $${xm(p)}$: $${ptex(W)} = (${xm(p)})(${ptex(Q)})$.`],
      [3, 'Etap 3', T`Rozwiązanie równania $${ptex(Q)} = 0$: $\Delta = ${4 * w}$.`],
      [4, 'Komplet', T`Wszystkie rozwiązania: $${answer}$.`]
    ],
    steps: [
      T`Kandydaci na pierwiastki całkowite to dzielniki $${W[3]}$. $W(${p}) = 0$.`,
      T`Schemat Hornera daje $${ptex(W)} = (${xm(p)})(${ptex(Q)})$.`,
      T`$\Delta = ${4 * u * u} - 4 \cdot ${u * u - w < 0 ? `(${u * u - w})` : u * u - w} = ${4 * w}$, $\sqrt{\Delta} = ${sq(4 * w)}$, więc $x = ${fmtRoot(u, w, -1)}$ lub $x = ${fmtRoot(u, w, 1)}$.`,
      T`Odpowiedź: $${answer}$.`
    ],
    trap: 'Po znalezieniu jednego pierwiastka podziel wielomian, zamiast zgadywać kolejne – pozostałe pierwiastki mogą nie być całkowite.',
    tip: TIP_ROOTS,
    answer: m(answer)
  });
};

// ---------- 2.3 Rozkład: grupowanie i wzory ----------
const groupingChoice = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.int(1, 4);
  need(Math.abs(a) !== b);
  const W = [1, a, -b * b, -a * b * b];
  return mc({
    title: 'Rozkład przez grupowanie',
    q: T`Wielomian $W(x) = ${ptex(W)}$ zapisany w postaci iloczynu czynników liniowych to`,
    ok: m(`(${xm(-a)})(x - ${b})(x + ${b})`),
    bad: [m(`(${xm(-a)})(x - ${b})^2`), m(`(${xm(a)})(x - ${b})(x + ${b})`), m(`(${xm(-a)})(x + ${b})^2`), m(`(${xm(-b)})(${xm(a)})(${xm(-a)})`)],
    steps: [
      T`Grupujemy: $x^2(${xm(-a)}) - ${kk(b)}(${xm(-a)})$.`,
      T`$= (${xm(-a)})(x^2 - ${b * b}) = (${xm(-a)})(x - ${b})(x + ${b})$.`
    ],
    trap: T`$x^2 - ${b * b}$ to różnica kwadratów $(x - ${b})(x + ${b})$, a nie $(x - ${b})^2$.`,
    tip: 'Grupuj tak, żeby w obu grupach powtórzył się ten sam nawias.'
  });
};

const fourthPowers = (r) => {
  const c = r.int(1, 3);
  const k = r.int(1, 5);
  need(c !== k);
  const cx = c === 1 ? 'x' : `${c}x`;
  const c2 = c === 1 ? 'x^2' : `${c * c}x^2`;
  return mc({
    title: 'Różnica czwartych potęg',
    q: T`Wyrażenie $${c ** 4 === 1 ? '' : c ** 4}x^4 - ${k ** 4}$ jest równe`,
    ok: m(`(${cx} - ${k})(${cx} + ${k})(${c2} + ${k * k})`),
    bad: [m(`(${cx} - ${k})^2(${cx} + ${k})^2`), m(`(${c2} - ${k * k})^2`), m(`(${cx} - ${k})(${cx} + ${k})(${c2} - ${k * k})`), m(`(${cx} - ${k})^4`)],
    steps: [
      T`$${c ** 4 === 1 ? '' : c ** 4}x^4 - ${k ** 4} = (${c2})^2 - (${k * k})^2 = (${c2} - ${k * k})(${c2} + ${k * k})$.`,
      T`$${c2} - ${k * k} = (${cx} - ${k})(${cx} + ${k})$, a $${c2} + ${k * k}$ nie rozkłada się dalej.`
    ],
    trap: T`Suma kwadratów $${c2} + ${k * k}$ nie ma pierwiastków rzeczywistych – nie da się jej rozłożyć na czynniki liniowe.`,
    tip: 'Różnicę kwadratów stosuj dwa razy: $a^4 - b^4 = (a^2 - b^2)(a^2 + b^2)$.'
  });
};

const countDistinctRoots = (r) => {
  const a = r.pick([-4, -1, 0, 1, 4, 9, 2, 3]);
  const b = r.int(1, 6);
  const c = r.int(-3, 3);
  need(!(a < 0 && -a === b));
  const set = new Set([c]);
  if (a > 0) [Math.sqrt(a), -Math.sqrt(a)].forEach((x) => set.add(Math.round(x * 1e9) / 1e9));
  if (a === 0) set.add(0);
  const first = a === 0 ? 'x^2' : `x^2 ${a > 0 ? '-' : '+'} ${Math.abs(a)}`;
  return num({
    title: 'Liczba różnych pierwiastków',
    q: T`Ile różnych pierwiastków rzeczywistych ma wielomian $W(x) = (${first})(x^2 + ${b})(${xm(c)})$? Wpisz liczbę.`,
    ans: set.size,
    steps: [
      a > 0 ? T`$${first} = 0$ dla $x = \pm${sq(a)}$.` : a === 0 ? T`$x^2 = 0$ dla $x = 0$.` : T`$${first} > 0$ dla każdego $x$ – brak pierwiastków.`,
      T`$x^2 + ${b} > 0$ – brak pierwiastków. Czynnik $${xm(c)}$ daje $x = ${c}$.`,
      T`Różnych pierwiastków jest $${set.size}$${set.size < (a > 0 ? 3 : a === 0 ? 2 : 1) ? ' (jeden się powtarza)' : ''}.`
    ],
    trap: 'Pierwiastek wspólny dla dwóch czynników liczysz raz – pytanie dotyczy RÓŻNYCH pierwiastków.',
    tip: 'Iloczyn jest zerem, gdy zeruje się któryś czynnik.'
  });
};

const factorTruth = (r) => {
  const a = r.intNot(-4, 4, 0);
  const b = r.int(1, 4);
  need(Math.abs(a) !== b);
  const W = [1, -a, -b * b, a * b * b];
  const honest = r.bool();
  const claim = honest ? `(${xm(a)})(x - ${b})(x + ${b})` : `(${xm(-a)})(x - ${b})(x + ${b})`;
  const W2 = pmul([1, 0, -1], [1, r.intNot(-4, 4, 0, 1, -1)]);
  const honest2 = r.bool();
  const claim2 = honest2 ? `(x - 1)(x + 1)(${xm(-W2[1])})` : `(x - 1)^2(${xm(-W2[1])})`;
  return pf({
    title: 'Poprawność rozkładu na czynniki',
    s1: [T`$${ptex(W)} = ${claim}$.`, honest, honest ? T`Grupowanie: $x^2(${xm(a)}) - ${kk(b)}(${xm(a)}) = (${xm(a)})(x^2 - ${b * b})$.` : T`Poprawnie: $(${xm(a)})(x - ${b})(x + ${b})$ – podstaw $x = ${a}$, żeby to sprawdzić.`],
    s2: [T`$${ptex(W2)} = ${claim2}$.`, honest2, honest2 ? T`$x^2(${xm(-W2[1])}) - (${xm(-W2[1])}) = (${xm(-W2[1])})(x - 1)(x + 1)$.` : T`$x^2 - 1 = (x - 1)(x + 1)$, a nie $(x - 1)^2$.`],
    trap: 'Rozkład sprawdzisz, podstawiając liczbę (np. $x = 2$) do obu stron.',
    tip: 'Grupuj tak, żeby w obu grupach powtórzył się ten sam nawias.'
  });
};

const openFactorization = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.int(1, 5);
  need(Math.abs(a) !== b);
  const W = [1, -a, -b * b, a * b * b];
  const answer = `(${xm(a)})(x - ${b})(x + ${b})`;
  return open({
    title: 'Rozkład wielomianu na czynniki liniowe',
    q: T`Rozłóż wielomian $W(x) = ${ptex(W)}$ na czynniki liniowe. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Pogrupowanie wyrazów: $x^2(${xm(a)}) - ${kk(b)}(${xm(a)})$.`],
      [2, 'Etap 2', T`Wyłączenie wspólnego czynnika: $(${xm(a)})(x^2 - ${b * b})$.`],
      [3, 'Komplet', T`Rozkład różnicy kwadratów: $W(x) = ${answer}$.`]
    ],
    steps: [
      T`$W(x) = (x^3 ${a > 0 ? '-' : '+'} ${Math.abs(a) === 1 ? '' : Math.abs(a)}x^2) - (${kk(b)}x ${a > 0 ? '-' : '+'} ${Math.abs(a * b * b)}) = x^2(${xm(a)}) - ${kk(b)}(${xm(a)})$.`,
      T`$= (${xm(a)})(x^2 - ${b * b})$.`,
      T`$= ${answer}$.`
    ],
    trap: T`Uważaj na znak przy wyłączaniu minusa przed nawias: $-${kk(b)}x ${a > 0 ? '+' : '-'} ${Math.abs(a * b * b)} = -${kk(b)}(${xm(a)})$.`,
    tip: 'Grupuj tak, żeby w obu grupach powtórzył się ten sam nawias.',
    answer: m(`W(x) = ${answer}`)
  });
};

// ---------- 2.4 Równania wielomianowe i dwukwadratowe ----------
const T_VALUES = [-4, -1, 0, 1, 4, 9, 2];
const biquadCount = (t1, t2) => [t1, t2].reduce((n, t) => n + (t > 0 ? 2 : t === 0 ? 1 : 0), 0);
const biquadTex = (t1, t2) => ptex([1, 0, -(t1 + t2), 0, t1 * t2]);

const biquadraticCount = (r) => {
  const [t1, t2] = r.shuffle(T_VALUES).slice(0, 2);
  const n = biquadCount(t1, t2);
  return num({
    title: 'Liczba rozwiązań równania dwukwadratowego',
    q: T`Ile rozwiązań rzeczywistych ma równanie $${biquadTex(t1, t2)} = 0$? Wpisz liczbę.`,
    ans: n,
    steps: [
      T`Podstawienie $t = x^2$, $t \ge 0$: $${ptex([1, -(t1 + t2), t1 * t2], 't')} = 0$, czyli $t = ${Math.min(t1, t2)}$ lub $t = ${Math.max(t1, t2)}$.`,
      T`Każde $t > 0$ daje dwa rozwiązania $x = \pm\sqrt{t}$, $t = 0$ daje jedno, $t < 0$ – żadnego. Razem: $${n}$.`
    ],
    trap: T`Ujemne $t$ trzeba odrzucić – $x^2$ nie może być liczbą ujemną.`,
    tip: 'Równanie $ax^4 + bx^2 + c = 0$ rozwiązujesz podstawieniem $t = x^2$ z warunkiem $t \\ge 0$.'
  });
};

const biquadraticSet = (r) => {
  const a = r.int(1, 4);
  const b = r.intNot(1, 5, a);
  const [p, q] = [Math.min(a, b), Math.max(a, b)];
  return mc({
    title: 'Rozwiązania równania dwukwadratowego',
    q: T`Zbiór wszystkich rozwiązań równania $${biquadTex(p * p, q * q)} = 0$ to`,
    ok: m(roots([-q, -p, p, q])),
    bad: [m(roots([p, q])), m(roots([p * p, q * q])), m(roots([-p * p, -q * q, p * p, q * q])), m(roots([-q, q]))],
    steps: [
      T`$t = x^2$: $${ptex([1, -(p * p + q * q), p * p * q * q], 't')} = 0$, więc $t = ${p * p}$ lub $t = ${q * q}$.`,
      T`$x^2 = ${p * p}$ daje $x = \pm ${p}$, a $x^2 = ${q * q}$ daje $x = \pm ${q}$.`
    ],
    trap: T`Po znalezieniu $t$ wróć do $x$: $x^2 = t$ ma dwa rozwiązania przeciwnych znaków.`,
    tip: 'Równanie $ax^4 + bx^2 + c = 0$ rozwiązujesz podstawieniem $t = x^2$ z warunkiem $t \\ge 0$.'
  });
};

const groupingEquation = (r) => {
  const a = r.intNot(-5, 5, 0);
  const k = r.int(1, 4);
  need(Math.abs(a) !== k);
  const W = [1, -a, -k * k, a * k * k];
  return mc({
    title: 'Równanie rozwiązywane grupowaniem',
    q: T`Zbiór wszystkich rozwiązań równania $${ptex(W)} = 0$ to`,
    ok: m(roots([a, -k, k])),
    bad: [m(roots([a, k])), m(roots([-a, -k, k])), m(roots([a, k * k])), m(roots([-k, k]))],
    steps: [T`$x^2(${xm(a)}) - ${kk(k)}(${xm(a)}) = (${xm(a)})(x - ${k})(x + ${k}) = 0$.`, T`Rozwiązania: $x = ${a}$, $x = ${k}$, $x = ${-k}$.`],
    trap: T`Nie dziel równania przez $${xm(a)}$ – zgubisz rozwiązanie $x = ${a}$.`,
    tip: 'Iloczyn jest równy zeru, gdy co najmniej jeden czynnik jest równy zeru.'
  });
};

const BIQUAD_FACTS = [
  [T`W równaniu $x^4 + px^2 + q = 0$ po podstawieniu $t = x^2$ uwzględniamy tylko $t \ge 0$.`, true, T`$t = x^2$ nie może być ujemne.`],
  [T`Równanie $x^4 + px^2 + q = 0$ ma zawsze cztery rozwiązania rzeczywiste.`, false, T`Np. $x^4 + 1 = 0$ nie ma rozwiązań.`],
  [T`Dzieląc obie strony równania $x^3 = 4x$ przez $x$, otrzymujemy wszystkie jego rozwiązania.`, false, T`Dzielenie przez $x$ gubi rozwiązanie $x = 0$.`],
  [T`Równanie $x^4 = 16$ ma dwa rozwiązania rzeczywiste.`, true, T`$x^2 = 4$ (bo $x^2 = -4$ odpada), więc $x = \pm 2$.`]
];

const biquadraticFacts = (r) => {
  const [s1] = pickTwo(r, BIQUAD_FACTS);
  const [t1, t2] = r.shuffle(T_VALUES).slice(0, 2);
  const n = biquadCount(t1, t2);
  const claimed = r.bool() ? n : r.pick([0, 1, 2, 3, 4].filter((x) => x !== n));
  return pf({
    title: 'Równania dwukwadratowe',
    s1,
    s2: [T`Równanie $${biquadTex(t1, t2)} = 0$ ma dokładnie $${claimed}$ ${nSol(claimed)} rzeczywistych.`, claimed === n, T`$t = ${Math.min(t1, t2)}$ lub $t = ${Math.max(t1, t2)}$, co daje $${n}$ ${nSol(n)} w $x$.`],
    trap: 'Liczbę rozwiązań w $x$ ustalasz dopiero po powrocie z $t$ do $x$.',
    tip: 'Równanie $ax^4 + bx^2 + c = 0$ rozwiązujesz podstawieniem $t = x^2$ z warunkiem $t \\ge 0$.'
  });
};

const openBiquadratic = (r) => {
  const s = r.int(1, 4);
  const t2 = r.pick([-9, -4, -3, -2, -1, ...[1, 2, 3, 4].filter((x) => x !== s).map((x) => x * x)]);
  const t1 = s * s;
  const sols = [-s, s, ...(t2 > 0 ? [-Math.sqrt(t2), Math.sqrt(t2)] : [])];
  const answer = `x \\in ${roots(sols)}`;
  return open({
    title: 'Równanie dwukwadratowe',
    q: T`Rozwiąż równanie $${biquadTex(t1, t2)} = 0$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Podstawienie $t = x^2$, $t \ge 0$, i zapisanie równania $${ptex([1, -(t1 + t2), t1 * t2], 't')} = 0$.`],
      [2, 'Etap 2', T`Rozwiązanie równania z $t$: $t = ${Math.min(t1, t2)}$ lub $t = ${Math.max(t1, t2)}$${t2 < 0 ? T` i odrzucenie $t = ${t2}$` : ''}.`],
      [3, 'Komplet', T`Rozwiązania: $${answer}$.`]
    ],
    steps: [
      T`$t = x^2 \ge 0$: $${ptex([1, -(t1 + t2), t1 * t2], 't')} = 0$, $\Delta = ${(t1 - t2) ** 2}$.`,
      T`$t = ${Math.min(t1, t2)}$ lub $t = ${Math.max(t1, t2)}$.${t2 < 0 ? T` Wartość $t = ${t2} < 0$ odrzucamy.` : ''}`,
      T`$x^2 = ${t1}$ daje $x = \pm ${s}$${t2 > 0 ? T`, $x^2 = ${t2}$ daje $x = \pm ${Math.sqrt(t2)}$` : ''}. Odpowiedź: $${answer}$.`
    ],
    trap: T`Ujemne $t$ trzeba odrzucić – $x^2$ nie może być liczbą ujemną.`,
    tip: 'Równanie $ax^4 + bx^2 + c = 0$ rozwiązujesz podstawieniem $t = x^2$ z warunkiem $t \\ge 0$.',
    answer: m(answer)
  });
};

// ---------- 2.5 Nierówności wielomianowe ----------
const OPS = { '>': '>', '>=': '\\ge', '<': '<', '<=': '\\le' };
const FLIP = { '>': '<=', '>=': '<', '<': '>=', '<=': '>' };
const STRICT = { '>': '>=', '>=': '>', '<': '<=', '<=': '<' };

const productInequality = (r) => {
  const [a, b, c] = r.shuffle([-4, -3, -2, -1, 0, 1, 2, 3, 4]).slice(0, 3).sort((x, y) => x - y);
  const op = r.pick(Object.keys(OPS));
  const negFirst = r.bool();
  const sign = negFirst ? -1 : 1;
  const f1 = negFirst ? (a === 0 ? '-x' : `${a} - x`) : xm(a);
  const S = signSet([a, b, c], op, sign);
  return mc({
    title: 'Nierówność iloczynowa – wężyk',
    q: T`Zbiór rozwiązań nierówności $${negFirst ? `(${f1})` : fct(a)}${fct(b)}${fct(c)} ${OPS[op]} 0$ to`,
    ok: m(fmt(S)),
    bad: [m(fmt(signSet([a, b, c], op, -sign))), m(fmt(signSet([a, b, c], STRICT[op], sign))), m(fmt(signSet([a, b, c], FLIP[op], sign))), m(fmt(signSet([a, b, c], STRICT[op], -sign)))],
    steps: [
      negFirst ? T`$${f1} = -${fct(a)}$, więc nierówność to $-${fct(a)}${fct(b)}${fct(c)} ${OPS[op]} 0$ – współczynnik przy $x^3$ jest ujemny.` : T`Współczynnik przy $x^3$ jest dodatni.`,
      T`Pierwiastki: $${a}$, $${b}$, $${c}$. Wężyk zaczyna się z prawej strony ${negFirst ? 'pod osią' : 'nad osią'}.`,
      T`Rozwiązanie: $${fmt(S)}$.`
    ],
    trap: negFirst ? T`Czynnik $(${f1})$ ma minus przy $x$ – wężyk zaczyna się od dołu. Albo wyłącz $-1$ i zmień znak nierówności.` : 'Przy nierówności nieostrej pierwiastki należą do zbioru rozwiązań, przy ostrej – nie.',
    tip: TIP_SIGN
  });
};

const countIntegerSolutions = (r) => {
  const pts = r.shuffle([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]).slice(0, 4).sort((x, y) => x - y);
  const op = r.pick(['<=', '<']);
  const S = signSet(pts, op);
  let count = 0;
  for (let k = -20; k <= 20; k++) if (contains(S, k)) count++;
  return num({
    title: 'Liczba całkowitych rozwiązań nierówności',
    q: T`Ile liczb całkowitych spełnia nierówność $${pts.map(fct).join('')} ${OPS[op]} 0$? Wpisz liczbę.`,
    ans: count,
    steps: [
      T`Pierwiastki: $${pts.join(',\\; ')}$, współczynnik przy $x^4$ dodatni – wężyk zaczyna się z prawej nad osią.`,
      T`Rozwiązanie: $${fmt(S)}$.`,
      T`Liczb całkowitych w tym zbiorze jest $${count}$.`
    ],
    trap: op === '<' ? 'Nierówność jest ostra – pierwiastki NIE należą do zbioru, więc ich nie liczysz.' : 'Nierówność nieostra – pierwiastki należą do zbioru i trzeba je policzyć.',
    tip: TIP_SIGN
  });
};

const doubleRootInequality = (r) => {
  const [a, b] = r.shuffle([-3, -2, -1, 1, 2, 3, 4]).slice(0, 2);
  const op = r.pick(Object.keys(OPS));
  const S = signSet([a, a, b], op);
  return mc({
    title: 'Pierwiastek podwójny w nierówności',
    q: T`Zbiór rozwiązań nierówności $(${xm(a)})^2(${xm(b)}) ${OPS[op]} 0$ to`,
    ok: m(fmt(S)),
    bad: [m(fmt(signSet([a, b], op))), m(fmt(signSet([b], op))), m(fmt(signSet([a, a, b], STRICT[op])))],
    steps: [
      T`$(${xm(a)})^2 \ge 0$, a zeruje się tylko dla $x = ${a}$ – przy tym pierwiastku wężyk się odbija, nie przechodzi przez oś.`,
      T`Znak całego wyrażenia (poza $x = ${a}$) zależy tylko od $${xm(b)}$.`,
      T`Rozwiązanie: $${fmt(S)}$.`
    ],
    trap: T`Przy nierówności nieostrej $x = ${a}$ należy do zbioru (wyrażenie jest wtedy zerem), nawet jeśli leży poza przedziałem z drugiego czynnika.`,
    tip: TIP_SIGN
  });
};

const inequalityMembership = (r) => {
  const [a, b, c] = r.shuffle([-4, -3, -2, -1, 0, 1, 2, 3, 4]).slice(0, 3);
  const op = r.pick(Object.keys(OPS));
  const val = (x) => (x - a) * (x - b) * (x - c);
  const test = (v) => (op === '>' ? v > 0 : op === '>=' ? v >= 0 : op === '<' ? v < 0 : v <= 0);
  const t1 = r.int(-5, 5);
  const t2 = r.intNot(-5, 5, t1);
  const ineq = `${fct(a)}${fct(b)}${fct(c)} ${OPS[op]} 0`;
  const st = (t) => [T`Liczba $${t}$ spełnia nierówność $${ineq}$.`, test(val(t)), T`Dla $x = ${t}$ lewa strona jest równa $${val(t)}$.`];
  return pf({ title: 'Czy liczba spełnia nierówność', s1: st(t1), s2: st(t2), trap: 'Pojedynczą liczbę sprawdzasz podstawieniem – nie trzeba rozwiązywać całej nierówności.', tip: TIP_SIGN });
};

const openPolynomialInequality = (r) => {
  const p = r.intNot(-4, 4, 0);
  const k = r.int(1, 4);
  need(Math.abs(p) !== k);
  const op = r.pick(['>=', '<=', '>', '<']);
  const W = [1, -p, -k * k, p * k * k];
  const S = signSet([p, k, -k], op);
  const q = T`Rozwiąż nierówność $${ptex(W)} ${OPS[op]} 0$. Zapisz obliczenia.`;
  const test = (v) => (op === '>' ? v > 0 : op === '>=' ? v >= 0 : op === '<' ? v < 0 : v <= 0);
  verifySet(S, (x) => test(peval(W, x)), (x) => test(peval(W, x)), q);
  return open({
    title: 'Nierówność wielomianowa stopnia trzeciego',
    q,
    stages: [
      [1, 'Etap 1', T`Pogrupowanie: $x^2(${xm(p)}) - ${kk(k)}(${xm(p)})$.`],
      [2, 'Etap 2', T`Rozkład na czynniki liniowe: $(${xm(p)})(x - ${k})(x + ${k})$.`],
      [3, 'Etap 3', T`Wyznaczenie pierwiastków $${[p, k, -k].sort((x, y) => x - y).join(',\\; ')}$ i szkic wykresu (wężyk).`],
      [4, 'Komplet', T`Zbiór rozwiązań: $${fmt(S)}$.`]
    ],
    steps: [
      T`$${ptex(W)} = x^2(${xm(p)}) - ${kk(k)}(${xm(p)}) = (${xm(p)})(x - ${k})(x + ${k})$.`,
      T`Pierwiastki: $${[p, k, -k].sort((x, y) => x - y).join(',\\; ')}$; współczynnik przy $x^3$ dodatni, więc wężyk zaczyna się z prawej nad osią.`,
      T`Zbiór rozwiązań: $${fmt(S)}$.`
    ],
    trap: OPS[op].includes('e') ? 'Nierówność nieostra – pierwiastki należą do zbioru rozwiązań (nawiasy domknięte).' : 'Nierówność ostra – pierwiastki nie należą do zbioru rozwiązań.',
    tip: TIP_SIGN,
    answer: m(`x \\in ${fmt(S)}`)
  });
};

export default {
  numericId: 2,
  title: 'Wielomiany',
  short_title: 'Wielomiany',
  description: 'Dzielenie przez dwumian, pierwiastki całkowite, rozkład na czynniki, równania dwukwadratowe i nierówności wielomianowe.',
  icon: 'Binary',
  color: '#FFB800',
  matura_points_range: '0–4 pkt',
  importance: 'HIGH',
  cke_formula_page: 'str. 7',
  cke_stats: 'Narzędzie dla zadań z parametrem, pochodną i optymalizacją; samodzielnie rzadko (1 z 11 arkuszy CKE 2022–2026).',
  lessons: [
    {
      title: 'Dzielenie wielomianu przez dwumian i reszta',
      short_title: 'Dzielenie i reszta',
      requirements: ['II.R1'],
      prereq: ['math-lesson-2-2'],
      pill: pill({
        essence: T`Wielomian dzielisz przez dwumian $x - a$ schematem Hornera: przepisujesz współczynniki i mnożysz przez $a$. Ważniejsza od samego dzielenia jest reszta: zawsze równa się $W(a)$. Dzięki temu podzielność sprawdzasz jednym podstawieniem.`,
        context: 'Dzielenie wielomianów jest narzędziem w zadaniach z pochodną, optymalizacją i równaniami wyższego stopnia. Samodzielnie pojawia się w zadaniach o resztach z dzielenia.',
        pl: T`Dzielisz $W(x) = x^3 - 2x + 5$ przez $x - 1$? Zamiast pisać słupki, podstaw $x = 1$: $W(1) = 4$. To jest reszta. Gdyby wyszło zero, $x - 1$ „mieści się” w wielomianie bez reszty.`,
        steps: [
          ['Wypisz współczynniki', T`Także zera dla brakujących potęg.`, 'Brakująca potęga to współczynnik 0.'],
          ['Horner', T`Przepisz pierwszy, potem mnóż przez $a$ i dodawaj.`, 'Mnożysz przez a z dwumianu x − a.'],
          ['Odczytaj wynik', T`Ostatnia liczba to reszta, poprzednie – iloraz.`, 'Iloraz ma stopień o 1 niższy.']
        ],
        formulas: [
          ['Dzielenie z resztą', T`W(x) = (x - a) \cdot Q(x) + R`],
          ['Twierdzenie o reszcie', T`R = W(a)`],
          ['Podzielność', T`W(a) = 0 \text{ – } W(x) \text{ dzieli się przez } (x - a)`]
        ],
        examples: [
          ['Reszta', '1 pkt', T`Oblicz resztę z dzielenia $W(x) = 2x^3 - x + 4$ przez $x + 1$.`, T`1. $x + 1 = x - (-1)$.` + '\n' + T`2. $R = W(-1) = -2 + 1 + 4 = 3$.`, 'Przy dwumianie z plusem podstawiasz liczbę ujemną.'],
          ['Horner', '1 pkt', T`Podziel $x^3 - 4x^2 + x + 6$ przez $x - 2$.`, T`1. Współczynniki: $1, -4, 1, 6$; $a = 2$.` + '\n' + T`2. Kolejno: $1, -2, -3, 0$.` + '\n' + T`3. Iloraz: $x^2 - 2x - 3$, reszta $0$.`, 'Reszta 0 oznacza, że 2 jest pierwiastkiem.']
        ],
        trap: T`Przy dzieleniu przez $x + 3$ podstawiasz $x = -3$, a w schemacie Hornera mnożysz przez $-3$.`,
        fail: T`„Reszta z dzielenia przez $x + 3$ to $W(3)$.”`,
        win: T`$x + 3 = x - (-3)$, więc reszta to $W(-3)$.`,
        why: 'Dwumian zeruje się dla $x = -3$ – tylko to podstawienie daje resztę.',
        ckeTip: 'Pisz jawnie „reszta to $W(a)$” – w zadaniach z resztami to pierwszy punkt w kluczu.',
        points: [T`Reszta z dzielenia przez $x - a$ to $W(a)$.`, 'Horner: mnożysz przez a.', 'Brakujące potęgi wpisz jako zera.']
      }),
      gens: [remainderValue, quotientChoice, parameterDivisible, remainderFacts, openTwoRemainders]
    },
    {
      title: 'Pierwiastki całkowite wielomianu',
      short_title: 'Pierwiastki całkowite',
      requirements: ['II.R3', 'III.R1'],
      prereq: ['math-lesson-3-4'],
      pill: pill({
        essence: T`Jeżeli wielomian ma współczynniki całkowite, to każdy jego pierwiastek całkowity jest dzielnikiem wyrazu wolnego. Wypisujesz dzielniki (z plusem i minusem), sprawdzasz je podstawieniem, a po znalezieniu jednego dzielisz wielomian przez $x - p$. Zostaje trójmian, który rozwiązujesz jak zwykle.`,
        context: 'Twierdzenie o pierwiastkach całkowitych jest w podstawie 2024 (II.R3). Pierwiastki wymierne zniknęły z wymagań – nie trzeba ich szukać.',
        pl: T`Wielomian $x^3 - 2x^2 - 5x + 6$: wyraz wolny $6$, więc kandydaci to $\pm 1, \pm 2, \pm 3, \pm 6$. Podstawiasz po kolei: $W(1) = 0$ – mamy go! Zamiast zgadywać w ciemno, sprawdzasz tylko osiem liczb.`,
        steps: [
          ['Wypisz kandydatów', T`Dzielniki wyrazu wolnego, $\pm$.`, 'Dodatnie i ujemne.'],
          ['Sprawdź podstawieniem', T`Szukasz $W(p) = 0$.`, 'Zacznij od ±1.'],
          ['Podziel i dokończ', T`$W(x) = (x - p)Q(x)$, rozwiąż $Q(x) = 0$.`, 'Q może mieć pierwiastki niewymierne.']
        ],
        formulas: [
          ['Kandydaci', T`p \mid a_0 \text{ (wyraz wolny)}`],
          ['Rozkład', T`W(x) = (x - p) \cdot Q(x)`],
          ['Wyróżnik', T`\Delta = b^2 - 4ac`, 7]
        ],
        examples: [
          ['Równanie stopnia 3', '3 pkt', T`Rozwiąż $x^3 - 3x^2 - 2x + 6 = 0$.`, T`1. Kandydaci: $\pm 1, \pm 2, \pm 3, \pm 6$; $W(3) = 0$.` + '\n' + T`2. $W(x) = (x - 3)(x^2 - 2)$.` + '\n' + T`3. $x \in \{3, -\sqrt{2}, \sqrt{2}\}$.`, 'Trójmian po podzieleniu daje pierwiastki niewymierne.'],
          ['Kandydaci', '1 pkt', T`Jakie liczby całkowite mogą być pierwiastkami $x^3 + 4x^2 - 10$?`, T`1. Dzielniki $-10$: $\pm 1, \pm 2, \pm 5, \pm 10$.` + '\n' + T`2. Tylko te liczby warto sprawdzać.`, 'Jeśli żadna nie pasuje, wielomian nie ma pierwiastków całkowitych.']
        ],
        trap: T`Twierdzenie mówi, że pierwiastek całkowity MUSI być dzielnikiem wyrazu wolnego – nie odwrotnie. Dzielnik wcale nie musi być pierwiastkiem.`,
        fail: T`„$2$ dzieli $6$, więc $2$ jest pierwiastkiem.”`,
        win: T`$2$ jest kandydatem; pierwiastkiem jest tylko wtedy, gdy $W(2) = 0$.`,
        why: 'Twierdzenie zawęża listę kandydatów, ale każdego trzeba sprawdzić.',
        ckeTip: 'W rozwiązaniu pokaż sprawdzenie $W(p) = 0$ – samo podanie pierwiastka bez uzasadnienia może kosztować punkt.',
        points: ['Kandydaci to dzielniki wyrazu wolnego.', 'Sprawdzaj podstawieniem.', 'Po znalezieniu pierwiastka podziel wielomian.']
      }),
      gens: [candidateSet, findIntegerRoot, sumOfIntegerRoots, rootMembership, openCubicEquation]
    },
    {
      title: 'Rozkład na czynniki: grupowanie i wzory',
      short_title: 'Rozkład na czynniki',
      requirements: ['II.R2', 'II.R5'],
      prereq: ['math-lesson-2-3'],
      pill: pill({
        essence: T`Wielomian rozkładasz na czynniki dwiema metodami: wyłączając wspólny czynnik przed nawias oraz grupując wyrazy tak, by w każdej grupie pojawił się ten sam nawias. Potem dokańczasz wzorami skróconego mnożenia: różnica kwadratów i sumy lub różnice sześcianów.`,
        context: 'Rozkład na czynniki to pierwszy krok w równaniach i nierównościach wielomianowych, a także przy badaniu znaku pochodnej.',
        pl: T`$x^3 + 2x^2 - 9x - 18$ wygląda groźnie. Ale pierwsze dwa wyrazy mają wspólne $x^2$, a dwa ostatnie wspólne $-9$: $x^2(x + 2) - 9(x + 2)$. Ten sam nawias – wyciągasz go i zostaje $(x + 2)(x^2 - 9)$.`,
        steps: [
          ['Wspólny czynnik', T`Wyłącz przed nawias, co się da.`, 'Np. x albo liczbę.'],
          ['Grupowanie', T`Dwie grupy z tym samym nawiasem.`, 'Uważaj na minus przed drugą grupą.'],
          ['Wzory', T`$a^2 - b^2$, $a^3 \pm b^3$.`, 'Suma kwadratów się nie rozkłada.']
        ],
        formulas: [
          ['Różnica kwadratów', T`a^2 - b^2 = (a - b)(a + b)`, 7],
          ['Suma i różnica sześcianów', T`a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)`, 7],
          ['Grupowanie', T`ax + ay + bx + by = (a + b)(x + y)`]
        ],
        examples: [
          ['Grupowanie', '2 pkt', T`Rozłóż $x^3 - 3x^2 - 4x + 12$.`, T`1. $x^2(x - 3) - 4(x - 3)$.` + '\n' + T`2. $(x - 3)(x^2 - 4) = (x - 3)(x - 2)(x + 2)$.`, 'Minus przed 4 zmienia znak liczby 12 w nawiasie.'],
          ['Czwarte potęgi', '1 pkt', T`Rozłóż $x^4 - 16$.`, T`1. $(x^2 - 4)(x^2 + 4)$.` + '\n' + T`2. $(x - 2)(x + 2)(x^2 + 4)$.`, 'Czynnik x² + 4 zostaje.']
        ],
        trap: T`Przy wyłączaniu minusa z drugiej grupy zmieniasz znaki WSZYSTKICH wyrazów w nawiasie: $-4x + 12 = -4(x - 3)$.`,
        fail: T`„$-4x + 12 = -4(x + 3)$.”`,
        win: T`$-4x + 12 = -4(x - 3)$.`,
        why: 'Sprawdź mnożeniem: $-4 \\cdot (-3) = +12$.',
        ckeTip: 'Rozkładaj do końca – CKE w zadaniach o rozkładzie wymaga czynników możliwie najniższego stopnia.',
        points: ['Najpierw wspólny czynnik.', 'Grupuj, by powtórzył się nawias.', 'Suma kwadratów nie rozkłada się na czynniki liniowe.']
      }),
      gens: [groupingChoice, fourthPowers, countDistinctRoots, factorTruth, openFactorization]
    },
    {
      title: 'Równania wielomianowe i dwukwadratowe',
      short_title: 'Równania wielomianowe',
      requirements: ['III.R1', 'III.R6'],
      prereq: ['math-lesson-3-4'],
      pill: pill({
        essence: T`Równanie wielomianowe rozwiązujesz, rozkładając lewą stronę na czynniki: iloczyn jest zerem, gdy któryś czynnik jest zerem. Szczególny przypadek to równanie dwukwadratowe $ax^4 + bx^2 + c = 0$ – po podstawieniu $t = x^2$ zamienia się w zwykłe równanie kwadratowe, ale tylko $t \ge 0$ daje rozwiązania.`,
        context: 'Równania wielomianowe są elementem zadań z pochodną (miejsca zerowe pochodnej) i z parametrem. Dwukwadratowe to wymaganie III.R6.',
        pl: T`$x^4 - 5x^2 + 4 = 0$ to w przebraniu $t^2 - 5t + 4 = 0$, gdzie $t = x^2$. Wychodzi $t = 1$ i $t = 4$, czyli $x = \pm 1$ i $x = \pm 2$. Cztery rozwiązania z jednego równania kwadratowego.`,
        steps: [
          ['Rozłóż albo podstaw', T`Grupowanie lub $t = x^2$.`, 'Przy x⁴ i x² – podstawienie.'],
          ['Rozwiąż prostsze równanie', T`Każdy czynnik równy zeru.`, 'Z t – warunek t ≥ 0.'],
          ['Wróć do x', T`$x^2 = t$ daje $x = \pm\sqrt{t}$.`, 'Zbierz wszystkie rozwiązania.']
        ],
        formulas: [
          ['Iloczyn równy zeru', T`a \cdot b = 0 \text{ – } a = 0 \text{ lub } b = 0`],
          ['Podstawienie', T`t = x^2, \quad t \ge 0`],
          ['Wyróżnik', T`\Delta = b^2 - 4ac`, 7]
        ],
        examples: [
          ['Dwukwadratowe', '2 pkt', T`Rozwiąż $x^4 + 3x^2 - 4 = 0$.`, T`1. $t^2 + 3t - 4 = 0$, $t = 1$ lub $t = -4$.` + '\n' + T`2. $t = -4$ odrzucamy, $x^2 = 1$.` + '\n' + T`3. $x \in \{-1, 1\}$.`, 'Ujemne t nie daje rozwiązań.'],
          ['Grupowanie', '2 pkt', T`Rozwiąż $x^3 - 2x^2 - x + 2 = 0$.`, T`1. $x^2(x - 2) - (x - 2) = (x - 2)(x - 1)(x + 1)$.` + '\n' + T`2. $x \in \{-1, 1, 2\}$.`, 'Iloczyn zeruje każdy czynnik osobno.']
        ],
        trap: T`Nie dziel obu stron przez wyrażenie z $x$ – gubisz rozwiązania. $x^3 = 4x$ ma trzy rozwiązania, a nie dwa.`,
        fail: T`„$x^3 = 4x$, dzielę przez $x$: $x^2 = 4$, $x = \pm 2$.”`,
        win: T`$x^3 - 4x = x(x - 2)(x + 2) = 0$, więc $x \in \{-2, 0, 2\}$.`,
        why: 'Dzielenie przez $x$ jest możliwe tylko dla $x \\ne 0$ – a $x = 0$ też jest rozwiązaniem.',
        ckeTip: 'Przy podstawieniu $t = x^2$ zapisz warunek $t \\ge 0$ – odrzucenie ujemnego $t$ bez komentarza może kosztować punkt.',
        points: ['Rozkładaj zamiast dzielić.', T`Podstawienie $t = x^2$ z warunkiem $t \ge 0$.`, 'Każde dodatnie t daje dwa rozwiązania.']
      }),
      gens: [biquadraticCount, biquadraticSet, groupingEquation, biquadraticFacts, openBiquadratic]
    },
    {
      title: 'Nierówności wielomianowe – metoda wężyka',
      short_title: 'Nierówności wielomianowe',
      requirements: ['III.R1'],
      prereq: ['math-lesson-3-3'],
      pill: pill({
        essence: T`Nierówność wielomianową rozwiązujesz w trzech krokach: rozkład na czynniki, pierwiastki na osi, szkic wykresu („wężyk”). Wężyk zaczynasz z prawej strony nad osią, gdy współczynnik przy najwyższej potędze jest dodatni. Przy pierwiastku nieparzystej krotności przechodzi przez oś, przy parzystej – odbija się.`,
        context: 'Nierówności wielomianowe są wymaganiem III.R1. Sama metoda wraca przy badaniu znaku pochodnej w zadaniach optymalizacyjnych (6 pkt).',
        pl: T`$(x - 1)(x - 3)(x - 5) > 0$: zaznaczasz $1$, $3$, $5$. Dla bardzo dużego $x$ wszystkie nawiasy są dodatnie, więc z prawej jesteś nad osią. Przy każdym pierwiastku przechodzisz na drugą stronę: nad – pod – nad – pod. Odczytujesz, gdzie wężyk jest nad osią: $(1, 3) \cup (5, +\infty)$.`,
        steps: [
          ['Rozłóż na czynniki', T`Wszystko na jedną stronę, potem rozkład.`, 'Nie dziel przez wyrażenie z x.'],
          ['Pierwiastki na osi', T`Z krotnościami.`, 'Parzysta krotność – odbicie.'],
          ['Wężyk i odczyt', T`Z prawej: znak współczynnika przy najwyższej potędze.`, 'Nawiasy: ostra – otwarte, nieostra – domknięte.']
        ],
        formulas: [
          ['Postać iloczynowa', T`W(x) = a(x - x_1)(x - x_2) \cdot \ldots \cdot (x - x_n)`],
          ['Krotność parzysta', T`(x - x_0)^2 \ge 0`],
          ['Grupowanie', T`x^2(x - p) - k^2(x - p) = (x - p)(x - k)(x + k)`]
        ],
        examples: [
          ['Trzy pierwiastki', '3 pkt', T`Rozwiąż $x^3 - 2x^2 - 9x + 18 \le 0$.`, T`1. $(x - 2)(x - 3)(x + 3) \le 0$.` + '\n' + T`2. Pierwiastki $-3, 2, 3$; z prawej nad osią.` + '\n' + T`3. $x \in (-\infty, -3 \rangle \cup \langle 2, 3 \rangle$.`, 'Nieostra nierówność – pierwiastki w zbiorze.'],
          ['Pierwiastek podwójny', '2 pkt', T`Rozwiąż $(x - 1)^2(x + 2) > 0$.`, T`1. W $x = 1$ wężyk się odbija.` + '\n' + T`2. $x \in (-2, 1) \cup (1, +\infty)$.`, 'Punkt 1 wypada, bo tam wyrażenie jest zerem.']
        ],
        trap: T`Czynnik typu $(3 - x)$ ma ujemny współczynnik przy $x$ – zmienia znak całego iloczynu. Wyłącz $-1$ albo zacznij wężyk od dołu.`,
        fail: T`„$(3 - x)(x + 1) > 0$ – wężyk z prawej nad osią, więc $x > 3$ lub $x < -1$.”`,
        win: T`$-(x - 3)(x + 1) > 0$, czyli $(x - 3)(x + 1) < 0$, więc $x \in (-1, 3)$.`,
        why: 'Współczynnik przy $x^2$ jest ujemny, więc wężyk zaczyna się pod osią.',
        ckeTip: 'Narysuj szkic wykresu (wężyk) w rozwiązaniu – w kluczu CKE jest za to osobny etap.',
        points: ['Rozkład na czynniki liniowe.', 'Z prawej: znak współczynnika przy najwyższej potędze.', 'Krotność parzysta – odbicie od osi.']
      }),
      gens: [productInequality, countIntegerSolutions, doubleRootInequality, inequalityMembership, openPolynomialInequality]
    }
  ]
};
