import { T, mc, num, pf, pill, fr, par, quad, lin, xm, iv, m, need } from './lib.js';

const TIP_QUAD = 'Karta wzorów, str. 8: postać kanoniczna $f(x) = a(x - p)^2 + q$, gdzie $p = -\\frac{b}{2a}$, $q = -\\frac{\\Delta}{4a}$; wierzchołek $W = (p, q)$.';
const cf = (a) => (a === 1 ? '' : a === -1 ? '-' : `${a}`);
const canon = (a, p, q) => `${cf(a)}(${xm(p)})^2${q === 0 ? '' : ` ${q > 0 ? '+' : '-'} ${Math.abs(q)}`}`;
const fact = (a, x1, x2) =>
  x1 === 0 || x2 === 0
    ? (x1 === 0 && x2 === 0 ? `${cf(a)}x^2` : `${cf(a)}x(${xm(x1 === 0 ? x2 : x1)})`)
    : `${cf(a)}(${xm(x1)})(${xm(x2)})`;
const P = (x, y) => m(`(${x}, ${y})`);
const fx = (s) => m(`f(x) = ${s}`);

// ---------- 6.1 Trzy postacie ----------
const formCanonToGeneral = (r) => {
  const a = r.pick([1, 1, 2, -1, -2, 3]);
  const p = r.intNot(-5, 5, 0);
  const q = r.intNot(-8, 8, 0);
  const [b, c] = [-2 * a * p, a * p * p + q];
  return mc({
    title: 'Z postaci kanonicznej do ogólnej',
    q: T`Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${canon(a, p, q)}$. Wzór tej funkcji w postaci ogólnej to`,
    ok: fx(quad(a, b, c)),
    bad: [fx(quad(a, -b, c)), fx(quad(a, b, q)), fx(quad(a, 0, c)), fx(quad(a, b, a * p * p - q)), fx(quad(a, b / 2, c))],
    steps: [T`Rozwijamy kwadrat: $(${xm(p)})^2 = ${quad(1, -2 * p, p * p)}$.`, T`Mnożymy przez $${par(a)}$ i ${q > 0 ? 'dodajemy' : 'odejmujemy'} $${Math.abs(q)}$: $${quad(a, b, a * p * p)} ${q > 0 ? '+' : '-'} ${Math.abs(q)} = ${quad(a, b, c)}$.`],
    trap: T`Współczynnik $a = ${a}$ mnoży wszystkie trzy składniki rozwiniętego kwadratu – także wyraz wolny $${p * p}$.`,
    tip: TIP_QUAD
  });
};
const formFactoredC = (r) => {
  const a = r.intNot(-3, 3, 0);
  const x1 = r.intNot(-6, 6, 0);
  const x2 = r.intNot(-6, 6, 0, x1);
  const askB = r.bool();
  const [b, c] = [-a * (x1 + x2), a * x1 * x2];
  need(b !== 0 && b !== c);
  const v = askB ? b : c;
  return mc({
    title: 'Współczynniki z postaci iloczynowej',
    q: T`Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${fact(a, x1, x2)}$. Po zapisaniu wzoru w postaci ogólnej $f(x) = ax^2 + bx + c$ współczynnik $${askB ? 'b' : 'c'}$ jest równy`,
    ok: m(v),
    val: v,
    bad: [m(-v), m(askB ? c : b), m(askB ? -(x1 + x2) : x1 * x2), m(askB ? a * (x1 + x2) + a : -a * x1 * x2 + 1), m(v + a)],
    steps: [T`Mnożymy nawiasy: $(${xm(x1)})(${xm(x2)}) = ${quad(1, -(x1 + x2), x1 * x2)}$.`, T`Mnożymy przez $${a}$: $f(x) = ${quad(a, b, c)}$, więc $${askB ? 'b' : 'c'} = ${v}$.`],
    trap: T`Nie zapomnij o współczynniku $a = ${a}$ stojącym przed nawiasami – mnoży on każdy wyraz.`,
    tip: 'Karta wzorów, str. 8: postać iloczynowa $f(x) = a(x - x_1)(x - x_2)$.'
  });
};
const formGeneralToCanon = (r) => {
  const p = r.intNot(-6, 6, 0);
  const q = r.intNot(-9, 9, 0);
  const [b, c] = [-2 * p, p * p + q];
  return mc({
    title: 'Z postaci ogólnej do kanonicznej',
    q: T`Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${quad(1, b, c)}$. Wzór tej funkcji w postaci kanonicznej to`,
    ok: fx(canon(1, p, q)),
    bad: [fx(canon(1, -p, q)), fx(canon(1, p, c)), fx(canon(1, -p, c)), fx(canon(1, p, -q)), fx(canon(1, 2 * p, q))],
    steps: [T`$p = -\frac{b}{2a} = -\frac{${b}}{2} = ${p}$.`, T`$q = f(p) = ${par(p)}^2 ${b > 0 ? '+' : '-'} ${Math.abs(b)} \cdot ${par(p)} ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = ${q}$.`, T`$f(x) = ${canon(1, p, q)}$.`],
    trap: T`W postaci kanonicznej stoi $x - p$. Dla $p = ${p}$ w nawiasie jest $${xm(p)}$.`,
    tip: TIP_QUAD
  });
};
const formYIntercept = (r) => {
  const a = r.intNot(-3, 3, 0);
  const p = r.intNot(-4, 4, 0);
  const q = r.int(-6, 6);
  const c = a * p * p + q;
  need(c !== q && c !== 0);
  return mc({
    title: 'Punkt przecięcia paraboli z osią Oy',
    q: T`Wykres funkcji kwadratowej $f$ określonej wzorem $f(x) = ${canon(a, p, q)}$ przecina oś $Oy$ w punkcie`,
    ok: P(0, c),
    bad: [P(0, q), P(p, q), P(c, 0), P(0, p * p + q === c ? c + 1 : p * p + q), P(0, -c)],
    steps: [T`Na osi $Oy$ pierwsza współrzędna jest równa $0$, więc liczymy $f(0)$.`, T`$f(0) = ${a} \cdot ${par(-p)}^2 ${q >= 0 ? '+' : '-'} ${Math.abs(q)} = ${a * p * p} ${q >= 0 ? '+' : '-'} ${Math.abs(q)} = ${c}$.`],
    trap: T`Liczba $${q}$ z postaci kanonicznej to druga współrzędna wierzchołka, a nie punkt przecięcia z osią $Oy$.`,
    tip: 'Punkt przecięcia wykresu z osią $Oy$ to zawsze $(0, f(0))$. W postaci ogólnej jest to $(0, c)$.'
  });
};
const formFindA = (r) => {
  const a = r.intNot(-4, 4, 0);
  const p = r.int(-4, 4);
  const q = r.int(-6, 6);
  const dx = r.pick([1, 2, 3, -1, -2]);
  const x0 = p + dx;
  const y0 = a * dx * dx + q;
  return mc({
    title: 'Współczynnik a z punktu wykresu',
    q: T`Wykres funkcji kwadratowej $f$ określonej wzorem $f(x) = a${p === 0 ? 'x^2' : `(${xm(p)})^2`}${q === 0 ? '' : ` ${q > 0 ? '+' : '-'} ${Math.abs(q)}`}$ przechodzi przez punkt $(${x0}, ${y0})$. Współczynnik $a$ jest równy`,
    ok: m(a),
    val: a,
    bad: [m(-a), m(fr(y0 + q, dx * dx)), m(fr(y0 - q, Math.abs(dx)) ), m(a + 1), m(fr(1, a))],
    steps: [T`Podstawiamy współrzędne punktu: $${y0} = a \cdot (${x0} ${p >= 0 ? '-' : '+'} ${Math.abs(p)})^2 ${q >= 0 ? '+' : '-'} ${Math.abs(q)}$.`, T`$${y0} = ${dx * dx === 1 ? '' : dx * dx}a ${q >= 0 ? '+' : '-'} ${Math.abs(q)}$, więc $${dx * dx === 1 ? '' : dx * dx}a = ${y0 - q}$${dx * dx === 1 ? '' : ` i $a = ${a}$`}.`],
    trap: T`Najpierw oblicz nawias i podnieś go do kwadratu, dopiero potem mnóż przez $a$.`,
    tip: 'Punkt należy do wykresu, gdy jego współrzędne spełniają wzór funkcji – to daje równanie na brakujący współczynnik.'
  });
};

