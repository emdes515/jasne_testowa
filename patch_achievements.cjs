const fs = require('fs');

let content = fs.readFileSync('src/components/AchievementsSection.tsx', 'utf8');

// Replace Overview Banner
const overviewRegex = /\{\/\* Overview Banner \*\/\}.*?\{\/\* Categories Filter Tabs \*\/\}/s;
const overviewReplacement = `{/* Overview Banner */}
      <div className="bg-[#141A23] border border-white/5 rounded-[24px] p-5 relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B0E14] border border-[#F59E0B]/30 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Trophy size={24} className="text-[#F59E0B]" />
            </div>
            <div>
              <h2 className="text-base font-display font-black text-white leading-tight">Centrum Gracza & Odznaki</h2>
              <span className="text-xs text-[#9CA3AF]">
                {totalTiersUnlocked} z {totalTiersCount} rang odblokowanych
              </span>
            </div>
          </div>
          {totalClaimableCount > 0 && (
            <motion.button
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: ['0px 0px 0px rgba(16, 185, 129, 0)', '0px 0px 15px rgba(16, 185, 129, 0.5)', '0px 0px 0px rgba(16, 185, 129, 0)']
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              onClick={() => setSelectedCategory('claimable')}
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-black font-black text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg"
            >
              <Gift size={14} />
              {totalClaimableCount} do odebrania!
            </motion.button>
          )}
        </div>
        
        {/* Global Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-[10px] font-bold mb-1.5">
            <span className="text-[#9CA3AF] uppercase tracking-wider">Postęp Kolekcji</span>
            <span className="text-[#00D2FF] font-mono">
              {Math.round((totalTiersUnlocked / Math.max(1, totalTiersCount)) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#00D2FF] shadow-[0_0_10px_rgba(0,210,255,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: \`\${(totalTiersUnlocked / Math.max(1, totalTiersCount)) * 100}%\` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Categories Filter Tabs */}`;

content = content.replace(overviewRegex, overviewReplacement);

// Tab active styles
content = content.replace(
  /'bg-white text-black border-white shadow-md'/g,
  "'bg-[#D1D5DB] text-black border-[#D1D5DB] shadow-md'"
);
content = content.replace(
  /'bg-\[#13141A\] text-\[#8B8D98\] border-white\/5 hover:text-white'/g,
  "'bg-[#141A23] text-[#9CA3AF] border-white/5 hover:text-white hover:bg-white/5'"
);

