import { T, mc, num, pf, pill, m, need } from './lib.js';

const TIP_MUL = 'Karta wzorów, str. 26: reguła mnożenia – jeśli pierwszą czynność można wykonać na $n_1$ sposobów, a drugą na $n_2$ sposobów, to obie na $n_1 \\cdot n_2$ sposobów.';
/** „prowadzą 3 drogi” / „prowadzi 5 dróg” */
const roads = (n) => (n === 1 ? 'prowadzi $1$ droga' : n < 5 ? `prowadzą $${n}$ drogi` : `prowadzi $${n}$ dróg`);
const NOM = { 2: 'dwucyfrowe', 3: 'trzycyfrowe', 4: 'czterocyfrowe' };
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const prodStr = (arr) => arr.join(' \\cdot ');
const uniqNums = (ok, arr) => [...new Set(arr.filter((x) => Number.isInteger(x) && x > 0 && x !== ok))].map((x) => m(x));

// ---------- 12.1 Reguła mnożenia ----------
const mulRoutes = (r) => {
  const a = r.int(2, 7);
  const b = r.intNot(2, 7, a);
  const c = r.int(2, 5);
  const three = r.bool();
  const v = three ? a * b * c : a * b;
  const [X, Y, Z, W] = r.pick([['$A$', '$B$', '$C$', '$D$'], ['$K$', '$L$', '$M$', '$N$'], ['$P$', '$Q$', '$R$', '$S$']]);
  return mc({
    title: 'Reguła mnożenia: trasy',
    q: three ? `Z miasta ${X} do miasta ${Y} ${roads(a)}, z miasta ${Y} do miasta ${Z} ${roads(b)}, a z miasta ${Z} do miasta ${W} ${roads(c)}. Liczba wszystkich tras z miasta ${X} do miasta ${W} prowadzących kolejno przez miasta ${Y} i ${Z} jest równa` : `Z miasta ${X} do miasta ${Y} ${roads(a)}, a z miasta ${Y} do miasta ${Z} ${roads(b)}. Liczba wszystkich tras z miasta ${X} do miasta ${Z} prowadzących przez miasto ${Y} jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, three ? [a + b + c, a * b + c, a * (b + c), 2 * v, a * b] : [a + b, 2 * (a + b), a * a, b * b, v + a, 2 * v]),
    steps: [T`Wybór trasy składa się z ${three ? 'trzech' : 'dwóch'} kolejnych etapów, a każdy wybór łączymy z każdym.`, T`$${prodStr(three ? [a, b, c] : [a, b])} = ${v}$.`],
    trap: T`Etapy wykonujemy jeden PO drugim (i… i…), więc liczby możliwości mnożymy. Dodawanie stosuje się, gdy wybieramy jedną z rozłącznych opcji (albo… albo…).`,
    tip: TIP_MUL
  });
};
const mulCodes = (r) => {
  const n = r.pick([2, 3, 4, 5, 6, 10, 26]);
  const k = r.int(2, n >= 10 ? 3 : 5);
  need(n ** k <= 20000);
  const what = n === 10 ? 'cyfr (cyfry mogą się powtarzać)' : n === 26 ? 'liter 26-literowego alfabetu (litery mogą się powtarzać)' : `znaków wybieranych spośród $${n}$ różnych znaków (znaki mogą się powtarzać)`;
  return mc({
    title: 'Reguła mnożenia: kody z powtórzeniami',
    q: T`Kod składa się z $${k}$ ${what}. Liczba wszystkich takich kodów jest równa`,
    ok: m(n ** k),
    val: n ** k,
    bad: uniqNums(n ** k, [n * k, k ** n, n ** (k - 1), n ** (k + 1) > 200000 ? n ** k + n : n ** (k + 1), fact(Math.min(n, 7)), n * (n - 1)]),
    steps: [T`Kod ma $${k}$ pozycji i każdą z nich wybieramy niezależnie na $${n}$ sposobów.`, T`$${prodStr(Array(k).fill(n))} = ${n}^{${k}} = ${n ** k}$.`],
    trap: T`To $${n}^{${k}}$, a nie $${k}^{${n}}$ ani $${n} \cdot ${k}$. Podstawą potęgi jest liczba możliwości na jednej pozycji, a wykładnikiem – liczba pozycji.`,
    tip: TIP_MUL
  });
};
const mulMenu = (r) => {
  const [a, b, c] = [r.int(5, 9), r.int(5, 9), r.int(5, 8)];
  const ctx = r.pick([
    [`W karcie dań jest $${a}$ zup, $${b}$ drugich dań i $${c}$ deserów. Liczba wszystkich zestawów obiadowych złożonych z jednej zupy, jednego drugiego dania i jednego deseru jest równa`],
    [`Ola ma $${a}$ par spodni, $${b}$ bluzek i $${c}$ par butów. Liczba wszystkich zestawów złożonych z jednej pary spodni, jednej bluzki i jednej pary butów jest równa`],
    [`W sklepie można kupić rower w jednym z $${a}$ kolorów, z jednym z $${b}$ rodzajów ramy i jednym z $${c}$ rodzajów opon. Liczba wszystkich możliwych wersji roweru jest równa`]
  ]);
  const v = a * b * c;
  return mc({
    title: 'Reguła mnożenia: zestawy',
    q: ctx[0],
    ok: m(v),
    val: v,
    bad: uniqNums(v, [a + b + c, a * b + c, a + b * c, 3 * (a + b + c), a * b, 2 * v]),
    steps: [T`Zestaw powstaje z trzech niezależnych wyborów: $${a}$, $${b}$ i $${c}$ możliwości.`, T`$${a} \cdot ${b} \cdot ${c} = ${v}$.`],
    trap: T`Każdy element pierwszego rodzaju można połączyć z każdym drugiego i każdym trzeciego – stąd mnożenie, nie dodawanie.`,
    tip: TIP_MUL
  });
};
const mulDigitsSet = (r) => {
  const n = r.int(3, 8);
  const k = r.int(2, 4);
  need(n ** k <= 5000);
  const name = { 2: 'dwucyfrowych', 3: 'trzycyfrowych', 4: 'czterocyfrowych' }[k];
  return mc({
    title: 'Liczby o cyfrach z danego zbioru',
    q: T`Liczba wszystkich liczb naturalnych ${name}, w których zapisie dziesiętnym występują tylko cyfry ze zbioru $\{${Array.from({ length: n }, (_, i) => i + 1).join(', ')}\}$ (cyfry mogą się powtarzać), jest równa`,
    ok: m(n ** k),
    val: n ** k,
    bad: uniqNums(n ** k, [n * k, k ** n > 9999 ? n ** k + n : k ** n, n ** (k - 1), fact(n) > 9999 ? n ** k - n : fact(n), n * (n - 1) * (k > 2 ? n - 2 : 1), n ** k + n]),
    steps: [T`Zbiór ma $${n}$ cyfr i nie zawiera zera, więc na każdej pozycji mamy $${n}$ możliwości (pozycji jest $${k}$).`, T`$${n}^{${k}} = ${n ** k}$.`],
    trap: T`Cyfry mogą się powtarzać, więc na każdej pozycji jest nadal $${n}$ możliwości – nie zmniejszamy ich liczby.`,
    tip: TIP_MUL
  });
};
const mulExperiments = (r) => {
  const kind = r.int(0, 2);
  if (kind === 0) {
    const n = r.int(2, 8);
    return mc({
      title: 'Liczba wyników rzutów monetą',
      q: T`Rzucamy $${n}$ razy symetryczną monetą. Liczba wszystkich możliwych wyników tego doświadczenia jest równa`,
      ok: m(2 ** n),
      val: 2 ** n,
      bad: uniqNums(2 ** n, [2 * n, n * n, 2 ** (n - 1), 2 ** (n + 1), n + 2]),
      steps: [T`W każdym rzucie są $2$ możliwe wyniki (orzeł albo reszka).`, T`$2^{${n}} = ${2 ** n}$.`],
      trap: T`Wynik doświadczenia to cały ciąg $${n}$ rzutów, więc mnożymy $2$ przez siebie $${n}$ razy, a nie mnożymy $2 \cdot ${n}$.`,
      tip: TIP_MUL
    });
  }
  if (kind === 1) {
    const n = r.int(2, 4);
    return mc({
      title: 'Liczba wyników rzutów kostką',
      q: T`Rzucamy $${n}$ razy symetryczną sześcienną kostką do gry. Liczba wszystkich możliwych wyników tego doświadczenia jest równa`,
      ok: m(6 ** n),
      val: 6 ** n,
      bad: uniqNums(6 ** n, [6 * n, n ** 6 > 5000 ? 6 ** n + 6 : n ** 6, 6 ** (n - 1), 6 ** (n + 1), 6 * 5 * (n > 2 ? 4 : 1)]),
      steps: [T`W każdym rzucie jest $6$ możliwych wyników.`, T`$6^{${n}} = ${6 ** n}$.`],
      trap: T`Wyniki $(1, 2)$ i $(2, 1)$ to dwa różne wyniki – liczy się kolejność rzutów.`,
      tip: TIP_MUL
    });
  }
  const c = r.int(1, 4);
  const d = r.int(1, 2);
  const v = 2 ** c * 6 ** d;
  return mc({
    title: 'Liczba wyników: moneta i kostka',
    q: T`Rzucamy ${c === 1 ? 'raz' : `$${c}$ razy`} symetryczną monetą, a następnie ${d === 1 ? 'raz' : `$${d}$ razy`} symetryczną sześcienną kostką do gry. Liczba wszystkich możliwych wyników tego doświadczenia jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [2 * c + 6 * d, 2 ** c + 6 ** d, 2 * c * 6 * d, v * 2, v / 2, 12 * (c + d)]),
    steps: [T`Moneta: $2^{${c}} = ${2 ** c}$ wyników. Kostka: $6^{${d}} = ${6 ** d}$ wyników.`, T`Łącznie: $${2 ** c} \cdot ${6 ** d} = ${v}$.`],
    trap: T`Liczby wyników poszczególnych etapów mnożymy, a nie dodajemy.`,
    tip: TIP_MUL
  });
};

