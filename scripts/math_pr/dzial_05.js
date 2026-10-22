import { T, mc, num, pf, open, pill, fr, dec, quad, poly, lin, sg, xm, par, m, iv, need } from '../math_pp/lib.js';
import { quadIneq, gt, lt, intersect, intersectAll, fmt, twoRoots, verifySet, contains } from './sets.js';
import { pickTwo } from './common.js';

const TIP_VIETE = 'Karta wzorów, str. 8: $x_1 + x_2 = -\\frac{b}{a}$ oraz $x_1 \\cdot x_2 = \\frac{c}{a}$. Wzory mają sens tylko wtedy, gdy rozwiązania istnieją.';
const TIP_PARAM = 'Zadanie z parametrem rozwiązuj etapami: każdy warunek osobno, na końcu część wspólna. Za każdy poprawny etap CKE daje punkt.';
const TIP_DELTA = 'Dwa różne rozwiązania to $\\Delta > 0$, dokładnie jedno to $\\Delta = 0$, brak rozwiązań to $\\Delta < 0$ (karta wzorów, str. 8).';

// ---------- 5.1 Wzory Viète'a i wyrażenia symetryczne ----------
const niceCoefs = (r) => {
  const a = r.pick([1, 1, 2, 3, -1, -2, 4]);
  const b = r.intNot(-9, 9, 0);
  const c = r.intNot(-9, 9, 0);
  need(b * b - 4 * a * c > 0);
  return [a, b, c];
};
const deltaLine = (a, b, c) => T`$\Delta = ${par(b)}^2 - 4 \cdot ${par(a)} \cdot ${par(c)} = ${b * b - 4 * a * c} > 0$`;

const vietaSumProduct = (r) => {
  const [a, b, c] = niceCoefs(r);
  const askSum = r.bool();
  return mc({
    title: askSum ? 'Suma rozwiązań ze wzoru Viète’a' : 'Iloczyn rozwiązań ze wzoru Viète’a',
    q: T`Równanie $${quad(a, b, c)} = 0$ ma dwa różne rozwiązania $x_1$ i $x_2$. ${askSum ? 'Suma $x_1 + x_2$ jest równa' : 'Iloczyn $x_1 \\cdot x_2$ jest równy'}`,
    ok: m(askSum ? fr(-b, a) : fr(c, a)),
    val: askSum ? -b / a : c / a,
    bad: askSum
      ? [m(fr(b, a)), m(fr(c, a)), m(fr(-b, 1)), m(fr(-c, a)), m(fr(b, 1))]
      : [m(fr(-c, a)), m(fr(-b, a)), m(fr(c, 1)), m(fr(a, c)), m(fr(b, a))],
    steps: [
      `${deltaLine(a, b, c)}, więc rozwiązania istnieją i wolno użyć wzorów Viète’a.`,
      askSum
        ? T`$x_1 + x_2 = -\frac{b}{a}$, gdzie $a = ${a}$ i $b = ${b}$, więc $x_1 + x_2 = ${fr(-b, a)}$.`
        : T`$x_1 \cdot x_2 = \frac{c}{a}$, gdzie $a = ${a}$ i $c = ${c}$, więc $x_1 \cdot x_2 = ${fr(c, a)}$.`
    ],
    trap: askSum ? T`W sumie rozwiązań jest minus: $-\frac{b}{a}$. Bez niego dostajesz liczbę przeciwną.` : T`Iloczyn to $\frac{c}{a}$ – bez minusa i z dzieleniem przez $a$, a nie przez $b$.`,
    tip: TIP_VIETE
  });
};

const SYMMETRIC = {
  sq: { expr: 'x_1^2 + x_2^2', form: '(x_1 + x_2)^2 - 2x_1 x_2', val: (S, P) => S * S - 2 * P, calc: (S, P) => `${par(S)}^2 - 2 \\cdot ${par(P)}` },
  diff: { expr: '(x_1 - x_2)^2', form: '(x_1 + x_2)^2 - 4x_1 x_2', val: (S, P) => S * S - 4 * P, calc: (S, P) => `${par(S)}^2 - 4 \\cdot ${par(P)}` },
  cube: { expr: 'x_1^3 + x_2^3', form: '(x_1 + x_2)^3 - 3x_1 x_2(x_1 + x_2)', val: (S, P) => S ** 3 - 3 * P * S, calc: (S, P) => `${par(S)}^3 - 3 \\cdot ${par(P)} \\cdot ${par(S)}` },
  inv: { expr: '\\frac{1}{x_1} + \\frac{1}{x_2}', form: '\\frac{x_1 + x_2}{x_1 x_2}', val: (S, P) => S / P, calc: (S, P) => `\\frac{${S}}{${P}}` }
};

const symmetricValue = (r) => {
  const b = r.intNot(-8, 8, 0);
  const c = r.intNot(-8, 8, 0);
  need(b * b - 4 * c > 0);
  const S = -b;
  const P = c;
  const kind = SYMMETRIC[r.pick(Object.keys(SYMMETRIC))];
  const value = kind.val(S, P);
  const [x1, x2] = twoRoots(1, b, c);
  const check = { [SYMMETRIC.sq.expr]: x1 ** 2 + x2 ** 2, [SYMMETRIC.diff.expr]: (x1 - x2) ** 2, [SYMMETRIC.cube.expr]: x1 ** 3 + x2 ** 3, [SYMMETRIC.inv.expr]: 1 / x1 + 1 / x2 }[kind.expr];
  if (Math.abs(check - value) > 1e-6) throw new Error(`5.1: kontrola wyrażenia ${kind.expr}`);
  return num({
    title: 'Wyrażenie symetryczne bez liczenia rozwiązań',
    q: T`Liczby $x_1$ i $x_2$ są różnymi rozwiązaniami równania $${quad(1, b, c)} = 0$. Oblicz wartość wyrażenia $${kind.expr}$. Wpisz liczbę.`,
    ans: value,
    steps: [
      T`$\Delta = ${b * b - 4 * c} > 0$, a ze wzorów Viète’a: $x_1 + x_2 = ${S}$, $x_1 x_2 = ${P}$.`,
      T`$${kind.expr} = ${kind.form}$.`,
      T`$= ${kind.calc(S, P)} = ${dec(value, 2)}$.`
    ],
    trap: T`Nie licz $x_1$ i $x_2$ z pierwiastkami – przekształć wyrażenie tak, żeby zostały w nim tylko $x_1 + x_2$ i $x_1 x_2$.`,
    tip: TIP_VIETE
  });
};

const vietaTruth = (r) => {
  const b1 = r.intNot(-8, 8, 0);
  const c1 = r.intNot(-6, 12, 0);
  const D1 = b1 * b1 - 4 * c1;
  need(D1 !== 0);
  const a2 = r.pick([2, 3, 4, -2]);
  const b2 = r.intNot(-9, 9, 0);
  const c2 = r.intNot(-9, 9, 0);
  need(b2 * b2 - 4 * a2 * c2 > 0);
  const honest = r.bool();
  return pf({
    title: 'Kiedy wolno użyć wzorów Viète’a',
    s1: [
      T`Suma rozwiązań równania $${quad(1, b1, c1)} = 0$ jest równa $${-b1}$.`,
      D1 > 0,
      D1 > 0 ? T`$\Delta = ${D1} > 0$, więc rozwiązania istnieją i $x_1 + x_2 = ${-b1}$.` : T`$\Delta = ${D1} < 0$ – równanie nie ma rozwiązań, więc nie ma też ich sumy.`
    ],
    s2: [
      T`Iloczyn rozwiązań równania $${quad(a2, b2, c2)} = 0$ jest równy $${honest ? fr(c2, a2) : c2}$.`,
      honest,
      honest ? T`$\Delta > 0$ i $x_1 x_2 = \frac{c}{a} = ${fr(c2, a2)}$.` : T`$x_1 x_2 = \frac{c}{a} = ${fr(c2, a2)}$, a nie $${c2}$ – trzeba podzielić przez $a = ${a2}$.`
    ],
    trap: 'Zanim użyjesz wzorów Viète’a, sprawdź $\\Delta$. Przy $\\Delta < 0$ wzór „policzy” sumę rozwiązań, których nie ma.',
    tip: TIP_VIETE
  });
};

const buildEquation = (r) => {
  const p = r.intNot(-7, 7, 0);
  const q = r.intNot(-7, 7, 0, p);
  const S = p + q;
  const P = p * q;
  need(S !== 0);
  return mc({
    title: 'Równanie o danej sumie i iloczynie rozwiązań',
    q: T`Liczby $x_1$ i $x_2$ spełniają warunki $x_1 + x_2 = ${S}$ oraz $x_1 \cdot x_2 = ${P}$. Liczby te są rozwiązaniami równania`,
    ok: m(`${quad(1, -S, P)} = 0`),
    bad: [m(`${quad(1, S, P)} = 0`), m(`${quad(1, -S, -P)} = 0`), m(`${quad(1, S, -P)} = 0`), m(`${quad(1, -P, S)} = 0`)],
    steps: [
      T`Dla $a = 1$ wzory Viète’a dają $b = -(x_1 + x_2) = ${-S}$ oraz $c = x_1 x_2 = ${P}$.`,
      T`Szukane równanie: $${quad(1, -S, P)} = 0$. Sprawdzenie: jego rozwiązania to $${Math.min(p, q)}$ i $${Math.max(p, q)}$.`
    ],
    trap: T`Współczynnik $b$ to suma rozwiązań ze ZMIENIONYM znakiem: $b = -(x_1 + x_2)$.`,
    tip: TIP_VIETE
  });
};