// ---------- 6.2 Wierzchołek, oś symetrii, zbiór wartości ----------
const vertexFromCanon = (r) => {
  const a = r.intNot(-4, 4, 0);
  const p = r.intNot(-7, 7, 0);
  const q = r.intNot(-7, 7, 0);
  need(Math.abs(p) !== Math.abs(q));
  return mc({
    title: 'Wierzchołek z postaci kanonicznej',
    q: T`Wierzchołkiem paraboli, która jest wykresem funkcji kwadratowej $f(x) = ${canon(a, p, q)}$, jest punkt`,
    ok: P(p, q),
    bad: [P(-p, q), P(p, -q), P(-p, -q), P(q, p)],
    steps: [T`Porównujemy ze wzorem $f(x) = a(x - p)^2 + q$.`, (p > 0 ? T`W nawiasie stoi $${xm(p)}$, więc $p = ${p}$; $q = ${q}$. Wierzchołek: $W = (${p}, ${q})$.` : T`$${xm(p)} = x - ${par(p)}$, więc $p = ${p}$; $q = ${q}$. Wierzchołek: $W = (${p}, ${q})$.`)],
    trap: T`Pierwszą współrzędną wierzchołka czytamy ze znakiem przeciwnym do tego w nawiasie, a drugą – wprost.`,
    tip: TIP_QUAD
  });
};
const vertexFromGeneral = (r) => {
  const a = r.pick([1, -1, 2, -2, 3]);
  const p = r.intNot(-5, 5, 0);
  const q = r.int(-8, 8);
  const [b, c] = [-2 * a * p, a * p * p + q];
  const askP = r.bool();
  return mc({
    title: askP ? 'Pierwsza współrzędna wierzchołka' : 'Wierzchołek z postaci ogólnej',
    q: askP ? T`Osią symetrii wykresu funkcji kwadratowej $f(x) = ${quad(a, b, c)}$ jest prosta o równaniu` : T`Wierzchołkiem paraboli, która jest wykresem funkcji $f(x) = ${quad(a, b, c)}$, jest punkt`,
    ok: askP ? m(`x = ${p}`) : P(p, q),
    bad: askP ? [m(`x = ${-p}`), m(`y = ${p}`), m(`x = ${2 * p}`), m(`y = ${q === p ? q + 1 : q}`), m(`x = ${b}`)] : [P(-p, q), P(p, c), P(-p, c === q ? c + 1 : c), P(2 * p, q), P(p, -q === q ? 1 : -q)],
    steps: [T`$p = -\frac{b}{2a} = -\frac{${b}}{2 \cdot ${par(a)}} = ${p}$.`, askP ? T`Oś symetrii paraboli to prosta pionowa przechodząca przez wierzchołek: $x = ${p}$.` : T`$q = f(${p}) = ${a} \cdot ${par(p)}^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)} \cdot ${par(p)} ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = ${q}$. Wierzchołek: $(${p}, ${q})$.`],
    trap: askP ? T`Oś symetrii paraboli jest prostą pionową, więc ma równanie $x = \ldots$, a nie $y = \ldots$.` : T`We wzorze $p = -\frac{b}{2a}$ jest minus i dwójka w mianowniku. Dla $b = ${b}$, $a = ${a}$ wychodzi $${p}$.`,
    tip: TIP_QUAD
  });
};
const vertexAxisFromZeros = (r) => {
  const x1 = r.int(-8, 4);
  const d = r.int(1, 5) * 2;
  const x2 = x1 + d;
  const a = r.intNot(-3, 3, 0);
  const p = (x1 + x2) / 2;
  return mc({
    title: 'Oś symetrii z miejsc zerowych',
    q: T`Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${fact(a, x1, x2)}$. Pierwsza współrzędna wierzchołka paraboli będącej wykresem tej funkcji jest równa`,
    ok: m(p),
    val: p,
    bad: [m(-p === p ? p + 1 : -p), m(x1 + x2 === p ? p + 2 : x1 + x2), m(d / 2 === p ? p - 1 : d / 2), m(x2), m(x1)],
    steps: [T`Miejsca zerowe: $x_1 = ${x1}$, $x_2 = ${x2}$.`, T`Wierzchołek leży na osi symetrii, dokładnie w połowie między nimi: $p = \frac{${x1} + ${par(x2)}}{2} = ${p}$.`],
    trap: T`To średnia arytmetyczna miejsc zerowych (suma podzielona przez 2), a nie ich suma ani różnica.`,
    tip: 'Parabola jest symetryczna: $p = \\frac{x_1 + x_2}{2}$.'
  });
};
const vertexRange = (r) => {
  const a = r.intNot(-4, 4, 0);
  const p = r.intNot(-6, 6, 0);
  const q = r.intNot(-8, 8, 0, p);
  const ok = a > 0 ? iv.rc(q) : iv.lc(q);
  return mc({
    title: 'Zbiór wartości funkcji kwadratowej',
    q: T`Zbiorem wartości funkcji kwadratowej $f$ określonej wzorem $f(x) = ${canon(a, p, q)}$ jest przedział`,
    ok: m(ok),
    bad: [m(a > 0 ? iv.lc(q) : iv.rc(q)), m(a > 0 ? iv.rc(p) : iv.lc(p)), m(a > 0 ? iv.lc(p) : iv.rc(p)), m(a > 0 ? iv.rc(-q) : iv.lc(-q))],
    steps: [T`Wierzchołek paraboli to $W = (${p}, ${q})$.`, T`$a = ${a} ${a > 0 ? '> 0' : '< 0'}$, więc ramiona idą w ${a > 0 ? 'górę' : 'dół'} i $q = ${q}$ jest wartością ${a > 0 ? 'najmniejszą' : 'największą'}.`, T`Zbiór wartości: $${ok}$.`],
    trap: T`Zbiór wartości zależy od $q$ (druga współrzędna wierzchołka), a nie od $p$. Kierunek przedziału wyznacza znak $a$.`,
    tip: 'Ramiona w górę: $\\langle q, +\\infty)$. Ramiona w dół: $(-\\infty, q \\rangle$.'
  });
};
const vertexMonotonic = (r) => {
  const a = r.intNot(-4, 4, 0);
  const p = r.intNot(-6, 6, 0);
  const q = r.intNot(-8, 8, 0, p);
  const inc = r.bool();
  const right = (a > 0) === inc;
  const ok = right ? iv.rc(p) : iv.lc(p);
  return mc({
    title: 'Przedział monotoniczności funkcji kwadratowej',
    q: T`Funkcja kwadratowa $f$ określona wzorem $f(x) = ${canon(a, p, q)}$ jest ${inc ? 'rosnąca' : 'malejąca'} w przedziale`,
    ok: m(ok),
    bad: [m(right ? iv.lc(p) : iv.rc(p)), m(right ? iv.rc(q) : iv.lc(q)), m(right ? iv.lc(q) : iv.rc(q)), m(right ? iv.rc(-p) : iv.lc(-p))],
    steps: [T`Wierzchołek: $W = (${p}, ${q})$; $a = ${a}$, więc ramiona idą w ${a > 0 ? 'górę' : 'dół'}.`, T`Parabola ${a > 0 ? 'opada do wierzchołka, a potem się wznosi' : 'wznosi się do wierzchołka, a potem opada'}.`, T`Funkcja jest ${inc ? 'rosnąca' : 'malejąca'} dla $x \in ${ok}$.`],
    trap: T`Przedziały monotoniczności zapisujemy argumentami, więc granicą jest $p = ${p}$, a nie $q = ${q}$.`,
    tip: 'Zmiana monotoniczności funkcji kwadratowej następuje w wierzchołku, czyli dla $x = p$.'
  });
};

