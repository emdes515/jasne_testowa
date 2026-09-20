import { MathDiagramData } from '../components/MathDiagram';
import { PlotData } from '../components/MathPlot';
import { NumberLineData } from '../components/NumberLineDiagram';

// =========================================================================
// 1. PIGUŁKI WIEDZY - SCHEMATY SVG DO TEORII (KARTY WZORÓW I DEFINICJI)
// =========================================================================

export const THEORY_DIAGRAMS: Record<string, MathDiagramData> = {
  // Lekcja 4.4: Odczytywanie dziedziny i zbioru wartości z wykresu
  'lesson-4-4': {
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
      // Punkty skrajne wykresu
      { x: 108, y: 219, dot: 'filled', color: '#FFB800', label: '(-4, -2)', labelPosition: 'bottom-left' },
      { x: 180, y: 59, dot: 'filled', color: '#10B981', label: 'maksimum: y = 3', labelPosition: 'top' },
      { x: 288, y: 219, dot: 'filled', color: '#F43F5E', label: 'minimum: y = -2', labelPosition: 'bottom' },
      { x: 432, y: 59, dot: 'filled', color: '#FFB800', label: '(5, 3)', labelPosition: 'top-right' },
      // Granice Df na osi OX (kropki podświetlenia)
      { x: 108, y: 155, dot: 'filled', color: '#38BDF8' },
      { x: 432, y: 155, dot: 'filled', color: '#38BDF8' },
      // Granice ZWf na osi OY (kropki podświetlenia)
      { x: 252, y: 219, dot: 'filled', color: '#10B981' },
      { x: 252, y: 59, dot: 'filled', color: '#10B981' }
    ],
    labels: [
      { x: 495, y: 140, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 268, y: 24, text: 'y', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 470, y: 110, text: 'y = f(x)', color: '#FFB800', fontSize: 13, fontWeight: '700', badge: true }
    ],
    metrics: [
      { label: 'Dziedzina (oś OX)', value: '$D_f = \\langle -4, 5 \\rangle$', color: '#38BDF8' },
      { label: 'Zbiór wartości (oś OY)', value: '$ZW_f = \\langle -2, 3 \\rangle$', color: '#10B981' },
      { label: 'Wartość maksymalna', value: '$y_{\\max} = 3$', color: '#10B981' },
      { label: 'Wartość minimalna', value: '$y_{\\min} = -2$', color: '#F43F5E' }
    ]
  },

  // Lekcja 4.5: Odczytywanie wartości funkcji oraz rozwiązywanie równania f(x) = c
  'lesson-4-5': {
    type: 'GEOMETRY_2D',
    title: 'Rozwiązywanie równania $f(x) = c$',
    formulaBadge: '$f(x) = c \\iff \\text{punkty przecięcia z prostą } y = c$',
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

  // Lekcja 6.1: Funkcja kwadratowa: Parabola, wierzchołek W=(p, q)
  'lesson-6-1': {
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

  // Lekcja 8.1: Trygonometria w trójkącie prostokątnym
  'lesson-8-1': {
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
      // Kąt prosty (kwadrat)
      { from: [380, 220], to: [380, 200], color: '#10B981', strokeWidth: 1.5 },
      { from: [380, 200], to: [400, 200], color: '#10B981', strokeWidth: 1.5 },
      // Etykiety boków z objaśnieniem
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

  // Lekcja 9.1: Planimetria: Kąty wpisane i środkowe w okręgu
  'lesson-9-1': {
    type: 'GEOMETRY_2D',
    title: 'Kąty w okręgu oparte na tym samym łuku $AB$',
    formulaBadge: '$\\beta = 2\\alpha \\iff \\alpha = \\frac{1}{2}\\beta$',
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
    formulaBadge: '$\\frac{a}{b} = \\frac{c}{d} \\iff a \\cdot d = b \\cdot c$',
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

  // Lekcja 11.1: Stereometria: Graniastosłup prawidłowy czworokątny
  'lesson-11-1': {
    type: 'STEREOMETRY_3D',
    title: 'Graniastosłup prawidłowy czworokątny: Przekątna bryły $D$',
    formulaBadge: '$d = a\\sqrt{2},\\quad D = \\sqrt{2a^2 + H^2}$',
    caption: 'Przekątna podstawy $d=a\\sqrt{2}$, wysokość $H$ oraz przekątna bryły $D$ tworzą trójkąt prostokątny o kącie nachylenia $\\alpha$.',
    width: 540,
    height: 280,
    polygons: [
      // Ściana przednia
      { points: [[160, 200], [300, 200], [300, 80], [160, 80]], fill: 'rgba(56, 189, 248, 0.05)', stroke: '#38BDF8', strokeWidth: 2 },
      // Ściana boczna prawa
      { points: [[300, 200], [380, 155], [380, 35], [300, 80]], fill: 'rgba(56, 189, 248, 0.08)', stroke: '#38BDF8', strokeWidth: 2 },
      // Ściana górna
      { points: [[160, 80], [300, 80], [380, 35], [240, 35]], fill: 'rgba(255, 184, 0, 0.08)', stroke: '#FFB800', strokeWidth: 2 }
    ],
    segments: [
      // Krawędzie niewidoczne podstawy dolnej
      { from: [160, 200], to: [240, 155], color: '#64748B', strokeWidth: 1.5, dashed: true },
      { from: [240, 155], to: [380, 155], color: '#64748B', strokeWidth: 1.5, dashed: true },
      { from: [240, 155], to: [240, 35], color: '#64748B', strokeWidth: 1.5, dashed: true },
      // Przekątna podstawy dolnej d
      { from: [160, 200], to: [380, 155], color: '#10B981', strokeWidth: 2.5, dashed: true, label: 'd = a√2' },
      // Przekątna bryły D
      { from: [160, 200], to: [380, 35], color: '#F43F5E', strokeWidth: 3, label: 'D' },
      // Wysokość H
      { from: [380, 155], to: [380, 35], color: '#38BDF8', strokeWidth: 2.5, label: 'H' },
      // Krawędź podstawy a
      { from: [160, 200], to: [300, 200], color: '#FFB800', strokeWidth: 2.5, label: 'a' }
    ],
    arcs: [
      { cx: 160, cy: 200, r: 40, startAngleDeg: 340, endAngleDeg: 360, color: '#10B981', label: 'α' }
    ],
    points: [
      { x: 160, y: 200, dot: 'filled', color: '#F43F5E', label: 'A', labelPosition: 'bottom-left' },
      { x: 380, y: 35, dot: 'filled', color: '#F43F5E', label: 'C\'', labelPosition: 'top-right' },
      { x: 380, y: 155, dot: 'filled', color: '#38BDF8', label: 'C', labelPosition: 'right' }
    ],
    metrics: [
      { label: 'Przekątna podstawy', value: '$d = a\\sqrt{2}$', color: '#10B981' },
      { label: 'Przekątna bryły', value: '$D = \\sqrt{2a^2 + H^2}$', color: '#F43F5E' },
      { label: 'Kąt nachylenia', value: 'kąt $\\alpha$', color: '#10B981' },
      { label: 'Wysokość bryły', value: 'krawędź $H$', color: '#38BDF8' }
    ]
  },

  // Lekcja 11.4: Stereometria: Ostrosłup prawidłowy czworokątny
  'lesson-11-4': {
    type: 'STEREOMETRY_3D',
    title: 'Ostrosłup prawidłowy czworokątny: Przekrój $H, \\frac{a}{2}, h_b$',
    formulaBadge: '$H^2 + \\left(\\frac{a}{2}\\right)^2 = h_b^2$',
    caption: 'Wysokość ostrosłupa $H$, apotema podstawy $\\frac{a}{2}$ oraz wysokość ściany bocznej $h_b$ tworzą trójkąt prostokątny.',
    width: 540,
    height: 280,
    polygons: [
      // Ściana boczna przednia-prawa
      { points: [[270, 45], [330, 230], [400, 185]], fill: 'rgba(56, 189, 248, 0.08)', stroke: '#38BDF8', strokeWidth: 2 },
      // Ściana boczna przednia-lewa
      { points: [[270, 45], [160, 200], [330, 230]], fill: 'rgba(255, 184, 0, 0.08)', stroke: '#FFB800', strokeWidth: 2 }
    ],
    segments: [
      // Podstawa niewidoczna
      { from: [160, 200], to: [230, 155], color: '#64748B', strokeWidth: 1.5, dashed: true },
      { from: [230, 155], to: [400, 185], color: '#64748B', strokeWidth: 1.5, dashed: true },
      { from: [270, 45], to: [230, 155], color: '#64748B', strokeWidth: 1.5, dashed: true },
      // Wysokość bryły H (od S do środka O)
      { from: [270, 45], to: [280, 193], color: '#F43F5E', strokeWidth: 2.5, dashed: true, label: 'H' },
      // Wysokość ściany bocznej hb (od S do M)
      { from: [270, 45], to: [365, 208], color: '#10B981', strokeWidth: 3, label: 'hb' },
      // Odcinek w podstawie łączący O ze środkiem krawędzi M (a/2)
      { from: [280, 193], to: [365, 208], color: '#FFB800', strokeWidth: 2.5, dashed: true, label: 'a/2' }
    ],
    arcs: [
      { cx: 365, cy: 208, r: 25, startAngleDeg: 190, endAngleDeg: 230, color: '#10B981', label: 'α' }
    ],
    points: [
      { x: 270, y: 45, dot: 'filled', color: '#F43F5E', label: 'S (wierzchołek)', labelPosition: 'top' },
      { x: 280, y: 193, dot: 'filled', color: '#CBD5E1', label: 'O (środek podstawy)', labelPosition: 'bottom-left' },
      { x: 365, y: 208, dot: 'filled', color: '#10B981', label: 'M (środek boku)', labelPosition: 'bottom-right' }
    ],
    metrics: [
      { label: 'Kluczowy przekrój', value: '$H^2 + (\\frac{a}{2})^2 = h_b^2$', color: '#10B981' },
      { label: 'Wysokość ostrosłupa', value: 'odcinek $H$', color: '#F43F5E' },
      { label: 'Wysokość ściany', value: 'odcinek $h_b$', color: '#10B981' },
      { label: 'Apotema podstawy', value: 'odcinek $\\frac{a}{2}$', color: '#FFB800' }
    ]
  }
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
      { x: 0, y: 0.625, label: '(0, c), c > 0', dot: 'filled', color: '#10B981' }
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
      { label: 'Dziedzina geometryczna', value: '$x > s \\land y > 0$', color: '#10B981' },
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

  // Lekcja 9.3: Trójkąt prostokątny i Twierdzenie Pitagorasa
  'lesson-9-3': {
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

  // Lekcja 9.4: Trójkąt równoboczny
  'lesson-9-4': {
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

  // Lekcja 10.1: Długość odcinka w układzie współrzędnych
  'lesson-10-1': {
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

  // Lekcja 10.2: Środek odcinka
  'lesson-10-2': {
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

  // Lekcja 10.5: Równanie okręgu w układzie
  'lesson-10-5': {
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

  // Lekcja 8.1: Definicje funkcji trygonometrycznych
  'lesson-8-1': {
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
// =========================================================================
// 4. REGISTRY OF NUMBER LINES (OSIE LICZBOWE CKE DO ZADAŃ I TEORII)
// =========================================================================

export const THEORY_NUMBER_LINES: Record<string, NumberLineData> = {
  // Osie liczbowe dla działów z nierównościami i wartością bezwzględną (np. Dział 1.3, 1.5)
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
 * Automatycznie uzupełnia pigułkę wiedzy o schemat wektorowy SVG i osie liczbowe,
 * jeśli pigułka z bazy lub cache przeglądarki go nie posiada.
 */
export function enrichTheoryPillWithVisual(pill: any, lessonId: string): any {
  if (!pill) return pill;
  const rawId = String(lessonId || '').toLowerCase().trim();
  const cleanNumber = rawId
    .replace(/^(?:pol|eng|mat-roz|math-roz|eng-roz)?[-_]?(?:lesson|lekcja|dzial-\d+-lekcja)[-_]?/i, '')
    .replace(/\./g, '-');
  const normId = cleanNumber.startsWith('lesson-') ? cleanNumber : `lesson-${cleanNumber}`;
  const dotToDash = `lesson-${rawId.replace(/^lesson[-_.]?/i, '').replace(/\./g, '-')}`;
  
  const diagram = pill.diagram !== undefined 
    ? pill.diagram 
    : (THEORY_DIAGRAMS[lessonId] 
       || THEORY_DIAGRAMS[rawId] 
       || THEORY_DIAGRAMS[normId] 
       || THEORY_DIAGRAMS[dotToDash] 
       || GEOMETRIC_ARCHETYPES[lessonId]
       || GEOMETRIC_ARCHETYPES[rawId]
       || GEOMETRIC_ARCHETYPES[normId]
       || GEOMETRIC_ARCHETYPES[dotToDash]
       || null);

  const numberLine = pill.numberLine !== undefined
    ? pill.numberLine
    : (THEORY_NUMBER_LINES[lessonId]
       || THEORY_NUMBER_LINES[rawId]
       || THEORY_NUMBER_LINES[normId]
       || THEORY_NUMBER_LINES[dotToDash]
       || null);

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

  let resolvedTask = { ...task };

  // 1. Obsługa osi liczbowej (numberLine)
  if (resolvedTask.numberLine === null) {
    // jawnie wyłączona oś liczbowa (np. zadania czysto algebraiczne)
  } else if (resolvedTask.numberLine) {
    // już posiada
  } else if (registeredNumberLine) {
    resolvedTask.numberLine = registeredNumberLine;
  } else {
    // Spróbuj wydedukować oś liczbową z treści polecenia zadania
    const taskText = resolvedTask.question || resolvedTask.content || resolvedTask.math_statement || '';
    const derivedNl = autoDeriveTaskNumberLine(taskText);
    if (derivedNl) {
      resolvedTask.numberLine = derivedNl;
    }
  }

  // 2. Obsługa wariantów odpowiedzi ABCD, jeśli pytanie pyta o zaznaczenie na osi
  const isVisualOptionsQuestion = /na którym rysunku|zaznaczono na osi/i.test(
    resolvedTask.question || resolvedTask.content || resolvedTask.math_statement || ''
  );

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

  const archetype = GEOMETRIC_ARCHETYPES[derivedLessonId] 
    || THEORY_DIAGRAMS[derivedLessonId]
    || (derivedLessonId.includes('lesson-15-6') ? GEOMETRIC_ARCHETYPES['lesson-15-6'] : null)
    || (derivedLessonId.includes('lesson-15-4') ? GEOMETRIC_ARCHETYPES['lesson-15-4'] : null)
    || (derivedLessonId.includes('lesson-15-5') ? GEOMETRIC_ARCHETYPES['lesson-15-5'] : null)
    || (derivedLessonId.includes('lesson-9-3') ? GEOMETRIC_ARCHETYPES['lesson-9-3'] : null)
    || (derivedLessonId.includes('lesson-9-4') ? GEOMETRIC_ARCHETYPES['lesson-9-4'] : null)
    || (derivedLessonId.includes('lesson-9-13') ? GEOMETRIC_ARCHETYPES['lesson-9-13'] : null)
    || (derivedLessonId.includes('lesson-10-1') ? GEOMETRIC_ARCHETYPES['lesson-10-1'] : null)
    || (derivedLessonId.includes('lesson-10-2') ? GEOMETRIC_ARCHETYPES['lesson-10-2'] : null)
    || (derivedLessonId.includes('lesson-10-5') ? GEOMETRIC_ARCHETYPES['lesson-10-5'] : null)
    || (derivedLessonId.includes('lesson-11-1') ? THEORY_DIAGRAMS['lesson-11-1'] : null)
    || (derivedLessonId.includes('lesson-11-4') ? THEORY_DIAGRAMS['lesson-11-4'] : null)
    || (derivedLessonId.includes('lesson-11-6') ? GEOMETRIC_ARCHETYPES['lesson-11-6'] : null)
    || (derivedLessonId.includes('lesson-11-7') ? GEOMETRIC_ARCHETYPES['lesson-11-7'] : null)
    || (derivedLessonId.includes('lesson-8-1') ? GEOMETRIC_ARCHETYPES['lesson-8-1'] : null);

  if (archetype) {
    return {
      ...resolvedTask,
      plot: archetype,
      diagram: archetype
    };
  }

  return resolvedTask;
}

