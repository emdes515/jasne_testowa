import { T, mc, num, pf, open, pill, fr, m, need } from '../math_pp/lib.js';
import { pickTwo, co, frs } from './common.js';
import { surd, sTex, sVal, sMul, sDiv, sinS, root, rad } from './geo.js';

const TIP_CYCLIC = 'Karta wzorów, str. 20: na czworokącie można opisać okrąg wtedy i tylko wtedy, gdy sumy przeciwległych kątów są równe $180^\\circ$.';
const TIP_TANGENT = 'Karta wzorów, str. 20: w czworokąt wypukły można wpisać okrąg wtedy i tylko wtedy, gdy sumy długości przeciwległych boków są równe.';
const TIP_SINES = 'Karta wzorów, str. 14: $\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma} = 2R$. Bok i kąt NAPRZECIW niego – twierdzenie sinusów.';
const TIP_COSINES = 'Karta wzorów, str. 14: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$. Dwa boki i kąt MIĘDZY nimi albo trzy boki – twierdzenie cosinusów.';
const TIP_THALES = 'Twierdzenie odwrotne do twierdzenia Talesa: jeśli odcinki na ramionach kąta są proporcjonalne, to proste są równoległe.';

const deg = (x) => `${x}^\\circ`;
const SPECIAL = [30, 45, 60, 120, 135, 150];
/** Promień okręgu opisanego R = a / (2 sin α) jako liczba (n/d)√r. */
const radius = (a, alpha) => sDiv(surd(a), sMul(surd(2), sinS(alpha)));
/** Drugi kąt specjalny tak, by suma dwóch kątów była mniejsza niż 180°. */
const secondAngle = (r, alpha) => {
  const opts = SPECIAL.filter((x) => x !== alpha && x + alpha < 180);
  need(opts.length > 0);
  return r.pick(opts);
};

// ---------- 9.1 Czworokąt wpisany w okrąg ----------
const cyclicOpposite = (r) => {
  const a = r.int(50, 130);
  const b = r.intNot(50, 130, a);
  const askC = r.bool();
  const ans = askC ? 180 - a : 180 - b;
  return mc({
    title: 'Kąty czworokąta wpisanego w okrąg',
    q: T`Czworokąt $ABCD$ jest wpisany w okrąg, $|\angle DAB| = ${deg(a)}$ i $|\angle ABC| = ${deg(b)}$. Miara kąta ${askC ? 'BCD' : 'CDA'} jest równa`,
    ok: m(deg(ans)),
    val: ans,
    bad: [m(deg(askC ? a : b)), m(deg(askC ? 180 - b : 180 - a)), m(deg(360 - a - b)), m(deg(90 - (askC ? a : b) / 2))].filter((x) => !x.includes('.')),
    steps: [
      T`Kąt ${askC ? 'BCD' : 'CDA'} leży naprzeciw kąta ${askC ? 'DAB' : 'ABC'}.`,
      T`W czworokącie wpisanym w okrąg przeciwległe kąty sumują się do $180^\circ$: $180^\circ - ${deg(askC ? a : b)} = ${deg(ans)}$.`
    ],
    trap: 'Sumę $180^\\circ$ dają kąty PRZECIWLEGŁE, a nie sąsiednie.',
    tip: TIP_CYCLIC
  });
};

const cyclicDiagonal = (r) => {
  const x = r.int(20, 70);
  const y = r.int(20, 80);
  need(x + y < 160);
  const variant = r.int(0, 1);
  if (variant === 0) {
    return num({
      title: 'Kąty przy przekątnej czworokąta wpisanego',
      q: T`Czworokąt $ABCD$ jest wpisany w okrąg, $|\angle BAC| = ${deg(x)}$ i $|\angle CAD| = ${deg(y)}$. Oblicz miarę kąta $BCD$ (w stopniach). Wpisz liczbę.`,
      ans: 180 - x - y,
      steps: [T`$|\angle DAB| = ${deg(x)} + ${deg(y)} = ${deg(x + y)}$.`, T`Kąt $BCD$ jest przeciwległy do $DAB$: $180^\circ - ${deg(x + y)} = ${deg(180 - x - y)}$.`],
      trap: 'Kąt czworokąta przy wierzchołku $A$ to suma OBU kątów, na które dzieli go przekątna.',
      tip: TIP_CYCLIC
    });
  }
  return num({
    title: 'Kąty wpisane oparte na tym samym łuku',
    q: T`Czworokąt $ABCD$ jest wpisany w okrąg, $|\angle BAC| = ${deg(x)}$ i $|\angle ACD| = ${deg(y)}$. Oblicz miarę kąta $BDC$ (w stopniach). Wpisz liczbę.`,
    ans: x,
    steps: [T`Kąty $BAC$ i $BDC$ są wpisane i oparte na tym samym łuku $BC$.`, T`Kąty wpisane oparte na tym samym łuku są równe: $|\angle BDC| = ${deg(x)}$.`],
    trap: T`Kąt $ACD$ to dystraktor – opiera się na łuku $AD$, a nie $BC$.`,
    tip: 'Karta wzorów, str. 18: kąty wpisane oparte na tym samym łuku są równe.'
  });
};

const cyclicRatio = (r) => {
  const p = r.int(1, 7);
  const q = r.intNot(1, 7, p);
  need(180 % (p + q) === 0);
  const A = (180 * p) / (p + q);
  return num({
    title: 'Kąty przeciwległe w stosunku',
    q: T`Czworokąt $ABCD$ jest wpisany w okrąg, a miary kątów $DAB$ i $BCD$ są w stosunku $${p} : ${q}$. Oblicz miarę kąta $DAB$ (w stopniach). Wpisz liczbę.`,
    ans: A,
    steps: [T`$|\angle DAB| + |\angle BCD| = 180^\circ$, więc $${co(p, 'k')} + ${co(q, 'k')} = 180^\circ$, czyli $k = ${deg(180 / (p + q))}$.`, T`$|\angle DAB| = ${p} \cdot ${deg(180 / (p + q))} = ${deg(A)}$.`],
    trap: 'Do proporcji dzielisz $180^\\circ$, a nie $360^\\circ$ – suma dotyczy tylko pary kątów przeciwległych.',
    tip: TIP_CYCLIC
  });
};

const CYCLIC_FACTS = [
  ['Na każdym prostokącie można opisać okrąg.', true, 'Przeciwległe kąty prostokąta sumują się do $180^\\circ$.'],
  ['Na każdym rombie można opisać okrąg.', false, 'Romb, który nie jest kwadratem, ma równe przeciwległe kąty różne od $90^\\circ$ – ich suma nie wynosi $180^\\circ$.'],
  ['Na każdym trapezie równoramiennym można opisać okrąg.', true, 'Kąty przy podstawie są równe, a kąty przy ramieniu sumują się do $180^\\circ$, więc przeciwległe też.'],
  ['Jeśli czworokąt jest wpisany w okrąg, to jego przeciwległe kąty są równe.', false, 'Przeciwległe kąty sumują się do $180^\\circ$; równe są tylko w prostokącie.'],
  ['Kąty wpisane oparte na tym samym łuku mają równe miary.', true, 'To własność kątów wpisanych.']
];

