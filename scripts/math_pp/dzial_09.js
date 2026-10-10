import { T, mc, num, pf, pill, fr, par, sq, m, need, gcd, isSquare, dec } from './lib.js';

const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [12, 16, 20], [10, 24, 26]];
const deg = (x) => m(`${x}^\\circ`);
const pi = (n, d = 1) => {
  const g = gcd(n, d);
  const [a, b] = [n / g, d / g];
  return b === 1 ? `${a === 1 ? '' : a}\\pi` : `\\frac{${a === 1 ? '' : a}\\pi}{${b}}`;
};
const TIP_PIT = 'Karta wzorów, str. 14: twierdzenie Pitagorasa $a^2 + b^2 = c^2$ ($c$ – przeciwprostokątna).';

// ---------- 9.1 Twierdzenie Pitagorasa i pola trójkątów ----------
const pitHypotenuse = (r) => {
  const exact = r.rnd() < 0.5;
  let a;
  let b;
  if (exact) [a, b] = r.pick(TRIPLES);
  else {
    a = r.int(2, 9);
    b = r.int(2, 9);
    need(!isSquare(a * a + b * b));
  }
  const c2 = a * a + b * b;
  return mc({
    title: 'Przeciwprostokątna z twierdzenia Pitagorasa',
    q: T`Przyprostokątne trójkąta prostokątnego mają długości $${a}$ i $${b}$. Przeciwprostokątna tego trójkąta ma długość`,
    ok: m(sq(c2)),
    val: Math.sqrt(c2),
    bad: [m(`${a + b}`), m(`${c2}`), m(sq(Math.abs(a * a - b * b) || 2)), m(sq(2 * c2)), m(`${Math.max(a, b) + 1}`)],
    steps: [T`$c^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c2}$.`, T`$c = \sqrt{${c2}}${isSquare(c2) ? '' : ''} = ${sq(c2)}$.`],
    trap: T`$\sqrt{a^2 + b^2}$ to nie $a + b$. Najpierw dodaj kwadraty, dopiero potem pierwiastkuj.`,
    tip: TIP_PIT
  });
};
const pitLeg = (r) => {
  const exact = r.rnd() < 0.5;
  let a;
  let c;
  if (exact) {
    const t = r.pick(TRIPLES);
    [a, c] = [t[r.int(0, 1)], t[2]];
  } else {
    a = r.int(2, 8);
    c = r.int(a + 1, 12);
    need(!isSquare(c * c - a * a));
  }
  const b2 = c * c - a * a;
  return mc({
    title: 'Przyprostokątna z twierdzenia Pitagorasa',
    q: T`W trójkącie prostokątnym przeciwprostokątna ma długość $${c}$, a jedna z przyprostokątnych ma długość $${a}$. Druga przyprostokątna ma długość`,
    ok: m(sq(b2)),
    val: Math.sqrt(b2),
    bad: [m(sq(c * c + a * a)), m(`${c - a}`), m(`${b2}`), m(sq(b2 + 1 === 0 ? 2 : b2 + a)), m(`${c + a}`)],
    steps: [T`$b^2 = c^2 - a^2 = ${c * c} - ${a * a} = ${b2}$.`, T`$b = \sqrt{${b2}} = ${sq(b2)}$.`],
    trap: T`Szukasz przyprostokątnej, więc ODEJMUJESZ kwadraty. Dodawanie stosujemy tylko przy szukaniu przeciwprostokątnej.`,
    tip: TIP_PIT
  });
};
const triRightAreaHeight = (r) => {
  const [a, b, c] = r.pick(TRIPLES);
  const askH = r.bool();
  return mc({
    title: askH ? 'Wysokość opuszczona na przeciwprostokątną' : 'Pole trójkąta prostokątnego',
    q: askH ? T`Boki trójkąta prostokątnego mają długości $${a}$, $${b}$ i $${c}$. Wysokość opuszczona na przeciwprostokątną ma długość` : T`Przeciwprostokątna trójkąta prostokątnego ma długość $${c}$, a jedna z przyprostokątnych $${a}$. Pole tego trójkąta jest równe`,
    ok: m(askH ? fr(a * b, c) : fr(a * b, 2)),
    val: askH ? (a * b) / c : (a * b) / 2,
    bad: askH ? [m(fr(a * b, 2 * c)), m(fr(a + b, 2)), m(fr(c, 2)), m(fr(2 * a * b, c))] : [m(`${a * b}`), m(fr(a * c, 2)), m(fr(b * c, 2)), m(`${a + b + c}`)],
    steps: askH
      ? [T`Pole liczymy na dwa sposoby: $P = \frac{1}{2} \cdot ${a} \cdot ${b} = ${fr(a * b, 2)}$ oraz $P = \frac{1}{2} \cdot ${c} \cdot h$.`, T`$\frac{1}{2} \cdot ${c} \cdot h = ${fr(a * b, 2)}$, więc $h = \frac{${a * b}}{${c}} = ${fr(a * b, c)}$.`]
      : [T`Druga przyprostokątna: $\sqrt{${c}^2 - ${a}^2} = \sqrt{${b * b}} = ${b}$.`, T`$P = \frac{1}{2} \cdot ${a} \cdot ${b} = ${fr(a * b, 2)}$.`],
    trap: askH ? T`W trójkącie prostokątnym przyprostokątne są dla siebie wysokościami. Wysokość na przeciwprostokątną to $\frac{ab}{c}$, a nie połowa przeciwprostokątnej.` : T`W polu trójkąta prostokątnego mnożymy przyprostokątne – przeciwprostokątna nie jest ani podstawą, ani wysokością do tej podstawy.`,
    tip: 'Pole trójkąta prostokątnego: $P = \\frac{1}{2}ab$ ($a$, $b$ – przyprostokątne).'
  });
};
const triIsosceles = (r) => {
  const [h0, half, arm] = r.pick([[4, 3, 5], [3, 4, 5], [12, 5, 13], [5, 12, 13], [8, 6, 10], [15, 8, 17], [8, 15, 17], [24, 7, 25]]);
  const base = 2 * half;
  const askH = r.bool();
  return mc({
    title: askH ? 'Wysokość trójkąta równoramiennego' : 'Pole trójkąta równoramiennego',
    q: T`W trójkącie równoramiennym podstawa ma długość $${base}$, a ramię ma długość $${arm}$. ${askH ? 'Wysokość opuszczona na podstawę ma długość' : 'Pole tego trójkąta jest równe'}`,
    ok: m(askH ? h0 : half * h0),
    val: askH ? h0 : half * h0,
    bad: askH ? [m(sq(arm * arm - base * base > 0 ? arm * arm - base * base : arm * arm + half * half)), m(arm - half), m(sq(arm * arm + half * half)), m(h0 + 1)] : [m(base * h0), m(fr(base * arm, 2)), m(half * arm), m(half * h0 + half)],
    steps: [T`Wysokość opuszczona na podstawę dzieli ją na połowy po $${half}$ i tworzy trójkąt prostokątny o przeciwprostokątnej $${arm}$.`, T`$h = \sqrt{${arm}^2 - ${half}^2} = \sqrt{${h0 * h0}} = ${h0}$.`, ...(askH ? [] : [T`$P = \frac{1}{2} \cdot ${base} \cdot ${h0} = ${half * h0}$.`])],
    trap: T`Do twierdzenia Pitagorasa bierzemy POŁOWĘ podstawy ($${half}$), a nie całą podstawę ($${base}$).`,
    tip: 'W trójkącie równoramiennym wysokość opuszczona na podstawę dzieli ją na dwie równe części.'
  });
};
const rectDiagonal = (r) => {
  const [a, b, c] = r.pick(TRIPLES);
  const kind = r.int(0, 2);
  if (kind === 0)
    return mc({
      title: 'Przekątna prostokąta',
      q: T`Boki prostokąta mają długości $${a}$ i $${b}$. Przekątna tego prostokąta ma długość`,
      ok: m(c),
      val: c,
      bad: [m(a + b), m(a * b), m(c + 1), m(2 * c), m(sq(a * b))],
      steps: [T`Przekątna dzieli prostokąt na dwa trójkąty prostokątne o przyprostokątnych $${a}$ i $${b}$.`, T`$d = \sqrt{${a}^2 + ${b}^2} = \sqrt{${c * c}} = ${c}$.`],
      trap: T`Przekątna jest przeciwprostokątną, więc jest dłuższa od każdego boku, ale krótsza od ich sumy.`,
      tip: TIP_PIT
    });
  if (kind === 1)
    return mc({
      title: 'Pole prostokąta z przekątnej',
      q: T`Przekątna prostokąta ma długość $${c}$, a jeden z jego boków ma długość $${a}$. Pole tego prostokąta jest równe`,
      ok: m(a * b),
      val: a * b,
      bad: [m(a * c), m(fr(a * b, 2)), m(2 * (a + b)), m(b * c), m(a * b + a)],
      steps: [T`Drugi bok: $\sqrt{${c}^2 - ${a}^2} = ${b}$.`, T`$P = ${a} \cdot ${b} = ${a * b}$.`],
      trap: T`Pole prostokąta to iloczyn boków, a nie iloczyn boku i przekątnej.`,
      tip: TIP_PIT
    });
  return mc({
    title: 'Obwód prostokąta z przekątnej',
    q: T`Przekątna prostokąta ma długość $${c}$, a jeden z jego boków ma długość $${a}$. Obwód tego prostokąta jest równy`,
    ok: m(2 * (a + b)),
    val: 2 * (a + b),
    bad: [m(a + b), m(2 * (a + c)), m(a * b), m(a + b + c), m(2 * (a + b) + 2)],
    steps: [T`Drugi bok: $\sqrt{${c}^2 - ${a}^2} = ${b}$.`, T`Obwód: $2 \cdot (${a} + ${b}) = ${2 * (a + b)}$.`],
    trap: T`Przekątna nie wchodzi do obwodu – obwód to suma czterech boków.`,
    tip: TIP_PIT
  });
};

