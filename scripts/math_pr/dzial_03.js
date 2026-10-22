import { T, mc, num, pf, open, pill, fr, lin, quad, xm, m, need, iv } from '../math_pp/lib.js';
import { signSet, removePoints, fmt, numTex, verifySet, contains, quadIneq } from './sets.js';
import { pickTwo } from './common.js';

const TIP_RATIONAL = 'Najpierw dziedzina: mianownik różny od zera. Rozwiązania spoza dziedziny odrzucasz na końcu.';
const TIP_INEQ = 'Nierówność wymierną zamieniasz na iloczynową: $\\frac{P(x)}{Q(x)} > 0$ jest równoważne $P(x) \\cdot Q(x) > 0$ (przy $Q(x) \\ne 0$). Nie mnożysz przez mianownik o nieznanym znaku.';
const TIP_ABS = 'Karta wzorów, str. 4: $|x| = x$ dla $x \\ge 0$ i $|x| = -x$ dla $x < 0$. $|x - a|$ to odległość liczb $x$ i $a$ na osi.';

const OPS = { '>': '>', '>=': '\\ge', '<': '<', '<=': '\\le' };
const FLIP = { '>': '<=', '>=': '<', '<': '>=', '<=': '>' };
const test = (op, v) => (op === '>' ? v > 0 : op === '>=' ? v >= 0 : op === '<' ? v < 0 : v <= 0);
const den = (a, b) => `(${xm(a)})(${xm(b)})`;
/** Składnik ze znakiem do doklejenia: plusTex('-1') -> '- 1'. */
const plusTex = (s) => (s.startsWith('-') ? `- ${s.slice(1)}` : `+ ${s}`);
const sfrac = (n, d) => (n < 0 ? `-\\frac{${-n}}{${d}}` : `\\frac{${n}}{${d}}`);
const fct = (p) => (p === 0 ? 'x' : `(${xm(p)})`);
const solSet = (list) => (list.length ? `\\{${[...new Set(list)].sort((x, y) => x - y).map(numTex).join(', ')}\\}` : '\\emptyset');

// ---------- 3.1 Dodawanie i odejmowanie wyrażeń wymiernych ----------
const differenceOfReciprocals = (r) => {
  const a = r.intNot(-6, 6, 0);
  const b = r.intNot(-6, 6, 0, a);
  return mc({
    title: 'Różnica ułamków algebraicznych',
    q: T`Dla $x \ne ${a}$ i $x \ne ${b}$ wyrażenie $\frac{1}{${xm(a)}} - \frac{1}{${xm(b)}}$ jest równe`,
    ok: m(sfrac(a - b, den(a, b))),
    bad: [m(sfrac(b - a, den(a, b))), m(`\\frac{1}{${den(a, b)}}`), m(`\\frac{${lin(2, -(a + b))}}{${den(a, b)}}`), m(sfrac(a - b, lin(2, -(a + b))))],
    steps: [
      T`Wspólny mianownik: $${den(a, b)}$.`,
      T`Licznik: $(${xm(b)}) - (${xm(a)}) = ${a - b}$.`
    ],
    trap: T`Odejmując drugi licznik, zmieniasz znak CAŁEGO nawiasu: $-(${xm(a)}) = ${lin(-1, a)}$.`,
    tip: 'Ułamki algebraiczne dodajesz jak zwykłe: wspólny mianownik, potem liczniki.'
  });
};

const sumOfFractions = (r) => {
  const p = r.intNot(-5, 5, 0);
  const q = r.intNot(-5, 5, 0, -p);
  const a = r.intNot(-6, 6, 0);
  const b = r.intNot(-6, 6, 0, a);
  const numer = lin(p + q, p * b + q * a);
  return mc({
    title: 'Suma dwóch ułamków algebraicznych',
    q: T`Dla $x \ne ${-a}$ i $x \ne ${-b}$ wyrażenie $${sfrac(p, xm(-a))} ${q < 0 ? '-' : '+'} \frac{${Math.abs(q)}}{${xm(-b)}}$ jest równe`,
    ok: m(`\\frac{${numer}}{(${xm(-a)})(${xm(-b)})}`),
    bad: [
      m(`\\frac{${lin(p + q, p * a + q * b)}}{(${xm(-a)})(${xm(-b)})}`),
      m(sfrac(p + q, `(${xm(-a)})(${xm(-b)})`)),
      m(sfrac(p + q, lin(2, a + b))),
      m(`\\frac{${lin(p * q, p * b + q * a)}}{(${xm(-a)})(${xm(-b)})}`)
    ],
    steps: [
      T`Wspólny mianownik: $(${xm(-a)})(${xm(-b)})$.`,
      T`Licznik: $${p}(${xm(-b)}) ${q < 0 ? '-' : '+'} ${Math.abs(q)}(${xm(-a)}) = ${numer}$.`
    ],
    trap: 'Ułamków nie dodaje się „góra z górą, dół z dołem” – liczniki dodajesz dopiero po sprowadzeniu do wspólnego mianownika.',
    tip: 'Ułamki algebraiczne dodajesz jak zwykłe: wspólny mianownik, potem liczniki.'
  });
};

const valueOfSum = (r) => {
  const p = r.intNot(-5, 5, 0);
  const q = r.intNot(-5, 5, 0);
  const a = r.intNot(-4, 4, 0);
  const b = r.intNot(-4, 4, 0, a);
  const t = r.intNot(-4, 4, -a, -b);
  const value = p / (t + a) + q / (t + b);
  return num({
    title: 'Wartość wyrażenia wymiernego',
    q: T`Oblicz wartość wyrażenia $${sfrac(p, xm(-a))} ${q < 0 ? '-' : '+'} \frac{${Math.abs(q)}}{${xm(-b)}}$ dla $x = ${t}$. Wpisz liczbę.`,
    ans: value,
    steps: [
      T`$${sfrac(p, t + a)} ${q < 0 ? '-' : '+'} \frac{${Math.abs(q)}}{${t + b}} = ${fr(p, t + a)} ${plusTex(fr(q, t + b))}$.`,
      T`$= ${fr(p * (t + b) + q * (t + a), (t + a) * (t + b))}$.`
    ],
    trap: 'Podstaw liczbę do każdego mianownika osobno – nie skracaj wyrażenia przed podstawieniem.',
    tip: 'Ułamki algebraiczne dodajesz jak zwykłe: wspólny mianownik, potem liczniki.'
  });
};

const domainTruth = (r) => {
  const a = r.intNot(-5, 5, 0);
  const c = r.int(1, 5);
  need(Math.abs(a) !== c);
  const honest = r.bool();
  const excluded = honest ? [-a, -c, c] : [-a, c];
  const expr = `\\frac{1}{${xm(-a)}} + \\frac{x}{x^2 - ${c * c}}`;
  const a2 = r.intNot(-5, 5, 0);
  return pf({
    title: 'Dziedzina wyrażenia wymiernego',
    s1: [T`Wyrażenie $${expr}$ jest określone dla $x \in \mathbb{R} \setminus ${solSet(excluded)}$.`, honest, T`Mianowniki zerują się dla $x = ${-a}$ oraz $x = \pm ${c}$${honest ? '' : ' – w podanym zbiorze brakuje jednej liczby'}.`],
    s2: [
      T`Wyrażenie $\frac{x - ${Math.abs(a2)}}{x^2 + ${Math.abs(a2)}}$ jest określone dla każdej liczby rzeczywistej $x$.`,
      true,
      T`$x^2 + ${Math.abs(a2)} > 0$ dla każdego $x$, więc mianownik nigdy nie jest zerem.`
    ],
    trap: T`Mianownik $x^2 - ${c * c}$ zeruje się dla DWÓCH liczb: $${c}$ i $${-c}$.`,
    tip: TIP_RATIONAL
  });
};

