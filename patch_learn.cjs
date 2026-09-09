const fs = require('fs');
let content = fs.readFileSync('src/components/LearnView.tsx', 'utf8');

// Replace standard container classes
content = content.replace(/className="flex-1 flex flex-col"/g, 'className="flex-1 flex flex-col pb-[calc(env(safe-area-inset-bottom)+120px)]"');
content = content.replace(/className="flex-1 overflow-y-auto no-scrollbar"/g, 'className="flex-1 overflow-y-auto no-scrollbar pb-[calc(env(safe-area-inset-bottom)+120px)]"');

// 1. Redesign Subject Cards (Juicy Mobile Game Style)
const subjectGridRegex = /<div className="grid gap-4 mt-4">.*?<\/div>\s*<\/div>\s*<\/motion\.div>/s;
const subjectGridReplacement = `<div className="grid gap-4 mt-6">
            {Object.entries(data).map(([key, subject], idx) => {
               const Icon = subject.icon;
               const isMath = key === 'math';
               const isPol = key === 'pol';
               
               let cardClasses = "bg-[#141A23] border-white/5";
               let badge = null;
               
               if (isMath) {
                 cardClasses = "bg-gradient-to-br from-[#0B0E14] to-[#0A1929] border-[#3B82F6]/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]";
                 badge = <span className="absolute -top-3 -right-2 text-[10px] font-black uppercase text-black bg-[#00D2FF] px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0,210,255,0.6)] rotate-12">🔥 Matura 2026</span>;
               } else if (isPol) {
                 cardClasses = "bg-gradient-to-br from-[#0B0E14] to-[#2D1B2E] border-[#E11D48]/30 shadow-[0_0_20px_rgba(225,29,72,0.15)]";
                 badge = <span className="absolute -top-3 -right-2 text-[10px] font-black uppercase text-white bg-[#E11D48] px-3 py-1 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.6)] -rotate-6">📚 Klasyk</span>;
               }

               return (
                  <button 
                    key={key} 
                    onClick={() => {
                      triggerHaptic('light');
                      setView('topics');
                      setSelectedSubject(key);
                    }}
                    className={\`text-left w-full relative group transform transition-transform active:translate-y-1 active:scale-[0.98]\`}
                  >
                    <div className={\`absolute inset-0 bg-[#0B0E14] rounded-[24px] translate-y-1.5 transition-transform group-active:translate-y-0\`}></div>
                    <div className={\`relative p-5 rounded-[24px] border-t border-l border-white/10 flex items-center justify-between \${cardClasses}\`}>
                      {badge}
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={\`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner \${subject.bg} \${subject.color} \${subject.border} border\`}>
                          <Icon size={28} className="drop-shadow-md" />
                        </div>
                        <div>
                          <h3 className="font-display font-black text-white text-lg tracking-wide drop-shadow-sm">{subject.name}</h3>
                          <div className="flex items-center gap-3 mt-1.5">
                             <div className="w-24 h-1.5 bg-[#0B0E14] rounded-full overflow-hidden shadow-inner border border-white/5">
                               <div className={\`h-full \${subject.bg.replace('/10', '')} shadow-[0_0_5px_currentColor]\`} style={{ width: subject.progress }} />
                             </div>
                             <span className="text-xs font-bold text-[#9CA3AF]">{subject.progress} gotowości</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/10 transition-colors">
                        <ChevronRight size={20} className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </button>
               );
            })}
          </div>
        </div>
      </motion.div>`;

content = content.replace(subjectGridRegex, subjectGridReplacement);


