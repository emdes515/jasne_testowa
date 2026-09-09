const fs = require('fs');

let content = fs.readFileSync('src/data/mathTasks.ts', 'utf-8');

// We want to add $...$ around math expressions in question and officialKey.
// We can use a regex that matches things that look like math.
// Actually, it's easier to just use the KaTeX full text rendering trick we discussed, but implement it properly.

// Let's just modify MathText.tsx to use a smart tokenizer, it's much safer!