// ---------- 6.3 Miejsca zerowe i postać iloczynowa ----------
const zerosFromFactored = (r) => {
  const a = r.intNot(-4, 4, 0);
  const x1 = r.intNot(-8, 8, 0);
  const x2 = r.intNot(-8, 8, 0, x1, -x1);
  const pr = (u, v) => (u <= v ? `$${u}$ oraz $${v}$` : `$${v}$ oraz $${u}$`);
  return mc({
    title: 'Miejsca zerowe z postaci iloczynowej',
    q: T`Miejscami zerowymi funkcji kwadratowej $f$ określonej wzorem $f(x) = ${fact(a, x1, x2)}$ są liczby`,
    ok: pr(x1, x2),
    bad: [pr(-x1, -x2), pr(x1, -x2), pr(-x1, x2), pr(a * x1, a * x2)].filter((o) => o !== pr(x1, x2)),
    steps: [T`Iloczyn jest zerem, gdy któryś nawias jest zerem.`, T`$${xm(x1)} = 0$ daje $x = ${x1}$; $${xm(x2)} = 0$ daje $x = ${x2}$.`],
    trap: T`Miejscem zerowym nawiasu $(${xm(x1)})$ jest $${x1}$ – znak przeciwny do tego w nawiasie. ${a === 1 ? '' : `Liczba $${a}$ przed nawiasami nie wpływa na miejsca zerowe.`}`,
    tip: 'Karta wzorów, str. 8: postać iloczynowa $f(x) = a(x - x_1)(x - x_2)$ – miejsca zerowe widać od razu.'
  });
};
const zerosToFactored = (r) => {
  const a = r.pick([1, 1, 2, -1, 3]);
  const x1 = r.intNot(-6, 6, 0);
  const x2 = r.intNot(-6, 6, 0, x1, -x1);
  const [b, c] = [-a * (x1 + x2), a * x1 * x2];
  const lo = Math.min(x1, x2);
  const hi = Math.max(x1, x2);
  return mc({
    title: 'Postać iloczynowa funkcji kwadratowej',
    q: T`Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${quad(a, b, c)}$. Wzór tej funkcji w postaci iloczynowej to`,
    ok: fx(fact(a, lo, hi)),
    bad: [fx(fact(a, -hi, -lo)), a !== 1 ? fx(fact(1, lo, hi)) : fx(fact(2, lo, hi)), fx(fact(a, lo, -hi)), fx(fact(a, -lo, hi))],
    steps: [T`$\Delta = ${par(b)}^2 - 4 \cdot ${par(a)} \cdot ${par(c)} = ${b * b - 4 * a * c}$, $\sqrt{\Delta} = ${Math.sqrt(b * b - 4 * a * c)}$.`, T`Miejsca zerowe: $x_1 = ${lo}$, $x_2 = ${hi}$.`, T`$f(x) = a(x - x_1)(x - x_2) = ${fact(a, lo, hi)}$.`],
    trap: T`W postaci iloczynowej stoi $x - x_1$, więc dla $x_1 = ${lo}$ nawias to $(${xm(lo)})$. Nie gub też współczynnika $a = ${a}$.`,
    tip: 'Karta wzorów, str. 8: $f(x) = a(x - x_1)(x - x_2)$ (gdy $\\Delta \\ge 0$).'
  });
};
const zerosCountCanon = (r) => {
  const a = r.intNot(-3, 3, 0);
  const p = r.intNot(-5, 5, 0);
  const q = r.int(-6, 6);
  const cnt = q === 0 ? 1 : a * q < 0 ? 2 : 0;
  const opts = ['nie ma miejsc zerowych', 'ma dokładnie jedno miejsce zerowe', 'ma dokładnie dwa miejsca zerowe', 'ma dokładnie trzy miejsca zerowe'];
  return mc({
    title: 'Liczba miejsc zerowych z postaci kanonicznej',
    q: T`Funkcja kwadratowa $f$ określona wzorem $f(x) = ${canon(a, p, q)}$`,
    ok: opts[cnt],
    bad: opts.filter((x) => x !== opts[cnt]),
    steps: [
      T`Wierzchołek: $W = (${p}, ${q})$, ramiona w ${a > 0 ? 'górę' : 'dół'} ($a = ${a}$).`,
      q === 0 ? T`Wierzchołek leży na osi $Ox$, więc parabola ma z nią jeden punkt wspólny.` : a * q < 0 ? T`Wierzchołek leży ${q > 0 ? 'nad' : 'pod'} osią $Ox$, a ramiona idą w ${a > 0 ? 'górę' : 'dół'}, czyli w stronę osi – parabola przecina ją dwa razy.` : T`Wierzchołek leży ${q > 0 ? 'nad' : 'pod'} osią $Ox$, a ramiona idą w ${a > 0 ? 'górę' : 'dół'}, czyli od osi – parabola jej nie przecina.`
    ],
    trap: T`Liczbę miejsc zerowych widać z położenia wierzchołka i kierunku ramion – nie trzeba liczyć delty.`,
    tip: 'Szkic: zaznacz wierzchołek, narysuj ramiona i policz przecięcia z osią $Ox$.'
  });
};
const zerosFindCoefficient = (r) => {
  const x1 = r.intNot(-7, 7, 0);
  const x2 = r.intNot(-7, 7, 0, x1, -x1);
  const askB = r.bool();
  const v = askB ? -(x1 + x2) : x1 * x2;
  return mc({
    title: 'Współczynnik z miejsc zerowych',
    q: T`Miejscami zerowymi funkcji kwadratowej $f$ określonej wzorem $f(x) = x^2 + bx + c$ są liczby $${Math.min(x1, x2)}$ oraz $${Math.max(x1, x2)}$. Współczynnik $${askB ? 'b' : 'c'}$ jest równy`,
    ok: m(v),
    val: v,
    bad: [m(-v), m(askB ? x1 * x2 : -(x1 + x2)), m(askB ? -x1 * x2 : x1 + x2), m(v + 1), m(v - 1)],
    steps: [T`Zapisujemy postać iloczynową: $f(x) = (${xm(x1)})(${xm(x2)})$.`, T`Po wymnożeniu: $f(x) = ${quad(1, -(x1 + x2), x1 * x2)}$.`, T`Zatem $${askB ? 'b' : 'c'} = ${v}$.`],
    trap: T`Współczynnik $b$ to suma miejsc zerowych ze znakiem przeciwnym, a $c$ to ich iloczyn – najpewniej po prostu wymnóż nawiasy.`,
    tip: 'Znając miejsca zerowe i współczynnik $a$, zawsze możesz zapisać postać iloczynową i ją wymnożyć.'
  });
};
const zerosDistance = (r) => {
  const a = r.pick([1, 2, -1]);
  const x1 = r.int(-7, 5);
  const d = r.int(1, 9);
  const x2 = x1 + d;
  const [b, c] = [-a * (x1 + x2), a * x1 * x2];
  need(Math.abs(c) <= 80);
  return mc({
    title: 'Odległość między miejscami zerowymi',
    q: T`Parabola będąca wykresem funkcji $f(x) = ${quad(a, b, c)}$ przecina oś $Ox$ w punktach $A$ i $B$. Długość odcinka $AB$ jest równa`,
    ok: m(d),
    val: d,
    bad: [m(Math.abs(x1 + x2) === d ? d + 2 : Math.abs(x1 + x2)), m(Math.abs(x1 * x2) === d ? d + 1 : Math.abs(x1 * x2)), m(d + 1), m(2 * d), m(Math.max(Math.abs(x1), Math.abs(x2)) === d ? d + 3 : Math.max(Math.abs(x1), Math.abs(x2)))],
    steps: [T`$\Delta = ${b * b - 4 * a * c}$, $\sqrt{\Delta} = ${Math.sqrt(b * b - 4 * a * c)}$, więc miejsca zerowe to $${x1}$ oraz $${x2}$.`, T`$|AB| = ${x2} - ${par(x1)} = ${d}$.`],
    trap: T`Odległość to różnica miejsc zerowych (większe minus mniejsze), a nie ich suma.`,
    tip: 'Punkty przecięcia paraboli z osią $Ox$ to $(x_1, 0)$ i $(x_2, 0)$; odległość między nimi to $|x_2 - x_1|$.'
  });
};

