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
  Minimize2,
  Check,
  ArrowRight,
  Feather,
  BookOpen,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Plus,
  ArrowDown,
  ArrowUp,
  Layers
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
  onSubmit?: (canvasDataUrl?: string) => void;
  onAskAiTutor?: (canvasDataUrl?: string) => void;
  inputPlaceholder?: string;
  hideWhiteboard?: boolean;
  mode?: 'math' | 'text';
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

  // Handle explicit LaTeX commands first
  s = s.replace(/\\langle\s*/g, '\\langle ');
  s = s.replace(/\\rangle\s*/g, '\\rangle ');
  s = s.replace(/\\infty\s*/g, '\\infty ');

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
    const base = s.slice(0, -1);
    const m = base.match(/(?:^|[\s\+\-\*\(\⟨=])([0-9a-zA-Z\^_{}\(\)]+)$/);
    if (m) {
      const prefix = base.slice(0, base.length - m[1].length);
      s = `${prefix}\\frac{${m[1]}}{\\square}`;
    } else {
      s = `${base}\\frac{1}{\\square}`;
    }
  } else {
    // Replace n/d fractions where n and d are alphanumeric or bracketed expressions
    s = s.replace(/(\([^\)]+\)|[0-9a-zA-Z\^]+)\/(\([^\)]+\)|[0-9a-zA-Z\^]+)/g, (_m, n, d) => `\\frac{${n}}{${d}}`);
  }

  // Decimal comma in numbers only (e.g. 0,3 -> 0{,}3)
  s = s.replace(/(\d+),(\d+)/g, (_m, d1, d2) => `${d1}{,}${d2}`);
  // Remaining commas (interval separators, lists): comma with space
  s = s.replace(/,(?!\d)/g, ',\\ ');

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

/**
 * Transforms an amber/dark whiteboard drawing into a pristine, high-contrast
 * document scan (pure white background #FFFFFF, crisp dark ink #0F172A).
 * This maximizes OCR and handwriting accuracy for Vision models (Nemotron/Gemini).
 */
