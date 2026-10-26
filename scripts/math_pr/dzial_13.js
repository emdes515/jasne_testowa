import { T, mc, num, pf, open, pill, fr, m, need } from '../math_pp/lib.js';
import { pickTwo } from './common.js';
import { q, qAdd, qSub, qMul, qDiv, qPow, qVal, qTex, fact, binom } from './rational.js';

const TIP_COMB = 'Karta wzorów, str. 26: $P_n = n!$, $V_n^k = \\frac{n!}{(n-k)!}$, $C_n^k = \\binom{n}{k}$. Kolejność ważna – wariacje; nieważna – kombinacje; powtórzenia – $n^k$.';
const TIP_NEWTON = 'Karta wzorów, str. 26: $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$, $\\binom{n}{k} = \\binom{n}{n-k}$, $\\binom{n}{k} + \\binom{n}{k+1} = \\binom{n+1}{k+1}$.';
const TIP_COND = 'Karta wzorów, str. 28: $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ – liczysz tylko w świecie, w którym zaszło $B$.';
const TIP_TOTAL = 'Karta wzorów, str. 28: $P(A) = P(A|B_1)P(B_1) + P(A|B_2)P(B_2)$; wzór Bayesa: $P(B_1|A) = \\frac{P(A|B_1)P(B_1)}{P(A)}$.';
const TIP_BERN = 'Karta wzorów, str. 28: $P(S_n = k) = \\binom{n}{k}p^k(1-p)^{n-k}$.';

const prodTex = (n, k) => Array.from({ length: k }, (_, i) => n - i).join(' \\cdot ');
const bin = (n, k) => `\\binom{${n}}{${k}}`;
const pTex = (x) => (x[1] === 1 ? `${x[0]}` : `\\left(${qTex(x)}\\right)`);

// ---------- 13.1 Permutacje, wariacje, kombinacje ----------
const countingModel = (r) => {
  const n = r.int(5, 12);
  const k = r.int(2, Math.min(4, n - 2));
  const kind = r.pick(['group', 'ordered', 'repeat']);
  const q1 = {
    group: T`Na ile sposobów można wybrać ${k}-osobową delegację spośród ${n} osób?`,
    ordered: T`Na ile sposobów można rozdać ${k} różne nagrody (każda innej osobie) spośród ${n} uczestników konkursu?`,
    repeat: T`Ile jest ${k}-znakowych kodów utworzonych z ${n} różnych symboli, jeśli symbole mogą się powtarzać?`
  }[kind];
  const ok = { group: bin(n, k), ordered: prodTex(n, k), repeat: `${n}^{${k}}` }[kind];
  return mc({
    title: 'Wybór modelu zliczania',
    q: q1,
    ask: true,
    ok: m(ok),
    bad: [m(bin(n, k)), m(prodTex(n, k)), m(`${n}^{${k}}`), m(`${k}^{${n}}`)].filter((x) => x !== m(ok)),
    steps: [
      kind === 'group' ? 'Kolejność wybranych osób nie ma znaczenia i nikt się nie powtarza – to kombinacje.' : kind === 'ordered' ? 'Nagrody są różne, więc kolejność ma znaczenie, a nikt nie dostaje dwóch – to wariacje bez powtórzeń.' : 'Kolejność znaków ma znaczenie, a symbole mogą się powtarzać – to wariacje z powtórzeniami.',
      T`Liczba sposobów: $${ok}$.`
    ],
    trap: 'Zadaj dwa pytania: czy kolejność ma znaczenie? czy elementy mogą się powtarzać? Odpowiedzi wybierają wzór.',
    tip: TIP_COMB
  });
};

const countingNumbers = (r) => {
  const v = r.int(0, 2);
  if (v === 0) {
    const n1 = r.int(5, 12);
    const n2 = r.int(5, 12);
    const a = r.int(1, 3);
    const b = r.int(1, 3);
    return num({
      title: 'Wybór z dwóch grup',
      q: T`W klasie jest ${n1} dziewcząt i ${n2} chłopców. Na ile sposobów można wybrać ${a} ${a === 1 ? 'dziewczynę' : 'dziewczyny'} i ${b} ${b === 1 ? 'chłopca' : 'chłopców'}? Wpisz liczbę.`,
      ans: binom(n1, a) * binom(n2, b),
      steps: [T`Dziewczęta: $${bin(n1, a)} = ${binom(n1, a)}$, chłopcy: $${bin(n2, b)} = ${binom(n2, b)}$.`, T`Z reguły mnożenia: $${binom(n1, a)} \cdot ${binom(n2, b)} = ${binom(n1, a) * binom(n2, b)}$.`],
      trap: 'Wybory w dwóch grupach są niezależne – liczby MNOŻYSZ, a nie dodajesz.',
      tip: TIP_COMB
    });
  }
  if (v === 1) {
    const n1 = r.int(3, 9);
    const n2 = r.int(4, 9);
    const k = r.int(2, 4);
    need(n2 >= k);
    const ans = binom(n1 + n2, k) - binom(n2, k);
    return num({
      title: 'Co najmniej jeden – dopełnienie',
      q: T`W grupie jest ${n1} dziewcząt i ${n2} chłopców. Na ile sposobów można wybrać ${k}-osobowy zespół, w którym jest co najmniej jedna dziewczyna? Wpisz liczbę.`,
      ans,
      steps: [T`Wszystkich zespołów: $${bin(n1 + n2, k)} = ${binom(n1 + n2, k)}$; zespołów bez dziewcząt: $${bin(n2, k)} = ${binom(n2, k)}$.`, T`$${binom(n1 + n2, k)} - ${binom(n2, k)} = ${ans}$.`],
      trap: '„Co najmniej jeden” najłatwiej policzyć przez zdarzenie przeciwne: wszystkie minus te bez żadnej dziewczyny.',
      tip: TIP_COMB
    });
  }
  const n = r.int(4, 8);
  return num({
    title: 'Ustawienia z warunkiem sąsiedztwa',
    q: T`Na ile sposobów można ustawić ${n} osób w rzędzie tak, aby Ania i Bartek stali obok siebie? Wpisz liczbę.`,
    ans: 2 * fact(n - 1),
    steps: [T`Traktujemy parę Ania–Bartek jako jeden „blok”: ustawiamy $${n - 1}$ obiektów na $${n - 1}! = ${fact(n - 1)}$ sposobów.`, T`W bloku osoby mogą zamienić się miejscami ($2$ sposoby): $2 \cdot ${fact(n - 1)} = ${2 * fact(n - 1)}$.`],
    trap: 'Nie zapomnij, że para wewnątrz bloku może stać w dwóch kolejnościach.',
    tip: TIP_COMB
  });
};

const countingFacts = (r) => {
  const mk = () => {
    const n = r.int(5, 9);
    const k = r.int(2, 4);
    if (r.bool()) {
      const honest = r.bool();
      const val = honest ? binom(n, k) : fact(n) / fact(n - k);
      return [T`Liczba ${k}-elementowych podzbiorów zbioru ${n}-elementowego jest równa $${val}$.`, val === binom(n, k), T`$${bin(n, k)} = ${binom(n, k)}$.`];
    }
    const honest = r.bool();
    const val = honest ? fact(n) : fact(n - 1);
    return [T`Liczba sposobów ustawienia ${n} różnych książek na półce jest równa $${val}$.`, val === fact(n), T`$${n}! = ${fact(n)}$.`];
  };
  return pf({ title: 'Wzory kombinatoryczne', s1: mk(), s2: mk(), trap: 'Podzbiór nie ma kolejności – dlatego dzielisz wariacje przez $k!$.', tip: TIP_COMB });
};

