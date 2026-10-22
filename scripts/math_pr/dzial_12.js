import { T, mc, num, pf, open, pill, fr, m, need, sq } from '../math_pp/lib.js';
import { pickTwo } from './common.js';
import { surd, sTex, sVal, sMul, sDiv, root } from './geo.js';

const TIP_CUBOID = 'Karta wzorów, str. 24: przekątna prostopadłościanu $d = \\sqrt{a^2 + b^2 + c^2}$. Kąt prostej z płaszczyzną to kąt między prostą a jej rzutem na tę płaszczyznę.';
const TIP_PYR = 'Karta wzorów, str. 25: w ostrosłupie prawidłowym czworokątnym kąt krawędzi bocznej z podstawą leży w trójkącie z połową PRZEKĄTNEJ, a kąt ściany bocznej – w trójkącie z połową KRAWĘDZI podstawy.';
const TIP_SECTION = 'Przekrój to wielokąt, w którym płaszczyzna przecina bryłę. Narysuj odcinki przecięcia na ścianach, a pole licz z wysokości wyznaczonej twierdzeniem o trzech prostopadłych.';
const TIP_VOLUME = 'Karta wzorów, str. 24–25: $V_{\\text{ostrosłupa}} = \\frac{1}{3}P_pH$, $V_{\\text{stożka}} = \\frac{1}{3}\\pi r^2H$, $V_{\\text{walca}} = \\pi r^2H$.';

/** Łańcuch równości bez powtórzeń: chain('\\frac{7}{10}', '\\frac{7}{10}') -> "\frac{7}{10}". */
const chain = (...xs) => xs.filter((x, i) => i === 0 || x !== xs[i - 1]).join(' = ');
/** Wyrażenie liczbowe razy π: \frac{9\sqrt{3}}{8}\pi. */
const piTex = (s) => (s.n === 1 && s.d === 1 && s.r === 1 ? '\\pi' : `${sTex(s)}\\pi`);
const QUADS = [[1, 2, 2], [2, 3, 6], [1, 4, 8], [2, 6, 9], [4, 4, 7], [2, 10, 11], [6, 6, 7], [3, 4, 12], [2, 5, 14], [8, 9, 12], [1, 12, 12], [4, 8, 8], [6, 10, 15]];
const PYTH = [[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5]];
const TRIPLES = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17]];

// ---------- 12.1 Trzy prostopadłe i kąt dwuścienny ----------
const cuboidDiagonal = (r) => {
  const [a, b, c] = r.shuffle(r.pick(QUADS));
  const k = r.pick([1, 1, 2]);
  const d = k * Math.sqrt(a * a + b * b + c * c);
  return num({
    title: 'Przekątna prostopadłościanu',
    q: T`Krawędzie prostopadłościanu mają długości $${k * a}$, $${k * b}$ i $${k * c}$. Oblicz długość przekątnej tego prostopadłościanu. Wpisz liczbę.`,
    ans: d,
    steps: [T`$d^2 = ${k * a}^2 + ${k * b}^2 + ${k * c}^2 = ${d * d}$.`, T`$d = ${d}$.`],
    trap: 'Przekątna bryły to nie przekątna ściany – pod pierwiastkiem są kwadraty WSZYSTKICH trzech krawędzi.',
    tip: TIP_CUBOID
  });
};

const diagonalAngle = (r) => {
  const a = r.int(1, 8);
  const b = r.int(1, 8);
  const c = r.int(1, 10);
  const tg = sDiv(surd(c), root(a * a + b * b));
  return mc({
    title: 'Kąt przekątnej prostopadłościanu z podstawą',
    q: T`Prostopadłościan ma podstawę o wymiarach $${a} \times ${b}$ i wysokość $${c}$. Tangens kąta nachylenia przekątnej prostopadłościanu do płaszczyzny podstawy jest równy`,
    ok: m(sTex(tg)),
    val: c / Math.sqrt(a * a + b * b),
    bad: [m(sTex(sDiv(root(a * a + b * b), surd(c)))), m(sTex(sDiv(surd(c), root(a * a + b * b + c * c)))), m(fr(c, a + b)), m(fr(c, Math.max(a, b)))],
    steps: [T`Rzutem przekątnej na podstawę jest przekątna podstawy: $\sqrt{${a * a} + ${b * b}} = ${sq(a * a + b * b)}$.`, T`$\operatorname{tg}\alpha = ${chain(`\\frac{${c}}{${sq(a * a + b * b)}}`, sTex(tg))}$.`],
    trap: 'Przyprostokątna przy kącie to przekątna PODSTAWY, a nie krawędź podstawy.',
    tip: TIP_CUBOID
  });
};

const planeAngle = (r) => {
  const a = r.int(1, 8);
  const b = r.int(1, 8);
  const c = r.int(1, 10);
  // tg = c / h, h = ab / sqrt(a^2 + b^2)
  const tg = sDiv(sMul(surd(c), root(a * a + b * b)), surd(a * b));
  const val = (c * Math.sqrt(a * a + b * b)) / (a * b);
  need(Math.abs(sVal(tg) - val) < 1e-9);
  return mc({
    title: 'Kąt między płaszczyzną przekroju a podstawą',
    q: T`W prostopadłościanie $ABCDA'B'C'D'$ podstawa $ABCD$ ma wymiary $|AB| = ${a}$, $|BC| = ${b}$, a krawędź boczna ma długość $${c}$. Tangens kąta między płaszczyzną $BDC'$ a płaszczyzną podstawy jest równy`,
    ok: m(sTex(tg)),
    val,
    bad: [m(sTex(sDiv(surd(c), root(a * a + b * b)))), m(fr(c, a)), m(sTex(sDiv(surd(a * b), sMul(surd(c), root(a * a + b * b))))), m(fr(c, b))],
    steps: [
      T`Niech $E$ – spodek wysokości trójkąta $BCD$ z $C$. Wtedy $CE \perp BD$, a z twierdzenia o trzech prostopadłych $C'E \perp BD$; szukany kąt to $\angle CEC'$.`,
      T`$|CE| = \frac{${a} \cdot ${b}}{${sq(a * a + b * b)}}$, więc $\operatorname{tg}\angle CEC' = \frac{${c}}{|CE|} = ${sTex(tg)}$.`
    ],
    trap: 'Kąt dwuścienny mierzysz w płaszczyźnie PROSTOPADŁEJ do krawędzi $BD$ – nie przy wierzchołku $B$.',
    tip: TIP_CUBOID
  });
};

const PERP_FACTS = [
  ['Jeśli prosta jest prostopadła do dwóch przecinających się prostych płaszczyzny, to jest prostopadła do tej płaszczyzny.', true, 'To kryterium prostopadłości prostej do płaszczyzny.'],
  ['Prosta prostopadła do jednej prostej płaszczyzny jest prostopadła do całej płaszczyzny.', false, 'Potrzebne są dwie przecinające się proste płaszczyzny.'],
  ['Twierdzenie o trzech prostopadłych: prosta leżąca w płaszczyźnie jest prostopadła do prostej ukośnej wtedy i tylko wtedy, gdy jest prostopadła do jej rzutu.', true, 'To treść twierdzenia o trzech prostopadłych.'],
  ['Kąt nachylenia prostej do płaszczyzny to kąt między tą prostą a dowolną prostą płaszczyzny.', false, 'To kąt między prostą a jej RZUTEM na płaszczyznę.'],
  ['Kąt dwuścienny mierzymy między dwiema półprostymi prostopadłymi do krawędzi, wychodzącymi z jednego punktu krawędzi.', true, 'To definicja kąta liniowego kąta dwuściennego.']
];

