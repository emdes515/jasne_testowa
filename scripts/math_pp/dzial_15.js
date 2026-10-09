import { T, mc, num, pf, pill, fr, par, quad, lin, iv, m, need, dec } from './lib.js';

const TIP_OPT = 'Karta wzorów, str. 8: funkcja $f(x) = ax^2 + bx + c$ dla $a < 0$ przyjmuje wartość największą w wierzchołku, czyli dla $x = -\\frac{b}{2a}$.';
const d2 = (x) => dec(x, 2);
const nOpts = (ok, arr, unit = '') => [...new Set(arr.filter((x) => Number.isFinite(x) && x > 0 && Math.abs(x - ok) > 1e-9 && Number.isInteger(Math.round(x * 1e6) / 1e5)).map((x) => d2(x)))].map((x) => (unit ? `$${x}$ ${unit}` : m(x)));

// ---------- 15.1 Funkcja pola przy stałym obwodzie ----------
const perimMaxArea = (r) => {
  const L = r.int(3, 30) * 4;
  const ctx = r.pick(['Z drutu o długości', 'Z siatki o długości', 'Ze sznurka o długości', 'Z listwy o długości']);
  const what = r.pick(['prostokątną ramkę', 'prostokątne ogrodzenie', 'prostokąt']);
  const v = (L / 4) ** 2;
  if (r.rnd() < 0.5)
    return num({
      title: 'Największe pole prostokąta o danym obwodzie',
      q: T`${ctx} $${L}$ cm wykonano ${what}. Oblicz największe możliwe pole powierzchni ograniczonej w ten sposób figury (w cm²). Wpisz liczbę.`,
      ans: v,
      steps: [T`Boki prostokąta: $x$ oraz $\frac{${L}}{2} - x = ${L / 2} - x$, gdzie $0 < x < ${L / 2}$.`, T`Pole: $P(x) = x(${L / 2} - x) = -x^2 + ${L / 2}x$. Ramiona paraboli są skierowane w dół, więc wartość największa jest w wierzchołku: $x = \frac{${L / 2}}{2} = ${d2(L / 4)}$.`, T`$P_{\max} = ${d2(L / 4)} \cdot ${d2(L / 4)} = ${d2(v)}$.`],
      trap: T`Suma dwóch sąsiednich boków to POŁOWA obwodu ($${L / 2}$), a nie cały obwód.`,
      tip: TIP_OPT
    });
  return mc({
    title: 'Największe pole prostokąta o danym obwodzie',
    q: T`Obwód prostokąta jest równy $${L}$. Największe możliwe pole takiego prostokąta jest równe`,
    ok: m(d2(v)),
    val: v,
    bad: nOpts(v, [(L / 2) ** 2, L * L / 8, v / 2, L, v + L / 4, 2 * v]),
    steps: [T`Boki: $x$ i $${L / 2} - x$. Pole: $P(x) = -x^2 + ${L / 2}x$.`, T`Wierzchołek: $x = ${d2(L / 4)}$ – prostokąt jest wtedy kwadratem.`, T`$P_{\max} = ${d2(L / 4)}^2 = ${d2(v)}$.`.replace(/\{,\}(\d+)\^2/, '{,}$1 \\cdot ' + d2(L / 4))],
    trap: T`Bok optymalnego kwadratu to $\frac{${L}}{4} = ${d2(L / 4)}$, a nie $\frac{${L}}{2}$.`,
    tip: 'Spośród prostokątów o tym samym obwodzie największe pole ma kwadrat.'
  });
};
const perimAreaFormula = (r) => {
  const L = r.int(4, 40) * 2;
  const h = L / 2;
  return mc({
    title: 'Wzór funkcji pola',
    q: T`Obwód prostokąta jest równy $${L}$, a jeden z jego boków ma długość $x$. Pole $P$ tego prostokąta wyraża się wzorem`,
    ok: m(`P(x) = -x^2 + ${h}x`),
    bad: [m(`P(x) = -x^2 + ${L}x`), m(`P(x) = x^2 + ${h}x`), m(`P(x) = -2x^2 + ${L}x`), m(`P(x) = ${h}x`), m(`P(x) = -x^2 + ${h}`)],
    steps: [T`Jeśli jeden bok ma długość $x$, to z obwodu $2x + 2y = ${L}$ drugi bok to $y = ${h} - x$.`, T`$P(x) = x \cdot (${h} - x) = -x^2 + ${h}x$.`],
    trap: T`Z obwodu wynika $x + y = ${h}$, a nie $x + y = ${L}$. Najpierw podziel obwód przez $2$.`,
    tip: 'Pierwszy krok każdego zadania optymalizacyjnego: wyraź jedną wielkość przez drugą, korzystając z warunku z treści.'
  });
};
const perimSideForMax = (r) => {
  const L = r.int(3, 30) * 4;
  const wall = r.bool();
  // przy murze: 2x + y = L, P = x(L - 2x), max dla x = L/4, y = L/2
  const askY = r.bool();
  const v = wall ? (askY ? L / 2 : L / 4) : L / 4;
  return mc({
    title: wall ? 'Ogrodzenie przy murze: optymalny wymiar' : 'Optymalny bok prostokąta',
    q: wall
      ? T`Prostokątny wybieg przylega jednym bokiem do muru, a pozostałe trzy boki ogrodzono siatką o łącznej długości $${L}$ m. Boki prostopadłe do muru mają długość $x$. Pole wybiegu jest największe, gdy bok ${askY ? 'równoległy do muru ma długość' : 'prostopadły do muru ma długość'}`
      : T`Obwód prostokąta jest równy $${L}$ cm. Pole tego prostokąta jest największe, gdy każdy z jego boków ma długość`,
    ok: `$${d2(v)}$ ${wall ? 'm' : 'cm'}`,
    val: v,
    bad: nOpts(v, wall ? [L / 4, L / 2, L / 3, L / 6, L / 8, L] : [L / 2, L / 8, L / 3, L, L / 6], wall ? 'm' : 'cm'),
    steps: wall
      ? [T`Warunek: $2x + y = ${L}$, więc $y = ${L} - 2x$.`, T`$P(x) = x(${L} - 2x) = -2x^2 + ${L}x$; wierzchołek: $x = \frac{${L}}{4} = ${d2(L / 4)}$.`, T`Wtedy $y = ${L} - 2 \cdot ${d2(L / 4)} = ${d2(L / 2)}$.`]
      : [T`Boki: $x$ i $${L / 2} - x$; $P(x) = -x^2 + ${L / 2}x$.`, T`Wierzchołek: $x = ${d2(L / 4)}$, drugi bok: $${L / 2} - ${d2(L / 4)} = ${d2(L / 4)}$.`],
    trap: wall ? T`Przy murze siatka idzie tylko na trzy boki, więc optymalny wybieg NIE jest kwadratem: bok równoległy do muru jest dwa razy dłuższy.` : T`Bok optymalnego prostokąta to ćwierć obwodu, nie połowa.`,
    tip: TIP_OPT
  });
};
const perimWallArea = (r) => {
  const L = r.int(2, 30) * 4;
  const v = (L * L) / 8;
  return num({
    title: 'Ogrodzenie przy murze: największe pole',
    q: T`Prostokątny ogródek przylega jednym bokiem do ściany budynku. Pozostałe trzy boki ogrodzono płotem o łącznej długości $${L}$ m. Oblicz największe możliwe pole takiego ogródka (w m²). Wpisz liczbę.`,
    ans: v,
    steps: [T`Boki prostopadłe do ściany: $x$, bok równoległy: $y$. Warunek: $2x + y = ${L}$, czyli $y = ${L} - 2x$, gdzie $0 < x < ${L / 2}$.`, T`$P(x) = x(${L} - 2x) = -2x^2 + ${L}x$. Wierzchołek: $x = -\frac{${L}}{2 \cdot (-2)} = ${L / 4}$.`, T`$P_{\max} = ${L / 4} \cdot ${L / 2} = ${v}$.`],
    trap: T`Płot biegnie wzdłuż trzech boków, więc warunek to $2x + y = ${L}$, a nie $2x + 2y = ${L}$.`,
    tip: TIP_OPT
  });
};

