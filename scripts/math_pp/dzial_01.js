import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { T, mc, num, pf, pill, fr, dec, par, sq, iv, m, need, gcd } from './lib.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Sprawdzone merytorycznie pigułki z pierwotnego działu 1 (po korekcie terminologii i zapisu).
const legacy = JSON.parse(fs.readFileSync(path.join(__dirname, 'legacy_dzial1_pills.json'), 'utf8'));
const fixLegacy = (p, page) => {
  const s = JSON.stringify(p)
    .replace(/Dla nierówności ostrej \$\\\\le\$/g, 'Dla nierówności nieostrej $\\\\le$')
    .replace(/ \\\\iff /g, ' \\\\ \\\\text{czyli} \\\\ ')
    .replace(/ \\\\implies /g, ', \\\\text{ więc } ')
    .replace(/C_\{konc\}/g, 'C_{\\\\text{końc}}')
    .replace(/M_\{laczny\}/g, 'M_{\\\\text{łączny}}');
  const out = JSON.parse(s);
  out.noAutoVisual = true;
  out.core_formulas = out.core_formulas.map((f) => ({ ...f, ...(page ? { cke_page: `str. ${page}`, in_cke_sheet: true } : {}) }));
  return out;
};

const pw = (a, e) => (e === 1 ? `${a}` : `${a}^{${e}}`);
const TIP_POW = 'Karta wzorów, str. 4: przy mnożeniu potęg o tej samej podstawie wykładniki dodajesz, przy dzieleniu odejmujesz, przy potęgowaniu potęgi mnożysz.';
const TIP_LOG = 'Karta wzorów, str. 5: $\\log_a x + \\log_a y = \\log_a(xy)$, $\\log_a x - \\log_a y = \\log_a\\frac{x}{y}$, $k\\log_a x = \\log_a(x^k)$.';

// ---------- 1.1 Potęgi ----------
const powProduct = (r) => {
  const a = r.pick([2, 3, 5]);
  const q = r.pick([2, 3, 4, 5]);
  const k = r.int(1, a === 5 ? 2 : 3);
  const p = r.int(1, k * q - 1);
  need(p % q !== 0);
  const s = k * q - p;
  return mc({
    title: 'Iloczyn potęg o tej samej podstawie',
    q: T`Liczba $${a}^{${fr(p, q)}} \cdot ${a}^{${fr(s, q)}}$ jest równa`,
    ok: m(a ** k),
    val: a ** k,
    bad: [m(T`${a}^{${fr(p * s, q * q)}}`), m((a * a) ** k), m(a ** (k + 1)), m(a ** (k + 2))],
    steps: [
      T`Podstawy są takie same, więc wykładniki dodajemy: $${a}^{${fr(p, q)}} \cdot ${a}^{${fr(s, q)}} = ${a}^{${fr(p, q)} + ${fr(s, q)}}$.`,
      T`Sumujemy ułamki: $${fr(p, q)} + ${fr(s, q)} = ${k}$, więc otrzymujemy $${k === 1 ? a : `${a}^{${k}} = ${a ** k}`}$.`
    ],
    trap: T`Przy mnożeniu potęg nie mnożymy wykładników (to działa tylko przy potęgowaniu potęgi) i nie mnożymy podstaw.`,
    tip: TIP_POW
  });
};
const powQuotient = (r) => {
  const a = r.pick([2, 3, 5, 7]);
  const q = r.pick([2, 3, 4, 5]);
  const k = r.int(1, a >= 5 ? 2 : 3);
  const s = r.int(1, 2 * q - 1);
  need(s % q !== 0);
  const p = k * q + s;
  return mc({
    title: 'Iloraz potęg o tej samej podstawie',
    q: T`Liczba $\frac{${a}^{${fr(p, q)}}}{${a}^{${fr(s, q)}}}$ jest równa`,
    ok: m(a ** k),
    val: a ** k,
    bad: [m(T`${a}^{${fr(p + s, q)}}`), m(1), m(a ** (k + 1)), m(T`${a}^{${fr(p * s, q * q)}}`)],
    steps: [
      T`Przy dzieleniu potęg o tej samej podstawie wykładniki odejmujemy: $${a}^{${fr(p, q)} - ${fr(s, q)}}$.`,
      T`$${fr(p, q)} - ${fr(s, q)} = ${k}$, więc wynik to $${k === 1 ? a : `${a}^{${k}} = ${a ** k}`}$.`
    ],
    trap: T`Kreska ułamkowa oznacza dzielenie, więc wykładnik mianownika odejmujemy od wykładnika licznika, a nie dodajemy.`,
    tip: TIP_POW
  });
};
const powNegFraction = (r) => {
  const b = r.pick([2, 3, 5]);
  const n = r.pick([2, 3, 4]);
  const k = r.int(1, 3);
  need(k % n !== 0 && gcd(k, n) === 1 && b ** n <= 625 && b ** k <= 125);
  return mc({
    title: 'Potęga ułamka o wykładniku ujemnym',
    q: T`Liczba $\left(\frac{1}{${b ** n}}\right)^{-${fr(k, n)}}$ jest równa`,
    ok: m(b ** k),
    val: b ** k,
    bad: [m(T`\frac{1}{${b ** k}}`), m(-(b ** k)), m(b ** (k + 1)), m(b ** n)],
    steps: [
      T`Minus w wykładniku odwraca ułamek: $\left(\frac{1}{${b ** n}}\right)^{-${fr(k, n)}} = ${b ** n}^{${fr(k, n)}}$.`,
      T`Zapisujemy $${b ** n} = ${b}^{${n}}$ i mnożymy wykładniki: $\left(${b}^{${n}}\right)^{${fr(k, n)}} = ${k === 1 ? b : `${b}^{${k}} = ${b ** k}`}$.`
    ],
    trap: T`Ujemny wykładnik nie daje ujemnego wyniku – on tylko odwraca liczbę.`,
    tip: TIP_POW
  });
};
const powMixedBases = (r) => {
  const b = r.pick([2, 3, 5]);
  const i = r.pick([2, 3, 4]);
  const p = r.int(1, 4);
  const j = r.int(1, 3);
  need(p % i !== 0 && b ** i <= 243 && p !== j && b ** Math.abs(p - j) <= 125);
  const e = p - j;
  const ok = e > 0 ? m(b ** e) : m(fr(1, b ** -e));
  return mc({
    title: 'Sprowadzanie do wspólnej podstawy',
    q: T`Liczba $${b ** i}^{${fr(p, i)}} \cdot ${b}^{-${j}}$ jest równa`,
    ok,
    val: b ** e,
    bad: [m(e > 0 ? fr(1, b ** e) : b ** -e), m(b ** p), m(b ** (p + j)), m(b ** Math.abs(e) * b)],
    steps: [
      T`Sprowadzamy do podstawy $${b}$: $${b ** i} = ${b}^{${i}}$, więc $${b ** i}^{${fr(p, i)}} = ${pw(b, p)}$.`,
      T`Mnożymy potęgi o tej samej podstawie: $${pw(b, p)} \cdot ${b}^{-${j}} = ${b}^{${e}} = ${e > 0 ? b ** e : fr(1, b ** -e)}$.`
    ],
    trap: T`Najpierw wspólna podstawa, dopiero potem działania na wykładnikach. Dodawanie wykładników przy różnych podstawach jest błędem.`,
    tip: TIP_POW
  });
};
const powRootAsPower = (r) => {
  const a = r.pick([2, 3, 5, 7]);
  const n = r.pick([2, 3, 4]);
  const mm = r.int(1, 5);
  const s = r.int(1, 5);
  need((mm + s) % n !== 0 && mm % n !== 0 && mm !== s);
  const root = n === 2 ? T`\sqrt{${mm === 1 ? a : `${a}^{${mm}}`}}` : T`\sqrt[${n}]{${mm === 1 ? a : `${a}^{${mm}}`}}`;
  return mc({
    title: 'Pierwiastek zapisany jako potęga',
    q: T`Liczba $${root} \cdot ${a}^{${fr(s, n)}}$ jest równa`,
    ok: m(T`${a}^{${fr(mm + s, n)}}`),
    bad: [m(T`${a}^{${fr(mm * s, n)}}`), m(T`${a}^{${fr(mm * s, n * n)}}`), m(T`${a}^{${fr(mm + s, 2 * n)}}`), m(T`${a * a}^{${fr(mm + s, n)}}`), m(T`${a}^{${fr(mm + s + n, n)}}`)],
    steps: [
      T`Zamieniamy pierwiastek na potęgę: $${root} = ${a}^{${fr(mm, n)}}$ (stopień pierwiastka trafia do mianownika wykładnika).`,
      T`Dodajemy wykładniki: $${fr(mm, n)} + ${fr(s, n)} = ${fr(mm + s, n)}$, czyli wynik to $${a}^{${fr(mm + s, n)}}$.`
    ],
    trap: T`Stopień pierwiastka to mianownik wykładnika: $\sqrt[n]{a^m} = a^{\frac{m}{n}}$, a nie $a^{\frac{n}{m}}$.`,
    tip: TIP_POW
  });
};