const countDigits = (n, a, b) => {
  let c = 0;
  for (let x = 10 ** (n - 1); x < 10 ** n; x++) {
    const s = String(x);
    let ones = 0;
    let twos = 0;
    for (const ch of s) {
      if (ch === '1') ones++;
      else if (ch === '2') twos++;
    }
    if (ones === a && twos === b) c++;
  }
  return c;
};

const openDigits = (r) => {
  const n = r.pick([5, 6]);
  const a = r.int(1, 3);
  const b = r.int(1, 2);
  const rest = n - a - b;
  need(rest >= 1);
  const all = binom(n, a) * binom(n - a, b) * 8 ** rest;
  const lead0 = binom(n - 1, a) * binom(n - 1 - a, b) * 8 ** (rest - 1);
  const ans = all - lead0;
  need(ans === countDigits(n, a, b));
  const word = (k, one, few) => (k === 1 ? one : few);
  return open({
    title: 'Liczby o zadanych cyfrach',
    q: T`Oblicz, ile jest liczb naturalnych ${n}-cyfrowych, w których zapisie występuje dokładnie ${a} ${word(a, 'cyfra', 'cyfry')} $1$ i dokładnie ${b} ${word(b, 'cyfra', 'cyfry')} $2$.`,
    stages: [
      [1, 'Etap 1', T`Rozmieszczenie cyfr $1$ i $2$ na ${n} miejscach: $${bin(n, a)} \cdot ${bin(n - a, b)}$.`],
      [2, 'Etap 2', T`${rest === 1 ? 'Pozostałe miejsce wypełniamy' : `Pozostałe ${rest} miejsca wypełniamy`} cyframi spoza $\{1, 2\}$: $8^{${rest}}$ sposobów, i odejmujemy ciągi zaczynające się od $0$: $${bin(n - 1, a)} \cdot ${bin(n - 1 - a, b)} \cdot 8^{${rest - 1}}$.`],
      [3, 'Komplet', T`Wynik: $${ans}$.`]
    ],
    steps: [
      T`Wybieramy miejsca dla cyfr $1$: $${bin(n, a)} = ${binom(n, a)}$, potem dla cyfr $2$: $${bin(n - a, b)} = ${binom(n - a, b)}$. Pozostałe miejsca: $8$ możliwych cyfr (bez $1$ i $2$) – razem $${all}$ ciągów.`,
      T`Ciągi z zerem na początku nie są liczbami ${n}-cyfrowymi: $${bin(n - 1, a)} \cdot ${bin(n - 1 - a, b)} \cdot 8^{${rest - 1}} = ${lead0}$.`,
      T`$${all} - ${lead0} = ${ans}$.`
    ],
    trap: 'Cyfra $0$ nie może stać na początku liczby – ciągi zaczynające się od zera trzeba odjąć (albo rozpatrzyć pierwszą cyfrę osobno).',
    tip: TIP_COMB,
    answer: m(`${ans}`)
  });
};

// ---------- 13.2 Symbol Newtona i trójkąt Pascala ----------
const binomValue = (r) => {
  const n = r.int(5, 12);
  const k = r.int(2, n - 2);
  return num({
    title: 'Wartość symbolu Newtona',
    q: T`Oblicz $${bin(n, k)}$. Wpisz liczbę.`,
    ans: binom(n, k),
    steps: [T`$${bin(n, k)} = \frac{${n}!}{${k}! \cdot ${n - k}!}$.`, T`Po skróceniu: $${bin(n, k)} = ${binom(n, k)}$.`],
    trap: T`Skracaj przed mnożeniem – zostaw w liczniku tylko $${Math.max(k, n - k) + 1} \cdot \ldots \cdot ${n}$.`,
    tip: TIP_NEWTON
  });
};

const newtonEquation = (r) => {
  const n = r.int(4, 16);
  const N = binom(n, 2);
  return mc({
    title: 'Równanie z symbolem Newtona',
    q: T`Liczba naturalna $n \ge 2$ spełniająca równanie $\binom{n}{2} = ${N}$ jest równa`,
    ok: m(`${n}`),
    val: n,
    bad: [m(`${n + 1}`), m(`${n - 1}`), m(`${2 * N}`), m(`${n * 2}`)],
    steps: [T`$\binom{n}{2} = \frac{n(n-1)}{2}$, więc $n(n - 1) = ${2 * N}$.`, T`$n^2 - n - ${2 * N} = 0$, a dodatnie rozwiązanie to $n = ${n}$.`],
    trap: T`$\binom{n}{2} = \frac{n(n-1)}{2}$, a nie $\frac{n}{2}$.`,
    tip: TIP_NEWTON
  });
};

const binomialCoefficient = (r) => {
  const n = r.int(3, 7);
  const k = r.int(1, n - 1);
  const a = r.pick([1, 2, 3, -1, -2]);
  const c = binom(n, k) * a ** (n - k);
  return num({
    title: 'Współczynnik w dwumianie Newtona',
    q: T`Oblicz współczynnik przy $x^{${k}}$ w rozwinięciu wyrażenia $(x ${a < 0 ? '-' : '+'} ${Math.abs(a)})^{${n}}$. Wpisz liczbę.`,
    ans: c,
    steps: [T`Wyraz z $x^{${k}}$: $${bin(n, k)}x^{${k}} \cdot (${a})^{${n - k}}$.`, T`Współczynnik: $${binom(n, k)} \cdot ${a < 0 ? `(${a ** (n - k)})` : a ** (n - k)} = ${c}$.`],
    trap: 'Ujemny drugi składnik podnoszony do nieparzystej potęgi daje minus.',
    tip: TIP_NEWTON
  });
};

const NEWTON_FACTS = [
  [T`Dla każdej liczby naturalnej $n \ge 1$: $\binom{n}{1} = 1$.`, false, T`$\binom{n}{1} = n$.`],
  [T`$\binom{n}{k} = \binom{n}{n-k}$ dla $0 \le k \le n$.`, true, 'Wybór $k$ elementów to to samo, co wskazanie $n - k$ pominiętych.'],
  [T`$\binom{n}{k} + \binom{n}{k+1} = \binom{n+1}{k+1}$.`, true, 'To reguła tworzenia trójkąta Pascala.'],
  [T`Suma liczb w wierszu trójkąta Pascala odpowiadającym $(a + b)^n$ jest równa $2^n$.`, true, T`Podstaw $a = b = 1$: $(1 + 1)^n = 2^n$.`],
  [T`Rozwinięcie $(a + b)^n$ ma $n$ wyrazów.`, false, T`Ma $n + 1$ wyrazów.`]
];

const newtonFacts = (r) => {
  const [s1] = pickTwo(r, NEWTON_FACTS);
  const n = r.int(6, 11);
  const k = r.int(2, 4);
  const honest = r.bool();
  const v = honest ? binom(n, k) : binom(n, k) + r.pick([n, -n, k]);
  return pf({ title: 'Własności symbolu Newtona', s1, s2: [T`$${bin(n, k)} = ${v}$.`, v === binom(n, k), T`$${bin(n, k)} = ${binom(n, k)}$.`], trap: T`$\binom{n}{1} = n$ i $\binom{n}{0} = 1$ – nie myl tych dwóch.`, tip: TIP_NEWTON });
};

