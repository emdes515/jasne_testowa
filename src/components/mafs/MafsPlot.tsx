import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, Line, Circle, Text, Polygon, Vector } from 'mafs';
import { PlotData } from '../MathPlot';

interface MafsPlotProps {
  plot?: PlotData;
  className?: string;
  width?: number | 'auto';
  height?: number;
  interactive?: boolean;
}

export const MafsPlot: React.FC<MafsPlotProps> = ({
  plot,
  className = '',
  width,
  height = 280,
  interactive = true
}) => {
  const [hoverCoord, setHoverCoord] = useState<[number, number] | null>(null);

  if (!plot) return null;

  // Obsługa układu wielopanelowego (np. dwa przypadki a > 0 vs a < 0 w nierównościach)
  if (plot.panels && plot.panels.length > 0) {
    return (
      <div className={`w-full max-w-4xl mx-auto my-3 grid grid-cols-1 md:grid-cols-2 gap-4 select-none ${className}`}>
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
            <MafsPlot plot={panel.plot} height={210} className="w-full !max-w-none !my-0 !border-0 !shadow-none !bg-transparent" interactive={interactive} />
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

  const [xMin, xMax] = plot.xRange || [-5, 5];
  const [yMin, yMax] = plot.yRange || [-5, 5];
  const gridStep = plot.gridStep || 1;

  // Bezpieczny margines wokół viewBox, aby punkty brzegowe i etykiety nie były ucinane przez ramkę
  const xSpan = xMax - xMin;
  const ySpan = yMax - yMin;
  const xPad = (plot as any).xPadding ?? Math.max(0.6, xSpan * 0.05);
  const yPad = (plot as any).yPadding ?? Math.max(0.6, ySpan * 0.07);
  const viewBoxX: [number, number] = [xMin - xPad, xMax + xPad];
  const viewBoxY: [number, number] = [yMin - yPad, yMax + yPad];

  // Wyznaczenie funkcji paraboli z postaci kanonicznej (p, q), ogólnej (b, c) lub bezpośrednich współczynników
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

  return (
    <div className={`w-full max-w-lg mx-auto my-3 rounded-2xl bg-[#070A0F] border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center select-none relative ${className}`}>
      {/* Pasek statusu / współrzędne odczytane sondą */}
      {interactive && hoverCoord && (
        <div className="absolute top-2.5 right-3 z-10 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/40 text-[11px] font-mono text-amber-300 shadow-lg">
          x: {hoverCoord[0].toFixed(1)}, y: {hoverCoord[1].toFixed(1)}
        </div>
      )}

      <div className="w-full flex justify-center items-center overflow-hidden">
        <Mafs
          viewBox={{ x: viewBoxX, y: viewBoxY }}
          preserveAspectRatio={false}
          pan={false}
          zoom={false}
          width={width}
          height={height}
          onClick={(point) => {
            if (interactive) {
              setHoverCoord([Math.round(point[0] * 10) / 10, Math.round(point[1] * 10) / 10]);
            }
          }}
        >
          {/* 1. Siatka kartezjańska CKE lub Oś Liczbowa */}
          {!plot.hideGrid && (
            <Coordinates.Cartesian
              subdivisions={plot.subdivisions !== undefined ? plot.subdivisions : (gridStep > 1 ? false : 2)}
              xAxis={
                plot.hideAxes || plot.hideXAxis
                  ? false
                  : {
                      lines: plot.hideGridLines ? false : gridStep,
                      labels: (x) => (plot.hideZeroLabel && x === 0 ? '' : (x !== 0 ? x.toString() : (plot.hideYAxis ? '0' : '')))
                    }
              }
              yAxis={
                plot.hideAxes || plot.hideYAxis
                  ? false
                  : {
                      lines: plot.hideGridLines ? false : gridStep,
                      labels: (y) => (y !== 0 ? y.toString() : '')
                    }
              }
            />
          )}

          {/* 1b. Gładkie strefy cieniowania nierówności (między wykresem a osią OX) */}
          {plot.inequalityRegions?.map((reg, idx) => {
            const steps = 30;
            const polyPoints: [number, number][] = [];
            const evalY = (x: number) => {
              if (parabolaFn) return parabolaFn(x);
              if (plot.fn) return plot.fn(x);
              return 0;
            };
            for (let s = 0; s <= steps; s++) {
              const x = reg.fromX + ((reg.toX - reg.fromX) * s) / steps;
              polyPoints.push([x, evalY(x)]);
            }
            polyPoints.push([reg.toX, 0]);
            polyPoints.push([reg.fromX, 0]);

            const defaultColor = reg.condition === 'above' ? '#10B981' : '#F43F5E';
            return (
              <Polygon
                key={`ineq-${idx}`}
                points={polyPoints}
                color={reg.color || defaultColor}
                fillOpacity={reg.fillOpacity ?? 0.18}
                weight={0}
              />
            );
          })}

          {/* 1c. Niestandardowe wielokąty i strefy (np. część wspólna układu nierówności) */}
          {plot.polygons?.map((poly, idx) => (
            <Polygon
              key={`poly-${idx}`}
              points={poly.points}
              color={poly.color || '#10B981'}
              fillOpacity={poly.fillOpacity ?? 0.22}
              weight={poly.weight ?? 0}
            />
          ))}

          {/* 1d. Wektory kierunkowe (strzałki promieni i daszków) */}
          {plot.vectors?.map((vec, idx) => (
            <Vector
              key={`vec-${idx}`}
              tail={vec.tail}
              tip={vec.tip}
              color={vec.color || '#38BDF8'}
              weight={vec.weight || 2.5}
              style={vec.style || 'solid'}
            />
          ))}

          {/* 2. Parabola: f(x) = a*(x-p)^2 + q lub ax^2 + bx + c */}
          {parabolaFn && (
            <Plot.OfX
              y={parabolaFn}
              color={plot.parabola?.color || (plot as any).color || '#38BDF8'}
              weight={2.75}
            />
          )}

          {/* 2b. Dowolna funkcja matematyczna: f(x) */}
          {plot.fn && (
            <Plot.OfX
              y={plot.fn}
              color={plot.fnColor || '#FFB800'}
              weight={plot.fnWeight || 2.75}
            />
          )}

          {/* 3. Oś symetrii paraboli: x = p */}
          {plot.axisOfSymmetry !== undefined && (
            <Line.Segment
              point1={[plot.axisOfSymmetry, yMin]}
              point2={[plot.axisOfSymmetry, yMax]}
              style="dashed"
              color="rgba(56, 189, 248, 0.6)"
              weight={1.5}
            />
          )}

          {/* 4. Proste liniowe: y = a*x + b */}
          {plot.lines?.map((line, idx) => (
            <Plot.OfX
              key={`line-${idx}`}
              y={(x) => (line.slope ?? 1) * x + (line.intercept ?? 0)}
              color={line.color || '#38BDF8'}
              weight={2.25}
              style={line.dashed ? 'dashed' : 'solid'}
            />
          ))}

          {/* 5. Proste poziome: y = const */}
          {plot.horizontalLines?.map((hline, idx) => (
            <Plot.OfX
              key={`hline-${idx}`}
              y={() => hline.y}
              color={hline.color || '#38BDF8'}
              weight={1.75}
              style={hline.dashed ? 'dashed' : 'solid'}
            />
          ))}

          {/* 6. Odcinki wykresu łamanego (Piecewise Linear) */}
          {plot.segments?.map((seg, idx) => {
            const segColor = seg.color || '#10B981';
            return (
              <React.Fragment key={`seg-${idx}`}>
                <Line.Segment
                  point1={seg.from}
                  point2={seg.to}
                  color={segColor}
                  weight={seg.weight || seg.strokeWidth || 2.75}
                  style={seg.dashed ? 'dashed' : 'solid'}
                />
                {/* Węzeł początkowy */}
                {seg.startDot && seg.startDot !== 'none' && (
                  <Circle
                    center={seg.from}
                    radius={0.16}
                    color={segColor}
                    fillOpacity={seg.startDot === 'hollow' ? 0 : 1}
                    weight={2}
                  />
                )}
                {/* Węzeł końcowy */}
                {seg.endDot && seg.endDot !== 'none' && (
                  <Circle
                    center={seg.to}
                    radius={0.16}
                    color={segColor}
                    fillOpacity={seg.endDot === 'hollow' ? 0 : 1}
                    weight={2}
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* 7. Punkty kluczowe (wierzchołki, miejsca zerowe) */}
          {plot.points?.map((pt, idx) => {
            let rawAttach = (pt.attach || '').toLowerCase();
            if (rawAttach === 'top') rawAttach = 'n';
            if (rawAttach === 'bottom') rawAttach = 's';

            // Dla punktów leżących na osi OX (y ≈ 0), etykiety skierowane na południe kolidują z podziałką osi (np. x_1 = -2-2).
            // Domyślnie i bezpiecznie kotwiczymy je na północy ('n')!
            let attach: any = rawAttach;
            if (!attach) {
              attach = Math.abs(pt.y) < 0.1 ? 'n' : (pt.y < 0 ? 'n' : 's');
            } else if (Math.abs(pt.y) < 0.1 && (attach === 's' || attach === 'se' || attach === 'sw')) {
              attach = 'n';
            }

            let dx = 0;
            let dy = 0;
            if (attach.includes('w')) dx = -12;
            else if (attach.includes('e')) dx = 12;

            if (attach.includes('n')) dy = -9;
            else if (attach.includes('s')) dy = 9;
            else if (!attach.includes('n') && !attach.includes('s')) dy = -9;

            return (
              <React.Fragment key={`pt-${idx}`}>
                <Circle
                  center={[pt.x, pt.y]}
                  radius={0.18}
                  color={pt.color || '#FFB800'}
                  fillOpacity={pt.dot === 'hollow' ? 0 : 1}
                  weight={2}
                />
                {pt.label && (
                  <Text
                    x={pt.x}
                    y={pt.y}
                    size={pt.size || 13}
                    color={pt.color || '#FFFFFF'}
                    attach={attach}
                    svgTextProps={{
                      dx,
                      dy,
                      style: {
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        paintOrder: 'stroke fill',
                        stroke: '#070A0F',
                        strokeWidth: 4,
                        strokeLinejoin: 'round',
                        strokeLinecap: 'round',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.95))',
                        userSelect: 'none',
                      }
                    }}
                  >
                    {pt.label}
                  </Text>
                )}
              </React.Fragment>
            );
          })}

          {/* 8. Etykiety tekstowe */}
          {plot.labels?.map((lbl, idx) => {
            let rawAttach = (lbl.attach || 'n').toLowerCase();
            if (rawAttach === 'top') rawAttach = 'n';
            if (rawAttach === 'bottom') rawAttach = 's';
            let attach: any = rawAttach;
            if (Math.abs(lbl.y) < 0.1 && (attach === 's' || attach === 'se' || attach === 'sw')) {
              attach = 'n';
            }

            let dx = 0;
            let dy = 0;
            if (attach.includes('w')) dx = -8;
            else if (attach.includes('e')) dx = 8;
            if (attach.includes('n')) dy = -6;
            else if (attach.includes('s')) dy = 6;

            return (
              <Text
                key={`lbl-${idx}`}
                x={lbl.x}
                y={lbl.y}
                size={lbl.fontSize || 12}
                color={lbl.color || '#DFE2F1'}
                attach={attach}
                svgTextProps={{
                  dx,
                  dy,
                  style: {
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    paintOrder: 'stroke fill',
                    stroke: '#070A0F',
                    strokeWidth: 4,
                    strokeLinejoin: 'round',
                    strokeLinecap: 'round',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.95))',
                    userSelect: 'none',
                  }
                }}
              >
                {lbl.text}
              </Text>
            );
          })}
        </Mafs>
      </div>

      {/* Dyskretna stopka pod wykresem */}
      <div className="w-full px-3 py-1.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Wektorowy układ współrzędnych CKE
        </span>
        {interactive && (
          <span className="text-slate-400 italic">Dotknij punktu, aby odczytać (x, y)</span>
        )}
      </div>
    </div>
  );
};
