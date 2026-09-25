const fs = require('fs');
const path = require('path');

const tsPath = path.resolve(__dirname, '..', 'src', 'data', 'ckeFormulasData.ts');
const jsonPath = path.resolve(__dirname, '..', 'seed', 'curriculum', 'cke_formulas.json');

const content = fs.readFileSync(tsPath, 'utf8');

// Strip imports, TypeScript interfaces and types
const cleaned = content
  .replace(/^import\s+.*?;?\s*$/gm, '')
  .replace(/export interface[\s\S]*?}\n/g, '')
  .replace(/export const CKE_FORMULA_TOPICS =/, 'const topics =')
  .replace(/export const CKE_FORMULAS_DATA: CkeFormulaItem\[\] =/, 'const formulas =');

const runner = new Function(cleaned + '\nreturn { topics, formulas };');
const { topics, formulas } = runner();

fs.writeFileSync(jsonPath, JSON.stringify({ topics, formulas }, null, 2), 'utf8');
console.log(`Successfully generated ${jsonPath} with ${formulas.length} formulas and ${topics.length} topics.`);
