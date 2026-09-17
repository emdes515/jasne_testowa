import React, { useState } from 'react';
import { MathPlot, PlotData } from './MathPlot';
import { MathRenderer } from './MathRenderer';

export interface DiagramPoint {
  x: number;
  y: number;
  label?: string;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  dot?: 'filled' | 'hollow' | 'none';
  color?: string;
  tooltip?: string;
}

export interface DiagramSegment {
  from: [number, number];
  to: [number, number];
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

export interface MathDiagramData {
  type: 'PLOT' | 'GEOMETRY_2D' | 'TRIGONOMETRY' | 'STEREOMETRY_3D';
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
  points?: DiagramPoint[];
  labels?: DiagramText[];
  /** Szybki badge z formułą w narożniku diagramu (obsługuje KaTeX $...$) */
  formulaBadge?: string;
  /** Kafelki metryk i kluczowych parametrów odczytanych z wykresu */
  metrics?: DiagramMetric[];
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

  return (
    <div className={`w-full mx-auto my-2.5 p-4 rounded-2xl bg-[#090D16]/95 border border-slate-800/90 shadow-2xl flex flex-col items-center select-none overflow-hidden relative transition-all duration-200 ${className}`}>
      {/* Tytuł i Badge z KaTeX */}
      {(d.title || d.formulaBadge) && (
        <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-white/5 gap-3 flex-wrap">
          {d.title && (
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <div className="break-words">
                <MathRenderer content={d.title} />
              </div>
            </div>
          )}
          {d.formulaBadge && (
            <div className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-xs sm:text-sm shadow-sm flex items-center shrink-0">
              <MathRenderer content={d.formulaBadge} />
            </div>
          )}
        </div>
      )}

      <div className="w-full flex justify-center items-center overflow-x-auto py-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-full h-auto overflow-visible font-sans"
          style={{ maxHeight: compact ? 220 : 320 }}
        >
          <defs>
            <filter id="diagram-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFB800" floodOpacity="0.4" />
            </filter>
            <filter id="point-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10B981" floodOpacity="0.6" />
            </filter>
          </defs>

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
                    {arc.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* 5. Odcinki i krawędzie */}
        {d.segments?.map((seg, idx) => {
          const [x1, y1] = seg.from;
          const [x2, y2] = seg.to;
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
                const lblLen = seg.label.length;
                const pillW = Math.max(30, lblLen * 8.5 + 12);
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
                      {seg.label}
                    </text>
                  </g>
                );
              })()}
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
                const lblLen = pt.label.length;
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
                      fontSize={12}
                      fontWeight="700"
                      textAnchor={anchor}
                    >
                      {pt.label}
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
          const textLen = lbl.text.length;
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
                {lbl.text}
              </text>
            </g>
          );
        })}
      </svg>
      </div>

      {/* Pasek kluczowych parametrów i odczytów (Strict Zoning Architecture) */}
      {d.metrics && d.metrics.length > 0 && (
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 pb-1 border-t border-white/5 mt-1">
          {d.metrics.map((m, idx) => (
            <div
              key={`metric-${idx}`}
              className="px-3 py-2 rounded-xl bg-[#0F172A]/80 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-1 shadow-sm"
            >
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: m.color || '#38BDF8' }}
                />
                {m.label}
              </span>
              <div className="text-xs sm:text-sm font-bold text-slate-100 break-words flex items-center">
                <MathRenderer content={m.value} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Podpis z wnioskiem dydaktycznym renderowany w KaTeX */}
      {d.caption && (
        <div className="mt-2.5 text-center text-xs sm:text-sm text-slate-300 leading-relaxed px-3 max-w-xl flex items-center justify-center gap-1.5 bg-slate-950/40 py-2 rounded-xl border border-white/5 w-full">
          <span className="text-amber-400 font-bold shrink-0">💡 Wniosek:</span>
          <div className="text-slate-300">
            <MathRenderer content={d.caption} />
          </div>
        </div>
      )}
    </div>
  );
};
