import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * Normalizes LaTeX math strings safely:
 * - Strips outer delimiter dollars ($$ or $) or brackets
 * - Cleans leading/trailing backslash spaces (e.g. "\ a" -> "a") without touching commands like \sqrt or \pi
 * - Formats Polish decimal comma (e.g. 0,3 -> 0{,}3) using function replacer to prevent $ substitution bugs
 * - Escapes unescaped percent signs (\%) so KaTeX does not treat them as comments
 * - Standardizes common operators (* -> \cdot, <= -> \le, >= -> \ge, != -> \neq, => -> \implies)
 */
export function cleanLatex(mathStr: string): string {
  if (!mathStr) return '';
  let s = mathStr.trim();

  // Strip outer delimiters
  if (s.startsWith('$$') && s.endsWith('$$') && s.length >= 4) {
    s = s.slice(2, -2).trim();
  } else if (s.startsWith('$') && s.endsWith('$') && s.length >= 2) {
    s = s.slice(1, -1).trim();
  } else if (s.startsWith('\\[') && s.endsWith('\\]') && s.length >= 4) {
    s = s.slice(2, -2).trim();
  } else if (s.startsWith('\\(') && s.endsWith('\\)') && s.length >= 4) {
    s = s.slice(2, -2).trim();
  }

  // Remove leading and trailing backslash spaces (e.g., "\ a^x \"), but NOT commands like \sqrt or \pi!
  s = s.replace(/^\\\s+/, '').replace(/\\\s+$/, '').trim();

  // Polish decimal comma in math mode (0,3 -> 0{,}3)
  s = s.replace(/(\d+),(\d+)/g, (_match, d1, d2) => `${d1}{,}${d2}`);

  // Escape unescaped % (in LaTeX % is comment, which causes formula truncation in KaTeX)
  s = s.replace(/(?<!\\)%/g, '\\%');

  // Replace standalone * with \cdot
  s = s.replace(/(?<!\\)\*/g, '\\cdot ');

  // Standard math operators
  s = s.replace(/<=/g, '\\le ');
  s = s.replace(/>=/g, '\\ge ');
  s = s.replace(/=\/=/g, '\\neq ');
  s = s.replace(/!=/g, '\\neq ');
  s = s.replace(/<=>/g, '\\iff ');
  s = s.replace(/=>/g, '\\implies ');
  s = s.replace(/\+-/g, '\\pm ');

  // Clean empty or redundant double-spaces
  s = s.replace(/\s+/g, ' ').trim();

  return s;
}

