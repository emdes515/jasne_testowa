import { T, mc, num, pf, pill, fr, par, poly, quad, lin, xm, iv, m, need, gcd, isSquare, sq } from './lib.js';

const TIP_DELTA = 'Karta wzorów, str. 7–8: $\\Delta = b^2 - 4ac$, $x_1 = \\frac{-b - \\sqrt{\\Delta}}{2a}$, $x_2 = \\frac{-b + \\sqrt{\\Delta}}{2a}$.';
const pair = (a, b) => (a <= b ? `$${a}$ oraz $${b}$` : `$${b}$ oraz $${a}$`);
const COUNT = ['nie ma rozwiązań', 'ma dokładnie jedno rozwiązanie', 'ma dokładnie dwa rozwiązania', 'ma dokładnie trzy rozwiązania'];
const halfLine = (s, op) => ({ '<': iv.lo(s), '\\le': iv.lc(s), '>': iv.ro(s), '\\ge': iv.rc(s) }[op]);
const flipOp = { '<': '>', '>': '<', '\\le': '\\ge', '\\ge': '\\le' };
const opWord = { '<': 'ujemne', '\\le': 'niedodatnie', '>': 'dodatnie', '\\ge': 'nieujemne' };

// ---------- 3.1 Równania i nierówności liniowe ----------
const linIneq = (r) => {
  const p = r.int(-5, 5);
  const q0 = r.int(-5, 5);
  const k = p - q0;
  need(k !== 0 && p !== 0);
  const s = r.intNot(-7, 7, 0);
  const t = r.int(-9, 9);
  const q = t - k * s;
  need(Math.abs(q) <= 30);
  const op = r.pick(['<', '\\le', '>', '\\ge']);
  const res = k > 0 ? op : flipOp[op];
  const L = lin(p, q);
  const R = lin(q0, t);
  return mc({
    title: 'Nierówność liniowa',
    q: T`Zbiorem wszystkich rozwiązań nierówności $${L} ${op} ${R}$ jest przedział`,
    ok: m(halfLine(s, res)),
    bad: [m(halfLine(s, flipOp[res])), m(halfLine(-s, res)), m(halfLine(-s, flipOp[res]))],
    steps: [
      T`Przenosimy wyrazy z $x$ na lewą stronę, a liczby na prawą: $${lin(k, 0)} ${op} ${-k * s === 0 ? 0 : k * s}$.`,
      k > 0 ? T`Dzielimy obie strony przez $${k}$ (liczba dodatnia, znak nierówności zostaje): $x ${op} ${s}$.` : T`Dzielimy obie strony przez $${k}$ – to liczba ujemna, więc odwracamy znak nierówności: $x ${res} ${s}$.`,
      T`Zbiór rozwiązań: $${halfLine(s, res)}$.`
    ],
    trap: T`Przy dzieleniu lub mnożeniu nierówności przez liczbę ujemną znak nierówności trzeba odwrócić.`,
    tip: 'Sprawdź wynik jedną liczbą z otrzymanego przedziału – po podstawieniu nierówność musi być prawdziwa.'
  });
};
const linIneqBracket = (r) => {
  const a = r.int(2, 6);
  const b = r.intNot(-6, 6, 0);
  const s = r.intNot(-7, 7, 0);
  const c = -a * (s + b);
  const op = r.pick(['<', '\\le', '>', '\\ge']);
  const res = flipOp[op];
  return mc({
    title: 'Nierówność liniowa z nawiasem',
    q: T`Zbiorem wszystkich rozwiązań nierówności $-${a}(${lin(1, b)}) ${op} ${c}$ jest przedział`,
    ok: m(halfLine(s, res)),
    bad: [m(halfLine(s, op)), m(halfLine(-s, res)), m(halfLine(-s, op)), m(halfLine(s + 2 * b, res))],
    steps: [
      T`Dzielimy obie strony przez $-${a}$ i odwracamy znak nierówności: $${lin(1, b)} ${res} ${-c / a}$.`,
      T`Przenosimy $${b}$ na prawą stronę: $x ${res} ${s}$.`,
      T`Zbiór rozwiązań: $${halfLine(s, res)}$.`
    ],
    trap: T`Dzielenie przez $-${a}$ odwraca znak nierówności. To najczęstsza przyczyna utraty punktu w tym typie zadania.`,
    tip: 'Liczba ujemna przed nawiasem = pamiętaj o odwróceniu znaku nierówności przy dzieleniu.'
  });
};
const linIneqInteger = (r) => {
  const k = r.int(2, 7);
  const n = r.intNot(-30, 30, 0);
  need(n % k !== 0);
  const greater = r.bool();
  const v = greater ? Math.floor(n / k) + 1 : Math.ceil(n / k) - 1;
  return mc({
    title: 'Skrajna liczba całkowita spełniająca nierówność',
    q: T`${greater ? 'Najmniejszą' : 'Największą'} liczbą całkowitą spełniającą nierówność $${k}x ${greater ? '>' : '<'} ${n}$ jest`,
    ok: m(v),
    val: v,
    bad: [m(greater ? v - 1 : v + 1), m(greater ? v + 1 : v - 1), m(-v === v ? v + 2 : -v), m(greater ? v + 2 : v - 2)],
    steps: [
      T`Dzielimy przez $${k}$: $x ${greater ? '>' : '<'} ${fr(n, k)}$, czyli $x ${greater ? '>' : '<'} ${String(Math.round((n / k) * 100) / 100).replace('.', '{,}')}${Number.isInteger((n * 100) / k) ? '' : '\\ldots'}$.`,
      T`${greater ? 'Najmniejsza' : 'Największa'} liczba całkowita ${greater ? 'większa' : 'mniejsza'} od $${fr(n, k)}$ to $${v}$.`
    ],
    trap: T`Dla liczb ujemnych zaokrąglanie „w dół” idzie w lewo na osi: liczba całkowita mniejsza od $-2{,}5$ to $-3$, a nie $-2$.`,
    tip: 'Narysuj oś liczbową i zaznacz granicę – od razu widać, która liczba całkowita jest skrajna.'
  });
};
const linEquation = (r) => {
  const a = r.int(2, 6);
  const b = r.intNot(-6, 6, 0);
  const c = r.intNot(-5, 5, 0, a);
  const d = r.int(-9, 9);
  // a(x + b) = cx + d -> (a - c)x = d - ab
  const nn = d - a * b;
  const dd = a - c;
  need(nn !== 0 && dd !== 1);
  return mc({
    title: 'Równanie liniowe',
    q: T`Rozwiązaniem równania $${a}(${lin(1, b)}) = ${lin(c, d)}$ jest liczba`,
    ok: m(fr(nn, dd)),
    val: nn / dd,
    bad: [m(fr(-nn, dd)), m(fr(d - b, dd)), m(fr(d + a * b || 1, dd)), m(fr(nn, a + c || 1)), m(fr(dd, nn))],
    steps: [
      T`Mnożymy nawias: $${lin(a, a * b)} = ${lin(c, d)}$.`,
      T`Wyrazy z $x$ na lewo, liczby na prawo: $${lin(dd, 0)} = ${nn}$.`,
      T`Dzielimy przez $${dd}$: $x = ${fr(nn, dd)}$.`
    ],
    trap: T`Liczba przed nawiasem mnoży oba wyrazy: $${a} \cdot ${par(b)} = ${a * b}$, a nie samo $${b}$.`,
    tip: 'Przenosząc wyraz na drugą stronę równania, zmieniasz jego znak.'
  });
};
const linEquationKind = (r) => {
  const a = r.int(2, 6);
  const b = r.intNot(-6, 6, 0);
  const kind = r.int(0, 2);
  const c = kind === 0 ? a * b + r.intNot(-5, 5, 0) : kind === 1 ? a * b : r.int(-9, 9);
  const a2 = kind === 2 ? r.intNot(1, 7, a) : a;
  const ans = kind === 0 ? COUNT[0] : kind === 1 ? 'ma nieskończenie wiele rozwiązań' : COUNT[1];
  return mc({
    title: 'Równanie sprzeczne i tożsamościowe',
    q: T`Równanie $${a}(${lin(1, b)}) = ${lin(a2, c)}$ z niewiadomą $x$`,
    ok: ans,
    bad: [COUNT[0], COUNT[1], 'ma nieskończenie wiele rozwiązań', COUNT[2]].filter((x) => x !== ans),
    steps: [
      T`Mnożymy nawias: $${lin(a, a * b)} = ${lin(a2, c)}$.`,
      kind === 2
        ? T`Po przeniesieniu wyrazów: $${lin(a - a2, 0)} = ${c - a * b}$. Współczynnik przy $x$ jest różny od zera, więc jest dokładnie jedno rozwiązanie.`
        : T`Odejmujemy $${a}x$ od obu stron: $${a * b} = ${c}$.`,
      kind === 0 ? T`Otrzymaliśmy zdanie fałszywe – równanie jest sprzeczne.` : kind === 1 ? T`Otrzymaliśmy zdanie zawsze prawdziwe – równanie jest tożsamościowe, spełnia je każda liczba rzeczywista.` : T`Równanie ma jedno rozwiązanie: $x = ${fr(c - a * b, a - a2)}$.`
    ],
    trap: kind === 2 ? T`Równanie liniowe jest sprzeczne lub tożsamościowe tylko wtedy, gdy współczynniki przy $x$ po obu stronach są równe. Tutaj są różne ($${a}$ i $${a2}$), więc rozwiązanie jest jedno.` : T`Gdy $x$ „znika” z równania, to nie znaczy, że rozwiązaniem jest $0$. Zdanie fałszywe – brak rozwiązań, zdanie prawdziwe – nieskończenie wiele.`,
    tip: 'Równanie sprzeczne: $0 = 5$. Równanie tożsamościowe: $0 = 0$.'
  });
};

