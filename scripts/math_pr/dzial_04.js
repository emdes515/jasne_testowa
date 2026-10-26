import { T, mc, num, pf, open, pill, fr, dec, quad, lin, xm, m, need, iv } from '../math_pp/lib.js';
import { numTex } from './sets.js';
import { pickTwo } from './common.js';

const TIP_SYM = 'Wykres $y = -f(x)$ to odbicie względem osi $Ox$, $y = f(-x)$ – względem osi $Oy$, $y = -f(-x)$ – względem początku układu współrzędnych.';
const TIP_ABSGRAPH = 'Wykres $y = |f(x)|$: części wykresu pod osią $Ox$ odbijasz nad oś. Liczbę rozwiązań $|f(x)| = m$ odczytujesz z przecięć z prostą $y = m$.';
const TIP_COMPOSE = 'Złożenie $f(g(x))$: najpierw liczysz $g(x)$, a wynik wstawiasz do $f$. Kolejność ma znaczenie.';
const TIP_MONO = 'Funkcja jest rosnąca w przedziale, gdy dla dowolnych $x_1 < x_2$ z tego przedziału $f(x_1) < f(x_2)$, czyli $f(x_1) - f(x_2) < 0$.';
const TIP_EXP = 'Model wykładniczy: $N(t) = N_0 \\cdot k^t$. Co jednostkę czasu wielkość mnoży się przez $k$: zmiana o $(k - 1) \\cdot 100\\%$.';

const pt = (x, y) => `(${x}, ${y})`;

// ---------- 4.1 Symetrie wykresu ----------
const TRANSFORMS = {
  negY: { tex: '-f(x)', map: (x, y) => [x, -y], name: 'osi $Ox$' },
  negX: { tex: 'f(-x)', map: (x, y) => [-x, y], name: 'osi $Oy$' },
  both: { tex: '-f(-x)', map: (x, y) => [-x, -y], name: 'początku układu współrzędnych' }
};

const pointTransform = (r) => {
  const p = r.intNot(-6, 6, 0);
  const q = r.intNot(-6, 6, 0, p, -p);
  const key = r.pick(Object.keys(TRANSFORMS));
  const t = TRANSFORMS[key];
  const [x, y] = t.map(p, q);
  const others = Object.values(TRANSFORMS).filter((o) => o !== t).map((o) => o.map(p, q));
  return mc({
    title: 'Punkt na wykresie po symetrii',
    q: T`Punkt $${pt(p, q)}$ należy do wykresu funkcji $y = f(x)$. Do wykresu funkcji $y = ${t.tex}$ należy punkt`,
    ok: m(pt(x, y)),
    bad: [...others.map(([a, b]) => m(pt(a, b))), m(pt(q, p)), m(pt(p, q))],
    steps: [T`Wykres $y = ${t.tex}$ powstaje z wykresu $f$ przez symetrię względem ${t.name}.`, T`Punkt $${pt(p, q)}$ przechodzi na $${pt(x, y)}$.`],
    trap: 'Minus PRZED $f$ zmienia drugą współrzędną (wartość), minus PRZY $x$ – pierwszą (argument).',
    tip: TIP_SYM
  });
};

const transformedFormula = (r) => {
  const a = r.intNot(-3, 3, 0);
  const b = r.intNot(-6, 6, 0);
  const c = r.intNot(-6, 6, 0);
  const key = r.pick(Object.keys(TRANSFORMS));
  const forms = { negY: quad(-a, -b, -c), negX: quad(a, -b, c), both: quad(-a, b, -c) };
  return mc({
    title: 'Wzór funkcji po symetrii',
    q: T`Funkcja $f$ jest określona wzorem $f(x) = ${quad(a, b, c)}$. Funkcja $g(x) = ${TRANSFORMS[key].tex}$ ma wzór`,
    ok: m(`g(x) = ${forms[key]}`),
    bad: [...Object.entries(forms).filter(([k]) => k !== key).map(([, f]) => m(`g(x) = ${f}`)), m(`g(x) = ${quad(-a, b, c)}`)],
    steps: [
      key === 'negY' ? T`$g(x) = -f(x) = -(${quad(a, b, c)})$ – zmieniamy znaki wszystkich wyrazów.` : key === 'negX' ? T`$g(x) = f(-x) = ${a === 1 ? '' : a === -1 ? '-' : a}(-x)^2 ${b > 0 ? '+' : '-'} ${Math.abs(b)}(-x) ${c > 0 ? '+' : '-'} ${Math.abs(c)}$ – zmienia się tylko wyraz z nieparzystą potęgą $x$.` : T`$g(x) = -f(-x)$: najpierw $f(-x) = ${forms.negX}$, potem zmiana wszystkich znaków.`,
      T`$g(x) = ${forms[key]}$.`
    ],
    trap: T`$(-x)^2 = x^2$ – przy $f(-x)$ wyraz z $x^2$ NIE zmienia znaku.`,
    tip: TIP_SYM
  });
};

const vertexAfterSymmetry = (r) => {
  const p = r.intNot(-5, 5, 0);
  const q = r.intNot(-5, 5, 0);
  const a = r.pick([1, 2, -1]);
  const key = r.pick(Object.keys(TRANSFORMS));
  const [vx, vy] = TRANSFORMS[key].map(p, q);
  const askX = r.bool();
  return num({
    title: 'Wierzchołek paraboli po symetrii',
    q: T`Funkcja $f$ jest określona wzorem $f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}(${xm(p)})^2 ${q > 0 ? '+' : '-'} ${Math.abs(q)}$. Podaj ${askX ? 'pierwszą' : 'drugą'} współrzędną wierzchołka paraboli, która jest wykresem funkcji $g(x) = ${TRANSFORMS[key].tex}$. Wpisz liczbę.`,
    ans: askX ? vx : vy,
    steps: [T`Wierzchołek wykresu $f$: $W = ${pt(p, q)}$.`, T`Symetria względem ${TRANSFORMS[key].name} przenosi go do $${pt(vx, vy)}$.`],
    trap: 'Nie przeliczaj całego wzoru – wystarczy przekształcić jeden punkt: wierzchołek.',
    tip: TIP_SYM
  });
};

const SYM_FACTS = [
  [T`Wykres funkcji $y = -f(x)$ jest symetryczny do wykresu $y = f(x)$ względem osi $Ox$.`, true, 'Każda wartość zmienia znak.'],
  [T`Wykres funkcji $y = f(-x)$ jest symetryczny do wykresu $y = f(x)$ względem osi $Ox$.`, false, 'Względem osi $Oy$ – zmienia się argument, nie wartość.'],
  [T`Jeśli funkcja $f$ jest rosnąca, to funkcja $y = f(-x)$ jest malejąca.`, true, 'Odbicie względem osi $Oy$ odwraca kierunek osi $x$.'],
  [T`Funkcje $f$ oraz $y = -f(x)$ mają te same miejsca zerowe.`, true, T`$-f(x) = 0$ wtedy i tylko wtedy, gdy $f(x) = 0$.`],
  [T`Zbiór wartości funkcji $y = f(-x)$ jest zbiorem liczb przeciwnych do wartości funkcji $f$.`, false, T`Wartości się nie zmieniają – zmienia się tylko argument, przy którym są przyjmowane.`]
];

const symmetryFacts = (r) => {
  const [s1, s2] = pickTwo(r, SYM_FACTS);
  return pf({ title: 'Symetrie wykresów', s1, s2, trap: 'Zawsze pytaj: co się zmienia – argument czy wartość?', tip: TIP_SYM });
};

