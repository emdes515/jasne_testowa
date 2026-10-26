/**
 * Rysunki pomocnicze do zadań z planimetrii i stereometrii.
 * Każdy rysunek jest poglądowy (bez zachowania proporcji) i pokazuje wyłącznie dane z treści zadania;
 * szukana wielkość jest oznaczona znakiem „?”. Rysunek nie może zdradzać kroku rozwiązania.
 */

const AMBER = '#FFB800';
const SKY = '#38BDF8';
const GREEN = '#10B981';
const RED = '#F43F5E';
const SLATE = '#94A3B8';
const FILL = 'rgba(255, 184, 0, 0.06)';

const has = (v) => v !== undefined && v !== null && v !== '';
const txt = (x, y, text, anchor = 'middle', color) => ({ x, y, text: String(text), anchor, fontSize: 15, color: color || (String(text).includes('?') ? RED : '#DFE2F1') });
const seg = (from, to, color = AMBER, extra = {}) => ({ from, to, color, strokeWidth: 2.5, ...extra });
const dash = (from, to, color = SKY) => ({ from, to, color, strokeWidth: 2, dashed: true, opacity: 0.9 });
const dot = (x, y, label, labelPosition, color = AMBER) => ({ x, y, dot: 'filled', color, label, labelPosition });
const ellipse = (cx, cy, rx, ry, color = AMBER, dashed = false) => ({
  path: `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`,
  color,
  strokeWidth: 2,
  ...(dashed ? { dashed: true } : {})
});

function fig(type, parts) {
  const out = { type, title: 'Rysunek pomocniczy', caption: 'Rysunek poglądowy – nie zachowuje proporcji.', width: 420, height: 230 };
  for (const [k, v] of Object.entries(parts)) {
    const list = v.filter(Boolean);
    if (list.length) out[k] = list;
  }
  return out;
}

// ---------- Planimetria ----------

/** Trójkąt prostokątny: przyprostokątne `leg1` (pozioma), `leg2` (pionowa), przeciwprostokątna `hyp`, opcjonalnie wysokość `alt`. */
export function figRightTriangle({ leg1, leg2, hyp, alt, angleB }) {
  return fig('GEOMETRY_2D', {
    polygons: [
      { points: [[110, 180], [330, 180], [110, 50]], fill: FILL, stroke: AMBER, strokeWidth: 2.5 },
      { points: [[110, 166], [124, 166], [124, 180], [110, 180]], fill: 'none', stroke: SLATE, strokeWidth: 1.5 }
    ],
    segments: [has(alt) && dash([110, 180], [166.9, 83.6])],
    labels: [has(leg1) && txt(220, 204, leg1), has(leg2) && txt(96, 120, leg2, 'end'), has(hyp) && txt(236, 104, hyp, 'start'), has(alt) && txt(150, 150, alt, 'start', String(alt).includes('?') ? RED : SKY), has(angleB) && txt(284, 174, angleB, 'middle', GREEN)]
  });
}

/** Trójkąt równoramienny z wysokością opuszczoną na podstawę. */
export function figIsosceles({ base, arm, h }) {
  return fig('GEOMETRY_2D', {
    polygons: [{ points: [[110, 190], [310, 190], [210, 45]], fill: FILL, stroke: AMBER, strokeWidth: 2.5 }],
    segments: [has(h) && dash([210, 45], [210, 190])],
    labels: [has(base) && txt(210, 213, base), has(arm) && txt(148, 112, arm, 'end'), has(arm) && txt(272, 112, arm, 'start'), has(h) && txt(220, 135, h, 'start', String(h).includes('?') ? RED : SKY)]
  });
}

/** Prostokąt z przekątną. */
export function figRect({ s1, s2, d }) {
  return fig('GEOMETRY_2D', {
    polygons: [{ points: [[90, 60], [330, 60], [330, 180], [90, 180]], fill: FILL, stroke: AMBER, strokeWidth: 2.5 }],
    segments: [has(d) && seg([90, 180], [330, 60], SKY)],
    labels: [has(s1) && txt(210, 204, s1), has(s2) && txt(344, 126, s2, 'start'), has(d) && txt(196, 108, d, 'end', String(d).includes('?') ? RED : SKY)]
  });
}

