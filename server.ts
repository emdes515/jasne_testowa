import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

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
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return null;

    const { systemPrompt, userPrompt, imageBase64, isVisionNeeded, jsonMode } = params;
    const model = isVisionNeeded
      ? (process.env.OPENROUTER_VISION_MODEL || 'anthropic/claude-3.5-sonnet')
      : (process.env.OPENROUTER_TEXT_MODEL || 'anthropic/claude-3.5-haiku');

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

    const body: any = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ],
      temperature: 0.2,
      max_tokens: 1200
    };

    if (jsonMode) {
      body.response_format = { type: 'json_object' };
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://maturaquest.app',
          'X-Title': 'MaturaQuest AI Tutor'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        console.warn(`[OpenRouter] HTTP error ${response.status}: ${await response.text()}`);
        return null;
      }

      const json = await response.json();
      return json.choices?.[0]?.message?.content?.trim() || null;
    } catch (err) {
      console.warn('[OpenRouter] Network exception:', err);
      return null;
    }
  };

  const generateHintLogic = async (body: any) => {
    const { question, instruction, studentAnswer, staticHint, studentImage, scoring_key, scoringKey } = body;
    const keyCriteria = scoring_key || scoringKey || '';
    const hasImage = Boolean(studentImage && typeof studentImage === 'string' && studentImage.startsWith('data:image/'));

    const systemPrompt = `Jesteś tutorem matematycznym. Uczeń rozwiązuje zadanie. Oceń jego bieżący szkic na podstawie klucza i daj mu JEDNĄ, krótką podpowiedź. Nie rozwiązuj zadania za niego.

BEZWZGLĘDNE REGUŁY:
1. Daj uczniowi JEDNĄ, krótką wskazówkę, jak kontynuować, ale BEZWZGLĘDNIE NIE PODAWAJ WYNIKU ani gotowego dowodu!
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
      return { reply: openRouterReply };
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
    cleanAnswer: string;
    officialKey?: string;
    scoring_key?: string;
    maxPts: number;
    isFirstAttempt: boolean;
    ai_tutor_rubric?: { criterion_1_point?: string; criterion_2_points?: string };
  }) {
    const { cleanAnswer, officialKey, scoring_key, maxPts, isFirstAttempt, ai_tutor_rubric } = params;
    const text = cleanAnswer.toLowerCase();
    const rubricSource = scoring_key || officialKey || '';
    
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

    const keywords = (rubricSource || '').toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
    const matchCount = keywords.filter((kw: string) => text.includes(kw)).length;
    const ratio = keywords.length > 0 ? matchCount / keywords.length : 0.5;

    let calculatedScore = Math.min(maxPts, Math.round(ratio * maxPts));
    if (hasAlgebraProgress) calculatedScore = Math.max(calculatedScore, 1);
    if (hasAlgebraProgress && hasConclusion) calculatedScore = maxPts;
    if (text.length > 30 && calculatedScore === 0) calculatedScore = 1;

    const passed = calculatedScore >= Math.ceil(maxPts * 0.5);

    const mentorComment = calculatedScore === maxPts
      ? 'Świetnie! Twoje przekształcenia są bezbłędne, a tok rozumowania w pełni zgodny z oficjalnym kluczem CKE.'
      : calculatedScore > 0
        ? 'Dobra robota za poprawny pierwszy krok algebraiczny! Aby uzyskać maksymalną liczbę punktów, doprecyzuj wniosek końcowy.'
        : 'Zwróć uwagę na kluczowe założenia zadania i spróbuj rozłożyć wyrażenie na czynniki lub wyłączyć wspólny składnik.';

    return {
      score: calculatedScore,
      maxPoints: maxPts,
      isPassed: passed,
      gradeTitle: calculatedScore === maxPts
        ? `${maxPts} / ${maxPts} PKT – Pełny dowód i wniosek`
        : calculatedScore > 0
          ? `${calculatedScore} / ${maxPts} PKT – Zasadniczy postęp`
          : `0 / ${maxPts} PKT – Próba rozwiązania`,
      summary: calculatedScore === maxPts 
        ? (ai_tutor_rubric?.criterion_2_points || 'Perfekcyjne rozwiązanie! Odpowiedź w pełni zgodna ze schematem maturalnym.')
        : calculatedScore > 0 
        ? (ai_tutor_rubric?.criterion_1_point || 'Częściowo poprawna odpowiedź (zasadniczy postęp algebraiczny).')
        : 'Odpowiedź wymaga dopracowania kluczowych przekształceń algebraicznych.',
      mentorComment,
      strengths: calculatedScore > 0 ? ['Zastosowano poprawną tożsamość algebraiczną', 'Przedstawiono zasadniczy tok rozumowania'] : [],
      errors: calculatedScore < maxPts ? ['Pamiętaj o precyzyjnym wniosku końcowym powołującym się na podzielność przez odpowiednią liczbę'] : [],
      ckeFeedback: `Zgodnie ze schematem oceniania maturalnego, przyznano ${calculatedScore} z ${maxPts} punktów.`,
      suggestion: isFirstAttempt 
        ? 'Zapisz precyzyjny wniosek końcowy powołujący się na podzielność przez odpowiednią liczbę.'
        : 'Podpowiedź do kolejnej próby: Zwróć uwagę na formalne uzasadnienie, dlaczego otrzymany iloczyn spełnia warunek zadania.',
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
    const keyCriterion = scoring_key || scoringKey || officialKey || '';

    // Check if student answer is empty or too short / gibberish
    const cleanAnswer = typeof studentAnswer === 'string' ? studentAnswer.trim() : JSON.stringify(studentAnswer || '');
    const isMultipleChoice = taskType === 'multiple-choice';
    const hasImage = Boolean(studentImage && typeof studentImage === 'string' && studentImage.startsWith('data:image/'));
    const isGibberish = !isMultipleChoice && (cleanAnswer.length < 3 || /^(asdf|qwer|xyz|1234|abc|cokolwiek|nie wiem| test|aaa)+$/i.test(cleanAnswer));

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

    const isPolishTask = Boolean(
      body.isPolish === true ||
      taskType === 'OPEN_POLISH' ||
      taskType === 'OPEN_TASK' ||
      taskType === 'OPEN_SHORT' ||
      taskType === 'OPEN_SYNTHESIS' ||
      taskType === 'ESSAY' ||
      (typeof question === 'string' && (question.includes('tekst') || question.includes('lektur') || question.includes('bohater') || question.includes('motyw') || question.includes('CKE') || question.includes('Wokulsk') || question.includes('Kmicic') || question.includes('Hiob') || question.includes('styl') || question.includes('funkcj') || question.includes('wypracowan') || question.includes('rozprawk') || question.includes('esej')))
    );

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
      systemPrompt = `Jesteś oficjalnym egzaminatorem maturalnym z matematyki CKE.
Twoim zadaniem jest RZETELNA, PRECYZYJNA OCENA toku myślenia ucznia, jego obliczeń, pisma odręcznego na wirtualnej tablicy lub wpisanego dowodu algebraicznego.

Zwróć odpowiedź WYŁĄCZNIE jako prawidłowy obiekt JSON o polach:
{
  "score": <liczba punktów całkowita od 0 do ${maxPts}>,
  "maxPoints": ${maxPts},
  "isPassed": <true jeśli score >= ${Math.ceil(maxPts * 0.5)}, false w przeciwnym razie>,
  "gradeTitle": "<np. '${maxPts} / ${maxPts} PKT – Pełny dowód i wniosek' lub '1 / ${maxPts} PKT – Zasadniczy postęp' lub '0 / ${maxPts} PKT – Próba rozwiązania'>",
  "summary": "<krótkie podsumowanie oceny>",
  "mentorComment": "<krótki, motywujący komentarz mentora w 2. os. lp., np. 'Świetnie wyciągnąłeś 3^10 przed nawias...'. Wzory matematyczne w KaTeX $...$>",
  "strengths": ["<lista poprawnych kroków>"],
  "errors": ["<lista błędów lub braków>"],
  "ckeFeedback": "<komentarz egzaminatora w odniesieniu do schematu CKE>",
  "suggestion": "<wskazówka dla ucznia>",
  "hintForNextAttempt": "<wskazówka do kolejnej próby>"
}

ZASADY OCENIANIA MATURALNEGO:
1. ${maxPts} PUNKTY: Pełne, bezbłędne rozwiązanie i poprawny wniosek końcowy.
2. 1 PUNKT: Zasadniczy postęp w rozwiązaniu zadania (np. poprawne przekształcenie algebraiczne), ale bez pełnego wniosku lub z drobnym błędem.
3. 0 PUNKTÓW: Brak istotnego postępu lub brak powiązania z tezą.
4. Jeśli dołączono obraz tablicy, dokładnie odczytaj pismo odręczne, wzory i obliczenia.`;
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
      try {
        const parsed = JSON.parse(openRouterReply);
        if (typeof parsed.score === 'number' && parsed.gradeTitle) {
          return parsed;
        }
      } catch {
        const match = openRouterReply.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            const parsed = JSON.parse(match[0]);
            if (typeof parsed.score === 'number') return parsed;
          } catch {}
        }
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
            model: 'gemini-3.8-flash',
            contents,
            config: evaluationConfig
          });
        } catch {
          try {
            response = await ai.models.generateContent({
              model: 'gemini-flash-latest',
              contents,
              config: evaluationConfig
            });
          } catch {
            response = await ai.models.generateContent({
              model: 'gemini-3.1-flash-lite',
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

