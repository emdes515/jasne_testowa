const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const potrace = require('potrace');

const inputPath = 'C:/Users/Oskar/.gemini/antigravity/brain/3a4194db-a509-469f-a602-95c4c8479db2/.user_uploaded/media_1790684263146.png';
const buffer = fs.readFileSync(inputPath);
const srcPng = PNG.sync.read(buffer);

console.log(`Input dimensions: ${srcPng.width}x${srcPng.height}`);

// Logo bounds:
// Bulb: y = 97 to 364
// Text: y = 371 to 462
// Overall X: 319 to 705

// Threshold: blue < 125 represents logo
function isLogoPixel(png, x, y) {
  if (x < 0 || x >= png.width || y < 0 || y >= png.height) return false;
  const idx = (png.width * y + x) << 2;
  const r = png.data[idx];
  const g = png.data[idx + 1];
  const b = png.data[idx + 2];
  return (b < 125) && (r > 150) && (g > 100);
}

// Extract sub-region and upscale 2x with bilinear anti-aliasing smoothing for ultra-clean bezier curves
function extractAndUpscale(minX, maxX, minY, maxY, scale = 2, padding = 16) {
  const w = maxX - minX + 1;
  const h = maxY - minY + 1;
  const targetW = (w + padding * 2) * scale;
  const targetH = (h + padding * 2) * scale;
  
  const out = new PNG({ width: targetW, height: targetH });
  out.data.fill(255); // Fill with white
  
  for (let ty = 0; ty < targetH; ty++) {
    for (let tx = 0; tx < targetW; tx++) {
      // Map to source coords (floating)
      const sx = minX - padding + (tx / scale);
      const sy = minY - padding + (ty / scale);
      
      const x0 = Math.floor(sx);
      const x1 = x0 + 1;
      const y0 = Math.floor(sy);
      const y1 = y0 + 1;
      
      const fx = sx - x0;
      const fy = sy - y0;
      
      const p00 = isLogoPixel(srcPng, x0, y0) ? 0 : 255;
      const p10 = isLogoPixel(srcPng, x1, y0) ? 0 : 255;
      const p01 = isLogoPixel(srcPng, x0, y1) ? 0 : 255;
      const p11 = isLogoPixel(srcPng, x1, y1) ? 0 : 255;
      
      const val = (1 - fx) * (1 - fy) * p00 +
                  fx * (1 - fy) * p10 +
                  (1 - fx) * fy * p01 +
                  fx * fy * p11;
      
      const outIdx = (targetW * ty + tx) << 2;
      const binVal = val < 128 ? 0 : 255;
      out.data[outIdx] = binVal;
      out.data[outIdx + 1] = binVal;
      out.data[outIdx + 2] = binVal;
      out.data[outIdx + 3] = 255;
    }
  }
  return out;
}

// 1. Bulb Alone
let bulbMinX = srcPng.width, bulbMaxX = 0;
for (let y = 97; y <= 364; y++) {
  for (let x = 0; x < srcPng.width; x++) {
    if (isLogoPixel(srcPng, x, y)) {
      if (x < bulbMinX) bulbMinX = x;
      if (x > bulbMaxX) bulbMaxX = x;
    }
  }
}
console.log(`Bulb bounds: X=[${bulbMinX}, ${bulbMaxX}] (${bulbMaxX - bulbMinX + 1}px), Y=[97, 364] (268px)`);

// 2. Text Alone
let textMinX = srcPng.width, textMaxX = 0;
for (let y = 371; y <= 462; y++) {
  for (let x = 0; x < srcPng.width; x++) {
    if (isLogoPixel(srcPng, x, y)) {
      if (x < textMinX) textMinX = x;
      if (x > textMaxX) textMaxX = x;
    }
  }
}
console.log(`Text bounds: X=[${textMinX}, ${textMaxX}] (${textMaxX - textMinX + 1}px), Y=[371, 462] (92px)`);

// 3. Full Logo
const fullMinX = Math.min(bulbMinX, textMinX);
const fullMaxX = Math.max(bulbMaxX, textMaxX);
const fullMinY = 97;
const fullMaxY = 462;
console.log(`Full bounds: X=[${fullMinX}, ${fullMaxX}] (${fullMaxX - fullMinX + 1}px), Y=[${fullMinY}, ${fullMaxY}] (366px)`);

const bulbMask = extractAndUpscale(bulbMinX, bulbMaxX, 97, 364, 2, 8);
const textMask = extractAndUpscale(textMinX, textMaxX, 371, 462, 2, 8);
const fullMask = extractAndUpscale(fullMinX, fullMaxX, fullMinY, fullMaxY, 2, 8);

function traceToSvg(maskPng) {
  return new Promise((resolve, reject) => {
    potrace.trace(PNG.sync.write(maskPng), {
      turdSize: 4,
      optCurve: true,
      alphaMax: 1.0,
      optTolerance: 0.15,
      color: '#FFB800'
    }, (err, svg) => {
      if (err) reject(err);
      else resolve(svg);
    });
  });
}

function extractPathD(svg) {
  const match = svg.match(/<path\s+d="([^"]+)"/);
  return match ? match[1] : '';
}