const openFractionIdentity = (r) => {
  const a = r.int(1, 9);
  const plus = r.bool();
  const rhs = plus ? `\\frac{2x}{x^2 - ${a * a}}` : `\\frac{${2 * a}}{x^2 - ${a * a}}`;
  const lhs = `\\frac{1}{x - ${a}} ${plus ? '+' : '-'} \\frac{1}{x + ${a}}`;
  const numer = plus ? `(x + ${a}) + (x - ${a})` : `(x + ${a}) - (x - ${a})`;
  return open({
    title: 'Dowód tożsamości z ułamkami algebraicznymi',
    q: T`Wykaż, że dla każdej liczby rzeczywistej $x \ne ${a}$ i $x \ne ${-a}$ prawdziwa jest równość $${lhs} = ${rhs}$.`,
    stages: [
      [1, 'Etap 1', T`Sprowadzenie lewej strony do wspólnego mianownika: $\frac{${numer}}{(x - ${a})(x + ${a})}$.`],
      [2, 'Komplet', T`Uproszczenie licznika i zapisanie mianownika jako $x^2 - ${a * a}$, czyli otrzymanie prawej strony.`]
    ],
    steps: [
      T`$${lhs} = \frac{${numer}}{(x - ${a})(x + ${a})}$.`,
      T`Licznik: $${numer} = ${plus ? '2x' : 2 * a}$, mianownik: $(x - ${a})(x + ${a}) = x^2 - ${a * a}$.`,
      T`Lewa strona jest równa $${rhs}$, co należało wykazać.`
    ],
    trap: plus ? T`Wspólny mianownik to iloczyn $(x - ${a})(x + ${a})$, a nie suma mianowników.` : T`W liczniku odejmujesz cały nawias: $(x + ${a}) - (x - ${a}) = ${2 * a}$, a nie $0$.`,
    tip: 'Dowód tożsamości: przekształcasz JEDNĄ stronę, aż otrzymasz drugą.',
    answer: m(`${lhs} = ${rhs}`),
    proof: true
  });
};

// ---------- 3.2 Równania wymierne ----------
const quotientEquation = (r) => {
  const [a, b, c] = r.shuffle([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]).slice(0, 3);
  const numer = quad(1, -(a + b), a * b);
  return mc({
    title: 'Równanie wymierne – licznik równy zeru',
    q: T`Zbiór wszystkich rozwiązań równania $\frac{${numer}}{(${xm(a)})(${xm(c)})} = 0$ to`,
    ok: m(solSet([b])),
    bad: [m(solSet([a, b])), m(solSet([a])), m(solSet([b, c])), m('\\emptyset')],
    steps: [
      T`Dziedzina: $x \ne ${a}$ i $x \ne ${c}$.`,
      T`Licznik: $${numer} = (${xm(a)})(${xm(b)})$, zeruje się dla $x = ${a}$ i $x = ${b}$.`,
      T`$x = ${a}$ nie należy do dziedziny, więc jedynym rozwiązaniem jest $x = ${b}$.`
    ],
    trap: T`Miejsce zerowe licznika, które zeruje też mianownik, NIE jest rozwiązaniem – ułamek nie istnieje dla $x = ${a}$.`,
    tip: TIP_RATIONAL
  });
};

const countRationalSolutions = (r) => {
  const k = r.int(1, 6);
  const e = r.pick([k, -k, r.intNot(-6, 6, k, -k)]);
  const n = e === k || e === -k ? 1 : 2;
  return num({
    title: 'Liczba rozwiązań równania wymiernego',
    q: T`Ile rozwiązań ma równanie $\frac{x^2 - ${k * k}}{${xm(e)}} = 0$? Wpisz liczbę.`,
    ans: n,
    steps: [
      T`Dziedzina: $x \ne ${e}$. Licznik zeruje się dla $x = ${k}$ i $x = ${-k}$.`,
      n === 1 ? T`$x = ${e}$ odpada (poza dziedziną), zostaje jedno rozwiązanie.` : T`Obie liczby należą do dziedziny – równanie ma $2$ rozwiązania.`
    ],
    trap: 'Ułamek jest zerem, gdy licznik jest zerem, a mianownik – nie.',
    tip: TIP_RATIONAL
  });
};

const simpleRationalEquation = (r) => {
  const a = r.intNot(-6, 6, 0);
  const q = r.intNot(-4, 4, 0);
  const d = r.intNot(-5, 5, 0);
  const p = q * d;
  const x = a + d;
  return mc({
    title: 'Proste równanie wymierne',
    q: T`Rozwiązaniem równania $${sfrac(p, xm(a))} = ${q}$ jest liczba`,
    ok: m(x),
    val: x,
    bad: [m(a - d), m(d), m(numTex(a + q / p)), m(-x)],
    steps: [T`Dla $x \ne ${a}$ mnożymy przez $${xm(a)}$: $${p} = ${q === 1 ? '' : q === -1 ? '-' : q}(${xm(a)})$.`, T`$${xm(a)} = ${fr(p, q)}$, więc $x = ${x}$ – należy do dziedziny.`],
    trap: T`Mnożenie przez $${xm(a)}$ jest dozwolone, bo w dziedzinie $x \ne ${a}$ – zapisz to założenie.`,
    tip: TIP_RATIONAL
  });
};

const rationalMembership = (r) => {
  const [a, b, c] = r.shuffle([-4, -3, -2, -1, 1, 2, 3, 4]).slice(0, 3);
  const eq = `\\frac{(${xm(a)})(${xm(b)})}{${xm(c)}} = 0`;
  const options = [a, b, c, r.intNot(-5, 5, a, b, c)];
  const [t1, t2] = pickTwo(r, options);
  const st = (t) => [T`Liczba $${t}$ jest rozwiązaniem równania $${eq}$.`, (t === a || t === b) && t !== c, t === c ? T`Dla $x = ${c}$ mianownik jest zerem – liczba spoza dziedziny.` : t === a || t === b ? T`Licznik jest zerem, a mianownik $${t - c} \ne 0$.` : T`Licznik dla $x = ${t}$ jest równy $${(t - a) * (t - b)} \ne 0$.`];
  return pf({ title: 'Rozwiązania równania wymiernego', s1: st(t1), s2: st(t2), trap: 'Liczba zerująca mianownik nigdy nie jest rozwiązaniem.', tip: TIP_RATIONAL });
};

