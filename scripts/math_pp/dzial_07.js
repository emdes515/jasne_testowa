import { T, mc, num, pf, pill, fr, par, lin, quad, m, need, gcd } from './lib.js';

const TIP_AR = 'Karta wzorów, str. 9: ciąg arytmetyczny $a_n = a_1 + (n - 1)r$, $S_n = \\frac{a_1 + a_n}{2} \\cdot n$.';
const mi = (x) => (Number.isInteger(x) ? m(x) : undefined);
const TIP_GEO = 'Karta wzorów, str. 9: ciąg geometryczny $a_n = a_1 \\cdot q^{n-1}$, $S_n = a_1 \\cdot \\frac{1 - q^n}{1 - q}$ dla $q \\neq 1$.';

// ---------- 7.1 Wzór ogólny, rekurencja, monotoniczność ----------
const seqTerm = (r) => {
  const k = r.int(2, 7);
  const variant = r.int(0, 2);
  if (variant === 0) {
    const c = r.int(1, 6);
    const d = r.int(1, 4);
    const [nn, dd] = [(-1) ** k * (k + c), d + 1];
    need(nn % dd !== 0);
    return mc({
      title: 'Wyraz ciągu ze wzoru ogólnego',
      q: T`Ciąg $(a_n)$ jest określony wzorem $a_n = (-1)^n \cdot \frac{n + ${c}}{${dd}}$ dla każdej liczby naturalnej $n \ge 1$. Wyraz $a_{${k}}$ jest równy`,
      ok: m(fr(nn, dd)),
      val: nn / dd,
      bad: [m(fr(-nn, dd)), m(fr((-1) ** k * k, dd)), m(fr(dd, nn)), m(fr(nn + dd, dd))],
      steps: [T`Podstawiamy $n = ${k}$: $a_{${k}} = (-1)^{${k}} \cdot \frac{${k} + ${c}}{${dd}}$.`, T`$(-1)^{${k}} = ${(-1) ** k}$, więc $a_{${k}} = ${fr(nn, dd)}$.`],
      trap: T`$(-1)^n$ jest równe $1$ dla $n$ parzystego i $-1$ dla $n$ nieparzystego. Tutaj $n = ${k}$ jest ${k % 2 === 0 ? 'parzyste' : 'nieparzyste'}.`,
      tip: 'Wyraz o numerze $k$ otrzymasz, wstawiając $k$ w miejsce każdego $n$ we wzorze ogólnym.'
    });
  }
  if (variant === 1) {
    const b = r.intNot(-9, 9, 0);
    const c = r.int(-9, 9);
    const v = k * k + b * k + c;
    return mc({
      title: 'Wyraz ciągu ze wzoru ogólnego',
      q: T`Ciąg $(a_n)$ jest określony wzorem $a_n = ${quad(1, b, c).replace(/x/g, 'n')}$ dla każdej liczby naturalnej $n \ge 1$. Wyraz $a_{${k}}$ jest równy`,
      ok: m(v),
      val: v,
      bad: [m(2 * k + b * k + c), m(k * k - b * k + c), m(v - c || v + 1), m(v + k), m(-v === v ? 1 : -v)],
      steps: [T`Podstawiamy $n = ${k}$: $a_{${k}} = ${k}^2 ${b > 0 ? '+' : '-'} ${Math.abs(b)} \cdot ${k} ${c === 0 ? '' : (c > 0 ? '+ ' : '- ') + Math.abs(c)}$.`, T`$a_{${k}} = ${k * k} ${b > 0 ? '+' : '-'} ${Math.abs(b * k)} ${c === 0 ? '' : (c > 0 ? '+ ' : '- ') + Math.abs(c)} = ${v}$.`],
      trap: T`$${k}^2 = ${k * k}$, a nie $${2 * k}$. Potęgowanie to nie mnożenie przez 2.`,
      tip: 'Wyraz o numerze $k$ otrzymasz, wstawiając $k$ w miejsce każdego $n$ we wzorze ogólnym.'
    });
  }
  const a = r.int(2, 4);
  const b = r.intNot(-5, 5, 0);
  const c = r.int(1, 5);
  const [nn, dd] = [a * k + b, k + c];
  need(nn % dd !== 0 && nn !== 0);
  return mc({
    title: 'Wyraz ciągu ze wzoru ogólnego',
    q: T`Ciąg $(a_n)$ jest określony wzorem $a_n = \frac{${lin(a, b, 'n')}}{n + ${c}}$ dla każdej liczby naturalnej $n \ge 1$. Wyraz $a_{${k}}$ jest równy`,
    ok: m(fr(nn, dd)),
    val: nn / dd,
    bad: [m(fr(dd, nn)), m(fr(a * k - b || 1, dd)), m(fr(nn, k * c)), m(fr(a + b || 1, 1 + c)), m(fr(nn + 1, dd))],
    steps: [T`Podstawiamy $n = ${k}$ w liczniku i w mianowniku: $a_{${k}} = \frac{${a} \cdot ${k} ${b > 0 ? '+' : '-'} ${Math.abs(b)}}{${k} + ${c}}$.`, (gcd(nn, dd) === 1 && nn > 0 ? T`$a_{${k}} = ${fr(nn, dd)}$.` : T`$a_{${k}} = \frac{${nn}}{${dd}} = ${fr(nn, dd)}$.`)],
    trap: T`Numer wyrazu wstawiasz wszędzie, gdzie stoi $n$ – także w mianowniku.`,
    tip: 'Wyraz o numerze $k$ otrzymasz, wstawiając $k$ w miejsce każdego $n$ we wzorze ogólnym.'
  });
};
const seqRecursive = (r) => {
  const a1 = r.intNot(-4, 5, 0);
  const k = r.pick([2, 3, -1, -2]);
  const d = r.intNot(-5, 5, 0);
  const a2 = k * a1 + d;
  const a3 = k * a2 + d;
  const a4 = k * a3 + d;
  const ask = r.pick([3, 4]);
  const v = ask === 3 ? a3 : a4;
  need(Math.abs(v) <= 150);
  return mc({
    title: 'Ciąg określony rekurencyjnie',
    q: T`Ciąg $(a_n)$ jest określony rekurencyjnie: $a_1 = ${a1}$ oraz $a_{n+1} = ${k === -1 ? '-' : k}a_n ${d > 0 ? '+' : '-'} ${Math.abs(d)}$ dla każdej liczby naturalnej $n \ge 1$. Wyraz $a_{${ask}}$ jest równy`,
    ok: m(v),
    val: v,
    bad: [m(ask === 3 ? a2 : a3), m(ask === 3 ? a4 : k * a4 + d), m(k * a1 * (ask - 1) + d), m(v + d), m(-v === v ? 1 : -v)],
    steps: [T`$a_2 = ${k} \cdot ${par(a1)} ${d > 0 ? '+' : '-'} ${Math.abs(d)} = ${a2}$.`, T`$a_3 = ${k} \cdot ${par(a2)} ${d > 0 ? '+' : '-'} ${Math.abs(d)} = ${a3}$.`, ...(ask === 4 ? [T`$a_4 = ${k} \cdot ${par(a3)} ${d > 0 ? '+' : '-'} ${Math.abs(d)} = ${a4}$.`] : [])],
    trap: T`We wzorze rekurencyjnym nie da się „przeskoczyć” wyrazów. Żeby obliczyć $a_{${ask}}$, trzeba po kolei policzyć wszystkie wcześniejsze.`,
    tip: 'Wzór rekurencyjny mówi, jak z wyrazu poprzedniego zrobić następny – liczysz krok po kroku od $a_1$.'
  });
};
const seqMonotonic = (r) => {
  const k = r.intNot(-6, 6, 0);
  const c = r.int(-9, 9);
  const pool = [
    [`a_n = ${lin(k, c, 'n')}`, k > 0 ? 'rosnący' : 'malejący', T`$a_{n+1} - a_n = ${k}$ – różnica jest stała i ${k > 0 ? 'dodatnia' : 'ujemna'}.`],
    [`a_n = n^2 + ${Math.abs(c) + 1}`, 'rosnący', T`$a_{n+1} - a_n = (n + 1)^2 - n^2 = 2n + 1 > 0$.`],
    [T`a_n = \frac{${Math.abs(k) + 1}}{n}`, 'malejący', T`im większy mianownik, tym mniejszy ułamek o dodatnim liczniku: $a_1 > a_2 > a_3 > \ldots$`],
    [`a_n = ${Math.abs(c) + 2}`, 'stały', T`każdy wyraz jest równy $${Math.abs(c) + 2}$, więc $a_{n+1} - a_n = 0$.`],
    [T`a_n = (-1)^n \cdot ${Math.abs(k) + 1}`, 'niemonotoniczny', T`wyrazy są na przemian równe $-${Math.abs(k) + 1}$ i $${Math.abs(k) + 1}$ – ciąg ani nie rośnie, ani nie maleje.`],
    [`a_n = -n^2 + ${Math.abs(c)}`.replace(' + 0', ''), 'malejący', T`$a_{n+1} - a_n = -(n + 1)^2 + n^2 = -2n - 1 < 0$.`]
  ];
  const [formula, kind, why] = r.pick(pool);
  const all = ['rosnący', 'malejący', 'stały', 'niemonotoniczny'];
  return mc({
    title: 'Monotoniczność ciągu',
    q: T`Ciąg $(a_n)$ jest określony wzorem $${formula}$ dla każdej liczby naturalnej $n \ge 1$. Ciąg ten jest`,
    ok: kind,
    bad: all.filter((x) => x !== kind),
    steps: [T`Badamy, jak zmieniają się kolejne wyrazy: ${why}`, T`Ciąg jest ${kind}.`],
    trap: T`O monotoniczności decyduje różnica $a_{n+1} - a_n$ dla każdego $n$, a nie same dwa pierwsze wyrazy.`,
    tip: 'Ciąg jest rosnący, gdy $a_{n+1} - a_n > 0$ dla każdego $n$, a malejący, gdy $a_{n+1} - a_n < 0$.'
  });
};
const seqCountPositive = (r) => {
  const k = r.int(2, 7);
  const c = r.int(8, 60);
  need(c % k !== 0);
  const v = Math.floor(c / k);
  return mc({
    title: 'Liczba dodatnich wyrazów ciągu',
    q: T`Ciąg $(a_n)$ jest określony wzorem $a_n = ${c} - ${k}n$ dla każdej liczby naturalnej $n \ge 1$. Liczba wszystkich dodatnich wyrazów tego ciągu jest równa`,
    ok: m(v),
    val: v,
    bad: [m(v + 1), m(v - 1), m(c - k), m(c), m(v + 2)],
    steps: [T`Rozwiązujemy nierówność $${c} - ${k}n > 0$, czyli $${k}n < ${c}$.`, T`$n < ${fr(c, k)}$, czyli $n < ${String(Math.round((c / k) * 100) / 100).replace('.', '{,}')}${Number.isInteger((c * 100) / k) ? '' : '\\ldots'}$.`, T`Numery wyrazów są liczbami naturalnymi od $1$, więc $n \in \{1, 2, \ldots, ${v}\}$ – jest ich $${v}$.`],
    trap: T`Pytanie dotyczy liczby wyrazów, czyli liczby naturalnych $n$ spełniających nierówność – nie wartości granicznej $${fr(c, k)}$.`,
    tip: 'Pytanie „ile wyrazów ciągu jest dodatnich” zamień na nierówność $a_n > 0$ i policz naturalne $n$.'
  });
};
const seqWhichTerm = (r) => {
  const a = r.int(2, 6);
  const b = r.intNot(-9, 9, 0);
  const k = r.int(3, 14);
  const v = a * k + b;
  return mc({
    title: 'Numer wyrazu o danej wartości',
    q: T`Ciąg $(a_n)$ jest określony wzorem $a_n = ${lin(a, b, 'n')}$ dla każdej liczby naturalnej $n \ge 1$. Wyrazem tego ciągu równym $${v}$ jest`,
    ok: m(`a_{${k}}`),
    bad: [m(`a_{${k + 1}}`), m(`a_{${k - 1}}`), m(`a_{${k + 2}}`), m(`a_{${v > 0 && v !== k ? Math.min(v, 99) : k + 3}}`)],
    steps: [T`Rozwiązujemy równanie $${lin(a, b, 'n')} = ${v}$.`, T`$${a}n = ${v - b}$, więc $n = ${k}$.`],
    trap: T`Wartość wyrazu ($${v}$) i jego numer ($${k}$) to dwie różne liczby. Pytają o numer.`,
    tip: 'Szukasz numeru wyrazu? Przyrównaj wzór ogólny do podanej wartości i rozwiąż równanie – wynik musi być liczbą naturalną.'
  });
};

