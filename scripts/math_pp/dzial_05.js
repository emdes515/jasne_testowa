import { T, mc, num, pf, pill, fr, par, lin, xm, iv, m, need, gcd } from './lib.js';

const TIP_LIN = 'Funkcja liniowa $f(x) = ax + b$: $a$ to współczynnik kierunkowy (nachylenie), $b$ to punkt przecięcia z osią $Oy$.';
const P = (x, y) => m(`(${x}, ${y})`);
const sys = (e1, e2) => T`\begin{cases} ${e1} \\ ${e2} \end{cases}`;
/** Równanie ax + by = c w ładnym zapisie. */
const eq = (a, b, c) => {
  const t = (k, v, first) => {
    if (k === 0) return '';
    const abs = Math.abs(k) === 1 ? '' : Math.abs(k);
    return first ? `${k < 0 ? '-' : ''}${abs}${v}` : ` ${k > 0 ? '+' : '-'} ${abs}${v}`;
  };
  const left = a !== 0 ? t(a, 'x', true) + t(b, 'y', false) : t(b, 'y', true);
  return `${left} = ${c}`;
};

// ---------- 5.1 Współczynniki funkcji liniowej ----------
const linMonotonicParam = (r) => {
  const k = r.pick([1, 2, 3, -1, -2]);
  const c = r.intNot(-8, 8, 0);
  const b = r.intNot(-9, 9, 0);
  const inc = r.bool();
  // (k m + c) x + b rosnąca gdy k m + c > 0
  const bound = fr(-c, k);
  const dir = (inc ? 1 : -1) * (k > 0 ? 1 : -1) > 0 ? '>' : '<';
  const coef = `${k === 1 ? '' : k === -1 ? '-' : k}m ${c > 0 ? '+' : '-'} ${Math.abs(c)}`;
  return mc({
    title: 'Monotoniczność funkcji liniowej z parametrem',
    q: T`Funkcja liniowa $f$ określona wzorem $f(x) = (${coef})x ${b > 0 ? '+' : '-'} ${Math.abs(b)}$ jest ${inc ? 'rosnąca' : 'malejąca'} dla`,
    ok: m(`m ${dir} ${bound}`),
    bad: [m(`m ${dir === '>' ? '<' : '>'} ${bound}`), m(`m ${dir} ${fr(c, k)}`), m(`m ${dir === '>' ? '<' : '>'} ${fr(c, k)}`), m(`m ${dir} ${-b}`)],
    steps: [
      T`Funkcja liniowa jest ${inc ? 'rosnąca' : 'malejąca'}, gdy jej współczynnik kierunkowy jest ${inc ? 'dodatni' : 'ujemny'}: $${coef} ${inc ? '>' : '<'} 0$.`,
      T`$${k === 1 ? '' : k === -1 ? '-' : k}m ${inc ? '>' : '<'} ${-c}$${k < 0 ? T`, a po podzieleniu przez liczbę ujemną $${k}$ (odwracamy znak)` : k === 1 ? '' : T`, a po podzieleniu przez $${k}$`}: $m ${dir} ${bound}$.`
    ],
    trap: T`Wyraz wolny ($${b}$) nie ma wpływu na monotoniczność – decyduje wyłącznie współczynnik przy $x$.`,
    tip: 'Funkcja liniowa: $a > 0$ – rosnąca, $a < 0$ – malejąca, $a = 0$ – stała.'
  });
};
const linZero = (r) => {
  const a = r.intNot(-6, 6, 0, 1, -1);
  const b = r.intNot(-12, 12, 0);
  return mc({
    title: 'Miejsce zerowe funkcji liniowej',
    q: T`Miejscem zerowym funkcji liniowej $f$ określonej wzorem $f(x) = ${lin(a, b)}$ jest liczba`,
    ok: m(fr(-b, a)),
    val: -b / a,
    bad: [m(fr(b, a)), m(b), m(fr(-a, b)), m(fr(a, b)), m(-b)],
    steps: [T`Rozwiązujemy równanie $${lin(a, b)} = 0$.`, T`$${a}x = ${-b}$, więc $x = ${fr(-b, a)}$.`],
    trap: T`Miejsce zerowe to $-\frac{b}{a}$. Wyraz wolny $${b}$ to wartość dla $x = 0$, czyli punkt przecięcia z osią $Oy$.`,
    tip: TIP_LIN
  });
};
const linIntercepts = (r) => {
  const a = r.intNot(-5, 5, 0);
  const z = r.intNot(-6, 6, 0);
  const b = -a * z;
  const askY = r.bool();
  return mc({
    title: askY ? 'Punkt przecięcia z osią Oy' : 'Punkt przecięcia z osią Ox',
    q: T`Wykres funkcji liniowej $f$ określonej wzorem $f(x) = ${lin(a, b)}$ przecina oś $${askY ? 'Oy' : 'Ox'}$ w punkcie`,
    ok: askY ? P(0, b) : P(z, 0),
    bad: askY ? [P(b, 0), P(0, z), P(z, 0), P(0, -b), P(0, a)] : [P(0, z), P(b, 0), P(-z, 0), P(0, b), P(a, 0)],
    steps: askY ? [T`Na osi $Oy$ pierwsza współrzędna jest równa $0$, więc liczymy $f(0)$.`, T`$f(0) = ${b}$, czyli punkt $(0, ${b})$.`] : [T`Na osi $Ox$ druga współrzędna jest równa $0$, więc rozwiązujemy $${lin(a, b)} = 0$.`, T`$x = ${z}$, czyli punkt $(${z}, 0)$.`],
    trap: T`Punkt na osi $Oy$ ma postać $(0, \ldots)$, a na osi $Ox$ – postać $(\ldots, 0)$. Kolejność współrzędnych ma znaczenie.`,
    tip: TIP_LIN
  });
};
const linSigns = (r) => {
  const inc = r.bool();
  const above = r.bool();
  const ans = `$a ${inc ? '>' : '<'} 0$ i $b ${above ? '>' : '<'} 0$`;
  const all = ['$a > 0$ i $b > 0$', '$a > 0$ i $b < 0$', '$a < 0$ i $b > 0$', '$a < 0$ i $b < 0$'];
  const variants = [
    T`Funkcja liniowa $f$ określona wzorem $f(x) = ax + b$ jest ${inc ? 'rosnąca' : 'malejąca'}, a jej wykres przecina oś $Oy$ ${above ? 'powyżej' : 'poniżej'} osi $Ox$. Wynika stąd, że`,
    T`Wykres funkcji liniowej $f(x) = ax + b$ przecina oś $Oy$ w punkcie o ${above ? 'dodatniej' : 'ujemnej'} drugiej współrzędnej, a funkcja $f$ jest ${inc ? 'rosnąca' : 'malejąca'}. Współczynniki $a$ i $b$ spełniają warunki`,
    T`O funkcji liniowej $f(x) = ax + b$ wiadomo, że $f(0) ${above ? '>' : '<'} 0$ oraz że dla coraz większych argumentów przyjmuje ona coraz ${inc ? 'większe' : 'mniejsze'} wartości. Wtedy`,
    T`Wykres funkcji liniowej $f(x) = ax + b$ ${inc ? 'wznosi się' : 'opada'} (patrząc od lewej do prawej) i przecina oś pionową ${above ? 'nad' : 'pod'} początkiem układu współrzędnych. Zatem`,
    T`Funkcja liniowa $f(x) = ax + b$ jest ${inc ? 'rosnąca' : 'malejąca'} i spełnia warunek $f(0) ${above ? '>' : '<'} 0$. Wynika stąd, że`
  ];
  return mc({
    title: 'Znaki współczynników funkcji liniowej',
    q: r.pick(variants),
    ok: ans,
    bad: all.filter((x) => x !== ans),
    steps: [T`Funkcja jest ${inc ? 'rosnąca' : 'malejąca'}, więc współczynnik kierunkowy $a$ jest ${inc ? 'dodatni' : 'ujemny'}.`, T`Wykres przecina oś $Oy$ w punkcie $(0, b)$, który leży ${above ? 'nad' : 'pod'} osią $Ox$, więc $b ${above ? '>' : '<'} 0$.`],
    trap: T`Znak $b$ mówi tylko o punkcie przecięcia z osią $Oy$. Nie ma nic wspólnego z tym, czy funkcja rośnie.`,
    tip: TIP_LIN
  });
};
const linSameZero = (r) => {
  const a = r.intNot(-5, 5, 0);
  const z = r.intNot(-5, 5, 0);
  const b = -a * z;
  const c = r.intNot(-12, 12, 0, b);
  need(c % z === 0 || true);
  return mc({
    title: 'Wspólne miejsce zerowe dwóch funkcji',
    q: T`Funkcje liniowe $f$ oraz $g$, określone wzorami $f(x) = ${lin(a, b)}$ oraz $g(x) = kx ${c > 0 ? '+' : '-'} ${Math.abs(c)}$, mają to samo miejsce zerowe. Współczynnik $k$ jest równy`,
    ok: m(fr(-c, z)),
    val: -c / z,
    bad: [m(fr(c, z)), m(fr(-z, c)), m(a), m(fr(z, c)), m(fr(-c, a))],
    steps: [T`Miejsce zerowe funkcji $f$: $${lin(a, b)} = 0$, więc $x = ${z}$.`, T`Ta sama liczba zeruje $g$: $k \cdot ${par(z)} ${c > 0 ? '+' : '-'} ${Math.abs(c)} = 0$.`, T`Stąd $k = ${fr(-c, z)}$.`],
    trap: T`Wspólne miejsce zerowe nie oznacza równych współczynników kierunkowych. Najpierw wyznacz miejsce zerowe, potem podstaw je do drugiego wzoru.`,
    tip: 'Miejsce zerowe $x_0$ funkcji $g$ spełnia równanie $g(x_0) = 0$ – to daje równanie na nieznany współczynnik.'
  });
};

