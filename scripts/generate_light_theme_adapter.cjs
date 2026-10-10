/**
 * Generator adaptera motywu jasnego (Solar Luminary).
 *
 * Komponenty mają setki kolorów ciemnego motywu wpisanych na sztywno w klasach Tailwind
 * (text-white, bg-[#0E1522], border-white/10, text-amber-300…). Zamiast przepisywać każdy
 * komponent, skrypt skanuje src/ i dla każdej takiej klasy generuje regułę `html.light .klasa`
 * z jasnym odpowiednikiem. Motyw ciemny pozostaje nietknięty – reguły działają tylko w .light.
 *
 * Uruchomienie:  node scripts/generate_light_theme_adapter.cjs
 * Wynik:         src/theme-light-adapter.css (plik generowany – nie edytować ręcznie)
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const OUT = path.join(SRC, 'theme-light-adapter.css');

// ---------- zbieranie klas ----------
function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '__tests__' || entry.name === 'scripts') continue;
      walk(full, files);
    } else if (/\.tsx?$/.test(entry.name) && !/\.test\./.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const PALETTE = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const NEUTRALS = new Set(['slate', 'gray', 'zinc', 'neutral', 'stone']);
const PROPS = ['bg', 'text', 'border', 'from', 'to', 'via', 'ring', 'divide', 'placeholder', 'fill', 'stroke'];
const CLASS_RE = new RegExp(
  `(?<![\\w:/\\[-])((?:(?:hover|focus|active|group-hover|focus-visible|disabled|sm|md|lg|xl|xs):)*)` +
  `(${PROPS.join('|')})-` +
  `(\\[#[0-9A-Fa-f]{3,8}\\]|white|black|(?:${PALETTE.join('|')})-\\d{2,3})` +
  `(?:/(\\d{1,3}|\\[[\\d.]+\\]))?(?![\\w/\\[-])`,
  'g'
);

const found = new Map();
for (const file of walk(SRC)) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = CLASS_RE.exec(text))) {
    const [full, prefix, prop, value, alpha] = m;
    if (prefix.includes('dark:')) continue;
    found.set(full, { prefix, prop, value, alpha });
  }
}

// ---------- kolory ----------
function hexToRgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3 || h.length === 4) h = h.split('').map(c => c + c).join('');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [h * 60, s, l];
}
function hslToRgb([h, s, l]) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}
const rgba = (rgb, a) => (a >= 1 ? `rgb(${rgb.join(' ')})` : `rgb(${rgb.join(' ')} / ${a})`);
const parseAlpha = alpha => {
  if (alpha === undefined) return 1;
  if (alpha.startsWith('[')) return parseFloat(alpha.slice(1, -1));
  return parseInt(alpha, 10) / 100;
};

// Tokeny Solar Luminary (DESIGN.md)
const INK = [15, 23, 42];          // text-primary  #0F172A
const INK_SOFT = [71, 85, 105];    // text-secondary #475569
const INK_MUTED = [100, 116, 139]; // text-muted    #64748B
const PAPER = [248, 249, 252];     // surface-bg    #F8F9FC
const CARD = [255, 255, 255];      // surface-card  #FFFFFF
const CARD_HOVER = [241, 245, 249];// surface-card-hover #F1F5F9
const LINE = [226, 232, 240];      // surface-border #E2E8F0
const BRAND = [217, 119, 6];       // primary #D97706
const AMBER_TEXT = [180, 83, 9];   // primary-hover #B45309 – bursztyn czytelny jako tekst (4.9:1 na bieli)

function relLuminance([r, g, b]) {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
const contrastWithWhite = rgb => 1.05 / (relLuminance(rgb) + 0.05);

// Przybliżone wartości palety Tailwind (odcień 500) – do wyliczania jasnych odpowiedników
const HUE = { red: 0, orange: 25, amber: 38, yellow: 45, lime: 84, green: 142, emerald: 160, teal: 173, cyan: 189, sky: 199, blue: 217, indigo: 239, violet: 258, purple: 271, fuchsia: 292, pink: 330, rose: 350 };
const SHADE_L = { 50: 0.97, 100: 0.94, 200: 0.87, 300: 0.77, 400: 0.65, 500: 0.53, 600: 0.45, 700: 0.38, 800: 0.30, 900: 0.24, 950: 0.14 };
const NEUTRAL_RGB = { 50: [248, 250, 252], 100: [241, 245, 249], 200: [226, 232, 240], 300: [203, 213, 225], 400: [148, 163, 184], 500: [100, 116, 139], 600: [71, 85, 105], 700: [51, 65, 85], 800: [30, 41, 59], 900: [15, 23, 42], 950: [2, 6, 23] };

/** Zwraca [h, s, l, neutral] dla wartości klasy albo null. */
function describe(value) {
  if (value === 'white') return { hsl: [0, 0, 1], neutral: true };
  if (value === 'black') return { hsl: [0, 0, 0], neutral: true };
  if (value.startsWith('[')) {
    const hsl = rgbToHsl(hexToRgb(value.slice(1, -1)));
    return { hsl, neutral: hsl[1] < 0.3 };
  }
  const [name, shadeStr] = value.split('-');
  const shade = parseInt(shadeStr, 10);
  if (!(shade in SHADE_L)) return null;
  if (NEUTRALS.has(name)) return { hsl: rgbToHsl(NEUTRAL_RGB[shade]), neutral: true };
  return { hsl: [HUE[name], 0.8, SHADE_L[shade]], neutral: false };
}