const NEWTON_PROOFS = [
  {
    q: T`Wykaż, że dla każdej liczby naturalnej $n \ge 2$ zachodzi równość $\binom{n}{2} + \binom{n+1}{2} = n^2$.`,
    stages: [[1, 'Etap 1', T`Zapisanie $\binom{n}{2} = \frac{n(n-1)}{2}$ i $\binom{n+1}{2} = \frac{(n+1)n}{2}$.`], [2, 'Komplet', T`Dodanie: $\frac{n(n - 1 + n + 1)}{2} = n^2$ i wniosek.`]],
    steps: [T`$\binom{n}{2} + \binom{n+1}{2} = \frac{n(n-1)}{2} + \frac{(n+1)n}{2}$.`, T`$= \frac{n(n - 1 + n + 1)}{2} = \frac{2n^2}{2} = n^2$.`],
    thesis: T`$\binom{n}{2} + \binom{n+1}{2} = n^2$`
  },
  {
    q: T`Wykaż, że dla każdej liczby naturalnej $n \ge 2$ zachodzi równość $\binom{2n}{2} = 2\binom{n}{2} + n^2$.`,
    stages: [[1, 'Etap 1', T`Zapisanie $\binom{2n}{2} = n(2n - 1)$ i $2\binom{n}{2} = n(n - 1)$.`], [2, 'Komplet', T`Porównanie: $n(n - 1) + n^2 = 2n^2 - n = n(2n - 1)$ i wniosek.`]],
    steps: [T`$\binom{2n}{2} = \frac{2n(2n-1)}{2} = 2n^2 - n$.`, T`$2\binom{n}{2} + n^2 = n(n-1) + n^2 = 2n^2 - n$ – obie strony są równe.`],
    thesis: T`$\binom{2n}{2} = 2\binom{n}{2} + n^2$`
  },
  {
    q: T`Wykaż, że dla każdej liczby naturalnej $n \ge 2$ zachodzi równość $\binom{n}{1} + \binom{n}{2} = \binom{n+1}{2}$.`,
    stages: [[1, 'Etap 1', T`Zapisanie lewej strony: $n + \frac{n(n-1)}{2}$.`], [2, 'Komplet', T`Przekształcenie do $\frac{n(n+1)}{2} = \binom{n+1}{2}$.`]],
    steps: [T`$\binom{n}{1} + \binom{n}{2} = n + \frac{n(n-1)}{2} = \frac{2n + n^2 - n}{2}$.`, T`$= \frac{n(n+1)}{2} = \binom{n+1}{2}$.`],
    thesis: T`$\binom{n}{1} + \binom{n}{2} = \binom{n+1}{2}$`
  }
];

const openNewton = (r) => {
  if (r.int(0, 2) === 0) {
    const p = r.pick(NEWTON_PROOFS);
    return open({ title: 'Dowód tożsamości z symbolem Newtona', q: p.q, stages: p.stages, steps: p.steps, trap: 'Przekształcaj jedną stronę (albo obie osobno) – nie „przenoś” wyrazów przez znak równości.', tip: TIP_NEWTON, answer: p.thesis, proof: true });
  }
  const n = r.int(3, 20);
  const N = (n * (n + 1)) / 2;
  return open({
    title: 'Równanie z symbolem Newtona',
    q: T`Rozwiąż równanie $\binom{n}{1} + \binom{n}{2} = ${N}$, gdzie $n$ jest liczbą naturalną i $n \ge 2$.`,
    stages: [
      [1, 'Etap 1', T`Rozpisanie symboli: $n + \frac{n(n-1)}{2} = ${N}$.`],
      [2, 'Etap 2', T`Doprowadzenie do równania kwadratowego $n^2 + n - ${2 * N} = 0$.`],
      [3, 'Komplet', T`Rozwiązanie i odrzucenie pierwiastka ujemnego: $n = ${n}$.`]
    ],
    steps: [T`$n + \frac{n(n-1)}{2} = ${N}$, więc $2n + n^2 - n = ${2 * N}$.`, T`$n^2 + n - ${2 * N} = 0$, $\Delta = ${1 + 8 * N} = ${2 * n + 1}^2$.`, T`$n = ${n}$ lub $n = ${-n - 1}$; drugie rozwiązanie odrzucamy ($n$ naturalne).`],
    trap: 'Pierwiastek ujemny trzeba jawnie odrzucić – $n$ jest liczbą naturalną.',
    tip: TIP_NEWTON,
    answer: m(`n = ${n}`)
  });
};

// ---------- 13.3 Prawdopodobieństwo warunkowe ----------
const conditionalTable = (r) => {
  const n1 = r.int(8, 20);
  const n2 = r.int(8, 20);
  const a = r.int(1, n1 - 1);
  const b = r.int(1, n2 - 1);
  const askGirl = r.bool();
  const ok = askGirl ? q(a, n1) : q(a, a + b);
  return mc({
    title: 'Prawdopodobieństwo warunkowe z danych',
    q: T`W grupie jest ${n1} dziewcząt i ${n2} chłopców. Okulary nosi ${a} dziewcząt i ${b} chłopców. Losujemy jedną osobę. Prawdopodobieństwo, że ${askGirl ? 'nosi okulary, pod warunkiem że jest dziewczyną' : 'jest dziewczyną, pod warunkiem że nosi okulary'}, jest równe`,
    ok: m(qTex(ok)),
    val: qVal(ok),
    bad: [m(fr(a, n1 + n2)), m(fr(a + b, n1 + n2)), m(askGirl ? fr(a, a + b) : fr(a, n1)), m(fr(n1, n1 + n2))],
    steps: [askGirl ? T`Warunek: losujemy spośród ${n1} dziewcząt.` : T`Warunek: losujemy spośród ${a + b} osób w okularach.`, T`$P = ${askGirl ? fr(a, n1) : fr(a, a + b)}$.`],
    trap: 'Warunek zmniejsza zbiór, z którego losujesz – w mianowniku jest liczność zdarzenia z warunku, a nie całej grupy.',
    tip: TIP_COND
  });
};

const DICE_EVENTS = [
  ['co najmniej jedna kostka pokazała szóstkę', (a, b) => a === 6 || b === 6],
  ['na pierwszej kostce wypadła liczba parzysta', (a) => a % 2 === 0],
  ['na obu kostkach wypadły różne liczby oczek', (a, b) => a !== b],
  ['na pierwszej kostce wypadło więcej oczek niż na drugiej', (a, b) => a > b]
];

const conditionalDice = (r) => {
  const [desc, B] = r.pick(DICE_EVENTS);
  const s = r.int(4, 11);
  let nb = 0;
  let nab = 0;
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (B(a, b)) { nb++; if (a + b === s) nab++; }
  need(nab > 0);
  const ok = q(nab, nb);
  return mc({
    title: 'Dwie kostki – warunek',
    q: T`Rzucamy dwa razy symetryczną sześcienną kostką. Prawdopodobieństwo, że suma oczek jest równa $${s}$, pod warunkiem że ${desc}, jest równe`,
    ok: m(qTex(ok)),
    val: qVal(ok),
    bad: [m(fr(nab, 36)), m(fr(nb, 36)), m(fr(nab + 1, nb)), m(fr(Math.max(nab - 1, 1) === nab ? nab + 2 : Math.max(nab - 1, 1), nb))],
    steps: [T`Zdarzeń sprzyjających warunkowi jest $${nb}$ (spośród 36).`, T`Wśród nich suma $${s}$ występuje $${nab}$ ${nab === 1 ? 'raz' : 'razy'}: $P = ${qTex(ok)}$.`],
    trap: 'W mianowniku jest liczba wyników spełniających WARUNEK, a nie 36.',
    tip: TIP_COND
  });
};

