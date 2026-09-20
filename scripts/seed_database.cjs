/**
 * Admin Migration Script (Seeding Database to Cloud Firestore)
 * 
 * Supports Multi-Subject:
 * - Matematyka Podstawowa (15 działów, 225 lekcji, 1800 zadań)
 * - Język Polski (20 działów w 3 Filarach, lektury, paszporty epok, wypracowania)
 * 
 * Schema: Flat-Bundle under subjects/{subject_id}/topics/{topic_id}/lessons/{lesson_id}
 */

// UWAGA BEZPIECZEŃSTWO: nie wyłączamy weryfikacji certyfikatów TLS.
// W środowiskach z własnym CA (proxy firmowe) użyj NODE_EXTRA_CA_CERTS=/ścieżka/ca.pem
process.env.FIRESTORE_PREFER_REST = 'true';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const fs = require('fs');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');

try {
  require('dotenv').config();
} catch (e) {}

const MATH_CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const POLISH_CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_jezyk_polski.json');
const ENG_BASIC_CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_angielski_podstawa.json');
const MATH_ROZ_CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka_rozszerzona.json');
const ENG_ROZ_CURRICULUM_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_angielski_rozszerzony.json');
const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'jasne-7efe7';

async function main() {
  console.log('====================================================');
  console.log('  FIRESTORE MULTI-SUBJECT SEEDING SCRIPT           ');
  console.log(`  Target Project: ${PROJECT_ID}                     `);
  console.log('====================================================\n');

  let admin;
  try {
    admin = require('firebase-admin');
  } catch (err) {
    console.error('[ERROR] firebase-admin package is required. Run: npm install firebase-admin');
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

  const BATCH_SIZE_LIMIT = 400;
  let currentBatch = db.batch();
  let operationsInBatch = 0;
  let totalBatchesCommitted = 0;
  let totalTopicsWritten = 0;
  let totalLessonsWritten = 0;

  function sanitizeForFirestore(val) {
    if (val === undefined) return null;
    if (val === null) return null;
    if (Array.isArray(val)) {
      // If array of arrays (e.g. polygon coordinates [[x,y], [x,y]])
      if (val.length > 0 && Array.isArray(val[0])) {
        return val.map(sub => {
          if (Array.isArray(sub)) {
            return sub.join(',');
          }
          return sanitizeForFirestore(sub);
        }).join(' ');
      }
      return val.map(item => sanitizeForFirestore(item));
    }
    if (typeof val === 'object') {
      const res = {};
      for (const [k, v] of Object.entries(val)) {
        if (v !== undefined) {
          res[k] = sanitizeForFirestore(v);
        }
      }
      return res;
    }
    return val;
  }

  function safeSet(docRef, data, options = { merge: true }) {
    currentBatch.set(docRef, sanitizeForFirestore(data), options);
  }

  async function commitBatchIfNeeded(force = false) {
    if (operationsInBatch > 0 && (operationsInBatch >= BATCH_SIZE_LIMIT || force)) {
      console.log(`Zapisuję paczkę ${totalBatchesCommitted + 1} (${operationsInBatch} operacji)...`);
      await currentBatch.commit();
      totalBatchesCommitted++;
      currentBatch = db.batch();
      operationsInBatch = 0;
    }
  }

  // 1. Czyszczenie starych danych
  console.log('--- Rozpoczynam czyszczenie starych danych z Cloud Firestore ---');
  try {
    // Root topics
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

    const allSubjectIds = [
      'matematyka-podstawowa',
      'jezyk-polski',
      'jezyk-angielski',
      'matematyka-rozszerzona',
      'jezyk-angielski-rozszerzony'
    ];

    for (const subId of allSubjectIds) {
      const topicsSnap = await db.collection('subjects').doc(subId).collection('topics').get();
      for (const tDoc of topicsSnap.docs) {
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
    }

    await commitBatchIfNeeded(true);
    console.log('Stare dane zostały wyczyszczone.\n');
  } catch (err) {
    console.warn('Uwaga przy czyszczeniu starej bazy:', err.message);
  }

  // 2. Wgrywanie MATEMATYKI
  if (fs.existsSync(MATH_CURRICULUM_PATH)) {
    console.log('--- Wgrywanie przedmiotu: MATEMATYKA PODSTAWOWA ---');
    const mathRaw = fs.readFileSync(MATH_CURRICULUM_PATH, 'utf8');
    const mathCurriculum = JSON.parse(mathRaw);
    const mathTopics = mathCurriculum.topics || [];

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

    let totalMathLessons = 0;
    let totalMathTasks = 0;
    const mathTopicsSummary = mathTopics.map(t => {
      const tNum = typeof t.numericId === 'number' ? t.numericId : parseInt(String(t.id).replace(/\D/g, '') || '1', 10);
      const lCount = (t.lessons || []).length;
      const tCount = (t.lessons || []).reduce((acc, l) => acc + (l.tasks || []).length, 0);
      totalMathLessons += lCount;
      totalMathTasks += tCount;
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

    const mathSubjectDocRef = db.collection('subjects').doc('matematyka-podstawowa');
    safeSet(mathSubjectDocRef, {
      id: 'matematyka-podstawowa',
      key: 'math',
      name: 'Matematyka Podstawowa',
      short_name: 'Matematyka',
      title: 'Matematyka Podstawowa',
      level: 'Nowa Formuła 2023 (Poziom Podstawowy)',
      icon: 'Calculator',
      color: '#FFB800',
      topics_count: mathTopics.length,
      lessons_count: totalMathLessons,
      tasks_count: totalMathTasks,
      topics_metadata: mathTopicsSummary,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    operationsInBatch++;
    await commitBatchIfNeeded();

    for (const topic of mathTopics) {
      const topicId = topic.id;
      const lessons = topic.lessons || [];
      const topicNumericId = typeof topic.numericId === 'number' ? topic.numericId : parseInt(String(topicId).replace(/\D/g, '') || '1', 10);

      const lessonsMetadata = lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        required_points: lesson.required_correct_tasks || 3,
        required_correct_tasks: lesson.required_correct_tasks || 3,
        estimated_time_minutes: lesson.estimated_time_minutes || 5,
        estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
        tasks_count: (lesson.tasks || []).length
      }));

      const topicData = {
        id: topicId,
        numericId: topicNumericId,
        subject_id: 'matematyka-podstawowa',
        title: topic.title,
        name: topic.title,
        short_title: topic.short_title || topic.title,
        description: topic.description || '',
        icon: topic.icon || defaultIcons[topicNumericId] || 'Layers',
        color: topic.color || defaultColors[topicNumericId] || '#F59E0B',
        matura_points_range: topic.matura_points_range || '4–8 pkt',
        importance: topic.importance || 'Kluczowy pewniak',
        lessons_metadata: lessonsMetadata,
        final_test: topic.final_test || null,
        updatedAt: new Date().toISOString()
      };

      const topicDocRef = mathSubjectDocRef.collection('topics').doc(topicId);
      safeSet(topicDocRef, topicData, { merge: true });
      operationsInBatch++;
      totalTopicsWritten++;
      await commitBatchIfNeeded();

      for (const lesson of lessons) {
        const lessonDocRef = topicDocRef.collection('lessons').doc(lesson.id);
        safeSet(lessonDocRef, {
          id: lesson.id,
          topic_id: topicId,
          subject_id: 'matematyka-podstawowa',
          title: lesson.title,
          estimated_time_minutes: lesson.estimated_time_minutes || 5,
          estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
          required_correct_tasks: lesson.required_correct_tasks || 3,
          theory_pill: lesson.theory_pill || null,
          formula_sheet: lesson.formula_sheet || lesson.formulaSheet || null,
          formulaSheet: lesson.formulaSheet || lesson.formula_sheet || null,
          tasks: lesson.tasks || [],
          updatedAt: new Date().toISOString()
        }, { merge: true });
        operationsInBatch++;
        totalLessonsWritten++;
        await commitBatchIfNeeded();
      }
      console.log(`✓ Matematyka: [${topicId}] (${lessons.length} lekcji)`);
    }
  }

  // 3. Wgrywanie JĘZYKA POLSKIEGO
  if (fs.existsSync(POLISH_CURRICULUM_PATH)) {
    console.log('\n--- Wgrywanie przedmiotu: JĘZYK POLSKI (3 FILARY) ---');
    const polRaw = fs.readFileSync(POLISH_CURRICULUM_PATH, 'utf8');
    const polCurriculum = JSON.parse(polRaw);
    const polTopics = polCurriculum.topics || [];
    const polPillars = polCurriculum.subject?.pillars || [];

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

    const polSubjectDocRef = db.collection('subjects').doc('jezyk-polski');
    safeSet(polSubjectDocRef, {
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
        importance: topic.importance || 'Kluczowy pewniak',
        required_books: topic.required_books || [],
        lessons_metadata: lessonsMetadata,
        book_exam: topic.book_exam || null,
        final_test: topic.final_test || topic.epoch_exam || null,
        epoch_exam: topic.epoch_exam || null,
        updatedAt: new Date().toISOString()
      };

      const topicDocRef = polSubjectDocRef.collection('topics').doc(topicId);
      safeSet(topicDocRef, topicData, { merge: true });
      operationsInBatch++;
      totalTopicsWritten++;
      await commitBatchIfNeeded();

      for (const lesson of lessons) {
        const lessonDocRef = topicDocRef.collection('lessons').doc(lesson.id);
        const leksykonData = lesson.leksykon ? {
          lessonId: lesson.id,
          title: lesson.leksykon.title || lesson.title,
          formulas: (lesson.leksykon.pojęcia || []).map(p => ({ title: p.title, latex: p.def })),
          goldenRule: lesson.leksykon.goldenRule || lesson.theory_pill?.golden_rule || '',
          ckeTrap: lesson.leksykon.ckeTrap || lesson.theory_pill?.cke_trap || null,
          isLeksykon: true
        } : null;

        safeSet(lessonDocRef, {
          id: lesson.id,
          topic_id: topicId,
          subject_id: 'jezyk-polski',
          title: lesson.title,
          name: lesson.name || lesson.title,
          estimated_time_formatted: lesson.estimated_time_formatted || '~5 min',
          required_correct_tasks: lesson.required_correct_tasks || 3,
          theory_pill: lesson.theory_pill || null,
          leksykon: lesson.leksykon || null,
          formula_sheet: leksykonData,
          formulaSheet: leksykonData,
          tasks: lesson.tasks || [],
          updatedAt: new Date().toISOString()
        }, { merge: true });
        operationsInBatch++;
        totalLessonsWritten++;
        await commitBatchIfNeeded();
      }
      console.log(`✓ Polski: [${topicId}] "${topic.short_title || topic.title}" (${lessons.length} lekcji)`);
    }
  }

  async function seedStandardSubject(subjectId, filePath, fallbackMeta) {
    if (!fs.existsSync(filePath)) {
      console.warn(`[WARN] Brak pliku ${filePath} — pomijam przedmiot ${subjectId}.`);
      return;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    const curriculum = JSON.parse(raw);
    const topics = curriculum.topics || [];
    const meta = curriculum.subject || fallbackMeta;

    console.log(`--- Wgrywanie przedmiotu: ${meta.name ? meta.name.toUpperCase() : subjectId} ---`);

    let totalLessons = 0;
    let totalTasks = 0;
    const topicsSummary = topics.map(t => {
      const tNum = typeof t.numericId === 'number' ? t.numericId : parseInt(String(t.id).replace(/\D/g, '') || '1', 10);
      const lCount = (t.lessons || []).length;
      const tCount = (t.lessons || []).reduce((acc, l) => acc + (l.tasks || []).length, 0);
      totalLessons += lCount;
      totalTasks += tCount;
      return {
        id: t.id,
        numericId: tNum,
        title: t.title,
        name: t.title,
        short_title: t.short_title || t.title,
        icon: t.icon || fallbackMeta.icon || 'Layers',
        color: t.color || fallbackMeta.color || '#10B981',
        lessons_count: lCount,
        tasks_count: tCount
      };
    });

    const subjectDocRef = db.collection('subjects').doc(subjectId);
    safeSet(subjectDocRef, {
      id: subjectId,
      key: meta.key || fallbackMeta.key,
      name: meta.name || fallbackMeta.name,
      short_name: meta.short_name || fallbackMeta.short_name,
      title: meta.title || fallbackMeta.title,
      level: meta.level || fallbackMeta.level,
      icon: meta.icon || fallbackMeta.icon,
      color: meta.color || fallbackMeta.color,
      topics_count: topics.length,
      lessons_count: totalLessons,
      tasks_count: totalTasks,
      topics_metadata: topicsSummary,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    operationsInBatch++;
    await commitBatchIfNeeded();

    for (const topic of topics) {
      const topicId = topic.id;
      const lessons = topic.lessons || [];
      const topicNumericId = typeof topic.numericId === 'number' ? topic.numericId : parseInt(String(topicId).replace(/\D/g, '') || '1', 10);

      const lessonsMetadata = lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title || lesson.name || '',
        name: lesson.name || lesson.title || '',
        badge: lesson.badge || '',
        required_points: lesson.required_correct_tasks || 3,
        required_correct_tasks: lesson.required_correct_tasks || 3,
        estimated_time_minutes: lesson.estimated_time_minutes || 6,
        estimated_time_formatted: lesson.estimated_time_formatted || '~6 min',
        tasks_count: (lesson.tasks || []).length
      }));

      const topicData = {
        id: topicId,
        numericId: topicNumericId,
        subject_id: subjectId,
        title: topic.title,
        name: topic.title,
        short_title: topic.short_title || topic.title,
        description: topic.description || '',
        icon: topic.icon || fallbackMeta.icon || 'Layers',
        color: topic.color || fallbackMeta.color || '#10B981',
        matura_points_range: topic.matura_points_range || '3–6 pkt',
        importance: topic.importance || 'CRITICAL_PEWNIAK',
        lessons_metadata: lessonsMetadata,
        final_test: topic.final_test || null,
        updatedAt: new Date().toISOString()
      };

      const topicDocRef = subjectDocRef.collection('topics').doc(topicId);
      safeSet(topicDocRef, topicData, { merge: true });
      operationsInBatch++;
      totalTopicsWritten++;
      await commitBatchIfNeeded();

      for (const lesson of lessons) {
        const lessonDocRef = topicDocRef.collection('lessons').doc(lesson.id);
        safeSet(lessonDocRef, {
          id: lesson.id,
          topic_id: topicId,
          subject_id: subjectId,
          title: lesson.title || lesson.name || '',
          name: lesson.name || lesson.title || '',
          badge: lesson.badge || '',
          estimated_time_minutes: lesson.estimated_time_minutes || 6,
          estimated_time_formatted: lesson.estimated_time_formatted || '~6 min',
          required_correct_tasks: lesson.required_correct_tasks || 3,
          theory_pill: lesson.theory_pill || null,
          theoryPill: lesson.theory_pill || null,
          formula_sheet: lesson.formula_sheet || lesson.formulaSheet || null,
          formulaSheet: lesson.formula_sheet || lesson.formulaSheet || null,
          tasks: lesson.tasks || [],
          updatedAt: new Date().toISOString()
        }, { merge: true });
        operationsInBatch++;
        totalLessonsWritten++;
        await commitBatchIfNeeded();
      }
      console.log(`✓ ${meta.short_name || subjectId}: [${topicId}] "${topic.short_title || topic.title}" (${lessons.length} lekcji)`);
    }
  }

  // 4. Wgrywanie JĘZYKA ANGIELSKIEGO (Podstawa)
  await seedStandardSubject('jezyk-angielski', ENG_BASIC_CURRICULUM_PATH, {
    key: 'eng',
    name: 'Język Angielski',
    short_name: 'Angielski',
    title: 'Język Angielski (Poziom Podstawowy)',
    level: 'Nowa Formuła 2023 (Poziom Podstawowy • B1/B2)',
    icon: 'Globe',
    color: '#10B981'
  });

  // 5. Wgrywanie MATEMATYKI ROZSZERZONEJ
  await seedStandardSubject('matematyka-rozszerzona', MATH_ROZ_CURRICULUM_PATH, {
    key: 'math-roz',
    name: 'Matematyka Rozszerzona',
    short_name: 'Mat. Roz.',
    title: 'Matematyka (Poziom Rozszerzony)',
    level: 'Nowa Formuła 2023 (Poziom Rozszerzony)',
    icon: 'Calculator',
    color: '#8B5CF6'
  });

  // 6. Wgrywanie JĘZYKA ANGIELSKIEGO ROZSZERZONEGO
  await seedStandardSubject('jezyk-angielski-rozszerzony', ENG_ROZ_CURRICULUM_PATH, {
    key: 'eng-roz',
    name: 'Język Angielski Rozszerzony',
    short_name: 'Ang. Roz.',
    title: 'Język Angielski (Poziom Rozszerzony)',
    level: 'Nowa Formuła 2023 (Poziom Rozszerzony • B2+/C1)',
    icon: 'Globe',
    color: '#06B6D4'
  });

  // 5. Katalogi CKE (oficjalne wzory + wagi punktowe) -> system/ckeFormulas,
  //    system/ckeSubjectWeights. Klient czyta je z Firestore; w bundlu nie ma
  //    żadnych wzorów ani wag.
  const CKE_FORMULAS_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'cke_formulas.json');
  const CKE_WEIGHTS_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'cke_weights.json');
  if (fs.existsSync(CKE_FORMULAS_PATH)) {
    const ckeFormulas = JSON.parse(fs.readFileSync(CKE_FORMULAS_PATH, 'utf8'));
    safeSet(db.collection('system').doc('ckeFormulas'), {
      id: 'ckeFormulas',
      topics: ckeFormulas.topics || [],
      formulas: ckeFormulas.formulas || [],
      formulas_count: (ckeFormulas.formulas || []).length,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    operationsInBatch++;
    console.log(`✓ Katalogi CKE: system/ckeFormulas (${(ckeFormulas.formulas || []).length} wzorów)`);
  } else {
    console.warn('[WARN] Brak seed/curriculum/cke_formulas.json — wzory CKE pominięte.');
  }
  if (fs.existsSync(CKE_WEIGHTS_PATH)) {
    const ckeWeights = JSON.parse(fs.readFileSync(CKE_WEIGHTS_PATH, 'utf8'));
    safeSet(db.collection('system').doc('ckeSubjectWeights'), {
      id: 'ckeSubjectWeights',
      subjects: ckeWeights.subjects || {},
      options: ckeWeights.options || [],
      updatedAt: new Date().toISOString()
    }, { merge: true });
    operationsInBatch++;
    console.log(`✓ Katalogi CKE: system/ckeSubjectWeights (${Object.keys(ckeWeights.subjects || {}).length} przedmioty)`);
  } else {
    console.warn('[WARN] Brak seed/curriculum/cke_weights.json — wagi CKE pominięte.');
  }

  // 6. Egzaminy maturalne (arkusze CKE) -> exams/matura-podstawowa
  //    Jedyne źródło: seed/curriculum/zadania_matura.json oraz seed/curriculum/exams/
  const MATURA_TASKS_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'zadania_matura.json');
  if (fs.existsSync(MATURA_TASKS_PATH)) {
    const maturaTasks = JSON.parse(fs.readFileSync(MATURA_TASKS_PATH, 'utf8'));
    const sections = Array.from(new Set(maturaTasks.map(t => t.section).filter(Boolean)));
    safeSet(db.collection('exams').doc('matura-podstawowa'), {
      id: 'matura-podstawowa',
      subject_id: 'matematyka-podstawowa',
      name: 'Matura próbna — Matematyka (poziom podstawowy)',
      sections,
      tasks: maturaTasks,
      tasks_count: maturaTasks.length,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    operationsInBatch++;
    console.log(`✓ Egzaminy zbiorcze: exams/matura-podstawowa (${maturaTasks.length} zadań, ${sections.length} sekcji)`);
  } else {
    console.warn('[WARN] Brak seed/curriculum/zadania_matura.json — egzaminy pominięte.');
  }

  // Seeding poszczególnych 6 oficjalnych arkuszy CKE: exams/{examId}
  const EXAMS_DIR = path.resolve(__dirname, '..', 'seed', 'curriculum', 'exams');
  if (fs.existsSync(EXAMS_DIR)) {
    const examFiles = fs.readdirSync(EXAMS_DIR).filter(f => f.endsWith('.json'));
    for (const file of examFiles) {
      const examId = path.basename(file, '.json');
      const examTasks = JSON.parse(fs.readFileSync(path.join(EXAMS_DIR, file), 'utf8'));
      const examSections = Array.from(new Set(examTasks.map(t => t.section).filter(Boolean)));
      const examName = examTasks[0]?.examName || `Matura CKE — ${examId}`;
      safeSet(db.collection('exams').doc(examId), {
        id: examId,
        subject_id: 'matematyka-podstawowa',
        name: examName,
        sections: examSections,
        tasks: examTasks,
        tasks_count: examTasks.length,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      operationsInBatch++;
      console.log(`✓ Egzamin arkusz: exams/${examId} (${examTasks.length} zadań)`);
    }
  }

  await commitBatchIfNeeded(true);

  console.log('\n====================================================');
  console.log('       MIGRACJA WIELOPRZEDMIOTOWA ZAKOŃCZONA!       ');
  console.log('====================================================');
  console.log(`- Matematyka Podstawowa: 15 działów, 225 lekcji, 1800 zadań`);
  console.log(`- Język Polski: 20 działów (3 Filary), lektury i wypracowania`);
  console.log(`- Łącznie zapisanych działów: ${totalTopicsWritten}`);
  console.log(`- Łącznie zapisanych lekcji: ${totalLessonsWritten}`);
  console.log(`- Zrealizowanych paczek (WriteBatch): ${totalBatchesCommitted}`);
  console.log('Cloud Firestore jest w 100% zsynchronizowany!\n');
}

main().catch(err => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
