import { T, mc, num, pf, open, pill, fr, gcd, m, need, iv, sq } from '../math_pp/lib.js';
import { pickTwo, terms, coef } from './common.js';

const TIP_MODEL = 'Model: nazwij zmienną (np. $x$ – krawędź podstawy), wyraź pozostałe wymiary przez $x$ z warunku zadania i zapisz dziedzinę – długości muszą być dodatnie.';
const TIP_OPT = 'Schemat CKE (4 pkt): pochodna → miejsce zerowe w dziedzinie → uzasadnienie, że to minimum/maksimum (znak pochodnej) → wartość i odpowiedź.';
const TIP_SOLID = 'Karta wzorów, str. 24–25: $V = P_p \\cdot h$ (prostopadłościan, walec), pole walca $P = 2\\pi r^2 + 2\\pi rh$.';

/** Argument minimum (lub maksimum) funkcji na siatce – niezależna kontrola wyniku z pochodnej. */
function argOpt(f, lo, hi, max = false, steps = 200000) {
  let best = lo + (hi - lo) / steps;
  let bv = f(best);
  for (let i = 1; i < steps; i++) {
    const x = lo + ((hi - lo) * i) / steps;
    const v = f(x);
    if (max ? v > bv : v < bv) [best, bv] = [x, v];
  }
  return best;
}
const near = (a, b, tol = 1e-3) => Math.abs(a - b) < tol * Math.max(1, Math.abs(b));
const fracX = (c, den = 'x') => `\\frac{${c}}{${den}}`;

// ---------- 15.1 Model, funkcja celu i dziedzina ----------
const boxModel = (r) => {
  const V = r.int(2, 40) * 2;
  const closed = r.bool();
  const ok = closed ? `P(x) = 2x^2 + ${fracX(4 * V)}` : `P(x) = x^2 + ${fracX(4 * V)}`;
  return mc({
    title: 'Funkcja celu – pole prostopadłościanu',
    q: T`Prostopadłościan ${closed ? '' : 'bez górnej podstawy (pudełko bez pokrywki) '}ma kwadratową podstawę o boku $x$ i objętość $${V}$. Pole jego powierzchni ${closed ? 'całkowitej' : ''} jako funkcja $x$ wyraża się wzorem`.replace('powierzchni  jako', 'powierzchni jako'),
    ok: m(ok),
    bad: [m(`P(x) = 2x^2 + ${fracX(4 * V)}`), m(`P(x) = x^2 + ${fracX(4 * V)}`), m(`P(x) = 2x^2 + ${fracX(2 * V)}`), m(`P(x) = x^2 + ${fracX(4 * V, 'x^2')}`)].filter((x) => x !== m(ok)),
    steps: [T`Wysokość z objętości: $x^2 \cdot h = ${V}$, więc $h = \frac{${V}}{x^2}$.`, T`${closed ? 'Dwie podstawy' : 'Jedna podstawa'} i cztery ściany boczne: $${closed ? '2x^2' : 'x^2'} + 4 \cdot x \cdot \frac{${V}}{x^2} = ${ok.replace('P(x) = ', '')}$.`],
    trap: 'Pudełko bez pokrywki ma JEDNĄ podstawę – policz ściany, zanim zapiszesz wzór.',
    tip: TIP_MODEL
  });
};

const domainChoice = (r) => {
  const v = r.int(0, 1);
  if (v === 0) {
    const p = r.int(3, 20);
    return mc({
      title: 'Dziedzina modelu – prostokąt',
      q: T`Rozpatrujemy prostokąty o obwodzie $${2 * p}$. Długość jednego boku oznaczamy przez $x$, a pole wyrażamy jako funkcję $P(x) = x(${p} - x)$. Dziedziną tej funkcji jest przedział`,
      ok: m(iv.oo(0, p)),
      bad: [m(iv.oo(0, 2 * p)), m(iv.cc(0, p)), m(iv.oo(0, fr(p, 2))), m(iv.ro(0))],
      steps: [T`Oba boki muszą być dodatnie: $x > 0$ i $${p} - x > 0$.`, T`Dziedzina: $${iv.oo(0, p)}$.`],
      trap: 'Długość boku nie może być zerem – końce przedziału są otwarte.',
      tip: TIP_MODEL
    });
  }
  const L = 8 * r.int(2, 9);
  return mc({
    title: 'Dziedzina modelu – suma krawędzi',
    q: T`Suma długości wszystkich krawędzi prostopadłościanu o kwadratowej podstawie (bok $x$) jest równa $${L}$. Objętość jako funkcja $x$ ma dziedzinę`,
    ok: m(iv.oo(0, L / 8)),
    bad: [m(iv.oo(0, L / 4)), m(iv.oo(0, fr(L, 12))), m(iv.cc(0, L / 8)), m(iv.oo(0, L))],
    steps: [T`$8x + 4h = ${L}$, więc $h = ${L / 4} - 2x$.`, T`$x > 0$ i $h > 0$: $x < ${L / 8}$, czyli $x \in ${iv.oo(0, L / 8)}$.`],
    trap: 'Dziedzinę wyznacza warunek, że WSZYSTKIE wymiary są dodatnie – także ten wyrażony przez $x$.',
    tip: TIP_MODEL
  });
};

const cylinderHeight = (r) => {
  const k = r.int(2, 60);
  const rr = r.pick([1, 2, 4, 5]);
  const h = k / (rr * rr);
  need(Math.abs(h * 100 - Math.round(h * 100)) < 1e-9);
  return num({
    title: 'Wymiar z warunku objętości',
    q: T`Walec ma objętość $${k}\pi$. Oblicz wysokość tego walca, jeśli promień podstawy jest równy $${rr}$. Wpisz liczbę.`,
    ans: h,
    steps: [T`$V = \pi r^2 h$, więc $h = \frac{V}{\pi r^2} = \frac{${k}}{r^2}$.`, T`$h = \frac{${k}}{${rr * rr}} = ${fr(k, rr * rr)}$.`],
    trap: 'W modelu wysokość jest funkcją promienia: $h(r) = \\frac{V}{\\pi r^2}$ – to pierwszy krok każdej optymalizacji walca.',
    tip: TIP_SOLID
  });
};

const MODEL_FACTS = [
  [T`Prostopadłościan o kwadratowej podstawie o boku $x$ i objętości $V$ ma wysokość $\frac{V}{x^2}$.`, true, T`$V = x^2 \cdot h$.`],
  ['Dziedzina funkcji celu w zadaniu optymalizacyjnym może zawierać liczby ujemne.', false, 'Długości, pola i objętości muszą być dodatnie.'],
  [T`Pudełko bez pokrywki o kwadratowej podstawie $x$ i objętości $V$ ma pole $P(x) = 2x^2 + \frac{4V}{x}$.`, false, T`Ma jedną podstawę: $P(x) = x^2 + \frac{4V}{x}$.`],
  [T`Walec o objętości $V$ i promieniu $r$ ma wysokość $\frac{V}{\pi r^2}$.`, true, T`$V = \pi r^2 h$.`]
];

