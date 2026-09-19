'use strict';

const fs = require('fs');
const path = require('path');
const katex = require('katex');

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../seed/curriculum/curriculum_matematyka.json'), 'utf8'));

let totalStrings = 0;
let totalMathBlocks = 0;
let katexErrors = [];
let unmatchedDollarErrors = [];
let rawSlashFractions = [];
let rawUnicodeSymbols = [];
let residualCke = [];

const unicodeMathRegex = /[²³⁴₁₂₃₄ₙ∆·≤≥≠≈∈∉∪∩⊂Ωπ]/;

function scan(obj, currentPath) {
  if (typeof obj === 'string') {
    totalStrings++;

    // 1. KaTeX parse check
    const mathRegex = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
    let m;
    let mathCount = 0;
    while ((m = mathRegex.exec(obj)) !== null) {
      totalMathBlocks++;
      mathCount++;
      const math = m[1] || m[2];
      try {
        katex.renderToString(math, { throwOnError: true });
      } catch (err) {
        katexErrors.push({ currentPath, math, error: err.message });
      }
    }

    // 2. Unmatched dollar signs
    const dollars = (obj.match(/\$/g) || []).length;
    if (dollars % 2 !== 0) {
      unmatchedDollarErrors.push({ currentPath, dollars, text: obj });
    }

    // 3. Raw slash fractions outside math mode
    // Split by $ blocks and check text blocks
    const nonMathParts = obj.split(/\$\$[\s\S]+?\$\$|\$[^$]+?\$/);
    for (const part of nonMathParts) {
      // Look for formulas like p = -b/(2a), q = -delta/(4a)
      const pMatch = part.match(/\bp\s*=\s*-b\s*\/\s*\(?2a\)?/gi);
      if (pMatch) {
        rawSlashFractions.push({ currentPath, type: 'p = -b/(2a)', match: pMatch[0], part });
      }
      const qMatch = part.match(/\bq\s*=\s*-(?:\\Delta|Delta|delta)\s*\/\s*\(?4a\)?/gi);
      if (qMatch) {
        rawSlashFractions.push({ currentPath, type: 'q = -delta/(4a)', match: qMatch[0], part });
      }
      const vMatch = part.match(/\bV\s*=\s*1\/3\s*(?:\\cdot|\*|\s)?\s*P_?p/g);
      if (vMatch) {
        rawSlashFractions.push({ currentPath, type: 'V = 1/3 Pp', match: vMatch[0], part });
      }

      // 4. Unicode math symbols left unescaped outside $...$
      if (unicodeMathRegex.test(part)) {
        // Exclude degree symbol or common prose if any
        const found = part.match(/[²³⁴₁₂₃₄ₙ∆·≤≥≠≈∈∉∪∩⊂Ωπ]/g);
        rawUnicodeSymbols.push({ currentPath, symbols: found, part: part.slice(0, 80) });
      }
    }

    // 5. Residual CKE phrases
    const ckeMatch = obj.match(/(?:w\s+)?(?:karcie|karty|karta|kartę|kartą)\s+(?:wzor[oó]w\s+)?cke/gi);
    if (ckeMatch) {
      residualCke.push({ currentPath, match: ckeMatch, text: obj.slice(0, 100) });
    }

  } else if (Array.isArray(obj)) {
    obj.forEach((item, idx) => scan(item, `${currentPath}[${idx}]`));
  } else if (obj && typeof obj === 'object') {
    Object.entries(obj).forEach(([key, val]) => scan(val, `${currentPath}.${key}`));
  }
}

console.log('--- Starting Comprehensive KaTeX & Math Audit ---');
scan(data, 'root');

console.log(`Total strings examined: ${totalStrings}`);
console.log(`Total math blocks parsed with KaTeX: ${totalMathBlocks}`);
console.log(`KaTeX parse errors (throwOnError: true): ${katexErrors.length}`);
if (katexErrors.length > 0) {
  console.log('Sample KaTeX errors:', JSON.stringify(katexErrors.slice(0, 5), null, 2));
}

console.log(`Unmatched dollar signs: ${unmatchedDollarErrors.length}`);
if (unmatchedDollarErrors.length > 0) {
  console.log('Sample unmatched dollar errors:', JSON.stringify(unmatchedDollarErrors.slice(0, 5), null, 2));
}

console.log(`Raw slash fractions (p, q, V) outside $: ${rawSlashFractions.length}`);
if (rawSlashFractions.length > 0) {
  console.log('Sample raw slash fractions:', JSON.stringify(rawSlashFractions.slice(0, 5), null, 2));
}

console.log(`Raw Unicode math symbols outside $: ${rawUnicodeSymbols.length}`);
if (rawUnicodeSymbols.length > 0) {
  console.log('Sample raw Unicode math symbols:', JSON.stringify(rawUnicodeSymbols.slice(0, 10), null, 2));
}

console.log(`Residual Karta CKE occurrences: ${residualCke.length}`);
if (residualCke.length > 0) {
  console.log('Sample residual CKE occurrences:', JSON.stringify(residualCke.slice(0, 5), null, 2));
}

console.log('--- Audit Finished ---');