const openReciprocalSquares = (r) => {
  const b = r.intNot(-7, 7, 0);
  const c = r.intNot(-6, 6, 0);
  const D = b * b - 4 * c;
  need(D > 0);
  const S = -b;
  const P = c;
  const numer = S * S - 2 * P;
  const ans = fr(numer, P * P);
  const [x1, x2] = twoRoots(1, b, c);
  if (Math.abs(1 / x1 ** 2 + 1 / x2 ** 2 - numer / (P * P)) > 1e-9) throw new Error('5.1: kontrola zadania otwartego');
  return open({
    title: 'Wyrażenie z rozwiązaniami bez ich obliczania',
    q: T`Równanie $${quad(1, b, c)} = 0$ ma dwa różne rozwiązania $x_1$, $x_2$. Nie obliczając tych rozwiązań, oblicz wartość wyrażenia $\frac{1}{x_1^2} + \frac{1}{x_2^2}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie wzorów Viète’a: $x_1 + x_2 = ${S}$, $x_1 x_2 = ${P}$ (przy $\Delta = ${D} > 0$).`],
      [2, 'Etap 2', T`Przekształcenie wyrażenia do postaci $\frac{(x_1 + x_2)^2 - 2x_1 x_2}{(x_1 x_2)^2}$.`],
      [3, 'Komplet', T`Obliczenie wartości wyrażenia: $${ans}$.`]
    ],
    steps: [
      T`$\Delta = ${par(b)}^2 - 4 \cdot ${par(c)} = ${D} > 0$, więc $x_1 + x_2 = ${S}$ i $x_1 x_2 = ${P}$.`,
      T`$\frac{1}{x_1^2} + \frac{1}{x_2^2} = \frac{x_1^2 + x_2^2}{x_1^2 x_2^2} = \frac{(x_1 + x_2)^2 - 2x_1 x_2}{(x_1 x_2)^2}$.`,
      T`$\frac{${par(S)}^2 - 2 \cdot ${par(P)}}{${par(P)}^2} = \frac{${numer}}{${P * P}}${ans === `\\frac{${numer}}{${P * P}}` ? '' : ` = ${ans}`}$.`
    ],
    trap: T`$\frac{1}{x_1^2} + \frac{1}{x_2^2}$ to NIE jest $\frac{1}{x_1^2 + x_2^2}$ – sprowadź ułamki do wspólnego mianownika.`,
    tip: TIP_VIETE,
    answer: m(ans)
  });
};

// ---------- rodzina równań x² + (m + a)x + m + b = 0, gdzie b = s² + a − 1 ----------
// Δ(m) = (m + a)² − 4(m + b) ma wtedy całkowite pierwiastki c ± 2s, gdzie c = 2 − a.
const family = (r, tMax = 0) => {
  const a = r.intNot(-5, 5, 0, 2);
  const s = r.int(1, 2);
  const b = s * s + a - 1;
  need(b !== 0);
  const c = 2 - a;
  const t = tMax ? r.int(2 * s + 1, 2 * s + tMax) : 0;
  return { a, b, s, c, t, K: t * t - 4 * s * s };
};
const famEq = ({ a, b }) => T`x^2 + (${lin(1, a, 'm')})x + ${lin(1, b, 'm')} = 0`;
const famDeltaRaw = ({ a, b }) => T`(${lin(1, a, 'm')})^2 - 4(${lin(1, b, 'm')})`;
const famDelta = ({ a, b }) => poly([[1, 'm^2'], [2 * a - 4, 'm'], [a * a - 4 * b, '']]);
const famDeltaAt = ({ a, b }, mm) => (mm + a) ** 2 - 4 * (mm + b);

// ---------- 5.2 Liczba rozwiązań w zależności od parametru ----------
const linearParam = (r) => {
  const k = r.int(2, 7);
  const kind = r.pick(['none', 'inf', 'one']);
  const ask = { none: 'nie ma rozwiązań', inf: 'ma nieskończenie wiele rozwiązań', one: 'ma dokładnie jedno rozwiązanie' }[kind];
  const ok = { none: `m = ${-k}`, inf: `m = ${k}`, one: `m \\in \\mathbb{R} \\setminus \\{${-k}, ${k}\\}` }[kind];
  const bad =
    kind === 'one'
      ? [`m \\in \\mathbb{R} \\setminus \\{${k}\\}`, `m \\in \\mathbb{R} \\setminus \\{${-k}\\}`, `m = ${k}`, `m = ${-k}`]
      : [`m = ${kind === 'none' ? k : -k}`, `m \\in \\{${-k}, ${k}\\}`, 'm = 0', `m = ${k * k}`];
  return mc({
    title: 'Równanie liniowe z parametrem',
    q: T`Równanie $(m^2 - ${k * k})x = m - ${k}$ z niewiadomą $x$ ${ask} wtedy i tylko wtedy, gdy`,
    ok: m(ok),
    bad: bad.map(m),
    steps: [
      T`Współczynnik przy $x$: $m^2 - ${k * k} = (m - ${k})(m + ${k})$ – jest zerem dla $m = ${k}$ i $m = ${-k}$.`,
      T`Dla $m = ${k}$: $0 \cdot x = 0$ – nieskończenie wiele rozwiązań. Dla $m = ${-k}$: $0 \cdot x = ${-2 * k}$ – brak rozwiązań.`,
      T`Dla pozostałych $m$ dzielimy przez $m^2 - ${k * k} \ne 0$ i dostajemy jedno rozwiązanie $x = \frac{1}{m + ${k}}$.`
    ],
    trap: T`Nie dziel od razu przez $m^2 - ${k * k}$ – najpierw sprawdź, dla jakich $m$ to wyrażenie jest zerem.`,
    tip: 'Równanie $Ax = B$: dla $A \\ne 0$ jedno rozwiązanie, dla $A = 0$ i $B = 0$ nieskończenie wiele, dla $A = 0$ i $B \\ne 0$ brak rozwiązań.'
  });
};

const oneSolution = (r) => {
  const a = r.pick([1, 1, 2, 4, -1]);
  const b = r.intNot(-12, 12, 0);
  const mVal = (b * b) / (4 * a);
  return num({
    title: 'Dokładnie jedno rozwiązanie: Δ = 0',
    q: T`Równanie $${poly([[a, 'x^2'], [b, 'x']])} + m = 0$ z niewiadomą $x$ ma dokładnie jedno rozwiązanie. Oblicz $m$. Wpisz liczbę.`,
    ans: mVal,
    steps: [
      T`Równanie kwadratowe ma dokładnie jedno rozwiązanie, gdy $\Delta = 0$.`,
      T`$\Delta = ${par(b)}^2 - 4 \cdot ${par(a)} \cdot m = ${b * b} ${a > 0 ? '-' : '+'} ${Math.abs(4 * a)}m$.`,
      T`$${b * b} ${a > 0 ? '-' : '+'} ${Math.abs(4 * a)}m = 0$, więc $m = ${dec(mVal, 2)}$.`
    ],
    trap: T`Parametr $m$ jest tu wyrazem wolnym $c$, więc w $\Delta = b^2 - 4ac$ mnożysz go przez $4a$, a nie tylko przez $4$.`,
    tip: TIP_DELTA
  });
};

const leadingParam = (r) => {
  const p = r.intNot(-5, 5, 0);
  const q = r.int(1, 3);
  const m2 = p + q * q;
  return mc({
    title: 'Parametr przy x²: najpierw przypadek liniowy',
    q: T`Równanie $(${xm(p, 'm')})x^2 + ${2 * q}x + 1 = 0$ z niewiadomą $x$ ma dokładnie jedno rozwiązanie wtedy i tylko wtedy, gdy`,
    ok: m(`m \\in \\{${p}, ${m2}\\}`),
    bad: [m(`m = ${m2}`), m(`m = ${p}`), m(`m \\in \\{${p}, ${p - q * q}\\}`), m(`m \\in \\{${m2}, ${p + 2 * q * q}\\}`)],
    steps: [
      T`Dla $m = ${p}$ równanie jest liniowe: $${2 * q}x + 1 = 0$, więc ma dokładnie jedno rozwiązanie $x = ${fr(-1, 2 * q)}$.`,
      T`Dla $m \ne ${p}$ równanie jest kwadratowe i ma jedno rozwiązanie, gdy $\Delta = ${4 * q * q} - 4(${xm(p, 'm')}) = 0$, czyli $m = ${m2}$.`,
      T`Odpowiedź: $m \in \{${p}, ${m2}\}$.`
    ],
    trap: 'Gdy parametr stoi przy $x^2$, najpierw sprawdź przypadek, w którym ten współczynnik jest zerem – równanie staje się wtedy liniowe.',
    tip: TIP_DELTA
  });
};

