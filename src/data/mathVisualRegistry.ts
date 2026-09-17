import { MathDiagramData } from '../components/MathDiagram';
import { PlotData } from '../components/MathPlot';

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
// 3. SELF-HEALING ENRICHMENT UTILITIES
// =========================================================================

/**
 * Automatycznie uzupełnia pigułkę wiedzy o schemat wektorowy SVG,
 * jeśli pigułka z bazy lub cache przeglądarki go nie posiada.
 */
export function enrichTheoryPillWithVisual(pill: any, lessonId: string): any {
  if (!pill) return pill;
  const rawId = String(lessonId || '').toLowerCase().trim();
  const normId = rawId
    .replace(/^(?:pol|eng|mat-roz|math-roz|eng-roz)?[-_]?lesson[-_]?/i, 'lesson-')
    .replace(/\./g, '-');
  const dotToDash = `lesson-${rawId.replace(/^lesson[-_.]?/i, '').replace(/\./g, '-')}`;
  
  const diagram = THEORY_DIAGRAMS[lessonId] 
    || THEORY_DIAGRAMS[rawId] 
    || THEORY_DIAGRAMS[normId] 
    || THEORY_DIAGRAMS[dotToDash] 
    || pill.diagram
    || null;

  return {
    ...pill,
    diagram
  };
}

/**
 * Automatycznie uzupełnia zadanie o wykres lub schemat geometryczny SVG,
 * jeśli zadanie pobrane z Firestore lub lokalnego IndexedDB nie ma pola plot / diagram.
 */
export function enrichTaskWithVisual(task: any, lessonId?: string): any {
  if (!task) return task;
  const taskId = String(task.id || '');
  const registered = TASK_VISUALS[taskId];

  if (!task.plot && registered) {
    return {
      ...task,
      plot: registered,
      diagram: registered
    };
  }

  if (task.plot && !task.diagram) {
    return {
      ...task,
      diagram: task.plot
    };
  }

  return task;
}
