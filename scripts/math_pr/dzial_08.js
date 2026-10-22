import { T, mc, num, pf, open, pill, fr, m, need } from '../math_pp/lib.js';
import { pickTwo, terms } from './common.js';
import { sinD, cosD, tgD, valTex, piTex, piSet, piInterval, solveDeg } from './trig.js';

const TIP_EQ = 'Równanie $\\sin x = a$ ma w każdym okresie dwa rozwiązania: $x_0$ i $\\pi - x_0$; $\\cos x = a$: $x_0$ i $-x_0$; $\\operatorname{tg} x = a$ – jedno, z okresem $\\pi$ (karta wzorów, str. 11–14).';
const TIP_SUB = 'Równanie z $\\sin^2 x$ i $\\sin x$ (albo cosinusami) rozwiązujesz podstawieniem $t = \\sin x$ z warunkiem $-1 \\le t \\le 1$.';
const TIP_DOUBLE = 'Karta wzorów, str. 13: $\\sin 2x = 2\\sin x\\cos x$, $\\cos 2x = 1 - 2\\sin^2 x = 2\\cos^2 x - 1$. Dobierz postać tak, żeby w równaniu została jedna funkcja albo iloczyn.';

const FN = { sin: sinD, cos: cosD, tg: tgD };
const fnTex = (f) => (f === 'tg' ? '\\operatorname{tg}' : `\\${f}`);
const VALUES = [0.5, -0.5, Math.SQRT2 / 2, -Math.SQRT2 / 2, Math.sqrt(3) / 2, -Math.sqrt(3) / 2, 1, -1, 0];
const TG_VALUES = [1, -1, Math.sqrt(3), -Math.sqrt(3), Math.sqrt(3) / 3, -Math.sqrt(3) / 3, 0];
const INTERVALS = [[0, 360], [0, 180], [-180, 180], [0, 720]];
const near = (a, b) => Math.abs(a - b) < 1e-9;
const sols = (g, [lo, hi]) => solveDeg(g, lo, hi);
const nSol = (n) => (n === 1 ? 'rozwiązanie' : n >= 2 && n <= 4 ? 'rozwiązania' : 'rozwiązań');
/** Argument funkcji: ujemny kąt w nawiasie, np. \sin\left(-\frac{\pi}{4}\right). */
const argTex = (d) => (d < 0 ? `\\left(${piTex(d)}\\right)` : piTex(d));
/** Wyraz z niewymiernym współczynnikiem k (kk: '1', '-1', '\\sqrt{2}', '-\\sqrt{2}' ...) odejmowany od wyrażenia: "- \sqrt{2}\cos x" albo "+ \cos x". */
const minusK = (kk, t) => {
  const abs = kk.replace('-', '');
  return `${kk.startsWith('-') ? '+' : '-'} ${abs === '1' ? '' : abs}${t}`;
};

/** Kąt podstawowy (w stopniach) dla sin/cos/tg = v: sin w ⟨−90°, 90°⟩, cos w ⟨0°, 180°⟩, tg w (−90°, 90°). */
const baseDeg = (f, v) => {
  const range = f === 'cos' ? [0, 180] : [-90, 90];
  for (let d = range[0]; d <= range[1]; d += 15) if (near(FN[f](d), v)) return d;
  throw new Error(`baseDeg ${f} ${v}`);
};

/** Rozwiązanie ogólne w notacji CKE. */
const generalSolution = (f, v) => {
  const a = baseDeg(f, v);
  if (f === 'tg') return `x = ${piTex(a)} + k\\pi`;
  if (f === 'sin') {
    if (near(v, 0)) return 'x = k\\pi';
    if (near(Math.abs(v), 1)) return `x = ${piTex(a)} + 2k\\pi`;
    return `x = ${piTex(a)} + 2k\\pi \\ \\text{lub} \\ x = ${piTex(180 - a)} + 2k\\pi`;
  }
  if (near(v, 0)) return `x = \\frac{\\pi}{2} + k\\pi`;
  if (near(v, 1)) return 'x = 2k\\pi';
  if (near(v, -1)) return 'x = \\pi + 2k\\pi';
  return `x = ${piTex(a)} + 2k\\pi \\ \\text{lub} \\ x = ${piTex(-a)} + 2k\\pi`;
};

// ---------- 8.1 Równania elementarne ----------
const generalSolutionChoice = (r) => {
  const f = r.pick(['sin', 'cos']);
  const v = r.pick(VALUES.filter((x) => !near(Math.abs(x), 1) && !near(x, 0)));
  const a = baseDeg(f, v);
  const ok = generalSolution(f, v);
  const other = f === 'sin' ? `x = ${piTex(a)} + 2k\\pi \\ \\text{lub} \\ x = ${piTex(-a)} + 2k\\pi` : `x = ${piTex(a)} + 2k\\pi \\ \\text{lub} \\ x = ${piTex(180 - a)} + 2k\\pi`;
  return mc({
    title: 'Rozwiązanie ogólne równania elementarnego',
    q: T`Wszystkie rozwiązania równania $${fnTex(f)} x = ${valTex(v)}$ to`,
    ok: m(ok),
    bad: [m(other), m(`x = ${piTex(a)} + 2k\\pi`), m(`x = ${piTex(a)} + k\\pi`), m(`x = ${piTex(-a)} + 2k\\pi`)].filter((x) => x !== m(ok)),
    steps: [
      T`Kąt podstawowy: $${fnTex(f)} ${argTex(a)} = ${valTex(v)}$.`,
      f === 'sin' ? T`Sinus ma tę samą wartość dla $x_0$ i $\pi - x_0$, z okresem $2\pi$: $${ok}$, $k \in \mathbb{Z}$.` : T`Cosinus ma tę samą wartość dla $x_0$ i $-x_0$, z okresem $2\pi$: $${ok}$, $k \in \mathbb{Z}$.`
    ],
    trap: f === 'sin' ? T`Druga seria rozwiązań sinusa to $\pi - x_0$, a nie $-x_0$ (to wzór dla cosinusa).` : T`Druga seria rozwiązań cosinusa to $-x_0$, a nie $\pi - x_0$ (to wzór dla sinusa).`,
    tip: TIP_EQ
  });
};

const solutionCount = (r) => {
  const f = r.pick(['sin', 'cos']);
  const v = r.pick([...VALUES, 2, -1.5]);
  const I = r.pick(INTERVALS);
  const n = sols((x) => FN[f](x) - v, I).length;
  return num({
    title: 'Liczba rozwiązań w przedziale',
    q: T`Ile rozwiązań ma równanie $${fnTex(f)} x = ${valTex(v)}$ w przedziale $${piInterval(...I)}$? Wpisz liczbę.`,
    ans: n,
    steps: [
      Math.abs(v) > 1 ? T`$|${valTex(v)}| > 1$, a wartości $${fnTex(f)} x$ leżą w $\langle -1, 1 \rangle$ – brak rozwiązań.` : T`Rozwiązania ogólne: $${generalSolution(f, v)}$.`,
      n ? T`W przedziale $${piInterval(...I)}$ leży $${n}$ ${nSol(n)}: $${piSet(sols((x) => FN[f](x) - v, I))}$.` : T`W przedziale $${piInterval(...I)}$ nie ma więc żadnego rozwiązania.`
    ],
    trap: 'Końce przedziału domkniętego też sprawdź – rozwiązanie może leżeć dokładnie na końcu.',
    tip: TIP_EQ
  });
};