const twoSolutionsInterval = (r) => {
  const c = r.int(1, 6);
  const two = r.bool();
  const outer = `m \\in ${iv.lo(-2 * c)} \\cup ${iv.ro(2 * c)}`;
  const inner = `m \\in ${iv.oo(-2 * c, 2 * c)}`;
  return mc({
    title: two ? 'Dwa różne rozwiązania: Δ > 0' : 'Brak rozwiązań: Δ < 0',
    q: T`Równanie $x^2 + mx + ${c * c} = 0$ z niewiadomą $x$ ${two ? 'ma dwa różne rozwiązania' : 'nie ma rozwiązań'} wtedy i tylko wtedy, gdy`,
    ok: m(two ? outer : inner),
    bad: [
      m(two ? inner : outer),
      m(two ? `m \\in ${iv.lc(-2 * c)} \\cup ${iv.rc(2 * c)}` : `m \\in ${iv.cc(-2 * c, 2 * c)}`),
      m(`m \\in ${iv.ro(2 * c)}`),
      m(two ? `m \\in ${iv.lo(-c)} \\cup ${iv.ro(c)}` : `m \\in ${iv.oo(-c, c)}`)
    ],
    steps: [
      T`$\Delta = m^2 - 4 \cdot ${c * c} = m^2 - ${4 * c * c} = (m - ${2 * c})(m + ${2 * c})$.`,
      two ? T`$\Delta > 0$ poza przedziałem między pierwiastkami: $m < ${-2 * c}$ lub $m > ${2 * c}$.` : T`$\Delta < 0$ między pierwiastkami: $${-2 * c} < m < ${2 * c}$.`
    ],
    trap: T`Dwa RÓŻNE rozwiązania to $\Delta > 0$, a nie $\Delta \ge 0$ – końce przedziałów muszą być otwarte.`,
    tip: TIP_DELTA
  });
};

const openTwoSolutions = (r) => {
  const f = family(r);
  const S = quadIneq(f.c - 2 * f.s, f.c + 2 * f.s, '>');
  const q = T`Wyznacz wszystkie wartości parametru $m$, dla których równanie $${famEq(f)}$ z niewiadomą $x$ ma dwa różne rozwiązania rzeczywiste. Zapisz obliczenia.`;
  verifySet(S, (mm) => twoRoots(1, mm + f.a, mm + f.b) !== null, (mm) => famDeltaAt(f, mm) > 0, q);
  return open({
    title: 'Dwa różne rozwiązania w zależności od parametru',
    q,
    stages: [
      [1, 'Etap 1', T`Zapisanie warunku $\Delta > 0$ w zależności od $m$: $${famDeltaRaw(f)} > 0$.`],
      [2, 'Etap 2', T`Doprowadzenie do postaci $${famDelta(f)} > 0$ i wyznaczenie pierwiastków trójmianu: $m = ${f.c - 2 * f.s}$, $m = ${f.c + 2 * f.s}$.`],
      [3, 'Komplet', T`Rozwiązanie nierówności: $m \in ${fmt(S)}$.`]
    ],
    zero: ['Rozwiązanie nierówności $\\Delta \\ge 0$ zamiast $\\Delta > 0$ – 0 pkt za ten etap.'],
    steps: [
      T`Dwa różne rozwiązania: $\Delta > 0$, gdzie $\Delta = ${famDeltaRaw(f)} = ${famDelta(f)}$.`,
      T`Trójmian zmiennej $m$: $\Delta_m = ${16 * f.s * f.s}$, więc $m_1 = ${f.c - 2 * f.s}$, $m_2 = ${f.c + 2 * f.s}$.`,
      T`Ramiona paraboli skierowane w górę, więc $m \in ${fmt(S)}$.`
    ],
    trap: T`Warunek „dwa różne rozwiązania” to $\Delta > 0$. Przy $\Delta \ge 0$ dopuszczasz $m$, dla których jest tylko jedno rozwiązanie.`,
    tip: TIP_PARAM,
    answer: m(`m \\in ${fmt(S)}`)
  });
};

// ---------- 5.3 Znaki rozwiązań ----------
const SIGN_FACTS = [
  [T`Jeżeli $\frac{c}{a} < 0$, to równanie $ax^2 + bx + c = 0$ ma dwa rozwiązania różnych znaków.`, true, T`Wtedy $ac < 0$, więc $\Delta = b^2 - 4ac > 0$, a iloczyn rozwiązań jest ujemny.`],
  [T`Jeżeli $x_1 x_2 > 0$, to oba rozwiązania są dodatnie.`, false, T`Dodatni iloczyn oznacza tylko ten sam znak – oba mogą być ujemne. O znaku decyduje suma.`],
  [T`Równanie ma dwa różne rozwiązania ujemne wtedy i tylko wtedy, gdy $\Delta > 0$, $x_1 + x_2 < 0$ oraz $x_1 x_2 > 0$.`, true, T`Ten sam znak daje iloczyn, ujemny znak – suma, a istnienie dwóch rozwiązań – $\Delta > 0$.`],
  [T`Do tego, by oba rozwiązania były dodatnie, wystarczy warunek $x_1 + x_2 > 0$.`, false, T`Przykład: $x_1 = 5$, $x_2 = -1$ – suma jest dodatnia, a jedno rozwiązanie ujemne.`],
  [T`Jeżeli $x_1 x_2 < 0$, to warunek $\Delta > 0$ jest spełniony automatycznie.`, true, T`$x_1 x_2 = \frac{c}{a} < 0$ oznacza $ac < 0$, więc $-4ac > 0$ i $\Delta = b^2 - 4ac > 0$.`],
  [T`Warunki $x_1 + x_2 > 0$ i $x_1 x_2 > 0$ bez sprawdzenia $\Delta$ gwarantują istnienie dwóch rozwiązań dodatnich.`, false, T`Przy $\Delta < 0$ rozwiązań nie ma, a wzory Viète’a niczego wtedy nie opisują.`],
  [T`Rozwiązania równania $x^2 + 5x + 6 = 0$ są tego samego znaku.`, true, T`$x_1 x_2 = 6 > 0$ i $\Delta = 1 > 0$ (rozwiązania: $-2$ i $-3$).`],
  [T`Rozwiązania równania $x^2 - x - 6 = 0$ są tego samego znaku.`, false, T`$x_1 x_2 = -6 < 0$ (rozwiązania: $-2$ i $3$).`]
];

const signFacts = (r) => {
  const [s1, s2] = pickTwo(r, SIGN_FACTS);
  return pf({
    title: 'Znaki rozwiązań a wzory Viète’a',
    s1,
    s2,
    trap: 'Iloczyn mówi, czy znaki są takie same; suma mówi, jaki to znak; $\\Delta > 0$ mówi, że rozwiązania w ogóle istnieją.',
    tip: TIP_VIETE
  });
};

const differentSigns = (r) => {
  const b = r.intNot(-7, 7, 0);
  const k = r.intNot(-6, 6, 0);
  return mc({
    title: 'Rozwiązania różnych znaków',
    q: T`Równanie $x^2 ${sg(b, 'x')} + (${lin(1, -k, 'm')}) = 0$ z niewiadomą $x$ ma dwa rozwiązania różnych znaków wtedy i tylko wtedy, gdy`,
    ok: m(`m \\in ${iv.lo(k)}`),
    bad: [m(`m \\in ${iv.ro(k)}`), m(`m \\in ${iv.lc(k)}`), m(`m \\in ${iv.lo(-k)}`), m(`m \\in ${iv.oo(k, k + 4)}`)],
    steps: [
      T`Rozwiązania mają różne znaki wtedy i tylko wtedy, gdy $x_1 x_2 = \frac{c}{a} < 0$.`,
      T`$x_1 x_2 = ${lin(1, -k, 'm')} < 0$, czyli $m < ${k}$. Warunek $\Delta > 0$ jest wtedy spełniony automatycznie, bo $ac < 0$.`
    ],
    trap: T`Nie dopisuj warunku $x_1 + x_2$ – przy różnych znakach suma może być dowolna.`,
    tip: TIP_VIETE
  });
};

const sameSignRoots = (r) => {
  const t = r.int(1, 5);
  const positive = r.bool();
  const lim = t * t;
  return mc({
    title: positive ? 'Dwa różne rozwiązania dodatnie' : 'Dwa różne rozwiązania ujemne',
    q: T`Równanie $x^2 ${positive ? '-' : '+'} ${2 * t}x + m = 0$ z niewiadomą $x$ ma dwa różne rozwiązania ${positive ? 'dodatnie' : 'ujemne'} wtedy i tylko wtedy, gdy`,
    ok: m(`m \\in ${iv.oo(0, lim)}`),
    bad: [m(`m \\in ${iv.lo(lim)}`), m(`m \\in ${iv.oc(0, lim)}`), m(`m \\in ${iv.ro(0)}`), m(`m \\in ${iv.oo(-lim, lim)}`)],
    steps: [
      T`$\Delta = ${4 * t * t} - 4m > 0$, czyli $m < ${lim}$.`,
      T`$x_1 + x_2 = ${positive ? 2 * t : -2 * t}$ – ten warunek jest zawsze spełniony. $x_1 x_2 = m > 0$.`,
      T`Część wspólna: $m \in ${iv.oo(0, lim)}$.`
    ],
    trap: T`Bez warunku $x_1 x_2 > 0$ dopuszczasz rozwiązania różnych znaków, a z $\Delta \ge 0$ – jedno podwójne rozwiązanie.`,
    tip: TIP_VIETE
  });
};

