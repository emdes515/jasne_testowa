const text = require('fs').readFileSync('all_tasks_1.txt', 'utf8');
const blocks = text.split('### [');
for(const block of blocks) {
    if(block.trim().length === 0) continue;
    const idMatch = block.match(/\*\*\[ID:\s*(\d+)\]\s*Zadanie (.*?)\s*\((.*?)\)\*\*/);
    if(!idMatch) continue;
    
    const contentStart = block.indexOf('**\n', idMatch.index);
    if(contentStart === -1) console.log("Missing **\\n in ID", idMatch[1]);
    
    const kluczIndex = block.indexOf('**Klucz CKE:**');
    if(kluczIndex === -1) console.log("Missing Klucz in ID", idMatch[1]);
}
