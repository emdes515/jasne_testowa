const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const potrace = require('potrace');

const inputPath = 'C:/Users/Oskar/.gemini/antigravity/brain/3a4194db-a509-469f-a602-95c4c8479db2/.user_uploaded/media_1790684263146.png';
const buffer = fs.readFileSync(inputPath);
const png = PNG.sync.read(buffer);

console.log(`Image dimensions: ${png.width}x${png.height}`);

// Background in the image is off-white (~245, 240, 225).
// Logo color is golden yellow/amber (~225, 170, 30).
let minX = png.width, maxX = 0, minY = png.height, maxY = 0;
const mask = new PNG({ width: png.width, height: png.height });

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) << 2;
    const r = png.data[idx];
    const g = png.data[idx + 1];
    const b = png.data[idx + 2];
    
    // Logo color test: b < 140 && r > 150 && g > 100
    const isLogo = (b < 140) && (r > 150) && (g > 100);
    
    if (isLogo) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      
      // Black for potrace to trace
      mask.data[idx] = 0;
      mask.data[idx + 1] = 0;
      mask.data[idx + 2] = 0;
      mask.data[idx + 3] = 255;
    } else {
      // White
      mask.data[idx] = 255;
      mask.data[idx + 1] = 255;
      mask.data[idx + 2] = 255;
      mask.data[idx + 3] = 255;
    }
  }
}

console.log(`Logo bounding box: x=[${minX}, ${maxX}] (${maxX - minX + 1}px), y=[${minY}, ${maxY}] (${maxY - minY + 1}px)`);

// Find horizontal gap between bulb and text
const rowCounts = [];
for (let y = minY; y <= maxY; y++) {
  let count = 0;
  for (let x = minX; x <= maxX; x++) {
    const idx = (png.width * y + x) << 2;
    if (mask.data[idx] === 0) count++;
  }
  rowCounts.push({ y, count });
}

let gapY = 0;
for (let i = 40; i < rowCounts.length - 40; i++) {
  if (rowCounts[i].count === 0) {
    gapY = rowCounts[i].y;
    break;
  }
}

console.log(`Detected gap Y between bulb and text: ${gapY}`);

const pad = 20;
const cropW = (maxX - minX + 1) + pad * 2;
const cropH = (maxY - minY + 1) + pad * 2;
const fullMask = new PNG({ width: cropW, height: cropH });
fullMask.data.fill(255);

for (let y = minY; y <= maxY; y++) {
  for (let x = minX; x <= maxX; x++) {
    const srcIdx = (png.width * y + x) << 2;
    const dstIdx = (cropW * (y - minY + pad) + (x - minX + pad)) << 2;
    fullMask.data[dstIdx] = mask.data[srcIdx];
    fullMask.data[dstIdx + 1] = mask.data[srcIdx + 1];
    fullMask.data[dstIdx + 2] = mask.data[srcIdx + 2];
    fullMask.data[dstIdx + 3] = 255;
  }
}

// Bulb mask
const bulbCropH = (gapY - minY) + pad * 2;
let bulbMinX = png.width, bulbMaxX = 0;
for (let y = minY; y < gapY; y++) {
  for (let x = minX; x <= maxX; x++) {
    const srcIdx = (png.width * y + x) << 2;
    if (mask.data[srcIdx] === 0) {
      if (x < bulbMinX) bulbMinX = x;
      if (x > bulbMaxX) bulbMaxX = x;
    }
  }
}
const bulbW = (bulbMaxX - bulbMinX + 1) + pad * 2;
const bulbFinalMask = new PNG({ width: bulbW, height: bulbCropH });
bulbFinalMask.data.fill(255);
for (let y = minY; y < gapY; y++) {
  for (let x = bulbMinX; x <= bulbMaxX; x++) {
    const srcIdx = (png.width * y + x) << 2;
    const dstIdx = (bulbW * (y - minY + pad) + (x - bulbMinX + pad)) << 2;
    bulbFinalMask.data[dstIdx] = mask.data[srcIdx];
    bulbFinalMask.data[dstIdx + 1] = mask.data[srcIdx + 1];
    bulbFinalMask.data[dstIdx + 2] = mask.data[srcIdx + 2];
    bulbFinalMask.data[dstIdx + 3] = 255;
  }
}

// Text mask
let textMaxY = maxY;
let textActualMinY = gapY;
while (textActualMinY <= maxY && rowCounts.find(r => r.y === textActualMinY && r.count === 0)) {
  textActualMinY++;
}
let textMinX = png.width, textMaxX = 0;
for (let y = textActualMinY; y <= textMaxY; y++) {
  for (let x = minX; x <= maxX; x++) {
    const srcIdx = (png.width * y + x) << 2;
    if (mask.data[srcIdx] === 0) {
      if (x < textMinX) textMinX = x;
      if (x > textMaxX) textMaxX = x;
    }
  }
}
const textW = (textMaxX - textMinX + 1) + pad * 2;
const textH = (textMaxY - textActualMinY + 1) + pad * 2;
const textFinalMask = new PNG({ width: textW, height: textH });
textFinalMask.data.fill(255);
for (let y = textActualMinY; y <= textMaxY; y++) {
  for (let x = textMinX; x <= textMaxX; x++) {
    const srcIdx = (png.width * y + x) << 2;
    const dstIdx = (textW * (y - textActualMinY + pad) + (x - textMinX + pad)) << 2;
    textFinalMask.data[dstIdx] = mask.data[srcIdx];
    textFinalMask.data[dstIdx + 1] = mask.data[srcIdx + 1];
    textFinalMask.data[dstIdx + 2] = mask.data[srcIdx + 2];
    textFinalMask.data[dstIdx + 3] = 255;
  }
}

fs.mkdirSync('scripts/temp', { recursive: true });
fs.writeFileSync('scripts/temp/mask_full.png', PNG.sync.write(fullMask));
fs.writeFileSync('scripts/temp/mask_bulb.png', PNG.sync.write(bulbFinalMask));
fs.writeFileSync('scripts/temp/mask_text.png', PNG.sync.write(textFinalMask));

console.log('Saved masks. Now vectorizing...');

function traceImage(pngBuffer, opts = {}) {
  return new Promise((resolve, reject) => {
    potrace.trace(pngBuffer, {
      turdSize: 3,
      optCurve: true,
      alphaMax: 1.0,
      optTolerance: 0.15,
      color: '#FFB800',
      ...opts
    }, (err, svg) => {
      if (err) reject(err);
      else resolve(svg);
    });
  });
}

async function run() {
  const fullSvg = await traceImage(PNG.sync.write(fullMask));
  const bulbSvg = await traceImage(PNG.sync.write(bulbFinalMask));
  const textSvg = await traceImage(PNG.sync.write(textFinalMask));
  
  fs.writeFileSync('public/logo.svg', fullSvg);
  fs.writeFileSync('public/logo-bulb.svg', bulbSvg);
  fs.writeFileSync('public/logo-text.svg', textSvg);
  
  console.log('SVGs created successfully in public/!');
  console.log('Bulb viewBox:', bulbSvg.match(/viewBox="([^"]+)"/)?.[1]);
  console.log('Text viewBox:', textSvg.match(/viewBox="([^"]+)"/)?.[1]);
  console.log('Full viewBox:', fullSvg.match(/viewBox="([^"]+)"/)?.[1]);
}

run().catch(console.error);
