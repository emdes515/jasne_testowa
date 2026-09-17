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
    height: 270,
    segments: [
      // Osie OX i OY
      { from: [30, 150], to: [510, 150], color: '#64748B', strokeWidth: 1.5 },
      { from: [200, 250], to: [200, 25], color: '#64748B', strokeWidth: 1.5 },
      // Groty strzałek osi
      { from: [502, 146], to: [510, 150], color: '#64748B', strokeWidth: 1.5 },
      { from: [502, 154], to: [510, 150], color: '#64748B', strokeWidth: 1.5 },
      { from: [196, 33], to: [200, 25], color: '#64748B', strokeWidth: 1.5 },
      { from: [204, 33], to: [200, 25], color: '#64748B', strokeWidth: 1.5 },
      // Podświetlenie Df bezpośrednio na osi OX (bez poprzecznych belek przecinających wykres)
      { from: [72, 150], to: [360, 150], color: '#38BDF8', strokeWidth: 4 },
      // Podświetlenie ZWf bezpośrednio na osi OY
      { from: [200, 214], to: [200, 54], color: '#10B981', strokeWidth: 4 },
      // Cienkie linie rzutowania punktów skrajnych na osie
      { from: [72, 214], to: [72, 150], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [72, 214], to: [200, 214], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [360, 54], to: [360, 150], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [360, 54], to: [200, 54], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [140, 54], to: [200, 54], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [250, 214], to: [200, 214], color: '#64748B', strokeWidth: 1, dashed: true }
    ],
    curves: [
      {
        path: 'M 72 214 C 95 100, 115 54, 140 54 C 175 54, 210 214, 250 214 C 290 214, 325 54, 360 54',
        color: '#FFB800',
        strokeWidth: 3.5,
        glow: true
      }
    ],
    points: [
      // Punkty skrajne z bezpiecznymi odsunięciami na zewnątrz
      { x: 72, y: 214, dot: 'filled', color: '#FFB800', label: '(-4, -2)', labelPosition: 'bottom-left' },
      { x: 140, y: 54, dot: 'filled', color: '#10B981', label: 'maksimum: y = 3', labelPosition: 'top' },
      { x: 250, y: 214, dot: 'filled', color: '#F43F5E', label: 'minimum: y = -2', labelPosition: 'bottom' },
      { x: 360, y: 54, dot: 'filled', color: '#FFB800', label: '(5, 3)', labelPosition: 'top-right' },
      // Granice Df na osi OX
      { x: 72, y: 150, dot: 'filled', color: '#38BDF8', label: '-4', labelPosition: 'bottom' },
      { x: 360, y: 150, dot: 'filled', color: '#38BDF8', label: '5', labelPosition: 'bottom' },
      // Granice ZWf na osi OY
      { x: 200, y: 214, dot: 'filled', color: '#10B981', label: '-2', labelPosition: 'left' },
      { x: 200, y: 54, dot: 'filled', color: '#10B981', label: '3', labelPosition: 'left' }
    ],
    labels: [
      { x: 505, y: 135, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 215, y: 30, text: 'y', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      // Etykieta y = f(x) w całkowicie pustym narożniku
      { x: 450, y: 190, text: 'y = f(x)', color: '#FFB800', fontSize: 13, fontWeight: '700', badge: true }
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
    height: 270,
    segments: [
      // Osie
      { from: [30, 160], to: [510, 160], color: '#64748B', strokeWidth: 1.5 },
      { from: [200, 250], to: [200, 25], color: '#64748B', strokeWidth: 1.5 },
      // Groty strzałek osi
      { from: [502, 156], to: [510, 160], color: '#64748B', strokeWidth: 1.5 },
      { from: [502, 164], to: [510, 160], color: '#64748B', strokeWidth: 1.5 },
      { from: [196, 33], to: [200, 25], color: '#64748B', strokeWidth: 1.5 },
      { from: [204, 33], to: [200, 25], color: '#64748B', strokeWidth: 1.5 },
      // Pozioma prosta y = c
      { from: [30, 95], to: [510, 95], color: '#38BDF8', strokeWidth: 2, dashed: true },
      // Pionowe linie rzutowania punktów przecięcia na oś OX
      { from: [105, 95], to: [105, 160], color: '#F43F5E', strokeWidth: 1.5, dashed: true },
      { from: [215, 95], to: [215, 160], color: '#F43F5E', strokeWidth: 1.5, dashed: true },
      { from: [375, 95], to: [375, 160], color: '#F43F5E', strokeWidth: 1.5, dashed: true }
    ],
    curves: [
      {
        path: 'M 60 210 C 100 60, 130 50, 160 50 C 200 50, 240 230, 290 230 C 340 230, 390 60, 440 60',
        color: '#FFB800',
        strokeWidth: 3.5,
        glow: true
      }
    ],
    points: [
      { x: 105, y: 95, dot: 'filled', color: '#F43F5E', label: 'x₁', labelPosition: 'top-left' },
      { x: 215, y: 95, dot: 'filled', color: '#F43F5E', label: 'x₂', labelPosition: 'top' },
      { x: 375, y: 95, dot: 'filled', color: '#F43F5E', label: 'x₃', labelPosition: 'top-right' },
      { x: 200, y: 95, dot: 'none', label: 'c', labelPosition: 'left' }
    ],
    labels: [
      { x: 505, y: 145, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 215, y: 30, text: 'y', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 455, y: 80, text: 'prosta y = c', color: '#38BDF8', fontSize: 11, fontWeight: '700', badge: true },
      { x: 455, y: 190, text: 'y = f(x)', color: '#FFB800', fontSize: 13, fontWeight: '700', badge: true }
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
    segments: [
      // Osie układu współrzędnych
      { from: [40, 165], to: [510, 165], color: '#64748B', strokeWidth: 1.5 },
      { from: [130, 260], to: [130, 25], color: '#64748B', strokeWidth: 1.5 },
      // Groty strzałek osi
      { from: [502, 161], to: [510, 165], color: '#64748B', strokeWidth: 1.5 },
      { from: [502, 169], to: [510, 165], color: '#64748B', strokeWidth: 1.5 },
      { from: [126, 33], to: [130, 25], color: '#64748B', strokeWidth: 1.5 },
      { from: [134, 33], to: [130, 25], color: '#64748B', strokeWidth: 1.5 },
      // Oś symetrii paraboli x = p
      { from: [290, 260], to: [290, 42], color: '#38BDF8', strokeWidth: 1.75, dashed: true },
      // Wytyczne współrzędnych wierzchołka (rzuty na osie)
      { from: [130, 215], to: [290, 215], color: '#64748B', strokeWidth: 1, dashed: true },
      { from: [290, 165], to: [290, 215], color: '#64748B', strokeWidth: 1, dashed: true }
    ],
    curves: [
      {
        quadratic: {
          start: [100, 16],
          control: [290, 414],
          end: [480, 16]
        },
        color: '#FFB800',
        strokeWidth: 3.5,
        glow: true
      }
    ],
    points: [
      { x: 290, y: 215, dot: 'filled', color: '#10B981', label: 'W = (p, q)', labelPosition: 'bottom' },
      { x: 130, y: 74, dot: 'filled', color: '#38BDF8', label: '(0, c)', labelPosition: 'left' },
      { x: 190, y: 165, dot: 'filled', color: '#F43F5E', label: 'x₁', labelPosition: 'top-left' },
      { x: 390, y: 165, dot: 'filled', color: '#F43F5E', label: 'x₂', labelPosition: 'top-right' },
      { x: 290, y: 165, dot: 'none', label: 'p', labelPosition: 'top' },
      { x: 130, y: 215, dot: 'none', label: 'q', labelPosition: 'left' }
    ],
    labels: [
      { x: 505, y: 152, text: 'x', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 145, y: 30, text: 'y', color: '#94A3B8', fontSize: 13, fontWeight: '700' },
      { x: 290, y: 28, text: 'oś symetrii: x = p', color: '#38BDF8', fontSize: 11, fontWeight: '700', badge: true },
      { x: 450, y: 45, text: 'y = f(x)', color: '#FFB800', fontSize: 13, fontWeight: '700', badge: true }
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
  
  const diagram = pill.diagram 
    || THEORY_DIAGRAMS[lessonId] 
    || THEORY_DIAGRAMS[rawId] 
    || THEORY_DIAGRAMS[normId] 
    || THEORY_DIAGRAMS[dotToDash] 
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