const openPlaneAngle = (r) => {
  const [a, b] = r.pick(PYTH);
  const k = r.pick([1, 1, 2]);
  const c = r.int(2, 12);
  const [A, B] = [k * a, k * b];
  const d = k * Math.sqrt(a * a + b * b);
  const ce = surd(A * B, d);
  const tg = surd(c * d, A * B);
  need(Math.abs(sVal(tg) - c / sVal(ce)) < 1e-9);
  return open({
    title: 'Kąt między płaszczyzną a podstawą prostopadłościanu',
    q: T`W prostopadłościanie $ABCDA'B'C'D'$: $|AB| = ${A}$, $|BC| = ${B}$, $|CC'| = ${c}$. Oblicz tangens kąta, jaki płaszczyzna $BDC'$ tworzy z płaszczyzną podstawy $ABCD$.`,
    stages: [
      [1, 'Etap 1', T`Wskazanie kąta: $E$ – spodek wysokości z $C$ w trójkącie $BCD$; z twierdzenia o trzech prostopadłych $C'E \perp BD$, więc kąt to $\angle CEC'$.`],
      [2, 'Etap 2', T`Obliczenie $|BD| = ${d}$ i $|CE| = \frac{${A} \cdot ${B}}{${d}} = ${sTex(ce)}$.`],
      [3, 'Komplet', T`$\operatorname{tg}\angle CEC' = ${sTex(tg)}$.`]
    ],
    steps: [
      T`$CE \perp BD$ i $CC' \perp$ podstawy, więc z twierdzenia o trzech prostopadłych $C'E \perp BD$. Kąt między płaszczyznami to $\angle CEC'$.`,
      T`$|BD| = \sqrt{${A * A} + ${B * B}} = ${d}$. Pole trójkąta $BCD$: $\frac{1}{2} \cdot ${A} \cdot ${B} = \frac{1}{2} \cdot ${d} \cdot |CE|$, więc $|CE| = ${sTex(ce)}$.`,
      T`$\operatorname{tg}\angle CEC' = \frac{|CC'|}{|CE|} = \frac{${c}}{${sTex(ce)}} = ${sTex(tg)}$.`
    ],
    trap: T`Kąt nie leży przy wierzchołku $C$ krawędzi $BD$ – leży w punkcie $E$, gdzie odcinek z $C$ jest prostopadły do $BD$.`,
    tip: TIP_CUBOID,
    answer: m(T`\operatorname{tg}\alpha = ${sTex(tg)}`)
  });
};

// ---------- 12.2 Kąty w ostrosłupach ----------
const edgeAngle = (r) => {
  const a = r.int(2, 12);
  const H = r.int(1, 12);
  const tg = surd(H, a, 2);
  return mc({
    title: 'Kąt krawędzi bocznej z podstawą',
    q: T`Ostrosłup prawidłowy czworokątny ma krawędź podstawy $${a}$ i wysokość $${H}$. Tangens kąta nachylenia krawędzi bocznej do płaszczyzny podstawy jest równy`,
    ok: m(sTex(tg)),
    val: H / ((a * Math.SQRT2) / 2),
    bad: [m(fr(2 * H, a)), m(fr(H, a)), m(sTex(sDiv(surd(a, 2, 2), surd(H)))), m(fr(a, 2 * H))],
    steps: [T`Rzutem krawędzi bocznej na podstawę jest połowa przekątnej podstawy: $\frac{${a}\sqrt{2}}{2} = ${sTex(surd(a, 2, 2))}$.`, T`$\operatorname{tg}\alpha = \frac{${H}}{${sTex(surd(a, 2, 2))}} = ${sTex(tg)}$.`],
    trap: 'Przy kącie KRAWĘDZI bocznej leży połowa PRZEKĄTNEJ podstawy; połowa krawędzi podstawy jest przy kącie ŚCIANY bocznej.',
    tip: TIP_PYR
  });
};

const faceAngle = (r) => {
  const a = r.int(2, 12);
  const H = r.int(1, 12);
  return mc({
    title: 'Kąt ściany bocznej z podstawą',
    q: T`Ostrosłup prawidłowy czworokątny ma krawędź podstawy $${a}$ i wysokość $${H}$. Tangens kąta nachylenia ściany bocznej do płaszczyzny podstawy jest równy`,
    ok: m(fr(2 * H, a)),
    val: (2 * H) / a,
    bad: [m(sTex(surd(H, a, 2))), m(fr(H, a)), m(fr(a, 2 * H)), m(fr(H, 2 * a))],
    steps: [T`Kąt ściany bocznej leży w trójkącie: wysokość ostrosłupa, odcinek od środka podstawy do środka krawędzi ($\frac{${a}}{2}$) i wysokość ściany bocznej.`, T`$\operatorname{tg}\beta = ${chain(`\\frac{${H}}{${fr(a, 2)}}`, fr(2 * H, a))}$.`],
    trap: 'Ramię kąta ściany bocznej w podstawie jest prostopadłe do krawędzi podstawy – to połowa krawędzi, nie połowa przekątnej.',
    tip: TIP_PYR
  });
};

const pyramidHeight = (r) => {
  const [k, H, hs] = r.pick(TRIPLES);
  const t = r.pick([1, 2, 3]);
  return num({
    title: 'Wysokość ostrosłupa z wysokości ściany',
    q: T`W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $${2 * k * t}$, a wysokość ściany bocznej – $${hs * t}$. Oblicz wysokość ostrosłupa. Wpisz liczbę.`,
    ans: H * t,
    steps: [T`Wysokość ostrosłupa, połowa krawędzi podstawy ($${k * t}$) i wysokość ściany bocznej tworzą trójkąt prostokątny.`, T`$H = \sqrt{${hs * t}^2 - ${k * t}^2} = ${H * t}$.`],
    trap: 'W tym trójkącie przyprostokątna w podstawie to POŁOWA krawędzi.',
    tip: TIP_PYR
  });
};

const PYR_FACTS = [
  ['W ostrosłupie prawidłowym czworokątnym kąt nachylenia krawędzi bocznej do podstawy jest mniejszy od kąta nachylenia ściany bocznej do podstawy.', true, T`$\operatorname{tg}\alpha = \frac{H\sqrt{2}}{a} < \frac{2H}{a} = \operatorname{tg}\beta$.`],
  ['Spodek wysokości ostrosłupa prawidłowego czworokątnego to punkt przecięcia przekątnych podstawy.', true, 'Podstawa jest kwadratem, a spodek wysokości – jej środkiem.'],
  ['Kąt nachylenia ściany bocznej do podstawy to kąt między krawędzią boczną a podstawą.', false, 'To kąt między wysokością ściany bocznej a jej rzutem na podstawę.'],
  ['Spodek wysokości ostrosłupa prawidłowego trójkątnego dzieli wysokość podstawy w stosunku $2 : 1$, licząc od wierzchołka.', true, 'To środek ciężkości trójkąta równobocznego.'],
  ['Ściany boczne ostrosłupa prawidłowego są przystającymi trójkątami równoramiennymi.', true, 'Krawędzie boczne są równe, a krawędzie podstawy też.']
];

