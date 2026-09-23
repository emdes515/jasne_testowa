import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  MessageSquare, 
  PenTool, 
  ChevronRight,
  Coins
} from 'lucide-react';
import { triggerHaptic } from '../../utils';
import confetti from 'canvas-confetti';

interface DailyMissionTask {
  id: string;
  pillarId: string;
  pillarNumber: number;
  pillarName: string;
  pillarBadgeColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  topicId: string;
  lessonId: string;
  xpReward: number;
  estimatedTime: string;
}

interface PolishDailyMissionProps {
  onStartLesson?: (topicId: string, lessonId: string) => void;
  completedTasks?: string[];
  userState?: any;
}

export const PolishDailyMission: React.FC<PolishDailyMissionProps> = ({
  onStartLesson,
  completedTasks = [],
  userState
}) => {
  // 3 autentyczne cele dzienne oparte na 3 Filarach CKE (zero AI slopu)
  const missionTasks: DailyMissionTask[] = useMemo(() => [
    {
      id: 'task-filar-1',
      pillarId: 'pillar-1-jezyk-w-uzyciu',
      pillarNumber: 1,
      pillarName: 'Język w użyciu',
      pillarBadgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      icon: MessageSquare,
      title: 'Funkcje języka i retoryka wypowiedzi',
      description: 'Rozpoznawanie funkcji aktu komunikacji oraz środków retorycznych w tekście nieliterackim',
      topicId: 'pol-dzial-1',
      lessonId: 'pol-lesson-1-1',
      xpReward: 20,
      estimatedTime: '~4 min'
    },
    {
      id: 'task-filar-2',
      pillarId: 'pillar-2-lektury',
      pillarNumber: 2,
      pillarName: 'Lektury i epoki',
      pillarBadgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      icon: BookOpen,
      title: 'Sofokles „Antygona” – Tragizm i prawo boskie',
      description: 'Zderzenie racji moralnych, fatum i obrona przed kardynałem w lekturze obowiązkowej',
      topicId: 'pol-dzial-5',
      lessonId: 'pol-lesson-5-2',
      xpReward: 25,
      estimatedTime: '~5 min'
    },
    {
      id: 'task-filar-3',
      pillarId: 'pillar-3-wypracowanie',
      pillarNumber: 3,
      pillarName: 'Wypracowanie',
      pillarBadgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      icon: PenTool,
      title: 'Konstrukcja tezy i dobór kontekstu',
      description: 'Formułowanie stanowiska oraz argumentacja metodą C-W-K do tematu rozprawki CKE',
      topicId: 'pol-dzial-17',
      lessonId: 'pol-lesson-17-1',
      xpReward: 30,
      estimatedTime: '~4 min'
    }
  ], []);

  // Weryfikacja ukończenia zadań w oparciu o stan rzeczywisty użytkownika
  const isTaskDone = (task: DailyMissionTask): boolean => {
    const rawId = task.lessonId;
    const cleanId = rawId.replace(/^(?:pol[-_])?lesson[-_]?/i, '');
    const userLessons: string[] = (userState as any)?.completed_lessons || [];
    
    return (
      completedTasks.includes(`LESSON-${rawId}`) ||
      completedTasks.includes(`LESSON-${cleanId}`) ||
      completedTasks.includes(rawId) ||
      completedTasks.includes(cleanId) ||
      userLessons.includes(rawId) ||
      userLessons.includes(cleanId)
    );
  };

  const completedCount = missionTasks.filter(isTaskDone).length;
  const isAllDone = completedCount === missionTasks.length;

  const handleStartTask = (task: DailyMissionTask) => {
    triggerHaptic('medium');
    if (onStartLesson) {
      onStartLesson(task.topicId, task.lessonId);
    }
  };

  const handleStartNextIncomplete = () => {
    triggerHaptic('medium');
    const next = missionTasks.find(t => !isTaskDone(t)) || missionTasks[0];
    if (next && onStartLesson) {
      onStartLesson(next.topicId, next.lessonId);
    }
  };

  return (
    <div className="w-full bg-surface-card border border-surface-border hover:border-rose-500/40 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden transition-all duration-300">
      {/* Subtelny ambient glow z palety Nocturne Luminary */}
      <div className="absolute top-0 right-0 w-72 h-36 bg-rose-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-12 w-48 h-28 bg-purple-500/8 rounded-full blur-2xl pointer-events-none" />

      {/* Górna belka: Tytuł misji, etykiety oraz licznik postępu */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
              Dzienna Misja CKE
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
              Obszary Matury
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-display font-black text-white tracking-tight leading-snug">
            Dzisiejszy Trening Egzaminacyjny
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Zrealizuj 3 mikro-treningi CKE, aby utrzymać passę i zdobyć pełną premię dnia.
          </p>
        </div>

        {/* Wskaźnik postępu (0/3, 1/3, 2/3, 3/3) */}
        <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 bg-black/30 sm:bg-transparent p-2 sm:p-0 rounded-xl border sm:border-0 border-white/5">
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-mono font-black ${isAllDone ? 'text-emerald-400' : 'text-rose-300'}`}>
              {completedCount} / {missionTasks.length}
            </span>
            <span className="text-[11px] font-medium text-text-muted">ukończone</span>
          </div>

          {/* 3 segmenty postępu */}
          <div className="flex items-center gap-1">
            {missionTasks.map((t, idx) => {
              const done = isTaskDone(t);
              return (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    done 
                      ? 'w-6 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' 
                      : 'w-4 bg-white/10'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Lista 3 zadań (po 1 z każdego filaru) */}
      <div className="space-y-2.5 relative z-10">
        {missionTasks.map((task) => {
          const Icon = task.icon;
          const done = isTaskDone(task);

          return (
            <div
              key={task.id}
              onClick={() => handleStartTask(task)}
              className={`group flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                done
                  ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50'
                  : 'bg-[#0e1626]/80 hover:bg-[#131d33] border-white/5 hover:border-rose-500/40 shadow-sm'
              }`}
            >
              {/* Lewa strona: Ikona filaru + Tytuł i opis */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                  done 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                    : `${task.pillarBadgeColor}`
                }`}>
                  {done ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Icon size={17} />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {task.pillarName}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                      +{task.xpReward} XP
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium hidden sm:inline-block">
                      • {task.estimatedTime}
                    </span>
                  </div>

                  <h3 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                    done ? 'text-slate-300 line-through decoration-emerald-500/50' : 'text-white group-hover:text-rose-200'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-[11px] text-text-secondary truncate hidden sm:block mt-0.5">
                    {task.description}
                  </p>
                </div>
              </div>

              {/* Prawa strona: Przycisk / Status */}
              <div className="shrink-0 flex items-center gap-2">
                {done ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                    <CheckCircle2 size={11} className="text-emerald-400" />
                    <span>Zaliczone</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartTask(task);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 hover:text-white text-xs font-bold transition flex items-center gap-1 active:scale-95 cursor-pointer"
                  >
                    <span>Rozwiąż</span>
                    <ChevronRight size={13} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dolny pasek: Podsumowanie premii i główny przycisk CTA */}
      <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2 text-xs text-text-secondary w-full sm:w-auto">
          <Coins size={14} className="text-amber-400 shrink-0" />
          <span className="text-[11px]">
            Nagroda za całość: <strong className="text-amber-300 font-bold">+75 XP</strong>, <strong className="text-amber-300 font-bold">+15 monet</strong> • ochrona streaku
          </span>
        </div>

        <button
          type="button"
          onClick={handleStartNextIncomplete}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-display font-black transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-md ${
            isAllDone
              ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)]'
          }`}
        >
          <span>{isAllDone ? 'Powtórz dzisiejszą misję' : 'Rozpocznij misję dnia'}</span>
          <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
