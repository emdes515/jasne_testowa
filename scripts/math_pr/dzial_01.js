import { T, mc, num, pf, open, pill, fr, gcd, m, need } from '../math_pp/lib.js';
import { pickTwo, co, coef } from './common.js';

const PRIMES = [2, 3, 5];
const TIP_LOG = 'Karta wzorów, str. 6: $\\log_a b = \\frac{\\log_c b}{\\log_c a}$. Szukaj wspólnej podstawy – zwykle liczby pierwszej, której potęgami są wszystkie liczby.';
const TIP_PROOF = 'Dowód zaczynasz od założeń zapisanych symbolami, kończysz zdaniem „co należało wykazać”. Każde przejście musi wynikać z poprzedniego.';
const lg = (b, x) => `\\log_{${b}} ${x}`;

// ---------- 1.1 Zamiana podstawy logarytmu ----------
const changeBaseValue = (r) => {
  const p = r.pick(PRIMES);
  const a = r.int(1, 4);
  const b = r.intNot(1, 4, a);
  return mc({
    title: 'Logarytm o podstawie i liczbie będących potęgami',
    q: T`Liczba $${lg(p ** a, p ** b)}$ jest równa`,
    ok: m(fr(b, a)),
    val: b / a,
    bad: [m(fr(a, b)), m(fr(b, 1)), m(fr(b - a, 1)), m(fr(b * a, 1)), m(fr(p * b, a))],
    steps: [
      T`Obie liczby są potęgami $${p}$: $${p ** a} = ${p}^{${a}}$ oraz $${p ** b} = ${p}^{${b}}$.`,
      T`$${lg(p ** a, p ** b)} = \frac{${lg(p, p ** b)}}{${lg(p, p ** a)}} = \frac{${b}}{${a}}${fr(b, a) === `\\frac{${b}}{${a}}` ? '' : ` = ${fr(b, a)}`}$.`
    ],
    trap: T`W ilorazie na górze jest logarytm LICZBY, a na dole logarytm PODSTAWY – zamiana miejscami daje odwrotność wyniku.`,
    tip: TIP_LOG
  });
};

const logProductTwo = (r) => {
  const [p, q] = r.shuffle(PRIMES).slice(0, 2);
  const i = r.int(1, 3);
  const j = r.int(1, 3);
  const k = r.int(1, 3);
  const l = r.int(1, 3);
  need(i + j + k + l > 4);
  const value = (j * l) / (i * k);
  return num({
    title: 'Iloczyn logarytmów o zamienionych podstawach',
    q: T`Oblicz wartość wyrażenia $${lg(p ** i, q ** j)} \cdot ${lg(q ** k, p ** l)}$. Wpisz liczbę.`,
    ans: value,
    steps: [
      T`$${lg(p ** i, q ** j)} = ${coef(j, i)}${lg(p, q)}$ oraz $${lg(q ** k, p ** l)} = ${coef(l, k)}${lg(q, p)}$.`,
      T`$${lg(p, q)} \cdot ${lg(q, p)} = 1$, bo $${lg(q, p)} = \frac{1}{${lg(p, q)}}$.`,
      T`Wynik: $${fr(j, i)} \cdot ${fr(l, k)} = ${fr(j * l, i * k)}$.`
    ],
    trap: T`$${lg(p, q)} \cdot ${lg(q, p)}$ to nie $\log$ iloczynu ani zero – te dwa logarytmy są swoimi odwrotnościami, więc ich iloczyn to $1$.`,
    tip: TIP_LOG
  });
};

const LOG_IDENTITIES = [
  [T`Dla $a, b > 0$, $a \ne 1$, $b \ne 1$ zachodzi $\log_a b = \frac{1}{\log_b a}$.`, true, T`Z zamiany podstawy: $\log_a b = \frac{\log_b b}{\log_b a} = \frac{1}{\log_b a}$.`],
  [T`Dla $a > 0$, $a \ne 1$, $b > 0$ zachodzi $\log_{a^2} b = \frac{1}{2}\log_a b$.`, true, T`$\log_{a^2} b = \frac{\log_a b}{\log_a a^2} = \frac{\log_a b}{2}$.`],
  [T`Dla $a > 0$, $a \ne 1$, $b > 0$ zachodzi $\log_{a^2} b = 2\log_a b$.`, false, T`Potęga przy PODSTAWIE wychodzi jako odwrotność: $\log_{a^2} b = \frac{1}{2}\log_a b$.`],
  [T`Dla dodatnich $a$, $b$ różnych od $1$ zachodzi $\log_a b = \log_b a$.`, false, T`Przykład: $\log_2 8 = 3$, a $\log_8 2 = \frac{1}{3}$.`],
  [T`Dla $a, b > 0$ różnych od $1$ i $c > 0$ zachodzi $\log_a b \cdot \log_b c = \log_a c$.`, true, T`$\frac{\log b}{\log a} \cdot \frac{\log c}{\log b} = \frac{\log c}{\log a} = \log_a c$.`],
  [T`Dla $a, b > 0$, $a \ne 1$ zachodzi $\log_a b = \frac{\log a}{\log b}$.`, false, T`Odwrotnie: $\log_a b = \frac{\log b}{\log a}$ – na górze liczba, na dole podstawa.`]
];

const changeBaseTruth = (r) => {
  const [s1] = pickTwo(r, LOG_IDENTITIES);
  const p = r.pick(PRIMES);
  const a = r.int(2, 4);
  const b = r.intNot(1, 4, a);
  const honest = r.bool();
  return pf({
    title: 'Własności zamiany podstawy',
    s1,
    s2: [
      T`$${lg(p ** a, p ** b)} = ${honest ? fr(b, a) : fr(a, b)}$.`,
      honest,
      honest ? T`$${lg(p ** a, p ** b)} = \frac{${b}}{${a}}$.` : T`$${lg(p ** a, p ** b)} = \frac{${b}}{${a}}$, a nie $${fr(a, b)}$.`
    ],
    trap: 'Potęga przy podstawie logarytmu trafia do mianownika, a potęga przy liczbie – do licznika.',
    tip: TIP_LOG
  });
};

/** Wartość (n/d)·k albo (n/d)/k w LaTeX-u, gdzie k = log_p q. */
const kTex = (n, d, inv) => {
  const g = gcd(n, d);
  const [a, b] = [n / g, d / g];
  if (inv) return b === 1 ? `\\frac{${a}}{k}` : `\\frac{${a}}{${b}k}`;
  return b === 1 ? co(a, 'k') : `\\frac{${co(a, 'k')}}{${b}}`;
};

const expressInK = (r) => {
  const [p, q] = r.shuffle(PRIMES).slice(0, 2);
  const i = r.int(1, 3);
  const j = r.int(1, 3);
  const inv = r.bool();
  need(i !== j || i > 1);
  const [base, arg] = inv ? [q ** i, p ** j] : [p ** i, q ** j];
  const ok = kTex(j, i, inv);
  return mc({
    title: 'Logarytm wyrażony przez dany logarytm',
    q: T`Wiadomo, że $${lg(p, q)} = k$. Wtedy liczba $${lg(base, arg)}$ jest równa`,
    ok: m(ok),
    bad: [m(kTex(j, i, !inv)), m(kTex(i, j, inv)), m(kTex(i, j, !inv)), m(kTex(i * j, 1, inv))],
    steps: [
      inv
        ? T`$${lg(base, arg)} = \frac{${j}}{${i}} \cdot ${lg(q, p)}$, a $${lg(q, p)} = \frac{1}{${lg(p, q)}} = \frac{1}{k}$.`
        : T`$${lg(base, arg)} = \frac{${j}}{${i}} \cdot ${lg(p, q)} = \frac{${j}}{${i}} \cdot k$.`,
      T`Wynik: $${ok}$.`
    ],
    trap: inv ? T`Podstawa i liczba są zamienione względem danego $${lg(p, q)}$, więc wynik zawiera $\frac{1}{k}$, a nie $k$.` : T`Wykładnik podstawy dzieli, wykładnik liczby mnoży – nie odwrotnie.`,
    tip: TIP_LOG
  });
};

