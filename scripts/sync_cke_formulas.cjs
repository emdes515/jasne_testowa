const fs = require('fs');
const path = require('path');

const tsPath = path.resolve(__dirname, '..', 'src', 'data', 'ckeFormulasData.ts');
const jsonPath = path.resolve(__dirname, '..', 'seed', 'curriculum', 'cke_formulas.json');

const content = fs.readFileSync(tsPath, 'utf8');

// Extract everything from CKE_FORMULA_TOPICS onwards
const startIndex = content.indexOf('export const CKE_FORMULA_TOPICS');
if (startIndex === -1) {
  throw new Error('Could not find CKE_FORMULA_TOPICS in ckeFormulasData.ts');
}

const cleaned = content.substring(startIndex)
  .replace(/export const CKE_FORMULA_TOPICS\s*=\s*/, 'const topics = ')
  .replace(/export const CKE_FORMULAS_DATA:\s*CkeFormulaItem\[\]\s*=\s*/, 'const formulas = ');

const runner = new Function(cleaned + '\nreturn { topics, formulas };');
const { topics, formulas } = runner();

fs.writeFileSync(jsonPath, JSON.stringify({ topics, formulas }, null, 2), 'utf8');
console.log(`Successfully generated ${jsonPath} with ${formulas.length} formulas and ${topics.length} topics.`);
