export function cleanThinkingTokens(text: string): string {
  if (!text) return '';
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<thought>[\s\S]*?<\/thought>/gi, '')
    .replace(/^Here's a thinking process:[\s\S]*?\n\n/i, '')
    .trim();
}

export function deepSanitizeLatex(obj: any): any {
  if (typeof obj === 'string') {
    return obj
      .replace(/(?:\\x0c|\x0c|\f|\\?▲|\u25B2)\s*rac/g, '\\frac')
      .replace(/(?:\\x0d|\x0d|\r)\s*angle/g, '\\rangle')
      .replace(/(?:\\x0d|\x0d|\r)\s*ight/g, '\\right')
      .replace(/(?:\\x0d|\x0d|\r)\s*ho/g, '\\rho')
      .replace(/(?:\\x0d|\x0d|\r)\s*oot/g, '\\root')
      .replace(/(?:\\x08|\x08)\s*egin/g, '\\begin')
      .replace(/(?:\\x08|\x08)\s*ullet/g, '\\bullet')
      .replace(/(?:\\x08|\x08)\s*eta/g, '\\beta')
      .replace(/(?:\\x08|\x08)\s*ar/g, '\\bar')
      .replace(/(?:\\x08|\x08)\s*inom/g, '\\binom')
      .replace(/(?:\\x09|\x09|\t)\s*imes/g, '\\times')
      .replace(/(?:\\x09|\x09|\t)\s*heta/g, '\\theta')
      .replace(/(?:\\x09|\x09|\t)\s*ext/g, '\\text')
      .replace(/(?:\\x09|\x09|\t)\s*an/g, '\\tan')
      .replace(/(?:\\x09|\x09|\t)\s*au/g, '\\tau')
      .replace(/(?:\\x09|\x09|\t)\s*ilde/g, '\\tilde')
      .replace(/(?:\\x0a|\x0a|\n)\s*eq/g, '\\neq')
      .replace(/(?:\\x0a|\x0a|\n)\s*abla/g, '\\nabla')
      .replace(/(?:\\x0c|\x0c)/g, '')
      .replace(/(?<=[,\s\d\-+])angle(?=[\s\)\],.;$]|\b)/g, '\\rangle');
  }
  if (Array.isArray(obj)) {
    return obj.map(deepSanitizeLatex);
  }
  if (obj && typeof obj === 'object') {
    const res: any = {};
    for (const [k, v] of Object.entries(obj)) {
      res[k] = deepSanitizeLatex(v);
    }
    return res;
  }
  return obj;
}

export function extractStructuredJson(text: string): any {
  if (!text) return null;
  let cleaned = cleanThinkingTokens(text).trim();

  // If wrapped in markdown ```json ... ```, extract content
  const mdMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (mdMatch) {
    cleaned = mdMatch[1].trim();
  } else {
    const objMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objMatch) {
      cleaned = objMatch[0].trim();
    }
  }

  // Pre-escape known LaTeX commands that start with JSON escape chars (r, b, t, f, n)
  // so JSON.parse won't turn \rangle -> \r + angle (0x0D + angle), \times -> \t + imes, etc.
  const protectedLatex = cleaned.replace(/(?<!\\)\\(rangle|right|rho|root|begin|bullet|beta|bar|binom|times|theta|text|tan|tau|tilde|frac|neq|nabla)\b/g, '\\\\$1');

  // 1. Try parsing protected
  try {
    return deepSanitizeLatex(JSON.parse(protectedLatex));
  } catch {}

  // 2. Escape all invalid JSON backslashes (LaTeX macros like \text, \mathbb, \frac, \sqrt, etc.)
  try {
    const fixed = protectedLatex.replace(/\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '\\\\');
    return deepSanitizeLatex(JSON.parse(fixed));
  } catch {}

  // 3. Fix unescaped newlines inside strings if any
  try {
    const fixed = protectedLatex
      .replace(/\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '\\\\')
      .replace(/[\u0000-\u001F]+/g, ' ');
    return deepSanitizeLatex(JSON.parse(fixed));
  } catch {}

  // 4. Fallback to original cleaned string
  try {
    return deepSanitizeLatex(JSON.parse(cleaned));
  } catch {}

  return null;
}
