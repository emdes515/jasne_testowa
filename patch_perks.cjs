const fs = require('fs');

let content = fs.readFileSync('src/components/PerksVaultSection.tsx', 'utf8');

// 1. Rename Rynek
content = content.replace(/Rynek Perkóww & Tarcz/g, 'Rynek Perków i Tarcz');

// 2. Change SHOP_ITEMS map
const shopItemRegex = /<div\s*key=\{item\.id\}\s*className="bg-\[#13141A\].*?<\/div>\s*<\/div>\s*\);\s*\}/s;
const shopItemReplacement = `<div
                key={item.id}
                className="bg-[#141A23] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 shadow-lg hover:border-white/10 transition-colors"
              >
                {/* Header Karty */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B0E14] border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    {item.icon === 'Shield' && <Shield size={24} />}
                    {item.icon === 'ShieldCheck' && <ShieldCheck size={24} />}
                    {item.icon === 'Zap' && <Zap size={24} />}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-base">{item.name}</h4>
                    <span className="text-[10px] uppercase font-bold text-[#A855F7] bg-[#A855F7]/10 px-2 py-0.5 rounded-full mt-1 inline-block">Wzmocnienie</span>
                  </div>
                </div>

                {/* Body Karty */}
                <div>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{item.description}</p>
                </div>

                {/* Footer / Action Row */}
                <div className="flex flex-row items-center gap-2 mt-1">
                  {/* Buy with Mastery Tokens */}
                  <button
                    onClick={() => handlePurchase(item, 'tokens')}
                    disabled={!canAffordTokens}
                    title={!canAffordTokens ? "Za mało żetonów" : ""}
                    className={\`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all \${
                      canAffordTokens
                        ? 'bg-[#D97706]/10 hover:bg-[#D97706]/20 text-[#F59E0B] border-[#D97706]/30 active:scale-95'
                        : 'bg-white/5 text-[#6B7280] border-white/5 opacity-40 cursor-not-allowed'
                    }\`}
                  >
                    <Crown size={14} />
                    <span>{item.tokenPrice} Żetonów</span>
                  </button>

                  {/* Buy with Coins */}
                  <button
                    onClick={() => handlePurchase(item, 'coins')}
                    disabled={!canAffordCoins}
                    title={!canAffordCoins ? "Za mało monet" : ""}
                    className={\`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all \${
                      canAffordCoins
                        ? 'bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 text-[#00D2FF] border-[#3B82F6]/30 active:scale-95'
                        : 'bg-white/5 text-[#6B7280] border-white/5 opacity-40 cursor-not-allowed'
                    }\`}
                  >
                    <Coins size={14} />
                    <span>{item.coinPrice} Monet</span>
                  </button>
                </div>
              </div>
            );
          }`;

content = content.replace(shopItemRegex, shopItemReplacement);

// 3. Update the other cards to #141A23 and better borders
content = content.replace(/bg-\[#13141A\] border border-white\/5/g, 'bg-[#141A23] border border-white/5 shadow-md');

fs.writeFileSync('src/components/PerksVaultSection.tsx', content);
console.log('PerksVaultSection patched');
