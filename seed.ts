import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { mathTopics } from './src/data/mathTasks';

import * as dotenv from 'dotenv';
dotenv.config();

const baseConfig = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const config = {
    ...baseConfig,
    apiKey: process.env.VITE_FIREBASE_API_KEY || baseConfig.apiKey
};
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function seed() {
    for (const topic of mathTopics) {
        await setDoc(doc(db, 'mathTasks', topic.id), topic);
        console.log(`Seeded topic: ${topic.name}`);
    }
    console.log("Done seeding.");
    process.exit(0);
}

seed().catch(console.error);
