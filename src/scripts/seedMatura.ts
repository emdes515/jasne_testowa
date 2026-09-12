import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { zadania_matura } from '../data/zadania_matura';

export const seedMaturaTasks = async () => {
  try {
    console.log("Seeding matura tasks...");
    const tasksRef = collection(db, 'zadania_matura');

    // Firestore allows a maximum of 500 writes per batch
    const CHUNK_SIZE = 500;

    for (let i = 0; i < zadania_matura.length; i += CHUNK_SIZE) {
      const chunk = zadania_matura.slice(i, i + CHUNK_SIZE);
      const batch = writeBatch(db);

      for (const task of chunk) {
        batch.set(doc(tasksRef, task.id), task);
      }

      await batch.commit();
      console.log(`Successfully seeded a batch of ${chunk.length} matura tasks.`);
    }

    console.log("Matura tasks seeded successfully!");
  } catch (error) {
    console.error("Error seeding matura tasks:", error);
  }
};