// ---------- 15.2 Dziedzina i wierzchołek funkcji-modelu ----------
const modelDomain = (r) => {
  const a = r.int(1, 4);
  const L = a * r.int(4, 20);
  const hi = L / a;
  return mc({
    title: 'Dziedzina funkcji opisującej pole',
    q: T`Pole prostokąta o bokach długości $x$ oraz $${L} - ${a === 1 ? '' : a}x$ opisuje funkcja $P(x) = x(${L} - ${a === 1 ? '' : a}x)$. Dziedziną tej funkcji (wynikającą z warunków zadania) jest przedział`,
    ok: m(iv.oo(0, hi)),
    bad: [m(iv.cc(0, hi)), m(iv.oo(0, L)), m(iv.ro(0)), m(iv.oo(0, 2 * hi)), m(iv.oo(-hi, hi))],
    steps: [T`Długości boków muszą być dodatnie: $x > 0$ oraz $${L} - ${a === 1 ? '' : a}x > 0$.`, T`Z drugiego warunku: $${a === 1 ? '' : a}x < ${L}$, czyli $x < ${hi}$.`, T`Dziedzina: $${iv.oo(0, hi)}$.`],
    trap: T`Końce przedziału nie należą do dziedziny – dla $x = 0$ lub $x = ${hi}$ jeden z boków miałby długość zero i prostokąt by nie istniał.`,
    tip: 'W zadaniu optymalizacyjnym dziedzinę wyznaczają warunki „z życia”: długości muszą być dodatnie.'
  });
};
const modelVertex = (r) => {
  const a = -r.int(1, 4);
  const p = r.int(2, 15);
  const b = -2 * a * p;
  const q = a * p * p + b * p;
  const askX = r.bool();
  return mc({
    title: askX ? 'Argument, dla którego pole jest największe' : 'Największa wartość funkcji pola',
    q: T`Pole pewnej figury opisuje funkcja $P(x) = ${quad(a, b, 0)}$ określona dla $x \in ${iv.oo(0, 2 * p)}$. ${askX ? 'Pole jest największe dla $x$ równego' : 'Największe możliwe pole tej figury jest równe'}`,
    ok: m(askX ? p : q),
    val: askX ? p : q,
    bad: nOpts(askX ? p : q, askX ? [2 * p, b, q, p / 2, -a] : [p, b, 2 * q, q / 2, a * p * p * -1, b * p]),
    steps: [T`$a = ${a} < 0$, więc ramiona paraboli są skierowane w dół i funkcja ma wartość największą w wierzchołku.`, T`$x = -\frac{b}{2a} = -\frac{${b}}{2 \cdot (${a})} = ${p}$ – liczba ta należy do dziedziny.`, ...(askX ? [] : [T`$P(${p}) = ${a} \cdot ${p * p} + ${b} \cdot ${p} = ${q}$.`])],
    trap: askX ? T`Pytają o argument ($x = ${p}$), a nie o samo pole ($${q}$).` : T`Pytają o największe POLE, czyli o wartość $P(${p}) = ${q}$, a nie o argument $x = ${p}$.`,
    tip: TIP_OPT
  });
};
const modelSecondDimension = (r) => {
  const k = r.int(1, 3);
  const y0 = r.int(2, 12);
  const L = 4 * k * y0;
  // boki: x i (L - kx)... P = x(L - kx), max dla x = L/(2k), y = L/2
  const x = L / (2 * k);
  const y = L / 2;
  need(Number.isInteger(x));
  return mc({
    title: 'Drugi wymiar figury optymalnej',
    q: T`Wymiary prostokąta spełniają warunek $${k === 1 ? '' : k}x + y = ${L}$, gdzie $x > 0$ i $y > 0$. Pole tego prostokąta jest największe, gdy`,
    ok: `$x = ${x}$ i $y = ${y}$`,
    bad: [`$x = ${y}$ i $y = ${x}$`, `$x = ${x}$ i $y = ${x}$`, `$x = ${L / (k + 1) === x ? x + 1 : fr(L, k + 1)}$ i $y = ${fr(L, k + 1)}$`, `$x = ${x / 2}$ i $y = ${L - (k * x) / 2}$`, `$x = ${y}$ i $y = ${y}$`].filter((o) => o !== `$x = ${x}$ i $y = ${y}$`),
    steps: [T`$y = ${L} - ${k === 1 ? '' : k}x$, więc $P(x) = x(${L} - ${k === 1 ? '' : k}x) = ${quad(-k, L, 0)}$.`, T`Wierzchołek: $x = -\frac{${L}}{2 \cdot (${-k})} = ${x}$.`, T`$y = ${L} - ${k} \cdot ${x} = ${y}$.`],
    trap: T`Po znalezieniu $x$ trzeba jeszcze wrócić do warunku z treści i policzyć $y$. Optymalne wymiary nie muszą być równe.`,
    tip: 'Odpowiedź w zadaniu optymalizacyjnym to zwykle komplet wymiarów – policz wszystkie, o które pytają.'
  });
};
const modelStatements = (r) => {
  const L = r.int(3, 20) * 4;
  const claimX = r.bool() ? L / 4 : L / 2;
  const claimDomainClosed = r.bool();
  return pf({
    title: 'Prawda czy fałsz: model optymalizacyjny',
    q: T`Prostokąt ma obwód $${L}$ i bok długości $x$. Jego pole opisuje funkcja $P(x) = -x^2 + ${L / 2}x$.`,
    s1: [T`Pole prostokąta jest największe dla $x = ${claimX}$.`, claimX === L / 4, T`wierzchołek paraboli: $x = \frac{${L / 2}}{2} = ${L / 4}$. Zdanie jest ${claimX === L / 4 ? 'prawdziwe' : 'fałszywe'}.`],
    s2: [T`Dziedziną funkcji $P$ jest przedział $${claimDomainClosed ? iv.cc(0, L / 2) : iv.oo(0, L / 2)}$.`, !claimDomainClosed, T`oba boki muszą mieć dodatnią długość, więc $0 < x < ${L / 2}$ (bez końców). Zdanie jest ${claimDomainClosed ? 'fałszywe' : 'prawdziwe'}.`],
    trap: 'Dziedzina modelu jest przedziałem otwartym: dla skrajnych wartości x figura „znika”.',
    tip: TIP_OPT
  });
};

