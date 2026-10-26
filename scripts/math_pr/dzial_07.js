import { T, mc, num, pf, open, pill, fr, dec, m, need, iv } from '../math_pp/lib.js';
import { pickTwo } from './common.js';
import { SPECIAL, sinD, cosD, tgD, valTex, piTex, TRIPLES } from './trig.js';

const TIP_RAD = 'Karta wzorów, str. 11–12: $180^\\circ = \\pi$ rad. Wartości funkcji dla kątów $\\frac{\\pi}{6}, \\frac{\\pi}{4}, \\frac{\\pi}{3}$ są w tabeli na str. 12.';
const TIP_RED = 'Karta wzorów, str. 13: wzory redukcyjne. Znak wyniku ustalasz z ćwiartki, w której leży kąt (przy założeniu, że α jest ostry).';
const TIP_SUM = 'Karta wzorów, str. 12–13: $\\sin(\\alpha \\pm \\beta)$, $\\cos(\\alpha \\pm \\beta)$, $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$, $\\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha$.';
const TIP_ID = 'Dowód tożsamości: przekształcasz jedną stronę (zwykle bardziej skomplikowaną), aż otrzymasz drugą. Najczęstsze narzędzia: jedynka trygonometryczna i wzory na kąt podwojony.';

const FN = { sin: sinD, cos: cosD, tg: tgD };
const fnTex = (f) => (f === 'tg' ? '\\operatorname{tg}' : `\\${f}`);

// ---------- 7.1 Miara łukowa ----------
const degToRad = (r) => {
  const d = r.pick([...SPECIAL.filter((x) => x !== 0), 360, 450, 540]);
  const ok = piTex(d);
  const val = (d * Math.PI) / 180;
  return mc({
    title: 'Zamiana stopni na radiany',
    q: T`Kąt $${d}^\circ$ wyrażony w radianach jest równy`,
    ok: m(ok),
    val,
    bad: [piTex(d * 2), piTex(d / 2), piTex(180 - d), piTex(360 - d), piTex(d + 180)].filter((x) => x !== ok && x !== '0').map(m),
    steps: [T`$180^\circ = \pi$, więc $1^\circ = \frac{\pi}{180}$.`, T`$${d}^\circ = ${d} \cdot \frac{\pi}{180} = ${ok}$.`],
    trap: T`Mnożysz przez $\frac{\pi}{180}$, a nie przez $\frac{180}{\pi}$.`,
    tip: TIP_RAD
  });
};

const radToDeg = (r) => {
  const d = r.pick([...SPECIAL.filter((x) => x !== 0), 360, 405, 480, 540, 600]);
  return num({
    title: 'Zamiana radianów na stopnie',
    q: T`Kąt $${piTex(d)}$ rad wyrażony w stopniach ma miarę (wpisz samą liczbę stopni):`,
    ans: d,
    steps: [T`$\pi = 180^\circ$, więc wystarczy podstawić $180^\circ$ w miejsce $\pi$.`, T`$${piTex(d)} = ${d}^\circ$.`],
    trap: T`Podstawiasz $180^\circ$ za $\pi$, a nie $3{,}14$.`,
    tip: TIP_RAD
  });
};

const radianValue = (r) => {
  const f = r.pick(['sin', 'cos', 'tg']);
  const d = r.pick(SPECIAL.filter((x) => !(f === 'tg' && (x === 90 || x === 270))));
  const v = FN[f](d);
  const ok = valTex(v);
  const ref = d % 180 === 0 ? 0 : d % 90 === 0 ? 90 : Math.min(d % 180, 180 - (d % 180));
  return mc({
    title: 'Wartość funkcji kąta w radianach',
    q: T`Wartość $${fnTex(f)} ${piTex(d)}$ jest równa`,
    ok: m(ok),
    val: v,
    bad: [m(ok.startsWith('-') ? ok.slice(1) : `-${ok}`), ...['\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}', '\\frac{\\sqrt{2}}{2}', '\\sqrt{3}', '1', '0', '-\\frac{1}{2}'].filter((x) => x !== ok).map(m)].slice(0, 6),
    steps: [T`$${piTex(d)} = ${d}^\circ$${ref && ref !== d ? T`, kąt odniesienia $${ref}^\circ$` : ''}.`, T`$${fnTex(f)} ${d}^\circ = ${ok}$ (znak z ćwiartki, w której leży kąt).`],
    trap: 'Najpierw ustal ćwiartkę i znak funkcji, dopiero potem wartość z tabeli dla kąta ostrego.',
    tip: TIP_RAD
  });
};

const RAD_FACTS = [
  [T`$\pi$ rad to $180^\circ$.`, true, 'Definicja miary łukowej.'],
  [T`Kąt $\frac{3\pi}{4}$ leży w III ćwiartce układu współrzędnych.`, false, T`$\frac{3\pi}{4} = 135^\circ$ – II ćwiartka.`],
  [T`$1$ radian to więcej niż $57^\circ$.`, true, T`$1 = \frac{180^\circ}{\pi} \approx 57{,}3^\circ$.`],
  [T`$\sin \frac{7\pi}{6} > 0$.`, false, T`$\frac{7\pi}{6} = 210^\circ$ – III ćwiartka, sinus ujemny.`],
  [T`$\cos \frac{5\pi}{3} = \frac{1}{2}$.`, true, T`$\frac{5\pi}{3} = 300^\circ$, $\cos 300^\circ = \cos 60^\circ$.`]
];

const radianFacts = (r) => {
  const [s1, s2] = pickTwo(r, RAD_FACTS);
  return pf({ title: 'Miara łukowa', s1, s2, trap: 'Zamień radiany na stopnie, żeby zobaczyć ćwiartkę.', tip: TIP_RAD });
};

const openRadianExpression = (r) => {
  const a = r.pick(SPECIAL.filter((d) => Number.isInteger(2 * sinD(d) + 1e-12) || Math.abs(2 * sinD(d) - Math.round(2 * sinD(d))) < 1e-9));
  const b = r.pick(SPECIAL.filter((d) => Math.abs(2 * cosD(d) - Math.round(2 * cosD(d))) < 1e-9));
  const k = r.int(2, 4);
  const v = k * sinD(a) + cosD(b);
  const res = fr(Math.round(2 * v), 2);
  return open({
    title: 'Wartość wyrażenia trygonometrycznego w radianach',
    q: T`Oblicz wartość wyrażenia $${k}\sin ${piTex(a)} + \cos ${piTex(b)}$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zamiana na stopnie i obliczenie wartości: $\sin ${a}^\circ = ${valTex(sinD(a))}$, $\cos ${b}^\circ = ${valTex(cosD(b))}$.`],
      [2, 'Komplet', T`Obliczenie wartości wyrażenia: $${res}$.`]
    ],
    steps: [
      T`$${piTex(a)} = ${a}^\circ$, $${piTex(b)} = ${b}^\circ$.`,
      T`$\sin ${a}^\circ = ${valTex(sinD(a))}$, $\cos ${b}^\circ = ${valTex(cosD(b))}$ (znaki z ćwiartek).`,
      T`$${k} \cdot ${valTex(sinD(a)).startsWith('-') ? `(${valTex(sinD(a))})` : valTex(sinD(a))} + ${valTex(cosD(b)).startsWith('-') ? `(${valTex(cosD(b))})` : valTex(cosD(b))} = ${res}$.`
    ],
    trap: 'Znak funkcji zależy od ćwiartki – kąt odniesienia daje tylko wartość bezwzględną.',
    tip: TIP_RAD,
    answer: m(res)
  });
};

