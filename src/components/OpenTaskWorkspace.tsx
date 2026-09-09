import React, { useState, useRef, useEffect } from 'react';
import { InlineMath } from 'react-katex';
import { 
  Trash2, 
  Delete,
  CheckCircle2, 
  AlertTriangle,
  Keyboard,
  PenTool,
  RotateCcw,
  Eraser,
  Undo2,
  Redo2,
  Maximize2,
  Check
} from 'lucide-react';
import { triggerHaptic } from '../utils';

export interface OpenTaskWorkspaceProps {
  task?: any;
  isEvaluated?: boolean;
  isCorrect?: boolean | null;
  value: string;
  onChangeValue: (val: string) => void;
  savedCanvasDataUrl?: string;
  onSaveCanvasData?: (dataUrl: string) => void;
  onOpenScratchpad?: () => void;
  onSubmit?: () => void;
  onAskAiTutor?: () => void;
  inputPlaceholder?: string;
}

/**
 * Formats user input into clean math notation for live KaTeX display
 */
export function formatMathDisplay(raw: string): string {
  if (!raw || !raw.trim()) return '';
  let s = raw.trim();

  // If student submitted via whiteboard
  if (s === '[Rozwiązanie odręczne na tablicy]') {
    return '\\text{Rozwiązanie odręczne na tablicy}';
  }

  // Decimal comma in numbers (0,3 -> 0{,}3)
  s = s.replace(/(\d+),(\d+)/g, (_m, d1, d2) => `${d1}{,}${d2}`);
  s = s.replace(/,/g, '{,}');

  // Multiplication symbol: replace * with \cdot
  s = s.replace(/\*/g, ' \\cdot ');

  // Powers:
  if (s.endsWith('^')) {
    const base = s.slice(0, -1);
    s = `${base || 'x'}^{\\square}`;
  } else {
    s = s.replace(/([0-9a-zA-Z\)\}]+)\^\{?([0-9a-zA-Z\+\-]+)\}?/g, (_m, b, e) => `{${b}}^{${e}}`);
  }

  // Fractions:
  if (s.endsWith('/')) {
    const num = s.slice(0, -1);
    s = `\\frac{${num || '1'}}{\\square}`;
  } else {
    s = s.replace(/(\([^\)]+\)|[0-9a-zA-Z\^_{}]+)\/(\([^\)]+\)|[0-9a-zA-Z\^_{}]+)/g, (_m, n, d) => `\\frac{${n}}{${d}}`);
  }

  // Unfinished square root
  if (s.endsWith('\\sqrt{}')) {
    s = s.replace(/\\sqrt\{\}$/, '\\sqrt{\\square}');
  }

  // Balance unclosed braces
  const openBraces = (s.match(/\{/g) || []).length;
  const closeBraces = (s.match(/\}/g) || []).length;
  if (openBraces > closeBraces) {
    s += '}'.repeat(openBraces - closeBraces);
  }

  // Balance unclosed parentheses
  const openParens = (s.match(/\(/g) || []).length;
  const closeParens = (s.match(/\)/g) || []).length;
  if (openParens > closeParens) {
    s += ')'.repeat(openParens - closeParens);
  }

  return s;
}

