export interface UserPerks {
  xpBoostPercent: number; // e.g. 15 = +15% XP from tasks and matura
  coinBoostPercent: number; // e.g. 10 = +10% coins
  streakFreezes: number; // count of streak freezes (protects streak & rust)
  arenaShields: number; // count of ELO loss protection shields in Arena
  arenaTokenBonusPercent: number; // extra tokens on Arena win
  temporaryXpBoostCharges?: number; // 2x XP for next N tasks
}

export interface UserState {
  xp: number;
  coins: number;
  gems: number;
  masteryTokens?: number; // Arena Mastery Tokens
  arenaRating?: number; // Current ELO rating
  arenaWins?: number; // Total Arena wins
  streakDays: number; // Active streak count - single source of truth
  lastStreakDate?: string; // YYYY-MM-DD of last completed task
  streakActiveDates?: string[]; // Array of YYYY-MM-DD strings for completed days
  dailyTaskCounts?: Record<string, number>; // YYYY-MM-DD -> tasks completed count
  dailyQuestsClaimed?: Record<string, number[]>; // YYYY-MM-DD -> array of claimed tier IDs [1, 2, 3]
  maturaAttempts?: number; // Finished matura exam attempts
  maturaBestScore?: number; // Best score percentage in matura
  level: number;
  campusRust: number; // 0-100%
  lastActive: number;
  claimedAchievements?: Record<string, number>; // achievementId -> highest claimed tier (1-5)
  perks?: UserPerks;
  timeSpentTotalSeconds?: number; // Total active study time in seconds
  weeklyTimeSpentMinutes?: number; // Active study minutes this week (resets Monday 00:00)
  lastWeekKey?: string; // e.g. "2025-W10"
  hasCompletedOnboarding?: boolean;
  onboardingPreferences?: {
    targetExam: 'matura_2025' | 'poprawka' | 'e8';
    targetScore: '30' | '70' | '100';
    dailyMinutes: 5 | 10 | 15;
  };
  completed_lessons?: string[]; // Array of completed lesson IDs (e.g. ['lesson-1-1', '1.1'])
  completedLessons?: Record<string, any>; // Record of lesson progression metadata
  // Hearts & PRO Sponsorship fields
  isPro?: boolean; // Czy użytkownik ma aktywny pakiet PRO (nielimitowane serca, AI Vision)
  hearts?: number; // Bieżąca liczba serc (0 do 5, domyślnie 5)
  maxHearts?: number; // Maksymalna liczba serc (domyślnie 5)
  lastHeartRegenTimestamp?: number; // Timestamp (Date.now()) ostatniej regeneracji serca
  aiVisionDailyCount?: number; // Liczba użytych ocen tablicy przez AI w danym dniu
  lastVisionDate?: string; // YYYY-MM-DD ostatniego sprawdzenia AI
  // AI Token Analytics
  aiUsage?: UserAiUsageSummary;
}

export interface AiTokenUsageData {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  model: string;
  estimatedCostUsd?: number;
}

export interface UserAiUsageSummary {
  totalTokens: number;
  promptTokens: number;
  completionTokens: number;
  totalRequests: number;
  estimatedCostUsd: number;
  lastUsedAt?: string;
  modelsUsed?: Record<string, number>;
  dailyTokens?: Record<string, number>;
}

export interface WorkedExampleStep {
  step_num: number;
  label?: string;
  explanation: string;
  latex?: string;
}

export interface WorkedExample {
  problem: string;
  step1?: string;
  step2?: string;
  steps?: WorkedExampleStep[];
  result?: string;
}

export interface BookCharacter {
  name: string;
  role: string;
}

export interface BookScene {
  scene: string;
  significance: string;
}

export interface BookSummary {
  title: string;
  author?: string;
  epoch?: string;
  genre?: string;
  plot_overview: string;
  key_events: string[];
  characters: BookCharacter[];
  key_scenes: BookScene[];
}

export interface FormattedFormulaItem {
  title?: string;
  latex: string;
  description?: string;
}

export interface LessonTheoryPill {
  lessonId?: string;
  title?: string;
  concept_essence?: string;
  matura_context?: string;
  core_formulas?: string | string[] | any;
  formula_notes?: string;
  coreFormulaLatex?: string;
  worked_example?: string | WorkedExample | any;
  exam_trap?: string;
  intuition?: string;
  keyTakeaway?: string;
  trapAlert?: string;
  summary?: string;
  key_points?: string[];
  keyPoints?: string[];
  book_summary?: BookSummary;
  streszczenie?: string;
  diagram?: any;
}

export type TabState = 'dashboard' | 'nauka' | 'arena' | 'profile' | 'simulator';