// ---------- 9.2 Podobieństwo i twierdzenie Talesa ----------
const simArea = (r) => {
  const k = r.pick([2, 3, 4, 5, T`\frac{1}{2}`, T`\frac{1}{3}`, T`\frac{3}{2}`]);
  const kv = { 2: 2, 3: 3, 4: 4, 5: 5 }[k] || (k.includes('{1}{2}') ? 0.5 : k.includes('{1}{3}') ? 1 / 3 : 1.5);
  const P1 = r.pick([4, 8, 9, 12, 16, 18, 20, 36, 72]);
  const P2 = P1 * kv * kv;
  need(Number.isInteger(P2));
  const fig = r.pick(['Trójkąt', 'Prostokąt', 'Wielokąt']);
  return mc({
    title: 'Pola figur podobnych',
    q: T`${fig} $F_2$ jest ${fig === 'Trójkąt' || fig === 'Prostokąt' || fig === 'Wielokąt' ? 'podobny' : 'podobna'} do ${fig === 'Trójkąt' ? 'trójkąta' : fig === 'Prostokąt' ? 'prostokąta' : 'wielokąta'} $F_1$ w skali $k = ${k}$. Pole figury $F_1$ jest równe $${P1}$. Pole figury $F_2$ jest równe`,
    ok: m(P2),
    val: P2,
    bad: [m(fr(Math.round(P1 * kv * 6), 6)), m(fr(Math.round((P1 / kv / kv) * 36), 36)), m(fr(Math.round(P1 * kv * kv * kv * 216), 216)), m(P2 + P1), m(fr(Math.round((P1 / kv) * 6), 6))],
    steps: [T`Stosunek pól figur podobnych jest równy kwadratowi skali podobieństwa: $\frac{P_2}{P_1} = k^2$.`, T`$k^2 = \left(${k}\right)^2 = ${fr(Math.round(kv * kv * 36), 36)}$, więc $P_2 = ${P1} \cdot ${fr(Math.round(kv * kv * 36), 36)} = ${P2}$.`],
    trap: T`Pole zmienia się $k^2$ razy, a nie $k$ razy. Skala $k$ dotyczy długości (boków, obwodów).`,
    tip: 'Figury podobne w skali $k$: długości zmieniają się $k$ razy, pola $k^2$ razy.'
  });
};
const simScaleFromAreas = (r) => {
  const k = r.pick([2, 3, 4, 5]);
  const P1 = r.pick([2, 3, 5, 6, 7, 10]);
  const a1 = r.int(2, 9);
  const askSide = r.bool();
  return mc({
    title: 'Skala podobieństwa z pól',
    q: askSide
      ? T`Trójkąt $T_2$ jest podobny do trójkąta $T_1$. Pole trójkąta $T_1$ jest równe $${P1}$, a pole trójkąta $T_2$ jest równe $${P1 * k * k}$. Najdłuższy bok trójkąta $T_1$ ma długość $${a1}$. Najdłuższy bok trójkąta $T_2$ ma długość`
      : T`Trójkąt $T_2$ jest podobny do trójkąta $T_1$. Pole trójkąta $T_1$ jest równe $${P1}$, a pole trójkąta $T_2$ jest równe $${P1 * k * k}$. Obwód trójkąta $T_2$ jest większy od obwodu trójkąta $T_1$`,
    ok: askSide ? m(a1 * k) : `$${k}$ razy`,
    bad: askSide ? [m(a1 * k * k), m(a1 + k), m(a1 * k + a1), m(fr(a1 * k * k, 2))] : [`$${k * k}$ razy`, `$${2 * k}$ razy`, `$${k * k * k}$ razy`, `$${k + 1}$ razy`],
    steps: [T`$k^2 = \frac{${P1 * k * k}}{${P1}} = ${k * k}$, więc skala podobieństwa to $k = ${k}$.`, askSide ? T`Boki zmieniają się $k$ razy: $${a1} \cdot ${k} = ${a1 * k}$.` : T`Obwód (jak każda długość) zmienia się $k$ razy, czyli $${k}$ razy.`],
    trap: T`Stosunek pól to $k^2 = ${k * k}$. Skala $k$ to pierwiastek z tej liczby – i to ona dotyczy boków oraz obwodów.`,
    tip: 'Figury podobne w skali $k$: długości zmieniają się $k$ razy, pola $k^2$ razy.'
  });
};
const thales = (r) => {
  const ad = r.int(2, 8);
  const k = r.pick([2, 3, 4, T`\frac{3}{2}`, T`\frac{5}{2}`]);
  const kv = typeof k === 'number' ? k : k.includes('{3}') ? 1.5 : 2.5;
  const ab = ad * kv;
  const de = r.int(2, 9);
  const bc = de * kv;
  need(Number.isInteger(ab) && Number.isInteger(bc) && ab !== bc);
  const askBC = r.bool();
  return mc({
    title: 'Twierdzenie Talesa',
    q: askBC
      ? T`W trójkącie $ABC$ punkt $D$ leży na boku $AB$, a punkt $E$ na boku $AC$, przy czym odcinek $DE$ jest równoległy do boku $BC$. Wiadomo, że $|AD| = ${ad}$, $|AB| = ${ab}$ oraz $|DE| = ${de}$. Długość boku $BC$ jest równa`
      : T`W trójkącie $ABC$ punkt $D$ leży na boku $AB$, a punkt $E$ na boku $AC$, przy czym odcinek $DE$ jest równoległy do boku $BC$. Wiadomo, że $|AD| = ${ad}$, $|AB| = ${ab}$ oraz $|BC| = ${bc}$. Długość odcinka $DE$ jest równa`,
    ok: m(askBC ? bc : de),
    val: askBC ? bc : de,
    bad: askBC ? [m(fr(de * ad, ab)), m(de + (ab - ad)), m(fr(de * (ab - ad), ad)), m(bc + 1)] : [m(fr(bc * ab, ad)), m(bc - (ab - ad)), m(fr(bc * (ab - ad), ab)), m(de + 1)],
    steps: [T`Trójkąty $ADE$ i $ABC$ są podobne (mają wspólny kąt przy $A$ i równoległe boki naprzeciw niego), więc $\frac{|DE|}{|BC|} = \frac{|AD|}{|AB|} = \frac{${ad}}{${ab}}$.`, askBC ? T`$|BC| = ${de} \cdot \frac{${ab}}{${ad}} = ${bc}$.` : T`$|DE| = ${bc} \cdot \frac{${ad}}{${ab}} = ${de}$.`],
    trap: T`W proporcji występuje cały bok $|AB| = ${ab}$, a nie sam odcinek $|DB| = ${ab - ad}$.`,
    tip: 'Karta wzorów, str. 17: twierdzenie Talesa. Odcinek równoległy do boku trójkąta odcina trójkąt podobny do danego.'
  });
};
const simTriangleSides = (r) => {
  const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [4, 5, 6], [5, 6, 7], [6, 7, 9], [2, 3, 4]]);
  const k = r.pick([2, 3, 4, 5]);
  const kind = r.int(0, 1);
  return mc({
    title: 'Boki trójkąta podobnego',
    q: kind === 0 ? T`Boki trójkąta $T_1$ mają długości $${a}$, $${b}$ i $${c}$. Trójkąt $T_2$ jest podobny do trójkąta $T_1$, a jego najkrótszy bok ma długość $${a * k}$. Obwód trójkąta $T_2$ jest równy` : T`Boki trójkąta $T_1$ mają długości $${a}$, $${b}$ i $${c}$. Trójkąt $T_2$ jest podobny do trójkąta $T_1$, a jego obwód jest równy $${(a + b + c) * k}$. Najdłuższy bok trójkąta $T_2$ ma długość`,
    ok: m(kind === 0 ? (a + b + c) * k : c * k),
    val: kind === 0 ? (a + b + c) * k : c * k,
    bad: kind === 0 ? [m(a + b + c + a * k), m((a + b + c) * k * k), m(a * k + b + c), m((a + b + c) * (k + 1))] : [m(c * k * k), m(c + k), m(a * k), m(b * k), m(c * (k + 1))],
    steps: [kind === 0 ? T`Skala podobieństwa: $k = \frac{${a * k}}{${a}} = ${k}$.` : T`Obwód $T_1$: $${a} + ${b} + ${c} = ${a + b + c}$. Skala: $k = \frac{${(a + b + c) * k}}{${a + b + c}} = ${k}$.`, kind === 0 ? T`Obwód $T_2$: $(${a} + ${b} + ${c}) \cdot ${k} = ${(a + b + c) * k}$.` : T`Najdłuższy bok $T_2$: $${c} \cdot ${k} = ${c * k}$.`],
    trap: T`W figurach podobnych odpowiadają sobie boki tego samego „rodzaju”: najkrótszy z najkrótszym, najdłuższy z najdłuższym.`,
    tip: 'Skala podobieństwa to stosunek odpowiadających sobie boków – taki sam dla każdej pary.'
  });
};
const simMapScale = (r) => {
  const s = r.pick([1000, 2000, 5000, 10000, 25000, 50000]);
  const cm = r.pick([2, 3, 4, 5, 6, 8, 12]);
  const realM = (cm * s) / 100;
  const km = realM / 1000;
  const useKm = realM >= 1000;
  return mc({
    title: 'Skala mapy',
    q: T`Na planie wykonanym w skali $1 : ${s}$ odległość między dwoma punktami jest równa $${cm}$ cm. Rzeczywista odległość między tymi punktami jest równa`,
    ok: useKm ? `$${dec(km)}$ km` : `$${realM}$ m`,
    bad: useKm ? [`$${dec(km * 10)}$ km`, `$${dec(km / 10)}$ km`, `$${dec(km * 100)}$ km`, `$${dec(km / 100, 5)}$ km`] : [`$${realM * 10}$ m`, `$${dec(realM / 10)}$ m`, `$${realM * 100}$ m`, `$${dec(realM / 100, 3)}$ m`],
    steps: [T`Skala $1 : ${s}$ oznacza, że $1$ cm na planie to $${s}$ cm w rzeczywistości.`, T`$${cm} \cdot ${s} = ${cm * s}$ cm $= ${realM}$ m${useKm ? T` $= ${dec(km)}$ km` : ''}.`],
    trap: T`Przy zamianie jednostek pamiętaj: $1$ m $= 100$ cm, $1$ km $= 100\,000$ cm.`,
    tip: 'Skala to stosunek długości na planie do długości w rzeczywistości – obie w tych samych jednostkach.'
  });
};