// ---------- 1.2 Pierwiastki ----------
const rootCombine = (r) => {
  const p = r.pick([2, 3, 5, 6, 7]);
  const m1 = r.int(2, 5);
  const m2 = r.intNot(2, 5, m1);
  const c1 = r.int(1, 4);
  const c2 = r.int(1, 3);
  const minus = r.bool();
  const K = minus ? c1 * m1 - c2 * m2 : c1 * m1 + c2 * m2;
  need(K > 1);
  const A = m1 * m1 * p;
  const B = m2 * m2 * p;
  const t1 = `${c1 === 1 ? '' : c1}\\sqrt{${A}}`;
  const t2 = `${c2 === 1 ? '' : c2}\\sqrt{${B}}`;
  const op = minus ? '-' : '+';
  return mc({
    title: 'Wyłączanie czynnika przed pierwiastek',
    q: T`Liczba $${t1} ${op} ${t2}$ jest równa`,
    ok: m(`${K}\\sqrt{${p}}`),
    val: K * Math.sqrt(p),
    bad: [
      m(sq(minus ? Math.abs(c1 * c1 * A - c2 * c2 * B) || p : c1 * c1 * A + c2 * c2 * B)),
      m(`${minus ? c1 * m1 + c2 * m2 : Math.max(Math.abs(c1 * m1 - c2 * m2), 2) === K ? K + 2 : Math.max(Math.abs(c1 * m1 - c2 * m2), 2)}\\sqrt{${p}}`),
      m(`${K}\\sqrt{${2 * p}}`),
      m(`${K * p}`),
      m(`${K + 1}\\sqrt{${p}}`)
    ],
    steps: [
      T`Wyłączamy czynniki przed znak pierwiastka: $\sqrt{${A}} = \sqrt{${m1 * m1} \cdot ${p}} = ${m1}\sqrt{${p}}$ oraz $\sqrt{${B}} = \sqrt{${m2 * m2} \cdot ${p}} = ${m2}\sqrt{${p}}$.`,
      T`Redukujemy wyrazy podobne: $${c1 * m1}\sqrt{${p}} ${op} ${c2 * m2}\sqrt{${p}} = ${K}\sqrt{${p}}$.`
    ],
    trap: T`Pierwiastków nie wolno dodawać „pod jednym znakiem”: $\sqrt{a} + \sqrt{b} \neq \sqrt{a + b}$.`,
    tip: 'Szukaj pod pierwiastkiem największego kwadratu: 4, 9, 16, 25, 36. Dodawać można tylko pierwiastki z tej samej liczby.'
  });
};
const rootSquareOfSum = (r) => {
  const a = r.int(1, 5);
  const b = r.int(1, 3);
  const c = r.pick([2, 3, 5, 7]);
  const minus = r.bool();
  const A = a * a + b * b * c;
  const mid = 2 * a * b;
  const bs = `${b === 1 ? '' : b}\\sqrt{${c}}`;
  const op = minus ? '-' : '+';
  return mc({
    title: 'Kwadrat sumy z pierwiastkiem',
    q: T`Liczba $\left(${a} ${op} ${bs}\right)^2$ jest równa`,
    ok: m(`${A} ${op} ${mid}\\sqrt{${c}}`),
    val: (a + (minus ? -1 : 1) * b * Math.sqrt(c)) ** 2,
    bad: [m(`${A}`), m(`${A} ${op} ${a * b}\\sqrt{${c}}`), m(`${a * a + b * c} ${op} ${mid}\\sqrt{${c}}`), m(`${minus ? Math.abs(a * a - b * b * c) || 1 : A + mid}`), m(`${A} ${minus ? '+' : '-'} ${mid}\\sqrt{${c}}`)],
    steps: [
      T`Stosujemy wzór $(a ${op} b)^2 = a^2 ${op} 2ab + b^2$ dla $a = ${a}$, $b = ${bs}$.`,
      T`$${a}^2 = ${a * a}$, $\left(${bs}\right)^2 = ${b === 1 ? c : `${b * b} \\cdot ${c} = ${b * b * c}`}$, $2 \cdot ${a} \cdot ${bs} = ${mid}\sqrt{${c}}$.`,
      T`Sumujemy: $${a * a} ${op} ${mid}\sqrt{${c}} + ${b * b * c} = ${A} ${op} ${mid}\sqrt{${c}}$.`
    ],
    trap: T`Najczęstszy błąd to pominięcie podwojonego iloczynu: $(a + b)^2 \neq a^2 + b^2$.`,
    tip: 'Karta wzorów, str. 7: $(a \\pm b)^2 = a^2 \\pm 2ab + b^2$. Kwadrat pierwiastka „zjada” pierwiastek: $(\\sqrt{c})^2 = c$.'
  });
};
const rootRationalize = (r) => {
  const b = r.pick([2, 3, 5, 6, 7]);
  const k = r.int(2, 6);
  const a = k * b;
  return mc({
    title: 'Usuwanie niewymierności z mianownika',
    q: T`Liczba $\frac{${a}}{\sqrt{${b}}}$ jest równa`,
    ok: m(`${k}\\sqrt{${b}}`),
    val: a / Math.sqrt(b),
    bad: [m(`${a}\\sqrt{${b}}`), m(`${k}`), m(T`\frac{\sqrt{${b}}}{${k}}`), m(`${k * b}`)],
    steps: [
      T`Mnożymy licznik i mianownik przez $\sqrt{${b}}$: $\frac{${a}}{\sqrt{${b}}} \cdot \frac{\sqrt{${b}}}{\sqrt{${b}}} = \frac{${a}\sqrt{${b}}}{${b}}$.`,
      T`Skracamy $${a}$ z $${b}$: otrzymujemy $${k}\sqrt{${b}}$.`
    ],
    trap: T`Po pomnożeniu w mianowniku zostaje $${b}$ (bo $\sqrt{${b}} \cdot \sqrt{${b}} = ${b}$), a nie $${b * b}$.`,
    tip: 'Ułamek z pierwiastkiem w mianowniku rozszerzasz przez ten sam pierwiastek – wartość liczby się nie zmienia.'
  });
};
const rootOddNegative = (r) => {
  const a = r.int(2, 5);
  const b = r.int(2, 9);
  const plus = r.bool();
  const v = -a + (plus ? b : -b);
  return mc({
    title: 'Pierwiastek sześcienny z liczby ujemnej',
    q: T`Liczba $\sqrt[3]{-${a ** 3}} ${plus ? '+' : '-'} \sqrt{${b * b}}$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(a + (plus ? b : -b)), m(-v === v ? v + 1 : -v), m(-a - b === v ? a + b : -a - b), m(v + 2 * a + 1)],
    steps: [
      T`Pierwiastek stopnia nieparzystego z liczby ujemnej istnieje i jest ujemny: $\sqrt[3]{-${a ** 3}} = -${a}$, bo $(-${a})^3 = -${a ** 3}$.`,
      T`$\sqrt{${b * b}} = ${b}$, więc wynik to $-${a} ${plus ? '+' : '-'} ${b} = ${v}$.`
    ],
    trap: T`Pierwiastek kwadratowy z liczby ujemnej nie istnieje, ale sześcienny – tak. Nie gub minusa: $\sqrt[3]{-${a ** 3}} = -${a}$.`,
    tip: 'Pierwiastki stopnia nieparzystego „przepuszczają” minus: $\\sqrt[3]{-a} = -\\sqrt[3]{a}$.'
  });
};
const rootProduct = (r) => {
  const p = r.pick([2, 3, 5, 6]);
  const k = r.int(2, 5);
  const j = r.int(1, 4);
  const A = p * j * j;
  const B = p * k * k;
  need(A !== B && j !== k);
  const v = p * j * k;
  return mc({
    title: 'Iloczyn pierwiastków',
    q: T`Liczba $\sqrt{${A}} \cdot \sqrt{${B}}$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(`\\sqrt{${A + B}}`), m(v * p), m(`${j * k}\\sqrt{${p}}`), m(A * B), m(v + p)],
    steps: [
      T`Iloczyn pierwiastków to pierwiastek iloczynu: $\sqrt{${A}} \cdot \sqrt{${B}} = \sqrt{${A} \cdot ${B}} = \sqrt{${A * B}}$.`,
      T`$${A * B} = ${v}^2$, więc $\sqrt{${A * B}} = ${v}$.`
    ],
    trap: T`Wzór $\sqrt{a} \cdot \sqrt{b} = \sqrt{ab}$ działa dla mnożenia. Dla dodawania analogiczny wzór nie istnieje.`,
    tip: 'Karta wzorów, str. 4: $\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{a \\cdot b}$.'
  });
};

