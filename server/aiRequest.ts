/**
 * Sanityzacja body dla endpointów AI.
 *
 * Cel: do logiki promptów nie może trafić nieograniczony tekst ani wielomegabajtowy
 * obraz. Wszystkie pola promptowe mają twarde limity, obrazy są walidowane pod
 * kątem typu i rozmiaru, a pola liczbowe są przycinane do sensownych zakresów.
 */

import { config } from './config';
import {
  badRequest,
  clampInt,
  isRecord,
  optionalDataImage,
  optionalText,
  readScoringKey,
  requireObjectBody,
} from './validation';

export type AiRequestKind = 'hint' | 'grade' | 'task';

function sanitizeRubric(value: unknown): Record<string, unknown> | undefined {
  if (!isRecord(value)) return undefined;
  return {
    max_points: clampInt(value.max_points, 0, 40, 2),
    criterion_1_point: optionalText(value.criterion_1_point, 1000, 'ai_tutor_rubric.criterion_1_point'),
    criterion_2_points: optionalText(value.criterion_2_points, 1000, 'ai_tutor_rubric.criterion_2_points'),
  };
}

function sanitizeSubQuestions(value: unknown): unknown {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'string') {
    return optionalText(value, config.maxPromptChars, 'subQuestions');
  }
  if (Array.isArray(value)) {
    if (value.length > 20) {
      throw badRequest('Zbyt wiele podpytań (limit 20).', { field: 'subQuestions', length: value.length });
    }
    return value.map((item, index) => optionalText(item, 1500, `subQuestions[${index}]`));
  }
  throw badRequest('Pole "subQuestions" musi być tekstem lub listą tekstów.');
}

export function sanitizeAiBody(raw: unknown, kind: AiRequestKind): Record<string, unknown> {
  const body = requireObjectBody(raw);
  const max = config.maxPromptChars;

  const image = optionalDataImage(body.studentImage, config.maxImageBytes, 'studentImage');

  const sanitized: Record<string, unknown> = {
    ...body,
    uid: optionalText(body.uid, 128, 'uid'),
    question: optionalText(body.question, max, 'question'),
    instruction: optionalText(body.instruction, max, 'instruction'),
    studentAnswer: optionalText(body.studentAnswer, max, 'studentAnswer'),
    staticHint: optionalText(body.staticHint, 2000, 'staticHint'),
    scoring_key: readScoringKey(body, max),
    taskType: optionalText(body.taskType, 64, 'taskType'),
    maxPoints: clampInt(body.maxPoints, 0, 40, 2),
    attemptCount: clampInt(body.attemptCount, 1, 50, 1),
    studentImage: image ? image.dataUrl : undefined,
    ai_tutor_rubric: sanitizeRubric(body.ai_tutor_rubric),
  };

  if (kind === 'task') {
    sanitized.subject = optionalText(body.subject, 64, 'subject') || 'matematyka';
    sanitized.topic = optionalText(body.topic, 200, 'topic') || 'Liczby rzeczywiste, potęgi i pierwiastki';
    sanitized.difficulty = optionalText(body.difficulty, 32, 'difficulty') || 'standard';
    sanitized.customPrompt = optionalText(body.customPrompt, 2000, 'customPrompt');
    sanitized.taskType = optionalText(body.taskType, 64, 'taskType') || 'SINGLE_CHOICE';
    return sanitized;
  }

  sanitized.contextText = optionalText(body.contextText, max, 'contextText');
  sanitized.subQuestions = sanitizeSubQuestions(body.subQuestions);
  sanitized.isPolish = body.isPolish === true;

  if (kind === 'grade' && String(sanitized.question ?? '').trim().length === 0) {
    throw badRequest('Brak treści zadania (pole "question").', { field: 'question' });
  }

  return sanitized;
}
