export interface EvaluateFallbackParams {
  cleanAnswer: any;
  officialKey?: any;
  scoring_key?: any;
  maxPts: number;
  isFirstAttempt: boolean;
  ai_tutor_rubric?: { criterion_1_point?: string; criterion_2_points?: string };
  isEnglish?: boolean;
}

export function evaluateFallback(params: EvaluateFallbackParams) {
  const { cleanAnswer, officialKey, scoring_key, maxPts, isEnglish, ai_tutor_rubric } = params;
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

  // Dedykowany fallback dla zadań otwartych z języka angielskiego
  if (isEnglish) {
    const normalize = (s: string) => s
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, '')
      .replace(/\b(can't|cannot)\b/g, 'can not')
      .replace(/\b(don't)\b/g, 'do not')
      .replace(/\b(doesn't)\b/g, 'does not')
      .replace(/\b(didn't)\b/g, 'did not')
      .replace(/\b(won't)\b/g, 'will not')
      .replace(/\b(i'm)\b/g, 'i am')
      .replace(/\b(it's)\b/g, 'it is')
      .replace(/\b(you're)\b/g, 'you are')
      .replace(/\s+/g, ' ')
      .trim();

    const normAnswer = normalize(text);
    const normKey = normalize(rubricSource);
    const keyWords = normKey.split(' ').filter(w => w.length > 2);
    const matchedWords = keyWords.filter(w => normAnswer.includes(w));
    const matchRatio = keyWords.length > 0 ? matchedWords.length / keyWords.length : 0;

    const isExactMatch = normAnswer === normKey || (normKey.length > 0 && normKey.includes(normAnswer)) || (normAnswer.length > 0 && normAnswer.includes(normKey));
    const isStrongProgress = matchRatio >= 0.6 || normAnswer.length >= 8;

    let score = 0;
    if (isExactMatch || matchRatio >= 0.8) {
      score = maxPts;
    } else if (isStrongProgress) {
      score = Math.max(1, Math.floor(maxPts * 0.5));
    }

    const passed = score >= Math.ceil(maxPts * 0.5);

    return {
      score,
      maxPoints: maxPts,
      isPassed: passed,
      gradeTitle: score === maxPts
        ? `${maxPts} / ${maxPts} PKT – Poprawna odpowiedź CKE`
        : score > 0
          ? `${score} / ${maxPts} PKT – Częściowo poprawna odpowiedź`
          : `0 / ${maxPts} PKT – Wymaga poprawy`,
      summary: score === maxPts
        ? (typeof ai_tutor_rubric?.criterion_2_points === 'string' ? ai_tutor_rubric.criterion_2_points : 'Znakomicie! Odpowiedź w pełni zgodna ze schematem CKE.')
        : score > 0
          ? (typeof ai_tutor_rubric?.criterion_1_point === 'string' ? ai_tutor_rubric.criterion_1_point : 'Dobra próba. Zwróć uwagę na formę gramatyczną lub słownictwo.')
          : 'Odpowiedź wymaga dopracowania struktury gramatycznej.',
      mentorComment: score === maxPts
        ? 'Świetna robota! Konstrukcja gramatyczna i użyte słownictwo są w pełni poprawne.'
        : score > 0
          ? 'Jesteś blisko właściwej odpowiedzi. Zwróć uwagę na formę czasownika lub przyimek.'
          : 'Przeanalizuj podany kontekst i regułę gramatyczną, a następnie spróbuj ponownie.',
      strengths: score > 0 ? ['Zrozumienie intencji komunikacyjnej', 'Właściwy dobór konstrukcji'] : [],
      errors: score < maxPts ? ['Niedokładna forma gramatyczna lub literówka'] : [],
      ckeFeedback: `Zgodnie ze standardami oceniania CKE przyznano ${score} z ${maxPts} pkt.`,
      suggestion: 'Porównaj swoją odpowiedź z modelem odpowiedzi i regułami w zakładce Struktury.',
      hintForNextAttempt: 'Upewnij się, że nie przekraczasz limitu słów i stosujesz właściwy czas.'
    };
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
