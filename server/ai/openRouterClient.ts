import { getAiModelConfig, resolveOpenRouterApiKey } from '../config';
import { logger } from '../logger';

export interface OpenRouterCallResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    model: string;
    estimatedCostUsd?: number;
  };
}

export interface CallOpenRouterParams {
  systemPrompt: string;
  userPrompt: string;
  imageBase64?: string;
  isVisionNeeded?: boolean;
  jsonMode?: boolean;
}

export const callOpenRouter = async (params: CallOpenRouterParams): Promise<OpenRouterCallResponse | null> => {
  const apiKey = resolveOpenRouterApiKey();
  if (!apiKey) return null;

  const { systemPrompt, userPrompt, imageBase64, isVisionNeeded, jsonMode } = params;

  const userModel = isVisionNeeded ? getAiModelConfig().openRouterVision : getAiModelConfig().openRouterText;

  // Prioritize fast, ultra-cheap and highly accurate models
  const candidateModels = isVisionNeeded
    ? [
        userModel,
        'inclusionai/ling-3.0-flash-vl:free',
        'inclusionai/ling-3.0-flash-vl',
        'google/gemma-4-31b-it',
        'qwen/qwen3-vl-32b-instruct',
        'google/gemma-3-27b-it',
        'google/gemma-3-12b-it',
        'google/gemma-3-4b-it',
        'nex-agi/nex-n2.5-pro:free',
      ]
    : [
        userModel,
        'inclusionai/ling-3.0-flash-vl:free',
        'inclusionai/ling-3.0-flash-vl',
        'google/gemma-4-31b-it',
        'google/gemma-3-27b-it',
        'google/gemma-3-12b-it',
        'google/gemma-3-4b-it',
        'nex-agi/nex-n2.5-mini:free',
        'liquid/lfm-2.5-2.6b:free',
      ];

  const uniqueModels = Array.from(new Set(candidateModels.filter(Boolean))) as string[];

  const userContent: any[] = [];
  if (imageBase64 && typeof imageBase64 === 'string') {
    const imageUrl = imageBase64.startsWith('data:') ? imageBase64 : `data:image/png;base64,${imageBase64}`;
    userContent.push({
      type: 'image_url',
      image_url: { url: imageUrl },
    });
  }
  userContent.push({
    type: 'text',
    text: userPrompt,
  });

  logger.debug('openrouter_candidates', { models: uniqueModels, vision: Boolean(isVisionNeeded) });

  for (const model of uniqueModels) {
    const t0 = Date.now();
    const body: any = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
      temperature: 0.1,
      max_tokens: 1500,
      stream: false,
    };

    if (jsonMode && !isVisionNeeded) {
      body.response_format = { type: 'json_object' };
    }

    const timeoutMs = isVisionNeeded ? 14000 : 10000;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        signal: AbortSignal.timeout(timeoutMs),
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://jasne.edu.pl',
          'X-Title': 'JASNE. AI Tutor',
          'Connection': 'close',
        },
        body: JSON.stringify(body),
      });

      const text = await response.text();
      logger.debug('openrouter_response', { model, status: response.status, durationMs: Date.now() - t0 });

      if (!response.ok) {
        logger.warn('openrouter_http_error', { model, status: response.status, body: text.slice(0, 150) });
        // If provider doesn't support json_object, retry once without response_format
        if (response.status === 400 && jsonMode && body.response_format) {
          try {
            delete body.response_format;
            const retryRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
              method: 'POST',
              signal: AbortSignal.timeout(15000),
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://jasne.edu.pl',
                'X-Title': 'JASNE. AI Tutor',
                'Connection': 'close',
              },
              body: JSON.stringify(body),
            });
            if (retryRes.ok) {
              const rText = await retryRes.text();
              const rJson = JSON.parse(rText);
              const rContent = rJson.choices?.[0]?.message?.content?.trim();
              if (rContent) {
                const pTokens = rJson.usage?.prompt_tokens || 0;
                const cTokens = rJson.usage?.completion_tokens || 0;
                const tTokens = rJson.usage?.total_tokens || (pTokens + cTokens);
                return {
                  content: rContent,
                  usage: {
                    promptTokens: pTokens,
                    completionTokens: cTokens,
                    totalTokens: tTokens,
                    model,
                    estimatedCostUsd: rJson.usage?.cost ?? 0,
                  },
                };
              }
            }
          } catch {}
        }
        continue;
      }

      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        logger.warn('openrouter_non_json', { model, body: text.slice(0, 100) });
        continue;
      }

      if (json.error) {
        logger.warn('openrouter_api_error', { model, error: json.error?.message || JSON.stringify(json.error) });
        continue;
      }

      const content = json.choices?.[0]?.message?.content?.trim() || json.choices?.[0]?.message?.reasoning?.trim();
      if (content) {
        const pTokens = json.usage?.prompt_tokens || 0;
        const cTokens = json.usage?.completion_tokens || 0;
        const tTokens = json.usage?.total_tokens || (pTokens + cTokens);
        return {
          content,
          usage: {
            promptTokens: pTokens,
            completionTokens: cTokens,
            totalTokens: tTokens,
            model,
            estimatedCostUsd: json.usage?.cost ?? 0,
          },
        };
      }
    } catch (err) {
      logger.warn('openrouter_network_error', { model, error: err instanceof Error ? err.message : String(err) });
    }
  }

  return null;
};
