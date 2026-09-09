const text = require('fs').readFileSync('all_tasks_1.txt', 'utf8');
const blocks = text.split('### [');
for(const block of blocks) {
    if(block.trim().length === 0) continue;
    const match = block.match(/\*\*\[ID:\s*(\d+)\]\s*Zadanie (.*?)\s*\((.*?)\)\*\*/);
    if(!match) {
        console.log("No match in block:", block.substring(0, 100));
    }
}