const openPyramid = (r) => {
  const k = r.int(1, 5);
  const H = r.int(1, 8);
  const a = 2 * k;
  const b2 = 2 * k * k + H * H;
  const half = surd(k, 1, 2);
  const cos = sDiv(half, root(b2));
  const V = surd(a * a * H, 3);
  need(Math.abs(sVal(cos) - (k * Math.SQRT2) / Math.sqrt(b2)) < 1e-9);
  return open({
    title: 'Ostrosłup prawidłowy czworokątny: kąt i objętość',
    q: T`W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $${a}$, a krawędź boczna ma długość $${sq(b2)}$. Oblicz wysokość ostrosłupa, cosinus kąta nachylenia krawędzi bocznej do płaszczyzny podstawy oraz objętość ostrosłupa.`,
    stages: [
      [1, 'Etap 1', T`Obliczenie połowy przekątnej podstawy: $${sTex(half)}$.`],
      [2, 'Etap 2', T`Obliczenie wysokości z twierdzenia Pitagorasa: $H = ${H}$.`],
      [3, 'Etap 3', T`Obliczenie $\cos\alpha = ${sTex(cos)}$.`],
      [4, 'Komplet', T`Obliczenie objętości $V = ${sTex(V)}$.`]
    ],
    steps: [
      T`Przekątna podstawy: $${a}\sqrt{2}$, połowa: $${sTex(half)}$.`,
      T`$H^2 = ${b2} - ${2 * k * k} = ${H * H}$, więc $H = ${H}$.`,
      T`$\cos\alpha = \frac{${sTex(half)}}{${sq(b2)}} = ${sTex(cos)}$.`,
      T`$V = \frac{1}{3} \cdot ${a}^2 \cdot ${H} = ${sTex(V)}$.`
    ],
    trap: 'Krawędź boczna, wysokość i POŁOWA PRZEKĄTNEJ tworzą trójkąt prostokątny – nie połowa krawędzi podstawy.',
    tip: TIP_PYR,
    answer: m(T`H = ${H}, \ \cos\alpha = ${sTex(cos)}, \ V = ${sTex(V)}`)
  });
};

// ---------- 12.3 Przekroje sześcianu ----------
const cubeTriangle = (r) => {
  const a = r.int(2, 12);
  const P = surd(a * a, 2, 3);
  return mc({
    title: 'Przekrój sześcianu – trójkąt równoboczny',
    q: T`Sześcian $ABCDA'B'C'D'$ ma krawędź długości $${a}$. Pole przekroju tego sześcianu płaszczyzną $BDA'$ jest równe`,
    ok: m(sTex(P)),
    val: (2 * a * a * Math.sqrt(3)) / 4,
    bad: [m(sTex(surd(a * a, 4, 3))), m(sTex(surd(a * a, 1, 2))), m(sTex(surd(a * a, 2))), m(sTex(surd(a * a, 1, 3)))],
    steps: [T`Boki $BD$, $DA'$, $A'B$ są przekątnymi ścian, więc mają długość $${a}\sqrt{2}$ – przekrój to trójkąt równoboczny.`.replace(/\$1\\sqrt/, '$\\sqrt'), T`$P = \frac{(${a}\sqrt{2})^2\sqrt{3}}{4} = ${sTex(P)}$.`.replace('(1\\sqrt{2})', '(\\sqrt{2})')],
    trap: 'Bok trójkąta to przekątna ściany $a\\sqrt{2}$, a nie krawędź $a$.',
    tip: TIP_SECTION
  });
};

const cuboidDiagSection = (r) => {
  const [a, b] = r.pick(PYTH);
  const k = r.pick([1, 2]);
  const c = r.int(2, 12);
  const d = k * Math.sqrt(a * a + b * b);
  return num({
    title: 'Przekrój przekątny prostopadłościanu',
    q: T`Prostopadłościan $ABCDA'B'C'D'$ ma krawędzie $|AB| = ${k * a}$, $|BC| = ${k * b}$ i $|AA'| = ${c}$. Oblicz pole przekroju tego prostopadłościanu płaszczyzną $ACC'A'$. Wpisz liczbę.`,
    ans: d * c,
    steps: [T`Przekrój $ACC'A'$ jest prostokątem o bokach $|AC|$ i $|AA'|$.`, T`$|AC| = \sqrt{${k * a}^2 + ${k * b}^2} = ${d}$, więc $P = ${d} \cdot ${c} = ${d * c}$.`],
    trap: 'Bokiem przekroju jest przekątna PODSTAWY – nie krawędź.',
    tip: TIP_SECTION
  });
};

const cubeRectangle = (r) => {
  const a = r.int(2, 12);
  const P = surd(a * a, 1, 2);
  return mc({
    title: 'Przekrój sześcianu – prostokąt',
    q: T`Sześcian $ABCDA'B'C'D'$ ma krawędź długości $${a}$. Pole przekroju tego sześcianu płaszczyzną przechodzącą przez krawędzie $AB$ i $C'D'$ jest równe`,
    ok: m(sTex(P)),
    val: a * a * Math.SQRT2,
    bad: [m(`${a * a}`), m(`${2 * a * a}`), m(sTex(surd(a * a, 1, 3))), m(sTex(surd(a * a, 2, 2)))],
    steps: [T`Przekrój $ABC'D'$ jest prostokątem: $|AB| = ${a}$, a $|BC'|$ to przekątna ściany: $${sTex(surd(a, 1, 2))}$.`, T`$P = ${a} \cdot ${sTex(surd(a, 1, 2))} = ${sTex(P)}$.`],
    trap: 'Drugi bok przekroju leży ukośnie na ścianie bocznej – to przekątna ściany.',
    tip: TIP_SECTION
  });
};

const CUBE_FACTS = [
  ['Przekrój sześcianu płaszczyzną może być sześciokątem foremnym.', true, 'Płaszczyzna przez środki sześciu krawędzi prostopadła do przekątnej sześcianu daje sześciokąt foremny.'],
  ['Przekrój sześcianu płaszczyzną może być pięciokątem.', true, 'Płaszczyzna może przeciąć pięć ścian sześcianu.'],
  ['Przekrój sześcianu płaszczyzną może być siedmiokątem.', false, 'Sześcian ma 6 ścian – przekrój ma co najwyżej 6 boków.'],
  [T`Przekrój sześcianu płaszczyzną $BDC'$ jest trójkątem prostokątnym.`, false, 'Wszystkie boki to przekątne ścian – trójkąt jest równoboczny.'],
  [T`Przekrój sześcianu płaszczyzną $ACC'A'$ jest prostokątem.`, true, T`Ma boki $a$ i $a\sqrt{2}$ oraz kąty proste.`]
];

