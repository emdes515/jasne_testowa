const fs = require('fs');

function addSpacer(file) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace the very last </div> before ); }
    const match = content.match(/(<\/div>\s*)\s*(\)?\s*;\s*\}?\s*)$/);
    if (match) {
        content = content.replace(/(<\/div>\s*)\s*(\)?\s*;\s*\}?\s*)$/, '  <div className="h-32 shrink-0"></div>\n$1$2');
        fs.writeFileSync(file, content);
        console.log("Fixed", file);
    } else {
        // TaskView has `    </div>\n  );\n}`
        const match2 = content.match(/(<\/div>\s*\)\s*;\s*\})$/);
        if (match2) {
             content = content.replace(/(<\/div>\s*\)\s*;\s*\})$/, '  <div className="h-32 shrink-0"></div>\n$1');
             fs.writeFileSync(file, content);
             console.log("Fixed", file);
        } else {
             console.log("Could not fix", file);
        }
    }
}

for (const file of [
    'src/components/LearnView.tsx', 
    'src/components/ArenaView.tsx', 
    'src/components/DashboardView.tsx', 
    'src/components/TaskView.tsx'
]) {
    addSpacer(file);
}
