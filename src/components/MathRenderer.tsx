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

  // Fix corrupted form-feed/triangle artifacts and control characters (e.g. \f -> 0x0C, \r -> 0x0D, \b -> 0x08, \t -> 0x09)
  s = s
    .replace(/(?:\\x0c|\x0c|\f|\\?▲|\u25B2)\s*rac/g, '\\frac')
    .replace(/(?:\\x0d|\x0d|\r)\s*angle/g, '\\rangle')
    .replace(/(?:\\x0d|\x0d|\r)\s*ight/g, '\\right')
    .replace(/(?:\\x0d|\x0d|\r)\s*ho/g, '\\rho')
    .replace(/(?:\\x0d|\x0d|\r)\s*oot/g, '\\root')
    .replace(/(?:\\x08|\x08)\s*egin/g, '\\begin')
    .replace(/(?:\\x08|\x08)\s*ullet/g, '\\bullet')
    .replace(/(?:\\x08|\x08)\s*eta/g, '\\beta')
    .replace(/(?:\\x09|\x09|\t)\s*imes/g, '\\times')
    .replace(/(?:\\x09|\x09|\t)\s*heta/g, '\\theta')
    .replace(/(?:\\x09|\x09|\t)\s*ext/g, '\\text')
    .replace(/(?:\\x09|\x09|\t)\s*an/g, '\\tan')
    .replace(/(?:\\x09|\x09|\t)\s*au/g, '\\tau')
    .replace(/(?:\\x0a|\x0a|\n)\s*eq/g, '\\neq')
    .replace(/(?:\\x0c|\x0c)/g, '')
    .replace(/(?<=[,\s\d\-+])angle(?=[\s\)\],.;$]|\b)/g, '\\rangle');

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
  s = s.replace(/^\\\s+/, '').replace(/\\(\s+)?$/, '').trim();

  // Polish decimal comma in math mode (0,3 -> 0{,}3)
  s = s.replace(/(\d+),(\d+)/g, (_match, d1, d2) => `${d1}{,}${d2}`);

  // Escape unescaped % (in LaTeX % is comment, which causes formula truncation in KaTeX)
  s = s.replace(/(?<!\\)%/g, '\\%');

  // Replace standalone * or middle dot · with \cdot
  s = s.replace(/(?<!\\)[\*·]/g, ' \\cdot ');

  // Standard math operators - longer multi-char patterns matched before substrings
  s = s.replace(/<=>/g, '\\iff ');
  s = s.replace(/=>/g, '\\implies ');
  s = s.replace(/<=/g, '\\le ');
  s = s.replace(/>=/g, '\\ge ');
  s = s.replace(/=\/=/g, '\\neq ');
  s = s.replace(/!=/g, '\\neq ');
  s = s.replace(/\+-/g, '\\pm ');

  // Convert slash-notated fractions (e.g. 8/15 -> \frac{8}{15}, (8 \cdot 5)/(15 \cdot 4) -> \frac{8 \cdot 5}{15 \cdot 4})
  s = convertSlashFractions(s);

  // Clean empty or redundant double-spaces
  s = s.replace(/\s+/g, ' ').trim();

  return s;
}

/**
 * Converts inline slash-notated fractions (e.g. 8/15, (8*5)/(15*4), 2 1/3, \sqrt{2}/2, a/b)
 * into proper LaTeX vertical fractions (\frac{...}{...}) for KaTeX rendering.
 */
