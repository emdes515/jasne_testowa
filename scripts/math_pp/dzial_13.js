import { T, mc, num, pf, pill, fr, m, need, gcd, dec } from './lib.js';

const TIP_P = 'Karta wzorów, str. 27: prawdopodobieństwo klasyczne $P(A) = \\frac{|A|}{|\\Omega|}$ – liczba wyników sprzyjających przez liczbę wszystkich wyników.';
const TIP_OPP = 'Karta wzorów, str. 27: $P(A\') = 1 - P(A)$, gdzie $A\'$ to zdarzenie przeciwne do $A$.';
/** Opcje-ułamki: poprawna + błędne (bez duplikatów wartości, tylko z przedziału (0, 1]). */
const frOpts = (n, d, wrong) => wrong.filter(([a, b]) => b > 0 && a > 0 && a <= b && a * d !== b * n).map(([a, b]) => m(fr(a, b)));
const isPrime = (x) => x > 1 && Array.from({ length: Math.floor(Math.sqrt(x)) - 1 }, (_, i) => i + 2).every((k) => x % k !== 0);

// ---------- 13.1 Model klasyczny ----------
const clsUrn = (r) => {
  const [a, b, c] = [r.int(5, 12), r.int(5, 12), r.int(5, 9)];
  const tot = a + b + c;
  const kind = r.int(0, 2);
  const [cnt, what] = [[a, 'białych'], [a + b, 'białych lub czarnych'], [b + c, 'innych niż białe']][kind];
  return mc({
    title: 'Losowanie kuli z urny',
    q: T`W urnie jest $${a}$ kul białych, $${b}$ kul czarnych i $${c}$ kul zielonych. Losujemy jedną kulę. Prawdopodobieństwo wylosowania kuli ${kind === 0 ? 'białej' : kind === 1 ? 'białej lub czarnej' : 'innej niż biała'} jest równe`,
    ok: m(fr(cnt, tot)),
    val: cnt / tot,
    bad: frOpts(cnt, tot, [[tot - cnt, tot], [cnt, tot - cnt], [a, b + c], [1, 3], [cnt, tot + 1], [1, tot], [b, tot], [c, tot]]),
    steps: [T`Wszystkich kul jest $${a} + ${b} + ${c} = ${tot}$, więc $|\Omega| = ${tot}$.`, T`Kul sprzyjających (${what}) jest $${cnt}$.`, T`$P(A) = \frac{${cnt}}{${tot}}${gcd(cnt, tot) > 1 ? ` = ${fr(cnt, tot)}` : ''}$.`],
    trap: T`W mianowniku stoi liczba WSZYSTKICH kul ($${tot}$), a nie liczba kul pozostałych kolorów.`,
    tip: TIP_P
  });
};
const clsNumberSet = (r) => {
  const n = r.pick([10, 12, 15, 20, 24, 25, 30, 40, 50]);
  const props = [
    [(x) => x % 3 === 0, 'podzielnej przez $3$'], [(x) => x % 4 === 0, 'podzielnej przez $4$'], [(x) => x % 5 === 0, 'podzielnej przez $5$'], [(x) => x % 6 === 0, 'podzielnej przez $6$'],
    [isPrime, 'pierwszej'], [(x) => Number.isInteger(Math.sqrt(x)), 'będącej kwadratem liczby naturalnej'], [(x) => x % 2 === 0 && x % 3 === 0, 'parzystej i jednocześnie podzielnej przez $3$'], [(x) => x > n / 2 && x % 2 === 1, `nieparzystej i większej od $${n / 2}$`]
  ];
  const [fn, desc] = r.pick(props);
  need(!desc.includes('.'));
  const good = Array.from({ length: n }, (_, i) => i + 1).filter(fn);
  need(good.length > 0 && good.length < n);
  return mc({
    title: 'Losowanie liczby ze zbioru',
    q: T`Ze zbioru $\{1, 2, 3, \ldots, ${n}\}$ losujemy jedną liczbę. Prawdopodobieństwo wylosowania liczby ${desc} jest równe`,
    ok: m(fr(good.length, n)),
    val: good.length / n,
    bad: frOpts(good.length, n, [[good.length + 1, n], [good.length - 1, n], [n - good.length, n], [good.length, n + 1], [1, good.length], [good.length, n - 1], [1, 2], [1, 3]]),
    steps: [T`Wszystkich liczb jest $${n}$, więc $|\Omega| = ${n}$.`, T`Liczby sprzyjające: $${good.length <= 10 ? good.join(', ') : good.slice(0, 4).join(', ') + ', \\ldots, ' + good[good.length - 1]}$ – jest ich $${good.length}$.`, T`$P(A) = \frac{${good.length}}{${n}}${gcd(good.length, n) > 1 ? ` = ${fr(good.length, n)}` : ''}$.`],
    trap: T`Wypisz liczby sprzyjające, zamiast szacować „na oko”. Liczba $1$ nie jest liczbą pierwszą, a $1$ jest kwadratem liczby naturalnej.`,
    tip: TIP_P
  });
};
const clsDie = (r) => {
  const props = [
    [[5, 6], 'większej niż $4$'], [[1, 2], 'mniejszej niż $3$'], [[2, 3, 5], 'pierwszej'], [[3, 6], 'podzielnej przez $3$'], [[2, 4, 6], 'parzystej'], [[4, 5, 6], 'co najmniej równej $4$'],
    [[1, 2, 3, 4], 'co najwyżej równej $4$'], [[1, 4], 'będącej kwadratem liczby naturalnej'], [[1, 2, 3, 6], 'będącej dzielnikiem liczby $6$'], [[6], 'równej $6$'], [[1, 3, 5], 'nieparzystej'], [[2, 3, 4, 5, 6], 'większej niż $1$'],
    [[1, 2, 4], 'będącej dzielnikiem liczby $4$'], [[3, 4, 5, 6], 'większej niż $2$'], [[1, 5], 'dającej resztę $1$ przy dzieleniu przez $4$'], [[2, 4], 'parzystej i mniejszej niż $6$'], [[3, 5], 'nieparzystej i większej niż $1$'], [[1, 2, 3, 4, 5], 'mniejszej niż $6$'], [[4, 6], 'złożonej'], [[1, 6], 'skrajnej (najmniejszej lub największej z możliwych)']
  ];
  const [good, desc] = r.pick(props);
  return mc({
    title: 'Rzut jedną kostką',
    q: T`Rzucamy jeden raz symetryczną sześcienną kostką do gry. Prawdopodobieństwo wyrzucenia liczby oczek ${desc} jest równe`,
    ok: m(fr(good.length, 6)),
    val: good.length / 6,
    bad: frOpts(good.length, 6, [[1, 6], [1, 3], [1, 2], [2, 3], [5, 6], [1, 4], [1, 1]]),
    steps: [T`$|\Omega| = 6$ (wyniki od $1$ do $6$).`, T`Wyniki sprzyjające: $${good.join(', ')}$ – jest ich $${good.length}$.`, T`$P(A) = \frac{${good.length}}{6}${gcd(good.length, 6) > 1 ? ` = ${fr(good.length, 6)}` : ''}$.`],
    trap: T`„Większej niż” nie obejmuje liczby granicznej, „co najmniej” – obejmuje. Liczba $1$ nie jest ani pierwsza, ani złożona.`,
    tip: TIP_P
  });
};
const clsClass = (r) => {
  const g = r.int(8, 18);
  const b = r.int(6, 16);
  const gl = r.int(2, g - 2);
  const bl = r.int(2, b - 2);
  const kind = r.int(0, 2);
  const tot = g + b;
  const cnt = [g, gl + bl, g - gl][kind];
  const desc = ['dziewczynę', 'osobę uczącą się języka hiszpańskiego', 'dziewczynę, która nie uczy się języka hiszpańskiego'][kind];
  return mc({
    title: 'Losowanie osoby z grupy',
    q: T`W klasie jest $${g}$ dziewcząt i $${b}$ chłopców. Języka hiszpańskiego uczy się $${gl}$ dziewcząt i $${bl}$ chłopców. Losujemy jedną osobę z tej klasy. Prawdopodobieństwo, że wylosujemy ${desc}, jest równe`,
    ok: m(fr(cnt, tot)),
    val: cnt / tot,
    bad: frOpts(cnt, tot, [[cnt, g], [cnt, b], [tot - cnt, tot], [gl, g], [g, tot], [gl + bl, tot], [gl, tot], [1, 2]]),
    steps: [T`Liczba osób w klasie: $${g} + ${b} = ${tot}$, więc $|\Omega| = ${tot}$.`, T`Osób spełniających warunek jest $${cnt}$.`, T`$P(A) = \frac{${cnt}}{${tot}}${gcd(cnt, tot) > 1 ? ` = ${fr(cnt, tot)}` : ''}$.`],
    trap: T`Losujemy spośród całej klasy, więc w mianowniku jest $${tot}$, a nie liczba samych dziewcząt czy samych chłopców.`,
    tip: TIP_P
  });
};
const clsFindCount = (r) => {
  const w = r.int(2, 9);
  const k = r.pick([2, 3, 4, 5]);
  const tot = w * k;
  const b = tot - w;
  return num({
    title: 'Liczba kul z prawdopodobieństwa',
    q: T`W pudełku są tylko kule białe i czarne. Kul białych jest $${w}$. Prawdopodobieństwo wylosowania kuli białej jest równe $\frac{1}{${k}}$. Ile kul czarnych jest w pudełku? Wpisz liczbę.`,
    ans: b,
    steps: [T`Niech $n$ oznacza liczbę wszystkich kul. Wtedy $\frac{${w}}{n} = \frac{1}{${k}}$.`, T`$n = ${w} \cdot ${k} = ${tot}$.`, T`Kul czarnych jest $${tot} - ${w} = ${b}$.`],
    trap: T`$${tot}$ to liczba WSZYSTKICH kul. Pytanie dotyczy kul czarnych, więc trzeba jeszcze odjąć białe.`,
    tip: TIP_P
  });
};