// ---------- 15.3 Ogrodzenia z przegrodami ----------
const pensModel = (r, n) => {
  // n identycznych wybiegów obok siebie: 2 długie boki po n*x, (n+1) odcinków y
  const k = r.int(1, 6);
  const L = 4 * n * (n + 1) * k;
  const x = L / (4 * n);
  const y = L / (2 * (n + 1));
  return { L, x, y, area: n * x * y };
};
const pensThree = (r) => {
  const n = r.pick([2, 3, 4]);
  const { L, x, y, area } = pensModel(r, n);
  const ask = r.pick(['x', 'y', 'P']);
  const word = { 2: 'dwa identyczne', 3: 'trzy identyczne', 4: 'cztery identyczne' }[n];
  const base = T`Z siatki o długości $${L}$ m należy zbudować ogrodzenie wydzielające ${word} prostokątne wybiegi o wspólnych ścianach wewnętrznych, ustawione w jednym rzędzie. Każdy wybieg ma wymiary $x$ (wzdłuż rzędu) na $y$.`;
  const steps = [
    T`Siatka: dwa długie boki po $${n}x$ oraz $${n + 1}$ ${n + 1 < 5 ? 'odcinki' : 'odcinków'} długości $y$, czyli $${2 * n}x + ${n + 1}y = ${L}$. Stąd $y = \frac{${L} - ${2 * n}x}{${n + 1}}$.`,
    T`Łączne pole: $P(x) = ${n}x \cdot \frac{${L} - ${2 * n}x}{${n + 1}} = ${fr(-2 * n * n, n + 1)}x^2 + ${fr(n * L, n + 1)}x$. Wierzchołek: $x = \frac{${L}}{${4 * n}} = ${d2(x)}$.`,
    T`$y = \frac{${L} - ${2 * n} \cdot ${d2(x)}}{${n + 1}} = ${d2(y)}$, a łączne pole to $${n} \cdot ${d2(x)} \cdot ${d2(y)} = ${d2(area)}$.`
  ];
  const trap = T`Ściany wewnętrzne są wspólne, więc odcinków długości $y$ jest $${n + 1}$, a nie $${2 * n}$.`;
  if (ask === 'P' && r.bool())
    return num({ title: 'Wybiegi o wspólnych ścianach: największe pole', q: `${base} Oblicz największą możliwą sumę pól tych wybiegów (w m²). Wpisz liczbę.`, ans: area, steps, trap, tip: TIP_OPT });
  const v = { x, y, P: area }[ask];
  return mc({
    title: ask === 'P' ? 'Wybiegi o wspólnych ścianach: największe pole' : 'Wybiegi o wspólnych ścianach: optymalny wymiar',
    q: `${base} ${ask === 'P' ? 'Największa możliwa suma pól tych wybiegów jest równa' : `Suma pól wybiegów jest największa, gdy wymiar $${ask}$ jest równy`}`,
    ok: `$${d2(v)}$ ${ask === 'P' ? 'm²' : 'm'}`,
    val: v,
    bad: nOpts(v, ask === 'x' ? [y, L / (2 * n), L / 4, x * 2, x / 2, n * x] : ask === 'y' ? [x, L / (n + 1), L / 4, y * 2, y / 2, n * x] : [x * y, area * 2, area / 2, (L / 4) ** 2, n * x * x, area + L], ask === 'P' ? 'm²' : 'm'),
    steps,
    trap,
    tip: TIP_OPT
  });
};
const pensEquation = (r) => {
  const n = r.pick([2, 3, 4]);
  const k = r.int(1, 6);
  const L = 4 * n * (n + 1) * k;
  const word = { 2: 'dwa', 3: 'trzy', 4: 'cztery' }[n];
  return mc({
    title: 'Równanie opisujące długość ogrodzenia',
    q: T`Z siatki o długości $${L}$ m buduje się ogrodzenie wydzielające ${word} identyczne prostokątne wybiegi o wspólnych ścianach wewnętrznych, ustawione w jednym rzędzie. Każdy wybieg ma wymiary $x$ (wzdłuż rzędu) na $y$. Zależność między $x$ i $y$ opisuje równanie`,
    ok: m(`${2 * n}x + ${n + 1}y = ${L}`),
    bad: [m(`${2 * n}x + ${2 * n}y = ${L}`), m(`${n}x + ${n + 1}y = ${L}`), m(`2x + 2y = ${L}`), m(`${2 * n}x + ${n}y = ${L}`), m(`${n}xy = ${L}`)],
    steps: [T`Wzdłuż rzędu biegną dwa boki, każdy o długości $${n}x$: razem $${2 * n}x$.`, T`W poprzek stoją dwie ściany zewnętrzne i ${n - 1 === 1 ? 'jedna wewnętrzna' : `$${n - 1}$ wewnętrzne`}: razem $${n + 1}$ ${n + 1 < 5 ? 'odcinki' : 'odcinków'} długości $y$.`, T`$${2 * n}x + ${n + 1}y = ${L}$.`],
    trap: T`Wspólnej ściany nie liczymy podwójnie. Odcinków $y$ jest o jeden więcej niż wybiegów.`,
    tip: 'Narysuj schemat z góry i policz odcinki każdego rodzaju – to najważniejszy krok całego zadania.'
  });
};
const pensPartition = (r) => {
  const k = r.int(1, 10);
  const L = 12 * k;
  // prostokąt z jedną przegrodą równoległą do boku y: 2x + 3y = L, P = xy -> x = L/4, y = L/6
  const x = L / 4;
  const y = L / 6;
  const ask = r.pick(['x', 'y', 'P']);
  const v = { x, y, P: x * y }[ask];
  const steps = [T`Siatka: dwa boki długości $x$ i trzy odcinki długości $y$ (dwa boki i przegroda): $2x + 3y = ${L}$, więc $x = ${L / 2} - \frac{3}{2}y$.`, T`$P(y) = \left(${L / 2} - \frac{3}{2}y\right) \cdot y = -\frac{3}{2}y^2 + ${L / 2}y$. Wierzchołek: $y = \frac{${L / 2}}{3} = ${d2(y)}$.`, T`$x = ${L / 2} - \frac{3}{2} \cdot ${d2(y)} = ${d2(x)}$, pole: $${d2(x)} \cdot ${d2(y)} = ${d2(x * y)}$.`];
  if (ask === 'P' && r.bool())
    return num({ title: 'Działka z przegrodą: największe pole', q: T`Prostokątną działkę o wymiarach $x$ na $y$ ogrodzono i podzielono na dwie części przegrodą równoległą do boku o długości $y$. Na ogrodzenie i przegrodę zużyto łącznie $${L}$ m siatki. Oblicz największe możliwe pole tej działki (w m²). Wpisz liczbę.`, ans: x * y, steps, trap: T`Przegroda też zużywa siatkę: odcinków długości $y$ jest trzy, nie dwa.`, tip: TIP_OPT });
  return mc({
    title: ask === 'P' ? 'Działka z przegrodą: największe pole' : 'Działka z przegrodą: optymalny wymiar',
    q: T`Prostokątną działkę o wymiarach $x$ na $y$ ogrodzono i podzielono na dwie części przegrodą równoległą do boku o długości $y$. Na ogrodzenie i przegrodę zużyto łącznie $${L}$ m siatki. ${ask === 'P' ? 'Największe możliwe pole tej działki jest równe' : `Pole działki jest największe, gdy wymiar $${ask}$ jest równy`}`,
    ok: `$${d2(v)}$ ${ask === 'P' ? 'm²' : 'm'}`,
    val: v,
    bad: nOpts(v, ask === 'x' ? [y, L / 5, L / 2, x / 2, L / 3, x + y] : ask === 'y' ? [x, L / 5, L / 3, y / 2, L / 4 === x ? L / 8 : L / 4, x + y] : [(L / 4) ** 2, x * y * 2, (x * y) / 2, (L / 5) ** 2, x * x, L * 2], ask === 'P' ? 'm²' : 'm'),
    steps,
    trap: T`Przegroda też zużywa siatkę: odcinków długości $y$ jest trzy, nie dwa. Dlatego działka o największym polu nie jest kwadratem.`,
    tip: TIP_OPT
  });
};