const tangentGeneral = (r) => {
  const v = r.pick(TG_VALUES);
  const a = baseDeg('tg', v);
  const ok = `x = ${piTex(a)} + k\\pi`;
  return mc({
    title: 'Rozwiązanie równania z tangensem',
    q: T`Wszystkie rozwiązania równania $\operatorname{tg} x = ${valTex(v)}$ to`,
    ok: m(ok),
    bad: [m(`x = ${piTex(a)} + 2k\\pi`), m(`x = ${piTex(-a)} + k\\pi`), m(`x = ${piTex(a)} + \\frac{k\\pi}{2}`), m(`x = ${piTex(a + 90)} + k\\pi`)].filter((x) => x !== m(ok)),
    steps: [T`$\operatorname{tg} ${argTex(a)} = ${valTex(v)}$.`, T`Tangens ma okres $\pi$, więc $${ok}$, $k \in \mathbb{Z}$.`],
    trap: T`Okres tangensa to $\pi$ – zapis $+ 2k\pi$ gubi połowę rozwiązań.`,
    tip: TIP_EQ
  });
};

const EQ_FACTS = [
  [T`Równanie $\sin x = 2$ nie ma rozwiązań.`, true, T`$-1 \le \sin x \le 1$.`],
  [T`Równanie $\cos x = \frac{1}{2}$ ma w przedziale $\langle 0, 2\pi \rangle$ dokładnie jedno rozwiązanie.`, false, T`Ma dwa: $\frac{\pi}{3}$ i $\frac{5\pi}{3}$.`],
  [T`Wszystkie rozwiązania równania $\sin x = 0$ to $x = k\pi$, $k \in \mathbb{Z}$.`, true, 'Sinus zeruje się w wielokrotnościach $\\pi$.'],
  [T`Wszystkie rozwiązania równania $\cos x = 0$ to $x = k\pi$, $k \in \mathbb{Z}$.`, false, T`$\cos x = 0$ dla $x = \frac{\pi}{2} + k\pi$.`],
  [T`Równanie $\operatorname{tg} x = 5$ ma rozwiązania.`, true, 'Tangens przyjmuje wszystkie wartości rzeczywiste.']
];

const elementaryFacts = (r) => {
  const [s1] = pickTwo(r, EQ_FACTS);
  const f = r.pick(['sin', 'cos']);
  const d = r.pick([0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 240, 270, 300, 330]);
  const v = r.pick(VALUES);
  const truth = near(FN[f](d), v);
  return pf({
    title: 'Równania elementarne',
    s1,
    s2: [T`Liczba $${piTex(d)}$ jest rozwiązaniem równania $${fnTex(f)} x = ${valTex(v)}$.`, truth, T`$${fnTex(f)} ${piTex(d)} = ${valTex(FN[f](d))}$.`],
    trap: 'Pojedynczą liczbę sprawdzasz podstawieniem do równania.',
    tip: TIP_EQ
  });
};

const openElementary = (r) => {
  const f = r.pick(['sin', 'cos']);
  const v = r.pick(VALUES.filter((x) => !near(x, 0)));
  const I = r.pick([[0, 360], [-180, 180]]);
  const S = sols((x) => FN[f](x) - v, I);
  need(S.length > 0);
  const a = baseDeg(f, v);
  return open({
    title: 'Równanie elementarne w przedziale',
    q: T`Rozwiąż równanie $${fnTex(f)} x = ${valTex(v)}$ w przedziale $${piInterval(...I)}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Wyznaczenie kąta podstawowego $${piTex(a)}$ i zapisanie rozwiązań ogólnych: $${generalSolution(f, v)}$.`],
      [2, 'Komplet', T`Wybranie rozwiązań z przedziału: $x \in ${piSet(S)}$.`]
    ],
    steps: [T`$${fnTex(f)} ${argTex(a)} = ${valTex(v)}$, więc $${generalSolution(f, v)}$, $k \in \mathbb{Z}$.`, T`Podstawiając kolejne $k$, w przedziale $${piInterval(...I)}$ otrzymujemy $x \in ${piSet(S)}$.`],
    trap: 'Sprawdź kilka wartości $k$ (także ujemne), zanim uznasz, że masz wszystkie rozwiązania z przedziału.',
    tip: TIP_EQ,
    answer: m(`x \\in ${piSet(S)}`)
  });
};

// ---------- 8.2 Rozwiązania w przedziale ----------
const multipleAngleCount = (r) => {
  const f = r.pick(['sin', 'cos']);
  const k = r.pick([2, 3]);
  const v = r.pick(VALUES);
  const I = r.pick([[0, 360], [0, 180]]);
  const S = sols((x) => FN[f](k * x) - v, I);
  return num({
    title: 'Liczba rozwiązań równania z wielokrotnością kąta',
    q: T`Ile rozwiązań ma równanie $${fnTex(f)} ${k}x = ${valTex(v)}$ w przedziale $${piInterval(...I)}$? Wpisz liczbę.`,
    ans: S.length,
    steps: [T`Podstawienie $t = ${k}x$: dla $x \in ${piInterval(...I)}$ jest $t \in ${piInterval(k * I[0], k * I[1])}$.`, T`Rozwiązań w $t$ jest $${S.length}$, każde daje jedno $x$: $${piSet(S)}$.`],
    trap: T`Przedział dla $t = ${k}x$ jest ${k} razy dłuższy – rozwiązań jest więcej niż dla $${fnTex(f)} x$.`,
    tip: TIP_EQ
  });
};

const solutionSetInInterval = (r) => {
  const f = r.pick(['sin', 'cos']);
  const v = r.pick(VALUES);
  const I = r.pick([[0, 180], [0, 360], [-180, 180]]);
  const S = sols((x) => FN[f](x) - v, I);
  need(S.length > 0);
  const wide = sols((x) => FN[f](x) - v, [-360, 720]);
  const extra = wide.filter((x) => !S.includes(x));
  return mc({
    title: 'Zbiór rozwiązań w przedziale',
    q: T`Zbiór wszystkich rozwiązań równania $${fnTex(f)} x = ${valTex(v)}$ w przedziale $${piInterval(...I)}$ to`,
    ok: m(piSet(S)),
    bad: [S.length > 1 ? piSet(S.slice(0, 1)) : null, piSet([...S, extra[0]].sort((a, b) => a - b)), piSet(S.map((x) => -x).sort((a, b) => a - b)), piSet(S.map((x) => 180 - x).sort((a, b) => a - b)), piSet([...S, extra[1]].sort((a, b) => a - b))]
      .filter((x) => x && x !== piSet(S))
      .map(m),
    steps: [T`Rozwiązania ogólne: $${generalSolution(f, v)}$.`, T`W przedziale $${piInterval(...I)}$: $${piSet(S)}$.`],
    trap: f === 'sin' ? T`Dla sinusa druga seria to $\pi - x_0$ – ujemne $x_0$ daje rozwiązanie po przesunięciu o $2\pi$.` : 'Dla cosinusa sprawdź, czy rozwiązanie $-x_0$ (lub $2\\pi - x_0$) mieści się w przedziale.',
    tip: TIP_EQ
  });
};

const smallestPositive = (r) => {
  const f = r.pick(['sin', 'cos', 'tg']);
  const k = r.pick([2, 3]);
  const v = r.pick(f === 'tg' ? TG_VALUES : VALUES.filter((x) => !near(x, 0)));
  const S = sols((x) => (f === 'tg' && Math.abs(cosD(k * x)) < 1e-9 ? 1 : FN[f](k * x) - v), [2.5, 360]);
  need(S.length > 0);
  return mc({
    title: 'Najmniejsze dodatnie rozwiązanie',
    q: T`Najmniejszym dodatnim rozwiązaniem równania $${fnTex(f)} ${k}x = ${valTex(v)}$ jest`,
    ok: m(piTex(S[0])),
    val: (S[0] * Math.PI) / 180,
    bad: [piTex(S[0] * k), piTex(S[0] / 2), S[1] ? piTex(S[1]) : piTex(S[0] + 90), piTex(S[0] + 180)].filter((x) => x !== piTex(S[0])).map(m),
    steps: [T`Najmniejsze dodatnie $t = ${k}x$ spełniające $${fnTex(f)} t = ${valTex(v)}$ to $t = ${piTex(S[0] * k)}$.`, T`$x = \frac{t}{${k}} = ${piTex(S[0])}$.`],
    trap: T`Po znalezieniu $t$ podziel przez $${k}$ – wynikiem jest $x$, a nie $t$.`,
    tip: TIP_EQ
  });
};