function getViewBox(svg) {
  const match = svg.match(/viewBox="([^"]+)"/);
  return match ? match[1] : '';
}

async function buildLogos() {
  const bulbSvg = await traceToSvg(bulbMask);
  const textSvg = await traceToSvg(textMask);
  const fullSvg = await traceToSvg(fullMask);

  const bulbD = extractPathD(bulbSvg);
  const textD = extractPathD(textSvg);
  const fullD = extractPathD(fullSvg);

  const bulbVB = getViewBox(bulbSvg);
  const textVB = getViewBox(textSvg);
  const fullVB = getViewBox(fullSvg);

  console.log('Bulb viewBox:', bulbVB);
  console.log('Text viewBox:', textVB);
  console.log('Full viewBox:', fullVB);

  // Write standalone SVGs with currentColor support or #FFB800 default
  // 1. Bulb alone
  const cleanBulbSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bulbVB}" fill="currentColor" width="100%" height="100%">
  <path d="${bulbD}" fill-rule="evenodd" />
</svg>`;
  fs.writeFileSync('public/logo-bulb.svg', cleanBulbSvg);

  // 2. Text alone
  const cleanTextSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${textVB}" fill="currentColor" width="100%" height="100%">
  <path d="${textD}" fill-rule="evenodd" />
</svg>`;
  fs.writeFileSync('public/logo-text.svg', cleanTextSvg);

  // 3. Full vertical logo
  const cleanFullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${fullVB}" fill="currentColor" width="100%" height="100%">
  <path d="${fullD}" fill-rule="evenodd" />
</svg>`;
  fs.writeFileSync('public/logo-full.svg', cleanFullSvg);
  fs.writeFileSync('public/logo.svg', cleanFullSvg);

  // 4. Horizontal lockup (Bulb on left, Text on right)
  // Let's calculate horizontal composition:
  // Bulb height = bulbVB.h, Text height = textVB.h
  // Normalize heights so text is harmonious next to the bulb:
  // Let bulb target height = 120, bulb aspect ratio = bW / bH
  const [, , bW, bH] = bulbVB.split(' ').map(Number);
  const [, , tW, tH] = textVB.split(' ').map(Number);

  const targetH = 120;
  const scaledBulbW = (bW / bH) * targetH;
  // Let text height be ~52% of bulb height (e.g. 62px)
  const textScale = 0.52 * targetH / tH;
  const scaledTextW = tW * textScale;
  const scaledTextH = tH * textScale;
  const gap = 20;
  const totalHWidth = Math.round(scaledBulbW + gap + scaledTextW);
  const totalHHeight = targetH;
  const textOffsetY = Math.round((targetH - scaledTextH) / 2) + 2;

  const horizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalHWidth} ${totalHHeight}" fill="currentColor" width="100%" height="100%">
  <g transform="scale(${targetH / bH})">
    <path d="${bulbD}" fill-rule="evenodd" />
  </g>
  <g transform="translate(${Math.round(scaledBulbW + gap)}, ${textOffsetY}) scale(${textScale})">
    <path d="${textD}" fill-rule="evenodd" />
  </g>
</svg>`;
  fs.writeFileSync('public/logo-horizontal.svg', horizontalSvg);

  // 5. Square Icon (for favicon, pwa, avatar)
  const maxDim = Math.max(bW, bH);
  const sqPadding = Math.round(maxDim * 0.12);
  const sqSize = maxDim + sqPadding * 2;
  const offX = Math.round((sqSize - bW) / 2);
  const offY = Math.round((sqSize - bH) / 2);

  const squareIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sqSize} ${sqSize}" fill="#FFB800" width="100%" height="100%">
  <g transform="translate(${offX}, ${offY})">
    <path d="${bulbD}" fill-rule="evenodd" />
  </g>
</svg>`;
  fs.writeFileSync('public/favicon.svg', squareIconSvg);

  // Export path constants to a TypeScript file for zero-latency direct JSX rendering!
  const tsContent = `/**
 * Official JASNE Vector Logo Paths & ViewBoxes
 * Generated directly from high-resolution brand asset media_1790684263146.png
 */

export const JASNE_LOGO_DATA = {
  bulb: {
    viewBox: "${bulbVB}",
    path: "${bulbD}",
    width: ${bW},
    height: ${bH}
  },
  text: {
    viewBox: "${textVB}",
    path: "${textD}",
    width: ${tW},
    height: ${tH}
  },
  full: {
    viewBox: "${fullVB}",
    path: "${fullD}",
    width: ${fullVB.split(' ')[2]},
    height: ${fullVB.split(' ')[3]}
  },
  horizontal: {
    viewBox: "0 0 ${totalHWidth} ${totalHHeight}",
    targetHeight: ${targetH},
    bulbScale: ${targetH / bH},
    textOffsetX: ${Math.round(scaledBulbW + gap)},
    textOffsetY: ${textOffsetY},
    textScale: ${textScale},
    width: ${totalHWidth},
    height: ${totalHHeight}
  }
} as const;
`;

  fs.writeFileSync('src/components/ui/jasneLogoData.ts', tsContent);
  console.log('Successfully generated all SVGs and src/components/ui/jasneLogoData.ts!');
}

buildLogos().catch(console.error);
