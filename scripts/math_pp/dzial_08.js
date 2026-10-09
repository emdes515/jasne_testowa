import { T, mc, num, pf, pill, fr, par, sq, m, need, gcd, isSquare } from './lib.js';

const TIP_DEF = 'Karta wzorów, str. 10: $\\sin\\alpha = \\frac{a}{c}$, $\\cos\\alpha = \\frac{b}{c}$, $\\operatorname{tg}\\alpha = \\frac{a}{b}$ ($a$ – przyprostokątna naprzeciw kąta, $b$ – przy kącie, $c$ – przeciwprostokątna).';
const TIP_ONE = 'Karta wzorów, str. 11: $\\sin^2\\alpha + \\cos^2\\alpha = 1$ oraz $\\operatorname{tg}\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}$.';
const TIP_TAB = 'Karta wzorów, str. 12: tabela wartości funkcji trygonometrycznych dla kątów $30^\\circ$, $45^\\circ$, $60^\\circ$.';
const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
const deg = (x) => `${x}^\\circ`;
const tg = T`\operatorname{tg}`;
/** a*sqrt(n)/d w najprostszej postaci */
const rootFrac = (a, n, d) => {
  // wyłącz kwadraty z n
  let out = 1;
  let inn = n;
  for (let k = Math.floor(Math.sqrt(n)); k >= 2; k--) if (inn % (k * k) === 0) { out *= k; inn /= k * k; k = Math.floor(Math.sqrt(inn)) + 1; }
  let num0 = a * out;
  const g = gcd(num0, d);
  num0 /= g;
  const den = d / g;
  const top = inn === 1 ? `${Math.abs(num0)}` : `${Math.abs(num0) === 1 ? '' : Math.abs(num0)}\\sqrt{${inn}}`;
  return `${num0 < 0 ? '-' : ''}${den === 1 ? top : `\\frac{${top}}{${den}}`}`;
};

// ---------- 8.1 Definicje w trójkącie prostokątnym ----------
const defFromSides = (r) => {
  const [a0, b0, c0] = r.pick(TRIPLES.slice(0, 4));
  const k = r.pick([1, 1, 2, 3]);
  const [a, b, c] = [a0 * k, b0 * k, c0 * k];
  const oppA = r.bool();
  const [opp, adj] = oppA ? [a, b] : [b, a];
  const fn = r.pick(['sin', 'cos', 'tg']);
  const val = { sin: [opp, c], cos: [adj, c], tg: [opp, adj] }[fn];
  const name = fn === 'tg' ? tg : `\\${fn}`;
  return mc({
    title: 'Funkcje trygonometryczne z długości boków',
    q: T`W trójkącie prostokątnym przyprostokątne mają długości $${a}$ i $${b}$, a przeciwprostokątna ma długość $${c}$. Kąt $\alpha$ leży naprzeciwko przyprostokątnej o długości $${opp}$. Wtedy $${name}\alpha$ jest równy`,
    ok: m(fr(val[0], val[1])),
    val: val[0] / val[1],
    bad: [m(fr(opp, c)), m(fr(adj, c)), m(fr(opp, adj)), m(fr(adj, opp)), m(fr(c, opp))],
    steps: [T`Względem kąta $\alpha$: przyprostokątna naprzeciw ma długość $${opp}$, przyprostokątna przyległa $${adj}$, przeciwprostokątna $${c}$.`, T`$${name}\alpha = \frac{${fn === 'cos' ? adj : opp}}{${fn === 'tg' ? adj : c}} = ${fr(val[0], val[1])}$.`],
    trap: T`Najpierw ustal, który bok leży NAPRZECIW kąta, a który PRZY kącie. Zamiana tych boków zamienia sinus z cosinusem.`,
    tip: TIP_DEF
  });
};
const defFindLeg = (r) => {
  const [a0, b0, c0] = r.pick(TRIPLES.slice(0, 4));
  const k = r.int(1, 4);
  const c = c0 * k;
  const useSin = r.bool();
  const leg = a0 * k;
  return mc({
    title: 'Długość boku z funkcji trygonometrycznej',
    q: T`W trójkącie prostokątnym przeciwprostokątna ma długość $${c}$, a kąt ostry $\alpha$ spełnia warunek $${useSin ? '\\sin' : '\\cos'}\alpha = ${fr(a0, c0)}$. Przyprostokątna ${useSin ? 'leżąca naprzeciwko kąta' : 'przyległa do kąta'} $\alpha$ ma długość`,
    ok: m(leg),
    val: leg,
    bad: [m(b0 * k), m(fr(c * c0, a0)), m(a0), m(leg + k), m(c - leg === b0 * k ? c - leg + 1 : c - leg)],
    steps: [T`Z definicji: $${useSin ? '\\sin' : '\\cos'}\alpha = \frac{x}{${c}}$, gdzie $x$ to szukana przyprostokątna.`, T`$\frac{x}{${c}} = ${fr(a0, c0)}$, więc $x = ${c} \cdot ${fr(a0, c0)} = ${leg}$.`],
    trap: T`${useSin ? 'Sinus' : 'Cosinus'} to stosunek przyprostokątnej ${useSin ? 'przeciwległej' : 'przyległej'} do przeciwprostokątnej – mnożymy przeciwprostokątną przez wartość funkcji, a nie dzielimy.`,
    tip: TIP_DEF
  });
};
const defTangentLeg = (r) => {
  const p = r.int(1, 5);
  const q = r.intNot(1, 6, p);
  need(gcd(p, q) === 1);
  const k = r.int(2, 6);
  const adj = q * k;
  const opp = p * k;
  const askOpp = r.bool();
  return mc({
    title: 'Tangens i przyprostokątne',
    q: askOpp
      ? T`W trójkącie prostokątnym kąt ostry $\alpha$ spełnia warunek $${tg}\alpha = ${fr(p, q)}$, a przyprostokątna przyległa do kąta $\alpha$ ma długość $${adj}$. Przyprostokątna leżąca naprzeciwko kąta $\alpha$ ma długość`
      : T`W trójkącie prostokątnym kąt ostry $\alpha$ spełnia warunek $${tg}\alpha = ${fr(p, q)}$, a przyprostokątna leżąca naprzeciwko kąta $\alpha$ ma długość $${opp}$. Przyprostokątna przyległa do kąta $\alpha$ ma długość`,
    ok: m(askOpp ? opp : adj),
    val: askOpp ? opp : adj,
    bad: askOpp ? [m(fr(adj * q, p)), m(adj + p), m(opp + k), m(adj)] : [m(fr(opp * p, q)), m(opp + q), m(adj + k), m(opp)],
    steps: [T`$${tg}\alpha = \frac{\text{naprzeciw}}{\text{przy kącie}}$, czyli $\frac{${askOpp ? 'x' : opp}}{${askOpp ? adj : 'x'}} = ${fr(p, q)}$.`, askOpp ? T`$x = ${adj} \cdot ${fr(p, q)} = ${opp}$.` : T`$${p === 1 ? '' : p}x = ${opp * q}$${p === 1 ? '' : `, więc $x = ${adj}$`}.`],
    trap: T`Tangens łączy dwie przyprostokątne – przeciwprostokątna w ogóle w nim nie występuje.`,
    tip: TIP_DEF
  });
};
const defNeedPythagoras = (r) => {
  const [a0, b0, c0] = r.pick(TRIPLES.slice(0, 5));
  const k = r.pick([1, 1, 2]);
  const [a, b, c] = [a0 * k, b0 * k, c0 * k];
  const fn = r.pick(['sin', 'cos']);
  const smaller = r.bool();
  // mniejszy kąt leży naprzeciw krótszej przyprostokątnej a
  const opp = smaller ? a : b;
  const adj = smaller ? b : a;
  const val = fn === 'sin' ? [opp, c] : [adj, c];
  return mc({
    title: 'Najpierw Pitagoras, potem funkcja',
    q: T`Przyprostokątne trójkąta prostokątnego mają długości $${a}$ i $${b}$. ${fn === 'sin' ? 'Sinus' : 'Cosinus'} ${smaller ? 'mniejszego' : 'większego'} z kątów ostrych tego trójkąta jest równy`,
    ok: m(fr(val[0], val[1])),
    val: val[0] / val[1],
    bad: [m(fr(fn === 'sin' ? adj : opp, c)), m(fr(opp, adj)), m(fr(adj, opp)), m(fr(a, a + b))],
    steps: [T`Przeciwprostokątna: $c = \sqrt{${a}^2 + ${b}^2} = \sqrt{${a * a + b * b}} = ${c}$.`, T`${smaller ? 'Mniejszy' : 'Większy'} kąt ostry leży naprzeciw ${smaller ? 'krótszej' : 'dłuższej'} przyprostokątnej ($${opp}$).`, `$\\${fn}\\alpha = \\frac{${val[0]}}{${val[1]}} = ${fr(val[0], val[1])}$.`],
    trap: T`W trójkącie naprzeciw mniejszego kąta leży krótszy bok. Sinus i cosinus wymagają przeciwprostokątnej, którą trzeba najpierw policzyć.`,
    tip: 'Karta wzorów, str. 14: twierdzenie Pitagorasa $a^2 + b^2 = c^2$.'
  });
};
const defLadder = (r) => {
  const [a0, b0, c0] = r.pick(TRIPLES.slice(0, 3));
  const k = r.pick([1, 2]) * r.pick([1, 0.5]);
  const L = c0 * k;
  const h = a0 * k;
  need(Number.isInteger(L * 2));
  const fmt = (x) => String(x).replace('.', '{,}');
  return mc({
    title: 'Trygonometria w zadaniu praktycznym',
    q: T`Drabina o długości $${fmt(L)}$ m jest oparta o pionową ścianę i tworzy z poziomym podłożem kąt $\alpha$ taki, że $\sin\alpha = ${fr(a0, c0)}$. Górny koniec drabiny znajduje się na wysokości`,
    ok: `$${fmt(h)}$ m`,
    bad: [`$${fmt(b0 * k)}$ m`, `$${fmt((L * c0) / a0).slice(0, 6)}$ m`, `$${fmt(L - h === b0 * k ? L - h + 0.5 : L - h)}$ m`, `$${fmt(h + 0.5)}$ m`].filter((o) => !/\d{5,}/.test(o)),
    steps: [T`Drabina, ściana i podłoże tworzą trójkąt prostokątny. Drabina jest przeciwprostokątną, a szukana wysokość leży naprzeciw kąta $\alpha$.`, T`$\sin\alpha = \frac{h}{${fmt(L)}}$, więc $h = ${fmt(L)} \cdot ${fr(a0, c0)} = ${fmt(h)}$ m.`],
    trap: T`Wysokość leży naprzeciw kąta przy podłożu, więc używamy sinusa. Cosinus dałby odległość dolnego końca drabiny od ściany.`,
    tip: TIP_DEF
  });
};

