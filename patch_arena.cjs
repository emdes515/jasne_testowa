const fs = require('fs');

let content = fs.readFileSync('src/components/ArenaView.tsx', 'utf8');

const arenaMainRegex = /\{activeTab === 'play' && \(\s*<div className="flex-1 flex flex-col h-full relative">.*?<\/button>\s*<\/div>\s*<\/motion\.div>\s*\)\}\s*<\/AnimatePresence>\s*<\/div>\s*\)\}/s;

const arenaMainReplacement = `{activeTab === 'play' && (
        <div className="flex-1 flex flex-col h-full relative">
          <AnimatePresence mode="wait">
            {matchState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col pt-6 pb-28 px-4"
              >
                {/* League & Rank Card */}
                <div className="bg-[#141A23] border border-white/5 shadow-lg rounded-[24px] p-6 mb-6 flex flex-col items-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/4"></div>
                   
                   <span className="text-[10px] font-black tracking-widest text-[#9CA3AF] uppercase mb-1">Twoja Dywizja</span>
                   <h2 className="text-xl font-display font-black text-white drop-shadow-md mb-4 flex items-center gap-2">
                     Liga Pretendentów <Medal className="text-[#3B82F6]" size={20} />
                   </h2>
                   
                   <div className="flex items-center gap-6 w-full justify-center">
                     <div className="flex flex-col items-center">
                        <span className="text-[32px] font-black text-[#00D2FF] drop-shadow-[0_0_15px_rgba(0,210,255,0.4)] leading-none mb-1">
                          {userStats.rating}
                        </span>
                        <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">ELO Rating</span>
                     </div>
                     <div className="h-10 w-px bg-white/10"></div>
                     <div className="flex flex-col items-center">
                        <span className="text-[32px] font-black text-white leading-none mb-1">
                          {userStats.wins}
                        </span>
                        <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider">Wygrane</span>
                     </div>
                   </div>

                   {/* Active Perks Badges */}
                  <div className="flex items-center gap-2 mt-5 flex-wrap justify-center">
                    {(userState?.perks?.arenaShields || 0) > 0 && (
                      <span className="text-[10px] font-black text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <ShieldCheck size={12} />
                        {userState?.perks?.arenaShields}x Ochrona ELO
                      </span>
                    )}
                    {(userState?.perks?.arenaTokenBonusPercent || 0) > 0 && (
                      <span className="text-[10px] font-black text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                        <Crown size={12} />
                        +{userState?.perks?.arenaTokenBonusPercent}% Żetonów
                      </span>
                    )}
                  </div>
                </div>

                {/* Matchmaking Section */}
                <div className="bg-[#141A23] border border-white/5 rounded-[24px] p-6 mb-auto flex flex-col items-center relative shadow-lg">
                  <div className="flex items-center justify-center gap-6 w-full mb-6">
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D2FF] to-[#3B82F6] p-[2px] shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                         <div className="w-full h-full bg-[#141A23] rounded-2xl flex items-center justify-center overflow-hidden">
                           {user?.photoURL ? <img src={user.photoURL} className="w-full h-full object-cover" /> : <Users size={24} className="text-white/80" />}
                         </div>
                       </div>
                       <span className="text-xs font-bold text-white">Ty</span>
                    </div>

                    <div className="text-3xl font-black text-white/10 italic pb-6">VS</div>

                    <div className="flex flex-col items-center gap-2">
                       <div className="w-16 h-16 rounded-2xl bg-white/5 p-[2px] border border-white/10">
                         <div className="w-full h-full bg-[#0B0E14] rounded-2xl flex items-center justify-center">
                           <Loader2 size={24} className="text-[#6B7280] animate-spin" />
                         </div>
                       </div>
                       <span className="text-xs font-bold text-[#6B7280]">Szukanie...</span>
                    </div>
                  </div>

                  {/* Stakes */}
                  <div className="flex gap-3">
                     <span className="text-[11px] font-black bg-[#3B82F6]/10 text-[#00D2FF] border border-[#3B82F6]/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                       <Trophy size={14}/> +25 ELO
                     </span>
                     <span className="text-[11px] font-black bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                       <Crown size={14}/> +10 Żetonów
                     </span>
                  </div>
                </div>
                
                {/* Huge Juicy Button */}
                <div className="mt-6 flex flex-col items-center gap-3">
                  <button 
                    onClick={handleSearchMatch}
                    className="w-full relative group transform transition-transform active:translate-y-1 active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-[20px] translate-y-1 group-active:translate-y-0 transition-transform"></div>
                    <div className="relative bg-gradient-to-r from-red-500 to-rose-500 text-white font-black text-lg py-5 px-6 rounded-[20px] flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(239,68,68,0.3)] group-hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] border-t border-white/20">
                      <Swords size={24} className="group-hover:animate-bounce" /> ZNAJDŹ PRZECIWNIKA
                    </div>
                  </button>
                  <span className="text-[11px] font-bold text-[#9CA3AF]">
                    Średni czas oczekiwania: ~3 sek
                  </span>
                  {guestWarning && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-red-400 font-bold bg-red-500/10 px-3 py-1.5 rounded-lg"
                    >
                      Musisz być zalogowany, by grać na Arenie!
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {matchState === 'searching' && (
              <motion.div 
                key="searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <div className="relative mb-8">
                   <div className="w-24 h-24 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                     <Swords size={40} className="text-[#EF4444] animate-pulse" />
                   </div>
                   <div className="absolute inset-0 bg-[#EF4444]/20 blur-xl animate-ping rounded-2xl"></div>
                </div>
                <h3 className="text-xl font-display font-black text-white mb-2">Szukanie rywala...</h3>
                <p className="text-[#9CA3AF] text-sm mb-10 font-bold">Dobieranie przeciwnika o podobnym ELO</p>
                <button 
                  onClick={handleCancelSearch}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
                >
                  Anuluj szukanie
                </button>
              </motion.div>
            )}

            {matchState === 'matched' && matchData && (
              <motion.div 
                key="matched"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-1 flex flex-col items-center justify-center absolute inset-0 z-50 bg-[#0B0E14]"
              >
                <h2 className="text-3xl font-display font-black text-white mb-12 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">ZNAZIONO MECZ!</h2>
                
                <div className="flex items-center justify-between w-full max-w-sm px-6">
                   <div className="flex flex-col items-center gap-3">
                     <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00D2FF] to-[#3B82F6] p-[2px] shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                        <div className="w-full h-full bg-[#141A23] rounded-2xl flex items-center justify-center overflow-hidden">
                           {matchData.player1Photo ? <img src={matchData.player1Photo} className="w-full h-full object-cover" /> : <Users size={32} className="text-white/80" />}
                        </div>
                     </div>
                     <span className="font-bold text-white text-sm">{matchData.player1Name}</span>
                     <span className="text-[10px] font-black text-[#00D2FF] bg-[#3B82F6]/10 px-2 py-0.5 rounded">{matchData.player1Rating} ELO</span>
                   </div>
                   
                   <div className="text-4xl font-black text-white/20 italic pb-8">VS</div>
                   
                   <div className="flex flex-col items-center gap-3">
                     <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#F97316] p-[2px] shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                        <div className="w-full h-full bg-[#141A23] rounded-2xl flex items-center justify-center overflow-hidden">
                           {matchData.player2Photo ? <img src={matchData.player2Photo} className="w-full h-full object-cover" /> : <Users size={32} className="text-white/80" />}
                        </div>
                     </div>
                     <span className="font-bold text-white text-sm">{matchData.player2Name}</span>
                     <span className="text-[10px] font-black text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded">{matchData.player2Rating} ELO</span>
                   </div>
                </div>
              </motion.div>
            )}

            {matchState === 'active' && matchData?.task && (
              <motion.div 
                key="active"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col absolute inset-0 z-50 bg-[#0B0E14]"
              >
                {/* Active Match Header */}
                <div className="bg-[#141A23] px-6 py-4 flex items-center justify-between border-b border-white/5 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D2FF] to-[#3B82F6] p-[2px]">
                       <div className="w-full h-full bg-[#141A23] rounded-xl flex items-center justify-center overflow-hidden">
                         {matchData.player1Photo ? <img src={matchData.player1Photo} className="w-full h-full object-cover" /> : <Users size={16} className="text-white/80" />}
                       </div>
                    </div>
                    <div>
                       <div className="text-[10px] text-[#9CA3AF] font-bold uppercase">{matchData.player1Name}</div>
                       <div className="text-xs font-black text-[#00D2FF]">{matchData.player1Rating} ELO</div>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-black italic text-white/20">VS</div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                       <div className="text-[10px] text-[#9CA3AF] font-bold uppercase">{matchData.player2Name}</div>
                       <div className="text-xs font-black text-[#EF4444]">{matchData.player2Rating} ELO</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EF4444] to-[#F97316] p-[2px]">
                       <div className="w-full h-full bg-[#141A23] rounded-xl flex items-center justify-center overflow-hidden">
                         {matchData.player2Photo ? <img src={matchData.player2Photo} className="w-full h-full object-cover" /> : <Users size={16} className="text-white/80" />}
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-3 bg-[#F59E0B]/10 border-b border-[#F59E0B]/20 flex justify-center">
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#F59E0B] animate-pulse flex items-center gap-1.5">
                    <Zap size={14} className="fill-[#F59E0B]" /> Błyskawiczne starcie! Kto pierwszy bezbłędnie - wygrywa!
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col p-6 items-center justify-center">
                  <div className="text-center mb-12">
                    <div className="text-[11px] font-black text-[#00D2FF] uppercase tracking-widest mb-4 bg-[#3B82F6]/10 inline-block px-3 py-1 rounded-full border border-[#3B82F6]/20">Zadanie Prawda / Fałsz</div>
                    <h2 className="text-2xl font-black text-white leading-relaxed drop-shadow-md">
                      {matchData.task.question}
                    </h2>
                  </div>
                  
                  <div className="flex gap-4 w-full max-w-sm"> 
                     <button 
                        onClick={() => handleAnswer(true)}
                        className="flex-1 relative group transform transition-transform active:translate-y-1 active:scale-[0.98]"
                     >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-[20px] translate-y-1.5 group-active:translate-y-0 transition-transform"></div>
                        <div className="relative py-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-[20px] text-white font-black text-xl border-t border-white/20 shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                          PRAWDA
                        </div>
                     </button>
                     <button 
                        onClick={() => handleAnswer(false)}
                        className="flex-1 relative group transform transition-transform active:translate-y-1 active:scale-[0.98]"
                     >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-[20px] translate-y-1.5 group-active:translate-y-0 transition-transform"></div>
                        <div className="relative py-6 bg-gradient-to-r from-red-500 to-rose-500 rounded-[20px] text-white font-black text-xl border-t border-white/20 shadow-[0_0_20px_rgba(239,68,68,0.3)] group-hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                          FAŁSZ
                        </div>
                     </button>
                  </div>
                </div>
              </motion.div>
            )}

            {matchState === 'finished' && matchData && (
              <motion.div 
                key="finished"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center absolute inset-0 z-50 bg-[#0B0E14] px-4"
              >
                <div className="w-28 h-28 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 shadow-xl relative">
                  <div className={\`absolute inset-0 blur-2xl rounded-3xl \${matchData.winner === user?.uid ? 'bg-[#F59E0B]/30' : 'bg-[#EF4444]/30'}\`}></div>
                  {matchData.winner === user?.uid ? (
                    <Trophy size={56} className="text-[#F59E0B] drop-shadow-[0_0_20px_rgba(245,158,11,0.6)] relative z-10" />
                  ) : (
                    <X size={56} className="text-[#EF4444] drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] relative z-10" />
                  )}
                </div>
                <h2 className="text-4xl font-display font-black text-white mb-3 tracking-wide drop-shadow-md">
                  {matchData.winner === user?.uid ? 'ZWYCIĘSTWO!' : 'PORAŻKA'}
                </h2>
                <p className="text-[#9CA3AF] mb-10 text-center max-w-xs font-bold leading-relaxed">
                  {matchData.winner === user?.uid 
                    ? 'Błyskawiczna reakcja! Jesteś bezbłędny.' 
                    : 'Przeciwnik był szybszy lub udzieliłeś złej odpowiedzi. Trenuj dalej!'}
                </p>
                
                {matchData.winner === user?.uid && (
                  <div className="flex gap-4 mb-12 w-full max-w-[280px]">
                    <div className="flex-1 bg-[#10B981]/10 border border-[#10B981]/30 rounded-[20px] py-5 flex flex-col items-center gap-1 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                      <span className="text-[#10B981] font-black text-3xl drop-shadow-md">+25</span>
                      <span className="text-[10px] text-[#10B981] font-black uppercase tracking-wider">Rating ELO</span>
                    </div>
                    <div className="flex-1 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-[20px] py-5 flex flex-col items-center gap-1 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                      <span className="text-[#F59E0B] font-black text-3xl drop-shadow-md">
                        +{Math.round(10 * (1 + (userState?.perks?.arenaTokenBonusPercent || 0) / 100))}
                      </span>
                      <span className="text-[10px] text-[#F59E0B] font-black uppercase tracking-wider">
                        Żetony {(userState?.perks?.arenaTokenBonusPercent || 0) > 0 ? \`(+\${userState?.perks?.arenaTokenBonusPercent}%)\` : ''}
                      </span>
                    </div>
                  </div>
                )}
                
                {matchData.winner !== user?.uid && (
                  <div className="flex flex-col items-center gap-3 mb-12 w-full max-w-[280px]">
                    {shieldProtected ? (
                      <div className="w-full bg-[#10B981]/10 border border-[#10B981]/30 rounded-[20px] p-5 flex items-center gap-4 text-left shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                        <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center shrink-0 border border-[#10B981]/20">
                          <ShieldCheck size={24} />
                        </div>
                        <div>
                          <span className="text-sm font-black text-[#10B981] block mb-0.5">Tarcza ELO aktywowana!</span>
                          <span className="text-[11px] font-bold text-[#10B981]/70 block leading-tight">
                            0 strat punktowych. Ochroniono ranking! (Pozostało: {userState?.perks?.arenaShields || 0})
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-[20px] py-5 flex flex-col items-center gap-1 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                        <span className="text-[#EF4444] font-black text-3xl drop-shadow-md">-15</span>
                        <span className="text-[10px] text-[#EF4444] font-black uppercase tracking-wider">Rating ELO</span>
                      </div>
                    )}
                  </div>
                )}

                <button 
                  onClick={handleLeaveMatch}
                  className="w-full max-w-[240px] relative group transform transition-transform active:translate-y-1 active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-white/40 rounded-[20px] translate-y-1.5 group-active:translate-y-0 transition-transform"></div>
                  <div className="relative py-5 bg-white rounded-[20px] text-black font-black text-lg border-t border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                    WRÓĆ DO ARENY
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}`;

content = content.replace(arenaMainRegex, arenaMainReplacement);
fs.writeFileSync('src/components/ArenaView.tsx', content);
console.log('ArenaView patched');