const MODEL_PROOFS = [
  (r) => {
    const V = r.int(2, 60);
    return { q: T`Rozpatrujemy wszystkie prostopadłościany o kwadratowej podstawie i objętości $${V}$. Wykaż, że pole powierzchni całkowitej takiego prostopadłościanu jako funkcja długości $x$ krawędzi podstawy wyraża się wzorem $P(x) = 2x^2 + \frac{${4 * V}}{x}$, gdzie $x > 0$.`, h: T`h = \frac{${V}}{x^2}`, P: T`P(x) = 2x^2 + 4x \cdot \frac{${V}}{x^2} = 2x^2 + \frac{${4 * V}}{x}` };
  },
  (r) => {
    const V = r.int(2, 60);
    return { q: T`Rozpatrujemy wszystkie pudełka bez pokrywki w kształcie prostopadłościanu o kwadratowym dnie i objętości $${V}$. Wykaż, że pole powierzchni takiego pudełka jako funkcja długości $x$ krawędzi dna wyraża się wzorem $P(x) = x^2 + \frac{${4 * V}}{x}$, gdzie $x > 0$.`, h: T`h = \frac{${V}}{x^2}`, P: T`P(x) = x^2 + 4x \cdot \frac{${V}}{x^2} = x^2 + \frac{${4 * V}}{x}` };
  },
  (r) => {
    const k = r.int(2, 60);
    return { q: T`Rozpatrujemy wszystkie walce o objętości $${k}\pi$. Wykaż, że pole powierzchni całkowitej takiego walca jako funkcja promienia $r$ podstawy wyraża się wzorem $P(r) = 2\pi r^2 + \frac{${2 * k}\pi}{r}$, gdzie $r > 0$.`, h: T`h = \frac{${k}}{r^2}`, P: T`P(r) = 2\pi r^2 + 2\pi r \cdot \frac{${k}}{r^2} = 2\pi r^2 + \frac{${2 * k}\pi}{r}` };
  },
  (r) => {
    const c = r.int(2, 20);
    return { q: T`W obszar ograniczony parabolą $y = ${c} - x^2$ i osią $Ox$ wpisujemy prostokąty, których dwa wierzchołki leżą na osi $Ox$, a dwa pozostałe – na paraboli. Wykaż, że pole takiego prostokąta jako funkcja odciętej $x > 0$ jego prawego górnego wierzchołka wyraża się wzorem $P(x) = ${2 * c}x - 2x^3$, gdzie $x \in (0, ${sq(c)})$.`, h: T`\text{boki: } 2x \ \text{i} \ ${c} - x^2`, P: T`P(x) = 2x(${c} - x^2) = ${2 * c}x - 2x^3` };
  }
];

const openModel = (r) => {
  const p = r.pick(MODEL_PROOFS)(r);
  return open({
    title: 'Model w zadaniu optymalizacyjnym',
    q: p.q,
    stages: [
      [1, 'Etap 1', T`Wyrażenie drugiego wymiaru przez zmienną: $${p.h}$.`],
      [2, 'Komplet', T`Zapisanie funkcji celu: $${p.P}$, i wskazanie dziedziny.`]
    ],
    steps: [T`Z warunku zadania: $${p.h}$.`, T`$${p.P}$; wymiary muszą być dodatnie, co daje dziedzinę podaną w treści.`],
    trap: 'Bez dziedziny funkcja celu jest niepełna – klucz CKE wymaga jej zapisania.',
    tip: TIP_MODEL,
    answer: 'Wzór funkcji celu został wykazany',
    proof: true
  });
};

// ---------- 15.2 Schemat 4 pkt ----------
const boxArgMin = (r) => {
  const t = r.int(1, 6);
  const V = t ** 3;
  const P = (x) => 2 * x * x + (4 * V) / x;
  need(near(argOpt(P, 0.01, 4 * t), t));
  return num({
    title: 'Minimum pola prostopadłościanu',
    q: T`Funkcja $P(x) = 2x^2 + \frac{${4 * V}}{x}$, $x > 0$, opisuje pole powierzchni prostopadłościanu o kwadratowej podstawie. Oblicz $x$, dla którego pole jest najmniejsze. Wpisz liczbę.`,
    ans: t,
    steps: [T`$P'(x) = 4x - \frac{${4 * V}}{x^2} = \frac{4(x^3 - ${V})}{x^2}$.`, T`$P'(x) = 0$ dla $x = ${t}$; $P' < 0$ dla $x < ${t}$ i $P' > 0$ dla $x > ${t}$ – minimum.`],
    trap: 'Miejsce zerowe pochodnej trzeba jeszcze uzasadnić jako minimum – znakiem pochodnej.',
    tip: TIP_OPT
  });
};

const boxMinValue = (r) => {
  const t = r.int(1, 6);
  const V = t ** 3;
  return num({
    title: 'Najmniejsza wartość funkcji celu',
    q: T`Oblicz najmniejszą wartość funkcji $P(x) = 2x^2 + \frac{${4 * V}}{x}$ dla $x > 0$. Wpisz liczbę.`,
    ans: 6 * t * t,
    steps: [T`$P'(x) = 4x - \frac{${4 * V}}{x^2} = 0$ dla $x = ${t}$ (minimum – zmiana znaku z $-$ na $+$).`, T`$P(${t}) = ${2 * t * t} + ${4 * t * t} = ${6 * t * t}$.`],
    trap: 'Pytanie o wartość najmniejszą to pytanie o $P(x_0)$, nie o $x_0$.',
    tip: TIP_OPT
  });
};

const cubicInterval = (r) => {
  const a = r.int(1, 4);
  const b = a + r.int(1, 4);
  const f = (x) => x ** 3 - 3 * a * a * x;
  const fmin = -2 * a ** 3;
  need(near(f(argOpt(f, 0, b)), fmin));
  return mc({
    title: 'Wartość najmniejsza w przedziale domkniętym',
    q: T`Najmniejsza wartość funkcji $f(x) = x^3 - ${3 * a * a}x$ w przedziale $\langle 0, ${b} \rangle$ jest równa`,
    ok: m(`${fmin}`),
    val: fmin,
    bad: [m('0'), m(`${f(b)}`), m(`${-(a ** 3)}`), m(`${a}`)],
    steps: [T`$f'(x) = 3x^2 - ${3 * a * a} = 3(x - ${a})(x + ${a})$; w przedziale zeruje się w $x = ${a}$.`, T`$f(0) = 0$, $f(${a}) = ${fmin}$, $f(${b}) = ${f(b)}$ – najmniejsza jest $${fmin}$.`],
    trap: 'W przedziale domkniętym porównaj wartość w punkcie krytycznym z wartościami na KOŃCACH przedziału.',
    tip: TIP_OPT
  });
};

const OPT_FACTS = [
  ['Miejsce zerowe pochodnej jest zawsze punktem, w którym funkcja przyjmuje wartość najmniejszą.', false, 'Może to być maksimum albo punkt bez ekstremum – decyduje znak pochodnej.'],
  ['Funkcja ciągła na przedziale domkniętym osiąga w nim wartość największą i najmniejszą.', true, 'To twierdzenie Weierstrassa.'],
  [T`Jeśli $f'$ zmienia znak z ujemnego na dodatni w $x_0$, to $f$ ma w $x_0$ minimum lokalne.`, true, 'Funkcja najpierw maleje, potem rośnie.'],
  ['Jeśli funkcja na przedziale otwartym ma jedno minimum lokalne i nie ma maksimum, to w tym punkcie przyjmuje wartość najmniejszą.', true, 'Maleje do tego punktu i rośnie za nim.'],
  [T`W zadaniu optymalizacyjnym wystarczy rozwiązać równanie $f'(x) = 0$.`, false, 'Trzeba jeszcze uzasadnić, że to minimum lub maksimum, i podać odpowiedź.']
];

