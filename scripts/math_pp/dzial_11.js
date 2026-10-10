import { T, mc, num, pf, pill, fr, par, sq, m, need, gcd, isSquare } from './lib.js';
import { figCuboid, figPyramid, figCylinder, figCone, figSphere } from './figures.js';

const pi = (n, d = 1) => {
  const g = gcd(n, d);
  const [a, b] = [n / g, d / g];
  return b === 1 ? `${a === 1 ? '' : a}\\pi` : `\\frac{${a === 1 ? '' : a}\\pi}{${b}}`;
};
/** k*sqrt(n)/d uproszczone */
const rf = (k, n, d = 1) => {
  let out = 1;
  let inn = n;
  for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) if (inn % (i * i) === 0) { out *= i; inn /= i * i; i = Math.floor(Math.sqrt(inn)) + 1; }
  let top = k * out;
  const g = gcd(top, d);
  top /= g;
  const den = d / g;
  const t = inn === 1 ? `${top}` : `${top === 1 ? '' : top}\\sqrt{${inn}}`;
  return den === 1 ? t : `\\frac{${t}}{${den}}`;
};
const tg = T`\operatorname{tg}`;
const TIP_PRISM = 'Karta wzorów, str. 25: graniastosłup – $V = P_p \\cdot h$, $P_c = 2P_p + P_b$.';
const TIP_PYR = 'Karta wzorów, str. 25: ostrosłup – $V = \\frac{1}{3} P_p \\cdot h$.';