// ---------- 12.2 Reguła dodawania i łączenie reguł ----------
const addDirectOrVia = (r) => {
  const k = r.int(1, 5);
  const a = r.int(2, 6);
  const b = r.int(2, 6);
  const v = k + a * b;
  return mc({
    title: 'Reguła dodawania i mnożenia: trasy',
    q: T`Z miasta $A$ do miasta $C$ ${k === 1 ? 'prowadzi $1$ droga bezpośrednia' : k < 5 ? `prowadzą $${k}$ drogi bezpośrednie` : `prowadzi $${k}$ dróg bezpośrednich`}. Można też pojechać przez miasto $B$: z $A$ do $B$ ${roads(a)}, a z $B$ do $C$ ${roads(b)}. Liczba wszystkich tras z $A$ do $C$ jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [k * a * b, k + a + b, a * b, (k + a) * b, v + k]),
    steps: [T`Trasy przez $B$: $${a} \cdot ${b} = ${a * b}$ (reguła mnożenia).`, T`Jedziemy ALBO bezpośrednio, ALBO przez $B$ – te możliwości się wykluczają, więc dodajemy: $${k} + ${a * b} = ${v}$.`],
    trap: T`„Albo… albo…” oznacza dodawanie, „najpierw… potem…” oznacza mnożenie. Tutaj występują oba przypadki.`,
    tip: 'Reguła dodawania: jeśli wybieramy jedną z dwóch rozłącznych grup możliwości, to liczby możliwości dodajemy.'
  });
};
const addOneOf = (r) => {
  const [a, b, c] = [r.int(5, 12), r.int(5, 12), r.int(5, 9)];
  const ctx = r.pick([
    [`Na półce stoi $${a}$ powieści, $${b}$ poradników i $${c}$ albumów (wszystkie książki są różne). Liczba sposobów wyboru jednej książki z tej półki jest równa`, `Liczba sposobów wyboru zestawu złożonego z jednej powieści, jednego poradnika i jednego albumu jest równa`],
    [`W klasie jest $${a}$ dziewcząt i $${b}$ chłopców, a w kole naukowym dodatkowo $${c}$ uczniów z innej klasy. Liczba sposobów wyboru jednej osoby spośród nich wszystkich jest równa`, null]
  ]);
  const one = r.bool() || !ctx[1];
  const base = ctx[0].split('. ')[0] + '. ';
  const v = one ? a + b + c : a * b * c;
  need(v <= 2000);
  return mc({
    title: one ? 'Reguła dodawania: wybór jednego elementu' : 'Reguła mnożenia: wybór zestawu',
    q: one ? ctx[0] : base + ctx[1],
    ok: m(v),
    val: v,
    bad: uniqNums(v, [a * b * c > 5000 ? a * b + c : a * b * c, a + b + c, a * b + c, a + b * c, (a + b) * c]),
    steps: one ? [T`Wybieramy JEDEN element z trzech rozłącznych grup.`, T`$${a} + ${b} + ${c} = ${v}$.`] : [T`Wybieramy po jednym elemencie z KAŻDEJ grupy.`, T`$${a} \cdot ${b} \cdot ${c} = ${v}$.`],
    trap: one ? T`Wybieramy tylko jedną rzecz, więc możliwości z różnych grup dodajemy. Mnożenie dotyczyłoby wyboru po jednej rzeczy z każdej grupy.` : T`Wybieramy po jednym elemencie z każdej grupy, więc mnożymy. Dodawanie dotyczyłoby wyboru jednej rzeczy łącznie.`,
    tip: 'Jeden element z kilku grup – dodawaj. Po jednym elemencie z każdej grupy – mnóż.'
  });
};
const addFlags = (r) => {
  const n = r.int(4, 8);
  const v2 = n * (n - 1);
  const v3 = n * (n - 1) * (n - 2);
  return mc({
    title: 'Łączenie reguł: przypadki',
    q: T`Mamy do dyspozycji $${n}$ różnych kolorów. Flaga może składać się z dwóch albo z trzech poziomych pasów, przy czym każdy pas jest innego koloru. Liczba wszystkich takich flag jest równa`,
    ok: m(v2 + v3),
    val: v2 + v3,
    bad: uniqNums(v2 + v3, [v2 * v3 > 99999 ? v3 : v2 * v3, v3, v2, n * n + n * n * n, 2 * n + 3 * n]),
    steps: [T`Flagi dwupasowe: $${n} \cdot ${n - 1} = ${v2}$. Flagi trzypasowe: $${n} \cdot ${n - 1} \cdot ${n - 2} = ${v3}$.`, T`Flaga jest albo dwupasowa, albo trzypasowa: $${v2} + ${v3} = ${v2 + v3}$.`],
    trap: T`Przypadki rozłączne (dwa pasy albo trzy pasy) dodajemy. W obrębie jednego przypadku kolejne pasy mnożymy, zmniejszając liczbę dostępnych kolorów.`,
    tip: 'Zadanie z przypadkami: policz każdy przypadek regułą mnożenia, a wyniki dodaj.'
  });
};
const addUpToDigits = (r) => {
  const n = r.int(2, 5);
  const maxLen = r.int(2, 3);
  const parts = Array.from({ length: maxLen }, (_, i) => n ** (i + 1));
  const v = parts.reduce((s, x) => s + x, 0);
  return mc({
    title: 'Łączenie reguł: liczby o różnej liczbie cyfr',
    q: T`Liczba wszystkich liczb naturalnych dodatnich mniejszych od $${10 ** maxLen}$, w których zapisie dziesiętnym występują tylko cyfry ze zbioru $\{${Array.from({ length: n }, (_, i) => i + 1).join(', ')}\}$ (cyfry mogą się powtarzać), jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [n ** maxLen, parts.reduce((s, x) => s * x, 1) > 99999 ? v + n : parts.reduce((s, x) => s * x, 1), n * maxLen, v - n, v + 1]),
    steps: [`Rozpatrujemy liczby ${maxLen === 2 ? 'jedno- i dwucyfrowe' : 'jedno-, dwu- i trzycyfrowe'} osobno: ${parts.map((p, i) => (i === 0 ? `$${n}$` : `$${n}^{${i + 1}} = ${p}$`)).join(', ')}.`, T`Suma: $${parts.join(' + ')} = ${v}$.`],
    trap: T`Liczby mniejsze od $${10 ** maxLen}$ to nie tylko liczby ${NOM[maxLen]} – trzeba doliczyć krótsze.`,
    tip: 'Zadanie z przypadkami: policz każdy przypadek regułą mnożenia, a wyniki dodaj.'
  });
};
const addPasswordFormats = (r) => {
  const L = r.pick([3, 4, 5, 6]);
  const D = r.pick([5, 10]);
  const v = 2 * L * D;
  return mc({
    title: 'Łączenie reguł: dwa formaty kodu',
    q: T`Kod składa się z dwóch znaków: jednej litery wybranej spośród $${L}$ liter oraz jednej cyfry wybranej spośród $${D}$ cyfr. Litera może stać na pierwszym albo na drugim miejscu. Liczba wszystkich takich kodów jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [L * D, L + D, 2 * (L + D), L * D * L * D > 99999 ? v * 2 : L * D * L * D, (L + D) ** 2]),
    steps: [T`Kody typu „litera, cyfra”: $${L} \cdot ${D} = ${L * D}$. Kody typu „cyfra, litera”: $${D} \cdot ${L} = ${L * D}$.`, T`Razem: $${L * D} + ${L * D} = ${v}$.`],
    trap: T`Kod „A5” i kod „5A” to dwa różne kody – kolejność ma znaczenie, więc są dwa przypadki.`,
    tip: 'Zadanie z przypadkami: policz każdy przypadek regułą mnożenia, a wyniki dodaj.'
  });
};

// ---------- 12.3 Liczby o zadanych własnościach ----------
const NAMES = { 2: 'dwucyfrowych', 3: 'trzycyfrowych', 4: 'czterocyfrowych' };
const numProperty = (r) => {
  const k = r.int(2, 4);
  const mid = 10 ** (k - 2);
  const props = [
    ['parzystych', 9 * mid * 5, T`Cyfra pierwsza: $9$ możliwości (bez zera), cyfra jedności: $5$ możliwości ($0, 2, 4, 6, 8$)${k > 2 ? T`, pozostałe: po $10$` : ''}.`, 'Liczba jest parzysta, gdy jej ostatnia cyfra jest parzysta – a zero też jest cyfrą parzystą.'],
    ['nieparzystych', 9 * mid * 5, T`Cyfra pierwsza: $9$ możliwości (bez zera), cyfra jedności: $5$ możliwości ($1, 3, 5, 7, 9$)${k > 2 ? T`, pozostałe: po $10$` : ''}.`, 'O parzystości decyduje tylko ostatnia cyfra.'],
    ['podzielnych przez $5$', 9 * mid * 2, T`Cyfra pierwsza: $9$ możliwości, cyfra jedności: $2$ możliwości ($0$ albo $5$)${k > 2 ? T`, pozostałe: po $10$` : ''}.`, 'Liczba dzieli się przez 5, gdy kończy się cyfrą 0 lub 5.'],
    ['podzielnych przez $10$', 9 * mid, T`Cyfra pierwsza: $9$ możliwości, cyfra jedności: tylko $0$${k > 2 ? T`, pozostałe: po $10$` : ''}.`, 'Liczba dzieli się przez 10, gdy kończy się zerem.'],
    ['o wszystkich cyfrach nieparzystych', 5 ** k, T`Na każdej z $${k}$ pozycji jest $5$ możliwości ($1, 3, 5, 7, 9$).`, 'Cyfr nieparzystych jest pięć i żadna z nich nie jest zerem, więc pierwsza pozycja nie wymaga osobnego traktowania.'],
    ['o wszystkich cyfrach parzystych', 4 * 5 ** (k - 1), T`Cyfra pierwsza: $4$ możliwości ($2, 4, 6, 8$ – bez zera), każda następna: $5$ możliwości ($0, 2, 4, 6, 8$).`, 'Zero jest cyfrą parzystą, ale nie może stać na początku liczby.'],
    ['o różnych cyfrach', [0, 0, 81, 648, 4536][k], T`Cyfra pierwsza: $9$ możliwości (bez zera), druga: $9$ (dowolna poza pierwszą)${k > 2 ? T`, trzecia: $8$` : ''}${k > 3 ? T`, czwarta: $7$` : ''}.`, 'Na drugiej pozycji „wraca” zero, więc jest 9 możliwości, a nie 8.'],
    ['w ogóle', 9 * 10 ** (k - 1), T`Cyfra pierwsza: $9$ możliwości (bez zera), każda następna: $10$.`, 'Pierwszą cyfrą liczby nie może być zero.']
  ];
  const [name, v, why, trap] = r.pick(props);
  const all = name === 'w ogóle';
  return mc({
    title: 'Liczby o zadanej własności',
    q: all ? T`Liczba wszystkich liczb naturalnych ${NAMES[k]} jest równa` : T`Liczba wszystkich liczb naturalnych ${NAMES[k]} ${name} jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [10 ** k / 2, 10 ** k, 9 * 10 ** (k - 1), 5 ** k, 9 * 10 ** (k - 1) / 2 + 5, 9 * 9 * (k > 2 ? 8 : 1), v + 10, 10 ** (k - 1), v - 9 > 0 ? v - 9 : v + 9].sort(() => r.rnd() - 0.5)),
    steps: [why, T`Z reguły mnożenia: $${v}$.`],
    trap,
    tip: 'Licząc liczby wielocyfrowe, zacznij od pozycji z ograniczeniami: pierwsza cyfra (bez zera) i ostatnia (warunek podzielności).'
  });
};
const numFromSetParity = (r) => {
  const n = r.int(4, 9);
  const k = r.int(2, 4);
  const even = r.bool();
  const cntLast = even ? Math.floor(n / 2) : Math.ceil(n / 2);
  const v = n ** (k - 1) * cntLast;
  need(v <= 6000);
  return mc({
    title: 'Liczby parzyste i nieparzyste o cyfrach z danego zbioru',
    q: T`Liczba wszystkich liczb naturalnych ${NAMES[k]} ${even ? 'parzystych' : 'nieparzystych'}, w których zapisie dziesiętnym występują tylko cyfry ze zbioru $\{${Array.from({ length: n }, (_, i) => i + 1).join(', ')}\}$ (cyfry mogą się powtarzać), jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [n ** k, n ** (k - 1) * (n - cntLast), n ** k / 2, n ** (k - 1), cntLast ** k, v + n]),
    steps: [T`Ostatnia cyfra musi być ${even ? 'parzysta' : 'nieparzysta'}: w zbiorze jest $${cntLast}$ takich cyfr.`, T`${k - 1 === 1 ? 'Pozostałą pozycję' : `Pozostałe pozycje (jest ich $${k - 1}$)`} wybieramy dowolnie: po $${n}$ możliwości.`, T`$${prodStr([...Array(k - 1).fill(n), cntLast])} = ${v}$.`],
    trap: T`W zbiorze $\{1, \ldots, ${n}\}$ cyfr parzystych jest $${Math.floor(n / 2)}$, a nieparzystych $${Math.ceil(n / 2)}$ – nie zawsze po połowie.`,
    tip: 'Licząc liczby wielocyfrowe, zacznij od pozycji z ograniczeniami: pierwsza cyfra (bez zera) i ostatnia (warunek podzielności).'
  });
};
const numFirstLast = (r) => {
  const k = r.int(3, 4);
  const firstEven = r.bool();
  const lastEven = r.bool();
  const f = firstEven ? 4 : 5;
  const l = lastEven ? 5 : 5;
  const v = f * 10 ** (k - 2) * l;
  const pos = k === 3 ? 'setek' : 'tysięcy';
  return mc({
    title: 'Warunki na pierwszą i ostatnią cyfrę',
    q: T`Liczba wszystkich liczb naturalnych ${NAMES[k]}, w których cyfra ${pos} jest ${firstEven ? 'parzysta' : 'nieparzysta'}, a cyfra jedności jest ${lastEven ? 'parzysta' : 'nieparzysta'}, jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [5 * 10 ** (k - 2) * 5, 4 * 10 ** (k - 2) * 5, 4 * 10 ** (k - 2) * 4, 9 * 10 ** (k - 2) * 5, 9 * 10 ** (k - 1) / 4, 5 * 10 ** (k - 2) * 4]),
    steps: [T`Cyfra ${pos}: ${firstEven ? T`$4$ możliwości ($2, 4, 6, 8$ – zero nie może być pierwszą cyfrą)` : T`$5$ możliwości ($1, 3, 5, 7, 9$)`}.`, T`Cyfra jedności: $5$ możliwości (${lastEven ? T`$0, 2, 4, 6, 8$` : T`$1, 3, 5, 7, 9$`}). Pozostałe pozycje: po $10$.`, T`$${prodStr([f, ...Array(k - 2).fill(10), l])} = ${v}$.`],
    trap: firstEven ? T`Parzystych cyfr jest pięć, ale na pierwszej pozycji zero odpada – zostają cztery.` : T`Na ostatniej pozycji zero jest dozwolone, na pierwszej – nie. Każdą pozycję licz osobno.`,
    tip: 'Licząc liczby wielocyfrowe, zacznij od pozycji z ograniczeniami: pierwsza cyfra (bez zera) i ostatnia (warunek podzielności).'
  });
};
const numGreaterThan = (r) => {
  const d = r.int(2, 8);
  const k = r.int(2, 3);
  const start = d * 10 ** (k - 1);
  const v = 10 ** k - 1 - start;
  const even = r.bool();
  const cnt = even ? (10 ** k - start) / 2 - 1 : (10 ** k - start) / 2;
  return mc({
    title: 'Liczby większe od danej',
    q: T`Liczba wszystkich liczb naturalnych ${NAMES[k]} ${even ? 'parzystych' : 'nieparzystych'} większych od $${start}$ jest równa`,
    ok: m(cnt),
    val: cnt,
    bad: uniqNums(cnt, [v, cnt + 1, cnt - 1, (10 ** k - start) / 2 + (even ? 0 : 1), (9 - d) * 10 ** (k - 1), (10 - d) * 5]),
    steps: [T`Liczby ${NOM[k]} większe od $${start}$ to liczby od $${start + 1}$ do $${10 ** k - 1}$ – jest ich $${v}$.`, even ? T`Parzyste wśród nich: $${start + 2}, ${start + 4}, \ldots, ${10 ** k - 2}$, czyli $\frac{${10 ** k - 2} - ${start + 2}}{2} + 1 = ${cnt}$.` : T`Nieparzyste wśród nich: $${start + 1}, ${start + 3}, \ldots, ${10 ** k - 1}$, czyli $\frac{${10 ** k - 1} - ${start + 1}}{2} + 1 = ${cnt}$.`],
    trap: T`„Większych od $${start}$” oznacza, że sama liczba $${start}$ się nie liczy.`,
    tip: 'Liczb całkowitych od $a$ do $b$ (włącznie) jest $b - a + 1$; co drugich – $\\frac{b - a}{2} + 1$.'
  });
};