const openSymmetricParabola = (r) => {
  const a = r.pick([1, 2, -1, -2]);
  const p = r.intNot(-4, 4, 0);
  const q = r.intNot(-6, 6, 0);
  const f = [a, -2 * a * p, a * p * p + q];
  const g = [-a, -2 * a * p, -(a * p * p + q)];
  const gx = (x) => -(f[0] * x * x - f[1] * x + f[2]);
  if (gx(-p) !== -q || g[0] * p * p - g[1] * p + g[2] !== gx(-p)) throw new Error('4.1: kontrola wierzchołka');
  return open({
    title: 'Funkcja symetryczna względem początku układu',
    q: T`Funkcja $f$ jest określona wzorem $f(x) = ${quad(...f)}$. Wyznacz wzór funkcji $g(x) = -f(-x)$ w postaci ogólnej oraz współrzędne wierzchołka paraboli, która jest wykresem funkcji $g$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Wyznaczenie wzoru: $g(x) = ${quad(...g)}$.`],
      [2, 'Komplet', T`Wyznaczenie wierzchołka paraboli: $${pt(-p, -q)}$.`]
    ],
    steps: [
      T`$f(-x) = ${quad(f[0], -f[1], f[2])}$, więc $g(x) = -f(-x) = ${quad(...g)}$.`,
      T`Wierzchołek $f$: $${pt(p, q)}$. Symetria względem początku układu daje $${pt(-p, -q)}$ (to samo daje wzór $p = -\frac{b}{2a}$ dla $g$).`
    ],
    trap: T`W $-f(-x)$ są dwie zmiany: znak argumentu i znak wartości – wierzchołek zmienia obie współrzędne.`,
    tip: TIP_SYM,
    answer: m(`g(x) = ${quad(...g)}, \\; W = ${pt(-p, -q)}`)
  });
};

// ---------- 4.2 Wykresy z modułem i liczba rozwiązań ----------
const humpCount = (q2, mm) => (mm < 0 ? 0 : mm === 0 ? 2 : mm < q2 ? 4 : mm === q2 ? 3 : 2);
const humpF = (p, q) => quad(1, -2 * p, p * p - q * q);

const absSolutionCount = (r) => {
  const p = r.int(-3, 3);
  const q = r.int(1, 3);
  const mm = r.pick([-1, 0, 1, q * q - 1, q * q, q * q + 2, 2 * q * q]);
  const n = humpCount(q * q, mm);
  return num({
    title: 'Liczba rozwiązań równania z modułem funkcji',
    q: T`Ile rozwiązań ma równanie $|${humpF(p, q)}| = ${mm}$? Wpisz liczbę.`,
    ans: n,
    steps: [
      T`$${humpF(p, q)} = (${xm(p)})^2 - ${q * q}$: parabola z wierzchołkiem $${pt(p, -q * q)}$.`,
      T`Po odbiciu części pod osią wykres $y = |f(x)|$ ma „garb” o wysokości $${q * q}$ nad $x = ${p}$.`,
      T`Prosta $y = ${mm}$ przecina ten wykres w $${n}$ punktach.`
    ],
    trap: mm === q * q ? 'Prosta na wysokości „garbu” dotyka go w jednym punkcie – razem 3 rozwiązania, nie 4.' : mm === 0 ? 'Dla $m = 0$ rozwiązaniami są tylko miejsca zerowe $f$ – odbicie niczego nie dokłada.' : mm < 0 ? 'Wartość bezwzględna nie jest ujemna: dla $m < 0$ rozwiązań nie ma.' : 'Policz przecięcia prostej $y = m$ z obiema częściami wykresu: z „garbem” i z ramionami.',
    tip: TIP_ABSGRAPH
  });
};

const threeSolutionsParameter = (r) => {
  const p = r.int(-3, 3);
  const q = r.int(1, 4);
  return mc({
    title: 'Parametr, dla którego są trzy rozwiązania',
    q: T`Równanie $|${humpF(p, q)}| = m$ ma dokładnie trzy rozwiązania dla $m$ równego`,
    ok: m(q * q),
    val: q * q,
    bad: [m(0), m(-q * q), m(2 * q * q), m(q), m(q * q + 1)],
    steps: [T`$|f(x)|$ ma „garb” o wysokości $${q * q}$ (odbity wierzchołek paraboli).`, T`Prosta $y = ${q * q}$ przechodzi przez czubek garbu i przecina dwa „ramiona” – razem trzy punkty.`],
    trap: T`Dla $m = 0$ rozwiązania to tylko miejsca zerowe – są dwa.`,
    tip: TIP_ABSGRAPH
  });
};

const fourSolutionsSet = (r) => {
  const p = r.int(-3, 3);
  const q = r.int(1, 4);
  const want = r.pick([4, 2]);
  const ok = want === 4 ? iv.oo(0, q * q) : `\\{0\\} \\cup ${iv.ro(q * q)}`;
  return mc({
    title: 'Zbiór parametrów dla danej liczby rozwiązań',
    q: T`Równanie $|${humpF(p, q)}| = m$ ma dokładnie ${want === 4 ? 'cztery rozwiązania' : 'dwa rozwiązania'} wtedy i tylko wtedy, gdy`,
    ok: m(`m \\in ${ok}`),
    bad: [m(`m \\in ${iv.cc(0, q * q)}`), m(`m \\in ${iv.ro(q * q)}`), m(`m \\in ${iv.oo(0, q)}`), m(`m \\in ${want === 4 ? `\\{0\\} \\cup ${iv.ro(q * q)}` : iv.oo(0, q * q)}`)],
    steps: [T`Garb wykresu $y = |f(x)|$ ma wysokość $${q * q}$.`, want === 4 ? T`Cztery przecięcia: prosta między osią a czubkiem garbu – $0 < m < ${q * q}$.` : T`Dwa przecięcia: $m = 0$ (miejsca zerowe) albo prosta powyżej garbu – $m > ${q * q}$.`],
    trap: 'Krańce przedziału sprawdzaj osobno: $m = 0$ i $m$ równe wysokości garbu dają inną liczbę rozwiązań.',
    tip: TIP_ABSGRAPH
  });
};

const ABS_GRAPH_FACTS = [
  [T`Wykres $y = |f(x)|$ powstaje przez odbicie względem osi $Ox$ tych części wykresu $f$, które leżą pod osią.`, true, 'Wartości ujemne zmieniają znak, nieujemne zostają.'],
  [T`Wykres $y = f(|x|)$ jest symetryczny względem osi $Oy$.`, true, T`$f(|-x|) = f(|x|)$.`],
  [T`Funkcja $y = |f(x)|$ może przyjmować wartości ujemne.`, false, 'Wartość bezwzględna jest nieujemna.'],
  [T`Wykresy $y = |f(x)|$ i $y = f(|x|)$ są zawsze takie same.`, false, T`Dla $f(x) = x - 1$: $|f(0)| = 1$, a $f(|0|) = -1$.`]
];

const absGraphFacts = (r) => {
  const [s1, s2] = pickTwo(r, ABS_GRAPH_FACTS);
  return pf({ title: 'Wykresy z wartością bezwzględną', s1, s2, trap: '$|f(x)|$ działa na wartościach (oś $Oy$), $f(|x|)$ – na argumentach (oś $Ox$).', tip: TIP_ABSGRAPH });
};

