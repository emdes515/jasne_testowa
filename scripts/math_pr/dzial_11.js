import { T, mc, num, pf, open, pill, fr, gcd, m, need, xm, sq } from '../math_pp/lib.js';
import { pickTwo, terms, frs } from './common.js';
import { pt, vec, dist2, lineTex, R5 } from './geo.js';

const TIP_VEC = 'Karta wzorów, str. 23: $\\overrightarrow{AB} = [x_B - x_A, y_B - y_A]$, $|\\vec{u}| = \\sqrt{u_1^2 + u_2^2}$.';
const TIP_LINE = 'Karta wzorów, str. 21: proste $y = a_1x + b_1$ i $y = a_2x + b_2$ są prostopadłe, gdy $a_1 \\cdot a_2 = -1$; w postaci ogólnej, gdy $A_1A_2 + B_1B_2 = 0$.';
const TIP_CIRCLE = 'Karta wzorów, str. 23: okrąg o środku $(a, b)$ i promieniu $r$: $(x - a)^2 + (y - b)^2 = r^2$. Styczna jest prostopadła do promienia w punkcie styczności.';
const TIP_TWO = 'Dwa okręgi: porównaj odległość środków $d$ z $r_1 + r_2$ i $|r_1 - r_2|$. Punkty wspólne znajdziesz, odejmując równania okręgów – zostaje równanie prostej.';
const TIP_DIST = 'Karta wzorów, str. 22: odległość punktu $(x_0, y_0)$ od prostej $Ax + By + C = 0$ to $\\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$.';

/** Równanie okręgu (x - a)^2 + (y - b)^2 = r2. */
const circleTex = (a, b, r2) => `${a ? `(${xm(a)})^2` : 'x^2'} + ${b ? `(${xm(b, 'y')})^2` : 'y^2'} = ${r2}`;
/** Prosta w postaci ogólnej Ax + By + C = 0 (wspólny dzielnik usunięty, A > 0 albo A = 0 i B > 0). */
function generalLine(A, B, C) {
  const g = gcd(gcd(Math.abs(A), Math.abs(B)), Math.abs(C)) || 1;
  let [a, b, c] = [A / g, B / g, C / g];
  if (a < 0 || (a === 0 && b < 0)) [a, b, c] = [-a, -b, -c];
  return { a, b, c, tex: `${terms([[a, 'x'], [b, 'y'], [c, '']])} = 0` };
}
/** Prosta przez dwa punkty (niepionowa) jako y = mx + c z ułamkami. */
function lineThrough([x1, y1], [x2, y2]) {
  need(x1 !== x2);
  const mn = y2 - y1;
  const md = x2 - x1;
  // c = y1 - m x1 = (y1 md - mn x1) / md
  return { mn, md, cn: y1 * md - mn * x1, cd: md, tex: lineTex(mn, md, y1 * md - mn * x1, md) };
}
const sortPts = (ps) => [...ps].sort((p, q) => p[0] - q[0] || p[1] - q[1]);
const ptsTex = (ps) => sortPts(ps).map(([x, y]) => pt(x, y)).join(' \\ \\text{i} \\ ');

// ---------- 11.1 Wektory ----------
const vectorAB = (r) => {
  const A = [r.int(-6, 6), r.int(-6, 6)];
  const B = [r.int(-6, 6), r.int(-6, 6)];
  need(A[0] !== B[0] && A[1] !== B[1]);
  const [u1, u2] = [B[0] - A[0], B[1] - A[1]];
  return mc({
    title: 'Współrzędne wektora',
    q: T`Dane są punkty $A = ${pt(...A)}$ i $B = ${pt(...B)}$. Wektor $\overrightarrow{AB}$ ma współrzędne`,
    ok: m(vec(u1, u2)),
    bad: [m(vec(-u1, -u2)), m(vec(A[0] + B[0], A[1] + B[1])), m(vec(u2, u1)), m(vec(u1, -u2))],
    steps: [T`$\overrightarrow{AB} = [x_B - x_A, y_B - y_A]$.`, T`$\overrightarrow{AB} = [${B[0]} - ${A[0] < 0 ? `(${A[0]})` : A[0]}, ${B[1]} - ${A[1] < 0 ? `(${A[1]})` : A[1]}] = ${vec(u1, u2)}$.`],
    trap: 'Zawsze KONIEC minus POCZĄTEK. Odwrotna kolejność daje wektor $\\overrightarrow{BA}$.',
    tip: TIP_VEC
  });
};

const vectorLength = (r) => {
  const u = [r.int(-5, 5), r.int(-5, 5)];
  const v = [r.int(-5, 5), r.int(-5, 5)];
  const k = r.pick([2, 3, -1, -2]);
  const w = [u[0] + k * v[0], u[1] + k * v[1]];
  const L = Math.sqrt(w[0] ** 2 + w[1] ** 2);
  need(Number.isInteger(L) && L > 0 && v[0] !== 0 && v[1] !== 0);
  const kv = k === -1 ? '-\\vec{v}' : `${k}\\vec{v}`;
  return num({
    title: 'Długość kombinacji wektorów',
    q: T`Dane są wektory $\vec{u} = ${vec(...u)}$ i $\vec{v} = ${vec(...v)}$. Oblicz długość wektora $\vec{u} ${k < 0 ? '' : '+ '}${kv}$. Wpisz liczbę.`,
    ans: L,
    steps: [T`$\vec{u} ${k < 0 ? '' : '+ '}${kv} = ${vec(...w)}$.`, T`Długość: $\sqrt{${w[0] < 0 ? `(${w[0]})` : w[0]}^2 + ${w[1] < 0 ? `(${w[1]})` : w[1]}^2} = ${L}$.`],
    trap: 'Mnożąc wektor przez liczbę, mnożysz OBIE współrzędne – także ze znakiem.',
    tip: TIP_VEC
  });
};

const parallelogramD = (r) => {
  const A = [r.int(-5, 5), r.int(-5, 5)];
  const B = [r.int(-5, 5), r.int(-5, 5)];
  const C = [r.int(-5, 5), r.int(-5, 5)];
  need((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]) !== 0);
  const D = [A[0] + C[0] - B[0], A[1] + C[1] - B[1]];
  return mc({
    title: 'Czwarty wierzchołek równoległoboku',
    q: T`Punkty $A = ${pt(...A)}$, $B = ${pt(...B)}$, $C = ${pt(...C)}$ są kolejnymi wierzchołkami równoległoboku $ABCD$. Wierzchołek $D$ ma współrzędne`,
    ok: m(pt(...D)),
    bad: [m(pt(B[0] + C[0] - A[0], B[1] + C[1] - A[1])), m(pt(A[0] + B[0] - C[0], A[1] + B[1] - C[1])), m(pt(C[0] - B[0], C[1] - B[1])), m(pt(-D[0], -D[1]))],
    steps: [T`W równoległoboku $\overrightarrow{AD} = \overrightarrow{BC} = ${vec(C[0] - B[0], C[1] - B[1])}$.`, T`$D = A + \overrightarrow{BC} = ${pt(...D)}$.`],
    trap: 'Kolejność wierzchołków $ABCD$ ma znaczenie – wektor $\\overrightarrow{AD}$ jest równy $\\overrightarrow{BC}$, nie $\\overrightarrow{CB}$.',
    tip: TIP_VEC
  });
};

const vectorFacts = (r) => {
  const mk = () => {
    const u = [r.int(-4, 4), r.int(-4, 4)];
    need(u[0] !== 0 && u[1] !== 0);
    const k = r.pick([2, 3, -2, -1]);
    const honest = r.bool();
    const v = [k * u[0], k * u[1] + (honest ? 0 : r.pick([1, -1]))];
    const truth = u[0] * v[1] - u[1] * v[0] === 0;
    return [T`Wektory $${vec(...u)}$ i $${vec(...v)}$ są równoległe.`, truth, truth ? T`$${vec(...v)} = ${k} \cdot ${vec(...u)}$.` : T`Nie istnieje liczba $k$, dla której $${vec(...v)} = k \cdot ${vec(...u)}$.`];
  };
  return pf({ title: 'Wektory równoległe', s1: mk(), s2: mk(), trap: 'Wektory są równoległe, gdy jeden jest wielokrotnością drugiego – sprawdź OBIE współrzędne tym samym $k$.', tip: TIP_VEC });
};

