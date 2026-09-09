const fs = require('fs');
for (const file of ['src/data/mathTasks.ts', 'src/data/zadania_matura.ts']) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace all instances of 6 backslashes with 2 backslashes
    content = content.replace(/\\\\\\\\\\\\/g, '\\\\');
    
    // Replace all instances of 4 backslashes with 2 backslashes.
    content = content.replace(/\\\\\\\\/g, '\\\\');
    
    fs.writeFileSync(file, content);
}
console.log("Done");