/** Romb ABCD z przekątnymi AC i BD. */
export function figRhombus({ ac, bd, side }) {
  return fig('GEOMETRY_2D', {
    polygons: [{ points: [[80, 115], [210, 190], [340, 115], [210, 40]], fill: FILL, stroke: AMBER, strokeWidth: 2.5 }],
    segments: [dash([80, 115], [340, 115]), dash([210, 40], [210, 190], GREEN)],
    points: [dot(80, 115, 'A', 'left'), dot(210, 190, 'B', 'bottom'), dot(340, 115, 'C', 'right'), dot(210, 40, 'D', 'top')],
    labels: [has(ac) && txt(282, 108, `|AC| = ${ac}`, 'middle', SKY), has(bd) && txt(218, 76, `|BD| = ${bd}`, 'start', GREEN), has(side) && txt(132, 168, side, 'end')]
  });
}

/** Trapez: podstawy `a` (dolna) i `b` (górna), wysokość `h`, ramię `arm`. */
export function figTrapezoid({ a, b, h, arm, isosceles = false }) {
  const top = isosceles ? [[150, 65], [270, 65]] : [[150, 65], [290, 65]];
  return fig('GEOMETRY_2D', {
    polygons: [{ points: [[80, 185], [340, 185], top[1], top[0]], fill: FILL, stroke: AMBER, strokeWidth: 2.5 }],
    segments: [has(h) && dash([150, 65], [150, 185])],
    labels: [
      has(a) && txt(230, 208, a),
      has(b) && txt((top[0][0] + top[1][0]) / 2, 54, b),
      has(h) && txt(160, 132, h, 'start', String(h).includes('?') ? RED : SKY),
      has(arm) && txt((340 + top[1][0]) / 2 + 12, 122, arm, 'start'),
      has(arm) && isosceles && txt(104, 122, arm, 'end')
    ]
  });
}

/** Równoległobok: boki `a` (dolny) i `b` (boczny), wysokość `ha` opuszczona na bok `a`. */
export function figParallelogram({ a, b, ha }) {
  return fig('GEOMETRY_2D', {
    polygons: [{ points: [[80, 180], [300, 180], [350, 70], [130, 70]], fill: FILL, stroke: AMBER, strokeWidth: 2.5 }],
    segments: [has(ha) && dash([130, 70], [130, 180])],
    labels: [has(a) && txt(190, 204, a), has(b) && txt(338, 132, b, 'start'), has(ha) && txt(140, 132, ha, 'start', SKY)]
  });
}

const onCircle = (cx, cy, r, deg) => [Math.round((cx + r * Math.cos((deg * Math.PI) / 180)) * 10) / 10, Math.round((cy - r * Math.sin((deg * Math.PI) / 180)) * 10) / 10];

/** Kąt środkowy ASB i kąt wpisany ACB oparte na tym samym łuku AB. */
export function figInscribedCentral({ central, inscribed }) {
  const [S, R] = [[210, 115], 85];
  const A = onCircle(...S, R, 215);
  const B = onCircle(...S, R, 325);
  const C = onCircle(...S, R, 90);
  return fig('GEOMETRY_2D', {
    circles: [{ cx: S[0], cy: S[1], r: R, stroke: AMBER, strokeWidth: 2.5, fill: FILL }],
    segments: [seg(S, A, SKY), seg(S, B, SKY), seg(C, A, GREEN), seg(C, B, GREEN)],
    points: [dot(...A, 'A', 'bottom-left'), dot(...B, 'B', 'bottom-right'), dot(...C, 'C', 'top'), dot(...S, 'S', 'top', SKY)],
    labels: [has(central) && txt(210, 146, central, 'middle', String(central).includes('?') ? RED : SKY), has(inscribed) && txt(210, 66, inscribed, 'middle', String(inscribed).includes('?') ? RED : GREEN)]
  });
}