const openParallelogram = (r) => {
  const A = [r.int(-5, 5), r.int(-5, 5)];
  const B = [r.int(-5, 5), r.int(-5, 5)];
  const C = [r.int(-5, 5), r.int(-5, 5)];
  need((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]) !== 0);
  const D = [A[0] + C[0] - B[0], A[1] + C[1] - B[1]];
  const bd2 = dist2(B, D);
  return open({
    title: 'Równoległobok w układzie współrzędnych',
    q: T`Punkty $A = ${pt(...A)}$, $B = ${pt(...B)}$, $C = ${pt(...C)}$ są kolejnymi wierzchołkami równoległoboku $ABCD$. Wyznacz współrzędne wierzchołka $D$ i oblicz długość przekątnej $BD$.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie warunku $\overrightarrow{AD} = \overrightarrow{BC}$ (lub środek $AC$ = środek $BD$).`],
      [2, 'Etap 2', T`Wyznaczenie $D = ${pt(...D)}$.`],
      [3, 'Komplet', T`Obliczenie $|BD| = ${sq(bd2)}$.`]
    ],
    steps: [
      T`$\overrightarrow{BC} = ${vec(C[0] - B[0], C[1] - B[1])}$, a w równoległoboku $\overrightarrow{AD} = \overrightarrow{BC}$.`,
      T`$D = ${pt(A[0] + C[0] - B[0], A[1] + C[1] - B[1])}$.`,
      T`$|BD| = \sqrt{${D[0] - B[0] < 0 ? `(${D[0] - B[0]})` : D[0] - B[0]}^2 + ${D[1] - B[1] < 0 ? `(${D[1] - B[1]})` : D[1] - B[1]}^2} = ${sq(bd2)}$.`
    ],
    trap: 'Sprawdź wynik: środki przekątnych $AC$ i $BD$ muszą się pokrywać.',
    tip: TIP_VEC,
    answer: m(T`D = ${pt(...D)}, \ |BD| = ${sq(bd2)}`)
  });
};

// ---------- 11.2 Prosta prostopadła i styczna ----------
const SLOPES = [[1, 1], [-1, 1], [2, 1], [-2, 1], [3, 1], [-3, 1], [1, 2], [-1, 2], [1, 3], [-1, 3], [2, 3], [-2, 3], [3, 2], [-3, 2]];

const perpendicularLine = (r) => {
  const [an, ad] = r.pick(SLOPES);
  const b = r.int(-6, 6);
  const P = [r.int(-5, 5), r.int(-5, 5)];
  // prostopadła: m = -ad/an
  const [mn, md] = an < 0 ? [ad, -an] : [-ad, an];
  const line = (sn, sd) => lineTex(sn, sd, P[1] * sd - sn * P[0], sd);
  const ok = line(mn, md);
  return mc({
    title: 'Prosta prostopadła przez punkt',
    q: T`Prosta prostopadła do prostej $${lineTex(an, ad, b)}$ i przechodząca przez punkt $P = ${pt(...P)}$ ma równanie`,
    ok: m(ok),
    bad: [m(line(an, ad)), m(line(-mn, md)), m(line(ad, an < 0 ? -an : an) === ok ? line(-an, ad) : line(ad, Math.abs(an) * Math.sign(an))), m(lineTex(mn, md, b))].filter((x) => x !== m(ok)),
    steps: [
      T`Współczynnik kierunkowy prostopadłej: $a_2 = -\frac{1}{a_1} = ${fr(mn, md)}$.`,
      T`Prosta przechodzi przez $P$: $${P[1]} = ${fr(mn, md)} \cdot ${P[0] < 0 ? `(${P[0]})` : P[0]} + b$, więc $${ok}$.`
    ],
    trap: 'Prostopadła ma współczynnik ODWROTNY i PRZECIWNY: z $a$ robisz $-\\frac{1}{a}$, a nie tylko $-a$ albo $\\frac{1}{a}$.',
    tip: TIP_LINE
  });
};

const perpendicularParam = (r) => {
  const p = r.pick([1, 2, 3]);
  const q = r.int(-3, 3);
  const a = r.pick([-3, -2, -1, 2, 3, 4]);
  // (p m + q) a = -1 => m = (-1 - q a) / (p a)
  const mn = -1 - q * a;
  const md = p * a;
  const val = mn / md;
  need(Math.abs((p * val + q) * a + 1) < 1e-12);
  return mc({
    title: 'Parametr a prostopadłość',
    q: T`Proste o równaniach $y = (${terms([[p, 'm'], [q, '']])})x + 3$ i $y = ${a === -1 ? '-' : a}x - 5$ są prostopadłe dla $m$ równego`,
    ok: m(fr(mn, md)),
    val,
    bad: [m(fr(1 - q * a, p * a)), m(fr(-a - q, p)), m(fr(a - q, p)), m(fr(-mn, md))],
    steps: [T`Warunek prostopadłości: $(${terms([[p, 'm'], [q, '']])}) \cdot ${a < 0 ? `(${a})` : a} = -1$.`, T`$${terms([[p, 'm'], [q, '']])} = ${fr(-1, a)}$, więc $m = ${fr(mn, md)}$.`],
    trap: 'Iloczyn współczynników kierunkowych prostych prostopadłych to $-1$, a nie $1$ ani $0$.',
    tip: TIP_LINE
  });
};

const tangentIntercept = (r) => {
  const S = [r.int(-4, 4), r.int(-4, 4)];
  const [dx, dy] = r.pick(R5.filter(([x, y]) => x && y));
  const P = [S[0] + dx, S[1] + dy];
  // styczna: m = -dx/dy, c = Py - m Px
  const c = P[1] + (dx * P[0]) / dy;
  need(Math.abs(c * 100 - Math.round(c * 100)) < 1e-9);
  return num({
    title: 'Styczna do okręgu',
    q: T`Prosta $y = ax + b$ jest styczna do okręgu $${circleTex(S[0], S[1], 25)}$ w punkcie $P = ${pt(...P)}$. Oblicz $b$. Wpisz liczbę.`,
    ans: c,
    steps: [
      T`Środek $S = ${pt(...S)}$, $\overrightarrow{SP} = ${vec(dx, dy)}$, więc prosta $SP$ ma współczynnik $${fr(dy, dx)}$.`,
      T`Styczna jest prostopadła do $SP$: $a = ${fr(-dx, dy)}$. Z punktu $P$: $b = ${P[1]} - \left(${fr(-dx, dy)}\right) \cdot ${P[0] < 0 ? `(${P[0]})` : P[0]} = ${fr(P[1] * dy + dx * P[0], dy)}$.`
    ],
    trap: 'Styczna jest prostopadła do PROMIENIA $SP$, a nie przechodzi przez środek okręgu.',
    tip: TIP_CIRCLE
  });
};