// ---------- 7.2 Ciąg arytmetyczny: n-ty wyraz ----------
const arNth = (r) => {
  const a1 = r.int(-9, 12);
  const rr = r.intNot(-6, 7, 0);
  const n = r.int(5, 21);
  const v = a1 + (n - 1) * rr;
  return mc({
    title: 'Wyraz ciągu arytmetycznego',
    q: T`W ciągu arytmetycznym $(a_n)$, określonym dla każdej liczby naturalnej $n \ge 1$, dane są: $a_1 = ${a1}$ oraz różnica $r = ${rr}$. Wyraz $a_{${n}}$ jest równy`,
    ok: m(v),
    val: v,
    bad: [m(a1 + n * rr), m(a1 + (n - 2) * rr), m(a1 * n + rr), m(v + 2 * rr), m(a1 - (n - 1) * rr)],
    steps: [T`$a_n = a_1 + (n - 1)r$, więc $a_{${n}} = ${a1} + ${n - 1} \cdot ${par(rr)}$.`, T`$a_{${n}} = ${a1} ${(n - 1) * rr >= 0 ? '+' : '-'} ${Math.abs((n - 1) * rr)} = ${v}$.`],
    trap: T`Różnicę mnożymy przez $n - 1 = ${n - 1}$, a nie przez $${n}$ – od pierwszego do $${n}$. wyrazu jest $${n - 1}$ „kroków”.`,
    tip: TIP_AR
  });
};
const arDiffFromTwo = (r) => {
  const rr = r.intNot(-6, 7, 0);
  const a1 = r.int(-9, 12);
  const k = r.int(2, 6);
  const mm = k + r.int(2, 6);
  const [ak, am] = [a1 + (k - 1) * rr, a1 + (mm - 1) * rr];
  const askA1 = r.bool();
  const v = askA1 ? a1 : rr;
  return mc({
    title: askA1 ? 'Pierwszy wyraz ciągu arytmetycznego' : 'Różnica ciągu arytmetycznego',
    q: T`W ciągu arytmetycznym $(a_n)$, określonym dla każdej liczby naturalnej $n \ge 1$, dane są wyrazy $a_{${k}} = ${ak}$ oraz $a_{${mm}} = ${am}$. ${askA1 ? 'Pierwszy wyraz $a_1$ tego ciągu jest równy' : 'Różnica $r$ tego ciągu jest równa'}`,
    ok: m(v),
    val: v,
    bad: askA1 ? [m(ak - k * rr), m(rr === a1 ? a1 + 1 : rr), m(ak), m(a1 + rr), m(a1 - rr)] : [m(am - ak === rr ? rr + 1 : am - ak), m(-rr), m(fr(am - ak, mm) === `${rr}` ? rr + 2 : fr(am - ak, mm)), m(rr + 1), m(fr(am + ak, mm - k) === `${rr}` ? rr - 1 : fr(am + ak, mm - k))],
    steps: [T`Między wyrazami $a_{${k}}$ i $a_{${mm}}$ jest $${mm - k}$ „kroków”: $a_{${mm}} - a_{${k}} = ${mm - k}r$.`, T`$${am} - ${par(ak)} = ${mm - k}r$, więc $r = ${rr}$.`, ...(askA1 ? [T`$a_1 = a_{${k}} - ${k - 1}r = ${ak} - ${k - 1} \cdot ${par(rr)} = ${a1}$.`] : [])],
    trap: T`Różnicę wartości dzielimy przez różnicę numerów ($${mm} - ${k} = ${mm - k}$), a nie przez większy numer.`,
    tip: 'W ciągu arytmetycznym $a_m - a_k = (m - k) \\cdot r$.'
  });
};
const arGeneralFormula = (r) => {
  const a1 = r.int(-9, 12);
  const rr = r.intNot(-6, 7, 0);
  const f = (a, b) => m(`a_n = ${lin(a, b, 'n')}`);
  need(a1 - rr !== a1);
  return mc({
    title: 'Wzór ogólny ciągu arytmetycznego',
    q: T`W ciągu arytmetycznym $(a_n)$, określonym dla każdej liczby naturalnej $n \ge 1$, dane są: $a_1 = ${a1}$ oraz $a_2 = ${a1 + rr}$. Wzór ogólny tego ciągu ma postać`,
    ok: f(rr, a1 - rr),
    bad: [f(rr, a1), f(a1, rr), f(rr, a1 + rr), f(-rr, a1 + rr), f(a1 === 0 ? 2 : a1, -rr)],
    steps: [T`Różnica: $r = a_2 - a_1 = ${a1 + rr} - ${par(a1)} = ${rr}$.`, T`$a_n = a_1 + (n - 1)r = ${a1} + (n - 1) \cdot ${par(rr)}$.`, T`Po uproszczeniu: $a_n = ${lin(rr, a1 - rr, 'n')}$.`],
    trap: T`Wyraz wolny we wzorze to $a_1 - r = ${a1 - rr}$, a nie $a_1 = ${a1}$. Sprawdź: dla $n = 1$ wzór musi dać $${a1}$.`,
    tip: TIP_AR
  });
};
const arDiffFromFormula = (r) => {
  const k = r.intNot(-7, 7, 0);
  const c = r.intNot(-9, 9, 0);
  return mc({
    title: 'Różnica ciągu ze wzoru ogólnego',
    q: T`Ciąg arytmetyczny $(a_n)$ jest określony wzorem $a_n = ${lin(k, c, 'n')}$ dla każdej liczby naturalnej $n \ge 1$. Różnica tego ciągu jest równa`,
    ok: m(k),
    val: k,
    bad: [m(c === k ? c + 1 : c), m(k + c === k ? k + 2 : k + c), m(-k), m(2 * k + c)],
    steps: [T`$a_{n+1} - a_n = ${k}(n + 1) ${c > 0 ? '+' : '-'} ${Math.abs(c)} - (${lin(k, c, 'n')}) = ${k}$.`, T`Kontrola: $a_1 = ${k + c}$, $a_2 = ${2 * k + c}$, $a_2 - a_1 = ${k}$.`],
    trap: T`Różnica to współczynnik przy $n$. Wyraz wolny $${c}$ nie jest ani różnicą, ani pierwszym wyrazem (pierwszy wyraz to $a_1 = ${k + c}$).`,
    tip: 'We wzorze $a_n = kn + c$ ciągu arytmetycznego współczynnik $k$ przy $n$ jest jego różnicą.'
  });
};
const arWordProblem = (r) => {
  const a1 = r.pick([12, 15, 18, 20, 24, 30]);
  const rr = r.int(2, 6);
  const n = r.int(8, 20);
  const v = a1 + (n - 1) * rr;
  return num({
    title: 'Ciąg arytmetyczny w zadaniu praktycznym',
    q: T`W pierwszym rzędzie sali widowiskowej jest $${a1}$ miejsc, a w każdym następnym rzędzie o $${rr}$ ${rr < 5 ? 'miejsca' : 'miejsc'} więcej niż w poprzednim. Ile miejsc jest w rzędzie $${n}$.? Wpisz liczbę.`,
    ans: v,
    steps: [T`Liczby miejsc w kolejnych rzędach tworzą ciąg arytmetyczny: $a_1 = ${a1}$, $r = ${rr}$.`, T`$a_{${n}} = ${a1} + ${n - 1} \cdot ${rr} = ${v}$.`],
    trap: T`Od pierwszego do $${n}$. rzędu jest $${n - 1}$ „przeskoków”, więc $${rr}$ dodajemy $${n - 1}$ razy, a nie $${n}$.`,
    tip: TIP_AR
  });
};

