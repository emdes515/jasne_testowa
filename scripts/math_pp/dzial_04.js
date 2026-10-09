import { T, mc, num, pf, pill, fr, par, poly, quad, lin, xm, iv, m, need, plotPolyline, dec } from './lib.js';

const TIP_GRAPH = 'Dziedzinę czytasz na osi poziomej (od lewej do prawej), zbiór wartości – na osi pionowej (od dołu do góry).';

// ---------- narzędzia do wykresów łamanych ----------
/** Łamana o nachyleniach ±1: start (x0, y0), kolejne zmiany wysokości w `moves`. */
function zigzag(x0, y0, moves) {
  const pts = [[x0, y0]];
  let [x, y] = [x0, y0];
  for (const dy of moves) {
    x += Math.abs(dy);
    y += dy;
    pts.push([x, y]);
  }
  return pts;
}
const fAt = (pts, x) => {
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    if (x >= x1 && x <= x2) return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1);
  }
  return null;
};
/** Rozwiązania f(x) = lvl (łamana o nachyleniach ±1, więc zawsze całkowite). */
const solve = (pts, lvl) => {
  const xs = new Set();
  for (let x = pts[0][0]; x <= pts[pts.length - 1][0]; x++) if (fAt(pts, x) === lvl) xs.add(x);
  return [...xs];
};
const randomZigzag = (r) => {
  const up1 = r.int(2, 4);
  const down = -r.int(2, 5);
  const up2 = r.int(1, 3);
  const y0 = r.int(-3, 0);
  const x0 = r.int(-6, -3);
  const flip = r.bool();
  const moves = flip ? [-up1, -down, -up2] : [up1, down, up2];
  return zigzag(x0, flip ? -y0 : y0, moves);
};
const GRAPH_INTRO = 'Na rysunku przedstawiono wykres funkcji $f$.';

// ---------- 4.1 Pojęcie funkcji i jej wzór ----------
const funcValue = (r) => {
  const a = r.intNot(-3, 3, 0);
  const b = r.intNot(-5, 5, 0);
  const c = r.int(-6, 6);
  const x0 = r.pick([-3, -2, -1, 2, 3, 4]);
  const v = a * x0 * x0 + b * x0 + c;
  return mc({
    title: 'Wartość funkcji dla argumentu',
    q: T`Funkcja $f$ jest określona wzorem $f(x) = ${quad(a, b, c)}$ dla każdej liczby rzeczywistej $x$. Wartość $f(${x0})$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(-a * x0 * x0 + b * x0 + c), m(a * x0 * x0 - b * x0 + c), m(a * 2 * x0 + b * x0 + c), m(v + 2 * Math.abs(a) + 1), m(v - c || v + 3)],
    steps: [T`Podstawiamy $x = ${x0}$: $f(${x0}) = ${a === 1 ? '' : a === -1 ? '-' : a + ' \\cdot '}${par(x0)}^2 ${b > 0 ? '+' : '-'} ${Math.abs(b) === 1 ? '' : Math.abs(b) + ' \\cdot '}${par(x0)} ${c === 0 ? '' : (c > 0 ? '+ ' : '- ') + Math.abs(c)}$.`, T`$${par(x0)}^2 = ${x0 * x0}$, więc $f(${x0}) = ${a * x0 * x0} ${b * x0 >= 0 ? '+' : '-'} ${Math.abs(b * x0)} ${c === 0 ? '' : (c > 0 ? '+ ' : '- ') + Math.abs(c)} = ${v}$.`],
    trap: T`Argument ujemny wstawiaj w nawiasie: $${par(-Math.abs(x0))}^2 = ${x0 * x0}$, a nie $-${x0 * x0}$.`,
    tip: 'Zapis $f(3)$ oznacza: w miejsce każdego $x$ we wzorze wstaw liczbę $3$.'
  });
};
const funcParameter = (r) => {
  const x0 = r.pick([-2, -1, 1, 2, 3]);
  const v = r.intNot(-4, 5, 0);
  const d = x0 * x0 + 1;
  // f(x) = (x - k)/(x^2 + 1), f(x0) = v -> k = x0 - v*d
  const k = x0 - v * d;
  return mc({
    title: 'Parametr we wzorze funkcji',
    q: T`Funkcja $f$ jest określona dla każdej liczby rzeczywistej $x$ wzorem $f(x) = \frac{x - k}{x^2 + 1}$, gdzie $k$ jest pewną liczbą rzeczywistą. Ta funkcja spełnia warunek $f(${x0}) = ${v}$. Wartość współczynnika $k$ jest równa`,
    ok: m(k),
    val: k,
    bad: [m(-k === k ? 1 : -k), m(x0 + v * d), m(x0 - v), m(v * d), m(k + 2)],
    steps: [T`Podstawiamy $x = ${x0}$: $\frac{${x0} - k}{${par(x0)}^2 + 1} = ${v}$, czyli $\frac{${x0} - k}{${d}} = ${v}$.`, T`Mnożymy przez $${d}$: $${x0} - k = ${v * d}$.`, T`Stąd $k = ${x0} - ${par(v * d)} = ${k}$.`],
    trap: T`Z równania $${x0} - k = ${v * d}$ wynika $k = ${x0} - ${par(v * d)}$, a nie $k = ${v * d} - ${par(x0)}$. Uważaj na znak przy $k$.`,
    tip: 'Warunek typu $f(1) = 2$ zamieniasz na równanie: wstaw argument do wzoru i przyrównaj do podanej wartości.'
  });
};
const funcPiecewise = (r) => {
  const a = r.intNot(-6, 6, 0);
  const b = r.int(1, 9);
  const x1 = -r.int(1, 5);
  const x2 = r.int(1, 4);
  const v = x1 + a + (x2 * x2 - b);
  return mc({
    title: 'Funkcja określona dwoma wzorami',
    q: T`Funkcja $f$ jest określona wzorem $f(x) = \begin{cases} ${lin(1, a)} & \text{dla } x < 0 \\ x^2 - ${b} & \text{dla } x \ge 0 \end{cases}$ Wartość wyrażenia $f(${x1}) + f(${x2})$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(x1 * x1 - b + (x2 + a)), m(x1 + a + (x2 + a)), m(x1 * x1 - b + (x2 * x2 - b)), m(v + 2), m(-v === v ? v + 1 : -v)],
    steps: [T`$${x1} < 0$, więc używamy pierwszego wzoru: $f(${x1}) = ${x1} ${a > 0 ? '+' : '-'} ${Math.abs(a)} = ${x1 + a}$.`, T`$${x2} \ge 0$, więc używamy drugiego wzoru: $f(${x2}) = ${x2}^2 - ${b} = ${x2 * x2 - b}$.`, T`Suma: $${x1 + a} + ${par(x2 * x2 - b)} = ${v}$.`],
    trap: T`Najpierw sprawdź, do którego przedziału należy argument – dopiero potem wybierz wzór. Użycie złego wzoru to typowy błąd.`,
    tip: 'W funkcji „klamrowej” każdy argument obsługuje dokładnie jeden wzór – ten, którego warunek jest spełniony.'
  });
};
const funcDomain = (r) => {
  const a = r.intNot(-8, 8, 0);
  if (r.bool()) {
    const c = r.int(1, 5);
    return mc({
      title: 'Dziedzina funkcji z pierwiastkiem',
      q: T`Dziedziną funkcji $f$ określonej wzorem $f(x) = \sqrt{${lin(c, -c * a)}}$ jest zbiór`,
      ok: m(iv.rc(a)),
      bad: [m(iv.ro(a)), m(iv.lc(a)), m(iv.rc(-a)), m(iv.lo(a))],
      steps: [T`Wyrażenie pod pierwiastkiem kwadratowym musi być nieujemne: $${lin(c, -c * a)} \ge 0$.`, T`$${c === 1 ? '' : c}x \ge ${c * a}$, czyli $x \ge ${a}$.`, T`Dziedzina: $${iv.rc(a)}$.`],
      trap: T`Pod pierwiastkiem może być zero ($\sqrt{0} = 0$), więc liczba $${a}$ należy do dziedziny – nawias jest domknięty.`,
      tip: 'Pierwiastek kwadratowy: wyrażenie pod nim musi być większe lub równe zero.'
    });
  }
  const b = r.intNot(-8, 8, 0, a, -a);
  const set = (x, y) => T`\mathbb{R} \setminus \{${Math.min(x, y)}, ${Math.max(x, y)}\}`;
  return mc({
    title: 'Dziedzina funkcji wymiernej',
    q: T`Dziedziną funkcji $f$ określonej wzorem $f(x) = \frac{x}{(${xm(a)})(${xm(b)})}$ jest zbiór`,
    ok: m(set(a, b)),
    bad: [m(set(-a, -b)), m(T`\mathbb{R} \setminus \{${Math.min(0, a, b)}, ${[0, a, b].sort((p, q) => p - q)[1]}, ${Math.max(0, a, b)}\}`), m(T`\mathbb{R} \setminus \{0\}`), m(set(a, -b)), m(T`\mathbb{R}`)],
    steps: [T`Mianownik musi być różny od zera: $(${xm(a)})(${xm(b)}) \neq 0$.`, T`Wykluczamy $x = ${a}$ oraz $x = ${b}$.`, T`Dziedzina: $${set(a, b)}$.`],
    trap: T`Zero w liczniku niczemu nie przeszkadza – liczba $0$ należy do dziedziny.`,
    tip: 'Ułamek: mianownik musi być różny od zera. Licznik może być dowolny.'
  });
};
const funcZero = (r) => {
  const a = r.intNot(-8, 8, 0);
  const b = r.intNot(-8, 8, 0, a);
  const cnt = r.bool();
  if (cnt)
    return mc({
      title: 'Miejsca zerowe funkcji wymiernej',
      q: T`Funkcja $f$ jest określona wzorem $f(x) = \frac{(${xm(a)})(${xm(b)})}{${xm(a)}}$ dla każdej liczby rzeczywistej $x \neq ${a}$. Miejscem zerowym funkcji $f$ jest`,
      ok: `tylko liczba $${b}$`,
      bad: [`tylko liczba $${a}$`, `każda z liczb $${Math.min(a, b)}$ i $${Math.max(a, b)}$`, `tylko liczba $${-b}$`, 'żadna liczba – funkcja nie ma miejsc zerowych'],
      steps: [T`Miejsce zerowe to argument z dziedziny, dla którego $f(x) = 0$.`, T`Licznik jest zerem dla $x = ${a}$ i $x = ${b}$, ale $${a}$ nie należy do dziedziny.`, T`Jedynym miejscem zerowym jest $x = ${b}$.`],
      trap: T`Liczba $${a}$ zeruje licznik, ale jest poza dziedziną, więc nie może być miejscem zerowym.`,
      tip: 'Miejsce zerowe musi należeć do dziedziny funkcji.'
    });
  const k = r.int(2, 5);
  const z = r.intNot(-6, 6, 0);
  return mc({
    title: 'Miejsce zerowe funkcji',
    q: T`Miejscem zerowym funkcji $f$ określonej wzorem $f(x) = ${lin(k, -k * z)}$ jest liczba`,
    ok: m(z),
    val: z,
    bad: [m(-z), m(-k * z), m(k * z), m(k)],
    steps: [T`Rozwiązujemy równanie $f(x) = 0$: $${lin(k, -k * z)} = 0$.`, T`$${k}x = ${k * z}$, więc $x = ${z}$.`],
    trap: T`Miejsce zerowe to argument ($x$), dla którego wartość jest zerem – nie mylić z wartością $f(0) = ${-k * z}$.`,
    tip: 'Miejsce zerowe: rozwiąż równanie $f(x) = 0$. Punkt przecięcia z osią $Oy$: oblicz $f(0)$.'
  });
};

