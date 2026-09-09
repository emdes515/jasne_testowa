const fs = require('fs');

let content = fs.readFileSync('src/components/MaturaSimulatorView.tsx', 'utf8');

const mainDivRegex = /<div className="flex flex-col p-6 pb-20 min-h-full max-w-3xl mx-auto w-full relative">/s;
const mainDivReplacement = `<div className="flex flex-col p-6 pb-[calc(env(safe-area-inset-bottom)+120px)] min-h-full max-w-3xl mx-auto w-full relative">`;
content = content.replace(mainDivRegex, mainDivReplacement);

const menuRegex = /\{\/\* MENU VIEW \*\/\}\s*\{view === 'menu' && \(\s*<motion\.div.*?<\/motion\.div>\s*\)/s;
const newMenuView = `{/* MENU VIEW */}
          {view === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col gap-5 pt-4"
            >
              {/* Card 1: Pojedyncze zadania */}
              <button 
                onClick={() => setView('select_section_single')}
                className="w-full relative group transform transition-transform active:translate-y-1 active:scale-[0.98] text-left"
              >
                <div className="absolute inset-0 bg-[#0B0E14] rounded-[24px] translate-y-2 transition-transform group-active:translate-y-0"></div>
                <div className="relative bg-[#141A23] border border-white/5 rounded-[24px] p-6 border-t border-l border-white/10 shadow-lg group-hover:border-[#3B82F6]/30 transition-colors h-full">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00D2FF] to-[#3B82F6] p-[2px] rounded-2xl mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <div className="w-full h-full bg-[#141A23] rounded-2xl flex items-center justify-center">
                        <Target className="text-[#00D2FF]" size={24} />
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#00D2FF] bg-[#3B82F6]/10 px-3 py-1.5 rounded-lg border border-[#3B82F6]/20 shadow-sm">
                      Trening
                    </span>
                  </div>
                  <h3 className="font-display font-black text-white text-lg mb-2 tracking-wide">Pojedyncze zadania</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed font-medium">
                    Rozwiązuj losowe zadania z wybranego działu. Natychmiastowa weryfikacja i pełny klucz rozwiązań.
                  </p>
                </div>
              </button>

              {/* Card 2: Mini Matura */}
              <button 
                onClick={() => setView('select_section_exam')}
                className="w-full relative group transform transition-transform active:translate-y-1 active:scale-[0.98] text-left"
              >
                <div className="absolute inset-0 bg-[#0B0E14] rounded-[24px] translate-y-2 transition-transform group-active:translate-y-0"></div>
                <div className="relative bg-[#141A23] border border-white/5 rounded-[24px] p-6 border-t border-l border-white/10 shadow-lg group-hover:border-[#A855F7]/30 transition-colors h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                  <div className="flex items-start justify-between relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#A855F7] to-[#7E22CE] p-[2px] rounded-2xl mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      <div className="w-full h-full bg-[#141A23] rounded-2xl flex items-center justify-center">
                        <BookOpen className="text-[#A855F7]" size={24} />
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-[#A855F7] bg-[#A855F7]/10 px-3 py-1.5 rounded-lg border border-[#A855F7]/20 flex items-center gap-1.5 shadow-sm">
                      <Clock size={12} /> 20 MIN
                    </span>
                  </div>
                  <h3 className="font-display font-black text-white text-lg mb-2 tracking-wide relative z-10">Mini Matura (Próbny arkusz)</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed font-medium relative z-10">
                    7-zadaniowy sprawdzian z zegarem, swobodną nawigacją po arkuszu, flagowaniem pytań i podsumowaniem wyników.
                  </p>
                </div>
              </button>

              {/* Card 3: Moje Błędy / Powtórki */}
              <button 
                onClick={startMistakesPractice}
                disabled={mistakesBank.length === 0}
                className={\`w-full relative group transform transition-transform \${mistakesBank.length > 0 ? 'active:translate-y-1 active:scale-[0.98]' : ''} text-left\`}
              >
                <div className={\`absolute inset-0 bg-[#0B0E14] rounded-[24px] \${mistakesBank.length > 0 ? 'translate-y-2 group-active:translate-y-0' : 'translate-y-0'} transition-transform\`}></div>
                <div className={\`relative bg-[#141A23] border border-white/5 rounded-[24px] p-6 border-t border-l border-white/10 shadow-lg h-full \${mistakesBank.length > 0 ? 'group-hover:border-[#F59E0B]/30' : 'opacity-60'} transition-colors\`}>
                  <div className="flex items-start justify-between">
                    <div className={\`w-14 h-14 rounded-2xl p-[2px] mb-4 \${mistakesBank.length > 0 ? 'bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-white/10'}\`}>
                      <div className="w-full h-full bg-[#141A23] rounded-2xl flex items-center justify-center">
                        <RotateCcw className={mistakesBank.length > 0 ? 'text-[#F59E0B]' : 'text-[#8B8D98]'} size={24} />
                      </div>
                    </div>
                    <span className={\`text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-lg border shadow-sm \${mistakesBank.length > 0 ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20' : 'bg-white/5 text-[#8B8D98] border-white/10'}\`}>
                      {mistakesBank.length} DO POWTÓRKI
                    </span>
                  </div>
                  <h3 className="font-display font-black text-white text-lg mb-2 tracking-wide">Baza Błędów</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed font-medium">
                    Wygeneruj mini arkusz składający się ze wszystkich zadań, na które odpowiedziałeś błędnie.
                  </p>
                </div>
              </button>
            </motion.div>
          )}`;
content = content.replace(menuRegex, newMenuView);
fs.writeFileSync('src/components/MaturaSimulatorView.tsx', content);
console.log('MaturaSimulatorView menu patched');
