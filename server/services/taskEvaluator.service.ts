import { getAiModelConfig } from '../config';
import { logger } from '../logger';
import { extractStructuredJson, deepSanitizeLatex } from '../ai/latexSanitizer';
import { geminiChain, getGenAI, Type } from '../ai/geminiClient';
import { callOpenRouter } from '../ai/openRouterClient';
import {
  buildEnglishEvaluationPrompt,
  buildEssay35EvaluationPrompt,
  buildEvaluationUserPrompt,
  buildMathEvaluationPrompt,
  buildPolishEvaluationPrompt,
} from '../prompts/evaluation.prompt';
import { evaluateFallback } from './fallbackEvaluator.service';

/**
 * Strict Matura Task Evaluation Logic (OpenRouter -> Gemini -> Rubric fallback)
 */
export const evaluateTaskLogic = async (body: any) => {
  const {
    question,
    contextText,
    subQuestions,
    officialKey,
    scoring_key,
    scoringKey,
    studentAnswer,
    taskType,
    maxPoints,
    studentImage,
    ai_tutor_rubric,
    attemptCount = 1,
  } = body;

  const maxPts = maxPoints || 2;
  const isFirstAttempt = attemptCount === 1;
  let keyCriterion = '';
  const rawKey = scoring_key || scoringKey || officialKey || '';
  if (typeof rawKey === 'string') {
    keyCriterion = rawKey;
  } else if (Array.isArray(rawKey)) {
    keyCriterion = rawKey.map((item: any) => (typeof item === 'string' ? item : JSON.stringify(item))).join('\n');
  } else if (rawKey && typeof rawKey === 'object') {
    keyCriterion = Object.entries(rawKey).map(([k, v]) => `${k}: ${typeof v === 'string' ? v : JSON.stringify(v)}`).join('\n');
  } else {
    keyCriterion = String(rawKey || '');
  }

  const isEnglishTask = Boolean(
    body.isEnglish === true ||
    body.subjectId === 'jezyk-angielski' ||
    body.subjectId === 'jezyk-angielski-rozszerzony' ||
    taskType === 'OPEN_ENGLISH' ||
    taskType === 'KEY_WORD_TRANSFORMATION' ||
    taskType === 'TRANSLATION' ||
    taskType === 'WORD_FORMATION' ||
    taskType === 'ENGLISH_WRITING' ||
    taskType === 'DIALOGUE_COMPLETION' ||
    taskType === 'OPEN_GAP_FILL' ||
    (typeof question === 'string' && (question.includes('angielsk') || question.includes('przetłumacz') || question.includes('wyraz ze słowem') || question.includes('nawiasie')))
  );

  const isPolishTask = !isEnglishTask && Boolean(
    body.isPolish === true ||
    body.subjectId === 'jezyk-polski' ||
    taskType === 'OPEN_POLISH' ||
    taskType === 'OPEN_SHORT' ||
    taskType === 'OPEN_SYNTHESIS' ||
    taskType === 'ESSAY' ||
    (taskType === 'OPEN_TASK' && !isEnglishTask) ||
    (typeof question === 'string' && (question.includes('tekst') || question.includes('lektur') || question.includes('bohater') || question.includes('motyw') || question.includes('Wokulsk') || question.includes('Kmicic') || question.includes('Hiob') || question.includes('wypracowan') || question.includes('rozprawk') || question.includes('esej')))
  );

  // Check if student answer is empty or too short / gibberish
  const cleanAnswer = typeof studentAnswer === 'string' ? studentAnswer.trim() : JSON.stringify(studentAnswer || '');
  const isMultipleChoice = taskType === 'multiple-choice';
  const hasImage = Boolean(studentImage && typeof studentImage === 'string' && studentImage.startsWith('data:image/'));
  const isGibberish = !isMultipleChoice && (
    ((isPolishTask || isEnglishTask) && cleanAnswer.length < 2) ||
    /^(asdf|qwer|xyz|1234|abc|cokolwiek|nie wiem|\s*test\s*|aaa)+$/i.test(cleanAnswer)
  );

  if ((isGibberish || cleanAnswer.length === 0) && !hasImage) {
    return {
      score: 0,
      maxPoints: maxPts,
      isPassed: false,
      gradeTitle: 'Niepoprawna odpowiedź (0 pkt)',
      summary: 'Odpowiedź jest zbyt krótka, pusta lub nie zawiera merytorycznych treści.',
      mentorComment: isEnglishTask
        ? 'Wpisz swoją odpowiedź w języku angielskim za pomocą klawiatury, aby egzaminator mógł ją ocenić.'
        : 'Wprowadź swoje rozwiązanie za pomocą klawiatury lub rozpisz je na tablicy, aby egzaminator mógł je ocenić.',
      strengths: [],
      errors: ['Brak merytorycznej odpowiedzi.'],
      ckeFeedback: 'Zgodnie z zasadami maturalnymi brak odpowiedzi lub przypadkowe znaki skutkują przyznaniem 0 punktów.',
      suggestion: 'Przeanalizuj polecenie i podany kontekst, a następnie spróbuj ponownie.',
      hintForNextAttempt: 'W kolejnej próbie upewnij się, że wpisujesz kompletną frazę lub zdanie.',
    };
  }

  const isEssay35 = isPolishTask && (maxPts >= 30 || taskType === 'ESSAY');

  let systemPrompt = '';
  if (isEnglishTask) {
    systemPrompt = buildEnglishEvaluationPrompt(maxPts);
  } else if (isEssay35) {
    systemPrompt = buildEssay35EvaluationPrompt();
  } else if (isPolishTask) {
    systemPrompt = buildPolishEvaluationPrompt(maxPts);
  } else {
    systemPrompt = buildMathEvaluationPrompt(maxPts);
  }

  const userPrompt = buildEvaluationUserPrompt({
    taskType,
    maxPts,
    question,
    contextText,
    subQuestions,
    keyCriterion,
    aiTutorRubric: ai_tutor_rubric,
    attemptCount,
    cleanAnswer,
    hasImage,
  });

  // 1. Try OpenRouter
  const openRouterReply = await callOpenRouter({
    systemPrompt,
    userPrompt,
    imageBase64: hasImage ? studentImage : undefined,
    isVisionNeeded: hasImage,
    jsonMode: true,
  });

  if (openRouterReply?.content) {
    const parsed = extractStructuredJson(openRouterReply.content);
    logger.debug('evaluate_task_openrouter_result', {
      model: openRouterReply.usage?.model,
      snippet: openRouterReply.content.slice(0, 150),
      parsedScore: parsed && typeof parsed.score === 'number' ? parsed.score : null,
    });
    if (parsed && typeof parsed.score === 'number') {
      parsed.score = Math.min(maxPts, Math.max(0, Math.round(parsed.score)));
      parsed.maxPoints = maxPts;
      parsed.isPassed = typeof parsed.isPassed === 'boolean' ? parsed.isPassed : (parsed.score >= Math.ceil(maxPts * 0.5));
      if (!parsed.gradeTitle || !parsed.gradeTitle.includes('/')) {
        const detail = parsed.gradeTitle ? ` – ${parsed.gradeTitle}` : (
          parsed.score === maxPts
            ? ' – Kompletne i bezbłędne rozwiązanie'
            : parsed.score > 0
              ? ' – Zasadniczy postęp'
              : ' – Brak poprawnego toku rozwiązania'
        );
        parsed.gradeTitle = `${parsed.score} / ${maxPts} PKT${detail}`;
      }
      parsed.usage = openRouterReply.usage;
      return parsed;
    }
  }

  // 2. Try Gemini
  const ai = getGenAI();
  const aiModels = getAiModelConfig();

  if (ai) {
    const contents: any[] = [`${systemPrompt}\n\n${userPrompt}`];
    if (hasImage) {
      const base64Data = studentImage.split(',')[1];
      const mimeType = studentImage.split(';')[0].split(':')[1];
      contents.push({
        inlineData: { data: base64Data, mimeType },
      });
    }

    const evaluationConfig = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: 'Uzyskana liczba punktów (0 do maxPoints)' },
          maxPoints: { type: Type.NUMBER, description: 'Maksymalna liczba punktów' },
          isPassed: { type: Type.BOOLEAN, description: 'True jeśli score >= połowa maxPoints' },
          gradeTitle: { type: Type.STRING, description: 'Tytuł oceny np. 2/2 PKT – Maksimum' },
          summary: { type: Type.STRING, description: 'Krótkie podsumowanie oceny' },
          mentorComment: { type: Type.STRING, description: 'Krótki, mentorski komentarz egzaminatora' },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Lista poprawnych elementów w odpowiedzi' },
          errors: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'Lista brakujących elementów lub błędów' },
          ckeFeedback: { type: Type.STRING, description: 'Komentarz egzaminatora maturalnego' },
          suggestion: { type: Type.STRING, description: 'Instrukcja/porada dla ucznia' },
          hintForNextAttempt: { type: Type.STRING, description: 'Wskazówka naprowadzająca' },
          criteriaBreakdown: {
            type: Type.OBJECT,
            description: 'Szczegółowa ocena 4 kryteriów CKE dla wypracowania',
            properties: {
              formal: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.NUMBER },
                  max: { type: Type.NUMBER },
                  comment: { type: Type.STRING },
                },
              },
              literary_cultural: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.NUMBER },
                  max: { type: Type.NUMBER },
                  comment: { type: Type.STRING },
                },
              },
              composition: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.NUMBER },
                  max: { type: Type.NUMBER },
                  comment: { type: Type.STRING },
                },
              },
              language_style: {
                type: Type.OBJECT,
                properties: {
                  score: { type: Type.NUMBER },
                  max: { type: Type.NUMBER },
                  comment: { type: Type.STRING },
                },
              },
            },
          },
        },
        required: ['score', 'maxPoints', 'isPassed', 'gradeTitle', 'summary', 'mentorComment', 'strengths', 'errors', 'ckeFeedback', 'suggestion', 'hintForNextAttempt'],
      },
    };

    try {
      let response: any = null;
      let usedModel = '';
      for (const model of geminiChain(aiModels.grade)) {
        try {
          response = await ai.models.generateContent({
            model,
            contents,
            config: evaluationConfig,
          });
          usedModel = model;
          break;
        } catch (modelError) {
          logger.debug('gemini_model_failed', {
            stage: 'grade',
            model,
            error: modelError instanceof Error ? modelError.message : String(modelError),
          });
        }
      }

      if (response?.text) {
        const parsed = extractStructuredJson(response.text) || (() => {
          try {
            return deepSanitizeLatex(JSON.parse(response.text));
          } catch {
            return null;
          }
        })();
        if (parsed && typeof parsed.score === 'number') {
          if (!parsed.gradeTitle || !parsed.gradeTitle.includes('/')) {
            const detail = parsed.gradeTitle ? ` – ${parsed.gradeTitle}` : (
              parsed.score === maxPts
                ? ' – Kompletne i bezbłędne rozwiązanie'
                : parsed.score > 0
                  ? ' – Zasadniczy postęp'
                  : ' – Brak poprawnego toku rozwiązania'
            );
            parsed.gradeTitle = `${parsed.score} / ${maxPts} PKT${detail}`;
          }
          if (response.usageMetadata) {
            parsed.usage = {
              promptTokens: response.usageMetadata.promptTokenCount || 0,
              completionTokens: response.usageMetadata.candidatesTokenCount || 0,
              totalTokens: response.usageMetadata.totalTokenCount || 0,
              model: usedModel || aiModels.grade,
              estimatedCostUsd: 0,
            };
          }
          return parsed;
        }
      }
    } catch (err) {
      logger.warn('gemini_evaluation_error', { error: err instanceof Error ? err.message : String(err) });
    }
  }

  // 3. Fallback: resilient rubric evaluation
  const fallbackResult: any = evaluateFallback({
    cleanAnswer,
    officialKey: keyCriterion,
    scoring_key: keyCriterion,
    maxPts,
    isFirstAttempt,
    ai_tutor_rubric,
  });
  fallbackResult.usage = {
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    model: 'rubric-fallback',
    estimatedCostUsd: 0,
  };
  return fallbackResult;
};