const openFourStep = (r) => {
  const a = r.pick([1, 2, 3, 4, 5]);
  const t = r.int(1, 6);
  const b = a * t * t;
  const f = (x) => a * x + b / x;
  need(near(argOpt(f, 0.01, 5 * t), t));
  const ftex = `${a === 1 ? '' : a}x + \\frac{${b}}{x}`;
  return open({
    title: 'Najmniejsza wartość funkcji – schemat CKE',
    q: T`Wyznacz najmniejszą wartość funkcji $f(x) = ${ftex}$ dla $x > 0$ i argument, dla którego jest ona przyjmowana.`,
    stages: [
      [1, 'Etap 1', T`Obliczenie pochodnej: $f'(x) = ${a} - \frac{${b}}{x^2}$.`],
      [2, 'Etap 2', T`Miejsce zerowe pochodnej w dziedzinie: $x = ${t}$.`],
      [3, 'Etap 3', T`Uzasadnienie minimum: $f'(x) < 0$ dla $x \in (0, ${t})$ i $f'(x) > 0$ dla $x > ${t}$.`],
      [4, 'Komplet', T`Wartość najmniejsza: $f(${t}) = ${2 * a * t}$.`]
    ],
    zero: [T`Błędny wzór na pochodną ilorazu $\left(\frac{f}{g}\right)' = \frac{f'}{g'}$ – 0 pkt.`],
    steps: [
      T`$f'(x) = ${a} - \frac{${b}}{x^2} = \frac{${terms([[a, 'x^2'], [-b, '']])}}{x^2}$.`,
      T`$f'(x) = 0$ dla $x^2 = ${t * t}$, czyli $x = ${t}$ (bo $x > 0$).`,
      T`Mianownik jest dodatni, a licznik ujemny dla $x < ${t}$ i dodatni dla $x > ${t}$ – $f$ maleje, potem rośnie, więc w $x = ${t}$ jest minimum (także najmniejsza wartość).`,
      T`$f(${t}) = ${a * t} + ${b / t} = ${2 * a * t}$.`
    ],
    trap: 'Za samo miejsce zerowe pochodnej bez uzasadnienia, że to minimum, klucz daje najwyżej 2 z 4 pkt.',
    tip: TIP_OPT,
    answer: m(T`f_{\min} = f(${t}) = ${2 * a * t}`)
  });
};

// ---------- 15.3 Bryły ----------
const openBoxSide = (r) => {
  const x = 2 * r.int(1, 5);
  const V = x ** 3 / 2;
  const P = (s) => s * s + (4 * V) / s;
  need(near(argOpt(P, 0.01, 4 * x), x));
  const askP = r.bool();
  return num({
    title: 'Pudełko bez pokrywki – najmniej materiału',
    q: T`Pudełko bez pokrywki ma kształt prostopadłościanu o kwadratowym dnie i objętość $${V}$. ${askP ? 'Oblicz najmniejsze możliwe pole powierzchni tego pudełka' : 'Oblicz długość krawędzi dna pudełka, do którego zużyto najmniej materiału'}. Wpisz liczbę.`,
    ans: askP ? 3 * x * x : x,
    steps: [T`$P(x) = x^2 + \frac{${4 * V}}{x}$, $P'(x) = 2x - \frac{${4 * V}}{x^2} = 0$ dla $x^3 = ${2 * V}$, czyli $x = ${x}$ (minimum: $P'$ zmienia znak z $-$ na $+$).`, askP ? T`$P(${x}) = ${x * x} + ${(4 * V) / x} = ${3 * x * x}$.` : T`Krawędź dna: $${x}$.`],
    trap: 'Bez pokrywki w modelu jest $x^2$, a nie $2x^2$ – to zmienia wynik.',
    tip: TIP_OPT
  });
};

const cylinderOpt = (r) => {
  const t = r.int(1, 5);
  const V = 2 * t ** 3;
  const P = (s) => 2 * Math.PI * s * s + (2 * V * Math.PI) / s;
  need(near(argOpt(P, 0.01, 4 * t), t));
  const askH = r.bool();
  return num({
    title: 'Walec o najmniejszym polu',
    q: T`Rozpatrujemy walce o objętości $${V}\pi$. Oblicz ${askH ? 'wysokość' : 'promień podstawy'} walca o najmniejszym polu powierzchni całkowitej. Wpisz liczbę.`,
    ans: askH ? 2 * t : t,
    steps: [T`$h = \frac{${V}}{r^2}$, $P(r) = 2\pi r^2 + \frac{${2 * V}\pi}{r}$, $P'(r) = 4\pi r - \frac{${2 * V}\pi}{r^2} = 0$ dla $r^3 = ${t ** 3}$, czyli $r = ${t}$.`, askH ? T`$h = \frac{${V}}{${t * t}} = ${2 * t}$ – wysokość równa średnicy.` : T`Promień: $r = ${t}$ (minimum, bo $P'$ zmienia znak z $-$ na $+$).`],
    trap: 'Wynik warto sprawdzić: walec o najmniejszym polu przy danej objętości ma wysokość równą średnicy.',
    tip: TIP_SOLID
  });
};

const SOLID_FACTS = [
  ['Spośród walców o danej objętości najmniejsze pole powierzchni całkowitej ma walec, którego wysokość jest równa średnicy podstawy.', true, T`Z warunku $P'(r) = 0$: $h = 2r$.`],
  ['Spośród prostopadłościanów o kwadratowej podstawie i danej objętości najmniejsze pole powierzchni całkowitej ma sześcian.', true, T`$P'(x) = 0$ daje $x^3 = V$, czyli $h = x$.`],
  ['Pudełko bez pokrywki o danej objętości i najmniejszym polu jest sześcianem.', false, T`$x^3 = 2V$, a wysokość to połowa krawędzi dna.`],
  ['W zadaniu z bryłą funkcja celu zależy zawsze od dwóch zmiennych.', false, 'Warunek (np. objętość) pozwala usunąć jedną zmienną.']
];

/** Prostopadłościan o podstawie x × kx, objętość V, z pokrywką lub bez – dane z wynikiem całkowitym x. */
function boxCase(r) {
  const k = r.pick([1, 2, 3]);
  const closed = r.bool();
  const t = r.int(1, 6);
  // P(x) = (closed ? 2 : 1)kx^2 + 2(1 + k)V/(kx); P'(x) = 0  =>  x^3 = (1 + k)V / ((closed ? 2 : 1) k^2)
  const c = closed ? 2 : 1;
  const V = (c * k * k * t ** 3) / (1 + k);
  need(Number.isInteger(V) && V <= 2000);
  const P = (x) => c * k * x * x + (2 * (1 + k) * V) / (k * x);
  need(near(argOpt(P, 0.01, 4 * t), t));
  const h = V / (k * t * t);
  return { k, closed, t, V, c, P, h };
}

