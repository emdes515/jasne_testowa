import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { MathPlot, PlotData } from './MathPlot';
import { MathRenderer } from './MathRenderer';

export function formatSvgText(raw?: string): string {
  if (!raw) return '';
  let res = raw
    .replace(/_\{n\+1\}/g, 'ₙ₊₁')
    .replace(/_\{n-1\}/g, 'ₙ₋₁')
    .replace(/_\{n\}/g, 'ₙ')
    .replace(/_\{1\}/g, '₁')
    .replace(/_\{2\}/g, '₂')
    .replace(/_\{3\}/g, '₃')
    .replace(/_\{4\}/g, '₄')
    .replace(/_\{5\}/g, '₅')
    .replace(/_\{k\}/g, 'ₖ')
    .replace(/_\{p\}/g, 'ₚ')
    .replace(/_\{w\}/g, 'ᵥ')
    .replace(/_\{0\}/g, '₀')
    .replace(/_n/g, 'ₙ')
    .replace(/_1/g, '₁')
    .replace(/_2/g, '₂')
    .replace(/_3/g, '₃')
    .replace(/_0/g, '₀')
    .replace(/_k/g, 'ₖ')
    .replace(/_p/g, 'ₚ')
    .replace(/_w/g, 'ᵥ')
    .replace(/\^\{2\}/g, '²')
    .replace(/\^\{3\}/g, '³')
    .replace(/\^\{n\}/g, 'ⁿ')
    .replace(/\^\{m\}/g, 'ᵐ')
    .replace(/\^\{-1\}/g, '⁻¹')
    .replace(/\^2/g, '²')
    .replace(/\^3/g, '³')
    .replace(/\^n/g, 'ⁿ')
    .replace(/\\mathbb\{N\}\^?\+?/g, 'ℕ⁺')
    .replace(/\\mathbb\{N\}/g, 'ℕ')
    .replace(/\\mathbb\{R\}/g, 'ℝ')
    .replace(/\\mathbb\{Z\}/g, 'ℤ')
    .replace(/\\in\b/g, '∈')
    .replace(/\\notin\b/g, '∉')
    .replace(/\\ge\b|\\geq\b/g, '≥')
    .replace(/\\le\b|\\leq\b/g, '≤')
    .replace(/\\neq\b/g, '≠')
    .replace(/\\pm\b/g, '±')
    .replace(/\\approx\b/g, '≈')
    .replace(/\\Delta\b/g, 'Δ')
    .replace(/\\alpha\b/g, 'α')
    .replace(/\\beta\b/g, 'β')
    .replace(/\\gamma\b/g, 'γ')
    .replace(/\\pi\b/g, 'π')
    .replace(/\\infty\b/g, '∞')
    .replace(/\\cdot\b/g, '·')
    .replace(/\\times\b/g, '×')
    .replace(/\\implies\b/g, '⟹')
    .replace(/\\iff\b/g, '⟺')
    .replace(/\\lor\b/g, 'lub')
    .replace(/\\land\b/g, 'oraz')
    .replace(/\\forall\b/g, 'dla każdego')
    .replace(/\\exists\b/g, 'istnieje')
    .replace(/\\cup\b/g, '∪')
    .replace(/\\cap\b/g, '∩')
    .replace(/\\setminus\b/g, '\\')
    .replace(/\\subset\b/g, '⊂')
    .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
    .replace(/\\sqrt/g, '√')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\left[\[\(\{]/g, '(')
    .replace(/\\right[\]\)\}]/g, ')')
    .replace(/\\left|\\right/g, '')
    .replace(/\\quad|\\qquad/g, ' ')
    .replace(/\\\\/g, ' ')
    .replace(/\\,/g, ' ')
    .replace(/[{}]/g, '')
    .replace(/\$/g, '');
  return res;
}

export interface DiagramPoint {
  x: number;
  y: number;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  dot?: 'filled' | 'hollow' | 'none';
  color?: string;
  tooltip?: string;
  noBox?: boolean;
}

export interface DiagramGrid {
  xLines?: number[];
  yLines?: number[];
  minX?: number;
  maxX?: number;
  stepX?: number;
  minY?: number;
  maxY?: number;
  stepY?: number;
  color?: string;
  dashed?: boolean;
  strokeWidth?: number;
}

export interface DiagramTick {
  x: number;
  y: number;
  label: string;
  axis: 'x' | 'y';
  size?: number;
  color?: string;
}

