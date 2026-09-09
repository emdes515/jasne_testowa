const fs = require('fs');
let content = fs.readFileSync('src/components/LearnView.tsx', 'utf8');

// Add imports
content = content.replace(
  "import { mathTopics } from '../data/mathTasks';",
  "import { mathTopics } from '../data/mathTasks';\nimport { db } from '../firebase';\nimport { collection, getDocs, query } from 'firebase/firestore';"
);

// Add state and effect
const hookCode = `
  const [firebaseTopics, setFirebaseTopics] = useState<any[]>(mathTopics);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const q = query(collection(db, 'mathTasks'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const topics = snapshot.docs.map(doc => doc.data());
          topics.sort((a, b) => {
            const numA = parseInt(a.id.replace('math-', ''));
            const numB = parseInt(b.id.replace('math-', ''));
            return numA - numB;
          });
          setFirebaseTopics(topics);
        }
      } catch (err) {
        console.error("Error fetching math tasks from Firebase:", err);
      }
    };
    fetchTopics();
  }, []);

  // Override topics with firebase topics
  data.math.topics = firebaseTopics;
`;

content = content.replace(
  "export function LearnView({ onStartTask, isGuest, onLoginRequest, onProRequest }: LearnViewProps) {",
  "export function LearnView({ onStartTask, isGuest, onLoginRequest, onProRequest }: LearnViewProps) {\n" + hookCode
);

fs.writeFileSync('src/components/LearnView.tsx', content);