// ---------- 11.1 Graniastosłupy ----------
const prismSquare = (r) => {
  const a = r.int(2, 9);
  const h = r.intNot(2, 12, a);
  const vol = r.bool();
  const v = vol ? a * a * h : 2 * a * a + 4 * a * h;
  return mc({
    diagram: figCuboid({ x: a, y: a, z: h }),
    title: vol ? 'Objętość graniastosłupa prawidłowego czworokątnego' : 'Pole powierzchni graniastosłupa prawidłowego czworokątnego',
    q: T`W graniastosłupie prawidłowym czworokątnym krawędź podstawy ma długość $${a}$, a wysokość jest równa $${h}$. ${vol ? 'Objętość' : 'Pole powierzchni całkowitej'} tego graniastosłupa jest ${vol ? 'równa' : 'równe'}`,
    ok: m(v),
    val: v,
    bad: vol ? [m(a * h), m(4 * a * h), m(fr(a * a * h, 3)), m(a * a + h), m(2 * a * a + 4 * a * h)] : [m(a * a + 4 * a * h), m(4 * a * h), m(2 * a * a + 2 * a * h), m(a * a * h), m(2 * a * a + a * h)],
    steps: vol ? [T`Podstawą jest kwadrat: $P_p = ${a}^2 = ${a * a}$.`, T`$V = P_p \cdot h = ${a * a} \cdot ${h} = ${v}$.`] : [T`Dwie podstawy: $2 \cdot ${a}^2 = ${2 * a * a}$.`, T`Cztery ściany boczne (prostokąty $${a} \times ${h}$): $4 \cdot ${a} \cdot ${h} = ${4 * a * h}$.`, T`$P_c = ${2 * a * a} + ${4 * a * h} = ${v}$.`],
    trap: vol ? T`W graniastosłupie nie ma $\frac{1}{3}$ – ten ułamek dotyczy ostrosłupa.` : T`Graniastosłup ma DWIE podstawy i cztery ściany boczne. Częsty błąd to policzenie tylko jednej podstawy.`,
    tip: TIP_PRISM
  });
};
const cube = (r) => {
  const a = r.int(2, 9);
  const kind = r.int(0, 3);
  if (kind === 0)
    return mc({
      diagram: figCuboid({ x: a, y: a, z: a, diag: '?' }),
      title: 'Przekątna sześcianu',
      q: T`Krawędź sześcianu ma długość $${a}$. Przekątna tego sześcianu ma długość`,
      ok: m(`${a}\\sqrt{3}`),
      val: a * Math.sqrt(3),
      bad: [m(`${a}\\sqrt{2}`), m(`${3 * a}`), m(`${2 * a}`), m(rf(a, 3, 2)), m(`${a * a}\\sqrt{3}`)],
      steps: [T`Przekątna podstawy: $${a}\sqrt{2}$.`, T`Przekątna sześcianu: $\sqrt{(${a}\sqrt{2})^2 + ${a}^2} = \sqrt{${2 * a * a} + ${a * a}} = \sqrt{${3 * a * a}} = ${a}\sqrt{3}$.`],
      trap: T`$a\sqrt{2}$ to przekątna ściany (kwadratu). Przekątna sześcianu biegnie przez jego wnętrze i ma długość $a\sqrt{3}$.`,
      tip: 'Sześcian o krawędzi $a$: przekątna ściany $a\\sqrt{2}$, przekątna sześcianu $a\\sqrt{3}$.'
    });
  if (kind === 1)
    return mc({
      title: 'Objętość sześcianu z pola powierzchni',
      q: T`Pole powierzchni całkowitej sześcianu jest równe $${6 * a * a}$. Objętość tego sześcianu jest równa`,
      ok: m(a ** 3),
      val: a ** 3,
      bad: [m(a * a), m(6 * a * a * a), m(fr(6 * a * a, 2)), m((a + 1) ** 3), m(6 * a)],
      steps: [T`$6a^2 = ${6 * a * a}$, więc $a^2 = ${a * a}$ i $a = ${a}$.`, T`$V = a^3 = ${a ** 3}$.`],
      trap: T`Sześcian ma $6$ ścian. Pole jednej ściany to $${6 * a * a} : 6 = ${a * a}$, a nie $${6 * a * a}$.`,
      tip: 'Sześcian o krawędzi $a$: $P_c = 6a^2$, $V = a^3$.'
    });
  if (kind === 2)
    return mc({
      title: 'Pole powierzchni sześcianu z przekątnej',
      q: T`Przekątna sześcianu ma długość $${a}\sqrt{3}$. Pole powierzchni całkowitej tego sześcianu jest równe`,
      ok: m(6 * a * a),
      val: 6 * a * a,
      bad: [m(a * a), m(18 * a * a), m(a ** 3), m(4 * a * a), m(6 * a)],
      steps: [T`Przekątna sześcianu to $a\sqrt{3}$, więc $a = ${a}$.`, T`$P_c = 6a^2 = 6 \cdot ${a * a} = ${6 * a * a}$.`],
      trap: T`Z przekątnej $a\sqrt{3}$ odczytujemy krawędź $a$, a nie $a\sqrt{3}$.`,
      tip: 'Sześcian o krawędzi $a$: przekątna ściany $a\\sqrt{2}$, przekątna sześcianu $a\\sqrt{3}$.'
    });
  return mc({
    title: 'Suma długości krawędzi sześcianu',
    q: T`Suma długości wszystkich krawędzi sześcianu jest równa $${12 * a}$. Objętość tego sześcianu jest równa`,
    ok: m(a ** 3),
    val: a ** 3,
    bad: [m((2 * a) ** 3 > 2000 ? a * a * 6 : (2 * a) ** 3), m(a * a), m(6 * a * a), m(12 * a * a), m((a + 1) ** 3)],
    steps: [T`Sześcian ma $12$ krawędzi: $12a = ${12 * a}$, więc $a = ${a}$.`, T`$V = a^3 = ${a ** 3}$.`],
    trap: T`Sześcian ma $12$ krawędzi (nie $6$ i nie $8$): $4$ na dole, $4$ na górze i $4$ pionowe.`,
    tip: 'Sześcian ma $8$ wierzchołków, $12$ krawędzi i $6$ ścian.'
  });
};
const cuboidDiagonal = (r) => {
  const [a, b, c, d] = r.pick([[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [3, 4, 12, 13], [4, 4, 7, 9], [2, 4, 4, 6], [6, 6, 7, 11], [2, 10, 11, 15]]);
  const exact = r.rnd() < 0.6;
  const [x, y, z] = exact ? r.shuffle([a, b, c]) : [r.int(1, 5), r.int(1, 5), r.int(1, 6)];
  const d2 = x * x + y * y + z * z;
  need(exact || !isSquare(d2));
  return mc({
    diagram: figCuboid({ x, y, z, diag: '?' }),
    title: 'Przekątna prostopadłościanu',
    q: T`Krawędzie prostopadłościanu wychodzące z jednego wierzchołka mają długości $${x}$, $${y}$ i $${z}$. Przekątna tego prostopadłościanu ma długość`,
    ok: m(sq(d2)),
    val: Math.sqrt(d2),
    bad: [m(`${x + y + z}`), m(sq(x * x + y * y)), m(`${d2}`), m(sq(x * y * z)), m(sq(2 * d2))],
    steps: [T`$d^2 = a^2 + b^2 + c^2 = ${x * x} + ${y * y} + ${z * z} = ${d2}$.`, T`$d = \sqrt{${d2}}${sq(d2) !== `\\sqrt{${d2}}` ? ` = ${sq(d2)}` : ''}$.`],
    trap: T`Do wzoru wchodzą wszystkie TRZY krawędzie. Pierwiastek z sumy dwóch kwadratów to dopiero przekątna jednej ściany.`,
    tip: 'Przekątna prostopadłościanu o krawędziach $a$, $b$, $c$: $d = \\sqrt{a^2 + b^2 + c^2}$.'
  });
};
const prismTriangular = (r) => {
  const a = r.int(1, 6) * 2;
  const h = r.int(2, 10);
  const vol = r.bool();
  // Pp = a^2 √3 /4
  return mc({
    title: vol ? 'Objętość graniastosłupa prawidłowego trójkątnego' : 'Pole powierzchni bocznej graniastosłupa prawidłowego trójkątnego',
    q: T`W graniastosłupie prawidłowym trójkątnym krawędź podstawy ma długość $${a}$, a wysokość jest równa $${h}$. ${vol ? 'Objętość tego graniastosłupa jest równa' : 'Pole powierzchni bocznej tego graniastosłupa jest równe'}`,
    ok: m(vol ? rf(a * a * h, 3, 4) : `${3 * a * h}`),
    val: vol ? (a * a * h * Math.sqrt(3)) / 4 : 3 * a * h,
    bad: vol ? [m(rf(a * a * h, 3, 12)), m(rf(a * a * h, 3, 2)), m(`${a * a * h}`), m(rf(a * h, 3, 4)), m(rf(a * a, 3, 4))] : [m(`${a * h}`), m(`${4 * a * h}`), m(`${2 * a * h}`), m(rf(3 * a * h, 3, 1)), m(`${3 * a * a}`)],
    steps: vol ? [T`Podstawą jest trójkąt równoboczny: $P_p = \frac{a^2\sqrt{3}}{4} = \frac{${a * a}\sqrt{3}}{4} = ${rf(a * a, 3, 4)}$.`, T`$V = P_p \cdot h = ${rf(a * a, 3, 4)} \cdot ${h} = ${rf(a * a * h, 3, 4)}$.`] : [T`Ściany boczne to trzy jednakowe prostokąty o wymiarach $${a} \times ${h}$.`, T`$P_b = 3 \cdot ${a} \cdot ${h} = ${3 * a * h}$.`],
    trap: vol ? T`Pole trójkąta równobocznego to $\frac{a^2\sqrt{3}}{4}$, a nie $a^2$. Podstawą nie jest kwadrat.` : T`Graniastosłup trójkątny ma TRZY ściany boczne, nie cztery.`,
    tip: TIP_PRISM
  });
};
const prismCounts = (r) => {
  const n = r.int(3, 12);
  const kind = r.pick(['krawędzi', 'wierzchołków', 'ścian']);
  const v = { krawędzi: 3 * n, wierzchołków: 2 * n, ścian: n + 2 }[kind];
  const names = { 3: 'trójkąt', 4: 'czworokąt', 5: 'pięciokąt', 6: 'sześciokąt', 7: 'siedmiokąt', 8: 'ośmiokąt', 9: 'dziewięciokąt', 10: 'dziesięciokąt', 11: 'jedenastokąt', 12: 'dwunastokąt' };
  return mc({
    title: 'Liczba krawędzi, wierzchołków i ścian graniastosłupa',
    q: T`Podstawą graniastosłupa jest ${names[n]}. Liczba wszystkich ${kind} tego graniastosłupa jest równa`,
    ok: m(v),
    val: v,
    bad: [m(3 * n), m(2 * n), m(n + 2), m(n + 1), m(2 * n + 2), m(n)].filter((x) => x !== m(v)),
    steps: [T`Podstawa ma $${n}$ wierzchołków i $${n}$ boków. Graniastosłup ma dwie takie podstawy i $${n}$ krawędzi bocznych.`, kind === 'krawędzi' ? T`Krawędzie: $${n} + ${n} + ${n} = ${3 * n}$.` : kind === 'wierzchołków' ? T`Wierzchołki: $2 \cdot ${n} = ${2 * n}$.` : T`Ściany: $${n}$ bocznych i $2$ podstawy, razem $${n + 2}$.`],
    trap: T`Nie myl graniastosłupa z ostrosłupem. Ostrosłup o tej samej podstawie ma $${2 * n}$ krawędzi, $${n + 1}$ wierzchołków i $${n + 1}$ ścian.`,
    tip: 'Graniastosłup o podstawie $n$-kąta: $3n$ krawędzi, $2n$ wierzchołków, $n + 2$ ściany.'
  });
};

// ---------- 11.2 Ostrosłupy ----------
const pyrVolume = (r) => {
  const a = r.int(2, 9);
  const H = r.int(2, 12);
  need((a * a * H) % 3 === 0);
  const V = (a * a * H) / 3;
  const askH = r.bool();
  return mc({
    diagram: figPyramid({ a, H: askH ? 'H = ?' : H }),
    title: askH ? 'Wysokość ostrosłupa z objętości' : 'Objętość ostrosłupa prawidłowego czworokątnego',
    q: askH ? T`Podstawą ostrosłupa prawidłowego czworokątnego jest kwadrat o boku $${a}$, a objętość ostrosłupa jest równa $${V}$. Wysokość tego ostrosłupa jest równa` : T`Podstawą ostrosłupa prawidłowego czworokątnego jest kwadrat o boku $${a}$, a wysokość ostrosłupa jest równa $${H}$. Objętość tego ostrosłupa jest równa`,
    ok: m(askH ? H : V),
    val: askH ? H : V,
    bad: askH ? [m(fr(V, a * a)), m(fr(3 * V, a)), m(H + 1), m(fr(V, 3 * a * a))] : [m(a * a * H), m(fr(a * H, 3)), m(fr(a * a * H, 2)), m(V + a), m(4 * a * H)],
    steps: [T`$V = \frac{1}{3} \cdot P_p \cdot H$, gdzie $P_p = ${a}^2 = ${a * a}$.`, askH ? T`$${V} = \frac{1}{3} \cdot ${a * a} \cdot H$, więc $H = \frac{${3 * V}}{${a * a}} = ${H}$.` : T`$V = \frac{1}{3} \cdot ${a * a} \cdot ${H} = ${V}$.`],
    trap: T`Ostrosłup ma objętość TRZY razy mniejszą niż graniastosłup o tej samej podstawie i wysokości – nie zapomnij o $\frac{1}{3}$.`,
    tip: TIP_PYR
  });
};
const pyrSlantHeight = (r) => {
  const [half, H, hb] = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [6, 8, 10], [8, 6, 10], [8, 15, 17], [12, 5, 13], [9, 12, 15]]);
  const a = 2 * half;
  const kind = r.int(0, 1);
  return mc({
    diagram: figPyramid({ a, H }),
    title: kind === 0 ? 'Wysokość ściany bocznej ostrosłupa' : 'Pole powierzchni bocznej ostrosłupa',
    q: T`W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $${a}$, a wysokość ostrosłupa jest równa $${H}$. ${kind === 0 ? 'Wysokość ściany bocznej tego ostrosłupa jest równa' : 'Pole powierzchni bocznej tego ostrosłupa jest równe'}`,
    ok: m(kind === 0 ? hb : 2 * a * hb),
    val: kind === 0 ? hb : 2 * a * hb,
    bad: kind === 0 ? [m(sq(H * H + a * a)), m(sq(H * H + 2 * half * half)), m(H + half), m(hb + 1)] : [m(4 * a * hb), m(a * hb), m(2 * a * H), m(a * a + 2 * a * hb), m(2 * a * hb + a)],
    steps: [T`Wysokość ostrosłupa $H$, połowa krawędzi podstawy $\frac{a}{2} = ${half}$ i wysokość ściany bocznej $h_b$ tworzą trójkąt prostokątny.`, T`$h_b = \sqrt{${H}^2 + ${half}^2} = \sqrt{${hb * hb}} = ${hb}$.`, ...(kind === 0 ? [] : [T`$P_b = 4 \cdot \frac{1}{2} \cdot ${a} \cdot ${hb} = ${2 * a * hb}$.`])],
    trap: T`Do twierdzenia Pitagorasa bierzemy POŁOWĘ krawędzi podstawy ($${half}$), bo spodek wysokości leży w środku kwadratu.`,
    tip: 'W ostrosłupie prawidłowym czworokątnym: $h_b^2 = H^2 + \\left(\\frac{a}{2}\\right)^2$.'
  });
};
const pyrLateralEdge = (r) => {
  const k = r.int(1, 5);
  const a = 2 * k; // przekątna podstawy 2k√2, połowa k√2
  const H = r.int(1, 9);
  const b2 = H * H + 2 * k * k;
  return mc({
    diagram: figPyramid({ a, H }),
    title: 'Krawędź boczna ostrosłupa',
    q: T`W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $${a}$, a wysokość ostrosłupa jest równa $${H}$. Krawędź boczna tego ostrosłupa ma długość`,
    ok: m(sq(b2)),
    val: Math.sqrt(b2),
    bad: [m(sq(H * H + k * k)), m(sq(H * H + a * a)), m(sq(H * H + 8 * k * k)), m(`${H + k}`), m(`${b2}`)],
    steps: [T`Przekątna podstawy: $${a}\sqrt{2}$, jej połowa: $${k === 1 ? '' : k}\sqrt{2}$.`, T`Wysokość, połowa przekątnej podstawy i krawędź boczna tworzą trójkąt prostokątny: $b^2 = ${H}^2 + (${k === 1 ? '' : k}\sqrt{2})^2 = ${H * H} + ${2 * k * k} = ${b2}$.`, T`$b = ${sq(b2)}$.`],
    trap: T`Krawędź boczna łączy wierzchołek z ROGIEM podstawy, więc potrzebna jest połowa przekątnej ($${k === 1 ? '' : k}\sqrt{2}$), a nie połowa boku ($${k}$).`,
    tip: 'W ostrosłupie prawidłowym czworokątnym: krawędź boczna $b^2 = H^2 + \\left(\\frac{a\\sqrt{2}}{2}\\right)^2$.'
  });
};
const tetrahedron = (r) => {
  const a = r.int(2, 12);
  const kind = r.int(0, 1);
  return mc({
    title: kind === 0 ? 'Pole powierzchni czworościanu foremnego' : 'Suma krawędzi czworościanu foremnego',
    q: kind === 0 ? T`Krawędź czworościanu foremnego ma długość $${a}$. Pole powierzchni całkowitej tego czworościanu jest równe` : T`Pole powierzchni całkowitej czworościanu foremnego jest równe $${a * a}\sqrt{3}$. Suma długości wszystkich krawędzi tego czworościanu jest równa`,
    ok: m(kind === 0 ? `${a * a}\\sqrt{3}` : `${6 * a}`),
    val: kind === 0 ? a * a * Math.sqrt(3) : 6 * a,
    bad: kind === 0 ? [m(rf(a * a, 3, 4)), m(`${4 * a * a}`), m(rf(3 * a * a, 3, 4)), m(`${a * a}`), m(rf(a * a, 3, 2))] : [m(`${4 * a}`), m(`${3 * a}`), m(`${8 * a}`), m(`${6 * a * a}`), m(`${12 * a}`)],
    steps: kind === 0 ? [T`Czworościan foremny ma cztery ściany – trójkąty równoboczne o boku $${a}$.`, T`$P_c = 4 \cdot \frac{${a * a}\sqrt{3}}{4} = ${a * a}\sqrt{3}$.`] : [T`$P_c = 4 \cdot \frac{a^2\sqrt{3}}{4} = a^2\sqrt{3}$, więc $a^2 = ${a * a}$ i $a = ${a}$.`, T`Czworościan ma $6$ krawędzi: $6 \cdot ${a} = ${6 * a}$.`],
    trap: kind === 0 ? T`Czworościan ma CZTERY ściany. Pole jednej to $\frac{a^2\sqrt{3}}{4}$, a czterech – po prostu $a^2\sqrt{3}$.` : T`Czworościan ma $6$ krawędzi (trzy w podstawie i trzy boczne), a nie $4$.`,
    tip: 'Czworościan foremny: 4 ściany, 4 wierzchołki, 6 krawędzi; $P_c = a^2\\sqrt{3}$.'
  });
};
const pyrCounts = (r) => {
  const n = r.int(3, 12);
  const kind = r.pick(['krawędzi', 'wierzchołków', 'ścian']);
  const v = { krawędzi: 2 * n, wierzchołków: n + 1, ścian: n + 1 }[kind];
  const names = { 3: 'trójkąt', 4: 'czworokąt', 5: 'pięciokąt', 6: 'sześciokąt', 7: 'siedmiokąt', 8: 'ośmiokąt', 9: 'dziewięciokąt', 10: 'dziesięciokąt', 11: 'jedenastokąt', 12: 'dwunastokąt' };
  return mc({
    title: 'Liczba krawędzi, wierzchołków i ścian ostrosłupa',
    q: T`Podstawą ostrosłupa jest ${names[n]}. Liczba wszystkich ${kind} tego ostrosłupa jest równa`,
    ok: m(v),
    val: v,
    bad: [m(3 * n), m(2 * n), m(n + 2), m(n + 1), m(n), m(2 * n + 1)].filter((x) => x !== m(v)),
    steps: [T`Podstawa ma $${n}$ wierzchołków i $${n}$ boków, a z wierzchołka ostrosłupa wychodzi $${n}$ krawędzi bocznych.`, kind === 'krawędzi' ? T`Krawędzie: $${n} + ${n} = ${2 * n}$.` : kind === 'wierzchołków' ? T`Wierzchołki: $${n}$ w podstawie i jeden na szczycie, razem $${n + 1}$.` : T`Ściany: $${n}$ bocznych i jedna podstawa, razem $${n + 1}$.`],
    trap: T`Ostrosłup ma jedną podstawę. Graniastosłup o tej samej podstawie miałby $${3 * n}$ krawędzi i $${2 * n}$ wierzchołków.`,
    tip: 'Ostrosłup o podstawie $n$-kąta: $2n$ krawędzi, $n + 1$ wierzchołków, $n + 1$ ścian.'
  });
};

