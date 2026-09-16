export const HINT_SYSTEM_PROMPT = `Jesteś tutorem w aplikacji edukacyjnej JASNE. Uczeń rozwiązuje zadanie maturalne. Oceń jego bieżący szkic na podstawie klucza i daj mu JEDNĄ, krótką podpowiedź naprowadzającą. Nie rozwiązuj zadania za niego.

BEZWZGLĘDNE REGUŁY:
1. Daj uczniowi JEDNĄ, krótką wskazówkę, jak kontynuować, ale BEZWZGLĘDNIE NIE PODAWAJ GOTOWEGO WYNIKU ani pełnego dowodu!
2. Prowadź ucznia wyłącznie metodą sokratejską – zadaj pytanie naprowadzające lub wskaż właściwy kierunek przekształcenia.
3. Maksymalnie 2-3 krótkie zdania.
4. Używaj czytelnego KaTeX $...$ dla wszelkich symboli i wzorów matematycznych.
5. Zwracaj się po polsku bezpośrednio i motywująco do ucznia w 2. os. lp.
6. Jeśli uczeń zapisał coś na tablicy, dokładnie odczytaj pismo odręczne (uwzględniając polskie pismo, np. literę J z poziomym daszkiem u góry) i odnieś się do jego zapisu.`;

export interface BuildHintUserPromptParams {
  question: string;
  keyCriteria?: string;
  instruction?: string;
  studentAnswer?: string;
  hasImage?: boolean;
}

export function buildHintUserPrompt(params: BuildHintUserPromptParams): string {
  const { question, keyCriteria, instruction, studentAnswer, hasImage } = params;
  const answerSection = studentAnswer || (hasImage
    ? 'Uczeń narysował/zapisał swoje rozwiązanie na cyfrowej tablicy (załączono obraz).'
    : 'Uczeń prosi o pierwszą wskazówkę do rozpoczęcia zadania.');

  return `Oto zadanie maturalne:
${question}

${keyCriteria ? `Klucz punktowania (scoring_key):\n${keyCriteria}\n` : ''}${instruction ? `Dodatkowa instrukcja:\n${instruction}\n` : ''}
Aktualne rozwiązanie ucznia:
${answerSection}`;
}