const cyclicFacts = (r) => {
  const [s1] = pickTwo(r, CYCLIC_FACTS);
  const a = r.int(60, 120);
  const c = r.bool() ? 180 - a : 180 - a + r.pick([-10, 10, 20]);
  const b = r.int(60, 120);
  const d = 360 - a - b - c;
  need(d > 30 && d < 170);
  return pf({
    title: 'Czworokąt wpisany w okrąg',
    s1,
    s2: [T`Na czworokącie o kątach (kolejno) $${deg(a)}, ${deg(b)}, ${deg(c)}, ${deg(d)}$ można opisać okrąg.`, a + c === 180, T`$${deg(a)} + ${deg(c)} = ${deg(a + c)}$${a + c === 180 ? '' : T` \ne 180^\circ`}.`],
    trap: 'Sprawdzasz sumę PRZECIWLEGŁYCH kątów: pierwszego z trzecim.',
    tip: TIP_CYCLIC
  });
};

const openCyclic = (r) => {
  const beta = r.pick([60, 120]);
  const a = r.int(2, 9);
  const c = r.intNot(2, 9, a);
  const ac2 = a * a + c * c + (beta === 120 ? a * c : -a * c);
  const AC = root(ac2);
  const R = sDiv(AC, sMul(surd(2), sinS(beta)));
  need(Math.abs(sVal(R) - Math.sqrt(ac2) / (2 * Math.sin(rad(beta)))) < 1e-9);
  return open({
    title: 'Czworokąt wpisany: przekątna i promień',
    q: T`Czworokąt $ABCD$ jest wpisany w okrąg, $|AB| = ${a}$, $|BC| = ${c}$ i $|\angle ABC| = ${deg(beta)}$. Oblicz miarę kąta $ADC$, długość przekątnej $AC$ oraz promień okręgu opisanego na tym czworokącie.`,
    stages: [
      [1, 'Etap 1', T`Miara kąta $ADC$: $180^\circ - ${deg(beta)} = ${deg(180 - beta)}$.`],
      [2, 'Etap 2', T`Długość przekątnej z twierdzenia cosinusów: $|AC| = ${sTex(AC)}$.`],
      [3, 'Komplet', T`Promień z twierdzenia sinusów w trójkącie $ABC$: $R = ${sTex(R)}$.`]
    ],
    steps: [
      T`Kąty $ABC$ i $ADC$ są przeciwległe: $|\angle ADC| = ${deg(180 - beta)}$.`,
      T`$|AC|^2 = ${a}^2 + ${c}^2 - 2 \cdot ${a} \cdot ${c} \cdot \cos ${deg(beta)} = ${ac2}$, więc $|AC| = ${sTex(AC)}$.`,
      T`Okrąg opisany na czworokącie jest opisany na trójkącie $ABC$: $2R = \frac{|AC|}{\sin ${deg(beta)}}$, więc $R = ${sTex(R)}$.`
    ],
    trap: T`$\cos 120^\circ = -\frac{1}{2}$ – minus zamienia odejmowanie w dodawanie. Pomyłka znaku daje złą przekątną.`,
    tip: TIP_SINES,
    answer: m(T`|\angle ADC| = ${deg(180 - beta)}, \ |AC| = ${sTex(AC)}, \ R = ${sTex(R)}`)
  });
};

// ---------- 9.2 Czworokąt opisany na okręgu ----------
const tangentialSide = (r) => {
  const a = r.int(3, 15);
  const b = r.int(3, 15);
  const c = r.int(3, 15);
  const d = a + c - b;
  need(d >= 2 && d < a + b + c && b !== d);
  return num({
    title: 'Bok czworokąta opisanego na okręgu',
    q: T`W czworokąt $ABCD$ można wpisać okrąg, $|AB| = ${a}$, $|BC| = ${b}$ i $|CD| = ${c}$. Oblicz $|DA|$. Wpisz liczbę.`,
    ans: d,
    steps: [T`Boki przeciwległe: $AB$ i $CD$ oraz $BC$ i $DA$. Warunek: $|AB| + |CD| = |BC| + |DA|$.`, T`$${a} + ${c} = ${b} + |DA|$, więc $|DA| = ${d}$.`],
    trap: 'Pary boków przeciwległych to $AB$ z $CD$ oraz $BC$ z $DA$ – nie sąsiednie boki.',
    tip: TIP_TANGENT
  });
};

const trapezoidLeg = (r) => {
  const a = r.int(6, 20);
  const b = r.int(2, a - 2);
  const leg = surd(a + b, 2);
  return mc({
    title: 'Trapez równoramienny opisany na okręgu',
    q: T`Trapez równoramienny o podstawach długości $${a}$ i $${b}$ jest opisany na okręgu. Ramię tego trapezu ma długość`,
    ok: m(sTex(leg)),
    val: (a + b) / 2,
    bad: [m(fr(a - b, 2)), m(`${a + b}`), m(sTex(root(a * b))), m(fr(a + b, 4))],
    steps: [T`Warunek okręgu wpisanego: $${a} + ${b} = 2c$, gdzie $c$ to ramię.`, T`$c = ${frs(a + b, 2)}$.`],
    trap: 'Suma podstaw równa się sumie OBU ramion – dzielisz przez 2.',
    tip: TIP_TANGENT
  });
};

const tangentialArea = (r) => {
  const rr = r.int(2, 9);
  const a = r.int(4, 15);
  const c = r.int(3, 15);
  return num({
    title: 'Pole czworokąta opisanego na okręgu',
    q: T`W czworokąt $ABCD$ wpisano okrąg o promieniu $${rr}$, a $|AB| = ${a}$ i $|CD| = ${c}$. Oblicz pole tego czworokąta. Wpisz liczbę.`,
    ans: rr * (a + c),
    steps: [
      T`Z warunku $|AB| + |CD| = |BC| + |DA|$ obwód to $2(${a} + ${c}) = ${2 * (a + c)}$, a połowa obwodu $p = ${a + c}$.`,
      T`Pole figury opisanej na okręgu: $P = r \cdot p = ${rr} \cdot ${a + c} = ${rr * (a + c)}$.`
    ],
    trap: 'We wzorze $P = r \\cdot p$ jest POŁOWA obwodu, a nie cały obwód.',
    tip: TIP_TANGENT
  });
};

const TANGENT_FACTS = [
  ['W każdy romb można wpisać okrąg.', true, 'Wszystkie boki rombu są równe, więc sumy przeciwległych boków są równe.'],
  ['W każdy prostokąt można wpisać okrąg.', false, 'Prostokąt, który nie jest kwadratem, ma $a + a \\ne b + b$.'],
  ['W każdy deltoid wypukły można wpisać okrąg.', true, 'Deltoid ma dwie pary równych boków sąsiednich, więc $a + b = b + a$.'],
  ['Jeśli w czworokąt można wpisać okrąg, to można też opisać na nim okrąg.', false, 'Np. romb niebędący kwadratem ma okrąg wpisany, ale nie opisany.']
];