const openCubeSection = (r) => {
  const k = r.int(1, 5);
  const a = 2 * k;
  const h = r.int(1, a);
  const ek2 = 2 * k * k + h * h;
  const P = surd(k, 1, 2 * ek2);
  const val = 0.5 * a * Math.SQRT2 * Math.sqrt(ek2);
  need(Math.abs(sVal(P) - val) < 1e-9);
  return open({
    title: 'Przekrój sześcianu przez przekątną podstawy',
    q: T`Sześcian $ABCDA'B'C'D'$ ma krawędź długości $${a}$. Punkt $K$ leży na krawędzi $CC'$ i $|CK| = ${h}$. Oblicz pole przekroju sześcianu płaszczyzną $BDK$.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że przekrój to trójkąt $BDK$, i obliczenie $|BD| = ${sTex(surd(a, 1, 2))}$.`],
      [2, 'Etap 2', T`Uzasadnienie, że $EK \perp BD$, gdzie $E$ – środek $BD$ (trójkąt równoramienny $|BK| = |DK|$ albo twierdzenie o trzech prostopadłych).`],
      [3, 'Etap 3', T`Obliczenie $|EK| = ${sq(ek2)}$ z trójkąta $ECK$ ($|EC| = ${sTex(surd(k, 1, 2))}$).`],
      [4, 'Komplet', T`Pole przekroju $P = ${sTex(P)}$.`]
    ],
    steps: [
      T`Płaszczyzna $BDK$ przecina sześcian wzdłuż trójkąta $BDK$; $|BD| = ${sTex(surd(a, 1, 2))}$.`,
      T`$|BK| = |DK|$, więc wysokość z $K$ pada na środek $E$ odcinka $BD$; $|EC| = \frac{1}{2}|AC| = ${sTex(surd(k, 1, 2))}$.`,
      T`$|EK|^2 = ${2 * k * k} + ${h * h} = ${ek2}$, więc $|EK| = ${sq(ek2)}$.`,
      T`$P = \frac{1}{2} \cdot ${sTex(surd(a, 1, 2))} \cdot ${sq(ek2)} = ${sTex(P)}$.`
    ],
    trap: 'Wysokość trójkąta $BDK$ to odcinek $EK$, a nie krawędź $CK$ – $CK$ jest prostopadła do podstawy, ale nie leży w płaszczyźnie przekroju.',
    tip: TIP_SECTION,
    answer: m(T`P = ${sTex(P)}`)
  });
};

// ---------- 12.4 Przekroje ostrosłupów prawidłowych ----------
const diagSection = (r) => {
  const a = r.int(2, 12);
  const H = r.int(2, 12);
  const P = surd(a * H, 2, 2);
  return mc({
    title: 'Przekrój ostrosłupa przez przekątną podstawy',
    q: T`Ostrosłup prawidłowy czworokątny $ABCDS$ ma krawędź podstawy $${a}$ i wysokość $${H}$. Pole przekroju tego ostrosłupa płaszczyzną $ACS$ jest równe`,
    ok: m(sTex(P)),
    val: 0.5 * a * Math.SQRT2 * H,
    bad: [m(fr(a * H, 2)), m(sTex(surd(a * H, 1, 2))), m(`${a * H}`), m(sTex(surd(a * H, 4, 2)))],
    steps: [T`Przekrój $ACS$ to trójkąt o podstawie $|AC| = ${sTex(surd(a, 1, 2))}$ i wysokości równej wysokości ostrosłupa.`, T`$P = \frac{1}{2} \cdot ${sTex(surd(a, 1, 2))} \cdot ${H} = ${sTex(P)}$.`],
    trap: 'Wysokością trójkąta $ACS$ jest wysokość OSTROSŁUPA (spada na środek $AC$), a nie wysokość ściany bocznej.',
    tip: TIP_SECTION
  });
};

const midSection = (r) => {
  const a = r.int(2, 14);
  const H = r.int(2, 14);
  return num({
    title: 'Przekrój ostrosłupa przez środki krawędzi',
    q: T`Ostrosłup prawidłowy czworokątny ma krawędź podstawy $${a}$ i wysokość $${H}$. Oblicz pole przekroju płaszczyzną przechodzącą przez wierzchołek ostrosłupa i środki dwóch przeciwległych krawędzi podstawy. Wpisz liczbę.`,
    ans: (a * H) / 2,
    steps: [T`Przekrój to trójkąt równoramienny o podstawie $${a}$ (odcinek łączący środki przeciwległych krawędzi) i wysokości $${H}$.`, T`$P = \frac{1}{2} \cdot ${a} \cdot ${H} = ${fr(a * H, 2)}$.`],
    trap: 'Ramionami tego trójkąta są wysokości ścian bocznych, a nie krawędzie boczne.',
    tip: TIP_SECTION
  });
};

const parallelSection = (r) => {
  const a = r.int(3, 15);
  const H = r.int(2, 12);
  const d = r.int(1, H - 1);
  const P = (a * a * d * d) / (H * H);
  need(Math.abs(P * 100 - Math.round(P * 100)) < 1e-9);
  return num({
    title: 'Przekrój równoległy do podstawy',
    q: T`Ostrosłup prawidłowy czworokątny ma krawędź podstawy $${a}$ i wysokość $${H}$. Oblicz pole przekroju płaszczyzną równoległą do podstawy, położoną w odległości $${d}$ od wierzchołka ostrosłupa. Wpisz liczbę.`,
    ans: P,
    steps: [T`Przekrój jest kwadratem podobnym do podstawy w skali $k = \frac{${d}}{${H}}$.`, T`$P = ${a}^2 \cdot \left(${fr(d, H)}\right)^2 = ${fr(a * a * d * d, H * H)}$.`],
    trap: 'Skala to stosunek odległości od WIERZCHOŁKA do całej wysokości; pole zmienia się z kwadratem skali.',
    tip: TIP_SECTION
  });
};

const PYR_SECTION_FACTS = [
  ['Przekrój ostrosłupa prawidłowego czworokątnego płaszczyzną przechodzącą przez wierzchołek i przekątną podstawy jest trójkątem równoramiennym.', true, 'Jego ramiona to dwie równe krawędzie boczne.'],
  ['Przekrój ostrosłupa prawidłowego czworokątnego płaszczyzną równoległą do podstawy jest kwadratem.', true, 'Jest podobny do podstawy.'],
  ['Przekrój ostrosłupa prawidłowego trójkątnego płaszczyzną równoległą do podstawy jest trójkątem prostokątnym.', false, 'Jest trójkątem równobocznym, podobnym do podstawy.'],
  ['Pole przekroju ostrosłupa płaszczyzną równoległą do podstawy w połowie wysokości to połowa pola podstawy.', false, T`Skala $\frac{1}{2}$, więc pole to $\frac{1}{4}$ pola podstawy.`],
  ['Przekrój ostrosłupa prawidłowego czworokątnego płaszczyzną przechodzącą przez wierzchołek i środki dwóch przeciwległych krawędzi podstawy zawiera wysokość ostrosłupa.', true, 'Odcinek łączący środki krawędzi przechodzi przez środek podstawy – spodek wysokości.']
];