// ---------- 7.2 Wykresy i okresowość ----------
const periodOf = (r) => {
  const f = r.pick(['sin', 'cos', 'tg']);
  const k = r.pick([2, 3, 4, 6]);
  const base = f === 'tg' ? 180 : 360;
  const ok = piTex(base / k);
  return mc({
    title: 'Okres podstawowy funkcji trygonometrycznej',
    q: T`Okres podstawowy funkcji $f(x) = ${fnTex(f)}(${k}x)$ jest równy`,
    ok: m(ok),
    val: ((base / k) * Math.PI) / 180,
    bad: [piTex(base), piTex(base * k), piTex((f === 'tg' ? 360 : 180) / k), piTex(base / (2 * k))].map(m),
    steps: [T`Okres podstawowy $${fnTex(f)} x$ to $${piTex(base)}$.`, T`Dla $${fnTex(f)}(${k}x)$ okres dzielimy przez $${k}$: $${ok}$.`],
    trap: f === 'tg' ? T`Tangens ma okres $\pi$, a nie $2\pi$.` : T`Mnożenie argumentu przez $${k}$ „ściska” wykres – okres się ZMNIEJSZA ${k} razy.`,
    tip: 'Karta wzorów, str. 11–13: wykresy i okresowość funkcji trygonometrycznych.'
  });
};

const valueRange = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.int(-5, 5);
  const f = r.pick(['sin', 'cos']);
  const askMax = r.bool();
  return num({
    title: 'Wartość największa i najmniejsza',
    q: T`Podaj ${askMax ? 'największą' : 'najmniejszą'} wartość funkcji $f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}${fnTex(f)} x${b ? ` ${b < 0 ? '-' : '+'} ${Math.abs(b)}` : ''}$. Wpisz liczbę.`,
    ans: askMax ? b + Math.abs(a) : b - Math.abs(a),
    steps: [T`$-1 \le ${fnTex(f)} x \le 1$, więc wyrażenie $${a}${fnTex(f)} x$ przyjmuje wartości od $${-Math.abs(a)}$ do $${Math.abs(a)}$.`, T`Zbiór wartości $f$: $${iv.cc(b - Math.abs(a), b + Math.abs(a))}$.`],
    trap: T`Przy ujemnym współczynniku największa wartość jest tam, gdzie funkcja trygonometryczna jest NAJMNIEJSZA.`,
    tip: 'Zbiór wartości $\\sin x$ i $\\cos x$ to $\\langle -1, 1 \\rangle$.'
  });
};

const periodicReduction = (r) => {
  const f = r.pick(['sin', 'cos', 'tg']);
  const d = r.pick(SPECIAL.filter((x) => x % 90 !== 0));
  const k = r.int(1, 3);
  const big = d + (f === 'tg' ? 180 : 360) * k;
  const v = FN[f](d);
  const ok = valTex(v);
  return mc({
    title: 'Okresowość w obliczaniu wartości',
    q: T`Wartość $${fnTex(f)} ${piTex(big)}$ jest równa`,
    ok: m(ok),
    val: v,
    bad: [m(ok.startsWith('-') ? ok.slice(1) : `-${ok}`), ...['\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}', '\\frac{\\sqrt{2}}{2}', '\\sqrt{3}', '\\frac{\\sqrt{3}}{3}', '1'].filter((x) => x !== ok).map(m)].slice(0, 5),
    steps: [T`Okres $${fnTex(f)}$ to $${f === 'tg' ? '\\pi' : '2\\pi'}$, więc $${fnTex(f)} ${piTex(big)} = ${fnTex(f)} ${piTex(d)}$.`, T`$${fnTex(f)} ${piTex(d)} = ${fnTex(f)} ${d}^\circ = ${ok}$.`],
    trap: 'Odejmij pełne okresy, zanim zaczniesz szukać ćwiartki – łatwiej o dobry znak.',
    tip: 'Karta wzorów, str. 13: $\\sin(\\alpha + k \\cdot 360^\\circ) = \\sin\\alpha$; tangens ma okres $180^\\circ$.'
  });
};

const GRAPH_FACTS = [
  [T`Funkcja $\cos x$ jest parzysta.`, true, T`$\cos(-x) = \cos x$ – wykres symetryczny względem osi $Oy$.`],
  [T`Funkcja $\operatorname{tg} x$ ma okres podstawowy $2\pi$.`, false, T`Okres tangensa to $\pi$.`],
  [T`Funkcja $\sin x$ jest rosnąca w przedziale $(0, \pi)$.`, false, T`Rośnie w $(0, \frac{\pi}{2})$, a maleje w $(\frac{\pi}{2}, \pi)$.`],
  [T`$|\sin x| \le 1$ dla każdej liczby rzeczywistej $x$.`, true, 'Zbiór wartości sinusa to $\\langle -1, 1 \\rangle$.'],
  [T`Funkcja $\operatorname{tg} x$ jest określona dla $x = \frac{\pi}{2}$.`, false, T`$\cos \frac{\pi}{2} = 0$ – tangens nie istnieje.`],
  [T`Funkcja $\sin x$ jest nieparzysta.`, true, T`$\sin(-x) = -\sin x$.`]
];

const graphFacts = (r) => {
  const [s1, s2] = pickTwo(r, GRAPH_FACTS);
  return pf({ title: 'Wykresy funkcji trygonometrycznych', s1, s2, trap: 'Narysuj szkic wykresu – większość takich stwierdzeń widać od razu.', tip: 'Karta wzorów, str. 11: wykresy sinusa, cosinusa i tangensa.' });
};

const openRangeAndValue = (r) => {
  const a = r.intNot(-4, 4, 0);
  const b = r.int(-4, 4);
  const f = r.pick(['sin', 'cos']);
  const d = r.pick(SPECIAL.filter((x) => Math.abs(2 * FN[f](x) - Math.round(2 * FN[f](x))) < 1e-9));
  const val = fr(Math.round(2 * (a * FN[f](d) + b)), 2);
  const expr = `${a === 1 ? '' : a === -1 ? '-' : a}${fnTex(f)} x${b ? ` ${b < 0 ? '-' : '+'} ${Math.abs(b)}` : ''}`;
  return open({
    title: 'Zbiór wartości i wartość funkcji',
    q: T`Funkcja $f$ jest określona wzorem $f(x) = ${expr}$. Wyznacz zbiór wartości funkcji $f$ oraz oblicz $f\left(${piTex(d)}\right)$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Wyznaczenie zbioru wartości: $${iv.cc(b - Math.abs(a), b + Math.abs(a))}$.`],
      [2, 'Komplet', T`Obliczenie wartości: $f\left(${piTex(d)}\right) = ${val}$.`]
    ],
    steps: [
      T`$-1 \le ${fnTex(f)} x \le 1$, więc $${a}${fnTex(f)} x$ zmienia się od $${-Math.abs(a)}$ do $${Math.abs(a)}$; zbiór wartości: $${iv.cc(b - Math.abs(a), b + Math.abs(a))}$.`,
      T`$${fnTex(f)} ${piTex(d)} = ${valTex(FN[f](d))}$, więc $f\left(${piTex(d)}\right) = ${val}$.`
    ],
    trap: 'Mnożenie przez liczbę ujemną zamienia końce przedziału miejscami.',
    tip: 'Zbiór wartości $\\sin x$ i $\\cos x$ to $\\langle -1, 1 \\rangle$.',
    answer: m(`ZW_f = ${iv.cc(b - Math.abs(a), b + Math.abs(a))}, \\; f\\left(${piTex(d)}\\right) = ${val}`)
  });
};

// ---------- 7.3 Wzory redukcyjne ----------
const REDUCTIONS = [
  ['\\sin(90^\\circ - \\alpha)', 'cos', 1],
  ['\\sin(90^\\circ + \\alpha)', 'cos', 1],
  ['\\cos(90^\\circ - \\alpha)', 'sin', 1],
  ['\\cos(90^\\circ + \\alpha)', 'sin', -1],
  ['\\sin(180^\\circ - \\alpha)', 'sin', 1],
  ['\\sin(180^\\circ + \\alpha)', 'sin', -1],
  ['\\cos(180^\\circ - \\alpha)', 'cos', -1],
  ['\\cos(180^\\circ + \\alpha)', 'cos', -1]
];
const redTex = (f, s) => `${s < 0 ? '-' : ''}\\${f}\\alpha`;