// ---------- 9.3 Czworokąty ----------
const quadRhombus = (r) => {
  const [p, q, a] = r.pick([[6, 8, 5], [10, 24, 13], [12, 16, 10], [16, 30, 17], [14, 48, 25], [18, 24, 15]]);
  const kind = r.int(0, 2);
  if (kind === 0)
    return mc({
      title: 'Pole rombu z przekątnych',
      q: T`Przekątne rombu mają długości $${p}$ i $${q}$. Pole tego rombu jest równe`,
      ok: m((p * q) / 2),
      val: (p * q) / 2,
      bad: [m(p * q), m((p * q) / 4), m(2 * (p + q)), m(a * a)],
      steps: [T`$P = \frac{1}{2} \cdot d_1 \cdot d_2$.`, T`$P = \frac{1}{2} \cdot ${p} \cdot ${q} = ${(p * q) / 2}$.`],
      trap: T`Iloczyn przekątnych trzeba podzielić przez $2$ – sam iloczyn to pole prostokąta opisanego na rombie.`,
      tip: 'Karta wzorów, str. 20: pole rombu $P = \\frac{1}{2} \\cdot |AC| \\cdot |BD|$.'
    });
  if (kind === 1)
    return mc({
      title: 'Bok rombu z przekątnych',
      q: T`Przekątne rombu mają długości $${p}$ i $${q}$. Bok tego rombu ma długość`,
      ok: m(a),
      val: a,
      bad: [m(sq(p * p + q * q)), m((p + q) / 2), m(a + 1), m(2 * a), m(sq((p * q) / 2))],
      steps: [T`Przekątne rombu przecinają się pod kątem prostym i dzielą na połowy: $${p / 2}$ i $${q / 2}$.`, T`Bok jest przeciwprostokątną: $a = \sqrt{${p / 2}^2 + ${q / 2}^2} = \sqrt{${a * a}} = ${a}$.`],
      trap: T`Do twierdzenia Pitagorasa bierzemy POŁOWY przekątnych, nie całe przekątne.`,
      tip: 'Przekątne rombu są prostopadłe i dzielą się na połowy – tworzą cztery jednakowe trójkąty prostokątne.'
    });
  return mc({
    title: 'Obwód rombu z przekątnych',
    q: T`Przekątne rombu mają długości $${p}$ i $${q}$. Obwód tego rombu jest równy`,
    ok: m(4 * a),
    val: 4 * a,
    bad: [m(2 * (p + q)), m(a), m(2 * a), m(4 * a + 4), m(p + q)],
    steps: [T`Bok rombu: $a = \sqrt{${p / 2}^2 + ${q / 2}^2} = ${a}$.`, T`Obwód: $4 \cdot ${a} = ${4 * a}$.`],
    trap: T`Obwód to cztery boki, a nie suma przekątnych.`,
    tip: 'Przekątne rombu są prostopadłe i dzielą się na połowy – tworzą cztery jednakowe trójkąty prostokątne.'
  });
};
const quadTrapezoid = (r) => {
  const a = r.int(6, 16);
  const b = r.int(2, a - 2);
  const h = r.int(2, 9);
  need(((a + b) * h) % 2 === 0);
  const P = ((a + b) * h) / 2;
  const askH = r.bool();
  return mc({
    title: askH ? 'Wysokość trapezu z pola' : 'Pole trapezu',
    q: askH ? T`Podstawy trapezu mają długości $${a}$ i $${b}$, a jego pole jest równe $${P}$. Wysokość tego trapezu jest równa` : T`Podstawy trapezu mają długości $${a}$ i $${b}$, a jego wysokość jest równa $${h}$. Pole tego trapezu jest równe`,
    ok: m(askH ? h : P),
    val: askH ? h : P,
    bad: askH ? [m(fr(P, a + b)), m(fr(2 * P, a)), m(h + 1), m(fr(P, a))] : [m((a + b) * h), m(a * b * h), m(fr(a * h, 2)), m(P + h), m(a * h)],
    steps: [T`$P = \frac{a + b}{2} \cdot h$.`, askH ? T`$${P} = \frac{${a} + ${b}}{2} \cdot h = ${fr(a + b, 2)} \cdot h$, więc $h = ${h}$.` : T`$P = \frac{${a} + ${b}}{2} \cdot ${h} = ${fr(a + b, 2)} \cdot ${h} = ${P}$.`],
    trap: T`Sumę podstaw dzielimy przez $2$ – pole trapezu to „średnia podstaw razy wysokość”.`,
    tip: 'Karta wzorów, str. 19: pole trapezu $P = \\frac{a + b}{2} \\cdot h$.'
  });
};
const quadParallelogramAngles = (r) => {
  const a = r.int(25, 85);
  const kind = r.int(0, 2);
  if (kind === 0)
    return mc({
      title: 'Kąty równoległoboku',
      q: T`Kąt ostry równoległoboku ma miarę $${a}^\circ$. Kąt rozwarty tego równoległoboku ma miarę`,
      ok: deg(180 - a),
      bad: [deg(90 - a > 0 ? 90 + a : 100), deg(360 - a), deg(2 * a), deg(180 - a + 10), deg(a)],
      steps: [T`Kąty przy jednym boku równoległoboku dają razem $180^\circ$.`, T`$180^\circ - ${a}^\circ = ${180 - a}^\circ$.`],
      trap: T`Sąsiednie kąty równoległoboku sumują się do $180^\circ$, a nie do $90^\circ$ ani $360^\circ$.`,
      tip: 'W równoległoboku kąty przeciwległe są równe, a sąsiednie dają razem $180^\\circ$.'
    });
  if (kind === 1) {
    const d = r.int(1, 8) * 10;
    const x = (180 - d) / 2;
    return mc({
      title: 'Kąty równoległoboku',
      q: T`Jeden z kątów równoległoboku jest o $${d}^\circ$ większy od drugiego. Mniejszy z kątów tego równoległoboku ma miarę`,
      ok: deg(x),
      bad: [deg(x + d), deg((360 - d) / 4), deg(90 - d / 2 === x ? x + 5 : 90 - d), deg(x + 10), deg(180 - d)],
      steps: [T`Sąsiednie kąty: $\alpha + (\alpha + ${d}^\circ) = 180^\circ$.`, T`$2\alpha = ${180 - d}^\circ$, więc $\alpha = ${x}^\circ$.`],
      trap: T`Równanie układamy dla dwóch sąsiednich kątów (suma $180^\circ$), a nie dla wszystkich czterech naraz.`,
      tip: 'W równoległoboku kąty przeciwległe są równe, a sąsiednie dają razem $180^\\circ$.'
    });
  }
  const b = r.int(100, 150);
  return mc({
    title: 'Kąty trapezu równoramiennego',
    q: T`Kąt rozwarty trapezu równoramiennego ma miarę $${b}^\circ$. Kąt ostry tego trapezu ma miarę`,
    ok: deg(180 - b),
    bad: [deg(b - 90), deg(360 - 2 * b > 0 ? 360 - 2 * b : 50), deg(180 - b + 10), deg(90), deg((180 - b) * 2)],
    steps: [T`Kąty przy tym samym ramieniu trapezu dają razem $180^\circ$ (ramię przecina dwie proste równoległe).`, T`$180^\circ - ${b}^\circ = ${180 - b}^\circ$.`],
    trap: T`Suma $180^\circ$ dotyczy kątów przy jednym ramieniu, a nie przy jednej podstawie. Przy podstawie trapezu równoramiennego kąty są równe.`,
    tip: 'W każdym trapezie kąty przy jednym ramieniu sumują się do $180^\\circ$.'
  });
};
const quadParallelogramArea = (r) => {
  const a = r.int(4, 14);
  const h = r.int(2, 9);
  const b = r.intNot(4, 14, a);
  need((a * h) % b === 0 && (a * h) / b < a);
  const h2 = (a * h) / b;
  return mc({
    title: 'Dwie wysokości równoległoboku',
    q: T`Boki równoległoboku mają długości $${a}$ i $${b}$. Wysokość opuszczona na bok o długości $${a}$ jest równa $${h}$. Wysokość opuszczona na bok o długości $${b}$ jest równa`,
    ok: m(h2),
    val: h2,
    bad: [m(h), m(fr(b * h, a)), m(fr(a * b, h)), m(h2 + 1), m(fr(a * h, 2 * b))],
    steps: [T`Pole: $P = ${a} \cdot ${h} = ${a * h}$.`, T`To samo pole z drugim bokiem: $${b} \cdot h_2 = ${a * h}$, więc $h_2 = ${h2}$.`],
    trap: T`Pole równoległoboku to bok razy wysokość opuszczona NA TEN bok. Dłuższemu bokowi odpowiada krótsza wysokość.`,
    tip: 'Karta wzorów, str. 19: pole równoległoboku $P = a \\cdot h$.'
  });
};
const quadIsoscelesTrapezoid = (r) => {
  const [x, h, arm] = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [6, 8, 10], [8, 6, 10], [8, 15, 17], [12, 5, 13]]);
  const b = r.int(3, 10);
  const a = b + 2 * x;
  const askArea = r.bool();
  return mc({
    title: askArea ? 'Pole trapezu równoramiennego' : 'Wysokość trapezu równoramiennego',
    q: T`W trapezie równoramiennym podstawy mają długości $${a}$ i $${b}$, a ramię ma długość $${arm}$. ${askArea ? 'Pole tego trapezu jest równe' : 'Wysokość tego trapezu jest równa'}`,
    ok: m(askArea ? ((a + b) * h) / 2 : h),
    val: askArea ? ((a + b) * h) / 2 : h,
    bad: askArea ? [m((a + b) * h), m(((a + b) * arm) / 2), m(a * h), m(((a + b) * h) / 2 + h)] : [m(sq(arm * arm - (a - b) * (a - b) > 0 ? arm * arm - (a - b) * (a - b) : arm * arm + x * x)), m(arm - x), m(h + 1), m(sq(arm * arm + x * x))],
    steps: [T`Wysokości poprowadzone z końców krótszej podstawy odcinają na dłuższej dwa odcinki po $\frac{${a} - ${b}}{2} = ${x}$.`, T`$h = \sqrt{${arm}^2 - ${x}^2} = \sqrt{${h * h}} = ${h}$.`, ...(askArea ? [T`$P = \frac{${a} + ${b}}{2} \cdot ${h} = ${((a + b) * h) / 2}$.`] : [])],
    trap: T`Odcinek odcięty przez wysokość to POŁOWA różnicy podstaw ($${x}$), a nie cała różnica ($${a - b}$).`,
    tip: 'W trapezie równoramiennym wysokości dzielą dłuższą podstawę na trzy części: $x$, $b$, $x$, gdzie $x = \\frac{a - b}{2}$.'
  });
};

