import type { MathDiagramData } from '../components/MathDiagram';
import type { PlotData } from '../components/MathPlot';
import type { NumberLineData } from '../components/NumberLineDiagram';

export interface CkeFormulaSubItem {
  label: string;
  formula: string;
}

export interface CkeFormulaItem {
  id: string;
  topicId: string;
  topicName: string;
  title: string;
  formula: string;
  subFormulas?: CkeFormulaSubItem[];
  explanation?: string;
  goldenRule?: string;
  ckeTrap?: string;
  keywords: string[];
  cke_page?: string;
  pageNumber?: number | string;
  diagram?: MathDiagramData | PlotData | NumberLineData;
}

export const CKE_FORMULA_TOPICS = [
  { id: 'all', name: 'Wszystkie działy' },
  { id: 'potegi-pierwiastki', name: 'Potęgi i Pierwiastki' },
  { id: 'logarytmy-procenty', name: 'Logarytmy i Procenty' },
  { id: 'funkcje-rownania', name: 'Funkcje i Równania' },
  { id: 'ciagi', name: 'Ciągi Liczbowe' },
  { id: 'trygonometria', name: 'Trygonometria' },
  { id: 'planimetria', name: 'Planimetria' },
  { id: 'geometria', name: 'Geometria Analityczna' },
  { id: 'stereometria', name: 'Stereometria' },
  { id: 'prawdopodobienstwo', name: 'Kombinatoryka i Statystyka' }
];

