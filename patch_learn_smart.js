import fs from 'fs';

let content = fs.readFileSync('src/components/LearnView.tsx', 'utf8');

content = content.replace(
  "interface LearnViewProps {",
  "interface LearnViewProps {\n  completedTasks?: string[];"
);

content = content.replace(
  "export function LearnView({ onStartTask, isGuest, onLoginRequest, onProRequest }: LearnViewProps) {",
  "export function LearnView({ onStartTask, isGuest, onLoginRequest, onProRequest, completedTasks = [] }: LearnViewProps) {"
);

// Remove the whole completedTasks state and effects from LearnView
const regex = /const \[completedTasks, setCompletedTasks\] = useState<string\[\]>\(\[\]\);[\s\S]*?\}, \[user\]\);/g;
content = content.replace(regex, "");

// Remove the sync to local storage polling
const regex2 = /\/\/ Sync to local storage for updates from TaskView[\s\S]*?\}, \[user, completedTasks\.length\]\);/g;
content = content.replace(regex2, "");

// Let's also remove `useAuthState` and `auth` if we don't need them, but they might be used elsewhere. 
// Just in case, let's leave them or we can remove them if we get lint errors.

fs.writeFileSync('src/components/LearnView.tsx', content);
