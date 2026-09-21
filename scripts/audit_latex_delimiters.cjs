const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);

let replacementsCount = 0;

function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  let s = str;

  // Replace \( ... \) with $ ... $
  if (s.includes('\\(') && s.includes('\\)')) {
    const before = s;
    s = s.replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');
    if (s !== before) replacementsCount++;
  }

  // Replace \[ ... \] with $$ ... $$
  if (s.includes('\\[') && s.includes('\\]')) {
    const before = s;
    s = s.replace(/\\\[([\s\S]*?)\\\]/g, '$$$$$1$$$$');
    if (s !== before) replacementsCount++;
  }

  return s;
}

function traverseAndSanitize(obj) {
  if (!obj) return obj;
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(traverseAndSanitize);
  }
  if (typeof obj === 'object') {
    const res = {};
    for (const [k, v] of Object.entries(obj)) {
      res[k] = traverseAndSanitize(v);
    }
    return res;
  }
  return obj;
}

const cleaned = traverseAndSanitize(data);
fs.writeFileSync(filePath, JSON.stringify(cleaned, null, 2), 'utf8');
console.log(`Pomyślnie znormalizowano ${replacementsCount} wystąpień delimiterów w curriculum_matematyka.json.`);