export function convertSlashFractions(mathStr: string): string {
  if (!mathStr || typeof mathStr !== 'string') return '';
  let s = mathStr;

  // 1. Protect \text{...} blocks from slash replacement (e.g. \text{km/h})
  const textBlocks: string[] = [];
  s = s.replace(/\\text\{[^{}]*\}/g, (m) => {
    textBlocks.push(m);
    return `___TEXT_BLOCK_${textBlocks.length - 1}___`;
  });

  // 2. Mixed numbers: e.g. '2 1/3' -> '2\frac{1}{3}', '-1 2/5' -> '-1\frac{2}{5}'
  s = s.replace(/(^|[\s=+\-(<*·]|\\cdot\s*|\\pm\s*)([+-]?\d+)\s+(\d+)\/(\d+)(?=[\s=+\-),.;$*·]|\\cdot|\\pm|$)/g, (_m, pre, whole, num, den) => {
    return `${pre}${whole}\\frac{${num}}{${den}}`;
  });

  // 3. (expr) / (expr) -> \frac{expr}{expr} (e.g. (8 \cdot 5)/(15 \cdot 4) -> \frac{8 \cdot 5}{15 \cdot 4})
  s = s.replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g, (_m, num, den) => {
    return `\\frac{${num.trim()}}{${den.trim()}}`;
  });

  // 4. (expr) / term -> \frac{expr}{term} (e.g. (x+1)/2 -> \frac{x+1}{2})
  s = s.replace(/\(([^()]+)\)\s*\/\s*([+-]?(?!(?:\\frac\b))(?:\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^[\]]*\])*|[a-zA-Z0-9^_{}]+))/g, (_m, num, den) => {
    return `\\frac{${num.trim()}}{${den.trim()}}`;
  });

  // 5. term / (expr) -> \frac{term}{expr} (e.g. 1/(x-1) -> \frac{1}{x-1})
  s = s.replace(/(^|[\s=+\-(<*·]|\\cdot\s*|\\pm\s*)([+-]?(?!(?:\\frac\b))(?:\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^[\]]*\])*|[a-zA-Z0-9^_{}]+))\s*\/\s*\(([^()]+)\)/g, (_m, pre, num, den) => {
    return `${pre}\\frac{${num.trim()}}{${den.trim()}}`;
  });

  // 6. Simple tokens: term / term -> \frac{term}{term}
  // (e.g. 8/15 -> \frac{8}{15}, \sqrt{2}/2 -> \frac{\sqrt{2}}{2}, a/b -> \frac{a}{b}, x/2 -> \frac{x}{2})
  for (let iter = 0; iter < 3; iter++) {
    const before = s;
    s = s.replace(/(^|[\s=+\-(<*·]|\\cdot\s*|\\pm\s*)([+-]?(?!(?:\\frac\b))(?:\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^[\]]*\])*|[a-zA-Z0-9^_{}]+))\s*\/\s*((?!(?:\\frac\b))(?:\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^[\]]*\])*|[a-zA-Z0-9^_{}]+))(?=[\s=+\-),.;*<>·]|\\cdot|\\pm|$)/g, (_m, pre, num, den) => {
      let sign = '';
      let cleanNum = num.trim();
      if (cleanNum.startsWith('-')) {
        sign = '-';
        cleanNum = cleanNum.slice(1).trim();
      } else if (cleanNum.startsWith('+')) {
        sign = '+';
        cleanNum = cleanNum.slice(1).trim();
      }
      return `${pre}${sign}\\frac{${cleanNum}}{${den.trim()}}`;
    });
    if (s === before) break;
  }

  // 7. Scale parentheses around fractions: (\frac{...}{...}) -> \left(\frac{...}{...}\right)
  s = s.replace(/(?<!\\left)\((\\frac\{[^{}]*\}\{[^{}]*\})\)(?!\\right)/g, '\\left($1\\right)');

  // Restore \text{...} blocks
  textBlocks.forEach((tb, i) => {
    s = s.replace(`___TEXT_BLOCK_${i}___`, tb);
  });

  return s;
}

/**
 * Formats mathematical answers, fractions, and numeric values for KaTeX rendering:
 * - Converts simple fractions (e.g. "1/8" -> "$\\frac{1}{8}$", "-3/4" -> "$-\\frac{3}{4}$")
 * - Converts mixed fractions (e.g. "2 1/3" -> "$2\\frac{1}{3}$", "-1 2/5" -> "$-1\\frac{2}{5}$")
 * - Converts algebraic fractions (e.g. "(x+1)/(x-1)" -> "$\\frac{x+1}{x-1}$", "x/2" -> "$\\frac{x}{2}$")
 * - Formats Polish decimal commas (e.g. "0.125" / "0,125" -> "$0{,}125$")
 * - Wraps raw unbracketed LaTeX commands (e.g. "\\frac{1}{8}", "\\sqrt{2}") in "$...$"
 * - Preserves existing math delimiters ($...$, $$...$$) and multiple-choice labels ("A", "P (Prawda)")
 */