const countFacts = (r) => {
  const mk = () => {
    const f = r.pick(['sin', 'cos']);
    const k = r.pick([1, 2]);
    const v = r.pick(VALUES);
    const n = sols((x) => FN[f](k * x) - v, [0, 360]).length;
    const claimed = r.bool() ? n : r.pick([0, 1, 2, 3, 4, 5].filter((x) => x !== n));
    return [T`Równanie $${fnTex(f)} ${k === 1 ? '' : k}x = ${valTex(v)}$ ma w przedziale $\langle 0, 2\pi \rangle$ dokładnie $${claimed}$ ${nSol(claimed)}.`, claimed === n, T`Liczba rozwiązań to $${n}$.`];
  };
  return pf({ title: 'Liczba rozwiązań w przedziale', s1: mk(), s2: mk(), trap: 'Policz rozwiązania na szkicu wykresu albo wypisz je dla kolejnych $k$.', tip: TIP_EQ });
};

const openDoubleArgument = (r) => {
  const f = r.pick(['sin', 'cos']);
  const v = r.pick(VALUES.filter((x) => !near(Math.abs(x), 1)));
  const I = r.pick([[0, 180], [0, 360]]);
  const S = sols((x) => FN[f](2 * x) - v, I);
  need(S.length > 0);
  const a = baseDeg(f, v);
  return open({
    title: 'Równanie z podwojonym argumentem w przedziale',
    q: T`Rozwiąż równanie $${fnTex(f)} 2x = ${valTex(v)}$ w przedziale $${piInterval(...I)}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Rozwiązanie ogólne dla $t = 2x$: $${generalSolution(f, v).replace(/x =/g, 't =')}$.`],
      [2, 'Etap 2', T`Wyznaczenie $x$: podzielenie rozwiązań przez $2$ (okres w $x$ to $\pi$).`],
      [3, 'Komplet', T`Rozwiązania w przedziale: $x \in ${piSet(S)}$.`]
    ],
    steps: [
      T`$t = 2x$: $${fnTex(f)} t = ${valTex(v)}$, więc $${generalSolution(f, v).replace(/x =/g, 't =')}$ (kąt podstawowy $${piTex(a)}$).`,
      T`$x = \frac{t}{2}$ – okres rozwiązań w $x$ to $\pi$.`,
      T`W przedziale $${piInterval(...I)}$: $x \in ${piSet(S)}$.`
    ],
    trap: T`Okres $2k\pi$ dla $t$ zamienia się w $k\pi$ dla $x$ – podzielenie przez 2 dotyczy też okresu.`,
    tip: TIP_EQ,
    answer: m(`x \\in ${piSet(S)}`)
  });
};

// ---------- 8.3 Sprowadzanie do kwadratowego ----------
const T_ROOTS = [-1, -0.5, 0, 0.5, 1, 2, -2, 1.5, -1.5];
const quadFrom = (t1, t2) => [2, -2 * (t1 + t2), 2 * t1 * t2];
const qTex = ([a, b, c], f) => terms([[a, `\\${f}^2 x`], [b, `\\${f} x`], [c, '']]);
const tTex = ([a, b, c]) => terms([[a, 't^2'], [b, 't'], [c, '']]);
const pickRoots = (r) => {
  const t1 = r.pick([-1, -0.5, 0, 0.5, 1]);
  const t2 = r.pick(T_ROOTS.filter((x) => x !== t1));
  need(Number.isInteger(2 * t1 * t2) && Number.isInteger(2 * (t1 + t2)));
  return [t1, t2];
};

const quadraticTrigSet = (r) => {
  const f = r.pick(['sin', 'cos']);
  const [t1, t2] = pickRoots(r);
  const cs = quadFrom(t1, t2);
  const g = (x) => cs[0] * FN[f](x) ** 2 + cs[1] * FN[f](x) + cs[2];
  const S = sols(g, [0, 360]);
  need(S.length > 0);
  const onlyT1 = sols((x) => FN[f](x) - t1, [0, 360]);
  const otherFn = sols((x) => cs[0] * FN[f === 'sin' ? 'cos' : 'sin'](x) ** 2 + cs[1] * FN[f === 'sin' ? 'cos' : 'sin'](x) + cs[2], [0, 360]);
  return mc({
    title: 'Równanie kwadratowe względem funkcji trygonometrycznej',
    q: T`Zbiór wszystkich rozwiązań równania $${qTex(cs, f)} = 0$ w przedziale $\langle 0, 2\pi \rangle$ to`,
    ok: m(piSet(S)),
    bad: [onlyT1, otherFn, S.slice(0, -1), S.map((x) => (360 - x) % 361).sort((a, b) => a - b)].map(piSet).filter((x) => x !== piSet(S)).map(m),
    steps: [T`$t = ${fnTex(f)} x$: $${tTex(cs)} = 0$, czyli $t = ${valTex(t1)}$ lub $t = ${valTex(t2)}$.`, T`Rozwiązania w $\langle 0, 2\pi \rangle$: $${piSet(S)}$.`],
    trap: 'Wartości $t$ spoza $\\langle -1, 1 \\rangle$ odrzucasz – nie dają żadnego $x$.',
    tip: TIP_SUB
  });
};

const quadraticTrigCount = (r) => {
  const f = r.pick(['sin', 'cos']);
  const [t1, t2] = pickRoots(r);
  const cs = quadFrom(t1, t2);
  const S = sols((x) => cs[0] * FN[f](x) ** 2 + cs[1] * FN[f](x) + cs[2], [0, 360]);
  return num({
    title: 'Liczba rozwiązań równania kwadratowego z funkcją',
    q: T`Ile rozwiązań ma równanie $${qTex(cs, f)} = 0$ w przedziale $\langle 0, 2\pi \rangle$? Wpisz liczbę.`,
    ans: S.length,
    steps: [T`Podstawienie $t = ${fnTex(f)} x$ daje $t = ${valTex(t1)}$ lub $t = ${valTex(t2)}$.`, T`Każdą dopuszczalną wartość $t$ zamieniamy na $x$ z przedziału – razem $${S.length}$ ${nSol(S.length)}.`],
    trap: 'Równanie $\\sin x = 1$ albo $\\cos x = \\pm 1$ ma w okresie tylko jedno rozwiązanie, a nie dwa.',
    tip: TIP_SUB
  });
};

const pythagoreanSubstitution = (r) => {
  const [t1, t2] = pickRoots(r);
  const [, b, c] = quadFrom(t1, t2);
  // -2cos²x + b sin x + q = -2 + 2sin²x + b sin x + q, więc q = c + 2
  const q = c + 2;
  const tx = (aa, bb, cc) => `${tTex([aa, bb, cc])} = 0`;
  const okPoly = tx(2, b, c);
  return mc({
    title: 'Jedynka trygonometryczna w równaniu',
    q: T`Po podstawieniu $t = \sin x$ równanie $${terms([[-2, '\\cos^2 x'], [b, '\\sin x'], [q, '']])} = 0$ przyjmuje postać`,
    ok: m(okPoly),
    bad: [tx(-2, b, q), tx(2, b, q), tx(2, b, q + 2), tx(-2, b, c)].filter((x) => x !== okPoly).map(m),
    steps: [T`$\cos^2 x = 1 - \sin^2 x$, więc $-2\cos^2 x = -2 + 2\sin^2 x$.`, T`Po podstawieniu: $${okPoly}$.`],
    trap: T`$-2\cos^2 x = -2(1 - \sin^2 x) = -2 + 2\sin^2 x$ – minus zmienia znaki obu wyrazów.`,
    tip: TIP_SUB
  });
};

