export type SubjectId = 'polski' | 'matematyka' | 'angielski' | 'biologia';

export type PolishEpoch =
  | 'Starożytność i Biblia'
  | 'Średniowiecze'
  | 'Renesans'
  | 'Barok'
  | 'Oświecenie'
  | 'Romantyzm'
  | 'Pozytywizm'
  | 'Młoda Polska'
  | 'Dwudziestolecie międzywojenne'
  | 'Wojna i okupacja'
  | 'Współczesność';

export type PolishPartNumber = 1 | 2 | 3;

export type PolishTaskType =
  | 'single_choice'
  | 'true_false'
  | 'matching'
  | 'short_open'
  | 'synthesis_note'
  | 'cardinal_error_detector'
  | 'context_architect'
  | 'essay_blueprint';

export interface TrueFalseStatement {
  statement: string;
  isTrue: boolean;
  explanation?: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface TaskVisualAsset {
  imageUrl: string;            // Bezpośredni link do pliku graficznego (.jpg, .png, .webp, .svg)
  imageCaption: string;        // Oficjalny podpis: Autor, „Tytuł dzieła” (rok powstania)
  imageAlt: string;            // Krótki opis dostępności dla czytników ekranu
  fallbackDescription: string; // Szczegółowa analiza wizualna na wypadek braku grafiki
  sourceDomain: string;        // Pochodzenie i status licencyjny, np. "Wikimedia Commons (Public Domain)"
}

export interface PolishTask {
  id: string;
  part: PolishPartNumber;
  partName: 'Język polski w użyciu' | 'Test historycznoliteracki' | 'Warsztat wypracowania';
  taskType: PolishTaskType;
  title: string;
  question: string;
  points: number;
  
  // Opcjonalne powiązania kontekstowe
  epoch?: PolishEpoch;
  lektura?: string;
  isStarRequired?: boolean; // lektura z gwiazdką
  passage?: {
    author?: string;
    sourceTitle?: string;
    text: string;
    paragraphs?: Array<{ number: number; text: string }>;
  };
  passage2?: {
    author?: string;
    sourceTitle?: string;
    text: string;
    paragraphs?: Array<{ number: number; text: string }>;
  };
  imageUrl?: string;
  imageCaption?: string;
  imageAlt?: string;
  fallbackDescription?: string;
  image?: TaskVisualAsset;

  // Warianty odpowiedzi zależne od typu
  options?: string[]; // dla single_choice
  correctOptionIndex?: number; // dla single_choice (0, 1, 2, 3)
  trueFalseStatements?: TrueFalseStatement[]; // dla true_false
  matchingPairs?: MatchingPair[]; // dla matching
  distractors?: string[]; // niepasujące odpowiedzi (dystraktory) do zadań dopasowania
  distractor?: string; // pojedynczy dystraktor do zadań dopasowania
  granularType?: string; // szczegółowy typ CKE (T1-T18)
  hintCke?: string; // wskazówka merytoryczna egzaminatora CKE (koło ratunkowe)

  // Kryteria i odpowiedzi otwarte
  correctAnswerText?: string;
  ckeKeyCriteria?: string[]; // oficjalne zasady przyznawania punktów CKE
  explanation: string;

  // Dedykowane pola dla notatki syntetyzującej
  synthesisTheme?: string;
  synthesisAuthor1Stance?: string;
  synthesisAuthor2Stance?: string;
  synthesisModelSummary?: string;

  // Dedykowane pola dla wypracowania i konspektu
  essayBlueprint?: {
    themeNumber: 1 | 2;
    promptText: string;
    recommendedTheses: string[];
    mandatoryStarBooks: string[];
    secondaryBooks: string[];
    suggestedContexts: {
      type: 'historyczny' | 'filozoficzny' | 'biograficzny' | 'kulturowy' | 'historycznoliteracki' | 'literacki' | 'filozoficzno-egzystencjalny' | string;
      description: string;
    }[];
    cardinalErrorWarning: string;
    modelOutline: {
      introduction: string;
      argument1: string;
      argument2: string;
      contextSummary: string;
      conclusion: string;
    };
  };

  sourceYear?: string; // np. 'CKE Maj 2024'
}

export interface PolishTopicSummary {
  id: string;
  title: string;
  epoch?: PolishEpoch;
  tasksCount: number;
  completedCount: number;
  weightPercent: number; // udział w maturze
  description: string;
}

export interface PolishArgumentBlock {
  id: string;
  book_id: string;
  book_title: string;
  character: string;
  theme: string;           // np. "Władza", "Miłość niszcząca", "Bunt"
  claim: string;           // Teza cząstkowa
  evidence: string;        // Sytuacja fabularna
  context_type: 'BIOGRAPHICAL' | 'HISTORICAL' | 'PHILOSOPHICAL' | 'LITERARY';
  context_description: string;
  punchline: string;
  cke_safety_rating: '100%_SAFE' | 'TRICKY';
}

export interface UserArgumentVault {
  userId: string;
  unlockedBlocks: PolishArgumentBlock[];
  savedCustomBlocks: PolishArgumentBlock[];
  coveragePercent: number; // np. 82% pokrycia motywów maturalnych CKE
}