export function OpenTaskWorkspace({
  isEvaluated = false,
  isCorrect = null,
  value,
  onChangeValue,
  savedCanvasDataUrl = '',
  onSaveCanvasData,
  onOpenScratchpad,
  onSubmit,
  inputPlaceholder = 'Wpisz wyrażenie matematyczne lub użyj klawiatury...'
}: OpenTaskWorkspaceProps) {
  // Przełącznik segmentowy (Toggle): 'keyboard' vs 'whiteboard'
  const [activeTab, setActiveTab] = useState<'keyboard' | 'whiteboard'>('keyboard');

  // --------------------------------------------------------------------------
  // Whiteboard Canvas State & Logic
  // --------------------------------------------------------------------------
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [wbTool, setWbTool] = useState<'pen' | 'eraser'>('pen');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [hasCanvasStrokes, setHasCanvasStrokes] = useState<boolean>(Boolean(savedCanvasDataUrl && savedCanvasDataUrl.length > 50));
  const historyRef = useRef<ImageData[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  const updateUndoRedoState = () => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  };

  // Zapis stanu do historii i powiadomienie rodzica
  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      historyRef.current.push(imgData);
      if (historyRef.current.length > 30) {
        historyRef.current.shift();
      } else {
        historyIndexRef.current++;
      }
      updateUndoRedoState();

      if (onSaveCanvasData) {
        onSaveCanvasData(canvas.toDataURL('image/png'));
      }
    } catch {
      // ignore
    }
  };

  // Inicjalizacja canvasu (zarówno przy montowaniu, jak i gdy kontener uzyskuje wymiary)
  const initCanvas = () => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || 360;
    const height = rect.height || 280;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (savedCanvasDataUrl && savedCanvasDataUrl.length > 50) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
          saveCanvasState();
        };
        img.src = savedCanvasDataUrl;
      } else {
        saveCanvasState();
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(initCanvas, 40);
    window.addEventListener('resize', initCanvas);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  // Gdy uczeń przełącza na tablicę, upewnij się, że canvas ma właściwy rozmiar i stan
  useEffect(() => {
    if (activeTab === 'whiteboard') {
      const timer = setTimeout(initCanvas, 30);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Rysowanie: pointer events
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isEvaluated) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    setHasCanvasStrokes(true);

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (wbTool === 'pen') {
      ctx.strokeStyle = '#00E5FF';
      ctx.lineWidth = 2.5;
    } else {
      ctx.strokeStyle = '#070B12';
      ctx.lineWidth = 22;
    }
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isEvaluated) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    setIsDrawing(false);
    saveCanvasState();
  };

  // Cofnij (Undo)
  const handleUndo = () => {
    if (isEvaluated || historyIndexRef.current <= 0) return;
    triggerHaptic('light');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    historyIndexRef.current--;
    const prevData = historyRef.current[historyIndexRef.current];
    if (prevData) {
      ctx.putImageData(prevData, 0, 0);
      if (onSaveCanvasData) {
        onSaveCanvasData(canvas.toDataURL('image/png'));
      }
    }
    updateUndoRedoState();
  };

  // Ponów (Redo)
  const handleRedo = () => {
    if (isEvaluated || historyIndexRef.current >= historyRef.current.length - 1) return;
    triggerHaptic('light');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    historyIndexRef.current++;
    const nextData = historyRef.current[historyIndexRef.current];
    if (nextData) {
      ctx.putImageData(nextData, 0, 0);
      if (onSaveCanvasData) {
        onSaveCanvasData(canvas.toDataURL('image/png'));
      }
    }
    updateUndoRedoState();
  };

  // Wyczyść tablicę (Clear)
  const handleClearWhiteboard = () => {
    if (isEvaluated) return;
    triggerHaptic('medium');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasCanvasStrokes(false);
    saveCanvasState();
  };

  // Zatwierdzenie rozwiązania z tablicy
  const handleSubmitFromBoard = () => {
    if (isEvaluated) return;
    triggerHaptic('medium');
    const canvas = canvasRef.current;
    if (canvas && onSaveCanvasData) {
      const dataUrl = canvas.toDataURL('image/png');
      onSaveCanvasData(dataUrl);
    }
    // Jeśli pole tekstowe jest puste, zaznacz obecność odpowiedzi odręcznej
    if (!value || !value.trim()) {
      onChangeValue('[Rozwiązanie odręczne na tablicy]');
    }
    onSubmit?.();
  };

  // --------------------------------------------------------------------------
  // Keyboard Calculator Logic (4 Ergonomic Rows)
  // --------------------------------------------------------------------------
  const handleKeyClick = (keyToken: string) => {
    if (isEvaluated) return;
    triggerHaptic('light');

    // Jeśli poprzednio było oznaczenie z tablicy, wyczyść przed wprowadzaniem z klawiatury
    let currentVal = value;
    if (currentVal === '[Rozwiązanie odręczne na tablicy]') {
      currentVal = '';
    }

    if (keyToken === 'BACKSPACE') {
      if (!currentVal) return;
      if (currentVal.endsWith(' \\cdot ')) {
        onChangeValue(currentVal.slice(0, -7));
      } else if (currentVal.endsWith('\\sqrt{}')) {
        onChangeValue(currentVal.slice(0, -8));
      } else if (currentVal.endsWith('\\sqrt{')) {
        onChangeValue(currentVal.slice(0, -6));
      } else if (currentVal.endsWith('x^2') || currentVal.endsWith('x^')) {
        onChangeValue(currentVal.slice(0, -3));
      } else if (currentVal.endsWith('^2')) {
        onChangeValue(currentVal.slice(0, -2));
      } else if (currentVal.endsWith('^')) {
        onChangeValue(currentVal.slice(0, -1));
      } else if (currentVal.endsWith('}')) {
        const sqrtMatch = currentVal.match(/\\sqrt\{([^}]+)\}$/);
        if (sqrtMatch) {
          const inner = sqrtMatch[1];
          if (inner.length > 1) {
            onChangeValue(currentVal.slice(0, -2) + '}');
          } else {
            onChangeValue(currentVal.slice(0, -inner.length - 1) + '}');
          }
          return;
        }
        onChangeValue(currentVal.slice(0, -1));
      } else {
        onChangeValue(currentVal.slice(0, -1));
      }
      return;
    }

    if (keyToken === 'CLEAR') {
      triggerHaptic('medium');
      onChangeValue('');
      return;
    }

    // Symbole algebraiczne
    if (keyToken === 'POW2') {
      // Potęga x²
      if (!currentVal || /[+\-*\/(\s=]$/.test(currentVal)) {
        onChangeValue(currentVal + 'x^2');
      } else {
        onChangeValue(currentVal + '^2');
      }
      return;
    }

    if (keyToken === 'POW') {
      // Potęga xⁿ
      if (!currentVal || /[+\-*\/(\s=]$/.test(currentVal)) {
        onChangeValue(currentVal + 'x^');
      } else {
        onChangeValue(currentVal + '^');
      }
      return;
    }

    if (keyToken === 'SQRT') {
      onChangeValue(currentVal + '\\sqrt{}');
      return;
    }

    if (keyToken === 'FRAC' || keyToken === '÷') {
      onChangeValue(currentVal + '/');
      return;
    }

    if (keyToken === '·' || keyToken === '*') {
      onChangeValue(currentVal + '*');
      return;
    }

    // Inteligentne wstawianie do wnętrza \sqrt{}
    if (currentVal.endsWith('\\sqrt{}') && /^[0-9xn]$/.test(keyToken)) {
      onChangeValue(currentVal.slice(0, -1) + keyToken + '}');
      return;
    }

    onChangeValue(currentVal + keyToken);
  };

  const formattedMath = formatMathDisplay(value);
  const isInputReady = Boolean((value && value.trim().length > 0) || hasCanvasStrokes);

  return (
    <div className="w-full flex flex-col justify-end items-stretch gap-2.5">
      {/* ------------------------------------------------------------------ */}
      {/* 1. ELEGANCKI PRZEŁĄCZNIK SEGMENTOWY (TOGGLE): KLAWIATURA VS TABLICA */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center justify-between bg-[#0B0F19] p-1 rounded-2xl border border-white/10 w-full shrink-0 shadow-lg">
        <button
          type="button"
          id="toggle-math-keyboard-mode"
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('keyboard');
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'keyboard'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow-[0_0_16px_rgba(6,182,212,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Keyboard size={16} />
          <span>Klawiatura matematyczna</span>
        </button>

        <button
          type="button"
          id="toggle-math-whiteboard-mode"
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('whiteboard');
          }}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'whiteboard'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow-[0_0_16px_rgba(6,182,212,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <PenTool size={16} />
          <span>Tablica</span>
          {hasCanvasStrokes && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] shrink-0" title="Zawiera odręczne zapiski" />
          )}
        </button>
      </div>

      {/* ================================================================== */}
      {/* TRYB A: INTUICYJNA KLAWIATURA MATEMATYCZNA                          */}
      {/* ================================================================== */}
      <div className={`w-full flex flex-col gap-2 shrink-0 ${activeTab === 'keyboard' ? 'block' : 'hidden'}`}>
        {/* Pole odpowiedzi z podglądem matematycznym na żywo w notacji KaTeX */}
        <div className="w-full bg-[#121824] border border-white/10 focus-within:border-cyan-400/80 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.2)] rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-2.5 transition-all shrink-0">
          <div className="flex-1 min-w-0 flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Twoja odpowiedź (podgląd KaTeX):
            </span>
            <div className="w-full overflow-x-auto no-scrollbar py-0.5 min-h-[36px] flex items-center text-left">
              {formattedMath ? (
                <span className="text-white font-black text-lg sm:text-2xl tracking-wide">
                  <InlineMath math={formattedMath} />
                </span>
              ) : (
                <span className="text-slate-500 text-xs sm:text-sm italic font-normal">
                  {inputPlaceholder}
                </span>
              )}
            </div>
          </div>

          {value && !isEvaluated && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleKeyClick('BACKSPACE')}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
                title="Usuń ostatni znak (Backspace)"
              >
                <Delete size={17} />
              </button>
              <button
                type="button"
                onClick={() => handleKeyClick('CLEAR')}
                className="p-2 rounded-xl text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 transition-colors cursor-pointer active:scale-95"
                title="Wyczyść całe pole"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          )}

          {isEvaluated && (
            <div className="shrink-0 flex items-center pr-1">
              {isCorrect ? (
                <CheckCircle2 size={24} className="text-emerald-400" />
              ) : (
                <AlertTriangle size={24} className="text-rose-400" />
              )}
            </div>
          )}
        </div>

        {/* UKŁAD KLAWIATURY W 4 ERGONOMICZNYCH RZĘDACH */}
        <div className={`w-full flex flex-col gap-1.5 shrink-0 ${isEvaluated ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Rząd 1 (Symbole algebraiczne): x, n, x², xⁿ, √, a/b, ( ) */}
          <div className="grid grid-cols-8 gap-1 sm:gap-1.5 w-full">
            <button
              type="button"
              onClick={() => handleKeyClick('x')}
              className="h-10 sm:h-11 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-amber-300 italic font-black text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Zmienna x"
            >
              x
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('n')}
              className="h-10 sm:h-11 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-amber-300 italic font-black text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Zmienna n"
            >
              n
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('POW2')}
              className="h-10 sm:h-11 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-cyan-300 font-black text-xs sm:text-sm flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Potęga kwadratowa (x²)"
            >
              x²
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('POW')}
              className="h-10 sm:h-11 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-cyan-300 font-black text-xs sm:text-sm flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Potęga dowolna (xⁿ)"
            >
              xⁿ
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('SQRT')}
              className="h-10 sm:h-11 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-cyan-300 font-black text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Pierwiastek (√)"
            >
              √
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('FRAC')}
              className="h-10 sm:h-11 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-cyan-300 font-black text-xs sm:text-sm flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Ułamek zwykły (a/b)"
            >
              a/b
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('(')}
              className="h-10 sm:h-11 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-white font-bold text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Nawias otwierający ("
            >
              (
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick(')')}
              className="h-10 sm:h-11 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-white font-bold text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Nawias zamykający )"
            >
              )
            </button>
          </div>

          {/* Rząd 2 (Liczby i operatory): Cyfry 7, 8, 9, znak dzielenia ÷, znak mnożenia ·, znak minus - */}
          <div className="grid grid-cols-6 gap-1 sm:gap-1.5 w-full">
            <button
              type="button"
              onClick={() => handleKeyClick('7')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('8')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('9')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              9
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('÷')}
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-cyan-300 font-black text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Znak dzielenia (÷)"
            >
              ÷
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('·')}
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-cyan-300 font-black text-xl flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Znak mnożenia (·)"
            >
              ·
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('-')}
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-cyan-300 font-black text-xl flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Znak minus (-)"
            >
              −
            </button>
          </div>

          {/* Rząd 3: Cyfry 4, 5, 6, znak plus +, przecinek dziesiętny ,, znak równości = */}
          <div className="grid grid-cols-6 gap-1 sm:gap-1.5 w-full">
            <button
              type="button"
              onClick={() => handleKeyClick('4')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('5')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('6')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              6
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('+')}
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-cyan-300 font-black text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Znak plus (+)"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick(',')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-black text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Przecinek dziesiętny (,)"
            >
              ,
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('=')}
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-cyan-300 font-black text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Znak równości (=)"
            >
              =
            </button>
          </div>

          {/* Rząd 4: Cyfry 1, 2, 3, cyfra 0, klawisz kasowania ⌫ (Backspace) oraz wyraźny przycisk zatwierdzenia: Zatwierdź odpowiedź */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 w-full">
            <button
              type="button"
              onClick={() => handleKeyClick('1')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('2')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('3')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('0')}
              className="h-10 sm:h-11 rounded-xl bg-[#141C28] hover:bg-[#1E293B] border border-white/10 text-white font-bold text-base sm:text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('BACKSPACE')}
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-slate-300 hover:text-white font-bold flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Klawisz kasowania (Backspace)"
            >
              <Delete size={17} />
            </button>
            <button
              type="button"
              id="math-keyboard-submit-btn"
              disabled={isEvaluated || (!value && !hasCanvasStrokes)}
              onClick={() => {
                if (onSubmit) {
                  triggerHaptic('medium');
                  onSubmit();
                }
              }}
              className="col-span-2 h-10 sm:h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Check size={16} strokeWidth={2.5} />
              <span className="whitespace-nowrap">Zatwierdź odpowiedź</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* TRYB B: CYFROWA TABLICA DO PISANIA                                 */}
      {/* ================================================================== */}
      <div className={`w-full flex flex-col gap-2 shrink-0 ${activeTab === 'whiteboard' ? 'block' : 'hidden'}`}>
        <div className="w-full bg-[#0B101B] border border-white/15 rounded-2xl p-2.5 sm:p-3 flex flex-col gap-2.5 shadow-xl">
          {/* PASEK NARZĘDZI NA GÓRZE TABLICY: Pióro, Gumka, Cofnij, Ponów, Wyczyść */}
          <div className="flex items-center justify-between gap-2 shrink-0 flex-wrap">
            {/* Narzędzia pisania: Pióro / Gumka */}
            <div className="flex items-center gap-1.5 bg-[#141C28] p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  setWbTool('pen');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  wbTool === 'pen'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <PenTool size={14} />
                <span>Pióro</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  setWbTool('eraser');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  wbTool === 'eraser'
                    ? 'bg-rose-500 text-white font-black shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eraser size={14} />
                <span>Gumka</span>
              </button>
            </div>

            {/* Narzędzia historii i czyszczenia: Cofnij, Ponów, Wyczyść */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={!canUndo || isEvaluated}
                onClick={handleUndo}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-300 hover:text-white bg-[#141C28] hover:bg-[#1E293B] border border-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 text-xs font-semibold"
                title="Cofnij ostatnie pociągnięcie"
              >
                <Undo2 size={15} />
                <span className="hidden sm:inline">Cofnij</span>
              </button>

              <button
                type="button"
                disabled={!canRedo || isEvaluated}
                onClick={handleRedo}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-slate-300 hover:text-white bg-[#141C28] hover:bg-[#1E293B] border border-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 text-xs font-semibold"
                title="Ponów cofnięte pociągnięcie"
              >
                <Redo2 size={15} />
                <span className="hidden sm:inline">Ponów</span>
              </button>

              <button
                type="button"
                disabled={isEvaluated}
                onClick={handleClearWhiteboard}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                title="Wyczyść tablicę"
              >
                <Trash2 size={15} />
                <span className="hidden sm:inline">Wyczyść</span>
              </button>

              {onOpenScratchpad && (
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    onOpenScratchpad();
                  }}
                  className="p-1.5 rounded-xl text-cyan-400 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors cursor-pointer"
                  title="Powiększ na pełny ekran"
                >
                  <Maximize2 size={15} />
                </button>
              )}
            </div>
          </div>

          {/* OBSZAR ROBOCZY: PEŁNOWYMIAROWY KAFELEK TABLICY Z DELIKATNĄ SIATKĄ W KRATKĘ */}
          <div 
            ref={canvasContainerRef}
            className="w-full h-[280px] sm:h-[320px] rounded-xl border border-white/15 relative overflow-hidden touch-none"
            style={{
              backgroundColor: '#070B12',
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
            }}
          >
            <canvas
              ref={canvasRef}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
              className="w-full h-full cursor-crosshair block"
            />

            {/* Delikatny znak wodny z instrukcją arkusza maturalnego */}
            {!hasCanvasStrokes && !isDrawing && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-500/40 text-xs font-medium gap-1 select-none">
                <span>Arkusz roboczy • Kratka 0,5 cm</span>
                <span className="text-[11px] text-slate-500/30">Pisz palcem, rysikiem lub myszką</span>
              </div>
            )}
          </div>

          {/* PRZYCISK ZATWIERDZENIA Z TABLICY */}
          <button
            type="button"
            id="whiteboard-submit-answer-btn"
            disabled={isEvaluated || (!hasCanvasStrokes && !value)}
            onClick={handleSubmitFromBoard}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Check size={18} strokeWidth={2.5} />
            <span>Zatwierdź rozwiązanie z tablicy</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpenTaskWorkspace;