// Renders text segments supporting markdown **bold** and newlines
function renderFormattedText(textChunk: string, keyPrefix: string): React.ReactNode {
  if (!textChunk) return null;
  const lines = textChunk.split('\n');

  return (
    <React.Fragment key={keyPrefix}>
      {lines.map((line, lineIdx) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <React.Fragment key={`${keyPrefix}-l-${lineIdx}`}>
            {lineIdx > 0 && <br />}
            {parts.map((p, pIdx) => {
              if (p.startsWith('**') && p.endsWith('**') && p.length >= 4) {
                return (
                  <strong key={`${keyPrefix}-b-${pIdx}`} className="font-bold text-white">
                    {p.slice(2, -2)}
                  </strong>
                );
              }
              return <span key={`${keyPrefix}-t-${pIdx}`}>{p}</span>;
            })}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

interface MathRendererProps {
  content?: string | any;
  text?: string | any; // backwards compatibility alias for content
  className?: string;
  displayMode?: boolean;
}

const MATH_SPLIT_REGEX = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\begin\{cases\}[\s\S]*?\\end\{cases\}|\$[^\$]+?\$|\\\([^\n]*?\\\))/g;

const MathRendererComponent: React.FC<MathRendererProps> = ({
  content, 
  text, 
  className = '',
  displayMode = false
}) => {
  const input = content ?? text;
  if (input === null || input === undefined) return null;

  // If input is an array of formulas or lines, render each item separately with MathRenderer
  if (Array.isArray(input)) {
    const validItems = input.filter(item => item !== null && item !== undefined && String(item).trim().length > 0);
    if (validItems.length === 0) return null;

    return (
      <div className={`flex flex-col items-center justify-center gap-2 w-full max-w-full ${className}`}>
        {validItems.map((item, idx) => (
          <MathRenderer 
            key={idx} 
            content={item} 
            displayMode={displayMode} 
          />
        ))}
      </div>
    );
  }

  let rawInput = '';
  if (typeof input === 'string') {
    rawInput = input;
  } else if (typeof input === 'number' || typeof input === 'boolean') {
    rawInput = String(input);
  } else if (typeof input === 'object') {
    if ('latex' in input && typeof input.latex === 'string') {
      rawInput = input.latex;
    } else if ('text' in input && typeof input.text === 'string') {
      rawInput = input.text;
    } else if ('description' in input && typeof input.description === 'string') {
      rawInput = input.description;
    } else {
      try {
        rawInput = JSON.stringify(input);
      } catch {
        rawInput = String(input);
      }
    }
  } else {
    rawInput = String(input);
  }

  if (!rawInput || !rawInput.trim()) return null;

  // Normalizacja powielonych znaków dolara (np. $$$$ -> $$) bez ucinania spacji na krańcach tekstu
  const rawContent = rawInput.replace(/\${3,}/g, '$$');

  // Funkcja pomocnicza do parsowania tekstu mieszanego z $...$ lub $$...$$
  const renderMixedParts = (str: string, extraClass: string = '') => {
    // Splits by $$...$$, \[...\], \begin{cases}...\end{cases}, $...$, \(...\)
    const parts = str.split(MATH_SPLIT_REGEX);
    return (
      <span className={`break-words max-w-full leading-relaxed inline ${extraClass}`}>
        {parts.map((part, index) => {
          if (!part) return null;

          const trimmed = part.trim();
          const isDisplayMath = 
            (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length >= 4) ||
            (trimmed.startsWith('\\[') && trimmed.endsWith('\\]') && trimmed.length >= 4) ||
            (trimmed.startsWith('\\begin{cases}') && trimmed.endsWith('\\end{cases}'));

          const isInlineMath = 
            (trimmed.startsWith('$') && trimmed.endsWith('$') && trimmed.length >= 2) ||
            (trimmed.startsWith('\\(') && trimmed.endsWith('\\)') && trimmed.length >= 4);

          if (isDisplayMath) {
            const math = cleanLatex(trimmed);
            return (
              <span 
                key={index} 
                className="block my-2 w-full max-w-full flex flex-col items-center justify-center overflow-x-auto overflow-y-hidden py-1.5 px-2 text-center touch-pan-x"
              >
                <span className="mx-auto flex flex-col items-center justify-center text-center max-w-full box-border">
                  <BlockMath 
                    math={math} 
                    renderError={() => (
                      <span className="font-medium text-cyan-300">
                        {math}
                      </span>
                    )}
                  />
                </span>
              </span>
            );
          } else if (isInlineMath) {
            const math = cleanLatex(trimmed);
            return (
              <span key={index} className="inline align-baseline mx-0.5 font-normal">
                <InlineMath 
                  math={math} 
                  renderError={() => (
                    <span className="font-medium text-cyan-300">
                      {math}
                    </span>
                  )}
                />
              </span>
            );
          }

          return renderFormattedText(part, `txt-${index}`);
        })}
      </span>
    );
  };

  const trimmedForBlockCheck = rawContent.trim();
  const hasInlineDelimiters = trimmedForBlockCheck.includes('$');
  const hasPolishLetters = /[ąćęłńóśźż]/i.test(trimmedForBlockCheck);

  // Czysty blok LaTeX: displayMode lub \begin{...} lub $$...$$, ale TYLKO wtedy, gdy nie jest to tekst mieszany z $
  const isPureLatexBlock = 
    !hasInlineDelimiters && 
    !hasPolishLetters && 
    (
      displayMode || 
      trimmedForBlockCheck.startsWith('\\begin{') || 
      (trimmedForBlockCheck.startsWith('$$') && trimmedForBlockCheck.endsWith('$$') && !trimmedForBlockCheck.slice(2, -2).includes('$$'))
    );

  if (isPureLatexBlock) {
    const cleanMath = cleanLatex(trimmedForBlockCheck);
    return (
      <div className={`my-2 w-full max-w-full flex flex-col items-center justify-center overflow-x-auto overflow-y-hidden py-1 px-2 text-center touch-pan-x text-white ${className}`}>
        <div className="mx-auto flex flex-col items-center justify-center text-center max-w-full box-border">
          <BlockMath 
            math={cleanMath} 
            renderError={() => renderMixedParts(trimmedForBlockCheck, className)}
          />
        </div>
      </div>
    );
  }

  // Domyślnie parsujemy jako tekst mieszany (LaTeX z $ lub $$ oraz zwykły tekst)
  return renderMixedParts(rawContent, className);
};

export const MathRenderer = React.memo(MathRendererComponent);

export default MathRenderer;