const tangentialFacts = (r) => {
  const [s1] = pickTwo(r, TANGENT_FACTS);
  const a = r.int(3, 12);
  const b = r.int(3, 12);
  const c = r.int(3, 12);
  const d = r.bool() ? a + c - b : a + c - b + r.pick([-1, 1, 2]);
  need(d >= 2 && d < a + b + c);
  return pf({
    title: 'Czworokąt opisany na okręgu',
    s1,
    s2: [T`W czworokąt wypukły o bokach (kolejno) $${a}, ${b}, ${c}, ${d}$ można wpisać okrąg.`, a + c === b + d, T`$${a} + ${c} = ${a + c}$, a $${b} + ${d} = ${b + d}$.`],
    trap: 'Dodajesz boki PRZECIWLEGŁE: pierwszy z trzecim i drugi z czwartym.',
    tip: TIP_TANGENT
  });
};

const openTangentialTrapezoid = (r) => {
  const a = r.int(6, 20);
  const b = r.int(2, a - 2);
  need((a + b) % 2 === 0);
  const leg = (a + b) / 2;
  const h = root(a * b);
  const rr = sMul(h, surd(1, 2));
  const P = sMul(surd(a + b, 2), h);
  need(Math.abs(sVal(h) - Math.sqrt(leg * leg - ((a - b) / 2) ** 2)) < 1e-9);
  return open({
    title: 'Trapez równoramienny opisany na okręgu',
    q: T`Trapez równoramienny $ABCD$ o podstawach $|AB| = ${a}$ i $|CD| = ${b}$ jest opisany na okręgu. Oblicz promień tego okręgu i pole trapezu.`,
    stages: [
      [1, 'Etap 1', T`Ramię z warunku $|AB| + |CD| = 2c$: $c = ${leg}$.`],
      [2, 'Etap 2', T`Wysokość z twierdzenia Pitagorasa: $h^2 = ${leg}^2 - ${(a - b) / 2}^2$, czyli $h = ${sTex(h)}$.`],
      [3, 'Etap 3', T`Promień: wysokość to średnica okręgu, $r = ${sTex(rr)}$.`],
      [4, 'Komplet', T`Pole trapezu: $P = ${sTex(P)}$.`]
    ],
    steps: [
      T`Okrąg wpisany: $${a} + ${b} = 2c$, więc ramię $c = ${leg}$.`,
      T`Rzut ramienia na dłuższą podstawę ma długość $\frac{${a} - ${b}}{2} = ${fr(a - b, 2)}$, więc $h = \sqrt{${leg * leg} - ${fr((a - b) ** 2, 4)}} = ${sTex(h)}$.`,
      T`Odległość między podstawami to średnica okręgu: $r = \frac{h}{2} = ${sTex(rr)}$.`,
      T`$P = \frac{${a} + ${b}}{2} \cdot h = ${sTex(P)}$.`
    ],
    trap: 'Wysokość trapezu opisanego na okręgu jest równa ŚREDNICY, a nie promieniowi.',
    tip: TIP_TANGENT,
    answer: m(T`r = ${sTex(rr)}, \ P = ${sTex(P)}`)
  });
};

// ---------- 9.3 Twierdzenie sinusów ----------
const radiusChoice = (r) => {
  const a = r.int(2, 12);
  const alpha = r.pick(SPECIAL);
  const R = radius(a, alpha);
  const val = a / (2 * Math.sin(rad(alpha)));
  return mc({
    title: 'Promień okręgu opisanego',
    q: T`W trójkącie $ABC$ bok $BC$ ma długość $${a}$, a $|\angle BAC| = ${deg(alpha)}$. Promień okręgu opisanego na tym trójkącie jest równy`,
    ok: m(sTex(R)),
    val,
    bad: [m(sTex(sMul(R, surd(2)))), m(sTex(sMul(surd(a, 2), sinS(alpha)))), m(sTex(sMul(R, surd(1, 2)))), m(sTex(sDiv(surd(a), sinS(alpha === 150 ? 60 : 150))))],
    steps: [T`Bok $BC$ leży naprzeciw kąta $A$: $\frac{${a}}{\sin ${deg(alpha)}} = 2R$.`, T`$\sin ${deg(alpha)} = ${sTex(sinS(alpha))}$, więc $R = ${sTex(R)}$.`],
    trap: T`Twierdzenie sinusów daje $2R$, a nie $R$ – nie zapomnij podzielić przez 2.`,
    tip: TIP_SINES
  });
};

const radiusInteger = (r) => {
  const k = r.int(2, 15);
  const [alpha, aTex] = r.pick([
    [30, `${k}`],
    [150, `${k}`],
    [45, sTex(surd(k, 1, 2))],
    [135, sTex(surd(k, 1, 2))],
    [60, sTex(surd(k, 1, 3))],
    [120, sTex(surd(k, 1, 3))]
  ]);
  return num({
    title: 'Promień z twierdzenia sinusów',
    q: T`W trójkącie $ABC$: $|AB| = ${aTex}$ i $|\angle ACB| = ${deg(alpha)}$. Oblicz promień okręgu opisanego na tym trójkącie. Wpisz liczbę.`,
    ans: k,
    steps: [T`$2R = \frac{|AB|}{\sin ${deg(alpha)}} = \frac{${aTex}}{${sTex(sinS(alpha))}} = ${2 * k}$.`, T`$R = ${k}$.`],
    trap: alpha > 90 ? T`Kąt rozwarty ma ten sam sinus co kąt ostry: $\sin ${deg(alpha)} = \sin ${deg(180 - alpha)}$.` : T`Wzór daje średnicę $2R$ – wynik trzeba jeszcze podzielić przez 2.`,
    tip: TIP_SINES
  });
};

const sideFromSines = (r) => {
  const alpha = r.pick(SPECIAL);
  const beta = secondAngle(r, alpha);
  const a = r.int(2, 12);
  const b = sDiv(sMul(surd(a), sinS(beta)), sinS(alpha));
  const val = (a * Math.sin(rad(beta))) / Math.sin(rad(alpha));
  return mc({
    title: 'Bok z twierdzenia sinusów',
    q: T`W trójkącie $ABC$: $|BC| = ${a}$, $|\angle BAC| = ${deg(alpha)}$ i $|\angle ABC| = ${deg(beta)}$. Długość boku $AC$ jest równa`,
    ok: m(sTex(b)),
    val,
    bad: [m(sTex(sDiv(sMul(surd(a), sinS(alpha)), sinS(beta)))), m(sTex(sMul(surd(a), sinS(beta)))), m(sTex(sMul(b, surd(2)))), m(sTex(sMul(b, surd(1, 2))))],
    steps: [T`$\frac{|BC|}{\sin A} = \frac{|AC|}{\sin B}$, więc $|AC| = \frac{${a} \cdot \sin ${deg(beta)}}{\sin ${deg(alpha)}}$.`, T`$|AC| = \frac{${a} \cdot ${sTex(sinS(beta))}}{${sTex(sinS(alpha))}} = ${sTex(b)}$.`],
    trap: 'Każdy bok łączysz z kątem leżącym NAPRZECIW niego: $BC$ z kątem $A$, $AC$ z kątem $B$.',
    tip: TIP_SINES
  });
};