// ---------- 11.3 Kąty w bryłach ----------
const angleFaceTan = (r) => {
  const half = r.int(1, 6);
  const H = r.intNot(1, 9, half);
  const a = 2 * half;
  return mc({
    diagram: figPyramid({ a, H }),
    title: 'Kąt nachylenia ściany bocznej do podstawy',
    q: T`W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $${a}$, a wysokość ostrosłupa jest równa $${H}$. Tangens kąta nachylenia ściany bocznej do płaszczyzny podstawy jest równy`,
    ok: m(fr(H, half)),
    val: H / half,
    bad: [m(fr(half, H)), m(fr(H, a)), m(rf(H, 2, a)), m(fr(a, H)), m(fr(2 * H, half))],
    steps: [T`Kąt ściany bocznej leży w trójkącie prostokątnym o przyprostokątnych: wysokość ostrosłupa $H = ${H}$ i połowa krawędzi podstawy $\frac{a}{2} = ${half}$.`, T`$${tg}\alpha = \frac{H}{\frac{a}{2}} = \frac{${H}}{${half}} = ${fr(H, half)}$.`],
    trap: T`Dla kąta ŚCIANY bocznej bierzemy połowę boku podstawy ($${half}$). Połowa przekątnej dotyczy kąta KRAWĘDZI bocznej.`,
    tip: 'Kąt ściany bocznej: wierzchołek – środek krawędzi podstawy – spodek wysokości. Kąt krawędzi bocznej: wierzchołek – róg podstawy – spodek wysokości.'
  });
};
const angleEdgeTan = (r) => {
  const k = r.int(1, 5);
  const a = 2 * k;
  const H = r.int(1, 9);
  // tg = H/(k√2) = H√2/(2k)
  return mc({
    diagram: figPyramid({ a, H }),
    title: 'Kąt nachylenia krawędzi bocznej do podstawy',
    q: T`W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $${a}$, a wysokość ostrosłupa jest równa $${H}$. Tangens kąta nachylenia krawędzi bocznej do płaszczyzny podstawy jest równy`,
    ok: m(rf(H, 2, 2 * k)),
    val: (H * Math.SQRT2) / (2 * k),
    bad: [m(fr(H, k)), m(rf(2 * k, 2, 2 * H)), m(fr(H, a)), m(rf(H, 2, k)), m(rf(H, 2, 4 * k))],
    steps: [T`Krawędź boczna „opiera się” na połowie przekątnej podstawy: $\frac{${a}\sqrt{2}}{2} = ${k === 1 ? '' : k}\sqrt{2}$.`, T`$${tg}\alpha = \frac{H}{${k === 1 ? '' : k}\sqrt{2}} = \frac{${H}}{${k === 1 ? '' : k}\sqrt{2}} = ${rf(H, 2, 2 * k)}$.`],
    trap: T`Dla kąta KRAWĘDZI bocznej bierzemy połowę przekątnej podstawy ($${k === 1 ? '' : k}\sqrt{2}$), a nie połowę boku ($${k}$).`,
    tip: 'Kąt ściany bocznej: wierzchołek – środek krawędzi podstawy – spodek wysokości. Kąt krawędzi bocznej: wierzchołek – róg podstawy – spodek wysokości.'
  });
};
const angleGivenFindH = (r) => {
  const half = r.int(1, 6);
  const a = 2 * half;
  const ang = r.pick([30, 45, 60]);
  const face = r.bool();
  // ściana: H = half * tg ; krawędź: H = half√2 * tg
  const tgv = { 30: [1, 3, 3], 45: [1, 1, 1], 60: [1, 3, 1] }[ang]; // k√n/d
  const n = face ? tgv[1] : tgv[1] * 2;
  const ok = rf(half * tgv[0], n, tgv[2]);
  return mc({
    diagram: figPyramid({ a, H: 'H = ?' }),
    title: 'Wysokość ostrosłupa z kąta nachylenia',
    q: T`W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $${a}$, a ${face ? 'ściana boczna jest nachylona' : 'krawędź boczna jest nachylona'} do płaszczyzny podstawy pod kątem $${ang}^\circ$. Wysokość tego ostrosłupa jest równa`,
    ok: m(ok),
    val: half * (face ? 1 : Math.SQRT2) * Math.tan((ang * Math.PI) / 180),
    bad: [m(rf(half * tgv[0], face ? tgv[1] * 2 : tgv[1], tgv[2])), m(rf(a * tgv[0], n, tgv[2])), m(rf(half, ang === 45 ? 3 : n * 3, ang === 60 ? 3 : 1)), m(`${a}`), m(rf(half, 3, 2))],
    steps: [face ? T`Dla ściany bocznej: $${tg} ${ang}^\circ = \frac{H}{\frac{a}{2}} = \frac{H}{${half}}$.` : T`Dla krawędzi bocznej: $${tg} ${ang}^\circ = \frac{H}{\frac{a\sqrt{2}}{2}} = \frac{H}{${half === 1 ? '' : half}\sqrt{2}}$.`, T`$${tg} ${ang}^\circ = ${ang === 30 ? '\\frac{\\sqrt{3}}{3}' : ang === 45 ? '1' : '\\sqrt{3}'}$, więc $H = ${ok}$.`],
    trap: face ? T`Kąt nachylenia ściany bocznej mierzymy przy środku krawędzi podstawy – w rachunku występuje $\frac{a}{2} = ${half}$.` : T`Kąt nachylenia krawędzi bocznej mierzymy przy wierzchołku podstawy – w rachunku występuje połowa przekątnej.`,
    tip: 'Karta wzorów, str. 12: $\\operatorname{tg} 30^\\circ = \\frac{\\sqrt{3}}{3}$, $\\operatorname{tg} 45^\\circ = 1$, $\\operatorname{tg} 60^\\circ = \\sqrt{3}$.'
  });
};
const angleCuboidDiagonal = (r) => {
  const [a, b, dp] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]]);
  const c = r.int(1, 12);
  const fn = r.pick(['tg', 'sin']);
  const d2 = dp * dp + c * c;
  need(fn === 'tg' || isSquare(d2));
  const d = Math.sqrt(d2);
  return mc({
    diagram: figCuboid({ x: a, y: b, z: c, diag: 'd' }),
    title: 'Kąt nachylenia przekątnej prostopadłościanu',
    q: T`Podstawą prostopadłościanu jest prostokąt o bokach $${a}$ i $${b}$, a wysokość prostopadłościanu jest równa $${c}$. ${fn === 'tg' ? 'Tangens' : 'Sinus'} kąta nachylenia przekątnej prostopadłościanu do płaszczyzny podstawy jest równy`,
    ok: m(fn === 'tg' ? fr(c, dp) : fr(c, d)),
    val: fn === 'tg' ? c / dp : c / d,
    bad: fn === 'tg' ? [m(fr(dp, c)), m(fr(c, a)), m(fr(c, b)), m(fr(c, a + b))] : [m(fr(dp, d)), m(fr(c, dp)), m(fr(d, c)), m(fr(c, a + b))],
    steps: [T`Przekątna podstawy: $d_p = \sqrt{${a}^2 + ${b}^2} = ${dp}$.`, fn === 'tg' ? T`Kąt leży między przekątną bryły a przekątną podstawy: $${tg}\alpha = \frac{c}{d_p} = ${fr(c, dp)}$.` : T`Przekątna prostopadłościanu: $d = \sqrt{${dp}^2 + ${c}^2} = ${d}$. $\sin\alpha = \frac{c}{d} = ${fr(c, d)}$.`],
    trap: T`Kąt nachylenia przekątnej bryły do podstawy to kąt między tą przekątną a PRZEKĄTNĄ PODSTAWY, a nie krawędzią podstawy.`,
    tip: 'Kąt między prostą a płaszczyzną to kąt między tą prostą a jej rzutem prostokątnym na płaszczyznę.'
  });
};
const angleIdentify = (r) => {
  const variants = [
    ['ściany bocznej do płaszczyzny podstawy', 'wysokością ściany bocznej a odcinkiem łączącym środek podstawy ze środkiem krawędzi podstawy', ['krawędzią boczną a przekątną podstawy', 'wysokością ostrosłupa a krawędzią boczną', 'krawędzią boczną a krawędzią podstawy']],
    ['krawędzi bocznej do płaszczyzny podstawy', 'krawędzią boczną a przekątną podstawy', ['wysokością ściany bocznej a odcinkiem łączącym środek podstawy ze środkiem krawędzi podstawy', 'krawędzią boczną a krawędzią podstawy', 'wysokością ostrosłupa a wysokością ściany bocznej']]
  ];
  const stems = [
    (w) => T`W ostrosłupie prawidłowym czworokątnym kąt nachylenia ${w} to kąt między`,
    (w) => T`Dany jest ostrosłup prawidłowy czworokątny. Kątem nachylenia ${w} jest kąt między`,
    (w) => T`W ostrosłupie prawidłowym czworokątnym $ABCDS$ o wierzchołku $S$ kąt nachylenia ${w} jest kątem między`,
    (w) => T`Rozważamy ostrosłup prawidłowy czworokątny. Kątem nachylenia ${w} jest kąt między`,
    (w) => T`Podstawą ostrosłupa prawidłowego jest kwadrat. Kąt nachylenia ${w} to kąt między`,
    (w) => T`W ostrosłupie prawidłowym o podstawie kwadratowej kątem nachylenia ${w} nazywamy kąt między`,
    (w) => T`Ostrosłup prawidłowy czworokątny ma wysokość $H$ i krawędź podstawy $a$. Kąt nachylenia ${w} to kąt między`,
    (w) => T`W ostrosłupie prawidłowym czworokątnym wskaż, między jakimi odcinkami leży kąt nachylenia ${w}. Jest to kąt między`
  ];
  const [what, ok, bad] = r.pick(variants);
  return mc({
    title: 'Rozpoznawanie kąta w ostrosłupie',
    q: r.pick(stems)(what),
    ok,
    bad,
    steps: [T`Kąt między ${what.startsWith('ściany') ? 'ścianą a płaszczyzną podstawy (kąt dwuścienny)' : 'prostą a płaszczyzną'} wyznaczamy, rzutując na płaszczyznę podstawy.`, what.startsWith('ściany') ? T`Prowadzimy wysokość ściany bocznej i łączymy jej koniec (środek krawędzi podstawy) ze spodkiem wysokości ostrosłupa. Oba odcinki są prostopadłe do krawędzi podstawy – kąt między nimi to szukany kąt.` : T`Rzutem krawędzi bocznej na podstawę jest połowa przekątnej podstawy, więc szukany kąt leży między krawędzią boczną a przekątną podstawy.`],
    trap: T`Kąt ściany bocznej „zaczyna się” w środku krawędzi podstawy, a kąt krawędzi bocznej – w wierzchołku podstawy. To dwa różne kąty.`,
    tip: 'Kąt ściany bocznej: wierzchołek – środek krawędzi podstawy – spodek wysokości. Kąt krawędzi bocznej: wierzchołek – róg podstawy – spodek wysokości.'
  });
};

