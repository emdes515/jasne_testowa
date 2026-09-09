const fs = require('fs');
let content = fs.readFileSync('src/components/TaskView.tsx', 'utf8');

content = content.replace(
  "taskType: activeTask.type,",
  "taskType: abcdOptions.length > 0 ? 'multiple-choice' : activeTask.type,"
);

// We need to do it twice since there are two fetch blocks for eval
content = content.replace(
  "taskType: activeTask.type,",
  "taskType: abcdOptions.length > 0 ? 'multiple-choice' : activeTask.type,"
);

fs.writeFileSync('src/components/TaskView.tsx', content);
