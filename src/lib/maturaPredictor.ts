import { PredictorResult, TopicMasteryBreakdown } from '../types';
import { getSubjectCkeConfig } from '../data/ckeSubjectWeights';
import { filterActualTaskIds } from '../utils';

export interface CalculateMaturaPredictionParams {
  subjectId?: string;
  completedTasks?: string[];
  lessonMistakes?: Record<string, number>;
  userLessonsCompleted?: string[];
  maturaAttempts?: number;
  maturaBestScore?: number;
  simulatedMasteryOverrides?: Record<string, number>; // topicId -> 0..100
}

/**
 * Wyodrębnia identyfikator działu (np. "dzial-1", "pol-dzial-3") z identyfikatora zadania lub lekcji
 */
export function extractTopicIdFromEntityId(id: string, subjectId: string): string | null {
  if (!id) return null;
  const isPol = subjectId === 'pol' || subjectId === 'jezyk-polski';

  // Obsługa zadań/lekcji języka polskiego
  if (isPol || id.includes('pol-')) {
    const polMatch = id.match(/pol[-_]?(?:dzial|task|lesson)[-_]?(\d+)/i) || id.match(/pol[-_]?(\d+)/i);
    if (polMatch) {
      return `pol-dzial-${polMatch[1]}`;
    }
  }

  // Obsługa matematyki:
  // Wzorce:
  // "task-1-2-3" -> dzial-1
  // "lesson-1-2" -> dzial-1
  // "dzial-1" -> dzial-1
  // "THEORY-lesson-1-2" -> dzial-1
  // "LESSON-1-2" -> dzial-1
  // "1.2" lub "1-2" -> dzial-1
  const directDzialMatch = id.match(/dzial[-_]?(\d+)/i);
  if (directDzialMatch) {
    return `dzial-${directDzialMatch[1]}`;
  }

  const taskMatch = id.match(/^task[-_]?(\d+)[-_]/i);
  if (taskMatch) {
    return `dzial-${taskMatch[1]}`;
  }

  const lessonMatch = id.match(/(?:lesson|LESSON|THEORY)[-_]?(\d+)[-.]/i);
  if (lessonMatch) {
    return `dzial-${lessonMatch[1]}`;
  }

  const dotMatch = id.match(/^(\d{1,2})[.-]\d+/);
  if (dotMatch) {
    const num = parseInt(dotMatch[1], 10);
    if (num >= 1 && num <= 15) {
      return `dzial-${num}`;
    }
  }

  return null;
}

/**
 * Szacuje liczbę lekcji w danym dziale (Dział 1 ma 15 lekcji, pozostałe po ok. 10-14)
 */
function getExpectedLessonsForTopic(topicId: string): number {
  if (topicId === 'dzial-1') return 15;
  if (topicId === 'dzial-3' || topicId === 'dzial-6' || topicId === 'dzial-9') return 14;
  return 11;
}

/**
 * Czysty silnik predykcji wyniku maturalnego CKE (Formuła 2023)
 */
