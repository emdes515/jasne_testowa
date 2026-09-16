import { getAiModelConfig } from '../config';
import { logger } from '../logger';
import { extractStructuredJson } from '../ai/latexSanitizer';
import { geminiChain, getGenAI } from '../ai/geminiClient';
import { callOpenRouter } from '../ai/openRouterClient';
import { buildTaskGenerationSystemPrompt, buildTaskGenerationUserPrompt } from '../prompts/taskGeneration.prompt';

/**
 * AI Task Generator Logic (CKE compliant task generation via OpenRouter / Gemini)
 */
export const generateTaskLogic = async (body: any) => {
  const {
    subject = 'matematyka',
    topic = 'Liczby rzeczywiste, potęgi i pierwiastki',
    taskType = 'SINGLE_CHOICE',
    difficulty = 'standard',
    customPrompt = '',
  } = body;

  const isPolish = subject === 'pol' || subject === 'jezyk-polski';
  const systemPrompt = buildTaskGenerationSystemPrompt({
    isPolish,
    topic,
    taskType,
    difficulty,
  });

  const userPrompt = buildTaskGenerationUserPrompt({
    subject,
    topic,
    taskType,
    difficulty,
    customPrompt,
  });

  const aiModels = getAiModelConfig();

  // 1. Try OpenRouter
  const openRouterReply = await callOpenRouter({
    systemPrompt,
    userPrompt,
    jsonMode: true,
  });

  if (openRouterReply?.content) {
    const parsed = extractStructuredJson(openRouterReply.content);
    if (parsed && (parsed.question || parsed.content)) {
      parsed.usage = openRouterReply.usage;
      return parsed;
    }
  }

  // 2. Try Gemini
  const ai = getGenAI();
  if (ai) {
    try {
      let response: any = null;
      let usedModel = '';
      for (const model of geminiChain(aiModels.task)) {
        try {
          response = await ai.models.generateContent({
            model,
            contents: [`${systemPrompt}\n\n${userPrompt}`],
            config: { responseMimeType: 'application/json' },
          });
          usedModel = model;
          break;
        } catch (modelError) {
          logger.debug('gemini_model_failed', {
            stage: 'task',
            model,
            error: modelError instanceof Error ? modelError.message : String(modelError),
          });
        }
      }
      if (response?.text) {
        const parsed = JSON.parse(response.text);
        if (parsed.question) {
          if (response.usageMetadata) {
            parsed.usage = {
              promptTokens: response.usageMetadata.promptTokenCount || 0,
              completionTokens: response.usageMetadata.candidatesTokenCount || 0,
              totalTokens: response.usageMetadata.totalTokenCount || 0,
              model: usedModel || aiModels.task,
              estimatedCostUsd: 0,
            };
          }
          return parsed;
        }
      }
    } catch (err) {
      logger.warn('gemini_task_generator_error', { error: err instanceof Error ? err.message : String(err) });
    }
  }

  // 3. Fallback task
  return {
    id: `ai-gen-${Date.now()}`,
    subject: isPolish ? 'jezyk-polski' : 'matematyka',
    topic,
    type: taskType,
    points: taskType === 'SINGLE_CHOICE' ? 1 : 2,
    question: isPolish
      ? 'Wskaż, w którym z poniższych utworów literackich motyw poświęcenia dla ojczyzny odgrywa kluczową rolę w kreacji głównego bohatera.'
      : 'Wartość wyrażenia $\\log_{3} 54 - \\log_{3} 2$ jest równa:',
    instruction: 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.',
    options: isPolish
      ? [
          { id: 'A', text: 'Konrad Wallenrod Adama Mickiewicza', content_latex: 'Konrad Wallenrod Adama Mickiewicza', is_correct: true },
          { id: 'B', text: 'Sklepy cynamonowe Brunona Schulza', content_latex: 'Sklepy cynamonowe Brunona Schulza', is_correct: false },
          { id: 'C', text: 'Szewcy Stanisława Ignacego Witkiewicza', content_latex: 'Szewcy Stanisława Ignacego Witkiewicza', is_correct: false },
          { id: 'D', text: 'Ferdydurke Witolda Gombrowicza', content_latex: 'Ferdydurke Witolda Gombrowicza', is_correct: false },
        ]
      : [
          { id: 'A', text: '$2$', content_latex: '$2$', is_correct: false },
          { id: 'B', text: '$3$', content_latex: '$3$', is_correct: true },
          { id: 'C', text: '$\\log_{3} 52$', content_latex: '$\\log_{3} 52$', is_correct: false },
          { id: 'D', text: '$27$', content_latex: '$27$', is_correct: false },
        ],
    correct_answer: isPolish ? 'A' : 'B',
    scoring_key: '1 pkt – wskazanie poprawnej odpowiedzi zgodnej z kluczem CKE',
    ai_tutor_rubric: {
      criterion_1_point: 'Poprawne obliczenie lub wskazanie właściwego utworu',
      criterion_2_points: 'Pełna odpowiedź i argumentacja',
    },
    explanation: isPolish
      ? 'Tytułowy bohater poematu Mickiewicza poświęca swoje szczęście i życie dla ratowania ojczyzny.'
      : 'Stosujemy wzór na różnicę logarytmów: $\\log_{a} x - \\log_{a} y = \\log_{a}\\left(\\frac{x}{y}\\right)$. Stąd $\\log_{3} 54 - \\log_{3} 2 = \\log_{3} 27 = 3$.',
    cke_trap: 'Odejmowanie liczb logarytmowanych zamiast ich dzielenia.',
    hints: {
      level_1: 'Skorzystaj ze wzoru na różnicę logarytmów o wspólnej podstawie.',
      level_2: '$\\log_{a}(x) - \\log_{a}(y) = \\log_{a}(x/y)$. Oblicz $54/2$.',
    },
  };
};