const SUB_FACTS = [
  [T`Po podstawieniu $t = \sin x$ uwzględniamy tylko $t \in \langle -1, 1 \rangle$.`, true, 'Sinus przyjmuje wartości z przedziału $\\langle -1, 1 \\rangle$.'],
  [T`Równanie $2\sin^2 x - \sin x - 1 = 0$ jest spełnione, gdy $\sin x = 1$ lub $\sin x = -\frac{1}{2}$.`, true, T`$2t^2 - t - 1 = (t - 1)(2t + 1)$.`],
  [T`Równanie $\cos^2 x = \frac{1}{4}$ jest równoważne równaniu $\cos x = \frac{1}{2}$.`, false, T`Także $\cos x = -\frac{1}{2}$.`],
  [T`Równanie $\sin^2 x + \sin x + 1 = 0$ ma rozwiązania.`, false, T`$t^2 + t + 1$ ma $\Delta < 0$.`],
  [T`$\cos^2 x = 1 - \sin^2 x$ dla każdego $x$.`, true, 'Jedynka trygonometryczna.']
];

const substitutionFacts = (r) => {
  const [s1, s2] = pickTwo(r, SUB_FACTS);
  return pf({ title: 'Podstawienie w równaniach trygonometrycznych', s1, s2, trap: 'Po podstawieniu sprawdź, czy wartości $t$ mieszczą się w $\\langle -1, 1 \\rangle$, a wyciągając pierwiastek z kwadratu – pamiętaj o obu znakach.', tip: TIP_SUB });
};

const openQuadraticTrig = (r) => {
  const f = r.pick(['sin', 'cos']);
  const [t1, t2] = pickRoots(r);
  const cs = quadFrom(t1, t2);
  const g = (x) => cs[0] * FN[f](x) ** 2 + cs[1] * FN[f](x) + cs[2];
  const S = sols(g, [0, 360]);
  need(S.length > 0);
  const ts = [t1, t2].sort((a, b) => a - b);
  const bad = ts.filter((t) => Math.abs(t) > 1);
  return open({
    title: 'Równanie kwadratowe z funkcją trygonometryczną',
    q: T`Rozwiąż równanie $${qTex(cs, f)} = 0$ w przedziale $\langle 0, 2\pi \rangle$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Podstawienie $t = ${fnTex(f)} x$, $t \in \langle -1, 1 \rangle$, i zapisanie równania kwadratowego.`],
      [2, 'Etap 2', T`Rozwiązanie równania z $t$: $t = ${valTex(ts[0])}$ lub $t = ${valTex(ts[1])}$${bad.length ? T` i odrzucenie $t = ${valTex(bad[0])}$` : ''}.`],
      [3, 'Etap 3', 'Rozwiązanie jednego z równań elementarnych w przedziale.'],
      [4, 'Komplet', T`Wszystkie rozwiązania: $x \in ${piSet(S)}$.`]
    ],
    steps: [
      T`$t = ${fnTex(f)} x$: równanie kwadratowe ma pierwiastki $t = ${valTex(ts[0])}$ i $t = ${valTex(ts[1])}$.${bad.length ? T` Wartość $${valTex(bad[0])}$ odrzucamy, bo $|t| > 1$.` : ''}`,
      ...ts.filter((t) => Math.abs(t) <= 1).map((t) => T`$${fnTex(f)} x = ${valTex(t)}$: $x \in ${piSet(sols((x) => FN[f](x) - t, [0, 360]))}$.`),
      T`Odpowiedź: $x \in ${piSet(S)}$.`
    ],
    trap: 'Wartości $t$ spoza $\\langle -1, 1 \\rangle$ trzeba jawnie odrzucić – inaczej rozwiązanie jest niepełne.',
    tip: TIP_SUB,
    answer: m(`x \\in ${piSet(S)}`)
  });
};

// ---------- 8.4 Kąt podwojony w równaniach ----------
const DOUBLE_EQS = [
  { tex: '\\sin 2x = \\sin x', g: (x) => sinD(2 * x) - sinD(x), form: '\\sin x(2\\cos x - 1) = 0', wrong: ['2\\cos x - 1 = 0', '\\sin x(2\\cos x + 1) = 0', '\\cos x(2\\sin x - 1) = 0'] },
  { tex: '\\sin 2x = \\cos x', g: (x) => sinD(2 * x) - cosD(x), form: '\\cos x(2\\sin x - 1) = 0', wrong: ['2\\sin x - 1 = 0', '\\sin x(2\\cos x - 1) = 0', '\\cos x(2\\sin x + 1) = 0'] },
  { tex: '\\cos 2x = \\cos x', g: (x) => cosD(2 * x) - cosD(x), form: '2\\cos^2 x - \\cos x - 1 = 0', wrong: ['\\cos^2 x - \\cos x = 0', '2\\cos^2 x + \\cos x - 1 = 0', '1 - 2\\cos^2 x - \\cos x = 0'] },
  { tex: '\\cos 2x = \\sin x', g: (x) => cosD(2 * x) - sinD(x), form: '2\\sin^2 x + \\sin x - 1 = 0', wrong: ['2\\sin^2 x - \\sin x - 1 = 0', '\\sin^2 x + \\sin x = 0', '2\\cos^2 x - \\sin x - 1 = 0'] },
  { tex: '\\sin 2x + \\sin x = 0', g: (x) => sinD(2 * x) + sinD(x), form: '\\sin x(2\\cos x + 1) = 0', wrong: ['2\\cos x + 1 = 0', '\\sin x(2\\cos x - 1) = 0', '\\sin x(\\cos x + 1) = 0'] },
  { tex: '\\cos 2x + \\cos x = 0', g: (x) => cosD(2 * x) + cosD(x), form: '2\\cos^2 x + \\cos x - 1 = 0', wrong: ['2\\cos^2 x - \\cos x - 1 = 0', '\\cos^2 x + \\cos x = 0', '2\\cos^2 x + \\cos x + 1 = 0'] }
];

const doubleEquivalentForm = (r) => {
  const e = r.pick(DOUBLE_EQS);
  return mc({
    title: 'Postać równoważna równania z kątem podwojonym',
    q: T`Równanie $${e.tex}$ jest równoważne równaniu`,
    ok: m(e.form),
    bad: e.wrong.map(m),
    steps: [T`Zastosuj wzór na $${e.tex.includes('\\sin 2x') ? '\\sin 2x = 2\\sin x\\cos x' : '\\cos 2x'}$ i przenieś wszystko na jedną stronę.`, T`Otrzymujesz $${e.form}$.`],
    trap: 'Nie dziel przez $\\sin x$ ani $\\cos x$ – zamiast tego wyłącz czynnik przed nawias, żeby nie zgubić rozwiązań.',
    tip: TIP_DOUBLE
  });
};

const doubleCount = (r) => {
  const e = r.pick(DOUBLE_EQS);
  const I = r.pick(INTERVALS.slice(0, 3));
  const S = sols(e.g, I);
  return num({
    title: 'Liczba rozwiązań równania z kątem podwojonym',
    q: T`Ile rozwiązań ma równanie $${e.tex}$ w przedziale $${piInterval(...I)}$? Wpisz liczbę.`,
    ans: S.length,
    steps: [T`$${e.tex}$ jest równoważne $${e.form}$.`, T`W przedziale $${piInterval(...I)}$: $${piSet(S)}$ – razem $${S.length}$.`],
    trap: 'Każdy czynnik iloczynu daje osobną serię rozwiązań – zbierz je wszystkie i usuń powtórzenia.',
    tip: TIP_DOUBLE
  });
};

const doubleSet = (r) => {
  const e = r.pick(DOUBLE_EQS);
  const I = r.pick([[0, 180], [0, 360]]);
  const S = sols(e.g, I);
  need(S.length > 1);
  const others = DOUBLE_EQS.filter((o) => o !== e).map((o) => piSet(sols(o.g, I)));
  return mc({
    title: 'Rozwiązania równania z kątem podwojonym',
    q: T`Zbiór wszystkich rozwiązań równania $${e.tex}$ w przedziale $${piInterval(...I)}$ to`,
    ok: m(piSet(S)),
    bad: [...others, piSet(S.slice(1)), piSet(S.slice(0, -1))].filter((x) => x !== piSet(S)).map(m),
    steps: [T`$${e.tex}$ jest równoważne $${e.form}$.`, T`Rozwiązania w przedziale: $${piSet(S)}$.`],
    trap: 'Czynnik $\\sin x$ albo $\\cos x$ też daje rozwiązania – nie skreślaj go.',
    tip: TIP_DOUBLE
  });
};

