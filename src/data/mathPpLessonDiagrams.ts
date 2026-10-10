import type { MathDiagramData } from '../components/MathDiagram';

/**
 * Schematy do pigułek wiedzy kursu matematyki PP, których nie było w rejestrze (mathVisualRegistry).
 * Klucz `pp-...` jest przypisywany do lekcji w MATH_PP_LESSON_VISUALS.
 * Liczby na rysunkach są zgodne z przykładem rozwiązanym w pigułce danej lekcji tam, gdzie to możliwe.
 */

const AMBER = '#FFB800';
const SKY = '#38BDF8';
const GREEN = '#10B981';
const RED = '#F43F5E';
const SLATE = '#94A3B8';

// Górna połowa okręgu jednostkowego jako łamana (kąty co 6°)
const unitSemicircle = Array.from({ length: 30 }, (_, i) => {
  const a = (i * 6 * Math.PI) / 180;
  const b = ((i + 1) * 6 * Math.PI) / 180;
  return {
    from: [Math.cos(a), Math.sin(a)] as [number, number],
    to: [Math.cos(b), Math.sin(b)] as [number, number],
    color: SLATE,
    strokeWidth: 2
  };
});

const C30 = Math.sqrt(3) / 2;

export const MATH_PP_NEW_DIAGRAMS: Record<string, MathDiagramData> = {
  // 4.4 Przesunięcia wykresów
  'pp-shift': {
    type: 'PLOT',
    title: 'Przesunięcie wykresu: $g(x) = f(x - 3) + 1$',
    formulaBadge: '$f(x - p) + q:\\ p = 3 \\text{ w prawo},\\ q = 1 \\text{ w górę}$',
    caption: 'Każdy punkt wykresu $f$ przesuwa się o $3$ w prawo i o $1$ w górę. Punkt $(0, 0)$ przechodzi na $(3, 1)$.',
    plotData: {
      xRange: [-3.5, 6.5],
      yRange: [-1.5, 5.5],
      gridStep: 1,
      segments: [
        { from: [-3, 3], to: [0, 0], color: SLATE, strokeWidth: 3 },
        { from: [0, 0], to: [3, 3], color: SLATE, strokeWidth: 3 },
        { from: [0, 4], to: [3, 1], color: AMBER, strokeWidth: 3.5 },
        { from: [3, 1], to: [6, 4], color: AMBER, strokeWidth: 3.5 }
      ],
      vectors: [{ tail: [0, 0], tip: [3, 1], color: SKY, weight: 2.5 }],
      points: [
        { x: 0, y: 0, dot: 'filled', color: SLATE, label: '(0, 0)', attach: 's' },
        { x: 3, y: 1, dot: 'filled', color: AMBER, label: '(3, 1)', attach: 's' }
      ],
      labels: [
        { x: -2.4, y: 3.4, text: 'y = f(x)', color: SLATE, attach: 'n' },
        { x: 5.2, y: 4.4, text: 'y = f(x − 3) + 1', color: AMBER, attach: 'n' }
      ]
    },
    metrics: [
      { label: 'f(x − p)', value: 'o $p$ wzdłuż osi $Ox$ (w prawo dla $p > 0$)', color: SKY },
      { label: 'f(x) + q', value: 'o $q$ wzdłuż osi $Oy$ (w górę dla $q > 0$)', color: AMBER },
      { label: 'Uwaga na znak', value: '$f(x + 3)$ to ruch w LEWO', color: RED }
    ]
  },

  // 4.5 Funkcja wykładnicza
  'pp-exponential': {
    type: 'PLOT',
    title: 'Funkcja wykładnicza $f(x) = 2^x$',
    formulaBadge: '$f(x) = a^x,\\quad a > 1 \\text{ – rośnie},\\quad 0 < a < 1 \\text{ – maleje}$',
    caption: 'Krok o $1$ w prawo to pomnożenie wartości przez $2$. Wykres zawsze przechodzi przez punkt $(0, 1)$ i leży nad osią $Ox$.',
    plotData: {
      xRange: [-3.5, 3.5],
      yRange: [-1, 9],
      gridStep: 1,
      fn: (x: number) => Math.pow(2, x),
      fnColor: AMBER,
      points: [
        { x: -1, y: 0.5, dot: 'filled', color: SKY, label: '(−1, ½)', attach: 'nw' },
        { x: 0, y: 1, dot: 'filled', color: GREEN, label: '(0, 1)', attach: 'nw' },
        { x: 1, y: 2, dot: 'filled', color: SKY, label: '(1, 2)', attach: 'se' },
        { x: 2, y: 4, dot: 'filled', color: SKY, label: '(2, 4)', attach: 'se' },
        { x: 3, y: 8, dot: 'filled', color: SKY, label: '(3, 8)', attach: 'w' }
      ]
    },
    metrics: [
      { label: 'Zawsze', value: '$a^0 = 1$, więc wykres przechodzi przez $(0, 1)$', color: GREEN },
      { label: 'Wartości', value: 'tylko dodatnie: $a^x > 0$', color: SKY },
      { label: 'Punkt na wykresie', value: '$(2, 9)$ na $y = a^x$ daje $a^2 = 9$, czyli $a = 3$', color: AMBER }
    ]
  },

  // 5.4 Interpretacja geometryczna układu równań
  'pp-linear-system': {
    type: 'PLOT',
    title: 'Układ równań to dwie proste',
    formulaBadge: '$\\text{rozwiązań: } 1,\\ 0 \\text{ albo nieskończenie wiele}$',
    caption: 'Rozwiązanie układu to punkt wspólny prostych. Proste przecinają się w jednym punkcie, są równoległe i różne albo się pokrywają.',
    plotData: {
      panels: [
        {
          title: 'Przecinają się',
          badge: '1 rozwiązanie',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40',
          subtitle: 'Układ oznaczony: (1, 2)',
          plot: {
            xRange: [-3, 4],
            yRange: [-2, 5],
            gridStep: 1,
            lines: [
              { slope: 1, intercept: 1, color: SKY, label: 'y = x + 1' },
              { slope: -1, intercept: 3, color: AMBER, label: 'y = −x + 3' }
            ],
            points: [{ x: 1, y: 2, dot: 'filled', color: GREEN, label: '(1, 2)', attach: 'e' }]
          }
        },
        {
          title: 'Równoległe i różne',
          badge: '0 rozwiązań',
          badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-400/40',
          subtitle: 'Układ sprzeczny',
          plot: {
            xRange: [-3, 4],
            yRange: [-2, 5],
            gridStep: 1,
            lines: [
              { slope: 1, intercept: 1, color: SKY, label: 'y = x + 1' },
              { slope: 1, intercept: -2, color: AMBER, label: 'y = x − 2' }
            ]
          }
        },
        {
          title: 'Pokrywają się',
          badge: 'nieskończenie wiele',
          badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-400/40',
          subtitle: 'Układ nieoznaczony',
          plot: {
            xRange: [-3, 4],
            yRange: [-2, 5],
            gridStep: 1,
            lines: [{ slope: 1, intercept: 1, color: GREEN, label: 'y = x + 1 i 2y = 2x + 2' }]
          }
        }
      ]
    }
  },

  // 6.1 Trzy postacie wzoru funkcji kwadratowej
  'pp-quadratic-forms': {
    type: 'PLOT',
    title: 'Jedna parabola, trzy postacie wzoru',
    formulaBadge: '$x^2 - 2x - 3 = (x - 1)^2 - 4 = (x + 1)(x - 3)$',
    caption: 'Postać ogólna pokazuje punkt $(0, c)$, kanoniczna – wierzchołek $W = (p, q)$, iloczynowa – miejsca zerowe $x_1$ i $x_2$.',
    plotData: {
      xRange: [-3.5, 5.5],
      yRange: [-5, 5],
      gridStep: 1,
      parabola: { a: 1, p: 1, q: -4, color: AMBER },
      axisOfSymmetry: 1,
      points: [
        { x: -1, y: 0, dot: 'filled', color: GREEN, label: 'x₁ = −1', attach: 'nw' },
        { x: 3, y: 0, dot: 'filled', color: GREEN, label: 'x₂ = 3', attach: 'ne' },
        { x: 1, y: -4, dot: 'filled', color: SKY, label: 'W(1, −4)', attach: 's' },
        { x: 0, y: -3, dot: 'filled', color: RED, label: '(0, −3)', attach: 'w' }
      ]
    },
    metrics: [
      { label: 'Ogólna', value: '$x^2 - 2x - 3$: przecięcie z $Oy$ w $(0, -3)$', color: RED },
      { label: 'Kanoniczna', value: '$(x - 1)^2 - 4$: wierzchołek $(1, -4)$', color: SKY },
      { label: 'Iloczynowa', value: '$(x + 1)(x - 3)$: miejsca zerowe $-1$ i $3$', color: GREEN }
    ]
  },

  // 6.4 Wartość największa i najmniejsza w przedziale
  'pp-quadratic-interval': {
    type: 'PLOT',
    title: 'Największa i najmniejsza wartość w przedziale $\\langle 0, 4 \\rangle$',
    formulaBadge: '$f(x) = -x^2 + 2x + 3,\\quad p = 1 \\in \\langle 0, 4 \\rangle$',
    caption: 'Wierzchołek leży w przedziale, więc porównujesz trzy liczby: $f(0) = 3$, $f(1) = 4$ i $f(4) = -5$.',
    plotData: {
      xRange: [-2.5, 5.5],
      yRange: [-6, 5],
      gridStep: 1,
      parabola: { a: -1, p: 1, q: 4, color: SLATE },
      segments: [
        { from: [0, 0], to: [4, 0], color: SKY, strokeWidth: 5 },
        { from: [0, 0], to: [0, 3], color: SKY, strokeWidth: 1.5, dashed: true },
        { from: [4, 0], to: [4, -5], color: SKY, strokeWidth: 1.5, dashed: true }
      ],
      points: [
        { x: 0, y: 3, dot: 'filled', color: SKY, label: 'f(0) = 3', attach: 'nw' },
        { x: 1, y: 4, dot: 'filled', color: GREEN, label: 'największa: f(1) = 4', attach: 'n' },
        { x: 4, y: -5, dot: 'filled', color: RED, label: 'najmniejsza: f(4) = −5', attach: 'w' }
      ]
    },
    metrics: [
      { label: 'Wierzchołek w przedziale', value: 'porównaj $f(A)$, $f(B)$ i $f(p)$', color: GREEN },
      { label: 'Wierzchołek poza przedziałem', value: 'porównaj tylko $f(A)$ i $f(B)$', color: RED }
    ]
  },

  // 7.2 Ciąg arytmetyczny
  'pp-arithmetic-sequence': {
    type: 'PLOT',
    title: 'Ciąg arytmetyczny: stały krok $r$',
    formulaBadge: '$a_n = a_1 + (n - 1)r$',
    caption: 'Wyrazy ciągu $1, 3, 5, 7, 9$ leżą na jednej prostej: każdy kolejny jest większy o $r = 2$.',
    plotData: {
      xRange: [-0.5, 6.5],
      yRange: [-1, 10.5],
      gridStep: 1,
      segments: [
        { from: [1, 1], to: [5, 9], color: SLATE, strokeWidth: 1.5, dashed: true },
        { from: [3, 5], to: [4, 5], color: SKY, strokeWidth: 2 },
        { from: [4, 5], to: [4, 7], color: SKY, strokeWidth: 2 }
      ],
      points: [
        { x: 1, y: 1, dot: 'filled', color: AMBER, label: 'a₁ = 1', attach: 'se' },
        { x: 2, y: 3, dot: 'filled', color: AMBER, label: 'a₂ = 3', attach: 'se' },
        { x: 3, y: 5, dot: 'filled', color: AMBER, label: 'a₃ = 5', attach: 'nw' },
        { x: 4, y: 7, dot: 'filled', color: AMBER, label: 'a₄ = 7', attach: 'nw' },
        { x: 5, y: 9, dot: 'filled', color: AMBER, label: 'a₅ = 9', attach: 'nw' }
      ],
      labels: [{ x: 4.2, y: 6, text: '+ r = 2', color: SKY, attach: 'e' }]
    },
    metrics: [
      { label: 'Różnica', value: '$r = a_{n+1} - a_n$', color: SKY },
      { label: 'Dziesiąty wyraz', value: '$a_{10} = a_1 + 9r$ (dziewięć kroków, nie dziesięć)', color: RED }
    ]
  },

  // 7.4 Ciąg geometryczny
  'pp-geometric-sequence': {
    type: 'PLOT',
    title: 'Ciąg geometryczny: stały mnożnik $q$',
    formulaBadge: '$a_n = a_1 \\cdot q^{\\,n-1}$',
    caption: 'Wyrazy ciągu $1, 2, 4, 8$: każdy kolejny jest $q = 2$ razy większy, więc odstępy rosną coraz szybciej.',
    plotData: {
      xRange: [-0.5, 5.5],
      yRange: [-1, 9.5],
      gridStep: 1,
      segments: [
        { from: [1, 1], to: [2, 2], color: SLATE, strokeWidth: 1.5, dashed: true },
        { from: [2, 2], to: [3, 4], color: SLATE, strokeWidth: 1.5, dashed: true },
        { from: [3, 4], to: [4, 8], color: SLATE, strokeWidth: 1.5, dashed: true }
      ],
      points: [
        { x: 1, y: 1, dot: 'filled', color: AMBER, label: 'a₁ = 1', attach: 'se' },
        { x: 2, y: 2, dot: 'filled', color: AMBER, label: 'a₂ = 2', attach: 'se' },
        { x: 3, y: 4, dot: 'filled', color: AMBER, label: 'a₃ = 4', attach: 'se' },
        { x: 4, y: 8, dot: 'filled', color: AMBER, label: 'a₄ = 8', attach: 'w' }
      ],
      labels: [{ x: 3.6, y: 6, text: '· q = 2', color: SKY, attach: 'e' }]
    },
    metrics: [
      { label: 'Iloraz', value: '$q = \\frac{a_{n+1}}{a_n}$ – dzielisz, nie odejmujesz', color: SKY },
      { label: 'Dla ciągu 2, 6, 18', value: '$q = 3$, a nie $4$', color: RED }
    ]
  },

  // 8.2 Kąty 30°, 45°, 60°
  'pp-special-triangles': {
    type: 'TRIGONOMETRY',
    title: 'Skąd się biorą wartości dla $30^\\circ$, $45^\\circ$ i $60^\\circ$',
    formulaBadge: '$a,\\ a\\sqrt{3},\\ 2a \\quad \\text{oraz} \\quad a,\\ a,\\ a\\sqrt{2}$',
    caption: 'Po lewej połowa trójkąta równobocznego, po prawej połowa kwadratu. Z tych dwóch trójkątów odczytasz każdą wartość z tabeli.',
    width: 500,
    height: 260,
    polygons: [
      { points: [[50, 210], [137, 210], [137, 60]], fill: 'rgba(56, 189, 248, 0.06)', stroke: SKY, strokeWidth: 2.5 },
      { points: [[290, 210], [440, 210], [440, 60]], fill: 'rgba(255, 184, 0, 0.06)', stroke: AMBER, strokeWidth: 2.5 },
      { points: [[125, 210], [125, 198], [137, 198], [137, 210]], fill: 'none', stroke: SLATE, strokeWidth: 1.5 },
      { points: [[428, 210], [428, 198], [440, 198], [440, 210]], fill: 'none', stroke: SLATE, strokeWidth: 1.5 }
    ],
    labels: [
      { x: 93, y: 232, text: 'a', color: SKY, fontSize: 15, anchor: 'middle' },
      { x: 158, y: 140, text: 'a√3', color: SKY, fontSize: 15, anchor: 'start' },
      { x: 70, y: 125, text: '2a', color: SKY, fontSize: 15, anchor: 'end' },
      { x: 76, y: 203, text: '60°', color: GREEN, fontSize: 13, anchor: 'middle' },
      { x: 127, y: 100, text: '30°', color: GREEN, fontSize: 13, anchor: 'middle' },
      { x: 365, y: 232, text: 'a', color: AMBER, fontSize: 15, anchor: 'middle' },
      { x: 458, y: 140, text: 'a', color: AMBER, fontSize: 15, anchor: 'start' },
      { x: 345, y: 125, text: 'a√2', color: AMBER, fontSize: 15, anchor: 'end' },
      { x: 330, y: 203, text: '45°', color: GREEN, fontSize: 13, anchor: 'middle' },
      { x: 428, y: 105, text: '45°', color: GREEN, fontSize: 13, anchor: 'middle' }
    ],
    metrics: [
      { label: 'Z lewego trójkąta', value: '$\\sin 30^\\circ = \\frac{a}{2a} = \\frac{1}{2},\\quad \\sin 60^\\circ = \\frac{a\\sqrt{3}}{2a} = \\frac{\\sqrt{3}}{2}$', color: SKY },
      { label: 'Z prawego trójkąta', value: '$\\sin 45^\\circ = \\frac{a}{a\\sqrt{2}} = \\frac{\\sqrt{2}}{2},\\quad \\operatorname{tg} 45^\\circ = 1$', color: AMBER }
    ]
  },

  // 8.4 Kąty od 0° do 180°
  'pp-obtuse-angle': {
    type: 'PLOT',
    title: 'Kąt rozwarty: ten sam sinus, przeciwny cosinus',
    formulaBadge: '$\\sin(180^\\circ - \\alpha) = \\sin\\alpha,\\quad \\cos(180^\\circ - \\alpha) = -\\cos\\alpha$',
    caption: 'Punkty dla kątów $30^\\circ$ i $150^\\circ$ leżą na tej samej wysokości (sinus), ale po przeciwnych stronach osi $Oy$ (cosinus).',
    plotData: {
      xRange: [-1.5, 1.5],
      yRange: [-0.4, 1.4],
      gridStep: 0.5,
      segments: [
        ...unitSemicircle,
        { from: [0, 0], to: [C30, 0.5], color: SKY, strokeWidth: 3 },
        { from: [0, 0], to: [-C30, 0.5], color: AMBER, strokeWidth: 3 },
        { from: [-C30, 0.5], to: [C30, 0.5], color: GREEN, strokeWidth: 1.5, dashed: true },
        { from: [C30, 0], to: [C30, 0.5], color: SKY, strokeWidth: 1.5, dashed: true },
        { from: [-C30, 0], to: [-C30, 0.5], color: AMBER, strokeWidth: 1.5, dashed: true }
      ],
      points: [
        { x: C30, y: 0.5, dot: 'filled', color: SKY, label: '30°', attach: 'ne' },
        { x: -C30, y: 0.5, dot: 'filled', color: AMBER, label: '150°', attach: 'nw' }
      ],
      labels: [{ x: 0, y: 0.62, text: 'ta sama wysokość: sin = ½', color: GREEN, attach: 'n' }]
    },
    metrics: [
      { label: 'Sinus', value: '$\\sin 150^\\circ = \\sin 30^\\circ = \\frac{1}{2}$', color: GREEN },
      { label: 'Cosinus', value: '$\\cos 150^\\circ = -\\cos 30^\\circ = -\\frac{\\sqrt{3}}{2}$', color: AMBER },
      { label: 'Kąt rozwarty', value: 'cosinus i tangens są ujemne', color: RED }
    ]
  },

  // 8.5 Pole trójkąta z sinusem i twierdzenie cosinusów
  'pp-sas-triangle': {
    type: 'TRIGONOMETRY',
    title: 'Dwa boki i kąt między nimi',
    formulaBadge: '$P = \\frac{1}{2}ab\\sin\\gamma,\\quad c^2 = a^2 + b^2 - 2ab\\cos\\gamma$',
    caption: 'Kąt $\\gamma$ leży między bokami $a$ i $b$, a bok $c$ naprzeciw niego. Oba wzory wymagają właśnie takiego układu.',
    width: 500,
    height: 250,
    polygons: [{ points: [[90, 200], [400, 200], [190, 60]], fill: 'rgba(255, 184, 0, 0.06)', stroke: AMBER, strokeWidth: 2.5 }],
    segments: [
      { from: [90, 200], to: [400, 200], color: SKY, strokeWidth: 3 },
      { from: [90, 200], to: [190, 60], color: GREEN, strokeWidth: 3 },
      { from: [190, 60], to: [400, 200], color: RED, strokeWidth: 3 }
    ],
    labels: [
      { x: 245, y: 224, text: 'a', color: SKY, fontSize: 16, anchor: 'middle' },
      { x: 122, y: 122, text: 'b', color: GREEN, fontSize: 16, anchor: 'end' },
      { x: 312, y: 118, text: 'c', color: RED, fontSize: 16, anchor: 'start' },
      { x: 130, y: 190, text: 'γ', color: AMBER, fontSize: 16, anchor: 'middle' }
    ],
    metrics: [
      { label: 'Pole', value: '$P = \\frac{1}{2}ab\\sin\\gamma$', color: GREEN },
      { label: 'Trzeci bok', value: '$c^2 = a^2 + b^2 - 2ab\\cos\\gamma$', color: RED },
      { label: 'Dla $\\gamma = 90^\\circ$', value: '$\\cos 90^\\circ = 0$ – zostaje twierdzenie Pitagorasa', color: SKY }
    ]
  },

  // 10.5 Symetrie w układzie współrzędnych
  'pp-symmetry': {
    type: 'PLOT',
    title: 'Trzy symetrie punktu $P = (3, 2)$',
    formulaBadge: '$Ox: (x, -y),\\quad Oy: (-x, y),\\quad (0,0): (-x, -y)$',
    caption: 'Symetria względem osi $Ox$ zmienia znak $y$, względem osi $Oy$ – znak $x$, a względem początku układu – oba znaki.',
    plotData: {
      xRange: [-4.5, 4.5],
      yRange: [-3.5, 3.5],
      gridStep: 1,
      segments: [
        { from: [3, 2], to: [3, -2], color: SKY, strokeWidth: 1.5, dashed: true },
        { from: [3, 2], to: [-3, 2], color: GREEN, strokeWidth: 1.5, dashed: true },
        { from: [3, 2], to: [-3, -2], color: RED, strokeWidth: 1.5, dashed: true }
      ],
      points: [
        { x: 3, y: 2, dot: 'filled', color: AMBER, label: 'P(3, 2)', attach: 'ne' },
        { x: 3, y: -2, dot: 'filled', color: SKY, label: '(3, −2)', attach: 'se' },
        { x: -3, y: 2, dot: 'filled', color: GREEN, label: '(−3, 2)', attach: 'nw' },
        { x: -3, y: -2, dot: 'filled', color: RED, label: '(−3, −2)', attach: 'sw' }
      ]
    },
    metrics: [
      { label: 'Względem osi Ox', value: '$(3, 2) \\to (3, -2)$', color: SKY },
      { label: 'Względem osi Oy', value: '$(3, 2) \\to (-3, 2)$', color: GREEN },
      { label: 'Względem punktu (0, 0)', value: '$(3, 2) \\to (-3, -2)$', color: RED }
    ]
  },

  // 11.1 Graniastosłupy – sześcian z przekątnymi
  'pp-cube-diagonals': {
    type: 'STEREOMETRY_3D',
    title: 'Sześcian: przekątna ściany i przekątna bryły',
    formulaBadge: '$d_{\\text{ściany}} = a\\sqrt{2},\\quad d_{\\text{bryły}} = a\\sqrt{3}$',
    caption: 'Przekątna bryły, przekątna podstawy i krawędź boczna tworzą trójkąt prostokątny: $a^2 + (a\\sqrt{2})^2 = (a\\sqrt{3})^2$.',
    width: 500,
    height: 270,
    polygons: [{ points: [[140, 225], [350, 180], [350, 40]], fill: 'rgba(244, 63, 94, 0.08)', stroke: 'none' }],
    segments: [
      // ściana przednia
      { from: [140, 225], to: [280, 225], color: AMBER, strokeWidth: 2.5 },
      { from: [280, 225], to: [280, 85], color: AMBER, strokeWidth: 2.5 },
      { from: [280, 85], to: [140, 85], color: AMBER, strokeWidth: 2.5 },
      { from: [140, 85], to: [140, 225], color: AMBER, strokeWidth: 2.5 },
      // ściana tylna
      { from: [210, 180], to: [350, 180], color: AMBER, strokeWidth: 1.5, dashed: true },
      { from: [210, 180], to: [210, 40], color: AMBER, strokeWidth: 1.5, dashed: true },
      { from: [350, 180], to: [350, 40], color: GREEN, strokeWidth: 3 },
      { from: [210, 40], to: [350, 40], color: AMBER, strokeWidth: 2.5 },
      // krawędzie łączące
      { from: [140, 225], to: [210, 180], color: AMBER, strokeWidth: 1.5, dashed: true },
      { from: [280, 225], to: [350, 180], color: AMBER, strokeWidth: 2.5 },
      { from: [280, 85], to: [350, 40], color: AMBER, strokeWidth: 2.5 },
      { from: [140, 85], to: [210, 40], color: AMBER, strokeWidth: 2.5 },
      // przekątna podstawy i przekątna bryły
      { from: [140, 225], to: [350, 180], color: SKY, strokeWidth: 2.5, dashed: true },
      { from: [140, 225], to: [350, 40], color: RED, strokeWidth: 3 }
    ],
    labels: [
      { x: 210, y: 246, text: 'a', color: AMBER, fontSize: 15, anchor: 'middle' },
      { x: 364, y: 115, text: 'a', color: GREEN, fontSize: 15, anchor: 'start' },
      { x: 262, y: 216, text: 'a√2', color: SKY, fontSize: 14, anchor: 'middle' },
      { x: 222, y: 128, text: 'a√3', color: RED, fontSize: 14, anchor: 'end' }
    ],
    metrics: [
      { label: 'Objętość', value: '$V = P_p \\cdot h$, dla sześcianu $V = a^3$', color: AMBER },
      { label: 'Przekątna ściany', value: '$a\\sqrt{2}$', color: SKY },
      { label: 'Przekątna sześcianu', value: '$a\\sqrt{3}$', color: RED }
    ]
  },

  // 11.2 Ostrosłup prawidłowy czworokątny
  'pp-pyramid': {
    type: 'STEREOMETRY_3D',
    title: 'Ostrosłup prawidłowy czworokątny',
    formulaBadge: '$V = \\frac{1}{3} P_p \\cdot H,\\quad h_b^2 = H^2 + \\left(\\frac{a}{2}\\right)^2$',
    caption: 'Spodek wysokości $O$ leży w środku kwadratu. Wysokość $H$, połowa boku i wysokość ściany bocznej $h_b$ tworzą trójkąt prostokątny.',
    width: 500,
    height: 270,
    polygons: [{ points: [[250, 195], [210, 220], [250, 40]], fill: 'rgba(56, 189, 248, 0.10)', stroke: 'none' }],
    segments: [
      { from: [110, 220], to: [310, 220], color: AMBER, strokeWidth: 2.5 },
      { from: [310, 220], to: [390, 170], color: AMBER, strokeWidth: 2.5 },
      { from: [390, 170], to: [190, 170], color: AMBER, strokeWidth: 1.5, dashed: true },
      { from: [190, 170], to: [110, 220], color: AMBER, strokeWidth: 1.5, dashed: true },
      { from: [110, 220], to: [250, 40], color: AMBER, strokeWidth: 2.5 },
      { from: [310, 220], to: [250, 40], color: AMBER, strokeWidth: 2.5 },
      { from: [390, 170], to: [250, 40], color: AMBER, strokeWidth: 2.5 },
      { from: [190, 170], to: [250, 40], color: AMBER, strokeWidth: 1.5, dashed: true },
      { from: [250, 40], to: [250, 195], color: RED, strokeWidth: 2.5, dashed: true },
      { from: [250, 195], to: [210, 220], color: GREEN, strokeWidth: 2.5 },
      { from: [250, 40], to: [210, 220], color: SKY, strokeWidth: 2.5 }
    ],
    points: [
      { x: 250, y: 40, dot: 'filled', color: AMBER, label: 'S', labelPosition: 'top' },
      { x: 250, y: 195, dot: 'filled', color: RED, label: 'O', labelPosition: 'right' }
    ],
    labels: [
      { x: 262, y: 130, text: 'H', color: RED, fontSize: 15, anchor: 'start' },
      { x: 212, y: 130, text: 'h ściany', color: SKY, fontSize: 14, anchor: 'end' },
      { x: 236, y: 222, text: 'a/2', color: GREEN, fontSize: 13, anchor: 'middle' },
      { x: 150, y: 242, text: 'a', color: AMBER, fontSize: 15, anchor: 'middle' }
    ],
    metrics: [
      { label: 'Objętość', value: '$V = \\frac{1}{3} a^2 H$', color: RED },
      { label: 'Pole boczne', value: '$P_b = 4 \\cdot \\frac{1}{2} a \\cdot h_b$', color: SKY },
      { label: 'Przykład', value: '$a = 6$, $H = 4$: $h_b = 5$, $P_b = 60$', color: GREEN }
    ]
  },

  // 11.3 Kąty w bryłach
  'pp-solid-angles': {
    type: 'STEREOMETRY_3D',
    title: 'Dwa różne kąty w ostrosłupie',
    formulaBadge: '$\\operatorname{tg}\\alpha = \\frac{H}{a/2},\\quad \\operatorname{tg}\\beta = \\frac{H}{a\\sqrt{2}/2}$',
    caption: 'Kąt $\\alpha$ ściany bocznej opiera się na połowie boku podstawy, a kąt $\\beta$ krawędzi bocznej – na połowie przekątnej podstawy.',
    width: 500,
    height: 270,
    polygons: [
      { points: [[250, 195], [210, 220], [250, 40]], fill: 'rgba(56, 189, 248, 0.12)', stroke: 'none' },
      { points: [[250, 195], [390, 170], [250, 40]], fill: 'rgba(16, 185, 129, 0.12)', stroke: 'none' }
    ],
    segments: [
      { from: [110, 220], to: [310, 220], color: AMBER, strokeWidth: 2.5 },
      { from: [310, 220], to: [390, 170], color: AMBER, strokeWidth: 2.5 },
      { from: [390, 170], to: [190, 170], color: AMBER, strokeWidth: 1.5, dashed: true },
      { from: [190, 170], to: [110, 220], color: AMBER, strokeWidth: 1.5, dashed: true },
      { from: [110, 220], to: [250, 40], color: AMBER, strokeWidth: 2.5 },
      { from: [310, 220], to: [250, 40], color: AMBER, strokeWidth: 2.5 },
      { from: [190, 170], to: [250, 40], color: AMBER, strokeWidth: 1.5, dashed: true },
      { from: [250, 40], to: [250, 195], color: RED, strokeWidth: 2.5, dashed: true },
      { from: [250, 195], to: [210, 220], color: SKY, strokeWidth: 2.5 },
      { from: [250, 40], to: [210, 220], color: SKY, strokeWidth: 2.5 },
      { from: [250, 195], to: [390, 170], color: GREEN, strokeWidth: 2.5, dashed: true },
      { from: [390, 170], to: [250, 40], color: GREEN, strokeWidth: 3 }
    ],
    points: [
      { x: 250, y: 40, dot: 'filled', color: AMBER, label: 'S', labelPosition: 'top' },
      { x: 250, y: 195, dot: 'filled', color: RED, label: 'O', labelPosition: 'bottom' }
    ],
    labels: [
      { x: 262, y: 125, text: 'H', color: RED, fontSize: 15, anchor: 'start' },
      { x: 196, y: 214, text: 'α', color: SKY, fontSize: 16, anchor: 'end' },
      { x: 404, y: 172, text: 'β', color: GREEN, fontSize: 16, anchor: 'start' },
      { x: 232, y: 240, text: 'a/2', color: SKY, fontSize: 13, anchor: 'middle' },
      { x: 330, y: 198, text: 'a√2/2', color: GREEN, fontSize: 13, anchor: 'middle' }
    ],
    metrics: [
      { label: 'Kąt ściany bocznej α', value: 'trójkąt: $H$, $\\frac{a}{2}$, wysokość ściany', color: SKY },
      { label: 'Kąt krawędzi bocznej β', value: 'trójkąt: $H$, $\\frac{a\\sqrt{2}}{2}$, krawędź boczna', color: GREEN },
      { label: 'Przykład', value: '$a = 6$, $\\alpha = 60^\\circ$: $H = 3 \\cdot \\operatorname{tg} 60^\\circ = 3\\sqrt{3}$', color: RED }
    ]
  },

  // 11.5 Bryły podobne
  'pp-similar-solids': {
    type: 'STEREOMETRY_3D',
    title: 'Bryły podobne w skali $k = 2$',
    formulaBadge: '$\\text{długości} \\cdot k,\\quad \\text{pola} \\cdot k^2,\\quad \\text{objętości} \\cdot k^3$',
    caption: 'Krawędź dwa razy dłuższa to ściana cztery razy większa i osiem razy większa objętość – w dużym sześcianie mieści się $8$ małych.',
    width: 500,
    height: 260,
    segments: [
      // mały sześcian (krawędź 60)
      { from: [60, 220], to: [120, 220], color: SKY, strokeWidth: 2.5 },
      { from: [120, 220], to: [120, 160], color: SKY, strokeWidth: 2.5 },
      { from: [120, 160], to: [60, 160], color: SKY, strokeWidth: 2.5 },
      { from: [60, 160], to: [60, 220], color: SKY, strokeWidth: 2.5 },
      { from: [60, 160], to: [90, 140], color: SKY, strokeWidth: 2.5 },
      { from: [120, 160], to: [150, 140], color: SKY, strokeWidth: 2.5 },
      { from: [120, 220], to: [150, 200], color: SKY, strokeWidth: 2.5 },
      { from: [90, 140], to: [150, 140], color: SKY, strokeWidth: 2.5 },
      { from: [150, 140], to: [150, 200], color: SKY, strokeWidth: 2.5 },
      // duży sześcian (krawędź 120)
      { from: [240, 220], to: [360, 220], color: AMBER, strokeWidth: 2.5 },
      { from: [360, 220], to: [360, 100], color: AMBER, strokeWidth: 2.5 },
      { from: [360, 100], to: [240, 100], color: AMBER, strokeWidth: 2.5 },
      { from: [240, 100], to: [240, 220], color: AMBER, strokeWidth: 2.5 },
      { from: [240, 100], to: [300, 60], color: AMBER, strokeWidth: 2.5 },
      { from: [360, 100], to: [420, 60], color: AMBER, strokeWidth: 2.5 },
      { from: [360, 220], to: [420, 180], color: AMBER, strokeWidth: 2.5 },
      { from: [300, 60], to: [420, 60], color: AMBER, strokeWidth: 2.5 },
      { from: [420, 60], to: [420, 180], color: AMBER, strokeWidth: 2.5 },
      // podział dużego sześcianu na 8 małych
      { from: [300, 220], to: [300, 100], color: AMBER, strokeWidth: 1, dashed: true },
      { from: [240, 160], to: [360, 160], color: AMBER, strokeWidth: 1, dashed: true },
      { from: [300, 100], to: [360, 60], color: AMBER, strokeWidth: 1, dashed: true },
      { from: [270, 80], to: [390, 80], color: AMBER, strokeWidth: 1, dashed: true },
      { from: [360, 160], to: [420, 120], color: AMBER, strokeWidth: 1, dashed: true },
      { from: [390, 200], to: [390, 80], color: AMBER, strokeWidth: 1, dashed: true }
    ],
    labels: [
      { x: 90, y: 242, text: 'a', color: SKY, fontSize: 15, anchor: 'middle' },
      { x: 300, y: 242, text: '2a', color: AMBER, fontSize: 15, anchor: 'middle' }
    ],
    metrics: [
      { label: 'Długości', value: '$k = 2$ razy większe', color: SKY },
      { label: 'Pola powierzchni', value: '$k^2 = 4$ razy większe', color: GREEN },
      { label: 'Objętości', value: '$k^3 = 8$ razy większe', color: RED }
    ]
  },

  // 13.4 Drzewo prawdopodobieństwa
  'pp-probability-tree': {
    type: 'INFOGRAPHIC',
    title: 'Drzewo: dwie kule bez zwracania (3 białe, 2 czarne)',
    formulaBadge: '$P(\\text{dwie białe}) = \\frac{3}{5} \\cdot \\frac{2}{4} = \\frac{3}{10}$',
    caption: 'Wzdłuż gałęzi mnożysz, a wyniki z różnych gałęzi dodajesz. Po pierwszym losowaniu w urnie zostają $4$ kule.',
    width: 500,
    height: 270,
    segments: [
      { from: [250, 35], to: [140, 115], color: SKY, strokeWidth: 2.5 },
      { from: [250, 35], to: [360, 115], color: SLATE, strokeWidth: 2.5 },
      { from: [140, 135], to: [80, 215], color: SKY, strokeWidth: 2.5 },
      { from: [140, 135], to: [200, 215], color: SLATE, strokeWidth: 2.5 },
      { from: [360, 135], to: [300, 215], color: SKY, strokeWidth: 2.5 },
      { from: [360, 135], to: [420, 215], color: SLATE, strokeWidth: 2.5 }
    ],
    points: [{ x: 250, y: 35, dot: 'filled', color: AMBER }],
    labels: [
      { x: 140, y: 130, text: 'B', color: SKY, fontSize: 16, fontWeight: 'bold', anchor: 'middle' },
      { x: 360, y: 130, text: 'C', color: SLATE, fontSize: 16, fontWeight: 'bold', anchor: 'middle' },
      { x: 80, y: 232, text: 'B', color: SKY, fontSize: 16, fontWeight: 'bold', anchor: 'middle' },
      { x: 200, y: 232, text: 'C', color: SLATE, fontSize: 16, fontWeight: 'bold', anchor: 'middle' },
      { x: 300, y: 232, text: 'B', color: SKY, fontSize: 16, fontWeight: 'bold', anchor: 'middle' },
      { x: 420, y: 232, text: 'C', color: SLATE, fontSize: 16, fontWeight: 'bold', anchor: 'middle' },
      { x: 180, y: 70, text: '3/5', color: AMBER, fontSize: 13, anchor: 'end' },
      { x: 320, y: 70, text: '2/5', color: AMBER, fontSize: 13, anchor: 'start' },
      { x: 98, y: 172, text: '2/4', color: AMBER, fontSize: 13, anchor: 'end' },
      { x: 182, y: 172, text: '2/4', color: AMBER, fontSize: 13, anchor: 'start' },
      { x: 318, y: 172, text: '3/4', color: AMBER, fontSize: 13, anchor: 'end' },
      { x: 402, y: 172, text: '1/4', color: AMBER, fontSize: 13, anchor: 'start' },
      { x: 80, y: 256, text: '3/10', color: GREEN, fontSize: 13, anchor: 'middle' },
      { x: 200, y: 256, text: '3/10', color: GREEN, fontSize: 13, anchor: 'middle' },
      { x: 300, y: 256, text: '3/10', color: GREEN, fontSize: 13, anchor: 'middle' },
      { x: 420, y: 256, text: '1/10', color: GREEN, fontSize: 13, anchor: 'middle' }
    ],
    metrics: [
      { label: 'Dwie białe', value: '$\\frac{3}{5} \\cdot \\frac{2}{4} = \\frac{3}{10}$', color: SKY },
      { label: 'Różne kolory (dwie gałęzie)', value: '$\\frac{3}{10} + \\frac{3}{10} = \\frac{3}{5}$', color: GREEN },
      { label: 'Kontrola', value: 'suma wszystkich gałęzi to $1$', color: AMBER }
    ]
  }
};