// ---------- 9.4 Kąty w okręgu i styczna ----------
const circInscribed = (r) => {
  const ins = r.int(15, 85);
  const fromIns = r.bool();
  return mc({
    title: 'Kąt wpisany i środkowy',
    q: fromIns ? T`Kąt wpisany oparty na pewnym łuku okręgu ma miarę $${ins}^\circ$. Kąt środkowy oparty na tym samym łuku ma miarę` : T`Kąt środkowy oparty na pewnym łuku okręgu ma miarę $${2 * ins}^\circ$. Kąt wpisany oparty na tym samym łuku ma miarę`,
    ok: deg(fromIns ? 2 * ins : ins),
    bad: fromIns ? [deg(ins), deg(180 - ins), deg(ins / 2 === Math.floor(ins / 2) ? ins / 2 : ins + 10), deg(180 - 2 * ins > 0 ? 180 - 2 * ins : 360 - 2 * ins), deg(90 + ins)] : [deg(2 * ins), deg(4 * ins <= 360 ? 4 * ins : 180 - ins), deg(180 - 2 * ins > 0 && 180 - 2 * ins !== ins ? 180 - 2 * ins : ins + 15), deg(90), deg(ins + 5)],
    steps: [T`Kąt środkowy jest dwa razy większy od kąta wpisanego opartego na tym samym łuku.`, fromIns ? T`$2 \cdot ${ins}^\circ = ${2 * ins}^\circ$.` : T`$${2 * ins}^\circ : 2 = ${ins}^\circ$.`],
    trap: T`Większy jest kąt środkowy (ma wierzchołek w środku okręgu). Kąt wpisany to jego połowa – nie odwrotnie.`,
    tip: 'Karta wzorów, str. 18: kąt środkowy ma miarę dwa razy większą niż kąt wpisany oparty na tym samym łuku.'
  });
};
const circDiameter = (r) => {
  const a = r.int(15, 75);
  need(a !== 45);
  return mc({
    title: 'Kąt wpisany oparty na średnicy',
    q: T`Odcinek $AB$ jest średnicą okręgu, a punkt $C$ leży na tym okręgu (różny od $A$ i $B$). Kąt $BAC$ ma miarę $${a}^\circ$. Kąt $ABC$ ma miarę`,
    ok: deg(90 - a),
    bad: [deg(180 - a), deg(90), deg(2 * a), deg(a), deg(180 - 2 * a > 0 && 180 - 2 * a !== 90 - a ? 180 - 2 * a : a + 20)],
    steps: [T`Kąt $ACB$ jest wpisany i oparty na średnicy, więc ma miarę $90^\circ$.`, T`Suma kątów trójkąta: $${a}^\circ + 90^\circ + |\angle ABC| = 180^\circ$, stąd $|\angle ABC| = ${90 - a}^\circ$.`],
    trap: T`Kąt prosty leży przy punkcie $C$ na okręgu, a nie przy końcach średnicy.`,
    tip: 'Kąt wpisany oparty na półokręgu (na średnicy) jest zawsze prosty.'
  });
};
const circIsoscelesCenter = (r) => {
  const c = r.int(20, 160);
  need(c % 2 === 0);
  const fromCentral = r.bool();
  const base = (180 - c) / 2;
  return mc({
    title: 'Trójkąt o wierzchołku w środku okręgu',
    q: fromCentral ? T`Punkty $A$ i $B$ leżą na okręgu o środku $S$. Kąt środkowy $ASB$ ma miarę $${c}^\circ$. Kąt $SAB$ ma miarę` : T`Punkty $A$ i $B$ leżą na okręgu o środku $S$. Kąt $SAB$ ma miarę $${base}^\circ$. Kąt środkowy $ASB$ ma miarę`,
    ok: deg(fromCentral ? base : c),
    bad: fromCentral ? [deg(c / 2 === base ? base + 10 : c / 2), deg(180 - c), deg(90 - c > 0 ? 90 - c : base + 5), deg(c), deg(base + 20)] : [deg(2 * base === c ? c + 10 : 2 * base), deg(180 - base), deg(90 - base > 0 && 90 - base !== c ? 90 - base : c + 20), deg(base), deg(c / 2 === Math.floor(c / 2) && c / 2 !== base ? c / 2 : c - 10)],
    steps: [T`Odcinki $SA$ i $SB$ są promieniami, więc trójkąt $ASB$ jest równoramienny i kąty przy $A$ i $B$ są równe.`, fromCentral ? T`$|\angle SAB| = \frac{180^\circ - ${c}^\circ}{2} = ${base}^\circ$.` : T`$|\angle ASB| = 180^\circ - 2 \cdot ${base}^\circ = ${c}^\circ$.`],
    trap: T`Dwa boki tego trójkąta to promienie – zawsze jest równoramienny. Kąt $SAB$ nie jest kątem wpisanym, więc nie stosujemy tu reguły „połowa kąta środkowego”.`,
    tip: 'Każdy trójkąt o wierzchołku w środku okręgu i dwóch wierzchołkach na okręgu jest równoramienny.'
  });
};
const circTangentLength = (r) => {
  const [rr, t, d] = r.pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [6, 8, 10], [8, 6, 10], [8, 15, 17], [7, 24, 25]]);
  const kind = r.int(0, 1);
  return mc({
    title: 'Odcinek stycznej do okręgu',
    q: kind === 0 ? T`Punkt $P$ leży w odległości $${d}$ od środka $S$ okręgu o promieniu $${rr}$. Przez punkt $P$ poprowadzono styczną do okręgu w punkcie $A$. Długość odcinka $PA$ jest równa` : T`Z punktu $P$ poprowadzono styczną do okręgu o środku $S$ w punkcie $A$. Wiadomo, że $|PA| = ${t}$ oraz $|PS| = ${d}$. Promień tego okręgu jest równy`,
    ok: m(kind === 0 ? t : rr),
    val: kind === 0 ? t : rr,
    bad: kind === 0 ? [m(sq(d * d + rr * rr)), m(d - rr), m(d + rr), m(t + 1)] : [m(sq(d * d + t * t)), m(d - t), m(fr(d, 2)), m(rr + 1)],
    steps: [T`Promień poprowadzony do punktu styczności jest prostopadły do stycznej, więc trójkąt $SAP$ jest prostokątny z kątem prostym przy $A$.`, kind === 0 ? T`$|PA| = \sqrt{${d}^2 - ${rr}^2} = \sqrt{${t * t}} = ${t}$.` : T`$r = \sqrt{${d}^2 - ${t}^2} = \sqrt{${rr * rr}} = ${rr}$.`],
    trap: T`Przeciwprostokątną jest odcinek $PS$ (łączy punkt ze środkiem), a nie styczna. Dlatego kwadraty odejmujemy.`,
    tip: 'Styczna do okręgu jest prostopadła do promienia poprowadzonego do punktu styczności.'
  });
};
const circTangentChord = (r) => {
  const a = r.int(20, 80);
  const kind = r.int(0, 1);
  return mc({
    title: 'Kąt między styczną a cięciwą',
    q: kind === 0 ? T`Prosta $k$ jest styczna do okręgu w punkcie $A$. Cięciwa $AB$ tworzy z prostą $k$ kąt ostry o mierze $${a}^\circ$. Kąt wpisany oparty na łuku $AB$ zawartym w tym kącie ma miarę` : T`Prosta $k$ jest styczna do okręgu o środku $S$ w punkcie $A$. Cięciwa $AB$ tworzy z prostą $k$ kąt ostry o mierze $${a}^\circ$. Kąt środkowy $ASB$ ma miarę`,
    ok: deg(kind === 0 ? a : 2 * a),
    bad: kind === 0 ? [deg(2 * a), deg(90 - a === a ? a + 10 : 90 - a), deg(180 - a), deg(180 - 2 * a > 0 && 180 - 2 * a !== a ? 180 - 2 * a : a + 15)] : [deg(a), deg(180 - 2 * a > 0 && 180 - 2 * a !== 2 * a ? 180 - 2 * a : a + 100), deg(90 - a > 0 ? 90 + a : 95), deg(180 - a)],
    steps: [T`Kąt między styczną a cięciwą jest równy kątowi wpisanemu opartemu na łuku zawartym w tym kącie: $${a}^\circ$.`, ...(kind === 0 ? [] : [T`Kąt środkowy oparty na tym samym łuku jest dwa razy większy: $2 \cdot ${a}^\circ = ${2 * a}^\circ$.`])],
    trap: T`Kąt między styczną a cięciwą zachowuje się jak kąt wpisany, a nie jak kąt środkowy.`,
    tip: 'Karta wzorów, str. 18: kąt między styczną a cięciwą jest równy kątowi wpisanemu opartemu na łuku wyznaczonym przez tę cięciwę.'
  });
};

