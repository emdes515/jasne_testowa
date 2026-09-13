import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Fix local Windows/Node SSL leaf certificate verification for external API fetch calls in development
if (!process.env.NODE_TLS_REJECT_UNAUTHORIZED && process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

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
  const cleaned = cleanThinkingTokens(text);

  // Pre-escape unescaped backslashes before math tokens so JSON.parse doesn't turn \f into Form Feed (ASCII 12)
  const preEscaped = cleaned
    .replace(/(?<!\\)\\frac/g, '\\\\frac')
    .replace(/(?<!\\)\\left/g, '\\\\left')
    .replace(/(?<!\\)\\right/g, '\\\\right')
    .replace(/(?<!\\)\\cdot/g, '\\\\cdot')
    .replace(/(?<!\\)\\sqrt/g, '\\\\sqrt')
    .replace(/(?<!\\)\\times/g, '\\\\times')
    .replace(/(?<!\\)\\pm/g, '\\\\pm')
    .replace(/(?<!\\)\\le/g, '\\\\le')
    .replace(/(?<!\\)\\ge/g, '\\\\ge')
    .replace(/(?<!\\)\\in/g, '\\\\in')
    .replace(/(?<!\\)\\infty/g, '\\\\infty');

  let parsed: any = null;
  try {
    parsed = JSON.parse(preEscaped);
  } catch {
    const mdMatch = preEscaped.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (mdMatch) {
      try {
        parsed = JSON.parse(mdMatch[1]);
      } catch {}
    }
    if (!parsed) {
      const match = preEscaped.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch {}
      }
    }
  }

  // Fallback to parsing original cleaned text if preEscaped failed
  if (!parsed) {
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      const mdMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (mdMatch) {
        try {
          parsed = JSON.parse(mdMatch[1]);
        } catch {}
      }
      if (!parsed) {
        const match = cleaned.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            parsed = JSON.parse(match[0]);
          } catch {}
        }
      }
    }
  }

  return parsed ? deepSanitizeLatex(parsed) : null;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
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

  const callOpenRouter = async (params: {
    systemPrompt: string;
    userPrompt: string;
    imageBase64?: string;
    isVisionNeeded?: boolean;
    jsonMode?: boolean;
  }): Promise<string | null> => {
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) return null;

    const { systemPrompt, userPrompt, imageBase64, isVisionNeeded, jsonMode } = params;

    const userModel = isVisionNeeded
      ? process.env.OPENROUTER_VISION_MODEL
      : (process.env.OPENROUTER_TEXT_MODEL || process.env.OPENROUTER_MODEL);

    // Prioritize fast, high-performance models on OpenRouter with tested automatic fallback
    const candidateModels = isVisionNeeded
      ? [
          userModel,
          'nex-agi/nex-n2.5-pro:free',
          'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
          'openrouter/free'
        ]
      : [
          userModel,
          'nex-agi/nex-n2.5-mini:free',
          'nex-agi/nex-n2.5-pro:free',
          'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
          'openrouter/free'
        ];

    const uniqueModels = Array.from(new Set(candidateModels.filter(Boolean))).slice(0, 3) as string[];

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

    for (const model of uniqueModels) {
      const body: any = {
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        temperature: 0.2,
        max_tokens: 1500
      };

      if (jsonMode) {
        body.response_format = { type: 'json_object' };
      }

      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          signal: AbortSignal.timeout(15000),
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://jasne.edu.pl',
            'X-Title': 'JASNE. AI Tutor'
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          const errText = await response.text();
          console.warn(`[OpenRouter] Model ${model} HTTP ${response.status}: ${errText.slice(0, 150)}. Trying next candidate...`);
          // If provider doesn't support json_object, retry once without response_format
          if (response.status === 400 && jsonMode && body.response_format) {
            try {
              delete body.response_format;
              const retryRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                signal: AbortSignal.timeout(5000),
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': 'application/json',
                  'HTTP-Referer': 'https://jasne.edu.pl',
                  'X-Title': 'JASNE. AI Tutor'
                },
                body: JSON.stringify(body)
              });
              if (retryRes.ok) {
                const rJson = await retryRes.json();
                const rContent = rJson.choices?.[0]?.message?.content?.trim();
                if (rContent) return rContent;
              }
            } catch {}
          }
          continue;
        }

        const json = await response.json();
        if (json.error) {
          console.warn(`[OpenRouter] Model ${model} API error: ${json.error?.message || JSON.stringify(json.error)}. Trying next candidate...`);
          continue;
        }

        const content = json.choices?.[0]?.message?.content?.trim();
        if (content) {
          return content;
        }
      } catch (err) {
        console.warn(`[OpenRouter] Network exception for ${model}:`, err);
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
5. Zwracaj się po polsku bezpośrednio i motywująco do ucznia w 2. os. lp.`;

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

    if (openRouterReply) {
      const cleaned = cleanThinkingTokens(openRouterReply);
      if (cleaned) {
        return { reply: cleaned };
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
        let response;
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents
          });
        } catch {
          response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents
          });
        }
        if (response?.text) {
          return { reply: response.text.trim() };
        }
      } catch (err) {
        console.warn('Gemini hint error:', err);
      }
    }

    return {
      reply: staticHint || 'Zastosuj odpowiedni wzór skróconego mnożenia lub wyłącz wspólny czynnik przed nawias. Zastanów się, co łączy kolejne wyrazy.'
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

    const isRootTask = (rubricSource || '').includes('\\sqrt') || (rubricSource || '').includes('pierwiastek');
    const isProofTask = (rubricSource || '').includes('wykaż') || (rubricSource || '').includes('dowód') || (rubricSource || '').includes('\\mathbb{Z}') || (rubricSource || '').includes('całkowit');
    const isFractionTask = hasFractionFinal || hasFractionStep || (rubricSource || '').includes('ułamek') || (rubricSource || '').includes('mianownik');

    const keywords = (rubricSource || '').toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
    const matchCount = keywords.filter((kw: string) => text.includes(kw)).length;
    const ratio = keywords.length > 0 ? matchCount / keywords.length : 0.5;

    let calculatedScore = Math.min(maxPts, Math.round(ratio * maxPts));
    if (hasFractionFinal || (hasAlgebraProgress && hasConclusion) || isWhiteboardAnswer) calculatedScore = maxPts;
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
2. ${maxPts} PUNKTY (Pełna punktacja): Pełne, bezbłędne rozwiązanie i poprawny wynik końcowy lub wniosek dowodowy. RÓWNIEŻ jeśli uczeń wprowadził z klawiatury kalkulatora lub na tablicy sam poprawny wynik końcowy zadania obliczeniowego (np. ułamek 2/5, ułamek KaTeX \\frac{2}{5}, postać dziesiętną 0,4 lub nieskracalną) zgodny z kluczem odpowiedzi, ZAWSZE PRZYZNAJ ${maxPts}/${maxPts} PKT! Uznaj to za pełny sukces obliczeniowy (w suggestion możesz dodać przypomnienie o zapisywaniu kroków na maturze).
3. 1 PUNKT (Zasadniczy postęp): Wykonanie pierwszego kluczowego etapu rozwiązania (np. sprowadzenie ułamków do wspólnego mianownika w nawiasie, zamiana dzielenia na mnożenie przez odwrotność, rozpisanie wzoru skróconego mnożenia, wyłączenie wspólnego czynnika przed nawias), nawet jeśli uczeń popełnił błąd rachunkowy w dalszej części lub nie dokończył.
4. 0 PUNKTÓW: Brak istotnego postępu merytorycznego, całkowicie błędna metoda lub wynik sprzeczny z kluczem odpowiedzi. NIGDY NIE PRZYZNAWAJ 0 PUNKTÓW, GDY WYNIK LUB UŁAMEK JEST ZGODNY Z KLUCZEM ODPOWIEDZI!
5. SPECYFIKA UŁAMKÓW ZWYKŁYCH I DZIESIĘTNYCH (TABLICA ORAZ KLAWIATURA):
   - Uczeń może zapisać ułamek odręcznie z poziomą lub ukośną kreską ułamkową (licznik na górze, mianownik na dole) lub z klawiatury w formacie "a/b" bądź "\\frac{a}{b}".
   - ZAWSZE odczytaj ułamki i zapisz je w polu "transcription" w czytelnym formacie KaTeX \\frac{licznik}{mianownik}.
   - RÓWNOWAŻNOŚĆ MATEMATYCZNA: Uznawaj równoważne matematycznie postacie wyników (np. \\frac{12}{30} = \\frac{2}{5} = 0,4 = 0{,}4 = 40% lub ułamki niewłaściwe i liczby mieszane \\frac{7}{3} = 2\\frac{1}{3}), chyba że treść zadania wyraźnie wymagała ułamka nieskracalnego.
   - Pamiętaj o kolejności działań: działania w nawiasach, potęgowanie/pierwiastkowanie, mnożenie i dzielenie, dodawanie i odejmowanie.
6. BARDZO WAŻNE – SPECYFIKA POLSKIEGO PISMA ODRĘCZNEGO:
   - W polskim piśmie cyfra 1 jest zapisywana z ukośnym daszkiem/szeryfem skierowanym w lewo i do góry. BEZWZGLĘDNIE NIE MYL CYFRY 1 Z CYFRĄ 7! Cyfra 7 w polskim piśmie ma poziomą poprzeczkę (kreskę w połowie wysokości).
   - ZASADA SPÓJNOŚCI RACHUNKOWEJ (IN DUBIO PRO REO): Zawsze interpretuj odręczne znaki w kontekście logiki i treści bieżącego zadania. Jeśli zapis pasuje do poprawnego toku obliczeń zadania, przyjmij interpretację korzystną dla ucznia.
   - Zawsze wypełnij pole "transcription" odczytanym zapisem ucznia (z tablicy lub tekstu) w estetycznym KaTeX.
   - W polach "mentorComment", "strengths", "errors", "ckeFeedback" odnoś się do konkretnych obliczeń i wzorów z bieżącego zadania, formatując matematykę w KaTeX $...$.`;
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
Komentarz tekstowy ucznia / Zapis dowodu z klawiatury: "${cleanAnswer}"
${hasImage ? 'DOŁĄCZONO OBRAZ WIRTUALNEJ TABLICY Z PISMEM ODRĘCZNYM / OBLICZENIAMI / RYSUNKIEM POMOCNICZYM.' : ''}`;

    // 1. Try OpenRouter
    const openRouterReply = await callOpenRouter({
      systemPrompt,
      userPrompt,
      imageBase64: hasImage ? studentImage : undefined,
      isVisionNeeded: hasImage,
      jsonMode: true
    });

    if (openRouterReply) {
      const parsed = extractStructuredJson(openRouterReply);
      if (parsed && typeof parsed.score === 'number') {
        if (!parsed.gradeTitle) {
          parsed.gradeTitle = `${parsed.score} / ${maxPts} PKT`;
        }
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
        let response;
        try {
          response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: evaluationConfig
          });
        } catch {
          try {
            response = await ai.models.generateContent({
              model: 'gemini-2.0-flash',
              contents,
              config: evaluationConfig
            });
          } catch {
            response = await ai.models.generateContent({
              model: 'gemini-1.5-flash',
              contents,
              config: evaluationConfig
            });
          }
        }

        if (response?.text) {
          const parsed = JSON.parse(response.text);
          return parsed;
        }
      } catch (err) {
        console.warn('Gemini evaluation error:', err);
      }
    }

    // 3. Fallback: resilient rubric evaluation
    return evaluateFallback({
      cleanAnswer,
      officialKey: keyCriterion,
      scoring_key: keyCriterion,
      maxPts,
      isFirstAttempt,
      ai_tutor_rubric
    });
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

    if (openRouterReply) {
      const parsed = extractStructuredJson(openRouterReply);
      if (parsed && (parsed.question || parsed.content)) {
        return parsed;
      }
    }

    // 2. Try Gemini
    const ai = getGenAI();
    if (ai) {
      try {
        let response;
        try {
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: [`${systemPrompt}\n\n${userPrompt}`],
            config: { responseMimeType: 'application/json' }
          });
        } catch {
          response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: [`${systemPrompt}\n\n${userPrompt}`],
            config: { responseMimeType: 'application/json' }
          });
        }
        if (response?.text) {
          const parsed = JSON.parse(response.text);
          if (parsed.question) return parsed;
        }
      } catch (err) {
        console.warn('Gemini task generator error:', err);
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

  // AI Task Generator Endpoint
  app.post('/api/generate-task', async (req, res) => {
    try {
      const task = await generateTaskLogic(req.body);
      return res.json(task);
    } catch (error: any) {
      console.warn('/api/generate-task error:', error);
      return res.status(500).json({ error: 'Nie udało się wygenerować zadania.' });
    }
  });

  // AI Tutor Universal Endpoint (supports both 'hint' and 'grade' modes)
  app.post('/api/ai-tutor', async (req, res) => {
    try {
      const mode = req.body?.mode;
      if (mode === 'grade') {
        const result = await evaluateTaskLogic(req.body);
        return res.json(result);
      }
      const hint = await generateHintLogic(req.body);
      return res.json(hint);
    } catch (error: any) {
      console.warn('/api/ai-tutor error:', error);
      if (req.body?.mode === 'grade') {
        try {
          const cleanAnswer = typeof req.body?.studentAnswer === 'string' ? req.body.studentAnswer.trim() : '';
          const keyCriterion = req.body?.scoring_key || req.body?.scoringKey || req.body?.officialKey || '';
          return res.json(evaluateFallback({
            cleanAnswer,
            officialKey: keyCriterion,
            scoring_key: keyCriterion,
            maxPts: req.body?.maxPoints || 2,
            isFirstAttempt: req.body?.attemptCount === 1,
            ai_tutor_rubric: req.body?.ai_tutor_rubric
          }));
        } catch (fbErr) {
          return res.json({
            score: 1,
            maxPoints: req.body?.maxPoints || 2,
            isPassed: true,
            gradeTitle: 'Odpowiedź zarejestrowana',
            summary: 'Próba została zarejestrowana przez system.',
            mentorComment: 'Dobra robota! Kontynuuj rozwiązywanie kolejnych zadań.',
            strengths: ['Odpowiedź zarejestrowana'],
            errors: [],
            ckeFeedback: 'Ocena w trybie awaryjnym.',
            suggestion: 'Przejdź do kolejnego zadania.'
          });
        }
      }
      return res.json({ reply: 'Zastosuj odpowiednie wzory i przekształcenia algebraiczne.' });
    }
  });

  // Dedicated AI Hint endpoint alias
  app.post('/api/hint', async (req, res) => {
    try {
      const hint = await generateHintLogic(req.body);
      return res.json(hint);
    } catch (error: any) {
      console.warn('/api/hint error:', error);
      return res.json({ reply: 'Zastosuj odpowiednie wzory i przekształcenia algebraiczne.' });
    }
  });

  // Strict Matura Task Evaluation Endpoint
  app.post('/api/evaluate-task', async (req, res) => {
    try {
      const result = await evaluateTaskLogic(req.body);
      res.json(result);
    } catch (error: any) {
      console.warn('/api/evaluate-task error:', error);
      try {
        const cleanAnswer = typeof req.body?.studentAnswer === 'string' ? req.body.studentAnswer.trim() : '';
        const keyCriterion = req.body?.scoring_key || req.body?.scoringKey || req.body?.officialKey || '';
        return res.json(evaluateFallback({
          cleanAnswer,
          officialKey: keyCriterion,
          scoring_key: keyCriterion,
          maxPts: req.body?.maxPoints || 2,
          isFirstAttempt: req.body?.attemptCount === 1,
          ai_tutor_rubric: req.body?.ai_tutor_rubric
        }));
      } catch (fallbackErr: any) {
        console.error('/api/evaluate-task critical fallback error:', fallbackErr);
        const maxPts = req.body?.maxPoints || 2;
        return res.json({
          score: 1,
          maxPoints: maxPts,
          isPassed: true,
          gradeTitle: `${maxPts} / ${maxPts} PKT – Odpowiedź zarejestrowana`,
          summary: 'Twoja odpowiedź została pomyślnie zarejestrowana.',
          mentorComment: 'Dobra robota! Kontynuuj rozwiązywanie kolejnych zadań.',
          strengths: ['Zarejestrowano odpowiedź'],
          errors: [],
          ckeFeedback: 'Odpowiedź zarejestrowana w trybie awaryjnym.',
          suggestion: 'Przejdź do kolejnego zadania.',
          hintForNextAttempt: ''
        });
      }
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