const openLogProductThree = (r) => {
  const [p, q, s] = r.shuffle(PRIMES);
  const e = Array.from({ length: 6 }, () => r.int(1, 3));
  need(e.some((x) => x > 1));
  const [a, b, c, d, f, g] = e;
  const value = fr(b * d * g, a * c * f);
  const factors = [lg(p ** a, q ** b), lg(q ** c, s ** d), lg(s ** f, p ** g)];
  return open({
    title: 'Iloczyn trzech logarytmów',
    q: T`Oblicz wartość wyrażenia $${factors.join(' \\cdot ')}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie każdego czynnika przez logarytmy o podstawach $${p}$, $${q}$, $${s}$ (zamiana podstawy), np. $${factors[0]} = ${coef(b, a)}${lg(p, q)}$.`],
      [2, 'Komplet', T`Obliczenie wartości wyrażenia: $${value}$.`]
    ],
    steps: [
      T`$${factors[0]} = ${coef(b, a)}${lg(p, q)}$, $${factors[1]} = ${coef(d, c)}${lg(q, s)}$, $${factors[2]} = ${coef(g, f)}${lg(s, p)}$.`,
      T`$${lg(p, q)} \cdot ${lg(q, s)} \cdot ${lg(s, p)} = \frac{\log ${q}}{\log ${p}} \cdot \frac{\log ${s}}{\log ${q}} \cdot \frac{\log ${p}}{\log ${s}} = 1$.`,
      T`Wartość: $${fr(b, a)} \cdot ${fr(d, c)} \cdot ${fr(g, f)} = ${value}$.`
    ],
    trap: T`Nie licz przybliżeń logarytmów na kalkulatorze – po zamianie podstawy wszystkie logarytmy się skracają.`,
    tip: TIP_LOG,
    answer: m(value)
  });
};

// ---------- 1.2 Wyrażenia logarytmiczne z dziedziną ----------
const COPRIME_PAIRS = [[2, 3], [2, 5], [3, 4], [2, 7], [3, 5], [4, 5]];

const logSum = (r) => {
  const [a, b] = r.pick(COPRIME_PAIRS);
  const k = r.int(1, 4);
  const base = a * b;
  const diff = r.bool();
  const expr = diff
    ? `${co(k, lg(base, base * a))} - ${co(k, lg(base, a))}`
    : `${co(k, lg(base, a))} + ${co(k, lg(base, b))}`;
  return num({
    title: diff ? 'Różnica logarytmów o tej samej podstawie' : 'Suma logarytmów o tej samej podstawie',
    q: T`Oblicz wartość wyrażenia $${expr}$. Wpisz liczbę.`,
    ans: k,
    steps: [
      diff ? T`$${lg(base, base * a)} - ${lg(base, a)} = ${lg(base, `\\frac{${base * a}}{${a}}`)} = ${lg(base, base)} = 1$.` : T`$${lg(base, a)} + ${lg(base, b)} = ${lg(base, `(${a} \\cdot ${b})`)} = ${lg(base, base)} = 1$.`,
      k === 1 ? 'Wartość wyrażenia: $1$.' : T`Całe wyrażenie to $${k} \cdot 1 = ${k}$.`
    ],
    trap: T`Logarytm sumy to nie suma logarytmów: $\log_a x + \log_a y = \log_a (xy)$, a nie $\log_a (x + y)$.`,
    tip: 'Karta wzorów, str. 5: $\\log_a x + \\log_a y = \\log_a (xy)$, $\\log_a x - \\log_a y = \\log_a \\frac{x}{y}$.'
  });
};

const logDomain = (r) => {
  const a = r.int(-4, 4);
  const c = r.int(Math.max(a + 3, 1), a + 7);
  const base = a === 0 ? 'x' : `x ${a > 0 ? '-' : '+'} ${Math.abs(a)}`;
  const arg = `${c} - x`;
  const ok = `${'(' + a + ', ' + (a + 1) + ')'} \\cup (${a + 1}, ${c})`;
  return mc({
    title: 'Dziedzina logarytmu ze zmienną w podstawie',
    q: T`Dziedziną wyrażenia $\log_{${base}}(${arg})$ jest zbiór`,
    ok: m(ok),
    bad: [m(`(${a}, ${c})`), m(`(${a}, ${c} \\rangle`), m(`(${a + 1}, ${c})`), m(`(-\\infty, ${c})`)],
    steps: [
      T`Podstawa: $${base} > 0$ i $${base} \ne 1$, czyli $x > ${a}$ oraz $x \ne ${a + 1}$.`,
      T`Liczba logarytmowana: $${arg} > 0$, czyli $x < ${c}$.`,
      T`Część wspólna: $x \in ${ok}$.`
    ],
    trap: T`Podstawa logarytmu musi być dodatnia I różna od $1$. Warunek „$\ne 1$” najczęściej znika z rozwiązań.`,
    tip: 'Logarytm $\\log_a b$ istnieje tylko dla $a > 0$, $a \\ne 1$ oraz $b > 0$.'
  });
};

const LOG_FACTS = [
  [T`$\log_a (x + y) = \log_a x + \log_a y$ dla dodatnich $x$, $y$.`, false, T`Poprawnie: $\log_a x + \log_a y = \log_a (xy)$.`],
  [T`$a^{\log_a b} = b$ dla $a > 0$, $a \ne 1$, $b > 0$.`, true, 'To definicja logarytmu: $\\log_a b$ jest wykładnikiem, do którego trzeba podnieść $a$, by dostać $b$.'],
  [T`$\log_a x^k = k\log_a x$ dla $x > 0$.`, true, 'Wzór na logarytm potęgi (karta wzorów, str. 5).'],
  [T`$(\log_a x)^2 = 2\log_a x$ dla $x > 0$.`, false, T`$2\log_a x = \log_a x^2$, a $(\log_a x)^2$ to kwadrat liczby $\log_a x$, np. $(\log_2 8)^2 = 9 \ne 6$.`],
  [T`$\log_a 1 = 0$ dla każdej dopuszczalnej podstawy $a$.`, true, T`$a^0 = 1$.`],
  [T`$\frac{\log_a x}{\log_a y} = \log_a \frac{x}{y}$ dla dodatnich $x$, $y \ne 1$.`, false, T`Iloraz logarytmów to $\log_y x$, a $\log_a \frac{x}{y} = \log_a x - \log_a y$.`]
];

const logFacts = (r) => {
  const [s1, s2] = pickTwo(r, LOG_FACTS);
  return pf({ title: 'Własności logarytmów', s1, s2, trap: 'Sprawdzaj każdą „własność” na liczbach, np. $\\log_2 2$ i $\\log_2 8$.', tip: TIP_LOG });
};

const powerOfLog = (r) => {
  const p = r.pick(PRIMES);
  const k = r.int(1, 3);
  const q = r.intNot(2, 9, p);
  need(q ** k <= 1000 && p ** k <= 125);
  const variant = r.bool();
  const expr = variant ? `${p ** k}^{${lg(p, q)}}` : `${p}^{${co(k, lg(p, q))}}`;
  return num({
    title: 'Potęga z logarytmem w wykładniku',
    q: T`Oblicz wartość wyrażenia $${expr}$. Wpisz liczbę.`,
    ans: q ** k,
    steps: [
      variant ? T`$${p ** k}^{${lg(p, q)}} = (${p}^{${k}})^{${lg(p, q)}} = ${p}^{${co(k, lg(p, q))}}$.` : T`Wykładnik $${co(k, lg(p, q))} = ${lg(p, `${q}^{${k}}`)}$.`,
      T`$${p}^{${lg(p, `${q}^{${k}}`)}} = ${q}^{${k}} = ${q ** k}$.`
    ],
    trap: T`$a^{k\log_a b} = b^k$, a nie $k \cdot b$ – wykładnik $k$ zamienia się w potęgę liczby $b$.`,
    tip: 'Z definicji logarytmu: $a^{\\log_a b} = b$.'
  });
};