// ---------- 8.2 Wartości dla kątów 30°, 45°, 60° ----------
const VAL = [
  [T`\sin 30^\circ`, 0.5], [T`\cos 60^\circ`, 0.5], [T`${tg} 45^\circ`, 1], [T`\sin^2 45^\circ`, 0.5], [T`\cos^2 45^\circ`, 0.5],
  [T`\sin^2 60^\circ`, 0.75], [T`\cos^2 30^\circ`, 0.75], [T`${tg}^2 60^\circ`, 3], [T`${tg}^2 30^\circ`, 1 / 3], [T`\sin^2 30^\circ`, 0.25],
  [T`\cos^2 60^\circ`, 0.25], [T`${tg} 60^\circ \cdot ${tg} 30^\circ`, 1], [T`\sin 60^\circ \cdot \cos 30^\circ`, 0.75], [T`\sin 45^\circ \cdot \cos 45^\circ`, 0.5]
];
const toFr = (x) => {
  for (const d of [1, 2, 3, 4, 6, 12]) if (Math.abs(x * d - Math.round(x * d)) < 1e-9) return fr(Math.round(x * d), d);
  return null;
};
const valExpression = (r) => {
  const [t1, v1] = r.pick(VAL);
  const [t2, v2] = r.pick(VAL);
  need(t1 !== t2);
  const k = r.pick([1, 2, 4]);
  const plus = r.bool();
  const v = k * v1 + (plus ? v2 : -v2);
  const ok = toFr(v);
  need(ok !== null);
  const wrong = [k * v1 - (plus ? v2 : -v2), v + 0.5, v - 0.5, v + 1, k * v1 * v2 + 0.25].map(toFr).filter(Boolean).map((x) => m(x));
  return mc({
    title: 'Wartość wyrażenia trygonometrycznego',
    q: T`Wartość wyrażenia $${k === 1 ? '' : k + ' \\cdot '}${t1} ${plus ? '+' : '-'} ${t2}$ jest równa`,
    ok: m(ok),
    val: v,
    bad: wrong,
    steps: [T`Z tabeli wartości: $${t1} = ${toFr(v1)}$ oraz $${t2} = ${toFr(v2)}$.`, T`$${k === 1 ? '' : k + ' \\cdot '}${toFr(v1)} ${plus ? '+' : '-'} ${toFr(v2)} = ${ok}$.`],
    trap: T`Zapis $\sin^2\alpha$ oznacza $(\sin\alpha)^2$ – najpierw odczytaj wartość z tabeli, potem podnieś ją do kwadratu.`,
    tip: TIP_TAB
  });
};
const valTriangle3060 = (r) => {
  const c = r.int(2, 12) * 2;
  const ask30 = r.bool();
  const half = c / 2;
  return mc({
    title: 'Trójkąt 30°, 60°, 90°',
    q: T`W trójkącie prostokątnym jeden z kątów ostrych ma miarę $30^\circ$, a przeciwprostokątna ma długość $${c}$. Przyprostokątna leżąca naprzeciwko kąta $${ask30 ? 30 : 60}^\circ$ ma długość`,
    ok: m(ask30 ? `${half}` : `${half}\\sqrt{3}`),
    val: ask30 ? half : half * Math.sqrt(3),
    bad: [m(ask30 ? `${half}\\sqrt{3}` : `${half}`), m(`${half}\\sqrt{2}`), m(`${c}\\sqrt{3}`), m(rootFrac(c, 3, 3)), m(`${c}`)],
    steps: [T`$\sin ${ask30 ? 30 : 60}^\circ = \frac{x}{${c}}$, a $\sin ${ask30 ? 30 : 60}^\circ = ${ask30 ? '\\frac{1}{2}' : '\\frac{\\sqrt{3}}{2}'}$.`, T`$x = ${c} \cdot ${ask30 ? '\\frac{1}{2}' : '\\frac{\\sqrt{3}}{2}'} = ${ask30 ? half : `${half}\\sqrt{3}`}$.`],
    trap: T`Naprzeciw kąta $30^\circ$ leży bok dwa razy krótszy od przeciwprostokątnej. Bok z $\sqrt{3}$ leży naprzeciw kąta $60^\circ$.`,
    tip: 'Trójkąt 30°–60°–90° ma boki w proporcji $a$, $a\\sqrt{3}$, $2a$ (naprzeciw kątów 30°, 60°, 90°).'
  });
};
const valSquareDiagonal = (r) => {
  const a = r.int(2, 12);
  const askDiag = r.bool();
  return mc({
    title: 'Trójkąt 45°, 45°, 90° i przekątna kwadratu',
    q: askDiag ? T`Przekątna kwadratu o boku długości $${a}$ ma długość` : T`Przekątna kwadratu ma długość $${a}\sqrt{2}$. Pole tego kwadratu jest równe`,
    ok: m(askDiag ? `${a}\\sqrt{2}` : `${a * a}`),
    val: askDiag ? a * Math.SQRT2 : a * a,
    bad: askDiag ? [m(`${2 * a}`), m(`${a}\\sqrt{3}`), m(`${a * a}`), m(rootFrac(a, 2, 2))] : [m(`${2 * a * a}`), m(`${a * a}\\sqrt{2}`), m(`${4 * a}`), m(`${a}\\sqrt{2}`), m(`${a * 2}`)],
    steps: askDiag ? [T`Przekątna dzieli kwadrat na dwa trójkąty prostokątne równoramienne: $d^2 = ${a}^2 + ${a}^2 = ${2 * a * a}$.`, T`$d = \sqrt{${2 * a * a}} = ${a}\sqrt{2}$.`] : [T`Przekątna kwadratu o boku $a$ to $a\sqrt{2}$, więc $a = ${a}$.`, T`Pole: $a^2 = ${a * a}$.`],
    trap: T`Przekątna kwadratu to $a\sqrt{2}$, a nie $2a$ – to najkrótsza droga między przeciwległymi wierzchołkami, nie suma dwóch boków.`,
    tip: 'Trójkąt 45°–45°–90° ma boki w proporcji $a$, $a$, $a\\sqrt{2}$.'
  });
};
const valEquilateral = (r) => {
  const a = r.int(1, 10) * 2;
  const askH = r.bool();
  const half = a / 2;
  return mc({
    title: 'Trójkąt równoboczny',
    q: T`${askH ? 'Wysokość' : 'Pole'} trójkąta równobocznego o boku długości $${a}$ jest ${askH ? 'równa' : 'równe'}`,
    ok: m(askH ? `${half}\\sqrt{3}` : `${half * half}\\sqrt{3}`),
    val: askH ? half * Math.sqrt(3) : half * half * Math.sqrt(3),
    bad: askH ? [m(`${a}\\sqrt{3}`), m(`${half}\\sqrt{2}`), m(`${half}`), m(rootFrac(a, 3, 3)), m(`${half * half}\\sqrt{3}`)] : [m(`${a * a}\\sqrt{3}`), m(`${half}\\sqrt{3}`), m(`${(a * a) / 2}\\sqrt{3}`), m(`${half * half}`), m(`${half * half}\\sqrt{2}`)],
    steps: askH ? [T`$h = \frac{a\sqrt{3}}{2}$.`, T`$h = \frac{${a}\sqrt{3}}{2} = ${half}\sqrt{3}$.`] : [T`$P = \frac{a^2\sqrt{3}}{4}$.`, T`$P = \frac{${a * a}\sqrt{3}}{4} = ${half * half}\sqrt{3}$.`],
    trap: T`Wysokość: dzielenie przez $2$. Pole: $a^2$ i dzielenie przez $4$. To dwa różne wzory – nie mieszaj ich.`,
    tip: 'Karta wzorów, str. 15: trójkąt równoboczny – $h = \\frac{a\\sqrt{3}}{2}$, $P = \\frac{a^2\\sqrt{3}}{4}$.'
  });
};
const valAngleFromValue = (r) => {
  const data = [
    [T`\sin\alpha = \frac{1}{2}`, 30], [T`\sin\alpha = \frac{\sqrt{2}}{2}`, 45], [T`\sin\alpha = \frac{\sqrt{3}}{2}`, 60],
    [T`\cos\alpha = \frac{1}{2}`, 60], [T`\cos\alpha = \frac{\sqrt{3}}{2}`, 30], [T`\cos\alpha = \frac{\sqrt{2}}{2}`, 45],
    [T`${tg}\alpha = 1`, 45], [T`${tg}\alpha = \sqrt{3}`, 60], [T`${tg}\alpha = \frac{\sqrt{3}}{3}`, 30]
  ];
  const [cond, a] = r.pick(data);
  const k = r.pick([1, 2, 3]);
  const ask = r.pick(['alpha', 'comp', 'mult']);
  const v = ask === 'alpha' ? a : ask === 'comp' ? 90 - a : k * a;
  const label = ask === 'alpha' ? T`Miara kąta $\alpha$ jest równa` : ask === 'comp' ? T`Drugi kąt ostry trójkąta prostokątnego, w którym jednym z kątów ostrych jest $\alpha$, ma miarę` : T`Miara kąta $${k}\alpha$ jest równa`;
  need(ask !== 'mult' || k > 1);
  return mc({
    title: 'Kąt z wartości funkcji',
    q: T`Kąt $\alpha$ jest ostry i $${cond}$. ${label}`,
    ok: m(deg(v)),
    bad: [30, 45, 60, 90, 120, 135, 150, 15, 75].filter((x) => x !== v).slice(0, 5).map((x) => m(deg(x))),
    steps: [T`Z tabeli wartości: warunek $${cond}$ dla kąta ostrego oznacza $\alpha = ${a}^\circ$.`, ask === 'alpha' ? T`Zatem $\alpha = ${a}^\circ$.` : ask === 'comp' ? T`Kąty ostre trójkąta prostokątnego dają razem $90^\circ$: $90^\circ - ${a}^\circ = ${v}^\circ$.` : T`$${k}\alpha = ${k} \cdot ${a}^\circ = ${v}^\circ$.`],
    trap: T`$\sin 30^\circ = \cos 60^\circ = \frac{1}{2}$ – te same liczby pojawiają się przy różnych kątach. Sprawdź, o którą funkcję chodzi.`,
    tip: TIP_TAB
  });
};

