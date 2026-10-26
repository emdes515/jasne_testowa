import { T, mc, num, pf, open, pill, fr, m, need } from '../math_pp/lib.js';
import { pickTwo } from './common.js';
import { surd, sTex, sMul, sinS, rad } from './geo.js';

const TIP_PROOF = 'Dowód geometryczny: zapisz założenia (oznaczenia na rysunku), każdy krok uzasadnij twierdzeniem lub własnością, a na końcu napisz wniosek, który jest tezą.';
const TIP_INSCRIBED = 'Karta wzorów, str. 18: kąt środkowy jest dwa razy większy od kąta wpisanego opartego na tym samym łuku; kąty wpisane oparte na tym samym łuku są równe.';
const TIP_SIMILAR = 'Karta wzorów, str. 17: cechy podobieństwa (bbb, bkb, kkk); stosunek pól figur podobnych to kwadrat skali.';
const TIP_AREA = 'Pola porównujesz przez wspólną podstawę i równe wysokości albo ze wzoru $P = \\frac{1}{2}ab\\sin\\gamma$ (karta, str. 15).';
const TIP_CYCLIC = 'Karta wzorów, str. 20: okrąg opisany – sumy przeciwległych kątów $180^\\circ$; okrąg wpisany – równe sumy przeciwległych boków.';

const deg = (x) => `${x}^\\circ`;

/** Zadanie otwarte z puli dowodów: { q, stages, steps, trap, thesis }. */
const proofFrom = (pool, title, tip) => (r) => {
  const p = r.pick(pool);
  return open({ title, q: p.q, stages: p.stages, steps: p.steps, trap: p.trap, tip, answer: p.thesis, proof: true });
};

/** Zadanie ABCD z puli pytań o strukturę rozumowania (opcje tekstowe). */
const choiceFrom = (pool, title, tip) => (r) => {
  const p = r.pick(pool);
  return mc({ title, q: p.q, ok: p.ok, bad: p.bad, steps: p.steps, trap: p.trap, tip });
};

const factsFrom = (pool, title, trap, tip) => (r) => {
  const [s1, s2] = pickTwo(r, pool);
  return pf({ title, s1, s2, trap, tip });
};

// ---------- 10.1 Założenie, teza, uzasadnienie ----------
const exteriorAngle = (r) => {
  const a = r.int(25, 85);
  const b = r.int(25, 85);
  need(a + b < 170);
  return num({
    title: 'Kąt zewnętrzny trójkąta',
    q: T`W trójkącie $ABC$: $|\angle A| = ${deg(a)}$ i $|\angle B| = ${deg(b)}$. Oblicz miarę kąta zewnętrznego przy wierzchołku $C$ (w stopniach). Wpisz liczbę.`,
    ans: a + b,
    steps: [T`$|\angle C| = 180^\circ - ${deg(a)} - ${deg(b)} = ${deg(180 - a - b)}$.`, T`Kąt zewnętrzny to $180^\circ - ${deg(180 - a - b)} = ${deg(a + b)}$, czyli suma kątów $A$ i $B$.`],
    trap: 'Kąt zewnętrzny jest PRZYLEGŁY do wewnętrznego – to nie jest kąt $C$.',
    tip: TIP_PROOF
  });
};

const altitudeAngle = (r) => {
  const b = r.int(20, 70);
  const askACD = r.bool();
  return num({
    title: 'Kąty przy wysokości trójkąta prostokątnego',
    q: T`W trójkącie prostokątnym $ABC$ kąt $ACB$ jest prosty, a $CD$ jest wysokością. Wiadomo, że $|\angle ABC| = ${deg(b)}$. Oblicz miarę kąta ${askACD ? 'ACD' : 'BCD'} (w stopniach). Wpisz liczbę.`,
    ans: askACD ? b : 90 - b,
    steps: askACD
      ? [T`$|\angle BAC| = 90^\circ - ${deg(b)} = ${deg(90 - b)}$.`, T`W trójkącie $ADC$: $|\angle ACD| = 90^\circ - ${deg(90 - b)} = ${deg(b)}$.`]
      : [T`W trójkącie $BDC$ kąt przy $D$ jest prosty.`, T`$|\angle BCD| = 90^\circ - ${deg(b)} = ${deg(90 - b)}$.`],
    trap: 'Wysokość dzieli kąt prosty na dwa kąty, które odpowiadają kątom ostrym trójkąta „na krzyż”.',
    tip: TIP_PROOF
  });
};

const STRUCTURE = [
  {
    q: T`Trójkąty $ABD$ i $CBD$ mają wspólny bok $BD$, a ponadto $|AB| = |CB|$ i $|AD| = |CD|$. Przystawanie tych trójkątów wynika z cechy`,
    ok: 'bok–bok–bok',
    bad: ['bok–kąt–bok', 'kąt–bok–kąt', 'kąt–kąt–kąt'],
    steps: ['Znamy trzy pary równych boków: $AB$ i $CB$, $AD$ i $CD$, wspólny $BD$.', 'To cecha bok–bok–bok.'],
    trap: 'Cecha kąt–kąt–kąt daje tylko podobieństwo, nigdy przystawanie.'
  },
  {
    q: T`W trójkącie $ABC$ zachodzi $|AC| = |BC|$. Równość $|\angle CAB| = |\angle CBA|$ wynika z tego, że`,
    ok: 'w trójkącie równoramiennym kąty przy podstawie są równe',
    bad: ['suma kątów trójkąta wynosi $180^\\circ$', 'kąty wierzchołkowe są równe', 'kąty naprzemianległe są równe'],
    steps: ['Trójkąt ma dwa równe boki $AC$ i $BC$ – jest równoramienny o podstawie $AB$.', 'Kąty przy podstawie trójkąta równoramiennego są równe.'],
    trap: 'Każdy krok dowodu uzasadniasz właściwą własnością – sama suma kątów nic tu nie daje.'
  },
  {
    q: 'Teza twierdzenia „Jeśli czworokąt jest równoległobokiem, to jego przekątne dzielą się na połowy” brzmi:',
    ok: 'przekątne czworokąta dzielą się na połowy',
    bad: ['czworokąt jest równoległobokiem', 'przeciwległe boki czworokąta są równe', 'przekątne czworokąta są prostopadłe'],
    steps: ['W zdaniu „jeśli Z, to T” założeniem jest Z, a tezą – T.', 'Teza to część po słowie „to”.'],
    trap: 'Nie myl założenia z tezą – dowód zaczyna się od założenia, a kończy tezą.'
  },
  {
    q: 'Założenie twierdzenia „Jeśli w trójkącie dwa kąty są równe, to trójkąt jest równoramienny” brzmi:',
    ok: 'w trójkącie dwa kąty są równe',
    bad: ['trójkąt jest równoramienny', 'suma kątów trójkąta wynosi $180^\\circ$', 'trójkąt ma dwa równe boki'],
    steps: ['Założenie to część między „jeśli” a „to”.', 'Tu: dwa kąty trójkąta są równe.'],
    trap: 'W dowodzie nie wolno korzystać z tezy – trzeba do niej dojść.'
  },
  {
    q: T`Proste $a$ i $b$ są równoległe i przecina je prosta $c$. Równość kątów naprzemianległych przy prostych $a$ i $b$ wynika z`,
    ok: 'równoległości prostych $a$ i $b$',
    bad: ['twierdzenia Pitagorasa', 'twierdzenia sinusów', 'równości kątów wierzchołkowych'],
    steps: ['Kąty naprzemianległe są równe dokładnie wtedy, gdy proste są równoległe.', 'Uzasadnieniem jest założenie $a \\parallel b$.'],
    trap: 'Kąty wierzchołkowe leżą przy jednej prostej – nie łączą dwóch różnych prostych.'
  }
];

const STRUCTURE_FACTS = [
  ['Sprawdzenie twierdzenia na kilku konkretnych trójkątach jest jego dowodem.', false, 'Przykłady ilustrują, ale nie dowodzą – teza musi być wykazana dla dowolnej figury spełniającej założenia.'],
  ['Kąty wierzchołkowe mają równe miary.', true, 'Oba są przyległe do tego samego kąta, więc dopełniają go do $180^\\circ$.'],
  [T`Suma kątów zewnętrznych trójkąta (po jednym przy każdym wierzchołku) jest równa $360^\circ$.`, true, T`$3 \cdot 180^\circ - 180^\circ = 360^\circ$.`],
  ['Jeśli dwa trójkąty mają odpowiednio równe kąty, to są przystające.', false, 'Są tylko podobne – mogą mieć różne rozmiary.'],
  ['Kąt zewnętrzny trójkąta jest równy sumie dwóch kątów wewnętrznych do niego nieprzyległych.', true, T`Oba są równe $180^\circ$ minus trzeci kąt.`],
  ['Dwusieczne dwóch kątów przyległych są prostopadłe.', true, T`Kąty przyległe sumują się do $180^\circ$, więc ich połowy – do $90^\circ$.`]
];