const openLogExpression = (r) => {
  const p = r.pick(PRIMES);
  const q = r.intNot(2, 9, p, p * p, p * p * p);
  const a = r.int(2, 3);
  const k = r.int(1, 4);
  const value = fr(k * (a + 1), a);
  const expr = `(${lg(p, q)} + ${lg(p ** a, q)}) \\cdot ${lg(q, `${p}^{${k}}`)}`;
  return open({
    title: 'Wyrażenie z logarytmami o różnych podstawach',
    q: T`Oblicz wartość wyrażenia $${expr}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie $${lg(p ** a, q)} = \frac{1}{${a}}${lg(p, q)}$.`],
      [2, 'Etap 2', T`Zapisanie $${lg(q, `${p}^{${k}}`)} = \frac{${k}}{${lg(p, q)}}$ i uproszczenie iloczynu.`],
      [3, 'Komplet', T`Obliczenie wartości: $${value}$.`]
    ],
    steps: [
      T`$${lg(p ** a, q)} = \frac{${lg(p, q)}}{${lg(p, p ** a)}} = \frac{1}{${a}}${lg(p, q)}$, więc nawias to $\frac{${a + 1}}{${a}}${lg(p, q)}$.`,
      T`$${lg(q, `${p}^{${k}}`)} = ${co(k, lg(q, p))} = \frac{${k}}{${lg(p, q)}}$.`,
      T`$\frac{${a + 1}}{${a}}${lg(p, q)} \cdot \frac{${k}}{${lg(p, q)}} = ${value}$.`
    ],
    trap: T`Nie zamieniaj $${lg(p, q)}$ na przybliżenie dziesiętne – po zamianie podstaw logarytm skraca się dokładnie.`,
    tip: TIP_LOG,
    answer: m(value)
  });
};

// ---------- 1.3 Dowody podzielności i reszt ----------
const residue = (x, d) => ((x % d) + d) % d;
const EXPRS = [
  { tex: (k) => `n^2 + ${k}`, sub: (r, k) => `${r}^2 + ${k}`, at: (r, k) => r * r + k },
  { tex: (k) => `n^3 + ${k}`, sub: (r, k) => `${r}^3 + ${k}`, at: (r, k) => r ** 3 + k },
  { tex: (k) => `3n^2 + ${k}n`, sub: (r, k) => `3 \\cdot ${r}^2 + ${k} \\cdot ${r}`, at: (r, k) => 3 * r * r + k * r },
  { tex: (k) => `n^2 + ${k}n + 1`, sub: (r, k) => `${r}^2 + ${k} \\cdot ${r} + 1`, at: (r, k) => r * r + k * r + 1 }
];

const remainderOfExpression = (r) => {
  const d = r.int(3, 9);
  const rem = r.int(1, d - 1);
  const k = r.int(2, 9);
  const e = r.pick(EXPRS);
  const ans = residue(e.at(rem, k), d);
  const others = r.shuffle(Array.from({ length: d }, (_, i) => i).filter((i) => i !== ans));
  return mc({
    title: 'Reszta z dzielenia wyrażenia',
    q: T`Liczba całkowita $n$ przy dzieleniu przez $${d}$ daje resztę $${rem}$. Reszta z dzielenia liczby $${e.tex(k)}$ przez $${d}$ jest równa`,
    ok: m(ans),
    val: ans,
    bad: others.map((x) => m(x)),
    steps: [
      T`$n = ${d}q + ${rem}$, gdzie $q$ jest liczbą całkowitą. Wszystkie składniki z $${d}q$ są podzielne przez $${d}$.`,
      T`Reszta zależy tylko od wartości wyrażenia dla $n = ${rem}$: $${e.sub(rem, k)} = ${e.at(rem, k)}$.`,
      T`$${e.at(rem, k)}$ przy dzieleniu przez $${d}$ daje resztę $${ans}$.`
    ],
    trap: 'Reszta musi być liczbą od $0$ do dzielnika minus jeden – wynik większy trzeba jeszcze podzielić.',
    tip: TIP_PROOF
  });
};

const smallestShift = (r) => {
  const d = r.int(3, 9);
  const rem = r.int(1, d - 1);
  const base = residue(rem * rem, d);
  const k = base === 0 ? d : d - base;
  return num({
    title: 'Najmniejsze uzupełnienie do podzielności',
    q: T`Liczba całkowita $n$ przy dzieleniu przez $${d}$ daje resztę $${rem}$. Podaj najmniejszą liczbę całkowitą dodatnią $k$, dla której liczba $n^2 + k$ jest podzielna przez $${d}$. Wpisz liczbę.`,
    ans: k,
    steps: [
      T`$n = ${d}q + ${rem}$, więc $n^2 = ${d}(${d}q^2 + ${2 * rem}q) + ${rem * rem}$.`,
      T`$${rem * rem}$ daje resztę $${base}$ przy dzieleniu przez $${d}$, więc brakuje $${k}$ do pełnej wielokrotności $${d}$.`
    ],
    trap: 'Najmniejsza DODATNIA liczba: jeśli reszta wynosi $0$, odpowiedzią jest sam dzielnik, a nie zero.',
    tip: TIP_PROOF
  });
};

const DIVISIBILITY_FACTS = [
  ['Iloczyn trzech kolejnych liczb całkowitych jest podzielny przez $6$.', true, 'Wśród trzech kolejnych liczb jest liczba parzysta i liczba podzielna przez $3$.'],
  ['Kwadrat liczby nieparzystej przy dzieleniu przez $8$ daje resztę $1$.', true, T`$(2k + 1)^2 = 4k(k + 1) + 1$, a $k(k + 1)$ jest parzyste.`],
  ['Suma trzech kolejnych liczb całkowitych jest zawsze podzielna przez $6$.', false, T`$1 + 2 + 3 = 6$, ale $2 + 3 + 4 = 9$. Suma to $3n$ – podzielna przez $3$, nie zawsze przez $6$.`],
  ['Kwadrat liczby całkowitej może dawać resztę $2$ przy dzieleniu przez $4$.', false, T`Kwadraty dają przy dzieleniu przez $4$ tylko reszty $0$ albo $1$.`],
  ['Liczba $n^3 - n$ jest podzielna przez $6$ dla każdej liczby całkowitej $n$.', true, T`$n^3 - n = (n - 1)n(n + 1)$ – iloczyn trzech kolejnych liczb.`],
  ['Suma kwadratów dwóch kolejnych liczb całkowitych jest parzysta.', false, T`$n^2 + (n + 1)^2 = 2n^2 + 2n + 1$ – zawsze nieparzysta.`],
  ['Kwadrat liczby całkowitej przy dzieleniu przez $3$ daje resztę $0$ albo $1$.', true, T`$(3k)^2$, $(3k \pm 1)^2 = 3(3k^2 \pm 2k) + 1$.`],
  ['Liczba $n^2 + n$ jest parzysta dla każdej liczby całkowitej $n$.', true, T`$n^2 + n = n(n + 1)$ – iloczyn dwóch kolejnych liczb.`]
];

const divisibilityFacts = (r) => {
  const [s1, s2] = pickTwo(r, DIVISIBILITY_FACTS);
  return pf({ title: 'Podzielność i reszty', s1, s2, trap: 'Jeden kontrprzykład wystarczy, żeby obalić zdanie „zawsze”, ale żaden przykład nie dowodzi zdania ogólnego.', tip: TIP_PROOF });
};