// ---------- 1.3 Logarytmy ----------
const logDiff = (r) => {
  const a = r.pick([2, 3, 5, 6, 7, 10]);
  const k = r.int(1, a <= 3 ? 4 : a === 10 ? 3 : 2);
  const t = r.pick([2, 3, 4, 5, 6, 7]);
  need(t % a !== 0 && t !== a);
  return mc({
    title: 'Różnica logarytmów',
    q: T`Liczba $\log_{${a}} ${t * a ** k} - \log_{${a}} ${t}$ jest równa`,
    ok: m(k),
    val: k,
    bad: [m(T`\log_{${a}} ${t * a ** k - t}`), m(k + 1), m(a ** k), m(k + 2)],
    steps: [
      T`Różnica logarytmów o tej samej podstawie to logarytm ilorazu: $\log_{${a}} \frac{${t * a ** k}}{${t}} = \log_{${a}} ${a ** k}$.`,
      T`$${a}^{${k}} = ${a ** k}$, więc $\log_{${a}} ${a ** k} = ${k}$.`
    ],
    trap: T`Liczb logarytmowanych nie odejmujemy: $\log_a x - \log_a y \neq \log_a(x - y)$.`,
    tip: TIP_LOG
  });
};
const logSum = (r) => {
  const a = r.pick([6, 10, 12, 15]);
  const k = r.int(1, a === 10 ? 3 : 2);
  const N = a ** k;
  const divs = [];
  for (let x = 2; x < N; x++) if (N % x === 0 && Math.log(x) / Math.log(a) % 1 > 1e-9 && x <= 250 && N / x <= 250) divs.push(x);
  need(divs.length > 0);
  const x = r.pick(divs);
  const y = N / x;
  need(x !== y);
  return mc({
    title: 'Suma logarytmów',
    q: T`Liczba $\log_{${a}} ${x} + \log_{${a}} ${y}$ jest równa`,
    ok: m(k),
    val: k,
    bad: [m(T`\log_{${a}} ${x + y}`), m(k + 1), m(N), m(k + 2)],
    steps: [
      T`Suma logarytmów o tej samej podstawie to logarytm iloczynu: $\log_{${a}} (${x} \cdot ${y}) = \log_{${a}} ${N}$.`,
      T`$${a}^{${k}} = ${N}$, więc $\log_{${a}} ${N} = ${k}$.`
    ],
    trap: T`Liczb logarytmowanych nie dodajemy: $\log_a x + \log_a y \neq \log_a(x + y)$.`,
    tip: TIP_LOG
  });
};
const logCoef = (r) => {
  const a = r.pick([2, 3, 5]);
  const k = r.int(1, 3);
  const c = r.pick([2, 3, 4, 5, 6]);
  need(c % a !== 0);
  // 2 log_a (c * a^j) - log_a (c^2 * a^(2j-k))
  const j = r.int(1, 2);
  need(2 * j - k >= 0);
  const x = c * a ** j;
  const y = c * c * a ** (2 * j - k);
  need(x <= 60 && y <= 400 && x !== y);
  return mc({
    title: 'Współczynnik przed logarytmem',
    q: T`Liczba $2\log_{${a}} ${x} - \log_{${a}} ${y}$ jest równa`,
    ok: m(k),
    val: k,
    bad: [m(T`\log_{${a}} ${Math.abs(2 * x - y) || 2}`), m(2 * k), m(k + 1), m(T`2\log_{${a}} ${x}`.length ? k + 2 : k + 3)],
    steps: [
      T`Najpierw wciągamy współczynnik do wykładnika: $2\log_{${a}} ${x} = \log_{${a}} ${x}^2 = \log_{${a}} ${x * x}$.`,
      T`Teraz różnica logarytmów: $\log_{${a}} \frac{${x * x}}{${y}} = \log_{${a}} ${a ** k} = ${k}$.`
    ],
    trap: T`Wzoru na różnicę logarytmów nie wolno użyć, dopóki przed logarytmem stoi liczba. Najpierw zamień $2\log_a x$ na $\log_a x^2$.`,
    tip: TIP_LOG
  });
};
const logSpecialBase = (r) => {
  const a = r.pick([2, 3, 5]);
  const k = r.int(1, a === 5 ? 3 : 4);
  const variant = r.int(0, 2);
  if (variant === 0)
    return mc({
      title: 'Logarytm o podstawie ułamkowej',
      q: T`Liczba $\log_{\frac{1}{${a}}} ${a ** k}$ jest równa`,
      ok: m(-k),
      val: -k,
      bad: [m(k), m(fr(-1, k === 1 ? 2 : k)), m(fr(1, a ** k)), m(-k - 1)],
      steps: [T`Szukamy wykładnika $c$, dla którego $\left(\frac{1}{${a}}\right)^c = ${a ** k}$.`, T`$\frac{1}{${a}} = ${a}^{-1}$, więc $${a}^{-c} = ${a}^{${k}}$, stąd $c = -${k}$.`],
      trap: T`Podstawa mniejsza od 1 i liczba większa od 1 dają zawsze logarytm ujemny.`,
      tip: 'Logarytm to pytanie o wykładnik: $\\log_a b = c$ znaczy tyle, co $a^c = b$ (karta wzorów, str. 5).'
    });
  if (variant === 1)
    return mc({
      title: 'Logarytm z ułamka',
      q: T`Liczba $\log_{${a}} \frac{1}{${a ** k}}$ jest równa`,
      ok: m(-k),
      val: -k,
      bad: [m(k), m(fr(1, k === 1 ? 2 : k)), m(fr(-1, k === 1 ? 2 : k)), m(-k - 1)],
      steps: [T`$\frac{1}{${a ** k}} = ${a}^{-${k}}$.`, T`Zatem $\log_{${a}} ${a}^{-${k}} = -${k}$.`],
      trap: T`Logarytm może być ujemny – ujemna nie może być tylko liczba logarytmowana.`,
      tip: 'Logarytm to pytanie o wykładnik: $\\log_a b = c$ znaczy tyle, co $a^c = b$ (karta wzorów, str. 5).'
    });
  need(k <= 3);
  return mc({
    title: 'Logarytm o podstawie z pierwiastkiem',
    q: T`Liczba $\log_{\sqrt{${a}}} ${a ** k}$ jest równa`,
    ok: m(2 * k),
    val: 2 * k,
    bad: [m(k), m(fr(k, 2)), m(a ** k), m(2 * k + 1)],
    steps: [T`Szukamy wykładnika $c$, dla którego $\left(\sqrt{${a}}\right)^c = ${a ** k}$.`, T`$\sqrt{${a}} = ${a}^{\frac{1}{2}}$, więc $${a}^{\frac{c}{2}} = ${a}^{${k}}$, stąd $c = ${2 * k}$.`],
    trap: T`Podstawa $\sqrt{${a}}$ jest „słabsza” niż $${a}$, więc potrzebny wykładnik jest dwa razy większy, a nie dwa razy mniejszy.`,
    tip: 'Logarytm to pytanie o wykładnik: $\\log_a b = c$ znaczy tyle, co $a^c = b$ (karta wzorów, str. 5).'
  });
};
const logOfRoot = (r) => {
  const a = r.pick([2, 3, 5, 7]);
  const n = r.pick([2, 3, 4]);
  const k = r.int(1, 5);
  need(k % n !== 0 && gcd(k, n) === 1);
  const root = n === 2 ? T`\sqrt{${k === 1 ? a : `${a}^{${k}}`}}` : T`\sqrt[${n}]{${k === 1 ? a : `${a}^{${k}}`}}`;
  return mc({
    title: 'Logarytm z pierwiastka',
    q: T`Liczba $\log_{${a}} ${root}$ jest równa`,
    ok: m(fr(k, n)),
    val: k / n,
    bad: [m(fr(n, k)), m(k * n), m(k), m(fr(k, 2 * n))],
    steps: [T`Zapisujemy pierwiastek jako potęgę: $${root} = ${a}^{${fr(k, n)}}$.`, T`$\log_{${a}} ${a}^{${fr(k, n)}} = ${fr(k, n)}$.`],
    trap: T`Stopień pierwiastka idzie do mianownika wykładnika, a nie do licznika.`,
    tip: 'Każdy pierwiastek zamień na potęgę o wykładniku ułamkowym – wtedy logarytm odczytasz od razu.'
  });
};

