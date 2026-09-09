const fs = require('fs');

let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const streakRegex = /\{\/\* Streak Card \*\/\}.*?\{\/\* 3 Profile Buttons Grid \*\/\}/s;
const streakReplacement = `{/* Streak Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-br from-[#141A23] to-[#0B0E14] border border-[#F97316]/30 rounded-[24px] p-6 mb-8 relative overflow-hidden shadow-[0_8px_30px_rgba(249,115,22,0.15)]"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F97316]/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#EA580C]/10 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="flex items-start justify-between relative z-10 mb-5">
          <div className="pr-4">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="font-display font-black text-[#F97316] text-xl tracking-wide drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">
                {streakDays} Dni z rzędu!
              </h3>
            </div>
            <p className="text-[12px] font-bold text-[#D1D5DB] leading-snug">
              🔥 Rozpal swoją passę! Ukończ 1 szybki moduł i zdobądź Mnożnik XP x2
            </p>
          </div>
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F97316]/10 shrink-0 border border-[#F97316]/30 text-[#F97316] shadow-[inset_0_0_15px_rgba(249,115,22,0.2)]">
            <Flame size={28} className="fill-[#F97316]/30 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
          </div>
        </div>

        {/* 7-day Streak Tracker */}
        <div className="flex justify-between items-center w-full mt-2 relative z-10">
          {['P', 'W', 'Ś', 'C', 'P', 'S', 'N'].map((day, i) => {
            const isCompleted = streakDays > 6 ? true : i < streakDays;
            const isToday = i === (streakDays > 6 ? 6 : streakDays);
            
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={\`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-black transition-all \${
                  isCompleted 
                    ? 'bg-gradient-to-b from-[#F97316] to-[#EA580C] text-black shadow-[0_0_15px_rgba(249,115,22,0.6)] border border-[#FFEDD5]' 
                    : isToday
                    ? 'bg-[#F97316]/10 border-2 border-[#F97316] text-[#F97316] shadow-[0_0_10px_rgba(249,115,22,0.3)] animate-pulse'
                    : 'bg-[#0B0E14] border border-white/5 text-[#6B7280]'
                }\`}>
                  {isCompleted ? <Flame size={18} className="fill-black/20" /> : day}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* 3 Profile Buttons Grid */}`;

content = content.replace(streakRegex, streakReplacement);

fs.writeFileSync('src/components/DashboardView.tsx', content);
console.log('Dashboard streak updated');
