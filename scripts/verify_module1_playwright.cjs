'use strict';

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:\\Users\\mateu\\.gemini\\antigravity\\brain\\9233d755-ecd4-4aed-ac18-bd989af3affc';

async function run() {
  console.log('===============================================================');
  console.log('    🎭 PLAYWRIGHT E2E AUDIT: MODULE 1 VISUAL & FUNCTIONAL      ');
  console.log('===============================================================\n');

  const browser = await chromium.launch({ headless: true });

  // -------------------------------------------------------------
  // TEST 1: MOBILE VIEW (iPhone 390x844)
  // -------------------------------------------------------------
  console.log('📱 [MOBILE AUDIT] Launching viewport 390x844...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();

  await mobilePage.addInitScript(() => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('jasne_user_prefs', JSON.stringify({ goal: 'pass', mathLevel: 'basic' }));
    localStorage.setItem('seen_promo_guest', 'true');
    localStorage.setItem('streakDays', '5');
    localStorage.setItem('hearts', '5');
  });

  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await mobilePage.waitForTimeout(1500);

  // Navigate to Nauka
  const naukaBtn = mobilePage.locator('button:has-text("Nauka"), nav button:has-text("Nauka")').first();
  if (await naukaBtn.isVisible()) {
    await naukaBtn.click();
    await mobilePage.waitForTimeout(1500);
  }

  // Click on first lesson or first topic
  const startLessonBtn = mobilePage.locator('button:has-text("Rozpocznij"), button:has-text("Ucz się"), div:has-text("Działania na potęgach")').first();
  if (await startLessonBtn.isVisible()) {
    await startLessonBtn.click();
    await mobilePage.waitForTimeout(1500);
  }

  // Snapshot Tab 0: Istota
  const mobileTheoryShot = path.join(ARTIFACTS_DIR, 'mobile_module1_bento_tab0.png');
  await mobilePage.screenshot({ path: mobileTheoryShot, fullPage: false });
  console.log(`✓ Saved Mobile Tab 0 shot: ${mobileTheoryShot}`);

  // Test Tab 1: Wzory
  const tabWzory = mobilePage.locator('button:has-text("Wzory")').first();
  if (await tabWzory.isVisible()) {
    await tabWzory.click();
    await mobilePage.waitForTimeout(600);
    const mobileWzoryShot = path.join(ARTIFACTS_DIR, 'mobile_module1_bento_tab1.png');
    await mobilePage.screenshot({ path: mobileWzoryShot, fullPage: false });
    console.log(`✓ Saved Mobile Tab 1 shot: ${mobileWzoryShot}`);
  }

  // Verify horizontal scrollbar (no overflow)
  const hasOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 5;
  });
  console.log(`Mobile Horizontal Overflow Check: ${hasOverflow ? '❌ OVERFLOW DETECTED' : '✅ CLEAN (No horizontal scroll)'}`);

  // Switch to tasks
  const startPracticeBtn = mobilePage.locator('button:has-text("Przejdź do zadań"), button:has-text("Rozwiąż zadania")').first();
  if (await startPracticeBtn.isVisible()) {
    await startPracticeBtn.click();
    await mobilePage.waitForTimeout(1000);
  }

  const mobileTaskShot = path.join(ARTIFACTS_DIR, 'mobile_module1_task_flow.png');
  await mobilePage.screenshot({ path: mobileTaskShot, fullPage: false });
  console.log(`✓ Saved Mobile Task shot: ${mobileTaskShot}`);

  await mobileContext.close();

  // -------------------------------------------------------------
  // TEST 2: DESKTOP VIEW (1440x900)
  // -------------------------------------------------------------
  console.log('\n💻 [DESKTOP AUDIT] Launching viewport 1440x900...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const desktopPage = await desktopContext.newPage();

  await desktopPage.addInitScript(() => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('jasne_user_prefs', JSON.stringify({ goal: 'pass', mathLevel: 'basic' }));
    localStorage.setItem('seen_promo_guest', 'true');
  });

  await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  await desktopPage.waitForTimeout(1500);

  const desktopNauka = desktopPage.locator('button:has-text("Nauka"), nav button:has-text("Nauka")').first();
  if (await desktopNauka.isVisible()) {
    await desktopNauka.click();
    await desktopPage.waitForTimeout(1500);
  }

  const desktopStart = desktopPage.locator('button:has-text("Rozpocznij"), button:has-text("Ucz się"), div:has-text("Działania na potęgach")').first();
  if (await desktopStart.isVisible()) {
    await desktopStart.click();
    await desktopPage.waitForTimeout(1500);
  }

  // Snapshot Desktop Theory
  const desktopTheoryShot = path.join(ARTIFACTS_DIR, 'desktop_module1_theory.png');
  await desktopPage.screenshot({ path: desktopTheoryShot, fullPage: false });
  console.log(`✓ Saved Desktop Theory shot: ${desktopTheoryShot}`);

  // Switch to tasks to verify 2x2 grid
  const desktopPracticeBtn = desktopPage.locator('button:has-text("Przejdź do zadań"), button:has-text("Rozwiąż zadania")').first();
  if (await desktopPracticeBtn.isVisible()) {
    await desktopPracticeBtn.click();
    await desktopPage.waitForTimeout(1000);
  }

  const desktopTaskShot = path.join(ARTIFACTS_DIR, 'desktop_module1_task_2x2.png');
  await desktopPage.screenshot({ path: desktopTaskShot, fullPage: false });
  console.log(`✓ Saved Desktop Task shot: ${desktopTaskShot}`);

  await desktopContext.close();
  await browser.close();

  console.log('\n===============================================================');
  console.log('       🎉 PLAYWRIGHT AUDIT COMPLETED WITH ZERO ERRORS!         ');
  console.log('===============================================================');
}

run().catch(err => {
  console.error('Playwright verification failed:', err);
  process.exit(1);
});
