const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldCompleteTask = `  const handleCompleteTask = (taskId?: string) => {
    if (taskId) {
      try {
        const stored = JSON.parse(localStorage.getItem("matura_quest_completed_tasks") || "[]");
        if (!stored.includes(taskId)) {
          stored.push(taskId);
          localStorage.setItem("matura_quest_completed_tasks", JSON.stringify(stored));
        }
      } catch (e) {}
    }
    setActiveTask(false);
    setActiveTaskData(null);`;

const newCompleteTask = `  const handleCompleteTask = async (taskId?: string) => {
    if (taskId) {
      try {
        const stored = JSON.parse(localStorage.getItem("matura_quest_completed_tasks") || "[]");
        let updated = false;
        if (!stored.includes(taskId)) {
          stored.push(taskId);
          localStorage.setItem("matura_quest_completed_tasks", JSON.stringify(stored));
          updated = true;
        }
        
        if (user && updated) {
          const progressRef = doc(db, 'users', user.uid, 'progress', 'math');
          const docSnap = await getDoc(progressRef);
          if (docSnap.exists()) {
             const data = docSnap.data();
             const completedTasks = data.completedTasks || [];
             if (!completedTasks.includes(taskId)) {
                 await setDoc(progressRef, { completedTasks: [...completedTasks, taskId] }, { merge: true });
             }
          } else {
             await setDoc(progressRef, { completedTasks: [taskId] }, { merge: true });
          }
        }
      } catch (e) {}
    }
    setActiveTask(false);
    setActiveTaskData(null);`;

content = content.replace(oldCompleteTask, newCompleteTask);
fs.writeFileSync('src/App.tsx', content);