// ---------- 4.2 Odczytywanie z wykresu: dziedzina, zbiór wartości, równanie f(x) = m ----------
const graphDomain = (r) => {
  const pts = randomZigzag(r);
  const lc = r.bool();
  const rc = r.bool();
  const [a, b] = [pts[0][0], pts[pts.length - 1][0]];
  const ys = pts.map((p) => p[1]);
  const mk = (l, rr) => (l ? (rr ? iv.cc : iv.co) : rr ? iv.oc : iv.oo);
  return mc({
    title: 'Dziedzina funkcji z wykresu',
    q: `${GRAPH_INTRO} Dziedziną funkcji $f$ jest przedział`,
    diagram: plotPolyline(pts, { leftClosed: lc, rightClosed: rc }),
    ok: m(mk(lc, rc)(a, b)),
    bad: [m(mk(!lc, !rc)(a, b)), m(mk(lc, !rc)(a, b)), m(mk(!lc, rc)(a, b)), m(iv.cc(Math.min(...ys), Math.max(...ys)))],
    steps: [
      T`Dziedzina to zbiór wszystkich argumentów, czyli rzut wykresu na oś $Ox$.`,
      T`Wykres zaczyna się w $x = ${a}$ (kółko ${lc ? 'zamalowane – liczba należy' : 'puste – liczba nie należy'} do dziedziny) i kończy w $x = ${b}$ (kółko ${rc ? 'zamalowane – należy' : 'puste – nie należy'}).`,
      T`Dziedzina: $${mk(lc, rc)(a, b)}$.`
    ],
    trap: T`Kółko zamalowane oznacza nawias domknięty $\langle\ \rangle$, a puste – nawias otwarty $(\ )$. O nawiasie decyduje wyłącznie rysunek.`,
    tip: TIP_GRAPH
  });
};
const graphRange = (r) => {
  const pts = randomZigzag(r);
  const ys = pts.map((p) => p[1]);
  const [lo, hi] = [Math.min(...ys), Math.max(...ys)];
  const [a, b] = [pts[0][0], pts[pts.length - 1][0]];
  return mc({
    title: 'Zbiór wartości funkcji z wykresu',
    q: `${GRAPH_INTRO} Zbiorem wartości funkcji $f$ jest przedział`,
    diagram: plotPolyline(pts),
    ok: m(iv.cc(lo, hi)),
    bad: [m(iv.cc(a, b)), m(iv.oo(lo, hi)), m(iv.cc(Math.min(pts[0][1], pts[pts.length - 1][1]), Math.max(pts[0][1], pts[pts.length - 1][1]))), m(iv.cc(lo, hi + 1)), m(iv.cc(lo - 1, hi))],
    steps: [T`Zbiór wartości to rzut wykresu na oś $Oy$.`, T`Najniżej położony punkt wykresu ma drugą współrzędną $${lo}$, a najwyżej położony – $${hi}$.`, T`Wykres jest linią ciągłą, więc funkcja przyjmuje wszystkie wartości pośrednie: $${iv.cc(lo, hi)}$.`],
    trap: T`Nie patrz tylko na końce wykresu – najmniejsza i największa wartość mogą być w „załamaniach” w środku.`,
    tip: TIP_GRAPH
  });
};
const graphSolutions = (r) => {
  const pts = randomZigzag(r);
  const ys = pts.map((p) => p[1]);
  const lvl = r.int(Math.min(...ys) - 1, Math.max(...ys) + 1);
  const sol = solve(pts, lvl);
  need(sol.length <= 3);
  return mc({
    title: 'Liczba rozwiązań równania f(x) = m',
    q: `${GRAPH_INTRO} Liczba wszystkich rozwiązań równania $f(x) = ${lvl}$ jest równa`,
    diagram: plotPolyline(pts),
    ok: m(sol.length),
    val: sol.length,
    bad: [m(0), m(1), m(2), m(3), m(4)],
    steps: [T`Rysujemy prostą poziomą $y = ${lvl}$ i liczymy jej punkty wspólne z wykresem.`, sol.length ? T`Prosta przecina wykres dla $x \in \{${sol.sort((p, q) => p - q).join(', ')}\}$.` : T`Prosta nie ma punktów wspólnych z wykresem.`, T`Równanie ma więc ${sol.length === 0 ? 'zero rozwiązań' : sol.length === 1 ? 'jedno rozwiązanie' : sol.length === 2 ? 'dwa rozwiązania' : 'trzy rozwiązania'}.`],
    trap: T`Rozwiązaniami równania $f(x) = ${lvl}$ są argumenty ($x$), a nie wartości. Liczysz punkty przecięcia z prostą poziomą, nie pionową.`,
    tip: 'Równanie $f(x) = m$ rozwiązujesz graficznie: prosta pozioma na wysokości $m$ i liczenie punktów wspólnych z wykresem.'
  });
};
const graphValue = (r) => {
  const pts = randomZigzag(r);
  const i = r.int(0, pts.length - 1);
  const j = r.intNot(0, pts.length - 1, i);
  const v = pts[i][1] - pts[j][1];
  return mc({
    title: 'Odczytywanie wartości funkcji',
    q: `${GRAPH_INTRO} Wartość wyrażenia $f(${pts[i][0]}) - f(${pts[j][0]})$ jest równa`,
    diagram: plotPolyline(pts),
    ok: m(v),
    val: v,
    bad: [m(pts[i][1] + pts[j][1]), m(-v === v ? v + 1 : -v), m(pts[i][0] - pts[j][0]), m(v + 1), m(v - 2)],
    steps: [T`Z wykresu: $f(${pts[i][0]}) = ${pts[i][1]}$ oraz $f(${pts[j][0]}) = ${pts[j][1]}$.`, T`$${pts[i][1]} - ${par(pts[j][1])} = ${v}$.`],
    trap: T`$f(${pts[i][0]})$ to druga współrzędna punktu wykresu o pierwszej współrzędnej $${pts[i][0]}$. Nie zamieniaj współrzędnych miejscami.`,
    tip: 'Punkt $(a, b)$ leży na wykresie funkcji $f$ dokładnie wtedy, gdy $f(a) = b$.'
  });
};
const graphZeros = (r) => {
  const pts = randomZigzag(r);
  const z = solve(pts, 0).sort((p, q) => p - q);
  need(z.length >= 1 && z.length <= 3);
  const sum = z.reduce((s, x) => s + x, 0);
  return mc({
    title: 'Miejsca zerowe z wykresu',
    q: `${GRAPH_INTRO} Suma wszystkich miejsc zerowych funkcji $f$ jest równa`,
    diagram: plotPolyline(pts),
    ok: m(sum),
    val: sum,
    bad: [m(fAt(pts, 0) ?? sum + 1), m(z.length), m(sum + 1), m(-sum === sum ? sum + 2 : -sum), m(sum - 1)],
    steps: [T`Miejsca zerowe to argumenty, dla których wykres przecina oś $Ox$ lub jej dotyka.`, T`Z wykresu odczytujemy: $x \in \{${z.join(', ')}\}$.`, T`Suma: $${sum}$.`],
    trap: T`Miejsce zerowe leży na osi $Ox$. Punkt, w którym wykres przecina oś $Oy$, to wartość $f(0)$ – coś zupełnie innego.`,
    tip: 'Miejsce zerowe: punkt wspólny wykresu z osią $Ox$. Czytasz jego pierwszą współrzędną.'
  });
};