// ---------- 5.2 Wyznaczanie wzoru funkcji liniowej ----------
const fx = (a, b) => m(`f(x) = ${lin(a, b)}`);
const linFromTwoPoints = (r) => {
  const a = r.intNot(-4, 4, 0);
  const b = r.intNot(-7, 7, 0);
  const x1 = r.int(-4, 3);
  const x2 = r.intNot(-4, 5, x1);
  return mc({
    title: 'Wzór funkcji liniowej z dwóch punktów',
    q: T`Wykres funkcji liniowej $f$ przechodzi przez punkty $A = (${x1}, ${a * x1 + b})$ oraz $B = (${x2}, ${a * x2 + b})$. Funkcja $f$ jest określona wzorem`,
    ok: fx(a, b),
    bad: [fx(-a, b), fx(a, -b), fx(b, a), fx(a, b + a), fx(-a, -b)],
    steps: [
      T`Współczynnik kierunkowy: $a = \frac{${a * x2 + b} - ${par(a * x1 + b)}}{${x2} - ${par(x1)}} = \frac{${a * (x2 - x1)}}{${x2 - x1}} = ${a}$.`,
      T`Podstawiamy punkt $A$ do $y = ${a === 1 ? '' : a === -1 ? '-' : a}x + b$: $${a * x1 + b} = ${a} \cdot ${par(x1)} + b$, stąd $b = ${b}$.`,
      T`Wzór: $f(x) = ${lin(a, b)}$.`
    ],
    trap: T`We wzorze na $a$ w liczniku i mianowniku odejmujesz współrzędne w tej samej kolejności punktów.`,
    tip: 'Karta wzorów, str. 22: współczynnik kierunkowy prostej przez dwa punkty to $a = \\frac{y_2 - y_1}{x_2 - x_1}$.'
  });
};
const linSlope = (r) => {
  const x1 = r.int(-6, 5);
  const y1 = r.int(-6, 6);
  const dx = r.intNot(-6, 6, 0);
  const dy = r.intNot(-8, 8, 0);
  need(gcd(dx, dy) === 1 && Math.abs(dx) !== 1);
  return mc({
    title: 'Współczynnik kierunkowy',
    q: T`Wykres funkcji liniowej $f(x) = ax + b$ przechodzi przez punkty $A = (${x1}, ${y1})$ oraz $B = (${x1 + dx}, ${y1 + dy})$. Współczynnik kierunkowy $a$ jest równy`,
    ok: m(fr(dy, dx)),
    val: dy / dx,
    bad: [m(fr(dx, dy)), m(fr(-dy, dx)), m(fr(-dx, dy)), m(fr(y1 + dy + y1 || 1, x1 + dx + x1 || 1))],
    steps: [T`$a = \frac{y_B - y_A}{x_B - x_A} = \frac{${y1 + dy} - ${par(y1)}}{${x1 + dx} - ${par(x1)}}$.`, T`Po obliczeniu różnic: $a = ${fr(dy, dx)}$.`],
    trap: T`W liczniku stoi różnica drugich współrzędnych ($y$), a w mianowniku pierwszych ($x$) – nie odwrotnie.`,
    tip: 'Karta wzorów, str. 22: współczynnik kierunkowy prostej przez dwa punkty to $a = \\frac{y_2 - y_1}{x_2 - x_1}$.'
  });
};
const linFromZeroAndPoint = (r) => {
  const a = r.intNot(-4, 4, 0);
  const z = r.intNot(-5, 5, 0);
  const b = -a * z;
  const x1 = r.intNot(-5, 5, z);
  return mc({
    title: 'Wzór z miejsca zerowego i punktu',
    q: T`Miejscem zerowym funkcji liniowej $f$ jest liczba $${z}$. Wykres tej funkcji przechodzi przez punkt $(${x1}, ${a * x1 + b})$. Funkcja $f$ jest określona wzorem`,
    ok: fx(a, b),
    bad: [fx(-a, b), fx(a, -b), fx(-a, -b), fx(a, z), fx(z, b)],
    steps: [T`Miejsce zerowe oznacza, że wykres przechodzi przez punkt $(${z}, 0)$.`, T`$a = \frac{${a * x1 + b} - 0}{${x1} - ${par(z)}} = ${a}$.`, T`Z warunku $f(${z}) = 0$: $${a} \cdot ${par(z)} + b = 0$, więc $b = ${b}$.`],
    trap: T`Miejsce zerowe $${z}$ to punkt $(${z}, 0)$ na osi $Ox$, a nie wyraz wolny $b$.`,
    tip: 'Informację „miejscem zerowym jest $x_0$” zamień na punkt $(x_0, 0)$ – wtedy masz dwa punkty i liczysz jak zwykle.'
  });
};
const linThirdValue = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.int(-8, 8);
  const x1 = r.int(-3, 2);
  const d = r.int(1, 3);
  const x2 = x1 + d;
  const x3 = x2 + r.int(1, 4);
  const v = a * x3 + b;
  return mc({
    title: 'Trzecia wartość funkcji liniowej',
    q: T`Funkcja liniowa $f$ spełnia warunki $f(${x1}) = ${a * x1 + b}$ oraz $f(${x2}) = ${a * x2 + b}$. Wartość $f(${x3})$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(v + a), m(v - a), m(a * x2 + b + a * x1 + b), m(-v === v ? 1 : -v), m(v + 2 * a)],
    steps: [T`Gdy argument rośnie o $${d}$, wartość zmienia się o $${a * d}$, więc $a = ${a}$.`, T`Z $f(${x1}) = ${a * x1 + b}$: $b = ${a * x1 + b} - ${par(a)} \cdot ${par(x1)} = ${b}$.`, T`$f(${x3}) = ${a} \cdot ${par(x3)} ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${v}$.`],
    trap: T`Funkcja liniowa zmienia się w stałym tempie: każdy wzrost argumentu o 1 zmienia wartość o $a = ${a}$.`,
    tip: 'W funkcji liniowej przyrost wartości jest proporcjonalny do przyrostu argumentu.'
  });
};
const linParallelThrough = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.int(-7, 7);
  const px = r.intNot(-5, 5, 0);
  const py = r.int(-7, 7);
  const b2 = py - a * px;
  need(b2 !== b);
  const gx = (aa, bb) => m(`g(x) = ${lin(aa, bb)}`);
  return mc({
    title: 'Funkcja o wykresie równoległym',
    q: T`Wykres funkcji liniowej $g$ jest równoległy do wykresu funkcji $f(x) = ${lin(a, b)}$ i przechodzi przez punkt $P = (${px}, ${py})$. Funkcja $g$ jest określona wzorem`,
    ok: gx(a, b2),
    bad: [gx(a, py), gx(-a, py + a * px), gx(a, py + a * px), gx(a, b), gx(-a, b2)],
    steps: [T`Wykresy równoległe mają ten sam współczynnik kierunkowy: $a = ${a}$.`, T`Podstawiamy punkt $P$: $${py} = ${a} \cdot ${par(px)} + b$, stąd $b = ${b2}$.`, T`$g(x) = ${lin(a, b2)}$.`],
    trap: T`Wyraz wolny to nie druga współrzędna punktu $P$ (chyba że $P$ leży na osi $Oy$). Trzeba go wyliczyć.`,
    tip: 'Karta wzorów, str. 22: proste $y = a_1x + b_1$ i $y = a_2x + b_2$ są równoległe, gdy $a_1 = a_2$.'
  });
};

// ---------- 5.3 Układy równań: metody rozwiązywania ----------
const mkSystem = (r) => {
  const x = r.intNot(-6, 6, 0);
  const y = r.intNot(-6, 6, 0);
  const a1 = r.intNot(-4, 4, 0);
  const b1 = r.intNot(-4, 4, 0);
  const a2 = r.intNot(-4, 4, 0);
  const b2 = r.intNot(-4, 4, 0);
  need(a1 * b2 - a2 * b1 !== 0);
  return { x, y, a1, b1, a2, b2, c1: a1 * x + b1 * y, c2: a2 * x + b2 * y };
};
const sysSolve = (r) => {
  const s = mkSystem(r);
  const pr = (x, y) => `$x = ${x}$ i $y = ${y}$`;
  return mc({
    title: 'Rozwiązanie układu równań',
    q: T`Rozwiązaniem układu równań $${sys(eq(s.a1, s.b1, s.c1), eq(s.a2, s.b2, s.c2))}$ jest para liczb`,
    ok: pr(s.x, s.y),
    bad: [pr(s.y, s.x), pr(-s.x, s.y), pr(s.x, -s.y), pr(-s.x, -s.y), pr(s.x + 1, s.y - 1)].filter((o) => s.x !== s.y || o !== pr(s.y, s.x)),
    steps: [
      `Metoda przeciwnych współczynników: pierwsze równanie ${s.b2 === 1 ? 'zostawiamy bez zmian' : `mnożymy przez $${s.b2}$`}, drugie ${-s.b1 === 1 ? 'zostawiamy bez zmian' : `mnożymy przez $${-s.b1}$`} – współczynniki przy $y$ stają się przeciwne.`,
      T`Po dodaniu stronami: $${s.a1 * s.b2 - s.a2 * s.b1}x = ${s.c1 * s.b2 - s.c2 * s.b1}$, więc $x = ${s.x}$.`,
      T`Podstawiamy do pierwszego równania: $${s.a1} \cdot ${par(s.x)} ${s.b1 > 0 ? '+' : '-'} ${Math.abs(s.b1) === 1 ? '' : Math.abs(s.b1)}y = ${s.c1}$, stąd $y = ${s.y}$.`
    ],
    trap: T`Para musi spełniać OBA równania. Sprawdzenie tylko w jednym z nich nie wystarcza.`,
    tip: 'W zadaniu zamkniętym najszybciej jest podstawić każdą parę do obu równań – poprawna spełnia oba.'
  });
};
const sysExpression = (r) => {
  const s = mkSystem(r);
  const kind = r.int(0, 2);
  const v = [s.x + s.y, s.x - s.y, s.x * s.y][kind];
  const name = ['x + y', 'x - y', 'x \\cdot y'][kind];
  return mc({
    title: 'Wyrażenie z rozwiązania układu',
    q: T`Para liczb $x$, $y$ jest rozwiązaniem układu równań $${sys(eq(s.a1, s.b1, s.c1), eq(s.a2, s.b2, s.c2))}$ Wartość wyrażenia $${name}$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m([s.x - s.y, s.x + s.y, s.x + s.y][kind]), m(-v === v ? 1 : -v), m(s.x), m(s.y), m(v + 1), m(v - 2)],
    steps: [T`Rozwiązujemy układ (np. metodą przeciwnych współczynników): $x = ${s.x}$, $y = ${s.y}$.`, T`$${name} = ${kind === 2 ? `${par(s.x)} \\cdot ${par(s.y)}` : kind === 0 ? `${s.x} + ${par(s.y)}` : `${s.x} - ${par(s.y)}`} = ${v}$.`],
    trap: T`Najpierw wyznacz obie niewiadome, dopiero potem licz wyrażenie. Sprawdź parę w obu równaniach.`,
    tip: 'Sprawdzenie: podstaw $x$ i $y$ do obu równań układu – oba muszą dać równość.'
  });
};
const sysSubstitution = (r) => {
  const x = r.intNot(-6, 6, 0);
  const k = r.intNot(-4, 4, 0);
  const d = r.int(-7, 7);
  const y = k * x + d;
  const a = r.intNot(-4, 4, 0);
  const b = r.intNot(-3, 3, 0);
  need(a + b * k !== 0 && Math.abs(y) <= 20);
  const c = a * x + b * y;
  const askX = r.bool();
  const v = askX ? x : y;
  return mc({
    title: 'Metoda podstawiania',
    q: T`Para liczb $x$, $y$ jest rozwiązaniem układu równań $${sys(`y = ${lin(k, d)}`, eq(a, b, c))}$ Wtedy $${askX ? 'x' : 'y'}$ jest równe`,
    ok: m(v),
    val: v,
    bad: [m(askX ? y : x), m(-v === v ? 1 : -v), m(v + 1), m(v - 1), m(v + k)],
    steps: [
      T`Podstawiamy $y = ${lin(k, d)}$ do drugiego równania: $${a === 1 ? '' : a === -1 ? '-' : a}x ${b > 0 ? '+' : '-'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}(${lin(k, d)}) = ${c}$.`,
      T`Po uproszczeniu: $${lin(a + b * k, 0)} = ${c - b * d}$, więc $x = ${x}$.`,
      T`$y = ${k} \cdot ${par(x)} ${d >= 0 ? '+' : '-'} ${Math.abs(d)} = ${y}$.`
    ],
    trap: T`Podstawiane wyrażenie weź w nawias – liczba stojąca przed $y$ mnoży oba jego składniki.`,
    tip: 'Gdy jedno równanie ma postać $y = \\ldots$, metoda podstawiania jest najszybsza.'
  });
};
const sysOppositeCoefficients = (r) => {
  const x = r.intNot(-6, 6, 0);
  const y = r.intNot(-6, 6, 0);
  const a1 = r.int(1, 4);
  const a2 = r.int(1, 4);
  const b = r.int(1, 5);
  const c1 = a1 * x + b * y;
  const c2 = a2 * x - b * y;
  return mc({
    title: 'Metoda przeciwnych współczynników',
    q: T`Po dodaniu stronami równań układu $${sys(eq(a1, b, c1), eq(a2, -b, c2))}$ otrzymujemy równanie`,
    ok: m(`${a1 + a2}x = ${c1 + c2}`),
    bad: [m(`${a1 + a2}x = ${c1 - c2}`), m(`${Math.abs(a1 - a2) > 1 ? Math.abs(a1 - a2) : a1 + a2 + 1}x = ${c1 + c2}`), m(`${a1 + a2}x ${2 * b > 0 ? '+' : '-'} ${2 * b}y = ${c1 + c2}`), m(`${a1 * a2}x = ${c1 + c2}`), m(`${a1 + a2}x = ${c1 + c2 + 1}`)],
    steps: [T`Dodajemy lewe strony: $${a1 === 1 ? '' : a1}x + ${a2 === 1 ? '' : a2}x = ${a1 + a2}x$, a $${b === 1 ? '' : b}y - ${b === 1 ? '' : b}y = 0$.`, T`Dodajemy prawe strony: $${c1} + ${par(c2)} = ${c1 + c2}$.`, T`Otrzymujemy $${a1 + a2}x = ${c1 + c2}$, czyli $x = ${x}$.`],
    trap: T`Współczynniki przy $y$ są przeciwne, więc przy dodawaniu $y$ znika. Prawe strony też trzeba dodać – z uwzględnieniem znaków.`,
    tip: 'Metoda przeciwnych współczynników: doprowadź do sytuacji, w której przy jednej niewiadomej stoją liczby przeciwne, i dodaj równania stronami.'
  });
};