const conditionalFormula = (r) => {
  const d = r.pick([10, 12, 20]);
  const pa = r.int(2, d - 3);
  const pb = r.int(2, d - 3);
  const pab = r.int(1, Math.min(pa, pb) - 1);
  need(pa + pb - pab <= d);
  const union = pa + pb - pab;
  const ok = q(pab, pb);
  return mc({
    title: 'Prawdopodobieństwo warunkowe ze wzoru',
    q: T`Zdarzenia $A$ i $B$ spełniają: $P(A) = ${fr(pa, d)}$, $P(B) = ${fr(pb, d)}$, $P(A \cup B) = ${fr(union, d)}$. Prawdopodobieństwo $P(A|B)$ jest równe`,
    ok: m(qTex(ok)),
    val: qVal(ok),
    bad: [m(fr(pab, d)), m(fr(pab, pa)), m(fr(pa, pb)), m(fr(union, pb > union ? pb : d))],
    steps: [T`$P(A \cap B) = P(A) + P(B) - P(A \cup B) = ${fr(pab, d)}$.`, T`$P(A|B) = \frac{P(A \cap B)}{P(B)} = \frac{${fr(pab, d)}}{${fr(pb, d)}} = ${qTex(ok)}$.`],
    trap: 'Najpierw wyznacz część wspólną $A \\cap B$ – dopiero ona trafia do licznika.',
    tip: TIP_COND
  });
};

const independenceFacts = (r) => {
  const mk = () => {
    const pa = q(r.int(1, 5), 6);
    const pb = q(r.int(1, 3), 4);
    const honest = r.bool();
    const pab = honest ? qMul(pa, pb) : qAdd(qMul(pa, pb), q(1, 24));
    need(qVal(pab) <= Math.min(qVal(pa), qVal(pb)));
    const indep = qVal(pab) === qVal(qMul(pa, pb));
    return [T`Jeśli $P(A) = ${qTex(pa)}$, $P(B) = ${qTex(pb)}$ i $P(A \cap B) = ${qTex(pab)}$, to zdarzenia $A$ i $B$ są niezależne.`, indep, T`$P(A) \cdot P(B) = ${qTex(qMul(pa, pb))}$${indep ? ' – równe' : ' – różne od'} $P(A \cap B)$.`];
  };
  return pf({ title: 'Niezależność zdarzeń', s1: mk(), s2: mk(), trap: 'Niezależność to równość $P(A \\cap B) = P(A) \\cdot P(B)$, a nie rozłączność zdarzeń.', tip: TIP_COND });
};

const openConditionalUrn = (r) => {
  const b = r.int(2, 7);
  const c = r.int(2, 7);
  const n = b + c;
  let both = 0;
  let atLeast = 0;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (i !== j) { const wi = i < b; const wj = j < b; if (wi && wj) both++; if (wi || wj) atLeast++; }
  const ok = q(both, atLeast);
  need(both === b * (b - 1) && atLeast === n * (n - 1) - c * (c - 1));
  return open({
    title: 'Losowanie bez zwracania z warunkiem',
    q: T`W urnie jest ${b} kul białych i ${c} czarnych. Losujemy kolejno dwie kule bez zwracania. Oblicz prawdopodobieństwo, że obie wylosowane kule są białe, pod warunkiem że co najmniej jedna z nich jest biała.`,
    stages: [
      [1, 'Etap 1', T`$|\Omega| = ${n} \cdot ${n - 1} = ${n * (n - 1)}$ i $|A \cap B| = ${b} \cdot ${b - 1} = ${both}$ (obie białe).`],
      [2, 'Etap 2', T`$|B| = ${n * (n - 1)} - ${c} \cdot ${c - 1} = ${atLeast}$ (co najmniej jedna biała – przez zdarzenie przeciwne).`],
      [3, 'Komplet', T`$P(A|B) = \frac{${both}}{${atLeast}} = ${qTex(ok)}$.`]
    ],
    steps: [
      T`Wyniki to pary uporządkowane: $|\Omega| = ${n * (n - 1)}$. Obie białe: $${b} \cdot ${b - 1} = ${both}$.`,
      T`Co najmniej jedna biała: wszystkie pary minus obie czarne: $${n * (n - 1)} - ${c * (c - 1)} = ${atLeast}$.`,
      T`$P(A|B) = \frac{|A \cap B|}{|B|} = ${qTex(ok)}$.`
    ],
    trap: 'Zdarzenie „obie białe” zawiera się w „co najmniej jedna biała” – dlatego $A \\cap B = A$.',
    tip: TIP_COND,
    answer: m(`P(A|B) = ${qTex(ok)}`)
  });
};

// ---------- 13.4 Prawdopodobieństwo całkowite i Bayes ----------
const urns = (r) => {
  const k = r.int(1, 5);
  const p1 = q(k, 6);
  const [b1, c1, b2, c2] = [r.int(1, 6), r.int(1, 6), r.int(1, 6), r.int(1, 6)];
  need(b1 * (b2 + c2) !== b2 * (b1 + c1));
  const w1 = q(b1, b1 + c1);
  const w2 = q(b2, b2 + c2);
  const total = qAdd(qMul(p1, w1), qMul(qSub([1, 1], p1), w2));
  return { k, p1, b1, c1, b2, c2, w1, w2, total };
};
/** Liczebnik z rzeczownikiem: plural(5, ['kula biała', 'kule białe', 'kul białych']). */
const plural = (n, [one, few, many]) => `${n} ${n === 1 ? one : n >= 2 && n <= 4 ? few : many}`;
const BIALE = ['biała', 'białe', 'białych'];
const CZARNE = ['czarna', 'czarne', 'czarnych'];
const urnStory = ({ k, b1, c1, b2, c2 }) =>
  T`Rzucamy kostką. Jeśli wypadnie co najwyżej ${plural(k, ['oczko', 'oczka', 'oczek'])}, losujemy kulę z urny I (${plural(b1, BIALE)} i ${plural(c1, CZARNE)}), a w przeciwnym razie – z urny II (${plural(b2, BIALE)} i ${plural(c2, CZARNE)}).`;

const totalUrn = (r) => {
  const u = urns(r);
  return mc({
    title: 'Prawdopodobieństwo całkowite',
    q: T`${urnStory(u)} Prawdopodobieństwo wylosowania kuli białej jest równe`,
    ok: m(qTex(u.total)),
    val: qVal(u.total),
    bad: [m(qTex(q(u.b1 + u.b2, u.b1 + u.c1 + u.b2 + u.c2))), m(qTex(qMul(q(1, 2), qAdd(u.w1, u.w2)))), m(qTex(qMul(u.p1, u.w1))), m(qTex(qAdd(u.w1, u.w2)))],
    steps: [T`$P(I) = ${qTex(u.p1)}$, $P(II) = ${qTex(qSub([1, 1], u.p1))}$; $P(B|I) = ${qTex(u.w1)}$, $P(B|II) = ${qTex(u.w2)}$.`, T`$P(B) = ${qTex(u.p1)} \cdot ${qTex(u.w1)} + ${qTex(qSub([1, 1], u.p1))} \cdot ${qTex(u.w2)} = ${qTex(u.total)}$.`],
    trap: 'Urny nie są wybierane z równym prawdopodobieństwem – wagi wyznacza rzut kostką.',
    tip: TIP_TOTAL
  });
};

