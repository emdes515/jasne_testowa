import { T, mc, num, pf, open, pill, fr, dec, lin, poly, quad, xm, m, need, iv } from '../math_pp/lib.js';
import { quadIneq, lt, gt, intersect, fmt, numTex, verifySet } from './sets.js';
import { pickTwo, co } from './common.js';

const TIP_LIM = 'Karta wzorów, str. 10: granica sumy, różnicy, iloczynu i ilorazu ciągów zbieżnych. Przy ilorazie wielomianów dziel licznik i mianownik przez najwyższą potęgę $n$ z mianownika.';
const TIP_SERIES = 'Karta wzorów, str. 9: dla $|q| < 1$ suma wszystkich wyrazów nieskończonego ciągu geometrycznego to $S = \\frac{a_1}{1 - q}$.';
const TIP_SEQ = 'Karta wzorów, str. 9: $a_n = a_1 + (n - 1)r$, $a_n = a_1 q^{n-1}$; trzy liczby $a, b, c$ tworzą ciąg arytmetyczny, gdy $2b = a + c$, a geometryczny, gdy $b^2 = ac$.';

const polyN = (cs) => poly(cs.map((c, i) => [c, cs.length - 1 - i === 0 ? '' : cs.length - 1 - i === 1 ? 'n' : `n^${cs.length - 1 - i}`]));
const lim = (body) => `\\lim_{n \\to \\infty} ${body}`;
const INF = ['+\\infty', '-\\infty'];
/** Składnik „± c/nᵏ” (pusty dla c = 0). */
const tn = (c, k = 1) => (c === 0 ? '' : ` ${c < 0 ? '-' : '+'} \\frac{${Math.abs(c)}}{${k === 1 ? 'n' : `n^${k}`}}`);

// ---------- 6.1 Granica ciągu: dzielenie przez najwyższą potęgę ----------
const quadraticRatioLimit = (r) => {
  const a = r.intNot(-6, 6, 0);
  const d = r.intNot(-5, 5, 0);
  const b = r.int(-7, 7);
  const c = r.int(-7, 7);
  const e = r.intNot(-7, 7, 0);
  const expr = `\\frac{${polyN([a, b, c])}}{${polyN([d, 0, e])}}`;
  return mc({
    title: 'Granica ilorazu wielomianów tego samego stopnia',
    q: T`Granica $${lim(expr)}$ jest równa`,
    ok: m(fr(a, d)),
    val: a / d,
    bad: [m(fr(b, e)), m(fr(c, e)), m('0'), m(INF[0]), m(fr(a + b + c, d + e))],
    steps: [
      T`Dzielimy licznik i mianownik przez $n^2$: $\frac{${a}${tn(b)}${tn(c, 2)}}{${d}${tn(e, 2)}}$.`,
      T`Ułamki $\frac{\ldots}{n}$ i $\frac{\ldots}{n^2}$ dążą do $0$, więc granica to $${fr(a, d)}$.`
    ],
    trap: 'Przy tym samym stopniu licznika i mianownika granica to iloraz współczynników przy NAJWYŻSZYCH potęgach, a nie przy wyrazach wolnych.',
    tip: TIP_LIM
  });
};

const linearRatioLimit = (r) => {
  const a = r.intNot(-9, 9, 0);
  const c = r.pick([1, 2, 4, 5, -2, -4]);
  const b = r.int(-9, 9);
  const d = r.intNot(-9, 9, 0);
  return num({
    title: 'Granica ilorazu wyrażeń liniowych',
    q: T`Oblicz $${lim(`\\frac{${polyN([a, b])}}{${polyN([c, d])}}`)}$. Wpisz liczbę.`,
    ans: a / c,
    steps: [T`Dzielimy przez $n$: $\frac{${a}${tn(b)}}{${c}${tn(d)}}$.`, T`Granica: $\frac{${a}}{${c}} = ${dec(a / c, 2)}$.`],
    trap: 'Wyrazy wolne nie mają wpływu na granicę – dążą do zera po podzieleniu przez $n$.',
    tip: TIP_LIM
  });
};

const degreeComparison = (r) => {
  const kind = r.pick(['lower', 'higher']);
  const a = r.intNot(-6, 6, 0);
  const d = r.intNot(-6, 6, 0);
  const b = r.int(-6, 6);
  const e = r.int(-6, 6);
  const numer = kind === 'lower' ? polyN([a, b]) : polyN([a, 0, b]);
  const denom = kind === 'lower' ? polyN([d, 0, e]) : polyN([d, e]);
  const res = kind === 'lower' ? '0' : a / d > 0 ? INF[0] : INF[1];
  return mc({
    title: 'Granica przy różnych stopniach licznika i mianownika',
    q: T`Granica $${lim(`\\frac{${numer}}{${denom}}`)}$ jest równa`,
    ok: m(res),
    bad: [m(fr(a, d)), ...['0', ...INF].filter((x) => x !== res).map(m), m(fr(b, e || 1))],
    steps: [
      kind === 'lower' ? T`Stopień licznika ($1$) jest mniejszy niż mianownika ($2$) – dzielimy przez $n^2$: licznik dąży do $0$, mianownik do $${d}$.` : T`Stopień licznika ($2$) jest większy niż mianownika ($1$) – dzielimy przez $n$: licznik rośnie nieograniczenie, mianownik dąży do $${d}$.`,
      T`Granica: $${res}$.`
    ],
    trap: kind === 'lower' ? 'Gdy mianownik „rośnie szybciej”, iloraz dąży do zera.' : T`Znak nieskończoności zależy od znaków współczynników przy najwyższych potęgach: $\frac{${a}}{${d}}$.`,
    tip: TIP_LIM
  });
};

const LIMIT_FACTS = [
  [T`$${lim('\\frac{1}{n}')} = 0$.`, true, 'Odwrotności liczb naturalnych dowolnie zbliżają się do zera.'],
  [T`$${lim('\\sqrt[n]{a}')} = 1$ dla każdej liczby $a > 0$.`, true, 'Granica z karty wzorów (str. 10).'],
  [T`$${lim('\\frac{n + 1}{n}')} = 2$.`, false, T`$\frac{n + 1}{n} = 1 + \frac{1}{n}$, więc granica to $1$.`],
  [T`$${lim('(\\sqrt{n + 1} - \\sqrt{n})')} = 1$.`, false, T`Po pomnożeniu przez sprzężenie: $\frac{1}{\sqrt{n + 1} + \sqrt{n}} \to 0$.`],
  [T`$${lim('\\frac{2n^2}{n^2 + 1}')} = 2$.`, true, 'Iloraz współczynników przy $n^2$.'],
  [T`Jeśli $${lim('a_n')} = 3$ i $${lim('b_n')} = 2$, to $${lim('(a_n \\cdot b_n)')} = 6$.`, true, 'Twierdzenie o granicy iloczynu ciągów zbieżnych.']
];

const limitFacts = (r) => {
  const [s1, s2] = pickTwo(r, LIMIT_FACTS);
  return pf({ title: 'Granice ciągów', s1, s2, trap: 'Symbol $\\frac{\\infty}{\\infty}$ nie ma wartości – wyrażenie trzeba najpierw przekształcić.', tip: TIP_LIM });
};