// ---------- 4.3 Monotoniczność, znak i wartości skrajne z wykresu ----------
const graphMonotonic = (r) => {
  const pts = randomZigzag(r);
  const rising = pts[1][1] > pts[0][1];
  const ys = pts.map((p) => p[1]);
  const askDecreasing = r.bool();
  // przedział środkowy ma przeciwną monotoniczność niż skrajne
  const middle = iv.cc(pts[1][0], pts[2][0]);
  const first = iv.cc(pts[0][0], pts[1][0]);
  const last = iv.cc(pts[2][0], pts[3][0]);
  const middleIsDecreasing = rising;
  const ok = askDecreasing === middleIsDecreasing ? middle : r.bool() ? first : last;
  const bad = askDecreasing === middleIsDecreasing ? [first, last] : [middle];
  return mc({
    title: 'Przedziały monotoniczności z wykresu',
    q: `${GRAPH_INTRO} Funkcja $f$ jest ${askDecreasing ? 'malejąca' : 'rosnąca'} w przedziale`,
    diagram: plotPolyline(pts),
    ok: m(ok),
    bad: [...bad.map(m), m(iv.cc(pts[0][0], pts[3][0])), m(iv.cc(Math.min(...ys), Math.max(...ys))), m(iv.cc(pts[1][0] - 1, pts[2][0] + 1))],
    steps: [
      T`Idziemy po wykresie od lewej do prawej. Funkcja ${rising ? 'rośnie' : 'maleje'} dla $x \in ${first}$, ${rising ? 'maleje' : 'rośnie'} dla $x \in ${middle}$ i znów ${rising ? 'rośnie' : 'maleje'} dla $x \in ${last}$.`,
      T`Funkcja jest ${askDecreasing ? 'malejąca' : 'rosnąca'} w przedziale $${ok}$.`
    ],
    trap: T`Przedziały monotoniczności zapisujemy za pomocą argumentów (oś $Ox$), a nie wartości (oś $Oy$).`,
    tip: 'Rosnąca: idąc w prawo, wykres się wznosi. Malejąca: idąc w prawo, wykres opada.'
  });
};
const graphSign = (r) => {
  const up = r.int(3, 5);
  const y0 = -r.int(1, up - 1);
  const down = -r.int(up + y0 + 1, up + y0 + 3);
  const x0 = r.int(-6, -2);
  const flip = r.bool();
  const pts = zigzag(x0, flip ? -y0 : y0, flip ? [-up, -down] : [up, down]);
  const z = solve(pts, 0).sort((p, q) => p - q);
  need(z.length === 2);
  const positive = !flip;
  const strict = r.bool();
  const askPositive = r.bool();
  const [a, b] = [pts[0][0], pts[2][0]];
  const insideSet = strict ? iv.oo(z[0], z[1]) : iv.cc(z[0], z[1]);
  const outsideSet = strict ? `${iv.co(a, z[0])} \\cup ${iv.oc(z[1], b)}` : `${iv.cc(a, z[0])} \\cup ${iv.cc(z[1], b)}`;
  const ok = askPositive === positive ? insideSet : outsideSet;
  const sgn = askPositive ? (strict ? '>' : '\\ge') : strict ? '<' : '\\le';
  return mc({
    title: 'Znak wartości funkcji z wykresu',
    q: `${GRAPH_INTRO} Zbiorem wszystkich argumentów, dla których $f(x) ${sgn} 0$, jest`,
    diagram: plotPolyline(pts),
    ok: m(ok),
    bad: [m(askPositive === positive ? outsideSet : insideSet), m(strict ? iv.cc(z[0], z[1]) : iv.oo(z[0], z[1])), m(iv.cc(a, b)), m(strict ? iv.oo(0, Math.max(...pts.map((p) => Math.abs(p[1])))) : iv.cc(0, Math.max(...pts.map((p) => Math.abs(p[1])))))],
    steps: [
      T`Miejsca zerowe funkcji: $x = ${z[0]}$ oraz $x = ${z[1]}$.`,
      T`Wykres leży ${positive ? 'nad' : 'pod'} osią $Ox$ między miejscami zerowymi i ${positive ? 'pod' : 'nad'} osią poza nimi.`,
      T`Warunek $f(x) ${sgn} 0$ jest spełniony dla $x \in ${ok}$${strict ? '' : ' (miejsca zerowe należą do zbioru, bo nierówność jest nieostra)'}.`
    ],
    trap: T`Odpowiedzią jest zbiór argumentów (oś $Ox$). Zapisanie przedziału wartości z osi $Oy$ to najczęstszy błąd w tym zadaniu.`,
    tip: '$f(x) > 0$: wykres nad osią $Ox$. $f(x) < 0$: wykres pod osią. Czytasz odpowiadające im argumenty.'
  });
};
const graphExtremeOnInterval = (r) => {
  const pts = randomZigzag(r);
  const [A, B] = [pts[0][0], pts[3][0]];
  const a = r.int(A, B - 2);
  const b = r.int(a + 2, B);
  need(b - a < B - A);
  const xs = [a, b, ...pts.map((p) => p[0]).filter((x) => x > a && x < b)];
  const vals = xs.map((x) => fAt(pts, x));
  const max = r.bool();
  const v = max ? Math.max(...vals) : Math.min(...vals);
  const ys = pts.map((p) => p[1]);
  return mc({
    title: 'Wartość największa i najmniejsza w przedziale',
    q: `${GRAPH_INTRO} ${max ? 'Największa' : 'Najmniejsza'} wartość funkcji $f$ w przedziale $${iv.cc(a, b)}$ jest równa`,
    diagram: plotPolyline(pts),
    ok: m(v),
    val: v,
    bad: [m(max ? Math.max(...ys) : Math.min(...ys)), m(max ? Math.min(...vals) : Math.max(...vals)), m(max ? b : a), m(v + (max ? 1 : -1)), m(v + (max ? -1 : 1))],
    steps: [T`Ograniczamy się do fragmentu wykresu dla $x \in ${iv.cc(a, b)}$.`, T`Sprawdzamy końce przedziału i „załamania” wykresu w jego wnętrzu: ${xs.sort((p, q) => p - q).map((x) => `$f(${x}) = ${fAt(pts, x)}$`).join(', ')}.`, T`${max ? 'Największa' : 'Najmniejsza'} z tych wartości to $${v}$.`],
    trap: T`Pytanie dotyczy tylko podanego przedziału, a nie całego wykresu. ${max ? 'Największa' : 'Najmniejsza'} wartość całej funkcji może leżeć poza nim.`,
    tip: 'Wartość największą i najmniejszą w przedziale domkniętym znajdziesz na jego końcach albo w „załamaniach” wykresu.'
  });
};
const graphStatements = (r) => {
  const pts = randomZigzag(r);
  const ys = pts.map((p) => p[1]);
  const zeros = solve(pts, 0).length;
  const i = r.int(0, 3);
  const j = r.intNot(0, 3, i);
  need(pts[i][1] !== pts[j][1]);
  const claimZeros = r.int(1, 3);
  const pool = [
    [T`Funkcja $f$ ma dokładnie ${claimZeros === 1 ? 'jedno miejsce zerowe' : claimZeros === 2 ? 'dwa miejsca zerowe' : 'trzy miejsca zerowe'}.`, zeros === claimZeros, T`wykres ma z osią $Ox$ ${zeros} ${zeros === 1 ? 'punkt wspólny' : zeros === 0 || zeros > 4 ? 'punktów wspólnych' : 'punkty wspólne'}.`],
    [T`$f(${pts[i][0]}) > f(${pts[j][0]})$.`, pts[i][1] > pts[j][1], T`$f(${pts[i][0]}) = ${pts[i][1]}$, a $f(${pts[j][0]}) = ${pts[j][1]}$.`],
    [T`Największa wartość funkcji $f$ jest równa $${Math.max(...ys) + (r.bool() ? 0 : 1)}$.`, null, T`najwyżej położony punkt wykresu ma drugą współrzędną $${Math.max(...ys)}$.`],
    [T`Funkcja $f$ jest rosnąca w przedziale $${iv.cc(pts[0][0], pts[1][0])}$.`, pts[1][1] > pts[0][1], T`w tym przedziale wykres ${pts[1][1] > pts[0][1] ? 'wznosi się' : 'opada'}.`]
  ];
  // prawdziwość zdania o maksimum wyliczamy z jego treści
  pool[2][1] = pool[2][0].includes(`$${Math.max(...ys)}$`);
  const [s1, s2] = r.shuffle(pool).slice(0, 2);
  return pf({
    title: 'Prawda czy fałsz: własności funkcji z wykresu',
    q: GRAPH_INTRO,
    diagram: plotPolyline(pts),
    s1: [s1[0], s1[1], `${s1[2]} Zdanie jest ${s1[1] ? 'prawdziwe' : 'fałszywe'}.`],
    s2: [s2[0], s2[1], `${s2[2]} Zdanie jest ${s2[1] ? 'prawdziwe' : 'fałszywe'}.`],
    trap: 'Każde zdanie oceniaj osobno i zawsze na podstawie rysunku, nie „na oko” z kształtu wykresu.',
    tip: 'W zadaniach prawda/fałsz punkt dostajesz tylko za obie poprawne oceny – sprawdź każde zdanie konkretnym odczytem.'
  });
};

