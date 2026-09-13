/**
 * Limiter zapytań w pamięci procesu (sliding window z licznikiem okienkowym).
 *
 * Świadomie bez zależności zewnętrznych. Ograniczenie: przy wielu instancjach
 * (skalowanie poziome) licznik jest per-instancja — dla pełnej ochrony należy
 * przenieść go do Redisa / Firestore. Dla obecnej skali (jeden kontener BFF)
 * to wystarczające i natychmiastowe zabezpieczenie kosztów API.
 */

import type { NextFunction, Request, Response } from 'express';
import { logger } from './logger';

export interface RateLimitRule {
  /** Nazwa koszyka — osobne limity dla różnych klas endpointów. */
  bucket: string;
  windowMs: number;
  max: number;
}

type Counter = { count: number; resetAt: number };

export interface RateLimiterOptions {
  rules: RateLimitRule[];
  /** Maksymalna liczba kluczy trzymanych w pamięci (ochrona przed DoS pamięci). */
  maxKeys?: number;
}

export interface RateLimiter {
  middleware: (req: Request, res: Response, next: NextFunction) => void;
  /** Do testów i diagnostyki. */
  snapshot: () => { keys: number };
  /** Do testów: czyści stan. */
  reset: () => void;
}

/** Klucz limitera: IP + (jeśli znany) uid. Uwierzytelniony użytkownik ma własny koszyk. */
function buildKey(req: Request, bucket: string): string {
  const ip = req.ip || req.socket?.remoteAddress || 'unknown';
  const uid = typeof (req.body as Record<string, unknown> | undefined)?.uid === 'string'
    ? String((req.body as Record<string, unknown>).uid).slice(0, 128)
    : 'anon';
  return `${bucket}|${ip}|${uid}`;
}

export function createRateLimiter(options: RateLimiterOptions): RateLimiter {
  const maxKeys = options.maxKeys ?? 20_000;
  const counters = new Map<string, Counter>();

  // Okresowe czyszczenie wygasłych wpisów; unref(), aby nie blokować zamykania procesu.
  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [key, counter] of counters) {
      if (counter.resetAt <= now) counters.delete(key);
    }
  }, 60_000);
  if (typeof sweep.unref === 'function') sweep.unref();

  function hit(key: string, rule: RateLimitRule): { allowed: boolean; remaining: number; retryAfterSec: number } {
    const now = Date.now();
    const existing = counters.get(key);

    if (!existing || existing.resetAt <= now) {
      if (counters.size >= maxKeys) {
        // Twardy limit pamięci: czyścimy wpisy, które i tak wygasły.
        for (const [k, c] of counters) {
          if (c.resetAt <= now) counters.delete(k);
        }
        if (counters.size >= maxKeys) counters.clear();
      }
      counters.set(key, { count: 1, resetAt: now + rule.windowMs });
      return { allowed: true, remaining: rule.max - 1, retryAfterSec: 0 };
    }

    existing.count += 1;
    const remaining = Math.max(0, rule.max - existing.count);
    if (existing.count > rule.max) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      };
    }
    return { allowed: true, remaining, retryAfterSec: 0 };
  }

  const middleware = (req: Request, res: Response, next: NextFunction): void => {
    // Nie limitujemy preflightów — nie kosztują niczego poza CPU.
    if (req.method === 'OPTIONS') {
      next();
      return;
    }

    for (const rule of options.rules) {
      const key = buildKey(req, rule.bucket);
      const result = hit(key, rule);

      res.setHeader('X-RateLimit-Limit', String(rule.max));
      res.setHeader('X-RateLimit-Remaining', String(result.remaining));

      if (!result.allowed) {
        res.setHeader('Retry-After', String(result.retryAfterSec));
        logger.warn('rate_limit_exceeded', {
          bucket: rule.bucket,
          path: req.path,
          ip: req.ip,
          retryAfterSec: result.retryAfterSec,
        });
        res.status(429).json({
          error: 'Zbyt wiele żądań. Spróbuj ponownie za chwilę.',
          code: 'rate_limited',
          retryAfterSeconds: result.retryAfterSec,
        });
        return;
      }
    }

    next();
  };

  return {
    middleware,
    snapshot: () => ({ keys: counters.size }),
    reset: () => counters.clear(),
  };
}
