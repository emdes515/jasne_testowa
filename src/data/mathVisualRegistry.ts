import { MathDiagramData } from '../components/MathDiagram';
import { PlotData } from '../components/MathPlot';
import { NumberLineData } from '../components/NumberLineDiagram';

// =========================================================================
// 1. PIGUŁKI WIEDZY - SCHEMATY SVG DO TEORII (KARTY WZORÓW I DEFINICJI)
// =========================================================================

export const THEORY_DIAGRAMS: Record<string, MathDiagramData> = {
  // Lekcja 3.1: Wartość bezwzględna - definicja geometryczna i odległość na osi (|x - a| = r)
  'lesson-3-1': {
    type: 'PLOT',
    title: 'Interpretacja geometryczna wartości bezwzględnej: $|x - a| = r$',
    formulaBadge: '$|x - a| = r \\implies x = a - r \\quad \\text{lub} \\quad x = a + r$',
    caption: 'Wartość bezwzględna $|x - a|$ to odległość liczby $x$ od punktu środkowego $a$. Odmierzamy promień $r$ symetrycznie w lewo i w prawo.',
    width: 540,
    height: 240,
    plotData: {
      xRange: [-3.5, 7.5],
      yRange: [-1.2, 2.5],
      gridStep: 1,
      hideYAxis: true,
      subdivisions: false,
      segments: [
        { from: [-1, 0], to: [5, 0], color: '#38BDF8', strokeWidth: 3.5, dashed: true }
      ],
      vectors: [
        { tail: [2, 0.75], tip: [-1, 0.75], color: '#38BDF8', weight: 2.5 },
        { tail: [2, 0.75], tip: [5, 0.75], color: '#38BDF8', weight: 2.5 }
      ],
      points: [
        { x: 2, y: 0, dot: 'filled', color: '#FFB800', label: 'a (środek)', attach: 's' },
        { x: -1, y: 0, dot: 'filled', color: '#10B981', label: 'a - r', attach: 's' },
        { x: 5, y: 0, dot: 'filled', color: '#10B981', label: 'a + r', attach: 's' }
      ],
      labels: [
        { x: 2, y: 1.8, text: '|x - a| = r  ->  odległość liczby x od punktu a wynosi r', color: '#FFB800', attach: 'n', fontSize: 12 },
        { x: 0.5, y: 1.05, text: 'odległość r (w lewo)', color: '#38BDF8', attach: 'n', fontSize: 11 },
        { x: 3.5, y: 1.05, text: 'odległość r (w prawo)', color: '#38BDF8', attach: 'n', fontSize: 11 }
      ]
    },
    grid: {
      minX: 40,
      maxX: 500,
      minY: 40,
      maxY: 200,
      xLines: [150, 210, 270, 330, 390],
      color: 'rgba(148, 163, 184, 0.08)'
    },
    segments: [
      { from: [40, 140], to: [500, 140], color: '#64748B', strokeWidth: 2 },
      { from: [490, 135], to: [500, 140], color: '#64748B', strokeWidth: 2 },
      { from: [490, 145], to: [500, 140], color: '#64748B', strokeWidth: 2 },
      { from: [150, 133], to: [150, 147], color: '#10B981', strokeWidth: 2 },
      { from: [270, 130], to: [270, 150], color: '#FFB800', strokeWidth: 2.5 },
      { from: [390, 133], to: [390, 147], color: '#10B981', strokeWidth: 2 }
    ],
    curves: [
      {
        quadratic: { start: [270, 126], control: [210, 72], end: [150, 126] },
        color: '#38BDF8',
        strokeWidth: 2.5,
        label: 'odległość r'
      },
      {
        quadratic: { start: [270, 126], control: [330, 72], end: [390, 126] },
        color: '#38BDF8',
        strokeWidth: 2.5,
        label: 'odległość r'
      }
    ],
    points: [
      { x: 270, y: 140, dot: 'filled', color: '#FFB800', label: 'a (środek)', labelPosition: 'bottom' },
      { x: 150, y: 140, dot: 'filled', color: '#10B981', label: 'a - r', labelPosition: 'bottom' },
      { x: 390, y: 140, dot: 'filled', color: '#10B981', label: 'a + r', labelPosition: 'bottom' }
    ],
    labels: [
      { x: 495, y: 125, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 210, y: 64, text: 'odległość r (w lewo)', color: '#38BDF8', fontSize: 12, fontWeight: '600' },
      { x: 330, y: 64, text: 'odległość r (w prawo)', color: '#38BDF8', fontSize: 12, fontWeight: '600' }
    ],
    metrics: [
      { label: 'Środek na osi', value: '$a$', color: '#FFB800' },
      { label: 'Promień / Odległość', value: '$r \\ge 0$', color: '#38BDF8' },
      { label: 'Rozwiązania równania', value: '$x_1 = a - r,\\; x_2 = a + r$', color: '#10B981' },
      { label: 'Pułapka znaku CKE', value: '$|x + 3| = r \\implies a = -3$', color: '#F43F5E' }
    ]
  },

  // Lekcja 3.2: Nierówności z wartością bezwzględną na osi liczbowej (|x - a| < r vs |x - a| >= r)
  'lesson-3-2': {
    type: 'PLOT',
    title: 'Nierówność z wartością bezwzględną: $|x - a| < r$ vs $|x - a| \\ge r$',
    formulaBadge: '$|x - a| < r \\implies x \\in (a - r, a + r) \\quad \\text{vs} \\quad |x - a| \\ge r \\implies x \\in (-\\infty, a-r\\rangle \\cup \\langle a+r, +\\infty)$',
    caption: 'Wartość bezwzględna $|x - a|$ to geometryczna odległość liczby $x$ od punktu środkowego $a$. Znak $<$ oznacza wnętrze przedziału, a znak $\\ge$ oznacza dwa rozbieżne promienie na zewnątrz.',
    width: 540,
    height: 250,
    plotData: {
      panels: [
        {
          title: 'Nierówność: |x - a| < r  (wnętrze przedziału)',
          badge: 'Odległość < r',
          badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-400/40',
          plot: {
            xRange: [-3, 7],
            yRange: [-1.2, 2.0],
            gridStep: 1,
            hideYAxis: true,
            subdivisions: false,
            segments: [
              { from: [-1, 0], to: [5, 0], color: '#38BDF8', strokeWidth: 5.5 }
            ],
            points: [
              { x: -1, y: 0, dot: 'hollow', color: '#38BDF8', label: 'a - r', attach: 's' },
              { x: 2, y: 0, dot: 'filled', color: '#FFB800', label: 'a (środek)', attach: 's' },
              { x: 5, y: 0, dot: 'hollow', color: '#38BDF8', label: 'a + r', attach: 's' }
            ],
            labels: [
              { x: 2, y: 1.25, text: '|x - a| < r  ->  x ∈ (a - r, a + r)', color: '#38BDF8', attach: 'n', fontSize: 12 }
            ]
          },
          subtitle: 'Kółka otwarte, wnętrze przedziału o promieniu r'
        },
        {
          title: 'Nierówność: |x - a| ≥ r  (dwa promienie na zewnątrz)',
          badge: 'Odległość ≥ r',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40',
          plot: {
            xRange: [-3, 7],
            yRange: [-1.2, 2.0],
            gridStep: 1,
            hideYAxis: true,
            subdivisions: false,
            segments: [
              { from: [-2.6, 0], to: [-1, 0], color: '#10B981', strokeWidth: 5.5 },
              { from: [5, 0], to: [6.6, 0], color: '#10B981', strokeWidth: 5.5 }
            ],
            vectors: [
              { tail: [-1, 0], tip: [-2.8, 0], color: '#10B981', weight: 3.5 },
              { tail: [5, 0], tip: [6.8, 0], color: '#10B981', weight: 3.5 }
            ],
            points: [
              { x: -1, y: 0, dot: 'filled', color: '#10B981', label: 'a - r', attach: 's' },
              { x: 2, y: 0, dot: 'hollow', color: '#64748B', label: 'a (środek)', attach: 's' },
              { x: 5, y: 0, dot: 'filled', color: '#10B981', label: 'a + r', attach: 's' }
            ],
            labels: [
              { x: 2, y: 1.25, text: '|x - a| ≥ r  ->  x ∈ (-∞, a-r⟩ ∪ ⟨a+r, +∞)', color: '#10B981', attach: 'n', fontSize: 12 }
            ]
          },
          subtitle: 'Kółka zamalowane, dwa rozbieżne promienie na zewnątrz'
        }
      ]
    },
    segments: [
      { from: [40, 75], to: [500, 75], color: '#64748B', strokeWidth: 1.5 },
      { from: [180, 75], to: [360, 75], color: '#38BDF8', strokeWidth: 4 },
      { from: [40, 165], to: [500, 165], color: '#64748B', strokeWidth: 1.5 },
      { from: [40, 165], to: [180, 165], color: '#10B981', strokeWidth: 4 },
      { from: [360, 165], to: [500, 165], color: '#10B981', strokeWidth: 4 }
    ],
    points: [
      { x: 180, y: 75, dot: 'hollow', color: '#38BDF8', label: 'a - r', labelPosition: 'bottom' },
      { x: 270, y: 75, dot: 'filled', color: '#FFB800', label: 'a (środek)', labelPosition: 'bottom' },
      { x: 360, y: 75, dot: 'hollow', color: '#38BDF8', label: 'a + r', labelPosition: 'bottom' },
      { x: 180, y: 165, dot: 'filled', color: '#10B981', label: 'a - r', labelPosition: 'bottom' },
      { x: 270, y: 165, dot: 'hollow', color: '#64748B', label: 'a', labelPosition: 'bottom' },
      { x: 360, y: 165, dot: 'filled', color: '#10B981', label: 'a + r', labelPosition: 'bottom' }
    ],
    labels: [
      { x: 45, y: 45, text: '|x - a| < r  ->  odległość < r (wnętrze, kółka otwarte)', color: '#38BDF8', fontSize: 12, fontWeight: '700', anchor: 'start' },
      { x: 45, y: 135, text: '|x - a| ≥ r  ->  odległość ≥ r (dwa promienie, kółka domknięte)', color: '#10B981', fontSize: 12, fontWeight: '700', anchor: 'start' },
      { x: 505, y: 75, text: 'x', color: '#94A3B8', fontSize: 12, fontWeight: '700', anchor: 'start' },
      { x: 505, y: 165, text: 'x', color: '#94A3B8', fontSize: 12, fontWeight: '700', anchor: 'start' }
    ],
    metrics: [
      { label: 'Znak < (wnętrze)', value: '$x \\in (a - r, a + r)$', color: '#38BDF8' },
      { label: 'Znak ≥ (zewnętrze)', value: '$x \\in (-\\infty, a-r\\rangle \\cup \\langle a+r, +\\infty)$', color: '#10B981' },
      { label: 'Środek symetrii', value: '$a$', color: '#FFB800' },
      { label: 'Promień odległości', value: '$r > 0$', color: '#38BDF8' }
    ]
  },

  // Lekcja 5.1: Rozwiązywanie nierówności liniowych i reguła zmiany zwrotu
  'lesson-5-1': {
    type: 'PLOT',
    title: 'Reguła zmiany zwrotu: mnożenie i dzielenie przez liczbę ujemną',
    formulaBadge: '$-2x \\le 6 \\quad \\xrightarrow{\\div (-2)} \\quad x \\ge -3$',
    caption: 'Gdy mnożysz lub dzielisz obie strony nierówności przez liczbę ujemną, natychmiast odwracasz zwrot znaku na przeciwny ($\\le$ przechodzi w $\\ge$).',
    width: 540,
    height: 240,
    plotData: {
      xRange: [-5.2, 4.2],
      yRange: [-1.2, 2.6],
      gridStep: 1,
      hideYAxis: true,
      subdivisions: false,
      polygons: [
        {
          points: [[-3, 0], [-3, 1], [3.9, 1], [3.9, 0]],
          color: '#10B981',
          fillOpacity: 0.2
        }
      ],
      segments: [
        // Słupek od x = -3 do y = 1
        { from: [-3, 0], to: [-3, 1], color: '#10B981', strokeWidth: 2.5 },
        // Dach w prawo ku +nieskończoności
        { from: [-3, 1], to: [3.8, 1], color: '#10B981', strokeWidth: 2.5 },
        // Podświetlenie osi OX dla x >= -3
        { from: [-3, 0], to: [4.0, 0], color: '#10B981', strokeWidth: 5.5 }
      ],
      vectors: [
        { tail: [3.3, 1], tip: [4.0, 1], color: '#10B981', weight: 2.5 }
      ],
      points: [
        { x: -3, y: 1, dot: 'filled', color: '#10B981', label: 'x = -3 (domknięte)', attach: 'n' },
        { x: -3, y: 0, dot: 'filled', color: '#10B981', label: '-3', attach: 's' }
      ],
      labels: [
        { x: 0, y: 2.05, text: '-2x ≤ 6   ->   (: -2)   ->   x ≥ -3', color: '#FFB800', attach: 'n', fontSize: 13 },
        { x: 0, y: 1.55, text: 'Wskazówka: Dzielenie przez liczbę ujemną odwraca zwrot ( ≤ na ≥ )', color: '#38BDF8', attach: 'n', fontSize: 11 },
        { x: 4.1, y: -0.35, text: 'x', color: '#94A3B8', attach: 's', fontSize: 13 }
      ]
    },
    polygons: [
      {
        points: [[200, 150], [200, 105], [495, 105], [495, 150]],
        fill: 'rgba(16, 185, 129, 0.12)',
        stroke: 'none'
      }
    ],
    segments: [
      { from: [40, 150], to: [500, 150], color: '#64748B', strokeWidth: 1.5 },
      { from: [200, 150], to: [200, 105], color: '#10B981', strokeWidth: 2 },
      { from: [200, 105], to: [495, 105], color: '#10B981', strokeWidth: 2.5 }
    ],
    points: [
      { x: 200, y: 105, dot: 'filled', color: '#10B981', label: 'x = -3 (domknięte)', labelPosition: 'top' }
    ],
    labels: [
      { x: 45, y: 40, text: '-2x ≤ 6   ->   (: -2)   ->   x ≥ -3', color: '#FFB800', fontSize: 13, fontWeight: '700', anchor: 'start' },
      { x: 45, y: 70, text: 'Wskazówka: Dzielenie przez liczbę ujemną odwraca zwrot ( ≤  na  ≥ )', color: '#38BDF8', fontSize: 11, fontWeight: '600', anchor: 'start' },
      { x: 505, y: 150, text: 'x', color: '#94A3B8', fontSize: 12, fontWeight: '700', anchor: 'start' }
    ],
    metrics: [
      { label: 'Początkowa nierówność', value: '$-2x \\le 6$', color: '#FFB800' },
      { label: 'Dzielenie przez (-2)', value: '$\\div (-2) \\implies$ zmiana zwrotu', color: '#F43F5E' },
      { label: 'Zbiór rozwiązań', value: '$x \\in \\langle -3, +\\infty)$', color: '#10B981' },
      { label: 'Ważna reguła', value: 'Minus przy $x$ odwraca zwrot nierówności!', color: '#38BDF8' }
    ]
  },

  // Lekcja 5.2: Zaznaczanie rozwiązań na osi liczbowej i zapis przedziałowy
  'lesson-5-2': {
    type: 'PLOT',
    title: 'Kółko otwarte vs kółko zamalowane na osi liczbowej',
    formulaBadge: '$x > a \\implies x \\in (a, +\\infty) \\quad \\text{vs} \\quad x \\ge a \\implies x \\in [a, +\\infty)$',
    caption: 'Nierówności ostre ($<, >$) oznaczają kółko otwarte i nawias okrągły. Nierówności nieostre ($\\le, \\ge$) to kółko zamalowane i nawias ostry (domknięty).',
    width: 540,
    height: 250,
    plotData: {
      panels: [
        {
          title: 'Nierówność ostra: x > a  (kółko otwarte)',
          badge: 'Nawias ( )',
          badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-400/40',
          plot: {
            xRange: [-2, 5],
            yRange: [-1.2, 2.2],
            gridStep: 1,
            hideYAxis: true,
            subdivisions: false,
            polygons: [
              { points: [[1, 0], [1, 1], [4.6, 1], [4.6, 0]], color: '#38BDF8', fillOpacity: 0.18 }
            ],
            segments: [
              { from: [1, 0], to: [1, 1], color: '#38BDF8', strokeWidth: 2.5 },
              { from: [1, 1], to: [4.4, 1], color: '#38BDF8', strokeWidth: 2.5 },
              { from: [1, 0], to: [4.6, 0], color: '#38BDF8', strokeWidth: 5.5 }
            ],
            vectors: [
              { tail: [3.8, 1], tip: [4.6, 1], color: '#38BDF8', weight: 2.5 }
            ],
            points: [
              { x: 1, y: 1, dot: 'hollow', color: '#38BDF8', label: 'kółko otwarte (a ∉)', attach: 'n' },
              { x: 1, y: 0, dot: 'hollow', color: '#38BDF8', label: 'a', attach: 's' }
            ],
            labels: [
              { x: 1.5, y: 1.65, text: 'x > a  ->  x ∈ (a, +∞)', color: '#38BDF8', attach: 'n', fontSize: 12 }
            ]
          },
          subtitle: 'Kółko otwarte i nawias okrągły wykluczają punkt a z rozwiązań'
        },
        {
          title: 'Nierówność nieostra: x ≥ a  (kółko zamalowane)',
          badge: 'Nawias ⟨ ⟩',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40',
          plot: {
            xRange: [-2, 5],
            yRange: [-1.2, 2.2],
            gridStep: 1,
            hideYAxis: true,
            subdivisions: false,
            polygons: [
              { points: [[1, 0], [1, 1], [4.6, 1], [4.6, 0]], color: '#10B981', fillOpacity: 0.18 }
            ],
            segments: [
              { from: [1, 0], to: [1, 1], color: '#10B981', strokeWidth: 2.5 },
              { from: [1, 1], to: [4.4, 1], color: '#10B981', strokeWidth: 2.5 },
              { from: [1, 0], to: [4.6, 0], color: '#10B981', strokeWidth: 5.5 }
            ],
            vectors: [
              { tail: [3.8, 1], tip: [4.6, 1], color: '#10B981', weight: 2.5 }
            ],
            points: [
              { x: 1, y: 1, dot: 'filled', color: '#10B981', label: 'kółko zamalowane (a ∈)', attach: 'n' },
              { x: 1, y: 0, dot: 'filled', color: '#10B981', label: 'a', attach: 's' }
            ],
            labels: [
              { x: 1.5, y: 1.65, text: 'x ≥ a  ->  x ∈ ⟨a, +∞)', color: '#10B981', attach: 'n', fontSize: 12 }
            ]
          },
          subtitle: 'Kółko zamalowane i nawias ostry domykają punkt a w rozwiązaniach'
        }
      ]
    },
    polygons: [
      {
        points: [[200, 85], [200, 52], [495, 52], [495, 85]],
        fill: 'rgba(56, 189, 248, 0.10)',
        stroke: 'none'
      },
      {
        points: [[200, 185], [200, 152], [495, 152], [495, 185]],
        fill: 'rgba(16, 185, 129, 0.10)',
        stroke: 'none'
      }
    ],
    segments: [
      { from: [40, 85], to: [500, 85], color: '#64748B', strokeWidth: 1.5 },
      { from: [200, 85], to: [200, 52], color: '#38BDF8', strokeWidth: 2 },
      { from: [40, 185], to: [500, 185], color: '#64748B', strokeWidth: 1.5 },
      { from: [200, 185], to: [200, 152], color: '#10B981', strokeWidth: 2 }
    ],
    points: [
      { x: 200, y: 52, dot: 'hollow', color: '#38BDF8', label: 'kółko otwarte (a ∉)', labelPosition: 'top' },
      { x: 200, y: 152, dot: 'filled', color: '#10B981', label: 'kółko zamalowane (a ∈)', labelPosition: 'top' }
    ],
    labels: [
      { x: 45, y: 25, text: 'x > a  ->  x ∈ (a, +∞)  [liczba a NIE należy]', color: '#38BDF8', fontSize: 12, fontWeight: '700', anchor: 'start' },
      { x: 45, y: 125, text: 'x ≥ a  ->  x ∈ ⟨a, +∞)  [liczba a NALEŻY]', color: '#10B981', fontSize: 12, fontWeight: '700', anchor: 'start' },
      { x: 505, y: 85, text: 'x', color: '#94A3B8', fontSize: 12, fontWeight: '700', anchor: 'start' },
      { x: 505, y: 185, text: 'x', color: '#94A3B8', fontSize: 12, fontWeight: '700', anchor: 'start' }
    ],
    metrics: [
      { label: 'Nierówność ostra ($<, >$)', value: 'Kółko OTWARTE $\\circ$, nawias okrągły $( \\; )$', color: '#38BDF8' },
      { label: 'Nierówność nieostra ($\\le, \\ge$)', value: 'Kółko ZAMALOWANE $\\bullet$, nawias ostry $\\langle \\; \\rangle$', color: '#10B981' },
      { label: 'Nieskończoność ($-\\infty, +\\infty$)', value: 'Zawsze nawias OKRĄGŁY!', color: '#FFB800' },
      { label: 'Mnożenie przez minus', value: 'Zmień zwrot: $-2x < 6 \\implies x > -3$', color: '#F43F5E' }
    ]
  },

  // Lekcja 5.3: Układy nierówności liniowych i wyznaczanie liczb całkowitych
  'lesson-5-3': {
    type: 'PLOT',
    title: 'Układ nierówności: część wspólna i liczby całkowite w przedziale',
    formulaBadge: '$\\begin{cases} x > -2 \\\\ x \\le 3 \\end{cases} \\implies x \\in (-2, 3\\rangle \\implies x \\in \\{-1, 0, 1, 2, 3\\}$',
    caption: 'Klamra układu oznacza poszukiwanie części wspólnej (przecięcia obu przedziałów). Następnie zliczamy liczby całkowite leżące wewnątrz przedziału.',
    width: 540,
    height: 280,
    plotData: {
      xRange: [-4.2, 5.2],
      yRange: [-1.2, 3.2],
      gridStep: 1,
      hideYAxis: true,
      subdivisions: false,
      polygons: [
        // Szmaragdowa część wspólna (-2, 3] pod daszkiem
        {
          points: [[-2, 0], [-2, 1], [3, 1], [3, 0]],
          color: '#10B981',
          fillOpacity: 0.25
        }
      ],
      segments: [
        // Słupek warunku 1: x = -2 (błękitny)
        { from: [-2, 0], to: [-2, 1], color: '#38BDF8', strokeWidth: 2.5 },
        // Dach warunku 1: od x = -2 w prawo do nieskończoności
        { from: [-2, 1], to: [4.8, 1], color: '#38BDF8', strokeWidth: 2.5 },

        // Słupek warunku 2: x = 3 (bursztynowy)
        { from: [3, 0], to: [3, 1.8], color: '#FFB800', strokeWidth: 2.5 },
        // Dach warunku 2: do x = 3 w lewo do nieskończoności
        { from: [3, 1.8], to: [-3.8, 1.8], color: '#FFB800', strokeWidth: 2.5 },

        // Podświetlenie części wspólnej na osi OX: (-2, 3]
        { from: [-2, 0], to: [3, 0], color: '#10B981', strokeWidth: 5.5 }
      ],
      vectors: [
        { tail: [4.2, 1], tip: [4.9, 1], color: '#38BDF8', weight: 2.5 },
        { tail: [-3.2, 1.8], tip: [-3.9, 1.8], color: '#FFB800', weight: 2.5 }
      ],
      points: [
        // Kółka na szczytach słupków
        { x: -2, y: 1, dot: 'hollow', color: '#38BDF8', label: '-2 (otwarte)', attach: 'nw' },
        { x: 3, y: 1.8, dot: 'filled', color: '#FFB800', label: '3 (zamknięte)', attach: 'ne' },
        // Kółko otwarte na osi OX dla -2
        { x: -2, y: 0, dot: 'hollow', color: '#64748B', label: '-2 ∉', attach: 's' },
        // Rozwiązania całkowite należące do części wspólnej
        { x: -1, y: 0, dot: 'filled', color: '#10B981', label: '-1', attach: 's' },
        { x: 0, y: 0, dot: 'filled', color: '#10B981', label: '0', attach: 's' },
        { x: 1, y: 0, dot: 'filled', color: '#10B981', label: '1', attach: 's' },
        { x: 2, y: 0, dot: 'filled', color: '#10B981', label: '2', attach: 's' },
        { x: 3, y: 0, dot: 'filled', color: '#10B981', label: '3', attach: 's' }
      ],
      labels: [
        { x: -1.2, y: 1.3, text: 'Warunek 1: x > -2  [od -2 w prawo]', color: '#38BDF8', attach: 'n', fontSize: 12 },
        { x: 1.2, y: 2.1, text: 'Warunek 2: x ≤ 3  [do 3 w lewo]', color: '#FFB800', attach: 'n', fontSize: 12 },
        { x: 0.5, y: 2.75, text: 'Część wspólna: x ∈ (-2, 3⟩ -> całkowite: {-1, 0, 1, 2, 3}', color: '#10B981', attach: 'n', fontSize: 13 },
        { x: 5.0, y: -0.35, text: 'x', color: '#94A3B8', attach: 's', fontSize: 13 }
      ]
    },
    polygons: [
      // Szmaragdowe wypełnienie strefy części wspólnej (-2, 3>
      {
        points: [[150, 185], [150, 150], [450, 150], [450, 185]],
        fill: 'rgba(16, 185, 129, 0.16)',
        stroke: 'none'
      }
    ],
    segments: [
      { from: [150, 185], to: [150, 150], color: '#38BDF8', strokeWidth: 2 },
      { from: [150, 150], to: [495, 150], color: '#38BDF8', strokeWidth: 2.5 },
      { from: [450, 185], to: [450, 120], color: '#FFB800', strokeWidth: 2 },
      { from: [450, 120], to: [45, 120], color: '#FFB800', strokeWidth: 2.5 },
      { from: [40, 185], to: [500, 185], color: '#64748B', strokeWidth: 1.5 },
      { from: [150, 185], to: [450, 185], color: '#10B981', strokeWidth: 5.5 }
    ],
    points: [
      { x: 150, y: 150, dot: 'hollow', color: '#38BDF8', label: '-2 (otwarte)', labelPosition: 'top' },
      { x: 450, y: 120, dot: 'filled', color: '#FFB800', label: '3 (zamknięte)', labelPosition: 'top' },
      { x: 150, y: 185, dot: 'hollow', color: '#64748B', label: '-2 ∉', labelPosition: 'bottom' },
      { x: 210, y: 185, dot: 'filled', color: '#10B981', label: '-1', labelPosition: 'bottom' },
      { x: 270, y: 185, dot: 'filled', color: '#10B981', label: '0', labelPosition: 'bottom' },
      { x: 330, y: 185, dot: 'filled', color: '#10B981', label: '1', labelPosition: 'bottom' },
      { x: 390, y: 185, dot: 'filled', color: '#10B981', label: '2', labelPosition: 'bottom' },
      { x: 450, y: 185, dot: 'filled', color: '#10B981', label: '3', labelPosition: 'bottom' }
    ],
    labels: [
      { x: 45, y: 40, text: 'Warunek 1: x > -2  [od -2 w prawo, kółko otwarte]', color: '#38BDF8', fontSize: 12, fontWeight: '700', anchor: 'start' },
      { x: 45, y: 75, text: 'Warunek 2: x ≤ 3  [do 3 w lewo, kółko zamalowane]', color: '#FFB800', fontSize: 12, fontWeight: '700', anchor: 'start' },
      { x: 45, y: 250, text: 'Część wspólna: x ∈ (-2, 3⟩  ->  całkowite: {-1, 0, 1, 2, 3}', color: '#10B981', fontSize: 12, fontWeight: '700', anchor: 'start' },
      { x: 505, y: 185, text: 'x', color: '#94A3B8', fontSize: 12, fontWeight: '700', anchor: 'start' }
    ],
    metrics: [
      { label: 'Część wspólna (iloczyn)', value: '$x \\in (-2, 3\\rangle$', color: '#10B981' },
      { label: 'Liczby całkowite', value: '$\\{-1, 0, 1, 2, 3\\}$ (5 liczb)', color: '#38BDF8' },
      { label: 'Najmniejsza całkowita', value: '$x = -1$ (bo -2 nie należy!)', color: '#FFB800' },
      { label: 'Największa całkowita', value: '$x = 3$ (bo 3 należy!)', color: '#10B981' }
    ]
  },

  // Lekcja 7.2: Sito Dziedziny – równania wymierne i eliminacja pierwiastków obcych
  'lesson-7-2': {
    type: 'PLOT',
    title: 'Sito Dziedziny: Eliminacja pierwiastków obcych w równaniach wymiernych',
    formulaBadge: '$\\frac{P(x)}{Q(x)} = 0 \\implies P(x) = 0 \\quad \\text{oraz} \\quad Q(x) \\neq 0$',
    caption: 'Zawsze najpierw wyznacz dziedzinę ($Q(x) \\neq 0$). Liczba zerująca mianownik nie może być rozwiązaniem, nawet jeśli zeruje licznik!',
    width: 540,
    height: 240,
    plotData: {
      xRange: [-4, 4],
      yRange: [-1.2, 2.2],
      gridStep: 1,
      hideYAxis: true,
      subdivisions: false,
      segments: [
        { from: [1.85, 0.6], to: [2.15, 0.9], color: '#F43F5E', strokeWidth: 3 },
        { from: [1.85, 0.9], to: [2.15, 0.6], color: '#F43F5E', strokeWidth: 3 }
      ],
      points: [
        { x: -2, y: 0, dot: 'filled', color: '#10B981', label: 'x = -2 ∈ D (ROZWIĄZANIE)', attach: 's' },
        { x: 2, y: 0, dot: 'hollow', color: '#F43F5E', label: 'x = 2 ∉ D (ODRZUCONY!)', attach: 's' }
      ],
      labels: [
        { x: 0, y: 1.5, text: 'Równanie: (x² - 4)/(x - 2) = 0   |   D = ℝ \\ {2}', color: '#38BDF8', attach: 'n', fontSize: 13 },
        { x: 2, y: 1.05, text: 'Mianownik x - 2 = 0 -> pierwiastek obcy!', color: '#F43F5E', attach: 'n', fontSize: 11 },
        { x: 3.8, y: -0.35, text: 'x', color: '#94A3B8', attach: 's', fontSize: 13 }
      ]
    },
    segments: [
      // Oś liczbowa OX
      { from: [40, 140], to: [500, 140], color: '#64748B', strokeWidth: 2 },
      { from: [490, 135], to: [500, 140], color: '#64748B', strokeWidth: 2 },
      { from: [490, 145], to: [500, 140], color: '#64748B', strokeWidth: 2 },
      // Czerwony krzyżyk nad punktem odrzuconym (x = 2)
      { from: [380, 128], to: [400, 152], color: '#F43F5E', strokeWidth: 3 },
      { from: [380, 152], to: [400, 128], color: '#F43F5E', strokeWidth: 3 }
    ],
    ticks: [
      { x: 150, y: 140, label: '-2', axis: 'x' },
      { x: 270, y: 140, label: '0', axis: 'x' },
      { x: 390, y: 140, label: '2', axis: 'x' }
    ],
    points: [
      { x: 150, y: 140, dot: 'filled', color: '#10B981', label: 'x = -2 ∈ D (ROZWIĄZANIE)', labelPosition: 'bottom' },
      { x: 390, y: 140, dot: 'hollow', color: '#F43F5E', label: 'x = 2 ∉ D (ODRZUCONY!)', labelPosition: 'top' }
    ],
    labels: [
      { x: 495, y: 125, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 270, y: 55, text: 'Równanie: (x² - 4)/(x - 2) = 0   |   D = ℝ \\ {2}', color: '#38BDF8', fontSize: 13, fontWeight: '700', anchor: 'middle' }
    ],
    metrics: [
      { label: 'Warunek dziedziny', value: '$x - 2 \\neq 0 \\implies D = \\mathbb{R} \\setminus \\{2\\}$', color: '#F43F5E' },
      { label: 'Pierwiastki licznika', value: '$x^2 - 4 = 0 \\implies x = 2 \\quad \\text{lub} \\quad x = -2$', color: '#38BDF8' },
      { label: 'Pierwiastek obcy (pułapka CKE)', value: '$x = 2 \\notin D$ (odrzucony)', color: '#F43F5E' },
      { label: 'Jedyne poprawne rozwiązanie', value: '$x = -2$', color: '#10B981' }
    ]
  },

  // Lekcja 4.4 (Legacy): Odczytywanie dziedziny i zbioru wartości z wykresu
  'legacy-lesson-4-4': {
    type: 'GEOMETRY_2D',
    title: 'Odczytywanie dziedziny $D_f$ i zbioru wartości $ZW_f$',
    formulaBadge: '$D_f = \\langle -4, 5 \\rangle,\\quad ZW_f = \\langle -2, 3 \\rangle$',
    caption: 'Rzut wykresu na oś $OX$ (poziomo) wyznacza dziedzinę $D_f$, a rzut na oś $OY$ (pionowo) wyznacza zbiór wartości $ZW_f$.',
    width: 540,
    height: 280,
    grid: {
      xLines: [72, 108, 144, 180, 216, 252, 288, 324, 360, 396, 432, 468],
      yLines: [27, 59, 91, 123, 155, 187, 219, 251],
      minX: 45,
      maxX: 495,
      minY: 25,
      maxY: 255,
      color: 'rgba(148, 163, 184, 0.12)'
    },
    segments: [
      // Osie OX i OY
      { from: [40, 155], to: [500, 155], color: '#64748B', strokeWidth: 1.5 },
      { from: [252, 260], to: [252, 20], color: '#64748B', strokeWidth: 1.5 },
      // Groty strzałek osi OX
      { from: [492, 151], to: [500, 155], color: '#64748B', strokeWidth: 1.5 },
      { from: [492, 159], to: [500, 155], color: '#64748B', strokeWidth: 1.5 },
      // Groty strzałek osi OY
      { from: [248, 28], to: [252, 20], color: '#64748B', strokeWidth: 1.5 },
      { from: [256, 28], to: [252, 20], color: '#64748B', strokeWidth: 1.5 },
      // Podświetlenie Df bezpośrednio na osi OX (108 do 432)
      { from: [108, 155], to: [432, 155], color: '#38BDF8', strokeWidth: 4.5 },
      // Podświetlenie ZWf bezpośrednio na osi OY (219 do 59)
      { from: [252, 219], to: [252, 59], color: '#10B981', strokeWidth: 4.5 },
      // Cienkie linie rzutowania punktów skrajnych i ekstremów na osie
      { from: [108, 219], to: [108, 155], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [108, 219], to: [252, 219], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [180, 59], to: [180, 155], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [180, 59], to: [252, 59], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [288, 219], to: [288, 155], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [288, 219], to: [252, 219], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [432, 59], to: [432, 155], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [432, 59], to: [252, 59], color: '#64748B', strokeWidth: 1, dashed: true }
    ],
    ticks: [
      // Ticki OX (Y = 155)
      { x: 108, y: 155, label: '-4', axis: 'x' },
      { x: 180, y: 155, label: '-2', axis: 'x' },
      { x: 216, y: 155, label: '-1', axis: 'x' },
      { x: 288, y: 155, label: '1', axis: 'x' },
      { x: 324, y: 155, label: '2', axis: 'x' },
      { x: 360, y: 155, label: '3', axis: 'x' },
      { x: 432, y: 155, label: '5', axis: 'x' },
      // Ticki OY (X = 252)
      { x: 252, y: 219, label: '-2', axis: 'y' },
      { x: 252, y: 187, label: '-1', axis: 'y' },
      { x: 252, y: 123, label: '1', axis: 'y' },
      { x: 252, y: 91, label: '2', axis: 'y' },
      { x: 252, y: 59, label: '3', axis: 'y' }
    ],
    curves: [
      {
        path: 'M 108 219 C 122 105, 155 59, 180 59 C 208 59, 260 219, 288 219 C 320 219, 395 59, 432 59',
        color: '#FFB800',
        strokeWidth: 3.5,
        glow: true
      }
    ],
    points: [
      { x: 108, y: 219, dot: 'filled', color: '#38BDF8', label: '(-4, -2)', labelPosition: 'bottom' },
      { x: 180, y: 59, dot: 'filled', color: '#10B981', label: 'max (-2, 3)', labelPosition: 'top' },
      { x: 288, y: 219, dot: 'filled', color: '#10B981', label: 'min (1, -2)', labelPosition: 'bottom' },
      { x: 432, y: 59, dot: 'filled', color: '#38BDF8', label: '(5, 3)', labelPosition: 'top' }
    ],
    labels: [
      { x: 495, y: 140, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 268, y: 24, text: 'y', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 270, y: 142, text: 'Df = ⟨-4, 5⟩', color: '#38BDF8', fontSize: 12, fontWeight: '700', anchor: 'middle' }
    ],
    metrics: [
      { label: 'Dziedzina (rzut na OX)', value: '$D_f = \\langle -4, 5 \\rangle$', color: '#38BDF8' },
      { label: 'Zbiór wartości (rzut na OY)', value: '$ZW_f = \\langle -2, 3 \\rangle$', color: '#10B981' },
      { label: 'Wartość najmniejsza', value: '$y_{\\min} = -2$ dla $x = -4$ i $x = 1$', color: '#FFB800' },
      { label: 'Wartość największa', value: '$y_{\\max} = 3$ dla $x = -2$ i $x = 5$', color: '#FFB800' }
    ]
  },

  // Lekcja 4.5 (Legacy): Rozwiązywanie równania f(x) = c
  'legacy-lesson-4-5': {
    type: 'GEOMETRY_2D',
    title: 'Rozwiązywanie równania $f(x) = c$',
    formulaBadge: '$f(x) = c \\implies \\text{punkty przecięcia z prostą } y = c$',
    caption: 'Liczba rozwiązań równania $f(x)=c$ to liczba punktów wspólnych wykresu funkcji $y=f(x)$ i poziomej prostej $y=c$.',
    width: 540,
    height: 280,
    grid: {
      xLines: [72, 108, 144, 180, 216, 252, 288, 324, 360, 396, 432, 468],
      yLines: [27, 59, 91, 123, 155, 187, 219, 251],
      minX: 45,
      maxX: 495,
      minY: 25,
      maxY: 255,
      color: 'rgba(148, 163, 184, 0.12)'
    },
    segments: [
      // Osie OX i OY
      { from: [40, 155], to: [500, 155], color: '#64748B', strokeWidth: 1.5 },
      { from: [252, 260], to: [252, 20], color: '#64748B', strokeWidth: 1.5 },
      // Groty strzałek osi OX
      { from: [492, 151], to: [500, 155], color: '#64748B', strokeWidth: 1.5 },
      { from: [492, 159], to: [500, 155], color: '#64748B', strokeWidth: 1.5 },
      // Groty strzałek osi OY
      { from: [248, 28], to: [252, 20], color: '#64748B', strokeWidth: 1.5 },
      { from: [256, 28], to: [252, 20], color: '#64748B', strokeWidth: 1.5 },
      // Pozioma prosta y = c
      { from: [40, 95], to: [500, 95], color: '#38BDF8', strokeWidth: 2, dashed: true },
      // Pionowe linie rzutowania punktów przecięcia na oś OX
      { from: [135, 95], to: [135, 155], color: '#F43F5E', strokeWidth: 1.5, dashed: true },
      { from: [225, 95], to: [225, 155], color: '#F43F5E', strokeWidth: 1.5, dashed: true },
      { from: [385, 95], to: [385, 155], color: '#F43F5E', strokeWidth: 1.5, dashed: true }
    ],
    ticks: [
      { x: 252, y: 95, label: 'c', axis: 'y' }
    ],
    curves: [
      {
        path: 'M 90 220 C 120 60, 145 50, 175 50 C 210 50, 245 230, 295 230 C 345 230, 395 60, 445 60',
        color: '#FFB800',
        strokeWidth: 3.5,
        glow: true
      }
    ],
    points: [
      { x: 135, y: 95, dot: 'filled', color: '#F43F5E', label: 'x₁', labelPosition: 'top-left' },
      { x: 225, y: 95, dot: 'filled', color: '#F43F5E', label: 'x₂', labelPosition: 'top' },
      { x: 385, y: 95, dot: 'filled', color: '#F43F5E', label: 'x₃', labelPosition: 'top-right' },
      { x: 252, y: 95, dot: 'filled', color: '#38BDF8' }
    ],
    labels: [
      { x: 495, y: 140, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 268, y: 24, text: 'y', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 455, y: 80, text: 'prosta y = c', color: '#38BDF8', fontSize: 11, fontWeight: '700', badge: true },
      { x: 460, y: 195, text: 'y = f(x)', color: '#FFB800', fontSize: 13, fontWeight: '700', badge: true }
    ],
    metrics: [
      { label: 'Badane równanie', value: '$f(x) = c$', color: '#38BDF8' },
      { label: 'Liczba rozwiązań', value: '$3$ punkty przecięcia', color: '#F43F5E' },
      { label: 'Rozwiązania równania', value: '$x_1,\\; x_2,\\; x_3$', color: '#FFB800' },
      { label: 'Metoda CKE', value: 'Pozioma prosta', color: '#10B981' }
    ]
  },

  // Archiwalny schemat paraboli (przeniesiony z lesson-6-1, by nie kolidować z regułą zerowania iloczynu)
  'legacy-parabola-vertex': {
    type: 'GEOMETRY_2D',
    title: 'Własności paraboli: $f(x) = ax^2 + bx + c$',
    formulaBadge: '$p = -\\frac{b}{2a},\\quad q = -\\frac{\\Delta}{4a}$',
    caption: 'Wierzchołek $W=(p, q)$ to punkt zwrotny paraboli. Oś symetrii $x = p$ dzieli parabolę na dwie lustrzane części.',
    width: 540,
    height: 280,
    grid: {
      xLines: [72, 112, 152, 192, 232, 272, 312, 352, 392, 432, 472],
      yLines: [27, 59, 91, 123, 155, 187, 219, 251],
      minX: 45,
      maxX: 495,
      minY: 25,
      maxY: 255,
      color: 'rgba(148, 163, 184, 0.12)'
    },
    segments: [
      // Osie układu współrzędnych
      { from: [40, 155], to: [500, 155], color: '#64748B', strokeWidth: 1.5 },
      { from: [152, 260], to: [152, 20], color: '#64748B', strokeWidth: 1.5 },
      // Groty strzałek osi OX
      { from: [492, 151], to: [500, 155], color: '#64748B', strokeWidth: 1.5 },
      { from: [492, 159], to: [500, 155], color: '#64748B', strokeWidth: 1.5 },
      // Groty strzałek osi OY
      { from: [148, 28], to: [152, 20], color: '#64748B', strokeWidth: 1.5 },
      { from: [156, 28], to: [152, 20], color: '#64748B', strokeWidth: 1.5 },
      // Oś symetrii paraboli x = p
      { from: [292, 260], to: [292, 35], color: '#38BDF8', strokeWidth: 1.75, dashed: true },
      // Wytyczne współrzędnych wierzchołka (rzuty na osie)
      { from: [152, 219], to: [292, 219], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [292, 155], to: [292, 219], color: '#64748B', strokeWidth: 1, dashed: true }
    ],
    ticks: [
      { x: 212, y: 155, label: 'x₁', axis: 'x' },
      { x: 372, y: 155, label: 'x₂', axis: 'x' },
      { x: 292, y: 155, label: 'p', axis: 'x' },
      { x: 152, y: 219, label: 'q', axis: 'y' }
    ],
    curves: [
      {
        quadratic: {
          start: [112, 18],
          control: [292, 420],
          end: [472, 18]
        },
        color: '#FFB800',
        strokeWidth: 3.5,
        glow: true
      }
    ],
    points: [
      { x: 292, y: 219, dot: 'filled', color: '#10B981', label: 'W = (p, q)', labelPosition: 'bottom' },
      { x: 152, y: 75, dot: 'filled', color: '#38BDF8', label: '(0, c)', labelPosition: 'left' },
      { x: 212, y: 155, dot: 'filled', color: '#F43F5E' },
      { x: 372, y: 155, dot: 'filled', color: '#F43F5E' }
    ],
    labels: [
      { x: 495, y: 140, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 168, y: 24, text: 'y', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 292, y: 24, text: 'oś symetrii: x = p', color: '#38BDF8', fontSize: 11, fontWeight: '700', badge: true },
      { x: 455, y: 48, text: 'y = f(x)', color: '#FFB800', fontSize: 13, fontWeight: '700', badge: true }
    ],
    metrics: [
      { label: 'Wierzchołek paraboli', value: '$W = (p, q)$', color: '#10B981' },
      { label: 'Oś symetrii', value: '$x = p$', color: '#38BDF8' },
      { label: 'Przecięcie z osią OY', value: '$(0, c)$', color: '#38BDF8' },
      { label: 'Miejsca zerowe', value: '$x_1,\\; x_2$', color: '#F43F5E' }
    ]
  },

  // Lekcja 8.1: Wyróżnik Delta i miejsca zerowe trójmianu kwadratowego
  'lesson-8-1': {
    type: 'PLOT',
    title: 'Wyróżnik $\\Delta$ i miejsca zerowe paraboli ($a > 0$)',
    formulaBadge: '$\\Delta = b^2 - 4ac,\\quad x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$',
    caption: 'Gdy $\\Delta > 0$, parabola przecina oś $OX$ w dwóch punktach $x_1$ i $x_2$. Wierzchołek $W=(p, q)$ leży symetrycznie pomiędzy pierwiastkami.',
    points: [
      { x: 185, y: 140, dot: 'filled', color: '#10B981', label: 'x₁', labelPosition: 'bottom-left' },
      { x: 355, y: 140, dot: 'filled', color: '#10B981', label: 'x₂', labelPosition: 'bottom-right' },
      { x: 270, y: 175, dot: 'filled', color: '#38BDF8', label: 'W(p, q)', labelPosition: 'bottom' }
    ],
    plotData: {
      xRange: [-3.5, 5.5],
      yRange: [-3, 4],
      gridStep: 1,
      parabola: { a: 0.5, p: 1, q: -2, color: '#FFB800' },
      axisOfSymmetry: 1,
      points: [
        { x: -1, y: 0, dot: 'filled', color: '#10B981', label: 'x₁ = -1', attach: 'nw' },
        { x: 3, y: 0, dot: 'filled', color: '#10B981', label: 'x₂ = 3', attach: 'ne' },
        { x: 1, y: -2, dot: 'filled', color: '#38BDF8', label: 'W(1, -2)', attach: 's' }
      ],
      labels: [
        { x: 1, y: 3.5, text: 'oś symetrii: x = 1', color: '#38BDF8', attach: 'n' }
      ]
    },
    metrics: [
      { label: 'Wyróżnik trójmianu', value: '$\\Delta = b^2 - 4ac$', color: '#38BDF8' },
      { label: 'Dwa pierwiastki (Δ > 0)', value: '$x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$', color: '#10B981' },
      { label: 'Wierzchołek p', value: '$p = -\\frac{b}{2a} = \\frac{x_1 + x_2}{2}$', color: '#FFB800' },
      { label: 'Wierzchołek q', value: '$q = -\\frac{\\Delta}{4a}$', color: '#F43F5E' }
    ]
  },

  // Lekcja 8.2: Szkicowanie paraboli i odczytywanie przedziałów rozwiązań (f(x) > 0 vs f(x) < 0)
  'lesson-8-2': {
    type: 'PLOT',
    title: 'Rozwiązywanie nierówności kwadratowej: $f(x) > 0$ vs $f(x) < 0$',
    formulaBadge: '$f(x) > 0 \\implies x \\in (-\\infty, x_1) \\cup (x_2, +\\infty),\\quad f(x) < 0 \\implies x \\in (x_1, x_2)$',
    caption: 'Gdy ramiona paraboli są skierowane w górę ($a > 0$), wartości dodatnie leżą NAD osią $OX$ (zielone strefy), a ujemne POD osią $OX$ (czerwona strefa).',
    points: [
      { x: 185, y: 140, dot: 'filled', color: '#10B981', label: 'x₁', labelPosition: 'top-left' },
      { x: 355, y: 140, dot: 'filled', color: '#10B981', label: 'x₂', labelPosition: 'top-right' },
      { x: 270, y: 175, dot: 'filled', color: '#F43F5E', label: 'W (wierzchołek)', labelPosition: 'bottom' }
    ],
    polygons: [
      { points: [[110, 50], [185, 140], [110, 140]], fill: 'rgba(16, 185, 129, 0.15)', stroke: 'none' },
      { points: [[355, 140], [430, 50], [430, 140]], fill: 'rgba(16, 185, 129, 0.15)', stroke: 'none' },
      { points: [[185, 140], [270, 175], [355, 140]], fill: 'rgba(244, 63, 94, 0.16)', stroke: 'none' }
    ],
    plotData: {
      xRange: [-3.5, 5.5],
      yRange: [-3, 4],
      gridStep: 1,
      parabola: { a: 0.5, p: 1, q: -2, color: '#FFB800' },
      inequalityRegions: [
        { fromX: -3.5, toX: -1, condition: 'above', color: '#10B981', fillOpacity: 0.22 },
        { fromX: -1, toX: 3, condition: 'below', color: '#F43F5E', fillOpacity: 0.22 },
        { fromX: 3, toX: 5.5, condition: 'above', color: '#10B981', fillOpacity: 0.22 }
      ],
      points: [
        { x: -1, y: 0, dot: 'filled', color: '#10B981', label: 'x₁ = -1', attach: 'nw' },
        { x: 3, y: 0, dot: 'filled', color: '#10B981', label: 'x₂ = 3', attach: 'ne' },
        { x: 1, y: -2, dot: 'filled', color: '#F43F5E', label: 'W (wierzchołek)', attach: 's' }
      ],
      labels: [
        { x: -2.3, y: 1.5, text: '+ (nad osią)', color: '#10B981', attach: 'n' },
        { x: 1, y: -0.9, text: '- (pod osią)', color: '#F43F5E', attach: 's' },
        { x: 4.3, y: 1.5, text: '+ (nad osią)', color: '#10B981', attach: 'n' }
      ]
    },
    metrics: [
      { label: 'f(x) > 0 (nad osią)', value: '$x \\in (-\\infty, x_1) \\cup (x_2, +\\infty)$', color: '#10B981' },
      { label: 'f(x) < 0 (pod osią)', value: '$x \\in (x_1, x_2)$', color: '#F43F5E' },
      { label: 'f(x) ≥ 0 (z zerami)', value: '$x \\in (-\\infty, x_1\\rangle \\cup \\langle x_2, +\\infty)$', color: '#38BDF8' },
      { label: 'Gdy a < 0 (ramiona w dół)', value: 'Układ znaków ulega odwróceniu!', color: '#FFB800' }
    ]
  },

  // Lekcja 8.3: Nierówności kwadratowe niepełne – bez liczenia delty
  'lesson-8-3': {
    type: 'PLOT',
    title: 'Nierówności kwadratowe niepełne: wyłączanie $x$ oraz różnica kwadratów',
    formulaBadge: '$ax^2 + bx = x(ax + b) \\quad \\text{vs} \\quad x^2 - c = (x - \\sqrt{c})(x + \\sqrt{c})$',
    caption: 'Gdy $c = 0$, wyłączasz $x$ przed nawias — jedno miejsce zerowe to zawsze 0! Gdy $b = 0$, stosujesz różnicę kwadratów — pierwiastki są liczbami przeciwnymi.',
    curves: [
      { path: 'M 60 70 Q 150 277.5 240 70', color: '#38BDF8', strokeWidth: 2.5, glow: true },
      { path: 'M 300 70 Q 390 277.5 480 70', color: '#FFB800', strokeWidth: 2.5, glow: true }
    ],
    plotData: {
      panels: [
        {
          title: 'Brak c:  x² - 4x = x(x - 4) = 0',
          badge: 'x₁ = 0, x₂ = 4',
          badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-400/40',
          subtitle: 'Miejsca zerowe: 0 oraz 4',
          plot: {
            xRange: [-1.5, 5.5],
            yRange: [-5, 4],
            gridStep: 1,
            parabola: { a: 1, p: 2, q: -4, color: '#38BDF8' },
            points: [
              { x: 0, y: 0, dot: 'filled', color: '#10B981', label: 'x₁ = 0', attach: 'nw' },
              { x: 4, y: 0, dot: 'filled', color: '#10B981', label: 'x₂ = 4', attach: 'ne' }
            ]
          }
        },
        {
          title: 'Brak b:  x² - 9 = (x - 3)(x + 3) = 0',
          badge: 'x₁,₂ = ±3',
          badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-400/40',
          subtitle: 'Miejsca zerowe: -3 oraz 3',
          plot: {
            xRange: [-4.5, 4.5],
            yRange: [-10, 4],
            gridStep: 2,
            parabola: { a: 1, p: 0, q: -9, color: '#FFB800' },
            points: [
              { x: -3, y: 0, dot: 'filled', color: '#10B981', label: 'x₁ = -3', attach: 'nw' },
              { x: 3, y: 0, dot: 'filled', color: '#10B981', label: 'x₂ = 3', attach: 'ne' }
            ]
          }
        }
      ]
    },
    metrics: [
      { label: 'Gdy brak c (c = 0)', value: '$x(ax + b) = 0 \\implies x_1 = 0,\\; x_2 = -\\frac{b}{a}$', color: '#38BDF8' },
      { label: 'Gdy brak b (b = 0)', value: '$x^2 - c = 0 \\implies x_{1,2} = \\pm \\sqrt{c}$', color: '#FFB800' },
      { label: 'Wskazówka', value: 'Zero liczenia delty — oszczędzasz 2 minuty!', color: '#10B981' },
      { label: 'Pułapka znaku', value: '$x^2 + 9 \\le 0$ to zbiór pusty $\\emptyset$', color: '#F43F5E' }
    ]
  },

  // Lekcja 8.4: Nierówności kwadratowe z ujemną deltą (Δ < 0)
  'lesson-8-4': {
    type: 'PLOT',
    title: 'Delta ujemna ($\\Delta < 0$): brak miejsc zerowych vs zbiór rozwiązań',
    formulaBadge: '$\\Delta < 0 \\implies \\text{brak przecięć z } OX \\implies f(x) > 0 \\text{ dla } x \\in \\mathbb{R} \\quad \\text{lub} \\quad \\emptyset$',
    caption: 'Ujemna delta to NIE brak rozwiązań nierówności! Wykres w całości unosi się nad osią ($a > 0$) lub wisi pod nią ($a < 0$). Rozwiązaniem jest $\\mathbb{R}$ lub zbiór pusty $\\emptyset$.',
    plotData: {
      panels: [
        {
          title: 'Δ < 0 oraz a > 0 (parabola cała NAD osią)',
          badge: 'f(x) > 0 : x ∈ ℝ',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40',
          subtitle: 'f(x) > 0 -> x ∈ ℝ   |   f(x) ≤ 0 -> ∅',
          plot: {
            xRange: [-3.5, 5.5],
            yRange: [-2, 5],
            gridStep: 1,
            parabola: { a: 0.5, p: 1, q: 1, color: '#10B981' },
            inequalityRegions: [
              { fromX: -3.5, toX: 5.5, condition: 'above', color: '#10B981', fillOpacity: 0.2 }
            ],
            points: [
              { x: 1, y: 1, dot: 'filled', color: '#10B981', label: 'W(1, 1)', attach: 's' }
            ]
          }
        },
        {
          title: 'Δ < 0 oraz a < 0 (parabola cała POD osią)',
          badge: 'f(x) < 0 : x ∈ ℝ',
          badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-400/40',
          subtitle: 'f(x) < 0 -> x ∈ ℝ   |   f(x) ≥ 0 -> ∅',
          plot: {
            xRange: [-3.5, 5.5],
            yRange: [-5, 2],
            gridStep: 1,
            parabola: { a: -0.5, p: 1, q: -1, color: '#F43F5E' },
            inequalityRegions: [
              { fromX: -3.5, toX: 5.5, condition: 'below', color: '#F43F5E', fillOpacity: 0.2 }
            ],
            points: [
              { x: 1, y: -1, dot: 'filled', color: '#F43F5E', label: 'W(1, -1)', attach: 'n' }
            ]
          }
        }
      ]
    },
    metrics: [
      { label: 'Delta ujemna (Δ < 0)', value: 'Brak punktów wspólnych z $OX$', color: '#38BDF8' },
      { label: 'Gdy a > 0 i znak > 0', value: '$x \\in \\mathbb{R}$ (wszystkie liczby)', color: '#10B981' },
      { label: 'Gdy a > 0 i znak ≤ 0', value: '$x \\in \\emptyset$ (zbiór pusty)', color: '#F43F5E' },
      { label: 'Główna pułapka CKE', value: '$\\Delta < 0$ to NIE brak rozwiązań nierówności!', color: '#FFB800' }
    ]
  },

  // Lekcja 9.1: Odczytywanie dziedziny D_f i zbioru wartości ZW_f z wykresu funkcji (Mafs PLOT)
  'lesson-9-1': {
    type: 'PLOT',
    title: 'Odczytywanie dziedziny $D_f$ i zbioru wartości $ZW_f$ z wykresu',
    formulaBadge: '$D_f = [-4, 5],\\quad ZW_f = [-2, 3]$',
    caption: 'Dziedzinę $D_f$ odczytujemy poziomo z osi $OX$ (od lewej do prawej), a zbiór wartości $ZW_f$ pionowo z osi $OY$ (od najniższego do najwyższego punktu). Kropki zamalowane oznaczają nawiasy domknięte.',
    plotData: {
      xRange: [-5.5, 6.5],
      yRange: [-3.5, 4.5],
      gridStep: 1,
      segments: [
        // Wykres łamany złożony z 3 spójnych segmentów
        { from: [-4, -1], to: [-1, -2], color: '#FFB800', strokeWidth: 3.5, startDot: 'filled', endDot: 'filled' },
        { from: [-1, -2], to: [2, 3], color: '#FFB800', strokeWidth: 3.5, startDot: 'none', endDot: 'filled' },
        { from: [2, 3], to: [5, 1], color: '#FFB800', strokeWidth: 3.5, startDot: 'none', endDot: 'filled' },
        // Rzuty na oś OX (Dziedzina Df)
        { from: [-4, -1], to: [-4, 0], color: '#38BDF8', dashed: true, strokeWidth: 1.5 },
        { from: [5, 1], to: [5, 0], color: '#38BDF8', dashed: true, strokeWidth: 1.5 },
        // Podświetlenie dziedziny Df bezpośrednio na osi OX
        { from: [-4, 0], to: [5, 0], color: '#38BDF8', strokeWidth: 5 },
        // Rzuty na oś OY (Zbiór wartości ZWf)
        { from: [-1, -2], to: [0, -2], color: '#10B981', dashed: true, strokeWidth: 1.5 },
        { from: [2, 3], to: [0, 3], color: '#10B981', dashed: true, strokeWidth: 1.5 },
        // Podświetlenie ZWf bezpośrednio na osi OY
        { from: [0, -2], to: [0, 3], color: '#10B981', strokeWidth: 5 }
      ],
      points: [
        { x: -4, y: -1, dot: 'filled', color: '#FFB800', label: '(-4, -1)', attach: 'sw' },
        { x: -1, y: -2, dot: 'filled', color: '#10B981', label: 'min: y = -2', attach: 's' },
        { x: 2, y: 3, dot: 'filled', color: '#FFB800', label: 'max: y = 3', attach: 'n' },
        { x: 5, y: 1, dot: 'filled', color: '#FFB800', label: '(5, 1)', attach: 'ne' },
        { x: -4, y: 0, dot: 'filled', color: '#38BDF8', label: 'x = -4', attach: 'nw' },
        { x: 5, y: 0, dot: 'filled', color: '#38BDF8', label: 'x = 5', attach: 'ne' },
        { x: 0, y: -2, dot: 'filled', color: '#10B981', label: 'y = -2', attach: 'w' },
        { x: 0, y: 3, dot: 'filled', color: '#10B981', label: 'y = 3', attach: 'w' }
      ],
      labels: [
        { x: 0.5, y: 0.35, text: 'Df = [-4, 5] (oś OX)', color: '#38BDF8', attach: 'n' },
        { x: -0.2, y: 0.8, text: 'ZWf = [-2, 3] (oś OY)', color: '#10B981', attach: 'w' }
      ]
    },
    metrics: [
      { label: 'Dziedzina $D_f$ (oś $OX$)', value: '$[-4, 5]$ (rzut poziomy)', color: '#38BDF8' },
      { label: 'Zbiór wartości $ZW_f$ (oś $OY$)', value: '$[-2, 3]$ (rzut pionowy)', color: '#10B981' },
      { label: 'Wartość minimalna', value: '$y_{\\min} = -2$ (dla $x = -1$)', color: '#10B981' },
      { label: 'Wartość maksymalna', value: '$y_{\\max} = 3$ (dla $x = 2$)', color: '#FFB800' }
    ]
  },

  // Lekcja 9.2: Miejsca zerowe oraz odczyt wartości funkcji f(x0) = y0 (Mafs PLOT)
  'lesson-9-2': {
    type: 'PLOT',
    title: 'Miejsca zerowe oraz odczyt wartości $f(x)$ z wykresu',
    formulaBadge: '$f(x) = 0 \\implies x \\in OX;\\quad P = (0, f(0)) \\in OY$',
    caption: 'Miejsca zerowe to punkty przecięcia wykresu z poziomą osią $OX$ ($y = 0$). Punkt $(0, f(0))$ to przecięcie z pionową osią $OY$ ($x = 0$).',
    plotData: {
      xRange: [-4, 5],
      yRange: [-4.5, 4.5],
      gridStep: 1,
      parabola: { a: 0.5, p: 0.5, q: -3.125, color: '#FFB800' },
      segments: [
        // Rzut punktu przecięcia z OY
        { from: [0, -3], to: [0, 0], color: '#38BDF8', dashed: true, strokeWidth: 1.5 },
        // Odczyt f(2) = -2.5: rzut poziomy i pionowy
        { from: [2, 0], to: [2, -2.5], color: '#38BDF8', dashed: true, strokeWidth: 1.5 },
        { from: [0, -2.5], to: [2, -2.5], color: '#38BDF8', dashed: true, strokeWidth: 1.5 }
      ],
      points: [
        { x: -2, y: 0, dot: 'filled', color: '#10B981', label: 'x₁ = -2', attach: 'nw' },
        { x: 3, y: 0, dot: 'filled', color: '#10B981', label: 'x₂ = 3', attach: 'ne' },
        { x: 0, y: -3, dot: 'filled', color: '#38BDF8', label: '(0, -3) [f(0) = -3]', attach: 'w' },
        { x: 2, y: -2.5, dot: 'filled', color: '#FFB800', label: '(2, -2.5) [f(2) = -2.5]', attach: 'se' }
      ],
      labels: [
        { x: -2, y: 0.7, text: 'Miejsce zerowe: f(-2) = 0', color: '#10B981', attach: 'n' },
        { x: 3, y: 0.7, text: 'Miejsce zerowe: f(3) = 0', color: '#10B981', attach: 'n' },
        { x: 1.8, y: -3.7, text: 'Wykres y = f(x)', color: '#FFB800', attach: 's' }
      ]
    },
    metrics: [
      { label: 'Miejsca zerowe', value: '$x_1 = -2,\\; x_2 = 3$ (sam argument $x$!)', color: '#10B981' },
      { label: 'Przecięcie z osią $OY$', value: '$(0, -3) \\implies f(0) = -3$', color: '#38BDF8' },
      { label: 'Odczyt wartości $f(2)$', value: '$f(2) = -2{,}5$', color: '#FFB800' },
      { label: 'Częsty błąd CKE', value: 'Miejsce zerowe to $x$, a nie punkt $(x, 0)$!', color: '#F43F5E' }
    ]
  },

  // Lekcja 9.3: Monotoniczność i przedziały (rośnie, maleje, stała – oś OX) (Mafs PLOT)
  'lesson-9-3': {
    type: 'PLOT',
    title: 'Przedziały monotoniczności: rosnąca, malejąca, stała',
    formulaBadge: '$f \\nearrow \\text{na } [-4, 1], \\quad f \\searrow \\text{na } [1, 5]$',
    caption: 'Monotoniczność śledzimy ZAWSZE od lewej do prawej. Przedziały monotoniczności to przedziały argumentów $x$ na osi $OX$, a NIE wartości na osi $OY$!',
    plotData: {
      xRange: [-5.5, 6.5],
      yRange: [-3, 5],
      gridStep: 1,
      segments: [
        // Odcinek rosnący: od (-4, -2) do (1, 4)
        { from: [-4, -2], to: [1, 4], color: '#10B981', strokeWidth: 3.5, startDot: 'filled', endDot: 'filled' },
        // Odcinek malejący: od (1, 4) do (5, 0)
        { from: [1, 4], to: [5, 0], color: '#F43F5E', strokeWidth: 3.5, startDot: 'none', endDot: 'filled' },
        // Rzuty na oś OX
        { from: [-4, -2], to: [-4, 0], color: '#10B981', dashed: true, strokeWidth: 1.5 },
        { from: [1, 4], to: [1, 0], color: '#FFB800', dashed: true, strokeWidth: 1.5 },
        // Podświetlenia przedziałów monotoniczności na osi OX
        { from: [-4, 0], to: [1, 0], color: '#10B981', strokeWidth: 5 },
        { from: [1, 0], to: [5, 0], color: '#F43F5E', strokeWidth: 5 }
      ],
      points: [
        { x: -4, y: -2, dot: 'filled', color: '#10B981', label: '(-4, -2)', attach: 'sw' },
        { x: 1, y: 4, dot: 'filled', color: '#FFB800', label: 'szczyt: (1, 4)', attach: 'n' },
        { x: 5, y: 0, dot: 'filled', color: '#F43F5E', label: '(5, 0)', attach: 'se' },
        { x: -4, y: 0, dot: 'filled', color: '#10B981', label: 'x = -4', attach: 'nw' },
        { x: 1, y: 0, dot: 'filled', color: '#FFB800', label: 'x = 1', attach: 's' },
        { x: 5, y: 0, dot: 'filled', color: '#F43F5E', label: 'x = 5', attach: 'ne' }
      ],
      labels: [
        { x: -1.5, y: 1.8, text: 'ROŚNIE (↗) na [-4, 1]', color: '#10B981', attach: 'nw' },
        { x: 3.3, y: 2.2, text: 'MALEJE (↘) na [1, 5]', color: '#F43F5E', attach: 'ne' },
        { x: -1.5, y: -0.5, text: 'przedział OX: [-4, 1]', color: '#10B981', attach: 's' },
        { x: 3, y: -0.5, text: 'przedział OX: [1, 5]', color: '#F43F5E', attach: 's' }
      ]
    },
    metrics: [
      { label: 'Funkcja rośnie (↗)', value: '$x \\in [-4, 1]$ (przedział na osi $OX$)', color: '#10B981' },
      { label: 'Funkcja maleje (↘)', value: '$x \\in [1, 5]$ (przedział na osi $OX$)', color: '#F43F5E' },
      { label: 'Maksimum lokalne', value: '$y_{\\max} = 4$ osiągane dla $x = 1$', color: '#FFB800' },
      { label: 'Główna pułapka CKE', value: 'Nie podawaj $y$! Przedziały to zawsze $x \\in OX$', color: '#F43F5E' }
    ]
  },

  // Lekcja 9.4: Rozwiązywanie równania f(x) = c z wykresu (Dział 9 Modułu 1)
  'lesson-9-4': {
    type: 'PLOT',
    title: 'Rozwiązywanie równania $f(x) = c$',
    formulaBadge: '$f(x) = c \\implies \\text{punkty przecięcia z prostą } y = c$',
    caption: 'Liczba rozwiązań równania $f(x)=c$ to liczba punktów wspólnych wykresu funkcji $y=f(x)$ i poziomej prostej $y=c$.',
    plotData: {
      xRange: [-4.5, 4.5],
      yRange: [-2.5, 3.5],
      gridStep: 1,
      // f(x) = 0.2*(x^3 - 9x) + 1 -> roots at -3, 0, 3 when y = 1
      fn: (x: number) => 0.2 * (Math.pow(x, 3) - 9 * x) + 1,
      fnColor: '#FFB800',
      fnWeight: 3,
      horizontalLines: [
        { y: 1, color: '#38BDF8', dashed: true }
      ],
      segments: [
        { from: [-3, 1], to: [-3, 0], color: '#F43F5E', dashed: true },
        { from: [3, 1], to: [3, 0], color: '#F43F5E', dashed: true }
      ],
      points: [
        { x: -3, y: 1, dot: 'filled', color: '#F43F5E', label: 'x₁ = -3', attach: 'nw' },
        { x: 0, y: 1, dot: 'filled', color: '#F43F5E', label: 'x₂ = 0', attach: 'ne' },
        { x: 3, y: 1, dot: 'filled', color: '#F43F5E', label: 'x₃ = 3', attach: 'ne' },
        { x: -3, y: 0, dot: 'filled', color: '#38BDF8' },
        { x: 0, y: 0, dot: 'filled', color: '#38BDF8' },
        { x: 3, y: 0, dot: 'filled', color: '#38BDF8' }
      ],
      labels: [
        { x: 3.8, y: 1.35, text: 'y = c', color: '#38BDF8', attach: 'n' }
      ]
    },
    metrics: [
      { label: 'Równanie', value: '$f(x) = c$', color: '#FFB800' },
      { label: 'Liczba rozwiązań', value: '3 rozwiązania ($x_1, x_2, x_3$)', color: '#38BDF8' },
      { label: 'Pozioma prosta', value: '$y = c$', color: '#10B981' }
    ]
  },

  // Lekcja 10.1: Wzór kierunkowy funkcji liniowej: rola a i b (Dział 10 Modułu 1)
  'lesson-10-1': {
    type: 'PLOT',
    title: 'Wzór kierunkowy funkcji liniowej: $y = ax + b$',
    formulaBadge: '$y = ax + b \\quad (a = \\text{nachylenie / monotoniczność},\\; b = \\text{przecięcie z } OY)$',
    caption: 'Współczynnik $a$ określa monotoniczność: $a > 0$ funkcja rośnie, $a < 0$ maleje, $a = 0$ jest stała. Wyraz wolny $b$ to zawsze punkt przecięcia wykresu z osią $OY$: $(0, b)$.',
    plotData: {
      xRange: [-4, 5],
      yRange: [-3, 5],
      gridStep: 1,
      lines: [
        { slope: 0.75, intercept: 1.5, color: '#FFB800' },
        { slope: -0.6, intercept: 0.5, color: 'rgba(244, 63, 94, 0.4)', dashed: true }
      ],
      points: [
        { x: 0, y: 1.5, dot: 'filled', color: '#10B981', label: '(0, b) = (0, 1.5)', attach: 'nw' },
        { x: -2, y: 0, dot: 'filled', color: '#38BDF8', label: 'x₀ = -2', attach: 'se' }
      ],
      labels: [
        { x: 3, y: 4, text: 'y = ax + b (a > 0)', color: '#FFB800', attach: 'nw' },
        { x: 3, y: -1.5, text: 'a < 0 (malejąca)', color: '#F43F5E', attach: 'nw' }
      ]
    },
    metrics: [
      { label: 'Współczynnik kierunkowy a', value: '$a > 0 \\implies$ rosnąca', color: '#FFB800' },
      { label: 'Wyraz wolny b', value: '$(0, b) = (0; 1{,}5)$', color: '#10B981' },
      { label: 'Miejsce zerowe', value: '$x_0 = -\\frac{b}{a} = -2$', color: '#38BDF8' }
    ]
  },

  // Lekcja 10.2: Wyznaczanie wzoru prostej przez dwa punkty i miejsce zerowe (Mafs PLOT)
  'lesson-10-2': {
    type: 'PLOT',
    title: 'Współczynnik kierunkowy prostej przez dwa punkty: $A$ i $B$',
    formulaBadge: '$a = \\frac{y_B - y_A}{x_B - x_A} = \\frac{\\Delta y}{\\Delta x},\\quad x_0 = -\\frac{b}{a}$',
    caption: 'Współczynnik kierunkowy $a$ to stosunek przyrostu pionowego $\\Delta y$ do poziomego $\\Delta x$ (trójkąt schodkowy). Miejsce zerowe $x_0$ to punkt przecięcia z osią $OX$.',
    plotData: {
      xRange: [-2.5, 4.5],
      yRange: [-2.5, 6],
      gridStep: 1,
      lines: [
        { slope: 2, intercept: -1, color: '#38BDF8', label: 'y = 2x - 1' }
      ],
      segments: [
        // Trójkąt schodkowy Delta x i Delta y
        { from: [1, 1], to: [3, 1], color: '#FFB800', strokeWidth: 2, dashed: true },
        { from: [3, 1], to: [3, 5], color: '#10B981', strokeWidth: 2, dashed: true }
      ],
      points: [
        { x: 1, y: 1, dot: 'filled', color: '#38BDF8', label: 'A(1, 1)', attach: 'nw' },
        { x: 3, y: 5, dot: 'filled', color: '#38BDF8', label: 'B(3, 5)', attach: 'nw' },
        { x: 0, y: -1, dot: 'filled', color: '#F43F5E', label: '(0, b) = (0, -1)', attach: 'w' },
        { x: 0.5, y: 0, dot: 'filled', color: '#10B981', label: 'x₀ = 0.5', attach: 'se' }
      ],
      labels: [
        { x: 2, y: 0.65, text: 'Δx = 3 - 1 = 2', color: '#FFB800', attach: 's' },
        { x: 3.3, y: 3, text: 'Δy = 5 - 1 = 4', color: '#10B981', attach: 'w' },
        { x: 1.5, y: 3.5, text: 'a = 4 / 2 = 2', color: '#38BDF8', attach: 'nw' }
      ]
    },
    metrics: [
      { label: 'Współczynnik $a$', value: '$a = \\frac{5 - 1}{3 - 1} = \\frac{4}{2} = 2$', color: '#38BDF8' },
      { label: 'Wyraz wolny $b$', value: '$b = -1$ (punkt $(0, -1)$ na $OY$)', color: '#F43F5E' },
      { label: 'Wzór prostej', value: '$y = 2x - 1$', color: '#FFB800' },
      { label: 'Miejsce zerowe', value: '$x_0 = -\\frac{-1}{2} = 0{,}5$', color: '#10B981' }
    ]
  },

  // Lekcja 10.3: Warunek równoległości i prostopadłości prostych (Mafs PLOT - 2 Panele)
  'lesson-10-3': {
    type: 'PLOT',
    title: 'Warunek równoległości i prostopadłości prostych',
    formulaBadge: '$k \\parallel l: a_1 = a_2,\\quad k \\perp m: a_1 \\cdot a_2 = -1$',
    caption: 'Proste równoległe mają identyczny współczynnik kierunkowy ($a_1 = a_2$). Proste prostopadłe mają współczynniki przeciwne i odwrotne ($a_1 \\cdot a_2 = -1$).',
    plotData: {
      panels: [
        {
          title: 'Proste równoległe: k ∥ l (a₁ = a₂)',
          badge: 'a₁ = a₂ = 1.5',
          badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-400/40',
          subtitle: 'Identyczny kąt nachylenia do osi OX',
          plot: {
            xRange: [-3, 4],
            yRange: [-3, 5],
            gridStep: 1,
            lines: [
              { slope: 1.5, intercept: 1, color: '#38BDF8', label: 'k: y = 1.5x + 1' },
              { slope: 1.5, intercept: -2, color: '#FFB800', label: 'l: y = 1.5x - 2' }
            ],
            points: [
              { x: 0, y: 1, dot: 'filled', color: '#38BDF8', label: '(0, 1)', attach: 'nw' },
              { x: 0, y: -2, dot: 'filled', color: '#FFB800', label: '(0, -2)', attach: 'nw' }
            ],
            labels: [
              { x: -1, y: 2.5, text: 'k ∥ l', color: '#38BDF8', attach: 'nw' }
            ]
          }
        },
        {
          title: 'Proste prostopadłe: k ⊥ m (a₁ · a₂ = -1)',
          badge: 'a₁ · a₂ = 2 · (-0.5) = -1',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40',
          subtitle: 'Kąt prosty (90°) w punkcie przecięcia',
          plot: {
            xRange: [-3, 4],
            yRange: [-3, 5],
            gridStep: 1,
            lines: [
              { slope: 2, intercept: -1, color: '#38BDF8', label: 'k: y = 2x - 1' },
              { slope: -0.5, intercept: 1.5, color: '#10B981', label: 'm: y = -0.5x + 1.5' }
            ],
            points: [
              { x: 1, y: 1, dot: 'filled', color: '#FFB800', label: 'P(1, 1) [kąt 90°]', attach: 'ne' }
            ],
            labels: [
              { x: -1.5, y: -1.5, text: 'k ⊥ m', color: '#10B981', attach: 'sw' }
            ]
          }
        }
      ]
    },
    metrics: [
      { label: 'Warunek równoległości', value: '$a_1 = a_2$ (identyczne nachylenie)', color: '#38BDF8' },
      { label: 'Warunek prostopadłości', value: '$a_1 \\cdot a_2 = -1 \\longrightarrow a_2 = -\\frac{1}{a_1}$', color: '#10B981' },
      { label: 'Przykład liczb', value: '$a_1 = 2 \\implies a_2 = -\\frac{1}{2}$', color: '#FFB800' },
      { label: 'Rola wyrazu wolnego b', value: 'Wyraz wolny $b$ może być dowolny!', color: '#94A3B8' }
    ]
  },

  // Lekcja 10.4: Własności i znaki a i b w ćwiartkach układu (Mafs PLOT - 2 Panele)
  'lesson-10-4': {
    type: 'PLOT',
    title: 'Własności funkcji liniowej: Znaki $a$ i $b$ a ćwiartki układu',
    formulaBadge: '$y = ax + b \\implies \\text{przebieg przez ćwiartki I, II, III, IV}$',
    caption: 'Znak współczynnika $a$ decyduje o kierunku (rosnąca/malejąca), a znak $b$ o wysokości przecięcia z osią $OY$. Razem determinują one ćwiartki, przez które przechodzi prosta.',
    plotData: {
      panels: [
        {
          title: 'a > 0 oraz b < 0 (ćwiartki I, III, IV)',
          badge: 'a > 0, b < 0 (omija ćw. II)',
          badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-400/40',
          subtitle: 'Prosta rośnie i przecina OY poniżej osi OX',
          plot: {
            xRange: [-3, 4],
            yRange: [-3, 4],
            gridStep: 1,
            lines: [
              { slope: 1.2, intercept: -1.5, color: '#FFB800', label: 'y = 1.2x - 1.5' }
            ],
            points: [
              { x: 0, y: -1.5, dot: 'filled', color: '#F43F5E', label: 'b < 0 (0, -1.5)', attach: 'w' },
              { x: 1.25, y: 0, dot: 'filled', color: '#10B981', label: 'x₀ > 0', attach: 'se' }
            ],
            labels: [
              { x: 2.5, y: 2, text: 'ćw. I', color: '#94A3B8', attach: 'n' },
              { x: -1.8, y: 2, text: 'ćw. II [BRAK]', color: '#F43F5E', attach: 'n' },
              { x: -1.8, y: -2, text: 'ćw. III', color: '#94A3B8', attach: 's' },
              { x: 2.5, y: -2, text: 'ćw. IV', color: '#94A3B8', attach: 's' }
            ]
          }
        },
        {
          title: 'a < 0 oraz b > 0 (ćwiartki I, II, IV)',
          badge: 'a < 0, b > 0 (omija ćw. III)',
          badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-400/40',
          subtitle: 'Prosta maleje i przecina OY powyżej osi OX',
          plot: {
            xRange: [-3, 4],
            yRange: [-2, 5],
            gridStep: 1,
            lines: [
              { slope: -1, intercept: 2, color: '#38BDF8', label: 'y = -x + 2' }
            ],
            points: [
              { x: 0, y: 2, dot: 'filled', color: '#10B981', label: 'b > 0 (0, 2)', attach: 'w' },
              { x: 2, y: 0, dot: 'filled', color: '#FFB800', label: 'x₀ > 0', attach: 'se' }
            ],
            labels: [
              { x: 2, y: 3.5, text: 'ćw. I', color: '#94A3B8', attach: 'n' },
              { x: -1.8, y: 2, text: 'ćw. II', color: '#94A3B8', attach: 'n' },
              { x: -1.8, y: -1, text: 'ćw. III [BRAK]', color: '#F43F5E', attach: 's' },
              { x: 2.5, y: -1, text: 'ćw. IV', color: '#94A3B8', attach: 's' }
            ]
          }
        }
      ]
    },
    metrics: [
      { label: '$a > 0$ (rosnąca)', value: 'Wykres wznosi się od lewej do prawej', color: '#FFB800' },
      { label: '$a < 0$ (malejąca)', value: 'Wykres opada od lewej do prawej', color: '#38BDF8' },
      { label: '$b > 0$', value: 'Przecięcie $OY$ w górnej półpłaszczyźnie', color: '#10B981' },
      { label: '$b < 0$', value: 'Przecięcie $OY$ w dolnej półpłaszczyźnie', color: '#F43F5E' }
    ]
  },

  // Archetyp geometryczny: Trygonometria w trójkącie prostokątnym
  'geo-archetype-trigonometry': {
    type: 'TRIGONOMETRY',
    title: 'Trygonometria kąta ostrego w trójkącie prostokątnym',
    formulaBadge: '$\\sin\\alpha = \\frac{a}{c},\\quad \\cos\\alpha = \\frac{b}{c},\\quad \\operatorname{tg}\\alpha = \\frac{a}{b}$',
    caption: 'Bok $a$ to przyprostokątna naprzeciw kąta $\\alpha$, $b$ leży przy kącie $\\alpha$, a $c$ to przeciwprostokątna.',
    width: 540,
    height: 270,
    polygons: [
      {
        points: [[100, 220], [400, 220], [400, 60]],
        fill: 'rgba(255, 184, 0, 0.07)',
        stroke: '#FFB800',
        strokeWidth: 2.5
      }
    ],
    segments: [
      { from: [380, 220], to: [380, 200], color: '#10B981', strokeWidth: 1.5 },
      { from: [380, 200], to: [400, 200], color: '#10B981', strokeWidth: 1.5 },
      { from: [100, 220], to: [400, 220], color: '#38BDF8', strokeWidth: 0.1, label: 'b (przy kącie α)' },
      { from: [400, 220], to: [400, 60], color: '#F43F5E', strokeWidth: 0.1, label: 'a (naprzeciw α)' },
      { from: [100, 220], to: [400, 60], color: '#FFB800', strokeWidth: 0.1, label: 'c (przeciwprostokątna)' }
    ],
    arcs: [
      { cx: 100, cy: 220, r: 50, startAngleDeg: 62, endAngleDeg: 90, color: '#10B981', label: 'α' },
      { cx: 390, cy: 210, r: 2, startAngleDeg: 0, endAngleDeg: 360, color: '#10B981' }
    ],
    points: [
      { x: 100, y: 220, dot: 'filled', color: '#10B981', label: 'A', labelPosition: 'bottom-left' },
      { x: 400, y: 220, dot: 'filled', color: '#10B981', label: 'C (90°)', labelPosition: 'bottom-right' },
      { x: 400, y: 60, dot: 'filled', color: '#FFB800', label: 'B', labelPosition: 'top' }
    ],
    metrics: [
      { label: 'Sinus kąta', value: '$\\sin\\alpha = \\frac{a}{c}$', color: '#FFB800' },
      { label: 'Cosinus kąta', value: '$\\cos\\alpha = \\frac{b}{c}$', color: '#38BDF8' },
      { label: 'Tangens kąta', value: '$\\operatorname{tg}\\alpha = \\frac{a}{b}$', color: '#10B981' },
      { label: 'Tw. Pitagorasa', value: '$a^2 + b^2 = c^2$', color: '#F43F5E' }
    ]
  },

  // Archetyp geometryczny: Kąty wpisane i środkowe w okręgu
  'geo-archetype-inscribed-angles': {
    type: 'GEOMETRY_2D',
    title: 'Kąty w okręgu oparte na tym samym łuku $AB$',
    formulaBadge: '$\\beta = 2\\alpha \\implies \\alpha = \\frac{1}{2}\\beta$',
    caption: 'Kąt środkowy $\\beta$ ma wierzchołek w środku okręgu $O$ i jest 2 razy większy od kąta wpisanego $\\alpha$ opartego na tym samym łuku.',
    width: 540,
    height: 280,
    circles: [
      { cx: 270, cy: 145, r: 112, stroke: '#64748B', strokeWidth: 2 }
    ],
    polygons: [
      // Kąt środkowy (trójkąt A-O-B)
      { points: [[190, 225], [270, 145], [350, 225]], fill: 'rgba(56, 189, 248, 0.12)', stroke: '#38BDF8', strokeWidth: 2 },
      // Kąt wpisany (trójkąt A-C-B)
      { points: [[190, 225], [270, 33], [350, 225]], fill: 'rgba(255, 184, 0, 0.08)', stroke: '#FFB800', strokeWidth: 2 }
    ],
    arcs: [
      { cx: 270, cy: 145, r: 28, startAngleDeg: 135, endAngleDeg: 225, color: '#38BDF8', label: 'β = 2α' },
      { cx: 270, cy: 33, r: 35, startAngleDeg: 145, endAngleDeg: 215, color: '#FFB800', label: 'α' }
    ],
    segments: [
      { from: [190, 225], to: [350, 225], color: '#10B981', strokeWidth: 3.5, label: 'wspólny łuk AB' }
    ],
    points: [
      { x: 270, y: 145, dot: 'filled', color: '#38BDF8', label: 'O (środek)', labelPosition: 'top' },
      { x: 270, y: 33, dot: 'filled', color: '#FFB800', label: 'C (wpisany)', labelPosition: 'top' },
      { x: 190, y: 225, dot: 'filled', color: '#10B981', label: 'A', labelPosition: 'bottom-left' },
      { x: 350, y: 225, dot: 'filled', color: '#10B981', label: 'B', labelPosition: 'bottom-right' }
    ],
    metrics: [
      { label: 'Kąt środkowy', value: '$\\beta = 2\\alpha$', color: '#38BDF8' },
      { label: 'Kąt wpisany', value: '$\\alpha = \\frac{1}{2}\\beta$', color: '#FFB800' },
      { label: 'Wspólny łuk', value: 'łuk $AB$', color: '#10B981' },
      { label: 'Relacja CKE', value: '$\\beta = 2 \\cdot \\alpha$', color: '#F43F5E' }
    ]
  },

  // Lekcja 9.6: Planimetria: Twierdzenie Talesa
  'lesson-9-6': {
    type: 'GEOMETRY_2D',
    title: 'Twierdzenie Talesa: proporcje odcinków',
    formulaBadge: '$\\frac{a}{b} = \\frac{c}{d} \\implies a \\cdot d = b \\cdot c$',
    caption: 'Proste równoległe $k \\parallel l$ przecinające ramiona kąta wyznaczają na nich odcinki proporcjonalne.',
    width: 540,
    height: 270,
    segments: [
      // Ramiona kąta z wierzchołka O
      { from: [60, 200], to: [480, 230], color: '#94A3B8', strokeWidth: 2 },
      { from: [60, 200], to: [440, 45], color: '#94A3B8', strokeWidth: 2 },
      // Prosta równoległa k
      { from: [200, 240], to: [180, 70], color: '#38BDF8', strokeWidth: 2, label: 'prosta k' },
      // Prosta równoległa l
      { from: [360, 245], to: [320, 35], color: '#38BDF8', strokeWidth: 2, label: 'prosta l (k ∥ l)' },
      // Odcinki a, b, c, d
      { from: [60, 200], to: [197, 210], color: '#FFB800', strokeWidth: 3.5, label: 'a' },
      { from: [197, 210], to: [356, 221], color: '#10B981', strokeWidth: 3.5, label: 'b' },
      { from: [60, 200], to: [188, 148], color: '#FFB800', strokeWidth: 3.5, label: 'c' },
      { from: [188, 148], to: [332, 89], color: '#10B981', strokeWidth: 3.5, label: 'd' }
    ],
    points: [
      { x: 60, y: 200, dot: 'filled', color: '#CBD5E1', label: 'O', labelPosition: 'left' },
      { x: 197, y: 210, dot: 'filled', color: '#38BDF8', label: 'A', labelPosition: 'bottom' },
      { x: 356, y: 221, dot: 'filled', color: '#38BDF8', label: 'B', labelPosition: 'bottom' },
      { x: 188, y: 148, dot: 'filled', color: '#38BDF8', label: 'C', labelPosition: 'top' },
      { x: 332, y: 89, dot: 'filled', color: '#38BDF8', label: 'D', labelPosition: 'top' }
    ],
    metrics: [
      { label: 'Proporcja Talesa', value: '$\\frac{a}{b} = \\frac{c}{d}$', color: '#FFB800' },
      { label: 'Iloczyn krzyżowy', value: '$a \\cdot d = b \\cdot c$', color: '#10B981' },
      { label: 'Założenie', value: '$k \\parallel l$', color: '#38BDF8' },
      { label: 'Wierzchołek kąta', value: 'punkt $O$', color: '#CBD5E1' }
    ]
  },

};