// ---------- 1.4 Wartość bezwzględna ----------
const absSol = (a, rr, op) => {
  const lo = a - rr;
  const hi = a + rr;
  return { '\\le': iv.cc(lo, hi), '<': iv.oo(lo, hi), '\\ge': `${iv.lc(lo)} \\cup ${iv.rc(hi)}`, '>': `${iv.lo(lo)} \\cup ${iv.ro(hi)}` }[op];
};
const absInequality = (r) => {
  const a = r.intNot(-6, 6, 0);
  const rr = r.int(1, 7);
  const op = r.pick(['\\le', '<', '\\ge', '>']);
  const inner = ['\\le', '<'].includes(op);
  const flip = { '\\le': '\\ge', '<': '>', '\\ge': '\\le', '>': '<' }[op];
  const expr = `|x ${a > 0 ? '-' : '+'} ${Math.abs(a)}|`;
  return mc({
    title: 'Nierówność z wartością bezwzględną',
    q: T`Zbiorem wszystkich rozwiązań nierówności $${expr} ${op} ${rr}$ jest`,
    ok: m(absSol(a, rr, op)),
    bad: [m(absSol(a, rr, flip)), m(absSol(-a, rr, op)), m(absSol(0, rr, op)), m(absSol(-a, rr, flip))],
    steps: [
      T`$${expr}$ to odległość liczby $x$ od punktu $${a}$ na osi liczbowej.`,
      T`Punkty odległe od $${a}$ dokładnie o $${rr}$ to $${a} - ${rr} = ${a - rr}$ oraz $${a} + ${rr} = ${a + rr}$.`,
      inner
        ? T`Znak $${op}$ oznacza odległość ${op === '<' ? 'mniejszą niż' : 'co najwyżej'} $${rr}$, czyli liczby między tymi punktami: $${absSol(a, rr, op)}$.`
        : T`Znak $${op}$ oznacza odległość ${op === '>' ? 'większą niż' : 'co najmniej'} $${rr}$, czyli liczby na zewnątrz: $${absSol(a, rr, op)}$.`
    ],
    trap: T`Środkiem dla $${expr}$ jest $${a}$, a nie $${-a}$ – znak w środku wartości bezwzględnej trzeba odwrócić.`,
    tip: 'Narysuj oś, zaznacz środek i odlicz promień w obie strony. Znak $<$ lub $\\le$ to środek, znak $>$ lub $\\ge$ to dwa „skrzydła”.'
  });
};
const absEquation = (r) => {
  const a = r.intNot(-7, 7, 0);
  const rr = r.int(1, 8);
  const expr = `|x ${a > 0 ? '-' : '+'} ${Math.abs(a)}|`;
  const sum = r.bool();
  const x1 = a - rr;
  const x2 = a + rr;
  const v = sum ? x1 + x2 : x1 * x2;
  return mc({
    title: 'Równanie z wartością bezwzględną',
    q: T`${sum ? 'Suma' : 'Iloczyn'} wszystkich rozwiązań równania $${expr} = ${rr}$ jest ${sum ? 'równa' : 'równy'}`,
    ok: m(v),
    val: v,
    bad: sum ? [m(-v), m(2 * rr), m(0), m(x2), m(v + 2)] : [m(-v), m(a * a + rr * rr), m((a - rr) * (-a - rr)), m(x2), m(v + 1)],
    steps: [
      T`Równanie $${expr} = ${rr}$ oznacza: liczba $x$ leży w odległości $${rr}$ od $${a}$.`,
      T`Rozwiązania: $x = ${a} - ${rr} = ${x1}$ lub $x = ${a} + ${rr} = ${x2}$.`,
      sum ? T`Suma: $${x1} + ${par(x2)} = ${v}$.` : T`Iloczyn: $${par(x1)} \cdot ${par(x2)} = ${v}$.`
    ],
    trap: T`Równanie z wartością bezwzględną ma tu dwa rozwiązania – po obu stronach punktu $${a}$. Podanie tylko jednego to strata punktu.`,
    tip: 'Suma rozwiązań równania $|x - a| = r$ to zawsze $2a$, bo rozwiązania leżą symetrycznie względem $a$.'
  });
};
const absReverse = (r) => {
  const lo = r.int(-9, 5);
  const rr = r.int(1, 6);
  const hi = lo + 2 * rr;
  const a = lo + rr;
  need(a !== 0);
  const inner = r.bool();
  const set = inner ? iv.cc(lo, hi) : `${iv.lc(lo)} \\cup ${iv.rc(hi)}`;
  const e = (c, op, rad) => m(`|x ${c > 0 ? '-' : '+'} ${Math.abs(c)}| ${op} ${rad}`);
  const op = inner ? '\\le' : '\\ge';
  const flip = inner ? '\\ge' : '\\le';
  return mc({
    title: 'Od zbioru rozwiązań do nierówności',
    q: T`Zbiór $${set}$ jest zbiorem wszystkich rozwiązań nierówności`,
    ok: e(a, op, rr),
    bad: [e(-a, op, rr), e(a, flip, rr), e(a, op, 2 * rr), e(-a, flip, rr)],
    steps: [
      T`Środek to średnia końców: $a = \frac{${lo} + ${par(hi)}}{2} = ${a}$.`,
      T`Promień to odległość od środka do końca: $r = ${hi} - ${par(a)} = ${rr}$.`,
      inner ? T`Zbiór to jeden przedział domknięty, więc znak to $\le$: $|x ${a > 0 ? '-' : '+'} ${Math.abs(a)}| \le ${rr}$.` : T`Zbiór to dwa „skrzydła” z końcami, więc znak to $\ge$: $|x ${a > 0 ? '-' : '+'} ${Math.abs(a)}| \ge ${rr}$.`
    ],
    trap: T`Promień to połowa długości przedziału ($${rr}$), a nie cała długość ($${2 * rr}$).`,
    tip: 'Środek = średnia arytmetyczna końców, promień = połowa odległości między końcami.'
  });
};
const absValue = (r) => {
  const a = r.int(1, 9);
  const b = r.intNot(1, 12, a);
  const c = r.int(1, 9);
  need(b > a);
  const v = b - a - c;
  return mc({
    title: 'Obliczanie wartości bezwzględnej',
    q: T`Wartość wyrażenia $|${a} - ${b}| - |-${c}|$ jest równa`,
    ok: m(v),
    val: v,
    bad: [m(a - b - c), m(b - a + c), m(a - b + c), m(v + 2 * c + 1)],
    steps: [T`$|${a} - ${b}| = |${a - b}| = ${b - a}$ oraz $|-${c}| = ${c}$.`, T`Wynik: $${b - a} - ${c} = ${v}$.`],
    trap: T`Wartość bezwzględna jest zawsze nieujemna, ale minus stojący przed nią zostaje: $-|-${c}| = -${c}$.`,
    tip: 'Karta wzorów, str. 4: $|x| = x$ dla $x \\ge 0$ oraz $|x| = -x$ dla $x < 0$.'
  });
};

