const fs = require('fs');

function addSpacer(file) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace the very last </div> before ); }
    content = content.replace(/(<\/div>\s*)(}\s*);?\s*(}\s*)?$/s, '  <div className="h-32 shrink-0"></div>\n$1$2$3');
    fs.writeFileSync(file, content);
}

for (const file of [
    'src/components/LearnView.tsx', 
    'src/components/ArenaView.tsx', 
    'src/components/DashboardView.tsx', 
    'src/components/TaskView.tsx'
]) {
    addSpacer(file);
}
console.log("Done adding spacers.");