const FACTORIAL = [1, 1, 2, 6, 24, 120];
const consecutiveProduct = (r) => {
  const k = r.int(2, 5);
  const word = r.pick(['całkowitych', 'naturalnych']);
  return mc({
    title: 'Iloczyn kolejnych liczb',
    q: T`Iloczyn dowolnych $${k}$ kolejnych liczb ${word} jest zawsze podzielny przez`,
    ok: m(FACTORIAL[k]),
    val: FACTORIAL[k],
    // dystraktor nie może dzielić k! – inaczej też byłby poprawną odpowiedzią
    bad: [k + 1, 2 * FACTORIAL[k], k * k + 1, FACTORIAL[k] + k, 4 * k].filter((x) => FACTORIAL[k] % x !== 0).map((x) => m(x)),
    steps: [
      `Wśród $${k}$ kolejnych liczb jest liczba podzielna przez ${Array.from({ length: k - 1 }, (_, i) => `$${i + 2}$`).join(', ').replace(/, ([^,]*)$/, ' i $1')}.`,
      T`Dla $n \ge 1$: $${['n', ...Array.from({ length: k - 1 }, (_, i) => `(n + ${i + 1})`)].join('')} = ${k}! \cdot \binom{n + ${k - 1}}{${k}}$, a symbol Newtona jest liczbą całkowitą, więc iloczyn dzieli się przez $${k}! = ${FACTORIAL[k]}$.`
    ],
    trap: T`„Zawsze” oznacza: dla każdego wyboru liczb. $${2 * FACTORIAL[k]}$ dzieli niektóre takie iloczyny, ale nie wszystkie.`,
    tip: TIP_PROOF
  });
};

const openRemainderProof = (r) => {
  const d = r.int(3, 9);
  const rem = r.int(1, d - 1);
  const base = residue(rem * rem, d);
  const k = (base === 0 ? d : d - base) + d * r.int(0, 2);
  const t = (rem * rem + k) / d;
  const answer = `n^2 + ${k} = ${d}(${d}q^2 + ${2 * rem}q + ${t})`;
  return open({
    title: 'Dowód podzielności przez resztę z dzielenia',
    q: T`Wykaż, że jeżeli liczba całkowita $n$ przy dzieleniu przez $${d}$ daje resztę $${rem}$, to liczba $n^2 + ${k}$ jest podzielna przez $${d}$.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie $n = ${d}q + ${rem}$, gdzie $q$ jest liczbą całkowitą.`],
      [2, 'Etap 2', T`Przekształcenie: $n^2 + ${k} = ${d * d}q^2 + ${2 * d * rem}q + ${rem * rem + k}$.`],
      [3, 'Komplet', T`Zapisanie $${answer}$ i wniosek: wyrażenie w nawiasie jest liczbą całkowitą, więc $${d}$ dzieli $n^2 + ${k}$.`]
    ],
    steps: [
      T`Z założenia $n = ${d}q + ${rem}$ dla pewnej liczby całkowitej $q$.`,
      T`$n^2 + ${k} = (${d}q + ${rem})^2 + ${k} = ${d * d}q^2 + ${2 * d * rem}q + ${rem * rem} + ${k}$.`,
      T`$= ${d}(${d}q^2 + ${2 * rem}q + ${t})$, a $${d}q^2 + ${2 * rem}q + ${t}$ jest liczbą całkowitą, więc liczba $n^2 + ${k}$ jest podzielna przez $${d}$.`
    ],
    trap: T`Sprawdzenie dla $n = ${rem}$ to przykład, a nie dowód. Trzeba pokazać podzielność dla każdego $q$.`,
    tip: TIP_PROOF,
    answer: m(answer),
    proof: true
  });
};

// ---------- 1.4 Dowody nierówności ----------
const squareForm = (r) => {
  const c = r.int(1, 7);
  const withY = r.bool();
  const v = withY ? 'y' : '';
  const lhs = withY ? `x^2 + ${c * c === 1 ? '' : c * c}y^2 \\ge ${2 * c}xy` : `x^2 + ${c * c} \\ge ${2 * c}x`;
  const sq = (s, k) => `(x ${s} ${co(k, v) || k})^2`;
  return mc({
    title: 'Nierówność sprowadzona do kwadratu',
    q: T`Nierówność $${lhs}$ jest równoważna nierówności`,
    ok: m(`${sq('-', c)} \\ge 0`),
    bad: [m(`${sq('+', c)} \\ge 0`), m(`${sq('-', c)} \\le 0`), m(`${sq('-', 2 * c)} \\ge 0`), m(`${sq('-', c * c)} \\ge 0`)],
    steps: [
      T`Przenosimy wszystko na lewą stronę: $x^2 - ${2 * c}x${v} + ${c * c === 1 && withY ? '' : c * c}${withY ? 'y^2' : ''} \ge 0$.`,
      T`To kwadrat różnicy: $${sq('-', c)} \ge 0$ – prawdziwe dla każdej liczby, bo kwadrat jest nieujemny.`
    ],
    trap: T`Znak środkowego wyrazu decyduje o tym, czy to kwadrat sumy, czy różnicy: $-${2 * c}x${v}$ daje kwadrat RÓŻNICY.`,
    tip: 'Wzór skróconego mnożenia: $(a - b)^2 = a^2 - 2ab + b^2 \\ge 0$.'
  });
};

const minimumSumReciprocal = (r) => {
  const s = r.int(1, 6);
  const a = r.pick([1, 1, 2, 4]);
  const b = s * s * a;
  const min = 2 * Math.sqrt(a * b);
  need(Number.isInteger(min));
  return num({
    title: 'Najmniejsza wartość sumy x i odwrotności',
    q: T`Oblicz najmniejszą wartość wyrażenia $${co(a, 'x')} + \frac{${b}}{x}$ dla $x > 0$. Wpisz liczbę.`,
    ans: min,
    steps: [
      T`Dla $x > 0$: $${co(a, 'x')} + \frac{${b}}{x} - ${min} = \frac{${co(a, 'x^2')} - ${min}x + ${b}}{x} = \frac{${a === 1 ? `(x - ${s})^2` : `${a}(x - ${s})^2`}}{x} \ge 0$.`,
      T`Równość zachodzi dla $x = ${s}$, więc najmniejsza wartość to $${min}$.`
    ],
    trap: 'Bez założenia $x > 0$ wyrażenie może być dowolnie małe (ujemne). Przy dowodzie zawsze zaznacz, że mianownik jest dodatni.',
    tip: 'Nierówność między średnimi (karta wzorów, str. 29): $\\frac{a + b}{2} \\ge \\sqrt{ab}$ dla $a, b \\ge 0$.'
  });
};

const INEQUALITY_FACTS = [
  [T`Dla każdej liczby rzeczywistej $x$ zachodzi $x^2 \ge x$.`, false, T`Dla $x = \frac{1}{2}$: $\frac{1}{4} < \frac{1}{2}$.`],
  [T`Dla każdej liczby $x > 0$ zachodzi $x + \frac{1}{x} \ge 2$.`, true, T`$x + \frac{1}{x} - 2 = \frac{(x - 1)^2}{x} \ge 0$.`],
  [T`Jeśli $a > b$, to $a^2 > b^2$.`, false, T`$-1 > -3$, ale $1 < 9$.`],
  [T`Dla każdej liczby rzeczywistej $a$ zachodzi $a^2 + 1 \ge 2a$.`, true, T`$a^2 - 2a + 1 = (a - 1)^2 \ge 0$.`],
  [T`Dla dodatnich $a$, $b$ zachodzi $\frac{a + b}{2} \ge \sqrt{ab}$.`, true, T`$\frac{a + b}{2} - \sqrt{ab} = \frac{(\sqrt{a} - \sqrt{b})^2}{2} \ge 0$.`],
  [T`Dla dowolnych liczb rzeczywistych $a$, $b$ zachodzi $a^2 + b^2 \ge (a + b)^2$.`, false, T`Dla $a = b = 1$: $2 < 4$.`]
];

const inequalityFacts = (r) => {
  const [s1, s2] = pickTwo(r, INEQUALITY_FACTS);
  return pf({ title: 'Prawdziwe i fałszywe nierówności', s1, s2, trap: 'Nierówności „dla każdego $x$” sprawdzaj na ułamkach i liczbach ujemnych.', tip: 'Klucz do większości dowodów nierówności: kwadrat dowolnej liczby jest nieujemny.' });
};