// ---------- 1.5 Procenty ----------
const zl = (x) => `$${dec(x, 2)}$ zł`;
const pctDouble = (r) => {
  const P = r.pick([200, 300, 400, 500, 600, 800, 1000, 1200]);
  const p1 = r.pick([10, 20, 25, 30, 40, 50]);
  const p2 = r.pick([10, 20, 25, 30, 40, 50]);
  const up1 = r.bool();
  const up2 = r.bool();
  const f1 = up1 ? 100 + p1 : 100 - p1;
  const f2 = up2 ? 100 + p2 : 100 - p2;
  const v = (P * f1 * f2) / 10000;
  need(Number.isInteger(v));
  const naive = P * (1 + ((up1 ? p1 : -p1) + (up2 ? p2 : -p2)) / 100);
  const w = (u) => (u ? 'podwyższono' : 'obniżono');
  return mc({
    title: 'Dwie kolejne zmiany ceny',
    q: T`Cena towaru wynosiła $${P}$ zł. Cenę tę ${w(up1)} o $${p1}\%$, a następnie nową cenę ${w(up2)} o $${p2}\%$. Po obu zmianach cena towaru jest równa`,
    ok: zl(v),
    val: v,
    bad: [zl(naive), zl((P * f1) / 100), zl((P * f2) / 100), zl(v + P / 20), zl(v - P / 20)],
    steps: [
      T`Pierwsza zmiana: $${P} \cdot ${dec(f1 / 100)} = ${dec((P * f1) / 100)}$ zł.`,
      T`Druga zmiana liczona jest od nowej ceny: $${dec((P * f1) / 100)} \cdot ${dec(f2 / 100)} = ${v}$ zł.`
    ],
    trap: T`Procentów kolejnych zmian nie wolno dodawać – druga zmiana dotyczy już zmienionej ceny, a nie początkowych $${P}$ zł.`,
    tip: 'Każdą zmianę zamień na mnożnik: obniżka o $20\\%$ to $\\cdot\\, 0{,}8$, podwyżka o $20\\%$ to $\\cdot\\, 1{,}2$. Mnożniki mnożysz.'
  });
};
const pctTotalChange = (r) => {
  const p1 = r.pick([10, 20, 25, 30, 40, 50]);
  const p2 = r.pick([10, 20, 25, 30, 40, 50]);
  const up1 = r.bool();
  const up2 = !up1 || r.bool();
  const f = ((up1 ? 100 + p1 : 100 - p1) * (up2 ? 100 + p2 : 100 - p2)) / 100;
  need(f !== 100);
  const ch = Math.abs(f - 100);
  const naive = (up1 ? p1 : -p1) + (up2 ? p2 : -p2);
  const say = (x, up) => `${up ? 'wzrosła' : 'zmalała'} o $${dec(x)}\\%$`;
  const w = (u) => (u ? 'podwyższono' : 'obniżono');
  return mc({
    title: 'Łączna zmiana procentowa',
    q: T`Cenę pewnego towaru ${w(up1)} o $${p1}\%$, a następnie nową cenę ${w(up2)} o $${p2}\%$. W wyniku obu tych zmian cena towaru w porównaniu z ceną początkową`,
    ok: say(ch, f > 100),
    bad: [naive === 0 ? 'nie zmieniła się' : say(Math.abs(naive), naive > 0), say(ch, f < 100), say(ch + 5, f > 100), say(Math.abs(naive) + 10, f > 100), say((p1 * p2) / 100 + 1, f > 100)],
    steps: [
      T`Zamieniamy zmiany na mnożniki: $${dec((up1 ? 100 + p1 : 100 - p1) / 100)}$ oraz $${dec((up2 ? 100 + p2 : 100 - p2) / 100)}$.`,
      T`Mnożnik łączny: $${dec((up1 ? 100 + p1 : 100 - p1) / 100)} \cdot ${dec((up2 ? 100 + p2 : 100 - p2) / 100)} = ${dec(f / 100)}$, czyli nowa cena to $${dec(f)}\%$ ceny początkowej.`,
      T`Cena ${f > 100 ? 'wzrosła' : 'zmalała'} więc o $${dec(ch)}\%$.`
    ],
    trap: T`Dodanie lub odjęcie samych procentów daje błędny wynik, bo każda zmiana liczona jest od innej kwoty.`,
    tip: 'Mnożnik łączny większy od 1 oznacza wzrost, mniejszy od 1 – spadek. Różnica względem 1 to zmiana procentowa.'
  });
};
const pctDeposit = (r) => {
  const K = r.pick([1000, 2000, 4000, 5000, 10000, 20000]);
  const p = r.pick([2, 3, 4, 5, 6, 8, 10]);
  const v = (K * (100 + p) * (100 + p)) / 10000;
  return mc({
    title: 'Lokata z kapitalizacją roczną',
    q: T`Klient wpłacił do banku $${K}$ zł na lokatę dwuletnią. Po każdym roku oszczędzania bank dolicza odsetki w wysokości $${p}\%$ od kwoty bieżącego kapitału. Po dwóch latach (bez uwzględniania podatków) na lokacie będzie`,
    ok: zl(v),
    val: v,
    bad: [zl(K * (1 + (2 * p) / 100)), zl(K * (1 + p / 100)), zl(v + K / 100), zl(K * (1 + (2 * p) / 100) - K / 100)],
    steps: [
      T`Po pierwszym roku: $${K} \cdot ${dec(1 + p / 100)} = ${dec(K * (1 + p / 100), 2)}$ zł.`,
      T`Po drugim roku odsetki liczone są od większej kwoty: $${dec(K * (1 + p / 100), 2)} \cdot ${dec(1 + p / 100)} = ${dec(v, 2)}$ zł.`
    ],
    trap: T`To procent składany: odsetki z drugiego roku liczymy także od odsetek z pierwszego roku. Wynik $${K} \cdot ${dec(1 + (2 * p) / 100)}$ jest za mały.`,
    tip: 'Karta wzorów, str. 10 (procent składany): $K_n = K \\cdot \\left(1 + \\frac{p}{100}\\right)^n$.'
  });
};
const pctDepositFormula = (r) => {
  const K = r.pick([1500, 2500, 3000, 6000, 8000, 12000]);
  const p = r.pick([2, 3, 4, 5, 6, 7]);
  const n = r.pick([3, 4, 5, 6, 10]);
  const base = dec(1 + p / 100);
  return mc({
    title: 'Wzór na procent składany',
    q: T`Kwotę $${K}$ zł wpłacono na lokatę z roczną kapitalizacją odsetek i oprocentowaniem $${p}\%$ w skali roku. Kwota na lokacie po $${n}$ latach (bez uwzględniania podatków) jest równa`,
    ok: m(T`${K} \cdot (${base})^{${n}}`),
    bad: [m(T`${K} \cdot ${dec(1 + (n * p) / 100)}`), m(T`${K} \cdot (${dec(p / 100)})^{${n}}`), m(T`${K} \cdot ${n} \cdot ${base}`), m(T`${K} + ${n} \cdot ${dec(p / 100)}`)],
    steps: [T`Co roku kapitał mnożymy przez $1 + \frac{${p}}{100} = ${base}$.`, T`Po $${n}$ latach mnożymy $${n}$ razy, czyli $${K} \cdot (${base})^{${n}}$.`],
    trap: T`Mnożnikiem jest $${base}$, a nie $${dec(p / 100)}$ – samo $${dec(p / 100)}$ to tylko odsetki, bez kapitału.`,
    tip: 'Karta wzorów, str. 10 (procent składany): $K_n = K \\cdot \\left(1 + \\frac{p}{100}\\right)^n$.'
  });
};
const pctOriginal = (r) => {
  const p = r.pick([10, 20, 25, 30, 40, 50, 60]);
  const up = r.bool();
  const f = up ? 100 + p : 100 - p;
  const C0 = r.pick([80, 120, 150, 200, 240, 300, 360, 400, 450, 500]);
  const C = (C0 * f) / 100;
  need(Number.isInteger(C));
  return mc({
    title: 'Cena przed zmianą',
    q: T`Po ${up ? 'podwyżce' : 'obniżce'} o $${p}\%$ cena towaru jest równa $${C}$ zł. Przed tą ${up ? 'podwyżką' : 'obniżką'} cena towaru była równa`,
    ok: zl(C0),
    val: C0,
    bad: [zl(up ? (C * (100 - p)) / 100 : (C * (100 + p)) / 100), zl(up ? C - p : C + p), zl(C0 + 10), zl(up ? C0 - 10 : C0 + 20)],
    steps: [
      T`Oznaczmy cenę początkową przez $x$. Po zmianie: $${dec(f / 100)} \cdot x = ${C}$.`,
      T`Dzielimy przez mnożnik: $x = \frac{${C}}{${dec(f / 100)}} = ${C0}$ zł.`
    ],
    trap: T`Nie wolno ${up ? 'odjąć' : 'dodać'} $${p}\%$ od ceny końcowej – te $${p}\%$ liczono od ceny początkowej, której szukamy.`,
    tip: 'Rachunek „wstecz”: cenę końcową dzielisz przez mnożnik zmiany.'
  });
};
const pctOf = (r) => {
  const pr = r.pick([20, 25, 40, 50, 60, 75, 80, 125, 150, 160, 250]);
  const inv = 10000 / pr;
  return mc({
    title: 'Jakim procentem jednej liczby jest druga',
    q: T`Liczba dodatnia $a$ stanowi $${pr}\%$ liczby $b$. Wynika stąd, że liczba $b$ to`,
    ok: `$${dec(inv)}\\%$ liczby $a$`,
    bad: [`$${dec(Math.abs(100 - pr))}\\%$ liczby $a$`, `$${dec(pr)}\\%$ liczby $a$`, `$${dec(200 - pr > 0 ? 200 - pr : pr + 100)}\\%$ liczby $a$`, `$${dec(inv + 25)}\\%$ liczby $a$`, `$${dec(inv / 2)}\\%$ liczby $a$`],
    steps: [T`Zapisujemy warunek: $a = ${dec(pr / 100)} \cdot b$.`, T`Wyznaczamy $b$: $b = \frac{a}{${dec(pr / 100)}} = ${dec(inv / 100)} \cdot a$, czyli $b$ to $${dec(inv)}\%$ liczby $a$.`],
    trap: T`Procenty „w drugą stronę” nie są dopełnieniem do $100\%$ ani tą samą liczbą – trzeba odwrócić mnożnik.`,
    tip: 'Zapisz zdanie jako równanie z mnożnikiem dziesiętnym i wyznacz z niego drugą liczbę.'
  });
};

