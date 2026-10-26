import { T, mc, num, pf, open, pill, fr, m, need, iv, xm } from '../math_pp/lib.js';
import { pickTwo, terms } from './common.js';
import { lineTex } from './geo.js';

const TIP_LIM = 'Granicę wyrażenia typu „zero przez zero” liczysz po rozłożeniu licznika i mianownika na czynniki i skróceniu czynnika, który się zeruje.';
const TIP_CONT = 'Funkcja jest ciągła w punkcie $a$, gdy $\\lim_{x \\to a} f(x) = f(a)$. Własność Darboux: funkcja ciągła na $\\langle a, b \\rangle$, dla której $f(a) \\cdot f(b) < 0$, ma miejsce zerowe w $(a, b)$.';
const TIP_DER = 'Karta wzorów, str. 31: $f\'(x_0) = \\lim_{h \\to 0}\\frac{f(x_0 + h) - f(x_0)}{h}$; styczna: $y = f\'(x_0)(x - x_0) + f(x_0)$.';
const TIP_RULES = 'Karta wzorów, str. 30: $(fg)\' = f\'g + fg\'$, $\\left(\\frac{f}{g}\\right)\' = \\frac{f\'g - fg\'}{g^2}$, $(f(g(x)))\' = f\'(g(x)) \\cdot g\'(x)$.';
const TIP_MONO = 'Gdy $f\' > 0$ w przedziale, $f$ rośnie; gdy $f\' < 0$ – maleje. Ekstremum jest tam, gdzie pochodna zmienia znak.';

const par = (x) => (x < 0 ? `(${x})` : `${x}`);
/** Czynnik (x − r): dla r = 0 samo „x”, np. 3x(x − 6). */
const fac = (r) => (r === 0 ? 'x' : `(${xm(r)})`);
/** Współczynnik przed nawiasem: 1 → '', −1 → '-'. */
const co = (k) => (k === 1 ? '' : k === -1 ? '-' : `${k}`);
const cubic = (A, B, C) => terms([[1, 'x^3'], [A, 'x^2'], [B, 'x'], [C, '']]);
const quadT = (a, b, c) => terms([[a, 'x^2'], [b, 'x'], [c, '']]);
/** Sześcienna f(x) = x³ + Ax² + Bx + C z f'(x) = 3(x − r1)(x − r2). */
const cubicFromRoots = (r1, r2, C) => {
  need((r1 + r2) % 2 === 0);
  return { A: (-3 * (r1 + r2)) / 2, B: 3 * r1 * r2, C };
};
const fv = ({ A, B, C }, x) => x ** 3 + A * x ** 2 + B * x + C;

// ---------- 14.1 Granica w punkcie ----------
const limitRemovable = (r) => {
  const a = r.int(-5, 5);
  const b = r.int(-5, 5);
  const c = r.int(-5, 5);
  need(a !== b && a !== c && b !== c);
  const top = quadT(1, -(a + b), a * b);
  const bot = quadT(1, -(a + c), a * c);
  const val = (a - b) / (a - c);
  const g = (x) => (x * x - (a + b) * x + a * b) / (x * x - (a + c) * x + a * c);
  need(Math.abs(g(a + 1e-7) - val) < 1e-5);
  return mc({
    title: 'Granica typu 0/0',
    q: T`Granica $\lim_{x \to ${a}} \frac{${top}}{${bot}}$ jest równa`,
    ok: m(fr(a - b, a - c)),
    val,
    bad: [m(fr(b, c) === fr(a - b, a - c) ? fr(-b, c) : fr(b, c)), m(fr(-(a - b), a - c)), m('1'), m(fr(a + b, a + c === 0 ? 1 : a + c)), m(fr(a * b, a * c === 0 ? 1 : a * c))],
    steps: [T`Dla $x = ${a}$ licznik i mianownik są równe $0$: $\frac{(${xm(a)})(${xm(b)})}{(${xm(a)})(${xm(c)})}$.`, T`Po skróceniu: $\lim_{x \to ${a}} \frac{${xm(b)}}{${xm(c)}} = \frac{${a} - ${par(b)}}{${a} - ${par(c)}} = ${fr(a - b, a - c)}$.`],
    trap: T`Wynik „zero przez zero” nie jest liczbą – trzeba skrócić wspólny czynnik $(${xm(a)})$.`,
    tip: TIP_LIM
  });
};

const oneSided = (r) => {
  const a = r.int(-4, 4);
  const b = r.intNot(-4, 4, a);
  const right = r.bool();
  const s = (a - b) * (right ? 1 : -1);
  const ok = s > 0 ? '+\\infty' : '-\\infty';
  return mc({
    title: 'Granica jednostronna',
    q: T`Granica $\lim_{x \to ${a}^${right ? '+' : '-'}} \frac{${xm(b)}}{${xm(a)}}$ jest równa`,
    ok: m(ok),
    bad: [m(s > 0 ? '-\\infty' : '+\\infty'), m('0'), m('1')],
    steps: [T`Licznik dąży do $${a} - ${par(b)} = ${a - b}$, a mianownik do $0$ od strony ${right ? 'dodatniej' : 'ujemnej'} ($0^${right ? '+' : '-'}$).`, T`Iloraz liczby ${a - b > 0 ? 'dodatniej' : 'ujemnej'} przez $0^${right ? '+' : '-'}$ dąży do $${ok}$.`],
    trap: 'O znaku nieskończoności decyduje znak licznika ORAZ strona, z której mianownik dąży do zera.',
    tip: TIP_LIM
  });
};

const limitInfinity = (r) => {
  const p = r.pick([1, 2, 3, -1, -2, 5]);
  const qd = r.pick([1, 2, 4, 5]);
  const [b, c, d, e] = [r.int(-6, 6), r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)];
  return num({
    title: 'Granica w nieskończoności',
    q: T`Oblicz $\lim_{x \to +\infty} \frac{${quadT(p, b, c)}}{${quadT(qd, d, e)}}$. Wpisz liczbę.`,
    ans: p / qd,
    steps: [T`Dzielimy licznik i mianownik przez $x^2$ – wyrazy z $\frac{1}{x}$ i $\frac{1}{x^2}$ dążą do $0$.`, T`Granica to iloraz współczynników przy $x^2$: $${fr(p, qd)}$.`],
    trap: 'Przy równych stopniach liczy się tylko iloraz współczynników przy najwyższych potęgach.',
    tip: TIP_LIM
  });
};

const LIMIT_FACTS = [
  ['Jeśli granice jednostronne funkcji w punkcie są różne, to granica w tym punkcie nie istnieje.', true, 'Granica istnieje tylko wtedy, gdy obie granice jednostronne są równe.'],
  [T`$\lim_{x \to 0} \frac{1}{x} = +\infty$.`, false, T`Granice jednostronne są różne ($+\infty$ i $-\infty$), więc granica nie istnieje.`],
  [T`$\lim_{x \to 0} \frac{1}{x^2} = +\infty$.`, true, T`Z obu stron $x^2 \to 0^+$.`],
  ['Funkcja może mieć granicę w punkcie, w którym nie jest określona.', true, T`Np. $\frac{x^2 - 1}{x - 1}$ w punkcie $1$ ma granicę $2$.`]
];