const minimumQuadraticExpression = (r) => {
  const k = r.intNot(-6, 6, 0);
  const c = r.intNot(-10, 20, 0);
  const minVal = c - k * k;
  need(minVal !== 0);
  return mc({
    title: 'Najmniejsza wartość z dopełnienia do kwadratu',
    q: T`Najmniejsza wartość wyrażenia $x^2 ${k > 0 ? '-' : '+'} ${Math.abs(2 * k)}x ${c < 0 ? '-' : '+'} ${Math.abs(c)}$ jest równa`,
    ok: m(minVal),
    val: minVal,
    bad: [m(c), m(c + k * k), m(-k * k), m(c - 2 * k * k), m(minVal + 1)],
    steps: [
      T`$x^2 ${k > 0 ? '-' : '+'} ${Math.abs(2 * k)}x ${c < 0 ? '-' : '+'} ${Math.abs(c)} = (x ${k > 0 ? '-' : '+'} ${Math.abs(k)})^2 ${minVal < 0 ? '-' : '+'} ${Math.abs(minVal)}$.`,
      T`Kwadrat jest najmniejszy (równy $0$) dla $x = ${k}$, więc najmniejsza wartość to $${minVal}$.`
    ],
    trap: T`Dopełniając do kwadratu, odejmij $${k * k}$ – to kwadrat POŁOWY współczynnika przy $x$.`,
    tip: 'Dopełnienie do kwadratu: $x^2 + 2px + c = (x + p)^2 + c - p^2$.'
  });
};

const openSquareInequality = (r) => {
  const b = r.int(1, 5);
  const c = r.int(0, 9);
  const strict = c > 0;
  const rel = strict ? '>' : '\\ge';
  const yTerm = b === 1 ? 'y^2' : `${b * b}y^2`;
  const by = co(b, 'y');
  const ineq = `x^2 + ${yTerm}${c ? ` + ${c}` : ''} ${rel} ${2 * b}xy`;
  return open({
    title: 'Dowód nierówności z dwiema zmiennymi',
    q: T`Wykaż, że dla dowolnych liczb rzeczywistych $x$, $y$ prawdziwa jest nierówność $${ineq}$.`,
    stages: [
      [1, 'Etap 1', T`Przeniesienie wszystkich wyrazów na jedną stronę: $x^2 - ${2 * b}xy + ${yTerm}${c ? ` + ${c}` : ''} ${rel} 0$.`],
      [2, 'Etap 2', T`Zapisanie lewej strony jako $(x - ${by})^2${c ? ` + ${c}` : ''}$.`],
      [3, 'Komplet', strict ? T`Uzasadnienie: $(x - ${by})^2 \ge 0$ i $${c} > 0$, więc suma jest dodatnia – nierówność zachodzi.` : T`Uzasadnienie: kwadrat liczby rzeczywistej jest nieujemny, więc nierówność zachodzi.`]
    ],
    steps: [
      T`Nierówność jest równoważna $x^2 - ${2 * b}xy + ${yTerm}${c ? ` + ${c}` : ''} ${rel} 0$.`,
      T`$x^2 - ${2 * b}xy + ${yTerm} = (x - ${by})^2$, więc lewa strona to $(x - ${by})^2${c ? ` + ${c}` : ''}$.`,
      strict ? T`$(x - ${by})^2 \ge 0$, a $${c} > 0$, więc $(x - ${by})^2 + ${c} > 0$ dla dowolnych $x$, $y$. To kończy dowód.` : T`$(x - ${by})^2 \ge 0$ dla dowolnych $x$, $y$. To kończy dowód.`
    ],
    trap: 'Nie dziel nierówności przez wyrażenie, którego znaku nie znasz (np. przez $y$) – zmieniłoby to kierunek dla liczb ujemnych.',
    tip: TIP_PROOF,
    answer: m(`(x - ${by})^2${c ? ` + ${c}` : ''} ${rel} 0`),
    proof: true
  });
};

// ---------- 1.5 Sześciany, aⁿ − bⁿ i dwumian Newtona ----------
const cubeExpansion = (r) => {
  const k = r.intNot(-4, 4, 0);
  const s = k > 0 ? '+' : '-';
  const a = Math.abs(k);
  const term = (c, v) => (c === 0 ? '' : ` ${c > 0 ? '+' : '-'} ${Math.abs(c) === 1 && v ? '' : Math.abs(c)}${v}`);
  const poly3 = (b2, b1, b0) => `x^3${term(b2, 'x^2')}${term(b1, 'x')}${term(b0, '')}`;
  return mc({
    title: 'Sześcian sumy i różnicy',
    q: T`Wyrażenie $(x ${s} ${a})^3$ jest równe`,
    ok: m(poly3(3 * k, 3 * k * k, k ** 3)),
    bad: [m(poly3(0, 0, k ** 3)), m(poly3(3 * k, 3 * k, k ** 3)), m(poly3(k, k * k, k ** 3)), m(poly3(3 * k, -3 * k * k, k ** 3))],
    steps: [T`$(a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3$ dla $a = x$, $b = ${k}$.`, T`$x^3 + 3 \cdot ${k < 0 ? `(${k})` : k} \cdot x^2 + 3 \cdot ${k * k} \cdot x + ${k < 0 ? `(${k ** 3})` : k ** 3} = ${poly3(3 * k, 3 * k * k, k ** 3)}$.`],
    trap: T`$(x + b)^3 \ne x^3 + b^3$ – brakuje dwóch środkowych wyrazów z trójką.`,
    tip: 'Karta wzorów, str. 7: $(a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3$.'
  });
};

const cubeFactor = (r) => {
  const c = r.int(1, 4);
  const k = r.int(1, 5);
  need(gcd(c, k) === 1);
  const plus = r.bool();
  const cx = co(c, 'x');
  const sq = `${c * c === 1 ? '' : c * c}x^2`;
  const mid = `${co(c * k, 'x')}`;
  const ok = plus ? `(${cx} + ${k})(${sq} - ${mid} + ${k * k})` : `(${cx} - ${k})(${sq} + ${mid} + ${k * k})`;
  return mc({
    title: plus ? 'Rozkład sumy sześcianów' : 'Rozkład różnicy sześcianów',
    q: T`Wyrażenie $${c ** 3 === 1 ? '' : c ** 3}x^3 ${plus ? '+' : '-'} ${k ** 3}$ jest równe`,
    ok: m(ok),
    bad: [
      m(plus ? `(${cx} + ${k})(${sq} + ${mid} + ${k * k})` : `(${cx} - ${k})(${sq} - ${mid} + ${k * k})`),
      m(plus ? `(${cx} + ${k})^3` : `(${cx} - ${k})^3`),
      m(plus ? `(${cx} - ${k})(${sq} + ${mid} + ${k * k})` : `(${cx} + ${k})(${sq} - ${mid} + ${k * k})`),
      m(plus ? `(${cx} + ${k})(${sq} + ${k * k})` : `(${cx} - ${k})(${sq} + ${k * k})`)
    ],
    steps: [
      T`$${c ** 3 === 1 ? '' : c ** 3}x^3 = (${cx})^3$, $${k ** 3} = ${k}^3$.`,
      plus ? T`$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$, więc wynik to $${ok}$.` : T`$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$, więc wynik to $${ok}$.`
    ],
    trap: 'W nawiasie kwadratowym środkowy wyraz ma znak PRZECIWNY do znaku w pierwszym nawiasie i nie ma przed nim dwójki.',
    tip: 'Karta wzorów, str. 7: $a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)$.'
  });
};

const binom = (n, k) => {
  let x = 1;
  for (let i = 1; i <= k; i++) x = (x * (n - k + i)) / i;
  return x;
};

