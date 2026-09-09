const fs = require('fs');
let content = fs.readFileSync('src/components/LearnView.tsx', 'utf8');

// We need to import `auth` and `doc, getDoc` if not already
content = content.replace(
  "import { collection, getDocs, query } from 'firebase/firestore';",
  "import { collection, getDocs, query, doc, getDoc, onSnapshot } from 'firebase/firestore';\nimport { auth } from '../firebase';\nimport { useAuthState } from 'react-firebase-hooks/auth';"
);

// We need to add useAuthState to LearnView
content = content.replace(
  "const [firebaseTopics, setFirebaseTopics] = useState<any[]>(mathTopics);",
  `const [firebaseTopics, setFirebaseTopics] = useState<any[]>(mathTopics);
  const [user] = useAuthState(auth);`
);

// We need to update completedTasks logic
const oldCompletedLogic = `  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('matura_quest_completed_tasks');
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return [];
  });`;

const newCompletedLogic = `  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  
  useEffect(() => {
    let unsubscribe = () => {};
    if (user) {
      const progressRef = doc(db, 'users', user.uid, 'progress', 'math');
      unsubscribe = onSnapshot(progressRef, (docSnap) => {
        if (docSnap.exists()) {
          setCompletedTasks(docSnap.data().completedTasks || []);
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

  // Sync to local storage for updates from TaskView (since App.tsx currently writes to localStorage)
  useEffect(() => {
    const handleStorageChange = () => {
      if (!user) {
        try {
          const stored = localStorage.getItem('matura_quest_completed_tasks');
          if (stored) setCompletedTasks(JSON.parse(stored));
        } catch(e) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Poll just in case (since TaskView is in the same tab, 'storage' event doesn't fire for the same tab)
    const interval = setInterval(() => {
        try {
          const stored = localStorage.getItem('matura_quest_completed_tasks');
          if (stored) {
             const parsed = JSON.parse(stored);
             if (parsed.length !== completedTasks.length) {
                // If user is logged in, we also want to push to Firestore? No, App.tsx should push to Firestore.
                // Actually, let's just use polling to pick up changes from App.tsx.
                if (!user) setCompletedTasks(parsed);
             }
          }
        } catch(e) {}
    }, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user, completedTasks.length]);
`;

content = content.replace(oldCompletedLogic, newCompletedLogic);

fs.writeFileSync('src/components/LearnView.tsx', content);