const openSquaredLimit = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.intNot(-6, 6, 0);
  const c = r.pick([1, 2, 3, 4, 5, -2]);
  const d = r.intNot(-6, 6, 0);
  const res = fr(a * a, c);
  return open({
    title: 'Granica ciągu z kwadratem dwumianu',
    q: T`Oblicz granicę $${lim(`\\frac{(${polyN([a, b])})^2}{${polyN([c, 0, d])}}`)}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Rozwinięcie licznika i podzielenie licznika oraz mianownika przez $n^2$: $\frac{${a * a}${tn(2 * a * b)}${tn(b * b, 2)}}{${c}${tn(d, 2)}}$.`],
      [2, 'Komplet', T`Obliczenie granicy: $${res}$.`]
    ],
    steps: [
      T`$(${polyN([a, b])})^2 = ${polyN([a * a, 2 * a * b, b * b])}$.`,
      T`Dzielimy przez $n^2$: $\frac{${a * a}${tn(2 * a * b)}${tn(b * b, 2)}}{${c}${tn(d, 2)}}$; ułamki z $n$ w mianowniku dążą do $0$.`,
      T`Granica: $${res}$.`
    ],
    trap: T`Licznik jest stopnia drugiego – współczynnik przy $n^2$ to $${a < 0 ? `(${a})` : a}^2 = ${a * a}$, a nie $${a}$.`,
    tip: TIP_LIM,
    answer: m(res)
  });
};

// ---------- 6.2 Pierwiastki i twierdzenie o trzech ciągach ----------
const conjugateLimit = (r) => {
  const a = r.intNot(-8, 8, 0);
  const b = r.int(-5, 5);
  const inner = polyN([1, a, b]);
  return mc({
    title: 'Granica różnicy z pierwiastkiem',
    q: T`Granica $${lim(`\\left(\\sqrt{${inner}} - n\\right)`)}$ jest równa`,
    ok: m(numTex(a / 2)),
    val: a / 2,
    bad: [m('0'), m(`${a}`), m(INF[0]), m(numTex(a / 4)), m(`${2 * a}`)],
    steps: [
      T`Mnożymy przez sprzężenie: $\frac{${inner} - n^2}{\sqrt{${inner}} + n} = \frac{${polyN([a, b])}}{\sqrt{${inner}} + n}$.`,
      T`Dzielimy przez $n$: $\frac{${a}${tn(b)}}{\sqrt{1${tn(a)}${tn(b, 2)}} + 1} \to ${numTex(a / 2)}$.`
    ],
    trap: 'To NIE jest „$\\infty - \\infty = 0$”. Taka różnica wymaga pomnożenia przez sprzężenie.',
    tip: TIP_LIM
  });
};

const rootRatioLimit = (r) => {
  const s = r.int(1, 5);
  const b = r.int(1, 9);
  const c = r.pick([1, 2, 4, 5]);
  const d = r.int(-6, 6);
  return num({
    title: 'Granica ilorazu z pierwiastkiem',
    q: T`Oblicz $${lim(`\\frac{\\sqrt{${s * s === 1 ? '' : s * s}n^2 + ${b}}}{${polyN([c, d])}}`)}$. Wpisz liczbę.`,
    ans: s / c,
    steps: [T`Dzielimy przez $n$ (dla $n > 0$: $\frac{\sqrt{${s * s}n^2 + ${b}}}{n} = \sqrt{${s * s}${tn(b, 2)}}$).`, T`Granica: $\frac{\sqrt{${s * s}}}{${c}} = ${dec(s / c, 2)}$.`],
    trap: T`Wyrażenie $n$ „wchodzi” pod pierwiastek jako $n^2$: $\frac{\sqrt{A}}{n} = \sqrt{\frac{A}{n^2}}$.`,
    tip: TIP_LIM
  });
};

const squeezeLimit = (r) => {
  const a = r.intNot(-6, 6, 0);
  const b = r.pick([1, 2, 3, 4, 5]);
  const c = r.int(1, 5);
  return mc({
    title: 'Twierdzenie o trzech ciągach',
    q: T`Granica $${lim(`\\frac{${co(a, 'n')} + ${c}\\cdot(-1)^n}{${co(b, 'n')}}`)}$ jest równa`,
    ok: m(fr(a, b)),
    val: a / b,
    bad: [m('0'), m(fr(a + c, b)), m(fr(a - c, b)), m(INF[0])],
    steps: [
      T`$-${c} \le ${c}(-1)^n \le ${c}$, więc $\frac{${co(a, 'n')} - ${c}}{${co(b, 'n')}} \le a_n \le \frac{${co(a, 'n')} + ${c}}{${co(b, 'n')}}$.`,
      T`Oba ciągi ograniczające dążą do $${fr(a, b)}$, więc z twierdzenia o trzech ciągach $a_n \to ${fr(a, b)}$.`
    ],
    trap: T`Ciąg $(-1)^n$ nie ma granicy, ale po podzieleniu przez $n$ jego wpływ znika.`,
    tip: 'Karta wzorów, str. 10: jeśli $a_n \\le b_n \\le c_n$ i $a_n, c_n \\to g$, to $b_n \\to g$.'
  });
};

const ROOT_FACTS = [
  [T`Jeśli $a_n \le b_n \le c_n$ dla $n \ge 1$ oraz $${lim('a_n')} = ${lim('c_n')} = g$, to $${lim('b_n')} = g$.`, true, 'Twierdzenie o trzech ciągach (karta wzorów, str. 10).'],
  [T`$${lim('(\\sqrt{n^2 + n} - n)')} = 0$.`, false, T`Po pomnożeniu przez sprzężenie: $\frac{n}{\sqrt{n^2 + n} + n} \to \frac{1}{2}$.`],
  [T`$${lim('\\frac{(-1)^n}{n}')} = 0$.`, true, T`$-\frac{1}{n} \le \frac{(-1)^n}{n} \le \frac{1}{n}$.`],
  [T`Ciąg $a_n = (-1)^n$ jest zbieżny.`, false, T`Wyrazy skaczą między $-1$ a $1$ – ciąg nie ma granicy.`],
  [T`$${lim('\\frac{\\sqrt{4n^2 + 1}}{n}')} = 2$.`, true, T`$\sqrt{4 + \frac{1}{n^2}} \to 2$.`]
];

const rootFacts = (r) => {
  const [s1, s2] = pickTwo(r, ROOT_FACTS);
  return pf({ title: 'Pierwiastki i trzy ciągi', s1, s2, trap: 'Ciąg ograniczony podzielony przez $n$ zawsze dąży do zera.', tip: TIP_LIM });
};

const openConjugateLimit = (r) => {
  const a = r.intNot(-8, 8, 0);
  const b = r.intNot(-6, 6, 0);
  const inner = polyN([1, a, b]);
  const res = numTex(a / 2);
  return open({
    title: 'Granica różnicy z pierwiastkiem – sprzężenie',
    q: T`Oblicz granicę $${lim(`\\left(\\sqrt{${inner}} - n\\right)`)}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Pomnożenie przez sprzężenie: $\frac{${inner} - n^2}{\sqrt{${inner}} + n}$.`],
      [2, 'Etap 2', T`Uproszczenie licznika i podzielenie przez $n$: $\frac{${a}${tn(b)}}{\sqrt{1${tn(a)}${tn(b, 2)}} + 1}$.`],
      [3, 'Komplet', T`Obliczenie granicy: $${res}$.`]
    ],
    steps: [
      T`$\sqrt{${inner}} - n = \frac{(\sqrt{${inner}} - n)(\sqrt{${inner}} + n)}{\sqrt{${inner}} + n} = \frac{${polyN([a, b])}}{\sqrt{${inner}} + n}$.`,
      T`Dzielimy licznik i mianownik przez $n$: $\frac{${a}${tn(b)}}{\sqrt{1${tn(a)}${tn(b, 2)}} + 1}$.`,
      T`Licznik dąży do $${a}$, mianownik do $2$, więc granica to $${res}$.`
    ],
    trap: 'Różnica dwóch wyrażeń dążących do nieskończoności może mieć dowolną granicę – nie zakładaj, że to zero.',
    tip: TIP_LIM,
    answer: m(res)
  });
};