/**
 * Ocena zadania z degradacją: model AI → deterministyczny rubric-fallback.
 */
export const gradeWithFallback = async (body: Record<string, unknown>) => {
  const maxPts = typeof body.maxPoints === 'number' ? body.maxPoints : 2;
  const cleanAnswer = typeof body.studentAnswer === 'string' ? body.studentAnswer.trim() : '';
  const keyCriterion = String(body.scoring_key || body.scoringKey || body.officialKey || '');

  try {
    const result = await evaluateTaskLogic(body);
    return { ...result, provider: 'ai' };
  } catch (error) {
    logger.warn('ai_grade_failed', {
      error: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    const isEnglish = Boolean(
      body.isEnglish ||
      body.subjectId === 'jezyk-angielski' ||
      body.subjectId === 'jezyk-angielski-rozszerzony' ||
      body.taskType === 'OPEN_ENGLISH'
    );
    const fallback = evaluateFallback({
      cleanAnswer,
      officialKey: keyCriterion,
      scoring_key: keyCriterion,
      maxPts,
      isFirstAttempt: body.attemptCount === 1,
      ai_tutor_rubric: body.ai_tutor_rubric as { criterion_1_point?: string; criterion_2_points?: string } | undefined,
      isEnglish,
    });
    return { ...fallback, evaluationFailed: true, provider: 'rubric-fallback' };
  } catch (fallbackError) {
    logger.error('ai_grade_fallback_failed', {
      error: fallbackError instanceof Error ? fallbackError.message : String(fallbackError),
    });
    return {
      score: 0,
      maxPoints: maxPts,
      isPassed: false,
      evaluationFailed: true,
      provider: 'none',
      gradeTitle: `Ocena wstrzymana (0 / ${maxPts} PKT)`,
      summary: 'Egzaminator AI jest chwilowo niedostępny, więc odpowiedź nie została oceniona.',
      mentorComment: 'Nie udało się połączyć z egzaminatorem AI. Twoja próba NIE została uznana za błędną — spróbuj sprawdzić odpowiedź ponownie.',
      strengths: [],
      errors: ['Brak połączenia z modułem oceny.'],
      ckeFeedback: 'Ocena wstrzymana z powodu błędu połączenia.',
      suggestion: 'Spróbuj ponownie za chwilę.',
      hintForNextAttempt: '',
    };
  }
};
