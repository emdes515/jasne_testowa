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
  };
  passage2?: {
    author?: string;
    sourceTitle?: string;
    text: string;
  };
  imageUrl?: string;
  imageCaption?: string;

  // Warianty odpowiedzi zależne od typu
  options?: string[]; // dla single_choice
  correctOptionIndex?: number; // dla single_choice (0, 1, 2, 3)
  trueFalseStatements?: TrueFalseStatement[]; // dla true_false
  matchingPairs?: MatchingPair[]; // dla matching

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
      type: 'historyczny' | 'filozoficzny' | 'biograficzny' | 'kulturowy';
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