const factoryDefect = (r) => {
  const pa = r.pick([20, 30, 40, 60, 70, 80]);
  const da = r.int(1, 6);
  const db = r.intNot(1, 6, da);
  const ans = (pa * da + (100 - pa) * db) / 100;
  return num({
    title: 'Wadliwe produkty z dwóch maszyn',
    q: T`Maszyna A wytwarza ${pa}% produktów, a maszyna B – pozostałe. Wśród produktów maszyny A jest ${da}% wadliwych, a maszyny B – ${db}%. Oblicz, ile procent wszystkich produktów stanowią produkty wadliwe. Wpisz liczbę.`.replace(/(\d)%/g, '$1\\%').replace(/\\%/g, ' %'),
    ans,
    steps: [T`$P(W) = ${fr(pa, 100)} \cdot ${fr(da, 100)} + ${fr(100 - pa, 100)} \cdot ${fr(db, 100)}$.`, T`$P(W) = ${fr(pa * da + (100 - pa) * db, 10000)}$, czyli ${String(ans).replace('.', ',')} %.`],
    trap: 'Procent wadliwych z każdej maszyny mnożysz przez UDZIAŁ tej maszyny w produkcji.',
    tip: TIP_TOTAL
  });
};

const bayesFactory = (r) => {
  const pa = r.pick([20, 30, 40, 60, 70, 80]);
  const da = r.int(1, 6);
  const db = r.intNot(1, 6, da);
  const num1 = pa * da;
  const tot = pa * da + (100 - pa) * db;
  const ok = q(num1, tot);
  return mc({
    title: 'Wzór Bayesa',
    q: T`Maszyna A wytwarza ${pa} % produktów, a maszyna B – pozostałe. Wadliwych jest ${da} % produktów maszyny A i ${db} % produktów maszyny B. Wylosowany produkt okazał się wadliwy. Prawdopodobieństwo, że wytworzyła go maszyna A, jest równe`,
    ok: m(qTex(ok)),
    val: qVal(ok),
    bad: [m(fr(pa, 100)), m(fr(da, da + db)), m(fr(num1, 10000)), m(qTex(q((100 - pa) * db, tot)))],
    steps: [T`$P(W) = ${fr(pa, 100)} \cdot ${fr(da, 100)} + ${fr(100 - pa, 100)} \cdot ${fr(db, 100)} = ${fr(tot, 10000)}$.`, T`$P(A|W) = \frac{${fr(num1, 10000)}}{${fr(tot, 10000)}} = ${qTex(ok)}$.`],
    trap: T`$P(A|W)$ to nie $P(W|A)$ – wzór Bayesa „odwraca” warunek i dzieli przez całe $P(W)$.`,
    tip: TIP_TOTAL
  });
};

const totalFacts = (r) => {
  const mk = () => {
    const u = urns(r);
    const honest = r.bool();
    const claimed = honest ? u.total : qMul(q(1, 2), qAdd(u.w1, u.w2));
    need(honest || qVal(claimed) !== qVal(u.total));
    return [T`${urnStory(u)} Prawdopodobieństwo wylosowania kuli białej jest równe $${qTex(claimed)}$.`, honest, T`$P(B) = ${qTex(u.total)}$.`];
  };
  return pf({ title: 'Prawdopodobieństwo całkowite', s1: mk(), s2: mk(), trap: 'Średnia z dwóch urn jest poprawna tylko przy równych szansach wyboru urny.', tip: TIP_TOTAL });
};

const openBayes = (r) => {
  const u = urns(r);
  const post = qDiv(qMul(u.p1, u.w1), u.total);
  return open({
    title: 'Prawdopodobieństwo całkowite i wzór Bayesa',
    q: T`${urnStory(u)} Oblicz prawdopodobieństwo wylosowania kuli białej oraz prawdopodobieństwo, że losowano z urny I, jeśli wylosowana kula jest biała.`,
    stages: [
      [1, 'Etap 1', T`Prawdopodobieństwa wyboru urn: $P(I) = ${qTex(u.p1)}$, $P(II) = ${qTex(qSub([1, 1], u.p1))}$.`],
      [2, 'Etap 2', T`Prawdopodobieństwa warunkowe: $P(B|I) = ${qTex(u.w1)}$, $P(B|II) = ${qTex(u.w2)}$.`],
      [3, 'Etap 3', T`Twierdzenie o prawdopodobieństwie całkowitym: $P(B) = ${qTex(u.total)}$.`],
      [4, 'Komplet', T`Wzór Bayesa: $P(I|B) = ${qTex(post)}$.`]
    ],
    steps: [
      T`$P(I) = ${qTex(u.p1)}$, $P(II) = ${qTex(qSub([1, 1], u.p1))}$, $P(B|I) = ${qTex(u.w1)}$, $P(B|II) = ${qTex(u.w2)}$.`,
      T`$P(B) = ${qTex(u.p1)} \cdot ${qTex(u.w1)} + ${qTex(qSub([1, 1], u.p1))} \cdot ${qTex(u.w2)} = ${qTex(u.total)}$.`,
      T`$P(I|B) = \frac{${qTex(qMul(u.p1, u.w1))}}{${qTex(u.total)}} = ${qTex(post)}$.`
    ],
    trap: 'Rysunek drzewa porządkuje rachunek: gałęzie mnożysz, końcowe wyniki sprzyjające dodajesz.',
    tip: TIP_TOTAL,
    answer: m(T`P(B) = ${qTex(u.total)}, \ P(I|B) = ${qTex(post)}`)
  });
};

// ---------- 13.5 Schemat Bernoullego ----------
const TRIALS = [
  [q(1, 6), (n) => T`Rzucamy ${n} razy symetryczną kostką sześcienną. Sukcesem jest wyrzucenie szóstki.`],
  [q(1, 2), (n) => T`Rzucamy ${n} razy symetryczną monetą. Sukcesem jest wyrzucenie orła.`],
  [q(1, 3), (n) => T`Rzucamy ${n} razy symetryczną kostką sześcienną. Sukcesem jest wyrzucenie liczby oczek podzielnej przez $3$.`],
  [q(1, 4), (n) => T`Uczeń zgaduje odpowiedzi w ${n} zadaniach testowych; w każdym jest jedna poprawna odpowiedź spośród czterech. Sukcesem jest trafienie.`],
  [q(2, 3), (n) => T`Strzelec oddaje ${plural(n, ['strzał', 'strzały', 'strzałów'])}, a w każdym trafia z prawdopodobieństwem $\frac{2}{3}$. Sukcesem jest trafienie.`]
];
const bern = (n, k, p) => qMul(q(binom(n, k)), qMul(qPow(p, k), qPow(qSub([1, 1], p), n - k)));

const bernoulliExact = (r) => {
  const [p, story] = r.pick(TRIALS);
  const n = r.int(3, 6);
  const k = r.int(1, n - 1);
  const ok = bern(n, k, p);
  const qq = qSub([1, 1], p);
  return mc({
    title: 'Dokładnie k sukcesów',
    q: T`${story(n)} Prawdopodobieństwo uzyskania dokładnie ${k} ${k === 1 ? 'sukcesu' : 'sukcesów'} jest równe`,
    ok: m(qTex(ok)),
    val: qVal(ok),
    bad: [m(qTex(qMul(qPow(p, k), qPow(qq, n - k)))), m(qTex(qPow(p, k))), m(qTex(q(k, n))), m(qTex(bern(n, Math.min(k + 1, n), p)))],
    steps: [T`Schemat Bernoullego: $n = ${n}$, $p = ${qTex(p)}$, $k = ${k}$.`, T`$P = ${bin(n, k)} \cdot ${pTex(p)}^{${k}} \cdot ${pTex(qq)}^{${n - k}} = ${qTex(ok)}$.`],
    trap: T`Nie zapomnij o $\binom{n}{k}$ – sukcesy mogą wystąpić w różnych próbach.`,
    tip: TIP_BERN
  });
};