const SINE_FACTS = [
  ['W każdym trójkącie naprzeciw większego kąta leży dłuższy bok.', true, 'Wynika to z twierdzenia sinusów (i z nierówności dla kątów trójkąta).'],
  [T`Jeśli w trójkącie $\sin\beta = \frac{1}{2}$, to $\beta = 30^\circ$.`, false, T`Możliwe jest też $\beta = 150^\circ$ – trzeba sprawdzić drugi kąt.`],
  [T`W trójkącie wpisanym w okrąg o promieniu $R$ każdy bok ma długość co najwyżej $2R$.`, true, T`$a = 2R\sin\alpha \le 2R$.`],
  ['Twierdzenie sinusów stosujemy, gdy znamy dwa boki i kąt między nimi.', false, 'Wtedy stosujemy twierdzenie cosinusów; sinusy – gdy znamy bok i kąt naprzeciw niego.']
];

const sineFacts = (r) => {
  const [s1] = pickTwo(r, SINE_FACTS);
  const a = r.int(2, 10);
  const alpha = r.pick([30, 150, 90]);
  const claimed = r.bool() ? (alpha === 90 ? a / 2 : a) : alpha === 90 ? a : a / 2;
  const truth = Math.abs(claimed - a / (2 * Math.sin(rad(alpha)))) < 1e-9;
  return pf({
    title: 'Twierdzenie sinusów',
    s1,
    s2: [T`Jeśli w trójkącie bok długości $${a}$ leży naprzeciw kąta $${deg(alpha)}$, to promień okręgu opisanego jest równy $${fr(claimed * 2, 2)}$.`, truth, T`$R = \frac{${a}}{2\sin ${deg(alpha)}} = ${fr(a * (alpha === 90 ? 1 : 2), 2)}$.`],
    trap: T`Wzór daje $2R$, nie $R$.`,
    tip: TIP_SINES
  });
};

const openSines = (r) => {
  const alpha = r.pick(SPECIAL);
  const beta = secondAngle(r, alpha);
  const a = r.int(2, 12);
  const b = sDiv(sMul(surd(a), sinS(beta)), sinS(alpha));
  const R = radius(a, alpha);
  return open({
    title: 'Rozwiązywanie trójkąta twierdzeniem sinusów',
    q: T`W trójkącie $ABC$: $|BC| = ${a}$, $|\angle BAC| = ${deg(alpha)}$ i $|\angle ABC| = ${deg(beta)}$. Oblicz długość boku $AC$ oraz promień okręgu opisanego na tym trójkącie.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie twierdzenia sinusów dla par bok–kąt naprzeciwległy: $\frac{|BC|}{\sin A} = \frac{|AC|}{\sin B} = 2R$.`],
      [2, 'Etap 2', T`Obliczenie $|AC| = ${sTex(b)}$.`],
      [3, 'Komplet', T`Obliczenie $R = ${sTex(R)}$.`]
    ],
    steps: [
      T`$\frac{${a}}{\sin ${deg(alpha)}} = \frac{|AC|}{\sin ${deg(beta)}} = 2R$.`,
      T`$|AC| = \frac{${a} \cdot ${sTex(sinS(beta))}}{${sTex(sinS(alpha))}} = ${sTex(b)}$.`,
      T`$2R = \frac{${a}}{${sTex(sinS(alpha))}}$, więc $R = ${sTex(R)}$.`
    ],
    trap: 'Usuń niewymierność z mianownika – wynik typu $\\frac{6}{\\sqrt{2}}$ zapisz jako $3\\sqrt{2}$.',
    tip: TIP_SINES,
    answer: m(T`|AC| = ${sTex(b)}, \ R = ${sTex(R)}`)
  });
};

// ---------- 9.4 Rozwiązywanie trójkątów ----------
/** Trójkąty o bokach całkowitych z kątem 60° lub 120° naprzeciw boku c. */
const NICE = [
  [3, 5, 7, 120], [7, 8, 13, 120], [5, 16, 19, 120], [11, 24, 31, 120], [7, 33, 37, 120],
  [3, 8, 7, 60], [5, 8, 7, 60], [8, 15, 13, 60], [7, 15, 13, 60], [5, 21, 19, 60], [16, 21, 19, 60]
];
const pickNice = (r) => {
  const [a, b, c, g] = r.pick(NICE);
  const k = r.pick([1, 1, 2]);
  return [a * k, b * k, c * k, g];
};

const thirdSide = (r) => {
  const [a, b, c, g] = pickNice(r);
  return num({
    title: 'Trzeci bok z twierdzenia cosinusów',
    q: T`W trójkącie $ABC$: $|AC| = ${a}$, $|BC| = ${b}$ i $|\angle ACB| = ${deg(g)}$. Oblicz $|AB|$. Wpisz liczbę.`,
    ans: c,
    steps: [
      T`$|AB|^2 = ${a}^2 + ${b}^2 - 2 \cdot ${a} \cdot ${b} \cdot \cos ${deg(g)}$, a $\cos ${deg(g)} = ${g === 60 ? '\\frac{1}{2}' : '-\\frac{1}{2}'}$.`,
      T`$|AB|^2 = ${a * a + b * b} ${g === 60 ? '-' : '+'} ${a * b} = ${c * c}$, więc $|AB| = ${c}$.`
    ],
    trap: T`$\cos 120^\circ$ jest ujemny – wtedy iloczyn $ab$ DODAJESZ.`,
    tip: TIP_COSINES
  });
};

const cosFromSides = (r) => {
  const a = r.int(3, 12);
  const b = r.int(3, 12);
  const c = r.int(Math.abs(a - b) + 1, a + b - 1);
  const top = a * a + b * b - c * c;
  need(top !== 0 && c !== a && c !== b);
  const val = top / (2 * a * b);
  return mc({
    title: 'Cosinus kąta z trzech boków',
    q: T`Trójkąt ma boki długości $${a}$, $${b}$ i $${c}$. Cosinus kąta leżącego naprzeciw boku długości $${c}$ jest równy`,
    ok: m(fr(top, 2 * a * b)),
    val,
    bad: [m(fr(-top, 2 * a * b)), m(fr(top, a * b)), m(fr(a * a + b * b + c * c, 2 * a * b)), m(fr(b * b + c * c - a * a, 2 * b * c))],
    steps: [T`$${c}^2 = ${a}^2 + ${b}^2 - 2 \cdot ${a} \cdot ${b} \cdot \cos\gamma$.`, T`$\cos\gamma = \frac{${a * a} + ${b * b} - ${c * c}}{${2 * a * b}} = ${fr(top, 2 * a * b)}$.`],
    trap: 'Kąt leży naprzeciw boku $c$ – to $c^2$ odejmujesz w liczniku.',
    tip: TIP_COSINES
  });
};