// =========================================================================
// 2. BAZA WYKRESÓW DLA ZADAŃ MATURALNYCH (SELF-HEALING TASK REGISTRY)
// =========================================================================

export const TASK_VISUALS: Record<string, PlotData | MathDiagramData> = {
  // Wiązka Zadanie 11 (Matura Maj 2024 - f(-2)=3)
  'task-4-05-09': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-6, 6],
    yRange: [-4, 5],
    gridStep: 1,
    segments: [
      { from: [-5, 0], to: [-2, 3], startDot: 'filled', endDot: 'filled', color: '#10B981' },
      { from: [-2, 3], to: [1, -3], startDot: 'none', endDot: 'filled', color: '#10B981' },
      { from: [1, -3], to: [4, 0], startDot: 'none', endDot: 'filled', color: '#10B981' }
    ],
    points: [
      { x: -5, y: 0, label: '(-5,0)', dot: 'filled' },
      { x: -2, y: 3, label: '(-2,3)', dot: 'filled' },
      { x: 1, y: -3, label: '(1,-3)', dot: 'filled' },
      { x: 4, y: 0, label: '(4,0)', dot: 'filled' }
    ]
  },
  'task-4-05-10': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-6, 6],
    yRange: [-4, 5],
    gridStep: 1,
    segments: [
      { from: [-5, 0], to: [-2, 3], startDot: 'filled', endDot: 'filled', color: '#10B981' },
      { from: [-2, 3], to: [1, -3], startDot: 'none', endDot: 'filled', color: '#10B981' },
      { from: [1, -3], to: [4, 0], startDot: 'none', endDot: 'filled', color: '#10B981' }
    ],
    points: [
      { x: -5, y: 0, label: '(-5,0)', dot: 'filled' },
      { x: -2, y: 3, label: '(-2,3)', dot: 'filled' },
      { x: 1, y: -3, label: '(1,-3)', dot: 'filled' },
      { x: 4, y: 0, label: '(4,0)', dot: 'filled' }
    ]
  },
  'task-4-05-11': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-6, 6],
    yRange: [-4, 5],
    gridStep: 1,
    segments: [
      { from: [-5, 0], to: [-2, 3], startDot: 'filled', endDot: 'filled', color: '#10B981' },
      { from: [-2, 3], to: [1, -3], startDot: 'none', endDot: 'filled', color: '#10B981' },
      { from: [1, -3], to: [4, 0], startDot: 'none', endDot: 'filled', color: '#10B981' }
    ],
    points: [
      { x: -5, y: 0, label: '(-5,0)', dot: 'filled' },
      { x: -2, y: 3, label: '(-2,3)', dot: 'filled' },
      { x: 1, y: -3, label: '(1,-3)', dot: 'filled' },
      { x: 4, y: 0, label: '(4,0)', dot: 'filled' }
    ]
  },
  'task-4-05-16': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-6, 6],
    yRange: [-4, 5],
    gridStep: 1,
    segments: [
      { from: [-5, 0], to: [-2, 3], startDot: 'filled', endDot: 'filled', color: '#10B981' },
      { from: [-2, 3], to: [1, -3], startDot: 'none', endDot: 'filled', color: '#10B981' },
      { from: [1, -3], to: [4, 0], startDot: 'none', endDot: 'filled', color: '#10B981' }
    ],
    points: [
      { x: -5, y: 0, label: '(-5,0)', dot: 'filled' },
      { x: -2, y: 3, label: '(-2,3)', dot: 'filled' },
      { x: 1, y: -3, label: '(1,-3)', dot: 'filled' },
      { x: 4, y: 0, label: '(4,0)', dot: 'filled' }
    ]
  },
  'task-4-04-14': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-4, 6],
    yRange: [-3, 4],
    gridStep: 1,
    segments: [
      { from: [-3, -2], to: [-1, 2], startDot: 'filled', endDot: 'none' },
      { from: [-1, 2], to: [2, 2], startDot: 'none', endDot: 'none' },
      { from: [2, 2], to: [5, -1], startDot: 'none', endDot: 'filled' }
    ],
    points: [
      { x: -3, y: -2, label: '(-3,-2)', dot: 'filled' },
      { x: -1, y: 2, label: '(-1,2)', dot: 'filled' },
      { x: 2, y: 2, label: '(2,2)', dot: 'filled' },
      { x: 5, y: -1, label: '(5,-1)', dot: 'filled' }
    ]
  },
  'task-4-08-10': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-6, 6],
    yRange: [-4, 5],
    gridStep: 1,
    segments: [
      { from: [-5, 0], to: [-2, 3], startDot: 'filled', endDot: 'filled', color: '#10B981' },
      { from: [-2, 3], to: [1, -3], startDot: 'none', endDot: 'filled', color: '#10B981' },
      { from: [1, -3], to: [4, 0], startDot: 'none', endDot: 'filled', color: '#10B981' }
    ],
    points: [
      { x: -5, y: 0, label: '(-5,0)', dot: 'filled' },
      { x: -2, y: 3, label: '(-2,3)', dot: 'filled' },
      { x: 1, y: -3, label: '(1,-3)', dot: 'filled' },
      { x: 4, y: 0, label: '(4,0)', dot: 'filled' }
    ]
  },

  // Zadanie 5.14.1 (Układ równań z przecięciem prostych)
  'task-5-14-1': {
    type: 'LINEAR',
    xRange: [-2, 6],
    yRange: [-5, 3],
    gridStep: 1,
    lines: [
      { slope: 1, intercept: -5, domain: [-1, 5.5], color: '#38BDF8', label: 'k: y = x - 5' },
      { slope: -1, intercept: 1, domain: [-1, 5.5], color: '#FFB800', label: 'l: y = -x + 1' }
    ],
    points: [
      { x: 3, y: -2, label: 'P = (3, -2)', dot: 'filled', color: '#F43F5E' }
    ]
  },

  // Zadanie 6.14.8 (Parabola ze znakami współczynników)
  'task-6-14-8': {
    type: 'PARABOLA',
    xRange: [-2, 6],
    yRange: [-4, 5],
    gridStep: 1,
    parabola: {
      a: 0.5,
      p: 2.5,
      q: -2.5,
      domain: [-1.2, 6.2],
      color: '#FFB800'
    },
    axisOfSymmetry: 2.5,
    points: [
      { x: 2.5, y: -2.5, label: 'W = (p, q)', dot: 'filled', color: '#38BDF8' },
      { x: 0, y: 0.625, label: '(0, c)', dot: 'filled', color: '#10B981' }
    ]
  },

  // Zadanie 9.6.6 (Twierdzenie Talesa)
  'task-9-6-6': {
    type: 'GEOMETRY_2D',
    title: 'Twierdzenie Talesa: wyznaczanie $x$',
    caption: 'Proste $k$ i $l$ są równoległe ($k \\parallel l$). Z proporcji Talesa wyznaczamy szukaną długość $x = 6$.',
    formulaBadge: '$\\frac{4}{x} = \\frac{6}{9} \\implies 6x = 36 \\implies x = 6$',
    width: 540,
    height: 270,
    segments: [
      { from: [60, 200], to: [480, 230], color: '#94A3B8', strokeWidth: 2 },
      { from: [60, 200], to: [440, 45], color: '#94A3B8', strokeWidth: 2 },
      { from: [200, 240], to: [180, 70], color: '#38BDF8', strokeWidth: 2, label: 'prosta k' },
      { from: [360, 245], to: [320, 35], color: '#38BDF8', strokeWidth: 2, label: 'prosta l (k ∥ l)' },
      { from: [60, 200], to: [197, 210], color: '#FFB800', strokeWidth: 3.5, label: 'a = 4' },
      { from: [197, 210], to: [356, 221], color: '#10B981', strokeWidth: 3.5, label: 'b = x' },
      { from: [60, 200], to: [188, 148], color: '#FFB800', strokeWidth: 3.5, label: 'c = 6' },
      { from: [188, 148], to: [332, 89], color: '#10B981', strokeWidth: 3.5, label: 'd = 9' }
    ],
    points: [
      { x: 60, y: 200, dot: 'filled', color: '#CBD5E1', label: 'O', labelPosition: 'left' },
      { x: 197, y: 210, dot: 'filled', color: '#38BDF8', label: 'A', labelPosition: 'bottom' },
      { x: 356, y: 221, dot: 'filled', color: '#38BDF8', label: 'B', labelPosition: 'bottom' },
      { x: 188, y: 148, dot: 'filled', color: '#38BDF8', label: 'C', labelPosition: 'top' },
      { x: 332, y: 89, dot: 'filled', color: '#38BDF8', label: 'D', labelPosition: 'top' }
    ]
  },



  // ----------------------------------------------------
  // DZIAŁ 9: WŁASNOŚCI FUNKCJI (WYKRESY MAFS)
  // ----------------------------------------------------
  'task-9-1-2': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-5, 6],
    yRange: [-3, 5],
    gridStep: 1,
    segments: [
      { from: [-4, -1], to: [-1, -2], startDot: 'filled', endDot: 'filled', color: '#38BDF8' },
      { from: [-1, -2], to: [3, 4], startDot: 'none', endDot: 'filled', color: '#38BDF8' },
      { from: [3, 4], to: [5, 3], startDot: 'none', endDot: 'filled', color: '#38BDF8' }
    ],
    points: [
      { x: -4, y: -1, label: '(-4, -1)', dot: 'filled', color: '#38BDF8', attach: 'sw' },
      { x: -1, y: -2, label: '(-1, -2)', dot: 'filled', color: '#10B981', attach: 's' },
      { x: 3, y: 4, label: '(3, 4)', dot: 'filled', color: '#FFB800', attach: 'n' },
      { x: 5, y: 3, label: '(5, 3)', dot: 'filled', color: '#38BDF8', attach: 'ne' }
    ]
  },
  'task-9-1-3': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-5, 6],
    yRange: [-1, 6],
    gridStep: 1,
    segments: [
      { from: [-3, 1], to: [1, 2], startDot: 'filled', endDot: 'none', color: '#38BDF8' },
      { from: [1, 2], to: [4, 5], startDot: 'none', endDot: 'hollow', color: '#38BDF8' }
    ],
    points: [
      { x: -3, y: 1, label: '(-3, 1)', dot: 'filled', color: '#10B981', attach: 'sw' },
      { x: 4, y: 5, label: '(4, 5)', dot: 'hollow', color: '#F43F5E', attach: 'ne' }
    ]
  },
  'task-9-2-2': {
    type: 'PARABOLA',
    xRange: [-4, 5],
    yRange: [-7, 2],
    gridStep: 1,
    parabola: {
      a: 1,
      p: 0.5,
      q: -6.25,
      color: '#38BDF8',
      domain: [-3.5, 4.5]
    },
    points: [
      { x: -2, y: 0, label: '(-2, 0)', dot: 'filled', color: '#10B981', attach: 'nw' },
      { x: 3, y: 0, label: '(3, 0)', dot: 'filled', color: '#10B981', attach: 'ne' },
      { x: 0, y: -6, label: '(0, -6)', dot: 'filled', color: '#FFB800', attach: 'e' }
    ]
  },
  'task-9-2-3': {
    type: 'LINEAR',
    xRange: [-2, 5],
    yRange: [-5, 2],
    gridStep: 1,
    segments: [
      { from: [2, 0], to: [2, -3], color: 'rgba(148, 163, 184, 0.4)', strokeWidth: 1.5, dashed: true },
      { from: [0, -3], to: [2, -3], color: 'rgba(148, 163, 184, 0.4)', strokeWidth: 1.5, dashed: true }
    ],
    points: [
      { x: 2, y: -3, label: 'P(2, -3)', dot: 'filled', color: '#38BDF8', attach: 'se' }
    ]
  },
  'task-9-3-2': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-4, 6],
    yRange: [-3, 5],
    gridStep: 1,
    segments: [
      { from: [-3, -2], to: [1, 4], startDot: 'filled', endDot: 'filled', color: '#10B981', strokeWidth: 3.5 },
      { from: [1, 4], to: [5, 0], startDot: 'none', endDot: 'filled', color: '#F43F5E', strokeWidth: 3.5 }
    ],
    points: [
      { x: -3, y: -2, label: '(-3, -2)', dot: 'filled', color: '#10B981', attach: 'sw' },
      { x: 1, y: 4, label: '(1, 4)', dot: 'filled', color: '#FFB800', attach: 'n' },
      { x: 5, y: 0, label: '(5, 0)', dot: 'filled', color: '#F43F5E', attach: 'se' }
    ]
  },
  'task-9-3-4': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-4, 6],
    yRange: [-2, 5],
    gridStep: 1,
    segments: [
      { from: [-3, 0], to: [-1, 3], startDot: 'filled', endDot: 'filled', color: '#38BDF8' },
      { from: [-1, 3], to: [3, 3], startDot: 'filled', endDot: 'filled', color: '#FFB800', strokeWidth: 3.5 },
      { from: [3, 3], to: [5, 1], startDot: 'filled', endDot: 'filled', color: '#38BDF8' }
    ],
    points: [
      { x: 1, y: 3, label: 'y = 3', dot: 'none', color: '#FFB800', attach: 'n' }
    ]
  },
  'task-9-1-4-2': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-5, 6],
    yRange: [-3, 5],
    gridStep: 1,
    segments: [
      { from: [-4, 2], to: [-2, -2], startDot: 'filled', endDot: 'filled', color: '#38BDF8' },
      { from: [-2, -2], to: [2, 3], startDot: 'none', endDot: 'filled', color: '#38BDF8' },
      { from: [2, 3], to: [5, -2], startDot: 'none', endDot: 'filled', color: '#38BDF8' }
    ],
    lines: [
      { slope: 0, intercept: -1, color: '#FFB800', label: 'y = -1' }
    ],
    points: [
      { x: -2.667, y: -1, label: 'P₁', dot: 'filled', color: '#10B981', attach: 'nw' },
      { x: -0.75, y: -1, label: 'P₂', dot: 'filled', color: '#10B981', attach: 'se' },
      { x: 4.4, y: -1, label: 'P₃', dot: 'filled', color: '#10B981', attach: 'ne' }
    ]
  },
  'task-9-1-4-5': {
    type: 'PIECEWISE_LINEAR',
    xRange: [-5, 7],
    yRange: [-3, 4],
    gridStep: 1,
    segments: [
      { from: [-4, -2], to: [-3, 0], startDot: 'filled', endDot: 'filled', color: '#38BDF8' },
      { from: [-3, 0], to: [-1, 3], startDot: 'filled', endDot: 'filled', color: '#38BDF8' },
      { from: [-1, 3], to: [1, 0], startDot: 'filled', endDot: 'filled', color: '#38BDF8' },
      { from: [1, 0], to: [3, -2], startDot: 'filled', endDot: 'filled', color: '#38BDF8' },
      { from: [3, -2], to: [5, 0], startDot: 'filled', endDot: 'filled', color: '#38BDF8' },
      { from: [5, 0], to: [6, 2], startDot: 'filled', endDot: 'filled', color: '#38BDF8' }
    ],
    points: [
      { x: -3, y: 0, label: 'x₁ = -3', dot: 'filled', color: '#10B981', attach: 'nw' },
      { x: 1, y: 0, label: 'x₂ = 1', dot: 'filled', color: '#10B981', attach: 'ne' },
      { x: 5, y: 0, label: 'x₃ = 5', dot: 'filled', color: '#10B981', attach: 'ne' }
    ]
  },

  // ----------------------------------------------------
  // DZIAŁ 10: FUNKCJA LINIOWA (WYKRESY PROSTYCH MAFS)
  // ----------------------------------------------------
  'task-10-1-3': {
    type: 'LINEAR',
    xRange: [-3, 5],
    yRange: [-2, 5],
    gridStep: 1,
    lines: [
      { slope: -0.75, intercept: 2, color: '#38BDF8', label: 'y = ax + b' }
    ],
    points: [
      { x: 0, y: 2, label: '(0, b)', dot: 'filled', color: '#10B981', attach: 'ne' }
    ]
  },

  // ----------------------------------------------------
  // OFICJALNE ARKUSZE CKE (ZADANIA Z WYKRESAMI MAFS)
  // ----------------------------------------------------
  // Matura Maj 2024 • Zad. 11 (Proste równoległe)
  'matura-maj-2024-zad-11': {
    type: 'LINEAR',
    xRange: [-3, 5],
    yRange: [-4, 6],
    gridStep: 1,
    lines: [
      { slope: -1.5, intercept: 3, color: '#38BDF8', label: 'k: y = -3/2 x + 3' },
      { slope: -1.5, intercept: -1, color: '#FFB800', label: 'l: y = -3/2 x - 1' }
    ],
    points: [
      { x: 0, y: 3, label: '(0, 3)', dot: 'filled', color: '#38BDF8', attach: 'ne' },
      { x: 2, y: 0, label: '(2, 0)', dot: 'filled', color: '#38BDF8', attach: 'ne' },
      { x: 0, y: -1, label: '(0, -1)', dot: 'filled', color: '#FFB800', attach: 'sw' }
    ]
  },

  // Matura Maj 2024 • Wiązka Zad. 14 (Parabola W(1, 9), pierwiastki -2, 4)
  'matura-maj-2024-zad-14_1': {
    type: 'PARABOLA',
    xRange: [-4, 6],
    yRange: [-2, 11],
    gridStep: 1,
    parabola: {
      a: -1,
      p: 1,
      q: 9,
      color: '#FFB800',
      domain: [-3.2, 5.2]
    },
    axisOfSymmetry: 1,
    points: [
      { x: 1, y: 9, label: 'W(1, 9)', dot: 'filled', color: '#10B981', attach: 'n' },
      { x: -2, y: 0, label: '(-2, 0)', dot: 'filled', color: '#FFB800', attach: 'sw' },
      { x: 4, y: 0, label: '(4, 0)', dot: 'filled', color: '#FFB800', attach: 'se' },
      { x: 0, y: 8, label: '(0, 8)', dot: 'filled', color: '#38BDF8', attach: 'w' }
    ]
  },
  'matura-maj-2024-zad-14_2': {
    type: 'PARABOLA',
    xRange: [-4, 6],
    yRange: [-2, 11],
    gridStep: 1,
    parabola: {
      a: -1,
      p: 1,
      q: 9,
      color: '#FFB800',
      domain: [-3.2, 5.2]
    },
    axisOfSymmetry: 1,
    points: [
      { x: 1, y: 9, label: 'W(1, 9)', dot: 'filled', color: '#10B981', attach: 'n' },
      { x: -2, y: 0, label: '(-2, 0)', dot: 'filled', color: '#FFB800', attach: 'sw' },
      { x: 4, y: 0, label: '(4, 0)', dot: 'filled', color: '#FFB800', attach: 'se' }
    ]
  },
  'matura-maj-2024-zad-14_3': {
    type: 'PARABOLA',
    xRange: [-4, 6],
    yRange: [-2, 11],
    gridStep: 1,
    parabola: {
      a: -1,
      p: 1,
      q: 9,
      color: '#FFB800',
      domain: [-3.2, 5.2]
    },
    axisOfSymmetry: 1,
    points: [
      { x: 1, y: 9, label: 'W(1, 9)', dot: 'filled', color: '#10B981', attach: 'n' },
      { x: -1, y: 5, label: '(-1, 5)', dot: 'filled', color: '#38BDF8', attach: 'w' },
      { x: 3, y: 5, label: '(3, 5)', dot: 'filled', color: '#38BDF8', attach: 'e' }
    ]
  },
  'matura-maj-2024-zad-14_4': {
    type: 'PARABOLA',
    xRange: [-4, 6],
    yRange: [-2, 11],
    gridStep: 1,
    parabola: {
      a: -1,
      p: 1,
      q: 9,
      color: '#FFB800',
      domain: [-3.2, 5.2]
    },
    axisOfSymmetry: 1,
    points: [
      { x: 1, y: 9, label: 'W(1, 9)', dot: 'filled', color: '#10B981', attach: 'n' },
      { x: -2, y: 0, label: '(-2, 0)', dot: 'filled', color: '#FFB800', attach: 'sw' },
      { x: 4, y: 0, label: '(4, 0)', dot: 'filled', color: '#FFB800', attach: 'se' }
    ]
  },

  // Matura Maj 2023 • Zad. 10 (Interpretacja układu równań)
  'matura-maj-2023-zad-10': {
    type: 'LINEAR',
    xRange: [-3, 5],
    yRange: [-3, 5],
    gridStep: 1,
    lines: [
      { slope: -1, intercept: 2, color: '#38BDF8', label: 'y = -x + 2' },
      { slope: 2, intercept: -1, color: '#FFB800', label: 'y = 2x - 1' }
    ],
    points: [
      { x: 1, y: 1, label: 'P(1, 1)', dot: 'filled', color: '#10B981', attach: 'ne' },
      { x: 0, y: 2, label: '(0, 2)', dot: 'filled', color: '#38BDF8', attach: 'nw' },
      { x: 2, y: 0, label: '(2, 0)', dot: 'filled', color: '#38BDF8', attach: 'se' },
      { x: 0, y: -1, label: '(0, -1)', dot: 'filled', color: '#FFB800', attach: 'sw' }
    ]
  },

  // Matura Maj 2023 • Zad. 14 (Parabola z osią symetrii p = 3)
  'matura-maj-2023-zad-14': {
    type: 'PARABOLA',
    xRange: [-7, 13],
    yRange: [-3, 6],
    gridStep: 2,
    parabola: {
      a: -0.0625,
      p: 3,
      q: 4,
      color: '#FFB800',
      domain: [-6.5, 12.5]
    },
    axisOfSymmetry: 3,
    points: [
      { x: -5, y: 0, label: 'x₁ = -5', dot: 'filled', color: '#FFB800', attach: 'nw' },
      { x: 3, y: 4, label: 'xw = p = 3', dot: 'filled', color: '#10B981', attach: 'n' },
      { x: 11, y: 0, label: 'x₂ = 11', dot: 'filled', color: '#FFB800', attach: 'ne' }
    ]
  },

  // Matura Sierpień 2024 • Zad. 8 (Interpretacja układu równań)
  'matura-sierpien-2024-zad-8': {
    type: 'LINEAR',
    xRange: [-2, 5],
    yRange: [-5, 4],
    gridStep: 1,
    lines: [
      { slope: -1, intercept: 2, color: '#38BDF8', label: 'y = -x + 2' },
      { slope: 2, intercept: -3, color: '#FFB800', label: 'y = 2x - 3' }
    ],
    points: [
      { x: 0, y: 2, label: '(0, 2)', dot: 'filled', color: '#38BDF8', attach: 'ne' },
      { x: 2, y: 0, label: '(2, 0)', dot: 'filled', color: '#38BDF8', attach: 'ne' },
      { x: 0, y: -3, label: '(0, -3)', dot: 'filled', color: '#FFB800', attach: 'sw' },
      { x: 1.667, y: 0.333, label: '(5/3, 1/3)', dot: 'filled', color: '#10B981', attach: 'ne' }
    ]
  }
};