const perpendicularFacts = (r) => {
  const mk = () => {
    const A1 = r.int(-5, 5);
    const B1 = r.int(-5, 5);
    need(A1 !== 0 && B1 !== 0);
    const honest = r.bool();
    const k = r.pick([1, 2, -1]);
    const [A2, B2] = honest ? [k * B1, -k * A1] : [k * B1 + r.pick([1, -1]), -k * A1];
    const l1 = generalLine(A1, B1, r.int(-6, 6));
    const l2 = generalLine(A2, B2, r.int(-6, 6));
    const dot = l1.a * l2.a + l1.b * l2.b;
    need(l2.a !== 0 || l2.b !== 0);
    return [T`Proste $${l1.tex}$ i $${l2.tex}$ są prostopadłe.`, dot === 0, T`$A_1A_2 + B_1B_2 = ${l1.a} \cdot ${l2.a < 0 ? `(${l2.a})` : l2.a} + ${l1.b < 0 ? `(${l1.b})` : l1.b} \cdot ${l2.b < 0 ? `(${l2.b})` : l2.b} = ${dot}$.`];
  };
  return pf({ title: 'Prostopadłość prostych w postaci ogólnej', s1: mk(), s2: mk(), trap: 'W postaci ogólnej sprawdzasz $A_1A_2 + B_1B_2 = 0$ – bez przeliczania na postać kierunkową.', tip: TIP_LINE });
};

const openTangent = (r) => {
  const S = [r.int(-5, 5), r.int(-5, 5)];
  const [dx, dy] = r.pick(R5.filter(([x, y]) => x && y));
  const P = [S[0] + dx, S[1] + dy];
  const [mn, md] = [-dx, dy];
  const t = lineTex(mn, md, P[1] * md - mn * P[0], md);
  return open({
    title: 'Równanie stycznej do okręgu',
    q: T`Wyznacz równanie stycznej do okręgu $${circleTex(S[0], S[1], 25)}$ w punkcie $P = ${pt(...P)}$.`,
    stages: [
      [1, 'Etap 1', T`Wyznaczenie środka $S = ${pt(...S)}$ i współczynnika kierunkowego prostej $SP$: $${fr(dy, dx)}$.`],
      [2, 'Etap 2', T`Współczynnik kierunkowy stycznej (prostopadłej do $SP$): $${fr(mn, md)}$.`],
      [3, 'Komplet', T`Równanie stycznej: $${t}$.`]
    ],
    steps: [
      T`Środek okręgu $S = ${pt(...S)}$; współczynnik prostej $SP$: $\frac{${P[1]} - ${S[1] < 0 ? `(${S[1]})` : S[1]}}{${P[0]} - ${S[0] < 0 ? `(${S[0]})` : S[0]}} = ${fr(dy, dx)}$.`,
      T`Styczna $\perp SP$: $a = -\frac{1}{${fr(dy, dx)}} = ${fr(mn, md)}$.`,
      T`Przez punkt $P$: $${t}$.`
    ],
    trap: 'Sprawdź, czy $P$ leży na okręgu – inaczej „styczna w punkcie $P$” nie ma sensu.',
    tip: TIP_CIRCLE,
    answer: m(t)
  });
};

// ---------- 11.3 Prosta i okrąg ----------
const lineCircleCount = (r) => {
  const a = r.int(-4, 4);
  const b = r.int(-4, 4);
  const rr = r.int(1, 5);
  const s = r.pick([0, 1, -1, 2, -2]);
  const c = r.int(-8, 8);
  // d^2 = (s a - b + c)^2 / (s^2 + 1)
  const lhs = (s * a - b + c) ** 2;
  const rhs = rr * rr * (s * s + 1);
  const n = lhs < rhs ? 2 : lhs === rhs ? 1 : 0;
  return num({
    title: 'Liczba punktów wspólnych prostej i okręgu',
    q: T`Ile punktów wspólnych mają prosta $${lineTex(s, 1, c)}$ i okrąg $${circleTex(a, b, rr * rr)}$? Wpisz liczbę.`,
    ans: n,
    steps: [
      T`Prosta w postaci ogólnej: $${generalLine(s, -1, c).tex}$; środek $S = ${pt(a, b)}$, $r = ${rr}$.`,
      T`$d = \frac{|${s} \cdot ${a < 0 ? `(${a})` : a} - ${b < 0 ? `(${b})` : b} + ${c < 0 ? `(${c})` : c}|}{\sqrt{${s * s + 1}}}$, więc $d^2 = ${fr(lhs, s * s + 1)}$, a $r^2 = ${rr * rr}$ – ${n === 2 ? 'odległość mniejsza od promienia: dwa punkty' : n === 1 ? 'odległość równa promieniowi: jeden punkt (styczna)' : 'odległość większa od promienia: brak punktów'}.`
    ],
    trap: 'Porównujesz odległość ŚRODKA od prostej z promieniem – kwadraty obu liczb pozwalają uniknąć pierwiastków.',
    tip: TIP_DIST
  });
};

/** Dwa punkty kratowe okręgu o promieniu 5 i środku S, wyznaczające niepionową cięciwę. */
const chordOn = (r, S) => {
  const [p, q] = pickTwo(r, R5);
  const P = [S[0] + p[0], S[1] + p[1]];
  const Q = [S[0] + q[0], S[1] + q[1]];
  need(P[0] !== Q[0]);
  return [P, Q];
};

const lineCirclePoints = (r) => {
  const S = [r.int(-3, 3), r.int(-3, 3)];
  const [P, Q] = chordOn(r, S);
  const l = lineThrough(P, Q);
  const ok = ptsTex([P, Q]);
  const reflect = ([x, y]) => [2 * S[0] - x, y];
  return mc({
    title: 'Punkty wspólne prostej i okręgu',
    q: T`Punktami wspólnymi prostej $${l.tex}$ i okręgu $${circleTex(S[0], S[1], 25)}$ są`,
    ok: m(ok),
    bad: [m(ptsTex([[P[1], P[0]], [Q[1], Q[0]]])), m(ptsTex([reflect(P), reflect(Q)])), m(ptsTex([[-P[0], -P[1]], [-Q[0], -Q[1]]])), m(ptsTex([P, [Q[0], -Q[1]]]))].filter((x) => x !== m(ok)),
    steps: [T`Podstawiamy $y$ z równania prostej do równania okręgu i rozwiązujemy równanie kwadratowe z $x$.`, T`Rozwiązania $x = ${sortPts([P, Q])[0][0]}$ i $x = ${sortPts([P, Q])[1][0]}$ dają punkty $${ok}$.`],
    trap: 'Sprawdź każdy punkt w OBU równaniach – wystarczy podstawić.',
    tip: TIP_CIRCLE
  });
};

const chordLength = (r) => {
  const S = [r.int(-4, 4), r.int(-4, 4)];
  const [P, Q] = chordOn(r, S);
  const L = Math.sqrt(dist2(P, Q));
  need(Number.isInteger(L));
  const l = lineThrough(P, Q);
  return num({
    title: 'Długość cięciwy',
    q: T`Prosta $${l.tex}$ przecina okrąg $${circleTex(S[0], S[1], 25)}$ w punktach $A$ i $B$. Oblicz $|AB|$. Wpisz liczbę.`,
    ans: L,
    steps: [T`Punkty wspólne: $${ptsTex([P, Q])}$.`, T`$|AB| = \sqrt{${(Q[0] - P[0]) ** 2} + ${(Q[1] - P[1]) ** 2}} = ${L}$.`],
    trap: 'Zamiast punktów możesz użyć odległości $d$ środka od prostej: $|AB| = 2\\sqrt{r^2 - d^2}$.',
    tip: TIP_CIRCLE
  });
};

const circleLineFacts = (r) => {
  const a = r.int(-4, 4);
  const b = r.int(-4, 4);
  const rr = r.int(2, 5);
  const k = r.bool() ? b + rr * r.pick([1, -1]) : b + rr + r.pick([1, -1]);
  const [dx, dy] = r.pick([[rr, 0], [0, rr], [rr, 1], [1, rr]]);
  const P = [a + dx, b + dy];
  const onC = dx * dx + dy * dy === rr * rr;
  return pf({
    title: 'Prosta, punkt i okrąg',
    stem: '',
    s1: [T`Prosta $y = ${k}$ jest styczna do okręgu $${circleTex(a, b, rr * rr)}$.`, Math.abs(k - b) === rr, T`Odległość środka $${pt(a, b)}$ od prostej to $|${k} - ${b < 0 ? `(${b})` : b}| = ${Math.abs(k - b)}$, a $r = ${rr}$.`],
    s2: [T`Punkt $${pt(...P)}$ leży na okręgu $${circleTex(a, b, rr * rr)}$.`, onC, T`Lewa strona po podstawieniu: $${dx * dx + dy * dy}$, a prawa: $${rr * rr}$.`],
    trap: 'Prosta pozioma $y = k$ jest styczna, gdy $|k - b| = r$.',
    tip: TIP_CIRCLE
  });
};

