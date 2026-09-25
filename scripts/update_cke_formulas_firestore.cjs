process.env.FIRESTORE_PREFER_REST = 'true';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'jasne-7efe7';
const CKE_FORMULAS_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'cke_formulas.json');

const keyLocations = [
  path.resolve(__dirname, '..', 'serviceAccountKey.json'),
  path.resolve(__dirname, '..', 'service-account.json'),
  path.resolve(__dirname, '..', `${PROJECT_ID}-firebase-adminsdk.json`)
];

const serviceAccountPath = keyLocations.find(p => fs.existsSync(p));
if (!serviceAccountPath) {
  console.log('[INFO] Brak pliku serviceAccountKey.json - aktualizacja Firestore pominięta.');
  process.exit(0);
}

const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: PROJECT_ID
  });
}

const db = admin.firestore();

async function run() {
  const ckeFormulas = JSON.parse(fs.readFileSync(CKE_FORMULAS_PATH, 'utf8'));
  await db.collection('system').doc('ckeFormulas').set({
    id: 'ckeFormulas',
    topics: ckeFormulas.topics || [],
    formulas: ckeFormulas.formulas || [],
    formulas_count: (ckeFormulas.formulas || []).length,
    updatedAt: new Date().toISOString()
  }, { merge: true });
  console.log(`✓ Zaktualizowano system/ckeFormulas w Cloud Firestore (${(ckeFormulas.formulas || []).length} wzorów).`);
}

run().catch(err => {
  console.error('Błąd aktualizacji Firestore:', err);
  process.exit(1);
});