export function formatMathAnswer(raw: string | number | null | undefined): string {
  if (raw === null || raw === undefined) return '';
  const str = String(raw).trim();
  if (!str) return '';

  // If already wrapped in delimiters, return as is
  if (
    (str.startsWith('$') && str.endsWith('$') && str.length >= 2) ||
    (str.startsWith('$$') && str.endsWith('$$') && str.length >= 4) ||
    (str.startsWith('\\[') && str.endsWith('\\]') && str.length >= 4) ||
    (str.startsWith('\\(') && str.endsWith('\\)') && str.length >= 4)
  ) {
    return str;
  }

  // If it's a special system string, don't format as math
  if (str.startsWith('[') && str.endsWith(']')) {
    return str;
  }

  // If it's a single letter option (A, B, C, D) or True/False label (P / F / Prawda / Fałsz)
  if (/^[A-D]$/i.test(str) || /^([PF]|TRUE|FALSE)\s*\(.+\)$/i.test(str)) {
    return str;
  }

  // If it's already a full LaTeX command without delimiters (e.g. \frac{1}{8}, \sqrt{2})
  if (/^\\[a-zA-Z]+/.test(str)) {
    return `$${str}$`;
  }

  let formatted = str;

  // 1. Mixed numbers: e.g. "2 1/3" -> "2\frac{1}{3}", "-1 2/5" -> "-1\frac{2}{5}"
  formatted = formatted.replace(
    /(^|[\s\+\-\(=])([+-]?\d+)\s+(\d+)\/(\d+)(?=[\s\+\-\)=,]|$)/g,
    (_m, prefix, whole, num, den) => `${prefix}${whole}\\frac{${num}}{${den}}`
  );

  // 2. Simple numeric fractions: e.g. "1/8" -> "\frac{1}{8}", "-3/4" -> "-\frac{3}{4}"
  formatted = formatted.replace(
    /(^|[\s\+\-\(=])([+-]?\d+)\/(\d+)(?=[\s\+\-\)=,]|$)/g,
    (_m, prefix, num, den) => {
      const isNeg = num.startsWith('-');
      const absNum = isNeg ? num.slice(1) : (num.startsWith('+') ? num.slice(1) : num);
      const sign = isNeg ? '-' : (num.startsWith('+') ? '+' : '');
      return `${prefix}${sign}\\frac{${absNum}}{${den}}`;
    }
  );

  // 3. Algebraic fractions: e.g. "(x+1)/(x-1)" -> "\frac{x+1}{x-1}" or "x/2" -> "\frac{x}{2}"
  if (formatted.includes('/')) {
    formatted = formatted.replace(
      /(^|[\s\+\-\(=])(\([^\)]+\)|[a-zA-Z\d\^]+)\/(\([^\)]+\)|[a-zA-Z\d\^]+)(?=[\s\+\-\)=,]|$)/g,
      (_m, prefix, num, den) => {
        const cleanNum = num.startsWith('(') && num.endsWith(')') ? num.slice(1, -1) : num;
        const cleanDen = den.startsWith('(') && den.endsWith(')') ? den.slice(1, -1) : den;
        return `${prefix}\\frac{${cleanNum}}{${cleanDen}}`;
      }
    );
  }

  // 4. Polish decimal commas: "0,5" or "0.5" in numeric answer -> "0{,}5"
  if (/^[+-]?\d+[.,]\d+$/.test(formatted)) {
    const match = formatted.match(/^([+-]?)(\d+)[.,](\d+)$/);
    if (match) {
      const [, sign, intPart, decPart] = match;
      return `$${sign || ''}${intPart}{,}${decPart}$`;
    }
  }

  // 5. If it contains math elements (\frac, \sqrt, \cdot, ^, =, <, >) or is a signed number
  if (
    /\\frac|\\sqrt|\\cdot|\^|[=<>_]/.test(formatted) ||
    /^[+-]?\d+$/.test(formatted)
  ) {
    formatted = formatted.replace(/(?<!\\)%/g, '\\%');
    return `$${formatted}$`;
  }

  return formatted;
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

/**
 * Automatically wraps un-delimited LaTeX expressions, pure math equations,
 * and mixed scoring criteria lines in $...$ so KaTeX can render them properly.
 */