const reductionChoice = (r) => {
  const [lhs, f, s] = r.pick(REDUCTIONS);
  const other = f === 'sin' ? 'cos' : 'sin';
  return mc({
    title: 'Wzór redukcyjny',
    q: T`Dla każdego kąta $\alpha$ wyrażenie $${lhs}$ jest równe`,
    ok: m(redTex(f, s)),
    bad: [m(redTex(f, -s)), m(redTex(other, s)), m(redTex(other, -s))],
    steps: [T`Przy $90^\circ \pm \alpha$ funkcja zmienia się na kofunkcję, przy $180^\circ \pm \alpha$ – zostaje ta sama.`, T`Znak: dla ostrego $\alpha$ kąt leży w ćwiartce, w której funkcja z lewej strony ma znak ${s > 0 ? 'dodatni' : 'ujemny'}. Wynik: $${redTex(f, s)}$.`],
    trap: 'Znak bierzesz z funkcji PO LEWEJ stronie w odpowiedniej ćwiartce, a nie z funkcji po prawej.',
    tip: TIP_RED
  });
};

const VALUES_TO_DEC = [[150, 'sin', 0.5], [120, 'cos', -0.5], [210, 'sin', -0.5], [135, 'tg', -1], [225, 'tg', 1], [240, 'cos', -0.5], [300, 'cos', 0.5], [330, 'sin', -0.5], [315, 'tg', -1], [180, 'cos', -1]];

const reductionValue = (r) => {
  const [d, f, v] = r.pick(VALUES_TO_DEC);
  const k = r.pick([1, 2, 4, -2]);
  return num({
    title: 'Wartość funkcji kąta rozwartego',
    q: T`Oblicz wartość wyrażenia $${k === 1 ? '' : k === -1 ? '-' : k}${fnTex(f)} ${d}^\circ$. Wpisz liczbę.`,
    ans: k * v,
    steps: [
      T`Wzór redukcyjny: $${fnTex(f)} ${d}^\circ = ${valTex(v)}$ (kąt odniesienia i znak z ćwiartki).`,
      T`Wynik: $${k} \cdot (${valTex(v)}) = ${dec(k * v, 2)}$.`
    ],
    trap: 'Wartość dla kąta odniesienia to tylko moduł wyniku – znak ustal z ćwiartki.',
    tip: TIP_RED
  });
};

const reductionSimplify = (r) => {
  const [t1, t2] = pickTwo(r, REDUCTIONS);
  const c1 = r.pick([1, 2]);
  const c2 = r.pick([1, -1, 2]);
  const sinC = (t1[1] === 'sin' ? c1 * t1[2] : 0) + (t2[1] === 'sin' ? c2 * t2[2] : 0);
  const cosC = (t1[1] === 'cos' ? c1 * t1[2] : 0) + (t2[1] === 'cos' ? c2 * t2[2] : 0);
  const fmt = (sc, cc) => {
    const parts = [];
    if (sc) parts.push(`${sc === 1 ? '' : sc === -1 ? '-' : sc}\\sin\\alpha`);
    if (cc) parts.push(`${cc === 1 ? '' : cc === -1 ? '-' : cc}\\cos\\alpha`);
    return parts.length ? parts.join(' + ').replace('+ -', '- ') : '0';
  };
  const expr = `${c1 === 1 ? '' : c1}${t1[0]} ${c2 < 0 ? '-' : '+'} ${Math.abs(c2) === 1 ? '' : Math.abs(c2)}${t2[0]}`;
  const ok = fmt(sinC, cosC);
  return mc({
    title: 'Upraszczanie wyrażenia wzorami redukcyjnymi',
    q: T`Dla każdego kąta $\alpha$ wyrażenie $${expr}$ jest równe`,
    ok: m(ok),
    bad: [fmt(-sinC, cosC), fmt(sinC, -cosC), fmt(cosC, sinC), fmt(sinC + (sinC ? 0 : 1), cosC + (cosC ? 0 : 1)), '0'].filter((x) => x !== ok).map(m),
    steps: [T`$${t1[0]} = ${redTex(t1[1], t1[2])}$, $${t2[0]} = ${redTex(t2[1], t2[2])}$.`, T`Po podstawieniu i redukcji: $${ok}$.`],
    trap: 'Przy odejmowaniu wzoru z minusem pamiętaj o zmianie znaku: $-(-\\sin\\alpha) = \\sin\\alpha$.',
    tip: TIP_RED
  });
};

const reductionTruth = (r) => {
  const [a, b] = pickTwo(r, REDUCTIONS);
  const st = ([lhs, f, s]) => {
    const honest = r.bool();
    return [T`$${lhs} = ${redTex(f, honest ? s : -s)}$ dla każdego kąta $\alpha$.`, honest, honest ? 'Wzór redukcyjny z karty (str. 13).' : T`Poprawnie: $${lhs} = ${redTex(f, s)}$.`];
  };
  return pf({ title: 'Wzory redukcyjne – prawda czy fałsz', s1: st(a), s2: st(b), trap: 'Sprawdź wzór dla $\\alpha = 30^\\circ$ – od razu widać znak.', tip: TIP_RED });
};

const IDENTITY_PROOFS = [
  { lhs: '\\sin(180^\\circ - \\alpha)\\cos(90^\\circ - \\alpha) - \\cos(180^\\circ - \\alpha)\\sin(90^\\circ - \\alpha)', rhs: '1', mid: '\\sin\\alpha \\cdot \\sin\\alpha - (-\\cos\\alpha) \\cdot \\cos\\alpha', end: '\\sin^2\\alpha + \\cos^2\\alpha = 1' },
  { lhs: '\\sin(90^\\circ + \\alpha)\\cos(180^\\circ - \\alpha) + \\sin(180^\\circ + \\alpha)\\cos(90^\\circ - \\alpha)', rhs: '-1', mid: '\\cos\\alpha \\cdot (-\\cos\\alpha) + (-\\sin\\alpha) \\cdot \\sin\\alpha', end: '-(\\cos^2\\alpha + \\sin^2\\alpha) = -1' },
  { lhs: '\\sin^2(90^\\circ - \\alpha) + \\sin^2(180^\\circ + \\alpha)', rhs: '1', mid: '\\cos^2\\alpha + (-\\sin\\alpha)^2', end: '\\cos^2\\alpha + \\sin^2\\alpha = 1' },
  { lhs: '\\sin^2(180^\\circ - \\alpha) - \\cos^2(90^\\circ + \\alpha)', rhs: '0', mid: '\\sin^2\\alpha - (-\\sin\\alpha)^2', end: '\\sin^2\\alpha - \\sin^2\\alpha = 0' },
  { lhs: '\\cos(90^\\circ + \\alpha)\\sin(180^\\circ - \\alpha) + \\cos(180^\\circ + \\alpha)\\cos\\alpha', rhs: '-1', mid: '(-\\sin\\alpha) \\cdot \\sin\\alpha + (-\\cos\\alpha) \\cdot \\cos\\alpha', end: '-(\\sin^2\\alpha + \\cos^2\\alpha) = -1' }
];

const openReductionProof = (r) => {
  const p = r.pick(IDENTITY_PROOFS);
  return open({
    title: 'Dowód tożsamości ze wzorami redukcyjnymi',
    q: T`Wykaż, że dla każdego kąta $\alpha$ prawdziwa jest równość $${p.lhs} = ${p.rhs}$.`,
    stages: [
      [1, 'Etap 1', T`Zastosowanie wzorów redukcyjnych: lewa strona to $${p.mid}$.`],
      [2, 'Komplet', T`Uproszczenie z jedynką trygonometryczną: $${p.end}$ i wniosek.`]
    ],
    steps: [T`Ze wzorów redukcyjnych lewa strona jest równa $${p.mid}$.`, T`$= ${p.end}$, co kończy dowód.`],
    trap: 'Każdy wzór redukcyjny zapisz osobno – pomyłka w jednym znaku psuje cały dowód.',
    tip: TIP_RED,
    answer: m(`${p.lhs} = ${p.rhs}`),
    proof: true
  });
};