const openRationalEquation = (r) => {
  const a = r.intNot(-5, 5, 0);
  const [r1, r2] = r.shuffle([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6].filter((x) => x !== a)).slice(0, 2).sort((x, y) => x - y);
  const b = r1 + r2 - a;
  const k = a * b - r1 * r2;
  need(k !== 0 && b !== 0);
  const trinomial = quad(1, -(a + b), a * b - k);
  for (const x of [r1, r2]) if (Math.abs(k / (x - a) - (x - b)) > 1e-9) throw new Error('3.2: kontrola rozwiązań');
  const answer = `x \\in \\{${r1}, ${r2}\\}`;
  return open({
    title: 'Równanie wymierne prowadzące do kwadratowego',
    q: T`Rozwiąż równanie $${sfrac(k, xm(a))} = ${xm(b)}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie dziedziny: $x \ne ${a}$.`],
      [2, 'Etap 2', T`Przekształcenie do równania kwadratowego: $${trinomial} = 0$.`],
      [3, 'Komplet', T`Rozwiązanie równania i sprawdzenie dziedziny: $${answer}$.`]
    ],
    steps: [
      T`Dziedzina: $x \ne ${a}$. Mnożymy obie strony przez $${xm(a)}$: $${k} = (${xm(a)})(${xm(b)})$.`,
      T`$${trinomial} = 0$, $\Delta = ${(r2 - r1) ** 2}$.`,
      T`$x = ${r1}$ lub $x = ${r2}$ – obie liczby są różne od $${a}$. Odpowiedź: $${answer}$.`
    ],
    trap: 'Po rozwiązaniu sprawdź, czy otrzymane liczby nie zerują mianownika.',
    tip: TIP_RATIONAL,
    answer: m(answer)
  });
};

// ---------- 3.3 Nierówności wymierne ----------
const rationalSet = (a, b, op) => removePoints(signSet([a, b], op), [b]);

const quotientInequality = (r) => {
  const [a, b] = r.shuffle([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]).slice(0, 2);
  const op = r.pick(Object.keys(OPS));
  const S = rationalSet(a, b, op);
  return mc({
    title: 'Nierówność ilorazowa',
    q: T`Zbiór rozwiązań nierówności $\frac{${xm(a)}}{${xm(b)}} ${OPS[op]} 0$ to`,
    ok: m(fmt(S)),
    bad: [m(fmt(signSet([a, b], op))), m(fmt(signSet([a], op))), m(fmt(rationalSet(a, b, FLIP[op]))), m(fmt(signSet([a, b], FLIP[op])))],
    steps: [
      T`Dziedzina: $x \ne ${b}$. Nierówność jest równoważna $(${xm(a)})(${xm(b)}) ${OPS[op]} 0$ przy $x \ne ${b}$.`,
      T`Pierwiastki $${a}$ i $${b}$, parabola ramionami w górę.`,
      T`Rozwiązanie: $${fmt(S)}$.`
    ],
    trap: T`Liczba $${b}$ zeruje mianownik – nigdy nie należy do zbioru rozwiązań, nawet przy nierówności nieostrej.`,
    tip: TIP_INEQ
  });
};

const countRationalIntegers = (r) => {
  const a = r.int(-6, 4);
  const b = r.int(a + 2, a + 8);
  const [lo, hi] = r.bool() ? [a, b] : [b, a];
  const op = r.pick(['<', '<=']);
  const S = rationalSet(lo, hi, op);
  let count = 0;
  for (let k = -30; k <= 30; k++) if (contains(S, k)) count++;
  return num({
    title: 'Całkowite rozwiązania nierówności wymiernej',
    q: T`Ile liczb całkowitych spełnia nierówność $\frac{${xm(lo)}}{${xm(hi)}} ${OPS[op]} 0$? Wpisz liczbę.`,
    ans: count,
    steps: [T`Dziedzina: $x \ne ${hi}$. Zbiór rozwiązań: $${fmt(S)}$.`, T`Liczb całkowitych w tym zbiorze jest $${count}$.`],
    trap: T`Liczba $${hi}$ (z mianownika) jest wykluczona${op === '<=' ? T`, ale $${lo}$ (z licznika) przy nierówności nieostrej należy do zbioru` : ''}.`,
    tip: TIP_INEQ
  });
};

const reciprocalInequality = (r) => {
  const a = r.int(-5, 5);
  const c = r.int(1, 4);
  const d = r.int(1, 5);
  const k = c * d;
  return mc({
    title: 'Nierówność z ułamkiem i liczbą',
    q: T`Zbiór rozwiązań nierówności $\frac{${k}}{${xm(a)}} > ${c}$ to`,
    ok: m(iv.oo(a, a + d)),
    bad: [m(`${iv.lo(a)} \\cup ${iv.ro(a + d)}`), m(iv.lo(a + d)), m(iv.ro(a + d)), m(iv.oc(a, a + d))],
    steps: [
      T`Przenosimy na jedną stronę: $\frac{${k} - ${c}(${xm(a)})}{${xm(a)}} > 0$, czyli $\frac{${lin(-c, k + c * a)}}{${xm(a)}} > 0$.`,
      T`Równoważnie $(${xm(a + d)})(${xm(a)}) < 0$, więc $x \in ${iv.oo(a, a + d)}$.`
    ],
    trap: T`Nie mnóż przez $${xm(a)}$ – dla $x < ${a}$ ten mianownik jest ujemny i nierówność zmieniłaby kierunek.`,
    tip: TIP_INEQ
  });
};

const RATIONAL_INEQ_FACTS = [
  [T`Nierówność $\frac{x - 2}{x + 1} > 0$ jest równoważna nierówności $(x - 2)(x + 1) > 0$.`, true, 'Iloraz i iloczyn mają ten sam znak (przy niezerowym mianowniku).'],
  [T`Nierówność $\frac{x - 2}{x + 1} > 0$ jest równoważna nierówności $x - 2 > 0$.`, false, T`Mnożenie przez $x + 1$ wymaga znajomości jego znaku – np. $x = -3$ spełnia nierówność, a $x - 2 < 0$.`],
  [T`Liczba $-1$ należy do zbioru rozwiązań nierówności $\frac{x - 2}{x + 1} \le 0$.`, false, T`Dla $x = -1$ mianownik jest zerem.`],
  [T`Liczba $2$ należy do zbioru rozwiązań nierówności $\frac{x - 2}{x + 1} \le 0$.`, true, T`Dla $x = 2$ ułamek jest równy $0$.`]
];

const rationalInequalityFacts = (r) => {
  const [s1, s2] = pickTwo(r, RATIONAL_INEQ_FACTS);
  return pf({ title: 'Równoważność nierówności wymiernych', s1, s2, trap: 'Mnożenie nierówności przez wyrażenie z $x$ jest dozwolone tylko wtedy, gdy znasz jego znak.', tip: TIP_INEQ });
};

