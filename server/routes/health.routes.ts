import { Router, type Request, type Response } from 'express';
import { config, getAiModelConfig, resolveOpenRouterApiKey } from '../config';
import type { RateLimiter } from '../rateLimit';

export const createHealthRouter = (apiLimiter: RateLimiter): Router => {
  const router = Router();

  router.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      models: getAiModelConfig(),
      providers: {
        gemini: Boolean(config.geminiApiKey),
        openRouter: Boolean(resolveOpenRouterApiKey()),
      },
      rateLimit: apiLimiter.snapshot(),
    });
  });

  return router;
};