const openTwoSolutionsParameter = (r) => {
  const p = r.int(-3, 3);
  const q = r.int(1, 4);
  const count = (mm) => {
    if (mm < 0) return 0;
    const sols = new Set();
    for (const s of [mm, -mm]) {
      const d = q * q + s;
      if (d > 1e-12) [p - Math.sqrt(d), p + Math.sqrt(d)].forEach((x) => sols.add(Math.round(x * 1e9)));
      else if (Math.abs(d) <= 1e-12) sols.add(Math.round(p * 1e9));
    }
    return sols.size;
  };
  for (let mm = -5; mm <= 3 * q * q; mm += 0.5) if ((count(mm) === 2) !== (mm === 0 || mm > q * q)) throw new Error('4.2: kontrola liczby rozwiązań');
  const answer = `m \\in \\{0\\} \\cup ${iv.ro(q * q)}`;
  return open({
    title: 'Liczba rozwiązań zależna od parametru',
    q: T`Wyznacz wszystkie wartości parametru $m$, dla których równanie $|${humpF(p, q)}| = m$ ma dokładnie dwa rozwiązania. Zapisz rozumowanie.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie $f(x) = (${xm(p)})^2 - ${q * q}$ i wyznaczenie wierzchołka $${pt(p, -q * q)}$ oraz miejsc zerowych $${p - q}$, $${p + q}$.`],
      [2, 'Etap 2', T`Szkic wykresu $y = |f(x)|$ z „garbem” o wysokości $${q * q}$ nad $x = ${p}$.`],
      [3, 'Komplet', T`Odczytanie zbioru: $${answer}$.`]
    ],
    steps: [
      T`$${humpF(p, q)} = (${xm(p)})^2 - ${q * q}$, miejsca zerowe $${p - q}$ i $${p + q}$, wierzchołek $${pt(p, -q * q)}$.`,
      T`Wykres $|f|$: część między miejscami zerowymi odbita do góry – garb o wysokości $${q * q}$.`,
      T`Dwa rozwiązania: $m = 0$ (tylko miejsca zerowe) albo $m > ${q * q}$ (prosta nad garbem). Odpowiedź: $${answer}$.`
    ],
    trap: T`Dla $0 < m < ${q * q}$ są cztery rozwiązania, a dla $m = ${q * q}$ – trzy. Te przypadki trzeba wykluczyć.`,
    tip: TIP_ABSGRAPH,
    answer: m(answer)
  });
};

// ---------- 4.3 Złożenie funkcji ----------
const composeValue = (r) => {
  const a = r.intNot(-3, 3, 0);
  const b = r.int(-5, 5);
  const c = r.int(-6, 6);
  const t = r.int(-3, 3);
  const g = (x) => x * x + c;
  const f = (x) => a * x + b;
  const order = r.bool();
  const val = order ? f(g(t)) : g(f(t));
  return num({
    title: 'Wartość złożenia funkcji',
    q: T`Funkcje $f$ i $g$ są określone wzorami $f(x) = ${lin(a, b)}$ oraz $g(x) = ${quad(1, 0, c)}$. Oblicz $${order ? `f(g(${t}))` : `g(f(${t}))`}$. Wpisz liczbę.`,
    ans: val,
    steps: order ? [T`$g(${t}) = ${g(t)}$.`, T`$f(${g(t)}) = ${val}$.`] : [T`$f(${t}) = ${f(t)}$.`, T`$g(${f(t)}) = ${val}$.`],
    trap: T`$${order ? 'f(g(t))' : 'g(f(t))'}$ liczysz od środka: najpierw funkcja wewnętrzna.`,
    tip: TIP_COMPOSE
  });
};

const composeFormula = (r) => {
  const a = r.intNot(-3, 3, 0, 1);
  const b = r.intNot(-5, 5, 0);
  const c = r.intNot(-5, 5, 0);
  const fg = quad(a, 0, a * c + b);
  const gf = quad(a * a, 2 * a * b, b * b + c);
  const order = r.bool();
  return mc({
    title: 'Wzór złożenia funkcji',
    q: T`Funkcje $f$ i $g$ są określone wzorami $f(x) = ${lin(a, b)}$ oraz $g(x) = ${quad(1, 0, c)}$. Funkcja $${order ? 'f(g(x))' : 'g(f(x))'}$ ma wzór`,
    ok: m(order ? fg : gf),
    bad: [m(order ? gf : fg), m(quad(a, 0, c + b)), m(quad(a * a, 0, b * b + c)), m(quad(1, a, b + c))],
    steps: order ? [T`$f(g(x)) = ${a}(x^2 ${c > 0 ? '+' : '-'} ${Math.abs(c)}) ${b > 0 ? '+' : '-'} ${Math.abs(b)}$.`, T`$= ${fg}$.`] : [T`$g(f(x)) = (${lin(a, b)})^2 ${c > 0 ? '+' : '-'} ${Math.abs(c)}$.`, T`$= ${gf}$.`],
    trap: T`$f(g(x)) \ne g(f(x))$ – złożenie nie jest przemienne.`,
    tip: TIP_COMPOSE
  });
};

const composeDomain = (r) => {
  const k = r.int(1, 6);
  return mc({
    title: 'Dziedzina złożenia funkcji',
    q: T`Funkcje są określone wzorami $f(x) = \sqrt{x}$ oraz $g(x) = ${k * k} - x^2$. Dziedziną funkcji $f(g(x))$ jest zbiór`,
    ok: m(iv.cc(-k, k)),
    bad: [m(iv.oo(-k, k)), m(`${iv.lc(-k)} \\cup ${iv.rc(k)}`), m(iv.cc(0, k)), m(iv.cc(-k * k, k * k))],
    steps: [T`$f(g(x)) = \sqrt{${k * k} - x^2}$ – wyrażenie pod pierwiastkiem musi być nieujemne.`, T`$${k * k} - x^2 \ge 0$, czyli $x \in ${iv.cc(-k, k)}$.`],
    trap: 'Pierwiastek z zera istnieje – końce przedziału należą do dziedziny.',
    tip: TIP_COMPOSE
  });
};

const composeFacts = (r) => {
  const a = r.intNot(-3, 3, 0);
  const b = r.int(-4, 4);
  const t = r.int(-3, 3);
  const val = (a * t + b) ** 2;
  const honest = r.bool();
  return pf({
    title: 'Złożenie funkcji',
    s1: [T`Dla dowolnych funkcji $f$ i $g$ zachodzi $f(g(x)) = g(f(x))$.`, false, T`Np. $f(x) = x + 1$, $g(x) = x^2$: $f(g(2)) = 5$, a $g(f(2)) = 9$.`],
    s2: [T`Dla $f(x) = x^2$ oraz $g(x) = ${lin(a, b)}$ zachodzi $f(g(${t})) = ${honest ? val : val + r.intNot(-3, 3, 0)}$.`, honest, T`$g(${t}) = ${a * t + b}$, $f(${a * t + b}) = ${val}$.`],
    trap: 'Złożenie liczysz od środka i nie zamieniasz kolejności funkcji.',
    tip: TIP_COMPOSE
  });
};

