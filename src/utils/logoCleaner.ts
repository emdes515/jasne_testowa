/**
 * logoCleaner.ts
 * Zapewnia kompatybilność wsteczną dla adresów logo SVG i PNG.
 */

export interface CleanLogoResult {
  fullLogoUrl: string;
  bulbOnlyUrl: string;
  isReady: boolean;
}

const defaultResult: CleanLogoResult = {
  fullLogoUrl: '/logo.svg',
  bulbOnlyUrl: '/logo-bulb.svg',
  isReady: true
};

export function getCleanLogoUrls(): CleanLogoResult {
  return defaultResult;
}

export function subscribeCleanLogo(callback: (result: CleanLogoResult) => void): () => void {
  callback(defaultResult);
  return () => {};
}

export default getCleanLogoUrls;