const triangleKind = (r) => {
  const mk = () => {
    const a = r.int(3, 12);
    const b = r.int(a, 14);
    const c = r.int(b, a + b - 1);
    const s = a * a + b * b - c * c;
    const kind = s < 0 ? 'rozwartokątny' : s === 0 ? 'prostokątny' : 'ostrokątny';
    const claim = r.bool() ? kind : r.pick(['rozwartokątny', 'prostokątny', 'ostrokątny'].filter((x) => x !== kind));
    return [T`Trójkąt o bokach $${a}$, $${b}$, $${c}$ jest ${claim}.`, claim === kind, T`$${a}^2 + ${b}^2 = ${a * a + b * b}$, $${c}^2 = ${c * c}$ – trójkąt jest ${kind}.`];
  };
  return pf({
    title: 'Rodzaj trójkąta z długości boków',
    s1: mk(),
    s2: mk(),
    trap: 'Porównujesz kwadrat NAJDŁUŻSZEGO boku z sumą kwadratów dwóch krótszych (znak cosinusa największego kąta).',
    tip: TIP_COSINES
  });
};

const areaSine = (r) => {
  const a = r.int(2, 14);
  const b = r.int(2, 14);
  const g = r.pick([30, 150, 90]);
  const P = (a * b * Math.sin(rad(g))) / 2;
  return num({
    title: 'Pole trójkąta z sinusem',
    q: T`Oblicz pole trójkąta, w którym dwa boki mają długości $${a}$ i $${b}$, a kąt między nimi ma miarę $${deg(g)}$. Wpisz liczbę.`,
    ans: Math.round(P * 100) / 100,
    steps: [T`$P = \frac{1}{2} \cdot ${a} \cdot ${b} \cdot \sin ${deg(g)}$, a $\sin ${deg(g)} = ${sTex(sinS(g))}$.`, T`$P = ${fr(a * b * (g === 90 ? 2 : 1), 4)}$.`],
    trap: T`$\sin 150^\circ = \sin 30^\circ = \frac{1}{2}$ – kąt rozwarty nie zmienia znaku sinusa.`,
    tip: 'Karta wzorów, str. 15: $P = \\frac{1}{2}ab\\sin\\gamma$.'
  });
};

const openSolveTriangle = (r) => {
  const [a, b, c, g] = pickNice(r);
  const P = surd(a * b, 4, 3);
  return open({
    title: 'Rozwiązanie trójkąta: kąt i pole',
    q: T`Trójkąt $ABC$ ma boki $|BC| = ${a}$, $|AC| = ${b}$ i $|AB| = ${c}$. Oblicz miarę kąta $ACB$ oraz pole tego trójkąta.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie twierdzenia cosinusów dla boku $AB$: $${c}^2 = ${a}^2 + ${b}^2 - 2 \cdot ${a} \cdot ${b} \cdot \cos\gamma$.`],
      [2, 'Etap 2', T`Obliczenie $\cos\gamma = ${g === 60 ? '\\frac{1}{2}' : '-\\frac{1}{2}'}$ i miary $\gamma = ${deg(g)}$.`],
      [3, 'Etap 3', T`Zastosowanie wzoru $P = \frac{1}{2}ab\sin\gamma$ z $\sin ${deg(g)} = \frac{\sqrt{3}}{2}$.`],
      [4, 'Komplet', T`Pole $P = ${sTex(P)}$.`]
    ],
    steps: [
      T`$${c * c} = ${a * a} + ${b * b} - ${2 * a * b}\cos\gamma$, więc $\cos\gamma = ${g === 60 ? '\\frac{1}{2}' : '-\\frac{1}{2}'}$.`,
      T`$\gamma = ${deg(g)}$.`,
      T`$P = \frac{1}{2} \cdot ${a} \cdot ${b} \cdot \frac{\sqrt{3}}{2} = ${sTex(P)}$.`
    ],
    trap: T`Ujemny cosinus oznacza kąt rozwarty: $\cos\gamma = -\frac{1}{2}$ daje $120^\circ$, a nie $60^\circ$.`,
    tip: TIP_COSINES,
    answer: m(T`|\angle ACB| = ${deg(g)}, \ P = ${sTex(P)}`)
  });
};

// ---------- 9.5 Odwrotne twierdzenie Talesa ----------
const parallelFacts = (r) => {
  const mk = () => {
    const a = r.int(2, 9);
    const b = r.int(2, 9);
    const c = r.int(2, 12);
    const d = r.bool() ? (b * c) / a : r.int(2, 12);
    need(Number.isInteger(d) && d > 0);
    const truth = a * d === b * c;
    return [
      T`Na jednym ramieniu kąta o wierzchołku $O$ leżą punkty $A$ i $A'$, a na drugim $B$ i $B'$, przy czym $|OA| = ${a}$, $|AA'| = ${b}$, $|OB| = ${c}$, $|BB'| = ${d}$. Proste $AB$ i $A'B'$ są równoległe.`,
      truth,
      T`$\frac{${a}}{${b}} ${truth ? '=' : '\\ne'} \frac{${c}}{${d}}$.`
    ];
  };
  return pf({ title: 'Odwrotne twierdzenie Talesa', s1: mk(), s2: mk(), trap: 'Porównujesz stosunki odpowiednich odcinków na OBU ramionach – mnożenie „na krzyż” szybko to sprawdza.', tip: TIP_THALES });
};

const thalesSegment = (r) => {
  const a = r.int(2, 10);
  const b = r.int(1, 10);
  const c = r.int(2, 15);
  const x = (c * (a + b)) / a;
  need(Math.abs(x * 100 - Math.round(x * 100)) < 1e-9);
  return num({
    title: 'Odcinek równoległy z twierdzenia Talesa',
    q: T`Na ramionach kąta o wierzchołku $O$ leżą punkty $A$, $A'$ (na jednym) oraz $B$, $B'$ (na drugim), a $AB \parallel A'B'$. Wiadomo, że $|OA| = ${a}$, $|AA'| = ${b}$ i $|AB| = ${c}$. Oblicz $|A'B'|$. Wpisz liczbę.`,
    ans: x,
    steps: [T`Trójkąty $OAB$ i $OA'B'$ są podobne: $\frac{|A'B'|}{|AB|} = \frac{|OA'|}{|OA|} = \frac{${a + b}}{${a}}$.`, T`$|A'B'| = ${c} \cdot \frac{${a + b}}{${a}} = ${fr(c * (a + b), a)}$.`],
    trap: T`W proporcji z odcinkami równoległymi bierzesz CAŁE odcinki od wierzchołka: $|OA'| = ${a} + ${b}$, a nie $|AA'|$.`,
    tip: TIP_THALES
  });
};

const parallelUnknown = (r) => {
  const a = r.int(2, 9);
  const c = r.int(2, 9);
  const d = r.intNot(2, 12, c);
  const x = (a * d) / c;
  return mc({
    title: 'Warunek równoległości prostych',
    q: T`Na ramionach kąta o wierzchołku $O$ leżą punkty $A$, $A'$ oraz $B$, $B'$, przy czym $|OA| = ${a}$, $|OB| = ${c}$ i $|BB'| = ${d}$. Proste $AB$ i $A'B'$ są równoległe, gdy $|AA'|$ jest równe`,
    ok: m(fr(a * d, c)),
    val: x,
    bad: [m(fr(c * d, a)), m(fr(a * c, d)), m(fr(a * (c + d), c)), m(fr(d, 1))],
    steps: [T`Z odwrotnego twierdzenia Talesa proste są równoległe, gdy $\frac{|OA|}{|AA'|} = \frac{|OB|}{|BB'|}$.`, T`$\frac{${a}}{|AA'|} = \frac{${c}}{${d}}$, więc $|AA'| = ${fr(a * d, c)}$.`],
    trap: 'Odcinki z jednego ramienia stoją w jednym ułamku, z drugiego – w drugim. Mieszanie ramion psuje proporcję.',
    tip: TIP_THALES
  });
};

