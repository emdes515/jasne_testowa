const fs = require('fs');
let content = fs.readFileSync('src/components/LearnView.tsx', 'utf8');

const replacement = `
  return (
    <div className="flex flex-col min-h-full max-w-2xl mx-auto w-full overflow-x-hidden relative">
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        {viewState === 'subjects' && (
          <motion.div 
            key="subjects"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 flex flex-col pt-8 pb-28 px-5"
          >
            <h1 className="text-3xl font-display font-black text-white mb-2 drop-shadow-sm">Wybierz Przedmiot</h1>
            <p className="text-[#9CA3AF] text-sm font-medium mb-8">Gotowy na wyzwanie? Zbuduj swoją wiedzę.</p>
            
            <div className="grid grid-cols-1 gap-5">
              {Object.entries(displayData).map(([key, sub]) => {
                 const Icon = sub.icon;
                 const isMath = key === 'math';
                 const isPol = key === 'pol';
                 
                 let cardClasses = "bg-[#141A23] border-white/5";
                 let badge = null;
                 
                 if (sub.isPro) {
                    badge = <span className="absolute -top-3 -right-2 text-[10px] font-black uppercase text-black bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)] rotate-6">PRO</span>;
                 } else if (isMath) {
                   cardClasses = "bg-gradient-to-br from-[#0B0E14] to-[#0A1929] border-[#3B82F6]/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]";
                   badge = <span className="absolute -top-3 -right-2 text-[10px] font-black uppercase text-black bg-[#00D2FF] px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0,210,255,0.6)] rotate-12">🔥 Matura 2026</span>;
                 } else if (isPol) {
                   cardClasses = "bg-gradient-to-br from-[#0B0E14] to-[#2D1B2E] border-[#E11D48]/30 shadow-[0_0_20px_rgba(225,29,72,0.15)]";
                   badge = <span className="absolute -top-3 -right-2 text-[10px] font-black uppercase text-white bg-[#E11D48] px-3 py-1 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.6)] -rotate-6">📚 Klasyk</span>;
                 }

                 const allSubjectTasks = sub.topics?.flatMap((t: any) => t.tasks || []) || [];
                 const completedSubjectTasks = allSubjectTasks.filter((t: any) => completedTasks.includes(t.id));
                 const progressPercent = allSubjectTasks.length > 0 ? Math.round((completedSubjectTasks.length / allSubjectTasks.length) * 100) + '%' : sub.progress;

                 return (
                    <button 
                      key={key} 
                      onClick={() => {
                        triggerHaptic('light');
                        if (sub.isPro) {
                          isGuest && onLoginRequest ? onLoginRequest() : onProRequest && onProRequest();
                        } else {
                          handleSelectSubject(key);
                        }
                      }}
                      className={\`text-left w-full relative group transform transition-transform active:translate-y-1 active:scale-[0.98]\`}
                    >
                      <div className={\`absolute inset-0 bg-[#0B0E14] rounded-[24px] translate-y-2 transition-transform group-active:translate-y-0\`}></div>
                      <div className={\`relative p-5 rounded-[24px] border-t border-l border-white/10 flex items-center justify-between \${cardClasses}\`}>
                        {badge}
                        <div className="flex items-center gap-5 relative z-10 w-full">
                          <div className={\`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] \${sub.bg} \${sub.color} \${sub.border} border-2\`}>
                            <Icon size={32} className="drop-shadow-md" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display font-black text-white text-[19px] tracking-wide drop-shadow-sm mb-1">{sub.name}</h3>
                            <div className="flex items-center gap-3">
                               <div className="flex-1 h-2.5 bg-[#0B0E14] rounded-full overflow-hidden shadow-inner border border-white/5">
                                 <div className={\`h-full \${sub.bg.replace('/10', '')} shadow-[0_0_10px_currentColor]\`} style={{ width: progressPercent }} />
                               </div>
                               <span className="text-[11px] font-black text-[#9CA3AF] w-12 text-right">{progressPercent}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                 );
              })}
            </div>
          </motion.div>
        )}

        {viewState === 'topics' && currentSubject && (
          <motion.div 
            key="topics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col min-h-full"
          >
            <div className="px-5 py-4 flex items-center gap-4 sticky top-0 bg-[#0B0E14]/90 backdrop-blur-md z-20 border-b border-white/5 shadow-md">
              <button 
                onClick={handleBack}
                className="w-10 h-10 rounded-full bg-[#141A23] border border-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex-1">
                <h2 className="font-display font-black text-white text-lg">{currentSubject.name}</h2>
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Wybierz Dział</p>
              </div>
              <div className={\`w-10 h-10 rounded-2xl flex items-center justify-center \${currentSubject.bg} \${currentSubject.color} border border-white/5 shadow-inner\`}>
                {(() => {
                  const SubjectIcon = currentSubject.icon;
                  return <SubjectIcon size={20} />;
                })()}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-8 pb-[calc(env(safe-area-inset-bottom)+120px)] relative">
              <div className="absolute top-0 bottom-0 left-12 w-[3px] bg-white/5"></div>
              
              <div className="space-y-8 relative z-10">
                {currentSubject.topics.map((topic: any, idx: number) => {
                  const Icon = getTopicIcon(selectedSubjectKey!, idx, BookText);
                  const isLocked = topic.locked;
                  
                  const allTopicTasks = topic.tasks || [];
                  const completedTopicTasks = allTopicTasks.filter((t: any) => completedTasks.includes(t.id));
                  const progressPercent = allTopicTasks.length > 0 ? Math.round((completedTopicTasks.length / allTopicTasks.length) * 100) + '%' : topic.progress || '0%';

                  return (
                    <button 
                      key={topic.id || idx}
                      onClick={() => {
                        if (!isLocked) {
                          handleSelectTopic(idx);
                        } else {
                          triggerHaptic('error');
                        }
                      }}
                      className={\`w-full flex items-center gap-5 group \${isLocked ? 'opacity-50' : ''}\`}
                    >
                      <div className="relative z-10 shrink-0 transform transition-transform group-active:scale-95 group-hover:scale-105">
                         {/* Winding path node effect */}
                         <div className={\`w-14 h-14 rounded-2xl rotate-3 flex items-center justify-center shadow-lg border-2 \${isLocked ? 'bg-[#141A23] border-white/5 text-[#6B7280]' : \`\${currentSubject.bg} border-white/20 \${currentSubject.color} shadow-[0_0_20px_currentColor] opacity-90\`}\`}>
                           <div className="-rotate-3">
                             {isLocked ? <Lock size={24} /> : <Icon size={24} className="drop-shadow-md" />}
                           </div>
                         </div>
                      </div>
                      
                      <div className="flex-1 text-left bg-[#141A23] p-4 rounded-[20px] border border-white/5 shadow-sm relative group-hover:border-white/10 transition-colors">
                        <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-4 h-[2px] bg-white/5"></div>
                        <div className="flex items-center justify-between mb-1.5">
                           <span className="text-[10px] font-black uppercase text-[#9CA3AF] tracking-widest bg-[#0B0E14] px-2 py-0.5 rounded-full border border-white/5">Dział {idx + 1}</span>
                           {!isLocked && <span className="text-[10px] font-bold text-white/50">{topic.tasks?.length || 0} Lekcji</span>}
                        </div>
                        <h3 className="font-display font-black text-white text-[15px] leading-tight mb-2 drop-shadow-sm">{topic.name}</h3>
                        <div className="w-full h-1.5 bg-[#0B0E14] rounded-full overflow-hidden shadow-inner border border-white/5">
                           <div className={\`h-full \${isLocked ? 'bg-white/10' : currentSubject.bg.replace('/10', '')} shadow-[0_0_10px_currentColor]\`} style={{ width: progressPercent }} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex justify-center mt-12 mb-8 relative z-10">
                 <div className="w-20 h-20 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-[28px] rotate-12 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)] border-4 border-[#FFFBEB]/30">
                   <div className="-rotate-12">
                     <Trophy size={40} className="text-white drop-shadow-md" />
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewState === 'lessons' && currentTopic && (
          <motion.div 
            key="lessons"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col min-h-full"
          >
            <div className="px-5 py-4 flex items-center gap-4 sticky top-0 bg-[#0B0E14]/90 backdrop-blur-md z-20 border-b border-white/5 shadow-md">
              <button 
                onClick={handleBack}
                className="w-10 h-10 rounded-full bg-[#141A23] border border-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex-1 truncate">
                <h2 className="font-display font-black text-white text-[15px] truncate">{currentTopic.name}</h2>
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">{currentSubject?.name}</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-8 pb-[calc(env(safe-area-inset-bottom)+120px)] space-y-8">
              {lessonsForCurrentTopic.map((group, groupIdx) => {
                const allCompleted = group.tasks.length > 0 && group.tasks.every(t => completedTasks?.includes(t.id));
                
                return (
                  <div key={group.id} className="relative">
                    {groupIdx !== lessonsForCurrentTopic.length - 1 && (
                       <div className="absolute left-6 top-12 bottom-[-48px] w-0.5 bg-gradient-to-b from-white/10 to-transparent"></div>
                    )}
                    
                    <div className="flex items-center gap-4 mb-4 relative z-10 bg-[#0B0E14] py-1">
                      <div className={\`w-12 h-12 rounded-[20px] flex items-center justify-center shrink-0 border-2 shadow-lg \${allCompleted ? 'bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981]' : 'bg-[#141A23] border-white/10 text-white'}\`}>
                         {allCompleted ? <CheckCircle2 size={24} /> : <Target size={24} />}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-[#9CA3AF] tracking-widest">{group.badge}</span>
                        <h3 className="font-display font-black text-white text-base">{group.name}</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pl-[60px] pr-2 relative z-10">
                      {group.tasks.map((task, tIdx) => {
                        const isCompleted = completedTasks?.includes(task.id);
                        const isSprawdzian = group.id === 'SPRAWDZIAN';
                        const isTheory = task.id.includes('THEORY') || task.type === 'theory';
                        
                        let cardColor = "from-[#141A23] to-[#141A23] border-white/5";
                        let buttonColor = "from-[#3B82F6] to-[#00D2FF]";
                        let buttonShadow = "shadow-[0_0_20px_rgba(0,210,255,0.3)]";
                        let iconColor = "text-[#3B82F6]";
                        
                        if (isCompleted) {
                           cardColor = "from-[#10B981]/5 to-[#10B981]/10 border-[#10B981]/20";
                           buttonColor = "from-[#10B981] to-emerald-500";
                           buttonShadow = "shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                           iconColor = "text-[#10B981]";
                        } else if (isSprawdzian) {
                           cardColor = "from-[#F59E0B]/5 to-[#F59E0B]/10 border-[#F59E0B]/20";
                           buttonColor = "from-[#F97316] to-[#F59E0B]";
                           buttonShadow = "shadow-[0_0_20px_rgba(245,158,11,0.3)]";
                           iconColor = "text-[#F59E0B]";
                        } else if (isTheory) {
                           cardColor = "from-[#A855F7]/5 to-[#A855F7]/10 border-[#A855F7]/20";
                           buttonColor = "from-[#9333EA] to-[#A855F7]";
                           buttonShadow = "shadow-[0_0_20px_rgba(168,85,247,0.3)]";
                           iconColor = "text-[#A855F7]";
                        }

                        return (
                          <div 
                            key={task.id}
                            className={\`bg-gradient-to-br \${cardColor} border rounded-[20px] p-5 flex flex-col shadow-sm\`}
                          >
                            <div className="flex items-start gap-3 justify-between mb-3">
                               <div className={\`shrink-0 mt-0.5 \${iconColor}\`}>
                                 {isTheory ? <BookText size={16} /> : <Zap size={16} />}
                               </div>
                               <h4 className="font-bold text-white text-[13px] leading-snug flex-1">
                                 <MathText text={cleanTitle(task.title) || task.question} />
                               </h4>
                               {isCompleted && <div className="shrink-0 w-6 h-6 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center"><CheckCircle2 size={14}/></div>}
                            </div>
                            
                            <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]">
                               <span className="bg-[#0B0E14] px-2 py-1 rounded-md border border-white/5 flex items-center gap-1"><Award size={12}/> {task.xp || 50} XP</span>
                               <span className="bg-[#0B0E14] px-2 py-1 rounded-md border border-white/5 flex items-center gap-1"><Clock size={12}/> {task.time || '3 min'}</span>
                            </div>
                            
                            <button 
                              onClick={() => {
                                triggerHaptic('medium');
                                onStartTask?.(task);
                              }}
                              className="w-full relative group transform transition-transform active:translate-y-1 active:scale-[0.98]"
                            >
                              <div className={\`absolute inset-0 bg-gradient-to-r \${buttonColor} rounded-[16px] translate-y-1.5 group-active:translate-y-0 transition-transform brightness-50\`}></div>
                              <div className={\`relative bg-gradient-to-r \${buttonColor} text-white font-black text-sm py-3.5 px-4 rounded-[16px] flex items-center justify-center gap-2 \${buttonShadow} group-hover:brightness-110 border-t border-white/20\`}>
                                 {isCompleted ? 'POWTÓRZ LEKCJĘ' : 'ROZPOCZNIJ'} {isCompleted ? <ChevronRight size={18} /> : <Play size={18} className="fill-current" />}
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
`;

const startIndex = content.indexOf('return (');
if (startIndex !== -1) {
  content = content.substring(0, startIndex) + replacement + '\n}\n';
  fs.writeFileSync('src/components/LearnView.tsx', content);
  console.log('Successfully replaced render function.');
} else {
  console.log('Failed to find return');
}
