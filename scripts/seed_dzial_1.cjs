'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env.FIRESTORE_PREFER_REST = 'true';
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const MATH_CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'jasne-7efe7';

async function main() {
  console.log('--- TARGETED SEEDING: DZIAŁ 1 (LICZBY RZECZYWISTE) ---');
  const serviceAccountPath = path.resolve(__dirname, '..', 'serviceAccountKey.json');
  if (!fs.existsSync(serviceAccountPath)) {
    console.error('Brak serviceAccountKey.json');
    process.exit(1);
  }

  const serviceAccount = require(serviceAccountPath);
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: PROJECT_ID
    });
  }

  const db = admin.firestore();
  const curriculum = JSON.parse(fs.readFileSync(MATH_CURRICULUM_PATH, 'utf8'));
  const dzial1 = curriculum.topics.find(t => t.id === 'dzial-1');
  if (!dzial1) {
    console.error('Nie znaleziono dzial-1 w curriculum_matematyka.json');
    process.exit(1);
  }

  console.log('Znaleziono Dział 1 z ' + dzial1.lessons.length + ' lekcjami.');
  
  const batch = db.batch();
  
  const lessonsMeta = dzial1.lessons.map((l, idx) => ({
    id: l.id,
    title: l.title,
    required_correct_tasks: l.required_correct_tasks || 4,
    required_points: l.required_points || 4,
    estimated_time_minutes: l.estimated_time_minutes || 5,
    estimated_time_formatted: l.estimated_time_formatted || '~5 min',
    tasks_count: l.tasks.length,
    order: idx + 1
  }));

  const topicData = {
    id: 'dzial-1',
    numericId: 1,
    title: dzial1.title,
    name: dzial1.title,
    short_title: dzial1.short_title || 'Liczby Rzeczywiste',
    description: dzial1.description || 'Fundament matury z matematyki: opanuj działania na potęgach, pierwiastkach, logarytmach, procentach oraz bezbłędne dowodzenie podzielności.',
    icon: dzial1.icon || 'Hash',
    color: dzial1.color || '#00E5FF',
    lessons_count: dzial1.lessons.length,
    tasks_count: dzial1.lessons.reduce((acc, l) => acc + l.tasks.length, 0),
    lessons_metadata: lessonsMeta,
    updatedAt: new Date().toISOString()
  };

  batch.set(db.collection('subjects').doc('matematyka-podstawowa').collection('topics').doc('dzial-1'), topicData, { merge: true });
  batch.set(db.collection('topics').doc('dzial-1'), topicData, { merge: true });

  for (const lesson of dzial1.lessons) {
    const lessonDocData = {
      id: lesson.id,
      topic_id: 'dzial-1',
      title: lesson.title,
      estimated_time_minutes: lesson.estimated_time_minutes || 5,
      estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
      required_correct_tasks: lesson.required_correct_tasks || 4,
      theory_pill: lesson.theory_pill,
      formula_sheet: lesson.formula_sheet || lesson.formulaSheet,
      formulaSheet: lesson.formulaSheet || lesson.formula_sheet,
      tasks: lesson.tasks,
      updatedAt: new Date().toISOString()
    };

    const subRef = db.collection('subjects').doc('matematyka-podstawowa').collection('topics').doc('dzial-1').collection('lessons').doc(lesson.id);
    const rootRef = db.collection('topics').doc('dzial-1').collection('lessons').doc(lesson.id);

    batch.set(subRef, lessonDocData, { merge: true });
    batch.set(rootRef, lessonDocData, { merge: true });
  }

  console.log('Zapisywanie batcha do Cloud Firestore...');
  await batch.commit();
  console.log('SUKCES: Dział 1 i wszystkie 15 lekcji zaktualizowane w Cloud Firestore!');
}

main().catch(err => {
  console.error('BŁĄD:', err);
  process.exit(1);
});