const openRationalInequality = (r) => {
  const q = r.intNot(-5, 5, 0);
  const p = r.int(-6, 6);
  const k = r.pick([2, 3]);
  const x0 = (p + k * q) / (k - 1);
  need(Number.isInteger(x0) && x0 !== q);
  const S = removePoints(signSet([x0, q], '>='), [q]);
  const ineq = `\\frac{${lin(1, p)}}{${xm(q)}} \\le ${k}`;
  verifySet(S, (x) => x !== q && (x + p) / (x - q) <= k + 1e-12, (x) => x !== q && (x + p) / (x - q) <= k + 1e-12, ineq);
  return open({
    title: 'Nierówność wymierna',
    q: T`Rozwiąż nierówność $${ineq}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Przeniesienie na jedną stronę i sprowadzenie do wspólnego mianownika: $\frac{${lin(1 - k, p + k * q)}}{${xm(q)}} \le 0$.`],
      [2, 'Etap 2', T`Zapisanie nierówności iloczynowej $${fct(x0)}(${xm(q)}) \ge 0$ z warunkiem $x \ne ${q}$.`],
      [3, 'Komplet', T`Zbiór rozwiązań: $${fmt(S)}$.`]
    ],
    steps: [
      T`Dziedzina: $x \ne ${q}$. $\frac{${lin(1, p)}}{${xm(q)}} - ${k} = \frac{${lin(1 - k, p + k * q)}}{${xm(q)}} \le 0$.`,
      T`Mnożymy licznik przez $-1$ (zmiana znaku nierówności): $\frac{${xm(x0)}}{${xm(q)}} \ge 0$, czyli $${fct(x0)}(${xm(q)}) \ge 0$ przy $x \ne ${q}$.`,
      T`Zbiór rozwiązań: $${fmt(S)}$.`
    ],
    trap: T`Nie mnóż obu stron przez $${xm(q)}$ – jego znak zależy od $x$. Liczba $${q}$ nigdy nie należy do rozwiązania.`,
    tip: TIP_INEQ,
    answer: m(`x \\in ${fmt(S)}`)
  });
};

// ---------- 3.4 Równania z wartością bezwzględną ----------
const simpleAbsEquation = (r) => {
  const a = r.int(-8, 8);
  const b = r.int(1, 9);
  const askSum = r.bool();
  return num({
    title: askSum ? 'Suma rozwiązań równania z modułem' : 'Iloczyn rozwiązań równania z modułem',
    q: T`Oblicz ${askSum ? 'sumę' : 'iloczyn'} wszystkich rozwiązań równania $|${xm(a)}| = ${b}$. Wpisz liczbę.`,
    ans: askSum ? 2 * a : (a - b) * (a + b),
    steps: [T`$|${xm(a)}| = ${b}$ oznacza, że $x$ jest odległe od $${a}$ o $${b}$: $x = ${a - b}$ lub $x = ${a + b}$.`, askSum ? T`Suma: $${a - b} + ${a + b < 0 ? `(${a + b})` : a + b} = ${2 * a}$.` : T`Iloczyn: $${a - b} \cdot ${a + b < 0 ? `(${a + b})` : a + b} = ${(a - b) * (a + b)}$.`],
    trap: T`Równanie $|u| = ${b}$ ma DWA rozwiązania: $u = ${b}$ i $u = -${b}$.`,
    tip: TIP_ABS
  });
};

const twoAbsEquation = (r) => {
  const a = r.int(-5, 3);
  const b = r.int(a + 1, a + 6);
  const c = r.int(b - a + 1, b - a + 8);
  need((a + b + c) % 2 === 0);
  const x1 = (a + b - c) / 2;
  const x2 = (a + b + c) / 2;
  return mc({
    title: 'Suma dwóch wartości bezwzględnych',
    q: T`Zbiór wszystkich rozwiązań równania $|${xm(a)}| + |${xm(b)}| = ${c}$ to`,
    ok: m(solSet([x1, x2])),
    bad: [m(solSet([x2])), m(solSet([a - c, b + c])), m(iv.cc(a, b)), m(solSet([x1, a, b, x2]))],
    steps: [
      T`Dla $x \in \langle ${a}, ${b} \rangle$ suma odległości od $${a}$ i $${b}$ jest stała i równa $${b - a} \ne ${c}$ – brak rozwiązań.`,
      T`Dla $x > ${b}$: $2x - ${a + b < 0 ? `(${a + b})` : a + b} = ${c}$, więc $x = ${x2}$. Dla $x < ${a}$: $-2x + ${a + b < 0 ? `(${a + b})` : a + b} = ${c}$, więc $x = ${x1}$.`
    ],
    trap: 'Rozwiązanie z każdego przedziału musi należeć do tego przedziału – inaczej je odrzucasz.',
    tip: TIP_ABS
  });
};

const absSquareCount = (r) => {
  const k = r.int(1, 4);
  const c = r.pick([0, 1, 2, 3, k * k, k * k + 1, k * k + 5, -1].filter((x) => x <= k * k + 5));
  const n = c < 0 ? 0 : c === 0 ? 2 : c < k * k ? 4 : c === k * k ? 3 : 2;
  return mc({
    title: 'Liczba rozwiązań równania z modułem',
    q: T`Liczba rozwiązań równania $|x^2 - ${k * k}| = ${c}$ jest równa`,
    ok: m(n),
    val: n,
    bad: [0, 1, 2, 3, 4].filter((x) => x !== n).map((x) => m(x)),
    steps: [
      T`Wykres $y = |x^2 - ${k * k}|$: parabola $x^2 - ${k * k}$ z częścią pod osią odbitą do góry – „garb” o wysokości $${k * k}$ nad $x = 0$.`,
      T`Prosta $y = ${c}$ przecina ten wykres w $${n}$ punktach.`
    ],
    trap: c === k * k ? T`Dla $y = ${k * k}$ prosta jest styczna do „garbu” w $x = 0$ – to jedno rozwiązanie, nie dwa.` : 'Liczbę rozwiązań odczytujesz z wykresu: przecięcia z prostą poziomą.',
    tip: TIP_ABS
  });
};

const ABS_FACTS = [
  [T`$|a - b|$ jest odległością liczb $a$ i $b$ na osi liczbowej.`, true, 'To interpretacja geometryczna wartości bezwzględnej.'],
  [T`$|x| = -x$ dla każdej liczby $x < 0$.`, true, T`Np. $|-3| = 3 = -(-3)$.`],
  [T`$|x + y| = |x| + |y|$ dla dowolnych liczb $x$, $y$.`, false, T`$|1 + (-1)| = 0$, a $|1| + |-1| = 2$.`],
  [T`Równanie $|x - 3| = -2$ ma dokładnie jedno rozwiązanie.`, false, 'Wartość bezwzględna nie może być ujemna – brak rozwiązań.'],
  [T`$|x|^2 = x^2$ dla każdej liczby rzeczywistej $x$.`, true, 'Kwadrat usuwa znak.']
];

const absFacts = (r) => {
  const [s1] = pickTwo(r, ABS_FACTS);
  const a = r.int(-4, 4);
  const b = r.int(a + 1, a + 5);
  const c = r.int(b - a, b - a + 6);
  const t = r.int(-8, 8);
  const lhs = Math.abs(t - a) + Math.abs(t - b);
  return pf({
    title: 'Wartość bezwzględna',
    s1,
    s2: [T`Liczba $${t}$ spełnia równanie $|${xm(a)}| + |${xm(b)}| = ${c}$.`, lhs === c, T`Dla $x = ${t}$ lewa strona to $${Math.abs(t - a)} + ${Math.abs(t - b)} = ${lhs}$.`],
    trap: 'Wartość bezwzględna jest zawsze nieujemna.',
    tip: TIP_ABS
  });
};