export interface DiagramSegment {
  from: [number, number] | { x: number; y: number };
  to: [number, number] | { x: number; y: number };
  color?: string;
  dashed?: boolean;
  strokeWidth?: number;
  label?: string;
  labelColor?: string;
}

export interface DiagramCurve {
  path?: string;
  quadratic?: {
    start: [number, number];
    control: [number, number];
    end: [number, number];
  };
  cubic?: {
    start: [number, number];
    cp1: [number, number];
    cp2: [number, number];
    end: [number, number];
  };
  color?: string;
  strokeWidth?: number;
  dashed?: boolean;
  glow?: boolean;
  label?: string;
}

export interface DiagramArc {
  cx: number;
  cy: number;
  r: number;
  startAngleDeg: number;
  endAngleDeg: number;
  color?: string;
  label?: string;
  showRightAngleDot?: boolean;
}

export interface DiagramPolygon {
  points: string | [number, number][] | { x: number; y: number }[];
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  dashed?: boolean;
}

export interface DiagramCircle {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  dashed?: boolean;
}

export interface DiagramText {
  x: number;
  y: number;
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  anchor?: 'start' | 'middle' | 'end';
  badge?: boolean;
}

export interface DiagramMetric {
  label: string;
  value: string;
  color?: string;
  icon?: string;
}

export interface DiagramBar {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  label?: string;
  category?: string;
}

export interface DiagramCard {
  title?: string;
  formula?: string;
  desc?: string;
  color?: string;
  badge?: string;
}

export interface MathDiagramData {
  type: 'PLOT' | 'GEOMETRY_2D' | 'TRIGONOMETRY' | 'STEREOMETRY_3D' | 'STATISTICS' | 'INFOGRAPHIC';
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
  plotData?: PlotData;
  curves?: DiagramCurve[];
  polygons?: DiagramPolygon[];
  circles?: DiagramCircle[];
  arcs?: DiagramArc[];
  segments?: DiagramSegment[];
  bars?: DiagramBar[];
  points?: DiagramPoint[];
  labels?: DiagramText[];
  /** Szybki badge z formułą w narożniku diagramu (obsługuje KaTeX $...$) */
  formulaBadge?: string;
  /** Kafelki metryk i kluczowych parametrów odczytanych z wykresu */
  metrics?: DiagramMetric[];
  /** Kafelki reguł/zasad renderowane w czystym HTML i KaTeX (idealna czytelność na mobile) */
  cards?: DiagramCard[];
  /** Siatka współrzędnych arkusza CKE */
  grid?: DiagramGrid;
  /** Podziałki osi i podpisy wartości liczbowych */
  ticks?: DiagramTick[];
}

interface MathDiagramProps {
  diagram?: MathDiagramData | PlotData;
  className?: string;
  compact?: boolean;
}

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians)
  };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M', start.x.toFixed(1), start.y.toFixed(1),
    'A', r, r, 0, largeArcFlag, 0, end.x.toFixed(1), end.y.toFixed(1)
  ].join(' ');
}