// ---------- 6.3 Szereg geometryczny ----------
const RATIOS = [[1, 2], [-1, 2], [1, 3], [-1, 3], [1, 4], [-1, 4], [2, 3], [3, 4], [1, 5]];
const term = (a1n, a1d, qn, qd, k) => fr(a1n * qn ** k, a1d * qd ** k);

const seriesSum = (r) => {
  const [qn, qd] = r.pick(RATIOS);
  const a1 = r.intNot(-12, 12, 0);
  const S = (a1 * qd) / (qd - qn);
  need(Math.abs(S * 100 - Math.round(S * 100)) < 1e-9);
  const terms = [0, 1, 2].map((k) => term(a1, 1, qn, qd, k));
  return num({
    title: 'Suma szeregu geometrycznego',
    q: T`Oblicz sumę wszystkich wyrazów nieskończonego ciągu geometrycznego $${terms.join(',\; ')},\; \ldots$. Wpisz liczbę.`,
    ans: S,
    steps: [T`$a_1 = ${a1}$, $q = ${fr(qn, qd)}$; $|q| < 1$, więc szereg jest zbieżny.`, T`$S = \frac{${a1}}{1 - (${fr(qn, qd)})} = ${dec(S, 2)}$.`],
    trap: T`Iloraz liczysz jako drugi wyraz podzielony przez pierwszy – przy ujemnym $q$ wyrazy zmieniają znak.`,
    tip: TIP_SERIES
  });
};

const convergentChoice = (r) => {
  const [qn, qd] = r.pick(RATIOS);
  const bad = [[3, 2], [-2, 1], [1, 1], [5, 4], [-3, 2], [2, 1]];
  const series = (n, d) => `${[0, 1, 2].map((k) => term(d ** 2, 1, n, d, k)).join(' + ').replace(/\+ -/g, '- ')} + \\ldots`;
  return mc({
    title: 'Który szereg geometryczny jest zbieżny',
    q: 'Zbieżny jest szereg geometryczny',
    ask: true,
    ok: m(series(qn, qd)),
    bad: r.shuffle(bad).slice(0, 4).map(([n, d]) => m(series(n, d))),
    steps: [T`Szereg geometryczny jest zbieżny wtedy i tylko wtedy, gdy $|q| < 1$.`, T`Tylko szereg o ilorazie $q = ${fr(qn, qd)}$ spełnia ten warunek.`],
    trap: T`Dla $q = 1$ szereg $a + a + a + \ldots$ nie ma skończonej sumy, a dla $q = -1$ sumy częściowe skaczą.`,
    tip: TIP_SERIES
  });
};

const firstTermFromSum = (r) => {
  const [qn, qd] = r.pick(RATIOS);
  const S = r.intNot(-20, 20, 0);
  const a1 = (S * (qd - qn)) / qd;
  return num({
    title: 'Pierwszy wyraz z sumy szeregu',
    q: T`Suma wszystkich wyrazów nieskończonego ciągu geometrycznego o ilorazie $q = ${fr(qn, qd)}$ jest równa $${S}$. Oblicz pierwszy wyraz tego ciągu. Wpisz liczbę.`,
    ans: a1,
    steps: [T`$\frac{a_1}{1 - q} = ${S}$, więc $a_1 = ${S} \cdot (1 - (${fr(qn, qd)}))$.`, T`$a_1 = ${S} \cdot ${fr(qd - qn, qd)} = ${dec(a1, 2)}$.`],
    trap: T`$1 - q$ przy ujemnym $q$ to $1 + |q|$ – uważaj na znak.`,
    tip: TIP_SERIES
  });
};

const SERIES_FACTS = [
  [T`Szereg geometryczny o ilorazie $q = -\frac{1}{2}$ jest zbieżny.`, true, T`$|q| = \frac{1}{2} < 1$.`],
  [T`Szereg $1 + 2 + 4 + 8 + \ldots$ ma sumę $\frac{1}{1 - 2} = -1$.`, false, T`$|q| = 2 > 1$ – szereg jest rozbieżny, wzoru nie wolno użyć.`],
  [T`Suma szeregu $1 + \frac{1}{3} + \frac{1}{9} + \ldots$ jest równa $\frac{3}{2}$.`, true, T`$\frac{1}{1 - \frac{1}{3}} = \frac{3}{2}$.`],
  [T`Szereg geometryczny o ilorazie $q = 1$ jest zbieżny.`, false, 'Dla $a_1 \\ne 0$ sumy częściowe rosną nieograniczenie.'],
  [T`Suma szeregu geometrycznego o $a_1 > 0$ i $0 < q < 1$ jest większa od $a_1$.`, true, T`$\frac{a_1}{1 - q} > a_1$, bo $0 < 1 - q < 1$.`]
];

const seriesFacts = (r) => {
  const [s1, s2] = pickTwo(r, SERIES_FACTS);
  return pf({ title: 'Szereg geometryczny', s1, s2, trap: 'Wzór na sumę wolno stosować tylko dla $|q| < 1$.', tip: TIP_SERIES });
};

const openSeriesEquation = (r) => {
  const a = r.int(1, 6);
  const reject = r.rnd() < 0.2;
  const S = reject ? -r.int(1, 6) : r.intNot(a + 1, a + 12, 2 * a);
  const x = 1 - a / S;
  const valid = Math.abs(x) < 1;
  need(valid !== reject);
  const answer = valid ? `x = ${numTex(x)}` : '\\text{brak rozwiązań}';
  return open({
    title: 'Równanie z sumą szeregu geometrycznego',
    q: T`Rozwiąż równanie $${a} + ${a}x + ${a}x^2 + ${a}x^3 + \ldots = ${S}$, w którym lewa strona jest sumą wszystkich wyrazów nieskończonego ciągu geometrycznego. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie warunku zbieżności: $|x| < 1$.`],
      [2, 'Etap 2', T`Zapisanie równania $\frac{${a}}{1 - x} = ${S}$.`],
      [3, 'Komplet', valid ? T`Rozwiązanie $x = ${numTex(x)}$ i sprawdzenie, że $|x| < 1$.` : T`Otrzymanie $x = ${numTex(x)}$ i odrzucenie go, bo $|x| \ge 1$ – brak rozwiązań.`]
    ],
    steps: [
      T`$a_1 = ${a}$, $q = x$. Szereg jest zbieżny dla $|x| < 1$.`,
      T`$\frac{${a}}{1 - x} = ${S}$, więc $1 - x = ${fr(a, S)}$ i $x = ${numTex(x)}$.`,
      valid ? T`$|${numTex(x)}| < 1$ – rozwiązanie spełnia warunek.` : T`$|${numTex(x)}| \ge 1$ – szereg jest wtedy rozbieżny, więc równanie nie ma rozwiązań.`
    ],
    trap: 'Rozwiązanie musi spełniać warunek zbieżności $|q| < 1$ – inaczej lewa strona nie ma wartości.',
    tip: TIP_SERIES,
    answer: m(answer)
  });
};