const openAbsEquation = (r) => {
  const a = r.int(1, 5);
  const b = r.int(1, 5);
  const c = r.int(a + b + 1, a + b + 9);
  need((c - a + b) % 2 === 0);
  const x1 = (b - a - c) / 2;
  const x2 = (c - a + b) / 2;
  const f = (x) => Math.abs(x + a) + Math.abs(x - b);
  if (f(x1) !== c || f(x2) !== c) throw new Error('3.4: kontrola rozwiązań');
  for (let x = -40; x <= 40; x += 0.25) if (Math.abs(f(x) - c) < 1e-9 && x !== x1 && x !== x2) throw new Error('3.4: dodatkowe rozwiązanie');
  const answer = `x \\in \\{${x1}, ${x2}\\}`;
  return open({
    title: 'Równanie z dwiema wartościami bezwzględnymi',
    q: T`Rozwiąż równanie $|x + ${a}| + |x - ${b}| = ${c}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Podział osi na przedziały: $(-\infty, ${-a})$, $\langle ${-a}, ${b})$, $\langle ${b}, +\infty)$.`],
      [2, 'Etap 2', 'Rozwiązanie równania w jednym z przedziałów (z opuszczonymi modułami) i sprawdzenie przynależności do przedziału.'],
      [3, 'Etap 3', T`Rozwiązanie we wszystkich przedziałach: $x = ${x1}$, brak rozwiązań w $\langle ${-a}, ${b})$, $x = ${x2}$.`],
      [4, 'Komplet', T`Odpowiedź: $${answer}$.`]
    ],
    steps: [
      T`Dla $x < ${-a}$: $-x - ${a} - x + ${b} = ${c}$, czyli $x = ${x1}$ – należy do przedziału.`,
      T`Dla $x \in \langle ${-a}, ${b})$: $x + ${a} - x + ${b} = ${a + b} \ne ${c}$ – brak rozwiązań.`,
      T`Dla $x \ge ${b}$: $x + ${a} + x - ${b} = ${c}$, czyli $x = ${x2}$ – należy do przedziału. Odpowiedź: $${answer}$.`
    ],
    trap: 'W środkowym przedziale $x$ się skraca – to nie błąd, tylko informacja, że tam nie ma rozwiązań (albo jest ich nieskończenie wiele).',
    tip: TIP_ABS,
    answer: m(answer)
  });
};

// ---------- 3.5 Nierówności z wartością bezwzględną ----------
const absInequality = (r) => {
  const a = r.int(-6, 6);
  const b = r.int(1, 6);
  const op = r.pick(Object.keys(OPS));
  const inner = op === '<' ? iv.oo(a - b, a + b) : op === '<=' ? iv.cc(a - b, a + b) : null;
  const outer = op === '>' ? `${iv.lo(a - b)} \\cup ${iv.ro(a + b)}` : op === '>=' ? `${iv.lc(a - b)} \\cup ${iv.rc(a + b)}` : null;
  const ok = inner || outer;
  return mc({
    title: 'Nierówność z wartością bezwzględną',
    q: T`Zbiór rozwiązań nierówności $|${xm(a)}| ${OPS[op]} ${b}$ to`,
    ok: m(ok),
    bad: [
      m(inner ? `${iv.lo(a - b)} \\cup ${iv.ro(a + b)}` : iv.oo(a - b, a + b)),
      m(op === '<' ? iv.cc(a - b, a + b) : op === '<=' ? iv.oo(a - b, a + b) : op === '>' ? `${iv.lc(a - b)} \\cup ${iv.rc(a + b)}` : `${iv.lo(a - b)} \\cup ${iv.ro(a + b)}`),
      m(inner ? iv.oo(-b - a, b - a) : `${iv.lo(-b - a)} \\cup ${iv.ro(b - a)}`),
      m(inner ? iv.lo(a + b) : iv.ro(a + b))
    ],
    steps: [
      T`$|${xm(a)}|$ to odległość $x$ od $${a}$.`,
      T`Odległość ${op[0] === '<' ? 'mniejsza' : 'większa'} od $${b}$${op.includes('=') ? ' lub równa' : ''}: $x \in ${ok}$.`
    ],
    trap: a === 0 ? T`$|x| ${OPS[op]} ${b}$ to odległość od zera – ${op[0] === '<' ? 'jeden przedział' : 'dwie półproste'}, symetrycznie wokół $0$.` : T`Środek przedziału to $${a}$ (liczba, od której liczysz odległość), a nie $${-a}$.`,
    tip: TIP_ABS
  });
};

const countAbsIntegers = (r) => {
  const k = r.pick([1, 2, 3]);
  const a = r.int(-9, 9);
  const b = r.int(1, 9);
  let count = 0;
  for (let x = -40; x <= 40; x++) if (Math.abs(k * x - a) <= b) count++;
  need(count > 0);
  const lo = numTex((a - b) / k);
  const hi = numTex((a + b) / k);
  return num({
    title: 'Całkowite rozwiązania nierówności z modułem',
    q: T`Ile liczb całkowitych spełnia nierówność $|${lin(k, -a)}| \le ${b}$? Wpisz liczbę.`,
    ans: count,
    steps: [T`$-${b} \le ${lin(k, -a)} \le ${b}$, czyli $${lo} \le x \le ${hi}$.`, T`Liczb całkowitych w tym przedziale jest $${count}$.`],
    trap: k > 1 ? T`Dziel wszystkie trzy części nierówności przez $${k}$ – końce przedziału mogą nie być całkowite.` : 'Przy nierówności nieostrej końce przedziału też się liczą.',
    tip: TIP_ABS
  });
};

const absCompare = (r) => {
  const a = r.int(-6, 6);
  const b = r.intNot(-6, 6, a);
  need((a + b) % 2 === 0);
  const mid = (a + b) / 2;
  const geq = r.bool();
  const closerToB = geq ? b > a : b < a;
  const ok = closerToB ? iv.rc(mid) : iv.lc(mid);
  return mc({
    title: 'Porównanie dwóch odległości',
    q: T`Zbiór rozwiązań nierówności $|${xm(a)}| ${geq ? '\\ge' : '\\le'} |${xm(b)}|$ to`,
    ok: m(ok),
    bad: [m(closerToB ? iv.lc(mid) : iv.rc(mid)), m(closerToB ? iv.ro(mid) : iv.lo(mid)), m(iv.cc(Math.min(a, b), Math.max(a, b)))],
    steps: [
      T`Punkt równo odległy od $${a}$ i $${b}$ to środek odcinka: $${mid}$.`,
      geq ? T`$x$ jest dalej od $${a}$ niż od $${b}$ (lub tak samo) po stronie liczby $${b}$: $x \in ${ok}$.` : T`$x$ jest bliżej $${a}$ niż $${b}$ (lub tak samo) po stronie liczby $${a}$: $x \in ${ok}$.`
    ],
    trap: 'Obie strony są nieujemne, więc wolno je podnieść do kwadratu – wtedy $x^2$ się skraca i zostaje nierówność liniowa.',
    tip: TIP_ABS
  });
};