const trapezoidDiagonal = (r) => {
  const a = r.int(4, 16);
  const b = r.int(2, a - 1);
  const d = r.int(5, 20);
  const x = (d * a) / (a + b);
  need(Math.abs(x * 100 - Math.round(x * 100)) < 1e-9);
  return num({
    title: 'Podział przekątnej trapezu',
    q: T`W trapezie $ABCD$ podstawy mają długości $|AB| = ${a}$ i $|CD| = ${b}$, a przekątna $AC$ ma długość $${d}$. Przekątne przecinają się w punkcie $S$. Oblicz $|AS|$. Wpisz liczbę.`,
    ans: x,
    steps: [T`Trójkąty $ABS$ i $CDS$ są podobne (kąty naprzemianległe przy równoległych podstawach): $\frac{|AS|}{|SC|} = \frac{${a}}{${b}}$.`, T`$|AS| = ${d} \cdot \frac{${a}}{${a + b}} = ${fr(d * a, a + b)}$.`],
    trap: T`Stosunek $|AS| : |SC|$ to $${a} : ${b}$, więc $|AS|$ to $\frac{${a}}{${a + b}}$ przekątnej, a nie $\frac{${a}}{${b}}$.`,
    tip: 'Karta wzorów, str. 17: w trójkątach podobnych odpowiednie boki są proporcjonalne.'
  });
};

const openTrapezoidLegs = (r) => {
  const a = r.int(5, 16);
  const b = r.int(2, a - 2);
  const c = r.int(2, 12);
  const sd = surd(c * b, a - b);
  return open({
    title: 'Przedłużenie ramion trapezu',
    q: T`W trapezie $ABCD$ podstawy mają długości $|AB| = ${a}$ i $|CD| = ${b}$, a ramię $AD$ ma długość $${c}$. Przedłużenia ramion $AD$ i $BC$ przecinają się w punkcie $S$. Oblicz $|SD|$.`,
    stages: [
      [1, 'Etap 1', T`Uzasadnienie podobieństwa trójkątów $SDC$ i $SAB$ (lub zastosowanie twierdzenia Talesa, bo $CD \parallel AB$).`],
      [2, 'Etap 2', T`Zapisanie proporcji $\frac{|SD|}{|SD| + ${c}} = \frac{${b}}{${a}}$.`],
      [3, 'Komplet', T`Obliczenie $|SD| = ${sTex(sd)}$.`]
    ],
    steps: [
      T`$CD \parallel AB$, więc trójkąty $SDC$ i $SAB$ są podobne (wspólny kąt przy $S$ i kąty odpowiadające).`,
      T`$\frac{|SD|}{|SA|} = \frac{|DC|}{|AB|}$, czyli $\frac{x}{x + ${c}} = \frac{${b}}{${a}}$.`,
      T`$${a}x = ${b}x + ${b * c}$, więc $x = ${sTex(sd)}$.`
    ],
    trap: T`$|SA| = |SD| + |DA|$ – w proporcji porównujesz odcinki od punktu $S$, a nie sam odcinek $AD$.`,
    tip: TIP_THALES,
    answer: m(T`|SD| = ${sTex(sd)}`)
  });
};