const limitFacts = (r) => {
  const [s1] = pickTwo(r, LIMIT_FACTS);
  const a = r.int(-3, 3);
  const b = r.int(-5, 5);
  const c = r.int(-5, 5);
  const L = a * a + b * a + c;
  const honest = r.bool();
  const claimed = honest ? L : L + r.pick([1, -1, 2]);
  return pf({ title: 'Granice funkcji', s1, s2: [T`$\lim_{x \to ${a}} (${quadT(1, b, c)}) = ${claimed}$.`, claimed === L, T`Wielomian jest ciągły, więc granica to wartość: $${L}$.`], trap: 'Dla wielomianu granica w punkcie to po prostu wartość w tym punkcie.', tip: TIP_LIM });
};

const openLimitParam = (r) => {
  const a = r.pick([-3, -2, -1, 1, 2, 3, 4]);
  const t = r.int(-5, 5);
  const c = a * t;
  const mm = -(a + t);
  const L = a - t;
  const g = (x) => (x * x + mm * x + c) / (x - a);
  need(Math.abs(g(a + 1e-7) - L) < 1e-5 && t !== 0 && t !== a);
  return open({
    title: 'Parametr a istnienie granicy',
    q: T`Wyznacz wartość parametru $m$, dla której istnieje skończona granica $\lim_{x \to ${a}} \frac{x^2 + mx ${c < 0 ? '-' : '+'} ${Math.abs(c)}}{${xm(a)}}$, i oblicz tę granicę.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że mianownik dąży do $0$, więc licznik musi zerować się w $x = ${a}$: $${terms([[a * a, ''], [a, 'm'], [c, '']])} = 0$.`],
      [2, 'Etap 2', T`Wyznaczenie $m = ${mm}$.`],
      [3, 'Komplet', T`Rozkład licznika $(${xm(a)})(${xm(t)})$ i granica $${L}$.`]
    ],
    steps: [
      T`Gdy $x \to ${a}$, mianownik dąży do $0$. Skończona granica wymaga, by licznik też dążył do $0$: $${terms([[a * a, ''], [a, 'm'], [c, '']])} = 0$, więc $m = ${mm}$.`,
      T`Licznik: $${quadT(1, mm, c)} = (${xm(a)})(${xm(t)})$.`,
      T`$\lim_{x \to ${a}} (${xm(t)}) = ${L}$.`
    ],
    trap: 'Jeśli licznik nie zeruje się w punkcie, w którym zeruje się mianownik, granice jednostronne są nieskończone (różnych znaków) i granica nie istnieje.',
    tip: TIP_LIM,
    answer: m(T`m = ${mm}, \ \lim = ${L}`)
  });
};

// ---------- 14.2 Ciągłość i własność Darboux ----------
const continuityParam = (r) => {
  const a = r.pick([-3, -2, -1, 1, 2, 3]);
  const mm = r.int(-5, 5);
  const qq = r.int(-6, 6);
  const p = mm * a + qq - a * a;
  return mc({
    title: 'Ciągłość funkcji określonej przedziałami',
    q: T`Funkcja $f(x) = \begin{cases} ${quadT(1, 0, p)} & \text{dla } x < ${a} \\ mx ${qq < 0 ? '-' : '+'} ${Math.abs(qq)} & \text{dla } x \ge ${a} \end{cases}$ jest ciągła dla $m$ równego`.replace(` + 0 & `, ' & ').replace(/ [+-] 0 & /, ' & '),
    ok: m(`${mm}`),
    val: mm,
    bad: [m(`${-mm}`), m(`${mm + 1}`), m(`${a * a + p}`), m(fr(a * a + p, 1) === `${mm}` ? `${mm - 1}` : `${a * a + p}`)],
    steps: [T`Obie części muszą „spotkać się” w $x = ${a}$: $${terms([[1, `${par(a)}^2`], [p, '']])} = ${par(a)} \cdot m ${qq < 0 ? '-' : '+'} ${Math.abs(qq)}$.`.replace(/ \+ 0\$/, '$'), T`$${a * a + p} = ${terms([[a, 'm'], [qq, '']])}$, więc $m = ${mm}$.`],
    trap: 'Ciągłość w punkcie sklejenia: granica lewostronna = granica prawostronna = wartość funkcji.',
    tip: TIP_CONT
  });
};

const removableValue = (r) => {
  const a = r.int(-5, 5);
  const b = r.intNot(-5, 5, a);
  return num({
    title: 'Wartość zapewniająca ciągłość',
    q: T`Funkcja $f$ jest określona wzorem $f(x) = \frac{${quadT(1, -(a + b), a * b)}}{${xm(a)}}$ dla $x \ne ${a}$ oraz $f(${a}) = k$. Oblicz $k$, dla którego $f$ jest ciągła. Wpisz liczbę.`,
    ans: a - b,
    steps: [T`Dla $x \ne ${a}$: $f(x) = \frac{(${xm(a)})(${xm(b)})}{${xm(a)}} = ${xm(b)}$.`, T`$\lim_{x \to ${a}} f(x) = ${a - b}$, więc $k = ${a - b}$.`],
    trap: 'Wartość w punkcie musi być równa granicy – licz granicę po skróceniu.',
    tip: TIP_CONT
  });
};

const DARBOUX_POLYS = (r) => {
  const p = r.int(1, 6);
  const qq = r.int(-12, 12);
  return { tex: terms([[1, 'x^3'], [p, 'x'], [qq, '']]), f: (x) => x ** 3 + p * x + qq };
};

const darbouxFacts = (r) => {
  const mk = () => {
    const { tex, f } = DARBOUX_POLYS(r);
    const u = r.int(-3, 2);
    const v = u + r.pick([1, 2]);
    need(f(u) !== 0 && f(v) !== 0);
    const truth = f(u) * f(v) < 0;
    return [T`Z własności Darboux wynika, że funkcja $f(x) = ${tex}$ ma miejsce zerowe w przedziale $(${u}, ${v})$.`, truth, T`$f(${u}) = ${f(u)}$, $f(${v}) = ${f(v)}$ – ${truth ? 'znaki są przeciwne' : 'znaki są takie same, więc własność Darboux nic nie przesądza'}.`];
  };
  return pf({ title: 'Własność Darboux', s1: mk(), s2: mk(), trap: 'Własność Darboux działa tylko przy PRZECIWNYCH znakach na końcach przedziału (i ciągłości).', tip: TIP_CONT });
};