const openPyramidSection = (r) => {
  const a = r.int(2, 10);
  const alpha = r.pick([45, 60]);
  const half = surd(a, 2, 2);
  const H = alpha === 45 ? half : sMul(half, root(3));
  const P = sMul(surd(1, 2), sMul(surd(a, 1, 2), H));
  const V = sMul(surd(a * a, 3), H);
  const Hval = ((a * Math.SQRT2) / 2) * Math.tan((alpha * Math.PI) / 180);
  need(Math.abs(sVal(H) - Hval) < 1e-9 && Math.abs(sVal(V) - (a * a * Hval) / 3) < 1e-9);
  return open({
    title: 'Przekrój ostrosłupa i objętość',
    q: T`W ostrosłupie prawidłowym czworokątnym $ABCDS$ krawędź podstawy ma długość $${a}$, a krawędź boczna jest nachylona do płaszczyzny podstawy pod kątem $${alpha}^\circ$. Oblicz pole przekroju płaszczyzną $ACS$ oraz objętość ostrosłupa.`,
    stages: [
      [1, 'Etap 1', T`Obliczenie $|AC| = ${sTex(surd(a, 1, 2))}$ i połowy przekątnej $${sTex(half)}$.`],
      [2, 'Etap 2', T`Obliczenie wysokości z funkcji trygonometrycznej: $H = ${sTex(H)}$.`],
      [3, 'Etap 3', T`Pole przekroju: $P = ${sTex(P)}$.`],
      [4, 'Komplet', T`Objętość: $V = ${sTex(V)}$.`]
    ],
    steps: [
      T`$|AC| = ${sTex(surd(a, 1, 2))}$; spodek wysokości $O$ to środek $AC$, więc $|AO| = ${sTex(half)}$.`,
      T`W trójkącie $AOS$: $\operatorname{tg} ${alpha}^\circ = \frac{H}{|AO|}$, więc $H = ${sTex(H)}$.`,
      T`Przekrój $ACS$: $P = \frac{1}{2} \cdot ${sTex(surd(a, 1, 2))} \cdot ${sTex(H)} = ${sTex(P)}$.`,
      T`$V = \frac{1}{3} \cdot ${a * a} \cdot ${sTex(H)} = ${sTex(V)}$.`
    ],
    trap: T`Kąt krawędzi bocznej leży przy połowie PRZEKĄTNEJ – dla $45^\circ$ wysokość to $\frac{a\sqrt{2}}{2}$, a nie $\frac{a}{2}$.`,
    tip: TIP_PYR,
    answer: m(T`P = ${sTex(P)}, \ V = ${sTex(V)}`)
  });
};

// ---------- 12.5 Bryły z trygonometrią ----------
const pyramidVolume = (r) => {
  const a = r.int(2, 12);
  const H = r.int(2, 15);
  need((a * a * H) % 3 === 0);
  return num({
    title: 'Objętość ostrosłupa',
    q: T`Oblicz objętość ostrosłupa prawidłowego czworokątnego o krawędzi podstawy $${a}$ i wysokości $${H}$. Wpisz liczbę.`,
    ans: (a * a * H) / 3,
    steps: [T`$V = \frac{1}{3}P_p \cdot H$, a $P_p = ${a}^2 = ${a * a}$.`, T`$V = \frac{1}{3} \cdot ${a * a} \cdot ${H} = ${(a * a * H) / 3}$.`],
    trap: T`Nie zapomnij o $\frac{1}{3}$ – bez niego liczysz objętość graniastosłupa.`,
    tip: TIP_VOLUME
  });
};

const coneVolume = (r) => {
  const alpha = r.pick([30, 45, 60]);
  const l = 2 * r.int(1, 6);
  // V = π r^2 H / 3
  const [rr, H] = alpha === 60 ? [surd(l, 2), surd(l, 2, 3)] : alpha === 30 ? [surd(l, 2, 3), surd(l, 2)] : [surd(l, 2, 2), surd(l, 2, 2)];
  const V = sMul(surd(1, 3), sMul(sMul(rr, rr), H));
  const val = (Math.PI * (l * Math.cos((alpha * Math.PI) / 180)) ** 2 * l * Math.sin((alpha * Math.PI) / 180)) / 3;
  need(Math.abs(sVal(V) * Math.PI - val) < 1e-9);
  const wrong = sMul(sMul(rr, rr), H);
  return mc({
    title: 'Objętość stożka z kątem nachylenia tworzącej',
    q: T`Tworząca stożka ma długość $${l}$ i jest nachylona do płaszczyzny podstawy pod kątem $${alpha}^\circ$. Objętość tego stożka jest równa`,
    ok: m(piTex(V)),
    val,
    bad: [m(piTex(wrong)), m(piTex(sMul(surd(1, 3), sMul(sMul(H, H), rr)))), m(piTex(sMul(surd(1, 3), sMul(rr, H)))), m(piTex(sMul(V, surd(2))))],
    steps: [T`$r = ${l} \cos ${alpha}^\circ = ${sTex(rr)}$, $H = ${l} \sin ${alpha}^\circ = ${sTex(H)}$.`, T`$V = \frac{1}{3}\pi r^2 H = ${piTex(V)}$.`],
    trap: 'Promień leży PRZY kącie (cosinus), wysokość NAPRZECIW kąta (sinus).',
    tip: TIP_VOLUME
  });
};

const coneNet = (r) => {
  const l = r.int(3, 20);
  const rr = r.int(1, l - 1);
  const ang = (360 * rr) / l;
  need(Number.isInteger(ang));
  return num({
    title: 'Siatka stożka – kąt wycinka',
    q: T`Promień podstawy stożka ma długość $${rr}$, a tworząca – $${l}$. Powierzchnia boczna tego stożka po rozwinięciu jest wycinkiem koła. Oblicz miarę kąta środkowego tego wycinka (w stopniach). Wpisz liczbę.`,
    ans: ang,
    steps: [T`Łuk wycinka ma długość obwodu podstawy: $2\pi \cdot ${rr}$, a promień wycinka to tworząca $${l}$.`, T`$\frac{\alpha}{360^\circ} \cdot 2\pi \cdot ${l} = 2\pi \cdot ${rr}$, więc $\alpha = ${ang}^\circ$.`],
    trap: 'Promień wycinka to TWORZĄCA, a nie promień podstawy.',
    tip: TIP_VOLUME
  });
};

const solidsFacts = (r) => {
  const mk = () => {
    const rr = r.int(1, 6);
    const h = r.int(1, 9);
    const kind = r.pick(['walec', 'stożek']);
    const truthVal = kind === 'walec' ? rr * rr * h : (rr * rr * h) / 3;
    const honest = r.bool();
    const claimed = honest ? truthVal : kind === 'walec' ? (rr * rr * h) / 3 : rr * rr * h;
    need(Number.isInteger(claimed * 3));
    return [T`${kind === 'walec' ? 'Walec' : 'Stożek'} o promieniu podstawy $${rr}$ i wysokości $${h}$ ma objętość $${piTex(surd(Math.round(claimed * 3), 3))}$.`, claimed === truthVal, T`$V = ${kind === 'walec' ? '' : '\\frac{1}{3}'}\pi \cdot ${rr}^2 \cdot ${h} = ${piTex(surd(Math.round(truthVal * 3), 3))}$.`];
  };
  return pf({ title: 'Objętości brył obrotowych', s1: mk(), s2: mk(), trap: T`Stożek ma objętość trzy razy mniejszą niż walec o tej samej podstawie i wysokości.`, tip: TIP_VOLUME });
};