// ---------- 7.4 Suma, różnica i kąt podwojony ----------
const SUM_ANGLES = [
  [75, 'sin', '\\frac{\\sqrt{6} + \\sqrt{2}}{4}', '45^\\circ + 30^\\circ'],
  [15, 'sin', '\\frac{\\sqrt{6} - \\sqrt{2}}{4}', '45^\\circ - 30^\\circ'],
  [75, 'cos', '\\frac{\\sqrt{6} - \\sqrt{2}}{4}', '45^\\circ + 30^\\circ'],
  [15, 'cos', '\\frac{\\sqrt{6} + \\sqrt{2}}{4}', '45^\\circ - 30^\\circ'],
  [105, 'sin', '\\frac{\\sqrt{6} + \\sqrt{2}}{4}', '60^\\circ + 45^\\circ'],
  [105, 'cos', '\\frac{\\sqrt{2} - \\sqrt{6}}{4}', '60^\\circ + 45^\\circ']
];

const sumAngleValue = (r) => {
  const [d, f, ok, split] = r.pick(SUM_ANGLES);
  const all = ['\\frac{\\sqrt{6} + \\sqrt{2}}{4}', '\\frac{\\sqrt{6} - \\sqrt{2}}{4}', '\\frac{\\sqrt{2} - \\sqrt{6}}{4}', '\\frac{\\sqrt{3} + 1}{2}', '\\frac{\\sqrt{2}}{2}'];
  return mc({
    title: 'Wartość funkcji z wzoru na sumę kątów',
    q: T`Wartość $${fnTex(f)} ${d}^\circ$ jest równa`,
    ok: m(ok),
    val: FN[f](d),
    bad: all.filter((x) => x !== ok).map(m),
    steps: [T`$${d}^\circ = ${split}$.`, T`Ze wzoru na ${f === 'sin' ? 'sinus' : 'cosinus'} ${split.includes('+') ? 'sumy' : 'różnicy'} kątów: $${fnTex(f)} ${d}^\circ = ${ok}$.`],
    trap: T`$\sin(45^\circ + 30^\circ) \ne \sin 45^\circ + \sin 30^\circ$ – trzeba użyć wzoru z karty.`,
    tip: TIP_SUM
  });
};

const doubleAngleFromSin = (r) => {
  const [a, b, c] = r.pick(TRIPLES);
  const useSin = r.bool();
  const ask = r.pick(['sin2', 'cos2']);
  const s = useSin ? a : b;
  const co = useSin ? b : a;
  const ok = ask === 'sin2' ? fr(2 * s * co, c * c) : fr(co * co - s * s, c * c);
  return mc({
    title: 'Kąt podwojony z danej wartości funkcji',
    q: T`Kąt $\alpha$ jest ostry i $\sin\alpha = ${fr(s, c)}$. Wtedy $${ask === 'sin2' ? '\\sin 2\\alpha' : '\\cos 2\\alpha'}$ jest równy`,
    ok: m(ok),
    val: ask === 'sin2' ? (2 * s * co) / (c * c) : (co * co - s * s) / (c * c),
    bad: [fr(2 * s, c), fr(s * co, c * c), fr(s * s - co * co, c * c), fr(2 * s * co, c * c), fr(co * co - s * s, c * c), fr(2 * s * s, c * c)].filter((x) => x !== ok).map(m),
    steps: [
      T`Z jedynki trygonometrycznej: $\cos\alpha = \sqrt{1 - ${fr(s * s, c * c)}} = ${fr(co, c)}$ (kąt ostry – cosinus dodatni).`,
      ask === 'sin2' ? T`$\sin 2\alpha = 2 \cdot ${fr(s, c)} \cdot ${fr(co, c)} = ${ok}$.` : T`$\cos 2\alpha = \cos^2\alpha - \sin^2\alpha = ${fr(co * co, c * c)} - ${fr(s * s, c * c)} = ${ok}$.`
    ],
    trap: T`$\sin 2\alpha \ne 2\sin\alpha$ – brakuje czynnika $\cos\alpha$.`,
    tip: TIP_SUM
  });
};

const cosOfSum = (r) => {
  const [t1, t2] = pickTwo(r, TRIPLES);
  const [a1, b1, c1] = t1;
  const [a2, b2, c2] = t2;
  const plus = r.bool();
  const numer = plus ? b1 * b2 - a1 * a2 : b1 * b2 + a1 * a2;
  const ok = fr(numer, c1 * c2);
  return mc({
    title: 'Cosinus sumy lub różnicy kątów',
    q: T`Kąty $\alpha$ i $\beta$ są ostre, $\sin\alpha = ${fr(a1, c1)}$ oraz $\cos\beta = ${fr(b2, c2)}$. Wtedy $\cos(\alpha ${plus ? '+' : '-'} \beta)$ jest równy`,
    ok: m(ok),
    val: numer / (c1 * c2),
    bad: [fr(plus ? b1 * b2 + a1 * a2 : b1 * b2 - a1 * a2, c1 * c2), fr(a1 * b2 + b1 * a2, c1 * c2), fr(b1 * b2, c1 * c2), fr(a1 * b2 - b1 * a2, c1 * c2)].filter((x) => x !== ok).map(m),
    steps: [
      T`$\cos\alpha = ${fr(b1, c1)}$, $\sin\beta = ${fr(a2, c2)}$ (z jedynki, kąty ostre).`,
      T`$\cos(\alpha ${plus ? '+' : '-'} \beta) = \cos\alpha\cos\beta ${plus ? '-' : '+'} \sin\alpha\sin\beta = ${fr(b1 * b2, c1 * c2)} ${plus ? '-' : '+'} ${fr(a1 * a2, c1 * c2)} = ${ok}$.`
    ],
    trap: T`W cosinusie sumy jest MINUS: $\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$.`,
    tip: TIP_SUM
  });
};

const SUM_FACTS = [
  [T`$\sin(\alpha + \beta) = \sin\alpha + \sin\beta$ dla dowolnych kątów.`, false, T`Dla $\alpha = \beta = 45^\circ$: $\sin 90^\circ = 1 \ne \sqrt{2}$.`],
  [T`$\cos 2\alpha = 1 - 2\sin^2\alpha$ dla dowolnego kąta.`, true, T`$\cos^2\alpha - \sin^2\alpha = 1 - 2\sin^2\alpha$ z jedynki.`],
  [T`$\sin 2\alpha = 2\sin\alpha\cos\alpha$ dla dowolnego kąta.`, true, 'Wzór z karty (str. 13).'],
  [T`$\cos(\alpha - \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$.`, false, T`W różnicy jest plus: $\cos\alpha\cos\beta + \sin\alpha\sin\beta$.`],
  [T`$\sin 15^\circ = \frac{\sqrt{6} - \sqrt{2}}{4}$.`, true, T`$\sin(45^\circ - 30^\circ) = \frac{\sqrt{2}}{2} \cdot \frac{\sqrt{3}}{2} - \frac{\sqrt{2}}{2} \cdot \frac{1}{2}$.`]
];

const sumFacts = (r) => {
  const [s1, s2] = pickTwo(r, SUM_FACTS);
  return pf({ title: 'Wzory na sumę i kąt podwojony', s1, s2, trap: 'Funkcje trygonometryczne nie są liniowe – sumy kątów nie rozbijasz na sumy wartości.', tip: TIP_SUM });
};