// ---------- 8.3 Jedynka trygonometryczna i tangens ----------
const FR = [[3, 5, 4], [4, 5, 3], [5, 13, 12], [12, 13, 5], [8, 17, 15], [15, 17, 8], [7, 25, 24], [24, 25, 7]];
const oneSinToCos = (r) => {
  const givenSin = r.bool();
  const g = givenSin ? '\\sin' : '\\cos';
  const w = givenSin ? '\\cos' : '\\sin';
  if (r.rnd() < 0.6) {
    const [p, q, s] = r.pick(FR);
    return mc({
      title: 'Jedynka trygonometryczna',
      q: T`Kąt $\alpha$ jest ostry i $${g}\alpha = ${fr(p, q)}$. Wtedy $${w}\alpha$ jest równy`,
      ok: m(fr(s, q)),
      val: s / q,
      bad: [m(fr(q - p, q)), m(fr(p, s)), m(fr(s, p)), m(fr(q, s))],
      steps: [T`$${w}^2\alpha = 1 - ${g}^2\alpha = 1 - \frac{${p * p}}{${q * q}} = \frac{${s * s}}{${q * q}}$.`, T`Kąt jest ostry, więc $${w}\alpha > 0$ i $${w}\alpha = ${fr(s, q)}$.`],
      trap: T`$${w}\alpha$ to nie $1 - ${g}\alpha$. Jedynka trygonometryczna dotyczy kwadratów: $\sin^2\alpha + \cos^2\alpha = 1$.`,
      tip: TIP_ONE
    });
  }
  const q = r.pick([3, 4, 5, 6, 7]);
  const p = r.int(1, q - 1);
  need(gcd(p, q) === 1 && !isSquare(q * q - p * p));
  const n = q * q - p * p;
  return mc({
    title: 'Jedynka trygonometryczna z pierwiastkiem',
    q: T`Kąt $\alpha$ jest ostry i $${g}\alpha = ${fr(p, q)}$. Wtedy $${w}\alpha$ jest równy`,
    ok: m(rootFrac(1, n, q)),
    val: Math.sqrt(n) / q,
    bad: [m(fr(q - p, q)), m(fr(n, q * q)), m(rootFrac(1, q * q + p * p, q)), m(fr(n, q))],
    steps: [T`$${w}^2\alpha = 1 - \frac{${p * p}}{${q * q}} = \frac{${n}}{${q * q}}$.`, T`Kąt jest ostry, więc $${w}\alpha = \frac{\sqrt{${n}}}{${q}} = ${rootFrac(1, n, q)}$.`],
    trap: T`Po obliczeniu $${w}^2\alpha = \frac{${n}}{${q * q}}$ trzeba jeszcze spierwiastkować. Sam ułamek $\frac{${n}}{${q * q}}$ to kwadrat szukanej wartości.`,
    tip: TIP_ONE
  });
};
const oneTangent = (r) => {
  const [p, q, s] = r.pick(FR);
  const givenSin = r.bool();
  return mc({
    title: 'Tangens z sinusa lub cosinusa',
    q: T`Kąt $\alpha$ jest ostry i $${givenSin ? '\\sin' : '\\cos'}\alpha = ${fr(p, q)}$. Wtedy $${tg}\alpha$ jest równy`,
    ok: m(givenSin ? fr(p, s) : fr(s, p)),
    val: givenSin ? p / s : s / p,
    bad: [m(givenSin ? fr(s, p) : fr(p, s)), m(fr(s, q)), m(fr(p, q)), m(fr(q, p)), m(fr(q, s))],
    steps: [T`Z jedynki trygonometrycznej: $${givenSin ? '\\cos' : '\\sin'}\alpha = \sqrt{1 - \frac{${p * p}}{${q * q}}} = ${fr(s, q)}$.`, T`$${tg}\alpha = \frac{\sin\alpha}{\cos\alpha} = \frac{${givenSin ? p : s}}{${q}} : \frac{${givenSin ? s : p}}{${q}} = ${givenSin ? fr(p, s) : fr(s, p)}$.`],
    trap: T`Tangens to sinus podzielony przez cosinus – nie odwrotnie.`,
    tip: TIP_ONE
  });
};
const oneFromTangent = (r) => {
  const t = r.pick([2, 3, 4, 5]);
  const a = r.int(1, 4);
  const b = r.intNot(-4, 4, 0);
  const c = r.int(1, 3);
  const d = r.intNot(-4, 4, 0);
  const [nn, dd] = [a * t + b, c * t + d];
  need(dd !== 0 && nn !== 0 && nn % dd !== 0 && a * d - b * c !== 0);
  const cf = (k, f, first) => `${first ? (k < 0 ? '-' : '') : k < 0 ? ' - ' : ' + '}${Math.abs(k) === 1 ? '' : Math.abs(k)}\\${f}\\alpha`;
  return mc({
    title: 'Wyrażenie z tangensem',
    q: T`Kąt $\alpha$ jest ostry i $${tg}\alpha = ${t}$. Wartość wyrażenia $\frac{${cf(a, 'sin', true)}${cf(b, 'cos', false)}}{${cf(c, 'sin', true)}${cf(d, 'cos', false)}}$ jest równa`,
    ok: m(fr(nn, dd)),
    val: nn / dd,
    bad: [m(fr(dd, nn)), m(fr(a + b * t || 1, c + d * t || 1)), m(fr(a + b || 1, c + d || 1)), m(fr(nn, c * t - d || 1)), m(fr(a * t - b || 1, dd))],
    steps: [T`Dzielimy licznik i mianownik przez $\cos\alpha$ (jest różny od zera): $\frac{${a === 1 ? '' : a}${tg}\alpha ${b > 0 ? '+' : '-'} ${Math.abs(b)}}{${c === 1 ? '' : c}${tg}\alpha ${d > 0 ? '+' : '-'} ${Math.abs(d)}}$.`, T`Podstawiamy $${tg}\alpha = ${t}$: $\frac{${a * t} ${b > 0 ? '+' : '-'} ${Math.abs(b)}}{${c * t} ${d > 0 ? '+' : '-'} ${Math.abs(d)}} = ${fr(nn, dd)}$.`],
    trap: T`Dzieląc przez $\cos\alpha$, każdy składnik z sinusem zamienia się na tangens, a każdy z cosinusem – na samą liczbę.`,
    tip: 'Gdy znasz tangens, a wyrażenie jest ułamkiem z sinusami i cosinusami, podziel licznik i mianownik przez $\\cos\\alpha$.'
  });
};
const oneDifferenceOfSquares = (r) => {
  const q = r.pick([3, 4, 5, 6]);
  const p = r.int(1, q - 1);
  need(gcd(p, q) === 1);
  const givenSin = r.bool();
  // sin^2 - cos^2 = 2sin^2 - 1  albo 1 - 2cos^2
  const nn = givenSin ? 2 * p * p - q * q : q * q - 2 * p * p;
  return mc({
    title: 'Różnica kwadratów sinusa i cosinusa',
    q: T`Kąt $\alpha$ jest ostry i $${givenSin ? '\\sin' : '\\cos'}\alpha = ${fr(p, q)}$. Wartość wyrażenia $\sin^2\alpha - \cos^2\alpha$ jest równa`,
    ok: m(fr(nn, q * q)),
    val: nn / (q * q),
    bad: [m(fr(-nn, q * q)), m(fr(2 * p * p, q * q)), m(fr(p * p, q * q)), m(fr(q * q - p * p, q * q)), m('1')],
    steps: [T`$${givenSin ? '\\sin' : '\\cos'}^2\alpha = \frac{${p * p}}{${q * q}}$, więc $${givenSin ? '\\cos' : '\\sin'}^2\alpha = 1 - \frac{${p * p}}{${q * q}} = \frac{${q * q - p * p}}{${q * q}}$.`, T`$\sin^2\alpha - \cos^2\alpha = \frac{${givenSin ? p * p : q * q - p * p}}{${q * q}} - \frac{${givenSin ? q * q - p * p : p * p}}{${q * q}} = ${fr(nn, q * q)}$.`],
    trap: T`Tu nie trzeba pierwiastkować – wyrażenie zawiera same kwadraty, więc wystarczy $\sin^2\alpha$ i $\cos^2\alpha$.`,
    tip: TIP_ONE
  });
};
const oneSquareOfSum = (r) => {
  const q = r.pick([4, 5, 8, 10, 25]);
  const p = r.int(1, Math.floor(q / 2));
  need(gcd(p, q) === 1 && 2 * p < q);
  const plus = r.bool();
  const nn = plus ? q + 2 * p : q - 2 * p;
  return mc({
    title: 'Kwadrat sumy sinusa i cosinusa',
    q: T`Kąt $\alpha$ jest ostry i $\sin\alpha \cdot \cos\alpha = ${fr(p, q)}$. Wartość wyrażenia $(\sin\alpha ${plus ? '+' : '-'} \cos\alpha)^2$ jest równa`,
    ok: m(fr(nn, q)),
    val: nn / q,
    bad: [m(fr(plus ? q - 2 * p : q + 2 * p, q)), m('1'), m(fr(plus ? q + p : q - p, q)), m(fr(2 * p, q)), m(fr(p * p, q * q))],
    steps: [T`$(\sin\alpha ${plus ? '+' : '-'} \cos\alpha)^2 = \sin^2\alpha ${plus ? '+' : '-'} 2\sin\alpha\cos\alpha + \cos^2\alpha$.`, T`$\sin^2\alpha + \cos^2\alpha = 1$, więc wyrażenie jest równe $1 ${plus ? '+' : '-'} 2 \cdot ${fr(p, q)} = ${fr(nn, q)}$.`],
    trap: T`$(\sin\alpha + \cos\alpha)^2$ to nie $\sin^2\alpha + \cos^2\alpha = 1$. Zostaje jeszcze podwojony iloczyn.`,
    tip: TIP_ONE
  });
};