// ---------- 5.4 Interpretacja geometryczna układu ----------
const sysCount = (r) => {
  const a = r.intNot(-4, 4, 0);
  const b = r.intNot(-4, 4, 0);
  const c = r.int(-9, 9);
  const k = r.pick([2, 3, -1, -2]);
  const kind = r.int(0, 2);
  const [a2, b2, c2] = kind === 0 ? [k * a, k * b, k * c + r.intNot(-5, 5, 0)] : kind === 1 ? [k * a, k * b, k * c] : [k * a, k * b + r.intNot(-3, 3, 0), c];
  need(b2 !== 0 && (kind !== 2 || a * b2 - a2 * b !== 0));
  const opts = ['nie ma rozwiązań', 'ma dokładnie jedno rozwiązanie', 'ma nieskończenie wiele rozwiązań', 'ma dokładnie dwa rozwiązania'];
  const ans = [opts[0], opts[2], opts[1]][kind];
  return mc({
    title: 'Liczba rozwiązań układu równań',
    q: T`Układ równań $${sys(eq(a, b, c), eq(a2, b2, c2))}$`,
    ok: ans,
    bad: opts.filter((x) => x !== ans),
    steps:
      kind === 2
        ? [T`Współczynniki przy $x$ i $y$ nie są proporcjonalne: $${a} \cdot ${par(b2)} \neq ${par(a2)} \cdot ${par(b)}$.`, T`Proste przecinają się w jednym punkcie – układ jest oznaczony i ma jedno rozwiązanie.`]
        : [T`Mnożymy pierwsze równanie przez $${k}$: $${eq(k * a, k * b, k * c)}$.`, kind === 0 ? T`Lewa strona jest taka sama jak w drugim równaniu, ale prawa inna ($${k * c} \neq ${c2}$). Proste są równoległe i różne – układ sprzeczny.` : T`Otrzymaliśmy dokładnie drugie równanie. Oba równania opisują tę samą prostą – układ nieoznaczony.`],
    trap: T`Układ dwóch równań liniowych nigdy nie ma dokładnie dwóch rozwiązań: dwie proste mają 0, 1 albo nieskończenie wiele punktów wspólnych.`,
    tip: 'Proste przecinające się – 1 rozwiązanie. Równoległe różne – 0. Pokrywające się – nieskończenie wiele.'
  });
};
const sysParamNoSolution = (r) => {
  const a = r.intNot(-5, 5, 0);
  const b = r.int(-8, 8);
  const k = r.pick([1, 2, 3]);
  const c = r.intNot(-6, 6, 0);
  const d = r.intNot(-8, 8, b);
  // y = ax + b ; y = (k m + c) x + d  -> brak rozwiązań gdy k m + c = a
  need((a - c) % k === 0);
  const mm = (a - c) / k;
  const coef = `${k === 1 ? '' : k}m ${c > 0 ? '+' : '-'} ${Math.abs(c)}`;
  return mc({
    title: 'Układ sprzeczny z parametrem',
    q: T`Układ równań $${sys(`y = ${lin(a, b)}`, `y = (${coef})x ${d >= 0 ? '+' : '-'} ${Math.abs(d)}`)}$ nie ma rozwiązań dla`,
    ok: m(`m = ${mm}`),
    bad: [m(`m = ${-mm === mm ? mm + 1 : -mm}`), m(`m = ${fr(a + c, k)}`), m(`m = ${a}`), m(`m = ${fr(-1 - a * c, a * k)}`), m(`m = ${mm + 1}`)],
    steps: [T`Układ nie ma rozwiązań, gdy proste są równoległe i różne, czyli mają równe współczynniki kierunkowe i różne wyrazy wolne.`, T`$${coef} = ${a}$, stąd ${k === 1 ? '' : `$${k}m = ${a - c}$ i `}$m = ${mm}$.`, T`Wyrazy wolne są różne ($${b} \neq ${d}$), więc proste się nie pokrywają.`],
    trap: T`Równe współczynniki kierunkowe to dopiero połowa warunku. Gdyby wyrazy wolne też były równe, rozwiązań byłoby nieskończenie wiele.`,
    tip: 'Układ $y = a_1x + b_1$, $y = a_2x + b_2$ jest sprzeczny, gdy $a_1 = a_2$ i $b_1 \\neq b_2$.'
  });
};
const sysIntersection = (r) => {
  const x = r.intNot(-5, 5, 0);
  const a1 = r.intNot(-4, 4, 0);
  const a2 = r.intNot(-4, 4, 0, a1);
  const y = r.int(-7, 7);
  const b1 = y - a1 * x;
  const b2 = y - a2 * x;
  return mc({
    title: 'Punkt przecięcia dwóch prostych',
    q: T`Proste o równaniach $y = ${lin(a1, b1)}$ oraz $y = ${lin(a2, b2)}$ przecinają się w punkcie`,
    ok: P(x, y),
    bad: [P(y, x), P(-x, y), P(x, -y), P(-x, -y), P(x, b1), P(0, b1)].filter((o) => o !== P(x, y)),
    steps: [T`Przyrównujemy prawe strony: $${lin(a1, b1)} = ${lin(a2, b2)}$.`, (a1 - a2 === 1 ? T`Po przeniesieniu wyrazów: $x = ${x}$.` : T`$${lin(a1 - a2, 0)} = ${b2 - b1}$, więc $x = ${x}$.`), T`$y = ${a1} \cdot ${par(x)} ${b1 >= 0 ? '+' : '-'} ${Math.abs(b1)} = ${y}$. Punkt przecięcia: $(${x}, ${y})$.`],
    trap: T`Punkt przecięcia musi leżeć na obu prostych – sprawdź współrzędne także w drugim równaniu.`,
    tip: 'Punkt przecięcia prostych to rozwiązanie układu złożonego z ich równań.'
  });
};
const sysGeometryStatements = (r) => {
  const a = r.intNot(-4, 4, 0);
  const b = r.int(-6, 6);
  const same = r.bool();
  const a2 = same ? a : r.intNot(-4, 4, 0, a);
  const b2 = r.intNot(-6, 6, b);
  const x0 = r.intNot(-3, 3, 0);
  const s1True = !same;
  const onFirst = r.bool();
  const py = onFirst ? a * x0 + b : a * x0 + b + r.intNot(-3, 3, 0);
  return pf({
    title: 'Prawda czy fałsz: proste i układ równań',
    q: T`Dany jest układ równań $${sys(`y = ${lin(a, b)}`, `y = ${lin(a2, b2)}`)}$`,
    s1: [T`Układ ma dokładnie jedno rozwiązanie.`, s1True, same ? T`obie proste mają współczynnik kierunkowy $${a}$ i różne wyrazy wolne, więc są równoległe i nie mają punktów wspólnych. Zdanie jest fałszywe.` : T`współczynniki kierunkowe są różne ($${a} \neq ${a2}$), więc proste przecinają się w jednym punkcie. Zdanie jest prawdziwe.`],
    s2: [T`Punkt $(${x0}, ${py})$ należy do prostej o równaniu $y = ${lin(a, b)}$.`, onFirst, T`$${a} \cdot ${par(x0)} ${b >= 0 ? '+' : '-'} ${Math.abs(b)} = ${a * x0 + b}$, a druga współrzędna punktu to $${py}$. Zdanie jest ${onFirst ? 'prawdziwe' : 'fałszywe'}.`],
    trap: 'O liczbie rozwiązań układu decydują współczynniki kierunkowe prostych: różne – jedno rozwiązanie, równe – zero albo nieskończenie wiele.',
    tip: 'Każde równanie układu to jedna prosta. Rozwiązanie układu to ich punkt wspólny.'
  });
};