const openLineParam = (r) => {
  const a = r.int(-4, 4);
  const b = r.int(-4, 4);
  const k = r.int(1, 3);
  const s = r.pick([1, -1]);
  const r2 = 2 * k * k;
  // prosta y = s x + m;  d = |s a - b + m| / sqrt(2) < k sqrt(2)  <=>  |s a - b + m| < 2k
  const center = b - s * a;
  const [lo, hi] = [center - 2 * k, center + 2 * k];
  const disc = (mm) => (s * (mm - b) - a) ** 2 - 2 * (a * a + (mm - b) ** 2 - r2);
  need(Math.abs(disc(lo)) < 1e-9 && Math.abs(disc(hi)) < 1e-9 && disc(center) > 0);
  const lineT = `y = ${s < 0 ? '-' : ''}x + m`;
  return open({
    title: 'Parametr: dwa punkty wspólne prostej i okręgu',
    q: T`Wyznacz wszystkie wartości parametru $m$, dla których prosta $${lineT}$ ma z okręgiem $${circleTex(a, b, r2)}$ dwa punkty wspólne.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie warunku: odległość środka $S = ${pt(a, b)}$ od prostej jest mniejsza od $r = ${k === 1 ? '' : k}\sqrt{2}$ (albo podstawienie do równania okręgu i warunek $\Delta > 0$).`],
      [2, 'Etap 2', T`Zapisanie nierówności $\frac{|${terms([[s, 'a'], [-1, 'b']]).replace('a', `${a < 0 ? `(${a})` : a}`).replace('b', `${b < 0 ? `(${b})` : b}`)} + m|}{\sqrt{2}} < ${k === 1 ? '' : k}\sqrt{2}$.`],
      [3, 'Etap 3', T`Rozwiązanie nierówności z wartością bezwzględną: $|m ${center <= 0 ? '+' : '-'} ${Math.abs(center)}| < ${2 * k}$.`.replace(/ [+-] 0\|/, '|')],
      [4, 'Komplet', T`Odpowiedź: $m \in (${lo}, ${hi})$.`]
    ],
    steps: [
      T`Prosta w postaci ogólnej: $${s > 0 ? 'x - y + m' : 'x + y - m'} = 0$; środek $S = ${pt(a, b)}$, $r = \sqrt{${r2}} = ${k === 1 ? '' : k}\sqrt{2}$.`,
      T`Warunek $d < r$: $\frac{|m ${center <= 0 ? '+' : '-'} ${Math.abs(center)}|}{\sqrt{2}} < ${k === 1 ? '' : k}\sqrt{2}$, czyli $|m ${center <= 0 ? '+' : '-'} ${Math.abs(center)}| < ${2 * k}$.`.replace(/m [+-] 0\|/g, 'm|'),
      T`$${lo} < m < ${hi}$.`
    ],
    trap: 'Dwa punkty wspólne to NIERÓWNOŚĆ OSTRA ($d < r$, $\\Delta > 0$). Przy $d = r$ prosta jest styczna.',
    tip: TIP_DIST,
    answer: m(`m \\in (${lo}, ${hi})`)
  });
};

// ---------- 11.4 Dwa okręgi ----------
const POSITIONS = {
  outside: 'są rozłączne zewnętrznie',
  extTangent: 'są styczne zewnętrznie',
  cross: 'przecinają się w dwóch punktach',
  intTangent: 'są styczne wewnętrznie',
  inside: 'leżą jeden wewnątrz drugiego i nie mają punktów wspólnych'
};
const position = (d2, r1, r2) => {
  if (d2 > (r1 + r2) ** 2) return 'outside';
  if (d2 === (r1 + r2) ** 2) return 'extTangent';
  if (d2 > (r1 - r2) ** 2) return 'cross';
  if (d2 === (r1 - r2) ** 2) return 'intTangent';
  return 'inside';
};
const twoCircles = (r) => {
  const S1 = [r.int(-4, 4), r.int(-4, 4)];
  const [dx, dy] = r.pick([[3, 4], [4, 3], [-3, 4], [0, 5], [5, 0], [6, 8], [0, 3], [4, 0], [-4, 3], [0, 2]]);
  const S2 = [S1[0] + dx, S1[1] + dy];
  const r1 = r.int(1, 8);
  const r2 = r.intNot(1, 8, r1);
  return { S1, S2, r1, r2, d2: dx * dx + dy * dy };
};

const circlesCount = (r) => {
  const { S1, S2, r1, r2, d2 } = twoCircles(r);
  const pos = position(d2, r1, r2);
  const n = { outside: 0, extTangent: 1, cross: 2, intTangent: 1, inside: 0 }[pos];
  return num({
    title: 'Liczba punktów wspólnych dwóch okręgów',
    q: T`Ile punktów wspólnych mają okręgi $${circleTex(S1[0], S1[1], r1 * r1)}$ i $${circleTex(S2[0], S2[1], r2 * r2)}$? Wpisz liczbę.`,
    ans: n,
    steps: [T`$S_1 = ${pt(...S1)}$, $r_1 = ${r1}$; $S_2 = ${pt(...S2)}$, $r_2 = ${r2}$; $d = |S_1S_2| = ${Math.sqrt(d2)}$.`, T`$r_1 + r_2 = ${r1 + r2}$, $|r_1 - r_2| = ${Math.abs(r1 - r2)}$ – okręgi ${POSITIONS[pos]}.`],
    trap: 'Styczność wewnętrzna ($d = |r_1 - r_2|$) też daje jeden punkt wspólny.',
    tip: TIP_TWO
  });
};

const circlesPosition = (r) => {
  const { S1, S2, r1, r2, d2 } = twoCircles(r);
  const pos = position(d2, r1, r2);
  return mc({
    title: 'Wzajemne położenie okręgów',
    q: T`Okręgi o środkach $S_1 = ${pt(...S1)}$, $S_2 = ${pt(...S2)}$ i promieniach $r_1 = ${r1}$, $r_2 = ${r2}$`,
    ok: POSITIONS[pos],
    bad: r.shuffle(Object.keys(POSITIONS).filter((k) => k !== pos)).map((k) => POSITIONS[k]),
    steps: [T`$d = |S_1S_2| = \sqrt{${d2}} = ${Math.sqrt(d2)}$.`, T`Porównanie z $r_1 + r_2 = ${r1 + r2}$ i $|r_1 - r_2| = ${Math.abs(r1 - r2)}$: okręgi ${POSITIONS[pos]}.`],
    trap: 'Najpierw policz odległość środków – bez niej nie rozstrzygniesz położenia.',
    tip: TIP_TWO
  });
};

const tangentRadius = (r) => {
  const S1 = [r.int(-4, 4), r.int(-4, 4)];
  const [dx, dy] = r.pick([[3, 4], [4, 3], [-3, 4], [6, 8], [5, 12], [-8, 6], [0, 7], [9, 0]]);
  const S2 = [S1[0] + dx, S1[1] + dy];
  const d = Math.sqrt(dx * dx + dy * dy);
  const r1 = r.int(1, d - 1);
  const r2 = d - r1;
  return mc({
    title: 'Promień okręgu stycznego zewnętrznie',
    q: T`Okrąg o środku $S_2 = ${pt(...S2)}$ jest styczny zewnętrznie do okręgu $${circleTex(S1[0], S1[1], r1 * r1)}$. Promień okręgu o środku $S_2$ jest równy`,
    ok: m(`${r2}`),
    val: r2,
    bad: [m(`${d + r1}`), m(`${d}`), m(`${Math.abs(r2 - r1) || d + 1}`), m(`${r1}`)],
    steps: [T`$d = |S_1S_2| = \sqrt{${dx * dx + dy * dy}} = ${d}$.`, T`Styczność zewnętrzna: $d = r_1 + r_2$, więc $r_2 = ${d} - ${r1} = ${r2}$.`],
    trap: 'Przy styczności zewnętrznej promienie DODAJESZ, przy wewnętrznej – odejmujesz.',
    tip: TIP_TWO
  });
};

