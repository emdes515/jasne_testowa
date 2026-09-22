import React, { useState } from 'react';
import { Mafs, Coordinates, Plot, Line, Circle, Text } from 'mafs';
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

  const [xMin, xMax] = plot.xRange || [-5, 5];
  const [yMin, yMax] = plot.yRange || [-5, 5];
  const gridStep = plot.gridStep || 1;

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
          viewBox={{ x: [xMin, xMax], y: [yMin, yMax] }}
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
          {/* 1. Siatka kartezjańska CKE */}
          {!plot.hideGrid && (
            <Coordinates.Cartesian
              subdivisions={gridStep > 1 ? false : 2}
              xAxis={
                plot.hideAxes
                  ? false
                  : {
                      lines: gridStep,
                      labels: (x) => (x !== 0 ? x.toString() : '')
                    }
              }
              yAxis={
                plot.hideAxes
                  ? false
                  : {
                      lines: gridStep,
                      labels: (y) => (y !== 0 ? y.toString() : '')
                    }
              }
            />
          )}

          {/* 2. Parabola: f(x) = a*(x-p)^2 + q */}
          {plot.parabola && (
            <Plot.OfX
              y={(x) => {
                const p = plot.parabola!;
                return p.a * Math.pow(x - p.p, 2) + p.q;
              }}
              color={plot.parabola.color || '#FFB800'}
              weight={2.75}
            />
          )}

          {/* 3. Oś symetrii paraboli: x = p */}
          {plot.axisOfSymmetry !== undefined && (
            <Line.Segment
              point1={[plot.axisOfSymmetry, yMin]}
              point2={[plot.axisOfSymmetry, yMax]}
              style="dashed"
              color="rgba(255, 184, 0, 0.45)"
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
              color={hline.color || '#F43F5E'}
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
                  weight={2.75}
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
          {plot.points?.map((pt, idx) => (
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
                  y={pt.y + 0.38}
                  size={12}
                  color="#FFFFFF"
                  attach="s"
                >
                  {pt.label}
                </Text>
              )}
            </React.Fragment>
          ))}

          {/* 8. Etykiety tekstowe */}
          {plot.labels?.map((lbl, idx) => (
            <Text
              key={`lbl-${idx}`}
              x={lbl.x}
              y={lbl.y}
              size={lbl.fontSize || 12}
              color={lbl.color || '#DFE2F1'}
            >
              {lbl.text}
            </Text>
          ))}
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