// ---------- 6.4 Szereg w równaniach i nierównościach ----------
const convergenceSet = (r) => {
  const a = r.int(-4, 4);
  const c = r.pick([1, 2, 3]);
  const base = c === 1 ? `(${xm(a)})` : `${c}${a === 0 ? 'x' : `(${xm(a)})`}`;
  const lo = a - 1 / c;
  const hi = a + 1 / c;
  return mc({
    title: 'Warunek zbieżności szeregu z parametrem',
    q: T`Szereg geometryczny $1 + ${base} + ${base.startsWith('(') ? base : `(${base})`}^2 + \ldots$ jest zbieżny wtedy i tylko wtedy, gdy`,
    ok: m(`x \\in ${iv.oo(numTex(lo), numTex(hi))}`),
    bad: [m(`x \\in ${iv.cc(numTex(lo), numTex(hi))}`), m(`x \\in ${iv.oo(numTex(a - c), numTex(a + c))}`), m(`x \\in ${iv.oo(numTex(-a - 1 / c), numTex(-a + 1 / c))}`), m(`x \\in ${iv.lo(numTex(hi))}`)],
    steps: [T`Iloraz: $q = ${base}$.`, T`$|q| < 1$, czyli $|${c === 1 ? xm(a) : `${c}${a === 0 ? 'x' : `(${xm(a)})`}`}| < 1$, więc $x \in ${iv.oo(numTex(lo), numTex(hi))}$.`],
    trap: 'Warunek zbieżności to nierówność OSTRA – końce przedziału nie należą do odpowiedzi.',
    tip: TIP_SERIES
  });
};

const geometricAreas = (r) => {
  const a = r.pick([3, 6, 9, 12]);
  const kind = r.pick(['area', 'perimeter']);
  const val = kind === 'area' ? (4 * a * a) / 3 : 8 * a;
  return num({
    title: 'Nieskończony ciąg kwadratów',
    q: T`Narysowano kwadrat o boku $${a}$, potem kwadrat o boku dwa razy krótszym, potem znów dwa razy krótszym itd. (nieskończenie wiele kwadratów). Oblicz sumę ${kind === 'area' ? 'pól' : 'obwodów'} wszystkich kwadratów. Wpisz liczbę.`,
    ans: val,
    steps: kind === 'area' ? [T`Pola tworzą ciąg geometryczny: $a_1 = ${a * a}$, $q = \frac{1}{4}$.`, T`$S = \frac{${a * a}}{1 - \frac{1}{4}} = ${dec(val, 2)}$.`] : [T`Obwody tworzą ciąg geometryczny: $a_1 = ${4 * a}$, $q = \frac{1}{2}$.`, T`$S = \frac{${4 * a}}{1 - \frac{1}{2}} = ${val}$.`],
    trap: kind === 'area' ? 'Gdy bok maleje dwa razy, pole maleje CZTERY razy – iloraz ciągu pól to $\\frac{1}{4}$.' : 'Obwód zmienia się tak jak bok – iloraz to $\\frac{1}{2}$.',
    tip: TIP_SERIES
  });
};

const seriesInequality = (r) => {
  const k = r.int(2, 5);
  const S = intersect(gt(1 - 1 / k), lt(1));
  return mc({
    title: 'Nierówność z sumą szeregu',
    q: T`Zbiór wszystkich liczb $x$, dla których suma szeregu $1 + x + x^2 + \ldots$ istnieje i jest większa od $${k}$, to`,
    ok: m(fmt(S)),
    bad: [m(iv.ro(numTex(1 - 1 / k))), m(iv.oo(-1, numTex(1 - 1 / k))), m(iv.co(numTex(1 - 1 / k), 1)), m(iv.oo(numTex(1 / k), 1))],
    steps: [T`Szereg jest zbieżny dla $|x| < 1$, a suma to $\frac{1}{1 - x}$.`, T`Dla $x < 1$: $\frac{1}{1 - x} > ${k}$, czyli $1 - x < ${fr(1, k)}$, więc $x > ${numTex(1 - 1 / k)}$.`, T`Część wspólna z $(-1, 1)$: $${fmt(S)}$.`],
    trap: 'Nie zapomnij o warunku zbieżności – bez niego odpowiedź zawiera liczby, dla których szereg nie ma sumy.',
    tip: TIP_SERIES
  });
};

const SERIES_EQ_FACTS = [
  [T`Suma szeregu $1 + x + x^2 + \ldots$ dla $|x| < 1$ jest równa $\frac{1}{1 - x}$.`, true, T`$a_1 = 1$, $q = x$.`],
  [T`Równanie $1 + x + x^2 + \ldots = \frac{1}{2}$ ma rozwiązanie $x = -1$.`, false, T`Dla $x = -1$ szereg jest rozbieżny.`],
  [T`Szereg $1 + 2x + 4x^2 + \ldots$ jest zbieżny dla $x = \frac{1}{4}$.`, true, T`$q = 2x = \frac{1}{2}$, $|q| < 1$.`],
  [T`Szereg $1 + 2x + 4x^2 + \ldots$ jest zbieżny dla $x = \frac{1}{2}$.`, false, T`$q = 2x = 1$ – szereg rozbieżny.`]
];

const seriesEquationFacts = (r) => {
  const [s1, s2] = pickTwo(r, SERIES_EQ_FACTS);
  return pf({ title: 'Szereg z niewiadomą', s1, s2, trap: 'Każde rozwiązanie sprawdź z warunkiem $|q| < 1$.', tip: TIP_SERIES });
};

const openSeriesInequality = (r) => {
  const c = r.pick([2, 3]);
  const k = r.int(2, 5);
  const hi = (k - 1) / (c * k);
  const S = intersect(quadIneq(-1 / c, 1 / c, '<'), lt(hi, true));
  const q = T`Rozwiąż nierówność $1 + ${c}x + ${c * c}x^2 + ${c ** 3}x^3 + \ldots \le ${k}$, w której lewa strona jest sumą wszystkich wyrazów nieskończonego ciągu geometrycznego. Zapisz obliczenia.`;
  const g = (x) => Math.abs(c * x) < 1 && 1 / (1 - c * x) <= k + 1e-12;
  verifySet(S, g, g, q, 2, 1 / 120);
  return open({
    title: 'Nierówność z sumą szeregu geometrycznego',
    q,
    stages: [
      [1, 'Etap 1', T`Zapisanie warunku zbieżności $|${c}x| < 1$, czyli $x \in ${iv.oo(numTex(-1 / c), numTex(1 / c))}$.`],
      [2, 'Etap 2', T`Zapisanie sumy szeregu: $\frac{1}{1 - ${c}x}$.`],
      [3, 'Etap 3', T`Rozwiązanie nierówności $\frac{1}{1 - ${c}x} \le ${k}$: $x \le ${numTex(hi)}$.`],
      [4, 'Komplet', T`Część wspólna: $x \in ${fmt(S)}$.`]
    ],
    steps: [
      T`$a_1 = 1$, $q = ${c}x$. Szereg jest zbieżny dla $|${c}x| < 1$, czyli $x \in ${iv.oo(numTex(-1 / c), numTex(1 / c))}$.`,
      T`Suma: $\frac{1}{1 - ${c}x}$. W tym przedziale $1 - ${c}x > 0$, więc mnożymy bez zmiany znaku: $1 \le ${k}(1 - ${c}x)$.`,
      T`$${c * k}x \le ${k - 1}$, czyli $x \le ${numTex(hi)}$. Część wspólna: $${fmt(S)}$.`
    ],
    trap: 'Mnożenie przez $1 - cx$ jest dozwolone tylko dlatego, że w przedziale zbieżności to wyrażenie jest dodatnie – napisz to.',
    tip: TIP_SERIES,
    answer: m(`x \\in ${fmt(S)}`)
  });
};

