/**
 * logoCleaner.ts
 * Profesjonalny algorytm cyfrowego matowania (Chroma & Color-Difference Matting)
 * Usuwa tło z oryginalnego pliku /logo.png bez poszarpanych krawędzi i bez białej poświaty (defringing).
 * Generuje w pamięci czyste, idealnie wycięte grafiki:
 * 1. fullLogoUrl: Pełne logo (żarówka + napis "Jasne.")
 * 2. bulbOnlyUrl: Sam znaczek (tylko trójwymiarowa żarówka)
 */

interface CleanLogoResult {
  fullLogoUrl: string;
  bulbOnlyUrl: string;
  isReady: boolean;
}

let cachedResult: CleanLogoResult | null = null;
const listeners: Array<(result: CleanLogoResult) => void> = [];

export function getCleanLogoUrls(): CleanLogoResult {
  if (cachedResult) return cachedResult;

  // Domyślny fallback na czas asynchronicznego przetwarzania
  return {
    fullLogoUrl: '/logo.png',
    bulbOnlyUrl: '/logo.png',
    isReady: false
  };
}

export function subscribeCleanLogo(callback: (result: CleanLogoResult) => void): () => void {
  if (cachedResult && cachedResult.isReady) {
    callback(cachedResult);
    return () => {};
  }
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

// Inicjalizacja przetwarzania w przeglądarce
if (typeof window !== 'undefined') {
  const img = new Image();
  img.crossOrigin = 'anonymous';

  const processImage = () => {
    try {
      const width = img.naturalWidth || img.width || 1024;
      const height = img.naturalHeight || img.height || 1024;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Tablica zajętości pikseli po wierszach do detekcji podziału żarówka / napis
      const rowYellowCounts = new Int32Array(height);
      const colYellowCounts = new Int32Array(width);

      // 1. Krok: Precyzyjne usuwanie tła (Color difference matting)
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Różnica barwna dla koloru żółtego/złotego:
        // Żółty ma wysoki R i G, ale bardzo niski B.
        // Tło białe/szare ma R ≈ G ≈ B, więc metric ≈ 0.
        const metric = (r * 0.5 + g * 0.5) - b;

        const x = (i / 4) % width;
        const y = Math.floor((i / 4) / width);

        if (metric <= 28) {
          // 100% tło (papier / białe tło / neutralny cień)
          data[i + 3] = 0;
        } else if (metric >= 65) {
          // 100% logo (żółć)
          data[i + 3] = 255;
          rowYellowCounts[y]++;
          colYellowCounts[x]++;
        } else {
          // Płynne antyaliasingowe przejście krawędzi (Smoothstep Hermite curve)
          const t = (metric - 28) / (65 - 28);
          const alpha = t * t * (3 - 2 * t);
          const a255 = Math.round(alpha * 255);
          data[i + 3] = a255;

          // Defringing: usunięcie resztek bieli z krawędzi (Unmultiply white background)
          if (alpha > 0.05) {
            data[i] = Math.min(255, Math.max(0, Math.round((r - 255 * (1 - alpha)) / alpha)));
            data[i + 1] = Math.min(255, Math.max(0, Math.round((g - 255 * (1 - alpha)) / alpha)));
            data[i + 2] = Math.min(255, Math.max(0, Math.round((b - 255 * (1 - alpha)) / alpha)));
            rowYellowCounts[y]++;
            colYellowCounts[x]++;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // 2. Krok: Automatyczna detekcja położenia żarówki i napisu
      let bulbTop = -1;
      let bulbBottom = -1;
      let textTop = -1;
      let textBottom = -1;

      // Szukanie początku żarówki od góry
      for (let y = 0; y < height; y++) {
        if (rowYellowCounts[y] > 5) {
          bulbTop = y;
          break;
        }
      }

      // Szukanie przerwy między żarówką a napisem
      let gapFound = false;
      for (let y = bulbTop + 50; y < height; y++) {
        if (rowYellowCounts[y] <= 2) {
          if (!gapFound) {
            bulbBottom = y;
            gapFound = true;
          }
        } else if (gapFound) {
          textTop = y;
          break;
        }
      }

      // Szukanie końca napisu od dołu
      for (let y = height - 1; y >= 0; y--) {
        if (rowYellowCounts[y] > 5) {
          textBottom = y;
          break;
        }
      }

      // Bezpieczniki gdyby detekcja napotkała nietypowe dane
      if (bulbTop === -1) bulbTop = Math.floor(height * 0.25);
      if (bulbBottom === -1) bulbBottom = Math.floor(height * 0.61);
      if (textTop === -1) textTop = Math.floor(height * 0.62);
      if (textBottom === -1) textBottom = Math.floor(height * 0.74);

      // Szukanie granic poziomych dla żarówki
      let bulbLeft = width;
      let bulbRight = 0;
      for (let y = bulbTop; y <= bulbBottom; y++) {
        for (let x = 0; x < width; x++) {
          const a = data[(y * width + x) * 4 + 3];
          if (a > 30) {
            if (x < bulbLeft) bulbLeft = x;
            if (x > bulbRight) bulbRight = x;
          }
        }
      }

      // Szukanie granic całego logo
      let fullLeft = width;
      let fullRight = 0;
      for (let y = bulbTop; y <= textBottom; y++) {
        for (let x = 0; x < width; x++) {
          const a = data[(y * width + x) * 4 + 3];
          if (a > 30) {
            if (x < fullLeft) fullLeft = x;
            if (x > fullRight) fullRight = x;
          }
        }
      }

      // 3. Krok: Wygenerowanie przyciętego, czystego pełnego logo
      const fullPad = 16;
      const fullCropX = Math.max(0, fullLeft - fullPad);
      const fullCropY = Math.max(0, bulbTop - fullPad);
      const fullCropW = Math.min(width - fullCropX, (fullRight - fullLeft) + fullPad * 2);
      const fullCropH = Math.min(height - fullCropY, (textBottom - bulbTop) + fullPad * 2);

      const fullCanvas = document.createElement('canvas');
      fullCanvas.width = fullCropW;
      fullCanvas.height = fullCropH;
      const fullCtx = fullCanvas.getContext('2d');
      if (fullCtx) {
        fullCtx.drawImage(canvas, fullCropX, fullCropY, fullCropW, fullCropH, 0, 0, fullCropW, fullCropH);
      }
      const fullLogoUrl = fullCanvas.toDataURL('image/png');

      // 4. Krok: Wygenerowanie kwadratowego znaczka z samą żarówką (Bulb Only)
      const bulbPad = 12;
      const bWidth = (bulbRight - bulbLeft) + bulbPad * 2;
      const bHeight = (bulbBottom - bulbTop) + bulbPad * 2;
      const bulbSize = Math.max(bWidth, bHeight);

      const bulbCanvas = document.createElement('canvas');
      bulbCanvas.width = bulbSize;
      bulbCanvas.height = bulbSize;
      const bulbCtx = bulbCanvas.getContext('2d');
      if (bulbCtx) {
        // Centrowanie żarówki w kwadratowej ramce
        const offsetX = (bulbSize - (bulbRight - bulbLeft)) / 2;
        const offsetY = (bulbSize - (bulbBottom - bulbTop)) / 2;
        bulbCtx.drawImage(
          canvas,
          bulbLeft, bulbTop, (bulbRight - bulbLeft), (bulbBottom - bulbTop),
          offsetX, offsetY, (bulbRight - bulbLeft), (bulbBottom - bulbTop)
        );
      }
      const bulbOnlyUrl = bulbCanvas.toDataURL('image/png');

      cachedResult = {
        fullLogoUrl,
        bulbOnlyUrl,
        isReady: true
      };

      // Powiadomienie subskrybentów
      listeners.forEach((cb) => cb(cachedResult!));
    } catch (e) {
      console.warn('Nie udało się przetworzyć logo w locie:', e);
    }
  };

  img.onload = processImage;
  img.src = '/logo.png';
  if (img.complete) {
    processImage();
  }
}
