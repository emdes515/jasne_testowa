const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add onSnapshot to App.tsx
content = content.replace(
  "import { doc, getDoc, setDoc } from 'firebase/firestore';",
  "import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';\nimport { useEffect } from 'react';"
);

// Add completedTasks state
const userStateHook = "  const [user, loading] = useAuthState(auth);";
const newStateHook = `  const [user, loading] = useAuthState(auth);
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
  }, [user]);
`;
content = content.replace(userStateHook, newStateHook);

// Update handleCompleteTask
const oldCompleteTask = `  const handleCompleteTask = async (taskId?: string) => {
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
             const ct = data.completedTasks || [];
             if (!ct.includes(taskId)) {
                 await setDoc(progressRef, { completedTasks: [...ct, taskId] }, { merge: true });
             }
          } else {
             await setDoc(progressRef, { completedTasks: [taskId] }, { merge: true });
          }
        }
      } catch (e) {}
    }
    setActiveTask(false);
    setActiveTaskData(null);`;

// Wait, the regex might fail. I'll just use string replacement on the exact string. Let's write a smarter script.