const PROOFS_1 = [
  {
    q: T`W trójkącie $ABC$ punkt $D$ jest środkiem boku $AB$ i $|CD| = \frac{1}{2}|AB|$. Wykaż, że kąt $ACB$ jest prosty.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że $|AD| = |DB| = |CD|$, więc trójkąty $ADC$ i $BDC$ są równoramienne.`],
      [2, 'Etap 2', T`Oznaczenie $|\angle DAC| = |\angle DCA| = \alpha$, $|\angle DBC| = |\angle DCB| = \beta$ i zapisanie sumy kątów trójkąta $ABC$: $2\alpha + 2\beta = 180^\circ$.`],
      [3, 'Komplet', T`Wniosek: $|\angle ACB| = \alpha + \beta = 90^\circ$.`]
    ],
    steps: [
      T`$D$ jest środkiem $AB$, więc $|AD| = |DB| = \frac{1}{2}|AB| = |CD|$.`,
      T`Trójkąt $ADC$ jest równoramienny: $|\angle DAC| = |\angle DCA| = \alpha$. Trójkąt $BDC$: $|\angle DBC| = |\angle DCB| = \beta$.`,
      T`Suma kątów trójkąta $ABC$: $\alpha + \beta + (\alpha + \beta) = 180^\circ$, więc $|\angle ACB| = \alpha + \beta = 90^\circ$.`
    ],
    trap: T`Kąt $ACB$ składa się z DWÓCH części: $\alpha$ i $\beta$ – obie trzeba uwzględnić w sumie kątów.`,
    thesis: T`$|\angle ACB| = 90^\circ$`
  },
  {
    q: T`W trapezie $ABCD$ o podstawach $AB$ i $CD$ dwusieczne kątów $DAB$ i $ADC$ przecinają się w punkcie $P$. Wykaż, że kąt $APD$ jest prosty.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że $|\angle DAB| + |\angle ADC| = 180^\circ$ (kąty przy ramieniu trapezu, $AB \parallel CD$).`],
      [2, 'Komplet', T`Z sumy kątów trójkąta $APD$: $|\angle APD| = 180^\circ - \frac{1}{2}(|\angle DAB| + |\angle ADC|) = 90^\circ$.`]
    ],
    steps: [
      T`$AB \parallel CD$, więc kąty $DAB$ i $ADC$ przy ramieniu $AD$ sumują się do $180^\circ$.`,
      T`Dwusieczne dzielą je na połowy: $|\angle PAD| + |\angle PDA| = 90^\circ$.`,
      T`W trójkącie $APD$: $|\angle APD| = 180^\circ - 90^\circ = 90^\circ$.`
    ],
    trap: 'Kluczowe uzasadnienie to równoległość podstaw – bez niej suma kątów przy ramieniu nie musi być $180^\\circ$.',
    thesis: T`$|\angle APD| = 90^\circ$`
  },
  {
    q: T`W trójkącie prostokątnym $ABC$ kąt $ACB$ jest prosty, a $CD$ jest wysokością. Wykaż, że $|\angle ACD| = |\angle ABC|$.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie $|\angle BAC| = 90^\circ - |\angle ABC|$ (trójkąt $ABC$).`],
      [2, 'Komplet', T`Zapisanie $|\angle ACD| = 90^\circ - |\angle BAC|$ (trójkąt $ADC$, kąt prosty przy $D$) i wniosek.`]
    ],
    steps: [
      T`Oznaczmy $|\angle ABC| = \beta$. W trójkącie $ABC$: $|\angle BAC| = 90^\circ - \beta$.`,
      T`W trójkącie $ADC$ kąt przy $D$ jest prosty: $|\angle ACD| = 90^\circ - (90^\circ - \beta) = \beta$.`
    ],
    trap: 'Każdy z trzech trójkątów (duży i dwa małe) ma kąt prosty – zapisz, z którego korzystasz.',
    thesis: T`$|\angle ACD| = |\angle ABC|$`
  },
  {
    q: T`Wykaż, że kąt zewnętrzny trójkąta jest równy sumie dwóch kątów wewnętrznych tego trójkąta do niego nieprzyległych.`,
    stages: [
      [1, 'Etap 1', T`Oznaczenie kątów $\alpha, \beta, \gamma$ i kąta zewnętrznego $\delta$ przy wierzchołku $C$; zapisanie $\delta = 180^\circ - \gamma$.`],
      [2, 'Komplet', T`Zapisanie $\gamma = 180^\circ - \alpha - \beta$ i wniosek $\delta = \alpha + \beta$.`]
    ],
    steps: [
      T`Kąt zewnętrzny $\delta$ przy $C$ jest przyległy do $\gamma$: $\delta = 180^\circ - \gamma$.`,
      T`Z sumy kątów trójkąta $\gamma = 180^\circ - \alpha - \beta$, więc $\delta = \alpha + \beta$.`
    ],
    trap: 'Dowód ma być ogólny – oznacz kąty literami, nie wstawiaj liczb.',
    thesis: T`$\delta = \alpha + \beta$`
  },
  {
    q: T`W równoległoboku $ABCD$ dwusieczne kątów $DAB$ i $ABC$ przecinają się w punkcie $P$. Wykaż, że $|\angle APB| = 90^\circ$.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że $|\angle DAB| + |\angle ABC| = 180^\circ$ (kąty sąsiednie równoległoboku).`],
      [2, 'Komplet', T`Z sumy kątów trójkąta $ABP$: $|\angle APB| = 180^\circ - 90^\circ = 90^\circ$.`]
    ],
    steps: [
      T`$AD \parallel BC$, więc kąty $DAB$ i $ABC$ sumują się do $180^\circ$.`,
      T`$|\angle PAB| + |\angle PBA| = \frac{1}{2} \cdot 180^\circ = 90^\circ$, więc w trójkącie $ABP$ kąt przy $P$ ma $90^\circ$.`
    ],
    trap: 'Uzasadnij, skąd suma $180^\\circ$: kąty sąsiednie równoległoboku (z równoległości boków).',
    thesis: T`$|\angle APB| = 90^\circ$`
  }
];

// ---------- 10.2 Kąty wpisane i środkowe ----------
const inscribedCentral = (r) => {
  const v = r.int(0, 2);
  const x = r.int(15, 85);
  if (v === 0) {
    return num({
      title: 'Kąt wpisany i środkowy',
      q: T`Kąt środkowy $AOB$ okręgu ma miarę $${deg(2 * x)}$. Oblicz miarę kąta wpisanego $ACB$ opartego na tym samym łuku $AB$ (w stopniach). Wpisz liczbę.`,
      ans: x,
      steps: [T`Kąt wpisany jest dwa razy mniejszy od środkowego opartego na tym samym łuku.`, T`$|\angle ACB| = \frac{${2 * x}^\circ}{2} = ${deg(x)}$.`],
      trap: 'Kąt środkowy jest większy – dzielisz przez 2, nie mnożysz.',
      tip: TIP_INSCRIBED
    });
  }
  if (v === 1) {
    return num({
      title: 'Kąt wpisany na łuku dopełniającym',
      q: T`Punkty $A$, $B$, $C$, $D$ leżą na okręgu, przy czym $C$ i $D$ leżą po przeciwnych stronach cięciwy $AB$. Wiadomo, że $|\angle ACB| = ${deg(x)}$. Oblicz miarę kąta $ADB$ (w stopniach). Wpisz liczbę.`,
      ans: 180 - x,
      steps: [T`Czworokąt $ACBD$ jest wpisany w okrąg, a kąty $C$ i $D$ są w nim przeciwległe.`, T`$|\angle ADB| = 180^\circ - ${deg(x)} = ${deg(180 - x)}$.`],
      trap: 'Kąty wpisane po PRZECIWNYCH stronach cięciwy opierają się na różnych łukach – sumują się do $180^\\circ$, a nie są równe.',
      tip: TIP_INSCRIBED
    });
  }
  return num({
    title: 'Kąt przy podstawie trójkąta z kątem środkowym',
    q: T`Punkty $A$ i $B$ leżą na okręgu o środku $O$, a $|\angle AOB| = ${deg(2 * x)}$. Oblicz miarę kąta $OAB$ (w stopniach). Wpisz liczbę.`,
    ans: 90 - x,
    steps: [T`$|OA| = |OB|$ (promienie), więc trójkąt $AOB$ jest równoramienny.`, T`$|\angle OAB| = \frac{180^\circ - ${deg(2 * x)}}{2} = ${deg(90 - x)}$.`],
    trap: 'Trójkąt z dwoma promieniami jest zawsze równoramienny – to najczęstszy krok w dowodach z okręgiem.',
    tip: TIP_INSCRIBED
  });
};

const tangentChord = (r) => {
  const x = r.int(20, 80);
  return mc({
    title: 'Kąt między styczną a cięciwą',
    q: T`Prosta $k$ jest styczna do okręgu w punkcie $A$, a $AB$ jest cięciwą tego okręgu. Punkt $C$ leży na okręgu po przeciwnej stronie cięciwy $AB$ niż ostry kąt między styczną a cięciwą. Wiadomo, że $|\angle ACB| = ${deg(x)}$. Ostry kąt między styczną $k$ a cięciwą $AB$ ma miarę`,
    ok: m(deg(x)),
    val: x,
    bad: [m(deg(2 * x)), m(deg(90 - x)), m(deg(180 - x)), m(deg(90 + x))],
    steps: [T`Kąt między styczną a cięciwą jest równy kątowi wpisanemu opartemu na łuku $AB$ (leżącym wewnątrz tego kąta).`, T`Szukany kąt ma $${deg(x)}$.`],
    trap: T`Uzasadnienie: promień $OA$ jest prostopadły do stycznej, a kąt $AOB = ${deg(2 * x)}$ – stąd kąt między styczną a cięciwą to $90^\circ - (90^\circ - ${deg(x)})$.`,
    tip: TIP_INSCRIBED
  });
};

const INSCRIBED_FACTS = [
  ['Kąt wpisany oparty na półokręgu jest prosty.', true, T`Odpowiadający mu kąt środkowy ma $180^\circ$.`],
  ['Kąt środkowy jest dwa razy mniejszy od kąta wpisanego opartego na tym samym łuku.', false, 'Kąt środkowy jest dwa razy WIĘKSZY.'],
  ['Styczna do okręgu jest prostopadła do promienia poprowadzonego do punktu styczności.', true, 'To własność stycznej.'],
  ['Wszystkie kąty wpisane oparte na tym samym łuku mają równe miary.', true, 'Każdy jest połową tego samego kąta środkowego.'],
  ['Kąty wpisane oparte na dwóch łukach dopełniających się do całego okręgu mają równe miary.', false, T`Sumują się do $180^\circ$.`]
];