const openPyramidVolume = (r) => {
  const [k, H, hs] = r.pick(TRIPLES);
  // dla większych trójek tylko x = 1, żeby wymiary zostały w zakresie arkusza CKE
  const t = hs > 5 ? 1 : r.pick([1, 2, 3]);
  const b2 = k * k + hs * hs;
  const V = surd(4 * k * k * H * t ** 3, 3);
  need(Math.abs(sVal(V) - ((2 * k * t) ** 2 * H * t) / 3) < 1e-9);
  return open({
    title: 'Objętość ostrosłupa z cosinusem kąta',
    q: T`W ostrosłupie prawidłowym czworokątnym krawędź boczna ma długość $${sq(b2 * t * t)}$, a cosinus kąta nachylenia ściany bocznej do płaszczyzny podstawy jest równy $${fr(k, hs)}$. Oblicz objętość tego ostrosłupa.`,
    stages: [
      [1, 'Etap 1', T`Oznaczenie połowy krawędzi podstawy $${k}x$ i wysokości ściany bocznej $${hs}x$ (z $\cos\beta = ${fr(k, hs)}$).`],
      [2, 'Etap 2', T`Twierdzenie Pitagorasa w ścianie bocznej: $(${k}x)^2 + (${hs}x)^2 = ${b2 * t * t}$, więc $x = ${t}$.`],
      [3, 'Etap 3', T`Wysokość ostrosłupa: $H = ${H}x = ${H * t}$.`],
      [4, 'Etap 4', T`Krawędź podstawy: $${2 * k * t}$.`],
      [5, 'Komplet', T`Objętość: $V = ${sTex(V)}$.`]
    ],
    steps: [
      T`Niech $O$ – środek podstawy, $M$ – środek krawędzi podstawy. $\cos\beta = \frac{|OM|}{|SM|} = ${fr(k, hs)}$, więc $|OM| = ${k}x$, $|SM| = ${hs}x$.`,
      T`Krawędź boczna, połowa krawędzi podstawy ($|OM| = ${k}x$) i wysokość ściany tworzą trójkąt prostokątny: $${k * k}x^2 + ${hs * hs}x^2 = ${b2 * t * t}$, więc $x = ${t}$.`,
      T`$H = \sqrt{|SM|^2 - |OM|^2} = ${H}x = ${H * t}$; krawędź podstawy $a = 2|OM| = ${2 * k * t}$.`,
      T`$V = \frac{1}{3} \cdot ${2 * k * t}^2 \cdot ${H * t} = ${sTex(V)}$.`
    ],
    trap: T`$|OM|$ to połowa krawędzi podstawy – krawędź podstawy jest dwa razy dłuższa.`,
    tip: TIP_PYR,
    answer: m(T`V = ${sTex(V)}`)
  });
};