// ---------- 4.4 Przesunięcia wykresów ----------
const dirX = (p) => `${Math.abs(p)} ${Math.abs(p) === 1 ? 'jednostkę' : Math.abs(p) < 5 ? 'jednostki' : 'jednostek'} w ${p > 0 ? 'prawo' : 'lewo'}`;
const dirY = (q) => `${Math.abs(q)} ${Math.abs(q) === 1 ? 'jednostkę' : Math.abs(q) < 5 ? 'jednostki' : 'jednostek'} w ${q > 0 ? 'górę' : 'dół'}`;
const shiftDescribe = (r) => {
  const p = r.intNot(-6, 6, 0);
  const q = r.intNot(-6, 6, 0);
  return mc({
    title: 'Opis przesunięcia wykresu',
    q: T`Wykres funkcji $g$ określonej wzorem $g(x) = f(${xm(p)}) ${q > 0 ? '+' : '-'} ${Math.abs(q)}$ można otrzymać, przesuwając wykres funkcji $f$ o`,
    ok: `${dirX(p)} i ${dirY(q)}`,
    bad: [`${dirX(-p)} i ${dirY(q)}`, `${dirX(p)} i ${dirY(-q)}`, `${dirX(-p)} i ${dirY(-q)}`],
    steps: [T`Zapis $f(${xm(p)})$ oznacza przesunięcie wzdłuż osi $Ox$ o $${Math.abs(p)}$ w ${p > 0 ? 'prawo' : 'lewo'} – kierunek jest „odwrotny” do znaku w nawiasie.`, T`Składnik $${q > 0 ? '+' : '-'} ${Math.abs(q)}$ poza nawiasem przesuwa wykres o $${Math.abs(q)}$ w ${q > 0 ? 'górę' : 'dół'} – tu kierunek zgadza się ze znakiem.`],
    trap: T`$f(x - 3)$ to przesunięcie w PRAWO, a $f(x + 3)$ – w LEWO. Znak w nawiasie działa odwrotnie, niż podpowiada intuicja.`,
    tip: 'W nawiasie przy $x$: odwrotnie do znaku (lewo/prawo). Poza nawiasem: zgodnie ze znakiem (góra/dół).'
  });
};
const shiftPoint = (r) => {
  const a = r.int(-6, 6);
  const b = r.int(-6, 6);
  const p = r.intNot(-5, 5, 0);
  const q = r.intNot(-5, 5, 0);
  const P = (x, y) => m(`(${x}, ${y})`);
  return mc({
    title: 'Punkt na przesuniętym wykresie',
    q: T`Punkt $P = (${a}, ${b})$ należy do wykresu funkcji $f$. Do wykresu funkcji $g$ określonej wzorem $g(x) = f(${xm(p)}) ${q > 0 ? '+' : '-'} ${Math.abs(q)}$ należy punkt`,
    ok: P(a + p, b + q),
    bad: [P(a - p, b + q), P(a + p, b - q), P(a - p, b - q), P(a + q, b + p)],
    steps: [T`Wykres $g$ powstaje z wykresu $f$ przez przesunięcie o $${Math.abs(p)}$ w ${p > 0 ? 'prawo' : 'lewo'} i o $${Math.abs(q)}$ w ${q > 0 ? 'górę' : 'dół'}.`, T`Każdy punkt przesuwa się tak samo: $(${a} ${p > 0 ? '+' : '-'} ${Math.abs(p)},\ ${b} ${q > 0 ? '+' : '-'} ${Math.abs(q)}) = (${a + p}, ${b + q})$.`],
    trap: T`Pierwszą współrzędną zmieniasz przeciwnie do znaku w nawiasie: przy $f(${xm(p)})$ ${p > 0 ? 'dodajesz' : 'odejmujesz'} $${Math.abs(p)}$.`,
    tip: 'Sprawdzenie: $g(a + p) = f(a) + q$. Wstaw nową pierwszą współrzędną do wzoru $g$ i zobacz, czy wychodzi druga.'
  });
};
const shiftParabola = (r) => {
  const p = r.intNot(-7, 7, 0);
  const q = r.intNot(-7, 7, 0);
  const g = (pp, qq) => m(`g(x) = (${xm(pp)})^2 ${qq > 0 ? '+' : '-'} ${Math.abs(qq)}`);
  return mc({
    title: 'Wzór funkcji po przesunięciu',
    q: T`Wykres funkcji $f$ określonej wzorem $f(x) = x^2$ przesunięto o $${dirX(p).replace(/^(\d+)/, '$1$')} i o $${dirY(q).replace(/^(\d+)/, '$1$')}. Otrzymano wykres funkcji $g$ określonej wzorem`,
    ok: g(p, q),
    bad: [g(-p, q), g(p, -q), g(-p, -q)],
    steps: [T`Przesunięcie o $${Math.abs(p)}$ w ${p > 0 ? 'prawo' : 'lewo'} zamienia $x$ na $${xm(p)}$: $y = (${xm(p)})^2$.`, T`Przesunięcie o $${Math.abs(q)}$ w ${q > 0 ? 'górę' : 'dół'} ${q > 0 ? 'dodaje' : 'odejmuje'} $${Math.abs(q)}$: $g(x) = (${xm(p)})^2 ${q > 0 ? '+' : '-'} ${Math.abs(q)}$.`],
    trap: T`Przesunięcie w ${p > 0 ? 'prawo' : 'lewo'} daje w nawiasie znak „$${p > 0 ? '-' : '+'}$”. Wierzchołek nowej paraboli to $(${p}, ${q})$.`,
    tip: 'Kontrola: wierzchołek paraboli $y = (x - p)^2 + q$ leży w punkcie $(p, q)$.'
  });
};
const shiftRangeDomain = (r) => {
  const a = r.int(-7, 2);
  const b = a + r.int(2, 7);
  const k = r.intNot(-5, 5, 0);
  const vertical = r.bool();
  return mc({
    title: vertical ? 'Zbiór wartości po przesunięciu' : 'Dziedzina po przesunięciu',
    q: vertical
      ? T`Zbiorem wartości funkcji $f$ jest przedział $${iv.cc(a, b)}$. Zbiorem wartości funkcji $g$ określonej wzorem $g(x) = f(x) ${k > 0 ? '+' : '-'} ${Math.abs(k)}$ jest przedział`
      : T`Dziedziną funkcji $f$ jest przedział $${iv.cc(a, b)}$. Dziedziną funkcji $g$ określonej wzorem $g(x) = f(${xm(k)})$ jest przedział`,
    ok: m(iv.cc(a + k, b + k)),
    bad: [m(iv.cc(a - k, b - k)), m(iv.cc(a, b)), a + k < b ? m(iv.cc(a + k, b)) : undefined, a < b + k ? m(iv.cc(a, b + k)) : undefined, m(iv.cc(a - 2 * k, b - 2 * k)), m(iv.cc(a + 2 * k, b + 2 * k))],
    steps: vertical
      ? [T`Dodanie liczby do wzoru przesuwa wykres w pionie o $${Math.abs(k)}$ w ${k > 0 ? 'górę' : 'dół'}.`, T`Każda wartość ${k > 0 ? 'rośnie' : 'maleje'} o $${Math.abs(k)}$: $${iv.cc(a + k, b + k)}$.`]
      : [T`Zapis $f(${xm(k)})$ przesuwa wykres w poziomie o $${Math.abs(k)}$ w ${k > 0 ? 'prawo' : 'lewo'}.`, T`Każdy argument ${k > 0 ? 'rośnie' : 'maleje'} o $${Math.abs(k)}$: $${iv.cc(a + k, b + k)}$.`],
    trap: vertical ? T`Przesunięcie w pionie nie zmienia dziedziny – zmienia się tylko zbiór wartości.` : T`Przesunięcie w poziomie nie zmienia zbioru wartości. Dla $f(${xm(k)})$ dziedzina przesuwa się w ${k > 0 ? 'prawo' : 'lewo'}, czyli odwrotnie do znaku w nawiasie.`,
    tip: 'Przesunięcie poziome zmienia dziedzinę i miejsca zerowe. Przesunięcie pionowe zmienia zbiór wartości.'
  });
};
const shiftZeros = (r) => {
  const z1 = r.int(-7, 3);
  const z2 = z1 + r.int(1, 6);
  const p = r.intNot(-5, 5, 0);
  return mc({
    title: 'Miejsca zerowe po przesunięciu',
    q: T`Funkcja $f$ ma dokładnie dwa miejsca zerowe: $${z1}$ oraz $${z2}$. Miejscami zerowymi funkcji $g$ określonej wzorem $g(x) = f(${xm(p)})$ są liczby`,
    ok: `$${z1 + p}$ oraz $${z2 + p}$`,
    bad: [`$${z1 - p}$ oraz $${z2 - p}$`, `$${z1}$ oraz $${z2}$`, `$${z1 + 2 * p}$ oraz $${z2 + 2 * p}$`, `$${z1 - 2 * p}$ oraz $${z2 - 2 * p}$`],
    steps: [T`Wykres $g$ to wykres $f$ przesunięty o $${Math.abs(p)}$ w ${p > 0 ? 'prawo' : 'lewo'}.`, T`Miejsca zerowe przesuwają się razem z wykresem: $${z1} ${p > 0 ? '+' : '-'} ${Math.abs(p)} = ${z1 + p}$ oraz $${z2} ${p > 0 ? '+' : '-'} ${Math.abs(p)} = ${z2 + p}$.`],
    trap: T`Sprawdź: $g(${z1 + p}) = f(${z1 + p} ${p > 0 ? '-' : '+'} ${Math.abs(p)}) = f(${z1}) = 0$. Przesunięcie w „złą” stronę nie przejdzie tego testu.`,
    tip: 'Przy przesunięciu w poziomie miejsca zerowe przesuwają się o tyle samo co wykres.'
  });
};