const rootInterval = (r) => {
  const { tex, f } = DARBOUX_POLYS(r);
  let k = null;
  for (let x = -4; x <= 3; x++) if (f(x) * f(x + 1) < 0) k = x;
  need(k !== null && f(k) !== 0 && f(k + 1) !== 0);
  const ivT = (x) => m(`(${x}, ${x + 1})`);
  return mc({
    title: 'Przedział z miejscem zerowym',
    q: T`Funkcja $f(x) = ${tex}$ ma miejsce zerowe w przedziale`,
    ok: ivT(k),
    bad: [ivT(k - 1), ivT(k + 1), ivT(k + 2), ivT(k - 2)],
    steps: [T`$f(${k}) = ${f(k)}$, $f(${k + 1}) = ${f(k + 1)}$ – wartości mają przeciwne znaki.`, 'Wielomian jest funkcją ciągłą, więc z własności Darboux ma miejsce zerowe w tym przedziale.'],
    trap: 'Sprawdź znaki wartości na końcach przedziału – sama wartość bliska zeru niczego nie dowodzi.',
    tip: TIP_CONT
  });
};

const openDarboux = (r) => {
  const { tex, f } = DARBOUX_POLYS(r);
  const u = r.int(-3, 2);
  need(f(u) * f(u + 1) < 0);
  return open({
    title: 'Dowód istnienia rozwiązania',
    q: T`Wykaż, że równanie $${tex} = 0$ ma rozwiązanie w przedziale $(${u}, ${u + 1})$.`,
    stages: [
      [1, 'Etap 1', T`Obliczenie $f(${u}) = ${f(u)}$ i $f(${u + 1}) = ${f(u + 1)}$ oraz stwierdzenie, że mają przeciwne znaki.`],
      [2, 'Komplet', T`Powołanie się na ciągłość $f$ (wielomian) i własność Darboux – wniosek.`]
    ],
    steps: [
      T`Niech $f(x) = ${tex}$. Funkcja $f$ jest wielomianem, więc jest ciągła na $\langle ${u}, ${u + 1} \rangle$.`,
      T`$f(${u}) = ${f(u)}$, $f(${u + 1}) = ${f(u + 1)}$, więc $f(${u}) \cdot f(${u + 1}) < 0$.`,
      T`Z własności Darboux istnieje $x_0 \in (${u}, ${u + 1})$, dla którego $f(x_0) = 0$.`
    ],
    trap: 'Bez słowa o ciągłości funkcji powołanie się na własność Darboux jest niepełne.',
    tip: TIP_CONT,
    answer: T`Równanie ma rozwiązanie w przedziale $(${u}, ${u + 1})$`,
    proof: true
  });
};

// ---------- 14.3 Definicja pochodnej i styczna ----------
const derivAt = (r) => {
  const [a, b, c, d] = [r.pick([1, 2, -1, 3]), r.int(-4, 4), r.int(-6, 6), r.int(-6, 6)];
  const x0 = r.int(-3, 3);
  const ans = 3 * a * x0 * x0 + 2 * b * x0 + c;
  return num({
    title: 'Pochodna w punkcie',
    q: T`Oblicz współczynnik kierunkowy stycznej do wykresu funkcji $f(x) = ${terms([[a, 'x^3'], [b, 'x^2'], [c, 'x'], [d, '']])}$ w punkcie o odciętej $${x0}$. Wpisz liczbę.`,
    ans,
    steps: [T`$f'(x) = ${terms([[3 * a, 'x^2'], [2 * b, 'x'], [c, '']])}$.`, T`$f'(${x0}) = ${ans}$ – to współczynnik kierunkowy stycznej.`],
    trap: 'Współczynnik kierunkowy stycznej to wartość POCHODNEJ, a nie funkcji.',
    tip: TIP_DER
  });
};

const tangentLine = (r) => {
  const a = r.pick([1, 2, -1]);
  const b = r.int(-4, 4);
  const c = r.int(-5, 5);
  const x0 = r.int(-3, 3);
  const y0 = a * x0 * x0 + b * x0 + c;
  const s = 2 * a * x0 + b;
  const ok = lineTex(s, 1, y0 - s * x0);
  return mc({
    title: 'Równanie stycznej',
    q: T`Styczna do wykresu funkcji $f(x) = ${quadT(a, b, c)}$ w punkcie $P = (${x0}, ${y0})$ ma równanie`,
    ok: m(ok),
    bad: [m(lineTex(y0, 1, s - y0 * x0)), m(lineTex(-s, 1, y0 + s * x0)), m(lineTex(s, 1, y0 + s * x0)), m(lineTex(s, 1, y0))].filter((x) => x !== m(ok)),
    steps: [T`$f'(x) = ${terms([[2 * a, 'x'], [b, '']])}$, więc $f'(${x0}) = ${s}$.`, T`$y = ${co(s)}(${xm(x0)}) + ${par(y0)}$, czyli $${ok}$.`],
    trap: T`We wzorze $y = f'(x_0)(x - x_0) + f(x_0)$ pochodna jest współczynnikiem, a $f(x_0)$ – przesunięciem.`,
    tip: TIP_DER
  });
};

const velocity = (r) => {
  const a = r.pick([1, 2, 3, 5]);
  const b = r.int(1, 10);
  const t0 = r.int(1, 8);
  return num({
    title: 'Interpretacja fizyczna pochodnej',
    q: T`Droga (w metrach) przebyta przez ciało po $t$ sekundach ruchu wyraża się wzorem $s(t) = ${terms([[a, 't^2'], [b, 't']])}$. Oblicz prędkość chwilową tego ciała (w m/s) w chwili $t = ${t0}$. Wpisz liczbę.`,
    ans: 2 * a * t0 + b,
    steps: [T`Prędkość chwilowa to pochodna drogi: $v(t) = s'(t) = ${terms([[2 * a, 't'], [b, '']])}$.`, T`$v(${t0}) = ${2 * a * t0 + b}$ m/s.`],
    trap: T`$\frac{s(t)}{t}$ to prędkość ŚREDNIA – chwilowa to pochodna.`,
    tip: TIP_DER
  });
};

const DER_FACTS = [
  [T`$f'(x_0) = \lim_{h \to 0} \frac{f(x_0 + h) - f(x_0)}{h}$, o ile ta granica istnieje i jest skończona.`, true, 'To definicja pochodnej.'],
  ['Pochodna funkcji w punkcie jest współczynnikiem kierunkowym stycznej do wykresu w tym punkcie.', true, 'Interpretacja geometryczna pochodnej.'],
  [T`Funkcja $f(x) = |x|$ ma pochodną w punkcie $0$.`, false, T`Ilorazy różnicowe mają granice jednostronne $-1$ i $1$.`],
  ['Jeśli funkcja jest ciągła w punkcie, to ma w nim pochodną.', false, T`Kontrprzykład: $|x|$ w zerze.`]
];

const derFacts = (r) => {
  const [s1] = pickTwo(r, DER_FACTS);
  const a = r.pick([1, 2, -1]);
  const b = r.int(-4, 4);
  const x0 = r.int(-3, 3);
  const s = 2 * a * x0 + b;
  const honest = r.bool();
  const claimed = honest ? s : s + r.pick([1, -2, 2]);
  return pf({ title: 'Pochodna i styczna', s1, s2: [T`Styczna do wykresu $f(x) = ${quadT(a, b, 1)}$ w punkcie o odciętej $${x0}$ ma współczynnik kierunkowy $${claimed}$.`, claimed === s, T`$f'(${x0}) = ${s}$.`], trap: 'Ciągłość nie gwarantuje istnienia pochodnej.', tip: TIP_DER });
};

