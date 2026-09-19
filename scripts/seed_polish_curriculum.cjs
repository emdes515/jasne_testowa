/**
 * Dedicated Polish Curriculum Seeder for Cloud Firestore
 * 
 * Purges old/synthetic topics in `subjects/jezyk-polski/topics`
 * and writes all 20 authentic CKE Formula 2023 topics and lessons
 * from `seed/curriculum/curriculum_jezyk_polski.json`.
 */

process.env.FIRESTORE_PREFER_REST = 'true';
const fs = require('fs');
const path = require('path');

try {
  require('dotenv').config();
} catch (e) {}

const POLISH_CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_jezyk_polski.json');
const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'jasne-7efe7';

async function main() {
  console.log('====================================================');
  console.log('  FIRESTORE POLISH CURRICULUM SEED SCRIPT          ');
  console.log(`  Target Project: ${PROJECT_ID}                    `);
  console.log('====================================================\n');

  let admin;
  try {
    admin = require('firebase-admin');
  } catch (err) {
    console.error('[ERROR] firebase-admin package is required.');
    process.exit(1);
  }

  const keyLocations = [
    process.env.SERVICE_ACCOUNT_KEY_PATH,
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.resolve(__dirname, '..', 'serviceAccountKey.json'),
    path.resolve(__dirname, '..', 'service-account.json'),
    path.resolve(__dirname, '..', `${PROJECT_ID}-firebase-adminsdk.json`)
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

  if (!fs.existsSync(POLISH_CURRICULUM_PATH)) {
    console.error(`[ERROR] Brak pliku: ${POLISH_CURRICULUM_PATH}`);
    process.exit(1);
  }

  const polRaw = fs.readFileSync(POLISH_CURRICULUM_PATH, 'utf8');
  const polCurriculum = JSON.parse(polRaw);
  const polTopics = polCurriculum.topics || [];
  const polPillars = polCurriculum.subject?.pillars || [];

  console.log(`Wczytano ${polTopics.length} działów Języka Polskiego z JSON.`);

  const BATCH_SIZE_LIMIT = 400;
  let currentBatch = db.batch();
  let operationsInBatch = 0;
  let totalBatchesCommitted = 0;

  async function commitBatchIfNeeded(force = false) {
    if (operationsInBatch > 0 && (operationsInBatch >= BATCH_SIZE_LIMIT || force)) {
      console.log(`Zapisuję paczkę ${totalBatchesCommitted + 1} (${operationsInBatch} operacji)...`);
      await currentBatch.commit();
      totalBatchesCommitted++;
      currentBatch = db.batch();
      operationsInBatch = 0;
    }
  }

  // 1. Czyszczenie starych działów z subjects/jezyk-polski/topics
  console.log('--- Usuwanie starych tematów i lekcji z subjects/jezyk-polski/topics ---');
  const polSubjectDocRef = db.collection('subjects').doc('jezyk-polski');
  const oldTopicsSnap = await polSubjectDocRef.collection('topics').get();
  console.log(`Znaleziono ${oldTopicsSnap.docs.length} starych dokumentów działów.`);

  for (const tDoc of oldTopicsSnap.docs) {
    const lessonsSnap = await tDoc.ref.collection('lessons').get();
    for (const lDoc of lessonsSnap.docs) {
      currentBatch.delete(lDoc.ref);
      operationsInBatch++;
      await commitBatchIfNeeded();
    }
    currentBatch.delete(tDoc.ref);
    operationsInBatch++;
    await commitBatchIfNeeded();
  }

  await commitBatchIfNeeded(true);
  console.log('Stare działy zostały usunięte z bazy.\n');

  // 2. Przygotowanie metadanych przedmiotu
  let totalPolLessons = 0;
  let totalPolTasks = 0;
  const polTopicsSummary = polTopics.map(t => {
    const lCount = (t.lessons || []).length;
    const tCount = (t.lessons || []).reduce((acc, l) => acc + (l.tasks || []).length, 0);
    totalPolLessons += lCount;
    totalPolTasks += tCount;
    return {
      id: t.id,
      numericId: t.numericId,
      pillar_id: t.pillar_id,
      pillar_name: t.pillar_name,
      title: t.title,
      name: t.title,
      short_title: t.short_title || t.title,
      icon: t.icon || 'BookOpen',
      color: t.color || '#F43F5E',
      required_books: t.required_books || [],
      lessons_count: lCount,
      tasks_count: tCount
    };
  });

  currentBatch.set(polSubjectDocRef, {
    id: 'jezyk-polski',
    key: 'pol',
    name: 'Język Polski',
    short_name: 'Polski',
    title: 'Język Polski (Formuła 2023)',
    level: 'Nowa Formuła 2023 (Poziom Podstawowy)',
    icon: 'BookOpen',
    color: '#F43F5E',
    topics_count: polTopics.length,
    lessons_count: totalPolLessons,
    tasks_count: totalPolTasks,
    pillars: polPillars,
    topics_metadata: polTopicsSummary,
    updatedAt: new Date().toISOString()
  }, { merge: true });
  operationsInBatch++;
  await commitBatchIfNeeded();

  // 3. Zapisywanie 20 autentycznych działów i lekcji
  console.log('--- Zapisywanie 20 działów i powiązanych lekcji do Firestore ---');
  let writtenTopicsCount = 0;
  let writtenLessonsCount = 0;

  for (const topic of polTopics) {
    const topicId = topic.id;
    const lessons = topic.lessons || [];

    const lessonsMetadata = lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      name: lesson.name || lesson.title,
      required_points: lesson.required_correct_tasks || 3,
      required_correct_tasks: lesson.required_correct_tasks || 3,
      estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
      tasks_count: (lesson.tasks || []).length
    }));

    const topicData = {
      id: topicId,
      numericId: topic.numericId,
      subject_id: 'jezyk-polski',
      pillar_id: topic.pillar_id,
      pillar_name: topic.pillar_name,
      title: topic.title,
      name: topic.title,
      short_title: topic.short_title || topic.title,
      description: topic.description || '',
      icon: topic.icon || 'BookOpen',
      color: topic.color || '#F43F5E',
      matura_points_range: topic.matura_points_range || '5–15 pkt',
      importance: topic.importance || 'Kluczowy pewniak CKE',
      required_books: topic.required_books || [],
      lessons_metadata: lessonsMetadata,
      book_exam: topic.book_exam || null,
      final_test: topic.final_test || topic.epoch_exam || null,
      epoch_exam: topic.epoch_exam || null,
      updatedAt: new Date().toISOString()
    };

    const topicDocRef = polSubjectDocRef.collection('topics').doc(topicId);
    currentBatch.set(topicDocRef, topicData, { merge: true });
    operationsInBatch++;
    writtenTopicsCount++;
    await commitBatchIfNeeded();

    for (const lesson of lessons) {
      const lessonDocRef = topicDocRef.collection('lessons').doc(lesson.id);
      currentBatch.set(lessonDocRef, {
        id: lesson.id,
        topic_id: topicId,
        subject_id: 'jezyk-polski',
        title: lesson.title,
        estimated_time_minutes: lesson.estimated_time_minutes || 5,
        estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
        required_correct_tasks: lesson.required_correct_tasks || 3,
        theory_pill: lesson.theory_pill || null,
        leksykon: lesson.leksykon || null,
        formula_sheet: lesson.leksykon ? {
          title: lesson.leksykon.title || lesson.title,
          description: 'Leksykon CKE i kluczowe pojęcia',
          formulas: (lesson.leksykon.pojęcia || []).map(p => ({
            name: p.title,
            formula: p.def,
            description: p.title
          })),
          goldenRule: lesson.leksykon.goldenRule || '',
          ckeTrap: lesson.leksykon.ckeTrap || null
        } : null,
        tasks: lesson.tasks || [],
        updatedAt: new Date().toISOString()
      }, { merge: true });
      operationsInBatch++;
      writtenLessonsCount++;
      await commitBatchIfNeeded();
    }
    console.log(`✓ Zapisano dział [${topicId}] ${topic.title} (${lessons.length} lekcji)`);
  }

  await commitBatchIfNeeded(true);

  console.log('\n====================================================');
  console.log('  ZAKOŃCZONO SEEDOWANIE JĘZYKA POLSKIEGO W CLOUD FIRESTORE!');
  console.log(`  Działy zapisane: ${writtenTopicsCount}`);
  console.log(`  Lekcje zapisane: ${writtenLessonsCount}`);
  console.log(`  Łącznie paczek:  ${totalBatchesCommitted}`);
  console.log('====================================================\n');
  process.exit(0);
}

main().catch(err => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