// =========================================================================
// 3. ARCHETYPY GEOMETRYCZNE, ANALITYCZNE I OPTYMALIZACYJNE DLA ZADAŃ
// =========================================================================

export const GEOMETRIC_ARCHETYPES: Record<string, MathDiagramData> = {
  // Lekcja 15.6: Optymalizacja ogrodzenia - Bramy wjazdowe i furtki
  'lesson-15-6': {
    type: 'GEOMETRY_2D',
    title: 'Schemat działki z bramą wjazdową',
    formulaBadge: '$2x + 2y = L_{\\text{siatki}} + s_{\\text{bramy}}$',
    caption: 'Ogrodzenie prostokątnej działki o bokach $x \\times y$ z przerwą o szerokości $s_{\\text{bramy}}$ na bramę.',
    width: 500,
    height: 260,
    segments: [
      { from: [80, 50], to: [80, 210], color: '#38BDF8', strokeWidth: 3, label: 'x' },
      { from: [80, 50], to: [420, 50], color: '#FFB800', strokeWidth: 3, label: 'y' },
      { from: [420, 50], to: [420, 210], color: '#38BDF8', strokeWidth: 3, label: 'x' },
      { from: [80, 210], to: [200, 210], color: '#FFB800', strokeWidth: 3 },
      { from: [200, 210], to: [300, 210], color: '#F43F5E', strokeWidth: 2, dashed: true, label: 'brama s' },
      { from: [300, 210], to: [420, 210], color: '#FFB800', strokeWidth: 3 }
    ],
    points: [
      { x: 80, y: 50, dot: 'filled', color: '#38BDF8', label: 'A', labelPosition: 'top-left' },
      { x: 420, y: 50, dot: 'filled', color: '#FFB800', label: 'B', labelPosition: 'top-right' },
      { x: 420, y: 210, dot: 'filled', color: '#38BDF8', label: 'C', labelPosition: 'bottom-right' },
      { x: 80, y: 210, dot: 'filled', color: '#FFB800', label: 'D', labelPosition: 'bottom-left' },
      { x: 200, y: 210, dot: 'hollow', color: '#F43F5E' },
      { x: 300, y: 210, dot: 'hollow', color: '#F43F5E' }
    ],
    labels: [
      { x: 250, y: 130, text: 'Działka (pole P = x · y)', color: '#94A3B8', fontSize: 13, anchor: 'middle' },
      { x: 250, y: 235, text: 'szerokość bramy s (brak siatki)', color: '#F43F5E', fontSize: 11, anchor: 'middle' }
    ],
    metrics: [
      { label: 'Pełny obwód działki', value: '$2x + 2y = L_{\\text{siatki}} + s$', color: '#38BDF8' },
      { label: 'Funkcja celu (pole)', value: '$P(x) = x \\cdot y$', color: '#FFB800' },
      { label: 'Dziedzina geometryczna', value: '$x > s \\text{ oraz } y > 0$', color: '#10B981' },
      { label: 'Optimum CKE', value: '$x_w = -\\frac{b}{2a}$', color: '#F43F5E' }
    ]
  },

  // Lekcja 15.4: Działka przylegająca do muru / rzeki
  'lesson-15-4': {
    type: 'GEOMETRY_2D',
    title: 'Działka przylegająca do muru / rzeki',
    formulaBadge: '$2x + y = L \\implies y = L - 2x$',
    caption: 'Ogrodzenie prostokątnej działki z 3 stron (mur lub rzeka nie wymagają siatki).',
    width: 500,
    height: 250,
    segments: [
      { from: [60, 50], to: [440, 50], color: '#64748B', strokeWidth: 5, dashed: true, label: 'Mur / Rzeka (bez siatki)' },
      { from: [100, 50], to: [100, 200], color: '#38BDF8', strokeWidth: 3, label: 'x' },
      { from: [100, 200], to: [400, 200], color: '#FFB800', strokeWidth: 3, label: 'y' },
      { from: [400, 50], to: [400, 200], color: '#38BDF8', strokeWidth: 3, label: 'x' }
    ],
    points: [
      { x: 100, y: 50, dot: 'filled', color: '#64748B' },
      { x: 400, y: 50, dot: 'filled', color: '#64748B' },
      { x: 100, y: 200, dot: 'filled', color: '#38BDF8' },
      { x: 400, y: 200, dot: 'filled', color: '#FFB800' }
    ],
    labels: [
      { x: 250, y: 125, text: 'Pole wybiegu: P(x) = x · (L - 2x)', color: '#94A3B8', fontSize: 13, anchor: 'middle' }
    ],
    metrics: [
      { label: 'Zużycie siatki', value: '$2x + y = L$', color: '#38BDF8' },
      { label: 'Wyznaczona zmienna', value: '$y = L - 2x$', color: '#FFB800' },
      { label: 'Dziedzina boków', value: '$x \\in (0, \\frac{L}{2})$', color: '#10B981' },
      { label: 'Maksymalne pole', value: '$x_{\\max} = \\frac{L}{4}$', color: '#F43F5E' }
    ]
  },

  // Lekcja 15.5: Działka z podziałem wewnętrznym (2 kwatery)
  'lesson-15-5': {
    type: 'GEOMETRY_2D',
    title: 'Działka z płotem wewnętrznym (2 kwatery)',
    formulaBadge: '$3x + 2y = L \\implies y = \\frac{L - 3x}{2}$',
    caption: 'Ogrodzenie prostokątnego wybiegu podzielonego siatką na dwie kwatery.',
    width: 500,
    height: 250,
    segments: [
      { from: [80, 50], to: [80, 200], color: '#38BDF8', strokeWidth: 3, label: 'x' },
      { from: [80, 50], to: [420, 50], color: '#FFB800', strokeWidth: 3, label: 'y' },
      { from: [420, 50], to: [420, 200], color: '#38BDF8', strokeWidth: 3, label: 'x' },
      { from: [80, 200], to: [420, 200], color: '#FFB800', strokeWidth: 3, label: 'y' },
      { from: [250, 50], to: [250, 200], color: '#10B981', strokeWidth: 3, label: 'przegroda x' }
    ],
    points: [
      { x: 80, y: 50, dot: 'filled', color: '#38BDF8' },
      { x: 420, y: 50, dot: 'filled', color: '#FFB800' },
      { x: 420, y: 200, dot: 'filled', color: '#38BDF8' },
      { x: 80, y: 200, dot: 'filled', color: '#FFB800' },
      { x: 250, y: 50, dot: 'filled', color: '#10B981' },
      { x: 250, y: 200, dot: 'filled', color: '#10B981' }
    ],
    labels: [
      { x: 165, y: 125, text: 'Kwatera 1', color: '#94A3B8', fontSize: 12, anchor: 'middle' },
      { x: 335, y: 125, text: 'Kwatera 2', color: '#94A3B8', fontSize: 12, anchor: 'middle' }
    ],
    metrics: [
      { label: 'Zużycie siatki', value: '$3x + 2y = L$', color: '#38BDF8' },
      { label: 'Wyznaczona zmienna', value: '$y = \\frac{L - 3x}{2}$', color: '#FFB800' },
      { label: 'Dziedzina', value: '$x \\in (0, \\frac{L}{3})$', color: '#10B981' },
      { label: 'Pole całkowite', value: '$P(x) = -\\frac{3}{2}x^2 + \\frac{L}{2}x$', color: '#F43F5E' }
    ]
  },

  // Archetyp: Trójkąt prostokątny i Twierdzenie Pitagorasa
  'geo-archetype-pythagoras': {
    type: 'GEOMETRY_2D',
    title: 'Trójkąt prostokątny: Twierdzenie Pitagorasa',
    formulaBadge: '$a^2 + b^2 = c^2$',
    caption: 'W trójkącie prostokątnym suma kwadratów przyprostokątnych równa się kwadratowi przeciwprostokątnej.',
    width: 500,
    height: 260,
    polygons: [
      { points: [[100, 200], [380, 200], [100, 60]], fill: 'rgba(56, 189, 248, 0.05)', stroke: '#38BDF8', strokeWidth: 2.5 }
    ],
    segments: [
      { from: [100, 200], to: [380, 200], color: '#10B981', strokeWidth: 3, label: 'przyprostokątna a' },
      { from: [100, 200], to: [100, 60], color: '#FFB800', strokeWidth: 3, label: 'przyprostokątna b' },
      { from: [100, 60], to: [380, 200], color: '#F43F5E', strokeWidth: 3.5, label: 'przeciwprostokątna c' }
    ],
    arcs: [
      { cx: 100, cy: 200, r: 24, startAngleDeg: 270, endAngleDeg: 360, color: '#38BDF8', showRightAngleDot: true },
      { cx: 380, cy: 200, r: 35, startAngleDeg: 180, endAngleDeg: 206, color: '#10B981', label: 'α' }
    ],
    points: [
      { x: 100, y: 200, dot: 'filled', color: '#38BDF8', label: 'A (90°)', labelPosition: 'bottom-left' },
      { x: 380, y: 200, dot: 'filled', color: '#10B981', label: 'B', labelPosition: 'bottom-right' },
      { x: 100, y: 60, dot: 'filled', color: '#FFB800', label: 'C', labelPosition: 'top-left' }
    ],
    metrics: [
      { label: 'Relacja Pitagorasa', value: '$a^2 + b^2 = c^2$', color: '#F43F5E' },
      { label: 'Przeciwprostokątna', value: '$c = \\sqrt{a^2 + b^2}$', color: '#10B981' },
      { label: 'Pole trójkąta', value: '$P = \\frac{a \\cdot b}{2}$', color: '#FFB800' },
      { label: 'Promień okręgu opisanego', value: '$R = \\frac{c}{2}$', color: '#38BDF8' }
    ]
  },

  // Archetyp: Trójkąt równoboczny
  'geo-archetype-equilateral': {
    type: 'GEOMETRY_2D',
    title: 'Trójkąt równoboczny: wysokość h i promienie r, R',
    formulaBadge: '$h = \\frac{a\\sqrt{3}}{2},\\quad P = \\frac{a^2\\sqrt{3}}{4}$',
    caption: 'W trójkącie równobocznym wszystkie kąty mają $60^\\circ$, a wysokość $h$ dzieli się w stosunku $2:1$.',
    width: 500,
    height: 270,
    polygons: [
      { points: [[110, 220], [390, 220], [250, 40]], fill: 'rgba(255, 184, 0, 0.05)', stroke: '#FFB800', strokeWidth: 2.5 }
    ],
    segments: [
      { from: [110, 220], to: [390, 220], color: '#FFB800', strokeWidth: 3, label: 'a' },
      { from: [110, 220], to: [250, 40], color: '#FFB800', strokeWidth: 3, label: 'a' },
      { from: [390, 220], to: [250, 40], color: '#FFB800', strokeWidth: 3, label: 'a' },
      { from: [250, 40], to: [250, 220], color: '#38BDF8', strokeWidth: 2.5, dashed: true, label: 'h' }
    ],
    points: [
      { x: 110, y: 220, dot: 'filled', color: '#FFB800', label: 'A (60°)', labelPosition: 'bottom-left' },
      { x: 390, y: 220, dot: 'filled', color: '#FFB800', label: 'B (60°)', labelPosition: 'bottom-right' },
      { x: 250, y: 40, dot: 'filled', color: '#FFB800', label: 'C (60°)', labelPosition: 'top' },
      { x: 250, y: 160, dot: 'filled', color: '#10B981', label: 'S (środek)', labelPosition: 'right' }
    ],
    metrics: [
      { label: 'Wysokość trójkąta', value: '$h = \\frac{a\\sqrt{3}}{2}$', color: '#38BDF8' },
      { label: 'Pole trójkąta', value: '$P = \\frac{a^2\\sqrt{3}}{4}$', color: '#FFB800' },
      { label: 'Promień wpisany r', value: '$r = \\frac{1}{3}h = \\frac{a\\sqrt{3}}{6}$', color: '#10B981' },
      { label: 'Promień opisany R', value: '$R = \\frac{2}{3}h = \\frac{a\\sqrt{3}}{3}$', color: '#F43F5E' }
    ]
  },

  // Lekcja 9.11: Styczna do okręgu
  'lesson-9-11': {
    type: 'GEOMETRY_2D',
    title: 'Styczna do okręgu: Prostopadłość promienia i prostej k',
    formulaBadge: '$r \\perp k \\implies \\angle OPS = 90^\\circ$',
    caption: 'Promień okręgu poprowadzony do punktu styczności jest zawsze prostopadły do prostej stycznej.',
    width: 500,
    height: 260,
    circles: [
      { cx: 220, cy: 120, r: 70, stroke: '#38BDF8', strokeWidth: 2.5, fill: 'rgba(56, 189, 248, 0.05)' }
    ],
    segments: [
      { from: [290, 20], to: [290, 220], color: '#FFB800', strokeWidth: 3, label: 'styczna k' },
      { from: [220, 120], to: [290, 120], color: '#10B981', strokeWidth: 3, label: 'promień r' }
    ],
    arcs: [
      { cx: 290, cy: 120, r: 20, startAngleDeg: 180, endAngleDeg: 270, color: '#F43F5E', showRightAngleDot: true }
    ],
    points: [
      { x: 220, y: 120, dot: 'filled', color: '#38BDF8', label: 'S (środek)', labelPosition: 'left' },
      { x: 290, y: 120, dot: 'filled', color: '#F43F5E', label: 'P (punkt styczności)', labelPosition: 'right' }
    ],
    metrics: [
      { label: 'Kąt ze styczną', value: '$90^\\circ$ (kąt prosty)', color: '#F43F5E' },
      { label: 'Odległość środka', value: '$d(S, k) = r$', color: '#10B981' },
      { label: 'Punkty wspólne', value: 'dokładnie 1 punkt $P$', color: '#38BDF8' }
    ]
  },

  // Lekcja 9.13: Trapez
  'lesson-9-13': {
    type: 'GEOMETRY_2D',
    title: 'Trapez: Podstawy a, b i wysokość h',
    formulaBadge: '$P = \\frac{a + b}{2} \\cdot h$',
    caption: 'Pole trapezu to iloczyn średniej arytmetycznej podstaw i wysokości.',
    width: 500,
    height: 250,
    polygons: [
      { points: [[80, 200], [420, 200], [330, 70], [170, 70]], fill: 'rgba(56, 189, 248, 0.05)', stroke: '#38BDF8', strokeWidth: 2.5 }
    ],
    segments: [
      { from: [80, 200], to: [420, 200], color: '#FFB800', strokeWidth: 3, label: 'podstawa a' },
      { from: [170, 70], to: [330, 70], color: '#FFB800', strokeWidth: 3, label: 'podstawa b' },
      { from: [80, 200], to: [170, 70], color: '#38BDF8', strokeWidth: 2.5, label: 'c' },
      { from: [420, 200], to: [330, 70], color: '#38BDF8', strokeWidth: 2.5, label: 'd' },
      { from: [170, 70], to: [170, 200], color: '#10B981', strokeWidth: 2.5, dashed: true, label: 'h' }
    ],
    arcs: [
      { cx: 170, cy: 200, r: 18, startAngleDeg: 270, endAngleDeg: 360, color: '#10B981', showRightAngleDot: true }
    ],
    points: [
      { x: 80, y: 200, dot: 'filled', color: '#38BDF8', label: 'A', labelPosition: 'bottom-left' },
      { x: 420, y: 200, dot: 'filled', color: '#38BDF8', label: 'B', labelPosition: 'bottom-right' },
      { x: 330, y: 70, dot: 'filled', color: '#38BDF8', label: 'C', labelPosition: 'top-right' },
      { x: 170, y: 70, dot: 'filled', color: '#38BDF8', label: 'D', labelPosition: 'top-left' }
    ],
    metrics: [
      { label: 'Wzór na pole', value: '$P = \\frac{a+b}{2} \\cdot h$', color: '#FFB800' },
      { label: 'Linia środkowa', value: '$m = \\frac{a+b}{2}$', color: '#10B981' },
      { label: 'Odcinek w r-ramiennym', value: '$x = \\frac{a-b}{2}$', color: '#38BDF8' }
    ]
  },

  // Archetyp: Długość odcinka w układzie współrzędnych
  'geo-archetype-distance': {
    type: 'GEOMETRY_2D',
    title: 'Długość odcinka w układzie współrzędnych',
    formulaBadge: '$|AB| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$',
    caption: 'Długość odcinka $AB$ wynika bezpośrednio z twierdzenia Pitagorasa dla przyrostów na osiach.',
    width: 500,
    height: 270,
    grid: { minX: 50, maxX: 450, minY: 30, maxY: 240, stepX: 40, stepY: 30 },
    segments: [
      { from: [50, 210], to: [450, 210], color: '#64748B', strokeWidth: 1.5 },
      { from: [90, 240], to: [90, 30], color: '#64748B', strokeWidth: 1.5 },
      { from: [130, 180], to: [370, 60], color: '#38BDF8', strokeWidth: 3.5, label: '|AB|' },
      { from: [130, 180], to: [370, 180], color: '#10B981', strokeWidth: 2, dashed: true, label: 'xB - xA' },
      { from: [370, 180], to: [370, 60], color: '#FFB800', strokeWidth: 2, dashed: true, label: 'yB - yA' }
    ],
    points: [
      { x: 130, y: 180, dot: 'filled', color: '#38BDF8', label: 'A(xA, yA)', labelPosition: 'bottom-left' },
      { x: 370, y: 60, dot: 'filled', color: '#38BDF8', label: 'B(xB, yB)', labelPosition: 'top-right' },
      { x: 370, y: 180, dot: 'hollow', color: '#64748B', label: 'C', labelPosition: 'bottom-right' }
    ],
    labels: [
      { x: 440, y: 200, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 105, y: 35, text: 'y', color: '#94A3B8', fontSize: 13, fontWeight: '700' }
    ],
    metrics: [
      { label: 'Długość odcinka', value: '$|AB| = \\sqrt{\\Delta x^2 + \\Delta y^2}$', color: '#38BDF8' },
      { label: 'Karta CKE', value: 'str. 7 tablic', color: '#10B981' }
    ]
  },

  // Archetyp: Środek odcinka
  'geo-archetype-midpoint': {
    type: 'GEOMETRY_2D',
    title: 'Współrzędne środka odcinka S',
    formulaBadge: '$S = \\left(\\frac{x_A + x_B}{2},\\; \\frac{y_A + y_B}{2}\\right)$',
    caption: 'Środek odcinka to punkt o współrzędnych będących średnimi arytmetycznymi współrzędnych końców.',
    width: 500,
    height: 260,
    grid: { minX: 50, maxX: 450, minY: 30, maxY: 230, stepX: 40, stepY: 30 },
    segments: [
      { from: [50, 200], to: [450, 200], color: '#64748B', strokeWidth: 1.5 },
      { from: [90, 230], to: [90, 30], color: '#64748B', strokeWidth: 1.5 },
      { from: [130, 170], to: [250, 110], color: '#38BDF8', strokeWidth: 3, label: '|AS|' },
      { from: [250, 110], to: [370, 50], color: '#38BDF8', strokeWidth: 3, label: '|SB|' }
    ],
    points: [
      { x: 130, y: 170, dot: 'filled', color: '#38BDF8', label: 'A(xA, yA)', labelPosition: 'bottom-left' },
      { x: 370, y: 50, dot: 'filled', color: '#38BDF8', label: 'B(xB, yB)', labelPosition: 'top-right' },
      { x: 250, y: 110, dot: 'filled', color: '#10B981', label: 'S(xS, yS)', labelPosition: 'top-left' }
    ],
    labels: [
      { x: 440, y: 190, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 105, y: 35, text: 'y', color: '#94A3B8', fontSize: 13, fontWeight: '700' }
    ],
    metrics: [
      { label: 'Środek xS', value: '$x_S = \\frac{x_A + x_B}{2}$', color: '#10B981' },
      { label: 'Środek yS', value: '$y_S = \\frac{y_A + y_B}{2}$', color: '#10B981' },
      { label: 'Wyznaczanie końca', value: '$x_B = 2x_S - x_A$', color: '#FFB800' }
    ]
  },

  // Archetyp: Równanie okręgu w układzie
  'geo-archetype-circle': {
    type: 'GEOMETRY_2D',
    title: 'Równanie okręgu o środku S(a, b) i promieniu r',
    formulaBadge: '$(x - a)^2 + (y - b)^2 = r^2$',
    caption: 'Punkty $P(x, y)$ na okręgu leżą w stałej odległości $r$ od środka $S(a, b)$.',
    width: 500,
    height: 270,
    grid: { minX: 50, maxX: 450, minY: 30, maxY: 240, stepX: 40, stepY: 30 },
    segments: [
      { from: [50, 170], to: [450, 170], color: '#64748B', strokeWidth: 1.5 },
      { from: [150, 240], to: [150, 30], color: '#64748B', strokeWidth: 1.5 },
      { from: [270, 110], to: [330, 60], color: '#F43F5E', strokeWidth: 3, label: 'r' }
    ],
    circles: [
      { cx: 270, cy: 110, r: 78, stroke: '#FFB800', strokeWidth: 2.5, fill: 'rgba(255, 184, 0, 0.05)' }
    ],
    points: [
      { x: 270, y: 110, dot: 'filled', color: '#FFB800', label: 'S(a, b)', labelPosition: 'bottom' },
      { x: 330, y: 60, dot: 'filled', color: '#38BDF8', label: 'P(x, y)', labelPosition: 'top-right' }
    ],
    labels: [
      { x: 440, y: 160, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 165, y: 35, text: 'y', color: '#94A3B8', fontSize: 13, fontWeight: '700' }
    ],
    metrics: [
      { label: 'Równanie kanoniczne', value: '$(x - a)^2 + (y - b)^2 = r^2$', color: '#FFB800' },
      { label: 'Środek okręgu', value: '$S = (a, b)$', color: '#38BDF8' },
      { label: 'Promień', value: '$r = \\sqrt{r^2}$', color: '#F43F5E' }
    ]
  },

  // Archetyp: Definicje funkcji trygonometrycznych
  'geo-archetype-trig-triangle': {
    type: 'TRIGONOMETRY',
    title: 'Definicje funkcji trygonometrycznych: sin, cos, tg',
    formulaBadge: '$\\sin\\alpha = \\frac{a}{c},\\quad \\cos\\alpha = \\frac{b}{c},\\quad \\tan\\alpha = \\frac{a}{b}$',
    caption: 'Stosunki długości boków w trójkącie prostokątnym dla kąta ostrego $\\alpha$.',
    width: 500,
    height: 260,
    polygons: [
      { points: [[100, 200], [380, 200], [100, 60]], fill: 'rgba(56, 189, 248, 0.05)', stroke: '#38BDF8', strokeWidth: 2.5 }
    ],
    segments: [
      { from: [100, 200], to: [380, 200], color: '#FFB800', strokeWidth: 3, label: 'przyległa b' },
      { from: [100, 200], to: [100, 60], color: '#10B981', strokeWidth: 3, label: 'naprzeciwległa a' },
      { from: [100, 60], to: [380, 200], color: '#F43F5E', strokeWidth: 3.5, label: 'przeciwprostokątna c' }
    ],
    arcs: [
      { cx: 100, cy: 200, r: 24, startAngleDeg: 270, endAngleDeg: 360, color: '#38BDF8', showRightAngleDot: true },
      { cx: 380, cy: 200, r: 35, startAngleDeg: 180, endAngleDeg: 206, color: '#10B981', label: 'α' }
    ],
    points: [
      { x: 100, y: 200, dot: 'filled', color: '#38BDF8', label: 'C (90°)', labelPosition: 'bottom-left' },
      { x: 380, y: 200, dot: 'filled', color: '#10B981', label: 'A (kąt α)', labelPosition: 'bottom-right' },
      { x: 100, y: 60, dot: 'filled', color: '#FFB800', label: 'B', labelPosition: 'top-left' }
    ],
    metrics: [
      { label: 'Sinus kąta α', value: '$\\sin\\alpha = \\frac{a}{c}$', color: '#10B981' },
      { label: 'Cosinus kąta α', value: '$\\cos\\alpha = \\frac{b}{c}$', color: '#FFB800' },
      { label: 'Tangens kąta α', value: '$\\tan\\alpha = \\frac{a}{b}$', color: '#38BDF8' }
    ]
  },

  // Lekcja 11.6: Walec
  'lesson-11-6': {
    type: 'STEREOMETRY_3D',
    title: 'Walec: Przekrój osiowy, promień r i wysokość H',
    formulaBadge: '$V = \\pi r^2 H,\\quad P_c = 2\\pi r(r + H)$',
    caption: 'Walec o promieniu podstawy $r$ i wysokości $H$. Przekrój osiowy to prostokąt $2r \\times H$.',
    width: 500,
    height: 270,
    polygons: [
      { points: [[190, 60], [310, 60], [310, 200], [190, 200]], fill: 'rgba(56, 189, 248, 0.08)', stroke: '#38BDF8', strokeWidth: 2 }
    ],
    segments: [
      { from: [190, 60], to: [190, 200], color: '#FFB800', strokeWidth: 2.5, label: 'H' },
      { from: [310, 60], to: [310, 200], color: '#FFB800', strokeWidth: 2.5, label: 'H' },
      { from: [250, 60], to: [250, 200], color: '#F43F5E', strokeWidth: 2, dashed: true, label: 'H' },
      { from: [250, 200], to: [310, 200], color: '#10B981', strokeWidth: 2.5, label: 'r' }
    ],
    circles: [
      { cx: 250, cy: 60, r: 60, stroke: '#FFB800', strokeWidth: 2, fill: 'rgba(255, 184, 0, 0.05)' }
    ],
    points: [
      { x: 250, y: 60, dot: 'filled', color: '#F43F5E', label: 'O1', labelPosition: 'top' },
      { x: 250, y: 200, dot: 'filled', color: '#10B981', label: 'O2', labelPosition: 'bottom' }
    ],
    metrics: [
      { label: 'Objętość walca', value: '$V = \\pi r^2 H$', color: '#38BDF8' },
      { label: 'Pole powierzchni bocznej', value: '$P_b = 2\\pi r H$', color: '#FFB800' },
      { label: 'Pole całkowite', value: '$P_c = 2\\pi r(r + H)$', color: '#10B981' }
    ]
  },

  // Lekcja 11.7: Stożek
  'lesson-11-7': {
    type: 'STEREOMETRY_3D',
    title: 'Stożek: Trójkąt prostokątny r, H, l',
    formulaBadge: '$r^2 + H^2 = l^2,\\quad V = \\frac{1}{3}\\pi r^2 H$',
    caption: 'W stożku promień podstawy $r$, wysokość $H$ i tworząca $l$ tworzą trójkąt prostokątny.',
    width: 500,
    height: 270,
    polygons: [
      { points: [[180, 210], [320, 210], [250, 45]], fill: 'rgba(255, 184, 0, 0.06)', stroke: '#FFB800', strokeWidth: 2 }
    ],
    segments: [
      { from: [180, 210], to: [250, 45], color: '#FFB800', strokeWidth: 2.5, label: 'l' },
      { from: [320, 210], to: [250, 45], color: '#FFB800', strokeWidth: 2.5, label: 'l' },
      { from: [250, 45], to: [250, 210], color: '#F43F5E', strokeWidth: 2.5, dashed: true, label: 'H' },
      { from: [250, 210], to: [320, 210], color: '#10B981', strokeWidth: 3, label: 'r' }
    ],
    arcs: [
      { cx: 250, cy: 210, r: 20, startAngleDeg: 270, endAngleDeg: 360, color: '#F43F5E', showRightAngleDot: true }
    ],
    points: [
      { x: 250, y: 45, dot: 'filled', color: '#FFB800', label: 'S (wierzchołek)', labelPosition: 'top' },
      { x: 250, y: 210, dot: 'filled', color: '#F43F5E', label: 'O (środek)', labelPosition: 'bottom' },
      { x: 320, y: 210, dot: 'filled', color: '#10B981', label: 'A', labelPosition: 'bottom-right' }
    ],
    metrics: [
      { label: 'Relacja Pitagorasa', value: '$r^2 + H^2 = l^2$', color: '#F43F5E' },
      { label: 'Objętość stożka', value: '$V = \\frac{1}{3}\\pi r^2 H$', color: '#38BDF8' },
      { label: 'Pole boczne', value: '$P_b = \\pi r l$', color: '#FFB800' }
    ]
  }
};

