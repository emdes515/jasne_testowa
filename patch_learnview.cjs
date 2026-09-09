const fs = require('fs');

let content = fs.readFileSync('src/components/LearnView.tsx', 'utf8');

// Replace the button inner class logic
content = content.replace(
  /className=\{`flex-1 flex flex-col p-5 rounded-\[24px\] bg-\[#13141A\] border transition-all text-left relative overflow-hidden shadow-md \$\{\s*isLocked\s*\?\s*'opacity-50 border-white\/5 cursor-not-allowed'\s*:\s*isCompleted\s*\?\s*'border-emerald-500\/20 hover:border-emerald-500\/40 hover:bg-white\/\[0\.02\]'\s*:\s*`border-white\/10 hover:border-white\/20 hover:bg-white\/\[0\.02\] shadow-\[0_0_20px_rgba\(0,0,0,0\)\] hover:\$\{colorClass\.split\(' '\)\[3\]\}`\s*\}\`\}/,
  `className={\`flex-1 flex flex-col p-5 rounded-[24px] bg-[#13141A] border transition-all text-left relative overflow-hidden shadow-md group active:scale-[0.98] \${
                                isLocked 
                                  ? 'border-white/5 cursor-not-allowed bg-[#0A0A0C]' 
                                  : isCompleted
                                   ? 'border-emerald-500/20 hover:border-emerald-500/40 hover:bg-[#1A1C23]'
                                   : \`border-white/10 hover:border-white/30 hover:bg-[#1A1C23] shadow-[0_0_20px_rgba(0,0,0,0)] hover:\${colorClass.split(' ')[3]}\`
                              }\`}`
);

// Replace task.method 
content = content.replace(
  /\{task\.method \|\| \(isTheory \? 'Pigułka Wiedzy' : 'Zadanie Praktyczne'\)\}/g,
  "{isTheory ? 'Pigułka Wiedzy' : 'Zadanie Praktyczne'}"
);

// Fix title colors on locked cards
content = content.replace(
  /h3 className=\{`font-display font-semibold text-base mb-2 \$\{isLocked \? 'text-white\/50' : 'text-white group-hover:text-white\/90'\}\`\}/g,
  "h3 className={`font-display font-semibold text-base mb-2 ${isLocked ? 'text-gray-400' : 'text-white group-hover:text-blue-50 transition-colors'}`}"
);

// Fix locked label color
content = content.replace(
  /<span className=\{`text-\[10px\] font-bold uppercase tracking-wider \$\{isLocked \? 'text-white\/30' : iconColor\}`\}>/g,
  "<span className={`text-[10px] font-bold uppercase tracking-wider ${isLocked ? 'text-white/50' : iconColor}`}>"
);

// Fix locked text for question
content = content.replace(
  /<div className="text-sm text-white\/40 line-clamp-1 mb-4 italic">/g,
  "<div className={`text-sm line-clamp-1 mb-4 italic ${isLocked ? 'text-gray-600' : 'text-gray-400'}`}>"
);

// Fix locked time text
content = content.replace(
  /<span className="text-xs text-white\/40 font-medium">\{task\.time \|\| '2 min'\}<\/span>/g,
  "<span className={`text-xs font-medium ${isLocked ? 'text-gray-600' : 'text-gray-400'}`}>{task.time || '2 min'}</span>"
);

// Enhance CTA button
content = content.replace(
  /<div className=\{`flex items-center gap-1\.5 text-xs font-bold \$\{isCompleted \? 'text-emerald-400' : iconColor\}`\}>\s*\{isCompleted \? 'Rozwiązane' : isTheory \? 'Przeczytaj' : 'Rozwiąż'\}\s*\{!isCompleted && <ArrowRight size=\{14\} className="group-hover:translate-x-0\.5 transition-transform" \/>\}\s*<\/div>/,
  `<div className={\`flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2.5 min-h-[44px] min-w-[110px] rounded-xl transition-all \${
                                    isCompleted 
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                      : \`bg-blue-500/10 \${iconColor} border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40\`
                                  }\`}>
                                    {isCompleted ? 'Rozwiązane' : isTheory ? 'Przeczytaj' : 'Rozwiąż'}
                                    {!isCompleted && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                                  </div>`
);

fs.writeFileSync('src/components/LearnView.tsx', content);
console.log('LearnView patched');