const openComposeEquation = (r) => {
  const a = r.int(-6, 6);
  const b = r.intNot(-5, 5, 0);
  const x0 = (1 - b) / 2;
  const f = (x) => x * x - a;
  const g = (x) => x + b;
  if (Math.abs(f(g(x0)) - g(f(x0))) > 1e-9) throw new Error('4.3: kontrola rozwiązania');
  return open({
    title: 'Równanie z dwoma złożeniami',
    q: T`Funkcje $f$ i $g$ są określone wzorami $f(x) = ${quad(1, 0, -a)}$ oraz $g(x) = ${xm(-b)}$. Rozwiąż równanie $f(g(x)) = g(f(x))$. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Wyznaczenie $f(g(x)) = (${xm(-b)})^2 ${a < 0 ? '+' : '-'} ${Math.abs(a)}$.`.replace(/ [+-] 0\$/, '$')],
      [2, 'Etap 2', T`Wyznaczenie $g(f(x)) = ${quad(1, 0, -a + b)}$.`],
      [3, 'Komplet', T`Rozwiązanie równania: $x = ${numTex(x0)}$.`]
    ],
    steps: [
      T`$f(g(x)) = (${xm(-b)})^2 ${a < 0 ? '+' : '-'} ${Math.abs(a)} = ${quad(1, 2 * b, b * b - a)}$.`.replace(/ [+-] 0 =/, ' ='),
      T`$g(f(x)) = ${quad(1, 0, -a)} ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${quad(1, 0, b - a)}$.`.replace(/\$ [+-] 0 \+/, '$'),
      T`$${quad(1, 2 * b, b * b - a)} = ${quad(1, 0, b - a)}$, czyli $${lin(2 * b, b * b - b)} = 0$, więc $x = ${numTex(x0)}$.`
    ],
    trap: T`$(x ${b > 0 ? '+' : '-'} ${Math.abs(b)})^2 \ne x^2 ${b > 0 ? '+' : '-'} ${b * b}$ – brakuje wyrazu $${2 * b}x$ ze wzoru skróconego mnożenia.`,
    tip: TIP_COMPOSE,
    answer: m(`x = ${numTex(x0)}`)
  });
};

// ---------- 4.4 Dowód monotoniczności z definicji ----------
const homTex = (a, b) => `\\frac{${xm(-a)}}{${xm(-b)}}`;

const differenceForm = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.intNot(-5, 5, 0, a);
  const den = `(x_1 ${b > 0 ? '+' : '-'} ${Math.abs(b)})(x_2 ${b > 0 ? '+' : '-'} ${Math.abs(b)})`;
  return mc({
    title: 'Różnica wartości funkcji homograficznej',
    q: T`Dla funkcji $f(x) = ${homTex(a, b)}$ i argumentów $x_1, x_2 \ne ${-b}$ różnica $f(x_1) - f(x_2)$ jest równa`,
    ok: m(`\\frac{${b - a}(x_1 - x_2)}{${den}}`),
    bad: [m(`\\frac{${a - b}(x_1 - x_2)}{${den}}`), m(`\\frac{${b - a}(x_2 - x_1)}{${den}}`), m(`\\frac{x_1 - x_2}{${den}}`), m(`\\frac{${b - a}(x_1 - x_2)}{x_1 x_2}`)],
    steps: [
      T`Wspólny mianownik: $${den}$.`,
      T`Licznik: $(x_1 ${a > 0 ? '+' : '-'} ${Math.abs(a)})(x_2 ${b > 0 ? '+' : '-'} ${Math.abs(b)}) - (x_2 ${a > 0 ? '+' : '-'} ${Math.abs(a)})(x_1 ${b > 0 ? '+' : '-'} ${Math.abs(b)}) = ${b - a}x_1 ${a - b > 0 ? '+' : '-'} ${Math.abs(b - a)}x_2 = ${b - a}(x_1 - x_2)$.`
    ],
    trap: 'Wyrazy $x_1 x_2$ i $ab$ się skracają – zostaje tylko to, co zależy od różnicy argumentów.',
    tip: TIP_MONO
  });
};

const monotonicConclusion = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.intNot(-5, 5, 0, a);
  const right = r.bool();
  const ok = b > a ? 'rosnąca' : 'malejąca';
  const interval = right ? iv.ro(-b) : iv.lo(-b);
  return mc({
    title: 'Monotoniczność funkcji homograficznej',
    q: T`Funkcja $f(x) = ${homTex(a, b)}$ w przedziale $${interval}$ jest`,
    ok: ok,
    bad: [b > a ? 'malejąca' : 'rosnąca', 'stała', 'ani rosnąca, ani malejąca'],
    ask: true,
    steps: [
      T`$f(x_1) - f(x_2) = \frac{${b - a}(x_1 - x_2)}{(x_1 ${b > 0 ? '+' : '-'} ${Math.abs(b)})(x_2 ${b > 0 ? '+' : '-'} ${Math.abs(b)})}$.`,
      T`W przedziale $${interval}$ oba czynniki mianownika mają ten sam znak, więc mianownik jest dodatni. Dla $x_1 < x_2$: $x_1 - x_2 < 0$.`,
      T`Znak różnicy to znak liczby $${-(b - a)}$, więc $f(x_1) ${b > a ? '<' : '>'} f(x_2)$ – funkcja jest ${ok}.`
    ],
    trap: 'Iloczyn dwóch liczb ujemnych jest dodatni – w lewym przedziale mianownik też jest dodatni.',
    tip: TIP_MONO
  });
};

const MONO_FACTS = [
  [T`Funkcja jest rosnąca w przedziale, jeśli dla dowolnych $x_1 < x_2$ z tego przedziału $f(x_1) < f(x_2)$.`, true, 'To definicja funkcji rosnącej.'],
  [T`Jeśli $f(1) < f(2)$, to funkcja $f$ jest rosnąca w przedziale $\langle 1, 2 \rangle$.`, false, 'Dwa punkty to za mało – warunek musi zachodzić dla DOWOLNYCH argumentów.'],
  [T`Funkcja $f(x) = \frac{1}{x}$ jest malejąca w zbiorze $(-\infty, 0) \cup (0, +\infty)$.`, false, T`$-1 < 1$, ale $f(-1) = -1 < f(1) = 1$. Jest malejąca w każdym z przedziałów osobno.`],
  [T`Funkcja $f(x) = \frac{1}{x}$ jest malejąca w przedziale $(0, +\infty)$.`, true, T`$f(x_1) - f(x_2) = \frac{x_2 - x_1}{x_1 x_2} > 0$ dla $0 < x_1 < x_2$.`]
];

const monotonicFacts = (r) => {
  const [s1, s2] = pickTwo(r, MONO_FACTS);
  return pf({ title: 'Definicja monotoniczności', s1, s2, trap: 'Monotoniczność bada się w przedziale – przy funkcji z asymptotą osobno po każdej stronie.', tip: TIP_MONO });
};

const reciprocalDifference = (r) => {
  const k = r.intNot(-9, 9, 0);
  const a = r.int(-5, 5);
  const c = r.int(-5, 5);
  return num({
    title: 'Różnica wartości funkcji z asymptotą',
    q: T`Funkcja $f$ jest określona wzorem $f(x) = \frac{${k}}{${xm(a)}} ${c < 0 ? '-' : '+'} ${Math.abs(c)}$ dla $x \ne ${a}$. Oblicz $f(${a + 1}) - f(${a + 2})$. Wpisz liczbę.`.replace(' + 0$', '$'),
    ans: k / 2,
    steps: [T`$f(${a + 1}) = \frac{${k}}{1} ${c < 0 ? '-' : '+'} ${Math.abs(c)}$, $f(${a + 2}) = \frac{${k}}{2} ${c < 0 ? '-' : '+'} ${Math.abs(c)}$.`, T`Różnica: $${k} - \frac{${k}}{2} = ${dec(k / 2, 2)}$ – stała $${c}$ się redukuje.`],
    trap: 'Stała dodana do funkcji przesuwa wykres w pionie – nie zmienia różnicy wartości.',
    tip: TIP_MONO
  });
};

