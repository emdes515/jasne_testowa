import { getAiModelConfig } from '../config';
import { logger } from '../logger';
import { cleanThinkingTokens } from '../ai/latexSanitizer';
import { geminiChain, getGenAI } from '../ai/geminiClient';
import { callOpenRouter } from '../ai/openRouterClient';
import { buildHintUserPrompt, HINT_SYSTEM_PROMPT } from '../prompts/hint.prompt';

export const generateHintLogic = async (body: any) => {
  const { question, instruction, studentAnswer, staticHint, studentImage, scoring_key, scoringKey } = body;
  const keyCriteria = scoring_key || scoringKey || '';
  const hasImage = Boolean(studentImage && typeof studentImage === 'string' && studentImage.startsWith('data:image/'));

  const systemPrompt = HINT_SYSTEM_PROMPT;
  const userPrompt = buildHintUserPrompt({
    question,
    keyCriteria,
    instruction,
    studentAnswer,
    hasImage,
  });

  // 1. Try OpenRouter
  const openRouterReply = await callOpenRouter({
    systemPrompt,
    userPrompt,
    imageBase64: hasImage ? studentImage : undefined,
    isVisionNeeded: hasImage,
  });

  if (openRouterReply?.content) {
    const cleaned = cleanThinkingTokens(openRouterReply.content);
    if (cleaned) {
      return { reply: cleaned, usage: openRouterReply.usage };
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

    try {
      let response: any = null;
      let usedModel = '';
      for (const model of geminiChain(aiModels.hint)) {
        try {
          response = await ai.models.generateContent({ model, contents });
          usedModel = model;
          break;
        } catch (modelError) {
          logger.debug('gemini_model_failed', {
            stage: 'hint',
            model,
            error: modelError instanceof Error ? modelError.message : String(modelError),
          });
        }
      }
      if (response?.text) {
        const geminiUsage = {
          promptTokens: response.usageMetadata?.promptTokenCount || 0,
          completionTokens: response.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: response.usageMetadata?.totalTokenCount || 0,
          model: usedModel || aiModels.hint,
          estimatedCostUsd: 0,
        };
        return { reply: response.text.trim(), usage: geminiUsage };
      }
    } catch (err) {
      logger.warn('gemini_hint_error', { error: err instanceof Error ? err.message : String(err) });
    }
  }

  return {
    reply: staticHint || 'Zastosuj odpowiedni wzór skróconego mnożenia lub wyłącz wspólny czynnik przed nawias. Zastanów się, co łączy kolejne wyrazy.',
    usage: {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      model: 'static-fallback',
      estimatedCostUsd: 0,
    },
  };
};

/**
 * Podpowiedź z degradacją: model AI → statyczna podpowiedź z zadania.
 */
export const hintWithFallback = async (body: Record<string, unknown>) => {
  try {
    const hint = await generateHintLogic(body);
    if (hint && typeof hint.reply === 'string' && hint.reply.trim().length > 0) {
      return { ...hint, provider: hint.usage?.model ? 'ai' : 'static' };
    }
  } catch (error) {
    logger.warn('ai_hint_failed', {
      error: error instanceof Error ? error.message : String(error),
    });
  }
  const staticHint = typeof body.staticHint === 'string' ? body.staticHint.trim() : '';
  return {
    reply: staticHint || 'Zastosuj odpowiednie wzory i przekształcenia algebraiczne. Zapisz, co wiesz o danych wielkościach, i wyznacz z tego niewiadomą.',
    provider: 'static',
    usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0, model: 'static-fallback', estimatedCostUsd: 0 },
  };
};