// 2. Redesign Lesson Path (Organic Nodes instead of a flat list)
const topicsRegex = /\{view === 'topics' && selectedSubject && \(\s*<motion\.div.*?<\/motion\.div>\s*\)/s;

let newTopicsView = `
{view === 'topics' && selectedSubject && (
        <motion.div 
          key="topics"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col h-full bg-[#0B0E14]"
        >
          <div className="px-4 py-4 flex items-center gap-3 sticky top-0 bg-[#0B0E14]/90 backdrop-blur-md z-20 border-b border-white/5">
            <button 
              onClick={() => {
                triggerHaptic('light');
                setView('subjects');
              }}
              className="w-10 h-10 rounded-full bg-[#141A23] border border-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex-1">
              <h2 className="font-display font-black text-white text-lg">{data[selectedSubject].name}</h2>
              <p className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Wybierz Dział</p>
            </div>
            <div className={\`w-10 h-10 rounded-2xl flex items-center justify-center \${data[selectedSubject].bg} \${data[selectedSubject].color} border \${data[selectedSubject].border} shadow-inner\`}>
              {(() => {
                const SubjectIcon = data[selectedSubject].icon;
                return <SubjectIcon size={20} />;
              })()}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-6 pb-[calc(env(safe-area-inset-bottom)+120px)] relative">
            <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-gradient-to-b from-[#3B82F6]/20 via-[#A855F7]/20 to-[#3B82F6]/20 blur-[1px]"></div>
            
            <div className="space-y-8">
              {data[selectedSubject].topics.map((topic: any, idx: number) => {
                const Icon = getTopicIcon(selectedSubject, idx, BookText);
                const isLocked = topic.locked;
                
                return (
                  <button 
                    key={topic.id}
                    onClick={() => {
                      if (!isLocked) {
                        triggerHaptic('light');
                        setSelectedTopic(topic);
                        setView('lessons');
                      } else {
                        triggerHaptic('error');
                      }
                    }}
                    className={\`w-full flex items-center gap-5 group \${isLocked ? 'opacity-50' : ''}\`}
                  >
                    <div className="relative z-10 shrink-0 transform transition-transform group-active:scale-95 group-hover:scale-105">
                       {/* Winding path node effect */}
                       <div className={\`w-[60px] h-[60px] rounded-[24px] rotate-3 flex items-center justify-center shadow-lg border-2 \${isLocked ? 'bg-[#141A23] border-white/5 text-[#6B7280]' : \`\${data[selectedSubject].bg} border-\${data[selectedSubject].color.split('-')[1]}-500/30 \${data[selectedSubject].color} shadow-[0_0_20px_currentColor] opacity-90\`}\`}>
                         <div className="-rotate-3">
                           {isLocked ? <Lock size={24} /> : <Icon size={28} className="drop-shadow-md" />}
                         </div>
                       </div>
                    </div>
                    
                    <div className="flex-1 text-left bg-[#141A23] p-4 rounded-[20px] border border-white/5 shadow-sm relative group-hover:border-white/10 transition-colors">
                      <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-4 h-0.5 bg-white/10"></div>
                      <div className="flex items-center justify-between mb-1.5">
                         <span className="text-[10px] font-black uppercase text-[#9CA3AF] tracking-widest bg-[#0B0E14] px-2 py-0.5 rounded-full">Dział {idx + 1}</span>
                         {!isLocked && <span className="text-[10px] font-bold text-white/50">{topic.tasks?.length || 0} Lekcji</span>}
                      </div>
                      <h3 className="font-display font-black text-white text-base leading-tight mb-2 drop-shadow-sm">{topic.name}</h3>
                      <div className="w-full h-1.5 bg-[#0B0E14] rounded-full overflow-hidden shadow-inner">
                         <div className={\`h-full \${isLocked ? 'bg-white/10' : data[selectedSubject].bg.replace('/10', '')}\`} style={{ width: topic.progress }} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* End of Path Trophy */}
            <div className="flex justify-center mt-12 mb-8 relative z-10">
               <div className="w-20 h-20 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-[28px] rotate-12 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)] border-4 border-[#FFFBEB]/30">
                 <div className="-rotate-12">
                   <Trophy size={40} className="text-white drop-shadow-md" />
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      )}`;

content = content.replace(topicsRegex, newTopicsView);

// 3. Lesson Screen with Juicy Buttons
const lessonsRegex = /\{view === 'lessons' && selectedTopic && \(\s*<motion\.div.*?<\/motion\.div>\s*\)/s;
let newLessonsView = `
{view === 'lessons' && selectedTopic && (
        <motion.div 
          key="lessons"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col h-full bg-[#0B0E14]"
        >
          <div className="px-4 py-4 flex items-center gap-3 sticky top-0 bg-[#0B0E14]/90 backdrop-blur-md z-20 border-b border-white/5 shadow-md">
            <button 
              onClick={() => {
                triggerHaptic('light');
                setView('topics');
              }}
              className="w-10 h-10 rounded-full bg-[#141A23] border border-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex-1 truncate">
              <h2 className="font-display font-black text-white text-base truncate">{selectedTopic.name}</h2>
              <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">{data[selectedSubject].name}</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-6 pb-[calc(env(safe-area-inset-bottom)+120px)] space-y-6">
            {getLessonsForTopic(selectedTopic).map((group, groupIdx) => {
              const allCompleted = group.tasks.every(t => completedTasks?.includes(t.id));
              
              return (
                <div key={group.id} className="relative">
                  <div className="absolute left-6 top-10 bottom-[-30px] w-0.5 bg-gradient-to-b from-[#00D2FF]/20 to-transparent"></div>
                  
                  <div className="flex items-center gap-3 mb-4 relative z-10 bg-[#0B0E14] py-1">
                    <div className={\`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 shadow-lg \${allCompleted ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]' : 'bg-[#141A23] border-[#00D2FF]/30 text-[#00D2FF]'}\`}>
                       {allCompleted ? <CheckCircle2 size={24} /> : <Target size={24} />}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#9CA3AF] tracking-widest">{group.badge}</span>
                      <h3 className="font-display font-black text-white text-[15px]">{group.name}</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pl-[56px] pr-2 relative z-10">
                    {group.tasks.map((task, tIdx) => {
                      const isCompleted = completedTasks?.includes(task.id);
                      const isSprawdzian = group.id === 'SPRAWDZIAN';
                      const isTheory = task.id.includes('THEORY') || task.type === 'theory';
                      
                      let cardColor = "from-[#141A23] to-[#141A23] border-white/5";
                      let buttonColor = "from-[#3B82F6] to-[#00D2FF]";
                      let buttonShadow = "shadow-[0_0_20px_rgba(0,210,255,0.3)]";
                      
                      if (isCompleted) {
                         cardColor = "from-[#10B981]/5 to-[#10B981]/10 border-[#10B981]/20";
                         buttonColor = "from-[#10B981] to-emerald-500";
                         buttonShadow = "shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                      } else if (isSprawdzian) {
                         cardColor = "from-[#F59E0B]/5 to-[#F59E0B]/10 border-[#F59E0B]/20";
                         buttonColor = "from-[#F97316] to-[#F59E0B]";
                         buttonShadow = "shadow-[0_0_20px_rgba(245,158,11,0.3)]";
                      } else if (isTheory) {
                         cardColor = "from-[#A855F7]/5 to-[#A855F7]/10 border-[#A855F7]/20";
                         buttonColor = "from-[#9333EA] to-[#A855F7]";
                         buttonShadow = "shadow-[0_0_20px_rgba(168,85,247,0.3)]";
                      }

                      return (
                        <div 
                          key={task.id}
                          className={\`bg-gradient-to-br \${cardColor} border rounded-[20px] p-4 flex flex-col shadow-sm\`}
                        >
                          <div className="flex items-start justify-between mb-3">
                             <h4 className="font-bold text-white text-sm pr-4 leading-snug">
                               <MathText text={cleanTitle(task.title) || task.question} />
                             </h4>
                             {isCompleted && <div className="shrink-0 w-6 h-6 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center"><CheckCircle2 size={14}/></div>}
                          </div>
                          
                          <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]">
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
                            <div className={\`absolute inset-0 bg-gradient-to-r \${buttonColor} rounded-[16px] translate-y-1 group-active:translate-y-0 transition-transform brightness-50\`}></div>
                            <div className={\`relative bg-gradient-to-r \${buttonColor} text-white font-black text-sm py-3 px-4 rounded-[16px] flex items-center justify-center gap-2 \${buttonShadow} group-hover:brightness-110 border-t border-white/20\`}>
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
      )}`;
      
content = content.replace(lessonsRegex, newLessonsView);

fs.writeFileSync('src/components/LearnView.tsx', content);
console.log('LearnView patched');