export function getAiOptimizedCanvasDataUrl(canvas: HTMLCanvasElement): string {
  try {
    const offscreen = document.createElement('canvas');
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const octx = offscreen.getContext('2d');
    if (!octx) return canvas.toDataURL('image/png');

    // Solid white paper background
    octx.fillStyle = '#FFFFFF';
    octx.fillRect(0, 0, offscreen.width, offscreen.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas.toDataURL('image/png');

    const srcImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const dstImgData = octx.createImageData(canvas.width, canvas.height);
    const src = srcImgData.data;
    const dst = dstImgData.data;

    // Default dst to pure white
    for (let i = 0; i < dst.length; i += 4) {
      dst[i] = 255;
      dst[i + 1] = 255;
      dst[i + 2] = 255;
      dst[i + 3] = 255;
    }

    // Detect user ink strokes and convert to deep, crisp dark ink
    for (let i = 0; i < src.length; i += 4) {
      const a = src[i + 3];
      const r = src[i];
      const g = src[i + 1];
      const b = src[i + 2];
      const isEraser = r < 25 && g < 25 && b < 35;

      if (a > 20 && !isEraser) {
        const alphaFactor = a / 255;
        dst[i] = Math.round(15 * alphaFactor + 255 * (1 - alphaFactor));
        dst[i + 1] = Math.round(23 * alphaFactor + 255 * (1 - alphaFactor));
        dst[i + 2] = Math.round(42 * alphaFactor + 255 * (1 - alphaFactor));
        dst[i + 3] = 255;
      }
    }

    octx.putImageData(dstImgData, 0, 0);
    return offscreen.toDataURL('image/jpeg', 0.95);
  } catch (err) {
    console.warn('[Whiteboard] Optimization failed, using raw dataURL:', err);
    return canvas.toDataURL('image/png');
  }
}

/**
 * Asynchronously transforms a dataUrl string of the whiteboard into a high-contrast
 * black-on-white image suitable for AI handwriting OCR.
 */
export function convertDataUrlToAiOptimized(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    if (!dataUrl || !dataUrl.startsWith('data:image/')) {
      return resolve(dataUrl);
    }
    const img = new Image();
    img.onload = () => {
      try {
        const rawW = img.naturalWidth || img.width || 600;
        const rawH = img.naturalHeight || img.height || 400;

        // Scale down to max 1024px for lightning-fast AI transfer without loss in OCR quality
        const maxDim = 1024;
        let w = rawW;
        let h = rawH;
        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim / w, maxDim / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }

        const offscreen = document.createElement('canvas');
        offscreen.width = w;
        offscreen.height = h;
        const octx = offscreen.getContext('2d');
        if (!octx) return resolve(dataUrl);

        // 1. Draw original transparent canvas with strokes
        octx.clearRect(0, 0, w, h);
        octx.drawImage(img, 0, 0, w, h);

        const srcData = octx.getImageData(0, 0, w, h);
        const src = srcData.data;

        // 2. Prepare target buffer: pure white background with dark charcoal ink
        const targetData = octx.createImageData(w, h);
        const dst = targetData.data;

        for (let i = 0; i < src.length; i += 4) {
          const r = src[i];
          const g = src[i + 1];
          const b = src[i + 2];
          const a = src[i + 3];

          // Eraser strokes on whiteboard are dark #070B12
          const isEraser = r < 25 && g < 25 && b < 35;

          // High-contrast black ink on pure white paper for maximum AI Vision OCR precision
          if (a > 15 && !isEraser) {
            const factor = Math.min(1, (a / 255) * 1.35);
            const ink = Math.round(255 * (1 - factor));
            dst[i] = ink;
            dst[i + 1] = ink;
            dst[i + 2] = ink;
            dst[i + 3] = 255;
          } else {
            // Pure crisp white background
            dst[i] = 255;
            dst[i + 1] = 255;
            dst[i + 2] = 255;
            dst[i + 3] = 255;
          }
        }

        octx.putImageData(targetData, 0, 0);
        resolve(offscreen.toDataURL('image/jpeg', 0.85));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

const ESSAY_CONNECTORS = [
  {
    id: 'thesis',
    label: 'Wstęp i Teza',
    chips: [
      'Warto zauważyć, że...',
      'Kluczową kwestią staje się pytanie, czy...',
      'Analiza problemu prowadzi do tezy, iż...',
      'W świetle załączonego zagadnienia należy uznać, że...'
    ]
  },
  {
    id: 'argument',
    label: 'Argumentacja TEEL',
    chips: [
      'Kluczowym argumentem przemawiającym za tą tezą jest...',
      'Dowodzi tego postawa bohatera, który...',
      'Szczególnie wymowny jest moment, w którym...',
      'Ilustracją tej zasady w utworze staje się...'
    ]
  },
  {
    id: 'dialectic',
    label: 'Dialektyka i Kontrargument',
    chips: [
      'Z drugiej strony nie sposób pominąć faktu, że...',
      'Przeciwwagą dla tej postawy okazuje się...',
      'Pozorny paradoks wynika z faktu, że...',
      'Należy jednak dostrzec drugie dno tej sytuacji, mianowicie...'
    ]
  },
  {
    id: 'context',
    label: 'Kontekst 4/4 pkt',
    chips: [
      'W kontekście historyczno-społecznym epoki warto przywołać...',
      'Pogląd ten ściśle koresponduje z filozofią...',
      'Podobny topos kulturowy odnajdujemy w dziele...',
      'W perspektywie biograficznej autora zauważamy, że...'
    ]
  },
  {
    id: 'conclusion',
    label: 'Synteza i Zakończenie',
    chips: [
      'Konkludując powyższe rozważania, należy stwierdzić, że...',
      'Reasumując, losy bohaterów jednoznacznie dowodzą, iż...',
      'Wnioskiem wieńczącym analizę jest przekonanie, że...',
      'Ostatecznie literatura udowadnia, że...'
    ]
  }
];

export function OpenTaskWorkspace({
  task,
  isEvaluated = false,
  isCorrect = null,
  value,
  onChangeValue,
  savedCanvasDataUrl = '',
  onSaveCanvasData,
  onOpenScratchpad,
  onSubmit,
  inputPlaceholder = 'Wpisz wyrażenie matematyczne lub użyj klawiatury...',
  hideWhiteboard = false,
  mode = 'math'
}: OpenTaskWorkspaceProps) {
  // Przełącznik segmentowy (Toggle): 'keyboard' vs 'whiteboard'
  const [activeTab, setActiveTab] = useState<'keyboard' | 'whiteboard'>('keyboard');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showConnectorStudio, setShowConnectorStudio] = useState<boolean>(true);
  const [activeConnectorTab, setActiveConnectorTab] = useState<string>('thesis');
  const [showStructureGuide, setShowStructureGuide] = useState<boolean>(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  // --------------------------------------------------------------------------
  // Whiteboard Canvas State & Logic
  // --------------------------------------------------------------------------
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const [canvasHeight, setCanvasHeight] = useState<number>(440);
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

  // Rozszerzenie arkusza w dół (+350px)
  const handleExpandCanvas = () => {
    triggerHaptic('medium');
    setCanvasHeight(prev => Math.min(prev + 350, 3200));
    setTimeout(() => {
      if (scrollViewportRef.current) {
        scrollViewportRef.current.scrollTo({
          top: scrollViewportRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 60);
  };

  // Zmniejszenie arkusza o 350px (minimum 440px)
  const handleShrinkCanvas = () => {
    if (canvasHeight <= 440) return;
    triggerHaptic('light');
    setCanvasHeight(prev => Math.max(prev - 350, 440));
  };

  const handleScrollToTop = () => {
    triggerHaptic('light');
    scrollViewportRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToBottom = () => {
    triggerHaptic('light');
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
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

  // Inicjalizacja canvasu (zarówno przy montowaniu, jak i gdy kontener uzyskuje wymiary lub wysokość)
  const initCanvas = () => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || 360;
    const height = canvasHeight;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      // 1. Przechwyć obecny stan do canvasu offscreen, aby nie utracić ani piksela przy powiększaniu!
      let backupCanvas: HTMLCanvasElement | null = null;
      if (hasCanvasStrokes && canvas.width > 0 && canvas.height > 0) {
        try {
          backupCanvas = document.createElement('canvas');
          backupCanvas.width = canvas.width;
          backupCanvas.height = canvas.height;
          const bctx = backupCanvas.getContext('2d');
          if (bctx) {
            bctx.drawImage(canvas, 0, 0);
          }
        } catch {}
      }

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (backupCanvas) {
        // SYNCHRONICZNE ODTWORZENIE! Zero utraty pikseli, zero migotania!
        ctx.drawImage(backupCanvas, 0, 0, backupCanvas.width / dpr, backupCanvas.height / dpr);
        saveCanvasState();
      } else if (savedCanvasDataUrl && savedCanvasDataUrl.length > 50) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
          saveCanvasState();
        };
        img.src = savedCanvasDataUrl;
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
  }, [canvasHeight]);

  // Gdy uczeń przełącza na tablicę, zmienia wysokość lub tryb pełnoekranowy
  useEffect(() => {
    if (activeTab === 'whiteboard' || isFullscreen) {
      const timer = setTimeout(initCanvas, 40);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isFullscreen, canvasHeight]);

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
      ctx.strokeStyle = '#FFB800';
      ctx.lineWidth = 3.5;
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
    let dataUrl = '';
    if (canvas) {
      dataUrl = canvas.toDataURL('image/png');
      if (onSaveCanvasData) {
        onSaveCanvasData(dataUrl);
      }
    }
    // Jeśli pole tekstowe jest puste, zaznacz obecność odpowiedzi odręcznej
    if (!value || !value.trim()) {
      onChangeValue('[Rozwiązanie odręczne na tablicy]');
    }
    onSubmit?.(dataUrl);
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
      // Usuń trailing spację jeśli występuje po komendzie LaTeX
      if (currentVal.endsWith(' ')) {
        currentVal = currentVal.trimEnd();
      }
      if (currentVal.endsWith('\\infty')) {
        onChangeValue(currentVal.slice(0, -6));
      } else if (currentVal.endsWith('\\langle')) {
        onChangeValue(currentVal.slice(0, -7));
      } else if (currentVal.endsWith('\\rangle')) {
        onChangeValue(currentVal.slice(0, -7));
      } else if (currentVal.endsWith(' \\cdot ')) {
        onChangeValue(currentVal.slice(0, -7));
      } else if (currentVal.endsWith('\\sqrt{}')) {
        onChangeValue(currentVal.slice(0, -7));
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

    // Przejście dalej / Wyjście z ułamka / Spacja
    if (keyToken === 'NEXT' || keyToken === 'RIGHT' || keyToken === 'SPACE' || keyToken === '→') {
      if (!currentVal) return;
      if (!currentVal.endsWith(' ')) {
        onChangeValue(currentVal + ' ');
      }
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

    // Inteligentny ułamek (a/b)
    if (keyToken === 'FRAC') {
      if (!currentVal || /[+\-*\/(\⟨=,\s]$/.test(currentVal)) {
        onChangeValue(currentVal + '1/');
        return;
      }
      // Jeśli uczeń wpisał już mianownik (np. 99/5) i klika ponownie a/b, wychodzi z ułamka!
      if (/\/[0-9a-zA-Z^]+$/.test(currentVal)) {
        onChangeValue(currentVal + ' ');
        return;
      }
      if (currentVal.endsWith('/')) {
        return;
      }
      onChangeValue(currentVal + '/');
      return;
    }

    if (keyToken === '÷') {
      if (/\/[0-9a-zA-Z^]+$/.test(currentVal)) {
        onChangeValue(currentVal + ' ÷ ');
        return;
      }
      onChangeValue(currentVal + '/');
      return;
    }

    // Przecinek (dziesiętny lub separator przedziału)
    if (keyToken === ',') {
      if (/\/[0-9a-zA-Z^]+$/.test(currentVal)) {
        // Wyjście z ułamka i wstawienie przecinka przedziału (np. 1/2, )
        onChangeValue(currentVal + ', ');
        return;
      }
      if (currentVal.endsWith(',')) return;
      onChangeValue(currentVal + ',');
      return;
    }

    // Operatory arytmetyczne (+, -, ·, =)
    if (keyToken === '+' || keyToken === '-' || keyToken === '=' || keyToken === '·' || keyToken === '*') {
      const op = keyToken === '·' ? '*' : keyToken;
      if (/\/[0-9a-zA-Z^]+$/.test(currentVal)) {
        // Wyjście z mianownika i kontynuacja wyrażenia na zewnątrz
        onChangeValue(currentVal + ' ' + op + ' ');
        return;
      }
      onChangeValue(currentVal + op);
      return;
    }

    // Zmienna x
    if (keyToken === 'x') {
      if (/\/\d+$/.test(currentVal)) {
        // Jeśli uczeń wpisał mianownik liczbowy (np. 99/5) i klika x, mnoży ułamek z zewnątrz (99/5 x)
        onChangeValue(currentVal + ' x');
        return;
      }
      onChangeValue(currentVal + 'x');
      return;
    }

    if (keyToken === ')') {
      if (/\/[0-9a-zA-Z^]+$/.test(currentVal)) {
        onChangeValue(currentVal + ')');
        return;
      }
      onChangeValue(currentVal + ')');
      return;
    }

    if (keyToken === 'LANGLE' || keyToken === '⟨') {
      onChangeValue(currentVal + '\\langle ');
      return;
    }

    if (keyToken === 'RANGLE' || keyToken === '⟩') {
      onChangeValue(currentVal + '\\rangle ');
      return;
    }

    if (keyToken === 'INFTY' || keyToken === '∞') {
      onChangeValue(currentVal + '\\infty ');
      return;
    }

    // Inteligentne wstawianie do wnętrza \sqrt{}
    if (currentVal.endsWith('\\sqrt{}') && /^[0-9xn]$/.test(keyToken)) {
      onChangeValue(currentVal.slice(0, -1) + keyToken + '}');
      return;
    }

    onChangeValue(currentVal + keyToken);
  };

  // Obsługa fizycznej klawiatury komputera
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEvaluated || activeTab !== 'keyboard') return;
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.key >= '0' && e.key <= '9') {
        handleKeyClick(e.key);
      } else if (e.key === ',' || e.key === '.') {
        handleKeyClick(',');
      } else if (e.key === '+' || e.key === '-') {
        handleKeyClick(e.key);
      } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
        handleKeyClick(e.key.toLowerCase());
      } else if (e.key === '/') {
        handleKeyClick('/');
      } else if (e.key === '(' || e.key === ')') {
        handleKeyClick(e.key);
      } else if (e.key === '[' || e.key === '<') {
        handleKeyClick('⟨');
      } else if (e.key === ']' || e.key === '>') {
        handleKeyClick('⟩');
      } else if (e.key === 'Backspace') {
        handleKeyClick('BACKSPACE');
      } else if (e.key === 'Escape') {
        handleKeyClick('CLEAR');
      } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Tab') {
        e.preventDefault();
        handleKeyClick('NEXT');
      } else if (e.key === 'Enter') {
        if (value && value.trim().length > 0 && onSubmit) {
          e.preventDefault();
          onSubmit();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [value, isEvaluated, activeTab, onSubmit]);

  const formattedMath = formatMathDisplay(value);
  if (mode === 'text') {
    const isEssayTask = Boolean(
      (task?.points >= 30) ||
      (task?.type === 'ESSAY') ||
      (task?.id && String(task.id).includes('essay')) ||
      (typeof task?.question === 'string' && task?.question.toLowerCase().includes('rozprawk'))
    );

    const isSynthesisTask = Boolean(
      (task?.type === 'OPEN_SYNTHESIS') ||
      (task?.points === 3 && (task?.question || '').toLowerCase().includes('notatk')) ||
      (typeof task?.question === 'string' && task?.question.toLowerCase().includes('notatka syntetyzuj'))
    );

    const words = (value || '').trim() ? (value || '').trim().split(/\s+/).filter(Boolean).length : 0;
    const chars = (value || '').length;

    const insertSnippet = (rawSnippet: string) => {
      triggerHaptic('light');
      const snippet = rawSnippet.replace(/\.\.\.$/, ' ');
      if (textRef.current) {
        const el = textRef.current;
        const start = el.selectionStart || 0;
        const end = el.selectionEnd || 0;
        const curr = value || '';
        const needsSpace = start > 0 && !/\s$/.test(curr.slice(0, start));
        const inserted = (needsSpace ? ' ' : '') + snippet;
        const nextVal = curr.slice(0, start) + inserted + curr.slice(end);
        onChangeValue(nextVal);
        setTimeout(() => {
          el.focus();
          const pos = start + inserted.length;
          el.setSelectionRange(pos, pos);
        }, 20);
      } else {
        onChangeValue((value ? value + ' ' : '') + snippet);
      }
    };

    return (
      <div className="w-full flex flex-col gap-3 text-white">
        <div className={`w-full bg-[#0F172A]/95 border transition-all rounded-2xl p-3.5 sm:p-5 shadow-xl flex flex-col gap-3 ${
          isEvaluated
            ? isCorrect
              ? 'border-emerald-500/50 bg-emerald-950/15 shadow-[0_0_25px_rgba(16,185,129,0.15)]'
              : 'border-rose-500/50 bg-rose-950/15 shadow-[0_0_25px_rgba(244,63,94,0.15)]'
            : 'border-slate-700/80 focus-within:border-rose-500/70 focus-within:shadow-[0_0_25px_rgba(244,63,94,0.18)]'
        }`}>
          {/* Header z tytułem i licznikiem słów */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800 flex-wrap gap-2">
            <span className="font-bold text-slate-200 flex items-center gap-2">
              {isEssayTask ? (
                <>
                  <div className="w-5 h-5 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Feather size={12} />
                  </div>
                  <span>Studio Wypracowania CKE (35 pkt):</span>
                </>
              ) : isSynthesisTask ? (
                <>
                  <div className="w-5 h-5 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <BookOpen size={12} />
                  </div>
                  <span>Notatka Syntetyzująca CKE (3 pkt):</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Odpowiedź pisemna (Tutor AI):</span>
                </>
              )}
            </span>

            <span className="text-[11px] text-slate-400 font-mono bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700/50">
              {words} słów • {chars} znaków
            </span>
          </div>

          {/* CKE Wskaźnik Objętości (dla Wypracowania 300+ słów oraz Notatki 60-90 słów) */}
          {isEssayTask && (
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                <span className={`text-[11px] font-bold flex items-center gap-1.5 ${
                  words >= 300 
                    ? 'text-emerald-400' 
                    : words >= 150 
                      ? 'text-amber-400' 
                      : 'text-rose-400'
                }`}>
                  {words >= 300 ? (
                    <>
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                      <span>Wymóg CKE 300+ słów spełniony ({words} słów)</span>
                    </>
                  ) : words >= 150 ? (
                    <>
                      <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                      <span>Poniżej progu 300 słów CKE ({words} / 300 słów – uzupełnij rozwinięcie)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={13} className="text-rose-400 shrink-0" />
                      <span>Zbyt krótka praca (&lt;150 słów). Wymagane min. 300 słów CKE</span>
                    </>
                  )}
                </span>
                <span className="text-[10px] text-slate-400">
                  Próg zaliczenia kompozycji i języka: 300 słów
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className={`h-full transition-all duration-300 rounded-full ${
                    words >= 300 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                      : words >= 150 
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400' 
                        : 'bg-gradient-to-r from-rose-600 to-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(4, Math.round((words / 300) * 100)))}%` }}
                />
              </div>
            </div>
          )}

          {isSynthesisTask && (
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center justify-between text-xs flex-wrap gap-2">
              <span className={`text-[11px] font-bold flex items-center gap-1.5 ${
                words >= 60 && words <= 90
                  ? 'text-emerald-400'
                  : words < 60
                    ? 'text-amber-400'
                    : 'text-rose-400'
              }`}>
                {words >= 60 && words <= 90 ? (
                  <>
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>Idealny limit CKE (60–90 słów): {words} słów</span>
                  </>
                ) : words < 60 ? (
                  <>
                    <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                    <span>Za krótka notatka ({words} / 60 słów – dodaj syntezę obu tekstów)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={13} className="text-rose-400 shrink-0" />
                    <span>Za długa notatka ({words} / 90 słów – skróć tekst, by nie stracić 1 pkt)</span>
                  </>
                )}
              </span>
              <span className="text-[10px] text-slate-400">
                Wymóg CKE: 60–90 słów
              </span>
            </div>
          )}

          {/* Model Kompozycji CKE (Akordeon dla Wypracowania) */}
          {isEssayTask && (
            <div className="rounded-xl border border-white/10 bg-slate-900/60 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowStructureGuide(prev => !prev)}
                className="w-full px-3 py-2 flex items-center justify-between text-left text-xs font-bold text-slate-300 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5 text-rose-300">
                  <BookOpen size={13} />
                  <span>Oficjalny model kompozycji CKE (4 filary sukcesu)</span>
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span>{showStructureGuide ? 'Zwiń' : 'Rozwiń'}</span>
                  {showStructureGuide ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </span>
              </button>
              {showStructureGuide && (
                <div className="p-3 pt-1 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <div className="font-bold text-rose-400 mb-0.5">1. Wstęp z tezą</div>
                    <p className="text-[11px] text-slate-300 leading-tight">Wprowadzenie w problem polecenia + jednoznaczna teza lub hipoteza badawcza.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <div className="font-bold text-rose-400 mb-0.5">2. Rozwinięcie (Lektura)</div>
                    <p className="text-[11px] text-slate-300 leading-tight">Argumentacja TEEL z lektury obowiązkowej (analiza bohatera, bez błędu kardynalnego!).</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <div className="font-bold text-rose-400 mb-0.5">3. Kontekst funkcjonalny (4 pkt)</div>
                    <p className="text-[11px] text-slate-300 leading-tight">Filozoficzny, historyczny, kulturowy lub inny utwór pogłębiający wniosek.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-white/5">
                    <div className="font-bold text-rose-400 mb-0.5">4. Zakończenie (Synteza)</div>
                    <p className="text-[11px] text-slate-300 leading-tight">Uogólnienie wniosków, synteza motywu, brak mechanicznego powtarzania wstępu.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Konektorownik CKE (Pasek szybkiego wstawiania łączników stylu) */}
          <div className="rounded-xl border border-white/10 bg-slate-900/80 overflow-hidden">
            <div className="px-3 py-2 flex items-center justify-between border-b border-white/5">
              <button
                type="button"
                onClick={() => setShowConnectorStudio(prev => !prev)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
              >
                <Feather size={13} className="text-amber-400" />
                <span>Konektorownik CKE (Szybkie zwroty stylu dojrzałego)</span>
                {showConnectorStudio ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                Kliknij zwrot, aby wstawić w miejscu kursora
              </span>
            </div>

            {showConnectorStudio && (
              <div className="p-2.5 space-y-2">
                {/* Zakładki kategorii konektorów */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                  {ESSAY_CONNECTORS.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveConnectorTab(cat.id)}
                      className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-colors cursor-pointer ${
                        activeConnectorTab === cat.id
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Chipy ze zwrotami */}
                <div className="flex flex-wrap gap-1.5">
                  {ESSAY_CONNECTORS.find(c => c.id === activeConnectorTab)?.chips.map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      disabled={isEvaluated}
                      onClick={() => insertSnippet(chip)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700/60 hover:border-amber-400/60 hover:text-white hover:bg-slate-700/80 transition-all cursor-pointer text-left active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pole tekstowe edycji wypracowania / odpowiedzi */}
          <textarea
            ref={textRef}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            disabled={isEvaluated}
            placeholder={inputPlaceholder || (isEssayTask 
              ? "Napisz swoje wypracowanie maturalne (min. 300 słów). Sformułuj wstęp z tezą, rozwinięcie z argumentacją TEEL z lektury obowiązkowej, funkcjonalny kontekst oraz syntezę w zakończeniu..."
              : isSynthesisTask
                ? "Sformułuj zwięzłą notatkę syntetyzującą (60–90 słów) na podstawie obu tekstów..."
                : "Sformułuj swoją odpowiedź, uzasadnienie lub argument na podstawie załączonego tekstu lub znajomości lektury...")}
            rows={isEssayTask ? 12 : (isSynthesisTask ? 6 : 5)}
            className={`w-full bg-slate-950/70 border border-white/5 rounded-xl p-3.5 text-slate-100 placeholder:text-slate-500 text-sm sm:text-base leading-relaxed resize-y outline-none font-normal ${
              isEssayTask ? 'min-h-[260px]' : (isSynthesisTask ? 'min-h-[140px]' : 'min-h-[120px]')
            }`}
          />

          {/* Pasek narzędziowy pod polem */}
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span>Wskazówka:</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Enter</kbd>
              <span>zatwierdza odpowiedź</span>
            </div>
            {value.trim().length > 0 && !isEvaluated && (
              <button
                type="button"
                onClick={() => onChangeValue('')}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw size={13} />
                <span>Wyczyść pole</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-[#070A0F] flex flex-col p-3 sm:p-5 text-white select-none overflow-hidden" : "w-full flex flex-col justify-end items-stretch gap-2.5"}>
      {/* ------------------------------------------------------------------ */}
      {/* 1. ELEGANCKI PRZEŁĄCZNIK SEGMENTOWY (TOGGLE) ORAZ BELKA PEŁNEGO EKRANU */}
      {/* ------------------------------------------------------------------ */}
      {isFullscreen ? (
        <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-[#0B0F19]/95 border border-white/10 shrink-0 mb-2 shadow-2xl">
          <div className="flex items-center gap-1.5 bg-[#141C28] p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setActiveTab('keyboard');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'keyboard'
                  ? 'bg-[#FFB800] text-[#080B11] font-bold shadow-[0_0_12px_rgba(255,184,0,0.35)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Keyboard size={14} />
              <span>Klawiatura</span>
            </button>
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setActiveTab('whiteboard');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'whiteboard'
                  ? 'bg-[#FFB800] text-[#080B11] font-bold shadow-[0_0_12px_rgba(255,184,0,0.35)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PenTool size={14} />
              <span>Tablica</span>
              {hasCanvasStrokes && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] shrink-0" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setIsFullscreen(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Minimalizuj / Zakończ rysowanie"
            >
              <Minimize2 size={15} />
              <span className="hidden sm:inline">Minimalizuj</span>
            </button>

            <button
              type="button"
              id="fullscreen-submit-answer-btn"
              disabled={isEvaluated || (!hasCanvasStrokes && !value)}
              onClick={() => {
                triggerHaptic('medium');
                if (activeTab === 'whiteboard') {
                  handleSubmitFromBoard();
                } else if (onSubmit) {
                  onSubmit();
                }
                setIsFullscreen(false);
              }}
              className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Check size={16} strokeWidth={2.5} />
              <span>Wyślij do sprawdzenia</span>
            </button>
          </div>
        </div>
      ) : !hideWhiteboard ? (
        <div className="flex items-center justify-between bg-[#0B0F19] p-1 rounded-2xl border border-white/10 w-full shrink-0 shadow-lg">
          <div className="flex-1 flex items-center">
            <button
              type="button"
              id="toggle-math-keyboard-mode"
              onClick={() => {
                triggerHaptic('light');
                setActiveTab('keyboard');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'keyboard'
                  ? 'bg-[#FFB800] text-[#080B11] font-bold shadow-[0_0_16px_rgba(255,184,0,0.35)]'
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
                  ? 'bg-[#FFB800] text-[#080B11] font-bold shadow-[0_0_16px_rgba(255,184,0,0.35)]'
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

          {/* Przycisk powiększenia widoczny WYŁĄCZNIE dla Tablicy (dla klawiatury bez sensu) */}
          {activeTab === 'whiteboard' && (
            <button
              type="button"
              onClick={() => {
                triggerHaptic('medium');
                setIsFullscreen(true);
              }}
              className="p-2 rounded-xl text-[#FFB800] hover:text-white bg-[#141C28] hover:bg-[#FFB800]/20 border border-white/10 transition-all cursor-pointer shrink-0 ml-1.5 shadow-sm flex items-center gap-1.5 text-xs font-bold"
              title="Rozwiń na pełny ekran"
            >
              <Maximize2 size={15} />
              <span className="hidden sm:inline">Rozwiń</span>
            </button>
          )}
        </div>
      ) : null}

      {/* ================================================================== */}
      {/* TRYB A: INTUICYJNA KLAWIATURA MATEMATYCZNA                          */}
      {/* ================================================================== */}
      <div className={`w-full flex flex-col gap-2 shrink-0 ${activeTab === 'keyboard' ? 'block' : 'hidden'}`}>
        {/* Pole odpowiedzi z podglądem matematycznym na żywo w notacji KaTeX */}
        <div className="w-full bg-[#121824] border border-white/10 focus-within:border-[#FFB800]/80 focus-within:shadow-[0_0_20px_rgba(255,184,0,0.2)] rounded-2xl p-3 sm:p-4 shadow-md flex items-center justify-between gap-2.5 transition-all shrink-0">
          <div className="flex-1 min-w-0 flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Twoja odpowiedź:
            </span>
            <div className="w-full overflow-x-auto no-scrollbar py-0.5 min-h-[36px] flex items-center text-left">
              {formattedMath ? (
                <div className="flex items-center text-left">
                  <span className="text-white font-black text-lg sm:text-2xl tracking-wide">
                    <InlineMath math={formattedMath} />
                  </span>
                  {!isEvaluated && (
                    <span className="inline-block w-0.5 h-6 bg-[#FFB800] ml-1.5 animate-pulse rounded-full" />
                  )}
                </div>
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
          {/* Rząd 1 (Symbole algebraiczne i przedziały - 10 kolumn): x, x², xⁿ, √, a/b, (, ), ⟨, ⟩, ∞ */}
          <div className="grid grid-cols-10 gap-1 sm:gap-1.5 w-full">
            <button
              type="button"
              onClick={() => handleKeyClick('x')}
              className="h-10 sm:h-11 min-w-0 px-0.5 sm:px-1 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-amber-300 italic font-black text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Zmienna x"
            >
              x
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('POW2')}
              className="h-10 sm:h-11 min-w-0 px-0.5 sm:px-1 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-[#FFB800] font-black text-xs sm:text-sm flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Potęga kwadratowa (x²)"
            >
              x²
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('POW')}
              className="h-10 sm:h-11 min-w-0 px-0.5 sm:px-1 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-[#FFB800] font-black text-xs sm:text-sm flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Potęga dowolna (xⁿ)"
            >
              xⁿ
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('SQRT')}
              className="h-10 sm:h-11 min-w-0 px-0.5 sm:px-1 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-[#FFB800] font-black text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Pierwiastek (√)"
            >
              √
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('FRAC')}
              className="h-10 sm:h-11 min-w-0 px-0.5 sm:px-1 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-[#FFB800] font-black text-xs sm:text-sm flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Ułamek zwykły"
            >
              <span className="flex flex-col items-center justify-center leading-none">
                <span className="text-[11px] font-bold">a</span>
                <span className="w-3.5 h-[1.5px] bg-[#FFB800] my-0.5 rounded-full" />
                <span className="text-[11px] font-bold">b</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('(')}
              className="h-10 sm:h-11 min-w-0 px-0.5 sm:px-1 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-white font-bold text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Nawias otwierający ("
            >
              (
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick(')')}
              className="h-10 sm:h-11 min-w-0 px-0.5 sm:px-1 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-white font-bold text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Nawias zamykający )"
            >
              )
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('⟨')}
              className="h-10 sm:h-11 min-w-0 px-0.5 sm:px-1 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-amber-300 font-black text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Przedział domknięty lewostronnie ⟨"
            >
              ⟨
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('⟩')}
              className="h-10 sm:h-11 min-w-0 px-0.5 sm:px-1 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-amber-300 font-black text-sm sm:text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Przedział domknięty prawostronnie ⟩"
            >
              ⟩
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('∞')}
              className="h-10 sm:h-11 min-w-0 px-0.5 sm:px-1 rounded-xl bg-[#1A2332] hover:bg-[#223044] border border-white/10 text-[#FFB800] font-black text-base flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Nieskończoność (∞)"
            >
              ∞
            </button>
          </div>

          {/* Rząd 2 (Liczby i operatory - 6 kolumn): 7, 8, 9, ÷, ·, - */}
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
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-[#FFB800] font-black text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Znak dzielenia (÷)"
            >
              ÷
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('·')}
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-[#FFB800] font-black text-xl flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Znak mnożenia (·)"
            >
              ·
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('-')}
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-[#FFB800] font-black text-xl flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Znak minus (-)"
            >
              −
            </button>
          </div>

          {/* Rząd 3 (Liczby i operatory - 6 kolumn): 4, 5, 6, +, ,, = */}
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
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-[#FFB800] font-black text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
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
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 text-[#FFB800] font-black text-lg flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Znak równości (=)"
            >
              =
            </button>
          </div>

          {/* Rząd 4 (Liczby i edycja - 6 kolumn): 1, 2, 3, 0, ⌫ (Backspace), C (Wyczyść) */}
          <div className="grid grid-cols-6 gap-1 sm:gap-1.5 w-full">
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
              onClick={() => handleKeyClick('NEXT')}
              className="h-10 sm:h-11 rounded-xl bg-[#1E293B] hover:bg-[#27354D] border border-white/10 hover:border-[#FFB800]/50 text-[#FFB800] font-bold flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer"
              title="Przejdź dalej / Wyjdź z ułamka (→ / Spacja)"
            >
              <ArrowRight size={18} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* TRYB B: ROZWIJALNA CYFROWA TABLICA DO PISANIA (EXPANDABLE CANVAS)    */}
      {/* ================================================================== */}
      <div className={`w-full flex flex-col gap-2 ${isFullscreen ? 'flex-1 overflow-hidden' : 'shrink-0'} ${activeTab === 'whiteboard' ? 'flex' : 'hidden'}`}>
        <div className={`w-full bg-[#0B101B] border border-white/15 rounded-2xl p-2.5 sm:p-3 flex flex-col gap-2.5 shadow-xl ${isFullscreen ? 'flex-1 overflow-hidden justify-between' : ''}`}>
          {/* PASEK NARZĘDZI NA GÓRZE TABLICY */}
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
                    ? 'bg-[#FFB800] text-[#080B11] font-bold shadow-[0_0_12px_rgba(255,184,0,0.35)]'
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

            {/* Narzędzia historii, skoku i rozszerzania */}
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

              {/* Szybka nawigacja góra/dół przy długim arkuszu */}
              {canvasHeight > 440 && (
                <div className="flex items-center gap-0.5 bg-[#141C28] p-0.5 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={handleScrollToTop}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Przewiń na początek arkusza"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleScrollToBottom}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Przewiń na dół arkusza"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>
              )}

              {/* Przycisk rozszerzenia arkusza w belce */}
              <button
                type="button"
                onClick={handleExpandCanvas}
                className="px-2.5 py-1.5 rounded-xl text-[#FFB800] hover:text-amber-300 bg-[#FFB800]/10 hover:bg-[#FFB800]/20 border border-[#FFB800]/30 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                title="Dodaj 350px miejsca na obliczenia w dół"
              >
                <Plus size={14} />
                <span className="hidden sm:inline">+350px</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  triggerHaptic('light');
                  if (onOpenScratchpad && !isFullscreen) {
                    onOpenScratchpad();
                  } else {
                    setIsFullscreen(prev => !prev);
                  }
                }}
                className="p-1.5 rounded-xl text-[#FFB800] hover:text-white bg-[#FFB800]/10 hover:bg-[#FFB800]/20 border border-[#FFB800]/20 transition-colors cursor-pointer"
                title={isFullscreen ? "Minimalizuj" : "Powiększ na pełny ekran"}
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
            </div>
          </div>

          {/* OBSZAR ROBOCZY: PRZEWIJALNY VIEWPORT Z ROZSZERZALNYM ARKUSZEM */}
          <div 
            ref={scrollViewportRef}
            className={`w-full rounded-xl border border-white/15 relative overflow-y-auto overflow-x-hidden ${
              isFullscreen ? 'flex-1 min-h-[380px]' : 'h-[360px] sm:h-[420px]'
            }`}
            style={{
              backgroundColor: '#070B12',
              overscrollBehavior: 'contain',
              scrollBehavior: 'smooth'
            }}
          >
            {/* KONTENER CANVASU O DYNAMICZNEJ WYSOKOŚCI */}
            <div
              ref={canvasContainerRef}
              className="w-full relative touch-none"
              style={{
                height: `${canvasHeight}px`,
                minHeight: `${canvasHeight}px`,
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
                  <span>Arkusz roboczy CKE • Kratka 0,5 cm</span>
                  <span className="text-[11px] text-slate-500/30">Pisz palcem, rysikiem lub myszką • Przewijaj w dół i rozwijaj bez limitu</span>
                </div>
              )}

              {/* DYNAMICZNY PRZYCISK ROZSZERZENIA NA DOLE ARKUSZA */}
              <div className="sticky bottom-2 inset-x-0 flex justify-center pointer-events-none z-10 px-4 py-1">
                <button
                  type="button"
                  onClick={handleExpandCanvas}
                  className="pointer-events-auto px-4 py-2 rounded-full bg-[#111827]/95 hover:bg-[#1F2937] border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-amber-200 text-xs font-bold flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md active:scale-95 transition-all cursor-pointer group"
                >
                  <Plus size={14} className="text-amber-400 group-hover:rotate-90 transition-transform duration-200" />
                  <span>Rozwiń arkusz w dół (+350px)</span>
                  <ArrowDown size={13} className="text-amber-400 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* PRZYCISK ZATWIERDZENIA Z TABLICY */}
          <button
            type="button"
            id="whiteboard-submit-answer-btn"
            disabled={isEvaluated || (!hasCanvasStrokes && !value)}
            onClick={() => {
              handleSubmitFromBoard();
              if (isFullscreen) setIsFullscreen(false);
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
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