const absInequalityFacts = (r) => {
  const a = r.int(-4, 4);
  const b = r.int(a + 1, a + 5);
  const c = r.int(b - a + 1, b - a + 6);
  const op = r.pick(['<=', '>']);
  const [t1, t2] = [r.int(-8, 8), r.int(-8, 8)];
  need(t1 !== t2);
  const f = (t) => Math.abs(t - a) + Math.abs(t - b) - c;
  const ineq = `|${xm(a)}| + |${xm(b)}| ${OPS[op]} ${c}`;
  const st = (t) => [T`Liczba $${t}$ spełnia nierówność $${ineq}$.`, test(op, f(t)), T`Dla $x = ${t}$ lewa strona to $${Math.abs(t - a) + Math.abs(t - b)}$.`];
  return pf({ title: 'Czy liczba spełnia nierówność z modułem', s1: st(t1), s2: st(t2), trap: 'Pojedynczą liczbę sprawdzasz podstawieniem.', tip: TIP_ABS });
};

const openAbsInequality = (r) => {
  const a = r.int(-5, 3);
  const b = r.int(a + 1, a + 6);
  const c = r.int(b - a + 1, b - a + 8);
  need((a + b + c) % 2 === 0);
  const lo = (a + b - c) / 2;
  const hi = (a + b + c) / 2;
  const S = quadIneq(lo, hi, '<=');
  const ineq = `|${xm(a)}| + |${xm(b)}| \\le ${c}`;
  const g = (x) => Math.abs(x - a) + Math.abs(x - b) <= c + 1e-12;
  verifySet(S, g, g, ineq);
  return open({
    title: 'Nierówność z dwiema wartościami bezwzględnymi',
    q: T`Rozwiąż nierówność $${ineq}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Podział osi na przedziały: $(-\infty, ${a})$, $\langle ${a}, ${b})$, $\langle ${b}, +\infty)$.`],
      [2, 'Etap 2', 'Rozwiązanie nierówności w jednym z przedziałów i część wspólna z tym przedziałem.'],
      [3, 'Etap 3', T`Rozwiązania w każdym przedziale: $\langle ${lo}, ${a})$, $\langle ${a}, ${b})$, $\langle ${b}, ${hi} \rangle$.`],
      [4, 'Komplet', T`Suma rozwiązań: $x \in ${fmt(S)}$.`]
    ],
    steps: [
      T`Dla $x < ${a}$: $${lin(-2, a + b)} \le ${c}$, czyli $x \ge ${lo}$ – w przedziale: $\langle ${lo}, ${a})$.`,
      T`Dla $x \in \langle ${a}, ${b})$: lewa strona to $${b - a} \le ${c}$ – cały przedział.`,
      T`Dla $x \ge ${b}$: $${lin(2, -(a + b))} \le ${c}$, czyli $x \le ${hi}$ – w przedziale: $\langle ${b}, ${hi} \rangle$. Suma: $${fmt(S)}$.`
    ],
    trap: 'Wynik z każdego przedziału przecinasz z tym przedziałem, a na końcu bierzesz SUMĘ (nie część wspólną) wyników.',
    tip: TIP_ABS,
    answer: m(`x \\in ${fmt(S)}`)
  });
};