const generalCircleFacts = (r) => {
  const mk = () => {
    const a = r.int(-5, 5);
    const b = r.int(-5, 5);
    const rr = r.int(1, 6);
    need(a !== 0 && b !== 0);
    const eq = `x^2 + y^2 ${terms([[-2 * a, 'x'], [-2 * b, 'y'], [a * a + b * b - rr * rr, '']]).replace(/^(?!-)/, '+ ').replace(/^-/, '- ')} = 0`;
    const askCenter = r.bool();
    const honest = r.bool();
    if (askCenter) {
      const claimed = honest ? [a, b] : [-a, -b];
      return [T`Okrąg $${eq}$ ma środek $${pt(...claimed)}$.`, honest, T`$(x ${a < 0 ? '+' : '-'} ${Math.abs(a)})^2 + (y ${b < 0 ? '+' : '-'} ${Math.abs(b)})^2 = ${rr * rr}$, środek $${pt(a, b)}$.`];
    }
    const claimed = honest ? rr : rr * rr;
    return [T`Okrąg $${eq}$ ma promień $${claimed}$.`, claimed === rr, T`Po uzupełnieniu do kwadratów prawa strona to $${rr * rr}$, więc $r = ${rr}$.`];
  };
  return pf({ title: 'Równanie ogólne okręgu', s1: mk(), s2: mk(), trap: 'Z $x^2 - 2ax$ odczytujesz $a$ z PRZECIWNYM znakiem współczynnika przy $x$, podzielonym przez 2.', tip: TIP_CIRCLE });
};

const openTwoCircles = (r) => {
  const a = r.int(-3, 3);
  const b = r.int(-3, 3);
  const [p, q] = pickTwo(r, R5);
  need(p[0] + q[0] !== 0 || p[1] + q[1] !== 0);
  const [cx, cy] = [p[0] + q[0], p[1] + q[1]];
  const P = [a + p[0], b + p[1]];
  const Q = [a + q[0], b + q[1]];
  // 2cx x + 2cy y = 2cx a + 2cy b + cx^2 + cy^2
  const L = generalLine(2 * cx, 2 * cy, -(2 * cx * a + 2 * cy * b + cx * cx + cy * cy));
  for (const [x, y] of [P, Q]) need(L.a * x + L.b * y + L.c === 0);
  return open({
    title: 'Punkty wspólne dwóch okręgów',
    q: T`Wyznacz współrzędne punktów wspólnych okręgów $${circleTex(a, b, 25)}$ i $${circleTex(a + cx, b + cy, 25)}$.`,
    stages: [
      [1, 'Etap 1', T`Odjęcie równań stronami i otrzymanie równania prostej $${L.tex}$.`],
      [2, 'Etap 2', 'Wyznaczenie jednej zmiennej z równania prostej i podstawienie do równania jednego z okręgów.'],
      [3, 'Etap 3', 'Rozwiązanie otrzymanego równania kwadratowego.'],
      [4, 'Komplet', T`Oba punkty wspólne: $${ptsTex([P, Q])}$.`]
    ],
    steps: [
      T`Po rozwinięciu kwadratów i odjęciu równań wyrazy z $x^2$ i $y^2$ się redukują: $${L.tex}$.`,
      T`Punkty wspólne leżą na tej prostej – podstawiamy ją do równania pierwszego okręgu.`,
      T`Rozwiązania równania kwadratowego dają punkty $${ptsTex([P, Q])}$ (sprawdzenie w obu równaniach).`
    ],
    trap: 'Prosta z odjęcia równań to zbiór kandydatów – punkty wspólne trzeba jeszcze wyznaczyć z równania okręgu.',
    tip: TIP_TWO,
    answer: m(ptsTex([P, Q]))
  });
};

// ---------- 11.5 Zadania 5–6 pkt ----------
const triangleArea = (r) => {
  const A = [r.int(-6, 6), r.int(-6, 6)];
  const B = [r.int(-6, 6), r.int(-6, 6)];
  const C = [r.int(-6, 6), r.int(-6, 6)];
  const det = (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]);
  need(det !== 0);
  return num({
    title: 'Pole trójkąta ze współrzędnych',
    q: T`Oblicz pole trójkąta o wierzchołkach $A = ${pt(...A)}$, $B = ${pt(...B)}$, $C = ${pt(...C)}$. Wpisz liczbę.`,
    ans: Math.abs(det) / 2,
    steps: [
      T`$\overrightarrow{AB} = ${vec(B[0] - A[0], B[1] - A[1])}$, $\overrightarrow{AC} = ${vec(C[0] - A[0], C[1] - A[1])}$.`,
      T`$P = \frac{1}{2}|(x_B - x_A)(y_C - y_A) - (y_B - y_A)(x_C - x_A)| = \frac{1}{2} \cdot ${Math.abs(det)} = ${fr(Math.abs(det), 2)}$.`
    ],
    trap: 'Wyrażenie pod wartością bezwzględną może wyjść ujemne – pole jest zawsze dodatnie.',
    tip: 'Karta wzorów, str. 22: $P = \\frac{1}{2}|(x_B - x_A)(y_C - y_A) - (y_B - y_A)(x_C - x_A)|$.'
  });
};

const pointLineDistance = (r) => {
  const [A, B] = r.pick([[3, 4], [4, 3], [3, -4], [4, -3], [6, 8], [8, -6]]);
  const C = r.int(-10, 10);
  const P = [r.int(-5, 5), r.int(-5, 5)];
  const n = Math.abs(A * P[0] + B * P[1] + C);
  need(n !== 0);
  const den = Math.sqrt(A * A + B * B);
  const L = generalLine(A, B, C);
  need(L.a === A || L.a === -A);
  return num({
    title: 'Odległość punktu od prostej',
    q: T`Oblicz odległość punktu $P = ${pt(...P)}$ od prostej $${L.tex}$. Wpisz liczbę.`,
    ans: Math.round((n / den) * 100) / 100,
    steps: [T`$d = \frac{|${L.a} \cdot ${P[0] < 0 ? `(${P[0]})` : P[0]} + ${L.b < 0 ? `(${L.b})` : L.b} \cdot ${P[1] < 0 ? `(${P[1]})` : P[1]} + ${L.c < 0 ? `(${L.c})` : L.c}|}{\sqrt{${L.a * L.a + L.b * L.b}}}$.`, T`$d = ${frs(Math.abs(L.a * P[0] + L.b * P[1] + L.c), Math.sqrt(L.a * L.a + L.b * L.b))}$.`],
    trap: 'Prostą zapisz najpierw w postaci ogólnej $Ax + By + C = 0$ – z postaci kierunkowej łatwo pomylić znak.',
    tip: TIP_DIST
  });
};