// =========================================================================
// 3B. EXPLANATION VISUALS (WYKRESY POMOCNICZE POKAZYWANE WYŁĄCZNIE PO ODPOWIEDZI)
// =========================================================================

export const EXPLANATION_VISUALS: Record<string, PlotData | MathDiagramData> = {
  // ----------------------------------------------------
  // DZIAŁ 8: NIERÓWNOŚCI KWADRATOWE (WYKRESY WYJAŚNIAJĄCE)
  // ----------------------------------------------------
  'task-8-1-2-1': {
    type: 'PARABOLA',
    xRange: [-1, 3],
    yRange: [-3, 2],
    gridStep: 1,
    parabola: {
      a: -2,
      p: 1.25,
      q: 0.125,
      color: '#F43F5E',
      domain: [-0.5, 3]
    },
    points: [
      { x: 1, y: 0, label: 'x₁ = 1', dot: 'filled', color: '#FFB800', attach: 'sw' },
      { x: 1.5, y: 0, label: 'x₂ = 1.5', dot: 'filled', color: '#FFB800', attach: 'se' },
      { x: 1.25, y: 0.125, label: 'W(p, q)', dot: 'filled', color: '#F43F5E', attach: 'n' }
    ]
  },
  'task-8-1-2-2': {
    type: 'PARABOLA',
    xRange: [0, 5],
    yRange: [-2, 4],
    gridStep: 1,
    parabola: {
      a: 1,
      p: 2.5,
      q: -0.25,
      color: '#38BDF8',
      domain: [0.5, 4.5]
    },
    segments: [
      { from: [2, 0], to: [3, 0], startDot: 'filled', endDot: 'filled', color: '#10B981', weight: 4 }
    ],
    points: [
      { x: 2, y: 0, label: 'x₁ = 2', dot: 'filled', color: '#10B981', attach: 'nw' },
      { x: 3, y: 0, label: 'x₂ = 3', dot: 'filled', color: '#10B981', attach: 'ne' }
    ]
  },
  'task-8-1-2-3': {
    type: 'PARABOLA',
    xRange: [-1, 5],
    yRange: [-2, 3],
    gridStep: 1,
    parabola: {
      a: -1,
      p: 2,
      q: 1,
      color: '#FFB800',
      domain: [0, 4]
    },
    segments: [
      { from: [1, 0], to: [3, 0], startDot: 'hollow', endDot: 'hollow', color: '#10B981', weight: 4 }
    ],
    points: [
      { x: 1, y: 0, label: 'x₁ = 1', dot: 'hollow', color: '#10B981', attach: 'sw' },
      { x: 3, y: 0, label: 'x₂ = 3', dot: 'hollow', color: '#10B981', attach: 'se' },
      { x: 2, y: 1, label: 'W(2, 1)', dot: 'filled', color: '#FFB800', attach: 'n' }
    ]
  },
  'task-8-1-3-1': {
    type: 'PARABOLA',
    xRange: [-2, 6],
    yRange: [-5, 4],
    gridStep: 1,
    parabola: {
      a: 1,
      p: 2,
      q: -4,
      color: '#38BDF8',
      domain: [-1, 5]
    },
    segments: [
      { from: [-2, 0], to: [0, 0], startDot: 'none', endDot: 'hollow', color: '#10B981', weight: 4 },
      { from: [4, 0], to: [6, 0], startDot: 'hollow', endDot: 'none', color: '#10B981', weight: 4 }
    ],
    points: [
      { x: 0, y: 0, label: 'x₁ = 0', dot: 'hollow', color: '#10B981', attach: 'nw' },
      { x: 4, y: 0, label: 'x₂ = 4', dot: 'hollow', color: '#10B981', attach: 'ne' }
    ]
  },
  'task-8-1-3-2': {
    type: 'PARABOLA',
    xRange: [-6, 6],
    yRange: [-5, 5],
    gridStep: 2,
    parabola: {
      a: 0.25,
      p: 0,
      q: -4,
      color: '#38BDF8',
      domain: [-5.5, 5.5]
    },
    segments: [
      { from: [-4, 0], to: [4, 0], startDot: 'filled', endDot: 'filled', color: '#10B981', weight: 4 }
    ],
    points: [
      { x: -4, y: 0, label: 'x₁ = -4', dot: 'filled', color: '#10B981', attach: 'nw' },
      { x: 4, y: 0, label: 'x₂ = 4', dot: 'filled', color: '#10B981', attach: 'ne' }
    ]
  },
  'task-8-4-1': {
    type: 'PARABOLA',
    xRange: [-4, 4],
    yRange: [-2, 8],
    gridStep: 2,
    parabola: {
      a: 1,
      p: 0,
      q: 4,
      color: '#10B981',
      domain: [-3, 3]
    },
    segments: [
      { from: [-4, 0], to: [4, 0], startDot: 'none', endDot: 'none', color: '#10B981', weight: 4 }
    ],
    points: [
      { x: 0, y: 4, label: 'W(0, 4)', dot: 'filled', color: '#10B981', attach: 'n' }
    ]
  },
  'task-8-4-2': {
    type: 'PARABOLA',
    xRange: [0, 6],
    yRange: [-2, 5],
    gridStep: 1,
    parabola: {
      a: 1,
      p: 3,
      q: 0,
      color: '#FFB800',
      domain: [1, 5]
    },
    points: [
      { x: 3, y: 0, label: 'W(3, 0)', dot: 'filled', color: '#10B981', attach: 's' }
    ]
  },
  'task-8-4-3': {
    type: 'PARABOLA',
    xRange: [-2, 4],
    yRange: [-7, 2],
    gridStep: 1,
    parabola: {
      a: -1,
      p: 1,
      q: -2,
      color: '#F43F5E',
      domain: [-1.5, 3.5]
    },
    points: [
      { x: 1, y: -2, label: 'W(1, -2)', dot: 'filled', color: '#F43F5E', attach: 's' }
    ]
  },

  // ----------------------------------------------------
  // DZIAŁ 10: FUNKCJA LINIOWA (WYKRESY WYJAŚNIAJĄCE)
  // ----------------------------------------------------
  'task-10-1-1': {
    type: 'LINEAR',
    xRange: [-2, 5],
    yRange: [-2, 9],
    gridStep: 1,
    lines: [
      { slope: -3, intercept: 7, color: '#38BDF8', label: 'f(x) = -3x + 7' }
    ],
    points: [
      { x: 0, y: 7, label: 'P(0, 7)', dot: 'filled', color: '#10B981', attach: 'e' },
      { x: 2.333, y: 0, label: 'x₀', dot: 'filled', color: '#FFB800', attach: 'sw' }
    ]
  },
  'task-10-2-2': {
    type: 'LINEAR',
    xRange: [-1, 6],
    yRange: [-1, 11],
    gridStep: 1,
    lines: [
      { slope: 2, intercept: 1, color: '#38BDF8', label: 'y = 2x + 1' }
    ],
    segments: [
      { from: [1, 3], to: [4, 3], color: 'rgba(255, 184, 0, 0.6)', strokeWidth: 1.5, dashed: true, label: 'Δx = 3' },
      { from: [4, 3], to: [4, 9], color: 'rgba(16, 185, 129, 0.6)', strokeWidth: 1.5, dashed: true, label: 'Δy = 6' }
    ],
    points: [
      { x: 1, y: 3, label: 'A(1, 3)', dot: 'filled', color: '#FFB800', attach: 'nw' },
      { x: 4, y: 9, label: 'B(4, 9)', dot: 'filled', color: '#10B981', attach: 'nw' }
    ]
  },
  'task-10-2-3': {
    type: 'LINEAR',
    xRange: [-4, 4],
    yRange: [-5, 7],
    gridStep: 1,
    lines: [
      { slope: -2, intercept: 1, color: '#38BDF8', label: 'y = -2x + 1' }
    ],
    points: [
      { x: -2, y: 5, label: 'K(-2, 5)', dot: 'filled', color: '#FFB800', attach: 'ne' },
      { x: 2, y: -3, label: 'L(2, -3)', dot: 'filled', color: '#10B981', attach: 'se' }
    ]
  },
  'task-10-3-1': {
    type: 'LINEAR',
    xRange: [-3, 3],
    yRange: [-5, 8],
    gridStep: 1,
    lines: [
      { slope: 5, intercept: 4, color: '#38BDF8', label: 'k: y = 5x + 4' },
      { slope: 5, intercept: -2, color: '#FFB800', label: 'l: y = 5x - 2' }
    ],
    points: [
      { x: 0, y: 4, label: '(0, 4)', dot: 'filled', color: '#38BDF8', attach: 'w' },
      { x: 0, y: -2, label: '(0, -2)', dot: 'filled', color: '#FFB800', attach: 'e' }
    ]
  },
  'task-10-3-2': {
    type: 'LINEAR',
    xRange: [-4, 4],
    yRange: [-2, 6],
    gridStep: 1,
    lines: [
      { slope: -0.667, intercept: 1, color: '#38BDF8', label: 'k: y = -2/3 x + 1' },
      { slope: 1.5, intercept: 3, color: '#FFB800', label: 'l: y = 3/2 x + 3 (k ⊥ l)' }
    ],
    points: [
      { x: 0, y: 3, label: 'P(0, 3)', dot: 'filled', color: '#10B981', attach: 'e' }
    ]
  }
};

