/**
 * Cloud Firestore Seeding Script: All 15 Topics & 225 Lessons for Matematyka Podstawowa
 * Seeds to:
 * - subjects/matematyka-podstawowa/topics/dzial-X/lessons/lesson-X-Y
 * - topics/dzial-X/lessons/lesson-X-Y
 */
process.env.FIRESTORE_PREFER_REST = 'true';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const path = require('path');

const MATH_CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'jasne-7efe7';

async function main() {
  console.log('====================================================');
  console.log('  FIRESTORE SEEDING: ALL 15 MATH TOPICS             ');
  console.log(`  Target Project: ${PROJECT_ID}                     `);
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
    path.resolve(__dirname, '..', 'serviceAccountKey.json'),
    path.resolve(__dirname, '..', 'jasne-7efe7-firebase-adminsdk-fbsvc-25684c98c7.json')
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

  function sanitizeForFirestore(val) {
    if (val === undefined) return null;
    if (Array.isArray(val)) {
      return val.map(item => {
        if (Array.isArray(item)) {
          if (item.length === 2 && typeof item[0] === 'number' && typeof item[1] === 'number') {
            return { x: item[0], y: item[1] };
          }
          if (item.length === 2) {
            return { label: String(item[0]), value: sanitizeForFirestore(item[1]) };
          }
          // Generic nested array conversion to object
          const obj = {};
          item.forEach((subItem, idx) => {
            obj[`item_${idx}`] = sanitizeForFirestore(subItem);
          });
          return obj;
        }
        return sanitizeForFirestore(item);
      });
    }
    if (val !== null && typeof val === 'object') {
      const res = {};
      for (const [k, v] of Object.entries(val)) {
        res[k] = sanitizeForFirestore(v);
      }
      return res;
    }
    return val;
  }

  const mathRaw = fs.readFileSync(MATH_CURRICULUM_PATH, 'utf8');
  const mathCurriculum = JSON.parse(mathRaw);

  const mathSubjectDocRef = db.collection('subjects').doc('matematyka-podstawowa');
  const rootTopicsColRef = db.collection('topics');

  let currentBatch = db.batch();
  let operationsInBatch = 0;
  let totalBatchesCommitted = 0;
  const BATCH_LIMIT = 20; // 20 dokumentów per commit, aby nie przekroczyć 10MB limitu Firestore payload

  async function commitIfNeeded(force = false) {
    if (operationsInBatch > 0 && (operationsInBatch >= BATCH_LIMIT || force)) {
      totalBatchesCommitted++;
      console.log(`Zapisuję paczkę nr ${totalBatchesCommitted} (${operationsInBatch} operacji)...`);
      await currentBatch.commit();
      currentBatch = db.batch();
      operationsInBatch = 0;
    }
  }

  for (let tIdx = 0; tIdx < mathCurriculum.topics.length; tIdx++) {
    const topic = mathCurriculum.topics[tIdx];
    const numericId = tIdx + 1;
    const dzialId = `dzial-${numericId}`;
    const topicId = `topic-${numericId}`;
    const lessons = topic.lessons || [];

    console.log(`\nPrzetwarzanie Działu ${numericId}: ${topic.title} (${lessons.length} lekcji)...`);

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
      id: dzialId,
      numericId: numericId,
      subject_id: 'matematyka-podstawowa',
      title: topic.title,
      name: topic.title,
      short_title: topic.short_title || topic.title,
      description: topic.description || '',
      icon: topic.icon || 'Hash',
      color: topic.color || '#00E5FF',
      matura_points_range: topic.matura_points_range || '4–8 pkt',
      importance: topic.importance || 'Kluczowy pewniak CKE',
      lessons_metadata: lessonsMetadata,
      final_test: topic.final_test || null,
      updatedAt: new Date().toISOString()
    };

    const cleanTopicData = sanitizeForFirestore(topicData);

    // 1. subjects/matematyka-podstawowa/topics/dzial-X & topic-X
    const subDzialRef = mathSubjectDocRef.collection('topics').doc(dzialId);
    const subTopicRef = mathSubjectDocRef.collection('topics').doc(topicId);
    currentBatch.set(subDzialRef, cleanTopicData, { merge: false });
    operationsInBatch++;
    currentBatch.set(subTopicRef, { ...cleanTopicData, id: topicId }, { merge: false });
    operationsInBatch++;

    // 2. root topics/dzial-X & topic-X
    const rootDzialRef = rootTopicsColRef.doc(dzialId);
    const rootTopicRef = rootTopicsColRef.doc(topicId);
    currentBatch.set(rootDzialRef, cleanTopicData, { merge: false });
    operationsInBatch++;
    currentBatch.set(rootTopicRef, { ...cleanTopicData, id: topicId }, { merge: false });
    operationsInBatch++;

    await commitIfNeeded();

    for (const lesson of lessons) {
      const lessonData = {
        id: lesson.id,
        topic_id: dzialId,
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
      const cleanLessonData = sanitizeForFirestore(lessonData);

      // Czyste nadpisanie (merge: false) usuwające wszelkie stare zaszłości z bazy
      currentBatch.set(subDzialRef.collection('lessons').doc(lesson.id), cleanLessonData, { merge: false });
      operationsInBatch++;
      currentBatch.set(rootDzialRef.collection('lessons').doc(lesson.id), cleanLessonData, { merge: false });
      operationsInBatch++;

      await commitIfNeeded();
    }
  }

  await commitIfNeeded(true);
  console.log('\n✓ SUKCES! Wszystkie 15 działów (225 lekcji) zostały pomyślnie zaktualizowane w Cloud Firestore!');
}

main().catch(err => {
  console.error('Błąd podczas wgrywania do Firestore:', err);
  process.exit(1);
});