// ---------- 15.4 Przychód i cena ----------
const revenue = (r) => {
  const p = r.pick([20, 24, 30, 36, 40, 50, 60]);
  const k = r.pick([2, 4, 5, 10]);
  const n = k * r.int(2, 12);
  // obniżka o x zł: (p - x)(n + kx) -> x* = (kp - n)/(2k)
  const x = (k * p - n) / (2 * k);
  need(x > 0 && x < p && Number.isInteger(x));
  const price = p - x;
  const rev = (p - x) * (n + k * x);
  const ask = r.pick(['x', 'price', 'rev']);
  const item = r.pick(['kubków', 'koszulek', 'plakatów', 'notesów', 'breloków']);
  const base = T`Sklep sprzedaje dziennie $${n}$ ${item} po $${p}$ zł za sztukę. Badanie rynku pokazało, że każda obniżka ceny o $1$ zł zwiększa dzienną sprzedaż o $${k}$ ${k < 5 ? 'sztuki' : 'sztuk'}.`;
  const steps = [T`Po obniżce ceny o $x$ zł cena to $${p} - x$, a sprzedaż $${n} + ${k}x$. Przychód: $D(x) = (${p} - x)(${n} + ${k}x)$.`, T`Miejsca zerowe: $x = ${p}$ oraz $x = ${fr(-n, k)}$, więc wierzchołek leży pośrodku: $x = \frac{${p} + \left(${fr(-n, k)}\right)}{2} = ${d2(x)}$.`, T`Cena: $${p} - ${d2(x)} = ${d2(price)}$ zł, sprzedaż: $${n + k * x}$ sztuk, przychód: $${d2(rev)}$ zł.`];
  const trap = T`Przychód to cena razy liczba sprzedanych sztuk – obie te wielkości zmieniają się jednocześnie, więc powstaje funkcja kwadratowa.`;
  if (ask === 'rev' && r.bool()) return num({ title: 'Największy dzienny przychód', q: `${base} Oblicz największy możliwy dzienny przychód sklepu ze sprzedaży tych ${item} (w zł). Wpisz liczbę.`, ans: rev, steps, trap, tip: TIP_OPT });
  const v = { x, price, rev }[ask];
  return mc({
    title: ask === 'rev' ? 'Największy dzienny przychód' : ask === 'x' ? 'Optymalna obniżka ceny' : 'Optymalna cena',
    q: `${base} ${ask === 'x' ? 'Dzienny przychód będzie największy, gdy cenę obniży się o' : ask === 'price' ? 'Dzienny przychód będzie największy przy cenie' : 'Największy możliwy dzienny przychód jest równy'}`,
    ok: `$${d2(v)}$ zł`,
    val: v,
    bad: nOpts(v, ask === 'x' ? [price, p / 2, x * 2, x / 2, n / k, x + 1] : ask === 'price' ? [x, p / 2, price + 1, price - 1, p - 2 * x > 0 ? p - 2 * x : price + 2, p] : [p * n, rev / 2, price * n, rev + p, p * (n + k * x), rev - k], 'zł'),
    steps,
    trap,
    tip: 'Funkcję w postaci iloczynowej najwygodniej optymalizować przez miejsca zerowe: wierzchołek leży dokładnie w połowie między nimi.'
  });
};
const revenueFormula = (r) => {
  const p = r.pick([20, 30, 40, 50, 80, 100]);
  const k = r.pick([2, 3, 5, 10]);
  const n = r.pick([40, 60, 100, 120, 200]);
  const up = r.bool();
  const ctx = up ? T`Organizator sprzedaje $${n}$ biletów po $${p}$ zł. Każda podwyżka ceny o $1$ zł zmniejsza liczbę sprzedanych biletów o $${k}$.` : T`Księgarnia sprzedaje tygodniowo $${n}$ egzemplarzy poradnika po $${p}$ zł. Każda obniżka ceny o $1$ zł zwiększa tygodniową sprzedaż o $${k}$ ${k < 5 ? 'egzemplarze' : 'egzemplarzy'}.`;
  const f = (s1, s2, a = p, b = n, kk = k) => m(`D(x) = (${a} ${s1} x)(${b} ${s2} ${kk}x)`);
  return mc({
    title: 'Wzór funkcji przychodu',
    q: `${ctx} Przychód $D$ po ${up ? 'podwyżce' : 'obniżce'} ceny o $x$ zł opisuje wzór`,
    ok: up ? f('+', '-') : f('-', '+'),
    bad: [up ? f('-', '+') : f('+', '-'), up ? f('+', '+') : f('-', '-'), m(`D(x) = ${p}x \\cdot ${n}`), up ? f('+', '-', n, p) : f('-', '+', n, p), up ? f('+', '-', p, n, 1) : f('-', '+', p, n, 1)],
    steps: [up ? T`Nowa cena: $${p} + x$. Nowa liczba biletów: $${n} - ${k}x$.` : T`Nowa cena: $${p} - x$. Nowa sprzedaż: $${n} + ${k}x$.`, T`Przychód to iloczyn ceny i liczby sprzedanych sztuk.`],
    trap: T`Cena i sprzedaż zmieniają się w przeciwnych kierunkach: gdy jedna rośnie, druga maleje. W jednym nawiasie jest plus, w drugim minus.`,
    tip: 'Przychód = cena · liczba sprzedanych sztuk. Zapisz osobno nową cenę i nową sprzedaż, potem pomnóż.'
  });
};
const revenueRooms = (r) => {
  const rooms = r.pick([40, 50, 60, 80, 100]);
  const p = r.pick([100, 120, 150, 200]);
  const step = r.pick([5, 10]);
  // podwyżka o step*x zł zwalnia x pokoi: (p + step x)(rooms - x), x* = (rooms*step - p)/(2 step)
  const x = (rooms * step - p) / (2 * step);
  need(x > 0 && x < rooms && Number.isInteger(x));
  const price = p + step * x;
  const rev = price * (rooms - x);
  const ask = r.pick(['price', 'rev', 'occ']);
  const v = { price, rev, occ: rooms - x }[ask];
  return mc({
    title: ask === 'rev' ? 'Największy przychód hotelu' : ask === 'price' ? 'Optymalna cena pokoju' : 'Liczba wynajętych pokoi przy największym przychodzie',
    q: T`Hotel ma $${rooms}$ pokoi. Przy cenie $${p}$ zł za dobę wszystkie są wynajęte. Każda podwyżka ceny o $${step}$ zł powoduje, że jeden pokój więcej pozostaje pusty. ${ask === 'price' ? 'Dobowy przychód hotelu będzie największy przy cenie' : ask === 'rev' ? 'Największy możliwy dobowy przychód hotelu jest równy' : 'Dobowy przychód hotelu będzie największy, gdy liczba wynajętych pokoi będzie równa'}`,
    ok: ask === 'occ' ? m(v) : `$${v}$ zł`,
    val: v,
    bad: ask === 'occ' ? nOpts(v, [x, rooms, rooms / 2, v + 5, v - 5, rooms - 2 * x > 0 ? rooms - 2 * x : v + 10]) : nOpts(v, ask === 'price' ? [p, price + step, price - step, p + step * rooms / 2, p + x, 2 * p] : [p * rooms, rev / 2, price * rooms, rev + p, rev - step * x, p * (rooms - x)], 'zł'),
    steps: [T`Po $x$ podwyżkach cena to $${p} + ${step}x$, a wynajętych pokoi jest $${rooms} - x$. Przychód: $D(x) = (${p} + ${step}x)(${rooms} - x)$.`, T`Miejsca zerowe: $x = ${rooms}$ oraz $x = ${-p / step}$; wierzchołek: $x = \frac{${rooms} + (${-p / step})}{2} = ${x}$.`, T`Cena: $${price}$ zł, wynajętych pokoi: $${rooms - x}$, przychód: $${rev}$ zł.`],
    trap: T`Największy przychód nie oznacza ani pełnego hotelu, ani najwyższej ceny – optimum leży „pośrodku”.`,
    tip: 'Funkcję w postaci iloczynowej najwygodniej optymalizować przez miejsca zerowe: wierzchołek leży dokładnie w połowie między nimi.'
  });
};