// ---------- 11.4 Bryły obrotowe ----------
const solidVolume = (r) => {
  const rr = r.int(1, 9);
  const h = r.int(2, 12);
  const kind = r.pick(['walec', 'stożek', 'kula-V', 'kula-P']);
  if (kind === 'walec')
    return mc({
      diagram: figCylinder({ r: rr, h }),
      title: 'Objętość walca',
      q: T`Promień podstawy walca jest równy $${rr}$, a jego wysokość $${h}$. Objętość tego walca jest równa`,
      ok: m(pi(rr * rr * h)),
      val: Math.PI * rr * rr * h,
      bad: [m(pi(rr * rr * h, 3)), m(pi(2 * rr * h)), m(pi(rr * h)), m(pi(rr * rr * h * 2)), m(pi(rr * rr + h))],
      steps: [T`$V = \pi r^2 h$.`, T`$V = \pi \cdot ${rr * rr} \cdot ${h} = ${pi(rr * rr * h)}$.`],
      trap: T`$2\pi r h$ to pole powierzchni bocznej walca, a nie objętość. W objętości promień jest podniesiony do kwadratu.`,
      tip: 'Karta wzorów, str. 25: walec – $V = \\pi r^2 h$, $P_b = 2\\pi r h$.'
    });
  if (kind === 'stożek')
    return mc({
      diagram: figCone({ r: rr, h }),
      title: 'Objętość stożka',
      q: T`Promień podstawy stożka jest równy $${rr}$, a jego wysokość $${h}$. Objętość tego stożka jest równa`,
      ok: m(pi(rr * rr * h, 3)),
      val: (Math.PI * rr * rr * h) / 3,
      bad: [m(pi(rr * rr * h)), m(pi(rr * h, 3)), m(pi(2 * rr * rr * h, 3)), m(pi(rr * rr * h, 2)), m(pi(rr * rr * h, 6))],
      steps: [T`$V = \frac{1}{3}\pi r^2 h$.`, T`$V = \frac{1}{3} \cdot \pi \cdot ${rr * rr} \cdot ${h} = ${pi(rr * rr * h, 3)}$.`],
      trap: T`Stożek to „ostrosłup o podstawie koła” – jego objętość to $\frac{1}{3}$ objętości walca o tej samej podstawie i wysokości.`,
      tip: 'Karta wzorów, str. 26: stożek – $V = \\frac{1}{3}\\pi r^2 h$, $P_b = \\pi r l$.'
    });
  if (kind === 'kula-V')
    return mc({
      diagram: figSphere({ r: rr }),
      title: 'Objętość kuli',
      q: T`Promień kuli jest równy $${rr}$. Objętość tej kuli jest równa`,
      ok: m(pi(4 * rr ** 3, 3)),
      val: (4 / 3) * Math.PI * rr ** 3,
      bad: [m(pi(4 * rr * rr)), m(pi(rr ** 3, 3)), m(pi(4 * rr ** 3)), m(pi(4 * rr * rr, 3)), m(pi(rr ** 3))],
      steps: [T`$V = \frac{4}{3}\pi r^3$.`, T`$V = \frac{4}{3} \cdot \pi \cdot ${rr ** 3} = ${pi(4 * rr ** 3, 3)}$.`],
      trap: T`Objętość kuli zawiera $r^3$ i ułamek $\frac{4}{3}$. Wzór $4\pi r^2$ to pole powierzchni kuli.`,
      tip: 'Karta wzorów, str. 26: kula – $V = \\frac{4}{3}\\pi r^3$, $P = 4\\pi r^2$.'
    });
  return mc({
    diagram: figSphere({ r: rr }),
    title: 'Pole powierzchni kuli',
    q: T`Promień kuli jest równy $${rr}$. Pole powierzchni tej kuli jest równe`,
    ok: m(pi(4 * rr * rr)),
    val: 4 * Math.PI * rr * rr,
    bad: [m(pi(rr * rr)), m(pi(4 * rr ** 3, 3)), m(pi(2 * rr * rr)), m(pi(4 * rr)), m(pi(8 * rr * rr))],
    steps: [T`$P = 4\pi r^2$.`, T`$P = 4 \cdot \pi \cdot ${rr * rr} = ${pi(4 * rr * rr)}$.`],
    trap: T`Pole powierzchni kuli to cztery pola koła o tym samym promieniu: $4\pi r^2$, a nie $\pi r^2$.`,
    tip: 'Karta wzorów, str. 26: kula – $V = \\frac{4}{3}\\pi r^3$, $P = 4\\pi r^2$.'
  });
};
const coneSlant = (r) => {
  const [rr, h, l] = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [6, 8, 10], [8, 6, 10], [8, 15, 17], [12, 5, 13], [9, 12, 15]]);
  const kind = r.int(0, 2);
  if (kind === 0)
    return mc({
      diagram: figCone({ r: rr, h, l: '?' }),
      title: 'Tworząca stożka',
      q: T`Promień podstawy stożka jest równy $${rr}$, a wysokość stożka $${h}$. Tworząca tego stożka ma długość`,
      ok: m(l),
      val: l,
      bad: [m(rr + h), m(sq(Math.abs(h * h - rr * rr) || 2)), m(l + 1), m(sq(4 * rr * rr + h * h))],
      steps: [T`Promień, wysokość i tworząca tworzą trójkąt prostokątny.`, T`$l = \sqrt{${rr}^2 + ${h}^2} = \sqrt{${l * l}} = ${l}$.`],
      trap: T`Tworząca jest przeciwprostokątną – jest dłuższa od wysokości i od promienia.`,
      tip: 'W stożku: $l^2 = r^2 + h^2$ ($l$ – tworząca, $r$ – promień podstawy, $h$ – wysokość).'
    });
  if (kind === 1)
    return mc({
      diagram: figCone({ r: rr, h }),
      title: 'Pole powierzchni bocznej stożka',
      q: T`Promień podstawy stożka jest równy $${rr}$, a wysokość stożka $${h}$. Pole powierzchni bocznej tego stożka jest równe`,
      ok: m(pi(rr * l)),
      val: Math.PI * rr * l,
      bad: [m(pi(rr * h)), m(pi(2 * rr * l)), m(pi(rr * rr + rr * l)), m(pi(rr * rr * h, 3)), m(pi(rr * l, 2))],
      steps: [T`Tworząca: $l = \sqrt{${rr}^2 + ${h}^2} = ${l}$.`, T`$P_b = \pi r l = \pi \cdot ${rr} \cdot ${l} = ${pi(rr * l)}$.`],
      trap: T`We wzorze $P_b = \pi r l$ występuje TWORZĄCA $l$, a nie wysokość $h$. Tworzącą trzeba najpierw policzyć.`,
      tip: 'Karta wzorów, str. 26: stożek – $V = \\frac{1}{3}\\pi r^2 h$, $P_b = \\pi r l$.'
    });
  return mc({
    diagram: figCone({ r: rr, l }),
    title: 'Objętość stożka z tworzącej',
    q: T`Tworząca stożka ma długość $${l}$, a promień jego podstawy jest równy $${rr}$. Objętość tego stożka jest równa`,
    ok: m(pi(rr * rr * h, 3)),
    val: (Math.PI * rr * rr * h) / 3,
    bad: [m(pi(rr * rr * l, 3)), m(pi(rr * rr * h)), m(pi(rr * l)), m(pi(rr * h, 3)), m(pi(rr * rr * l))],
    steps: [T`Wysokość: $h = \sqrt{${l}^2 - ${rr}^2} = ${h}$.`, T`$V = \frac{1}{3}\pi \cdot ${rr * rr} \cdot ${h} = ${pi(rr * rr * h, 3)}$.`],
    trap: T`W objętości występuje WYSOKOŚĆ $h$, a nie tworząca $l$. Wysokość trzeba najpierw policzyć z twierdzenia Pitagorasa.`,
    tip: 'W stożku: $l^2 = r^2 + h^2$ ($l$ – tworząca, $r$ – promień podstawy, $h$ – wysokość).'
  });
};
const cylinderSection = (r) => {
  const rr = r.int(1, 8);
  const kind = r.int(0, 1);
  if (kind === 0)
    return mc({
      title: 'Walec o przekroju osiowym w kształcie kwadratu',
      q: T`Przekrój osiowy walca jest kwadratem o boku długości $${2 * rr}$. Objętość tego walca jest równa`,
      ok: m(pi(2 * rr ** 3)),
      val: 2 * Math.PI * rr ** 3,
      bad: [m(pi(8 * rr ** 3)), m(pi(4 * rr ** 3)), m(pi(rr ** 3)), m(pi(4 * rr * rr)), m(pi(2 * rr ** 3, 3))],
      steps: [T`Bok kwadratu to jednocześnie średnica podstawy i wysokość walca: $2r = ${2 * rr}$, więc $r = ${rr}$, $h = ${2 * rr}$.`, T`$V = \pi r^2 h = \pi \cdot ${rr * rr} \cdot ${2 * rr} = ${pi(2 * rr ** 3)}$.`],
      trap: T`Bok przekroju to ŚREDNICA podstawy, więc promień jest o połowę mniejszy: $r = ${rr}$, a nie $${2 * rr}$.`,
      tip: 'Przekrój osiowy walca to prostokąt o wymiarach $2r \\times h$.'
    });
  const h = r.int(2, 10);
  return mc({
    diagram: figCylinder({ r: rr, h }),
    title: 'Pole powierzchni bocznej walca',
    q: T`Promień podstawy walca jest równy $${rr}$, a wysokość walca $${h}$. Pole powierzchni bocznej tego walca jest równe`,
    ok: m(pi(2 * rr * h)),
    val: 2 * Math.PI * rr * h,
    bad: [m(pi(rr * h)), m(pi(rr * rr * h)), m(pi(2 * rr * h + 2 * rr * rr)), m(pi(4 * rr * h)), m(pi(2 * rr * rr))],
    steps: [T`Powierzchnia boczna walca po rozwinięciu jest prostokątem o bokach $2\pi r$ (obwód podstawy) i $h$.`, T`$P_b = 2\pi r h = 2\pi \cdot ${rr} \cdot ${h} = ${pi(2 * rr * h)}$.`],
    trap: T`Pole boczne to obwód podstawy razy wysokość ($2\pi r h$), a nie pole podstawy razy wysokość – to byłaby objętość.`,
    tip: 'Karta wzorów, str. 25: walec – $V = \\pi r^2 h$, $P_b = 2\\pi r h$.'
  });
};
const coneAngle = (r) => {
  const rr = r.int(1, 9);
  const kind = r.int(0, 2);
  if (kind === 0)
    return mc({
      title: 'Kąt rozwarcia stożka',
      q: T`Kąt rozwarcia stożka ma miarę $60^\circ$, a promień podstawy jest równy $${rr}$. Tworząca tego stożka ma długość`,
      ok: m(2 * rr),
      val: 2 * rr,
      bad: [m(rf(rr, 3)), m(rf(rr, 2)), m(rr), m(rf(2 * rr, 3, 3)), m(3 * rr)],
      steps: [T`Przekrój osiowy stożka jest trójkątem równoramiennym o kącie między ramionami $60^\circ$, czyli trójkątem równobocznym.`, T`Tworząca jest równa średnicy podstawy: $l = 2r = ${2 * rr}$.`],
      trap: T`Kąt rozwarcia to kąt między dwiema tworzącymi w przekroju osiowym, a nie kąt między tworzącą a podstawą.`,
      tip: 'Przekrój osiowy stożka to trójkąt równoramienny o podstawie $2r$ i ramionach $l$.'
    });
  if (kind === 1) {
    const ang = r.pick([30, 45, 60]);
    const ok = { 30: rf(rr, 3, 3), 45: `${rr}`, 60: rf(rr, 3) }[ang];
    return mc({
      diagram: figCone({ r: rr, h: '?', angle: `${ang}°` }),
      title: 'Wysokość stożka z kąta nachylenia tworzącej',
      q: T`Tworząca stożka jest nachylona do płaszczyzny podstawy pod kątem $${ang}^\circ$, a promień podstawy jest równy $${rr}$. Wysokość tego stożka jest równa`,
      ok: m(ok),
      val: rr * Math.tan((ang * Math.PI) / 180),
      bad: [m(rf(rr, 3, 3)), m(`${rr}`), m(rf(rr, 3)), m(`${2 * rr}`), m(rf(rr, 2)), m(rf(rr, 3, 2))].filter((x) => x !== m(ok)),
      steps: [T`W trójkącie prostokątnym (promień, wysokość, tworząca): $${tg} ${ang}^\circ = \frac{h}{r} = \frac{h}{${rr}}$.`, T`$h = ${rr} \cdot ${tg} ${ang}^\circ = ${ok}$.`],
      trap: T`Kąt nachylenia tworzącej do podstawy leży przy promieniu. Naprzeciw niego jest wysokość, więc używamy tangensa: $\frac{h}{r}$.`,
      tip: 'Kąt między tworzącą a podstawą stożka: $\\operatorname{tg}\\alpha = \\frac{h}{r}$, $\\cos\\alpha = \\frac{r}{l}$.'
    });
  }
  const k = r.pick([2, 3, 4, 5]);
  return mc({
    diagram: figCone({ r: rr, l: k * rr }),
    title: 'Cosinus kąta nachylenia tworzącej',
    q: T`Promień podstawy stożka jest równy $${rr}$, a tworząca ma długość $${k * rr}$. Cosinus kąta nachylenia tworzącej do płaszczyzny podstawy jest równy`,
    ok: m(fr(1, k)),
    val: 1 / k,
    bad: [m(`${k}`), m(rf(1, k * k - 1, k)), m(fr(1, k + 1)), m(fr(k - 1, k)), m(fr(1, 2 * k))],
    steps: [T`W trójkącie prostokątnym przyprostokątną przy kącie jest promień, a przeciwprostokątną – tworząca.`, T`$\cos\alpha = \frac{r}{l} = \frac{${rr}}{${k * rr}} = ${fr(1, k)}$.`],
    trap: T`Cosinus to „przy kącie przez przeciwprostokątną”, czyli $\frac{r}{l}$. Stosunek $\frac{l}{r}$ jest większy od 1 i nie może być cosinusem.`,
    tip: 'Kąt między tworzącą a podstawą stożka: $\\operatorname{tg}\\alpha = \\frac{h}{r}$, $\\cos\\alpha = \\frac{r}{l}$.'
  });
};
const sphereFromArea = (r) => {
  const rr = r.pick([1, 2, 3, 4, 5, 6, 9]);
  const fromArea = r.bool();
  return mc({
    title: fromArea ? 'Objętość kuli z pola powierzchni' : 'Pole powierzchni kuli z objętości',
    q: fromArea ? T`Pole powierzchni kuli jest równe $${pi(4 * rr * rr)}$. Objętość tej kuli jest równa` : T`Objętość kuli jest równa $${pi(4 * rr ** 3, 3)}$. Pole powierzchni tej kuli jest równe`,
    ok: m(fromArea ? pi(4 * rr ** 3, 3) : pi(4 * rr * rr)),
    val: fromArea ? (4 / 3) * Math.PI * rr ** 3 : 4 * Math.PI * rr * rr,
    bad: fromArea ? [m(pi(4 * rr ** 3)), m(pi(rr ** 3, 3)), m(pi(4 * (2 * rr) ** 3, 3)), m(pi(rr ** 3)), m(pi(16 * rr * rr, 3))] : [m(pi(rr * rr)), m(pi(4 * rr)), m(pi(16 * rr * rr)), m(pi(4 * rr ** 3)), m(pi(2 * rr * rr))],
    steps: fromArea ? [T`$4\pi r^2 = ${pi(4 * rr * rr)}$, więc $r^2 = ${rr * rr}$ i $r = ${rr}$.`, T`$V = \frac{4}{3}\pi r^3 = \frac{4}{3}\pi \cdot ${rr ** 3} = ${pi(4 * rr ** 3, 3)}$.`] : [T`$\frac{4}{3}\pi r^3 = ${pi(4 * rr ** 3, 3)}$, więc $r^3 = ${rr ** 3}$ i $r = ${rr}$.`, T`$P = 4\pi r^2 = 4\pi \cdot ${rr * rr} = ${pi(4 * rr * rr)}$.`],
    trap: T`Najpierw wyznacz promień, potem użyj drugiego wzoru. Pole zawiera $r^2$, objętość $r^3$.`,
    tip: 'Karta wzorów, str. 26: kula – $V = \\frac{4}{3}\\pi r^3$, $P = 4\\pi r^2$.'
  });
};