const CONDITION_SETS = {
  pos: ['dwa różne rozwiązania dodatnie', '$\\Delta > 0$, $x_1 + x_2 > 0$ i $x_1 x_2 > 0$'],
  neg: ['dwa różne rozwiązania ujemne', '$\\Delta > 0$, $x_1 + x_2 < 0$ i $x_1 x_2 > 0$'],
  diff: ['dwa rozwiązania różnych znaków', '$x_1 x_2 < 0$'],
  same: ['dwa różne rozwiązania tego samego znaku', '$\\Delta > 0$ i $x_1 x_2 > 0$']
};

const conditionSystem = (r) => {
  const key = r.pick(Object.keys(CONDITION_SETS));
  const [desc, ok] = CONDITION_SETS[key];
  const traps = ['$x_1 + x_2 > 0$ i $x_1 x_2 > 0$', '$\\Delta \\ge 0$, $x_1 + x_2 > 0$ i $x_1 x_2 > 0$', '$\\Delta > 0$ i $x_1 + x_2 > 0$'];
  return mc({
    title: 'Układ warunków dla znaków rozwiązań',
    q: T`Równanie kwadratowe $ax^2 + bx + c = 0$ ma ${desc} wtedy i tylko wtedy, gdy spełnione są warunki`,
    ok,
    bad: r.shuffle([...Object.values(CONDITION_SETS).map(([, cond]) => cond).filter((cond) => cond !== ok), ...traps]),
    steps: [
      T`$x_1 x_2 > 0$ – ten sam znak, $x_1 x_2 < 0$ – różne znaki.`,
      T`Przy tym samym znaku o tym, czy oba są dodatnie, czy ujemne, decyduje znak sumy $x_1 + x_2$.`,
      T`Dwa różne rozwiązania wymagają $\Delta > 0$; przy $x_1 x_2 < 0$ ten warunek jest spełniony automatycznie.`
    ],
    trap: 'Najczęstszy błąd to pominięcie $\\Delta > 0$ albo zapis $\\Delta \\ge 0$, który dopuszcza jedno (podwójne) rozwiązanie.',
    tip: TIP_VIETE
  });
};

const openSignedRoots = (r) => {
  const t = r.int(1, 4);
  const k = t * (t + 1);
  const negative = r.bool();
  const D = quadIneq(-t, t + 1, '>');
  const sumSet = negative ? gt(0) : lt(0);
  const prodSet = gt(-k);
  const S = intersectAll(D, sumSet, prodSet);
  const q = T`Wyznacz wszystkie wartości parametru $m$, dla których równanie $x^2 + 2mx + m + ${k} = 0$ z niewiadomą $x$ ma dwa różne rozwiązania ${negative ? 'ujemne' : 'dodatnie'}. Zapisz obliczenia.`;
  verifySet(
    S,
    (mm) => {
      const R = twoRoots(1, 2 * mm, mm + k);
      return R && (negative ? R[1] < 0 : R[0] > 0);
    },
    (mm) => mm * mm - mm - k > 0 && (negative ? mm > 0 : mm < 0) && mm + k > 0,
    q
  );
  return open({
    title: `Dwa różne rozwiązania ${negative ? 'ujemne' : 'dodatnie'}`,
    q,
    stages: [
      [1, 'Etap 1', T`Rozwiązanie nierówności $\Delta > 0$: $m \in ${fmt(D)}$.`],
      [2, 'Etap 2', T`Rozwiązanie jednego z warunków: $x_1 + x_2 = -2m ${negative ? '<' : '>'} 0$ albo $x_1 x_2 = m + ${k} > 0$.`],
      [3, 'Etap 3', 'Rozwiązanie obu warunków ze wzorów Viète’a.'],
      [4, 'Komplet', T`Wyznaczenie części wspólnej: $m \in ${fmt(S)}$.`]
    ],
    zero: ['Rozwiązanie nierówności $\\Delta \\ge 0$ zamiast $\\Delta > 0$ – 0 pkt za etap 1.'],
    steps: [
      T`$\Delta = 4m^2 - 4(m + ${k}) = 4(m^2 - m - ${k}) = 4(m + ${t})(${xm(t + 1, 'm')})$, więc $\Delta > 0$ dla $m \in ${fmt(D)}$.`,
      T`$x_1 + x_2 = -2m ${negative ? '<' : '>'} 0$, czyli $m ${negative ? '>' : '<'} 0$.`,
      T`$x_1 x_2 = m + ${k} > 0$, czyli $m > ${-k}$.`,
      T`Część wspólna trzech warunków: $m \in ${fmt(S)}$.`
    ],
    trap: T`Dodatni iloczyn to tylko „ten sam znak”. Bez warunku na sumę nie odróżnisz rozwiązań dodatnich od ujemnych.`,
    tip: TIP_PARAM,
    answer: m(`m \\in ${fmt(S)}`)
  });
};

// ---------- 5.4 Warunki z rozwiązaniami ----------
const SYM_IN_M = {
  sq: { expr: 'x_1^2 + x_2^2', coef: (a, b) => 2 * a - 2 * b, traps: (a, b) => [2 * a - b, 2 * a + 2 * b, -2 * b, 2 * a - 4 * b] },
  diff: { expr: '(x_1 - x_2)^2', coef: (a, b) => 2 * a - 4 * b, traps: (a, b) => [2 * a - 2 * b, 2 * a + 4 * b, -4 * b, 2 * a - b] }
};

const familyB = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.intNot(-4, 4, 0);
  return { a, b, eq: T`x^2 + (${lin(1, a, 'm')})x ${sg(b, 'm')} = 0` };
};

const exprInM = (r) => {
  const { a, b, eq } = familyB(r);
  const kind = SYM_IN_M[r.pick(Object.keys(SYM_IN_M))];
  const okPoly = poly([[1, 'm^2'], [kind.coef(a, b), 'm'], [a * a, '']]);
  return mc({
    title: 'Wyrażenie z rozwiązaniami zapisane przez parametr',
    q: T`Dla tych wartości $m$, dla których równanie $${eq}$ ma dwa rozwiązania $x_1$, $x_2$, wyrażenie $${kind.expr}$ jest równe`,
    ok: m(okPoly),
    bad: kind.traps(a, b).map((coef) => m(poly([[1, 'm^2'], [coef, 'm'], [a * a, '']]))),
    steps: [
      T`Ze wzorów Viète’a: $x_1 + x_2 = -(${lin(1, a, 'm')})$, $x_1 x_2 = ${poly([[b, 'm']])}$.`,
      kind.expr === 'x_1^2 + x_2^2'
        ? T`$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = (${lin(1, a, 'm')})^2 - 2 \cdot ${par(b)}m = ${okPoly}$.`
        : T`$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 = (${lin(1, a, 'm')})^2 - 4 \cdot ${par(b)}m = ${okPoly}$.`
    ],
    trap: T`$(-(m + a))^2 = (m + a)^2$ – kwadrat zjada minus, ale środkowy wyraz $2am$ musi zostać.`,
    tip: TIP_VIETE
  });
};

const valueAtM = (r) => {
  const { a, b, eq } = familyB(r);
  const m0 = r.intNot(-6, 6, 0);
  need((m0 + a) ** 2 - 4 * b * m0 > 0);
  const S = -(m0 + a);
  const P = b * m0;
  const value = S * S - 2 * P;
  const [x1, x2] = twoRoots(1, m0 + a, b * m0);
  if (Math.abs(x1 ** 2 + x2 ** 2 - value) > 1e-6) throw new Error('5.4: kontrola wartości');
  return num({
    title: 'Wartość wyrażenia dla danego parametru',
    q: T`Równanie $${eq}$ dla $m = ${m0}$ ma dwa różne rozwiązania $x_1$, $x_2$. Oblicz $x_1^2 + x_2^2$. Wpisz liczbę.`,
    ans: value,
    steps: [
      T`Dla $m = ${m0}$: $x_1 + x_2 = ${S}$, $x_1 x_2 = ${P}$ (i $\Delta = ${(m0 + a) ** 2 - 4 * b * m0} > 0$).`,
      T`$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = ${par(S)}^2 - 2 \cdot ${par(P)} = ${value}$.`
    ],
    trap: T`Podstaw $m$ dopiero do wzorów Viète’a – nie do gotowego wyniku z innego zadania.`,
    tip: TIP_VIETE
  });
};

const IDENTITIES = [
  [T`$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2$`, true, T`$(x_1 + x_2)^2 - 4x_1 x_2 = x_1^2 - 2x_1 x_2 + x_2^2 = (x_1 - x_2)^2$.`],
  [T`$x_1^2 + x_2^2 = (x_1 + x_2)^2 + 2x_1 x_2$`, false, T`Poprawnie: $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$.`],
  [T`$x_1^3 + x_2^3 = (x_1 + x_2)^3 - 3x_1 x_2(x_1 + x_2)$`, true, T`$(x_1 + x_2)^3 = x_1^3 + x_2^3 + 3x_1 x_2(x_1 + x_2)$.`],
  [T`$\frac{1}{x_1} + \frac{1}{x_2} = \frac{1}{x_1 + x_2}$`, false, T`Poprawnie: $\frac{1}{x_1} + \frac{1}{x_2} = \frac{x_1 + x_2}{x_1 x_2}$.`],
  [T`$\frac{1}{x_1} + \frac{1}{x_2} = \frac{x_1 + x_2}{x_1 x_2}$`, true, 'Wspólny mianownik $x_1 x_2$.'],
  [T`$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 2x_1 x_2$`, false, T`Poprawnie: $(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2$.`]
];