/** Ułamek n / (d·x^p) w postaci skróconej: overX(108, 1, 1) -> \frac{108}{x}, overX(16, 3, 2) -> \frac{16}{3x^2}. */
function overX(n, d, p) {
  const g = gcd(n, d);
  const [a, b] = [n / g, d / g];
  const xp = p === 1 ? 'x' : `x^${p}`;
  return `\\frac{${a}}{${b === 1 ? '' : b}${xp}}`;
}

const openBox = (r) => {
  const b = boxCase(r);
  const base = b.k === 1 ? 'kwadratową podstawę' : `prostokątną podstawę, w której jeden bok jest ${b.k === 2 ? 'dwa' : 'trzy'} razy dłuższy od drugiego`;
  const A = b.c * b.k;
  const Bn = 2 * (1 + b.k) * b.V;
  const hT = overX(b.V, b.k, 2);
  const kx = b.k === 1 ? 'x' : `${b.k}x`;
  const Ptex = `${A === 1 ? '' : A}x^2 + ${overX(Bn, b.k, 1)}`;
  return open({
    title: 'Optymalizacja: prostopadłościan z najmniejszym polem',
    q: T`${b.closed ? 'Prostopadłościan' : 'Pudełko bez pokrywki w kształcie prostopadłościanu'} ma objętość $${b.V}$ i ${base}. Wyznacz wymiary ${b.closed ? 'prostopadłościanu' : 'pudełka'} o najmniejszym polu powierzchni${b.closed ? ' całkowitej' : ''}.`,
    stages: [
      [1, 'Etap 1', T`Oznaczenie ${b.k === 1 ? 'krawędzi podstawy' : 'krótszej krawędzi podstawy'} przez $x$ i wyrażenie wysokości: $h = ${hT}$.`],
      [2, 'Etap 2', T`Funkcja celu z dziedziną: $P(x) = ${Ptex}$, $x > 0$.`],
      [3, 'Etap 3', T`Pochodna i jej miejsce zerowe: $P'(x) = ${2 * A}x - ${overX(Bn, b.k, 2)}$, $x = ${b.t}$.`],
      [4, 'Etap 4', T`Uzasadnienie minimum: $P'(x) < 0$ dla $x < ${b.t}$ i $P'(x) > 0$ dla $x > ${b.t}$.`],
      [5, 'Komplet', T`Wymiary: $${b.t} \times ${b.k * b.t} \times ${fr(b.V, b.k * b.t * b.t)}$.`]
    ],
    zero: ['Rozwiązanie bez dziedziny funkcji i bez uzasadnienia minimum nie daje pełnej liczby punktów.'],
    steps: [
      T`Krawędzie podstawy: $x$ i $${kx}$, wysokość $h = \frac{${b.V}}{x \cdot ${kx}} = ${hT}$.`,
      T`Pole: ${b.closed ? 'dwie podstawy' : 'jedna podstawa'} i cztery ściany: $P(x) = ${A === 1 ? '' : A}x^2 + 2h(x + ${kx}) = ${Ptex}$ dla $x > 0$.`,
      T`$P'(x) = ${2 * A}x - ${overX(Bn, b.k, 2)} = 0$ dla $x^3 = ${b.t ** 3}$, czyli $x = ${b.t}$.`,
      T`$P'$ zmienia znak z $-$ na $+$, więc w $x = ${b.t}$ jest minimum (wartość najmniejsza na $(0, +\infty)$).`,
      T`Wymiary: $${b.t} \times ${b.k * b.t} \times ${fr(b.V, b.k * b.t * b.t)}$.`
    ],
    trap: 'Policz ściany dokładnie: dwie pary ścian bocznych mają różne pola, gdy podstawa nie jest kwadratem.',
    tip: TIP_OPT,
    answer: m(T`${b.t} \times ${b.k * b.t} \times ${fr(b.V, b.k * b.t * b.t)}`)
  });
};

// ---------- 15.4 Układ współrzędnych i figury płaskie ----------
const parabolaRect = (r) => {
  const k = r.pick([1, 2, 3]);
  const t = r.int(1, 4);
  const c = 3 * k * t * t;
  const P = (x) => 2 * x * (c - k * x * x);
  need(near(argOpt(P, 0, Math.sqrt(c / k), true), t));
  const askArea = r.bool();
  return num({
    title: 'Prostokąt pod parabolą',
    q: T`W obszar ograniczony parabolą $y = ${c} - ${k === 1 ? '' : k}x^2$ i osią $Ox$ wpisano prostokąt o największym polu, którego dwa wierzchołki leżą na osi $Ox$, a dwa na paraboli. ${askArea ? 'Oblicz pole tego prostokąta.' : 'Oblicz odciętą jego prawego górnego wierzchołka.'} Wpisz liczbę.`,
    ans: askArea ? 4 * k * t ** 3 : t,
    steps: [T`$P(x) = 2x(${c} - ${k === 1 ? '' : k}x^2)$, $P'(x) = ${2 * c} - ${6 * k}x^2 = 0$ dla $x = ${t}$ (maksimum).`, askArea ? T`$P(${t}) = ${2 * t} \cdot ${c - k * t * t} = ${4 * k * t ** 3}$.` : T`Odcięta: $x = ${t}$.`],
    trap: 'Podstawa prostokąta to $2x$ (symetria względem osi $Oy$), a nie $x$.',
    tip: TIP_OPT
  });
};

const sqrtClosest = (r) => {
  const a = r.int(1, 9);
  const d2 = (x) => (x - a) ** 2 + x;
  const x0 = a - 0.5;
  need(near(argOpt(d2, 0, a + 2), x0));
  return num({
    title: 'Punkt wykresu najbliższy danemu punktowi',
    q: T`Na wykresie funkcji $y = \sqrt{x}$ wyznaczono punkt $P$ położony najbliżej punktu $A = (${a}, 0)$. Oblicz odciętą punktu $P$. Wpisz liczbę.`,
    ans: x0,
    steps: [T`$|AP|^2 = (x - ${a})^2 + (\sqrt{x})^2 = ${terms([[1, 'x^2'], [1 - 2 * a, 'x'], [a * a, '']])} = f(x)$.`, T`$f'(x) = 2x ${1 - 2 * a < 0 ? '-' : '+'} ${Math.abs(1 - 2 * a)} = 0$ dla $x = ${String(x0).replace('.', '{,}')}$ (minimum).`],
    trap: 'Minimalizuj KWADRAT odległości – unikasz pierwiastka, a minimum jest w tym samym punkcie.',
    tip: TIP_OPT
  });
};

const lineRect = (r) => {
  const a = 2 * r.int(1, 6);
  const b = 2 * r.int(1, 6);
  const P = (x) => x * b * (1 - x / a);
  need(near(argOpt(P, 0, a, true), a / 2));
  return num({
    title: 'Prostokąt z wierzchołkiem na prostej',
    q: T`Prostokąt ma dwa boki na osiach układu współrzędnych, a wierzchołek $(x, y)$, $x > 0$, $y > 0$, na prostej $\frac{x}{${a}} + \frac{y}{${b}} = 1$. Oblicz największe możliwe pole tego prostokąta. Wpisz liczbę.`,
    ans: (a * b) / 4,
    steps: [T`$y = ${b}\left(1 - \frac{x}{${a}}\right)$, więc $P(x) = ${b}x - ${coef(b, a)}x^2$, $x \in (0, ${a})$.`, T`$P'(x) = ${b} - ${coef(2 * b, a)}x = 0$ dla $x = ${a / 2}$; $P(${a / 2}) = ${(a * b) / 4}$.`],
    trap: 'Wyraź $y$ przez $x$ z równania prostej – funkcja celu ma mieć jedną zmienną.',
    tip: TIP_OPT
  });
};