// ---------- 6.4 Wartość największa i najmniejsza w przedziale ----------
const extremeOnInterval = (r) => {
  const a = r.pick([1, 1, -1, 2, -2]);
  const p = r.int(-4, 4);
  const q = r.int(-6, 6);
  const [b, c] = [-2 * a * p, a * p * p + q];
  const A = r.int(-6, 4);
  const B = A + r.int(2, 5);
  const f = (x) => a * x * x + b * x + c;
  const inside = p >= A && p <= B;
  const cand = inside ? [f(A), f(B), q] : [f(A), f(B)];
  const max = r.bool();
  const v = max ? Math.max(...cand) : Math.min(...cand);
  need(Math.abs(v) <= 60 && f(A) !== f(B));
  const other = max ? Math.min(...cand) : Math.max(...cand);
  const o = {
    title: max ? 'Największa wartość w przedziale' : 'Najmniejsza wartość w przedziale',
    q: T`Dana jest funkcja kwadratowa $f$ określona wzorem $f(x) = ${quad(a, b, c)}$. ${max ? 'Największa' : 'Najmniejsza'} wartość funkcji $f$ w przedziale $${iv.cc(A, B)}$ jest równa`,
    steps: [
      T`Pierwsza współrzędna wierzchołka: $p = -\frac{${b}}{2 \cdot ${par(a)}} = ${p}$. ${inside ? T`Liczba $${p}$ należy do przedziału $${iv.cc(A, B)}$, więc liczymy też $f(${p}) = ${q}$.` : T`Liczba $${p}$ nie należy do przedziału $${iv.cc(A, B)}$, więc wierzchołka nie bierzemy pod uwagę.`}`,
      T`Wartości na końcach: $f(${A}) = ${f(A)}$, $f(${B}) = ${f(B)}$.`,
      T`${max ? 'Największa' : 'Najmniejsza'} z obliczonych wartości to $${v}$.`
    ],
    trap: inside ? T`Wierzchołek leży w przedziale, więc trzeba porównać trzy liczby: $f(${A})$, $f(${B})$ i $f(${p})$.` : T`Wierzchołek leży poza przedziałem – wartość $q = ${q}$ nie jest tu przyjmowana i nie może być odpowiedzią.`,
    tip: 'Schemat: policz $p$, sprawdź, czy leży w przedziale, policz wartości na końcach (i w wierzchołku, jeśli należy) – wybierz skrajną.'
  };
  if (r.rnd() < 0.3) return num({ ...o, q: T`Dana jest funkcja kwadratowa $f$ określona wzorem $f(x) = ${quad(a, b, c)}$. Wyznacz ${max ? 'największą' : 'najmniejszą'} wartość funkcji $f$ w przedziale $${iv.cc(A, B)}$. Wpisz liczbę.`, ans: v });
  return mc({ ...o, ok: m(v), val: v, bad: [m(other), m(inside ? (v === q ? f(A) : q) : q), m(c), m(v + (max ? 1 : -1)), m(v + (max ? -2 : 2)), m(f(A)), m(f(B))] });
};
const extremeArgument = (r) => {
  const a = r.pick([1, -1, 2, -2, 3]);
  const p = r.intNot(-6, 6, 0);
  const q = r.int(-9, 9);
  const [b, c] = [-2 * a * p, a * p * p + q];
  need(Math.abs(c) <= 80 && q !== p);
  return mc({
    title: 'Argument, dla którego wartość jest skrajna',
    q: T`Funkcja kwadratowa $f$ określona wzorem $f(x) = ${quad(a, b, c)}$ przyjmuje wartość ${a > 0 ? 'najmniejszą' : 'największą'} dla argumentu`,
    ok: m(`x = ${p}`),
    bad: [m(`x = ${-p}`), m(`x = ${q}`), m(`x = ${2 * p}`), m(`x = ${c === p ? c + 1 : c}`), m(`x = ${b === p ? b + 1 : b}`)],
    steps: [T`$a = ${a}$, więc ramiona idą w ${a > 0 ? 'górę' : 'dół'} i funkcja ma wartość ${a > 0 ? 'najmniejszą' : 'największą'} w wierzchołku.`, T`$p = -\frac{b}{2a} = -\frac{${b}}{${2 * a}} = ${p}$.`],
    trap: T`Pytanie dotyczy argumentu ($p = ${p}$), a nie samej wartości ($q = ${q}$). Przeczytaj uważnie, o co pytają.`,
    tip: TIP_QUAD
  });
};
const extremeValueGlobal = (r) => {
  const a = r.pick([1, -1, 2, -2, 3, -3]);
  const x1 = r.int(-6, 4);
  const d = r.int(1, 4) * 2;
  const x2 = x1 + d;
  const p = (x1 + x2) / 2;
  const q = a * (p - x1) * (p - x2);
  return mc({
    title: 'Wartość skrajna z postaci iloczynowej',
    q: T`${a > 0 ? 'Najmniejsza' : 'Największa'} wartość funkcji kwadratowej $f$ określonej wzorem $f(x) = ${fact(a, x1, x2)}$ jest równa`,
    ok: m(q),
    val: q,
    bad: [m(-q), m(p === q ? p + 1 : p), m(a * x1 * x2 === q ? q + 1 : a * x1 * x2), m(q / a === q ? q + 2 : q / a), m(0)],
    steps: [T`Miejsca zerowe: $${x1}$ i $${x2}$, więc $p = \frac{${x1} + ${par(x2)}}{2} = ${p}$.`, T`$q = f(${p}) = ${a} \cdot (${p} ${x1 >= 0 ? '-' : '+'} ${Math.abs(x1)})(${p} ${x2 >= 0 ? '-' : '+'} ${Math.abs(x2)}) = ${a} \cdot ${par(p - x1)} \cdot ${par(p - x2)} = ${q}$.`],
    trap: T`Wartość skrajna to $q = f(p)$, a nie samo $p$. Trzeba jeszcze podstawić $p$ do wzoru.`,
    tip: 'Z postaci iloczynowej: $p$ to średnia miejsc zerowych, a $q = f(p)$.'
  });
};
const extremeStatements = (r) => {
  const a = r.pick([1, -1, 2, -2]);
  const p = r.intNot(-4, 4, 0);
  const q = r.intNot(-6, 6, 0);
  const claimMax = r.bool();
  const claimVal = r.bool() ? q : p;
  const s1 = [T`Funkcja $f$ ma wartość ${claimMax ? 'największą' : 'najmniejszą'} równą $${claimVal}$.`, claimMax === a < 0 && claimVal === q, T`ramiona paraboli idą w ${a > 0 ? 'górę' : 'dół'}, więc funkcja ma wartość ${a > 0 ? 'najmniejszą' : 'największą'} równą $q = ${q}$.`];
  const side = r.bool();
  const claimInc = r.bool();
  const trulyInc = side ? a > 0 : a < 0;
  const s2 = [T`Funkcja $f$ jest ${claimInc ? 'rosnąca' : 'malejąca'} w przedziale $${side ? iv.rc(p) : iv.lc(p)}$.`, claimInc === trulyInc, T`${side ? 'na prawo' : 'na lewo'} od wierzchołka ($x = ${p}$) parabola ${trulyInc ? 'się wznosi' : 'opada'}.`];
  need(Math.abs(p) !== Math.abs(q));
  return pf({
    title: 'Prawda czy fałsz: własności paraboli',
    q: T`Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${canon(a, p, q)}$.`,
    s1: [s1[0], s1[1], `${s1[2]} Zdanie jest ${s1[1] ? 'prawdziwe' : 'fałszywe'}.`],
    s2: [s2[0], s2[1], `${s2[2]} Zdanie jest ${s2[1] ? 'prawdziwe' : 'fałszywe'}.`],
    trap: 'Z postaci kanonicznej odczytaj trzy rzeczy: kierunek ramion (znak a), oś symetrii (p) i wartość skrajną (q).',
    tip: TIP_QUAD
  });
};