const identityTruth = (r) => {
  const [s1, s2] = pickTwo(r, IDENTITIES);
  const intro = 'Dla rozwiązań $x_1$, $x_2$ (różnych od zera) dowolnego równania kwadratowego zachodzi równość ';
  return pf({
    title: 'Wyrażenia symetryczne – które przekształcenie jest dobre',
    s1: [intro + s1[0] + '.', s1[1], s1[2]],
    s2: [intro + s2[0] + '.', s2[1], s2[2]],
    trap: 'Każde przekształcenie sprawdź na prostym przykładzie, np. $x_1 = 1$, $x_2 = 2$.',
    tip: TIP_VIETE
  });
};

const absDifference = (r) => {
  const a = r.pick([1, 1, 2, -1, 3]);
  const p = r.int(-6, 6);
  const q = r.intNot(-6, 6, p);
  const b = -a * (p + q);
  const c = a * p * q;
  need(c !== 0 && b !== 0);
  const askSquare = r.bool();
  const D = b * b - 4 * a * c;
  const value = askSquare ? (p - q) ** 2 : Math.abs(p - q);
  return num({
    title: askSquare ? 'Kwadrat różnicy rozwiązań' : 'Odległość między rozwiązaniami',
    q: T`Liczby $x_1$, $x_2$ są różnymi rozwiązaniami równania $${quad(a, b, c)} = 0$. Oblicz ${askSquare ? '$(x_1 - x_2)^2$' : '$|x_1 - x_2|$'}. Wpisz liczbę.`,
    ans: value,
    steps: [
      T`$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 = \frac{b^2}{a^2} - \frac{4c}{a} = \frac{\Delta}{a^2}$.`,
      T`$\Delta = ${D}$, $a^2 = ${a * a}$, więc $(x_1 - x_2)^2 = ${(p - q) ** 2}$.`,
      askSquare ? T`Odpowiedź: $${value}$.` : T`$|x_1 - x_2| = \sqrt{${(p - q) ** 2}} = ${value}$.`
    ],
    trap: T`$|x_1 - x_2| = \frac{\sqrt{\Delta}}{|a|}$ – przy $a \ne 1$ nie zapomnij podzielić przez $|a|$.`,
    tip: TIP_VIETE
  });
};

const openSumOfSquares = (r) => {
  const u = r.int(2, 6);
  const c0 = r.intNot(-8, 8, 0);
  const K = u * u - 1 - 2 * c0;
  need(K > 0);
  const r1 = 1 + u;
  const r2 = 1 - u;
  const deltaAt = (mm) => mm * mm - 4 * mm - 4 * c0;
  const valid = [r2, r1].filter((mm) => deltaAt(mm) > 0);
  need(valid.length > 0);
  for (const mm of [r1, r2]) {
    const R = twoRoots(1, mm, mm + c0);
    if (Boolean(R) !== valid.includes(mm) || (R && Math.abs(R[0] ** 2 + R[1] ** 2 - K) > 1e-9)) throw new Error('5.4: kontrola zadania otwartego');
  }
  const answer = valid.length === 2 ? `m \\in \\{${valid[0]}, ${valid[1]}\\}` : `m = ${valid[0]}`;
  const rejected = [r2, r1].filter((mm) => !valid.includes(mm));
  return open({
    title: 'Parametr z warunkiem na sumę kwadratów rozwiązań',
    q: T`Wyznacz wszystkie wartości parametru $m$, dla których równanie $x^2 + mx + ${lin(1, c0, 'm')} = 0$ z niewiadomą $x$ ma dwa różne rozwiązania $x_1$, $x_2$ spełniające warunek $x_1^2 + x_2^2 = ${K}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie warunku $\Delta > 0$: $m^2 - 4(${lin(1, c0, 'm')}) > 0$.`],
      [2, 'Etap 2', T`Zapisanie $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = m^2 - 2(${lin(1, c0, 'm')})$.`],
      [4, 'Etap 3', T`Rozwiązanie równania $${poly([[1, 'm^2'], [-2, 'm'], [-2 * c0, '']])} = ${K}$: $m = ${r2}$ lub $m = ${r1}$.`],
      [5, 'Komplet', T`Sprawdzenie warunku $\Delta > 0$ i odpowiedź: $${answer}$.`]
    ],
    zero: ['Bez sprawdzenia warunku $\\Delta > 0$ dla otrzymanych wartości – najwyżej 4 pkt.'],
    steps: [
      T`Warunek: $\Delta = m^2 - 4(${lin(1, c0, 'm')}) = ${poly([[1, 'm^2'], [-4, 'm'], [-4 * c0, '']])} > 0$.`,
      T`Ze wzorów Viète’a: $x_1 + x_2 = -m$, $x_1 x_2 = ${lin(1, c0, 'm')}$, więc $x_1^2 + x_2^2 = m^2 - 2(${lin(1, c0, 'm')})$.`,
      T`$${poly([[1, 'm^2'], [-2, 'm'], [-2 * c0, '']])} = ${K}$, czyli $${poly([[1, 'm^2'], [-2, 'm'], [1 - u * u, '']])} = 0$, więc $m = ${r2}$ lub $m = ${r1}$.`,
      T`Sprawdzenie: $\Delta(${r2}) = ${deltaAt(r2)}$, $\Delta(${r1}) = ${deltaAt(r1)}$.${rejected.length ? ` Odrzucamy $m = ${rejected[0]}$, bo wtedy $\\Delta \\le 0$.` : ''}`,
      T`Odpowiedź: $${answer}$.`
    ],
    trap: T`Wzory Viète’a „działają” także dla $m$, przy których rozwiązań nie ma. Bez sprawdzenia $\Delta > 0$ łatwo podać wartość, która nie spełnia warunków zadania.`,
    tip: TIP_PARAM,
    answer: m(answer)
  });
};

// ---------- 5.5 Pełne rozwiązanie za 6 pkt ----------
// Rodzina z matury: dwa różne rozwiązania tego samego znaku i (x₁ − x₂)² ≤ K, gdzie K = t² − 4s².
const fullFamily = (r) => {
  const f = family(r, 4);
  const E1 = quadIneq(f.c - 2 * f.s, f.c + 2 * f.s, '>');
  const E2 = gt(-f.b);
  const E3 = quadIneq(f.c - f.t, f.c + f.t, '<=');
  const S = intersectAll(E1, E2, E3);
  need(S.length > 0);
  return { ...f, E1, E2, E3, S };
};
const fullTask = (f) => T`równanie $${famEq(f)}$ z niewiadomą $x$ ma dwa różne rozwiązania rzeczywiste $x_1$, $x_2$ tego samego znaku, spełniające warunek $(x_1 - x_2)^2 \le ${f.K}$`;

const intersectionOfConditions = (r) => {
  const f = fullFamily(r);
  return mc({
    title: 'Część wspólna warunków',
    q: T`Rozwiązując zadanie z parametrem, otrzymano trzy warunki: $m \in ${fmt(f.E1)}$, $m \in ${fmt(f.E2)}$ oraz $m \in ${fmt(f.E3)}$. Zbiór wszystkich $m$ spełniających jednocześnie te warunki to`,
    ok: m(fmt(f.S)),
    bad: [
      m(fmt(intersect(f.E1, f.E3))),
      m(fmt(intersect(f.E2, f.E3))),
      m(fmt(intersectAll(quadIneq(f.c - 2 * f.s, f.c + 2 * f.s, '>='), f.E2, f.E3))),
      m(fmt(intersectAll(f.E1, f.E2, quadIneq(f.c - f.t, f.c + f.t, '<')))),
      m(fmt(intersect(f.E1, f.E2)))
    ],
    steps: [
      T`Część wspólna pierwszego i trzeciego warunku: $${fmt(intersect(f.E1, f.E3))}$.`,
      T`Uwzględniamy drugi warunek: $${fmt(f.S)}$.`,
      'Zaznacz wszystkie trzy zbiory na jednej osi – wtedy od razu widać, które końce są domknięte.'
    ],
    trap: 'Każdy koniec przedziału bierze nawias z warunku, z którego pochodzi: z $\\Delta > 0$ – otwarty, z nierówności nieostrej – domknięty.',
    tip: TIP_PARAM
  });
};

const smallestInteger = (r) => {
  const f = fullFamily(r);
  const ints = [];
  for (let k = -60; k <= 60; k++) if (contains(f.S, k)) ints.push(k);
  need(ints.length > 0);
  const askCount = r.bool();
  return num({
    title: askCount ? 'Liczba całkowitych wartości parametru' : 'Najmniejsza całkowita wartość parametru',
    q: T`Zbiór wszystkich wartości parametru $m$, dla których ${fullTask(f)}, to $${fmt(f.S)}$. ${askCount ? 'Ile liczb całkowitych należy do tego zbioru?' : 'Podaj najmniejszą liczbę całkowitą należącą do tego zbioru.'} Wpisz liczbę.`,
    ans: askCount ? ints.length : ints[0],
    steps: [
      T`Zbiór: $${fmt(f.S)}$. Sprawdź, czy końce przedziałów należą do zbioru (nawias kwadratowy lub $\langle\,\rangle$ – tak, okrągły – nie).`,
      T`Liczby całkowite w zbiorze: $${ints.join(',\\; ')}$.`,
      askCount ? T`Jest ich $${ints.length}$.` : T`Najmniejsza z nich to $${ints[0]}$.`
    ],
    trap: 'Przy otwartym końcu przedziału sama liczba graniczna do zbioru NIE należy.',
    tip: TIP_PARAM
  });
};

