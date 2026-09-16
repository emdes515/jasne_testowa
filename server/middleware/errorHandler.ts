import type { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import { logger } from '../logger';
import { HttpError, isRecord } from '../validation';

/**
 * Błąd, który nie jest błędem klienta, logujemy i zwracamy bezpieczny komunikat.
 */
export const failRoute = (res: Response, next: NextFunction, error: unknown, publicMessage: string): void => {
  if (error instanceof HttpError) {
    next(error);
    return;
  }
  logger.error('route_error', {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
  res.status(500).json({ error: publicMessage, code: 'internal_error' });
};

/**
 * Centralny error handler Express — musi być zarejestrowany jako ostatni.
 */
export const centralErrorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof HttpError) {
    logger.warn('request_rejected', { status: error.status, code: error.code, message: error.message });
    res.status(error.status).json({
      error: error.message,
      code: error.code,
      ...(error.details ? { details: error.details } : {}),
    });
    return;
  }

  const type = isRecord(error) ? error.type : undefined;
  if (type === 'entity.too.large') {
    res.status(413).json({
      error: `Żądanie przekracza limit rozmiaru (${config.jsonBodyLimit}).`,
      code: 'payload_too_large',
    });
    return;
  }
  if (type === 'entity.parse.failed') {
    res.status(400).json({ error: 'Nieprawidłowy JSON w body żądania.', code: 'invalid_json' });
    return;
  }

  logger.error('unhandled_error', {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
  res.status(500).json({ error: 'Wewnętrzny błąd serwera.', code: 'internal_error' });
};