// ---------- 11.5 Bryły podobne i skala ----------
const simVolume = (r) => {
  const k = r.pick([2, 3, 4, 5, 10]);
  const V1 = r.pick([2, 3, 4, 5, 6, 8, 10, 12, 20]);
  const solid = r.pick(['Ostrosłup', 'Graniastosłup', 'Stożek', 'Walec']);
  const gen = { Ostrosłup: 'ostrosłupa', Graniastosłup: 'graniastosłupa', Stożek: 'stożka', Walec: 'walca' }[solid];
  const up = r.bool();
  const V2 = V1 * k ** 3;
  return mc({
    title: 'Objętości brył podobnych',
    q: up ? T`${solid} $B_2$ jest podobny do ${gen} $B_1$ w skali $k = ${k}$. Objętość ${gen} $B_1$ jest równa $${V1}$. Objętość ${gen} $B_2$ jest równa` : T`${solid} $B_2$ jest podobny do ${gen} $B_1$ w skali $k = ${k}$. Objętość ${gen} $B_2$ jest równa $${V2}$. Objętość ${gen} $B_1$ jest równa`,
    ok: m(up ? V2 : V1),
    val: up ? V2 : V1,
    bad: up ? [m(V1 * k * k), m(V1 * k), m(V1 * 3 * k), m(V1 * k ** 3 + V1)] : [m(fr(V2, k * k)), m(fr(V2, k)), m(fr(V2, 3 * k)), m(V1 + 1)],
    steps: [T`Stosunek objętości brył podobnych jest równy sześcianowi skali: $\frac{V_2}{V_1} = k^3 = ${k ** 3}$.`, up ? T`$V_2 = ${V1} \cdot ${k ** 3} = ${V2}$.` : T`$V_1 = \frac{${V2}}{${k ** 3}} = ${V1}$.`],
    trap: T`Objętość zmienia się $k^3$ razy – nie $k$ razy (jak długości) ani $k^2$ razy (jak pola).`,
    tip: 'Bryły podobne w skali $k$: długości zmieniają się $k$ razy, pola $k^2$ razy, objętości $k^3$ razy.'
  });
};
const simSurface = (r) => {
  const k = r.pick([2, 3, 4, 5]);
  const P1 = r.pick([6, 10, 12, 24, 30, 54]);
  return mc({
    title: 'Pola powierzchni brył podobnych',
    q: T`Każdą krawędź graniastosłupa o polu powierzchni całkowitej $${P1}$ zwiększono $${k}$ razy. Pole powierzchni całkowitej otrzymanego graniastosłupa jest równe`,
    ok: m(P1 * k * k),
    val: P1 * k * k,
    bad: [m(P1 * k), m(P1 * k ** 3), m(P1 * 2 * k), m(P1 * k * k + P1), m(P1 + k * k)],
    steps: [T`Nowa bryła jest podobna do danej w skali $k = ${k}$.`, T`Pola zmieniają się $k^2 = ${k * k}$ razy: $${P1} \cdot ${k * k} = ${P1 * k * k}$.`],
    trap: T`Pole powierzchni to wielkość „dwuwymiarowa” – rośnie $k^2$ razy. Sześcian skali dotyczy objętości.`,
    tip: 'Bryły podobne w skali $k$: długości zmieniają się $k$ razy, pola $k^2$ razy, objętości $k^3$ razy.'
  });
};
const simCubeEdge = (r) => {
  const k = r.pick([2, 3, 4, 5]);
  const kind = r.int(0, 1);
  return mc({
    title: 'Zmiana objętości przy zmianie krawędzi',
    q: kind === 0 ? T`Krawędź sześcianu zwiększono $${k}$ razy. Objętość tego sześcianu zwiększyła się` : T`Promień kuli zwiększono $${k}$ razy. Objętość tej kuli zwiększyła się`,
    ok: `$${k ** 3}$ razy`,
    bad: [`$${k}$ razy`, `$${k * k}$ razy`, `$${3 * k}$ razy`, `$${k ** 3 + k}$ razy`, `$${2 * k}$ razy`],
    steps: [kind === 0 ? T`Stara objętość: $a^3$. Nowa: $(${k}a)^3 = ${k ** 3}a^3$.` : T`Stara objętość: $\frac{4}{3}\pi r^3$. Nowa: $\frac{4}{3}\pi (${k}r)^3 = ${k ** 3} \cdot \frac{4}{3}\pi r^3$.`, T`Objętość wzrosła $${k ** 3}$ razy.`],
    trap: T`$(${k}a)^3 = ${k}^3 \cdot a^3 = ${k ** 3}a^3$, a nie $${k}a^3$. Do potęgi podnosimy także liczbę $${k}$.`,
    tip: 'Bryły podobne w skali $k$: długości zmieniają się $k$ razy, pola $k^2$ razy, objętości $k^3$ razy.'
  });
};
const simModelMass = (r) => {
  const k = r.pick([10, 20, 50, 100]);
  const grams = r.pick([2, 4, 5, 8, 10, 20, 25, 40]);
  const kg = (grams * k ** 3) / 1000;
  need(kg >= 1);
  const fmt = (x) => (x >= 1000 ? `$${String(x / 1000).replace('.', '{,}')}$ t` : `$${String(x).replace('.', '{,}')}$ kg`);
  return mc({
    title: 'Model w skali i masa',
    q: T`Model pomnika wykonano w skali $1 : ${k}$ z tego samego materiału co pomnik. Masa modelu jest równa $${grams}$ g. Masa pomnika jest równa`,
    ok: fmt(kg),
    bad: [fmt((grams * k * k) / 1000), fmt((grams * k) / 1000), fmt(kg * 10), fmt(kg / 10), fmt(kg * 100)].filter((x) => x !== fmt(kg)),
    steps: [T`Masa jest proporcjonalna do objętości, a objętość rośnie $k^3$ razy: $${k}^3 = ${k ** 3}$.`, T`$${grams}$ g $\cdot\, ${k ** 3} = ${grams * k ** 3}$ g $= ${String(kg).replace('.', '{,}')}$ kg${kg >= 1000 ? T` $= ${String(kg / 1000).replace('.', '{,}')}$ t` : ''}.`],
    trap: T`Masa zależy od objętości, więc mnożymy przez $k^3$, a nie przez $k$. Uważaj też na jednostki: $1$ kg $= 1000$ g, $1$ t $= 1000$ kg.`,
    tip: 'Bryły podobne w skali $k$: długości zmieniają się $k$ razy, pola $k^2$ razy, objętości $k^3$ razy.'
  });
};
const simScaleFromVolumes = (r) => {
  const k = r.pick([2, 3, 4, 5]);
  const V1 = r.pick([1, 2, 3, 5]);
  const P1 = r.pick([4, 6, 10, 12]);
  const kind = r.int(0, 1);
  return mc({
    title: 'Skala podobieństwa z objętości',
    q: kind === 0 ? T`Dwa ostrosłupy są podobne. Objętość mniejszego jest równa $${V1}$, a większego $${V1 * k ** 3}$. Pole powierzchni mniejszego ostrosłupa jest równe $${P1}$. Pole powierzchni większego ostrosłupa jest równe` : T`Dwa stożki są podobne. Objętość mniejszego jest równa $${V1}$, a większego $${V1 * k ** 3}$. Wysokość mniejszego stożka jest równa $${P1}$. Wysokość większego stożka jest równa`,
    ok: m(kind === 0 ? P1 * k * k : P1 * k),
    val: kind === 0 ? P1 * k * k : P1 * k,
    bad: kind === 0 ? [m(P1 * k), m(P1 * k ** 3), m(P1 * k * k + P1), m(P1 * 3 * k)] : [m(P1 * k * k), m(P1 * k ** 3), m(P1 * 3), m(P1 + k)],
    steps: [T`$k^3 = \frac{${V1 * k ** 3}}{${V1}} = ${k ** 3}$, więc skala podobieństwa to $k = ${k}$.`, kind === 0 ? T`Pola zmieniają się $k^2 = ${k * k}$ razy: $${P1} \cdot ${k * k} = ${P1 * k * k}$.` : T`Długości zmieniają się $k = ${k}$ razy: $${P1} \cdot ${k} = ${P1 * k}$.`],
    trap: T`Stosunek objętości to $k^3$, nie $k$. Najpierw wyciągnij pierwiastek sześcienny, żeby poznać skalę.`,
    tip: 'Bryły podobne w skali $k$: długości zmieniają się $k$ razy, pola $k^2$ razy, objętości $k^3$ razy.'
  });
};