const COORD_FACTS = [
  ['Punkt wykresu funkcji położony najbliżej danego punktu można wyznaczyć, minimalizując kwadrat odległości.', true, 'Odległość i jej kwadrat mają minimum w tym samym punkcie.'],
  [T`Prostokąt o największym polu wpisany w obszar pod parabolą $y = c - x^2$ jest kwadratem.`, false, T`Ma boki $2x$ i $c - x^2$ z $x = \sqrt{\frac{c}{3}}$, czyli $2\sqrt{\frac{c}{3}} \ne \frac{2c}{3}$ w ogólności.`],
  ['Dziedzina funkcji celu dla prostokąta pod parabolą wynika z warunku, że wierzchołek leży nad osią $Ox$.', true, T`Potrzeba $c - x^2 > 0$.`],
  ['Wartość największa funkcji na przedziale otwartym zawsze istnieje.', false, T`Np. $f(x) = x$ na $(0, 1)$ nie ma wartości największej.`]
];

const openParabolaRect = (r) => {
  const k = r.pick([1, 2, 3]);
  const t = r.int(1, 4);
  const c = 3 * k * t * t;
  const P = (x) => 2 * x * (c - k * x * x);
  need(near(argOpt(P, 0, Math.sqrt(c / k), true), t));
  const kk = k === 1 ? '' : `${k}`;
  return open({
    title: 'Prostokąt o największym polu pod parabolą',
    q: T`W obszar ograniczony parabolą $y = ${c} - ${kk}x^2$ i osią $Ox$ wpisujemy prostokąty, których dwa wierzchołki leżą na osi $Ox$, a dwa pozostałe – na paraboli. Wyznacz wymiary i pole prostokąta o największym polu.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie funkcji pola: $P(x) = 2x(${c} - ${kk}x^2) = ${2 * c}x - ${2 * k}x^3$.`],
      [2, 'Etap 2', T`Dziedzina: $x \in (0, ${sq(c / k)})$.`],
      [3, 'Etap 3', T`Pochodna $P'(x) = ${2 * c} - ${6 * k}x^2$ i jej miejsce zerowe w dziedzinie: $x = ${t}$.`],
      [4, 'Etap 4', T`Uzasadnienie maksimum: $P'(x) > 0$ dla $x \in (0, ${t})$ i $P'(x) < 0$ dla $x \in (${t}, ${sq(c / k)})$.`],
      [5, 'Komplet', T`Wymiary $${2 * t} \times ${c - k * t * t}$, pole $${4 * k * t ** 3}$.`]
    ],
    steps: [
      T`Prawy górny wierzchołek: $(x, ${c} - ${kk}x^2)$; prostokąt ma boki $2x$ i $${c} - ${kk}x^2$.`,
      T`$P(x) = ${2 * c}x - ${2 * k}x^3$ dla $x \in (0, ${sq(c / k)})$.`,
      T`$P'(x) = ${2 * c} - ${6 * k}x^2 = 0$ dla $x^2 = ${t * t}$, czyli $x = ${t}$; pochodna zmienia znak z $+$ na $-$ – maksimum.`,
      T`Boki: $2 \cdot ${t} = ${2 * t}$ i $${c} - ${k * t * t} = ${c - k * t * t}$, pole $${4 * k * t ** 3}$.`
    ],
    trap: 'Dziedzina wynika z położenia wierzchołka nad osią $Ox$: $c - kx^2 > 0$.',
    tip: TIP_OPT,
    answer: m(T`${2 * t} \times ${c - k * t * t}, \ P_{\max} = ${4 * k * t ** 3}`)
  });
};

// ---------- 15.5 Kontekst praktyczny ----------
const avgCost = (r) => {
  const t = r.int(2, 30);
  const d = r.int(1, 50);
  const f = (x) => x + (t * t) / x + d;
  need(near(argOpt(f, 0.1, 5 * t), t));
  return num({
    title: 'Najniższy koszt jednostkowy',
    q: T`Koszt wytworzenia jednej sztuki towaru przy produkcji $x$ sztuk dziennie wynosi $k(x) = x + \frac{${t * t}}{x} + ${d}$ zł, $x > 0$. Oblicz, przy jakiej dziennej produkcji koszt jednej sztuki jest najniższy. Wpisz liczbę.`,
    ans: t,
    steps: [T`$k'(x) = 1 - \frac{${t * t}}{x^2} = 0$ dla $x = ${t}$.`, T`$k'$ zmienia znak z $-$ na $+$ – minimum: $k(${t}) = ${2 * t + d}$ zł.`],
    trap: 'Stała $d$ nie wpływa na położenie minimum – znika przy różniczkowaniu.',
    tip: TIP_OPT
  });
};

const travelSpeed = (r) => {
  const [a, b] = r.pick([[10, 40], [20, 45], [10, 90], [40, 40], [20, 80], [5, 80], [25, 64]]);
  const dist = r.pick([100, 200, 300, 400, 500]);
  const v = Math.sqrt(a * b);
  const K = (s) => dist * (s / a + b / s);
  need(near(argOpt(K, 1, 300), v));
  return num({
    title: 'Optymalna prędkość',
    q: T`Koszt przejazdu trasy długości $${dist}$ km z prędkością $v$ km/h wyraża się wzorem $K(v) = ${dist}\left(\frac{v}{${a}} + \frac{${b}}{v}\right)$ zł. Oblicz prędkość, przy której koszt jest najmniejszy. Wpisz liczbę.`,
    ans: v,
    steps: [T`$K'(v) = ${dist}\left(\frac{1}{${a}} - \frac{${b}}{v^2}\right) = 0$ dla $v^2 = ${a * b}$.`, T`$v = ${v}$ km/h (minimum: $K'$ zmienia znak z $-$ na $+$).`],
    trap: 'Ujemne rozwiązanie $v^2 = \\ldots$ odrzucasz – prędkość jest dodatnia.',
    tip: TIP_OPT
  });
};

const profitMax = (r) => {
  const rr = r.int(2, 8);
  const c = r.int(10, 100);
  const Z = (x) => -(x ** 3) + 3 * rr * rr * x - c;
  const zmax = 2 * rr ** 3 - c;
  need(near(Z(argOpt(Z, 0, 3 * rr, true)), zmax));
  return mc({
    title: 'Największy zysk',
    q: T`Zysk firmy (w tys. zł) przy sprzedaży $x$ ton towaru wyraża się wzorem $Z(x) = -x^3 + ${3 * rr * rr}x - ${c}$, $x > 0$. Największy możliwy zysk jest równy`,
    ok: m(`${zmax}`),
    val: zmax,
    bad: [m(`${rr}`), m(`${rr ** 3 - c}`), m(`${2 * rr ** 3}`), m(`${3 * rr ** 3 - c}`)],
    steps: [T`$Z'(x) = -3x^2 + ${3 * rr * rr} = 0$ dla $x = ${rr}$; $Z'$ zmienia znak z $+$ na $-$ – maksimum.`, T`$Z(${rr}) = -${rr ** 3} + ${3 * rr ** 3} - ${c} = ${zmax}$.`],
    trap: 'Pytanie o największy zysk to pytanie o wartość $Z(x_0)$, a nie o $x_0$.',
    tip: TIP_OPT
  });
};