// =========================================================================
// =========================================================================
// 4. REGISTRY OF NUMBER LINES (OSIE LICZBOWE CKE DO ZADAŃ I TEORII)
// =========================================================================

export const THEORY_NUMBER_LINES: Record<string, NumberLineData> = {
  // Lekcja 3.1: Wartość bezwzględna (|x - 2| = 5 -> punkty x = -3 oraz x = 7)
  'lesson-3-1': {
    min: -5,
    max: 9,
    ticks: [-3, -1, 0, 2, 5, 7],
    intervals: [
      { from: -3, to: -3, fromIncluded: true, toIncluded: true },
      { from: 7, to: 7, fromIncluded: true, toIncluded: true }
    ]
  },

  // Lekcja 3.2: Nierówności z wartością bezwzględną (|x - 1| <= 3 -> przedział [-2, 4])
  'lesson-3-2': {
    min: -4,
    max: 6,
    ticks: [-2, 1, 4],
    intervals: [
      { from: -2, to: 4, fromIncluded: true, toIncluded: true }
    ]
  },

  // Lekcja 5.1: Rozwiązywanie nierówności liniowych (-2x <= 6 -> x >= -3)
  'lesson-5-1': {
    min: -5,
    max: 5,
    ticks: [-3, 0],
    intervals: [
      { from: -3, to: 5, fromIncluded: true, toIncluded: false }
    ]
  },

  // Lekcja 5.2: Zaznaczanie rozwiązań na osi liczbowej i zapis przedziałowy
  'lesson-5-2': {
    min: -5,
    max: 6,
    ticks: [-2, 0, 2, 4],
    intervals: [
      { from: -2, to: 4, fromIncluded: false, toIncluded: true }
    ]
  },

  // Lekcja 5.3: Układy nierówności liniowych (x > -2 i x <= 3 -> (-2, 3])
  'lesson-5-3': {
    min: -4,
    max: 5,
    ticks: [-2, -1, 0, 1, 2, 3],
    intervals: [
      { from: -2, to: 3, fromIncluded: false, toIncluded: true }
    ]
  }
};

