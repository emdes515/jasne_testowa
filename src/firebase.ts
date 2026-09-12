import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  initializeFirestore, 
  getFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  doc,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const config = {
  ...firebaseConfig,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey
};

export const app = getApps().length > 0 ? getApp() : initializeApp(config);
export const auth = getAuth(app);

// Rule 4: Enable offline cache with persistentLocalCache & multi-tab manager
let firestoreDb: any;
try {
  firestoreDb = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    })
  }, config.firestoreDatabaseId);
} catch (e) {
  try {
    firestoreDb = getFirestore(app, config.firestoreDatabaseId);
  } catch (err) {
    firestoreDb = getFirestore(app);
  }
}

export const db = firestoreDb;

// Validate Connection to Firestore (Firebase Skill Constraint)
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();
