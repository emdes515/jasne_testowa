import React from 'react';
import { MathRenderer } from './MathRenderer';

interface Interval {
  from?: number | null;
  to?: number | null;
  fromIncluded?: boolean;
  toIncluded?: boolean;
}

export interface NumberLineDiagramData {
  min: number;
  max: number;
  ticks?: number[];
  labels?: number[];
  labelMap?: Record<number, string>;
  intervals?: Interval[];
  points?: Array<{ x: number; label: string; color: string; attach: string }>;
}

export type NumberLineData = NumberLineDiagramData;

interface NumberLineDiagramProps {
  data?: NumberLineDiagramData;
  className?: string;
  height?: number;
  maxWidth?: string;
}

export const NumberLineDiagram: React.FC<NumberLineDiagramProps> = ({
  data,
  className = '',
  height = 80,
  maxWidth
}) => {
  if (!data) return null;
  const { min, max, ticks = [], labels = [], labelMap = {}, intervals = [], points = [] } = data;
  // Add some padding to the axis based on min/max
  const span = Math.max(1, max - min);
  const padding = span * 0.1;
  const explicitMin = min - padding;
  const explicitMax = max + padding;
  const totalSpan = explicitMax - explicitMin;

  // Wymiary SVG
  const svgWidth = 320;
  const svgHeight = 80;
  const axisY = 60;
  const beamY = 25; // How high above the axis the intervals are
  const leftX = 15;
  const rightX = 305;
  const usableWidth = rightX - leftX;

  const toX = (val: number) => {
    const clamped = Math.max(explicitMin, Math.min(explicitMax, val));
    return leftX + ((clamped - explicitMin) / totalSpan) * usableWidth;
  };

  const primaryColor = '#38BDF8';
  const amberColor = '#F59E0B';
  const bgColor = '#0E1522'; // tło karty
  
  // Decide colors for overlapping intervals
  const getIntervalColor = (idx: number) => idx > 0 ? amberColor : primaryColor;

  return (
    <div className={`inline-flex items-center justify-center max-w-full overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        style={{ width: '100%', height: `${height}px`, maxWidth: maxWidth || '360px' }}
        className="select-none"
        aria-label="Rysunek osi liczbowej"
      >
        <defs>
          <marker id="axis-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#94A3B8" />
          </marker>
          <marker id="interval-arrow-left" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 9 1 L 1 5 L 9 9 z" fill={primaryColor} />
          </marker>
          <marker id="interval-arrow-right" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 1 1 L 9 5 L 1 9 z" fill={primaryColor} />
          </marker>
          <marker id="interval-arrow-left-amber" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 9 1 L 1 5 L 9 9 z" fill={amberColor} />
          </marker>
          <marker id="interval-arrow-right-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 1 1 L 9 5 L 1 9 z" fill={amberColor} />
          </marker>
          
          <pattern id="hatch-primary" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={primaryColor} strokeWidth="1" opacity="0.4" />
          </pattern>
          <pattern id="hatch-amber" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={amberColor} strokeWidth="1" opacity="0.4" />
          </pattern>
        </defs>

        {/* 1. KRESKOWANIA I PRZEDZIAŁY */}
        {intervals.map((inv, idx) => {
          const isLeftRay = inv.from === null || inv.from === undefined;
          const isRightRay = inv.to === null || inv.to === undefined;
          const color = getIntervalColor(idx);
          const hatchId = idx > 0 ? "url(#hatch-amber)" : "url(#hatch-primary)";
          const markerLeft = idx > 0 ? "url(#interval-arrow-left-amber)" : "url(#interval-arrow-left)";
          const markerRight = idx > 0 ? "url(#interval-arrow-right-amber)" : "url(#interval-arrow-right)";
          
          let startX = leftX;
          let endX = rightX;
          
          if (!isLeftRay) startX = toX(inv.from!);
          if (!isRightRay) endX = toX(inv.to!);
          
          // Hatching polygon
          let hatchPath = "";
          if (isLeftRay && !isRightRay) {
            hatchPath = `M ${leftX} ${axisY} L ${endX} ${axisY} L ${endX} ${beamY} L ${leftX} ${beamY} Z`;
          } else if (!isLeftRay && isRightRay) {
            hatchPath = `M ${startX} ${axisY} L ${rightX} ${axisY} L ${rightX} ${beamY} L ${startX} ${beamY} Z`;
          } else {
            hatchPath = `M ${startX} ${axisY} L ${endX} ${axisY} L ${endX} ${beamY} L ${startX} ${beamY} Z`;
          }

          return (
            <g key={`interval-${idx}`}>
              <path d={hatchPath} fill={hatchId} stroke="none" />
              
              {/* Roof Line */}
              <line 
                x1={isLeftRay ? leftX + 5 : startX} 
                y1={beamY} 
                x2={isRightRay ? rightX - 5 : endX} 
                y2={beamY} 
                stroke={color} 
                strokeWidth="2.5" 
                markerStart={isLeftRay ? markerLeft : "none"}
                markerEnd={isRightRay ? markerRight : "none"}
              />
              
              {/* Left boundary */}
              {!isLeftRay && (
                <>
                  <line x1={startX} y1={axisY} x2={startX} y2={beamY} stroke={color} strokeWidth="2.5" />
                  <circle cx={startX} cy={axisY} r="4" fill={inv.fromIncluded ? color : bgColor} stroke={color} strokeWidth="2.5" />
                </>
              )}
              
              {/* Right boundary */}
              {!isRightRay && (
                <>
                  <line x1={endX} y1={axisY} x2={endX} y2={beamY} stroke={color} strokeWidth="2.5" />
                  <circle cx={endX} cy={axisY} r="4" fill={inv.toIncluded ? color : bgColor} stroke={color} strokeWidth="2.5" />
                </>
              )}
            </g>
          );
        })}

        {/* 2. OŚ GŁÓWNA */}
        <line x1={leftX} y1={axisY} x2={rightX} y2={axisY} stroke="#94A3B8" strokeWidth="1.5" markerEnd="url(#axis-arrow)" />
        <text x={rightX + 4} y={axisY + 4} fontSize="14" fill="#94A3B8" fontStyle="italic" fontFamily="serif" dominantBaseline="middle">x</text>

        {/* 3. PODZIAŁKA I ETYKIETY (Tylko wskazane) */}
        {ticks.map((tick, idx) => {
          const tx = toX(tick);
          const showLabel = labels.length > 0 ? labels.includes(tick) : true;
          const customLabel = labelMap[tick];
          const hasMath = customLabel && (customLabel.includes('\\') || customLabel.includes('^'));
          
          return (
            <g key={`tick-${idx}`}>
              <line x1={tx} y1={axisY - 4} x2={tx} y2={axisY + 4} stroke="#64748B" strokeWidth="1.5" />
              {showLabel && (
                hasMath ? (
                  <foreignObject x={tx - 20} y={axisY + 8} width="40" height="30">
                    <div className="w-full h-full flex items-center justify-center text-slate-200 text-sm font-semibold select-none">
                      <MathRenderer content={`$${customLabel}$`} inline />
                    </div>
                  </foreignObject>
                ) : (
                  <text x={tx} y={axisY + 22} textAnchor="middle" fontSize="14" fill="#E2E8F0" fontWeight="600" fontFamily="sans-serif">
                    {customLabel || tick}
                  </text>
                )
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