// ---------- 3.2 Równania kwadratowe ----------
const quadRoots = (r) => {
  const a = r.pick([1, 1, 1, 2, -1]);
  const x1 = r.intNot(-7, 7, 0);
  const x2 = r.intNot(-7, 7, 0, x1, -x1);
  const b = -a * (x1 + x2);
  const c = a * x1 * x2;
  const D = b * b - 4 * a * c;
  return mc({
    title: 'Rozwiązania równania kwadratowego',
    q: T`Rozwiązaniami równania $${quad(a, b, c)} = 0$ są liczby`,
    ok: pair(x1, x2),
    bad: [pair(-x1, -x2), pair(x1, -x2), pair(-x1, x2), pair(x1 + 1, x2 + 1)],
    steps: [
      T`$a = ${a}$, $b = ${b}$, $c = ${c}$, więc $\Delta = ${par(b)}^2 - 4 \cdot ${par(a)} \cdot ${par(c)} = ${D}$ oraz $\sqrt{\Delta} = ${Math.sqrt(D)}$.`,
      T`$x_1 = \frac{${-b} - ${Math.sqrt(D)}}{${2 * a}} = ${fr(-b - Math.sqrt(D), 2 * a)}$, $x_2 = \frac{${-b} + ${Math.sqrt(D)}}{${2 * a}} = ${fr(-b + Math.sqrt(D), 2 * a)}$.`
    ],
    trap: T`We wzorze na pierwiastki stoi $-b$. Dla $b = ${b}$ w liczniku jest $${-b}$, a nie $${b}$.`,
    tip: TIP_DELTA
  });
};
const quadCount = (r) => {
  const a = r.pick([1, 1, 2, 3, -1, -2]);
  const kind = r.int(0, 2);
  let b;
  let c;
  if (kind === 1) {
    const p = r.intNot(-5, 5, 0);
    b = -2 * a * p;
    c = a * p * p;
  } else {
    b = r.int(-7, 7);
    c = r.intNot(-9, 9, 0);
  }
  const D = b * b - 4 * a * c;
  need((kind === 0 && D < 0) || (kind === 1 && D === 0) || (kind === 2 && D > 0));
  const ans = COUNT[kind];
  return mc({
    title: 'Liczba rozwiązań a wyróżnik',
    q: T`Równanie $${quad(a, b, c)} = 0$ w zbiorze liczb rzeczywistych`,
    ok: ans,
    bad: COUNT.filter((x) => x !== ans),
    steps: [
      T`Obliczamy wyróżnik: $\Delta = ${par(b)}^2 - 4 \cdot ${par(a)} \cdot ${par(c)} = ${b * b} ${-4 * a * c >= 0 ? '+' : '-'} ${Math.abs(4 * a * c)} = ${D}$.`,
      D < 0 ? T`$\Delta < 0$, więc równanie nie ma rozwiązań rzeczywistych.` : D === 0 ? T`$\Delta = 0$, więc równanie ma dokładnie jedno rozwiązanie: $x_0 = ${fr(-b, 2 * a)}$.` : T`$\Delta > 0$, więc równanie ma dwa różne rozwiązania.`
    ],
    trap: T`Iloczyn $4ac$ odejmujemy razem ze znakiem: gdy $a$ i $c$ mają różne znaki, $-4ac$ jest dodatnie.`,
    tip: 'Karta wzorów, str. 8: $\\Delta > 0$ – dwa rozwiązania, $\\Delta = 0$ – jedno, $\\Delta < 0$ – brak.'
  });
};
const quadIncomplete = (r) => {
  if (r.bool()) {
    const a = r.int(1, 5);
    const k = r.intNot(-8, 8, 0);
    const b = -a * k;
    return mc({
      title: 'Równanie kwadratowe bez wyrazu wolnego',
      q: T`Rozwiązaniami równania $${quad(a, b, 0)} = 0$ są liczby`,
      ok: pair(0, k),
      bad: [pair(0, -k), pair(-k, k), `tylko $${k}$`, pair(0, a * k === k ? k + 1 : a * k), `tylko $0$`],
      steps: [T`Wyłączamy $x$ przed nawias: $${a === 1 ? '' : a}x(${xm(k)}) = 0$.`, T`Iloczyn jest zerem, gdy $x = 0$ lub $${xm(k)} = 0$, czyli $x = ${k}$.`],
      trap: T`Nie wolno dzielić równania przez $x$ – gubi się wtedy rozwiązanie $x = 0$.`,
      tip: 'Brak wyrazu wolnego? Wyłącz $x$ przed nawias – nie potrzebujesz delty.'
    });
  }
  const a = r.int(1, 4);
  const k = r.int(2, 9);
  return mc({
    title: 'Równanie kwadratowe bez wyrazu z x',
    q: T`Rozwiązaniami równania $${quad(a, 0, -a * k * k)} = 0$ są liczby`,
    ok: pair(-k, k),
    bad: [`tylko $${k}$`, pair(0, k), pair(-k * k, k * k), pair(0, k * k), `tylko $${k * k}$`],
    steps: [T`Przenosimy wyraz wolny${a === 1 ? '' : ' i dzielimy przez $' + a + '$'}: $x^2 = ${k * k}$.`, T`Równanie $x^2 = ${k * k}$ ma dwa rozwiązania: $x = ${k}$ lub $x = -${k}$.`],
    trap: T`Równanie $x^2 = ${k * k}$ ma dwa rozwiązania. Zapisanie tylko $x = ${k}$ to utrata rozwiązania ujemnego.`,
    tip: 'Równanie $x^2 = k^2$ dla $k > 0$ ma zawsze dwa rozwiązania: $k$ oraz $-k$.'
  });
};
const quadRootsOp = (r) => {
  const a = r.pick([1, 2, 3]);
  const x1 = r.intNot(-6, 6, 0);
  const x2 = r.intNot(-6, 6, 0, x1);
  const b = -a * (x1 + x2);
  const c = a * x1 * x2;
  const sum = r.bool();
  const v = sum ? x1 + x2 : x1 * x2;
  const D = b * b - 4 * a * c;
  return mc({
    title: sum ? 'Suma rozwiązań równania kwadratowego' : 'Iloczyn rozwiązań równania kwadratowego',
    q: T`${sum ? 'Suma' : 'Iloczyn'} wszystkich rozwiązań równania $${quad(a, b, c)} = 0$ jest ${sum ? 'równa' : 'równy'}`,
    ok: m(v),
    val: v,
    bad: sum ? [m(-v === v ? 1 : -v), m(x1 * x2), m(b), m(v + 1), m(-b === v ? v + 2 : -b)] : [m(-v), m(x1 + x2), m(c === v ? v + 1 : c), m(v + 2), m(-c === -v ? v - 2 : -c)],
    steps: [
      T`$\Delta = ${par(b)}^2 - 4 \cdot ${a} \cdot ${par(c)} = ${D}$, $\sqrt{\Delta} = ${Math.sqrt(D)}$.`,
      T`$x_1 = \frac{${-b} - ${Math.sqrt(D)}}{${2 * a}} = ${Math.min(x1, x2)}$, $x_2 = \frac{${-b} + ${Math.sqrt(D)}}{${2 * a}} = ${Math.max(x1, x2)}$.`,
      sum ? T`Suma: $${Math.min(x1, x2)} + ${par(Math.max(x1, x2))} = ${v}$.` : T`Iloczyn: $${par(Math.min(x1, x2))} \cdot ${par(Math.max(x1, x2))} = ${v}$.`
    ],
    trap: T`W mianowniku wzoru na pierwiastki stoi $2a = ${2 * a}$, a nie $2$.`,
    tip: TIP_DELTA
  });
};
const quadSquareForm = (r) => {
  const a = r.intNot(-7, 7, 0);
  const k = r.int(1, 8);
  const bigger = r.bool();
  const v = bigger ? a + k : a - k;
  return mc({
    title: 'Równanie w postaci kwadratu',
    q: T`${bigger ? 'Większym' : 'Mniejszym'} z rozwiązań równania $(${xm(a)})^2 = ${k * k}$ jest liczba`,
    ok: m(v),
    val: v,
    bad: [m(bigger ? a - k : a + k), m(-a + k === v ? v + 1 : -a + k), m(a + k * k), m(-a - k === v ? v - 1 : -a - k), m(k)],
    steps: [T`Skoro kwadrat wyrażenia jest równy $${k * k}$, to samo wyrażenie jest równe $${k}$ lub $-${k}$.`, T`$${xm(a)} = ${k}$ daje $x = ${a + k}$, a $${xm(a)} = -${k}$ daje $x = ${a - k}$.`, T`${bigger ? 'Większe' : 'Mniejsze'} z nich to $${v}$.`],
    trap: T`Po spierwiastkowaniu obu stron są dwa przypadki: $+${k}$ oraz $-${k}$.`,
    tip: 'Równanie $(x - p)^2 = k^2$ rozwiązujesz bez delty: $x - p = k$ lub $x - p = -k$.'
  });
};