export const CKE_FORMULAS_DATA: CkeFormulaItem[] = [
  // 1. Potęgi i Pierwiastki
  {
    id: 'f-potegi-1',
    topicId: 'potegi-pierwiastki',
    topicName: 'Potęgi i Pierwiastki',
    title: 'Mnożenie i dzielenie potęg o tej samej podstawie',
    formula: 'a^r \\cdot a^s = a^{r+s}, \\qquad \\frac{a^r}{a^s} = a^{r-s}',
    subFormulas: [
      { label: 'Iloczyn potęg', formula: 'a^r \\cdot a^s = a^{r+s}' },
      { label: 'Iloraz potęg', formula: '\\frac{a^r}{a^s} = a^{r-s}' }
    ],
    explanation: 'Dla a > 0 oraz dowolnych wykładników r, s.',
    goldenRule: 'Zawsze sprowadzaj liczby do wspólnej podstawy (np. $4$ i $8$ sprowadzaj do $2$: $4 = 2^2, 8 = 2^3$).',
    ckeTrap: '$2^3 \\cdot 2^4 = 2^7$, a NIE $4^7$! Podstawa potęgi się NIE mnoży.',
    keywords: ['potęga', 'mnożenie', 'dzielenie', 'wykładnik', 'podstawa'],
    cke_page: 'str. 4',
    pageNumber: 4
  },
  {
    id: 'f-potegi-2',
    topicId: 'potegi-pierwiastki',
    topicName: 'Potęgi i Pierwiastki',
    title: 'Potęgowanie potęgi oraz potęga iloczynu',
    formula: '(a^r)^s = a^{r \\cdot s}, \\qquad (a \\cdot b)^r = a^r \\cdot b^r',
    subFormulas: [
      { label: 'Potęga potęgi', formula: '(a^r)^s = a^{r \\cdot s}' },
      { label: 'Potęga iloczynu', formula: '(a \\cdot b)^r = a^r \\cdot b^r' },
      { label: 'Potęga ilorazu', formula: '\\left(\\frac{a}{b}\\right)^r = \\frac{a^r}{b^r}' }
    ],
    explanation: 'W potędze potęgi wykładniki się MNOŻĄ, a w iloczynie potęg o tej samej podstawie – DODAJĄ.',
    goldenRule: '$(a^r)^s = a^{r \\cdot s}$, ale $a^r \\cdot a^s = a^{r+s}$. Zawsze rozróżniaj te dwa działania!',
    ckeTrap: '$(2^3)^2 = 2^6 = 64$, a NIE $2^5$!',
    keywords: ['potęgowanie potęgi', 'iloczyn potęg', 'nawiasy'],
    cke_page: 'str. 4',
    pageNumber: 4
  },
  {
    id: 'f-potegi-3',
    topicId: 'potegi-pierwiastki',
    topicName: 'Potęgi i Pierwiastki',
    title: 'Potęga o wykładniku ujemnym i wymiernym',
    formula: 'a^{-r} = \\frac{1}{a^r}, \\qquad a^{\\frac{m}{n}} = \\sqrt[n]{a^m}',
    subFormulas: [
      { label: 'Wykładnik ujemny', formula: 'a^{-r} = \\frac{1}{a^r}' },
      { label: 'Ułamek do potęgi ujemnej', formula: '\\left(\\frac{a}{b}\\right)^{-r} = \\left(\\frac{b}{a}\\right)^r' },
      { label: 'Wykładnik ułamkowy (pierwiastek)', formula: 'a^{\\frac{m}{n}} = \\sqrt[n]{a^m}' }
    ],
    explanation: 'Minus w wykładniku ODWRACA liczbę, mianownik w wykładniku to STOPIEŃ pierwiastka.',
    goldenRule: 'Mianownik ułamka w wykładniku ZAWSZE wędruje do stopnia pierwiastka: $a^{1/2} = \\sqrt{a}, a^{1/3} = \\sqrt[3]{a}$.',
    ckeTrap: 'Minus w wykładniku NIE daje ujemnego wyniku! $2^{-3} = \\frac{1}{8} > 0$, a NIE $-8$ ani $-\\frac{1}{8}$!',
    keywords: ['wykładnik ujemny', 'ułamkowy', 'odwrotność', 'stopień pierwiastka'],
    cke_page: 'str. 4',
    pageNumber: 4
  },
  {
    id: 'f-pierwiastki-1',
    topicId: 'potegi-pierwiastki',
    topicName: 'Potęgi i Pierwiastki',
    title: 'Działania na pierwiastkach i wyłączanie czynnika',
    formula: '\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}, \\qquad \\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}',
    subFormulas: [
      { label: 'Pierwiastek z iloczynu', formula: '\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}' },
      { label: 'Pierwiastek z ilorazu', formula: '\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}' },
      { label: 'Wyłączanie czynnika', formula: '\\sqrt{a^2 \\cdot b} = a\\sqrt{b}' }
    ],
    explanation: 'Dla $a, b \\ge 0$ (gdy $n$ parzyste) lub dowolnych (gdy $n$ nieparzyste).',
    goldenRule: 'Wyłączaj czynniki przed znak pierwiastka (np. $\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$).',
    ckeTrap: '$\\sqrt{9 + 16} = \\sqrt{25} = 5$, a NIE $\\sqrt{9} + \\sqrt{16} = 3 + 4 = 7$!',
    keywords: ['pierwiastek', 'iloczyn', 'iloraz', 'wyłączanie czynnika'],
    cke_page: 'str. 4',
    pageNumber: 4
  },
  {
    id: 'f-skrocone-1',
    topicId: 'potegi-pierwiastki',
    topicName: 'Potęgi i Pierwiastki',
    title: 'Wzory skróconego mnożenia (stopień 2)',
    formula: '(a \\pm b)^2 = a^2 \\pm 2ab + b^2, \\qquad a^2 - b^2 = (a - b)(a + b)',
    subFormulas: [
      { label: 'Kwadrat sumy', formula: '(a + b)^2 = a^2 + 2ab + b^2' },
      { label: 'Kwadrat różnicy', formula: '(a - b)^2 = a^2 - 2ab + b^2' },
      { label: 'Różnica kwadratów', formula: 'a^2 - b^2 = (a - b)(a + b)' }
    ],
    explanation: 'Kwadrat sumy, kwadrat różnicy oraz różnica kwadratów.',
    goldenRule: 'Różnica kwadratów $a^2 - b^2$ jest kluczem do usuwania niewymierności z mianownika przez mnożenie przez sprzężenie.',
    ckeTrap: 'Częste gubienie podwojonego iloczynu: $(x - 3)^2 = x^2 - 6x + 9$, a NIE $x^2 - 9$!',
    keywords: ['wzory skróconego mnożenia', 'kwadrat sumy', 'różnica kwadratów'],
    cke_page: 'str. 7',
    pageNumber: 7
  },

  // 2. Logarytmy i Procenty
  {
    id: 'f-log-1',
    topicId: 'logarytmy-procenty',
    topicName: 'Logarytmy i Procenty',
    title: 'Definicja logarytmu i pętla wykładnicza',
    formula: '\\log_a(b) = c \\longrightarrow a^c = b',
    subFormulas: [
      { label: 'Równoważność wykładnicza', formula: 'a^c = b' },
      { label: 'Założenia dziedziny', formula: 'a > 0, \\; a \\neq 1, \\; b > 0' }
    ],
    explanation: 'Logarytm to pytanie o wykładnik: „Do jakiej potęgi podnieść podstawę $a$, aby otrzymać $b$?”.',
    goldenRule: 'Zawsze sprawdzaj pętlą: podstawa do potęgi wyniku musi dać liczbę logarytmowaną ($a^c = b$).',
    ckeTrap: 'Podstawa $a$ MUSI być dodatnia i różna od $1$, a liczba logarytmowana $b$ MUSI być ściśle dodatnia ($b > 0$).',
    keywords: ['definicja logarytmu', 'pętla logarytmiczna', 'dziedzina logarytmu'],
    cke_page: 'str. 5',
    pageNumber: 5
  },
  {
    id: 'f-log-2',
    topicId: 'logarytmy-procenty',
    topicName: 'Logarytmy i Procenty',
    title: 'Działania na logarytmach: suma, różnica i potęga',
    formula: '\\log_a(x) + \\log_a(y) = \\log_a(x \\cdot y), \\qquad \\log_a(x^k) = k \\cdot \\log_a(x)',
    subFormulas: [
      { label: 'Suma logarytmów', formula: '\\log_a(x) + \\log_a(y) = \\log_a(x \\cdot y)' },
      { label: 'Różnica logarytmów', formula: '\\log_a(x) - \\log_a(y) = \\log_a\\left(\\frac{x}{y}\\right)' },
      { label: 'Wciąganie wykładnika', formula: 'k \\cdot \\log_a(x) = \\log_a(x^k)' }
    ],
    explanation: 'Działania na logarytmach o tej samej podstawie: suma logarytmów to logarytm iloczynu, różnica – ilorazu.',
    goldenRule: 'Współczynnik przed logarytmem (np. $2\\log_3 x$) zawsze wciągaj do wykładnika: $\\log_3(x^2)$, ZANIM zastosujesz wzór na sumę lub różnicę!',
    ckeTrap: '$\\log(x + y)$ to NIE $\\log(x) + \\log(y)$! Suma w argumencie jest nierozbijalna.',
    keywords: ['suma logarytmów', 'różnica logarytmów', 'wciąganie współczynnika'],
    cke_page: 'str. 5',
    pageNumber: 5
  },
  {
    id: 'f-proc-1',
    topicId: 'logarytmy-procenty',
    topicName: 'Logarytmy i Procenty',
    title: 'Zmiana procentowa i procent składany',
    formula: 'K_n = K_0 \\cdot \\left(1 + \\frac{p}{100 \\cdot m}\\right)^{n \\cdot m}',
    subFormulas: [
      { label: 'Kapitał końcowy (procent składany)', formula: 'K_n = K_0 \\cdot \\left(1 + \\frac{p}{100 \\cdot m}\\right)^{n \\cdot m}' },
      { label: 'Względna zmiana procentowa', formula: '\\frac{A - B}{B} \\cdot 100\\%' }
    ],
    explanation: '$m$ – liczba kapitalizacji w roku, $n$ – liczba lat, $p$ – oprocentowanie roczne w $\%$.',
    goldenRule: 'Baza wyjściowa („od czego liczysz”) ZAWSZE trafia do mianownika ułamka.',
    ckeTrap: 'Obniżka o $20\\%$ i podwyżka o $20\\%$ NIE przywraca ceny początkowej! Cena końcowa to $100 \\cdot 0{,}8 \\cdot 1{,}2 = 96$ (spadek o $4\\%$).',
    keywords: ['procenty', 'lokaty', 'kapitalizacja', 'procent składany'],
    cke_page: 'str. 10',
    pageNumber: 10
  },

  // 3. Funkcje i Równania
  {
    id: 'f-funkcja-liniowa',
    topicId: 'funkcje-rownania',
    topicName: 'Funkcje i Równania',
    title: 'Funkcja liniowa f(x) = ax + b i warunki prostych',
    formula: 'f(x) = ax + b, \\qquad a = \\operatorname{tg}\\alpha',
    subFormulas: [
      { label: 'Miejsce zerowe', formula: 'x_0 = -\\frac{b}{a}' },
      { label: 'Punkt przecięcia z osią OY', formula: '(0, b)' },
      { label: 'Warunek równoległości prostych', formula: 'a_1 = a_2' },
      { label: 'Warunek prostopadłości prostych', formula: 'a_1 \\cdot a_2 = -1' }
    ],
    explanation: '$a$ to współczynnik kierunkowy ($a = \\operatorname{tg} \\alpha$), $b$ to wyraz wolny (przecięcie z osią $OY$).',
    goldenRule: 'Dwie proste są prostopadłe, gdy ich współczynniki są przeciwne i odwrotne (np. $\\frac{2}{3}$ oraz $-\\frac{3}{2}$).',
    ckeTrap: 'Punkt przecięcia z osią $OY$ to $(0, b)$, a z osią $OX$ to $(-\\frac{b}{a}, 0)$. Nie myl kolejności współrzędnych!',
    keywords: ['funkcja liniowa', 'współczynnik kierunkowy', 'prostopadłość', 'równoległość'],
    cke_page: 'str. 21–22',
    pageNumber: 21,
    diagram: {
      type: 'GEOMETRY_2D',
      title: 'Prosta w układzie współrzędnych: y = ax + b, współczynnik a = tg α i punkt (0, b)',
      formulaBadge: '$y = ax + b, \\quad a = \\operatorname{tg}\\alpha, \\quad (0, b)$',
      width: 480,
      height: 220,
      segments: [
        { from: [30, 160], to: [420, 160], color: '#475569', strokeWidth: 1.5 },
        { from: [140, 20], to: [140, 200], color: '#475569', strokeWidth: 1.5 },
        { from: [40, 195], to: [320, 25], color: '#FFB800', strokeWidth: 2.5 },
        { from: [100, 160], to: [170, 160], color: '#64748B', strokeWidth: 1.2, dashed: true }
      ],
      arcs: [
        { cx: 100, cy: 160, r: 35, startAngleDeg: 59, endAngleDeg: 90, color: '#10B981', label: 'α' }
      ],
      points: [
        { x: 140, y: 135, label: '(0, b)', color: '#38BDF8', dot: 'filled', attach: 'e' },
        { x: 100, y: 160, label: '(-b/a, 0)', color: '#FFB800', dot: 'filled', attach: 'sw' },
        { x: 140, y: 160, label: 'O', color: '#64748B', dot: 'none', attach: 'sw' }
      ],
      labels: [
        { x: 415, y: 155, text: 'X', color: '#64748B', fontSize: 12, fontWeight: '700' },
        { x: 145, y: 20, text: 'Y', color: '#64748B', fontSize: 12, fontWeight: '700' },
        { x: 260, y: 35, text: 'y = ax + b', color: '#FFB800', fontSize: 13, fontWeight: '700', badge: true },
        { x: 385, y: 55, text: 'a = tg α', color: '#10B981', fontSize: 12, fontWeight: '700', badge: true },
        { x: 385, y: 95, text: 'Przecięcie OY: (0, b)', color: '#38BDF8', fontSize: 12, fontWeight: '700', badge: true },
        { x: 385, y: 135, text: 'Równoległość: a₁ = a₂', color: '#FFDCA1', fontSize: 12, fontWeight: '700', badge: true },
        { x: 385, y: 175, text: 'Prostopadłość: a₁ · a₂ = -1', color: '#F43F5E', fontSize: 12, fontWeight: '700', badge: true }
      ],
      caption: 'Współczynnik kierunkowy a jest tangensem kąta nachylenia prostej do dodatniej półosi OX (a = tg α). Wyraz wolny b wyznacza punkt przecięcia z osią OY: (0, b). Dwie proste są równoległe, gdy a₁ = a₂, i prostopadłe, gdy a₁ · a₂ = -1.'
    }
  },
  {
    id: 'f-funkcja-kwadratowa',
    topicId: 'funkcje-rownania',
    topicName: 'Funkcje i Równania',
    title: 'Funkcja kwadratowa f(x) = ax² + bx + c',
    formula: 'f(x) = ax^2 + bx + c',
    subFormulas: [
      { label: 'Wyróżnik trójmianu (delta)', formula: '\\Delta = b^2 - 4ac' },
      { label: 'Wierzchołek paraboli W = (p, q)', formula: 'p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a}' },
      { label: 'Postać kanoniczna', formula: 'f(x) = a(x - p)^2 + q' },
      { label: 'Postać iloczynowa (dla Δ ≥ 0)', formula: 'f(x) = a(x - x_1)(x - x_2)' }
    ],
    explanation: 'Jeśli $a > 0$, ramiona paraboli idą w górę (minimum w wierzchołku). Jeśli $a < 0$, ramiona idą w dół (maksimum).',
    goldenRule: 'Współrzędna $p$ wierzchołka leży dokładnie w połowie między miejscami zerowymi: $p = \\frac{x_1 + x_2}{2}$.',
    ckeTrap: 'Uważaj na znaki w postaci kanonicznej: $f(x) = 2(x - 3)^2 + 5$ ma wierzchołek w $p = +3$, a NIE $-3$!',
    keywords: ['funkcja kwadratowa', 'delta', 'wierzchołek', 'postać kanoniczna', 'postać iloczynowa'],
    cke_page: 'str. 7–8',
    pageNumber: 7,
    diagram: {
      type: 'GEOMETRY_2D',
      title: 'Funkcja kwadratowa: Parabola, wierzchołek W(p, q), oś symetrii i miejsca zerowe',
      formulaBadge: '$f(x) = ax^2 + bx + c, \\quad W = (p, q), \\quad p = -\\frac{b}{2a}, \\quad q = -\\frac{\\Delta}{4a}$',
      width: 480,
      height: 220,
      segments: [
        { from: [30, 140], to: [420, 140], color: '#475569', strokeWidth: 1.5 },
        { from: [80, 20], to: [80, 200], color: '#475569', strokeWidth: 1.5 },
        { from: [185, 25], to: [185, 195], color: '#38BDF8', strokeWidth: 1.5, dashed: true },
        { from: [185, 175], to: [185, 140], color: '#64748B', strokeWidth: 1.2, dashed: true },
        { from: [185, 175], to: [80, 175], color: '#64748B', strokeWidth: 1.2, dashed: true }
      ],
      curves: [
        {
          quadratic: { start: [65, 45], control: [185, 305], end: [305, 45] },
          color: '#FFB800',
          strokeWidth: 2.5
        }
      ],
      points: [
        { x: 185, y: 175, label: 'W(p, q)', color: '#38BDF8', dot: 'filled', attach: 's' },
        { x: 123, y: 140, label: 'x₁', color: '#10B981', dot: 'filled', attach: 'nw' },
        { x: 247, y: 140, label: 'x₂', color: '#10B981', dot: 'filled', attach: 'ne' },
        { x: 80, y: 68, label: '(0, c)', color: '#FFB800', dot: 'filled', attach: 'w' },
        { x: 185, y: 140, label: 'p', color: '#38BDF8', dot: 'hollow', attach: 'n' },
        { x: 80, y: 175, label: 'q', color: '#38BDF8', dot: 'hollow', attach: 'w' },
        { x: 80, y: 140, label: 'O', color: '#64748B', dot: 'none', attach: 'sw' }
      ],
      labels: [
        { x: 415, y: 135, text: 'X', color: '#64748B', fontSize: 12, fontWeight: '700' },
        { x: 85, y: 20, text: 'Y', color: '#64748B', fontSize: 12, fontWeight: '700' },
        { x: 185, y: 20, text: 'oś x = p', color: '#38BDF8', fontSize: 11, fontWeight: '700', badge: true },
        { x: 385, y: 55, text: 'W = (p, q)', color: '#38BDF8', fontSize: 12, fontWeight: '700', badge: true },
        { x: 385, y: 95, text: 'p = -b / (2a)', color: '#FFDCA1', fontSize: 12, fontWeight: '700', badge: true },
        { x: 385, y: 135, text: 'q = -Δ / (4a)', color: '#FFDCA1', fontSize: 12, fontWeight: '700', badge: true },
        { x: 385, y: 175, text: 'oś: p = (x₁ + x₂) / 2', color: '#10B981', fontSize: 12, fontWeight: '700', badge: true }
      ],
      caption: 'Wykresem funkcji kwadratowej jest parabola. Oś symetrii paraboli x = p przechodzi przez wierzchołek W(p, q) i dzieli odległość między miejscami zerowymi dokładnie na pół: p = (x₁ + x₂)/2. Współrzędna q = f(p) wyznacza najmniejszą (dla a > 0) lub największą (dla a < 0) wartość funkcji.'
    }
  },
  {
    id: 'f-wzory-vietea',
    topicId: 'funkcje-rownania',
    topicName: 'Funkcje i Równania',
    title: 'Wzory Viète’a dla trójmianu kwadratowego',
    formula: 'x_1 + x_2 = -\\frac{b}{a}, \\qquad x_1 \\cdot x_2 = \\frac{c}{a}',
    subFormulas: [
      { label: 'Suma pierwiastków', formula: 'x_1 + x_2 = -\\frac{b}{a}' },
      { label: 'Iloczyn pierwiastków', formula: 'x_1 \\cdot x_2 = \\frac{c}{a}' },
      { label: 'Suma kwadratów pierwiastków', formula: 'x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2' }
    ],
    explanation: 'Pozwalają badać znaki pierwiastków lub sumy i iloczyny bez bezpośredniego wyliczania $x_1$ i $x_2$.',
    goldenRule: 'Przydatna tożsamość: $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$.',
    ckeTrap: 'Pamiętaj o minusie przy sumie pierwiastków: $-\\frac{b}{a}$!',
    keywords: ['Vieta', 'wzory vietea', 'suma pierwiastków', 'iloczyn pierwiastków'],
    cke_page: 'str. 8',
    pageNumber: 8
  },

  // 4. Ciągi Liczbowe
  {
    id: 'f-ciag-arytmetyczny',
    topicId: 'ciagi',
    topicName: 'Ciągi Liczbowe',
    title: 'Ciąg arytmetyczny (stała różnica r)',
    formula: 'a_n = a_1 + (n - 1)r',
    subFormulas: [
      { label: 'Wzór ogólny n-tego wyrazu', formula: 'a_n = a_1 + (n - 1)r' },
      { label: 'Związek sąsiednich wyrazów', formula: 'a_n = \\frac{a_{n-1} + a_{n+1}}{2}' },
      { label: 'Suma n początkowych wyrazów', formula: 'S_n = \\frac{a_1 + a_n}{2} \\cdot n' }
    ],
    explanation: 'Każdy kolejny wyraz powstaje przez dodanie stałej różnicy $r$: $a_{n+1} = a_n + r$.',
    goldenRule: 'Trzy liczby $(x, y, z)$ tworzą ciąg arytmetyczny, gdy $2y = x + z$.',
    ckeTrap: 'We wzorze na $a_n$ mnożymy $r$ przez $(n - 1)$, a NIE przez $n$!',
    keywords: ['ciąg arytmetyczny', 'różnica ciągu', 'suma ciągu'],
    cke_page: 'str. 9',
    pageNumber: 9
  },
  {
    id: 'f-ciag-geometryczny',
    topicId: 'ciagi',
    topicName: 'Ciągi Liczbowe',
    title: 'Ciąg geometryczny (stały iloraz q)',
    formula: 'a_n = a_1 \\cdot q^{n-1}',
    subFormulas: [
      { label: 'Wzór ogólny n-tego wyrazu', formula: 'a_n = a_1 \\cdot q^{n-1}' },
      { label: 'Związek sąsiednich wyrazów', formula: 'a_n^2 = a_{n-1} \\cdot a_{n+1}' },
      { label: 'Suma n początkowych wyrazów (q ≠ 1)', formula: 'S_n = a_1 \\cdot \\frac{1 - q^n}{1 - q}' }
    ],
    explanation: 'Każdy kolejny wyraz powstaje przez pomnożenie poprzedniego przez stały iloraz $q$: $a_{n+1} = a_n \\cdot q$.',
    goldenRule: 'Trzy liczby dodatnie $(x, y, z)$ tworzą ciąg geometryczny, gdy $y^2 = x \\cdot z$.',
    ckeTrap: 'Wykładnik ilorazu to $(n - 1)$: $a_4 = a_1 \\cdot q^3$, a NIE $a_1 \\cdot q^4$!',
    keywords: ['ciąg geometryczny', 'iloraz ciągu', 'suma geometryczna'],
    cke_page: 'str. 10',
    pageNumber: 10
  },

  // 5. Trygonometria
  {
    id: 'f-trygo-definicje',
    topicId: 'trygonometria',
    topicName: 'Trygonometria',
    title: 'Definicje w trójkącie prostokątnym',
    formula: '\\sin \\alpha = \\frac{a}{c}, \\qquad \\cos \\alpha = \\frac{b}{c}, \\qquad \\operatorname{tg} \\alpha = \\frac{a}{b}',
    subFormulas: [
      { label: 'Sinus kąta ostrego', formula: '\\sin \\alpha = \\frac{a}{c}' },
      { label: 'Cosinus kąta ostrego', formula: '\\cos \\alpha = \\frac{b}{c}' },
      { label: 'Tangens kąta ostrego', formula: '\\operatorname{tg} \\alpha = \\frac{a}{b} = \\frac{\\sin \\alpha}{\\cos \\alpha}' },
      { label: 'Jedynka trygonometryczna', formula: '\\sin^2 \\alpha + \\cos^2 \\alpha = 1' }
    ],
    explanation: 'Dla kąta ostrego α w trójkącie prostokątnym o przyprostokątnych a, b i przeciwprostokątnej c.',
    goldenRule: 'Jedynka trygonometryczna: sin² α + cos² α = 1.',
    ckeTrap: 'Zawsze sprawdzaj, który kąt jest naprzeciwko danej przyprostokątnej!',
    keywords: ['sinus', 'cosinus', 'tangens', 'trójkąt prostokątny'],
    cke_page: 'str. 10',
    pageNumber: 10,
    diagram: {
      type: 'TRIGONOMETRY',
      title: 'Trójkąt prostokątny i definicje funkcji trygonometrycznych',
      formulaBadge: '$\\sin\\alpha = \\frac{a}{c}, \\; \\cos\\alpha = \\frac{b}{c}, \\; \\operatorname{tg}\\alpha = \\frac{a}{b}$',
      width: 500,
      height: 210,
      polygons: [
        {
          points: '178,160 178,148 190,148 190,160',
          fill: 'rgba(255, 255, 255, 0.08)',
          stroke: '#64748B',
          strokeWidth: 1.5
        }
      ],
      segments: [
        { from: [40, 160], to: [190, 160], color: '#38BDF8', strokeWidth: 2.5, label: 'b' },
        { from: [190, 160], to: [190, 45], color: '#F43F5E', strokeWidth: 2.5, label: 'a' },
        { from: [40, 160], to: [190, 45], color: '#FFB800', strokeWidth: 2.5, label: 'c' }
      ],
      points: [
        { x: 40, y: 160, label: 'A', dot: 'filled', color: '#38BDF8', attach: 'sw' },
        { x: 190, y: 160, label: 'C', dot: 'filled', color: '#64748B', attach: 'se' },
        { x: 190, y: 45, label: 'B', dot: 'filled', color: '#F43F5E', attach: 'ne' },
        { x: 184, y: 154, dot: 'filled', color: '#94A3B8' }
      ],
      arcs: [
        { cx: 40, cy: 160, r: 35, startAngleDeg: 55, endAngleDeg: 90, color: '#10B981', label: 'α' }
      ],
      labels: [
        { x: 270, y: 48, text: 'sin α = a / c', color: '#F43F5E', fontSize: 13, fontWeight: '700', badge: true, anchor: 'start' },
        { x: 270, y: 88, text: 'cos α = b / c', color: '#38BDF8', fontSize: 13, fontWeight: '700', badge: true, anchor: 'start' },
        { x: 270, y: 128, text: 'tg α = a / b', color: '#FFDCA1', fontSize: 13, fontWeight: '700', badge: true, anchor: 'start' },
        { x: 270, y: 168, text: 'a² + b² = c²', color: '#10B981', fontSize: 13, fontWeight: '700', badge: true, anchor: 'start' }
      ],
      caption: 'W trójkącie prostokątnym sinus to stosunek przyprostokątnej naprzeciw kąta do przeciwprostokątnej, cosinus to przyprostokątna przyległa, a tangens to iloraz przyprostokątnych.'
    }
  },
  {
    id: 'f-trygo-tabelka',
    topicId: 'trygonometria',
    topicName: 'Trygonometria',
    title: 'Tabela wartości i wzory redukcyjne kąta rozwartego',
    formula: '\\sin 30^\\circ = \\frac{1}{2}, \\quad \\sin 45^\\circ = \\frac{\\sqrt{2}}{2}, \\quad \\sin 60^\\circ = \\frac{\\sqrt{3}}{2}',
    subFormulas: [
      { label: 'Wartości dla kąta 30°', formula: '\\sin 30^\\circ = \\frac{1}{2}, \\; \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}, \\; \\operatorname{tg} 30^\\circ = \\frac{\\sqrt{3}}{3}' },
      { label: 'Wartości dla kąta 45°', formula: '\\sin 45^\\circ = \\frac{\\sqrt{2}}{2}, \\; \\cos 45^\\circ = \\frac{\\sqrt{2}}{2}, \\; \\operatorname{tg} 45^\\circ = 1' },
      { label: 'Wartości dla kąta 60°', formula: '\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}, \\; \\cos 60^\\circ = \\frac{1}{2}, \\; \\operatorname{tg} 60^\\circ = \\sqrt{3}' },
      { label: 'Wzory redukcyjne dla 180° - α', formula: '\\sin(180^\\circ - \\alpha) = \\sin\\alpha, \\; \\cos(180^\\circ - \\alpha) = -\\cos\\alpha' }
    ],
    explanation: 'Wartości kluczowych kątów ostrych oraz redukcja dla kątów rozwartych (II ćwiartka).',
    goldenRule: 'Zauważ symetrię: sin 30° = cos 60° = 1/2, oraz sin 60° = cos 30° = √3/2. W II ćwiartce sinus jest dodatni, a cosinus ujemny!',
    ckeTrap: 'tg 45° to 1, a NIE √2/2! Dla kątów rozwartych cosinus jest ZAWSZE ujemny: cos 120° = -cos 60° = -1/2.',
    keywords: ['wartości kątów', '30 stopni', '45 stopni', '60 stopni', 'wzory redukcyjne'],
    cke_page: 'str. 12–13',
    pageNumber: 12
  },
  {
    id: 'f-trygo-pola',
    topicId: 'trygonometria',
    topicName: 'Trygonometria',
    title: 'Pole trójkąta z sinusem kąta',
    formula: 'P = \\frac{1}{2} \\cdot a \\cdot b \\cdot \\sin \\gamma',
    explanation: 'Pole trójkąta równe jest połowie iloczynu długości dwóch boków i sinusa kąta zawartego między nimi.',
    goldenRule: 'Niezastąpione zadanie maturalne: jeśli masz dwa boki i kąt między nimi, nie szukaj wysokości, użyj tego wzoru!',
    ckeTrap: 'Kąt MUSI być zawarty MIĘDZY bokami a i b.',
    keywords: ['pole trójkąta', 'pole z sinusem', 'sinus kąta'],
    cke_page: 'str. 15',
    pageNumber: 15,
    diagram: {
      type: 'TRIGONOMETRY',
      title: 'Pole trójkąta z sinusem kąta zawartego między bokami',
      formulaBadge: '$P = \\frac{1}{2} \\cdot a \\cdot b \\cdot \\sin\\gamma$',
      width: 460,
      height: 210,
      segments: [
        { from: [60, 160], to: [360, 160], color: '#38BDF8', strokeWidth: 3, label: 'b' },
        { from: [60, 160], to: [200, 50], color: '#FFB800', strokeWidth: 3, label: 'a' },
        { from: [200, 50], to: [360, 160], color: '#475569', strokeWidth: 1.5, label: 'c' },
        { from: [200, 50], to: [200, 160], color: '#F43F5E', dashed: true, strokeWidth: 2, label: 'h = a · sin γ' }
      ],
      arcs: [
        { cx: 60, cy: 160, r: 40, startAngleDeg: 38, endAngleDeg: 90, color: '#10B981', label: 'γ' }
      ],
      points: [
        { x: 60, y: 160, label: 'C (kąt γ)', color: '#10B981', dot: 'filled', attach: 'sw' },
        { x: 200, y: 50, label: 'B', color: '#FFB800', dot: 'filled', attach: 'n' },
        { x: 360, y: 160, label: 'A', color: '#38BDF8', dot: 'filled', attach: 'se' },
        { x: 200, y: 160, label: 'D', color: '#F43F5E', dot: 'hollow', attach: 's' }
      ],
      labels: [
        { x: 260, y: 25, text: 'Wysokość: h = a · sin γ  ⟶  P = 0,5 · b · (a · sin γ)', color: '#FFDCA1', fontSize: 12, fontWeight: '700', badge: true },
        { x: 210, y: 195, text: 'Kąt γ MUSI leżeć bezpośrednio między bokami a i b!', color: '#F43F5E', fontSize: 11, fontWeight: '700' }
      ],
      caption: 'Wysokość trójkąta to h = a · sin γ. Podstawiając do klasycznego wzoru P = (b · h)/2 otrzymujemy P = 0,5 · a · b · sin γ. Używaj tego wzoru ZAWSZE, gdy znasz dwa boki i kąt między nimi.'
    }
  },

  // 6. Planimetria i Geometria Analityczna
  {
    id: 'f-geo-odleglosc',
    topicId: 'geometria',
    topicName: 'Planimetria i Analityczna',
    title: 'Odległość punktów i środek odcinka w układzie współrzędnych',
    formula: '|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}',
    subFormulas: [
      { label: 'Długość odcinka |AB|', formula: '|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}' },
      { label: 'Współrzędne środka S = (x_S, y_S)', formula: 'x_S = \\frac{x_A + x_B}{2}, \\quad y_S = \\frac{y_A + y_B}{2}' }
    ],
    explanation: 'Dla punktów $A = (x_A, y_A)$ oraz $B = (x_B, y_B)$.',
    goldenRule: 'Środek odcinka to średnia arytmetyczna współrzędnych końców: $S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)$.',
    ckeTrap: 'Przy odejmowaniu ujemnych współrzędnych: $(x_B - (-3))$ zamienia się na $(x_B + 3)$!',
    keywords: ['odległość punktów', 'środek odcinka', 'geometria analityczna'],
    cke_page: 'str. 21',
    pageNumber: 21,
    diagram: {
      type: 'GEOMETRY_2D',
      title: 'Odległość punktów i współrzędne środka odcinka w układzie współrzędnych',
      formulaBadge: '$|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}, \\quad S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)$',
      width: 480,
      height: 220,
      segments: [
        { from: [30, 165], to: [420, 165], color: '#475569', strokeWidth: 1.5 },
        { from: [80, 20], to: [80, 195], color: '#475569', strokeWidth: 1.5 },
        { from: [130, 125], to: [280, 45], color: '#FFB800', strokeWidth: 2.5 },
        { from: [130, 125], to: [280, 125], color: '#38BDF8', dashed: true, strokeWidth: 1.5, label: 'x_B - x_A' },
        { from: [280, 125], to: [280, 45], color: '#F43F5E', dashed: true, strokeWidth: 1.5, label: 'y_B - y_A' },
        { from: [130, 125], to: [130, 165], color: '#64748B', dashed: true, strokeWidth: 1.2 },
        { from: [205, 85], to: [205, 165], color: '#10B981', dashed: true, strokeWidth: 1.2 },
        { from: [280, 125], to: [280, 165], color: '#64748B', dashed: true, strokeWidth: 1.2 },
        { from: [130, 125], to: [80, 125], color: '#64748B', dashed: true, strokeWidth: 1.2 },
        { from: [205, 85], to: [80, 85], color: '#10B981', dashed: true, strokeWidth: 1.2 },
        { from: [280, 45], to: [80, 45], color: '#64748B', dashed: true, strokeWidth: 1.2 }
      ],
      points: [
        { x: 130, y: 125, label: 'A(x_A, y_A)', color: '#FFB800', dot: 'filled', attach: 'nw' },
        { x: 280, y: 45, label: 'B(x_B, y_B)', color: '#FFB800', dot: 'filled', attach: 'ne' },
        { x: 205, y: 85, label: 'S(x_S, y_S)', color: '#10B981', dot: 'filled', attach: 'nw' },
        { x: 80, y: 165, label: 'O', color: '#64748B', dot: 'none', attach: 'sw' }
      ],
      labels: [
        { x: 415, y: 160, text: 'X', color: '#64748B', fontSize: 12, fontWeight: '700' },
        { x: 85, y: 20, text: 'Y', color: '#64748B', fontSize: 12, fontWeight: '700' },
        { x: 130, y: 182, text: 'x_A', color: '#94A3B8', fontSize: 11, fontWeight: '600' },
        { x: 205, y: 182, text: 'x_S', color: '#10B981', fontSize: 11, fontWeight: '700' },
        { x: 280, y: 182, text: 'x_B', color: '#94A3B8', fontSize: 11, fontWeight: '600' },
        { x: 62, y: 125, text: 'y_A', color: '#94A3B8', fontSize: 11, fontWeight: '600' },
        { x: 62, y: 85, text: 'y_S', color: '#10B981', fontSize: 11, fontWeight: '700' },
        { x: 62, y: 45, text: 'y_B', color: '#94A3B8', fontSize: 11, fontWeight: '600' },
        { x: 385, y: 55, text: '|AB| = √[(x_B - x_A)² + (y_B - y_A)²]', color: '#FFDCA1', fontSize: 12, fontWeight: '700', badge: true },
        { x: 385, y: 95, text: 'x_S = (x_A + x_B) / 2', color: '#10B981', fontSize: 12, fontWeight: '700', badge: true },
        { x: 385, y: 135, text: 'y_S = (y_A + y_B) / 2', color: '#10B981', fontSize: 12, fontWeight: '700', badge: true },
        { x: 385, y: 175, text: 'Δx = x_B - x_A,  Δy = y_B - y_A', color: '#38BDF8', fontSize: 11, fontWeight: '700', badge: true }
      ],
      caption: 'Długość odcinka |AB| wynika bezpośrednio z twierdzenia Pitagorasa w trójkącie o przyprostokątnych |x_B - x_A| i |y_B - y_A|. Współrzędne środka S to średnie arytmetyczne odpowiednich współrzędnych końców odcinka.'
    }
  },
  {
    id: 'f-geo-trojkat-rownoboczny',
    topicId: 'planimetria',
    topicName: 'Planimetria',
    title: 'Trójkąt równoboczny',
    formula: 'h = \\frac{a\\sqrt{3}}{2}, \\qquad P = \\frac{a^2\\sqrt{3}}{4}',
    subFormulas: [
      { label: 'Wysokość trójkąta', formula: 'h = \\frac{a\\sqrt{3}}{2}' },
      { label: 'Pole powierzchni', formula: 'P = \\frac{a^2\\sqrt{3}}{4}' },
      { label: 'Promień koła opisanego R', formula: 'R = \\frac{2}{3}h = \\frac{a\\sqrt{3}}{3}' },
      { label: 'Promień koła wpisanego r', formula: 'r = \\frac{1}{3}h = \\frac{a\\sqrt{3}}{6}' }
    ],
    explanation: 'Dla trójkąta równobocznego o boku długości $a$.',
    goldenRule: 'Pamiętaj: $R = 2r$ (promień koła opisanego jest dwukrotnie większy od promienia wpisanego).',
    ckeTrap: 'Nie myl wzoru na wysokość (dzielenie przez $2$) ze wzorem na pole (dzielenie przez $4$ i $a^2$)!',
    keywords: ['trójkąt równoboczny', 'wysokość', 'pole', 'koło opisane', 'koło wpisane'],
    cke_page: 'str. 16',
    pageNumber: 16,
    diagram: {
      type: 'GEOMETRY_2D',
      title: 'Trójkąt równoboczny: Wysokość h, koło opisane R i wpisane r',
      formulaBadge: '$h = \\frac{a\\sqrt{3}}{2}, \\quad P = \\frac{a^2\\sqrt{3}}{4}, \\quad R = 2r = \\frac{2}{3}h$',
      width: 460,
      height: 230,
      polygons: [
        {
          points: '210,32 120,164 300,164',
          fill: 'rgba(255, 184, 0, 0.08)',
          stroke: '#FFB800',
          strokeWidth: 2.5
        }
      ],
      circles: [
        { cx: 210, cy: 120, r: 44, stroke: '#10B981', strokeWidth: 1.5, fill: 'rgba(16, 185, 129, 0.08)' },
        { cx: 210, cy: 120, r: 88, stroke: '#38BDF8', strokeWidth: 1.2, dashed: true, fill: 'none' }
      ],
      segments: [
        { from: [210, 32], to: [210, 164], color: '#F43F5E', strokeWidth: 2 },
        { from: [210, 32], to: [210, 120], color: '#38BDF8', strokeWidth: 3, label: 'R' },
        { from: [210, 120], to: [210, 164], color: '#10B981', strokeWidth: 3, label: 'r' }
      ],
      points: [
        { x: 210, y: 32, label: 'C', color: '#FFB800', dot: 'filled', attach: 'n' },
        { x: 120, y: 164, label: 'A', color: '#FFB800', dot: 'filled', attach: 'sw' },
        { x: 300, y: 164, label: 'B', color: '#FFB800', dot: 'filled', attach: 'se' },
        { x: 210, y: 120, label: 'S', color: '#FFDCA1', dot: 'filled', attach: 'e' }
      ],
      labels: [
        { x: 385, y: 60, text: 'R = a√3 / 3', color: '#38BDF8', fontSize: 13, fontWeight: '700', badge: true },
        { x: 385, y: 100, text: 'r = a√3 / 6', color: '#10B981', fontSize: 13, fontWeight: '700', badge: true },
        { x: 385, y: 140, text: 'R = 2r = ⅔h', color: '#FFDCA1', fontSize: 14, fontWeight: '800', badge: true },
        { x: 210, y: 188, text: 'h = a√3 / 2', color: '#F43F5E', fontSize: 12, fontWeight: '700' }
      ],
      caption: 'W trójkącie równobocznym środek koła wpisanego i opisanego to ten sam punkt. Dzieli on wysokość h w stosunku 2 : 1. Stąd promień koła opisanego R jest zawsze dwukrotnie większy od promienia wpisanego r: R = 2r.'
    }
  },
  {
    id: 'f-geo-okrag',
    topicId: 'geometria',
    topicName: 'Planimetria i Analityczna',
    title: 'Równanie okręgu o środku S = (a, b) i promieniu r',
    formula: '(x - a)^2 + (y - b)^2 = r^2',
    subFormulas: [
      { label: 'Środek okręgu', formula: 'S = (a, b)' },
      { label: 'Promień okręgu', formula: 'r > 0' }
    ],
    explanation: 'Równanie kanoniczne okręgu w układzie współrzędnych.',
    goldenRule: 'Prawa strona to $r^2$. Jeśli po prawej stronie masz $25$, to promień $r = 5$, a NIE $25$!',
    ckeTrap: 'Uważaj na znaki środka: $(x - 2)^2 + (y + 3)^2 = 16$ ma środek w $S = (2, -3)$!',
    keywords: ['równanie okręgu', 'środek okręgu', 'promień okręgu'],
    cke_page: 'str. 23',
    pageNumber: 23,
    diagram: {
      type: 'GEOMETRY_2D',
      title: 'Równanie okręgu w układzie współrzędnych: (x - a)² + (y - b)² = r²',
      formulaBadge: '$(x - a)^2 + (y - b)^2 = r^2$',
      width: 440,
      height: 220,
      circles: [
        {
          cx: 190,
          cy: 110,
          r: 65,
          fill: 'rgba(56, 189, 248, 0.08)',
          stroke: '#38BDF8',
          strokeWidth: 2
        }
      ],
      segments: [
        { from: [30, 185], to: [370, 185], color: '#475569', strokeWidth: 1.5 },
        { from: [55, 25], to: [55, 200], color: '#475569', strokeWidth: 1.5 },
        { from: [190, 110], to: [243, 73], color: '#FFB800', strokeWidth: 2.5, label: 'r' },
        { from: [190, 110], to: [243, 110], color: '#38BDF8', dashed: true, strokeWidth: 1.5, label: 'x - a' },
        { from: [243, 110], to: [243, 73], color: '#F43F5E', dashed: true, strokeWidth: 1.5, label: 'y - b' },
        { from: [190, 110], to: [190, 185], color: '#334155', dashed: true, strokeWidth: 1 },
        { from: [55, 110], to: [190, 110], color: '#334155', dashed: true, strokeWidth: 1 }
      ],
      points: [
        { x: 190, y: 110, label: 'S(a, b)', dot: 'filled', color: '#10B981', attach: 'sw' },
        { x: 243, y: 73, label: 'P(x, y)', dot: 'filled', color: '#FFB800', attach: 'ne' },
        { x: 190, y: 185, label: 'a', dot: 'hollow', color: '#94A3B8', attach: 's' },
        { x: 55, y: 110, label: 'b', dot: 'hollow', color: '#94A3B8', attach: 'w' }
      ],
      labels: [
        { x: 365, y: 180, text: 'X', color: '#64748B', fontSize: 12, fontWeight: '700' },
        { x: 55, y: 15, text: 'Y', color: '#64748B', fontSize: 12, fontWeight: '700' },
        { x: 280, y: 35, text: '(x - a)² + (y - b)² = r²', color: '#FFDCA1', fontSize: 13, fontWeight: '700', badge: true }
      ],
      caption: 'Równanie okręgu to bezpośrednie zastosowanie twierdzenia Pitagorasa w układzie OXY: odległość dowolnego punktu P(x, y) od środka S(a, b) wynosi r.'
    }
  },
  {
    id: 'f-geo-tales',
    topicId: 'planimetria',
    topicName: 'Planimetria',
    title: 'Twierdzenie Talesa i proporcja pól figur podobnych (k²)',
    formula: '\\begin{gathered} \\frac{|AD|}{|AB|} = \\frac{|AE|}{|AC|} = \\frac{|DE|}{|BC|} \\\\[6pt] \\frac{P_2}{P_1} = k^2 \\end{gathered}',
    subFormulas: [
      { label: 'Twierdzenie Talesa (proporcja ramion)', formula: '\\frac{|AD|}{|AB|} = \\frac{|AE|}{|AC|} = \\frac{|DE|}{|BC|}' },
      { label: 'Stosunek pól figur podobnych', formula: '\\frac{P_2}{P_1} = k^2' }
    ],
    explanation: 'Gdy proste są równoległe ($DE \\parallel BC$), odpowiednie odcinki na ramionach są proporcjonalne, a pole rośnie z kwadratem skali $k^2$.',
    goldenRule: 'Jeśli skala podobieństwa figur wynosi $k$, to obwód rośnie $k$-krotnie, a pole aż $k^2$-krotnie!',
    ckeTrap: 'Dla skali $k = 3$ pole jest $9$ razy większe, a NIE $3$ razy większe!',
    keywords: ['Tales', 'proste równoległe', 'figury podobne', 'stosunek pól'],
    cke_page: 'str. 17',
    pageNumber: 17,
    diagram: {
      type: 'GEOMETRY_2D',
      title: 'Twierdzenie Talesa i proporcja pól figur podobnych (k²)',
      formulaBadge: '$\\begin{gathered} \\frac{|AD|}{|AB|} = \\frac{|AE|}{|AC|} = \\frac{|DE|}{|BC|} \\\\[6pt] \\frac{P_2}{P_1} = k^2 \\end{gathered}$',
      width: 480,
      height: 220,
      segments: [
        { from: [120, 42], to: [40, 180], color: '#FFB800', strokeWidth: 2.5 },
        { from: [120, 42], to: [200, 180], color: '#38BDF8', strokeWidth: 2.5 },
        { from: [40, 180], to: [200, 180], color: '#F43F5E', strokeWidth: 2.5 },
        { from: [76, 118], to: [164, 118], color: '#10B981', strokeWidth: 2.5, label: 'DE' }
      ],
      polygons: [
        {
          points: '260,115 310,115 310,165 260,165',
          fill: 'rgba(16, 185, 129, 0.2)',
          stroke: '#10B981',
          strokeWidth: 2
        },
        {
          points: '340,65 440,65 440,165 340,165',
          fill: 'rgba(255, 184, 0, 0.16)',
          stroke: '#FFB800',
          strokeWidth: 2
        }
      ],
      points: [
        { x: 120, y: 42, label: 'A', color: '#FFDCA1', dot: 'filled', attach: 'n' },
        { x: 76, y: 118, label: 'D', color: '#FFB800', dot: 'filled', attach: 'w' },
        { x: 40, y: 180, label: 'B', color: '#FFB800', dot: 'filled', attach: 'sw' },
        { x: 164, y: 118, label: 'E', color: '#38BDF8', dot: 'filled', attach: 'e' },
        { x: 200, y: 180, label: 'C', color: '#38BDF8', dot: 'filled', attach: 'se' }
      ],
      labels: [
        { x: 120, y: 20, text: 'Tales: DE || BC', color: '#FFDCA1', fontSize: 12, fontWeight: '700', badge: true },
        { x: 120, y: 198, text: 'BC', color: '#F43F5E', fontSize: 12, fontWeight: '700' },
        { x: 285, y: 140, text: 'P₁ = 1', color: '#10B981', fontSize: 13, fontWeight: '700' },
        { x: 390, y: 115, text: 'P₂ = 4 = 2²', color: '#FFDCA1', fontSize: 14, fontWeight: '700' },
        { x: 350, y: 195, text: 'Skala k = 2  ⟶  Stosunek pól k² = 4', color: '#FFB800', fontSize: 11, fontWeight: '700', badge: true }
      ],
      caption: 'Gdy proste są równoległe (DE || BC), odpowiednie odcinki na ramionach są proporcjonalne: |AD|/|AB| = |AE|/|AC| = |DE|/|BC|. Jeśli skala podobieństwa figur wynosi k, to ich pola rosną aż k²-krotnie (dla k=2 pole rośnie 4-krotnie)!'
    }
  },
  {
    id: 'f-geo-katy-okrag',
    topicId: 'planimetria',
    topicName: 'Planimetria',
    title: 'Kąty w okręgu: Środkowy 2α i wpisany α',
    formula: '\\beta = 2\\alpha, \\qquad \\alpha_{\\text{średnica}} = 90^\\circ',
    subFormulas: [
      { label: 'Kąt środkowy i wpisany', formula: '\\beta = 2\\alpha' },
      { label: 'Kąt wpisany oparty na średnicy', formula: '\\alpha = 90^\\circ' }
    ],
    explanation: 'Kąt środkowy jest dwa razy większy od kąta wpisanego opartego na tym samym łuku.',
    goldenRule: 'Trójkąt wpisany w okrąg, którego jeden bok jest średnicą, jest ZAWSZE prostokątny ($90^\\circ$).',
    ckeTrap: 'Pamiętaj, że kąty muszą być oparte na TYM SAMYM łuku okręgu!',
    keywords: ['kąt środkowy', 'kąt wpisany', 'średnica okręgu', 'kąty w kole'],
    cke_page: 'str. 18',
    pageNumber: 18,
    diagram: {
      type: 'GEOMETRY_2D',
      title: 'Kąty w okręgu: Środkowy 2α i wpisany α na tym samym łuku',
      formulaBadge: '$\\beta = 2\\alpha, \\quad \\text{Kąt wpisany oparty na średnicy} = 90^\\circ$',
      width: 480,
      height: 235,
      circles: [
        {
          cx: 230,
          cy: 125,
          r: 80,
          fill: 'rgba(56, 189, 248, 0.06)',
          stroke: '#38BDF8',
          strokeWidth: 2
        }
      ],
      segments: [
        { from: [165, 180], to: [230, 125], color: '#FFB800', strokeWidth: 2.5 },
        { from: [295, 180], to: [230, 125], color: '#FFB800', strokeWidth: 2.5 },
        { from: [165, 180], to: [200, 48], color: '#10B981', strokeWidth: 2 },
        { from: [295, 180], to: [200, 48], color: '#10B981', strokeWidth: 2 },
        { from: [150, 125], to: [310, 125], color: '#475569', strokeWidth: 1.5, dashed: true }
      ],
      arcs: [
        { cx: 230, cy: 125, r: 28, startAngleDeg: 45, endAngleDeg: 135, color: '#FFB800', label: '2α' },
        { cx: 200, cy: 48, r: 26, startAngleDeg: 60, endAngleDeg: 110, color: '#10B981', label: 'α' }
      ],
      points: [
        { x: 230, y: 125, label: 'O (środek)', color: '#FFB800', dot: 'filled', attach: 'n' },
        { x: 165, y: 180, label: 'A', color: '#38BDF8', dot: 'filled', attach: 'sw' },
        { x: 295, y: 180, label: 'B', color: '#38BDF8', dot: 'filled', attach: 'se' },
        { x: 200, y: 48, label: 'C (wpisany)', color: '#10B981', dot: 'filled', attach: 'nw' }
      ],
      labels: [
        { x: 230, y: 205, text: 'Wspólny łuk AB', color: '#38BDF8', fontSize: 11, fontWeight: '700' },
        { x: 390, y: 80, text: 'Kąt środkowy = 2α', color: '#FFB800', fontSize: 12, fontWeight: '700', badge: true },
        { x: 390, y: 120, text: 'Kąt wpisany = α', color: '#10B981', fontSize: 12, fontWeight: '700', badge: true },
        { x: 390, y: 160, text: 'Na średnicy = 90°', color: '#FFDCA1', fontSize: 12, fontWeight: '700', badge: true }
      ],
      caption: 'Kąt środkowy oparty na tym samym łuku jest dokładnie dwa razy większy od kąta wpisanego (β = 2α). Kąt wpisany oparty na średnicy okręgu ma zawsze 90°.'
    }
  },

  // 7. Stereometria
  {
    id: 'f-stereo-prostopadloscian',
    topicId: 'stereometria',
    topicName: 'Stereometria',
    title: 'Graniastosłupy i prostopadłościan: Przekątna d i kąt nachylenia',
    formula: 'V = P_p \\cdot h, \\qquad d = \\sqrt{a^2 + b^2 + c^2}, \\qquad P_c = 2(ab + bc + ca)',
    subFormulas: [
      { label: 'Objętość prostopadłościanu', formula: 'V = a \\cdot b \\cdot c' },
      { label: 'Pole powierzchni całkowitej', formula: 'P_c = 2(ab + bc + ca)' },
      { label: 'Przekątna podstawy', formula: 'd_p = \\sqrt{a^2 + b^2}' },
      { label: 'Przekątna prostopadłościanu', formula: 'd = \\sqrt{a^2 + b^2 + c^2}' },
      { label: 'Kąt nachylenia przekątnej bryły', formula: '\\cos\\alpha = \\frac{d_p}{d}, \\quad \\operatorname{tg}\\alpha = \\frac{c}{d_p}' }
    ],
    explanation: 'Dla prostopadłościanu o krawędziach a, b, c przekątna podstawy to $d_p = \\sqrt{a^2 + b^2}$, a przekątna bryły to $d = \\sqrt{d_p^2 + c^2} = \\sqrt{a^2 + b^2 + c^2}$.',
    goldenRule: 'Kąt nachylenia przekątnej prostopadłościanu do płaszczyzny podstawy (α) leży między przekątną bryły (d) a przekątną podstawy (dp). Trójkąt o bokach dp, c, d jest ZAWSZE prostokątny!',
    ckeTrap: 'Nigdy nie myl przekątnej ściany bocznej z przekątną prostopadłościanu (bryły). Przekątna bryły łączy dwa najbardziej oddalone wierzchołki i przechodzi przez wnętrze.',
    keywords: ['prostopadłościan', 'graniastosłup', 'przekątna prostopadłościanu', 'kąt nachylenia', 'objętość'],
    cke_page: 'str. 24–25',
    pageNumber: 24,
    diagram: {
      type: 'STEREOMETRY_3D',
      title: 'Prostopadłościan 2.5D: Przekątna bryły d, przekątna podstawy d_p i kąt nachylenia α',
      formulaBadge: '$d = \\sqrt{a^2 + b^2 + c^2}, \\quad d_p = \\sqrt{a^2 + b^2}, \\quad \\operatorname{tg}\\alpha = \\frac{c}{d_p}$',
      width: 480,
      height: 235,
      polygons: [
        {
          points: '60,180 220,180 300,130 140,130',
          fill: 'rgba(56, 189, 248, 0.06)',
          stroke: '#38BDF8',
          strokeWidth: 1.5,
          dashed: true
        }
      ],
      segments: [
        { from: [60, 180], to: [220, 180], color: '#FFB800', strokeWidth: 2, label: 'a' },
        { from: [220, 180], to: [300, 130], color: '#FFB800', strokeWidth: 2, label: 'b' },
        { from: [300, 130], to: [140, 130], color: '#64748B', strokeWidth: 1.5, dashed: true },
        { from: [140, 130], to: [60, 180], color: '#64748B', strokeWidth: 1.5, dashed: true },
        { from: [60, 180], to: [60, 90], color: '#FFB800', strokeWidth: 2 },
        { from: [220, 180], to: [220, 90], color: '#FFB800', strokeWidth: 2 },
        { from: [300, 130], to: [300, 45], color: '#F43F5E', strokeWidth: 2.5, label: 'c' },
        { from: [140, 130], to: [140, 45], color: '#64748B', strokeWidth: 1.5, dashed: true },
        { from: [60, 90], to: [220, 90], color: '#FFB800', strokeWidth: 2 },
        { from: [220, 90], to: [300, 45], color: '#FFB800', strokeWidth: 2 },
        { from: [300, 45], to: [140, 45], color: '#FFB800', strokeWidth: 2 },
        { from: [140, 45], to: [60, 90], color: '#FFB800', strokeWidth: 2 },
        { from: [60, 180], to: [300, 130], color: '#10B981', strokeWidth: 2, dashed: true, label: 'd_p' },
        { from: [60, 180], to: [300, 45], color: '#38BDF8', strokeWidth: 2.5, label: 'd' }
      ],
      arcs: [
        { cx: 60, cy: 180, r: 42, startAngleDeg: 60, endAngleDeg: 78, color: '#10B981', label: 'α' }
      ],
      points: [
        { x: 60, y: 180, label: 'A', color: '#FFDCA1', dot: 'filled', attach: 'sw' },
        { x: 220, y: 180, label: 'B', color: '#FFDCA1', dot: 'filled', attach: 'se' },
        { x: 300, y: 130, label: 'C', color: '#FFDCA1', dot: 'filled', attach: 'e' },
        { x: 300, y: 45, label: 'G', color: '#38BDF8', dot: 'filled', attach: 'ne' }
      ],
      labels: [
        { x: 380, y: 55, text: 'd = √(a² + b² + c²)', color: '#38BDF8', fontSize: 12, fontWeight: '700', badge: true },
        { x: 380, y: 95, text: 'd_p = √(a² + b²)', color: '#10B981', fontSize: 12, fontWeight: '700', badge: true },
        { x: 380, y: 135, text: 'tg α = c / d_p', color: '#FFDCA1', fontSize: 12, fontWeight: '700', badge: true },
        { x: 380, y: 175, text: 'V = a · b · c', color: '#FFB800', fontSize: 12, fontWeight: '700', badge: true }
      ],
      caption: 'Przekątna podstawy dp = √(a² + b²) wraz z krawędzią pionową c tworzy trójkąt prostokątny, którego przeciwprostokątną jest przekątna prostopadłościanu d = √(a² + b² + c²). Kąt nachylenia α leży w płaszczyźnie tego trójkąta prostokątnego.'
    }
  },
  {
    id: 'f-stereo-ostroslup',
    topicId: 'stereometria',
    topicName: 'Stereometria',
    title: 'Ostrosłup prawidłowy 2.5D: Kąt krawędzi (α) vs kąt ściany bocznej (β)',
    formula: 'V = \\frac{1}{3} P_p \\cdot H, \\qquad P_c = P_p + P_b',
    subFormulas: [
      { label: 'Objętość ostrosłupa', formula: 'V = \\frac{1}{3} P_p \\cdot H' },
      { label: 'Kąt nachylenia krawędzi bocznej (α)', formula: '\\operatorname{tg}\\alpha = \\frac{H}{\\frac{1}{2}d}' },
      { label: 'Kąt nachylenia ściany bocznej (β)', formula: '\\operatorname{tg}\\beta = \\frac{H}{\\frac{1}{2}a}' }
    ],
    explanation: 'Różnica między kątem nachylenia krawędzi bocznej do podstawy a kątem nachylenia ściany bocznej.',
    goldenRule: 'Kąt krawędzi (α) łączy wierzchołek z rogiem podstawy (połowa przekątnej d/2). Kąt ściany (β) łączy wierzchołek ze środkiem boku (połowa boku a/2).',
    ckeTrap: 'Mylenie kąta krawędzi z kątem ściany bocznej to najczęstszy błąd w zadaniach otwartych ze stereometrii.',
    keywords: ['ostrosłup', 'kąt nachylenia', 'krawędź boczna', 'ściana boczna', 'wysokość ostrosłupa'],
    cke_page: 'str. 25',
    pageNumber: 25,
    diagram: {
      type: 'STEREOMETRY_3D',
      title: 'Ostrosłup prawidłowy 2.5D: Kąt krawędzi (α) vs kąt ściany bocznej (β)',
      formulaBadge: '$\\operatorname{tg}\\alpha = \\frac{H}{\\frac{1}{2}d}, \\quad \\operatorname{tg}\\beta = \\frac{H}{\\frac{1}{2}a}, \\quad V = \\frac{1}{3}P_p \\cdot H$',
      width: 480,
      height: 245,
      polygons: [
        {
          points: '80,190 240,220 380,180 240,42',
          fill: 'rgba(255, 184, 0, 0.05)',
          stroke: '#FFB800',
          strokeWidth: 2
        }
      ],
      segments: [
        { from: [80, 190], to: [240, 220], color: '#FFB800', strokeWidth: 2 },
        { from: [240, 220], to: [380, 180], color: '#FFB800', strokeWidth: 2 },
        { from: [380, 180], to: [220, 150], color: '#FFB800', strokeWidth: 1.5, dashed: true },
        { from: [80, 190], to: [220, 150], color: '#FFB800', strokeWidth: 1.5, dashed: true },
        { from: [240, 42], to: [80, 190], color: '#FFB800', strokeWidth: 2, label: 'b' },
        { from: [240, 42], to: [240, 220], color: '#FFB800', strokeWidth: 2 },
        { from: [240, 42], to: [380, 180], color: '#FFB800', strokeWidth: 2 },
        { from: [240, 42], to: [220, 150], color: '#FFB800', strokeWidth: 1.5, dashed: true },
        { from: [240, 42], to: [230, 185], color: '#38BDF8', strokeWidth: 2.5, label: 'H' },
        { from: [80, 190], to: [380, 180], color: '#64748B', strokeWidth: 1.2, dashed: true },
        { from: [240, 42], to: [310, 200], color: '#F43F5E', strokeWidth: 2, label: 'h_b' },
        { from: [230, 185], to: [310, 200], color: '#10B981', strokeWidth: 2, dashed: true, label: 'a/2' }
      ],
      points: [
        { x: 240, y: 42, label: 'S (wierzchołek)', color: '#FFB800', dot: 'filled', attach: 'n' },
        { x: 230, y: 185, label: 'O (spodek H)', color: '#38BDF8', dot: 'filled', attach: 'w' },
        { x: 310, y: 200, label: 'M (środek boku)', color: '#10B981', dot: 'filled', attach: 'se' },
        { x: 80, y: 190, label: 'A', color: '#FFDCA1', dot: 'filled', attach: 'sw' }
      ],
      labels: [
        { x: 140, y: 175, text: 'kąt α (krawędź)', color: '#38BDF8', fontSize: 11, fontWeight: '700', badge: true },
        { x: 285, y: 150, text: 'kąt β (ściana)', color: '#F43F5E', fontSize: 11, fontWeight: '700', badge: true },
        { x: 370, y: 65, text: 'H ⊥ podstawa', color: '#38BDF8', fontSize: 12, fontWeight: '700', badge: true }
      ],
      caption: 'Nie myl kątów! Kąt nachylenia krawędzi bocznej (α) leży w trójkącie z połową przekątnej podstawy (d/2). Kąt nachylenia ściany bocznej (β) leży w trójkącie z wysokością ściany bocznej (hb) i połową boku podstawy (a/2).'
    }
  },
  {
    id: 'f-stereo-bryly',
    topicId: 'stereometria',
    topicName: 'Stereometria',
    title: 'Bryły obrotowe: Przekrój osiowy stożka i walca',
    formula: 'V_{\\text{stożek}} = \\frac{1}{3}\\pi r^2 H, \\qquad V_{\\text{walec}} = \\pi r^2 H',
    subFormulas: [
      { label: 'Stożek - zależność Pitagorasa', formula: 'r^2 + H^2 = l^2' },
      { label: 'Objętość stożka', formula: 'V = \\frac{1}{3}\\pi r^2 H' },
      { label: 'Objętość walca', formula: 'V = \\pi r^2 H' },
      { label: 'Pole powierzchni bocznej stożka', formula: 'P_b = \\pi r l' }
    ],
    explanation: 'Przekroje osiowe brył obrotowych: stożek to trójkąt równoramienny o podstawie $2r$, walec – prostokąt o podstawie $2r$.',
    goldenRule: 'W stożku tworząca $l$, promień podstawy $r$ i wysokość $H$ ZAWSZE tworzą trójkąt prostokątny: $r^2 + H^2 = l^2$.',
    ckeTrap: 'Średnica podstawy to $2r$! W zadaniach CKE często podają średnicę zamiast promienia.',
    keywords: ['stożek', 'walec', 'tworząca', 'przekrój osiowy', 'bryły obrotowe'],
    cke_page: 'str. 26',
    pageNumber: 26,
    diagram: {
      type: 'STEREOMETRY_3D',
      title: 'Bryły obrotowe: Przekrój osiowy stożka i walca',
      formulaBadge: '$V_{\\text{stożek}} = \\frac{1}{3}\\pi r^2 H, \\quad r^2 + H^2 = l^2, \\quad V_{\\text{walec}} = \\pi r^2 H$',
      width: 480,
      height: 235,
      polygons: [
        {
          points: '60,185 180,185 120,56',
          fill: 'rgba(56, 189, 248, 0.12)',
          stroke: '#38BDF8',
          strokeWidth: 2
        },
        {
          points: '290,56 410,56 410,185 290,185',
          fill: 'rgba(255, 184, 0, 0.12)',
          stroke: '#FFB800',
          strokeWidth: 2
        }
      ],
      segments: [
        { from: [120, 56], to: [120, 185], color: '#F43F5E', strokeWidth: 2, label: 'H' },
        { from: [120, 180], to: [180, 180], color: '#10B981', strokeWidth: 2.5, label: 'r' },
        { from: [120, 56], to: [180, 180], color: '#38BDF8', strokeWidth: 2.5, label: 'l' },
        { from: [350, 56], to: [350, 185], color: '#F43F5E', strokeWidth: 1.5, dashed: true, label: 'H' },
        { from: [290, 185], to: [410, 185], color: '#FFB800', strokeWidth: 2.5, label: '2r' }
      ],
      points: [
        { x: 120, y: 56, label: 'Wierzchołek stożka', color: '#38BDF8', dot: 'filled', attach: 'n' },
        { x: 120, y: 185, label: 'O (środek)', color: '#10B981', dot: 'filled', attach: 's' }
      ],
      labels: [
        { x: 120, y: 28, text: 'Stożek: r² + H² = l²', color: '#38BDF8', fontSize: 12, fontWeight: '700', badge: true },
        { x: 350, y: 28, text: 'Walec: Przekrój 2r · H', color: '#FFB800', fontSize: 12, fontWeight: '700', badge: true },
        { x: 120, y: 212, text: 'Przekrój: trójkąt 2r × l × l', color: '#94A3B8', fontSize: 11 },
        { x: 350, y: 212, text: 'Przekrój: prostokąt 2r × H', color: '#94A3B8', fontSize: 11 }
      ],
      caption: 'Przekrój osiowy stożka to trójkąt równoramienny o podstawie 2r i ramionach l. Trójkąt prostokątny (r, H, l) daje zależność r² + H² = l² (Pitagoras!). Przekrój osiowy walca to prostokąt o wymiarach 2r na H.'
    }
  },

  // 8. Kombinatoryka i Prawdopodobieństwo
  {
    id: 'f-komb-prawd',
    topicId: 'prawdopodobienstwo',
    topicName: 'Kombinatoryka i Statystyka',
    title: 'Prawdopodobieństwo klasyczne i reguła mnożenia',
    formula: 'P(A) = \\frac{|A|}{|\\Omega|}',
    subFormulas: [
      { label: 'Klasyczna definicja prawdopodobieństwa', formula: 'P(A) = \\frac{|A|}{|\\Omega|}' },
      { label: 'Własność prawdopodobieństwa', formula: '0 \\le P(A) \\le 1' },
      { label: 'Prawdopodobieństwo zdarzenia przeciwnego', formula: 'P(A\') = 1 - P(A)' }
    ],
    explanation: '$|A|$ to liczba zdarzeń sprzyjających, $|\\Omega|$ to liczba wszystkich możliwych jednakowo prawdopodobnych zdarzeń elementarnych.',
    goldenRule: 'Gdy treść mówi „co najmniej jeden raz”, ZAWSZE opłaca się policzyć zdarzenie przeciwne: $P(A) = 1 - P(A\').$',
    ckeTrap: 'Prawdopodobieństwo NIGDY nie może przekroczyć $1$ ani być mniejsze od $0$!',
    keywords: ['prawdopodobieństwo', 'omega', 'zdarzenie przeciwne', 'drzewo'],
    cke_page: 'str. 28',
    pageNumber: 28
  },
  {
    id: 'f-stat-srednia',
    topicId: 'prawdopodobienstwo',
    topicName: 'Kombinatoryka i Statystyka',
    title: 'Średnia arytmetyczna i mediana',
    formula: '\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}',
    subFormulas: [
      { label: 'Średnia arytmetyczna', formula: '\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}' },
      { label: 'Mediana dla n nieparzystego', formula: 'M = x_{\\frac{n+1}{2}}' },
      { label: 'Mediana dla n parzystego', formula: 'M = \\frac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2}' }
    ],
    explanation: 'Jeśli liczba danych $n$ jest nieparzysta, mediana to element środkowy. Jeśli parzysta, to średnia dwóch środkowych.',
    goldenRule: 'ZANIM wyznaczysz medianę, MUSISZ uporządkować liczby rosnąco!',
    ckeTrap: 'Wyznaczenie mediany z nieposortowanego zestawu liczb to najczęstszy błąd maturzystów.',
    keywords: ['średnia', 'mediana', 'statystyka', 'wartość środkowa'],
    cke_page: 'str. 29',
    pageNumber: 29
  }
];
