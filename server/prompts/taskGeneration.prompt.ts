export interface BuildTaskGenerationPromptParams {
  subject: string;
  topic: string;
  taskType: string;
  difficulty: string;
  customPrompt?: string;
}

export function buildTaskGenerationSystemPrompt(params: {
  isPolish: boolean;
  topic: string;
  taskType: string;
  difficulty: string;
}): string {
  const { isPolish, topic, taskType, difficulty } = params;

  if (isPolish) {
    return `Jesteś doświadczonym ekspertem Centralnej Komisji Egzaminacyjnej (CKE) z języka polskiego (Nowa Formuła 2023/2026).
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
}`;
  }

  return `Jesteś doświadczonym autorem oficjalnych arkuszy maturalnych CKE z matematyki (Nowa Formuła 2023/2026, Poziom Podstawowy).
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
}

export function buildTaskGenerationUserPrompt(params: BuildTaskGenerationPromptParams): string {
  const isPolish = params.subject === 'pol' || params.subject === 'jezyk-polski';
  return `Wygeneruj autorskie zadanie maturalne:
Przedmiot: ${isPolish ? 'Język Polski' : 'Matematyka'}
Dział: ${params.topic}
Typ zadania: ${params.taskType}
Poziom: ${params.difficulty}
${params.customPrompt ? `Dodatkowe wytyczne: ${params.customPrompt}` : ''}`;
}