const PROOFS_2 = [
  {
    q: T`Punkty $A$, $B$, $C$, $D$ leżą na okręgu w tej kolejności, a cięciwy $AC$ i $BD$ przecinają się w punkcie $P$. Wykaż, że $|AP| \cdot |PC| = |BP| \cdot |PD|$.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie równości kątów wpisanych: $|\angle BAC| = |\angle BDC|$ (łuk $BC$) oraz $|\angle ABD| = |\angle ACD|$ (łuk $AD$).`],
      [2, 'Etap 2', T`Wniosek: trójkąty $ABP$ i $DCP$ są podobne (cecha kkk).`],
      [3, 'Komplet', T`Proporcja $\frac{|AP|}{|DP|} = \frac{|BP|}{|CP|}$ i teza.`]
    ],
    steps: [
      T`Kąty $BAP$ i $CDP$ są wpisane i oparte na łuku $BC$, więc są równe. Kąty $ABP$ i $DCP$ są oparte na łuku $AD$, więc też są równe.`,
      T`Trójkąty $ABP$ i $DCP$ są podobne (kkk).`,
      T`Z podobieństwa $\frac{|AP|}{|DP|} = \frac{|BP|}{|CP|}$, czyli $|AP| \cdot |PC| = |BP| \cdot |PD|$.`
    ],
    trap: 'W proporcji łącz boki leżące naprzeciw RÓWNYCH kątów – inaczej iloczyny nie wyjdą.',
    thesis: T`$|AP| \cdot |PC| = |BP| \cdot |PD|$`
  },
  {
    q: T`Trójkąt ostrokątny $ABC$ jest wpisany w okrąg o środku $O$. Wykaż, że $|\angle OAB| = 90^\circ - |\angle ACB|$.`,
    stages: [
      [1, 'Etap 1', T`Zastosowanie twierdzenia o kącie środkowym: $|\angle AOB| = 2|\angle ACB|$.`],
      [2, 'Etap 2', T`Zauważenie, że trójkąt $AOB$ jest równoramienny ($|OA| = |OB|$).`],
      [3, 'Komplet', T`Obliczenie $|\angle OAB| = \frac{180^\circ - 2|\angle ACB|}{2} = 90^\circ - |\angle ACB|$.`]
    ],
    steps: [
      T`Oznaczmy $|\angle ACB| = \gamma$. Kąt środkowy $AOB$ oparty na tym samym łuku: $|\angle AOB| = 2\gamma$ (trójkąt ostrokątny, więc $O$ leży wewnątrz).`,
      T`$|OA| = |OB|$, więc kąty przy podstawie trójkąta $AOB$ są równe.`,
      T`$|\angle OAB| = \frac{180^\circ - 2\gamma}{2} = 90^\circ - \gamma$.`
    ],
    trap: 'Uzasadnij równoramienność trójkąta $AOB$ – promienie tego samego okręgu.',
    thesis: T`$|\angle OAB| = 90^\circ - |\angle ACB|$`
  },
  {
    q: T`Prosta $k$ jest styczna do okręgu o środku $O$ w punkcie $A$, a $AB$ jest cięciwą. Punkt $C$ leży na okręgu po przeciwnej stronie cięciwy $AB$ niż ostry kąt $\varphi$ między styczną a cięciwą. Wykaż, że $\varphi = |\angle ACB|$.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że $OA \perp k$ i $|\angle AOB| = 2|\angle ACB|$.`],
      [2, 'Etap 2', T`Obliczenie $|\angle OAB| = 90^\circ - |\angle ACB|$ z trójkąta równoramiennego $AOB$.`],
      [3, 'Komplet', T`Wniosek: $\varphi = 90^\circ - |\angle OAB| = |\angle ACB|$.`]
    ],
    steps: [
      T`Promień $OA$ jest prostopadły do stycznej, więc $\varphi + |\angle OAB| = 90^\circ$.`,
      T`$|\angle AOB| = 2\gamma$, gdzie $\gamma = |\angle ACB|$, a trójkąt $AOB$ jest równoramienny: $|\angle OAB| = 90^\circ - \gamma$.`,
      T`$\varphi = 90^\circ - (90^\circ - \gamma) = \gamma$.`
    ],
    trap: 'Kluczowy fakt: styczna jest prostopadła do promienia w punkcie styczności.',
    thesis: T`$\varphi = |\angle ACB|$`
  },
  {
    q: T`Dwa okręgi przecinają się w punktach $A$ i $B$. Odcinki $AC$ i $AD$ są średnicami tych okręgów. Wykaż, że punkty $C$, $B$, $D$ leżą na jednej prostej.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że $|\angle ABC| = 90^\circ$ i $|\angle ABD| = 90^\circ$ (kąty wpisane oparte na średnicach).`],
      [2, 'Komplet', T`Wniosek: $|\angle CBD| = 180^\circ$, więc $C$, $B$, $D$ są współliniowe.`]
    ],
    steps: [
      T`Kąt $ABC$ jest wpisany w pierwszy okrąg i oparty na średnicy $AC$, więc ma $90^\circ$. Analogicznie $|\angle ABD| = 90^\circ$.`,
      T`$|\angle CBD| = |\angle CBA| + |\angle ABD| = 180^\circ$, czyli $C$, $B$, $D$ leżą na jednej prostej.`
    ],
    trap: 'Kąt półpełny ($180^\\circ$) to dokładnie warunek współliniowości – zapisz to wprost.',
    thesis: 'Punkty $C$, $B$, $D$ są współliniowe'
  },
  {
    q: T`Odcinek $AB$ jest średnicą okręgu o środku $O$, a $C$ jest punktem tego okręgu różnym od $A$ i $B$. Wykaż, że kąt $ACB$ jest prosty.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że trójkąty $AOC$ i $BOC$ są równoramienne ($|OA| = |OB| = |OC|$).`],
      [2, 'Komplet', T`Zapisanie sumy kątów trójkąta $ABC$: $2\alpha + 2\beta = 180^\circ$ i wniosek $|\angle ACB| = 90^\circ$.`]
    ],
    steps: [
      T`$|OA| = |OC| = |OB|$, więc $|\angle OAC| = |\angle OCA| = \alpha$ i $|\angle OBC| = |\angle OCB| = \beta$.`,
      T`W trójkącie $ABC$: $2\alpha + 2\beta = 180^\circ$, więc $|\angle ACB| = \alpha + \beta = 90^\circ$.`
    ],
    trap: 'Nie powołuj się na tezę („kąt oparty na średnicy jest prosty”) – masz ją udowodnić.',
    thesis: T`$|\angle ACB| = 90^\circ$`
  }
];

// ---------- 10.3 Podobieństwo i przystawanie ----------
const similarArea = (r) => {
  const p = r.int(1, 5);
  const q = r.intNot(1, 6, p);
  const P1 = r.int(2, 40) * p * p;
  const P2 = (P1 * q * q) / (p * p);
  need(Math.abs(P2 * 100 - Math.round(P2 * 100)) < 1e-9);
  return num({
    title: 'Pola trójkątów podobnych',
    q: T`Trójkąty $ABC$ i $A'B'C'$ są podobne, a stosunek długości ich odpowiednich boków jest równy $${p} : ${q}$. Pole trójkąta $ABC$ jest równe $${P1}$. Oblicz pole trójkąta $A'B'C'$. Wpisz liczbę.`,
    ans: P2,
    steps: [T`Skala podobieństwa $k = \frac{${q}}{${p}}$, a stosunek pól to $k^2 = ${fr(q * q, p * p)}$.`, T`$P' = ${P1} \cdot ${fr(q * q, p * p)} = ${P2}$.`],
    trap: 'Pola zmieniają się z KWADRATEM skali, a nie ze skalą.',
    tip: TIP_SIMILAR
  });
};

const altitudeMean = (r) => {
  const ad = r.int(1, 16);
  const db = r.int(1, 16);
  const h = Math.sqrt(ad * db);
  need(Number.isInteger(h) && ad !== db);
  return num({
    title: 'Wysokość w trójkącie prostokątnym',
    q: T`W trójkącie prostokątnym $ABC$ kąt $ACB$ jest prosty, a wysokość $CD$ dzieli przeciwprostokątną na odcinki $|AD| = ${ad}$ i $|DB| = ${db}$. Oblicz $|CD|$. Wpisz liczbę.`,
    ans: h,
    steps: [T`Trójkąty $ADC$ i $CDB$ są podobne (kkk), więc $\frac{|AD|}{|CD|} = \frac{|CD|}{|DB|}$.`, T`$|CD|^2 = ${ad} \cdot ${db} = ${ad * db}$, więc $|CD| = ${h}$.`],
    trap: 'Wysokość to średnia geometryczna odcinków przeciwprostokątnej – nie ich średnia arytmetyczna.',
    tip: TIP_SIMILAR
  });
};