// ---------- 15.5 Zadania liczbowe i pełne rozwiązanie ----------
const numProductMax = (r) => {
  const S = r.int(4, 40) * 2;
  const v = (S / 2) ** 2;
  if (r.bool())
    return num({
      title: 'Największy iloczyn przy stałej sumie',
      q: T`Suma dwóch liczb rzeczywistych jest równa $${S}$. Oblicz największą możliwą wartość iloczynu tych liczb. Wpisz liczbę.`,
      ans: v,
      steps: [T`Liczby: $x$ oraz $${S} - x$. Iloczyn: $f(x) = x(${S} - x) = -x^2 + ${S}x$.`, T`Wierzchołek: $x = \frac{${S}}{2} = ${S / 2}$.`, T`$f(${S / 2}) = ${S / 2} \cdot ${S / 2} = ${v}$.`],
      trap: T`Iloczyn jest największy, gdy liczby są RÓWNE – a nie gdy jedna jest jak największa.`,
      tip: TIP_OPT
    });
  return mc({
    title: 'Największy iloczyn przy stałej sumie',
    q: T`Suma dwóch liczb rzeczywistych jest równa $${S}$. Iloczyn tych liczb jest największy, gdy liczby te są równe`,
    ok: `$${S / 2}$ i $${S / 2}$`,
    bad: [`$${S}$ i $0$`, `$${S - 1}$ i $1$`, `$${S / 2 + 1}$ i $${S / 2 - 1}$`, `$${S}$ i $${S}$`],
    steps: [T`Liczby: $x$ oraz $${S} - x$. Iloczyn: $f(x) = -x^2 + ${S}x$.`, T`Wierzchołek: $x = ${S / 2}$, druga liczba: $${S} - ${S / 2} = ${S / 2}$.`],
    trap: T`Para $${S / 2 + 1}$ i $${S / 2 - 1}$ daje iloczyn $${(S / 2 + 1) * (S / 2 - 1)}$ – o $1$ mniejszy niż $${v}$.`,
    tip: TIP_OPT
  });
};
const numSumSquaresMin = (r) => {
  const S = r.int(2, 30) * 2;
  const v = (S * S) / 2;
  return mc({
    title: 'Najmniejsza suma kwadratów',
    q: T`Suma dwóch liczb rzeczywistych jest równa $${S}$. Najmniejsza możliwa wartość sumy kwadratów tych liczb jest równa`,
    ok: m(v),
    val: v,
    bad: nOpts(v, [S * S, (S * S) / 4, 2 * S, v + S, S * S * 2, (S / 2) ** 2 + 1]),
    steps: [T`Liczby: $x$ oraz $${S} - x$. Suma kwadratów: $f(x) = x^2 + (${S} - x)^2 = 2x^2 - ${2 * S}x + ${S * S}$.`, T`$a = 2 > 0$, więc wartość najmniejsza jest w wierzchołku: $x = \frac{${2 * S}}{4} = ${S / 2}$.`, T`$f(${S / 2}) = ${(S / 2) ** 2} + ${(S / 2) ** 2} = ${v}$.`],
    trap: T`Tym razem ramiona paraboli idą w GÓRĘ, więc w wierzchołku jest wartość NAJMNIEJSZA. Zawsze sprawdź znak współczynnika $a$.`,
    tip: 'Dla $a > 0$ wierzchołek daje wartość najmniejszą, dla $a < 0$ – największą.'
  });
};
const numWeighted = (r) => {
  const k = r.pick([2, 3, 4]);
  const S = 2 * k * r.int(1, 10);
  // x + k y = S, max xy: x = S/2, y = S/(2k)
  const x = S / 2;
  const y = S / (2 * k);
  const v = x * y;
  const ask = r.bool();
  return mc({
    title: 'Największy iloczyn przy warunku liniowym',
    q: T`Liczby dodatnie $x$ i $y$ spełniają warunek $x + ${k}y = ${S}$. ${ask ? 'Największa możliwa wartość iloczynu $xy$ jest równa' : 'Iloczyn $xy$ jest największy dla $y$ równego'}`,
    ok: m(ask ? v : y),
    val: ask ? v : y,
    bad: nOpts(ask ? v : y, ask ? [(S / 2) ** 2, (S / (k + 1)) ** 2, v * 2, v / 2, S * S / 4 / k / k, v + k] : [x, S / (k + 1), S / k, y * 2, y / 2, S / 2 / (k + 1)]),
    steps: [T`$x = ${S} - ${k}y$, więc $f(y) = (${S} - ${k}y) \cdot y = -${k}y^2 + ${S}y$.`, T`Wierzchołek: $y = \frac{${S}}{${2 * k}} = ${y}$; wtedy $x = ${S} - ${k} \cdot ${y} = ${x}$.`, T`$xy = ${x} \cdot ${y} = ${v}$.`],
    trap: T`Liczby $x$ i $y$ nie są tu równe – współczynnik $${k}$ przy $y$ sprawia, że optymalne $x$ jest $${k}$ razy większe od $y$.`,
    tip: TIP_OPT
  });
};
const numInscribedRect = (r) => {
  const a = r.int(2, 15) * 2;
  const b = r.int(2, 15) * 2;
  const v = (a * b) / 4;
  return mc({
    title: 'Prostokąt wpisany w trójkąt prostokątny',
    q: T`W trójkąt prostokątny o przyprostokątnych długości $${a}$ i $${b}$ wpisano prostokąt tak, że dwa jego boki leżą na przyprostokątnych, a jeden wierzchołek na przeciwprostokątnej. Największe możliwe pole takiego prostokąta jest równe`,
    ok: m(v),
    val: v,
    bad: nOpts(v, [(a * b) / 2, (a * b) / 8, (a * b) / 3, a * b, v + a, ((a + b) / 4) ** 2]),
    steps: [T`Niech bok prostokąta na przyprostokątnej długości $${a}$ ma długość $x$. Z podobieństwa trójkątów drugi bok to $y = ${b} - ${fr(b, a)}x$.`.replace('- 1x', '- x'), T`$P(x) = x\left(${b} - ${fr(b, a)}x\right)$; miejsca zerowe: $0$ i $${a}$, więc wierzchołek: $x = ${a / 2}$.`.replace('- 1x', '- x'), T`$y = ${b / 2}$, $P_{\max} = ${a / 2} \cdot ${b / 2} = ${v}$ – to połowa pola trójkąta.`],
    trap: T`Największy prostokąt zajmuje połowę pola trójkąta ($\frac{1}{2} \cdot \frac{${a} \cdot ${b}}{2}$), a nie cały trójkąt.`,
    tip: 'Gdy funkcja ma postać $x \\cdot (\\ldots)$, jej miejsca zerowe widać od razu, a wierzchołek leży w połowie między nimi.'
  });
};
const SCHEME = [
  ['Wprowadzenie oznaczeń i zapisanie zależności między zmiennymi wynikającej z treści zadania', 1],
  ['Zapisanie optymalizowanej wielkości jako funkcji jednej zmiennej', 2],
  ['Wyznaczenie dziedziny tej funkcji', 3],
  ['Obliczenie pierwszej współrzędnej wierzchołka paraboli i sprawdzenie, czy należy do dziedziny', 4],
  ['Obliczenie pozostałych wielkości i zapisanie odpowiedzi', 5]
];
const schemeOrder = (r) => {
  const i = r.int(0, 3);
  const variants = [
    T`W rozwiązaniu zadania optymalizacyjnego bezpośrednio po kroku „${SCHEME[i][0]}” należy wykonać krok:`,
    T`Rozwiązujesz zadanie optymalizacyjne za 4 punkty. Właśnie wykonałeś krok: „${SCHEME[i][0]}”. Kolejnym krokiem jest:`,
    T`W typowym schemacie rozwiązania zadania optymalizacyjnego krok „${SCHEME[i][0]}” poprzedza bezpośrednio krok:`,
    T`Który krok rozwiązania zadania optymalizacyjnego następuje zaraz po kroku „${SCHEME[i][0]}”?`,
    T`Uczeń rozwiązuje zadanie optymalizacyjne i ma już za sobą etap „${SCHEME[i][0]}”. Co powinien zrobić w następnej kolejności?`
  ];
  const ok = SCHEME[i + 1][0];
  return mc({
    title: 'Schemat rozwiązania zadania optymalizacyjnego',
    q: r.pick(variants),
    ask: true,
    ok,
    bad: r.shuffle(SCHEME.filter((_, j) => j !== i && j !== i + 1).map((s) => s[0])).slice(0, 3),
    steps: [T`Kolejność kroków: 1) oznaczenia i zależność między zmiennymi, 2) funkcja jednej zmiennej, 3) dziedzina, 4) wierzchołek i sprawdzenie, czy należy do dziedziny, 5) pozostałe wielkości i odpowiedź.`, T`Po kroku $${i + 1}$ następuje krok $${i + 2}$.`],
    trap: 'Najczęściej pomijane kroki to dziedzina oraz sprawdzenie, czy wierzchołek do niej należy – każdy z nich to osobny punkt.',
    tip: 'Zadanie optymalizacyjne za 4 pkt: model (1 pkt), dziedzina (1 pkt), wierzchołek (1 pkt), odpowiedź (1 pkt).'
  });
};
const numDifferenceMin = (r) => {
  const d = r.int(2, 30) * 2;
  const v = -((d / 2) ** 2);
  return mc({
    title: 'Najmniejszy iloczyn przy stałej różnicy',
    q: T`Różnica dwóch liczb rzeczywistych jest równa $${d}$. Najmniejsza możliwa wartość iloczynu tych liczb jest równa`,
    ok: m(v),
    val: v,
    bad: [m(-v), m(0), m(-d * d), m(-d), m(v / 2), m(-(d * d) / 2)].filter((o) => o !== m(v)),
    steps: [T`Liczby: $x$ oraz $x + ${d}$. Iloczyn: $f(x) = x(x + ${d}) = x^2 + ${d}x$.`, T`$a = 1 > 0$, więc wartość najmniejsza jest w wierzchołku: $x = -\frac{${d}}{2} = ${-d / 2}$.`, T`$f(${-d / 2}) = ${-d / 2} \cdot ${d / 2} = ${v}$.`],
    trap: T`Iloczyn może być ujemny – gdy liczby mają różne znaki. Najmniejsza wartość to $${v}$, a nie $0$.`,
    tip: 'Dla $a > 0$ wierzchołek daje wartość najmniejszą, dla $a < 0$ – największą.'
  });
};

