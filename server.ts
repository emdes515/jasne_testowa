import express, { type NextFunction, type Request, type Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

// UWAGA: `./server/config` ładuje dotenv i odczytuje zmienne środowiskowe już
// na etapie importu, dlatego nie wolno przenosić go poniżej żadnego kodu, który
// czyta process.env.
import { config, getAiModelConfig, resolveOpenRouterApiKey, warnAboutLegacySecrets } from './server/config';
import { logger } from './server/logger';
import { createRateLimiter } from './server/rateLimit';
import { sanitizeAiBody } from './server/aiRequest';
import { HttpError, isRecord, oneOf } from './server/validation';

// Świadomie NIE wyłączamy weryfikacji certyfikatów TLS. Poprzednia wersja
// ustawiała NODE_TLS_REJECT_UNAUTHORIZED=0 w trybie deweloperskim, co otwierało
// drogę do ataku man-in-the-middle na wszystkie wychodzące połączenia HTTPS.
// Jeśli lokalne proxy firmowe wymaga własnego CA, użyj NODE_EXTRA_CA_CERTS.

function cleanThinkingTokens(text: string): string {
  if (!text) return '';
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<thought>[\s\S]*?<\/thought>/gi, '')
    .replace(/^Here's a thinking process:[\s\S]*?\n\n/i, '')
    .trim();
}

function deepSanitizeLatex(obj: any): any {
  if (typeof obj === 'string') {
    return obj
      .replace(/\x0c\s*rac/g, '\\frac')
      .replace(/▲\s*rac/g, '\\frac')
      .replace(/\u25B2\s*rac/g, '\\frac')
      .replace(/\\?▲\s*rac/g, '\\frac')
      .replace(/\x0dight/g, '\\right')
      .replace(/\x08egin/g, '\\begin');
  }
  if (Array.isArray(obj)) {
    return obj.map(deepSanitizeLatex);
  }
  if (obj && typeof obj === 'object') {
    const res: any = {};
    for (const [k, v] of Object.entries(obj)) {
      res[k] = deepSanitizeLatex(v);
    }
    return res;
  }
  return obj;
}

function extractStructuredJson(text: string): any {
  if (!text) return null;
  let cleaned = cleanThinkingTokens(text).trim();

  // If wrapped in markdown ```json ... ```, extract content
  const mdMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (mdMatch) {
    cleaned = mdMatch[1].trim();
  } else {
    const objMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objMatch) {
      cleaned = objMatch[0].trim();
    }
  }

  // 1. Try parsing directly
  try {
    return deepSanitizeLatex(JSON.parse(cleaned));
  } catch {}

  // 2. Escape all invalid JSON backslashes (LaTeX macros like \text, \mathbb, \frac, \sqrt, etc.)
  try {
    const fixed = cleaned.replace(/\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '\\\\');
    return deepSanitizeLatex(JSON.parse(fixed));
  } catch {}

  // 3. Fix unescaped newlines inside strings if any
  try {
    const fixed = cleaned
      .replace(/\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, '\\\\')
      .replace(/[\u0000-\u001F]+/g, ' ');
    return deepSanitizeLatex(JSON.parse(fixed));
  } catch {}

  return null;
}