// ---------- 5.5 Zadania tekstowe prowadzące do układu równań ----------
const wordTickets = (r) => {
  const n = r.int(4, 12);
  const u = r.int(1, n - 1);
  const pn = r.pick([20, 24, 30, 36, 40]);
  const pu = pn / 2 + r.pick([0, 2, 4]);
  need(pu < pn);
  const total = (n - u) * pn + u * pu;
  const askU = r.bool();
  return num({
    title: 'Bilety normalne i ulgowe',
    q: T`Grupa $${n}$ osób kupiła bilety do kina. Bilet normalny kosztuje $${pn}$ zł, a ulgowy $${pu}$ zł. Za wszystkie bilety zapłacono łącznie $${total}$ zł. Ile biletów ${askU ? 'ulgowych' : 'normalnych'} kupiła ta grupa? Wpisz liczbę.`,
    ans: askU ? u : n - u,
    steps: [
      T`Oznaczamy: $x$ – liczba biletów normalnych, $y$ – liczba biletów ulgowych. Układ: $x + y = ${n}$ oraz $${pn}x + ${pu}y = ${total}$.`,
      T`Z pierwszego równania $x = ${n} - y$. Podstawiamy: $${pn}(${n} - y) + ${pu}y = ${total}$, czyli $${pn * n} - ${pn - pu}y = ${total}$.`,
      T`$y = ${u}$, $x = ${n - u}$.`
    ],
    trap: T`Jedno równanie opisuje liczbę osób, drugie – pieniądze. Nie mieszaj złotych z liczbą biletów w jednym równaniu.`,
    tip: 'Dwie niewiadome – dwa równania. Zawsze zapisz, co oznacza $x$, a co $y$.'
  });
};
const wordSumDiff = (r) => {
  const y = r.int(3, 40);
  const d = r.int(2, 25);
  const x = y + d;
  const askBig = r.bool();
  return num({
    title: 'Suma i różnica dwóch liczb',
    q: T`Suma dwóch liczb jest równa $${x + y}$, a ich różnica jest równa $${d}$. Wyznacz ${askBig ? 'większą' : 'mniejszą'} z tych liczb. Wpisz liczbę.`,
    ans: askBig ? x : y,
    steps: [T`Układ: $x + y = ${x + y}$ oraz $x - y = ${d}$.`, T`Dodajemy równania stronami: $2x = ${x + y + d}$, więc $x = ${x}$.`, T`$y = ${x + y} - ${x} = ${y}$.`],
    trap: T`Pytanie dotyczy ${askBig ? 'większej' : 'mniejszej'} liczby – po rozwiązaniu układu sprawdź, którą wpisujesz.`,
    tip: 'Suma i różnica: dodanie równań stronami od razu daje $2x$.'
  });
};
const wordCoins = (r) => {
  const a = r.int(2, 15);
  const b = r.int(2, 15);
  const [v1, v2] = r.pick([[2, 5], [1, 5], [1, 2]]);
  const total = a * v1 + b * v2;
  const askFirst = r.bool();
  return num({
    title: 'Monety w skarbonce',
    q: T`W skarbonce jest $${a + b}$ monet: tylko ${v1 === 1 ? 'jednozłotowe' : 'dwuzłotowe'} i ${v2 === 5 ? 'pięciozłotowe' : 'dwuzłotowe'}. Łączna wartość tych monet to $${total}$ zł. Ile monet ${askFirst ? (v1 === 1 ? 'jednozłotowych' : 'dwuzłotowych') : v2 === 5 ? 'pięciozłotowych' : 'dwuzłotowych'} jest w skarbonce? Wpisz liczbę.`,
    ans: askFirst ? a : b,
    steps: [
      T`$x$ – liczba monet o nominale $${v1}$ zł, $y$ – liczba monet o nominale $${v2}$ zł. Układ: $x + y = ${a + b}$ oraz $${v1 === 1 ? '' : v1}x + ${v2}y = ${total}$.`,
      T`$x = ${a + b} - y$, więc $${v1 === 1 ? '' : v1 + ' \\cdot '}(${a + b} - y) + ${v2}y = ${total}$, czyli $${v1 * (a + b)} + ${v2 - v1 === 1 ? '' : v2 - v1}y = ${total}$.`,
      T`$y = ${b}$, $x = ${a}$.`
    ],
    trap: T`Liczba monet i ich wartość to dwie różne wielkości – każda dostaje własne równanie.`,
    tip: 'Dwie niewiadome – dwa równania. Zawsze zapisz, co oznacza $x$, a co $y$.'
  });
};
const wordModel = (r) => {
  const ctx = r.pick([
    ['W dwóch klasach jest łącznie', 'uczniów', 'W klasie A jest o', 'uczniów więcej niż w klasie B', 'liczbę uczniów klasy A', 'liczbę uczniów klasy B'],
    ['W dwóch sadach posadzono łącznie', 'drzew', 'W pierwszym sadzie posadzono o', 'drzew więcej niż w drugim', 'liczbę drzew w pierwszym sadzie', 'liczbę drzew w drugim sadzie'],
    ['Na dwóch półkach stoi łącznie', 'książek', 'Na górnej półce stoi o', 'książek więcej niż na dolnej', 'liczbę książek na górnej półce', 'liczbę książek na dolnej półce'],
    ['Dwie drużyny zdobyły łącznie', 'punktów', 'Pierwsza drużyna zdobyła o', 'punktów więcej niż druga', 'liczbę punktów pierwszej drużyny', 'liczbę punktów drugiej drużyny']
  ]);
  const y = r.int(11, 60);
  const d = r.int(2, 9);
  const s = 2 * y + d;
  return mc({
    title: 'Układ równań opisujący sytuację',
    q: T`${ctx[0]} $${s}$ ${ctx[1]}. ${ctx[2]} $${d}$ ${ctx[3]}. Przez $x$ oznaczono ${ctx[4]}, a przez $y$ – ${ctx[5]}. Sytuację tę opisuje układ równań`,
    ok: m(sys(`x + y = ${s}`, `x = y + ${d}`)),
    bad: [m(sys(`x + y = ${s}`, `y = x + ${d}`)), m(sys(`x + y = ${s}`, `x + ${d} = y`)), m(sys(`x - y = ${s}`, `x = y + ${d}`)), m(sys(`x + y = ${d}`, `x = y + ${s}`))],
    steps: [T`Łączna liczba: $x + y = ${s}$.`, T`„$x$ jest o $${d}$ większe od $y$” zapisujemy jako $x = y + ${d}$ (do mniejszej liczby dodajemy, by otrzymać większą).`],
    trap: T`„O $${d}$ więcej” dopisujesz po stronie mniejszej wielkości: $x = y + ${d}$, a nie $x + ${d} = y$.`,
    tip: 'Sprawdź zapis liczbami: jeśli $y = 10$, to $x$ ma wyjść większe – wtedy równanie jest dobrze ułożone.'
  });
};
const wordPrices = (r) => {
  const p1 = r.int(2, 9);
  const p2 = r.intNot(2, 9, p1);
  const a1 = r.int(1, 4);
  const b1 = r.int(1, 4);
  const a2 = r.int(1, 4);
  const b2 = r.int(1, 4);
  need(a1 * b2 - a2 * b1 !== 0);
  const items = r.pick([['zeszyty', 'długopisy', 'zeszyt', 'długopis'], ['bułki', 'rogale', 'bułka', 'rogal'], ['kawy', 'herbaty', 'kawa', 'herbata']]);
  const pl = (n, w) => {
    const forms = { zeszyty: ['zeszyt', 'zeszyty'], długopisy: ['długopis', 'długopisy'], bułki: ['bułkę', 'bułki'], rogale: ['rogal', 'rogale'], kawy: ['kawę', 'kawy'], herbaty: ['herbatę', 'herbaty'] }[w];
    return `$${n}$ ${n === 1 ? forms[0] : forms[1]}`;
  };
  const askFirst = r.bool();
  return num({
    title: 'Ceny dwóch towarów',
    q: T`Za ${pl(a1, items[0])} i ${pl(b1, items[1])} zapłacono $${a1 * p1 + b1 * p2}$ zł, a za ${pl(a2, items[0])} i ${pl(b2, items[1])} zapłacono $${a2 * p1 + b2 * p2}$ zł. Ile złotych kosztuje jeden ${askFirst ? items[2] : items[3]}? Wpisz liczbę.`.replace('jeden bułka', 'jedna bułka').replace('jeden kawa', 'jedna kawa').replace('jeden herbata', 'jedna herbata'),
    ans: askFirst ? p1 : p2,
    steps: [
      T`$x$ – cena pierwszego towaru, $y$ – cena drugiego. Układ: $${eq(a1, b1, a1 * p1 + b1 * p2)}$ oraz $${eq(a2, b2, a2 * p1 + b2 * p2)}$.`,
      T`Rozwiązujemy układ metodą przeciwnych współczynników: $x = ${p1}$, $y = ${p2}$.`,
      T`Sprawdzenie: $${a1} \cdot ${p1} + ${b1} \cdot ${p2} = ${a1 * p1 + b1 * p2}$ oraz $${a2} \cdot ${p1} + ${b2} \cdot ${p2} = ${a2 * p1 + b2 * p2}$.`
    ],
    trap: T`Każde zdanie zadania to osobne równanie. Zachowaj tę samą kolejność niewiadomych w obu równaniach.`,
    tip: 'Dwie niewiadome – dwa równania. Zawsze zapisz, co oznacza $x$, a co $y$.'
  });
};

