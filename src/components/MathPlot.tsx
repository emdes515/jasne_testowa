import React from 'react';

export interface PlotSegment {
  from: [number, number];
  to: [number, number];
  startDot?: 'filled' | 'hollow' | 'none';
  endDot?: 'filled' | 'hollow' | 'none';
  color?: string;
  dashed?: boolean;
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
  p: number;
  q: number;
  domain?: [number, number];
  color?: string;
}

export interface PlotPoint {
  x: number;
  y: number;
  label?: string;
  dot?: 'filled' | 'hollow';
  color?: string;
}

export interface PlotLabel {
  x: number;
  y: number;
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
}

export interface PlotData {
  type?: 'PIECEWISE_LINEAR' | 'LINEAR' | 'PARABOLA' | 'GEOMETRY';
  xRange?: [number, number];
  yRange?: [number, number];
  gridStep?: number;
  hideAxes?: boolean;
  hideGrid?: boolean;
  segments?: PlotSegment[];
  lines?: PlotLine[];
  horizontalLines?: PlotHorizontalLine[];
  parabola?: PlotParabola;
  points?: PlotPoint[];
  axisOfSymmetry?: number;
  labels?: PlotLabel[];
}

interface MathPlotProps {
  plot?: PlotData;
  className?: string;
}

export const MathPlot: React.FC<MathPlotProps> = ({ plot, className = '' }) => {
  if (!plot) return null;

  const [xMin, xMax] = plot.xRange || [-5, 5];
  const [yMin, yMax] = plot.yRange || [-5, 5];
  const gridStep = plot.gridStep || 1;

  // Wymiary bazowe SVG
  const width = 380;
  const height = 280;
  const padding = 35;
  const plotWidth = width - 2 * padding;
  const plotHeight = height - 2 * padding;

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const toSvgY = (y: number) => padding + ((yMax - y) / (yMax - yMin)) * plotHeight;

  // Wyznaczanie linii siatki
  const xTicks: number[] = [];
  for (let x = Math.ceil(xMin / gridStep) * gridStep; x <= xMax; x += gridStep) {
    xTicks.push(x);
  }

  const yTicks: number[] = [];
  for (let y = Math.ceil(yMin / gridStep) * gridStep; y <= yMax; y += gridStep) {
    yTicks.push(y);
  }

  const originX = toSvgX(0);
  const originY = toSvgY(0);

  // Generowanie punktów dla paraboli
  const generateParabolaPath = (p: PlotParabola) => {
    const [pDomainMin, pDomainMax] = p.domain || [xMin, xMax];
    const steps = 40;
    const stepSize = (pDomainMax - pDomainMin) / steps;
    const pathCommands: string[] = [];

    for (let i = 0; i <= steps; i++) {
      const x = pDomainMin + i * stepSize;
      const y = p.a * Math.pow(x - p.p, 2) + p.q;
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

  return (
    <div className={`w-full max-w-md mx-auto my-3 p-3 rounded-2xl bg-[#090D16] border border-slate-800 shadow-inner flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible font-sans"
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
        </defs>

        {/* 1. Siatka kratkowa (Grid) */}
        {!plot.hideGrid && (
          <g className="grid-lines" stroke="#1E293B" strokeWidth="1" strokeDasharray="none">
            {xTicks.map((x) => (
              <line
                key={`grid-x-${x}`}
                x1={toSvgX(x)}
                y1={padding}
                x2={toSvgX(x)}
                y2={height - padding}
              />
            ))}
            {yTicks.map((y) => (
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

        {/* 2. Osie główne OX i OY */}
        {!plot.hideAxes && (
          <g className="axes-and-ticks">
            {/* Oś OX */}
            <line
              x1={padding - 10}
              y1={originY}
              x2={width - padding + 15}
              y2={originY}
              stroke="#94A3B8"
              strokeWidth="1.75"
              markerEnd="url(#arrow-x)"
            />
            {/* Oś OY */}
            <line
              x1={originX}
              y1={height - padding + 10}
              x2={originX}
              y2={padding - 15}
              stroke="#94A3B8"
              strokeWidth="1.75"
              markerEnd="url(#arrow-y)"
            />

            {/* Etykiety osi: X i Y */}
            <text
              x={width - padding + 22}
              y={originY + 4}
              fill="#CBD5E1"
              fontSize="12"
              fontWeight="700"
              textAnchor="start"
            >
              x
            </text>
            <text
              x={originX}
              y={padding - 20}
              fill="#CBD5E1"
              fontSize="12"
              fontWeight="700"
              textAnchor="middle"
            >
              y
            </text>

            {/* Podziałki liczbowe (Tick numbers) */}
            {xTicks.map((x) => {
              if (x === 0) return null;
              return (
                <g key={`tick-x-${x}`}>
                  <line
                    x1={toSvgX(x)}
                    y1={originY - 3}
                    x2={toSvgX(x)}
                    y2={originY + 3}
                    stroke="#64748B"
                    strokeWidth="1.5"
                  />
                  <text
                    x={toSvgX(x)}
                    y={originY + 14}
                    fill="#64748B"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                  >
                    {x}
                  </text>
                </g>
              );
            })}

            {yTicks.map((y) => {
              if (y === 0) return null;
              return (
                <g key={`tick-y-${y}`}>
                  <line
                    x1={originX - 3}
                    y1={toSvgY(y)}
                    x2={originX + 3}
                    y2={toSvgY(y)}
                    stroke="#64748B"
                    strokeWidth="1.5"
                  />
                  <text
                    x={originX - 7}
                    y={toSvgY(y) + 3.5}
                    fill="#64748B"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="end"
                  >
                    {y}
                  </text>
                </g>
              );
            })}

            {/* Punkt (0,0) */}
            <text
              x={originX - 7}
              y={originY + 12}
              fill="#64748B"
              fontSize="10"
              textAnchor="end"
            >
              0
            </text>
          </g>
        )}

        {/* 3. Poziome linie pomocnicze (np. y = 3) */}
        {plot.horizontalLines?.map((hl, idx) => {
          const sy = toSvgY(hl.y);
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
                <text
                  x={width - padding - 4}
                  y={sy - 5}
                  fill={hl.color || '#38BDF8'}
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="end"
                >
                  {hl.label}
                </text>
              )}
            </g>
          );
        })}

        {/* 4. Oś symetrii paraboli */}
        {plot.axisOfSymmetry !== undefined && (
          <line
            x1={toSvgX(plot.axisOfSymmetry)}
            y1={padding}
            x2={toSvgX(plot.axisOfSymmetry)}
            y2={height - padding}
            stroke="#A855F7"
            strokeWidth="1.25"
            strokeDasharray="4 3"
          />
        )}

        {/* 5. Linie proste (Funkcja liniowa) */}
        {plot.lines?.map((line, idx) => {
          const m = line.slope ?? 1;
          const b = line.intercept ?? 0;
          const [dMin, dMax] = line.domain || [xMin, xMax];
          const x1 = dMin;
          const y1 = m * x1 + b;
          const x2 = dMax;
          const y2 = m * x2 + b;

          return (
            <g key={`line-${idx}`}>
              <line
                x1={toSvgX(x1)}
                y1={toSvgY(y1)}
                x2={toSvgX(x2)}
                y2={toSvgY(y2)}
                stroke={line.color || '#FFB800'}
                strokeWidth="2.75"
                strokeDasharray={line.dashed ? '5 3' : 'none'}
                strokeLinecap="round"
              />
              {line.label && (
                <text
                  x={toSvgX(x2) - 4}
                  y={toSvgY(y2) - 8}
                  fill={line.color || '#FFB800'}
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="end"
                >
                  {line.label}
                </text>
              )}
            </g>
          );
        })}

        {/* 6. Parabola (Funkcja kwadratowa) */}
        {plot.parabola && (
          <path
            d={generateParabolaPath(plot.parabola)}
            fill="none"
            stroke={plot.parabola.color || '#FFB800'}
            strokeWidth="2.75"
            strokeLinecap="round"
          />
        )}

        {/* 7. Odcinki łamanej (Piecewise linear) */}
        {plot.segments?.map((seg, idx) => {
          const sx1 = toSvgX(seg.from[0]);
          const sy1 = toSvgY(seg.from[1]);
          const sx2 = toSvgX(seg.to[0]);
          const sy2 = toSvgY(seg.to[1]);
          const strokeColor = seg.color || '#FFB800';

          return (
            <g key={`seg-${idx}`}>
              <line
                x1={sx1}
                y1={sy1}
                x2={sx2}
                y2={sy2}
                stroke={strokeColor}
                strokeWidth="2.75"
                strokeLinecap="round"
              />
              {/* Kropka początkowa */}
              {seg.startDot === 'filled' && (
                <circle cx={sx1} cy={sy1} r="4.5" fill={strokeColor} stroke="#090D16" strokeWidth="1.5" />
              )}
              {seg.startDot === 'hollow' && (
                <circle cx={sx1} cy={sy1} r="4.5" fill="#090D16" stroke={strokeColor} strokeWidth="2" />
              )}
              {/* Kropka końcowa */}
              {seg.endDot === 'filled' && (
                <circle cx={sx2} cy={sy2} r="4.5" fill={strokeColor} stroke="#090D16" strokeWidth="1.5" />
              )}
              {seg.endDot === 'hollow' && (
                <circle cx={sx2} cy={sy2} r="4.5" fill="#090D16" stroke={strokeColor} strokeWidth="2" />
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
                return (
                  <g key={`seg-lbl-${idx}`}>
                    <rect
                      x={midX + ox - 14}
                      y={midY + oy - 9}
                      width={28}
                      height={18}
                      rx={5}
                      fill="#090D16"
                      fillOpacity={0.88}
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
                    >
                      {seg.label}
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })}

        {/* 8. Punkty kluczowe */}
        {plot.points?.map((pt, idx) => {
          const px = toSvgX(pt.x);
          const py = toSvgY(pt.y);
          const dotColor = pt.color || '#FFB800';

          return (
            <g key={`point-${idx}`}>
              {pt.dot === 'hollow' ? (
                <circle cx={px} cy={py} r="5" fill="#090D16" stroke={dotColor} strokeWidth="2.25" />
              ) : (
                <circle cx={px} cy={py} r="5" fill={dotColor} stroke="#090D16" strokeWidth="1.5" />
              )}
              {pt.label && (
                <text
                  x={px}
                  y={py - 8}
                  fill="#F8FAFC"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              )}
            </g>
          );
        })}

        {/* 9. Etykiety swobodne (np. nazwy prostych k, l, wierzchołków) */}
        {plot.labels?.map((lbl, idx) => (
          <text
            key={`plot-lbl-${idx}`}
            x={toSvgX(lbl.x)}
            y={toSvgY(lbl.y)}
            fill={lbl.color || '#CBD5E1'}
            fontSize={lbl.fontSize || 12}
            fontWeight={lbl.fontWeight || '700'}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {lbl.text}
          </text>
        ))}
      </svg>
    </div>
  );
};