// ---------- 13.2 Dwukrotny rzut kostką ----------
const PAIRS = [];
for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) PAIRS.push([a, b]);
const twoDice = (r) => {
  const s = r.int(3, 11);
  const p = r.pick([4, 6, 8, 12, 5, 10, 15, 20, 9, 18, 24, 36, 2, 3]);
  const evs = [
    [(a, b) => a + b === s, `suma liczb wyrzuconych oczek jest równa $${s}$`],
    [(a, b) => a + b >= s && s >= 8, `suma liczb wyrzuconych oczek jest nie mniejsza niż $${s}$`],
    [(a, b) => a + b < s && s <= 7, `suma liczb wyrzuconych oczek jest mniejsza niż $${s}$`],
    [(a, b) => a * b === p, `iloczyn liczb wyrzuconych oczek jest równy $${p}$`],
    [(a, b) => (a * b) % 2 === 1, 'iloczyn liczb wyrzuconych oczek jest nieparzysty'],
    [(a, b) => (a * b) % 2 === 0, 'iloczyn liczb wyrzuconych oczek jest parzysty'],
    [(a, b) => a === b, 'w obu rzutach wypadła ta sama liczba oczek'],
    [(a, b) => a > b, 'w pierwszym rzucie wypadło więcej oczek niż w drugim'],
    [(a, b) => a === 6 || b === 6, 'co najmniej raz wypadło sześć oczek'],
    [(a, b) => Math.abs(a - b) === 1, 'liczby wyrzuconych oczek różnią się o $1$'],
    [(a, b) => (a + b) % 3 === 0, 'suma liczb wyrzuconych oczek jest podzielna przez $3$'],
    [(a, b) => a % 2 === 0 && b > 4, 'w pierwszym rzucie wypadła parzysta liczba oczek, a w drugim więcej niż cztery oczka'],
    [(a, b) => a + b === s && a !== b, `suma liczb wyrzuconych oczek jest równa $${s}$ i w obu rzutach wypadły różne liczby oczek`],
    [(a, b) => Math.max(a, b) === (s % 6) + 1, `większa z wyrzuconych liczb oczek (lub każda z nich, gdy są równe) jest równa $${(s % 6) + 1}$`]
  ];
  const [fn, desc] = r.pick(evs);
  const good = PAIRS.filter(([a, b]) => fn(a, b));
  need(good.length > 0 && good.length < 36);
  const cnt = good.length;
  return mc({
    title: 'Dwukrotny rzut kostką',
    q: T`Rzucamy dwa razy symetryczną sześcienną kostką do gry. Prawdopodobieństwo zdarzenia polegającego na tym, że ${desc}, jest równe`,
    ok: m(fr(cnt, 36)),
    val: cnt / 36,
    bad: frOpts(cnt, 36, [[cnt, 12], [cnt + 1, 36], [cnt - 1, 36], [cnt, 6], [36 - cnt, 36], [1, 6], [1, 12], [cnt, 18], [1, 36], [cnt + 2, 36]]),
    steps: [T`Wszystkich wyników jest $6 \cdot 6 = 36$ (uporządkowane pary liczb).`, T`Wyniki sprzyjające: ${cnt <= 8 ? `$${good.map(([a, b]) => `(${a}, ${b})`).join(', ')}$` : `np. $${good.slice(0, 4).map(([a, b]) => `(${a}, ${b})`).join(', ')}, \\ldots$`} – jest ich $${cnt}$.`, T`$P(A) = \frac{${cnt}}{36}${gcd(cnt, 36) > 1 ? ` = ${fr(cnt, 36)}` : ''}$.`],
    trap: T`Wyniki $(2, 5)$ i $(5, 2)$ to dwa RÓŻNE wyniki. Wszystkich wyników jest $36$, a nie $12$ ani $11$.`,
    tip: 'Dwukrotny rzut kostką: $|\\Omega| = 36$. Narysuj tabelę $6 \\times 6$ i zaznacz wyniki sprzyjające.'
  });
};
const twoDiceStatements = (r) => {
  const s1 = r.int(2, 12);
  const s2 = r.intNot(2, 12, s1);
  const c = (s) => PAIRS.filter(([a, b]) => a + b === s).length;
  const claim = r.bool() ? c(s1) : c(s1) + 1;
  const A = [T`Prawdopodobieństwo otrzymania sumy oczek równej $${s1}$ jest równe $${fr(claim, 36)}$.`, claim === c(s1), T`sumę $${s1}$ ${c(s1) === 1 ? 'daje $1$ wynik' : `dają wyniki w liczbie $${c(s1)}$`}, więc prawdopodobieństwo to $${fr(c(s1), 36)}$.`];
  const more = r.bool();
  const B = [T`Suma oczek równa $${s1}$ jest ${more ? 'bardziej' : 'mniej'} prawdopodobna niż suma oczek równa $${s2}$.`, more ? c(s1) > c(s2) : c(s1) < c(s2), T`liczba wyników sprzyjających to odpowiednio $${c(s1)}$ i $${c(s2)}$.`];
  return pf({
    title: 'Prawda czy fałsz: sumy oczek',
    q: 'Rzucamy dwa razy symetryczną sześcienną kostką do gry.',
    s1: [A[0], A[1], `${A[2]} Zdanie jest ${A[1] ? 'prawdziwe' : 'fałszywe'}.`],
    s2: [B[0], B[1], `${B[2]} Zdanie jest ${B[1] ? 'prawdziwe' : 'fałszywe'}.`],
    trap: 'Sumy oczek nie są jednakowo prawdopodobne: najczęściej wypada 7 (sześć wyników), a najrzadziej 2 i 12 (po jednym wyniku).',
    tip: 'Dwukrotny rzut kostką: $|\\Omega| = 36$. Narysuj tabelę $6 \\times 6$ i zaznacz wyniki sprzyjające.'
  });
};