const reflection = (r) => {
  const [A, B] = r.pick([[1, 1], [1, -1], [1, 2], [2, 1], [1, -2], [2, -1]]);
  const C = r.int(-6, 6);
  const P = [r.int(-5, 5), r.int(-5, 5)];
  const v = A * P[0] + B * P[1] + C;
  need(v !== 0 && (2 * v) % (A * A + B * B) === 0);
  const t = (2 * v) / (A * A + B * B);
  const P2 = [P[0] - t * A, P[1] - t * B];
  const foot = [P[0] - (t / 2) * A, P[1] - (t / 2) * B];
  const L = generalLine(A, B, C);
  return mc({
    title: 'Punkt symetryczny względem prostej',
    q: T`Punkt symetryczny do punktu $P = ${pt(...P)}$ względem prostej $${L.tex}$ ma współrzędne`,
    ok: m(pt(...P2)),
    bad: [Number.isInteger(foot[0]) && Number.isInteger(foot[1]) ? m(pt(...foot)) : null, m(pt(-P[0], -P[1])), m(pt(P[1], P[0])), m(pt(P[0] + t * A, P[1] + t * B)), m(pt(P2[1], P2[0]))].filter((x) => x && x !== m(pt(...P2))),
    steps: [
      T`Prosta prostopadła do $${L.tex}$ przez $P$ ma kierunek $${vec(A, B)}$; jej punkt wspólny z daną prostą to środek odcinka $PP'$.`,
      T`Środek $M = ${pt(...foot.map((x) => fr(Math.round(x * 2), 2)))}$, więc $P' = 2M - P = ${pt(...P2)}$.`
    ],
    trap: 'Rzut punktu na prostą to dopiero ŚRODEK odcinka $PP\'$ – punkt symetryczny leży dwa razy dalej.',
    tip: TIP_LINE
  });
};

const coordinateFacts = (r) => {
  const A = [r.int(-5, 5), r.int(-5, 5)];
  const [u, w] = r.bool() ? [[r.int(1, 4), r.int(-4, 4)], null] : [[r.int(1, 4), r.int(-4, 4)], [r.int(-4, 4), r.int(-4, 4)]];
  const B = [A[0] + u[0], A[1] + u[1]];
  const k = r.pick([1, 2, -1]);
  const C = w ? [A[0] + w[0], A[1] + w[1]] : [A[0] - k * u[1], A[1] + k * u[0]];
  const det = (B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0]);
  need(det !== 0);
  const dots = [
    (B[0] - A[0]) * (C[0] - A[0]) + (B[1] - A[1]) * (C[1] - A[1]),
    (A[0] - B[0]) * (C[0] - B[0]) + (A[1] - B[1]) * (C[1] - B[1]),
    (A[0] - C[0]) * (B[0] - C[0]) + (A[1] - C[1]) * (B[1] - C[1])
  ];
  const right = dots.includes(0);
  const claimed = r.bool() ? Math.abs(det) : Math.abs(det) + r.pick([1, 2, -1]);
  need(claimed > 0);
  return pf({
    title: 'Trójkąt w układzie współrzędnych',
    q: T`Dany jest trójkąt o wierzchołkach $A = ${pt(...A)}$, $B = ${pt(...B)}$, $C = ${pt(...C)}$.`,
    s1: ['Trójkąt $ABC$ jest prostokątny.', right, right ? 'Iloczyn skalarny wektorów wychodzących z jednego wierzchołka jest równy $0$ – boki są prostopadłe.' : 'Żadna para boków nie jest prostopadła (iloczyny skalarne różne od zera).'],
    s2: [T`Pole trójkąta $ABC$ jest równe $${fr(claimed, 2)}$.`, claimed === Math.abs(det), T`$P = \frac{1}{2} \cdot ${Math.abs(det)} = ${fr(Math.abs(det), 2)}$.`],
    trap: 'Prostopadłość boków sprawdzisz iloczynem współczynników kierunkowych albo iloczynem skalarnym wektorów.',
    tip: TIP_VEC
  });
};

const openIsosceles = (r) => {
  const A = [r.int(-6, 4), r.int(-6, 4)];
  const B = [r.int(-4, 6), r.int(-4, 6)];
  need((A[0] + B[0]) % 2 === 0 && (A[1] + B[1]) % 2 === 0 && (A[0] !== B[0] || A[1] !== B[1]));
  const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  const [dx, dy] = [B[0] - A[0], B[1] - A[1]];
  const g = gcd(Math.abs(dx), Math.abs(dy));
  const dir = [-dy / g, dx / g];
  const t = r.pick([-3, -2, -1, 1, 2, 3]);
  const C = [M[0] + t * dir[0], M[1] + t * dir[1]];
  const s = r.pick([-2, -1, 0, 1, 2, 3]);
  need(s * dir[0] !== dir[1]); // l nie równoległa do symetralnej
  const lc = C[1] - s * C[0];
  const sym = generalLine(dx, dy, -(dx * M[0] + dy * M[1]));
  need(sym.a * C[0] + sym.b * C[1] + sym.c === 0);
  const det = Math.abs(dx * (C[1] - A[1]) - dy * (C[0] - A[0]));
  return open({
    title: 'Trójkąt równoramienny w układzie współrzędnych',
    q: T`Punkty $A = ${pt(...A)}$ i $B = ${pt(...B)}$ są końcami podstawy trójkąta równoramiennego $ABC$, a wierzchołek $C$ leży na prostej $${lineTex(s, 1, lc)}$. Wyznacz współrzędne punktu $C$ i oblicz pole trójkąta $ABC$.`,
    stages: [
      [1, 'Etap 1', T`Wyznaczenie środka podstawy $M = ${pt(...M)}$.`],
      [2, 'Etap 2', T`Równanie symetralnej odcinka $AB$: $${sym.tex}$.`],
      [3, 'Etap 3', T`Wyznaczenie $C$ jako punktu wspólnego symetralnej i danej prostej: $C = ${pt(...C)}$.`],
      [4, 'Etap 4', T`Obliczenie $|AB| = ${sq(dx * dx + dy * dy)}$ i wysokości $|CM| = ${sq(dist2(C, M))}$.`],
      [5, 'Komplet', T`Pole trójkąta: $P = ${fr(det, 2)}$.`]
    ],
    steps: [
      T`$|AC| = |BC|$, więc $C$ leży na symetralnej odcinka $AB$. Środek $M = ${pt(...M)}$, $\overrightarrow{AB} = ${vec(dx, dy)}$.`,
      T`Symetralna przechodzi przez $M$ i jest prostopadła do $\overrightarrow{AB}$: $${sym.tex}$.`,
      T`Rozwiązanie układu z prostą $${lineTex(s, 1, lc)}$: $C = ${pt(...C)}$.`,
      T`$P = \frac{1}{2}|AB| \cdot |CM| = \frac{1}{2} \cdot ${sq(dx * dx + dy * dy)} \cdot ${sq(dist2(C, M))} = ${fr(det, 2)}$.`
    ],
    trap: 'Wierzchołek trójkąta równoramiennego leży na SYMETRALNEJ podstawy – to warunek $|AC| = |BC|$ zapisany geometrycznie.',
    tip: TIP_LINE,
    answer: m(T`C = ${pt(...C)}, \ P = ${fr(det, 2)}`)
  });
};