const FEATURES = [
  {
    q: T`Trójkąty $ABC$ i $A'B'C'$ spełniają $|\angle A| = |\angle A'|$ i $|\angle B| = |\angle B'|$. Te trójkąty`,
    ok: 'są podobne na mocy cechy kąt–kąt–kąt',
    bad: ['są przystające na mocy cechy kąt–bok–kąt', 'są podobne na mocy cechy bok–kąt–bok', 'nie muszą być podobne'],
    steps: ['Dwie pary równych kątów wyznaczają trzecią parę (suma kątów $180^\\circ$).', 'To cecha kkk.'],
    trap: 'Równe kąty dają podobieństwo, ale nie przystawanie – nic nie wiemy o długościach.'
  },
  {
    q: 'Trójkąty o bokach $3$, $4$, $6$ oraz $6$, $8$, $12$',
    ok: 'są podobne na mocy cechy bok–bok–bok w skali $2$',
    bad: ['są przystające', 'nie są podobne', 'są podobne w skali $\\frac{1}{3}$'],
    steps: ['$\\frac{6}{3} = \\frac{8}{4} = \\frac{12}{6} = 2$.', 'Wszystkie stosunki odpowiednich boków są równe – cecha bbb.'],
    trap: 'Porównuj boki uporządkowane rosnąco: najkrótszy z najkrótszym itd.'
  },
  {
    q: T`Trójkąty $ABC$ i $A'B'C'$ spełniają $\frac{|AB|}{|A'B'|} = \frac{|AC|}{|A'C'|}$ i $|\angle BAC| = |\angle B'A'C'|$. Te trójkąty`,
    ok: 'są podobne na mocy cechy bok–kąt–bok',
    bad: ['są podobne na mocy cechy kąt–kąt–kąt', 'są przystające', 'nie muszą być podobne'],
    steps: ['Dwa boki proporcjonalne i równy kąt MIĘDZY nimi.', 'To cecha bkb.'],
    trap: 'W cesze bkb kąt musi leżeć między tymi dwoma bokami.'
  },
  {
    q: 'Trójkąty o bokach $4$, $6$, $8$ oraz $6$, $9$, $13$',
    ok: 'nie są podobne',
    bad: ['są podobne w skali $\\frac{3}{2}$', 'są przystające', 'są podobne na mocy cechy kąt–kąt–kąt'],
    steps: ['$\\frac{6}{4} = \\frac{9}{6} = \\frac{3}{2}$, ale $\\frac{13}{8} \\ne \\frac{3}{2}$.', 'Nie wszystkie stosunki są równe – trójkąty nie są podobne.'],
    trap: 'Sprawdź WSZYSTKIE trzy stosunki – dwa równe nie wystarczą.'
  }
];

const similarFacts = (r) => {
  const mk = () => {
    const a = r.int(2, 7);
    const b = r.int(a, 9);
    const c = r.int(b, a + b - 1);
    const k = r.pick([2, 3]);
    const honest = r.bool();
    const c2 = honest ? k * c : k * c + 1;
    return [T`Trójkąty o bokach $${a}$, $${b}$, $${c}$ oraz $${k * a}$, $${k * b}$, $${c2}$ są podobne.`, honest, honest ? T`Wszystkie stosunki są równe $${k}$.` : T`$\frac{${c2}}{${c}} \ne ${k}$.`];
  };
  return pf({ title: 'Cecha bok–bok–bok', s1: mk(), s2: mk(), trap: 'Wystarczy jeden różny stosunek, żeby trójkąty nie były podobne.', tip: TIP_SIMILAR });
};

const PROOFS_3 = [
  {
    q: T`Punkty $M$ i $N$ są środkami boków $AC$ i $BC$ trójkąta $ABC$. Wykaż, że $MN \parallel AB$ i $|MN| = \frac{1}{2}|AB|$.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że $\frac{|CM|}{|CA|} = \frac{|CN|}{|CB|} = \frac{1}{2}$ i kąt $C$ jest wspólny.`],
      [2, 'Etap 2', T`Wniosek: trójkąty $CMN$ i $CAB$ są podobne (bkb) w skali $\frac{1}{2}$, więc $|MN| = \frac{1}{2}|AB|$.`],
      [3, 'Komplet', T`Z podobieństwa $|\angle CMN| = |\angle CAB|$ – kąty odpowiadające są równe, więc $MN \parallel AB$.`]
    ],
    steps: [
      T`$|CM| = \frac{1}{2}|CA|$ i $|CN| = \frac{1}{2}|CB|$, a kąt $ACB$ jest wspólny.`,
      T`Trójkąty $CMN$ i $CAB$ są podobne (bkb) w skali $\frac{1}{2}$, więc $|MN| = \frac{1}{2}|AB|$.`,
      T`Odpowiadające kąty $CMN$ i $CAB$ są równe, więc proste $MN$ i $AB$ są równoległe.`
    ],
    trap: 'Teza ma DWIE części – równoległość i długość. Każdą trzeba uzasadnić.',
    thesis: T`$MN \parallel AB$ i $|MN| = \frac{1}{2}|AB|$`
  },
  {
    q: T`W trójkącie $ABC$: $|AC| = |BC|$, a $CD$ jest wysokością. Wykaż, że $CD$ jest dwusieczną kąta $ACB$.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że trójkąty $ADC$ i $BDC$ są prostokątne, mają wspólny bok $CD$ i równe przeciwprostokątne.`],
      [2, 'Komplet', T`Uzasadnienie przystawania (np. $|AD| = |BD|$ z Pitagorasa, cecha bbb) i wniosek $|\angle ACD| = |\angle BCD|$.`]
    ],
    steps: [
      T`$|AD|^2 = |AC|^2 - |CD|^2 = |BC|^2 - |CD|^2 = |BD|^2$, więc $|AD| = |BD|$.`,
      T`Trójkąty $ADC$ i $BDC$ są przystające (bbb), więc $|\angle ACD| = |\angle BCD|$.`
    ],
    trap: 'Wskaż cechę przystawania i trzy pary równych elementów.',
    thesis: 'Odcinek $CD$ jest dwusieczną kąta $ACB$'
  },
  {
    q: T`W trapezie $ABCD$ o podstawach $AB$ i $CD$ przekątne przecinają się w punkcie $S$. Wykaż, że $\frac{|AS|}{|SC|} = \frac{|AB|}{|CD|}$.`,
    stages: [
      [1, 'Etap 1', T`Uzasadnienie podobieństwa trójkątów $ABS$ i $CDS$: kąty wierzchołkowe przy $S$ i kąty naprzemianległe przy $AB \parallel CD$.`],
      [2, 'Komplet', 'Zapisanie proporcji odpowiednich boków i teza.']
    ],
    steps: [
      T`$|\angle ASB| = |\angle CSD|$ (wierzchołkowe), $|\angle SAB| = |\angle SCD|$ (naprzemianległe, $AB \parallel CD$).`,
      T`Trójkąty $ABS$ i $CDS$ są podobne (kkk), więc $\frac{|AS|}{|CS|} = \frac{|AB|}{|CD|}$.`
    ],
    trap: 'Naprzemianległość kątów wynika z równoległości podstaw – powołaj się na nią.',
    thesis: T`$\frac{|AS|}{|SC|} = \frac{|AB|}{|CD|}$`
  },
  {
    q: T`W trójkącie prostokątnym $ABC$ kąt $ACB$ jest prosty, a $CD$ jest wysokością. Wykaż, że $|CD|^2 = |AD| \cdot |DB|$.`,
    stages: [
      [1, 'Etap 1', T`Wykazanie równości kątów: $|\angle ACD| = |\angle CBD|$ (oba dopełniają kąt $A$ do $90^\circ$).`],
      [2, 'Etap 2', T`Wniosek: trójkąty $ADC$ i $CDB$ są podobne (kkk).`],
      [3, 'Komplet', T`Proporcja $\frac{|AD|}{|CD|} = \frac{|CD|}{|DB|}$ i teza.`]
    ],
    steps: [
      T`$|\angle ACD| = 90^\circ - |\angle A|$ i $|\angle CBD| = 90^\circ - |\angle A|$, więc są równe; oba trójkąty mają kąt prosty przy $D$.`,
      T`Trójkąty $ADC$ i $CDB$ są podobne (kkk).`,
      T`$\frac{|AD|}{|CD|} = \frac{|CD|}{|DB|}$, czyli $|CD|^2 = |AD| \cdot |DB|$.`
    ],
    trap: 'Ustal kolejność wierzchołków podobnych trójkątów zgodnie z równymi kątami – od tego zależy proporcja.',
    thesis: T`$|CD|^2 = |AD| \cdot |DB|$`
  },
  {
    q: T`Przekątne czworokąta $ABCD$ przecinają się w punkcie $O$, który jest środkiem każdej z nich. Wykaż, że $ABCD$ jest równoległobokiem.`,
    stages: [
      [1, 'Etap 1', T`Wykazanie przystawania trójkątów $AOB$ i $COD$ (bkb: $|OA| = |OC|$, $|OB| = |OD|$, kąty wierzchołkowe).`],
      [2, 'Etap 2', T`Wniosek $|\angle OAB| = |\angle OCD|$ – kąty naprzemianległe, więc $AB \parallel CD$.`],
      [3, 'Komplet', T`Analogicznie $AD \parallel BC$ i wniosek.`]
    ],
    steps: [
      T`$|OA| = |OC|$, $|OB| = |OD|$, $|\angle AOB| = |\angle COD|$ (wierzchołkowe) – trójkąty $AOB$ i $COD$ są przystające (bkb).`,
      T`Stąd $|\angle OAB| = |\angle OCD|$; to kąty naprzemianległe przy prostych $AB$ i $CD$, więc $AB \parallel CD$.`,
      T`Tak samo z trójkątów $AOD$ i $COB$: $AD \parallel BC$. Czworokąt ma dwie pary boków równoległych – jest równoległobokiem.`
    ],
    trap: 'Równoległobok wymaga DWÓCH par boków równoległych (albo jednej pary równoległych i równych).',
    thesis: 'Czworokąt $ABCD$ jest równoległobokiem'
  }
];

// ---------- 10.4 Pola i długości odcinków ----------
const ratioArea = (r) => {
  const p = r.int(1, 5);
  const q = r.intNot(1, 5, p);
  const P = r.int(2, 30) * (p + q);
  return num({
    title: 'Podział pola trójkąta',
    q: T`Punkt $D$ leży na boku $BC$ trójkąta $ABC$ i $|BD| : |DC| = ${p} : ${q}$. Pole trójkąta $ABC$ jest równe $${P}$. Oblicz pole trójkąta $ABD$. Wpisz liczbę.`,
    ans: (P * p) / (p + q),
    steps: [T`Trójkąty $ABD$ i $ADC$ mają wspólną wysokość z wierzchołka $A$, więc ich pola są w stosunku podstaw $${p} : ${q}$.`, T`$P_{ABD} = ${P} \cdot \frac{${p}}{${p + q}} = ${(P * p) / (p + q)}$.`],
    trap: T`Część pola to $\frac{${p}}{${p + q}}$, a nie $\frac{${p}}{${q}}$ – dzielisz przez sumę części.`,
    tip: TIP_AREA
  });
};