/** Jasny odpowiednik koloru dla danej właściwości; null = zostaw bez zmian. */
function lightColor(prop, value, alpha) {
  const info = describe(value);
  if (!info) return null;
  const [h, s, l] = info.hsl;
  const a = parseAlpha(alpha);
  const isTextLike = prop === 'text' || prop === 'placeholder' || prop === 'fill' || prop === 'stroke';
  const isSurface = prop === 'bg' || prop === 'from' || prop === 'to' || prop === 'via';

  if (isTextLike) {
    // Decyduje faktyczny kontrast z białą kartą (WCAG), a nie sama jasność HSL –
    // bursztyn #FFB800 ma L=0.5, ale na bieli daje tylko 1.7:1.
    const rgb = hslToRgb([h, s, l]);
    if (contrastWithWhite(rgb) >= 4) return null; // czytelny na jasnym tle (także na jasnych tintach)
    if (info.neutral) {
      if (l > 0.85) return rgba(INK, a);
      if (l > 0.7) return rgba(INK_SOFT, a);
      return rgba(INK_MUTED, a);
    }
    // nasycony jasny akcent (np. bursztyn #FFB800, #ffdca1, emerald-300) → ten sam odcień, ciemniejszy
    if (h >= 30 && h <= 52) return rgba(l > 0.75 ? [146, 64, 14] : AMBER_TEXT, a);
    return rgba(hslToRgb([h, Math.min(0.85, Math.max(s, 0.6)), 0.33]), a);
  }

  if (isSurface) {
    if (value === 'white') {
      // półprzezroczysta biel = delikatne rozjaśnienie na ciemnym tle → delikatne przyciemnienie na jasnym
      return a < 1 ? rgba(INK, Math.min(0.1, Math.max(0.03, a * 0.7))) : null;
    }
    if (value === 'black') {
      // mocne przyciemnienia (tła modali) zostają; słabe to „studnie” pod wzorami → delikatny szary
      return a <= 0.5 ? rgba(INK, Math.max(0.03, a * 0.12)) : null;
    }
    if (l > 0.28) return null; // jasne i średnie tła (przyciski, akcenty) zostają
    if (info.neutral || s < 0.45) {
      const base = l < 0.065 ? PAPER : l < 0.105 ? CARD : CARD_HOVER;
      return rgba(base, a);
    }
    // ciemne, nasycone tło (np. emerald-950/40) → bardzo jasny tint tego samego odcienia
    return rgba(hslToRgb([h, 0.7, 0.95]), Math.max(a, 0.6));
  }

  // border / ring / divide
  if (value === 'white') return rgba(INK, Math.min(0.22, Math.max(0.1, a * 1.3)));
  if (value === 'black') return null;
  if (info.neutral || s < 0.45) {
    if (l < 0.45) return rgba(LINE, 1);
    return null;
  }
  if (l > 0.72) return rgba(hslToRgb([h, 0.75, 0.55]), a); // bardzo jasne obramowania akcentowe
  return null;
}

const CSS_PROP = {
  bg: c => `background-color: ${c};`,
  text: c => `color: ${c};`,
  border: c => `border-color: ${c};`,
  ring: c => `--tw-ring-color: ${c};`,
  divide: c => `border-color: ${c};`,
  placeholder: c => `color: ${c};`,
  fill: c => `fill: ${c};`,
  stroke: c => `stroke: ${c};`,
  from: c => `--tw-gradient-from: ${c};`,
  to: c => `--tw-gradient-to: ${c};`,
  via: c => `--tw-gradient-via: ${c};`,
};

const STATE = { hover: ':hover', focus: ':focus', active: ':active', 'focus-visible': ':focus-visible', disabled: ':disabled' };
const escapeClass = cls => cls.replace(/([^a-zA-Z0-9_-])/g, '\\$1');

const rules = [];
for (const [cls, { prefix, prop, value, alpha }] of [...found.entries()].sort()) {
  const color = lightColor(prop, value, alpha);
  if (!color) continue;
  const variants = prefix.split(':').filter(Boolean);
  let selector = `.${escapeClass(cls)}`;
  let groupHover = false;
  for (const v of variants) {
    if (STATE[v]) selector += STATE[v];
    else if (v === 'group-hover') groupHover = true;
  }
  if (prop === 'placeholder') selector += '::placeholder';
  if (prop === 'divide') selector += ' > :not(:last-child)';
  const scoped = groupHover ? `html.light .group:hover ${selector}` : `html.light ${selector}`;
  rules.push(`${scoped} { ${CSS_PROP[prop](color)} }`);
}

// Biały tekst na pełnych, nasyconych tłach (przyciski akcji) musi pozostać biały.
const SOLID = [];
for (const name of Object.keys(HUE)) {
  if (name === 'amber' || name === 'yellow' || name === 'lime') continue; // na żółciach tekst jest ciemny
  for (const shade of [500, 600, 700, 800]) SOLID.push(`[class~="bg-${name}-${shade}"]`);
}
const solidList = SOLID.join(',\n  ');
const keepWhite = `
/* Biały tekst na pełnych kolorowych tłach (przyciski akcji) zostaje biały */
html.light :is(
  ${solidList}
).text-white,
html.light :is(
  ${solidList}
) .text-white,
html.light :is(
  ${solidList}
).text-text-strong,
html.light :is(
  ${solidList}
) .text-text-strong {
  color: #fff;
}
`;

const header = `/* PLIK GENEROWANY – nie edytuj ręcznie.
   Źródło: scripts/generate_light_theme_adapter.cjs  (node scripts/generate_light_theme_adapter.cjs)
   Mapuje kolory ciemnego motywu wpisane na sztywno w komponentach na tokeny Solar Luminary.
   Reguł: ${rules.length} (z ${found.size} znalezionych klas kolorów). */
`;

fs.writeFileSync(OUT, `${header}\n${rules.join('\n')}\n${keepWhite}`, 'utf8');
console.log(`Wygenerowano ${rules.length} reguł z ${found.size} klas → ${path.relative(process.cwd(), OUT)}`);
