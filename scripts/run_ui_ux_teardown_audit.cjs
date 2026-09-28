const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const prodMath = JSON.parse(fs.readFileSync('seed/curriculum/curriculum_matematyka.json', 'utf8'));

const outDir = path.resolve(__dirname, '..', 'audit_screenshots', 'ui_ux_teardown');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function runAudit() {
  console.log('=== STARTING BRUTAL UI/UX CRAFTSMANSHIP TEARDOWN AUDIT ===');

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  // 1. Mobile context (iPhone 14/15 Pro: 390x844, DPR 3, touch)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });

  // 2. Desktop context (1440x900, DPR 2)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    isMobile: false,
    hasTouch: false
  });

  const mobPage = await mobileContext.newPage();
  const deskPage = await desktopContext.newPage();

  async function setupLocalStorage(page, extra = {}) {
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
    await page.evaluate((extraData) => {
      localStorage.setItem('has_seen_onboarding', 'true');
      localStorage.setItem('onboarding_completed', 'true');
      localStorage.setItem('matura_quest_onboarding_completed', 'true');
      localStorage.setItem('matura_quest_onboarding_prefs', JSON.stringify({ targetScore: 85, weeklyHours: 6 }));
      localStorage.setItem('jasne_guest_promo_modal_seen', 'true');
      localStorage.setItem('jasne_promo_banner_dismissed_until', String(Date.now() + 86400000));
      
      const defaultUser = {
        uid: 'audit-user-001',
        coins: 450,
        hearts: 5,
        maxHearts: 5,
        level: 4,
        xp: 3420,
        streakDays: 14,
        lastStreakDate: new Date().toISOString().split('T')[0],
        streakActiveDates: [new Date().toISOString().split('T')[0]],
        streakFreezes: 2,
        isPro: false,
        completed_lessons: ['dzial-1/lesson-1-1'],
        completedTasks: ['LESSON-lesson-1-1', 'task_dzial1_01'],
        dailyTaskCounts: { [new Date().toISOString().split('T')[0]]: 3 },
        weeklyTimeSpentMinutes: 85,
        timeSpentTotalSeconds: 5100,
        maturaBestScore: 78
      };
      localStorage.setItem('matura_quest_user_state', JSON.stringify({ ...defaultUser, ...extraData.userState }));
      localStorage.setItem('matura_quest_selected_subject', extraData.subject || 'math');
      if (extraData.session) {
        localStorage.setItem('jasne_active_session_v1', JSON.stringify(extraData.session));
      } else {
        localStorage.removeItem('jasne_active_session_v1');
      }
    }, extra);
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1200);
    // Dismiss any modals / promo overlays
    await page.evaluate(() => {
      const overlay = document.getElementById('onboarding-overlay');
      if (overlay) overlay.remove();
      document.querySelectorAll('[class*="z-[130]"], [class*="z-[120]"]').forEach(el => el.remove());
    });
    await page.waitForTimeout(500);
  }

  const auditTelemetry = {};

  try {
    // -------------------------------------------------------------
    // SHOT 1: Mobile Dashboard (390x844)
    // -------------------------------------------------------------
    console.log('Capturing: 01_dashboard_mobile_390.png');
    await setupLocalStorage(mobPage, { subject: 'math' });
    
    // Check horizontal scroll / overflow
    const mobOverflow = await mobPage.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const elementsWithOverflow = [];
      document.querySelectorAll('*').forEach(el => {
        if (el.scrollWidth > el.clientWidth + 2 && !['HTML', 'BODY', 'PRE', 'CODE'].includes(el.tagName)) {
          const style = window.getComputedStyle(el);
          if (style.overflowX !== 'auto' && style.overflowX !== 'scroll') {
            elementsWithOverflow.push({
              tag: el.tagName,
              id: el.id,
              className: (el.className || '').toString().slice(0, 80),
              scrollWidth: el.scrollWidth,
              clientWidth: el.clientWidth
            });
          }
        }
      });
      return {
        bodyScrollWidth: body.scrollWidth,
        bodyClientWidth: body.clientWidth,
        hasHorizontalScroll: body.scrollWidth > body.clientWidth,
        elementsWithOverflow: elementsWithOverflow.slice(0, 10)
      };
    });
    auditTelemetry.dashboardMobileOverflow = mobOverflow;

    await mobPage.screenshot({ path: path.join(outDir, '01_dashboard_mobile_390.png'), fullPage: false });

    // -------------------------------------------------------------
    // SHOT 2: Desktop Dashboard (1440x900)
    // -------------------------------------------------------------
    console.log('Capturing: 02_dashboard_desktop_1440.png');
    await setupLocalStorage(deskPage, { subject: 'math' });
    await deskPage.screenshot({ path: path.join(outDir, '02_dashboard_desktop_1440.png'), fullPage: false });

    // -------------------------------------------------------------
    // SHOT 3: Mobile Dashboard - Język Polski
    // -------------------------------------------------------------
    console.log('Capturing: 03_dashboard_polish_mobile_390.png');
    await setupLocalStorage(mobPage, { subject: 'pol' });
    await mobPage.waitForTimeout(500);
    await mobPage.screenshot({ path: path.join(outDir, '03_dashboard_polish_mobile_390.png'), fullPage: false });

    // -------------------------------------------------------------
    // SHOT 4: Mobile LearnView (Curriculum)
    // -------------------------------------------------------------
    console.log('Capturing: 04_learn_curriculum_mobile_390.png');
    await setupLocalStorage(mobPage, { subject: 'math' });
    const navNauka = await mobPage.$('#mobile-nav-nauka');
    if (navNauka) {
      await navNauka.click();
      await mobPage.waitForTimeout(1000);
    }
    await mobPage.screenshot({ path: path.join(outDir, '04_learn_curriculum_mobile_390.png'), fullPage: false });

    // Check safe area and bottom dock collision in LearnView
    const learnBottomMetrics = await mobPage.evaluate(() => {
      const dock = document.querySelector('nav[aria-label="Główna nawigacja mobilna"] > div');
      const content = document.getElementById('dashboard-scroll-content') || document.querySelector('main');
      const dockRect = dock ? dock.getBoundingClientRect() : null;
      return {
        dockVisible: Boolean(dock),
        dockHeight: dockRect ? dockRect.height : null,
        dockTop: dockRect ? dockRect.top : null,
        viewportHeight: window.innerHeight
      };
    });
    auditTelemetry.learnBottomMetrics = learnBottomMetrics;

    // -------------------------------------------------------------
    // SHOT 5: Mobile Polish Study Hub
    // -------------------------------------------------------------
    console.log('Capturing: 05_polish_study_hub_mobile_390.png');
    await setupLocalStorage(mobPage, { subject: 'pol' });
    const navNaukaPol = await mobPage.$('#mobile-nav-nauka');
    if (navNaukaPol) {
      await navNaukaPol.click();
      await mobPage.waitForTimeout(1000);
    }
    await mobPage.screenshot({ path: path.join(outDir, '05_polish_study_hub_mobile_390.png'), fullPage: false });

    // Helper for Bento / Task sessions
    async function loadSessionStep(page, topicId, lessonId, currentStep, theorySubStep, taskIndex = 0) {
      const topic = prodMath.topics.find(t => t.id === topicId) || prodMath.topics[0];
      const lesson = topic.lessons.find(l => l.id === lessonId) || topic.lessons[0];
      const session = {
        sessionId: `teardown-${lesson.id}-${Date.now()}`,
        topicId: topic.id,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        tasks: lesson.tasks,
        currentQueueIndex: taskIndex,
        currentStep: currentStep, // 0 = theory, 1 = task
        theorySubStep: theorySubStep,
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
      await setupLocalStorage(page, { subject: 'math', session });
    }

    // -------------------------------------------------------------
    // SHOTS 6-9: Bento Theory Tabs 0 - 3 (Mobile 390x844)
    // -------------------------------------------------------------
    console.log('Capturing: 06_bento_tab0_istota_mobile_390.png');
    await loadSessionStep(mobPage, 'dzial-1', 'lesson-1-1', 0, 0);
    await mobPage.screenshot({ path: path.join(outDir, '06_bento_tab0_istota_mobile_390.png'), fullPage: false });

    console.log('Capturing: 07_bento_tab1_wzory_mobile_390.png');
    await loadSessionStep(mobPage, 'dzial-1', 'lesson-1-1', 0, 1);
    // Check KaTeX formulas overflow on mobile
    const katexOverflowTab1 = await mobPage.evaluate(() => {
      const katexEls = document.querySelectorAll('.katex-display, .katex');
      const overflows = [];
      katexEls.forEach((el, idx) => {
        if (el.scrollWidth > el.clientWidth + 1) {
          overflows.push({
            index: idx,
            text: el.innerText.slice(0, 50),
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth
          });
        }
      });
      return overflows;
    });
    auditTelemetry.bentoTab1KatexOverflow = katexOverflowTab1;
    await mobPage.screenshot({ path: path.join(outDir, '07_bento_tab1_wzory_mobile_390.png'), fullPage: false });

    console.log('Capturing: 08_bento_tab2_przyklad_mobile_390.png');
    await loadSessionStep(mobPage, 'dzial-1', 'lesson-1-1', 0, 2);
    await mobPage.screenshot({ path: path.join(outDir, '08_bento_tab2_przyklad_mobile_390.png'), fullPage: false });

    console.log('Capturing: 09_bento_tab3_pulapka_mobile_390.png');
    await loadSessionStep(mobPage, 'dzial-1', 'lesson-1-1', 0, 3);
    await mobPage.screenshot({ path: path.join(outDir, '09_bento_tab3_pulapka_mobile_390.png'), fullPage: false });

    // -------------------------------------------------------------
    // SHOT 10: Task View (ABCD & CKE Badge)
    // -------------------------------------------------------------
    console.log('Capturing: 10_task_abcd_mobile_390.png');
    await loadSessionStep(mobPage, 'dzial-1', 'lesson-1-1', 1, 0, 0);
    await mobPage.screenshot({ path: path.join(outDir, '10_task_abcd_mobile_390.png'), fullPage: false });

    // -------------------------------------------------------------
    // SHOT 11: Task Evaluated Wrong Feedback Bar
    // -------------------------------------------------------------
    console.log('Capturing: 11_task_checked_wrong_feedback_mobile_390.png');
    // Select wrong option (e.g. option A or C) and check
    const optA = await mobPage.$('#session-option-A');
    if (optA) {
      await optA.click();
      await mobPage.waitForTimeout(300);
      const checkBtn = await mobPage.$('#session-check-button');
      if (checkBtn) {
        await checkBtn.click();
        await mobPage.waitForTimeout(800);
      }
    }
    await mobPage.screenshot({ path: path.join(outDir, '11_task_checked_wrong_feedback_mobile_390.png'), fullPage: false });

    // -------------------------------------------------------------
    // SHOT 12: Explanation Modal / Drawer
    // -------------------------------------------------------------
    console.log('Capturing: 12_task_explanation_modal_mobile_390.png');
    const explBtn = await mobPage.$('button:has-text("Zobacz wyjaśnienie")');
    if (explBtn) {
      await explBtn.click();
      await mobPage.waitForTimeout(600);
    }
    await mobPage.screenshot({ path: path.join(outDir, '12_task_explanation_modal_mobile_390.png'), fullPage: false });

    // -------------------------------------------------------------
    // SHOT 13: Open Task Workspace / Whiteboard (Mobile)
    // -------------------------------------------------------------
    console.log('Capturing: 13_task_open_whiteboard_mobile_390.png');
    // Find an open task (e.g. lesson-1-3 or dzial-1 open task)
    let openTopic = prodMath.topics.find(t => t.lessons.some(l => l.tasks.some(task => task.type === 'OPEN_SHORT' || task.type === 'OPEN_EXTENDED' || task.isOpen)));
    let openLesson = openTopic?.lessons.find(l => l.tasks.some(task => task.type === 'OPEN_SHORT' || task.type === 'OPEN_EXTENDED' || task.isOpen));
    let openTaskIdx = openLesson ? openLesson.tasks.findIndex(task => task.type === 'OPEN_SHORT' || task.type === 'OPEN_EXTENDED' || task.isOpen) : 0;
    
    if (openLesson) {
      await loadSessionStep(mobPage, openTopic.id, openLesson.id, 1, 0, openTaskIdx);
      await mobPage.waitForTimeout(600);
      // Click whiteboard/brudnopis button if present
      const scratchBtn = await mobPage.$('button:has-text("Brudnopis"), button[title*="brudnopis"], button[title*="Rysuj"]');
      if (scratchBtn) {
        await scratchBtn.click();
        await mobPage.waitForTimeout(600);
      }
    }
    await mobPage.screenshot({ path: path.join(outDir, '13_task_open_whiteboard_mobile_390.png'), fullPage: false });

    // -------------------------------------------------------------
    // SHOT 14: CKE Formulas Modal (Mobile)
    // -------------------------------------------------------------
    console.log('Capturing: 14_cke_formulas_modal_mobile_390.png');
    await setupLocalStorage(mobPage, { subject: 'math' });
    // Open formula modal via header or evaluate
    await mobPage.evaluate(() => {
      // Trigger header formulas button or trigger state
      const btn = document.querySelector('button[title="Tablice Wzorów CKE"]') || document.querySelector('button:has-text("Wzory")');
      if (btn) btn.click();
    });
    await mobPage.waitForTimeout(800);
    // If modal not open, let's open via clicking Wzory in desktop or triggering event
    const isFormulaModalVisible = await mobPage.$('#cke-formulas-list');
    if (!isFormulaModalVisible) {
      // open on desktop page
      await deskPage.evaluate(() => {
        const btn = document.querySelector('button[title="Tablice Wzorów CKE"]');
        if (btn) btn.click();
      });
      await deskPage.waitForTimeout(800);
      await deskPage.screenshot({ path: path.join(outDir, '14_cke_formulas_modal_desktop.png'), fullPage: false });
    } else {
      await mobPage.screenshot({ path: path.join(outDir, '14_cke_formulas_modal_mobile_390.png'), fullPage: false });
    }

    // -------------------------------------------------------------
    // SHOT 15: Matura Simulator View (Mobile)
    // -------------------------------------------------------------
    console.log('Capturing: 15_matura_simulator_mobile_390.png');
    await setupLocalStorage(mobPage, { subject: 'math' });
    const navSim = await mobPage.$('#mobile-nav-simulator');
    if (navSim) {
      await navSim.click();
      await mobPage.waitForTimeout(1000);
    }
    await mobPage.screenshot({ path: path.join(outDir, '15_matura_simulator_mobile_390.png'), fullPage: false });

    // Save telemetry json
    fs.writeFileSync(path.join(outDir, 'telemetry.json'), JSON.stringify(auditTelemetry, null, 2));
    console.log('=== AUDIT SCREENSHOTS & TELEMETRY SUCCESSFULLY RECORDED ===');

  } catch (err) {
    console.error('Audit run error:', err);
  } finally {
    await browser.close();
  }
}

runAudit();