const openMonotonicityProof = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.intNot(-5, 5, 0, a);
  const right = r.bool();
  const interval = right ? iv.ro(-b) : iv.lo(-b);
  const kind = b > a ? 'rosnąca' : 'malejąca';
  const den = `(x_1 ${b > 0 ? '+' : '-'} ${Math.abs(b)})(x_2 ${b > 0 ? '+' : '-'} ${Math.abs(b)})`;
  for (const [x1, x2] of [[1, 2], [3, 7], [0.5, 0.75]]) {
    const s = right ? -b : -b - 10;
    const f = (x) => (x + a) / (x + b);
    const d = f(s + x1) - f(s + x2);
    if (b > a ? d >= 0 : d <= 0) throw new Error('4.4: kontrola monotoniczności');
  }
  return open({
    title: 'Dowód monotoniczności z definicji',
    q: T`Wykaż, że funkcja $f(x) = ${homTex(a, b)}$ jest ${kind} w przedziale $${interval}$.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie różnicy $f(x_1) - f(x_2)$ dla dowolnych $x_1 < x_2$ z przedziału $${interval}$.`],
      [2, 'Etap 2', T`Przekształcenie różnicy do postaci $\frac{${b - a}(x_1 - x_2)}{${den}}$.`],
      [3, 'Komplet', T`Ustalenie znaku: mianownik dodatni, $x_1 - x_2 < 0$, więc $f(x_1) ${b > a ? '<' : '>'} f(x_2)$ – funkcja jest ${kind}.`]
    ],
    steps: [
      T`Niech $x_1, x_2 \in ${interval}$ i $x_1 < x_2$.`,
      T`$f(x_1) - f(x_2) = \frac{${b - a}(x_1 - x_2)}{${den}}$.`,
      T`Oba czynniki mianownika mają ten sam znak (${right ? 'są dodatnie' : 'są ujemne'}), więc mianownik jest dodatni; $x_1 - x_2 < 0$ i $${b - a} ${b > a ? '>' : '<'} 0$, zatem $f(x_1) - f(x_2) ${b > a ? '<' : '>'} 0$. Funkcja jest ${kind} w przedziale $${interval}$.`
    ],
    trap: 'Dowód musi dotyczyć DOWOLNYCH $x_1 < x_2$ z przedziału – obliczenie wartości w kilku punktach nie wystarczy.',
    tip: TIP_MONO,
    answer: m(`f(x_1) - f(x_2) = \\frac{${b - a}(x_1 - x_2)}{${den}} ${b > a ? '<' : '>'} 0`),
    proof: true
  });
};

// ---------- 4.5 Modele wykładnicze i logarytmiczne ----------
const RATES = [1.1, 1.2, 1.25, 1.5, 2, 0.8, 0.9, 0.5];

const percentPerStep = (r) => {
  const k = r.pick(RATES);
  const T0 = r.int(2, 3);
  const N0 = r.pick([1000, 2000, 5000, 10000, 8000]);
  const N1 = N0 * k ** T0;
  need(Math.abs(N1 - Math.round(N1)) < 1e-9);
  const grow = k > 1;
  const pct = Math.round(Math.abs(k - 1) * 100);
  return num({
    title: 'Procentowa zmiana w modelu wykładniczym',
    q: T`Liczebność populacji po $t$ godzinach opisuje wzór $N(t) = N_0 \cdot k^t$. Wiadomo, że $N(0) = ${N0}$ i $N(${T0}) = ${Math.round(N1)}$. O ile procent ${grow ? 'zwiększała' : 'zmniejszała'} się liczebność w ciągu każdej godziny? Wpisz liczbę.`,
    ans: pct,
    steps: [T`$N(0) = N_0 = ${N0}$, więc $${N0} \cdot k^{${T0}} = ${Math.round(N1)}$.`, T`$k^{${T0}} = ${dec(k ** T0, 4)}$, więc $k = ${dec(k, 2)}$.`, T`Co godzinę liczebność mnoży się przez $${dec(k, 2)}$ – zmiana o $${pct}\%$.`],
    trap: T`Wynik $k = ${dec(k, 2)}$ to nie procent zmiany – zmiana to $(k - 1) \cdot 100\%$.`,
    tip: TIP_EXP
  });
};

const halfLife = (r) => {
  const m0 = r.pick([80, 96, 160, 200, 320, 640]);
  const Th = r.pick([2, 3, 5, 8]);
  const n = r.int(1, 4);
  const val = m0 / 2 ** n;
  return num({
    title: 'Okres połowicznego rozpadu',
    q: T`Masa substancji maleje o połowę co $${Th}$ godziny${Th === 2 || Th === 3 ? '' : ''}. Początkowo było $${m0}$ mg. Ile miligramów zostanie po $${n * Th}$ godzinach? Wpisz liczbę.`,
    ans: val,
    steps: [T`$m(t) = ${m0} \cdot \left(\frac{1}{2}\right)^{\frac{t}{${Th}}}$.`, T`Po $${n * Th}$ godzinach minęło $${n}$ okresów: $${m0} \cdot \frac{1}{${2 ** n}} = ${dec(val, 2)}$.`],
    trap: 'Masa nie maleje „o stałą liczbę miligramów” – co okres zostaje połowa tego, co było.',
    tip: TIP_EXP
  });
};

const doublingTime = (r) => {
  const Td = r.int(2, 6);
  const n = r.int(2, 5);
  const ratio = 2 ** n;
  return mc({
    title: 'Czas w modelu wykładniczym z logarytmem',
    q: T`Liczba bakterii rośnie zgodnie ze wzorem $N(t) = N_0 \cdot 2^{\frac{t}{${Td}}}$, gdzie $t$ to czas w godzinach. Liczba bakterii wzrośnie ${ratio}-krotnie po czasie równym`,
    ok: m(`${n * Td}`),
    val: n * Td,
    bad: [m(`${n}`), m(`${ratio * Td}`), m(`${(n + 1) * Td}`), m(`${Td ** n}`)],
    steps: [T`$2^{\frac{t}{${Td}}} = ${ratio} = 2^{${n}}$.`, T`$\frac{t}{${Td}} = ${n}$, więc $t = ${n * Td}$ h. Ogólnie $t = ${Td} \cdot \log_2 ${ratio}$.`],
    trap: T`$${ratio}$-krotny wzrost to $${n}$ podwojeń, a nie $${ratio}$.`,
    tip: TIP_EXP
  });
};

const EXP_FACTS = [
  [T`W modelu $N(t) = N_0 \cdot 1{,}2^t$ wielkość co jednostkę czasu rośnie o $20\%$.`, true, 'Mnożenie przez 1,2 to wzrost o 20%.'],
  [T`W modelu $N(t) = N_0 \cdot 0{,}7^t$ wielkość co jednostkę czasu maleje o $70\%$.`, false, T`Zostaje $70\%$, więc spadek wynosi $30\%$.`],
  [T`W modelu wykładniczym przyrost w każdej jednostce czasu jest taki sam (w liczbach bezwzględnych).`, false, 'Stały jest ILORAZ kolejnych wartości, nie różnica.'],
  [T`Jeśli $N(t) = N_0 \cdot k^t$ i $k > 1$, to funkcja $N$ jest rosnąca.`, true, T`Funkcja wykładnicza o podstawie większej od $1$ jest rosnąca.`]
];