export default {
  numericId: 9,
  title: 'Planimetria: okręgi, czworokąty, rozwiązywanie trójkątów',
  short_title: 'Planimetria',
  description: 'Czworokąty wpisane i opisane, twierdzenia sinusów i cosinusów, rozwiązywanie trójkątów i odwrotne twierdzenie Talesa.',
  icon: 'CircleDot',
  color: '#FFB800',
  matura_points_range: '4–6 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 14–20',
  cke_stats: 'W 11 z 11 arkuszy CKE 2022–2026, średnio 5,0 pkt na arkusz (VIII.R1 – 9 zadań, 34 pkt).',
  lessons: [
    {
      title: 'Czworokąt wpisany w okrąg',
      short_title: 'Czworokąt wpisany',
      requirements: ['VIII.R1'],
      prereq: ['math-lesson-9-4'],
      pill: pill({
        essence: T`Na czworokącie można opisać okrąg wtedy i tylko wtedy, gdy sumy jego przeciwległych kątów są równe $180^\circ$. Wierzchołki leżą wtedy na jednym okręgu, więc działają też kąty wpisane: kąty oparte na tym samym łuku są równe.`,
        context: 'Czworokąty wpisane i opisane (VIII.R1) to jedno z najczęstszych wymagań PR – 9 zadań i 34 pkt w arkuszach 2022–2026.',
        pl: T`Narysuj okrąg i cztery punkty na nim. Kąt przy $A$ „patrzy” na jeden łuk $BD$, a kąt przy $C$ – na drugi. Razem łuki dają cały okrąg, czyli $360^\circ$, a kąty wpisane są połowami łuków: $180^\circ$.`,
        steps: [
          ['Rozpoznaj', 'Wierzchołki na okręgu = czworokąt wpisany.', 'Też: „opisano okrąg”.'],
          ['Przeciwległe kąty', T`$\alpha + \gamma = 180^\circ$, $\beta + \delta = 180^\circ$.`, 'Pierwszy z trzecim, drugi z czwartym.'],
          ['Kąty wpisane', 'Oparte na tym samym łuku – równe.', 'Szukaj par przy przekątnych.']
        ],
        formulas: [
          ['Okrąg opisany', T`\alpha + \gamma = \beta + \delta = 180^\circ`, 20],
          ['Kąty wpisane', T`|\angle BAC| = |\angle BDC|`, 18],
          ['Promień', T`2R = \frac{a}{\sin\alpha}`, 14]
        ],
        examples: [
          ['Kąt przeciwległy', '1 pkt', T`$ABCD$ wpisany w okrąg, $|\angle A| = 70^\circ$. Oblicz $|\angle C|$.`, T`1. $|\angle A| + |\angle C| = 180^\circ$.` + '\n' + T`2. $|\angle C| = 110^\circ$.`, 'Przeciwległe – suma 180°.'],
          ['Przekątna', '2 pkt', T`$|\angle BAC| = 35^\circ$, $|\angle CAD| = 40^\circ$. Oblicz $|\angle BCD|$.`, T`1. $|\angle BAD| = 75^\circ$.` + '\n' + T`2. $|\angle BCD| = 180^\circ - 75^\circ = 105^\circ$.`, 'Kąt przy A to suma dwóch części.']
        ],
        trap: T`Sumę $180^\circ$ dają kąty PRZECIWLEGŁE. Kąty sąsiednie sumują się do $180^\circ$ tylko w trapezie (przy ramieniu).`,
        fail: T`„$|\angle A| = 70^\circ$, więc $|\angle B| = 110^\circ$.”`,
        win: T`$|\angle C| = 110^\circ$, a o $|\angle B|$ nic jeszcze nie wiemy.`,
        why: 'Warunek dotyczy par kątów przeciwległych.',
        ckeTip: 'Napisz wprost: „czworokąt jest wpisany w okrąg, więc $\\alpha + \\gamma = 180^\\circ$” – uzasadnienie kroku jest punktowane.',
        points: ['Przeciwległe kąty: suma 180°.', 'Kąty wpisane na tym samym łuku są równe.', 'R z twierdzenia sinusów.']
      }),
      gens: [cyclicOpposite, cyclicDiagonal, cyclicRatio, cyclicFacts, openCyclic]
    },
    {
      title: 'Czworokąt opisany na okręgu',
      short_title: 'Czworokąt opisany',
      requirements: ['VIII.R1'],
      prereq: ['math-lesson-9-5'],
      pill: pill({
        essence: T`W czworokąt wypukły można wpisać okrąg wtedy i tylko wtedy, gdy sumy długości jego przeciwległych boków są równe: $a + c = b + d$. Pole takiego czworokąta to $P = r \cdot p$, gdzie $p$ to połowa obwodu. W trapezie opisanym na okręgu wysokość jest równa średnicy.`,
        context: 'Trapez opisany na okręgu to klasyk zadań PR za 3–5 pkt: z warunku boków wychodzi ramię, z Pitagorasa wysokość, a z niej promień.',
        pl: T`Z każdego wierzchołka wychodzą dwa odcinki styczne tej samej długości. Każdy bok to suma dwóch takich odcinków, więc w sumach przeciwległych boków pojawiają się te same kawałki – sumy muszą być równe.`,
        steps: [
          ['Warunek', T`$a + c = b + d$.`, 'Boki przeciwległe.'],
          ['Trapez', 'Suma podstaw = suma ramion.', 'Równoramienny: ramię = połowa sumy podstaw.'],
          ['Pole', T`$P = r \cdot p$ albo z wysokości $h = 2r$.`, 'p – połowa obwodu.']
        ],
        formulas: [
          ['Okrąg wpisany', T`a + c = b + d`, 20],
          ['Pole', T`P = r \cdot p`],
          ['Trapez', T`h = 2r`]
        ],
        examples: [
          ['Czwarty bok', '1 pkt', T`Boki $5$, $7$, $9$ i $x$ (kolejno), w czworokąt wpisano okrąg. Oblicz $x$.`, T`1. $5 + 9 = 7 + x$.` + '\n' + T`2. $x = 7$.`, 'Pierwszy z trzecim.'],
          ['Trapez', '3 pkt', T`Trapez równoramienny o podstawach $8$ i $2$ opisany na okręgu. Oblicz $r$.`, T`1. Ramię: $\frac{8 + 2}{2} = 5$.` + '\n' + T`2. $h^2 = 25 - 9 = 16$, $h = 4$.` + '\n' + T`3. $r = 2$.`, 'Wysokość to średnica.']
        ],
        trap: T`Wysokość trapezu opisanego na okręgu to ŚREDNICA, czyli $2r$ – częsty błąd to $h = r$.`,
        fail: T`„$h = 4$, więc $r = 4$.”`,
        win: T`$r = \frac{h}{2} = 2$.`,
        why: 'Okrąg dotyka obu podstaw, więc odległość między nimi to średnica.',
        ckeTip: 'Zapisz warunek $a + c = b + d$ z nazwami boków – samo podstawienie liczb bez uzasadnienia może stracić punkt.',
        points: ['a + c = b + d.', 'P = r · p.', 'W trapezie h = 2r.']
      }),
      gens: [tangentialSide, trapezoidLeg, tangentialArea, tangentialFacts, openTangentialTrapezoid]
    },
    {
      title: 'Twierdzenie sinusów',
      short_title: 'Twierdzenie sinusów',
      requirements: ['VII.R7'],
      prereq: ['math-lesson-8-4'],
      pill: pill({
        essence: T`W każdym trójkącie stosunek boku do sinusa kąta leżącego naprzeciw niego jest stały i równy średnicy okręgu opisanego: $\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R$. Stosujesz je, gdy znasz bok i kąt naprzeciw niego.`,
        context: 'Twierdzenie sinusów (VII.R7) to nowe narzędzie PR. Najczęściej służy do obliczenia promienia okręgu opisanego albo boku przy dwóch znanych kątach.',
        pl: T`Każdy bok ma „swój” kąt – ten, który na niego patrzy z przeciwległego wierzchołka. Para bok–kąt naprzeciw daje zawsze tę samą liczbę $2R$.`,
        steps: [
          ['Pary', 'Bok i kąt NAPRZECIW niego.', 'BC z kątem A.'],
          ['Proporcja', T`$\frac{a}{\sin\alpha} = \frac{b}{\sin\beta}$.`, 'Albo = 2R.'],
          ['Wynik', 'Usuń niewymierność z mianownika.', 'Np. 6/√2 = 3√2.']
        ],
        formulas: [
          ['Twierdzenie sinusów', T`\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R`, 14],
          ['Kąt rozwarty', T`\sin(180^\circ - \alpha) = \sin\alpha`, 13],
          ['Wartości', T`\sin 45^\circ = \frac{\sqrt{2}}{2}, \ \sin 60^\circ = \frac{\sqrt{3}}{2}`, 12]
        ],
        examples: [
          ['Promień', '1 pkt', T`$a = 6$, $\alpha = 30^\circ$. Oblicz $R$.`, T`1. $2R = \frac{6}{\frac{1}{2}} = 12$.` + '\n' + T`2. $R = 6$.`, 'Wzór daje 2R.'],
          ['Bok', '2 pkt', T`$|BC| = 6$, $\angle A = 45^\circ$, $\angle B = 60^\circ$. Oblicz $|AC|$.`, T`1. $|AC| = \frac{6 \cdot \frac{\sqrt{3}}{2}}{\frac{\sqrt{2}}{2}} = \frac{6\sqrt{3}}{\sqrt{2}}$.` + '\n' + T`2. $|AC| = 3\sqrt{6}$.`, 'AC leży naprzeciw kąta B.']
        ],
        trap: T`Z $\sin\beta = \frac{1}{2}$ wynikają dwa kąty: $30^\circ$ albo $150^\circ$. Sprawdź, czy oba mieszczą się w trójkącie.`,
        fail: T`„$\sin\beta = \frac{1}{2}$, więc $\beta = 30^\circ$.”`,
        win: T`$\beta = 30^\circ$ lub $\beta = 150^\circ$; odrzucasz ten, przy którym suma kątów przekracza $180^\circ$.`,
        why: 'Sinus jest dodatni w I i II ćwiartce.',
        ckeTip: 'Wypisz, który bok leży naprzeciw którego kąta – egzaminator sprawdza poprawność pary.',
        points: ['Bok i kąt naprzeciw.', 'Wynik to 2R.', 'Sinus kąta rozwartego = sinus kąta ostrego.']
      }),
      gens: [radiusChoice, radiusInteger, sideFromSines, sineFacts, openSines]
    },
    {
      title: 'Rozwiązywanie trójkątów: sinusy i cosinusy',
      short_title: 'Rozwiązywanie trójkątów',
      requirements: ['VII.R8', 'VIII.12'],
      prereq: ['math-lesson-8-5'],
      pill: pill({
        essence: T`Rozwiązać trójkąt to obliczyć brakujące boki i kąty. Dwa boki i kąt między nimi albo trzy boki – twierdzenie cosinusów $c^2 = a^2 + b^2 - 2ab\cos\gamma$. Bok i kąt naprzeciw – twierdzenie sinusów. Pole liczysz ze wzoru $P = \frac{1}{2}ab\sin\gamma$.`,
        context: 'Rozwiązywanie trójkątów (VII.R8) pojawia się jako etap zadań 4–6 pkt z planimetrii i stereometrii.',
        pl: T`Twierdzenie cosinusów to „Pitagoras z poprawką”: dla kąta prostego poprawka $2ab\cos 90^\circ$ znika. Dla kąta rozwartego cosinus jest ujemny, więc trzeci bok wychodzi dłuższy niż w Pitagorasie.`,
        steps: [
          ['Wybierz narzędzie', 'Kąt między bokami → cosinusy; kąt naprzeciw → sinusy.', 'Trzy boki → cosinusy.'],
          ['Policz', T`Uważaj na znak $\cos$ kąta rozwartego.`, T`$\cos 120^\circ = -\frac{1}{2}$.`],
          ['Pole', T`$P = \frac{1}{2}ab\sin\gamma$.`, 'Kąt między bokami a i b.']
        ],
        formulas: [
          ['Twierdzenie cosinusów', T`c^2 = a^2 + b^2 - 2ab\cos\gamma`, 14],
          ['Pole', T`P = \frac{1}{2}ab\sin\gamma`, 15],
          ['Rodzaj trójkąta', T`c^2 > a^2 + b^2 \ \text{– kąt rozwarty}`]
        ],
        examples: [
          ['Trzeci bok', '1 pkt', T`$a = 3$, $b = 5$, $\gamma = 120^\circ$. Oblicz $c$.`, T`1. $c^2 = 9 + 25 + 15 = 49$.` + '\n' + T`2. $c = 7$.`, 'Minus razy minus – dodajesz.'],
          ['Kąt', '2 pkt', T`Boki $5$, $8$, $7$. Oblicz kąt naprzeciw boku $7$.`, T`1. $\cos\gamma = \frac{25 + 64 - 49}{80} = \frac{1}{2}$.` + '\n' + T`2. $\gamma = 60^\circ$.`, 'Naprzeciw c odejmujesz c².']
        ],
        trap: T`Przy $\cos 120^\circ = -\frac{1}{2}$ wyraz $-2ab\cos\gamma$ staje się DODATNI. Zgubiony minus daje za krótki bok.`,
        fail: T`„$c^2 = 9 + 25 - 15 = 19$.”`,
        win: T`$c^2 = 9 + 25 + 15 = 49$, $c = 7$.`,
        why: T`$-2 \cdot 3 \cdot 5 \cdot \left(-\frac{1}{2}\right) = +15$.`,
        ckeTip: 'Zapisz wzór z podstawionymi liczbami przed obliczeniem – za poprawny zapis jest punkt nawet przy błędzie rachunkowym.',
        points: ['Cosinusy: kąt między bokami albo trzy boki.', 'Sinusy: bok i kąt naprzeciw.', 'P = ½ab sin γ.']
      }),
      gens: [thirdSide, cosFromSides, triangleKind, areaSine, openSolveTriangle]
    },
    {
      title: 'Odwrotne twierdzenie Talesa i zadania wieloetapowe',
      short_title: 'Odwrotne tw. Talesa',
      requirements: ['VIII.R2', 'VIII.8'],
      prereq: ['math-lesson-9-2'],
      pill: pill({
        essence: T`Twierdzenie Talesa mówi: proste równoległe wycinają na ramionach kąta odcinki proporcjonalne. Twierdzenie odwrotne: jeśli odcinki są proporcjonalne, $\frac{|OA|}{|AA'|} = \frac{|OB|}{|BB'|}$, to proste $AB$ i $A'B'$ są równoległe. Proporcje z trójkątów podobnych rozwiązują też zadania z trapezem.`,
        context: 'Odwrotne twierdzenie Talesa (VIII.R2) służy jako argument w dowodach równoległości, a proporcje z podobieństwa – jako etap zadań z trapezem.',
        pl: T`Jeśli na obu ramionach kąta „idziesz” w tym samym tempie (np. na każdym ramieniu robisz krok 2 razy dłuższy od poprzedniego), to końce kroków łączą proste równoległe.`,
        steps: [
          ['Odcinki', 'Wypisz odcinki na obu ramionach.', 'Od wierzchołka O.'],
          ['Proporcja', T`$\frac{|OA|}{|AA'|} = \frac{|OB|}{|BB'|}$.`, 'Mnożenie na krzyż.'],
          ['Wniosek', 'Równe stosunki – proste równoległe.', 'Różne – nie są.']
        ],
        formulas: [
          ['Talesa', T`\frac{|OA|}{|OA'|} = \frac{|OB|}{|OB'|} = \frac{|AB|}{|A'B'|}`, 17],
          ['Odwrotne', T`\frac{|OA|}{|AA'|} = \frac{|OB|}{|BB'|} \ \text{więc} \ AB \parallel A'B'`],
          ['Trapez', T`\frac{|AS|}{|SC|} = \frac{|AB|}{|CD|}`]
        ],
        examples: [
          ['Równoległość', '1 pkt', T`$|OA| = 4$, $|AA'| = 6$, $|OB| = 6$, $|BB'| = 9$. Czy $AB \parallel A'B'$?`, T`1. $\frac{4}{6} = \frac{2}{3}$ i $\frac{6}{9} = \frac{2}{3}$.` + '\n' + T`2. Tak.`, 'Równe stosunki.'],
          ['Trapez', '3 pkt', T`$|AB| = 10$, $|CD| = 6$, $|AD| = 4$. Oblicz $|SD|$ (przecięcie ramion).`, T`1. $\frac{x}{x + 4} = \frac{6}{10}$.` + '\n' + T`2. $10x = 6x + 24$, $x = 6$.`, 'Odcinki od punktu S.']
        ],
        trap: T`W proporcji odcinka równoległego bierzesz CAŁE odcinki od wierzchołka: $\frac{|AB|}{|A'B'|} = \frac{|OA|}{|OA'|}$, a nie $\frac{|OA|}{|AA'|}$.`,
        fail: T`„$\frac{|A'B'|}{|AB|} = \frac{|AA'|}{|OA|}$.”`,
        win: T`$\frac{|A'B'|}{|AB|} = \frac{|OA'|}{|OA|}$.`,
        why: 'Podobne są trójkąty OAB i OA′B′ – ich boki zaczynają się w O.',
        ckeTip: 'W dowodzie równoległości powołaj się z nazwy na twierdzenie odwrotne do twierdzenia Talesa.',
        points: ['Proporcjonalne odcinki – proste równoległe.', 'Odcinki równoległe: całe od wierzchołka.', 'Trapez: przekątne dzielą się w stosunku podstaw.']
      }),
      gens: [parallelFacts, thalesSegment, parallelUnknown, trapezoidDiagonal, openTrapezoidLegs]
    }
  ]
};
