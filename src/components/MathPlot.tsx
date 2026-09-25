import React, { useState } from 'react';
import { MathRenderer } from './MathRenderer';
import { formatSvgText } from './MathDiagram';

export interface PlotSegment {
  from: [number, number];
  to: [number, number];
  startDot?: 'filled' | 'hollow' | 'none';
  endDot?: 'filled' | 'hollow' | 'none';
  color?: string;
  dashed?: boolean;
  strokeWidth?: number;
  weight?: number;
  label?: string;
  labelColor?: string;
}

export interface PlotLine {
  slope?: number;
  intercept?: number;
  domain?: [number, number];
  dashed?: boolean;
  color?: string;
  label?: string;
}

export interface PlotHorizontalLine {
  y: number;
  dashed?: boolean;
  label?: string;
  color?: string;
}

export interface PlotParabola {
  a: number;
  p?: number;
  q?: number;
  b?: number;
  c?: number;
  domain?: [number, number];
  color?: string;
}

export interface PlotInequalityRegion {
  fromX: number;
  toX: number;
  condition?: 'above' | 'below';
  color?: string;
  fillOpacity?: number;
}

export interface PlotPoint {
  x: number;
  y: number;
  label?: string;
  dot?: 'filled' | 'hollow' | 'none';
  color?: string;
  attach?: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
  size?: number;
}

export interface PlotLabel {
  x: number;
  y: number;
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  attach?: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
}

export interface PlotPanel {
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  plot: PlotData;
}

export interface PlotPolygon {
  points: [number, number][];
  color?: string;
  fillOpacity?: number;
  weight?: number;
}

export interface PlotVector {
  tail: [number, number];
  tip: [number, number];
  color?: string;
  weight?: number;
  style?: 'solid' | 'dashed';
}

export interface PlotData {
  type?: 'PIECEWISE_LINEAR' | 'LINEAR' | 'PARABOLA' | 'GEOMETRY' | 'CUSTOM_FUNCTION' | 'NUMBER_LINE';
  xRange?: [number, number];
  yRange?: [number, number];
  gridStep?: number;
  hideAxes?: boolean;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  hideGridLines?: boolean;
  hideZeroLabel?: boolean;
  subdivisions?: number | false;
  hideGrid?: boolean;
  xTickLabels?: Record<number, string>;
  yTickLabels?: Record<number, string>;
  fn?: (x: number) => number;
  fnColor?: string;
  fnWeight?: number;
  inequalityRegions?: PlotInequalityRegion[];
  polygons?: PlotPolygon[];
  vectors?: PlotVector[];
  segments?: PlotSegment[];
  lines?: PlotLine[];
  horizontalLines?: PlotHorizontalLine[];
  parabola?: PlotParabola;
  a?: number;
  b?: number;
  c?: number;
  p?: number;
  q?: number;
  xPadding?: number;
  yPadding?: number;
  points?: PlotPoint[];
  axisOfSymmetry?: number;
  labels?: PlotLabel[];
  panels?: PlotPanel[];
}

export interface MathPlotProps {
  plot?: PlotData;
  className?: string;
  width?: number | 'auto';
  height?: number;
  interactive?: boolean;
}