/** Trójkąt ABC wpisany w okrąg, AB jest średnicą. */
export function figDiameterTriangle({ atA, atB }) {
  const [S, R] = [[210, 115], 85];
  const A = onCircle(...S, R, 180);
  const B = onCircle(...S, R, 0);
  const C = onCircle(...S, R, 60);
  return fig('GEOMETRY_2D', {
    circles: [{ cx: S[0], cy: S[1], r: R, stroke: AMBER, strokeWidth: 2.5, fill: FILL }],
    segments: [seg(A, B, SKY), seg(A, C, GREEN), seg(B, C, GREEN)],
    points: [dot(...A, 'A', 'left'), dot(...B, 'B', 'right'), dot(...C, 'C', 'top-right')],
    labels: [has(atA) && txt(162, 108, atA, 'middle'), has(atB) && txt(272, 108, atB, 'middle')]
  });
}

/** Trójkąt równoramienny ASB: S – środek okręgu, A i B na okręgu. */
export function figCenterTriangle({ central, atA }) {
  const [S, R] = [[210, 105], 85];
  const A = onCircle(...S, R, 205);
  const B = onCircle(...S, R, 335);
  return fig('GEOMETRY_2D', {
    circles: [{ cx: S[0], cy: S[1], r: R, stroke: AMBER, strokeWidth: 2.5, fill: FILL }],
    segments: [seg(S, A, SKY), seg(S, B, SKY), seg(A, B, GREEN)],
    points: [dot(...A, 'A', 'left'), dot(...B, 'B', 'right'), dot(...S, 'S', 'top', SKY)],
    labels: [has(central) && txt(210, 132, central, 'middle'), has(atA) && txt(166, 136, atA, 'middle')]
  });
}

/** Styczna PA do okręgu o środku S (A – punkt styczności). */
export function figTangent({ r, pa, ps }) {
  return fig('GEOMETRY_2D', {
    circles: [{ cx: 140, cy: 130, r: 70, stroke: AMBER, strokeWidth: 2.5, fill: FILL }],
    segments: [seg([60, 60], [390, 60], SLATE, { strokeWidth: 1.5 }), seg([140, 130], [140, 60], SKY), seg([140, 60], [350, 60], GREEN), seg([140, 130], [350, 60], AMBER)],
    points: [dot(140, 130, 'S', 'bottom', SKY), dot(140, 60, 'A', 'top'), dot(350, 60, 'P', 'top')],
    labels: [has(r) && txt(130, 102, r, 'end'), has(pa) && txt(250, 50, pa, 'middle'), has(ps) && txt(262, 112, ps, 'start')]
  });
}

// ---------- Stereometria ----------

/** Prostopadłościan: krawędzie `x` (szerokość), `y` (głębokość), `z` (wysokość), opcjonalnie przekątna bryły i podstawy. */
export function figCuboid({ x, y, z, diag, baseDiag, angle }) {
  const [A, B, C, D] = [[110, 200], [260, 200], [260, 90], [110, 90]];
  const [A2, B2, C2, D2] = [[170, 160], [320, 160], [320, 50], [170, 50]];
  const thin = { strokeWidth: 1.5, dashed: true };
  return fig('STEREOMETRY_3D', {
    polygons: [has(baseDiag) && has(diag) && { points: [A, B2, C2], fill: 'rgba(244, 63, 94, 0.08)', stroke: 'none' }],
    segments: [
      seg(A, B), seg(B, C), seg(C, D), seg(D, A),
      seg(A2, B2, AMBER, thin), seg(A2, D2, AMBER, thin), seg(A, A2, AMBER, thin),
      seg(B2, C2), seg(C2, D2), seg(B, B2), seg(C, C2), seg(D, D2),
      has(baseDiag) && dash(A, B2),
      has(diag) && seg(A, C2, RED)
    ],
    labels: [
      has(x) && txt(185, 221, x),
      has(y) && txt(298, 192, y, 'start'),
      has(z) && txt(332, 110, z, 'start'),
      has(diag) && txt(196, 118, diag, 'end', RED),
      has(angle) && txt(158, 190, angle, 'start', GREEN)
    ]
  });
}

/**
 * Ostrosłup prawidłowy czworokątny: krawędź podstawy `a`, wysokość `H`,
 * `slant` – wysokość ściany bocznej, `edge` – krawędź boczna, `faceAngle` / `edgeAngle` – kąty nachylenia.
 */