// ---------- 9.5 Koło: łuk, wycinek, okrąg wpisany i opisany ----------
const arcLength = (r) => {
  const rr = r.int(2, 12);
  const a = r.pick([30, 45, 60, 90, 120, 135, 150, 240, 270]);
  const askArea = r.bool();
  const [n, d] = askArea ? [a * rr * rr, 360] : [a * 2 * rr, 360];
  return mc({
    title: askArea ? 'Pole wycinka koła' : 'Długość łuku okręgu',
    q: askArea ? T`Pole wycinka koła o promieniu $${rr}$ i kącie środkowym $${a}^\circ$ jest równe` : T`Długość łuku okręgu o promieniu $${rr}$, na którym oparty jest kąt środkowy o mierze $${a}^\circ$, jest równa`,
    ok: m(pi(n, d)),
    val: (n / d) * Math.PI,
    bad: [m(pi(askArea ? a * 2 * rr : a * rr * rr, 360)), m(pi(n, 180)), m(pi(n, 720)), m(pi(askArea ? rr * rr : 2 * rr, 1)), m(pi(n + d, d))],
    steps: [T`Wycinek to $\frac{${a}}{360} = ${fr(a, 360)}$ całego koła.`, askArea ? T`Pole koła: $\pi \cdot ${rr}^2 = ${rr * rr}\pi$. Pole wycinka: $${fr(a, 360)} \cdot ${rr * rr}\pi = ${pi(n, d)}$.` : T`Długość okręgu: $2\pi \cdot ${rr} = ${2 * rr}\pi$. Długość łuku: $${fr(a, 360)} \cdot ${2 * rr}\pi = ${pi(n, d)}$.`],
    trap: askArea ? T`Pole wycinka liczymy z pola koła ($\pi r^2$), a długość łuku z obwodu ($2\pi r$). Nie zamieniaj tych wzorów.` : T`Długość łuku liczymy z obwodu ($2\pi r$), a pole wycinka z pola koła ($\pi r^2$). Nie zamieniaj tych wzorów.`,
    tip: 'Karta wzorów, str. 17: pole wycinka $P = \\pi r^2 \\cdot \\frac{\\alpha}{360^\\circ}$, długość łuku $l = 2\\pi r \\cdot \\frac{\\alpha}{360^\\circ}$.'
  });
};
const circleRightTriangle = (r) => {
  const [a, b, c] = r.pick(TRIPLES);
  const circum = r.bool();
  const v = circum ? c / 2 : (a + b - c) / 2;
  return mc({
    title: circum ? 'Okrąg opisany na trójkącie prostokątnym' : 'Okrąg wpisany w trójkąt prostokątny',
    q: T`Przyprostokątne trójkąta prostokątnego mają długości $${a}$ i $${b}$. Promień okręgu ${circum ? 'opisanego na tym trójkącie' : 'wpisanego w ten trójkąt'} jest równy`,
    ok: m(fr(circum ? c : a + b - c, 2)),
    val: v,
    bad: circum ? [m(c), m(fr(a + b - c, 2)), m(fr(a + b, 2)), m(fr(c, 4))] : [m(fr(c, 2)), m(a + b - c), m(fr(a * b, a + b)), m(fr(a + b, 4))],
    steps: [T`Przeciwprostokątna: $c = \sqrt{${a}^2 + ${b}^2} = ${c}$.`, circum ? T`Środek okręgu opisanego na trójkącie prostokątnym to środek przeciwprostokątnej: $R = \frac{c}{2} = ${fr(c, 2)}$.` : T`$r = \frac{a + b - c}{2} = \frac{${a} + ${b} - ${c}}{2} = ${fr(a + b - c, 2)}$.`],
    trap: circum ? T`Promień to POŁOWA przeciwprostokątnej – cała przeciwprostokątna jest średnicą okręgu opisanego.` : T`Wzór $r = \frac{a + b - c}{2}$ działa tylko w trójkącie prostokątnym. W każdym trójkącie można też użyć $r = \frac{2P}{a + b + c}$.`,
    tip: circum ? 'Przeciwprostokątna trójkąta prostokątnego jest średnicą okręgu na nim opisanego.' : 'Karta wzorów, str. 15: w trójkącie prostokątnym $r = \\frac{a + b - c}{2}$, a w każdym trójkącie $P = p \\cdot r$ ($p$ – połowa obwodu).'
  });
};
const circleEquilateral = (r) => {
  const k = r.int(1, 8);
  const a = 6 * k;
  const circum = r.bool();
  // h = a√3/2 = 3k√3 ; R = 2k√3 ; r = k√3
  return mc({
    title: circum ? 'Okrąg opisany na trójkącie równobocznym' : 'Okrąg wpisany w trójkąt równoboczny',
    q: T`Bok trójkąta równobocznego ma długość $${a}$. Promień okręgu ${circum ? 'opisanego na tym trójkącie' : 'wpisanego w ten trójkąt'} jest równy`,
    ok: m(`${circum ? 2 * k : k === 1 ? '' : k}\\sqrt{3}`),
    val: (circum ? 2 * k : k) * Math.sqrt(3),
    bad: [m(`${circum ? (k === 1 ? '' : k) : 2 * k}\\sqrt{3}`), m(`${3 * k}\\sqrt{3}`), m(`${3 * k}`), m(`${6 * k}\\sqrt{3}`), m(`${2 * k}`)],
    steps: [T`Wysokość: $h = \frac{a\sqrt{3}}{2} = ${3 * k}\sqrt{3}$.`, circum ? T`$R = \frac{2}{3}h = ${2 * k}\sqrt{3}$.` : T`$r = \frac{1}{3}h = ${k === 1 ? '' : k}\sqrt{3}$.`],
    trap: T`Środek obu okręgów dzieli wysokość w stosunku $2 : 1$. Dłuższa część ($\frac{2}{3}h$) to promień okręgu opisanego, krótsza ($\frac{1}{3}h$) – wpisanego.`,
    tip: 'Karta wzorów, str. 15: w trójkącie równobocznym $R = \\frac{a\\sqrt{3}}{3}$, $r = \\frac{a\\sqrt{3}}{6}$.'
  });
};
const circleSquare = (r) => {
  const a = r.int(2, 12);
  const kind = r.int(0, 2);
  if (kind === 0)
    return mc({
      title: 'Koło wpisane w kwadrat',
      q: T`Pole koła wpisanego w kwadrat o boku długości $${2 * a}$ jest równe`,
      ok: m(pi(a * a)),
      val: a * a * Math.PI,
      bad: [m(pi(4 * a * a)), m(pi(2 * a)), m(pi(2 * a * a)), m(pi(a))],
      steps: [T`Średnica koła wpisanego w kwadrat jest równa bokowi kwadratu, więc $r = ${a}$.`, T`$P = \pi r^2 = ${a * a}\pi$.`],
      trap: T`Bok kwadratu to średnica koła, a nie promień.`,
      tip: 'Koło wpisane w kwadrat: $r = \\frac{a}{2}$. Koło opisane na kwadracie: $R = \\frac{a\\sqrt{2}}{2}$.'
    });
  if (kind === 1)
    return mc({
      title: 'Kwadrat wpisany w okrąg',
      q: T`Kwadrat jest wpisany w okrąg o promieniu $${a}$. Pole tego kwadratu jest równe`,
      ok: m(2 * a * a),
      val: 2 * a * a,
      bad: [m(4 * a * a), m(a * a), m(`${a * a}\\sqrt{2}`), m(8 * a)],
      steps: [T`Przekątna kwadratu jest średnicą okręgu: $d = ${2 * a}$.`, T`Pole kwadratu z przekątnej: $P = \frac{d^2}{2} = \frac{${4 * a * a}}{2} = ${2 * a * a}$.`],
      trap: T`Średnica okręgu to przekątna kwadratu, a nie jego bok. Bok jest krótszy: $a = \frac{d}{\sqrt{2}}$.`,
      tip: 'Koło wpisane w kwadrat: $r = \\frac{a}{2}$. Koło opisane na kwadracie: $R = \\frac{a\\sqrt{2}}{2}$.'
    });
  return mc({
    title: 'Obwód i pole koła',
    q: T`Obwód koła jest równy $${2 * a}\pi$. Pole tego koła jest równe`,
    ok: m(pi(a * a)),
    val: a * a * Math.PI,
    bad: [m(pi(4 * a * a)), m(pi(2 * a * a)), m(pi(a)), m(`${a * a}`), m(pi(a * a, 2))],
    steps: [T`$2\pi r = ${2 * a}\pi$, więc $r = ${a}$.`, T`$P = \pi r^2 = ${a * a}\pi$.`],
    trap: T`Najpierw wyznacz promień z obwodu, dopiero potem licz pole. $2\pi r$ i $\pi r^2$ to dwa różne wzory.`,
    tip: 'Obwód koła: $2\\pi r$. Pole koła: $\\pi r^2$.'
  });
};
const sectorPerimeter = (r) => {
  const rr = r.pick([2, 3, 4, 6, 9, 12]);
  const a = r.pick([30, 60, 90, 120]);
  const arcN = a * 2 * rr;
  need(arcN % 360 === 0 || (arcN * 3) % 360 === 0 || (arcN * 2) % 360 === 0);
  return mc({
    title: 'Obwód wycinka koła',
    q: T`Koło ma promień równy $${rr}$. Obwód wycinka tego koła o kącie środkowym $${a}^\circ$ jest równy`,
    ok: m(`${pi(arcN, 360)} + ${2 * rr}`),
    val: (arcN / 360) * Math.PI + 2 * rr,
    bad: [m(pi(arcN, 360)), m(`${pi(arcN, 360)} + ${rr}`), m(`${pi(a * rr * rr, 360)} + ${2 * rr}`), m(`${pi(arcN, 180)} + ${2 * rr}`)],
    steps: [T`Długość łuku: $\frac{${a}}{360} \cdot 2\pi \cdot ${rr} = ${pi(arcN, 360)}$.`, T`Obwód wycinka to łuk i dwa promienie: $${pi(arcN, 360)} + 2 \cdot ${rr} = ${pi(arcN, 360)} + ${2 * rr}$.`],
    trap: T`Obwód wycinka to nie sama długość łuku – trzeba doliczyć dwa promienie ograniczające wycinek.`,
    tip: 'Wycinek koła ograniczają dwa promienie i łuk. Jego obwód to $l + 2r$.'
  });
};