// ---------- 4.5 Funkcja wykładnicza i logarytmiczna ----------
const expValue = (r) => {
  const a = r.pick([2, 3, 4, 5]);
  const k = r.int(1, a === 2 ? 4 : 3);
  need(a ** k <= 81);
  const neg = r.bool();
  return mc({
    title: 'Wartość funkcji wykładniczej',
    q: T`Funkcja wykładnicza $f$ jest określona wzorem $f(x) = ${a}^x$. Wartość $f(${neg ? -k : k})$ jest równa`,
    ok: m(neg ? fr(1, a ** k) : a ** k),
    val: neg ? 1 / a ** k : a ** k,
    bad: [m(neg ? -(a ** k) : fr(1, a ** k)), m(neg ? fr(-1, a ** k) : a * k), m(neg ? -a * k : a ** (k + 1)), m(neg ? a ** k : k ** a === a ** k ? a ** k + 1 : k ** a), m(fr(1, a * k))],
    steps: neg ? [T`$f(-${k}) = ${a}^{-${k}}$.`, T`Wykładnik ujemny odwraca liczbę: $${a}^{-${k}} = \frac{1}{${a}^{${k}}} = \frac{1}{${a ** k}}$.`] : [T`$f(${k}) = ${a}^{${k}}$.`, T`$${a}^{${k}} = ${a ** k}$.`],
    trap: neg ? T`Wartości funkcji wykładniczej są zawsze dodatnie. Ujemny argument nie daje ujemnego wyniku.` : T`$${a}^{${k}}$ to nie $${a} \cdot ${k}$ – potęgowanie to wielokrotne mnożenie.`,
    tip: 'Funkcja wykładnicza $f(x) = a^x$ przyjmuje wyłącznie wartości dodatnie.'
  });
};
const expBaseFromPoint = (r) => {
  const a = r.pick([2, 3, 4, 5, 6]);
  const k = r.pick([2, 3, -1, -2]);
  need(Math.abs(a ** k) <= 216 && a ** Math.abs(k) <= 216);
  const yTex = k > 0 ? `${a ** k}` : fr(1, a ** -k);
  return mc({
    title: 'Podstawa funkcji wykładniczej',
    q: T`Do wykresu funkcji wykładniczej $f$ określonej wzorem $f(x) = a^x$ (gdzie $a > 0$ i $a \neq 1$) należy punkt $P = \left(${k}, ${yTex}\right)$. Podstawa $a$ jest równa`,
    ok: m(a),
    val: a,
    bad: [m(fr(1, a)), m(k > 0 ? fr(a ** k, k) : a ** -k), m(a + 1), m(a * a), m(a - 1 || 7)],
    steps: [T`Punkt należy do wykresu, więc $a^{${k}} = ${yTex}$.`, k > 0 ? T`$${a}^{${k}} = ${a ** k}$, więc $a = ${a}$.` : T`$a^{${k}} = \frac{1}{a^{${-k}}}$, więc $a^{${-k}} = ${a ** -k}$ i $a = ${a}$.`],
    trap: T`Do wzoru podstawiasz obie współrzędne naraz: pierwszą za $x$, drugą za $f(x)$.`,
    tip: 'Punkt $(p, q)$ leży na wykresie $f(x) = a^x$, gdy $a^p = q$.'
  });
};
const expMonotonic = (r) => {
  const dec0 = [T`\left(\frac{1}{2}\right)^x`, T`\left(\frac{2}{3}\right)^x`, T`(0{,}3)^x`, T`\left(\frac{3}{4}\right)^x`, T`(0{,}9)^x`, T`\left(\frac{1}{5}\right)^x`];
  const inc0 = [T`2^x`, T`\left(\frac{3}{2}\right)^x`, T`(1{,}1)^x`, T`(\sqrt{2})^x`, T`5^x`, T`\left(\frac{5}{4}\right)^x`, T`(2{,}5)^x`];
  const askDec = r.bool();
  const ok = r.pick(askDec ? dec0 : inc0);
  const bad = r.shuffle(askDec ? inc0 : dec0).slice(0, 3);
  return mc({
    title: 'Monotoniczność funkcji wykładniczej',
    q: T`Funkcją ${askDec ? 'malejącą' : 'rosnącą'} jest funkcja $f$ określona wzorem`,
    ok: m(`f(x) = ${ok}`),
    bad: bad.map((b) => m(`f(x) = ${b}`)),
    steps: [T`Funkcja wykładnicza $f(x) = a^x$ jest rosnąca, gdy $a > 1$, i malejąca, gdy $0 < a < 1$.`, T`Podstawa ${askDec ? 'mniejsza od 1' : 'większa od 1'} występuje tylko we wzorze $f(x) = ${ok}$.`],
    trap: T`O monotoniczności decyduje podstawa potęgi, a nie to, czy jest zapisana ułamkiem. $\frac{3}{2} > 1$, więc $\left(\frac{3}{2}\right)^x$ rośnie.`,
    tip: 'Podstawa większa od 1 – funkcja rośnie. Podstawa między 0 a 1 – funkcja maleje.'
  });
};
const logPoint = (r) => {
  const a = r.pick([2, 3, 4, 5]);
  const k = r.pick([2, 3, -1, -2]);
  need(a ** Math.abs(k) <= 125);
  const xTex = k > 0 ? `${a ** k}` : fr(1, a ** -k);
  if (r.bool())
    return mc({
      title: 'Wartość funkcji logarytmicznej',
      q: T`Funkcja logarytmiczna $f$ jest określona wzorem $f(x) = \log_{${a}} x$ dla $x > 0$. Wartość $f\left(${xTex}\right)$ jest równa`,
      ok: m(k),
      val: k,
      bad: [m(-k), m(k > 0 ? a ** k : fr(1, a ** -k)), m(fr(1, k)), m(k + 1), m(a)],
      steps: [T`Szukamy wykładnika, do którego trzeba podnieść $${a}$, aby otrzymać $${xTex}$.`, T`$${a}^{${k}} = ${xTex}$, więc $f\left(${xTex}\right) = ${k}$.`],
      trap: k > 0 ? T`Wartością logarytmu jest wykładnik ($${k}$), a nie liczba logarytmowana ani podstawa.` : T`Logarytm z liczby mniejszej od 1 (przy podstawie większej od 1) jest ujemny – to nic złego.`,
      tip: 'Karta wzorów, str. 5: $\\log_a b = c$ oznacza, że $a^c = b$.'
    });
  return mc({
    title: 'Podstawa funkcji logarytmicznej',
    q: T`Do wykresu funkcji logarytmicznej $f$ określonej wzorem $f(x) = \log_a x$ (gdzie $a > 0$ i $a \neq 1$) należy punkt $P = \left(${xTex}, ${k}\right)$. Podstawa $a$ jest równa`,
    ok: m(a),
    val: a,
    bad: [m(fr(1, a)), m(a * a), m(a + 1), m(Math.abs(k) === a ? a + 2 : Math.abs(k)), m(a - 1 || 6)],
    steps: [T`Punkt należy do wykresu, więc $\log_a ${xTex} = ${k}$.`, T`Z definicji logarytmu: $a^{${k}} = ${xTex}$, stąd $a = ${a}$.`],
    trap: T`Pierwsza współrzędna punktu to liczba logarytmowana, druga – wartość logarytmu. Nie zamieniaj ich.`,
    tip: 'Karta wzorów, str. 5: $\\log_a b = c$ oznacza, że $a^c = b$.'
  });
};
const expModel = (r) => {
  if (r.bool()) {
    const N0 = r.pick([50, 100, 200, 300, 500]);
    const t = r.int(2, 5);
    const f = r.pick([2, 3]);
    need(N0 * f ** t <= 50000);
    return mc({
      title: 'Wzrost wykładniczy',
      q: T`W hodowli laboratoryjnej liczba bakterii ${f === 2 ? 'podwaja się' : 'potraja się'} co godzinę. W chwili rozpoczęcia obserwacji w hodowli było $${N0}$ bakterii. Po $${t}$ godzinach liczba bakterii w tej hodowli będzie równa`,
      ok: m(N0 * f ** t),
      val: N0 * f ** t,
      bad: [m(N0 * f * t), m(N0 * f ** (t - 1)), m(N0 * f ** (t + 1)), m(N0 + f ** t), m(N0 * t)],
      steps: [T`Co godzinę liczbę bakterii mnożymy przez $${f}$, więc po $t$ godzinach jest ich $${N0} \cdot ${f}^t$.`, T`Dla $t = ${t}$: $${N0} \cdot ${f}^{${t}} = ${N0} \cdot ${f ** t} = ${N0 * f ** t}$.`],
      trap: T`To wzrost wykładniczy, a nie liniowy: mnożymy $${t}$ razy przez $${f}$, czyli przez $${f}^{${t}} = ${f ** t}$, a nie przez $${f} \cdot ${t} = ${f * t}$.`,
      tip: 'Zjawisko „mnoży się co stały okres” opisuje funkcja wykładnicza: wartość początkowa razy mnożnik do potęgi liczby okresów.'
    });
  }
  const T0 = r.pick([4, 5, 6, 8, 12]);
  const n = r.int(2, 4);
  const M0 = r.pick([80, 160, 200, 240, 320, 400, 480, 640, 800]);
  need(Number.isInteger(M0 / 2 ** n));
  return mc({
    title: 'Zanik wykładniczy',
    q: T`Masa pewnego leku w organizmie zmniejsza się o połowę co $${T0}$ godzin. Pacjent przyjął jednorazowo $${M0}$ mg tego leku. Po upływie $${T0 * n}$ godzin w organizmie pacjenta pozostanie`,
    ok: `$${M0 / 2 ** n}$ mg leku`,
    bad: [M0 / 2, M0 / (2 * n), M0 / 2 ** (n - 1), M0 / 2 ** (n + 1), M0 / n, M0 / 2 ** n + 10].filter((x, i, arr) => Number.isInteger(x) && arr.indexOf(x) === i).map((x) => `$${x}$ mg leku`),
    steps: [T`$${T0 * n}$ godzin to $${n}$ okresy po $${T0}$ godzin.`, T`Po każdym okresie masa maleje o połowę: $${M0} \cdot \left(\frac{1}{2}\right)^{${n}} = \frac{${M0}}{${2 ** n}} = ${M0 / 2 ** n}$ mg.`],
    trap: T`Masy nie dzielimy przez $2 \cdot ${n} = ${2 * n}$, tylko $${n}$ razy z rzędu przez $2$, czyli przez $2^{${n}} = ${2 ** n}$.`,
    tip: 'Połowiczny zanik: po każdym okresie zostaje połowa tego, co było – mnożnik $\\frac{1}{2}$ do potęgi liczby okresów.'
  });
};
const expRange = (r) => {
  const a = r.pick([2, 3, 5, T`\frac{1}{2}`, T`\frac{1}{3}`]);
  const q = r.intNot(-7, 7, 0);
  const base = typeof a === 'number' ? `${a}^x` : T`\left(${a}\right)^x`;
  return mc({
    title: 'Zbiór wartości funkcji wykładniczej',
    q: T`Zbiorem wartości funkcji $f$ określonej wzorem $f(x) = ${base} ${q > 0 ? '+' : '-'} ${Math.abs(q)}$ jest przedział`,
    ok: m(iv.ro(q)),
    bad: [m(iv.rc(q)), m(iv.lo(q)), m(iv.ro(0)), m(iv.ro(-q)), m('(-\\infty, +\\infty)')],
    steps: [T`Funkcja $y = ${base}$ przyjmuje wszystkie wartości dodatnie i tylko takie: jej zbiór wartości to $(0, +\infty)$.`, T`${q > 0 ? 'Dodanie' : 'Odjęcie'} $${Math.abs(q)}$ przesuwa wykres o $${Math.abs(q)}$ w ${q > 0 ? 'górę' : 'dół'}, więc zbiór wartości to $${iv.ro(q)}$.`],
    trap: T`Wartość $${q}$ nie jest przyjmowana – wykres zbliża się do prostej $y = ${q}$, ale jej nie dotyka. Dlatego nawias jest otwarty.`,
    tip: 'Wykres $y = a^x$ leży cały nad osią $Ox$. Przesunięcie w pionie o $q$ daje zbiór wartości $(q, +\\infty)$.'
  });
};