// ---------- 6.5 Ciąg arytmetyczny i geometryczny razem ----------
const AG_PAIRS = [[1, 9], [2, 8], [4, 16], [1, 25], [9, 25], [2, 18], [4, 36], [1, 49]];

const arithmeticGeometricPair = (r) => {
  const [x, y] = r.pick(AG_PAIRS);
  const b = (x + y) / 2;
  const d = Math.sqrt(x * y);
  const ask = r.pick(['diff', 'sumsq']);
  return num({
    title: 'Średnia arytmetyczna i geometryczna dwóch liczb',
    q: T`Dodatnie liczby $x < y$ są takie, że liczby $x, ${dec(b, 2)}, y$ tworzą ciąg arytmetyczny, a liczby $x, ${d}, y$ – ciąg geometryczny. Oblicz ${ask === 'diff' ? '$y - x$' : '$x^2 + y^2$'}. Wpisz liczbę.`,
    ans: ask === 'diff' ? y - x : x * x + y * y,
    steps: [
      T`Z ciągu arytmetycznego: $x + y = ${x + y}$. Z ciągu geometrycznego: $xy = ${x * y}$.`,
      ask === 'diff' ? T`$(y - x)^2 = (x + y)^2 - 4xy = ${(x + y) ** 2 - 4 * x * y}$, więc $y - x = ${y - x}$.` : T`$x^2 + y^2 = (x + y)^2 - 2xy = ${x * x + y * y}$.`
    ],
    trap: 'Środkowy wyraz ciągu arytmetycznego to średnia arytmetyczna sąsiadów, a geometrycznego – średnia geometryczna (przy dodatnich wyrazach).',
    tip: TIP_SEQ
  });
};

const geometricUnknown = (r) => {
  const k = r.int(1, 8);
  const form = r.pick([1, 2]);
  const [t, x] = form === 1 ? [`${xm(k)},\\; x,\\; x + ${2 * k}`, 2 * k] : [`x + ${k},\\; x + ${3 * k},\\; x + ${7 * k}`, k];
  return mc({
    title: 'Niewiadoma w ciągu geometrycznym',
    q: T`Liczby $${t}$ (w podanej kolejności) tworzą ciąg geometryczny o wyrazach różnych od zera. Wtedy $x$ jest równe`,
    ok: m(x),
    val: x,
    bad: [m(k === x ? 2 * x : k), m(4 * k), m(-x), m(3 * k)],
    steps: form === 1 ? [T`$x^2 = (${xm(k)})(x + ${2 * k}) = x^2 + ${k}x - ${2 * k * k}$.`, T`$${k}x = ${2 * k * k}$, więc $x = ${x}$.`] : [T`$(x + ${3 * k})^2 = (x + ${k})(x + ${7 * k})$, czyli $x^2 + ${6 * k}x + ${9 * k * k} = x^2 + ${8 * k}x + ${7 * k * k}$.`, T`$${2 * k * k} = ${2 * k}x$, więc $x = ${x}$.`],
    trap: 'Warunek ciągu geometrycznego to kwadrat środkowego wyrazu równy iloczynowi skrajnych – nie średnia arytmetyczna.',
    tip: TIP_SEQ
  });
};

const arithmeticSumFromTerms = (r) => {
  const a1 = r.int(-10, 10);
  const d = r.intNot(-5, 5, 0);
  const n = r.pick([10, 12, 15, 20]);
  const a3 = a1 + 2 * d;
  const a7 = a1 + 6 * d;
  const Sn = (n * (2 * a1 + (n - 1) * d)) / 2;
  return num({
    title: 'Suma ciągu arytmetycznego z dwóch wyrazów',
    q: T`W ciągu arytmetycznym $(a_n)$ jest $a_3 = ${a3}$ oraz $a_7 = ${a7}$. Oblicz sumę $${n}$ początkowych wyrazów tego ciągu. Wpisz liczbę.`,
    ans: Sn,
    steps: [T`$a_7 - a_3 = 4r = ${a7 - a3}$, więc $r = ${d}$, a $a_1 = a_3 - 2r = ${a1}$.`, T`$S_{${n}} = \frac{2a_1 + ${n - 1}r}{2} \cdot ${n} = ${Sn}$.`],
    trap: 'Między $a_3$ a $a_7$ są cztery „kroki” różnicy, a nie siedem.',
    tip: TIP_SEQ
  });
};

const SEQ_FACTS = [
  [T`Liczby $a, b, c$ tworzą ciąg arytmetyczny wtedy i tylko wtedy, gdy $2b = a + c$.`, true, 'Środkowy wyraz to średnia arytmetyczna sąsiednich.'],
  [T`Liczby $2, 6, 18$ tworzą ciąg arytmetyczny.`, false, T`$6 - 2 \ne 18 - 6$; to ciąg geometryczny ($q = 3$).`],
  [T`Jeśli $a, b, c$ tworzą ciąg geometryczny, to $b^2 = ac$.`, true, T`$b = aq$, $c = aq^2$, więc $b^2 = a^2 q^2 = ac$.`],
  [T`Ciąg stały $5, 5, 5, \ldots$ jest zarazem arytmetyczny i geometryczny.`, true, T`$r = 0$ i $q = 1$.`],
  [T`Jeśli $b^2 = ac$, to $a, b, c$ zawsze tworzą ciąg geometryczny.`, false, T`$a = 0$, $b = 0$, $c = 5$: $b^2 = ac$, ale ciąg geometryczny nie może mieć wyrazu $0$ przed niezerowym.`]
];

const sequenceFacts = (r) => {
  const [s1, s2] = pickTwo(r, SEQ_FACTS);
  return pf({ title: 'Ciąg arytmetyczny i geometryczny', s1, s2, trap: 'Warunek $b^2 = ac$ jest konieczny, ale przy zerowych wyrazach nie wystarcza.', tip: TIP_SEQ });
};