const openDoubleAngle = (r) => {
  const [a, b, c] = r.pick(TRIPLES);
  const useSin = r.bool();
  const s = useSin ? a : b;
  const co = useSin ? b : a;
  const s2 = fr(2 * s * co, c * c);
  const c2 = fr(co * co - s * s, c * c);
  const res = fr(2 * s * co + co * co - s * s, c * c);
  return open({
    title: 'Suma sinusa i cosinusa kąta podwojonego',
    q: T`Kąt $\alpha$ jest ostry i $\sin\alpha = ${fr(s, c)}$. Oblicz wartość wyrażenia $\sin 2\alpha + \cos 2\alpha$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Obliczenie $\cos\alpha = ${fr(co, c)}$ z jedynki trygonometrycznej (kąt ostry).`],
      [2, 'Etap 2', T`Obliczenie $\sin 2\alpha = ${s2}$ oraz $\cos 2\alpha = ${c2}$.`],
      [3, 'Komplet', T`Obliczenie wartości wyrażenia: $${res}$.`]
    ],
    steps: [
      T`$\cos^2\alpha = 1 - ${fr(s * s, c * c)} = ${fr(co * co, c * c)}$, a kąt jest ostry, więc $\cos\alpha = ${fr(co, c)}$.`,
      T`$\sin 2\alpha = 2\sin\alpha\cos\alpha = ${s2}$; $\cos 2\alpha = \cos^2\alpha - \sin^2\alpha = ${c2}$.`,
      T`$\sin 2\alpha + \cos 2\alpha = ${res}$.`
    ],
    trap: 'Przy wyznaczaniu cosinusa z jedynki wybierz znak z założenia o kącie – dla kąta ostrego cosinus jest dodatni.',
    tip: TIP_SUM,
    answer: m(res)
  });
};

// ---------- 7.5 Tożsamości trygonometryczne ----------
const SIMPLIFY = [
  { tex: (k) => `${k === 1 ? '' : k}(\\sin\\alpha + \\cos\\alpha)^2 - ${k === 1 ? '' : k}\\sin 2\\alpha`, res: (k) => `${k}`, wrong: (k) => [`${k}\\sin 2\\alpha`, `${2 * k}`, '0'] },
  { tex: (k) => `${k === 1 ? '' : k}(\\cos^2\\alpha - \\sin^2\\alpha)`, res: (k) => `${k === 1 ? '' : k}\\cos 2\\alpha`, wrong: (k) => [`${k === 1 ? '' : k}\\sin 2\\alpha`, `${k}`, `${k === 1 ? '' : k}\\cos^2\\alpha`] },
  { tex: (k) => `${2 * k}\\sin\\alpha\\cos\\alpha`, res: (k) => `${k === 1 ? '' : k}\\sin 2\\alpha`, wrong: (k) => [`${2 * k === 1 ? '' : 2 * k}\\sin 2\\alpha`, `${k === 1 ? '' : k}\\cos 2\\alpha`, `${2 * k}`] },
  { tex: (k) => `${k === 1 ? '' : k}(1 - 2\\sin^2\\alpha)`, res: (k) => `${k === 1 ? '' : k}\\cos 2\\alpha`, wrong: (k) => [`${k === 1 ? '' : k}\\sin 2\\alpha`, `${k === 1 ? '' : k}\\cos^2\\alpha`, `${k}`] },
  { tex: (k) => `${k === 1 ? '' : k}(\\sin\\alpha - \\cos\\alpha)^2 + ${k === 1 ? '' : k}\\sin 2\\alpha`, res: (k) => `${k}`, wrong: (k) => [`${-k}`, `${k === 1 ? '' : k}\\sin 2\\alpha`, '0'] }
];

const simplifyIdentity = (r) => {
  const e = r.pick(SIMPLIFY);
  const k = r.int(1, 4);
  return mc({
    title: 'Upraszczanie wyrażenia trygonometrycznego',
    q: T`Dla każdego kąta $\alpha$ wyrażenie $${e.tex(k)}$ jest równe`,
    ok: m(e.res(k)),
    bad: e.wrong(k).map(m),
    steps: [T`Korzystamy z $\sin^2\alpha + \cos^2\alpha = 1$ oraz wzorów na kąt podwojony.`, T`Wynik: $${e.res(k)}$.`],
    trap: T`$(\sin\alpha + \cos\alpha)^2 = 1 + \sin 2\alpha$, a nie $1$ – środkowy wyraz $2\sin\alpha\cos\alpha$ nie znika.`,
    tip: TIP_ID
  });
};

const ratioFromTangent = (r) => {
  const t = r.pick([2, 3, 5, 9, -3, 0.5, 1.5]);
  const val = (t + 1) / (t - 1);
  return num({
    title: 'Wyrażenie z sinusem i cosinusem przez tangens',
    q: T`Wiadomo, że $\operatorname{tg}\alpha = ${dec(t, 2)}$. Oblicz $\frac{\sin\alpha + \cos\alpha}{\sin\alpha - \cos\alpha}$. Wpisz liczbę.`,
    ans: val,
    steps: [T`Dzielimy licznik i mianownik przez $\cos\alpha \ne 0$: $\frac{\operatorname{tg}\alpha + 1}{\operatorname{tg}\alpha - 1}$.`, T`$\frac{${dec(t, 2)} + 1}{${dec(t, 2)} - 1} = ${dec(val, 2)}$.`],
    trap: 'Nie musisz liczyć osobno sinusa i cosinusa – podzielenie przez $\\cos\\alpha$ zamienia wszystko na tangens.',
    tip: TIP_ID
  });
};

const productFromSum = (r) => {
  const s = r.pick([[1, 2], [1, 3], [4, 3], [1, 4], [5, 4], [2, 3]]);
  const [n, d] = s;
  const numer = n * n - d * d;
  const ok = fr(numer, 2 * d * d);
  return mc({
    title: 'Iloczyn sinusa i cosinusa z ich sumy',
    q: T`Wiadomo, że $\sin\alpha + \cos\alpha = ${fr(n, d)}$. Wtedy $\sin\alpha\cos\alpha$ jest równy`,
    ok: m(ok),
    val: numer / (2 * d * d),
    bad: [fr(numer, d * d), fr(n * n, 2 * d * d), fr(-numer, 2 * d * d), fr(n * n + d * d, 2 * d * d)].filter((x) => x !== ok).map(m),
    steps: [T`Podnosimy do kwadratu: $\sin^2\alpha + 2\sin\alpha\cos\alpha + \cos^2\alpha = ${fr(n * n, d * d)}$.`, T`$1 + 2\sin\alpha\cos\alpha = ${fr(n * n, d * d)}$, więc $\sin\alpha\cos\alpha = ${ok}$.`],
    trap: 'Po podniesieniu do kwadratu suma kwadratów zamienia się w $1$ – zostaje tylko podwojony iloczyn.',
    tip: TIP_ID
  });
};

const IDENTITY_FACTS = [
  [T`$(\sin\alpha + \cos\alpha)^2 = 1 + \sin 2\alpha$.`, true, T`$\sin^2\alpha + \cos^2\alpha + 2\sin\alpha\cos\alpha$.`],
  [T`$\cos^4\alpha - \sin^4\alpha = \cos 2\alpha$.`, true, T`$(\cos^2\alpha - \sin^2\alpha)(\cos^2\alpha + \sin^2\alpha)$.`],
  [T`$\sin^2\alpha - \cos^2\alpha = \cos 2\alpha$.`, false, T`$\cos 2\alpha = \cos^2\alpha - \sin^2\alpha$ – kolejność jest odwrotna.`],
  [T`$\frac{\sin 2\alpha}{1 + \cos 2\alpha} = \operatorname{tg}\alpha$ dla $\cos\alpha \ne 0$.`, true, T`$\frac{2\sin\alpha\cos\alpha}{2\cos^2\alpha}$.`],
  [T`$\sin^2 2\alpha = 2\sin^2\alpha$.`, false, T`$\sin^2 2\alpha = 4\sin^2\alpha\cos^2\alpha$.`]
];

