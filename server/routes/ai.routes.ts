import { Router, type NextFunction, type Request, type Response } from 'express';
import { sanitizeAiBody } from '../aiRequest';
import { isRecord, oneOf } from '../validation';
import { failRoute } from '../middleware/errorHandler';
import type { RateLimiter } from '../rateLimit';
import { generateTaskLogic } from '../services/taskGenerator.service';
import { gradeWithFallback } from '../services/taskEvaluator.service';
import { hintWithFallback } from '../services/hint.service';

export const createAiRouter = (aiLimiter: RateLimiter): Router => {
  const router = Router();

  // AI Task Generator Endpoint
  router.post('/generate-task', aiLimiter.middleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = sanitizeAiBody(req.body, 'task');
      const task = await generateTaskLogic(body);
      return res.json(task);
    } catch (error) {
      return failRoute(res, next, error, 'Nie udało się wygenerować zadania.');
    }
  });

  // AI Tutor Universal Endpoint (supports both 'hint' and 'grade' modes)
  router.post('/ai-tutor', aiLimiter.middleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestedMode = isRecord(req.body) ? req.body.mode : undefined;
      const mode = oneOf(requestedMode, ['hint', 'grade'] as const, 'hint');
      const body = sanitizeAiBody(req.body, mode === 'grade' ? 'grade' : 'hint');

      if (mode === 'grade') {
        return res.json(await gradeWithFallback(body));
      }
      return res.json(await hintWithFallback(body));
    } catch (error) {
      return failRoute(res, next, error, 'Nie udało się przetworzyć odpowiedzi.');
    }
  });

  // Dedicated AI Hint endpoint alias
  router.post('/hint', aiLimiter.middleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = sanitizeAiBody(req.body, 'hint');
      return res.json(await hintWithFallback(body));
    } catch (error) {
      return failRoute(res, next, error, 'Nie udało się wygenerować podpowiedzi.');
    }
  });

  // Strict Matura Task Evaluation Endpoint
  router.post('/evaluate-task', aiLimiter.middleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestedMode = isRecord(req.body) ? req.body.mode : undefined;
      const mode = oneOf(requestedMode, ['hint', 'grade'] as const, 'grade');
      const body = sanitizeAiBody(req.body, mode === 'hint' ? 'hint' : 'grade');

      if (mode === 'hint') {
        return res.json(await hintWithFallback(body));
      }
      return res.json(await gradeWithFallback(body));
    } catch (error) {
      return failRoute(res, next, error, 'Nie udało się ocenić zadania.');
    }
  });

  return router;
};