export default {
  numericId: 15,
  title: 'Optymalizacja',
  short_title: 'Optymalizacja',
  description: 'Zadania optymalizacyjne rozwiązywane za pomocą funkcji kwadratowej: pola, ogrodzenia, przychód i zadania liczbowe.',
  icon: 'Target',
  color: '#EA580C',
  matura_points_range: '4 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 7–8',
  lessons: [
    {
      title: 'Funkcja pola przy stałym obwodzie',
      short_title: 'Pole przy stałym obwodzie',
      pill: pill({
        essence: T`Zadanie optymalizacyjne pyta o wartość największą albo najmniejszą jakiejś wielkości przy pewnym ograniczeniu. Na poziomie podstawowym zawsze kończy się ono funkcją kwadratową. Najprostszy przypadek: prostokąt o stałym obwodzie. Z obwodu wyznaczasz jeden bok przez drugi, wstawiasz do wzoru na pole i dostajesz parabolę o ramionach w dół – jej wierzchołek to odpowiedź.`,
        context: 'Ostatnie zadanie arkusza • 4 pkt. Zadanie optymalizacyjne jest w każdym arkuszu od 2023 roku.',
        pl: T`Masz $20$ metrów płotu i chcesz ogrodzić jak największy prostokąt. Długi i wąski? Mało miejsca. Kwadrat $5 \times 5$? $25$ m² – najwięcej, ile się da. Matematyka potwierdza to, co podpowiada intuicja: „najrówniej” znaczy „najwięcej”.`,
        steps: [
          ['Oznacz boki i zapisz warunek', T`Obwód $20$: $2x + 2y = 20$, czyli $y = 10 - x$.`, 'Suma sąsiednich boków to połowa obwodu.'],
          ['Zapisz pole jako funkcję x', T`$P(x) = x(10 - x) = -x^2 + 10x$, dla $0 < x < 10$.`, 'Jedna zmienna, funkcja kwadratowa.'],
          ['Znajdź wierzchołek', T`$x = -\frac{10}{2 \cdot (-1)} = 5$, $P(5) = 25$.`, 'Ramiona w dół – w wierzchołku maksimum.']
        ],
        formulas: [
          ['Warunek z obwodu', T`2x + 2y = L, \quad y = \frac{L}{2} - x`],
          ['Funkcja pola', T`P(x) = x\left(\frac{L}{2} - x\right)`],
          ['Wierzchołek', T`x = -\frac{b}{2a}`, 8]
        ],
        examples: [
          ['Prostokąt', '4 pkt', T`Z drutu długości $36$ cm wykonano prostokątną ramkę. Jakie wymiary dają największe pole?`, T`1. $2x + 2y = 36$, $y = 18 - x$, $0 < x < 18$.` + '\n' + T`2. $P(x) = -x^2 + 18x$.` + '\n' + T`3. $x = 9$, $y = 9$, $P = 81$ cm².`, 'Odpowiedź: kwadrat o boku 9 cm.'],
          ['Przy murze', '4 pkt', T`Ogródek przylega do muru, na trzy boki jest $40$ m płotu. Jakie największe pole można ogrodzić?`, T`1. $2x + y = 40$, $y = 40 - 2x$, $0 < x < 20$.` + '\n' + T`2. $P(x) = -2x^2 + 40x$.` + '\n' + T`3. $x = 10$, $y = 20$, $P = 200$ m².`, 'Przy murze optymalny kształt nie jest kwadratem.']
        ],
        trap: T`Z obwodu $L$ wynika $x + y = \frac{L}{2}$, a NIE $x + y = L$. Zapomnienie o dwójce psuje całe zadanie.`,
        fail: T`Obwód $20$: „$y = 20 - x$, więc $P(x) = x(20 - x)$”.`,
        win: T`$2x + 2y = 20$, więc $y = 10 - x$ i $P(x) = x(10 - x)$.`,
        why: 'Obwód to dwa boki x i dwa boki y – razem cztery odcinki, nie dwa.',
        ckeTip: 'Za samo poprawne zapisanie funkcji pola jednej zmiennej dostajesz pierwszy punkt – nawet jeśli dalej utkniesz.',
        points: [T`Warunek z treści pozwala pozbyć się jednej zmiennej.`, T`Pole staje się funkcją kwadratową.`, T`Maksimum jest w wierzchołku paraboli.`]
      }),
      gens: [perimMaxArea, perimAreaFormula, perimSideForMax, perimWallArea]
    },
    {
      title: 'Dziedzina modelu i wierzchołek paraboli',
      short_title: 'Dziedzina i wierzchołek',
      pill: pill({
        essence: T`Funkcja opisująca pole czy przychód nie żyje na całej osi liczbowej – ma dziedzinę wynikającą z warunków zadania: długości muszą być dodatnie, liczba sztuk nieujemna. Dziedzinę trzeba zapisać, bo to osobny punkt w schemacie oceniania. Potem liczysz pierwszą współrzędną wierzchołka i sprawdzasz, czy należy do dziedziny. Na końcu wracasz do treści i podajesz wszystkie wielkości, o które pytano.`,
        context: 'Element zadania za 4 pkt: dziedzina to 1 pkt, wierzchołek to kolejny 1 pkt.',
        pl: T`Wzór $P(x) = x(10 - x)$ „działa” dla każdej liczby, ale prostokąt o boku $-3$ albo $12$ nie istnieje. Dziedzina to lista sensownych wartości $x$. Egzaminator chce zobaczyć, że o tym pamiętasz.`,
        steps: [
          ['Zapisz warunki na długości', T`$x > 0$ oraz $10 - x > 0$.`, 'Każdy wymiar musi być dodatni.'],
          ['Wyznacz dziedzinę', T`$x \in (0, 10)$.`, 'Przedział otwarty.'],
          ['Policz wierzchołek i sprawdź', T`$x = 5 \in (0, 10)$ – w porządku.`, 'Napisz to zdanie w rozwiązaniu.']
        ],
        formulas: [
          ['Warunki', T`x > 0, \quad y > 0`],
          ['Wierzchołek', T`p = -\frac{b}{2a}, \quad q = f(p)`, 8],
          ['Z miejsc zerowych', T`p = \frac{x_1 + x_2}{2}`]
        ],
        examples: [
          ['Dziedzina', '1 pkt', T`Boki prostokąta mają długości $x$ i $24 - 3x$. Wyznacz dziedzinę funkcji pola.`, T`1. $x > 0$.` + '\n' + T`2. $24 - 3x > 0$, czyli $x < 8$.` + '\n' + T`3. $x \in (0, 8)$.`, 'Oba warunki muszą być spełnione jednocześnie.'],
          ['Optymalne wymiary', '2 pkt', T`Dla $P(x) = x(24 - 3x)$ wyznacz wymiary prostokąta o największym polu.`, T`1. Miejsca zerowe: $0$ i $8$, wierzchołek: $x = 4$.` + '\n' + T`2. Drugi bok: $24 - 12 = 12$.` + '\n' + T`3. Wymiary: $4$ na $12$.`, 'Po znalezieniu x policz drugi wymiar.']
        ],
        trap: T`Dziedzina modelu to przedział OTWARTY. Dla $x = 0$ lub $x = 10$ jeden z boków ma długość zero, więc prostokąta nie ma.`,
        fail: T`„Dziedzina: $x \in \langle 0, 10 \rangle$.”`,
        win: T`$x \in (0, 10)$.`,
        why: 'Figura o boku zerowej długości nie jest prostokątem, więc skrajne wartości trzeba wykluczyć.',
        ckeTip: 'Zdanie „x = 5 należy do dziedziny” warto zapisać wprost – w kluczu oceniania jest za nie punkt.',
        points: [T`Dziedzinę wyznaczają warunki z treści.`, T`Wierzchołek musi należeć do dziedziny.`, T`Odpowiedź to komplet wielkości z pytania.`]
      }),
      gens: [modelDomain, modelVertex, modelSecondDimension, modelStatements]
    },
    {
      title: 'Ogrodzenia z przegrodami i wspólnymi ścianami',
      short_title: 'Ogrodzenia z przegrodami',
      time: '~6 min',
      pill: pill({
        essence: T`W zadaniach o wybiegach, zagrodach i działkach z przegrodą cała trudność leży w poprawnym policzeniu odcinków siatki. Ściany wspólne liczy się raz, a przegroda zużywa siatkę tak samo jak ogrodzenie zewnętrzne. Trzy wybiegi w rzędzie to dwa długie boki i cztery ściany poprzeczne. Dalej schemat jest ten sam: warunek, funkcja pola jednej zmiennej, dziedzina, wierzchołek.`,
        context: 'Typowe zadanie za 4 pkt – taki model pojawił się m.in. na maturze w maju 2024 (trzy wybiegi, 36 m siatki).',
        pl: T`Narysuj wybiegi z lotu ptaka i przejedź palcem po każdym kawałku siatki, licząc na głos. Trzy boksy obok siebie to nie „trzy razy cztery ściany”, bo sąsiedzi dzielą ścianę. Kto policzy siatkę dobrze, ma zadanie w kieszeni.`,
        steps: [
          ['Narysuj schemat i policz odcinki', T`Trzy wybiegi $x$ na $y$: dwa boki po $3x$ i cztery odcinki $y$.`, 'Wspólne ściany liczymy raz.'],
          ['Zapisz warunek i wyznacz zmienną', T`$6x + 4y = 36$, więc $y = 9 - \frac{3}{2}x$, $0 < x < 6$.`, 'Dziedzina z warunku y > 0.'],
          ['Zoptymalizuj pole', T`$P(x) = 3x\left(9 - \frac{3}{2}x\right)$: miejsca zerowe $0$ i $6$, wierzchołek $x = 3$, $y = 4{,}5$.`, 'Łączne pole: 40,5 m².']
        ],
        formulas: [
          ['n wybiegów w rzędzie', T`2nx + (n + 1)y = L`],
          ['Łączne pole', T`P = n \cdot x \cdot y`],
          ['Działka z jedną przegrodą', T`2x + 3y = L`]
        ],
        examples: [
          ['Trzy wybiegi', '4 pkt', T`Na trzy identyczne wybiegi w rzędzie jest $36$ m siatki. Wyznacz wymiary wybiegu, przy których suma pól jest największa.`, T`1. $6x + 4y = 36$, $y = 9 - \frac{3}{2}x$.` + '\n' + T`2. $P(x) = 3xy = -\frac{9}{2}x^2 + 27x$, $0 < x < 6$.` + '\n' + T`3. $x = 3$, $y = 4{,}5$.`, 'Cztery odcinki y, nie sześć.'],
          ['Przegroda', '4 pkt', T`Działkę $x$ na $y$ ogrodzono i podzielono przegrodą równoległą do boku $y$, zużywając $60$ m siatki. Oblicz największe pole.`, T`1. $2x + 3y = 60$, $x = 30 - \frac{3}{2}y$.` + '\n' + T`2. $P(y) = -\frac{3}{2}y^2 + 30y$, wierzchołek $y = 10$.` + '\n' + T`3. $x = 15$, $P = 150$ m².`, 'Przegroda to trzeci odcinek y.']
        ],
        trap: T`Ściany WSPÓLNE liczymy raz. Trzy wybiegi w rzędzie mają $4$ ściany poprzeczne, a nie $6$.`,
        fail: T`Trzy wybiegi: „każdy ma obwód $2x + 2y$, więc $3(2x + 2y) = 36$”.`,
        win: T`$6x + 4y = 36$ – dwie ściany wewnętrzne są wspólne.`,
        why: 'Sąsiednie wybiegi dzieli jedna siatka, a nie dwie postawione obok siebie.',
        ckeTip: 'Zrób własny rysunek z podpisanymi odcinkami – w arkuszu jest tylko schemat poglądowy.',
        points: [T`Policz odcinki siatki na rysunku.`, T`Odcinków poprzecznych jest o jeden więcej niż wybiegów.`, T`Dalej: funkcja pola, dziedzina, wierzchołek.`]
      }),
      gens: [pensThree, pensEquation, pensPartition]
    },
    {
      title: 'Przychód, cena i sprzedaż',
      short_title: 'Przychód i cena',
      time: '~6 min',
      pill: pill({
        essence: T`Druga wielka rodzina zadań optymalizacyjnych dotyczy pieniędzy. Przychód to cena razy liczba sprzedanych sztuk. Gdy zmieniasz cenę o $x$ złotych, zmienia się też sprzedaż – w przeciwną stronę. Powstaje iloczyn dwóch nawiasów, np. $(40 - x)(100 + 10x)$, czyli funkcja kwadratowa w postaci iloczynowej. Jej wierzchołek leży dokładnie w połowie między miejscami zerowymi.`,
        context: 'Zadanie za 4 pkt w kontekście praktycznym – taki model pojawił się m.in. w czerwcu 2024 (ceny zestawu klocków).',
        pl: T`Tanio sprzedasz dużo, ale mało zarobisz na sztuce. Drogo – zarobisz dużo na sztuce, ale nikt nie kupi. Gdzieś pośrodku jest cena idealna. I rzeczywiście: wierzchołek paraboli leży pośrodku między dwiema „skrajnie głupimi” cenami, przy których przychód spada do zera.`,
        steps: [
          ['Zapisz nową cenę i nową sprzedaż', T`Obniżka o $x$ zł: cena $40 - x$, sprzedaż $100 + 10x$.`, 'Jedna rośnie, druga maleje.'],
          ['Zapisz przychód', T`$D(x) = (40 - x)(100 + 10x)$.`, 'Cena razy sprzedaż.'],
          ['Wierzchołek z miejsc zerowych', T`Miejsca zerowe: $40$ i $-10$; wierzchołek: $x = 15$. Cena: $25$ zł.`, 'Średnia arytmetyczna miejsc zerowych.']
        ],
        formulas: [
          ['Przychód', T`D = \text{cena} \cdot \text{liczba sztuk}`],
          ['Model', T`D(x) = (p - x)(n + kx)`],
          ['Wierzchołek z miejsc zerowych', T`x = \frac{x_1 + x_2}{2}`]
        ],
        examples: [
          ['Obniżka ceny', '4 pkt', T`Sklep sprzedaje $100$ kubków po $40$ zł. Każda obniżka o $1$ zł zwiększa sprzedaż o $10$ sztuk. Przy jakiej cenie przychód jest największy?`, T`1. $D(x) = (40 - x)(100 + 10x)$.` + '\n' + T`2. Miejsca zerowe: $40$ i $-10$; wierzchołek: $x = 15$.` + '\n' + T`3. Cena: $25$ zł, sprzedaż: $250$ sztuk, przychód: $6250$ zł.`, 'Przed obniżką przychód wynosił 4000 zł.'],
          ['Hotel', '4 pkt', T`Hotel ma $60$ pokoi po $150$ zł. Każda podwyżka o $10$ zł zwalnia jeden pokój. Jaka cena daje największy przychód?`, T`1. $D(x) = (150 + 10x)(60 - x)$.` + '\n' + T`2. Miejsca zerowe: $60$ i $-15$; wierzchołek: $x = 22{,}5$.` + '\n' + T`3. Liczba podwyżek musi być całkowita – sprawdzamy $x = 22$ i $x = 23$ (dają ten sam przychód: $14\,060$ zł).`, 'Czasem trzeba wrócić do sensu zadania.']
        ],
        trap: T`Przychód to iloczyn DWÓCH zmieniających się wielkości. Nie wolno pomnożyć nowej ceny przez starą sprzedaż.`,
        fail: T`„Po obniżce o $x$ zł przychód to $(40 - x) \cdot 100$.”`,
        win: T`$D(x) = (40 - x)(100 + 10x)$ – sprzedaż też się zmienia.`,
        why: 'Cała idea zadania polega na tym, że tańszy towar sprzedaje się lepiej.',
        ckeTip: 'Nie wymnażaj nawiasów bez potrzeby. Z postaci iloczynowej miejsca zerowe i wierzchołek masz od ręki.',
        points: [T`Przychód = cena · sprzedaż.`, T`Model: iloczyn dwóch nawiasów z $x$.`, T`Wierzchołek: w połowie między miejscami zerowymi.`]
      }),
      gens: [revenue, revenueFormula, revenueRooms]
    },
    {
      title: 'Zadania liczbowe i schemat pełnego rozwiązania',
      short_title: 'Schemat za 4 punkty',
      pill: pill({
        essence: T`Każde zadanie optymalizacyjne na poziomie podstawowym rozwiązuje się tym samym pięciostopniowym schematem: (1) oznaczenia i zależność między zmiennymi, (2) zapisanie optymalizowanej wielkości jako funkcji jednej zmiennej, (3) dziedzina, (4) wierzchołek paraboli i sprawdzenie, czy należy do dziedziny, (5) pozostałe wielkości i odpowiedź. Dotyczy to także zadań czysto liczbowych: największy iloczyn przy stałej sumie, najmniejsza suma kwadratów.`,
        context: 'Zadanie za 4 pkt. Punkty są przyznawane za kolejne etapy, więc nawet niepełne rozwiązanie daje 1–3 pkt.',
        pl: T`To zadanie wygląda groźnie, ale jest najbardziej przewidywalne w całym arkuszu – zawsze ten sam przepis. Naucz się pięciu kroków jak przepisu na jajecznicę i zbieraj punkty etap po etapie.`,
        steps: [
          ['Oznaczenia i warunek', T`Suma liczb to $20$: $x$ oraz $20 - x$.`, 'Jedna zmienna zamiast dwóch.'],
          ['Funkcja i dziedzina', T`$f(x) = x(20 - x) = -x^2 + 20x$, $x \in \mathbb{R}$ (lub przedział z treści).`, 'Zapisz dziedzinę.'],
          ['Wierzchołek i odpowiedź', T`$x = 10$, druga liczba $10$, iloczyn $100$.`, 'Odpowiedz pełnym zdaniem.']
        ],
        formulas: [
          ['Stała suma, największy iloczyn', T`x + y = S: \quad xy \le \frac{S^2}{4}`],
          ['Stała suma, najmniejsza suma kwadratów', T`x + y = S: \quad x^2 + y^2 \ge \frac{S^2}{2}`],
          ['Kierunek ramion', T`a < 0: \text{ maksimum}, \qquad a > 0: \text{ minimum}`]
        ],
        examples: [
          ['Największy iloczyn', '2 pkt', T`Suma dwóch liczb jest równa $14$. Jaki największy iloczyn mogą mieć?`, T`1. $f(x) = x(14 - x) = -x^2 + 14x$.` + '\n' + T`2. Wierzchołek: $x = 7$.` + '\n' + T`3. Iloczyn: $49$.`, 'Liczby są równe.'],
          ['Najmniejsza suma kwadratów', '3 pkt', T`Suma dwóch liczb jest równa $10$. Jaka jest najmniejsza suma ich kwadratów?`, T`1. $f(x) = x^2 + (10 - x)^2 = 2x^2 - 20x + 100$.` + '\n' + T`2. $a = 2 > 0$, wierzchołek: $x = 5$.` + '\n' + T`3. $f(5) = 50$.`, 'Ramiona w górę – w wierzchołku minimum.']
        ],
        trap: T`Wierzchołek daje maksimum TYLKO gdy $a < 0$. Dla $a > 0$ jest tam minimum. Zawsze sprawdź, o co pytają i jaki jest znak $a$.`,
        fail: T`„$f(x) = 2x^2 - 20x + 100$, więc największa wartość jest w wierzchołku.”`,
        win: T`$a = 2 > 0$, więc w wierzchołku jest wartość NAJMNIEJSZA: $f(5) = 50$.`,
        why: 'Parabola z ramionami w górę nie ma wartości największej – rośnie bez ograniczeń.',
        ckeTip: 'Nawet jeśli nie umiesz dokończyć, zapisz oznaczenia, warunek i funkcję – to już 1–2 punkty z 4.',
        points: [T`Pięć kroków: warunek, funkcja, dziedzina, wierzchołek, odpowiedź.`, T`$a < 0$: maksimum. $a > 0$: minimum.`, T`Punkty są za etapy – pisz wszystko.`]
      }),
      gens: [numProductMax, numSumSquaresMin, numWeighted, numInscribedRect, schemeOrder, numDifferenceMin]
    }
  ]
};