// ---------- 8.4 Kąty od 0° do 180° ----------
const OBT = { 120: { sin: T`\frac{\sqrt{3}}{2}`, cos: T`-\frac{1}{2}`, tg: T`-\sqrt{3}`, ref: 60 }, 135: { sin: T`\frac{\sqrt{2}}{2}`, cos: T`-\frac{\sqrt{2}}{2}`, tg: T`-1`, ref: 45 }, 150: { sin: T`\frac{1}{2}`, cos: T`-\frac{\sqrt{3}}{2}`, tg: T`-\frac{\sqrt{3}}{3}`, ref: 30 } };
const obtValue = (r) => {
  const a = r.pick([120, 135, 150]);
  const fn = r.pick(['sin', 'cos', 'tg']);
  const name = fn === 'tg' ? tg : `\\${fn}`;
  const ok = OBT[a][fn];
  const all = [T`\frac{1}{2}`, T`-\frac{1}{2}`, T`\frac{\sqrt{3}}{2}`, T`-\frac{\sqrt{3}}{2}`, T`\frac{\sqrt{2}}{2}`, T`-\frac{\sqrt{2}}{2}`, T`\sqrt{3}`, T`-\sqrt{3}`, '1', '-1', T`\frac{\sqrt{3}}{3}`, T`-\frac{\sqrt{3}}{3}`];
  const neg = ok.startsWith('-') ? ok.slice(1) : `-${ok}`;
  return mc({
    title: 'Wartość funkcji kąta rozwartego',
    q: T`Liczba $${name} ${a}^\circ$ jest równa`,
    ok: m(ok),
    bad: [m(neg), ...r.shuffle(all.filter((x) => x !== ok && x !== neg)).slice(0, 3).map((x) => m(x))],
    steps: [T`$${a}^\circ = 180^\circ - ${OBT[a].ref}^\circ$.`, fn === 'sin' ? T`$\sin(180^\circ - \alpha) = \sin\alpha$, więc $\sin ${a}^\circ = \sin ${OBT[a].ref}^\circ = ${ok}$.` : fn === 'cos' ? T`$\cos(180^\circ - \alpha) = -\cos\alpha$, więc $\cos ${a}^\circ = -\cos ${OBT[a].ref}^\circ = ${ok}$.` : T`$${tg}(180^\circ - \alpha) = -${tg}\alpha$, więc $${tg} ${a}^\circ = -${tg} ${OBT[a].ref}^\circ = ${ok}$.`],
    trap: T`Dla kąta rozwartego sinus jest dodatni, a cosinus i tangens są ujemne. Zgubiony minus to najczęstszy błąd.`,
    tip: 'Karta wzorów, str. 13: $\\sin(180^\\circ - \\alpha) = \\sin\\alpha$, $\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$, $\\operatorname{tg}(180^\\circ - \\alpha) = -\\operatorname{tg}\\alpha$.'
  });
};
const obtFromSin = (r) => {
  const [p, q, s] = r.pick(FR);
  const askTg = r.bool();
  return mc({
    title: 'Kąt rozwarty i jedynka trygonometryczna',
    q: T`Kąt $\alpha$ jest rozwarty i $\sin\alpha = ${fr(p, q)}$. Wtedy $${askTg ? tg : '\\cos'}\alpha$ jest równy`,
    ok: m(askTg ? fr(-p, s) : fr(-s, q)),
    val: askTg ? -p / s : -s / q,
    bad: askTg ? [m(fr(p, s)), m(fr(-s, p)), m(fr(s, p)), m(fr(-s, q))] : [m(fr(s, q)), m(fr(-p, q)), m(fr(p - q, q)), m(fr(-s, p))],
    steps: [T`$\cos^2\alpha = 1 - \frac{${p * p}}{${q * q}} = \frac{${s * s}}{${q * q}}$.`, T`Kąt jest rozwarty, więc $\cos\alpha < 0$: $\cos\alpha = -${fr(s, q)}$.`, ...(askTg ? [T`$${tg}\alpha = \frac{\sin\alpha}{\cos\alpha} = ${fr(-p, s)}$.`] : [])],
    trap: T`Jedynka trygonometryczna daje tylko $\cos^2\alpha$. Znak cosinusa wynika z tego, że kąt jest rozwarty – musi być ujemny.`,
    tip: TIP_ONE
  });
};
const obtExpression = (r) => {
  const terms = [
    [T`\sin 150^\circ`, 0.5], [T`\cos 120^\circ`, -0.5], [T`${tg} 135^\circ`, -1], [T`\sin^2 120^\circ`, 0.75], [T`\cos^2 150^\circ`, 0.75],
    [T`\sin^2 135^\circ`, 0.5], [T`\cos^2 135^\circ`, 0.5], [T`\cos^2 120^\circ`, 0.25], [T`\sin 30^\circ`, 0.5], [T`\cos 60^\circ`, 0.5], [T`${tg} 45^\circ`, 1], [T`${tg}^2 120^\circ`, 3]
  ];
  const [t1, v1] = r.pick(terms);
  const [t2, v2] = r.pick(terms);
  need(t1 !== t2 && (t1.includes('1') && /1[235]/.test(t1 + t2)));
  const plus = r.bool();
  const k = r.pick([1, 2]);
  const v = k * v1 + (plus ? v2 : -v2);
  const ok = toFr(v);
  need(ok !== null);
  return mc({
    title: 'Wyrażenie z kątami rozwartymi',
    q: T`Wartość wyrażenia $${k === 1 ? '' : k + ' \\cdot '}${t1} ${plus ? '+' : '-'} ${t2}$ jest równa`,
    ok: m(ok),
    val: v,
    bad: [k * Math.abs(v1) + (plus ? Math.abs(v2) : -Math.abs(v2)), -v, v + 1, v - 1, v + 0.5, v - 0.5].map(toFr).filter(Boolean).map((x) => m(x)),
    steps: [T`$${t1} = ${toFr(v1)}$ oraz $${t2} = ${toFr(v2)}$ (dla kątów rozwartych korzystamy ze wzorów redukcyjnych).`, T`$${k === 1 ? '' : k + ' \\cdot '}${toFr(v1).startsWith('-') ? `\\left(${toFr(v1)}\\right)` : toFr(v1)} ${plus ? '+' : '-'} ${toFr(v2).startsWith('-') ? `\\left(${toFr(v2)}\\right)` : toFr(v2)} = ${ok}$.`],
    trap: T`Cosinus i tangens kąta rozwartego są ujemne, ale ich kwadraty są dodatnie.`,
    tip: 'Karta wzorów, str. 13: wzory redukcyjne dla kąta $180^\\circ - \\alpha$.'
  });
};
const obtSigns = (r) => {
  const a = r.pick([100, 110, 125, 130, 140, 155, 160, 170]);
  const b = r.pick([20, 35, 40, 55, 70, 80]);
  const pool = [
    [T`$\cos ${a}^\circ < 0$`, true, T`kąt $${a}^\circ$ jest rozwarty, a cosinus kąta rozwartego jest ujemny`],
    [T`$\sin ${a}^\circ < 0$`, false, T`sinus każdego kąta z przedziału $(0^\circ, 180^\circ)$ jest dodatni`],
    [T`$${tg} ${a}^\circ > 0$`, false, T`tangens kąta rozwartego jest ujemny (iloraz liczby dodatniej i ujemnej)`],
    [T`$\sin ${a}^\circ = \sin ${180 - a}^\circ$`, true, T`$\sin(180^\circ - \alpha) = \sin\alpha$`],
    [T`$\cos ${a}^\circ = \cos ${180 - a}^\circ$`, false, T`$\cos(180^\circ - \alpha) = -\cos\alpha$, więc te liczby są przeciwne`],
    [T`$\sin ${b}^\circ = \cos ${90 - b}^\circ$`, true, T`$\sin\alpha = \cos(90^\circ - \alpha)$`],
    [T`$\cos ${a}^\circ + \cos ${180 - a}^\circ = 0$`, true, T`$\cos ${a}^\circ = -\cos ${180 - a}^\circ$`],
    [T`$${tg} ${b}^\circ < 0$`, false, T`tangens kąta ostrego jest dodatni`]
  ];
  const [s1, s2] = r.shuffle(pool).slice(0, 2);
  return pf({
    title: 'Prawda czy fałsz: znaki funkcji trygonometrycznych',
    q: '',
    s1: [s1[0], s1[1], `${s1[2]}. Zdanie jest ${s1[1] ? 'prawdziwe' : 'fałszywe'}.`],
    s2: [s2[0], s2[1], `${s2[2]}. Zdanie jest ${s2[1] ? 'prawdziwe' : 'fałszywe'}.`],
    trap: 'W przedziale od 0° do 180° sinus jest zawsze dodatni. Cosinus i tangens zmieniają znak po przekroczeniu 90°.',
    tip: 'Karta wzorów, str. 13: wzory redukcyjne dla kąta $180^\\circ - \\alpha$.'
  });
};
const obtAngle = (r) => {
  const data = [[T`\cos\alpha = -\frac{1}{2}`, 120], [T`\cos\alpha = -\frac{\sqrt{2}}{2}`, 135], [T`\cos\alpha = -\frac{\sqrt{3}}{2}`, 150], [T`${tg}\alpha = -1`, 135], [T`${tg}\alpha = -\sqrt{3}`, 120], [T`${tg}\alpha = -\frac{\sqrt{3}}{3}`, 150]];
  const [cond, a] = r.pick(data);
  const variant = r.int(0, 2);
  const v = [a, 180 - a, a - 90][variant];
  const label = [T`Miara kąta $\alpha$ jest równa`, T`Miara kąta przyległego do kąta $\alpha$ jest równa`, T`Miara kąta $\alpha - 90^\circ$ jest równa`][variant];
  return mc({
    title: 'Kąt rozwarty z wartości funkcji',
    q: T`Kąt $\alpha$ spełnia warunki $0^\circ < \alpha < 180^\circ$ oraz $${cond}$. ${label}`,
    ok: m(deg(v)),
    bad: [30, 45, 60, 120, 135, 150, 90].filter((x) => x !== v).slice(0, 5).map((x) => m(deg(x))),
    steps: [T`Wartość jest ujemna, więc kąt jest rozwarty: $\alpha = 180^\circ - \beta$, gdzie $\beta$ jest kątem ostrym o tej samej wartości bezwzględnej funkcji.`, T`$\beta = ${180 - a}^\circ$, więc $\alpha = ${a}^\circ$.`, ...(variant === 0 ? [] : [variant === 1 ? T`Kąt przyległy: $180^\circ - ${a}^\circ = ${v}^\circ$.` : T`$${a}^\circ - 90^\circ = ${v}^\circ$.`])],
    trap: T`Ujemny cosinus lub tangens oznacza kąt rozwarty. Odpowiedź z przedziału $(0^\circ, 90^\circ)$ jest tu na pewno błędna.`,
    tip: 'Karta wzorów, str. 13: wzory redukcyjne dla kąta $180^\\circ - \\alpha$.'
  });
};