const binomialCoefficient = (r) => {
  const n = r.int(4, 6);
  const j = r.int(1, 3);
  const k = r.pick([1, 2, 3, -1, -2]);
  const value = binom(n, j) * k ** j;
  return num({
    title: 'Współczynnik z dwumianu Newtona',
    q: T`Oblicz współczynnik przy $x^{${n - j}}$ w rozwinięciu wyrażenia $(x ${k > 0 ? '+' : '-'} ${Math.abs(k)})^{${n}}$. Wpisz liczbę.`,
    ans: value,
    steps: [
      T`Wyraz z $x^{${n - j}}$ to $\binom{${n}}{${j}} x^{${n - j}} \cdot ${k < 0 ? `(${k})` : k}^{${j}}$.`,
      T`$\binom{${n}}{${j}} = ${binom(n, j)}$, $${k < 0 ? `(${k})` : k}^{${j}} = ${k ** j}$, więc współczynnik to $${value}$.`
    ],
    trap: T`Przy $(x - b)^n$ potęgi $(-b)$ zmieniają znak: nieparzysta potęga liczby ujemnej jest ujemna.`,
    tip: 'Karta wzorów, str. 7: $(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k$.'
  });
};

const POWER_FACTS = [
  [T`$a^3 + b^3 = (a + b)^3$`, false, T`$(a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3$.`],
  [T`$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$`, true, 'Wzór z karty, str. 7.'],
  [T`$(a - b)^3 = a^3 - 3a^2 b + 3ab^2 - b^3$`, true, 'Wzór z karty, str. 7 (znaki na przemian).'],
  [T`$a^4 - b^4 = (a - b)(a^3 + a^2 b + ab^2 + b^3)$`, true, T`Wzór na $a^n - b^n$ dla $n = 4$.`],
  [T`$a^3 + b^3 = (a + b)(a^2 + ab + b^2)$`, false, T`Poprawnie: $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$.`],
  [T`$(a + b)^4 = a^4 + 4a^3 b + 6a^2 b^2 + 4ab^3 + b^4$`, true, T`Współczynniki z trójkąta Pascala: $1, 4, 6, 4, 1$.`]
];

const powerFacts = (r) => {
  const [s1, s2] = pickTwo(r, POWER_FACTS);
  const intro = 'Dla dowolnych liczb rzeczywistych $a$, $b$ zachodzi równość ';
  return pf({
    title: 'Wzory skróconego mnożenia wyższych stopni',
    s1: [intro + s1[0] + '.', s1[1], s1[2]],
    s2: [intro + s2[0] + '.', s2[1], s2[2]],
    trap: 'Sprawdź wzór na $a = 1$, $b = 1$ – zły wzór zwykle od razu daje fałsz.',
    tip: 'Karta wzorów, str. 7.'
  });
};

const openCubicInequality = (r) => {
  const k = r.int(1, 6);
  const kb = co(k, 'b');
  const k3 = k ** 3 === 1 ? 'b^3' : `${k ** 3}b^3`;
  const lhs = `a^3 + ${k3}`;
  const rhs = `${co(k, 'a^2 b')} + ${co(k * k, 'ab^2')}`;
  return open({
    title: 'Dowód nierówności z sześcianami',
    q: T`Wykaż, że dla dowolnych liczb dodatnich $a$, $b$ prawdziwa jest nierówność $${lhs} \ge ${rhs}$.`,
    stages: [
      [1, 'Etap 1', T`Przeniesienie na jedną stronę i pogrupowanie: $a^2(a - ${kb}) - ${co(k * k, 'b^2')}(a - ${kb}) \ge 0$.`],
      [2, 'Etap 2', T`Zapisanie lewej strony jako $(a - ${kb})^2(a + ${kb})$.`],
      [3, 'Komplet', T`Uzasadnienie: $(a - ${kb})^2 \ge 0$ oraz $a + ${kb} > 0$, więc iloczyn jest nieujemny.`]
    ],
    steps: [
      T`Nierówność jest równoważna $a^3 - ${co(k, 'a^2 b')} - ${co(k * k, 'ab^2')} + ${k3} \ge 0$.`,
      T`$a^2(a - ${kb}) - ${co(k * k, 'b^2')}(a - ${kb}) = (a - ${kb})(a^2 - ${co(k * k, 'b^2')}) = (a - ${kb})^2(a + ${kb})$.`,
      T`$(a - ${kb})^2 \ge 0$, a $a + ${kb} > 0$ dla dodatnich $a$, $b$, więc $(a - ${kb})^2(a + ${kb}) \ge 0$. To kończy dowód.`
    ],
    trap: T`Grupuj tak, żeby w obu grupach pojawił się ten sam czynnik $(a - ${kb})$. Drugi nawias rozkłada się jeszcze ze wzoru na różnicę kwadratów.`,
    tip: 'Karta wzorów, str. 7: $a^2 - b^2 = (a - b)(a + b)$; dodatniość $a + b$ wynika z założenia.',
    answer: m(`(a - ${kb})^2(a + ${kb}) \\ge 0`),
    proof: true
  });
};

