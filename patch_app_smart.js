import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add onSnapshot
if (!content.includes('onSnapshot')) {
  content = content.replace(
    "import { doc, getDoc, setDoc } from 'firebase/firestore';",
    "import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';"
  );
}

// Add useEffect
if (!content.includes('import { useEffect } from')) {
  content = content.replace(
    "import { useState } from 'react';",
    "import { useState, useEffect } from 'react';"
  );
}

// Add completedTasks
if (!content.includes('const [completedTasks, setCompletedTasks]')) {
  content = content.replace(
    "const [user, loading] = useAuthState(auth);",
    `const [user, loading] = useAuthState(auth);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  
  useEffect(() => {
    let unsubscribe = () => {};
    if (user) {
      const progressRef = doc(db, 'users', user.uid, 'progress', 'math');
      unsubscribe = onSnapshot(progressRef, (docSnap) => {
        if (docSnap.exists()) {
          setCompletedTasks(docSnap.data().completedTasks || []);
        } else {
          setCompletedTasks([]);
        }
      });
    } else {
      try {
        const stored = localStorage.getItem('matura_quest_completed_tasks');
        if (stored) setCompletedTasks(JSON.parse(stored));
      } catch(e) {}
    }
    return () => unsubscribe();
  }, [user]);`
  );
}

// Pass completedTasks to LearnView
content = content.replace(
  "<LearnView \n                  onStartTask={handleStartTask} \n                  isGuest={isGuest} \n                  onLoginRequest={handleLoginClick}\n                  onProRequest={() => setShowProPopup(true)}\n                />",
  "<LearnView \n                  onStartTask={handleStartTask} \n                  isGuest={isGuest} \n                  onLoginRequest={handleLoginClick}\n                  onProRequest={() => setShowProPopup(true)}\n                  completedTasks={completedTasks}\n                />"
);

// We should also replace the old handleCompleteTask to be optimistic!
const regex = /const handleCompleteTask = async \(taskId\?: string\) => \{[\s\S]*?setActiveTaskData\(null\);/;
content = content.replace(regex, `const handleCompleteTask = async (taskId?: string) => {
    if (taskId) {
      try {
        let currentCompleted = [...completedTasks];
        if (!currentCompleted.includes(taskId)) {
          currentCompleted.push(taskId);
          setCompletedTasks(currentCompleted); // optimistic
          
          if (user) {
            const progressRef = doc(db, 'users', user.uid, 'progress', 'math');
            await setDoc(progressRef, { completedTasks: currentCompleted }, { merge: true });
          } else {
            localStorage.setItem("matura_quest_completed_tasks", JSON.stringify(currentCompleted));
          }
        }
      } catch (e) {
        console.error("Error saving progress:", e);
      }
    }
    setActiveTask(false);
    setActiveTaskData(null);`);

fs.writeFileSync('src/App.tsx', content);