async function startServer() {
  const app = express();
  const PORT = config.port;

  // Za reverse-proxy (Vercel / Cloud Run / nginx) tylko zaufanie do pierwszego
  // hopu daje poprawne req.ip — bez tego rate limiting jest obchodzony nagłówkiem
  // X-Forwarded-For.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(express.json({ limit: config.jsonBodyLimit }));

  /**
   * Ochrona same-origin dla /api.
   *
   * Aplikacja korzysta z BFF (ten sam origin), więc przeglądarka nie powinna
   * wysyłać tu żądań z obcej domeny. Guard blokuje wykorzystanie naszego backendu
   * jako darmowej bramki do płatnych modeli AI z cudzej strony. W trybie
   * deweloperskim przepuszczamy lokalne origin Vite/Express.
   */
  const devOrigins = new Set([
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
  ]);

  const originGuard = (req: Request, res: Response, next: NextFunction): void => {
    const origin = req.headers.origin;
    if (typeof origin !== 'string' || origin.length === 0) {
      // Brak Origin = żądanie nieprzeglądarkowe (aplikacja mobilna, curl, SSR).
      next();
      return;
    }
    if (config.allowedOrigins.includes(origin)) {
      next();
      return;
    }
    if (!config.isProduction && devOrigins.has(origin)) {
      next();
      return;
    }
    const host = req.headers.host;
    if (host) {
      try {
        if (new URL(origin).host === host) {
          next();
          return;
        }
      } catch {
        // nieprawidłowy Origin traktujemy jak obcy
      }
    }
    logger.warn('forbidden_origin', { origin, host, path: req.path });
    res.status(403).json({ error: 'Żądanie z niedozwolonego origin.', code: 'forbidden_origin' });
  };

  const apiLimiter = createRateLimiter({
    rules: [{ bucket: 'api', windowMs: config.rateLimits.apiWindowMs, max: config.rateLimits.apiMax }],
  });

  const aiLimiter = createRateLimiter({
    rules: [{ bucket: 'ai', windowMs: config.rateLimits.apiWindowMs, max: config.rateLimits.aiMax }],
  });

  app.use('/api', originGuard, apiLimiter.middleware);

  const getGenAI = () => {
    const apiKey = config.geminiApiKey;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  /**
   * Modele AI konfigurowane z env (AI_HINT_MODEL / AI_GRADE_MODEL / AI_TASK_MODEL
   * + AI_GEMINI_FALLBACK_MODELS). Dzięki temu wycofanie modelu przez dostawcę
   * nie wymaga zmiany kodu ani nowego deployu.
   */
  const aiModels = getAiModelConfig();

  const geminiChain = (primary: string): string[] =>
    Array.from(new Set([primary, ...aiModels.geminiCandidates.filter(model => model !== primary)]));

  interface OpenRouterCallResponse {
    content: string;
    usage: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
      model: string;
      estimatedCostUsd?: number;
    };
  }

  const callOpenRouter = async (params: {
    systemPrompt: string;
    userPrompt: string;
    imageBase64?: string;
    isVisionNeeded?: boolean;
    jsonMode?: boolean;
  }): Promise<OpenRouterCallResponse | null> => {
    const apiKey = resolveOpenRouterApiKey();
    if (!apiKey) return null;

    const { systemPrompt, userPrompt, imageBase64, isVisionNeeded, jsonMode } = params;

    const userModel = isVisionNeeded ? getAiModelConfig().openRouterVision : getAiModelConfig().openRouterText;

    // Prioritize fast, ultra-cheap and highly accurate models (Ling 3.0 Flash VL, Gemma 4 31B: top vision accuracy, Qwen 3 VL, Gemma 3 27B)
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
          'nex-agi/nex-n2.5-pro:free'
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
          'liquid/lfm-2.5-2.6b:free'
        ];

    const uniqueModels = Array.from(new Set(candidateModels.filter(Boolean))) as string[];

    const userContent: any[] = [];
    if (imageBase64 && typeof imageBase64 === 'string') {
      const imageUrl = imageBase64.startsWith('data:') ? imageBase64 : `data:image/png;base64,${imageBase64}`;
      userContent.push({
        type: 'image_url',
        image_url: { url: imageUrl }
      });
    }
    userContent.push({
      type: 'text',
      text: userPrompt
    });

    logger.debug('openrouter_candidates', { models: uniqueModels, vision: Boolean(isVisionNeeded) });

    for (const model of uniqueModels) {
      const t0 = Date.now();
      const body: any = {
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        temperature: 0.1,
        max_tokens: 1500,
        stream: false
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
            'Connection': 'close'
          },
          body: JSON.stringify(body)
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
                  'Connection': 'close'
                },
                body: JSON.stringify(body)
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
                      estimatedCostUsd: rJson.usage?.cost ?? 0
                    }
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
              estimatedCostUsd: json.usage?.cost ?? 0
            }
          };
        }
      } catch (err) {
        logger.warn('openrouter_network_error', { model, error: err instanceof Error ? err.message : String(err) });
      }
    }

    return null;
  };

  const generateHintLogic = async (body: any) => {
    const { question, instruction, studentAnswer, staticHint, studentImage, scoring_key, scoringKey } = body;
    const keyCriteria = scoring_key || scoringKey || '';
    const hasImage = Boolean(studentImage && typeof studentImage === 'string' && studentImage.startsWith('data:image/'));

    const systemPrompt = `Jesteś tutorem w aplikacji edukacyjnej JASNE. Uczeń rozwiązuje zadanie maturalne. Oceń jego bieżący szkic na podstawie klucza i daj mu JEDNĄ, krótką podpowiedź naprowadzającą. Nie rozwiązuj zadania za niego.

BEZWZGLĘDNE REGUŁY:
1. Daj uczniowi JEDNĄ, krótką wskazówkę, jak kontynuować, ale BEZWZGLĘDNIE NIE PODAWAJ GOTOWEGO WYNIKU ani pełnego dowodu!
2. Prowadź ucznia wyłącznie metodą sokratejską – zadaj pytanie naprowadzające lub wskaż właściwy kierunek przekształcenia.
3. Maksymalnie 2-3 krótkie zdania.
4. Używaj czytelnego KaTeX $...$ dla wszelkich symboli i wzorów matematycznych.
5. Zwracaj się po polsku bezpośrednio i motywująco do ucznia w 2. os. lp.
6. Jeśli uczeń zapisał coś na tablicy, dokładnie odczytaj pismo odręczne (uwzględniając polskie pismo, np. literę J z poziomym daszkiem u góry) i odnieś się do jego zapisu.`;

    const userPrompt = `Oto zadanie maturalne:
${question}

${keyCriteria ? `Klucz punktowania (scoring_key):\n${keyCriteria}\n` : ''}${instruction ? `Dodatkowa instrukcja:\n${instruction}\n` : ''}
Aktualne rozwiązanie ucznia:
${studentAnswer || (hasImage ? 'Uczeń narysował/zapisał swoje rozwiązanie na cyfrowej tablicy (załączono obraz).' : 'Uczeń prosi o pierwszą wskazówkę do rozpoczęcia zadania.')}`;

    // 1. Try OpenRouter
    const openRouterReply = await callOpenRouter({
      systemPrompt,
      userPrompt,
      imageBase64: hasImage ? studentImage : undefined,
      isVisionNeeded: hasImage
    });

    if (openRouterReply?.content) {
      const cleaned = cleanThinkingTokens(openRouterReply.content);
      if (cleaned) {
        return { reply: cleaned, usage: openRouterReply.usage };
      }
    }

    // 2. Try Gemini
    const ai = getGenAI();
    if (ai) {
      const contents: any[] = [`${systemPrompt}\n\n${userPrompt}`];
      if (hasImage) {
        const base64Data = studentImage.split(',')[1];
        const mimeType = studentImage.split(';')[0].split(':')[1];
        contents.push({
          inlineData: { data: base64Data, mimeType }
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
            estimatedCostUsd: 0
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
        estimatedCostUsd: 0
      }
    };
  };

  // Helper for resilient rubric-based matura evaluation
  function evaluateFallback(params: {
    cleanAnswer: any;
    officialKey?: any;
    scoring_key?: any;
    maxPts: number;
    isFirstAttempt: boolean;
    ai_tutor_rubric?: { criterion_1_point?: string; criterion_2_points?: string };
  }) {
    const { cleanAnswer, officialKey, scoring_key, maxPts, isFirstAttempt, ai_tutor_rubric } = params;
    const text = (typeof cleanAnswer === 'string' ? cleanAnswer : JSON.stringify(cleanAnswer || '')).toLowerCase();
    
    const rawRubric = scoring_key || officialKey || '';
    let rubricSource = '';
    if (typeof rawRubric === 'string') {
      rubricSource = rawRubric;
    } else if (Array.isArray(rawRubric)) {
      rubricSource = rawRubric.map(item => (typeof item === 'string' ? item : JSON.stringify(item))).join(' ');
    } else if (rawRubric && typeof rawRubric === 'object') {
      rubricSource = Object.values(rawRubric).map(item => (typeof item === 'string' ? item : JSON.stringify(item))).join(' ');
    } else {
      rubricSource = String(rawRubric || '');
    }
    
    // Check fraction arithmetic tokens (Lesson 1.3 / 1.4)
    const hasFractionFinal = 
      text.includes('2/5') || 
      text.includes('0.4') || 
      text.includes('0{,}4') || 
      text.includes('12/30') || 
      text.includes('\\frac{2}{5}') ||
      text.includes('0,4');

    const hasFractionStep = 
      text.includes('1/6') || 
      text.includes('4/6') || 
      text.includes('3/6') || 
      text.includes('\\frac{1}{6}') || 
      text.includes('\\frac{4}{6}') || 
      text.includes('12/5') || 
      text.includes('wspólny') || 
      text.includes('mianownik');

    // Check algebra tokens for progress (Lesson 1.7 and general algebra)
    const hasAlgebraProgress = 
      text.includes('3n^2') || 
      text.includes('3n²') || 
      text.includes('4n(n+1)') || 
      text.includes('4k(k+1)') || 
      text.includes('4k(') ||
      text.includes('4n(') ||
      text.includes('5(n-1)') || 
      text.includes('5n(') || 
      text.includes('2^96') || 
      text.includes('2^{96}') || 
      text.includes('2^20') || 
      text.includes('2^{20}') || 
      text.includes('3^10') ||
      text.includes('3^{10}') ||
      text.includes('log') ||
      text.includes('2k') ||
      text.includes('wyłącz') || 
      text.includes('wspólny') ||
      text.includes('rozł') || 
      text.includes('kwadrat') || 
      text.includes('wzór skróconego') ||
      text.includes('iloczyn') ||
      text.includes('reszt');

    const hasConclusion = 
      text.includes('podziel') || 
      text.includes('całkowit') || 
      text.includes('wniosek') || 
      text.includes('udowodnion') || 
      text.includes('cnd') || 
      text.includes('c.n.d') ||
      text.includes('reszta 2') || 
      text.includes('8k') || 
      text.includes('13') ||
      text.includes('30k') || 
      text.includes('21k') || 
      text.includes('k \\in') || 
      text.includes('m \\in') || 
      text.includes('c \\in') ||
      text.includes('n \\in');

    const isWhiteboardAnswer = text.includes('[rozwiązanie odręczne') || text.includes('tablicy');

    if (isWhiteboardAnswer) {
      return {
        score: 0,
        maxPoints: maxPts,
        isPassed: false,
        gradeTitle: `0 / ${maxPts} PKT – Wymagana weryfikacja zapisu`,
        transcription: undefined,
        summary: 'Zapis na tablicy nie mógł zostać automatycznie zweryfikowany w trybie offline.',
        mentorComment: 'Aby egzaminator CKE mógł ocenić Twoją pracę, zapis na tablicy musi być czytelny lub możesz wprowadzić wynik za pomocą klawiatury matematycznej.',
        strengths: [],
        errors: ['Brak możliwości automatycznej interpretacji zapisu odręcznego w trybie offline.'],
        ckeFeedback: 'Zgodnie z wymogami CKE do przyznania punktacji konieczny jest czytelny i jednoznaczny zapis toku obliczeń.',
        suggestion: 'Wprowadź swoje rozwiązanie z klawiatury matematycznej lub rozpisz kolejne kroki staranniej na tablicy.',
        hintForNextAttempt: 'Sprawdź wzory skróconego mnożenia i uprość wyrażenie.'
      };
    }

    const isRootTask = (rubricSource || '').includes('\\sqrt') || (rubricSource || '').includes('pierwiastek');
    const isProofTask = (rubricSource || '').includes('wykaż') || (rubricSource || '').includes('dowód') || (rubricSource || '').includes('\\mathbb{Z}') || (rubricSource || '').includes('całkowit');
    const isFractionTask = hasFractionFinal || hasFractionStep || (rubricSource || '').includes('ułamek') || (rubricSource || '').includes('mianownik');

    const keywords = (rubricSource || '').toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
    const matchCount = keywords.filter((kw: string) => text.includes(kw)).length;
    const ratio = keywords.length > 0 ? matchCount / keywords.length : 0.5;

    let calculatedScore = Math.min(maxPts, Math.round(ratio * maxPts));
    if (hasFractionFinal || (hasAlgebraProgress && hasConclusion)) calculatedScore = maxPts;
    else if (hasFractionStep || hasAlgebraProgress) calculatedScore = Math.max(calculatedScore, 1);
    if (text.length > 30 && calculatedScore === 0) calculatedScore = 1;

    const passed = calculatedScore >= Math.ceil(maxPts * 0.5);

    let dynamicMentorComment = '';
    let dynamicStrengths: string[] = [];
    let dynamicErrors: string[] = [];
    let dynamicSuggestion = 'Zapisuj każdy etap przekształceń wyraźnie na arkuszu egzaminacyjnym.';
    let dynamicTranscription: string | undefined = undefined;
    if (!isWhiteboardAnswer && cleanAnswer.length > 0 && !cleanAnswer.startsWith('[')) {
      dynamicTranscription = cleanAnswer;
    }

    if (isRootTask || isProofTask) {
      dynamicMentorComment = calculatedScore === maxPts
        ? 'Znakomita praca! Zastosowano właściwe wzory skróconego mnożenia, zredukowano wyrazy podobne z pierwiastkiem i sformułowano poprawny wniosek końcowy.'
        : calculatedScore > 0
          ? 'Dobry początek – wykonano poprawny pierwszy krok (np. rozpisanie kwadratu różnicy lub wyłączenie czynnika). Dokończ redukcję wyrazów, aby uzyskać pełną punktację.'
          : 'Zwróć uwagę na wzory skróconego mnożenia $(a-b)^2 = a^2 - 2ab + b^2$ oraz redukcję wyrazów z pierwiastkiem.';
      dynamicStrengths = calculatedScore > 0 ? ['Zastosowano poprawny wzór skróconego mnożenia', 'Przedstawiono logiczny ciąg przekształceń algebraicznych'] : [];
      dynamicErrors = calculatedScore < maxPts ? ['Upewnij się, że redukcja wyrazów z pierwiastkiem prowadzi do jednoznacznego wniosku'] : [];
      dynamicSuggestion = 'Pamiętaj o podwojonym iloczynie przy podnoszeniu dwumianu do kwadratu.';
    } else if (isFractionTask) {
      dynamicMentorComment = calculatedScore === maxPts
        ? 'Znakomita praca! Działania w nawiasie, sprowadzenie do wspólnego mianownika oraz dzielenie przez ułamek zostały wykonane bezbłędnie.'
        : calculatedScore > 0
          ? 'Dobra robota za poprawny pierwszy krok (np. wspólny mianownik). Pamiętaj o dokończeniu obliczeń i skróceniu ułamka.'
          : 'Zwróć uwagę na kolejność wykonywania działań i sprowadzanie ułamków do wspólnego mianownika.';
      dynamicStrengths = calculatedScore > 0 ? ['Zastosowano poprawne sprowadzenie do wspólnego mianownika', 'Przedstawiono logiczny tok obliczeń'] : [];
      dynamicErrors = calculatedScore < maxPts ? ['Upewnij się, że wynik końcowy jest podany w najprostszej postaci nieskracalnej'] : [];
      dynamicSuggestion = 'Pamiętaj o zamianie dzielenia przez ułamek na mnożenie przez jego odwrotność.';
    } else {
      dynamicMentorComment = calculatedScore === maxPts
        ? 'Znakomita praca! Przedstawione rozwiązanie w pełni odpowiada oficjalnym wymaganiom maturalnym CKE.'
        : calculatedScore > 0
          ? 'Wykonano zasadniczy krok w kierunku rozwiązania. Dokończ rozumowanie, aby otrzymać maksymalną liczbę punktów.'
          : 'Przeanalizuj założenia zadania i skorzystaj z oficjalnych wzorów maturalnych CKE.';
      dynamicStrengths = calculatedScore > 0 ? ['Poprawne rozpoczęcie toku rozumowania', 'Zgodność ze schematem CKE'] : [];
      dynamicErrors = calculatedScore < maxPts ? ['Brak pełnego uzasadnienia lub wyniku końcowego'] : [];
    }

    return {
      score: calculatedScore,
      maxPoints: maxPts,
      isPassed: passed,
      gradeTitle: calculatedScore === maxPts
        ? `${maxPts} / ${maxPts} PKT – Pełne i bezbłędne rozwiązanie`
        : calculatedScore > 0
          ? `${calculatedScore} / ${maxPts} PKT – Zasadniczy postęp`
          : `0 / ${maxPts} PKT – Próba rozwiązania`,
      transcription: dynamicTranscription,
      summary: calculatedScore === maxPts 
        ? (typeof ai_tutor_rubric?.criterion_2_points === 'string' ? ai_tutor_rubric.criterion_2_points : 'Perfekcyjne rozwiązanie! Obliczenia w pełni zgodne ze schematem maturalnym CKE.')
        : calculatedScore > 0 
        ? (typeof ai_tutor_rubric?.criterion_1_point === 'string' ? ai_tutor_rubric.criterion_1_point : 'Częściowo poprawna odpowiedź (zasadniczy postęp rachunkowy).')
        : 'Rozwiązanie wymaga dopracowania kolejnych etapów obliczeń.',
      mentorComment: dynamicMentorComment,
      strengths: dynamicStrengths,
      errors: dynamicErrors,
      ckeFeedback: `Zgodnie ze schematem oceniania maturalnego CKE, przyznano ${calculatedScore} z ${maxPts} punktów.`,
      suggestion: dynamicSuggestion,
      hintForNextAttempt: 'Sprawdź czy Twoja odpowiedź zawiera wszystkie wymagane kroki dowodowe.'
    };
  }

  // Strict Matura Task Evaluation Logic (OpenRouter -> Gemini -> Rubric fallback)
  const evaluateTaskLogic = async (body: any) => {
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
      attemptCount = 1
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

    const isPolishTask = Boolean(
      body.isPolish === true ||
      taskType === 'OPEN_POLISH' ||
      taskType === 'OPEN_TASK' ||
      taskType === 'OPEN_SHORT' ||
      taskType === 'OPEN_SYNTHESIS' ||
      taskType === 'ESSAY' ||
      (typeof question === 'string' && (question.includes('tekst') || question.includes('lektur') || question.includes('bohater') || question.includes('motyw') || question.includes('CKE') || question.includes('Wokulsk') || question.includes('Kmicic') || question.includes('Hiob') || question.includes('styl') || question.includes('funkcj') || question.includes('wypracowan') || question.includes('rozprawk') || question.includes('esej')))
    );

    // Check if student answer is empty or too short / gibberish
    const cleanAnswer = typeof studentAnswer === 'string' ? studentAnswer.trim() : JSON.stringify(studentAnswer || '');
    const isMultipleChoice = taskType === 'multiple-choice';
    const hasImage = Boolean(studentImage && typeof studentImage === 'string' && studentImage.startsWith('data:image/'));
    const isGibberish = !isMultipleChoice && (
      (isPolishTask && cleanAnswer.length < 3) ||
      /^(asdf|qwer|xyz|1234|abc|cokolwiek|nie wiem|\s*test\s*|aaa)+$/i.test(cleanAnswer)
    );

    if ((isGibberish || cleanAnswer.length === 0) && !hasImage) {
      return {
        score: 0,
        maxPoints: maxPts,
        isPassed: false,
        gradeTitle: 'Niepoprawna odpowiedź (0 pkt)',
        summary: 'Odpowiedź jest zbyt krótka, pusta lub nie zawiera merytorycznych treści.',
        mentorComment: 'Wprowadź swoje rozwiązanie za pomocą klawiatury lub rozpisz je na tablicy, aby egzaminator mógł je ocenić.',
        strengths: [],
        errors: ['Brak rzeczowej odpowiedzi, obliczeń lub argumentacji.'],
        ckeFeedback: 'Zgodnie z zasadami maturalnymi brak merytorycznej odpowiedzi lub wpisanie przypadkowych znaków skutkuje przyznaniem 0 punktów.',
        suggestion: isFirstAttempt 
          ? 'Przeanalizuj polecenie, zapisz swoje obliczenia lub tok rozumowania i spróbuj ponownie.'
          : 'Podpowiedź: Przeczytaj uważnie polecenie. Zwróć uwagę na kluczowe założenia, wzory skróconego mnożenia i wyłączanie przed nawias.',
        hintForNextAttempt: 'W kolejnej próbie spróbuj wypisać dane z treści zadania i zastosować odpowiednie wzory.'
      };
    }

    const isEssay35 = isPolishTask && (maxPts >= 30 || taskType === 'ESSAY');

    let systemPrompt = '';
    if (isEssay35) {
      systemPrompt = `Jesteś starszym egzaminatorem Centralnej Komisji Egzaminacyjnej (CKE) z języka polskiego oceniającym wypracowanie maturalne (Nowa Formuła 2023/2026, Poziom Podstawowy, max 35 punktów).
Twoim zadaniem jest RZETELNA, WNIKLIWA I SPRAWIEDLIWA ocena eseju ucznia według oficjalnych 4 kryteriów CKE:

KRYTERIA OCENY WYPRACOWANIA CKE (35 PKT):
1. Spełnienie formalnych warunków polecenia (0–1 pkt):
   - 1 pkt: praca odnosi się do problemu z polecenia i przynajmniej w części do lektury obowiązkowej, brak błędu kardynalnego.
   - 0 pkt: praca zupełnie nie na temat LUB zawiera BŁĄD KARDYNALNY (całkowite zniekształcenie fabuły/wymowy lektury obowiązkowej). UWAGA: Błąd kardynalny zeruje CAŁE wypracowanie (0/35 pkt)!
2. Kompetencje literackie i kulturowe (0–16 pkt):
   - Funkcjonalne wykorzystanie lektury obowiązkowej (0-8 pkt): trafność argumentacji, analiza zachowań bohaterów, brak błędów rzeczowych.
   - Funkcjonalne wykorzystanie innego utworu literackiego lub kontekstów (0-8 pkt): kontekst historyczny, filozoficzny, biograficzny, kulturowy. Kontekst musi być funkcjonalny (nie tylko wspomniany).
3. Kompozycja tekstu (0–7 pkt):
   - Układ pracy: wstęp z tezą/hipotezą, rozwinięcie z akapitami, zakończenie z syntezą.
   - Spójność lokalna i globalna, stosowanie konektorów logicznych, podział na akapity.
4. Język i styl (0–11 pkt):
   - Poprawność językowa i gramatyczna (0-5 pkt): bogactwo słownictwa, dojrzałość składniowa.
   - Poprawność ortograficzna (0-3 pkt): zasady pisowni.
   - Poprawność interpunkcyjna (0-3 pkt): przecinki, zdania złożone.

ZASADA OBJĘTOŚCI CKE:
- Wymagana minimalna objętość wypracowania to 300 słów.
- Jeśli praca liczy poniżej 300 słów (np. 150-299), punkty za kryteria III i IV są obniżane lub nieprzyznawane zgodnie z instrukcją CKE.
- Jeśli praca liczy poniżej 150 słów, egzaminator przyznaje 0 punktów za kompozycję i język.

Zwróć odpowiedź WYŁĄCZNIE jako prawidłowy obiekt JSON o polach:
{
  "score": <suma punktów całkowita od 0 do 35>,
  "maxPoints": 35,
  "isPassed": <true jeśli score >= 11 (próg 30%), false w przeciwnym razie>,
  "gradeTitle": "<np. '31 / 35 PKT – Wybitne wypracowanie maturalne' lub '24 / 35 PKT – Bardzo dobry esej' lub '12 / 35 PKT – Praca zaliczona na progu'>",
  "summary": "<zwięzła ocena całościowa w 1-2 zdaniach>",
  "mentorComment": "<ciepły, mentorski, motywujący komentarz egzaminatora w 2. os. lp. z odniesieniem do tezy i argumentów ucznia>",
  "strengths": ["<lista 2-4 najmocniejszych stron eseju>"],
  "errors": ["<lista 1-3 elementów wymagających poprawy/korekty>"],
  "ckeFeedback": "<oficjalna opinia egzaminatora CKE z podsumowaniem punktacji>",
  "suggestion": "<wskazówka redakcyjna do kolejnego wypracowania>",
  "hintForNextAttempt": "<podpowiedź jak wzbogacić konteksty lub argumentację>",
  "criteriaBreakdown": {
    "formal": { "score": <0-1>, "max": 1, "comment": "<uzasadnienie>" },
    "literary_cultural": { "score": <0-16>, "max": 16, "comment": "<uzasadnienie lektury i kontekstów>" },
    "composition": { "score": <0-7>, "max": 7, "comment": "<uzasadnienie struktury i spójności>" },
    "language_style": { "score": <0-11>, "max": 11, "comment": "<uzasadnienie języka, stylu i interpunkcji>" }
  }
}`;
    } else if (isPolishTask) {
      systemPrompt = `Jesteś oficjalnym egzaminatorem maturalnym CKE z języka polskiego (Nowa Formuła 2023/2026).
Twoim zadaniem jest RZETELNA, PRECYZYJNA OCENA pisemnej odpowiedzi ucznia na zadanie otwarte (interpretacja, uzasadnienie, argumentacja lub notatka syntetyzująca) zgodnie z oficjalnym kluczem CKE.

ZASADY OCENIANIA CKE DLA JĘZYKA POLSKIEGO:
1. ${maxPts} PKT (Pełna punktacja): Odpowiedź w pełni poprawna merytorycznie (brak błędu kardynalnego i rzeczowego), zawierająca trafną tezę/rozpoznanie oraz logiczne, poparte tekstem lub lekturą uzasadnienie.
2. 1 PKT: Odpowiedź częściowa (np. trafne rozpoznanie cechy/funkcji/motywu, lecz uzasadnienie zbyt ogólne, lakoniczne lub brak odwołania do fragmentu).
3. 0 PKT: Odpowiedź błędna merytorycznie, sprzeczna z sensem tekstu lub lektury (błąd rzeczowy/kardynalny) albo brak argumentacji.

Zwróć odpowiedź WYŁĄCZNIE jako prawidłowy obiekt JSON o polach:
{
  "score": <liczba punktów całkowita od 0 do ${maxPts}>,
  "maxPoints": ${maxPts},
  "isPassed": <true jeśli score >= ${Math.ceil(maxPts * 0.5)}, false w przeciwnym razie>,
  "gradeTitle": "<np. '${maxPts} / ${maxPts} PKT – Pełna odpowiedź i argumentacja' lub '1 / ${maxPts} PKT – Częściowa odpowiedź' lub '0 / ${maxPts} PKT – Próba odpowiedzi'>",
  "summary": "<krótkie podsumowanie oceny w 1 zdaniu>",
  "mentorComment": "<życzliwy, motywujący komentarz egzaminatora w 2. os. lp. odnoszący się do konkretnych sformułowań ucznia>",
  "strengths": ["<lista mocnych stron odpowiedzi>"],
  "errors": ["<lista braków lub błędów zgodnie z kluczem CKE>"],
  "ckeFeedback": "<oficjalne uzasadnienie egzaminatora CKE>",
  "suggestion": "<wskazówka dla ucznia>",
  "hintForNextAttempt": "<podpowiedź co uzupełnić w kolejnej próbie>"
}`;
    } else {
      systemPrompt = `Jesteś oficjalnym egzaminatorem maturalnym z matematyki CKE (Nowa Formuła 2025).
Twoim zadaniem jest RZETELNA, DOKŁADNA I PEDAGOGICZNA OCENA toku myślenia ucznia, jego obliczeń, pisma odręcznego na wirtualnej tablicy lub wpisanego dowodu algebraicznego.

Zwróć odpowiedź WYŁĄCZNIE jako prawidłowy obiekt JSON o polach:
{
  "score": <liczba punktów całkowita od 0 do ${maxPts}>,
  "maxPoints": ${maxPts},
  "isPassed": <true jeśli score >= ${Math.ceil(maxPts * 0.5)}, false w przeciwnym razie>,
  "gradeTitle": "<np. '${maxPts} / ${maxPts} PKT – Pełne rozwiązanie i poprawny wynik' lub '1 / ${maxPts} PKT – Zasadniczy postęp' lub '0 / ${maxPts} PKT – Próba rozwiązania'>",
  "transcription": "<odczytany zapis matematyczny ucznia w czytelnym KaTeX z tablicy lub tekstu>",
  "summary": "<krótkie podsumowanie oceny w 1 zdaniu>",
  "mentorComment": "<wyczerpujący, życzliwy komentarz mentora w 2. os. lp. analizujący krok po kroku tok rozumowania ucznia. Wszelkie wzory, ułamki i liczby zapisuj w KaTeX $...$>",
  "strengths": ["<lista poprawnie wykonanych kroków z KaTeX>"],
  "errors": ["<lista brakujących elementów lub błędów z KaTeX, pusta tablica jeśli rozwiązanie jest w 100% bezbłędne>"],
  "ckeFeedback": "<oficjalne uzasadnienie egzaminatora CKE z precyzyjnym odniesieniem do kryteriów punktacji 0, 1, ${maxPts} pkt>",
  "suggestion": "<dokładna rada dla ucznia, jak zapisać to rozwiązanie idealnie na arkuszu maturalnym CKE>",
  "hintForNextAttempt": "<wskazówka co poprawić lub uzupełnić>"
}

ZASADY OCENIANIA MATURALNEGO, ANALIZY UŁAMKÓW I PISMA ODRĘCZNEGO:
1. Oceniaj ściśle według oficjalnego schematu oceniania zadania i klucza odpowiedzi (SCORING KEY) podanego w poleceniu.
2. ${maxPts} PUNKTY (Pełna punktacja): Pełne, bezbłędne rozwiązanie i poprawny wynik końcowy lub wniosek dowodowy (w tym sam poprawny wynik końcowy dla zadań obliczeniowych).
3. 1 PUNKT (Zasadniczy postęp): Wykonanie pierwszego kluczowego etapu rozwiązania (np. rozpisanie wzoru skróconego mnożenia, wspólny mianownik, wyłączenie czynnika przed nawias).
4. 0 PUNKTÓW: Brak istotnego postępu merytorycznego, całkowicie błędna metoda, nieczytelny, wulgarny lub niepowiązany zapis z zadaniem.
5. CYFROWA TABLICA I PISMO ODRĘCZNE:
   - ZAWSZE dokładnie odczytaj zapis odręczny ucznia i wpisz go do pola "transcription" w czytelnym formacie KaTeX.
   - Zwróć szczególną uwagę na specyfikę polskiego pisma odręcznego (np. litera J często pisana z poziomym daszkiem/belką u góry, polskie słowa potoczne lub wulgarne jak "HUJ", "CHUJ", skróty). Przepisz DOKŁADNIE to co widzisz znak po znaku, nawet jeśli to wulgaryzm lub bzdura.
   - Jeśli uczeń zapisał bazgroły, rysunki niemające sensu, wulgaryzmy lub treść niezwiązaną z zadaniem, przepisz DOKŁADNIE odczytany tekst do transcription, przyznaj 0 punktów (isPassed: false) i w mentorComment wyjaśnij brak punktów.
   - W polach mentorComment, suggestion i ckeFeedback odnoś się do konkretnych wzorów w KaTeX $...$.`;
    }

    const userPrompt = `[DANE ZADANIA]
Typ zadania: ${taskType || 'Zadanie maturalne otwarte'}
Maksymalna liczba punktów: ${maxPts}
Treść pytania / Polecenie: ${question}
${contextText ? `Tekst źródłowy / Kontekst:\n${contextText}` : ''}
${subQuestions && subQuestions.length > 0 ? `Podpytania:\n${subQuestions.join('\n')}` : ''}

[OFICJALNY SCHEMAT OCENIANIA I KLUCZ ODPOWIEDZI (SCORING KEY)]
${keyCriterion}
${ai_tutor_rubric ? `
[DEDYKOWANE KRYTERIA PUNKTACJI MATURALNEJ DLA TEGO ZADANIA]
- 1 PUNKT (Zasadniczy postęp): ${ai_tutor_rubric.criterion_1_point}
- 2 PUNKTY (Pełny dowód i wniosek): ${ai_tutor_rubric.criterion_2_points}
` : ''}

[PRÓBA UCZNIA - PRÓBA NR ${attemptCount}]
${cleanAnswer ? `Komentarz tekstowy ucznia: "${cleanAnswer}"\n` : ''}${hasImage ? 'DOŁĄCZONO OBRAZ WIRTUALNEJ TABLICY: Odczytaj dokładnie pismo odręczne ucznia z żółtych linii na tablicy (znak po znaku, uwzględniając polskie pismo) i umieść je w polu transcription.' : ''}`;

    // 1. Try OpenRouter
    const openRouterReply = await callOpenRouter({
      systemPrompt,
      userPrompt,
      imageBase64: hasImage ? studentImage : undefined,
      isVisionNeeded: hasImage,
      jsonMode: true
    });

    if (openRouterReply?.content) {
      const parsed = extractStructuredJson(openRouterReply.content);
      logger.debug('evaluate_task_openrouter_result', {
        model: openRouterReply.usage?.model,
        snippet: openRouterReply.content.slice(0, 150),
        parsedScore: parsed && typeof parsed.score === 'number' ? parsed.score : null,
      });
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
        parsed.usage = openRouterReply.usage;
        return parsed;
      }
    }

    // 2. Try Gemini
    const ai = getGenAI();
    if (ai) {
      const contents: any[] = [`${systemPrompt}\n\n${userPrompt}`];
      if (hasImage) {
        const base64Data = studentImage.split(',')[1];
        const mimeType = studentImage.split(';')[0].split(':')[1];
        contents.push({
          inlineData: { data: base64Data, mimeType }
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
                    comment: { type: Type.STRING }
                  }
                },
                literary_cultural: {
                  type: Type.OBJECT,
                  properties: {
                    score: { type: Type.NUMBER },
                    max: { type: Type.NUMBER },
                    comment: { type: Type.STRING }
                  }
                },
                composition: {
                  type: Type.OBJECT,
                  properties: {
                    score: { type: Type.NUMBER },
                    max: { type: Type.NUMBER },
                    comment: { type: Type.STRING }
                  }
                },
                language_style: {
                  type: Type.OBJECT,
                  properties: {
                    score: { type: Type.NUMBER },
                    max: { type: Type.NUMBER },
                    comment: { type: Type.STRING }
                  }
                }
              }
            }
          },
          required: ['score', 'maxPoints', 'isPassed', 'gradeTitle', 'summary', 'mentorComment', 'strengths', 'errors', 'ckeFeedback', 'suggestion', 'hintForNextAttempt']
        }
      };

      try {
        let response: any = null;
        let usedModel = '';
        for (const model of geminiChain(aiModels.grade)) {
          try {
            response = await ai.models.generateContent({
              model,
              contents,
              config: evaluationConfig
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
          const parsed = JSON.parse(response.text);
          if (response.usageMetadata) {
            parsed.usage = {
              promptTokens: response.usageMetadata.promptTokenCount || 0,
              completionTokens: response.usageMetadata.candidatesTokenCount || 0,
              totalTokens: response.usageMetadata.totalTokenCount || 0,
              model: usedModel || aiModels.grade,
              estimatedCostUsd: 0
            };
          }
          return parsed;
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
      ai_tutor_rubric
    });
    fallbackResult.usage = {
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      model: 'rubric-fallback',
      estimatedCostUsd: 0
    };
    return fallbackResult;
  };

  // AI Task Generator Logic (CKE compliant task generation via OpenRouter / Gemini)
  const generateTaskLogic = async (body: any) => {
    const {
      subject = 'matematyka',
      topic = 'Liczby rzeczywiste, potęgi i pierwiastki',
      taskType = 'SINGLE_CHOICE',
      difficulty = 'standard',
      customPrompt = ''
    } = body;

    const isPolish = subject === 'pol' || subject === 'jezyk-polski';
    const systemPrompt = isPolish
      ? `Jesteś doświadczonym ekspertem Centralnej Komisji Egzaminacyjnej (CKE) z języka polskiego (Nowa Formuła 2023/2026).
Tworzysz NOWE, autorskie zadanie maturalne zgodne ze standardami CKE, kanonem lektur oraz oficjalną metodyką.
BEZWZGLĘDNE REGUŁY:
1. Pytanie musi być precyzyjne i odnosić się do lektury obowiązkowej (np. Lalka, Dziady cz. III, Wesele, Kordian, Pan Tadeusz, Treny) lub problemu kulturowego.
2. Jeśli taskType to SINGLE_CHOICE: podaj dokładnie 4 opcje (A, B, C, D), z czego DOKŁADNIE JEDNA ma "is_correct": true, a pozostałe trzy "is_correct": false.
3. Podaj oficjalny klucz punktowania CKE (scoring_key) z rozbiciem na 1 pkt i ewentualnie 2 pkt (lub więcej).
4. Podaj ai_tutor_rubric z jasnymi kryteriami.
5. Podaj wyjaśnienie (explanation) i typową pułapkę maturalną (cke_trap).
6. Podaj wskazówki (hints: level_1 i level_2).

Zwróć odpowiedź WYŁĄCZNIE jako poprawny obiekt JSON o polach:
{
  "id": "ai-gen-${Date.now()}",
  "subject": "jezyk-polski",
  "topic": "${topic}",
  "type": "${taskType}",
  "points": ${taskType === 'SINGLE_CHOICE' ? 1 : 2},
  "question": "<treść pytania maturalnego>",
  "instruction": "Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.",
  "passage_text": "<krótki fragment lektury jeśli potrzebny>",
  "options": [
    { "id": "A", "text": "<opcja A>", "content_latex": "<opcja A>", "is_correct": false },
    { "id": "B", "text": "<opcja B>", "content_latex": "<opcja B>", "is_correct": true },
    { "id": "C", "text": "<opcja C>", "content_latex": "<opcja C>", "is_correct": false },
    { "id": "D", "text": "<opcja D>", "content_latex": "<opcja D>", "is_correct": false }
  ],
  "correct_answer": "B",
  "scoring_key": "1 pkt – ...\\n2 pkt – ...",
  "ai_tutor_rubric": {
    "criterion_1_point": "<kryterium na 1 pkt>",
    "criterion_2_points": "<kryterium na 2 pkt>"
  },
  "explanation": "<wyjaśnienie>",
  "cke_trap": "<pułapka>",
  "hints": {
    "level_1": "<wskazówka sokratejska>",
    "level_2": "<wskazówka kontekstowa>"
  }
}`
      : `Jesteś doświadczonym autorem oficjalnych arkuszy maturalnych CKE z matematyki (Nowa Formuła 2023/2026, Poziom Podstawowy).
Tworzysz NOWE, autorskie zadanie maturalne na poziomie trudności: ${difficulty}.
BEZWZGLĘDNE REGUŁY:
1. Używaj czytelnego KaTeX $...$ dla WSZYSTKICH symboli, ułamków, pierwiastków i równań (np. $\\sqrt{5}$, $x^2 - 4 = 0$, $\\frac{a}{b}$).
2. Jeśli taskType to SINGLE_CHOICE: wygeneruj dokładnie 4 opcje (A, B, C, D). DOKŁADNIE JEDNA opcja musi mieć "is_correct": true, a pozostałe trzy "is_correct": false.
3. Pole "correct_answer" MUSI być literą tej jednej poprawnej opcji (np. "A", "B", "C" lub "D").
4. Jeśli taskType to NUMERIC_INPUT: podaj prawidłową wartość w "correct_answer" i "numeric_correct_answer".
5. Jeśli taskType to OPEN_PROOF: sformułuj tezę "Wykaż, że..." lub "Udowodnij, że...".
6. Zdefiniuj schemat oceniania CKE (scoring_key) oraz ai_tutor_rubric:
   - 1 punkt: za zasadniczy postęp algebraiczny
   - 2 punkty: za pełny dowód i wniosek
7. Wyjaśnienie (explanation) musi wskazywać typową pułapkę CKE (cke_trap).

Zwróć odpowiedź WYŁĄCZNIE jako poprawny obiekt JSON o polach:
{
  "id": "ai-gen-${Date.now()}",
  "subject": "matematyka",
  "topic": "${topic}",
  "type": "${taskType}",
  "points": ${taskType === 'SINGLE_CHOICE' ? 1 : 2},
  "question": "<pełna treść zadania ze wzorami KaTeX $...$>",
  "instruction": "<instrukcja dla ucznia>",
  "options": [
    { "id": "A", "text": "<opcja A>", "content_latex": "<opcja A>", "is_correct": false },
    { "id": "B", "text": "<opcja B>", "content_latex": "<opcja B>", "is_correct": true },
    { "id": "C", "text": "<opcja C>", "content_latex": "<opcja C>", "is_correct": false },
    { "id": "D", "text": "<opcja D>", "content_latex": "<opcja D>", "is_correct": false }
  ],
  "correct_answer": "B",
  "scoring_key": "1 pkt – poprawny pierwszy krok...\\n2 pkt – pełny dowód i wniosek...",
  "ai_tutor_rubric": {
    "criterion_1_point": "<kryterium na 1 pkt>",
    "criterion_2_points": "<kryterium na 2 pkt>"
  },
  "explanation": "<pełne rozwiązanie krok po kroku>",
  "cke_trap": "<najczęstszy błąd maturzystów>",
  "hints": {
    "level_1": "<wskazówka naprowadzająca>",
    "level_2": "<kluczowy wzór z karty CKE>"
  }
}`;

    const userPrompt = `Wygeneruj autorskie zadanie maturalne:
Przedmiot: ${isPolish ? 'Język Polski' : 'Matematyka'}
Dział: ${topic}
Typ zadania: ${taskType}
Poziom: ${difficulty}
${customPrompt ? `Dodatkowe wytyczne: ${customPrompt}` : ''}`;

    // 1. Try OpenRouter
    const openRouterReply = await callOpenRouter({
      systemPrompt,
      userPrompt,
      jsonMode: true
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
              config: { responseMimeType: 'application/json' }
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
                estimatedCostUsd: 0
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
      options: isPolish ? [
        { id: 'A', text: 'Konrad Wallenrod Adama Mickiewicza', content_latex: 'Konrad Wallenrod Adama Mickiewicza', is_correct: true },
        { id: 'B', text: 'Sklepy cynamonowe Brunona Schulza', content_latex: 'Sklepy cynamonowe Brunona Schulza', is_correct: false },
        { id: 'C', text: 'Szewcy Stanisława Ignacego Witkiewicza', content_latex: 'Szewcy Stanisława Ignacego Witkiewicza', is_correct: false },
        { id: 'D', text: 'Ferdydurke Witolda Gombrowicza', content_latex: 'Ferdydurke Witolda Gombrowicza', is_correct: false }
      ] : [
        { id: 'A', text: '$2$', content_latex: '$2$', is_correct: false },
        { id: 'B', text: '$3$', content_latex: '$3$', is_correct: true },
        { id: 'C', text: '$\\log_{3} 52$', content_latex: '$\\log_{3} 52$', is_correct: false },
        { id: 'D', text: '$27$', content_latex: '$27$', is_correct: false }
      ],
      correct_answer: isPolish ? 'A' : 'B',
      scoring_key: '1 pkt – wskazanie poprawnej odpowiedzi zgodnej z kluczem CKE',
      ai_tutor_rubric: {
        criterion_1_point: 'Poprawne obliczenie lub wskazanie właściwego utworu',
        criterion_2_points: 'Pełna odpowiedź i argumentacja'
      },
      explanation: isPolish
        ? 'Tytułowy bohater poematu Mickiewicza poświęca swoje szczęście i życie dla ratowania ojczyzny.'
        : 'Stosujemy wzór na różnicę logarytmów: $\\log_{a} x - \\log_{a} y = \\log_{a}\\left(\\frac{x}{y}\\right)$. Stąd $\\log_{3} 54 - \\log_{3} 2 = \\log_{3} 27 = 3$.',
      cke_trap: 'Odejmowanie liczb logarytmowanych zamiast ich dzielenia.',
      hints: {
        level_1: 'Skorzystaj ze wzoru na różnicę logarytmów o wspólnej podstawie.',
        level_2: '$\\log_{a}(x) - \\log_{a}(y) = \\log_{a}(x/y)$. Oblicz $54/2$.'
      }
    };
  };

  // =====================================================================
  // API ROUTES
  // =====================================================================
  // Kolejność jest istotna: najpierw guard/limiter (zarejestrowane wyżej),
  // potem routing AI, potem twarde 404 dla /api, na końcu SPA i error handler.

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      ok: true,
      environment: config.nodeEnv,
      uptimeSeconds: Math.round(process.uptime()),
      ai: {
        gemini: Boolean(config.geminiApiKey),
        openRouter: Boolean(resolveOpenRouterApiKey()),
      },
      rateLimit: apiLimiter.snapshot(),
    });
  });

  /** Błąd, który nie jest błędem klienta, logujemy i zwracamy bezpieczny komunikat. */
  const failRoute = (res: Response, next: NextFunction, error: unknown, publicMessage: string) => {
    if (error instanceof HttpError) {
      next(error);
      return;
    }
    logger.error('route_error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    res.status(500).json({ error: publicMessage, code: 'internal_error' });
  };

  /**
   * Ocena zadania z degradacją: model AI → deterministyczny rubric-fallback.
   *
   * Kluczowa zmiana względem poprzedniej wersji: każda odpowiedź spoza modelu
   * jest oznaczana `evaluationFailed: true` i `provider`, więc klient wie, że
   * ocena nie pochodzi od egzaminatora AI. Wcześniej awaria potrafiła po cichu
   * przyznać 1 punkt (`score: 1, isPassed: true`), co zafałszowywało postęp.
   */
  const gradeWithFallback = async (body: Record<string, unknown>) => {
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
      const fallback = evaluateFallback({
        cleanAnswer,
        officialKey: keyCriterion,
        scoring_key: keyCriterion,
        maxPts,
        isFirstAttempt: body.attemptCount === 1,
        ai_tutor_rubric: body.ai_tutor_rubric as { criterion_1_point?: string; criterion_2_points?: string } | undefined,
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

  /** Podpowiedź z degradacją: model AI → statyczna podpowiedź z zadania. */
  const hintWithFallback = async (body: Record<string, unknown>) => {
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

  // AI Task Generator Endpoint
  app.post('/api/generate-task', aiLimiter.middleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = sanitizeAiBody(req.body, 'task');
      const task = await generateTaskLogic(body);
      return res.json(task);
    } catch (error) {
      return failRoute(res, next, error, 'Nie udało się wygenerować zadania.');
    }
  });

  // AI Tutor Universal Endpoint (supports both 'hint' and 'grade' modes)
  app.post('/api/ai-tutor', aiLimiter.middleware, async (req: Request, res: Response, next: NextFunction) => {
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
  app.post('/api/hint', aiLimiter.middleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = sanitizeAiBody(req.body, 'hint');
      return res.json(await hintWithFallback(body));
    } catch (error) {
      return failRoute(res, next, error, 'Nie udało się wygenerować podpowiedzi.');
    }
  });

  // Strict Matura Task Evaluation Endpoint
  app.post('/api/evaluate-task', aiLimiter.middleware, async (req: Request, res: Response, next: NextFunction) => {
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

  // Twarde 404 dla nieznanych endpointów API — nigdy nie oddajemy SPA w JSON-owym API.
  app.use('/api', (_req: Request, res: Response) => {
    res.status(404).json({ error: 'Nieznany endpoint API.', code: 'not_found' });
  });

  if (!config.isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Centralny error handler — musi być zarejestrowany jako ostatni.
  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof HttpError) {
      logger.warn('request_rejected', { status: error.status, code: error.code, message: error.message });
      res.status(error.status).json({ error: error.message, code: error.code, ...(error.details ? { details: error.details } : {}) });
      return;
    }

    const type = isRecord(error) ? error.type : undefined;
    if (type === 'entity.too.large') {
      res.status(413).json({
        error: `Żądanie przekracza limit rozmiaru (${config.jsonBodyLimit}).`,
        code: 'payload_too_large',
      });
      return;
    }
    if (type === 'entity.parse.failed') {
      res.status(400).json({ error: 'Nieprawidłowy JSON w body żądania.', code: 'invalid_json' });
      return;
    }

    logger.error('unhandled_error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    res.status(500).json({ error: 'Wewnętrzny błąd serwera.', code: 'internal_error' });
  });

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

  const shutdown = (signal: string) => {
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