const diagonalsArea = (r) => {
  const d1 = r.int(3, 20);
  const d2 = r.int(3, 20);
  return num({
    title: 'Pole czworokąta o prostopadłych przekątnych',
    q: T`Przekątne czworokąta wypukłego są prostopadłe i mają długości $${d1}$ i $${d2}$. Oblicz pole tego czworokąta. Wpisz liczbę.`,
    ans: (d1 * d2) / 2,
    steps: [T`Przekątna $d_1$ dzieli czworokąt na dwa trójkąty o wspólnej podstawie $d_1$, a suma ich wysokości to $d_2$.`, T`$P = \frac{1}{2} \cdot ${d1} \cdot ${d2} = ${fr(d1 * d2, 2)}$.`],
    trap: 'Wzór $\\frac{1}{2}d_1d_2$ działa tylko przy PROSTOPADŁYCH przekątnych.',
    tip: TIP_AREA
  });
};

const heightTrig = (r) => {
  const b = r.int(2, 14);
  const alpha = r.pick([30, 45, 60, 120, 135, 150]);
  const h = sMul(surd(b), sinS(alpha));
  return mc({
    title: 'Wysokość z funkcji trygonometrycznej',
    q: T`W trójkącie $ABC$: $|AC| = ${b}$ i $|\angle BAC| = ${deg(alpha)}$. Odległość punktu $C$ od prostej $AB$ jest równa`,
    ok: m(sTex(h)),
    val: b * Math.sin(rad(alpha)),
    bad: [m(sTex(sMul(surd(b), surd(1, 2, alpha === 45 || alpha === 135 ? 3 : 2)))), m(sTex(surd(b, 2))), m(sTex(sMul(h, surd(2)))), m(`${b}`)],
    steps: [T`Spodek $D$ wysokości z $C$ leży na prostej $AB$, a w trójkącie prostokątnym $ADC$: $|CD| = |AC| \cdot \sin ${deg(alpha > 90 ? 180 - alpha : alpha)}$.`, T`$|CD| = ${b} \cdot ${sTex(sinS(alpha))} = ${sTex(h)}$.`],
    trap: 'Wysokość leży naprzeciw kąta $A$ w trójkącie prostokątnym $ADC$ – to sinus, nie cosinus.',
    tip: TIP_AREA
  });
};

const AREA_FACTS = [
  ['Środkowa dzieli trójkąt na dwa trójkąty o równych polach.', true, 'Oba trójkąty mają równe podstawy i wspólną wysokość.'],
  ['Trójkąty o wspólnej podstawie, których trzecie wierzchołki leżą na prostej równoległej do tej podstawy, mają równe pola.', true, 'Mają równe wysokości.'],
  ['Jeśli dwa trójkąty mają równe pola, to są przystające.', false, 'Np. trójkąty o podstawie 4 i wysokości 3 oraz o podstawie 6 i wysokości 2.'],
  ['Przekątna równoległoboku dzieli go na dwa trójkąty o równych polach.', true, 'Te trójkąty są przystające (bbb).'],
  [T`Pole czworokąta o prostopadłych przekątnych $d_1$ i $d_2$ jest równe $d_1 \cdot d_2$.`, false, T`Jest równe $\frac{1}{2}d_1d_2$.`]
];

const PROOFS_4 = [
  {
    q: T`Punkt $P$ leży wewnątrz trójkąta równobocznego $ABC$ o wysokości $h$. Wykaż, że suma odległości punktu $P$ od boków tego trójkąta jest równa $h$.`,
    stages: [
      [1, 'Etap 1', T`Podział trójkąta na trójkąty $ABP$, $BCP$, $CAP$ i zapisanie ich pól przez odległości $x, y, z$: $\frac{1}{2}ax + \frac{1}{2}ay + \frac{1}{2}az$.`],
      [2, 'Etap 2', T`Przyrównanie sumy pól do pola trójkąta $ABC$: $\frac{1}{2}a(x + y + z) = \frac{1}{2}ah$.`],
      [3, 'Komplet', T`Wniosek $x + y + z = h$.`]
    ],
    steps: [
      T`Niech $a$ – bok trójkąta, $x, y, z$ – odległości $P$ od boków $BC$, $CA$, $AB$. Trójkąty $BCP$, $CAP$, $ABP$ wypełniają trójkąt $ABC$.`,
      T`$P_{ABC} = \frac{1}{2}ax + \frac{1}{2}ay + \frac{1}{2}az = \frac{1}{2}a(x + y + z)$, a jednocześnie $P_{ABC} = \frac{1}{2}ah$.`,
      T`Stąd $x + y + z = h$.`
    ],
    trap: 'Odległość punktu od boku to wysokość małego trójkąta – zaznacz ją jako odcinek prostopadły.',
    thesis: T`$x + y + z = h$`
  },
  {
    q: T`Odcinek $AM$ jest środkową trójkąta $ABC$. Wykaż, że trójkąty $ABM$ i $AMC$ mają równe pola.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że $|BM| = |MC|$ i oba trójkąty mają wspólną wysokość z wierzchołka $A$.`],
      [2, 'Komplet', T`Zapisanie pól $\frac{1}{2}|BM| \cdot h = \frac{1}{2}|MC| \cdot h$ i wniosek.`]
    ],
    steps: [
      T`$M$ jest środkiem $BC$, więc $|BM| = |MC|$. Wysokość $h$ z wierzchołka $A$ na prostą $BC$ jest wspólna dla obu trójkątów.`,
      T`$P_{ABM} = \frac{1}{2}|BM|h = \frac{1}{2}|MC|h = P_{AMC}$.`
    ],
    trap: 'Wspólna wysokość istnieje, bo podstawy $BM$ i $MC$ leżą na jednej prostej.',
    thesis: T`$P_{ABM} = P_{AMC}$`
  },
  {
    q: T`Punkt $P$ leży na boku $CD$ równoległoboku $ABCD$. Wykaż, że pole trójkąta $ABP$ jest równe połowie pola równoległoboku.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że wysokość trójkąta $ABP$ opuszczona z $P$ jest równa wysokości równoległoboku (bo $CD \parallel AB$).`],
      [2, 'Komplet', T`Zapisanie $P_{ABP} = \frac{1}{2}|AB| \cdot h$ i porównanie z $P_{ABCD} = |AB| \cdot h$.`]
    ],
    steps: [
      T`$P$ leży na prostej $CD$ równoległej do $AB$, więc odległość $P$ od $AB$ to wysokość $h$ równoległoboku.`,
      T`$P_{ABP} = \frac{1}{2}|AB|h = \frac{1}{2}P_{ABCD}$.`
    ],
    trap: 'Pole nie zależy od położenia $P$ na $CD$ – dowód nie może korzystać z konkretnego miejsca.',
    thesis: T`$P_{ABP} = \frac{1}{2}P_{ABCD}$`
  },
  {
    q: T`Przekątne trapezu $ABCD$ o podstawach $AB$ i $CD$ przecinają się w punkcie $O$. Wykaż, że trójkąty $AOD$ i $BOC$ mają równe pola.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że $P_{ABD} = P_{ABC}$ (wspólna podstawa $AB$ i równe wysokości, bo $CD \parallel AB$).`],
      [2, 'Etap 2', T`Zapisanie $P_{AOD} = P_{ABD} - P_{ABO}$ i $P_{BOC} = P_{ABC} - P_{ABO}$.`],
      [3, 'Komplet', 'Wniosek o równości pól.']
    ],
    steps: [
      T`Trójkąty $ABD$ i $ABC$ mają wspólną podstawę $AB$, a wierzchołki $D$ i $C$ leżą na prostej równoległej do $AB$ – ich pola są równe.`,
      T`Oba zawierają trójkąt $ABO$: $P_{AOD} = P_{ABD} - P_{ABO}$, $P_{BOC} = P_{ABC} - P_{ABO}$.`,
      T`Stąd $P_{AOD} = P_{BOC}$.`
    ],
    trap: 'Nie zakładaj, że trapez jest równoramienny – teza zachodzi dla każdego trapezu.',
    thesis: T`$P_{AOD} = P_{BOC}$`
  },
  {
    q: T`Wykaż, że pole trójkąta o bokach $a$, $b$, $c$ wpisanego w okrąg o promieniu $R$ jest równe $\frac{abc}{4R}$.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie pola $P = \frac{1}{2}ab\sin\gamma$, gdzie $\gamma$ – kąt naprzeciw boku $c$.`],
      [2, 'Etap 2', T`Zastosowanie twierdzenia sinusów: $\sin\gamma = \frac{c}{2R}$.`],
      [3, 'Komplet', T`Podstawienie: $P = \frac{1}{2}ab \cdot \frac{c}{2R} = \frac{abc}{4R}$.`]
    ],
    steps: [
      T`Kąt $\gamma$ leży między bokami $a$ i $b$: $P = \frac{1}{2}ab\sin\gamma$.`,
      T`Z twierdzenia sinusów $\frac{c}{\sin\gamma} = 2R$, więc $\sin\gamma = \frac{c}{2R}$.`,
      T`$P = \frac{1}{2}ab \cdot \frac{c}{2R} = \frac{abc}{4R}$.`
    ],
    trap: 'Kąt we wzorze na pole musi leżeć MIĘDZY bokami $a$ i $b$, czyli naprzeciw boku $c$.',
    thesis: T`$P = \frac{abc}{4R}$`
  }
];