const GRADING_FACTS = [
  [T`W zadaniu o dwóch różnych rozwiązaniach rozwiązanie warunku $\Delta \ge 0$ zamiast $\Delta > 0$ daje 0 pkt za ten etap.`, true, 'Tak stanowią zasady oceniania CKE (np. matura maj 2025, zadanie z parametrem).'],
  [T`Część wspólną wystarczy policzyć z warunków otrzymanych ze wzorów Viète’a.`, false, T`Do części wspólnej wchodzą wszystkie warunki, także $\Delta > 0$.`],
  [T`Poprawnie rozwiązany warunek $\Delta > 0$ daje punkt, nawet jeśli dalsza część rozwiązania jest błędna.`, true, 'Zasady oceniania CKE przyznają punkty za każdy poprawnie wykonany etap.'],
  [T`Warunek „rozwiązania tego samego znaku” zapisujemy jako $x_1 + x_2 > 0$.`, false, T`Ten sam znak to $x_1 x_2 > 0$ (przy $\Delta > 0$).`],
  [T`Dla równania $x^2 + bx + c = 0$ wyrażenie $(x_1 - x_2)^2$ jest równe $\Delta$.`, true, T`$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 = b^2 - 4c = \Delta$.`],
  [T`Jeśli $x_1 x_2 > 0$, to warunek $\Delta > 0$ można pominąć.`, false, T`Dodatni iloczyn nie gwarantuje istnienia rozwiązań – przy $\Delta < 0$ ich nie ma.`]
];

const gradingFacts = (r) => {
  const [s1, s2] = pickTwo(r, GRADING_FACTS);
  return pf({
    title: 'Jak CKE punktuje zadanie z parametrem',
    s1,
    s2,
    trap: 'Punkty są za etapy – nawet gdy nie dojdziesz do końca, każdy poprawnie rozwiązany warunek się liczy.',
    tip: TIP_PARAM
  });
};

const inequalityForm = (r) => {
  const f = fullFamily(r);
  const variant = (b1, b0) => m(`${poly([[1, 'm^2'], [b1, 'm'], [b0, '']])} \\le ${f.K}`);
  return mc({
    title: 'Warunek (x₁ − x₂)² ≤ K zapisany przez parametr',
    q: T`Dla równania $${famEq(f)}$ warunek $(x_1 - x_2)^2 \le ${f.K}$ zapisany w zależności od $m$ ma postać`,
    ok: variant(2 * f.a - 4, f.a * f.a - 4 * f.b),
    bad: [variant(2 * f.a - 2, f.a * f.a - 2 * f.b), variant(2 * f.a + 4, f.a * f.a + 4 * f.b), variant(-4, f.a * f.a - 4 * f.b), variant(2 * f.a - 4, f.a * f.a + 4 * f.b)],
    steps: [
      T`Ze wzorów Viète’a: $x_1 + x_2 = -(${lin(1, f.a, 'm')})$, $x_1 x_2 = ${lin(1, f.b, 'm')}$.`,
      T`$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 = ${famDeltaRaw(f)} = ${famDelta(f)}$.`
    ],
    trap: T`W $(x_1 - x_2)^2$ odejmujesz $4x_1 x_2$, a nie $2x_1 x_2$ (to wzór na $x_1^2 + x_2^2$).`,
    tip: TIP_VIETE
  });
};

const openFullParam = (r) => {
  const f = fullFamily(r);
  const q = T`Wyznacz wszystkie wartości parametru $m$, dla których ${fullTask(f)}. Zapisz obliczenia.`;
  verifySet(
    f.S,
    (mm) => {
      const R = twoRoots(1, mm + f.a, mm + f.b);
      return R && R[0] * R[1] > 0 && (R[1] - R[0]) ** 2 <= f.K + 1e-9;
    },
    (mm) => famDeltaAt(f, mm) > 0 && mm + f.b > 0 && famDeltaAt(f, mm) <= f.K,
    q
  );
  return open({
    title: 'Pełne zadanie z parametrem za 6 pkt',
    q,
    stages: [
      [1, 'Etap 1', T`Rozwiązanie nierówności $\Delta > 0$: $m \in ${fmt(f.E1)}$.`],
      [2, 'Etap 2', T`Rozwiązanie warunku $x_1 x_2 > 0$: $${lin(1, f.b, 'm')} > 0$, czyli $m \in ${fmt(f.E2)}$.`],
      [3, 'Etap 3a', T`Zapisanie $(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2$ w zależności od $m$.`],
      [4, 'Etap 3b', T`Zapisanie nierówności z jedną niewiadomą: $${famDelta(f)} \le ${f.K}$.`],
      [5, 'Etap 3c', T`Rozwiązanie tej nierówności: $m \in ${fmt(f.E3)}$.`],
      [6, 'Komplet', T`Wyznaczenie części wspólnej: $m \in ${fmt(f.S)}$.`]
    ],
    zero: ['Rozwiązanie nierówności $\\Delta \\ge 0$ zamiast $\\Delta > 0$ – 0 pkt za etap 1.'],
    steps: [
      T`$\Delta = ${famDeltaRaw(f)} = ${famDelta(f)} > 0$. Pierwiastki trójmianu: $${f.c - 2 * f.s}$ i $${f.c + 2 * f.s}$, więc $m \in ${fmt(f.E1)}$.`,
      T`Ten sam znak: $x_1 x_2 = ${lin(1, f.b, 'm')} > 0$, czyli $m \in ${fmt(f.E2)}$.`,
      T`$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 = ${famDelta(f)} \le ${f.K}$, czyli $${poly([[1, 'm^2'], [2 * f.a - 4, 'm'], [f.a * f.a - 4 * f.b - f.K, '']])} \le 0$. Pierwiastki: $${f.c - f.t}$ i $${f.c + f.t}$, więc $m \in ${fmt(f.E3)}$.`,
      T`Część wspólna: $m \in ${fmt(f.S)}$.`
    ],
    trap: T`Na końcu zostaje część wspólna WSZYSTKICH trzech warunków – najczęściej gubi się warunek ze znakiem iloczynu.`,
    tip: TIP_PARAM,
    answer: m(`m \\in ${fmt(f.S)}`)
  });
};