// ---------- 6.5 Wyznaczanie wzoru funkcji kwadratowej ----------
const findFromVertexPoint = (r) => {
  const a = r.intNot(-3, 3, 0);
  const p = r.intNot(-5, 5, 0);
  const q = r.intNot(-7, 7, 0);
  const dx = r.pick([1, 2, -1, -2]);
  const [x0, y0] = [p + dx, a * dx * dx + q];
  return mc({
    title: 'Wzór z wierzchołka i punktu',
    q: T`Wierzchołkiem paraboli będącej wykresem funkcji kwadratowej $f$ jest punkt $W = (${p}, ${q})$. Do tej paraboli należy punkt $A = (${x0}, ${y0})$. Funkcja $f$ jest określona wzorem`,
    ok: fx(canon(a, p, q)),
    bad: [fx(canon(a, -p, q)), fx(canon(-a, p, q)), fx(canon(a, p, -q)), fx(canon(a === 1 ? 2 : 1, p, q)), fx(canon(-a, -p, q))],
    steps: [T`Z wierzchołka: $f(x) = a(${xm(p)})^2 ${q > 0 ? '+' : '-'} ${Math.abs(q)}$.`, T`Podstawiamy punkt $A$: $${y0} = a \cdot ${par(dx)}^2 ${q > 0 ? '+' : '-'} ${Math.abs(q)}$, czyli $${dx * dx === 1 ? '' : dx * dx}a = ${y0 - q}$ i $a = ${a}$.`, T`$f(x) = ${canon(a, p, q)}$.`],
    trap: T`Sam wierzchołek nie wystarcza – nieskończenie wiele parabol ma ten sam wierzchołek. Współczynnik $a$ wyznacza dopiero drugi punkt.`,
    tip: TIP_QUAD
  });
};
const findFromZerosPoint = (r) => {
  const a = r.intNot(-3, 3, 0);
  const x1 = r.intNot(-5, 5, 0);
  const x2 = r.intNot(-5, 5, 0, x1, -x1);
  const c = a * x1 * x2;
  const lo = Math.min(x1, x2);
  const hi = Math.max(x1, x2);
  return mc({
    title: 'Wzór z miejsc zerowych i punktu',
    q: T`Funkcja kwadratowa $f$ ma dwa miejsca zerowe: $${lo}$ oraz $${hi}$. Wykres tej funkcji przecina oś $Oy$ w punkcie $(0, ${c})$. Funkcja $f$ jest określona wzorem`,
    ok: fx(fact(a, lo, hi)),
    bad: [fx(fact(-a, lo, hi)), fx(fact(a, -hi, -lo)), fx(fact(a === 1 ? 2 : 1, lo, hi)), fx(fact(-a, -hi, -lo)), fx(fact(c, lo, hi))],
    steps: [T`Z miejsc zerowych: $f(x) = a(${xm(lo)})(${xm(hi)})$.`, T`$f(0) = ${c}$: $a \cdot ${par(-lo)} \cdot ${par(-hi)} = ${c}$, czyli $${x1 * x2}a = ${c}$ i $a = ${a}$.`, T`$f(x) = ${fact(a, lo, hi)}$.`],
    trap: T`Miejsca zerowe nie wyznaczają jeszcze współczynnika $a$. Trzeba użyć dodatkowego punktu – tutaj $(0, ${c})$.`,
    tip: 'Karta wzorów, str. 8: $f(x) = a(x - x_1)(x - x_2)$. Brakujące $a$ wyznacz z dowolnego dodatkowego punktu wykresu.'
  });
};
const findBC = (r) => {
  const b = r.intNot(-6, 6, 0);
  const c = r.intNot(-8, 8, 0);
  const x0 = r.pick([1, -1, 2, -2]);
  const y0 = x0 * x0 + b * x0 + c;
  return mc({
    title: 'Współczynniki b i c z dwóch warunków',
    q: T`Wykres funkcji kwadratowej $f$ określonej wzorem $f(x) = x^2 + bx + c$ przecina oś $Oy$ w punkcie $(0, ${c})$ i przechodzi przez punkt $(${x0}, ${y0})$. Współczynnik $b$ jest równy`,
    ok: m(b),
    val: b,
    bad: [m(-b), m(c === b ? c + 1 : c), m(y0 - c === b ? b + 2 : y0 - c), m(b + 1), m(fr(y0 - c, x0) === `${b}` ? b - 1 : fr(y0 + c - x0 * x0, x0))],
    steps: [T`Z punktu $(0, ${c})$: $f(0) = c = ${c}$.`, T`Z punktu $(${x0}, ${y0})$: $${par(x0)}^2 + b \cdot ${par(x0)} ${c > 0 ? '+' : '-'} ${Math.abs(c)} = ${y0}$.`, (x0 === 1 ? T`Stąd $b = ${b}$.` : T`$${x0 === -1 ? '-' : x0}b = ${y0 - c - x0 * x0}$, więc $b = ${b}$.`)],
    trap: T`Punkt przecięcia z osią $Oy$ od razu daje wyraz wolny $c$. Dopiero potem z drugiego punktu liczysz $b$.`,
    tip: 'Każdy punkt wykresu to jedno równanie ze współczynnikami. Dwie niewiadome – dwa punkty.'
  });
};
const findValueFromSymmetry = (r) => {
  const p = r.int(-5, 5);
  const d = r.int(1, 6);
  const v = r.int(-9, 9);
  const left = r.bool();
  const known = left ? p - d : p + d;
  const asked = left ? p + d : p - d;
  return mc({
    title: 'Symetria paraboli',
    q: T`Osią symetrii wykresu funkcji kwadratowej $f$ jest prosta $x = ${p}$, a ponadto $f(${known}) = ${v}$. Wynika stąd, że`,
    ok: m(`f(${asked}) = ${v}`),
    bad: [m(`f(${asked}) = ${-v === v ? v + 1 : -v}`), m(`f(${-known === asked ? asked + 1 : -known}) = ${v}`), m(`f(${p}) = ${v}`), m(`f(${known + 2 * d === asked ? asked + d : known + 2 * d + (left ? d : -4 * d)}) = ${v}`)],
    steps: [T`Argument $${known}$ leży o $${d}$ ${left ? 'na lewo' : 'na prawo'} od osi symetrii $x = ${p}$.`, T`Punkt symetryczny leży o $${d}$ ${left ? 'na prawo' : 'na lewo'}: $x = ${p} ${left ? '+' : '-'} ${d} = ${asked}$.`, T`Parabola jest symetryczna, więc $f(${asked}) = f(${known}) = ${v}$.`],
    trap: T`Symetria względem prostej $x = ${p}$ to nie zmiana znaku argumentu. Odmierzasz tę samą odległość od $${p}$ po drugiej stronie.`,
    tip: 'Argumenty jednakowo odległe od osi symetrii paraboli mają równe wartości.'
  });
};
const findVertexFromZeros = (r) => {
  const a = r.pick([1, -1, 2, -2]);
  const x1 = r.int(-6, 3);
  const d = r.int(1, 4) * 2;
  const x2 = x1 + d;
  const p = (x1 + x2) / 2;
  const q = -a * (d / 2) ** 2;
  return mc({
    title: 'Wzór kanoniczny z postaci iloczynowej',
    q: T`Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ${fact(a, x1, x2)}$. Wzór tej funkcji w postaci kanonicznej to`,
    ok: fx(canon(a, p, q)),
    bad: [fx(canon(a, -p, q)), fx(canon(a, p, -q)), fx(canon(a, p, a * x1 * x2 === q ? q + 1 : a * x1 * x2)), fx(canon(a, -p, -q))],
    steps: [T`$p = \frac{${x1} + ${par(x2)}}{2} = ${p}$.`, T`$q = f(${p}) = ${a} \cdot ${par(p - x1)} \cdot ${par(p - x2)} = ${q}$.`, T`$f(x) = ${canon(a, p, q)}$.`],
    trap: T`Współczynnik $a$ jest ten sam we wszystkich trzech postaciach wzoru. Zmieniają się tylko pozostałe liczby.`,
    tip: TIP_QUAD
  });
};