// Re-map the card rendering logic
const cardListRegex = /\{\/\* Achievements Cards List \*\/\}.*?<\/div>\s*<\/div>\s*\);\s*\}/s;
const cardListReplacement = `{/* Achievements Cards List */}
      <div className="space-y-4">
        {filtered.map(item => {
          const ach = item.achievement;
          const isExpanded = expandedAchievementId === ach.id;
          const nextTier = item.activeTier;
          const prevTier = item.claimedTier > 0 
            ? ach.tiers.find(t => t.tier === item.claimedTier) 
            : null;
            
          const isLocked = !item.isFullyCompleted && item.currentValue === 0 && item.claimedTier === 0;

          return (
            <motion.div
              key={ach.id}
              layout
              className={\`bg-[#141A23] rounded-[20px] overflow-hidden transition-all shadow-md border \${
                item.canClaim 
                  ? 'border-[#10B981]/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-[#10B981]/[0.02]' 
                  : isLocked
                  ? 'border-white/5 opacity-60 grayscale-[50%]'
                  : 'border-white/5 hover:border-white/10'
              }\`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon */}
                  <div className={\`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border shadow-inner \${
                    item.isFullyCompleted 
                      ? 'bg-gradient-to-br from-[#10B981]/20 to-emerald-600/20 text-[#10B981] border-[#10B981]/30'
                      : item.canClaim
                      ? 'bg-gradient-to-br from-[#F59E0B]/20 to-amber-600/20 text-[#F59E0B] border-[#F59E0B]/30'
                      : isLocked
                      ? 'bg-[#0B0E14] text-[#6B7280] border-white/5 relative'
                      : 'bg-gradient-to-br from-[#3B82F6]/10 to-blue-600/10 text-[#00D2FF] border-[#3B82F6]/20'
                  }\`}>
                    {isLocked ? <Lock size={24} /> : getCategoryIcon(ach.icon)}
                  </div>
                  
                  {/* Title & Desc */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-black text-white text-[15px]">{ach.name}</h3>
                      <span className={\`text-[9px] font-black uppercase px-2 py-0.5 rounded-sm flex items-center gap-1 \${
                        item.isFullyCompleted 
                          ? 'bg-[#10B981]/10 text-[#10B981]' 
                          : item.claimedTier > 0 
                          ? 'bg-[#00D2FF]/10 text-[#00D2FF]' 
                          : 'bg-white/5 text-[#9CA3AF]'
                      }\`}>
                        {item.isFullyCompleted 
                           ? 'Mistrz ★' 
                           : prevTier 
                           ? \`Ranga \${item.claimedTier}\` 
                           : 'Początkujący'}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#9CA3AF] leading-snug">{ach.description}</p>
                  </div>

                  {/* Expand Toggle */}
                  <button 
                    onClick={() => setExpandedAchievementId(isExpanded ? null : ach.id)}
                    className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-colors shrink-0"
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {/* Progress bar & Claim button */}
                {!item.isFullyCompleted && nextTier && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center text-[11px] mb-2">
                      <span className="text-[#9CA3AF]">
                        Ranga {nextTier.tier}: <strong className="text-white font-bold">{nextTier.tierName}</strong>
                      </span>
                      <span className="font-mono font-bold text-[#D1D5DB]">
                        {item.currentValue} / {nextTier.target} {ach.unit}
                      </span>
                    </div>
                    
                    <div className="w-full h-2 bg-[#0B0E14] rounded-full overflow-hidden mb-3 border border-white/5">
                      <div 
                        className={\`h-full rounded-full transition-all duration-500 \${
                          item.canClaim 
                            ? 'bg-gradient-to-r from-[#10B981] to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                            : 'bg-gradient-to-r from-[#3B82F6] to-[#00D2FF]'
                        }\`}
                        style={{ width: \`\${item.progressPercent}%\` }}
                      />
                    </div>
                    
                    {/* Rewards Preview */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-black">
                        <span className="flex items-center gap-1.5 text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded-md border border-[#F59E0B]/20">
                          <Coins size={12} /> +{nextTier.rewardCoins}
                        </span>
                        <span className="flex items-center gap-1.5 text-[#A855F7] bg-[#A855F7]/10 px-2.5 py-1 rounded-md border border-[#A855F7]/20">
                          <Crown size={12} /> +{nextTier.rewardTokens}
                        </span>
                        {nextTier.rewardPerkDesc && (
                          <span className="flex items-center gap-1 text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-md border border-[#10B981]/20">
                            {nextTier.rewardPerkDesc}
                          </span>
                        )}
                      </div>
                      
                      {item.canClaim && (
                        <button 
                          onClick={() => handleClaim(ach.id, nextTier.tier)}
                          className="px-4 py-1.5 bg-gradient-to-r from-[#10B981] to-emerald-500 text-black font-black text-[11px] uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        >
                          <Gift size={14} />
                          Odbierz
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
                {item.isFullyCompleted && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[12px] text-[#10B981] font-black">
                      <CheckCircle2 size={16} />
                      Wszystkie rangi zdobyte
                    </div>
                    <span className="text-[12px] font-mono font-black text-[#9CA3AF]">
                      {item.currentValue} {ach.unit}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Collapsible Tier Breakdown */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 bg-[#0B0E14] p-5 space-y-3"
                  >
                    <span className="text-[10px] uppercase font-black text-[#9CA3AF] tracking-wider block mb-2">
                      Historia rang:
                    </span>
                    {ach.tiers.map(t => {
                      const isClaimed = t.tier <= item.claimedTier;
                      const isNext = nextTier?.tier === t.tier;
                      return (
                        <div 
                          key={t.tier}
                          className={\`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all \${
                            isClaimed 
                              ? 'bg-[#10B981]/[0.05] border-[#10B981]/20 text-white' 
                              : isNext
                              ? 'bg-[#3B82F6]/[0.05] border-[#3B82F6]/30 text-white'
                              : 'bg-white/[0.02] border-white/5 text-[#9CA3AF] opacity-60'
                          }\`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={\`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs \${
                              isClaimed 
                                ? 'bg-[#10B981]/20 text-[#10B981]' 
                                : isNext
                                ? 'bg-[#3B82F6]/20 text-[#00D2FF]'
                                : 'bg-white/5 text-white/40'
                            }\`}>
                              {isClaimed ? '✓' : t.tier}
                            </div>
                            <div>
                              <div className="font-bold flex items-center gap-1.5 text-[13px]">
                                <span>{t.tierName}</span>
                                <span className="text-[10px] text-[#9CA3AF]">({t.target} {ach.unit})</span>
                              </div>
                              {t.rewardPerkDesc && (
                                <div className="text-[11px] text-[#10B981] font-bold mt-0.5">
                                  Nagroda: {t.rewardPerkDesc}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[#F59E0B] font-black bg-[#F59E0B]/10 px-2 py-1 rounded-md text-[10px] flex items-center gap-1">+{t.rewardCoins} <Coins size={10}/></span>
                            <span className="text-[#A855F7] font-black bg-[#A855F7]/10 px-2 py-1 rounded-md text-[10px] flex items-center gap-1">+{t.rewardTokens} <Crown size={10}/></span>
                            
                            {isNext && item.canClaim && (
                              <button 
                                onClick={() => handleClaim(ach.id, t.tier)}
                                className="px-3 py-1.5 bg-[#10B981] text-black font-black text-[10px] rounded-lg shadow-sm uppercase ml-1 hover:scale-105 active:scale-95 transition-transform"
                              >
                                Odbierz
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}`;

content = content.replace(cardListRegex, cardListReplacement);

fs.writeFileSync('src/components/AchievementsSection.tsx', content);
console.log('AchievementsSection patched');