export default {
  numericId: 5,
  title: 'Parametr i wzory Viète’a',
  short_title: 'Parametr i Viète',
  description: 'Wzory Viète’a, liczba i znaki rozwiązań w zależności od parametru oraz pełne rozwiązanie zadania za 6 pkt.',
  icon: 'Activity',
  color: '#FFB800',
  matura_points_range: '5–6 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 7–8',
  cke_stats: 'W 11 z 11 arkuszy CKE 2022–2026, średnio 5,3 pkt na arkusz.',
  lessons: [
    {
      title: 'Wzory Viète’a i wyrażenia symetryczne',
      short_title: 'Wzory Viète’a',
      requirements: ['III.R3'],
      prereq: ['math-lesson-3-2'],
      pill: pill({
        essence: T`Wzory Viète’a łączą rozwiązania równania kwadratowego z jego współczynnikami: suma rozwiązań to $-\frac{b}{a}$, a iloczyn – $\frac{c}{a}$. Dzięki nim policzysz wyrażenia typu $x_1^2 + x_2^2$ bez wyznaczania samych rozwiązań. Warunek jest jeden: rozwiązania muszą istnieć, więc najpierw sprawdzasz $\Delta$.`,
        context: 'Na poziomie rozszerzonym wzory Viète’a są w zadaniach z parametrem w 9 z 11 arkuszy CKE 2022–2026 – zwykle jako część zadania za 5–6 pkt.',
        pl: T`Równanie $x^2 - 5x + 6 = 0$ ma rozwiązania $2$ i $3$. Suma $2 + 3 = 5$, iloczyn $2 \cdot 3 = 6$ – to dokładnie liczby ze współczynników (z odwróconym znakiem przy $x$). Viète mówi, że tak jest zawsze, nawet gdy rozwiązania są „brzydkie”, np. z pierwiastkami.`,
        steps: [
          ['Sprawdź Δ', T`$\Delta > 0$ – dwa różne rozwiązania, $\Delta = 0$ – jedno podwójne.`, 'Bez rozwiązań wzory nic nie znaczą.'],
          ['Zapisz sumę i iloczyn', T`$x_1 + x_2 = -\frac{b}{a}$, $x_1 x_2 = \frac{c}{a}$.`, 'Minus tylko przy sumie.'],
          ['Przekształć wyrażenie', T`$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$.`, 'Zostaw w wyrażeniu tylko sumę i iloczyn.']
        ],
        formulas: [
          ['Wzory Viète’a', T`x_1 + x_2 = -\frac{b}{a}, \quad x_1 \cdot x_2 = \frac{c}{a}`, 8],
          ['Suma kwadratów', T`x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2`],
          ['Kwadrat różnicy', T`(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2`]
        ],
        examples: [
          ['Suma kwadratów', '2 pkt', T`Równanie $x^2 - 3x - 5 = 0$ ma rozwiązania $x_1$, $x_2$. Oblicz $x_1^2 + x_2^2$.`, T`1. $\Delta = 9 + 20 = 29 > 0$.` + '\n' + T`2. $x_1 + x_2 = 3$, $x_1 x_2 = -5$.` + '\n' + T`3. $x_1^2 + x_2^2 = 3^2 - 2 \cdot (-5) = 19$.`, 'Rozwiązań z pierwiastkiem z 29 w ogóle nie trzeba liczyć.'],
          ['Suma odwrotności', '2 pkt', T`Dla równania $2x^2 + 6x - 1 = 0$ oblicz $\frac{1}{x_1} + \frac{1}{x_2}$.`, T`1. $\Delta = 36 + 8 = 44 > 0$.` + '\n' + T`2. $x_1 + x_2 = -3$, $x_1 x_2 = -\frac{1}{2}$.` + '\n' + T`3. $\frac{x_1 + x_2}{x_1 x_2} = \frac{-3}{-\frac{1}{2}} = 6$.`, 'Wspólny mianownik zamienia sumę odwrotności na iloraz sumy i iloczynu.']
        ],
        trap: T`Wzory Viète’a „liczą” sumę rozwiązań także dla równania, które rozwiązań nie ma. Przy $\Delta < 0$ odpowiedź „$x_1 + x_2 = -\frac{b}{a}$” jest błędna.`,
        fail: T`„Dla $x^2 + 2x + 5 = 0$: $x_1 + x_2 = -2$.”`,
        win: T`$\Delta = 4 - 20 < 0$, więc równanie nie ma rozwiązań i suma nie istnieje.`,
        why: 'Wzory Viète’a opisują rozwiązania – gdy ich nie ma, nie ma czego opisywać.',
        ckeTip: 'W rozwiązaniu zawsze zapisz najpierw warunek na $\\Delta$ – w zasadach oceniania CKE jest za niego osobny punkt.',
        points: [T`$x_1 + x_2 = -\frac{b}{a}$, $x_1 x_2 = \frac{c}{a}$.`, 'Najpierw $\\Delta$, potem Viète.', 'Wyrażenie przekształć tak, by zostały tylko suma i iloczyn.']
      }),
      gens: [vietaSumProduct, symmetricValue, vietaTruth, buildEquation, openReciprocalSquares]
    },
    {
      title: 'Liczba rozwiązań w zależności od parametru',
      short_title: 'Liczba rozwiązań',
      requirements: ['III.R5'],
      prereq: ['math-lesson-3-1', 'math-lesson-3-2'],
      pill: pill({
        essence: T`Parametr $m$ to liczba, której nie znasz, ale możesz ją dobrać. Pytanie „dla jakich $m$ równanie ma dwa rozwiązania” sprowadza się do nierówności $\Delta > 0$, w której niewiadomą jest już $m$. Dla równań liniowych z parametrem decyduje współczynnik przy $x$: gdy jest zerem, równanie ma nieskończenie wiele rozwiązań albo żadnego.`,
        context: 'Każdy arkusz PR od 2023 roku ma zadanie z parametrem (11 z 11 arkuszy CKE). Etap „Δ > 0” to zawsze osobny punkt.',
        pl: T`Masz równanie $x^2 + mx + 9 = 0$ i „pokrętło” $m$. Kręcisz: dla $m = 10$ są dwa rozwiązania, dla $m = 6$ jedno, dla $m = 0$ żadnego. Zadanie każe opisać wszystkie ustawienia pokrętła naraz – i robi to nierówność $\Delta > 0$.`,
        steps: [
          ['Sprawdź współczynnik przy x²', T`Jeśli zależy od $m$, rozważ osobno przypadek, gdy jest zerem.`, 'Wtedy równanie jest liniowe.'],
          ['Zapisz Δ przez m', T`$\Delta = b^2 - 4ac$ z podstawionym parametrem.`, 'To trójmian zmiennej m.'],
          ['Rozwiąż nierówność', T`$\Delta > 0$, $\Delta = 0$ albo $\Delta < 0$ – zależnie od pytania.`, 'Uważaj na nawiasy.']
        ],
        formulas: [
          ['Wyróżnik', T`\Delta = b^2 - 4ac`, 7],
          ['Liczba rozwiązań', T`\Delta > 0: \ 2, \quad \Delta = 0: \ 1, \quad \Delta < 0: \ 0`, 8],
          ['Równanie liniowe', T`Ax = B: \ A \ne 0 \text{ – jedno rozwiązanie}`]
        ],
        examples: [
          ['Dwa rozwiązania', '3 pkt', T`Dla jakich $m$ równanie $x^2 + mx + 4 = 0$ ma dwa różne rozwiązania?`, T`1. $\Delta = m^2 - 16 > 0$.` + '\n' + T`2. $(m - 4)(m + 4) > 0$.` + '\n' + T`3. $m \in (-\infty, -4) \cup (4, +\infty)$.`, 'Δ to trójmian zmiennej m – rozwiązujesz go jak zwykłą nierówność kwadratową.'],
          ['Parametr przy x²', '2 pkt', T`Dla jakich $m$ równanie $(m - 2)x^2 + 2x + 1 = 0$ ma dokładnie jedno rozwiązanie?`, T`1. $m = 2$: $2x + 1 = 0$ – jedno rozwiązanie.` + '\n' + T`2. $m \ne 2$: $\Delta = 4 - 4(m - 2) = 0$, czyli $m = 3$.` + '\n' + T`3. $m \in \{2, 3\}$.`, 'Przypadek liniowy daje dodatkową odpowiedź.']
        ],
        trap: T`„Dwa różne rozwiązania” to $\Delta > 0$, a nie $\Delta \ge 0$. Według zasad oceniania CKE za $\Delta \ge 0$ ten etap jest wart 0 pkt.`,
        fail: T`„$\Delta = m^2 - 16 \ge 0$, więc $m \in (-\infty, -4 \rangle \cup \langle 4, +\infty)$.”`,
        win: T`$m^2 - 16 > 0$, więc $m \in (-\infty, -4) \cup (4, +\infty)$.`,
        why: 'Dla $m = 4$ jest tylko jedno (podwójne) rozwiązanie, a treść żąda dwóch różnych.',
        ckeTip: 'Zapisz warunek słownie i symbolem: „dwa różne rozwiązania, więc $\\Delta > 0$”. Egzaminator widzi wtedy, że znasz powód warunku.',
        points: ['Parametr przy $x^2$: najpierw przypadek liniowy.', '$\\Delta$ zapisane przez $m$ to trójmian zmiennej $m$.', 'Dwa różne rozwiązania: nierówność ostra.']
      }),
      gens: [linearParam, oneSolution, leadingParam, twoSolutionsInterval, openTwoSolutions]
    },
    {
      title: 'Znaki rozwiązań w zależności od parametru',
      short_title: 'Znaki rozwiązań',
      requirements: ['III.R3', 'III.R5'],
      prereq: ['math-lesson-6-3'],
      pill: pill({
        essence: T`O znakach rozwiązań decydują wzory Viète’a. Iloczyn $x_1 x_2$ mówi, czy znaki są takie same ($> 0$), czy różne ($< 0$). Suma $x_1 + x_2$ mówi, czy przy tym samym znaku oba są dodatnie, czy ujemne. Do tego dochodzi $\Delta > 0$, bo rozwiązania muszą w ogóle istnieć.`,
        context: 'Warunek na znaki rozwiązań to typowy drugi etap zadania z parametrem za 5–6 pkt (np. matura maj 2025: „miejsca zerowe tego samego znaku”).',
        pl: T`Dwie liczby mają ten sam znak, gdy ich iloczyn jest dodatni ($2 \cdot 3$ albo $(-2) \cdot (-3)$). Żeby wiedzieć, który to znak, patrzysz na sumę: $5$ – oba dodatnie, $-5$ – oba ujemne.`,
        steps: [
          ['Istnienie', T`$\Delta > 0$ – dwa różne rozwiązania.`, 'Przy różnych znakach wynika z iloczynu.'],
          ['Ten sam czy różny znak', T`$x_1 x_2 > 0$ albo $x_1 x_2 < 0$.`, 'Iloczyn to c/a.'],
          ['Który znak', T`$x_1 + x_2 > 0$ – dodatnie, $< 0$ – ujemne.`, 'Suma to −b/a.']
        ],
        formulas: [
          ['Dwa różne dodatnie', T`\Delta > 0, \quad x_1 + x_2 > 0, \quad x_1 x_2 > 0`],
          ['Dwa różne ujemne', T`\Delta > 0, \quad x_1 + x_2 < 0, \quad x_1 x_2 > 0`],
          ['Różne znaki', T`x_1 x_2 = \frac{c}{a} < 0`, 8]
        ],
        examples: [
          ['Dwa dodatnie', '3 pkt', T`Dla jakich $m$ równanie $x^2 - 4x + m = 0$ ma dwa różne rozwiązania dodatnie?`, T`1. $\Delta = 16 - 4m > 0$, czyli $m < 4$.` + '\n' + T`2. $x_1 + x_2 = 4 > 0$ – zawsze, $x_1 x_2 = m > 0$.` + '\n' + T`3. $m \in (0, 4)$.`, 'Część wspólna trzech warunków.'],
          ['Różne znaki', '1 pkt', T`Dla jakich $m$ równanie $x^2 + 3x + m - 2 = 0$ ma rozwiązania różnych znaków?`, T`1. $x_1 x_2 = m - 2 < 0$.` + '\n' + T`2. $m < 2$, a $\Delta > 0$ wynika z $ac < 0$.`, 'Przy różnych znakach jeden warunek wystarczy.']
        ],
        trap: T`$x_1 x_2 > 0$ to NIE „oba dodatnie”, tylko „ten sam znak”. Bez warunku na sumę odpowiedź obejmuje też dwa rozwiązania ujemne.`,
        fail: T`„Oba dodatnie, więc $x_1 x_2 > 0$ i $\Delta > 0$.”`,
        win: T`Oba dodatnie: $\Delta > 0$, $x_1 x_2 > 0$ i $x_1 + x_2 > 0$.`,
        why: 'Liczby $-1$ i $-2$ mają dodatni iloczyn, a żadna z nich nie jest dodatnia.',
        ckeTip: 'Każdy warunek ze wzorów Viète’a rozwiązuj osobno i zapisz wynik jako przedział – za każdy z nich jest punkt.',
        points: ['Iloczyn: ten sam znak albo różne znaki.', 'Suma: który to znak.', '$\\Delta > 0$ zawsze, gdy chodzi o dwa różne rozwiązania.']
      }),
      gens: [signFacts, differentSigns, sameSignRoots, conditionSystem, openSignedRoots]
    },
    {
      title: 'Warunki z rozwiązaniami: suma kwadratów i różnica',
      short_title: 'Warunki z x₁ i x₂',
      requirements: ['III.R3', 'III.R5'],
      prereq: ['math-lesson-2-1'],
      pill: pill({
        essence: T`Gdy w treści pojawia się warunek z rozwiązaniami, np. $x_1^2 + x_2^2 = 10$ albo $(x_1 - x_2)^2 \le 180$, przepisujesz go za pomocą sumy i iloczynu, a te – ze wzorów Viète’a – przez parametr. Dostajesz równanie albo nierówność z jedną niewiadomą $m$. Na koniec sprawdzasz, czy otrzymane $m$ spełniają $\Delta > 0$.`,
        context: 'To trzeci, najwyżej punktowany etap zadania z parametrem: w kluczu CKE maj 2025 był wart 3 z 6 pkt.',
        pl: T`Warunek „suma kwadratów rozwiązań wynosi 10” brzmi groźnie, ale to tylko $(x_1 + x_2)^2 - 2x_1 x_2 = 10$. Suma i iloczyn to proste wyrażenia z $m$, więc warunek zamienia się w zwykłe równanie kwadratowe z niewiadomą $m$.`,
        steps: [
          ['Przekształć warunek', T`$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$.`, 'Tylko suma i iloczyn.'],
          ['Podstaw wzory Viète’a', T`Suma i iloczyn zapisane przez $m$.`, 'Uwaga na minus w sumie.'],
          ['Rozwiąż i sprawdź Δ', T`Otrzymane $m$ muszą spełniać $\Delta > 0$.`, 'Odrzuć te, które nie spełniają.']
        ],
        formulas: [
          ['Suma kwadratów', T`x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2`],
          ['Kwadrat różnicy', T`(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2 = \frac{\Delta}{a^2}`],
          ['Wzory Viète’a', T`x_1 + x_2 = -\frac{b}{a}, \quad x_1 x_2 = \frac{c}{a}`, 8]
        ],
        examples: [
          ['Suma kwadratów', '5 pkt', T`Dla jakich $m$ równanie $x^2 + mx + m - 3 = 0$ ma dwa różne rozwiązania spełniające $x_1^2 + x_2^2 = 10$?`, T`1. $\Delta = m^2 - 4m + 12 > 0$ – zawsze (bo $\Delta_m < 0$).` + '\n' + T`2. $m^2 - 2(m - 3) = 10$, czyli $m^2 - 2m - 4 = 0$.` + '\n' + T`3. $m = 1 - \sqrt{5}$ lub $m = 1 + \sqrt{5}$.`, 'Gdy Δ jest dodatnie dla każdego m, obie wartości zostają.'],
          ['Kwadrat różnicy', '2 pkt', T`Dla równania $x^2 - 6x + 5 = 0$ oblicz $(x_1 - x_2)^2$.`, T`1. $x_1 + x_2 = 6$, $x_1 x_2 = 5$.` + '\n' + T`2. $(x_1 - x_2)^2 = 36 - 20 = 16$.`, 'To samo co Δ, bo a = 1.']
        ],
        trap: T`Po rozwiązaniu równania z $m$ łatwo zapomnieć o $\Delta > 0$. Wartość $m$, dla której $\Delta \le 0$, trzeba odrzucić.`,
        fail: T`„$m = 5$ lub $m = -3$ – koniec zadania.”`,
        win: T`$m = 5$ lub $m = -3$, sprawdzam $\Delta$: dla $m = -3$ jest $\Delta < 0$, więc odpowiedź to $m = 5$.`,
        why: 'Warunek z rozwiązaniami ma sens tylko wtedy, gdy rozwiązania istnieją.',
        ckeTip: 'Sprawdzenie Δ dla otrzymanych wartości zapisz jawnie – w kluczu jest za to ostatni punkt.',
        points: ['Warunek przepisz przez sumę i iloczyn.', 'Suma i iloczyn to wyrażenia z $m$.', 'Na końcu sprawdź $\\Delta > 0$.']
      }),
      gens: [exprInM, valueAtM, identityTruth, absDifference, openSumOfSquares]
    },
    {
      title: 'Pełne rozwiązanie za 6 pkt: etapy i część wspólna',
      short_title: 'Zadanie za 6 pkt',
      requirements: ['III.R3', 'III.R5'],
      prereq: ['math-lesson-3-3'],
      pill: pill({
        essence: T`Zadanie za 6 pkt składa się z etapów, a każdy jest punktowany osobno: $\Delta > 0$, warunek na znaki rozwiązań, warunek z treści przepisany przez parametr i na końcu część wspólna. Pisz je w tej kolejności i każdy kończ przedziałem. Nawet jeśli nie dojdziesz do końca, zbierasz punkty za to, co już masz.`,
        context: 'Matura maj 2025, zadanie 11 (6 pkt): Δ > 0 – 1 pkt, ten sam znak – 1 pkt, warunek (x₁ − x₂)² ≤ 180 – 3 pkt, część wspólna – 1 pkt.',
        pl: T`To jak sprawdzanie listy przed wyjazdem: paszport (rozwiązania istnieją), bilet (ten sam znak), bagaż w limicie (warunek z treści). Jedziesz tylko wtedy, gdy wszystko jest odhaczone naraz – i to jest część wspólna.`,
        steps: [
          ['Etap 1: Δ > 0', T`Rozwiąż nierówność kwadratową zmiennej $m$.`, '1 pkt.'],
          ['Etap 2: znaki', T`$x_1 x_2 > 0$ albo $< 0$, ewentualnie suma.`, '1 pkt.'],
          ['Etap 3: warunek z treści', T`Przepisz przez Viète’a i rozwiąż.`, 'Do 3 pkt.'],
          ['Część wspólna', T`Zaznacz wszystkie zbiory na jednej osi.`, '1 pkt.']
        ],
        formulas: [
          ['Kwadrat różnicy', T`(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2`],
          ['Ten sam znak', T`\Delta > 0, \quad x_1 x_2 > 0`],
          ['Wzory Viète’a', T`x_1 + x_2 = -\frac{b}{a}, \quad x_1 x_2 = \frac{c}{a}`, 8]
        ],
        examples: [
          ['Część wspólna', '1 pkt', T`Warunki: $m \in (-\infty, -1) \cup (3, +\infty)$, $m > -2$ oraz $m \in \langle -3, 5 \rangle$. Wyznacz część wspólną.`, T`1. Pierwszy i trzeci: $\langle -3, -1) \cup (3, 5 \rangle$.` + '\n' + T`2. Z drugim: $(-2, -1) \cup (3, 5 \rangle$.`, 'Każdy koniec bierze nawias z warunku, z którego pochodzi.'],
          ['Schemat zapisu', '6 pkt', T`Jak zapisać rozwiązanie, żeby egzaminator łatwo znalazł punkty?`, T`1. „Warunek 1: $\Delta > 0$” i przedział.` + '\n' + T`2. „Warunek 2: $x_1 x_2 > 0$” i przedział.` + '\n' + T`3. „Warunek 3” i przedział, na końcu „Odpowiedź: część wspólna”.`, 'Ponumerowane warunki to czytelny dowód, że wiesz, co robisz.']
        ],
        trap: T`W części wspólnej najczęściej gubi się jeden z warunków albo nawias przy końcu przedziału. Za źle wyznaczoną część wspólną tracisz ostatni punkt.`,
        fail: T`Odpowiedź z samego warunku 3: $m \in \langle -3, 5 \rangle$.`,
        win: T`Część wspólna wszystkich warunków: $m \in (-2, -1) \cup (3, 5 \rangle$.`,
        why: 'Warunek z treści dotyczy rozwiązań, które muszą istnieć i mieć ten sam znak – bez pozostałych warunków odpowiedź zawiera złe m.',
        ckeTip: 'Nawet jeśli utkniesz na etapie 3, zapisz część wspólną tego, co masz – za etapy 1 i 2 zostają punkty.',
        points: ['Każdy etap kończ przedziałem.', 'Część wspólna ze WSZYSTKICH warunków.', 'Nawias przy końcu bierze się z warunku, z którego pochodzi.']
      }),
      gens: [intersectionOfConditions, smallestInteger, gradingFacts, inequalityForm, openFullParam]
    }
  ]
};