// ---------- 12.4 Ustawienia i wybory bez powtórzeń ----------
const noRepPin = (r) => {
  const n = r.int(4, 10);
  const k = r.int(2, 4);
  need(k < n);
  const terms = Array.from({ length: k }, (_, i) => n - i);
  const v = terms.reduce((s, x) => s * x, 1);
  const set = n === 10 ? 'cyfr od $0$ do $9$' : `cyfr ze zbioru $\\{1, 2, \\ldots, ${n}\\}$`;
  return mc({
    title: 'Kod o różnych cyfrach',
    q: T`Kod składa się z $${k}$ ${set}, przy czym żadna cyfra się nie powtarza. Liczba wszystkich takich kodów jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [n ** k, n * k, v / (k === 2 ? 2 : k === 3 ? 6 : 24), terms.slice(1).reduce((s, x) => s * x, 1), v + n, fact(k)]),
    steps: [T`Pierwszą cyfrę wybieramy na $${n}$ sposobów, każdą następną – na o jeden mniej (bo cyfry nie mogą się powtarzać).`, T`$${prodStr(terms)} = ${v}$.`],
    trap: T`Bez powtórzeń liczba możliwości maleje z każdą pozycją. Wynik $${n}^{${k}} = ${n ** k}$ dotyczy kodów, w których cyfry MOGĄ się powtarzać.`,
    tip: TIP_MUL
  });
};
const noRepQueue = (r) => {
  const n = r.int(3, 7);
  const ctx = r.pick([`Liczba wszystkich sposobów, na jakie $${n}$ osób może ustawić się w kolejce jedna za drugą, jest równa`, `Liczba wszystkich sposobów ustawienia $${n}$ różnych książek obok siebie na półce jest równa`, `$${n}$ zawodników startuje w biegu, w którym nie ma remisów. Liczba wszystkich możliwych kolejności na mecie jest równa`]);
  const v = fact(n);
  return mc({
    title: 'Ustawienia w kolejności',
    q: ctx,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [n * n, n ** n > 99999 ? v * 2 : n ** n, fact(n - 1), 2 ** n, n * (n - 1), v / 2]),
    steps: [T`Pierwsze miejsce: $${n}$ możliwości, drugie: $${n - 1}$, i tak dalej aż do $1$.`, T`$${prodStr(Array.from({ length: n }, (_, i) => n - i))} = ${v}$.`],
    trap: T`To nie $${n}^2$ ani $${n}^{${n}}$ – każdy element zajmuje dokładnie jedno miejsce, więc możliwości ubywa.`,
    tip: 'Karta wzorów, str. 26: liczba ustawień $n$ różnych elementów w kolejności to $n! = 1 \\cdot 2 \\cdot \\ldots \\cdot n$.'
  });
};
const noRepPodium = (r) => {
  const n = r.int(5, 12);
  const k = r.pick([2, 3]);
  const terms = Array.from({ length: k }, (_, i) => n - i);
  const v = terms.reduce((s, x) => s * x, 1);
  const ctx = k === 3 ? T`W finale startuje $${n}$ zawodników. Liczba wszystkich sposobów przyznania medali: złotego, srebrnego i brązowego (każdy zawodnik może zdobyć najwyżej jeden medal) jest równa` : T`W klasie jest $${n}$ uczniów. Liczba wszystkich sposobów wyboru przewodniczącego i jego zastępcy (to muszą być dwie różne osoby) jest równa`;
  return mc({
    title: k === 3 ? 'Wybór z uwzględnieniem kolejności: podium' : 'Wybór z uwzględnieniem kolejności: dwie funkcje',
    q: ctx,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [n ** k, n * k, v / (k === 2 ? 2 : 6), n + n - 1 + (k === 3 ? n - 2 : 0), terms[0] * terms[1] * (k === 3 ? n : 1) === v ? v + n : terms[0] * terms[1] * (k === 3 ? n : 1), v + n]),
    steps: [k === 3 ? T`Złoty medal: $${n}$ możliwości, srebrny: $${n - 1}$, brązowy: $${n - 2}$.` : T`Przewodniczący: $${n}$ możliwości, zastępca: $${n - 1}$ (ktoś inny).`, T`$${prodStr(terms)} = ${v}$.`],
    trap: k === 3 ? T`Medale są różne (kto inny dostaje złoto, kto inny srebro), więc kolejność wyboru ma znaczenie i wyniku nie dzielimy.` : T`Funkcje są różne: „Ania przewodniczącą, Ola zastępczynią” to inny wybór niż odwrotnie, więc wyniku nie dzielimy przez $2$.`,
    tip: TIP_MUL
  });
};
const noRepCondition = (r) => {
  const n = r.int(4, 7);
  const kind = r.int(0, 1);
  const v = kind === 0 ? fact(n - 1) : 2 * fact(n - 1);
  return mc({
    title: 'Ustawienia z warunkiem',
    q: kind === 0 ? T`$${n}$ osób, wśród nich Ania, ustawia się w kolejce. Liczba wszystkich ustawień, w których Ania stoi na pierwszym miejscu, jest równa` : T`$${n}$ osób, wśród nich Ania i Bartek, ustawia się w kolejce. Liczba wszystkich ustawień, w których Ania i Bartek stoją obok siebie, jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [fact(n), fact(n - 1), 2 * fact(n - 1), fact(n - 2), 2 * fact(n - 2), n * (n - 1), fact(n) / 2]),
    steps: kind === 0 ? [T`Miejsce Ani jest ustalone ($1$ możliwość).`, T`Pozostałe osoby (jest ich $${n - 1}$) ustawiamy dowolnie: $${n - 1}! = ${fact(n - 1)}$.`] : [T`Traktujemy Anię i Bartka jak jedną „podwójną osobę”. Liczba elementów do ustawienia to wtedy $${n - 1}$, co daje $${n - 1}! = ${fact(n - 1)}$ ustawień.`, T`Wewnątrz pary są $2$ kolejności (Ania–Bartek albo Bartek–Ania): $2 \cdot ${fact(n - 1)} = ${v}$.`],
    trap: kind === 0 ? T`Ania ma tylko jedno możliwe miejsce, więc nie mnożymy przez $${n}$.` : T`Nie zapomnij o dwóch kolejnościach wewnątrz pary – bez nich wynik jest dwa razy za mały.`,
    tip: 'Elementy z warunkiem ustaw najpierw, a pozostałe rozmieść na wolnych miejscach.'
  });
};
const noRepNumbersDistinct = (r) => {
  const n = r.int(4, 8);
  const k = r.int(2, 4);
  need(k <= n);
  const terms = Array.from({ length: k }, (_, i) => n - i);
  const v = terms.reduce((s, x) => s * x, 1);
  return mc({
    title: 'Liczby o różnych cyfrach z danego zbioru',
    q: T`Liczba wszystkich liczb naturalnych ${NAMES[k]} o różnych cyfrach, w których zapisie występują tylko cyfry ze zbioru $\{${Array.from({ length: n }, (_, i) => i + 1).join(', ')}\}$, jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [n ** k, n * k, fact(k), v / k, v + n, terms.slice(1).reduce((s, x) => s * x, 1)]),
    steps: [T`Zbiór nie zawiera zera. Pierwsza cyfra: $${n}$ możliwości, każda następna – o jedną mniej.`, T`$${prodStr(terms)} = ${v}$.`],
    trap: T`Cyfry mają być różne, więc nie $${n}^{${k}}$. Każda użyta cyfra „znika” z puli.`,
    tip: TIP_MUL
  });
};

// ---------- 12.5 Pary, dopełnienie i zliczanie przez wypisanie ----------
const pairsMatches = (r) => {
  const n = r.int(4, 14);
  const v = (n * (n - 1)) / 2;
  const ctx = r.pick([`W turnieju bierze udział $${n}$ drużyn. Każda drużyna rozgrywa z każdą inną dokładnie jeden mecz. Liczba wszystkich meczów w tym turnieju jest równa`, `Na spotkaniu było $${n}$ osób i każdy przywitał się z każdym uściskiem dłoni. Liczba wszystkich uścisków dłoni jest równa`, `Na okręgu zaznaczono $${n}$ różnych punktów. Liczba wszystkich odcinków o końcach w tych punktach jest równa`]);
  return mc({
    title: 'Liczba par',
    q: ctx,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [n * (n - 1), n * n, 2 * n, n * (n + 1) / 2, v - n, n * (n - 3) / 2]),
    steps: [T`Każdy z $${n}$ elementów tworzy parę z $${n - 1}$ pozostałymi: $${n} \cdot ${n - 1} = ${n * (n - 1)}$.`, T`Każdą parę policzyliśmy dwa razy (A z B oraz B z A), więc dzielimy przez $2$: $${v}$.`],
    trap: T`Para „A–B” i para „B–A” to ta sama para. Bez dzielenia przez $2$ wynik jest dwa razy za duży.`,
    tip: 'Liczba par (nieuporządkowanych) wybranych spośród $n$ elementów: $\\frac{n(n-1)}{2}$.'
  });
};
const pairsDiagonals = (r) => {
  const n = r.int(5, 15);
  const v = (n * (n - 3)) / 2;
  const names = { 5: 'pięciokąta', 6: 'sześciokąta', 7: 'siedmiokąta', 8: 'ośmiokąta', 9: 'dziewięciokąta', 10: 'dziesięciokąta', 11: 'jedenastokąta', 12: 'dwunastokąta', 13: 'trzynastokąta', 14: 'czternastokąta', 15: 'piętnastokąta' };
  return mc({
    title: 'Liczba przekątnych wielokąta',
    q: T`Liczba wszystkich przekątnych ${names[n]} wypukłego jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [n * (n - 3), (n * (n - 1)) / 2, n * (n - 1), 2 * n, v + n, n - 3]),
    steps: [T`Z każdego wierzchołka wychodzi $${n} - 3 = ${n - 3}$ przekątnych (nie łączymy go z sobą ani z dwoma sąsiadami).`, T`$${n} \cdot ${n - 3} = ${n * (n - 3)}$, ale każdą przekątną policzyliśmy z obu końców: $${n * (n - 3)} : 2 = ${v}$.`],
    trap: T`Boki wielokąta nie są przekątnymi. Liczba $\frac{n(n-1)}{2} = ${(n * (n - 1)) / 2}$ to wszystkie odcinki łączące wierzchołki – razem z bokami.`,
    tip: 'Karta wzorów, str. 14: liczba przekątnych $n$-kąta wypukłego to $\\frac{n(n-3)}{2}$.'
  });
};
const complementDigit = (r) => {
  const k = r.int(2, 4);
  const digit = r.pick([0, 5, 7]);
  const total = 9 * 10 ** (k - 1);
  const without = digit === 0 ? 9 ** k : 8 * 9 ** (k - 1);
  const v = total - without;
  return mc({
    title: 'Zliczanie przez dopełnienie',
    q: T`Liczba wszystkich liczb naturalnych ${NAMES[k]}, w których zapisie dziesiętnym cyfra $${digit}$ występuje co najmniej jeden raz, jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [without, total, k * 10 ** (k - 1), total / 10, v + 9, 10 ** (k - 1)]),
    steps: [T`Wszystkich liczb ${NAMES[k]} jest $${total}$.`, digit === 0 ? T`Liczby bez cyfry $0$: na każdej pozycji $9$ możliwości, czyli $9^{${k}} = ${without}$.` : T`Liczby bez cyfry $${digit}$: pierwsza cyfra na $8$ sposobów (bez $0$ i bez $${digit}$), każda następna na $9$: $${prodStr([8, ...Array(k - 1).fill(9)])} = ${without}$.`, T`Szukana liczba: $${total} - ${without} = ${v}$.`],
    trap: T`„Co najmniej jeden raz” liczymy od końca: wszystkie minus te, w których cyfra nie występuje ani razu.`,
    tip: 'Sformułowanie „co najmniej jeden” to sygnał, żeby policzyć przypadek przeciwny („ani jeden”) i odjąć go od wszystkich.'
  });
};
const complementRepeat = (r) => {
  const n = r.pick([4, 5, 6, 10]);
  const k = r.int(2, 3);
  const total = n ** k;
  const distinct = Array.from({ length: k }, (_, i) => n - i).reduce((s, x) => s * x, 1);
  const v = total - distinct;
  return mc({
    title: 'Kody z powtórzoną cyfrą',
    q: T`Kod składa się z $${k}$ cyfr wybranych spośród $${n}$ różnych cyfr (cyfry mogą się powtarzać). Liczba wszystkich kodów, w których co najmniej jedna cyfra się powtarza, jest równa`,
    ok: m(v),
    val: v,
    bad: uniqNums(v, [distinct, total, n, n * k, v + n, total - n]),
    steps: [T`Wszystkich kodów: $${n}^{${k}} = ${total}$.`, T`Kodów o różnych cyfrach: $${prodStr(Array.from({ length: k }, (_, i) => n - i))} = ${distinct}$.`, T`Kody z powtórzeniem: $${total} - ${distinct} = ${v}$.`],
    trap: T`Kody z powtórzeniem to nie tylko te, w których wszystkie cyfry są jednakowe – wystarczy jedna para takich samych cyfr.`,
    tip: 'Sformułowanie „co najmniej jeden” to sygnał, żeby policzyć przypadek przeciwny („ani jeden”) i odjąć go od wszystkich.'
  });
};
const pairsCondition = (r) => {
  const a = r.int(3, 7);
  const b = r.int(3, 8);
  const conds = [
    ['a < b', (x, y) => x < y, 'pierwsza liczba jest mniejsza od drugiej'],
    ['a + b', null, null],
    ['a = b', (x, y) => x === y, 'obie liczby są równe'],
    ['parz', (x, y) => (x * y) % 2 === 0, 'iloczyn liczb jest parzysty'],
    ['sumparz', (x, y) => (x + y) % 2 === 0, 'suma liczb jest parzysta']
  ];
  const [key, fn, desc] = r.pick(conds.filter((c) => c[1]));
  let cnt = 0;
  const ex = [];
  for (let x = 1; x <= a; x++) for (let y = 1; y <= b; y++) if (fn(x, y)) { cnt++; if (ex.length < 4) ex.push(`(${x}, ${y})`); }
  need(cnt > 0 && cnt < a * b);
  return mc({
    title: 'Pary liczb spełniające warunek',
    q: T`Ze zbioru $\{1, 2, \ldots, ${a}\}$ wybieramy jedną liczbę, a następnie ze zbioru $\{1, 2, \ldots, ${b}\}$ wybieramy drugą liczbę. Liczba wszystkich par, w których ${desc}, jest równa`,
    ok: m(cnt),
    val: cnt,
    bad: uniqNums(cnt, [a * b, a * b - cnt, cnt + 1, cnt - 1, a + b, Math.min(a, b), cnt + a]),
    steps: [T`Wszystkich par jest $${a} \cdot ${b} = ${a * b}$.`, key === 'parz' ? T`Łatwiej policzyć pary o iloczynie nieparzystym (obie liczby nieparzyste): $${Math.ceil(a / 2)} \cdot ${Math.ceil(b / 2)} = ${a * b - cnt}$, więc szukanych par jest $${a * b} - ${a * b - cnt} = ${cnt}$.` : T`Wypisujemy lub zliczamy systematycznie pary spełniające warunek, np. $${ex.join(', ')}, \ldots$ – jest ich $${cnt}$.`],
    trap: T`Liczy się kolejność: pierwsza liczba pochodzi z pierwszego zbioru, druga z drugiego. Zliczaj systematycznie, np. według pierwszej liczby.`,
    tip: 'Gdy warunek jest nietypowy, wypisz pary w tabelce – to pewniejsze niż szukanie wzoru.'
  });
};

export default {
  numericId: 12,
  title: 'Kombinatoryka',
  short_title: 'Kombinatoryka',
  description: 'Reguła mnożenia i dodawania, liczby o zadanych własnościach, ustawienia bez powtórzeń i zliczanie przez dopełnienie.',
  icon: 'Dices',
  color: '#FACC15',
  matura_points_range: '1–3 pkt',
  importance: 'HIGH',
  cke_formula_page: 'str. 26',
  lessons: [
    {
      title: 'Reguła mnożenia',
      short_title: 'Reguła mnożenia',
      pill: pill({
        essence: T`Jeśli wykonujesz kilka czynności jedna po drugiej i pierwszą możesz wykonać na $n_1$ sposobów, drugą na $n_2$ sposobów, a trzecią na $n_3$ sposobów, to całość wykonasz na $n_1 \cdot n_2 \cdot n_3$ sposobów. Tak liczy się trasy, zestawy, kody i wyniki rzutów. Gdy elementy mogą się powtarzać, liczba możliwości na każdej pozycji jest taka sama i wynik jest potęgą: $n^k$.`,
        context: 'Zadanie 29–30 w arkuszu • 1 pkt. Reguła mnożenia jest też podstawą zadań z prawdopodobieństwa.',
        pl: T`Trzy bluzki i dwie pary spodni to sześć strojów, bo każdą bluzkę możesz założyć do każdych spodni. Słowo-klucz to „i”: wybieram bluzkę I spodnie – mnożę.`,
        steps: [
          ['Podziel zadanie na etapy', T`Kod z trzech cyfr: pierwsza cyfra, druga cyfra, trzecia cyfra.`, 'Każdy etap to jedna decyzja.'],
          ['Policz możliwości w każdym etapie', T`Cyfry mogą się powtarzać: $10$, $10$, $10$.`, 'Sprawdź, czy coś ogranicza wybór.'],
          ['Pomnóż', T`$10 \cdot 10 \cdot 10 = 1000$.`, 'Etapy następują po sobie – mnożenie.']
        ],
        formulas: [
          ['Reguła mnożenia', T`n_1 \cdot n_2 \cdot \ldots \cdot n_k`, 26],
          ['Z powtórzeniami', T`\underbrace{n \cdot n \cdot \ldots \cdot n}_{k} = n^k`],
          ['Rzuty monetą i kostką', T`2^n \quad \text{oraz} \quad 6^n`]
        ],
        examples: [
          ['Trasy', '1 pkt', T`Z A do B prowadzą $3$ drogi, z B do C – $4$ drogi. Ile jest tras z A do C przez B?`, T`1. Dwa etapy: A–B i B–C.` + '\n' + T`2. $3 \cdot 4 = 12$.`, 'Każdą drogę pierwszego etapu łączymy z każdą drugiego.'],
          ['Kod', '1 pkt', T`Ile jest czterocyfrowych kodów PIN?`, T`1. Cztery pozycje, na każdej $10$ cyfr.` + '\n' + T`2. $10^4 = 10\,000$.`, 'W kodzie PIN zero może stać na początku.']
        ],
        trap: T`$3$ pozycje po $10$ możliwości to $10^3$, a NIE $3 \cdot 10$ ani $3^{10}$.`,
        fail: T`„Kod z trzech cyfr: $3 \cdot 10 = 30$ kodów.”`,
        win: T`$10 \cdot 10 \cdot 10 = 1000$ kodów.`,
        why: 'Każdą z 10 pierwszych cyfr można połączyć z każdą z 10 drugich i każdą z 10 trzecich.',
        ckeTip: 'Narysuj kreski oznaczające pozycje (_ _ _) i nad każdą wpisz liczbę możliwości – potem wystarczy pomnożyć.',
        points: [T`Kolejne etapy („i”) – mnożymy.`, T`Powtórzenia dozwolone: $n^k$.`, T`Podstawa potęgi to liczba możliwości, wykładnik – liczba pozycji.`]
      }),
      gens: [mulRoutes, mulCodes, mulMenu, mulDigitsSet, mulExperiments]
    },
    {
      title: 'Reguła dodawania i łączenie obu reguł',
      short_title: 'Reguła dodawania',
      pill: pill({
        essence: T`Regułę dodawania stosujesz, gdy możliwości dzielą się na rozłączne przypadki: wybierasz ALBO z jednej grupy, ALBO z drugiej. Wtedy liczby możliwości dodajesz. W większości zadań obie reguły występują razem: w obrębie jednego przypadku mnożysz kolejne etapy, a wyniki przypadków dodajesz.`,
        context: 'Zadanie 29–30 w arkuszu • 1–2 pkt. Wymagania mówią wprost o stosowaniu reguł mnożenia i dodawania „także łącznie”.',
        pl: T`„I” to mnożenie, „albo” to dodawanie. Biorę zupę I drugie danie – mnożę. Biorę zupę ALBO deser – dodaję. Kiedy zadanie rozpada się na „albo tak, albo tak”, policz każdy wariant osobno i zsumuj.`,
        steps: [
          ['Podziel na przypadki', T`Flaga dwukolorowa ALBO trzykolorowa.`, 'Przypadki nie mogą się pokrywać.'],
          ['Każdy przypadek policz regułą mnożenia', T`$5$ kolorów: $5 \cdot 4 = 20$ oraz $5 \cdot 4 \cdot 3 = 60$.`, 'Kolory się nie powtarzają – możliwości ubywa.'],
          ['Dodaj wyniki', T`$20 + 60 = 80$.`, 'Albo… albo… – dodawanie.']
        ],
        formulas: [
          ['Reguła dodawania', T`n_1 + n_2 \quad \text{(przypadki rozłączne)}`],
          ['Reguła mnożenia', T`n_1 \cdot n_2 \quad \text{(kolejne etapy)}`, 26]
        ],
        examples: [
          ['Trasa bezpośrednia lub przez miasto', '1 pkt', T`Z A do C prowadzą $2$ drogi bezpośrednie. Można też jechać przez B: z A do B są $3$ drogi, z B do C – $4$. Ile jest tras?`, T`1. Przez B: $3 \cdot 4 = 12$.` + '\n' + T`2. Razem: $2 + 12 = 14$.`, 'Bezpośrednio ALBO przez B.'],
          ['Liczby krótsze i dłuższe', '1 pkt', T`Ile jest liczb naturalnych dodatnich mniejszych od $100$ zapisanych tylko cyframi $1, 2, 3$?`, T`1. Jednocyfrowe: $3$.` + '\n' + T`2. Dwucyfrowe: $3 \cdot 3 = 9$.` + '\n' + T`3. Razem: $12$.`, 'Dwa przypadki ze względu na liczbę cyfr.']
        ],
        trap: T`Nie mnóż przypadków, które się wykluczają. Flaga nie może być jednocześnie dwu- i trzykolorowa, więc $20 + 60$, a nie $20 \cdot 60$.`,
        fail: T`„Flag dwukolorowych $20$, trzykolorowych $60$, więc razem $20 \cdot 60 = 1200$.”`,
        win: T`$20 + 60 = 80$.`,
        why: 'Mnożenie odpowiadałoby wybraniu jednocześnie jednej flagi dwukolorowej i jednej trzykolorowej.',
        ckeTip: 'Zapisz na marginesie słowa „i” oraz „albo” między etapami – od razu widać, gdzie mnożyć, a gdzie dodawać.',
        points: [T`„Albo” – dodajemy.`, T`„I” – mnożymy.`, T`Przypadki muszą być rozłączne i obejmować wszystkie możliwości.`]
      }),
      gens: [addDirectOrVia, addOneOf, addFlags, addUpToDigits, addPasswordFormats]
    },
    {
      title: 'Liczby o zadanych własnościach',
      short_title: 'Zliczanie liczb',
      time: '~6 min',
      pill: pill({
        essence: T`W zadaniach typu „ile jest liczb trzycyfrowych, które…” liczysz możliwości dla każdej cyfry osobno i mnożysz. Dwie pozycje wymagają uwagi: pierwsza cyfra nie może być zerem (dlatego ma $9$ możliwości, a nie $10$), a ostatnia decyduje o parzystości i podzielności przez $5$ lub $10$. Zaczynaj zawsze od pozycji, na które nałożono warunek.`,
        context: 'Zadanie 29–30 w arkuszu • 1 pkt, a w wersji otwartej 2 pkt. To najczęstszy typ zadania z kombinatoryki.',
        pl: T`Liczba trzycyfrowa to trzy okienka. W pierwszym okienku nie wolno wpisać zera, bo wyszłaby liczba dwucyfrowa. W ostatnim wpisujesz to, co wymusza warunek: parzysta – jedna z pięciu cyfr $0, 2, 4, 6, 8$.`,
        steps: [
          ['Narysuj okienka', T`Liczba trzycyfrowa: _ _ _.`, 'Jedno okienko na każdą cyfrę.'],
          ['Wypełnij okienka z warunkami', T`Parzysta: ostatnie okienko $5$ możliwości. Pierwsze: $9$ (bez zera).`, 'Najpierw pozycje z ograniczeniami.'],
          ['Wypełnij resztę i pomnóż', T`Środkowe: $10$. Razem: $9 \cdot 10 \cdot 5 = 450$.`, 'Reguła mnożenia.']
        ],
        formulas: [
          ['Wszystkie liczby k-cyfrowe', T`9 \cdot 10^{k-1}`],
          ['Liczby parzyste k-cyfrowe', T`9 \cdot 10^{k-2} \cdot 5`],
          ['Liczby k-cyfrowe o różnych cyfrach (k = 3)', T`9 \cdot 9 \cdot 8 = 648`]
        ],
        examples: [
          ['Różne cyfry', '1 pkt', T`Ile jest liczb trzycyfrowych o różnych cyfrach?`, T`1. Pierwsza cyfra: $9$ (bez zera).` + '\n' + T`2. Druga: $9$ (dowolna poza pierwszą – zero już wolno).` + '\n' + T`3. Trzecia: $8$. Razem: $648$.`, 'Na drugiej pozycji jest znów 9 możliwości.'],
          ['Same cyfry parzyste', '1 pkt', T`Ile jest liczb dwucyfrowych zapisanych tylko cyframi parzystymi?`, T`1. Pierwsza cyfra: $2, 4, 6, 8$ – cztery możliwości.` + '\n' + T`2. Druga: $0, 2, 4, 6, 8$ – pięć.` + '\n' + T`3. $4 \cdot 5 = 20$.`, 'Zero jest parzyste, ale nie może być pierwsze.']
        ],
        trap: T`Pierwsza cyfra liczby nie może być zerem. Liczb trzycyfrowych jest $9 \cdot 10 \cdot 10 = 900$, a nie $1000$.`,
        fail: T`„Liczb trzycyfrowych parzystych jest $10 \cdot 10 \cdot 5 = 500$.”`,
        win: T`$9 \cdot 10 \cdot 5 = 450$.`,
        why: 'Zapis 047 to liczba dwucyfrowa 47, więc zero na początku nie daje liczby trzycyfrowej.',
        ckeTip: 'Szybka kontrola: liczb parzystych i nieparzystych danej długości jest tyle samo, czyli po połowie wszystkich.',
        points: [T`Pierwsza cyfra: $9$ możliwości (bez zera).`, T`Parzystość i podzielność przez $5$: ostatnia cyfra.`, T`Zero jest cyfrą parzystą.`]
      }),
      gens: [numProperty, numFromSetParity, numFirstLast, numGreaterThan]
    },
    {
      title: 'Ustawienia i wybory bez powtórzeń',
      short_title: 'Bez powtórzeń',
      pill: pill({
        essence: T`Gdy elementy nie mogą się powtarzać, każdy wybór zmniejsza pulę o jeden: pierwszy element wybierasz na $n$ sposobów, drugi na $n - 1$, trzeci na $n - 2$ i tak dalej. Ustawienie wszystkich $n$ różnych elementów w kolejności daje $n \cdot (n - 1) \cdot \ldots \cdot 1 = n!$ możliwości. To wciąż reguła mnożenia – tylko liczby możliwości maleją.`,
        context: 'Zadanie 29–30 w arkuszu • 1 pkt. Typowe konteksty: kody PIN, kolejki, podium, wybór przewodniczącego i zastępcy.',
        pl: T`Rozdajesz medale ośmiu zawodnikom. Złoto może dostać każdy z ośmiu. Srebro – już tylko jeden z siedmiu, bo mistrz nie stanie na dwóch stopniach naraz. Brąz – jeden z sześciu. $8 \cdot 7 \cdot 6$.`,
        steps: [
          ['Sprawdź, czy powtórzenia są dozwolone', T`„Różne cyfry”, „każdy inny”, „najwyżej jeden medal” – bez powtórzeń.`, 'To zmienia cały rachunek.'],
          ['Zmniejszaj pulę', T`$10$ cyfr, kod trzycyfrowy bez powtórzeń: $10$, $9$, $8$.`, 'Każda użyta cyfra znika.'],
          ['Pomnóż', T`$10 \cdot 9 \cdot 8 = 720$.`, 'Dla porównania: z powtórzeniami byłoby 1000.']
        ],
        formulas: [
          ['Bez powtórzeń (k elementów z n)', T`n \cdot (n-1) \cdot \ldots \cdot (n-k+1)`],
          ['Wszystkie ustawienia n elementów', T`n! = 1 \cdot 2 \cdot \ldots \cdot n`, 26],
          ['Wartości silni', T`3! = 6, \quad 4! = 24, \quad 5! = 120, \quad 6! = 720`]
        ],
        examples: [
          ['Kolejka', '1 pkt', T`Na ile sposobów $5$ osób może ustawić się w kolejce?`, T`1. $5 \cdot 4 \cdot 3 \cdot 2 \cdot 1$.` + '\n' + T`2. $= 120$.`, 'Każda osoba zajmuje jedno miejsce.'],
          ['Para obok siebie', '2 pkt', T`Na ile sposobów $5$ osób może ustawić się w kolejce tak, by Ania i Bartek stali obok siebie?`, T`1. Parę traktujemy jak jeden element: $4! = 24$ ustawienia.` + '\n' + T`2. W parze są $2$ kolejności: $2 \cdot 24 = 48$.`, 'Sklejamy parę, a potem pamiętamy o jej dwóch ustawieniach.']
        ],
        trap: T`„Różne cyfry” oznacza $10 \cdot 9 \cdot 8$, a NIE $10^3$. Każda kolejna pozycja ma o jedną możliwość mniej.`,
        fail: T`„Trzycyfrowy kod o różnych cyfrach: $10 \cdot 10 \cdot 10 = 1000$.”`,
        win: T`$10 \cdot 9 \cdot 8 = 720$.`,
        why: 'Cyfra użyta na pierwszej pozycji nie może pojawić się na drugiej, więc zostaje 9 możliwości.',
        ckeTip: 'W treści zadania podkreśl słowa „różne”, „bez powtórzeń”, „mogą się powtarzać” – od nich zależy cały rachunek.',
        points: [T`Bez powtórzeń: $n$, $n - 1$, $n - 2$, …`, T`Wszystkie ustawienia $n$ elementów: $n!$.`, T`Elementy z warunkiem ustawiaj jako pierwsze.`]
      }),
      gens: [noRepPin, noRepQueue, noRepPodium, noRepCondition, noRepNumbersDistinct]
    },
    {
      title: 'Pary, dopełnienie i zliczanie przez wypisanie',
      short_title: 'Pary i dopełnienie',
      pill: pill({
        essence: T`Trzy sprytne techniki zliczania. Po pierwsze: gdy kolejność w parze nie ma znaczenia (mecz, uścisk dłoni, odcinek), wynik reguły mnożenia dzielisz przez $2$: $\frac{n(n-1)}{2}$. Po drugie: sformułowanie „co najmniej jeden” najłatwiej policzyć przez dopełnienie – od wszystkich możliwości odejmujesz te, w których „nie ma ani jednego”. Po trzecie: gdy warunek jest nietypowy, wypisz możliwości systematycznie, np. w tabeli.`,
        context: 'Zadanie 29–30 w arkuszu • 1–2 pkt. Dopełnienie wraca w rachunku prawdopodobieństwa jako zdarzenie przeciwne.',
        pl: T`Mecz „Polska–Niemcy” i „Niemcy–Polska” to ten sam mecz, więc licząc $n \cdot (n-1)$, każdy mecz policzyłeś dwa razy – stąd dzielenie przez $2$. A „co najmniej jedna piątka” to wszystko oprócz „ani jednej piątki” – ten drugi przypadek liczy się dużo łatwiej.`,
        steps: [
          ['Sprawdź, czy kolejność ma znaczenie', T`Mecz, uścisk, odcinek – nie ma. Podium, kod, kolejka – ma.`, 'Brak kolejności w parze – dzielenie przez 2.'],
          ['„Co najmniej jeden”? Licz od końca', T`Wszystkie minus „ani jeden”.`, 'Przypadek przeciwny jest prostszy.'],
          ['Nietypowy warunek? Wypisz', T`Pary $(a, b)$ o sumie $7$: $(1,6), (2,5), (3,4), \ldots$`, 'Zliczaj systematycznie, żeby nic nie zgubić.']
        ],
        formulas: [
          ['Liczba par', T`\frac{n(n-1)}{2}`],
          ['Przekątne n-kąta', T`\frac{n(n-3)}{2}`, 14],
          ['Dopełnienie', T`\text{co najmniej jeden} = \text{wszystkie} - \text{ani jeden}`]
        ],
        examples: [
          ['Turniej', '1 pkt', T`W turnieju gra $8$ drużyn, każda z każdą jeden mecz. Ile jest meczów?`, T`1. $8 \cdot 7 = 56$ – ale każdy mecz policzony dwa razy.` + '\n' + T`2. $56 : 2 = 28$.`, 'Mecz A–B to ten sam mecz co B–A.'],
          ['Dopełnienie', '2 pkt', T`Ile jest liczb trzycyfrowych, w których cyfra $5$ występuje co najmniej raz?`, T`1. Wszystkich: $900$.` + '\n' + T`2. Bez cyfry $5$: $8 \cdot 9 \cdot 9 = 648$.` + '\n' + T`3. $900 - 648 = 252$.`, 'Liczymy te bez piątki i odejmujemy.']
        ],
        trap: T`Gdy kolejność w parze nie ma znaczenia, trzeba podzielić przez $2$. $8$ drużyn to $28$ meczów, a nie $56$.`,
        fail: T`„Każda z $8$ drużyn gra z $7$ pozostałymi, więc meczów jest $8 \cdot 7 = 56$.”`,
        win: T`$\frac{8 \cdot 7}{2} = 28$.`,
        why: 'W iloczynie 8 · 7 mecz A–B liczy się raz „od strony” A i drugi raz „od strony” B.',
        ckeTip: 'Wynik zawsze warto sprawdzić na małej liczbie: 3 drużyny grają 3 mecze, a wzór daje 3 · 2 : 2 = 3.',
        points: [T`Pary bez kolejności: $\frac{n(n-1)}{2}$.`, T`„Co najmniej jeden” = wszystkie − „ani jeden”.`, T`Przy nietypowym warunku wypisuj systematycznie.`]
      }),
      gens: [pairsMatches, pairsDiagonals, complementDigit, complementRepeat, pairsCondition]
    }
  ]
};