export const MathDiagram: React.FC<MathDiagramProps> = ({ diagram, className = '', compact = false }) => {
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);

  if (!diagram) return null;

  // Fallback 1: Jeśli obiekt to klasyczny PlotData z MathPlot
  if (!('type' in diagram) || diagram.type === 'PIECEWISE_LINEAR' || diagram.type === 'LINEAR' || diagram.type === 'PARABOLA' || ('xRange' in diagram)) {
    return <MathPlot plot={diagram as PlotData} className={className} />;
  }

  const d = diagram as MathDiagramData;

  // Fallback 2: Jeśli type to PLOT
  if (d.type === 'PLOT' && d.plotData) {
    return <MathPlot plot={d.plotData} className={className} />;
  }

  const width = d.width || 540;
  const height = d.height || 260;

  const hasSvgContent = Boolean(
    d.curves?.length ||
    d.polygons?.length ||
    d.circles?.length ||
    d.arcs?.length ||
    d.segments?.length ||
    d.bars?.length ||
    d.points?.length ||
    d.labels?.length ||
    (d.type !== 'INFOGRAPHIC' && d.grid)
  );

  return (
    <div className={`w-full mx-auto my-2.5 p-4 sm:p-5 rounded-2xl bg-[#090D16]/95 border border-slate-800/90 shadow-2xl flex flex-col items-center select-none overflow-hidden relative transition-all duration-200 ${className}`}>
      {/* Tytuł diagramu */}
      {d.title && (
        <div className="w-full flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200 pb-2.5 mb-2 border-b border-white/5">
          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 shadow-sm" />
          <div className="break-words">
            <MathRenderer content={d.title} />
          </div>
        </div>
      )}

      {/* Dedykowany Hero Formula Box (Wzór Główny – wycentrowany, 16-18px KaTeX ze złotym glow) */}
      {d.formulaBadge && (() => {
        const formulaText = d.formulaBadge.trim();
        const hasDelimiters = formulaText.includes('$') || formulaText.includes('\\(') || formulaText.includes('\\[');
        const formattedFormula = hasDelimiters ? formulaText : `$${formulaText}$`;
        return (
          <div className="w-full flex justify-center items-center my-2.5">
            <div className="w-full max-w-md px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-amber-500/[0.08] via-amber-500/[0.16] to-amber-500/[0.08] border border-amber-500/35 text-amber-200 font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(255,184,0,0.12)] flex items-center justify-center text-center">
              <MathRenderer content={formattedFormula} />
            </div>
          </div>
        );
      })()}

      {/* Kafelki reguł / formuł renderowane w czystym HTML i KaTeX (idealna czytelność na mobile) */}
      {d.cards && d.cards.length > 0 && (
        <div className={`w-full grid gap-2.5 my-3 ${
          d.cards.length === 1 ? 'grid-cols-1 max-w-md' : d.cards.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
        }`}>
          {d.cards.map((c, idx) => (
            <div
              key={`card-${idx}`}
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-1.5 shadow-sm transition-all"
              style={{ borderLeftColor: c.color || '#FFB800', borderLeftWidth: '3px' }}
            >
              {c.badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <MathRenderer content={c.badge} />
                </span>
              )}
              {c.title && (
                <span className="text-xs font-bold text-slate-200">
                  <MathRenderer content={c.title} />
                </span>
              )}
              {c.formula && (
                <div className="py-1 text-sm sm:text-base font-bold text-amber-300 text-center bg-black/30 rounded-lg border border-white/5 my-0.5">
                  <MathRenderer content={c.formula.includes('$') ? c.formula : `$${c.formula}$`} />
                </div>
              )}
              {c.desc && (
                <p className="text-xs text-slate-300 leading-relaxed">
                  <MathRenderer content={c.desc} />
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {hasSvgContent && (
      <div className="w-full flex justify-center items-center overflow-x-auto py-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-full h-auto overflow-visible font-sans"
          style={{ maxHeight: compact ? 220 : 340 }}
        >
          <defs>
            <filter id="diagram-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFB800" floodOpacity="0.4" />
            </filter>
            <filter id="point-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10B981" floodOpacity="0.6" />
            </filter>
          </defs>

        {/* 0. Siatka współrzędnych CKE (arkusz egzaminacyjny) - wyłączona dla infografik */}
        {d.type !== 'INFOGRAPHIC' && d.grid && (() => {
          const gridColor = d.grid.color || 'rgba(148, 163, 184, 0.12)';
          const strokeWidth = d.grid.strokeWidth || 1;
          const strokeDash = d.grid.dashed ? '2 2' : 'none';

          const xLines: number[] = d.grid.xLines ? [...d.grid.xLines] : [];
          if (xLines.length === 0 && d.grid.minX !== undefined && d.grid.maxX !== undefined && d.grid.stepX) {
            for (let x = d.grid.minX; x <= d.grid.maxX + 0.001; x += d.grid.stepX) {
              xLines.push(Math.round(x));
            }
          }

          const yLines: number[] = d.grid.yLines ? [...d.grid.yLines] : [];
          if (yLines.length === 0 && d.grid.minY !== undefined && d.grid.maxY !== undefined && d.grid.stepY) {
            for (let y = d.grid.minY; y <= d.grid.maxY + 0.001; y += d.grid.stepY) {
              yLines.push(Math.round(y));
            }
          }

          const minY = d.grid.minY ?? 25;
          const maxY = d.grid.maxY ?? (height - 25);
          const minX = d.grid.minX ?? 25;
          const maxX = d.grid.maxX ?? (width - 25);

          return (
            <g className="diagram-grid">
              {xLines.map((x, idx) => (
                <line
                  key={`grid-x-${idx}`}
                  x1={x}
                  y1={minY}
                  x2={x}
                  y2={maxY}
                  stroke={gridColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                />
              ))}
              {yLines.map((y, idx) => (
                <line
                  key={`grid-y-${idx}`}
                  x1={minX}
                  y1={y}
                  x2={maxX}
                  y2={y}
                  stroke={gridColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                />
              ))}
            </g>
          );
        })()}

        {/* 1. Krzywe analityczne i gładkie ścieżki Béziera (np. parabole, wykresy funkcji) */}
        {d.curves?.map((curve, idx) => {
          let pathD = curve.path || '';
          if (!pathD && curve.quadratic) {
            const { start, control, end } = curve.quadratic;
            pathD = `M ${start[0]},${start[1]} Q ${control[0]},${control[1]} ${end[0]},${end[1]}`;
          } else if (!pathD && curve.cubic) {
            const { start, cp1, cp2, end } = curve.cubic;
            pathD = `M ${start[0]},${start[1]} C ${cp1[0]},${cp1[1]} ${cp2[0]},${cp2[1]} ${end[0]},${end[1]}`;
          }

          const strokeColor = curve.color || '#FFB800';

          return (
            <g key={`curve-${idx}`}>
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth={curve.strokeWidth || 3}
                strokeDasharray={curve.dashed ? '6 4' : 'none'}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#diagram-glow)"
              />
              {/* Ostra linia bez rozmycia na wierzchu */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth={curve.strokeWidth || 3}
                strokeDasharray={curve.dashed ? '6 4' : 'none'}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* 2. Wielokąty / Ściany / Płaszczyzny */}
        {d.polygons?.map((poly, idx) => {
          let pointsStr = '';
          if (typeof poly.points === 'string') {
            pointsStr = poly.points;
          } else if (Array.isArray(poly.points)) {
            pointsStr = poly.points
              .map((pt: any) => Array.isArray(pt) ? `${pt[0]},${pt[1]}` : `${pt.x},${pt.y}`)
              .join(' ');
          }
          return (
            <polygon
              key={`poly-${idx}`}
              points={pointsStr}
              fill={poly.fill || 'rgba(56, 189, 248, 0.08)'}
              stroke={poly.stroke || '#38BDF8'}
              strokeWidth={poly.strokeWidth || 1.75}
              strokeDasharray={poly.dashed ? '5 4' : 'none'}
              strokeLinejoin="round"
            />
          );
        })}

        {/* 3. Okręgi i elipsy */}
        {d.circles?.map((c, idx) => (
          <circle
            key={`circ-${idx}`}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill={c.fill || 'none'}
            stroke={c.stroke || '#38BDF8'}
            strokeWidth={c.strokeWidth || 1.75}
            strokeDasharray={c.dashed ? '5 4' : 'none'}
          />
        ))}

        {/* 3b. Słupki wykresów statystycznych CKE */}
        {d.bars?.map((bar, idx) => (
          <g key={`bar-${idx}`}>
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={bar.fill || 'rgba(192, 132, 252, 0.45)'}
              stroke={bar.stroke || '#C084FC'}
              strokeWidth={bar.strokeWidth || 1.75}
              rx={3}
            />
            {bar.label && (
              <text
                x={bar.x + bar.width / 2}
                y={bar.y - 6}
                fill="#E2E8F0"
                fontSize={12}
                fontWeight="700"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {bar.label}
              </text>
            )}
            {bar.category && (
              <text
                x={bar.x + bar.width / 2}
                y={bar.y + bar.height + 16}
                fill="#94A3B8"
                fontSize={12}
                fontWeight="600"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {bar.category}
              </text>
            )}
          </g>
        ))}

        {/* 4. Łuki kątów */}
        {d.arcs?.map((arc, idx) => {
          const path = describeArc(arc.cx, arc.cy, arc.r, arc.startAngleDeg, arc.endAngleDeg);
          const midAngle = (arc.startAngleDeg + arc.endAngleDeg) / 2;
          const labelPos = polarToCartesian(arc.cx, arc.cy, arc.r + 14, midAngle);
          return (
            <g key={`arc-${idx}`}>
              <path
                d={path}
                fill="none"
                stroke={arc.color || '#10B981'}
                strokeWidth={1.75}
              />
              {arc.showRightAngleDot && (
                <circle
                  cx={arc.cx + (arc.r * 0.5) * Math.cos(((midAngle - 90) * Math.PI) / 180)}
                  cy={arc.cy + (arc.r * 0.5) * Math.sin(((midAngle - 90) * Math.PI) / 180)}
                  r={2.5}
                  fill={arc.color || '#10B981'}
                />
              )}
              {arc.label && (
                <g>
                  <rect
                    x={labelPos.x - 12}
                    y={labelPos.y - 8}
                    width={24}
                    height={18}
                    rx={5}
                    fill="#090D16"
                    fillOpacity={0.92}
                    stroke="#1E293B"
                    strokeWidth={1}
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y + 4}
                    fill={arc.color || '#10B981'}
                    fontSize={12}
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {formatSvgText(arc.label)}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* 5. Odcinki i krawędzie */}
        {d.segments?.map((seg, idx) => {
          const x1 = Array.isArray(seg.from) ? seg.from[0] : (seg.from as any)?.x;
          const y1 = Array.isArray(seg.from) ? seg.from[1] : (seg.from as any)?.y;
          const x2 = Array.isArray(seg.to) ? seg.to[0] : (seg.to as any)?.x;
          const y2 = Array.isArray(seg.to) ? seg.to[1] : (seg.to as any)?.y;
          const strokeColor = seg.color || '#FFB800';

          return (
            <g key={`seg-${idx}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={strokeColor}
                strokeWidth={seg.strokeWidth || 2}
                strokeDasharray={seg.dashed ? '5 4' : 'none'}
                strokeLinecap="round"
              />
              {seg.label && (() => {
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;
                const dx = x2 - x1;
                const dy = y2 - y1;
                const len = Math.hypot(dx, dy) || 1;
                const ox = (-dy / len) * 16;
                const oy = (dx / len) * 16;
                const cleanSegLabel = formatSvgText(seg.label);
                const lblLen = cleanSegLabel.length;
                const pillW = Math.max(30, lblLen * 8.5 + 14);
                const pillH = 20;

                return (
                  <g key={`seg-lbl-${idx}`}>
                    <rect
                      x={midX + ox - pillW / 2}
                      y={midY + oy - pillH / 2}
                      width={pillW}
                      height={pillH}
                      rx={6}
                      fill="#090D16"
                      fillOpacity={0.95}
                      stroke="#334155"
                      strokeWidth={1}
                    />
                    <text
                      x={midX + ox}
                      y={midY + oy + 4}
                      fill={seg.labelColor || strokeColor}
                      fontSize={12}
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      {cleanSegLabel}
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })}

        {/* 5b. Podziałki osi i podpisy wartości (CKE Tick Marks) */}
        {d.ticks?.map((tick, idx) => {
          const tickColor = tick.color || '#64748B';
          const size = tick.size || 3.5;
          const isX = tick.axis === 'x';

          return (
            <g key={`tick-${idx}`}>
              <line
                x1={isX ? tick.x : tick.x - size}
                y1={isX ? tick.y - size : tick.y}
                x2={isX ? tick.x : tick.x + size}
                y2={isX ? tick.y + size : tick.y}
                stroke={tickColor}
                strokeWidth={1.5}
              />
              <text
                x={isX ? tick.x : tick.x - 7}
                y={isX ? tick.y + 14 : tick.y + 4}
                fill="#94A3B8"
                fontSize={11}
                fontWeight="600"
                textAnchor={isX ? 'middle' : 'end'}
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {formatSvgText(tick.label)}
              </text>
            </g>
          );
        })}

        {/* 6. Punkty i wierzchołki (z plakietkami ochronnymi i hover glow) */}
        {d.points?.map((pt, idx) => {
          const dotColor = pt.color || '#FFB800';
          const isHovered = hoveredPointIdx === idx;
          const pos = pt.labelPosition || 'top';
          let ox = 0;
          let oy = -14;
          let anchor: 'start' | 'middle' | 'end' = 'middle';

          if (pos === 'bottom') { oy = 18; }
          else if (pos === 'left') { ox = -14; oy = 0; anchor = 'end'; }
          else if (pos === 'right') { ox = 14; oy = 0; anchor = 'start'; }
          else if (pos === 'top-right') { ox = 14; oy = -12; anchor = 'start'; }
          else if (pos === 'top-left') { ox = -14; oy = -12; anchor = 'end'; }
          else if (pos === 'bottom-right') { ox = 14; oy = 16; anchor = 'start'; }
          else if (pos === 'bottom-left') { ox = -14; oy = 16; anchor = 'end'; }

          const r = isHovered ? 6.5 : 4.5;
          const cleanPtLabel = formatSvgText(pt.label);

          return (
            <g
              key={`pt-${idx}`}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHoveredPointIdx(idx)}
              onMouseLeave={() => setHoveredPointIdx(null)}
            >
              {pt.dot !== 'none' && (
                pt.dot === 'hollow' ? (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={r}
                    fill="#090D16"
                    stroke={dotColor}
                    strokeWidth={isHovered ? 3 : 2}
                    filter={isHovered ? 'url(#point-glow)' : 'none'}
                  />
                ) : (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={r}
                    fill={dotColor}
                    stroke="#090D16"
                    strokeWidth={isHovered ? 2 : 1.5}
                    filter={isHovered ? 'url(#point-glow)' : 'none'}
                  />
                )
              )}

              {pt.label && (() => {
                if (pt.noBox) {
                  return (
                    <text
                      x={pt.x + ox}
                      y={pt.y + oy + 4}
                      fill={isHovered ? '#38BDF8' : (pt.color || '#F8FAFC')}
                      fontSize={11}
                      fontWeight="700"
                      textAnchor={anchor}
                      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.85))' }}
                    >
                      {cleanPtLabel}
                    </text>
                  );
                }

                const lblLen = cleanPtLabel.length;
                const pillW = Math.max(26, lblLen * 8 + 14);
                const pillH = 20;
                let pillX = pt.x + ox;
                if (anchor === 'middle') pillX -= pillW / 2;
                else if (anchor === 'end') pillX -= pillW;
                const pillY = pt.y + oy - pillH / 2;

                return (
                  <g key={`pt-lbl-${idx}`}>
                    <rect
                      x={pillX}
                      y={pillY}
                      width={pillW}
                      height={pillH}
                      rx={6}
                      fill="#090D16"
                      fillOpacity={0.96}
                      stroke={isHovered ? '#38BDF8' : '#334155'}
                      strokeWidth={isHovered ? 1.5 : 1}
                    />
                    <text
                      x={pt.x + ox}
                      y={pt.y + oy + 4}
                      fill={isHovered ? '#38BDF8' : '#F8FAFC'}
                      fontSize={11}
                      fontWeight="700"
                      textAnchor={anchor}
                    >
                      {cleanPtLabel}
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })}

        {/* 7. Napisy i etykiety swobodne */}
        {d.labels?.map((lbl, idx) => {
          const fontSize = lbl.fontSize || 12;
          const anchor = lbl.anchor || 'middle';
          const cleanLblText = formatSvgText(lbl.text);
          const textLen = cleanLblText.length;
          const pillW = textLen * (fontSize * 0.65) + 16;
          const pillH = fontSize + 10;
          let pillX = lbl.x;
          if (anchor === 'middle') pillX -= pillW / 2;
          else if (anchor === 'end') pillX -= pillW;

          return (
            <g key={`lbl-${idx}`}>
              {lbl.badge && (
                <rect
                  x={pillX}
                  y={lbl.y - pillH / 2}
                  width={pillW}
                  height={pillH}
                  rx={6}
                  fill="#090D16"
                  fillOpacity={0.96}
                  stroke="#334155"
                  strokeWidth={1}
                />
              )}
              <text
                x={lbl.x}
                y={lbl.y + 1}
                fill={lbl.color || '#CBD5E1'}
                fontSize={fontSize}
                fontWeight={lbl.fontWeight || '700'}
                textAnchor={anchor}
                dominantBaseline="central"
              >
                {cleanLblText}
              </text>
            </g>
          );
        })}
      </svg>
      </div>
      )}

      {/* Pasek kluczowych parametrów i odczytów (Strict Zoning Architecture) */}
      {d.metrics && d.metrics.length > 0 && (
        <div className={`w-full grid gap-2.5 pt-3 pb-1 border-t border-white/5 mt-2 ${
          d.metrics.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'
        }`}>
          {d.metrics.map((m, idx) => (
            <div
              key={`metric-${idx}`}
              className="px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-1.5 shadow-sm min-h-[64px]"
            >
              <div className="flex items-start gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0 mt-1 shadow-sm"
                  style={{ backgroundColor: m.color || '#38BDF8' }}
                />
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 leading-snug break-words flex-1">
                  <MathRenderer content={m.label} />
                </span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-100 break-words flex items-center mt-1 leading-snug">
                <MathRenderer content={m.value} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Podpis z wnioskiem dydaktycznym renderowany w KaTeX */}
      {d.caption && (
        <div className="mt-3 w-full p-3.5 sm:p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 text-xs sm:text-sm text-slate-200 flex items-start gap-3 shadow-inner">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed text-left space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Wniosek dydaktyczny
            </div>
            <div className="text-slate-200 font-normal">
              <MathRenderer content={d.caption} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