const CONTEXT_FACTS = [
  ['W zadaniu z kontekstem praktycznym odpowiedź trzeba podać w jednostkach z treści zadania.', true, 'Np. w zł, km/h, cm.'],
  ['Jeśli funkcja kosztu ma na dziedzinie jedno minimum lokalne, to jest ono kosztem najmniejszym.', true, 'Funkcja maleje do tego punktu i rośnie za nim.'],
  ['Stały składnik kosztu zmienia położenie minimum funkcji kosztu.', false, 'Stała nie zmienia pochodnej, więc nie przesuwa minimum.'],
  ['W optymalizacji wynik może wyjść poza dziedzinę modelu i nadal być odpowiedzią.', false, 'Rozwiązanie musi należeć do dziedziny.']
];

const openBundle = (r) => {
  const t = r.int(1, 5);
  const k = 2 * t ** 3;
  const cost = r.pick([2, 3, 4, 5]);
  // dno 2 razy droższe niż ściana boczna: K(r) = cost(2πr² + 2πr·h), h = k/r²  =>  K(r) = 2π·cost(r² + k/r)
  const K = (s) => 2 * Math.PI * cost * (s * s + k / s);
  need(near(argOpt(K, 0.01, 4 * t), t));
  return open({
    title: 'Wiązka 2 + 4: koszt pojemnika',
    q: T`Projektujemy otwarty od góry pojemnik w kształcie walca o objętości $${k}\pi$ dm³. Materiał na ścianę boczną kosztuje $${cost}$ zł za dm², a na dno – dwa razy więcej.
a) Wykaż, że koszt materiału jako funkcja promienia $r$ dna wyraża się wzorem $K(r) = ${2 * cost}\pi\left(r^2 + \frac{${k}}{r}\right)$, gdzie $r > 0$.
b) Oblicz promień dna i wysokość pojemnika, dla których koszt materiału jest najmniejszy.`,
    stages: [
      [1, 'Etap 1 (a)', T`Wyrażenie wysokości przez promień z objętości: $h = \frac{${k}}{r^2}$.`],
      [2, 'Etap 2 (a)', T`Zapisanie kosztu: $${2 * cost}\pi r^2 + ${cost} \cdot 2\pi r h = ${2 * cost}\pi\left(r^2 + \frac{${k}}{r}\right)$ i dziedziny $r > 0$.`],
      [3, 'Etap 3 (b)', T`Obliczenie pochodnej: $K'(r) = ${2 * cost}\pi\left(2r - \frac{${k}}{r^2}\right)$.`],
      [4, 'Etap 4 (b)', T`Miejsce zerowe pochodnej: $r^3 = ${t ** 3}$, czyli $r = ${t}$.`],
      [5, 'Etap 5 (b)', T`Uzasadnienie minimum: $K'(r) < 0$ dla $r < ${t}$ i $K'(r) > 0$ dla $r > ${t}$.`],
      [6, 'Komplet', T`Wymiary: $r = ${t}$ dm, $h = ${2 * t}$ dm.`]
    ],
    zero: ['Część b) bez uzasadnienia, że znaleziony punkt daje minimum, nie daje kompletu punktów (najwyżej etap 4).'],
    steps: [
      T`$\pi r^2 h = ${k}\pi$, więc $h = \frac{${k}}{r^2}$.`,
      T`Dno: $\pi r^2$ dm² po $${2 * cost}$ zł, ściana: $2\pi r h$ dm² po $${cost}$ zł: $K(r) = ${2 * cost}\pi r^2 + ${2 * cost}\pi r \cdot \frac{${k}}{r^2} = ${2 * cost}\pi\left(r^2 + \frac{${k}}{r}\right)$.`,
      T`$K'(r) = ${2 * cost}\pi\left(2r - \frac{${k}}{r^2}\right) = \frac{${2 * cost}\pi(2r^3 - ${k})}{r^2}$, zero dla $r = ${t}$.`,
      T`$K'$ zmienia znak z $-$ na $+$ – minimum. $h = \frac{${k}}{${t * t}} = ${2 * t}$.`
    ],
    trap: 'Dno jest dwa razy droższe – mnożnik ceny trzeba zapisać przy właściwym polu, inaczej model jest błędny od pierwszego etapu.',
    tip: TIP_OPT,
    answer: m(T`r = ${t} \ \text{dm}, \ h = ${2 * t} \ \text{dm}`)
  });
};

const factsGen = (pool, title, trap, tip) => (r) => {
  const [s1, s2] = pickTwo(r, pool);
  return pf({ title, s1, s2, trap, tip });
};