export function figPyramid({ a, H, slant, edge, faceAngle, edgeAngle }) {
  const [A, B, C, D, O, S, E] = [[70, 200], [270, 200], [350, 155], [150, 155], [210, 177.5], [210, 40], [170, 200]];
  const thin = { strokeWidth: 1.5, dashed: true };
  const showFace = has(slant) || has(faceAngle);
  const showEdge = has(edgeAngle);
  return fig('STEREOMETRY_3D', {
    segments: [
      seg(A, B), seg(B, C), seg(C, D, AMBER, thin), seg(D, A, AMBER, thin),
      seg(S, A), seg(S, B), seg(S, C, has(edge) || showEdge ? GREEN : AMBER), seg(S, D, AMBER, thin),
      has(H) && dash(S, O, RED),
      showFace && seg(S, E, SKY),
      showFace && dash(O, E),
      showEdge && dash(O, C, GREEN)
    ],
    points: [dot(...S, 'S', 'top'), has(H) && dot(...O, 'O', 'right', RED)],
    labels: [
      has(a) && txt(238, 221, a),
      has(H) && txt(220, 120, H, 'start', String(H).includes('?') ? RED : '#DFE2F1'),
      has(slant) && txt(180, 120, slant, 'end', String(slant).includes('?') ? RED : SKY),
      has(edge) && txt(294, 92, edge, 'start', String(edge).includes('?') ? RED : GREEN),
      has(faceAngle) && txt(160, 192, faceAngle, 'end', SKY),
      has(edgeAngle) && txt(360, 150, edgeAngle, 'start', GREEN)
    ]
  });
}

/** Walec o promieniu `r` i wysokości `h`. */
export function figCylinder({ r, h }) {
  return fig('STEREOMETRY_3D', {
    curves: [ellipse(210, 60, 80, 22), ellipse(210, 180, 80, 22)],
    segments: [seg([130, 60], [130, 180]), seg([290, 60], [290, 180]), has(r) && seg([210, 180], [290, 180], GREEN)],
    points: [has(r) && dot(210, 180, undefined, undefined, GREEN)],
    labels: [has(r) && txt(250, 174, r, 'middle', GREEN), has(h) && txt(302, 124, h, 'start')]
  });
}

/** Stożek: promień `r`, wysokość `h`, tworząca `l`, kąt `angle` między tworzącą a podstawą. */
export function figCone({ r, h, l, angle }) {
  return fig('STEREOMETRY_3D', {
    curves: [ellipse(210, 185, 90, 24)],
    segments: [seg([120, 185], [210, 40]), seg([300, 185], [210, 40]), has(h) && dash([210, 40], [210, 185], RED), has(r) && seg([210, 185], [300, 185], GREEN)],
    points: [dot(210, 40, 'S', 'top'), has(r) && dot(210, 185, undefined, undefined, GREEN)],
    labels: [
      has(r) && txt(246, 180, r, 'middle', GREEN),
      has(h) && txt(200, 125, h, 'end', String(h).includes('?') ? RED : '#DFE2F1'),
      has(l) && txt(270, 105, l, 'start'),
      has(angle) && txt(276, 178, angle, 'middle', SKY)
    ]
  });
}

/** Kula o promieniu `r`. */
export function figSphere({ r }) {
  return fig('STEREOMETRY_3D', {
    circles: [{ cx: 210, cy: 115, r: 85, stroke: AMBER, strokeWidth: 2.5, fill: FILL }],
    curves: [ellipse(210, 115, 85, 22, SLATE, true)],
    segments: [seg([210, 115], [295, 115], GREEN)],
    points: [dot(210, 115, 'O', 'left', GREEN)],
    labels: [has(r) && txt(254, 107, r, 'middle', GREEN)]
  });
}

