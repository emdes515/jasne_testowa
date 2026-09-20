import React from 'react';

export interface NumberLineInterval {
  from?: number | null;        // null oznacza -nieskończoność
  to?: number | null;          // null oznacza +nieskończoność
  fromIncluded?: boolean;      // true: <, false: (
  toIncluded?: boolean;        // true: >, false: )
}

export interface NumberLineTick {
  value: number;
  label?: string;
}

export interface NumberLineData {
  type?: 'number_line';
  min?: number;
  max?: number;
  ticks: (number | NumberLineTick)[];
  intervals: NumberLineInterval[];
}

interface NumberLineDiagramProps {
  data: NumberLineData;
  className?: string;
  height?: number;
  maxWidth?: string;
}

/**
 * Wektorowy renderer osi liczbowej SVG zgodny ze standardem CKE.
 * Obsługuje przedziały obustronne, promienie nieskończone, kółka zamalowane vs puste
 * oraz fioletowe/liliowe wypełnienie zakresów CKE.
 */
export const NumberLineDiagram: React.FC<NumberLineDiagramProps> = ({
  data,
  className = '',
  height = 54,
  maxWidth
}) => {
  const { intervals = [], ticks = [] } = data;

  // Normalizacja podziałek (ticks)
  const normalizedTicks: NumberLineTick[] = ticks.map(t =>
    typeof t === 'number' ? { value: t, label: String(t) } : { value: t.value, label: t.label ?? String(t.value) }
  );

  // Obliczenie min i max osi
  const tickValues = normalizedTicks.map(t => t.value);
  const explicitMin = data.min ?? (tickValues.length > 0 ? Math.min(...tickValues) - 3 : -5);
  const explicitMax = data.max ?? (tickValues.length > 0 ? Math.max(...tickValues) + 3 : 5);
  const span = Math.max(1, explicitMax - explicitMin);

  // Wymiary SVG
  const svgWidth = 260;
  const svgHeight = 52;
  const axisY = 32;
  const beamY = 16;
  const leftX = 14;
  const rightX = 242;
  const usableWidth = rightX - leftX;

  const toX = (val: number) => {
    const clamped = Math.max(explicitMin, Math.min(explicitMax, val));
    return leftX + ((clamped - explicitMin) / span) * usableWidth;
  };

  const ckePurpleFill = 'rgba(216, 180, 254, 0.42)'; // CKE lilac
  const ckePurpleStroke = '#C084FC';                 // CKE lilac border
  const ckePurpleDot = '#A855F7';                    // Darker lilac dot

  return (
    <div className={`inline-flex items-center justify-center max-w-full overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: '100%', height: `${height}px`, maxWidth: maxWidth || (height > 60 ? '360px' : '270px') }}
        className="select-none"
        aria-label="Rysunek osi liczbowej"
      >
        {/* Definicja strzałki osi */}
        <defs>
          <marker
            id="axis-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#94A3B8" />
          </marker>
        </defs>

        {/* 1. RYSOWANIE ZAKRESÓW / PRZEDZIAŁÓW (WYPEŁNIENIE I BELKI) */}
        {intervals.map((inv, idx) => {
          const isLeftRay = inv.from === null || inv.from === undefined;
          const isRightRay = inv.to === null || inv.to === undefined;

          const startX = isLeftRay ? leftX + 4 : toX(inv.from!);
          const endX = isRightRay ? rightX - 6 : toX(inv.to!);

          const pathD = `M ${startX} ${axisY} L ${startX} ${beamY} L ${endX} ${beamY} L ${endX} ${axisY} Z`;

          return (
            <g key={`interval-${idx}`}>
              {/* Wypełnienie pola przedziału pod belką */}
              <path
                d={pathD}
                fill={ckePurpleFill}
                stroke="none"
              />
              {/* Górna belka przedziału */}
              <line
                x1={startX}
                y1={beamY}
                x2={endX}
                y2={beamY}
                stroke={ckePurpleStroke}
                strokeWidth="1.75"
              />
              {/* Pionowa nóżka z lewej (jeśli nie jest promieniem do -inf) */}
              {!isLeftRay && (
                <line
                  x1={startX}
                  y1={beamY}
                  x2={startX}
                  y2={axisY}
                  stroke={ckePurpleStroke}
                  strokeWidth="1.5"
                />
              )}
              {/* Pionowa nóżka z prawej (jeśli nie jest promieniem do +inf) */}
              {!isRightRay && (
                <line
                  x1={endX}
                  y1={beamY}
                  x2={endX}
                  y2={axisY}
                  stroke={ckePurpleStroke}
                  strokeWidth="1.5"
                />
              )}
            </g>
          );
        })}

        {/* 2. GŁÓWNA OŚ LICZBOWA OX ZE STRZAŁKĄ */}
        <line
          x1={leftX}
          y1={axisY}
          x2={rightX}
          y2={axisY}
          stroke="#94A3B8"
          strokeWidth="1.5"
          markerEnd="url(#axis-arrow)"
        />

        {/* Etykieta osi "x" */}
        <text
          x={rightX + 4}
          y={axisY + 14}
          fontSize="12"
          fill="#94A3B8"
          fontStyle="italic"
          fontFamily="serif"
        >
          x
        </text>

        {/* 3. PODZIAŁKI (TICKS) I PODPISY LICZB */}
        {normalizedTicks.map((tick, idx) => {
          const tx = toX(tick.value);
          return (
            <g key={`tick-${idx}`}>
              {/* Pionowa kreska podziałki na osi */}
              <line
                x1={tx}
                y1={axisY - 3}
                x2={tx}
                y2={axisY + 3}
                stroke="#64748B"
                strokeWidth="1.25"
              />
              {/* Wartość liczbowa pod osią */}
              <text
                x={tx}
                y={axisY + 16}
                textAnchor="middle"
                fontSize="12"
                fill="#E2E8F0"
                fontWeight="500"
                fontFamily="sans-serif"
              >
                {tick.label}
              </text>
            </g>
          );
        })}

        {/* 4. PUNKTY KRAŃCOWE PRZEDZIAŁÓW (KÓŁKA ZAMALOWANE VS PUSTE) */}
        {intervals.map((inv, idx) => {
          const isLeftRay = inv.from === null || inv.from === undefined;
          const isRightRay = inv.to === null || inv.to === undefined;

          return (
            <g key={`dots-${idx}`}>
              {!isLeftRay && (
                <circle
                  cx={toX(inv.from!)}
                  cy={axisY}
                  r="3.5"
                  fill={inv.fromIncluded ? ckePurpleDot : '#0E1522'}
                  stroke={ckePurpleStroke}
                  strokeWidth="1.75"
                />
              )}
              {!isRightRay && (
                <circle
                  cx={toX(inv.to!)}
                  cy={axisY}
                  r="3.5"
                  fill={inv.toIncluded ? ckePurpleDot : '#0E1522'}
                  stroke={ckePurpleStroke}
                  strokeWidth="1.75"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
