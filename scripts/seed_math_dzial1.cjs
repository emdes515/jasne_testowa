/**
 * Targeted Cloud Firestore Seeding for Matematyka Podstawowa (Dział 1: Liczby Rzeczywiste)
 * Updates topic-1 / dzial-1 and its 15 lessons without deleting other subjects.
 */
process.env.FIRESTORE_PREFER_REST = 'true';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const path = require('path');

const MATH_CURRICULUM_PATH = path.resolve('c:/Users/mateu/Downloads/0.45-main/seed/curriculum/curriculum_matematyka.json');
const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'jasne-7efe7';

async function main() {
  console.log('====================================================');
  console.log('  FIRESTORE DZIAŁ 1 TARGETED SEEDING SCRIPT         ');
  console.log(`  Target Project: ${PROJECT_ID}                     `);
  console.log('====================================================\n');

  let admin;
  try {
    admin = require('c:/Users/mateu/Downloads/0.45-main/node_modules/firebase-admin');
  } catch (err) {
    try {
      admin = require('firebase-admin');
    } catch (e) {
      console.error('[ERROR] firebase-admin package is required.');
      process.exit(1);
    }
  }

  const keyLocations = [
    process.env.SERVICE_ACCOUNT_KEY_PATH,
    path.resolve('c:/Users/mateu/Downloads/0.45-main/serviceAccountKey.json'),
    path.resolve('c:/Users/mateu/Downloads/0.45-main/jasne-7efe7-firebase-adminsdk-fbsvc-25684c98c7.json')
  ].filter(Boolean);

  let serviceAccountPath = keyLocations.find(p => fs.existsSync(p));
  if (!serviceAccountPath) {
    console.error('[ERROR] Nie znaleziono klucza serviceAccountKey.json!');
    process.exit(1);
  }

  console.log(`Używam klucza Service Account: ${serviceAccountPath}`);
  const serviceAccount = require(path.resolve(serviceAccountPath));

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

  console.log('Połączono z Cloud Firestore.\n');

  const mathRaw = fs.readFileSync(MATH_CURRICULUM_PATH, 'utf8');
  const mathCurriculum = JSON.parse(mathRaw);
  const topic1 = mathCurriculum.topics[0];
  const lessons = topic1.lessons || [];

  console.log(`Wgrywanie Działu 1: ${topic1.title} (${lessons.length} lekcji)...`);

  const mathSubjectDocRef = db.collection('subjects').doc('matematyka-podstawowa');
  const batch = db.batch();

  const lessonsMetadata = lessons.map(lesson => ({
    id: lesson.id,
    title: lesson.title,
    required_points: lesson.required_correct_tasks || 4,
    required_correct_tasks: lesson.required_correct_tasks || 4,
    estimated_time_minutes: lesson.estimated_time_minutes || 5,
    estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
    tasks_count: (lesson.tasks || []).length
  }));

  const topicData = {
    id: 'dzial-1',
    numericId: 1,
    subject_id: 'matematyka-podstawowa',
    title: topic1.title,
    name: topic1.title,
    short_title: topic1.short_title || topic1.title,
    description: topic1.description || '',
    icon: 'Hash',
    color: '#00E5FF',
    matura_points_range: '4–8 pkt',
    importance: 'Kluczowy pewniak CKE',
    lessons_metadata: lessonsMetadata,
    final_test: topic1.final_test || null,
    updatedAt: new Date().toISOString()
  };

  // Zapisz zarówno jako 'dzial-1' jak i 'topic-1' dla pełnej kompatybilności wstecznej
  const topicRef1 = mathSubjectDocRef.collection('topics').doc('dzial-1');
  const topicRef2 = mathSubjectDocRef.collection('topics').doc('topic-1');
  batch.set(topicRef1, topicData, { merge: true });
  batch.set(topicRef2, { ...topicData, id: 'topic-1' }, { merge: true });

  for (const lesson of lessons) {
    const lessonData = {
      id: lesson.id,
      topic_id: 'dzial-1',
      subject_id: 'matematyka-podstawowa',
      title: lesson.title,
      estimated_time_minutes: lesson.estimated_time_minutes || 5,
      estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
      required_correct_tasks: lesson.required_correct_tasks || 4,
      theory_pill: lesson.theory_pill || null,
      formula_sheet: lesson.formula_sheet || lesson.formulaSheet || null,
      formulaSheet: lesson.formulaSheet || lesson.formula_sheet || null,
      tasks: lesson.tasks || [],
      updatedAt: new Date().toISOString()
    };

    const lRef1 = topicRef1.collection('lessons').doc(lesson.id);
    const lRef2 = topicRef2.collection('lessons').doc(lesson.id);
    batch.set(lRef1, lessonData, { merge: true });
    batch.set(lRef2, lessonData, { merge: true });
    console.log(`  + Przygotowano lekcję: ${lesson.id} (${lesson.tasks.length} zadań)`);
  }

  console.log('\nWysyłanie danych do Cloud Firestore...');
  await batch.commit();
  console.log('✓ Sukces! Dział 1 został pomyślnie zaktualizowany w Cloud Firestore.');
}

main().catch(err => {
  console.error('Błąd podczas wgrywania do Firestore:', err);
  process.exit(1);
});
