// Pomocnicze konstruktory rysunków do zadań z arkuszy CKE.
// Wykresy w układzie współrzędnych -> PlotData (src/components/MathPlot.tsx),
// rysunki geometryczne -> MathDiagramData typu GEOMETRY_2D (src/components/MathDiagram.tsx).

const INK = '#dfe2f1';
const SOFT = '#94a3b8';
const GOLD = '#ffb800';

/** Układ współrzędnych z dowolną zawartością (proste, parabola, odcinki, punkty, podpisy). */
export const plot = (xRange, yRange, extra = {}) => ({ xRange, yRange, gridStep: 1, ...extra });

/** Parabola y = a(x - p)^2 + q. */
export const parabola = (a, p, q, xRange, yRange, extra = {}) =>
  plot(xRange, yRange, { type: 'PARABOLA', parabola: { a, p, q }, ...extra });

/** Proste y = slope·x + intercept. */
export const lines = (list, xRange, yRange, extra = {}) =>
  plot(xRange, yRange, { type: 'LINEAR', lines: list.map(([slope, intercept, label]) => ({ slope, intercept, ...(label ? { label } : {}) })), ...extra });

/** Łamana / wykres odcinkami: pts = [[x,y],...]; kropki na końcach: 'filled' | 'hollow' | 'none'. */
export const polyline = (pts, xRange, yRange, { start = 'filled', end = 'filled', ...extra } = {}) =>
  plot(xRange, yRange, {
    type: 'PIECEWISE_LINEAR',
    segments: pts.slice(1).map((p, i) => ({
      from: pts[i],
      to: p,
      startDot: i === 0 ? start : 'none',
      endDot: i === pts.length - 2 ? end : 'none'
    })),
    ...extra
  });

/** Kilka wykresów obok siebie (np. rysunki A–F). */
export const panels = (list) => ({ panels: list.map(([title, p]) => ({ title, plot: p })) });

const POS = { t: 'top', b: 'bottom', l: 'left', r: 'right', tl: 'top-left', tr: 'top-right', bl: 'bottom-left', br: 'bottom-right' };

/**
 * Rysunek geometryczny we współrzędnych matematycznych (oś y w górę), skalowany do ramki 400 px
 * (wąska ramka = większe podpisy na telefonie; parametr `height` podaje się jak dla ramki 540 px).
 *   pts:     { A: [x, y, 'bl'], ... }  – trzeci element: położenie etykiety (t, b, l, r, tl, tr, bl, br), '' = bez etykiety
 *   segs:    ['AB', ['A', 'C'], [[x1, y1], [x2, y2]], ...]
 *   dashed:  jak segs, linia przerywana
 *   accent:  jak segs, odcinki wyróżnione (złote, grubsze) – np. ramiona zaznaczonego kąta
 *   circles: [[cx, cy, r], ...]
 *   texts:   [[x, y, 'a'], ...]      – podpisy długości, miar kątów itp.
 *   marks:   [[x, y, r, startDeg, endDeg, label?], ...] – łuki kątów (kąty liczone jak w matematyce, przeciwnie do wskazówek zegara od osi x)
 */
