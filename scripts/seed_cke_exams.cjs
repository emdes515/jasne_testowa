/**
 * seed_cke_exams.cjs
 * 
 * Seeder dedykowany dla oficjalnej bazy zadań CKE i arkuszy próbnych (exams/matura-podstawowa).
 * Wgrywa skonsolidowane 1006 zadań CKE do Cloud Firestore.
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

try {
  require('dotenv').config();
} catch (e) {}

if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === undefined) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'jasne-7efe7';
const MATURA_TASKS_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'cke_tasks_matematyka.json');

// Znajdź klucz konta usługi
const rootFiles = fs.readdirSync(path.resolve(__dirname, '..'));
const keyFile = rootFiles.find(f => f.startsWith('jasne-') && f.endsWith('.json') && f.includes('firebase-adminsdk')) ||
  'serviceAccountKey.json';

const serviceAccountPath = path.resolve(__dirname, '..', keyFile);

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`[ERROR] Nie znaleziono klucza Service Account: ${serviceAccountPath}`);
  process.exit(1);
}

console.log(`Używam klucza Service Account: ${keyFile}`);
const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: PROJECT_ID
  });
}

const db = admin.firestore();
try {
  db.settings({ preferRest: true });
} catch (e) {}

async function run() {
  if (!fs.existsSync(MATURA_TASKS_PATH)) {
    console.error(`[ERROR] Brak pliku ${MATURA_TASKS_PATH}`);
    process.exit(1);
  }

  const maturaTasks = JSON.parse(fs.readFileSync(MATURA_TASKS_PATH, 'utf8'));
  const sections = Array.from(new Set(maturaTasks.map(t => t.section).filter(Boolean)));

  console.log(`Wgrywam ${maturaTasks.length} zadań CKE (${sections.length} działów) do exams/matura-podstawowa...`);

  await db.collection('exams').doc('matura-podstawowa').set({
    id: 'matura-podstawowa',
    subject_id: 'matematyka-podstawowa',
    name: 'Oficjalna Baza Zadań CKE & Symulator Matury (Formuła 2023)',
    sections,
    tasks: maturaTasks,
    tasks_count: maturaTasks.length,
    updatedAt: new Date().toISOString()
  }, { merge: true });

  console.log('✅ Zakończono sukcesem! exams/matura-podstawowa została zaktualizowana w Firestore.');
  process.exit(0);
}

run().catch(err => {
  console.error('[ERROR] Błąd podczas wgrywania zadań CKE:', err);
  process.exit(1);
});