export default {
  numericId: 11,
  title: 'Geometria analityczna: wektory, okręgi, styczne',
  short_title: 'Geometria analityczna',
  description: 'Wektory, proste prostopadłe i styczne, punkty wspólne prostej i okręgu oraz dwóch okręgów, zadania wieloetapowe.',
  icon: 'Map',
  color: '#FFB800',
  matura_points_range: '4–6 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 21–23',
  cke_stats: 'W 11 z 11 arkuszy CKE 2022–2026, średnio 4,4 pkt na arkusz.',
  lessons: [
    {
      title: 'Wektory na płaszczyźnie',
      short_title: 'Wektory',
      requirements: ['IX.R3'],
      prereq: ['math-lesson-10-1'],
      pill: pill({
        essence: T`Wektor $\overrightarrow{AB}$ to przesunięcie z $A$ do $B$: $[x_B - x_A, y_B - y_A]$. Wektory dodajesz i mnożysz przez liczbę po współrzędnych, a długość liczysz jak przeciwprostokątną: $|\vec{u}| = \sqrt{u_1^2 + u_2^2}$. W równoległoboku $ABCD$: $\overrightarrow{AD} = \overrightarrow{BC}$.`,
        context: 'Wektory (IX.R3) to nowość PR. Na maturze służą głównie do szybkiego wyznaczania wierzchołków i sprawdzania równoległości.',
        pl: T`Wektor to „przepis na przesunięcie”: ile kratek w prawo i ile w górę. $[3, -2]$ znaczy: 3 w prawo, 2 w dół.`,
        steps: [
          ['Współrzędne', 'Koniec minus początek.', 'Kolejność ma znaczenie.'],
          ['Działania', 'Po współrzędnych.', 'k·[a, b] = [ka, kb].'],
          ['Długość', T`$\sqrt{u_1^2 + u_2^2}$.`, 'Pitagoras.']
        ],
        formulas: [
          ['Wektor', T`\overrightarrow{AB} = [x_B - x_A, y_B - y_A]`, 23],
          ['Długość', T`|\vec{u}| = \sqrt{u_1^2 + u_2^2}`, 23],
          ['Równoległobok', T`\overrightarrow{AD} = \overrightarrow{BC}`]
        ],
        examples: [
          ['Wektor', '1 pkt', T`$A = (1, 2)$, $B = (4, 6)$. Oblicz $|\overrightarrow{AB}|$.`, T`1. $\overrightarrow{AB} = [3, 4]$.` + '\n' + T`2. $|\overrightarrow{AB}| = 5$.`, 'Koniec minus początek.'],
          ['Równoległobok', '2 pkt', T`$A = (0, 0)$, $B = (4, 1)$, $C = (5, 4)$. Wyznacz $D$.`, T`1. $\overrightarrow{BC} = [1, 3]$.` + '\n' + T`2. $D = A + [1, 3] = (1, 3)$.`, 'Przesuń A o wektor BC.']
        ],
        trap: T`$\overrightarrow{AB}$ i $\overrightarrow{BA}$ mają przeciwne współrzędne. Odejmowanie w złą stronę odwraca kierunek.`,
        fail: T`„$A = (1, 2)$, $B = (4, 6)$, więc $\overrightarrow{AB} = [-3, -4]$.”`,
        win: T`$\overrightarrow{AB} = [4 - 1, 6 - 2] = [3, 4]$.`,
        why: 'Koniec minus początek.',
        ckeTip: 'Przy wyznaczaniu wierzchołka sprawdź wynik środkami przekątnych – to szybka kontrola.',
        points: ['Koniec minus początek.', 'Działania po współrzędnych.', 'AD = BC w równoległoboku ABCD.']
      }),
      gens: [vectorAB, vectorLength, parallelogramD, vectorFacts, openParallelogram]
    },
    {
      title: 'Prosta prostopadła i styczna do okręgu',
      short_title: 'Prostopadła i styczna',
      requirements: ['IX.R4', 'IX.2'],
      prereq: ['math-lesson-10-3'],
      pill: pill({
        essence: T`Proste $y = a_1x + b_1$ i $y = a_2x + b_2$ są prostopadłe, gdy $a_1 \cdot a_2 = -1$, czyli $a_2 = -\frac{1}{a_1}$. W postaci ogólnej warunek to $A_1A_2 + B_1B_2 = 0$. Styczna do okręgu w punkcie $P$ jest prostopadła do promienia $SP$.`,
        context: 'Prosta prostopadła i styczna (IX.R4) to wymaganie PR – w 2024 r. przeniesione z PP. Typowe zadanie: równanie stycznej w danym punkcie okręgu.',
        pl: T`Odwróć ułamek i zmień znak: prostopadła do prostej o nachyleniu $2$ ma nachylenie $-\frac{1}{2}$. Jedna „wspina się” stromo, druga łagodnie „schodzi”.`,
        steps: [
          ['Współczynnik', T`$a_2 = -\frac{1}{a_1}$.`, 'Odwrotny i przeciwny.'],
          ['Punkt', T`Podstaw $P$ do $y = a_2x + b$.`, 'Wyznacz b.'],
          ['Styczna', T`Prostopadła do $SP$ w punkcie $P$.`, 'S – środek okręgu.']
        ],
        formulas: [
          ['Prostopadłość', T`a_1 \cdot a_2 = -1`, 21],
          ['Postać ogólna', T`A_1A_2 + B_1B_2 = 0`, 21],
          ['Okrąg', T`(x - a)^2 + (y - b)^2 = r^2`, 23]
        ],
        examples: [
          ['Prostopadła', '1 pkt', T`Prostopadła do $y = 2x + 1$ przez $(2, 3)$.`, T`1. $a = -\frac{1}{2}$.` + '\n' + T`2. $3 = -1 + b$, $b = 4$: $y = -\frac{1}{2}x + 4$.`, 'Odwrotny i przeciwny.'],
          ['Styczna', '3 pkt', T`Styczna do $x^2 + y^2 = 25$ w $P = (3, 4)$.`, T`1. $SP$: $a = \frac{4}{3}$.` + '\n' + T`2. Styczna: $a = -\frac{3}{4}$, $y = -\frac{3}{4}x + \frac{25}{4}$.`, 'Prostopadła do promienia.']
        ],
        trap: T`Prostopadła ma współczynnik $-\frac{1}{a}$, a nie $-a$. Dla $a = 2$: $-\frac{1}{2}$, a nie $-2$.`,
        fail: T`„Prostopadła do $y = 2x + 1$ ma współczynnik $-2$.”`,
        win: T`$a_2 = -\frac{1}{2}$, bo $2 \cdot \left(-\frac{1}{2}\right) = -1$.`,
        why: T`Warunek to iloczyn równy $-1$.`,
        ckeTip: 'Sprawdź wynik: punkt $P$ musi spełniać równanie stycznej i okręgu.',
        points: ['a₁ · a₂ = −1.', 'A₁A₂ + B₁B₂ = 0.', 'Styczna ⟂ SP.']
      }),
      gens: [perpendicularLine, perpendicularParam, tangentIntercept, perpendicularFacts, openTangent]
    },
    {
      title: 'Prosta i okrąg – układ równań',
      short_title: 'Prosta i okrąg',
      requirements: ['IX.R1', 'IV.R1'],
      prereq: ['math-lesson-10-4'],
      pill: pill({
        essence: T`Punkty wspólne prostej i okręgu wyznaczasz z układu równań: z równania prostej podstawiasz $y$ do równania okręgu i rozwiązujesz równanie kwadratowe. Liczbę punktów wspólnych rozstrzyga odległość $d$ środka od prostej: $d < r$ – dwa, $d = r$ – jeden (styczna), $d > r$ – brak.`,
        context: 'Punkty wspólne prostej i okręgu (IX.R1) łączą geometrię analityczną z równaniami kwadratowymi i parametrem – typowe zadanie za 4–5 pkt.',
        pl: T`Prosta „przebija” okrąg, gdy przechodzi bliżej środka niż długość promienia. Wystarczy porównać dwie liczby: odległość od środka i promień.`,
        steps: [
          ['Podstaw', T`$y$ z prostej do równania okręgu.`, 'Równanie kwadratowe z x.'],
          ['Δ albo d', T`$\Delta > 0 \Leftrightarrow d < r$.`.replace('\\Leftrightarrow', '\\ \\text{tak samo jak} \\'), 'Dwa sposoby, ten sam wynik.'],
          ['Punkty', 'Pierwiastki x → y z prostej.', 'Sprawdź w obu równaniach.']
        ],
        formulas: [
          ['Odległość punktu od prostej', T`d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}`, 22],
          ['Cięciwa', T`|AB| = 2\sqrt{r^2 - d^2}`],
          ['Okrąg', T`(x - a)^2 + (y - b)^2 = r^2`, 23]
        ],
        examples: [
          ['Liczba punktów', '1 pkt', T`$y = 7$ i $x^2 + y^2 = 25$.`, T`1. $d = 7$, $r = 5$.` + '\n' + T`2. $d > r$ – brak punktów wspólnych.`, 'Porównaj d z r.'],
          ['Parametr', '4 pkt', T`Dla jakich $m$ prosta $y = x + m$ przecina $x^2 + y^2 = 8$ w dwóch punktach?`, T`1. $d = \frac{|m|}{\sqrt{2}} < 2\sqrt{2}$.` + '\n' + T`2. $|m| < 4$, $m \in (-4, 4)$.`, 'Nierówność ostra.']
        ],
        trap: 'Dwa punkty wspólne to nierówność OSTRA. Dołączenie końców przedziału dodaje przypadek stycznej.',
        fail: T`„$|m| \le 4$, więc $m \in \langle -4, 4 \rangle$.”`,
        win: T`$m \in (-4, 4)$; dla $m = \pm 4$ prosta jest styczna.`,
        why: 'Przy d = r jest tylko jeden punkt wspólny.',
        ckeTip: 'Za podstawienie do równania okręgu i poprawne równanie kwadratowe jest osobny punkt – zapisz je w całości.',
        points: ['Podstawienie → równanie kwadratowe.', 'd < r: dwa punkty.', 'Parametr: nierówność ostra.']
      }),
      gens: [lineCircleCount, lineCirclePoints, chordLength, circleLineFacts, openLineParam]
    },
    {
      title: 'Dwa okręgi',
      short_title: 'Dwa okręgi',
      requirements: ['IX.R2', 'IV.R1'],
      prereq: ['math-lesson-10-4'],
      pill: pill({
        essence: T`Położenie dwóch okręgów rozstrzyga odległość środków $d$: $d > r_1 + r_2$ – rozłączne, $d = r_1 + r_2$ – styczne zewnętrznie, $|r_1 - r_2| < d < r_1 + r_2$ – dwa punkty wspólne, $d = |r_1 - r_2|$ – styczne wewnętrznie. Punkty wspólne wyznaczasz, odejmując równania okręgów – zostaje równanie prostej.`,
        context: 'Punkty wspólne dwóch okręgów (IX.R2) i układy równań kwadratowych (IV.R1) to nowe wymagania PR od 2025 r.',
        pl: T`Dwa koła na stole: jeśli środki są dalej niż suma promieni – nie dotykają się. Gdy dokładnie tyle – stykają się w jednym punkcie. Bliżej – nachodzą na siebie.`,
        steps: [
          ['Środki i promienie', 'Odczytaj z równań.', 'Postać ogólna: uzupełnij kwadraty.'],
          ['Porównaj', T`$d$ z $r_1 + r_2$ i $|r_1 - r_2|$.`, 'Kwadraty – bez pierwiastków.'],
          ['Punkty wspólne', 'Odejmij równania → prosta → podstaw.', 'Dwa punkty albo jeden.']
        ],
        formulas: [
          ['Styczne zewnętrznie', T`d = r_1 + r_2`],
          ['Styczne wewnętrznie', T`d = |r_1 - r_2|`],
          ['Postać ogólna', T`x^2 + y^2 - 2ax - 2by + c = 0`, 23]
        ],
        examples: [
          ['Położenie', '1 pkt', T`$S_1 = (0, 0)$, $r_1 = 2$; $S_2 = (3, 4)$, $r_2 = 3$.`, T`1. $d = 5$.` + '\n' + T`2. $d = r_1 + r_2$ – styczne zewnętrznie.`, 'Policz d.'],
          ['Punkty wspólne', '4 pkt', T`$x^2 + y^2 = 25$ i $(x - 7)^2 + (y - 1)^2 = 25$.`, T`1. Odejmujemy: $14x + 2y - 50 = 0$, $y = 25 - 7x$.` + '\n' + T`2. Podstawienie: punkty $(3, 4)$ i $(4, -3)$.`, 'Odjęcie usuwa kwadraty.']
        ],
        trap: 'Styczność wewnętrzna też daje jeden punkt wspólny – nie zapomnij o warunku $d = |r_1 - r_2|$.',
        fail: '„Okręgi mają jeden punkt wspólny tylko wtedy, gdy d = r₁ + r₂.”',
        win: T`Jeden punkt wspólny: $d = r_1 + r_2$ albo $d = |r_1 - r_2|$.`,
        why: 'Mały okrąg może dotykać dużego od środka.',
        ckeTip: 'Prosta z odjęcia równań nie jest odpowiedzią – trzeba jeszcze wyznaczyć punkty i podać je jawnie.',
        points: ['Porównaj d z r₁ + r₂ i |r₁ − r₂|.', 'Odejmij równania – prosta.', 'Podstaw i rozwiąż.']
      }),
      gens: [circlesCount, circlesPosition, tangentRadius, generalCircleFacts, openTwoCircles]
    },
    {
      title: 'Zadania wieloetapowe: figury, pola, parametry',
      short_title: 'Zadania wieloetapowe',
      requirements: ['IX.R1', 'IX.2'],
      prereq: ['math-lesson-10-5'],
      pill: pill({
        essence: T`Zadania za 5–6 pkt z geometrii analitycznej łączą kilka narzędzi: środek odcinka, symetralną, prostą prostopadłą, odległość punktu od prostej i pole ze współrzędnych. Klucz CKE punktuje każdy etap osobno, więc rozpisz rozwiązanie na kroki z nazwanymi obiektami.`,
        context: 'Geometria analityczna daje średnio 4,4 pkt na arkusz (11/11 arkuszy) – zwykle jedno zadanie rozszerzonej odpowiedzi.',
        pl: T`Trójkąt równoramienny o podstawie $AB$ ma wierzchołek $C$ „w połowie drogi” między $A$ i $B$ – na prostej, z której oba końce widać tak samo daleko. To symetralna.`,
        steps: [
          ['Rysunek', 'Szkic z danymi punktami.', 'Nazwij szukane obiekty.'],
          ['Narzędzia', 'Symetralna, prostopadła, odległość.', 'Każde to osobny etap.'],
          ['Wynik', 'Współrzędne i pole.', 'Sprawdź warunki zadania.']
        ],
        formulas: [
          ['Pole trójkąta', T`P = \frac{1}{2}|(x_B - x_A)(y_C - y_A) - (y_B - y_A)(x_C - x_A)|`, 22],
          ['Odległość od prostej', T`d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}`, 22],
          ['Środek odcinka', T`S = \left(\frac{x_A + x_B}{2}, \frac{y_A + y_B}{2}\right)`, 21]
        ],
        examples: [
          ['Pole', '1 pkt', T`$A = (0, 0)$, $B = (4, 0)$, $C = (1, 3)$.`, T`1. $P = \frac{1}{2}|4 \cdot 3 - 0 \cdot 1|$.` + '\n' + T`2. $P = 6$.`, 'Wzór z karty.'],
          ['Symetralna', '5 pkt', T`$A = (0, 0)$, $B = (4, 2)$, $C$ na prostej $y = 2x$; $|AC| = |BC|$.`, T`1. $M = (2, 1)$, symetralna $2x + y - 5 = 0$.` + '\n' + T`2. $C = \left(\frac{5}{4}, \frac{5}{2}\right)$.`, 'C na symetralnej.']
        ],
        trap: 'Punkt symetryczny względem prostej leży DWA razy dalej niż rzut – rzut to środek odcinka $PP\'$.',
        fail: '„Rzut P na prostą to punkt symetryczny do P.”',
        win: T`Rzut $M$ to środek $PP'$, więc $P' = 2M - P$.`,
        why: 'Symetria przenosi punkt na drugą stronę prostej.',
        ckeTip: 'W zadaniach 5–6 pkt podawaj wyniki pośrednie (środek, równanie symetralnej) – każdy jest wart punkt.',
        points: ['Równoramienny: C na symetralnej.', 'Pole ze współrzędnych.', 'Symetria: P′ = 2M − P.']
      }),
      gens: [triangleArea, pointLineDistance, reflection, coordinateFacts, openIsosceles]
    }
  ]
};
