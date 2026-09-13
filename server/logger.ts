/**
 * Minimalny, zależnościowo zerowy logger strukturalny (JSON lines).
 *
 * Dlaczego JSON lines, a nie console.log z ludzkim tekstem:
 * - logi produkcyjne są parsowalne przez dowolny kolektor (Vercel, Cloud Run, Loki),
 * - można po nich filtrować (np. `provider="rubric-fallback"`) i liczyć odsetek
 *   odpowiedzi, które NIE pochodzą od modelu AI.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

export type LogFields = Record<string, unknown>;

function resolveLevel(): LogLevel {
  const raw = String(process.env.LOG_LEVEL || '').toLowerCase();
  if (raw === 'debug' || raw === 'info' || raw === 'warn' || raw === 'error') {
    return raw;
  }
  return process.env.NODE_ENV === 'production' ? 'info' : 'debug';
}

function emit(level: LogLevel, message: string, fields?: LogFields): void {
  if (LEVEL_WEIGHT[level] < LEVEL_WEIGHT[resolveLevel()]) return;

  let line: string;
  try {
    line = JSON.stringify({ ts: new Date().toISOString(), level, msg: message, ...fields });
  } catch {
    // Nigdy nie wywracaj requestu z powodu logowania.
    line = JSON.stringify({ ts: new Date().toISOString(), level, msg: message });
  }

  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

export const logger = {
  debug: (message: string, fields?: LogFields) => emit('debug', message, fields),
  info: (message: string, fields?: LogFields) => emit('info', message, fields),
  warn: (message: string, fields?: LogFields) => emit('warn', message, fields),
  error: (message: string, fields?: LogFields) => emit('error', message, fields),
};