export default {
  numericId: 6,
  title: 'Funkcja kwadratowa',
  short_title: 'Funkcja kwadratowa',
  description: 'Postać ogólna, kanoniczna i iloczynowa, wierzchołek i oś symetrii, miejsca zerowe oraz wartości skrajne w przedziale.',
  icon: 'Activity',
  color: '#FB923C',
  matura_points_range: '4–7 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 7–8',
  lessons: [
    {
      title: 'Trzy postacie wzoru: ogólna, kanoniczna, iloczynowa',
      short_title: 'Trzy postacie',
      pill: pill({
        essence: T`Tę samą funkcję kwadratową można zapisać na trzy sposoby. Postać ogólna $f(x) = ax^2 + bx + c$ pokazuje punkt przecięcia z osią $Oy$: $(0, c)$. Postać kanoniczna $f(x) = a(x - p)^2 + q$ pokazuje wierzchołek $W = (p, q)$. Postać iloczynowa $f(x) = a(x - x_1)(x - x_2)$ pokazuje miejsca zerowe. Współczynnik $a$ jest we wszystkich trzech taki sam i decyduje o kierunku ramion.`,
        context: 'Wiązka 2–3 zadań o jednej funkcji kwadratowej (zadania 12–16) • łącznie 3–4 pkt w każdym arkuszu.',
        pl: T`To jak trzy zdjęcia tej samej osoby. Na pierwszym widać, gdzie parabola przecina oś pionową. Na drugim – gdzie ma czubek. Na trzecim – gdzie wbija się w oś poziomą. Wybierasz to zdjęcie, na którym widać to, o co pytają.`,
        steps: [
          ['Rozpoznaj postać', T`Nawias do kwadratu – kanoniczna. Dwa nawiasy – iloczynowa. Bez nawiasów – ogólna.`, 'Każda postać „pokazuje” co innego.'],
          ['Odczytaj to, co widać od razu', T`$f(x) = 2(x - 3)^2 - 8$: wierzchołek $(3, -8)$, ramiona w górę.`, 'Nie licz, jeśli można odczytać.'],
          ['W razie potrzeby przekształć', T`$2(x - 3)^2 - 8 = 2(x^2 - 6x + 9) - 8 = 2x^2 - 12x + 10$.`, 'Najpierw kwadrat, potem mnożenie przez a.']
        ],
        formulas: [
          ['Postać ogólna', T`f(x) = ax^2 + bx + c`, 7],
          ['Postać kanoniczna', T`f(x) = a(x - p)^2 + q`, 8],
          ['Postać iloczynowa', T`f(x) = a(x - x_1)(x - x_2)`, 8]
        ],
        examples: [
          ['Kanoniczna → ogólna', '1 pkt', T`Zapisz w postaci ogólnej $f(x) = -(x + 2)^2 + 9$.`, T`1. $(x + 2)^2 = x^2 + 4x + 4$.` + '\n' + T`2. $-(x^2 + 4x + 4) + 9 = -x^2 - 4x + 5$.`, 'Minus przed nawiasem zmienia wszystkie trzy znaki.'],
          ['Ogólna → kanoniczna', '1 pkt', T`Zapisz w postaci kanonicznej $f(x) = x^2 - 6x + 5$.`, T`1. $p = -\frac{-6}{2} = 3$.` + '\n' + T`2. $q = f(3) = 9 - 18 + 5 = -4$.` + '\n' + T`3. $f(x) = (x - 3)^2 - 4$.`, 'q najłatwiej policzyć jako f(p).']
        ],
        trap: T`W postaci kanonicznej $a(x - p)^2 + q$ znak przy $p$ jest „odwrócony”: $(x + 2)^2$ oznacza $p = -2$, nie $2$.`,
        fail: T`„$f(x) = (x + 2)^2 + 9$ ma wierzchołek w punkcie $(2, 9)$.”`,
        win: T`$(x + 2) = (x - (-2))$, więc wierzchołek to $(-2, 9)$.`,
        why: 'Wierzchołek leży tam, gdzie nawias się zeruje, a x + 2 = 0 dla x = −2.',
        ckeTip: 'Wszystkie trzy postacie i wzory na p, q są w karcie wzorów na str. 7–8.',
        points: [T`Ogólna: widać $c$, czyli punkt $(0, c)$.`, T`Kanoniczna: widać wierzchołek $(p, q)$.`, T`Iloczynowa: widać miejsca zerowe $x_1$, $x_2$.`]
      }),
      gens: [formCanonToGeneral, formFactoredC, formGeneralToCanon, formYIntercept, formFindA]
    },
    {
      title: 'Wierzchołek paraboli, oś symetrii i zbiór wartości',
      short_title: 'Wierzchołek i oś symetrii',
      pill: pill({
        essence: T`Wierzchołek $W = (p, q)$ to najniższy (dla $a > 0$) albo najwyższy (dla $a < 0$) punkt paraboli. Pierwszą współrzędną liczysz ze wzoru $p = -\frac{b}{2a}$ albo jako średnią miejsc zerowych, drugą najprościej jako $q = f(p)$. Przez wierzchołek przechodzi oś symetrii – prosta $x = p$. Zbiór wartości to $\langle q, +\infty)$ dla ramion w górę i $(-\infty, q \rangle$ dla ramion w dół.`,
        context: 'Zadania 12–16 w arkuszu • 1 pkt każde, zwykle w wiązce o jednej funkcji.',
        pl: T`Wierzchołek to punkt zwrotny: do niego parabola spada, od niego rośnie (albo odwrotnie). $p$ mówi „gdzie” to się dzieje, a $q$ mówi „na jakiej wysokości”. Wszystko, co pyta o „gdzie” (oś symetrii, monotoniczność), używa $p$. Wszystko, co pyta o „jak wysoko” (zbiór wartości), używa $q$.`,
        steps: [
          ['Policz p', T`$f(x) = x^2 - 4x + 1$: $p = -\frac{-4}{2 \cdot 1} = 2$.`, 'Albo: średnia miejsc zerowych.'],
          ['Policz q', T`$q = f(2) = 4 - 8 + 1 = -3$.`, 'Podstaw p do wzoru funkcji.'],
          ['Odpowiedz na pytanie', T`Oś symetrii: $x = 2$. Zbiór wartości: $\langle -3, +\infty)$. Rosnąca w $\langle 2, +\infty)$.`, 'p do „gdzie”, q do „jak wysoko”.']
        ],
        formulas: [
          ['Współrzędne wierzchołka', T`p = -\frac{b}{2a}, \quad q = -\frac{\Delta}{4a}`, 8],
          ['Oś symetrii', T`x = p = \frac{x_1 + x_2}{2}`],
          ['Zbiór wartości', T`a > 0: \ \langle q, +\infty) \qquad a < 0: \ (-\infty, q \rangle`]
        ],
        examples: [
          ['Zbiór wartości', '1 pkt', T`Podaj zbiór wartości funkcji $f(x) = -2(x - 1)^2 + 5$.`, T`1. Wierzchołek: $(1, 5)$.` + '\n' + T`2. $a = -2 < 0$ – ramiona w dół, $5$ to wartość największa.` + '\n' + T`3. $ZW = (-\infty, 5 \rangle$.`, 'Kierunek przedziału zależy od znaku a.'],
          ['Oś symetrii', '1 pkt', T`Podaj równanie osi symetrii wykresu funkcji $f(x) = (x + 1)(x - 5)$.`, T`1. Miejsca zerowe: $-1$ i $5$.` + '\n' + T`2. $p = \frac{-1 + 5}{2} = 2$.` + '\n' + T`3. Oś symetrii: $x = 2$.`, 'Z postaci iloczynowej nie trzeba liczyć b.']
        ],
        trap: T`Zbiór wartości zależy od $q$, a przedziały monotoniczności od $p$. Zamiana tych dwóch liczb to najczęstszy błąd.`,
        fail: T`„$f(x) = (x - 3)^2 + 1$ jest rosnąca w $\langle 1, +\infty)$.”`,
        win: T`Rosnąca w $\langle 3, +\infty)$ (granicą jest $p = 3$), a zbiór wartości to $\langle 1, +\infty)$ (granicą jest $q = 1$).`,
        why: 'Monotoniczność opisujemy argumentami (oś Ox, czyli p), a zbiór wartości – wartościami (oś Oy, czyli q).',
        ckeTip: 'Szybki szkic paraboli z zaznaczonym wierzchołkiem rozwiązuje cztery typy zadań naraz.',
        points: [T`$p = -\frac{b}{2a}$ lub średnia miejsc zerowych.`, T`$q = f(p)$.`, T`Oś symetrii to prosta pionowa $x = p$.`]
      }),
      gens: [vertexFromCanon, vertexFromGeneral, vertexAxisFromZeros, vertexRange, vertexMonotonic]
    },
    {
      title: 'Miejsca zerowe i postać iloczynowa',
      short_title: 'Miejsca zerowe',
      pill: pill({
        essence: T`Miejsca zerowe funkcji kwadratowej to rozwiązania równania $ax^2 + bx + c = 0$. Ich liczba zależy od wyróżnika: dwa dla $\Delta > 0$, jedno dla $\Delta = 0$, żadnego dla $\Delta < 0$. Jeśli miejsca zerowe $x_1$, $x_2$ istnieją, funkcję można zapisać w postaci iloczynowej $f(x) = a(x - x_1)(x - x_2)$. Działa to w obie strony: z postaci iloczynowej miejsca zerowe czytasz bez liczenia.`,
        context: 'Zadania 12–16 w arkuszu • 1 pkt oraz pierwszy krok w nierównościach kwadratowych.',
        pl: T`Miejsca zerowe to punkty, w których parabola przebija oś poziomą. Postać iloczynowa ma je wypisane w nawiasach – tylko ze zmienionym znakiem: nawias $(x - 3)$ zeruje się dla $x = 3$, a nawias $(x + 5)$ dla $x = -5$.`,
        steps: [
          ['Z postaci iloczynowej – odczytaj', T`$f(x) = 2(x - 3)(x + 5)$: miejsca zerowe to $3$ i $-5$.`, 'Liczba przed nawiasami nie ma wpływu.'],
          ['Z postaci ogólnej – delta', T`$x^2 - 2x - 15 = 0$: $\Delta = 4 + 60 = 64$, $x_1 = -3$, $x_2 = 5$.`, 'Wzory w karcie na str. 7–8.'],
          ['Zapisz postać iloczynową', T`$f(x) = (x + 3)(x - 5)$.`, T`Nawias to $x$ minus miejsce zerowe.`]
        ],
        formulas: [
          ['Wyróżnik', T`\Delta = b^2 - 4ac`, 7],
          ['Miejsca zerowe', T`x_{1} = \frac{-b - \sqrt{\Delta}}{2a}, \quad x_{2} = \frac{-b + \sqrt{\Delta}}{2a}`, 8],
          ['Postać iloczynowa', T`f(x) = a(x - x_1)(x - x_2)`, 8]
        ],
        examples: [
          ['Postać iloczynowa', '1 pkt', T`Zapisz w postaci iloczynowej $f(x) = 2x^2 - 2x - 12$.`, T`1. $\Delta = 4 + 96 = 100$.` + '\n' + T`2. $x_1 = \frac{2 - 10}{4} = -2$, $x_2 = \frac{2 + 10}{4} = 3$.` + '\n' + T`3. $f(x) = 2(x + 2)(x - 3)$.`, 'Nie zgub współczynnika a = 2.'],
          ['Współczynnik z miejsc zerowych', '1 pkt', T`Miejscami zerowymi funkcji $f(x) = x^2 + bx + c$ są $-1$ i $4$. Oblicz $b$.`, T`1. $f(x) = (x + 1)(x - 4)$.` + '\n' + T`2. $= x^2 - 4x + x - 4 = x^2 - 3x - 4$.` + '\n' + T`3. $b = -3$.`, 'Wymnóż nawiasy i porównaj współczynniki.']
        ],
        trap: T`Zapisując postać iloczynową, nie gub współczynnika $a$. $2x^2 - 2x - 12$ to $2(x + 2)(x - 3)$, a NIE $(x + 2)(x - 3)$.`,
        fail: T`$2x^2 - 2x - 12 = (x + 2)(x - 3)$.`,
        win: T`$2x^2 - 2x - 12 = 2(x + 2)(x - 3)$ – po wymnożeniu musi wrócić $2x^2$.`,
        why: 'Same nawiasy dają po wymnożeniu x², a nie 2x². Współczynnik a skaluje całą parabolę.',
        ckeTip: 'Sprawdź postać iloczynową, mnożąc wyrazy wolne: a · (−x₁) · (−x₂) musi dać c.',
        points: [T`$\Delta > 0$: dwa miejsca zerowe; $\Delta = 0$: jedno; $\Delta < 0$: brak.`, T`Nawias $(x - x_1)$ zeruje się dla $x = x_1$.`, T`W postaci iloczynowej zawsze stoi współczynnik $a$.`]
      }),
      gens: [zerosFromFactored, zerosToFactored, zerosCountCanon, zerosFindCoefficient, zerosDistance]
    },
    {
      title: 'Wartość największa i najmniejsza w przedziale domkniętym',
      short_title: 'Wartości skrajne w przedziale',
      time: '~6 min',
      pill: pill({
        essence: T`Żeby znaleźć największą i najmniejszą wartość funkcji kwadratowej w przedziale domkniętym $\langle A, B \rangle$, sprawdzasz, czy wierzchołek „mieści się” w tym przedziale. Jeśli $p$ należy do przedziału, porównujesz trzy liczby: $f(A)$, $f(B)$ i $f(p)$. Jeśli $p$ leży poza przedziałem, porównujesz tylko $f(A)$ i $f(B)$ – funkcja jest wtedy w całym przedziale monotoniczna.`,
        context: 'Zadanie otwarte lub zamknięte za 1–2 pkt; ten sam schemat jest kluczem do zadań optymalizacyjnych za 4 pkt.',
        pl: T`Patrzysz na parabolę przez okno, czyli przedział. Jeśli czubek paraboli widać w oknie – to on jest rekordzistą (najniższym albo najwyższym punktem). Jeśli czubka nie widać, rekordy padają na krawędziach okna.`,
        steps: [
          ['Policz p', T`$f(x) = x^2 - 4x + 1$, przedział $\langle 0, 3 \rangle$: $p = 2$.`, T`$p = -\frac{b}{2a}$`],
          ['Sprawdź, czy p należy do przedziału', T`$2 \in \langle 0, 3 \rangle$ – tak.`, 'To decyduje, ile liczb porównujesz.'],
          ['Policz wartości', T`$f(0) = 1$, $f(3) = -2$, $f(2) = -3$.`, 'Końce zawsze, wierzchołek tylko gdy należy.'],
          ['Wybierz skrajne', T`Najmniejsza: $-3$, największa: $1$.`, 'Odpowiedz dokładnie na pytanie.']
        ],
        formulas: [
          ['Pierwsza współrzędna wierzchołka', T`p = -\frac{b}{2a}`, 8],
          ['Gdy p należy do przedziału', T`\text{porównaj } f(A), \ f(B), \ f(p)`],
          ['Gdy p leży poza przedziałem', T`\text{porównaj } f(A), \ f(B)`]
        ],
        examples: [
          ['Wierzchołek w przedziale', '2 pkt', T`Wyznacz największą wartość funkcji $f(x) = -x^2 + 2x + 3$ w przedziale $\langle 0, 4 \rangle$.`, T`1. $p = -\frac{2}{-2} = 1 \in \langle 0, 4 \rangle$.` + '\n' + T`2. $f(0) = 3$, $f(4) = -5$, $f(1) = 4$.` + '\n' + T`3. Największa wartość: $4$.`, 'Ramiona w dół i wierzchołek w przedziale – maksimum w wierzchołku.'],
          ['Wierzchołek poza przedziałem', '2 pkt', T`Wyznacz najmniejszą wartość funkcji $f(x) = x^2 - 6x + 2$ w przedziale $\langle 0, 2 \rangle$.`, T`1. $p = 3 \notin \langle 0, 2 \rangle$.` + '\n' + T`2. $f(0) = 2$, $f(2) = -6$.` + '\n' + T`3. Najmniejsza wartość: $-6$.`, 'q = −7 nie jest przyjmowane w tym przedziale.']
        ],
        trap: T`Gdy wierzchołek leży POZA przedziałem, liczba $q$ nie może być odpowiedzią – funkcja w ogóle nie przyjmuje jej w tym przedziale.`,
        fail: T`„Najmniejsza wartość $f(x) = x^2 - 6x + 2$ w $\langle 0, 2 \rangle$ to $q = -7$.”`,
        win: T`$p = 3$ nie należy do $\langle 0, 2 \rangle$, więc porównujemy $f(0) = 2$ i $f(2) = -6$. Odpowiedź: $-6$.`,
        why: 'Wartość q funkcja osiąga tylko dla x = p. Skoro p nie ma w przedziale, to i q nie ma wśród wartości.',
        ckeTip: 'W rozwiązaniu otwartym napisz wprost: „p należy / nie należy do przedziału” – za to zdanie jest osobny punkt.',
        points: [T`Zawsze licz wartości na obu końcach przedziału.`, T`Wierzchołek bierzesz pod uwagę tylko, gdy $p$ należy do przedziału.`, T`Odpowiedzią jest wartość funkcji, nie argument.`]
      }),
      gens: [extremeOnInterval, extremeArgument, extremeValueGlobal, extremeStatements]
    },
    {
      title: 'Wyznaczanie wzoru funkcji kwadratowej',
      short_title: 'Wyznaczanie wzoru',
      pill: pill({
        essence: T`Wzór funkcji kwadratowej wyznaczasz, wybierając postać pasującą do danych. Znasz wierzchołek – zacznij od postaci kanonicznej $a(x - p)^2 + q$. Znasz miejsca zerowe – od iloczynowej $a(x - x_1)(x - x_2)$. W obu przypadkach zostaje jedna niewiadoma: współczynnik $a$, który wyliczasz, podstawiając współrzędne dodatkowego punktu wykresu.`,
        context: 'Zadanie zamknięte za 1 pkt lub otwarte za 2 pkt, często z rysunkiem paraboli.',
        pl: T`Wierzchołek albo miejsca zerowe to szkielet paraboli. Brakuje tylko informacji, jak bardzo jest „rozciągnięta” i w którą stronę otwarta – tym steruje $a$. Jeden dodatkowy punkt rozstrzyga sprawę.`,
        steps: [
          ['Wybierz postać', T`Dany wierzchołek $(1, -4)$ → $f(x) = a(x - 1)^2 - 4$.`, 'Dane decydują o postaci.'],
          ['Podstaw dodatkowy punkt', T`Punkt $(3, 4)$: $4 = a(3 - 1)^2 - 4$.`, 'Za x pierwsza współrzędna, za f(x) druga.'],
          ['Wylicz a i zapisz wzór', T`$4a = 8$, $a = 2$. $f(x) = 2(x - 1)^2 - 4$.`, 'Sprawdź: f(3) = 8 − 4 = 4.']
        ],
        formulas: [
          ['Z wierzchołka', T`f(x) = a(x - p)^2 + q`, 8],
          ['Z miejsc zerowych', T`f(x) = a(x - x_1)(x - x_2)`, 8],
          ['Symetria', T`f(p - d) = f(p + d)`]
        ],
        examples: [
          ['Z miejsc zerowych', '2 pkt', T`Funkcja kwadratowa ma miejsca zerowe $-1$ i $3$, a jej wykres przechodzi przez punkt $(0, 6)$. Wyznacz wzór.`, T`1. $f(x) = a(x + 1)(x - 3)$.` + '\n' + T`2. $6 = a \cdot 1 \cdot (-3)$, więc $a = -2$.` + '\n' + T`3. $f(x) = -2(x + 1)(x - 3)$.`, 'Ujemne a – ramiona w dół.'],
          ['Symetria', '1 pkt', T`Osią symetrii paraboli jest prosta $x = 2$ i $f(-1) = 5$. Podaj inny argument, dla którego wartość jest równa $5$.`, T`1. $-1$ leży $3$ jednostki na lewo od $2$.` + '\n' + T`2. Punkt symetryczny: $2 + 3 = 5$.` + '\n' + T`3. $f(5) = 5$.`, 'Ta sama odległość od osi po drugiej stronie.']
        ],
        trap: T`Wierzchołek albo miejsca zerowe NIE wystarczą do wyznaczenia wzoru. Bez dodatkowego punktu nie znasz $a$ – a to ono decyduje o kształcie.`,
        fail: T`„Miejsca zerowe to $-1$ i $3$, więc $f(x) = (x + 1)(x - 3)$.”`,
        win: T`$f(x) = a(x + 1)(x - 3)$, a $a$ wyznaczamy z punktu $(0, 6)$: $a = -2$.`,
        why: 'Przez dwa miejsca zerowe przechodzi nieskończenie wiele parabol – różnią się właśnie współczynnikiem a.',
        ckeTip: 'Po wyznaczeniu wzoru podstaw dany punkt z powrotem – jeśli się zgadza, masz pewność.',
        points: [T`Wierzchołek → postać kanoniczna.`, T`Miejsca zerowe → postać iloczynowa.`, T`Współczynnik $a$ zawsze z dodatkowego punktu.`]
      }),
      gens: [findFromVertexPoint, findFromZerosPoint, findBC, findValueFromSymmetry, findVertexFromZeros]
    }
  ]
};