const openParallelTangents = (r) => {
  const t = r.pick([1, 2]);
  const qq = r.int(-6, 4);
  const rr = r.int(-5, 5);
  const k = 3 * t * t + qq;
  const c1 = rr - 2 * t ** 3;
  const c2 = rr + 2 * t ** 3;
  const free = r.int(-6, 6);
  need(free !== c1 && free !== c2);
  const f = (x) => x ** 3 + qq * x + rr;
  need(f(t) === k * t + c1 && f(-t) === -k * t + c2);
  const ftex = terms([[1, 'x^3'], [qq, 'x'], [rr, '']]);
  return open({
    title: 'Styczne równoległe do prostej',
    q: T`Wyznacz równania wszystkich stycznych do wykresu funkcji $f(x) = ${ftex}$, które są równoległe do prostej $${lineTex(k, 1, free)}$.`,
    stages: [
      [1, 'Etap 1', T`Obliczenie pochodnej: $f'(x) = ${terms([[3, 'x^2'], [qq, '']])}$.`],
      [2, 'Etap 2', T`Rozwiązanie równania $f'(x_0) = ${k}$: $x_0 = ${t}$ lub $x_0 = ${-t}$.`],
      [3, 'Etap 3', T`Obliczenie $f(${t}) = ${f(t)}$ i $f(${-t}) = ${f(-t)}$.`],
      [4, 'Komplet', T`Równania stycznych: $${lineTex(k, 1, c1)}$ i $${lineTex(k, 1, c2)}$.`]
    ],
    steps: [
      T`Proste równoległe mają ten sam współczynnik kierunkowy: szukamy $x_0$, dla których $f'(x_0) = ${k}$.`,
      T`$3x_0^2 ${qq < 0 ? '-' : '+'} ${Math.abs(qq)} = ${k}$, więc $x_0^2 = ${t * t}$, czyli $x_0 = \pm ${t}$.`.replace(/ \+ 0 =/, ' ='),
      T`Dla $x_0 = ${t}$: $y = ${co(k)}(x - ${t}) + ${par(f(t))}$; dla $x_0 = ${-t}$: $y = ${co(k)}(x + ${t}) + ${par(f(-t))}$.`,
      T`Styczne: $${lineTex(k, 1, c1)}$ i $${lineTex(k, 1, c2)}$.`
    ],
    trap: T`Równanie $x_0^2 = ${t * t}$ ma DWA rozwiązania – są dwie styczne.`,
    tip: TIP_DER,
    answer: m(T`${lineTex(k, 1, c1)} \ \text{oraz} \ ${lineTex(k, 1, c2)}`)
  });
};

