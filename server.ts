// UWAGA: `./server/config` ładuje dotenv i odczytuje zmienne środowiskowe już
// na etapie importu, dlatego nie wolno przenosić go poniżej żadnego kodu, który
// czyta process.env.
import { config, resolveOpenRouterApiKey, warnAboutLegacySecrets } from './server/config';
import { logger } from './server/logger';
import { createApp } from './server/app';

// Świadomie NIE wyłączamy weryfikacji certyfikatów TLS. Poprzednia wersja
// ustawiała NODE_TLS_REJECT_UNAUTHORIZED=0 w trybie deweloperskim, co otwierało
// drogę do ataku man-in-the-middle na wszystkie wychodzące połączenia HTTPS.
// Jeśli lokalne proxy firmowe wymaga własnego CA, użyj NODE_EXTRA_CA_CERTS.

async function startServer(): Promise<void> {
  const { app } = await createApp();
  const PORT = config.port;

  const server = app.listen(PORT, '0.0.0.0', () => {
    logger.info('server_started', {
      url: `http://localhost:${PORT}`,
      environment: config.nodeEnv,
      geminiConfigured: Boolean(config.geminiApiKey),
      openRouterConfigured: Boolean(resolveOpenRouterApiKey()),
    });
    warnAboutLegacySecrets();
    if (!config.geminiApiKey && !resolveOpenRouterApiKey()) {
      logger.warn('no_ai_provider_configured', {
        hint: 'Ustaw GEMINI_API_KEY lub OPENROUTER_API_KEY, inaczej ocena zadań użyje wyłącznie fallbacku rubric.',
      });
    }
  });

  server.requestTimeout = 60_000;
  server.headersTimeout = 65_000;
  server.keepAliveTimeout = 30_000;

  const shutdown = (signal: string): void => {
    logger.info('shutdown_started', { signal });
    server.close(() => {
      logger.info('shutdown_complete', { signal });
      process.exit(0);
    });
    setTimeout(() => {
      logger.warn('shutdown_forced', { signal });
      process.exit(1);
    }, 10_000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

startServer();
