export interface MistakeEntry {
  id: string;                      // Unikalny identyfikator wpisu błędu
  taskId: string;                  // ID zadania źródłowego (np. 'POL_P1_T1_001', 'matura-maj-2024-zad-1')
  subject: 'polski' | 'matematyka';
  topicOrEpoch: string;            // np. "Pozytywizm", "Planimetria", "Język w użyciu"
  title: string;                   // Tytuł zadania
  question: string;                // Treść polecenia
  taskType: string;                // 'single_choice' | 'true_false' | 'matching' | 'short_open' | 'synthesis_note' | itp.
  points: number;                  // Waga punktowa
  
  // Warianty odpowiedzi i dane zadania
  options?: string[];              // Opcje odpowiedzi ABCD (dla single_choice)
  correctAnswer: any;              // Wartość poprawnej odpowiedzi (indeks, litera, tekst, tabela)
  userWrongAnswer?: any;           // Ostatnia błędna odpowiedź ucznia
  explanation?: string;            // Wyjaśnienie merytoryczne CKE
  ckeKeyCriteria?: string[];       // Kryteria oceniania CKE
  
  // Materiały źródłowe powiązane z zadaniem
  visualAsset?: any;               // Obiekt TaskVisualAsset (dzieło sztuki, wykres)
  passage?: {
    author?: string;
    sourceTitle?: string;
    text: string;
  };
  passage2?: {
    author?: string;
    sourceTitle?: string;
    text: string;
  };
  trueFalseStatements?: Array<{
    statement: string;
    isTrue: boolean;
    explanation?: string;
  }>;
  matchingPairs?: Array<{
    left: string;
    right: string;
  }>;
  distractor?: string;

  // Mechanika Spaced Repetition (2 etapy opanowania)
  // 0: Do powtórki (nowo zarejestrowany lub nieudany)
  // 1: Weryfikacja 1/2 (poprawny 1. raz -> zablokowany do jutra)
  // 2: Opanowane 2/2 (poprawny 2. raz w kolejnym dniu -> zarchiwizowany)
  stage: 0 | 1 | 2;
  firstFailedAt: string;           // ISO timestamp pierwszego błędu
  lastAttemptAt: string;           // ISO timestamp ostatniej próby poprawy
  lastSuccessDate?: string;        // Data ostatniego bezbłędnego rozwiązania w formacie 'YYYY-MM-DD'
  attemptsCount: number;           // Łączna liczba podejść
}

export type MistakeFilterSubject = 'all' | 'polski' | 'matematyka';
export type MistakeFilterStatus = 'all_active' | 'ready_today' | 'locked_today' | 'mastered';