const expFacts = (r) => {
  const [s1, s2] = pickTwo(r, EXP_FACTS);
  return pf({ title: 'Modele wykładnicze', s1, s2, trap: 'Podstawa $k$ mówi, ile ZOSTAJE (lub ile jest) po jednostce czasu – zmianę procentową liczysz z $k - 1$.', tip: TIP_EXP });
};

const openExponentialModel = (r) => {
  const k = r.pick([1.1, 1.2, 1.25, 1.5, 0.8, 0.9]);
  const N0 = r.pick([1000, 2000, 4000, 10000]);
  const T0 = 2;
  const N1 = N0 * k ** T0;
  need(Math.abs(N1 - Math.round(N1)) < 1e-9);
  const grow = k > 1;
  const pct = Math.round(Math.abs(k - 1) * 100);
  return open({
    title: 'Zmiana procentowa w modelu wykładniczym',
    q: T`Liczebność $N$ pewnej populacji po $t$ godzinach jest opisana wzorem $N(t) = N_0 \cdot k^t$, gdzie $N_0$ i $k$ są stałymi dodatnimi. Wiadomo, że $N(0) = ${N0}$ i $N(2) = ${Math.round(N1)}$. Oblicz, o ile procent ${grow ? 'zwiększała' : 'zmniejszała'} się liczebność populacji w ciągu każdej godziny. Zapisz obliczenia.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie równania z jedną niewiadomą: $${Math.round(N1)} = ${N0} \cdot k^2$.`],
      [2, 'Komplet', T`Obliczenie $k = ${dec(k, 2)}$ i odpowiedź: ${grow ? 'wzrost' : 'spadek'} o $${pct}\%$ na godzinę.`]
    ],
    zero: ['Odgadnięcie wyniku bez uzasadnienia, że jest jedyny (np. przez monotoniczność funkcji wykładniczej), to tylko 1 pkt.'],
    steps: [
      T`$N(0) = N_0 \cdot k^0 = N_0$, więc $N_0 = ${N0}$.`,
      T`$N(2) = ${N0} \cdot k^2 = ${Math.round(N1)}$, więc $k^2 = ${dec(k * k, 4)}$ i $k = ${dec(k, 2)}$ (bo $k > 0$).`,
      T`$\frac{N(t + 1)}{N(t)} = k = ${dec(k, 2)}$, więc co godzinę liczebność ${grow ? 'rośnie' : 'maleje'} o $${pct}\%$.`
    ],
    trap: 'Pierwiastkując $k^2$, odrzuć ujemne $k$ – z treści $k > 0$.',
    tip: TIP_EXP,
    answer: m(`${pct}\\%`)
  });
};