// ---------- 10.5 Czworokąty i okręgi w dowodach ----------
const cyclicTrapezoid = (r) => {
  const a = r.int(40, 85);
  const askC = r.bool();
  return num({
    title: 'Trapez wpisany w okrąg',
    q: T`Trapez $ABCD$ o podstawach $AB$ i $CD$ jest wpisany w okrąg, a $|\angle DAB| = ${deg(a)}$. Oblicz miarę kąta ${askC ? 'BCD' : 'ABC'} (w stopniach). Wpisz liczbę.`,
    ans: askC ? 180 - a : a,
    steps: askC
      ? [T`Kąty $DAB$ i $BCD$ są przeciwległe w czworokącie wpisanym w okrąg.`, T`$|\angle BCD| = 180^\circ - ${deg(a)} = ${deg(180 - a)}$.`]
      : [T`Trapez wpisany w okrąg jest równoramienny, więc kąty przy podstawie $AB$ są równe.`, T`$|\angle ABC| = ${deg(a)}$.`],
    trap: 'Trapez wpisany w okrąg jest równoramienny – kąty przy tej samej podstawie są równe.',
    tip: TIP_CYCLIC
  });
};

const equalChords = (r) => {
  const x = 2 * r.int(25, 75);
  return num({
    title: 'Równe cięciwy i kąty wpisane',
    q: T`Czworokąt $ABCD$ jest wpisany w okrąg, $|AB| = |BC|$ i $|\angle ADC| = ${deg(x)}$. Oblicz miarę kąta $ADB$ (w stopniach). Wpisz liczbę.`,
    ans: x / 2,
    steps: [T`Równe cięciwy $AB$ i $BC$ wyznaczają równe łuki, więc kąty wpisane $ADB$ i $BDC$ są równe.`, T`$|\angle ADB| = \frac{${x}^\circ}{2} = ${deg(x / 2)}$.`],
    trap: 'Równe cięciwy dają równe kąty wpisane oparte na nich – stąd $DB$ jest dwusieczną.',
    tip: TIP_INSCRIBED
  });
};

const QUAD_CHOICE = [
  {
    q: T`W trójkącie ostrokątnym $ABC$ odcinki $AD$ i $BE$ są wysokościami. Punkty $A$, $B$, $D$, $E$ leżą na okręgu o średnicy`,
    ok: '$AB$',
    bad: ['$DE$', '$AC$', '$BC$'],
    steps: [T`$|\angle ADB| = |\angle AEB| = 90^\circ$.`, T`Punkty $D$ i $E$ widzą odcinek $AB$ pod kątem prostym, więc leżą na okręgu o średnicy $AB$.`],
    trap: 'Kąt prosty „patrzący” na odcinek oznacza, że ten odcinek jest średnicą.'
  },
  {
    q: 'Romb, w który można wpisać okrąg i na którym można opisać okrąg, jest',
    ok: 'kwadratem',
    bad: ['dowolnym rombem', 'prostokątem niebędącym kwadratem', 'trapezem niebędącym równoległobokiem'],
    steps: ['W romb zawsze da się wpisać okrąg; okrąg opisany wymaga sumy przeciwległych kątów $180^\\circ$.', 'Przeciwległe kąty rombu są równe, więc każdy ma $90^\\circ$ – to kwadrat.'],
    trap: 'Połącz oba warunki: równe boki (romb) i kąty proste (okrąg opisany).'
  },
  {
    q: 'Trapez wpisany w okrąg jest zawsze',
    ok: 'równoramienny',
    bad: ['prostokątny', 'opisany na okręgu', 'równoległobokiem'],
    steps: ['Kąty przy podstawie trapezu wpisanego są równe (każdy dopełnia ten sam kąt do $180^\\circ$).', 'Trapez z równymi kątami przy podstawie jest równoramienny.'],
    trap: 'Nie myl okręgu opisanego (kąty) z wpisanym (boki).'
  },
  {
    q: 'Równoległobok, na którym można opisać okrąg, jest',
    ok: 'prostokątem',
    bad: ['rombem', 'deltoidem', 'trapezem równoramiennym niebędącym równoległobokiem'],
    steps: ['Przeciwległe kąty równoległoboku są równe, a w czworokącie wpisanym sumują się do $180^\\circ$.', 'Każdy kąt ma $90^\\circ$ – to prostokąt.'],
    trap: 'Romb ma okrąg WPISANY, prostokąt – OPISANY.'
  }
];

const QUAD_FACTS = [
  ['Każdy trapez wpisany w okrąg jest równoramienny.', true, 'Kąty przy podstawie są równe.'],
  ['Równoległobok wpisany w okrąg jest prostokątem.', true, T`Równe przeciwległe kąty sumujące się do $180^\circ$ mają po $90^\circ$.`],
  ['Na każdym deltoidzie można opisać okrąg.', false, T`Tylko wtedy, gdy jego dwa równe kąty są proste.`],
  ['Jeśli w czworokąt można wpisać okrąg i można na nim opisać okrąg, to jest on kwadratem.', false, T`Np. deltoid z dwoma kątami prostymi, który nie jest kwadratem.`],
  ['W każdy romb można wpisać okrąg.', true, 'Sumy przeciwległych boków rombu są równe.']
];

const PROOFS_5 = [
  {
    q: T`Trapez $ABCD$ o podstawach $AB$ i $CD$ jest wpisany w okrąg. Wykaż, że ten trapez jest równoramienny.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie $|\angle DAB| + |\angle BCD| = 180^\circ$ (okrąg opisany) i $|\angle ABC| + |\angle BCD| = 180^\circ$ (kąty przy ramieniu, $AB \parallel CD$).`],
      [2, 'Komplet', T`Wniosek $|\angle DAB| = |\angle ABC|$ i stąd równoramienność (np. przez przystawanie trójkątów $ABD$ i $BAC$).`]
    ],
    steps: [
      T`Czworokąt jest wpisany w okrąg: $|\angle DAB| + |\angle BCD| = 180^\circ$. Przy ramieniu $BC$: $|\angle ABC| + |\angle BCD| = 180^\circ$.`,
      T`Stąd $|\angle DAB| = |\angle ABC|$ – kąty przy podstawie są równe, więc trapez jest równoramienny: $|AD| = |BC|$.`
    ],
    trap: 'Potrzebne są oba fakty: okrąg opisany ORAZ równoległość podstaw.',
    thesis: T`$|AD| = |BC|$`
  },
  {
    q: T`W równoległobok $ABCD$ można wpisać okrąg. Wykaż, że $ABCD$ jest rombem.`,
    stages: [
      [1, 'Etap 1', T`Zapisanie warunku $|AB| + |CD| = |BC| + |DA|$ i równości $|AB| = |CD|$, $|BC| = |DA|$.`],
      [2, 'Komplet', T`Wniosek $2|AB| = 2|BC|$, czyli wszystkie boki równe.`]
    ],
    steps: [
      T`W czworokąt można wpisać okrąg, więc $|AB| + |CD| = |BC| + |DA|$.`,
      T`W równoległoboku $|AB| = |CD|$ i $|BC| = |DA|$, więc $2|AB| = 2|BC|$. Wszystkie boki są równe – to romb.`
    ],
    trap: 'Uzasadnij oba fakty: warunek okręgu wpisanego i równość przeciwległych boków równoległoboku.',
    thesis: 'Czworokąt $ABCD$ jest rombem'
  },
  {
    q: T`Odcinki $AD$ i $BE$ są wysokościami trójkąta ostrokątnego $ABC$. Wykaż, że punkty $A$, $B$, $D$, $E$ leżą na jednym okręgu.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że $|\angle ADB| = |\angle AEB| = 90^\circ$.`],
      [2, 'Komplet', T`Wniosek: $D$ i $E$ leżą na okręgu o średnicy $AB$ (kąt wpisany oparty na średnicy jest prosty – twierdzenie odwrotne).`]
    ],
    steps: [
      T`$AD \perp BC$ i $BE \perp AC$, więc $|\angle ADB| = 90^\circ$ i $|\angle AEB| = 90^\circ$.`,
      T`Każdy punkt, z którego odcinek $AB$ widać pod kątem prostym, leży na okręgu o średnicy $AB$. Zatem $A$, $B$, $D$, $E$ leżą na tym okręgu.`
    ],
    trap: 'Wskaż konkretny okrąg – o średnicy $AB$ – a nie tylko „jakiś okrąg”.',
    thesis: 'Punkty $A$, $B$, $D$, $E$ leżą na okręgu o średnicy $AB$'
  },
  {
    q: T`Czworokąt $ABCD$ jest wpisany w okrąg i $|AB| = |BC|$. Wykaż, że przekątna $DB$ jest dwusieczną kąta $ADC$.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że równe cięciwy $AB$ i $BC$ wyznaczają równe łuki $AB$ i $BC$.`],
      [2, 'Komplet', T`Kąty wpisane $ADB$ i $BDC$ oparte na tych łukach są równe – wniosek.`]
    ],
    steps: [
      T`Równe cięciwy okręgu wyznaczają równe łuki (oraz równe kąty środkowe $AOB$ i $BOC$).`,
      T`Kąty wpisane $ADB$ i $BDC$ są połowami tych kątów środkowych, więc $|\angle ADB| = |\angle BDC|$ – $DB$ jest dwusieczną kąta $ADC$.`
    ],
    trap: 'Przejście od równych cięciw do równych kątów wpisanych uzasadnij kątami środkowymi.',
    thesis: T`$|\angle ADB| = |\angle BDC|$`
  },
  {
    q: T`Czworokąt $ABCD$ jest wpisany w okrąg, a proste $AB$ i $DC$ przecinają się w punkcie $P$ (punkt $B$ leży między $A$ i $P$, a $C$ między $D$ i $P$). Wykaż, że $|PB| \cdot |PA| = |PC| \cdot |PD|$.`,
    stages: [
      [1, 'Etap 1', T`Zauważenie, że $|\angle PBC| = 180^\circ - |\angle ABC| = |\angle ADC|$ (czworokąt wpisany).`],
      [2, 'Etap 2', T`Wniosek: trójkąty $PBC$ i $PDA$ są podobne (wspólny kąt $P$ i równe kąty $PBC$, $PDA$).`],
      [3, 'Komplet', T`Proporcja $\frac{|PB|}{|PD|} = \frac{|PC|}{|PA|}$ i teza.`]
    ],
    steps: [
      T`Kąt $PBC$ jest przyległy do $ABC$, a w czworokącie wpisanym $|\angle ABC| + |\angle ADC| = 180^\circ$, więc $|\angle PBC| = |\angle ADC| = |\angle PDA|$.`,
      T`Trójkąty $PBC$ i $PDA$ mają wspólny kąt przy $P$, więc są podobne (kkk).`,
      T`$\frac{|PB|}{|PD|} = \frac{|PC|}{|PA|}$, czyli $|PB| \cdot |PA| = |PC| \cdot |PD|$.`
    ],
    trap: 'Uważaj na kolejność wierzchołków: kątowi $B$ w trójkącie $PBC$ odpowiada kąt $D$ w trójkącie $PDA$.',
    thesis: T`$|PB| \cdot |PA| = |PC| \cdot |PD|$`
  }
];