export default {
  numericId: 9,
  title: 'Planimetria',
  short_title: 'Planimetria',
  description: 'Twierdzenie Pitagorasa, pola trójkątów i czworokątów, podobieństwo, kąty w okręgu, łuk i wycinek koła.',
  icon: 'Shapes',
  color: '#34D399',
  matura_points_range: '5–8 pkt',
  importance: 'CRITICAL_PEWNIAK',
  cke_formula_page: 'str. 14–20',
  lessons: [
    {
      title: 'Twierdzenie Pitagorasa i pola trójkątów',
      short_title: 'Pitagoras i pola trójkątów',
      pill: pill({
        essence: T`W trójkącie prostokątnym suma kwadratów przyprostokątnych jest równa kwadratowi przeciwprostokątnej: $a^2 + b^2 = c^2$. To najczęściej używane twierdzenie w całej geometrii maturalnej – ukrywa się w przekątnej prostokąta, wysokości trójkąta równoramiennego, boku rombu. Pole trójkąta to zawsze $\frac{1}{2} \cdot \text{podstawa} \cdot \text{wysokość}$; w trójkącie prostokątnym podstawą i wysokością są po prostu przyprostokątne.`,
        context: 'Zadania 20–24 w arkuszu • 1–2 pkt oraz element niemal każdego zadania ze stereometrii.',
        pl: T`Szukasz najdłuższego boku (przeciwprostokątnej)? Dodajesz kwadraty. Szukasz krótszego (przyprostokątnej)? Odejmujesz. I zawsze na końcu pierwiastek. Jeśli w figurze nie ma kąta prostego – narysuj wysokość i sam go sobie stwórz.`,
        steps: [
          ['Znajdź trójkąt prostokątny', T`W trójkącie równoramiennym dorysuj wysokość, w prostokącie – przekątną, w rombie – obie przekątne.`, 'Kąt prosty często trzeba „wyprodukować”.'],
          ['Ustal, czego szukasz', T`Przeciwprostokątna: $c = \sqrt{a^2 + b^2}$. Przyprostokątna: $b = \sqrt{c^2 - a^2}$.`, 'Przeciwprostokątna leży naprzeciw kąta prostego.'],
          ['Policz i uprość pierwiastek', T`$\sqrt{72} = 6\sqrt{2}$.`, 'Wyłącz czynnik przed pierwiastek.']
        ],
        formulas: [
          ['Twierdzenie Pitagorasa', T`a^2 + b^2 = c^2`, 14],
          ['Pole trójkąta', T`P = \frac{1}{2} \cdot a \cdot h_a`, 15],
          ['Trójkąt równoboczny', T`h = \frac{a\sqrt{3}}{2}, \quad P = \frac{a^2\sqrt{3}}{4}`, 15]
        ],
        examples: [
          ['Trójkąt równoramienny', '2 pkt', T`Podstawa trójkąta równoramiennego ma długość $10$, a ramię $13$. Oblicz pole.`, T`1. Wysokość dzieli podstawę na dwie części po $5$.` + '\n' + T`2. $h = \sqrt{169 - 25} = 12$.` + '\n' + T`3. $P = \frac{1}{2} \cdot 10 \cdot 12 = 60$.`, 'Do Pitagorasa wchodzi połowa podstawy.'],
          ['Wysokość na przeciwprostokątną', '1 pkt', T`Boki trójkąta prostokątnego to $6$, $8$, $10$. Oblicz wysokość opuszczoną na przeciwprostokątną.`, T`1. $P = \frac{1}{2} \cdot 6 \cdot 8 = 24$.` + '\n' + T`2. $\frac{1}{2} \cdot 10 \cdot h = 24$.` + '\n' + T`3. $h = 4{,}8$.`, 'To samo pole policzone dwoma sposobami.']
        ],
        trap: T`$\sqrt{a^2 + b^2}$ to NIE jest $a + b$. Dla boków $3$ i $4$ przeciwprostokątna to $5$, a nie $7$.`,
        fail: T`„$c = \sqrt{9 + 16} = 3 + 4 = 7$.”`,
        win: T`$c = \sqrt{9 + 16} = \sqrt{25} = 5$.`,
        why: 'Pierwiastka z sumy nie da się rozbić na sumę pierwiastków.',
        ckeTip: 'Zapamiętaj trójki pitagorejskie: 3–4–5, 5–12–13, 8–15–17, 7–24–25 i ich wielokrotności. Oszczędzają mnóstwo liczenia.',
        points: [T`Przeciwprostokątna: dodaj kwadraty. Przyprostokątna: odejmij.`, T`Pole trójkąta prostokątnego: $\frac{1}{2}ab$.`, T`Brak kąta prostego? Dorysuj wysokość.`]
      }),
      gens: [pitHypotenuse, pitLeg, triRightAreaHeight, triIsosceles, rectDiagonal]
    },
    {
      title: 'Podobieństwo figur, skala i twierdzenie Talesa',
      short_title: 'Podobieństwo i Tales',
      pill: pill({
        essence: T`Figury podobne mają ten sam kształt, ale różną wielkość. Skala podobieństwa $k$ to stosunek odpowiadających sobie długości. Wszystkie długości (boki, wysokości, obwody) zmieniają się $k$ razy, a pola – $k^2$ razy. Trójkąty są podobne między innymi wtedy, gdy mają dwa równe kąty. Dlatego prosta równoległa do boku trójkąta odcina trójkąt podobny – to sedno twierdzenia Talesa.`,
        context: 'Zadania 21–24 w arkuszu • 1–2 pkt. Pola figur podobnych to stały punkt programu.',
        pl: T`Powiększasz zdjęcie dwukrotnie: każdy bok jest $2$ razy dłuższy, ale powierzchnia rośnie $4$ razy, bo rośnie i szerokość, i wysokość. Dlatego pizza o dwa razy większej średnicy to cztery razy więcej jedzenia.`,
        steps: [
          ['Wyznacz skalę', T`Boki $6$ i $18$ odpowiadają sobie: $k = \frac{18}{6} = 3$.`, 'Dziel odpowiadające sobie długości.'],
          ['Długości mnóż przez k', T`Obwód rośnie $3$ razy.`, 'Boki, wysokości, obwody, przekątne.'],
          ['Pola mnóż przez k²', T`Pole rośnie $9$ razy.`, 'Kwadrat skali.']
        ],
        formulas: [
          ['Skala podobieństwa', T`k = \frac{a'}{a}`],
          ['Stosunek pól', T`\frac{P'}{P} = k^2`],
          ['Twierdzenie Talesa', T`\frac{|AD|}{|AB|} = \frac{|AE|}{|AC|} = \frac{|DE|}{|BC|}`, 17]
        ],
        examples: [
          ['Pola figur podobnych', '1 pkt', T`Trójkąt $T_2$ jest podobny do $T_1$ w skali $k = \frac{3}{2}$. Pole $T_1$ jest równe $8$. Oblicz pole $T_2$.`, T`1. $k^2 = \frac{9}{4}$.` + '\n' + T`2. $P_2 = 8 \cdot \frac{9}{4} = 18$.`, 'Skala ułamkowa też podnosi się do kwadratu.'],
          ['Tales', '1 pkt', T`W trójkącie $ABC$ odcinek $DE$ jest równoległy do $BC$ ($D$ na $AB$, $E$ na $AC$). $|AD| = 4$, $|AB| = 10$, $|BC| = 15$. Oblicz $|DE|$.`, T`1. $\frac{|DE|}{|BC|} = \frac{|AD|}{|AB|} = \frac{4}{10}$.` + '\n' + T`2. $|DE| = 15 \cdot \frac{2}{5} = 6$.`, 'Bierzemy cały bok AB, nie sam odcinek DB.']
        ],
        trap: T`Pole zmienia się $k^2$ razy, a NIE $k$ razy. Skala $3$ oznacza pole $9$ razy większe.`,
        fail: T`„Skala $k = 3$, pole $6$, więc nowe pole to $18$.”`,
        win: T`$P' = 6 \cdot 3^2 = 54$.`,
        why: 'Pole to iloczyn dwóch długości, a każda z nich rośnie k razy.',
        ckeTip: 'Jeśli zadanie podaje stosunek pól, skala to pierwiastek z tego stosunku. Pola 4 i 36 dają k² = 9, czyli k = 3.',
        points: [T`Długości: razy $k$. Pola: razy $k^2$.`, T`Skala z pól: $k = \sqrt{\frac{P'}{P}}$.`, T`Prosta równoległa do boku odcina trójkąt podobny.`]
      }),
      gens: [simArea, simScaleFromAreas, thales, simTriangleSides, simMapScale]
    },
    {
      title: 'Czworokąty: równoległobok, romb, trapez',
      short_title: 'Czworokąty',
      pill: pill({
        essence: T`Każdy czworokąt ma swoje „narzędzie”. Równoległobok: pole to bok razy wysokość opuszczona na ten bok, a sąsiednie kąty dają $180^\circ$. Romb: przekątne są prostopadłe i dzielą się na połowy, pole to połowa ich iloczynu. Trapez: pole to średnia podstaw razy wysokość, a kąty przy każdym ramieniu dają $180^\circ$. W trapezie równoramiennym wysokości odcinają dwa jednakowe trójkąty prostokątne.`,
        context: 'Zadania 21–25 w arkuszu • 1–2 pkt, często z rysunkiem.',
        pl: T`Romb to cztery jednakowe trójkąty prostokątne zlepione wierzchołkami – stąd Pitagoras na połówkach przekątnych. Trapez równoramienny to prostokąt z doklejonymi po bokach dwoma trójkątami prostokątnymi – tam szukaj wysokości.`,
        steps: [
          ['Rozpoznaj figurę i wypisz własności', T`Romb: przekątne prostopadłe. Trapez równoramienny: równe ramiona i kąty przy podstawie.`, 'Własności to połowa rozwiązania.'],
          ['Znajdź trójkąt prostokątny', T`Trapez $a = 16$, $b = 10$, ramię $5$: odcinki po $\frac{16 - 10}{2} = 3$, $h = \sqrt{25 - 9} = 4$.`, 'Połowa różnicy podstaw.'],
          ['Zastosuj wzór na pole', T`$P = \frac{16 + 10}{2} \cdot 4 = 52$.`, 'Średnia podstaw razy wysokość.']
        ],
        formulas: [
          ['Równoległobok', T`P = a \cdot h`, 19],
          ['Romb', T`P = \frac{1}{2} \cdot d_1 \cdot d_2`, 20],
          ['Trapez', T`P = \frac{a + b}{2} \cdot h`, 19]
        ],
        examples: [
          ['Romb', '1 pkt', T`Przekątne rombu mają długości $10$ i $24$. Oblicz bok rombu.`, T`1. Połowy przekątnych: $5$ i $12$.` + '\n' + T`2. $a = \sqrt{25 + 144} = 13$.`, 'Połowy przekątnych są przyprostokątnymi.'],
          ['Dwie wysokości', '1 pkt', T`Boki równoległoboku mają długości $12$ i $8$. Wysokość opuszczona na bok $12$ jest równa $6$. Oblicz wysokość opuszczoną na bok $8$.`, T`1. $P = 12 \cdot 6 = 72$.` + '\n' + T`2. $8 \cdot h = 72$, $h = 9$.`, 'Krótszy bok – dłuższa wysokość.']
        ],
        trap: T`W trapezie równoramiennym wysokość odcina POŁOWĘ różnicy podstaw, a nie całą różnicę.`,
        fail: T`Podstawy $16$ i $10$, ramię $5$: „$h = \sqrt{25 - 36}$”.`,
        win: T`Odcinek to $\frac{16 - 10}{2} = 3$, więc $h = \sqrt{25 - 9} = 4$.`,
        why: 'Różnica podstaw rozkłada się po równo na lewą i prawą stronę trapezu.',
        ckeTip: 'Wzory na pola wszystkich czworokątów są w karcie wzorów na str. 19–20.',
        points: [T`Romb: przekątne prostopadłe, $P = \frac{d_1 d_2}{2}$.`, T`Trapez: $P = \frac{a + b}{2} \cdot h$.`, T`Kąty przy ramieniu trapezu i sąsiednie kąty równoległoboku dają $180^\circ$.`]
      }),
      gens: [quadRhombus, quadTrapezoid, quadParallelogramAngles, quadParallelogramArea, quadIsoscelesTrapezoid]
    },
    {
      title: 'Kąty w okręgu i styczna do okręgu',
      short_title: 'Kąty w okręgu',
      pill: pill({
        essence: T`Kąt środkowy ma wierzchołek w środku okręgu, kąt wpisany – na okręgu. Jeśli oba są oparte na tym samym łuku, kąt środkowy jest dwa razy większy. Stąd wniosek: kąt wpisany oparty na średnicy jest prosty. Styczna do okręgu jest prostopadła do promienia poprowadzonego do punktu styczności, a kąt między styczną a cięciwą jest równy kątowi wpisanemu opartemu na tej cięciwie.`,
        context: 'Zadania 20–23 w arkuszu • 1 pkt, niemal zawsze z rysunkiem okręgu.',
        pl: T`Kąt środkowy siedzi w pierwszym rzędzie (w samym środku) i widzi łuk „szeroko”. Kąt wpisany stoi pod ścianą (na okręgu) i ten sam łuk widzi dwa razy „węziej”. A każdy trójkąt, którego dwa boki są promieniami, jest równoramienny – to otwiera większość zadań.`,
        steps: [
          ['Zaznacz promienie', T`Odcinki od środka do punktów na okręgu są równe – szukaj trójkątów równoramiennych.`, 'To najczęstszy klucz do zadania.'],
          ['Znajdź kąty oparte na tym samym łuku', T`Środkowy $= 2 \cdot$ wpisany. Dwa wpisane na tym samym łuku są równe.`, 'Sprawdź, na jaki łuk „patrzy” kąt.'],
          ['Wykorzystaj kąty proste', T`Wpisany na średnicy: $90^\circ$. Promień i styczna: $90^\circ$.`, 'Kąt prosty to Pitagoras lub trygonometria.']
        ],
        formulas: [
          ['Kąt środkowy i wpisany', T`\beta_{\text{środkowy}} = 2 \cdot \alpha_{\text{wpisany}}`, 18],
          ['Kąt wpisany na średnicy', T`\alpha = 90^\circ`],
          ['Styczna i promień', T`\text{styczna} \perp \text{promień}`]
        ],
        examples: [
          ['Trójkąt z promieni', '1 pkt', T`Punkty $A$, $B$ leżą na okręgu o środku $S$, kąt $ASB$ ma miarę $100^\circ$. Oblicz kąt $SAB$.`, T`1. $SA = SB$ (promienie), trójkąt równoramienny.` + '\n' + T`2. $|\angle SAB| = \frac{180^\circ - 100^\circ}{2} = 40^\circ$.`, 'Dwa promienie – trójkąt równoramienny.'],
          ['Styczna', '1 pkt', T`Punkt $P$ leży w odległości $13$ od środka okręgu o promieniu $5$. Oblicz długość odcinka stycznej poprowadzonej z $P$.`, T`1. Promień do punktu styczności jest prostopadły do stycznej.` + '\n' + T`2. $\sqrt{13^2 - 5^2} = 12$.`, 'Odcinek łączący P ze środkiem jest przeciwprostokątną.']
        ],
        trap: T`To kąt ŚRODKOWY jest większy. Kąt wpisany to jego połowa, nie podwojenie.`,
        fail: T`„Kąt środkowy ma $80^\circ$, więc wpisany oparty na tym samym łuku ma $160^\circ$.”`,
        win: T`Kąt wpisany ma $40^\circ$.`,
        why: 'Wierzchołek kąta wpisanego jest dalej od łuku niż środek okręgu, więc „widzi” łuk pod mniejszym kątem.',
        ckeTip: 'Dorysuj na rysunku w arkuszu wszystkie promienie do zaznaczonych punktów – trójkąty równoramienne same się pokażą.',
        points: [T`Środkowy $= 2 \cdot$ wpisany (ten sam łuk).`, T`Kąt wpisany oparty na średnicy ma $90^\circ$.`, T`Styczna jest prostopadła do promienia w punkcie styczności.`]
      }),
      gens: [circInscribed, circDiameter, circIsoscelesCenter, circTangentLength, circTangentChord]
    },
    {
      title: 'Koło: łuk, wycinek, okrąg wpisany i opisany',
      short_title: 'Łuk, wycinek, okręgi',
      pill: pill({
        essence: T`Wycinek koła o kącie środkowym $\alpha$ to $\frac{\alpha}{360^\circ}$ całego koła – taką samą część stanowi jego pole i długość jego łuku. Okrąg opisany na trójkącie prostokątnym ma środek w połowie przeciwprostokątnej ($R = \frac{c}{2}$). W trójkącie równobocznym środek obu okręgów dzieli wysokość w stosunku $2 : 1$: $R = \frac{2}{3}h$, $r = \frac{1}{3}h$.`,
        context: 'Zadania 21–24 w arkuszu • 1 pkt. Wycinek koła wraca też przy powierzchni bocznej stożka.',
        pl: T`Wycinek to kawałek pizzy. Kąt $90^\circ$ to ćwiartka, $60^\circ$ to jedna szósta, $120^\circ$ to jedna trzecia. Jaka część pizzy – taka część pola i taka część brzegu.`,
        steps: [
          ['Ustal, jaka to część koła', T`Kąt $120^\circ$: $\frac{120}{360} = \frac{1}{3}$.`, 'Skróć ułamek od razu.'],
          ['Policz całe koło lub okrąg', T`$r = 6$: pole $36\pi$, obwód $12\pi$.`, 'Pole: πr². Obwód: 2πr.'],
          ['Weź odpowiednią część', T`Pole wycinka: $12\pi$. Długość łuku: $4\pi$.`, 'Obwód wycinka to łuk plus dwa promienie.']
        ],
        formulas: [
          ['Pole wycinka', T`P = \pi r^2 \cdot \frac{\alpha}{360^\circ}`, 17],
          ['Długość łuku', T`l = 2\pi r \cdot \frac{\alpha}{360^\circ}`, 17],
          ['Trójkąt prostokątny', T`R = \frac{c}{2}, \quad r = \frac{a + b - c}{2}`]
        ],
        examples: [
          ['Obwód wycinka', '1 pkt', T`Oblicz obwód wycinka koła o promieniu $3$ i kącie $120^\circ$.`, T`1. Łuk: $\frac{1}{3} \cdot 2\pi \cdot 3 = 2\pi$.` + '\n' + T`2. Obwód: $2\pi + 3 + 3 = 2\pi + 6$.`, 'Dwa promienie też należą do brzegu wycinka.'],
          ['Okrąg opisany', '1 pkt', T`Przyprostokątne trójkąta mają długości $6$ i $8$. Oblicz promień okręgu opisanego.`, T`1. $c = 10$.` + '\n' + T`2. $R = \frac{10}{2} = 5$.`, 'Przeciwprostokątna jest średnicą.']
        ],
        trap: T`Pole wycinka liczysz z $\pi r^2$, a długość łuku z $2\pi r$. Pomylenie tych wzorów to najczęstszy błąd w zadaniach o kole.`,
        fail: T`Długość łuku ($r = 6$, $\alpha = 60^\circ$): „$\frac{1}{6} \cdot 36\pi = 6\pi$”.`,
        win: T`$\frac{1}{6} \cdot 2\pi \cdot 6 = 2\pi$.`,
        why: 'Długość to wielkość „jednowymiarowa” (r w pierwszej potędze), pole – „dwuwymiarowa” (r do kwadratu).',
        ckeTip: 'Wzory na pole wycinka i długość łuku są w karcie wzorów na str. 17.',
        points: [T`Wycinek to $\frac{\alpha}{360^\circ}$ koła.`, T`Okrąg opisany na trójkącie prostokątnym: $R = \frac{c}{2}$.`, T`Trójkąt równoboczny: $R = \frac{2}{3}h$, $r = \frac{1}{3}h$.`]
      }),
      gens: [arcLength, circleRightTriangle, circleEquilateral, circleSquare, sectorPerimeter]
    }
  ]
};