export const TASK_NUMBER_LINES: Record<string, NumberLineData> = {
  // Zadanie 1: Ile liczb całkowitych należy do przedziału <-4, 3)?
  'task-1-01-01': {
    min: -6,
    max: 5,
    ticks: [-4, -3, -2, -1, 0, 1, 2, 3],
    intervals: [{ from: -4, to: 3, fromIncluded: true, toIncluded: false }]
  },
  // Zadanie 2: Zbiór liczb rzeczywistych -3 <= x < 5
  'task-1-01-02': {
    min: -5,
    max: 7,
    ticks: [-3, -1, 0, 2, 5],
    intervals: [{ from: -3, to: 5, fromIncluded: true, toIncluded: false }]
  },
  // Zadanie 3: Liczba 0 w (-1, 1)
  'task-1-01-03': {
    min: -3,
    max: 3,
    ticks: [-1, 0, 1],
    intervals: [{ from: -1, to: 1, fromIncluded: false, toIncluded: false }]
  },
  // Zadanie 4: Część wspólna <-2, 5) oraz (1, 7>
  'task-1-01-04': {
    min: -4,
    max: 9,
    ticks: [-2, 1, 5, 7],
    intervals: [
      { from: -2, to: 5, fromIncluded: true, toIncluded: false },
      { from: 1, to: 7, fromIncluded: false, toIncluded: true }
    ]
  },
  // Zadanie 5: Największa całkowita w (-infty, 4.6>
  'task-1-01-05': {
    min: 0,
    max: 6,
    ticks: [1, 2, 3, 4, 5],
    intervals: [{ from: null, to: 4.6, toIncluded: true }]
  },
  // Zadanie 6: Wskaż liczbę, która NIE NALEŻY do <-3, 2)
  'task-1-01-06': {
    min: -5,
    max: 4,
    ticks: [-3, -1, 0, 2],
    intervals: [{ from: -3, to: 2, fromIncluded: true, toIncluded: false }]
  },
  // Zadanie 7: Suma (-infty, 2> u <2, +infty)
  'task-1-01-07': {
    min: -3,
    max: 7,
    ticks: [0, 2, 4],
    intervals: [
      { from: null, to: 2, toIncluded: true },
      { from: 2, to: null, fromIncluded: true }
    ]
  },
  // Zadanie 8: Liczby pierwsze w (2, 12>
  'task-1-01-08': {
    min: 0,
    max: 14,
    ticks: [2, 3, 5, 7, 11, 12],
    intervals: [{ from: 2, to: 12, fromIncluded: false, toIncluded: true }]
  },
  // Zadanie 9: Dopełnienie <-1, 4)
  'task-1-01-09': {
    min: -4,
    max: 7,
    ticks: [-1, 0, 4],
    intervals: [
      { from: null, to: -1, toIncluded: false },
      { from: 4, to: null, fromIncluded: true }
    ]
  },
  // Zadanie 10: Suma i iloczyn <-5, 2) oraz (-1, 6>
  'task-1-01-10': {
    min: -7,
    max: 8,
    ticks: [-5, -1, 2, 6],
    intervals: [
      { from: -5, to: 2, fromIncluded: true, toIncluded: false },
      { from: -1, to: 6, fromIncluded: false, toIncluded: true }
    ]
  },
  // Zadanie 11: Nierówność |x - 1| >= 3
  'task-1-01-11': {
    min: -5,
    max: 7,
    ticks: [-2, 1, 4],
    intervals: [
      { from: null, to: -2, toIncluded: true },
      { from: 4, to: null, fromIncluded: true }
    ]
  },
  // Zadanie 12: (-infty, 2> u <5, +infty)
  'task-1-01-12': {
    min: 0,
    max: 7,
    ticks: [2, 5],
    intervals: [
      { from: null, to: 2, toIncluded: true },
      { from: 5, to: null, fromIncluded: true }
    ]
  },
  // Zadanie 13: Całkowite w (2, 7)
  'task-1-01-13': {
    min: 0,
    max: 9,
    ticks: [2, 3, 4, 5, 6, 7],
    intervals: [{ from: 2, to: 7, fromIncluded: false, toIncluded: false }]
  },
  // Zadanie 14: Część wspólna <-3, 5) i (1, 8>
  'task-1-01-14': {
    min: -5,
    max: 10,
    ticks: [-3, 1, 5, 8],
    intervals: [
      { from: -3, to: 5, fromIncluded: true, toIncluded: false },
      { from: 1, to: 8, fromIncluded: false, toIncluded: true }
    ]
  },
  // Zadanie 15: Liczby pierwsze w <1, 15)
  'task-1-01-15': {
    min: 0,
    max: 16,
    ticks: [1, 2, 3, 5, 7, 11, 13, 15],
    intervals: [{ from: 1, to: 15, fromIncluded: true, toIncluded: false }]
  },
  // Zadanie 16: Wyrażenie w (2, 5)
  'task-1-01-16': {
    min: 0,
    max: 7,
    ticks: [2, 3, 4, 5],
    intervals: [{ from: 2, to: 5, fromIncluded: false, toIncluded: false }]
  }
};