export default {
  numericId: 4,
  title: 'Funkcje i ich własności',
  short_title: 'Funkcje',
  description: 'Wartości i dziedzina funkcji, odczytywanie własności z wykresu, przesunięcia wykresów oraz funkcja wykładnicza i logarytmiczna.',
  icon: 'LineChart',
  color: '#10B981',
  matura_points_range: '4–7 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 4–5',
  lessons: [
    {
      title: 'Pojęcie funkcji: wartość, dziedzina i miejsce zerowe ze wzoru',
      short_title: 'Wzór funkcji',
      pill: pill({
        essence: T`Funkcja każdemu argumentowi $x$ z dziedziny przypisuje dokładnie jedną wartość $f(x)$. Mając wzór, potrafisz trzy rzeczy: obliczyć wartość (wstawiasz liczbę za $x$), wyznaczyć miejsce zerowe (rozwiązujesz równanie $f(x) = 0$) i ustalić dziedzinę (wykluczasz liczby, dla których wzór nie ma sensu: zero w mianowniku, liczba ujemna pod pierwiastkiem kwadratowym).`,
        context: 'Zadania 9–14 w arkuszu • 1 pkt. Często kilka pytań do jednej funkcji.',
        pl: T`Funkcja to automat: wrzucasz liczbę, wypada wynik. Zapis $f(2) = 7$ znaczy „wrzuciłem 2, wypadło 7”. Miejsce zerowe to liczba, po której wrzuceniu wypada zero. A dziedzina to lista liczb, które automat w ogóle przyjmuje.`,
        steps: [
          ['Wartość funkcji', T`Dla $f(x) = x^2 - 3x$ i $x = -2$: $f(-2) = (-2)^2 - 3 \cdot (-2) = 4 + 6 = 10$.`, 'Liczbę ujemną zawsze w nawiasie.'],
          ['Miejsce zerowe', T`Rozwiąż $f(x) = 0$. Dla $f(x) = 2x - 6$: $2x = 6$, $x = 3$.`, 'Wynik musi należeć do dziedziny.'],
          ['Dziedzina', T`Dla $f(x) = \frac{1}{x - 4}$: $x \neq 4$. Dla $f(x) = \sqrt{x - 4}$: $x \ge 4$.`, 'Mianownik różny od zera, pod pierwiastkiem liczba nieujemna.']
        ],
        formulas: [
          ['Punkt na wykresie', T`P = (a, b) \ \text{należy do wykresu, gdy} \ f(a) = b`],
          ['Miejsce zerowe', T`f(x_0) = 0`],
          ['Przecięcie z osią Oy', T`(0, f(0))`]
        ],
        examples: [
          ['Parametr we wzorze', '1 pkt', T`Funkcja $f(x) = \frac{x - k}{x^2 + 1}$ spełnia warunek $f(1) = 2$. Oblicz $k$.`, T`1. $f(1) = \frac{1 - k}{1 + 1} = \frac{1 - k}{2}$.` + '\n' + T`2. $\frac{1 - k}{2} = 2$, więc $1 - k = 4$.` + '\n' + T`3. $k = -3$.`, 'Warunek na wartość funkcji to zwykłe równanie.'],
          ['Dwa wzory', '1 pkt', T`Funkcja $f$ jest określona wzorem $f(x) = x + 1$ dla $x < 0$ oraz $f(x) = x^2$ dla $x \ge 0$. Oblicz $f(-3) + f(2)$.`, T`1. $-3 < 0$: $f(-3) = -3 + 1 = -2$.` + '\n' + T`2. $2 \ge 0$: $f(2) = 4$.` + '\n' + T`3. Suma: $2$.`, 'Najpierw wybierz właściwy wzór.']
        ],
        trap: T`Miejsce zerowe to ARGUMENT, dla którego wartość jest zerem. $f(0)$ to coś innego: wartość funkcji dla argumentu zero.`,
        fail: T`„Miejscem zerowym funkcji $f(x) = 2x - 6$ jest $-6$, bo $f(0) = -6$.”`,
        win: T`Rozwiązujemy $2x - 6 = 0$ i otrzymujemy miejsce zerowe $x = 3$.`,
        why: 'Miejsce zerowe leży na osi Ox (tam, gdzie y = 0), a f(0) odczytujemy na osi Oy (tam, gdzie x = 0).',
        ckeTip: 'W zadaniach z kilkoma podpunktami o tej samej funkcji przepisz wzór na margines – oszczędzasz czas i unikasz pomyłek.',
        points: [T`$f(a)$: wstaw $a$ w miejsce każdego $x$.`, T`Miejsce zerowe: rozwiąż $f(x) = 0$.`, T`Dziedzina: mianownik $\neq 0$, pod pierwiastkiem $\ge 0$.`]
      }),
      gens: [funcValue, funcParameter, funcPiecewise, funcDomain, funcZero]
    },
    {
      title: 'Wykres funkcji: dziedzina, zbiór wartości i równanie f(x) = m',
      short_title: 'Czytanie wykresu',
      pill: pill({
        essence: T`Z wykresu odczytujesz własności funkcji bez żadnych rachunków. Dziedzina to rzut wykresu na oś $Ox$ (wszystkie argumenty), zbiór wartości – rzut na oś $Oy$ (wszystkie wartości). Miejsca zerowe to punkty wspólne wykresu z osią $Ox$. Równanie $f(x) = m$ rozwiązujesz, prowadząc prostą poziomą na wysokości $m$ i licząc punkty przecięcia.`,
        context: 'Wiązka 3–4 zadań do jednego wykresu (łącznie 3–5 pkt) pojawia się w każdym arkuszu, zwykle jako zadania 11–14.',
        pl: T`Wyobraź sobie latarkę. Świecisz na wykres z góry – cień na osi poziomej to dziedzina. Świecisz z boku – cień na osi pionowej to zbiór wartości. Kółko zamalowane znaczy „ten punkt należy”, puste – „tu wykres się urywa, punktu nie ma”.`,
        steps: [
          ['Dziedzina', T`Odczytaj, od jakiego do jakiego $x$ ciągnie się wykres.`, 'Sprawdź kółka na końcach.'],
          ['Zbiór wartości', T`Znajdź najniższy i najwyższy punkt wykresu i odczytaj ich drugie współrzędne.`, 'Skrajne wartości bywają w środku wykresu.'],
          ['Równanie f(x) = m', T`Przyłóż linijkę poziomo na wysokości $m$ i policz punkty wspólne z wykresem.`, 'Każdy punkt to jedno rozwiązanie.']
        ],
        formulas: [
          ['Dziedzina', T`D_f: \ \text{rzut wykresu na oś } Ox`],
          ['Zbiór wartości', T`ZW_f: \ \text{rzut wykresu na oś } Oy`],
          ['Miejsce zerowe', T`f(x_0) = 0: \ \text{punkt wykresu na osi } Ox`]
        ],
        examples: [
          ['Odczyt z wykresu', '1 pkt', T`Wykres funkcji $f$ jest łamaną o wierzchołkach $(-4, -2)$, $(-1, 3)$, $(3, -1)$, $(5, 1)$ (końce zamalowane). Podaj dziedzinę i zbiór wartości.`, T`1. Argumenty: od $-4$ do $5$, więc $D_f = \langle -4, 5 \rangle$.` + '\n' + T`2. Najniższy punkt ma $y = -2$, najwyższy $y = 3$, więc $ZW_f = \langle -2, 3 \rangle$.`, 'Dziedzina i zbiór wartości to dwa różne przedziały – z dwóch różnych osi.'],
          ['Liczba rozwiązań', '1 pkt', T`Dla tej samej funkcji podaj liczbę rozwiązań równania $f(x) = 0$.`, T`1. Prosta $y = 0$ to oś $Ox$.` + '\n' + T`2. Wykres przecina ją trzy razy: między $-4$ a $-1$, między $-1$ a $3$ oraz między $3$ a $5$.` + '\n' + T`3. Równanie ma $3$ rozwiązania.`, 'Liczba rozwiązań to liczba punktów przecięcia z prostą poziomą.']
        ],
        trap: T`Dziedzina i zbiór wartości to NIE to samo. Dziedzinę czytasz z osi poziomej, zbiór wartości – z pionowej.`,
        fail: T`Podanie przedziału z osi $Oy$ jako dziedziny (albo odwrotnie).`,
        win: T`Dziedzina: skrajny lewy i skrajny prawy punkt wykresu. Zbiór wartości: najniższy i najwyższy punkt.`,
        why: 'Argumenty (x) leżą na osi poziomej, a wartości (y) na pionowej – to dwa różne zbiory liczb.',
        ckeTip: 'Przyłóż linijkę do rysunku w arkuszu – odczyt staje się dużo pewniejszy niż „na oko”.',
        points: [T`Dziedzina – oś $Ox$. Zbiór wartości – oś $Oy$.`, T`Kółko zamalowane – nawias $\langle\ \rangle$, puste – nawias $(\ )$.`, T`$f(x) = m$: licz przecięcia z prostą poziomą $y = m$.`]
      }),
      gens: [graphDomain, graphRange, graphSolutions, graphValue, graphZeros]
    },
    {
      title: 'Wykres funkcji: monotoniczność, znak i wartości skrajne',
      short_title: 'Monotoniczność i znak',
      pill: pill({
        essence: T`Funkcja jest rosnąca w przedziale, jeśli idąc w prawo, wykres się wznosi; malejąca – jeśli opada. Wartości dodatnie funkcja przyjmuje tam, gdzie wykres leży nad osią $Ox$, ujemne – tam, gdzie pod nią. Największą i najmniejszą wartość w przedziale domkniętym znajdziesz, patrząc tylko na fragment wykresu nad tym przedziałem. Wszystkie te odpowiedzi zapisuje się za pomocą argumentów, czyli liczb z osi $Ox$.`,
        context: 'Element wiązki zadań do wykresu • 1 pkt za każde pytanie.',
        pl: T`Wykres to profil trasy rowerowej czytany od lewej do prawej. Podjazd – funkcja rośnie. Zjazd – maleje. Jesteś nad poziomem morza (nad osią) – wartości dodatnie. Pod poziomem – ujemne. A pytanie „w jakim przedziale?” zawsze dotyczy kilometrów trasy, czyli osi poziomej.`,
        steps: [
          ['Monotoniczność', T`Znajdź „szczyty” i „dołki” wykresu. Między nimi funkcja jest rosnąca albo malejąca.`, T`Zapisz przedział argumentów, np. $\langle -1, 3 \rangle$.`],
          ['Znak wartości', T`Zaznacz miejsca zerowe. Sprawdź, gdzie wykres jest nad osią, a gdzie pod.`, T`$f(x) > 0$ – bez miejsc zerowych, $f(x) \ge 0$ – z nimi.`],
          ['Wartości skrajne w przedziale', T`Zasłoń resztę wykresu i szukaj najwyższego oraz najniższego punktu fragmentu.`, 'Sprawdź końce przedziału i załamania.']
        ],
        formulas: [
          ['Funkcja rosnąca', T`x_1 < x_2 \ \text{daje} \ f(x_1) < f(x_2)`],
          ['Funkcja malejąca', T`x_1 < x_2 \ \text{daje} \ f(x_1) > f(x_2)`],
          ['Wartości dodatnie', T`f(x) > 0: \ \text{wykres nad osią } Ox`]
        ],
        examples: [
          ['Monotoniczność', '1 pkt', T`Wykres funkcji $f$ jest łamaną o wierzchołkach $(-4, -2)$, $(-1, 3)$, $(3, -1)$, $(5, 1)$. W jakim przedziale funkcja jest malejąca?`, T`1. Od $x = -4$ do $x = -1$ wykres się wznosi.` + '\n' + T`2. Od $x = -1$ do $x = 3$ wykres opada.` + '\n' + T`3. Funkcja jest malejąca w przedziale $\langle -1, 3 \rangle$.`, 'Odpowiedź to przedział argumentów.'],
          ['Wartość największa w przedziale', '1 pkt', T`Dla tej samej funkcji podaj największą wartość w przedziale $\langle 0, 5 \rangle$.`, T`1. $f(0) = 2$, $f(3) = -1$, $f(5) = 1$.` + '\n' + T`2. Największa z nich to $2$.`, 'Maksimum całej funkcji (3) leży poza przedziałem.']
        ],
        trap: T`Przedział monotoniczności i zbiór, w którym $f(x) > 0$, zapisujesz ARGUMENTAMI. Podanie przedziału wartości to automatycznie 0 punktów.`,
        fail: T`„Funkcja jest malejąca w przedziale $\langle -1, 3 \rangle$” zapisane jako $\langle 3, -1 \rangle$ albo jako przedział wartości.`,
        win: T`Patrzymy na oś $Ox$: funkcja maleje od $x = -1$ do $x = 3$, czyli w $\langle -1, 3 \rangle$.`,
        why: 'Pytanie „w jakim przedziale” dotyczy tego, dla jakich x coś zachodzi – a x leżą na osi poziomej.',
        ckeTip: 'CKE akceptuje przedziały monotoniczności zarówno z nawiasami domkniętymi, jak i otwartymi – ważne, by końce były poprawne.',
        points: [T`Rosnąca – wykres w górę, malejąca – w dół (czytane w prawo).`, T`$f(x) > 0$ – nad osią, $f(x) < 0$ – pod osią.`, T`Wartości skrajne w przedziale: końce i załamania.`]
      }),
      gens: [graphMonotonic, graphSign, graphExtremeOnInterval, graphStatements]
    },
    {
      title: 'Przesunięcia wykresów: y = f(x − p) oraz y = f(x) + q',
      short_title: 'Przesunięcia wykresów',
      pill: pill({
        essence: T`Wykres funkcji $y = f(x - p)$ powstaje z wykresu $f$ przez przesunięcie o $p$ jednostek wzdłuż osi $Ox$ (w prawo dla $p > 0$). Wykres $y = f(x) + q$ to przesunięcie o $q$ jednostek wzdłuż osi $Oy$ (w górę dla $q > 0$). Razem z wykresem przesuwa się wszystko: punkty, miejsca zerowe, wierzchołek paraboli, dziedzina i zbiór wartości.`,
        context: 'Zadania 12–15 w arkuszu • 1 pkt. Często jako ostatnie pytanie w wiązce do wykresu.',
        pl: T`Poza nawiasem jest uczciwie: $+3$ to trzy w górę, $-3$ to trzy w dół. W nawiasie jest na przekór: $f(x - 3)$ to trzy w PRAWO, a $f(x + 3)$ to trzy w LEWO. Zapamiętaj to jedno i masz punkt.`,
        steps: [
          ['Odczytaj przesunięcie poziome', T`W $g(x) = f(x + 2) - 5$ w nawiasie stoi $+2$, więc przesuwamy o $2$ w lewo.`, 'W nawiasie – odwrotnie do znaku.'],
          ['Odczytaj przesunięcie pionowe', T`Poza nawiasem stoi $-5$, więc przesuwamy o $5$ w dół.`, 'Poza nawiasem – zgodnie ze znakiem.'],
          ['Przesuń to, o co pytają', T`Punkt $(1, 4)$ przechodzi na $(1 - 2, 4 - 5) = (-1, -1)$.`, 'Każdy punkt wykresu przesuwa się tak samo.']
        ],
        formulas: [
          ['Przesunięcie poziome', T`y = f(x - p): \ \text{o } p \text{ w prawo}`],
          ['Przesunięcie pionowe', T`y = f(x) + q: \ \text{o } q \text{ w górę}`],
          ['Parabola po przesunięciu', T`y = (x - p)^2 + q, \quad W = (p, q)`, 8]
        ],
        examples: [
          ['Punkt po przesunięciu', '1 pkt', T`Punkt $P = (2, -3)$ należy do wykresu funkcji $f$. Jaki punkt należy do wykresu $g(x) = f(x - 4) + 1$?`, T`1. Przesunięcie o $4$ w prawo i $1$ w górę.` + '\n' + T`2. $(2 + 4, -3 + 1) = (6, -2)$.`, T`Kontrola: $g(6) = f(2) + 1 = -3 + 1 = -2$.`],
          ['Miejsca zerowe', '1 pkt', T`Funkcja $f$ ma miejsca zerowe $-1$ i $5$. Podaj miejsca zerowe funkcji $g(x) = f(x + 2)$.`, T`1. $f(x + 2)$ to przesunięcie o $2$ w lewo.` + '\n' + T`2. $-1 - 2 = -3$ oraz $5 - 2 = 3$.`, 'Miejsca zerowe przesuwają się w poziomie razem z wykresem.']
        ],
        trap: T`$f(x + 3)$ przesuwa wykres w LEWO, nie w prawo. Plus w nawiasie to ruch w stronę liczb ujemnych.`,
        fail: T`„$g(x) = f(x + 3)$, więc przesuwam wykres o 3 w prawo.”`,
        win: T`$g(x) = f(x + 3) = f(x - (-3))$, czyli przesunięcie o $3$ w lewo.`,
        why: 'Żeby g przyjęła tę samą wartość co f, musi dostać argument o 3 mniejszy – dlatego cały wykres wędruje w lewo.',
        ckeTip: 'Zawsze zrób test jednym punktem: podstaw nową współrzędną x do wzoru g i sprawdź, czy wychodzi oczekiwana wartość.',
        points: [T`W nawiasie odwrotnie: $f(x - p)$ to $p$ w prawo.`, T`Poza nawiasem zgodnie: $f(x) + q$ to $q$ w górę.`, T`Poziome przesunięcie zmienia dziedzinę i miejsca zerowe, pionowe – zbiór wartości.`]
      }),
      gens: [shiftDescribe, shiftPoint, shiftParabola, shiftRangeDomain, shiftZeros]
    },
    {
      title: 'Funkcja wykładnicza i logarytmiczna w zastosowaniach',
      short_title: 'Wykładnicza i logarytmiczna',
      pill: pill({
        essence: T`Funkcja wykładnicza $f(x) = a^x$ (dla $a > 0$, $a \neq 1$) opisuje zjawiska, w których wielkość mnoży się przez stałą liczbę w równych odstępach czasu: lokaty, rozmnażanie bakterii, rozpad leku. Rośnie dla $a > 1$, maleje dla $0 < a < 1$ i przyjmuje wyłącznie wartości dodatnie. Funkcja logarytmiczna $f(x) = \log_a x$ odpowiada na pytanie odwrotne: do jakiej potęgi podnieść $a$, żeby dostać $x$.`,
        context: 'Zadanie 13–16 w arkuszu • 1–2 pkt, najczęściej osadzone w kontekście praktycznym.',
        pl: T`„Podwaja się co godzinę” to funkcja wykładnicza: po 1 h razy 2, po 2 h razy 4, po 3 h razy 8. Nie razy 2, 4, 6! Mnożysz przez tę samą liczbę tyle razy, ile minęło okresów.`,
        steps: [
          ['Ustal wartość początkową i mnożnik', T`Na starcie $200$ mg leku, co $6$ godzin zostaje połowa: mnożnik $\frac{1}{2}$.`, 'Wzrost: mnożnik większy od 1. Zanik: mniejszy od 1.'],
          ['Policz liczbę okresów', T`$18$ godzin to $18 : 6 = 3$ okresy.`, 'Okres to czas jednego „mnożenia”.'],
          ['Podnieś mnożnik do potęgi', T`$200 \cdot \left(\frac{1}{2}\right)^3 = 200 \cdot \frac{1}{8} = 25$ mg.`, 'Mnożnik do potęgi liczby okresów.']
        ],
        formulas: [
          ['Funkcja wykładnicza', T`f(x) = a^x, \quad a > 0, \ a \neq 1`],
          ['Definicja logarytmu', T`\log_a b = c \ \text{gdy} \ a^c = b`, 5],
          ['Model wykładniczy', T`N(t) = N_0 \cdot q^{\,t}`]
        ],
        examples: [
          ['Punkt na wykresie', '1 pkt', T`Do wykresu funkcji $f(x) = a^x$ należy punkt $(2, 9)$. Oblicz $a$.`, T`1. $a^2 = 9$.` + '\n' + T`2. $a > 0$, więc $a = 3$.`, 'Podstawa funkcji wykładniczej jest dodatnia, więc odrzucamy −3.'],
          ['Zanik leku', '2 pkt', T`Masa leku w organizmie maleje o połowę co $4$ godziny. Chory przyjął $160$ mg. Ile leku zostanie po $12$ godzinach?`, T`1. $12 : 4 = 3$ okresy.` + '\n' + T`2. $160 \cdot \left(\frac{1}{2}\right)^3 = 160 : 8 = 20$ mg.`, 'Dzielisz przez 2 trzy razy, a nie przez 6.']
        ],
        trap: T`Wzrost wykładniczy to nie wzrost liniowy. „Podwaja się co godzinę przez 5 godzin” to razy $2^5 = 32$, a nie razy $10$.`,
        fail: T`$100$ bakterii, podwojenie co godzinę, po $5$ h: $100 \cdot 2 \cdot 5 = 1000$.`,
        win: T`$100 \cdot 2^5 = 100 \cdot 32 = 3200$.`,
        why: 'Każde podwojenie działa na wynik poprzedniego podwojenia, więc mnożniki się mnożą, a nie dodają.',
        ckeTip: 'W zadaniu z kontekstem wypisz wartości dla kolejnych okresów w tabelce – od razu widać, czy liczysz wykładniczo.',
        points: [T`$a > 1$: funkcja $a^x$ rośnie. $0 < a < 1$: maleje.`, T`$a^x > 0$ dla każdego $x$.`, T`$\log_a b = c$ znaczy to samo co $a^c = b$.`]
      }),
      gens: [expValue, expBaseFromPoint, expMonotonic, logPoint, expModel, expRange]
    }
  ]
};