const openArithmeticGeometric = (r) => {
  const b = r.int(3, 12);
  const r0 = r.intNot(-6, 6, 0);
  const g = r.intNot(-6, 12, 0);
  const qq = r.intNot(-3, 4, 0, 1);
  const [s1, s2, s3] = [g - (b - r0), g * qq - b, g * qq * qq - (b + r0)];
  need([s1, s2, s3].every((s) => s !== 0 && Math.abs(s) <= 20));
  const A = b + s1;
  const B = b + s3;
  const C = b + s2;
  const r1 = A - B - r0;
  const sols = [...new Set([r0, r1])].filter((rr) => A - rr !== 0 && C !== 0 && B + rr !== 0);
  need(sols.length === 2);
  for (const rr of sols) if ((A - rr) * (B + rr) !== C * C) throw new Error('6.5: kontrola ciągu geometrycznego');
  const triples = sols.sort((x, y) => x - y).map((rr) => `(${b - rr}, ${b}, ${b + rr})`);
  // „do pierwszej z nich dodamy 3”, „od drugiej odejmiemy 7”
  const sh = (s, which) => (s > 0 ? `do ${which} dodamy $${s}$` : `od ${which} odejmiemy $${-s}$`);
  const minusR = A === 0 ? '-r' : `${A} - r`;
  const plusR = B === 0 ? 'r' : `${B} + r`;
  const sq = `${C < 0 ? `(${C})` : C}^2`;
  const eqR = poly([[1, 'r^2'], [-(A - B), 'r'], [C * C - A * B, '']]);
  return open({
    title: 'Ciąg arytmetyczny przechodzący w geometryczny',
    q: T`Trzy liczby tworzą ciąg arytmetyczny, a ich suma jest równa $${3 * b}$. Jeśli ${sh(s1, 'pierwszej z nich')}, ${sh(s2, 'drugiej')}, a ${sh(s3, 'trzeciej')}, to otrzymamy (w tej kolejności) ciąg geometryczny. Wyznacz te trzy liczby. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie liczb jako $${b} - r$, $${b}$, $${b} + r$ (z warunku sumy).`],
      [2, 'Etap 2', T`Zapisanie warunku ciągu geometrycznego: $(${minusR})(${plusR}) = ${sq}$.`],
      [3, 'Etap 3', T`Doprowadzenie do równania kwadratowego: $${eqR} = 0$.`],
      [4, 'Etap 4', T`Rozwiązanie równania: $r = ${sols[0]}$ lub $r = ${sols[1]}$.`],
      [5, 'Komplet', T`Podanie obu trójek liczb: $${triples.join('$ oraz $')}$.`]
    ],
    steps: [
      T`Ciąg arytmetyczny: $${b} - r$, $${b}$, $${b} + r$ (bo suma $3 \cdot ${b} = ${3 * b}$).`,
      T`Po zmianach: $${minusR}$, $${C}$, $${plusR}$ – ciąg geometryczny, więc $${sq} = (${minusR})(${plusR})$.`,
      T`$${eqR} = 0$, więc $r = ${sols[0]}$ lub $r = ${sols[1]}$.`,
      T`Odpowiedź: $${triples.join('$ lub $')}$.`
    ],
    trap: 'Oba rozwiązania równania kwadratowego dają poprawne trójki – podanie tylko jednej to utrata ostatniego punktu.',
    tip: TIP_SEQ,
    answer: m(triples.join('\\; \\text{lub} \\; '))
  });
};

