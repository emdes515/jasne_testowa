export type PolishModuleType =
  | 'Język w użyciu'
  | 'Test historycznoliteracki'
  | 'Warsztat wypracowania';

export interface LessonTheoryPoint {
  title: string;
  content: string;
}

export interface GatekeeperQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface LessonIntroduction {
  lead: string;
  objectives: string[];
  theoryPoints: LessonTheoryPoint[];
  ckeExaminerTips: string[];
  cardinalWarning?: string;
  gatekeeper: GatekeeperQuestion;
}

export interface LessonSummary {
  keyTakeaways: string[];
  reflection: string;
}

export interface PolishLesson {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  module: PolishModuleType;
  epoch?: string;
  lektura?: string;
  durationMinutes: number; // 45 min
  introduction: LessonIntroduction;
  taskIds: string[];
  summary: LessonSummary;
}