const bernoulliAtLeastOne = (r) => {
  const [p, story] = r.pick(TRIALS);
  const n = r.int(2, 5);
  const qq = qSub([1, 1], p);
  const ok = qSub([1, 1], qPow(qq, n));
  return mc({
    title: 'Co najmniej jeden sukces',
    q: T`${story(n)} Prawdopodobieństwo uzyskania co najmniej jednego sukcesu jest równe`,
    ok: m(qTex(ok)),
    val: qVal(ok),
    bad: [m(qTex(qPow(qq, n))), m(qTex(qMul(q(n), p)[0] < qMul(q(n), p)[1] ? qMul(q(n), p) : qPow(p, n))), m(qTex(bern(n, 1, p))), m(qTex(qSub([1, 1], qPow(p, n))))],
    steps: [T`Zdarzenie przeciwne: same porażki, $P = ${pTex(qq)}^{${n}} = ${qTex(qPow(qq, n))}$.`, T`$P = 1 - ${qTex(qPow(qq, n))} = ${qTex(ok)}$.`],
    trap: '„Co najmniej jeden” to $1$ minus prawdopodobieństwo samych porażek.',
    tip: TIP_BERN
  });
};

const bernoulliRounded = (r) => {
  const n = r.int(4, 9);
  const k = r.int(1, n - 1);
  const v = binom(n, k) / 2 ** n;
  const ans = Math.round(v * 100) / 100;
  need(Math.abs(v * 100 - Math.round(v * 100)) > 1e-9 || true);
  return num({
    title: 'Monety – wynik przybliżony',
    q: T`Rzucamy ${n} razy symetryczną monetą. Oblicz prawdopodobieństwo wyrzucenia dokładnie ${k} ${k === 1 ? 'orła' : 'orłów'}. Wynik podaj w zaokrągleniu do $0{,}01$. Wpisz liczbę.`,
    ans,
    steps: [T`$P = ${bin(n, k)} \cdot \left(\frac{1}{2}\right)^{${n}} = \frac{${binom(n, k)}}{${2 ** n}}$.`, T`$\frac{${binom(n, k)}}{${2 ** n}} \approx ${String(ans).replace('.', '{,}')}$.`],
    trap: T`Przy monecie $p = 1 - p = \frac{1}{2}$, więc liczysz po prostu $\frac{\binom{n}{k}}{2^n}$.`,
    tip: TIP_BERN
  });
};

const bernoulliFacts = (r) => {
  const mk = () => {
    const [p, story] = r.pick(TRIALS.slice(0, 3));
    const n = r.int(2, 4);
    const k = r.int(1, n);
    const honest = r.bool();
    const claimed = honest ? bern(n, k, p) : qMul(qPow(p, k), qPow(qSub([1, 1], p), n - k));
    const truth = qVal(claimed) === qVal(bern(n, k, p));
    return [T`${story(n)} Prawdopodobieństwo dokładnie ${k} ${k === 1 ? 'sukcesu' : 'sukcesów'} jest równe $${qTex(claimed)}$.`, truth, T`$${bin(n, k)} \cdot ${pTex(p)}^{${k}} \cdot ${pTex(qSub([1, 1], p))}^{${n - k}} = ${qTex(bern(n, k, p))}$.`];
  };
  return pf({ title: 'Schemat Bernoullego', s1: mk(), s2: mk(), trap: T`Brak czynnika $\binom{n}{k}$ to najczęstszy błąd.`, tip: TIP_BERN });
};

const openBernoulli = (r) => {
  const [p, story] = r.pick(TRIALS);
  const n = r.int(4, 6);
  const k = n - 1;
  const a = bern(n, k, p);
  const b = bern(n, n, p);
  const ok = qAdd(a, b);
  return open({
    title: 'Co najmniej n − 1 sukcesów',
    q: T`${story(n)} Oblicz prawdopodobieństwo uzyskania co najmniej ${k} sukcesów.`,
    stages: [
      [1, 'Etap 1', T`Rozpoznanie schematu Bernoullego: $n = ${n}$, $p = ${qTex(p)}$; zdarzenie to ${k} lub ${n} sukcesów.`],
      [2, 'Etap 2', T`$P(S_{${n}} = ${k}) = ${qTex(a)}$.`],
      [3, 'Etap 3', T`$P(S_{${n}} = ${n}) = ${qTex(b)}$.`],
      [4, 'Komplet', T`Suma: $${qTex(ok)}$.`]
    ],
    steps: [
      T`„Co najmniej ${k}” oznacza ${k} albo ${n} sukcesów – te zdarzenia są rozłączne.`,
      T`$P(S_{${n}} = ${k}) = ${bin(n, k)} \cdot ${pTex(p)}^{${k}} \cdot ${pTex(qSub([1, 1], p))} = ${qTex(a)}$, $P(S_{${n}} = ${n}) = ${pTex(p)}^{${n}} = ${qTex(b)}$.`,
      T`$P = ${qTex(a)} + ${qTex(b)} = ${qTex(ok)}$.`
    ],
    trap: '„Co najmniej” obejmuje też maksymalną liczbę sukcesów – nie zapomnij jej dodać.',
    tip: TIP_BERN,
    answer: m(`P = ${qTex(ok)}`)
  });
};