export default {
  numericId: 6,
  title: 'Ciągi: granice i szereg geometryczny',
  short_title: 'Granice i szereg',
  description: 'Granice ciągów, twierdzenie o trzech ciągach, suma szeregu geometrycznego i zadania łączące ciąg arytmetyczny z geometrycznym.',
  icon: 'ListOrdered',
  color: '#FFB800',
  matura_points_range: '4–6 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 9–10',
  cke_stats: 'W 10 z 11 arkuszy CKE 2022–2026, średnio 5,1 pkt na arkusz; szereg geometryczny w 7 arkuszach.',
  lessons: [
    {
      title: 'Granica ciągu: dzielenie przez najwyższą potęgę',
      short_title: 'Granica ciągu',
      requirements: ['VI.R1'],
      prereq: ['math-lesson-7-1'],
      pill: pill({
        essence: T`Granica ciągu to liczba, do której wyrazy zbliżają się dowolnie blisko, gdy $n$ rośnie. Dla ilorazu wielomianów dzielisz licznik i mianownik przez najwyższą potęgę $n$ z mianownika: wszystkie ułamki typu $\frac{c}{n}$ znikają, zostają współczynniki przy najwyższych potęgach.`,
        context: 'Granice ciągów (VI.R1) pojawiają się na rozszerzeniu jako samodzielne zadanie za 2–3 pkt i w zadaniach z szeregiem.',
        pl: T`$\frac{3n^2 + 5n}{n^2 + 1}$ dla $n = 1000$: licznik to $3\,005\,000$, mianownik $1\,000\,001$ – prawie dokładnie $3$. Wyrazy $5n$ i $1$ są „okruchami” przy $n^2$. Granica to $3$.`,
        steps: [
          ['Najwyższa potęga', T`Znajdź najwyższą potęgę $n$ w mianowniku.`, 'Przez nią dzielisz.'],
          ['Podziel licznik i mianownik', T`Każdy wyraz osobno.`, 'Ułamki c/n dążą do 0.'],
          ['Odczytaj granicę', T`Iloraz współczynników, $0$ albo $\pm\infty$.`, 'Zależy od stopni.']
        ],
        formulas: [
          ['Granica ilorazu', T`\lim_{n \to \infty} \frac{a_n}{b_n} = \frac{a}{b}, \ b \ne 0`, 10],
          ['Podstawowa granica', T`\lim_{n \to \infty} \frac{1}{n} = 0`, 10],
          ['Te same stopnie', T`\lim \frac{an^k + \ldots}{bn^k + \ldots} = \frac{a}{b}`]
        ],
        examples: [
          ['Te same stopnie', '1 pkt', T`Oblicz $\lim \frac{4n^2 - n}{2n^2 + 3}$.`, T`1. Dzielimy przez $n^2$: $\frac{4 - \frac{1}{n}}{2 + \frac{3}{n^2}}$.` + '\n' + T`2. Granica: $2$.`, 'Iloraz współczynników przy n².'],
          ['Różne stopnie', '1 pkt', T`Oblicz $\lim \frac{3n + 1}{n^2 + 5}$.`, T`1. Dzielimy przez $n^2$: $\frac{\frac{3}{n} + \frac{1}{n^2}}{1 + \frac{5}{n^2}}$.` + '\n' + T`2. Granica: $0$.`, 'Mianownik rośnie szybciej.']
        ],
        trap: T`Zapis „$\frac{\infty}{\infty} = 1$” to błąd – wynik zależy od tego, JAK szybko rosną licznik i mianownik.`,
        fail: T`„$\lim \frac{2n}{n} = \frac{\infty}{\infty} = 1$.”`,
        win: T`$\frac{2n}{n} = 2$, więc granica to $2$.`,
        why: 'Symbole nieoznaczone trzeba usunąć przekształceniem.',
        ckeTip: 'Pokaż jawnie podzielenie przez najwyższą potęgę – za ten krok jest punkt nawet przy błędzie rachunkowym na końcu.',
        points: ['Dziel przez najwyższą potęgę z mianownika.', 'c/n dąży do 0.', 'Stopnie: równe – iloraz, licznik mniejszy – 0.']
      }),
      gens: [quadraticRatioLimit, linearRatioLimit, degreeComparison, limitFacts, openSquaredLimit]
    },
    {
      title: 'Granice z pierwiastkami i twierdzenie o trzech ciągach',
      short_title: 'Sprzężenie i trzy ciągi',
      requirements: ['VI.R1'],
      prereq: ['math-lesson-1-2'],
      pill: pill({
        essence: T`Różnicę typu $\sqrt{n^2 + an} - n$ mnożysz i dzielisz przez sprzężenie $\sqrt{n^2 + an} + n$ – pierwiastek znika z licznika i dalej dzielisz przez $n$. Gdy w ciągu jest składnik bez granicy, np. $(-1)^n$, ograniczasz go z obu stron ciągami o tej samej granicy (twierdzenie o trzech ciągach).`,
        context: 'Twierdzenie o trzech ciągach i granice z pierwiastkami to część wymagania VI.R1; oba narzędzia są na karcie wzorów (str. 10).',
        pl: T`$\sqrt{n^2 + 6n} - n$ wygląda na „nieskończoność minus nieskończoność”. Ale $\sqrt{n^2 + 6n}$ jest tylko trochę większe od $n$ – o około $3$. Sprzężenie pozwala policzyć to „trochę” dokładnie.`,
        steps: [
          ['Rozpoznaj typ', T`Różnica z pierwiastkiem albo składnik ograniczony.`, 'Sprzężenie albo trzy ciągi.'],
          ['Sprzężenie', T`$(A - B) = \frac{A^2 - B^2}{A + B}$.`, 'Pierwiastek znika z licznika.'],
          ['Trzy ciągi', T`$a_n \le b_n \le c_n$, ta sama granica skrajnych.`, 'Np. −1 ≤ (−1)ⁿ ≤ 1.']
        ],
        formulas: [
          ['Sprzężenie', T`\sqrt{a} - b = \frac{a - b^2}{\sqrt{a} + b}`],
          ['Trzy ciągi', T`a_n \le b_n \le c_n, \ \lim a_n = \lim c_n = g \ \Rightarrow \ \lim b_n = g`.replace('\\Rightarrow', '\\text{to}'), 10],
          ['Pierwiastek n-tego stopnia', T`\lim_{n \to \infty} \sqrt[n]{a} = 1, \ a > 0`, 10]
        ],
        examples: [
          ['Sprzężenie', '2 pkt', T`Oblicz $\lim (\sqrt{n^2 + 4n} - n)$.`, T`1. $\frac{4n}{\sqrt{n^2 + 4n} + n}$.` + '\n' + T`2. Dzielimy przez $n$: $\frac{4}{\sqrt{1 + \frac{4}{n}} + 1} \to 2$.`, 'Granica to połowa współczynnika przy n.'],
          ['Trzy ciągi', '1 pkt', T`Oblicz $\lim \frac{2n + (-1)^n}{n}$.`, T`1. $\frac{2n - 1}{n} \le a_n \le \frac{2n + 1}{n}$.` + '\n' + T`2. Oba ograniczenia dążą do $2$.`, 'Składnik ograniczony znika po podzieleniu przez n.']
        ],
        trap: T`Granica $\sqrt{n^2 + 4n} - n$ NIE jest zerem – po sprzężeniu wychodzi $2$.`,
        fail: T`„$\sqrt{n^2 + 4n} \approx n$, więc granica to $0$.”`,
        win: T`$\frac{4n}{\sqrt{n^2 + 4n} + n} \to 2$.`,
        why: 'Różnica rośnie razem z $n$ wolniej, ale nie znika – trzeba ją policzyć dokładnie.',
        ckeTip: 'Zapisz mnożenie przez sprzężenie jako osobny krok – to pierwszy etap w kluczu oceniania.',
        points: ['Różnica z pierwiastkiem – sprzężenie.', 'Składnik ograniczony – trzy ciągi.', 'Po przekształceniu dziel przez n.']
      }),
      gens: [conjugateLimit, rootRatioLimit, squeezeLimit, rootFacts, openConjugateLimit]
    },
    {
      title: 'Szereg geometryczny: zbieżność i suma',
      short_title: 'Suma szeregu',
      requirements: ['VI.R2'],
      prereq: ['math-lesson-7-4'],
      pill: pill({
        essence: T`Szereg geometryczny to suma nieskończenie wielu wyrazów ciągu geometrycznego. Ma skończoną sumę wtedy i tylko wtedy, gdy $|q| < 1$, i jest ona równa $\frac{a_1}{1 - q}$. Zawsze najpierw sprawdzasz warunek zbieżności – dla $|q| \ge 1$ wzór daje bzdury.`,
        context: 'Szereg geometryczny (VI.R2) był na 7 z 11 arkuszy CKE 2022–2026, łącznie 27 pkt – często w zadaniach za 4–5 pkt.',
        pl: T`$1 + \frac{1}{2} + \frac{1}{4} + \ldots$: idziesz do ściany odległej o $2$ m, za każdym razem pokonując połowę pozostałej drogi. Nigdy nie przekroczysz $2$ m, ale dojdziesz dowolnie blisko. Suma to $2$.`,
        steps: [
          ['Wyznacz q', T`$q = \frac{a_2}{a_1}$.`, 'Uwaga na znak.'],
          ['Sprawdź |q| < 1', T`Bez tego nie ma sumy.`, 'Zapisz to w rozwiązaniu.'],
          ['Policz sumę', T`$S = \frac{a_1}{1 - q}$.`, 'Przy ujemnym q: 1 − q = 1 + |q|.']
        ],
        formulas: [
          ['Suma szeregu', T`S = \frac{a_1}{1 - q}, \ |q| < 1`, 9],
          ['Iloraz', T`q = \frac{a_{n+1}}{a_n}`],
          ['Wyraz ogólny', T`a_n = a_1 q^{n-1}`, 9]
        ],
        examples: [
          ['Suma', '1 pkt', T`Oblicz $6 - 3 + \frac{3}{2} - \ldots$.`, T`1. $a_1 = 6$, $q = -\frac{1}{2}$.` + '\n' + T`2. $S = \frac{6}{\frac{3}{2}} = 4$.`, 'Ujemny iloraz zmniejsza sumę.'],
          ['Równanie', '3 pkt', T`Rozwiąż $2 + 2x + 2x^2 + \ldots = 5$.`, T`1. $|x| < 1$, $\frac{2}{1 - x} = 5$.` + '\n' + T`2. $x = \frac{3}{5}$ – spełnia warunek.`, 'Rozwiązanie zawsze sprawdź z |x| < 1.']
        ],
        trap: T`Dla $q = 2$ wzór daje $\frac{1}{1 - 2} = -1$ jako „sumę” $1 + 2 + 4 + \ldots$ – a ta suma rośnie bez końca.`,
        fail: T`„$1 + 2 + 4 + \ldots = -1$.”`,
        win: T`$|q| = 2 > 1$ – szereg rozbieżny, suma nie istnieje.`,
        why: 'Wzór na sumę wyprowadza się z granicy, która istnieje tylko dla |q| < 1.',
        ckeTip: 'W zadaniu z niewiadomą w ilorazie warunek $|q| < 1$ to osobny etap – za jego pominięcie tracisz punkt nawet przy dobrym wyniku.',
        points: ['Suma istnieje tylko dla |q| < 1.', 'S = a₁/(1 − q).', 'Rozwiązania sprawdzaj z warunkiem zbieżności.']
      }),
      gens: [seriesSum, convergentChoice, firstTermFromSum, seriesFacts, openSeriesEquation]
    },
    {
      title: 'Szereg geometryczny w równaniach i nierównościach',
      short_title: 'Szereg z parametrem',
      requirements: ['VI.R2'],
      prereq: ['math-lesson-3-3'],
      pill: pill({
        essence: T`Gdy iloraz szeregu zależy od $x$, zadanie ma zawsze dwa elementy: warunek zbieżności $|q(x)| < 1$ i równanie albo nierówność z sumą $\frac{a_1}{1 - q(x)}$. Odpowiedź to część wspólna. Szereg geometryczny opisuje też nieskończone ciągi figur – pól i obwodów.`,
        context: 'Szereg z niewiadomą to typowe zadanie za 4–5 pkt (np. maj 2025). Pola nieskończonego ciągu figur to zastosowanie w kontekście geometrycznym.',
        pl: T`Szereg $1 + 2x + 4x^2 + \ldots$ to „$1 + q + q^2 + \ldots$” dla $q = 2x$. Działa tylko wtedy, gdy $|2x| < 1$ – czyli dla $x$ między $-\frac{1}{2}$ a $\frac{1}{2}$. Poza tym przedziałem pytanie o sumę nie ma sensu.`,
        steps: [
          ['Iloraz z x', T`$q = q(x)$.`, 'Np. 2x albo x − 1.'],
          ['Warunek zbieżności', T`$|q(x)| < 1$ – przedział.`, 'Nierówność ostra.'],
          ['Suma i część wspólna', T`Rozwiąż z $\frac{a_1}{1 - q(x)}$, przetnij z warunkiem.`, 'Uwaga przy mnożeniu przez 1 − q.']
        ],
        formulas: [
          ['Suma szeregu', T`S = \frac{a_1}{1 - q}, \ |q| < 1`, 9],
          ['Warunek z modułem', T`|cx - d| < 1 \ \text{gdy} \ \frac{d - 1}{c} < x < \frac{d + 1}{c}, \ c > 0`],
          ['Pola przy podobieństwie', T`k \text{ – skala}, \ \text{pola} \cdot k^2`]
        ],
        examples: [
          ['Zbieżność', '1 pkt', T`Dla jakich $x$ szereg $1 + (x - 2) + (x - 2)^2 + \ldots$ jest zbieżny?`, T`1. $|x - 2| < 1$.` + '\n' + T`2. $x \in (1, 3)$.`, 'Iloraz to cały nawias.'],
          ['Nierówność', '4 pkt', T`Rozwiąż $1 + 2x + 4x^2 + \ldots \le 2$.`, T`1. $|2x| < 1$: $x \in (-\frac{1}{2}, \frac{1}{2})$.` + '\n' + T`2. $\frac{1}{1 - 2x} \le 2$, czyli $x \le \frac{1}{4}$.` + '\n' + T`3. $x \in (-\frac{1}{2}, \frac{1}{4} \rangle$.`, 'Na końcu część wspólna z warunkiem.']
        ],
        trap: 'Mnożąc nierówność przez $1 - q$, korzystasz z tego, że w przedziale zbieżności $1 - q > 0$ – bez warunku zbieżności to mnożenie jest nieuzasadnione.',
        fail: T`„$\frac{1}{1 - 2x} \le 2$, więc $x \le \frac{1}{4}$.”`,
        win: T`$x \in (-\frac{1}{2}, \frac{1}{4} \rangle$ – po uwzględnieniu zbieżności.`,
        why: 'Dla $x \\le -\\frac{1}{2}$ szereg nie ma sumy.',
        ckeTip: 'Zapisz warunek zbieżności na samym początku – w kluczu CKE to pierwszy punkt.',
        points: ['|q(x)| < 1 to przedział otwarty.', 'Suma przez wzór a₁/(1 − q).', 'Odpowiedź = część wspólna.']
      }),
      gens: [convergenceSet, geometricAreas, seriesInequality, seriesEquationFacts, openSeriesInequality]
    },
    {
      title: 'Ciąg arytmetyczny i geometryczny w jednym zadaniu',
      short_title: 'Ciągi razem',
      requirements: ['VI.7', 'VI.5', 'VI.6'],
      prereq: ['math-lesson-7-5'],
      pill: pill({
        essence: T`Zadania łączące oba ciągi opierają się na dwóch warunkach dla trzech kolejnych wyrazów: $2b = a + c$ (arytmetyczny) i $b^2 = ac$ (geometryczny). Liczby z ciągu arytmetycznego zapisujesz symetrycznie jako $b - r$, $b$, $b + r$ – wtedy z sumy od razu masz $b$, a warunek geometryczny daje równanie kwadratowe z $r$.`,
        context: 'Zadania z dwoma ciągami (VI.7) były na rozszerzeniu warte do 6 pkt (np. czerwiec 2023, maj 2024: 5 pkt).',
        pl: T`Trzy liczby arytmetyczne o sumie $15$: środkowa to na pewno $5$ (bo $3 \cdot 5 = 15$). Zostaje jedna niewiadoma – odstęp $r$. Zapis $5 - r, 5, 5 + r$ oszczędza połowę rachunków.`,
        steps: [
          ['Zapis symetryczny', T`$b - r$, $b$, $b + r$.`, 'Suma to 3b.'],
          ['Warunek geometryczny', T`Kwadrat środkowego = iloczyn skrajnych.`, 'Po zmianach z treści.'],
          ['Równanie z r', T`Kwadratowe – sprawdź oba rozwiązania.`, 'Często są dwie odpowiedzi.']
        ],
        formulas: [
          ['Arytmetyczny', T`2b = a + c`, 9],
          ['Geometryczny', T`b^2 = ac`, 9],
          ['Suma arytmetycznego', T`S_n = \frac{2a_1 + (n - 1)r}{2} \cdot n`, 9]
        ],
        examples: [
          ['Dwie średnie', '2 pkt', T`Liczby $x, 5, y$ tworzą ciąg arytmetyczny, a $x, 3, y$ – geometryczny. Oblicz $|x - y|$.`, T`1. $x + y = 10$, $xy = 9$.` + '\n' + T`2. $(x - y)^2 = 100 - 36 = 64$, $|x - y| = 8$.`, 'Wzory Viète’a w przebraniu.'],
          ['Trójka liczb', '5 pkt', T`Liczby $5 - r, 5, 5 + r$; po dodaniu $1$ do pierwszej i $3$ do trzeciej tworzą ciąg geometryczny.`, T`1. $(6 - r)(8 + r) = 25$.` + '\n' + T`2. $r^2 + 2r - 23 = 0$ – rozwiąż i sprawdź wyrazy.`, 'Warunek geometryczny daje równanie kwadratowe.']
        ],
        trap: 'Równanie kwadratowe z $r$ zwykle ma dwa rozwiązania – i oba mogą dawać poprawne trójki. Podanie jednej to niepełna odpowiedź.',
        fail: T`„$r = 2$, więc liczby to $3, 5, 7$.” (bez drugiego rozwiązania)`,
        win: T`$r = 2$ lub $r = -4$: liczby $3, 5, 7$ albo $9, 5, 1$.`,
        why: 'Obie trójki spełniają wszystkie warunki zadania.',
        ckeTip: 'Sprawdź, czy otrzymane wyrazy ciągu geometrycznego są różne od zera – inaczej trzeba odrzucić rozwiązanie.',
        points: ['Zapis b − r, b, b + r.', 'b² = ac dla geometrycznego.', 'Podaj wszystkie rozwiązania.']
      }),
      gens: [arithmeticGeometricPair, geometricUnknown, arithmeticSumFromTerms, sequenceFacts, openArithmeticGeometric]
    }
  ]
};