const doubleMembership = (r) => {
  const st = () => {
    const e = r.pick(DOUBLE_EQS);
    const d = r.pick([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]);
    const truth = Math.abs(e.g(d)) < 1e-9;
    return [T`Liczba $${piTex(d)}$ jest rozwiązaniem równania $${e.tex}$.`, truth, truth ? T`Po podstawieniu obie strony są równe.` : T`Po podstawieniu obie strony są różne.`];
  };
  return pf({ title: 'Czy liczba spełnia równanie', s1: st(), s2: st(), trap: 'Podstaw liczbę i policz obie strony osobno.', tip: TIP_DOUBLE });
};

const openCosDouble = (r) => {
  const [t1, t2] = pickRoots(r);
  const p = 2 * (t1 + t2);
  const q = -1 - 2 * t1 * t2;
  need(Number.isInteger(q));
  const g = (x) => cosD(2 * x) + p * sinD(x) + q;
  const S = sols(g, [0, 360]);
  need(S.length > 0);
  const ts = [t1, t2].sort((a, b) => a - b);
  const bad = ts.filter((t) => Math.abs(t) > 1);
  const eq = `${terms([[1, '\\cos 2x'], [p, '\\sin x'], [q, '']])} = 0`;
  return open({
    title: 'Równanie z cosinusem kąta podwojonego',
    q: T`Rozwiąż równanie $${eq}$ w przedziale $\langle 0, 2\pi \rangle$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zastosowanie wzoru $\cos 2x = 1 - 2\sin^2 x$ i zapisanie równania z jedną funkcją $\sin x$.`],
      [2, 'Etap 2', T`Rozwiązanie równania kwadratowego z $t = \sin x$: $t = ${valTex(ts[0])}$ lub $t = ${valTex(ts[1])}$${bad.length ? T`, odrzucenie $t = ${valTex(bad[0])}$` : ''}.`],
      [3, 'Etap 3', 'Rozwiązanie jednego z równań elementarnych w przedziale.'],
      [4, 'Komplet', T`Wszystkie rozwiązania: $x \in ${piSet(S)}$.`]
    ],
    steps: [
      T`$\cos 2x = 1 - 2\sin^2 x$, więc równanie ma postać $${terms([[-2, '\\sin^2 x'], [p, '\\sin x'], [1 + q, '']])} = 0$.`,
      T`$t = \sin x$: $t = ${valTex(ts[0])}$ lub $t = ${valTex(ts[1])}$.${bad.length ? T` $|${valTex(bad[0])}| > 1$ – odrzucamy.` : ''}`,
      T`Odpowiedź: $x \in ${piSet(S)}$.`
    ],
    trap: T`Wybierz postać $\cos 2x = 1 - 2\sin^2 x$ – wtedy w równaniu zostaje tylko sinus.`,
    tip: TIP_DOUBLE,
    answer: m(`x \\in ${piSet(S)}`)
  });
};

// ---------- 8.5 Iloczyn i pełny zapis ----------
const K_VALUES = [[1, ''], [Math.SQRT2, '\\sqrt{2}'], [Math.sqrt(3), '\\sqrt{3}'], [-1, '-'], [-Math.SQRT2, '-\\sqrt{2}'], [-Math.sqrt(3), '-\\sqrt{3}']];

const productEquation = (r) => {
  const [k, kt] = r.pick(K_VALUES);
  const withSin = r.bool();
  const [first, second] = withSin ? ['\\sin x', '\\cos x'] : ['\\cos x', '\\sin x'];
  const g = (x) => (withSin ? sinD(x) : cosD(x)) * (2 * (withSin ? cosD(x) : sinD(x)) - k);
  const S = sols(g, [0, 360]);
  const part = sols((x) => 2 * (withSin ? cosD(x) : sinD(x)) - k, [0, 360]);
  return mc({
    title: 'Równanie iloczynowe',
    q: T`Zbiór wszystkich rozwiązań równania $${first}(2${second} ${k < 0 ? '+' : '-'} ${kt.replace('-', '') || 1}) = 0$ w przedziale $\langle 0, 2\pi \rangle$ to`,
    ok: m(piSet(S)),
    bad: [piSet(part), piSet(sols((x) => (withSin ? sinD(x) : cosD(x)), [0, 360])), piSet(sols((x) => (withSin ? sinD(x) : cosD(x)) * (2 * (withSin ? cosD(x) : sinD(x)) + k), [0, 360]))].filter((x) => x !== piSet(S)).map(m),
    steps: [T`Iloczyn jest zerem, gdy $${first} = 0$ lub $${second} = ${valTex(k / 2)}$.`, T`Zbiór rozwiązań: $${piSet(S)}$.`],
    trap: 'Oba czynniki dają rozwiązania – odpowiedź to SUMA rozwiązań z obu równań.',
    tip: TIP_DOUBLE
  });
};

const productCount = (r) => {
  const [k, kt] = r.pick(K_VALUES);
  const bySin = r.bool();
  const I = r.pick(INTERVALS.slice(0, 3));
  const g = bySin ? (x) => sinD(2 * x) - k * sinD(x) : (x) => sinD(2 * x) - k * cosD(x);
  const S = sols(g, I);
  return num({
    title: 'Liczba rozwiązań równania iloczynowego',
    q: T`Ile rozwiązań ma równanie $\sin 2x = ${kt}${bySin ? '\\sin x' : '\\cos x'}$ w przedziale $${piInterval(...I)}$? Wpisz liczbę.`,
    ans: S.length,
    steps: [T`$\sin 2x = 2\sin x\cos x$, więc $${bySin ? '\\sin x' : '\\cos x'}(2${bySin ? '\\cos x' : '\\sin x'} ${kt.startsWith('-') ? '+' : '-'} ${kt.replace('-', '') || 1}) = 0$.`, T`Rozwiązania w przedziale: $${piSet(S)}$ – razem $${S.length}$.`],
    trap: 'Dzielenie przez $\\sin x$ (albo $\\cos x$) gubi rozwiązania, w których ten czynnik jest zerem.',
    tip: TIP_DOUBLE
  });
};

const factorChoice = (r) => {
  const [k, kt] = r.pick(K_VALUES);
  const bySin = r.bool();
  const kk = kt === '' ? '1' : kt === '-' ? '-1' : kt;
  const inner = (s) => `2\\${s} x ${kk.startsWith('-') ? '+' : '-'} ${kk.replace('-', '')}`;
  const ok = bySin ? `\\sin x(${inner('cos')}) = 0` : `\\cos x(${inner('sin')}) = 0`;
  return mc({
    title: 'Rozkład równania na czynniki',
    q: T`Równanie $\sin 2x = ${kt}${bySin ? '\\sin x' : '\\cos x'}$ jest równoważne równaniu`,
    ok: m(ok),
    bad: [bySin ? `${inner('cos')} = 0` : `${inner('sin')} = 0`, bySin ? `\\cos x(${inner('sin')}) = 0` : `\\sin x(${inner('cos')}) = 0`, bySin ? `\\sin x(2\\cos x ${kk.startsWith('-') ? '-' : '+'} ${kk.replace('-', '')}) = 0` : `\\cos x(2\\sin x ${kk.startsWith('-') ? '-' : '+'} ${kk.replace('-', '')}) = 0`].map(m),
    steps: [T`$\sin 2x = 2\sin x\cos x$, więc $2\sin x\cos x ${minusK(kk, bySin ? '\\sin x' : '\\cos x')} = 0$.`, T`Wyłączamy wspólny czynnik: $${ok}$.`],
    trap: 'Postać bez wspólnego czynnika (po „skróceniu”) gubi część rozwiązań.',
    tip: TIP_DOUBLE
  });
};

