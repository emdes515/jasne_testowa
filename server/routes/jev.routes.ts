import { Router, type NextFunction, type Request, type Response } from 'express';
import { failRoute } from '../middleware/errorHandler';
import type { RateLimiter } from '../rateLimit';
import { diagnoseWithJev, type JevDiagnosticInput } from '../services/jevDiagnostic.service';

export const createJevRouter = (aiLimiter: RateLimiter): Router => {
  const router = Router();

  /**
   * POST /api/jev/diagnose
   * Ultra-fast System 1 AI classification of student mistakes using TypeSafe AI Jev 1.13.
   */
  router.post('/jev/diagnose', aiLimiter.middleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, question, studentAnswer, correctAnswer, explanation, ckeTrap, options } = req.body;

      if (!question || typeof question !== 'string' || !studentAnswer || typeof studentAnswer !== 'string') {
        return res.status(400).json({
          error: 'Brakujące wymagane pola: question oraz studentAnswer są wymagane.',
          code: 'bad_request'
        });
      }

      const input: JevDiagnosticInput = {
        taskId: typeof taskId === 'string' ? taskId : undefined,
        question,
        studentAnswer,
        correctAnswer: typeof correctAnswer === 'string' ? correctAnswer : undefined,
        explanation: typeof explanation === 'string' ? explanation : undefined,
        ckeTrap: typeof ckeTrap === 'string' ? ckeTrap : undefined,
        options: Array.isArray(options) ? options : undefined
      };

      const diagnostic = await diagnoseWithJev(input);
      return res.json(diagnostic);
    } catch (error) {
      return failRoute(res, next, error, 'Nie udało się przeprowadzić diagnostyki błędu.');
    }
  });

  return router;
};
