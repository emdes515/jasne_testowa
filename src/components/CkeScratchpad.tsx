import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft,
  PenTool, 
  Eraser, 
  Trash2, 
  Undo2,
  Plus,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { triggerHaptic } from '../utils';

interface CkeScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
  savedDataUrl?: string;
  onSaveData?: (dataUrl: string) => void;
  isOpenProof?: boolean;
  taskQuestion?: string;
  taskInstruction?: string;
  staticHint?: string;
  studentText?: string;
}

export function CkeScratchpad({
  isOpen,
  onClose,
  savedDataUrl = '',
  onSaveData,
}: CkeScratchpadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const [canvasHeight, setCanvasHeight] = useState<number>(() => Math.max(window.innerHeight - 60, 650));
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [penColor] = useState<string>('#FFB800');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // History stack for Undo
  const historyRef = useRef<ImageData[]>([]);
  const historyIndexRef = useRef<number>(-1);

  // Rozszerzenie arkusza brudnopisu w dół (+450px)
  const handleExpandCanvas = () => {
    triggerHaptic('medium');
    setCanvasHeight(prev => Math.min(prev + 450, 4500));
    setTimeout(() => {
      if (scrollViewportRef.current) {
        scrollViewportRef.current.scrollTo({
          top: scrollViewportRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 60);
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

  // Close and commit state
  const handleClose = () => {
    triggerHaptic('medium');
    const canvas = canvasRef.current;
    if (canvas && onSaveData) {
      try {
        onSaveData(canvas.toDataURL('image/png'));
      } catch {
        // ignore
      }
    }
    onClose();
  };

  // Keyboard Escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Initialize canvas with dynamic height and lossless buffer retention
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width || window.innerWidth || 380;
      const height = canvasHeight;

      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        let backupCanvas: HTMLCanvasElement | null = null;
        if (canvas.width > 0 && canvas.height > 0) {
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
          ctx.drawImage(backupCanvas, 0, 0, backupCanvas.width / dpr, backupCanvas.height / dpr);
          saveState();
        } else if (savedDataUrl && savedDataUrl.length > 50) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            saveState();
          };
          img.src = savedDataUrl;
        } else {
          saveState();
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen, canvasHeight]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
      historyRef.current.push(imgData);
      if (historyRef.current.length > 25) {
        historyRef.current.shift();
      }
      historyIndexRef.current = historyRef.current.length - 1;

      if (onSaveData) {
        onSaveData(canvas.toDataURL('image/png'));
      }
    } catch {
      // ignore
    }
  };

  const handleUndo = () => {
    if (historyIndexRef.current <= 0) return;
    triggerHaptic('light');
    historyIndexRef.current -= 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.putImageData(historyRef.current[historyIndexRef.current], 0, 0);

    if (onSaveData) {
      onSaveData(canvas.toDataURL('image/png'));
    }
  };

  const handleClear = () => {
    triggerHaptic('medium');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
    if (onSaveData) {
      onSaveData('');
    }
  };

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 30;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 2.5;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
    setIsDrawing(false);
    saveState();
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-[999999] bg-surface-bg flex flex-col justify-between items-stretch overflow-hidden select-none"
        style={{ touchAction: 'none' }}
      >
        {/* HEADER TOOLBAR: ALWAYS PINNED TO THE VERY TOP WITH HIGHEST Z-INDEX */}
        <header className="shrink-0 px-3 py-2.5 bg-surface-elevated border-b border-surface-border flex items-center justify-between gap-2 z-50 shadow-2xl">
          {/* Left: Prominent EXIT BUTTON */}
          <button
            type="button"
            onClick={handleClose}
            className="bg-primary hover:bg-[#FFC72C] border-b-2 border-primary-hover text-[#070A0F] font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,184,0,0.35)] active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <ArrowLeft size={17} className="stroke-[3]" />
            <span>← Wróć do zadania</span>
          </button>

          {/* Middle: Tool selector (Pen vs Eraser) */}
          <div className="flex items-center bg-surface-card border border-surface-border rounded-xl p-1 gap-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setTool('pen');
              }}
              className={`py-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                tool === 'pen'
                  ? 'bg-primary text-[#070A0F] font-bold shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <PenTool size={13} />
              <span className="hidden sm:inline">Ołówek</span>
            </button>

            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setTool('eraser');
              }}
              className={`py-1.5 px-2.5 sm:px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                tool === 'eraser'
                  ? 'bg-rose-500 text-white font-black shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Eraser size={13} />
              <span className="hidden sm:inline">Gumka</span>
            </button>
          </div>

          {/* Szybka nawigacja i rozszerzanie arkusza brudnopisu */}
          <div className="flex items-center gap-1 shrink-0">
            {canvasHeight > 700 && (
              <div className="flex items-center gap-0.5 bg-surface-card p-0.5 rounded-xl border border-surface-border">
                <button
                  type="button"
                  onClick={handleScrollToTop}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Przewiń na górę brudnopisu"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleScrollToBottom}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Przewiń na dół brudnopisu"
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleExpandCanvas}
              className="px-2.5 py-1.5 rounded-xl text-[#FFB800] hover:text-amber-300 bg-[#FFB800]/10 hover:bg-[#FFB800]/20 border border-[#FFB800]/30 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="Dodaj 450px miejsca na obliczenia w dół"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">+450px</span>
            </button>

            {/* Right side: Undo & Clear buttons */}
            <button
              type="button"
              onClick={handleUndo}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#141C28] hover:bg-white/10 text-white/90 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-xs font-bold active:scale-95 cursor-pointer"
              title="Cofnij ostatnie pociągnięcie"
            >
              <Undo2 size={15} />
              <span className="text-[11px] sm:text-xs">Cofnij ↺</span>
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/30 transition-colors flex items-center gap-1 text-xs font-bold active:scale-95 cursor-pointer"
              title="Wyczyść całą tablicę"
            >
              <Trash2 size={15} />
              <span className="text-[11px] sm:text-xs">Wyczyść</span>
            </button>
          </div>
        </header>

        {/* PRZEWIJALNY VIEWPORT Z ROZSZERZALNYM BRUDNOPISEM */}
        <div
          ref={scrollViewportRef}
          className="flex-1 w-full h-full relative overflow-y-auto overflow-x-hidden select-none"
          style={{
            backgroundColor: '#070B12',
            overscrollBehavior: 'contain',
            scrollBehavior: 'smooth'
          }}
        >
          <div
            ref={containerRef}
            className="w-full relative touch-none"
            style={{
              height: `${canvasHeight}px`,
              minHeight: `${canvasHeight}px`,
              backgroundColor: '#070B12',
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px'
            }}
          >
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="w-full h-full cursor-crosshair block"
            />

            {/* DYNAMICZNY PRZYCISK ROZSZERZENIA BRUDNOPISU NA DOLE */}
            <div className="sticky bottom-4 inset-x-0 flex justify-center pointer-events-none z-10 px-4">
              <button
                type="button"
                onClick={handleExpandCanvas}
                className="pointer-events-auto px-5 py-2.5 rounded-full bg-[#111827]/95 hover:bg-[#1F2937] border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-amber-200 text-xs font-bold flex items-center gap-2 shadow-[0_6px_25px_rgba(0,0,0,0.7)] backdrop-blur-md active:scale-95 transition-all cursor-pointer group"
              >
                <Plus size={15} className="text-amber-400 group-hover:rotate-90 transition-transform duration-200" />
                <span>Rozwiń brudnopis w dół (+450px)</span>
                <ArrowDown size={14} className="text-amber-400 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export default CkeScratchpad;