// ---------- 14.4 Pochodna iloczynu, ilorazu i funkcji złożonej ----------
const productDeriv = (r) => {
  const [a, b, c, d] = [r.pick([1, 2, 3, -1]), r.int(-5, 5), r.pick([1, 2, -1]), r.int(-5, 5)];
  need(b !== 0 && d !== 0);
  const ok = quadT(3 * a * c, 2 * b * c, a * d);
  return mc({
    title: 'Pochodna iloczynu',
    q: T`Pochodna funkcji $f(x) = (${terms([[a, 'x'], [b, '']])})(${terms([[c, 'x^2'], [d, '']])})$ jest równa`,
    ok: m(`f'(x) = ${ok}`),
    bad: [m(`f'(x) = ${terms([[2 * a * c, 'x']])}`), m(`f'(x) = ${quadT(3 * a * c, 0, a * d)}`), m(`f'(x) = ${quadT(a * c, 2 * b * c, a * d)}`), m(`f'(x) = ${quadT(3 * a * c, b * c, a * d)}`)].filter((x) => x !== m(`f'(x) = ${ok}`)),
    steps: [T`$(fg)' = f'g + fg'$: $f'(x) = ${a}(${terms([[c, 'x^2'], [d, '']])}) + (${terms([[a, 'x'], [b, '']])}) \cdot ${2 * c}x$.`.replace(/\$f'\(x\) = 1\(/, "$f'(x) = (").replace(/ = -1\(/, ' = -('), T`$f'(x) = ${ok}$.`],
    trap: 'Pochodna iloczynu NIE jest iloczynem pochodnych.',
    tip: TIP_RULES
  });
};

const quotientAt = (r) => {
  const [a, b, c] = [r.int(1, 4), r.int(-6, 6), r.int(-4, 4)];
  const x0 = r.int(-3, 3);
  need(x0 + c !== 0 && a * c - b !== 0);
  const ok = fr(a * c - b, (x0 + c) ** 2);
  return mc({
    title: 'Pochodna ilorazu w punkcie',
    q: T`Dla funkcji $f(x) = \frac{${terms([[a, 'x'], [b, '']])}}{${xm(-c)}}$ wartość $f'(${x0})$ jest równa`,
    ok: m(ok),
    val: (a * c - b) / (x0 + c) ** 2,
    bad: [m(`${a}`), m(fr(b - a * c, (x0 + c) ** 2)), m(fr(a * c - b, x0 + c)), m(fr(a * c + b, (x0 + c) ** 2))],
    steps: [T`$f'(x) = \frac{${a}(${xm(-c)}) - (${terms([[a, 'x'], [b, '']])}) \cdot 1}{(${xm(-c)})^2} = \frac{${a * c - b}}{(${xm(-c)})^2}$.`.replace(/\\frac\{1\(/, '\\frac{('), T`$f'(${x0}) = \frac{${a * c - b}}{${(x0 + c) ** 2}} = ${ok}$.`.replace(`\\frac{${a * c - b}}{${(x0 + c) ** 2}} = ${ok}`, fr(a * c - b, (x0 + c) ** 2) === `\\frac{${a * c - b}}{${(x0 + c) ** 2}}` ? ok : `\\frac{${a * c - b}}{${(x0 + c) ** 2}} = ${ok}`)],
    trap: T`Za wzór $\left(\frac{f}{g}\right)' = \frac{f'}{g'}$ klucz CKE daje 0 pkt za całe zadanie.`,
    tip: TIP_RULES
  });
};

const chainAt = (r) => {
  const n = r.pick([2, 3, 4]);
  const a = r.pick([1, 2, 3, -1, -2]);
  const b = r.int(-4, 4);
  const x0 = r.int(-2, 2);
  const ans = n * a * (a * x0 + b) ** (n - 1);
  need(Math.abs(ans) < 5000);
  return num({
    title: 'Pochodna funkcji złożonej',
    q: T`Oblicz $f'(${x0})$ dla funkcji $f(x) = (${terms([[a, 'x'], [b, '']])})^{${n}}$. Wpisz liczbę.`,
    ans,
    steps: [T`$f'(x) = ${n}(${terms([[a, 'x'], [b, '']])})^{${n - 1}} \cdot ${par(a)}$ (pochodna funkcji wewnętrznej).`.replace('^{1}', ''), T`$f'(${x0}) = ${n} \cdot ${par(a * x0 + b)}^{${n - 1}} \cdot ${par(a)} = ${ans}$.`.replace('^{1}', '')],
    trap: 'Nie zapomnij pomnożyć przez pochodną funkcji wewnętrznej.',
    tip: TIP_RULES
  });
};

const RULE_FACTS = [
  [T`Dla dowolnych funkcji różniczkowalnych $(f \cdot g)' = f' \cdot g'$.`, false, T`$(fg)' = f'g + fg'$.`],
  [T`$\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$ tam, gdzie $g \ne 0$.`, true, 'To wzór na pochodną ilorazu.'],
  [T`$(\sqrt{x})' = \frac{1}{2\sqrt{x}}$ dla $x > 0$.`, true, T`$(x^{\frac{1}{2}})' = \frac{1}{2}x^{-\frac{1}{2}}$.`],
  [T`$\left(\frac{1}{x}\right)' = \frac{1}{x^2}$ dla $x \ne 0$.`, false, T`$\left(\frac{1}{x}\right)' = -\frac{1}{x^2}$.`],
  [T`$((2x + 1)^3)' = 3(2x + 1)^2$.`, false, T`Brakuje czynnika $2$: $6(2x + 1)^2$.`]
];

const openQuotient = (r) => {
  const qq = r.int(-3, 3);
  const s = r.int(1, 4);
  const p = s * s - qq * qq;
  need(p !== 0);
  const [r1, r2] = [qq - s, qq + s];
  const fp = (x) => (x * x - 2 * qq * x - p) / (x - qq) ** 2;
  need(Math.abs(fp(r1)) < 1e-12 && Math.abs(fp(r2)) < 1e-12);
  return open({
    title: 'Pochodna ilorazu i jej miejsca zerowe',
    q: T`Funkcja $f$ jest określona wzorem $f(x) = \frac{${terms([[1, 'x^2'], [p, '']])}}{${xm(qq)}}$ dla $x \ne ${qq}$. Wyznacz wszystkie argumenty, dla których $f'(x) = 0$.`,
    stages: [
      [1, 'Etap 1', T`Zastosowanie wzoru na pochodną ilorazu: $f'(x) = \frac{2x(${xm(qq)}) - (${terms([[1, 'x^2'], [p, '']])})}{(${xm(qq)})^2}$.`],
      [2, 'Etap 2', T`Uproszczenie: $f'(x) = \frac{${quadT(1, -2 * qq, -p)}}{(${xm(qq)})^2}$.`],
      [3, 'Komplet', T`Rozwiązanie $${quadT(1, -2 * qq, -p)} = 0$ w dziedzinie: $x = ${r1}$ lub $x = ${r2}$.`]
    ],
    zero: [T`Zastosowanie wzoru $\left(\frac{f}{g}\right)' = \frac{f'}{g'}$ – 0 pkt za całe zadanie.`],
    steps: [
      T`$f'(x) = \frac{2x(${xm(qq)}) - (${terms([[1, 'x^2'], [p, '']])}) \cdot 1}{(${xm(qq)})^2} = \frac{${quadT(1, -2 * qq, -p)}}{(${xm(qq)})^2}$.`,
      T`Mianownik jest dodatni w dziedzinie, więc $f'(x) = 0$ wtedy, gdy $${quadT(1, -2 * qq, -p)} = 0$.`,
      T`$\Delta = ${4 * qq * qq + 4 * p} = ${2 * s}^2$, więc $x = ${r1}$ lub $x = ${r2}$ (oba należą do dziedziny).`
    ],
    trap: 'Pochodna ilorazu jako iloraz pochodnych to błąd, za który CKE daje 0 pkt za całe zadanie.',
    tip: TIP_RULES,
    answer: m(T`x = ${r1} \ \text{lub} \ x = ${r2}`)
  });
};

// ---------- 14.5 Monotoniczność i ekstrema ----------
const pickRoots = (r) => {
  const r1 = r.int(-4, 2);
  const r2 = r1 + 2 * r.int(1, 3);
  return [r1, r2];
};

const decreasingInterval = (r) => {
  const [r1, r2] = pickRoots(r);
  const f = cubicFromRoots(r1, r2, r.int(-5, 5));
  return mc({
    title: 'Przedział monotoniczności',
    q: T`Funkcja $f(x) = ${cubic(f.A, f.B, f.C)}$ jest malejąca w przedziale`,
    ok: m(iv.cc(r1, r2)),
    bad: [m(iv.lc(r1)), m(iv.rc(r2)), m(iv.cc(-r2, -r1)), m(iv.cc(r1 - 1, r2 + 1))].filter((x) => x !== m(iv.cc(r1, r2))),
    steps: [T`$f'(x) = ${quadT(3, 2 * f.A, f.B)} = 3${fac(r1)}${fac(r2)}$.`, T`$f'(x) \le 0$ dla $x \in ${iv.cc(r1, r2)}$ – tam funkcja maleje.`],
    trap: 'Parabola $f\'$ ma ramiona w górę – jest UJEMNA między miejscami zerowymi, a nie na zewnątrz.',
    tip: TIP_MONO
  });
};

const localMaxArg = (r) => {
  const [r1, r2] = pickRoots(r);
  const f = cubicFromRoots(r1, r2, r.int(-5, 5));
  const askMax = r.bool();
  return num({
    title: 'Argument ekstremum lokalnego',
    q: T`Funkcja $f(x) = ${cubic(f.A, f.B, f.C)}$ ma ${askMax ? 'maksimum' : 'minimum'} lokalne w punkcie $x_0$. Oblicz $x_0$. Wpisz liczbę.`,
    ans: askMax ? r1 : r2,
    steps: [T`$f'(x) = 3${fac(r1)}${fac(r2)}$: znak $+$, potem $-$ (między $${r1}$ a $${r2}$), potem $+$.`, T`${askMax ? `Pochodna zmienia znak z $+$ na $-$ w $x = ${r1}$ – maksimum.` : `Pochodna zmienia znak z $-$ na $+$ w $x = ${r2}$ – minimum.`}`],
    trap: 'Maksimum lokalne jest tam, gdzie pochodna zmienia znak z $+$ na $-$; minimum – z $-$ na $+$.',
    tip: TIP_MONO
  });
};

const localMinValue = (r) => {
  const [r1, r2] = pickRoots(r);
  const f = cubicFromRoots(r1, r2, r.int(-5, 5));
  const askMax = r.bool();
  const x0 = askMax ? r1 : r2;
  return num({
    title: 'Wartość ekstremum lokalnego',
    q: T`Oblicz ${askMax ? 'maksimum' : 'minimum'} lokalne funkcji $f(x) = ${cubic(f.A, f.B, f.C)}$. Wpisz liczbę.`,
    ans: fv(f, x0),
    steps: [T`$f'(x) = 3${fac(r1)}${fac(r2)}$, ${askMax ? 'maksimum' : 'minimum'} w $x = ${x0}$.`, T`$f(${x0}) = ${fv(f, x0)}$.`],
    trap: 'Pytanie o wartość ekstremum to pytanie o $f(x_0)$, a nie o $x_0$.',
    tip: TIP_MONO
  });
};

const MONO_FACTS = [
  [T`Jeśli $f'(x_0) = 0$, to funkcja $f$ ma ekstremum w punkcie $x_0$.`, false, T`Kontrprzykład: $f(x) = x^3$, $f'(0) = 0$, ale ekstremum brak.`],
  [T`Jeśli $f'(x) > 0$ dla każdego $x$ z przedziału, to $f$ jest rosnąca w tym przedziale.`, true, 'To twierdzenie o monotoniczności.'],
  ['Jeśli pochodna zmienia znak z dodatniego na ujemny w punkcie $x_0$, to $f$ ma w $x_0$ maksimum lokalne.', true, 'Funkcja najpierw rośnie, potem maleje.'],
  [T`Funkcja $f(x) = x^3 + x$ jest rosnąca na całej prostej.`, true, T`$f'(x) = 3x^2 + 1 > 0$.`]
];

const openMonotonicity = (r) => {
  const [r1, r2] = pickRoots(r);
  const f = cubicFromRoots(r1, r2, r.int(-5, 5));
  return open({
    title: 'Monotoniczność i ekstrema funkcji',
    q: T`Wyznacz przedziały monotoniczności i ekstrema lokalne funkcji $f(x) = ${cubic(f.A, f.B, f.C)}$.`,
    stages: [
      [1, 'Etap 1', T`Obliczenie pochodnej $f'(x) = ${quadT(3, 2 * f.A, f.B)}$.`],
      [2, 'Etap 2', T`Miejsca zerowe pochodnej: $x = ${r1}$ i $x = ${r2}$.`],
      [3, 'Etap 3', T`Znak pochodnej i przedziały: rosnąca w $${iv.lc(r1)}$ i w $${iv.rc(r2)}$, malejąca w $${iv.cc(r1, r2)}$.`],
      [4, 'Komplet', T`Ekstrema: maksimum $f(${r1}) = ${fv(f, r1)}$, minimum $f(${r2}) = ${fv(f, r2)}$.`]
    ],
    steps: [
      T`$f'(x) = ${quadT(3, 2 * f.A, f.B)} = 3${fac(r1)}${fac(r2)}$.`,
      T`$f'(x) > 0$ dla $x < ${r1}$ i $x > ${r2}$, $f'(x) < 0$ dla $${r1} < x < ${r2}$.`,
      T`$f$ rośnie w $${iv.lc(r1)}$ i w $${iv.rc(r2)}$, maleje w $${iv.cc(r1, r2)}$.`,
      T`Maksimum lokalne: $f(${r1}) = ${fv(f, r1)}$; minimum lokalne: $f(${r2}) = ${fv(f, r2)}$.`
    ],
    trap: 'Przedziałów monotoniczności nie łączy się znakiem $\\cup$ – funkcja rosnąca w dwóch przedziałach nie musi być rosnąca w ich sumie.',
    tip: TIP_MONO,
    answer: m(T`\text{rosnąca w} \ ${iv.lc(r1)} \ \text{i} \ ${iv.rc(r2)}, \ \text{malejąca w} \ ${iv.cc(r1, r2)}, \ f_{\max} = ${fv(f, r1)}, \ f_{\min} = ${fv(f, r2)}`)
  });
};

export default {
  numericId: 14,
  title: 'Granice, ciągłość i pochodna',
  short_title: 'Pochodna',
  description: 'Granice funkcji (także jednostronne), ciągłość i własność Darboux, definicja i reguły różniczkowania, monotoniczność i ekstrema.',
  icon: 'TrendingUp',
  color: '#FFB800',
  matura_points_range: '2–4 pkt',
  importance: 'HIGH',
  cke_formula_page: 'str. 30–31',
  cke_stats: 'W 7 z 11 arkuszy CKE 2022–2026, średnio 2,7 pkt na arkusz (XIII.R4 – 16 zadań, 26 pkt łącznie, często jako etap optymalizacji).',
  lessons: [
    {
      title: 'Granica funkcji w punkcie i granice jednostronne',
      short_title: 'Granica w punkcie',
      requirements: ['XIII.R1'],
      prereq: ['math-lesson-4-3'],
      pill: pill({
        essence: T`Granica $\lim_{x \to a} f(x)$ to wartość, do której zbliża się $f(x)$, gdy $x$ zbliża się do $a$. Gdy podstawienie daje „zero przez zero”, rozkładasz licznik i mianownik na czynniki i skracasz. Gdy mianownik dąży do $0$, a licznik nie – granice jednostronne są nieskończone, a o znaku decyduje strona.`,
        context: 'Granice funkcji (XIII.R1) to nowe wymaganie PR. Zwykle pojawiają się jako krok w ciągłości lub definicji pochodnej.',
        pl: T`$\frac{x^2 - 4}{x - 2}$ w punkcie $2$ to „dziura” w wykresie prostej $y = x + 2$. Granica pyta, gdzie ta dziura jest – na wysokości $4$.`,
        steps: [
          ['Podstaw', T`Wynik liczbowy – to granica.`, 'Wielomiany od razu.'],
          ['0/0', 'Rozłóż i skróć wspólny czynnik.', 'Potem podstaw.'],
          ['k/0', 'Granice jednostronne ±∞.', 'Znak z licznika i strony.']
        ],
        formulas: [
          ['Skracanie', T`\lim_{x \to a}\frac{(x - a)g(x)}{(x - a)h(x)} = \frac{g(a)}{h(a)}`],
          ['Jednostronne', T`\lim_{x \to 0^+}\frac{1}{x} = +\infty, \ \lim_{x \to 0^-}\frac{1}{x} = -\infty`],
          ['W nieskończoności', T`\lim_{x \to \infty}\frac{ax^2 + \ldots}{bx^2 + \ldots} = \frac{a}{b}`]
        ],
        examples: [
          ['0/0', '1 pkt', T`$\lim_{x \to 2}\frac{x^2 - 4}{x - 2}$.`, T`1. $\frac{(x - 2)(x + 2)}{x - 2} = x + 2$.` + '\n' + T`2. Granica $4$.`, 'Skróć czynnik.'],
          ['Jednostronna', '1 pkt', T`$\lim_{x \to 1^-}\frac{x + 1}{x - 1}$.`, T`1. Licznik $\to 2$, mianownik $\to 0^-$.` + '\n' + T`2. $-\infty$.`, 'Dodatnie przez ujemne zero.']
        ],
        trap: 'Wynik „zero przez zero” nie oznacza, że granica nie istnieje ani że jest równa $0$ – trzeba skrócić czynnik.',
        fail: T`„Po podstawieniu $x = 2$ do $\frac{x^2 - 4}{x - 2}$ wychodzi zero przez zero, więc granica nie istnieje.”`,
        win: T`Po skróceniu $\lim_{x \to 2}(x + 2) = 4$.`,
        why: 'Wyrażenie nieoznaczone wymaga przekształcenia.',
        ckeTip: 'Zapisz rozkład na czynniki jawnie – samo podanie wyniku granicy bez przekształcenia może nie dać punktu.',
        points: ['0/0 – rozłóż i skróć.', 'k/0 – nieskończoność ze znakiem.', 'Różne granice jednostronne – brak granicy.']
      }),
      gens: [limitRemovable, oneSided, limitInfinity, limitFacts, openLimitParam]
    },
    {
      title: 'Ciągłość funkcji i własność Darboux',
      short_title: 'Ciągłość i Darboux',
      requirements: ['XIII.R2', 'XIII.R1'],
      prereq: ['math-lesson-4-3'],
      pill: pill({
        essence: T`Funkcja jest ciągła w punkcie $a$, gdy $\lim_{x \to a} f(x) = f(a)$. Wielomiany i funkcje wymierne są ciągłe w swoich dziedzinach. Własność Darboux: jeśli $f$ jest ciągła na $\langle a, b \rangle$ i $f(a) \cdot f(b) < 0$, to istnieje $x_0 \in (a, b)$, w którym $f(x_0) = 0$.`,
        context: 'Własność Darboux (XIII.R2) nie była dotąd cytowana wprost w arkuszach, ale podstawa jej wymaga – służy do dowodów istnienia rozwiązań.',
        pl: T`Jeśli rano jesteś poniżej poziomu morza, a wieczorem powyżej i idziesz bez teleportowania się, to w którymś momencie musiałeś przejść przez poziom zero.`,
        steps: [
          ['Ciągłość', 'Wielomian – zawsze ciągły.', 'Sklejenie: granice równe wartości.'],
          ['Znaki', T`Oblicz $f(a)$ i $f(b)$.`, 'Przeciwne znaki?'],
          ['Wniosek', 'Darboux: istnieje miejsce zerowe.', 'Nazwij twierdzenie.']
        ],
        formulas: [
          ['Ciągłość', T`\lim_{x \to a} f(x) = f(a)`],
          ['Darboux', T`f(a) \cdot f(b) < 0 \ \text{więc} \ \exists \, x_0 \in (a, b): f(x_0) = 0`.replace('\\exists \\, ', '\\text{istnieje} \\ ')],
          ['Sklejenie', T`\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = f(a)`]
        ],
        examples: [
          ['Parametr', '1 pkt', T`$f(x) = x^2$ dla $x < 1$, $mx + 2$ dla $x \ge 1$.`, T`1. $1 = m + 2$.` + '\n' + T`2. $m = -1$.`, 'Wartości spotykają się w 1.'],
          ['Darboux', '2 pkt', T`Wykaż, że $x^3 + x - 3 = 0$ ma rozwiązanie w $(1, 2)$.`, T`1. $f(1) = -1$, $f(2) = 7$.` + '\n' + T`2. Ciągłość + Darboux.`, 'Przeciwne znaki.']
        ],
        trap: 'Gdy $f(a)$ i $f(b)$ mają ten sam znak, własność Darboux NIC nie mówi – miejsce zerowe może istnieć albo nie.',
        fail: T`„$f(0) = 1$, $f(3) = 5$, więc $f$ nie ma miejsca zerowego w $(0, 3)$.”`,
        win: 'Z takich danych nie można wnioskować o braku miejsca zerowego.',
        why: 'Funkcja może zejść poniżej zera i wrócić.',
        ckeTip: 'W dowodzie z Darboux napisz wprost: „funkcja jest ciągła (wielomian)” – to warunek twierdzenia.',
        points: ['Ciągłość: granica = wartość.', 'Darboux: przeciwne znaki na końcach.', 'Ten sam znak – brak wniosku.']
      }),
      gens: [continuityParam, removableValue, darbouxFacts, rootInterval, openDarboux]
    },
    {
      title: 'Definicja pochodnej i styczna',
      short_title: 'Pochodna i styczna',
      requirements: ['XIII.R3', 'XIII.R4'],
      prereq: ['math-lesson-10-2'],
      pill: pill({
        essence: T`Pochodna $f'(x_0)$ to granica ilorazu różnicowego $\frac{f(x_0 + h) - f(x_0)}{h}$ przy $h \to 0$. Geometrycznie – współczynnik kierunkowy stycznej do wykresu w punkcie $(x_0, f(x_0))$, fizycznie – prędkość chwilowa. Styczna: $y = f'(x_0)(x - x_0) + f(x_0)$.`,
        context: 'Interpretacja pochodnej (XIII.R3) to typowe zadanie za 3–4 pkt: równanie stycznej w punkcie albo styczna równoległa do prostej.',
        pl: T`Przybliżaj sieczną przez dwa punkty wykresu, aż punkty się zleją – dostaniesz styczną. Jej nachylenie to pochodna.`,
        steps: [
          ['Pochodna', T`Wzory z karty: $(x^n)' = nx^{n-1}$.`, 'Wielomian wyraz po wyrazie.'],
          ['Punkt', T`$f'(x_0)$ i $f(x_0)$.`, 'Dwie różne liczby.'],
          ['Styczna', T`$y = f'(x_0)(x - x_0) + f(x_0)$.`, 'Uprość do y = ax + b.']
        ],
        formulas: [
          ['Definicja', T`f'(x_0) = \lim_{h \to 0}\frac{f(x_0 + h) - f(x_0)}{h}`, 31],
          ['Potęga', T`(x^n)' = nx^{n-1}`, 30],
          ['Styczna', T`y = f'(x_0)(x - x_0) + f(x_0)`, 31]
        ],
        examples: [
          ['Styczna', '2 pkt', T`$f(x) = x^2$ w punkcie $(1, 1)$.`, T`1. $f'(1) = 2$.` + '\n' + T`2. $y = 2(x - 1) + 1 = 2x - 1$.`, 'Pochodna = nachylenie.'],
          ['Równoległa', '4 pkt', T`Styczne do $x^3 - 2x$ równoległe do $y = x$.`, T`1. $3x^2 - 2 = 1$, $x = \pm 1$.` + '\n' + T`2. Dwie styczne: $y = x - 2$ i $y = x + 2$.`, 'Dwa punkty styczności.']
        ],
        trap: T`$f(x_0)$ i $f'(x_0)$ to różne liczby – pierwsza to wysokość punktu, druga to nachylenie stycznej.`,
        fail: T`„Styczna w $(1, 1)$ do $y = x^2$: $y = 1 \cdot x + \ldots$”`,
        win: T`Nachylenie to $f'(1) = 2$, a nie $f(1) = 1$.`,
        why: 'Nachylenie daje pochodna.',
        ckeTip: 'Styczna „równoległa do prostej” – zapisz warunek $f\'(x_0) = a$ i sprawdź, ile ma rozwiązań.',
        points: ['f′(x₀) – nachylenie stycznej.', 'Styczna: y = f′(x₀)(x − x₀) + f(x₀).', 'Równoległa: ten sam współczynnik.']
      }),
      gens: [derivAt, tangentLine, velocity, derFacts, openParallelTangents]
    },
    {
      title: 'Pochodna iloczynu, ilorazu i funkcji złożonej',
      short_title: 'Reguły różniczkowania',
      requirements: ['XIII.R4'],
      prereq: ['math-lesson-6-1'],
      pill: pill({
        essence: T`Pochodna iloczynu: $(fg)' = f'g + fg'$. Ilorazu: $\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$. Funkcji złożonej: $(f(g(x)))' = f'(g(x)) \cdot g'(x)$ – pochodna „zewnętrznej” razy pochodna „wewnętrznej”. Pochodna iloczynu NIE jest iloczynem pochodnych.`,
        context: 'Reguły różniczkowania (XIII.R4) to najczęstsze wymaganie z pochodnej: 16 zadań w 11 arkuszach. Błąd we wzorze na iloraz kosztuje 0 pkt za całe zadanie.',
        pl: T`Funkcja złożona to cebula: $(2x + 1)^3$ – najpierw obierasz zewnętrzną warstwę ($3(\ldots)^2$), potem mnożysz przez pochodną środka ($2$).`,
        steps: [
          ['Rozpoznaj', 'Iloczyn, iloraz czy złożenie?', 'Albo najpierw wymnóż.'],
          ['Wzór', 'Zastosuj właściwy wzór z karty.', 'Iloraz: minus w liczniku.'],
          ['Uprość', 'Licznik do najprostszej postaci.', 'Mianownik zostaw w kwadracie.']
        ],
        formulas: [
          ['Iloczyn', T`(fg)' = f'g + fg'`, 30],
          ['Iloraz', T`\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}`, 30],
          ['Złożenie', T`(f(g(x)))' = f'(g(x)) \cdot g'(x)`, 30]
        ],
        examples: [
          ['Iloraz', '2 pkt', T`$f(x) = \frac{x}{x + 1}$.`, T`1. $f'(x) = \frac{1 \cdot (x + 1) - x \cdot 1}{(x + 1)^2}$.` + '\n' + T`2. $f'(x) = \frac{1}{(x + 1)^2}$.`, 'Kolejność w liczniku.'],
          ['Złożenie', '1 pkt', T`$f(x) = (3x - 1)^2$, $f'(1)$.`, T`1. $f'(x) = 2(3x - 1) \cdot 3$.` + '\n' + T`2. $f'(1) = 12$.`, 'Razy pochodna środka.']
        ],
        trap: T`Wzór $\left(\frac{f}{g}\right)' = \frac{f'}{g'}$ to błąd, za który klucz CKE daje 0 pkt za CAŁE zadanie optymalizacyjne.`,
        fail: T`„$\left(\frac{x^2 + 1}{x}\right)' = \frac{2x}{1} = 2x$.”`,
        win: T`$\frac{2x \cdot x - (x^2 + 1)}{x^2} = \frac{x^2 - 1}{x^2}$.`,
        why: 'Pochodna ilorazu ma swój wzór.',
        ckeTip: 'Zapisz wzór na pochodną ilorazu z podstawionymi funkcjami przed upraszczaniem – to osobny etap w kluczu.',
        points: ['(fg)′ = f′g + fg′.', '(f/g)′ = (f′g − fg′)/g².', 'Złożenie: razy pochodna środka.']
      }),
      gens: [productDeriv, quotientAt, chainAt, (r) => {
        const [s1, s2] = pickTwo(r, RULE_FACTS);
        return pf({ title: 'Reguły różniczkowania', s1, s2, trap: 'Każdy wzór sprawdź na prostym przykładzie, np. $x \\cdot x$.', tip: TIP_RULES });
      }, openQuotient]
    },
    {
      title: 'Monotoniczność i ekstrema',
      short_title: 'Monotoniczność',
      requirements: ['XIII.R5'],
      prereq: ['math-lesson-6-3'],
      pill: pill({
        essence: T`Znak pochodnej mówi, jak zachowuje się funkcja: $f' > 0$ – rośnie, $f' < 0$ – maleje. Ekstremum lokalne jest w punkcie, w którym pochodna zmienia znak: z $+$ na $-$ – maksimum, z $-$ na $+$ – minimum. Sam warunek $f'(x_0) = 0$ nie wystarcza.`,
        context: 'Badanie monotoniczności (XIII.R5) to drugi etap zadania optymalizacyjnego i samodzielne zadanie za 3–4 pkt.',
        pl: T`Pochodna to „licznik nachylenia” drogi pod górę: dodatni – idziesz w górę, ujemny – w dół. Szczyt jest tam, gdzie licznik przechodzi z plusa na minus.`,
        steps: [
          ['Pochodna', T`Oblicz $f'(x)$ i rozłóż na czynniki.`, 'Dziedzina!'],
          ['Znak', "Szkic znaku f′ (parabola, wężyk).", 'Miejsca zerowe f′.'],
          ['Wnioski', 'Przedziały monotoniczności i ekstrema.', 'Wartości f w ekstremach.']
        ],
        formulas: [
          ['Rośnie', T`f'(x) > 0 \ \text{więc} \ f \ \text{rośnie}`],
          ['Maksimum', T`f' \ \text{zmienia znak z} + \text{na} -`],
          ['Pochodna sześciennej', T`(x^3 + bx^2 + cx)' = 3x^2 + 2bx + c`, 30]
        ],
        examples: [
          ['Przedziały', '2 pkt', T`$f(x) = x^3 - 3x$.`, T`1. $f'(x) = 3(x - 1)(x + 1)$.` + '\n' + T`2. Rośnie w $(-\infty, -1\rangle$ i $\langle 1, +\infty)$, maleje w $\langle -1, 1 \rangle$.`, 'Znak paraboli.'],
          ['Ekstrema', '2 pkt', 'Jak wyżej.', T`1. Maksimum $f(-1) = 2$.` + '\n' + T`2. Minimum $f(1) = -2$.`, 'Zmiana znaku.']
        ],
        trap: T`Dla $f(x) = x^3$ jest $f'(0) = 0$, ale ekstremum nie ma – pochodna nie zmienia znaku.`,
        fail: T`„$f'(x_0) = 0$, więc w $x_0$ jest minimum.”`,
        win: T`Sprawdzam znak $f'$ po obu stronach $x_0$.`,
        why: 'Ekstremum wymaga zmiany znaku pochodnej.',
        ckeTip: 'Za samo miejsce zerowe pochodnej bez uzasadnienia, że to ekstremum, klucz daje najwyżej 2 z 4 pkt.',
        points: ['Znak f′ – monotoniczność.', 'Zmiana znaku – ekstremum.', 'f′(x₀) = 0 to za mało.']
      }),
      gens: [decreasingInterval, localMaxArg, localMinValue, (r) => {
        const [s1, s2] = pickTwo(r, MONO_FACTS);
        return pf({ title: 'Pochodna a monotoniczność', s1, s2, trap: 'Zerowanie się pochodnej to warunek konieczny, ale nie wystarczający.', tip: TIP_MONO });
      }, openMonotonicity]
    }
  ]
};