/**
 * Automatycznie parsuje zapis przedziału z tekstu matematycznego i generuje obiekt NumberLineData.
 */
export function autoDeriveTaskNumberLine(text: string): NumberLineData | null {
  if (!text || typeof text !== 'string') return null;

  // Normalizacja KaTeX / LaTeX
  const normalized = text
    .replace(/\\(?:left|right)/g, '')
    .replace(/\\langle/g, '⟨')
    .replace(/\\rangle/g, '⟩')
    .replace(/\\lbrack/g, '[')
    .replace(/\\rbrack/g, ']')
    .replace(/\\le(?:q)?/g, '≤')
    .replace(/\\ge(?:q)?/g, '≥');

  // 1. Sprawdź przedziały obustronne: <a, b>, <a, b), (a, b>, (a, b)
  const boundedMatch = normalized.match(/([⟨<\[\(])\s*(-?\d+(?:[,\.]\d+)?)\s*[,;]\s*(-?\d+(?:[,\.]\d+)?)\s*([⟩>\]\)])/);

  if (boundedMatch) {
    const leftBracket = boundedMatch[1];
    const a = parseFloat(boundedMatch[2].replace(',', '.'));
    const b = parseFloat(boundedMatch[3].replace(',', '.'));
    const rightBracket = boundedMatch[4];

    if (!isNaN(a) && !isNaN(b) && a < b) {
      const fromIncluded = leftBracket === '⟨' || leftBracket === '<' || leftBracket === '[';
      const toIncluded = rightBracket === '⟩' || rightBracket === '>' || rightBracket === ']';
      const margin = Math.max(1, Math.round((b - a) * 0.25));
      const min = Math.floor(a - margin);
      const max = Math.ceil(b + margin);

      const ticks = [a, b];
      if (b - a <= 16 && Number.isInteger(a) && Number.isInteger(b)) {
        for (let x = a; x <= b; x++) {
          if (!ticks.includes(x)) ticks.push(x);
        }
        ticks.sort((x, y) => x - y);
      }

      return {
        min,
        max,
        ticks,
        intervals: [{ from: a, to: b, fromIncluded, toIncluded }]
      };
    }
  }

  // 2. Sprawdź nierówności obustronne: a <= x <= b lub a < x <= b itp.
  const ineqMatch = normalized.match(/(-?\d+(?:[,\.]\d+)?)\s*(≤|<=|<)\s*[a-zA-Z]\s*(≤|<=|<)\s*(-?\d+(?:[,\.]\d+)?)/);
  if (ineqMatch) {
    const a = parseFloat(ineqMatch[1].replace(',', '.'));
    const op1 = ineqMatch[2];
    const op2 = ineqMatch[3];
    const b = parseFloat(ineqMatch[4].replace(',', '.'));
    if (!isNaN(a) && !isNaN(b) && a < b) {
      const fromIncluded = op1.includes('≤') || op1.includes('<=');
      const toIncluded = op2.includes('≤') || op2.includes('<=');
      const margin = Math.max(1, Math.round((b - a) * 0.25));
      const min = Math.floor(a - margin);
      const max = Math.ceil(b + margin);
      const ticks = [a, b];
      if (b - a <= 16 && Number.isInteger(a) && Number.isInteger(b)) {
        for (let x = a; x <= b; x++) {
          if (!ticks.includes(x)) ticks.push(x);
        }
        ticks.sort((x, y) => x - y);
      }
      return {
        min,
        max,
        ticks,
        intervals: [{ from: a, to: b, fromIncluded, toIncluded }]
      };
    }
  }

  // 3. Sprawdź promienie do nieskończoności: (-inf, b> lub (-inf, b)
  const leftInfMatch = normalized.match(/\(-\s*(?:\\infty|infty|nieskończoność)\s*[,;]\s*(-?\d+(?:[,\.]\d+)?)\s*([⟩>\]\)])/i);
  if (leftInfMatch) {
    const b = parseFloat(leftInfMatch[1].replace(',', '.'));
    const toIncluded = leftInfMatch[2] === '⟩' || leftInfMatch[2] === '>' || leftInfMatch[2] === ']';
    if (!isNaN(b)) {
      return {
        min: Math.floor(b - 4),
        max: Math.ceil(b + 2),
        ticks: [b - 2, b - 1, b, b + 1],
        intervals: [{ from: null, to: b, toIncluded }]
      };
    }
  }

  // 4. Sprawdź promienie od liczby do nieskończoności: <a, +inf) lub (a, +inf)
  const rightInfMatch = normalized.match(/([⟨<\[\(])\s*(-?\d+(?:[,\.]\d+)?)\s*[,;]\s*\+?\s*(?:\\infty|infty|nieskończoność)\s*\)/i);
  if (rightInfMatch) {
    const a = parseFloat(rightInfMatch[2].replace(',', '.'));
    const fromIncluded = rightInfMatch[1] === '⟨' || rightInfMatch[1] === '<' || rightInfMatch[1] === '[';
    if (!isNaN(a)) {
      return {
        min: Math.floor(a - 2),
        max: Math.ceil(a + 4),
        ticks: [a - 1, a, a + 1, a + 2],
        intervals: [{ from: a, to: null, fromIncluded }]
      };
    }
  }

  return null;
}