export default {
  numericId: 5,
  title: 'Funkcja liniowa i układy równań',
  short_title: 'Funkcja liniowa i układy',
  description: 'Współczynniki i wzór funkcji liniowej, układy równań liniowych, ich interpretacja geometryczna i zadania tekstowe.',
  icon: 'TrendingUp',
  color: '#A78BFA',
  matura_points_range: '3–6 pkt',
  importance: 'HIGH',
  cke_formula_page: 'str. 21–22',
  lessons: [
    {
      title: 'Funkcja liniowa: współczynnik kierunkowy, wyraz wolny i miejsce zerowe',
      short_title: 'Współczynniki a i b',
      pill: pill({
        essence: T`Funkcja liniowa ma wzór $f(x) = ax + b$, a jej wykresem jest prosta. Współczynnik kierunkowy $a$ mówi, o ile zmienia się wartość funkcji, gdy argument rośnie o $1$: dla $a > 0$ funkcja rośnie, dla $a < 0$ maleje, dla $a = 0$ jest stała. Wyraz wolny $b$ to wartość $f(0)$ – wykres przecina oś $Oy$ w punkcie $(0, b)$. Miejsce zerowe to $x_0 = -\frac{b}{a}$.`,
        context: 'Zadania 10–14 w arkuszu • 1 pkt. Funkcja liniowa jest w każdym arkuszu.',
        pl: T`Wzór $f(x) = 2x + 3$ to taksówka: $3$ zł za trzaśnięcie drzwiami (to $b$, opłata na starcie) i $2$ zł za każdy kilometr (to $a$, tempo wzrostu). Ujemne $a$ to zjazd – z każdym krokiem w prawo jesteś niżej.`,
        steps: [
          ['Odczytaj a i b ze wzoru', T`$f(x) = -3x + 6$: $a = -3$, $b = 6$.`, 'Znak należy do współczynnika.'],
          ['Ustal monotoniczność', T`$a = -3 < 0$, więc funkcja jest malejąca.`, T`Wyraz wolny $b$ nie ma tu nic do rzeczy.`],
          ['Policz miejsce zerowe', T`$-3x + 6 = 0$, $x = 2$.`, T`Wzorem: $x_0 = -\frac{b}{a} = -\frac{6}{-3} = 2$.`]
        ],
        formulas: [
          ['Funkcja liniowa', T`f(x) = ax + b`],
          ['Miejsce zerowe', T`x_0 = -\frac{b}{a} \quad (a \neq 0)`],
          ['Przecięcie z osią Oy', T`(0, b)`]
        ],
        examples: [
          ['Monotoniczność z parametrem', '1 pkt', T`Dla jakich $m$ funkcja $f(x) = (2m - 6)x + 1$ jest rosnąca?`, T`1. Funkcja rośnie, gdy $2m - 6 > 0$.` + '\n' + T`2. $2m > 6$, czyli $m > 3$.`, 'Cały nawias przy x musi być dodatni.'],
          ['Wspólne miejsce zerowe', '1 pkt', T`Funkcje $f(x) = 3x + 6$ i $g(x) = ax + 7$ mają to samo miejsce zerowe. Oblicz $a$.`, T`1. $3x + 6 = 0$ daje $x = -2$.` + '\n' + T`2. $g(-2) = 0$: $-2a + 7 = 0$.` + '\n' + T`3. $a = \frac{7}{2}$.`, 'Miejsce zerowe jednej funkcji wstaw do drugiej.']
        ],
        trap: T`O tym, czy funkcja liniowa rośnie, decyduje WYŁĄCZNIE znak $a$. Wyraz wolny $b$ przesuwa wykres w górę lub w dół, ale nie zmienia nachylenia.`,
        fail: T`„$f(x) = -2x + 5$ jest rosnąca, bo $5 > 0$.”`,
        win: T`$a = -2 < 0$, więc funkcja jest malejąca.`,
        why: 'Współczynnik a to przyrost wartości na jednostkę argumentu – ujemny oznacza spadek.',
        ckeTip: 'W zadaniu z parametrem zapisz warunek słownie („rosnąca, czyli a > 0”), dopiero potem rozwiązuj nierówność.',
        points: [T`$a > 0$ – rosnąca, $a < 0$ – malejąca, $a = 0$ – stała.`, T`Wykres przecina oś $Oy$ w punkcie $(0, b)$.`, T`Miejsce zerowe: $x_0 = -\frac{b}{a}$.`]
      }),
      gens: [linMonotonicParam, linZero, linIntercepts, linSigns, linSameZero]
    },
    {
      title: 'Wyznaczanie wzoru funkcji liniowej',
      short_title: 'Wzór funkcji liniowej',
      pill: pill({
        essence: T`Żeby zapisać wzór funkcji liniowej $f(x) = ax + b$, potrzebujesz dwóch informacji – najczęściej dwóch punktów wykresu. Najpierw liczysz współczynnik kierunkowy $a = \frac{y_2 - y_1}{x_2 - x_1}$, potem podstawiasz jeden z punktów i wyznaczasz $b$. Informacja „miejscem zerowym jest $x_0$” to po prostu punkt $(x_0, 0)$, a „wykres równoległy do…” daje od razu współczynnik $a$.`,
        context: 'Zadania 11–14 w arkuszu • 1 pkt oraz element zadań z geometrii analitycznej.',
        pl: T`Współczynnik $a$ to „ile w górę na jeden krok w prawo”. Z punktu $(1, 2)$ do punktu $(3, 8)$ idziesz $2$ kroki w prawo i $6$ w górę, więc $a = 6 : 2 = 3$. Potem pytasz: gdzie byłem na starcie, czyli dla $x = 0$? To jest $b$.`,
        steps: [
          ['Policz a', T`Dla $A = (1, 2)$, $B = (3, 8)$: $a = \frac{8 - 2}{3 - 1} = 3$.`, 'Ta sama kolejność punktów w liczniku i mianowniku.'],
          ['Wyznacz b', T`Podstaw $A$: $2 = 3 \cdot 1 + b$, więc $b = -1$.`, 'Możesz użyć dowolnego z dwóch punktów.'],
          ['Zapisz wzór i sprawdź', T`$f(x) = 3x - 1$. Kontrola: $f(3) = 8$ – zgadza się.`, 'Drugi punkt służy do sprawdzenia.']
        ],
        formulas: [
          ['Współczynnik kierunkowy', T`a = \frac{y_2 - y_1}{x_2 - x_1}`, 22],
          ['Wyraz wolny', T`b = y_1 - a \cdot x_1`],
          ['Wykresy równoległe', T`a_1 = a_2`, 22]
        ],
        examples: [
          ['Z miejsca zerowego', '1 pkt', T`Miejscem zerowym funkcji liniowej $f$ jest $1$, a jej wykres przechodzi przez punkt $(-1, 4)$. Wyznacz wzór.`, T`1. Punkty: $(1, 0)$ i $(-1, 4)$.` + '\n' + T`2. $a = \frac{4 - 0}{-1 - 1} = -2$.` + '\n' + T`3. $0 = -2 \cdot 1 + b$, więc $b = 2$.` + '\n' + T`4. $f(x) = -2x + 2$.`, 'Miejsce zerowe to gotowy punkt na osi Ox.'],
          ['Wykres równoległy', '1 pkt', T`Wykres funkcji $g$ jest równoległy do wykresu $f(x) = 2x - 5$ i przechodzi przez $(3, 1)$. Wyznacz wzór $g$.`, T`1. $a = 2$.` + '\n' + T`2. $1 = 2 \cdot 3 + b$, więc $b = -5 + 0 = -5$.` + '\n' + T`3. $g(x) = 2x - 5$ – ten sam wzór, czyli punkt leży na wykresie $f$.`, 'Gdyby punkt leżał poza prostą, wyraz wolny wyszedłby inny.']
        ],
        trap: T`We wzorze na $a$ różnica $y$ jest w LICZNIKU, a różnica $x$ w MIANOWNIKU. Odwrócenie ułamka to najczęstszy błąd.`,
        fail: T`$a = \frac{x_2 - x_1}{y_2 - y_1}$.`,
        win: T`$a = \frac{y_2 - y_1}{x_2 - x_1}$ – „pion przez poziom”.`,
        why: 'Współczynnik kierunkowy mierzy zmianę wartości (y) przypadającą na jednostkę argumentu (x).',
        ckeTip: 'Po wyznaczeniu wzoru zawsze podstaw drugi punkt – 10 sekund i masz pewność.',
        points: [T`Dwa punkty wystarczą do wyznaczenia wzoru.`, T`$a$ to „pion przez poziom”.`, T`Równoległość daje to samo $a$.`]
      }),
      gens: [linFromTwoPoints, linSlope, linFromZeroAndPoint, linThirdValue, linParallelThrough]
    },
    {
      title: 'Układy równań liniowych: podstawianie i przeciwne współczynniki',
      short_title: 'Układy równań',
      pill: pill({
        essence: T`Układ dwóch równań z dwiema niewiadomymi rozwiązujesz jedną z dwóch metod. Podstawianie: z jednego równania wyznaczasz niewiadomą i wstawiasz do drugiego. Przeciwne współczynniki: mnożysz równania tak, żeby przy jednej niewiadomej stały liczby przeciwne, i dodajesz równania stronami – ta niewiadoma znika. Rozwiązaniem jest para liczb spełniająca oba równania jednocześnie.`,
        context: 'Zadania 8–12 w arkuszu • 1 pkt oraz narzędzie w zadaniach tekstowych i geometrii analitycznej.',
        pl: T`Masz dwie zagadki o tych samych dwóch liczbach. Sama pierwsza zagadka ma mnóstwo rozwiązań, sama druga też. Szukasz jedynej pary, która pasuje do obu naraz.`,
        steps: [
          ['Wybierz metodę', T`Jest równanie typu $y = \ldots$? Podstawiaj. Współczynniki przy $y$ to np. $3$ i $-3$? Dodawaj stronami.`, 'Dobra metoda oszczędza połowę rachunków.'],
          ['Wyznacz pierwszą niewiadomą', T`$\begin{cases} 2x + y = 7 \\ 3x - y = 3 \end{cases}$ – dodajemy: $5x = 10$, $x = 2$.`, 'Dodajesz lewe strony i prawe strony.'],
          ['Wyznacz drugą i sprawdź', T`$2 \cdot 2 + y = 7$, $y = 3$. Sprawdzenie w drugim: $6 - 3 = 3$.`, 'Para musi spełniać oba równania.']
        ],
        formulas: [
          ['Układ równań', T`\begin{cases} a_1x + b_1y = c_1 \\ a_2x + b_2y = c_2 \end{cases}`],
          ['Rozwiązanie', T`\text{para } (x, y) \text{ spełniająca oba równania}`]
        ],
        examples: [
          ['Przeciwne współczynniki', '1 pkt', T`Rozwiąż układ $\begin{cases} 3x + 2y = 12 \\ x - 2y = -4 \end{cases}$`, T`1. Dodajemy stronami: $4x = 8$, $x = 2$.` + '\n' + T`2. $2 - 2y = -4$, $y = 3$.`, 'Przy y stoją 2 i −2, więc y znika.'],
          ['Podstawianie', '1 pkt', T`Rozwiąż układ $\begin{cases} y = 2x - 1 \\ 3x + y = 9 \end{cases}$`, T`1. $3x + (2x - 1) = 9$.` + '\n' + T`2. $5x = 10$, $x = 2$.` + '\n' + T`3. $y = 2 \cdot 2 - 1 = 3$.`, 'Podstawiane wyrażenie zawsze w nawiasie.']
        ],
        trap: T`Mnożąc równanie przez liczbę, mnożysz WSZYSTKO – także prawą stronę. $x + 2y = 5$ razy $3$ to $3x + 6y = 15$, a nie $3x + 6y = 5$.`,
        fail: T`$x + 2y = 5 \ |\cdot 3$ daje $3x + 6y = 5$.`,
        win: T`$x + 2y = 5 \ |\cdot 3$ daje $3x + 6y = 15$.`,
        why: 'Równanie to równowaga – jeśli potroisz jedną szalkę, musisz potroić drugą.',
        ckeTip: 'W zadaniu zamkniętym często szybciej jest podstawić podane pary do obu równań niż rozwiązywać układ.',
        points: [T`Rozwiązanie układu to para liczb.`, T`Równanie $y = \ldots$ – podstawiaj. Liczby przeciwne – dodawaj stronami.`, T`Zawsze sprawdź parę w obu równaniach.`]
      }),
      gens: [sysSolve, sysExpression, sysSubstitution, sysOppositeCoefficients]
    },
    {
      title: 'Interpretacja geometryczna układu równań',
      short_title: 'Układ równań a proste',
      pill: pill({
        essence: T`Każde równanie liniowe z dwiema niewiadomymi opisuje prostą, więc układ dwóch równań to pytanie o punkty wspólne dwóch prostych. Proste przecinające się mają jeden punkt wspólny – układ oznaczony (jedno rozwiązanie). Proste równoległe i różne nie mają punktów wspólnych – układ sprzeczny (brak rozwiązań). Proste pokrywające się mają wszystkie punkty wspólne – układ nieoznaczony (nieskończenie wiele rozwiązań).`,
        context: 'Zadania 9–13 w arkuszu • 1 pkt, często z rysunkiem prostych w układzie współrzędnych.',
        pl: T`Dwie drogi na mapie. Krzyżują się – jedno skrzyżowanie, jedno rozwiązanie. Biegną równolegle – nigdy się nie spotkają, zero rozwiązań. To ta sama droga narysowana dwa razy – spotykają się wszędzie.`,
        steps: [
          ['Doprowadź równania do postaci y = ax + b', T`$2x + y = 5$ zamień na $y = -2x + 5$.`, 'Wtedy od razu widać współczynnik kierunkowy.'],
          ['Porównaj współczynniki kierunkowe', T`Różne $a$ – proste się przecinają, jedno rozwiązanie.`, 'To najczęstszy przypadek.'],
          ['Gdy a są równe, porównaj b', T`Różne $b$ – brak rozwiązań. Równe $b$ – nieskończenie wiele.`, 'Równe a to proste równoległe lub ta sama prosta.']
        ],
        formulas: [
          ['Układ oznaczony', T`a_1 \neq a_2 \quad \text{(jedno rozwiązanie)}`],
          ['Układ sprzeczny', T`a_1 = a_2, \ b_1 \neq b_2 \quad \text{(brak rozwiązań)}`],
          ['Układ nieoznaczony', T`a_1 = a_2, \ b_1 = b_2 \quad \text{(nieskończenie wiele)}`]
        ],
        examples: [
          ['Liczba rozwiązań', '1 pkt', T`Ile rozwiązań ma układ $\begin{cases} 2x - y = 3 \\ 4x - 2y = 10 \end{cases}$?`, T`1. Pierwsze równanie razy $2$: $4x - 2y = 6$.` + '\n' + T`2. Lewa strona jak w drugim równaniu, prawa inna ($6 \neq 10$).` + '\n' + T`3. Układ sprzeczny – brak rozwiązań.`, 'Proste równoległe i różne.'],
          ['Punkt przecięcia', '1 pkt', T`W jakim punkcie przecinają się proste $y = 2x - 1$ i $y = -x + 5$?`, T`1. $2x - 1 = -x + 5$.` + '\n' + T`2. $3x = 6$, $x = 2$.` + '\n' + T`3. $y = 3$. Punkt $(2, 3)$.`, 'Przyrównaj prawe strony.']
        ],
        trap: T`Układ dwóch równań liniowych NIGDY nie ma dokładnie dwóch rozwiązań. Możliwe są tylko trzy sytuacje: 0, 1 albo nieskończenie wiele.`,
        fail: T`„Dwa równania, dwie niewiadome, więc dwa rozwiązania.”`,
        win: T`Jedno rozwiązanie układu to jedna para liczb $(x, y)$ – jeden punkt przecięcia.`,
        why: 'Dwie różne proste mogą mieć najwyżej jeden punkt wspólny.',
        ckeTip: 'Jeśli w zadaniu jest rysunek, rozwiązanie układu odczytasz z niego jako współrzędne punktu przecięcia prostych.',
        points: [T`Rozwiązanie układu to punkt przecięcia prostych.`, T`Te same $a$, różne $b$ – układ sprzeczny.`, T`Te same $a$ i $b$ – układ nieoznaczony.`]
      }),
      gens: [sysCount, sysParamNoSolution, sysIntersection, sysGeometryStatements]
    },
    {
      title: 'Zadania tekstowe prowadzące do układu równań',
      short_title: 'Zadania tekstowe',
      time: '~6 min',
      pill: pill({
        essence: T`W zadaniu tekstowym z dwiema nieznanymi wielkościami układasz dwa równania – każde opisuje inną informację z treści. Zaczynasz od zapisania, co oznaczają $x$ i $y$ (z jednostkami!). Typowy schemat to „ile sztuk razem” plus „ile to kosztuje razem” albo „suma” plus „różnica”. Na końcu sprawdzasz, czy wynik ma sens w realiach zadania.`,
        context: 'Zadania 8–12 w arkuszu • 1–2 pkt. Kontekst praktyczny: ceny, bilety, sady, wiek.',
        pl: T`Treść zadania to dwie wskazówki o dwóch tajemniczych liczbach. Twoja robota to przetłumaczyć każde zdanie z polskiego na matematyczny. „Razem jest ich 12” to $x + y = 12$. „Zapłacono 300 zł” to cena razy liczba, plus cena razy liczba, równa się 300.`,
        steps: [
          ['Nazwij niewiadome', T`$x$ – liczba biletów normalnych, $y$ – liczba biletów ulgowych.`, 'Zapisz to zdaniem – to porządkuje rozwiązanie.'],
          ['Ułóż dwa równania', T`$x + y = 12$ (osoby) oraz $30x + 18y = 300$ (złote).`, 'Jedno równanie – jedna informacja.'],
          ['Rozwiąż i sprawdź z treścią', T`$x = 7$, $y = 5$. Kontrola: $7 \cdot 30 + 5 \cdot 18 = 300$.`, 'Liczba biletów nie może być ujemna ani ułamkowa.']
        ],
        formulas: [
          ['Równanie „ile sztuk”', T`x + y = n`],
          ['Równanie „ile kosztuje”', T`p_1 \cdot x + p_2 \cdot y = S`],
          ['„x jest o d większe od y”', T`x = y + d`]
        ],
        examples: [
          ['Bilety', '2 pkt', T`$10$ osób kupiło bilety: normalne po $24$ zł i ulgowe po $14$ zł. Zapłacono $200$ zł. Ile było biletów ulgowych?`, T`1. $x + y = 10$, $24x + 14y = 200$.` + '\n' + T`2. $x = 10 - y$: $240 - 24y + 14y = 200$.` + '\n' + T`3. $-10y = -40$, $y = 4$.`, 'Cztery bilety ulgowe i sześć normalnych.'],
          ['Sady', '1 pkt', T`W dwóch sadach rośnie razem $1960$ drzew, w pierwszym o $120$ więcej niż w drugim. Ile drzew jest w drugim sadzie?`, T`1. $x + y = 1960$, $x = y + 120$.` + '\n' + T`2. $2y + 120 = 1960$.` + '\n' + T`3. $y = 920$.`, 'Większa wielkość = mniejsza + różnica.']
        ],
        trap: T`„$x$ jest o 5 większe od $y$” to $x = y + 5$, a nie $x + 5 = y$. Piątkę dopisujesz do MNIEJSZEJ liczby.`,
        fail: T`„W klasie A jest o 4 uczniów więcej niż w B”: $x + 4 = y$.`,
        win: T`$x = y + 4$ (klasa A to klasa B powiększona o 4).`,
        why: 'Równanie ma wyrównać obie strony: do mniejszej wielkości trzeba dodać różnicę, żeby dorównała większej.',
        ckeTip: 'Po obliczeniach wróć do treści i przeczytaj pytanie jeszcze raz – często pytają o y, a uczeń wpisuje x.',
        points: [T`Zapisz, co oznacza każda niewiadoma.`, T`Jedna informacja z treści = jedno równanie.`, T`Odpowiedz dokładnie na zadane pytanie.`]
      }),
      gens: [wordTickets, wordSumDiff, wordCoins, wordModel, wordPrices]
    }
  ]
};