export default {
  numericId: 12,
  title: 'Stereometria: kąty i przekroje',
  short_title: 'Stereometria',
  description: 'Twierdzenie o trzech prostopadłych, kąty w graniastosłupach i ostrosłupach, przekroje sześcianu i ostrosłupów, objętości z trygonometrią.',
  icon: 'Box',
  color: '#FFB800',
  matura_points_range: '4–6 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 24–25',
  cke_stats: 'W 10 z 11 arkuszy CKE 2022–2026, średnio 4,5 pkt na arkusz (X.5 objętości – 21 pkt łącznie).',
  lessons: [
    {
      title: 'Trzy prostopadłe i kąt dwuścienny',
      short_title: 'Trzy prostopadłe',
      requirements: ['X.R1', 'X.2'],
      prereq: ['math-lesson-11-3'],
      pill: pill({
        essence: T`Kąt prostej z płaszczyzną to kąt między prostą a jej rzutem na tę płaszczyznę. Kąt dwuścienny mierzysz w płaszczyźnie prostopadłej do krawędzi. Twierdzenie o trzech prostopadłych: prosta w płaszczyźnie jest prostopadła do ukośnej wtedy i tylko wtedy, gdy jest prostopadła do jej rzutu.`,
        context: 'Twierdzenie o trzech prostopadłych (X.R1) to nowe wymaganie PR – nie było cytowane wprost, ale uzasadnia każdy kąt dwuścienny w zadaniach ze stereometrii.',
        pl: T`Postaw ołówek ukośnie na kartce i zaświeć latarką z góry. Cień ołówka to rzut. Linia na kartce prostopadła do cienia jest też prostopadła do samego ołówka.`,
        steps: [
          ['Rzut', 'Opuść prostopadłą na płaszczyznę.', 'Spodek wysokości.'],
          ['Kąt', 'Prosta–rzut albo dwie prostopadłe do krawędzi.', 'Trzy prostopadłe uzasadniają kąt.'],
          ['Policz', 'Trójkąt prostokątny i tangens.', 'Wysokość przez rzut.']
        ],
        formulas: [
          ['Przekątna prostopadłościanu', T`d = \sqrt{a^2 + b^2 + c^2}`, 24],
          ['Kąt przekątnej', T`\operatorname{tg}\alpha = \frac{c}{\sqrt{a^2 + b^2}}`, 24],
          ['Wysokość trójkąta prostokątnego', T`h = \frac{ab}{c}`]
        ],
        examples: [
          ['Przekątna', '1 pkt', T`Prostopadłościan $2 \times 3 \times 6$.`, T`1. $d^2 = 4 + 9 + 36 = 49$.` + '\n' + T`2. $d = 7$.`, 'Trzy kwadraty.'],
          ['Kąt dwuścienny', '3 pkt', T`$|AB| = 3$, $|BC| = 4$, $|CC'| = 6$. Kąt płaszczyzny $BDC'$ z podstawą.`, T`1. $|CE| = \frac{12}{5}$ ($CE \perp BD$).` + '\n' + T`2. $\operatorname{tg} = \frac{6}{\frac{12}{5}} = \frac{5}{2}$.`, 'Kąt w punkcie E, nie C.']
        ],
        trap: T`Kąt dwuścienny przy krawędzi $BD$ leży w punkcie $E$ (spodek prostopadłej z $C$), a nie przy wierzchołku $B$ ani $C$.`,
        fail: T`„Kąt między płaszczyzną $BDC'$ a podstawą to $\angle C'BC$.”`,
        win: T`To $\angle C'EC$, gdzie $CE \perp BD$ – z twierdzenia o trzech prostopadłych $C'E \perp BD$.`,
        why: 'Ramiona kąta dwuściennego muszą być prostopadłe do krawędzi.',
        ckeTip: 'Napisz, gdzie leży kąt i dlaczego (twierdzenie o trzech prostopadłych) – za samo wskazanie kąta jest punkt.',
        points: ['Kąt z płaszczyzną = kąt z rzutem.', 'Kąt dwuścienny ⟂ do krawędzi.', 'Trzy prostopadłe uzasadniają prostopadłość.']
      }),
      gens: [cuboidDiagonal, diagonalAngle, planeAngle, (r) => {
        const [s1, s2] = pickTwo(r, PERP_FACTS);
        return pf({ title: 'Prostopadłość w przestrzeni', s1, s2, trap: 'Prostopadłość do płaszczyzny wymaga prostopadłości do DWÓCH przecinających się prostych.', tip: TIP_CUBOID });
      }, openPlaneAngle]
    },
    {
      title: 'Kąty w ostrosłupach',
      short_title: 'Kąty w ostrosłupach',
      requirements: ['X.3', 'X.2'],
      prereq: ['math-lesson-11-2'],
      pill: pill({
        essence: T`W ostrosłupie prawidłowym czworokątnym są dwa różne kąty z podstawą. Kąt krawędzi bocznej leży w trójkącie: wysokość $H$, połowa PRZEKĄTNEJ $\frac{a\sqrt{2}}{2}$, krawędź boczna. Kąt ściany bocznej leży w trójkącie: $H$, połowa KRAWĘDZI $\frac{a}{2}$, wysokość ściany bocznej.`,
        context: 'Kąty w ostrosłupach (X.3) to etap prawie każdego zadania ze stereometrii – pomylenie trójkątów kosztuje całe zadanie.',
        pl: T`Krawędź boczna „schodzi” do rogu kwadratu – jej cień biegnie po przekątnej. Ściana boczna „schodzi” do boku – jej wysokość ma cień prostopadły do boku, długości połowy boku.`,
        steps: [
          ['Spodek', 'Środek kwadratu podstawy.', 'Punkt przecięcia przekątnych.'],
          ['Wybierz trójkąt', 'Krawędź – przekątna; ściana – krawędź podstawy.', 'Narysuj go osobno.'],
          ['Funkcja', 'tg, sin, cos w trójkącie prostokątnym.', 'Kąt przy podstawie.']
        ],
        formulas: [
          ['Krawędź boczna', T`\operatorname{tg}\alpha = \frac{H}{\frac{a\sqrt{2}}{2}}`, 25],
          ['Ściana boczna', T`\operatorname{tg}\beta = \frac{H}{\frac{a}{2}}`, 25],
          ['Objętość', T`V = \frac{1}{3}a^2H`, 25]
        ],
        examples: [
          ['Ściana', '1 pkt', T`$a = 6$, $H = 4$. Oblicz $\operatorname{tg}\beta$.`, T`1. $\frac{a}{2} = 3$.` + '\n' + T`2. $\operatorname{tg}\beta = \frac{4}{3}$.`, 'Połowa krawędzi.'],
          ['Krawędź', '2 pkt', T`$a = 4$, $H = 2$. Oblicz $\operatorname{tg}\alpha$.`, T`1. Połowa przekątnej: $2\sqrt{2}$.` + '\n' + T`2. $\operatorname{tg}\alpha = \frac{2}{2\sqrt{2}} = \frac{\sqrt{2}}{2}$.`, 'Połowa przekątnej.']
        ],
        trap: 'Kąt krawędzi bocznej i kąt ściany bocznej to RÓŻNE kąty – mają różne trójkąty i różne przyprostokątne w podstawie.',
        fail: T`„Kąt krawędzi bocznej: $\operatorname{tg}\alpha = \frac{H}{\frac{a}{2}}$.”`,
        win: T`$\operatorname{tg}\alpha = \frac{H}{\frac{a\sqrt{2}}{2}}$.`,
        why: 'Rzut krawędzi bocznej to połowa przekątnej podstawy.',
        ckeTip: 'Zaznacz na rysunku kąt i trójkąt, z którego liczysz – egzaminator sprawdza właściwy wybór kąta.',
        points: ['Krawędź – połowa przekątnej.', 'Ściana – połowa krawędzi.', 'Kąt krawędzi < kąt ściany.']
      }),
      gens: [edgeAngle, faceAngle, pyramidHeight, (r) => {
        const [s1, s2] = pickTwo(r, PYR_FACTS);
        return pf({ title: 'Kąty i spodki wysokości w ostrosłupach', s1, s2, trap: 'Kąt ściany bocznej ≠ kąt krawędzi bocznej.', tip: TIP_PYR });
      }, openPyramid]
    },
    {
      title: 'Przekroje sześcianu',
      short_title: 'Przekroje sześcianu',
      requirements: ['X.R2'],
      prereq: ['math-lesson-11-1'],
      pill: pill({
        essence: T`Przekrój sześcianu to wielokąt, w którym płaszczyzna przecina bryłę – ma od 3 do 6 boków. Płaszczyzna przez trzy przekątne ścian (np. $BDA'$) daje trójkąt równoboczny o boku $a\sqrt{2}$, a płaszczyzna przez dwie przeciwległe krawędzie – prostokąt $a \times a\sqrt{2}$.`,
        context: 'Przekroje sześcianu i ostrosłupów (X.R2) to wymaganie PR. Typowe zadanie: pole przekroju za 3–4 pkt.',
        pl: T`Wyobraź sobie, że kroisz kostkę masła jednym cięciem noża. Ślad cięcia na każdej ściance to odcinek – wszystkie te odcinki razem tworzą przekrój.`,
        steps: [
          ['Odcinki', 'Połącz punkty leżące na tej samej ścianie.', 'Ściany równoległe – odcinki równoległe.'],
          ['Kształt', 'Rozpoznaj trójkąt, prostokąt, trapez.', 'Długości z przekątnych ścian.'],
          ['Pole', 'Wysokość z Pitagorasa lub trzech prostopadłych.', 'Np. EK ⟂ BD.']
        ],
        formulas: [
          ['Przekątna ściany', T`a\sqrt{2}`, 24],
          ['Trójkąt równoboczny', T`P = \frac{x^2\sqrt{3}}{4}`, 15],
          ['Przekątna sześcianu', T`a\sqrt{3}`, 24]
        ],
        examples: [
          ['Trójkąt', '1 pkt', T`Sześcian o krawędzi $2$, przekrój $BDA'$.`, T`1. Bok $2\sqrt{2}$.` + '\n' + T`2. $P = \frac{8\sqrt{3}}{4} = 2\sqrt{3}$.`, 'Przekątne ścian.'],
          ['Przekrój z punktem', '4 pkt', T`Krawędź $4$, $K$ na $CC'$, $|CK| = 1$. Pole $BDK$.`, T`1. $|EC| = 2\sqrt{2}$, $|EK| = \sqrt{8 + 1} = 3$.` + '\n' + T`2. $P = \frac{1}{2} \cdot 4\sqrt{2} \cdot 3 = 6\sqrt{2}$.`, 'Wysokość EK.']
        ],
        trap: 'Wysokością trójkąta $BDK$ jest $EK$, a nie krawędź $CK$ – ta nie leży w płaszczyźnie przekroju.',
        fail: T`„$P = \frac{1}{2} \cdot |BD| \cdot |CK|$.”`,
        win: T`$P = \frac{1}{2} \cdot |BD| \cdot |EK|$, gdzie $E$ – środek $BD$.`,
        why: 'Wysokość trójkąta musi leżeć w jego płaszczyźnie.',
        ckeTip: 'Uzasadnij, że $EK \\perp BD$ (trójkąt równoramienny lub trzy prostopadłe) – to osobny etap w kluczu.',
        points: ['Przekrój ma 3–6 boków.', 'Boki z przekątnych ścian.', 'Wysokość przez trzy prostopadłe.']
      }),
      gens: [cubeTriangle, cuboidDiagSection, cubeRectangle, (r) => {
        const [s1, s2] = pickTwo(r, CUBE_FACTS);
        return pf({ title: 'Przekroje sześcianu', s1, s2, trap: 'Przekrój ma tyle boków, ile ścian przecina płaszczyzna.', tip: TIP_SECTION });
      }, openCubeSection]
    },
    {
      title: 'Przekroje ostrosłupów prawidłowych',
      short_title: 'Przekroje ostrosłupów',
      requirements: ['X.R2'],
      prereq: ['math-lesson-11-2'],
      pill: pill({
        essence: T`Przekrój ostrosłupa prawidłowego czworokątnego płaszczyzną przez wierzchołek i przekątną podstawy to trójkąt o podstawie $a\sqrt{2}$ i wysokości $H$. Płaszczyzna równoległa do podstawy daje kwadrat podobny do podstawy w skali $\frac{d}{H}$, gdzie $d$ – odległość od wierzchołka.`,
        context: 'Przekroje ostrosłupów (X.R2) łączą się z kątami i trygonometrią – zwykle w zadaniu 4–5 pkt z objętością.',
        pl: T`Przetnij piramidę pionowo przez dwa przeciwległe rogi – zobaczysz trójkąt, którego wysokość to wysokość piramidy. Przetnij poziomo – zobaczysz mniejszy kwadrat.`,
        steps: [
          ['Rozpoznaj', 'Przez wierzchołek – trójkąt; równolegle – figura podobna.', 'Narysuj przekrój osobno.'],
          ['Wymiary', 'Przekątna, wysokość, skala.', 'Skala d/H.'],
          ['Pole', 'Wzór na pole trójkąta lub k² · P.', 'Kwadrat skali.']
        ],
        formulas: [
          ['Przekrój przez przekątną', T`P = \frac{1}{2} \cdot a\sqrt{2} \cdot H`],
          ['Przekrój równoległy', T`P' = P_p \cdot \left(\frac{d}{H}\right)^2`, 17],
          ['Objętość', T`V = \frac{1}{3}a^2H`, 25]
        ],
        examples: [
          ['Przekątny', '1 pkt', T`$a = 4$, $H = 3$. Pole przekroju $ACS$.`, T`1. $|AC| = 4\sqrt{2}$.` + '\n' + T`2. $P = 6\sqrt{2}$.`, 'Wysokość ostrosłupa.'],
          ['Równoległy', '1 pkt', T`$a = 6$, $H = 9$, $d = 3$.`, T`1. Skala $\frac{1}{3}$.` + '\n' + T`2. $P = 36 \cdot \frac{1}{9} = 4$.`, 'Kwadrat skali.']
        ],
        trap: T`Pole przekroju równoległego w połowie wysokości to $\frac{1}{4}$ podstawy, a nie $\frac{1}{2}$.`,
        fail: T`„Przekrój w połowie wysokości ma pole $\frac{1}{2}P_p$.”`,
        win: T`Skala $\frac{1}{2}$, więc $P = \frac{1}{4}P_p$.`,
        why: 'Pola figur podobnych zmieniają się z kwadratem skali.',
        ckeTip: 'Nazwij figurę przekroju i uzasadnij jej wymiary – bez tego obliczenie pola może nie zostać uznane.',
        points: ['Przez przekątną: podstawa a√2, wysokość H.', 'Równoległy: skala d/H.', 'Pole: kwadrat skali.']
      }),
      gens: [diagSection, midSection, parallelSection, (r) => {
        const [s1, s2] = pickTwo(r, PYR_SECTION_FACTS);
        return pf({ title: 'Przekroje ostrosłupów', s1, s2, trap: 'Przekrój równoległy do podstawy jest podobny do podstawy.', tip: TIP_SECTION });
      }, openPyramidSection]
    },
    {
      title: 'Bryły z trygonometrią – zadanie 5–6 pkt',
      short_title: 'Bryły z trygonometrią',
      requirements: ['X.5', 'X.R2'],
      prereq: ['math-lesson-11-4'],
      pill: pill({
        essence: T`Zadanie ze stereometrii za 5–6 pkt zwykle podaje jedną długość i kąt (albo jego funkcję trygonometryczną). Wymiary bryły wyrażasz przez jedną niewiadomą $x$ z funkcji kąta, wyznaczasz $x$ z twierdzenia Pitagorasa, a na końcu liczysz objętość lub pole.`,
        context: 'Objętości brył (X.5) to wymaganie PP najczęściej cytowane na arkuszu PR – 21 pkt w 11 arkuszach.',
        pl: T`$\cos\beta = \frac{3}{5}$ znaczy: w trójkącie z tym kątem przyprostokątna przy kącie to „3 kawałki”, a przeciwprostokątna – „5 kawałków”. Jeden kawałek to $x$ – szukasz go z drugiej informacji.`,
        steps: [
          ['Trójkąt z kątem', 'Wybierz właściwy trójkąt prostokątny.', 'Krawędź czy ściana?'],
          ['Jedna niewiadoma', T`Boki jako $kx$ z funkcji kąta.`, 'Np. 3x i 5x.'],
          ['Pitagoras i wzór', 'Wyznacz x, potem V lub P.', 'V = ⅓ P_p H.']
        ],
        formulas: [
          ['Ostrosłup', T`V = \frac{1}{3}P_pH`, 25],
          ['Stożek', T`V = \frac{1}{3}\pi r^2H`, 25],
          ['Siatka stożka', T`\alpha = \frac{r}{l} \cdot 360^\circ`]
        ],
        examples: [
          ['Stożek', '2 pkt', T`$l = 4$, kąt $60^\circ$. Oblicz $V$.`, T`1. $r = 2$, $H = 2\sqrt{3}$.` + '\n' + T`2. $V = \frac{1}{3}\pi \cdot 4 \cdot 2\sqrt{3} = \frac{8\sqrt{3}}{3}\pi$.`, 'cos dla r, sin dla H.'],
          ['Ostrosłup', '5 pkt', T`Krawędź boczna $\sqrt{34}$, $\cos\beta = \frac{3}{5}$ (ściana).`, T`1. $|OM| = 3x$, $|SM| = 5x$; $9x^2 + 25x^2 = 34$, $x = 1$.` + '\n' + T`2. $H = 4$, $a = 6$, $V = 48$.`, 'Jedna niewiadoma.']
        ],
        trap: 'Funkcja trygonometryczna kąta nachylenia ŚCIANY dotyczy trójkąta z połową krawędzi podstawy – nie z połową przekątnej.',
        fail: T`„$\cos\beta = \frac{3}{5}$, więc połowa przekątnej podstawy to $3x$.”`,
        win: T`Połowa KRAWĘDZI podstawy to $3x$, a wysokość ściany bocznej – $5x$.`,
        why: 'Kąt ściany bocznej leży w trójkącie OMS (M – środek krawędzi).',
        ckeTip: 'Zapisz wszystkie wymiary przez $x$ przed obliczeniami – egzaminator przyznaje punkty za każdy poprawny związek.',
        points: ['Boki przez jedną niewiadomą.', 'Pitagoras wyznacza x.', 'V = ⅓ P_p H.']
      }),
      gens: [pyramidVolume, coneVolume, coneNet, solidsFacts, openPyramidVolume]
    }
  ]
};