// =========================================================================
// 5. SELF-HEALING ENRICHMENT UTILITIES
// =========================================================================

/**
 * Normalizuje dowolną wariację identyfikatora lekcji (np. dzial-5-lekcja-1, dzial-5-1, dzial-5, 5.1, lesson-5.1)
 * do listy unikalnych kandydatów w kolejności priorytetu.
 */
export function getCandidateLessonVisualIds(id: string): string[] {
  const raw = String(id || '').toLowerCase().trim();
  if (!raw) return [];
  const candidates = new Set<string>();
  candidates.add(raw);
  candidates.add(id);

  // 1. Wzorce typu dzial-X-lekcja-Y, dzial-X-Y, topic-X-lesson-Y
  const dzialLekcjaMatch = raw.match(/(?:dzial|topic)[-_]?(\d+)[-_]?(?:lekcja|lesson)?[-_]?(\d+)/i);
  if (dzialLekcjaMatch) {
    candidates.add(`lesson-${dzialLekcjaMatch[1]}-${dzialLekcjaMatch[2]}`);
    candidates.add(`${dzialLekcjaMatch[1]}.${dzialLekcjaMatch[2]}`);
  }

  // 2. Wzorce typu dzial-X / topic-X (domyślnie lekcja 1 danego działu)
  const dzialOnlyMatch = raw.match(/^(?:dzial|topic)[-_]?(\d+)$/i);
  if (dzialOnlyMatch) {
    candidates.add(`lesson-${dzialOnlyMatch[1]}-1`);
    candidates.add(`${dzialOnlyMatch[1]}.1`);
  }

  // 3. Wzorce typu lesson-X-Y / lekcja-X-Y
  const lessonMatch = raw.match(/^(?:pol|eng|mat-roz|math-roz|eng-roz)?[-_]?(?:lesson|lekcja)[-_.]?(\d+)[-_.](\d+)$/i);
  if (lessonMatch) {
    candidates.add(`lesson-${lessonMatch[1]}-${lessonMatch[2]}`);
    candidates.add(`${lessonMatch[1]}.${lessonMatch[2]}`);
  }

  // 4. Czyste liczbowe X.Y lub X-Y
  const numMatch = raw.match(/^(\d+)[-_.](\d+)$/);
  if (numMatch) {
    candidates.add(`lesson-${numMatch[1]}-${numMatch[2]}`);
    candidates.add(`${numMatch[1]}.${numMatch[2]}`);
  }

  // 5. Klasyczne oczyszczenie
  const cleanNumber = raw
    .replace(/^(?:pol|eng|mat-roz|math-roz|eng-roz)?[-_]?(?:lesson|lekcja)[-_]?/i, '')
    .replace(/\./g, '-');
  candidates.add(cleanNumber.startsWith('lesson-') ? cleanNumber : `lesson-${cleanNumber}`);
  candidates.add(`lesson-${raw.replace(/^lesson[-_.]?/i, '').replace(/\./g, '-')}`);

  return Array.from(candidates);
}

/**
 * Automatycznie uzupełnia pigułkę wiedzy o schemat wektorowy SVG i osie liczbowe,
 * jeśli pigułka z bazy lub cache przeglądarki go nie posiada.
 */
export function enrichTheoryPillWithVisual(pill: any, lessonId: string): any {
  if (!pill) return pill;
  const candidates = getCandidateLessonVisualIds(lessonId);
  
  let registeredDiagram = null;
  for (const c of candidates) {
    if (THEORY_DIAGRAMS[c]) {
      registeredDiagram = THEORY_DIAGRAMS[c];
      break;
    }
  }

  let archetype = null;
  if (!registeredDiagram) {
    for (const c of candidates) {
      if (GEOMETRIC_ARCHETYPES[c]) {
        archetype = GEOMETRIC_ARCHETYPES[c];
        break;
      }
    }
  }

  // Pigułka z bazy danych lub zdefiniowana w kurikulum ma bezwzględne pierwszeństwo
  const diagram = (pill.diagram !== undefined && pill.diagram !== null)
    ? pill.diagram
    : (registeredDiagram || archetype || null);

  let registeredNumberLine = null;
  for (const c of candidates) {
    if (THEORY_NUMBER_LINES[c]) {
      registeredNumberLine = THEORY_NUMBER_LINES[c];
      break;
    }
  }

  const numberLine = (pill.numberLine !== undefined && pill.numberLine !== null)
    ? pill.numberLine
    : (registeredNumberLine || null);

  const enriched = {
    ...pill,
    diagram,
    numberLine
  };

  // Każda zakładka zachowuje unikalną rolę dydaktyczną:
  // Tab 0 ma swój diagram koncepcyjny/wykres.
  // Tab 1 (wzory), Tab 2 (przykład) i Tab 3 (pułapka) używają wyłącznie własnych dedykowanych grafik,
  // zapobiegając powtarzaniu tego samego schematu na wszystkich ekranach lekcji.

  return enriched;
}

/**
 * Automatycznie uzupełnia zadanie o wykres, schemat geometryczny SVG lub oś liczbową,
 * jeśli zadanie pobrane z Firestore lub lokalnego cache nie posiada elementu wizualnego.
 */
export function enrichTaskWithVisual(task: any, lessonId?: string): any {
  if (!task) return task;
  const taskId = String(task.id || '');
  const registered = TASK_VISUALS[taskId];
  const registeredNumberLine = TASK_NUMBER_LINES[taskId];
  const registeredExplanation = EXPLANATION_VISUALS[taskId];

  let resolvedTask = { ...task };

  // 0. Obsługa wykresów wyjaśniających (explanationPlot / explanationDiagram)
  if (!resolvedTask.explanationPlot && registeredExplanation) {
    resolvedTask.explanationPlot = registeredExplanation;
    resolvedTask.explanationDiagram = registeredExplanation;
  }

  // Zadania z bazy EXPLANATION_VISUALS to zadania czysto analityczne / obliczeniowe -
  // nie mogą mieć wykresu w treści pytania (zero spoilerów przed rozwiązaniem)!
  if (registeredExplanation) {
    return {
      ...resolvedTask,
      plot: null,
      diagram: null
    };
  }

  // 1. Obsługa osi liczbowej (numberLine)
  if (resolvedTask.numberLine === null) {
    // jawnie wyłączona oś liczbowa (np. zadania czysto algebraiczne lub funkcyjne)
  } else if (resolvedTask.numberLine) {
    // już posiada jawnie przypisaną oś liczbowa
  } else if (registeredNumberLine) {
    resolvedTask.numberLine = registeredNumberLine;
  } else {
    // Zakaz auto-iniekcji osi liczbowej do pytań zadań (zapobiega nakładaniu osi 1D na zadania funkcyjne)
    resolvedTask.numberLine = null;
  }

  // 2. Obsługa wariantów odpowiedzi ABCD (wyłącznie dla dedykowanych pytań o wybór rysunku osi)
  const taskText = resolvedTask.question || resolvedTask.content || resolvedTask.math_statement || '';
  const isFunctionOrAlgebraTopic = /dzial-(?:[1246789]|10)\b/i.test(String(resolvedTask.topicId || '')) 
    || /lesson-(?:[1246789]|10)-/i.test(lessonId || '')
    || /funkcj|parabol|wykres/i.test(taskText);

  const isVisualOptionsQuestion = !isFunctionOrAlgebraTopic && /na którym rysunku.*zaznaczono na osi|wskaż rysunek.*osi/i.test(taskText);

  if (isVisualOptionsQuestion && Array.isArray(resolvedTask.options)) {
    resolvedTask.options = resolvedTask.options.map((opt: any, optIdx: number) => {
      if (opt.numberLine || opt.diagram) return opt;
      const optText = opt.text || opt.content_latex || opt.content || '';
      const optNl = autoDeriveTaskNumberLine(optText);
      if (optNl) {
        return {
          ...opt,
          numberLine: optNl
        };
      }
      return opt;
    });
  }

  // 3. Obsługa schematów geometrycznych / wykresów (diagram / plot)
  if (resolvedTask.diagram === null || resolvedTask.plot === null) {
    // Jawnie wyłączony schemat (np. zadania algebraiczne, rachunkowe, potęgi, logarytmy)
    return {
      ...resolvedTask,
      plot: null,
      diagram: null
    };
  }

  if (resolvedTask.diagram || resolvedTask.plot) {
    const visual = resolvedTask.diagram || resolvedTask.plot;
    return {
      ...resolvedTask,
      plot: resolvedTask.plot || visual,
      diagram: resolvedTask.diagram || visual
    };
  }

  if (registered) {
    return {
      ...resolvedTask,
      plot: registered,
      diagram: registered
    };
  }

  // Automatyczne dopasowanie schematu geometrycznego na podstawie identyfikatora lekcji
  const derivedLessonId = lessonId || (() => {
    const match = taskId.match(/^(?:task-)?([0-9]+-[0-9]+)/i);
    return match ? `lesson-${match[1]}` : '';
  })();

  // Nowe działy kurikulum (1–13+) nie dziedziczą starych archetypów trójkątów ani stereometrii
  const isExemptFromOldArchetypes = /^(?:task-)?([1-9]|1[0-9])-/i.test(taskId) || /^lesson-([1-9]|1[0-9])-/i.test(derivedLessonId);

  const archetype = isExemptFromOldArchetypes
    ? null
    : (GEOMETRIC_ARCHETYPES[derivedLessonId] 
       || THEORY_DIAGRAMS[derivedLessonId]
       || (derivedLessonId.includes('lesson-15-6') ? GEOMETRIC_ARCHETYPES['lesson-15-6'] : null)
       || (derivedLessonId.includes('lesson-15-4') ? GEOMETRIC_ARCHETYPES['lesson-15-4'] : null)
       || (derivedLessonId.includes('lesson-15-5') ? GEOMETRIC_ARCHETYPES['lesson-15-5'] : null));

  if (archetype) {
    return {
      ...resolvedTask,
      plot: archetype,
      diagram: archetype
    };
  }

  return resolvedTask;
}