export function calculateMaturaPrediction(params: CalculateMaturaPredictionParams): PredictorResult {
  const {
    subjectId = 'matematyka-podstawowa',
    completedTasks = [],
    lessonMistakes = {},
    userLessonsCompleted = [],
    maturaAttempts = 0,
    maturaBestScore,
    simulatedMasteryOverrides = {}
  } = params;

  const config = getSubjectCkeConfig(subjectId);
  const topicEntries = Object.entries(config.topics);

  // Filtrowanie rzeczywistych unikalnych zadań
  const actualTasks = filterActualTaskIds(completedTasks);

  // 1. Grupowanie zadań i lekcji per dział
  const tasksByTopic: Record<string, Set<string>> = {};
  const lessonsByTopic: Record<string, Set<string>> = {};
  const mistakesByTopic: Record<string, number> = {};

  topicEntries.forEach(([tId]) => {
    tasksByTopic[tId] = new Set();
    lessonsByTopic[tId] = new Set();
    mistakesByTopic[tId] = 0;
  });

  // Przypisanie ukończonych zadań
  actualTasks.forEach(taskId => {
    const tId = extractTopicIdFromEntityId(taskId, config.subjectId);
    if (tId && tasksByTopic[tId]) {
      tasksByTopic[tId].add(taskId);
    }
  });

  // Przypisanie ukończonych lekcji (z userState oraz completedTasks z prefiksem LESSON-)
  const allCompletedLessons = Array.from(new Set([
    ...userLessonsCompleted,
    ...completedTasks.filter(id => id.startsWith('LESSON-') || id.startsWith('lesson-'))
  ]));

  allCompletedLessons.forEach(lId => {
    const tId = extractTopicIdFromEntityId(lId, config.subjectId);
    if (tId && lessonsByTopic[tId]) {
      lessonsByTopic[tId].add(lId);
    }
  });

  // Przypisanie błędów z bazy błędów
  Object.entries(lessonMistakes).forEach(([lessonKey, count]) => {
    const tId = extractTopicIdFromEntityId(lessonKey, config.subjectId);
    if (tId && mistakesByTopic[tId] !== undefined) {
      mistakesByTopic[tId] += count;
    }
  });

  // 2. Liczba zadań i lekcji przypisana specyficznie do tego przedmiotu
  const subjectTasksCount = Object.values(tasksByTopic).reduce((sum, set) => sum + set.size, 0);
  const subjectLessonsCount = Object.values(lessonsByTopic).reduce((sum, set) => sum + set.size, 0);

  const REQUIRED_CALIBRATION_TASKS = 5;
  const isCalibrating = 
    subjectTasksCount < REQUIRED_CALIBRATION_TASKS && 
    subjectLessonsCount === 0 && 
    (maturaAttempts || 0) === 0;

  const calibrationProgress = {
    current: subjectTasksCount,
    required: REQUIRED_CALIBRATION_TASKS,
    percentage: Math.min(100, Math.round((subjectTasksCount / REQUIRED_CALIBRATION_TASKS) * 100))
  };

  // 3. Obliczenie stopnia opanowania (Mastery) każdego działu
  const topicBreakdown: TopicMasteryBreakdown[] = [];
  let sumWeightedPoints = 0;
  let totalMaxConfigPoints = 0;
  let touchedTopicsCount = 0;

  // Statystyczna bazowa szansa trafienia przy losowym zgadywaniu (zadania zamknięte ABCD)
  const BASE_GUESSING_PROBABILITY = 0.12; // 12%

  topicEntries.forEach(([tId, weight]) => {
    totalMaxConfigPoints += weight.averagePoints;
    const completedTasksCount = tasksByTopic[tId]?.size || 0;
    const completedLessonsCount = lessonsByTopic[tId]?.size || 0;
    const mistakesCount = mistakesByTopic[tId] || 0;
    const expectedLessons = getExpectedLessonsForTopic(tId);

    let masteryNormalized = BASE_GUESSING_PROBABILITY;

    // Sprawdzenie, czy użytkownik użył suwaka w symulatorze
    if (simulatedMasteryOverrides[tId] !== undefined) {
      masteryNormalized = Math.max(0, Math.min(100, simulatedMasteryOverrides[tId])) / 100;
      touchedTopicsCount++;
    } else {
      // Obliczenie wskaźnika pokrycia materiału (lessons vs tasks)
      const lessonProgressRatio = completedLessonsCount / expectedLessons;
      const taskProgressRatio = completedTasksCount / (expectedLessons * 3);
      const coverageRatio = Math.min(1.0, Math.max(lessonProgressRatio, taskProgressRatio));

      if (coverageRatio > 0) {
        touchedTopicsCount++;
        // Dokładność odpowiedzi (korygowana liczbą błędów)
        const totalAttempts = completedTasksCount + mistakesCount;
        const accuracy = totalAttempts > 0 
          ? Math.max(0.5, completedTasksCount / totalAttempts)
          : 1.0;

        // Formuła: Baza (12%) + postęp * celność * 88%
        masteryNormalized = Math.min(1.0, BASE_GUESSING_PROBABILITY + (coverageRatio * accuracy) * (1 - BASE_GUESSING_PROBABILITY));
      } else {
        masteryNormalized = BASE_GUESSING_PROBABILITY;
      }
    }

    const expectedPoints = Math.round(masteryNormalized * weight.averagePoints * 10) / 10;
    sumWeightedPoints += expectedPoints;

    topicBreakdown.push({
      topicId: tId,
      name: weight.name,
      importance: weight.importance,
      masteryPercent: Math.round(masteryNormalized * 100),
      expectedPoints,
      maxPoints: weight.averagePoints,
      completedLessonsCount,
      totalLessonsCount: expectedLessons,
      completedTasksCount,
      mistakesCount
    });
  });

  // 4. Obliczenie ogólnego wyniku procentowego i punktowego
  const scalingFactor = totalMaxConfigPoints > 0 ? (config.totalExamPoints / totalMaxConfigPoints) : 1;
  const rawCurriculumPoints = sumWeightedPoints * scalingFactor;

  // Synergia fundamentów: opanowanie Działu 1 (Liczby Rzeczywiste) podnosi sprawność w całym arkuszu CKE (+2.5 p.p.)
  const isDzial1Mastered = (tasksByTopic['dzial-1']?.size || 0) >= 15 || (lessonsByTopic['dzial-1']?.size || 0) >= 10;
  const foundationSynergyPoints = isDzial1Mastered ? 1.25 : 0;

  const totalCalculatedPoints = Math.min(config.totalExamPoints, rawCurriculumPoints + foundationSynergyPoints);
  let curriculumPercent = Math.min(100, Math.max(0, Math.round((totalCalculatedPoints / config.totalExamPoints) * 100)));

  // 5. Korekta o wyniki z Symulatora Matury (jeśli uczeń pisał pełne arkusze)
  let finalPercent = curriculumPercent;
  if (maturaAttempts > 0 && typeof maturaBestScore === 'number' && maturaBestScore > 0) {
    // Waga symulatora rośnie z każdą próbą arkusza do max 40%
    const simulatorWeight = Math.min(0.40, maturaAttempts * 0.12);
    finalPercent = Math.round((1 - simulatorWeight) * curriculumPercent + simulatorWeight * maturaBestScore);
    finalPercent = Math.min(100, Math.max(0, finalPercent));
  }

  const finalPoints = Math.round((finalPercent / 100) * config.totalExamPoints * 10) / 10;

  // 6. Wskaźnik pewności predykcji (Confidence Score: 0 - 100%)
  const totalTopicsCount = topicEntries.length || 15;
  const topicCoverageRatio = touchedTopicsCount / totalTopicsCount;
  const taskVolumeRatio = Math.min(1.0, subjectTasksCount / 40);
  const examExperienceFactor = Math.min(0.25, (maturaAttempts || 0) * 0.12);

  // Pewność startuje od 10% dla świeżego konta i rośnie wraz ze zbieraniem danych
  const confidenceScore = isCalibrating
    ? Math.round(10 + (calibrationProgress.percentage * 0.15))
    : Math.round(
        Math.min(98, Math.max(25, 20 + (topicCoverageRatio * 40) + (taskVolumeRatio * 25) + (examExperienceFactor * 25)))
      );

  // 7. Przedział ufności (Margines błędu)
  const uncertaintyMargin = Math.round(((100 - confidenceScore) / 100) * 16);
  const minPercent = Math.max(0, finalPercent - uncertaintyMargin);
  const maxPercent = Math.min(100, finalPercent + uncertaintyMargin);

  // 8. Dynamiczny wybór "Najszybszego Skoku Punktowego" (Next Best Topic)
  // Szukamy działu o największej liczbie niezdobytych punktów CKE z preferencją dla pewniaków
  let bestTopicCandidate = topicBreakdown[0];
  let maxPriorityScore = -1;

  topicBreakdown.forEach(topic => {
    const unmasteredRatio = 1 - (topic.masteryPercent / 100);
    const potentialPoints = unmasteredRatio * topic.maxPoints * scalingFactor;

    // Mnożnik wagi CKE
    let importanceMultiplier = 1.0;
    if (topic.importance === 'CRITICAL_PEWNIAK') importanceMultiplier = 1.5;
    else if (topic.importance === 'HIGH') importanceMultiplier = 1.25;

    const priorityScore = potentialPoints * importanceMultiplier;

    // Rekomendujemy działy, które nie są jeszcze w pełni opanowane (< 85%)
    if (topic.masteryPercent < 85 && priorityScore > maxPriorityScore) {
      maxPriorityScore = priorityScore;
      bestTopicCandidate = topic;
    }
  });

  // Obliczenie potencjalnego zysku punktowego z rekomendowanego działu
  const unmasteredOfBest = 1 - (bestTopicCandidate.masteryPercent / 100);
  const potentialPointGain = Math.round(unmasteredOfBest * bestTopicCandidate.maxPoints * scalingFactor * 10) / 10;

  return {
    subjectId: config.subjectId,
    subjectName: config.name,
    predictedPercent: finalPercent,
    predictedPoints: finalPoints,
    minPercent,
    maxPercent,
    confidenceScore,
    isPassing: finalPercent >= config.passingThresholdPercent,
    totalExamPoints: config.totalExamPoints,
    passingThresholdPoints: config.passingThresholdPoints,
    isCalibrating,
    calibrationProgress,
    nextBestTopic: {
      topicId: bestTopicCandidate.topicId,
      topicName: bestTopicCandidate.name,
      potentialPointGain: Math.max(1.5, potentialPointGain),
      importance: bestTopicCandidate.importance
    },
    topicBreakdown
  };
}