/** Trójkąt o bokach `a`, `b` wychodzących z jednego wierzchołka i kącie `g` (w stopniach) między nimi; `c` – bok naprzeciw kąta. */
export function figSas({ a, b, g, c }) {
  const obtuse = Number(g) > 90;
  const [A, B, C] = obtuse ? [[170, 185], [350, 185], [90, 70]] : [[90, 185], [350, 185], [190, 60]];
  return fig('GEOMETRY_2D', {
    polygons: [{ points: [A, B, C], fill: FILL, stroke: AMBER, strokeWidth: 2.5 }],
    labels: [
      has(a) && txt((A[0] + B[0]) / 2, 208, a),
      has(b) && txt((A[0] + C[0]) / 2 - 12, (A[1] + C[1]) / 2, b, 'end'),
      has(c) && txt((B[0] + C[0]) / 2 + 12, (B[1] + C[1]) / 2 - 6, c, 'start'),
      has(g) && txt(obtuse ? A[0] + 14 : A[0] + 44, A[1] - 10, `${g}°`, 'middle', GREEN)
    ]
  });
}

/** Twierdzenie Talesa: trójkąt ABC, D na AB, E na AC, DE równoległy do BC. */
export function figThales({ ad, ab, de, bc }) {
  const [A, B, C, D, E] = [[210, 35], [80, 195], [340, 195], [158, 99], [262, 99]];
  return fig('GEOMETRY_2D', {
    polygons: [{ points: [A, B, C], fill: FILL, stroke: AMBER, strokeWidth: 2.5 }],
    segments: [seg(D, E, SKY)],
    points: [dot(...A, 'A', 'top'), dot(...B, 'B', 'bottom-left'), dot(...C, 'C', 'bottom-right'), dot(...D, 'D', 'left', SKY), dot(...E, 'E', 'right', SKY)],
    labels: [has(ad) && txt(12, 60, `|AD| = ${ad}`, 'start'), has(ab) && txt(12, 82, `|AB| = ${ab}`, 'start'), has(de) && txt(210, 91, de, 'middle', String(de).includes('?') ? RED : SKY), has(bc) && txt(210, 217, bc)]
  });
}

/** Wycinek koła o promieniu `r` i kącie środkowym `angle` (w stopniach) – narysowany w rzeczywistej mierze kąta. */
export function figSector({ r, angle }) {
  const [S, R] = [[210, 122], 85];
  const arc = [];
  for (let d = 0; d <= angle; d += 5) arc.push(onCircle(...S, R, d));
  return fig('GEOMETRY_2D', {
    circles: [{ cx: S[0], cy: S[1], r: R, stroke: SLATE, strokeWidth: 1.5, fill: 'none', dashed: true }],
    polygons: [{ points: [S, ...arc], fill: 'rgba(255, 184, 0, 0.14)', stroke: AMBER, strokeWidth: 2.5 }],
    points: [dot(...S, 'S', 'bottom-left', SKY)],
    labels: [has(r) && txt(S[0] + 46, S[1] + 18, r, 'middle', SKY), txt(12, 24, `kąt środkowy: ${angle}°`, 'start', GREEN)]
  });
}

/** Punkty w układzie współrzędnych; `join` – łączy odcinkiem dwa pierwsze punkty. */
export function figPoints(points, { join = true } = {}) {
  const xs = [...points.map((p) => p.x), 0];
  const ys = [...points.map((p) => p.y), 0];
  const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  const step = span > 24 ? 5 : span > 12 ? 2 : 1;
  const lo = (v) => Math.floor((Math.min(...v) - step) / step) * step;
  const hi = (v) => Math.ceil((Math.max(...v) + step) / step) * step;
  return {
    type: 'PLOT',
    title: 'Rysunek pomocniczy',
    caption: step === 1 ? 'Każda kratka ma bok długości 1.' : `Każda kratka ma bok długości ${step}.`,
    plotData: {
      xRange: [lo(xs), hi(xs)],
      yRange: [lo(ys), hi(ys)],
      gridStep: step,
      segments: join && points.length >= 2 ? [{ from: [points[0].x, points[0].y], to: [points[1].x, points[1].y], color: SKY, strokeWidth: 2.5 }] : [],
      points: points.map((p) => ({ x: p.x, y: p.y, label: p.label, dot: 'filled', color: p.color || AMBER, attach: p.y >= 0 ? 'n' : 's' }))
    }
  };
}