export default {
  numericId: 15,
  title: 'Optymalizacja z pochodną',
  short_title: 'Optymalizacja',
  description: 'Model i dziedzina funkcji celu, schemat 4 pkt z pochodną, bryły, figury w układzie współrzędnych i zadania z kontekstem (wiązka 2 + 4).',
  icon: 'Target',
  color: '#FFB800',
  matura_points_range: '6 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 24–31',
  cke_stats: 'W 10 z 11 arkuszy CKE 2022–2026, średnio około 6 pkt na arkusz (XIII.R6 – zwykle wiązka 2 + 4 pkt).',
  lessons: [
    {
      title: 'Model, funkcja celu i dziedzina',
      short_title: 'Model i dziedzina',
      requirements: ['XIII.R6'],
      prereq: ['math-lesson-15-2'],
      pill: pill({
        essence: T`Zadanie optymalizacyjne zaczyna się od modelu: oznaczasz zmienną, z warunku (objętość, obwód, położenie na wykresie) wyrażasz pozostałe wielkości przez nią, zapisujesz funkcję celu i jej dziedzinę. W arkuszu CKE to często osobne zadanie za 2 pkt: „Wykaż, że $P(x) = \ldots$”.`,
        context: 'Na maturze PR optymalizacja to zwykle wiązka 2 + 4 pkt; pierwsza część to właśnie model z dziedziną (XIII.R6).',
        pl: T`Masz dwie niewiadome (krawędź i wysokość), a jedną informację (objętość). Ta informacja to „przelicznik”: zamienia wysokość na wyrażenie z krawędzią. Zostaje jedna zmienna.`,
        steps: [
          ['Zmienna', 'Nazwij ją i zaznacz na rysunku.', 'Zwykle długość.'],
          ['Warunek', 'Wyraź resztę przez zmienną.', 'h = V/x².'],
          ['Funkcja i dziedzina', 'Wzór + dodatnie wymiary.', 'Przedział otwarty.']
        ],
        formulas: [
          ['Prostopadłościan', T`V = x^2h, \quad P = 2x^2 + 4xh`, 24],
          ['Walec', T`V = \pi r^2h, \quad P = 2\pi r^2 + 2\pi rh`, 25],
          ['Prostokąt', T`P = ab, \quad L = 2a + 2b`]
        ],
        examples: [
          ['Pudełko', '2 pkt', T`Bez pokrywki, dno kwadratowe, $V = 4$.`, T`1. $h = \frac{4}{x^2}$.` + '\n' + T`2. $P(x) = x^2 + \frac{16}{x}$, $x > 0$.`, 'Jedna podstawa.'],
          ['Dziedzina', '1 pkt', T`Krawędzie sumują się do 48, podstawa kwadratowa.`, T`1. $h = 12 - 2x$.` + '\n' + T`2. $x \in (0, 6)$.`, 'Wszystkie wymiary dodatnie.']
        ],
        trap: 'Brak dziedziny w modelu to najczęstszy powód utraty punktu w części „Wykaż, że…”.',
        fail: T`„$P(x) = x^2 + \frac{16}{x}$.” (bez dziedziny)`,
        win: T`$P(x) = x^2 + \frac{16}{x}$ dla $x \in (0, +\infty)$.`,
        why: 'Funkcja celu bez dziedziny nie opisuje sytuacji z zadania.',
        ckeTip: 'W części „Wykaż, że” przepisz wynik dokładnie w postaci z treści – egzaminator porównuje ją z kluczem.',
        points: ['Jedna zmienna dzięki warunkowi.', 'Dziedzina: wymiary dodatnie.', 'Policz ściany i podstawy.']
      }),
      gens: [boxModel, domainChoice, cylinderHeight, factsGen(MODEL_FACTS, 'Modele w optymalizacji', 'Wymiary są dodatnie – dziedzina jest zwykle przedziałem otwartym.', TIP_MODEL), openModel]
    },
    {
      title: 'Schemat 4 pkt: pochodna, zero, znak, wartość',
      short_title: 'Schemat 4 pkt',
      requirements: ['XIII.R6', 'XIII.R5'],
      prereq: ['math-lesson-15-5'],
      pill: pill({
        essence: T`Klucz CKE punktuje optymalizację w czterech etapach: (1) pochodna funkcji celu, (2) miejsce zerowe pochodnej w dziedzinie, (3) uzasadnienie, że to minimum lub maksimum – znak pochodnej po obu stronach, (4) wartość funkcji i odpowiedź na pytanie z zadania.`,
        context: 'Schemat 4 pkt (XIII.R6) jest stały od 2023 r. Pominięcie uzasadnienia ekstremum ogranicza wynik do 2 z 4 pkt.',
        pl: T`To jak przepis: pochodna – przyrównaj do zera – sprawdź, czy przed i po tym punkcie funkcja maleje i rośnie (albo odwrotnie) – policz wartość. Bez trzeciego kroku przepis jest niedokończony.`,
        steps: [
          ['Pochodna', T`$P'(x)$ – wspólny mianownik.`, 'Iloraz: właściwy wzór.'],
          ['Zero i znak', 'Miejsce zerowe w dziedzinie i znak P′.', 'Z − na + to minimum.'],
          ['Wartość', 'P(x₀) i odpowiedź słowami.', 'Jednostki.']
        ],
        formulas: [
          ['Potęga ujemna', T`\left(\frac{a}{x}\right)' = -\frac{a}{x^2}`, 30],
          ['Minimum', T`f' \ \text{zmienia znak z} - \text{na} +`],
          ['Przedział domknięty', T`\min \ \text{wśród} \ f(a), f(b), f(x_0)`]
        ],
        examples: [
          ['Minimum', '4 pkt', T`$f(x) = 2x + \frac{8}{x}$, $x > 0$.`, T`1. $f'(x) = 2 - \frac{8}{x^2} = 0$, $x = 2$.` + '\n' + T`2. Znak: $-$ potem $+$, $f(2) = 8$.`, 'Uzasadnij znakiem.'],
          ['Przedział', '3 pkt', T`$f(x) = x^3 - 3x$ w $\langle 0, 3 \rangle$.`, T`1. $f(1) = -2$, $f(0) = 0$, $f(3) = 18$.` + '\n' + T`2. Najmniejsza: $-2$.`, 'Porównaj z końcami.']
        ],
        trap: T`Samo $f'(x_0) = 0$ nie dowodzi minimum – trzeba pokazać zmianę znaku pochodnej (albo monotoniczność).`,
        fail: '„P′(x) = 0 dla x = 2, więc pole jest najmniejsze dla x = 2.”',
        win: '„P′ < 0 dla x < 2 i P′ > 0 dla x > 2, więc w x = 2 jest minimum.”',
        why: 'Punkt krytyczny może być maksimum.',
        ckeTip: 'Wypisz etapy w kolejności klucza – każdy jest wart 1 pkt, także przy błędzie rachunkowym w kolejnym.',
        points: ['Pochodna → zero → znak → wartość.', 'Bez znaku najwyżej 2/4 pkt.', 'Przedział domknięty: sprawdź końce.']
      }),
      gens: [boxArgMin, boxMinValue, cubicInterval, factsGen(OPT_FACTS, 'Ekstrema w optymalizacji', 'Miejsce zerowe pochodnej to dopiero kandydat na ekstremum.', TIP_OPT), openFourStep]
    },
    {
      title: 'Bryły: prostopadłościan i walec',
      short_title: 'Optymalizacja brył',
      requirements: ['XIII.R6', 'X.5'],
      prereq: ['math-lesson-11-4'],
      pill: pill({
        essence: T`W optymalizacji brył warunek (zwykle objętość) usuwa jedną zmienną: $h = \frac{V}{x^2}$ albo $h = \frac{V}{\pi r^2}$. Funkcja pola ma postać $ax^2 + \frac{b}{x}$, a jej minimum wyznaczasz pochodną. Przydatne kontrole: sześcian (bryła z pokrywką), walec z $h = 2r$.`,
        context: 'Zadania z bryłami (X.5 + XIII.R6) to najczęstszy kontekst optymalizacji na arkuszach PR – pudełka, puszki, pojemniki.',
        pl: T`Za płaskie pudełko – ogromne dno. Za wysokie – ogromne ściany. Pochodna znajduje złoty środek, w którym materiału jest najmniej.`,
        steps: [
          ['Wymiary', 'Podstawa przez x, wysokość z V.', 'Rysunek bryły.'],
          ['Pole', 'Policz wszystkie ściany.', 'Pokrywka czy bez?'],
          ['Pochodna', 'Schemat 4 pkt.', 'Wymiary w odpowiedzi.']
        ],
        formulas: [
          ['Pudełko z pokrywką', T`P(x) = 2x^2 + \frac{4V}{x}`],
          ['Pudełko bez pokrywki', T`P(x) = x^2 + \frac{4V}{x}`],
          ['Walec', T`P(r) = 2\pi r^2 + \frac{2V}{r}`, 25]
        ],
        examples: [
          ['Pudełko', '4 pkt', T`Bez pokrywki, $V = 32$.`, T`1. $P'(x) = 2x - \frac{128}{x^2} = 0$, $x = 4$.` + '\n' + T`2. Wymiary $4 \times 4 \times 2$.`, 'h = V/x².'],
          ['Walec', '4 pkt', T`$V = 16\pi$, najmniejsze pole.`, T`1. $P'(r) = 4\pi r - \frac{32\pi}{r^2} = 0$, $r = 2$.` + '\n' + T`2. $h = 4$.`, 'h = 2r.']
        ],
        trap: 'Gdy podstawa jest prostokątem $x \\times kx$, ściany boczne tworzą DWIE pary o różnych polach.',
        fail: T`„Podstawa $x \times 2x$: ściany boczne $4 \cdot x \cdot h$.”`,
        win: T`Ściany: $2 \cdot xh + 2 \cdot 2xh = 6xh$.`,
        why: 'Pary ścian mają różne krawędzie podstawy.',
        ckeTip: 'Odpowiedz na pytanie z zadania: gdy pytają o wymiary, podaj wszystkie trzy, nie tylko $x$.',
        points: ['Wysokość z objętości.', 'Policz ściany dokładnie.', 'Podaj wszystkie wymiary.']
      }),
      gens: [openBoxSide, cylinderOpt, openBoxSide, factsGen(SOLID_FACTS, 'Bryły optymalne', 'Wynik sprawdź proporcją: sześcian, h = 2r albo h = x/2.', TIP_SOLID), openBox]
    },
    {
      title: 'Układ współrzędnych i figury płaskie',
      short_title: 'Figury w układzie',
      requirements: ['XIII.R6', 'IX.2'],
      prereq: ['math-lesson-15-1'],
      pill: pill({
        essence: T`Gdy figura ma wierzchołek na wykresie funkcji, jego współrzędne to $(x, f(x))$ – stąd długości boków i funkcja celu jednej zmiennej. Odległość punktu wykresu od danego punktu minimalizujesz przez kwadrat odległości. Dziedzina wynika z położenia wierzchołka (np. nad osią $Ox$).`,
        context: 'Figury w układzie współrzędnych to drugi typowy kontekst optymalizacji (np. prostokąt pod parabolą, punkt najbliższy wykresu).',
        pl: T`Prawy górny róg prostokąta „jedzie” po paraboli. Gdy idzie w prawo, prostokąt robi się szerszy, ale niższy. Pochodna wskazuje miejsce, gdzie pole jest największe.`,
        steps: [
          ['Punkt na wykresie', T`$(x, f(x))$.`, 'Symetria: bok 2x.'],
          ['Funkcja celu', 'Pole albo kwadrat odległości.', 'Dziedzina.'],
          ['Schemat 4 pkt', 'Pochodna, zero, znak, wartość.', 'Maksimum: z + na −.']
        ],
        formulas: [
          ['Kwadrat odległości', T`d^2 = (x - a)^2 + (f(x) - b)^2`, 21],
          ['Prostokąt pod parabolą', T`P(x) = 2x(c - x^2)`],
          ['Prosta odcinkowa', T`\frac{x}{a} + \frac{y}{b} = 1`]
        ],
        examples: [
          ['Parabola', '4 pkt', T`$y = 12 - x^2$, największy prostokąt.`, T`1. $P(x) = 24x - 2x^3$, $P' = 24 - 6x^2 = 0$, $x = 2$.` + '\n' + T`2. Boki $4 \times 8$, pole $32$.`, 'Maksimum.'],
          ['Najbliższy punkt', '3 pkt', T`$y = \sqrt{x}$, punkt $A = (3, 0)$.`, T`1. $d^2 = x^2 - 5x + 9$.` + '\n' + T`2. $x = \frac{5}{2}$.`, 'Kwadrat odległości.']
        ],
        trap: T`Prostokąt symetryczny względem osi $Oy$ ma podstawę $2x$, a nie $x$ – pole wychodzi dwa razy za małe.`,
        fail: T`„$P(x) = x(12 - x^2)$.”`,
        win: T`$P(x) = 2x(12 - x^2)$.`,
        why: 'Wierzchołki leżą w punktach $x$ i $-x$.',
        ckeTip: 'Podaj współrzędne wierzchołków albo wymiary figury – sama liczba $x$ to nie odpowiedź.',
        points: ['Wierzchołek (x, f(x)).', 'Kwadrat odległości zamiast odległości.', 'Dziedzina z położenia punktu.']
      }),
      gens: [parabolaRect, sqrtClosest, lineRect, factsGen(COORD_FACTS, 'Optymalizacja w układzie współrzędnych', 'Na przedziale otwartym wartość największa nie zawsze istnieje – uzasadnij ją monotonicznością.', TIP_OPT), openParabolaRect]
    },
    {
      title: 'Kontekst praktyczny: pełna wiązka 2 + 4',
      short_title: 'Wiązka 2 + 4',
      requirements: ['XIII.R6', 'X.5', 'VIII.8'],
      prereq: ['math-lesson-15-4'],
      pill: pill({
        essence: T`Pełne zadanie optymalizacyjne CKE ma dwie części: a) „Wykaż, że funkcja celu ma wzór…” (model, 2 pkt) i b) „Oblicz…” (schemat z pochodną, 4 pkt). Kontekst praktyczny – koszt, zysk, prędkość, materiał – dodaje jednostki i ceny, ale matematyka pozostaje ta sama.`,
        context: 'Optymalizacja (XIII.R6) jest w 10 z 11 arkuszy PR – średnio około 6 pkt, najwięcej z jednego tematu.',
        pl: T`Koszt materiału to „pole razy cena”. Jeśli dno jest droższe, jego pole mnożysz przez wyższą cenę – reszta to ten sam rachunek co przy zwykłym polu.`,
        steps: [
          ['a) Model', 'Wymiary, ceny, funkcja, dziedzina.', 'Dokładnie wzór z treści.'],
          ['b) Pochodna', 'Zero w dziedzinie.', 'Usuń stałe czynniki.'],
          ['b) Uzasadnienie', 'Znak pochodnej i odpowiedź.', 'Jednostki.']
        ],
        formulas: [
          ['Koszt', T`K = \text{cena}_1 \cdot P_1 + \text{cena}_2 \cdot P_2`],
          ['Średni koszt', T`k(x) = x + \frac{c}{x}, \ \min \ \text{dla} \ x = \sqrt{c}`],
          ['Walec otwarty', T`P = \pi r^2 + 2\pi rh`, 25]
        ],
        examples: [
          ['Koszt', '6 pkt', T`Walec bez pokrywki, $V = 16\pi$, dno dwa razy droższe (cena ściany $1$).`, T`a) $K(r) = 2\pi r^2 + \frac{32\pi}{r}$.` + '\n' + T`b) $K'(r) = 0$ dla $r = 2$, $h = 4$.`, 'Cena przy właściwym polu.'],
          ['Prędkość', '3 pkt', T`$K(v) = 100\left(\frac{v}{10} + \frac{40}{v}\right)$.`, T`1. $K'(v) = 0$ dla $v^2 = 400$.` + '\n' + T`2. $v = 20$ km/h.`, 'Odrzuć ujemne.']
        ],
        trap: 'Wynik musi należeć do dziedziny i odpowiadać na pytanie z treści (wymiary, prędkość, koszt) – z jednostką.',
        fail: '„r = 2.” (bez wysokości, gdy pytano o wymiary)',
        win: '„r = 2 dm, h = 4 dm.”',
        why: 'Odpowiedź musi zawierać wszystkie szukane wielkości.',
        ckeTip: 'Część a) i b) są oceniane osobno – nawet bez części a) możesz zdobyć 4 pkt w b), korzystając ze wzoru z treści.',
        points: ['a) Model z dziedziną (2 pkt).', 'b) Schemat 4 pkt.', 'Jednostki i pełna odpowiedź.']
      }),
      gens: [avgCost, travelSpeed, profitMax, factsGen(CONTEXT_FACTS, 'Optymalizacja w praktyce', 'Stałe składniki kosztu nie przesuwają minimum.', TIP_OPT), openBundle]
    }
  ]
};