const identityFacts = (r) => {
  const [s1, s2] = pickTwo(r, IDENTITY_FACTS);
  const intro = 'Dla każdego kąta $\\alpha$ (dla którego wyrażenia mają sens) zachodzi równość ';
  return pf({ title: 'Tożsamości trygonometryczne', s1: [intro + s1[0], s1[1], s1[2]], s2: [intro + s2[0], s2[1], s2[2]], trap: 'Tożsamość sprawdzisz szybko dla $\\alpha = 30^\\circ$ – fałszywa zwykle od razu się rozsypuje.', tip: TIP_ID });
};

const TRIG_IDENTITIES = [
  { lhs: '(\\sin\\alpha + \\cos\\alpha)^2 + (\\sin\\alpha - \\cos\\alpha)^2', rhs: '2', s1: '(1 + 2\\sin\\alpha\\cos\\alpha) + (1 - 2\\sin\\alpha\\cos\\alpha)', s2: '2' },
  { lhs: '(\\sin\\alpha + \\cos\\alpha)^2 - (\\sin\\alpha - \\cos\\alpha)^2', rhs: '2\\sin 2\\alpha', s1: '4\\sin\\alpha\\cos\\alpha', s2: '2 \\cdot 2\\sin\\alpha\\cos\\alpha = 2\\sin 2\\alpha' },
  { lhs: '\\cos^4\\alpha - \\sin^4\\alpha', rhs: '\\cos 2\\alpha', s1: '(\\cos^2\\alpha - \\sin^2\\alpha)(\\cos^2\\alpha + \\sin^2\\alpha)', s2: '(\\cos^2\\alpha - \\sin^2\\alpha) \\cdot 1 = \\cos 2\\alpha' },
  { lhs: '\\frac{\\sin 2\\alpha}{1 + \\cos 2\\alpha}', rhs: '\\operatorname{tg}\\alpha', s1: '\\frac{2\\sin\\alpha\\cos\\alpha}{1 + 2\\cos^2\\alpha - 1}', s2: '\\frac{2\\sin\\alpha\\cos\\alpha}{2\\cos^2\\alpha} = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\operatorname{tg}\\alpha', cond: 'dla każdego kąta $\\alpha$, dla którego $\\cos\\alpha \\ne 0$' },
  { lhs: '\\frac{1 - \\cos 2\\alpha}{\\sin 2\\alpha}', rhs: '\\operatorname{tg}\\alpha', s1: '\\frac{1 - (1 - 2\\sin^2\\alpha)}{2\\sin\\alpha\\cos\\alpha}', s2: '\\frac{2\\sin^2\\alpha}{2\\sin\\alpha\\cos\\alpha} = \\operatorname{tg}\\alpha', cond: 'dla każdego kąta $\\alpha$, dla którego $\\sin 2\\alpha \\ne 0$' },
  { lhs: '\\sin^3\\alpha + \\sin\\alpha\\cos^2\\alpha', rhs: '\\sin\\alpha', s1: '\\sin\\alpha(\\sin^2\\alpha + \\cos^2\\alpha)', s2: '\\sin\\alpha \\cdot 1 = \\sin\\alpha' }
];

const openTrigIdentity = (r) => {
  const p = r.pick(TRIG_IDENTITIES);
  return open({
    title: 'Dowód tożsamości trygonometrycznej',
    q: T`Wykaż, że ${p.cond || 'dla każdego kąta $\\alpha$'} prawdziwa jest równość $${p.lhs} = ${p.rhs}$.`,
    stages: [
      [1, 'Etap 1', T`Zastosowanie wzorów (rozwinięcie, kąt podwojony, wyłączenie przed nawias): $${p.s1}$.`],
      [2, 'Etap 2', 'Użycie jedynki trygonometrycznej albo uproszczenie ułamka.'],
      [3, 'Komplet', T`Otrzymanie prawej strony: $${p.s2}$ i wniosek.`]
    ],
    steps: [T`Przekształcamy lewą stronę: $${p.lhs} = ${p.s1}$.`, T`$= ${p.s2}$, co należało wykazać.`],
    trap: 'Przekształcaj tylko jedną stronę. „Przenoszenie” wyrazów między stronami tożsamości nie jest dowodem.',
    tip: TIP_ID,
    answer: m(`${p.lhs} = ${p.rhs}`),
    proof: true
  });
};