export function geo({ pts = {}, segs = [], dashed = [], accent = [], circles = [], texts = [], marks = [], height: height540 = 300, caption }) {
  const width = 400;
  const height = Math.round((height540 * width) / 540);
  const P = Object.fromEntries(Object.entries(pts).map(([k, v]) => [k, [v[0], v[1]]]));
  const resolve = (s) => {
    if (typeof s === 'string') return [P[s[0]], P[s.slice(1)]];
    return s.map((e) => (typeof e === 'string' ? P[e] : e));
  };
  const allSegs = [...segs.map((s) => [resolve(s), false]), ...dashed.map((s) => [resolve(s), true]), ...accent.map((s) => [resolve(s), 'accent'])];
  for (const [[a, b]] of allSegs) if (!a || !b) throw new Error('geo: nieznany punkt w odcinku');
  const xs = [], ys = [];
  const add = (x, y) => { xs.push(x); ys.push(y); };
  Object.values(P).forEach(([x, y]) => add(x, y));
  allSegs.forEach(([[a, b]]) => { add(a[0], a[1]); add(b[0], b[1]); });
  circles.forEach(([cx, cy, r]) => { add(cx - r, cy - r); add(cx + r, cy + r); });
  texts.forEach(([x, y]) => add(x, y));
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const pad = 34;
  const k = Math.min((width - 2 * pad) / Math.max(maxX - minX, 1e-9), (height - 2 * pad) / Math.max(maxY - minY, 1e-9));
  const ox = (width - k * (maxX - minX)) / 2, oy = (height - k * (maxY - minY)) / 2;
  const tx = (x) => Math.round((ox + (x - minX) * k) * 10) / 10;
  const ty = (y) => Math.round((height - oy - (y - minY) * k) * 10) / 10;
  return {
    type: 'GEOMETRY_2D',
    width,
    height,
    ...(caption ? { caption } : {}),
    segments: allSegs.map(([[a, b], dash]) => ({
      from: [tx(a[0]), ty(a[1])],
      to: [tx(b[0]), ty(b[1])],
      color: dash === 'accent' ? GOLD : dash ? SOFT : INK,
      strokeWidth: dash === 'accent' ? 3 : dash ? 1.5 : 2,
      ...(dash === true ? { dashed: true } : {})
    })),
    ...(circles.length ? { circles: circles.map(([cx, cy, r]) => ({ cx: tx(cx), cy: ty(cy), r: Math.round(r * k * 10) / 10, fill: 'none', stroke: INK, strokeWidth: 2 })) } : {}),
    ...(marks.length
      ? {
          arcs: marks.map(([x, y, r, a0, a1, label]) => ({
            cx: tx(x),
            cy: ty(y),
            r: Math.round(r * k * 10) / 10,
            // MathDiagram liczy kąty zgodnie z ruchem wskazówek zegara od „godziny 12”
            startAngleDeg: 90 - a1,
            endAngleDeg: 90 - a0,
            color: GOLD,
            ...(label ? { label } : {})
          }))
        }
      : {}),
    points: Object.entries(pts)
      .filter(([, v]) => v[2] !== '')
      .map(([name, v]) => ({ x: tx(v[0]), y: ty(v[1]), label: name, labelPosition: POS[v[2]] || 'top', dot: 'filled', noBox: true })),
    ...(texts.length ? { labels: texts.map(([x, y, text]) => ({ x: tx(x), y: ty(y), text, color: GOLD, fontSize: 15, fontWeight: '700', anchor: 'middle' })) } : {})
  };
}

/**
 * Diagram słupkowy: data = [[etykieta, liczebność], ...]. Liczebność jest podpisana nad słupkiem,
 * więc dane da się odczytać dokładnie także na małym ekranie.
 */
export function bars(data, { xTitle = '', yTitle = '' } = {}) {
  const width = 400, height = 260, left = 40, right = 12, top = 34, bottom = 58;
  const max = Math.max(...data.map((d) => d[1]));
  const plotW = width - left - right, plotH = height - top - bottom;
  const baseY = top + plotH;
  const step = plotW / data.length;
  const bw = Math.min(36, step * 0.55);
  const y = (v) => Math.round((top + plotH * (1 - v / max)) * 10) / 10;
  const tickStep = max <= 10 ? 1 : max <= 20 ? 2 : max <= 50 ? 5 : 10;
  const ticks = [];
  for (let v = 0; v <= max; v += tickStep) ticks.push(v);
  return {
    type: 'STATISTICS',
    width,
    height,
    segments: [
      ...ticks.filter((v) => v > 0).map((v) => ({ from: [left, y(v)], to: [width - right, y(v)], color: 'rgba(148, 163, 184, 0.18)', strokeWidth: 1 })),
      { from: [left, baseY], to: [width - right, baseY], color: SOFT, strokeWidth: 1.5 },
      { from: [left, top - 6], to: [left, baseY], color: SOFT, strokeWidth: 1.5 }
    ],
    bars: data.map(([, v], i) => ({
      x: Math.round((left + step * i + (step - bw) / 2) * 10) / 10,
      y: y(v),
      width: bw,
      height: Math.round((baseY - y(v)) * 10) / 10,
      fill: 'rgba(255, 184, 0, 0.35)',
      stroke: GOLD,
      label: String(v)
    })),
    labels: [
      ...data.map(([label], i) => ({ x: Math.round(left + step * i + step / 2), y: baseY + 18, text: String(label), color: INK, fontSize: 12, anchor: 'middle' })),
      ...ticks.filter((v) => v % (tickStep * (ticks.length > 8 ? 2 : 1)) === 0).map((v) => ({ x: left - 8, y: y(v) + 4, text: String(v), color: SOFT, fontSize: 11, anchor: 'end' })),
      ...(xTitle ? [{ x: Math.round(left + plotW / 2), y: height - 10, text: xTitle, color: SOFT, fontSize: 12, anchor: 'middle' }] : []),
      ...(yTitle ? [{ x: left - 30, y: 14, text: yTitle, color: SOFT, fontSize: 12, anchor: 'start' }] : [])
    ]
  };
}