const PRODUCT_FACTS = [
  [T`Dzieląc obie strony równania $\sin 2x = \sin x$ przez $\sin x$, tracimy rozwiązania.`, true, T`Gubimy rozwiązania $x = k\pi$, dla których $\sin x = 0$.`],
  [T`Równanie $\sin x \cdot \cos x = 0$ ma w przedziale $\langle 0, 2\pi \rangle$ pięć rozwiązań.`, true, T`$0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}, 2\pi$.`],
  [T`Równanie $\sin 2x = 2\sin x$ jest równoważne równaniu $\cos x = 1$.`, false, T`$2\sin x(\cos x - 1) = 0$ – także $\sin x = 0$.`],
  [T`Iloczyn dwóch wyrażeń jest równy zeru, gdy co najmniej jedno z nich jest zerem.`, true, 'Podstawa metody rozkładu na czynniki.']
];

const productFacts = (r) => {
  const [s1, s2] = pickTwo(r, PRODUCT_FACTS);
  return pf({ title: 'Równania iloczynowe', s1, s2, trap: 'Zamiast dzielić – wyłączaj przed nawias.', tip: TIP_DOUBLE });
};

const openProductEquation = (r) => {
  const [k, kt] = r.pick(K_VALUES);
  const bySin = r.bool();
  const g = bySin ? (x) => sinD(2 * x) - k * sinD(x) : (x) => sinD(2 * x) - k * cosD(x);
  const S = sols(g, [0, 360]);
  const kk = kt === '' ? '1' : kt === '-' ? '-1' : kt;
  const [f1, f2] = bySin ? ['\\sin x', '\\cos x'] : ['\\cos x', '\\sin x'];
  const fac = `${f1}(2${f2} ${kk.startsWith('-') ? '+' : '-'} ${kk.replace('-', '')}) = 0`;
  const S1 = sols((x) => (bySin ? sinD(x) : cosD(x)), [0, 360]);
  const S2 = sols((x) => 2 * (bySin ? cosD(x) : sinD(x)) - k, [0, 360]);
  return open({
    title: 'Równanie iloczynowe z kątem podwojonym',
    q: T`Rozwiąż równanie $\sin 2x = ${kt}${bySin ? '\\sin x' : '\\cos x'}$ w przedziale $\langle 0, 2\pi \rangle$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zastosowanie wzoru $\sin 2x = 2\sin x\cos x$.`],
      [2, 'Etap 2', T`Rozkład na czynniki: $${fac}$.`],
      [3, 'Etap 3', T`Rozwiązanie jednego z równań: $${f1} = 0$ albo $${f2} = ${valTex(k / 2)}$.`],
      [4, 'Komplet', T`Wszystkie rozwiązania: $x \in ${piSet(S)}$.`]
    ],
    steps: [
      T`$2\sin x\cos x ${minusK(kk, bySin ? '\\sin x' : '\\cos x')} = 0$, czyli $${fac}$.`,
      T`$${f1} = 0$: $x \in ${piSet(S1)}$; $${f2} = ${valTex(k / 2)}$: $x \in ${piSet(S2)}$.`,
      T`Odpowiedź: $x \in ${piSet(S)}$.`
    ],
    trap: T`Nie dziel przez $${f1}$ – rozwiązania z $${f1} = 0$ też należą do odpowiedzi.`,
    tip: TIP_DOUBLE,
    answer: m(`x \\in ${piSet(S)}`)
  });
};

