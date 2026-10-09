import { T, mc, num, pf, pill, fr, par, poly, quad, lin, xm, m, need, gcd } from './lib.js';

const TIP_WSM = 'Karta wzorów, str. 7: $(a + b)^2 = a^2 + 2ab + b^2$, $(a - b)^2 = a^2 - 2ab + b^2$, $a^2 - b^2 = (a - b)(a + b)$.';
const ax = (a) => (a === 1 ? 'x' : a === -1 ? '-x' : `${a}x`);
const cf = (n) => (n === 1 ? '' : n === -1 ? '-' : `${n}`);

// ---------- 2.1 Wzory skróconego mnożenia ----------
const wsmSquare = (r) => {
  const a = r.int(1, 4);
  const b = r.int(1, 7);
  const minus = r.bool();
  const s = minus ? -1 : 1;
  return mc({
    title: 'Kwadrat sumy i kwadrat różnicy',
    q: T`Dla każdej liczby rzeczywistej $x$ wyrażenie $(${ax(a)} ${minus ? '-' : '+'} ${b})^2$ jest równe`,
    ok: m(quad(a * a, s * 2 * a * b, b * b)),
    bad: [m(quad(a * a, 0, b * b)), m(quad(a * a, s * a * b, b * b)), m(quad(a * a, 0, -b * b)), m(quad(a * a, -s * 2 * a * b, b * b)), m(quad(a * a, s * 2 * a * b, -b * b))],
    steps: [
      T`Stosujemy wzór $(a ${minus ? '-' : '+'} b)^2 = a^2 ${minus ? '-' : '+'} 2ab + b^2$ dla $a = ${ax(a)}$ i $b = ${b}$.`,
      T`$(${ax(a)})^2 = ${a * a === 1 ? '' : a * a}x^2$, $2 \cdot ${ax(a)} \cdot ${b} = ${2 * a * b}x$, $${b}^2 = ${b * b}$.`,
      T`Wynik: $${quad(a * a, s * 2 * a * b, b * b)}$.`
    ],
    trap: T`Kwadrat ${minus ? 'różnicy' : 'sumy'} to nie ${minus ? 'różnica' : 'suma'} kwadratów – zawsze pojawia się środkowy wyraz $2ab$.`,
    tip: TIP_WSM
  });
};
const wsmDiffOfSquares = (r) => {
  const a = r.int(1, 5);
  const b = r.int(1, 9);
  return mc({
    title: 'Różnica kwadratów',
    q: T`Dla każdej liczby rzeczywistej $x$ wyrażenie $(${ax(a)} - ${b})(${ax(a)} + ${b})$ jest równe`,
    ok: m(quad(a * a, 0, -b * b)),
    bad: [m(quad(a * a, 0, b * b)), m(quad(a * a, -2 * a * b, b * b)), m(quad(a * a, -2 * a * b, -b * b)), m(quad(a === 1 ? 2 : a, 0, -b * b)), m(quad(a * a, 0, -b))],
    steps: [T`To wzór $(a - b)(a + b) = a^2 - b^2$ dla $a = ${ax(a)}$ i $b = ${b}$.`, T`$(${ax(a)})^2 - ${b}^2 = ${quad(a * a, 0, -b * b)}$.`],
    trap: T`W iloczynie $(a - b)(a + b)$ wyrazy środkowe się znoszą, więc nie ma składnika z samym $x$.`,
    tip: TIP_WSM
  });
};
const wsmDifferenceOfTwoSquares = (r) => {
  const a = r.int(1, 8);
  const b = r.int(1, 8);
  // (x + a)^2 - (x - b)^2 = 2(a+b)x + a^2 - b^2
  return mc({
    title: 'Różnica dwóch kwadratów wyrażeń',
    q: T`Dla każdej liczby rzeczywistej $x$ wyrażenie $(x + ${a})^2 - (x - ${b})^2$ jest równe`,
    ok: m(lin(2 * (a + b), a * a - b * b)),
    bad: [m(`${a * a - b * b}`), m(lin(2 * (a - b), a * a - b * b)), m(lin(2 * (a + b), a * a + b * b)), m(quad(2, 2 * (a - b), a * a + b * b)), m(lin(a + b, a * a - b * b))],
    steps: [
      T`Rozwijamy oba kwadraty: $(x + ${a})^2 = ${quad(1, 2 * a, a * a)}$ oraz $(x - ${b})^2 = ${quad(1, -2 * b, b * b)}$.`,
      T`Odejmujemy, zmieniając znaki w drugim nawiasie: $${quad(1, 2 * a, a * a)} - x^2 + ${2 * b}x - ${b * b} = ${lin(2 * (a + b), a * a - b * b)}$.`
    ],
    trap: T`Minus przed nawiasem zmienia znak każdego wyrazu w nawiasie, także wyrazu $-${2 * b}x$ (na $+${2 * b}x$).`,
    tip: TIP_WSM
  });
};
const wsmNumeric = (r) => {
  const c = r.pick([2, 3, 5, 6, 7, 10, 11, 13]);
  const b = r.int(1, 6);
  const k = r.int(1, 3);
  const v = k * k * c - b * b;
  const root = `${k === 1 ? '' : k}\\sqrt{${c}}`;
  return mc({
    title: 'Różnica kwadratów z pierwiastkiem',
    q: T`Liczba $(${root} - ${b})(${root} + ${b})$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(k * k * c + b * b), m(`${k * k * c + b * b} - ${2 * b * k}\\sqrt{${c}}`), m(k * c - b * b === v ? v + 2 : k * c - b * b), m(-v === v ? 1 : -v), m(v + b)],
    steps: [T`Stosujemy wzór $(a - b)(a + b) = a^2 - b^2$.`, T`$(${root})^2 - ${b}^2 = ${k * k * c} - ${b * b} = ${v}$.`],
    trap: T`To nie jest kwadrat różnicy – nawiasy różnią się znakiem, więc pierwiastek znika całkowicie.`,
    tip: TIP_WSM
  });
};
const wsmSumOfSquares = (r) => {
  const s = r.int(3, 12);
  const p = r.int(1, 20);
  need(s * s - 2 * p > 0 && s * s >= 4 * p);
  const v = s * s - 2 * p;
  return mc({
    title: 'Suma kwadratów z sumy i iloczynu',
    q: T`Liczby rzeczywiste $x$ i $y$ spełniają warunki $x + y = ${s}$ oraz $xy = ${p}$. Wartość wyrażenia $x^2 + y^2$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(s * s), m(s * s - p), m(s * s + 2 * p), m(v + 1)],
    steps: [T`Ze wzoru $(x + y)^2 = x^2 + 2xy + y^2$ mamy $x^2 + y^2 = (x + y)^2 - 2xy$.`, T`Podstawiamy: $${s}^2 - 2 \cdot ${p} = ${s * s} - ${2 * p} = ${v}$.`],
    trap: T`$x^2 + y^2$ to nie $(x + y)^2$ – trzeba odjąć podwojony iloczyn $2xy$.`,
    tip: TIP_WSM
  });
};