export function autoWrapLatex(rawStr: string): string {
  if (!rawStr || typeof rawStr !== 'string') return '';
  const leadingSpace = rawStr.match(/^\s*/)?.[0] || '';
  const trailingSpace = rawStr.match(/\s*$/)?.[0] || '';
  let s = rawStr.trim();

  // If already contains math delimiters everywhere it needs to ($...$ or $$...$$ or \[...\])
  const hasInlineDelimiters = s.includes('$') || s.includes('\\(') || s.includes('\\[') || s.includes('\\begin{');
  const hasLatexCommands = /\\[a-zA-Z]+/.test(s);
  // Check if string contains regular prose words (words of 2+ letters that are not math commands/functions)
  const textWithoutLatex = s
    .replace(/\\text\{[^{}]*\}/g, '')
    .replace(/\\mbox\{[^{}]*\}/g, '')
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[{}\[\]\(\)<>=+\-*\/\\:,;!|_^]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = textWithoutLatex.match(/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,}/g) || [];
  const mathKeywords = new Set(['sin', 'cos', 'tan', 'ctg', 'tg', 'log', 'lim', 'ln', 'max', 'min', 'det', 'mod', 'pi', 'dx', 'dy', 'dt']);
  const hasProseWords = words.some(w => !mathKeywords.has(w.toLowerCase()));

  // Case 1: Pure math expression without delimiters (e.g. "(\sqrt{7}-1)^2 + 2\sqrt{7} = 8 \in \mathbb{Z}." or "8/15 · 5/4 = (8 · 5)/(15 · 4) = 40/60 = 2/3.")
  // MUST NOT be prose text with words like "W nawiasie", "Dzielenie", "Krok", etc.!
  if (!hasInlineDelimiters && !hasProseWords && (hasLatexCommands || /[=<>^_+\-*\/·]/.test(s))) {
    let math = s;
    let punct = '';
    if (math.endsWith('.')) {
      punct = '.';
      math = math.slice(0, -1).trim();
    }
    return leadingSpace + `$${cleanLatex(math)}$${punct}` + trailingSpace;
  }

  // Case 2: Prose text with mathematical clauses following colons (e.g. "W nawiasie: 4/6 - 3/6 = 1/6. Dzielenie: 1/6 * 12/5 = 12/30 = 2/5.")
  if (!hasInlineDelimiters && hasProseWords) {
    s = s.replace(/([A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+:\s*)([\d\s\+\-\*\/\=\(\)\^\.\,\<\>·]{3,})(?=\.|\;|$|\s+[A-ZĄĆĘŁŃÓŚŹŻ])/g, (match, label, mathExpr) => {
      const trimmedMath = mathExpr.trim();
      if (/[=+\-*/<>·]/.test(trimmedMath) && !trimmedMath.startsWith('$')) {
        let clean = cleanLatex(trimmedMath);
        let punct = '';
        if (clean.endsWith('.')) {
          punct = '.';
          clean = clean.slice(0, -1).trim();
        }
        return `${label}$${clean}$${punct}`;
      }
      return match;
    });
  }

  // Case 3: Mixed text where math expressions or scoring criteria contain \commands without $
  if (hasLatexCommands) {
    // 3a. Wrap after colon: "1 pkt za zastosowanie wzoru: 7 - 2\sqrt{7} + 1."
    if (!hasInlineDelimiters) {
      s = s.replace(/(:)(\s*)([^\n]+)$/, (match, colon, space, rest) => {
        let r = rest.trim();
        let punct = '';
        if (r.endsWith('.')) {
          punct = '.';
          r = r.slice(0, -1).trim();
        }
        if (/\\[a-zA-Z]+|[=<>^]/.test(r) && !/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/i.test(r)) {
          return `${colon}${space}$${r}$${punct}`;
        }
        return match;
      });

      // 3b. Wrap after "wynik ": "wynik a = 8 \in \mathbb{Z}."
      s = s.replace(/(wynik\s+)([^.,;\n]+)(\.?)/i, (match, prefix, expr, punct) => {
        let r = expr.trim();
        if (/\\[a-zA-Z]+|[=<>^]/.test(r) && !/[ąćęłńóśźż]/i.test(r)) {
          return `${prefix}$${r}$${punct}`;
        }
        return match;
      });
    }

    // 3b2. Wrap mathematical intervals in prose before standalone command wrapping:
    // e.g. "A = \langle -5, 2)", "B = (-1, 6\rangle)", "\langle 1, 5)"
    s = s.replace(/(^|[\s(])([A-Z]\s*=\s*(?:\\langle|[(\langle])\s*[-+]?\d+(?:\{,\}\d+|[.,]\d+)?\s*[,;]\s*[-+]?\d+(?:\{,\}\d+|[.,]\d+)?\s*(?:\\rangle|[)\rangle]))(?=[\s).,;!?]|$)/g, (_m, pre, expr) => {
      return `${pre}$${cleanLatex(expr)}$`;
    });
    s = s.replace(/(^|[\s(])((?:\\langle|[(\langle])\s*[-+]?\d+(?:\{,\}\d+|[.,]\d+)?\s*[,;]\s*[-+]?\d+(?:\{,\}\d+|[.,]\d+)?\s*(?:\\rangle|[)\rangle]))(?=[\s).,;!?]|$)/g, (_m, pre, expr) => {
      return `${pre}$${cleanLatex(expr)}$`;
    });

    // 3c. Only on parts outside $...$: wrap standalone \command tokens (e.g. "liczba \sqrt{7}")
    const parts = s.split(/(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g);
    s = parts.map(part => {
      if (part.startsWith('$')) return part;
      return part.replace(/(?<=\s|^)(\\[a-zA-Z]+(?:\{[^{}]*\}|\[[^\[\]]*\])*)(?=[\s.,;!?]|$)/g, '$$$1$$');
    }).join('');
  }

  // Case 4: Mathematical notation in prose outside $...$ (fractions, inequalities, pi, !=)
  const proseParts = s.split(/(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g);
  s = proseParts.map(part => {
    if (part.startsWith('$')) return part;
    if (/\d+\/\d+\/\d+/.test(part) || /https?:\/\//.test(part)) return part;

    let p = part;

    // 4a. Expressions with != in parentheses: e.g. "(q != 0)" -> "($q \neq 0$)"
    p = p.replace(/\(\s*([a-zA-Z\d\^_{}\\\+\-\*\/\s]+?)\s*!=\s*([a-zA-Z\d\^_{}\\\+\-\*\/\s]+?)\s*\)/g, (_m, left, right) => {
      return `($${left.trim()} \\neq ${right.trim()}$)`;
    });

    // 4b. Expressions with != in prose: e.g. "q != 0" -> "$q \neq 0$", "x != 5" -> "$x \neq 5$"
    p = p.replace(/(^|[\s(])([a-zA-Z\d\^_{}\\\+\-\*\/]+)\s*!=\s*([a-zA-Z\d\^_{}\\\+\-\*\/]+)(?=[\s).,;!?]|$)/g, (_m, pre, left, right) => {
      return `${pre}$${left.trim()} \\neq ${right.trim()}$`;
    });

    // 4c. Mixed numbers in prose: "2 1/3" -> "$2\frac{1}{3}$"
    p = p.replace(/(^|[\s(])([+-]?\d+)\s+(\d+)\/(\d+)(?=[\s).,;!?]|$)/g, (_m, pre, whole, num, den) => {
      return `${pre}$${whole}\\frac{${num}}{${den}}$`;
    });

    // 4d. Simple numeric fractions in prose: "2/3" -> "$\frac{2}{3}$", "-3/4" -> "$-\frac{3}{4}$"
    p = p.replace(/(^|[\s(])([+-]?\d+)\/(\d+)(?=[\s).,;!?]|$)/g, (_m, pre, num, den) => {
      let sign = '';
      let absNum = num;
      if (num.startsWith('-')) {
        sign = '-';
        absNum = num.slice(1);
      } else if (num.startsWith('+')) {
        sign = '+';
        absNum = num.slice(1);
      }
      return `${pre}$${sign}\\frac{${absNum}}{${den}}$`;
    });

    // 4e. Variable / algebraic fractions in prose: e.g. "p/q", "a/b", "m/n", "x/y", "1/x", "x/2"
    p = p.replace(/(^|[\s(])(?!(?:i\/lub)\b)([a-zA-Z\d]{1,2})\/([a-zA-Z\d]{1,2})(?=[\s).,;!?]|$)/g, (match, pre, num, den) => {
      const mathLetters = /^[a-zA-Z\d]{1,2}$/;
      if (mathLetters.test(num) && mathLetters.test(den)) {
        return `${pre}$\\frac{${num}}{${den}}$`;
      }
      return match;
    });

    // 4f. Symbol pi in prose: "liczba pi" -> "liczba $\pi$"
    p = p.replace(/\b(liczba|liczby|wartość|wartości|stała|stałej)\s+pi\b/gi, (_m, prefix) => {
      return `${prefix} $\\pi$`;
    });
    p = p.replace(/,\s*pi(?=[\s),.;!?]|$)/gi, ', $\\pi$');

    // 4g. Any leftover raw != outside math delimiters -> $\neq$
    p = p.replace(/!=/g, '$\\neq$');

    // 4h. Ensure space after colon before letters (e.g. ":nową" -> ": nową")
    p = p.replace(/:([a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ])/g, ': $1');

    // 4i. Standalone powers or expressions with ^ outside math delimiters: e.g. "x^2", "(a+b)^2", "a^n", "2^3"
    p = p.replace(/(^|[\s(])([a-zA-Z\d\(\)]+\^[a-zA-Z\d\(\)\{\}\+\-]+(?:\s*[\+\-\*\/=]\s*[a-zA-Z\d\(\)]+\^[a-zA-Z\d\(\)\{\}\+\-]+|\s*[\+\-\*\/=]\s*[a-zA-Z\d]+)*)(?=[\s).,;!?]|$)/g, (_m, pre, mathExpr) => {
      return `${pre}$${cleanLatex(mathExpr)}$`;
    });

    return p;
  }).join('');

  return leadingSpace + s + trailingSpace;
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

  // Fix Form Feed / triangle artifacts across the entire rawInput before splitting by $
  const sanitizedInput = rawInput
    .replace(/(?:\\x0c|\x0c|\f|\\?▲|\u25B2)\s*rac/g, '\\frac')
    .replace(/(?:\\x0d|\x0d|\r)\s*angle/g, '\\rangle')
    .replace(/(?:\\x0d|\x0d|\r)\s*ight/g, '\\right')
    .replace(/(?:\\x0d|\x0d|\r)\s*ho/g, '\\rho')
    .replace(/(?:\\x0d|\x0d|\r)\s*oot/g, '\\root')
    .replace(/(?:\\x08|\x08)\s*egin/g, '\\begin')
    .replace(/(?:\\x08|\x08)\s*ullet/g, '\\bullet')
    .replace(/(?:\\x08|\x08)\s*eta/g, '\\beta')
    .replace(/(?:\\x09|\x09|\t)\s*imes/g, '\\times')
    .replace(/(?:\\x09|\x09|\t)\s*heta/g, '\\theta')
    .replace(/(?:\\x09|\x09|\t)\s*ext/g, '\\text')
    .replace(/(?:\\x09|\x09|\t)\s*an/g, '\\tan')
    .replace(/(?:\\x09|\x09|\t)\s*au/g, '\\tau')
    .replace(/(?:\\x0a|\x0a|\n)\s*eq/g, '\\neq')
    .replace(/(?:\\x0c|\x0c)/g, '')
    .replace(/(?<=[,\s\d\-+])angle(?=[\s\)\],.;$]|\b)/g, '\\rangle');

  // Normalizacja powielonych znaków dolara (np. $$$$ -> $$) bez ucinania spacji na krańcach tekstu
  const rawContent = sanitizedInput.replace(/\${3,}/g, '$$');

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
  // Strip \text{...} blocks, LaTeX commands, and math symbols before checking for non-math prose words
  const textWithoutLatexBlock = trimmedForBlockCheck
    .replace(/\\text\{[^{}]*\}/g, '')
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[{}\[\]\(\)<>=+\-*\/\\:,;!|_^]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const blockWords = textWithoutLatexBlock.match(/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]{2,}/g) || [];
  const blockMathKeywords = new Set(['sin', 'cos', 'tan', 'ctg', 'tg', 'log', 'lim', 'ln', 'max', 'min', 'det', 'mod', 'pi', 'dx', 'dy', 'dt']);
  const hasProseWordsBlock = blockWords.some(w => !blockMathKeywords.has(w.toLowerCase()));

  // Czysty blok LaTeX: displayMode lub \begin{...} lub $$...$$, lub ciąg z komendami LaTeX
  const hasLatexCommands = /\\[a-zA-Z]+|\{|\}/.test(trimmedForBlockCheck);
  const isPureLatexBlock = 
    (!hasInlineDelimiters && (displayMode || !hasProseWordsBlock)) &&
    (
      displayMode || 
      hasLatexCommands ||
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

  // Domyślnie parsujemy jako tekst mieszany (LaTeX z $ lub $$ oraz zwykły tekst).
  // Automatycznie wykrywamy formuły bez znaczników $ i ułamki, aby KaTeX wyrenderował estetyczny wzór.
  let effectiveContent = autoWrapLatex(rawContent);
  if (!effectiveContent.includes('$') && !/[ąćęłńóśźż]/i.test(effectiveContent)) {
    const trimmed = effectiveContent.trim();
    if (
      /^[+-]?\s*\d+\/\d+$/.test(trimmed) ||
      /^[+-]?\s*\d+\s+\d+\/\d+$/.test(trimmed) ||
      /^[+-]?\s*(\([^\)]+\)|[a-zA-Z\d\^]+)\/(\([^\)]+\)|[a-zA-Z\d\^]+)$/.test(trimmed)
    ) {
      effectiveContent = formatMathAnswer(trimmed);
    }
  }

  return renderMixedParts(effectiveContent, className);
};

export const MathRenderer = React.memo(MathRendererComponent);

export default MathRenderer;