export default {
  numericId: 7,
  title: 'Trygonometria: funkcje i wzory',
  short_title: 'Funkcje trygonometryczne',
  description: 'Miara łukowa, wykresy i okresowość, wzory redukcyjne, wzory na sumę i różnicę kątów, kąt podwojony i tożsamości.',
  icon: 'TriangleRight',
  color: '#FFB800',
  matura_points_range: '1–3 pkt',
  importance: 'HIGH',
  cke_formula_page: 'str. 11–13',
  cke_stats: 'Narzędzia dla równań trygonometrycznych (11 z 11 arkuszy) i planimetrii; samodzielnie średnio 0,7 pkt na arkusz.',
  lessons: [
    {
      title: 'Miara łukowa i koło trygonometryczne',
      short_title: 'Miara łukowa',
      requirements: ['VII.R1'],
      prereq: ['math-lesson-8-4'],
      pill: pill({
        essence: T`Na rozszerzeniu kąty mierzysz także w radianach: $180^\circ = \pi$. Kąt $\frac{\pi}{6}$ to $30^\circ$, $\frac{\pi}{2}$ to $90^\circ$, $2\pi$ to pełny obrót. Wartości funkcji dla dowolnego kąta odczytujesz z kąta odniesienia (ostrego) i znaku w ćwiartce.`,
        context: 'Miara łukowa (VII.R1) jest w każdym zadaniu z równaniem trygonometrycznym – CKE podaje przedziały i odpowiedzi w radianach.',
        pl: T`Radian to „ile promieni zmieści się na łuku”. Półokrąg ma długość $\pi r$, więc mieści $\pi \approx 3{,}14$ promienia – stąd $180^\circ = \pi$. Przelicznik zawsze ten sam: zamieniasz $\pi$ na $180^\circ$ albo odwrotnie.`,
        steps: [
          ['Stopnie na radiany', T`Pomnóż przez $\frac{\pi}{180}$.`, 'Skróć ułamek.'],
          ['Ćwiartka', T`I: wszystkie dodatnie, II: sinus, III: tangens, IV: cosinus.`, 'Znak funkcji.'],
          ['Kąt odniesienia', T`Odległość od osi $Ox$: $180^\circ - \alpha$, $\alpha - 180^\circ$, $360^\circ - \alpha$.`, 'Wartość z tabeli.']
        ],
        formulas: [
          ['Przelicznik', T`180^\circ = \pi \ \text{rad}`, 11],
          ['Definicje funkcji', T`\sin\alpha = \frac{y}{r}, \ \cos\alpha = \frac{x}{r}, \ \operatorname{tg}\alpha = \frac{y}{x}`, 11],
          ['Tabela', T`\sin\frac{\pi}{6} = \frac{1}{2}, \ \sin\frac{\pi}{4} = \frac{\sqrt{2}}{2}, \ \sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}`, 12]
        ],
        examples: [
          ['Zamiana', '1 pkt', T`Zamień $225^\circ$ na radiany.`, T`1. $225 \cdot \frac{\pi}{180} = \frac{5\pi}{4}$.` + '\n' + T`2. Odpowiedź: $\frac{5\pi}{4}$.`, 'Skracasz 225/180 przez 45.'],
          ['Wartość', '1 pkt', T`Oblicz $\cos \frac{5\pi}{6}$.`, T`1. $\frac{5\pi}{6} = 150^\circ$ – II ćwiartka, cosinus ujemny.` + '\n' + T`2. $\cos 150^\circ = -\cos 30^\circ = -\frac{\sqrt{3}}{2}$.`, 'Kąt odniesienia 30°.']
        ],
        trap: T`$\sin \frac{7\pi}{6}$ to nie $\frac{1}{2}$ – kąt $210^\circ$ leży w III ćwiartce, gdzie sinus jest ujemny.`,
        fail: T`„$\sin 210^\circ = \sin 30^\circ = \frac{1}{2}$.”`,
        win: T`$\sin 210^\circ = -\sin 30^\circ = -\frac{1}{2}$.`,
        why: 'Kąt odniesienia daje wartość, ale znak zależy od ćwiartki.',
        ckeTip: 'Odpowiedzi w równaniach trygonometrycznych podawaj w tej samej mierze co przedział z treści – zwykle w radianach.',
        points: ['180° = π.', 'Najpierw ćwiartka i znak.', 'Wartość z kąta odniesienia.']
      }),
      gens: [degToRad, radToDeg, radianValue, radianFacts, openRadianExpression]
    },
    {
      title: 'Wykresy i okresowość funkcji trygonometrycznych',
      short_title: 'Wykresy i okresowość',
      requirements: ['VII.R2', 'VII.R3'],
      prereq: ['math-lesson-4-3'],
      pill: pill({
        essence: T`Sinus i cosinus mają okres $2\pi$ i wartości od $-1$ do $1$; tangens ma okres $\pi$ i nie istnieje dla $x = \frac{\pi}{2} + k\pi$. Funkcja $f(kx)$ ma okres $k$ razy krótszy. Okresowość pozwala sprowadzić duży kąt do kąta z przedziału $\langle 0, 2\pi)$.`,
        context: 'Wykresy i okresowość (VII.R2, VII.R3) to podstawa liczenia rozwiązań równań trygonometrycznych w przedziale.',
        pl: T`Sinus to fala, która powtarza się co $2\pi$ – jak koło roweru, które po pełnym obrocie wraca do tej samej pozycji. $\sin(2x)$ kręci się dwa razy szybciej, więc fala powtarza się co $\pi$.`,
        steps: [
          ['Okres', T`$2\pi$ dla sin, cos; $\pi$ dla tg.`, 'f(kx): podziel przez k.'],
          ['Zbiór wartości', T`$\langle -1, 1 \rangle$ dla sin, cos.`, 'a·sin x + b: od b − |a| do b + |a|.'],
          ['Redukcja kąta', T`Odejmij pełne okresy.`, 'Potem ćwiartka.']
        ],
        formulas: [
          ['Okresowość', T`\sin(\alpha + k \cdot 360^\circ) = \sin\alpha, \ \cos(\alpha + k \cdot 360^\circ) = \cos\alpha`, 13],
          ['Okres tangensa', T`\operatorname{tg}(\alpha + k \cdot 180^\circ) = \operatorname{tg}\alpha`, 14],
          ['Wykresy', T`y = \sin x, \ y = \cos x, \ y = \operatorname{tg} x`, 11]
        ],
        examples: [
          ['Okres', '1 pkt', T`Jaki jest okres funkcji $f(x) = \cos 3x$?`, T`1. Okres cosinusa: $2\pi$.` + '\n' + T`2. Dla $\cos 3x$: $\frac{2\pi}{3}$.`, 'Argument razy 3 – okres trzy razy krótszy.'],
          ['Duży kąt', '1 pkt', T`Oblicz $\sin \frac{13\pi}{6}$.`, T`1. $\frac{13\pi}{6} = 2\pi + \frac{\pi}{6}$.` + '\n' + T`2. $\sin \frac{\pi}{6} = \frac{1}{2}$.`, 'Pełny okres można pominąć.']
        ],
        trap: T`Tangens ma okres $\pi$, a nie $2\pi$ – w rozwiązaniach równania $\operatorname{tg} x = a$ dodajesz $k\pi$.`,
        fail: T`„$\operatorname{tg} x = 1$, więc $x = \frac{\pi}{4} + 2k\pi$.”`,
        win: T`$x = \frac{\pi}{4} + k\pi$.`,
        why: 'Gubisz połowę rozwiązań, np. $\\frac{5\\pi}{4}$.',
        ckeTip: 'W zadaniach z przedziałem narysuj szkic wykresu – łatwiej policzyć punkty przecięcia.',
        points: ['Okres sin i cos: 2π, tg: π.', 'f(kx): okres dzielony przez k.', 'Zbiór wartości sin i cos: ⟨−1, 1⟩.']
      }),
      gens: [periodOf, valueRange, periodicReduction, graphFacts, openRangeAndValue]
    },
    {
      title: 'Wzory redukcyjne',
      short_title: 'Wzory redukcyjne',
      requirements: ['VII.R4'],
      prereq: ['math-lesson-8-4'],
      pill: pill({
        essence: T`Wzory redukcyjne zamieniają funkcję kąta $90^\circ \pm \alpha$ albo $180^\circ \pm \alpha$ na funkcję kąta $\alpha$. Zasada: przy $90^\circ$ funkcja zmienia się na kofunkcję (sinus na cosinus), przy $180^\circ$ zostaje ta sama. Znak bierzesz z ćwiartki, w której leży kąt (dla ostrego $\alpha$).`,
        context: 'Wzory redukcyjne (VII.R4) są na karcie (str. 13) – przydają się w równaniach i w planimetrii (kąty rozwarte w trójkątach).',
        pl: T`$\cos(180^\circ - \alpha)$: kąt leży w II ćwiartce, gdzie cosinus jest ujemny, a przy $180^\circ$ funkcja się nie zmienia. Wynik: $-\cos\alpha$. Dwa pytania – „jaka funkcja?” i „jaki znak?” – i gotowe.`,
        steps: [
          ['Jaka funkcja', T`$90^\circ$ – kofunkcja, $180^\circ$ – ta sama.`, 'sin ↔ cos.'],
          ['Jaki znak', T`Ćwiartka kąta dla ostrego $\alpha$.`, 'Znak funkcji z lewej strony.'],
          ['Zapisz', T`Np. $\sin(90^\circ + \alpha) = \cos\alpha$.`, 'Sprawdź dla α = 30°.']
        ],
        formulas: [
          ['Wokół 90°', T`\sin(90^\circ \pm \alpha) = \cos\alpha, \ \cos(90^\circ \pm \alpha) = \mp\sin\alpha`, 13],
          ['Wokół 180°', T`\sin(180^\circ \pm \alpha) = \mp\sin\alpha, \ \cos(180^\circ \pm \alpha) = -\cos\alpha`, 13],
          ['Tangens', T`\operatorname{tg}(180^\circ - \alpha) = -\operatorname{tg}\alpha`, 13]
        ],
        examples: [
          ['Wartość', '1 pkt', T`Oblicz $\cos 150^\circ$.`, T`1. $\cos(180^\circ - 30^\circ) = -\cos 30^\circ$.` + '\n' + T`2. $= -\frac{\sqrt{3}}{2}$.`, 'Kąt rozwarty – cosinus ujemny.'],
          ['Upraszczanie', '1 pkt', T`Uprość $\sin(180^\circ - \alpha) + \cos(90^\circ + \alpha)$.`, T`1. $\sin\alpha + (-\sin\alpha)$.` + '\n' + T`2. $= 0$.`, 'Każdy wzór osobno.']
        ],
        trap: T`$\sin(180^\circ - \alpha) = \sin\alpha$, ale $\cos(180^\circ - \alpha) = -\cos\alpha$ – nie wszystkie wzory mają ten sam znak.`,
        fail: T`„$\cos(180^\circ - \alpha) = \cos\alpha$.”`,
        win: T`$\cos(180^\circ - \alpha) = -\cos\alpha$.`,
        why: 'Kąt $180^\\circ - \\alpha$ jest w II ćwiartce, gdzie cosinus jest ujemny.',
        ckeTip: 'Wzory redukcyjne masz na karcie – nie ucz się ich na pamięć, naucz się szybko je tam znajdować.',
        points: ['90° – kofunkcja, 180° – ta sama funkcja.', 'Znak z ćwiartki.', 'Sprawdź na α = 30°.']
      }),
      gens: [reductionChoice, reductionValue, reductionSimplify, reductionTruth, openReductionProof]
    },
    {
      title: 'Suma, różnica i kąt podwojony',
      short_title: 'Wzory na sumę kątów',
      requirements: ['VII.R5'],
      prereq: ['math-lesson-8-3'],
      pill: pill({
        essence: T`Funkcji sumy kątów nie rozbijasz na sumę funkcji – używasz wzorów z karty: $\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta$ i $\cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta$. Szczególny przypadek to kąt podwojony: $\sin 2\alpha = 2\sin\alpha\cos\alpha$, $\cos 2\alpha = \cos^2\alpha - \sin^2\alpha$.`,
        context: 'Wzory na sumę i kąt podwojony (VII.R5) były w 3 zadaniach CKE 2022–2026 wprost i w wielu równaniach trygonometrycznych.',
        pl: T`$\sin 75^\circ$ nie ma w tabeli, ale $75^\circ = 45^\circ + 30^\circ$, a te kąty znasz. Wzór na sinus sumy składa wynik z czterech znanych wartości.`,
        steps: [
          ['Rozbij kąt', T`Na sumę lub różnicę znanych kątów.`, 'Np. 15° = 45° − 30°.'],
          ['Wybierz wzór', T`Sinus „miesza”, cosinus „trzyma pary”.`, 'W cosinusie sumy jest minus.'],
          ['Brakująca funkcja', T`Z jedynki – znak z ćwiartki.`, 'Kąt ostry: obie dodatnie.']
        ],
        formulas: [
          ['Sinus sumy', T`\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta`, 12],
          ['Cosinus sumy', T`\cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta`, 12],
          ['Kąt podwojony', T`\sin 2\alpha = 2\sin\alpha\cos\alpha, \ \cos 2\alpha = 1 - 2\sin^2\alpha`, 13]
        ],
        examples: [
          ['Kąt 15°', '1 pkt', T`Oblicz $\cos 15^\circ$.`, T`1. $\cos(45^\circ - 30^\circ) = \cos 45^\circ\cos 30^\circ + \sin 45^\circ\sin 30^\circ$.` + '\n' + T`2. $= \frac{\sqrt{6} + \sqrt{2}}{4}$.`, 'W różnicy kątów cosinus ma plus.'],
          ['Kąt podwojony', '2 pkt', T`Kąt ostry, $\sin\alpha = \frac{3}{5}$. Oblicz $\sin 2\alpha$.`, T`1. $\cos\alpha = \frac{4}{5}$.` + '\n' + T`2. $\sin 2\alpha = 2 \cdot \frac{3}{5} \cdot \frac{4}{5} = \frac{24}{25}$.`, 'Potrzebny jest też cosinus.']
        ],
        trap: T`$\sin 2\alpha \ne 2\sin\alpha$. Dla $\alpha = 30^\circ$: $\sin 60^\circ = \frac{\sqrt{3}}{2}$, a $2\sin 30^\circ = 1$.`,
        fail: T`„$\sin\alpha = \frac{3}{5}$, więc $\sin 2\alpha = \frac{6}{5}$.”`,
        win: T`$\sin 2\alpha = 2\sin\alpha\cos\alpha = \frac{24}{25}$.`,
        why: 'Sinus nie może być większy od 1 – to od razu sygnał błędu.',
        ckeTip: 'Wyznaczając cosinus z jedynki, napisz, dlaczego wybierasz znak (np. „kąt ostry, więc cos α > 0”).',
        points: ['Rozbij kąt na znane.', 'Cosinus sumy: minus.', 'Kąt podwojony: potrzebne sin i cos.']
      }),
      gens: [sumAngleValue, doubleAngleFromSin, cosOfSum, sumFacts, openDoubleAngle]
    },
    {
      title: 'Tożsamości trygonometryczne i dowody',
      short_title: 'Tożsamości',
      requirements: ['VII.R5', 'VII.2'],
      prereq: ['math-lesson-8-3'],
      pill: pill({
        essence: T`Tożsamość trygonometryczną dowodzisz, przekształcając jedną stronę (zwykle bardziej złożoną), aż dostaniesz drugą. Główne narzędzia: jedynka $\sin^2\alpha + \cos^2\alpha = 1$, wzory na kąt podwojony i wzory skróconego mnożenia. Przy ułamkach zapisz, dla jakich kątów mianownik jest różny od zera.`,
        context: 'Tożsamości trygonometryczne to typ dowodu na rozszerzeniu (wymaganie IV – rozumowanie); pojawiają się też jako krok w równaniach.',
        pl: T`$(\sin\alpha + \cos\alpha)^2$ to zwykły kwadrat sumy: $\sin^2\alpha + 2\sin\alpha\cos\alpha + \cos^2\alpha$. Kwadraty sklejają się w jedynkę, a środek to $\sin 2\alpha$. Wynik: $1 + \sin 2\alpha$.`,
        steps: [
          ['Wybierz stronę', T`Przekształcaj tę bardziej złożoną.`, 'Druga zostaje bez zmian.'],
          ['Narzędzia', T`Jedynka, kąt podwojony, wzory skróconego mnożenia.`, 'Wyłączanie przed nawias.'],
          ['Wniosek', T`„Lewa strona równa się prawej”.`, 'Plus założenia o mianownikach.']
        ],
        formulas: [
          ['Jedynka', T`\sin^2\alpha + \cos^2\alpha = 1`, 12],
          ['Kąt podwojony', T`\sin 2\alpha = 2\sin\alpha\cos\alpha, \ \cos 2\alpha = 2\cos^2\alpha - 1`, 13],
          ['Tangens', T`\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}`, 12]
        ],
        examples: [
          ['Kwadraty', '2 pkt', T`Wykaż, że $(\sin\alpha + \cos\alpha)^2 + (\sin\alpha - \cos\alpha)^2 = 2$.`, T`1. $(1 + 2\sin\alpha\cos\alpha) + (1 - 2\sin\alpha\cos\alpha)$.` + '\n' + T`2. $= 2$.`, 'Iloczyny się znoszą.'],
          ['Ułamek', '2 pkt', T`Wykaż, że $\frac{\sin 2\alpha}{1 + \cos 2\alpha} = \operatorname{tg}\alpha$.`, T`1. $\frac{2\sin\alpha\cos\alpha}{2\cos^2\alpha}$.` + '\n' + T`2. $= \frac{\sin\alpha}{\cos\alpha} = \operatorname{tg}\alpha$.`, 'Wybierz postać cos 2α, która skróci mianownik.']
        ],
        trap: 'Nie „mnóż na krzyż” i nie przenoś wyrazów między stronami tożsamości – to zakłada tezę, zamiast ją udowodnić.',
        fail: T`„Mnożę obie strony przez $1 + \cos 2\alpha$ i sprawdzam, że wyszło to samo.”`,
        win: 'Przekształcam tylko lewą stronę, aż otrzymam prawą.',
        why: 'Operacje na całej równości zakładają, że jest ona prawdziwa.',
        ckeTip: 'Przy tożsamościach z ułamkiem dopisz warunek (np. $\\cos\\alpha \\ne 0$) – egzaminator to sprawdza.',
        points: ['Przekształcaj jedną stronę.', 'Jedynka i kąt podwojony.', 'Warunki dla mianowników.']
      }),
      gens: [simplifyIdentity, ratioFromTangent, productFromSum, identityFacts, openTrigIdentity]
    }
  ]
};
