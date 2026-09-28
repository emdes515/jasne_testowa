const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const prodMath = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));
const outDir = path.resolve(__dirname, '..', 'audit_screenshots', 'ui_ux_teardown');

async function captureBentoTabs() {
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
    sessionId: `teardown-bento-${Date.now()}`,
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
    localStorage.removeItem('jasne_guest_promo_modal_seen');
  }, session);
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);

  // Tab 1: Wzory
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('#session-theory-pill-content button');
    if (tabs && tabs[1]) tabs[1].click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '07_bento_tab1_wzory_mobile_390.png') });
  console.log('Saved real Tab 1: 07_bento_tab1_wzory_mobile_390.png');

  // Tab 2: Przykład
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('#session-theory-pill-content button');
    if (tabs && tabs[2]) tabs[2].click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '08_bento_tab2_przyklad_mobile_390.png') });
  console.log('Saved real Tab 2: 08_bento_tab2_przyklad_mobile_390.png');

  // Tab 3: Typowy błąd
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('#session-theory-pill-content button');
    if (tabs && tabs[3]) tabs[3].click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '09_bento_tab3_pulapka_mobile_390.png') });
  console.log('Saved real Tab 3: 09_bento_tab3_pulapka_mobile_390.png');

  // Transition to tasks: choose WRONG option B (2^12)
  await page.evaluate(() => {
    const btn = document.getElementById('session-start-tasks-button');
    if (btn) btn.click();
  });
  await page.waitForTimeout(800);

  // Click option B
  await page.evaluate(() => {
    const optB = document.getElementById('session-option-B');
    if (optB) optB.click();
  });
  await page.waitForTimeout(300);

  // Check answer
  await page.evaluate(() => {
    const checkBtn = document.getElementById('session-check-button');
    if (checkBtn) checkBtn.click();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, '11_task_checked_wrong_feedback_mobile_390.png') });
  console.log('Saved wrong feedback: 11_task_checked_wrong_feedback_mobile_390.png');

  // Open explanation drawer
  await page.evaluate(() => {
    const explBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Zobacz wyjaśnienie'));
    if (explBtn) explBtn.click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '12_task_explanation_modal_mobile_390.png') });
  console.log('Saved explanation drawer: 12_task_explanation_modal_mobile_390.png');

  await browser.close();
}

captureBentoTabs();