// ---------- 7.3 Suma ciągu arytmetycznego ----------
const arSumFirstLast = (r) => {
  const a1 = r.int(-9, 15);
  const n = r.int(6, 24);
  const rr = r.intNot(-5, 6, 0);
  const an = a1 + (n - 1) * rr;
  const S = ((a1 + an) * n) / 2;
  return mc({
    title: 'Suma wyrazów ciągu arytmetycznego',
    q: T`W ciągu arytmetycznym $(a_n)$, określonym dla każdej liczby naturalnej $n \ge 1$, dane są: $a_1 = ${a1}$ oraz $a_{${n}} = ${an}$. Suma $${n}$ początkowych wyrazów tego ciągu jest równa`,
    ok: m(S),
    val: S,
    bad: [mi((a1 + an) * n), mi(((a1 + an) * (n - 1)) / 2), mi(((an - a1) * n) / 2), mi(S + n), mi(a1 + an), mi(S - n)],
    steps: [T`$S_n = \frac{a_1 + a_n}{2} \cdot n$.`, T`$S_{${n}} = \frac{${a1} + ${par(an)}}{2} \cdot ${n} = \frac{${a1 + an}}{2} \cdot ${n} = ${S}$.`],
    trap: T`We wzorze na sumę jest dzielenie przez $2$ – suma to „średnia skrajnych wyrazów razy liczba wyrazów”.`,
    tip: TIP_AR
  });
};
const arSumFromR = (r) => {
  const a1 = r.int(-6, 12);
  const rr = r.intNot(-4, 6, 0);
  const n = r.int(6, 20);
  const an = a1 + (n - 1) * rr;
  const S = ((a1 + an) * n) / 2;
  return mc({
    title: 'Suma z pierwszego wyrazu i różnicy',
    q: T`W ciągu arytmetycznym $(a_n)$, określonym dla każdej liczby naturalnej $n \ge 1$, dane są: $a_1 = ${a1}$ oraz różnica $r = ${rr}$. Suma $${n}$ początkowych wyrazów tego ciągu jest równa`,
    ok: m(S),
    val: S,
    bad: [mi(((a1 + a1 + n * rr) * n) / 2), mi((a1 + an) * n), mi(an), mi(S - an), mi(S + rr * n), mi(S + n)],
    steps: [T`Najpierw ostatni wyraz: $a_{${n}} = ${a1} + ${n - 1} \cdot ${par(rr)} = ${an}$.`, T`$S_{${n}} = \frac{${a1} + ${par(an)}}{2} \cdot ${n} = ${S}$.`],
    trap: T`Do wzoru na sumę potrzebny jest wyraz $a_{${n}}$, liczony z $n - 1 = ${n - 1}$ różnicami.`,
    tip: 'Karta wzorów, str. 9: $S_n = \\frac{2a_1 + (n - 1)r}{2} \\cdot n$ – wersja wzoru bez liczenia $a_n$.'
  });
};
const arSumNaturals = (r) => {
  const d = r.pick([2, 3, 4, 5, 6, 7]);
  const lo = r.pick([1, 10]);
  const hi = lo === 1 ? r.pick([30, 40, 50, 60, 100]) : 99;
  const first = Math.ceil(lo / d) * d;
  const last = Math.floor(hi / d) * d;
  const n = (last - first) / d + 1;
  const S = ((first + last) * n) / 2;
  return mc({
    title: 'Suma liczb podzielnych przez daną liczbę',
    q: lo === 1 ? T`Suma wszystkich liczb naturalnych dodatnich, które są podzielne przez $${d}$ i nie większe od $${hi}$, jest równa` : T`Suma wszystkich liczb naturalnych dwucyfrowych podzielnych przez $${d}$ jest równa`,
    ok: m(S),
    val: S,
    bad: [mi(((first + last) * (n + 1)) / 2), mi((first + last) * n), mi(((first + last) * (n - 1)) / 2), mi(S + last), mi(S - first), mi(S + d)],
    steps: [T`Te liczby tworzą ciąg arytmetyczny o różnicy $${d}$: pierwsza to $${first}$, ostatnia to $${last}$.`, T`Liczba wyrazów: $n = \frac{${last} - ${first}}{${d}} + 1 = ${n}$.`, T`$S = \frac{${first} + ${last}}{2} \cdot ${n} = ${S}$.`],
    trap: T`Liczbę wyrazów liczymy jako $\frac{\text{ostatni} - \text{pierwszy}}{r} + 1$. Bez „$+1$” wychodzi o jeden wyraz za mało.`,
    tip: TIP_AR
  });
};
const arInstallments = (r) => {
  const n = r.pick([10, 12, 15, 18, 20]);
  const d = r.pick([10, 15, 20, 25, 30]);
  const last = r.pick([100, 120, 150, 200, 240]);
  const first = last + (n - 1) * d;
  const S = ((first + last) * n) / 2;
  const askFirst = r.bool();
  return num({
    title: 'Raty tworzące ciąg arytmetyczny',
    q: askFirst
      ? T`Pan Adam spłacił pożyczkę w wysokości $${S}$ zł w $${n}$ ratach. Każda kolejna rata była o $${d}$ zł mniejsza od poprzedniej. Oblicz kwotę pierwszej raty (w złotych). Wpisz liczbę.`
      : T`Pani Ewa spłaciła pożyczkę w $${n}$ ratach. Pierwsza rata była równa $${first}$ zł, a każda kolejna była o $${d}$ zł mniejsza od poprzedniej. Oblicz łączną kwotę spłaconych rat (w złotych). Wpisz liczbę.`,
    ans: askFirst ? first : S,
    steps: askFirst
      ? [T`Raty tworzą ciąg arytmetyczny o różnicy $r = -${d}$ i $n = ${n}$. Ze wzoru $S_n = \frac{2a_1 + (n - 1)r}{2} \cdot n$: $${S} = \frac{2a_1 - ${(n - 1) * d}}{2} \cdot ${n}$.`, T`$2a_1 - ${(n - 1) * d} = ${(2 * S) / n}$, więc $2a_1 = ${(2 * S) / n + (n - 1) * d}$.`, T`$a_1 = ${first}$ zł.`]
      : [T`Raty tworzą ciąg arytmetyczny: $a_1 = ${first}$, $r = -${d}$, $n = ${n}$.`, T`Ostatnia rata: $a_{${n}} = ${first} - ${n - 1} \cdot ${d} = ${last}$.`, T`$S_{${n}} = \frac{${first} + ${last}}{2} \cdot ${n} = ${S}$ zł.`],
    trap: T`Raty maleją, więc różnica ciągu jest ujemna: $r = -${d}$.`,
    tip: TIP_AR
  });
};