export default {
  numericId: 10,
  title: 'Dowody geometryczne',
  short_title: 'Dowody geometryczne',
  description: 'Struktura dowodu, kąty wpisane i środkowe, podobieństwo i przystawanie, pola oraz czworokąty z okręgami.',
  icon: 'PenTool',
  color: '#FFB800',
  matura_points_range: '2–3 pkt',
  importance: 'HIGH',
  cke_formula_page: 'str. 17–20',
  cke_stats: 'W 9 z 11 arkuszy CKE 2022–2026, średnio 2,5 pkt na arkusz (VIII.11 – dowody geometryczne, 21 pkt łącznie).',
  lessons: [
    {
      title: 'Założenie, teza, uzasadnienie',
      short_title: 'Struktura dowodu',
      requirements: ['VIII.11'],
      prereq: ['math-lesson-9-1'],
      pill: pill({
        essence: T`Dowód geometryczny zaczyna się od założeń (co wiemy o figurze), kończy tezą (co mamy wykazać), a każdy krok między nimi jest uzasadniony twierdzeniem lub własnością. Oznacz kąty i odcinki literami – dowód ma działać dla KAŻDEJ figury spełniającej założenia, nie dla jednego przykładu.`,
        context: 'Dowody geometryczne (VIII.11) są na maturze PR prawie co roku, za 2–3 pkt. Klucz CKE punktuje kompletność rozumowania, nie samą tezę.',
        pl: T`Dowód to łańcuch: „wiem, że… (założenie), więc… (bo twierdzenie X), więc… (bo Y), czyli teza”. Każde ogniwo musi mieć swoje „bo”.`,
        steps: [
          ['Założenia', 'Zapisz, co jest dane, i oznacz rysunek.', 'Kąty literami α, β.'],
          ['Łańcuch', 'Każdy krok z uzasadnieniem.', 'Suma kątów, równoramienność, równoległość.'],
          ['Teza', 'Zakończ zdaniem będącym tezą.', '„co należało wykazać”.']
        ],
        formulas: [
          ['Suma kątów', T`\alpha + \beta + \gamma = 180^\circ`],
          ['Kąt zewnętrzny', T`\delta = \alpha + \beta`],
          ['Kąty przy ramieniu trapezu', T`\alpha + \delta = 180^\circ`]
        ],
        examples: [
          ['Kąt zewnętrzny', '2 pkt', T`Wykaż, że kąt zewnętrzny trójkąta jest równy sumie dwóch kątów nieprzyległych.`, T`1. $\delta = 180^\circ - \gamma$.` + '\n' + T`2. $\gamma = 180^\circ - \alpha - \beta$, więc $\delta = \alpha + \beta$.`, 'Oznaczenia literami.'],
          ['Środkowa', '3 pkt', T`$|CD| = \frac{1}{2}|AB|$, $D$ – środek $AB$. Wykaż, że $\angle C = 90^\circ$.`, T`1. Trójkąty $ADC$, $BDC$ równoramienne.` + '\n' + T`2. $2\alpha + 2\beta = 180^\circ$, więc $\alpha + \beta = 90^\circ$.`, 'Równoramienne trójkąty dają równe kąty.']
        ],
        trap: 'Sprawdzenie na przykładzie (np. trójkąt 3, 4, 5) NIE jest dowodem. W kluczu CKE daje 0 pkt.',
        fail: '„Dla trójkąta o kątach 50°, 60°, 70° kąt zewnętrzny ma 110° = 50° + 60°, więc teza jest prawdziwa.”',
        win: T`„Niech kąty mają miary $\alpha, \beta, \gamma$. Wtedy $\delta = 180^\circ - \gamma = \alpha + \beta$.”`,
        why: 'Dowód musi obejmować każdy trójkąt, a nie jeden wybrany.',
        ckeTip: 'Za brak uzasadnienia jednego kroku tracisz zwykle punkt – dopisz „bo…” przy każdym przejściu.',
        points: ['Założenie → kroki z uzasadnieniem → teza.', 'Oznaczenia literami, bez konkretnych liczb.', 'Przykład to nie dowód.']
      }),
      gens: [exteriorAngle, altitudeAngle, choiceFrom(STRUCTURE, 'Budowa rozumowania', TIP_PROOF), factsFrom(STRUCTURE_FACTS, 'Fakty w dowodach', 'Zdanie „ogólne” jest prawdziwe tylko wtedy, gdy działa dla każdej figury.', TIP_PROOF), proofFrom(PROOFS_1, 'Dowód: kąty w trójkątach i czworokątach', TIP_PROOF)]
    },
    {
      title: 'Kąty wpisane i środkowe w dowodach',
      short_title: 'Kąty wpisane',
      requirements: ['VIII.5', 'VIII.11'],
      prereq: ['math-lesson-9-4'],
      pill: pill({
        essence: T`Kąt środkowy jest dwa razy większy od kąta wpisanego opartego na tym samym łuku, a kąty wpisane oparte na tym samym łuku są równe. W dowodach z okręgiem prawie zawsze pojawia się trójkąt równoramienny z dwoma promieniami i kąt prosty między promieniem a styczną.`,
        context: 'Kąty w okręgu (VIII.5) to najczęstsze narzędzie w dowodach PR: dają równe kąty, a z nich podobieństwo trójkątów.',
        pl: T`Kąt wpisany „patrzy” na łuk z brzegu okręgu, a środkowy – ze środka. Ze środka łuk wygląda dwa razy „szerzej”. Wszystkie punkty brzegu po tej samej stronie widzą łuk pod tym samym kątem.`,
        steps: [
          ['Łuk', 'Ustal, na jakim łuku opiera się kąt.', 'Ta sama strona cięciwy = ten sam łuk.'],
          ['Relacja', T`Środkowy $= 2 \cdot$ wpisany; wpisane na tym samym łuku równe.`, 'Po przeciwnych stronach: suma 180°.'],
          ['Promienie', 'Trójkąt z dwoma promieniami jest równoramienny.', 'Styczna ⟂ promień.']
        ],
        formulas: [
          ['Kąt środkowy', T`|\angle AOB| = 2|\angle ACB|`, 18],
          ['Półokrąg', T`AB \ \text{– średnica} \ \text{więc} \ |\angle ACB| = 90^\circ`, 18],
          ['Styczna', T`OA \perp k`]
        ],
        examples: [
          ['Kąt przy podstawie', '1 pkt', T`$|\angle AOB| = 100^\circ$. Oblicz $|\angle OAB|$.`, T`1. $|OA| = |OB|$.` + '\n' + T`2. $|\angle OAB| = \frac{180^\circ - 100^\circ}{2} = 40^\circ$.`, 'Dwa promienie – trójkąt równoramienny.'],
          ['Cięciwy', '3 pkt', T`Cięciwy $AC$ i $BD$ przecinają się w $P$. Wykaż, że $|AP||PC| = |BP||PD|$.`, T`1. Kąty wpisane na łukach $BC$ i $AD$ są równe.` + '\n' + T`2. Trójkąty $ABP$ i $DCP$ podobne – proporcja.`, 'Równe kąty → podobieństwo.']
        ],
        trap: T`Kąty wpisane po PRZECIWNYCH stronach cięciwy nie są równe – sumują się do $180^\circ$.`,
        fail: T`„$C$ i $D$ leżą na okręgu, więc $|\angle ACB| = |\angle ADB|$.”`,
        win: 'Najpierw sprawdzasz, czy $C$ i $D$ są po tej samej stronie cięciwy $AB$.',
        why: 'Po przeciwnych stronach kąty opierają się na różnych łukach.',
        ckeTip: 'Pisz pełne uzasadnienie: „kąty wpisane oparte na tym samym łuku $BC$”. Sama równość bez łuku bywa uznana za niepełną.',
        points: ['Środkowy = 2 × wpisany.', 'Ten sam łuk – równe kąty wpisane.', 'Dwa promienie – trójkąt równoramienny.']
      }),
      gens: [inscribedCentral, tangentChord, factsFrom(INSCRIBED_FACTS, 'Kąty w okręgu', 'Ustal, czy kąty opierają się na tym samym łuku.', TIP_INSCRIBED), inscribedCentral, proofFrom(PROOFS_2, 'Dowód z kątami w okręgu', TIP_INSCRIBED)]
    },
    {
      title: 'Podobieństwo i przystawanie w dowodach',
      short_title: 'Podobieństwo',
      requirements: ['VIII.8', 'VIII.11'],
      prereq: ['math-lesson-9-2'],
      pill: pill({
        essence: T`Trójkąty są podobne, gdy mają równe kąty (kkk), proporcjonalne wszystkie boki (bbb) albo dwa boki proporcjonalne i równy kąt między nimi (bkb). Z podobieństwa dostajesz proporcje boków, a z przystawania – równości. To główny sposób dowodzenia równości odcinków, kątów i iloczynów.`,
        context: 'Cechy podobieństwa (VIII.8) to drugie co do częstości wymaganie PP na arkuszu PR – w dowodach i w zadaniach optymalizacyjnych.',
        pl: T`Podobne trójkąty to te same „kształty” w różnej skali – jak zdjęcie i jego powiększenie. Wystarczą dwa równe kąty, bo trzeci i tak wynika z sumy $180^\circ$.`,
        steps: [
          ['Wskaż trójkąty', 'Te, w których leżą odcinki z tezy.', 'Np. z iloczynu |AP|·|PC|.'],
          ['Cecha', 'kkk, bbb lub bkb – z uzasadnieniem.', 'Kąty: wierzchołkowe, naprzemianległe, wpisane.'],
          ['Proporcja', 'Boki naprzeciw równych kątów.', 'Na krzyż – teza.']
        ],
        formulas: [
          ['Skala', T`\frac{a'}{a} = \frac{b'}{b} = \frac{c'}{c} = k`, 17],
          ['Pola', T`\frac{P'}{P} = k^2`, 17],
          ['Wysokość', T`|CD|^2 = |AD| \cdot |DB|`]
        ],
        examples: [
          ['Pola', '1 pkt', T`Skala $2 : 3$, $P = 20$. Oblicz $P'$.`, T`1. $k^2 = \frac{9}{4}$.` + '\n' + T`2. $P' = 45$.`, 'Pola – kwadrat skali.'],
          ['Odcinek środkowy', '3 pkt', T`$M$, $N$ – środki $AC$, $BC$. Wykaż $MN \parallel AB$.`, T`1. $\triangle CMN \sim \triangle CAB$ (bkb, skala $\frac{1}{2}$).` + '\n' + T`2. Równe kąty odpowiadające – równoległość.`, 'Wspólny kąt C.']
        ],
        trap: 'Kolejność wierzchołków w zapisie podobieństwa ma znaczenie – odpowiadające wierzchołki mają równe kąty.',
        fail: T`„$\triangle ABP \sim \triangle CDP$, więc $\frac{|AP|}{|CP|} = \frac{|BP|}{|DP|}$.” (przy złym dopasowaniu kątów)`,
        win: 'Najpierw wypisujesz pary równych kątów, potem boki naprzeciw nich.',
        why: 'Proporcja łączy boki leżące naprzeciw równych kątów.',
        ckeTip: 'Zapisz cechę podobieństwa i pary równych kątów – sama deklaracja „trójkąty są podobne” to za mało.',
        points: ['kkk, bbb, bkb.', 'Pola w stosunku k².', 'Boki naprzeciw równych kątów.']
      }),
      gens: [similarArea, altitudeMean, choiceFrom(FEATURES, 'Cechy podobieństwa', TIP_SIMILAR), similarFacts, proofFrom(PROOFS_3, 'Dowód z podobieństwem lub przystawaniem', TIP_SIMILAR)]
    },
    {
      title: 'Pola i długości odcinków w dowodach',
      short_title: 'Pola w dowodach',
      requirements: ['VIII.11', 'VIII.12'],
      prereq: ['math-lesson-8-5'],
      pill: pill({
        essence: T`Pole trójkąta to połowa iloczynu podstawy i wysokości albo $\frac{1}{2}ab\sin\gamma$. Trójkąty o wspólnej wysokości mają pola w stosunku podstaw, a o wspólnej podstawie i równych wysokościach – równe pola. Ta „metoda pól” daje krótkie dowody równości odcinków i odległości.`,
        context: 'Metoda pól i funkcje trygonometryczne w figurach płaskich (VIII.12) pojawiają się zarówno w dowodach, jak i w zadaniach obliczeniowych za 3–4 pkt.',
        pl: T`Jeśli dwa trójkąty mają tę samą wysokość, to ich pola porównujesz jak długości podstaw – dwa razy dłuższa podstawa, dwa razy większe pole.`,
        steps: [
          ['Wspólny element', 'Podstawa albo wysokość.', 'Równoległe proste = równe wysokości.'],
          ['Pola', T`$P = \frac{1}{2}ah$ lub $\frac{1}{2}ab\sin\gamma$.`, 'Zapisz oba sposoby.'],
          ['Porównaj', 'Przyrównaj albo odejmij wspólną część.', 'Teza.']
        ],
        formulas: [
          ['Pole trójkąta', T`P = \frac{1}{2}ah = \frac{1}{2}ab\sin\gamma`, 15],
          ['Przekątne prostopadłe', T`P = \frac{1}{2}d_1d_2`],
          ['Pole a promień', T`P = \frac{abc}{4R}`]
        ],
        examples: [
          ['Podział boku', '1 pkt', T`$|BD| : |DC| = 1 : 3$, $P_{ABC} = 24$. Oblicz $P_{ABD}$.`, T`1. Wspólna wysokość z $A$.` + '\n' + T`2. $P_{ABD} = 24 \cdot \frac{1}{4} = 6$.`, 'Dzielisz przez sumę części.'],
          ['Trójkąt równoboczny', '3 pkt', 'Wykaż, że suma odległości punktu wewnętrznego od boków to $h$.', T`1. $\frac{1}{2}a(x + y + z) = \frac{1}{2}ah$.` + '\n' + T`2. $x + y + z = h$.`, 'Trzy małe trójkąty wypełniają duży.']
        ],
        trap: 'Wspólna wysokość istnieje tylko wtedy, gdy podstawy leżą na jednej prostej (albo na prostych równoległych).',
        fail: '„Trójkąty mają wspólny wierzchołek, więc mają tę samą wysokość.”',
        win: 'Wysokości są równe, bo podstawy leżą na jednej prostej, a wierzchołek jest wspólny.',
        why: 'Wysokość to odległość wierzchołka od PROSTEJ zawierającej podstawę.',
        ckeTip: 'W dowodzie metodą pól zapisz pole tej samej figury na dwa sposoby i przyrównaj – to jeden pełny etap.',
        points: ['Wspólna wysokość – pola jak podstawy.', 'Równoległe proste – równe wysokości.', 'P = ½ab sin γ.']
      }),
      gens: [ratioArea, diagonalsArea, heightTrig, factsFrom(AREA_FACTS, 'Pola figur', 'Równe pola nie oznaczają przystawania.', TIP_AREA), proofFrom(PROOFS_4, 'Dowód metodą pól', TIP_AREA)]
    },
    {
      title: 'Czworokąty i okręgi w dowodach',
      short_title: 'Czworokąty i okręgi',
      requirements: ['VIII.R1', 'VIII.11'],
      prereq: ['math-lesson-9-5'],
      pill: pill({
        essence: T`Warunki okręgu opisanego ($\alpha + \gamma = 180^\circ$) i wpisanego ($a + c = b + d$) działają w obie strony: z nich wynikają własności czworokąta, a z własności – istnienie okręgu. Punkty, z których odcinek widać pod kątem prostym, leżą na okręgu o średnicy tym odcinku.`,
        context: 'Dowody z czworokątami wpisanymi i opisanymi (VIII.R1) łączą planimetrię PR z kątami w okręgu. Typowo 2–3 pkt.',
        pl: T`Trapez wpisany w okrąg „musi” być symetryczny: kąty przy podstawie dopełniają ten sam kąt do $180^\circ$, więc są równe – a to oznacza równe ramiona.`,
        steps: [
          ['Który okrąg', 'Opisany – kąty; wpisany – boki.', 'Nie myl warunków.'],
          ['Połącz z figurą', 'Równoległość, równe boki, kąty proste.', 'Własności z założenia.'],
          ['Wniosek', 'Nazwij figurę albo okrąg.', 'Np. „okrąg o średnicy AB”.']
        ],
        formulas: [
          ['Okrąg opisany', T`\alpha + \gamma = \beta + \delta = 180^\circ`, 20],
          ['Okrąg wpisany', T`a + c = b + d`, 20],
          ['Kąt prosty', T`|\angle ADB| = 90^\circ \ \text{więc} \ D \ \text{na okręgu o średnicy} \ AB`]
        ],
        examples: [
          ['Trapez', '2 pkt', 'Wykaż, że trapez wpisany w okrąg jest równoramienny.', T`1. $\alpha + \gamma = 180^\circ$ i $\beta + \gamma = 180^\circ$.` + '\n' + T`2. $\alpha = \beta$ – trapez równoramienny.`, 'Okrąg + równoległość.'],
          ['Romb', '2 pkt', 'Równoległobok z okręgiem wpisanym jest rombem.', T`1. $a + c = b + d$, $a = c$, $b = d$.` + '\n' + T`2. $2a = 2b$.`, 'Warunek boków.']
        ],
        trap: 'Okrąg OPISANY to warunek na kąty, WPISANY – na boki. Zamiana warunków to błąd merytoryczny (0 pkt).',
        fail: '„W równoległobok można wpisać okrąg, więc jego kąty przeciwległe sumują się do 180°.”',
        win: T`„Można wpisać okrąg, więc $|AB| + |CD| = |BC| + |DA|$.”`,
        why: 'Okrąg wpisany dotyka boków – warunek dotyczy długości boków.',
        ckeTip: 'Nazwij twierdzenie, z którego korzystasz („czworokąt wpisany w okrąg, więc…”) – egzaminator sprawdza, czy to właściwy warunek.',
        points: ['Opisany – kąty, wpisany – boki.', 'Kąt prosty na odcinek – okrąg o średnicy.', 'Trapez wpisany jest równoramienny.']
      }),
      gens: [cyclicTrapezoid, equalChords, choiceFrom(QUAD_CHOICE, 'Czworokąty a okręgi', TIP_CYCLIC), factsFrom(QUAD_FACTS, 'Czworokąty wpisane i opisane', 'Opisany – warunek na kąty, wpisany – na boki.', TIP_CYCLIC), proofFrom(PROOFS_5, 'Dowód z czworokątem i okręgiem', TIP_CYCLIC)]
    }
  ]
};