export default {
  numericId: 11,
  title: 'Stereometria',
  short_title: 'Stereometria',
  description: 'Graniastosłupy, ostrosłupy, kąty w bryłach, walec, stożek i kula oraz bryły podobne.',
  icon: 'Box',
  color: '#C084FC',
  matura_points_range: '4–7 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 24–26',
  lessons: [
    {
      title: 'Graniastosłupy: objętość, pole powierzchni i przekątne',
      short_title: 'Graniastosłupy',
      pill: pill({
        essence: T`Graniastosłup ma dwie jednakowe podstawy i ściany boczne będące prostokątami (w graniastosłupie prostym). Objętość to pole podstawy razy wysokość: $V = P_p \cdot h$. Pole powierzchni całkowitej to dwie podstawy i wszystkie ściany boczne. „Prawidłowy” znaczy, że podstawą jest wielokąt foremny: kwadrat, trójkąt równoboczny, sześciokąt foremny. Przekątną prostopadłościanu liczysz z „trójwymiarowego Pitagorasa”: $d = \sqrt{a^2 + b^2 + c^2}$.`,
        context: 'Zadania 27–29 w arkuszu • 1 pkt oraz zadanie otwarte za 2–4 pkt.',
        pl: T`Objętość graniastosłupa to „ile pięter razy powierzchnia jednego piętra”. Pole powierzchni to ilość papieru na oklejenie pudełka: wieczko, denko i wszystkie ścianki. Zawsze policz, ile jest ścian danego rodzaju.`,
        steps: [
          ['Policz pole podstawy', T`Kwadrat: $a^2$. Trójkąt równoboczny: $\frac{a^2\sqrt{3}}{4}$. Prostokąt: $ab$.`, 'To zależy od kształtu podstawy.'],
          ['Objętość', T`$V = P_p \cdot h$.`, 'Bez żadnego ułamka.'],
          ['Pole powierzchni', T`$P_c = 2P_p + P_b$, gdzie $P_b$ to suma pól prostokątów bocznych.`, 'Ścian bocznych jest tyle, ile boków ma podstawa.']
        ],
        formulas: [
          ['Objętość graniastosłupa', T`V = P_p \cdot h`, 25],
          ['Pole powierzchni', T`P_c = 2P_p + P_b`, 25],
          ['Przekątna prostopadłościanu', T`d = \sqrt{a^2 + b^2 + c^2}`]
        ],
        examples: [
          ['Sześcian', '1 pkt', T`Pole powierzchni całkowitej sześcianu jest równe $54$. Oblicz jego objętość.`, T`1. $6a^2 = 54$, więc $a^2 = 9$, $a = 3$.` + '\n' + T`2. $V = 27$.`, 'Sześcian ma 6 jednakowych ścian.'],
          ['Graniastosłup trójkątny', '2 pkt', T`Krawędź podstawy graniastosłupa prawidłowego trójkątnego ma długość $4$, a wysokość $5$. Oblicz objętość.`, T`1. $P_p = \frac{16\sqrt{3}}{4} = 4\sqrt{3}$.` + '\n' + T`2. $V = 4\sqrt{3} \cdot 5 = 20\sqrt{3}$.`, 'Podstawą jest trójkąt równoboczny.']
        ],
        trap: T`Przekątna SZEŚCIANU to $a\sqrt{3}$. Liczba $a\sqrt{2}$ to przekątna jednej ŚCIANY.`,
        fail: T`„Przekątna sześcianu o krawędzi $5$ ma długość $5\sqrt{2}$.”`,
        win: T`$d = \sqrt{5^2 + 5^2 + 5^2} = 5\sqrt{3}$.`,
        why: 'Przekątna bryły biegnie przez jej wnętrze i „zużywa” wszystkie trzy wymiary, a przekątna ściany tylko dwa.',
        ckeTip: 'Wzory na objętości i pola wszystkich brył są w karcie wzorów na str. 24–26.',
        points: [T`$V = P_p \cdot h$ – bez $\frac{1}{3}$.`, T`$P_c$ to dwie podstawy i ściany boczne.`, T`Graniastosłup o podstawie $n$-kąta ma $3n$ krawędzi.`]
      }),
      gens: [prismSquare, cube, cuboidDiagonal, prismTriangular, prismCounts]
    },
    {
      title: 'Ostrosłupy: objętość, ściany boczne i krawędzie',
      short_title: 'Ostrosłupy',
      pill: pill({
        essence: T`Ostrosłup ma jedną podstawę i ściany boczne w kształcie trójkątów, które spotykają się w wierzchołku. Objętość to jedna trzecia iloczynu pola podstawy i wysokości: $V = \frac{1}{3}P_p \cdot H$. W ostrosłupie prawidłowym czworokątnym spodek wysokości leży w środku kwadratu, co daje dwa trójkąty prostokątne: z połową boku (do wysokości ściany bocznej) i z połową przekątnej (do krawędzi bocznej).`,
        context: 'Zadania 27–29 w arkuszu • 1 pkt oraz zadanie otwarte za 3–4 pkt.',
        pl: T`Ostrosłup to namiot. Maszt w środku to wysokość $H$. Od czubka masztu możesz zejść po płótnie prosto do środka krawędzi podłogi (to wysokość ściany bocznej) albo po szwie do rogu podłogi (to krawędź boczna). Do rogu jest dalej.`,
        steps: [
          ['Narysuj wysokość ostrosłupa', T`Spodek wysokości to środek kwadratu podstawy.`, 'Od niego mierzysz odcinki w podstawie.'],
          ['Wybierz właściwy trójkąt', T`Wysokość ściany: $h_b^2 = H^2 + \left(\frac{a}{2}\right)^2$. Krawędź boczna: $b^2 = H^2 + \left(\frac{a\sqrt{2}}{2}\right)^2$.`, 'Środek boku albo róg podstawy.'],
          ['Policz to, o co pytają', T`$V = \frac{1}{3}a^2 H$, $P_b = 4 \cdot \frac{1}{2} a h_b$.`, 'Cztery jednakowe ściany boczne.']
        ],
        formulas: [
          ['Objętość ostrosłupa', T`V = \frac{1}{3} P_p \cdot H`, 25],
          ['Wysokość ściany bocznej', T`h_b^2 = H^2 + \left(\frac{a}{2}\right)^2`],
          ['Krawędź boczna', T`b^2 = H^2 + \left(\frac{a\sqrt{2}}{2}\right)^2`]
        ],
        examples: [
          ['Pole powierzchni bocznej', '2 pkt', T`Krawędź podstawy ostrosłupa prawidłowego czworokątnego ma długość $6$, a wysokość $4$. Oblicz pole powierzchni bocznej.`, T`1. $h_b = \sqrt{4^2 + 3^2} = 5$.` + '\n' + T`2. $P_b = 4 \cdot \frac{1}{2} \cdot 6 \cdot 5 = 60$.`, 'Połowa boku podstawy.'],
          ['Krawędź boczna', '2 pkt', T`Krawędź podstawy ostrosłupa prawidłowego czworokątnego ma długość $4$, a wysokość $2$. Oblicz krawędź boczną.`, T`1. Połowa przekątnej: $2\sqrt{2}$.` + '\n' + T`2. $b = \sqrt{4 + 8} = \sqrt{12} = 2\sqrt{3}$.`, 'Połowa przekątnej podstawy.']
        ],
        trap: T`W objętości ostrosłupa jest $\frac{1}{3}$. Bez niego liczysz objętość graniastosłupa – trzy razy za dużą.`,
        fail: T`„$V = a^2 \cdot H = 36 \cdot 4 = 144$.”`,
        win: T`$V = \frac{1}{3} \cdot 36 \cdot 4 = 48$.`,
        why: 'Z trzech jednakowych ostrosłupów da się złożyć graniastosłup o tej samej podstawie i wysokości.',
        ckeTip: 'W zadaniu otwartym narysuj ostrosłup i zaznacz w nim trójkąt prostokątny, z którego korzystasz – ułatwia to i liczenie, i ocenianie.',
        points: [T`$V = \frac{1}{3}P_p H$.`, T`Wysokość ściany bocznej: z połową boku podstawy.`, T`Krawędź boczna: z połową przekątnej podstawy.`]
      }),
      gens: [pyrVolume, pyrSlantHeight, pyrLateralEdge, tetrahedron, pyrCounts]
    },
    {
      title: 'Kąty w bryłach: krawędź, ściana i przekątna',
      short_title: 'Kąty w bryłach',
      time: '~6 min',
      pill: pill({
        essence: T`Kąt między prostą a płaszczyzną to kąt między tą prostą a jej rzutem na płaszczyznę. W praktyce zawsze szukasz trójkąta prostokątnego. Kąt nachylenia przekątnej prostopadłościanu do podstawy leży między przekątną bryły a przekątną podstawy. W ostrosłupie prawidłowym czworokątnym kąt krawędzi bocznej opiera się na połowie przekątnej podstawy, a kąt ściany bocznej (kąt dwuścienny) – na połowie boku podstawy.`,
        context: 'Zadania 27–29 w arkuszu • 1 pkt oraz element zadania otwartego za 3–4 pkt.',
        pl: T`Kąt nachylenia to „jak stromo”. Krawędź boczna ostrosłupa biegnie do rogu podłogi – ma dalej, więc wspina się łagodniej. Ściana boczna schodzi do środka boku podłogi – ma bliżej, więc jest bardziej stroma. Dlatego kąt ściany jest zawsze większy niż kąt krawędzi.`,
        steps: [
          ['Znajdź trójkąt prostokątny', T`Jedna przyprostokątna to wysokość bryły, druga leży w podstawie.`, 'Kąt prosty jest przy spodku wysokości.'],
          ['Ustal odcinek w podstawie', T`Kąt krawędzi: połowa przekątnej. Kąt ściany: połowa boku. Przekątna prostopadłościanu: cała przekątna podstawy.`, 'To najważniejsza decyzja w zadaniu.'],
          ['Zastosuj tangens', T`$\operatorname{tg}\alpha = \frac{H}{\text{odcinek w podstawie}}$.`, 'Wysokość leży naprzeciw kąta.']
        ],
        formulas: [
          ['Kąt krawędzi bocznej', T`\operatorname{tg}\alpha = \frac{H}{\frac{a\sqrt{2}}{2}}`],
          ['Kąt ściany bocznej', T`\operatorname{tg}\beta = \frac{H}{\frac{a}{2}}`],
          ['Przekątna prostopadłościanu', T`\operatorname{tg}\gamma = \frac{c}{d_p}`]
        ],
        examples: [
          ['Kąt ściany bocznej', '2 pkt', T`W ostrosłupie prawidłowym czworokątnym krawędź podstawy ma długość $6$, a ściana boczna jest nachylona do podstawy pod kątem $60^\circ$. Oblicz wysokość.`, T`1. $\operatorname{tg} 60^\circ = \frac{H}{3}$.` + '\n' + T`2. $H = 3\sqrt{3}$.`, 'Połowa boku podstawy to 3.'],
          ['Przekątna prostopadłościanu', '1 pkt', T`Podstawą prostopadłościanu jest prostokąt $3 \times 4$, wysokość to $5$. Oblicz tangens kąta nachylenia przekątnej do podstawy.`, T`1. $d_p = 5$.` + '\n' + T`2. $\operatorname{tg}\alpha = \frac{5}{5} = 1$, czyli $\alpha = 45^\circ$.`, 'Kąt leży przy przekątnej podstawy.']
        ],
        trap: T`Kąt KRAWĘDZI bocznej i kąt ŚCIANY bocznej to dwa różne kąty. Pierwszy używa połowy przekątnej podstawy, drugi – połowy boku.`,
        fail: T`Kąt nachylenia krawędzi bocznej liczony z połową boku podstawy: $\operatorname{tg}\alpha = \frac{H}{\frac{a}{2}}$.`,
        win: T`Dla krawędzi bocznej: $\operatorname{tg}\alpha = \frac{H}{\frac{a\sqrt{2}}{2}}$.`,
        why: 'Krawędź boczna kończy się w wierzchołku podstawy, a od środka kwadratu do wierzchołka jest połowa przekątnej.',
        ckeTip: 'Zaznacz szukany kąt łukiem na rysunku i podpisz trzy boki trójkąta – wtedy wybór funkcji trygonometrycznej jest oczywisty.',
        points: [T`Kąt krawędzi bocznej: połowa przekątnej podstawy.`, T`Kąt ściany bocznej: połowa boku podstawy.`, T`Przekątna bryły: kąt z przekątną podstawy.`]
      }),
      gens: [angleFaceTan, angleEdgeTan, angleGivenFindH, angleCuboidDiagonal, angleIdentify]
    },
    {
      title: 'Bryły obrotowe: walec, stożek i kula',
      short_title: 'Walec, stożek, kula',
      pill: pill({
        essence: T`Walec to „graniastosłup o podstawie koła”: $V = \pi r^2 h$, a jego powierzchnia boczna po rozwinięciu jest prostokątem o polu $2\pi r h$. Stożek to „ostrosłup o podstawie koła”: $V = \frac{1}{3}\pi r^2 h$, a pole boczne to $\pi r l$, gdzie $l$ jest tworzącą ($l^2 = r^2 + h^2$). Kula o promieniu $r$ ma objętość $\frac{4}{3}\pi r^3$ i pole powierzchni $4\pi r^2$.`,
        context: 'Zadania 27–29 w arkuszu • 1–2 pkt (wymagania od 2025 r. obejmują walec, stożek i kulę).',
        pl: T`Walec – puszka. Stożek – rożek po lodach, trzy razy mniej pojemny niż puszka o tym samym dnie i wysokości. Tworząca stożka to „skos” od czubka do brzegu – zawsze dłuższa od wysokości, bo to przeciwprostokątna.`,
        steps: [
          ['Rozpoznaj bryłę i dane', T`Uwaga, czy podano promień, czy średnicę.`, 'Średnica to 2r.'],
          ['W stożku policz brakujący odcinek', T`$r = 3$, $h = 4$: $l = 5$.`, 'Pitagoras: r, h, l.'],
          ['Podstaw do wzoru', T`$V = \frac{1}{3}\pi \cdot 9 \cdot 4 = 12\pi$, $P_b = \pi \cdot 3 \cdot 5 = 15\pi$.`, 'Objętość – wysokość. Pole boczne – tworząca.']
        ],
        formulas: [
          ['Walec', T`V = \pi r^2 h, \quad P_b = 2\pi r h`, 25],
          ['Stożek', T`V = \frac{1}{3}\pi r^2 h, \quad P_b = \pi r l`, 26],
          ['Kula', T`V = \frac{4}{3}\pi r^3, \quad P = 4\pi r^2`, 26]
        ],
        examples: [
          ['Przekrój osiowy', '1 pkt', T`Przekrój osiowy walca jest kwadratem o boku $6$. Oblicz objętość walca.`, T`1. $2r = 6$, więc $r = 3$; $h = 6$.` + '\n' + T`2. $V = \pi \cdot 9 \cdot 6 = 54\pi$.`, 'Bok kwadratu to średnica.'],
          ['Kąt rozwarcia', '1 pkt', T`Kąt rozwarcia stożka ma $60^\circ$, a tworząca długość $8$. Oblicz promień podstawy.`, T`1. Przekrój osiowy to trójkąt równoboczny o boku $8$.` + '\n' + T`2. $2r = 8$, więc $r = 4$.`, 'Kąt 60° między tworzącymi daje trójkąt równoboczny.']
        ],
        trap: T`W objętości stożka jest WYSOKOŚĆ $h$, a w polu powierzchni bocznej – TWORZĄCA $l$. Zamiana ich to najczęstszy błąd.`,
        fail: T`$r = 3$, $h = 4$: „$P_b = \pi \cdot 3 \cdot 4 = 12\pi$”.`,
        win: T`$l = 5$, więc $P_b = \pi \cdot 3 \cdot 5 = 15\pi$.`,
        why: 'Powierzchnia boczna biegnie po skosie, czyli wzdłuż tworzącej – nie wzdłuż pionowej wysokości.',
        ckeTip: 'Wzory na walec są w karcie wzorów na str. 25, a na stożek i kulę – na str. 26.',
        points: [T`Walec: $\pi r^2 h$. Stożek: $\frac{1}{3}\pi r^2 h$.`, T`Stożek: $l^2 = r^2 + h^2$.`, T`Kula: $\frac{4}{3}\pi r^3$ i $4\pi r^2$.`]
      }),
      gens: [solidVolume, coneSlant, cylinderSection, coneAngle, sphereFromArea]
    },
    {
      title: 'Bryły podobne: skala, pola i objętości',
      short_title: 'Bryły podobne',
      pill: pill({
        essence: T`Jeśli dwie bryły są podobne w skali $k$, to wszystkie odpowiadające sobie długości różnią się $k$ razy, pola powierzchni – $k^2$ razy, a objętości – $k^3$ razy. To samo dotyczy mas, gdy bryły są z tego samego materiału. Znając stosunek objętości, skalę odzyskasz pierwiastkiem sześciennym.`,
        context: 'Zadanie 27–29 w arkuszu • 1 pkt.',
        pl: T`Kostka dwa razy większa w każdą stronę to nie „dwie kostki”, tylko osiem: dwa razy dłuższa, dwa razy szersza i dwa razy wyższa. $2 \cdot 2 \cdot 2 = 8$. Dlatego słoń nie może być po prostu powiększoną myszą – ważyłby za dużo.`,
        steps: [
          ['Ustal skalę', T`Krawędzie $3$ i $12$: $k = 4$.`, 'Stosunek odpowiadających sobie długości.'],
          ['Wybierz potęgę', T`Długość: $k$. Pole: $k^2$. Objętość i masa: $k^3$.`, 'To zależy od tego, o co pytają.'],
          ['Pomnóż lub podziel', T`Objętość $5$ w skali $k = 4$: $5 \cdot 64 = 320$.`, 'Większa bryła – mnożysz, mniejsza – dzielisz.']
        ],
        formulas: [
          ['Długości', T`\frac{l_2}{l_1} = k`],
          ['Pola powierzchni', T`\frac{P_2}{P_1} = k^2`],
          ['Objętości', T`\frac{V_2}{V_1} = k^3`]
        ],
        examples: [
          ['Objętość', '1 pkt', T`Ostrosłup $B_2$ jest podobny do $B_1$ w skali $k = 3$. Objętość $B_1$ to $4$. Oblicz objętość $B_2$.`, T`1. $k^3 = 27$.` + '\n' + T`2. $V_2 = 4 \cdot 27 = 108$.`, 'Sześcian skali.'],
          ['Model', '1 pkt', T`Model w skali $1 : 100$ waży $5$ g. Ile waży oryginał z tego samego materiału?`, T`1. $100^3 = 1\,000\,000$.` + '\n' + T`2. $5$ g $\cdot 1\,000\,000 = 5\,000\,000$ g $= 5000$ kg $= 5$ t.`, 'Masa rośnie jak objętość.']
        ],
        trap: T`Objętość rośnie $k^3$ razy, nie $k$ razy. Skala $1 : 100$ oznacza milion razy większą objętość i masę.`,
        fail: T`„Model w skali $1 : 100$ waży $5$ g, więc oryginał waży $500$ g.”`,
        win: T`$5$ g $\cdot 100^3 = 5\,000\,000$ g $= 5$ t.`,
        why: 'Objętość ma trzy wymiary i każdy z nich rośnie k razy.',
        ckeTip: 'Jedna linijka do zapamiętania: długość k, pole k², objętość k³.',
        points: [T`Długości: $k$. Pola: $k^2$. Objętości: $k^3$.`, T`Masa zachowuje się jak objętość.`, T`Skala z objętości: $k = \sqrt[3]{\frac{V_2}{V_1}}$.`]
      }),
      gens: [simVolume, simSurface, simCubeEdge, simModelMass, simScaleFromVolumes]
    }
  ]
};
