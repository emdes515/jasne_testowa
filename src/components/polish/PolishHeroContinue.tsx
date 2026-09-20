import React, { useMemo } from 'react';
import { 
  Flame, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  MessageSquare, 
  PenTool, 
  Sparkles,
  Target
} from 'lucide-react';
import { triggerHaptic } from '../../utils';

interface PolishHeroContinueProps {
  topics: any[];
  completedTasks: string[];
  userState?: any;
  onStartLesson?: (topicId: string, lessonId: string) => void;
}

export const PolishHeroContinue: React.FC<PolishHeroContinueProps> = ({
  topics,
  completedTasks,
  userState,
  onStartLesson
}) => {
  // Wyznacz pierwszą nieukończoną lekcję ucznia w całym programie Języka Polskiego
  const nextLessonInfo = useMemo(() => {
    if (!topics || topics.length === 0) return null;

    for (let tIdx = 0; tIdx < topics.length; tIdx++) {
      const topic = topics[tIdx];
      const lessons = topic.lessons_metadata || topic.lessons || [];

      for (let lIdx = 0; lIdx < lessons.length; lIdx++) {
        const lesson = lessons[lIdx];
        const rawId = lesson.id;
        const cleanId = rawId.replace(/^(?:pol[-_])?lesson[-_]?/i, '');
        const dotId = cleanId.replace('-', '.');

        const userLessons: string[] = (userState as any)?.completed_lessons || [];
        const isDone = 
          completedTasks.includes(`LESSON-${rawId}`) ||
          completedTasks.includes(`LESSON-${cleanId}`) ||
          completedTasks.includes(`LESSON-${dotId}`) ||
          completedTasks.includes(rawId) ||
          completedTasks.includes(cleanId) ||
          userLessons.includes(rawId) ||
          userLessons.includes(cleanId) ||
          userLessons.includes(dotId);

        if (!isDone) {
          const pillarId = topic.pillar_id || (
            (topic.numericId || tIdx + 1) <= 4 
              ? 'pillar-1-jezyk-w-uzyciu'
              : (topic.numericId || tIdx + 1) <= 16
                ? 'pillar-2-lektury'
                : 'pillar-3-wypracowanie'
          );

          const pillarName = pillarId === 'pillar-1-jezyk-w-uzyciu'
            ? 'Język w użyciu'
            : pillarId === 'pillar-2-lektury'
              ? 'Lektury i epoki'
              : 'Wypracowanie';

          const pillarColor = pillarId === 'pillar-1-jezyk-w-uzyciu'
            ? { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' }
            : pillarId === 'pillar-2-lektury'
              ? { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' }
              : { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' };

          const PillarIcon = pillarId === 'pillar-1-jezyk-w-uzyciu'
            ? MessageSquare
            : pillarId === 'pillar-2-lektury'
              ? BookOpen
              : PenTool;

          return {
            topicId: topic.id,
            topicNumericId: topic.numericId || tIdx + 1,
            topicTitle: topic.short_title || topic.title || topic.name,
            lessonId: rawId,
            lessonTitle: lesson.title || lesson.name || rawId,
            estimatedTime: lesson.estimated_time_formatted || '~5 min',
            tasksCount: lesson.tasks_count || lesson.required_correct_tasks || 3,
            pillarId,
            pillarName,
            pillarColor,
            PillarIcon
          };
        }
      }
    }

    // Jeśli wszystkie lekcje ukończone, zwróć pierwszą jako powtórkę
    const firstTopic = topics[0];
    const firstLesson = (firstTopic?.lessons_metadata || firstTopic?.lessons || [])[0];
    if (firstTopic && firstLesson) {
      return {
        topicId: firstTopic.id,
        topicNumericId: firstTopic.numericId || 1,
        topicTitle: firstTopic.short_title || firstTopic.title,
        lessonId: firstLesson.id,
        lessonTitle: firstLesson.title,
        estimatedTime: '~5 min',
        tasksCount: 3,
        pillarId: 'pillar-1-jezyk-w-uzyciu',
        pillarName: 'Tryb Powtórkowy',
        pillarColor: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
        PillarIcon: Sparkles,
        isReviewMode: true
      };
    }

    return null;
  }, [topics, completedTasks, userState]);

  if (!nextLessonInfo) return null;

  const { PillarIcon, pillarColor } = nextLessonInfo;

  const handleStart = () => {
    triggerHaptic('medium');
    if (onStartLesson) {
      onStartLesson(nextLessonInfo.topicId, nextLessonInfo.lessonId);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-surface-card via-[#131b2e] to-surface-card border border-surface-border hover:border-rose-500/30 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden transition-all">
      {/* Subtelny ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-32 bg-rose-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-8 w-40 h-24 bg-purple-500/8 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Lewa strona: Metadane i treść lekcji */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
              Twoja Dzisiejsza Lekcja
            </span>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${pillarColor.bg} ${pillarColor.text} ${pillarColor.border}`}>
              <PillarIcon size={10} />
              <span>{nextLessonInfo.pillarName}</span>
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white leading-snug truncate">
            {nextLessonInfo.lessonTitle}
          </h2>

          <p className="text-xs text-slate-400 font-medium mt-0.5 line-clamp-1">
            Dział {nextLessonInfo.topicNumericId}: {nextLessonInfo.topicTitle}
          </p>

          <div className="flex items-center gap-2.5 mt-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-300 bg-black/30 border border-white/10 px-2 py-0.5 rounded-md">
              <Clock size={11} className="text-slate-400" />
              <span>{nextLessonInfo.estimatedTime}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-300 bg-black/30 border border-white/10 px-2 py-0.5 rounded-md">
              <Target size={11} className="text-rose-400" />
              <span>{nextLessonInfo.tasksCount} zadania</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-300/90 font-medium">
              <Flame size={12} className="text-amber-400" />
              <span>Ukończ, aby obronić streak (+50 XP)</span>
            </span>
          </div>
        </div>

        {/* Prawa strona: Przycisk CTA */}
        <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
          <button
            type="button"
            onClick={handleStart}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-display font-black text-xs sm:text-sm bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] hover:shadow-[0_0_35px_rgba(244,63,94,0.6)] flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
          >
            <span>{nextLessonInfo.isReviewMode ? 'Powtórz lekcję' : 'Kontynuuj lekcję'}</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