export const MathPlot: React.FC<MathPlotProps> = ({
  plot,
  className = '',
  width: propsWidth,
  height: propsHeight = 280,
  interactive = true,
}) => {
  const [hoverCoord, setHoverCoord] = useState<[number, number] | null>(null);

  if (!plot) return null;

  // 1. Obsługa układu wielopanelowego (np. dwa panele porównawcze a > 0 vs a < 0 lub k || l vs k _|_ m)
  if (plot.panels && plot.panels.length > 0) {
    const gridCols = plot.panels.length >= 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2';
    return (
      <div className={`w-full max-w-4xl mx-auto my-3 grid ${gridCols} gap-4 select-none ${className}`}>
        {plot.panels.map((panel, idx) => (
          <div key={`panel-${idx}`} className="flex flex-col rounded-2xl bg-[#070A0F] border border-white/10 overflow-hidden shadow-2xl p-3">
            {panel.title && (
              <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-white/10 mb-2">
                <span className="text-xs font-bold text-amber-200">{panel.title}</span>
                {panel.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${panel.badgeColor || 'bg-amber-500/20 text-amber-300 border border-amber-400/40'}`}>
                    {panel.badge}
                  </span>
                )}
              </div>
            )}
            <MathPlot plot={panel.plot} height={210} className="w-full !max-w-none !my-0 !border-0 !shadow-none !bg-transparent" interactive={interactive} />
            {panel.subtitle && (
              <div className="mt-2 text-center text-xs font-mono font-medium text-slate-300 bg-white/5 py-1.5 px-2 rounded-lg border border-white/5">
                {panel.subtitle}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  const [rawXMin, rawXMax] = plot.xRange || [-5, 5];
  const [rawYMin, rawYMax] = plot.yRange || [-5, 5];
  const gridStep = plot.gridStep || 1;

  // Dodatkowy margines ochronny (xPadding / yPadding), aby punkty skrajne nie były obcinane
  const xSpan = rawXMax - rawXMin;
  const ySpan = rawYMax - rawYMin;
  const xPad = plot.xPadding ?? (xSpan > 10 ? 0.5 : 0.2);
  const yPad = plot.yPadding ?? (ySpan > 10 ? 0.5 : 0.2);

  const xMin = rawXMin - xPad;
  const xMax = rawXMax + xPad;
  const yMin = rawYMin - yPad;
  const yMax = rawYMax + yPad;

  // Wymiary bazowe SVG
  const width = typeof propsWidth === 'number' ? propsWidth : 380;
  const height = typeof propsHeight === 'number' ? propsHeight : 280;
  const padding = 35;
  const plotWidth = width - 2 * padding;
  const plotHeight = height - 2 * padding;

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const toSvgY = (y: number) => padding + ((yMax - y) / (yMax - yMin)) * plotHeight;

  // Wyznaczanie linii siatki
  const xTicks: number[] = [];
  for (let x = Math.ceil(rawXMin / gridStep) * gridStep; x <= rawXMax; x += gridStep) {
    xTicks.push(x);
  }

  const yTicks: number[] = [];
  for (let y = Math.ceil(rawYMin / gridStep) * gridStep; y <= rawYMax; y += gridStep) {
    yTicks.push(y);
  }

  const originX = toSvgX(0);
  const originY = toSvgY(0);

  // Wyznaczenie funkcji paraboli
  const getParabolaFunction = (): ((x: number) => number) | null => {
    const p = plot.parabola;
    if (p) {
      if (typeof p.p === 'number' && typeof p.q === 'number') {
        const a = p.a ?? 1;
        return (x: number) => a * Math.pow(x - p.p!, 2) + p.q!;
      }
      if (typeof p.b === 'number' && typeof p.c === 'number') {
        const a = p.a ?? 1;
        return (x: number) => a * x * x + p.b! * x + p.c!;
      }
      if (typeof p.a === 'number') {
        const b = (p as any).b ?? 0;
        const c = (p as any).c ?? 0;
        return (x: number) => p.a * x * x + b * x + c;
      }
    }
    const plotAny = plot as any;
    if (typeof plotAny.a === 'number') {
      if (typeof plotAny.p === 'number' && typeof plotAny.q === 'number') {
        return (x: number) => plotAny.a * Math.pow(x - plotAny.p, 2) + plotAny.q;
      }
      if (typeof plotAny.b === 'number' || typeof plotAny.c === 'number') {
        const b = plotAny.b ?? 0;
        const c = plotAny.c ?? 0;
        return (x: number) => plotAny.a * x * x + b * x + c;
      }
    }
    return null;
  };

  const parabolaFn = getParabolaFunction();

  // Generowanie punktów dla paraboli
  const generateParabolaPath = (fn: (x: number) => number, domain?: [number, number]) => {
    const [pDomainMin, pDomainMax] = domain || [rawXMin, rawXMax];
    const steps = 70;
    const stepSize = (pDomainMax - pDomainMin) / steps;
    const pathCommands: string[] = [];

    for (let i = 0; i <= steps; i++) {
      const x = pDomainMin + i * stepSize;
      const y = fn(x);
      const sx = toSvgX(x);
      const sy = toSvgY(y);
      if (i === 0) {
        pathCommands.push(`M ${sx.toFixed(1)} ${sy.toFixed(1)}`);
      } else {
        pathCommands.push(`L ${sx.toFixed(1)} ${sy.toFixed(1)}`);
      }
    }
    return pathCommands.join(' ');
  };

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    const svgClickX = clickX * scaleX;
    const svgClickY = clickY * scaleY;

    const mathX = xMin + ((svgClickX - padding) / plotWidth) * (xMax - xMin);
    const mathY = yMax - ((svgClickY - padding) / plotHeight) * (yMax - yMin);
    setHoverCoord([Math.round(mathX * 10) / 10, Math.round(mathY * 10) / 10]);
  };

  const haloStyle: React.CSSProperties = {
    paintOrder: 'stroke fill',
    stroke: '#070A0F',
    strokeWidth: 4,
    strokeLinejoin: 'round',
    strokeLinecap: 'round',
    userSelect: 'none',
  };

  return (
    <div className={`MafsView MathPlotView w-full max-w-lg mx-auto my-3 rounded-2xl bg-[#070A0F] border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center select-none relative ${className}`}>
      {/* Sonda współrzędnych CKE */}
      {interactive && hoverCoord && (
        <div className="absolute top-2.5 right-3 z-10 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/40 text-[11px] font-mono text-amber-300 shadow-lg">
          x: {hoverCoord[0].toFixed(1)}, y: {hoverCoord[1].toFixed(1)}
        </div>
      )}

      <div className="w-full flex justify-center items-center overflow-hidden p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible font-sans cursor-crosshair"
          onClick={handleSvgClick}
        >
          <defs>
            <marker
              id="arrow-x"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94A3B8" />
            </marker>
            <marker
              id="arrow-y"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94A3B8" />
            </marker>
            <marker
              id="arrow-vec"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38BDF8" />
            </marker>
          </defs>

          {/* 1. Siatka kratkowa (Grid) */}
          {!plot.hideGrid && (
            <g className="grid-lines" stroke="#1E293B" strokeWidth="1" strokeDasharray="none">
              {!plot.hideGridLines && xTicks.map((x) => (
                <line
                  key={`grid-x-${x}`}
                  x1={toSvgX(x)}
                  y1={padding}
                  x2={toSvgX(x)}
                  y2={height - padding}
                />
              ))}
              {!plot.hideGridLines && yTicks.map((y) => (
                <line
                  key={`grid-y-${y}`}
                  x1={padding}
                  y1={toSvgY(y)}
                  x2={width - padding}
                  y2={toSvgY(y)}
                />
              ))}
            </g>
          )}

          {/* 1b. Gładkie strefy cieniowania nierówności (między wykresem a osią OX) */}
          {plot.inequalityRegions?.map((reg, idx) => {
            const steps = 40;
            const polyPoints: [number, number][] = [];
            const evalY = (x: number) => {
              if (parabolaFn) return parabolaFn(x);
              if (plot.fn) return plot.fn(x);
              return 0;
            };
            for (let s = 0; s <= steps; s++) {
              const x = reg.fromX + ((reg.toX - reg.fromX) * s) / steps;
              polyPoints.push([toSvgX(x), toSvgY(evalY(x))]);
            }
            polyPoints.push([toSvgX(reg.toX), originY]);
            polyPoints.push([toSvgX(reg.fromX), originY]);

            const defaultColor = reg.condition === 'above' ? '#10B981' : '#F43F5E';
            return (
              <polygon
                key={`ineq-${idx}`}
                points={polyPoints.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}
                fill={reg.color || defaultColor}
                fillOpacity={reg.fillOpacity ?? 0.18}
                stroke="none"
              />
            );
          })}

          {/* 1c. Wielokąty i obszary rozwiązań */}
          {plot.polygons?.map((poly, idx) => (
            <polygon
              key={`poly-${idx}`}
              points={poly.points.map((pt) => `${toSvgX(pt[0]).toFixed(1)},${toSvgY(pt[1]).toFixed(1)}`).join(' ')}
              fill={poly.color || '#10B981'}
              fillOpacity={poly.fillOpacity ?? 0.22}
              stroke={poly.color || '#10B981'}
              strokeWidth={poly.weight ?? 0}
            />
          ))}

          {/* 2. Osie główne OX i OY */}
          {!plot.hideAxes && (
            <g className="axes-and-ticks">
              {/* Oś OX */}
              {!plot.hideXAxis && (
                <>
                  <line
                    x1={padding - 10}
                    y1={originY}
                    x2={width - padding + 15}
                    y2={originY}
                    stroke="#94A3B8"
                    strokeWidth="1.75"
                    markerEnd="url(#arrow-x)"
                  />
                  <text
                    x={width - padding + 22}
                    y={originY + 4}
                    fill="#CBD5E1"
                    fontSize="12"
                    fontWeight="700"
                    textAnchor="start"
                    style={haloStyle}
                  >
                    x
                  </text>
                </>
              )}

              {/* Oś OY */}
              {!plot.hideYAxis && (
                <>
                  <line
                    x1={originX}
                    y1={height - padding + 10}
                    x2={originX}
                    y2={padding - 15}
                    stroke="#94A3B8"
                    strokeWidth="1.75"
                    markerEnd="url(#arrow-y)"
                  />
                  <text
                    x={originX}
                    y={padding - 20}
                    fill="#CBD5E1"
                    fontSize="12"
                    fontWeight="700"
                    textAnchor="middle"
                    style={haloStyle}
                  >
                    y
                  </text>
                </>
              )}

              {/* Podziałki liczbowe na OX */}
              {!plot.hideXAxis && xTicks.map((x) => {
                if (x === 0 && !plot.hideYAxis) return null;
                const lbl = plot.xTickLabels?.[x];
                const hasMath = lbl && (lbl.includes('\\') || lbl.includes('^'));
                const sx = toSvgX(x);
                return (
                  <g key={`tick-x-${x}`}>
                    <line x1={sx} y1={originY - 3} x2={sx} y2={originY + 3} stroke="#64748B" strokeWidth="1.5" />
                    {hasMath ? (
                      <foreignObject x={sx - 15} y={originY + 2} width="30" height="24">
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px] font-medium select-none">
                          <MathRenderer content={`$${lbl}$`} inline />
                        </div>
                      </foreignObject>
                    ) : (
                      <text
                        x={sx}
                        y={originY + 14}
                        fill="#94A3B8"
                        fontSize="10"
                        fontWeight="600"
                        textAnchor="middle"
                        style={haloStyle}
                      >
                        {lbl !== undefined ? lbl : x}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Podziałki liczbowe na OY */}
              {!plot.hideYAxis && yTicks.map((y) => {
                if (y === 0) return null;
                const lbl = plot.yTickLabels?.[y];
                const hasMath = lbl && (lbl.includes('\\') || lbl.includes('^'));
                const sy = toSvgY(y);
                return (
                  <g key={`tick-y-${y}`}>
                    <line x1={originX - 3} y1={sy} x2={originX + 3} y2={sy} stroke="#64748B" strokeWidth="1.5" />
                    {hasMath ? (
                      <foreignObject x={originX - 38} y={sy - 12} width="32" height="24">
                        <div className="w-full h-full flex items-center justify-end pr-1 text-slate-400 text-[10px] font-medium select-none">
                          <MathRenderer content={`$${lbl}$`} inline />
                        </div>
                      </foreignObject>
                    ) : (
                      <text
                        x={originX - 10}
                        y={sy + 3.5}
                        fill="#94A3B8"
                        fontSize="10"
                        fontWeight="600"
                        textAnchor="end"
                        style={haloStyle}
                      >
                        {lbl !== undefined ? lbl : y}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Punkt (0,0) */}
              {!plot.hideZeroLabel && !plot.hideXAxis && !plot.hideYAxis && (
                <text
                  x={originX - 8}
                  y={originY + 12}
                  fill="#94A3B8"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="end"
                  style={haloStyle}
                >
                  0
                </text>
              )}
            </g>
          )}

          {/* 3. Wektory kierunkowe */}
          {plot.vectors?.map((vec, idx) => {
            const sx1 = toSvgX(vec.tail[0]);
            const sy1 = toSvgY(vec.tail[1]);
            const sx2 = toSvgX(vec.tip[0]);
            const sy2 = toSvgY(vec.tip[1]);
            return (
              <line
                key={`vec-${idx}`}
                x1={sx1}
                y1={sy1}
                x2={sx2}
                y2={sy2}
                stroke={vec.color || '#38BDF8'}
                strokeWidth={vec.weight || 2.5}
                strokeDasharray={vec.style === 'dashed' ? '4 3' : 'none'}
                markerEnd="url(#arrow-vec)"
              />
            );
          })}

          {/* 4. Poziome linie pomocnicze (np. y = const) */}
          {plot.horizontalLines?.map((hl, idx) => {
            const sy = toSvgY(hl.y);
            const formattedHlLabel = formatSvgText(hl.label);
            const badgeWidth = Math.max(20, formattedHlLabel.length * 6.5 + 8);
            return (
              <g key={`hl-${idx}`}>
                <line
                  x1={padding}
                  y1={sy}
                  x2={width - padding}
                  y2={sy}
                  stroke={hl.color || '#38BDF8'}
                  strokeWidth="1.5"
                  strokeDasharray={hl.dashed ? '4 3' : 'none'}
                />
                {hl.label && (
                  <g key={`hl-lbl-${idx}`}>
                    <rect
                      x={width - padding - badgeWidth}
                      y={sy - 15}
                      width={badgeWidth}
                      height={14}
                      rx={3.5}
                      fill="#070A0F"
                      fillOpacity={0.92}
                      stroke="#1E293B"
                      strokeWidth={1}
                    />
                    <text
                      x={width - padding - badgeWidth / 2}
                      y={sy - 4}
                      fill={hl.color || '#38BDF8'}
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                      style={haloStyle}
                    >
                      {formattedHlLabel}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* 5. Oś symetrii paraboli: x = p */}
          {plot.axisOfSymmetry !== undefined && (
            <line
              x1={toSvgX(plot.axisOfSymmetry)}
              y1={padding}
              x2={toSvgX(plot.axisOfSymmetry)}
              y2={height - padding}
              stroke="rgba(56, 189, 248, 0.6)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          )}

          {/* 6. Linie proste (Funkcja liniowa) */}
          {plot.lines?.map((line, idx) => {
            const m = line.slope ?? 1;
            const b = line.intercept ?? 0;
            const [dMin, dMax] = line.domain || [rawXMin, rawXMax];
            const x1 = dMin;
            const y1 = m * x1 + b;
            const x2 = dMax;
            const y2 = m * x2 + b;
            const formattedLineLabel = formatSvgText(line.label);
            const badgeW = Math.max(22, formattedLineLabel.length * 6.8 + 8);
            const lx = toSvgX(x2) - 4;
            const ly = toSvgY(y2) - 8;

            return (
              <g key={`line-${idx}`}>
                <line
                  x1={toSvgX(x1)}
                  y1={toSvgY(y1)}
                  x2={toSvgX(x2)}
                  y2={toSvgY(y2)}
                  stroke={line.color || '#FFB800'}
                  strokeWidth="3"
                  strokeDasharray={line.dashed ? '5 3' : 'none'}
                  strokeLinecap="round"
                />
                {line.label && (
                  <g key={`line-lbl-${idx}`}>
                    <rect
                      x={lx - badgeW}
                      y={ly - 13}
                      width={badgeW}
                      height={16}
                      rx={4}
                      fill="#070A0F"
                      fillOpacity={0.92}
                      stroke="#1E293B"
                      strokeWidth={1}
                    />
                    <text
                      x={lx - badgeW / 2}
                      y={ly - 1}
                      fill={line.color || '#FFB800'}
                      fontSize="11"
                      fontWeight="700"
                      textAnchor="middle"
                      style={haloStyle}
                    >
                      {formattedLineLabel}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* 7. Parabola (Funkcja kwadratowa) */}
          {parabolaFn && (
            <path
              d={generateParabolaPath(parabolaFn, plot.parabola?.domain)}
              fill="none"
              stroke={plot.parabola?.color || (plot as any).color || '#FFB800'}
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          {/* 8. Dowolna funkcja analityczna fn(x) */}
          {plot.fn && (() => {
            const steps = 80;
            const stepSize = (rawXMax - rawXMin) / steps;
            const pathCommands: string[] = [];
            for (let i = 0; i <= steps; i++) {
              const x = rawXMin + i * stepSize;
              const y = plot.fn(x);
              const sx = toSvgX(x);
              const sy = toSvgY(y);
              if (i === 0) {
                pathCommands.push(`M ${sx.toFixed(1)} ${sy.toFixed(1)}`);
              } else {
                pathCommands.push(`L ${sx.toFixed(1)} ${sy.toFixed(1)}`);
              }
            }
            return (
              <path
                d={pathCommands.join(' ')}
                fill="none"
                stroke={plot.fnColor || '#FFB800'}
                strokeWidth={plot.fnWeight || 3}
                strokeLinecap="round"
              />
            );
          })()}

          {/* 9. Odcinki wykresu łamanego (Piecewise linear) */}
          {plot.segments?.map((seg, idx) => {
            const sx1 = toSvgX(seg.from[0]);
            const sy1 = toSvgY(seg.from[1]);
            const sx2 = toSvgX(seg.to[0]);
            const sy2 = toSvgY(seg.to[1]);
            const strokeColor = seg.color || '#FFB800';
            const sWidth = seg.strokeWidth || seg.weight || 3;

            return (
              <g key={`seg-${idx}`}>
                <line
                  x1={sx1}
                  y1={sy1}
                  x2={sx2}
                  y2={sy2}
                  stroke={strokeColor}
                  strokeWidth={sWidth}
                  strokeDasharray={seg.dashed ? '4 4' : 'none'}
                  strokeLinecap="round"
                />
                {/* Kropka początkowa */}
                {seg.startDot === 'filled' && (
                  <circle cx={sx1} cy={sy1} r="4.5" fill={strokeColor} stroke="#070A0F" strokeWidth="1.5" />
                )}
                {seg.startDot === 'hollow' && (
                  <circle cx={sx1} cy={sy1} r="4.5" fill="#070A0F" stroke={strokeColor} strokeWidth="2.5" />
                )}
                {/* Kropka końcowa */}
                {seg.endDot === 'filled' && (
                  <circle cx={sx2} cy={sy2} r="4.5" fill={strokeColor} stroke="#070A0F" strokeWidth="1.5" />
                )}
                {seg.endDot === 'hollow' && (
                  <circle cx={sx2} cy={sy2} r="4.5" fill="#070A0F" stroke={strokeColor} strokeWidth="2.5" />
                )}
                {/* Etykieta odcinka */}
                {seg.label && (() => {
                  const midX = (sx1 + sx2) / 2;
                  const midY = (sy1 + sy2) / 2;
                  const dx = sx2 - sx1;
                  const dy = sy2 - sy1;
                  const len = Math.hypot(dx, dy) || 1;
                  const ox = (-dy / len) * 14;
                  const oy = (dx / len) * 14;
                  const formattedSegLabel = formatSvgText(seg.label);
                  const badgeW = Math.max(24, formattedSegLabel.length * 6.8 + 10);
                  return (
                    <g key={`seg-lbl-${idx}`}>
                      <rect
                        x={midX + ox - badgeW / 2}
                        y={midY + oy - 9}
                        width={badgeW}
                        height={18}
                        rx={5}
                        fill="#070A0F"
                        fillOpacity={0.92}
                        stroke="#1E293B"
                        strokeWidth={1}
                      />
                      <text
                        x={midX + ox}
                        y={midY + oy + 4}
                        fill={seg.labelColor || strokeColor}
                        fontSize="11"
                        fontWeight="700"
                        textAnchor="middle"
                        style={haloStyle}
                      >
                        {formattedSegLabel}
                      </text>
                    </g>
                  );
                })()}
              </g>
            );
          })}

          {/* 10. Punkty kluczowe (wierzchołki, miejsca zerowe) */}
          {plot.points?.map((pt, idx) => {
            const px = toSvgX(pt.x);
            const py = toSvgY(pt.y);
            const dotColor = pt.color || '#FFB800';
            const formattedLabel = formatSvgText(pt.label);
            const badgeWidth = Math.max(22, formattedLabel.length * 6.8 + 8);

            // Zabezpieczenie przed nakładaniem się na oś OX
            let rawAttach = (pt.attach || '').toLowerCase();
            if (rawAttach === 'top') rawAttach = 'n';
            if (rawAttach === 'bottom') rawAttach = 's';
            let attach = rawAttach;
            if (!attach) {
              attach = Math.abs(pt.y) < 0.1 ? 'n' : pt.y < 0 ? 'n' : 's';
            } else if (Math.abs(pt.y) < 0.1 && (attach === 's' || attach === 'se' || attach === 'sw')) {
              attach = 'nw';
            }

            let ox = 0;
            let oy = -16;
            if (attach === 's') {
              oy = 16;
            } else if (attach === 'e') {
              ox = badgeWidth / 2 + 8;
              oy = 0;
            } else if (attach === 'w') {
              ox = -badgeWidth / 2 - 8;
              oy = 0;
            } else if (attach === 'se') {
              ox = badgeWidth / 2 + 4;
              oy = 14;
            } else if (attach === 'sw') {
              ox = -badgeWidth / 2 - 4;
              oy = 14;
            } else if (attach === 'ne') {
              ox = badgeWidth / 2 + 4;
              oy = -14;
            } else if (attach === 'nw') {
              ox = -badgeWidth / 2 - 4;
              oy = -14;
            }

            return (
              <g key={`point-${idx}`}>
                {pt.dot === 'hollow' ? (
                  <circle cx={px} cy={py} r="4.5" fill="#070A0F" stroke={dotColor} strokeWidth="2.5" />
                ) : (
                  <circle cx={px} cy={py} r="4.5" fill={dotColor} stroke="#070A0F" strokeWidth="1.5" />
                )}
                {pt.label && (
                  <g key={`point-lbl-${idx}`}>
                    <rect
                      x={px + ox - badgeWidth / 2}
                      y={py + oy - 7.5}
                      width={badgeWidth}
                      height={15}
                      rx={3.5}
                      fill="#070A0F"
                      fillOpacity={0.92}
                      stroke="#1E293B"
                      strokeWidth={1}
                    />
                    <text
                      x={px + ox}
                      y={py + oy + 3.5}
                      fill="#F8FAFC"
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                      style={haloStyle}
                    >
                      {formattedLabel}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* 11. Etykiety swobodne */}
          {plot.labels?.map((lbl, idx) => {
            const rawX = toSvgX(lbl.x);
            const rawY = toSvgY(lbl.y);
            const cleanText = formatSvgText(lbl.text);
            const fontSize = lbl.fontSize || 12;

            let attach = (lbl.attach || 'n').toLowerCase();
            let dx = 0;
            let dy = 0;
            if (attach.includes('w')) dx = -10;
            else if (attach.includes('e')) dx = 10;
            if (attach.includes('n')) dy = -8;
            else if (attach.includes('s')) dy = 8;

            const finalX = rawX + dx;
            const finalY = rawY + dy;
            const anchor = attach.includes('w') ? 'end' : attach.includes('e') ? 'start' : 'middle';

            return (
              <text
                key={`plot-lbl-${idx}`}
                x={finalX}
                y={finalY}
                fill={lbl.color || '#CBD5E1'}
                fontSize={fontSize}
                fontWeight={lbl.fontWeight || '700'}
                textAnchor={anchor}
                dominantBaseline="central"
                style={haloStyle}
              >
                {cleanText}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Dyskretna stopka pod wykresem */}
      <div className="w-full px-3 py-1.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Wektorowy układ współrzędnych CKE • Nocturne Luminary SVG
        </span>
        {interactive && (
          <span className="text-slate-400 italic">Dotknij punktu, aby odczytać (x, y)</span>
        )}
      </div>
    </div>
  );
};

export const MafsPlot = MathPlot;
export default MathPlot;