// ---------- 7.4 Ciąg geometryczny ----------
const geoNth = (r) => {
  const a1 = r.pick([1, 2, 3, 4, 5, -2, -3]);
  const q = r.pick([2, 3, -2, T`\frac{1}{2}`]);
  const n = r.int(3, 6);
  const qv = typeof q === 'number' ? q : 0.5;
  const a1x = typeof q === 'number' ? a1 : a1 * 64;
  const v = a1x * qv ** (n - 1);
  need(Math.abs(v) <= 2000 && Number.isInteger(v));
  return mc({
    title: 'Wyraz ciągu geometrycznego',
    q: T`W ciągu geometrycznym $(a_n)$, określonym dla każdej liczby naturalnej $n \ge 1$, dane są: $a_1 = ${a1x}$ oraz iloraz $q = ${q}$. Wyraz $a_{${n}}$ jest równy`,
    ok: m(v),
    val: v,
    bad: [m(a1x * qv ** n), m(a1x * qv ** (n - 2)), m(a1x * qv * (n - 1)), m(a1x + (n - 1) * qv), m(-v)].filter((o) => !o.includes('.')),
    steps: [T`$a_n = a_1 \cdot q^{n-1}$, więc $a_{${n}} = ${a1x} \cdot \left(${q}\right)^{${n - 1}}$.`, T`$\left(${q}\right)^{${n - 1}} = ${fr(Math.round(qv ** (n - 1) * 64), 64)}$, więc $a_{${n}} = ${v}$.`],
    trap: T`Wykładnik to $n - 1 = ${n - 1}$, a nie $${n}$. Od pierwszego do $${n}$. wyrazu mnożymy przez $q$ dokładnie $${n - 1}$ razy.`,
    tip: TIP_GEO
  });
};
const geoRatio = (r) => {
  const q = r.pick([2, 3, 4, 5]);
  const inv = r.bool();
  const a = r.int(1, 6);
  const k = r.int(2, 5);
  const [x, y] = inv ? [a * q * q, a * q] : [a * q, a * q * q];
  const far = r.bool();
  const [x2, y2, gap] = far ? (inv ? [a * q * q, a, 2] : [a, a * q * q, 2]) : [x, y, 1];
  return mc({
    title: 'Iloraz ciągu geometrycznego',
    q: T`W ciągu geometrycznym $(a_n)$ o wyrazach dodatnich, określonym dla każdej liczby naturalnej $n \ge 1$, dane są wyrazy $a_{${k}} = ${x2}$ oraz $a_{${k + gap}} = ${y2}$. Iloraz $q$ tego ciągu jest równy`,
    ok: m(inv ? fr(1, q) : q),
    val: inv ? 1 / q : q,
    bad: [m(inv ? q : fr(1, q)), m(Math.abs(y2 - x2)), m(inv ? fr(1, q * q) : q * q), m(inv ? fr(1, q + 1) : q + 1), m(fr(y2, x2 * 2))],
    steps: far
      ? [T`$a_{${k + 2}} = a_{${k}} \cdot q^2$, więc $q^2 = \frac{${y2}}{${x2}} = ${fr(y2, x2)}$.`, T`Wyrazy są dodatnie, więc $q > 0$ i $q = ${inv ? fr(1, q) : q}$.`]
      : [T`Iloraz to wyraz następny podzielony przez poprzedni: $q = \frac{a_{${k + 1}}}{a_{${k}}}$.`, T`$q = \frac{${y2}}{${x2}} = ${inv ? fr(1, q) : q}$.`],
    trap: far ? T`Między $a_{${k}}$ i $a_{${k + 2}}$ są dwa „kroki”, więc stosunek wyrazów to $q^2$, a nie $q$.` : T`Dzielimy wyraz późniejszy przez wcześniejszy, nie odwrotnie. Różnica wyrazów to cecha ciągu arytmetycznego, nie geometrycznego.`,
    tip: 'W ciągu geometrycznym $\\frac{a_m}{a_k} = q^{m-k}$.'
  });
};
const geoSum = (r) => {
  const a1 = r.int(1, 5);
  const q = r.pick([2, 3, -2]);
  const n = r.int(3, 6);
  const S = (a1 * (1 - q ** n)) / (1 - q);
  need(Math.abs(S) <= 1500);
  const terms = Array.from({ length: n }, (_, i) => a1 * q ** i);
  return mc({
    title: 'Suma wyrazów ciągu geometrycznego',
    q: T`W ciągu geometrycznym $(a_n)$, określonym dla każdej liczby naturalnej $n \ge 1$, dane są: $a_1 = ${a1}$ oraz iloraz $q = ${q}$. Suma $${n}$ początkowych wyrazów tego ciągu jest równa`,
    ok: m(S),
    val: S,
    bad: [m(a1 * q ** n), m(a1 * q ** (n - 1)), m(S + a1 * q ** n), m(S - terms[n - 1]), m(((a1 + terms[n - 1]) * n) / 2)].filter((o) => !o.includes('.')),
    steps: [T`$S_n = a_1 \cdot \frac{1 - q^n}{1 - q}$, więc $S_{${n}} = ${a1} \cdot \frac{1 - ${par(q)}^{${n}}}{1 - ${par(q)}} = ${a1} \cdot \frac{${1 - q ** n}}{${1 - q}} = ${S}$.`, T`Kontrola przez wypisanie wyrazów: $${terms.map((t, i) => (i === 0 ? `${t}` : t >= 0 ? `+ ${t}` : `- ${-t}`)).join(' ')} = ${S}$.`],
    trap: T`Suma $${n}$ wyrazów to nie to samo co wyraz $a_{${n}}$ ani $a_{${n + 1}}$. Przy małym $n$ najpewniej wypisać wyrazy i je dodać.`,
    tip: TIP_GEO
  });
};
const geoFirstTerm = (r) => {
  const a1 = r.int(1, 6);
  const q = r.pick([2, 3]);
  const k = r.int(3, 5);
  const ak = a1 * q ** (k - 1);
  return mc({
    title: 'Pierwszy wyraz ciągu geometrycznego',
    q: T`W ciągu geometrycznym $(a_n)$, określonym dla każdej liczby naturalnej $n \ge 1$, iloraz jest równy $${q}$, a wyraz $a_{${k}} = ${ak}$. Pierwszy wyraz tego ciągu jest równy`,
    ok: m(a1),
    val: a1,
    bad: [m(fr(ak, q ** k)), m(ak / q), m(ak - (k - 1) * q), m(a1 + 1), m(a1 * q)],
    steps: [T`$a_{${k}} = a_1 \cdot q^{${k - 1}}$, czyli $${ak} = a_1 \cdot ${q}^{${k - 1}} = a_1 \cdot ${q ** (k - 1)}$.`, T`$a_1 = \frac{${ak}}{${q ** (k - 1)}} = ${a1}$.`],
    trap: T`Cofając się od $a_{${k}}$ do $a_1$, dzielimy przez $q$ dokładnie $${k - 1}$ razy, czyli przez $${q}^{${k - 1}}$.`,
    tip: TIP_GEO
  });
};
const geoFromFormula = (r) => {
  const c = r.int(2, 7);
  const q = r.pick([2, 3, 5]);
  const askQ = r.bool();
  const v = askQ ? q : c * q;
  return mc({
    title: askQ ? 'Iloraz ciągu ze wzoru ogólnego' : 'Pierwszy wyraz ze wzoru ogólnego',
    q: T`Ciąg geometryczny $(a_n)$ jest określony wzorem $a_n = ${c} \cdot ${q}^n$ dla każdej liczby naturalnej $n \ge 1$. ${askQ ? 'Iloraz tego ciągu jest równy' : 'Pierwszy wyraz tego ciągu jest równy'}`,
    ok: m(v),
    val: v,
    bad: askQ ? [m(c === q ? c + 1 : c), m(c * q), m(fr(1, q)), m(q * q)] : [m(c), m(q === c * q ? q + 1 : q), m(c * q * q), m(c + q === c * q ? c + q + 1 : c + q)],
    steps: [T`$a_1 = ${c} \cdot ${q}^1 = ${c * q}$, $a_2 = ${c} \cdot ${q}^2 = ${c * q * q}$.`, askQ ? T`$q = \frac{a_2}{a_1} = \frac{${c * q * q}}{${c * q}} = ${q}$.` : T`Pierwszy wyraz to $a_1 = ${c * q}$.`],
    trap: askQ ? T`Ilorazem jest podstawa potęgi ($${q}$), a nie liczba stojąca przed nią ($${c}$).` : T`Pierwszy wyraz to wartość dla $n = 1$, czyli $${c} \cdot ${q} = ${c * q}$, a nie $${c}$ (to byłoby dla $n = 0$).`,
    tip: 'Pierwsze dwa wyrazy policzone ze wzoru ogólnego wystarczą, żeby poznać $a_1$ i $q$.'
  });
};

