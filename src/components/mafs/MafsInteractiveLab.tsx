import React, { useState, useMemo } from 'react';
import { Mafs, Coordinates, Plot, Line, Circle, Text, useMovablePoint } from 'mafs';
import { AlertTriangle, Sparkles, Move, Eye, Layers, Compass, CheckCircle2 } from 'lucide-react';
import { MathRenderer } from '../MathRenderer';

export type LabType = 'PARABOLA' | 'LINEAR' | 'GRAPH_INSPECTOR' | 'ABSOLUTE_VALUE' | 'TRIGONOMETRY';

interface MafsInteractiveLabProps {
  initialLab?: LabType;
  className?: string;
  onClose?: () => void;
}

export const MafsInteractiveLab: React.FC<MafsInteractiveLabProps> = ({
  initialLab = 'PARABOLA',
  className = '',
  onClose
}) => {
  const [activeLab, setActiveLab] = useState<LabType>(initialLab);

  return (
    <div className={`w-full max-w-2xl mx-auto my-3 rounded-2xl bg-[#070A0F] border border-amber-500/20 shadow-2xl overflow-hidden flex flex-col ${className}`}>
      {/* 1. Górny pasek nawigacji laboratorium */}
      <div className="px-4 py-3 bg-[#0E1522] border-b border-white/10 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              Laboratorium Matematyczne Mafs
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold uppercase tracking-wider">
                Interaktywne
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Przesuwaj punkty i suwaki, aby badać własności w czasie rzeczywistym</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
          >
            Zamknij
          </button>
        )}
      </div>

      {/* 2. Pigułki wyboru tematu laboratorium */}
      <div className="px-3 py-2 bg-black/40 border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveLab('PARABOLA')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeLab === 'PARABOLA'
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Parabola & Nierówności
        </button>
        <button
          onClick={() => setActiveLab('LINEAR')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeLab === 'LINEAR'
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Move className="w-3.5 h-3.5" />
          Funkcja Liniowa
        </button>
        <button
          onClick={() => setActiveLab('GRAPH_INSPECTOR')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeLab === 'GRAPH_INSPECTOR'
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Sonda Wykresu CKE
        </button>
        <button
          onClick={() => setActiveLab('ABSOLUTE_VALUE')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeLab === 'ABSOLUTE_VALUE'
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <span>|x|</span>
          Wartość Bezwzględna
        </button>
        <button
          onClick={() => setActiveLab('TRIGONOMETRY')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeLab === 'TRIGONOMETRY'
              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Trygonometria (Okrąg)
        </button>
      </div>

      {/* 3. Aktywne laboratorium */}
      <div className="p-3 sm:p-5">
        {activeLab === 'PARABOLA' && <ParabolaLab />}
        {activeLab === 'LINEAR' && <LinearFunctionLab />}
        {activeLab === 'GRAPH_INSPECTOR' && <GraphInspectorLab />}
        {activeLab === 'ABSOLUTE_VALUE' && <AbsoluteValueLab />}
        {activeLab === 'TRIGONOMETRY' && <TrigonometryCircleLab />}
      </div>
    </div>
  );
};

// ============================================================================
// LAB 1: PARABOLA & NIERÓWNOŚCI KWADRATOWE (DZIAŁ 8)
// ============================================================================
function ParabolaLab() {
  const [a, setA] = useState<number>(1);
  const [inequalityMode, setInequalityMode] = useState<'NONE' | 'GE' | 'LE'>('NONE');

  // Przesuwalny punkt wierzchołka W = (p, q)
  const vertex = useMovablePoint([1, -4], {
    constrain: ([x, y]) => [Math.round(x * 2) / 2, Math.round(y * 2) / 2]
  });

  const p = vertex.point[0];
  const q = vertex.point[1];

  // Współczynniki postaci ogólnej: f(x) = a(x - p)^2 + q = ax^2 - 2ap*x + (ap^2 + q)
  const b = -2 * a * p;
  const c = a * Math.pow(p, 2) + q;
  const delta = Math.pow(b, 2) - 4 * a * c;

  // Pierwiastki
  const roots = useMemo(() => {
    if (a === 0) return [];
    if (delta > 0) {
      const x1 = (-b - Math.sqrt(delta)) / (2 * a);
      const x2 = (-b + Math.sqrt(delta)) / (2 * a);
      return [Math.min(x1, x2), Math.max(x1, x2)];
    } else if (Math.abs(delta) < 0.0001) {
      return [-b / (2 * a)];
    }
    return [];
  }, [a, b, delta]);

  // Alert pułapki CKE
  const trapAlert = useMemo(() => {
    if (a === 0) {
      return 'Dla a = 0 funkcja przestaje być kwadratowa i staje się funkcją liniową!';
    }
    if (delta < 0 && a > 0) {
      return 'Δ < 0 oraz a > 0: cała parabola wisi nad osią OX. Nierówność f(x) > 0 spełniają wszystkie liczby rzeczywiste (x ∈ ℝ), a f(x) ≤ 0 to zbiór pusty (∅)!';
    }
    if (delta < 0 && a < 0) {
      return 'Δ < 0 oraz a < 0: cała parabola leży pod osią OX. Nierówność f(x) < 0 spełniają wszystkie liczby rzeczywiste (x ∈ ℝ)!';
    }
    return null;
  }, [a, delta]);

  return (
    <div className="space-y-4">
      {/* Dynamiczny panel KaTeX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#0E1522] border border-white/10 text-xs">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Postać kanoniczna & wierzchołek:</span>
          <div className="text-white font-mono">
            <MathRenderer content={`$$f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}(x ${p >= 0 ? `- ${p}` : `+ ${Math.abs(p)}`})^2 ${q >= 0 ? `+ ${q}` : `- ${Math.abs(q)}`}$$`} />
          </div>
          <div className="text-slate-300 text-[11px]">
            Wierzchołek: <strong className="text-amber-300">W = ({p}, {q})</strong>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Postać ogólna & Wyróżnik Δ:</span>
          <div className="text-white font-mono">
            <MathRenderer content={`$$f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}$$`} />
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className={`font-bold ${delta > 0 ? 'text-emerald-400' : delta === 0 ? 'text-amber-400' : 'text-rose-400'}`}>
              Δ = {delta.toFixed(1)} {delta > 0 ? '(2 pierwiastki)' : delta === 0 ? '(1 pierwiastek)' : '(brak pierwiastków)'}
            </span>
          </div>
        </div>
      </div>

      {/* Mafs Canvas */}
      <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#070A0F]">
        <Mafs
          viewBox={{ x: [-6, 6], y: [-7, 5] }}
          preserveAspectRatio={false}
          pan={false}
          zoom={false}
          height={300}
        >
          <Coordinates.Cartesian
            subdivisions={2}
            xAxis={{ lines: 1, labels: (x) => (x !== 0 ? x.toString() : '') }}
            yAxis={{ lines: 1, labels: (y) => (y !== 0 ? y.toString() : '') }}
          />

          {/* Oś symetrii: x = p */}
          <Line.Segment
            point1={[p, -7]}
            point2={[p, 5]}
            style="dashed"
            color="rgba(255, 184, 0, 0.4)"
            weight={1.5}
          />

          {/* Parabola */}
          {a !== 0 && (
            <Plot.OfX
              y={(x) => a * Math.pow(x - p, 2) + q}
              color={a > 0 ? '#FFB800' : '#38BDF8'}
              weight={3}
            />
          )}

          {/* Zaznaczenie strefy nierówności na osi OX */}
          {inequalityMode !== 'NONE' && roots.length === 2 && (
            <>
              {inequalityMode === 'GE' ? (
                a > 0 ? (
                  <>
                    <Line.Segment point1={[-6, 0]} point2={[roots[0], 0]} color="#10B981" weight={6} />
                    <Line.Segment point1={[roots[1], 0]} point2={[6, 0]} color="#10B981" weight={6} />
                  </>
                ) : (
                  <Line.Segment point1={[roots[0], 0]} point2={[roots[1], 0]} color="#10B981" weight={6} />
                )
              ) : (
                a > 0 ? (
                  <Line.Segment point1={[roots[0], 0]} point2={[roots[1], 0]} color="#F43F5E" weight={6} />
                ) : (
                  <>
                    <Line.Segment point1={[-6, 0]} point2={[roots[0], 0]} color="#F43F5E" weight={6} />
                    <Line.Segment point1={[roots[1], 0]} point2={[6, 0]} color="#F43F5E" weight={6} />
                  </>
                )
              )}
            </>
          )}

          {/* Miejsca zerowe */}
          {roots.map((r, idx) => (
            <React.Fragment key={idx}>
              <Circle center={[r, 0]} radius={0.2} color="#10B981" fillOpacity={1} weight={2} />
              <Text x={r} y={0.4} size={12} color="#10B981" attach="s">
                {`x${idx + 1}=${r.toFixed(1)}`}
              </Text>
            </React.Fragment>
          ))}

          {/* Ruchomy punkt wierzchołka */}
          {vertex.element}
          <Text x={p} y={q - (a > 0 ? 0.45 : -0.45)} size={12} color="#FFB800" attach="s">
            {`W(${p}, ${q})`}
          </Text>
        </Mafs>
      </div>

      {/* Kontrolki dotykowe pod wykresem */}
      <div className="space-y-3 bg-[#0E1522] p-3 rounded-xl border border-white/5">
        <div className="flex items-center justify-between gap-4">
          <label className="text-xs text-slate-300 font-semibold flex items-center gap-2">
            <span>Współczynnik <strong className="text-amber-400">a</strong> (kierunek ramion):</span>
            <span className="font-mono text-white bg-black/40 px-2 py-0.5 rounded border border-white/10">
              {a > 0 ? `+${a}` : a} ({a > 0 ? 'ramiona w górę ∪' : a < 0 ? 'ramiona w dół ∩' : 'prosta'})
            </span>
          </label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.5"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            className="w-36 accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Przyciski trybu nierówności */}
        <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-white/5">
          <span className="text-[11px] text-slate-400 font-semibold">Zbadaj nierówność:</span>
          <button
            onClick={() => setInequalityMode('NONE')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              inequalityMode === 'NONE' ? 'bg-amber-400 text-black font-bold' : 'bg-white/5 text-slate-300'
            }`}
          >
            Tylko wykres f(x)
          </button>
          <button
            onClick={() => setInequalityMode('GE')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              inequalityMode === 'GE' ? 'bg-emerald-500 text-black font-bold' : 'bg-white/5 text-slate-300'
            }`}
          >
            f(x) ≥ 0 (nad osią)
          </button>
          <button
            onClick={() => setInequalityMode('LE')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              inequalityMode === 'LE' ? 'bg-rose-500 text-white font-bold' : 'bg-white/5 text-slate-300'
            }`}
          >
            f(x) ≤ 0 (pod osią)
          </button>
        </div>
      </div>

      {/* Detektor Pułapki CKE */}
      {trapAlert && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 animate-in fade-in duration-200">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-rose-200">Uwaga maturalna CKE: </strong>
            <span>{trapAlert}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// LAB 2: FUNKCJA LINIOWA (DZIAŁ 10)
// ============================================================================
function LinearFunctionLab() {
  const pointA = useMovablePoint([-2, -1], {
    constrain: ([x, y]) => [Math.round(x), Math.round(y)]
  });
  const pointB = useMovablePoint([2, 3], {
    constrain: ([x, y]) => [Math.round(x), Math.round(y)]
  });

  const [showPerpendicular, setShowPerpendicular] = useState<boolean>(false);

  const x1 = pointA.point[0];
  const y1 = pointA.point[1];
  const x2 = pointB.point[0];
  const y2 = pointB.point[1];

  const dx = x2 - x1;
  const dy = y2 - y1;

  const isVertical = dx === 0;
  const a = isVertical ? 0 : dy / dx;
  const b = isVertical ? 0 : y1 - a * x1;

  const root = a !== 0 ? -b / a : null;

  return (
    <div className="space-y-4">
      {/* Panel analityczny KaTeX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#0E1522] border border-white/10 text-xs">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Równanie prostej y = ax + b:</span>
          <div className="text-white font-mono">
            {isVertical ? (
              <MathRenderer content={`$$x = ${x1}$$`} />
            ) : (
              <MathRenderer content={`$$y = ${a === 1 ? '' : a === -1 ? '-' : a.toFixed(2)}x ${b >= 0 ? `+ ${b.toFixed(2)}` : `- ${Math.abs(b).toFixed(2)}`}$$`} />
            )}
          </div>
          <div className="text-slate-300 text-[11px]">
            Punkty: <strong className="text-amber-300">A({x1}, {y1})</strong>, <strong className="text-amber-300">B({x2}, {y2})</strong>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Współczynnik kierunkowy & własności:</span>
          <div className="text-slate-200 text-[11px] space-y-0.5">
            <div>
              Współczynnik: <strong className="text-cyan-300 font-mono">a = {a.toFixed(2)}</strong> ({a > 0 ? '↗ rosnąca' : a < 0 ? '↘ malejąca' : '→ stała'})
            </div>
            <div>
              Przecięcie z osią OY: <strong className="text-amber-300 font-mono">(0, {b.toFixed(2)})</strong>
            </div>
            {root !== null && (
              <div>
                Miejsce zerowe: <strong className="text-emerald-400 font-mono">x₀ = {root.toFixed(2)}</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mafs Canvas */}
      <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#070A0F]">
        <Mafs
          viewBox={{ x: [-5, 5], y: [-5, 5] }}
          preserveAspectRatio={false}
          pan={false}
          zoom={false}
          height={300}
        >
          <Coordinates.Cartesian
            subdivisions={2}
            xAxis={{ lines: 1, labels: (x) => (x !== 0 ? x.toString() : '') }}
            yAxis={{ lines: 1, labels: (y) => (y !== 0 ? y.toString() : '') }}
          />

          {/* Prosta główna */}
          {!isVertical ? (
            <Plot.OfX y={(x) => a * x + b} color="#FFB800" weight={3} />
          ) : (
            <Line.Segment point1={[x1, -5]} point2={[x1, 5]} color="#FFB800" weight={3} />
          )}

          {/* Prosta prostopadła: a_perp = -1/a */}
          {showPerpendicular && a !== 0 && (
            <Plot.OfX
              y={(x) => (-1 / a) * x + b}
              color="#38BDF8"
              weight={2}
              style="dashed"
            />
          )}

          {/* Punkt przecięcia z osią OY: (0, b) */}
          {!isVertical && (
            <Circle center={[0, b]} radius={0.16} color="#FFB800" fillOpacity={1} weight={2} />
          )}

          {/* Miejsce zerowe: (x0, 0) */}
          {root !== null && (
            <Circle center={[root, 0]} radius={0.18} color="#10B981" fillOpacity={1} weight={2} />
          )}

          {/* Ruchome punkty A i B */}
          {pointA.element}
          <Text x={x1} y={y1 + 0.35} size={12} color="#FFFFFF" attach="s">
            {`A(${x1}, ${y1})`}
          </Text>

          {pointB.element}
          <Text x={x2} y={y2 + 0.35} size={12} color="#FFFFFF" attach="s">
            {`B(${x2}, ${y2})`}
          </Text>
        </Mafs>
      </div>

      {/* Przyciski i opcje */}
      <div className="flex items-center justify-between p-3 bg-[#0E1522] rounded-xl border border-white/5 flex-wrap gap-2">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 font-semibold">
          <input
            type="checkbox"
            checked={showPerpendicular}
            onChange={(e) => setShowPerpendicular(e.target.checked)}
            className="rounded accent-amber-400 w-4 h-4 cursor-pointer"
          />
          <span>Pokaż prostą prostopadłą (<strong className="text-cyan-300 font-mono">a₁ · a₂ = -1</strong>)</span>
        </label>

        <span className="text-[11px] text-slate-400 italic">Przeciągaj punkty A i B po siatce</span>
      </div>
    </div>
  );
}

// ============================================================================
// LAB 3: SONDA WYKRESU CKE (DZIAŁ 9)
// ============================================================================
function GraphInspectorLab() {
  const [probeX, setProbeX] = useState<number>(1);
  const [highlightMode, setHighlightMode] = useState<'NONE' | 'DOMAIN' | 'RANGE' | 'ZEROS'>('NONE');

  // Funkcja łamana z autentycznego zadania CKE (Maj 2024 / Czerwiec 2023)
  // Punkty węzłowe: (-5, 0), (-2, 3), (1, -3), (4, 0), (6, 2)
  const evalPiecewise = (x: number): number => {
    if (x < -5 || x > 6) return 0;
    if (x <= -2) {
      // Od (-5, 0) do (-2, 3): y = 1*x + 5
      return 1 * x + 5;
    } else if (x <= 1) {
      // Od (-2, 3) do (1, -3): y = -2*x - 1
      return -2 * x - 1;
    } else if (x <= 4) {
      // Od (1, -3) do (4, 0): y = 1*x - 4
      return 1 * x - 4;
    } else {
      // Od (4, 0) do (6, 2): y = 1*x - 4
      return 1 * x - 4;
    }
  };

  const probeY = evalPiecewise(probeX);

  return (
    <div className="space-y-4">
      {/* Panel odczytu sondy */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#0E1522] border border-white/10 text-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Odczyt wartości f(x):</span>
          <div className="text-white font-mono text-sm font-bold">
            f({probeX.toFixed(1)}) = <span className="text-amber-300">{probeY.toFixed(1)}</span>
          </div>
          <p className="text-[10px] text-slate-400">Punkt na wykresie: ({probeX.toFixed(1)}, {probeY.toFixed(1)})</p>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Dziedzina i zbiór wartości:</span>
          <div className="text-slate-200 text-[11px]">
            <div>D_f = <strong className="text-cyan-300 font-mono">⟨-5, 6⟩</strong> (oś OX)</div>
            <div>ZW_f = <strong className="text-emerald-300 font-mono">⟨-3, 3⟩</strong> (oś OY)</div>
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Miejsca zerowe f(x) = 0:</span>
          <div className="text-emerald-300 text-[11px] font-mono font-bold">
            x ∈ &#123;-5; -0.5; 4&#125;
          </div>
          <p className="text-[10px] text-slate-400">Punkty przecięcia z osią OX</p>
        </div>
      </div>

      {/* Mafs Canvas */}
      <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#070A0F]">
        <Mafs
          viewBox={{ x: [-6, 7], y: [-4, 4] }}
          preserveAspectRatio={false}
          pan={false}
          zoom={false}
          height={300}
        >
          <Coordinates.Cartesian
            subdivisions={2}
            xAxis={{ lines: 1, labels: (x) => (x !== 0 ? x.toString() : '') }}
            yAxis={{ lines: 1, labels: (y) => (y !== 0 ? y.toString() : '') }}
          />

          {/* Podświetlenie dziedziny na osi OX */}
          {highlightMode === 'DOMAIN' && (
            <Line.Segment point1={[-5, 0]} point2={[6, 0]} color="#38BDF8" weight={6} />
          )}

          {/* Podświetlenie zbioru wartości na osi OY */}
          {highlightMode === 'RANGE' && (
            <Line.Segment point1={[0, -3]} point2={[0, 3]} color="#10B981" weight={6} />
          )}

          {/* Wykres łamany */}
          <Line.Segment point1={[-5, 0]} point2={[-2, 3]} color="#FFB800" weight={3} />
          <Line.Segment point1={[-2, 3]} point2={[1, -3]} color="#FFB800" weight={3} />
          <Line.Segment point1={[1, -3]} point2={[4, 0]} color="#FFB800" weight={3} />
          <Line.Segment point1={[4, 0]} point2={[6, 2]} color="#FFB800" weight={3} />

          {/* Węzły */}
          <Circle center={[-5, 0]} radius={0.16} color="#FFB800" fillOpacity={1} weight={2} />
          <Circle center={[-2, 3]} radius={0.16} color="#FFB800" fillOpacity={1} weight={2} />
          <Circle center={[1, -3]} radius={0.16} color="#FFB800" fillOpacity={1} weight={2} />
          <Circle center={[4, 0]} radius={0.16} color="#FFB800" fillOpacity={1} weight={2} />
          <Circle center={[6, 2]} radius={0.16} color="#FFB800" fillOpacity={1} weight={2} />

          {/* Rzuty sondy na osie */}
          <Line.Segment point1={[probeX, 0]} point2={[probeX, probeY]} style="dashed" color="rgba(255, 255, 255, 0.4)" weight={1.5} />
          <Line.Segment point1={[0, probeY]} point2={[probeX, probeY]} style="dashed" color="rgba(255, 255, 255, 0.4)" weight={1.5} />

          {/* Punkt sondy */}
          <Circle center={[probeX, probeY]} radius={0.22} color="#38BDF8" fillOpacity={1} weight={2} />
          <Text x={probeX} y={probeY + 0.4} size={12} color="#38BDF8" attach="s">
            {`(${probeX.toFixed(1)}, ${probeY.toFixed(1)})`}
          </Text>
        </Mafs>
      </div>

      {/* Suwak sondy */}
      <div className="space-y-3 p-3 bg-[#0E1522] rounded-xl border border-white/5">
        <div className="flex items-center justify-between gap-4">
          <label className="text-xs text-slate-300 font-semibold flex items-center gap-2">
            <span>Pozycja sondy na osi OX (<strong className="text-amber-400">x₀</strong>):</span>
            <span className="font-mono text-white bg-black/40 px-2 py-0.5 rounded border border-white/10">
              x = {probeX.toFixed(1)}
            </span>
          </label>
          <input
            type="range"
            min="-5"
            max="6"
            step="0.5"
            value={probeX}
            onChange={(e) => setProbeX(parseFloat(e.target.value))}
            className="w-40 accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Filtry analityczne */}
        <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-white/5">
          <span className="text-[11px] text-slate-400 font-semibold">Podświetl filtr:</span>
          <button
            onClick={() => setHighlightMode('NONE')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              highlightMode === 'NONE' ? 'bg-amber-400 text-black font-bold' : 'bg-white/5 text-slate-300'
            }`}
          >
            Domyślny
          </button>
          <button
            onClick={() => setHighlightMode('DOMAIN')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              highlightMode === 'DOMAIN' ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-slate-300'
            }`}
          >
            Dziedzina D_f (oś OX)
          </button>
          <button
            onClick={() => setHighlightMode('RANGE')}
            className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
              highlightMode === 'RANGE' ? 'bg-emerald-500 text-black font-bold' : 'bg-white/5 text-slate-300'
            }`}
          >
            Zbiór wartości ZW_f (oś OY)
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LAB 4: WARTOŚĆ BEZWZGLĘDNA (DZIAŁ 3)
// ============================================================================
function AbsoluteValueLab() {
  const [centerA, setCenterA] = useState<number>(2);
  const [radiusR, setRadiusR] = useState<number>(3);

  const leftBound = centerA - radiusR;
  const rightBound = centerA + radiusR;

  return (
    <div className="space-y-4">
      {/* Dynamiczny panel KaTeX */}
      <div className="p-3 rounded-xl bg-[#0E1522] border border-white/10 text-xs space-y-2">
        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Interpretacja geometryczna odległości:</span>
        <div className="text-white font-mono text-center sm:text-left">
          <MathRenderer content={`$$|x - ${centerA >= 0 ? centerA : `(${centerA})`}| \\le ${radiusR} \\quad \\iff \\quad x \\in \\langle ${leftBound}, ${rightBound} \\rangle$$`} />
        </div>
        <p className="text-[11px] text-slate-300">
          Odległość liczby <strong className="text-cyan-300 font-mono">x</strong> od środka <strong className="text-amber-400 font-mono">a = {centerA}</strong> na osi wynosi maksymalnie <strong className="text-emerald-400 font-mono">r = {radiusR}</strong>.
        </p>
      </div>

      {/* Mafs Canvas */}
      <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#070A0F]">
        <Mafs
          viewBox={{ x: [-6, 8], y: [-1, 6] }}
          preserveAspectRatio={false}
          pan={false}
          zoom={false}
          height={280}
        >
          <Coordinates.Cartesian
            subdivisions={2}
            xAxis={{ lines: 1, labels: (x) => (x !== 0 ? x.toString() : '') }}
            yAxis={{ lines: 1, labels: (y) => (y !== 0 ? y.toString() : '') }}
          />

          {/* Wykres f(x) = |x - a| */}
          <Plot.OfX y={(x) => Math.abs(x - centerA)} color="#FFB800" weight={3} />

          {/* Linia pozioma y = r */}
          <Plot.OfX y={() => radiusR} color="#38BDF8" weight={2} style="dashed" />

          {/* Przedział rozwiązań na osi OX */}
          <Line.Segment point1={[leftBound, 0]} point2={[rightBound, 0]} color="#10B981" weight={6} />

          {/* Środek a */}
          <Circle center={[centerA, 0]} radius={0.18} color="#FFB800" fillOpacity={1} weight={2} />
          <Text x={centerA} y={-0.45} size={12} color="#FFB800" attach="s">
            {`a=${centerA}`}
          </Text>

          {/* Granice przedziału */}
          <Circle center={[leftBound, 0]} radius={0.16} color="#10B981" fillOpacity={1} weight={2} />
          <Text x={leftBound} y={0.35} size={12} color="#10B981" attach="s">
            {`${leftBound}`}
          </Text>

          <Circle center={[rightBound, 0]} radius={0.16} color="#10B981" fillOpacity={1} weight={2} />
          <Text x={rightBound} y={0.35} size={12} color="#10B981" attach="s">
            {`${rightBound}`}
          </Text>
        </Mafs>
      </div>

      {/* Kontrolki suwaków */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#0E1522] rounded-xl border border-white/5">
        <div className="flex items-center justify-between gap-3">
          <label className="text-xs text-slate-300 font-semibold">
            Środek <strong className="text-amber-400">a</strong>:
          </label>
          <input
            type="range"
            min="-3"
            max="4"
            step="1"
            value={centerA}
            onChange={(e) => setCenterA(parseInt(e.target.value))}
            className="w-28 accent-amber-400 cursor-pointer"
          />
          <span className="text-xs font-mono text-white w-6">{centerA}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="text-xs text-slate-300 font-semibold">
            Promień <strong className="text-emerald-400">r</strong>:
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={radiusR}
            onChange={(e) => setRadiusR(parseInt(e.target.value))}
            className="w-28 accent-emerald-400 cursor-pointer"
          />
          <span className="text-xs font-mono text-white w-6">{radiusR}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LAB 5: TRYGONOMETRIA I OKRĄG JEDNOSTKOWY (DZIAŁ 11/12)
// ============================================================================
function TrigonometryCircleLab() {
  const [angleDeg, setAngleDeg] = useState<number>(30);

  const angleRad = (angleDeg * Math.PI) / 180;
  const cosVal = Math.cos(angleRad);
  const sinVal = Math.sin(angleRad);
  const tanVal = cosVal !== 0 ? Math.tan(angleRad) : null;

  return (
    <div className="space-y-4">
      {/* Panel analityczny KaTeX */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-[#0E1522] border border-white/10 text-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Kąt α:</span>
          <div className="text-white font-mono font-bold text-sm">{angleDeg}°</div>
          <div className="text-[10px] text-slate-400 font-mono">{(angleRad / Math.PI).toFixed(2)}π rad</div>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">cos α (poziom):</span>
          <div className="text-cyan-300 font-mono font-bold text-sm">{cosVal.toFixed(3)}</div>
          <div className="text-[10px] text-slate-400">Rzut na oś OX</div>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">sin α (pion):</span>
          <div className="text-emerald-300 font-mono font-bold text-sm">{sinVal.toFixed(3)}</div>
          <div className="text-[10px] text-slate-400">Rzut na oś OY</div>
        </div>

        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">tg α = sin/cos:</span>
          <div className="text-purple-300 font-mono font-bold text-sm">
            {tanVal !== null ? tanVal.toFixed(3) : 'nie istnieje'}
          </div>
          <div className="text-[10px] text-slate-400">Iloraz</div>
        </div>
      </div>

      {/* Mafs Canvas */}
      <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#070A0F]">
        <Mafs
          viewBox={{ x: [-1.5, 1.5], y: [-1.4, 1.4] }}
          preserveAspectRatio={false}
          pan={false}
          zoom={false}
          height={300}
        >
          <Coordinates.Cartesian
            subdivisions={2}
            xAxis={{ lines: 0.5, labels: (x) => (x !== 0 ? x.toString() : '') }}
            yAxis={{ lines: 0.5, labels: (y) => (y !== 0 ? y.toString() : '') }}
          />

          {/* Okrąg jednostkowy R = 1 */}
          <Circle center={[0, 0]} radius={1} color="rgba(255, 255, 255, 0.25)" weight={2} />

          {/* Promień wodzący */}
          <Line.Segment point1={[0, 0]} point2={[cosVal, sinVal]} color="#FFB800" weight={3} />

          {/* Rzut poziomy cos alpha */}
          <Line.Segment point1={[0, 0]} point2={[cosVal, 0]} color="#38BDF8" weight={4} />

          {/* Rzut pionowy sin alpha */}
          <Line.Segment point1={[cosVal, 0]} point2={[cosVal, sinVal]} color="#10B981" weight={4} />

          {/* Punkt na okręgu */}
          <Circle center={[cosVal, sinVal]} radius={0.06} color="#FFB800" fillOpacity={1} weight={2} />
          <Text x={cosVal * 1.18} y={sinVal * 1.18} size={12} color="#FFB800" attach="s">
            {`(${cosVal.toFixed(2)}, ${sinVal.toFixed(2)})`}
          </Text>
        </Mafs>
      </div>

      {/* Szybkie presety kątów CKE */}
      <div className="p-3 bg-[#0E1522] rounded-xl border border-white/5 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-slate-300 font-semibold">Wybierz kąt maturalny CKE:</span>
          <span className="text-xs font-mono font-bold text-amber-300">{angleDeg}°</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {[0, 30, 45, 60, 90, 120, 135, 150, 180, 270].map((deg) => (
            <button
              key={deg}
              onClick={() => setAngleDeg(deg)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                angleDeg === deg ? 'bg-amber-400 text-black font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {deg}°
            </button>
          ))}
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Jedynka trygonometryczna: <strong className="text-white font-mono">sin²α + cos²α = 1</strong>
          </span>
          <span className="text-amber-300 font-mono font-bold">
            {(Math.pow(sinVal, 2) + Math.pow(cosVal, 2)).toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
}
