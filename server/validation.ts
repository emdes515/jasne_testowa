/**
 * Walidacja wejścia dla endpointów /api/*.
 *
 * Bez zewnętrznych zależności (brak zod) — świadomie, aby nie zwiększać
 * powierzchni supply-chain i nie wymagać instalacji pakietów w środowisku
 * produkcyjnym. Każdy parser rzuca `HttpError` z kodem HTTP, który middleware
 * błędów zamienia na odpowiedź JSON.
 */

export class HttpError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: Record<string, unknown>;

  constructor(status: number, code: string, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function badRequest(message: string, details?: Record<string, unknown>): HttpError {
  return new HttpError(400, 'invalid_request', message, details);
}

export function payloadTooLarge(message: string, details?: Record<string, unknown>): HttpError {
  return new HttpError(413, 'payload_too_large', message, details);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Wymaga obiektu JSON w body (odrzuca tablice, stringi, null). */
export function requireObjectBody(body: unknown): Record<string, unknown> {
  if (!isRecord(body)) {
    throw badRequest('Body żądania musi być obiektem JSON.');
  }
  return body;
}

/**
 * Zwraca przycięty string albo fallback, jeśli brak wartości.
 *
 * Liczby i wartości logiczne są koercowane do tekstu (klient potrafi przysłać
 * wynik zadania numerycznego jako number) — to nie jest błąd, ale obiekty i
 * tablice są odrzucane, bo nie mają sensownej reprezentacji w prompcie.
 */
export function optionalText(value: unknown, maxLength: number, field: string): string {
  if (value === undefined || value === null) return '';
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value).slice(0, maxLength);
  }
  if (typeof value !== 'string') {
    throw badRequest(`Pole "${field}" musi być tekstem.`);
  }
  if (value.length > maxLength) {
    throw badRequest(`Pole "${field}" przekracza limit ${maxLength} znaków.`, {
      field,
      length: value.length,
      maxLength,
    });
  }
  return value;
}

/** Pole wymagane, niepuste. */
export function requiredText(value: unknown, maxLength: number, field: string): string {
  const text = optionalText(value, maxLength, field).trim();
  if (text.length === 0) {
    throw badRequest(`Pole "${field}" jest wymagane.`, { field });
  }
  return text;
}

const ALLOWED_IMAGE_MIME = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'] as const;

export type DataImage = {
  /** Pełny data URL, gotowy do przekazania do modelu. */
  dataUrl: string;
  /** Część base64 (bez nagłówka). */
  base64: string;
  mimeType: string;
  bytes: number;
};

/**
 * Waliduje obraz przysłany z klienta jako data URL.
 * Odrzuca: obcy MIME, uszkodzony base64, obrazy powyżej limitu rozmiaru.
 */
export function optionalDataImage(value: unknown, maxBytes: number, field = 'image'): DataImage | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') {
    throw badRequest(`Pole "${field}" musi być data URL.`, { field });
  }
  if (!value.startsWith('data:')) {
    throw badRequest(`Pole "${field}" musi być data URL rozpoczynającym się od "data:".`, { field });
  }

  const match = /^data:([a-z]+\/[a-z0-9.+-]+);base64,(.+)$/i.exec(value);
  if (!match) {
    throw badRequest(`Pole "${field}" ma nieobsługiwany format data URL.`, { field });
  }

  const mimeType = match[1].toLowerCase();
  const base64 = match[2];

  if (!(ALLOWED_IMAGE_MIME as readonly string[]).includes(mimeType)) {
    throw badRequest(`Nieobsługiwany typ obrazu: ${mimeType}.`, { field, mimeType });
  }

  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) {
    throw badRequest(`Pole "${field}" nie jest poprawnym base64.`, { field });
  }

  // 4 znaki base64 = 3 bajty; odejmujemy padding.
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  const bytes = Math.floor((base64.length * 3) / 4) - padding;

  if (bytes <= 0) {
    throw badRequest(`Pole "${field}" jest pustym obrazem.`, { field });
  }
  if (bytes > maxBytes) {
    throw payloadTooLarge(`Obraz jest za duży: ${Math.round(bytes / 1024)} KB (limit ${Math.round(maxBytes / 1024)} KB).`, {
      field,
      bytes,
      maxBytes,
    });
  }

  return { dataUrl: value, base64, mimeType, bytes };
}

/** Dozwolona wartość z listy (case-insensitive), inaczej fallback. */
export function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  if (typeof value !== 'string') return fallback;
  const normalized = value.trim().toLowerCase();
  const found = allowed.find(option => option.toLowerCase() === normalized);
  return found ?? fallback;
}

/** Liczba całkowita w zakresie, z wartością domyślną dla wejścia niepoprawnego. */
export function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  const parsed = typeof value === 'number' ? value : Number.parseInt(String(value ?? ''), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(parsed)));
}

/** Uwzględnia zarówno `scoring_key`, jak i `scoringKey` (zgodność wsteczna). */
export function readScoringKey(body: Record<string, unknown>, maxLength: number): string {
  return (
    optionalText(body.scoring_key, maxLength, 'scoring_key') ||
    optionalText(body.scoringKey, maxLength, 'scoringKey') ||
    optionalText(body.officialKey, maxLength, 'officialKey')
  );
}