// ---------- 7.5 Trzy kolejne wyrazy i zadania mieszane ----------
const threeArithmetic = (r) => {
  const a = r.int(-9, 12);
  const d = r.intNot(-7, 7, 0);
  const x = a + d;
  const c = a + 2 * d;
  return mc({
    title: 'Trzy kolejne wyrazy ciągu arytmetycznego',
    q: T`Trzywyrazowy ciąg $(${a}, x, ${c})$ jest arytmetyczny. Liczba $x$ jest równa`,
    ok: m(x),
    val: x,
    bad: [m(a + c === x ? x + 1 : a + c), m(c - a === x ? x + 2 : c - a), m(x + 1), m(x - 1), m(d === x ? x + 3 : d)],
    steps: [T`Środkowy wyraz ciągu arytmetycznego jest średnią arytmetyczną sąsiednich: $x = \frac{${a} + ${par(c)}}{2}$.`, T`$x = \frac{${a + c}}{2} = ${x}$.`],
    trap: T`Średnia to suma podzielona przez $2$. Sama suma ($${a + c}$) albo różnica ($${c - a}$) to częste błędne odpowiedzi.`,
    tip: 'Karta wzorów, str. 9: w ciągu arytmetycznym $a_n = \\frac{a_{n-1} + a_{n+1}}{2}$.'
  });
};
const threeGeometric = (r) => {
  const a = r.pick([1, 2, 3, 4, 5]);
  const q = r.pick([2, 3, 4, 5]);
  const x = a * q;
  const c = a * q * q;
  return mc({
    title: 'Trzy kolejne wyrazy ciągu geometrycznego',
    q: T`Trzywyrazowy ciąg $(${a}, x, ${c})$ o wyrazach dodatnich jest geometryczny. Liczba $x$ jest równa`,
    ok: m(x),
    val: x,
    bad: [m((a + c) / 2 === x ? x + 1 : fr(a + c, 2)), m(a * c), m(c - a), m(x + a), m(q === x ? x + 2 : q)],
    steps: [T`Kwadrat środkowego wyrazu ciągu geometrycznego jest iloczynem sąsiednich: $x^2 = ${a} \cdot ${c} = ${a * c}$.`, T`$x > 0$, więc $x = \sqrt{${a * c}} = ${x}$.`],
    trap: T`W ciągu geometrycznym nie liczymy średniej arytmetycznej – tu działa iloczyn: $x^2 = ${a} \cdot ${c}$.`,
    tip: 'Karta wzorów, str. 9: w ciągu geometrycznym $a_n^2 = a_{n-1} \\cdot a_{n+1}$.'
  });
};
const threeParamGeo = (r) => {
  const q = r.pick([2, 3, T`\frac{1}{2}`, T`\frac{1}{3}`]);
  const qn = { 2: [2, 1], 3: [3, 1] }[q] || (q.includes('{2}') ? [1, 2] : [1, 3]);
  const a = r.pick([4, 6, 9, 12, 18, 27, 36]);
  const b = (a * qn[0]) / qn[1];
  const third = (b * qn[0]) / qn[1];
  need(Number.isInteger(b) && Number.isInteger(third));
  const k = r.pick([2, 3]);
  const c = r.intNot(-5, 5, 0);
  need((third - c) % k === 0);
  // k m + c = third
  return mc({
    title: 'Parametr w ciągu geometrycznym',
    q: T`Trzywyrazowy ciąg $(${a}, ${b}, ${lin(k, c, 'm')})$ jest geometryczny. Liczba $m$ jest równa`,
    ok: m(fr(third - c, k)),
    val: (third - c) / k,
    bad: [m(fr(third + c, k)), m(fr(2 * b - a - c, k)), m(third), m(fr(third - c, 1)), m(fr(k, third - c || 1))],
    steps: [T`Iloraz: $q = \frac{${b}}{${a}} = ${fr(b, a)}$.`, T`Trzeci wyraz: $${b} \cdot ${fr(b, a)} = ${third}$.`, T`$${lin(k, c, 'm')} = ${third}$, więc $${k}m = ${third - c}$ i $m = ${fr(third - c, k)}$.`],
    trap: T`To ciąg geometryczny, więc kolejne wyrazy powstają przez mnożenie, a nie dodawanie. Trzeci wyraz to $${third}$, a nie $${2 * b - a}$.`,
    tip: 'W ciągu geometrycznym iloraz dowolnych dwóch sąsiednich wyrazów jest taki sam.'
  });
};
const threeParamAr = (r) => {
  const b = r.int(-6, 12);
  const d = r.intNot(-6, 6, 0);
  const first = b - d;
  const third = b + d;
  const k = r.pick([2, 3, 4]);
  const c = r.intNot(-7, 7, 0);
  need((first - c) % k === 0);
  return mc({
    title: 'Parametr w ciągu arytmetycznym',
    q: T`Trzywyrazowy ciąg $(${lin(k, c, 'm')}, ${b}, ${third})$ jest arytmetyczny. Liczba $m$ jest równa`,
    ok: m(fr(first - c, k)),
    val: (first - c) / k,
    bad: [m(fr(first + c, k)), m(fr(third - c, k)), m(first), m(fr(first - c, 1)), m(fr(b - c, k))],
    steps: [T`Różnica: $r = ${third} - ${par(b)} = ${d}$.`, T`Pierwszy wyraz: $${b} - ${par(d)} = ${first}$.`, T`$${lin(k, c, 'm')} = ${first}$, więc $${k}m = ${first - c}$ i $m = ${fr(first - c, k)}$.`],
    trap: T`Pierwszy wyraz otrzymujemy, odejmując różnicę od drugiego: $${b} - ${par(d)}$, a nie dodając.`,
    tip: 'W ciągu arytmetycznym różnica dowolnych dwóch sąsiednich wyrazów jest taka sama.'
  });
};
const threeBoth = (r) => {
  const a = r.pick([1, 2, 3, 4, -1, -2]);
  const q = r.pick([2, 3, -2, -3]);
  const b = a * q;
  const x = 2 * b - a;
  const y = b * q;
  const kind = r.int(0, 1);
  const v = kind === 0 ? x + y : y - x;
  return mc({
    title: 'Ciąg arytmetyczny i geometryczny jednocześnie',
    q: T`Trzywyrazowy ciąg $(${a}, ${b}, x)$ jest arytmetyczny, a trzywyrazowy ciąg $(${a}, ${b}, y)$ jest geometryczny. Wartość wyrażenia $${kind === 0 ? 'x + y' : 'y - x'}$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(kind === 0 ? y - x : x + y), m(2 * x), m(2 * y), m(v + 1), m(-v === v ? 2 : -v)],
    steps: [T`Ciąg arytmetyczny: $r = ${b} - ${par(a)} = ${b - a}$, więc $x = ${b} + ${par(b - a)} = ${x}$.`, T`Ciąg geometryczny: $q = \frac{${b}}{${a}} = ${q}$, więc $y = ${b} \cdot ${par(q)} = ${y}$.`, T`$${kind === 0 ? `x + y = ${x} + ${par(y)}` : `y - x = ${y} - ${par(x)}`} = ${v}$.`],
    trap: T`Te same dwa pierwsze wyrazy dają różne trzecie: w arytmetycznym dodajesz różnicę, w geometrycznym mnożysz przez iloraz.`,
    tip: 'Arytmetyczny: stała różnica. Geometryczny: stały iloraz.'
  });
};

export default {
  numericId: 7,
  title: 'Ciągi liczbowe',
  short_title: 'Ciągi',
  description: 'Wzór ogólny i rekurencyjny, monotoniczność, ciąg arytmetyczny i geometryczny oraz ich sumy.',
  icon: 'ListOrdered',
  color: '#22D3EE',
  matura_points_range: '4–7 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 9–10',
  lessons: [
    {
      title: 'Ciąg liczbowy: wzór ogólny, rekurencja i monotoniczność',
      short_title: 'Wzór ogólny i rekurencja',
      pill: pill({
        essence: T`Ciąg to funkcja, której argumentami są kolejne liczby naturalne $1, 2, 3, \ldots$ Wzór ogólny (np. $a_n = n^2 - 3n$) pozwala obliczyć dowolny wyraz od razu – wstawiasz jego numer za $n$. Wzór rekurencyjny (np. $a_{n+1} = 2a_n + 1$) mówi, jak z poprzedniego wyrazu zrobić następny, więc liczysz po kolei od $a_1$. Ciąg jest rosnący, gdy każdy następny wyraz jest większy od poprzedniego, czyli $a_{n+1} - a_n > 0$.`,
        context: 'Zadanie 15–17 w arkuszu • 1 pkt, często w formie prawda/fałsz.',
        pl: T`Wzór ogólny to winda: wciskasz numer piętra i jesteś na miejscu. Wzór rekurencyjny to schody: żeby wejść na czwarte piętro, musisz minąć drugie i trzecie.`,
        steps: [
          ['Wzór ogólny – podstaw numer', T`$a_n = n^2 - 3n$: $a_5 = 25 - 15 = 10$.`, T`Za każde $n$ wstaw ten sam numer.`],
          ['Rekurencja – licz po kolei', T`$a_1 = 2$, $a_{n+1} = 2a_n + 1$: $a_2 = 5$, $a_3 = 11$, $a_4 = 23$.`, 'Nie da się pominąć kroku.'],
          ['Monotoniczność – zbadaj różnicę', T`$a_n = 3n - 1$: $a_{n+1} - a_n = 3 > 0$, ciąg rosnący.`, 'Różnica dodatnia – rosnący, ujemna – malejący.']
        ],
        formulas: [
          ['Wyraz ciągu', T`a_k: \ \text{podstaw } n = k \text{ do wzoru ogólnego}`],
          ['Ciąg rosnący', T`a_{n+1} - a_n > 0 \ \text{dla każdego } n`],
          ['Ciąg malejący', T`a_{n+1} - a_n < 0 \ \text{dla każdego } n`]
        ],
        examples: [
          ['Znak i parzystość', '1 pkt', T`Ciąg jest określony wzorem $a_n = (-1)^n \cdot \frac{n + 1}{2}$. Oblicz $a_3$ i $a_4$.`, T`1. $a_3 = (-1)^3 \cdot \frac{4}{2} = -2$.` + '\n' + T`2. $a_4 = (-1)^4 \cdot \frac{5}{2} = \frac{5}{2}$.`, 'Wyrazy o numerach nieparzystych są tu ujemne.'],
          ['Ile wyrazów ujemnych', '1 pkt', T`Ile wyrazów ciągu $a_n = 2n - 9$ jest ujemnych?`, T`1. $2n - 9 < 0$, czyli $n < 4{,}5$.` + '\n' + T`2. $n \in \{1, 2, 3, 4\}$ – cztery wyrazy.`, 'Liczymy naturalne n spełniające nierówność.']
        ],
        trap: T`Numer wyrazu $n$ jest liczbą naturalną $1, 2, 3, \ldots$ Nie istnieje wyraz $a_{2{,}5}$ ani $a_0$ (gdy ciąg jest określony dla $n \ge 1$).`,
        fail: T`„$2n - 9 = 0$ dla $n = 4{,}5$, więc zerem jest wyraz $a_{4{,}5}$.”`,
        win: T`$4{,}5$ nie jest liczbą naturalną, więc żaden wyraz tego ciągu nie jest równy $0$.`,
        why: 'Ciąg ma tylko wyrazy o numerach naturalnych – między a₄ i a₅ nie ma nic.',
        ckeTip: 'W zadaniach prawda/fałsz o ciągach policz po prostu 3–4 pierwsze wyrazy – większość stwierdzeń da się wtedy rozstrzygnąć.',
        points: [T`Wzór ogólny: podstaw numer wyrazu.`, T`Wzór rekurencyjny: licz od $a_1$ krok po kroku.`, T`Monotoniczność: znak różnicy $a_{n+1} - a_n$.`]
      }),
      gens: [seqTerm, seqRecursive, seqMonotonic, seqCountPositive, seqWhichTerm]
    },
    {
      title: 'Ciąg arytmetyczny: różnica i wzór na n-ty wyraz',
      short_title: 'Ciąg arytmetyczny',
      pill: pill({
        essence: T`W ciągu arytmetycznym każdy następny wyraz powstaje przez dodanie tej samej liczby $r$, zwanej różnicą: $a_{n+1} = a_n + r$. Stąd wzór na dowolny wyraz: $a_n = a_1 + (n - 1)r$. Jeśli znasz dwa wyrazy, różnicę wyznaczysz, dzieląc różnicę ich wartości przez różnicę ich numerów. Dla $r > 0$ ciąg rośnie, dla $r < 0$ maleje.`,
        context: 'Zadania 15–18 w arkuszu • 1–2 pkt. Ciąg arytmetyczny jest w każdym arkuszu.',
        pl: T`Ciąg arytmetyczny to schody o równych stopniach. $a_1$ to wysokość pierwszego stopnia, $r$ to wysokość jednego kroku. Żeby stanąć na dziesiątym stopniu, robisz dziewięć kroków – stąd $(n - 1)$ we wzorze.`,
        steps: [
          ['Ustal a₁ i r', T`Ciąg $5, 8, 11, \ldots$: $a_1 = 5$, $r = 8 - 5 = 3$.`, 'Różnica to wyraz następny minus poprzedni.'],
          ['Zastosuj wzór', T`$a_{20} = 5 + 19 \cdot 3 = 62$.`, T`Mnożysz przez $n - 1$.`],
          ['Dwa wyrazy → różnica', T`$a_3 = 7$, $a_8 = 22$: $5r = 15$, $r = 3$.`, 'Różnica numerów: 8 − 3 = 5 kroków.']
        ],
        formulas: [
          ['Wzór na n-ty wyraz', T`a_n = a_1 + (n - 1)r`, 9],
          ['Różnica z dwóch wyrazów', T`r = \frac{a_m - a_k}{m - k}`],
          ['Definicja', T`a_{n+1} - a_n = r`]
        ],
        examples: [
          ['Wzór ogólny', '1 pkt', T`W ciągu arytmetycznym $a_1 = 7$, $a_2 = 13$. Wyznacz wzór ogólny.`, T`1. $r = 13 - 7 = 6$.` + '\n' + T`2. $a_n = 7 + (n - 1) \cdot 6 = 6n + 1$.`, 'Kontrola: dla n = 1 wychodzi 7.'],
          ['Dwa odległe wyrazy', '2 pkt', T`W ciągu arytmetycznym $a_4 = 10$, $a_9 = 30$. Oblicz $a_1$.`, T`1. $a_9 - a_4 = 5r$, więc $5r = 20$, $r = 4$.` + '\n' + T`2. $a_1 = a_4 - 3r = 10 - 12 = -2$.`, 'Cofasz się o 3 kroki.']
        ],
        trap: T`We wzorze jest $(n - 1)r$, a NIE $n \cdot r$. $a_{10} = a_1 + 9r$.`,
        fail: T`$a_1 = 5$, $r = 3$: $a_{10} = 5 + 10 \cdot 3 = 35$.`,
        win: T`$a_{10} = 5 + 9 \cdot 3 = 32$.`,
        why: 'Pierwszy wyraz już „masz” – do dziesiątego brakuje dziewięciu kroków, nie dziesięciu.',
        ckeTip: 'Wzory na ciąg arytmetyczny są w karcie wzorów na str. 9. Po obliczeniu wzoru ogólnego sprawdź go dla n = 1.',
        points: [T`$r = a_{n+1} - a_n$ – zawsze następny minus poprzedni.`, T`$a_n = a_1 + (n - 1)r$.`, T`$a_m - a_k = (m - k)r$.`]
      }),
      gens: [arNth, arDiffFromTwo, arGeneralFormula, arDiffFromFormula, arWordProblem]
    },
    {
      title: 'Suma początkowych wyrazów ciągu arytmetycznego',
      short_title: 'Suma ciągu arytmetycznego',
      pill: pill({
        essence: T`Sumę $n$ początkowych wyrazów ciągu arytmetycznego liczysz wzorem $S_n = \frac{a_1 + a_n}{2} \cdot n$ – to średnia pierwszego i ostatniego wyrazu pomnożona przez liczbę wyrazów. Jeśli nie znasz $a_n$, użyj wersji $S_n = \frac{2a_1 + (n - 1)r}{2} \cdot n$. W zadaniach praktycznych (raty, rzędy krzeseł, sumy liczb podzielnych przez daną liczbę) najważniejsze jest poprawne ustalenie liczby wyrazów $n$.`,
        context: 'Zadanie zamknięte za 1 pkt lub otwarte za 2 pkt, często w kontekście praktycznym (raty, oszczędzanie).',
        pl: T`Gauss jako dzieciak dodał liczby od 1 do 100, łącząc je w pary: $1 + 100$, $2 + 99$, $3 + 98$… Każda para daje $101$, a par jest $50$. Wzór na sumę robi dokładnie to samo: (pierwszy + ostatni) razy połowa liczby wyrazów.`,
        steps: [
          ['Ustal a₁, aₙ oraz n', T`Liczby parzyste od $2$ do $40$: $a_1 = 2$, $a_n = 40$, $n = 20$.`, 'Liczba wyrazów to najczęstsze źródło błędów.'],
          ['Podstaw do wzoru', T`$S_{20} = \frac{2 + 40}{2} \cdot 20$.`, 'Średnia skrajnych razy liczba wyrazów.'],
          ['Oblicz', T`$S_{20} = 21 \cdot 20 = 420$.`, 'Sprawdź, czy wynik ma sens (około 20 liczb po około 20).']
        ],
        formulas: [
          ['Suma – wersja z aₙ', T`S_n = \frac{a_1 + a_n}{2} \cdot n`, 9],
          ['Suma – wersja z r', T`S_n = \frac{2a_1 + (n - 1)r}{2} \cdot n`, 9],
          ['Liczba wyrazów', T`n = \frac{a_n - a_1}{r} + 1`]
        ],
        examples: [
          ['Raty', '2 pkt', T`Pożyczkę spłacono w $18$ ratach. Pierwsza rata to $750$ zł, każda następna jest o $30$ zł mniejsza. Ile spłacono łącznie?`, T`1. $a_{18} = 750 - 17 \cdot 30 = 240$.` + '\n' + T`2. $S_{18} = \frac{750 + 240}{2} \cdot 18 = 495 \cdot 18 = 8910$ zł.`, 'Raty malejące – różnica ujemna.'],
          ['Liczby podzielne przez 3', '2 pkt', T`Oblicz sumę liczb dwucyfrowych podzielnych przez $3$.`, T`1. Pierwsza: $12$, ostatnia: $99$, $r = 3$.` + '\n' + T`2. $n = \frac{99 - 12}{3} + 1 = 30$.` + '\n' + T`3. $S = \frac{12 + 99}{2} \cdot 30 = 1665$.`, 'Pamiętaj o „+1” przy liczeniu wyrazów.']
        ],
        trap: T`Licząc wyrazy od $12$ do $99$ co $3$, nie zapomnij o „$+1$”: $\frac{99 - 12}{3} + 1 = 30$, a nie $29$.`,
        fail: T`$n = \frac{99 - 12}{3} = 29$.`,
        win: T`$n = \frac{99 - 12}{3} + 1 = 30$.`,
        why: 'Dzielenie liczy odstępy między wyrazami, a wyrazów jest zawsze o jeden więcej niż odstępów.',
        ckeTip: 'W zadaniu otwartym zapisz osobno a₁, r i n – za poprawne zidentyfikowanie ciągu jest pierwszy punkt.',
        points: [T`$S_n$ to średnia skrajnych wyrazów razy $n$.`, T`Liczba wyrazów: $\frac{a_n - a_1}{r} + 1$.`, T`Raty malejące: $r < 0$.`]
      }),
      gens: [arSumFirstLast, arSumFromR, arSumNaturals, arInstallments]
    },
    {
      title: 'Ciąg geometryczny: iloraz, n-ty wyraz i suma',
      short_title: 'Ciąg geometryczny',
      time: '~6 min',
      pill: pill({
        essence: T`W ciągu geometrycznym każdy następny wyraz powstaje przez pomnożenie poprzedniego przez tę samą liczbę $q$, zwaną ilorazem: $a_{n+1} = a_n \cdot q$. Wzór na dowolny wyraz to $a_n = a_1 \cdot q^{n-1}$, a suma $n$ początkowych wyrazów (dla $q \neq 1$) to $S_n = a_1 \cdot \frac{1 - q^n}{1 - q}$. Iloraz wyznaczasz, dzieląc wyraz przez wyraz bezpośrednio go poprzedzający.`,
        context: 'Zadania 16–18 w arkuszu • 1–2 pkt. Często razem z ciągiem arytmetycznym w jednym zadaniu.',
        pl: T`Arytmetyczny dodaje, geometryczny mnoży. $2, 6, 18, 54$ – za każdym razem razy $3$. Żeby dojść do czwartego wyrazu, mnożysz trzy razy, stąd $q^{n-1}$. Jeśli iloraz jest ułamkiem, wyrazy maleją: $48, 24, 12, 6$.`,
        steps: [
          ['Wyznacz iloraz', T`Ciąg $3, 6, 12, \ldots$: $q = \frac{6}{3} = 2$.`, 'Następny podzielony przez poprzedni.'],
          ['Wzór na n-ty wyraz', T`$a_6 = 3 \cdot 2^5 = 96$.`, T`Wykładnik to $n - 1$.`],
          ['Suma', T`$S_5 = 3 \cdot \frac{1 - 2^5}{1 - 2} = 3 \cdot 31 = 93$.`, 'Dla małego n można po prostu dodać wyrazy.']
        ],
        formulas: [
          ['Wzór na n-ty wyraz', T`a_n = a_1 \cdot q^{n-1}`, 9],
          ['Suma n wyrazów', T`S_n = a_1 \cdot \frac{1 - q^n}{1 - q} \quad (q \neq 1)`, 9],
          ['Iloraz', T`q = \frac{a_{n+1}}{a_n}`]
        ],
        examples: [
          ['Iloraz z dwóch wyrazów', '1 pkt', T`W ciągu geometrycznym o wyrazach dodatnich $a_2 = 12$, $a_4 = 108$. Oblicz $q$.`, T`1. $a_4 = a_2 \cdot q^2$.` + '\n' + T`2. $q^2 = \frac{108}{12} = 9$.` + '\n' + T`3. Wyrazy dodatnie, więc $q = 3$.`, 'Dwa kroki to q², nie q.'],
          ['Suma', '1 pkt', T`Oblicz sumę czterech początkowych wyrazów ciągu geometrycznego, w którym $a_1 = 5$, $q = 2$.`, T`1. Wyrazy: $5, 10, 20, 40$.` + '\n' + T`2. Suma: $75$.` + '\n' + T`3. Wzorem: $5 \cdot \frac{1 - 16}{1 - 2} = 5 \cdot 15 = 75$.`, 'Przy czterech wyrazach wypisanie jest najszybsze.']
        ],
        trap: T`W ciągu geometrycznym iloraz to DZIELENIE sąsiednich wyrazów, nie odejmowanie. Dla $2, 6, 18$ iloraz to $3$, a nie $4$.`,
        fail: T`„$a_2 = 6$, $a_3 = 18$, więc $q = 18 - 6 = 12$.”`,
        win: T`$q = \frac{18}{6} = 3$.`,
        why: 'Odejmowanie daje różnicę – cechę ciągu arytmetycznego. Ciąg geometryczny ma stały stosunek wyrazów.',
        ckeTip: 'Wzory na ciąg geometryczny są w karcie wzorów na str. 9 – łącznie ze wzorem na sumę.',
        points: [T`$q = \frac{a_{n+1}}{a_n}$.`, T`$a_n = a_1 \cdot q^{n-1}$.`, T`$\frac{a_m}{a_k} = q^{m-k}$.`]
      }),
      gens: [geoNth, geoRatio, geoSum, geoFirstTerm, geoFromFormula]
    },
    {
      title: 'Trzy kolejne wyrazy i zadania mieszane',
      short_title: 'Trzy kolejne wyrazy',
      pill: pill({
        essence: T`Trzy liczby $(a, b, c)$ tworzą ciąg arytmetyczny, gdy środkowa jest średnią arytmetyczną skrajnych: $b = \frac{a + c}{2}$. Tworzą ciąg geometryczny, gdy kwadrat środkowej jest iloczynem skrajnych: $b^2 = a \cdot c$. Te dwa warunki zamieniają zadanie o ciągu na zwykłe równanie z jedną niewiadomą – także wtedy, gdy wyrazy zawierają parametr, np. $2m - 1$.`,
        context: 'Zadania 16–18 w arkuszu • 1–2 pkt. Typ „trzywyrazowy ciąg (…) jest geometryczny” pojawia się w prawie każdym arkuszu.',
        pl: T`W ciągu arytmetycznym środkowy wyraz stoi dokładnie w połowie drogi między sąsiadami. W geometrycznym – jest „w połowie drogi przez mnożenie”: z $2$ do $18$ dojdziesz, mnożąc dwa razy przez $3$, więc w środku stoi $6$.`,
        steps: [
          ['Rozpoznaj typ ciągu', T`„Arytmetyczny” – średnia. „Geometryczny” – iloczyn.`, 'Przeczytaj uważnie, który to ciąg.'],
          ['Zapisz warunek', T`$(12, 6, 2m - 1)$ geometryczny: $q = \frac{6}{12} = \frac{1}{2}$, trzeci wyraz to $3$.`, T`Albo: $6^2 = 12(2m - 1)$.`],
          ['Rozwiąż równanie', T`$2m - 1 = 3$, $m = 2$.`, 'Sprawdź, czy ciąg rzeczywiście „działa”.']
        ],
        formulas: [
          ['Trzy wyrazy ciągu arytmetycznego', T`b = \frac{a + c}{2}`, 9],
          ['Trzy wyrazy ciągu geometrycznego', T`b^2 = a \cdot c`, 9]
        ],
        examples: [
          ['Parametr', '1 pkt', T`Trzywyrazowy ciąg $(2m - 5, 4, 9)$ jest arytmetyczny. Oblicz $m$.`, T`1. $r = 9 - 4 = 5$.` + '\n' + T`2. Pierwszy wyraz: $4 - 5 = -1$.` + '\n' + T`3. $2m - 5 = -1$, $m = 2$.`, 'Różnicę policz z wyrazów, które znasz.'],
          ['Dwa ciągi naraz', '1 pkt', T`Ciąg $(-1, 2, x)$ jest arytmetyczny, a ciąg $(-1, 2, y)$ geometryczny. Oblicz $x$ i $y$.`, T`1. $r = 3$, więc $x = 5$.` + '\n' + T`2. $q = -2$, więc $y = -4$.`, 'Ten sam początek, zupełnie różne trzecie wyrazy.']
        ],
        trap: T`Z równania $x^2 = a \cdot c$ wynikają DWA rozwiązania ($x$ i $-x$). Wybierasz jedno tylko wtedy, gdy zadanie mówi np. o wyrazach dodatnich.`,
        fail: T`„Ciąg $(2, x, 18)$ jest geometryczny, więc $x = 6$” – bez żadnych założeń.`,
        win: T`$x^2 = 36$, więc $x = 6$ lub $x = -6$. Jeśli wyrazy mają być dodatnie, zostaje $x = 6$.`,
        why: 'Ciąg (2, −6, 18) też jest geometryczny – ma iloraz −3.',
        ckeTip: 'Zawsze podkreśl w treści słowo „arytmetyczny” lub „geometryczny” – pomylenie ich to najprostszy sposób na utratę punktu.',
        points: [T`Arytmetyczny: $2b = a + c$.`, T`Geometryczny: $b^2 = ac$.`, T`Przy parametrze najpierw policz różnicę lub iloraz ze znanych wyrazów.`]
      }),
      gens: [threeArithmetic, threeGeometric, threeParamGeo, threeParamAr, threeBoth]
    }
  ]
};