export default {
  numericId: 3,
  title: 'Wyrażenia wymierne i wartość bezwzględna',
  short_title: 'Wymierne i moduł',
  description: 'Działania na wyrażeniach wymiernych, równania i nierówności wymierne oraz równania i nierówności z wartością bezwzględną.',
  icon: 'EqualNot',
  color: '#FFB800',
  matura_points_range: '2–5 pkt',
  importance: 'HIGH',
  cke_formula_page: 'str. 4',
  cke_stats: 'W 6 z 11 arkuszy CKE 2022–2026, średnio 2,1 pkt na arkusz (moduł także w zadaniach z parametrem).',
  lessons: [
    {
      title: 'Dodawanie i odejmowanie wyrażeń wymiernych',
      short_title: 'Wyrażenia wymierne',
      requirements: ['II.R6'],
      prereq: ['math-lesson-2-4'],
      pill: pill({
        essence: T`Wyrażenia wymierne dodajesz i odejmujesz jak zwykłe ułamki: sprowadzasz do wspólnego mianownika, potem działasz na licznikach. Zanim zaczniesz, zapisz dziedzinę – liczby, dla których mianowniki są zerem, są wykluczone przez cały czas rachunków.`,
        context: 'Działania na wyrażeniach wymiernych (II.R6) pojawiają się w dowodach tożsamości i jako pierwszy etap równań oraz nierówności wymiernych.',
        pl: T`$\frac{1}{x - 1} - \frac{1}{x + 1}$ to jak $\frac{1}{2} - \frac{1}{3}$: wspólny mianownik to iloczyn, a licznik to „krzyżówka”. Tyle że zamiast liczb są nawiasy – i każdy minus działa na cały nawias.`,
        steps: [
          ['Dziedzina', T`Mianowniki różne od zera.`, 'Zapisz ją na początku.'],
          ['Wspólny mianownik', T`Iloczyn różnych czynników.`, 'Rozłóż mianowniki na czynniki.'],
          ['Licznik', T`Pomnóż i uprość.`, 'Minus przed ułamkiem zmienia znaki całego licznika.']
        ],
        formulas: [
          ['Dodawanie ułamków', T`\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}`],
          ['Różnica kwadratów', T`x^2 - a^2 = (x - a)(x + a)`, 7],
          ['Dziedzina', T`\frac{P(x)}{Q(x)}: \ Q(x) \ne 0`]
        ],
        examples: [
          ['Różnica', '1 pkt', T`Uprość $\frac{1}{x - 2} - \frac{1}{x + 2}$.`, T`1. $\frac{(x + 2) - (x - 2)}{(x - 2)(x + 2)}$.` + '\n' + T`2. $= \frac{4}{x^2 - 4}$, $x \ne \pm 2$.`, 'Minus działa na cały drugi licznik.'],
          ['Suma', '1 pkt', T`Uprość $\frac{2}{x} + \frac{3}{x + 1}$.`, T`1. $\frac{2(x + 1) + 3x}{x(x + 1)}$.` + '\n' + T`2. $= \frac{5x + 2}{x(x + 1)}$.`, 'Wspólny mianownik to iloczyn mianowników.']
        ],
        trap: T`Ułamków nie skracasz „po kawałku”: $\frac{x + 2}{x + 5} \ne \frac{2}{5}$. Skracać można tylko czynniki, nie składniki.`,
        fail: T`„$\frac{x + 2}{x + 5} = \frac{2}{5}$ – skreślam $x$.”`,
        win: T`$\frac{x + 2}{x + 5}$ nie da się skrócić.`,
        why: T`Dla $x = 1$: $\frac{3}{6} = \frac{1}{2} \ne \frac{2}{5}$.`,
        ckeTip: 'W dowodach tożsamości przekształcaj tylko jedną stronę i zakończ zdaniem „co należało wykazać”.',
        points: ['Najpierw dziedzina.', 'Wspólny mianownik, potem liczniki.', 'Skracasz czynniki, nie składniki.']
      }),
      gens: [differenceOfReciprocals, sumOfFractions, valueOfSum, domainTruth, openFractionIdentity]
    },
    {
      title: 'Równania wymierne',
      short_title: 'Równania wymierne',
      requirements: ['III.R7', 'III.R2'],
      prereq: ['math-lesson-3-5'],
      pill: pill({
        essence: T`Ułamek jest równy zeru, gdy licznik jest zerem, a mianownik nie. Równanie wymierne rozwiązujesz więc tak: dziedzina, przekształcenie (np. mnożenie przez mianownik – wolno, bo w dziedzinie jest różny od zera), rozwiązanie i sprawdzenie, czy wynik należy do dziedziny.`,
        context: 'Równania wymierne (III.R2, III.R7) pojawiają się samodzielnie i jako etap zadań z funkcjami. Typowa strata punktu: brak odrzucenia rozwiązania spoza dziedziny.',
        pl: T`$\frac{(x - 2)(x - 3)}{x - 2} = 0$ wygląda, jakby miało dwa rozwiązania. Ale dla $x = 2$ dzielisz przez zero – ułamek w ogóle nie istnieje. Zostaje tylko $x = 3$.`,
        steps: [
          ['Dziedzina', T`Wypisz liczby zerujące mianowniki.`, 'Np. x ≠ 2.'],
          ['Przekształć', T`Mnóż przez mianownik albo licznik = 0.`, 'W dziedzinie mnożenie jest dozwolone.'],
          ['Sprawdź', T`Odrzuć rozwiązania spoza dziedziny.`, 'Napisz to wprost.']
        ],
        formulas: [
          ['Ułamek równy zeru', T`\frac{P(x)}{Q(x)} = 0 \ \text{gdy} \ P(x) = 0, \ Q(x) \ne 0`],
          ['Proporcja', T`\frac{a}{b} = \frac{c}{d}, \ bd \ne 0: \ ad = bc`],
          ['Wyróżnik', T`\Delta = b^2 - 4ac`, 7]
        ],
        examples: [
          ['Licznik i dziedzina', '2 pkt', T`Rozwiąż $\frac{x^2 - 9}{x + 3} = 0$.`, T`1. Dziedzina: $x \ne -3$.` + '\n' + T`2. $x^2 - 9 = 0$: $x = 3$ lub $x = -3$.` + '\n' + T`3. Odrzucamy $-3$: $x = 3$.`, 'Pierwiastek wspólny z mianownikiem odpada.'],
          ['Do kwadratowego', '3 pkt', T`Rozwiąż $\frac{6}{x - 1} = x$.`, T`1. $x \ne 1$, $6 = x(x - 1)$.` + '\n' + T`2. $x^2 - x - 6 = 0$, $x = -2$ lub $x = 3$.` + '\n' + T`3. Obie należą do dziedziny.`, 'Po pomnożeniu zostaje zwykłe równanie kwadratowe.']
        ],
        trap: T`Rozwiązanie zerujące mianownik NIE jest rozwiązaniem równania – trzeba je jawnie odrzucić.`,
        fail: T`„$\frac{x^2 - 4}{x - 2} = 0$, więc $x = \pm 2$.”`,
        win: T`Dziedzina $x \ne 2$, więc jedyne rozwiązanie to $x = -2$.`,
        why: 'Dla $x = 2$ ułamek nie istnieje.',
        ckeTip: 'Zapis dziedziny to w kluczu CKE często osobny punkt – nawet jeśli dalej się pomylisz, ten punkt zostaje.',
        points: ['Dziedzina na początku.', 'Licznik = 0, mianownik ≠ 0.', 'Odrzuć liczby spoza dziedziny.']
      }),
      gens: [quotientEquation, countRationalSolutions, simpleRationalEquation, rationalMembership, openRationalEquation]
    },
    {
      title: 'Nierówności wymierne',
      short_title: 'Nierówności wymierne',
      requirements: ['III.R2'],
      prereq: ['math-lesson-3-3'],
      pill: pill({
        essence: T`Nierówności wymiernej nie mnożysz przez mianownik, bo nie znasz jego znaku. Zamiast tego przenosisz wszystko na jedną stronę, sprowadzasz do jednego ułamka i korzystasz z tego, że iloraz i iloczyn mają ten sam znak: $\frac{P}{Q} > 0$ jest równoważne $P \cdot Q > 0$ przy $Q \ne 0$. Dalej – wężyk.`,
        context: 'Nierówności wymierne (III.R2) na arkuszach CKE 2022–2026 były warte do 5 pkt (np. grudzień 2022, zad. 8). Klasyczny błąd: mnożenie przez mianownik o nieznanym znaku.',
        pl: T`Ułamek jest dodatni, gdy licznik i mianownik mają ten sam znak – dokładnie tak samo jak iloczyn. Dlatego $\frac{x - 1}{x + 2} > 0$ rozwiązujesz jak $(x - 1)(x + 2) > 0$, pamiętając tylko, że $x = -2$ jest zakazane.`,
        steps: [
          ['Jedna strona i jeden ułamek', T`$\frac{P(x)}{Q(x)} \ \text{op} \ 0$.`, 'Bez mnożenia przez Q.'],
          ['Postać iloczynowa', T`$P(x) \cdot Q(x) \ \text{op} \ 0$, $Q(x) \ne 0$.`, 'Ten sam znak.'],
          ['Wężyk i dziedzina', T`Odczytaj zbiór, wyrzuć zera mianownika.`, 'Nawet przy ≤ i ≥.']
        ],
        formulas: [
          ['Równoważność', T`\frac{P(x)}{Q(x)} > 0 \ \text{gdy} \ P(x) \cdot Q(x) > 0`],
          ['Dziedzina', T`Q(x) \ne 0`],
          ['Wspólny mianownik', T`\frac{P}{Q} - c = \frac{P - cQ}{Q}`]
        ],
        examples: [
          ['Iloraz', '2 pkt', T`Rozwiąż $\frac{x - 3}{x + 1} \le 0$.`, T`1. $(x - 3)(x + 1) \le 0$, $x \ne -1$.` + '\n' + T`2. $x \in (-1, 3 \rangle$.`, 'Zero mianownika zawsze wypada.'],
          ['Z liczbą', '3 pkt', T`Rozwiąż $\frac{4}{x - 1} > 2$.`, T`1. $\frac{4 - 2(x - 1)}{x - 1} > 0$, czyli $\frac{6 - 2x}{x - 1} > 0$.` + '\n' + T`2. $(x - 3)(x - 1) < 0$.` + '\n' + T`3. $x \in (1, 3)$.`, 'Minus przy x w liczniku zmienia kierunek.']
        ],
        trap: T`Pomnożenie $\frac{4}{x - 1} > 2$ przez $x - 1$ daje $x < 3$ – a $x = 0$ spełnia tę nierówność, choć $\frac{4}{-1} = -4 < 2$.`,
        fail: T`„$\frac{4}{x - 1} > 2$, mnożę: $4 > 2x - 2$, więc $x < 3$.”`,
        win: T`$\frac{6 - 2x}{x - 1} > 0$, więc $x \in (1, 3)$.`,
        why: 'Mnożenie przez liczbę ujemną odwraca nierówność, a $x - 1$ bywa ujemne.',
        ckeTip: 'Zapisz wprost „$x \\ne \\ldots$” obok rozwiązania – zera mianownika w odpowiedzi to błąd merytoryczny.',
        points: ['Nie mnóż przez mianownik.', 'Iloraz i iloczyn mają ten sam znak.', 'Zera mianownika nigdy nie należą do rozwiązania.']
      }),
      gens: [quotientInequality, countRationalIntegers, reciprocalInequality, rationalInequalityFacts, openRationalInequality]
    },
    {
      title: 'Równania z wartością bezwzględną',
      short_title: 'Równania z modułem',
      requirements: ['III.R4'],
      prereq: ['math-lesson-1-4'],
      pill: pill({
        essence: T`$|x - a|$ to odległość liczby $x$ od $a$ na osi. Proste równania rozwiązujesz z tej interpretacji, a równania z kilkoma modułami – metodą przedziałów: dzielisz oś miejscami zerowymi wyrażeń pod modułami, w każdym przedziale opuszczasz moduły z odpowiednim znakiem i sprawdzasz, czy wynik należy do przedziału.`,
        context: 'Równania i nierówności z modułem (III.R4) były na arkuszach CKE 2022–2026 w 5 zadaniach (łącznie 15 pkt), np. maj 2023: $2|x + 3| + 3|x - 1| = 13$.',
        pl: T`$|x - 2| + |x + 1| = 7$ pyta: gdzie jest punkt, którego odległości od $2$ i od $-1$ sumują się do $7$? Między $-1$ a $2$ suma zawsze wynosi $3$ – za mało. Trzeba wyjść na zewnątrz: daleko w lewo albo w prawo.`,
        steps: [
          ['Miejsca zerowe', T`Wyrażenia pod modułami równe zeru.`, 'One dzielą oś.'],
          ['Przedziały', T`W każdym przedziale opuść moduły ze znakiem.`, 'Wyrażenie ujemne – minus.'],
          ['Sprawdź przynależność', T`Rozwiązanie musi leżeć w przedziale.`, 'Inaczej je odrzuć.']
        ],
        formulas: [
          ['Definicja', T`|x| = x \ \text{dla} \ x \ge 0, \quad |x| = -x \ \text{dla} \ x < 0`, 4],
          ['Odległość', T`|x - a| = d \ \text{dla} \ x = a - d \ \text{lub} \ x = a + d`],
          ['Brak rozwiązań', T`|u| = c, \ c < 0`]
        ],
        examples: [
          ['Jeden moduł', '1 pkt', T`Rozwiąż $|x + 4| = 5$.`, T`1. Odległość od $-4$ równa $5$.` + '\n' + T`2. $x = -9$ lub $x = 1$.`, 'Dwa rozwiązania, symetryczne względem −4.'],
          ['Dwa moduły', '3 pkt', T`Rozwiąż $|x + 1| + |x - 2| = 5$.`, T`1. Dla $x < -1$: $-2x + 1 = 5$, $x = -2$.` + '\n' + T`2. Dla $-1 \le x < 2$: $3 = 5$ – brak.` + '\n' + T`3. Dla $x \ge 2$: $2x - 1 = 5$, $x = 3$.`, 'Odpowiedź: x ∈ {−2, 3}.']
        ],
        trap: T`Rozwiązanie otrzymane w danym przedziale trzeba z nim porównać. Liczba spoza przedziału nie jest rozwiązaniem.`,
        fail: T`„Dla $x \ge 2$ wyszło $x = 1$, więc $1$ jest rozwiązaniem.”`,
        win: T`$1 \notin \langle 2, +\infty)$, więc w tym przedziale rozwiązań nie ma.`,
        why: 'Opuszczenie modułów było poprawne tylko dla $x \\ge 2$.',
        ckeTip: 'Wypisz przedziały jawnie i przy każdym zanotuj wynik („należy” / „nie należy”) – egzaminator punktuje kolejne przedziały.',
        points: ['Moduł = odległość.', 'Miejsca zerowe dzielą oś na przedziały.', 'Sprawdzaj przynależność rozwiązania do przedziału.']
      }),
      gens: [simpleAbsEquation, twoAbsEquation, absSquareCount, absFacts, openAbsEquation]
    },
    {
      title: 'Nierówności z wartością bezwzględną',
      short_title: 'Nierówności z modułem',
      requirements: ['III.R4'],
      prereq: ['math-lesson-1-4'],
      pill: pill({
        essence: T`$|x - a| < d$ to liczby bliższe $a$ niż $d$: przedział $(a - d, a + d)$. $|x - a| > d$ to liczby dalsze – dwie półproste. Przy kilku modułach dzielisz oś na przedziały, w każdym rozwiązujesz zwykłą nierówność, przecinasz z przedziałem, a na końcu bierzesz SUMĘ wyników.`,
        context: 'Nierówności z modułem to wymaganie III.R4. Ten sam schemat (przedziały, część wspólna z przedziałem, suma) wraca w zadaniach z parametrem.',
        pl: T`$|x - 3| \le 2$: wszystkie liczby oddalone od $3$ najwyżej o $2$, czyli od $1$ do $5$. Rysujesz kropkę w $3$ i „rozkładasz ręce” na $2$ w każdą stronę.`,
        steps: [
          ['Jeden moduł', T`Interpretacja odległości.`, '< – przedział, > – dwie półproste.'],
          ['Kilka modułów', T`Przedziały jak w równaniach.`, 'Wynik ∩ przedział.'],
          ['Zbierz wyniki', T`Suma rozwiązań z przedziałów.`, 'Nie część wspólna!']
        ],
        formulas: [
          ['Mniejsze od', T`|x - a| < d \ \text{gdy} \ x \in (a - d, a + d)`],
          ['Większe od', T`|x - a| > d \ \text{gdy} \ x \in (-\infty, a - d) \cup (a + d, +\infty)`],
          ['Definicja', T`|x| = x \ \text{dla} \ x \ge 0, \quad |x| = -x \ \text{dla} \ x < 0`, 4]
        ],
        examples: [
          ['Jeden moduł', '1 pkt', T`Rozwiąż $|2x - 1| < 5$.`, T`1. $-5 < 2x - 1 < 5$.` + '\n' + T`2. $-2 < x < 3$.`, 'Dzielisz wszystkie trzy części przez 2.'],
          ['Dwa moduły', '3 pkt', T`Rozwiąż $|x| + |x - 4| \le 6$.`, T`1. Dla $x < 0$: $-2x + 4 \le 6$, $x \ge -1$.` + '\n' + T`2. Dla $0 \le x < 4$: $4 \le 6$ – cały przedział.` + '\n' + T`3. Dla $x \ge 4$: $2x - 4 \le 6$, $x \le 5$. Suma: $\langle -1, 5 \rangle$.`, 'Wyniki z przedziałów sklejasz sumą.']
        ],
        trap: T`$|x - a| > d$ to NIE przedział $(a - d, a + d)$, tylko jego dopełnienie (bez końców).`,
        fail: T`„$|x - 1| > 3$, więc $-2 < x < 4$.”`,
        win: T`$x < -2$ lub $x > 4$.`,
        why: 'Dalej niż 3 od jedynki to liczby na zewnątrz przedziału.',
        ckeTip: 'Na końcu zapisz odpowiedź jednym zbiorem (sumą przedziałów) – rozproszone wyniki z przedziałów bez podsumowania to ryzyko utraty punktu.',
        points: ['< to przedział, > to dwie półproste.', 'W każdym przedziale wynik ∩ przedział.', 'Na końcu suma wyników.']
      }),
      gens: [absInequality, countAbsIntegers, absCompare, absInequalityFacts, openAbsInequality]
    }
  ]
};