// ---------- 13.3 Losowanie liczb ----------
const numTwoDigit = (r) => {
  const k = r.pick([3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 20, 25]);
  const cnt = Math.floor(99 / k) - Math.floor(9 / k);
  const first = Math.ceil(10 / k) * k;
  const last = Math.floor(99 / k) * k;
  return mc({
    title: 'Losowanie liczby dwucyfrowej',
    q: T`Ze zbioru wszystkich liczb naturalnych dwucyfrowych losujemy jedną liczbę. Prawdopodobieństwo wylosowania liczby podzielnej przez $${k}$ jest równe`,
    ok: m(fr(cnt, 90)),
    val: cnt / 90,
    bad: frOpts(cnt, 90, [[cnt, 99], [cnt, 100], [cnt + 1, 90], [cnt - 1, 90], [1, k], [cnt, 89], [Math.floor(99 / k), 90], [cnt + 2, 90]]),
    steps: [T`Liczb dwucyfrowych jest $99 - 9 = 90$, więc $|\Omega| = 90$.`, T`Liczby podzielne przez $${k}$: od $${first}$ do $${last}$, czyli $\frac{${last} - ${first}}{${k}} + 1 = ${cnt}$.`, T`$P(A) = \frac{${cnt}}{90}${gcd(cnt, 90) > 1 ? ` = ${fr(cnt, 90)}` : ''}$.`],
    trap: T`Liczb dwucyfrowych jest $90$ (od $10$ do $99$), a nie $99$ ani $100$.`,
    tip: 'Liczb całkowitych od $a$ do $b$ jest $b - a + 1$. Liczb dwucyfrowych jest $90$, trzycyfrowych $900$.'
  });
};
const numTwoSets = (r) => {
  const A = r.pick([[1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [1, 3, 5], [2, 4, 6], [1, 2, 3, 4, 5]]);
  const B = r.pick([[1, 2], [3, 4, 5], [1, 2, 3, 4], [2, 5, 7], [4, 5, 6], [1, 2, 3, 4, 5, 6]]);
  const t = r.int(4, 9);
  const evs = [
    [(a, b) => (a + b) % 2 === 0, 'suma wylosowanych liczb jest parzysta'],
    [(a, b) => (a * b) % 2 === 1, 'iloczyn wylosowanych liczb jest nieparzysty'],
    [(a, b) => a + b === t, `suma wylosowanych liczb jest równa $${t}$`],
    [(a, b) => a < b, 'liczba wylosowana ze zbioru $A$ jest mniejsza od liczby wylosowanej ze zbioru $B$'],
    [(a, b) => a === b, 'obie wylosowane liczby są równe'],
    [(a, b) => a * b > t, `iloczyn wylosowanych liczb jest większy od $${t}$`]
  ];
  const [fn, desc] = r.pick(evs);
  const all = A.flatMap((a) => B.map((b) => [a, b]));
  const good = all.filter(([a, b]) => fn(a, b));
  need(good.length > 0 && good.length < all.length);
  const [cnt, tot] = [good.length, all.length];
  return mc({
    title: 'Losowanie po jednej liczbie z dwóch zbiorów',
    q: T`Dane są zbiory $A = \{${A.join(', ')}\}$ oraz $B = \{${B.join(', ')}\}$. Losujemy jedną liczbę ze zbioru $A$ i jedną liczbę ze zbioru $B$. Prawdopodobieństwo zdarzenia polegającego na tym, że ${desc}, jest równe`,
    ok: m(fr(cnt, tot)),
    val: cnt / tot,
    bad: frOpts(cnt, tot, [[cnt, A.length + B.length], [cnt + 1, tot], [cnt - 1, tot], [tot - cnt, tot], [1, 2], [cnt, tot + 1], [1, 3], [1, tot]]),
    steps: [T`Wszystkich par jest $${A.length} \cdot ${B.length} = ${tot}$.`, T`Pary sprzyjające: ${cnt <= 8 ? `$${good.map(([a, b]) => `(${a}, ${b})`).join(', ')}$` : `np. $${good.slice(0, 4).map(([a, b]) => `(${a}, ${b})`).join(', ')}, \\ldots$`} – jest ich $${cnt}$.`, T`$P = \frac{${cnt}}{${tot}}${gcd(cnt, tot) > 1 ? ` = ${fr(cnt, tot)}` : ''}$.`],
    trap: T`Liczbę wszystkich wyników daje reguła mnożenia ($${A.length} \cdot ${B.length}$), a nie dodawanie ($${A.length} + ${B.length}$).`,
    tip: TIP_P
  });
};
const numDigitsRandom = (r) => {
  const n = r.int(3, 6);
  const evs = [
    [(a, b) => (10 * a + b) % 2 === 0, 'parzysta'],
    [(a, b) => (10 * a + b) % 3 === 0, 'podzielna przez $3$'],
    [(a, b) => a === b, 'zapisana dwiema jednakowymi cyframi'],
    [(a, b) => a < b, 'taka, że cyfra dziesiątek jest mniejsza od cyfry jedności'],
    [(a, b) => (10 * a + b) % 5 === 0, 'podzielna przez $5$'],
    [(a, b) => 10 * a + b > 10 * Math.ceil(n / 2) + Math.ceil(n / 2), `większa od $${10 * Math.ceil(n / 2) + Math.ceil(n / 2)}$`]
  ];
  const [fn, desc] = r.pick(evs);
  const all = [];
  for (let a = 1; a <= n; a++) for (let b = 1; b <= n; b++) all.push([a, b]);
  const good = all.filter(([a, b]) => fn(a, b));
  need(good.length > 0 && good.length < all.length);
  const [cnt, tot] = [good.length, all.length];
  return mc({
    title: 'Losowa liczba dwucyfrowa z cyfr danego zbioru',
    q: T`Ze zbioru $\{${Array.from({ length: n }, (_, i) => i + 1).join(', ')}\}$ losujemy dwa razy po jednej cyfrze ze zwracaniem i zapisujemy je w kolejności losowania, tworząc liczbę dwucyfrową. Prawdopodobieństwo, że otrzymana liczba jest ${desc}, jest równe`,
    ok: m(fr(cnt, tot)),
    val: cnt / tot,
    bad: frOpts(cnt, tot, [[cnt, n * (n - 1)], [cnt + 1, tot], [cnt - 1, tot], [tot - cnt, tot], [1, n], [1, 2], [cnt, 2 * n], [cnt + 2, tot]]),
    steps: [T`Losujemy ze zwracaniem, więc wszystkich liczb jest $${n} \cdot ${n} = ${tot}$.`, T`Liczby sprzyjające: ${cnt <= 9 ? `$${good.map(([a, b]) => `${a}${b}`).join(', ')}$` : `np. $${good.slice(0, 5).map(([a, b]) => `${a}${b}`).join(', ')}, \\ldots$`} – jest ich $${cnt}$.`, T`$P = \frac{${cnt}}{${tot}}${gcd(cnt, tot) > 1 ? ` = ${fr(cnt, tot)}` : ''}$.`],
    trap: T`„Ze zwracaniem” oznacza, że cyfra może się powtórzyć – wszystkich wyników jest $${n}^2$, a nie $${n} \cdot ${n - 1}$.`,
    tip: TIP_P
  });
};

// ---------- 13.4 Losowanie dwóch elementów i drzewo ----------
const drawTwoNoReturn = (r) => {
  const a = r.int(5, 9);
  const b = r.int(5, 9);
  const tot = a + b;
  const kind = r.int(0, 2);
  const [nn, desc] = [[a * (a - 1), 'obie wylosowane kule są białe'], [a * (a - 1) + b * (b - 1), 'obie wylosowane kule są tego samego koloru'], [2 * a * b, 'wylosowane kule są różnych kolorów']][kind];
  const dd = tot * (tot - 1);
  return mc({
    title: 'Losowanie dwóch kul bez zwracania',
    q: T`W urnie jest $${a}$ kul białych i $${b}$ kul czarnych. Losujemy kolejno dwie kule bez zwracania. Prawdopodobieństwo zdarzenia polegającego na tym, że ${desc}, jest równe`,
    ok: m(fr(nn, dd)),
    val: nn / dd,
    bad: frOpts(nn, dd, [[kind === 0 ? a * a : kind === 1 ? a * a + b * b : 2 * a * b, tot * tot], [dd - nn, dd], [a, tot], [a * b, dd], [nn, tot * tot], [1, 2], [a - 1, tot - 1], [nn + 2, dd]]),
    steps: [
      T`Wszystkich wyników (par uporządkowanych): $${tot} \cdot ${tot - 1} = ${dd}$.`,
      kind === 0 ? T`Dwie białe: $${a} \cdot ${a - 1} = ${nn}$.` : kind === 1 ? T`Dwie białe: $${a} \cdot ${a - 1} = ${a * (a - 1)}$, dwie czarne: $${b} \cdot ${b - 1} = ${b * (b - 1)}$, razem $${nn}$.` : T`Biała i czarna: $${a} \cdot ${b}$, czarna i biała: $${b} \cdot ${a}$, razem $${nn}$.`,
      T`$P = \frac{${nn}}{${dd}}${gcd(nn, dd) > 1 ? ` = ${fr(nn, dd)}` : ''}$.`
    ],
    trap: T`Bez zwracania druga kula jest losowana z urny o jedną kulę mniejszej: po wylosowaniu białej liczba białych kul spada do $${a - 1}$, a liczba wszystkich kul do $${tot - 1}$.`,
    tip: 'Losowanie bez zwracania: na drzewie prawdopodobieństwa w drugim etapie zmieniają się liczniki i mianowniki.'
  });
};
const drawTwoWithReturn = (r) => {
  const a = r.int(1, 6);
  const b = r.int(1, 6);
  const tot = a + b;
  const kind = r.int(0, 2);
  const [nn, desc] = [[a * a, 'obie wylosowane kule są białe'], [a * a + b * b, 'obie wylosowane kule są tego samego koloru'], [2 * a * b, 'wylosowane kule są różnych kolorów']][kind];
  const dd = tot * tot;
  need(nn < dd);
  return mc({
    title: 'Losowanie dwóch kul ze zwracaniem',
    q: T`W urnie ${a === 1 ? 'jest $1$ kula biała' : a < 5 ? `są $${a}$ kule białe` : `jest $${a}$ kul białych`} i ${b === 1 ? '$1$ kula czarna' : b < 5 ? `$${b}$ kule czarne` : `$${b}$ kul czarnych`}. Losujemy jedną kulę, zapisujemy jej kolor, wrzucamy ją z powrotem i losujemy drugi raz. Prawdopodobieństwo zdarzenia polegającego na tym, że ${desc}, jest równe`,
    ok: m(fr(nn, dd)),
    val: nn / dd,
    bad: frOpts(nn, dd, [[kind === 0 ? a * (a - 1) : kind === 1 ? a * (a - 1) + b * (b - 1) : 2 * a * b, tot * (tot - 1)], [dd - nn, dd], [a, tot], [a * b, dd], [1, 2], [nn + 1, dd], [b * b, dd], [1, 4]]),
    steps: [
      T`Kula wraca do urny, więc oba losowania są takie same: $P(\text{biała}) = ${fr(a, tot)}$, $P(\text{czarna}) = ${fr(b, tot)}$.`,
      kind === 0 ? T`$P = ${fr(a, tot)} \cdot ${fr(a, tot)} = ${fr(nn, dd)}$.` : kind === 1 ? T`$P = ${fr(a, tot)} \cdot ${fr(a, tot)} + ${fr(b, tot)} \cdot ${fr(b, tot)} = ${fr(nn, dd)}$.` : T`$P = ${fr(a, tot)} \cdot ${fr(b, tot)} + ${fr(b, tot)} \cdot ${fr(a, tot)} = ${fr(nn, dd)}$.`
    ],
    trap: kind === 2 ? T`„Różnych kolorów” to dwa przypadki: biała–czarna oraz czarna–biała. Policzenie tylko jednego daje wynik dwa razy za mały.` : T`Ze zwracaniem skład urny się nie zmienia – w drugim losowaniu mianownik to nadal $${tot}$.`,
    tip: 'Na drzewie: wzdłuż gałęzi mnożymy prawdopodobieństwa, a wyniki z różnych gałęzi dodajemy.'
  });
};
const coins = (r) => {
  const n = r.int(2, 4);
  const k = r.int(0, n);
  const C = (nn, kk) => (kk === 0 ? 1 : (C(nn, kk - 1) * (nn - kk + 1)) / kk);
  const kind = r.int(0, 2);
  const cnt = kind === 0 ? C(n, k) : kind === 1 ? Array.from({ length: n - k + 1 }, (_, i) => C(n, k + i)).reduce((s, x) => s + x, 0) : 2 ** n - 1;
  need(cnt < 2 ** n && cnt > 0 && (kind !== 1 || (k >= 1 && k < n)) && (kind !== 0 || k >= 1));
  const word = (x) => (x === 1 ? 'jeden orzeł' : x === 2 ? 'dwa orły' : x === 3 ? 'trzy orły' : 'cztery orły');
  const desc = kind === 0 ? `wypadnie dokładnie ${word(k)}` : kind === 1 ? `wypadną co najmniej ${word(k)}`.replace('wypadną co najmniej jeden orzeł', 'wypadnie co najmniej jeden orzeł') : 'wypadnie co najmniej jedna reszka';
  return mc({
    title: 'Rzuty monetą',
    q: T`Rzucamy ${n === 2 ? 'dwa' : n === 3 ? 'trzy' : 'cztery'} razy symetryczną monetą. Prawdopodobieństwo, że ${desc}, jest równe`,
    ok: m(fr(cnt, 2 ** n)),
    val: cnt / 2 ** n,
    bad: frOpts(cnt, 2 ** n, [[k || 1, n], [cnt, 2 * n], [2 ** n - cnt, 2 ** n], [1, 2], [cnt + 1, 2 ** n], [cnt - 1, 2 ** n], [1, 2 ** n], [1, n]]),
    steps: [T`Wszystkich wyników jest $2^{${n}} = ${2 ** n}$.`, kind === 2 ? T`Zdarzenie przeciwne („same orły”) to jeden wynik, więc sprzyjających jest $${2 ** n} - 1 = ${cnt}$.` : T`Wypisujemy wyniki sprzyjające (O – orzeł, R – reszka) i zliczamy je: jest ich $${cnt}$.`, T`$P = \frac{${cnt}}{${2 ** n}}${gcd(cnt, 2 ** n) > 1 ? ` = ${fr(cnt, 2 ** n)}` : ''}$.`],
    trap: T`Wyniki ORR, ROR i RRO to trzy różne wyniki – kolejność rzutów ma znaczenie.`,
    tip: 'Przy rzutach monetą wypisz wszystkie wyniki: dla dwóch rzutów jest ich 4, dla trzech 8, dla czterech 16.'
  });
};
const drawTwoPeople = (r) => {
  const g = r.int(2, 6);
  const b = r.int(2, 6);
  const tot = g + b;
  const kind = r.int(0, 1);
  const nn = kind === 0 ? g * (g - 1) : 2 * g * b;
  const dd = tot * (tot - 1);
  return mc({
    title: 'Losowanie dwóch osób',
    q: T`W grupie ${g < 5 ? `są $${g}$ dziewczyny` : `jest $${g}$ dziewcząt`} i $${b}$ chłopców. Losujemy z tej grupy kolejno dwie różne osoby. Prawdopodobieństwo, że ${kind === 0 ? 'obie wylosowane osoby to dziewczyny' : 'wylosujemy dziewczynę i chłopca (w dowolnej kolejności)'}, jest równe`,
    ok: m(fr(nn, dd)),
    val: nn / dd,
    bad: frOpts(nn, dd, [[kind === 0 ? g * g : g * b, tot * tot], [kind === 0 ? g : g * b, kind === 0 ? tot : dd], [dd - nn, dd], [g, tot], [1, 2], [nn + 2, dd], [g - 1, tot - 1], [2 * g * b, tot * tot]]),
    steps: [T`Pierwszą osobę losujemy spośród $${tot}$, drugą spośród $${tot - 1}$ pozostałych: $|\Omega| = ${dd}$.`, kind === 0 ? T`Dwie dziewczyny: $${g} \cdot ${g - 1} = ${nn}$.` : T`Dziewczyna i chłopiec: $${g} \cdot ${b}$, chłopiec i dziewczyna: $${b} \cdot ${g}$, razem $${nn}$.`, T`$P = \frac{${nn}}{${dd}}${gcd(nn, dd) > 1 ? ` = ${fr(nn, dd)}` : ''}$.`],
    trap: kind === 0 ? T`Po wylosowaniu jednej dziewczyny zostaje ich $${g - 1}$, a wszystkich osób $${tot - 1}$. To nie jest $\left(${fr(g, tot)}\right)^2$.` : T`Są dwie kolejności: najpierw dziewczyna, potem chłopiec – albo odwrotnie. Obie trzeba policzyć.`,
    tip: 'Losowanie bez zwracania: na drzewie prawdopodobieństwa w drugim etapie zmieniają się liczniki i mianowniki.'
  });
};

// ---------- 13.5 Zdarzenie przeciwne i własności prawdopodobieństwa ----------
const oppSimple = (r) => {
  const d = r.pick([4, 5, 6, 8, 9, 10, 12, 20, 25]);
  const n = r.int(1, d - 1);
  need(gcd(n, d) === 1);
  const asDec = [4, 5, 10, 20, 25].includes(d) && r.bool();
  const show = (a, b) => (asDec ? dec(a / b) : fr(a, b));
  return mc({
    title: 'Prawdopodobieństwo zdarzenia przeciwnego',
    q: T`Prawdopodobieństwo zdarzenia $A$ jest równe $${show(n, d)}$. Prawdopodobieństwo zdarzenia przeciwnego do zdarzenia $A$ jest równe`,
    ok: m(show(d - n, d)),
    val: (d - n) / d,
    bad: [m(show(n, d)), m(asDec ? dec((d - n) / d / 2) : fr(d, n > 1 ? n : d + 1)), m(asDec ? dec(Math.min(0.99, (d - n) / d + 0.1)) : fr(d - n, d + 1)), m(asDec ? dec(n / d / 2) : fr(1, d)), m(asDec ? dec(Math.max(0.01, (d - n) / d - 0.1)) : fr(d - n + 1 > d - 1 ? 1 : d - n + 1, d))],
    steps: [T`$P(A') = 1 - P(A)$.`, T`$P(A') = 1 - ${show(n, d)} = ${show(d - n, d)}$.`],
    trap: T`Zdarzenie przeciwne to „$A$ nie zaszło”. Jego prawdopodobieństwo dopełnia $P(A)$ do jedności, a nie jest jego odwrotnością.`,
    tip: TIP_OPP
  });
};
const oppAtLeastOne = (r) => {
  const kind = r.int(0, 1);
  if (kind === 0) {
    const n = r.int(2, 5);
    return mc({
      title: 'Co najmniej jeden orzeł',
      q: T`Rzucamy $${n}$ razy symetryczną monetą. Prawdopodobieństwo, że co najmniej raz wypadnie orzeł, jest równe`,
      ok: m(fr(2 ** n - 1, 2 ** n)),
      val: 1 - 1 / 2 ** n,
      bad: frOpts(2 ** n - 1, 2 ** n, [[1, 2 ** n], [1, 2], [n, 2 ** n], [n, 2 * n], [2 ** n - 2, 2 ** n], [n - 1, n], [1, n]]),
      steps: [T`Zdarzenie przeciwne: ani razu nie wypadł orzeł, czyli same reszki – to $1$ wynik spośród $2^{${n}} = ${2 ** n}$.`, T`$P(A) = 1 - \frac{1}{${2 ** n}} = ${fr(2 ** n - 1, 2 ** n)}$.`],
      trap: T`Liczenie wprost („jeden orzeł, dwa orły, …”) jest długie i łatwo o pomyłkę. Zdarzenie przeciwne ma tylko jeden wynik.`,
      tip: TIP_OPP
    });
  }
  const n = r.int(2, 3);
  const what = r.pick([[1, 'szóstka', 6], [3, 'liczba oczek większa od $3$', 2], [2, 'liczba oczek podzielna przez $3$', 3]]);
  const bad0 = 6 - what[0];
  const [nn, dd] = [6 ** n - bad0 ** n, 6 ** n];
  return mc({
    title: 'Co najmniej raz w kilku rzutach kostką',
    q: T`Rzucamy $${n}$ razy symetryczną sześcienną kostką do gry. Prawdopodobieństwo, że co najmniej raz wypadnie ${what[1]}, jest równe`,
    ok: m(fr(nn, dd)),
    val: nn / dd,
    bad: frOpts(nn, dd, [[bad0 ** n, dd], [what[0] * n, 6 * n], [what[0] ** n, dd], [n * what[0], dd], [nn + 1, dd], [1, 2], [what[0], 6]]),
    steps: [T`Zdarzenie przeciwne: ani razu nie wypadnie ${what[1]}. W jednym rzucie takich wyników jest $${bad0}$, więc w $${n}$ rzutach: $${bad0}^{${n}} = ${bad0 ** n}$.`, T`Wszystkich wyników: $6^{${n}} = ${dd}$.`, T`$P(A) = 1 - \frac{${bad0 ** n}}{${dd}} = ${fr(nn, dd)}$.`],
    trap: T`Nie wolno mnożyć prawdopodobieństwa z jednego rzutu przez liczbę rzutów. „Co najmniej raz” liczymy przez zdarzenie przeciwne „ani razu”.`,
    tip: TIP_OPP
  });
};
const oppProperties = (r) => {
  const impossible = r.pick([T`\frac{5}{4}`, T`-\frac{1}{3}`, T`1{,}2`, T`-0{,}1`, T`\frac{7}{6}`, T`\frac{11}{10}`, T`-\frac{2}{5}`, T`\frac{3}{2}`, '2', T`1{,}01`]);
  const possible = r.shuffle([T`\frac{3}{4}`, '0', '1', T`0{,}99`, T`\frac{1}{100}`, T`\frac{5}{6}`, T`0{,}5`, T`\frac{2}{7}`, T`0{,}001`, T`\frac{9}{10}`]).slice(0, 3);
  return mc({
    title: 'Własności prawdopodobieństwa',
    q: T`Prawdopodobieństwem pewnego zdarzenia NIE MOŻE być liczba`,
    ask: true,
    ok: m(impossible),
    bad: possible.map((x) => m(x)),
    steps: [T`Prawdopodobieństwo każdego zdarzenia spełnia warunek $0 \le P(A) \le 1$.`, T`Liczba $${impossible}$ nie należy do przedziału $\langle 0, 1 \rangle$, więc nie może być prawdopodobieństwem.`],
    trap: T`Liczby $0$ i $1$ SĄ możliwe: $0$ to prawdopodobieństwo zdarzenia niemożliwego, a $1$ – zdarzenia pewnego.`,
    tip: 'Karta wzorów, str. 27: $0 \\le P(A) \\le 1$, $P(\\emptyset) = 0$, $P(\\Omega) = 1$.'
  });
};
const oppNotDivisible = (r) => {
  const n = r.pick([20, 24, 30, 36, 40, 50, 60]);
  const k = r.pick([3, 4, 5, 6, 7, 8]);
  const div = Math.floor(n / k);
  const cnt = n - div;
  return mc({
    title: 'Zdarzenie przeciwne: liczba niepodzielna',
    q: T`Ze zbioru $\{1, 2, 3, \ldots, ${n}\}$ losujemy jedną liczbę. Prawdopodobieństwo wylosowania liczby, która NIE jest podzielna przez $${k}$, jest równe`,
    ask: true,
    ok: m(fr(cnt, n)),
    val: cnt / n,
    bad: frOpts(cnt, n, [[div, n], [cnt - 1, n], [cnt + 1, n], [k - 1, k], [1, k], [cnt, n + 1], [cnt - 2, n]]),
    steps: [T`Liczb podzielnych przez $${k}$ jest $${div}$ (od $${k}$ do $${div * k}$), więc $P(A') = \frac{${div}}{${n}}$.`, T`$P(A) = 1 - \frac{${div}}{${n}} = \frac{${cnt}}{${n}}${gcd(cnt, n) > 1 ? ` = ${fr(cnt, n)}` : ''}$.`],
    trap: T`Łatwiej policzyć liczby podzielne (jest ich mało) i odjąć od całości, niż wypisywać wszystkie niepodzielne.`,
    tip: TIP_OPP
  });
};
const oppLottery = (r) => {
  const tot = r.pick([20, 25, 40, 50, 80, 100, 200]);
  const win = r.pick([1, 2, 4, 5, 8, 10]);
  need(win < tot / 2 && tot % win === 0);
  const kind = r.bool();
  return mc({
    title: 'Loteria i zdarzenie przeciwne',
    q: kind ? T`W loterii jest $${tot}$ losów, w tym $${win}$ ${win === 1 ? 'wygrywający' : win < 5 ? 'wygrywające' : 'wygrywających'}. Kupujemy jeden los. Prawdopodobieństwo, że kupiony los jest przegrywający, jest równe` : T`W loterii prawdopodobieństwo wygranej dla jednego losu jest równe $${fr(win, tot)}$. Wszystkich losów jest $${tot}$. Liczba losów przegrywających jest równa`,
    ok: kind ? m(fr(tot - win, tot)) : m(tot - win),
    val: kind ? (tot - win) / tot : tot - win,
    bad: kind ? frOpts(tot - win, tot, [[win, tot], [win, tot - win], [tot - win - 1, tot], [1, 2], [tot - win, tot + win], [tot - 2 * win, tot]]) : [m(win), m(tot), m(tot - win - 1), m(tot / win), m(tot - 2 * win)],
    steps: kind ? [T`$P(\text{wygrana}) = \frac{${win}}{${tot}}$.`, T`$P(\text{przegrana}) = 1 - \frac{${win}}{${tot}} = ${fr(tot - win, tot)}$.`] : [T`Losów wygrywających: $${fr(win, tot)} \cdot ${tot} = ${win}$.`, T`Losów przegrywających: $${tot} - ${win} = ${tot - win}$.`],
    trap: T`Każdy los jest albo wygrywający, albo przegrywający – te dwa prawdopodobieństwa dają w sumie $1$.`,
    tip: TIP_OPP
  });
};

export default {
  numericId: 13,
  title: 'Rachunek prawdopodobieństwa',
  short_title: 'Prawdopodobieństwo',
  description: 'Model klasyczny, rzuty kostką i monetą, losowanie liczb i kul, zdarzenie przeciwne.',
  icon: 'Percent',
  color: '#FB7185',
  matura_points_range: '2–4 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 27',
  lessons: [
    {
      title: 'Klasyczna definicja prawdopodobieństwa',
      short_title: 'Model klasyczny',
      pill: pill({
        essence: T`Gdy wszystkie wyniki doświadczenia są jednakowo prawdopodobne, prawdopodobieństwo zdarzenia $A$ to ułamek: liczba wyników sprzyjających przez liczbę wszystkich możliwych wyników, $P(A) = \frac{|A|}{|\Omega|}$. Całe zadanie sprowadza się więc do dwóch zliczeń. Wynik jest zawsze liczbą z przedziału od $0$ do $1$.`,
        context: 'Zadanie 30–31 w arkuszu • 1 pkt oraz zadanie otwarte za 2 pkt. Prawdopodobieństwo jest w każdym arkuszu.',
        pl: T`„Jaka jest szansa?” to pytanie: ile jest dobrych wyników na ile wszystkich. W urnie $3$ białe i $7$ czarnych kul – szansa na białą to $3$ na $10$. Koniec filozofii.`,
        steps: [
          ['Policz wszystkie wyniki', T`W urnie $3 + 7 = 10$ kul: $|\Omega| = 10$.`, 'To będzie mianownik.'],
          ['Policz wyniki sprzyjające', T`Kule białe: $|A| = 3$.`, 'To będzie licznik.'],
          ['Zapisz ułamek i skróć', T`$P(A) = \frac{3}{10}$.`, 'Wynik musi być między 0 a 1.']
        ],
        formulas: [
          ['Prawdopodobieństwo klasyczne', T`P(A) = \frac{|A|}{|\Omega|}`, 27],
          ['Zakres wartości', T`0 \le P(A) \le 1`, 27]
        ],
        examples: [
          ['Losowanie liczby', '1 pkt', T`Ze zbioru $\{1, 2, \ldots, 20\}$ losujemy jedną liczbę. Oblicz prawdopodobieństwo wylosowania liczby pierwszej.`, T`1. $|\Omega| = 20$.` + '\n' + T`2. Liczby pierwsze: $2, 3, 5, 7, 11, 13, 17, 19$ – osiem.` + '\n' + T`3. $P = \frac{8}{20} = \frac{2}{5}$.`, 'Liczba 1 nie jest pierwsza.'],
          ['Od prawdopodobieństwa do liczby', '1 pkt', T`W pudełku jest $6$ kul białych i pewna liczba czarnych. Prawdopodobieństwo wylosowania białej to $\frac{1}{4}$. Ile jest czarnych?`, T`1. $\frac{6}{n} = \frac{1}{4}$, więc $n = 24$.` + '\n' + T`2. Czarnych: $24 - 6 = 18$.`, 'n to wszystkie kule, nie tylko czarne.']
        ],
        trap: T`W mianowniku stoi liczba WSZYSTKICH wyników, a nie liczba wyników „niesprzyjających”. $3$ białe i $7$ czarnych to $\frac{3}{10}$, nie $\frac{3}{7}$.`,
        fail: T`„$3$ białe, $7$ czarnych: $P(\text{biała}) = \frac{3}{7}$.”`,
        win: T`$P(\text{biała}) = \frac{3}{3 + 7} = \frac{3}{10}$.`,
        why: 'Losujemy spośród wszystkich kul, a nie tylko spośród czarnych.',
        ckeTip: 'W zadaniu otwartym zapisz osobno |Ω| i |A| – każde z tych zliczeń jest punktowane.',
        points: [T`$P(A) = \frac{\text{sprzyjające}}{\text{wszystkie}}$.`, T`Wynik zawsze między $0$ a $1$.`, T`Wypisuj wyniki sprzyjające – nie zgaduj.`]
      }),
      gens: [clsUrn, clsNumberSet, clsDie, clsClass, clsFindCount]
    },
    {
      title: 'Dwukrotny rzut kostką',
      short_title: 'Dwie kostki',
      pill: pill({
        essence: T`W dwukrotnym rzucie kostką wynikiem jest uporządkowana para liczb: (pierwszy rzut, drugi rzut). Wszystkich par jest $6 \cdot 6 = 36$ i są jednakowo prawdopodobne. Wyniki sprzyjające najwygodniej zaznaczyć w tabeli $6 \times 6$. Sumy oczek nie są równie częste: sumę $7$ daje sześć par, a sumę $2$ lub $12$ – tylko jedna.`,
        context: 'Zadanie otwarte za 2 pkt lub zamknięte za 1 pkt – to najczęstszy typ zadania z prawdopodobieństwa na maturze.',
        pl: T`Wyobraź sobie kostkę czerwoną i niebieską. „Czerwona $2$, niebieska $5$” to coś innego niż „czerwona $5$, niebieska $2$”. Dlatego wyników jest $36$, a nie $21$. Tabelka z sześcioma wierszami i sześcioma kolumnami załatwia sprawę.`,
        steps: [
          ['Zapisz liczbę wszystkich wyników', T`$|\Omega| = 6 \cdot 6 = 36$.`, 'Zawsze 36.'],
          ['Wypisz pary sprzyjające', T`Suma równa $5$: $(1,4), (2,3), (3,2), (4,1)$.`, 'Pamiętaj o obu kolejnościach.'],
          ['Policz i skróć', T`$P = \frac{4}{36} = \frac{1}{9}$.`, 'Skracaj na końcu.']
        ],
        formulas: [
          ['Liczba wszystkich wyników', T`|\Omega| = 6 \cdot 6 = 36`],
          ['Prawdopodobieństwo', T`P(A) = \frac{|A|}{36}`, 27]
        ],
        examples: [
          ['Suma oczek', '2 pkt', T`Oblicz prawdopodobieństwo, że suma oczek w dwóch rzutach jest równa $8$.`, T`1. $|\Omega| = 36$.` + '\n' + T`2. $(2,6), (3,5), (4,4), (5,3), (6,2)$ – pięć par.` + '\n' + T`3. $P = \frac{5}{36}$.`, 'Para (4, 4) występuje tylko raz.'],
          ['Iloczyn nieparzysty', '2 pkt', T`Oblicz prawdopodobieństwo, że iloczyn oczek jest nieparzysty.`, T`1. Iloczyn jest nieparzysty tylko wtedy, gdy obie liczby są nieparzyste.` + '\n' + T`2. $3 \cdot 3 = 9$ par.` + '\n' + T`3. $P = \frac{9}{36} = \frac{1}{4}$.`, 'Reguła mnożenia zamiast wypisywania.']
        ],
        trap: T`$(2, 5)$ i $(5, 2)$ to DWA różne wyniki. Wszystkich wyników jest $36$ – nie $12$ i nie $11$.`,
        fail: T`„Suma $5$: pary $1+4$ i $2+3$, więc $P = \frac{2}{36}$.”`,
        win: T`$(1,4), (4,1), (2,3), (3,2)$ – cztery pary, $P = \frac{4}{36} = \frac{1}{9}$.`,
        why: 'Rzuty są rozróżnialne (pierwszy i drugi), więc ta sama para liczb w odwrotnej kolejności to inny wynik.',
        ckeTip: 'W zadaniu otwartym narysuj tabelę 6 × 6 i zaznacz krzyżykami wyniki sprzyjające – to pełnoprawne uzasadnienie.',
        points: [T`$|\Omega| = 36$.`, T`Kolejność rzutów ma znaczenie.`, T`Suma $7$ jest najczęstsza: $6$ par.`]
      }),
      gens: [twoDice, twoDiceStatements]
    },
    {
      title: 'Losowanie liczb ze zbioru',
      short_title: 'Losowanie liczb',
      pill: pill({
        essence: T`W zadaniach o losowaniu liczb trudność leży w zliczaniu. Liczb dwucyfrowych jest $90$ (od $10$ do $99$), trzycyfrowych $900$. Liczby podzielne przez $k$ tworzą ciąg arytmetyczny, więc ich liczbę daje wzór $\frac{\text{ostatnia} - \text{pierwsza}}{k} + 1$. Gdy losujesz po jednej liczbie z dwóch zbiorów, wszystkich wyników jest tyle, ile wynosi iloczyn liczebności tych zbiorów.`,
        context: 'Zadanie zamknięte za 1 pkt lub otwarte za 2 pkt, zwykle zadanie 30–32.',
        pl: T`Najpierw policz, ile jest wszystkich liczb do wylosowania – i zrób to porządnie, bo „od $10$ do $99$” to $90$ liczb, nie $89$. Potem policz te dobre. Reszta to ułamek.`,
        steps: [
          ['Policz wszystkie możliwości', T`Liczby dwucyfrowe: $99 - 10 + 1 = 90$.`, 'Od a do b jest b − a + 1 liczb.'],
          ['Policz sprzyjające', T`Podzielne przez $7$: $14, 21, \ldots, 98$, czyli $\frac{98 - 14}{7} + 1 = 13$.`, 'Pierwsza, ostatnia, krok.'],
          ['Zapisz prawdopodobieństwo', T`$P = \frac{13}{90}$.`, 'Sprawdź, czy da się skrócić.']
        ],
        formulas: [
          ['Liczba liczb od a do b', T`b - a + 1`],
          ['Liczby podzielne przez k', T`\frac{\text{ostatnia} - \text{pierwsza}}{k} + 1`],
          ['Dwa zbiory', T`|\Omega| = |A| \cdot |B|`]
        ],
        examples: [
          ['Liczby dwucyfrowe', '2 pkt', T`Losujemy liczbę dwucyfrową. Oblicz prawdopodobieństwo, że jest podzielna przez $15$.`, T`1. $|\Omega| = 90$.` + '\n' + T`2. $15, 30, 45, 60, 75, 90$ – sześć liczb.` + '\n' + T`3. $P = \frac{6}{90} = \frac{1}{15}$.`, 'Przy małej liczbie wyników po prostu je wypisz.'],
          ['Dwa zbiory', '2 pkt', T`Losujemy jedną liczbę z $\{1, 2, 3\}$ i jedną z $\{4, 5\}$. Oblicz prawdopodobieństwo, że suma jest parzysta.`, T`1. $|\Omega| = 3 \cdot 2 = 6$.` + '\n' + T`2. Sumy parzyste: $(1,5), (2,4), (3,5)$ – trzy pary.` + '\n' + T`3. $P = \frac{3}{6} = \frac{1}{2}$.`, 'Wypisz wszystkie pary – jest ich tylko 6.']
        ],
        trap: T`Liczb dwucyfrowych jest $90$, nie $99$ i nie $100$. Zbiór zaczyna się od $10$.`,
        fail: T`„Liczb dwucyfrowych jest $99$, więc $P = \frac{13}{99}$.”`,
        win: T`$99 - 9 = 90$ liczb dwucyfrowych, $P = \frac{13}{90}$.`,
        why: 'Od 1 do 99 jest 99 liczb, ale dziewięć z nich (1–9) jest jednocyfrowych.',
        ckeTip: 'Sprawdź liczbę wielokrotności prostym testem: pierwsza + (liczba − 1) · k musi dać ostatnią.',
        points: [T`Liczb dwucyfrowych: $90$. Trzycyfrowych: $900$.`, T`Wielokrotności liczby $k$ zliczaj jak wyrazy ciągu arytmetycznego.`, T`Dwa zbiory: mnożymy ich liczebności.`]
      }),
      gens: [numTwoDigit, numTwoSets, numDigitsRandom]
    },
    {
      title: 'Losowanie dwóch elementów i drzewo prawdopodobieństwa',
      short_title: 'Dwa losowania i drzewo',
      time: '~6 min',
      pill: pill({
        essence: T`Doświadczenie złożone z dwóch etapów (dwie kule, dwie osoby, kilka rzutów monetą) opisujesz regułą mnożenia albo drzewem. Kluczowe pytanie: czy losujesz ze zwracaniem? Jeśli tak, drugi etap wygląda jak pierwszy. Jeśli nie, w drugim etapie jest o jeden element mniej. Na drzewie prawdopodobieństwa wzdłuż gałęzi mnożysz, a wyniki z różnych gałęzi dodajesz.`,
        context: 'Zadanie otwarte za 2 pkt lub zamknięte za 1 pkt.',
        pl: T`Wyciągasz skarpetkę z szuflady i nie wkładasz jej z powrotem – w szufladzie jest już o jedną mniej, więc szanse się zmieniły. To jest „bez zwracania”. Gdybyś ją odłożył, drugie losowanie byłoby identyczne z pierwszym.`,
        steps: [
          ['Ustal: ze zwracaniem czy bez', T`„Losujemy kolejno dwie kule bez zwracania” – w drugim losowaniu jest o jedną kulę mniej.`, 'To zmienia mianownik w drugim etapie.'],
          ['Policz wszystkie wyniki', T`$4$ białe i $6$ czarnych, bez zwracania: $10 \cdot 9 = 90$.`, 'Pary uporządkowane.'],
          ['Policz sprzyjające – z obu kolejności', T`Różne kolory: $4 \cdot 6 + 6 \cdot 4 = 48$. $P = \frac{48}{90} = \frac{8}{15}$.`, 'Biała–czarna i czarna–biała.']
        ],
        formulas: [
          ['Bez zwracania', T`|\Omega| = n \cdot (n - 1)`],
          ['Ze zwracaniem', T`|\Omega| = n \cdot n`],
          ['Drzewo', T`\text{wzdłuż gałęzi mnożymy, gałęzie dodajemy}`]
        ],
        examples: [
          ['Bez zwracania', '2 pkt', T`W urnie są $3$ kule białe i $2$ czarne. Losujemy dwie bez zwracania. Oblicz prawdopodobieństwo wylosowania dwóch białych.`, T`1. $|\Omega| = 5 \cdot 4 = 20$.` + '\n' + T`2. Dwie białe: $3 \cdot 2 = 6$.` + '\n' + T`3. $P = \frac{6}{20} = \frac{3}{10}$.`, 'Po pierwszej białej zostają dwie białe.'],
          ['Trzy rzuty monetą', '1 pkt', T`Rzucamy trzy razy monetą. Oblicz prawdopodobieństwo dokładnie dwóch orłów.`, T`1. $|\Omega| = 8$.` + '\n' + T`2. OOR, ORO, ROO – trzy wyniki.` + '\n' + T`3. $P = \frac{3}{8}$.`, 'Kolejność rzutów ma znaczenie.']
        ],
        trap: T`„Różnych kolorów” to DWIE gałęzie drzewa: biała–czarna oraz czarna–biała. Policzenie jednej daje połowę poprawnego wyniku.`,
        fail: T`„$4$ białe, $6$ czarnych, różne kolory: $\frac{4}{10} \cdot \frac{6}{9} = \frac{4}{15}$.”`,
        win: T`$\frac{4}{10} \cdot \frac{6}{9} + \frac{6}{10} \cdot \frac{4}{9} = \frac{8}{15}$.`,
        why: 'Kule różnych kolorów można wylosować w dwóch kolejnościach i obie spełniają warunek.',
        ckeTip: 'Narysuj drzewo z dwoma poziomami i podpisz każdą gałąź ułamkiem – egzaminator widzi wtedy cały tok rozumowania.',
        points: [T`Bez zwracania: w drugim etapie o jeden element mniej.`, T`Wzdłuż gałęzi mnożymy, gałęzie dodajemy.`, T`Uwzględniaj obie kolejności.`]
      }),
      gens: [drawTwoNoReturn, drawTwoWithReturn, coins, drawTwoPeople]
    },
    {
      title: 'Zdarzenie przeciwne i własności prawdopodobieństwa',
      short_title: 'Zdarzenie przeciwne',
      pill: pill({
        essence: T`Zdarzenie przeciwne do $A$ (oznaczane $A'$) zachodzi dokładnie wtedy, gdy nie zachodzi $A$. Prawdopodobieństwa tych dwóch zdarzeń dają w sumie $1$, więc $P(A') = 1 - P(A)$. To najwygodniejsza droga do zdarzeń typu „co najmniej jeden” – liczysz „ani jeden” i odejmujesz od jedności. Prawdopodobieństwo jest zawsze liczbą od $0$ (zdarzenie niemożliwe) do $1$ (zdarzenie pewne).`,
        context: 'Zadanie zamknięte za 1 pkt, często jako skrót w zadaniu otwartym.',
        pl: T`Albo zdasz, albo nie zdasz – trzeciej opcji nie ma, więc szanse sumują się do $100\%$. Jeśli szansa na deszcz to $0{,}3$, to szansa na brak deszczu to $0{,}7$. I tak samo: „co najmniej jedna szóstka” to wszystko poza „żadnej szóstki”.`,
        steps: [
          ['Rozpoznaj „co najmniej”', T`„Co najmniej raz wypadnie orzeł” w trzech rzutach.`, 'Sygnał do użycia zdarzenia przeciwnego.'],
          ['Policz zdarzenie przeciwne', T`„Ani razu orzeł” = same reszki: $\frac{1}{8}$.`, 'Zwykle to jeden prosty przypadek.'],
          ['Odejmij od jedności', T`$1 - \frac{1}{8} = \frac{7}{8}$.`, 'Wynik musi być między 0 a 1.']
        ],
        formulas: [
          ['Zdarzenie przeciwne', T`P(A') = 1 - P(A)`, 27],
          ['Zakres wartości', T`0 \le P(A) \le 1`, 27],
          ['Zdarzenie pewne i niemożliwe', T`P(\Omega) = 1, \quad P(\emptyset) = 0`, 27]
        ],
        examples: [
          ['Dwa rzuty kostką', '2 pkt', T`Oblicz prawdopodobieństwo, że w dwóch rzutach kostką co najmniej raz wypadnie szóstka.`, T`1. Ani razu szóstka: $5 \cdot 5 = 25$ wyników z $36$.` + '\n' + T`2. $P = 1 - \frac{25}{36} = \frac{11}{36}$.`, 'Wprost trzeba by liczyć trzy przypadki.'],
          ['Loteria', '1 pkt', T`Wśród $50$ losów jest $5$ wygrywających. Oblicz prawdopodobieństwo, że kupiony los przegrywa.`, T`1. $P(\text{wygrana}) = \frac{5}{50} = \frac{1}{10}$.` + '\n' + T`2. $P(\text{przegrana}) = \frac{9}{10}$.`, 'Wygrana i przegrana dopełniają się do 1.']
        ],
        trap: T`„Co najmniej raz w dwóch rzutach” to NIE jest $2 \cdot \frac{1}{6}$. Prawdopodobieństw nie mnoży się przez liczbę prób.`,
        fail: T`„Szóstka w jednym rzucie: $\frac{1}{6}$, więc w dwóch: $\frac{2}{6} = \frac{1}{3}$.”`,
        win: T`$1 - \frac{25}{36} = \frac{11}{36}$.`,
        why: 'Gdyby mnożenie działało, w siedmiu rzutach wyszłoby prawdopodobieństwo większe od 1, a to niemożliwe.',
        ckeTip: 'Otrzymałeś prawdopodobieństwo większe od 1 albo ujemne? Na pewno jest błąd – sprawdź rachunek od początku.',
        points: [T`$P(A') = 1 - P(A)$.`, T`„Co najmniej jeden” = $1 -$ „ani jeden”.`, T`$0 \le P(A) \le 1$ – zawsze.`]
      }),
      gens: [oppSimple, oppAtLeastOne, oppProperties, oppNotDivisible, oppLottery]
    }
  ]
};