export default {
  numericId: 8,
  title: 'Równania trygonometryczne',
  short_title: 'Równania trygonometryczne',
  description: 'Równania elementarne, rozwiązania w przedziale, podstawienie, wzory na kąt podwojony i równania iloczynowe.',
  icon: 'TriangleRight',
  color: '#FFB800',
  matura_points_range: '3–5 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 11–14',
  cke_stats: 'W 11 z 11 arkuszy CKE 2022–2026, średnio 4,1 pkt na arkusz (VII.R6 – łącznie 45 pkt).',
  lessons: [
    {
      title: 'Równania elementarne: sin x = a, cos x = a, tg x = a',
      short_title: 'Równania elementarne',
      requirements: ['VII.R6'],
      prereq: ['math-lesson-8-2'],
      pill: pill({
        essence: T`Równanie $\sin x = a$ ma w każdym okresie dwa rozwiązania: kąt podstawowy $x_0$ i $\pi - x_0$. Dla $\cos x = a$ to $x_0$ i $-x_0$, a dla $\operatorname{tg} x = a$ – jedno rozwiązanie z okresem $\pi$. Do każdej serii dopisujesz okres: $+ 2k\pi$ (albo $+ k\pi$ dla tangensa).`,
        context: 'Równanie trygonometryczne było na KAŻDYM arkuszu CKE 2022–2026 (11 z 11), średnio za 4 pkt. Równania elementarne to jego ostatni krok.',
        pl: T`$\sin x = \frac{1}{2}$: na kole trygonometrycznym prosta $y = \frac{1}{2}$ przecina okrąg w dwóch punktach – przy $\frac{\pi}{6}$ i przy $\frac{5\pi}{6}$. Po pełnym obrocie wszystko się powtarza, stąd $+ 2k\pi$.`,
        steps: [
          ['Kąt podstawowy', T`Z tabeli wartości (str. 12).`, 'Dla ujemnego a – kąt ujemny lub z ćwiartki.'],
          ['Druga seria', T`sin: $\pi - x_0$; cos: $-x_0$.`, 'Tangens – tylko jedna seria.'],
          ['Okres', T`$+ 2k\pi$, a dla tangensa $+ k\pi$.`, 'k – dowolna liczba całkowita.']
        ],
        formulas: [
          ['Sinus', T`\sin x = \sin x_0: \ x = x_0 + 2k\pi \ \text{lub} \ x = \pi - x_0 + 2k\pi`],
          ['Cosinus', T`\cos x = \cos x_0: \ x = \pm x_0 + 2k\pi`],
          ['Tangens', T`\operatorname{tg} x = \operatorname{tg} x_0: \ x = x_0 + k\pi`, 14]
        ],
        examples: [
          ['Sinus', '1 pkt', T`Rozwiąż $\sin x = \frac{\sqrt{2}}{2}$.`, T`1. $x_0 = \frac{\pi}{4}$.` + '\n' + T`2. $x = \frac{\pi}{4} + 2k\pi$ lub $x = \frac{3\pi}{4} + 2k\pi$.`, 'Druga seria: π − π/4.'],
          ['Przedział', '2 pkt', T`Rozwiąż $\cos x = -\frac{1}{2}$ w $\langle 0, 2\pi \rangle$.`, T`1. $x_0 = \frac{2\pi}{3}$, druga seria $-\frac{2\pi}{3} + 2\pi = \frac{4\pi}{3}$.` + '\n' + T`2. $x \in \{\frac{2\pi}{3}, \frac{4\pi}{3}\}$.`, 'Ujemny kąt przesuwasz o okres.']
        ],
        trap: T`Dla sinusa druga seria to $\pi - x_0$, a nie $-x_0$. Pomylenie wzorów daje rozwiązania, które nie spełniają równania.`,
        fail: T`„$\sin x = \frac{1}{2}$, więc $x = \pm\frac{\pi}{6} + 2k\pi$.”`,
        win: T`$x = \frac{\pi}{6} + 2k\pi$ lub $x = \frac{5\pi}{6} + 2k\pi$.`,
        why: T`$\sin(-\frac{\pi}{6}) = -\frac{1}{2}$ – to rozwiązanie innego równania.`,
        ckeTip: 'Na końcu wypisz rozwiązania z przedziału jako zbiór – egzaminator punktuje kompletną odpowiedź.',
        points: ['sin: x₀ i π − x₀.', 'cos: x₀ i −x₀.', 'tg: x₀ + kπ.']
      }),
      gens: [generalSolutionChoice, solutionCount, tangentGeneral, elementaryFacts, openElementary]
    },
    {
      title: 'Rozwiązania w zadanym przedziale',
      short_title: 'Rozwiązania w przedziale',
      requirements: ['VII.R6'],
      prereq: ['math-lesson-8-4'],
      pill: pill({
        essence: T`Gdy w równaniu jest $\sin kx$ albo $\cos kx$, podstawiasz $t = kx$: rozwiązujesz równanie elementarne w $t$, a potem dzielisz przez $k$ – także okres. Przedział dla $t$ jest $k$ razy dłuższy niż dla $x$, więc rozwiązań jest więcej. Na końcu wybierasz te, które leżą w zadanym przedziale.`,
        context: 'CKE zawsze podaje przedział (np. $\\langle 0, \\pi \\rangle$) – ostatni punkt jest za wybranie dokładnie tych rozwiązań, które do niego należą.',
        pl: T`$\sin 2x$ „kręci się” dwa razy szybciej niż $\sin x$. Na odcinku od $0$ do $2\pi$ zdąży zrobić dwa pełne obroty, więc każde rozwiązanie pojawia się dwa razy częściej.`,
        steps: [
          ['Podstaw t = kx', T`Równanie elementarne w $t$.`, 'Przedział dla t: k razy dłuższy.'],
          ['Wróć do x', T`Podziel rozwiązania i okres przez $k$.`, '2kπ zamienia się w 2kπ/k.'],
          ['Wybierz z przedziału', T`Podstaw kolejne $k$ całkowite.`, 'Sprawdź końce przedziału.']
        ],
        formulas: [
          ['Podstawienie', T`t = kx, \quad x = \frac{t}{k}`],
          ['Okres po podstawieniu', T`t = t_0 + 2k\pi \ \Rightarrow \ x = \frac{t_0}{k} + \frac{2k\pi}{k}`.replace('\\Rightarrow', '\\text{więc}')],
          ['Tabela wartości', T`\sin\frac{\pi}{6} = \frac{1}{2}, \ \cos\frac{\pi}{3} = \frac{1}{2}`, 12]
        ],
        examples: [
          ['Podwojony argument', '3 pkt', T`Rozwiąż $\sin 2x = \frac{1}{2}$ w $\langle 0, \pi \rangle$.`, T`1. $2x = \frac{\pi}{6} + 2k\pi$ lub $2x = \frac{5\pi}{6} + 2k\pi$.` + '\n' + T`2. $x = \frac{\pi}{12} + k\pi$ lub $x = \frac{5\pi}{12} + k\pi$.` + '\n' + T`3. $x \in \{\frac{\pi}{12}, \frac{5\pi}{12}\}$.`, 'Okres w x to π.'],
          ['Liczba rozwiązań', '1 pkt', T`Ile rozwiązań ma $\cos 2x = 0$ w $\langle 0, 2\pi \rangle$?`, T`1. $2x = \frac{\pi}{2} + k\pi$, więc $x = \frac{\pi}{4} + \frac{k\pi}{2}$.` + '\n' + T`2. Cztery rozwiązania.`, 'Krok między rozwiązaniami to π/2.']
        ],
        trap: T`Po podzieleniu przez $k$ zmienia się też okres: $2x = \ldots + 2k\pi$ daje $x = \ldots + k\pi$, a nie $+ 2k\pi$.`,
        fail: T`„$2x = \frac{\pi}{6} + 2k\pi$, więc $x = \frac{\pi}{12} + 2k\pi$.”`,
        win: T`$x = \frac{\pi}{12} + k\pi$.`,
        why: 'Dzielisz przez 2 całe wyrażenie, także składnik z okresem.',
        ckeTip: 'Wypisz rozwiązania dla kolejnych $k$ (np. $k = 0, 1$) – egzaminator widzi, skąd wzięły się liczby z przedziału.',
        points: ['t = kx.', 'Okres też dzielisz przez k.', 'Wybierz rozwiązania z przedziału.']
      }),
      gens: [multipleAngleCount, solutionSetInInterval, smallestPositive, countFacts, openDoubleArgument]
    },
    {
      title: 'Równania sprowadzalne do kwadratowego',
      short_title: 'Podstawienie t = sin x',
      requirements: ['VII.R6'],
      prereq: ['math-lesson-3-2'],
      pill: pill({
        essence: T`Równanie, w którym występuje $\sin^2 x$ i $\sin x$ (albo cosinusy), rozwiązujesz podstawieniem $t = \sin x$, z warunkiem $t \in \langle -1, 1 \rangle$. Jeśli w równaniu są obie funkcje, najpierw jedynką trygonometryczną zamieniasz $\cos^2 x$ na $1 - \sin^2 x$. Każde dopuszczalne $t$ daje równanie elementarne.`,
        context: 'Podstawienie to najczęstszy typ równania trygonometrycznego na rozszerzeniu (np. maj 2023, czerwiec 2024: 4–5 pkt).',
        pl: T`$2\sin^2 x - 3\sin x + 1 = 0$ to w przebraniu $2t^2 - 3t + 1 = 0$. Rozwiązujesz zwykłe równanie kwadratowe ($t = 1$ albo $t = \frac{1}{2}$), a potem pytasz: dla jakich $x$ sinus ma te wartości?`,
        steps: [
          ['Jedna funkcja', T`Jedynka: $\cos^2 x = 1 - \sin^2 x$.`, 'Albo odwrotnie.'],
          ['Podstawienie', T`$t = \sin x$, $t \in \langle -1, 1 \rangle$.`, 'Równanie kwadratowe.'],
          ['Powrót do x', T`Odrzuć $|t| > 1$, rozwiąż równania elementarne.`, 'Zbierz rozwiązania z przedziału.']
        ],
        formulas: [
          ['Jedynka', T`\sin^2 x + \cos^2 x = 1`, 12],
          ['Warunek', T`t = \sin x \in \langle -1, 1 \rangle`],
          ['Wyróżnik', T`\Delta = b^2 - 4ac`, 7]
        ],
        examples: [
          ['Podstawienie', '4 pkt', T`Rozwiąż $2\sin^2 x - \sin x - 1 = 0$ w $\langle 0, 2\pi \rangle$.`, T`1. $2t^2 - t - 1 = 0$: $t = 1$ lub $t = -\frac{1}{2}$.` + '\n' + T`2. $\sin x = 1$: $\frac{\pi}{2}$; $\sin x = -\frac{1}{2}$: $\frac{7\pi}{6}, \frac{11\pi}{6}$.` + '\n' + T`3. $x \in \{\frac{\pi}{2}, \frac{7\pi}{6}, \frac{11\pi}{6}\}$.`, 'sin x = 1 daje tylko jedno rozwiązanie w okresie.'],
          ['Jedynka', '4 pkt', T`Rozwiąż $2\cos^2 x + 3\sin x - 3 = 0$.`, T`1. $2(1 - \sin^2 x) + 3\sin x - 3 = 0$.` + '\n' + T`2. $2t^2 - 3t + 1 = 0$: $t = 1$ lub $t = \frac{1}{2}$.`, 'Najpierw zamiana na jedną funkcję.']
        ],
        trap: T`Pierwiastek $t = 2$ (albo $t = -\frac{3}{2}$) trzeba jawnie odrzucić – sinus nie przyjmuje takich wartości.`,
        fail: T`„$t = 2$, więc $\sin x = 2$ i $x = \ldots$”`,
        win: T`$t = 2 \notin \langle -1, 1 \rangle$ – brak rozwiązań z tego czynnika.`,
        why: 'Zbiór wartości sinusa to ⟨−1, 1⟩.',
        ckeTip: 'Zapis „$t \\in \\langle -1, 1 \\rangle$” przy podstawieniu to element pełnego rozwiązania – bez niego odrzucenie pierwiastka jest bezpodstawne.',
        points: ['Jedna funkcja dzięki jedynce.', 't ∈ ⟨−1, 1⟩.', 'Każde t – równanie elementarne.']
      }),
      gens: [quadraticTrigSet, quadraticTrigCount, pythagoreanSubstitution, substitutionFacts, openQuadraticTrig]
    },
    {
      title: 'Kąt podwojony w równaniach',
      short_title: 'Kąt podwojony',
      requirements: ['VII.R6', 'VII.R5'],
      prereq: ['math-lesson-8-3'],
      pill: pill({
        essence: T`Gdy w równaniu jest $\sin 2x$ obok $\sin x$ lub $\cos x$, zamieniasz $\sin 2x = 2\sin x\cos x$ i wyłączasz wspólny czynnik. Przy $\cos 2x$ wybierasz postać z jedną funkcją: $1 - 2\sin^2 x$ albo $2\cos^2 x - 1$ – powstaje równanie kwadratowe.`,
        context: 'Równania z kątem podwojonym pojawiały się w zadaniach PR za 4–5 pkt (np. czerwiec 2023). Wymagają połączenia VII.R5 i VII.R6.',
        pl: T`$\sin 2x = \sin x$ wygląda, jakby wystarczyło „skrócić sinusy”. Ale $\sin 2x = 2\sin x\cos x$, więc równanie to $\sin x(2\cos x - 1) = 0$ – i nagle widać dwie grupy rozwiązań.`,
        steps: [
          ['Wzór', T`$\sin 2x = 2\sin x\cos x$, $\cos 2x = 1 - 2\sin^2 x$.`, 'Dobierz do reszty równania.'],
          ['Iloczyn albo kwadrat', T`Wyłącz czynnik albo podstaw $t$.`, 'Nie dziel przez funkcję.'],
          ['Rozwiązania', T`Wszystkie czynniki / wszystkie $t$.`, 'Suma rozwiązań.']
        ],
        formulas: [
          ['Sinus podwojony', T`\sin 2x = 2\sin x\cos x`, 13],
          ['Cosinus podwojony', T`\cos 2x = 1 - 2\sin^2 x = 2\cos^2 x - 1`, 13],
          ['Iloczyn', T`ab = 0 \ \text{gdy} \ a = 0 \ \text{lub} \ b = 0`]
        ],
        examples: [
          ['Iloczyn', '3 pkt', T`Rozwiąż $\sin 2x = \cos x$ w $\langle 0, \pi \rangle$.`, T`1. $\cos x(2\sin x - 1) = 0$.` + '\n' + T`2. $\cos x = 0$: $\frac{\pi}{2}$; $\sin x = \frac{1}{2}$: $\frac{\pi}{6}, \frac{5\pi}{6}$.` + '\n' + T`3. $x \in \{\frac{\pi}{6}, \frac{\pi}{2}, \frac{5\pi}{6}\}$.`, 'Czynnik cos x też daje rozwiązanie.'],
          ['Kwadratowe', '4 pkt', T`Rozwiąż $\cos 2x = \cos x$.`, T`1. $2\cos^2 x - 1 - \cos x = 0$.` + '\n' + T`2. $\cos x = 1$ lub $\cos x = -\frac{1}{2}$.`, 'Wybierasz postać z samym cosinusem.']
        ],
        trap: T`Podzielenie $\sin 2x = \cos x$ przez $\cos x$ gubi rozwiązanie $x = \frac{\pi}{2}$.`,
        fail: T`„Dzielę przez $\cos x$: $2\sin x = 1$.”`,
        win: T`$\cos x(2\sin x - 1) = 0$ – rozwiązujesz oba czynniki.`,
        why: 'Dzielenie wolno wykonać tylko przez wyrażenie różne od zera.',
        ckeTip: 'Rozkład na czynniki zapisz jawnie – w kluczu CKE to osobny etap rozwiązania.',
        points: ['Wzór na kąt podwojony.', 'Wyłączaj, nie dziel.', 'cos 2x: postać z jedną funkcją.']
      }),
      gens: [doubleEquivalentForm, doubleCount, doubleSet, doubleMembership, openCosDouble]
    },
    {
      title: 'Równania iloczynowe i pełny zapis rozwiązania',
      short_title: 'Równania iloczynowe',
      requirements: ['VII.R6'],
      prereq: ['math-lesson-3-4'],
      pill: pill({
        essence: T`Iloczyn jest równy zeru, gdy któryś czynnik jest zerem. Równanie trygonometryczne rozkładasz na czynniki (wyłączając wspólną funkcję), rozwiązujesz każde równanie elementarne osobno, a odpowiedzią jest suma wszystkich rozwiązań z przedziału – bez powtórzeń.`,
        context: 'Pełne rozwiązanie równania trygonometrycznego za 4 pkt ma w kluczu CKE etapy: wzór, rozkład, jedno równanie elementarne, komplet rozwiązań.',
        pl: T`$\sin x(2\cos x - \sqrt{3}) = 0$ to dwa osobne pytania: kiedy sinus jest zerem? kiedy cosinus to $\frac{\sqrt{3}}{2}$? Odpowiedzi zbierasz do jednego worka.`,
        steps: [
          ['Rozkład', T`Wyłącz wspólny czynnik.`, 'Po zastosowaniu wzorów.'],
          ['Każdy czynnik', T`Osobne równanie elementarne.`, 'W zadanym przedziale.'],
          ['Odpowiedź', T`Suma zbiorów, bez powtórzeń.`, 'Zapisz jako zbiór.']
        ],
        formulas: [
          ['Iloczyn', T`a \cdot b = 0 \ \text{gdy} \ a = 0 \ \text{lub} \ b = 0`],
          ['Sinus podwojony', T`\sin 2x = 2\sin x\cos x`, 13],
          ['Zera funkcji', T`\sin x = 0: \ x = k\pi, \quad \cos x = 0: \ x = \frac{\pi}{2} + k\pi`]
        ],
        examples: [
          ['Pełny zapis', '4 pkt', T`Rozwiąż $\sin 2x = \sqrt{3}\sin x$ w $\langle 0, 2\pi \rangle$.`, T`1. $2\sin x\cos x - \sqrt{3}\sin x = 0$, czyli $\sin x(2\cos x - \sqrt{3}) = 0$.` + '\n' + T`2. $\sin x = 0$: $0, \pi, 2\pi$; $\cos x = \frac{\sqrt{3}}{2}$: $\frac{\pi}{6}, \frac{11\pi}{6}$.` + '\n' + T`3. $x \in \{0, \frac{\pi}{6}, \pi, \frac{11\pi}{6}, 2\pi\}$.`, 'Końce przedziału też są rozwiązaniami.'],
          ['Liczba rozwiązań', '1 pkt', T`Ile rozwiązań ma $\sin x\cos x = 0$ w $\langle 0, 2\pi \rangle$?`, T`1. $\sin x = 0$: $0, \pi, 2\pi$.` + '\n' + T`2. $\cos x = 0$: $\frac{\pi}{2}, \frac{3\pi}{2}$. Razem $5$.`, 'Policz oba czynniki.']
        ],
        trap: 'Rozwiązania na końcach przedziału domkniętego (np. $0$ i $2\\pi$) łatwo przeoczyć.',
        fail: T`„$\sin x = 0$ w $\langle 0, 2\pi \rangle$: $x = \pi$.”`,
        win: T`$x \in \{0, \pi, 2\pi\}$.`,
        why: 'Przedział jest domknięty – końce należą do niego.',
        ckeTip: 'Odpowiedź końcową zapisz jednym zbiorem – rozproszone wyniki bez podsumowania mogą kosztować ostatni punkt.',
        points: ['Rozkład na czynniki.', 'Każdy czynnik osobno.', 'Suma rozwiązań, z końcami przedziału.']
      }),
      gens: [productEquation, productCount, factorChoice, productFacts, openProductEquation]
    }
  ]
};
