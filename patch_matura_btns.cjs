const fs = require('fs');
let content = fs.readFileSync('src/components/MaturaSimulatorView.tsx', 'utf8');

const nextTaskRegex = /<button\s*onClick=\{\(\) => getRandomTask\(selectedSection\)\}\s*className="w-full py-3\.5 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg"\s*>\s*Następne zadanie\s*<\/button>/g;
const nextTaskReplacement = `<button 
                    onClick={() => getRandomTask(selectedSection)}
                    className="w-full relative group transform transition-transform active:translate-y-1 active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-white/40 rounded-[16px] translate-y-1.5 group-active:translate-y-0 transition-transform"></div>
                    <div className="relative py-4 bg-white text-black rounded-[16px] font-black text-sm uppercase tracking-wider border-t border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                      Następne zadanie
                    </div>
                  </button>`;
content = content.replace(nextTaskRegex, nextTaskReplacement);

const showKeyRegex = /<button\s*onClick=\{\(\) => setShowExplanation\(true\)\}\s*className="w-full py-3\.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600\/20"\s*>\s*Pokaż klucz oceniania CKE\s*<\/button>/g;
const showKeyReplacement = `<button 
                        onClick={() => setShowExplanation(true)}
                        className="w-full relative group transform transition-transform active:translate-y-1 active:scale-[0.98]"
                      >
                        <div className="absolute inset-0 bg-blue-700 rounded-[16px] translate-y-1.5 group-active:translate-y-0 transition-transform"></div>
                        <div className="relative py-4 bg-blue-600 text-white rounded-[16px] font-black text-sm uppercase tracking-wider border-t border-white/20 shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                          Pokaż klucz oceniania CKE
                        </div>
                      </button>`;
content = content.replace(showKeyRegex, showKeyReplacement);

const examShowKeyRegex = /<button\s*onClick=\{\(\) => handleExamTaskExplanationOpen\(currentTask\.id\)\}\s*className="w-full py-3 bg-blue-600\/20 hover:bg-blue-600\/30 text-blue-400 border border-blue-600\/30 rounded-xl text-xs font-bold transition-all"\s*>\s*Odkryj kryteria CKE \(bez możliwości zmiany\)\s*<\/button>/g;
const examShowKeyReplacement = `<button 
                        onClick={() => handleExamTaskExplanationOpen(currentTask.id)}
                        className="w-full relative group transform transition-transform active:translate-y-1 active:scale-[0.98] mt-2"
                      >
                        <div className="absolute inset-0 bg-blue-900/60 rounded-[16px] translate-y-1.5 group-active:translate-y-0 transition-transform"></div>
                        <div className="relative py-3.5 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-[16px] font-black text-xs uppercase tracking-wider shadow-sm group-hover:bg-blue-600/30 transition-colors">
                          Odkryj kryteria CKE (bez możliwości zmiany)
                        </div>
                      </button>`;
content = content.replace(examShowKeyRegex, examShowKeyReplacement);


const submitExamRegex = /<button\s*onClick=\{finishExam\}\s*className="px-5 py-2\.5 bg-white text-black rounded-xl text-sm font-bold shadow-lg hover:bg-gray-200 transition-colors"\s*>\s*Zakończ arkusz\s*<\/button>/g;
const submitExamReplacement = `<button 
                      onClick={finishExam}
                      className="px-6 relative group transform transition-transform active:translate-y-1 active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-white/40 rounded-[16px] translate-y-1.5 group-active:translate-y-0 transition-transform"></div>
                      <div className="relative py-3 bg-white text-black rounded-[16px] text-sm font-black uppercase tracking-wider border-t border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                        Zakończ arkusz
                      </div>
                    </button>`;
content = content.replace(submitExamRegex, submitExamReplacement);

fs.writeFileSync('src/components/MaturaSimulatorView.tsx', content);
console.log('MaturaSimulatorView buttons patched');
