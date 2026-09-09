const fs = require('fs');

function parseTasks(text) {
    const tasks = [];
    const blocks = text.split('### [');
    blocks.shift(); // remove the first empty element if any
    
    const seenIds = new Set();
    
    for (const block of blocks) {
        try {
            const sectionEnd = block.indexOf(']');
            const section = block.substring(0, sectionEnd).trim();
            
            const idMatch = block.match(/\*\*\[ID:\s*(\d+)\]\s*Zadanie (.*?)\s*\((.*?)\)\*\*/);
            if (!idMatch) continue;
            
            const id = idMatch[1];
            if (seenIds.has(id)) continue;
            seenIds.add(id);
            
            const name = idMatch[2];
            const pointsStr = idMatch[3];
            let points = 1;
            if (pointsStr.includes('pkt')) {
                const pts = parseInt(pointsStr.replace(/[^0-9]/g, ''));
                if (!isNaN(pts)) points = pts;
            } else if (pointsStr.includes('0–')) {
                const pts = parseInt(pointsStr.split('–')[1]);
                if (!isNaN(pts)) points = pts;
            }
            
            const contentStart = block.indexOf('**\n', idMatch.index);
            if (contentStart === -1) continue;
            
            const kluczIndex = block.indexOf('**Klucz CKE:**');
            if (kluczIndex === -1) continue;
            
            let rawContent = block.substring(contentStart + 3, kluczIndex).trim();
            
            const options = [];
            let content = rawContent;
            
            const optionRegex = /\n\s*([A-D])[\.\)]\s*(.*)/g;
            let match;
            let firstOptionIndex = -1;
            
            while ((match = optionRegex.exec(rawContent)) !== null) {
                if (firstOptionIndex === -1) firstOptionIndex = match.index;
                options.push(match[2].trim());
            }
            
            if (firstOptionIndex !== -1) {
                content = rawContent.substring(0, firstOptionIndex).trim();
            }
            
            const explanationRaw = block.substring(kluczIndex + 14).trim();
            const explanationLines = explanationRaw.split('\n');
            let explanation = '';
            let correctAnswer = '';
            
            for (const line of explanationLines) {
                if (line.startsWith('---') || line.startsWith('###')) break;
                explanation += line + '\n';
                if (line.includes('Odpowiedź')) {
                    const ansMatch = line.match(/Odpowiedź[:\s]*([A-D])/i);
                    if (ansMatch) correctAnswer = ansMatch[1].toUpperCase();
                }
            }
            explanation = explanation.trim();
            
            const isClosed = options.length > 0;
            
            tasks.push({
                id: id,
                section: section,
                content: content,
                options: options,
                correctAnswer: correctAnswer,
                points: points,
                isClosed: isClosed,
                explanation: explanation
            });
        } catch (e) {
            console.error("Error parsing block", e);
        }
    }
    return tasks;
}

const text = fs.readFileSync('all_tasks_1.txt', 'utf-8');
const parsed = parseTasks(text);
const tsContent = `export const zadania_matura = ${JSON.stringify(parsed, null, 2)};`;
fs.writeFileSync('src/data/zadania_matura.ts', tsContent);
console.log(`Parsed ${parsed.length} tasks and wrote to src/data/zadania_matura.ts`);
