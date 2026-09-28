const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const prod = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

const screenshotsDir = path.resolve(__dirname, '..', 'audit_screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function runMobileQA() {
  console.log('=== STARTING MOBILE QA AUDIT (390 x 844) ===');

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });

  const page = await context.newPage();

  async function loadLessonSession(topicId, lessonId, taskIdx = 0) {
    const topic = prod.topics.find(t => t.id === topicId);
    const lesson = topic.lessons.find(l => l.id === lessonId);
    const sessionState = {
      sessionId: `qa-audit-${lesson.id}-${Date.now()}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      tasks: lesson.tasks,
      currentQueueIndex: taskIdx,
      currentStep: 1, // 1 = task view
      theorySubStep: 0,
      selectedOption: null,
      openAnswerText: '',
      activeSeconds: 45,
      sessionMistakesCount: 0,
      correctAnswersCount: 0,
      timestamp: Date.now(),
      theoryPill: lesson.theoryPill,
      originTab: 'learn',
      required_correct_tasks: 5,
      correctlySolvedTaskIds: []
    };

    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
    await page.evaluate((state) => {
      localStorage.setItem('jasne_active_session_v1', JSON.stringify(state));
      localStorage.setItem('has_seen_onboarding', 'true');
      localStorage.setItem('onboarding_completed', 'true');
      localStorage.setItem('matura_quest_onboarding_completed', 'true');
      localStorage.setItem('matura_quest_onboarding_prefs', JSON.stringify({ targetScore: 80, weeklyHours: 5 }));
      localStorage.setItem('jasne_guest_promo_modal_seen', 'true');
    }, sessionState);

    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    // Remove onboarding overlay or guest promo modal if still mounted in DOM
    await page.evaluate(() => {
      const overlay = document.getElementById('onboarding-overlay');
      if (overlay) overlay.remove();
      document.querySelectorAll('[class*="z-[130]"]').forEach(el => el.remove());
    });
    await page.waitForTimeout(500);
  }

  try {
    // -------------------------------------------------------------
    // TEST 1: Dział 10 (Funkcja liniowa), lesson-10-1
    // Task 2: Matura sierpień 2024 • Zad. 10 (Algebraic, no drawing, blue badge)
    // -------------------------------------------------------------
    console.log('\n--- Testing Dział 10: lesson-10-1 Task 2 (Algebraic, CKE Badge) ---');
    await loadLessonSession('dzial-10', 'lesson-10-1', 1);

    const svgPlot = await page.$('.mafs-canvas, svg.mafs');
    console.log('Plot canvas in Dział 10 Task 2:', svgPlot ? 'FOUND (ERROR)' : 'NONE (CORRECT)');

    const badgeText = await page.$eval('[class*="border-sky-400"], [class*="text-sky-300"]', el => el.innerText.trim()).catch(() => 'NOT FOUND');
    console.log('Badge text in Dział 10 Task 2:', badgeText);

    await page.screenshot({ path: path.join(screenshotsDir, '01_dzial_10_task2_no_drawing_cke_badge.png') });
    console.log('Saved screenshot: 01_dzial_10_task2_no_drawing_cke_badge.png');

    // Click option A and check answer
    const optA = await page.$('#session-option-A');
    if (optA) {
      await optA.click();
      await page.waitForTimeout(400);
      const checkBtn = await page.$('#session-check-button');
      if (checkBtn) {
        await checkBtn.click();
        await page.waitForTimeout(1000);
      }
    }

    // Open explanation modal
    const explBtn = await page.$('button:has-text("Zobacz wyjaśnienie")');
    if (explBtn) {
      console.log('Clicking Zobacz wyjaśnienie...');
      await explBtn.click();
      await page.waitForTimeout(1000);
    }

    // Verify explanation modal has NO duplicate drawing from question
    const modalDuplicateDrawing = await page.$('.p-4.sm\\:p-5 text:has-text("Rysunek pomocniczy")');
    console.log('Duplicate drawing in explanation modal:', modalDuplicateDrawing ? 'FOUND (ERROR)' : 'NONE (CORRECT)');

    await page.screenshot({ path: path.join(screenshotsDir, '02_dzial_10_explanation_modal_clean.png') });
    console.log('Saved screenshot: 02_dzial_10_explanation_modal_clean.png');

    // -------------------------------------------------------------
    // TEST 2: Dział 12 (Funkcja kwadratowa), lesson-12-1
    // Task 1: Canonical vertex calculation (purely algebraic, NO drawing)
    // -------------------------------------------------------------
    console.log('\n--- Testing Dział 12: lesson-12-1 Task 1 (Algebraic vertex, NO drawing) ---');
    await loadLessonSession('dzial-12', 'lesson-12-1', 0);

    const svgPlot12 = await page.$('.mafs-canvas, svg.mafs');
    console.log('Plot canvas in Dział 12 Task 1:', svgPlot12 ? 'FOUND (ERROR)' : 'NONE (CORRECT)');
    await page.screenshot({ path: path.join(screenshotsDir, '03_dzial_12_task1_no_drawing.png') });
    console.log('Saved screenshot: 03_dzial_12_task1_no_drawing.png');

    // Click option B and check
    const optB12 = await page.$('#session-option-B');
    if (optB12) {
      await optB12.click();
      await page.waitForTimeout(400);
      const checkBtn12 = await page.$('#session-check-button');
      if (checkBtn12) {
        await checkBtn12.click();
        await page.waitForTimeout(1000);
      }
    }
    const explBtn12 = await page.$('button:has-text("Zobacz wyjaśnienie")');
    if (explBtn12) {
      await explBtn12.click();
      await page.waitForTimeout(1000);
    }
    await page.screenshot({ path: path.join(screenshotsDir, '04_dzial_12_explanation_modal_clean.png') });
    console.log('Saved screenshot: 04_dzial_12_explanation_modal_clean.png');

    // Task 3 in lesson-12-1: Authentic CKE graph reading task (WITH authentic parabola plot and sky badge)
    console.log('\n--- Testing Dział 12: lesson-12-1 Task 3 (Authentic CKE graph reading task) ---');
    await loadLessonSession('dzial-12', 'lesson-12-1', 2);

    const badgeText12 = await page.$eval('[class*="border-sky-400"], [class*="text-sky-300"]', el => el.innerText.trim()).catch(() => 'NOT FOUND');
    console.log('Badge text in Dział 12 Task 3:', badgeText12);
    const plotInTask3 = await page.$('.mt-3 svg, [data-testid="math-diagram"]');
    console.log('Authentic plot in Dział 12 Task 3:', plotInTask3 ? 'PRESENT (CORRECT)' : 'NOT FOUND');
    await page.screenshot({ path: path.join(screenshotsDir, '05_dzial_12_task3_cke_graph_badge.png') });
    console.log('Saved screenshot: 05_dzial_12_task3_cke_graph_badge.png');

    // -------------------------------------------------------------
    // TEST 3: Dział 9 (Własności funkcji), lesson-9-1
    // Task 3: Authentic CKE graph reading (WITH drawing & CKE badge)
    // -------------------------------------------------------------
    console.log('\n--- Testing Dział 9: lesson-9-1 Task 3 (Graph reading) ---');
    await loadLessonSession('dzial-9', 'lesson-9-1', 2);

    const badgeText9 = await page.$eval('[class*="border-sky-400"], [class*="text-sky-300"]', el => el.innerText.trim()).catch(() => 'NOT FOUND');
    console.log('Badge text in Dział 9 Task 3:', badgeText9);
    await page.screenshot({ path: path.join(screenshotsDir, '06_dzial_9_task3_graph_reading.png') });
    console.log('Saved screenshot: 06_dzial_9_task3_graph_reading.png');

    // -------------------------------------------------------------
    // TEST 4: Dział 18 (Stereometria), lesson-18-1
    // Task 4: Cuboid diagonal calculation from dimensions (NO drawing!)
    // -------------------------------------------------------------
    console.log('\n--- Testing Dział 18: lesson-18-1 Task 4 (Diagonal calculation, NO drawing) ---');
    await loadLessonSession('dzial-18', 'lesson-18-1', 3);

    const taskQuestionDiagram = await page.$('.mt-3 > svg, .mt-3 > div > svg, .mafs-canvas, svg.mafs');
    console.log('Question plot/diagram in Dział 18 Task 4:', taskQuestionDiagram ? 'FOUND (ERROR)' : 'NONE (CORRECT)');
    await page.screenshot({ path: path.join(screenshotsDir, '07_dzial_18_task4_stereometry_no_drawing.png') });
    console.log('Saved screenshot: 07_dzial_18_task4_stereometry_no_drawing.png');

    console.log('\n=== ALL BROWSER QA AUDIT CHECKS COMPLETED AND SCREENSHOTS CAPTURED ===');
  } catch (err) {
    console.error('QA audit failure:', err);
  } finally {
    await browser.close();
  }
}

runMobileQA();
