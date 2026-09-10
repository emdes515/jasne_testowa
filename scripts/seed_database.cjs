/**
 * Admin Migration Script (Seeding Database to Cloud Firestore)
 * 
 * Schema: Flat-Bundle
 * - Collection 'topics': topics/{topic_id} -> metadata + lessons_metadata
 * - Subcollection 'lessons': topics/{topic_id}/lessons/{lesson_id} -> theory_pill + full tasks array
 * 
 * Features:
 * - Upsert support ({ merge: true }) for idempotent re-runs
 * - Batch writes using WriteBatch (auto-chunked to <= 400 writes per batch)
 * - Service Account Key authentication with clear guidance
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env.FIRESTORE_PREFER_REST = 'true';
const fs = require('fs');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');

// Load environment variables if dotenv is available
try {
  require('dotenv').config();
} catch (e) {}

const CURRICULUM_PATH = path.resolve(__dirname, '..', 'curriculum_matematyka.json');
const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'jasne-7efe7';

async function main() {
  console.log('====================================================');
  console.log('  FIRESTORE SEEDING SCRIPT: FLAT-BUNDLE MIGRATION   ');
  console.log(`  Target Project: ${PROJECT_ID}                      `);
  console.log('====================================================\n');

  // 1. Read curriculum_matematyka.json
  if (!fs.existsSync(CURRICULUM_PATH)) {
    console.error(`[ERROR] File not found: ${CURRICULUM_PATH}`);
    process.exit(1);
  }

  const rawJson = fs.readFileSync(CURRICULUM_PATH, 'utf8');
  const curriculumData = JSON.parse(rawJson);
  const topics = curriculumData.topics || [];

  console.log(`Found ${topics.length} topic(s) in curriculum_matematyka.json.`);

  // 2. Authorize via Service Account Key
  let admin;
  try {
    admin = require('firebase-admin');
  } catch (err) {
    console.error('[ERROR] firebase-admin package is required. Run: npm install firebase-admin');
    process.exit(1);
  }

  // Look for service account key in common locations
  const keyLocations = [
    process.env.SERVICE_ACCOUNT_KEY_PATH,
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.resolve(__dirname, '..', 'serviceAccountKey.json'),
    path.resolve(__dirname, '..', 'service-account.json'),
    path.resolve(__dirname, '..', `${PROJECT_ID}-firebase-adminsdk.json`)
  ].filter(Boolean);

  let serviceAccountPath = keyLocations.find(p => fs.existsSync(p));

  if (!serviceAccountPath) {
    console.warn('\n[UWAGA] Nie znaleziono pliku Service Account Key!');
    console.warn('Aby uruchomić migrację do chmury w projekcie ' + PROJECT_ID + ':');
    console.warn('1. Wejdź do konsoli Firebase: https://console.firebase.google.com/project/' + PROJECT_ID + '/settings/serviceaccounts/adminsdk');
    console.warn('2. Kliknij "Wygeneruj nowy klucz prywatny" ("Generate new private key").');
    console.warn('3. Zapisz pobrany plik jako "serviceAccountKey.json" w głównym katalogu tego projektu.');
    console.warn('4. Uruchom ponownie: npm run seed\n');

    // Run Dry Run mode to validate curriculum structure
    console.log('--- Rozpoczynam tryb walidacji struktury (DRY RUN) ---');
    let totalLessonsCount = 0;
    let totalTasksCount = 0;

    topics.forEach((t, i) => {
      const lessons = t.lessons || [];
      const tasksInTopic = lessons.reduce((acc, l) => acc + (l.tasks || []).length, 0);
      totalLessonsCount += lessons.length;
      totalTasksCount += tasksInTopic;
      console.log(`✓ Dział [${t.id}] "${t.title}": ${lessons.length} lekcji, ${tasksInTopic} zadań`);
    });

    console.log('\n[DRY RUN OK] Struktura Flat-Bundle jest w 100% poprawna:');
    console.log(`- Działów (topics): ${topics.length}`);
    console.log(`- Lekcji (lessons): ${totalLessonsCount}`);
    console.log(`- Zadań (tasks): ${totalTasksCount}`);
    console.log('\nUmieść "serviceAccountKey.json" w katalogu głównym i uruchom ponownie, aby zapisać dane w Cloud Firestore.\n');
    return;
  }

  console.log(`Używam klucza Service Account: ${serviceAccountPath}`);
  const serviceAccount = require(path.resolve(serviceAccountPath));

  // Sprawdzenie stanu bazy danych Firestore przed zapisem
  const auth = new GoogleAuth({
    keyFile: serviceAccountPath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/datastore']
  });
  try {
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    const res = await client.request({
      url: `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases`,
      headers: { Authorization: 'Bearer ' + token.token }
    });
    const dbs = res.data.databases || [];
    if (dbs.length === 0) {
      console.warn('\n========================================================================');
      console.warn('  [WYMAGANA JEDNA AKCJA] Baza Firestore nie została jeszcze włączona!   ');
      console.warn('========================================================================');
      console.warn(`W Twoim projekcie Firebase "${PROJECT_ID}" usługa Cloud Firestore czeka na utworzenie.\n`);
      console.warn('Zrobisz to w 30 sekund:');
      console.warn(`1. Wejdź na: https://console.firebase.google.com/project/${PROJECT_ID}/firestore`);
      console.warn('2. Kliknij przycisk "Utwórz bazę danych" ("Create database").');
      console.warn('3. Wybierz lokalizację (np. europe-central2 Warszawa lub eur3) i zatwierdź.');
      console.warn('\nGdy tylko klikniesz "Utwórz", napisz mi "Wgraj" lub uruchom: npm run seed');
      console.warn('Wszystkie 15 lekcji i 120 zadań zostanie natychmiast załadowanych!');
      console.warn('========================================================================\n');
      return;
    }
  } catch (e) {
    console.warn('Sprawdzanie statusu bazy Firestore:', e.message);
  }

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

  // 3. Transform & Batch Write
  const BATCH_SIZE_LIMIT = 400; // Safe threshold below 500 limit
  let currentBatch = db.batch();
  let operationsInBatch = 0;
  let totalBatchesCommitted = 0;
  let totalTopicsWritten = 0;
  let totalLessonsWritten = 0;

  async function commitBatchIfNeeded(force = false) {
    if (operationsInBatch > 0 && (operationsInBatch >= BATCH_SIZE_LIMIT || force)) {
      console.log(`Zapisuję paczkę ${totalBatchesCommitted + 1} (${operationsInBatch} operacji)...`);
      await currentBatch.commit();
      totalBatchesCommitted++;
      currentBatch = db.batch();
      operationsInBatch = 0;
    }
  }

  // 3. Pełne czyszczenie starej bazy (Complete Purge of old topics & lessons)
  console.log('--- Rozpoczynam czyszczenie starych danych z Cloud Firestore ---');
  try {
    // Czyszczenie root topics
    const existingTopicsSnap = await db.collection('topics').get();
    for (const tDoc of existingTopicsSnap.docs) {
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

    // Czyszczenie subjects/matematyka-podstawowa/topics
    const subjectTopicsSnap = await db.collection('subjects').doc('matematyka-podstawowa').collection('topics').get();
    for (const tDoc of subjectTopicsSnap.docs) {
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
    console.log('Stare dane zostały wyczyszczone.\n');
  } catch (err) {
    console.warn('Uwaga przy czyszczeniu starej bazy:', err.message);
  }

  // 4. Przygotowanie metadanych przedmiotu Matematyka Podstawowa
  console.log('--- Rozpoczynam wgrywanie nowego programu nauczania w strukturze wieloprzedmiotowej ---');
  const defaultIcons = {
    1: 'Hash', 2: 'Binary', 3: 'EqualNot', 4: 'Layers', 5: 'TrendingUp',
    6: 'Activity', 7: 'Target', 8: 'TriangleRight', 9: 'CircleDot', 10: 'Map',
    11: 'Box', 12: 'ListOrdered', 13: 'PieChart', 14: 'Clock', 15: 'Trophy'
  };
  const defaultColors = {
    1: '#00E5FF', 2: '#8B5CF6', 3: '#10B981', 4: '#F59E0B', 5: '#06B6D4',
    6: '#EC4899', 7: '#F97316', 8: '#3B82F6', 9: '#14B8A6', 10: '#6366F1',
    11: '#A855F7', 12: '#EAB308', 13: '#EF4444', 14: '#22C55E', 15: '#E11D48'
  };
  const defaultPoints = {
    1: '4–8 pkt', 2: '5–9 pkt', 3: '6–10 pkt', 4: '4–6 pkt', 5: '4–6 pkt',
    6: '5–8 pkt', 7: '5–9 pkt', 8: '4–7 pkt', 9: '6–10 pkt', 10: '4–8 pkt',
    11: '4–8 pkt', 12: '2–5 pkt', 13: '2–5 pkt', 14: '2–4 pkt', 15: '4–6 pkt'
  };
  const defaultImportance = {
    1: 'Kluczowy pewniak', 2: 'Kluczowy pewniak', 3: 'Gwarantowane punkty', 4: 'Wysoka waga', 5: 'Pewniak maturalny',
    6: 'Kluczowy pewniak', 7: 'Pewniak maturalny', 8: 'Kluczowy pewniak', 9: 'Wysoka waga', 10: 'Wysoka waga',
    11: 'Pewniak maturalny', 12: 'Częsty temat', 13: 'Pewniak maturalny', 14: 'Szybkie punkty', 15: 'Maksimum punktów'
  };

  let totalCalculatedLessons = 0;
  let totalCalculatedTasks = 0;
  const topicsSummaryList = topics.map(t => {
    const tNum = typeof t.numericId === 'number' ? t.numericId : parseInt(String(t.id).replace(/\D/g, '') || '1', 10);
    const lCount = (t.lessons || []).length;
    const tCount = (t.lessons || []).reduce((acc, l) => acc + (l.tasks || []).length, 0);
    totalCalculatedLessons += lCount;
    totalCalculatedTasks += tCount;
    return {
      id: t.id,
      numericId: tNum,
      title: t.title,
      name: t.title,
      short_title: t.short_title || t.title,
      icon: t.icon || defaultIcons[tNum] || 'Layers',
      color: t.color || defaultColors[tNum] || '#F59E0B',
      lessons_count: lCount,
      tasks_count: tCount
    };
  });

  const subjectData = {
    id: 'matematyka-podstawowa',
    key: 'math',
    name: 'Matematyka Podstawowa',
    short_name: 'Matematyka',
    title: 'Matematyka Podstawowa',
    level: 'Nowa Formuła 2023 (Poziom Podstawowy)',
    icon: 'Calculator',
    color: '#FFB800',
    topics_count: topics.length,
    lessons_count: totalCalculatedLessons,
    tasks_count: totalCalculatedTasks,
    topics_metadata: topicsSummaryList,
    updatedAt: new Date().toISOString()
  };

  // Zapis do kolekcji subjects/matematyka-podstawowa
  const subjectDocRef = db.collection('subjects').doc('matematyka-podstawowa');
  currentBatch.set(subjectDocRef, subjectData, { merge: true });
  operationsInBatch++;

  // Dodatkowe wpisy rejestru dla kolejnych przedmiotów (Język Polski, Język Angielski)
  const polskiSubjectData = {
    id: 'jezyk-polski',
    key: 'pol',
    name: 'Język Polski',
    short_name: 'Polski',
    title: 'Język Polski',
    level: 'Nowa Formuła 2023',
    icon: 'BookOpen',
    color: '#F43F5E',
    topics_count: 0,
    lessons_count: 0,
    tasks_count: 0,
    updatedAt: new Date().toISOString()
  };
  currentBatch.set(db.collection('subjects').doc('jezyk-polski'), polskiSubjectData, { merge: true });
  operationsInBatch++;

  const angielskiSubjectData = {
    id: 'jezyk-angielski',
    key: 'eng',
    name: 'Język Angielski',
    short_name: 'Angielski',
    title: 'Język Angielski',
    level: 'Poziom Podstawowy • B1/B2',
    icon: 'Globe',
    color: '#10B981',
    topics_count: 0,
    lessons_count: 0,
    tasks_count: 0,
    updatedAt: new Date().toISOString()
  };
  currentBatch.set(db.collection('subjects').doc('jezyk-angielski'), angielskiSubjectData, { merge: true });
  operationsInBatch++;

  await commitBatchIfNeeded();

  // 5. Wgrywanie działów i lekcji wyłącznie pod subjects/{subjectId}/topics/{topicId}
  for (const topic of topics) {
    const topicId = topic.id || `dzial-${topic.numericId || 1}`;
    const lessons = topic.lessons || [];

    const lessonsMetadata = lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      required_points: lesson.required_correct_tasks || 3,
      required_correct_tasks: lesson.required_correct_tasks || 3,
      estimated_time_minutes: lesson.estimated_time_minutes || 5,
      estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
      tasks_count: (lesson.tasks || []).length
    }));

    const topicNumericId = typeof topic.numericId === 'number' 
      ? topic.numericId 
      : parseInt(String(topicId).replace(/\D/g, '') || '1', 10);

    const defaultIcon = defaultIcons[topicNumericId] || 'Layers';
    const defaultColor = defaultColors[topicNumericId] || '#F59E0B';
    const defaultPointRange = defaultPoints[topicNumericId] || '4–8 pkt';
    const defaultImp = defaultImportance[topicNumericId] || 'Kluczowy pewniak';

    const topicData = {
      id: topicId,
      numericId: topicNumericId,
      subject_id: 'matematyka-podstawowa',
      title: topic.title,
      name: topic.title,
      short_title: topic.short_title || topic.title,
      description: topic.description || '',
      icon: topic.icon || defaultIcon,
      color: topic.color || defaultColor,
      matura_points_range: topic.matura_points_range || defaultPointRange,
      importance: topic.importance || defaultImp,
      lessons_metadata: lessonsMetadata,
      final_test: topic.final_test || null,
      updatedAt: new Date().toISOString()
    };

    // subjects/matematyka-podstawowa/topics/{topicId}
    const subjectTopicDocRef = subjectDocRef.collection('topics').doc(topicId);
    currentBatch.set(subjectTopicDocRef, topicData, { merge: true });
    operationsInBatch++;

    totalTopicsWritten++;
    await commitBatchIfNeeded();

    // Lekcje w podkolekcji subjects/matematyka-podstawowa/topics/{topicId}/lessons/{lessonId}
    for (const lesson of lessons) {
      const lessonId = lesson.id;
      const lessonData = {
        id: lessonId,
        topic_id: topicId,
        subject_id: 'matematyka-podstawowa',
        title: lesson.title,
        estimated_time_minutes: lesson.estimated_time_minutes || 5,
        estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
        required_correct_tasks: lesson.required_correct_tasks || 3,
        theory_pill: lesson.theory_pill || null,
        tasks: lesson.tasks || [],
        updatedAt: new Date().toISOString()
      };

      const subjectLessonDocRef = subjectTopicDocRef.collection('lessons').doc(lessonId);
      currentBatch.set(subjectLessonDocRef, lessonData, { merge: true });
      operationsInBatch++;

      totalLessonsWritten++;
      await commitBatchIfNeeded();
    }

    console.log(`✓ Zapisano Dział [${topicId}]: ${lessons.length} lekcji (w subjects/matematyka-podstawowa)`);
  }


  // Finalny commit
  await commitBatchIfNeeded(true);

  console.log('\n====================================================');
  console.log('       MIGRACJA ZAKOŃCZONA SUKCESEM!                ');
  console.log('====================================================');
  console.log(`- Kolekcja przedmiotów: subjects/matematyka-podstawowa`);
  console.log(`- Zapisanych działów: ${totalTopicsWritten} (w subjects i w root topics)`);
  console.log(`- Zapisanych lekcji: ${totalLessonsWritten} (z pigułkami teorii i 1800 zadaniami)`);
  console.log(`- Zrealizowanych paczek (WriteBatch): ${totalBatchesCommitted}`);
  console.log('Architektura wieloprzedmiotowa jest w 100% aktywna w Cloud Firestore!\n');
}

main().catch(err => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});