export default {
  numericId: 4,
  title: 'Funkcje: przekształcenia, złożenie, monotoniczność',
  short_title: 'Funkcje',
  description: 'Symetrie wykresów, wykresy z wartością bezwzględną, złożenie funkcji, dowód monotoniczności z definicji i modele wykładnicze.',
  icon: 'Layers',
  color: '#FFB800',
  matura_points_range: '2–3 pkt',
  importance: 'HIGH',
  cke_formula_page: 'str. 4–5',
  cke_stats: 'W 6 z 11 arkuszy CKE 2022–2026, średnio 1,3 pkt na arkusz; modele wykładnicze otwierały arkusze maj 2023–2025.',
  lessons: [
    {
      title: 'Symetrie wykresu: −f(x) i f(−x)',
      short_title: 'Symetrie wykresu',
      requirements: ['V.R1'],
      prereq: ['math-lesson-4-4'],
      pill: pill({
        essence: T`Trzy przekształcenia wykresu: $y = -f(x)$ odbija wykres względem osi $Ox$ (zmienia znak wartości), $y = f(-x)$ – względem osi $Oy$ (zmienia znak argumentu), a $y = -f(-x)$ – względem początku układu. Wystarczy przekształcić kilka charakterystycznych punktów, np. wierzchołek paraboli.`,
        context: 'Symetrie wykresów (V.R1) pojawiają się w zadaniach o liczbie rozwiązań i jako element wiązek z funkcjami (np. grudzień 2022, wiązka zadań nr 2).',
        pl: T`$-f(x)$: każda wartość zmienia znak – wykres „przewraca się” do góry nogami. $f(-x)$: to, co było po prawej, ląduje po lewej – lustro postawione na osi $Oy$.`,
        steps: [
          ['Rozpoznaj przekształcenie', T`Minus przed $f$ czy przy $x$?`, 'Przed f – oś Ox, przy x – oś Oy.'],
          ['Przekształć punkty', T`$(x, y) \to (x, -y)$ albo $(-x, y)$.`, 'Wierzchołek, miejsca zerowe.'],
          ['Wzór', T`Podstaw $-x$ zamiast $x$ albo zmień znaki.`, '(−x)² = x².']
        ],
        formulas: [
          ['Symetria względem Ox', T`y = -f(x): \ (x, y) \to (x, -y)`],
          ['Symetria względem Oy', T`y = f(-x): \ (x, y) \to (-x, y)`],
          ['Symetria względem (0, 0)', T`y = -f(-x): \ (x, y) \to (-x, -y)`, 23]
        ],
        examples: [
          ['Wzór', '1 pkt', T`$f(x) = x^2 - 4x + 1$. Wyznacz wzór $g(x) = f(-x)$.`, T`1. $g(x) = (-x)^2 - 4(-x) + 1$.` + '\n' + T`2. $g(x) = x^2 + 4x + 1$.`, 'Zmienia się tylko wyraz z x w nieparzystej potędze.'],
          ['Wierzchołek', '1 pkt', T`Wierzchołek wykresu $f$ to $(2, -3)$. Jaki jest wierzchołek wykresu $-f(x)$?`, T`1. Symetria względem $Ox$: $(2, 3)$.` + '\n' + T`2. Ramiona paraboli zmieniają kierunek.`, 'Wystarczy przekształcić jeden punkt.']
        ],
        trap: T`$f(-x)$ to NIE $-f(x)$. Dla $f(x) = x^2 + 1$: $f(-x) = x^2 + 1$, a $-f(x) = -x^2 - 1$.`,
        fail: T`„$f(x) = x^2 + 2x$, więc $f(-x) = -x^2 - 2x$.”`,
        win: T`$f(-x) = (-x)^2 + 2(-x) = x^2 - 2x$.`,
        why: 'Minus wstawiasz w miejsce argumentu, a $(-x)^2 = x^2$.',
        ckeTip: 'W zadaniach z wykresem zaznacz na szkicu przekształcone punkty charakterystyczne – egzaminator punktuje poprawny szkic.',
        points: ['Minus przed f – oś Ox.', 'Minus przy x – oś Oy.', 'Przekształcaj punkty charakterystyczne.']
      }),
      gens: [pointTransform, transformedFormula, vertexAfterSymmetry, symmetryFacts, openSymmetricParabola]
    },
    {
      title: 'Wykresy z modułem i liczba rozwiązań f(x) = m',
      short_title: 'Wykres |f| i parametr',
      requirements: ['V.R1', 'III.R4'],
      prereq: ['math-lesson-4-2', 'math-lesson-6-2'],
      pill: pill({
        essence: T`Wykres $y = |f(x)|$ dostajesz, odbijając nad oś $Ox$ to, co leży pod nią. Dla paraboli z wierzchołkiem pod osią powstaje „garb”. Liczbę rozwiązań równania $|f(x)| = m$ odczytujesz, przesuwając poziomą prostą $y = m$: zero, dwa, trzy albo cztery przecięcia.`,
        context: 'Zadania „dla jakich m równanie ma dokładnie n rozwiązań” łączą wykresy z parametrem (grudzień 2022, wiązka zadań nr 2: 2 + 2 pkt).',
        pl: T`Parabola $y = x^2 - 4$ ma dołek do $-4$. Po odbiciu dołek staje się górką o wysokości $4$. Prosta $y = 2$ przecina ten kształt w czterech miejscach, $y = 4$ – w trzech (dotyka czubka), a $y = 6$ – tylko w dwóch.`,
        steps: [
          ['Narysuj f', T`Postać kanoniczna, wierzchołek, miejsca zerowe.`, 'Szkic wystarczy.'],
          ['Odbij część pod osią', T`Wykres $|f(x)|$.`, 'Garb o wysokości |q|.'],
          ['Przesuwaj prostą y = m', T`Policz przecięcia w każdym przedziale $m$.`, 'Krańce osobno.']
        ],
        formulas: [
          ['Wartość bezwzględna', T`|f(x)| = f(x) \ \text{gdy} \ f(x) \ge 0, \ |f(x)| = -f(x) \ \text{gdy} \ f(x) < 0`, 4],
          ['Postać kanoniczna', T`f(x) = a(x - p)^2 + q`, 8],
          ['Liczba rozwiązań', T`|f(x)| = m: \ \text{przecięcia z prostą} \ y = m`]
        ],
        examples: [
          ['Liczba rozwiązań', '2 pkt', T`Ile rozwiązań ma $|x^2 - 2x - 3| = 4$?`, T`1. $f(x) = (x - 1)^2 - 4$, garb o wysokości $4$.` + '\n' + T`2. $y = 4$ dotyka czubka garbu: $3$ rozwiązania.`, 'Prosta na wysokości garbu daje 3 przecięcia.'],
          ['Zbiór parametrów', '3 pkt', T`Dla jakich $m$ równanie $|x^2 - 1| = m$ ma cztery rozwiązania?`, T`1. Garb o wysokości $1$ nad $x = 0$.` + '\n' + T`2. $m \in (0, 1)$.`, 'Krańce 0 i 1 dają odpowiednio 2 i 3 rozwiązania.']
        ],
        trap: T`Dla $m = 0$ prosta pokrywa się z osią $Ox$ – rozwiązania to tylko miejsca zerowe (dwa), a nie cztery.`,
        fail: T`„Cztery rozwiązania dla $m \in \langle 0, 4 \rangle$.”`,
        win: T`Cztery rozwiązania dla $m \in (0, 4)$; dla $m = 0$ są dwa, dla $m = 4$ – trzy.`,
        why: 'Na krańcach przedziału zmienia się liczba przecięć.',
        ckeTip: 'Narysuj wykres $|f|$ z zaznaczonymi współrzędnymi garbu i miejsc zerowych – to osobny punkt w kluczu.',
        points: ['|f| odbija części spod osi.', 'Wysokość garbu to |q| wierzchołka.', 'Krańce przedziału m sprawdzaj osobno.']
      }),
      gens: [absSolutionCount, threeSolutionsParameter, fourSolutionsSet, absGraphFacts, openTwoSolutionsParameter]
    },
    {
      title: 'Złożenie funkcji i jego dziedzina',
      short_title: 'Złożenie funkcji',
      requirements: ['V.R2'],
      prereq: ['math-lesson-4-1'],
      pill: pill({
        essence: T`Złożenie $f(g(x))$ to „funkcja w funkcji”: najpierw liczysz $g(x)$, a wynik wstawiasz do $f$. Kolejność ma znaczenie – $f(g(x))$ i $g(f(x))$ to zwykle różne funkcje. Dziedzina złożenia to te $x$, dla których istnieje $g(x)$ i dla których $g(x)$ należy do dziedziny $f$.`,
        context: 'Złożenia funkcji (V.R2) pojawiają się w zadaniach z pochodną funkcji złożonej i w modelach (np. pole jako funkcja zmiennej, która sama zależy od innej).',
        pl: T`$f(x) = x + 1$, $g(x) = x^2$. $f(g(3))$: najpierw $3^2 = 9$, potem $9 + 1 = 10$. $g(f(3))$: najpierw $3 + 1 = 4$, potem $4^2 = 16$. Ta sama trójka, inna kolejność – inny wynik.`,
        steps: [
          ['Funkcja wewnętrzna', T`Policz $g(x)$.`, 'Od środka.'],
          ['Funkcja zewnętrzna', T`Wstaw $g(x)$ w miejsce $x$ we wzorze $f$.`, 'Cały nawias.'],
          ['Dziedzina', T`$x \in D_g$ i $g(x) \in D_f$.`, 'Np. pierwiastek z nieujemnej.']
        ],
        formulas: [
          ['Złożenie', T`(f \circ g)(x) = f(g(x))`],
          ['Dziedzina złożenia', T`x \in D_g, \quad g(x) \in D_f`],
          ['Kwadrat sumy', T`(a + b)^2 = a^2 + 2ab + b^2`, 7]
        ],
        examples: [
          ['Wzór', '1 pkt', T`$f(x) = 2x - 1$, $g(x) = x^2 + 3$. Wyznacz $f(g(x))$.`, T`1. $f(g(x)) = 2(x^2 + 3) - 1$.` + '\n' + T`2. $= 2x^2 + 5$.`, 'Cały wzór g wstawiasz w nawias.'],
          ['Dziedzina', '1 pkt', T`$f(x) = \sqrt{x}$, $g(x) = 9 - x^2$. Dziedzina $f(g(x))$?`, T`1. $9 - x^2 \ge 0$.` + '\n' + T`2. $x \in \langle -3, 3 \rangle$.`, 'Warunek dziedziny f przenosi się na wartości g.']
        ],
        trap: T`Wstawiając $x + b$ do kwadratu, użyj wzoru skróconego mnożenia: $(x + b)^2 = x^2 + 2bx + b^2$, a nie $x^2 + b^2$.`,
        fail: T`„$f(x) = x^2$, $g(x) = x + 3$, więc $f(g(x)) = x^2 + 9$.”`,
        win: T`$f(g(x)) = (x + 3)^2 = x^2 + 6x + 9$.`,
        why: 'Do kwadratu podnosisz cały nawias.',
        ckeTip: 'Zapisz najpierw złożenie z nawiasem, np. $f(g(x)) = (x + 3)^2$, a dopiero potem upraszczaj – łatwiej o punkt cząstkowy.',
        points: ['Licz od środka.', 'Kolejność ma znaczenie.', 'Dziedzina: g(x) musi należeć do dziedziny f.']
      }),
      gens: [composeValue, composeFormula, composeDomain, composeFacts, openComposeEquation]
    },
    {
      title: 'Dowód monotoniczności z definicji',
      short_title: 'Monotoniczność z definicji',
      requirements: ['V.R3'],
      prereq: ['math-lesson-4-3'],
      pill: pill({
        essence: T`Żeby udowodnić, że funkcja jest rosnąca w przedziale, bierzesz dowolne $x_1 < x_2$ z tego przedziału i pokazujesz, że $f(x_1) - f(x_2) < 0$. Dla funkcji $\frac{x + a}{x + b}$ różnica upraszcza się do $\frac{(b - a)(x_1 - x_2)}{(x_1 + b)(x_2 + b)}$ – wystarczy ustalić znak każdego czynnika.`,
        context: 'Dowód monotoniczności z definicji to wymaganie V.R3 – przykład z podstawy programowej to dokładnie funkcja $f(x) = \\frac{x - 1}{x + 2}$ w przedziale $(-\\infty, -2)$.',
        pl: T`„Rosnąca” znaczy: idziesz w prawo (większe $x$), to idziesz w górę (większe $f$). Dowód to sprawdzenie dla DWÓCH DOWOLNYCH punktów naraz – na literach $x_1$ i $x_2$, a nie na przykładach.`,
        steps: [
          ['Weź dowolne x₁ < x₂', T`Z badanego przedziału.`, 'Litery, nie liczby.'],
          ['Policz różnicę', T`$f(x_1) - f(x_2)$, wspólny mianownik.`, 'Uprość licznik.'],
          ['Ustal znak', T`Każdy czynnik osobno.`, 'Wniosek słowami.']
        ],
        formulas: [
          ['Rosnąca', T`x_1 < x_2: \ f(x_1) < f(x_2)`],
          ['Malejąca', T`x_1 < x_2: \ f(x_1) > f(x_2)`],
          ['Różnica dla homograficznej', T`\frac{x_1 + a}{x_1 + b} - \frac{x_2 + a}{x_2 + b} = \frac{(b - a)(x_1 - x_2)}{(x_1 + b)(x_2 + b)}`]
        ],
        examples: [
          ['Przykład z podstawy', '3 pkt', T`Wykaż, że $f(x) = \frac{x - 1}{x + 2}$ jest rosnąca w $(-\infty, -2)$.`, T`1. $f(x_1) - f(x_2) = \frac{3(x_1 - x_2)}{(x_1 + 2)(x_2 + 2)}$.` + '\n' + T`2. Mianownik: iloczyn dwóch ujemnych – dodatni; $x_1 - x_2 < 0$.` + '\n' + T`3. Różnica ujemna – funkcja rosnąca.`, 'Znak ustalasz czynnik po czynniku.'],
          ['Funkcja 1/x', '2 pkt', T`Wykaż, że $f(x) = \frac{1}{x}$ maleje w $(0, +\infty)$.`, T`1. $f(x_1) - f(x_2) = \frac{x_2 - x_1}{x_1 x_2}$.` + '\n' + T`2. Licznik i mianownik dodatnie – różnica dodatnia, funkcja malejąca.`, 'Uwaga: tylko w tym przedziale.']
        ],
        trap: T`Funkcja $\frac{1}{x}$ maleje w $(-\infty, 0)$ i w $(0, +\infty)$ osobno, ale NIE w sumie tych przedziałów.`,
        fail: T`„$f(1) = 2 < f(5) = 3$, więc $f$ jest rosnąca.”`,
        win: T`Dla dowolnych $x_1 < x_2$ z przedziału $f(x_1) - f(x_2) < 0$.`,
        why: 'Dwa punkty niczego nie dowodzą – między nimi funkcja może się zachowywać dowolnie.',
        ckeTip: 'Zacznij dowód zdaniem „Niech $x_1, x_2 \\in \\ldots$ i $x_1 < x_2$” – bez tego założenia rozumowanie jest niepełne.',
        points: ['Dowolne x₁ < x₂ z przedziału.', 'Uprość różnicę f(x₁) − f(x₂).', 'Ustal znak każdego czynnika.']
      }),
      gens: [differenceForm, monotonicConclusion, monotonicFacts, reciprocalDifference, openMonotonicityProof]
    },
    {
      title: 'Modele wykładnicze i logarytmiczne',
      short_title: 'Modele wykładnicze',
      requirements: ['V.14', 'I.R1'],
      prereq: ['math-lesson-4-5'],
      pill: pill({
        essence: T`W modelu $N(t) = N_0 \cdot k^t$ wielkość co jednostkę czasu mnoży się przez $k$. $N_0$ to wartość początkowa ($t = 0$), a $(k - 1) \cdot 100\%$ to zmiana procentowa na jednostkę czasu. Gdy pytają o czas, rozwiązujesz równanie wykładnicze – zwykle sprowadzając do wspólnej podstawy albo logarytmem.`,
        context: 'Modele wykładnicze otwierały arkusze PR w maju 2023, 2024 i 2025 (zadanie 1 za 2 pkt).',
        pl: T`Populacja rośnie o $25\%$ na godzinę: z $100$ robi się $125$, potem $156{,}25$… Za każdym razem mnożysz przez $1{,}25$ – i to $1{,}25$ jest właśnie $k$ we wzorze.`,
        steps: [
          ['Wartość początkowa', T`$N(0) = N_0$.`, 'k⁰ = 1.'],
          ['Wyznacz k', T`Z drugiego pomiaru: $N_0 \cdot k^t = N(t)$.`, 'k > 0.'],
          ['Odpowiedz na pytanie', T`Procent: $(k - 1) \cdot 100\%$; czas – równanie wykładnicze.`, 'Logarytm, gdy podstawy się nie zgadzają.']
        ],
        formulas: [
          ['Model wykładniczy', T`N(t) = N_0 \cdot k^t`],
          ['Zmiana procentowa', T`(k - 1) \cdot 100\%`],
          ['Logarytm', T`a^x = b \ \text{gdy} \ x = \log_a b`, 5]
        ],
        examples: [
          ['Procent', '2 pkt', T`$N(0) = 10\,000$, $N(2) = 15\,625$. O ile procent rośnie populacja co godzinę?`, T`1. $10\,000 \cdot k^2 = 15\,625$, $k^2 = 1{,}5625$.` + '\n' + T`2. $k = 1{,}25$ – wzrost o $25\%$.`, 'To zadanie z matury maj 2025.'],
          ['Czas', '1 pkt', T`$N(t) = N_0 \cdot 2^{\frac{t}{3}}$. Po jakim czasie liczba wzrośnie 8 razy?`, T`1. $2^{\frac{t}{3}} = 8 = 2^3$.` + '\n' + T`2. $t = 9$.`, 'Wspólna podstawa: 2.']
        ],
        trap: T`$k = 0{,}8$ to spadek o $20\%$, a nie o $80\%$. Podstawa mówi, ile ZOSTAJE.`,
        fail: T`„$N(t) = N_0 \cdot 0{,}8^t$, więc co godzinę ubywa $80\%$.”`,
        win: T`Co godzinę zostaje $80\%$, czyli ubywa $20\%$.`,
        why: 'Mnożenie przez 0,8 to odjęcie 20%.',
        ckeTip: 'Jeśli zgadniesz $k$, uzasadnij, że to jedyne rozwiązanie (np. monotonicznością funkcji wykładniczej) – bez tego w maju 2025 był tylko 1 z 2 pkt.',
        points: [T`$N(0) = N_0$.`, 'k − 1 to zmiana procentowa.', 'Czas z równania wykładniczego.']
      }),
      gens: [percentPerStep, halfLife, doublingTime, expFacts, openExponentialModel]
    }
  ]
};
