import React from 'react';
import { formatSvgText } from './MathDiagram';

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
  const svgHeight = 64;
  const axisY = 44;
  const beamY = 16;
  const leftX = 14;
  const rightX = 242;
  const usableWidth = rightX - leftX;

  const toX = (val: number) => {
    const clamped = Math.max(explicitMin, Math.min(explicitMax, val));
    return leftX + ((clamped - explicitMin) / span) * usableWidth;
  };

  const ckePurpleFill = 'rgba(192, 132, 252, 0.16)'; // Delikatne wypełnienie pod daszkiem
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
        {/* Definicje strzałek osi oraz dachu */}
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
          <marker
            id="roof-arrow-right"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={ckePurpleStroke} />
          </marker>
          <marker
            id="roof-arrow-left"
            viewBox="0 0 10 10"
            refX="4"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 8 1.5 L 0 5 L 8 8.5 z" fill={ckePurpleStroke} />
          </marker>
        </defs>

        {/* 1. RYSOWANIE ZAKRESÓW / PRZEDZIAŁÓW (SZKOLNE DASZKI W GÓRĘ) */}
        {intervals.map((inv, idx) => {
          const isLeftRay = inv.from === null || inv.from === undefined;
          const isRightRay = inv.to === null || inv.to === undefined;

          // Promień w lewo (-inf, b> lub (-inf, b)
          if (isLeftRay && !isRightRay) {
            const endX = toX(inv.to!);
            const arrowX = leftX + 4;
            const pathD = `M ${arrowX} ${axisY} L ${arrowX} ${beamY} L ${endX} ${beamY} L ${endX} ${axisY} Z`;

            return (
              <g key={`interval-left-${idx}`}>
                {/* Wypełnienie pod daszkiem */}
                <path d={pathD} fill={ckePurpleFill} stroke="none" />
                {/* Pionowy słupek od osi w górę do punktu b */}
                <line x1={endX} y1={axisY} x2={endX} y2={beamY} stroke={ckePurpleStroke} strokeWidth="1.75" />
                {/* Poziomy dach w lewo ze strzałką */}
                <line x1={endX} y1={beamY} x2={arrowX} y2={beamY} stroke={ckePurpleStroke} strokeWidth="2" markerEnd="url(#roof-arrow-left)" />
                {/* Kółko na szczycie słupka */}
                <circle
                  cx={endX}
                  cy={beamY}
                  r="3.5"
                  fill={inv.toIncluded ? ckePurpleDot : '#0E1522'}
                  stroke={ckePurpleStroke}
                  strokeWidth="1.75"
                />
              </g>
            );
          }

          // Promień w prawo <a, +inf) lub (a, +inf)
          if (!isLeftRay && isRightRay) {
            const startX = toX(inv.from!);
            const arrowX = rightX - 6;
            const pathD = `M ${startX} ${axisY} L ${startX} ${beamY} L ${arrowX} ${beamY} L ${arrowX} ${axisY} Z`;

            return (
              <g key={`interval-right-${idx}`}>
                {/* Wypełnienie pod daszkiem */}
                <path d={pathD} fill={ckePurpleFill} stroke="none" />
                {/* Pionowy słupek od osi w górę od punktu a */}
                <line x1={startX} y1={axisY} x2={startX} y2={beamY} stroke={ckePurpleStroke} strokeWidth="1.75" />
                {/* Poziomy dach w prawo ze strzałką */}
                <line x1={startX} y1={beamY} x2={arrowX} y2={beamY} stroke={ckePurpleStroke} strokeWidth="2" markerEnd="url(#roof-arrow-right)" />
                {/* Kółko na szczycie słupka */}
                <circle
                  cx={startX}
                  cy={beamY}
                  r="3.5"
                  fill={inv.fromIncluded ? ckePurpleDot : '#0E1522'}
                  stroke={ckePurpleStroke}
                  strokeWidth="1.75"
                />
              </g>
            );
          }

          // Przedział obustronny (bramka) <a, b> lub (a, b> itp.
          const startX = toX(inv.from!);
          const endX = toX(inv.to!);
          const pathD = `M ${startX} ${axisY} L ${startX} ${beamY} L ${endX} ${beamY} L ${endX} ${axisY} Z`;

          return (
            <g key={`interval-bounded-${idx}`}>
              {/* Wypełnienie wewnątrz bramki */}
              <path d={pathD} fill={ckePurpleFill} stroke="none" />
              {/* Poziomy dach bramki */}
              <line x1={startX} y1={beamY} x2={endX} y2={beamY} stroke={ckePurpleStroke} strokeWidth="2" />
              {/* Pionowy słupek lewy */}
              <line x1={startX} y1={axisY} x2={startX} y2={beamY} stroke={ckePurpleStroke} strokeWidth="1.75" />
              {/* Pionowy słupek prawy */}
              <line x1={endX} y1={axisY} x2={endX} y2={beamY} stroke={ckePurpleStroke} strokeWidth="1.75" />
              {/* Kółko lewe na szczycie słupka */}
              <circle
                cx={startX}
                cy={beamY}
                r="3.5"
                fill={inv.fromIncluded ? ckePurpleDot : '#0E1522'}
                stroke={ckePurpleStroke}
                strokeWidth="1.75"
              />
              {/* Kółko prawe na szczycie słupka */}
              <circle
                cx={endX}
                cy={beamY}
                r="3.5"
                fill={inv.toIncluded ? ckePurpleDot : '#0E1522'}
                stroke={ckePurpleStroke}
                strokeWidth="1.75"
              />
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
          y={axisY + 4}
          fontSize="12"
          fill="#94A3B8"
          fontStyle="italic"
          fontFamily="serif"
          dominantBaseline="middle"
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
                y={axisY + 15}
                textAnchor="middle"
                fontSize="12"
                fill="#E2E8F0"
                fontWeight="500"
                fontFamily="sans-serif"
              >
                {formatSvgText(tick.label)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