// ---------- 3.3 Nierówności kwadratowe ----------
const quadSet = (x1, x2, op, up) => {
  const lo = Math.min(x1, x2);
  const hi = Math.max(x1, x2);
  const inside = up ? ['<', '\\le'].includes(op) : ['>', '\\ge'].includes(op);
  const strict = ['<', '>'].includes(op);
  if (inside) return strict ? iv.oo(lo, hi) : iv.cc(lo, hi);
  return strict ? `${iv.lo(lo)} \\cup ${iv.ro(hi)}` : `${iv.lc(lo)} \\cup ${iv.rc(hi)}`;
};
const quadIneq = (r) => {
  const up = r.rnd() < 0.65;
  const a = up ? 1 : -1;
  const x1 = r.int(-7, 6);
  const x2 = r.intNot(-7, 8, x1, -x1);
  need(x1 !== 0 || x2 !== 0);
  const b = -a * (x1 + x2);
  const c = a * x1 * x2;
  const op = r.pick(['<', '\\le', '>', '\\ge']);
  const D = b * b - 4 * a * c;
  const lo = Math.min(x1, x2);
  const hi = Math.max(x1, x2);
  return mc({
    title: 'Nierówność kwadratowa',
    q: T`Zbiorem wszystkich rozwiązań nierówności $${quad(a, b, c)} ${op} 0$ jest`,
    ok: m(quadSet(x1, x2, op, up)),
    bad: [m(quadSet(x1, x2, flipOp[op], up)), m(quadSet(-x1, -x2, op, up)), m(quadSet(-x1, -x2, flipOp[op], up)), m(['<', '>'].includes(op) ? iv.ro(lo) : iv.rc(lo))],
    steps: [
      T`Miejsca zerowe: $\Delta = ${D}$, $\sqrt{\Delta} = ${Math.sqrt(D)}$, stąd $x_1 = ${lo}$, $x_2 = ${hi}$.`,
      T`Współczynnik przy $x^2$ jest ${up ? 'dodatni' : 'ujemny'}, więc ramiona paraboli są skierowane ${up ? 'w górę' : 'w dół'}.`,
      T`Szukamy argumentów, dla których wartości są ${opWord[op]}, czyli części wykresu ${['<', '\\le'].includes(op) ? 'pod osią' : 'nad osią'} $Ox$${['\\le', '\\ge'].includes(op) ? ' (razem z miejscami zerowymi)' : ''}: $${quadSet(x1, x2, op, up)}$.`
    ],
    trap: up ? T`Nie zgaduj z samych miejsc zerowych – narysuj parabolę. Dla ramion w górę wartości ujemne są między miejscami zerowymi.` : T`Ramiona w dół odwracają sytuację: wartości dodatnie są między miejscami zerowymi, a ujemne – na zewnątrz.`,
    tip: 'Schemat: miejsca zerowe → szkic paraboli (ramiona w górę lub w dół) → odczytanie przedziału z rysunku.'
  });
};
const quadIneqFactored = (r) => {
  const x1 = r.int(-7, 6);
  const x2 = r.intNot(-7, 8, x1, -x1);
  const reversed = r.bool();
  const op = r.pick(['<', '\\le', '>', '\\ge']);
  const up = !reversed;
  const left = reversed ? `(${x1} - x)(${xm(x2)})` : `(${xm(x1)})(${xm(x2)})`;
  return mc({
    title: 'Nierówność w postaci iloczynowej',
    q: T`Zbiorem wszystkich rozwiązań nierówności $${left} ${op} 0$ jest`,
    ok: m(quadSet(x1, x2, op, up)),
    bad: [m(quadSet(x1, x2, flipOp[op], up)), m(quadSet(-x1, -x2, op, up)), m(quadSet(-x1, -x2, flipOp[op], up)), m(quadSet(x1, -x2, op, up))],
    steps: [
      T`Miejsca zerowe odczytujemy z nawiasów: $x = ${x1}$ oraz $x = ${x2}$.`,
      reversed ? T`W pierwszym nawiasie stoi $-x$, więc po wymnożeniu współczynnik przy $x^2$ jest równy $-1$: ramiona paraboli idą w dół.` : T`Po wymnożeniu współczynnik przy $x^2$ jest równy $1$: ramiona paraboli idą w górę.`,
      T`Z rysunku odczytujemy: $${quadSet(x1, x2, op, up)}$.`
    ],
    trap: reversed ? T`Nawias $(${x1} - x)$ ma przy $x$ minus – parabola jest odwrócona. Kto tego nie zauważy, wskaże zbiór dokładnie przeciwny.` : T`Miejscem zerowym nawiasu $(${xm(x1)})$ jest $${x1}$, a nie $${-x1}$.`,
    tip: 'W postaci iloczynowej nie licz delty – miejsca zerowe widać od razu. Sprawdź tylko znak przy $x^2$.'
  });
};
const quadIneqCountInt = (r) => {
  const x1 = r.int(-6, 4);
  const len = r.int(2, 7);
  const x2 = x1 + len;
  const weak = r.bool();
  const v = weak ? len + 1 : len - 1;
  return mc({
    title: 'Liczby całkowite spełniające nierówność',
    q: T`Liczba wszystkich liczb całkowitych spełniających nierówność $(${xm(x1)})(${xm(x2)}) ${weak ? '\\le' : '<'} 0$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(weak ? len - 1 : len + 1), m(len), m(v + 3), m(v + 2)],
    steps: [
      T`Miejsca zerowe: $${x1}$ i $${x2}$. Ramiona paraboli idą w górę, więc wartości ${weak ? 'niedodatnie' : 'ujemne'} są między nimi: $x \in ${weak ? iv.cc(x1, x2) : iv.oo(x1, x2)}$.`,
      T`Liczby całkowite w tym przedziale: ${weak ? `od $${x1}$ do $${x2}$` : `od $${x1 + 1}$ do $${x2 - 1}$`}, czyli jest ich $${v}$.`
    ],
    trap: weak ? T`Nierówność jest nieostra, więc końce przedziału też są rozwiązaniami.` : T`Nierówność jest ostra, więc końce przedziału nie są rozwiązaniami.`,
    tip: 'Liczb całkowitych od $a$ do $b$ włącznie jest $b - a + 1$.'
  });
};
const quadIneqPure = (r) => {
  const k = r.int(2, 9);
  const op = r.pick(['<', '\\le', '>', '\\ge']);
  return mc({
    title: 'Nierówność typu x² i liczba',
    q: T`Zbiorem wszystkich rozwiązań nierówności $x^2 ${op} ${k * k}$ jest`,
    ok: m(quadSet(-k, k, op, true)),
    bad: [m(quadSet(-k, k, flipOp[op], true)), m(halfLine(k, op)), m(quadSet(-k * k, k * k, op, true)), m(halfLine(-k, op))],
    steps: [T`Przenosimy: $x^2 - ${k * k} ${op} 0$, czyli $(x - ${k})(x + ${k}) ${op} 0$.`, T`Miejsca zerowe: $-${k}$ i $${k}$, ramiona paraboli w górę.`, T`Odczytujemy: $${quadSet(-k, k, op, true)}$.`],
    trap: T`Nierówności $x^2 ${op} ${k * k}$ nie wolno „spierwiastkować” do $x ${op} ${k}$ – gubi się część ujemną osi.`,
    tip: 'Nierówność kwadratową zawsze sprowadź do postaci z zerem po prawej stronie i narysuj parabolę.'
  });
};
const quadIneqNoRoots = (r) => {
  const c = r.int(1, 9);
  const p = r.int(-4, 4);
  const up = r.bool();
  const op = r.pick(['<', '\\le', '>', '\\ge']);
  // up: (x - p)^2 + c  (zawsze dodatnie); down: -(x - p)^2 - c (zawsze ujemne)
  const a = up ? 1 : -1;
  const b = -2 * a * p;
  const cc = a * (p * p + c);
  const all = up ? ['>', '\\ge'].includes(op) : ['<', '\\le'].includes(op);
  const ans = all ? 'zbiór wszystkich liczb rzeczywistych' : 'zbiór pusty';
  return mc({
    title: 'Nierówność kwadratowa bez miejsc zerowych',
    q: T`Zbiorem wszystkich rozwiązań nierówności $${quad(a, b, cc)} ${op} 0$ jest`,
    ok: ans,
    bad: ['zbiór wszystkich liczb rzeczywistych', 'zbiór pusty', m(iv.ro(p)), m(iv.lo(p)), m(iv.oo(-c, c))].filter((x) => x !== ans),
    steps: [
      T`$\Delta = ${par(b)}^2 - 4 \cdot ${par(a)} \cdot ${par(cc)} = ${b * b - 4 * a * cc} < 0$, więc trójmian nie ma miejsc zerowych.`,
      T`Parabola ma ramiona ${up ? 'w górę i leży w całości nad' : 'w dół i leży w całości pod'} osią $Ox$ – trójmian przyjmuje tylko wartości ${up ? 'dodatnie' : 'ujemne'}.`,
      all ? T`Nierówność jest więc prawdziwa dla każdej liczby rzeczywistej.` : T`Nierówność nie jest więc spełniona przez żadną liczbę.`
    ],
    trap: T`Ujemna delta nie oznacza automatycznie „brak rozwiązań” nierówności. Brak miejsc zerowych znaczy tylko, że parabola nie przecina osi.`,
    tip: 'Przy $\\Delta < 0$ odpowiedzią jest albo cały zbiór liczb rzeczywistych, albo zbiór pusty – rozstrzyga rysunek.'
  });
};

// ---------- 3.4 Równania wielomianowe ----------
const triple = (a, b, c) => (new Set([a, b, c]).size < 3 ? undefined : [a, b, c].sort((x, y) => x - y).map((x) => `$${x}$`).join(', '));
const polyEqProduct = (r) => {
  const a = r.intNot(-8, 8, 0);
  const b = r.intNot(-8, 8, 0, a);
  const sum = r.bool();
  const c = r.int(2, 5);
  const v = sum ? a + b : Math.max(0, a, b);
  return mc({
    title: 'Równanie w postaci iloczynu',
    q: T`${sum ? 'Suma wszystkich rozwiązań' : 'Największym rozwiązaniem'} równania $${c}x(${xm(a)})(${xm(b)}) = 0$ jest ${sum ? 'równa' : 'liczba'}`,
    ok: m(v),
    val: v,
    bad: sum ? [m(-v === v ? 1 : -v), m(v + c), m(a * b), m(v - c)] : [m(Math.max(-a, -b, 0) === v ? v + 1 : Math.max(-a, -b, 0)), m(c === v ? v + 1 : c), m(Math.min(0, a, b)), m(v + c)],
    steps: [T`Iloczyn jest równy zero, gdy co najmniej jeden czynnik jest zerem.`, T`$x = 0$ lub $${xm(a)} = 0$ lub $${xm(b)} = 0$, czyli $x = 0$, $x = ${a}$, $x = ${b}$.`, sum ? T`Suma: $0 + ${par(a)} + ${par(b)} = ${v}$.` : T`Największa z tych liczb to $${v}$.`],
    trap: T`Liczba $${c}$ przed nawiasami nie jest rozwiązaniem – rozwiązanie daje czynnik $x$, czyli $x = 0$.`,
    tip: 'Postać iloczynowa: każdy nawias przyrównaj osobno do zera.'
  });
};
const polyEqCount = (r) => {
  const a = r.int(1, 9);
  const b = r.intNot(-9, 9, 0);
  const plus = r.bool();
  const sqA = isSquare(a);
  need(plus || (b * b !== a));
  const cnt = plus ? 1 : 3;
  return mc({
    title: 'Liczba rozwiązań równania wielomianowego',
    q: T`Równanie $(x^2 ${plus ? '+' : '-'} ${a})(${xm(b)}) = 0$ w zbiorze liczb rzeczywistych`,
    ok: COUNT[cnt],
    bad: COUNT.filter((x) => x !== COUNT[cnt]),
    steps: [
      plus ? T`Czynnik $x^2 + ${a}$ jest zawsze dodatni, więc nigdy nie jest zerem.` : T`$x^2 - ${a} = 0$ daje $x^2 = ${a}$, czyli $x = ${sqA ? Math.sqrt(a) : `\\sqrt{${a}}`}$ lub $x = -${sqA ? Math.sqrt(a) : `\\sqrt{${a}}`}$.`,
      T`Czynnik $${xm(b)}$ jest zerem dla $x = ${b}$.`,
      T`Razem: ${plus ? 'jedno rozwiązanie' : 'trzy różne rozwiązania'}.`
    ],
    trap: plus ? T`$x^2 + ${a} = 0$ nie ma rozwiązań – kwadrat liczby nie może być ujemny. Nie dopisuj „$\pm$”.` : T`$x^2 = ${a}$ ma dwa rozwiązania, także ujemne.`,
    tip: 'Suma kwadratu i liczby dodatniej nigdy nie jest zerem; różnica kwadratu i liczby dodatniej daje dwa rozwiązania.'
  });
};
const polyEqGroup3 = (r) => {
  const a = r.intNot(-7, 7, 0);
  const b = r.int(1, 6);
  need(Math.abs(a) !== b);
  const W = poly([[1, 'x^3'], [-a, 'x^2'], [-b * b, 'x'], [a * b * b, '']]);
  return mc({
    title: 'Równanie trzeciego stopnia: grupowanie',
    q: T`Wszystkimi rozwiązaniami równania $${W} = 0$ są liczby`,
    ok: triple(a, b, -b),
    bad: [triple(-a, b, -b), `$${a}$ oraz $${b}$`, triple(a, b * b, -b * b), `tylko $${a}$`, triple(-a, b * b, -b * b)],
    steps: [
      T`Grupujemy: $x^2(${xm(a)}) - ${b * b}(${xm(a)}) = 0$.`,
      T`Wyłączamy wspólny nawias: $(${xm(a)})(x^2 - ${b * b}) = 0$.`,
      T`$${xm(a)} = 0$ daje $x = ${a}$; $x^2 = ${b * b}$ daje $x = ${b}$ lub $x = -${b}$.`
    ],
    trap: T`Z $x^2 = ${b * b}$ wynikają dwa rozwiązania. Pominięcie $x = -${b}$ kosztuje punkt.`,
    tip: 'Cztery wyrazy w równaniu trzeciego stopnia to sygnał: grupuj parami.'
  });
};
const polyEqGroup1 = (r) => {
  const a = r.intNot(-8, 8, 0);
  const b = r.int(1, 9);
  const W = poly([[1, 'x^3'], [-a, 'x^2'], [b, 'x'], [-a * b, '']]);
  const sqB = isSquare(b);
  return mc({
    title: 'Równanie trzeciego stopnia: jedno rozwiązanie',
    q: T`Równanie $${W} = 0$ w zbiorze liczb rzeczywistych`,
    ok: `ma dokładnie jedno rozwiązanie: $x = ${a}$`,
    bad: [`ma dokładnie jedno rozwiązanie: $x = ${-a}$`, `ma dokładnie trzy rozwiązania: $x = ${a}$, $x = ${sqB ? Math.sqrt(b) : `\\sqrt{${b}}`}$, $x = -${sqB ? Math.sqrt(b) : `\\sqrt{${b}}`}$`, `ma dokładnie dwa rozwiązania: $x = ${a}$, $x = -${b}$`, 'nie ma rozwiązań'],
    steps: [
      T`Grupujemy: $x^2(${xm(a)}) + ${b}(${xm(a)}) = 0$.`,
      T`$(${xm(a)})(x^2 + ${b}) = 0$.`,
      T`$x^2 + ${b} > 0$ dla każdego $x$, więc jedynym rozwiązaniem jest $x = ${a}$.`
    ],
    trap: T`Czynnik $x^2 + ${b}$ nie daje żadnych rozwiązań – w zbiorze liczb rzeczywistych $x^2 = -${b}$ jest niemożliwe.`,
    tip: 'Po rozłożeniu na czynniki sprawdź każdy nawias osobno: czy może być równy zero?'
  });
};
const polyEqFactorOut = (r) => {
  const c = r.int(1, 4);
  const k = r.int(2, 7);
  if (r.bool()) {
    const W = poly([[c, 'x^3'], [-c * k * k, 'x']]);
    return mc({
      title: 'Równanie: wyłączanie x przed nawias',
      q: T`Wszystkimi rozwiązaniami równania $${W} = 0$ są liczby`,
      ok: triple(-k, 0, k),
      bad: [`$${-k}$ oraz $${k}$`, `$0$ oraz $${k}$`, triple(-k * k, 0, k * k), `$0$ oraz $${k * k}$`, `tylko $${k}$`],
      steps: [T`Wyłączamy $${c === 1 ? '' : c}x$: $${c === 1 ? '' : c}x(x^2 - ${k * k}) = 0$.`, T`$x = 0$ lub $x^2 = ${k * k}$, czyli $x = ${k}$ lub $x = -${k}$.`],
      trap: T`Dzielenie równania przez $x$ gubi rozwiązanie $x = 0$. Zawsze wyłączaj $x$ przed nawias.`,
      tip: 'Gdy każdy wyraz zawiera $x$, jednym z rozwiązań jest na pewno $0$.'
    });
  }
  const kk = r.intNot(-8, 8, 0);
  const W = poly([[c, 'x^3'], [-c * kk, 'x^2']]);
  return mc({
    title: 'Równanie: wyłączanie x² przed nawias',
    q: T`Wszystkimi rozwiązaniami równania $${W} = 0$ są liczby`,
    ok: pair(0, kk),
    bad: [pair(0, -kk), triple(-kk, 0, kk), `tylko $${kk}$`, pair(-kk, kk), `tylko $0$`],
    steps: [T`Wyłączamy $${c === 1 ? '' : c}x^2$: $${c === 1 ? '' : c}x^2(${xm(kk)}) = 0$.`, T`$x^2 = 0$ daje $x = 0$, a $${xm(kk)} = 0$ daje $x = ${kk}$.`],
    trap: T`$x^2 = 0$ ma jedno rozwiązanie ($x = 0$), nie dwa.`,
    tip: 'Gdy każdy wyraz zawiera $x$, jednym z rozwiązań jest na pewno $0$.'
  });
};
const polyEqOneOf = (r) => {
  const c = r.pick([2, 3, 5, 6, 7, 10]);
  const d = r.pick([2, 3, 5, 6, 7, 8].filter((x) => x !== c));
  const lead = r.pick(['2', '3', '\\sqrt{2}', '\\sqrt{3}', '5']);
  return mc({
    title: 'Jedno z rozwiązań równania',
    q: T`Jednym z rozwiązań równania $${lead}(x^2 - ${c})(x + ${d}) = 0$ jest liczba`,
    ok: m(`\\sqrt{${c}}`),
    bad: [m(c), m(d), m(`\\sqrt{${d}}`), m(-c)],
    steps: [T`Czynnik liczbowy $${lead}$ nie jest zerem, więc go pomijamy.`, T`$x^2 - ${c} = 0$ daje $x = \sqrt{${c}}$ lub $x = -\sqrt{${c}}$; $x + ${d} = 0$ daje $x = -${d}$.`, T`Spośród podanych liczb rozwiązaniem jest tylko $\sqrt{${c}}$.`],
    trap: T`Rozwiązaniem $x^2 = ${c}$ nie jest $${c}$, tylko $\sqrt{${c}}$ (i $-\sqrt{${c}}$). Z kolei z $x + ${d} = 0$ wynika $x = -${d}$, a nie $${d}$.`,
    tip: 'Każdą opcję możesz sprawdzić, podstawiając ją do równania – któryś nawias musi dać zero.'
  });
};

// ---------- 3.5 Równania wymierne ----------
const ratEqCount = (r) => {
  const a = r.intNot(-8, 8, 0);
  const b = r.intNot(-8, 8, 0, a);
  const same = r.rnd() < 0.5;
  const c = same ? a : r.intNot(-9, 9, a, b);
  const cnt = same ? 1 : 2;
  return mc({
    title: 'Liczba rozwiązań równania wymiernego',
    q: T`Równanie $\frac{(${xm(a)})(${xm(b)})}{${xm(c)}} = 0$ w zbiorze liczb rzeczywistych`,
    ok: COUNT[cnt],
    bad: COUNT.filter((x) => x !== COUNT[cnt]),
    steps: [
      T`Dziedzina: mianownik różny od zera, czyli $x \neq ${c}$.`,
      T`Ułamek jest zerem, gdy licznik jest zerem: $x = ${a}$ lub $x = ${b}$.`,
      same ? T`Liczba $${a}$ nie należy do dziedziny, więc zostaje jedno rozwiązanie: $x = ${b}$.` : T`Obie liczby należą do dziedziny, więc równanie ma dwa rozwiązania.`
    ],
    trap: same ? T`Liczba $${a}$ zeruje licznik, ale też mianownik – nie jest rozwiązaniem. To klasyczna pułapka arkusza.` : T`Zawsze porównaj zera licznika z dziedziną. Tutaj żadne z nich nie jest wykluczone.`,
    tip: 'Równanie wymierne: najpierw dziedzina, potem licznik równy zero, na końcu odrzucenie liczb spoza dziedziny.'
  });
};
const ratEqSolutions = (r) => {
  const a = r.int(1, 9);
  const neg = r.bool();
  const den = neg ? `x + ${a}` : `x - ${a}`;
  const sol = neg ? a : -a;
  return mc({
    title: 'Rozwiązania równania wymiernego',
    q: T`Wszystkimi rozwiązaniami równania $\frac{x^2 - ${a * a}}{${den}} = 0$ są`,
    ok: `tylko liczba $${sol}$`,
    bad: [`liczby $${-a}$ oraz $${a}$`, `tylko liczba $${-sol}$`, `liczby $${-a * a}$ oraz $${a * a}$`, 'równanie nie ma rozwiązań'],
    steps: [T`Dziedzina: $x \neq ${-sol}$.`, T`Licznik: $x^2 - ${a * a} = 0$ dla $x = ${a}$ lub $x = -${a}$.`, T`Liczbę $${-sol}$ odrzucamy (zeruje mianownik). Zostaje $x = ${sol}$.`],
    trap: T`Liczba $${-sol}$ zeruje mianownik, więc nie może być rozwiązaniem, mimo że zeruje licznik.`,
    tip: 'Równanie wymierne: najpierw dziedzina, potem licznik równy zero, na końcu odrzucenie liczb spoza dziedziny.'
  });
};
const ratEqLinear = (r) => {
  const a = r.int(1, 5);
  const b = r.intNot(-9, 9, 0);
  const c = r.intNot(-7, 7, 0);
  const k = r.intNot(-4, 5, 0, a);
  // (ax + b)/(x + c) = k -> (a - k)x = kc - b
  const nn = k * c - b;
  const dd = a - k;
  need(nn !== 0 && nn / dd !== -c && Math.abs(nn) <= 60);
  return mc({
    title: 'Proste równanie wymierne',
    q: T`Rozwiązaniem równania $\frac{${lin(a, b)}}{${lin(1, c)}} = ${k}$ jest liczba`,
    ok: m(fr(nn, dd)),
    val: nn / dd,
    bad: [m(fr(-nn, dd)), m(fr(k * c + b || 1, dd)), m(fr(nn, a + k || 1)), m(fr(k - b, a)), m(fr(dd, nn))],
    steps: [
      T`Dziedzina: $x \neq ${-c}$. Mnożymy obie strony przez $${lin(1, c)}$: $${lin(a, b)} = ${k}(${lin(1, c)})$.`,
      T`$${lin(a, b)} = ${lin(k, k * c)}$, stąd $${lin(dd, 0)} = ${nn}$.`,
      T`$x = ${fr(nn, dd)}$ – liczba należy do dziedziny.`
    ],
    trap: T`Liczba $${k}$ mnoży cały mianownik: $${k}(${lin(1, c)}) = ${lin(k, k * c)}$, a nie $${lin(k, c)}$.`,
    tip: 'Pomnóż obie strony równania przez mianownik, a na końcu sprawdź, czy wynik nie zeruje mianownika.'
  });
};
const ratEqProportion = (r) => {
  const a = r.int(1, 6);
  const c = r.intNot(1, 7, a);
  const b = r.intNot(-6, 6, 0);
  const d = r.intNot(-6, 6, 0, b);
  // a/(x + b) = c/(x + d) -> a(x + d) = c(x + b) -> (a - c)x = cb - ad
  const nn = c * b - a * d;
  const dd = a - c;
  need(nn !== 0 && nn / dd !== -b && nn / dd !== -d);
  return mc({
    title: 'Równanie wymierne w postaci proporcji',
    q: T`Rozwiązaniem równania $\frac{${a}}{${lin(1, b)}} = \frac{${c}}{${lin(1, d)}}$ jest liczba`,
    ok: m(fr(nn, dd)),
    val: nn / dd,
    bad: [m(fr(-nn, dd)), m(fr(c * b + a * d || 1, dd)), m(fr(nn, a + c)), m(fr(b - d, dd)), m(fr(dd, nn))],
    steps: [
      T`Dziedzina: $x \neq ${-b}$ i $x \neq ${-d}$. Mnożymy „na krzyż”: $${a}(${lin(1, d)}) = ${c}(${lin(1, b)})$.`,
      T`$${lin(a, a * d)} = ${lin(c, c * b)}$, stąd $${lin(dd, 0)} = ${nn}$.`,
      T`$x = ${fr(nn, dd)}$ – liczba należy do dziedziny.`
    ],
    trap: T`Mnożąc na krzyż, każdy licznik mnożysz przez cały mianownik drugiego ułamka, razem z wyrazem wolnym.`,
    tip: 'Proporcja $\\frac{a}{b} = \\frac{c}{d}$ oznacza $a \\cdot d = b \\cdot c$ (dla $b, d \\neq 0$).'
  });
};

export default {
  numericId: 3,
  title: 'Równania i nierówności',
  short_title: 'Równania i nierówności',
  description: 'Równania i nierówności liniowe, kwadratowe, wielomianowe oraz wymierne.',
  icon: 'Scale',
  color: '#F43F5E',
  matura_points_range: '5–8 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 7–8',
  lessons: [
    {
      title: 'Równania i nierówności liniowe',
      short_title: 'Równania i nierówności liniowe',
      pill: pill({
        essence: T`Równanie liniowe rozwiązujesz, zbierając wyrazy z $x$ po jednej stronie, a liczby po drugiej. Nierówność liniową rozwiązuje się identycznie, z jednym wyjątkiem: gdy mnożysz lub dzielisz obie strony przez liczbę ujemną, odwracasz znak nierówności. Równanie może też nie mieć rozwiązań (sprzeczne, np. $0 = 5$) albo mieć ich nieskończenie wiele (tożsamościowe, $0 = 0$).`,
        context: 'Zadania 5–8 w arkuszu • 1 pkt. Nierówność liniowa jest w niemal każdym arkuszu.',
        pl: T`Nierówność to waga, która nie jest w równowadze. Możesz dokładać i zdejmować to samo z obu szalek – cięższa strona zostaje cięższa. Ale pomnożenie przez liczbę ujemną zamienia strony miejscami: $2 < 5$, a $-2 > -5$.`,
        steps: [
          ['Pozbądź się nawiasów', T`$-2(x + 3) \le 4$ zamień na $-2x - 6 \le 4$.`, 'Liczba przed nawiasem mnoży każdy wyraz w środku.'],
          ['Wyrazy z x na lewo, liczby na prawo', T`$-2x \le 4 + 6$, czyli $-2x \le 10$.`, 'Przenoszony wyraz zmienia znak.'],
          ['Podziel przez współczynnik przy x', T`Dzielimy przez $-2$ i odwracamy znak: $x \ge -5$.`, 'Liczba ujemna = odwrócony znak.'],
          ['Zapisz przedział', T`$x \in \langle -5, +\infty)$.`, T`$\le$ i $\ge$ dają nawias domknięty $\langle\ \rangle$.`]
        ],
        formulas: [
          ['Odwracanie znaku nierówności', T`-ax < b \ \text{daje} \ x > -\frac{b}{a} \quad (a > 0)`],
          ['Równanie sprzeczne', T`0 \cdot x = b, \ b \neq 0 \quad \text{(brak rozwiązań)}`],
          ['Równanie tożsamościowe', T`0 \cdot x = 0 \quad \text{(każda liczba)}`]
        ],
        examples: [
          ['Zadanie typowe', '1 pkt', T`Rozwiąż nierówność $3(6 - x) \ge 2x - 7$.`, T`1. $18 - 3x \ge 2x - 7$.` + '\n' + T`2. $-3x - 2x \ge -7 - 18$, czyli $-5x \ge -25$.` + '\n' + T`3. Dzielimy przez $-5$ i odwracamy znak: $x \le 5$.` + '\n' + T`4. $x \in (-\infty, 5 \rangle$.`, 'Dzielenie przez liczbę ujemną odwraca znak.'],
          ['Równanie sprzeczne', '1 pkt', T`Ile rozwiązań ma równanie $2(x + 3) = 2x + 5$?`, T`1. $2x + 6 = 2x + 5$.` + '\n' + T`2. Po odjęciu $2x$: $6 = 5$ – zdanie fałszywe.` + '\n' + T`3. Równanie nie ma rozwiązań.`, T`Znikający $x$ nie oznacza, że $x = 0$.`]
        ],
        trap: T`Dzielisz nierówność przez liczbę ujemną? ODWRÓĆ znak. $-2x < 6$ daje $x > -3$, a nie $x < -3$.`,
        fail: T`$-2x < 6$, więc $x < -3$.`,
        win: T`$-2x < 6$, dzielimy przez $-2$ i odwracamy znak: $x > -3$.`,
        why: 'Mnożenie przez liczbę ujemną odbija liczby na drugą stronę zera, więc zmienia ich kolejność na osi.',
        ckeTip: 'Sprawdź wynik: podstaw dowolną liczbę z otrzymanego przedziału do wyjściowej nierówności.',
        points: [T`Przenoszony wyraz zmienia znak.`, T`Dzielenie przez liczbę ujemną odwraca znak nierówności.`, T`$<$, $>$ – nawias okrągły; $\le$, $\ge$ – nawias ostry.`]
      }),
      gens: [linIneq, linIneqBracket, linIneqInteger, linEquation, linEquationKind]
    },
    {
      title: 'Równania kwadratowe: wyróżnik i pierwiastki',
      short_title: 'Równania kwadratowe',
      time: '~6 min',
      pill: pill({
        essence: T`Równanie kwadratowe $ax^2 + bx + c = 0$ rozwiązujesz wyróżnikiem $\Delta = b^2 - 4ac$. Gdy $\Delta > 0$, są dwa rozwiązania; gdy $\Delta = 0$ – jedno; gdy $\Delta < 0$ – nie ma żadnego. Równania niepełne rozwiązuje się szybciej bez delty: $ax^2 + bx = 0$ przez wyłączenie $x$, a $x^2 = k$ przez pierwiastkowanie (z dwoma znakami!).`,
        context: 'W każdym arkuszu: zadania zamknięte za 1 pkt i równanie kwadratowe jako etap prawie każdego zadania otwartego.',
        pl: T`Delta to wykrywacz rozwiązań. Zanim cokolwiek policzysz, mówi ci, ile ich będzie. Dodatnia – dwa, zero – jedno, ujemna – brak i nie ma czego szukać.`,
        steps: [
          ['Uporządkuj równanie', T`Przenieś wszystko na lewą stronę, aby po prawej było $0$.`, T`$x^2 = 5x - 6$ zamień na $x^2 - 5x + 6 = 0$.`],
          ['Wypisz a, b, c ze znakami', T`$a = 1$, $b = -5$, $c = 6$.`, 'Znak należy do współczynnika.'],
          ['Policz deltę', T`$\Delta = (-5)^2 - 4 \cdot 1 \cdot 6 = 25 - 24 = 1$.`, T`$b^2$ jest zawsze nieujemne.`],
          ['Policz rozwiązania', T`$x_1 = \frac{5 - 1}{2} = 2$, $x_2 = \frac{5 + 1}{2} = 3$.`, T`W liczniku stoi $-b$, w mianowniku $2a$.`]
        ],
        formulas: [
          ['Wyróżnik', T`\Delta = b^2 - 4ac`, 7],
          ['Rozwiązania', T`x_1 = \frac{-b - \sqrt{\Delta}}{2a}, \quad x_2 = \frac{-b + \sqrt{\Delta}}{2a}`, 8],
          ['Jedno rozwiązanie', T`\Delta = 0: \quad x_0 = -\frac{b}{2a}`, 8]
        ],
        examples: [
          ['Pełne równanie', '1 pkt', T`Rozwiąż równanie $2x^2 - 3x - 2 = 0$.`, T`1. $a = 2$, $b = -3$, $c = -2$.` + '\n' + T`2. $\Delta = 9 + 16 = 25$, $\sqrt{\Delta} = 5$.` + '\n' + T`3. $x_1 = \frac{3 - 5}{4} = -\frac{1}{2}$, $x_2 = \frac{3 + 5}{4} = 2$.`, T`$-4ac = -4 \cdot 2 \cdot (-2) = +16$.`],
          ['Równanie niepełne', '1 pkt', T`Rozwiąż równanie $3x^2 - 12x = 0$.`, T`1. $3x(x - 4) = 0$.` + '\n' + T`2. $x = 0$ lub $x = 4$.`, 'Bez delty i bez dzielenia przez x.']
        ],
        trap: T`Nie dziel równania przez $x$! Z $x^2 = 4x$ po podzieleniu zostaje tylko $x = 4$, a rozwiązanie $x = 0$ przepada.`,
        fail: T`$x^2 = 4x$, dzielimy przez $x$: $x = 4$.`,
        win: T`$x^2 - 4x = 0$, $x(x - 4) = 0$, więc $x = 0$ lub $x = 4$.`,
        why: 'Dzielić wolno tylko przez liczbę różną od zera, a nie wiemy, czy x nie jest zerem – właśnie to sprawdzamy.',
        ckeTip: 'Wzory na deltę i pierwiastki są w karcie wzorów na str. 7–8. Sprawdź wynik, podstawiając rozwiązanie do równania.',
        points: [T`$\Delta > 0$: dwa rozwiązania, $\Delta = 0$: jedno, $\Delta < 0$: brak.`, T`$x^2 = k^2$ ma dwa rozwiązania: $k$ i $-k$.`, T`Równanie bez wyrazu wolnego: wyłącz $x$ przed nawias.`]
      }),
      gens: [quadRoots, quadCount, quadIncomplete, quadRootsOp, quadSquareForm]
    },
    {
      title: 'Nierówności kwadratowe: szkic paraboli',
      short_title: 'Nierówności kwadratowe',
      time: '~6 min',
      pill: pill({
        essence: T`Nierówność kwadratową rozwiązuje się rysunkiem. Najpierw wyznaczasz miejsca zerowe trójmianu, potem szkicujesz parabolę (ramiona w górę dla $a > 0$, w dół dla $a < 0$) i odczytujesz, gdzie wykres leży nad osią ($> 0$), a gdzie pod osią ($< 0$). Przy znakach $\le$ i $\ge$ miejsca zerowe należą do rozwiązania.`,
        context: 'Zadanie otwarte za 2 pkt („Rozwiąż nierówność”) w większości arkuszy oraz zadania zamknięte za 1 pkt.',
        pl: T`Parabola z ramionami w górę to miska. Dno miski jest pod osią między miejscami zerowymi – tam wartości są ujemne. Brzegi miski wystają nad oś na zewnątrz – tam wartości są dodatnie. Dla ramion w dół wszystko jest odwrotnie.`,
        steps: [
          ['Zero po prawej stronie', T`Przenieś wszystko na lewą stronę nierówności.`, T`$x^2 > 3x + 4$ zamień na $x^2 - 3x - 4 > 0$.`],
          ['Miejsca zerowe', T`$\Delta = 9 + 16 = 25$, $x_1 = -1$, $x_2 = 4$.`, 'W postaci iloczynowej odczytaj je z nawiasów.'],
          ['Szkic paraboli', T`$a = 1 > 0$, więc ramiona w górę.`, 'Wystarczy oś, dwa punkty i łuk.'],
          ['Odczytaj rozwiązanie', T`$> 0$ to część nad osią: $x \in (-\infty, -1) \cup (4, +\infty)$.`, T`Znak ostry – nawiasy okrągłe.`]
        ],
        formulas: [
          ['Ramiona w górę, wartości ujemne', T`a > 0, \ ax^2 + bx + c < 0: \quad x \in (x_1, x_2)`],
          ['Ramiona w górę, wartości dodatnie', T`a > 0, \ ax^2 + bx + c > 0: \quad x \in (-\infty, x_1) \cup (x_2, +\infty)`],
          ['Postać iloczynowa', T`a(x - x_1)(x - x_2)`, 8]
        ],
        examples: [
          ['Zadanie otwarte', '2 pkt', T`Rozwiąż nierówność $x^2 - 5x \le 14$.`, T`1. $x^2 - 5x - 14 \le 0$.` + '\n' + T`2. $\Delta = 25 + 56 = 81$, $x_1 = -2$, $x_2 = 7$.` + '\n' + T`3. Ramiona w górę, wartości niedodatnie są między miejscami zerowymi.` + '\n' + T`4. $x \in \langle -2, 7 \rangle$.`, 'Pierwszy punkt jest za miejsca zerowe, drugi za poprawny zbiór.'],
          ['Ramiona w dół', '1 pkt', T`Rozwiąż nierówność $-x^2 + 4 > 0$.`, T`1. Miejsca zerowe: $x = -2$, $x = 2$.` + '\n' + T`2. $a = -1$, ramiona w dół – nad osią jest środek.` + '\n' + T`3. $x \in (-2, 2)$.`, 'Znak współczynnika a decyduje o kierunku ramion.']
        ],
        trap: T`Nierówności $x^2 < 9$ nie wolno „spierwiastkować” do $x < 3$. Poprawny zbiór to $(-3, 3)$.`,
        fail: T`$x^2 < 9$, więc $x < 3$.`,
        win: T`$x^2 - 9 < 0$, miejsca zerowe $-3$ i $3$, ramiona w górę: $x \in (-3, 3)$.`,
        why: 'Liczby ujemne o dużej wartości bezwzględnej też mają duże kwadraty: (-5)² = 25, co nie jest mniejsze od 9.',
        ckeTip: 'Zawsze narysuj parabolę, choćby odręcznie na marginesie – egzaminator przyznaje punkt za poprawne miejsca zerowe nawet przy błędnym zbiorze.',
        points: [T`Zawsze: miejsca zerowe, szkic, odczyt.`, T`$a > 0$: ujemne w środku. $a < 0$: dodatnie w środku.`, T`$\Delta < 0$: odpowiedzią jest cały zbiór liczb rzeczywistych albo zbiór pusty.`]
      }),
      gens: [quadIneq, quadIneqFactored, quadIneqCountInt, quadIneqPure, quadIneqNoRoots]
    },
    {
      title: 'Równania wielomianowe: iloczyn i grupowanie',
      short_title: 'Równania wielomianowe',
      time: '~6 min',
      pill: pill({
        essence: T`Równanie wyższego stopnia rozwiązujesz, doprowadzając lewą stronę do iloczynu, a prawą do zera. Wtedy korzystasz z zasady: iloczyn jest równy zero tylko wtedy, gdy któryś czynnik jest równy zero. Na poziomie podstawowym do iloczynu dochodzisz dwiema metodami: wyłączaniem wspólnego czynnika przed nawias albo grupowaniem wyrazów.`,
        context: 'Zadanie otwarte za 2–3 pkt („Rozwiąż równanie… Zapisz obliczenia”) w niemal każdym arkuszu.',
        pl: T`Jeśli mnożysz kilka liczb i wychodzi zero, to któraś z nich musiała być zerem – innej opcji nie ma. Dlatego z $(x - 2)(x + 3) = 0$ od razu czytasz: $x = 2$ albo $x = -3$.`,
        steps: [
          ['Doprowadź do iloczynu', T`$x^3 - 2x^2 - 9x + 18 = 0$ grupujemy: $x^2(x - 2) - 9(x - 2) = 0$.`, 'Cztery wyrazy – grupowanie parami.'],
          ['Wyłącz wspólny nawias', T`$(x - 2)(x^2 - 9) = 0$.`, 'W obu parach musi zostać ten sam nawias.'],
          ['Każdy czynnik przyrównaj do zera', T`$x - 2 = 0$ lub $x^2 - 9 = 0$.`, T`$x^2 = 9$ daje $x = 3$ lub $x = -3$.`],
          ['Zapisz wszystkie rozwiązania', T`$x \in \{-3, 2, 3\}$.`, 'Policz, czy żadne nie zginęło.']
        ],
        formulas: [
          ['Zasada iloczynu', T`A \cdot B = 0 \ \text{gdy} \ A = 0 \ \text{lub} \ B = 0`],
          ['Równanie x² = k (k > 0)', T`x = \sqrt{k} \ \text{lub} \ x = -\sqrt{k}`],
          ['Różnica kwadratów', T`x^2 - k^2 = (x - k)(x + k)`, 7]
        ],
        examples: [
          ['Zadanie otwarte', '3 pkt', T`Rozwiąż równanie $x^3 - 2x^2 - 3x + 6 = 0$.`, T`1. $x^2(x - 2) - 3(x - 2) = 0$.` + '\n' + T`2. $(x - 2)(x^2 - 3) = 0$.` + '\n' + T`3. $x = 2$ lub $x^2 = 3$, czyli $x = \sqrt{3}$ lub $x = -\sqrt{3}$.`, T`Rozwiązania nie muszą być całkowite: $x^2 = 3$ daje $\pm\sqrt{3}$.`],
          ['Wyłączanie', '1 pkt', T`Rozwiąż równanie $x^3 - 16x = 0$.`, T`1. $x(x^2 - 16) = 0$.` + '\n' + T`2. $x = 0$ lub $x = 4$ lub $x = -4$.`, 'Trzy rozwiązania, w tym zero.']
        ],
        trap: T`$x^2 + 9 = 0$ NIE ma rozwiązań. Nie dopisuj z rozpędu $x = \pm 3$ – to działa tylko dla $x^2 - 9 = 0$.`,
        fail: T`$(x - 2)(x^2 + 9) = 0$, więc $x = 2$, $x = 3$, $x = -3$.`,
        win: T`$x^2 + 9 > 0$ dla każdego $x$, więc jedynym rozwiązaniem jest $x = 2$.`,
        why: 'Kwadrat liczby rzeczywistej jest nieujemny, więc x² + 9 wynosi co najmniej 9.',
        ckeTip: 'Za samo poprawne pogrupowanie i wyłączenie nawiasu dostajesz już 1–2 punkty, nawet jeśli pomylisz się na końcu.',
        points: [T`Prawa strona musi być zerem, lewa – iloczynem.`, T`$x^2 = k$ dla $k > 0$ ma dwa rozwiązania.`, T`Nigdy nie dziel równania przez $x$ – wyłącz go przed nawias.`]
      }),
      gens: [polyEqProduct, polyEqCount, polyEqGroup3, polyEqGroup1, polyEqFactorOut, polyEqOneOf]
    },
    {
      title: 'Równania wymierne i dziedzina',
      short_title: 'Równania wymierne',
      pill: pill({
        essence: T`Równanie wymierne ma niewiadomą w mianowniku. Rozwiązanie zaczynasz zawsze od dziedziny: mianownik nie może być zerem. Równanie postaci $\frac{W(x)}{V(x)} = 0$ jest spełnione, gdy licznik jest zerem – ale tylko dla liczb z dziedziny. Liczbę, która zeruje jednocześnie licznik i mianownik, trzeba odrzucić.`,
        context: 'Zadania 6–9 w arkuszu • 1 pkt. Najczęstsze pytanie: ile rozwiązań ma równanie.',
        pl: T`Ułamek jest zerem tylko wtedy, gdy na górze jest zero, a na dole coś sensownego. $0 : 5 = 0$ – w porządku. Ale $0 : 0$ to nie jest zero, to w ogóle nie jest liczba. Dlatego kandydatów z licznika trzeba „przepuścić przez bramkę” dziedziny.`,
        steps: [
          ['Wyznacz dziedzinę', T`Dla $\frac{(x - 3)(x + 4)}{x - 3} = 0$: $x \neq 3$.`, 'Mianownik różny od zera.'],
          ['Przyrównaj licznik do zera', T`$(x - 3)(x + 4) = 0$, więc $x = 3$ lub $x = -4$.`, 'To dopiero kandydaci.'],
          ['Odrzuć liczby spoza dziedziny', T`$x = 3$ odpada. Zostaje $x = -4$.`, 'Równanie ma jedno rozwiązanie.']
        ],
        formulas: [
          ['Ułamek równy zero', T`\frac{W(x)}{V(x)} = 0 \ \text{gdy} \ W(x) = 0 \ \text{i} \ V(x) \neq 0`],
          ['Proporcja', T`\frac{a}{b} = \frac{c}{d} \ \text{daje} \ a \cdot d = b \cdot c`]
        ],
        examples: [
          ['Zadanie typowe', '1 pkt', T`Ile rozwiązań ma równanie $\frac{(x + 1)(x - 2)}{x + 1} = 0$?`, T`1. Dziedzina: $x \neq -1$.` + '\n' + T`2. Licznik zeruje się dla $x = -1$ i $x = 2$.` + '\n' + T`3. $x = -1$ odrzucamy. Jedno rozwiązanie: $x = 2$.`, 'Zera licznika zawsze porównaj z dziedziną.'],
          ['Proporcja', '2 pkt', T`Rozwiąż równanie $\frac{2x + 1}{x - 3} = 3$.`, T`1. Dziedzina: $x \neq 3$.` + '\n' + T`2. $2x + 1 = 3(x - 3)$, czyli $2x + 1 = 3x - 9$.` + '\n' + T`3. $x = 10$ – należy do dziedziny.`, 'Mnożysz obie strony przez mianownik.']
        ],
        trap: T`Liczba zerująca licznik I mianownik NIE jest rozwiązaniem. W równaniu $\frac{(x - 3)(x + 4)}{x - 3} = 0$ rozwiązaniem jest tylko $-4$.`,
        fail: T`Licznik ma dwa miejsca zerowe, więc równanie ma dwa rozwiązania.`,
        win: T`Jedno z miejsc zerowych licznika zeruje też mianownik, więc zostaje jedno rozwiązanie.`,
        why: 'Dla takiej liczby lewa strona równania w ogóle nie istnieje, więc nie może być równa zero.',
        ckeTip: 'Zapisz dziedzinę w pierwszej linijce rozwiązania – wtedy na końcu nie zapomnisz z nią porównać.',
        points: [T`Krok pierwszy to zawsze dziedzina.`, T`Ułamek jest zerem, gdy licznik jest zerem.`, T`Rozwiązania spoza dziedziny odrzucasz.`]
      }),
      gens: [ratEqCount, ratEqSolutions, ratEqLinear, ratEqProportion]
    }
  ]
};