export default {
  numericId: 13,
  title: 'Kombinatoryka i prawdopodobieństwo',
  short_title: 'Kombinatoryka i prawdopodobieństwo',
  description: 'Permutacje, wariacje, kombinacje, symbol Newtona, prawdopodobieństwo warunkowe i całkowite, wzór Bayesa i schemat Bernoullego.',
  icon: 'PieChart',
  color: '#FFB800',
  matura_points_range: '3–5 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 26–28',
  cke_stats: 'W 11 z 11 arkuszy CKE 2022–2026, średnio 4,4 pkt na arkusz (prawdopodobieństwo 3,2 pkt, kombinatoryka 1,2 pkt).',
  lessons: [
    {
      title: 'Permutacje, wariacje i kombinacje',
      short_title: 'Zliczanie',
      requirements: ['XI.R1'],
      prereq: ['math-lesson-12-4'],
      pill: pill({
        essence: T`Zliczając, zadaj dwa pytania: czy kolejność ma znaczenie i czy elementy mogą się powtarzać. Kolejność ważna, bez powtórzeń – wariacje $\frac{n!}{(n-k)!}$; z powtórzeniami – $n^k$; kolejność nieważna – kombinacje $\binom{n}{k}$. Ustawienie wszystkich – permutacje $n!$.`,
        context: 'Kombinatoryka (XI.R1) pojawia się w 5 z 11 arkuszy, często jako zadanie z liczbami o zadanych cyfrach za 2–3 pkt.',
        pl: T`Podium (złoto, srebro, brąz) to kolejność – wariacje. Wybór drużyny na wycieczkę to grupa bez kolejności – kombinacje. PIN do telefonu to cyfry z powtórzeniami – $10^4$.`,
        steps: [
          ['Kolejność?', 'Tak – wariacje, nie – kombinacje.', 'Różne role = kolejność.'],
          ['Powtórzenia?', T`Tak – $n^k$.`, 'Kody, rzuty.'],
          ['Warunki', 'Blok, dopełnienie, pierwsza cyfra ≠ 0.', 'Reguła mnożenia.']
        ],
        formulas: [
          ['Permutacje', T`P_n = n!`, 26],
          ['Wariacje', T`V_n^k = \frac{n!}{(n-k)!}`, 26],
          ['Kombinacje', T`C_n^k = \binom{n}{k}`, 26]
        ],
        examples: [
          ['Delegacja', '1 pkt', T`Wybór 3 osób spośród 10.`, T`1. Kolejność nieważna.` + '\n' + T`2. $\binom{10}{3} = 120$.`, 'Kombinacje.'],
          ['Cyfry', '2 pkt', T`Ile liczb 5-cyfrowych ma dokładnie dwie cyfry $1$?`, T`1. $\binom{5}{2} \cdot 9^3$ ciągów.` + '\n' + T`2. Minus zaczynające się od $0$: $\binom{4}{2} \cdot 9^2$.`, 'Zero z przodu odpada.']
        ],
        trap: 'Liczba nie może zaczynać się od zera – ciągi z zerem na początku trzeba odjąć albo rozpatrzyć pierwszą cyfrę osobno.',
        fail: T`„Liczb 5-cyfrowych z dwiema jedynkami jest $\binom{5}{2} \cdot 9^3$.”`,
        win: T`$\binom{5}{2} \cdot 9^3 - \binom{4}{2} \cdot 9^2$.`,
        why: 'Ciąg 01xxx nie jest liczbą pięciocyfrową.',
        ckeTip: 'Opisz słowami, co liczysz w każdym czynniku – egzaminator punktuje poprawny model, nawet przy błędzie rachunkowym.',
        points: ['Kolejność i powtórzenia wybierają wzór.', 'Reguła mnożenia łączy etapy.', 'Pierwsza cyfra ≠ 0.']
      }),
      gens: [countingModel, countingNumbers, countingFacts, countingNumbers, openDigits]
    },
    {
      title: 'Symbol Newtona i trójkąt Pascala',
      short_title: 'Symbol Newtona',
      requirements: ['XI.R2', 'II.R4'],
      prereq: ['math-lesson-12-4'],
      pill: pill({
        essence: T`Symbol Newtona $\binom{n}{k} = \frac{n!}{k!(n-k)!}$ to liczba $k$-elementowych podzbiorów zbioru $n$-elementowego. Spełnia $\binom{n}{k} = \binom{n}{n-k}$ i $\binom{n}{k} + \binom{n}{k+1} = \binom{n+1}{k+1}$ – to reguła trójkąta Pascala. Liczby z trójkąta są współczynnikami rozwinięcia $(a + b)^n$.`,
        context: 'Symbol Newtona (XI.R2, II.R4) pojawia się w równaniach, dowodach tożsamości i jako narzędzie w schemacie Bernoullego.',
        pl: T`W trójkącie Pascala każda liczba to suma dwóch liczb nad nią. Wiersz $1, 3, 3, 1$ daje $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.`,
        steps: [
          ['Rozpisz', T`$\binom{n}{2} = \frac{n(n-1)}{2}$.`, 'Skracaj silnie.'],
          ['Równanie', 'Doprowadź do kwadratowego.', 'n naturalne.'],
          ['Dwumian', T`Wyraz: $\binom{n}{k}a^{n-k}b^k$.`, 'Uważaj na znak b.']
        ],
        formulas: [
          ['Symbol Newtona', T`\binom{n}{k} = \frac{n!}{k!(n-k)!}`, 26],
          ['Symetria', T`\binom{n}{k} = \binom{n}{n-k}`, 26],
          ['Pascal', T`\binom{n}{k} + \binom{n}{k+1} = \binom{n+1}{k+1}`, 26]
        ],
        examples: [
          ['Równanie', '2 pkt', T`$\binom{n}{2} = 28$.`, T`1. $n(n-1) = 56$.` + '\n' + T`2. $n = 8$.`, 'Odrzuć ujemne.'],
          ['Współczynnik', '1 pkt', T`Współczynnik przy $x^2$ w $(x + 2)^4$.`, T`1. $\binom{4}{2} \cdot 2^2$.` + '\n' + T`2. $24$.`, 'Potęga drugiego składnika.']
        ],
        trap: T`$\binom{n}{1} = n$, a $\binom{n}{0} = 1$. Pomylenie ich psuje równania z symbolem Newtona.`,
        fail: T`„$\binom{n}{1} + \binom{n}{2} = 1 + \frac{n(n-1)}{2}$.”`,
        win: T`$\binom{n}{1} + \binom{n}{2} = n + \frac{n(n-1)}{2}$.`,
        why: 'Jeden element z n wybierasz na n sposobów.',
        ckeTip: 'W równaniu z symbolem Newtona zapisz założenie o $n$ (naturalne, $n \\ge k$) i odrzuć rozwiązania spoza dziedziny.',
        points: ['n(n−1)/2 dla k = 2.', 'Symetria i reguła Pascala.', 'Dwumian: znak drugiego składnika.']
      }),
      gens: [binomValue, newtonEquation, binomialCoefficient, newtonFacts, openNewton]
    },
    {
      title: 'Prawdopodobieństwo warunkowe',
      short_title: 'Warunkowe',
      requirements: ['XII.R1'],
      prereq: ['math-lesson-13-4'],
      pill: pill({
        essence: T`Prawdopodobieństwo warunkowe $P(A|B) = \frac{P(A \cap B)}{P(B)}$ to szansa zdarzenia $A$, gdy wiemy, że zaszło $B$. W modelu klasycznym to $\frac{|A \cap B|}{|B|}$: zbiór możliwych wyników zawęża się do $B$. Zdarzenia są niezależne, gdy $P(A \cap B) = P(A) \cdot P(B)$.`,
        context: 'Prawdopodobieństwo warunkowe (XII.R1) to nowe wymaganie PR od 2025 r. Typowe zadanie: losowanie z warunkiem za 3 pkt.',
        pl: T`Ktoś mówi ci: „suma oczek jest parzysta”. Od tej chwili liczysz tylko w świecie wyników z parzystą sumą – reszta przestaje istnieć.`,
        steps: [
          ['Warunek', 'Policz wyniki spełniające B.', 'To nowy mianownik.'],
          ['Część wspólna', 'Policz wyniki w A i B.', 'Licznik.'],
          ['Iloraz', T`$P(A|B) = \frac{|A \cap B|}{|B|}$.`, 'Skróć ułamek.']
        ],
        formulas: [
          ['Warunkowe', T`P(A|B) = \frac{P(A \cap B)}{P(B)}`, 28],
          ['Suma zdarzeń', T`P(A \cup B) = P(A) + P(B) - P(A \cap B)`, 27],
          ['Niezależność', T`P(A \cap B) = P(A) \cdot P(B)`]
        ],
        examples: [
          ['Kostki', '1 pkt', T`Suma $8$, gdy na obu kostkach różne liczby.`, T`1. $|B| = 30$.` + '\n' + T`2. $|A \cap B| = 4$, $P = \frac{2}{15}$.`, 'Mianownik 30, nie 36.'],
          ['Wzór', '1 pkt', T`$P(A) = \frac{1}{2}$, $P(B) = \frac{1}{3}$, $P(A \cup B) = \frac{2}{3}$.`, T`1. $P(A \cap B) = \frac{1}{6}$.` + '\n' + T`2. $P(A|B) = \frac{1}{2}$.`, 'Najpierw część wspólna.']
        ],
        trap: 'W mianowniku jest liczność zdarzenia WARUNKU, a nie całej przestrzeni $\\Omega$.',
        fail: T`„$P(A|B) = \frac{|A \cap B|}{36}$.”`,
        win: T`$P(A|B) = \frac{|A \cap B|}{|B|}$.`,
        why: 'Warunek zawęża zbiór możliwych wyników.',
        ckeTip: 'Zapisz zdarzenia $A$ i $B$ słowami i ich liczności – za opis modelu jest pierwszy punkt.',
        points: ['P(A|B) = P(A∩B)/P(B).', 'Mianownik: warunek.', 'Niezależność ≠ rozłączność.']
      }),
      gens: [conditionalTable, conditionalDice, conditionalFormula, independenceFacts, openConditionalUrn]
    },
    {
      title: 'Prawdopodobieństwo całkowite i wzór Bayesa',
      short_title: 'Całkowite i Bayes',
      requirements: ['XII.R1'],
      prereq: ['math-lesson-13-4'],
      pill: pill({
        essence: T`Gdy doświadczenie ma etapy (najpierw wybór urny, potem kula), prawdopodobieństwo wyniku to suma po gałęziach drzewa: $P(A) = P(A|B_1)P(B_1) + P(A|B_2)P(B_2)$. Wzór Bayesa odwraca warunek: $P(B_1|A) = \frac{P(A|B_1)P(B_1)}{P(A)}$ – udział jednej gałęzi w całym $P(A)$.`,
        context: 'Twierdzenie o prawdopodobieństwie całkowitym i wzór Bayesa (XII.R1) to nowe wymagania PR, typowo za 3–4 pkt.',
        pl: T`Drzewo: z korzenia wychodzą gałęzie „urna I” i „urna II”, z każdej – „biała” i „czarna”. Mnożysz wzdłuż gałęzi, dodajesz końcówki, które cię interesują.`,
        steps: [
          ['Drzewo', 'Pierwszy etap: wybór (urna, maszyna).', 'Wagi gałęzi.'],
          ['Gałęzie', 'Mnóż prawdopodobieństwa wzdłuż ścieżki.', 'P(B_i) · P(A|B_i).'],
          ['Suma / Bayes', 'Dodaj ścieżki z A; Bayes – jedna ścieżka przez sumę.', 'Odwrócony warunek.']
        ],
        formulas: [
          ['Całkowite', T`P(A) = P(A|B_1)P(B_1) + P(A|B_2)P(B_2)`, 28],
          ['Bayes', T`P(B_1|A) = \frac{P(A|B_1)P(B_1)}{P(A)}`, 28],
          ['Przeciwne', T`P(B_2) = 1 - P(B_1)`]
        ],
        examples: [
          ['Urny', '2 pkt', T`Moneta wybiera urnę: I (2 białe, 2 czarne), II (3 białe, 1 czarna).`, T`1. $\frac{1}{2} \cdot \frac{1}{2} + \frac{1}{2} \cdot \frac{3}{4}$.` + '\n' + T`2. $P = \frac{5}{8}$.`, 'Mnóż i dodawaj.'],
          ['Bayes', '2 pkt', T`Jak wyżej: kula biała. $P(I|B)$?`, T`1. $\frac{\frac{1}{4}}{\frac{5}{8}}$.` + '\n' + T`2. $P = \frac{2}{5}$.`, 'Jedna ścieżka przez całość.']
        ],
        trap: T`$P(A|B)$ i $P(B|A)$ to różne liczby. Wzór Bayesa przelicza jedno na drugie przez $P(A)$.`,
        fail: T`„Kula jest biała, więc $P(I|B) = P(B|I)$.”`,
        win: T`$P(I|B) = \frac{P(B|I)P(I)}{P(B)}$.`,
        why: 'Warunek i zdarzenie zamieniają się rolami.',
        ckeTip: 'Narysuj drzewo z wagami – egzaminator przyznaje punkt za poprawny model nawet bez końcowego wyniku.',
        points: ['Drzewo: mnóż wzdłuż, dodawaj końcówki.', 'Wagi urn z pierwszego etapu.', 'Bayes: ścieżka / całość.']
      }),
      gens: [totalUrn, factoryDefect, bayesFactory, totalFacts, openBayes]
    },
    {
      title: 'Schemat Bernoullego',
      short_title: 'Bernoulli',
      requirements: ['XII.R2'],
      prereq: ['math-lesson-13-5'],
      pill: pill({
        essence: T`Schemat Bernoullego to $n$ niezależnych powtórzeń tej samej próby z prawdopodobieństwem sukcesu $p$. Prawdopodobieństwo dokładnie $k$ sukcesów: $\binom{n}{k}p^k(1-p)^{n-k}$ – czynnik $\binom{n}{k}$ liczy, w których próbach były sukcesy. „Co najmniej jeden” liczysz przez dopełnienie: $1 - (1-p)^n$.`,
        context: 'Schemat Bernoullego (XII.R2) to nowe wymaganie PR – typowe zadanie za 2–4 pkt z kostką, monetą albo testem.',
        pl: T`Trzy rzuty kostką, dwie szóstki: szóstki mogą wypaść w rzutach 1–2, 1–3 albo 2–3. Każdy taki układ ma tę samą szansę $\left(\frac{1}{6}\right)^2 \cdot \frac{5}{6}$, a układów jest $\binom{3}{2} = 3$.`,
        steps: [
          ['Rozpoznaj', T`$n$ prób, stałe $p$, niezależność.`, 'Sukces = to, o co pytają.'],
          ['Wzór', T`$\binom{n}{k}p^k(1-p)^{n-k}$.`, 'Dla każdego k osobno.'],
          ['Sumuj', '„Co najmniej” = suma albo dopełnienie.', 'Wybierz krótszą drogę.']
        ],
        formulas: [
          ['Bernoulli', T`P(S_n = k) = \binom{n}{k}p^k(1-p)^{n-k}`, 28],
          ['Co najmniej jeden', T`P(S_n \ge 1) = 1 - (1-p)^n`],
          ['Moneta', T`P(S_n = k) = \frac{\binom{n}{k}}{2^n}`]
        ],
        examples: [
          ['Kostka', '1 pkt', T`3 rzuty, dokładnie 2 szóstki.`, T`1. $\binom{3}{2} \cdot \frac{1}{36} \cdot \frac{5}{6}$.` + '\n' + T`2. $\frac{5}{72}$.`, 'Czynnik 3.'],
          ['Co najmniej', '2 pkt', T`4 rzuty monetą, co najmniej 1 orzeł.`, T`1. $1 - \left(\frac{1}{2}\right)^4$.` + '\n' + T`2. $\frac{15}{16}$.`, 'Dopełnienie.']
        ],
        trap: T`Pominięcie $\binom{n}{k}$ daje prawdopodobieństwo jednego konkretnego układu sukcesów, a nie wszystkich.`,
        fail: T`„Dwie szóstki w trzech rzutach: $\left(\frac{1}{6}\right)^2 \cdot \frac{5}{6}$.”`,
        win: T`$\binom{3}{2}\left(\frac{1}{6}\right)^2 \cdot \frac{5}{6} = \frac{5}{72}$.`,
        why: 'Szóstki mogą wypaść w różnych rzutach.',
        ckeTip: 'Zapisz $n$, $k$ i $p$ przed obliczeniem – to pierwszy punkt w kluczu.',
        points: ['n prób, stałe p.', 'Czynnik C(n, k).', 'Co najmniej jeden – dopełnienie.']
      }),
      gens: [bernoulliExact, bernoulliAtLeastOne, bernoulliRounded, bernoulliFacts, openBernoulli]
    }
  ]
};