export type TaskType = 'SINGLE_CHOICE' | 'MULTI_CHOICE' | 'NUMERIC_INPUT' | 'OPEN_PROOF' | 'OPEN_GENERAL' | 'TRUE_FALSE' | 'TWO_PART' | 'theory' | 'OPEN_TASK';
export type CkeTaskType = TaskType;

export interface TaskOption {
  id: string; // e.g. "A", "B", "C", "D"
  content_latex: string; // e.g. "$3^5$"
  text?: string;
  is_correct: boolean;
}

export interface TaskSolutionStep {
  step_num: number;
  description: string;
  latex?: string;
}

export interface TaskHints {
  level_1: string;
  level_2: string;
  ai_tutor_prompt?: string;
  hint_cost?: { level_1: number; level_2: number } | number;
}

export interface MathTaskItem {
  id: string;
  type: TaskType;
  source?: string; // e.g. "Matura Maj 2024 • Zadanie 1"
  cke_source?: string; // backwards compatibility
  title: string;
  topic: string;
  instruction: string;
  math_statement: string; // LaTeX expression with $...$ delimiters
  question?: string; // backwards compatibility fallback
  options?: TaskOption[];
  required_selections_count?: number;
  numeric_correct_answer?: string | number;
  numeric_unit?: string;
  correct_answer?: string;
  correctAnswer?: string;
  input_placeholder?: string;
  statements?: { id: string; text: string; correct: string }[];
  part_1?: { prompt?: string; options: { id: string; text: string }[] };
  part_2?: { prompt?: string; options: { id: string; text: string }[] };
  hints: TaskHints;
  hint_cost?: { level_1: number; level_2: number } | number;
  ai_hint_enabled?: boolean;
  ai_hint_cost?: number;
  scoring_key?: string;
  points?: number;
  official_solution_steps: TaskSolutionStep[];
  officialKey?: string; // backwards compatibility
  maxPoints?: number;
  xp?: number;
  difficulty?: string;
  time?: string;
  plot?: any;
  diagram?: any;
}

export interface AiTaskEvaluationResult {
  score: number;
  maxPoints: number;
  isPassed: boolean;
  gradeTitle: string;
  summary: string;
  mentorComment?: string;
  strengths: string[];
  errors: string[];
  ckeFeedback: string;
  suggestion?: string;
  hintForNextAttempt?: string;
}

// ==========================================
// CKE Matura Predictor Types
// ==========================================

export type CkeTopicImportance = 'CRITICAL_PEWNIAK' | 'HIGH' | 'MEDIUM';

export interface TopicCkeWeight {
  topicId: string; // np. "dzial-1"
  name: string;
  minPoints: number;
  maxPoints: number;
  averagePoints: number; // waga punktowa (suma dla matmy = 50 pkt)
  importance: CkeTopicImportance;
}

export interface SubjectCkeConfig {
  subjectId: string; // "matematyka-podstawowa", "matematyka-rozszerzona", "jezyk-polski"
  name: string;
  totalExamPoints: number; // 50
  passingThresholdPoints: number; // 15 (30%)
  passingThresholdPercent: number; // 30
  topics: Record<string, TopicCkeWeight>;
}

export interface TopicMasteryBreakdown {
  topicId: string;
  name: string;
  importance: CkeTopicImportance;
  masteryPercent: number; // 0 - 100
  expectedPoints: number; // oczekiwana liczba punktów (np. 4.2)
  maxPoints: number; // maksymalna waga CKE (np. 5.5)
  completedLessonsCount: number;
  totalLessonsCount: number;
  completedTasksCount: number;
  mistakesCount: number;
}

export interface PredictorResult {
  subjectId: string; // "matematyka-podstawowa", "jezyk-polski"
  subjectName: string; // "Matematyka", "Język Polski"
  predictedPercent: number; // np. 54
  predictedPoints: number; // np. 27 / 50
  minPercent: number; // np. 48
  maxPercent: number; // np. 60
  confidenceScore: number; // 0 do 100 (%)
  isPassing: boolean; // true jeśli predictedPercent >= 30
  totalExamPoints: number; // 50
  passingThresholdPoints: number; // 15
  isCalibrating: boolean; // true jeśli użytkownik rozwiązał < 5 zadań i brak prób matury
  calibrationProgress: {
    current: number; // np. 1
    required: number; // 5
    percentage: number; // np. 20
  };
  nextBestTopic: {
    topicId: string;
    topicName: string;
    potentialPointGain: number; // np. +5.5 pkt
    importance: CkeTopicImportance;
  };
  topicBreakdown: TopicMasteryBreakdown[];
}

export type SubjectKey = 'math' | 'pol' | 'eng' | 'math-roz' | 'eng-roz';