// ---------- 8.5 Pole trójkąta z sinusem i twierdzenie cosinusów ----------
const SINV = { 30: [1, 1, 2], 45: [1, 2, 2], 60: [1, 3, 2], 120: [1, 3, 2], 135: [1, 2, 2], 150: [1, 1, 2] }; // [licznik, pod pierwiastkiem, mianownik]
const areaSine = (r) => {
  const a = r.int(2, 12);
  const b = r.int(2, 12);
  const g = r.pick([30, 45, 60, 120, 135, 150]);
  const [, n, d] = SINV[g];
  const para = r.rnd() < 0.3;
  const coef = para ? a * b : a * b; // licznik przed pierwiastkiem; mianownik 2*d dla trójkąta, d dla równoległoboku
  const den = para ? d : 2 * d;
  const ok = rootFrac(coef, n, den);
  return mc({
    title: para ? 'Pole równoległoboku z sinusem' : 'Pole trójkąta z sinusem',
    q: para ? T`Boki równoległoboku mają długości $${a}$ i $${b}$, a kąt między nimi ma miarę $${g}^\circ$. Pole tego równoległoboku jest równe` : T`Dwa boki trójkąta mają długości $${a}$ i $${b}$, a kąt między nimi ma miarę $${g}^\circ$. Pole tego trójkąta jest równe`,
    ok: m(ok),
    val: (para ? 1 : 0.5) * a * b * Math.sin((g * Math.PI) / 180),
    bad: [m(rootFrac(coef, n, para ? 2 * d : d)), m(rootFrac(coef, n === 1 ? 3 : n === 3 ? 1 : 3, den)), m(rootFrac(coef, n === 2 ? 3 : 2, den)), m(rootFrac(coef, 1, para ? 1 : 2)), m(rootFrac(a + b, n, den))],
    steps: [T`${para ? '$P = a \\cdot b \\cdot \\sin\\gamma$' : '$P = \\frac{1}{2} \\cdot a \\cdot b \\cdot \\sin\\gamma$'}, a $\sin ${g}^\circ = ${rootFrac(1, n, d)}$${g > 90 ? T` (bo $\sin ${g}^\circ = \sin ${180 - g}^\circ$)` : ''}.`, T`$P = ${para ? '' : '\\frac{1}{2} \\cdot '}${a} \cdot ${b} \cdot ${rootFrac(1, n, d)} = ${ok}$.`],
    trap: para ? T`Dla równoległoboku nie ma $\frac{1}{2}$ – to pole dwóch jednakowych trójkątów.` : T`Nie zapomnij o $\frac{1}{2}$ – sam iloczyn $ab\sin\gamma$ to pole równoległoboku, czyli dwa razy za dużo.`,
    tip: 'Karta wzorów, str. 15: $P = \\frac{1}{2} \\cdot a \\cdot b \\cdot \\sin\\gamma$ (kąt $\\gamma$ leży między bokami $a$ i $b$).'
  });
};
const COS_SETS = { 60: [[3, 8, 7], [5, 8, 7], [7, 15, 13], [8, 15, 13], [5, 21, 19], [16, 21, 19]], 120: [[3, 5, 7], [7, 8, 13], [5, 16, 19], [6, 10, 14], [9, 15, 21]] };
const cosineLawSide = (r) => {
  const g = r.pick([60, 120]);
  const exact = r.rnd() < 0.55;
  let a;
  let b;
  if (exact) [a, b] = r.pick(COS_SETS[g]);
  else {
    a = r.int(2, 9);
    b = r.intNot(2, 9, a);
  }
  const c2 = a * a + b * b + (g === 60 ? -a * b : a * b);
  need(exact || !isSquare(c2));
  const ok = sq(c2);
  return mc({
    title: 'Twierdzenie cosinusów: trzeci bok',
    q: T`Dwa boki trójkąta mają długości $${a}$ i $${b}$, a kąt między nimi ma miarę $${g}^\circ$. Trzeci bok tego trójkąta ma długość`,
    ok: m(ok),
    val: Math.sqrt(c2),
    bad: [m(sq(a * a + b * b + (g === 60 ? a * b : -a * b))), m(sq(a * a + b * b)), m(sq(a * a + b * b + (g === 60 ? -2 * a * b : 2 * a * b) || 1)), m(`${c2}`)],
    steps: [T`$c^2 = a^2 + b^2 - 2ab\cos\gamma$, a $\cos ${g}^\circ = ${g === 60 ? '\\frac{1}{2}' : '-\\frac{1}{2}'}$.`, T`$c^2 = ${a * a} + ${b * b} - 2 \cdot ${a} \cdot ${b} \cdot ${g === 60 ? '\\frac{1}{2}' : '\\left(-\\frac{1}{2}\\right)'} = ${a * a + b * b} ${g === 60 ? '-' : '+'} ${a * b} = ${c2}$.`, T`$c = ${isSquare(c2) ? '' : `\\sqrt{${c2}} = `}${ok}$.`],
    trap: g === 120 ? T`$\cos 120^\circ$ jest ujemny, więc „minus razy minus” daje plus: do $a^2 + b^2$ DODAJEMY $ab$.` : T`Wynik $${c2}$ to dopiero $c^2$ – na końcu trzeba spierwiastkować.`,
    tip: 'Karta wzorów, str. 14: twierdzenie cosinusów $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$.'
  });
};
const cosineLawAngle = (r) => {
  const a = r.int(3, 9);
  const b = r.int(3, 9);
  const c = r.int(3, 12);
  need(a + b > c && a + c > b && b + c > a && a * a + b * b !== c * c && c !== a && c !== b);
  const nn = a * a + b * b - c * c;
  const dd = 2 * a * b;
  return mc({
    title: 'Twierdzenie cosinusów: cosinus kąta',
    q: T`Boki trójkąta mają długości $${a}$, $${b}$ i $${c}$. Cosinus kąta leżącego naprzeciwko boku o długości $${c}$ jest równy`,
    ok: m(fr(nn, dd)),
    val: nn / dd,
    bad: [m(fr(-nn, dd)), m(fr(nn, a * b)), m(fr(a * a + c * c - b * b, 2 * a * c)), m(fr(c * c, a * a + b * b)), m(fr(nn, 2 * dd))],
    steps: [T`Z twierdzenia cosinusów: $${c}^2 = ${a}^2 + ${b}^2 - 2 \cdot ${a} \cdot ${b} \cdot \cos\gamma$.`, T`$${c * c} = ${a * a + b * b} - ${dd}\cos\gamma$, więc $${dd}\cos\gamma = ${nn}$.`, T`$\cos\gamma = ${fr(nn, dd)}$${nn < 0 ? ' – kąt jest rozwarty' : ''}.`],
    trap: T`Po lewej stronie wzoru stoi kwadrat boku leżącego NAPRZECIW szukanego kąta. Pozostałe dwa boki są po prawej.`,
    tip: 'Karta wzorów, str. 14: twierdzenie cosinusów $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$.'
  });
};
const triangleKind = (r) => {
  const a = r.int(3, 12);
  const b = r.int(a, 14);
  const c = r.int(b, 20);
  need(a + b > c);
  const s = a * a + b * b - c * c;
  const kind = s > 0 ? 'ostrokątny' : s === 0 ? 'prostokątny' : 'rozwartokątny';
  need(r.rnd() < (s === 0 ? 1 : 0.5));
  return mc({
    title: 'Rodzaj trójkąta z długości boków',
    q: T`Boki trójkąta mają długości $${a}$, $${b}$ i $${c}$. Trójkąt ten jest`,
    ok: kind,
    bad: ['ostrokątny', 'prostokątny', 'rozwartokątny', 'równoboczny'].filter((x) => x !== kind),
    steps: [T`Porównujemy kwadrat najdłuższego boku z sumą kwadratów pozostałych: $${c}^2 = ${c * c}$ oraz $${a}^2 + ${b}^2 = ${a * a + b * b}$.`, s > 0 ? T`$${c * c} < ${a * a + b * b}$, więc największy kąt jest ostry – trójkąt jest ostrokątny.` : s === 0 ? T`$${c * c} = ${a * a + b * b}$, więc (twierdzenie odwrotne do twierdzenia Pitagorasa) trójkąt jest prostokątny.` : T`$${c * c} > ${a * a + b * b}$, więc największy kąt jest rozwarty – trójkąt jest rozwartokątny.`],
    trap: T`Porównujemy zawsze kwadrat NAJDŁUŻSZEGO boku z sumą kwadratów dwóch krótszych – tylko największy kąt może być prosty lub rozwarty.`,
    tip: '$c^2 < a^2 + b^2$ – ostrokątny, $c^2 = a^2 + b^2$ – prostokątny, $c^2 > a^2 + b^2$ – rozwartokątny ($c$ to najdłuższy bok).'
  });
};
const areaRhombus = (r) => {
  const a = r.int(2, 12);
  const g = r.pick([30, 45, 60, 120, 135, 150]);
  const [, n, d] = SINV[g];
  const ok = rootFrac(a * a, n, d);
  return mc({
    title: 'Pole rombu z kąta',
    q: T`Bok rombu ma długość $${a}$, a jeden z jego kątów wewnętrznych ma miarę $${g}^\circ$. Pole tego rombu jest równe`,
    ok: m(ok),
    val: a * a * Math.sin((g * Math.PI) / 180),
    bad: [m(rootFrac(a * a, n, 2 * d)), m(rootFrac(a * a, n === 3 ? 1 : 3, d)), m(`${a * a}`), m(rootFrac(a * a, n === 2 ? 3 : 2, d)), m(rootFrac(2 * a, n, d))],
    steps: [T`Romb to równoległobok o równych bokach: $P = a \cdot a \cdot \sin\alpha$.`, T`$\sin ${g}^\circ = ${rootFrac(1, n, d)}$, więc $P = ${a * a} \cdot ${rootFrac(1, n, d)} = ${ok}$.`],
    trap: T`Pole rombu to nie $a^2$ – tak jest tylko dla kwadratu (kąt $90^\circ$, sinus równy 1).`,
    tip: 'Karta wzorów, str. 20: pole rombu $P = a^2 \\sin\\alpha$.'
  });
};

