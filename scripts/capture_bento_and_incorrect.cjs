const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const prodMath = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));
const outDir = path.resolve(__dirname, '..', 'audit_screenshots', 'ui_ux_teardown');

async function captureTabsAndIncorrect() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  const topic = prodMath.topics[0];
  const lesson = topic.lessons[0];
  const session = {
    sessionId: `teardown-tabs-${Date.now()}`,
    topicId: topic.id,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    tasks: lesson.tasks,
    currentQueueIndex: 0,
    currentStep: 0, // theory
    theorySubStep: 0,
    selectedOption: null,
    openAnswerText: '',
    activeSeconds: 60,
    sessionMistakesCount: 0,
    correctAnswersCount: 0,
    timestamp: Date.now(),
    theoryPill: lesson.theoryPill,
    originTab: 'learn',
    required_correct_tasks: 5,
    correctlySolvedTaskIds: []
  };

  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.evaluate((sess) => {
    localStorage.setItem('has_seen_onboarding', 'true');
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('matura_quest_onboarding_completed', 'true');
    localStorage.setItem('jasne_active_session_v1', JSON.stringify(sess));
  }, session);
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);

  // Tab 1: Wzory
  const tabWzory = await page.$('button:has-text("Wzory")');
  if (tabWzory) {
    await tabWzory.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '07_bento_tab1_wzory_mobile_390.png') });
    console.log('Saved: 07_bento_tab1_wzory_mobile_390.png');
  }

  // Tab 2: Przykład
  const tabPrzyklad = await page.$('button:has-text("Przykład")');
  if (tabPrzyklad) {
    await tabPrzyklad.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '08_bento_tab2_przyklad_mobile_390.png') });
    console.log('Saved: 08_bento_tab2_przyklad_mobile_390.png');
  }

  // Tab 3: Typowy błąd
  const tabBlad = await page.$('button:has-text("Typowy błąd")');
  if (tabBlad) {
    await tabBlad.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '09_bento_tab3_pulapka_mobile_390.png') });
    console.log('Saved: 09_bento_tab3_pulapka_mobile_390.png');
  }

  // Now transition to Tasks and choose WRONG answer (Option C)
  const btnStartTasks = await page.$('#session-start-tasks-button');
  if (btnStartTasks) {
    await btnStartTasks.click();
    await page.waitForTimeout(800);
  }

  // Click Option C (wrong option for 2^3 * 2^4 = 2^7, option C is 4^7)
  const optC = await page.$('#session-option-C');
  if (optC) {
    await optC.click();
    await page.waitForTimeout(300);
    const checkBtn = await page.$('#session-check-button');
    if (checkBtn) {
      await checkBtn.click();
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(outDir, '11_task_checked_wrong_feedback_mobile_390.png') });
      console.log('Saved WRONG answer feedback: 11_task_checked_wrong_feedback_mobile_390.png');
    }
  }

  // Now open explanation modal for wrong answer
  const explBtn = await page.$('button:has-text("Zobacz wyjaśnienie")');
  if (explBtn) {
    await explBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, '12_task_explanation_modal_mobile_390.png') });
    console.log('Saved WRONG answer explanation modal: 12_task_explanation_modal_mobile_390.png');
  }

  await browser.close();
}

captureTabsAndIncorrect();