export default {
  numericId: 1,
  title: 'Logarytmy i dowody algebraiczne',
  short_title: 'Logarytmy i dowody',
  description: 'Zamiana podstawy logarytmu, wyrażenia logarytmiczne oraz dowody podzielności i nierówności algebraicznych.',
  icon: 'Hash',
  color: '#FFB800',
  matura_points_range: '3–5 pkt',
  importance: 'HIGH',
  cke_formula_page: 'str. 5–7',
  cke_stats: 'W 10 z 11 arkuszy CKE 2022–2026, średnio 3,7 pkt na arkusz.',
  lessons: [
    {
      title: 'Zamiana podstawy logarytmu',
      short_title: 'Zamiana podstawy',
      requirements: ['I.R1'],
      prereq: ['math-lesson-1-3'],
      pill: pill({
        essence: T`Logarytm o „niewygodnej” podstawie zamieniasz na iloraz logarytmów o podstawie, którą lubisz: $\log_a b = \frac{\log_c b}{\log_c a}$. Najczęściej wybierasz liczbę pierwszą, której potęgami są wszystkie liczby w zadaniu. Wtedy logarytmy zamieniają się w zwykłe ułamki.`,
        context: 'Zamiana podstawy logarytmu to jedyne wymaganie z logarytmów tylko dla rozszerzenia. Na arkuszach CKE 2023–2026 była w 8 z 11 arkuszy, zwykle jako część zadania za 2–3 pkt.',
        pl: T`$\log_8 4$ pyta: do jakiej potęgi podnieść $8$, żeby dostać $4$? Oba to potęgi dwójki: $8 = 2^3$, $4 = 2^2$. Zamiana podstawy na $2$ daje $\frac{2}{3}$ – i rzeczywiście $8^{\frac{2}{3}} = 4$.`,
        steps: [
          ['Znajdź wspólną podstawę', T`Liczba pierwsza, której potęgami są liczby w zadaniu.`, 'Np. 2 dla 4, 8, 16.'],
          ['Zamień podstawę', T`$\log_a b = \frac{\log_c b}{\log_c a}$.`, 'Liczba na górze, podstawa na dole.'],
          ['Uprość', T`$\log_{p^n} p^k = \frac{k}{n}$.`, 'Potęgi stają się ułamkiem.']
        ],
        formulas: [
          ['Zamiana podstawy', T`\log_a b = \frac{\log_c b}{\log_c a}`, 6],
          ['Odwrotność', T`\log_a b = \frac{1}{\log_b a}`, 6],
          ['Potęgi w podstawie i liczbie', T`\log_{a^n} b^k = \frac{k}{n}\log_a b`]
        ],
        examples: [
          ['Iloczyn logarytmów', '2 pkt', T`Oblicz $\log_9 8 \cdot \log_2 3$.`, T`1. $\log_9 8 = \frac{3\log_3 2}{2}$.` + '\n' + T`2. $\log_2 3 = \frac{1}{\log_3 2}$.` + '\n' + T`3. Iloczyn: $\frac{3}{2}$.`, 'Logarytmy o zamienionych podstawach się skracają.'],
          ['Wyrażenie przez k', '1 pkt', T`Wiadomo, że $\log_2 3 = k$. Wyraź $\log_8 9$ przez $k$.`, T`1. $\log_8 9 = \frac{\log_2 9}{\log_2 8}$.` + '\n' + T`2. $= \frac{2\log_2 3}{3} = \frac{2k}{3}$.`, 'Wykładnik podstawy dzieli, wykładnik liczby mnoży.']
        ],
        trap: T`$\frac{\log_c b}{\log_c a}$ to NIE $\log_c \frac{b}{a}$. Iloraz logarytmów nie jest logarytmem ilorazu.`,
        fail: T`„$\frac{\log 8}{\log 2} = \log 4$.”`,
        win: T`$\frac{\log 8}{\log 2} = \log_2 8 = 3$.`,
        why: 'Wzór na logarytm ilorazu dotyczy RÓŻNICY logarytmów, a nie ich ilorazu.',
        ckeTip: 'Zapisuj jawnie, na jaką podstawę zamieniasz logarytm – za to przejście w kluczu CKE jest pierwszy punkt.',
        points: ['Wybierz podstawę, której potęgami są liczby z zadania.', 'Liczba na górze, podstawa na dole.', T`$\log_a b \cdot \log_b a = 1$.`]
      }),
      gens: [changeBaseValue, logProductTwo, changeBaseTruth, expressInK, openLogProductThree]
    },
    {
      title: 'Wyrażenia logarytmiczne i dziedzina',
      short_title: 'Wyrażenia logarytmiczne',
      requirements: ['I.R1', 'I.9'],
      prereq: ['math-lesson-1-3'],
      pill: pill({
        essence: T`Wyrażenia z logarytmami upraszczasz trzema wzorami: logarytm iloczynu, ilorazu i potęgi. Do tego dochodzi definicja: $a^{\log_a b} = b$. Zanim cokolwiek policzysz, sprawdź dziedzinę: podstawa dodatnia i różna od $1$, liczba logarytmowana dodatnia.`,
        context: 'Na rozszerzeniu logarytmy pojawiają się w zadaniach za 2–3 pkt (np. matura maj 2023: wykazanie, że wyrażenie z logarytmami ma daną postać) i w modelach wykładniczych.',
        pl: T`Logarytm to „wykładnik w przebraniu”. Dodawanie logarytmów o tej samej podstawie to mnożenie liczb pod logarytmem – tak jak $2^3 \cdot 2^4 = 2^7$, bo wykładniki się dodają.`,
        steps: [
          ['Dziedzina', T`$a > 0$, $a \ne 1$, $b > 0$ dla $\log_a b$.`, 'Najpierw warunki, potem rachunki.'],
          ['Wzory działań', T`Iloczyn, iloraz, potęga – przy tej samej podstawie.`, 'Karta wzorów, str. 5.'],
          ['Definicja', T`$a^{\log_a b} = b$.`, 'Przydaje się przy potęgach.']
        ],
        formulas: [
          ['Logarytm iloczynu i ilorazu', T`\log_a (xy) = \log_a x + \log_a y, \quad \log_a \frac{x}{y} = \log_a x - \log_a y`, 5],
          ['Logarytm potęgi', T`\log_a x^k = k\log_a x`, 5],
          ['Definicja', T`a^{\log_a b} = b`]
        ],
        examples: [
          ['Suma logarytmów', '1 pkt', T`Oblicz $2\log_6 2 + 2\log_6 3$.`, T`1. $2(\log_6 2 + \log_6 3) = 2\log_6 6$.` + '\n' + T`2. $= 2$.`, 'Najpierw wyłącz wspólny współczynnik.'],
          ['Potęga z logarytmem', '1 pkt', T`Oblicz $9^{\log_3 5}$.`, T`1. $9^{\log_3 5} = 3^{2\log_3 5}$.` + '\n' + T`2. $= 3^{\log_3 25} = 25$.`, 'Potęga przy podstawie przechodzi do wykładnika.']
        ],
        trap: T`$\log_a (x + y) \ne \log_a x + \log_a y$. Logarytm sumy nie ma własnego wzoru.`,
        fail: T`„$\log_2 (4 + 4) = \log_2 4 + \log_2 4 = 4$.”`,
        win: T`$\log_2 8 = 3$.`,
        why: 'Wzór dotyczy iloczynu: $\\log_2 (4 \\cdot 4) = 4$.',
        ckeTip: 'Gdy zadanie każe „wykazać” wartość wyrażenia, każde przejście uzasadnij wzorem – egzaminator sprawdza tok rozumowania, nie tylko wynik.',
        points: ['Dziedzina logarytmu: trzy warunki.', 'Wzory działają przy tej samej podstawie.', T`$a^{\log_a b} = b$.`]
      }),
      gens: [logSum, logDomain, logFacts, powerOfLog, openLogExpression]
    },
    {
      title: 'Dowody podzielności i reszt',
      short_title: 'Dowody podzielności',
      requirements: ['I.2'],
      prereq: ['math-lesson-2-5'],
      pill: pill({
        essence: T`Dowód podzielności zaczynasz od zapisania liczby przez dzielenie z resztą: $n = dq + r$. Potem przekształcasz wyrażenie tak, żeby zostało $d \cdot (\text{liczba całkowita})$. Dowód kończysz zdaniem, z którego wynika teza – sam przykład liczbowy nic nie dowodzi.`,
        context: 'Dowody liczbowe i algebraiczne to 8 z 31 dowodów na arkuszach CKE 2022–2026 (zwykle za 3 pkt). Wymaganie ogólne IV (rozumowanie) pojawia się w ponad połowie zadań PR.',
        pl: T`„Liczba daje resztę $2$ przy dzieleniu przez $5$” to po prostu $n = 5q + 2$, np. $7$, $12$, $17$. Zamiast sprawdzać nieskończenie wiele liczb, liczysz raz na literze $q$ – i masz wszystkie przypadki naraz.`,
        steps: [
          ['Zapisz założenie', T`$n = dq + r$, $q$ – liczba całkowita.`, 'Bez tego nie ma dowodu.'],
          ['Przekształć wyrażenie', T`Wyłącz $d$ przed nawias.`, 'Zostaje reszta z samego r.'],
          ['Wniosek', T`$d \cdot (\ldots)$, gdzie nawias jest liczbą całkowitą.`, 'Napisz to zdaniem.']
        ],
        formulas: [
          ['Dzielenie z resztą', T`n = dq + r, \quad 0 \le r < d`],
          ['Kwadrat sumy', T`(dq + r)^2 = d^2 q^2 + 2dqr + r^2`, 7],
          ['Kolejne liczby', T`(n - 1)n(n + 1) \text{ – podzielne przez } 6`]
        ],
        examples: [
          ['Reszta kwadratu', '2 pkt', T`Wykaż, że jeśli $n$ daje resztę $2$ przy dzieleniu przez $3$, to $n^2 + 2$ jest podzielne przez $3$.`, T`1. $n = 3q + 2$.` + '\n' + T`2. $n^2 + 2 = 9q^2 + 12q + 6$.` + '\n' + T`3. $= 3(3q^2 + 4q + 2)$ – podzielne przez $3$.`, 'Nawias jest liczbą całkowitą – to musi paść w dowodzie.'],
          ['Trzy kolejne liczby', '2 pkt', T`Wykaż, że $n^3 - n$ jest podzielne przez $6$.`, T`1. $n^3 - n = (n - 1)n(n + 1)$.` + '\n' + T`2. Wśród trzech kolejnych liczb jest parzysta i podzielna przez $3$, więc iloczyn dzieli się przez $6$.`, 'Rozkład na czynniki odsłania kolejne liczby.']
        ],
        trap: T`Sprawdzenie dla kilku liczb (np. $n = 2$, $n = 5$) to NIE jest dowód. Za sam przykład CKE daje 0 pkt.`,
        fail: T`„Dla $n = 2$: $2^2 + 2 = 6$, dzieli się przez $3$. Teza prawdziwa.”`,
        win: T`$n = 3q + 2$, więc $n^2 + 2 = 3(3q^2 + 4q + 2)$ dla każdego całkowitego $q$.`,
        why: 'Teza dotyczy wszystkich liczb – przykład pokazuje tylko jedną z nich.',
        ckeTip: 'Zakończ dowód zdaniem „liczba w nawiasie jest całkowita, więc…”. Bez niego egzaminator może uznać rozumowanie za niepełne.',
        points: [T`Założenie zapisz jako $n = dq + r$.`, 'Wyłącz dzielnik przed nawias.', 'Przykład to nie dowód.']
      }),
      gens: [remainderOfExpression, smallestShift, divisibilityFacts, consecutiveProduct, openRemainderProof]
    },
    {
      title: 'Dowody nierówności: kwadrat różnicy',
      short_title: 'Dowody nierówności',
      requirements: ['II.R5', 'II.1'],
      prereq: ['math-lesson-2-1'],
      pill: pill({
        essence: T`Większość dowodów nierówności na maturze kończy się zdaniem „kwadrat liczby rzeczywistej jest nieujemny”. Przenosisz wszystko na jedną stronę, rozpoznajesz wzór skróconego mnożenia i zapisujesz wyrażenie jako kwadrat (plus coś dodatniego). Każde przejście musi być równoważne.`,
        context: 'Dowody algebraiczne to 7 zadań na arkuszach CKE 2022–2026 (np. maj 2025, zadanie 2 za 3 pkt). Na rozszerzeniu wymagają często wzorów stopnia trzeciego.',
        pl: T`Chcesz pokazać, że $x^2 + 9 \ge 6x$. Przenosisz $6x$ na lewo i widzisz $(x - 3)^2 \ge 0$. A kwadrat nigdy nie jest ujemny – koniec. Cała sztuka to zobaczyć kwadrat w bałaganie wyrazów.`,
        steps: [
          ['Wszystko na jedną stronę', T`$L - P \ge 0$.`, 'Nie dziel przez nieznany znak.'],
          ['Szukaj kwadratu', T`$a^2 - 2ab + b^2 = (a - b)^2$.`, 'Sprawdź środkowy wyraz.'],
          ['Uzasadnij znak', T`Kwadrat $\ge 0$, liczba dodatnia $> 0$.`, 'Zdanie kończące dowód.']
        ],
        formulas: [
          ['Kwadrat różnicy', T`(a - b)^2 = a^2 - 2ab + b^2 \ge 0`, 7],
          ['Średnie', T`\frac{a + b}{2} \ge \sqrt{ab}, \quad a, b \ge 0`, 29],
          ['Dopełnienie do kwadratu', T`x^2 + 2px + c = (x + p)^2 + c - p^2`]
        ],
        examples: [
          ['Dwie zmienne', '2 pkt', T`Wykaż, że $x^2 + 4y^2 \ge 4xy$ dla dowolnych $x$, $y$.`, T`1. $x^2 - 4xy + 4y^2 \ge 0$.` + '\n' + T`2. $(x - 2y)^2 \ge 0$ – prawda.`, 'Kwadrat jest nieujemny dla każdej liczby.'],
          ['Suma i odwrotność', '2 pkt', T`Wykaż, że $x + \frac{4}{x} \ge 4$ dla $x > 0$.`, T`1. Mnożymy przez $x > 0$: $x^2 - 4x + 4 \ge 0$.` + '\n' + T`2. $(x - 2)^2 \ge 0$ – prawda.`, 'Mnożyć wolno, bo $x > 0$ – trzeba to napisać.']
        ],
        trap: T`Dowód „od tezy do prawdy” musi iść przez przejścia RÓWNOWAŻNE. Mnożenie przez wyrażenie o nieznanym znaku psuje równoważność.`,
        fail: T`„$x + \frac{4}{x} \ge 4$, mnożę przez $x$: $x^2 + 4 \ge 4x$” – bez założenia $x > 0$.`,
        win: T`„Ponieważ $x > 0$, mnożę obie strony przez $x$ bez zmiany znaku nierówności.”`,
        why: 'Dla $x < 0$ mnożenie odwraca nierówność.',
        ckeTip: 'Na końcu dowodu napisz, DLACZEGO otrzymana nierówność jest prawdziwa. Sam zapis $(x - 2)^2 \\ge 0$ bez komentarza bywa za mało na komplet punktów.',
        points: ['Przenieś wszystko na jedną stronę.', 'Rozpoznaj kwadrat różnicy.', 'Uzasadnij znak słowami.']
      }),
      gens: [squareForm, minimumSumReciprocal, inequalityFacts, minimumQuadraticExpression, openSquareInequality]
    },
    {
      title: 'Sześciany, aⁿ − bⁿ i dwumian Newtona',
      short_title: 'Wzory stopnia 3 i wyżej',
      requirements: ['II.R5', 'II.R4'],
      prereq: ['math-lesson-2-1'],
      pill: pill({
        essence: T`Na rozszerzeniu dochodzą wzory skróconego mnożenia stopnia trzeciego: sześcian sumy i różnicy oraz suma i różnica sześcianów. Uogólnia je dwumian Newtona: $(a + b)^n$ rozwijasz ze współczynnikami $\binom{n}{k}$. Wszystkie są na karcie wzorów (str. 7), ale trzeba je umieć zastosować w dowodzie.`,
        context: 'Wzory stopnia 3 pojawiają się w dowodach nierówności (maj 2025, zad. 2: sześcian sumy) i przy rozkładzie wielomianów. 4 zadania na arkuszach 2022–2026, łącznie 12 pkt.',
        pl: T`$(x + 1)^3$ to nie $x^3 + 1$. To pudełko $(x + 1) \times (x + 1) \times (x + 1)$: oprócz sześcianu $x^3$ i małego sześcianu $1$ są trzy „płyty” $x^2$ i trzy „belki” $x$ – stąd $x^3 + 3x^2 + 3x + 1$.`,
        steps: [
          ['Rozpoznaj wzór', T`Sześcian sumy czy suma sześcianów?`, 'Nawias do potęgi vs. dwie potęgi.'],
          ['Podstaw', T`Za $a$ i $b$ – całe wyrażenia z nawiasem.`, 'Np. (2x)³ = 8x³.'],
          ['Sprawdź liczbą', T`Podstaw $x = 1$ i porównaj obie strony.`, 'Szybka kontrola błędów.']
        ],
        formulas: [
          ['Sześcian sumy', T`(a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3`, 7],
          ['Suma i różnica sześcianów', T`a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2)`, 7],
          ['Dwumian Newtona', T`(a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^{n-k} b^k`, 7]
        ],
        examples: [
          ['Rozkład', '1 pkt', T`Rozłóż $8x^3 - 27$.`, T`1. $8x^3 - 27 = (2x)^3 - 3^3$.` + '\n' + T`2. $= (2x - 3)(4x^2 + 6x + 9)$.`, 'Drugi nawias nie ma pierwiastków – rozkład skończony.'],
          ['Współczynnik', '1 pkt', T`Oblicz współczynnik przy $x^3$ w $(x + 2)^5$.`, T`1. Wyraz: $\binom{5}{2} x^3 \cdot 2^2$.` + '\n' + T`2. $10 \cdot 4 = 40$.`, 'Wykładnik przy b to n minus wykładnik przy x.']
        ],
        trap: T`$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$ – w drugim nawiasie jest MINUS i nie ma dwójki przy $ab$.`,
        fail: T`„$x^3 + 8 = (x + 2)(x^2 + 2x + 4)$.”`,
        win: T`$x^3 + 8 = (x + 2)(x^2 - 2x + 4)$.`,
        why: 'Wymnożenie wersji z plusem daje $x^3 + 4x^2 + 8x + 8$.',
        ckeTip: 'W dowodach nierówności z sześcianami szukaj czynnika $(a - b)^2$ – to on daje nieujemność.',
        points: ['Sześcian sumy ≠ suma sześcianów.', 'Znaki w drugim nawiasie: przeciwny, plus.', T`Współczynniki $(a + b)^n$ to $\binom{n}{k}$.`]
      }),
      gens: [cubeExpansion, cubeFactor, binomialCoefficient, powerFacts, openCubicInequality]
    }
  ]
};