export default {
  numericId: 8,
  title: 'Trygonometria',
  short_title: 'Trygonometria',
  description: 'Sinus, cosinus i tangens w trójkącie prostokątnym, kąty 30°, 45°, 60°, jedynka trygonometryczna, kąty rozwarte i twierdzenie cosinusów.',
  icon: 'Triangle',
  color: '#F472B6',
  matura_points_range: '3–5 pkt',
  importance: 'HIGH',
  cke_formula_page: 'str. 10–14',
  lessons: [
    {
      title: 'Sinus, cosinus i tangens w trójkącie prostokątnym',
      short_title: 'Definicje sin, cos, tg',
      pill: pill({
        essence: T`W trójkącie prostokątnym funkcje trygonometryczne kąta ostrego $\alpha$ to stosunki długości boków. Sinus: przyprostokątna naprzeciw kąta do przeciwprostokątnej. Cosinus: przyprostokątna przy kącie do przeciwprostokątnej. Tangens: przyprostokątna naprzeciw do przyprostokątnej przy kącie. Te trzy ułamki pozwalają z jednego boku i kąta wyznaczyć pozostałe boki.`,
        context: 'Zadania 18–20 w arkuszu • 1 pkt oraz narzędzie w planimetrii i stereometrii.',
        pl: T`Stań w wierzchołku kąta $\alpha$. Bok, na który patrzysz „na wprost”, to bok naprzeciw. Bok, którego dotykasz (a nie jest najdłuższy), to bok przy kącie. Najdłuższy, naprzeciw kąta prostego, to przeciwprostokątna. Sinus bierze „naprzeciw”, cosinus „przy”.`,
        steps: [
          ['Oznacz boki względem kąta', T`Naprzeciw kąta: $a$. Przy kącie: $b$. Przeciwprostokątna: $c$.`, 'Dla drugiego kąta ostrego role a i b się zamieniają.'],
          ['Wybierz funkcję', T`Masz „naprzeciw” i „przeciwprostokątną” – sinus. „Przy” i „przeciwprostokątną” – cosinus. Dwie przyprostokątne – tangens.`, 'Wybierz tę, w której znasz dwa z trzech elementów.'],
          ['Ułóż proporcję', T`$\sin\alpha = \frac{3}{5}$ i $c = 20$: $\frac{a}{20} = \frac{3}{5}$, więc $a = 12$.`, 'Mnożysz na krzyż.']
        ],
        formulas: [
          ['Sinus', T`\sin\alpha = \frac{a}{c}`, 10],
          ['Cosinus', T`\cos\alpha = \frac{b}{c}`, 10],
          ['Tangens', T`\operatorname{tg}\alpha = \frac{a}{b}`, 10]
        ],
        examples: [
          ['Z boków', '1 pkt', T`Przyprostokątne trójkąta mają długości $5$ i $12$. Oblicz sinus mniejszego kąta ostrego.`, T`1. $c = \sqrt{25 + 144} = 13$.` + '\n' + T`2. Mniejszy kąt leży naprzeciw krótszego boku ($5$).` + '\n' + T`3. $\sin\alpha = \frac{5}{13}$.`, 'Naprzeciw mniejszego kąta leży krótszy bok.'],
          ['Długość boku', '1 pkt', T`W trójkącie prostokątnym $\operatorname{tg}\alpha = \frac{3}{4}$, a przyprostokątna przy kącie $\alpha$ ma długość $8$. Oblicz drugą przyprostokątną.`, T`1. $\frac{a}{8} = \frac{3}{4}$.` + '\n' + T`2. $a = 6$.`, 'Tangens nie potrzebuje przeciwprostokątnej.']
        ],
        trap: T`Sinus i cosinus tego samego kąta różnią się tylko tym, którą przyprostokątną bierzesz. Źle oznaczone boki = zamiana sinusa z cosinusem.`,
        fail: T`Przyprostokątne $3$ i $4$, kąt $\alpha$ naprzeciw boku $3$: „$\sin\alpha = \frac{4}{5}$”.`,
        win: T`Naprzeciw kąta $\alpha$ leży bok $3$, więc $\sin\alpha = \frac{3}{5}$, a $\cos\alpha = \frac{4}{5}$.`,
        why: 'Sinus zawsze używa boku przeciwległego do kąta – warto go na rysunku od razu podpisać.',
        ckeTip: 'Zrób szybki szkic trójkąta i zaznacz kąt łukiem – 10 sekund rysowania eliminuje większość pomyłek.',
        points: [T`$\sin$: naprzeciw / przeciwprostokątna.`, T`$\cos$: przy kącie / przeciwprostokątna.`, T`$\operatorname{tg}$: naprzeciw / przy kącie.`]
      }),
      gens: [defFromSides, defFindLeg, defTangentLeg, defNeedPythagoras, defLadder]
    },
    {
      title: 'Wartości funkcji dla kątów 30°, 45° i 60°',
      short_title: 'Kąty 30°, 45°, 60°',
      pill: pill({
        essence: T`Dla trzech kątów wartości funkcji trygonometrycznych trzeba umieć odczytać z tabeli w karcie wzorów: $30^\circ$, $45^\circ$ i $60^\circ$. Biorą się one z dwóch figur: połowy trójkąta równobocznego (boki $a$, $a\sqrt{3}$, $2a$) i połowy kwadratu (boki $a$, $a$, $a\sqrt{2}$). Dzięki nim od razu znasz wysokość trójkąta równobocznego $\frac{a\sqrt{3}}{2}$ i przekątną kwadratu $a\sqrt{2}$.`,
        context: 'Zadania 18–22 w arkuszu • 1 pkt. Wartości te wracają w planimetrii i stereometrii.',
        pl: T`Nie wkuwaj tabelki – masz ją w karcie wzorów na str. 12. Zapamiętaj dwa trójkąty. „Połówka równobocznego”: krótki bok, długi bok z $\sqrt{3}$ i przeciwprostokątna dwa razy dłuższa od krótkiego. „Połówka kwadratu”: dwa równe boki i przeciwprostokątna z $\sqrt{2}$.`,
        steps: [
          ['Rozpoznaj trójkąt', T`Kąty $30^\circ$ i $60^\circ$ – połówka trójkąta równobocznego. Kąt $45^\circ$ – połówka kwadratu.`, 'Rysunek pomaga.'],
          ['Zastosuj proporcje boków', T`Przeciwprostokątna $10$, kąt $30^\circ$: bok naprzeciw to $5$, drugi to $5\sqrt{3}$.`, 'Naprzeciw 30° leży połowa przeciwprostokątnej.'],
          ['Albo odczytaj z tabeli', T`$\sin 60^\circ = \frac{\sqrt{3}}{2}$, $\operatorname{tg} 45^\circ = 1$.`, 'Karta wzorów, str. 12.']
        ],
        formulas: [
          ['Kąt 30°', T`\sin 30^\circ = \frac{1}{2}, \quad \cos 30^\circ = \frac{\sqrt{3}}{2}, \quad \operatorname{tg} 30^\circ = \frac{\sqrt{3}}{3}`, 12],
          ['Kąt 45°', T`\sin 45^\circ = \cos 45^\circ = \frac{\sqrt{2}}{2}, \quad \operatorname{tg} 45^\circ = 1`, 12],
          ['Kąt 60°', T`\sin 60^\circ = \frac{\sqrt{3}}{2}, \quad \cos 60^\circ = \frac{1}{2}, \quad \operatorname{tg} 60^\circ = \sqrt{3}`, 12]
        ],
        examples: [
          ['Wyrażenie', '1 pkt', T`Oblicz $4 \cdot \sin^2 60^\circ - \operatorname{tg} 45^\circ$.`, T`1. $\sin 60^\circ = \frac{\sqrt{3}}{2}$, więc $\sin^2 60^\circ = \frac{3}{4}$.` + '\n' + T`2. $4 \cdot \frac{3}{4} - 1 = 2$.`, 'Kwadrat usuwa pierwiastek.'],
          ['Trójkąt 30°–60°–90°', '1 pkt', T`Przeciwprostokątna trójkąta prostokątnego ma długość $8$, a jeden z kątów ostrych $60^\circ$. Oblicz dłuższą przyprostokątną.`, T`1. Dłuższa przyprostokątna leży naprzeciw kąta $60^\circ$.` + '\n' + T`2. $x = 8 \cdot \sin 60^\circ = 8 \cdot \frac{\sqrt{3}}{2} = 4\sqrt{3}$.`, 'Naprzeciw większego kąta leży dłuższy bok.']
        ],
        trap: T`$\sin 30^\circ = \frac{1}{2}$, ale $\cos 30^\circ = \frac{\sqrt{3}}{2}$. Pomylenie tych dwóch wartości to klasyk – sprawdzaj w karcie wzorów.`,
        fail: T`„Naprzeciw kąta $60^\circ$ leży połowa przeciwprostokątnej.”`,
        win: T`Połowa przeciwprostokątnej leży naprzeciw kąta $30^\circ$. Naprzeciw $60^\circ$ leży bok $\frac{c\sqrt{3}}{2}$.`,
        why: 'Mniejszy kąt – krótszy bok. 30° to najmniejszy kąt tego trójkąta, więc ma naprzeciw siebie najkrótszy bok.',
        ckeTip: 'Tabela wartości dla 30°, 45°, 60° jest w karcie wzorów na str. 12, a pełne tablice co 1° – na ostatnich stronach.',
        points: [T`Trójkąt 30°–60°–90°: boki $a$, $a\sqrt{3}$, $2a$.`, T`Trójkąt 45°–45°–90°: boki $a$, $a$, $a\sqrt{2}$.`, T`$\sin 30^\circ = \cos 60^\circ$ oraz $\sin 60^\circ = \cos 30^\circ$.`]
      }),
      gens: [valExpression, valTriangle3060, valSquareDiagonal, valEquilateral, valAngleFromValue]
    },
    {
      title: 'Jedynka trygonometryczna i tangens',
      short_title: 'Jedynka trygonometryczna',
      pill: pill({
        essence: T`Dwa wzory łączą wszystkie trzy funkcje tego samego kąta: jedynka trygonometryczna $\sin^2\alpha + \cos^2\alpha = 1$ oraz $\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}$. Znając jedną funkcję kąta ostrego, obliczysz pozostałe: z jedynki dostajesz kwadrat drugiej funkcji, pierwiastkujesz (dla kąta ostrego wynik jest dodatni), a tangens to ich iloraz.`,
        context: 'Zadanie 18–20 w arkuszu • 1 pkt, czasem 2 pkt jako zadanie otwarte.',
        pl: T`Jedynka trygonometryczna to twierdzenie Pitagorasa w przebraniu: w trójkącie o przeciwprostokątnej $1$ przyprostokątne to właśnie $\sin\alpha$ i $\cos\alpha$. Dlatego jeśli $\sin\alpha = \frac{3}{5}$, to $\cos\alpha = \frac{4}{5}$ – stara znajoma trójka $3, 4, 5$.`,
        steps: [
          ['Podstaw do jedynki', T`$\sin\alpha = \frac{5}{13}$: $\cos^2\alpha = 1 - \frac{25}{169} = \frac{144}{169}$.`, 'Najpierw kwadrat danej wartości.'],
          ['Spierwiastkuj', T`Kąt ostry, więc $\cos\alpha = \frac{12}{13}$.`, 'Dla kąta ostrego bierzesz wartość dodatnią.'],
          ['Tangens to iloraz', T`$\operatorname{tg}\alpha = \frac{5}{13} : \frac{12}{13} = \frac{5}{12}$.`, 'Mianowniki się skracają.']
        ],
        formulas: [
          ['Jedynka trygonometryczna', T`\sin^2\alpha + \cos^2\alpha = 1`, 11],
          ['Tangens', T`\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}`, 11]
        ],
        examples: [
          ['Z pierwiastkiem', '1 pkt', T`Kąt $\alpha$ jest ostry i $\cos\alpha = \frac{1}{3}$. Oblicz $\sin\alpha$.`, T`1. $\sin^2\alpha = 1 - \frac{1}{9} = \frac{8}{9}$.` + '\n' + T`2. $\sin\alpha = \frac{\sqrt{8}}{3} = \frac{2\sqrt{2}}{3}$.`, 'Wynik nie musi być „ładnym” ułamkiem.'],
          ['Z tangensa', '2 pkt', T`Kąt $\alpha$ jest ostry i $\operatorname{tg}\alpha = 2$. Oblicz $\frac{\sin\alpha + \cos\alpha}{\sin\alpha - \cos\alpha}$.`, T`1. Dzielimy licznik i mianownik przez $\cos\alpha$.` + '\n' + T`2. $\frac{\operatorname{tg}\alpha + 1}{\operatorname{tg}\alpha - 1} = \frac{3}{1} = 3$.`, 'Nie trzeba liczyć sinusa ani cosinusa.']
        ],
        trap: T`$\cos\alpha$ to NIE jest $1 - \sin\alpha$. Jedynka dotyczy kwadratów: $\cos^2\alpha = 1 - \sin^2\alpha$.`,
        fail: T`$\sin\alpha = \frac{3}{5}$, więc $\cos\alpha = 1 - \frac{3}{5} = \frac{2}{5}$.`,
        win: T`$\cos^2\alpha = 1 - \frac{9}{25} = \frac{16}{25}$, więc $\cos\alpha = \frac{4}{5}$.`,
        why: 'To odpowiednik twierdzenia Pitagorasa, a tam też dodajemy kwadraty boków, nie same boki.',
        ckeTip: 'Zamiast jedynki możesz narysować trójkąt prostokątny: sin α = 3/5 to bok 3 naprzeciw i przeciwprostokątna 5 – trzeci bok z Pitagorasa.',
        points: [T`$\sin^2\alpha + \cos^2\alpha = 1$.`, T`$\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}$.`, T`Dla kąta ostrego wszystkie trzy funkcje są dodatnie.`]
      }),
      gens: [oneSinToCos, oneTangent, oneFromTangent, oneDifferenceOfSquares, oneSquareOfSum]
    },
    {
      title: 'Funkcje trygonometryczne kątów od 0° do 180°',
      short_title: 'Kąty rozwarte',
      pill: pill({
        essence: T`Sinus, cosinus i tangens określa się także dla kątów rozwartych (od $90^\circ$ do $180^\circ$). Ich wartości sprowadzasz do kąta ostrego wzorami redukcyjnymi: $\sin(180^\circ - \alpha) = \sin\alpha$, $\cos(180^\circ - \alpha) = -\cos\alpha$, $\operatorname{tg}(180^\circ - \alpha) = -\operatorname{tg}\alpha$. Wniosek: sinus kąta rozwartego jest dodatni, a cosinus i tangens – ujemne. Jedynka trygonometryczna działa bez zmian.`,
        context: 'Zadanie 18–20 w arkuszu • 1 pkt. Potrzebne także w twierdzeniu cosinusów i wzorze na pole trójkąta.',
        pl: T`Kąt rozwarty „pożycza” wartości od swojego ostrego sąsiada: $150^\circ$ od $30^\circ$, $135^\circ$ od $45^\circ$, $120^\circ$ od $60^\circ$ (zawsze dopełnienie do $180^\circ$). Sinus pożycza bez zmian, cosinus i tangens – z minusem.`,
        steps: [
          ['Znajdź kąt ostry', T`$150^\circ = 180^\circ - 30^\circ$.`, 'Dopełnienie do 180°.'],
          ['Odczytaj wartość dla kąta ostrego', T`$\cos 30^\circ = \frac{\sqrt{3}}{2}$.`, 'Z tabeli na str. 12.'],
          ['Ustal znak', T`Cosinus kąta rozwartego jest ujemny: $\cos 150^\circ = -\frac{\sqrt{3}}{2}$.`, 'Sinus +, cosinus −, tangens −.']
        ],
        formulas: [
          ['Sinus', T`\sin(180^\circ - \alpha) = \sin\alpha`, 13],
          ['Cosinus', T`\cos(180^\circ - \alpha) = -\cos\alpha`, 13],
          ['Tangens', T`\operatorname{tg}(180^\circ - \alpha) = -\operatorname{tg}\alpha`, 13]
        ],
        examples: [
          ['Wartość', '1 pkt', T`Oblicz $\sin 150^\circ - \cos 120^\circ$.`, T`1. $\sin 150^\circ = \sin 30^\circ = \frac{1}{2}$.` + '\n' + T`2. $\cos 120^\circ = -\cos 60^\circ = -\frac{1}{2}$.` + '\n' + T`3. $\frac{1}{2} - \left(-\frac{1}{2}\right) = 1$.`, 'Odejmowanie liczby ujemnej to dodawanie.'],
          ['Kąt rozwarty i jedynka', '1 pkt', T`Kąt $\alpha$ jest rozwarty i $\sin\alpha = \frac{4}{5}$. Oblicz $\cos\alpha$.`, T`1. $\cos^2\alpha = 1 - \frac{16}{25} = \frac{9}{25}$.` + '\n' + T`2. Kąt rozwarty, więc $\cos\alpha = -\frac{3}{5}$.`, 'Znak wynika z rodzaju kąta.']
        ],
        trap: T`Po spierwiastkowaniu $\cos^2\alpha$ dla kąta ROZWARTEGO wybierasz wartość ujemną. Odruchowe wpisanie plusa to strata punktu.`,
        fail: T`Kąt rozwarty, $\sin\alpha = \frac{4}{5}$: „$\cos\alpha = \frac{3}{5}$”.`,
        win: T`$\cos\alpha = -\frac{3}{5}$, bo cosinus kąta rozwartego jest ujemny.`,
        why: 'Na osi liczbowej cosinus opisuje „poziome” położenie – kąt rozwarty wychyla się na lewą, ujemną stronę.',
        ckeTip: 'Wzory redukcyjne są w karcie wzorów na str. 13 – nie musisz ich pamiętać.',
        points: [T`Kąt rozwarty: $\sin > 0$, $\cos < 0$, $\operatorname{tg} < 0$.`, T`$120^\circ \to 60^\circ$, $135^\circ \to 45^\circ$, $150^\circ \to 30^\circ$.`, T`Jedynka trygonometryczna obowiązuje dla każdego kąta.`]
      }),
      gens: [obtValue, obtFromSin, obtExpression, obtSigns, obtAngle]
    },
    {
      title: 'Pole trójkąta z sinusem i twierdzenie cosinusów',
      short_title: 'Pole i twierdzenie cosinusów',
      time: '~6 min',
      pill: pill({
        essence: T`Gdy znasz dwa boki trójkąta i kąt między nimi, masz dwa potężne wzory. Pole: $P = \frac{1}{2}ab\sin\gamma$ – bez szukania wysokości. Trzeci bok z twierdzenia cosinusów: $c^2 = a^2 + b^2 - 2ab\cos\gamma$ – to uogólnione twierdzenie Pitagorasa. Twierdzenie cosinusów działa też w drugą stronę: z trzech boków wyznaczysz cosinus dowolnego kąta i sprawdzisz, czy trójkąt jest ostrokątny, prostokątny czy rozwartokątny.`,
        context: 'Zadanie zamknięte za 1 pkt lub otwarte za 2–3 pkt w części planimetrycznej arkusza.',
        pl: T`Twierdzenie cosinusów to Pitagoras z poprawką. Dla kąta prostego poprawka znika (bo $\cos 90^\circ = 0$). Dla kąta ostrego trzeci bok jest krótszy, niż mówiłby Pitagoras, a dla rozwartego – dłuższy. Stąd minus we wzorze i ujemny cosinus kąta rozwartego, który ten minus odwraca.`,
        steps: [
          ['Sprawdź, co masz', T`Dwa boki i kąt MIĘDZY nimi – oba wzory działają od razu.`, 'Kąt musi leżeć między danymi bokami.'],
          ['Pole', T`$a = 6$, $b = 8$, $\gamma = 30^\circ$: $P = \frac{1}{2} \cdot 6 \cdot 8 \cdot \frac{1}{2} = 12$.`, 'Sinus z tabeli.'],
          ['Trzeci bok', T`$a = 3$, $b = 8$, $\gamma = 60^\circ$: $c^2 = 9 + 64 - 2 \cdot 3 \cdot 8 \cdot \frac{1}{2} = 49$, $c = 7$.`, 'Na końcu pierwiastek.']
        ],
        formulas: [
          ['Pole trójkąta', T`P = \frac{1}{2} \cdot a \cdot b \cdot \sin\gamma`, 15],
          ['Twierdzenie cosinusów', T`c^2 = a^2 + b^2 - 2ab\cos\gamma`, 14],
          ['Rodzaj trójkąta', T`c^2 < a^2 + b^2 \ \text{(ostrokątny)}, \quad c^2 > a^2 + b^2 \ \text{(rozwartokątny)}`]
        ],
        examples: [
          ['Kąt rozwarty', '2 pkt', T`Boki trójkąta mają długości $3$ i $5$, a kąt między nimi $120^\circ$. Oblicz trzeci bok.`, T`1. $\cos 120^\circ = -\frac{1}{2}$.` + '\n' + T`2. $c^2 = 9 + 25 - 2 \cdot 3 \cdot 5 \cdot \left(-\frac{1}{2}\right) = 34 + 15 = 49$.` + '\n' + T`3. $c = 7$.`, 'Minus razy minus daje plus.'],
          ['Cosinus kąta', '2 pkt', T`Boki trójkąta mają długości $4$, $5$, $6$. Oblicz cosinus największego kąta.`, T`1. Największy kąt leży naprzeciw boku $6$.` + '\n' + T`2. $36 = 16 + 25 - 40\cos\gamma$.` + '\n' + T`3. $\cos\gamma = \frac{5}{40} = \frac{1}{8}$.`, 'Cosinus dodatni – trójkąt ostrokątny.']
        ],
        trap: T`Dla kąta rozwartego cosinus jest ujemny, więc $-2ab\cos\gamma$ staje się DODATNIE. Trzeci bok wychodzi dłuższy niż z Pitagorasa.`,
        fail: T`$a = 3$, $b = 5$, $\gamma = 120^\circ$: „$c^2 = 9 + 25 - 15 = 19$”.`,
        win: T`$c^2 = 9 + 25 - 2 \cdot 3 \cdot 5 \cdot \left(-\frac{1}{2}\right) = 49$.`,
        why: 'Im większy kąt między dwoma bokami, tym dalej od siebie są ich końce – a więc tym dłuższy trzeci bok.',
        ckeTip: 'Oba wzory znajdziesz w karcie wzorów (str. 14 i 15). Na poziomie podstawowym wymagane jest twierdzenie cosinusów – twierdzenie sinusów obowiązuje dopiero na rozszerzeniu.',
        points: [T`Pole: $\frac{1}{2}ab\sin\gamma$ – kąt między bokami.`, T`Trzeci bok: twierdzenie cosinusów, na końcu pierwiastek.`, T`$\cos\gamma < 0$ oznacza kąt rozwarty.`]
      }),
      gens: [areaSine, cosineLawSide, cosineLawAngle, triangleKind, areaRhombus]
    }
  ]
};