// ---------- 2.2 Działania na wielomianach ----------
const polyProduct = (r) => {
  const a = r.int(1, 4);
  const b = r.intNot(-7, 7, 0);
  const c = r.int(1, 3);
  const d = r.intNot(-7, 7, 0);
  const A = a * c;
  const B = a * d + b * c;
  const C = b * d;
  need(B !== 0);
  return mc({
    title: 'Mnożenie dwumianów',
    q: T`Dla każdej liczby rzeczywistej $x$ wyrażenie $(${lin(a, b)})(${lin(c, d)})$ jest równe`,
    ok: m(quad(A, B, C)),
    bad: [m(quad(A, 0, C)), m(quad(A, a * d - b * c || B + 1, C)), m(quad(A, B, -C)), m(quad(A, a * d + b * c + (b > 0 ? 1 : -1) * a, C)), m(quad(A, -B, C))],
    steps: [
      T`Każdy wyraz pierwszego nawiasu mnożymy przez każdy wyraz drugiego: $${ax(a)} \cdot ${ax(c)}$, $${ax(a)} \cdot ${par(d)}$, $${par(b)} \cdot ${ax(c)}$, $${par(b)} \cdot ${par(d)}$.`,
      T`Otrzymujemy $${A === 1 ? '' : A}x^2 ${a * d > 0 ? '+' : '-'} ${ax(Math.abs(a * d))} ${b * c > 0 ? '+' : '-'} ${ax(Math.abs(b * c))} ${C > 0 ? '+' : '-'} ${Math.abs(C)}$.`,
      T`Po redukcji wyrazów podobnych: $${quad(A, B, C)}$.`
    ],
    trap: T`Wyraz wolny to iloczyn $${par(b)} \cdot ${par(d)} = ${C}$ – łatwo pomylić jego znak.`,
    tip: 'Przy mnożeniu nawiasów policz, ile powinno być składników: 2 wyrazy × 2 wyrazy = 4 składniki przed redukcją.'
  });
};
const polySimplify = (r) => {
  const a = r.int(1, 3);
  const b = r.intNot(-6, 6, 0);
  const d = r.intNot(-6, 6, 0);
  const e = r.intNot(-5, 5, 0);
  // (ax + b)(x + d) - x(ax + e) = (ad + b - e)x + bd
  const B = a * d + b - e;
  need(B !== 0);
  return mc({
    title: 'Upraszczanie wyrażenia',
    q: T`Dla każdej liczby rzeczywistej $x$ wyrażenie $(${lin(a, b)})(${lin(1, d)}) - x(${lin(a, e)})$ jest równe`,
    ok: m(lin(B, b * d)),
    bad: [m(lin(a * d + b + e || B + 2, b * d)), m(lin(B, -b * d)), m(quad(2 * a, B, b * d)), m(lin(B, b + d)), m(lin(-B, b * d))],
    steps: [
      T`Mnożymy nawiasy: $(${lin(a, b)})(${lin(1, d)}) = ${quad(a, a * d + b, b * d)}$.`,
      T`Mnożymy jednomian przez nawias: $x(${lin(a, e)}) = ${quad(a, e, 0)}$.`,
      T`Odejmujemy: $${quad(a, a * d + b, b * d)} - (${quad(a, e, 0)}) = ${lin(B, b * d)}$.`
    ],
    trap: T`Odejmując $x(${lin(a, e)})$, zmieniamy znaki obu składników: $-${a === 1 ? '' : a}x^2$ oraz $${-e > 0 ? '+' : '-'}${ax(Math.abs(e))}$.`,
    tip: 'Minus przed nawiasem zmienia znak każdego wyrazu w środku. Zapisz ten krok osobno, nie licz go w pamięci.'
  });
};
const polyValue = (r) => {
  const a = r.intNot(-3, 3, 0);
  const b = r.intNot(-4, 4, 0);
  const c = r.intNot(-5, 5, 0);
  const d = r.int(-6, 6);
  const x0 = r.pick([-3, -2, -1, 2, 3]);
  const v = a * x0 ** 3 + b * x0 ** 2 + c * x0 + d;
  const W = poly([[a, 'x^3'], [b, 'x^2'], [c, 'x'], [d, '']]);
  const wrongSign = a * x0 ** 3 + b * x0 ** 2 * (x0 < 0 ? -1 : 1) + c * x0 + d;
  return mc({
    title: 'Wartość wielomianu',
    q: T`Wielomian $W$ jest określony wzorem $W(x) = ${W}$. Wartość $W(${x0})$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(wrongSign === v ? v + 2 * Math.abs(b) * x0 * x0 + 1 : wrongSign), m(-a * x0 ** 3 + b * x0 ** 2 + c * x0 + d), m(v - 2 * d || v + 3), m(a * x0 * 3 + b * x0 * 2 + c * x0 + d), m(v + Math.abs(c * x0) * 2 + 1)],
    steps: [
      T`Podstawiamy $x = ${x0}$: $${par(x0)}^3 = ${x0 ** 3}$, $${par(x0)}^2 = ${x0 ** 2}$.`,
      T`$W(${x0}) = ${a} \cdot ${par(x0 ** 3)} ${b > 0 ? '+' : '-'} ${Math.abs(b)} \cdot ${x0 ** 2} ${c > 0 ? '+' : '-'} ${Math.abs(c)} \cdot ${par(x0)} ${d === 0 ? '' : (d > 0 ? '+ ' : '- ') + Math.abs(d)} = ${v}$.`
    ],
    trap: T`Liczbę ujemną podstawiamy zawsze w nawiasie: $(-2)^2 = 4$, ale $(-2)^3 = -8$.`,
    tip: 'Potęga parzysta liczby ujemnej jest dodatnia, a nieparzysta – ujemna.'
  });
};
const polyDifference = (r) => {
  const c = () => r.intNot(-6, 6, 0);
  const [a1, b1, c1, a2, b2, c2] = [c(), c(), c(), c(), c(), c()];
  need(a1 !== a2);
  const W = quad(a1, b1, c1);
  const P = quad(a2, b2, c2);
  return mc({
    title: 'Różnica wielomianów',
    q: T`Dane są wielomiany $W(x) = ${W}$ oraz $P(x) = ${P}$. Wielomian $W(x) - P(x)$ jest równy`,
    ok: m(quad(a1 - a2, b1 - b2, c1 - c2)),
    bad: [m(quad(a1 - a2, b1 + b2, c1 + c2)), m(quad(a1 + a2, b1 + b2, c1 + c2)), m(quad(a1 - a2, b1 - b2, c1 + c2)), m(quad(a1 - a2, b1 + b2, c1 - c2)), m(quad(a2 - a1, b2 - b1, c2 - c1))],
    steps: [
      T`Zapisujemy różnicę z nawiasem: $${W} - (${P})$.`,
      T`Zmieniamy znaki wszystkich wyrazów drugiego wielomianu i redukujemy wyrazy podobne: $${quad(a1 - a2, b1 - b2, c1 - c2)}$.`
    ],
    trap: T`Znak zmienia każdy wyraz odejmowanego wielomianu, nie tylko pierwszy.`,
    tip: 'Odejmowany wielomian zawsze weź w nawias – wtedy nie zgubisz żadnego znaku.'
  });
};
const polyDegree = (r) => {
  const n1 = r.int(1, 4);
  const n2 = r.int(1, 4);
  const a = r.intNot(-5, 5, 0, 1, -1);
  const b = r.intNot(-5, 5, 0, 1, -1);
  const c = r.int(1, 9);
  const d = r.int(1, 9);
  const xp = (n) => (n === 1 ? 'x' : `x^${n}`);
  const lead = a * b;
  return mc({
    title: 'Najwyższa potęga w iloczynie',
    q: T`Po wymnożeniu i uporządkowaniu wyrażenia $(${a}${xp(n1)} + ${c})(${b}${xp(n2)} - ${d})$ składnik z najwyższą potęgą zmiennej $x$ jest równy`,
    ok: m(`${lead}${xp(n1 + n2)}`),
    bad: [m(`${lead}${xp(n1 * n2 === n1 + n2 ? n1 + n2 + 1 : n1 * n2)}`), m(`${cf(a + b || 2)}${xp(n1 + n2)}`), m(`${-lead}${xp(n1 + n2)}`), m(`${lead}${xp(Math.max(n1, n2) === n1 + n2 ? n1 + n2 + 2 : Math.max(n1, n2))}`), m(`${cf(a + b || 2)}${xp(n1 * n2 === n1 + n2 ? n1 + n2 + 1 : n1 * n2)}`)],
    steps: [T`Najwyższą potęgę daje iloczyn wyrazów o najwyższych potęgach: $${a}${xp(n1)} \cdot ${par(b)}${xp(n2)}$.`, T`Współczynniki mnożymy, wykładniki dodajemy: $${lead}${xp(n1 + n2)}$.`],
    trap: T`Przy mnożeniu potęg wykładniki dodajemy ($${n1} + ${n2}$), a nie mnożymy.`,
    tip: 'Stopień iloczynu wielomianów to suma ich stopni.'
  });
};

// ---------- 2.3 Rozkład na czynniki ----------
const factorCommon = (r) => {
  const g = r.int(2, 6);
  const n = r.int(1, 3);
  const a = r.int(1, 5);
  const b = r.intNot(-7, 7, 0);
  need(gcd(a, b) === 1);
  const xp = (k) => (k === 0 ? '' : k === 1 ? 'x' : `x^${k}`);
  const full = poly([[g * a, xp(n + 1)], [g * b, xp(n)]]);
  const f = (gg, nn, aa, bb) => m(`${gg}${xp(nn)}(${lin(aa, bb)})`);
  return mc({
    title: 'Wyłączanie wspólnego czynnika',
    q: T`Dla każdej liczby rzeczywistej $x$ wyrażenie $${full}$ jest równe`,
    ok: f(g, n, a, b),
    bad: [f(g, n, a, -b), f(g, n + 1, a, b), f(g, n, a * g, b), f(g * a, n, 1, b), f(g, n, a, b * g)],
    steps: [
      T`Największy wspólny czynnik liczbowy to $${g}$, a najwyższa wspólna potęga zmiennej to $${xp(n)}$.`,
      T`Dzielimy każdy składnik przez $${g}${xp(n)}$: $${full} = ${g}${xp(n)}(${lin(a, b)})$.`
    ],
    trap: T`Sprawdź rozkład, mnożąc z powrotem: $${g}${xp(n)} \cdot ${par(b)}$ musi dać $${g * b}${xp(n)}$.`,
    tip: 'Rozkład na czynniki zawsze możesz sprawdzić mnożeniem „w drugą stronę”.'
  });
};
const factorGrouping = (r) => {
  const a = r.intNot(-6, 6, 0);
  const b = r.int(1, 9);
  // x^3 + a x^2 + b x + ab = (x + a)(x^2 + b)
  const W = poly([[1, 'x^3'], [a, 'x^2'], [b, 'x'], [a * b, '']]);
  const f = (aa, bb) => m(`(${lin(1, aa)})(${poly([[1, 'x^2'], [bb, '']])})`);
  return mc({
    title: 'Rozkład metodą grupowania',
    q: T`Dla każdej liczby rzeczywistej $x$ wielomian $W(x) = ${W}$ jest równy`,
    ok: f(a, b),
    bad: [f(-a, b), f(a, -b), f(b, a), f(-a, -b)],
    steps: [
      T`Grupujemy wyrazy parami: $(${poly([[1, 'x^3'], [a, 'x^2']])}) + (${poly([[b, 'x'], [a * b, '']])})$.`,
      T`Wyłączamy wspólne czynniki: $x^2(${lin(1, a)}) + ${b}(${lin(1, a)})$.`,
      T`Wspólny nawias przed nawias: $(${lin(1, a)})(x^2 + ${b})$.`
    ],
    trap: T`Po wyłączeniu czynników w obu grupach musi zostać ten sam nawias. Jeśli nie zostaje – sprawdź znaki.`,
    tip: 'Grupowanie: pierwsze dwa wyrazy razem, ostatnie dwa razem, a potem wspólny nawias.'
  });
};
const factorGroupingFull = (r) => {
  const a = r.intNot(-6, 6, 0);
  const b = r.int(1, 5);
  need(Math.abs(a) !== b);
  // (x - a)(x - b)(x + b) = x^3 - a x^2 - b^2 x + a b^2
  const W = poly([[1, 'x^3'], [-a, 'x^2'], [-b * b, 'x'], [a * b * b, '']]);
  const f = (aa, bb, cc) => m(`(${xm(aa)})(${xm(bb)})(${xm(cc)})`);
  return mc({
    title: 'Pełny rozkład wielomianu trzeciego stopnia',
    q: T`Dla każdej liczby rzeczywistej $x$ wielomian $W(x) = ${W}$ jest równy`,
    ok: f(a, b, -b),
    bad: [f(-a, b, -b), m(`(${xm(a)})(${xm(b)})^2`), m(`(${xm(a)})(x^2 + ${b * b})`), f(a, b * b, -1), m(`(${xm(-a)})(${xm(b)})^2`)],
    steps: [
      T`Grupujemy: $x^2(${xm(a)}) - ${b * b}(${xm(a)}) = (${xm(a)})(x^2 - ${b * b})$.`,
      T`Drugi nawias to różnica kwadratów: $x^2 - ${b * b} = (x - ${b})(x + ${b})$.`,
      T`Ostatecznie $W(x) = (${xm(a)})(x - ${b})(x + ${b})$.`
    ],
    trap: T`$x^2 - ${b * b}$ to nie $(x - ${b})^2$. Różnica kwadratów daje dwa różne nawiasy.`,
    tip: TIP_WSM
  });
};
const factorDiffSquares = (r) => {
  const a = r.int(1, 6);
  const b = r.int(1, 9);
  need(gcd(a, b) === 1);
  const f = (s1, s2) => m(`(${ax(a)} ${s1} ${b})(${ax(a)} ${s2} ${b})`);
  return mc({
    title: 'Rozkład różnicy kwadratów',
    q: T`Dla każdej liczby rzeczywistej $x$ wyrażenie $${quad(a * a, 0, -b * b)}$ jest równe`,
    ok: f('-', '+'),
    bad: [m(`(${ax(a)} - ${b})^2`), m(`(${ax(a)} + ${b})^2`), m(`(${ax(a * a)} - ${b})(x + ${b})`), m(`(${ax(a)} - ${b * b})(${ax(a)} + 1)`)],
    steps: [T`Zapisujemy oba wyrazy jako kwadraty: $${a * a === 1 ? '' : a * a}x^2 = (${ax(a)})^2$ oraz $${b * b} = ${b}^2$.`, T`Ze wzoru $a^2 - b^2 = (a - b)(a + b)$: $(${ax(a)} - ${b})(${ax(a)} + ${b})$.`],
    trap: T`Różnica kwadratów nie jest kwadratem różnicy: $(${ax(a)} - ${b})^2$ zawiera dodatkowy wyraz $-${2 * a * b}x$.`,
    tip: TIP_WSM
  });
};
const factorPerfectSquare = (r) => {
  const a = r.int(1, 3);
  const b = r.int(1, 8);
  const minus = r.bool();
  need(gcd(a, b) === 1);
  const s = minus ? '-' : '+';
  return mc({
    title: 'Zwijanie do kwadratu',
    q: T`Dla każdej liczby rzeczywistej $x$ wyrażenie $${quad(a * a, (minus ? -1 : 1) * 2 * a * b, b * b)}$ jest równe`,
    ok: m(`(${ax(a)} ${s} ${b})^2`),
    bad: [m(`(${ax(a)} ${minus ? '+' : '-'} ${b})^2`), m(`(${ax(a)} - ${b})(${ax(a)} + ${b})`), m(`(${ax(a * a)} ${s} ${b})^2`), m(`(${ax(a)} ${s} ${b * b})^2`)],
    steps: [
      T`Skrajne wyrazy to kwadraty: $(${ax(a)})^2$ i $${b}^2$.`,
      T`Środkowy wyraz to $2 \cdot ${ax(a)} \cdot ${b} = ${2 * a * b}x$ ze znakiem „$${s}$”, więc wyrażenie jest równe $(${ax(a)} ${s} ${b})^2$.`
    ],
    trap: T`O znaku w nawiasie decyduje znak środkowego wyrazu, a nie wyrazu wolnego (ten jest zawsze dodatni).`,
    tip: TIP_WSM
  });
};

// ---------- 2.4 Wyrażenia wymierne ----------
const ratSimplifyDiff = (r) => {
  const a = r.int(1, 9);
  const c = r.int(1, 4);
  const up = r.bool(); // skracamy (x - a) albo (x + a)
  const den = up ? `${c === 1 ? '' : c}(x - ${a})` : `${c === 1 ? '' : c}(x + ${a})`;
  const denShown = c === 1 ? (up ? `x - ${a}` : `x + ${a}`) : `${c}x ${up ? '-' : '+'} ${c * a}`;
  const res = (sgn) => (c === 1 ? `x ${sgn} ${a}` : `\\frac{x ${sgn} ${a}}{${c}}`);
  return mc({
    title: 'Skracanie wyrażenia wymiernego',
    q: T`Dla każdej liczby rzeczywistej $x \neq ${up ? a : -a}$ wyrażenie $\frac{x^2 - ${a * a}}{${denShown}}$ jest równe`,
    ok: m(res(up ? '+' : '-')),
    bad: [m(res(up ? '-' : '+')), m(c === 1 ? `x ${up ? '+' : '-'} ${a * a}` : `\\frac{x ${up ? '+' : '-'} ${a * a}}{${c}}`), m(c === 1 ? `x^2 ${up ? '+' : '-'} ${a}` : `x ${up ? '+' : '-'} ${a}`), m(c === 1 ? `\\frac{1}{x ${up ? '+' : '-'} ${a}}` : `${c}(x ${up ? '+' : '-'} ${a})`), m(`\\frac{x ${up ? '+' : '-'} ${a}}{${c + 1}}`)],
    steps: [
      T`Rozkładamy licznik: $x^2 - ${a * a} = (x - ${a})(x + ${a})$.`,
      c === 1 ? T`Mianownik to $${denShown}$.` : T`W mianowniku wyłączamy $${c}$: $${denShown} = ${den}$.`,
      T`Skracamy wspólny czynnik $(x ${up ? '-' : '+'} ${a})$ i zostaje $${res(up ? '+' : '-')}$.`
    ],
    trap: T`Skracać wolno tylko czynniki (iloczyn), nigdy pojedyncze składniki sumy. Nie da się „skrócić $x^2$ z $x$”.`,
    tip: 'Zanim skrócisz ułamek algebraiczny, rozłóż licznik i mianownik na czynniki.'
  });
};
const ratDomain = (r) => {
  const a = r.intNot(-8, 8, 0);
  const b = r.intNot(-8, 8, 0, a);
  const k = r.int(1, 9);
  need(a + b !== 0 && -k !== a && -k !== b);
  const set = (x, y) => (x < y ? `${x}` + T`\ \text{i}\ ` + `${y}` : `${y}` + T`\ \text{i}\ ` + `${x}`);
  return mc({
    title: 'Dziedzina wyrażenia wymiernego',
    q: T`Wyrażenie $\frac{x + ${k}}{(${xm(a)})(${xm(b)})}$ ma sens liczbowy dla wszystkich liczb rzeczywistych $x$ z wyjątkiem liczb`,
    ok: m(set(a, b)),
    bad: [m(set(-a, -b)), m(set(a, -b)), m(set(-k, a)), m(set(-a, b)), m(set(-k, b))],
    steps: [T`Mianownik nie może być równy zero: $(${xm(a)})(${xm(b)}) \neq 0$.`, T`Iloczyn jest zerem, gdy $x = ${a}$ lub $x = ${b}$ – te dwie liczby wykluczamy.`],
    trap: T`Licznik może być zerem bez przeszkód – liczba $${-k}$ należy do dziedziny. Wykluczamy tylko zera mianownika.`,
    tip: 'Dziedzina wyrażenia wymiernego: wszystkie liczby rzeczywiste poza miejscami zerowymi mianownika.'
  });
};
const ratAdd = (r) => {
  const a = r.int(1, 6);
  const p = r.int(1, 5);
  const q = r.int(1, 5);
  // p/x + q/(x + a) = ((p + q)x + pa) / (x(x + a))
  const den = `x(x + ${a})`;
  const f = (c1, c0, d = den) => m(`\\frac{${lin(c1, c0)}}{${d}}`);
  return mc({
    title: 'Dodawanie wyrażeń wymiernych',
    q: T`Dla każdej liczby rzeczywistej $x$ różnej od $0$ i od $${-a}$ wyrażenie $\frac{${p}}{x} + \frac{${q}}{x + ${a}}$ jest równe`,
    ok: f(p + q, p * a),
    bad: [m(`\\frac{${p + q}}{2x + ${a}}`), f(p + q, a), f(p + q, p * a, `2x + ${a}`), m(`\\frac{${p + q}}{${den}}`), f(p + q, q * a)],
    steps: [
      T`Wspólny mianownik to $${den}$.`,
      T`Rozszerzamy ułamki: $\frac{${p}(x + ${a})}{${den}} + \frac{${q}x}{${den}}$.`,
      T`Dodajemy liczniki: $${ax(p)} + ${p * a} + ${ax(q)} = ${lin(p + q, p * a)}$.`
    ],
    trap: T`Ułamków nie dodaje się „licznik do licznika, mianownik do mianownika”. Najpierw wspólny mianownik.`,
    tip: 'Wyrażenia wymierne dodajesz tak samo jak ułamki zwykłe: wspólny mianownik, rozszerzenie, suma liczników.'
  });
};
const ratMultiply = (r) => {
  const a = r.int(1, 8);
  const b = r.int(2, 6);
  const f = (s) => m(`\\frac{x ${s} ${a}}{${b}}`);
  return mc({
    title: 'Mnożenie wyrażeń wymiernych',
    q: T`Dla każdej liczby rzeczywistej $x$ różnej od $0$ i od $${-a}$ wyrażenie $\frac{x^2 - ${a * a}}{${b}x} \cdot \frac{x}{x + ${a}}$ jest równe`,
    ok: f('-'),
    bad: [f('+'), m(`\\frac{x - ${a}}{${b}x}`), m(`${b}(x - ${a})`), m(`\\frac{x^2 - ${a * a}}{${b}}`), m(`\\frac{x - ${a * a}}{${b}}`)],
    steps: [
      T`Rozkładamy licznik pierwszego ułamka: $x^2 - ${a * a} = (x - ${a})(x + ${a})$.`,
      T`Zapisujemy iloczyn: $\frac{(x - ${a})(x + ${a}) \cdot x}{${b}x \cdot (x + ${a})}$.`,
      T`Skracamy $x$ oraz $(x + ${a})$: zostaje $\frac{x - ${a}}{${b}}$.`
    ],
    trap: T`Skracamy tylko czynniki występujące jednocześnie w liczniku i mianowniku całego iloczynu.`,
    tip: 'Przy mnożeniu ułamków algebraicznych najpierw rozkładaj i skracaj, dopiero potem mnóż.'
  });
};
const ratValue = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.intNot(-5, 5, 0);
  const x0 = r.intNot(-4, 6, 0, b);
  const n = x0 * x0 + a;
  const d = x0 - b;
  need(n !== 0 && n % d !== 0);
  return mc({
    title: 'Wartość wyrażenia wymiernego',
    q: T`Wartość wyrażenia $\frac{x^2 ${a > 0 ? '+' : '-'} ${Math.abs(a)}}{${xm(b)}}$ dla $x = ${x0}$ jest równa`,
    ok: m(fr(n, d)),
    val: n / d,
    bad: [m(fr(d, n)), m(fr(-(x0 * x0) + a || 1, d)), m(fr(n, x0 + b || 1)), m(fr(2 * x0 + a || 1, d)), m(fr(-n, d))],
    steps: [T`Licznik: $${par(x0)}^2 ${a > 0 ? '+' : '-'} ${Math.abs(a)} = ${n}$.`, T`Mianownik: $${x0} ${b > 0 ? '-' : '+'} ${Math.abs(b)} = ${d}$.`, T`Wartość: $${fr(n, d)}$.`],
    trap: T`$${par(x0)}^2 = ${x0 * x0}$ – kwadrat liczby jest nieujemny niezależnie od jej znaku.`,
    tip: 'Podstawiaj liczbę w nawiasie i licz osobno licznik oraz mianownik.'
  });
};

// ---------- 2.5 Dowody algebraiczne i podzielność ----------
const proofRemainder = (r) => {
  const d = r.pick([3, 4, 5, 6, 7]);
  const rem = r.int(1, d - 1);
  const variant = r.int(0, 2);
  const c = r.int(1, 9);
  const exprs = [
    [T`n^2`, (rem * rem) % d, T`$n^2 = (${d}k + ${rem})^2 = ${d * d}k^2 + ${2 * d * rem}k + ${rem * rem}$. Pierwsze dwa składniki dzielą się przez $${d}$, a $${rem * rem} = ${d} \cdot ${Math.floor((rem * rem) / d)} + ${(rem * rem) % d}$.`],
    [T`2n + ${c}`, (2 * rem + c) % d, T`$2n + ${c} = ${2 * d}k + ${2 * rem + c}$. Składnik $${2 * d}k$ dzieli się przez $${d}$, a $${2 * rem + c} = ${d} \cdot ${Math.floor((2 * rem + c) / d)} + ${(2 * rem + c) % d}$.`],
    [T`3n + ${c}`, (3 * rem + c) % d, T`$3n + ${c} = ${3 * d}k + ${3 * rem + c}$. Składnik $${3 * d}k$ dzieli się przez $${d}$, a $${3 * rem + c} = ${d} \cdot ${Math.floor((3 * rem + c) / d)} + ${(3 * rem + c) % d}$.`]
  ];
  const [e, v, why] = exprs[variant];
  const others = [0, 1, 2, 3, 4, 5, 6].filter((x) => x < d && x !== v);
  need(others.length >= 3);
  return mc({
    title: 'Reszta z dzielenia',
    q: T`Liczba naturalna $n$ przy dzieleniu przez $${d}$ daje resztę $${rem}$. Reszta z dzielenia liczby $${e}$ przez $${d}$ jest równa`,
    ok: m(v),
    val: v,
    bad: r.shuffle(others).map((x) => m(x)),
    steps: [T`Zapisujemy $n = ${d}k + ${rem}$, gdzie $k$ jest liczbą całkowitą nieujemną.`, why, T`Reszta jest więc równa $${v}$.`],
    trap: T`Reszta musi być mniejsza od dzielnika $${d}$. Jeśli wychodzi większa liczba, trzeba ją jeszcze podzielić przez $${d}$.`,
    tip: 'Liczbę dającą resztę $r$ przy dzieleniu przez $d$ zawsze zapisuj jako $dk + r$.'
  });
};
const proofDivisible = (r) => {
  const k = r.int(1, 6);
  const D = 4 * k;
  const cand = [2 * D, D + 2, D + 4, 3 * D, D + 1, D + 3, 5].filter((x) => D % x !== 0);
  need(cand.length >= 3);
  return mc({
    title: 'Podzielność wyrażenia',
    q: T`Dla każdej liczby całkowitej $n$ liczba $(n + ${k})^2 - (n - ${k})^2$ jest podzielna przez`,
    ok: m(D),
    bad: r.shuffle(cand).map((x) => m(x)),
    steps: [
      T`Rozwijamy: $(n + ${k})^2 - (n - ${k})^2 = n^2 + ${2 * k}n + ${k * k} - n^2 + ${2 * k}n - ${k * k} = ${D}n$.`,
      T`Liczba $${D}n$ jest iloczynem liczby $${D}$ i liczby całkowitej $n$, więc dzieli się przez $${D}$.`,
      T`Pozostałe opcje odpadają już dla $n = 1$: liczba $${D}$ nie dzieli się przez żadną z nich.`
    ],
    trap: T`Sprawdzenie kilku przykładów to nie dowód – w zadaniu otwartym trzeba doprowadzić wyrażenie do postaci „$${D} \cdot$ liczba całkowita”.`,
    tip: 'Dowód podzielności: przekształć wyrażenie do iloczynu, w którym jawnie widać dzielnik.'
  });
};
const proofConsecutive = (r) => {
  const k = r.pick([3, 4, 5, 6, 7]);
  const odd = r.bool();
  if (!odd) {
    const c = (k * (k - 1)) / 2;
    return mc({
      title: 'Suma kolejnych liczb całkowitych',
      q: T`Suma $${k}$ kolejnych liczb całkowitych, z których najmniejszą jest $n$, jest równa`,
      ok: m(lin(k, c, 'n')),
      bad: [m(lin(k, k, 'n')), m(lin(k, k - 1, 'n')), m(lin(k, 0, 'n')), m(lin(k, c + k, 'n')), m(lin(k - 1, c, 'n'))],
      steps: [T`Kolejne liczby to: $n, n + 1, \ldots, n + ${k - 1}$.`, T`Dodajemy: $${k}n + (0 + 1 + \ldots + ${k - 1}) = ${k}n + ${c}$.`],
      trap: T`Ostatnią liczbą jest $n + ${k - 1}$, a nie $n + ${k}$ – liczb ma być dokładnie $${k}$.`,
      tip: 'Kolejne liczby całkowite zapisuj jako $n, n+1, n+2, \\ldots$ – wtedy dowód sprowadza się do rachunku.'
    });
  }
  const c = k * (k - 1);
  return mc({
    title: 'Suma kolejnych liczb nieparzystych',
    q: T`Suma $${k}$ kolejnych liczb nieparzystych, z których najmniejszą jest $2n + 1$ ($n$ jest liczbą całkowitą), jest równa`,
    ok: m(lin(2 * k, k * k, 'n')),
    bad: [m(lin(2 * k, k, 'n')), m(lin(2 * k, c, 'n')), m(lin(k, k * k, 'n')), m(lin(2 * k, k * k + k, 'n')), m(lin(2 * k, 2 * k, 'n'))],
    steps: [T`Kolejne liczby nieparzyste różnią się o $2$: $2n + 1, 2n + 3, \ldots, 2n + ${2 * k - 1}$.`, T`Dodajemy: $${k} \cdot 2n + (1 + 3 + \ldots + ${2 * k - 1}) = ${2 * k}n + ${k * k}$.`],
    trap: T`Kolejne liczby nieparzyste rosną o $2$, a nie o $1$.`,
    tip: 'Liczba parzysta to $2n$, nieparzysta to $2n + 1$ – od tego zapisu zaczyna się większość dowodów.'
  });
};
const proofMinValue = (r) => {
  const a = r.intNot(-7, 7, 0);
  const q = r.int(-9, 12);
  const c = a * a + q;
  return mc({
    title: 'Najmniejsza wartość wyrażenia',
    q: T`Najmniejsza wartość wyrażenia $${quad(1, -2 * a, c)}$ dla $x$ rzeczywistego jest równa`,
    ok: m(q),
    val: q,
    bad: [m(c), m(-q === q ? 1 : -q), m(a), m(q - 1), m(a * a)],
    steps: [
      T`Zwijamy do kwadratu: $${quad(1, -2 * a, a * a)} = (${xm(a)})^2$.`,
      T`Zatem $${quad(1, -2 * a, c)} = (${xm(a)})^2 ${q >= 0 ? '+' : '-'} ${Math.abs(q)}$.`,
      T`Kwadrat jest zawsze nieujemny i równy $0$ dla $x = ${a}$, więc najmniejsza wartość to $${q}$.`
    ],
    trap: T`Wyraz wolny $${c}$ to wartość dla $x = 0$, a nie wartość najmniejsza.`,
    tip: 'Kwadrat dowolnej liczby rzeczywistej jest większy lub równy zero – to najważniejszy argument w dowodach nierówności.'
  });
};
const STATEMENTS = [
  [T`Dla każdej liczby całkowitej $n$ liczba $n^2 + n$ jest parzysta.`, true, T`$n^2 + n = n(n + 1)$ to iloczyn dwóch kolejnych liczb całkowitych, a jedna z nich jest parzysta – prawda.`],
  [T`Dla każdej liczby całkowitej $n$ liczba $n^2 + 1$ jest nieparzysta.`, false, T`dla $n = 1$ otrzymujemy $2$, liczbę parzystą – fałsz.`],
  [T`Suma dwóch dowolnych liczb nieparzystych jest liczbą parzystą.`, true, T`$(2k + 1) + (2m + 1) = 2(k + m + 1)$ – prawda.`],
  [T`Iloczyn dwóch dowolnych liczb nieparzystych jest liczbą parzystą.`, false, T`$(2k + 1)(2m + 1) = 2(2km + k + m) + 1$ jest liczbą nieparzystą – fałsz.`],
  [T`Dla każdej liczby całkowitej $n$ liczba $(n + 1)^2 - n^2$ jest nieparzysta.`, true, T`$(n + 1)^2 - n^2 = 2n + 1$ – prawda.`],
  [T`Suma trzech kolejnych liczb całkowitych jest zawsze podzielna przez $3$.`, true, T`$n + (n + 1) + (n + 2) = 3(n + 1)$ – prawda.`],
  [T`Suma czterech kolejnych liczb całkowitych jest zawsze podzielna przez $4$.`, false, T`$n + (n+1) + (n+2) + (n+3) = 4n + 6$, co przy dzieleniu przez $4$ daje resztę $2$ – fałsz.`],
  [T`Dla każdej liczby rzeczywistej $x$ prawdziwa jest nierówność $x^2 + 1 > 2x - 1$.`, true, T`$x^2 - 2x + 2 = (x - 1)^2 + 1 > 0$ – prawda.`],
  [T`Dla każdej liczby rzeczywistej $x$ prawdziwa jest nierówność $x^2 > x$.`, false, T`dla $x = \frac{1}{2}$ mamy $\frac{1}{4} < \frac{1}{2}$ – fałsz.`],
  [T`Dla każdych liczb rzeczywistych $a$, $b$ prawdziwa jest nierówność $a^2 + b^2 \ge 2ab$.`, true, T`$a^2 - 2ab + b^2 = (a - b)^2 \ge 0$ – prawda.`],
  [T`Kwadrat każdej liczby nieparzystej przy dzieleniu przez $4$ daje resztę $1$.`, true, T`$(2k + 1)^2 = 4(k^2 + k) + 1$ – prawda.`],
  [T`Dla każdej liczby całkowitej $n$ liczba $n^3 - n$ jest podzielna przez $6$.`, true, T`$n^3 - n = (n - 1)n(n + 1)$ to iloczyn trzech kolejnych liczb całkowitych; jest wśród nich liczba parzysta i liczba podzielna przez $3$ – prawda.`],
  [T`Iloczyn dwóch kolejnych liczb parzystych jest zawsze podzielny przez $8$.`, true, T`$2k(2k + 2) = 4k(k + 1)$, a $k(k + 1)$ jest liczbą parzystą – prawda.`],
  [T`Dla każdej liczby całkowitej $n$ liczba $n^2 + n + 1$ jest podzielna przez $3$.`, false, T`dla $n = 2$ otrzymujemy $7$, a $7$ nie dzieli się przez $3$ – fałsz.`]
];
const proofStatements = (r) => {
  const [i, j] = r.shuffle(STATEMENTS.map((_, k) => k)).slice(0, 2);
  return pf({
    title: 'Prawda czy fałsz: własności liczb',
    q: '',
    s1: STATEMENTS[i],
    s2: STATEMENTS[j],
    trap: 'Zdanie „dla każdej liczby” obala jeden kontrprzykład, ale potwierdzić je można tylko rachunkiem ogólnym na literach.',
    tip: 'Szukasz fałszu? Podstaw małe liczby: 0, 1, 2, ułamek, liczbę ujemną. Dowodzisz prawdy? Rozłóż wyrażenie na czynniki.'
  });
};

export default {
  numericId: 2,
  title: 'Wyrażenia algebraiczne',
  short_title: 'Wyrażenia algebraiczne',
  description: 'Wzory skróconego mnożenia, działania na wielomianach, rozkład na czynniki, wyrażenia wymierne i dowody.',
  icon: 'Braces',
  color: '#38BDF8',
  matura_points_range: '3–6 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 7',
  lessons: [
    {
      title: 'Wzory skróconego mnożenia',
      short_title: 'Wzory skróconego mnożenia',
      pill: pill({
        essence: T`Na poziomie podstawowym obowiązują trzy wzory: kwadrat sumy $(a + b)^2 = a^2 + 2ab + b^2$, kwadrat różnicy $(a - b)^2 = a^2 - 2ab + b^2$ oraz różnica kwadratów $a^2 - b^2 = (a - b)(a + b)$. Działają w obie strony: pozwalają szybko rozwinąć nawias, ale też „zwinąć” wyrażenie albo rozłożyć je na czynniki. Literami $a$ i $b$ może być cokolwiek: liczba, $3x$, a nawet $\sqrt{5}$.`,
        context: 'Zadania 3–6 w arkuszu • 1 pkt, a do tego prawie każdy dowód algebraiczny za 2 pkt.',
        pl: T`$(x + 3)^2$ to pole kwadratu o boku $x + 3$. Taki kwadrat składa się z kwadratu $x^2$, kwadratu $9$ i jeszcze dwóch prostokątów $3x$. Te dwa prostokąty to właśnie „$2ab$”, o którym wszyscy zapominają.`,
        steps: [
          ['Rozpoznaj wzór', T`Jeden nawias do kwadratu to kwadrat sumy lub różnicy. Dwa nawiasy różniące się tylko znakiem to różnica kwadratów.`, T`$(2x - 5)(2x + 5)$ → różnica kwadratów`],
          ['Ustal, czym są a i b', T`W $(3x - 4)^2$ mamy $a = 3x$, $b = 4$.`, T`Cały wyraz $3x$ podnosisz do kwadratu: $(3x)^2 = 9x^2$.`],
          ['Podstaw do wzoru', T`$(3x - 4)^2 = 9x^2 - 2 \cdot 3x \cdot 4 + 16 = 9x^2 - 24x + 16$.`, 'Środkowy wyraz ma taki znak, jaki stoi w nawiasie.']
        ],
        formulas: [
          ['Kwadrat sumy', T`(a + b)^2 = a^2 + 2ab + b^2`, 7],
          ['Kwadrat różnicy', T`(a - b)^2 = a^2 - 2ab + b^2`, 7],
          ['Różnica kwadratów', T`a^2 - b^2 = (a - b)(a + b)`, 7]
        ],
        examples: [
          ['Zadanie typowe', '1 pkt', T`Zapisz w najprostszej postaci wyrażenie $(x + 3)^2 - (x - 3)^2$.`, T`1. $(x + 3)^2 = x^2 + 6x + 9$.` + '\n' + T`2. $(x - 3)^2 = x^2 - 6x + 9$.` + '\n' + T`3. Odejmujemy: $x^2 + 6x + 9 - x^2 + 6x - 9 = 12x$.`, 'Minus przed nawiasem zmienia wszystkie znaki w środku.'],
          ['Z pierwiastkiem', '1 pkt', T`Oblicz $(\sqrt{7} - 2)(\sqrt{7} + 2)$.`, T`1. To różnica kwadratów: $(\sqrt{7})^2 - 2^2$.` + '\n' + T`2. $7 - 4 = 3$.`, 'Różnica kwadratów usuwa pierwiastek całkowicie.']
        ],
        trap: T`$(a + b)^2$ to NIE jest $a^2 + b^2$. Zawsze dochodzi podwojony iloczyn $2ab$.`,
        fail: T`$(x - 3)^2 = x^2 - 9$ albo $(x + 5)^2 = x^2 + 25$.`,
        win: T`$(x - 3)^2 = x^2 - 6x + 9$ oraz $(x + 5)^2 = x^2 + 10x + 25$.`,
        why: 'Kwadrat sumy to iloczyn dwóch jednakowych nawiasów. Po wymnożeniu powstają cztery składniki, z których dwa środkowe są równe.',
        ckeTip: 'Wszystkie trzy wzory są w karcie wzorów na str. 7 – zajrzyj tam zawsze, gdy nie masz pewności co do znaku.',
        points: [T`Kwadrat sumy i różnicy ma zawsze trzy składniki.`, T`Różnica kwadratów ma dwa składniki i nie zawiera wyrazu środkowego.`, T`Wzory działają też „od tyłu”: $x^2 - 25 = (x - 5)(x + 5)$.`]
      }),
      gens: [wsmSquare, wsmDiffOfSquares, wsmDifferenceOfTwoSquares, wsmNumeric, wsmSumOfSquares]
    },
    {
      title: 'Działania na sumach algebraicznych i wielomianach',
      short_title: 'Działania na wielomianach',
      pill: pill({
        essence: T`Wielomiany dodajemy i odejmujemy, redukując wyrazy podobne (te same potęgi zmiennej). Mnożymy je metodą „każdy przez każdy”: każdy wyraz pierwszego nawiasu przez każdy wyraz drugiego. Wartość wielomianu dla danej liczby obliczamy, podstawiając tę liczbę w miejsce $x$ – liczbę ujemną zawsze w nawiasie.`,
        context: 'Zadania 3–7 w arkuszu • 1 pkt. To także podstawowe narzędzie w zadaniach otwartych.',
        pl: T`Mnożenie nawiasów to jak witanie się dwóch grup ludzi: każdy z pierwszej grupy podaje rękę każdemu z drugiej. Dwa wyrazy razy dwa wyrazy to cztery „uściski”, czyli cztery składniki. Dopiero potem sprzątasz – łączysz podobne.`,
        steps: [
          ['Pomnóż każdy przez każdy', T`$(2x - 3)(x + 4) = 2x \cdot x + 2x \cdot 4 - 3 \cdot x - 3 \cdot 4$.`, 'Policz składniki: powinno być 4.'],
          ['Pilnuj znaków', T`$-3 \cdot 4 = -12$, $-3 \cdot x = -3x$.`, 'Minus razy plus daje minus, minus razy minus daje plus.'],
          ['Zredukuj wyrazy podobne', T`$2x^2 + 8x - 3x - 12 = 2x^2 + 5x - 12$.`, T`Łączysz tylko wyrazy z tą samą potęgą $x$.`]
        ],
        formulas: [
          ['Mnożenie nawiasów', T`(a + b)(c + d) = ac + ad + bc + bd`],
          ['Mnożenie potęg zmiennej', T`x^m \cdot x^n = x^{m+n}`, 4],
          ['Minus przed nawiasem', T`-(a - b + c) = -a + b - c`]
        ],
        examples: [
          ['Zadanie typowe', '1 pkt', T`Uprość wyrażenie $(x - 2)(x + 5) - x(x + 1)$.`, T`1. $(x - 2)(x + 5) = x^2 + 5x - 2x - 10 = x^2 + 3x - 10$.` + '\n' + T`2. $x(x + 1) = x^2 + x$.` + '\n' + T`3. $x^2 + 3x - 10 - x^2 - x = 2x - 10$.`, 'Odejmowany iloczyn najpierw policz w nawiasie.'],
          ['Wartość wielomianu', '1 pkt', T`Oblicz $W(-2)$ dla $W(x) = x^3 - 3x^2 + 4$.`, T`1. $(-2)^3 = -8$, $(-2)^2 = 4$.` + '\n' + T`2. $W(-2) = -8 - 3 \cdot 4 + 4 = -8 - 12 + 4 = -16$.`, T`$(-2)^2 = 4$, ale $-2^2 = -4$. Nawias ma znaczenie.`]
        ],
        trap: T`Minus przed nawiasem zmienia znak KAŻDEGO wyrazu w nawiasie, nie tylko pierwszego.`,
        fail: T`$x^2 + 3x - (x^2 + x - 4) = x^2 + 3x - x^2 + x - 4$.`,
        win: T`$x^2 + 3x - (x^2 + x - 4) = x^2 + 3x - x^2 - x + 4 = 2x + 4$.`,
        why: 'Odjęcie sumy oznacza odjęcie każdego jej składnika osobno.',
        ckeTip: 'W zadaniu zamkniętym sprawdź wynik liczbą: podstaw np. $x = 1$ do wyrażenia i do wybranej opcji – wartości muszą być równe.',
        points: [T`Mnożenie nawiasów: każdy wyraz przez każdy.`, T`Liczbę ujemną podstawiaj w nawiasie.`, T`Stopień iloczynu wielomianów to suma ich stopni.`]
      }),
      gens: [polyProduct, polySimplify, polyValue, polyDifference, polyDegree]
    },
    {
      title: 'Rozkład na czynniki: wyłączanie i grupowanie',
      short_title: 'Rozkład na czynniki',
      pill: pill({
        essence: T`Rozłożyć na czynniki to zapisać sumę w postaci iloczynu. Masz trzy narzędzia: wyłączanie wspólnego czynnika przed nawias ($6x^3 - 9x^2 = 3x^2(2x - 3)$), grupowanie wyrazów ($x^3 + 2x^2 + 5x + 10 = (x + 2)(x^2 + 5)$) i wzory skróconego mnożenia ($x^2 - 9 = (x - 3)(x + 3)$). Postać iloczynowa to klucz do równań wielomianowych, bo iloczyn jest zerem tylko wtedy, gdy któryś czynnik jest zerem.`,
        context: 'Zadanie otwarte za 2–3 pkt (równanie wielomianowe) w prawie każdym arkuszu oraz zadania zamknięte za 1 pkt.',
        pl: T`Grupowanie to dobieranie wyrazów w pary. Z każdej pary wyciągasz to, co wspólne, i jeśli zrobisz to dobrze, w obu parach zostaje identyczny nawias. Ten nawias wyciągasz jeszcze raz – i gotowe.`,
        steps: [
          ['Podziel na dwie pary', T`$x^3 - 4x^2 - 9x + 36 = (x^3 - 4x^2) + (-9x + 36)$.`, 'Zwykle: dwa pierwsze wyrazy i dwa ostatnie.'],
          ['Wyłącz czynnik z każdej pary', T`$x^2(x - 4) - 9(x - 4)$.`, 'W obu parach musi zostać ten sam nawias.'],
          ['Wyłącz wspólny nawias', T`$(x - 4)(x^2 - 9)$.`, 'Nawias traktujesz jak jedną literę.'],
          ['Rozłóż dalej, jeśli się da', T`$x^2 - 9 = (x - 3)(x + 3)$, więc wynik to $(x - 4)(x - 3)(x + 3)$.`, T`$x^2 + 9$ nie rozkłada się dalej.`]
        ],
        formulas: [
          ['Wyłączanie czynnika', T`ab + ac = a(b + c)`],
          ['Różnica kwadratów', T`a^2 - b^2 = (a - b)(a + b)`, 7],
          ['Zwijanie do kwadratu', T`a^2 \pm 2ab + b^2 = (a \pm b)^2`, 7]
        ],
        examples: [
          ['Grupowanie', '2 pkt', T`Rozłóż na czynniki wielomian $W(x) = x^3 + 3x^2 - 4x - 12$.`, T`1. $(x^3 + 3x^2) + (-4x - 12)$.` + '\n' + T`2. $x^2(x + 3) - 4(x + 3)$.` + '\n' + T`3. $(x + 3)(x^2 - 4) = (x + 3)(x - 2)(x + 2)$.`, T`Z drugiej pary wyłączamy $-4$, żeby dostać nawias $(x + 3)$.`],
          ['Wyłączanie', '1 pkt', T`Rozłóż na czynniki $12x^3 - 8x^2$.`, T`1. Wspólny czynnik liczbowy: $4$. Wspólna potęga: $x^2$.` + '\n' + T`2. $12x^3 - 8x^2 = 4x^2(3x - 2)$.`, 'Wyłączaj największy możliwy czynnik.']
        ],
        trap: T`Przy wyłączaniu liczby ujemnej z pary zmieniają się oba znaki: $-4x - 12 = -4(x + 3)$, a nie $-4(x - 3)$.`,
        fail: T`$x^2(x + 3) - 4x - 12 = x^2(x + 3) - 4(x - 3)$.`,
        win: T`$-4x - 12 = -4(x + 3)$, bo $-4 \cdot 3 = -12$.`,
        why: 'Wyłączenie czynnika to dzielenie każdego wyrazu przez ten czynnik. Dzielenie przez liczbę ujemną zmienia znak.',
        ckeTip: 'Każdy rozkład sprawdzisz w 20 sekund, mnożąc nawiasy z powrotem.',
        points: [T`Najpierw sprawdź, czy da się coś wyłączyć przed nawias.`, T`Przy czterech wyrazach próbuj grupowania.`, T`$x^2 - a^2$ rozkłada się, $x^2 + a^2$ – nie.`]
      }),
      gens: [factorCommon, factorGrouping, factorGroupingFull, factorDiffSquares, factorPerfectSquare]
    },
    {
      title: 'Wyrażenia wymierne: dziedzina, skracanie i działania',
      short_title: 'Wyrażenia wymierne',
      pill: pill({
        essence: T`Wyrażenie wymierne to ułamek, w którym licznik i mianownik są wielomianami, np. $\frac{x^2 - 4}{x - 2}$. Obowiązują te same zasady co dla ułamków zwykłych: mianownik nie może być zerem (stąd dziedzina), skracać wolno tylko wspólne czynniki, a dodawać – dopiero po sprowadzeniu do wspólnego mianownika.`,
        context: 'Zadania 5–8 w arkuszu • 1 pkt. Dziedzina wraca w równaniach wymiernych.',
        pl: T`W ułamku $\frac{6}{9}$ skracasz przez $3$, bo $6 = 2 \cdot 3$ i $9 = 3 \cdot 3$. Tu jest tak samo, tylko zamiast trójki skracasz cały nawias, np. $(x - 2)$. Nawias musi być czynnikiem – nie da się skreślić kawałka sumy.`,
        steps: [
          ['Wyznacz dziedzinę', T`Przyrównaj mianownik do zera i wyklucz otrzymane liczby.`, T`Dla $\frac{x^2 - 4}{x - 2}$: $x \neq 2$.`],
          ['Rozłóż licznik i mianownik na czynniki', T`$x^2 - 4 = (x - 2)(x + 2)$.`, 'Użyj wyłączania przed nawias lub wzorów skróconego mnożenia.'],
          ['Skróć wspólne czynniki', T`$\frac{(x - 2)(x + 2)}{x - 2} = x + 2$.`, 'Skracasz całe nawiasy, nie pojedyncze litery.']
        ],
        formulas: [
          ['Warunek istnienia', T`\frac{W(x)}{V(x)} \ \text{istnieje, gdy} \ V(x) \neq 0`],
          ['Dodawanie ułamków', T`\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}`],
          ['Mnożenie ułamków', T`\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}`]
        ],
        examples: [
          ['Skracanie', '1 pkt', T`Uprość wyrażenie $\frac{x^2 - 9}{2x + 6}$ dla $x \neq -3$.`, T`1. Licznik: $(x - 3)(x + 3)$.` + '\n' + T`2. Mianownik: $2(x + 3)$.` + '\n' + T`3. Po skróceniu $(x + 3)$: $\frac{x - 3}{2}$.`, 'Najpierw czynniki, potem skracanie.'],
          ['Dodawanie', '1 pkt', T`Zapisz w postaci jednego ułamka $\frac{1}{x} + \frac{2}{x + 1}$.`, T`1. Wspólny mianownik: $x(x + 1)$.` + '\n' + T`2. $\frac{x + 1}{x(x + 1)} + \frac{2x}{x(x + 1)} = \frac{3x + 1}{x(x + 1)}$.`, 'Każdy ułamek rozszerzasz przez „brakujący” czynnik.']
        ],
        trap: T`W ułamku $\frac{x + 6}{x}$ NIE WOLNO skrócić $x$. Skracamy tylko czynniki iloczynu, nigdy składniki sumy.`,
        fail: T`$\frac{x^2 - 9}{x - 3} = x - 3$ po „skróceniu” $x^2$ z $x$ i $9$ z $3$.`,
        win: T`$\frac{x^2 - 9}{x - 3} = \frac{(x - 3)(x + 3)}{x - 3} = x + 3$.`,
        why: 'Skracanie to dzielenie licznika i mianownika przez tę samą liczbę. Sumę można podzielić tylko w całości.',
        ckeTip: 'Sprawdź wynik liczbą spoza zakazanych: podstaw np. $x = 1$ do wyrażenia wyjściowego i do swojej odpowiedzi.',
        points: [T`Mianownik różny od zera – to wyznacza dziedzinę.`, T`Przed skracaniem rozłóż licznik i mianownik na czynniki.`, T`Dodawanie wymaga wspólnego mianownika.`]
      }),
      gens: [ratSimplifyDiff, ratDomain, ratAdd, ratMultiply, ratValue]
    },
    {
      title: 'Dowody algebraiczne: podzielność, reszty i nierówności',
      short_title: 'Dowody algebraiczne',
      time: '~6 min',
      pill: pill({
        essence: T`Zadanie „wykaż, że” wymaga rachunku na literach, a nie sprawdzenia kilku przykładów. Podzielność przez $k$ pokazujesz, doprowadzając wyrażenie do postaci $k \cdot (\text{liczba całkowita})$. Liczbę dającą resztę $r$ przy dzieleniu przez $d$ zapisujesz jako $dk + r$. Nierówność dowodzisz najczęściej, przenosząc wszystko na jedną stronę i zwijając do kwadratu, bo kwadrat nigdy nie jest ujemny.`,
        context: 'Zadanie otwarte za 2 pkt („Wykaż, że…”) pojawia się w każdym arkuszu, zwykle jako zadanie 3–5.',
        pl: T`Dowód to nie „u mnie działa”. To, że coś zgadza się dla $1$, $2$ i $3$, niczego nie dowodzi. Musisz pokazać mechanizm: na przykład że wyrażenie zawsze da się zapisać jako „$6$ razy coś całkowitego” – wtedy dzieli się przez $6$ dla każdej liczby.`,
        steps: [
          ['Zapisz liczby na literach', T`Parzysta: $2n$. Nieparzysta: $2n + 1$. Kolejne: $n$, $n + 1$, $n + 2$. Reszta $2$ z dzielenia przez $5$: $5k + 2$.`, T`Zawsze dopisz: „$n$ jest liczbą całkowitą”.`],
          ['Przekształć wyrażenie', T`Rozwiń nawiasy, zredukuj wyrazy podobne, wyłącz wspólny czynnik.`, 'Celem jest iloczyn albo kwadrat.'],
          ['Zapisz wniosek słowami', T`„Liczba $3(n + 1)$ jest iloczynem $3$ i liczby całkowitej, więc dzieli się przez $3$.”`, 'Bez zdania końcowego tracisz punkt.']
        ],
        formulas: [
          ['Liczba parzysta i nieparzysta', T`2n \quad \text{oraz} \quad 2n + 1`],
          ['Dzielenie z resztą', T`n = d \cdot k + r, \quad 0 \le r < d`],
          ['Kwadrat jest nieujemny', T`(a - b)^2 \ge 0`]
        ],
        examples: [
          ['Podzielność', '2 pkt', T`Wykaż, że dla każdej liczby całkowitej $n$ liczba $(n + 3)^2 - n^2$ jest podzielna przez $3$.`, T`1. $(n + 3)^2 - n^2 = n^2 + 6n + 9 - n^2 = 6n + 9$.` + '\n' + T`2. $6n + 9 = 3(2n + 3)$.` + '\n' + T`3. $2n + 3$ jest liczbą całkowitą, więc $3(2n + 3)$ dzieli się przez $3$.`, 'Dowód kończy się zdaniem z wnioskiem.'],
          ['Nierówność', '2 pkt', T`Wykaż, że dla każdej liczby rzeczywistej $x$ prawdziwa jest nierówność $x^2 + 10 > 6x$.`, T`1. Przenosimy: $x^2 - 6x + 10 > 0$.` + '\n' + T`2. $x^2 - 6x + 9 + 1 = (x - 3)^2 + 1$.` + '\n' + T`3. $(x - 3)^2 \ge 0$, więc $(x - 3)^2 + 1 \ge 1 > 0$.`, 'Zwijaj do kwadratu i dodawaj to, co zostało.']
        ],
        trap: T`Sprawdzenie dla $n = 1, 2, 3$ to NIE jest dowód. Za same przykłady dostaniesz 0 punktów.`,
        fail: T`„Dla $n = 1$: $16 - 1 = 15$, dzieli się przez $3$. Dla $n = 2$: $25 - 4 = 21$, też się dzieli. Zatem zawsze się dzieli.”`,
        win: T`„$(n + 3)^2 - n^2 = 6n + 9 = 3(2n + 3)$, a $2n + 3$ jest liczbą całkowitą.”`,
        why: 'Liczb całkowitych jest nieskończenie wiele, więc żadna liczba przykładów nie wyczerpuje wszystkich przypadków.',
        ckeTip: 'Przykłady policz w brudnopisie, żeby zrozumieć zadanie – ale do czystopisu wpisz rachunek ogólny.',
        points: [T`Podzielność przez $k$: doprowadź do postaci $k \cdot (\ldots)$.`, T`Reszta $r$ z dzielenia przez $d$: zapis $dk + r$.`, T`Nierówność: wszystko na jedną stronę i zwijanie do kwadratu.`]
      }),
      gens: [proofRemainder, proofDivisible, proofConsecutive, proofMinValue, proofStatements]
    }
  ]
};