export default {
  numericId: 1,
  title: 'Liczby rzeczywiste',
  short_title: 'Liczby rzeczywiste',
  description: 'Potęgi, pierwiastki, logarytmy, wartość bezwzględna oraz procenty i lokaty.',
  icon: 'Hash',
  color: '#FFB800',
  matura_points_range: '5–8 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 4–5, 10',
  lessons: [
    {
      title: 'Potęgi o wykładnikach całkowitych i wymiernych',
      short_title: 'Potęgi',
      time: '~6 min',
      pill: fixLegacy(legacy.powers, 4),
      gens: [powProduct, powQuotient, powNegFraction, powMixedBases, powRootAsPower]
    },
    {
      title: 'Pierwiastki: własności i usuwanie niewymierności',
      short_title: 'Pierwiastki',
      pill: pill({
        essence: T`Pierwiastek to działanie odwrotne do potęgowania: $\sqrt{a} = b$ znaczy, że $b^2 = a$ i $b \ge 0$. Na maturze liczą się trzy umiejętności: wyłączanie czynnika przed znak pierwiastka ($\sqrt{72} = 6\sqrt{2}$), mnożenie i dzielenie pierwiastków tego samego stopnia oraz usuwanie niewymierności z mianownika. Pierwiastek stopnia nieparzystego można obliczyć także z liczby ujemnej: $\sqrt[3]{-8} = -2$.`,
        context: 'Zadania 1–4 w arkuszu • 1 pkt za zadanie zamknięte. Pierwiastki wracają też w zadaniach z planimetrii i stereometrii.',
        pl: T`$\sqrt{50}$ to nie jest „brzydka liczba”. Rozbij $50$ na $25 \cdot 2$, a z $25$ wyciągnij $5$ – dostajesz $5\sqrt{2}$. Dodawać możesz tylko „takie same” pierwiastki: $5\sqrt{2} + 3\sqrt{2} = 8\sqrt{2}$, tak jak $5$ jabłek i $3$ jabłka.`,
        steps: [
          ['Znajdź największy kwadrat', T`Rozłóż liczbę pod pierwiastkiem na iloczyn, w którym jeden czynnik to $4, 9, 16, 25, 36, 49\ldots$`, T`$\sqrt{48} = \sqrt{16 \cdot 3}$`],
          ['Wyłącz czynnik', T`Z kwadratu wyciągnij pierwiastek przed znak: $\sqrt{16 \cdot 3} = 4\sqrt{3}$.`, 'Reszta zostaje pod pierwiastkiem.'],
          ['Zredukuj wyrazy podobne', T`Dodaj lub odejmij współczynniki przy tym samym pierwiastku.`, T`$4\sqrt{3} - \sqrt{3} = 3\sqrt{3}$`],
          ['Usuń pierwiastek z mianownika', T`Pomnóż licznik i mianownik przez pierwiastek z mianownika.`, T`$\frac{6}{\sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}$`]
        ],
        formulas: [
          ['Pierwiastek iloczynu', T`\sqrt[n]{a \cdot b} = \sqrt[n]{a} \cdot \sqrt[n]{b}`, 4],
          ['Pierwiastek ilorazu', T`\sqrt[n]{\frac{a}{b}} = \frac{\sqrt[n]{a}}{\sqrt[n]{b}}`, 4],
          ['Pierwiastek jako potęga', T`\sqrt[n]{a^m} = a^{\frac{m}{n}}`, 4],
          ['Stopień nieparzysty i liczba ujemna', T`\sqrt[3]{-a} = -\sqrt[3]{a}`]
        ],
        examples: [
          ['Zadanie typowe', '1 pkt', T`Oblicz $3\sqrt{45} - \sqrt{20}$.`, T`1. $\sqrt{45} = \sqrt{9 \cdot 5} = 3\sqrt{5}$, więc $3\sqrt{45} = 9\sqrt{5}$.` + '\n' + T`2. $\sqrt{20} = \sqrt{4 \cdot 5} = 2\sqrt{5}$.` + '\n' + T`3. $9\sqrt{5} - 2\sqrt{5} = 7\sqrt{5}$.`, 'Najpierw wyłącz czynniki, potem redukuj.'],
          ['Niewymierność w mianowniku', '1 pkt', T`Usuń niewymierność z mianownika ułamka $\frac{10}{\sqrt{5}}$.`, T`1. Mnożymy licznik i mianownik przez $\sqrt{5}$: $\frac{10\sqrt{5}}{5}$.` + '\n' + T`2. Skracamy: $2\sqrt{5}$.`, T`$\sqrt{5} \cdot \sqrt{5} = 5$, a nie $25$.`]
        ],
        trap: T`$\sqrt{9 + 16} = \sqrt{25} = 5$, a nie $\sqrt{9} + \sqrt{16} = 7$. Pierwiastka z sumy nie wolno rozbijać!`,
        fail: T`$\sqrt{a + b} = \sqrt{a} + \sqrt{b}$, np. $\sqrt{9 + 16} = 3 + 4 = 7$.`,
        win: T`Najpierw wykonaj dodawanie pod pierwiastkiem: $\sqrt{9 + 16} = \sqrt{25} = 5$.`,
        why: 'Prawa działań na pierwiastkach dotyczą wyłącznie mnożenia i dzielenia. Dla dodawania i odejmowania żaden taki wzór nie istnieje.',
        ckeTip: 'W zadaniu zamkniętym z pierwiastkami sprawdź wynik kalkulatorem prostym: porównaj przybliżenia dziesiętne opcji.',
        points: [T`Wyłączaj przed pierwiastek największy kwadrat: $\sqrt{72} = 6\sqrt{2}$.`, T`Dodawać można tylko pierwiastki z tej samej liczby.`, T`$\sqrt[3]{-27} = -3$, ale $\sqrt{-9}$ nie istnieje w liczbach rzeczywistych.`]
      }),
      gens: [rootCombine, rootSquareOfSum, rootRationalize, rootOddNegative, rootProduct]
    },
    {
      title: 'Logarytmy i ich własności',
      short_title: 'Logarytmy',
      time: '~6 min',
      pill: fixLegacy(legacy.logs, 5),
      gens: [logDiff, logSum, logCoef, logSpecialBase, logOfRoot]
    },
    {
      title: 'Wartość bezwzględna i przedziały na osi liczbowej',
      short_title: 'Wartość bezwzględna',
      time: '~6 min',
      pill: fixLegacy(legacy.abs, 4),
      gens: [absInequality, absEquation, absReverse, absValue]
    },
    {
      title: 'Procenty, kolejne zmiany cen i procent składany',
      short_title: 'Procenty i lokaty',
      time: '~6 min',
      pill: (() => {
        const p = fixLegacy(legacy.percent, null);
        p.core_formulas.push({ name: 'Procent składany (kapitalizacja roczna)', formula: T`K_n = K \cdot \left(1 + \frac{p}{100}\right)^n`, cke_page: 'str. 10', in_cke_sheet: true });
        p.worked_examples.push({
          title: 'Lokata dwuletnia',
          points: '1 pkt',
          problem: T`Na lokatę wpłacono $2000$ zł. Oprocentowanie wynosi $5\%$ w skali roku, a odsetki są dopisywane co roku. Ile będzie na lokacie po dwóch latach (bez podatku)?`,
          solution: T`1. Mnożnik roczny: $1 + \frac{5}{100} = 1{,}05$.` + '\n' + T`2. Po dwóch latach: $2000 \cdot 1{,}05^2 = 2000 \cdot 1{,}1025 = 2205$ zł.`,
          keyInsight: T`To nie jest $2000 \cdot 1{,}10$ – w drugim roku odsetki rosną także od odsetek z pierwszego roku.`
        });
        p.key_points.push(T`Lokata na $n$ lat z kapitalizacją roczną: $K_n = K \cdot \left(1 + \frac{p}{100}\right)^n$.`);
        p.matura_context = 'Zadania 2–6 w arkuszu • 1–2 pkt. Procenty i lokaty pojawiają się w każdym arkuszu.';
        return p;
      })(),
      gens: [pctDouble, pctTotalChange, pctDeposit, pctDepositFormula, pctOriginal, pctOf]
    }
  ]
};
